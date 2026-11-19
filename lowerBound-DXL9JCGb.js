//# allFunctionsCalledOnLoad
//#region src/helpers/array/lowerBound.ts
var maxIters = 100;
function lowerBound(low, high, target, getValue) {
	let i = 0;
	while (low <= high) {
		const mid = low + Math.floor((high - low) / 2);
		if (target > getValue(mid)) low = mid + 1;
		else high = mid - 1;
		if (i++ > maxIters) return 0;
	}
	return low;
}
//#endregion
export { lowerBound as t };
