//# allFunctionsCalledOnLoad
import { n as fastRaf } from "./schedulers-Cx0-7a1P.js";
import { d as batch } from "./solid-9Vxm0VIz.js";
//#region src/helpers/solid/requestRAF.ts
var rafCallbacks = [];
var isRAFing = false;
function requestRAF(callback) {
	rafCallbacks.push(callback);
	const cleanup = () => {
		const index = rafCallbacks.indexOf(callback);
		if (index !== -1) rafCallbacks.splice(index, 1);
	};
	if (isRAFing) return cleanup;
	isRAFing = true;
	fastRaf(() => {
		const savedCallbacks = rafCallbacks;
		rafCallbacks = [];
		isRAFing = false;
		batch(() => {
			savedCallbacks.forEach((cb) => void cb());
		});
	});
	return cleanup;
}
//#endregion
export { requestRAF as t };
