//# allFunctionsCalledOnLoad
//#region src/helpers/schedulers/pause.ts
function pause(ms) {
	return new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
}
//#endregion
export { pause as t };
