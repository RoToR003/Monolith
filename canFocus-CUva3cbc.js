//# allFunctionsCalledOnLoad
import { c as IS_MOBILE_SAFARI } from "./userAgent-ByGXcznk.js";
//#region src/helpers/dom/canFocus.ts
function canFocus(isFirstInput) {
	return !IS_MOBILE_SAFARI || !isFirstInput;
}
//#endregion
export { canFocus as t };
