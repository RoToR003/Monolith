//#region src/helpers/callbackify.ts
function callbackify(smth, callback) {
	if (smth instanceof Promise) return smth.then(callback);
	else return callback(smth);
}
//#endregion
//#region src/helpers/canvas/applyColorOnContext.ts
const lottieColorToString = (color) => typeof color === "string" ? color : `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
function applyColorOnContext(context, color, x, y, width, height) {
	context.globalCompositeOperation = "source-atop";
	context.fillStyle = lottieColorToString(color);
	context.fillRect(x, y, width, height);
	context.globalCompositeOperation = "source-over";
}
//#endregion
//#region src/vendor/bezierEasing.ts
/**
* https://github.com/gre/bezier-easing
* BezierEasing - use bezier curve for transition easing function
* by Gaëtan Renaudeau 2014 - 2015 – MIT License
*/
var NEWTON_ITERATIONS = 4;
var NEWTON_MIN_SLOPE = .001;
var SUBDIVISION_PRECISION = 1e-7;
var SUBDIVISION_MAX_ITERATIONS = 10;
var kSplineTableSize = 11;
var kSampleStepSize = 1 / (kSplineTableSize - 1);
var float32ArraySupported = typeof Float32Array === "function";
function A(aA1, aA2) {
	return 1 - 3 * aA2 + 3 * aA1;
}
function B(aA1, aA2) {
	return 3 * aA2 - 6 * aA1;
}
function C(aA1) {
	return 3 * aA1;
}
function calcBezier(aT, aA1, aA2) {
	return ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT;
}
function getSlope(aT, aA1, aA2) {
	return 3 * A(aA1, aA2) * aT * aT + 2 * B(aA1, aA2) * aT + C(aA1);
}
function binarySubdivide(aX, aA, aB, mX1, mX2) {
	var currentX, currentT, i = 0;
	do {
		currentT = aA + (aB - aA) / 2;
		currentX = calcBezier(currentT, mX1, mX2) - aX;
		if (currentX > 0) aB = currentT;
		else aA = currentT;
	} while (Math.abs(currentX) > SUBDIVISION_PRECISION && ++i < SUBDIVISION_MAX_ITERATIONS);
	return currentT;
}
function newtonRaphsonIterate(aX, aGuessT, mX1, mX2) {
	for (var i = 0; i < NEWTON_ITERATIONS; ++i) {
		var currentSlope = getSlope(aGuessT, mX1, mX2);
		if (currentSlope === 0) return aGuessT;
		var currentX = calcBezier(aGuessT, mX1, mX2) - aX;
		aGuessT -= currentX / currentSlope;
	}
	return aGuessT;
}
function LinearEasing(x) {
	return x;
}
function BezierEasing(mX1, mY1, mX2, mY2) {
	if (!(0 <= mX1 && mX1 <= 1 && 0 <= mX2 && mX2 <= 1)) throw new Error("bezier x values must be in [0, 1] range");
	if (mX1 === mY1 && mX2 === mY2) return LinearEasing;
	var sampleValues = float32ArraySupported ? new Float32Array(kSplineTableSize) : new Array(kSplineTableSize);
	for (var i = 0; i < kSplineTableSize; ++i) sampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
	function getTForX(aX) {
		var intervalStart = 0;
		var currentSample = 1;
		var lastSample = kSplineTableSize - 1;
		for (; currentSample !== lastSample && sampleValues[currentSample] <= aX; ++currentSample) intervalStart += kSampleStepSize;
		--currentSample;
		var dist = (aX - sampleValues[currentSample]) / (sampleValues[currentSample + 1] - sampleValues[currentSample]);
		var guessForT = intervalStart + dist * kSampleStepSize;
		var initialSlope = getSlope(guessForT, mX1, mX2);
		if (initialSlope >= NEWTON_MIN_SLOPE) return newtonRaphsonIterate(aX, guessForT, mX1, mX2);
		else if (initialSlope === 0) return guessForT;
		else return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize, mX1, mX2);
	}
	return function BezierEasing(x) {
		if (x === 0 || x === 1) return x;
		return calcBezier(getTForX(x), mY1, mY2);
	};
}
//#endregion
//#region src/helpers/easings.ts
const defaultEasing = BezierEasing(.42, 0, .58, 1);
const simpleEasing = BezierEasing(.25, .1, .25, 1);
const unwrapEasing = BezierEasing(.45, .37, .29, 1);
//#endregion
//#region src/environment/ctx.ts
const ctx$1 = typeof window !== "undefined" ? window : self;
//#endregion
//#region src/environment/userAgent.ts
const USER_AGENT = navigator ? navigator.userAgent : null;
navigator.userAgent.search(/OS X|iPhone|iPad|iOS/i);
navigator.userAgent.toLowerCase().indexOf("android");
/Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
(() => {
	try {
		return +navigator.userAgent.match(/Chrom(?:e|ium)\/(.+?)(?:\s|\.)/)[1];
	} catch (err) {}
})();
(/iPad|iPhone|iPod/.test(navigator.platform) || navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1) && ctx$1.MSStream;
"safari" in ctx$1 || USER_AGENT && (/\b(iPad|iPhone|iPod)\b/.test(USER_AGENT) || USER_AGENT.match("Safari") && USER_AGENT.match("Chrome"));
navigator.userAgent.toLowerCase().indexOf("firefox");
(navigator.maxTouchPoints === void 0 || navigator.maxTouchPoints > 0) && navigator.userAgent.search(/iOS|iPhone OS|Android|BlackBerry|BB10|Series ?[64]0|J2ME|MIDP|opera mini|opera mobi|mobi.+Gecko|Windows Phone/i);
//#endregion
//#region src/helpers/callbackifyAll.ts
function callbackifyAll(values, callback) {
	if (values.some((value) => value instanceof Promise)) return Promise.all(values).then(callback);
	else return callback(values);
}
//#endregion
//#region src/helpers/number/clamp.ts
function clamp(v, min, max) {
	return Math.min(max, Math.max(min, v));
}
//#endregion
//#region src/helpers/forgetFailedRequest.ts
/**
* A request kept for whoever asks next - while it is on its way, and once answered - but not once it has failed:
* then it is forgotten, if it is still the one kept, and the next ask goes to the server again instead of getting
* that failure for the rest of the session (one dropped connection or flood wait would leave a panel empty until a
* reload). The failure still reaches whoever waits for it.
*
*   return this.x ??= forgetFailedRequest(this.apiManager.invokeApi(...), () => this.x, () => this.x = undefined);
*/
function forgetFailedRequest(promise, kept, forget) {
	promise.catch(() => {
		if (kept() === promise) forget();
	});
	return promise;
}
//#endregion
//#region src/components/dotRendererCore.ts
var _DotRendererCore;
const SHADER_FETCH_TIMEOUT = 15e3;
function drawClippingCircle(ctx, progress, coords, maxDist, dpr, featherDivisor = 3.5) {
	ctx.save();
	ctx.globalCompositeOperation = "destination-out";
	ctx.fillStyle = "white";
	ctx.shadowBlur = maxDist / featherDivisor * dpr * progress;
	ctx.shadowColor = "white";
	ctx.beginPath();
	ctx.arc(coords.x, coords.y, maxDist * progress, 0, 2 * Math.PI);
	ctx.fill();
	ctx.globalCompositeOperation = "source-over";
	ctx.restore();
}
/**
* The WebGL particles simulation, decoupled from the DOM — works both on the main
* thread (HTMLCanvasElement) and inside a worker (OffscreenCanvas)
*/
var DotRendererCore = class DotRendererCore {
	constructor(canvas, shaderURLs) {
		this.shaderURLs = shaderURLs;
		this.reset = true;
		this.canvas = canvas;
		this.time = 0;
		this.bufferIndex = 0;
		this.context = canvas.getContext("webgl2");
	}
	resize(width, height, dpr, config) {
		this.dpr = dpr;
		this.canvas.width = width * dpr;
		this.canvas.height = height * dpr;
		this.config = config;
		if (this.inited) this.draw();
	}
	genBuffer() {
		if (this.buffer) {
			this.context.deleteBuffer(this.buffer[0]);
			this.context.deleteBuffer(this.buffer[1]);
		}
		this.buffer = [];
		for (let i = 0; i < 2; ++i) {
			this.buffer[i] = this.context.createBuffer();
			this.context.bindBuffer(this.context.ARRAY_BUFFER, this.buffer[i]);
			this.context.bufferData(this.context.ARRAY_BUFFER, (this.bufferParticlesCount = Math.ceil(this.config.particlesCount)) * 6 * 4, this.context.DYNAMIC_DRAW);
		}
	}
	compileShader(type, url) {
		var _DotRendererCore$shad;
		const shader = this.context.createShader(type);
		return callbackify((_DotRendererCore$shad = DotRendererCore.shaderTexts)[url] ?? (_DotRendererCore$shad[url] = fetch(url, { signal: AbortSignal.timeout(SHADER_FETCH_TIMEOUT) }).then((response) => response.text()).then((text) => DotRendererCore.shaderTexts[url] = text + "\n//" + Math.random()).catch((err) => {
			if (DotRendererCore.shaderTexts[url] instanceof Promise) delete DotRendererCore.shaderTexts[url];
			throw err;
		})), (shaderText) => {
			this.context.shaderSource(shader, shaderText);
			this.context.compileShader(shader);
			if (!this.context.getShaderParameter(shader, this.context.COMPILE_STATUS)) throw "compile shader error:\n" + this.context.getShaderInfoLog(shader);
			return shader;
		});
	}
	compileShaders() {
		return callbackifyAll([this.compileShader(this.context.VERTEX_SHADER, this.shaderURLs.vertex), this.compileShader(this.context.FRAGMENT_SHADER, this.shaderURLs.fragment)], (result) => result);
	}
	draw() {
		if (!this.inited) return;
		const gl = this.context;
		const config = this.config;
		const now = Date.now();
		const dt = Math.min((now - this.lastDrawTime) / 1e3, 1) * config.timeScale;
		this.lastDrawTime = now;
		this.time += dt;
		if (this.bufferParticlesCount < config.particlesCount) {
			this.genBuffer();
			this.reset = true;
		}
		gl.viewport(0, 0, this.canvas.width, this.canvas.height);
		gl.clear(gl.COLOR_BUFFER_BIT);
		gl.useProgram(this.program);
		gl.uniform1f(this.resetHandle, this.reset ? 1 : 0);
		if (this.reset) {
			this.time = 0;
			this.reset = false;
		}
		gl.uniform1f(this.timeHandle, this.time);
		gl.uniform1f(this.deltaTimeHandle, dt);
		gl.uniform2f(this.sizeHandle, this.canvas.width, this.canvas.height);
		gl.uniform1f(this.seedHandle, config.seed);
		gl.uniform1f(this.radiusHandle, config.radius);
		gl.uniform1f(this.noiseScaleHandle, config.noiseScale);
		gl.uniform1f(this.noiseSpeedHandle, config.noiseSpeed);
		gl.uniform1f(this.dampingMultHandle, config.dampingMult);
		gl.uniform1f(this.velocityMultHandle, config.velocityMult);
		gl.uniform1f(this.forceMultHandle, config.forceMult);
		gl.uniform1f(this.longevityHandle, config.longevity);
		gl.uniform1f(this.maxVelocityHandle, config.maxVelocity);
		gl.uniform1f(this.noiseMovementHandle, config.noiseMovement);
		gl.uniform3f(this.colorHandle, (config.color >> 16 & 255) / 255, (config.color >> 8 & 255) / 255, (config.color & 255) / 255);
		gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer[this.bufferIndex]);
		gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 24, 0);
		gl.enableVertexAttribArray(0);
		gl.vertexAttribPointer(1, 2, gl.FLOAT, false, 24, 8);
		gl.enableVertexAttribArray(1);
		gl.vertexAttribPointer(2, 1, gl.FLOAT, false, 24, 16);
		gl.enableVertexAttribArray(2);
		gl.vertexAttribPointer(3, 1, gl.FLOAT, false, 24, 20);
		gl.enableVertexAttribArray(3);
		gl.bindBufferBase(gl.TRANSFORM_FEEDBACK_BUFFER, 0, this.buffer[1 - this.bufferIndex]);
		gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 24, 0);
		gl.enableVertexAttribArray(0);
		gl.vertexAttribPointer(1, 2, gl.FLOAT, false, 24, 8);
		gl.enableVertexAttribArray(1);
		gl.vertexAttribPointer(2, 1, gl.FLOAT, false, 24, 16);
		gl.enableVertexAttribArray(2);
		gl.vertexAttribPointer(3, 1, gl.FLOAT, false, 24, 20);
		gl.enableVertexAttribArray(3);
		gl.beginTransformFeedback(gl.POINTS);
		gl.drawArrays(gl.POINTS, 0, config.particlesCount);
		gl.endTransformFeedback();
		gl.bindBuffer(gl.ARRAY_BUFFER, null);
		gl.bindBufferBase(gl.TRANSFORM_FEEDBACK_BUFFER, 0, null);
		this.bufferIndex = 1 - this.bufferIndex;
	}
	_init(vertexShader, fragmentShader) {
		this.genBuffer();
		const gl = this.context;
		const program = this.program = gl.createProgram();
		gl.attachShader(program, vertexShader);
		gl.attachShader(program, fragmentShader);
		gl.transformFeedbackVaryings(program, [
			"outPosition",
			"outVelocity",
			"outTime",
			"outDuration"
		], gl.INTERLEAVED_ATTRIBS);
		gl.linkProgram(program);
		if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw "program link error:\n" + gl.getProgramInfoLog(program);
		gl.deleteShader(vertexShader);
		gl.deleteShader(fragmentShader);
		this.timeHandle = gl.getUniformLocation(program, "time");
		this.deltaTimeHandle = gl.getUniformLocation(program, "deltaTime");
		this.sizeHandle = gl.getUniformLocation(program, "size");
		this.resetHandle = gl.getUniformLocation(program, "reset");
		this.radiusHandle = gl.getUniformLocation(program, "r");
		this.seedHandle = gl.getUniformLocation(program, "seed");
		this.noiseScaleHandle = gl.getUniformLocation(program, "noiseScale");
		this.noiseSpeedHandle = gl.getUniformLocation(program, "noiseSpeed");
		this.dampingMultHandle = gl.getUniformLocation(program, "dampingMult");
		this.velocityMultHandle = gl.getUniformLocation(program, "velocityMult");
		this.forceMultHandle = gl.getUniformLocation(program, "forceMult");
		this.longevityHandle = gl.getUniformLocation(program, "longevity");
		this.maxVelocityHandle = gl.getUniformLocation(program, "maxVelocity");
		this.noiseMovementHandle = gl.getUniformLocation(program, "noiseMovement");
		this.colorHandle = gl.getUniformLocation(program, "color");
		gl.clearColor(0, 0, 0, 0);
		gl.viewport(0, 0, this.canvas.width, this.canvas.height);
		gl.enable(gl.BLEND);
		gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
		this.inited = true;
		this.lastDrawTime = Date.now();
	}
	init() {
		if (this.initPromise !== void 0) return this.initPromise;
		if (!this.context) return this.initPromise = false;
		const result = callbackify(this.compileShaders(), (shaders) => {
			this._init(...shaders);
			return true;
		});
		if (result instanceof Promise) forgetFailedRequest(result, () => this.initPromise, () => this.initPromise = void 0);
		return this.initPromise = result;
	}
	destroy() {
		if (this.buffer) {
			this.context.deleteBuffer(this.buffer[0]);
			this.context.deleteBuffer(this.buffer[1]);
		}
		this.buffer = null;
		this.context.deleteProgram(this.program);
		this.program = null;
	}
};
_DotRendererCore = DotRendererCore;
_DotRendererCore.shaderTexts = {};
//#endregion
//#region src/helpers/number/nMap.ts
/**
* Maps value from a range [fromMin, fromMax] to another range [toMin, toMax]
*/
function nMap(value, fromMin, fromMax, toMin, toMax) {
	return (value - fromMin) / (fromMax - fromMin) * (toMax - toMin) + toMin;
}
//#endregion
//#region src/components/messageSpoilerOverlay/drawImageFromSource.ts
function drawImageFromSource(ctx, sourceCanvas, sx, sy, sw, sh, dx, dy, dw, dh) {
	const sourceWidth = sourceCanvas.width;
	const sourceHeight = sourceCanvas.height;
	const startChunkX = Math.floor(sx / sourceWidth) * sourceWidth;
	const startChunkY = Math.floor(sy / sourceHeight) * sourceHeight;
	const lastChunkX = (Math.floor((sx + sw) / sourceWidth) + 1) * sourceWidth;
	const lastChunkY = (Math.floor((sy + sh) / sourceHeight) + 1) * sourceHeight;
	for (let cx = startChunkX; cx < lastChunkX; cx += sourceWidth) for (let cy = startChunkY; cy < lastChunkY; cy += sourceHeight) {
		const rawX = Math.max(sx, cx);
		const rawY = Math.max(sy, cy);
		const x = rawX % sourceWidth;
		const y = rawY % sourceHeight;
		const w = Math.min(sourceWidth - x, sx + sw - rawX);
		const h = Math.min(sourceHeight - y, sy + sh - rawY);
		ctx.drawImage(sourceCanvas, x, y, w, h, nMap(rawX, sx, sx + sw, dx, dx + dw), nMap(rawY, sy, sy + sh, dy, dy + dh), w / sw * dw, h / sh * dh);
	}
}
//#endregion
//#region src/helpers/array/lowerBound.ts
const maxIters = 100;
function lowerBound(low, high, target, getValue) {
	let i = 0;
	while (low <= high) {
		const mid = low + Math.floor((high - low) / 2);
		if (target > getValue(mid)) low = mid + 1;
		else high = mid - 1;
		if (i++ > maxIters) return 0;
	}
	return low;
}
//#endregion
//#region src/helpers/number/smoothstep01.ts
function smoothstep01(value) {
	const t = clamp(value, 0, 1);
	return t * t * (3 - 2 * t);
}
//#endregion
//#region src/helpers/lerp.ts
/**
* Linear interpolation between two values.
*/
function lerp(min, max, progress) {
	return min + (max - min) * progress;
}
//#endregion
//#region src/helpers/easing/easeOutCubic.ts
function easeOutCubicApply(v, c) {
	return c * (--v * v * v + 1);
}
//#endregion
//#region src/components/spoilerRenderer.worker.ts
const ctx = self;
const FRAME_INTERVAL = 1e3 / 60;
const DUST_JITTER = .35;
const PARTICLE_IN = .1;
const TEXT_FRONT_WIDTH = .5;
const TEXT_DUST_OUT = .3;
const TEXT_PARTICLE_ARRIVE = .7;
const TEXT_IN_START = .5;
const TEXT_IN_END = .8;
const TEXT_PARTICLE_OUT = .6;
const TEXT_SHIFT = 2.9749999999999996;
const MEDIA_FRONT_WIDTH = .32;
const MEDIA_EDGE_WOBBLE = .45;
const MEDIA_EDGE_CELL = 14;
const MEDIA_EDGE_JITTER = .1;
const MEDIA_DUST_OUT = .2;
const MEDIA_PARTICLE_ARRIVE = .35;
const MEDIA_COVER_START = .1;
const MEDIA_COVER_END = .36;
const MEDIA_FOCUS_END = .56;
const MEDIA_FOCUS_BLUR = 5;
const MEDIA_PARTICLE_OUT = .4;
const MEDIA_PARTICLE_END = .7;
const MEDIA_EDGE_FROM = .1;
const MEDIA_SHIFT = 4.1000000000000005;
const MEDIA_DUST_PUSH = .3;
const MEDIA_FLIGHT = 30;
const MEDIA_SCATTER = 8;
const MEDIA_GRAIN = 2;
const MEDIA_SAMPLE_STEP = 3;
const MEDIA_ASSEMBLY_MIN = 2500;
const MEDIA_ASSEMBLY_MAX = 32e3;
const MEDIA_ASSEMBLY_DENSITY = 14;
const MEDIA_DUST_WHITE = .6;
const MEDIA_DUST_FILTER = "saturate(1.4) brightness(2.2)";
const MEDIA_DOT_LIGHT = 1.2;
const MEDIA_DOT_LIFT = 28;
const MEDIA_COLOR_BUCKETS = 4096;
const MEDIA_KEY_LEVELS = 1024;
const MEDIA_KEY_MIN = 0;
const MEDIA_KEY_STEP = 3.4 / MEDIA_KEY_LEVELS;
const ASSEMBLY_MAX = 2e4;
const ASSEMBLY_SHARE = 1;
const GLYPH_INSIDE = 170;
const ASSEMBLY_ALPHA = .9;
const ASSEMBLY_STRIDE = 6;
const getParticleAlpha = (local, out, end) => local < PARTICLE_IN ? .3 + .7 * local / PARTICLE_IN : local > out ? clamp((end - local) / (end - out), 0, 1) : 1;
const createParticleAlpha = (context) => {
	let current = -1;
	return (alpha) => {
		alpha = Math.round(alpha * 255) / 255;
		if (alpha <= 0) return false;
		if (alpha !== current) context.globalAlpha = current = alpha;
		return true;
	};
};
const drawGatheringParticle = (context, data, offset, local, arrive) => {
	const move = easeOutCubicApply(clamp(local / arrive, 0, 1), 1);
	const size = data[offset + 5];
	context.fillRect(lerp(data[offset], data[offset + 2], move) - size / 2, lerp(data[offset + 1], data[offset + 3], move) - size / 2, size, size);
};
const createDustMask = (width, height) => {
	const mask = new OffscreenCanvas(width, height);
	const context = mask.getContext("2d");
	return {
		image: context.createImageData(width, height),
		mask,
		context
	};
};
const createNoise = (length) => {
	const noise = new Float32Array(length);
	for (let index = 0; index < length; ++index) noise[index] = Math.random();
	return noise;
};
const ports = /* @__PURE__ */ new Set();
const reportDustError = (err) => {
	const message = String(err?.stack || err);
	ports.forEach((state) => state.port.postMessage({
		type: "dust-error",
		message
	}));
};
const textSims = /* @__PURE__ */ new Map();
const mediaSims = /* @__PURE__ */ new Map();
let timerId;
const createSim = (init) => {
	const canvas = new OffscreenCanvas(init.width * init.dpr, init.height * init.dpr);
	const core = new DotRendererCore(canvas, {
		vertex: init.vertexURL,
		fragment: init.fragmentURL
	});
	core.resize(init.width, init.height, init.dpr, init.config);
	core.init();
	return {
		core,
		canvas
	};
};
const RECT_GROUP_GAP = 4;
const getRectGroups = (rects, dpr, width, height) => {
	const groups = [];
	for (const rect of rects.slice().sort((a, b) => a.top - b.top)) {
		const left = Math.max(0, Math.floor(rect.left * dpr));
		const top = Math.max(0, Math.floor(rect.top * dpr));
		const right = Math.min(width, Math.ceil((rect.left + rect.width) * dpr));
		const bottom = Math.min(height, Math.ceil((rect.top + rect.height) * dpr));
		if (right <= left || bottom <= top) continue;
		const group = groups[groups.length - 1];
		if (group && top <= group.bottom + RECT_GROUP_GAP * dpr) {
			group.left = Math.min(group.left, left);
			group.right = Math.max(group.right, right);
			group.bottom = Math.max(group.bottom, bottom);
			group.rects.push(rect);
		} else groups.push({
			left,
			top,
			right,
			bottom,
			rects: [rect]
		});
	}
	return groups.map(({ left, top, right, bottom, rects }) => ({
		left,
		top,
		width: right - left,
		height: bottom - top,
		rects
	}));
};
const ensureOverlayDust = (target, index, group) => {
	const { width, height } = group;
	const list = target.overlayDust ?? (target.overlayDust = []);
	const dust = list[index];
	if (dust && dust.width === width && dust.height === height) return dust;
	return list[index] = {
		width,
		height,
		noise: createNoise(width * height),
		fill: createDustMask(width, height),
		dust: createDustMask(width, height)
	};
};
const getOverlayRevealBase = (dust, rects, bounds, dpr, centerX, centerY, maxDist) => {
	let key = centerX + "," + centerY + "," + maxDist + "," + dpr + "," + bounds.left + "," + bounds.top;
	for (const rect of rects) key += ";" + rect.left + "," + rect.top + "," + rect.width + "," + rect.height;
	if (dust.base && dust.baseKey === key) return dust.base;
	const { noise } = dust;
	const base = dust.base ?? (dust.base = new Float32Array(bounds.width * bounds.height));
	base.fill(-Infinity);
	const radius = Math.max(maxDist, 1);
	for (const rect of rects) {
		const left = Math.max(bounds.left, Math.floor(rect.left * dpr));
		const right = Math.min(bounds.left + bounds.width, Math.ceil((rect.left + rect.width) * dpr));
		const top = Math.max(bounds.top, Math.floor(rect.top * dpr));
		const bottom = Math.min(bounds.top + bounds.height, Math.ceil((rect.top + rect.height) * dpr));
		if (right <= left || bottom <= top) continue;
		for (let y = top; y < bottom; ++y) {
			const dy = y - centerY;
			const row = (y - bounds.top) * bounds.width - bounds.left;
			for (let x = left; x < right; ++x) {
				const index = row + x;
				const dx = x - centerX;
				const distance = Math.sqrt(dx * dx + dy * dy) / radius;
				base[index] = (noise[index] - .5) * DUST_JITTER - distance / TEXT_FRONT_WIDTH;
			}
		}
	}
	dust.baseKey = key;
	return base;
};
const TEXT_IN_ALPHA = 255 / .30000000000000004;
const TEXT_DUST_ALPHA = 255 / TEXT_DUST_OUT;
const applyDustReveal = (target, index, bounds, centerX, centerY, maxDist, progress) => {
	const { context, scratchContext, dpr } = target;
	const dust = ensureOverlayDust(target, index, bounds);
	const fillPixels = dust.fill.image.data;
	const dustPixels = dust.dust.image.data;
	const base = getOverlayRevealBase(dust, bounds.rects, bounds, dpr, centerX, centerY, maxDist);
	const shift = progress * TEXT_SHIFT;
	for (let index = 0, length = base.length; index < length; ++index) {
		const local = shift + base[index];
		fillPixels[index * 4 + 3] = (local - TEXT_IN_START) * TEXT_IN_ALPHA;
		dustPixels[index * 4 + 3] = local * TEXT_DUST_ALPHA;
	}
	dust.fill.context.putImageData(dust.fill.image, 0, 0);
	dust.dust.context.putImageData(dust.dust.image, 0, 0);
	context.save();
	context.globalCompositeOperation = "destination-out";
	context.drawImage(dust.fill.mask, bounds.left, bounds.top);
	context.restore();
	scratchContext.save();
	scratchContext.globalCompositeOperation = "destination-out";
	scratchContext.drawImage(dust.dust.mask, bounds.left, bounds.top);
	scratchContext.restore();
};
const scaleRect = (rect, scale) => ({
	x: rect.x * scale,
	y: rect.y * scale,
	width: rect.width * scale,
	height: rect.height * scale
});
const drawPlaced = (context, image, { rect, clip }) => {
	context.save();
	context.beginPath();
	context.rect(clip.x, clip.y, clip.width, clip.height);
	context.clip();
	context.drawImage(image, rect.x, rect.y, rect.width, rect.height);
	context.restore();
};
const getImagePlacement = (target, scale) => {
	if (target.imagePlacement) return {
		rect: scaleRect(target.imagePlacement.rect, scale),
		clip: scaleRect(target.imagePlacement.clip, scale)
	};
	const { image, canvas } = target;
	const clip = {
		x: 0,
		y: 0,
		width: canvas.width * scale,
		height: canvas.height * scale
	};
	const cover = Math.max(clip.width / image.width, clip.height / image.height);
	const width = image.width * cover;
	const height = image.height * cover;
	return {
		rect: {
			x: (clip.width - width) / 2,
			y: (clip.height - height) / 2,
			width,
			height
		},
		clip
	};
};
const buildEdgeNoise = (grainsX, grainsY) => {
	const edge = new Float32Array(grainsX * grainsY);
	for (const [cell, weight] of [[MEDIA_EDGE_CELL, .75], [MEDIA_EDGE_CELL / 3, .25]]) {
		const cellsX = Math.ceil(grainsX / cell) + 2;
		const lattice = new Float32Array(cellsX * (Math.ceil(grainsY / cell) + 2));
		for (let index = 0; index < lattice.length; ++index) lattice[index] = Math.random() - .5;
		let index = 0;
		for (let grainY = 0; grainY < grainsY; ++grainY) {
			const cellY = Math.floor(grainY / cell);
			const ty = smoothstep01(grainY / cell - cellY);
			const row = cellY * cellsX;
			for (let grainX = 0; grainX < grainsX; ++grainX, ++index) {
				const cellX = Math.floor(grainX / cell);
				const tx = smoothstep01(grainX / cell - cellX);
				const top = lerp(lattice[row + cellX], lattice[row + cellX + 1], tx);
				const bottom = lerp(lattice[row + cellsX + cellX], lattice[row + cellsX + cellX + 1], tx);
				edge[index] += lerp(top, bottom, ty) * weight;
			}
		}
	}
	return edge;
};
const ensureMediaDust = (target) => {
	const { width, height } = target.canvas;
	const dust = target.mediaDust;
	if (dust && dust.width === width && dust.height === height) return dust;
	const grainsX = Math.ceil(width / MEDIA_GRAIN);
	const grainsY = Math.ceil(height / MEDIA_GRAIN);
	return target.mediaDust = {
		width,
		height,
		grainsX,
		grainsY,
		noise: createNoise(grainsX * grainsY),
		edge: buildEdgeNoise(grainsX, grainsY),
		dust: createDustMask(grainsX, grainsY),
		cover: createDustMask(grainsX, grainsY),
		focus: createDustMask(grainsX, grainsY)
	};
};
const ensureSoftImage = (target, dpr) => {
	const { image } = target;
	if (!image) return;
	const width = Math.ceil(target.canvas.width / 2);
	const height = Math.ceil(target.canvas.height / 2);
	const soft = target.softImage;
	if (soft && soft.width === width && soft.height === height) return soft;
	const canvas = new OffscreenCanvas(width, height);
	const context = canvas.getContext("2d");
	const placement = getImagePlacement(target, width / target.canvas.width);
	drawPlaced(context, image, placement);
	context.filter = "blur(" + MEDIA_FOCUS_BLUR * dpr / 2 + "px)";
	drawPlaced(context, image, placement);
	return target.softImage = canvas;
};
const ensureTintedThumbnail = (target, width, height) => {
	const tinted = target.tintedThumbnail;
	if (tinted && tinted.width === width && tinted.height === height) return tinted;
	const canvas = new OffscreenCanvas(width, height);
	const context = canvas.getContext("2d");
	context.filter = MEDIA_DUST_FILTER;
	context.drawImage(target.thumbnail, 0, 0, width, height);
	context.filter = "none";
	context.globalAlpha = MEDIA_DUST_WHITE;
	context.fillStyle = "#fff";
	context.fillRect(0, 0, width, height);
	return target.tintedThumbnail = canvas;
};
const sortByBuckets = (order, buckets, bucketsCount) => {
	const starts = new Uint32Array(bucketsCount + 1);
	for (let position = 0; position < order.length; ++position) ++starts[buckets[order[position]] + 1];
	for (let bucket = 1; bucket <= bucketsCount; ++bucket) starts[bucket] += starts[bucket - 1];
	const sorted = new Uint32Array(order.length);
	for (let position = 0; position < order.length; ++position) {
		const particle = order[position];
		sorted[starts[buckets[particle]]++] = particle;
	}
	return sorted;
};
const getKeyLevel = (key) => Math.min(1023, Math.max(0, Math.floor((key - MEDIA_KEY_MIN) / MEDIA_KEY_STEP)));
const buildMediaAssembly = (target, dust, dpr) => {
	const source = target.image || target.thumbnail;
	const { reveal } = target;
	if (!source || !reveal) return;
	const { width, height } = target.canvas;
	const sampleWidth = Math.max(1, Math.ceil(width / MEDIA_SAMPLE_STEP));
	const sampleHeight = Math.max(1, Math.ceil(height / MEDIA_SAMPLE_STEP));
	const samplerContext = new OffscreenCanvas(sampleWidth, sampleHeight).getContext("2d", { willReadFrequently: true });
	const full = {
		x: 0,
		y: 0,
		width: sampleWidth,
		height: sampleHeight
	};
	const placement = source === target.image ? getImagePlacement(target, sampleWidth / width) : {
		rect: full,
		clip: full
	};
	drawPlaced(samplerContext, source, placement);
	const pixels = samplerContext.getImageData(0, 0, sampleWidth, sampleHeight).data;
	const shown = Math.min(placement.rect.width, placement.clip.width) * Math.min(placement.rect.height, placement.clip.height);
	const area = Math.min(width * height, shown * MEDIA_SAMPLE_STEP * MEDIA_SAMPLE_STEP);
	const count = Math.max(MEDIA_ASSEMBLY_MIN, Math.min(MEDIA_ASSEMBLY_MAX, Math.round(area / MEDIA_ASSEMBLY_DENSITY)));
	const radius = Math.max(reveal.maxDist, 1);
	const flight = MEDIA_FLIGHT * dpr;
	const scatter = MEDIA_SCATTER * dpr;
	const { grainsX, edge } = dust;
	const weights = new Float32Array(sampleWidth * sampleHeight);
	let total = 0;
	for (let index = 0; index < weights.length; ++index) {
		const luminance = (pixels[index * 4] * .299 + pixels[index * 4 + 1] * .587 + pixels[index * 4 + 2] * .114) / 255;
		total += (.1 + luminance ** 1.5) * pixels[index * 4 + 3] / 255;
		weights[index] = total;
	}
	if (!total) {
		target.mediaAssembly = {
			data: /* @__PURE__ */ new Float32Array(0),
			buckets: [],
			lastKey: -Infinity
		};
		return;
	}
	const pickSample = () => lowerBound(0, weights.length - 1, Math.random() * total, (index) => weights[index]);
	const values = new Float32Array(count * ASSEMBLY_STRIDE);
	const colorBuckets = new Uint16Array(count);
	const keyLevels = new Uint16Array(count);
	const order = new Uint32Array(count);
	for (let particle = 0; particle < count; ++particle) {
		const sample = pickSample();
		const targetX = Math.min(width - 1, (sample % sampleWidth + Math.random()) * MEDIA_SAMPLE_STEP);
		const targetY = Math.min(height - 1, (Math.floor(sample / sampleWidth) + Math.random()) * MEDIA_SAMPLE_STEP);
		const sampleIndex = sample * 4;
		const red = Math.min(255, pixels[sampleIndex] * MEDIA_DOT_LIGHT + MEDIA_DOT_LIFT);
		const green = Math.min(255, pixels[sampleIndex + 1] * MEDIA_DOT_LIGHT + MEDIA_DOT_LIFT);
		const blue = Math.min(255, pixels[sampleIndex + 2] * MEDIA_DOT_LIGHT + MEDIA_DOT_LIFT);
		const dx = targetX - reveal.coords.x;
		const dy = targetY - reveal.coords.y;
		const distance = Math.hypot(dx, dy) || 1;
		const wander = (edge[Math.floor(targetY / MEDIA_GRAIN) * grainsX + Math.floor(targetX / MEDIA_GRAIN)] * MEDIA_EDGE_WOBBLE + (Math.random() - .5) * MEDIA_EDGE_JITTER) * Math.min(1, distance / radius / MEDIA_EDGE_FROM);
		const key = distance / radius / MEDIA_FRONT_WIDTH - wander;
		const thrown = flight * (.35 + Math.random() * .65);
		const offset = particle * ASSEMBLY_STRIDE;
		values[offset] = targetX - dx / distance * thrown + (Math.random() - .5) * 2 * scatter;
		values[offset + 1] = targetY - dy / distance * thrown + (Math.random() - .5) * 2 * scatter;
		values[offset + 2] = targetX;
		values[offset + 3] = targetY;
		values[offset + 4] = key;
		values[offset + 5] = (.9 + Math.random() * .7) * dpr;
		colorBuckets[particle] = red >> 4 << 8 | green >> 4 << 4 | blue >> 4;
		keyLevels[particle] = getKeyLevel(key);
		order[particle] = particle;
	}
	const sorted = sortByBuckets(sortByBuckets(order, keyLevels, MEDIA_KEY_LEVELS), colorBuckets, MEDIA_COLOR_BUCKETS);
	const data = new Float32Array(count * ASSEMBLY_STRIDE);
	const buckets = [];
	let lastBucket = -1;
	for (let position = 0; position < count; ++position) {
		const particle = sorted[position];
		const offset = particle * ASSEMBLY_STRIDE;
		data.set(values.subarray(offset, offset + ASSEMBLY_STRIDE), position * ASSEMBLY_STRIDE);
		const bucket = colorBuckets[particle];
		if (bucket === lastBucket) buckets[buckets.length - 1].end = position + 1;
		else {
			buckets.push({
				color: bucketColor(bucket),
				start: position,
				end: position + 1
			});
			lastBucket = bucket;
		}
	}
	let lastKey = -Infinity;
	for (let particle = 0; particle < count; ++particle) lastKey = Math.max(lastKey, values[particle * ASSEMBLY_STRIDE + 4]);
	target.mediaAssembly = {
		data,
		buckets,
		lastKey
	};
};
const bucketColor = (bucket) => {
	const red = (bucket >> 8 & 15) * 16 + 8;
	const green = (bucket >> 4 & 15) * 16 + 8;
	const blue = (bucket & 15) * 16 + 8;
	return "rgb(" + red + "," + green + "," + blue + ")";
};
const drawMediaAssembly = (target, dust, progress, dpr) => {
	if (!target.mediaAssembly) buildMediaAssembly(target, dust, dpr);
	const assembly = target.mediaAssembly;
	if (!assembly) return;
	const { context } = target;
	const { data, buckets } = assembly;
	const front = progress * MEDIA_SHIFT;
	const lastKey = front + MEDIA_KEY_STEP;
	const setAlpha = createParticleAlpha(context);
	context.save();
	for (const bucket of buckets) {
		let styled = false;
		for (let particle = bucket.start; particle < bucket.end; ++particle) {
			const offset = particle * ASSEMBLY_STRIDE;
			const key = data[offset + 4];
			if (key >= lastKey) break;
			const local = front - key;
			if (local <= 0 || local >= MEDIA_PARTICLE_END) continue;
			if (!setAlpha(getParticleAlpha(local, MEDIA_PARTICLE_OUT, MEDIA_PARTICLE_END))) continue;
			if (!styled) {
				context.fillStyle = bucket.color;
				styled = true;
			}
			drawGatheringParticle(context, data, offset, local, MEDIA_PARTICLE_ARRIVE);
		}
	}
	context.restore();
};
const getMediaRevealBase = (dust, reveal) => {
	const key = reveal.coords.x + "," + reveal.coords.y + "," + reveal.maxDist;
	if (dust.base && dust.baseKey === key) return dust.base;
	const { grainsX, grainsY, noise, edge } = dust;
	const base = dust.base ?? (dust.base = new Float32Array(grainsX * grainsY));
	const radius = Math.max(reveal.maxDist, 1);
	const centerX = reveal.coords.x;
	const centerY = reveal.coords.y;
	let index = 0, lowest = 0;
	for (let grainY = 0; grainY < grainsY; ++grainY) {
		const dy = (grainY + .5) * MEDIA_GRAIN - centerY;
		for (let grainX = 0; grainX < grainsX; ++grainX, ++index) {
			const dx = (grainX + .5) * MEDIA_GRAIN - centerX;
			const distance = Math.sqrt(dx * dx + dy * dy) / radius;
			const wander = (edge[index] * MEDIA_EDGE_WOBBLE + (noise[index] - .5) * MEDIA_EDGE_JITTER) * Math.min(1, distance / MEDIA_EDGE_FROM);
			lowest = Math.min(lowest, base[index] = wander - distance / MEDIA_FRONT_WIDTH);
		}
	}
	dust.baseKey = key;
	dust.lastKey = -lowest;
	return base;
};
const MEDIA_DUST_ALPHA = 255 / MEDIA_DUST_OUT;
const MEDIA_FOCUS_ALPHA = 255 / .30000000000000004;
const applyMediaReveal = (target, dust, progress, focused) => {
	const { reveal, context } = target;
	const { grainsX, grainsY, cover, focus } = dust;
	const dustPixels = dust.dust.image.data;
	const coverPixels = cover.image.data;
	const focusPixels = focus.image.data;
	const base = getMediaRevealBase(dust, reveal);
	const shift = progress * MEDIA_SHIFT;
	const coverEnd = focused ? MEDIA_COVER_END : MEDIA_FOCUS_END;
	const coverAlpha = 255 / (coverEnd - MEDIA_COVER_START);
	for (let index = 0, length = base.length; index < length; ++index) {
		const local = shift + base[index];
		dustPixels[index * 4 + 3] = local * MEDIA_DUST_ALPHA;
		coverPixels[index * 4 + 3] = (coverEnd - local) * coverAlpha;
		if (focused) focusPixels[index * 4 + 3] = (MEDIA_FOCUS_END - local) * MEDIA_FOCUS_ALPHA;
	}
	dust.dust.context.putImageData(dust.dust.image, 0, 0);
	cover.context.putImageData(cover.image, 0, 0);
	if (focused) focus.context.putImageData(focus.image, 0, 0);
	context.save();
	context.globalCompositeOperation = "destination-out";
	context.drawImage(dust.dust.mask, 0, 0, grainsX, grainsY, 0, 0, grainsX * MEDIA_GRAIN, grainsY * MEDIA_GRAIN);
	context.restore();
};
const drawMediaLayer = (target, dust, layer, source) => {
	const { context } = target;
	const { width, height } = target.canvas;
	const { grainsX, grainsY } = dust;
	layer.context.globalCompositeOperation = "source-in";
	layer.context.drawImage(source, 0, 0, width / MEDIA_GRAIN, height / MEDIA_GRAIN);
	context.save();
	context.globalCompositeOperation = "destination-over";
	context.drawImage(layer.mask, 0, 0, grainsX, grainsY, 0, 0, grainsX * MEDIA_GRAIN, grainsY * MEDIA_GRAIN);
	context.restore();
};
const drawMediaDust = (sim, target, dpr) => {
	const { canvas, context, x, y, reveal, thumbnail } = target;
	const { width, height } = canvas;
	if (!width || !height) return;
	const progress = reveal ? simpleEasing(Math.min((Date.now() - reveal.startTime) / reveal.duration, 1)) : 0;
	context.clearRect(0, 0, width, height);
	if (progress >= 1 || reveal?.over) {
		target.revealed = true;
		target.mediaDust = void 0;
		target.mediaAssembly = void 0;
		target.tintedThumbnail = void 0;
		target.softImage = void 0;
		return;
	}
	const push = progress * progress * MEDIA_DUST_PUSH;
	drawImageFromSource(context, sim.canvas, x + (reveal ? reveal.coords.x * push : 0), y + (reveal ? reveal.coords.y * push : 0), width * (1 - push), height * (1 - push), 0, 0, width, height);
	if (thumbnail) {
		context.save();
		context.globalCompositeOperation = "source-in";
		context.drawImage(ensureTintedThumbnail(target, width, height), 0, 0);
		context.restore();
	} else if (target.color) applyColorOnContext(context, target.color, 0, 0, width, height);
	if (!reveal) return;
	const dust = ensureMediaDust(target);
	const softImage = ensureSoftImage(target, dpr);
	applyMediaReveal(target, dust, progress, !!softImage);
	if (thumbnail) drawMediaLayer(target, dust, dust.cover, thumbnail);
	if (softImage) drawMediaLayer(target, dust, dust.focus, softImage);
	drawMediaAssembly(target, dust, progress, dpr);
	const lastKey = Math.max(dust.lastKey, target.mediaAssembly?.lastKey ?? -Infinity);
	if (progress * MEDIA_SHIFT - lastKey >= MEDIA_PARTICLE_END) reveal.over = true;
};
const drawMediaTarget = (sim, target, dpr) => {
	if (target.dust) {
		drawMediaDust(sim, target, dpr);
		return;
	}
	const { canvas, context, x, y, reveal } = target;
	const { width, height } = canvas;
	context.clearRect(0, 0, width, height);
	if (!reveal) drawImageFromSource(context, sim.canvas, x, y, width, height, 0, 0, width, height);
	else {
		const progress = simpleEasing(Math.min((Date.now() - reveal.startTime) / reveal.duration, 1));
		const scaledProgress = progress ** 2 * .5;
		drawImageFromSource(context, sim.canvas, x + reveal.coords.x * scaledProgress, y + reveal.coords.y * scaledProgress, width * (1 - scaledProgress), height * (1 - scaledProgress), 0, 0, width, height);
		drawClippingCircle(context, progress, reveal.coords, reveal.maxDist, dpr);
		if (progress >= 1) target.revealed = true;
	}
	if (target.color) applyColorOnContext(context, target.color, 0, 0, width, height);
};
const getUnwrapProgress = (unwrap) => {
	const linear = Math.min((Date.now() - unwrap.startTime) / unwrap.duration, 1);
	return unwrap.from + (unwrap.to - unwrap.from) * unwrap.easing(linear);
};
const isUnwrapSettled = (unwrap) => Date.now() - unwrap.startTime >= unwrap.duration;
const buildAssembly = (target) => {
	const { glyphs, rects, dpr, unwrap } = target;
	if (!unwrap?.coords) return;
	const { width, height } = target.canvas;
	const glyphAlpha = glyphs && glyphs.width === width && glyphs.height === height ? glyphs.alpha : void 0;
	const candidates = [];
	for (const rect of rects) {
		const left = Math.max(0, Math.floor(rect.left * dpr));
		const right = Math.min(width, Math.ceil((rect.left + rect.width) * dpr));
		const top = Math.max(0, Math.floor(rect.top * dpr));
		const bottom = Math.min(height, Math.ceil((rect.top + rect.height) * dpr));
		for (let y = top; y < bottom; ++y) for (let x = left; x < right; ++x) {
			const index = y * width + x;
			if (glyphAlpha ? glyphAlpha[index] > GLYPH_INSIDE : Math.random() < .08) candidates.push(index);
		}
	}
	if (!candidates.length) {
		target.assembly = void 0;
		return;
	}
	const count = Math.min(ASSEMBLY_MAX, Math.max(1, Math.round(candidates.length * ASSEMBLY_SHARE)));
	const data = new Float32Array(count * ASSEMBLY_STRIDE);
	const centerX = unwrap.coords[0] * dpr;
	const centerY = unwrap.coords[1] * dpr;
	const radius = Math.max(unwrap.maxDist * dpr, 1);
	const spreadX = 28 * dpr;
	const spreadY = 12 * dpr;
	for (let particle = 0; particle < count; ++particle) {
		const index = candidates[Math.floor(Math.random() * candidates.length)];
		const targetX = index % width;
		const targetY = Math.floor(index / width);
		const offset = particle * ASSEMBLY_STRIDE;
		data[offset] = targetX + (Math.random() - .5) * 2 * spreadX;
		data[offset + 1] = targetY + (Math.random() - .5) * 2 * spreadY;
		data[offset + 2] = targetX + .5;
		data[offset + 3] = targetY + .5;
		data[offset + 4] = (Math.hypot(targetX - centerX, targetY - centerY) / radius + (Math.random() - .5) * .12) / TEXT_FRONT_WIDTH;
		data[offset + 5] = (.55 + Math.random() * .35) * dpr;
	}
	target.assembly = {
		data,
		count
	};
};
const drawAssembly = (target, progress) => {
	if (!target.assembly) buildAssembly(target);
	const { assembly, context, particleColor } = target;
	if (!assembly) return;
	const { data, count } = assembly;
	const front = progress * TEXT_SHIFT;
	const setAlpha = createParticleAlpha(context);
	context.save();
	context.fillStyle = particleColor;
	for (let particle = 0; particle < count; ++particle) {
		const offset = particle * ASSEMBLY_STRIDE;
		const local = front - data[offset + 4];
		if (local <= 0 || local >= TEXT_IN_END) continue;
		if (!setAlpha(getParticleAlpha(local, TEXT_PARTICLE_OUT, TEXT_IN_END) * ASSEMBLY_ALPHA)) continue;
		drawGatheringParticle(context, data, offset, local, TEXT_PARTICLE_ARRIVE);
	}
	context.restore();
};
const paintOverlayRect = (target, rect, sourceCanvas, clearScratch, zoom = 0, coords) => {
	const { context, scratchContext, dpr } = target;
	const left = rect.left;
	const top = Math.max(0, rect.top);
	const x = left * dpr;
	const y = top * dpr;
	const width = rect.width * dpr;
	const height = rect.height * dpr;
	context.fillStyle = rect.color || target.backgroundColor;
	context.fillRect(x, y, width, height);
	if (!sourceCanvas) return;
	if (clearScratch) scratchContext.clearRect(x, y, width, height);
	const [centerX, centerY] = coords || [left, top];
	drawImageFromSource(scratchContext, sourceCanvas, (left + (centerX - left) * zoom) * dpr, (top + (centerY - top) * zoom) * dpr, rect.width * (1 - zoom) * dpr, rect.height * (1 - zoom) * dpr, x, y, width, height);
	applyColorOnContext(scratchContext, target.particleColor, x, y, width, height);
	return {
		x,
		y,
		width,
		height
	};
};
const drawDustOverlay = (sim, target) => {
	const { canvas, context, scratchContext, dpr, rects } = target;
	const sourceCanvas = sim?.core.inited ? sim.canvas : void 0;
	let { unwrap } = target;
	if (unwrap && !unwrap.to && isUnwrapSettled(unwrap)) unwrap = target.unwrap = void 0;
	if (!unwrap) {
		target.overlayDust = target.assembly = void 0;
		return false;
	}
	const progress = getUnwrapProgress(unwrap);
	const { coords } = unwrap;
	if (!canvas.width || !canvas.height) {
		target.needsRedraw = false;
		return true;
	}
	const { scratch } = target;
	if (scratch.width !== canvas.width || scratch.height !== canvas.height) {
		scratch.width = canvas.width;
		scratch.height = canvas.height;
	}
	context.clearRect(0, 0, canvas.width, canvas.height);
	if (progress <= 0 || progress >= 1) target.overlayDust = void 0;
	const groups = getRectGroups(rects, dpr, canvas.width, canvas.height);
	if (!groups.length || progress >= 1 && unwrap.to) {
		target.assembly = void 0;
		target.needsRedraw = false;
		return true;
	}
	const revealing = coords && unwrap.maxDist && progress > 0;
	groups.forEach((group, index) => {
		const { left, top, width, height } = group;
		scratchContext.clearRect(left, top, width, height);
		for (const rect of group.rects) paintOverlayRect(target, rect, sourceCanvas, false);
		if (revealing) applyDustReveal(target, index, group, coords[0] * dpr, coords[1] * dpr, unwrap.maxDist * dpr, progress);
		context.drawImage(scratch, left, top, width, height, left, top, width, height);
	});
	if (target.overlayDust?.length > groups.length) target.overlayDust.length = groups.length;
	if (revealing) drawAssembly(target, progress);
	target.needsRedraw = false;
	return true;
};
const drawOverlayTarget = (sim, target) => {
	if (target.dust) try {
		if (drawDustOverlay(sim, target)) return;
	} catch (err) {
		reportDustError(err);
		target.dust = false;
		target.overlayDust = void 0;
		target.assembly = void 0;
		target.glyphs = void 0;
	}
	const { canvas, context, scratch, dpr, rects } = target;
	const sourceCanvas = sim?.core.inited ? sim.canvas : void 0;
	let { unwrap } = target;
	if (unwrap && !unwrap.to && isUnwrapSettled(unwrap)) unwrap = target.unwrap = void 0;
	const progress = unwrap ? getUnwrapProgress(unwrap) : 0;
	const coords = unwrap?.coords;
	context.clearRect(0, 0, canvas.width, canvas.height);
	const zoom = coords ? progress ** 2 * .4 : 0;
	for (const rect of rects) {
		const painted = paintOverlayRect(target, rect, sourceCanvas, true, zoom, coords);
		if (!painted) continue;
		const { x, y, width, height } = painted;
		context.drawImage(scratch, x, y, width, height, x, y, width, height);
	}
	if (coords && unwrap.maxDist) {
		context.save();
		context.globalCompositeOperation = "destination-out";
		context.fillStyle = "white";
		context.shadowBlur = unwrap.maxDist / 3.5 * dpr * progress;
		context.shadowColor = "white";
		context.beginPath();
		context.arc(coords[0] * dpr, coords[1] * dpr, unwrap.maxDist * progress * dpr, 0, 2 * Math.PI);
		context.fill();
		context.globalCompositeOperation = "source-over";
		context.restore();
	}
	target.needsRedraw = false;
};
const isMediaTargetActive = (target) => !target.revealed && (target.playing || !!target.reveal);
const isOverlayTargetActive = (target) => target.playing || target.needsRedraw || target.unwrap && (!target.unwrap.to || !isUnwrapSettled(target.unwrap));
const needsFrame = () => {
	for (const state of ports) {
		for (const target of state.mediaTargets.values()) if (isMediaTargetActive(target)) return true;
		for (const target of state.overlayTargets.values()) if (isOverlayTargetActive(target)) return true;
	}
	return false;
};
const frame = () => {
	const textDprsNeeded = /* @__PURE__ */ new Set();
	ports.forEach((state) => {
		for (const target of state.overlayTargets.values()) if (isOverlayTargetActive(target)) textDprsNeeded.add(target.dpr);
	});
	textDprsNeeded.forEach((dpr) => textSims.get(dpr)?.core.draw());
	const mediaDprsNeeded = /* @__PURE__ */ new Set();
	ports.forEach((state) => {
		for (const target of state.mediaTargets.values()) if (isMediaTargetActive(target)) {
			mediaDprsNeeded.add(state.mediaDpr);
			break;
		}
	});
	mediaDprsNeeded.forEach((dpr) => mediaSims.get(dpr)?.core.draw());
	ports.forEach((state) => {
		const mediaSim = mediaSims.get(state.mediaDpr);
		if (mediaSim) state.mediaTargets.forEach((target, id) => {
			if (!isMediaTargetActive(target)) return;
			const wasRevealed = target.revealed;
			try {
				drawMediaTarget(mediaSim, target, state.mediaDpr);
			} catch (err) {
				reportDustError(err);
				target.dust = false;
				target.mediaDust = void 0;
				target.mediaAssembly = void 0;
				target.softImage = void 0;
			}
			if (target.reveal && (target.reveal.frames = (target.reveal.frames ?? 0) + 1) === 2) state.port.postMessage({
				type: "media-revealing",
				id
			});
			if (target.revealed && !wasRevealed) state.port.postMessage({
				type: "media-revealed",
				id
			});
		});
		state.overlayTargets.forEach((target) => {
			if (!isOverlayTargetActive(target)) return;
			drawOverlayTarget(textSims.get(target.dpr), target);
		});
	});
	timerId = needsFrame() ? ctx.setTimeout(frame, FRAME_INTERVAL) : void 0;
};
const ensureLoop = () => {
	if (timerId !== void 0 || !needsFrame()) return;
	const now = Date.now();
	textSims.forEach((sim) => sim.core.lastDrawTime = now);
	mediaSims.forEach((sim) => sim.core.lastDrawTime = now);
	frame();
};
/**
* Frees the GL resources of the simulations no connected tab uses anymore
* (the last tab left, or a tab re-inited with another device pixel ratio)
*/
const pruneSims = () => {
	const textDprs = /* @__PURE__ */ new Set();
	const mediaDprs = /* @__PURE__ */ new Set();
	ports.forEach((state) => {
		if (state.textDpr !== void 0) textDprs.add(state.textDpr);
		if (state.mediaDpr !== void 0) mediaDprs.add(state.mediaDpr);
		state.overlayTargets.forEach((target) => textDprs.add(target.dpr));
	});
	textSims.forEach(({ core }, dpr) => {
		if (!textDprs.has(dpr)) {
			core.destroy();
			textSims.delete(dpr);
		}
	});
	mediaSims.forEach(({ core }, dpr) => {
		if (!mediaDprs.has(dpr)) {
			core.destroy();
			mediaSims.delete(dpr);
		}
	});
};
const removePort = (state) => {
	if (!ports.delete(state)) return;
	pruneSims();
};
const handleMessage = (state, message) => {
	switch (message.type) {
		case "text-init": {
			state.textDpr = message.dpr;
			let sim = textSims.get(message.dpr);
			if (!sim) textSims.set(message.dpr, sim = createSim(message));
			pruneSims();
			callbackify(sim.core.init(), () => state.port.postMessage({ type: "text-inited" }));
			break;
		}
		case "media-init": {
			state.mediaDpr = message.dpr;
			let sim = mediaSims.get(message.dpr);
			if (!sim) mediaSims.set(message.dpr, sim = createSim(message));
			pruneSims();
			callbackify(sim.core.init(), () => state.port.postMessage({ type: "media-inited" }));
			break;
		}
		case "media-attach":
			state.mediaTargets.set(message.id, {
				canvas: message.canvas,
				context: message.canvas.getContext("2d"),
				x: message.x,
				y: message.y,
				color: message.color,
				dust: true
			});
			break;
		case "media-thumbnail": {
			const target = state.mediaTargets.get(message.id);
			if (target) {
				target.thumbnail?.close();
				target.thumbnail = message.bitmap;
				target.tintedThumbnail = void 0;
			} else message.bitmap.close();
			break;
		}
		case "media-play": {
			const target = state.mediaTargets.get(message.id);
			if (!target) break;
			target.playing = true;
			ensureLoop();
			break;
		}
		case "media-pause": {
			const target = state.mediaTargets.get(message.id);
			if (target) target.playing = false;
			break;
		}
		case "media-reveal": {
			const target = state.mediaTargets.get(message.id);
			if (!target || target.revealed) break;
			target.reveal = {
				coords: message.coords,
				maxDist: message.maxDist,
				duration: message.duration,
				startTime: Date.now()
			};
			ensureLoop();
			break;
		}
		case "media-image": {
			const target = state.mediaTargets.get(message.id);
			if (target) {
				target.image?.close();
				target.image = message.bitmap;
				target.imagePlacement = message.placement;
				target.mediaAssembly = void 0;
				target.softImage = void 0;
			} else message.bitmap.close();
			break;
		}
		case "media-detach":
			state.mediaTargets.get(message.id)?.thumbnail?.close();
			state.mediaTargets.get(message.id)?.image?.close();
			state.mediaTargets.delete(message.id);
			break;
		case "overlay-attach": {
			const scratch = new OffscreenCanvas(message.canvas.width, message.canvas.height);
			state.overlayTargets.set(message.id, {
				canvas: message.canvas,
				context: message.canvas.getContext("2d"),
				scratch,
				scratchContext: scratch.getContext("2d"),
				dpr: message.dpr,
				dust: true,
				rects: [],
				backgroundColor: "transparent",
				particleColor: "white"
			});
			break;
		}
		case "overlay-update": {
			const target = state.overlayTargets.get(message.id);
			if (!target) break;
			if (target.canvas.width !== message.width || target.canvas.height !== message.height) {
				target.canvas.width = target.scratch.width = message.width;
				target.canvas.height = target.scratch.height = message.height;
			}
			target.rects = message.rects;
			target.backgroundColor = message.backgroundColor;
			target.particleColor = message.particleColor;
			drawOverlayTarget(textSims.get(target.dpr), target);
			ensureLoop();
			break;
		}
		case "overlay-unwrap": {
			const target = state.overlayTargets.get(message.id);
			if (!target) break;
			target.unwrap = {
				coords: message.coords,
				maxDist: message.maxDist,
				from: 0,
				to: 1,
				duration: message.duration,
				startTime: Date.now(),
				easing: unwrapEasing
			};
			target.assembly = void 0;
			ensureLoop();
			break;
		}
		case "overlay-wrap": {
			const target = state.overlayTargets.get(message.id);
			if (!target?.unwrap) break;
			target.unwrap = {
				...target.unwrap,
				from: getUnwrapProgress(target.unwrap),
				to: 0,
				duration: message.duration,
				startTime: Date.now(),
				easing: defaultEasing
			};
			ensureLoop();
			break;
		}
		case "overlay-glyphs": {
			const target = state.overlayTargets.get(message.id);
			const { bitmap } = message;
			if (target) {
				const glyphContext = new OffscreenCanvas(bitmap.width, bitmap.height).getContext("2d", { willReadFrequently: true });
				glyphContext.drawImage(bitmap, 0, 0);
				const pixels = glyphContext.getImageData(0, 0, bitmap.width, bitmap.height).data;
				const alpha = new Uint8Array(bitmap.width * bitmap.height);
				for (let index = 0; index < alpha.length; ++index) alpha[index] = pixels[index * 4 + 3];
				target.glyphs = {
					width: bitmap.width,
					height: bitmap.height,
					alpha
				};
				target.assembly = void 0;
			}
			bitmap.close();
			break;
		}
		case "overlay-reset": {
			const target = state.overlayTargets.get(message.id);
			if (!target) break;
			target.unwrap = void 0;
			target.needsRedraw = true;
			ensureLoop();
			break;
		}
		case "overlay-clear": {
			const target = state.overlayTargets.get(message.id);
			if (!target) break;
			target.rects = [];
			target.context.clearRect(0, 0, target.canvas.width, target.canvas.height);
			break;
		}
		case "overlay-play": {
			const target = state.overlayTargets.get(message.id);
			if (!target) break;
			target.playing = true;
			ensureLoop();
			break;
		}
		case "overlay-pause": {
			const target = state.overlayTargets.get(message.id);
			if (target) target.playing = false;
			break;
		}
		case "overlay-detach":
			state.overlayTargets.delete(message.id);
			pruneSims();
			break;
		case "bye": removePort(state);
	}
};
const setupPort = (port) => {
	const state = {
		port,
		mediaTargets: /* @__PURE__ */ new Map(),
		overlayTargets: /* @__PURE__ */ new Map()
	};
	ports.add(state);
	port.onmessage = (event) => handleMessage(state, event.data);
	port.addEventListener?.("close", () => removePort(state));
};
if (typeof DedicatedWorkerGlobalScope !== "undefined" && self instanceof DedicatedWorkerGlobalScope) setupPort(ctx);
else self.onconnect = (event) => setupPort(event.ports[0]);
//#endregion
