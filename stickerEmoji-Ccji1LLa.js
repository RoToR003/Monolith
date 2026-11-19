//# allFunctionsCalledOnLoad
import { n as rootScope } from "./rootScope-CZS0lmz8.js";
import { a as wrapSticker } from "./sticker-5twBOy1Y.js";
//#region src/components/wrappers/stickerEmoji.ts
async function wrapStickerEmoji(options) {
	const { emoji, div, managers = rootScope.managers } = options;
	const doc = await managers.appStickersManager.getAnimatedEmojiSticker(emoji);
	if (!doc) {
		div.classList.add("media-sticker-wrapper");
		throw new Error("no sticker");
	}
	return wrapSticker({
		doc,
		play: true,
		loop: false,
		...options
	});
}
//#endregion
export { wrapStickerEmoji as t };
