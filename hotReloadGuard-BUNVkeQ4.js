//# allFunctionsCalledOnLoad
import { R as useContext, h as createContext } from "./solid-9Vxm0VIz.js";
//#region src/lib/solidjs/hotReloadGuard.ts
var SolidJSHotReloadGuardContext = createContext(null);
var LockScreenHotReloadGuardContext = createContext(null);
/**
* If importing a module causes the page to reload when you make changes in your SolidJS component
* provide the values through the SolidJSHotReloadGuardProvider
*/
function useHotReloadGuard() {
	const contextValue = useContext(SolidJSHotReloadGuardContext);
	if (!contextValue) throw new Error("useHotReloadGuard should not be used outside a <SolidJSHotReloadGuardProvider />");
	return contextValue;
}
function useLockScreenHotReloadGuard() {
	const contextValue = useContext(LockScreenHotReloadGuardContext) || useContext(SolidJSHotReloadGuardContext);
	if (!contextValue) throw new Error("useLockScreenHotReloadGuard should not be used outside a <LockScreenHotReloadGuardProvider />");
	return contextValue;
}
//#endregion
export { useLockScreenHotReloadGuard as i, SolidJSHotReloadGuardContext as n, useHotReloadGuard as r, LockScreenHotReloadGuardContext as t };
