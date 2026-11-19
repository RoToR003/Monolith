//# allFunctionsCalledOnLoad
//#region src/helpers/solid/track.ts
/**
* Doesn't do anything, just annotates that something is tracked (in solid-js)
*
* @example
* track(() => [props.size, props.color]);
*/
function track(cb) {
	cb();
}
//#endregion
export { track as t };
