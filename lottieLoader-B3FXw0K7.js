//# allFunctionsCalledOnLoad
import { h as Modes, i as IS_APPLE_MOBILE, l as IS_SAFARI, n as IS_ANDROID, p as MOUNT_CLASS_TO, r as IS_APPLE } from "./userAgent-ByGXcznk.js";
import { t as doubleRaf } from "./schedulers-Cx0-7a1P.js";
import { o as customProperties } from "./themeController-2cytOOn0.js";
import { t as noop } from "./noop-H9NNBLfX.js";
import { t as pause } from "./pause-BSJh-z46.js";
import { I as blobConstruct } from "./objectUrlUtils-5x08MNuO.js";
import { Z as appleMx_default, t as apiManagerProxy } from "./apiManagerProxy-DmQXvxSF.js";
import { n as rootScope } from "./rootScope-CZS0lmz8.js";
import { n as logger, t as LogTypes } from "./logger-7zf0rNYS.js";
import { t as EventListenerBase } from "./eventListenerBase-da40Q-0t.js";
import { t as superMessagePort_default } from "./superMessagePort-DhrhiTig.js";
import { t as makeError } from "./makeError-CiXxcKtE.js";
import { r as toArray } from "./encryptedStorageLayer-gN9TBXzg.js";
import { n as getAppWindow, t as bindActiveWindowListener } from "./appWindow-bo-KtJhy.js";
import { t as clamp } from "./clamp-9UaNhw6N.js";
import { n as mediaSizes } from "./mediaSizes-C1MTaleW.js";
import { n as animationIntersector } from "./animationIntersector-vAjH_7t1.js";
import { t as lottieMessagePort } from "./lottieMessagePort-CzPGpJ3D.js";
import { t as IS_IMAGE_BITMAP_SUPPORTED } from "./imageBitmapSupport-CG1okL3h.js";
import { t as forgetFailedRequest } from "./forgetFailedRequest-BItMIRL8.js";
import { n as IS_WEB_ASSEMBLY_SIMD_SUPPORTED, t as IS_WEB_ASSEMBLY_BASELINE_SUPPORTED } from "./webAssemblyBaselineSupport-CW9cv_m1.js";
//#region src/helpers/solid/readValue.ts
function readValue(value) {
	return typeof value === "function" ? value() : value;
}
//#endregion
//#region src/lib/lottie/shouldRenderOffscreen.ts
var SHOULD_RENDER_OFFSCREEN = (() => {
	try {
		if (typeof OffscreenCanvas === "undefined") return false;
		if (typeof HTMLCanvasElement !== "undefined" && !("transferControlToOffscreen" in HTMLCanvasElement.prototype)) return false;
		return !!new OffscreenCanvas(1, 1).getContext("2d");
	} catch (err) {
		return false;
	}
})() && IS_IMAGE_BITMAP_SUPPORTED && !IS_SAFARI && !Modes.noOffscreenCanvas && (() => {
	try {
		return localStorage.getItem("noOffscreenCanvas") !== "1";
	} catch (err) {
		return true;
	}
})() && true;
//#endregion
//#region src/helpers/framesCache.ts
var FramesCache = class FramesCache {
	constructor() {
		this.cache = /* @__PURE__ */ new Map();
	}
	static createCache() {
		const cache = {
			frames: /* @__PURE__ */ new Map(),
			framesNew: /* @__PURE__ */ new Map(),
			framesURLs: /* @__PURE__ */ new Map(),
			clearCache: () => {
				cache.framesNew.forEach((value) => {
					value.close?.();
				});
				cache.frames.clear();
				cache.framesNew.clear();
				cache.framesURLs.clear();
			},
			counter: 0
		};
		return cache;
	}
	getCache(name) {
		let cache = this.cache.get(name);
		if (!cache) this.cache.set(name, cache = FramesCache.createCache());
		++cache.counter;
		return cache;
	}
	releaseCache(name) {
		const cache = this.cache.get(name);
		if (cache && !--cache.counter) {
			cache.clearCache();
			this.cache.delete(name);
		}
	}
	getCacheCounter(name) {
		return this.cache.get(name)?.counter;
	}
	generateName(name, width, height, color, toneIndex) {
		return [
			name,
			width,
			height,
			toneIndex || ""
		].filter(Boolean).join("-");
	}
};
var framesCache = new FramesCache();
MOUNT_CLASS_TO && (MOUNT_CLASS_TO.framesCache = framesCache);
//#endregion
//#region src/helpers/canvas/applyColorOnContext.ts
var lottieColorToString = (color) => typeof color === "string" ? color : `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
function applyColorOnContext(context, color, x, y, width, height) {
	context.globalCompositeOperation = "source-atop";
	context.fillStyle = lottieColorToString(color);
	context.fillRect(x, y, width, height);
	context.globalCompositeOperation = "source-over";
}
//#endregion
//#region src/lib/customEmoji/compositorMessagePort.ts
var EmojiCompositorMessagePort = class extends superMessagePort_default {
	constructor() {
		super("EMOJI-COMPOSITOR");
	}
	invokeCompositorVoid(method, payload, transfer) {
		this.invokeVoidAs(method, payload, void 0, transfer);
	}
	invokeCompositor(method, payload, transfer) {
		return this.invokeAs(method, payload, void 0, transfer);
	}
};
var compositorMessagePort = new EmojiCompositorMessagePort();
MOUNT_CLASS_TO && (MOUNT_CLASS_TO.compositorMessagePort = compositorMessagePort);
//#endregion
//#region src/lib/customEmoji/compositorChannels.ts
var compositorWorker;
var mintedDecodeChannels = /* @__PURE__ */ new Set();
var ensureCompositor = () => {
	if (compositorWorker) return;
	compositorWorker = new Worker(new URL(
		/* @vite-ignore */
		"/Monolith/compositor.worker-C0VWCM42.js",
		"" + import.meta.url
	), { type: "module" });
	compositorMessagePort.attachPort(compositorWorker);
};
var ensureDecodeChannel = (workerId) => {
	ensureCompositor();
	if (mintedDecodeChannels.has(workerId)) return;
	mintedDecodeChannels.add(workerId);
	const channel = new MessageChannel();
	compositorMessagePort.invokeCompositorVoid("decodePort", { workerId }, [channel.port1]);
	lottieMessagePort.invokeLottieVoid(workerId, "compositorPort", void 0, [channel.port2]);
};
//#endregion
//#region src/lib/lottie/lottiePlayer.ts
var _LottiePlayer;
function getLottiePixelRatio(width, height, needUpscale) {
	let pixelRatio = clamp(window.devicePixelRatio, 1, 2);
	if (pixelRatio > 1 && !needUpscale) {
		if (width > 90 && height > 90) {
			if (!IS_APPLE && mediaSizes.isMobile) pixelRatio = 1;
		} else if (width > 60 && height > 60 || IS_ANDROID) pixelRatio = Math.max(1.5, pixelRatio - 1.5);
	}
	return pixelRatio;
}
var PRESENT_PAINT_WAITS = 3;
var LottiePlayer = class LottiePlayer extends EventListenerBase {
	constructor({ el, options }) {
		super(true);
		this.offscreen = false;
		this.width = 0;
		this.height = 0;
		this.destroyed = false;
		this.paused = true;
		this.direction = 1;
		this.speed = 1;
		this.autoplay = true;
		this.loop = true;
		this.group = "";
		this.cachingDelta = 0;
		this.playedTimes = 0;
		this.failed = false;
		this.reqId = lottieMessagePort.getNextTaskId();
		this.workerId = lottieMessagePort.getNextWorkerIndex();
		this.el = el;
		for (const i in options) if (this.hasOwnProperty(i)) this[i] = options[i];
		this._loop = this.loop;
		this._autoplay = this.autoplay;
		this.initFrame = options.initFrame;
		this.color = options.color;
		this.textColor = options.textColor;
		this.name = options.name;
		this.skipFirstFrameRendering = options.skipFirstFrameRendering;
		this.toneIndex = options.toneIndex;
		this.raw = false;
		this.liteModeKey = options.liteModeKey;
		if (this.name) this.cacheName = LottiePlayer.CACHE.generateName(this.name, this.width, this.height, this.color, this.toneIndex);
		const eligible = SHOULD_RENDER_OFFSCREEN && !options.noOffscreen && !options.canvas && !this.raw;
		this.offscreen = !eligible ? false : options.sync ? options.compositorDelivery ? "emoji" : false : "canvas";
		this.offscreenViaCompositor = this.offscreen === "canvas" && true;
		if (this.offscreen && this.cacheName) this.workerId = lottieMessagePort.getWorkerIndexForName(this.cacheName);
		let skipRatio;
		if (options.skipRatio !== void 0) skipRatio = options.skipRatio;
		else if ((IS_ANDROID || IS_APPLE_MOBILE || IS_APPLE && !IS_SAFARI && !appleMx_default) && this.width < 100 && this.height < 100 && !options.needUpscale) skipRatio = .5;
		this.skipDelta = skipRatio !== void 0 ? 1 / skipRatio | 0 : 1;
		const pixelRatio = this.pixelRatio = getLottiePixelRatio(this.width, this.height, options.needUpscale);
		this.width = Math.round(this.width * pixelRatio);
		this.height = Math.round(this.height * pixelRatio);
		if (!options.noCache) {
			if (IS_APPLE && this.width > 100 && this.height > 100) this.cachingDelta = 2;
			else if (this.width < 100 && this.height < 100) this.cachingDelta = Infinity;
			else this.cachingDelta = 4;
		}
		if (this.offscreen === "emoji") this.canvas = [];
		else if (!this.canvas) {
			this.canvas = this.createCanvases(pixelRatio);
			if (this.offscreen) this.offscreenCanvases = this.canvas.map((canvas) => {
				canvas.dataset.offscreen = "1";
				return canvas.transferControlToOffscreen();
			});
		}
		if (this.offscreen) {
			this.contexts = [];
			this.cache = FramesCache.createCache();
		} else this.initLegacySurfaces();
	}
	createCanvases(pixelRatio) {
		return this.el.map(() => {
			const canvas = document.createElement("canvas");
			canvas.classList.add("lottie");
			canvas.width = this.width;
			canvas.height = this.height;
			canvas.dpr = pixelRatio;
			return canvas;
		});
	}
	initLegacySurfaces() {
		this.contexts = this.canvas.map((canvas) => canvas.getContext("2d"));
		if (!IS_IMAGE_BITMAP_SUPPORTED || this.raw) {
			this.imageData = new ImageData(this.width, this.height);
			this.clamped = new Uint8ClampedArray(this.width * this.height * 4);
		}
		if (this.name) this.cache = LottiePlayer.CACHE.getCache(this.cacheName);
		else this.cache ?? (this.cache = FramesCache.createCache());
	}
	setSize(width, height) {
		this.width = width;
		this.height = height;
		if (this.offscreen) {
			if (this.offscreenViaCompositor) compositorMessagePort.invokeCompositorVoid("resizeSticker", {
				reqId: this.reqId,
				width,
				height
			});
			else this.sendQueryVoid("resizeCanvases", {
				width,
				height
			});
			return;
		}
		this.canvas.forEach((canvas) => {
			canvas.width = width;
			canvas.height = height;
		});
	}
	clearCache() {
		if (this.offscreen) {
			this.sendQueryVoid("clearFramesCache");
			return;
		}
		if (this.cachingDelta === Infinity) return;
		if (this.cacheName && this.cache.counter > 1) return;
		this.cache.clearCache();
	}
	clearCacheWhenSafe() {
		if (this.offscreen) {
			this.clearCache();
			return;
		}
		if (this.rafId) this.clearCacheOnRafId = this.rafId;
		else this.clearCache();
	}
	sendQuery(method, payload, transfer) {
		return lottieMessagePort.invokeLottie(this.workerId, method, {
			...payload,
			reqId: this.reqId
		}, transfer);
	}
	fail(error) {
		if (this.destroyed || this.failed) return;
		this.failed = true;
		this.error = error;
		this.dispatchEvent("error", error);
	}
	get hasFailed() {
		return this.failed;
	}
	sendQueryVoid(method, payload, transfer) {
		lottieMessagePort.invokeLottieVoid(this.workerId, method, {
			...payload,
			reqId: this.reqId
		}, transfer);
	}
	exportFrame(frameNo) {
		return this.sendQuery("exportFrame", { frameNo });
	}
	nudgePresent() {
		if (this.offscreen === "canvas" && this.renderedFirstFrame) {
			if (this.offscreenViaCompositor) compositorMessagePort.invokeCompositorVoid("presentSticker", { reqId: this.reqId });
			else this.sendQueryVoid("presentFrame", { frameNo: this.curFrame });
		}
	}
	async ensurePresented() {
		if (this.offscreen !== "canvas" || !this.renderedFirstFrame || this.destroyed) return;
		if (this.offscreenViaCompositor) await compositorMessagePort.invokeCompositor("presentSticker", { reqId: this.reqId }).catch(() => {});
		else await this.sendQuery("presentFrame", { frameNo: this._curFrame }).catch(() => {});
		for (let i = 0; i < PRESENT_PAINT_WAITS && !this.destroyed; ++i) await doubleRaf();
	}
	get hasRenderedFirstFrame() {
		return this.renderedFirstFrame;
	}
	onFirstFrame(callback) {
		if (this.renderedFirstFrame) callback();
		else this.addEventListener("firstFrame", callback, { once: true });
	}
	getResolvedColor() {
		if (this.color) return lottieColorToString(this.color);
		if (this.textColor) return customProperties.getPropertyAsColor(readValue(this.textColor));
	}
	sendColorToWorker(reTint) {
		if (this.offscreenViaCompositor) {
			compositorMessagePort.invokeCompositorVoid("configSticker", {
				reqId: this.reqId,
				color: this.getResolvedColor()
			});
			return;
		}
		this.sendQueryVoid("setColor", {
			color: this.getResolvedColor(),
			reTint
		});
	}
	loadFromData(data, wasmUrl) {
		if (this.offscreenViaCompositor) {
			ensureCompositor();
			ensureDecodeChannel(this.workerId);
			compositorMessagePort.invokeCompositorVoid("attachSticker", {
				reqId: this.reqId,
				canvases: this.offscreenCanvases || [],
				color: this.getResolvedColor()
			}, this.offscreenCanvases?.slice());
		} else if (this.offscreen === "emoji") ensureDecodeChannel(this.workerId);
		const compositorDelivery = this.offscreen === "emoji" || this.offscreenViaCompositor;
		const offscreen = this.offscreen ? {
			canvases: compositorDelivery ? [] : this.offscreenCanvases || [],
			cacheName: this.cacheName,
			cachingDelta: this.cachingDelta,
			color: compositorDelivery ? void 0 : this.getResolvedColor(),
			compositorDelivery: compositorDelivery || void 0
		} : void 0;
		const transfer = offscreen?.canvases.length ? offscreen.canvases.slice() : void 0;
		this.offscreenCanvases = void 0;
		return this.sendQuery("loadFromData", {
			blob: data,
			wasmUrl,
			width: this.width,
			height: this.height,
			toneIndex: this.toneIndex,
			raw: this.raw,
			offscreen
		}, transfer).then(({ frameCount, fps }) => {
			if (this.destroyed) return;
			return this.onLoad(frameCount, fps);
		}).catch((err) => {
			if (this.offscreen && !this.offscreenLoadFailed && !this.destroyed) {
				console.error("offscreen loadFromData error, retrying legacy:", err, this);
				this.offscreenLoadFailed = true;
				this.sendQuery("destroy");
				if (this.offscreenViaCompositor) {
					compositorMessagePort.invokeCompositorVoid("detachSticker", { reqId: this.reqId });
					this.offscreenViaCompositor = false;
				}
				const previousReqId = this.reqId;
				this.reqId = lottieMessagePort.getNextTaskId();
				this.dispatchEvent("reqIdChanged", {
					previousReqId,
					reqId: this.reqId
				});
				this.offscreen = false;
				this.canvas = this.createCanvases(this.pixelRatio);
				this.initLegacySurfaces();
				return this.loadFromData(data, wasmUrl);
			}
			console.error(err, data, this);
			throw err;
		});
	}
	get curFrame() {
		return this.freeRunning ? this.estimateFreeRunFrame() : this._curFrame;
	}
	set curFrame(frame) {
		this.downgradeFreeRun();
		this._curFrame = frame;
	}
	addEventListener(name, callback, options) {
		super.addEventListener(name, callback, options);
		if (name === "enterFrame" && this.freeRunning && callback !== this.frameListener) this.downgradeFreeRun();
	}
	hasExternalEnterFrameListeners() {
		const listeners = this.listeners.enterFrame;
		if (!listeners) return false;
		for (const listener of listeners) if (listener.callback !== this.frameListener) return true;
		return false;
	}
	canFreeRun() {
		return !!this.offscreen && !this.freeRunBarred && typeof this.loop === "boolean" && this.renderedFirstFrame && !this.hasExternalEnterFrameListeners();
	}
	onFreeRunStopped(curFrame, error) {
		if (!this.freeRunning || this.destroyed) return;
		console.error("Lottie free-run stopped, falling back to command mode:", error, this);
		this.freeRunBarred = true;
		this.freeRunning = false;
		this.freeRunEpoch = void 0;
		this._curFrame = curFrame;
		if (!this.paused) this.setMainLoop();
	}
	onFreeRunEnded(curFrame) {
		if (!this.freeRunning || this.destroyed) return;
		this.freeRunning = false;
		this.freeRunEpoch = void 0;
		this._curFrame = curFrame;
		++this.playedTimes;
		this.autoplay = false;
		this.pause(false);
		this.clearCacheWhenSafe();
	}
	estimateFreeRunFrame() {
		const epoch = this.freeRunEpoch;
		if (!epoch || !this.frInterval) return this._curFrame;
		const ticks = (Date.now() - epoch.time) / this.frInterval | 0;
		const { skipDelta, minFrame, maxFrame } = this;
		if (!(maxFrame >= minFrame) || !(skipDelta > 0)) return epoch.frame;
		const forwards = this.direction === 1;
		const ticksToWrap = Math.floor((forwards ? maxFrame - epoch.frame : epoch.frame - minFrame) / skipDelta) + 1;
		if (ticks < ticksToWrap) return epoch.frame + ticks * skipDelta * this.direction;
		if (!this.loop) return forwards ? maxFrame : minFrame;
		const lapTicks = Math.floor((maxFrame - minFrame) / skipDelta) + 1;
		const offset = (ticks - ticksToWrap) % lapTicks * skipDelta;
		return forwards ? minFrame + offset : maxFrame - offset;
	}
	engageFreeRun() {
		const frame = this._curFrame = this.curFrame;
		this.freeRunning = true;
		this.freeRunEpoch = {
			frame,
			time: Date.now()
		};
		this.sendQueryVoid("playFreeRun", {
			curFrame: frame,
			frInterval: this.frInterval,
			skipDelta: this.skipDelta,
			direction: this.direction,
			minFrame: this.minFrame,
			maxFrame: this.maxFrame,
			loop: !!this.loop
		});
	}
	downgradeFreeRun() {
		if (!this.freeRunning) return;
		const estimated = this._curFrame = this.estimateFreeRunFrame();
		this.freeRunning = false;
		if (this.destroyed) return;
		this.sendQuery("pauseFreeRun").then((result) => {
			if (this.destroyed || this.freeRunning) return;
			if (result?.curFrame !== void 0 && this._curFrame === estimated) this._curFrame = result.curFrame;
			if (!this.paused) this.setMainLoop();
		});
	}
	updateFreeRunParams() {
		this._curFrame = this.estimateFreeRunFrame();
		this.frInterval = 1e3 / this.fps / this.speed * this.skipDelta;
		this.freeRunEpoch = {
			frame: this._curFrame,
			time: Date.now()
		};
		this.sendQueryVoid("updateFreeRun", {
			frInterval: this.frInterval,
			direction: this.direction,
			minFrame: this.minFrame,
			maxFrame: this.maxFrame
		});
	}
	onPlaybackParamsMutated() {
		if (this.freeRunning && this.loop !== true) this.downgradeFreeRun();
	}
	play() {
		if (!this.paused) return;
		this.paused = false;
		this.setMainLoop();
	}
	pause(clearPendingRAF = true) {
		if (this.paused) return;
		this.paused = true;
		this.downgradeFreeRun();
		if (clearPendingRAF) {
			clearTimeout(this.rafId);
			this.rafId = void 0;
		}
	}
	resetCurrentFrame() {
		return this.curFrame = this.initFrame ?? (this.direction === 1 ? this.minFrame : this.maxFrame);
	}
	stop(renderFirstFrame = true) {
		this.pause();
		const curFrame = this.resetCurrentFrame();
		if (renderFirstFrame) this.requestFrame(curFrame);
	}
	restart() {
		this.stop(false);
		this.play();
	}
	playOrRestart() {
		if (!this.paused) return;
		if (this.curFrame === this.maxFrame) this.restart();
		else this.play();
	}
	setSpeed(speed) {
		if (this.speed === speed) return;
		this.speed = speed;
		if (this.freeRunning) {
			this.updateFreeRunParams();
			return;
		}
		if (!this.paused) this.setMainLoop();
	}
	setDirection(direction) {
		if (this.direction === direction) return;
		this.direction = direction;
		if (this.freeRunning) {
			this.updateFreeRunParams();
			return;
		}
		if (!this.paused) this.setMainLoop();
	}
	remove() {
		if (this.destroyed) return;
		this.destroyed = true;
		this.pause();
		this.sendQuery("destroy");
		if (this.offscreenViaCompositor) compositorMessagePort.invokeCompositorVoid("detachSticker", { reqId: this.reqId });
		if (this.cacheName && !this.offscreen) LottiePlayer.CACHE.releaseCache(this.cacheName);
		this.dispatchEvent("destroy");
		this.cleanup();
	}
	applyColor(context) {
		applyColorOnContext(context, this.color || customProperties.getPropertyAsColor(readValue(this.textColor)), 0, 0, this.width, this.height);
	}
	applyColorForAllContexts() {
		if (!this.color && !this.textColor) return;
		if (this.offscreen) {
			this.sendColorToWorker(true);
			return;
		}
		this.contexts.forEach((context) => {
			this.applyColor(context);
		});
	}
	renderFrame2(frame, frameNo) {
		if (this.offscreen === "emoji" || this.offscreenViaCompositor) {
			this.renderedFirstFrame = true;
			this.dispatchEvent("enterFrame", frameNo);
			return;
		}
		if (this.offscreen) {
			if (!this.renderedFirstFrame) {
				this.renderedFirstFrame = true;
				this.sendQuery("presentFrame", { frameNo }).then(() => {
					if (this.destroyed) return;
					this.dispatchEvent("enterFrame", frameNo);
				}).catch((err) => this.fail(err));
			} else {
				this.sendQueryVoid("presentFrame", { frameNo });
				this.dispatchEvent("enterFrame", frameNo);
			}
			return;
		}
		let cachedSource;
		try {
			if (frame instanceof Uint8ClampedArray) this.imageData.data.set(frame);
			this.contexts.forEach((context, idx) => {
				cachedSource = this.cache.framesNew.get(frameNo);
				if (!(frame instanceof Uint8ClampedArray)) cachedSource = frame;
				else if (idx > 0) cachedSource = this.canvas[0];
				if (!cachedSource) {
					const c = document.createElement("canvas");
					c.width = context.canvas.width;
					c.height = context.canvas.height;
					c.getContext("2d").putImageData(this.imageData, 0, 0);
					this.cache.framesNew.set(frameNo, c);
					cachedSource = c;
				}
				if (this.overrideRender && this.renderedFirstFrame) this.overrideRender(cachedSource || this.imageData);
				else if (cachedSource) {
					context.clearRect(0, 0, cachedSource.width, cachedSource.height);
					context.drawImage(cachedSource, 0, 0);
				} else context.putImageData(this.imageData, 0, 0);
				if (this.color || this.textColor) this.applyColor(context);
				if (!this.renderedFirstFrame) this.renderedFirstFrame = true;
			});
			this.dispatchEvent("enterFrame", frameNo);
		} catch (err) {
			console.error("LottiePlayer renderFrame error:", err, this, cachedSource);
			this.autoplay = false;
			this.pause();
			this.fail(err);
		}
	}
	renderFrame(frame, frameNo) {
		if (this.cachingDelta && (frameNo % this.cachingDelta || !frameNo)) {
			if (frame instanceof Uint8ClampedArray && !this.cache.frames.has(frameNo)) this.cache.frames.set(frameNo, new Uint8ClampedArray(frame));
			else if (IS_IMAGE_BITMAP_SUPPORTED && frame instanceof ImageBitmap && !this.cache.framesNew.has(frameNo)) this.cache.framesNew.set(frameNo, frame);
		}
		if (this.frInterval) {
			const delta = Date.now() - this.frThen;
			if (delta < 0) {
				const timeout = this.frInterval > -delta ? -delta % this.frInterval : this.frInterval;
				if (this.rafId) clearTimeout(this.rafId);
				const rafId = this.rafId = window.setTimeout(() => {
					this.renderFrame2(frame, frameNo);
					if (this.clearCacheOnRafId === rafId) {
						this.clearCacheOnRafId = void 0;
						this.clearCache();
					}
				}, timeout);
				return;
			}
		}
		this.renderFrame2(frame, frameNo);
	}
	requestFrame(frameNo) {
		if (this.offscreen) {
			this.sendQuery("renderFrame", { frameNo }).then(({ frameNo }) => {
				if (this.destroyed) return;
				this.renderFrame(void 0, frameNo);
			}).catch((err) => this.fail(err));
			return;
		}
		const frame = this.cache.frames.get(frameNo);
		const frameNew = this.cache.framesNew.get(frameNo);
		if (frameNew) this.renderFrame(frameNew, frameNo);
		else if (frame) this.renderFrame(frame, frameNo);
		else {
			if (this.clamped && !this.clamped.length) this.clamped = new Uint8ClampedArray(this.width * this.height * 4);
			this.sendQuery("renderFrame", { frameNo }, this.clamped ? [this.clamped.buffer] : void 0).then(({ frame, frameNo }) => {
				if (this.destroyed) return;
				if (this.clamped !== void 0 && frame instanceof Uint8ClampedArray) this.clamped = frame;
				this.renderFrame(frame, frameNo);
			}).catch((err) => this.fail(err));
		}
	}
	onLap() {
		++this.playedTimes;
		if (typeof this.loop === "number" && this.playedTimes >= this.loop) this.loop = this.autoplay = this._loop = this._autoplay = false;
		if (!this.loop) {
			this.pause(false);
			this.clearCacheWhenSafe();
			return false;
		}
		return true;
	}
	mainLoopForwards() {
		const { skipDelta, minFrame, maxFrame } = this;
		if (this.curFrame + skipDelta > maxFrame) {
			const keepLooping = this.onLap();
			this.requestFrame(this.curFrame = keepLooping ? minFrame : maxFrame);
			return keepLooping;
		}
		this.requestFrame(this.curFrame += skipDelta);
		return true;
	}
	mainLoopBackwards() {
		const { skipDelta, minFrame, maxFrame } = this;
		if (this.curFrame - skipDelta < minFrame) {
			const keepLooping = this.onLap();
			this.requestFrame(this.curFrame = keepLooping ? maxFrame : minFrame);
			return keepLooping;
		}
		this.requestFrame(this.curFrame -= skipDelta);
		return true;
	}
	setMainLoop() {
		clearTimeout(this.rafId);
		this.rafId = void 0;
		this.frInterval = 1e3 / this.fps / this.speed * this.skipDelta;
		this.frThen = Date.now() - this.frInterval;
		if (!this.paused && this.canFreeRun()) {
			this.engageFreeRun();
			return;
		}
		const method = (this.direction === 1 ? this.mainLoopForwards : this.mainLoopBackwards).bind(this);
		this.currentMethod = method;
		if (this.frameListener) {
			if (this.listenerResults.enterFrame !== void 0) this.frameListener(this.curFrame);
		}
	}
	playPart(options) {
		this.pause();
		const { from, to, callback } = options;
		this.curFrame = from - 1;
		return this.playToFrame({
			frame: to,
			direction: to > from ? 1 : -1,
			callback
		});
	}
	playToFrame(options) {
		this.pause();
		const { frame, speed, callback, direction } = options;
		this.setDirection(direction === void 0 ? this.curFrame > frame ? -1 : 1 : direction);
		speed !== void 0 && this.setSpeed(speed);
		const bounds = [this.curFrame, frame];
		if (this.direction === -1) bounds.reverse();
		this.loop = false;
		this.setMinMax(bounds[0], bounds[1]);
		if (this.playToFrameOnFrameCallback) this.removeEventListener("enterFrame", this.playToFrameOnFrameCallback);
		if (callback) {
			this.playToFrameOnFrameCallback = (frameNo) => {
				if (frameNo === frame) {
					this.removeEventListener("enterFrame", this.playToFrameOnFrameCallback);
					callback();
				}
			};
			this.addEventListener("enterFrame", this.playToFrameOnFrameCallback);
		}
		this.play();
	}
	setColor(color, renderIfPaused) {
		if (typeof color === "string") this.textColor = color;
		else this.color = color;
		if (this.offscreen) {
			this.sendColorToWorker(renderIfPaused && this.paused);
			return;
		}
		if (renderIfPaused && this.paused) this.applyColorForAllContexts();
	}
	setMinMax(minFrame = 0, maxFrame = this.frameCount - 1) {
		this.minFrame = minFrame;
		this.maxFrame = maxFrame;
	}
	async onLoad(frameCount, fps) {
		this.frameCount = frameCount;
		this.fps = fps;
		this.setMinMax();
		if (this.initFrame !== void 0) this.initFrame = clamp(this.initFrame, this.minFrame, this.maxFrame);
		const curFrame = this.resetCurrentFrame();
		if (this.fps < 60 && this.skipDelta !== 1) {
			const diff = 60 / fps;
			this.skipDelta = this.skipDelta / diff | 0;
		}
		this.frInterval = 1e3 / this.fps / this.speed * this.skipDelta;
		this.frThen = Date.now() - this.frInterval;
		!this.skipFirstFrameRendering && this.requestFrame(curFrame);
		this.dispatchEvent("ready");
		this.addEventListener("enterFrame", () => {
			if (this.canvas[0] && !this.canvas[0].parentNode && this.el?.[0] && !this.overrideRender) {
				this.el.forEach((container, idx) => container.append(this.canvas[idx]));
				this.nudgePresent();
			}
			this.dispatchEvent("firstFrame");
			this.frameListener = () => {
				if (this.paused || this.freeRunning || !this.currentMethod) return;
				if (this.canFreeRun()) {
					this.engageFreeRun();
					return;
				}
				const time = Date.now();
				this.frThen = time + this.frInterval;
				if (!this.currentMethod() && !this.loop && this.autoplay) this.autoplay = false;
			};
			this.addEventListener("enterFrame", this.frameListener);
			if (this.group === "none" && this.autoplay) this.play();
		}, { once: true });
	}
};
_LottiePlayer = LottiePlayer;
_LottiePlayer.CACHE = framesCache;
//#endregion
//#region src/lib/lottie/lottieLoader.ts
var TLOTTIE_WASM_URL = new URL(IS_WEB_ASSEMBLY_SIMD_SUPPORTED ? "/Monolith/tlottie-VsBq3Bx4.wasm" : "/Monolith/tlottie.nosimd-BUa8xe0v.wasm", location.href).href;
var LottieLoader = class {
	constructor() {
		this.loaded = false;
		this.players = {};
		this.playersByCacheName = {};
		this.assetData = /* @__PURE__ */ new Map();
		this.log = logger("LOTTIE", LogTypes.Error);
		rootScope.addEventListener("theme_changed", () => {
			for (const reqId in this.players) this.players[reqId].applyColorForAllContexts();
		});
		lottieMessagePort.addEventListener("freeRunStopped", ({ reqId, curFrame, error }) => {
			this.players[reqId]?.onFreeRunStopped(curFrame, error);
		});
		lottieMessagePort.addEventListener("freeRunEnded", ({ reqId, curFrame }) => {
			this.players[reqId]?.onFreeRunEnded(curFrame);
		});
	}
	getAnimation(element) {
		for (const i in this.players) if (this.players[i].el.includes(element)) return this.players[i];
		return null;
	}
	nudgeOffscreenPlayers() {
		for (const reqId in this.players) this.players[reqId].nudgePresent();
	}
	nudgePresentWithin(root) {
		for (const reqId in this.players) {
			const player = this.players[reqId];
			if (player.el?.some((el) => el && root.contains(el))) player.nudgePresent();
		}
	}
	loadLottieWorkers() {
		if (!IS_WEB_ASSEMBLY_BASELINE_SUPPORTED) return Promise.resolve();
		if (this.loadPromise) return this.loadPromise;
		return this.loadPromise = this.registerLottieWorkers();
	}
	/**
	* Everything a first sticker waits for but its own data: the workers with their engine (half a megabyte a worker
	* fetches and compiles for its first animation otherwise) and, where stickers are drawn off the page's thread, the
	* compositor with its channels to them, which the first such sticker starts otherwise. Started ahead of a screen
	* whose sticker should be there when it opens; resolves once the engines are in, the compositor booting on.
	*/
	loadLottieEngine() {
		return this.enginePromise ?? (this.enginePromise = forgetFailedRequest(this.loadLottieWorkers().then(() => {
			if (!IS_WEB_ASSEMBLY_BASELINE_SUPPORTED) return;
			if (SHOULD_RENDER_OFFSCREEN) for (let workerId = 0; workerId < lottieMessagePort.workersCount; ++workerId) ensureDecodeChannel(workerId);
			return lottieMessagePort.invokeLottieEverywhere("loadWasm", { wasmUrl: TLOTTIE_WASM_URL });
		}), () => this.enginePromise, () => this.enginePromise = void 0));
	}
	async registerLottieWorkers() {
		await apiManagerProxy.registerThreadedWorker({
			type: "lottie",
			createWorker: () => {
				return new Worker(new URL(
					/* @vite-ignore */
					"/Monolith/tlottie.worker-B6fv-Gy3.js",
					"" + import.meta.url
				), { type: "module" });
			},
			superMessagePort: lottieMessagePort
		});
		if (SHOULD_RENDER_OFFSCREEN) bindActiveWindowListener((w) => w.document, "visibilitychange", () => {
			lottieMessagePort.suspendAllTabPlayers(getAppWindow().document.hidden);
		});
	}
	makeAssetUrl(name) {
		return "assets/tgs/" + name + ".json";
	}
	loadAnimationAsAsset(params, name) {
		const url = this.makeAssetUrl(name);
		return this.loadAssetData(url).then((blob) => {
			return this.loadAnimationFromURLNext(blob, params, url);
		});
	}
	/**
	* An app asset is fetched once. A list of the same animated icon — a video chat's microphones —
	* used to send a request per icon, which the browser's per-host connection limit served in
	* waves: on a slow link the icons appeared one batch after another.
	*/
	loadAssetData(url) {
		let promise = this.assetData.get(url);
		if (!promise) {
			this.assetData.set(url, promise = this.loadAnimationDataFromURL(url));
			promise.catch(() => this.assetData.delete(url));
		}
		return promise;
	}
	loadAnimationDataFromURL(url, method = "blob") {
		if (!IS_WEB_ASSEMBLY_BASELINE_SUPPORTED) return Promise.reject(makeError("NO_WASM"));
		this.loadLottieWorkers().catch(noop);
		return fetch(url).then((res) => {
			if (!res.headers || res.headers.get("content-type") === "application/octet-stream") return res.arrayBuffer().then((data) => apiManagerProxy.invokeCrypto("gzipUncompress", data)).then((arr) => blobConstruct(arr, ""));
			else return res[method]();
		});
	}
	loadAnimationFromURLManually(name) {
		const url = this.makeAssetUrl(name);
		return this.loadAssetData(url).then((blob) => {
			return (params) => this.loadAnimationFromURLNext(blob, params, url);
		});
	}
	loadAnimationFromURL(params, url) {
		return this.loadAnimationDataFromURL(url).then((blob) => {
			return this.loadAnimationFromURLNext(blob, params, url);
		});
	}
	loadAnimationFromURLNext(blob, params, url) {
		const newParams = Object.assign(params, {
			animationData: blob,
			needUpscale: true
		});
		newParams.name || (newParams.name = url);
		return this.loadAnimationWorker(newParams);
	}
	waitForFirstFrame(player) {
		if (player.hasFailed) return Promise.reject(player.error);
		const firstFrameOrError = Promise.race([
			new Promise((resolve) => {
				player.addEventListener("firstFrame", resolve, { once: true });
			}),
			new Promise((resolve, reject) => {
				player.addEventListener("error", reject, { once: true });
			}),
			pause(2500)
		]);
		return Promise.all([player.loadPromise, firstFrameOrError]).then(() => player);
	}
	async loadAnimationWorker(params) {
		if (!IS_WEB_ASSEMBLY_BASELINE_SUPPORTED) throw makeError("NO_WASM");
		if (!this.loaded) await this.loadLottieWorkers();
		const { middleware, group = "" } = params;
		if (middleware && !middleware()) throw makeError("MIDDLEWARE");
		if (params.sync) {
			const cacheName = LottiePlayer.CACHE.generateName(params.name, params.width, params.height, params.color, params.toneIndex);
			const players = this.playersByCacheName[cacheName];
			if (players?.size) {
				for (const player of players) if (params.compositorDelivery ? player.offscreen === "emoji" : !player.offscreen) return Promise.resolve(player);
			}
		}
		const containers = toArray(params.container);
		if (!params.width || !params.height) {
			params.width = parseInt(containers[0].style.width);
			params.height = parseInt(containers[0].style.height);
		}
		if (!params.width || !params.height) throw new Error("No size for sticker!");
		params.group = group;
		const player = this.initPlayer(containers, params);
		animationIntersector.addAnimation({
			animation: player,
			group,
			observeElement: player.el[0],
			controlled: middleware,
			liteModeKey: params.liteModeKey,
			type: "lottie"
		});
		if (!params.sync) middleware?.onClean(() => {
			player.remove();
		});
		return player;
	}
	onDestroy(reqId) {
		delete this.players[reqId];
	}
	destroyWorkers() {
		if (!IS_WEB_ASSEMBLY_BASELINE_SUPPORTED) return;
		lottieMessagePort.terminateAll();
		this.log("workers destroyed");
		this.loaded = false;
		this.loadPromise = void 0;
	}
	initPlayer(el, options) {
		var _this$playersByCacheN;
		const player = new LottiePlayer({
			el,
			options
		});
		let { reqId } = player;
		const { cacheName } = player;
		this.players[reqId] = player;
		const playersByCacheName = cacheName ? (_this$playersByCacheN = this.playersByCacheName)[cacheName] ?? (_this$playersByCacheN[cacheName] = /* @__PURE__ */ new Set()) : void 0;
		if (cacheName) playersByCacheName.add(player);
		player.addEventListener("reqIdChanged", ({ previousReqId, reqId: newReqId }) => {
			delete this.players[previousReqId];
			this.players[newReqId] = player;
			reqId = newReqId;
		});
		player.addEventListener("destroy", () => {
			this.onDestroy(reqId);
			if (playersByCacheName.delete(player) && !playersByCacheName.size) delete this.playersByCacheName[cacheName];
		});
		player.addEventListener("error", (err) => {
			this.log.error("animation failed", err);
			animationIntersector.removeAnimationByPlayer(player);
			player.remove();
		});
		const loadPromise = player.loadFromData(options.animationData, TLOTTIE_WASM_URL);
		player.loadPromise = loadPromise;
		loadPromise.catch((err) => player.fail(err));
		return player;
	}
};
var lottieLoader = new LottieLoader();
MOUNT_CLASS_TO.lottieLoader = lottieLoader;
//#endregion
export { compositorMessagePort as a, SHOULD_RENDER_OFFSCREEN as c, ensureCompositor as i, readValue as l, LottiePlayer as n, applyColorOnContext as o, getLottiePixelRatio as r, framesCache as s, lottieLoader as t };
