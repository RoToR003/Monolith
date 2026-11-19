//# allFunctionsCalledOnLoad
import { i as onAppWindowChange, n as getAppWindow } from "./appWindow-bo-KtJhy.js";
import { t as hotEffect } from "./hotModule-aCRkP77w.js";
//#region src/components/resizeObserver.ts
var resizeObserverMap = /* @__PURE__ */ new WeakMap();
var observedRefs = /* @__PURE__ */ new Set();
var onResize = (entries) => {
	for (const entry of entries) (resizeObserverMap.get(entry.target)?.callbacks)?.forEach((callback) => {
		try {
			callback(entry);
		} catch (e) {
			console.error("ResizeObserver callback error:", e);
		}
	});
};
var makeResizeObserver = (win) => new (win.ResizeObserver ?? ResizeObserver)(onResize);
var resizeObserver = makeResizeObserver(getAppWindow());
hotEffect(void 0, () => onAppWindowChange((win) => {
	const previous = resizeObserver;
	resizeObserver = makeResizeObserver(win);
	previous.disconnect();
	for (const ref of observedRefs) {
		const element = ref.deref();
		if (element) resizeObserver.observe(element);
		else observedRefs.delete(ref);
	}
}));
function observeResize(element, callback) {
	let item = resizeObserverMap.get(element);
	if (!item) {
		item = {
			callbacks: [],
			ref: new WeakRef(element)
		};
		resizeObserverMap.set(element, item);
		observedRefs.add(item.ref);
		resizeObserver.observe(element);
	}
	item.callbacks.push(callback);
	return () => {
		unobserveResize(element, callback);
	};
}
/**
* Removes a resize observer callback for the given element.
* If no callback is provided, all callbacks for the element are removed.
*/
function unobserveResize(element, callback) {
	const item = resizeObserverMap.get(element);
	if (!item) return;
	const { callbacks } = item;
	if (callback) {
		const index = callbacks.indexOf(callback);
		if (index > -1) callbacks.splice(index, 1);
	} else callbacks.splice(0, callbacks.length);
	if (callbacks.length === 0) {
		resizeObserverMap.delete(element);
		observedRefs.delete(item.ref);
		resizeObserver.unobserve(element);
	}
}
//#endregion
export { unobserveResize as n, observeResize as t };
