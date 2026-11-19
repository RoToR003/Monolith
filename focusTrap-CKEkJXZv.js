//# allFunctionsCalledOnLoad
import { h as Modes } from "./userAgent-ByGXcznk.js";
import { i as onAppWindowChange, t as bindActiveWindowListener } from "./appWindow-bo-KtJhy.js";
//#region src/helpers/dom/inputModality.ts
var lastInputWasPointer = false;
bindActiveWindowListener((win) => win.document, "pointerdown", (e) => {
	if (e.isTrusted) lastInputWasPointer = true;
}, true);
bindActiveWindowListener((win) => win.document, "keydown", (e) => {
	if (e.isTrusted) lastInputWasPointer = false;
}, true);
/**
* Whether the user's latest input was a pointer (mouse, pen, touch) rather than a key.
*
* Ask it when something OPENS: the browser rings whatever a script focuses after any key press —
* the very Escape that closes a menu included — so by the time it closes, focus handed back to the
* opener would ring for someone who only ever used the mouse.
*/
function isLastInputPointer() {
	return lastInputWasPointer;
}
//#endregion
//#region src/helpers/dom/focusTrap.ts
var FOCUSABLE_SELECTOR = [
	"a[href]",
	"button:not([disabled])",
	"input:not([disabled])",
	"textarea:not([disabled])",
	"select:not([disabled])",
	"audio[controls]",
	"video[controls]",
	"iframe",
	"[contenteditable]:not([contenteditable=\"false\"])",
	"[tabindex]:not([tabindex^=\"-\"])"
].join(",");
function getFocusableElements(container) {
	return Array.from(container.querySelectorAll(FOCUSABLE_SELECTOR)).filter((element) => {
		if (element.matches(":disabled") || element.hasAttribute("tabindex") && element.tabIndex < 0 || element.closest("[inert], [hidden], [aria-hidden=\"true\"]")) return false;
		const style = element.ownerDocument.defaultView?.getComputedStyle(element);
		if (style?.visibility === "hidden" || style?.visibility === "collapse" || style?.display === "none") return false;
		return !!(element.offsetWidth || element.offsetHeight || element.getClientRects().length);
	}).filter((element, _, elements) => {
		if (!element.matches("input[type=\"radio\"][name]")) return true;
		const radio = element;
		const group = elements.filter((other) => other.matches("input[type=\"radio\"]") && other.name === radio.name && other.form === radio.form);
		return radio === (group.find((other) => other.checked) || group[0]);
	}).sort((a, b) => (a.tabIndex > 0 ? a.tabIndex : Infinity) - (b.tabIndex > 0 ? b.tabIndex : Infinity));
}
/**
* Marks an overlay that serves a control inside a trapped element but is mounted elsewhere — the
* formatting toolbar over a caption. Focus may move into it without the trap pulling it back.
*/
var FOCUS_TRAP_ATTACHED_ATTRIBUTE = "data-focus-trap-attached";
/** Whether the focus is in `element` or nowhere at all: nothing else has taken it. */
function isFocusWithinOrLost(element, doc = element.ownerDocument) {
	const focused = doc?.activeElement;
	return !focused || focused === doc.body || element.contains(focused);
}
var documentTraps = /* @__PURE__ */ new WeakMap();
/**
* Keeps keyboard focus inside `element` while active — Tab / Shift+Tab wrap
* around its focusable children. `isActive` lets callers (e.g. stacked popups)
* keep only the topmost trap live. `deactivate` restores the prior focus.
*/
function createFocusTrap(element, isActive = () => true) {
	let activeDocument;
	let stopFollowingWindow;
	let restoreOptions;
	const token = { element };
	const isTopmost = () => {
		const stack = documentTraps.get(activeDocument);
		return isActive() && stack?.[stack.length - 1] === token;
	};
	const focusInside = () => {
		if (!element.hasAttribute("tabindex")) element.tabIndex = -1;
		(getFocusableElements(element)[0] || element).focus();
	};
	const onFocusIn = (event) => {
		const target = event.target;
		if (isTopmost() && !element.contains(target) && !target.closest?.(`[data-focus-trap-attached]`)) focusInside();
	};
	const onKeyDown = (e) => {
		if (e.key !== "Tab" || e.defaultPrevented || !isTopmost()) return;
		const focusable = getFocusableElements(element);
		if (!focusable.length) {
			e.preventDefault();
			focusInside();
			return;
		}
		const first = focusable[0];
		const last = focusable[focusable.length - 1];
		const active = activeDocument.activeElement;
		if (e.shiftKey) {
			if (active === first || !element.contains(active)) {
				e.preventDefault();
				last.focus();
			}
		} else if (active === last || !element.contains(active)) {
			e.preventDefault();
			first.focus();
		}
	};
	const bindDocument = (doc) => {
		if (activeDocument === doc) return;
		const focused = activeDocument?.activeElement;
		const oldStack = documentTraps.get(activeDocument);
		const index = oldStack?.indexOf(token) ?? -1;
		if (index !== -1) oldStack.splice(index, 1);
		activeDocument?.removeEventListener("keydown", onKeyDown, true);
		activeDocument?.removeEventListener("focusin", onFocusIn);
		activeDocument = doc;
		const stack = documentTraps.get(doc) || [];
		stack.push(token);
		documentTraps.set(doc, stack);
		doc.addEventListener("keydown", onKeyDown, true);
		doc.addEventListener("focusin", onFocusIn);
		if (focused) queueMicrotask(() => {
			if (activeDocument !== doc || !isTopmost() || element.ownerDocument !== doc) return;
			if (element.contains(focused)) focused.focus();
			else if (!element.contains(doc.activeElement)) focusInside();
		});
	};
	const trap = {
		activate(restoreTo, initialFocus) {
			if (!Modes.a11y) return;
			if (activeDocument) trap.deactivate(false);
			const doc = element.ownerDocument || document;
			token.restoreTo = restoreTo || doc.activeElement;
			restoreOptions = {
				preventScroll: true,
				...isLastInputPointer() && { focusVisible: false }
			};
			bindDocument(doc);
			stopFollowingWindow = onAppWindowChange((win, prev) => {
				if (activeDocument === prev.document) bindDocument(win.document);
			});
			if (!element.hasAttribute("tabindex")) element.tabIndex = -1;
			if (!element.contains(activeDocument.activeElement)) {
				if (initialFocus) initialFocus.focus();
				else focusInside();
			}
		},
		deactivate(restoreFocus = true) {
			stopFollowingWindow?.();
			stopFollowingWindow = void 0;
			const stack = documentTraps.get(activeDocument);
			const wasTopmost = stack?.[stack.length - 1] === token;
			const index = stack?.indexOf(token) ?? -1;
			if (index !== -1 && restoreFocus) stack.slice(index + 1).forEach((scope) => {
				if (element.contains(scope.restoreTo)) scope.restoreTo = token.restoreTo;
			});
			if (index !== -1) stack.splice(index, 1);
			activeDocument?.removeEventListener("keydown", onKeyDown, true);
			activeDocument?.removeEventListener("focusin", onFocusIn);
			if (restoreFocus && wasTopmost && isFocusWithinOrLost(element, activeDocument) && token.restoreTo?.isConnected && token.restoreTo.focus) token.restoreTo.focus(restoreOptions);
			const parent = stack?.[stack.length - 1]?.element;
			if (restoreFocus && wasTopmost && parent) {
				const doc = activeDocument;
				const restoreParentFocus = () => {
					const scopes = documentTraps.get(doc);
					if (scopes?.[scopes.length - 1]?.element === parent && !parent.contains(doc.activeElement)) (getFocusableElements(parent)[0] || parent).focus(restoreOptions);
				};
				restoreParentFocus();
				queueMicrotask(restoreParentFocus);
			}
			token.restoreTo = void 0;
			activeDocument = void 0;
		}
	};
	return trap;
}
//#endregion
export { isLastInputPointer as a, isFocusWithinOrLost as i, createFocusTrap as n, getFocusableElements as r, FOCUS_TRAP_ATTACHED_ATTRIBUTE as t };
