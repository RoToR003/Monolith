//# allFunctionsCalledOnLoad
import { h as Modes } from "./userAgent-ByGXcznk.js";
//#region src/helpers/solid/buttonKeyDown.ts
function activateOn(keys, e, element) {
	if (Modes.a11y && keys.includes(e.key) && !e.repeat && !e.defaultPrevented && !e.isComposing && e.target === element && !element.matches("button, input, select, textarea, a[href], [disabled], [aria-disabled=\"true\"]")) {
		e.preventDefault();
		element.click();
	}
}
/** For `role="button"`: Enter and Space, the way a native button behaves. */
function buttonKeyDown(e, element = e.currentTarget) {
	activateOn(["Enter", " "], e, element);
}
/** For `role="link"`: Enter activates, Space is left to the scroll. */
function linkKeyDown(e, element = e.currentTarget) {
	activateOn(["Enter"], e, element);
}
//#endregion
export { linkKeyDown as n, buttonKeyDown as t };
