//# allFunctionsCalledOnLoad
//#region src/helpers/dom/shallowCopy.ts
/** An empty element of `element`'s tag, classes and inline style: what styles it through its descendants styles them in it too. */
function shallowCopy(element) {
	const copy = document.createElement(element.tagName);
	copy.className = element.className;
	copy.style.cssText = element.style.cssText;
	return copy;
}
//#endregion
export { shallowCopy as t };
