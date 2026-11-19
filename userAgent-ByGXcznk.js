//# allFunctionsCalledOnLoad
import { n as __exportAll } from "./rolldown-runtime-CwcJO0Gh.js";
//#region src/config/modes.ts
var KEPT_FLAGS_KEY = "experimental_flags";
var KEPT_FLAGS = [
	"debug",
	"logs",
	"a11y",
	"rtl",
	"noSharedWorker",
	"noServiceWorker",
	"noWorker",
	"noOffscreenCanvas",
	"noObjectUrlRevoke",
	"noPfs",
	"http",
	"noMultipleTransports",
	"forceHideNonContactLinks"
];
var PAGE_ONLY_FLAGS = /* @__PURE__ */ new Set([
	"rtl",
	"memoryWatch",
	"spoiler2"
]);
function isPageOnlyFlag(flag) {
	return PAGE_ONLY_FLAGS.has(flag);
}
var isWorkerFlag = (flag) => flag !== "logs" && !isPageOnlyFlag(flag);
function getKeptFlags() {
	try {
		const flags = JSON.parse(localStorage.getItem(KEPT_FLAGS_KEY));
		if (Array.isArray(flags)) return new Set(KEPT_FLAGS.filter((flag) => flags.includes(flag)));
	} catch (err) {}
	return /* @__PURE__ */ new Set();
}
function setKeptFlags(flags) {
	const list = KEPT_FLAGS.filter((flag) => flags.has(flag));
	try {
		if (list.length) localStorage.setItem(KEPT_FLAGS_KEY, JSON.stringify(list));
		else localStorage.removeItem(KEPT_FLAGS_KEY);
	} catch (err) {}
}
function setKeptFlag(flag, on) {
	const flags = getKeptFlags();
	if (on) flags.add(flag);
	else flags.delete(flag);
	setKeptFlags(flags);
}
var LOADED_KEPT_FLAGS = getKeptFlags();
function getLoadedWorkerFlags() {
	return [...LOADED_KEPT_FLAGS].filter(isWorkerFlag);
}
function isFlagInURL(flag) {
	return location.search.indexOf(flag + "=1") > 0;
}
function getURLWithoutFlags(flags) {
	let url;
	for (const flag of flags) {
		if (!isFlagInURL(flag)) continue;
		url ?? (url = new URL(location.href));
		url.searchParams.delete(flag);
	}
	return url;
}
function isFlagOn(flag) {
	return isFlagInURL(flag) || LOADED_KEPT_FLAGS.has(flag);
}
var Modes = {
	test: isFlagInURL("test") || false,
	debug: isFlagOn("debug"),
	logs: isFlagOn("logs"),
	forceHideNonContactLinks: false,
	http: false,
	ssl: true,
	asServiceWorker: false,
	transport: "websocket",
	noSharedWorker: isFlagOn("noSharedWorker"),
	noServiceWorker: isFlagOn("noServiceWorker"),
	noOffscreenCanvas: isFlagOn("noOffscreenCanvas"),
	noObjectUrlRevoke: isFlagOn("noObjectUrlRevoke"),
	noWorker: isFlagOn("noWorker") || false,
	multipleTransports: !isFlagOn("noMultipleTransports"),
	pfs: !isFlagOn("noPfs"),
	a11y: isFlagOn("a11y"),
	rtl: isFlagOn("rtl"),
	memoryWatch: isFlagInURL("memoryWatch")
};
if (Modes.http = isFlagOn("http")) Modes.multipleTransports = false;
if (Modes.multipleTransports) Modes.http = true;
if (Modes.http) Modes.transport = "https";
//#endregion
//#region src/config/debug.ts
var DEBUG = Modes.debug;
var MOUNT_CLASS_TO = typeof window !== "undefined" ? window : self;
//#endregion
//#region src/environment/ctx.ts
var ctx = typeof window !== "undefined" ? window : self;
//#endregion
//#region src/environment/userAgent.ts
var userAgent_exports = /* @__PURE__ */ __exportAll({
	CHROMIUM_VERSION: () => CHROMIUM_VERSION,
	IS_ANDROID: () => IS_ANDROID,
	IS_APPLE: () => IS_APPLE,
	IS_APPLE_MOBILE: () => IS_APPLE_MOBILE,
	IS_CHROMIUM: () => IS_CHROMIUM,
	IS_FIREFOX: () => IS_FIREFOX,
	IS_MOBILE: () => IS_MOBILE,
	IS_MOBILE_SAFARI: () => IS_MOBILE_SAFARI,
	IS_SAFARI: () => IS_SAFARI,
	USER_AGENT: () => USER_AGENT
});
var USER_AGENT = navigator ? navigator.userAgent : null;
var IS_APPLE = navigator.userAgent.search(/OS X|iPhone|iPad|iOS/i) !== -1;
var IS_ANDROID = navigator.userAgent.toLowerCase().indexOf("android") !== -1;
var IS_CHROMIUM = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
var CHROMIUM_VERSION = (() => {
	try {
		return +navigator.userAgent.match(/Chrom(?:e|ium)\/(.+?)(?:\s|\.)/)[1];
	} catch (err) {}
})();
var IS_APPLE_MOBILE = (/iPad|iPhone|iPod/.test(navigator.platform) || navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1) && !ctx.MSStream;
var IS_SAFARI = !!("safari" in ctx) || !!(USER_AGENT && (/\b(iPad|iPhone|iPod)\b/.test(USER_AGENT) || !!USER_AGENT.match("Safari") && !USER_AGENT.match("Chrome")));
var IS_FIREFOX = navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
var IS_MOBILE_SAFARI = IS_SAFARI && IS_APPLE_MOBILE;
var IS_MOBILE = (navigator.maxTouchPoints === void 0 || navigator.maxTouchPoints > 0) && navigator.userAgent.search(/iOS|iPhone OS|Android|BlackBerry|BB10|Series ?[64]0|J2ME|MIDP|opera mini|opera mobi|mobi.+Gecko|Windows Phone/i) != -1;
//#endregion
export { setKeptFlags as C, setKeptFlag as S, getLoadedWorkerFlags as _, IS_CHROMIUM as a, isFlagOn as b, IS_MOBILE_SAFARI as c, ctx as d, DEBUG as f, getKeptFlags as g, Modes as h, IS_APPLE_MOBILE as i, IS_SAFARI as l, KEPT_FLAGS as m, IS_ANDROID as n, IS_FIREFOX as o, MOUNT_CLASS_TO as p, IS_APPLE as r, IS_MOBILE as s, CHROMIUM_VERSION as t, userAgent_exports as u, getURLWithoutFlags as v, isPageOnlyFlag as x, isFlagInURL as y };
