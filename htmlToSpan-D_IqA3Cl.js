//# allFunctionsCalledOnLoad
//#region src/helpers/dom/htmlToSpan.ts
function htmlToSpan(html) {
	const span = document.createElement("span");
	if (typeof html === "string") span.innerHTML = html;
	else span.append(html);
	return span;
}
//#endregion
export { htmlToSpan as t };
