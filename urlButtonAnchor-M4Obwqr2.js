//# allFunctionsCalledOnLoad
import { u as wrapRichText } from "./renderer-L80wjxct.js";
import { r as htmlToDocumentFragment } from "./preloaderRing-EqVZpID6.js";
//#region src/components/wrappers/urlButtonAnchor.ts
/** Marks the link a link button is: a bubble underlines its links, a button is not underlined. */
var RICH_BUTTON_LINK_CLASS = "rich-button-link";
/**
* A link button opens its link the way a link in the text would — same checks, same handlers —
* so it wears the attributes wrapRichText gives such a link.
*/
function createUrlButtonAnchor(url) {
	const fragment = wrapRichText(" ", { entities: [{
		_: "messageEntityTextUrl",
		length: 1,
		offset: 0,
		url
	}] });
	const anchor = htmlToDocumentFragment(fragment).firstElementChild;
	anchor.classList.add(RICH_BUTTON_LINK_CLASS);
	return anchor;
}
var copiedAttributes = /* @__PURE__ */ new WeakMap();
/** Wears the link's attributes; a button that changed its link drops what the old one had and the new has not. */
function copyUrlButtonAnchor(anchor, element) {
	const names = anchor.getAttributeNames().filter((name) => name !== "class");
	copiedAttributes.get(element)?.forEach((name) => {
		if (!names.includes(name)) element.removeAttribute(name);
	});
	names.forEach((name) => element.setAttribute(name, anchor.getAttribute(name)));
	copiedAttributes.set(element, names);
}
//#endregion
export { copyUrlButtonAnchor as n, createUrlButtonAnchor as r, RICH_BUTTON_LINK_CLASS as t };
