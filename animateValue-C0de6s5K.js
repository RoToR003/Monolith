//# allFunctionsCalledOnLoad
import { t as lerp } from "./lerp-DAS1FxCk.js";
import { t as defaultEasing } from "./easings-DXRWZVIJ.js";
import { t as requestRAF } from "./requestRAF-CwdYaVwH.js";
//#region src/helpers/animateValue.ts
function animateValue(start, end, duration, callback, { easing = defaultEasing, onEnd = () => {} } = {}) {
	let startTime;
	let canceled = false;
	function animateFrame() {
		if (canceled) return;
		const currentTime = performance.now();
		if (!startTime) startTime = currentTime;
		const elapsed = currentTime - startTime;
		const progress = duration ? Math.min(elapsed / duration, 1) : 1;
		const easedProgress = easing(progress);
		if (start instanceof Array && end instanceof Array) callback(start.map((startVal, index) => lerp(startVal, end[index], easedProgress)));
		else callback(lerp(start, end, easedProgress));
		if (progress < 1) requestRAF(animateFrame);
		else onEnd();
	}
	requestRAF(animateFrame);
	return () => {
		canceled = true;
	};
}
//#endregion
export { animateValue as t };
