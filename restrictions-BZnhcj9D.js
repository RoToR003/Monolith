//# allFunctionsCalledOnLoad
//#region src/helpers/restrictions.ts
var platforms = /* @__PURE__ */ new Set([
	"all",
	"web",
	"webk"
]);
var SENSITIVE_RESTRICTION_REASON = "sensitive";
/**
* The reasons one account ignores: what its app config lists, with `sensitive` decided by the account's own
* switch once its content settings are known. Like Android: the switch takes effect at once and survives a
* reload, instead of waiting for the app config to catch up with it.
*/
function makeIgnoredRestrictionReasons(appConfigReasons = [], contentSettings) {
	const ignored = new Set(appConfigReasons);
	if (contentSettings) {
		if (contentSettings.pFlags.sensitive_enabled) ignored.add(SENSITIVE_RESTRICTION_REASON);
		else ignored.delete(SENSITIVE_RESTRICTION_REASON);
	}
	return ignored;
}
var pageIgnored = /* @__PURE__ */ new Set();
function setIgnoredRestrictionReasons(ignored) {
	pageIgnored = ignored;
}
function getRestrictionReason(reasons, ignored = pageIgnored) {
	return reasons.find((reason) => platforms.has(reason.platform) && !ignored.has(reason.reason));
}
function isSensitive(reasons, ignored = pageIgnored) {
	if (ignored.has("sensitive")) return false;
	return reasons.some((reason) => reason.reason === "sensitive" && platforms.has(reason.platform));
}
function isRestricted(reasons, ignored = pageIgnored) {
	return !!getRestrictionReason(reasons, ignored);
}
//#endregion
export { makeIgnoredRestrictionReasons as a, isSensitive as i, getRestrictionReason as n, setIgnoredRestrictionReasons as o, isRestricted as r, SENSITIVE_RESTRICTION_REASON as t };
