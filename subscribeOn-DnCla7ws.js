//# allFunctionsCalledOnLoad
import { M as onCleanup } from "./solid-9Vxm0VIz.js";
//#region src/helpers/solid/subscribeOn.ts
function subscribeOn(obj) {
	return ((event, callback, options) => {
		obj.addEventListener(event, callback, options);
		onCleanup(() => {
			obj.removeEventListener(event, callback, options);
		});
	});
}
//#endregion
export { subscribeOn as t };
