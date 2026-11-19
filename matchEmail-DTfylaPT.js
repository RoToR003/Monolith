//# allFunctionsCalledOnLoad
import { u as EMAIL_REG_EXP } from "./commonStateStorage-CW-poHCa.js";
//#region src/lib/richTextProcessor/matchEmail.ts
function matchEmail(text) {
	return !text ? null : text.match(EMAIL_REG_EXP);
}
//#endregion
export { matchEmail as t };
