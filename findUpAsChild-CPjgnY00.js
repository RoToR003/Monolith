//# allFunctionsCalledOnLoad
//#region src/helpers/dom/findUpAsChild.ts
function findUpAsChild(el, parent) {
	if (!el) return null;
	if (el.parentElement === parent) return el;
	while (el.parentElement) {
		el = el.parentElement;
		if (el.parentElement === parent) return el;
	}
	return null;
}
//#endregion
export { findUpAsChild as t };
