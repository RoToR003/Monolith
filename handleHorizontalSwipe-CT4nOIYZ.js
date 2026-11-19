//# allFunctionsCalledOnLoad
import { i as isSwipingBackSafari } from "./appNavigationController-Ct0fx8yF.js";
import { t as findUpClassName } from "./findUpClassName-3V5me58N.js";
import { t as cancelEvent } from "./cancelEvent-Cw8vYZHp.js";
import { l as SwipeHandler } from "./openEditors-7FmA7q_V.js";
//#region src/helpers/dom/handleHorizontalSwipe.ts
function handleHorizontalSwipe(options) {
	let cancelY = false, hadMove = false;
	return new SwipeHandler({
		...options,
		verifyTouchTarget: (e) => {
			return !findUpClassName(e.target, "progress-line") && !isSwipingBackSafari(e) && (options.verifyTouchTarget ? options.verifyTouchTarget(e) : true);
		},
		onSwipe: (xDiff, yDiff, e) => {
			xDiff *= -1;
			yDiff *= -1;
			if (!cancelY && Math.abs(yDiff) > 20) return true;
			if (!cancelY && Math.max(Math.abs(xDiff), Math.abs(yDiff)) < (options.axisThreshold ?? 0)) return;
			if (Math.abs(xDiff) > Math.abs(yDiff)) {
				cancelEvent(e);
				cancelY = true;
			} else if (!cancelY && Math.abs(yDiff) > Math.abs(xDiff)) return true;
			hadMove = true;
			return options.onSwipe(xDiff, yDiff, e);
		},
		onReset: () => {
			if (hadMove) options.onReset?.();
			cancelY = hadMove = false;
		},
		cancelEvent: false
	});
}
//#endregion
export { handleHorizontalSwipe as t };
