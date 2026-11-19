//# allFunctionsCalledOnLoad
import { d as getLayoutWidth } from "./animations-DCmLIda3.js";
//#region src/components/wallet/visual/gem/send.ts
var gemSendEnergy = (t) => Math.pow(Math.min(Math.max(t / .45, 0), 1), .65);
/** up for a fifth of a second and back, a little lower at the end */
var gemSendHit = (t) => t > 0 && t < .42 ? Math.sin(Math.PI * t / .42) * (1 - .3 * t / .42) : 0;
var gemBreath = (t) => Math.sin(2 * Math.PI * 1.1 * t);
//#endregion
//#region src/helpers/dom/getLayoutScale.ts
/**
* How much bigger an element is drawn than it is laid out (a transform on it or above it), from its box on screen,
* already measured: what is put in it stands in its own pixels, which the screen's are divided by. 1 for an element
* not laid out. A read of the layout
*/
function getLayoutScale(element, box) {
	const width = getLayoutWidth(element);
	return width ? (box.right - box.left) / width || 1 : 1;
}
//#endregion
export { gemSendHit as i, gemBreath as n, gemSendEnergy as r, getLayoutScale as t };
