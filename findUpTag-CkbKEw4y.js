//# allFunctionsCalledOnLoad
//#region src/helpers/dom/findUpTag.ts
function findUpTag(el, tag) {
	return el.closest(tag);
}
//#endregion
export { findUpTag as t };
