//# allFunctionsCalledOnLoad
import { h as Modes } from "./userAgent-ByGXcznk.js";
import { t as Button } from "./button-DpTvniRN.js";
//#region src/components/buttonCorner.ts
var ButtonCorner = (options = {}) => {
	const button = Button("btn-circle btn-corner z-depth-1" + (options.className ? " " + options.className : ""), options);
	if (!Modes.a11y) button.tabIndex = -1;
	return button;
};
//#endregion
export { ButtonCorner as t };
