//# allFunctionsCalledOnLoad
//#region src/helpers/array/accumulate.ts
function accumulate(arr, initialValue) {
	return arr.reduce((acc, value) => acc + value, initialValue);
}
//#endregion
export { accumulate as t };
