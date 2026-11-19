//# allFunctionsCalledOnLoad
import { t as whichChild } from "./whichChild-CwhWxnKO.js";
//#region src/helpers/dom/positionElementByIndex.ts
function positionElementByIndex(element, container, pos, prevPos) {
	if (prevPos === void 0) prevPos = element.parentElement === container ? whichChild(element) : -1;
	if (prevPos === pos) return false;
	else if (prevPos !== -1 && prevPos < pos) pos += 1;
	if (!pos) container.prepend(element);
	else if (container.childElementCount > pos) container.insertBefore(element, container.children[pos]);
	else container.append(element);
	return true;
}
//#endregion
export { positionElementByIndex as t };
