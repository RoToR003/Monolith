//# allFunctionsCalledOnLoad
//#region src/helpers/number/nMap.ts
/**
* Maps value from a range [fromMin, fromMax] to another range [toMin, toMax]
*/
function nMap(value, fromMin, fromMax, toMin, toMax) {
	return (value - fromMin) / (fromMax - fromMin) * (toMax - toMin) + toMin;
}
//#endregion
export { nMap as t };
