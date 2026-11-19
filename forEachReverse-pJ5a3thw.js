//# allFunctionsCalledOnLoad
//#region src/helpers/array/forEachReverse.ts
function forEachReverse(array, callback) {
	for (let i = array.length - 1; i >= 0; --i) callback(array[i], i, array);
}
//#endregion
export { forEachReverse as t };
