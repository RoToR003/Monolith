//# allFunctionsCalledOnLoad
//#region src/lib/accounts/authKeyFingerprint.ts
/** What the account's slot and the state's check keep of that key, as `auth_key_fingerprint` */
function getAuthKeyFingerprint(authKey) {
	return authKey.slice(0, 8);
}
//#endregion
//#region src/config/app.ts
var MAIN_DOMAINS = ["web.telegram.org", "webk.telegram.org"];
var DEFAULT_BACKGROUND_SLUG = "pattern";
var threads = Math.min(4, navigator.hardwareConcurrency ?? 4);
var App = {
	id: 1025907,
	hash: "452b0359b988148995f22ff0f4229750",
	pushServerKey: "BB3JzmQIBTl8ZdTmLzhkZVnoYxoSvUmCe1CqqF53u2j0WbEFo2m--mOBagroDFdqMeESfz3ue1Z1e5PTIxMYH_g",
	version: "2.3",
	versionFull: "2.3 (687)",
	build: 687,
	langPackVersion: 378801,
	langPack: "webk",
	langPackCode: "en",
	domains: MAIN_DOMAINS,
	baseDcId: 2,
	isMainDomain: MAIN_DOMAINS.includes(location.hostname),
	suffix: "K",
	threads,
	lottieWorkers: threads,
	cryptoWorkers: threads,
	interclientBroadcastChannel: "tgweb"
};
function getAppVersionText() {
	return `Telegram Web${App.suffix} ${App.version} (${App.build})`;
}
if (App.isMainDomain) {
	App.id = 2496;
	App.hash = "8da85b0d5bfe62527e5b244c209159c3";
	App.pushServerKey = "BHEbKOXt-GD8MCTTYiAYT3I5R4MB0epIE7Tbbymj1uR0xJRE_7m27eXTVAC_P19TeZnO9413lRz-0oZ87JRPKPM";
}
//#endregion
export { getAuthKeyFingerprint as i, DEFAULT_BACKGROUND_SLUG as n, getAppVersionText as r, App as t };
