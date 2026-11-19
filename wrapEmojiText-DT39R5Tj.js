//# allFunctionsCalledOnLoad
import { g as createEffect } from "./solid-9Vxm0VIz.js";
import { u as wrapRichText } from "./renderer-L80wjxct.js";
import { t as parseEntities } from "./parseEntities-C5qsCJ5K.js";
//#region src/lib/richTextProcessor/wrapEmojiText.ts
function wrapEmojiText(text, isDraft = false, entities) {
	if (!text) return wrapRichText("");
	entities ?? (entities = parseEntities(text).filter((e) => e._ === "messageEntityEmoji"));
	return wrapRichText(text, {
		entities,
		wrappingDraft: isDraft
	});
}
function wrapEmojiTextWithEntities(obj, isDraft = false) {
	return wrapEmojiText(obj.text, isDraft, obj.entities);
}
function EmojiTextTsx(props) {
	const span = document.createElement("span");
	createEffect(() => {
		span.replaceChildren(wrapEmojiText(props.text, props.isDraft, props.entities));
	});
	return span;
}
//#endregion
export { wrapEmojiText as n, wrapEmojiTextWithEntities as r, EmojiTextTsx as t };
