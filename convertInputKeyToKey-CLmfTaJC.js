//# allFunctionsCalledOnLoad
//#region src/helpers/string/convertInputKeyToKey.ts
function convertInputKeyToKey(inputKey) {
	const str = inputKey.replace("input", "");
	return str[0].toLowerCase() + str.slice(1);
}
//#endregion
export { convertInputKeyToKey as t };
