//# allFunctionsCalledOnLoad
import { p as createComponent } from "./solid-9Vxm0VIz.js";
import { n as SolidJSHotReloadGuardContext } from "./hotReloadGuard-BUNVkeQ4.js";
//#region src/lib/solidjs/hotReloadGuardProvider.tsx
/**
* The app's top level — its singletons, and the popups and tabs that pull them in — for code below it, which must not
* import them: an import from there makes the whole app part of that module's graph (every test of it, every HMR
* update through it). Filled at startup: the singletons register themselves where they are made, the rest comes from
* @lib/solidjs/hotReloadGuardValue, which only the app's root imports. Components take it from the context
* (useHotReloadGuard), other code reads it here at call time — never while modules are still being evaluated.
*/
var hotReloadGuard = {};
var registered = !!hotReloadGuard.HotReloadGuard;
function registerHotReloadGuard(values) {
	Object.assign(hotReloadGuard, values, { HotReloadGuard: SolidJSHotReloadGuardProvider });
	registered = true;
}
var load;
/** How the app's root fills the registry, for what may mount the provider before the app is up */
function setHotReloadGuardLoader(loader) {
	load = loader;
}
/**
* The registry filled, through the root's loader: the app's top level loaded, or loading for the first caller and
* shared with the others (`registered` would not tell - a singleton registers itself before the rest is in). For code
* that can run before the app is up and mounts the provider - the media editor, which the sign-up screen opens for the
* new account's photo.
*/
async function hotReloadGuardReady() {
	await load?.();
}
function SolidJSHotReloadGuardProvider(props) {
	if (!registered) throw new Error("SolidJSHotReloadGuardProvider: nothing registered, import @lib/solidjs/hotReloadGuardValue at startup");
	return createComponent(SolidJSHotReloadGuardContext.Provider, {
		value: hotReloadGuard,
		get children() {
			return props.children;
		}
	});
}
//#endregion
export { setHotReloadGuardLoader as a, registerHotReloadGuard as i, hotReloadGuard as n, hotReloadGuardReady as r, SolidJSHotReloadGuardProvider as t };
