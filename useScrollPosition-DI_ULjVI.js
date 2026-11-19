//# allFunctionsCalledOnLoad
import { C as createSignal, M as onCleanup, g as createEffect } from "./solid-9Vxm0VIz.js";
import { t as requestRAF } from "./requestRAF-CwdYaVwH.js";
//#region src/hooks/useScrollPosition.ts
function useScrollPosition(element, axis = "y") {
	const [scrollPosition, setScrollPosition] = createSignal(0);
	let isRAFing = false;
	const requestMetricsUpdate = (el) => {
		if (isRAFing) return;
		isRAFing = true;
		requestRAF(() => {
			isRAFing = false;
			setScrollPosition(axis === "y" ? el.scrollTop : Math.abs(el.scrollLeft));
		});
	};
	createEffect(() => {
		const el = element();
		if (!el) {
			setScrollPosition(0);
			return;
		}
		requestMetricsUpdate(el);
		const onScroll = () => requestMetricsUpdate(el);
		el.addEventListener("scroll", onScroll, { passive: true });
		onCleanup(() => {
			el.removeEventListener("scroll", onScroll);
		});
	});
	return scrollPosition;
}
//#endregion
export { useScrollPosition as t };
