//# allFunctionsCalledOnLoad
import { M as onCleanup, g as createEffect } from "./solid-9Vxm0VIz.js";
import { t as observeResize } from "./resizeObserver-DddVtfLC.js";
//#region src/hooks/useObserveResize.tsx
function useObserveResize(el, callback) {
	createEffect(() => {
		const element = el();
		if (!element) return;
		const unobserve = observeResize(element, callback);
		onCleanup(() => void unobserve());
	});
}
//#endregion
export { useObserveResize as t };
