//# allFunctionsCalledOnLoad
import { O as encodeEntities } from "./renderer-L80wjxct.js";
//#region src/helpers/dom/documentFragmentToHTML.ts
function documentFragmentToHTML(fragment) {
	return Array.from(fragment.childNodes).map((node) => {
		return node.nodeType === node.TEXT_NODE ? encodeEntities(node.textContent) : node.outerHTML;
	}).join("");
}
//#endregion
export { documentFragmentToHTML as t };
