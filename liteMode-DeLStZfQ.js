//# allFunctionsCalledOnLoad
import { h as Modes, p as MOUNT_CLASS_TO } from "./userAgent-ByGXcznk.js";
import { n as rootScope } from "./rootScope-CZS0lmz8.js";
import { C as createSignal, x as createRoot } from "./solid-9Vxm0VIz.js";
import { r as splitDeepPath, t as joinDeepPath } from "./setDeepProperty-IYhQYgHt.js";
import { n as createStore, o as unwrap } from "./store-PwRn5fa3.js";
//#region src/helpers/object/getDeepProperty.ts
function getDeepProperty(object, key) {
	const splitted = Array.isArray(key) ? key : splitDeepPath(key);
	let o = object;
	for (const key of splitted) {
		o = o?.[key];
		if (!o) break;
	}
	return o;
}
//#endregion
//#region src/stores/appSettings.ts
var [appSettings, _setAppSettings] = createRoot(() => createStore({}));
var silent = false;
var setAppSettings = (...args) => {
	const keys = args.slice(0, -1);
	_setAppSettings(...args);
	const newValue = getDeepProperty(unwrap(appSettings), keys);
	if (silent) return Promise.resolve();
	return rootScope.managers.appStateManager.setByKey(joinDeepPath("settings", ...keys), newValue);
};
var setAppSettingsSilent = (...args) => {
	const key = args[0];
	if (typeof key === "object") {
		_setAppSettings(key);
		return;
	}
	silent = true;
	setAppSettings(...args);
	silent = false;
};
var useAppSettings = () => [appSettings, setAppSettings];
MOUNT_CLASS_TO && (MOUNT_CLASS_TO.useAppSettings = useAppSettings);
//#endregion
//#region src/stores/reducedMotion.ts
var reducedMotion = createRoot(() => {
	const query = typeof matchMedia === "function" ? matchMedia("(prefers-reduced-motion: reduce)") : void 0;
	const [value, setValue] = createSignal(!!query?.matches);
	query?.addEventListener("change", (event) => setValue(event.matches));
	return value;
});
function useReducedMotion() {
	return reducedMotion;
}
//#endregion
//#region src/helpers/liteMode.ts
var LiteMode = class {
	isEnabled() {
		const [appSettings] = useAppSettings();
		return !!appSettings.liteMode?.all;
	}
	isReducedMotion() {
		return useReducedMotion()();
	}
	/**
	* The OS reduce-motion preference, which the a11y layer follows, holds the
	* movement off whatever the setting says: the fades stay, the way the
	* platforms' own "Reduce Motion" keeps them
	*/
	isMotionHeldBySystem() {
		return Modes.a11y && this.isReducedMotion();
	}
	isAvailable(key) {
		if (key === "motion" && (!this.isAvailable("animations") || this.isMotionHeldBySystem())) return false;
		const [appSettings] = useAppSettings();
		return !!(appSettings.liteMode && !appSettings.liteMode.all && !appSettings.liteMode[key]);
	}
	getAnimationLevel() {
		return this.isAvailable("motion") ? 2 : this.isAvailable("animations") ? 1 : 0;
	}
	/**
	* Turning the animations off keeps the movement setting under them, and so does the system's
	* reduce motion, which holds the level at 1 whatever that setting says
	*/
	setAnimationLevel(level) {
		const [appSettings, setAppSettings] = useAppSettings();
		const keepMotion = level === 0 || level === 1 && this.isMotionHeldBySystem();
		return setAppSettings("liteMode", {
			animations: level === 0,
			motion: keepMotion ? appSettings.liteMode.motion : level === 1
		});
	}
};
var liteMode = new LiteMode();
MOUNT_CLASS_TO && (MOUNT_CLASS_TO.liteMode = liteMode);
//#endregion
export { setAppSettingsSilent as a, setAppSettings as i, useReducedMotion as n, useAppSettings as o, appSettings as r, getDeepProperty as s, liteMode as t };
