//# allFunctionsCalledOnLoad
import { h as Modes } from "./userAgent-ByGXcznk.js";
import { t as IS_TOUCH_SUPPORTED } from "./touchSupport-B2RWO3zD.js";
import { i as onAppWindowChange, n as getAppWindow } from "./appWindow-bo-KtJhy.js";
import { n as simulateEvent } from "./dispatchEvent-CZVxCUd_.js";
import { t as buttonKeyDown } from "./buttonKeyDown-CqZzefS3.js";
//#region src/helpers/dom/clickEvent.ts
var lastMouseDownElement;
var onGlobalMouseDown = (e) => {
	const target = e.target;
	lastMouseDownElement = target ? new WeakRef(target) : void 0;
	if (target?.closest("[cancel-mouse-down]")) e.preventDefault();
};
var mouseDownDocument;
var bindMouseDownTracker = (win) => {
	mouseDownDocument?.removeEventListener("mousedown", onGlobalMouseDown);
	mouseDownDocument = win.document;
	mouseDownDocument.addEventListener("mousedown", onGlobalMouseDown);
};
bindMouseDownTracker(getAppWindow());
onAppWindowChange((win) => bindMouseDownTracker(win));
function hasMouseMovedSinceDown(e) {
	if (Modes.a11y && e.type === "click" && e.detail === 0) return false;
	if (e.isTrusted && e.type === "click" && e.target !== lastMouseDownElement?.deref()) return true;
}
var CLICK_EVENT_NAME = IS_TOUCH_SUPPORTED ? "mousedown" : "click";
function attachClickEvent(elem, callback, options = {}) {
	const add = options.listenerSetter ? options.listenerSetter.add(elem) : elem.addEventListener.bind(elem);
	const remove = options.listenerSetter ? options.listenerSetter.removeManual.bind(options.listenerSetter, elem) : elem.removeEventListener.bind(elem);
	const listenerOptions = options.once ? {
		...options,
		once: false
	} : options;
	options.touchMouseDown = true;
	if (options.cancelMouseDown) elem.setAttribute("cancel-mouse-down", "");
	const element = elem;
	const isHtmlElement = typeof element.getAttribute === "function" && typeof element.click === "function";
	const isNativeInteractive = isHtmlElement && element.matches("button, input, select, textarea, a[href]");
	let detached = false;
	const detach = () => {
		if (detached) return;
		detached = true;
		remove(CLICK_EVENT_NAME, onPrimaryActivate, listenerOptions);
		if (onKeyboardClick) remove("click", onKeyboardClick, listenerOptions);
		if (onKeyDown) remove("keydown", onKeyDown, listenerOptions);
	};
	const invokeCallback = (e) => {
		try {
			callback(e);
		} finally {
			if (options.once) detach();
		}
	};
	const onPrimaryActivate = (e) => {
		if (CLICK_EVENT_NAME === "click" && !options.ignoreMove && hasMouseMovedSinceDown(e)) {
			if (options.once) detach();
			return;
		}
		invokeCallback(e);
	};
	const onKeyboardClick = Modes.a11y && CLICK_EVENT_NAME !== "click" && isHtmlElement ? (e) => {
		if (e.detail === 0) invokeCallback(e);
	} : void 0;
	const onKeyDown = Modes.a11y && isHtmlElement && !isNativeInteractive ? (e) => {
		if (element.getAttribute("role") === "button") buttonKeyDown(e);
	} : void 0;
	add(CLICK_EVENT_NAME, onPrimaryActivate, listenerOptions);
	if (onKeyboardClick) add("click", onKeyboardClick, listenerOptions);
	if (onKeyDown) add("keydown", onKeyDown, listenerOptions);
	return detach;
}
function simulateClickEvent(elem) {
	simulateEvent(elem, CLICK_EVENT_NAME);
}
//#endregion
export { simulateClickEvent as i, attachClickEvent as n, hasMouseMovedSinceDown as r, CLICK_EVENT_NAME as t };
