//# allFunctionsCalledOnLoad
//#region src/lib/accounts/bindManagersToAccount.ts
var binders = /* @__PURE__ */ new WeakMap();
/**
* `managers` follow whichever account the tab shows, or are a session's own (see bindManagersToSession):
* `bind` gives ones tied to a single account, `session` the ones of the account session the tab is in.
*/
function registerAccountBinder(managers, binder) {
	binders.set(managers, binder);
}
function bindManagersToAccount(managers, accountNumber) {
	return managers && binders.get(managers)?.bind(accountNumber) || managers;
}
function bindManagersToSession(managers) {
	return managers && binders.get(managers)?.session() || managers;
}
/** The account session `managers` are of, when they are a session's (see bindManagersToSession). */
function getSessionOf(managers) {
	return managers && binders.get(managers)?.of;
}
//#endregion
export { registerAccountBinder as i, bindManagersToSession as n, getSessionOf as r, bindManagersToAccount as t };
