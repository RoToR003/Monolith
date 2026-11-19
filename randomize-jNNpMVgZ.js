//# allFunctionsCalledOnLoad
//#region src/helpers/array/randomize.ts
function randomize(arr) {
	if (crypto && "getRandomValues" in crypto) crypto.getRandomValues(arr);
	else throw new Error("NO_SECURE_RANDOM");
	return arr;
}
//#endregion
export { randomize as t };
