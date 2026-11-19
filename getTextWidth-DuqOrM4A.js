//# allFunctionsCalledOnLoad
import { t as isRTL } from "./isRTL-DBt4_PcD.js";
//#region src/helpers/canvas/getTextWidth.ts
var context;
/**
* Get the text width
* @param {string} text
* @param {string} font
*/
function getTextWidth(text, font) {
	if (!context) context = document.createElement("canvas").getContext("2d", { alpha: false });
	if (context.font !== font) context.font = font;
	context.direction = isRTL(text) ? "rtl" : "ltr";
	return context.measureText(text).width;
}
//#endregion
export { getTextWidth as t };
