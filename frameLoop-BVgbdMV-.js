//# allFunctionsCalledOnLoad
import { j as on, m as createComputed, x as createRoot } from "./solid-9Vxm0VIz.js";
import { i as onAppWindowChange, n as getAppWindow, o as requestAppWindowFrame, t as bindActiveWindowListener } from "./appWindow-bo-KtJhy.js";
import { t as hotEffect } from "./hotModule-aCRkP77w.js";
import { t as clock } from "./clock-D01pG7GG.js";
//#region src/components/wallet/frameLoop.ts
/**
* One frame loop for the whole wallet window: the card, the amount screen and the send flight draw in the same
* frame, after the deferred storyboard steps of `clock`. It runs only while something is visible on a visible
* page. At rest it draws at most ~60 times a second (the gems are smooth enough and the GPU is shared), while
* something moves it follows the display, or a gem would stutter against a page that moves twice as often.
*
* With nothing to draw it asks for no frames: it looks again now and then (`IDLE_POLL`, the clock's timers run
* then), and a client that shows again — its visibility signal, its element back on screen — wakes it at once.
* The frames, the page's visibility and the viewport are those of the window the app is in: the tab, or the
* Document PiP window it moved to.
*/
/** with nothing to draw, how often the loop looks whether something came back, ms */
var IDLE_POLL = 200;
var clients = /* @__PURE__ */ new Set();
/** cancels the next tick: a frame, or a poll while resting */
var cancelNext;
var resting = false;
var last = 0;
var wasHidden = false;
var unbindVisibility;
var offScreen = /* @__PURE__ */ new Set();
var observed = /* @__PURE__ */ new Map();
var observer;
function createObserver() {
	const IO = getAppWindow().IntersectionObserver;
	if (!IO) return;
	observer = new IO((entries) => {
		let back = false;
		for (const entry of entries) if (entry.isIntersecting) back = offScreen.delete(entry.target) || back;
		else offScreen.add(entry.target);
		if (back) wake();
	});
}
/** `element` is watched for being on screen until the returned function is called (see `isWalletElementOnScreen`) */
function watchWalletElement(element) {
	if (!observer) createObserver();
	const count = observed.get(element) || 0;
	observed.set(element, count + 1);
	if (!count) observer?.observe(element);
	let watched = true;
	return () => {
		if (!watched) return;
		watched = false;
		const count = observed.get(element);
		if (count > 1) {
			observed.set(element, count - 1);
			return;
		}
		observed.delete(element);
		offScreen.delete(element);
		observer?.unobserve(element);
	};
}
/** a watched element is on screen: not scrolled away, its screen not hidden under another */
function isWalletElementOnScreen(element) {
	return !offScreen.has(element);
}
/** A frame of the window the app is in; the function it gives cancels it */
var requestWalletFrame = requestAppWindowFrame;
var isShown = (client) => client.isVisible() && !(client.element && offScreen.has(client.element));
function stop() {
	cancelNext?.();
	cancelNext = void 0;
}
function requestFrame() {
	stop();
	resting = false;
	cancelNext = requestWalletFrame(tick);
}
function requestPoll() {
	stop();
	resting = true;
	const win = getAppWindow();
	const id = win.setTimeout(poll, IDLE_POLL);
	cancelNext = () => win.clearTimeout(id);
}
/** something may show again: the loop looks in the next frame instead of the next poll */
function wake() {
	if (clients.size && (resting || !cancelNext)) requestFrame();
}
/** the page is hidden: the clients are told once, nothing is drawn */
function isPageHidden() {
	if (!getAppWindow().document.hidden) {
		wasHidden = false;
		return false;
	}
	if (!wasHidden) {
		wasHidden = true;
		clients.forEach((client) => client.onHidden?.());
	}
	return true;
}
/** nothing to draw: the clock's due timers run, and the loop rests unless the next one is due before its poll */
function rest() {
	const now = clock.now();
	clock.run(now);
	if (cancelNext) return;
	let due = Infinity;
	for (const timer of clock.timers) if (!timer.cancelled) due = Math.min(due, timer.at);
	if (due - now < IDLE_POLL / 1e3) requestFrame();
	else requestPoll();
}
function poll() {
	cancelNext = void 0;
	if (!clients.size) return;
	if (clock.manual || isPageHidden()) requestFrame();
	else if ([...clients].some(isShown)) requestFrame();
	else rest();
}
function tick(ms) {
	cancelNext = void 0;
	if (!clients.size) return;
	if (clock.manual || isPageHidden()) {
		requestFrame();
		return;
	}
	let shown = false, busy = false;
	for (const client of clients) {
		if (!isShown(client)) continue;
		shown = true;
		if (client.isBusy?.()) {
			busy = true;
			break;
		}
	}
	if (!shown) {
		rest();
		return;
	}
	requestFrame();
	if (!busy && ms - last < 1e3 / 64) return;
	last = ms;
	const now = clock.now();
	clock.run(now);
	for (const client of clients) if (isShown(client)) client.frame(now);
}
hotEffect(void 0, () => onAppWindowChange(() => {
	last = 0;
	if (observer) {
		observer.disconnect();
		observer = void 0;
		offScreen.clear();
		if (observed.size) {
			createObserver();
			for (const element of observed.keys()) observer?.observe(element);
		}
	}
	if (cancelNext) {
		const cancel = cancelNext;
		cancelNext = void 0;
		try {
			cancel();
		} catch (err) {}
		requestFrame();
	}
}));
function addWalletFrameClient(client) {
	clients.add(client);
	const unwatch = client.element ? watchWalletElement(client.element) : void 0;
	const disposeWatch = createRoot((dispose) => {
		createComputed(on(client.isVisible, (visible) => visible && wake(), { defer: true }));
		return dispose;
	});
	unbindVisibility ?? (unbindVisibility = bindActiveWindowListener((win) => win.document, "visibilitychange", () => {
		if (!isPageHidden()) wake();
	}));
	wake();
	return () => {
		if (!clients.delete(client)) return;
		disposeWatch();
		unwatch?.();
		if (!clients.size) {
			stop();
			unbindVisibility?.();
			unbindVisibility = void 0;
		}
	};
}
//#endregion
export { watchWalletElement as i, isWalletElementOnScreen as n, requestWalletFrame as r, addWalletFrameClient as t };
