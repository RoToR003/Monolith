//# allFunctionsCalledOnLoad
//#region src/helpers/dom/whichChild.ts
function whichChild(elem, countNonElements) {
	if (!elem?.parentNode) return -1;
	if (countNonElements) return Array.from(elem.parentNode.childNodes).indexOf(elem);
	let i = 0;
	while ((elem = elem.previousElementSibling) !== null) ++i;
	return i;
}
//#endregion
export { whichChild as t };
