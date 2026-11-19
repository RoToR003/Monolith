//# allFunctionsCalledOnLoad
import { t as noop } from "./noop-H9NNBLfX.js";
//#region src/helpers/dom/safePlay.ts
function safePlay(media) {
	try {
		const promise = media.play();
		if (promise instanceof Promise) promise.catch(noop);
	} catch (e) {
		console.error(e);
	}
}
//#endregion
export { safePlay as t };
