//# allFunctionsCalledOnLoad
//#region src/helpers/dom/replaceContent.ts
function replaceContent(elem, node) {
	if (typeof node === "string") {
		elem.textContent = node;
		return;
	}
	const firstChild = elem.firstChild;
	if (firstChild) {
		if (elem.lastChild === firstChild) firstChild.replaceWith(node);
		else {
			elem.textContent = "";
			elem.append(node);
		}
	} else elem.append(node);
}
//#endregion
export { replaceContent as t };
