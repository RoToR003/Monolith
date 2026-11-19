//# allFunctionsCalledOnLoad
import { t as Icon$1 } from "./icon-DbP6Es97.js";
import { L as untrack } from "./solid-9Vxm0VIz.js";
import { t as classNames } from "./classNames-DxGDjmvw.js";
var featureDetailsIconSticker_module_default = {
	Container: "_Container_kt8mg_1",
	Icon: "_Icon_kt8mg_25"
};
//#endregion
//#region src/components/featureDetailsIconSticker.tsx
function createFeatureDetailsIconSticker(icon, className) {
	const div = document.createElement("div");
	div.className = classNames(featureDetailsIconSticker_module_default.Container, className);
	div.appendChild(Icon$1(icon, featureDetailsIconSticker_module_default.Icon));
	return div;
}
//#endregion
//#region src/helpers/solid/untrackActions.ts
function untrackActions(actions) {
	for (const action in actions) {
		const callback = actions[action];
		actions[action] = (...args) => {
			return untrack(() => callback(...args));
		};
	}
	return actions;
}
//#endregion
export { createFeatureDetailsIconSticker as n, featureDetailsIconSticker_module_default as r, untrackActions as t };
