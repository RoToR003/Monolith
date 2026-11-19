//# allFunctionsCalledOnLoad
import { n as fastRaf } from "./schedulers-Cx0-7a1P.js";
import { r as throttleWith } from "./commonStateStorage-CW-poHCa.js";
//#region src/helpers/schedulers/throttleWithRaf.ts
function throttleWithRaf(fn) {
	return throttleWith(fastRaf, fn);
}
//#endregion
export { throttleWithRaf as t };
