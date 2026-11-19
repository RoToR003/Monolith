//# allFunctionsCalledOnLoad
import { h as Modes } from "./userAgent-ByGXcznk.js";
import { t as findUpClassName } from "./findUpClassName-3V5me58N.js";
import { t as themeController } from "./themeController-2cytOOn0.js";
import { n as rootScope } from "./rootScope-CZS0lmz8.js";
import { C as createSignal } from "./solid-9Vxm0VIz.js";
import { t as cancelEvent } from "./cancelEvent-Cw8vYZHp.js";
import { t as findUpAsChild } from "./findUpAsChild-CPjgnY00.js";
import { n as attachClickEvent } from "./clickEvent-COk4YpLP.js";
import { t as isKeyboardControl } from "./isKeyboardControl-klqGHqlo.js";
import { Tn as getInlineArrowKeys } from "./confirmationPopup-Bz6mK0o-.js";
import { t as subscribeOn } from "./subscribeOn-DnCla7ws.js";
import { i as fastSmoothScroll } from "./scrollable-C2-FwBtK.js";
//#region src/helpers/dom/attachListNavigation.ts
var HANDLE_EVENT = "keydown";
var ACTIVE_CLASS_NAME = "active";
var AXIS_Y_KEYS = ["ArrowUp", "ArrowDown"];
var AXIS_X_KEYS = ["ArrowLeft", "ArrowRight"];
function attachListNavigation({ list, type, onSelect, once, waitForKey, activeClassName = ACTIVE_CLASS_NAME, cancelMouseDown, target, focusable, itemSelector }) {
	let waitForKeySet = waitForKey?.length ? new Set(waitForKey) : void 0;
	const keyNames = new Set(type === "xy" ? AXIS_Y_KEYS.concat(AXIS_X_KEYS) : type === "x" ? AXIS_X_KEYS : AXIS_Y_KEYS);
	const getItems = () => Array.from(list.children).filter((item) => !itemSelector || item.matches(itemSelector));
	const getCurrentTarget = () => {
		const items = getItems();
		return target && items.includes(target) ? target : items.find((item) => item.classList.contains(activeClassName)) || items[0];
	};
	const setCurrentTarget = (_target, scrollTo) => {
		if (target === _target) return;
		let hadTarget = false;
		if (target) {
			hadTarget = true;
			target.classList.remove(activeClassName);
			if (focusable) target.tabIndex = -1;
			if (target.getAttribute("role") === "option") target.setAttribute("aria-selected", "false");
		}
		target = _target;
		if (!target) return;
		target.classList.add(activeClassName);
		if (focusable) {
			target.tabIndex = 0;
			if (scrollTo) target.focus();
		}
		if (target.getAttribute("role") === "option") target.setAttribute("aria-selected", "true");
		if (hadTarget && scrollable && scrollTo) fastSmoothScroll({
			container: scrollable,
			element: target,
			position: "center",
			forceDuration: 100,
			axis: type === "x" ? "x" : "y"
		});
	};
	const getNextTargetX = (currentTarget, isNext) => {
		const items = getItems();
		return items[(items.indexOf(currentTarget) + (isNext ? 1 : items.length - 1)) % items.length];
	};
	const getNextTargetY = (currentTarget, isNext) => {
		const currentRect = currentTarget.getBoundingClientRect();
		let nextTarget = getNextTargetX(currentTarget, isNext);
		while (nextTarget !== currentTarget) {
			const targetRect = nextTarget.getBoundingClientRect();
			if (targetRect.x === currentRect.x && targetRect.y !== currentRect.y) break;
			nextTarget = getNextTargetX(nextTarget, isNext);
		}
		return nextTarget;
	};
	let handleArrowKey;
	if (type === "xy") handleArrowKey = (currentTarget, key) => {
		if (key === "ArrowUp" || key === "ArrowDown") return getNextTargetY(currentTarget, key === "ArrowDown");
		else return getNextTargetX(currentTarget, key === getInlineArrowKeys().next);
	};
	else handleArrowKey = (currentTarget, key) => getNextTargetX(currentTarget, key === getInlineArrowKeys().next || key === "ArrowDown");
	let onKeyDown = (e) => {
		if (e.defaultPrevented || e.isComposing || !getItems().length) return;
		if (!focusable && Modes.a11y && isKeyboardControl(e.target)) return;
		if (focusable) {
			const focused = findUpAsChild(e.target, list);
			if (!focused || !getItems().includes(focused)) return;
			target = focused;
			if (e.key === "Home" || e.key === "End") {
				cancelEvent(e);
				const items = getItems();
				setCurrentTarget(items[e.key === "Home" ? 0 : items.length - 1], true);
				return;
			}
		}
		const key = e.key;
		if (!keyNames.has(key)) {
			if (key === "Enter" || focusable && key === " " || !focusable && type !== "xy" && key === "Tab") {
				cancelEvent(e);
				if (!e.repeat) fireSelect(getCurrentTarget());
			}
			return;
		}
		cancelEvent(e);
		if (list.childElementCount > 1) {
			let currentTarget = getCurrentTarget();
			currentTarget = handleArrowKey(currentTarget, key);
			setCurrentTarget(currentTarget, true);
		}
	};
	const scrollable = findUpClassName(list, "scrollable");
	if (!focusable) list.classList.add("navigable-list");
	const onMouseMove = (e) => {
		const target = findUpAsChild(e.target, list);
		if (!target) return;
		setCurrentTarget(target, false);
	};
	const onClick = (e) => {
		cancelEvent(e);
		const target = findUpAsChild(e.target, list);
		if (!target) return;
		setCurrentTarget(target, false);
		fireSelect(getCurrentTarget());
	};
	const fireSelect = async (target) => {
		const canContinue = await onSelect(target);
		if (canContinue !== void 0 ? !canContinue : once) detach();
	};
	let attached = false, attachedDocument, detachClickEvent;
	const attach = () => {
		if (attached) return;
		attached = true;
		attachedDocument = list.ownerDocument;
		(focusable ? list : attachedDocument).addEventListener(HANDLE_EVENT, onKeyDown, {
			capture: true,
			passive: false
		});
		if (!focusable) list.addEventListener("mousemove", onMouseMove, { passive: true });
		if (cancelMouseDown) list.addEventListener("mousedown", cancelEvent);
		if (!focusable) detachClickEvent = attachClickEvent(list, onClick, { ignoreMove: cancelMouseDown });
	};
	const detach = () => {
		if (!attached) return;
		attached = false;
		(focusable ? list : attachedDocument).removeEventListener(HANDLE_EVENT, onKeyDown, { capture: true });
		list.removeEventListener("mousemove", onMouseMove);
		if (cancelMouseDown) list.removeEventListener("mousedown", cancelEvent);
		detachClickEvent?.();
		detachClickEvent = void 0;
	};
	const resetTarget = () => {
		if (waitForKeySet) return;
		setCurrentTarget(getItems()[0], false);
	};
	if (waitForKeySet) {
		const _onKeyDown = onKeyDown;
		onKeyDown = (e) => {
			if (e.defaultPrevented || Modes.a11y && isKeyboardControl(e.target)) return;
			if (waitForKeySet.has(e.key)) {
				cancelEvent(e);
				attachedDocument.removeEventListener(HANDLE_EVENT, onKeyDown, { capture: true });
				onKeyDown = _onKeyDown;
				attachedDocument.addEventListener(HANDLE_EVENT, onKeyDown, {
					capture: true,
					passive: false
				});
				waitForKeySet = void 0;
				resetTarget();
			}
		};
	} else if (!target) resetTarget();
	attach();
	return {
		attach,
		detach,
		resetTarget
	};
}
/**
* Roving focus and activation for lazy emoji, sticker and GIF grids, and for single-choice rows
* (`aria-pressed` items). Items that carry their own name (native buttons with text) can omit
* `getLabel`.
*/
function attachPickerGrid(list, itemSelector, getLabel) {
	const sync = (records) => {
		const controls = Array.from(list.children).filter((item) => item.matches(itemSelector));
		const focused = controls.find((item) => item.contains(list.ownerDocument.activeElement));
		const pressed = controls.find((item) => item.getAttribute("aria-pressed") === "true");
		const choiceMoved = records?.some((record) => record.type === "attributes");
		const current = focused || choiceMoved && pressed || controls.find((item) => item.getAttribute("tabindex") === "0") || pressed || controls[0];
		controls.forEach((item, index) => {
			if (item.tagName !== "BUTTON") item.setAttribute("role", "button");
			if (Modes.a11y) item.tabIndex = item === current ? 0 : -1;
			if (getLabel) item.setAttribute("aria-label", getLabel(item, index));
		});
		return current;
	};
	const observer = new MutationObserver(sync);
	observer.observe(list, { childList: true });
	if (!Modes.a11y) {
		sync();
		return () => observer.disconnect();
	}
	const choiceObserver = new MutationObserver(sync);
	choiceObserver.observe(list, {
		subtree: true,
		attributeFilter: ["aria-pressed"]
	});
	const navigation = attachListNavigation({
		list,
		type: "xy",
		focusable: true,
		itemSelector,
		activeClassName: "keyboard-focused",
		target: sync(),
		onSelect: (target) => {
			target.click();
		}
	});
	return () => {
		observer.disconnect();
		choiceObserver.disconnect();
		navigation.detach();
	};
}
//#endregion
//#region src/hooks/useBaseTheme.ts
/** The base theme the app is drawn in, following it when it turns to another. */
function useBaseTheme() {
	const get = () => themeController.getBaseThemeForName(themeController.getTheme().name);
	const [baseTheme, setBaseTheme] = createSignal(get());
	subscribeOn(rootScope)("theme_changed", () => setBaseTheme(get()));
	return baseTheme;
}
//#endregion
export { attachListNavigation as n, attachPickerGrid as r, useBaseTheme as t };
