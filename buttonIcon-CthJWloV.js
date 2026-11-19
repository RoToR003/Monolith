//# allFunctionsCalledOnLoad
import { t as Button } from "./button-DpTvniRN.js";
//#region src/components/buttonIcon.ts
var ButtonIcon = (className, options = {}) => {
	const splitted = className?.split(" ");
	return Button("btn-icon" + (splitted?.length > 1 ? " " + splitted.slice(1).join(" ") : ""), {
		icon: splitted?.[0] || void 0,
		...options
	});
};
//#endregion
export { ButtonIcon as t };
