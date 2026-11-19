//# allFunctionsCalledOnLoad
import { t as liteMode } from "./liteMode-DeLStZfQ.js";
//#region src/helpers/dom/shake.ts
function shake(element) {
	if (!liteMode.isAvailable("motion")) return;
	const keyframes = [
		{ transform: "translateX(0)" },
		{ transform: "translateX(.25rem)" },
		{ transform: "translateX(-.25rem)" },
		{ transform: "translateX(0)" }
	];
	element.animate([
		...keyframes,
		...keyframes,
		...keyframes
	], {
		duration: 300,
		iterations: 1,
		easing: "ease-in-out"
	});
}
//#endregion
export { shake as t };
