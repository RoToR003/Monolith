//# allFunctionsCalledOnLoad
//#region src/helpers/number/clamp.ts
function clamp(v, min, max) {
	return Math.min(max, Math.max(min, v));
}
//#endregion
export { clamp as t };
