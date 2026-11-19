//# allFunctionsCalledOnLoad
import { n as __exportAll } from "./rolldown-runtime-CwcJO0Gh.js";
import { n as rootScope } from "./rootScope-CZS0lmz8.js";
import { _ as createMemo, g as createEffect, x as createRoot } from "./solid-9Vxm0VIz.js";
import { a as reconcile, n as createStore, o as unwrap } from "./store-PwRn5fa3.js";
import { a as makeIgnoredRestrictionReasons, o as setIgnoredRestrictionReasons } from "./restrictions-BZnhcj9D.js";
import { t as hotEffect } from "./hotModule-aCRkP77w.js";
//#region src/stores/appState.ts
var [appState, _setAppState] = createRoot(() => createStore({}));
var setAppState = (...args) => {
	const key = args[0];
	_setAppState(...args);
	return rootScope.managers.appStateManager.setByKey(key, unwrap(appState[key]));
};
var setAppStateSilent = (key, value) => {
	if (typeof key === "object") {
		_setAppState(key);
		return;
	}
	_setAppState(key, reconcile(value));
};
var replaceAppStateSilent = (state) => {
	_setAppState(reconcile(state));
};
var useAppState = () => [appState, setAppState];
var useAppConfig = () => appState.appConfig;
var useIsFrozen = () => !!useAppConfig().freeze_since_date;
//#endregion
//#region src/stores/contentSettings.ts
var contentSettings_exports = /* @__PURE__ */ __exportAll({ default: () => useContentSettings });
function useContentSettings() {
	const [appState] = useAppState();
	const appConfig = () => appState.appConfig;
	const contentSettings = createMemo(() => appState.accountContentSettings?.value);
	const sensitiveEnabled = createMemo(() => contentSettings()?.pFlags.sensitive_enabled ?? false);
	const sensitiveCanChange = createMemo(() => contentSettings()?.pFlags.sensitive_can_change ?? false);
	const ignoredRestrictionReasons = createMemo(() => {
		return makeIgnoredRestrictionReasons(appConfig()?.ignore_restriction_reasons, contentSettings());
	});
	return {
		sensitiveEnabled,
		sensitiveCanChange,
		needAgeVerification: createMemo(() => appConfig()?.need_age_video_verification ?? false),
		ageVerified: createMemo(() => !!appState.ageVerification),
		ignoredRestrictionReasons
	};
}
hotEffect(void 0, () => createRoot((dispose) => {
	const contentSettings = useContentSettings();
	createEffect(() => {
		setIgnoredRestrictionReasons(contentSettings.ignoredRestrictionReasons());
	});
	return dispose;
}));
//#endregion
export { setAppState as a, useAppState as c, replaceAppStateSilent as i, useIsFrozen as l, useContentSettings as n, setAppStateSilent as o, appState as r, useAppConfig as s, contentSettings_exports as t };
