//# allFunctionsCalledOnLoad
function joinDeepPath(...args) {
	return args.join("");
}
function splitDeepPath(path) {
	return path.split("");
}
function setDeepProperty(object, key, value, deleteIfUndefined) {
	const splitted = key.split("");
	const length = splitted.length;
	let lastObject = object;
	for (let i = 0; i < length - 1; ++i) {
		var _lastObject;
		const part = splitted[i];
		lastObject = (_lastObject = lastObject)[part] ?? (_lastObject[part] = {});
	}
	const lastKey = splitted[length - 1];
	if (value === void 0 && deleteIfUndefined) delete lastObject[lastKey];
	else lastObject[lastKey] = value;
}
//#endregion
export { setDeepProperty as n, splitDeepPath as r, joinDeepPath as t };
