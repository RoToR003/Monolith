//# allFunctionsCalledOnLoad
import { n as getEmojiImageUrl, r as getImageEmojis } from "./emojiImage-DBZC34jk.js";
//#region src/lib/widgetSandbox/emoji.ts
/**
* A widget's emoji are the client's (RendererEnv.emoji): drawn with its images wherever a message draws them so — every
* platform but Apple's, whose font has them (isEmojiNative) — in the widget's text and on its canvas alike.
*/
/** Below this no character is an emoji or part of one: a text of them alone needs no look at all. */
var MAY_BE_EMOJI = /[^\u0000-¨ª-­¯-῿]/;
/** `max`: the most parts the renderer takes for the text now; a text of more emoji than that is not looked at further. */
function splitWidgetEmoji(text, max = Infinity) {
	if (!MAY_BE_EMOJI.test(text)) return;
	const emojis = getImageEmojis(text, max + 1);
	if (!emojis.length || emojis.length > max) return;
	const runs = [];
	let last = 0;
	for (const { index, emoji, unicode } of emojis) {
		if (index > last) runs.push(text.slice(last, index));
		runs.push({
			emoji,
			src: new URL(getEmojiImageUrl(unicode), location.href).href
		});
		last = index + emoji.length;
	}
	if (last < text.length) runs.push(text.slice(last));
	return runs;
}
//#endregion
export { splitWidgetEmoji };
