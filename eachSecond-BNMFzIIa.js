//# allFunctionsCalledOnLoad
import { t as eachTimeout } from "./eachTimeout-DofW9JiZ.js";
//#region src/helpers/eachSecond.ts
function eachSecond(callback, runFirst) {
	return eachTimeout(callback, () => 1e3 - (/* @__PURE__ */ new Date()).getMilliseconds(), runFirst);
}
//#endregion
export { eachSecond as t };
