//# allFunctionsCalledOnLoad
import { n as __exportAll } from "./rolldown-runtime-CwcJO0Gh.js";
import { h as Modes, p as MOUNT_CLASS_TO } from "./userAgent-ByGXcznk.js";
import { t as App } from "./app-BuFf8z8C.js";
import { n as sessionStorage, t as tsNow } from "./tsNow-DUzGGNNb.js";
//#region src/helpers/dom/loadScript.ts
function loadScript(url) {
	const script = document.createElement("script");
	const promise = new Promise((resolve) => {
		script.onload = script.onerror = () => {
			resolve(script);
		};
	});
	script.src = url;
	document.body.appendChild(script);
	return promise;
}
//#endregion
//#region src/lib/telegramMeWebManager.ts
var telegramMeWebManager_exports = /* @__PURE__ */ __exportAll({
	TelegramMeWebManager: () => TelegramMeWebManager,
	default: () => telegramMeWebManager
});
var TelegramMeWebManager = class {
	constructor() {
		this.disabled = Modes.test || !App.domains.includes(location.hostname);
	}
	setAuthorized(canRedirect) {
		if (this.disabled) return;
		return sessionStorage.get("tgme_sync").then((curValue) => {
			const ts = tsNow(true);
			if (canRedirect && curValue?.canRedirect === canRedirect && curValue.ts + 86400 > ts) return;
			sessionStorage.set({ tgme_sync: {
				canRedirect,
				ts
			} });
			const path = `_websync_?authed=${canRedirect ? "1" : "0"}&version=${encodeURIComponent(App.version + " " + App.suffix)}`;
			const promises = ["//telegram.me/" + path, "//t.me/" + path].map((url) => {
				return loadScript(url).then((script) => {
					script.remove();
				});
			});
			return Promise.all(promises);
		});
	}
};
var telegramMeWebManager = new TelegramMeWebManager();
MOUNT_CLASS_TO && (MOUNT_CLASS_TO.telegramMeWebManager = telegramMeWebManager);
//#endregion
export { telegramMeWebManager_exports as n, telegramMeWebManager as t };
