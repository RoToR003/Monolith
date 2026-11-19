const SAMPLE_SCALE = 32768;
var RnnoiseDenoiser = class {
	constructor(module, weights) {
		const exports = new WebAssembly.Instance(module, {}).exports;
		exports._initialize();
		if (exports.rnnoise_get_frame_size() !== 480) throw new Error("unexpected RNNoise frame size");
		this.exports = exports;
		this.weightsPointer = exports.malloc(weights.byteLength);
		if (!this.weightsPointer) throw new Error("RNNoise could not allocate its weights");
		new Uint8Array(exports.memory.buffer, this.weightsPointer, weights.byteLength).set(new Uint8Array(weights));
		this.model = exports.rnnoise_model_from_buffer(this.weightsPointer, weights.byteLength);
		const bytes = 480 * Float32Array.BYTES_PER_ELEMENT;
		this.state = exports.rnnoise_create(this.model);
		this.inputPointer = exports.malloc(bytes);
		this.outputPointer = exports.malloc(bytes);
		if (!this.state || !this.inputPointer || !this.outputPointer) throw new Error("RNNoise could not load its model");
	}
	/** Denoises one frame of RNNOISE_FRAME_SIZE samples in [-1, 1]. */
	processFrame(input, output) {
		const { exports } = this;
		if (this.heap?.buffer !== exports.memory.buffer) this.heap = new Float32Array(exports.memory.buffer);
		const { heap } = this;
		const inputOffset = this.inputPointer >> 2;
		const outputOffset = this.outputPointer >> 2;
		for (let i = 0; i < 480; ++i) heap[inputOffset + i] = input[i] * SAMPLE_SCALE;
		const voiceProbability = exports.rnnoise_process_frame(this.state, this.outputPointer, this.inputPointer);
		for (let i = 0; i < 480; ++i) output[i] = heap[outputOffset + i] / SAMPLE_SCALE;
		return voiceProbability;
	}
	/** Forgets everything heard so far, as a new instance would. */
	reset() {
		const { exports } = this;
		exports.rnnoise_destroy(this.state);
		this.state = exports.rnnoise_create(this.model);
		if (!this.state) throw new Error("RNNoise could not start over");
	}
	destroy() {
		const { exports } = this;
		if (!this.state) return;
		exports.rnnoise_destroy(this.state);
		exports.free(this.model);
		exports.free(this.weightsPointer);
		exports.free(this.inputPointer);
		exports.free(this.outputPointer);
		this.state = this.model = this.weightsPointer = this.inputPointer = this.outputPointer = 0;
	}
};
//#endregion
//#region src/lib/calls/noiseSuppression/protocol.ts
/**
* What the call noise suppressor (noiseSuppression.ts) and its AudioWorklet
* (noiseSuppressor.worklet.ts) say to each other. Types and constants only:
* the worklet bundle must not pull in anything else.
*/
const NOISE_SUPPRESSOR_PROCESSOR = "tweb-noise-suppressor";
//#endregion
//#region src/lib/calls/noiseSuppression/noiseSuppressor.worklet.ts
/**
* The AudioWorklet half of the call noise suppressor (noiseSuppression.ts):
* mono 48 kHz in, RNNoise in 10 ms frames, mono out.
*
* The render quantum (128 samples) does not divide the frame (480), so the
* output runs FRAME - gcd(FRAME, quantum) samples behind the input — the
* least delay at which it never runs dry (448 samples, 9.3 ms, on top of
* RNNoise's own 20 ms).
*
* It watches its own cost: each second it reports the share of real time the
* frames took. Once that stays above the overload share for the given number
* of reports, it passes the microphone through at the same delay for a while
* and then tries again, waiting twice as long after each overload — a load
* spike costs a few seconds of denoising, a machine too slow for it keeps a
* clean, if noisy, voice. The worklet scope has no `performance`, so the
* clock is Date.now(): its milliseconds average out over a second of frames.
*/
const FRAME_MS = 10;
const FRAMES_PER_SECOND = 1e3 / FRAME_MS;
const RING_SIZE = 2048;
const RING_MASK = 2047;
const now = typeof performance === "object" ? () => performance.now() : () => Date.now();
function gcd(a, b) {
	return b ? gcd(b, a % b) : a;
}
var NoiseSuppressorProcessor = class extends AudioWorkletProcessor {
	constructor(options) {
		super();
		this.frameInput = /* @__PURE__ */ new Float32Array(480);
		this.frameOutput = /* @__PURE__ */ new Float32Array(480);
		this.frameFill = 0;
		this.ring = new Float32Array(RING_SIZE);
		this.readIndex = 0;
		this.writeIndex = -1;
		this.busy = 0;
		this.voice = 0;
		this.frames = 0;
		this.overloadedReports = 0;
		this.bypassFrames = 0;
		this.stopped = false;
		this.options = options.processorOptions;
		this.retrySeconds = this.options.retrySeconds;
		try {
			this.denoiser = new RnnoiseDenoiser(new WebAssembly.Module(this.options.wasm), this.options.weights);
			this.post({ type: "ready" });
		} catch (err) {
			this.post({
				type: "bypass",
				reason: "error",
				error: String(err)
			});
		}
		this.port.onmessage = (event) => {
			if (event.data.type === "stop") {
				this.stopped = true;
				this.denoiser?.destroy();
				this.denoiser = void 0;
			}
		};
	}
	process(inputs, outputs) {
		if (this.stopped) return false;
		const input = inputs[0][0];
		const output = outputs[0][0];
		const quantum = output.length;
		if (this.writeIndex === -1) this.writeIndex = 480 - gcd(480, quantum);
		for (let i = 0; i < quantum; ++i) {
			this.frameInput[this.frameFill++] = input ? input[i] : 0;
			if (this.frameFill === 480) {
				this.flushFrame();
				this.frameFill = 0;
			}
		}
		const { ring } = this;
		for (let i = 0; i < quantum; ++i) {
			output[i] = ring[this.readIndex];
			this.readIndex = this.readIndex + 1 & RING_MASK;
		}
		return true;
	}
	flushFrame() {
		const frame = this.denoise(this.frameInput);
		const { ring } = this;
		for (let i = 0; i < 480; ++i) {
			ring[this.writeIndex] = frame[i];
			this.writeIndex = this.writeIndex + 1 & RING_MASK;
		}
	}
	/** The frame denoised, or the input itself while RNNoise is off. */
	denoise(input) {
		if (!this.denoiser) return input;
		try {
			if (this.bypassFrames && !--this.bypassFrames) {
				this.denoiser.reset();
				this.post({ type: "resume" });
			}
			if (this.bypassFrames) return input;
			const startedAt = now();
			this.voice += this.denoiser.processFrame(input, this.frameOutput);
			this.busy += now() - startedAt;
		} catch (err) {
			this.denoiser = void 0;
			this.post({
				type: "bypass",
				reason: "error",
				error: String(err)
			});
			return input;
		}
		if (++this.frames === FRAMES_PER_SECOND) this.report();
		return this.frameOutput;
	}
	report() {
		const load = this.busy / (this.frames * FRAME_MS);
		this.post({
			type: "stats",
			load,
			voice: this.voice / this.frames
		});
		this.busy = this.voice = this.frames = 0;
		this.overloadedReports = load > this.options.overloadShare ? this.overloadedReports + 1 : 0;
		if (this.overloadedReports >= this.options.overloadReports) {
			this.overloadedReports = 0;
			this.bypassFrames = this.retrySeconds * FRAMES_PER_SECOND;
			this.post({
				type: "bypass",
				reason: "overload",
				load,
				retrySeconds: this.retrySeconds
			});
			this.retrySeconds = Math.min(this.retrySeconds * 2, this.options.maxRetrySeconds);
		}
	}
	post(report) {
		this.port.postMessage(report);
	}
};
registerProcessor(NOISE_SUPPRESSOR_PROCESSOR, NoiseSuppressorProcessor);
//#endregion
