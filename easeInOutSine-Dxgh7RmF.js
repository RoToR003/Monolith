//# allFunctionsCalledOnLoad
//#region src/helpers/easing/easeInOutSine.ts
function easeInOutSine(t, b, c, d) {
	return t >= d ? b + c : easeInOutSineApply(t / d, c) + b;
}
function easeInOutSineApply(v, c) {
	return -c / 2 * (Math.cos(Math.PI * v) - 1);
}
//#endregion
export { easeInOutSineApply as n, easeInOutSine as t };
