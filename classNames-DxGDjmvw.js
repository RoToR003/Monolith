//# allFunctionsCalledOnLoad
//#region src/helpers/string/classNames.ts
function classNames(...args) {
	return args.filter(Boolean).join(" ");
}
//#endregion
export { classNames as t };
