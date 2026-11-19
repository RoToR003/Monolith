//# allFunctionsCalledOnLoad
import { r as toastNew } from "./toast-B6VD5M7R.js";
//#region src/components/toastError.ts
/**
* A request that failed, said in the generic error toast - but for one of an account session the tab has left meanwhile,
* whose session-bound managers drop the answer (`MIDDLEWARE`): that says nothing
*/
function toastError(err, label) {
	if (err?.type === "MIDDLEWARE") return;
	console.error(label, err);
	toastNew({ langPackKey: "Error.AnError" });
}
//#endregion
export { toastError as t };
