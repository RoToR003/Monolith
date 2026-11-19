//# allFunctionsCalledOnLoad
const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["fastBlur-DXZyrReP.js","rolldown-runtime-CwcJO0Gh.js"])))=>i.map(i=>d[i]);
import { i as IS_APPLE_MOBILE } from "./userAgent-ByGXcznk.js";
import { n as fastRaf } from "./schedulers-Cx0-7a1P.js";
import { S as callbackify } from "./objectUrlUtils-5x08MNuO.js";
import { G as finishLoadedURLLoad, W as beginLoadedURLLoad, dt as IS_CANVAS_FILTER_SUPPORTED, q as hasLoadedURL } from "./apiManagerProxy-DmQXvxSF.js";
import { n as rootScope } from "./rootScope-CZS0lmz8.js";
import { n as deferredPromise } from "./cancellablePromise-bof--dnO.js";
import { t as __vitePreload } from "./preload-helper-B0NHKCoo.js";
import { n as getHeavyAnimationPromise } from "./useHeavyAnimationCheck-sWeBPI3f.js";
import { t as clearMediaElementSource } from "./clearMediaElementSource-CfCKljUR.js";
function isCrbug1250841Error(err) {
	return err.code === 4 && err.message === "DECODER_ERROR_NOT_SUPPORTED: Audio configuration specified 2 channels, but FFmpeg thinks the file contains 1 channels";
}
//#endregion
//#region src/helpers/onMediaLoad.ts
var ignoredVideoErrors = /* @__PURE__ */ new WeakSet();
var fixingChromeBugSources = /* @__PURE__ */ new WeakMap();
function shouldIgnoreVideoError(e) {
	if (ignoredVideoErrors.has(e)) return true;
	try {
		const target = e.target;
		const error = target.error;
		if (!error || error.message.includes("URL safety check")) {
			console.warn("will ignore video error", e);
			return true;
		}
		const isChromeBug = isCrbug1250841Error(error);
		if (isChromeBug && !target.triedFixingChromeBug) {
			const originalSrc = target.src;
			if (fixingChromeBugSources.get(target) === originalSrc) {
				ignoredVideoErrors.add(e);
				return true;
			}
			let srcPromise;
			if (originalSrc.includes("stream/")) srcPromise = originalSrc + "?_crbug1250841";
			else srcPromise = rootScope.managers.appDocsManager.fixChromiumMp4(originalSrc);
			ignoredVideoErrors.add(e);
			fixingChromeBugSources.set(target, originalSrc);
			const fixing = callbackify(srcPromise, (src) => {
				if (fixingChromeBugSources.get(target) !== originalSrc) return;
				fixingChromeBugSources.delete(target);
				if (target.src !== originalSrc) return;
				target.triedFixingChromeBug = true;
				if (src === originalSrc) return;
				target.src = src;
				target.load();
			});
			if (fixing instanceof Promise) fixing.catch(() => {
				if (fixingChromeBugSources.get(target) === originalSrc) fixingChromeBugSources.delete(target);
			});
			return true;
		} else if (isChromeBug) console.error("chrome video error", e);
	} catch (err) {}
	return false;
}
function onMediaLoad(media, readyState = media.HAVE_METADATA, useCanplayOnIos) {
	return new Promise((resolve, reject) => {
		if (media.readyState >= readyState) {
			resolve();
			return;
		}
		const loadEventName = IS_APPLE_MOBILE && !useCanplayOnIos ? "loadeddata" : "canplay";
		const errorEventName = "error";
		const cleanup = () => {
			media.removeEventListener(loadEventName, onLoad);
			media.removeEventListener(errorEventName, onError);
		};
		const onLoad = () => {
			cleanup();
			resolve();
		};
		const onError = (e) => {
			if (shouldIgnoreVideoError(e)) return;
			cleanup();
			reject(media.error);
		};
		media.addEventListener(loadEventName, onLoad, { once: true });
		media.addEventListener(errorEventName, onError);
	});
}
//#endregion
//#region src/helpers/dom/renderImageFromUrl.ts
var set = (elem, url) => {
	if (elem instanceof HTMLImageElement || elem instanceof HTMLVideoElement) elem.src = url;
	else if (elem instanceof SVGImageElement) elem.setAttributeNS(null, "href", url);
	else elem.style.backgroundImage = "url(" + url + ")";
};
function renderImageFromUrl(elem, url, callback, useCache, processImageOnLoad) {
	if (processImageOnLoad) useCache = false;
	useCache ?? (useCache = processImageOnLoad === void 0);
	if (!url) {
		console.error("renderImageFromUrl: no url?", elem, url);
		callback?.();
		return;
	}
	const isVideo = elem instanceof HTMLVideoElement;
	if (isVideo || useCache && hasLoadedURL(url)) {
		set(elem, url);
		if (callback) {
			if (isVideo) return onMediaLoad(elem).then(callback);
			callback();
		}
		return;
	}
	const isImage = elem instanceof HTMLImageElement;
	const loader = isImage ? elem : new Image();
	const load = beginLoadedURLLoad(url);
	const onLoad = () => {
		if (!isImage && elem) set(elem, url);
		finishLoadedURLLoad(load, true);
		processImageOnLoad?.(loader);
		callback?.();
	};
	const onError = (err) => {
		finishLoadedURLLoad(load, false);
		if (!err.message.includes("cannot be decoded")) console.error("Render image from url failed:", err, url, loader, err.message, loader.naturalWidth);
		callback?.();
	};
	if (loader.decoding === "auto") loader.decoding = "async";
	loader.src = url;
	return loader.decode().then(onLoad, onError);
}
function renderImageFromUrlPromise(elem, url, useCache, processImageOnLoad) {
	return new Promise((resolve) => {
		renderImageFromUrl(elem, url, resolve, useCache, processImageOnLoad);
	});
}
//#endregion
//#region src/helpers/heavyQueue.ts
var heavyQueue = [];
var processingQueue = false;
function addHeavyTask(queue, method = "push") {
	if (!queue.items.length) return Promise.resolve([]);
	const promise = queue.promise = deferredPromise();
	heavyQueue[method](queue);
	processHeavyQueue();
	return promise;
}
function processHeavyQueue() {
	if (!processingQueue) timedChunk(heavyQueue.shift()).finally(() => {
		processingQueue = false;
		if (heavyQueue.length) processHeavyQueue();
	});
}
function timedChunk(queue) {
	if (!queue.items.length) {
		queue.promise.resolve([]);
		return Promise.resolve([]);
	}
	const todo = queue.items.slice();
	const results = [];
	return new Promise((resolve, reject) => {
		const f = async () => {
			const start = performance.now();
			do {
				await getHeavyAnimationPromise();
				const possiblePromise = queue.process.apply(queue.context, todo.shift());
				let realResult;
				if (possiblePromise instanceof Promise) try {
					realResult = await possiblePromise;
				} catch (err) {
					reject(err);
					return;
				}
				else realResult = possiblePromise;
				results.push(realResult);
			} while (todo.length > 0 && performance.now() - start < 6);
			if (todo.length > 0) fastRaf(f);
			else resolve(results);
		};
		fastRaf(f);
	}).then(queue.promise.resolve.bind(queue.promise), queue.promise.reject.bind(queue.promise));
}
//#endregion
//#region src/helpers/blur.ts
var RADIUS = 2;
var ITERATIONS = 2;
var requireBlurPromise;
var fastBlurFunc;
if (!IS_CANVAS_FILTER_SUPPORTED) requireBlurPromise = __vitePreload(() => import("./fastBlur-DXZyrReP.js").then((n) => n.n).then((m) => {
	fastBlurFunc = m.default;
}), __vite__mapDeps([0,1]));
else requireBlurPromise = Promise.resolve();
function processBlurNext(img, radius, iterations, canvas = document.createElement("canvas"), maxSize) {
	let width = img.width;
	let height = img.height;
	if (maxSize && Math.max(width, height) > maxSize) {
		const scale = maxSize / Math.max(width, height);
		width = Math.round(width * scale) || 1;
		height = Math.round(height * scale) || 1;
	}
	canvas.width = width;
	canvas.height = height;
	const ctx = canvas.getContext("2d", { alpha: false });
	if (IS_CANVAS_FILTER_SUPPORTED) {
		ctx.filter = `blur(${radius}px)`;
		ctx.drawImage(img, -radius * 2, -radius * 2, canvas.width + radius * 4, canvas.height + radius * 4);
	} else {
		ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
		fastBlurFunc(ctx, 0, 0, canvas.width, canvas.height, radius, iterations);
	}
	return canvas;
}
var cache = /* @__PURE__ */ new Map();
var CACHE_SIZE = 150;
function blur(dataUri, radius = RADIUS, iterations = ITERATIONS, maxSize) {
	if (!dataUri) throw "no dataUri for blur: " + dataUri;
	if (cache.size > CACHE_SIZE) cache.clear();
	let cached = cache.get(dataUri);
	if (!cached) {
		const img = new Image();
		const cacheCanvas = document.createElement("canvas");
		const promise = requireBlurPromise.then(async () => {
			try {
				img.src = dataUri;
				await img.decode();
				await addHeavyTask({
					items: [[
						img,
						radius,
						iterations,
						cacheCanvas,
						maxSize
					]],
					context: null,
					process: processBlurNext
				}, "unshift");
			} finally {
				clearMediaElementSource(img);
			}
		});
		const value = cached = {
			canvas: cacheCanvas,
			promise
		};
		cache.set(dataUri, value);
		promise.then(() => {
			value.ready = true;
		}, () => {
			if (cache.get(dataUri) === value) cache.delete(dataUri);
		});
	}
	const canvas = document.createElement("canvas");
	canvas.className = "canvas-thumbnail";
	const source = cached.canvas;
	const copy = () => {
		canvas.width = source.width;
		canvas.height = source.height;
		canvas.getContext("2d").drawImage(source, 0, 0);
	};
	if (cached.ready) copy();
	else cached.promise.then(copy, () => {});
	return {
		canvas,
		promise: cached.promise
	};
}
//#endregion
export { shouldIgnoreVideoError as a, onMediaLoad as i, renderImageFromUrl as n, renderImageFromUrlPromise as r, blur as t };
