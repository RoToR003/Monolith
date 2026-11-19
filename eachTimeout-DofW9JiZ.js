//# allFunctionsCalledOnLoad
import { d as ctx } from "./userAgent-ByGXcznk.js";
import { t as noop } from "./noop-H9NNBLfX.js";
//#region src/helpers/eachTimeout.ts
function eachTimeout(callback, getNextTimeout, runFirst = true) {
	const cancel = () => {
		clearTimeout(timeout);
	};
	const _callback = callback;
	if (!runFirst) callback = noop;
	let timeout;
	(function run() {
		callback();
		timeout = ctx.setTimeout(run, Math.max(0, getNextTimeout()));
	})();
	callback = _callback;
	return cancel;
}
//#endregion
export { eachTimeout as t };
