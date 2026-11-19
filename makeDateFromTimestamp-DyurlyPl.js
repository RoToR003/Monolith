//# allFunctionsCalledOnLoad
//#region src/helpers/date/makeDateFromTimestamp.ts
function makeDateFromTimestamp(timestamp) {
	return /* @__PURE__ */ new Date(timestamp * 1e3);
}
//#endregion
export { makeDateFromTimestamp as t };
