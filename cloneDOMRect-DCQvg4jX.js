//# allFunctionsCalledOnLoad
//#region src/helpers/dom/cloneDOMRect.ts
function cloneDOMRect(rect) {
	return {
		width: rect.width,
		height: rect.height,
		top: rect.top,
		right: rect.right,
		bottom: rect.bottom,
		left: rect.left
	};
}
//#endregion
export { cloneDOMRect as t };
