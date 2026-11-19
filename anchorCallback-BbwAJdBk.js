//# allFunctionsCalledOnLoad
import { t as cancelEvent } from "./cancelEvent-Cw8vYZHp.js";
//#region src/helpers/dom/anchorCallback.ts
function anchorCallback(callback, _cancelEvent = true) {
	const a = document.createElement("a");
	a.href = "#";
	a.onclick = (e) => {
		_cancelEvent && cancelEvent(e);
		callback(e);
	};
	return a;
}
//#endregion
export { anchorCallback as t };
