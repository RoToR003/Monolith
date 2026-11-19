//# allFunctionsCalledOnLoad
import { n as __exportAll } from "./rolldown-runtime-CwcJO0Gh.js";
import { t as noop } from "./noop-H9NNBLfX.js";
import { t as pause } from "./pause-BSJh-z46.js";
import { n as rootScope } from "./rootScope-CZS0lmz8.js";
import { a as wrapSticker } from "./sticker-5twBOy1Y.js";
import { o as applyColorOnContext } from "./lottieLoader-B3FXw0K7.js";
//#region src/components/wrappers/emojiPattern.ts
var emojiPattern_exports = /* @__PURE__ */ __exportAll({
	default: () => wrapEmojiPattern,
	loadEmojiStill: () => loadEmojiStill
});
/** The still frame of a custom emoji, loaded once for drawing it on a canvas. */
async function loadEmojiStill({ docId, middleware, emojiSize, onCacheStatus }) {
	let doc;
	if (typeof docId === "object") doc = docId;
	else {
		const result = await rootScope.managers.acknowledged.appEmojiManager.getCustomEmojiDocument(docId);
		if (!result.cached) onCacheStatus?.(false);
		doc = await result.result;
	}
	const d = document.createElement("div");
	return wrapSticker({
		doc,
		div: d,
		middleware,
		width: emojiSize,
		height: emojiSize,
		static: true,
		withThumb: false,
		exportLoad: 2,
		useCache: false
	}).then(({ load, downloaded }) => {
		onCacheStatus?.(downloaded);
		return load();
	}).then((result) => {
		const image = result[0];
		if (!image.naturalWidth) {
			console.warn("should wait for image size", image);
			return pause(100).then(() => image);
		}
		return image;
	});
}
async function wrapEmojiPattern({ docId, middleware, container, color, positions, canvasWidth, canvasHeight, emojiSize, onCacheStatus }) {
	return loadEmojiStill({
		docId,
		middleware,
		emojiSize,
		onCacheStatus
	}).then((image) => {
		const canvas = document.createElement("canvas");
		canvas.classList.add("emoji-pattern-canvas");
		canvas.style.width = `${canvasWidth}px`;
		canvas.style.height = `${canvasHeight}px`;
		const ctx = canvas.getContext("2d");
		const dpr = canvas.dpr = window.devicePixelRatio;
		canvas.width = canvasWidth * dpr;
		canvas.height = canvasHeight * dpr;
		positions.forEach(([x, y, size, alpha]) => {
			ctx.globalAlpha = alpha;
			ctx.drawImage(image, x * dpr, y * dpr, size * dpr, size * dpr);
		});
		ctx.globalAlpha = 1;
		if (color) applyColorOnContext(ctx, color, 0, 0, canvas.width, canvas.height);
		if (container) container.prepend(canvas);
		return canvas;
	}).catch(noop);
}
//#endregion
export { loadEmojiStill as n, wrapEmojiPattern as r, emojiPattern_exports as t };
