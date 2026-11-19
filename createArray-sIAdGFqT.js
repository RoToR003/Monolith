//# allFunctionsCalledOnLoad
//#region src/helpers/array/createArray.ts
function createArray(length, fill, map) {
	const arr = new Array(length);
	arr.fill(fill);
	return map ? arr.map(map) : arr;
}
//#endregion
export { createArray as t };
