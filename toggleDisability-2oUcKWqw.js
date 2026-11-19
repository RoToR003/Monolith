//# allFunctionsCalledOnLoad
import { r as toArray } from "./encryptedStorageLayer-gN9TBXzg.js";
//#region src/helpers/dom/toggleDisability.ts
function toggleDisability(elements, disable) {
	elements = toArray(elements);
	if (disable) elements.forEach((el) => el.setAttribute("disabled", "true"));
	else elements.forEach((el) => el.removeAttribute("disabled"));
	return () => toggleDisability(elements, !disable);
}
//#endregion
export { toggleDisability as t };
