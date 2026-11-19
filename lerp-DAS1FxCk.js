//# allFunctionsCalledOnLoad
//#region src/helpers/lerp.ts
/**
* Linear interpolation between two values.
*/
function lerp(min, max, progress) {
	return min + (max - min) * progress;
}
/**
* Linear interpolation between two arrays of values.
*/
function lerpArray(min, max, progress) {
	return min.map((start, index) => start + (max[index] - start) * progress);
}
//#endregion
export { lerpArray as n, lerp as t };
