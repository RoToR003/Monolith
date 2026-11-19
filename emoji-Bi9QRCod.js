//# allFunctionsCalledOnLoad
//#region src/vendor/emoji/index.ts
function encodeEmoji(emojiText) {
	return toCodePoints(removeVS16s(emojiText)).join("-");
}
var vs16RegExp = /\uFE0F/g;
var zeroWidthJoiner = String.fromCharCode(8205);
var removeVS16s = (rawEmoji) => rawEmoji.indexOf(zeroWidthJoiner) < 0 ? rawEmoji.replace(vs16RegExp, "") : rawEmoji;
function toCodePoints(unicodeSurrogates) {
	const points = [];
	let char = 0;
	let previous = 0;
	let i = 0;
	while (i < unicodeSurrogates.length) {
		char = unicodeSurrogates.charCodeAt(i++);
		if (previous) {
			points.push((65536 + (previous - 55296 << 10) + (char - 56320)).toString(16));
			previous = 0;
		} else if (char > 55296 && char <= 56319) previous = char;
		else points.push(char.toString(16));
	}
	if (points.length && points[0].length === 2) points[0] = "00" + points[0];
	return points;
}
var EMOJI_TONE_MODIFIERS = [
	"🏻",
	"🏼",
	"🏽",
	"🏾",
	"🏿"
];
var emojiToneRegExp = /🏻|🏼|🏽|🏾|🏿/g;
var singleEmojiToneRegExp = /🏻|🏼|🏽|🏾|🏿/;
function getEmojiToneIndexes(input) {
	return (input.match(emojiToneRegExp) || []).map((tone) => EMOJI_TONE_MODIFIERS.indexOf(tone) + 1);
}
function getEmojiToneIndex(input) {
	const match = input.match(singleEmojiToneRegExp);
	return match ? EMOJI_TONE_MODIFIERS.indexOf(match[0]) + 1 : 0;
}
function removeEmojiTone(input) {
	return input.replace(emojiToneRegExp, "");
}
var VIRTUAL_COUNTRIES_EMOJIS = /* @__PURE__ */ new Map([["FT", "💎"]]);
function getCountryEmoji(iso2) {
	return VIRTUAL_COUNTRIES_EMOJIS.get(iso2) ?? String.fromCharCode(55356, 56741 + iso2.charCodeAt(0), 55356, 56741 + iso2.charCodeAt(1));
}
function emojiFromCodePoints(codePoints) {
	return codePoints.split("-").reduce((prev, curr) => prev + String.fromCodePoint(parseInt(curr, 16)), "");
}
//#endregion
export { getEmojiToneIndex as a, toCodePoints as c, getCountryEmoji as i, emojiFromCodePoints as n, getEmojiToneIndexes as o, encodeEmoji as r, removeEmojiTone as s, EMOJI_TONE_MODIFIERS as t };
