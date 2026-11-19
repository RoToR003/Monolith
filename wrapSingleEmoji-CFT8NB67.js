//# allFunctionsCalledOnLoad
import { h as getEmojiEntityFromEmoji } from "./apiManagerProxy-DmQXvxSF.js";
import { u as wrapRichText } from "./renderer-L80wjxct.js";
//#region src/lib/richTextProcessor/wrapSingleEmoji.ts
function wrapSingleEmoji(emoji) {
	return wrapRichText(emoji, { entities: [getEmojiEntityFromEmoji(emoji)] });
}
//#endregion
export { wrapSingleEmoji as t };
