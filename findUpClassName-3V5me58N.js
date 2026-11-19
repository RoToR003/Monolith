//# allFunctionsCalledOnLoad
//#region src/helpers/dom/findUpClassName.ts
function findUpClassName(el, className) {
	return el.closest("." + className);
}
//#endregion
export { findUpClassName as t };
