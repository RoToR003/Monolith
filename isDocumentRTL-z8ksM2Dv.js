//# allFunctionsCalledOnLoad
//#region src/helpers/dom/isDocumentRTL.ts
/**
* Whether the document is laid out right to left: `<html dir>`, which `I18n.applyDirection` sets
* together with `I18n.isRTL` on every language apply. Read when laying out, never cached; for the
* low-level helpers that should not pull the language pack in.
*/
function isDocumentRTL(doc = document) {
	return doc.documentElement.dir === "rtl";
}
/**
* Whether `element` itself is laid out right to left - an island's own direction included, which
* the document's does not tell. A style read: for a key press or a gesture, not for every frame.
*/
function isElementRTL(element) {
	return element.ownerDocument.defaultView.getComputedStyle(element).direction === "rtl";
}
//#endregion
export { isElementRTL as n, isDocumentRTL as t };
