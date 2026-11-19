//# allFunctionsCalledOnLoad
import { r as toastNew } from "./toast-B6VD5M7R.js";
import { r as copyTextToClipboard } from "./clipboard-DzscV-ca.js";
//#region src/helpers/copyContact.ts
var T_ME = "https://t.me/";
/** As `@username`. */
function copyUsername(username) {
	copyTextToClipboard("@" + username);
	toastNew({ langPackKey: "UsernameCopied" });
}
/** `https://t.me/` and the path — a username, or a `+phone`. */
function copyTmeLink(path) {
	copyTextToClipboard(T_ME + path);
	toastNew({ langPackKey: "LinkCopied" });
}
/** Without the spaces it is shown with, so it pastes as one number. */
function copyPhoneNumber(phone) {
	copyTextToClipboard(phone.replace(/\s/g, ""));
	toastNew({ langPackKey: "PhoneCopied" });
}
function copyPeerId(id) {
	copyTextToClipboard(id);
	toastNew({ langPackKey: "IdCopied" });
}
//#endregion
export { copyUsername as a, copyTmeLink as i, copyPeerId as n, copyPhoneNumber as r, T_ME as t };
