//# allFunctionsCalledOnLoad
import { j as on, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
//#region src/helpers/solid/classname.tsx
function attachClassName(element, accessor) {
	createRenderEffect(on(accessor, (value, prev) => {
		const tokens = value ? value.split(" ").filter(Boolean) : [];
		const removed = prev ? prev.split(" ").filter((token) => token && !tokens.includes(token)) : [];
		if (removed.length) element.classList.remove(...removed);
		if (tokens.length) element.classList.add(...tokens);
	}));
}
function attachHotClassName(element, ...className) {
	element.classList.add(...className);
}
//#endregion
export { attachHotClassName as n, attachClassName as t };
