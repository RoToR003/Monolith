//# allFunctionsCalledOnLoad
//#region src/helpers/string/convertKeyToInputKey.ts
function convertKeyToInputKey(key) {
	key = key[0].toUpperCase() + key.slice(1);
	key = "input" + key;
	return key;
}
//#endregion
export { convertKeyToInputKey as t };
