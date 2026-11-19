//# allFunctionsCalledOnLoad
import { t as liteMode } from "./liteMode-DeLStZfQ.js";
//#region src/helpers/reducedKeyframes.ts
var KEPT = /* @__PURE__ */ new Set([
	"opacity",
	"visibility",
	"color",
	"backgroundColor",
	"background",
	"borderColor",
	"borderTopColor",
	"borderRightColor",
	"borderBottomColor",
	"borderLeftColor",
	"outlineColor",
	"boxShadow",
	"fill",
	"stroke",
	"strokeDasharray",
	"strokeWidth",
	"filter",
	"backdropFilter",
	"fontWeight",
	"width",
	"height",
	"minWidth",
	"minHeight",
	"maxWidth",
	"maxHeight",
	"flexBasis",
	"gridTemplateRows",
	"gridTemplateColumns"
]);
var isKept = (property) => KEPT.has(property) || property.startsWith("margin");
var TIMING = /* @__PURE__ */ new Set([
	"offset",
	"easing",
	"composite"
]);
/**
* What is left of keyframes with reduced animations: what fades, recolours or grows where it
* stands, without what moves - or nothing when they only move. Every keyframe stays, so the
* timing does too - one left with no property takes it from its neighbours, or the element
*/
function reducedKeyframes(keyframes) {
	let kept = false;
	const reduced = keyframes.map((keyframe) => {
		const left = {};
		for (const property in keyframe) if (TIMING.has(property) || isKept(property)) {
			left[property] = keyframe[property];
			kept || (kept = !TIMING.has(property));
		}
		return left;
	});
	return kept ? reduced : void 0;
}
/** The keyframes to play at an animation level: all of them, what is left without movement, or none */
function keyframesAtLevel(keyframes, level = liteMode.getAnimationLevel()) {
	return level === 2 ? keyframes : level ? reducedKeyframes(keyframes) : void 0;
}
//#endregion
export { keyframesAtLevel as t };
