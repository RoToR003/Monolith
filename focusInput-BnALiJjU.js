//# allFunctionsCalledOnLoad
import { t as placeCaretAtEnd } from "./placeCaretAtEnd-BtAUyd5U.js";
//#region src/helpers/dom/focusInput.ts
function focusInput(input, e) {
	input.focus();
	placeCaretAtEnd(input);
	if (e) {
		const newEvent = new KeyboardEvent(e.type, e);
		input.dispatchEvent(newEvent);
	}
}
//#endregion
export { focusInput as t };
