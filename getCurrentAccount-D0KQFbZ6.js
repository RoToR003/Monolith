//# allFunctionsCalledOnLoad
import "./constants-DqJIiZwa.js";
import { r as getSessionOf } from "./bindManagersToAccount-BL82O9H9.js";
//#region src/lib/accounts/getValidatedAccount.ts
function getValidatedAccount(input) {
	input = parseInt((input || "1") + "");
	return input <= 4 && input >= 1 ? input : 1;
}
//#endregion
//#region src/lib/accounts/getCurrentAccountFromURL.ts
function getCurrentAccountFromURL(urlString) {
	const params = new URL(urlString).searchParams;
	return getValidatedAccount(params.get("account") || "");
}
//#endregion
//#region src/lib/accounts/getCurrentAccount.ts
var current;
var session;
var getCurrentAccount = () => current ?? (current = getCurrentAccountFromURL(window.location.href));
function getAccountSession() {
	return session ?? (session = {
		accountNumber: getCurrentAccount(),
		ended: false
	});
}
/** The account session `managers` are of, when they are a session's own (bindManagersToSession), or else the tab's now. */
function getManagersSession(managers) {
	return getSessionOf(managers) ?? getAccountSession();
}
function setCurrentAccount(accountNumber) {
	if (session) {
		session.ended = true;
		session = void 0;
	}
	current = accountNumber;
}
var switchingTo;
/**
* Whether `session` is over or on its way out - a switch from it to another account is under way: what it
* was to open now would stand over the next account, so it is not opened.
*/
function isSessionLeaving(session) {
	return session.ended || switchingTo !== void 0 && switchingTo !== session.accountNumber;
}
/**
* The account a switch in place is on its way to, while one runs: until it is done the tab still shows
* the current account, and whatever opens on it now is gone with the switch.
*/
function getAccountSwitchingTo() {
	return switchingTo;
}
function setAccountSwitchingTo(accountNumber) {
	switchingTo = accountNumber;
}
//#endregion
export { isSessionLeaving as a, getCurrentAccountFromURL as c, getManagersSession as i, getValidatedAccount as l, getAccountSwitchingTo as n, setAccountSwitchingTo as o, getCurrentAccount as r, setCurrentAccount as s, getAccountSession as t };
