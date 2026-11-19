//# allFunctionsCalledOnLoad
import { a as i18n, m as setInnerHTML } from "./langPack-BmdJGr44.js";
import { n as wrapEmojiText } from "./wrapEmojiText-DT39R5Tj.js";
//#region src/components/chat/businessIntroPlaceholder.ts
/** The class of the bubble an empty chat shows in place of messages, and the prefix of its parts. */
var EMPTY_PLACEHOLDER_CLASS = "empty-bubble-placeholder";
/**
* The lines of the greeting an empty chat with a user shows: the user's start page (`businessIntro`)
* where it says something, the default greeting where it does not. The empty chat and the start
* page's editor, which previews it, build them alike.
*/
function wrapBusinessIntroLines(intro) {
	const wrap = (text) => {
		const span = document.createElement("span");
		setInnerHTML(span, wrapEmojiText(text));
		return span;
	};
	const title = intro?.title ? wrap(intro.title) : i18n("NoMessages");
	const subtitle = intro?.description ? wrap(intro.description) : i18n("NoMessagesGreetingsDescription");
	title.classList.add("center", "empty-bubble-placeholder-title");
	subtitle.classList.add("center", "empty-bubble-placeholder-subtitle");
	return {
		title,
		subtitle
	};
}
//#endregion
export { wrapBusinessIntroLines as n, EMPTY_PLACEHOLDER_CLASS as t };
