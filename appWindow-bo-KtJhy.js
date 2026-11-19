//# allFunctionsCalledOnLoad
//#region src/helpers/appWindow.ts
/**
* The window whose viewport the app's layout should track. Normally the tab's own `window`; while the
* client is popped out into a Document Picture-in-Picture window the whole app DOM lives in THAT
* window, so every viewport-driven measurement (column widths, `--vh`, mediaSizes breakpoints) must
* read its size instead — otherwise the moved app keeps sizing itself to the now-background tab.
*
* Single source of truth: `windowSize`, `mediaSizes`, `updateColumnWidths` and the `--vh` setter all
* read `getAppWindow()` and re-subscribe via `onAppWindowChange`. When it equals `window` (no PiP)
* everything behaves exactly as before — flipping it is the only thing PiP does to the metrics layer.
*/
var activeWindow = typeof window !== "undefined" ? window : void 0;
var listeners = /* @__PURE__ */ new Set();
var beforeListeners = /* @__PURE__ */ new Set();
function getAppWindow() {
	return activeWindow;
}
/** A frame of the window the app is in; the function it gives cancels it */
function requestAppWindowFrame(callback) {
	const win = activeWindow;
	const id = win.requestAnimationFrame(callback);
	return () => win.cancelAnimationFrame(id);
}
/**
* The body where transient overlays (context menus, popups, tooltips, the media viewer) should mount.
* It's the active app window's body — so an overlay opened while the client is popped out lands in the
* Document PiP window instead of the now-background tab. The whole app lives in one window at a time,
* so this single atomic target is all the overlay layer needs.
*/
function getOverlayRoot() {
	return activeWindow.document.body;
}
function setAppWindow(win) {
	const prev = activeWindow;
	if (!win || win === prev) return;
	beforeListeners.forEach((listener) => {
		try {
			listener(win, prev);
		} catch {}
	});
	activeWindow = win;
	listeners.forEach((listener) => {
		try {
			listener(win, prev);
		} catch {}
	});
}
/** Subscribe to active-window changes. Callback gets `(newWindow, previousWindow)`. */
function onAppWindowChange(cb) {
	listeners.add(cb);
	return () => listeners.delete(cb);
}
/**
* Subscribe to the moment JUST BEFORE the active window changes — fired while the DOM is still in the
* outgoing window at its current size, before any metric (mediaSizes / column widths / `--vh`) has
* recomputed. Use it to capture pre-reflow state (e.g. scroll position). Callback gets `(next, prev)`.
*/
function onBeforeAppWindowChange(cb) {
	beforeListeners.add(cb);
	return () => beforeListeners.delete(cb);
}
function bindActiveWindowListener(getTarget, type, listener, options) {
	let target;
	const attach = (win) => {
		target = getTarget(win);
		target.addEventListener(type, listener, options);
	};
	const detach = () => target?.removeEventListener(type, listener, options);
	attach(activeWindow);
	const off = onAppWindowChange((win) => {
		detach();
		attach(win);
	});
	return () => {
		detach();
		off();
	};
}
//#endregion
export { onBeforeAppWindowChange as a, onAppWindowChange as i, getAppWindow as n, requestAppWindowFrame as o, getOverlayRoot as r, setAppWindow as s, bindActiveWindowListener as t };
