//# allFunctionsCalledOnLoad
const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["chooseProfileVideoSize-DRIbjnd6.js","rolldown-runtime-CwcJO0Gh.js","appDownloadManager-ClHW2-Dl.js","userAgent-ByGXcznk.js","noop-H9NNBLfX.js","objectUrlUtils-5x08MNuO.js","app-BuFf8z8C.js","pause-BSJh-z46.js","constants-DqJIiZwa.js","rootScope-CZS0lmz8.js","eventListenerBase-da40Q-0t.js","logger-7zf0rNYS.js","mainMessagePort-B60c5YFT.js","superMessagePort-DhrhiTig.js","makeError-CiXxcKtE.js","encryptedStorageLayer-gN9TBXzg.js","idb-BZfkipS3.js","cancellablePromise-bof--dnO.js","cryptoMessagePort-D8QFBtT1.js","commonStateStorage-CW-poHCa.js","regex-DmbDaFB2.js","tsNow-DUzGGNNb.js","bytesToHex-BQHuRHPP.js","randomize-jNNpMVgZ.js","constants-DLILUQ1j.js","apiManagerProxy-DmQXvxSF.js","appNavigationController-Ct0fx8yF.js","appWindow-bo-KtJhy.js","getCurrentAccount-D0KQFbZ6.js","bindManagersToAccount-BL82O9H9.js","cancelEvent-Cw8vYZHp.js","touchSupport-B2RWO3zD.js","themeController-2cytOOn0.js","solid-9Vxm0VIz.js","state-JPIG5PpJ.js","clamp-9UaNhw6N.js","setDeepProperty-IYhQYgHt.js","liteMode-DeLStZfQ.js","store-PwRn5fa3.js","crc32-BBj7ogy1.js","browser-CNMy5TzU.js","lerp-DAS1FxCk.js","accumulate-DzVphodg.js","mediaSizes-C1MTaleW.js","useHeavyAnimationCheck-sWeBPI3f.js","emojiSupport-Cdbu9YLM.js","langPack-BmdJGr44.js","icon-DbP6Es97.js","preload-helper-B0NHKCoo.js","idleController-fYZWT5XB.js","getServerMessageId-1hhP4U5Q.js","telegramMeWebManager-DYNVhEqt.js","contentSettings-DMhHR-0w.js","restrictions-BZnhcj9D.js","hotModule-aCRkP77w.js","hotReloadGuardProvider-CHEsZRuG.js","hotReloadGuard-BUNVkeQ4.js","emoji-Bi9QRCod.js","createDownloadAnchor-n8OhgS0K.js","mimeTypeMap-CnhjI2wm.js"])))=>i.map(i=>d[i]);
import { i as __toESM, n as __exportAll } from "./rolldown-runtime-CwcJO0Gh.js";
import { h as Modes, p as MOUNT_CLASS_TO, r as IS_APPLE, s as IS_MOBILE } from "./userAgent-ByGXcznk.js";
import { t as IS_TOUCH_SUPPORTED } from "./touchSupport-B2RWO3zD.js";
import { t as findUpClassName } from "./findUpClassName-3V5me58N.js";
import { n as fastRaf } from "./schedulers-Cx0-7a1P.js";
import { o as customProperties, t as themeController } from "./themeController-2cytOOn0.js";
import { t as noop } from "./noop-H9NNBLfX.js";
import { t as pause } from "./pause-BSJh-z46.js";
import { n as OverlayedIcon, t as Icon } from "./icon-DbP6Es97.js";
import { E as isWebFileLocation, S as callbackify, _ as limitSymbols } from "./objectUrlUtils-5x08MNuO.js";
import { L as getAccountManagers, R as getOtherAccountManagers, V as usePeer, at as IS_WEBM_SUPPORTED, k as getPeerTitleText, m as getAbbreviation, t as apiManagerProxy, v as getPeerAvatarColorById, y as getPeerAvatarColorByPeer } from "./apiManagerProxy-DmQXvxSF.js";
import { n as rootScope, p as PEER_FULL_TTL, x as TOPIC_COLORS, y as SERVICE_PEER_ID } from "./rootScope-CZS0lmz8.js";
import { n as logger } from "./logger-7zf0rNYS.js";
import { n as indexOfAndSplice } from "./superMessagePort-DhrhiTig.js";
import { r as toArray } from "./encryptedStorageLayer-gN9TBXzg.js";
import { a as safeAssign } from "./idb-BZfkipS3.js";
import { a as i18n, l as langPack, m as setInnerHTML, n as UNSUPPORTED_LANG_PACK_KEY, p as setDirection, r as _i18n, s as join, u as langPack_default } from "./langPack-BmdJGr44.js";
import { s as wrapUrl } from "./commonStateStorage-CW-poHCa.js";
import { A as mergeProps, C as createSignal, I as splitProps, L as untrack, M as onCleanup, N as onMount, R as useContext, _ as createMemo, d as batch, f as children, g as createEffect, h as createContext, i as For, j as on, m as createComputed, p as createComponent, s as Show, x as createRoot, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { n as deferredPromise } from "./cancellablePromise-bof--dnO.js";
import { t as __vitePreload } from "./preload-helper-B0NHKCoo.js";
import { t as tsNow } from "./tsNow-DUzGGNNb.js";
import { i as onAppWindowChange, n as getAppWindow, r as getOverlayRoot, t as bindActiveWindowListener } from "./appWindow-bo-KtJhy.js";
import { r as getCurrentAccount } from "./getCurrentAccount-D0KQFbZ6.js";
import { n as bindManagersToSession } from "./bindManagersToAccount-BL82O9H9.js";
import { t as cancelEvent } from "./cancelEvent-Cw8vYZHp.js";
import { D as hexaToHsla, E as hexToRgb, F as mixColorsPlusLighter, z as rgbaToHexa } from "./state-JPIG5PpJ.js";
import { t as clamp } from "./clamp-9UaNhw6N.js";
import { a as oneHourInSeconds, c as oneYearInSeconds, i as oneDayInSeconds, o as oneMonthInSeconds, s as oneWeekInSeconds } from "./constants-DLILUQ1j.js";
import { a as reconcile, n as createStore } from "./store-PwRn5fa3.js";
import { c as useAppState, s as useAppConfig } from "./contentSettings-DMhHR-0w.js";
import { i as isSensitive, n as getRestrictionReason, t as SENSITIVE_RESTRICTION_REASON } from "./restrictions-BZnhcj9D.js";
import { n as hotListen } from "./hotModule-aCRkP77w.js";
import { _ as use, a as classList, c as insert, f as setAttribute, g as template, h as style, m as spread, o as className, p as setStyleProperty, u as memo } from "./web-BPyQozky.js";
import { n as hotReloadGuard } from "./hotReloadGuardProvider-CHEsZRuG.js";
import { o as useAppSettings, r as appSettings, s as getDeepProperty, t as liteMode } from "./liteMode-DeLStZfQ.js";
import { a as makeMediaSize, n as mediaSizes } from "./mediaSizes-C1MTaleW.js";
import { t as overlayCounter } from "./overlayCounter-SPN4H9lb.js";
import { k as buildURLHash, u as wrapRichText } from "./renderer-L80wjxct.js";
import { n as isInDOM, t as sequentialDom } from "./sequentialDom-CRhA0kB2.js";
import { t as ripple } from "./ripple-D7hcIc_t.js";
import { t as classNames } from "./classNames-DxGDjmvw.js";
import { t as IconTsx } from "./iconTsx-B4lOk4A6.js";
import { t as getMiddleware } from "./middleware-D6HuIqPm.js";
import { n as animationIntersector } from "./animationIntersector-vAjH_7t1.js";
import { t as ListenerSetter } from "./listenerSetter-BER6qAXn.js";
import { t as RippleElement } from "./rippleElement-C-prm4MP.js";
import { n as attachHotClassName, t as attachClassName } from "./classname-DB9i2ReQ.js";
import { n as resolveElements } from "./dist-Fd6wPWkH.js";
import { n as putPreloader } from "./putPreloader-Bxq7N1RV.js";
import { t as isDocumentRTL } from "./isDocumentRTL-z8ksM2Dv.js";
import { n as simulateEvent } from "./dispatchEvent-CZVxCUd_.js";
import { t as buttonKeyDown } from "./buttonKeyDown-CqZzefS3.js";
import { i as simulateClickEvent, n as attachClickEvent, r as hasMouseMovedSinceDown } from "./clickEvent-COk4YpLP.js";
import { i as createPopup, n as PopupElement, r as addCancelButton } from "./indexTsx-v9mB9bAq.js";
import { n as createFocusTrap } from "./focusTrap-CKEkJXZv.js";
import { r as ensureButtonSemantics } from "./button-DpTvniRN.js";
import { t as labelControl } from "./labelControl-V4jClefJ.js";
import { t as parseEntities } from "./parseEntities-C5qsCJ5K.js";
import { t as WeakRefSet } from "./weakRefSet-BoUw0io0.js";
import { I as computeLockColor, a as wrapSticker, o as createMiddleware } from "./sticker-5twBOy1Y.js";
import { n as renderImageFromUrl, r as renderImageFromUrlPromise, t as blur } from "./blur-BvAbRYUw.js";
import { a as getPreviewURLFromBytes, n as getImageFromStrippedThumb, t as SetTransition } from "./singleTransition-UfxhQocw.js";
import { t as clearMediaElementSource } from "./clearMediaElementSource-CfCKljUR.js";
import { t as lottieLoader } from "./lottieLoader-B3FXw0K7.js";
import { t as assumeType } from "./assumeType-CmXHXz9E.js";
import { t as createVideo } from "./createVideo-Bh2Ba_A7.js";
import { o as isWebDocument } from "./mimeTypeMap-CnhjI2wm.js";
import { t as appDownloadManager } from "./appDownloadManager-ClHW2-Dl.js";
import { t as choosePhotoSize } from "./choosePhotoSize-VRMYg-1A.js";
import { t as replaceContent } from "./replaceContent-Bi6ru3li.js";
import { t as sortEntities } from "./sortEntities-9u5MR7Xq.js";
import { n as numberThousandSplitterForStars } from "./numberThousandSplitter-CGiPNwwW.js";
import { B as formatTime, P as formatDate, h as pinObjectURL, k as ONE_DAY, l as getCollectibleName } from "./index-B7axFZql.js";
import { t as OverlayClickHandler } from "./overlayClickHandler-CXjT0xwp.js";
import { F as MATH_MARKER_RE, G as formatNanoton, H as wrapPlainText, J as getPeerPhoto, K as nanotonToJsNumber, O as wrapSummaryRichText, R as wrapTextWithEntities, U as getPeerId, V as isOwnMessage, W as GRAM_CURRENCY_SYMBOL, X as flatten, h as getOrderedListItemNumber, l as getRichMessageMedia, n as canPollPeerStories, o as findRichMessageDocument, r as formatStarsAmount, t as PEER_STORIES_POLL_INTERVAL, u as flattenRichMessageContent } from "./canPollPeerStories-D3HoBvLX.js";
import { t as textToSvgURL } from "./textToSvgURL-BCXNzcR2.js";
import { n as createAppWindowIntersectionObserver, r as htmlToDocumentFragment, t as PreloaderRing } from "./preloaderRing-EqVZpID6.js";
import { n as wrapEmojiText } from "./wrapEmojiText-DT39R5Tj.js";
import { t as htmlToSpan } from "./htmlToSpan-D_IqA3Cl.js";
import { c as DurationType, l as formatDuration, r as wrapFormattedDuration, t as wrapCallDuration } from "./wrapDuration-BQgz9hDF.js";
import { t as require_BigInteger } from "./BigInteger-0a0WsWCs.js";
import { t as subscribeOn } from "./subscribeOn-DnCla7ws.js";
//#region src/helpers/dom/getInlineArrowKeys.ts
/**
* The arrow keys along the line: `next` points to the inline end — ArrowRight left to right,
* ArrowLeft right to left — and `previous` to the inline start. Pass `rtl` for a widget whose own
* direction may differ from the document's (a left-to-right island).
*/
function getInlineArrowKeys(rtl = isDocumentRTL()) {
	return rtl ? {
		next: "ArrowLeft",
		previous: "ArrowRight"
	} : {
		next: "ArrowRight",
		previous: "ArrowLeft"
	};
}
//#endregion
//#region src/helpers/dom/menuKeyboard.ts
function getEnabledMenuItems(menu) {
	return Array.from(menu.querySelectorAll(".btn-menu-item")).filter((item) => item.closest(".btn-menu") === menu).map((item) => item.querySelector("input[role=\"menuitemcheckbox\"], input[role=\"menuitemradio\"]") || item).filter((item) => {
		if (!item.getAttribute("role")?.startsWith("menuitem") || item.matches(":disabled, [aria-disabled=\"true\"]") || item.closest("[hidden], [inert], [aria-hidden=\"true\"], .hide")) return false;
		const style = item.ownerDocument.defaultView.getComputedStyle(item);
		return style.visibility !== "hidden" && style.display !== "none";
	});
}
/** The same activation path for popup menus and inline ButtonMenu consumers. */
function handleMenuKeyDown(event, menu = event.currentTarget) {
	if (!Modes.a11y || event.defaultPrevented || event.isComposing) return;
	const items = getEnabledMenuItems(menu);
	const current = event.target;
	const index = items.indexOf(current);
	if (index === -1) {
		if (current === menu && items.length && [
			"ArrowDown",
			"ArrowUp",
			"Home",
			"End"
		].includes(event.key)) {
			event.preventDefault();
			items[event.key === "ArrowUp" || event.key === "End" ? items.length - 1 : 0].focus();
		}
		return;
	}
	const activate = (item) => item.closest(".btn-menu-item").click();
	if (event.key === "Enter" || event.key === " ") {
		if (current.getAttribute("aria-haspopup") === "menu") return;
		event.preventDefault();
		if (!event.repeat) activate(current);
		return;
	}
	const radio = current;
	const inlineKeys = getInlineArrowKeys();
	if (radio.type === "radio" && (event.key === inlineKeys.previous || event.key === inlineKeys.next)) {
		const group = items.filter((item) => item.type === "radio" && item.name === radio.name);
		const next = group[(group.indexOf(current) + (event.key === inlineKeys.next ? 1 : group.length - 1)) % group.length];
		event.preventDefault();
		next.focus();
		activate(next);
		return;
	}
	let next;
	switch (event.key) {
		case "Home":
			next = items[0];
			break;
		case "End":
			next = items[items.length - 1];
			break;
		case "ArrowDown":
			next = items[(index + 1) % items.length];
			break;
		case "ArrowUp":
			next = items[(index + items.length - 1) % items.length];
			break;
		default:
			if (event.key.length !== 1 || event.ctrlKey || event.metaKey || event.altKey) return;
			next = [...items.slice(index + 1), ...items.slice(0, index + 1)].find((item) => (item.getAttribute("aria-label") || item.closest(".btn-menu-item").textContent).trim().toLocaleLowerCase().startsWith(event.key.toLocaleLowerCase()));
	}
	if (next) {
		event.preventDefault();
		next.focus();
	}
}
//#endregion
//#region src/helpers/contextMenuController.ts
var BTN_MENU_OPEN_CLASS_NAME = "has-open-btn-menu";
var ContextMenuController = class extends OverlayClickHandler {
	activateFocus(element, initialFocus) {
		if (!Modes.a11y) return;
		this.deactivateFocus(false);
		this.focusedMenu = element;
		this.focusTrap = createFocusTrap(element);
		this.realmDocument.addEventListener("keydown", this.onKeyDown, true);
		const items = getEnabledMenuItems(element);
		this.focusTrap.activate(this.menuOpenTarget, initialFocus || items[0] || element);
		this.realmWindow.requestAnimationFrame(() => this.realmWindow.requestAnimationFrame(() => {
			if (this.focusedMenu === element && (this.realmDocument.activeElement === element || !element.contains(this.realmDocument.activeElement))) (initialFocus || getEnabledMenuItems(element)[0] || element).focus();
		}));
	}
	deactivateFocus(restoreFocus = true) {
		if (!this.focusTrap) return;
		this.realmDocument.removeEventListener("keydown", this.onKeyDown, true);
		const trap = this.focusTrap;
		this.focusTrap = void 0;
		this.focusedMenu = void 0;
		trap.deactivate(restoreFocus);
	}
	closeFocusedAdditionalMenu() {
		const item = this.additionalMenus.find(({ element }) => element === this.focusedMenu);
		if (!item) return;
		this.closeAndRemoveMenu(item);
	}
	constructor() {
		super("menu", true);
		this.additionalMenus = [];
		this.onEscape = (event) => {
			if (this.focusedMenu && this.focusedMenu !== this.element) {
				cancelEvent(event);
				this.closeFocusedAdditionalMenu();
				return false;
			}
			return true;
		};
		this.onKeyDown = (e) => {
			const menu = this.focusedMenu;
			if (!menu || e.defaultPrevented || e.isComposing) return;
			if (e.key === "Tab") {
				this.close();
				return;
			}
			if (e.key === "Escape") {
				e.preventDefault();
				if (menu !== this.element) this.closeFocusedAdditionalMenu();
				else this.close();
				return;
			}
			if (e.key === getInlineArrowKeys().previous && menu !== this.element) {
				e.preventDefault();
				this.closeFocusedAdditionalMenu();
				return;
			}
			handleMenuKeyDown(e, menu);
		};
		this.keepOpenOnMouseMove = false;
		this.onMouseMove = (e) => {
			const allMenus = [...[...this.additionalMenus].reverse(), {
				triggerElement: void 0,
				level: 0,
				element: this.element,
				close: () => this.close()
			}];
			function isFartherThan(element, distance) {
				const { clientX, clientY } = e;
				const rect = element.getBoundingClientRect();
				const diffX = clientX >= rect.right ? clientX - rect.right : rect.left - clientX;
				const diffY = clientY >= rect.bottom ? clientY - rect.bottom : rect.top - clientY;
				return diffX >= distance || diffY >= distance;
			}
			for (const item of allMenus) {
				if (item.triggerElement && !isFartherThan(item.triggerElement, 40)) break;
				if (isFartherThan(item.element, item.level === 0 ? 100 : 40)) this.closeAndRemoveMenu(item);
				else break;
			}
		};
		onAppWindowChange(() => this.close());
		mediaSizes.addEventListener("resize", () => {
			if (this.element) this.close();
		});
	}
	isOpened() {
		return !!this.element;
	}
	/**
	* The next menu is opened away from the pointer — from a deep link rather than
	* a click — so the first mouse move must not close it: there is nothing for the
	* pointer to be moving away from yet.
	*/
	keepNextOpenOnMouseMove() {
		this.keepOpenOnMouseMove = true;
		clearTimeout(this.keepOpenTimeout);
		this.keepOpenTimeout = window.setTimeout(() => this.keepOpenOnMouseMove = false, 1e3);
	}
	closeAndRemoveMenu(item) {
		const idx = this.additionalMenus.indexOf(item);
		if (idx < 0) {
			item.close();
			return;
		}
		const focusedMenuWasClosed = this.additionalMenus.slice(idx).some(({ element }) => element === this.focusedMenu);
		const parentMenu = item.triggerElement?.closest(".btn-menu") || this.element;
		item.close();
		for (let i = idx + 1; i < this.additionalMenus.length; i++) this.additionalMenus[i].close();
		this.additionalMenus.splice(idx);
		if (focusedMenuWasClosed && parentMenu) this.activateFocus(parentMenu, item.triggerElement);
	}
	closeMenusByLevel(level) {
		const firstMenu = this.additionalMenus.find((menu) => menu.level >= level);
		if (firstMenu) this.closeAndRemoveMenu(firstMenu);
	}
	close(e) {
		if (e && e.target.classList.contains("btn-menu")) return;
		if (this.element) {
			this.element.classList.remove("active");
			this.element.ownerDocument.documentElement.classList.remove(BTN_MENU_OPEN_CLASS_NAME);
			document.documentElement.classList.remove(BTN_MENU_OPEN_CLASS_NAME);
			this.menuOpenTarget?.classList.remove("menu-open");
			this.menuOpenTarget = void 0;
			this.deactivateFocus();
			if (this.element.classList.contains("night")) {
				const element = this.element;
				setTimeout(() => {
					if (element.classList.contains("active")) return;
					element.classList.remove("night");
				}, 400);
			}
		}
		this.additionalMenus.forEach((menu) => {
			menu.close();
		});
		this.additionalMenus = [];
		super.close();
		if (!IS_TOUCH_SUPPORTED) this.realmWindow.removeEventListener("mousemove", this.onMouseMove);
	}
	shouldApplyNight(triggerElement) {
		if (overlayCounter.isDarkOverlayActive) return true;
		const nightAncestor = triggerElement && findUpClassName(triggerElement, "night");
		return !!nightAncestor && nightAncestor !== document.documentElement;
	}
	openBtnMenu(element, onClose, triggerElement, activateFocus = !IS_TOUCH_SUPPORTED || !!triggerElement?.matches(":focus-visible")) {
		if (this.shouldApplyNight(triggerElement)) element.classList.add("night");
		super.open(element);
		this.element.classList.add("active", "was-open");
		this.element.ownerDocument.documentElement.classList.add(BTN_MENU_OPEN_CLASS_NAME);
		this.menuOpenTarget = triggerElement ?? this.element.parentElement;
		this.menuOpenTarget?.classList.add("menu-open");
		if (onClose) this.addEventListener("toggle", onClose, { once: true });
		const keepOpen = this.keepOpenOnMouseMove;
		this.keepOpenOnMouseMove = false;
		clearTimeout(this.keepOpenTimeout);
		if (!IS_TOUCH_SUPPORTED && !keepOpen) this.realmWindow.addEventListener("mousemove", this.onMouseMove);
		if (activateFocus) this.activateFocus(element);
	}
	addAdditionalMenu(element, triggerElement, level, onClose, activateFocus = false) {
		if (!this.element) return;
		this.closeMenusByLevel(level);
		triggerElement.setAttribute("aria-expanded", "true");
		this.additionalMenus.push({
			element,
			triggerElement,
			level,
			close: () => {
				element.classList.remove("active");
				pause(400).then(() => element.remove());
				triggerElement.setAttribute("aria-expanded", "false");
				onClose?.();
			}
		});
		if (this.shouldApplyNight(triggerElement)) element.classList.add("night");
		element.classList.add("active", "was-open");
		if (onClose) this.addEventListener("toggle", onClose, { once: true });
		if (activateFocus) this.activateFocus(element);
	}
};
var contextMenuController = new ContextMenuController();
//#endregion
//#region src/components/checkboxField.ts
var CheckboxField = class {
	constructor(options = {}) {
		const label = this.label = document.createElement("span");
		label.classList.add("checkbox-field");
		if (options.restriction && !options.toggle) label.classList.add("checkbox-field-restriction");
		if (options.round) label.classList.add("checkbox-field-round");
		if (options.color && options.color !== "secondary") label.classList.add("checkbox-color-" + options.color);
		if (options.disabled) this.toggleDisability(true);
		this.listenerSetter = options.listenerSetter;
		const input = this.input = document.createElement("input");
		input.classList.add("checkbox-field-input");
		input.type = options.asRadio ? "radio" : "checkbox";
		if (options.name) input[options.asRadio ? "name" : "id"] = "input-" + options.name;
		if (options.checked) input.checked = true;
		if (options.stateKey) {
			let loaded = options.checked !== void 0;
			const onChange = () => {
				if (!loaded) return;
				let value;
				if (options.stateValues) value = options.stateValues[input.checked ? 1 : 0];
				else {
					value = input.checked;
					if (options.stateValueReverse) value = !value;
				}
				rootScope.managers.appStateManager.setByKey(options.stateKey, value);
			};
			!loaded && apiManagerProxy.getState().then((state) => {
				loaded = true;
				const stateValue = getDeepProperty(state, options.stateKey);
				let checked;
				if (options.stateValues) checked = options.stateValues.indexOf(stateValue) === 1;
				else {
					checked = stateValue;
					if (options.stateValueReverse) checked = !checked;
				}
				this.setValueSilently(checked);
			});
			if (options.listenerSetter) options.listenerSetter.add(input)("change", onChange);
			else input.addEventListener("change", onChange);
		}
		label.append(input);
		if (options.toggle) {
			label.classList.add("checkbox-field-toggle");
			if (options.restriction) label.classList.add("checkbox-field-toggle-restriction");
			const toggle = document.createElement("div");
			toggle.classList.add("checkbox-toggle");
			const circle = this.toggleCircle = document.createElement("div");
			circle.classList.add("checkbox-toggle-circle");
			toggle.append(circle);
			label.append(toggle);
			this.setToggleLockIcon(options.toggleLockIcon);
		} else {
			const box = document.createElement("div");
			box.classList.add("checkbox-box");
			const checkSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
			checkSvg.classList.add("checkbox-box-check");
			checkSvg.setAttributeNS(null, "viewBox", "0 0 24 24");
			const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
			use.setAttributeNS(null, "href", "#check");
			use.setAttributeNS(null, "x", "-1");
			checkSvg.append(use);
			const bg = document.createElement("div");
			bg.classList.add("checkbox-box-background");
			const border = document.createElement("div");
			border.classList.add("checkbox-box-border");
			box.append(border, bg, checkSvg);
			label.append(box);
		}
	}
	get checked() {
		return this.input.checked;
	}
	set checked(checked) {
		this.setValueSilently(checked);
		simulateEvent(this.input, "change");
	}
	/** Puts a lock inside the toggle's circle, or clears it when no icon is given. Toggle-only. */
	setToggleLockIcon(icon) {
		const circle = this.toggleCircle;
		if (!circle) return;
		circle.classList.toggle("with-lock", !!icon);
		circle.replaceChildren(...icon ? [Icon(icon)] : []);
	}
	setValueSilently(checked) {
		this.input.checked = checked;
	}
	isDisabled() {
		return this.label.classList.contains("checkbox-disabled");
	}
	toggleDisability(disable) {
		this.label.classList.toggle("checkbox-disabled", disable);
		this.input.disabled = disable;
		return () => this.toggleDisability(!disable);
	}
};
//#endregion
//#region src/components/radioForm.ts
function RadioForm(radios, onChange) {
	const form = document.createElement("form");
	radios.forEach((r) => {
		const { container, input } = r;
		form.append(container);
		input.addEventListener("change", (e) => {
			if (input.checked) onChange(input.value, e);
		});
	});
	return form;
}
//#endregion
//#region src/helpers/dom/renderMediaWithFadeIn.ts
function renderMediaWithFadeIn({ container, media, url, needFadeIn, aspecter = container, thumbImage, fadeInElement = media, onRender, onRenderFinish, useRenderCache }) {
	if (needFadeIn) fadeInElement.classList.add("fade-in");
	return renderImageFromUrlPromise(media, url, useRenderCache).then(() => {
		return sequentialDom.mutateElement(container, () => {
			aspecter?.append(media);
			if (needFadeIn) {
				onRender?.();
				fadeInElement.addEventListener("animationend", () => {
					sequentialDom.mutate(() => {
						fadeInElement.classList.remove("fade-in");
						thumbImage?.remove();
						container.classList.add("no-background");
						onRenderFinish?.();
					});
				}, { once: true });
			} else {
				thumbImage?.remove();
				container.classList.add("no-background");
				onRender?.();
				onRenderFinish?.();
			}
		});
	});
}
//#endregion
//#region src/components/preloader.ts
var TRANSITION_TIME = 200;
var ProgressivePreloader = class {
	constructor(options) {
		this.tempId = 0;
		this.detached = true;
		this.promise = null;
		this.isUpload = false;
		this.cancelable = true;
		this.streamable = false;
		this.rtmp = false;
		this.tryAgainOnFail = true;
		this.attachMethod = "append";
		this.onClick = (e) => {
			if (e) cancelEvent(e);
			if (this.preloader.classList.contains("manual")) this.loadFunc?.(e);
			else this.promise?.cancel?.();
		};
		if (options) safeAssign(this, options);
		if (this.isUpload) this.tryAgainOnFail = false;
	}
	constructContainer(options = {}) {
		if (!this.preloader) {
			this.preloader = document.createElement("div");
			if (this.rtmp) this.preloader.classList.add("preloader-container-rtmp");
			else this.preloader.classList.add("preloader-container");
			if (options.color) this.preloader.classList.add("preloader-" + options.color);
			if (options.bold) this.preloader.classList.add("preloader-bold");
			if (this.streamable) this.preloader.classList.add("preloader-streamable");
		}
	}
	constructDownloadIcon() {
		this.constructContainer();
	}
	construct() {
		this.construct = null;
		this.constructContainer();
		if (this.rtmp) this.preloader.innerHTML = `
      <div class="loading-wrap is-loading">
        <div class="loading"></div>
        <div class="loading_bezel-wrap">
          <div class="loading"></div>
        </div>
      </div>`;
		else if (this.cancelable && !this.streamable) {
			this.ring = new PreloaderRing(this.preloader);
			attachClickEvent(this.preloader, this.onClick);
			return;
		} else this.preloader.innerHTML = `
      <div class="you-spin-me-round">
      <svg xmlns="http://www.w3.org/2000/svg" class="preloader-circular" viewBox="${this.streamable ? "25 25 50 50" : "27 27 54 54"}">
      <circle class="preloader-path-new" cx="${this.streamable ? "50" : "54"}" cy="${this.streamable ? "50" : "54"}" r="${this.streamable ? 19 : 24}" fill="none" stroke-miterlimit="10"/>
      </svg>
      </div>`;
		if (this.streamable) this.totalLength = 118.61124420166016;
		else this.totalLength = 149.82473754882812;
		if (this.cancelable) this.preloader.innerHTML += `
      <svg xmlns="http://www.w3.org/2000/svg" class="preloader-close" viewBox="0 0 24 24">
        <g fill="none" fill-rule="evenodd">
          <polygon points="0 0 24 0 24 24 0 24"/>
          <path fill="#000" fill-rule="nonzero" d="M5.20970461,5.38710056 L5.29289322,5.29289322 C5.65337718,4.93240926 6.22060824,4.90467972 6.61289944,5.20970461 L6.70710678,5.29289322 L12,10.585 L17.2928932,5.29289322 C17.6834175,4.90236893 18.3165825,4.90236893 18.7071068,5.29289322 C19.0976311,5.68341751 19.0976311,6.31658249 18.7071068,6.70710678 L13.415,12 L18.7071068,17.2928932 C19.0675907,17.6533772 19.0953203,18.2206082 18.7902954,18.6128994 L18.7071068,18.7071068 C18.3466228,19.0675907 17.7793918,19.0953203 17.3871006,18.7902954 L17.2928932,18.7071068 L12,13.415 L6.70710678,18.7071068 C6.31658249,19.0976311 5.68341751,19.0976311 5.29289322,18.7071068 C4.90236893,18.3165825 4.90236893,17.6834175 5.29289322,17.2928932 L10.585,12 L5.29289322,6.70710678 C4.93240926,6.34662282 4.90467972,5.77939176 5.20970461,5.38710056 L5.29289322,5.29289322 L5.20970461,5.38710056 Z"/>
        </g>
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" class="preloader-download" viewBox="0 0 24 24">
        <g fill="none" fill-rule="evenodd">
          <polygon points="0 0 24 0 24 24 0 24"/>
          <path fill="#000" fill-rule="nonzero" d="M5,19 L19,19 C19.5522847,19 20,19.4477153 20,20 C20,20.5128358 19.6139598,20.9355072 19.1166211,20.9932723 L19,21 L5,21 C4.44771525,21 4,20.5522847 4,20 C4,19.4871642 4.38604019,19.0644928 4.88337887,19.0067277 L5,19 L19,19 L5,19 Z M11.8833789,3.00672773 L12,3 C12.5128358,3 12.9355072,3.38604019 12.9932723,3.88337887 L13,4 L13,13.585 L16.2928932,10.2928932 C16.6533772,9.93240926 17.2206082,9.90467972 17.6128994,10.2097046 L17.7071068,10.2928932 C18.0675907,10.6533772 18.0953203,11.2206082 17.7902954,11.6128994 L17.7071068,11.7071068 L12.7071068,16.7071068 C12.3466228,17.0675907 11.7793918,17.0953203 11.3871006,16.7902954 L11.2928932,16.7071068 L6.29289322,11.7071068 C5.90236893,11.3165825 5.90236893,10.6834175 6.29289322,10.2928932 C6.65337718,9.93240926 7.22060824,9.90467972 7.61289944,10.2097046 L7.70710678,10.2928932 L11,13.585 L11,4 C11,3.48716416 11.3860402,3.06449284 11.8833789,3.00672773 L12,3 L11.8833789,3.00672773 Z"/>
        </g>
      </svg>`;
		else this.preloader.classList.add("preloader-swing");
		this.circle = this.preloader.firstElementChild.firstElementChild.firstElementChild;
		if (this.cancelable) attachClickEvent(this.preloader, this.onClick);
	}
	/**
	* Resolves once the indicator has caught up with the end of the transfer: the ring's line comes round
	* to the end first. For a place that hides it as soon as the file is in (a file's icon, an audio's
	* button) to wait for, as the media's own detach does.
	*/
	whenCaughtUp() {
		return this.ring ? this.ring.finish() : Promise.resolve();
	}
	setDownloadFunction(func) {
		this.loadFunc = func;
	}
	setManual() {
		this.preloader.classList.add("manual");
		this.ring?.setManual(true, this.isShown());
		this.setProgress(0);
	}
	isShown() {
		return isInDOM(this.preloader) && this.preloader.classList.contains("is-visible");
	}
	attachPromise(promise) {
		if (this.isUpload && this.promise) return;
		this.promise = promise;
		this.ring?.begin();
		const tempId = --this.tempId;
		const startTime = Date.now();
		const onEnd = (err) => {
			promise.notify = promise.notifyAll = null;
			if (tempId !== this.tempId) return;
			const elapsedTime = Date.now() - startTime;
			if (!err && this.cancelable) {
				this.setProgress(100);
				const delay = TRANSITION_TIME * .75;
				if (elapsedTime < delay && !this.ring?.isChanging()) this.detach();
				else if (this.ring) this.ring.finish().then(() => {
					if (tempId === this.tempId) this.detach();
				});
				else setTimeout(() => {
					if (tempId === this.tempId) this.detach();
				}, delay);
			} else if (this.tryAgainOnFail) {
				this.attach(this.preloader.parentElement);
				fastRaf(() => {
					this.setManual();
				});
			} else this.detach();
			this.promise = promise = null;
		};
		promise.then(() => onEnd(null)).catch((err) => onEnd(err));
		promise.addNotifyListener?.((details) => {
			if (tempId !== this.tempId) return;
			const percents = details.done / details.total * 100;
			this.setProgress(percents);
		});
	}
	attach(elem, reset = false, promise, transitionDuration = TRANSITION_TIME) {
		if (!this.detached && (!this.preloader || !this.preloader.classList.contains("manual"))) return;
		this.construct?.();
		if (this.preloader.parentElement && this.preloader.classList.contains("manual") && (!this.ring || promise)) {
			this.preloader.classList.remove("manual");
			this.ring?.setManual(false, this.isShown());
		}
		this.detached = false;
		if (promise) this.attachPromise(promise);
		let useRafs = 0;
		if (this.detached || this.preloader.parentElement !== elem) {
			useRafs = isInDOM(this.preloader) ? 1 : 2;
			if (this.preloader.parentElement !== elem) elem[this.attachMethod](this.preloader);
		}
		SetTransition({
			element: this.preloader,
			className: "is-visible",
			forwards: true,
			duration: transitionDuration,
			useRafs
		});
		this.ring?.onAttach();
		if (this.cancelable && reset) this.setProgress(0);
	}
	detach() {
		if (this.detached) return;
		this.detached = true;
		if (this.preloader?.parentElement) SetTransition({
			element: this.preloader,
			className: "is-visible",
			forwards: false,
			duration: TRANSITION_TIME,
			onTransitionEnd: () => {
				this.preloader.remove();
				this.ring?.halt();
			},
			useRafs: 1
		});
	}
	setProgress(percents) {
		if (this.ring) {
			this.ring.setTarget(percents / 100);
			return;
		}
		if (!this.totalLength && !isInDOM(this.circle)) return;
		if (percents === 0) {
			this.circle.style.strokeDasharray = "";
			return;
		}
		try {
			this.totalLength || (this.totalLength = this.circle.getTotalLength());
			this.circle.style.strokeDasharray = "" + Math.max(5, percents / 100 * this.totalLength) + ", " + this.totalLength;
		} catch (err) {}
	}
};
//#endregion
//#region src/helpers/getStrippedThumbIfNeeded.ts
function getMediaThumbIfNeeded({ photo, cacheContext, useBlur, ignoreCache, onlyStripped }) {
	const isVideo = ["video", "gif"].includes(photo.type);
	if (!cacheContext.downloaded || isVideo || ignoreCache) {
		if (photo._ === "document" && cacheContext.downloaded && !ignoreCache && (!isVideo || cacheContext.type !== "")) return null;
		const sizes = photo.sizes || photo.thumbs;
		const length = sizes?.length;
		if (!length) return null;
		let currentSizeIndex = -1;
		if (!onlyStripped) for (let i = length - 1; i >= 0; --i) {
			const size = sizes[i];
			if (size.type === cacheContext.type) currentSizeIndex = i;
			else if (currentSizeIndex) {
				const cacheContext = apiManagerProxy.getCacheContext(photo, size.type);
				if (cacheContext.downloaded) return getImageFromStrippedThumb(photo, size, false, cacheContext.url);
			}
		}
		const thumb = sizes.find((size) => size._ === "photoStrippedSize");
		if (thumb && "bytes" in thumb) return getImageFromStrippedThumb(photo, thumb, useBlur);
	}
	return null;
}
function setAttachmentSize({ photo, element, boxWidth, boxHeight, noZoom = true, message, pushDocumentSize, photoSize, size, canHaveVideoPlayer, noMinSize }) {
	const _isWebDocument = isWebDocument(photo);
	if (!photoSize && !size) photoSize = choosePhotoSize(photo, boxWidth, boxHeight, void 0, pushDocumentSize);
	const isDocument = photo?._ === "document";
	if (size) {} else if (isDocument || _isWebDocument) size = makeMediaSize(photo.w || photoSize.w || 512, photo.h || photoSize.h || 512);
	else size = makeMediaSize(photoSize.w || 100, photoSize.h || 100);
	let boxSize = makeMediaSize(boxWidth, boxHeight);
	boxSize = size = size.aspect(boxSize, noZoom);
	let isFit = true;
	if (!noMinSize && (!isDocument || ["video", "gif"].includes(photo.type) || _isWebDocument)) {
		const minSideSize = 200;
		if (boxSize.width < minSideSize && boxSize.height < minSideSize) boxSize = size = size.aspectCovered(makeMediaSize(minSideSize, minSideSize));
		if (message && (message.message || message.factcheck || message.reply_to_mid || message.media.webpage || message.replies && message.replies.pFlags.comments && message.replies.channel_id.toChatId() !== 777)) {
			if (boxSize.width < 320) {
				boxSize = makeMediaSize(320, boxSize.height);
				isFit = false;
			}
		}
		const minWidth = photo?.type === "video" && canHaveVideoPlayer ? 368 : 120;
		if (boxSize.width < minWidth && message) {
			boxSize = makeMediaSize(minWidth, boxSize.height);
			isFit = false;
		}
	}
	element.style.width = boxSize.width + "px";
	element.style.height = boxSize.height + "px";
	return {
		photoSize,
		size,
		isFit
	};
}
//#endregion
//#region src/components/wrappers/photo.ts
var photo_exports = /* @__PURE__ */ __exportAll({ default: () => wrapPhoto });
async function wrapPhoto({ photo, message, container, boxWidth, boxHeight, fillBox, withTail, isOut, lazyLoadQueue, middleware, size, withoutPreloader, loadPromises, autoDownloadSize, noBlur, noThumb, noFadeIn, blurAfter, managers = rootScope.managers, processUrl, fadeInElement, onRender, onRenderFinish, useBlur, useRenderCache, canHaveVideoPlayer, uploadingFileName }) {
	const ret = {
		loadPromises: {
			thumb: Promise.resolve(),
			full: Promise.resolve()
		},
		images: {
			thumb: null,
			full: null
		},
		preloader: null,
		aspecter: null
	};
	if (!container) {
		withoutPreloader = true;
		lazyLoadQueue = void 0;
	}
	const isWebFile = isWebFileLocation(photo);
	const isDocument = photo._ === "document";
	const isImageFromDocument = isDocument && photo.mime_type.startsWith("image/") && !size;
	const isWebDoc = isWebDocument(photo);
	if (!(photo.sizes || photo.thumbs) && !isWebDoc && !isImageFromDocument && !isWebFile) {
		if (boxWidth && boxHeight && !size && isDocument) setAttachmentSize({
			photo,
			element: container,
			boxWidth,
			boxHeight,
			message,
			canHaveVideoPlayer
		});
		return ret;
	}
	let noAutoDownload = autoDownloadSize === 0;
	if (!size) {
		if (boxWidth === void 0) boxWidth = mediaSizes.active.regular.width;
		if (boxHeight === void 0) boxHeight = mediaSizes.active.regular.height;
	}
	container && container.classList.add("media-container");
	let aspecter = container;
	let isFit = true;
	let loadThumbPromise = Promise.resolve();
	let thumbImage;
	let cacheContext;
	if (boxWidth && boxHeight && !size && !isWebFile && container) {
		const set = setAttachmentSize({
			photo,
			element: container,
			boxWidth,
			boxHeight,
			message,
			photoSize: isImageFromDocument ? {
				_: "photoSize",
				w: photo.w,
				h: photo.h,
				size: photo.size,
				type: ""
			} : void 0,
			canHaveVideoPlayer
		});
		size = set.photoSize;
		isFit = set.isFit;
		if (fillBox) {
			container.style.width = boxWidth + "px";
			container.style.height = boxHeight + "px";
			isFit = false;
		}
		cacheContext = apiManagerProxy.getCacheContext(photo, size.type);
		if (!isFit && !isWebDoc) {
			aspecter = document.createElement("div");
			aspecter.classList.add("media-container-aspecter");
			aspecter.style.width = set.size.width + "px";
			aspecter.style.height = set.size.height + "px";
			const gotThumb = getMediaThumbIfNeeded({
				photo,
				cacheContext,
				useBlur: useBlur !== void 0 ? useBlur : !noBlur,
				ignoreCache: true,
				onlyStripped: true
			});
			if (gotThumb) {
				loadThumbPromise = gotThumb.loadPromise;
				const thumbImage = gotThumb.image;
				thumbImage.classList.add("media-photo");
				thumbImage.setAttribute("alt", "");
				container.append(thumbImage);
			} else {
				const thumbImage = (await wrapPhoto({
					container,
					message,
					photo,
					boxWidth: 0,
					boxHeight: 0,
					size,
					lazyLoadQueue,
					isOut,
					loadPromises,
					middleware,
					withoutPreloader: true,
					withTail,
					autoDownloadSize,
					noBlur,
					noThumb: true,
					blurAfter: true,
					managers
				})).images.full;
				thumbImage.classList.add("media-photo", "thumbnail");
				thumbImage.setAttribute("alt", "");
			}
			container.classList.add("media-container-fitted");
			container.append(aspecter);
		}
	} else {
		if (!size && !isWebFile) size = choosePhotoSize(photo, boxWidth, boxHeight, true);
		cacheContext = apiManagerProxy.getCacheContext(photo, size?.type);
	}
	if (!noThumb && !isWebDoc && !isWebFile && aspecter) {
		const gotThumb = getMediaThumbIfNeeded({
			photo,
			cacheContext,
			useBlur: useBlur !== void 0 ? useBlur : !noBlur
		});
		if (gotThumb) {
			loadThumbPromise = Promise.all([loadThumbPromise, gotThumb.loadPromise]);
			ret.loadPromises.thumb = ret.loadPromises.full = loadThumbPromise;
			thumbImage = ret.images.thumb = gotThumb.image;
			thumbImage.classList.add("media-photo");
			thumbImage.setAttribute("alt", "");
			aspecter.append(thumbImage);
		}
	}
	ret.aspecter = aspecter;
	if (size?._ === "photoSizeEmpty" && isDocument || size?.bytes) return ret;
	let media;
	if (size?._ === "videoSize") {
		media = ret.images.full = createVideo({ middleware });
		media.autoplay = true;
		media.loop = true;
		media.muted = true;
		media.classList.add("media-photo");
	} else {
		media = ret.images.full = new Image();
		media.classList.add("media-photo");
		media.setAttribute("alt", "");
	}
	const needFadeIn = (thumbImage || !cacheContext.downloaded) && liteMode.isAvailable("animations") && !noFadeIn;
	let preloader;
	uploadingFileName ?? (uploadingFileName = message?.uploadingFileName?.[0]);
	if (!withoutPreloader) {
		if (!cacheContext.downloaded || uploadingFileName) preloader = new ProgressivePreloader({
			attachMethod: "prepend",
			isUpload: !!uploadingFileName
		});
		if (uploadingFileName) {
			preloader.attachPromise(appDownloadManager.getUpload(uploadingFileName));
			preloader.attach(container);
			noAutoDownload = void 0;
		}
	}
	const getDownloadPromise = () => {
		const haveToDownload = isImageFromDocument && !size;
		return appDownloadManager.downloadMediaURL({
			media: photo,
			thumb: size,
			queueId: lazyLoadQueue && lazyLoadQueue.queueId,
			onlyCache: haveToDownload ? void 0 : noAutoDownload
		});
	};
	const renderOnLoad = (url) => {
		return renderMediaWithFadeIn({
			container,
			media,
			url,
			needFadeIn,
			aspecter,
			thumbImage,
			fadeInElement,
			onRender,
			onRenderFinish,
			useRenderCache
		});
	};
	const onLoad = async (url) => {
		if (middleware && !middleware()) return;
		if (processUrl) url = await processUrl(url);
		if (blurAfter) {
			const result = blur(url, 10, 2, 48);
			return result.promise.then(() => {
				return renderOnLoad(result.canvas.toDataURL());
			});
		}
		return renderOnLoad(url);
	};
	let loadPromise;
	const canAttachPreloader = !isWebFile && size.w >= 150 && size.h >= 150 || noAutoDownload;
	const load = async () => {
		if (noAutoDownload && !withoutPreloader && preloader) {
			preloader.construct();
			preloader.setManual();
		}
		const promise = getDownloadPromise();
		const cacheContext = apiManagerProxy.getCacheContext(photo, size?.type);
		if (preloader && !cacheContext.downloaded && !withoutPreloader && canAttachPreloader) preloader.attach(container, false, promise);
		noAutoDownload = void 0;
		const renderPromise = promise.then(onLoad);
		renderPromise.catch(noop);
		return {
			download: promise,
			render: renderPromise
		};
	};
	if (preloader) preloader.setDownloadFunction(load);
	if (cacheContext.downloaded) loadThumbPromise = loadPromise = (await load()).render;
	else if (!lazyLoadQueue) loadPromise = (await load()).render;
	else lazyLoadQueue.push({
		div: container,
		load: () => load().then(({ download }) => download)
	});
	if (loadPromises && loadThumbPromise) loadPromises.push(loadThumbPromise);
	ret.loadPromises.thumb = loadThumbPromise;
	ret.loadPromises.full = loadPromise || Promise.resolve();
	ret.preloader = preloader;
	return ret;
}
//#endregion
//#region src/components/wrappers/attachBotIcon.ts
var addedThemeListener = false;
function wrapAttachBotIcon({ doc, element: iconElement, size, textColor, strokeWidth }) {
	iconElement.classList.add("is-external");
	if (!addedThemeListener) {
		addedThemeListener = true;
		rootScope.addEventListener("theme_changed", () => {
			document.querySelectorAll(".is-external").forEach((element) => {
				const set = element.set;
				set?.(true);
			});
		});
	}
	const set = async (manual) => {
		const svg = iconElement.svg;
		const color = customProperties.getProperty(textColor());
		svg.querySelectorAll("path").forEach((path) => {
			path.setAttributeNS(null, "fill", color);
			path.style.stroke = color;
			path.style.strokeWidth = strokeWidth() + "px";
		});
		const url = await textToSvgURL(svg.outerHTML);
		if (!manual) return url;
		iconElement.image.src = url;
	};
	const originalPromise = wrapPhoto({
		container: iconElement,
		photo: doc,
		boxWidth: size,
		boxHeight: size,
		withoutPreloader: true,
		noFadeIn: true,
		noBlur: true,
		processUrl: async (url) => {
			const text = await (await fetch(url)).text();
			iconElement.svg = new DOMParser().parseFromString(text, "image/svg+xml").firstElementChild;
			iconElement.set = set;
			return set();
		}
	});
	return originalPromise.then(async (ret) => {
		iconElement.style.width = iconElement.style.height = "";
		iconElement.image = ret.images.full;
		await ret.loadPromises.thumb;
		return originalPromise;
	});
}
//#endregion
//#region src/lib/richTextProcessor/wrapAbbreviation.ts
function wrapAbbreviation(str, onlyFirst) {
	const { text, entities } = getAbbreviation(str, onlyFirst);
	return wrapEmojiText(text, void 0, entities);
}
//#endregion
//#region src/components/wrappers/getPeerInitials.ts
function getPeerInitials(peer) {
	let str = "";
	if (peer) str = peer.title ?? [peer.first_name, peer.last_name].filter(Boolean).join(" ");
	return wrapAbbreviation(str);
}
//#endregion
//#region src/config/currencies.ts
var Currencies = {
	"AED": {
		"code": "AED",
		"title": "United Arab Emirates Dirham",
		"symbol": "AED",
		"native": "د.إ.‏",
		"thousands_sep": ",",
		"decimal_sep": ".",
		"symbol_left": true,
		"space_between": true,
		"drop_zeros": false,
		"exp": 2,
		"min_amount": "367",
		"max_amount": "3673020"
	},
	"AFN": {
		"code": "AFN",
		"title": "Afghan Afghani",
		"symbol": "AFN",
		"native": "؋",
		"thousands_sep": ",",
		"decimal_sep": ".",
		"symbol_left": true,
		"space_between": false,
		"drop_zeros": false,
		"exp": 2,
		"min_amount": "7092",
		"max_amount": "70919694"
	},
	"ALL": {
		"code": "ALL",
		"title": "Albanian Lek",
		"symbol": "ALL",
		"native": "Lek",
		"thousands_sep": ".",
		"decimal_sep": ",",
		"symbol_left": false,
		"space_between": false,
		"drop_zeros": false,
		"exp": 2,
		"min_amount": "9249",
		"max_amount": "92485282"
	},
	"AMD": {
		"code": "AMD",
		"title": "Armenian Dram",
		"symbol": "AMD",
		"native": "դր.",
		"thousands_sep": ",",
		"decimal_sep": ".",
		"symbol_left": false,
		"space_between": true,
		"drop_zeros": false,
		"exp": 2,
		"min_amount": "38785",
		"max_amount": "387850064"
	},
	"ARS": {
		"code": "ARS",
		"title": "Argentine Peso",
		"symbol": "ARS",
		"native": "$",
		"thousands_sep": ".",
		"decimal_sep": ",",
		"symbol_left": true,
		"space_between": true,
		"drop_zeros": false,
		"exp": 2,
		"min_amount": "93178",
		"max_amount": "931784401"
	},
	"AUD": {
		"code": "AUD",
		"title": "Australian Dollar",
		"symbol": "AU$",
		"native": "$",
		"thousands_sep": ",",
		"decimal_sep": ".",
		"symbol_left": true,
		"space_between": false,
		"drop_zeros": false,
		"exp": 2,
		"min_amount": "153",
		"max_amount": "1534530"
	},
	"AZN": {
		"code": "AZN",
		"title": "Azerbaijani Manat",
		"symbol": "AZN",
		"native": "ман.",
		"thousands_sep": " ",
		"decimal_sep": ",",
		"symbol_left": false,
		"space_between": true,
		"drop_zeros": false,
		"exp": 2,
		"min_amount": "170",
		"max_amount": "1700517"
	},
	"BAM": {
		"code": "BAM",
		"title": "Bosnia & Herzegovina Convertible Mark",
		"symbol": "BAM",
		"native": "KM",
		"thousands_sep": ".",
		"decimal_sep": ",",
		"symbol_left": false,
		"space_between": true,
		"drop_zeros": false,
		"exp": 2,
		"min_amount": "181",
		"max_amount": "1806101"
	},
	"BDT": {
		"code": "BDT",
		"title": "Bangladeshi Taka",
		"symbol": "BDT",
		"native": "৳",
		"thousands_sep": ",",
		"decimal_sep": ".",
		"symbol_left": true,
		"space_between": true,
		"drop_zeros": false,
		"exp": 2,
		"min_amount": "11744",
		"max_amount": "117439546"
	},
	"BGN": {
		"code": "BGN",
		"title": "Bulgarian Lev",
		"symbol": "BGN",
		"native": "лв.",
		"thousands_sep": " ",
		"decimal_sep": ",",
		"symbol_left": false,
		"space_between": true,
		"drop_zeros": false,
		"exp": 2,
		"min_amount": "181",
		"max_amount": "1808709"
	},
	"BND": {
		"code": "BND",
		"title": "Brunei Dollar",
		"symbol": "BND",
		"native": "$",
		"thousands_sep": ".",
		"decimal_sep": ",",
		"symbol_left": true,
		"space_between": false,
		"drop_zeros": false,
		"exp": 2,
		"min_amount": "133",
		"max_amount": "1330735"
	},
	"BOB": {
		"code": "BOB",
		"title": "Bolivian Boliviano",
		"symbol": "BOB",
		"native": "Bs",
		"thousands_sep": ".",
		"decimal_sep": ",",
		"symbol_left": true,
		"space_between": true,
		"drop_zeros": false,
		"exp": 2,
		"min_amount": "691",
		"max_amount": "6906359"
	},
	"BRL": {
		"code": "BRL",
		"title": "Brazilian Real",
		"symbol": "R$",
		"native": "R$",
		"thousands_sep": ".",
		"decimal_sep": ",",
		"symbol_left": true,
		"space_between": true,
		"drop_zeros": false,
		"exp": 2,
		"min_amount": "577",
		"max_amount": "5769050"
	},
	"BYN": {
		"code": "BYN",
		"title": "Belarusian ruble",
		"symbol": "BYN",
		"native": "BYN",
		"thousands_sep": " ",
		"decimal_sep": ",",
		"symbol_left": false,
		"space_between": true,
		"drop_zeros": false,
		"exp": 2,
		"min_amount": "327",
		"max_amount": "3270247"
	},
	"CAD": {
		"code": "CAD",
		"title": "Canadian Dollar",
		"symbol": "CA$",
		"native": "$",
		"thousands_sep": ",",
		"decimal_sep": ".",
		"symbol_left": true,
		"space_between": false,
		"drop_zeros": false,
		"exp": 2,
		"min_amount": "139",
		"max_amount": "1387645"
	},
	"CHF": {
		"code": "CHF",
		"title": "Swiss Franc",
		"symbol": "CHF",
		"native": "CHF",
		"thousands_sep": "'",
		"decimal_sep": ".",
		"symbol_left": false,
		"space_between": true,
		"drop_zeros": false,
		"exp": 2,
		"min_amount": "87",
		"max_amount": "870429"
	},
	"CLP": {
		"code": "CLP",
		"title": "Chilean Peso",
		"symbol": "CLP",
		"native": "$",
		"thousands_sep": ".",
		"decimal_sep": ",",
		"symbol_left": true,
		"space_between": true,
		"drop_zeros": false,
		"exp": 0,
		"min_amount": "949",
		"max_amount": "9486298"
	},
	"CNY": {
		"code": "CNY",
		"title": "Chinese Renminbi Yuan",
		"symbol": "CN¥",
		"native": "CN¥",
		"thousands_sep": ",",
		"decimal_sep": ".",
		"symbol_left": true,
		"space_between": false,
		"drop_zeros": false,
		"exp": 2,
		"min_amount": "721",
		"max_amount": "7207705"
	},
	"COP": {
		"code": "COP",
		"title": "Colombian Peso",
		"symbol": "COP",
		"native": "$",
		"thousands_sep": ".",
		"decimal_sep": ",",
		"symbol_left": true,
		"space_between": true,
		"drop_zeros": false,
		"exp": 2,
		"min_amount": "408665",
		"max_amount": "4086650000"
	},
	"CRC": {
		"code": "CRC",
		"title": "Costa Rican Colón",
		"symbol": "CRC",
		"native": "₡",
		"thousands_sep": ".",
		"decimal_sep": ",",
		"symbol_left": true,
		"space_between": false,
		"drop_zeros": false,
		"exp": 2,
		"min_amount": "52313",
		"max_amount": "523125084"
	},
	"CZK": {
		"code": "CZK",
		"title": "Czech Koruna",
		"symbol": "CZK",
		"native": "Kč",
		"thousands_sep": " ",
		"decimal_sep": ",",
		"symbol_left": false,
		"space_between": true,
		"drop_zeros": false,
		"exp": 2,
		"min_amount": "2332",
		"max_amount": "23323050"
	},
	"DKK": {
		"code": "DKK",
		"title": "Danish Krone",
		"symbol": "DKK",
		"native": "kr",
		"thousands_sep": "",
		"decimal_sep": ",",
		"symbol_left": false,
		"space_between": true,
		"drop_zeros": false,
		"exp": 2,
		"min_amount": "689",
		"max_amount": "6887630"
	},
	"DOP": {
		"code": "DOP",
		"title": "Dominican Peso",
		"symbol": "DOP",
		"native": "$",
		"thousands_sep": ",",
		"decimal_sep": ".",
		"symbol_left": true,
		"space_between": false,
		"drop_zeros": false,
		"exp": 2,
		"min_amount": "5945",
		"max_amount": "59453394"
	},
	"DZD": {
		"code": "DZD",
		"title": "Algerian Dinar",
		"symbol": "DZD",
		"native": "د.ج.‏",
		"thousands_sep": ",",
		"decimal_sep": ".",
		"symbol_left": true,
		"space_between": true,
		"drop_zeros": false,
		"exp": 2,
		"min_amount": "13449",
		"max_amount": "134492834"
	},
	"EGP": {
		"code": "EGP",
		"title": "Egyptian Pound",
		"symbol": "EGP",
		"native": "ج.م.‏",
		"thousands_sep": ",",
		"decimal_sep": ".",
		"symbol_left": true,
		"space_between": true,
		"drop_zeros": false,
		"exp": 2,
		"min_amount": "4869",
		"max_amount": "48686201"
	},
	"ETB": {
		"code": "ETB",
		"title": "Ethiopian Birr",
		"symbol": "ETB",
		"native": "ብር",
		"thousands_sep": ",",
		"decimal_sep": ".",
		"symbol_left": true,
		"space_between": false,
		"drop_zeros": false,
		"exp": 2,
		"min_amount": "8093",
		"max_amount": "80931744"
	},
	"EUR": {
		"code": "EUR",
		"title": "Euro",
		"symbol": "€",
		"native": "€",
		"thousands_sep": " ",
		"decimal_sep": ",",
		"symbol_left": false,
		"space_between": true,
		"drop_zeros": false,
		"exp": 2,
		"min_amount": "92",
		"max_amount": "923025"
	},
	"GBP": {
		"code": "GBP",
		"title": "British Pound",
		"symbol": "£",
		"native": "£",
		"thousands_sep": ",",
		"decimal_sep": ".",
		"symbol_left": true,
		"space_between": false,
		"drop_zeros": false,
		"exp": 2,
		"min_amount": "78",
		"max_amount": "784671"
	},
	"GEL": {
		"code": "GEL",
		"title": "Georgian Lari",
		"symbol": "GEL",
		"native": "GEL",
		"thousands_sep": " ",
		"decimal_sep": ",",
		"symbol_left": false,
		"space_between": true,
		"drop_zeros": false,
		"exp": 2,
		"min_amount": "271",
		"max_amount": "2709634"
	},
	"GTQ": {
		"code": "GTQ",
		"title": "Guatemalan Quetzal",
		"symbol": "GTQ",
		"native": "Q",
		"thousands_sep": ",",
		"decimal_sep": ".",
		"symbol_left": true,
		"space_between": false,
		"drop_zeros": false,
		"exp": 2,
		"min_amount": "775",
		"max_amount": "7745760"
	},
	"HKD": {
		"code": "HKD",
		"title": "Hong Kong Dollar",
		"symbol": "HK$",
		"native": "$",
		"thousands_sep": ",",
		"decimal_sep": ".",
		"symbol_left": true,
		"space_between": false,
		"drop_zeros": false,
		"exp": 2,
		"min_amount": "781",
		"max_amount": "7810275"
	},
	"HNL": {
		"code": "HNL",
		"title": "Honduran Lempira",
		"symbol": "HNL",
		"native": "L",
		"thousands_sep": ",",
		"decimal_sep": ".",
		"symbol_left": true,
		"space_between": true,
		"drop_zeros": false,
		"exp": 2,
		"min_amount": "2474",
		"max_amount": "24741783"
	},
	"HRK": {
		"code": "HRK",
		"title": "Croatian Kuna",
		"symbol": "HRK",
		"native": "kn",
		"thousands_sep": ".",
		"decimal_sep": ",",
		"symbol_left": false,
		"space_between": true,
		"drop_zeros": false,
		"exp": 2,
		"min_amount": "691",
		"max_amount": "6907950"
	},
	"HUF": {
		"code": "HUF",
		"title": "Hungarian Forint",
		"symbol": "HUF",
		"native": "Ft",
		"thousands_sep": " ",
		"decimal_sep": ",",
		"symbol_left": false,
		"space_between": true,
		"drop_zeros": false,
		"exp": 2,
		"min_amount": "36623",
		"max_amount": "366225500"
	},
	"IDR": {
		"code": "IDR",
		"title": "Indonesian Rupiah",
		"symbol": "IDR",
		"native": "Rp",
		"thousands_sep": ".",
		"decimal_sep": ",",
		"symbol_left": true,
		"space_between": false,
		"drop_zeros": false,
		"exp": 2,
		"min_amount": "1620255",
		"max_amount": "16202550000"
	},
	"ILS": {
		"code": "ILS",
		"title": "Israeli New Sheqel",
		"symbol": "₪",
		"native": "₪",
		"thousands_sep": ",",
		"decimal_sep": ".",
		"symbol_left": true,
		"space_between": true,
		"drop_zeros": false,
		"exp": 2,
		"min_amount": "380",
		"max_amount": "3801205"
	},
	"INR": {
		"code": "INR",
		"title": "Indian Rupee",
		"symbol": "₹",
		"native": "₹",
		"thousands_sep": ",",
		"decimal_sep": ".",
		"symbol_left": true,
		"space_between": false,
		"drop_zeros": false,
		"exp": 2,
		"min_amount": "8374",
		"max_amount": "83744750"
	},
	"ISK": {
		"code": "ISK",
		"title": "Icelandic Króna",
		"symbol": "ISK",
		"native": "kr",
		"thousands_sep": ".",
		"decimal_sep": ",",
		"symbol_left": false,
		"space_between": true,
		"drop_zeros": false,
		"exp": 0,
		"min_amount": "139",
		"max_amount": "1389014"
	},
	"JMD": {
		"code": "JMD",
		"title": "Jamaican Dollar",
		"symbol": "JMD",
		"native": "$",
		"thousands_sep": ",",
		"decimal_sep": ".",
		"symbol_left": true,
		"space_between": false,
		"drop_zeros": false,
		"exp": 2,
		"min_amount": "15637",
		"max_amount": "156368606"
	},
	"JPY": {
		"code": "JPY",
		"title": "Japanese Yen",
		"symbol": "¥",
		"native": "￥",
		"thousands_sep": ",",
		"decimal_sep": ".",
		"symbol_left": true,
		"space_between": false,
		"drop_zeros": false,
		"exp": 0,
		"min_amount": "149",
		"max_amount": "1490865"
	},
	"KES": {
		"code": "KES",
		"title": "Kenyan Shilling",
		"symbol": "KES",
		"native": "Ksh",
		"thousands_sep": ",",
		"decimal_sep": ".",
		"symbol_left": true,
		"space_between": false,
		"drop_zeros": false,
		"exp": 2,
		"min_amount": "12996",
		"max_amount": "129960065"
	},
	"KGS": {
		"code": "KGS",
		"title": "Kyrgyzstani Som",
		"symbol": "KGS",
		"native": "KGS",
		"thousands_sep": " ",
		"decimal_sep": "-",
		"symbol_left": false,
		"space_between": true,
		"drop_zeros": false,
		"exp": 2,
		"min_amount": "8403",
		"max_amount": "84030175"
	},
	"KRW": {
		"code": "KRW",
		"title": "South Korean Won",
		"symbol": "₩",
		"native": "₩",
		"thousands_sep": ",",
		"decimal_sep": ".",
		"symbol_left": true,
		"space_between": false,
		"drop_zeros": false,
		"exp": 0,
		"min_amount": "1367",
		"max_amount": "13667698"
	},
	"KZT": {
		"code": "KZT",
		"title": "Kazakhstani Tenge",
		"symbol": "KZT",
		"native": "₸",
		"thousands_sep": " ",
		"decimal_sep": "-",
		"symbol_left": true,
		"space_between": false,
		"drop_zeros": false,
		"exp": 2,
		"min_amount": "47435",
		"max_amount": "474353706"
	},
	"LBP": {
		"code": "LBP",
		"title": "Lebanese Pound",
		"symbol": "LBP",
		"native": "ل.ل.‏",
		"thousands_sep": ",",
		"decimal_sep": ".",
		"symbol_left": true,
		"space_between": true,
		"drop_zeros": false,
		"exp": 2,
		"min_amount": "8950019",
		"max_amount": "89500191612"
	},
	"LKR": {
		"code": "LKR",
		"title": "Sri Lankan Rupee",
		"symbol": "LKR",
		"native": "රු.",
		"thousands_sep": ",",
		"decimal_sep": ".",
		"symbol_left": true,
		"space_between": true,
		"drop_zeros": false,
		"exp": 2,
		"min_amount": "30176",
		"max_amount": "301757853"
	},
	"MAD": {
		"code": "MAD",
		"title": "Moroccan Dirham",
		"symbol": "MAD",
		"native": "د.م.‏",
		"thousands_sep": ",",
		"decimal_sep": ".",
		"symbol_left": true,
		"space_between": true,
		"drop_zeros": false,
		"exp": 2,
		"min_amount": "987",
		"max_amount": "9874277"
	},
	"MDL": {
		"code": "MDL",
		"title": "Moldovan Leu",
		"symbol": "MDL",
		"native": "MDL",
		"thousands_sep": ",",
		"decimal_sep": ".",
		"symbol_left": false,
		"space_between": true,
		"drop_zeros": false,
		"exp": 2,
		"min_amount": "1777",
		"max_amount": "17770719"
	},
	"MMK": {
		"code": "MMK",
		"title": "Myanmar kyat",
		"symbol": "MMK",
		"native": "MMK",
		"thousands_sep": ",",
		"decimal_sep": ".",
		"symbol_left": true,
		"space_between": false,
		"drop_zeros": false,
		"exp": 2,
		"min_amount": "324796",
		"max_amount": "3247960992"
	},
	"MNT": {
		"code": "MNT",
		"title": "Mongolian Tögrög",
		"symbol": "MNT",
		"native": "MNT",
		"thousands_sep": " ",
		"decimal_sep": ",",
		"symbol_left": true,
		"space_between": false,
		"drop_zeros": false,
		"exp": 2,
		"min_amount": "345000",
		"max_amount": "3450000346"
	},
	"MOP": {
		"code": "MOP",
		"title": "Macanese pataca",
		"symbol": "MOP",
		"native": "MOP",
		"thousands_sep": ",",
		"decimal_sep": ".",
		"symbol_left": true,
		"space_between": false,
		"drop_zeros": false,
		"exp": 2,
		"min_amount": "804",
		"max_amount": "8040613"
	},
	"MUR": {
		"code": "MUR",
		"title": "Mauritian Rupee",
		"symbol": "MUR",
		"native": "MUR",
		"thousands_sep": ",",
		"decimal_sep": ".",
		"symbol_left": true,
		"space_between": false,
		"drop_zeros": false,
		"exp": 2,
		"min_amount": "4675",
		"max_amount": "46749662"
	},
	"MVR": {
		"code": "MVR",
		"title": "Maldivian Rufiyaa",
		"symbol": "MVR",
		"native": "MVR",
		"thousands_sep": ",",
		"decimal_sep": ".",
		"symbol_left": false,
		"space_between": true,
		"drop_zeros": false,
		"exp": 2,
		"min_amount": "1535",
		"max_amount": "15350296"
	},
	"MXN": {
		"code": "MXN",
		"title": "Mexican Peso",
		"symbol": "MX$",
		"native": "$",
		"thousands_sep": ",",
		"decimal_sep": ".",
		"symbol_left": true,
		"space_between": false,
		"drop_zeros": false,
		"exp": 2,
		"min_amount": "1898",
		"max_amount": "18980550"
	},
	"MYR": {
		"code": "MYR",
		"title": "Malaysian Ringgit",
		"symbol": "MYR",
		"native": "RM",
		"thousands_sep": ",",
		"decimal_sep": ".",
		"symbol_left": true,
		"space_between": false,
		"drop_zeros": false,
		"exp": 2,
		"min_amount": "450",
		"max_amount": "4497502"
	},
	"MZN": {
		"code": "MZN",
		"title": "Mozambican Metical",
		"symbol": "MZN",
		"native": "MTn",
		"thousands_sep": ",",
		"decimal_sep": ".",
		"symbol_left": true,
		"space_between": false,
		"drop_zeros": false,
		"exp": 2,
		"min_amount": "6390",
		"max_amount": "63899991"
	},
	"NGN": {
		"code": "NGN",
		"title": "Nigerian Naira",
		"symbol": "NGN",
		"native": "₦",
		"thousands_sep": ",",
		"decimal_sep": ".",
		"symbol_left": true,
		"space_between": false,
		"drop_zeros": false,
		"exp": 2,
		"min_amount": "163953",
		"max_amount": "1639530235"
	},
	"NIO": {
		"code": "NIO",
		"title": "Nicaraguan Córdoba",
		"symbol": "NIO",
		"native": "C$",
		"thousands_sep": ",",
		"decimal_sep": ".",
		"symbol_left": true,
		"space_between": true,
		"drop_zeros": false,
		"exp": 2,
		"min_amount": "3679",
		"max_amount": "36791630"
	},
	"NOK": {
		"code": "NOK",
		"title": "Norwegian Krone",
		"symbol": "NOK",
		"native": "kr",
		"thousands_sep": " ",
		"decimal_sep": ",",
		"symbol_left": true,
		"space_between": true,
		"drop_zeros": false,
		"exp": 2,
		"min_amount": "1100",
		"max_amount": "10996470"
	},
	"NPR": {
		"code": "NPR",
		"title": "Nepalese Rupee",
		"symbol": "NPR",
		"native": "नेरू",
		"thousands_sep": ",",
		"decimal_sep": ".",
		"symbol_left": true,
		"space_between": false,
		"drop_zeros": false,
		"exp": 2,
		"min_amount": "13390",
		"max_amount": "133897859"
	},
	"NZD": {
		"code": "NZD",
		"title": "New Zealand Dollar",
		"symbol": "NZ$",
		"native": "$",
		"thousands_sep": ",",
		"decimal_sep": ".",
		"symbol_left": true,
		"space_between": false,
		"drop_zeros": false,
		"exp": 2,
		"min_amount": "168",
		"max_amount": "1679219"
	},
	"PAB": {
		"code": "PAB",
		"title": "Panamanian Balboa",
		"symbol": "PAB",
		"native": "B/.",
		"thousands_sep": ",",
		"decimal_sep": ".",
		"symbol_left": true,
		"space_between": true,
		"drop_zeros": false,
		"exp": 2,
		"min_amount": "100",
		"max_amount": "999469"
	},
	"PEN": {
		"code": "PEN",
		"title": "Peruvian Nuevo Sol",
		"symbol": "PEN",
		"native": "S/.",
		"thousands_sep": ",",
		"decimal_sep": ".",
		"symbol_left": true,
		"space_between": true,
		"drop_zeros": false,
		"exp": 2,
		"min_amount": "374",
		"max_amount": "3740759"
	},
	"PHP": {
		"code": "PHP",
		"title": "Philippine Peso",
		"symbol": "PHP",
		"native": "₱",
		"thousands_sep": ",",
		"decimal_sep": ".",
		"symbol_left": true,
		"space_between": false,
		"drop_zeros": false,
		"exp": 2,
		"min_amount": "5806",
		"max_amount": "58056502"
	},
	"PKR": {
		"code": "PKR",
		"title": "Pakistani Rupee",
		"symbol": "PKR",
		"native": "₨",
		"thousands_sep": ",",
		"decimal_sep": ".",
		"symbol_left": true,
		"space_between": false,
		"drop_zeros": false,
		"exp": 2,
		"min_amount": "27836",
		"max_amount": "278360445"
	},
	"PLN": {
		"code": "PLN",
		"title": "Polish Złoty",
		"symbol": "PLN",
		"native": "zł",
		"thousands_sep": " ",
		"decimal_sep": ",",
		"symbol_left": false,
		"space_between": true,
		"drop_zeros": false,
		"exp": 2,
		"min_amount": "396",
		"max_amount": "3957640"
	},
	"PYG": {
		"code": "PYG",
		"title": "Paraguayan Guaraní",
		"symbol": "PYG",
		"native": "₲",
		"thousands_sep": ".",
		"decimal_sep": ",",
		"symbol_left": true,
		"space_between": true,
		"drop_zeros": false,
		"exp": 0,
		"min_amount": "7569",
		"max_amount": "75694544"
	},
	"QAR": {
		"code": "QAR",
		"title": "Qatari Riyal",
		"symbol": "QAR",
		"native": "ر.ق.‏",
		"thousands_sep": ",",
		"decimal_sep": ".",
		"symbol_left": true,
		"space_between": true,
		"drop_zeros": false,
		"exp": 2,
		"min_amount": "364",
		"max_amount": "3644355"
	},
	"RON": {
		"code": "RON",
		"title": "Romanian Leu",
		"symbol": "RON",
		"native": "RON",
		"thousands_sep": ".",
		"decimal_sep": ",",
		"symbol_left": false,
		"space_between": true,
		"drop_zeros": false,
		"exp": 2,
		"min_amount": "459",
		"max_amount": "4592300"
	},
	"RSD": {
		"code": "RSD",
		"title": "Serbian Dinar",
		"symbol": "RSD",
		"native": "дин.",
		"thousands_sep": ".",
		"decimal_sep": ",",
		"symbol_left": false,
		"space_between": true,
		"drop_zeros": false,
		"exp": 2,
		"min_amount": "10802",
		"max_amount": "108020115"
	},
	"RUB": {
		"code": "RUB",
		"title": "Russian Ruble",
		"symbol": "RUB",
		"native": "₽",
		"thousands_sep": " ",
		"decimal_sep": ",",
		"symbol_left": false,
		"space_between": true,
		"drop_zeros": false,
		"exp": 2,
		"min_amount": "8990",
		"max_amount": "89898410"
	},
	"SAR": {
		"code": "SAR",
		"title": "Saudi Riyal",
		"symbol": "SAR",
		"native": "ر.س.‏",
		"thousands_sep": ",",
		"decimal_sep": ".",
		"symbol_left": true,
		"space_between": true,
		"drop_zeros": false,
		"exp": 2,
		"min_amount": "375",
		"max_amount": "3754022"
	},
	"SEK": {
		"code": "SEK",
		"title": "Swedish Krona",
		"symbol": "SEK",
		"native": "kr",
		"thousands_sep": ".",
		"decimal_sep": ",",
		"symbol_left": false,
		"space_between": true,
		"drop_zeros": false,
		"exp": 2,
		"min_amount": "1069",
		"max_amount": "10689290"
	},
	"SGD": {
		"code": "SGD",
		"title": "Singapore Dollar",
		"symbol": "SGD",
		"native": "$",
		"thousands_sep": ",",
		"decimal_sep": ".",
		"symbol_left": true,
		"space_between": false,
		"drop_zeros": false,
		"exp": 2,
		"min_amount": "133",
		"max_amount": "1331235"
	},
	"THB": {
		"code": "THB",
		"title": "Thai Baht",
		"symbol": "฿",
		"native": "฿",
		"thousands_sep": ",",
		"decimal_sep": ".",
		"symbol_left": true,
		"space_between": false,
		"drop_zeros": false,
		"exp": 2,
		"min_amount": "3535",
		"max_amount": "35351502"
	},
	"TJS": {
		"code": "TJS",
		"title": "Tajikistani Somoni",
		"symbol": "TJS",
		"native": "TJS",
		"thousands_sep": " ",
		"decimal_sep": ";",
		"symbol_left": false,
		"space_between": true,
		"drop_zeros": false,
		"exp": 2,
		"min_amount": "1057",
		"max_amount": "10569158"
	},
	"TRY": {
		"code": "TRY",
		"title": "Turkish Lira",
		"symbol": "TRY",
		"native": "TL",
		"thousands_sep": ".",
		"decimal_sep": ",",
		"symbol_left": false,
		"space_between": true,
		"drop_zeros": false,
		"exp": 2,
		"min_amount": "3317",
		"max_amount": "33166840"
	},
	"TTD": {
		"code": "TTD",
		"title": "Trinidad and Tobago Dollar",
		"symbol": "TTD",
		"native": "$",
		"thousands_sep": ",",
		"decimal_sep": ".",
		"symbol_left": true,
		"space_between": false,
		"drop_zeros": false,
		"exp": 2,
		"min_amount": "677",
		"max_amount": "6768188"
	},
	"TWD": {
		"code": "TWD",
		"title": "New Taiwan Dollar",
		"symbol": "NT$",
		"native": "NT$",
		"thousands_sep": ",",
		"decimal_sep": ".",
		"symbol_left": true,
		"space_between": false,
		"drop_zeros": false,
		"exp": 2,
		"min_amount": "3281",
		"max_amount": "32805499"
	},
	"TZS": {
		"code": "TZS",
		"title": "Tanzanian Shilling",
		"symbol": "TZS",
		"native": "TSh",
		"thousands_sep": ",",
		"decimal_sep": ".",
		"symbol_left": true,
		"space_between": false,
		"drop_zeros": false,
		"exp": 2,
		"min_amount": "270000",
		"max_amount": "2700000297"
	},
	"UAH": {
		"code": "UAH",
		"title": "Ukrainian Hryvnia",
		"symbol": "UAH",
		"native": "₴",
		"thousands_sep": " ",
		"decimal_sep": ",",
		"symbol_left": false,
		"space_between": false,
		"drop_zeros": false,
		"exp": 2,
		"min_amount": "4124",
		"max_amount": "41236639"
	},
	"UGX": {
		"code": "UGX",
		"title": "Ugandan Shilling",
		"symbol": "UGX",
		"native": "USh",
		"thousands_sep": ",",
		"decimal_sep": ".",
		"symbol_left": true,
		"space_between": false,
		"drop_zeros": false,
		"exp": 0,
		"min_amount": "3723",
		"max_amount": "37234902"
	},
	"USD": {
		"code": "USD",
		"title": "United States Dollar",
		"symbol": "$",
		"native": "$",
		"thousands_sep": ",",
		"decimal_sep": ".",
		"symbol_left": true,
		"space_between": false,
		"drop_zeros": false,
		"exp": 2,
		"min_amount": "100",
		"max_amount": 1e6
	},
	"UYU": {
		"code": "UYU",
		"title": "Uruguayan Peso",
		"symbol": "UYU",
		"native": "$",
		"thousands_sep": ".",
		"decimal_sep": ",",
		"symbol_left": true,
		"space_between": true,
		"drop_zeros": false,
		"exp": 2,
		"min_amount": "4027",
		"max_amount": "40269076"
	},
	"UZS": {
		"code": "UZS",
		"title": "Uzbekistani Som",
		"symbol": "UZS",
		"native": "UZS",
		"thousands_sep": " ",
		"decimal_sep": ",",
		"symbol_left": false,
		"space_between": true,
		"drop_zeros": false,
		"exp": 2,
		"min_amount": "1256851",
		"max_amount": "12568510387"
	},
	"VND": {
		"code": "VND",
		"title": "Vietnamese Đồng",
		"symbol": "₫",
		"native": "₫",
		"thousands_sep": ".",
		"decimal_sep": ",",
		"symbol_left": false,
		"space_between": true,
		"drop_zeros": false,
		"exp": 0,
		"min_amount": "25218",
		"max_amount": "252175000"
	},
	"YER": {
		"code": "YER",
		"title": "Yemeni Rial",
		"symbol": "YER",
		"native": "ر.ي.‏",
		"thousands_sep": ",",
		"decimal_sep": ".",
		"symbol_left": true,
		"space_between": true,
		"drop_zeros": false,
		"exp": 2,
		"min_amount": "25035",
		"max_amount": "250350255"
	},
	"ZAR": {
		"code": "ZAR",
		"title": "South African Rand",
		"symbol": "ZAR",
		"native": "R",
		"thousands_sep": ",",
		"decimal_sep": ".",
		"symbol_left": true,
		"space_between": true,
		"drop_zeros": false,
		"exp": 2,
		"min_amount": "1819",
		"max_amount": "18193780"
	}
};
//#endregion
//#region src/helpers/paymentsWrapCurrencyAmount.ts
function number_format(number, decimals, dec_point, thousands_sep) {
	number = (number + "").replace(/[^0-9+\-Ee.]/g, "");
	var n = !isFinite(+number) ? 0 : +number, prec = !isFinite(+decimals) ? 0 : Math.abs(decimals), sep = typeof thousands_sep === "undefined" ? "," : thousands_sep, dec = typeof dec_point === "undefined" ? "." : dec_point, s = "", toFixedFix = function(n, prec) {
		var k = Math.pow(10, prec);
		return "" + Math.round(n * k) / k;
	};
	s = (prec ? toFixedFix(n, prec) : "" + Math.round(n)).split(".");
	if (s[0].length > 3) s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
	if ((s[1] || "").length < prec) {
		s[1] = s[1] || "";
		s[1] += new Array(prec - s[1].length + 1).join("0");
	}
	return s.join(dec);
}
function paymentsWrapCurrencyAmount(amount, currency, skipSymbol, useNative, plain, fractionDigits) {
	if (currency === "TON") {
		const str = formatNanoton(amount);
		if (plain) return `${str} ${GRAM_CURRENCY_SYMBOL}`;
		const out = document.createElement("span");
		out.classList.add("ton-amount");
		out.append(Icon("gram_filled", "ton-amount-icon"), " ", str);
		return out;
	}
	amount = +amount;
	if (currency === "XTR") {
		if (plain) return langPack_default.format("StarsCount", true, [amount]);
		const out = document.createElement("span");
		out.classList.add("xtr");
		out.append(Icon("star", "xtr-icon"), " ", numberThousandSplitterForStars(amount));
		return out;
	}
	const isNegative = amount < 0;
	const currencyData = Currencies[currency];
	if (!currencyData) throw new Error("CURRENCY_WRAP_INVALID");
	const amountExp = amount / Math.pow(10, currencyData.exp);
	let decimals = fractionDigits ?? currencyData.exp;
	if (fractionDigits === void 0 && currency == "IRR" && Math.floor(amountExp) == amountExp) decimals = 0;
	let formatted = number_format(amountExp, decimals, currencyData.decimal_sep, currencyData.thousands_sep);
	if (skipSymbol) return formatted;
	let symbol = useNative ? currencyData.native || currencyData.symbol : currencyData.symbol;
	if (isNegative && !currencyData.space_between && currencyData.symbol_left) {
		symbol = "-" + symbol;
		formatted = formatted.replace("-", "");
	}
	let out;
	const splitter = currencyData.space_between ? " " : "";
	if (currencyData.symbol_left) out = symbol + splitter + formatted;
	else out = formatted + splitter + symbol;
	return out;
}
MOUNT_CLASS_TO.p = paymentsWrapCurrencyAmount;
//#endregion
//#region src/components/wallet/fiatAmount.ts
var import_BigInteger = /* @__PURE__ */ __toESM(require_BigInteger());
var GRAM_DECIMALS = 9;
var TEN = (0, import_BigInteger.default)(10);
/** `12.5`, `12.`, `.5`, `1.5e-7`: plain digits with at most one point and an exponent; anything else is nothing */
function parseDecimal(text) {
	const match = /^(\d*)(?:\.(\d*))?(?:e([+-]?\d+))?$/i.exec(text);
	if (!match || !(match[1] || match[2])) return;
	const fraction = match[2] || "";
	let digits = (0, import_BigInteger.default)((match[1] || "") + fraction || "0");
	let scale = fraction.length - Number(match[3] || 0);
	if (scale < 0) {
		digits = digits.multiply(TEN.pow(-scale));
		scale = 0;
	}
	return {
		digits,
		scale
	};
}
/** The rate as JavaScript writes the number (`2.12`, `1.5e-7`) — that decimal, exactly; none for one that is no rate */
function parseRate(rate) {
	return Number.isFinite(rate) && rate > 0 ? parseDecimal(String(rate)) : void 0;
}
/** `a / b` for `a >= 0`, `b > 0`, rounded as asked */
function divide(a, b, rounding) {
	const { quotient, remainder } = a.divmod(b);
	if (remainder.isZero() || rounding === "down") return quotient;
	if (rounding === "up") return quotient.add(1);
	return remainder.multiply(2).compare(b) >= 0 ? quotient.add(1) : quotient;
}
/**
* Nanograms for an amount typed in fiat at `rate` (fiat per Gram): divided exactly, in hundredths of a Gram rounded
* half up (Android WalletSendEnterAmount.getGramNanoAmount). `'0'` for no amount or no rate.
*/
function fiatToNanos(fiat, rate) {
	const amount = parseDecimal(fiat), perGram = parseRate(rate);
	if (!amount || !perGram) return "0";
	return divide(amount.digits.multiply(TEN.pow(perGram.scale + 2)), perGram.digits.multiply(TEN.pow(amount.scale)), "halfUp").multiply(TEN.pow(7)).toString();
}
/**
* What `nanos` are worth in fiat at `rate`, with exactly `exponent` decimals (`3.09`, `172`): half up for showing,
* up for a minimum that must not fall under itself again
*/
function nanosToFiat(nanos, rate, exponent, rounding = "halfUp") {
	const perGram = parseRate(rate);
	const value = (0, import_BigInteger.default)(nanos).abs();
	const text = (perGram ? divide(value.multiply(perGram.digits).multiply(TEN.pow(exponent)), TEN.pow(perGram.scale + GRAM_DECIMALS), rounding) : import_BigInteger.default.zero).toString().padStart(exponent + 1, "0");
	return exponent > 0 ? text.slice(0, -exponent) + "." + text.slice(-exponent) : text;
}
//#endregion
//#region src/components/wallet/format.ts
var NANOS_PER_GRAM = 1e9;
/**
* An amount in Grams as the wallet writes it: up to 9 decimals, trailing zeros trimmed.
*/
function formatGrams(nanos, maxDecimals = 9, withThousandsSep = true) {
	return formatNanoton(nanos, maxDecimals, withThousandsSep);
}
var NANOS_PER_CENT = NANOS_PER_GRAM / 100;
/**
* Whole part and exactly two decimals, the way the card and the history rows show a balance. The rest is cut, not
* rounded, as in tdesktop: 1.999 reads 1.99, never more than there is.
*/
function splitGrams(nanos) {
	const cents = (0, import_BigInteger.default)(String(nanos)).divide(NANOS_PER_CENT).multiply(NANOS_PER_CENT);
	const [whole, fraction = ""] = formatNanoton(cents.toString(), 2, true).split(".");
	return {
		whole,
		fraction: "." + fraction.padEnd(2, "0")
	};
}
function gramsToNumber(nanos) {
	return nanotonToJsNumber(nanos);
}
function absNanos(nanos) {
	return (0, import_BigInteger.default)(String(nanos)).abs().toString();
}
function isNegativeNanos(nanos) {
	return String(nanos).startsWith("-");
}
function compareNanos(a, b) {
	return (0, import_BigInteger.default)(String(a)).compare((0, import_BigInteger.default)(String(b)));
}
/**
* Fiat value of an amount of Grams, formatted as the app formats that currency; `fractionDigits` writes more
* decimals than the currency's own (a fee: `$0.0058`)
*/
function formatFiat(nanos, fiatPerGram, currency, fractionDigits) {
	const exp = Currencies[currency]?.exp ?? 2;
	const value = nanosToFiat(absNanos(nanos), fiatPerGram, fractionDigits ?? exp);
	const minor = Number(value) * 10 ** exp;
	return paymentsWrapCurrencyAmount(isNegativeNanos(nanos) ? -minor : minor, currency, false, false, true, fractionDigits);
}
/**
* Grams cut to `decimals`, never rounded up, trailing zeros trimmed — as iOS writes a transfer's amount (3) and its
* fee (5). An amount the cut would leave at zero keeps all its digits. Unsigned.
*/
function formatGramsCut(nanos, decimals) {
	const value = (0, import_BigInteger.default)(String(nanos)).abs();
	const unit = (0, import_BigInteger.default)(10).pow(9 - decimals);
	const cut = value.divide(unit).multiply(unit);
	return cut.isZero() ? formatGrams(value.toString()) : formatGrams(cut.toString(), decimals);
}
/**
* `UQAl 1dVi v82p …`: the address in groups of four, `groupsPerLine` groups to a line
*/
function groupAddress(address, groupsPerLine = address.length) {
	const groups = address.match(/.{1,4}/g) || [];
	const lines = [];
	for (let i = 0; i < groups.length; i += groupsPerLine) lines.push(groups.slice(i, i + groupsPerLine).join(" "));
	return lines;
}
/**
* A collectible by its name, or by its address when it has none
*/
function walletNftName(item) {
	return item.name || shortAddress(item.address);
}
function shortAddress(address, edge = 4) {
	if (address.length <= edge * 2 + 1) return address;
	return address.slice(0, edge) + "…" + address.slice(-edge);
}
/** Grams bought through Telegram's own provider came for crypto, through any other for a card (Android) */
function isCryptoTopUp(provider) {
	return /^(walt|wallet)$/i.test(provider?.trim() || "");
}
/** a top-up's provider with its first letter up, as Android writes it: "Moonpay" for "moonpay" */
function walletProviderName(name) {
	const index = name ? name.search(/\p{L}/u) : -1;
	if (index < 0) return name;
	const letter = String.fromCodePoint(name.codePointAt(index));
	return name.slice(0, index) + letter.toLocaleUpperCase() + name.slice(index + letter.length);
}
//#endregion
//#region src/components/wallet/fiat.ts
/**
* The fiat currency the wallet counts in, and what a Gram is worth in it — light enough for a chat's lines to read
* without the wallet's own code (iOS: the wallet context's fiat state, which the transfer's service line reads)
*/
var CURRENCY_STORAGE_KEY = "wallet_fiat_currency";
/** this tab asks the worker again after as long as the worker keeps its rates */
var RATES_TTL = 3e5;
/** the fiat currency the user picked for the wallet */
function readWalletCurrency() {
	try {
		return localStorage.getItem(CURRENCY_STORAGE_KEY) || "USD";
	} catch (err) {
		return "USD";
	}
}
function writeWalletCurrency(code) {
	try {
		localStorage.setItem(CURRENCY_STORAGE_KEY, code);
	} catch (err) {}
}
/**
* A Gram in `currency`: the dollar's rate is the app config's, another currency's comes with the wallet's rates;
* nothing for a rate that is not a positive number
*/
function pickWalletFiatRate(currency, usdPerGram, rates) {
	const perGram = currency === "USD" ? usdPerGram || rates?.USD : rates?.[currency];
	return Number.isFinite(perGram) && perGram > 0 ? {
		currency,
		perGram
	} : void 0;
}
var rates;
var loading;
function loadRates() {
	return loading ?? (loading = rootScope.managers.appWalletManager.getRates().then((value) => {
		rates = value;
	}, () => {
		rates = {
			rates: rates?.rates || {},
			date: Date.now()
		};
	}).finally(() => {
		loading = void 0;
	}));
}
/**
* A Gram in the wallet's currency as this tab knows it now, or nothing yet: the rates are asked for once they are
* missing or old, without waiting for them
*/
function getWalletFiatRate() {
	const currency = readWalletCurrency();
	if (currency !== "USD" && (!rates || Date.now() - rates.date > RATES_TTL)) loadRates();
	return pickWalletFiatRate(currency, useAppConfig()?.ton_usd_rate, rates?.rates);
}
/** the same, once the rates this tab asked for came: for a line drawn before they did */
function loadWalletFiatRate() {
	const known = getWalletFiatRate();
	return known ? Promise.resolve(known) : (loading || loadRates()).then(() => getWalletFiatRate());
}
//#endregion
//#region src/components/wallet/transferText.ts
/** iOS: a transfer's amount outside the wallet has at most three decimals, cut, never rounded up */
var DECIMALS = 3;
/** `12.5 Grams`, `1 Gram`: an amount written as `text`, with the ticker in the plural of `nanos` */
function formatGramsWithUnit(nanos, text = formatGrams(nanos)) {
	return langPack_default.format("Wallet.GramsAmount", true, [text, langPack_default.format("Wallet.Card.Ticker", true, [gramsToNumber(nanos)])]);
}
/** `1.5 Grams`, unsigned: the unit agrees with the number written — 1.0004 reads "1 Gram", as iOS writes it */
function formatTransferGrams(nanos) {
	const amount = formatGramsCut(nanos, DECIMALS);
	const ticker = langPack_default.format("Wallet.Card.Ticker", true, [+amount.replace(/,/g, "")]);
	return langPack_default.format("Wallet.GramsAmount", true, [amount, ticker]);
}
/** the comment anyone may read, on one line (tdesktop: commentText); an encrypted one says nothing here (Android) */
function getTransferPublicComment(transfer) {
	if (transfer.pFlags.comment_encrypted) return;
	return transfer.comment?.replace(/\s+/g, " ").trim() || void 0;
}
/**
* The line under the sender's name, without the name and without fiat: "sent you 1.5 Grams" in, "You sent 1.5
* Grams" out (Android messageTextShort, iOS incomingGramTransferPreview); the service account's names nobody. A
* notification marks an incoming amount with the gem (iOS) and ends with the comment (Android, tdesktop).
*/
function wrapGramTransferCompactText(options) {
	const { transfer, out, anonymous, notification } = options;
	const amount = (notification && !out ? "💎" : "") + formatTransferGrams(transfer.amount);
	const key = out ? "Wallet.Action.SentUnknown" : anonymous ? "Wallet.Action.ReceivedUnknown" : "Wallet.Action.ReceivedCompact";
	const text = langPack_default.format(key, true, [amount]);
	const comment = notification && !out && getTransferPublicComment(transfer);
	return comment ? langPack_default.format("Wallet.Action.WithComment", true, [text, comment]) : text;
}
/**
* "❤ to your 1.5 Grams transfer: For the coffee" (Android PushReactGramTransfer, iOS REACT_GRAM_TRANSFER). Android's
* strings leave their first argument, the one who reacted, to the notification's title
*/
function wrapGramTransferReactionText(reaction, transfer) {
	const amount = formatTransferGrams(transfer.amount);
	const comment = getTransferPublicComment(transfer);
	return comment ? langPack_default.format("PushReactGramTransferComment", true, [
		"",
		reaction,
		amount,
		comment
	]) : langPack_default.format("PushReactGramTransfer", true, [
		"",
		reaction,
		amount
	]);
}
//#endregion
//#region src/components/topicAvatar.ts
var svg;
var span;
var defs;
var hadColors = /* @__PURE__ */ new Map();
function topicAvatar(color, content) {
	if (!svg) {
		defs = document.getElementById("svg-defs");
		const ns = "http://www.w3.org/2000/svg";
		svg = document.createElementNS(ns, "svg");
		svg.setAttributeNS(null, "width", "26");
		svg.setAttributeNS(null, "height", "26");
		svg.setAttributeNS(null, "viewBox", "0 0 26 26");
		svg.classList.add("topic-icon-svg");
		const use = document.createElementNS(ns, "use");
		use.setAttributeNS(null, "href", "#topic-icon");
		svg.append(use);
		span = document.createElement("span");
		span.classList.add("topic-icon", "avatar-like");
		const contentSpan = document.createElement("span");
		contentSpan.classList.add("topic-icon-content");
		span.append(svg, contentSpan);
	}
	if (!color) {
		console.error("NO TOPIC ICON COLOR!");
		color = TOPIC_COLORS[0];
	}
	if (!content) {
		console.error("NO TOPIC NAME!");
		content = "";
	}
	const hex = color.toString(16);
	const gradientId = `topic-icon-gradient-${color}`;
	let strokeColor = hadColors.get(color);
	if (!strokeColor) {
		const { h, s, l, a } = hexaToHsla("#" + hex);
		defs.insertAdjacentHTML("beforeend", `
      <linearGradient id="${gradientId}" x1="0" x2="0" y1="0" y2="1">
        <stop style="stop-color: #${hex};" offset="0%" />
        <stop style="stop-color: hsla(${h}, ${s}%, ${Math.max(0, l - 30)}%, ${a});" offset="100%" />
      </linearGradient>
    `);
		hadColors.set(color, strokeColor = `hsla(${h}, ${s}%, ${Math.max(0, l - 40)}%, ${a})`);
	}
	const clone = span.cloneNode(true);
	clone.firstElementChild.style.fill = `url(#${gradientId})`;
	clone.firstElementChild.style.stroke = strokeColor;
	clone.lastElementChild.append(wrapAbbreviation(content, true));
	return clone;
}
//#endregion
//#region src/components/wrappers/customEmoji.ts
function wrapCustomEmoji({ docIds, loadPromises, middleware, lazyLoadQueue, customEmojiSize, animationGroup, textColor }) {
	const text = " ".repeat(docIds.length);
	const entities = [];
	docIds.forEach((docId, idx) => {
		entities.push({
			_: "messageEntityCustomEmoji",
			offset: idx,
			length: 1,
			document_id: docId
		});
	});
	return wrapRichText(text, {
		entities,
		loadPromises,
		animationGroup,
		customEmojiSize,
		middleware,
		lazyLoadQueue,
		textColor
	});
}
function wrapCustomEmojiAwaited(options) {
	const loadPromises = options.loadPromises ?? (options.loadPromises = []);
	const wrapped = wrapCustomEmoji(options);
	return Promise.all(loadPromises).then(() => wrapped);
}
//#endregion
//#region src/components/wrappers/getPeerTitle.ts
async function getPeerTitle(options) {
	const title = await getPeerTitleText(options);
	return options.plainText ? title : wrapEmojiText(title);
}
//#endregion
//#region src/components/wrappers/joinVoiceChatAnchor.ts
/**
* The anchors made here: a press on one is the chat's own "join" (tdesktop GroupCallClickHandler), while the same
* tg://voicechat address from anywhere else — a message's text, a link handed to the page — is a link, and asks first
*/
var joinVoiceChatAnchors = /* @__PURE__ */ new WeakSet();
function isJoinVoiceChatAnchor(element) {
	return !!element && joinVoiceChatAnchors.has(element);
}
function wrapJoinVoiceChatAnchor(message) {
	const call = message.action.call;
	if (!call || call._ !== "inputGroupCall") return document.createElement("span");
	const { onclick, url } = wrapUrl(`tg://voicechat?chat_id=${message.peerId.toChatId()}&id=${call.id}&access_hash=${call.access_hash}`);
	if (!onclick) return document.createElement("span");
	const a = document.createElement("a");
	a.href = url;
	a.setAttribute("onclick", onclick + "(this)");
	joinVoiceChatAnchors.add(a);
	return a;
}
//#endregion
//#region src/lib/calls/helpers/conferenceCallAction.ts
function getConferenceCallState(action) {
	if (action.duration !== void 0) return "hangup";
	if (action.pFlags.missed) return "missed";
	if (action.pFlags.active) return "active";
	return "invitation";
}
/**
* Title of a conference-call message — tdesktop's `MediaCall::Text`
* (data_media_types.cpp:1903). It is both the bubble's title and the plain
* text used for chat list previews, replies and notifications.
*/
function getConferenceCallLangKey(state, isOut) {
	if (state === "invitation") return "Chat.Service.ConferenceCall.Invitation";
	if (state === "active") return "Chat.Service.ConferenceCall.Ongoing";
	if (isOut) return state === "missed" ? "Chat.Service.ConferenceCall.Declined" : "Chat.Service.ConferenceCall.Outgoing";
	return state === "missed" ? "Chat.Service.ConferenceCall.Missed" : "Chat.Service.ConferenceCall.Incoming";
}
//#endregion
//#region src/helpers/array/partition.ts
function partition(arr, callback) {
	const good = [], bad = [];
	for (let i = 0, length = arr.length; i < length; ++i) {
		const item = arr[i];
		(callback(item, i, arr) ? good : bad).push(item);
	}
	return [good, bad];
}
//#endregion
//#region src/lib/appManagers/utils/docs/getAudioAttribute.ts
/**
* A document's `documentAttributeAudio` — the one carrying title, performer, duration, waveform
* and the voice flag. Every reader of those went looking for it by hand, cast included.
*/
function getAudioAttribute(doc) {
	return doc?.attributes?.find((attribute) => attribute._ === "documentAttributeAudio");
}
//#endregion
//#region src/lib/appManagers/utils/messages/isMessageRestricted.ts
/**
* What hides the whole message. `sensitive` never does - it only blurs the media (`isMessageSensitive`),
* as in tdesktop and Android.
*/
function getMessageRestrictionReason(message) {
	const reasons = message.restriction_reason?.filter((reason) => reason.reason !== SENSITIVE_RESTRICTION_REASON);
	return reasons?.length ? getRestrictionReason(reasons) : void 0;
}
function isMessageRestricted(message) {
	return !!getMessageRestrictionReason(message);
}
function isMessageSensitive(message) {
	return message._ === "message" && message.restriction_reason != null && isSensitive(message.restriction_reason);
}
//#endregion
//#region src/lib/appManagers/utils/messages/getLoginCodeEntity.ts
/**
* A login code in a text from the service notifications or the verification codes bot,
* as the spoiler that hides it wherever the message is previewed
*/
function getLoginCodeEntity(peerId, text) {
	const codeRegex = peerId === 777e3 ? /[\d\-]{5,7}/ : peerId === 489e3 ? /[\d\-]{3,8}/ : void 0;
	const match = codeRegex && text.match(codeRegex);
	if (!match) return;
	return {
		_: "messageEntitySpoiler",
		offset: match.index,
		length: match[0].length
	};
}
//#endregion
//#region src/helpers/modifyAckedResult.ts
async function modifyAckedResult(acked) {
	return {
		cached: acked.cached,
		result: acked.cached ? await acked.result : acked.result
	};
}
function modifyAckedPromise(promise) {
	return promise.then(modifyAckedResult);
}
//#endregion
//#region src/helpers/solid/useDynamicCachedValue.ts
var cache = /* @__PURE__ */ new Map();
/**
* `cacheKey` is global to the app, so spell it out — never build it from a function's `.name`: the
* minifier names functions per chunk, and two that land in different chunks can come out the same.
*/
function useDynamicCachedValue(cacheKey, factory) {
	return createMemo(() => {
		const currentKey = cacheKey();
		let entry = cache.get(currentKey);
		if (!entry) {
			let failed = false;
			entry = {
				count: 0,
				factory
			};
			entry.value = createRoot((dispose) => {
				entry.dispose = dispose;
				try {
					return factory();
				} catch (err) {
					failed = true;
					dispose();
					throw err;
				}
			});
			if (failed) return entry.value;
			cache.set(currentKey, entry);
		}
		++entry.count;
		onCleanup(() => {
			if (!--entry.count) {
				entry.dispose();
				cache.delete(currentKey);
			}
		});
		return entry.value;
	});
}
//#endregion
//#region src/stores/fullPeers.ts
var [state$1, setState$1] = createStore({});
var expirations = /* @__PURE__ */ new Map();
var requestFullPeer = (peerId, overwrite) => {
	rootScope.managers.appProfileManager.getProfileByPeerId(peerId, overwrite).then((fullPeer) => {
		if (overwrite !== false) expirations.set(peerId, Date.now() + PEER_FULL_TTL);
		setState$1(peerId, reconcile(fullPeer));
	});
};
hotListen(void 0, rootScope, "peer_full_update", requestFullPeer);
hotListen(void 0, rootScope, "account_switched", () => {
	expirations.clear();
	setState$1(reconcile({}));
});
function _useFullPeer(peerId) {
	const fullPeer = () => state$1[peerId];
	const expiration = expirations.get(peerId);
	if (!expiration || !fullPeer()) requestFullPeer(peerId, false);
	const delay = (expiration || 0) - Date.now();
	const timeout = delay > 0 ? setTimeout(() => {
		requestFullPeer(peerId, true);
	}, delay) : 0;
	const interval = setInterval(() => {
		requestFullPeer(peerId, true);
	}, PEER_FULL_TTL);
	onCleanup(() => {
		clearInterval(interval);
		clearTimeout(timeout);
	});
	return fullPeer;
}
function useFullPeer(peerId) {
	return useDynamicCachedValue(() => "useFullPeer-" + peerId, () => _useFullPeer(peerId))();
}
//#endregion
//#region src/lib/tinyld/detect.ts
var worker;
var promises;
function detectLanguage(text) {
	if (!worker) {
		worker = new Worker(new URL(
			/* @vite-ignore */
			"/Monolith/tinyld.worker-CjcBrGJI.js",
			"" + import.meta.url
		), { type: "module" });
		worker.addEventListener("message", (e) => {
			const { lang } = e.data;
			promises.shift().resolve(lang);
		});
		promises = [];
	}
	const deferred = deferredPromise();
	promises.push(deferred);
	worker.postMessage({ text });
	return deferred;
}
//#endregion
//#region src/lib/tinyld/languages.ts
var Languages = [
	["af", "Afrikaans"],
	["sq", "Shqip"],
	["am", "አማርኛ"],
	["ar", "العربية"],
	["hy", "Հայերեն"],
	["az", "Azərbaycan dili"],
	["eu", "Euskara"],
	["be", "Беларуская"],
	["bn", "বাংলা"],
	["bs", "Bosanski"],
	["bg", "Български"],
	["ca", "Català"],
	["ceb", "Cebuano"],
	["zh-CN", "简体中文"],
	["zh", "中文"],
	["zh-TW", "繁體中文"],
	["co", "Corsu"],
	["hr", "Hrvatski"],
	["cs", "Čeština"],
	["da", "Dansk"],
	["nl", "Nederlands"],
	["en", "English"],
	["eo", "Esperanto"],
	["et", "Eesti"],
	["fi", "Suomi"],
	["fr", "Français"],
	["fy", "Frysk"],
	["gl", "Galego"],
	["ka", "ქართული"],
	["de", "Deutsch"],
	["el", "Ελληνικά"],
	["gu", "ગુજરાતી"],
	["ht", "Kreyòl ayisyen"],
	["ha", "Hausa"],
	["haw", "ʻŌlelo Hawaiʻi"],
	["he", "עברית"],
	["iw", "עברית"],
	["hi", "हिन्दी"],
	["hmn", "Hmoob"],
	["hu", "Magyar"],
	["is", "Íslenska"],
	["ig", "Igbo"],
	["id", "Indonesia"],
	["ga", "Gaeilge"],
	["it", "Italiano"],
	["ja", "日本語"],
	["jv", "Basa Jawa"],
	["kn", "ಕನ್ನಡ"],
	["kk", "Қазақ тілі"],
	["km", "ភាសាខ្មែរ"],
	["rw", "Kinyarwanda"],
	["ko", "한국어"],
	["ku", "Kurdî"],
	["ky", "Кыргызча"],
	["lo", "ລາວ"],
	["la", "Latina"],
	["lv", "Latviešu"],
	["lt", "Lietuvių"],
	["lb", "Lëtzebuergesch"],
	["mk", "Македонски"],
	["mg", "Malagasy"],
	["ms", "Bahasa Melayu"],
	["ml", "മലയാളം"],
	["mt", "Malti"],
	["mi", "Māori"],
	["mr", "मराठी"],
	["mn", "Монгол"],
	["my", "ဗမာ"],
	["ne", "नेपाली"],
	["no", "Norsk"],
	["ny", "Chichewa"],
	["or", "ଓଡ଼ିଆ"],
	["ps", "پښتو"],
	["fa", "فارسی"],
	["pl", "Polski"],
	["pt", "Português"],
	["pa", "ਪੰਜਾਬੀ"],
	["ro", "Română"],
	["ru", "Русский"],
	["sm", "Gagana fa'a Samoa"],
	["gd", "Gàidhlig"],
	["sr", "Српски"],
	["st", "Sesotho"],
	["sn", "Shona"],
	["sd", "سنڌي"],
	["si", "සිංහල"],
	["sk", "Slovenčina"],
	["sl", "Slovenščina"],
	["so", "Soomaali"],
	["es", "Español"],
	["su", "Basa Sunda"],
	["sw", "Kiswahili"],
	["sv", "Svenska"],
	["tl", "Tagalog"],
	["tg", "Тоҷикӣ"],
	["ta", "தமிழ்"],
	["tt", "Татар теле"],
	["te", "తెలుగు"],
	["th", "ไทย"],
	["tr", "Türkçe"],
	["tk", "Türkmen"],
	["uk", "Українська"],
	["ur", "اردو"],
	["ug", "ئۇيغۇرچە"],
	["uz", "O‘zbek"],
	["vi", "Tiếng Việt"],
	["cy", "Cymraeg"],
	["xh", "isiXhosa"],
	["yi", "ייִדיש"],
	["yo", "Yorùbá"],
	["zu", "isiZulu"]
];
//#endregion
//#region src/helpers/getDoNotTranslateLanguages.ts
/**
* The languages not to offer a translation of. Until the user picks them (Settings → Language → Do not translate):
* the interface's language, and the browser's when a translation knows it - shown in that list and taken off there
* like any other, as Android does with the system language. Once picked, the list is the user's alone
*/
function getDoNotTranslateLanguages(picked) {
	if (picked.length) return picked;
	const languages = [langPack_default.langCodeNormalized()];
	const browserLanguage = navigator.language?.split("-")[0];
	if (browserLanguage && !languages.includes(browserLanguage) && Languages.some(([iso2]) => iso2 === browserLanguage)) languages.push(browserLanguage);
	return languages;
}
/**
* A language put on the list from a chat goes onto the list the user sees: one never picked is the default one, which
* stays on it
*/
function addDoNotTranslateLanguage(picked, language) {
	const languages = getDoNotTranslateLanguages(picked);
	return languages.includes(language) ? languages : [...languages, language];
}
var state;
var setState;
var myLanguages;
var processingMessages = /* @__PURE__ */ new Map();
var _createStore = () => {
	_createStore = void 0;
	[state, setState] = createStore({});
	createRoot(() => {
		const [appSettings] = useAppSettings();
		myLanguages = createMemo(() => {
			return new Set(getDoNotTranslateLanguages(appSettings.translations.doNotTranslate).concat(langPack_default.langCodeNormalized()));
		});
		createEffect(on(myLanguages, (myLanguages) => batch(() => {
			for (const peerId in state) {
				const current = state[peerId];
				if (!current) continue;
				let newTotalForeign = 0;
				for (const lang in current.languages) if (!myLanguages.has(lang)) newTotalForeign += current.languages[lang];
				setState(peerId.toPeerId(), "totalForeign", newTotalForeign);
			}
		}), { defer: true }));
	});
	const onMessageEdit = (peerId, mid, message) => {
		const key = getMessageKey(peerId, mid);
		if (!isMessageTracked(peerId, mid, key)) return;
		if (message._ === "message") processMessageForTranslation(peerId, mid, message).catch(() => {});
		else forgetMessageForTranslation(peerId, mid, key);
	};
	rootScope.addEventListener("message_edit", ({ peerId, mid, message }) => {
		onMessageEdit(peerId, mid, message);
	});
	rootScope.addEventListener("ephemeral_history_edit", ({ peerId, mid, message }) => {
		onMessageEdit(peerId, mid, message);
	});
	const onMessagesDelete = (peerId, msgs) => {
		for (const mid of msgs) {
			const key = getMessageKey(peerId, mid);
			if (isMessageTracked(peerId, mid, key)) forgetMessageForTranslation(peerId, mid, key);
		}
	};
	rootScope.addEventListener("history_delete", ({ peerId, msgs }) => {
		onMessagesDelete(peerId, msgs);
	});
	rootScope.addEventListener("ephemeral_history_delete", ({ peerId, msgs }) => {
		onMessagesDelete(peerId, msgs);
	});
	rootScope.addEventListener("peer_history_flush", ({ peerId }) => {
		resetPeerLanguage(peerId);
	});
	rootScope.addEventListener("state_cleared", resetPeerLanguages);
	rootScope.addEventListener("account_switched", resetPeerLanguages);
};
function createEmpty() {
	return {
		messages: {},
		languages: {},
		language: void 0,
		total: 0,
		totalForeign: 0
	};
}
function setPeerLanguageLoaded(peerId) {
	_createStore?.();
	if (!untrack(() => state[peerId])) setState(peerId, createEmpty());
	setState(peerId, "isFull", true);
}
function resetPeerLanguage(peerId) {
	_createStore?.();
	const keyPrefix = `${peerId}_`;
	for (const key of processingMessages.keys()) if (key.startsWith(keyPrefix)) processingMessages.delete(key);
	setState(peerId, void 0);
}
function resetPeerLanguages() {
	processingMessages.clear();
	for (const peerId of untrack(() => Object.keys(state))) setState(+peerId, void 0);
}
function getMessageKey(peerId, mid) {
	return `${peerId}_${mid}`;
}
function hashMessageContent(value) {
	let first = 2166136261;
	let second = 2654435769;
	for (let index = 0; index < value.length; ++index) {
		const code = value.charCodeAt(index);
		first = Math.imul(first ^ code, 16777619);
		second = Math.imul(second ^ code, 2246822507);
	}
	return `${value.length}:${first >>> 0}:${second >>> 0}`;
}
/**
* The text a message actually shows. A rich message keeps its content in `rich_message` and
* leaves `message` empty, so anything deciding "what does this message say" has to come here.
*/
function getMessageSourceText(message) {
	return message.rich_message ? flattenRichMessageContent(message.rich_message).text : message.message || "";
}
function getMessageTranslationSourceToken(message, sourceText = getMessageSourceText(message)) {
	return `${message.edit_date || 0}:${hashMessageContent(sourceText)}`;
}
function getCurrentMessage(peerId, mid) {
	const message = apiManagerProxy.getMessageByPeer(peerId, mid);
	return message?._ === "message" ? message : void 0;
}
function isMessageTracked(peerId, mid, key = getMessageKey(peerId, mid)) {
	return !!untrack(() => state[peerId]?.messages[mid]) || processingMessages.has(key);
}
function updatePeerLanguage(peerId) {
	const current = untrack(() => state[peerId]);
	if (!current) return;
	let language = current.language;
	let count = current.languages[language] || 0;
	for (const lang in current.languages) {
		const nextCount = current.languages[lang] || 0;
		if (nextCount > count) {
			language = lang;
			count = nextCount;
		}
	}
	if (!count) language = void 0;
	if (language !== current.language) setState(peerId, "language", language);
}
function removeMessageLanguage(peerId, mid) {
	const current = untrack(() => state[peerId]);
	const entry = current?.messages[mid];
	if (!entry) return;
	const { language } = entry;
	const languageCount = current.languages[language] || 0;
	const isForeign = !myLanguages().has(language);
	batch(() => {
		setState(peerId, "messages", mid, void 0);
		setState(peerId, "languages", language, languageCount > 1 ? languageCount - 1 : void 0);
		setState(peerId, "total", Math.max(0, current.total - 1));
		if (isForeign) setState(peerId, "totalForeign", Math.max(0, current.totalForeign - 1));
		updatePeerLanguage(peerId);
	});
}
function addMessageLanguage(peerId, mid, token, language) {
	batch(() => {
		let current = untrack(() => state[peerId]);
		if (!current) setState(peerId, current = createEmpty());
		else if (current.messages[mid]) {
			removeMessageLanguage(peerId, mid);
			current = untrack(() => state[peerId]);
		}
		const languageCount = (current.languages[language] || 0) + 1;
		setState(peerId, "messages", mid, {
			language,
			token
		});
		setState(peerId, "languages", language, languageCount);
		setState(peerId, "total", current.total + 1);
		if (!myLanguages().has(language)) setState(peerId, "totalForeign", current.totalForeign + 1);
		updatePeerLanguage(peerId);
	});
}
function forgetMessageForTranslation(peerId, mid, key = getMessageKey(peerId, mid)) {
	processingMessages.delete(key);
	removeMessageLanguage(peerId, mid);
}
function processMessageForTranslation(peerId, mid, source) {
	_createStore?.();
	if (!Number.isInteger(mid)) return Promise.resolve();
	const messageSource = source && "_" in source ? source : void 0;
	const textSource = source && !("_" in source) ? source : void 0;
	const message = messageSource || getCurrentMessage(peerId, mid);
	if (!message || message.pFlags.currentlyTyping) return Promise.resolve();
	const text = textSource?.sourceText ?? getMessageSourceText(message);
	const token = textSource?.sourceToken || getMessageTranslationSourceToken(message, text);
	if (untrack(() => state[peerId]?.messages[mid])?.token === token) return Promise.resolve();
	const key = getMessageKey(peerId, mid);
	const currentProcessing = processingMessages.get(key);
	if (currentProcessing?.token === token) return currentProcessing.promise;
	forgetMessageForTranslation(peerId, mid, key);
	if (!text) return Promise.resolve();
	const processing = { token };
	processing.promise = Promise.resolve().then(() => detectLanguage(text)).then((language) => {
		if (processingMessages.get(key) !== processing) return;
		const currentMessage = getCurrentMessage(peerId, mid);
		if (!currentMessage || getMessageTranslationSourceToken(currentMessage) !== token) return;
		addMessageLanguage(peerId, mid, token, language);
	}).finally(() => {
		if (processingMessages.get(key) === processing) processingMessages.delete(key);
	});
	processingMessages.set(key, processing);
	return processing.promise;
}
function usePeerLanguage(peerId, onlyIfForeign) {
	return createMemo(() => {
		const _peerId = peerId();
		if (!_peerId) return;
		_createStore?.();
		const current = state[_peerId];
		if (current && current.total < 8 && !current.isFull) return;
		if (onlyIfForeign && current && current.totalForeign / current.total < .65) return;
		return current?.language;
	});
}
//#endregion
//#region src/stores/premium.ts
var [premium, setPremium] = createRoot(() => createSignal(rootScope.premium));
var onAuth = () => {
	rootScope.managers.rootScope.getPremium().then(setPremium);
};
hotListen(void 0, rootScope, "premium_toggle", setPremium);
hotListen(void 0, rootScope, "premium_toggle_private", ({ isPremium }) => setPremium(isPremium));
if (rootScope.myId) onAuth();
else hotListen(void 0, rootScope, "user_auth", onAuth);
function usePremium() {
	return premium;
}
//#endregion
//#region src/hooks/usePeerTranslation.ts
function _usePeerTranslation(peerId) {
	const [appSettings, setAppSettings] = useAppSettings();
	const [appState] = useAppState();
	const fullPeer = useFullPeer(peerId);
	const peer = usePeer(() => peerId);
	const peerLanguage = usePeerLanguage(() => peerId, true);
	const isPremium = usePremium();
	const areTranslationsAvailable = (manual) => {
		if (appState.appConfig.freeze_since_date) return false;
		const appConfig = appState?.appConfig;
		if ((manual ? appConfig?.translations_manual_enabled : appConfig?.translations_auto_enabled) !== "enabled") return false;
		return true;
	};
	const canTranslate = (manual) => {
		if (!areTranslationsAvailable(manual)) return false;
		if (manual) return true;
		return isPremium() || !!peer() && !!peer().pFlags.autotranslation;
	};
	const shouldShow = createMemo(() => {
		if (!canTranslate() || !peerLanguage() || !appSettings.translations.enabled) return;
		const _fullPeer = fullPeer();
		if (!_fullPeer || "pFlags" in _fullPeer && _fullPeer.pFlags.translations_disabled || appSettings.translations.doNotTranslate.includes(peerLanguage())) return false;
		return true;
	});
	const ret = {
		peerLanguage,
		language: () => appSettings.translations.peers[peerId] || langPack_default.langCodeNormalized(),
		setLanguage: (lang) => setAppSettings("translations", "peers", peerId, lang),
		enabled: createMemo(() => !!(canTranslate() && appSettings.translations.enabled && appSettings.translations.enabledPeers[peerId]) && shouldShow()),
		toggle: (enabled) => setAppSettings("translations", "enabledPeers", peerId, enabled ? true : void 0),
		shouldShow,
		canTranslate,
		areTranslationsAvailable
	};
	createEffect(() => {
		if (ret.shouldShow() === false && ret.enabled()) ret.toggle(false);
	});
	return ret;
}
function usePeerTranslation(peerId) {
	return useDynamicCachedValue(() => "usePeerTranslation-" + peerId, () => _usePeerTranslation(peerId))();
}
//#endregion
//#region src/components/translatableMessage.ts
var USE_OBSERVER = false;
function TranslatableMessageTsx(props) {
	const useObserver = USE_OBSERVER;
	const [visible, setVisible] = createSignal(true);
	const wasVisible = createMemo((prev) => prev || visible());
	const [textWithEntities, setTextWithEntities] = createSignal();
	const translation = usePeerTranslation(props.peerId);
	const deferred = deferredPromise();
	onCleanup(() => deferred.resolve());
	let originalText = props.textWithEntities;
	let first = true, hadText = false;
	const dontShowOriginalFirst = props.enabled;
	const container = props.container ?? document.createElement("span");
	container.classList.add("translatable-message");
	if (props.message) {
		processMessageForTranslation(props.peerId, props.message.mid);
		originalText = {
			_: "textWithEntities",
			text: props.message.message,
			entities: props.message.totalEntities
		};
	}
	if (props.richTextOptions?.loadPromises) props.richTextOptions.loadPromises.push(deferred);
	const translate = (lang, onlyCache) => {
		return modifyAckedPromise(rootScope.managers.acknowledged.appTranslationsManager.translateText({
			...props.message ? {
				peerId: props.message.peerId,
				mid: props.message.mid
			} : { text: props.textWithEntities },
			lang,
			onlyCache
		}));
	};
	const summarizeText = (lang) => {
		return modifyAckedPromise(rootScope.managers.acknowledged.appTranslationsManager.summarizeText({
			peerId: props.peerId,
			mid: props.message.mid,
			lang
		}));
	};
	const setOriginalText = (loading) => {
		setTextWithEntities(originalText);
		container.classList.toggle("text-loading", !!loading);
	};
	if (props.observer && props.observeElement && useObserver);
	createEffect(async () => {
		const middleware = createMiddleware().get();
		const _first = first;
		first = false;
		const summarizing = props.summarizing?.();
		if (!summarizing && (!translation.enabled() && !props.enabled || !wasVisible() && !_first)) {
			setOriginalText();
			return;
		}
		const r = await (summarizing ? summarizeText(translation.enabled() ? translation.language() : void 0) : translate(translation.language(), _first && useObserver));
		if (!middleware()) return;
		if (!r.cached) {
			if (!dontShowOriginalFirst && !untrack(textWithEntities)) setOriginalText(true);
			else container.classList.add("text-loading");
		} else if (!r.result) {
			setOriginalText();
			return;
		}
		try {
			const textWithEntities$ = await r.result;
			if (!middleware()) return;
			if (!textWithEntities$) {
				setOriginalText();
				return;
			}
			setTextWithEntities(textWithEntities$);
		} catch (err) {
			if (!middleware()) return;
			setOriginalText();
			props.onError?.(err);
		}
	});
	createEffect(() => {
		let r = textWithEntities();
		if (!r) return;
		if (props.onTextWithEntities) r = props.onTextWithEntities(r);
		if (originalText !== r || !props.message) r = wrapTextWithEntities(r);
		const middleware = createMiddleware().get();
		const loadPromises = [];
		let wrapped = wrapRichText(r.text, {
			...props.richTextOptions || {},
			loadPromises,
			entities: r.entities
		});
		Promise.all(loadPromises).then(() => {
			if (!middleware()) return;
			const set = () => {
				if (!middleware()) return;
				deferred.resolve();
				if (props.onFragment) wrapped = props.onFragment(wrapped);
				container.replaceChildren(wrapped);
				if (hadText || dontShowOriginalFirst) container.classList.remove("text-loading");
				hadText = true;
			};
			if (hadText && props.onTranslation) {
				props.onTranslation(set);
				return;
			}
			set();
		});
	});
	return container;
}
function TranslatableMessage(props) {
	return createRoot((dispose) => {
		props.middleware.onDestroy(dispose);
		return TranslatableMessageTsx(props);
	});
}
//#endregion
//#region src/components/wrappers/messageActionTextNew.ts
async function wrapMessageActionTextNew(options) {
	try {
		return await wrapMessageActionTextNewUnsafe(options);
	} catch (err) {
		console.error("wrapMessageActionTextNewUnsafe error:", err);
		return options.plain ? "" : document.createElement("span");
	}
}
//#endregion
//#region src/components/generateFakeIcon.ts
function generateFakeIcon(isScam) {
	const span = document.createElement("span");
	span.classList.add("badge-fake");
	_i18n(span, isScam ? "ScamMessage" : "FakeMessage");
	return span;
}
//#endregion
//#region src/components/generatePremiumIcon.ts
function generatePremiumIcon() {
	return Icon("star", "premium-icon");
}
//#endregion
//#region src/components/generateVerifiedIcon.ts
function generateVerifiedIcon() {
	const span = document.createElement("span");
	span.classList.add("verified-icon");
	const size = 26;
	const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	svg.setAttributeNS(null, "viewBox", `0 0 ${size} ${size}`);
	svg.setAttributeNS(null, "width", `${size}`);
	svg.setAttributeNS(null, "height", `${size}`);
	svg.classList.add("verified-icon-svg");
	const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
	use.setAttributeNS(null, "href", "#verified-icon-background");
	use.classList.add("verified-icon-background");
	const use2 = document.createElementNS("http://www.w3.org/2000/svg", "use");
	use2.setAttributeNS(null, "href", "#verified-icon-check");
	use2.classList.add("verified-icon-check");
	svg.append(use2, use);
	span.append(svg);
	return span;
}
//#endregion
//#region src/components/wrappers/markTextColorEmoji.ts
/**
* Whether a custom emoji is drawn in the text's colour; the container of one that is gets the class a later
* recolouring finds it by (a selected chat-list row, see changeTitleEmojiColor)
*/
function markTextColorEmoji(container, doc) {
	const isTextColor = !!doc.attributes.find((attribute) => attribute._ === "documentAttributeCustomEmoji")?.pFlags.text_color;
	if (isTextColor) container.classList.add("emoji-status-text-color");
	return isTextColor;
}
//#endregion
//#region src/components/wrappers/customEmojiSimple.ts
function wrapAdaptiveCustomEmoji(options) {
	const { docId, size, wrapOptions, as } = options;
	const container = document.createElement(as || "div");
	container.classList.add("custom-emoji");
	const loadPromise = (async () => {
		const doc = await rootScope.managers.appEmojiManager.getCustomEmojiDocument(docId);
		const isTextColor = markTextColorEmoji(container, doc);
		await wrapSticker({
			doc,
			div: container,
			width: size,
			height: size,
			play: false,
			withThumb: false,
			group: "none",
			static: !isTextColor && !wrapOptions?.textColor,
			middleware: wrapOptions?.middleware,
			textColor: wrapOptions?.textColor,
			lazyLoadQueue: wrapOptions?.lazyLoadQueue === false ? void 0 : wrapOptions?.lazyLoadQueue,
			managers: wrapOptions?.managers,
			noOffscreen: true
		}).then((res) => res.render);
	})();
	loadPromise.catch(noop);
	return {
		container,
		loadPromise
	};
}
//#endregion
//#region src/components/sparkles.ts
var BUTTON_SPARKLES = [
	{
		x: 20,
		y: 0,
		scale: 1,
		delay: 500
	},
	{
		x: 15,
		y: 15,
		scale: .75,
		delay: 3500
	},
	{
		x: 10,
		y: 35,
		scale: .75,
		delay: 4500
	},
	{
		x: 20,
		y: 70,
		scale: 1.25,
		delay: 1500
	},
	{
		x: 40,
		y: 10,
		scale: 1.25,
		delay: 0
	},
	{
		x: 45,
		y: 60,
		scale: .75,
		delay: 3e3
	},
	{
		x: 60,
		y: -10,
		scale: 1,
		delay: 1e3
	},
	{
		x: 55,
		y: 40,
		scale: .75,
		delay: 3e3
	},
	{
		x: 70,
		y: 65,
		scale: 1,
		delay: 4500
	},
	{
		x: 80,
		y: 10,
		scale: .75,
		delay: 1500
	},
	{
		x: 80,
		y: 45,
		scale: 1.25,
		delay: 0
	}
].map((it) => ({
	...it,
	translateX: Math.cos(Math.atan2(-50 + it.y, -50 + it.x)) * 100,
	translateY: Math.sin(Math.atan2(-50 + it.y, -50 + it.x)) * 100
}));
function generateProgressSparkle() {
	return {
		x: Math.random() * 100,
		y: Math.random() * 100,
		translateX: (Math.random() * 5 + 15) * 100,
		translateY: (Math.random() * 10 - 5) * 100,
		scale: Math.random() * .5 + .5,
		delay: Math.random() * 5e3
	};
}
var sparkleTemplate = template(`<svg viewBox="0 0 7 7" xmlns="http://www.w3.org/2000/svg" height="1em" width="1em"><use href="#star-sparkle"></use></svg>`);
function renderSparkle(sparkle, { isDiv, containerSize, fixedScale } = {}) {
	let element;
	if (isDiv) {
		element = document.createElement("div");
		element.textContent = "✦";
	} else element = sparkleTemplate();
	element.classList.add("sparkles-sparkle");
	element.style.setProperty("--sparkle-tx", containerSize ? sparkle.translateX / 100 * containerSize.width + "px" : sparkle.translateX + "%");
	element.style.setProperty("--sparkle-ty", containerSize ? sparkle.translateY / 100 * containerSize.height + "px" : sparkle.translateY + "%");
	element.style.setProperty("--sparkle-scale", fixedScale ? sparkle.scale + "" : sparkle.scale * (Math.random() * .5 + .25) + "");
	element.style.setProperty("--sparkle-rotate", (Math.random() * 90 - 45) * 4 + "deg");
	if (sparkle.minOpacity) element.style.setProperty("--sparkle-min-opacity", sparkle.minOpacity + "");
	element.style.transform = `scale(${sparkle.scale})`;
	element.style.top = containerSize ? sparkle.y / 100 * containerSize.height + "px" : sparkle.y + "%";
	element.style.left = containerSize ? sparkle.x / 100 * containerSize.width + "px" : sparkle.x + "%";
	element.style.animationDelay = "-" + sparkle.delay + "ms";
	return element;
}
var TAG_NAME = "sparkles-container";
var observer$1 = createAppWindowIntersectionObserver((entries) => {
	for (const entry of entries) entry.target.classList.toggle("is-paused", !entry.isIntersecting);
});
var SparklesContainerElement = class extends HTMLElement {
	connectedCallback() {
		observer$1.observe(this);
	}
	disconnectedCallback() {
		observer$1.unobserve(this);
	}
};
if (!customElements.get(TAG_NAME)) customElements.define(TAG_NAME, SparklesContainerElement);
function Sparkles(props) {
	const container = new (customElements.get(TAG_NAME))();
	container.classList.add("sparkles-container");
	const sparkleOptions = { ...props };
	if (props.mode === "button") {
		if (props.duration) container.style.setProperty("--sparkles-duration", props.duration + "ms");
		container.append(...(props.sparkles || BUTTON_SPARKLES).map((sparkle) => renderSparkle(sparkle, sparkleOptions)));
	} else createEffect(on(() => props.count, (next, prev = 0) => {
		const diff = next - prev;
		if (diff > 0) for (let i = 0; i < diff; i++) container.appendChild(renderSparkle(generateProgressSparkle(), sparkleOptions));
		else if (diff < 0) for (let i = 0; i < -diff; i++) container.lastChild.remove();
	}));
	return container;
}
//#endregion
//#region src/components/wrappers/emojiStatus.ts
var RENDER_SPARKLES = false;
var ignoreCancelled = (err) => {
	if (err?.type !== "MIDDLEWARE") throw err;
};
async function wrapEmojiStatus({ wrapOptions, emojiStatus, size = mediaSizes.active.emojiStatus }) {
	const { middleware, animationGroup, textColor } = wrapOptions;
	const container = document.createElement("span");
	container.classList.add("emoji-status");
	const result = await rootScope.managers.acknowledged.appEmojiManager.getCustomEmojiDocument(emojiStatus.document_id);
	const wrap = async (doc) => {
		if (!middleware()) return;
		const loadPromises = [];
		markTextColorEmoji(container, doc);
		const { render } = await wrapSticker({
			doc,
			div: container,
			width: size.width,
			height: size.height,
			loop: 2,
			play: true,
			group: animationGroup || "EMOJI-STATUS",
			loadPromises,
			middleware,
			static: doc.mime_type === "video/webm" && !IS_WEBM_SUPPORTED,
			textColor: textColor || "primary-color"
		});
		render?.catch(ignoreCancelled);
		if (!middleware()) return;
		await Promise.all(loadPromises).catch(ignoreCancelled);
	};
	if (emojiStatus._ === "emojiStatusCollectible" && RENDER_SPARKLES);
	if (!middleware()) return container;
	const p = result.result.then(wrap);
	if (result.cached) await p;
	return container;
}
//#endregion
//#region src/components/generateTitleIcons.ts
async function generateTitleIcons({ peerId, noVerifiedIcon, noBotVerifiedIcon, noFakeIcon, noPremiumIcon, noDirectMessagesBadge, peer, wrapOptions, clickableEmojiStatus = false }) {
	peer ?? (peer = apiManagerProxy.getPeer(peerId));
	const elements = [];
	if (!peer) return { elements };
	if ((peer.pFlags.fake || peer.pFlags.scam) && !noFakeIcon) elements.push(generateFakeIcon(peer.pFlags.scam));
	if (!noPremiumIcon && wrapOptions?.middleware) {
		const emojiStatus = peer.emoji_status;
		const isPremiumFeaturesHidden = await apiManagerProxy.isPremiumFeaturesHidden();
		if (emojiStatus && "document_id" in emojiStatus && !isPremiumFeaturesHidden) {
			const { middleware } = wrapOptions;
			const container = await wrapEmojiStatus({
				emojiStatus,
				wrapOptions
			});
			if (clickableEmojiStatus) {
				container.classList.add("clickable");
				let busy = false;
				const detach = attachClickEvent(container, async (e) => {
					e.stopPropagation();
					if (peerId === rootScope.myId) hotReloadGuard.openEmojiStatusPicker({
						managers: bindManagersToSession(rootScope.managers),
						anchorElement: container
					});
					else if (emojiStatus._ === "emojiStatusCollectible") {
						if (busy) return;
						busy = true;
						const gift = await rootScope.managers.appGiftsManager.getGiftBySlug(emojiStatus.slug);
						hotReloadGuard.showStarGiftInfoPopup({ gift });
						busy = false;
					} else hotReloadGuard.showPremiumPopup({
						peerId,
						emojiStatusId: emojiStatus.document_id
					});
				});
				middleware.onDestroy(detach);
			}
			if (!middleware()) return { elements };
			elements.push(container);
		} else if (peer.pFlags.premium && !isPremiumFeaturesHidden) {
			const premiumIcon = generatePremiumIcon();
			if (clickableEmojiStatus) {
				premiumIcon.classList.add("clickable");
				const detach = attachClickEvent(premiumIcon, (e) => {
					e.stopPropagation();
					hotReloadGuard.showPremiumPopup({ peerId });
				});
				wrapOptions.middleware.onDestroy(detach);
			}
			elements.push(premiumIcon);
		}
	}
	if (peer.pFlags.verified && !noVerifiedIcon) elements.push(generateVerifiedIcon());
	if (peer?._ === "channel" && peer.pFlags?.monoforum && !noDirectMessagesBadge) {
		const span = document.createElement("span");
		span.append(i18n("ChannelDirectMessages.Badge"));
		span.classList.add("peer-title-direct-badge");
		elements.push(span);
	}
	let botVerification;
	if (peer.bot_verification_icon && !noBotVerifiedIcon) {
		const { container } = wrapAdaptiveCustomEmoji({
			docId: peer.bot_verification_icon,
			size: 24,
			wrapOptions: {
				...wrapOptions,
				textColor: wrapOptions?.textColor === "white" ? "white" : "primary-color"
			}
		});
		botVerification = container;
		container.classList.add("peer-title-bot-verification");
	}
	return {
		elements,
		botVerification
	};
}
//#endregion
//#region src/components/peerTitle.ts
var weakMap = /* @__PURE__ */ new WeakMap();
hotListen(void 0, rootScope, "peer_title_edit", ({ peerId, threadId }) => {
	let query = `.peer-title[data-peer-id="${peerId}"]`;
	if (threadId) query += `[data-thread-id="${threadId}"]`;
	Array.from(document.querySelectorAll(query)).forEach((element) => {
		weakMap.get(element)?.update();
	});
});
hotListen(void 0, rootScope, "botforum_pending_topic_created", ({ peerId, tempId, newId }) => {
	if (!newId) return;
	const query = `.peer-title[data-peer-id="${peerId}"][data-thread-id="${tempId}"]`;
	Array.from(document.querySelectorAll(query)).forEach((element) => {
		const peerTitle = weakMap.get(element);
		peerTitle?.update({
			...peerTitle.options,
			threadId: newId
		});
	});
});
var PeerTitle = class {
	constructor(options) {
		this.element = document.createElement(options?.link ? "a" : "span");
		this.element.classList.add("peer-title");
		setDirection(this.element);
		if (options?.link) {
			if (!Modes.a11y) this.element.tabIndex = -1;
			this.element.draggable = false;
			this.element.addEventListener("click", (e) => {
				if (!e.ctrlKey && !e.metaKey) e.preventDefault();
			});
		}
		this.options = {};
		if (options) this.ready = this.update(options).catch((err) => {
			console.error("peer title render failed", err);
		});
		weakMap.set(this.element, this);
	}
	setOptions(options) {
		if (!options) return;
		safeAssign(this.options, options);
		for (const i in options) {
			const value = options[i];
			if (typeof value !== "object" && typeof value !== "function") this.element.dataset[i] = value ? "" + (typeof value === "boolean" ? +value : value) : "0";
		}
	}
	setHasInner(hasInner) {
		if (this.hasInner !== hasInner) {
			this.hasInner = hasInner;
			this.element.classList.toggle("with-icons", hasInner);
		}
	}
	async update(options) {
		var _this$options;
		const managers = bindManagersToSession(rootScope.managers);
		this.setOptions(options);
		let fromName = this.options.fromName;
		if (fromName !== void 0) {
			if (this.options.limitSymbols !== void 0) fromName = limitSymbols(fromName, this.options.limitSymbols, this.options.limitSymbols);
			setInnerHTML(this.element, wrapEmojiText(fromName));
			return;
		}
		(_this$options = this.options).peerId ?? (_this$options.peerId = 0);
		if (this.element.tagName === "A") {
			const peerId = this.options.peerId;
			if (peerId === 0 || peerId === 2666e3) this.element.removeAttribute("href");
			else this.element.href = buildURLHash("" + peerId);
		}
		let hasInner;
		let { peerId, threadId } = this.options;
		if (this.options.asAllChats === "topics") {
			const title = i18n("AllMessages");
			const inner = document.createElement("span");
			inner.classList.add("peer-title-inner");
			hasInner = true;
			setInnerHTML(inner, title);
			const fragment = document.createDocumentFragment();
			const emojiText = document.createElement("span");
			emojiText.classList.add("emoji-topic-icon");
			emojiText.append(wrapEmojiText("💬"));
			fragment.append(emojiText, inner);
			setInnerHTML(this.element, fragment);
		} else if (this.options.asAllChats === "monoforum") {
			const element = i18n("AllChats");
			replaceContent(this.element, element);
		} else if (peerId === rootScope.myId && this.options.dialog) {
			let element;
			if (this.options.meAsNotes) element = i18n(this.options.onlyFirstName ? "MyNotesShort" : "MyNotes");
			else element = i18n(this.options.onlyFirstName ? "Saved" : "SavedMessages");
			replaceContent(this.element, element);
		} else if (peerId === 2666e3) replaceContent(this.element, i18n(this.options.onlyFirstName ? "AuthorHiddenShort" : "AuthorHidden"));
		else {
			if (threadId) {
				const [topic, isForum, isBotforum, isMonoforum] = await Promise.all([
					managers.dialogsStorage.getForumTopic(peerId, threadId),
					managers.appPeersManager.isForum(peerId),
					managers.appPeersManager.isBotforum(peerId),
					managers.appPeersManager.isMonoforum(peerId)
				]);
				if (isMonoforum) {
					peerId = threadId;
					threadId = void 0;
				} else if (!topic && (isForum || isBotforum)) {
					managers.dialogsStorage.getForumTopicById(peerId, threadId).then((forumTopic) => {
						if (!forumTopic && this.options.threadId === threadId) {
							this.options.threadId = void 0;
							this.update({ threadId: void 0 });
							return;
						}
						this.update();
					}, () => {
						if (this.options.threadId === threadId) {
							this.options.threadId = void 0;
							this.update({ threadId: void 0 });
						}
					});
					setInnerHTML(this.element, i18n("Loading"));
					this.setHasInner(false);
					return;
				}
			}
			const getTopicIconPromise = threadId && this.options.withIcons ? managers.dialogsStorage.getForumTopic(peerId, threadId).then((topic) => wrapTopicIcon({
				...this.options.wrapOptions ?? {},
				topic
			})) : void 0;
			const [title, icons, topicIcon] = await Promise.all([
				getPeerTitle({
					...this.options,
					peerId,
					threadId
				}),
				this.options.withIcons && generateTitleIcons({
					peerId,
					clickableEmojiStatus: this.options.clickableEmojiStatus,
					noPremiumIcon: this.options.noPremiumIcon,
					wrapOptions: {
						...this.options.wrapOptions,
						textColor: this.options.iconsColor || this.options.wrapOptions?.textColor
					}
				}) || this.options.withPremiumIcon && generateTitleIcons({
					peerId,
					wrapOptions: {
						...this.options.wrapOptions,
						textColor: this.options.iconsColor || this.options.wrapOptions?.textColor
					},
					noVerifiedIcon: true,
					noFakeIcon: true
				}),
				getTopicIconPromise
			]);
			const createInnerTitleSpan = () => {
				const inner = document.createElement("span");
				inner.classList.add("peer-title-inner");
				hasInner = true;
				setInnerHTML(inner, title);
				return inner;
			};
			const setElementContent = (nodes) => {
				const fragment = document.createDocumentFragment();
				fragment.append(...nodes);
				setInnerHTML(this.element, fragment);
			};
			if (topicIcon) setElementContent([topicIcon, createInnerTitleSpan()].filter(Boolean));
			else if (icons?.elements?.length || icons?.botVerification) setElementContent([
				icons.botVerification,
				topicIcon,
				createInnerTitleSpan(),
				...icons.elements ?? []
			].filter(Boolean));
			else setInnerHTML(this.element, title);
		}
		this.setHasInner(hasInner);
	}
};
/**
* A `PeerTitle` built during a render: the render waits for its `ready` (`loadPromises`), so what it is drawn
* into is laid out with the name already in it
*/
function createPeerTitleElement(options, loadPromises) {
	const peerTitle = new PeerTitle(options);
	loadPromises?.push(peerTitle.ready);
	return peerTitle.element;
}
function changeTitleEmojiColor(element, color) {
	element.querySelectorAll(".emoji-status-text-color").forEach((emojiStatus) => {
		const player = emojiStatus && lottieLoader.getAnimation(emojiStatus);
		if (player) player.setColor(color, true);
	});
}
//#endregion
//#region src/components/wrappers/peerTitle.tsx
var peerTitle_exports = /* @__PURE__ */ __exportAll({ default: () => wrapPeerTitle });
async function wrapPeerTitle(options) {
	const peerTitle = new PeerTitle(options);
	await peerTitle.ready;
	return peerTitle.element;
}
//#endregion
//#region src/components/wrappers/messagePreviewIcon.ts
/**
* Exact 18px preview glyphs that exist in tdesktop but are not in tweb's icon
* font yet. Keep the substitutions in one place so the real icons can replace
* them without touching message classification or rendering.
*/
var MESSAGE_PREVIEW_ICON_FALLBACKS = {
	contact: "person_filled",
	giveaway: "gift",
	invoice: "card"
};
function getTodoItemReplyPreview(media, todoItemId) {
	const item = media.todo.list.find((item) => item.id === todoItemId);
	if (!item) return;
	return {
		icon: media.completions?.some((completion) => completion.id === item.id) ? "checkboxon" : "checkboxempty",
		text: item.title
	};
}
function getServiceMessagePreviewIcon(message) {
	switch (message.action._) {
		case "messageActionPhoneCall":
		case "messageActionConferenceCall": return "phone";
		case "messageActionGiftPremium":
		case "messageActionGiftCode":
		case "messageActionGiftStars":
		case "messageActionGiftTon":
		case "messageActionStarGift":
		case "messageActionStarGiftUnique":
		case "messageActionGiveawayLaunch":
		case "messageActionGiveawayResults": return MESSAGE_PREVIEW_ICON_FALLBACKS.giveaway;
		case "messageActionGramTransfer": return "gram_filled";
	}
}
function getMessagePreviewIcon(message) {
	if (message._ === "messageService") return getServiceMessagePreviewIcon(message);
	if (message._ === "draftMessage") return;
	const media = message.media;
	switch (media?._) {
		case "messageMediaGeo":
		case "messageMediaGeoLive":
		case "messageMediaVenue": return "location";
		case "messageMediaContact": return MESSAGE_PREVIEW_ICON_FALLBACKS.contact;
		case "messageMediaDocument": {
			const document = media.document;
			if (document?.type === "audio") return "music_filled";
			if (![
				"video",
				"voice",
				"round",
				"gif",
				"sticker"
			].includes(document?.type)) return "document";
			break;
		}
		case "messageMediaInvoice": return MESSAGE_PREVIEW_ICON_FALLBACKS.invoice;
		case "messageMediaPoll": return "poll";
		case "messageMediaStory": return "story";
		case "messageMediaGiveaway":
		case "messageMediaGiveawayResults": return MESSAGE_PREVIEW_ICON_FALLBACKS.giveaway;
		case "messageMediaToDo": return "checklist_done";
		case "messageMediaWidget": return "apps";
		case "messageMediaCall": return "phone";
	}
}
//#endregion
//#region src/lib/richTextProcessor/graphemes.ts
var createSegmenter = () => {
	const Segmenter = Intl.Segmenter;
	if (!Segmenter) return;
	try {
		return new Segmenter(void 0, { granularity: "grapheme" });
	} catch {
		return;
	}
};
var segmenter = createSegmenter();
var MARK = (() => {
	try {
		return /* @__PURE__ */ new RegExp("\\p{Mark}", "u");
	} catch {
		return;
	}
})();
var codePoint = (value) => value?.codePointAt(0);
var isRegionalIndicator = (value) => {
	const point = codePoint(value);
	return point >= 127462 && point <= 127487;
};
var isEmojiModifier = (value) => {
	const point = codePoint(value);
	return point >= 127995 && point <= 127999;
};
var isVariationSelector = (value) => {
	const point = codePoint(value);
	return point >= 65024 && point <= 65039 || point >= 917760 && point <= 917999;
};
var isEmojiTag = (value) => {
	const point = codePoint(value);
	return point >= 917536 && point <= 917631;
};
var isMark = (value) => MARK ? MARK.test(value) : /[\u0300-\u036f\u1ab0-\u1aff\u1dc0-\u1dff\u20d0-\u20ff\ufe20-\ufe2f]/.test(value);
var isAttached = (value) => isMark(value) || isVariationSelector(value) || isEmojiModifier(value) || isEmojiTag(value);
/**
* A compact fallback for runtimes without `Intl.Segmenter`. `Array.from`
* keeps surrogate pairs intact; the remaining rules cover the clusters that
* occur most often in message text: combining marks, emoji modifiers,
* regional-indicator pairs, emoji tags and chained ZWJ sequences.
*/
function splitGraphemesFallbackPlain(text) {
	const points = Array.from(text);
	const result = [];
	for (let i = 0; i < points.length; ++i) {
		let current = points[i];
		if (current === "\r" && points[i + 1] === "\n") current += points[++i];
		else if (isRegionalIndicator(current) && isRegionalIndicator(points[i + 1])) current += points[++i];
		while (i + 1 < points.length) {
			const next = points[i + 1];
			if (isAttached(next)) {
				current += next;
				++i;
				continue;
			}
			if (next === "‍" && i + 2 < points.length) {
				current += next + points[i + 2];
				i += 2;
				continue;
			}
			break;
		}
		result.push(current);
	}
	return result;
}
var splitMathMarkers = (text, splitPlain) => {
	const result = [];
	const marker = new RegExp(MATH_MARKER_RE.source, MATH_MARKER_RE.flags);
	let offset = 0;
	let match;
	while (match = marker.exec(text)) {
		if (match.index > offset) result.push(...splitPlain(text.slice(offset, match.index)));
		result.push(match[0]);
		offset = match.index + match[0].length;
	}
	if (offset < text.length) result.push(...splitPlain(text.slice(offset)));
	return result;
};
var MATH_MARKER_PAYLOAD_RE = /^[A-Za-z0-9+/=]$/;
/**
* Index of the grapheme opening an unterminated inline-math marker, or -1.
*
* `splitMathMarkers` groups only COMPLETE markers, so while one is still streaming its
* opening sentinel and payload sit in the array as separate single-character tokens. The
* append fast paths below rescan the final cluster, which cannot reach back to that
* sentinel — so without this the finished marker never coalesces and reveals as raw base64.
*/
function getPendingMathMarkerIndex(length, getGrapheme) {
	for (let index = length - 1; index >= 0; --index) {
		const grapheme = getGrapheme(index);
		if (grapheme === "") return index;
		if (!MATH_MARKER_PAYLOAD_RE.test(grapheme)) return -1;
	}
	return -1;
}
/** Only a closing sentinel inside the appended text can complete a pending marker. */
function appendCanCompleteMathMarker(previousText, text) {
	return text.indexOf("", previousText.length) !== -1;
}
function splitGraphemesPlain(text) {
	if (!text) return [];
	if (!segmenter) return splitGraphemesFallbackPlain(text);
	return Array.from(segmenter.segment(text), ({ segment }) => segment);
}
/** Complete inline-math markers are one reveal token, never visible as raw base64. */
function splitGraphemes(text) {
	return splitMathMarkers(text, splitGraphemesPlain);
}
/** Sorted UTF-16 indices of every grapheme boundary, including both ends. */
function getGraphemeOffsets(text) {
	const offsets = [0];
	let offset = 0;
	for (const grapheme of splitGraphemes(text)) {
		offset += grapheme.length;
		offsets.push(offset);
	}
	return offsets;
}
/**
* Re-segments only the previous tail cluster when text is appended. A new
* code point can change the final cluster (ZWJ, combining mark, RI, CRLF), but
* cannot affect a completed cluster before it.
*/
function updateGraphemes(previousText, previousGraphemes, text, append = text.startsWith(previousText), details) {
	if (text === previousText) {
		if (details) details.changedFrom = previousGraphemes.length;
		return previousGraphemes;
	}
	if (!previousText || !append || !previousGraphemes.length) {
		const graphemes = splitGraphemes(text);
		if (details) details.changedFrom = getCommonGraphemePrefixLength(previousGraphemes, graphemes);
		return graphemes;
	}
	const pendingIndex = appendCanCompleteMathMarker(previousText, text) ? getPendingMathMarkerIndex(previousGraphemes.length, (index) => previousGraphemes[index]) : -1;
	const rescanIndex = pendingIndex === -1 ? previousGraphemes.length - 1 : pendingIndex;
	let rescanFrom = previousText.length;
	for (let index = previousGraphemes.length - 1; index >= rescanIndex; --index) rescanFrom -= previousGraphemes[index].length;
	const nextTail = splitGraphemes(text.slice(rescanFrom));
	const tailCommonPrefix = getCommonGraphemePrefixLength(previousGraphemes.slice(rescanIndex), nextTail);
	previousGraphemes.splice(rescanIndex, previousGraphemes.length - rescanIndex, ...nextTail);
	if (details) details.changedFrom = rescanIndex + tailCommonPrefix;
	return previousGraphemes;
}
/** Incremental counterpart of `getGraphemeOffsets` for append-only updates. */
function updateGraphemeOffsets(previousText, previousOffsets, text, append = text.startsWith(previousText)) {
	if (text === previousText) return previousOffsets;
	if (!previousText || !append || previousOffsets.length < 2) return getGraphemeOffsets(text);
	const pendingIndex = appendCanCompleteMathMarker(previousText, text) ? getPendingMathMarkerIndex(previousOffsets.length - 1, (index) => previousText.slice(previousOffsets[index], previousOffsets[index + 1])) : -1;
	const rescanIndex = pendingIndex === -1 ? previousOffsets.length - 2 : pendingIndex;
	const rescanFrom = previousOffsets[rescanIndex];
	const tail = getGraphemeOffsets(text.slice(rescanFrom));
	previousOffsets.length = rescanIndex + 1;
	for (let index = 1; index < tail.length; ++index) previousOffsets.push(rescanFrom + tail[index]);
	return previousOffsets;
}
/** Smallest grapheme boundary greater than or equal to `offset`. */
function snapGraphemeOffsetUp(offsets, offset) {
	let low = 0;
	let high = offsets.length - 1;
	while (low < high) {
		const middle = low + high >>> 1;
		if (offsets[middle] < offset) low = middle + 1;
		else high = middle;
	}
	return offsets[low];
}
/** Largest grapheme boundary less than or equal to `offset`. */
function snapGraphemeOffsetDown(offsets, offset) {
	let low = 0;
	let high = offsets.length - 1;
	while (low < high) {
		const middle = low + high + 1 >>> 1;
		if (offsets[middle] > offset) high = middle - 1;
		else low = middle;
	}
	return offsets[low];
}
function getCommonGraphemePrefixLength(left, right) {
	const length = Math.min(left.length, right.length);
	let index = 0;
	while (index < length && left[index] === right[index]) ++index;
	return index;
}
//#endregion
//#region src/lib/richTextProcessor/sliceTextWithEntities.ts
var ATOMIC = /* @__PURE__ */ new Set([
	"messageEntityMention",
	"messageEntityMentionName",
	"inputMessageEntityMentionName",
	"messageEntityHashtag",
	"messageEntityCashtag",
	"messageEntityBotCommand",
	"messageEntityUrl",
	"messageEntityTextUrl",
	"messageEntityEmail",
	"messageEntityPhone",
	"messageEntityBankCard",
	"messageEntityCustomEmoji",
	"messageEntityEmoji",
	"messageEntityImage",
	"messageEntityPre",
	"messageEntityTimestamp",
	"messageEntityFormattedDate",
	"messageEntityAnchor",
	"messageEntityDiffReplace"
]);
var ZERO_LENGTH = /* @__PURE__ */ new Set(["messageEntityCaret"]);
var isAtomicTextEntity = (entity) => ATOMIC.has(entity._);
/**
* Entity-aware slice for offsets that are already known grapheme boundaries.
* Prefer `sliceTextWithEntities` for arbitrary offsets.
*/
function sliceTextWithEntitiesAtGraphemeBoundaries(text, entities, from, to, options) {
	const start = Math.max(0, Math.min(from, text.length));
	let end = Math.max(0, Math.min(to, text.length));
	if (end < start) end = start;
	const slicedText = text.slice(start, end);
	const out = [];
	for (const e of entities) {
		const eStart = e.offset ?? 0;
		const eEnd = eStart + (e.length ?? 0);
		if (ZERO_LENGTH.has(e._)) {
			if (eStart >= start && eStart <= end) out.push({
				...e,
				offset: eStart - start,
				length: 0
			});
			continue;
		}
		if (eEnd <= start || eStart >= end) continue;
		if (!(eStart >= start && eEnd <= end) && ATOMIC.has(e._) && !options?.keepCut) continue;
		const newStart = Math.max(eStart, start);
		const newEnd = Math.min(eEnd, end);
		out.push({
			...e,
			offset: newStart - start,
			length: newEnd - newStart
		});
	}
	return {
		text: slicedText,
		entities: out,
		from: start,
		to: end
	};
}
/**
* Slices `text` over the UTF-16 range `[from, to)` while preserving entity
* integrity. Boundaries are snapped inward to the nearest grapheme cluster so
* surrogate pairs and emoji sequences are never split. Entities are clipped
* to the resulting range; atomic entities (mentions, links, custom emoji,
* etc.) are dropped if a boundary falls inside them, unless `keepCut`. Returns
* the sliced text, the adjusted entities, and the actual `from`/`to` used after
* snapping.
*/
function sliceTextWithEntities(text, entities, from, to, options) {
	from = Math.max(0, Math.min(from, text.length));
	to = Math.max(0, Math.min(to, text.length));
	if (to < from) to = from;
	const boundaries = getGraphemeOffsets(text);
	const start = snapGraphemeOffsetUp(boundaries, from);
	let end = snapGraphemeOffsetDown(boundaries, to);
	if (end < start) end = start;
	return sliceTextWithEntitiesAtGraphemeBoundaries(text, entities, start, end, options);
}
//#endregion
//#region src/components/wrappers/richMessagePreview.ts
var SEPARATOR = "\xA0 ";
/**
* A rich message in one line, the way Android writes it for a reply, a chat list row and a draft
* (`MessageObject.formatRichMessage`): blocks two spaces apart, headings and quotes in bold, a list
* item behind its bullet, number or checkbox, media by its kind. A formula, a table, an audio, a
* file and a checkbox get an icon inside the text, over the character Android puts under its image.
*/
function getRichMessagePreview(richMessage, maxLength = 150) {
	const preview = {
		_: "textWithEntities",
		text: "",
		entities: []
	};
	appendJoined(preview, richMessage.blocks || [], (block) => appendBlock(preview, richMessage, block));
	trim(preview);
	truncate(preview, maxLength);
	sortEntities(preview.entities);
	return preview;
}
/** The photo or video a reply to a rich message shows (`getRichMessageMedia`); a video without a thumbnail shows nothing */
function getRichMessagePreviewMedia(richMessage) {
	const media = getRichMessageMedia(richMessage);
	return media?._ === "messageMediaDocument" && !media.document.thumbs?.length ? void 0 : media;
}
function appendBlock(preview, richMessage, block) {
	switch (block._) {
		case "pageBlockTitle":
		case "pageBlockHeader":
		case "pageBlockSubheader":
		case "pageBlockHeading1":
		case "pageBlockHeading2":
		case "pageBlockHeading3":
		case "pageBlockHeading4":
		case "pageBlockHeading5":
		case "pageBlockHeading6":
		case "pageBlockBlockquote":
		case "pageBlockPullquote":
			appendRichText(preview, block.text, "messageEntityBold");
			break;
		case "pageBlockParagraph":
		case "pageBlockFooter":
		case "pageBlockKicker":
			appendRichText(preview, block.text);
			break;
		case "pageBlockPreformatted":
			appendRichText(preview, block.text, "messageEntityCode");
			break;
		case "pageBlockBlockquoteBlocks":
			appendJoined(preview, block.blocks, (block) => appendBlock(preview, richMessage, block));
			break;
		case "pageBlockDetails":
			appendRichText(preview, block.title);
			break;
		case "pageBlockAuthorDate":
			appendRichText(preview, block.author);
			break;
		case "pageBlockMath":
			appendIcon(preview, "formula", "fx");
			appendText(preview, " " + label("AccDescrIVFormula"));
			break;
		case "pageBlockMap":
			appendText(preview, label("Map"));
			if (hasText(block.caption?.text)) {
				appendText(preview, SEPARATOR);
				appendRichText(preview, block.caption.text);
			}
			break;
		case "pageBlockList":
			appendJoined(preview, block.items, (item) => {
				if (item.pFlags.checkbox) appendCheckbox(preview, item.pFlags.checked);
				else appendText(preview, "• ");
				appendListItem(preview, richMessage, item);
			});
			break;
		case "pageBlockOrderedList":
			appendJoined(preview, block.items, (item, index) => {
				appendText(preview, getOrderedListItemNumber(block, index) + ". ");
				if (item.pFlags.checkbox) appendCheckbox(preview, item.pFlags.checked);
				appendListItem(preview, richMessage, item);
			});
			break;
		case "pageBlockTable":
			appendIcon(preview, "table", "⊞");
			appendText(preview, " ");
			if (hasText(block.title)) appendRichText(preview, block.title);
			else appendText(preview, label("AccDescrIVTable"));
			break;
		case "pageBlockAudio": {
			const document = findRichMessageDocument(richMessage, block.audio_id);
			const attribute = getAudioAttribute(document);
			const name = (attribute?.performer && attribute.title ? `${attribute.performer} – ${attribute.title}` : attribute?.title) || document?.file_name;
			if (name) {
				appendIcon(preview, "note_filled", "🎵");
				appendText(preview, " " + name);
			}
			break;
		}
		case "pageBlockDocument": {
			const document = findRichMessageDocument(richMessage, block.document_id);
			if (document) {
				appendIcon(preview, "document", "📎");
				appendText(preview, " " + (document.file_name || label("AttachDocument")));
			}
			break;
		}
		case "pageBlockCover":
			appendBlock(preview, richMessage, block.cover);
			break;
		case "pageBlockPhoto":
			appendText(preview, label("AttachPhoto"));
			break;
		case "pageBlockVideo":
			appendText(preview, label("AttachVideo"));
			break;
		case "pageBlockCollage":
			appendText(preview, label("AccDescrCollage"));
			break;
		case "pageBlockSlideshow":
			appendText(preview, label("AccDescrIVSlideshow"));
			break;
		case "pageBlockUnsupported":
			appendText(preview, label("UnsupportedAttachment"));
			break;
		case "pageBlockButtonRow": appendJoined(preview, block.buttons, (button) => appendRichText(preview, button.text));
	}
}
function appendListItem(preview, richMessage, item) {
	if ("text" in item) appendRichText(preview, item.text);
	else appendJoined(preview, item.blocks, (block) => appendBlock(preview, richMessage, block));
}
/** Appends what each item gives, a separator apart; an item that gives nothing leaves no gap. */
function appendJoined(preview, items, append) {
	let joined = false;
	items.forEach((item, index) => {
		const length = preview.text.length;
		if (joined) preview.text += SEPARATOR;
		const start = preview.text.length;
		append(item, index);
		if (preview.text.length === start) preview.text = preview.text.slice(0, length);
		else joined = true;
	});
}
function appendRichText(preview, richText, style) {
	const { text, entities } = wrapSummaryRichText(richText);
	if (!text.trim()) return;
	const offset = preview.text.length;
	preview.text += text.replace(/\n/g, " ");
	for (const entity of entities || []) preview.entities.push({
		...entity,
		offset: entity.offset + offset
	});
	if (style) preview.entities.push({
		_: style,
		offset,
		length: text.length
	});
}
function appendText(preview, text) {
	preview.text += text;
}
function appendIcon(preview, icon, text) {
	preview.entities.push({
		_: "messageEntityIcon",
		offset: preview.text.length,
		length: text.length,
		icon
	});
	preview.text += text;
}
function appendCheckbox(preview, checked) {
	appendIcon(preview, checked ? "checkboxon" : "checkboxempty", checked ? "✅" : "☑️");
	appendText(preview, " ");
}
/** Drops the blank a first block starts with or a last one ends with, moving the entities along. */
function trim(preview) {
	const start = preview.text.length - preview.text.trimStart().length;
	preview.text = preview.text.trim();
	const end = preview.text.length;
	preview.entities = preview.entities.map((entity) => {
		const offset = Math.max(0, entity.offset - start);
		return {
			...entity,
			offset,
			length: Math.min(end, entity.offset + entity.length - start) - offset
		};
	}).filter((entity) => entity.length > 0);
}
/**
* Cuts the text at `maxLength` and adds an ellipsis, never through an emoji, a link or a custom
* emoji (`sliceTextWithEntities`), nor through an icon, which goes with the text it stands for.
*/
function truncate(preview, maxLength) {
	if (preview.text.length <= maxLength) return;
	let end = maxLength;
	for (const entity of preview.entities) if (entity._ === "messageEntityIcon" && entity.offset < end && entity.offset + entity.length > end) end = entity.offset;
	const sliced = sliceTextWithEntities(preview.text, preview.entities, 0, end);
	const { text, entities } = sliceTextWithEntitiesAtGraphemeBoundaries(sliced.text, sliced.entities, 0, sliced.text.trimEnd().length);
	preview.text = text + "…";
	preview.entities = entities;
}
function hasText(richText) {
	return !!richText && !!wrapSummaryRichText(richText).text.trim();
}
function label(key) {
	return langPack_default.format(key, true);
}
//#endregion
//#region src/components/wrappers/messageForReplyContent.ts
function getMessageForReplyContent(message, explicitText) {
	let text = explicitText ?? message.message;
	let entities = message.totalEntities ?? message.entities;
	const richMessage = message.rich_message;
	const isRichPreview = explicitText === void 0 && !!richMessage;
	if (isRichPreview) {
		const preview = getRichMessagePreview(richMessage);
		text = preview.text;
		entities = preview.entities;
	}
	return {
		text,
		entities,
		isRichPreview
	};
}
//#endregion
//#region src/components/wrappers/messageForReply.ts
var messageForReply_exports = /* @__PURE__ */ __exportAll({ default: () => wrapMessageForReply });
async function wrapMessageForReply(options) {
	const content = getMessageForReplyContent(options.message, options.text);
	options.text = content.text;
	if (!options.plain && options.highlightWord) options.highlightWord = options.highlightWord.trim();
	const { message, usingMids, plain, withoutMediaType, withoutMessageIcon } = options;
	const parts = [];
	let hasGroupedKey = false;
	const addPart = (langKey, part, args) => {
		if (langKey) {
			if (part === void 0 && hasGroupedKey) return;
			part = plain ? langPack_default.format(langKey, true, args) : i18n(langKey, args);
		}
		if (plain) parts.push(part);
		else {
			const el = document.createElement("span");
			el.append(part);
			parts.push(el);
		}
	};
	const appMessagesManager = (options.managers || bindManagersToSession(rootScope.managers)).appMessagesManager;
	const getMyId = () => options.managers ? options.managers.rootScope.getMyId() : rootScope.myId;
	const isRestricted = isMessageRestricted(message);
	const isSelfDestructingMedia = !!message.media?.ttl_seconds;
	const someRichTextOptions = {
		...options,
		noLinebreaks: true,
		noLinks: true,
		noTextFormat: true
	};
	let entities = content.entities;
	let isRichPreview = content.isRichPreview;
	const applyRichMessageSummary = () => {
		if (!message.rich_message) return false;
		const summary = getMessageForReplyContent(message);
		options.text = summary.text;
		entities = summary.entities;
		isRichPreview = summary.isRichPreview;
		return true;
	};
	const previewIcon = !plain && !withoutMediaType && !withoutMessageIcon ? getMessagePreviewIcon(message) : void 0;
	if (message.media && !isRestricted) {
		assumeType(message);
		let usingFullGrouped = true;
		if (message.grouped_id) {
			if (usingMids) {
				const mids = await appMessagesManager.getMidsByMessage(message);
				if (usingMids.length === mids.length) {
					for (const mid of mids) if (!usingMids.includes(mid)) {
						usingFullGrouped = false;
						break;
					}
				} else usingFullGrouped = false;
			}
			if (usingFullGrouped) {
				const groupedText = await appMessagesManager.getGroupedText(message.grouped_id);
				options.text = groupedText?.message || "";
				entities = groupedText?.totalEntities || [];
				if (!withoutMediaType) {
					addPart("AttachAlbum");
					hasGroupedKey = true;
				}
			}
		} else usingFullGrouped = false;
		async function addSelfDestructingMediaPart(langPackKeyPart, media) {
			const { out } = message.pFlags;
			addPart(`SelfDestructingOnMobile.${langPackKeyPart}${!media ? ".Expired" : out ? ".You" : ""}`, void 0, [!out && await wrapPeerTitle({ peerId: message.fromId })]);
			options.text = "";
			entities = [];
		}
		let i = 1;
		if (!usingFullGrouped && !withoutMediaType || !options.text || isSelfDestructingMedia) {
			const media = message.media;
			switch (media?._) {
				case "messageMediaPhoto":
					if (isSelfDestructingMedia) await addSelfDestructingMediaPart("Photo", media.photo);
					else addPart("AttachPhoto");
					break;
				case "messageMediaDice":
					addPart(void 0, plain ? media.emoticon : wrapEmojiText(media.emoticon));
					break;
				case "messageMediaVenue":
					options.text = media.title;
					addPart("AttachLocation");
					break;
				case "messageMediaGeo":
					addPart("AttachLocation");
					break;
				case "messageMediaGeoLive":
					addPart("AttachLiveLocation");
					break;
				case "messageMediaPoll":
					if (plain) addPart(void 0, "📊 " + media.poll.question.text);
					else {
						const textWithEntities = wrapTextWithEntities(media.poll.question);
						addPart(void 0, wrapRichText(textWithEntities.text, {
							...someRichTextOptions,
							entities: textWithEntities.entities
						}));
					}
					break;
				case "messageMediaContact":
					addPart("AttachContact");
					break;
				case "messageMediaWidget":
					if (!options.text) addPart("AttachWidget");
					break;
				case "messageMediaGame": {
					const f = "🎮 " + media.game.title;
					addPart(void 0, plain ? f : wrapEmojiText(f));
					break;
				}
				case "messageMediaDocument": {
					const document = media.document;
					if (document?.type === "video" || media.pFlags.video) {
						if (isSelfDestructingMedia) await addSelfDestructingMediaPart("Video", document);
						else addPart("AttachVideo");
					} else if (document?.type === "voice" || media.pFlags.voice) {
						if (isSelfDestructingMedia) await addSelfDestructingMediaPart("Voice", document);
						else addPart("AttachAudio");
					} else if (document?.type === "round" || media.pFlags.round) {
						if (isSelfDestructingMedia) await addSelfDestructingMediaPart("Round", document);
						else addPart("AttachRound");
					} else if (document.type === "gif") addPart("AttachGif");
					else if (document.type === "sticker") {
						const i = parts.length;
						if (document.stickerEmojiRaw) {
							const f = document.stickerEmojiRaw + " ";
							addPart(void 0, plain ? f : wrapEmojiText(f));
						}
						addPart("AttachSticker");
						const p = parts.splice(i, 2);
						if (plain) parts.push(p[0] + (p[1] ? p[1] : ""));
						else {
							const span = window.document.createElement("span");
							span.append(...p);
							parts.push(span);
						}
						options.text = "";
					} else if (document.type === "audio") {
						const attribute = getAudioAttribute(document);
						const names = [attribute?.title, attribute?.performer].filter(Boolean);
						const f = (plain ? "🎵 " : "") + (names.length ? names.join(" - ") : document.file_name);
						addPart(void 0, plain ? f : wrapEmojiText(f));
					} else addPart(void 0, plain ? document.file_name : wrapEmojiText(document.file_name));
					break;
				}
				case "messageMediaInvoice":
					if (media.extended_media?._ === "messageExtendedMediaPreview") addPart(void 0, plain ? media.description : wrapEmojiText(media.description));
					else addPart(void 0, plain ? media.title : wrapEmojiText(media.title));
					break;
				case "messageMediaUnsupported":
					if (applyRichMessageSummary()) break;
					addPart("UnsupportedMessageTitle");
					break;
				case "messageMediaStory":
					if (media.pFlags.via_mention) {
						const storyPeerId = getPeerId(media.peer);
						const isMyStory = storyPeerId === await getMyId();
						addPart(isMyStory ? "StoryMentionYou" : "StoryMention", void 0, [await wrapPeerTitle({
							peerId: isMyStory ? message.peerId : storyPeerId,
							plainText: plain
						})]);
					} else addPart("Story");
					break;
				case "inputMediaWebPage":
				case "messageMediaPhotoExternal":
				case "messageMediaDocumentExternal":
				case "messageMediaWebPage": break;
				case "messageMediaGiveaway": {
					const date = formatDate(/* @__PURE__ */ new Date(media.until_date * 1e3));
					addPart("Giveaway.ToBeSelectedFull", void 0, [i18n("Giveaway.ToBeSelected", [media.quantity, plain ? date.textContent : date])]);
					break;
				}
				case "messageMediaGiveawayResults": {
					const { langPackKey, args } = wrapMessageGiveawayResults(media, plain);
					addPart(langPackKey, void 0, args);
					break;
				}
				case "messageMediaPaidMedia": {
					const extendedMedia = media.extended_media;
					const [photos, videos] = partition(extendedMedia, (media) => {
						if (media._ === "messageExtendedMediaPreview") return media.video_duration === void 0;
						return media.media._ === "messageMediaPhoto";
					});
					if (!plain) {
						i += 2;
						addPart(void 0, Icon("star", "xtr-icon"));
						addPart(void 0, " ");
					}
					const length = photos.length + videos.length;
					if (length < 2) {
						addPart(photos.length ? "AttachPhoto" : "AttachVideo");
						break;
					}
					addPart(photos.length && videos.length ? "Media" : photos.length ? "Photos" : "Videos", void 0, [length]);
					break;
				}
				case "messageMediaToDo":
					addPart(void 0, plain ? media.todo.title.text : wrapEmojiText(media.todo.title.text, false, media.todo.title.entities));
					break;
				default:
					if (applyRichMessageSummary()) break;
					addPart(UNSUPPORTED_LANG_PACK_KEY);
					options.text = "";
			}
		}
		const length = parts.length;
		for (; i < length; i += 2) parts.splice(i, 0, ", ");
		if (options.text && length) parts.push(", ");
	}
	if (message.action) {
		const actionWrapped = await wrapMessageActionTextNew({
			...options,
			noLinks: true,
			noTextFormat: true
		});
		if (actionWrapped) addPart(void 0, actionWrapped);
	}
	if (isRestricted) {
		options.text = getMessageRestrictionReason(message).text;
		entities = [];
		isRichPreview = false;
	}
	if (options.text) {
		if (!isRichPreview) options.text = limitSymbols(options.text, 100);
		entities ?? (entities = parseEntities(options.text));
		const { peerId: messagePeerId, fromId } = message;
		const loginCodeEntity = fromId === messagePeerId && getLoginCodeEntity(messagePeerId, options.text);
		if (loginCodeEntity) {
			entities = [...entities, loginCodeEntity];
			sortEntities(entities);
		}
		if (plain) parts.push(wrapPlainText(options.text, entities));
		else {
			let what;
			if (options.canTranslate) {
				const richMessage = message.rich_message;
				what = TranslatableMessage({
					peerId: message.peerId,
					...richMessage ? { textWithEntities: {
						_: "textWithEntities",
						text: options.text,
						entities
					} } : { message },
					richTextOptions: someRichTextOptions,
					middleware: options.middleware,
					onTextWithEntities: isRichPreview ? void 0 : (textWithEntities) => {
						return {
							...textWithEntities,
							text: limitSymbols(textWithEntities.text, 100)
						};
					}
				});
			} else {
				what = wrapRichText(options.text, {
					...someRichTextOptions,
					entities
				});
				what = htmlToDocumentFragment(what);
			}
			parts.push(what);
		}
	}
	if (plain) return parts.join("");
	else {
		const fragment = document.createDocumentFragment();
		fragment.append(...[previewIcon && Icon(previewIcon, "message-preview-icon", "inline-icon", "inline-icon-left"), ...parts].filter(Boolean));
		return fragment;
	}
}
//#endregion
//#region src/helpers/shouldDisplayGiftCodeAsGift.ts
function shouldDisplayGiftCodeAsGift(action) {
	if (action._ === "payments.checkedGiftCode") return !action.from_id;
	return (action.amount || action.crypto_amount) !== void 0;
}
//#endregion
//#region src/lib/appManagers/utils/gifts/getStarGiftMessageTextDetails.ts
function getStarGiftMessageTextDetails(message, action, myId) {
	const fromId = !action.pFlags.prepaid_upgrade && action.from_id ? getPeerId(action.from_id) : message.fromId;
	const uniqueAction = action._ === "messageActionStarGiftUnique" ? action : void 0;
	const isResale = !!uniqueAction?.resale_amount;
	return {
		direction: isResale && !!uniqueAction?.pFlags.from_offer && !message.pFlags.out || message.peerId === myId && (isResale || !fromId || fromId === myId) ? "self" : message.pFlags.out || fromId === myId ? "outgoing" : "incoming",
		fromId
	};
}
//#endregion
//#region src/lib/lang.ts
function getPriceChangedActionMessageLangParams(action, isBroadcast, peerTitle) {
	const isFree = !+action?.stars;
	const allowedDirectMessages = action?.pFlags?.broadcast_messages_allowed;
	if (isBroadcast) {
		const peerTitleResult = peerTitle();
		const langPackKey = allowedDirectMessages ? isFree ? "PaidMessages.ChannelPriceChangedFree" : "PaidMessages.ChannelPriceChanged" : "PaidMessages.ChannelPriceDisabled";
		if (peerTitleResult instanceof Promise) return (async () => ({
			langPackKey,
			args: isFree ? [await peerTitleResult] : [+action.stars, await peerTitleResult]
		}))();
		return {
			langPackKey,
			args: isFree ? [peerTitleResult] : [+action.stars, peerTitleResult]
		};
	} else return {
		langPackKey: isFree ? "PaidMessages.GroupPriceChangedFree" : "PaidMessages.GroupPriceChanged",
		args: [+action.stars]
	};
}
function getStarGiftActionLangParams(options) {
	const { message, action, myId, peerTitle } = options;
	const { direction, fromId } = getStarGiftMessageTextDetails(message, action, myId);
	const isMine = direction !== "incoming";
	const giftPeerId = action.peer ? getPeerId(action.peer) : void 0;
	const channelId = giftPeerId && !giftPeerId.isUser() ? giftPeerId : void 0;
	const sentToChannel = (amount, ton) => {
		return isMine ? {
			langPackKey: ton ? "ActionGiftSentSelfChannelTon" : "ActionGiftSentSelfChannel",
			args: [amount, peerTitle(channelId)]
		} : {
			langPackKey: ton ? "ActionGiftSentChannelTon" : "ActionGiftSentChannel",
			args: [
				amount,
				peerTitle(fromId),
				peerTitle(channelId)
			]
		};
	};
	if (action._ === "messageActionStarGift") {
		const giftStars = +action.gift.stars;
		const upgradeStars = +(action.upgrade_stars || 0);
		const prepaidUpgrade = !!action.pFlags.prepaid_upgrade;
		const stars = prepaidUpgrade ? upgradeStars : giftStars + (action.pFlags.upgrade_separate ? 0 : upgradeStars);
		const giftFromId = prepaidUpgrade && action.from_id ? getPeerId(action.from_id) : void 0;
		if (channelId) {
			if (!prepaidUpgrade) return sentToChannel(stars);
			return !giftFromId || giftFromId === myId ? {
				langPackKey: "StarGiftSentMessagePrepaidChannel",
				args: [stars, peerTitle(channelId)]
			} : {
				langPackKey: "StarGiftSentMessagePrepaidOutgoingOther",
				args: [
					stars,
					peerTitle(channelId),
					peerTitle(giftFromId)
				]
			};
		}
		if (direction === "self") return {
			langPackKey: "StarGiftSentMessageSelf",
			args: [stars]
		};
		if (direction === "outgoing") {
			if (!prepaidUpgrade) return {
				langPackKey: "StarGiftSentMessageOutgoing",
				args: [stars]
			};
			return !giftFromId || giftFromId === myId ? {
				langPackKey: "StarGiftSentMessagePrepaidOutgoing",
				args: [stars]
			} : {
				langPackKey: "StarGiftSentMessagePrepaidOutgoingOther",
				args: [
					stars,
					peerTitle(message.peerId),
					peerTitle(giftFromId)
				]
			};
		}
		if (!prepaidUpgrade) return {
			langPackKey: "StarGiftSentMessageIncoming",
			args: [stars, peerTitle(fromId)]
		};
		return giftFromId && giftFromId !== fromId && giftFromId !== myId ? {
			langPackKey: "StarGiftSentMessagePrepaidIncomingOther",
			args: [
				stars,
				peerTitle(fromId),
				peerTitle(giftFromId)
			]
		} : {
			langPackKey: "StarGiftSentMessagePrepaidIncoming",
			args: [stars, peerTitle(fromId)]
		};
	}
	if (action.pFlags.prepaid_upgrade) return {
		langPackKey: message.pFlags.out ? "ActionGiftUpgradedHelpedSelf" : "ActionGiftUpgradedHelped",
		args: [peerTitle(message.peerId)]
	};
	const resaleAmount = action.resale_amount;
	const isSold = !!(action.pFlags.from_offer && message.pFlags.out);
	if (resaleAmount && !isSold) {
		const isTon = resaleAmount._ === "starsTonAmount";
		const amount = formatStarsAmount(resaleAmount);
		if (channelId) return sentToChannel(amount, isTon);
		if (direction === "self") return {
			langPackKey: isTon ? "StarGiftSentMessageSelfTon" : "StarGiftSentMessageSelf",
			args: [amount]
		};
		if (direction === "outgoing") return {
			langPackKey: isTon ? "StarGiftSentMessageOutgoingTon" : "StarGiftSentMessageOutgoing",
			args: [amount]
		};
		return {
			langPackKey: isTon ? "StarGiftSentMessageIncomingTon" : "StarGiftSentMessageIncoming",
			args: [amount, peerTitle(fromId)]
		};
	}
	const isUpgrade = !!action.pFlags.upgrade;
	if (channelId) return isMine ? {
		langPackKey: isUpgrade ? "ActionGiftUpgradedSelfChannel" : "ActionGiftTransferredSelfChannel",
		args: [peerTitle(channelId)]
	} : {
		langPackKey: isUpgrade ? "ActionGiftUpgradedChannel" : "ActionGiftTransferredChannel",
		args: [peerTitle(fromId), peerTitle(channelId)]
	};
	if (message.peerId === myId) return { langPackKey: isUpgrade ? "ActionGiftUpgradedSelf" : "ActionGiftTransferredSelf" };
	return {
		langPackKey: isUpgrade ? message.pFlags.out ? "ActionGiftUpgradedOutbound" : "ActionGiftUpgradedInbound" : isSold ? "ActionGiftSold" : message.pFlags.out ? "ActionGiftTransferredOutbound" : "ActionGiftTransferredInbound",
		args: [peerTitle(message.peerId)]
	};
}
//#endregion
//#region src/lib/richTextProcessor/truncateTextWithEntities.ts
/**
* Uses Unicode horizontal ellipsis (U+2026) instead of "..."
* for better typography, line breaking, and internationalization.
*/
var ELLIPSIS = "…";
function truncateTextWithEntities(text, entities, n) {
	if (text.length <= n) return {
		text,
		entities
	};
	if (n <= 1) return {
		text: ELLIPSIS.slice(0, Math.max(0, n)),
		entities: []
	};
	const sliced = sliceTextWithEntities(text, entities, 0, n - 1);
	return {
		text: sliced.text + ELLIPSIS,
		entities: sliced.entities
	};
}
//#endregion
//#region src/components/wrappers/getCommunityServiceMessageKey.ts
function getCommunityServiceTitle(community) {
	if (community?._ !== "community" && community?._ !== "communityForbidden") return;
	return community.title || void 0;
}
function getCommunityServiceMessageKey({ isAdded, peerKind, authorKind }) {
	if (peerKind === "bot") return isAdded ? "Chat.Service.CommunityAdded.Bot" : "Chat.Service.CommunityRemoved.Bot";
	if (peerKind === "channel") return isAdded ? "Chat.Service.CommunityAdded.Channel" : "Chat.Service.CommunityRemoved.Channel";
	if (isAdded) {
		if (authorKind === "self") return "Chat.Service.CommunityAdded.Group.You";
		return authorKind === "user" ? "Chat.Service.CommunityAdded.Group.By" : "Chat.Service.CommunityAdded.Group.Unknown";
	}
	return authorKind === "self" ? "Chat.Service.CommunityRemoved.Group.You" : "Chat.Service.CommunityRemoved.Group.By";
}
//#endregion
//#region src/components/wrappers/messageActionTextNewUnsafe.ts
async function wrapLinkToMessage(options) {
	const wrapped = await wrapMessageForReply(options);
	if (options.plain) return wrapped;
	const a = document.createElement("i");
	a.dataset.savedFrom = options.message.peerId + "_" + options.message.mid;
	a.append(wrapped);
	setDirection(a);
	return a;
}
function wrapSomeText(text, plain, entities) {
	return plain ? text : htmlToSpan(wrapEmojiText(text, false, entities));
}
function joinTexts(texts, params) {
	const { delimiter, prepend, append } = params;
	const fragment = document.createDocumentFragment();
	let first = true;
	for (const it of texts) {
		if (first) first = false;
		else fragment.append(delimiter);
		if (prepend) fragment.append(prepend);
		if (params.wrap) fragment.append(params.wrap(it));
		else fragment.append(it);
		if (append) fragment.append(append);
	}
	return fragment;
}
var TODO_JOIN_OPTIONS = {
	delimiter: ", ",
	prepend: "\"",
	append: "\"",
	wrap: (el) => {
		const b = document.createElement("b");
		b.append(el);
		return b;
	}
};
var MAX_ANSWER_TEXT_LENGTH = 20;
var UNSUPPORTED_ACTIONS = /* @__PURE__ */ new Set(["messageActionGramTransfer", "messageActionWalletTonConnectRequest"]);
async function wrapTopicIcon(options) {
	const topic = options.topic;
	let iconEmojiId = topic?.icon_emoji_id;
	if (topic?.id === 4294967297) iconEmojiId = "5390854796011906616";
	if (!iconEmojiId) {
		if (options.plain) return "";
		return topicAvatar(topic?.icon_color, topic?.title);
	}
	return options.plain ? rootScope.managers.appEmojiManager.getCustomEmojiDocument(iconEmojiId).then((doc) => doc.stickerEmojiRaw) : wrapCustomEmojiAwaited({
		...options,
		docIds: [iconEmojiId]
	}).then((fragment) => {
		fragment.lastElementChild.classList.add("topic-icon");
		return fragment;
	});
}
function wrapMessageActionTopicIcon(options) {
	const action = options.message.action;
	return wrapTopicIcon({
		...options,
		topic: action
	});
}
async function wrapMessageActionTopicIconAndName(options) {
	const action = options.message.action;
	const span = document.createElement("span");
	span.classList.add("topic-name");
	span.append(await wrapMessageActionTopicIcon(options), wrapSomeText(action.title, options.plain));
	return span;
}
function wrapMessageGiveawayResults(action, plain) {
	let langPackKey = "Giveaway.Results";
	let args = [action.winners_count];
	const setCombined = (addLangPackKey, addArgs) => {
		args = [plain ? langPack_default.format(langPackKey, true, args) : i18n(langPackKey, args)];
		langPackKey = "Giveaway.Results.Combined";
		args.push(plain ? langPack_default.format(addLangPackKey, true, addArgs) : i18n(addLangPackKey, addArgs));
	};
	if (!action.winners_count) {
		langPackKey = action.pFlags.stars ? "Giveaway.Results.NoWinners.Stars" : "Giveaway.Results.NoWinners";
		args = [action.unclaimed_count];
	} else if (action.unclaimed_count) setCombined("Giveaway.Results.Unclaimed", [action.unclaimed_count]);
	return {
		langPackKey,
		args
	};
}
async function wrapMessageActionTextNewUnsafe(options) {
	const { plain, message, noLinks } = options;
	const element = plain ? void 0 : document.createElement("span");
	const action = "action" in message && message.action;
	if (action._ === "messageActionCustomAction" && action.message) {
		const unsafeMessage = action.message;
		if (plain) return wrapPlainText(unsafeMessage);
		else {
			setInnerHTML(element, wrapRichText(unsafeMessage, { noLinebreaks: true }));
			return element;
		}
	} else {
		let _ = action._;
		let langPackKey;
		let icon;
		let args;
		const managers = bindManagersToSession(rootScope.managers);
		const getNameDivHTML = (peerId, plain, onlyFirstName) => {
			return plain ? getPeerTitle({
				peerId,
				plainText: plain,
				onlyFirstName
			}) : wrapPeerTitle({
				peerId,
				link: !noLinks,
				onlyFirstName
			});
		};
		const wrapTruncatedText = (text, entities, maxLength) => {
			const truncated = truncateTextWithEntities(text, entities, maxLength);
			if (plain) return wrapPlainText(truncated.text, truncated.entities);
			else return htmlToSpan(wrapEmojiText(truncated.text, false, truncated.entities));
		};
		const getSeveralNameDivHTML = async (peerIds, plain) => {
			if (peerIds.length === 1) return getNameDivHTML(peerIds[0], plain);
			const joined = join(await Promise.all(peerIds.map((peerId) => getNameDivHTML(peerId, plain))), false, plain);
			if (plain) return Array.isArray(joined) ? joined.join("") : joined;
			else {
				const fragment = document.createElement("span");
				fragment.append(...joined);
				args.push(fragment);
				return fragment;
			}
		};
		switch (action._) {
			case "messageActionPhoneCall":
				_ += "." + action.type;
				args = [wrapCallDuration(action.duration, plain)];
				break;
			case "messageActionGroupCall":
				_ += "." + action.type;
				args = [];
				if (!_.endsWith("You") && !message.pFlags.post) args.push(getNameDivHTML(message.fromId, plain));
				if (action.duration !== void 0) args.push(wrapCallDuration(action.duration, plain));
				else if (noLinks) args.push("");
				else args.push(wrapJoinVoiceChatAnchor(message));
				break;
			case "messageActionInviteToGroupCall": {
				const peerIds = [message.fromId, action.users[0].toPeerId()];
				let a = "Chat.Service.VoiceChatInvitation";
				const myId = rootScope.myId;
				if (peerIds[0] === myId) a += "ByYou";
				else if (peerIds[1] === myId) a += "ForYou";
				indexOfAndSplice(peerIds, myId);
				langPackKey = a;
				args = peerIds.map((peerId) => getNameDivHTML(peerId, plain));
				args.push(noLinks ? "" : wrapJoinVoiceChatAnchor(message));
				break;
			}
			case "messageActionConferenceCall":
				langPackKey = getConferenceCallLangKey(getConferenceCallState(action), !!message.pFlags.out);
				args = [];
				break;
			case "messageActionGroupCallScheduled": {
				const today = /* @__PURE__ */ new Date();
				const date = /* @__PURE__ */ new Date(action.schedule_date * 1e3);
				const daysToStart = (date.getTime() - today.getTime()) / 864e5;
				const tomorrowDate = new Date(today);
				tomorrowDate.setDate(tomorrowDate.getDate() + 1);
				const isBroadcast = await managers.appPeersManager.isBroadcast(message.peerId);
				langPackKey = isBroadcast ? "ChatList.Service.VoiceChatScheduled.Channel" : "ChatList.Service.VoiceChatScheduled";
				args = [];
				const myId = rootScope.myId;
				if (message.fromId === myId) langPackKey += "You";
				else if (!isBroadcast) args.push(getNameDivHTML(message.fromId, plain));
				let k;
				const _args = [];
				if (daysToStart < 1 && date.getDate() === today.getDate()) k = "TodayAtFormattedWithToday";
				else if (daysToStart < 2 && date.getDate() === tomorrowDate.getDate()) k = "Time.TomorrowAt";
				else {
					k = "formatDateAtTime";
					_args.push(new langPack_default.IntlDateElement({
						date,
						options: {
							day: "2-digit",
							month: "2-digit",
							year: "2-digit"
						}
					}).element);
				}
				_args.push(formatTime(date));
				const t = i18n(k, _args);
				args.push(t);
				break;
			}
			case "messageActionChatCreate": {
				const myId = rootScope.myId;
				if (message.fromId === myId) _ += "You";
				else args = [getNameDivHTML(message.fromId, plain)];
				break;
			}
			case "messageActionGameScore": {
				const fromMe = message.fromId === rootScope.myId;
				args = [];
				if (!fromMe) args.push(getNameDivHTML(message.fromId, plain));
				args.push("" + action.score);
				let gameTitle;
				if (message.reply_to_mid) {
					const gameMessage = await managers.appMessagesManager.getMessageByPeer(message.peerId, message.reply_to_mid);
					const media = gameMessage?.media;
					if (media?._ === "messageMediaGame" && media.game?._ === "game") gameTitle = media.game.title;
					else if (!gameMessage) managers.appMessagesManager.fetchMessageReplyTo(message);
				}
				if (gameTitle) {
					if (plain) args.push(wrapSomeText(gameTitle, plain));
					else {
						const link = document.createElement("i");
						link.classList.add("is-game-link");
						link.dataset.savedFrom = message.peerId + "_" + message.reply_to_mid;
						link.append(wrapSomeText(gameTitle, false));
						setDirection(link);
						args.push(link);
					}
					langPackKey = fromMe ? "ActionYouScoredInGame" : "ActionUserScoredInGame";
				} else langPackKey = fromMe ? "ActionYouScored" : "ActionUserScored";
				break;
			}
			case "messageActionPinMessage": {
				const peerId = message.peerId;
				const pinnedMessage = await managers.appMessagesManager.getMessageByPeer(peerId, message.reply_to_mid);
				args = [getNameDivHTML(message.fromId, plain)];
				if (!pinnedMessage) {
					langPackKey = "ActionPinnedNoText";
					if (message.reply_to_mid) managers.appMessagesManager.fetchMessageReplyTo(message);
				} else args.push(wrapLinkToMessage({
					...options,
					message: pinnedMessage
				}));
				break;
			}
			case "messageActionChatJoinedByRequest": {
				const isBroadcast = await managers.appPeersManager.isBroadcast(message.peerId);
				if (message.pFlags.out) langPackKey = isBroadcast ? "RequestToJoinChannelApproved" : "RequestToJoinGroupApproved";
				else {
					langPackKey = isBroadcast ? "ChatService.UserJoinedChannelByRequest" : "ChatService.UserJoinedGroupByRequest";
					args = [getNameDivHTML(message.fromId, plain)];
				}
				break;
			}
			case "messageActionGiveawayLaunch":
				langPackKey = action.stars ? "BoostingStarsGiveawayJustStarted" : "BoostingGiveawayJustStarted";
				args = [getNameDivHTML(message.fromId, plain)];
				if (action.stars) args.unshift(+action.stars);
				break;
			case "messageActionContactSignUp":
			case "messageActionChatReturn":
			case "messageActionChatLeave":
			case "messageActionChatJoined":
			case "messageActionChatEditPhoto":
			case "messageActionChatDeletePhoto":
			case "messageActionChatEditVideo":
			case "messageActionChatJoinedByLink":
			case "messageActionChannelEditVideo":
			case "messageActionChannelDeletePhoto":
				args = [getNameDivHTML(message.fromId, plain)];
				break;
			case "messageActionSuggestProfilePhoto": {
				const isOutgoing = message.fromId === rootScope.myId;
				langPackKey = isOutgoing ? "Action.YouSuggestedProfilePhoto" : "Action.SuggestedProfilePhoto";
				args = isOutgoing ? [getNameDivHTML(message.peerId, plain)] : [getNameDivHTML(message.fromId, plain)];
				break;
			}
			case "messageActionChannelEditTitle":
			case "messageActionChatEditTitle":
				args = [];
				if (action._ === "messageActionChatEditTitle") args.push(getNameDivHTML(message.fromId, plain));
				args.push(wrapSomeText(action.title, plain));
				break;
			case "messageActionChatDeleteUser":
			case "messageActionChatAddUsers":
			case "messageActionChatAddUser": {
				const users = action.users || [action.user_id];
				args = [getNameDivHTML(message.fromId, plain)];
				const peerIds = users.map((userId) => userId.toPeerId(false));
				args.push(getSeveralNameDivHTML(peerIds, plain));
				break;
			}
			case "messageActionBotAllowed": {
				if (action.pFlags?.attach_menu) {
					langPackKey = "ActionAttachMenuBotAllowed";
					break;
				} else if (action.pFlags?.from_request) {
					langPackKey = "ActionBotAllowedRequest";
					break;
				} else if (!action.domain) break;
				const anchorHTML = wrapRichText(action.domain, {
					entities: [{
						_: "messageEntityUrl",
						length: action.domain.length,
						offset: 0
					}],
					noLinks
				});
				args = [htmlToSpan(anchorHTML)];
				break;
			}
			case "messageActionPaymentSent": {
				const isRecurringInit = action.pFlags.recurring_init;
				const isRecurringUsed = action.pFlags.recurring_used;
				langPackKey = isRecurringUsed ? "Chat.Service.PaymentSentRecurringUsedNoTitle" : isRecurringInit ? "Chat.Service.PaymentSentRecurringInitNoTitle" : "Chat.Service.PaymentSent1NoTitle";
				args = [paymentsWrapCurrencyAmount(action.total_amount, action.currency, void 0, void 0, plain), getNameDivHTML(message.peerId, plain)];
				if (message.reply_to_mid) {
					const replyTo = message.reply_to;
					const invoiceMessage = await managers.appMessagesManager.getMessageByPeer(replyTo?.reply_to_peer_id ? getPeerId(replyTo.reply_to_peer_id) : message.peerId, message.reply_to_mid);
					if (!invoiceMessage) managers.appMessagesManager.fetchMessageReplyTo(message);
					else {
						langPackKey = isRecurringUsed ? "Chat.Service.PaymentSentRecurringUsed" : isRecurringInit ? "Chat.Service.PaymentSentRecurringInit" : "Chat.Service.PaymentSent1";
						args.push(wrapLinkToMessage({
							...options,
							message: invoiceMessage
						}).then((el) => {
							if (el instanceof HTMLElement) el.classList.add("is-receipt-link");
							return el;
						}));
					}
				}
				break;
			}
			case "messageActionPaymentRefunded": {
				const price = paymentsWrapCurrencyAmount(action.total_amount, action.currency, void 0, void 0, plain);
				args = [getNameDivHTML(message.fromId, plain), price];
				langPackKey = "Chat.Service.Refund";
				break;
			}
			case "messageActionSetMessagesTTL": {
				args = [];
				const isBroadcast = await managers.appPeersManager.isBroadcast(message.peerId);
				if (action.period) {
					if (isBroadcast) langPackKey = "ActionTTLChannelChanged";
					else if (message.fromId === rootScope.myId) langPackKey = "ActionTTLYouChanged";
					else {
						langPackKey = "ActionTTLChanged";
						args.push(await getNameDivHTML(message.fromId, plain));
					}
					let duration;
					if (action.period > 1814400) {
						let key;
						const args = [];
						const year = 31536e3;
						if (action.period >= year) {
							key = "Years";
							args.push(action.period / year | 0);
						} else {
							key = "Months";
							args.push(action.period / (ONE_DAY * 30) | 0);
						}
						duration = plain ? langPack_default.format(key, true, args) : i18n(key, args);
					} else duration = wrapCallDuration(action.period, plain);
					args.push(duration);
				} else if (isBroadcast) langPackKey = "ActionTTLChannelDisabled";
				else if (message.fromId === rootScope.myId) langPackKey = "ActionTTLYouDisabled";
				else {
					langPackKey = "ActionTTLDisabled";
					args.push(getNameDivHTML(message.fromId, plain));
				}
				break;
			}
			case "messageActionTopicEdit": {
				let iconElement;
				let titleElement;
				let authorElement;
				const isMe = !!message.pFlags.out;
				const isIconChanged = action.icon_emoji_id !== void 0;
				const isIconRemoved = isIconChanged && !+action.icon_emoji_id;
				const isTitleChanged = action.title !== void 0;
				const isHiddenChanged = action.hidden !== void 0;
				if (!isMe) authorElement = getNameDivHTML(message.fromId, plain);
				if (isTitleChanged) titleElement = wrapSomeText(action.title, plain);
				if (isIconChanged && !isIconRemoved) iconElement = wrapMessageActionTopicIcon(options);
				args = authorElement ? [authorElement] : [];
				if (action.closed) langPackKey = isMe ? "Chat.Service.Group.TopicEdited.You.Paused" : "Chat.Service.Group.TopicEdited.Paused";
				else if (action.closed === false) langPackKey = isMe ? "Chat.Service.Group.TopicEdited.You.Resumed" : "Chat.Service.Group.TopicEdited.Resumed";
				else if (isIconRemoved && isTitleChanged) {
					langPackKey = isMe ? "Chat.Service.TopicEdited.You.Mixed.IconRemoved" : "Chat.Service.TopicEdited.Mixed.IconRemoved";
					args.push(titleElement);
				} else if (isIconChanged && isTitleChanged) {
					langPackKey = isMe ? "Chat.Service.TopicEdited.You.Mixed" : "Chat.Service.TopicEdited.Mixed";
					args.push(wrapMessageActionTopicIconAndName(options));
				} else if (isIconRemoved) langPackKey = isMe ? "Chat.Service.Group.TopicEdited.You.Icon.Removed" : "Chat.Service.Group.TopicEdited.Icon.Removed";
				else if (isTitleChanged) {
					langPackKey = isMe ? "Chat.Service.Group.TopicEdited.You.Title" : "Chat.Service.Group.TopicEdited.Title";
					args.push(titleElement);
				} else if (isIconChanged) {
					langPackKey = isMe ? "Chat.Service.Group.TopicEdited.You.Icon" : "Chat.Service.Group.TopicEdited.Icon";
					args.push(iconElement);
				} else if (isHiddenChanged) langPackKey = isMe ? action.hidden ? "Chat.Service.Group.TopicEdited.You.Hided" : "Chat.Service.Group.TopicEdited.You.Unhided" : action.hidden ? "Chat.Service.Group.TopicEdited.Hided" : "Chat.Service.Group.TopicEdited.Unhided";
				break;
			}
			case "messageActionTopicCreate":
				args = [wrapMessageActionTopicIconAndName(options)];
				langPackKey = "TopicWasCreatedAction";
				break;
			case "messageActionSetChatTheme": {
				const isMe = isOwnMessage(message, rootScope.myId);
				let authorElement;
				if (!isMe) authorElement = getNameDivHTML(message.fromId, plain);
				args = authorElement ? [authorElement] : [];
				const theme = action.theme;
				if (theme._ === "chatThemeUniqueGift") {
					args.push(wrapSomeText(getCollectibleName(theme.gift), plain));
					langPackKey = isMe ? "GiftThemesSetByYou" : "GiftThemesSetByOther";
				} else if (theme.emoticon) {
					args.push(wrapSomeText(theme.emoticon, plain));
					langPackKey = isMe ? "ChatThemeChangedYou" : "ChatThemeChangedTo";
				} else langPackKey = isMe ? "ChatThemeDisabledYou" : "ChatThemeDisabled";
				break;
			}
			case "messageActionPrizeStars":
				langPackKey = "BoostingReceivedGiftNoName";
				break;
			case "messageActionGiftStars":
			case "messageActionGiftCode":
			case "messageActionGiftTon":
			case "messageActionGiftPremium": {
				const isGiftCode = action._ === "messageActionGiftCode";
				if (isGiftCode && !shouldDisplayGiftCodeAsGift(action)) {
					langPackKey = "BoostingReceivedGiftNoName";
					if (action.boost_peer) {
						langPackKey = "BoostingReceivedGiftFrom";
						args = [getNameDivHTML(getPeerId(action.boost_peer), plain)];
					}
					break;
				}
				const isMe = !!message.pFlags.out && !isGiftCode;
				let authorElement;
				if (!isMe) authorElement = getNameDivHTML(message.fromId, plain);
				args = authorElement ? [authorElement] : [];
				args.push(paymentsWrapCurrencyAmount(action.amount, action.currency, false, true, plain));
				langPackKey = isMe ? "ActionGiftOutbound" : "ActionGiftInbound";
				break;
			}
			case "messageActionWalletTonConnectRequest": {
				const name = action.dapp_name?.replace(/[\u0000-\u001f\u007f\u200e\u200f\u202a-\u202e\u2066-\u2069]/g, "").trim();
				const state = action.pFlags.accepted ? "Processed" : action.pFlags.declined ? "Declined" : action.expires <= tsNow(true) ? "Expired" : "Pending";
				const asks = state === "Pending" && name && (action.topic === "signData" || action.topic === "disconnect") ? action.topic : "";
				langPackKey = asks ? asks === "signData" ? "Wallet.Action.TonConnectAppSignData" : "Wallet.Action.TonConnectAppDisconnect" : name ? "WalletTonConnectRequestApp" + state : "WalletTonConnectRequest" + state;
				args = name ? [wrapSomeText(name, plain, [{
					_: "messageEntityBold",
					offset: 0,
					length: name.length
				}])] : [];
				break;
			}
			case "messageActionGramTransfer": {
				const out = !!message.pFlags.out;
				const anonymous = message.peerId === SERVICE_PEER_ID;
				if (options.compact) {
					const text = wrapGramTransferCompactText({
						transfer: action,
						out,
						anonymous,
						notification: options.compact === "notification"
					});
					if (plain) return text;
					element.append(wrapSomeText(text, plain));
					return element;
				}
				const nanos = absNanos(action.amount);
				const grams = formatTransferGrams(nanos);
				const withFiat = (rate) => {
					const fiat = rate && formatFiat(nanos, rate.perGram, rate.currency).replace(/ /g, "\xA0");
					return fiat ? langPack_default.format("WalletTransferWorth", true, [grams, fiat]) : grams;
				};
				const rate = getWalletFiatRate();
				let amount = withFiat(rate);
				if (!plain) {
					const span = document.createElement("span");
					span.textContent = amount;
					if (!rate) loadWalletFiatRate().then((rate) => rate && (span.textContent = withFiat(rate)));
					amount = span;
				}
				if (anonymous) {
					langPackKey = out ? "Wallet.Action.SentUnknown" : "Wallet.Action.ReceivedUnknown";
					args = [amount];
				} else if (out) {
					langPackKey = "Wallet.Action.Sent";
					args = [amount, getNameDivHTML(message.peerId, plain, true)];
				} else {
					langPackKey = "Wallet.Action.Received";
					args = [getNameDivHTML(message.fromId, plain, true), amount];
				}
				break;
			}
			case "messageActionWebViewDataSent":
				langPackKey = "ActionBotWebViewData";
				args = [wrapSomeText(action.text, plain)];
				break;
			case "messageActionRequestedPeer":
				langPackKey = "Chat.Service.PeerRequested";
				args = [getSeveralNameDivHTML(action.peers.map((peer) => getPeerId(peer)), plain), getNameDivHTML(message.peerId, plain)];
				break;
			case "messageActionGiveawayResults": {
				const r = wrapMessageGiveawayResults(action, plain);
				langPackKey = r.langPackKey;
				args = r.args;
				break;
			}
			case "messageActionSetChatWallPaper": {
				const isUser = message.peerId.isUser();
				args = [getNameDivHTML(isUser ? message.peerId : message.fromId, plain)];
				if (isUser) {
					if (isOwnMessage(message, rootScope.myId)) langPackKey = action.pFlags.for_both ? "ActionSetWallpaperForThisChatSelfBoth" : action.pFlags.same ? "ActionSetSameWallpaperForThisChatSelf" : "ActionSetWallpaperForThisChatSelf";
					else langPackKey = action.pFlags.for_both ? "ActionSetWallpaperForThisChatBoth" : action.pFlags.same ? "ActionSetSameWallpaperForThisChat" : "ActionSetWallpaperForThisChat";
					break;
				}
				if (await managers.appPeersManager.isBroadcast(message.peerId)) {
					langPackKey = "ActionSetWallpaperForThisChannel";
					break;
				}
				langPackKey = message.fromId === message.peerId ? "ActionSetWallpaperForThisGroup" : "ActionSetWallpaperForThisGroupByUser";
				break;
			}
			case "messageActionPaidMessagesPrice": {
				const result = await getPriceChangedActionMessageLangParams(action, await managers.appChatsManager.isBroadcast(message.fromId?.toChatId()), () => getNameDivHTML(message.fromId, plain));
				langPackKey = result.langPackKey;
				args = result.args;
				break;
			}
			case "messageActionNoPaidMessagesTokenUsed":
				if (message.pFlags.out) {
					langPackKey = "NoPaidMessagesToken.UsedOut";
					args = [getNameDivHTML(message.peerId, plain)];
				} else {
					langPackKey = "NoPaidMessagesToken.Used";
					args = [getNameDivHTML(message.fromId, plain)];
				}
				break;
			case "messageActionPaidMessagesRefunded":
				langPackKey = "PaidMessages.StarsRefundedShort";
				args = [+action.stars];
				break;
			case "messageActionStarGift":
			case "messageActionStarGiftUnique": {
				const params = getStarGiftActionLangParams({
					message,
					action,
					myId: rootScope.myId,
					peerTitle: (peerId) => getNameDivHTML(peerId, plain)
				});
				langPackKey = params.langPackKey;
				args = params.args;
				break;
			}
			case "messageActionTodoAppendTasks": {
				let listMsg = await managers.appMessagesManager.getMessageByPeer(message.peerId, message.reply_to_mid);
				if (!listMsg) listMsg = await managers.appMessagesManager.fetchMessageReplyTo(message);
				icon = Icon("checklist_add");
				if (listMsg?._ === "message" && listMsg.media._ === "messageMediaToDo") {
					if (action.list.length === 1) {
						langPackKey = `ChecklistAddedTask${message.pFlags.out ? "You" : ""}`;
						args = [
							message.pFlags.out ? void 0 : getNameDivHTML(message.fromId, plain),
							wrapSomeText(action.list[0].title.text, plain, action.list[0].title.entities),
							wrapSomeText(listMsg.media.todo.title.text, plain, listMsg.media.todo.title.entities)
						];
					} else {
						langPackKey = `ChecklistAddedTaskMany${message.pFlags.out ? "You" : ""}`;
						args = [
							message.pFlags.out ? void 0 : getNameDivHTML(message.fromId, plain),
							joinTexts(action.list.map((it) => wrapSomeText(it.title.text, plain, it.title.entities)), TODO_JOIN_OPTIONS),
							wrapSomeText(listMsg.media.todo.title.text, plain, listMsg.media.todo.title.entities)
						];
					}
				}
				break;
			}
			case "messageActionTodoCompletions": {
				let listMsg = await managers.appMessagesManager.getMessageByPeer(message.peerId, message.reply_to_mid);
				if (!listMsg) listMsg = await managers.appMessagesManager.fetchMessageReplyTo(message);
				if (listMsg?._ === "message" && listMsg.media._ === "messageMediaToDo") {
					const list = listMsg.media.todo;
					const itemsMap = /* @__PURE__ */ new Map();
					for (const it of list.list) itemsMap.set(it.id, it.title);
					const completed = action.completed.map((it) => itemsMap.get(it)).filter(Boolean);
					const incompleted = action.incompleted.map((it) => itemsMap.get(it)).filter(Boolean);
					if (completed.length === 0) {
						icon = Icon("checklist_undone");
						langPackKey = `ChecklistMarkedUndone${message.pFlags.out ? "You" : ""}`;
						args = [message.pFlags.out ? void 0 : getNameDivHTML(message.fromId, plain), joinTexts(incompleted.map((it) => wrapSomeText(it.text, plain, it.entities)), TODO_JOIN_OPTIONS)];
						break;
					}
					if (incompleted.length === 0) {
						icon = Icon("checklist_done");
						langPackKey = `ChecklistMarkedDone${message.pFlags.out ? "You" : ""}`;
						args = [message.pFlags.out ? void 0 : getNameDivHTML(message.fromId, plain), joinTexts(completed.map((it) => wrapSomeText(it.text, plain, it.entities)), TODO_JOIN_OPTIONS)];
						break;
					}
					icon = Icon("checklist_done");
					langPackKey = `ChecklistMarkedMixed${message.pFlags.out ? "You" : ""}`;
					args = [
						message.pFlags.out ? void 0 : getNameDivHTML(message.fromId, plain),
						joinTexts(completed.map((it) => wrapSomeText(it.text, plain, it.entities)), TODO_JOIN_OPTIONS),
						joinTexts(incompleted.map((it) => wrapSomeText(it.text, plain, it.entities)), TODO_JOIN_OPTIONS)
					];
				}
				break;
			}
			case "messageActionChannelCreate": {
				const chat = message?.peerId ? apiManagerProxy.getChat(message.peerId) : void 0;
				if (chat?._ === "channel" && chat?.pFlags?.monoforum) langPackKey = "ActionCreateDirectMessages";
				break;
			}
			case "messageActionSuggestedPostApproval":
				if (action.pFlags.balance_too_low) {
					langPackKey = "SuggestedPosts.BalanceTooLow";
					args = [wrapEmojiText("❌")];
				} else if (action.pFlags.rejected) {
					langPackKey = "SuggestedPosts.GenericRejectedPost";
					args = [wrapEmojiText("❌")];
				} else {
					langPackKey = "SuggestedPosts.AgreementReached";
					args = [wrapEmojiText("🤝")];
				}
				break;
			case "messageActionSuggestedPostSuccess":
				langPackKey = "SuggestedPosts.PostSuccess";
				args = [wrapEmojiText("✅"), i18n("Stars", [numberThousandSplitterForStars(action.price.amount)])];
				break;
			case "messageActionSuggestedPostRefund":
				langPackKey = "SuggestedPosts.GenericRefund";
				break;
			case "messageActionSuggestBirthday":
				langPackKey = message.pFlags.out ? "BirthdaySuggestOutgoing" : "BirthdaySuggestIncoming";
				args = [getNameDivHTML(message.peerId, plain)];
				break;
			case "messageActionStarGiftPurchaseOffer":
				langPackKey = message.pFlags.out ? "StarGiftOffer.Outgoing" : "StarGiftOffer.Incoming";
				args = [
					getNameDivHTML(message.peerId, plain),
					i18n("Stars", [numberThousandSplitterForStars(action.price.amount)]),
					getCollectibleName(action.gift)
				];
				break;
			case "messageActionStarGiftPurchaseOfferDeclined":
				if (action.pFlags.expired) langPackKey = "StarGiftOffer.ExpiredFull";
				else langPackKey = message.pFlags.out ? "StarGiftOffer.RejectedFullOutgoing" : "StarGiftOffer.RejectedFullIncoming";
				args = [
					getNameDivHTML(message.peerId, plain),
					i18n("Stars", [numberThousandSplitterForStars(action.price.amount)]),
					getCollectibleName(action.gift)
				];
				break;
			case "messageActionNewCreatorPending":
				langPackKey = "Chat.Service.NewCreatorPending";
				args = [getNameDivHTML(action.new_creator_id.toPeerId(), plain), getNameDivHTML(message.fromId, plain)];
				break;
			case "messageActionChangeCreator":
				langPackKey = "Chat.Service.ChangeCreator";
				args = [getNameDivHTML(message.fromId, plain), getNameDivHTML(action.new_creator_id.toPeerId(), plain)];
				break;
			case "messageActionBoostApply":
				langPackKey = "UserBoostedGroup";
				args = [getNameDivHTML(message.fromId, plain), action.boosts];
				break;
			case "messageActionNoForwardsToggle":
				if (action.new_value === action.prev_value) langPackKey = action.new_value ? "SharingStillEnabled" : "SharingStillDisabled";
				else langPackKey = `Chat.Service.NoForwardsToggle${message.pFlags.out ? ".You" : ""}.${action.new_value ? "Enabled" : "Disabled"}`;
				args = [getNameDivHTML(message.fromId, plain)];
				break;
			case "messageActionNoForwardsRequest":
				if (action.pFlags.expired) langPackKey = "EnableSharingRequested.Expired";
				else {
					langPackKey = `Chat.Service.NoForwardsRequest${message.pFlags.out ? ".You" : ""}.${action.new_value ? "Enable" : "Disable"}`;
					args = [getNameDivHTML(message.fromId, plain)];
				}
				break;
			case "messageActionPollAppendAnswer": {
				const truncatedAnswerText = wrapTruncatedText(action.answer.text.text, action.answer.text.entities, MAX_ANSWER_TEXT_LENGTH);
				if (message.pFlags.out) {
					langPackKey = "Chat.Poll.OptionAddedMe";
					args = [truncatedAnswerText];
				} else {
					langPackKey = "Chat.Poll.OptionAdded";
					args = [getNameDivHTML(message.fromId, plain), truncatedAnswerText];
				}
				break;
			}
			case "messageActionPollDeleteAnswer": {
				const truncatedAnswerText = wrapTruncatedText(action.answer.text.text, action.answer.text.entities, MAX_ANSWER_TEXT_LENGTH);
				if (message.pFlags.out) {
					langPackKey = "Chat.Poll.OptionDeletedMe";
					args = [truncatedAnswerText];
				} else {
					langPackKey = "Chat.Poll.OptionDeleted";
					args = [getNameDivHTML(message.fromId, plain), truncatedAnswerText];
				}
				break;
			}
			case "messageActionManagedBotCreated":
				langPackKey = "CreateBot.BotWasCreated";
				args = [getNameDivHTML(action.bot_id.toPeerId(), plain)];
				break;
			case "messageActionChatJoinedViaCommunity": {
				const communityId = action.community_id && action.community_id !== "0" && action.community_id !== 0 ? action.community_id.toChatId() : void 0;
				const communityTitle = getCommunityServiceTitle(communityId ? apiManagerProxy.getChat(communityId) : void 0);
				args = [getNameDivHTML(message.fromId, plain)];
				if (communityTitle) {
					langPackKey = "Chat.Service.JoinedViaCommunity";
					if (plain) args.push(communityTitle);
					else if (noLinks) {
						const bold = document.createElement("b");
						bold.textContent = communityTitle;
						args.push(bold);
					} else args.push(getNameDivHTML(communityId.toPeerId(true), plain));
				} else langPackKey = "Chat.Service.JoinedViaCommunity.Unknown";
				break;
			}
			case "messageActionChangeCommunity": {
				const communityId = action.community_id && action.community_id !== "0" && action.community_id !== 0 ? action.community_id.toChatId() : void 0;
				const communityTitle = getCommunityServiceTitle(communityId ? apiManagerProxy.getChat(communityId) : void 0);
				const peer = apiManagerProxy.getPeer(message.peerId);
				const peerKind = message.peerId.isUser() ? "bot" : (peer?._ === "channel" || peer?._ === "channelForbidden") && !peer.pFlags.megagroup ? "channel" : "group";
				const authorKind = message.fromId === rootScope.myId ? "self" : message.fromId?.isUser() ? "user" : "unknown";
				langPackKey = getCommunityServiceMessageKey({
					isAdded: !!communityId,
					peerKind,
					authorKind
				});
				args = [];
				if (peerKind === "group" && authorKind !== "self" && (!communityId || authorKind === "user")) {
					if (authorKind === "unknown") args.push("");
					else if (noLinks && !plain) args.push(getPeerTitle({
						peerId: message.fromId,
						plainText: true
					}).then((title) => {
						const bold = document.createElement("b");
						bold.textContent = title;
						return bold;
					}));
					else args.push(getNameDivHTML(message.fromId, plain));
				}
				if (communityId) {
					if (plain) args.push(communityTitle || "");
					else {
						const bold = document.createElement("b");
						bold.textContent = communityTitle || "";
						args.push(bold);
					}
				}
				break;
			}
			default: langPackKey = langPack[_] || (UNSUPPORTED_ACTIONS.has(_) ? UNSUPPORTED_LANG_PACK_KEY : `[${action._}]`);
		}
		if (!langPackKey) {
			langPackKey = langPack[_];
			if (langPackKey === void 0) langPackKey = "[" + _ + "]";
		}
		const waited = args && await Promise.all(args);
		if (plain) return langPack_default.format(langPackKey, true, waited);
		else {
			const res = _i18n(element, langPackKey, waited);
			if (icon) {
				icon.classList.add("message-action-icon");
				res.prepend(icon);
			}
			return res;
		}
	}
}
//#endregion
//#region src/helpers/dom/documentFragmentToNodes.ts
function documentFragmentToNodes(fragment) {
	const nodes = new Array(fragment.childNodes.length);
	let node = fragment.firstChild;
	let i = 0;
	while (node) {
		nodes[i++] = node.nodeType === node.TEXT_NODE ? node.nodeValue : node;
		node = node.nextSibling;
	}
	return nodes;
}
//#endregion
//#region src/helpers/canvas/dashedCircle.ts
var DashedCircle = class {
	constructor() {
		this.canvas = document.createElement("canvas");
		this.context = this.canvas.getContext("2d");
		this.dpr = window.devicePixelRatio;
	}
	prepare(options) {
		this.canvas.width = this.width = options.width * this.dpr;
		this.canvas.height = this.height = options.height * this.dpr;
		this.centerX = this.width / 2;
		this.centerY = this.height / 2;
		this.radius = options.radius * this.dpr - .5;
		this.gapLength = options.gap * this.dpr;
		this.totalLength = Math.PI * this.radius * 2;
		this.startAngle = -1.5;
	}
	render(sections) {
		this.context.clearRect(0, 0, this.width, this.height);
		const totalSegments = sections.reduce((acc, section) => acc + section.length, 0);
		const totalSections = sections.length;
		this.context.lineCap = "round";
		if (sections.length === 1 && sections[0].length === 1) this.context.setLineDash([]);
		else this.context.setLineDash([this.totalLength / totalSegments - this.gapLength, this.gapLength]);
		let partSum = 0;
		for (let i = 0; i < totalSections; ++i) {
			const section = sections[i];
			const part = section.length / totalSegments;
			const sectionStartAngle = this.startAngle + partSum * 2 * Math.PI;
			const sectionEndAngle = sectionStartAngle + part * 2 * Math.PI;
			this.context.beginPath();
			this.context.arc(this.centerX, this.centerY, this.radius, sectionStartAngle, sectionEndAngle, false);
			this.context.strokeStyle = section.color;
			this.context.lineWidth = section.lineWidth * this.dpr;
			this.context.stroke();
			partSum += part;
		}
	}
};
//#endregion
//#region src/hooks/useIsNightTheme.ts
function useIsNightTheme() {
	const [isNight, setIsNight] = createSignal(themeController.isNight());
	subscribeOn(rootScope)("theme_changed", () => {
		setIsNight(themeController.isNight());
	});
	return isNight;
}
//#endregion
//#region src/components/currencyStarIcon.tsx
var _tmpl$$2 = /*#__PURE__*/ template(`<svg><path d="M8.7221 7.50194L11.1473 2.67049C11.4277 2.11345 12.106 1.88988 12.6593 2.17029C12.8753 2.28018 13.0496 2.45828 13.1595 2.67807L15.452 7.339C15.6377 7.72173 16.0053 7.97941 16.4259 8.02867L21.2195 8.60465C21.8712 8.68423 22.3373 9.27916 22.2615 9.93473C22.2274 10.2038 22.1062 10.4539 21.9129 10.6433L18.1198 14.3835C17.9644 14.535 17.8924 14.7472 17.9189 14.9632L18.5517 20.0107C18.6427 20.7345 18.1311 21.3938 17.4111 21.4848C17.1383 21.5189 16.8655 21.4696 16.623 21.337L12.6176 19.1467C12.3258 18.9876 11.9772 18.9838 11.6854 19.1353L7.53223 21.265C6.94867 21.5643 6.23627 21.3294 5.93691 20.742C5.82322 20.5222 5.78533 20.2759 5.81944 20.0334L6.14911 17.7143C6.31205 16.5813 7.01309 15.5961 8.02864 15.0769L12.6365 12.7237C12.7578 12.6631 12.807 12.5115 12.7464 12.3865C12.6972 12.2917 12.5948 12.2349 12.4887 12.25L6.85015 13.061C5.98996 13.1822 5.1184 12.9397 4.4401 12.3865L2.56436 10.8555C2.03006 10.4198 1.9429 9.624 2.37868 9.08591C2.58331 8.83581 2.87509 8.67286 3.1934 8.63118L8.00591 8.01351C8.31285 7.97183 8.58189 7.78236 8.7221 7.50194Z"fill=url(#paint0_linear_6651_5783)></svg>`, false, true, false);
var _tmpl$2$2 = /*#__PURE__*/ template(`<svg width=24 height=24 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M12.989 3.53063C12.5001 3.42074 11.981 3.65568 11.746 4.12557L9.31704 8.95703C9.17684 9.23744 8.91158 9.42691 8.60085 9.46859L3.78834 10.09C3.47761 10.1317 3.19341 10.2833 2.99257 10.522L4.77358 11.9772C5.33441 12.4357 6.06197 12.6365 6.77816 12.5342L12.413 11.7271C12.7464 11.6816 13.0723 11.8483 13.2201 12.1477C13.4134 12.5304 13.2618 13.0003 12.8791 13.1973L11.4088 13.9476L13.0837 13.7051C13.1898 13.69 13.2959 13.7468 13.3414 13.8415C13.4058 13.9666 13.3527 14.1182 13.2315 14.1788L8.62359 16.532C7.60803 17.0511 6.907 18.0364 6.74405 19.1694L6.52806 20.6738C6.72511 20.8708 7.03584 20.9239 7.29351 20.7913L11.4391 18.6616C11.89 18.4305 12.4243 18.4381 12.8677 18.6806L16.8731 20.8708C17.0171 20.9504 17.1838 20.9807 17.3467 20.9618C17.7711 20.9087 18.0781 20.5146 18.025 20.0789L17.396 15.0276C17.3505 14.6487 17.4794 14.2735 17.7484 14.0083L21.5416 10.2682C21.606 10.2037 21.6553 10.1279 21.6894 10.0446L17.0208 9.48375C16.6002 9.43449 16.2364 9.17302 16.047 8.79408L15.8651 8.41893C15.4824 8.2522 15.1678 7.95663 14.9784 7.5739L12.989 3.53063Z"fill=url(#paint1_linear_6651_5783)></path><path d="M12.898 1.69684C12.0795 1.2838 11.0867 1.61348 10.6774 2.43198L8.24845 7.26723C8.18782 7.38849 8.07035 7.47186 7.93772 7.48701L3.12521 8.10847C2.67048 8.16531 2.25365 8.40025 1.96566 8.75646C1.34799 9.52191 1.46546 10.6436 2.22713 11.265L4.10666 12.7997C4.89864 13.4439 5.91798 13.7281 6.92596 13.5841L10.9086 13.0119L7.78615 14.6073C6.61523 15.206 5.81188 16.3352 5.6262 17.6388L5.29273 19.9579C5.24347 20.3103 5.30031 20.6665 5.46326 20.9848C5.89146 21.8298 6.92975 22.1671 7.77478 21.7351L11.9241 19.6054C12.0606 19.5335 12.2235 19.5372 12.3599 19.613L16.3653 21.7995C16.7026 21.9852 17.0929 22.061 17.4756 22.0117C18.4874 21.8829 19.1998 20.9545 19.0747 19.9465L18.4457 14.8953C18.4381 14.846 18.457 14.7929 18.4911 14.7588L22.2843 11.0187C22.5609 10.7421 22.739 10.3821 22.7845 9.99558C22.8944 9.05203 22.2275 8.19563 21.2839 8.08195L16.4866 7.50596C16.2478 7.47944 16.0356 7.32786 15.9257 7.10808L13.6369 2.44335C13.4778 2.12125 13.2163 1.85979 12.898 1.69684ZM11.621 2.90565C11.7688 2.61008 12.1288 2.49261 12.4206 2.6404C12.5342 2.69724 12.629 2.79576 12.6858 2.91323L14.9784 7.5739C15.2436 8.11578 15.7628 8.48362 16.3615 8.55562L21.1589 9.1316C21.5189 9.17329 21.7765 9.50296 21.7348 9.87053C21.7159 10.0221 21.6477 10.1621 21.5416 10.2682L17.7484 14.0083C17.4794 14.2735 17.3505 14.6487 17.396 15.0276L18.025 20.0789C18.0781 20.5146 17.7711 20.9087 17.3467 20.9618C17.1838 20.9807 17.0171 20.9504 16.8731 20.8708L12.8677 18.6806C12.4243 18.4381 11.89 18.4345 11.4391 18.6657L7.28974 20.7953C6.96764 20.9583 6.57354 20.8294 6.40681 20.5035C6.34618 20.3823 6.32345 20.2421 6.34239 20.1056L6.67207 17.7903C6.80849 16.8278 7.40721 15.9904 8.2674 15.5508L12.8753 13.1976C13.2618 13.0006 13.4134 12.5304 13.2201 12.1477C13.0685 11.8483 12.7464 11.6817 12.413 11.7271L6.77438 12.5345C6.05819 12.6368 5.33441 12.4357 4.77358 11.9772L2.89785 10.4427C2.58712 10.1888 2.53786 9.73033 2.79174 9.4196C2.90921 9.2756 3.07595 9.18087 3.25784 9.15813L8.07035 8.53667C8.55539 8.47604 8.97601 8.17668 9.19579 7.7409L11.621 2.90565Z"fill=url(#paint2_linear_6651_5783)>`);
function Path1(props) {
	return (() => {
		var _el$ = _tmpl$$2();
		createRenderEffect(() => setAttribute(_el$, "class", props.stroke && "currency-star-icon-stroke"));
		return _el$;
	})();
}
function currencyStarIcon(props = {}) {
	return (() => {
		var _el$2 = _tmpl$2$2(), _el$3 = _el$2.firstChild;
		insert(_el$2, (() => {
			var _c$ = memo(() => !!props.stroke);
			return () => _c$() && createComponent(Path1, { stroke: true });
		})(), _el$3);
		insert(_el$2, createComponent(Path1, {}), _el$3);
		createRenderEffect(() => setAttribute(_el$2, "class", classNames("currency-star-icon", props.class)));
		return _el$2;
	})();
}
//#endregion
//#region src/components/sidebarLeft/tabs/autoDeleteMessages/options.ts
var makeOption = (value, duration, type) => ({
	value,
	label: () => wrapFormattedDuration([{
		duration,
		type
	}]),
	duration,
	type
});
var getDefaultOptions = ({ offLabel }) => [
	{
		value: 0,
		label: offLabel
	},
	makeOption(oneDayInSeconds, 1, DurationType.Days),
	makeOption(oneWeekInSeconds, 1, DurationType.Weeks),
	makeOption(oneMonthInSeconds, 1, DurationType.Months)
];
var customTimeOptions = [
	makeOption(oneDayInSeconds, 1, DurationType.Days),
	makeOption(oneDayInSeconds * 2, 2, DurationType.Days),
	makeOption(oneDayInSeconds * 3, 3, DurationType.Days),
	makeOption(oneDayInSeconds * 4, 4, DurationType.Days),
	makeOption(oneDayInSeconds * 5, 5, DurationType.Days),
	makeOption(oneDayInSeconds * 6, 6, DurationType.Days),
	makeOption(oneWeekInSeconds, 1, DurationType.Weeks),
	makeOption(oneWeekInSeconds * 2, 2, DurationType.Weeks),
	makeOption(oneWeekInSeconds * 3, 3, DurationType.Weeks),
	makeOption(oneMonthInSeconds, 1, DurationType.Months),
	makeOption(oneMonthInSeconds * 2, 2, DurationType.Months),
	makeOption(oneMonthInSeconds * 3, 3, DurationType.Months),
	makeOption(oneMonthInSeconds * 4, 4, DurationType.Months),
	makeOption(oneMonthInSeconds * 5, 5, DurationType.Months),
	makeOption(oneMonthInSeconds * 6, 6, DurationType.Months),
	makeOption(oneYearInSeconds, 1, DurationType.Years)
];
var allTimeOptionsForAutoDeleteIcon = [
	makeOption(oneHourInSeconds, 1, DurationType.Hours),
	makeOption(oneHourInSeconds * 2, 2, DurationType.Hours),
	makeOption(oneHourInSeconds * 3, 3, DurationType.Hours),
	makeOption(oneHourInSeconds * 4, 4, DurationType.Hours),
	makeOption(oneHourInSeconds * 5, 5, DurationType.Hours),
	makeOption(oneHourInSeconds * 6, 6, DurationType.Hours),
	makeOption(oneHourInSeconds * 7, 7, DurationType.Hours),
	makeOption(oneHourInSeconds * 8, 8, DurationType.Hours),
	...customTimeOptions
];
function findBestMatchingOption(period, options) {
	const threshold = .1;
	const isCloseTo = (period, targetPeriod) => targetPeriod > 0 && Math.abs(period - targetPeriod) / targetPeriod < threshold;
	for (const option of options) if (isCloseTo(period, option.value)) return option;
	return null;
}
function findMatchingCustomOption(period) {
	return findBestMatchingOption(period, customTimeOptions);
}
function findMatchingAutoDeleteIconOption(period) {
	return findBestMatchingOption(period, allTimeOptionsForAutoDeleteIcon);
}
function findExistingOrCreateCustomOption(period) {
	return findMatchingCustomOption(period) || {
		label: () => wrapFormattedDuration(formatDuration(period)),
		value: period
	};
}
//#endregion
//#region src/components/autoDeleteIcon.ts
var shiftedIcons = [DurationType.Days, DurationType.Years];
var typeToIcon = {
	[DurationType.Hours]: "auto_delete_circle_hours",
	[DurationType.Days]: "auto_delete_circle_days",
	[DurationType.Weeks]: "auto_delete_circle_weeks",
	[DurationType.Months]: "auto_delete_circle_months",
	[DurationType.Years]: "auto_delete_circle_years"
};
var durationToIcon = {
	1: "auto_delete_circle_1",
	2: "auto_delete_circle_2",
	3: "auto_delete_circle_3",
	4: "auto_delete_circle_4",
	5: "auto_delete_circle_5",
	6: "auto_delete_circle_6",
	7: "auto_delete_circle_7",
	8: "auto_delete_circle_8"
};
function createAutoDeleteIcon(period) {
	const defaultResult = () => Icon("auto_delete_circle_clock");
	if (!period) return defaultResult();
	const option = findMatchingAutoDeleteIconOption(period);
	if (!option) return defaultResult();
	const durationIcon = durationToIcon[option.duration];
	const typeIcon = typeToIcon[option.type];
	if (!durationIcon || !typeIcon) return defaultResult();
	const isShifted = shiftedIcons.includes(option.type);
	return OverlayedIcon([
		"auto_delete_circle_empty",
		{
			icon: durationIcon,
			className: isShifted ? "auto-delete-icon--shifted" : void 0
		},
		{
			icon: typeIcon,
			className: isShifted ? "auto-delete-icon--shifted" : void 0
		}
	]);
}
//#endregion
//#region src/helpers/dom/createLoopingMutedVideo.ts
function createLoopingMutedVideo(url, className, startTime, middleware, autoplay = true) {
	const v = document.createElement("video");
	if (className) v.className = className;
	v.muted = true;
	v.loop = true;
	v.playsInline = true;
	v.preload = "auto";
	v.setAttribute("muted", "");
	v.setAttribute("playsinline", "");
	v.setAttribute("disableremoteplayback", "");
	const tryPlay = () => {
		if (autoplay && (!middleware || middleware())) v.play().catch(() => {});
	};
	const seekTo = startTime > 0 ? startTime : 0;
	if (seekTo) {
		v.addEventListener("loadedmetadata", () => {
			try {
				v.currentTime = Math.min(seekTo, v.duration || seekTo);
			} catch {}
			tryPlay();
			v.autoplay = autoplay;
		}, { once: true });
		v.addEventListener("canplay", tryPlay, { once: true });
	} else {
		v.autoplay = autoplay;
		v.addEventListener("loadeddata", tryPlay, { once: true });
		v.addEventListener("canplay", tryPlay, { once: true });
	}
	if (middleware) middleware.onClean(pinObjectURL(url));
	v.src = url;
	if (!seekTo) tryPlay();
	return v;
}
//#endregion
//#region src/components/createAvatarVideo.ts
function createAvatarVideo(url, startTime, middleware, loopLimit) {
	const video = createLoopingMutedVideo(url, "avatar-photo avatar-video", startTime, middleware, false);
	let completedLoops = 0;
	video.loop = !loopLimit;
	const animation = {
		get paused() {
			return video.paused;
		},
		get autoplay() {
			return (!loopLimit || completedLoops < loopLimit) && liteMode.isAvailable("video");
		},
		loop: !loopLimit,
		play: () => {
			if (middleware() && video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) return video.play();
		},
		pause: () => {
			video.pause();
			if (!video.isConnected) completedLoops = 0;
		},
		remove: () => video.remove()
	};
	animationIntersector.addAnimation({
		animation,
		observeElement: video,
		controlled: middleware,
		type: "video"
	});
	const checkPlayback = () => {
		const item = animationIntersector.getAnimations(video)[0];
		if (item) animationIntersector.checkAnimation(item);
	};
	const onEnded = () => {
		if (++completedLoops >= loopLimit) return;
		video.currentTime = 0;
		checkPlayback();
	};
	video.addEventListener("loadeddata", checkPlayback);
	video.addEventListener("canplay", checkPlayback);
	if (loopLimit) video.addEventListener("ended", onEnded);
	middleware.onClean(() => {
		video.removeEventListener("loadeddata", checkPlayback);
		video.removeEventListener("canplay", checkPlayback);
		video.removeEventListener("ended", onEnded);
		clearMediaElementSource(video);
		video.remove();
	});
	return video;
}
//#endregion
//#region src/components/stories/peerStoriesPolling.ts
var FLUSH_DELAY = 500;
var watched = /* @__PURE__ */ new Map();
var inSight = /* @__PURE__ */ new Set();
var pending = /* @__PURE__ */ new Map();
var flushTimeout;
var repollTimeout;
var stopWaitingForShow;
var observer = createAppWindowIntersectionObserver((entries) => {
	for (const { target, isIntersecting } of entries) {
		const item = watched.get(target);
		if (!item) continue;
		if (isIntersecting) {
			inSight.add(target);
			addPending(item);
		} else inSight.delete(target);
	}
	if (!inSight.size) stopRepoll();
	scheduleFlush();
});
function addPending({ peerId, managers }) {
	let peerIds = pending.get(managers);
	if (!peerIds) pending.set(managers, peerIds = /* @__PURE__ */ new Set());
	peerIds.add(peerId);
}
function scheduleFlush() {
	if (!pending.size || flushTimeout || stopWaitingForShow) return;
	flushTimeout = window.setTimeout(flush, FLUSH_DELAY);
}
function flush() {
	clearTimeout(flushTimeout);
	flushTimeout = void 0;
	if (getAppWindow().document.hidden) {
		stopWaitingForShow ?? (stopWaitingForShow = bindActiveWindowListener((win) => win.document, "visibilitychange", () => {
			if (getAppWindow().document.hidden) return;
			stopWaitingForShow();
			stopWaitingForShow = void 0;
			flush();
		}));
		return;
	}
	for (const [managers, peerIds] of pending) managers.appStoriesManager.pollPeersStories([...peerIds]).catch(noop);
	pending.clear();
	scheduleRepoll();
}
function stopRepoll() {
	clearTimeout(repollTimeout);
	repollTimeout = void 0;
}
function scheduleRepoll() {
	if (!inSight.size || repollTimeout) return;
	repollTimeout = window.setTimeout(() => {
		repollTimeout = void 0;
		inSight.forEach((element) => addPending(watched.get(element)));
		if (pending.size) flush();
	}, PEER_STORIES_POLL_INTERVAL);
}
/**
* Watches `element`, an avatar of `peerId`, for coming into sight; a second call for it moves it to another
* peer. `managers` are those of the account session it is shown in.
*/
function watchPeerStories(element, peerId, managers) {
	const item = watched.get(element);
	if (item?.peerId === peerId && item.managers === managers) return;
	if (item) unwatchPeerStories(element);
	watched.set(element, {
		peerId,
		managers
	});
	observer.observe(element);
}
/** Stops watching `element`: its avatar is gone, shows another peer, or one no longer polled. */
function unwatchPeerStories(element) {
	if (!watched.delete(element)) return;
	observer.unobserve(element);
	if (inSight.delete(element) && !inSight.size) stopRepoll();
}
//#endregion
//#region src/components/avatarNew.tsx
var _tmpl$$1 = /*#__PURE__*/ template(`<div class=avatar-stories-simple>`);
var _tmpl$2$1 = /*#__PURE__*/ template(`<div class=avatar-auto-delete-timer__background>`);
var _tmpl$3$1 = /*#__PURE__*/ template(`<div class=avatar-auto-delete-timer><div class=avatar-auto-delete-timer__icon>`);
var _tmpl$4$1 = /*#__PURE__*/ template(`<div><div>`);
var _tmpl$5$1 = /*#__PURE__*/ template(`<div class=avatar-background>`);
var _tmpl$6 = /*#__PURE__*/ template(`<div>`);
var FADE_IN_DURATION = 200;
var avatarsMap = /* @__PURE__ */ new Map();
var avatarByElement = /* @__PURE__ */ new WeakMap();
var collectedAvatars = new FinalizationRegistry(({ map, key, ref }) => {
	const set = map.get(key);
	if (!set?.delete(ref) || set.size) return;
	map.delete(key);
});
var forEachAvatar = (map, key, callback) => {
	const set = map.get(key);
	if (!set?.size) return;
	set.forEachLive(callback);
	if (!set.size) map.delete(key);
};
MOUNT_CLASS_TO && (MOUNT_CLASS_TO.avatarsMap = avatarsMap);
var believeMe = /* @__PURE__ */ new Map();
var seen = /* @__PURE__ */ new Set();
MOUNT_CLASS_TO && (MOUNT_CLASS_TO.believeMe = believeMe);
function getAvatarQueueKey(peerId, threadId) {
	return peerId + (threadId ? "_" + threadId : "");
}
var onAvatarUpdate = ({ peerId, threadId }) => {
	forEachAvatar(avatarsMap, getAvatarQueueKey(peerId, threadId), (avatar) => avatar.render());
};
var onAvatarStoriesUpdate = ({ peerId }) => {
	forEachAvatar(avatarsMap, getAvatarQueueKey(peerId), (avatar) => avatar.updateStoriesSegments());
};
hotListen(void 0, rootScope, "avatar_update", onAvatarUpdate);
hotListen(void 0, rootScope, "peer_title_edit", async (data) => {
	if (!data.threadId && await rootScope.managers.appAvatarsManager.isAvatarCached(data.peerId)) return;
	onAvatarUpdate(data);
});
hotListen(void 0, rootScope, "peer_stories", ({ peerId }) => {
	onAvatarStoriesUpdate({ peerId });
});
hotListen(void 0, rootScope, "stories_read", onAvatarStoriesUpdate);
hotListen(void 0, rootScope, "story_deleted", onAvatarStoriesUpdate);
hotListen(void 0, rootScope, "story_new", onAvatarStoriesUpdate);
var getStoriesSegments = async (peerId, storyId) => {
	const managers = bindManagersToSession(rootScope.managers);
	if (storyId) {
		const segments = [{
			length: 1,
			type: await managers.appStoriesManager.getUnreadType(peerId, storyId)
		}];
		return {
			cached: true,
			result: Promise.resolve(segments)
		};
	}
	return managers.acknowledged.appStoriesManager.getPeerStoriesSegments(peerId);
};
var createUnreadGradient = (context, size, dpr) => {
	const gradient = context.createLinearGradient(size * .9156 * dpr, size * -.05695821429 * dpr, size * .1342364286 * dpr, size * 1.02370714286 * dpr);
	gradient.addColorStop(0, customProperties.getProperty("avatar-color-story-unread-from"));
	gradient.addColorStop(1, customProperties.getProperty("avatar-color-story-unread-to"));
	return gradient;
};
var createCloseGradient = (context, size, dpr) => {
	const gradient = context.createLinearGradient(size * .5 * dpr, size * 0 * dpr, size * .5 * dpr, size * 1 * dpr);
	gradient.addColorStop(0, customProperties.getProperty("avatar-color-story-close-from"));
	gradient.addColorStop(1, customProperties.getProperty("avatar-color-story-close-to"));
	return gradient;
};
function findUpAvatar(target) {
	let avatar = findUpClassName(target, "avatar");
	if (avatar) avatar = findUpClassName(avatar, "has-stories") || avatar;
	return avatar;
}
async function loadAvatarVideoOverlay(peerId, photo, middleware, videoSize = "photo_video") {
	const [url, videoStartTs] = await Promise.all([Promise.resolve(apiManagerProxy.loadAvatar(peerId, photo, videoSize)).catch(() => void 0), rootScope.managers.appAvatarsManager.getAvatarVideoStartTs(peerId, photo, videoSize === "photo_video_full").catch(() => void 0)]);
	if (!url || !middleware()) return;
	return createAvatarVideo(url, videoStartTs, middleware, videoSize === "photo_video" ? 3 : void 0);
}
var calculateSegmentsDimensions = (s) => {
	const willBeSize = Math.round(s * (1 - 6 / 54));
	const totalSvgSize = s * (1 + 2 / 54);
	const multiplier = s / 54;
	return {
		size: s,
		willBeSize,
		totalSvgSize,
		multiplier,
		strokeWidth: 2 * multiplier
	};
};
function wrapPhotoToAvatar(avatarElem, photo, boxSize = 100, photoSize) {
	const middleware = avatarElem.getMiddleware();
	const cacheContext = apiManagerProxy.getCacheContext(photo, photoSize?.type);
	return wrapPhoto({
		container: avatarElem.node,
		message: null,
		photo,
		boxHeight: boxSize,
		boxWidth: boxSize,
		withoutPreloader: true,
		size: photoSize,
		noFadeIn: !!cacheContext?.downloaded,
		middleware
	}).then((result) => {
		avatarElem.node.classList.replace("media-container", "avatar-relative");
		avatarElem.node.style.width = avatarElem.node.style.height = "";
		[result.images.thumb, result.images.full].forEach((image) => {
			if (!image) return;
			image.classList.replace("media-photo", "avatar-photo");
		});
		if (result.images.thumb) result.images.thumb.classList.add("avatar-photo-thumbnail");
		if (photo?.video_sizes?.length) attachAvatarVideoFromPhoto(avatarElem.node, photo, middleware);
		return result.loadPromises.thumb;
	});
}
async function attachAvatarVideoFromPhoto(container, photo, middleware) {
	const [{ default: chooseProfileVideoSize }, { default: appDownloadManager }] = await Promise.all([__vitePreload(() => import("./chooseProfileVideoSize-DRIbjnd6.js").then((n) => n.n), __vite__mapDeps([0,1])), __vitePreload(() => import("./appDownloadManager-ClHW2-Dl.js").then((n) => n.n), __vite__mapDeps([2,1,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59]))]);
	const videoSize = chooseProfileVideoSize(photo, "full");
	if (!videoSize) return;
	const url = await appDownloadManager.downloadMediaURL({
		media: photo,
		thumb: videoSize
	});
	if (!middleware()) return;
	container.appendChild(createAvatarVideo(url, videoSize.video_start_ts, middleware));
}
function StoriesSegments(props) {
	const [storiesSegments, setStoriesSegments] = createSignal();
	const storyDimensions = createMemo((previousDimensions) => {
		if (storiesSegments() === void 0) return;
		if (previousDimensions?.size === props.size) return previousDimensions;
		return calculateSegmentsDimensions(props.size);
	});
	return {
		setStoriesSegments,
		storyDimensions,
		storiesCircle: createMemo(() => {
			const dimensions = storyDimensions();
			if (!dimensions) return;
			let simple;
			if (props.isStoryFolded !== void 0 || props.simple) {
				const status = createMemo(() => {
					const segments = storiesSegments();
					return (segments.find((segment) => segment.type === "close") || segments.find((segment) => segment.type === "unread") || segments[0]).type;
				});
				simple = (() => {
					var _el$ = _tmpl$$1();
					createRenderEffect((_$p) => classList(_el$, { ["is-" + status()]: true }, _$p));
					return _el$;
				})();
				if (props.simple) return simple;
			}
			const segmentToSection = (segment, unreadAsClose) => {
				if (segment.type === "read") return {
					color: props.colors?.read || customProperties.getProperty("avatar-color-story-read"),
					length: segment.length,
					lineWidth: dimensions.strokeWidth / 2
				};
				if (segment.type === "close" || unreadAsClose) return {
					color: closeGradient ?? (closeGradient = createCloseGradient(context, canvas.width, dpr)),
					length: segment.length,
					lineWidth: dimensions.strokeWidth
				};
				else return {
					color: unreadGradient ?? (unreadGradient = createUnreadGradient(context, canvas.width, dpr)),
					length: segment.length,
					lineWidth: dimensions.strokeWidth
				};
			};
			const dashedCircle = new DashedCircle();
			const { canvas, context, dpr } = dashedCircle;
			dashedCircle.prepare({
				radius: dimensions.size / 2,
				gap: 4 * dimensions.multiplier,
				width: dimensions.totalSvgSize,
				height: dimensions.totalSvgSize
			});
			let unreadGradient, closeGradient;
			canvas.style.setProperty("--offset", `${(dimensions.totalSvgSize - dimensions.size) / -2}px`);
			canvas.classList.add("avatar-stories-svg");
			const render = () => {
				const segments = storiesSegments();
				const firstCloseSegment = segments.find((segment) => segment.type === "close");
				let sections = segments.map((segment) => segmentToSection(segment, !!firstCloseSegment));
				const totalLength = sections.reduce((sum, section) => sum + section.length, 0);
				if (totalLength > 30) sections = sections.map((section) => ({
					...section,
					length: Math.floor(section.length / totalLength * 30)
				})).filter((section) => section.length > 0);
				dashedCircle.render(sections);
			};
			const isNightTheme = useIsNightTheme();
			createEffect(on([isNightTheme, storiesSegments], () => {
				unreadGradient = closeGradient = void 0;
				render();
			}));
			return simple ? [canvas, simple] : canvas;
		})
	};
}
var AvatarNew = (props) => {
	const [ready, setReady] = createSignal(false);
	const [icon, setIcon] = createSignal();
	const [media, setMedia] = createSignal();
	const [video, setVideo] = createSignal();
	const [thumb, setThumb] = createSignal();
	const [abbreviature, setAbbreviature] = createSignal();
	const [color, setColor] = createSignal();
	const [isForum, setIsForum] = createSignal(false);
	const [isTopic, setIsTopic] = createSignal(false);
	const [isMonoforum, setIsMonoforum] = createSignal(false);
	const [isSubscribed, setIsSubscribed] = createSignal(false);
	const { setStoriesSegments, storyDimensions, storiesCircle } = StoriesSegments({
		size: props.size,
		colors: props.storyColors,
		isStoryFolded: props.isStoryFolded
	});
	const [autoDeletePeriod, setAutoDeletePeriod] = createSignal();
	createComputed(() => setAutoDeletePeriod(props.autoDeletePeriod ?? 0));
	const autoDeletePeriodBackground = createMemo(() => {
		if (!autoDeletePeriod()) return;
		const mediaElement = toArray(resolveElements(media, (el) => el instanceof HTMLImageElement)())[0];
		if (!mediaElement) return;
		const smallSize = 20;
		const canvas = document.createElement("canvas");
		canvas.width = smallSize;
		canvas.height = smallSize;
		const imgW = mediaElement.naturalWidth;
		const imgH = mediaElement.naturalHeight;
		canvas.getContext("2d").drawImage(mediaElement, imgW * .75, imgH * .75, imgW * .25, imgH * .25, 0, 0, smallSize, smallSize);
		return computeLockColor(canvas);
	});
	const readyPromise = deferredPromise();
	const readyThumbPromise = deferredPromise();
	const myId = rootScope.myId;
	const managers = props.accountNumber ? getAccountManagers(props.accountNumber) : bindManagersToSession(rootScope.managers);
	const middlewareHelper = props.wrapOptions?.middleware ? props.wrapOptions.middleware.create() : getMiddleware();
	let addedToQueue = false, lastRenderPromise;
	onCleanup(() => {
		lastRenderPromise = void 0;
		middlewareHelper.destroy();
		readyPromise.resolve();
		readyThumbPromise.resolve();
		cleanLastKey();
		props.lazyLoadQueue?.delete({ div: node });
	});
	const _setMedia = (media) => {
		setMedia(media);
		setReady(true);
		readyPromise.resolve();
		readyThumbPromise.resolve();
	};
	const _setThumb = (thumb) => {
		setThumb(thumb);
		setReady(true);
		readyThumbPromise.resolve();
	};
	const getKey = () => getAvatarQueueKey(props.peerId, props.threadId);
	const isOtherAccount = () => !!props.accountNumber && props.accountNumber !== getCurrentAccount();
	const cleanLastKey = () => {
		if (!lastKey) return;
		const set = believeRef && believeMe.get(lastKey);
		if (set?.delete(believeRef) && !set.size) believeMe.delete(lastKey);
		believeRef = void 0;
		const avatarsSet = avatarsMap.get(lastKey);
		if (!selfRef || !avatarsSet?.delete(selfRef)) return;
		collectedAvatars.unregister(ret);
		selfRef = void 0;
		if (!avatarsSet.size) avatarsMap.delete(lastKey);
	};
	const putAvatar = async (options) => {
		const middleware = middlewareHelper.get();
		const { peerId, useCache } = props;
		const { photo, size } = options;
		if (size === (props.isBig ? "photo_big" : "photo_small")) setVideo();
		const result = apiManagerProxy.loadAvatar(peerId, photo, size, props.accountNumber);
		const loadPromise = result;
		const cached = !(result instanceof Promise);
		const animate = !cached && liteMode.isAvailable("animations") && !props.noFadeIn;
		const image = document.createElement("img");
		const element = image;
		element.className = classNames("avatar-photo", animate && "fade-in");
		element.alt = "";
		let renderThumbPromise;
		let callback;
		let thumbImage, thumbElement;
		if (cached) callback = () => {
			if (!middleware()) return;
			_setMedia(element);
		};
		else {
			if (size === "photo_big") {
				const res = await putAvatar({
					photo,
					size: "photo_small"
				});
				if (!middleware()) return;
				renderThumbPromise = res.loadThumbPromise || res.loadPromise;
				thumbImage = res.thumbImage;
			} else if (photo.stripped_thumb) {
				thumbElement = thumbImage = document.createElement("img");
				thumbImage.className = "avatar-photo avatar-photo-thumbnail";
				thumbImage.alt = "";
				const url = getPreviewURLFromBytes(photo.stripped_thumb);
				renderThumbPromise = renderImageFromUrlPromise(thumbImage, url, props.useCache, props.processImageOnLoad).then(() => {
					if (media() || !middleware()) return;
					_setThumb(thumbElement);
				});
			}
			callback = () => {
				if (!middleware()) return;
				_setMedia(element);
				if (animate) setTimeout(() => {
					image.classList.remove("fade-in");
					setThumb();
				}, animate ? FADE_IN_DURATION : 0);
				else setThumb();
			};
		}
		const renderPromise = callbackify(loadPromise, (url) => {
			const result = renderImageFromUrl(image, url, void 0, useCache, props.processImageOnLoad);
			callbackify(result, callback);
			return result instanceof Promise ? result : Promise.resolve(result);
		}).then(() => true, () => {
			if (middleware()) {
				setReady(true);
				readyPromise.resolve();
				readyThumbPromise.resolve();
			}
			return false;
		});
		const finalSize = props.isBig ? "photo_big" : "photo_small";
		const photoHasVideo = (photo._ === "userProfilePhoto" || photo._ === "chatPhoto") && photo.pFlags?.has_video;
		const ownerIsPremiumUser = photo._ === "userProfilePhoto" && !!peerId && !!apiManagerProxy.getUser(peerId.toUserId())?.pFlags?.premium;
		if ((props.isBig || props.withVideoAvatar && ownerIsPremiumUser) && liteMode.isAvailable("video") && !isOtherAccount() && photoHasVideo && size === finalSize) renderPromise.then((rendered) => {
			if (!rendered || !middleware()) return;
			const videoSize = props.isBig ? "photo_video_full" : "photo_video";
			loadAvatarVideoOverlay(peerId, photo, middleware, videoSize).then((videoElement) => {
				if (!middleware() || !videoElement) return;
				setVideo(videoElement);
			});
		});
		return {
			cached,
			loadPromise: renderPromise,
			loadThumbPromise: cached ? renderPromise : renderThumbPromise || Promise.resolve(),
			thumbImage,
			thumbElement,
			image,
			element
		};
	};
	const set = ({ abbreviature, icon, color, isForum, isTopic, isSubscribed, isMonoforum, storiesSegments }) => {
		setThumb();
		setMedia();
		setVideo();
		setIcon(icon);
		setAbbreviature(abbreviature);
		setColor(color);
		setIsForum(isForum);
		setIsTopic(isTopic);
		setIsSubscribed(isSubscribed);
		setIsMonoforum(isMonoforum);
		setStoriesSegments(storiesSegments);
	};
	const updateStoriesSegments = async () => {
		if (!props.withStories || props.peerId === rootScope.myId && props.isDialog) return;
		const segments = await (await getStoriesSegments(props.peerId, props.storyId)).result;
		if (lastRenderPromise) await (await lastRenderPromise)?.loadThumbPromise;
		setStoriesSegments(segments);
	};
	const _render = async (onlyThumb) => {
		const middleware = middlewareHelper.get();
		const { isDialog, withStories, storyId, isBig, peerTitle: title, wrapOptions } = props;
		let { peerId, threadId } = props;
		if (title !== void 0) peerId = 0;
		if (props.asAllChats) {
			set({ icon: "round_chats_filled" });
			return;
		}
		if (peerId === myId && isDialog) {
			set({
				icon: props.meAsNotes ? "mynotes" : "saved_filled",
				isForum: !props.meAsNotes && appSettings.savedAsForum
			});
			!props.meAsNotes && createRoot((dispose) => {
				createEffect(on(() => appSettings.savedAsForum, setIsForum, { defer: true }));
				middleware.onDestroy(dispose);
			});
			return;
		}
		if (threadId && apiManagerProxy.isMonoforum(peerId)) {
			peerId = threadId;
			threadId = void 0;
		}
		const otherAccountManagers = !props.peer && getOtherAccountManagers(props.accountNumber);
		const peer = props.peer ?? (otherAccountManagers ? await otherAccountManagers.appPeersManager.getPeer(peerId).catch(() => void 0) : apiManagerProxy.getPeer(peerId));
		if (!middleware()) return;
		if (title) {
			const color = getPeerAvatarColorByPeer(peer) ?? (props.peerTitleColorId ? getPeerAvatarColorById(props.peerTitleColorId) : void 0);
			const abbr = wrapAbbreviation(title);
			set({
				abbreviature: documentFragmentToNodes(abbr),
				color
			});
			return;
		}
		if (threadId) {
			const topic = await managers.dialogsStorage.getForumTopic(peerId, threadId);
			set({ isTopic: true });
			return wrapTopicIcon({
				...wrapOptions,
				middleware,
				topic,
				lazyLoadQueue: false
			}).then((icon) => {
				_setMedia(icon);
			});
		}
		if (!middleware()) return;
		if (peerId !== 0 && peerId.isUser() && peer?.pFlags?.deleted) {
			set({
				color: "archive",
				icon: "deletedaccount_filled"
			});
			return;
		}
		const _isForum = !!peer?.pFlags?.forum;
		const _isSubscribed = props.isSubscribed ?? !!peer?.subscription_until_date;
		if (withStories && !isOtherAccount() && canPollPeerStories(peer)) watchPeerStories(node, peerId, managers);
		else unwatchPeerStories(node);
		const storiesSegmentsResult = withStories && (peer?.stories_max_id || storyId) && await getStoriesSegments(peerId, storyId);
		const storiesSegments = storiesSegmentsResult?.cached ? await storiesSegmentsResult.result : void 0;
		if (!middleware()) return;
		const size = isBig ? "photo_big" : "photo_small";
		const linkedMonoforumPeer = peer?._ === "channel" && peer.pFlags?.monoforum && peer.linked_monoforum_id ? await managers.appChatsManager.getChat(peer.linked_monoforum_id.toPeerId?.()) : void 0;
		const photo = getPeerPhoto(linkedMonoforumPeer || peer);
		const avatarAvailable = !!photo;
		const avatarRendered = avatarAvailable && !!media();
		const sameAccount = props.accountNumber === getCurrentAccount();
		let isAvatarCached = sameAccount && avatarAvailable && apiManagerProxy.isAvatarCached(peerId, size);
		if (!isAvatarCached && isBig && avatarAvailable && sameAccount) isAvatarCached = apiManagerProxy.isAvatarCached(peerId, "photo_small");
		if (!middleware()) return;
		let isSet = false;
		if (!avatarRendered && !isAvatarCached) {
			let color;
			if (peerId && (peerId !== myId || !isDialog)) color = getPeerAvatarColorByPeer(peer);
			if (peerId === 1271266957) {
				set({
					color,
					icon: "reply_filled"
				});
				return;
			}
			if (peerId === 2666e3) {
				set({
					color: "violet",
					icon: "author_hidden"
				});
				return;
			}
			const abbr = getPeerInitials(peer);
			set({
				abbreviature: documentFragmentToNodes(abbr),
				color,
				isForum: _isForum,
				isSubscribed: _isSubscribed,
				isMonoforum: !!linkedMonoforumPeer,
				storiesSegments
			});
			isSet = true;
		}
		if (storiesSegmentsResult && !storiesSegmentsResult.cached) updateStoriesSegments();
		if (avatarAvailable) {
			const promise = putAvatar({
				photo,
				size,
				onlyThumb
			});
			if (isSet) return promise;
			const changeSegments = !!storiesSegments;
			const changeForum = _isForum !== isForum();
			const changeIsSubcribed = _isSubscribed !== isSubscribed();
			promise.then(({ loadThumbPromise }) => loadThumbPromise).then(() => {
				if (!middleware()) return;
				if (changeSegments) setStoriesSegments(storiesSegments);
				if (changeForum) setIsForum(_isForum);
				if (changeIsSubcribed) setIsSubscribed(_isSubscribed);
			});
			return promise;
		}
	};
	const processResult = (result) => {
		if (!result && !isTopic()) _setMedia();
		lastRenderPromise = void 0;
		return result;
	};
	let lastKey;
	let selfRef;
	let believeRef;
	const render = async (_props) => {
		const key = getKey();
		if (key !== lastKey) {
			cleanLastKey();
			lastKey = key;
			let set = avatarsMap.get(key);
			if (!set) avatarsMap.set(key, set = new WeakRefSet());
			selfRef = set.track(ret);
			collectedAvatars.register(ret, {
				map: avatarsMap,
				key,
				ref: selfRef
			}, ret);
		}
		if (_props?.peerId !== void 0 && props.peerId !== _props.peerId) {
			node.dataset.peerId = "" + _props.peerId;
			unwatchPeerStories(node);
		}
		if (_props) Object.assign(props, _props);
		middlewareHelper.clean();
		const middleware = middlewareHelper.get();
		if (props.lazyLoadQueue) {
			if (!seen.has(props.peerId)) {
				if (addedToQueue) return;
				addedToQueue = true;
				const key = getKey();
				let set = believeMe.get(key);
				if (!set) believeMe.set(key, set = new WeakRefSet());
				believeRef ?? (believeRef = new WeakRef(ret));
				set.add(believeRef);
				collectedAvatars.register(ret, {
					map: believeMe,
					key,
					ref: believeRef
				});
				props.lazyLoadQueue.push({
					div: node,
					middleware,
					load: () => {
						seen.add(props.peerId);
						return render();
					}
				});
				const result = await (lastRenderPromise = _render(true));
				if (!middleware()) return;
				return processResult(result);
			} else if (addedToQueue) props.lazyLoadQueue.delete({ div: node });
		}
		seen.add(props.peerId);
		const promise = lastRenderPromise = _render();
		const set = believeMe.get(key);
		if (set) {
			if (believeRef) {
				set.delete(believeRef);
				believeRef = void 0;
			}
			believeMe.delete(key);
			set.forEachLive((avatar) => avatar.render());
		}
		const result = await promise;
		if (!middleware()) return;
		if (addedToQueue) addedToQueue = false;
		return processResult(result);
	};
	if (props.onStoriesStatus) createEffect(() => {
		props.onStoriesStatus(!!storyDimensions());
	});
	const innerClassList = () => {
		return {
			"is-forum": isForum(),
			"is-topic": isTopic(),
			"is-monoforum": isMonoforum(),
			"is-relative": !!autoDeletePeriod(),
			"avatar-relative": !!thumb() || isSubscribed() || !!video()
		};
	};
	const classList$1 = () => {
		return {
			...!storiesCircle() && innerClassList(),
			"has-stories": !!storyDimensions()
		};
	};
	const style = () => {
		const dimensions = storyDimensions();
		return {
			"padding": dimensions ? (dimensions.size - dimensions.willBeSize) / 2 + "px" : void 0,
			"--size": isTopic() && props.wrapOptions?.customEmojiSize?.width ? props.wrapOptions.customEmojiSize.width + "px" : void 0
		};
	};
	const accessibleName = createMemo(() => {
		if (props.peerTitle !== void 0) return props.peerTitle;
		const peer = props.peer ?? (props.peerId !== void 0 ? apiManagerProxy.getPeer(props.peerId) : void 0);
		if (!peer) return "";
		return peer.title ?? [peer.first_name, peer.last_name].filter(Boolean).join(" ");
	});
	const inner = [
		memo(() => memo(() => !!icon())() && Icon(icon(), "avatar-icon", "avatar-icon-" + icon())),
		memo(thumb),
		memo(() => [media(), abbreviature()].find(Boolean)),
		memo(video),
		memo(() => memo(() => !!isSubscribed())() && currencyStarIcon({
			class: "avatar-star",
			stroke: true
		})),
		memo(() => memo(() => !!autoDeletePeriod())() && (() => {
			var _el$2 = _tmpl$3$1(), _el$4 = _el$2.firstChild;
			insert(_el$2, createComponent(Show, {
				get when() {
					return autoDeletePeriodBackground() || color();
				},
				get children() {
					var _el$3 = _tmpl$2$1();
					createRenderEffect((_p$) => {
						var _v$ = !!color(), _v$2 = autoDeletePeriodBackground() ? `url(${autoDeletePeriodBackground()})` : void 0;
						_v$ !== _p$.e && _el$3.classList.toggle("avatar-auto-delete-timer__background--color", _p$.e = _v$);
						_v$2 !== _p$.t && setStyleProperty(_el$3, "background", _p$.t = _v$2);
						return _p$;
					}, {
						e: void 0,
						t: void 0
					});
					return _el$3;
				}
			}), _el$4);
			insert(_el$4, () => createAutoDeleteIcon(autoDeletePeriod()));
			return _el$2;
		})())
	];
	const wtf = createComponent(Show, {
		get when() {
			return storyDimensions();
		},
		fallback: inner,
		get children() {
			var _el$5 = _tmpl$4$1(), _el$6 = _el$5.firstChild;
			insert(_el$5, storiesCircle, _el$6);
			insert(_el$5, (() => {
				var _c$ = memo(() => props.isStoryFolded !== void 0);
				return () => _c$() && _tmpl$5$1();
			})(), _el$6);
			insert(_el$6, inner);
			createRenderEffect((_p$) => {
				var _v$3 = `avatar avatar-like avatar-${storyDimensions().willBeSize} avatar-gradient`, _v$4 = innerClassList(), _v$5 = color();
				_v$3 !== _p$.e && className(_el$6, _p$.e = _v$3);
				_p$.t = classList(_el$6, _v$4, _p$.t);
				_v$5 !== _p$.a && setAttribute(_el$6, "data-color", _p$.a = _v$5);
				return _p$;
			}, {
				e: void 0,
				t: void 0,
				a: void 0
			});
			return _el$5;
		}
	});
	let node;
	const ret = {
		element: (() => {
			var _el$8 = _tmpl$6();
			var _ref$ = node;
			typeof _ref$ === "function" ? use(_ref$, _el$8) : node = _el$8;
			spread(_el$8, mergeProps({
				get ["class"]() {
					return `avatar avatar-like avatar-${props.size} avatar-gradient ${props.class ?? ""}`;
				},
				get classList() {
					return classList$1();
				},
				get ["data-color"]() {
					return color();
				},
				get ["data-peer-id"]() {
					return props.peerId;
				},
				get ["data-thread-id"]() {
					return props.threadId;
				},
				get ["data-story-id"]() {
					return props.storyId;
				},
				get style() {
					return style();
				},
				get role() {
					return accessibleName() ? "img" : void 0;
				},
				get ["aria-label"]() {
					return accessibleName() || void 0;
				}
			}, () => props.props || {}), false, true);
			insert(_el$8, wtf);
			return _el$8;
		})(),
		ready,
		readyPromise,
		readyThumbPromise,
		node,
		render,
		setIcon,
		setStoriesSegments,
		setIsSubscribed,
		setAutoDeletePeriod,
		updateStoriesSegments,
		getMiddleware: () => middlewareHelper.get(),
		set,
		color
	};
	avatarByElement.set(node, ret);
	middlewareHelper.onDestroy(() => unwatchPeerStories(node));
	if (props.peerId !== void 0 || props.peerTitle !== void 0 || props.peer !== void 0) render();
	return ret;
};
function AvatarNewTsx(props) {
	const el = AvatarNew(props);
	createEffect(on(() => props.peerId, () => {
		el.render();
	}));
	return el.element;
}
function avatarNew(props) {
	return createRoot((dispose) => {
		props.middleware.onDestroy(dispose);
		(props.wrapOptions ?? (props.wrapOptions = {})).middleware = props.middleware;
		return AvatarNew(props);
	});
}
//#endregion
//#region src/components/newBadge.ts
function createNewBadge() {
	const badge = document.createElement("span");
	badge.classList.add("badge", "badge-rectangle", "badge-new");
	_i18n(badge, "New");
	return badge;
}
//#endregion
//#region src/components/buttonMenu.ts
var nextButtonMenuLabelId = 0;
function setButtonMenuItemLoading(options, loading, element = options.element) {
	const iconElement = element?.querySelector(".btn-menu-item-icon:not(.btn-menu-item-icon-right)");
	if (!element || !iconElement) return;
	element.classList.toggle("is-loading", loading);
	const preloader = iconElement.querySelector(".btn-menu-item-preloader");
	if (loading && !preloader) {
		const newPreloader = putPreloader(void 0, true);
		newPreloader.classList.add("btn-menu-item-preloader");
		iconElement.append(newPreloader);
	} else if (!loading) preloader?.remove();
}
/**
* An item that cannot act where the menu was opened stays in place, dimmed and
* inert, rather than disappearing: what the menu holds does not jump around.
*/
function setButtonMenuItemDisabled(options, disabled, element = options.element) {
	if (!element) return;
	element.classList.toggle("is-disabled", disabled);
	if (disabled) element.setAttribute("aria-disabled", "true");
	else element.removeAttribute("aria-disabled");
}
function isButtonMenuItemDisabled(element) {
	return element.classList.contains("is-disabled");
}
function ButtonMenuItem(options) {
	if (options.element) return [options.separator, options.element].filter(Boolean);
	const { icon, iconDoc, iconElement, avatarInfo, className, text, onClick, checkboxField, noCheckboxClickListener, emptyIcon } = options;
	const el = document.createElement("div");
	const iconSplitted = icon?.split(" ");
	el.className = "btn-menu-item rp-overflow" + (iconSplitted?.length > 1 ? " " + iconSplitted.slice(1).join(" ") : "") + (className ? " " + className : "") + (options.danger ? " danger" : "");
	if (onClick || options.inner) {
		el.setAttribute("role", "menuitem");
		if (Modes.a11y) el.tabIndex = 0;
	}
	if (IS_MOBILE) ripple(el);
	if (iconElement) {
		iconElement.classList.add("btn-menu-item-icon");
		el.append(iconElement);
	} else if (iconSplitted) el.append(Icon(iconSplitted[0], "btn-menu-item-icon"));
	else if (emptyIcon) {
		const iconPlaceholder = document.createElement("span");
		iconPlaceholder.classList.add("btn-menu-item-icon");
		el.append(iconPlaceholder);
	}
	let textElement = options.textElement;
	if (!textElement) {
		textElement = options.textElement = text ? i18n(text, options.textArgs) : document.createElement("span");
		if (options.regularText) {
			setInnerHTML(textElement, options.regularText);
			textElement.dir = "";
		}
	}
	if (iconDoc) {
		const iconElement = document.createElement("span");
		iconElement.classList.add("btn-menu-item-icon");
		el.append(iconElement);
		const isMobile = () => document.documentElement.classList.contains("is-mobile");
		options.loadPromise = wrapAttachBotIcon({
			doc: iconDoc,
			element: iconElement,
			size: 24,
			textColor: () => isMobile() ? "secondary-text-color" : "primary-text-color",
			strokeWidth: () => isMobile() ? .625 : .375
		});
	}
	if (avatarInfo) {
		const avatar = createRoot((dispose) => {
			options.dispose = dispose;
			return AvatarNew({
				size: 24,
				...avatarInfo
			});
		});
		avatar.node.classList.add("btn-menu-item-icon", "is-external", "btn-menu-item-avatar");
		if (avatarInfo.active) avatar.node.classList.add("active");
		el.append(avatar.node);
	}
	textElement.classList.add("btn-menu-item-text");
	el.append(textElement);
	if (options.new) el.append(createNewBadge());
	const keepOpen = !!checkboxField || !!options.keepOpen;
	onClick && attachClickEvent(el, (e) => {
		cancelEvent(e);
		if (isButtonMenuItemDisabled(el)) return;
		const menu = findUpClassName(e.target, "btn-menu");
		if (menu && !menu.classList.contains("active")) return;
		onClick(e);
		if (options.checkForClose?.() === false) return;
		if (!keepOpen) contextMenuController.close();
		if (checkboxField && !noCheckboxClickListener) checkboxField.checked = checkboxField.input.type === "radio" ? true : !checkboxField.checked;
	}, options.options);
	if (checkboxField) {
		var _textElement;
		(_textElement = textElement).id || (_textElement.id = `btn-menu-item-label-${++nextButtonMenuLabelId}`);
		checkboxField.input.setAttribute("aria-labelledby", textElement.id);
		checkboxField.input.setAttribute("role", checkboxField.input.type === "radio" ? "menuitemradio" : "menuitemcheckbox");
		el.setAttribute("role", "none");
		el.removeAttribute("tabindex");
		el.append(checkboxField.label);
		el.classList.add("has-checkbox");
	}
	if (options.separator === true || options.separatorDown) {
		options.separator = document.createElement("hr");
		options.separator.setAttribute("role", "separator");
	}
	if (options.secondary) {
		el.classList.add("is-secondary");
		options.multiline = true;
	}
	if (options.multiline) el.classList.add("is-multiline");
	if (options.inner) {
		el.append(Icon("next", "btn-menu-item-icon", "btn-menu-item-icon-right"));
		el.classList.add("has-inner");
		el.inner = options.inner;
	}
	const ret = [options.element = el];
	if (options.separator) ret[options.separatorDown ? "push" : "unshift"](options.separator);
	return ret.filter(Boolean);
}
var MENU_BUTTONS = /* @__PURE__ */ new WeakMap();
function setButtonMenuListenerSetter(buttons, listenerSetter) {
	if (listenerSetter) buttons.forEach((b) => {
		(b.options ?? (b.options = {})).listenerSetter = listenerSetter;
	});
}
function setButtonMenuTabStops(buttons) {
	if (Modes.a11y) return;
	buttons.forEach(({ element, onClick, checkboxField }) => {
		if (!onClick || checkboxField || !element?.classList.contains("btn-menu-item")) return;
		element.tabIndex = 0;
	});
}
function ButtonMenuSync({ listenerSetter, buttons, radioGroups }) {
	const el = document.createElement("div");
	el.classList.add("btn-menu");
	el.setAttribute("role", "menu");
	if (radioGroups) buttons.forEach((b) => {
		if (!b.radioGroup) return;
		b.checkboxField ?? (b.checkboxField = new CheckboxField());
	});
	setButtonMenuListenerSetter(buttons, listenerSetter);
	MENU_BUTTONS.set(el, {
		buttons,
		listenerSetter
	});
	const elements = flatten(buttons.map(ButtonMenuItem));
	while (elements[0]?.tagName === "HR") elements.shift();
	while (elements[elements.length - 1]?.tagName === "HR") elements.pop();
	el.append(...elements);
	if (radioGroups) radioGroups.forEach((group) => {
		const elements = buttons.filter((button) => button.radioGroup === group.name);
		const hr = document.createElement("hr");
		hr.setAttribute("role", "separator");
		elements[0].element.replaceWith(hr);
		const container = RadioForm(elements.map((e, idx) => {
			const input = e.checkboxField.input;
			input.type = "radio";
			input.setAttribute("role", "menuitemradio");
			input.name = group.name;
			input.value = "" + +(idx === group.checked);
			input.checked = idx === group.checked;
			return {
				container: e.element,
				input: e.checkboxField.input
			};
		}), group.onChange);
		hr.before(container);
		container.append(hr);
	});
	const add = listenerSetter ? listenerSetter.add(el) : el.addEventListener.bind(el);
	if (Modes.a11y) {
		add("keydown", handleMenuKeyDown);
		return el;
	}
	setButtonMenuTabStops(buttons);
	add("keydown", (e) => {
		const target = e.target;
		const item = target.closest(".btn-menu-item");
		const button = item && buttons.find(({ element }) => element === item);
		const radioInput = button?.checkboxField?.input;
		const inlineKeys = getInlineArrowKeys();
		const radioStep = e.key === "ArrowDown" || e.key === inlineKeys.next ? 1 : e.key === "ArrowUp" || e.key === inlineKeys.previous ? -1 : 0;
		if (target === radioInput && radioInput.type === "radio" && radioStep && button.radioGroup && button.onClick) {
			const group = buttons.filter((candidate) => candidate.radioGroup === button.radioGroup && candidate.checkboxField?.input.type === "radio" && candidate.checkboxField.input.name === radioInput.name && candidate.onClick);
			const next = group[(group.indexOf(button) + radioStep + group.length) % group.length];
			if (next && next !== button) {
				cancelEvent(e);
				next.checkboxField.input.focus();
				simulateClickEvent(next.element);
			}
			return;
		}
		if (e.key !== "Enter" && e.key !== " ") return;
		const isActionRow = target === item && !!button?.onClick && !button.checkboxField;
		const isNativeChoice = target === button?.checkboxField?.input && !!button.onClick;
		if (!isActionRow && !isNativeChoice) return;
		cancelEvent(e);
		simulateClickEvent(item);
	});
	return el;
}
/**
* Adds items to the end of a menu `ButtonMenuSync` made, while it is shown — for what only an answer
* from the server tells (the links of a bank card). They act as the ones it was made with, from the
* keyboard too: the menu's own handler finds them among its items.
*/
function appendButtonMenuItems(menu, buttons) {
	const made = MENU_BUTTONS.get(menu);
	setButtonMenuListenerSetter(buttons, made?.listenerSetter);
	menu.append(...flatten(buttons.map(ButtonMenuItem)));
	made?.buttons.push(...buttons);
	setButtonMenuTabStops(buttons);
}
async function ButtonMenu(options) {
	const el = ButtonMenuSync(options);
	await Promise.all(options.buttons.map(({ loadPromise }) => loadPromise));
	return el;
}
//#endregion
//#region src/components/rowFieldClasses.ts
/**
* The classes a `Row` stamps on the fields it lays out itself.
*
* A row can also contain a checkbox that is none of its business — the selection checkbox a bubble
* drops into a document/audio row, say — and that one must not pick up the row's layout. So the
* styles in `scss/partials/_row.scss` key off these derived classes rather than off `.checkbox-field`
* / `.radio-field` outright, and only the fields registered through `Row` carry them.
*/
var ROW_CHECKBOX_FIELD_CLASS = "row-checkbox-field";
var ROW_CHECKBOX_FIELD_TOGGLE_CLASS = "row-checkbox-field-toggle";
var ROW_RADIO_FIELD_CLASS = "row-radio-field";
var RADIO_FIELD_RIGHT_CLASS = "radio-field-right";
var ROW_WITH_CHECKBOX_AND_MEDIA_CLASS = "row-with-checkbox-and-media";
var ROW_SELECTION_MEDIA_CLASS = "row-selection-media";
var ROW_SELECTION_CHECKBOX_CLASS = "row-selection-checkbox";
var ROW_SELECTION_RADIO_CLASS = "row-selection-radio";
//#endregion
//#region src/helpers/array/filterAsync.ts
async function filterAsync(arr, callback) {
	const promises = arr.map(async (item, idx, arr) => {
		if (await callback(item, idx, arr)) return item;
	});
	return (await Promise.all(promises)).filter(Boolean);
}
//#endregion
//#region src/helpers/positionMenu.ts
var PADDING_TOP = 8;
var PADDING_BOTTOM = PADDING_TOP;
var PADDING_LEFT = 8;
var PADDING_RIGHT = PADDING_LEFT;
var OPPOSITE_SIDE = {
	top: "bottom",
	bottom: "top",
	left: "right",
	right: "left"
};
function canFitSide(triggerBcr, menu, side, mainOffset) {
	const margin = 16;
	switch (side) {
		case "right": return triggerBcr.right + mainOffset + menu.clientWidth + margin <= getAppWindow().innerWidth;
		case "left": return triggerBcr.left - mainOffset - menu.clientWidth - margin >= 0;
		case "bottom": return triggerBcr.bottom + mainOffset + menu.clientHeight + margin <= getAppWindow().innerHeight;
		case "top": return triggerBcr.top - mainOffset - menu.clientHeight - margin >= 0;
	}
}
/**
* Positions a floating menu next to a trigger element.
* - `side` is the side of the trigger the menu opens on.
* - `alignment` aligns the menu along the perpendicular axis.
* - `offset` is `[x, y]`. The component along the main axis acts as a gap from the trigger,
*   the perpendicular component nudges along the alignment axis.
*
* `left`/`right` and a horizontal `start`/`end` follow the line: they swap in a right-to-left
* layout, so a submenu opens at the inline end and a menu aligned to a bubble's start stays there.
*
* Sets `left`, `top`, and `transformOrigin` on `menu`. Returns the actually used direction, in
* the same terms as `direction` (the side may flip to the opposite if the menu doesn't fit).
*/
function positionFloatingMenu(triggerBcr, menu, direction, offset = [0, 0], options = {}) {
	const isRTL = langPack_default.getIsRTL();
	const [requestedSide, alignment] = mirrorFloatingDirection(direction, isRTL).split("-");
	const isHorizontalSide = requestedSide === "left" || requestedSide === "right";
	const mainOffset = isHorizontalSide ? offset[0] : offset[1];
	const crossOffset = isHorizontalSide ? offset[1] : offset[0];
	const opposite = OPPOSITE_SIDE[requestedSide];
	const side = options.flip === false || canFitSide(triggerBcr, menu, requestedSide, mainOffset) || !canFitSide(triggerBcr, menu, opposite, mainOffset) ? requestedSide : opposite;
	const margin = 16;
	const menuW = menu.clientWidth;
	const menuH = menu.clientHeight;
	let left;
	let top;
	if (side === "right" || side === "left") {
		if (side === "right") left = triggerBcr.right + mainOffset;
		else left = triggerBcr.left - mainOffset - menuW;
		left = clamp(left, margin, getAppWindow().innerWidth - menuW - margin);
		if (alignment === "start") top = triggerBcr.top + crossOffset;
		else if (alignment === "center") top = triggerBcr.top + triggerBcr.height / 2 - menuH / 2 + crossOffset;
		else top = triggerBcr.bottom - menuH - crossOffset;
		top = clamp(top, margin, getAppWindow().innerHeight - menuH - margin);
	} else {
		if (side === "bottom") top = triggerBcr.bottom + mainOffset;
		else top = triggerBcr.top - mainOffset - menuH;
		top = clamp(top, margin, getAppWindow().innerHeight - menuH - margin);
		if (alignment === "start") left = triggerBcr.left + crossOffset;
		else if (alignment === "center") left = triggerBcr.left + triggerBcr.width / 2 - menuW / 2 + crossOffset;
		else left = triggerBcr.right - menuW - crossOffset;
		left = clamp(left, margin, getAppWindow().innerWidth - menuW - margin);
	}
	let originX;
	let originY;
	const alignmentToPercent = alignment === "start" ? "0" : alignment === "center" ? "50%" : "100%";
	if (side === "right" || side === "left") {
		originX = side === "right" ? "0" : "100%";
		originY = alignmentToPercent;
	} else {
		originY = side === "bottom" ? "0" : "100%";
		originX = alignmentToPercent;
	}
	menu.style.left = left + "px";
	menu.style.top = top + "px";
	menu.style.transformOrigin = `${originX} ${originY}`;
	return mirrorFloatingDirection(`${side}-${alignment}`, isRTL);
}
function mirrorFloatingDirection(direction, isRTL) {
	if (!isRTL) return direction;
	const [side, alignment] = direction.split("-");
	if (side === "left" || side === "right") return `${OPPOSITE_SIDE[side]}-${alignment}`;
	return `${side}-${alignment === "start" ? "end" : alignment === "end" ? "start" : alignment}`;
}
function positionMenu(e, elem, side, additionalPadding) {
	if (e.touches) e = e.touches[0];
	const { pageX, pageY } = e;
	const getScrollWidthFromElement = Array.from(elem.children).find((element) => element.classList.contains("btn-menu-items") || element.classList.contains("btn-menu-item") && !element.classList.contains("hide")) || elem;
	let { scrollWidth: menuWidth } = getScrollWidthFromElement;
	const { scrollHeight: menuHeight } = elem;
	const rect = getAppWindow().document.body.getBoundingClientRect();
	const windowWidth = rect.width;
	const windowHeight = rect.height;
	menuWidth += getScrollWidthFromElement.offsetLeft * 2;
	let paddingTop = PADDING_TOP, paddingRight = PADDING_RIGHT, paddingBottom = PADDING_BOTTOM, paddingLeft = PADDING_LEFT;
	if (additionalPadding) {
		if (additionalPadding.top) paddingTop += additionalPadding.top;
		if (additionalPadding.right) paddingRight += additionalPadding.right;
		if (additionalPadding.bottom) paddingBottom += additionalPadding.bottom;
		if (additionalPadding.left) paddingLeft += additionalPadding.left;
	}
	if (langPack_default.getIsRTL()) side = mediaSizes.isMobile ? "left" : "right";
	else side = mediaSizes.isMobile ? "right" : "left";
	let verticalSide = "top";
	const maxTop = windowHeight - menuHeight - paddingBottom;
	const maxLeft = windowWidth - menuWidth - paddingRight;
	const minLeft = paddingLeft;
	const getSides = () => {
		return {
			x: {
				left: pageX,
				right: Math.min(maxLeft, pageX - menuWidth)
			},
			intermediateX: side === "right" ? minLeft : maxLeft,
			y: {
				top: pageY,
				bottom: pageY - menuHeight
			},
			intermediateY: maxTop
		};
	};
	const sides = getSides();
	const possibleSides = {
		x: {
			left: sides.x.left + menuWidth + paddingRight <= windowWidth,
			right: sides.x.right >= paddingLeft
		},
		y: {
			top: sides.y.top + menuHeight + paddingBottom <= windowHeight,
			bottom: sides.y.bottom - paddingBottom >= paddingBottom
		}
	};
	{
		const left = possibleSides.x[side] ? sides.x[side] : (side = "center", sides.intermediateX);
		elem.style.left = left + "px";
	}
	{
		const top = possibleSides.y[verticalSide] ? sides.y[verticalSide] : (verticalSide = "center", sides.intermediateY);
		elem.style.top = top + "px";
	}
	elem.className = elem.className.replace(/(top|center|bottom)-(left|center|right)/g, "");
	elem.classList.add((verticalSide === "center" ? verticalSide : "bottom") + "-" + (side === "center" ? side : (langPack_default.getIsRTL() ? side === "right" : side === "left") ? "right" : "left"));
	return {
		width: menuWidth,
		height: menuHeight
	};
}
function positionMenuTrigger(trigger, menu, direction, additionalPadding) {
	const triggerRect = trigger.getBoundingClientRect();
	const [directionX, directionY] = direction.split("-");
	if (directionX === "bottom") {
		const top = triggerRect.top + triggerRect.height + (additionalPadding?.top ?? 0);
		menu.style.top = `${Math.max(top, additionalPadding?.top ?? 0)}px`;
	} else {
		const bottom = getAppWindow().innerHeight - triggerRect.top + (additionalPadding?.bottom ?? 0);
		menu.style.bottom = `${Math.max(bottom, additionalPadding?.bottom ?? 0)}px`;
	}
	const documentRTL = langPack_default.getIsRTL();
	const rtl = documentRTL && !trigger.closest("[dir=\"ltr\"]");
	if (rtl) {
		if (directionY === "right" || directionY === "center") {
			const paddingRight = additionalPadding?.right ?? 0;
			const right = Math.max(getAppWindow().innerWidth - triggerRect.right + paddingRight, paddingRight);
			menu.style.left = `${getAppWindow().innerWidth - right - menu.offsetWidth}px`;
			menu.style.right = "auto";
		} else {
			const paddingLeft = additionalPadding?.left ?? 0;
			menu.style.left = `${Math.max(triggerRect.left - paddingLeft, paddingLeft)}px`;
		}
	} else if (directionY === "right" || directionY === "center") {
		const left = triggerRect.left + (additionalPadding?.left ?? 0);
		menu.style.left = `${Math.max(left, additionalPadding?.left ?? 0)}px`;
		if (documentRTL) menu.style.right = "auto";
	} else {
		const right = getAppWindow().innerWidth - triggerRect.left - triggerRect.width - (additionalPadding?.right ?? 0);
		menu.style.right = `${Math.max(right, additionalPadding?.right ?? 0)}px`;
		if (documentRTL) menu.style.left = "auto";
	}
	if (rtl !== (documentRTL && !menu.closest("[dir=\"ltr\"]"))) {
		menu.style.setProperty("--reflect", rtl ? "-1" : "1");
		menu.style.setProperty("--transform-origin-inline-start", rtl ? "right" : "left");
		menu.style.setProperty("--transform-origin-inline-end", rtl ? "left" : "right");
	}
	if (directionY === "center") menu.style.setProperty("--parent-half-width", trigger.clientWidth / 2 + "px");
}
//#endregion
//#region src/helpers/dom/attachContextMenuListener.ts
var _cancelContextMenuOpening = false;
var _cancelContextMenuOpeningTimeout = 0;
function cancelContextMenuOpening() {
	if (_cancelContextMenuOpeningTimeout) clearTimeout(_cancelContextMenuOpeningTimeout);
	_cancelContextMenuOpeningTimeout = window.setTimeout(() => {
		_cancelContextMenuOpeningTimeout = 0;
		_cancelContextMenuOpening = false;
	}, 400);
	_cancelContextMenuOpening = true;
}
function attachContextMenuListener({ element, callback, listenerSetter, listenerOptions }) {
	const add = listenerSetter ? listenerSetter.add(element) : element.addEventListener.bind(element);
	const remove = listenerSetter ? listenerSetter.removeManual.bind(listenerSetter, element) : element.removeEventListener.bind(element);
	if (Modes.a11y) add("keydown", (event) => {
		if (event.defaultPrevented || event.repeat || event.key !== "ContextMenu" && !(event.shiftKey && event.key === "F10")) return;
		const target = event.target;
		if (target.closest("input, textarea, [contenteditable=\"true\"]")) return;
		event.preventDefault();
		event.stopPropagation();
		const rect = target.getBoundingClientRect();
		const win = target.ownerDocument.defaultView;
		target.dispatchEvent(new win.MouseEvent("contextmenu", {
			bubbles: true,
			cancelable: true,
			clientX: rect.left + rect.width / 2,
			clientY: rect.top + rect.height / 2
		}));
	});
	if (IS_APPLE && IS_TOUCH_SUPPORTED || listenerOptions) {
		if (Modes.a11y) add("contextmenu", (event) => {
			if (!event.isTrusted && event.button === 0) callback(event);
		}, listenerOptions);
		let timeout;
		const options = {
			...listenerOptions || {},
			capture: true
		};
		const onCancel = () => {
			clearTimeout(timeout);
			remove("touchmove", onCancel, options);
			remove("touchend", onCancel, options);
			remove("touchcancel", onCancel, options);
		};
		add("touchstart", (e) => {
			if (e.touches.length > 1) {
				onCancel();
				return;
			}
			add("touchmove", onCancel, options);
			add("touchend", onCancel, options);
			add("touchcancel", onCancel, options);
			timeout = window.setTimeout(() => {
				if (_cancelContextMenuOpening) {
					onCancel();
					return;
				}
				callback(e);
				onCancel();
				if (contextMenuController.isOpened()) add("touchend", cancelEvent, { once: true });
			}, 400);
		}, listenerOptions);
	} else add("contextmenu", IS_TOUCH_SUPPORTED ? (e) => {
		callback(e);
		if (contextMenuController.isOpened()) add("touchend", cancelEvent, { once: true });
	} : callback, listenerOptions);
}
//#endregion
//#region src/helpers/verifyMenuItem.ts
/**
* Whether a menu item stays in its menu. A `verify` that throws or rejects (a request the server refused,
* a flood wait) leaves out its own item only: every menu filters its items through here, so one failing
* check can never keep the whole menu from opening. A flow the tab has left (the account switched away,
* the screen gone) still stops the menu, as it stops anything else.
*/
async function verifyMenuItem(item) {
	if (!item?.verify) return true;
	try {
		return !!await item.verify();
	} catch (err) {
		if (err?.type === "MIDDLEWARE") throw err;
		return false;
	}
}
//#endregion
//#region src/helpers/dom/createContextMenu.ts
var log = logger("createContextMenu");
function createContextMenu({ buttons, findElement, listenTo, appendTo, resolveAppendTo, filterButtons, onOpen, onClose, onCloseAfter, onElementReady, onOpenBefore, onOpenAfter, listenerSetter: attachListenerSetter, middleware, listenForClick, position, reopenOnTrigger, cancelOnOpenFalse }) {
	attachListenerSetter ?? (attachListenerSetter = new ListenerSetter());
	if (listenForClick && !findElement) {
		ensureButtonSemantics(listenTo);
		listenTo.setAttribute("aria-haspopup", "menu");
		listenTo.setAttribute("aria-expanded", "false");
	}
	const instances = /* @__PURE__ */ new Set();
	let element;
	let destroyed = false;
	let openGeneration = 0;
	const open = (e) => {
		if (destroyed) return;
		const target = findElement ? findElement(e) : listenTo;
		if (!target) return;
		let _element = element;
		const generation = ++openGeneration;
		if ("preventDefault" in e) e.preventDefault();
		if (_element && _element.classList.contains("active")) {
			if (!reopenOnTrigger) return false;
			contextMenuController.close();
			_element = void 0;
		}
		if ("cancelBubble" in e) e.cancelBubble = true;
		const isCurrent = () => !destroyed && generation === openGeneration;
		const r = async () => {
			try {
				const openResult = await onOpen?.(e, target);
				if (cancelOnOpenFalse && openResult === false || !isCurrent()) {
					onClose?.();
					return;
				}
			} catch (e) {
				if (e instanceof Error) log.error("Error opening context menu:", e);
				else log("Opening context menu was blocked, reason:", e);
				onClose?.();
				return;
			}
			let initResult;
			try {
				initResult = await init(isCurrent);
			} catch (e) {
				log.error("Error creating context menu:", e);
				onClose?.();
				return;
			}
			if (!initResult || !isCurrent()) {
				initResult?.destroy();
				onClose?.();
				return;
			}
			target.classList.add("menu-open");
			if (listenForClick && !findElement) target.setAttribute("aria-expanded", "true");
			_element = initResult.element;
			element = _element;
			const { cleanup, destroy } = initResult;
			if (position) position(e, _element, target);
			else positionMenu(e, _element);
			contextMenuController.openBtnMenu(_element, () => {
				target.classList.remove("menu-open");
				if (listenForClick && !findElement) target.setAttribute("aria-expanded", "false");
				onClose?.();
				cleanup();
				setTimeout(() => {
					onCloseAfter?.();
					destroy();
				}, 300);
			}, target);
			onOpenAfter?.(_element, target);
		};
		return r();
	};
	attachContextMenuListener({
		element: listenTo,
		callback: open,
		listenerSetter: attachListenerSetter
	});
	const destroy = () => {
		if (destroyed) return;
		destroyed = true;
		++openGeneration;
		if (element?.classList.contains("active")) contextMenuController.close();
		attachListenerSetter.removeAll();
		[...instances].forEach((instance) => instance.destroy());
		element = void 0;
	};
	const close = () => {
		if (destroyed) return;
		++openGeneration;
		if (element?.classList.contains("active")) contextMenuController.close();
	};
	const init = async (isCurrent) => {
		buttons.forEach((button) => button.element = void 0);
		const filteredButtons = await (filterButtons || ((buttons) => filterAsync(buttons, verifyMenuItem)))(buttons);
		if (!isCurrent() || !filteredButtons.length) return;
		const listenerSetter = new ListenerSetter();
		const middlewareHelper = middleware ? middleware.create() : getMiddleware();
		let _element;
		const disposeUnpublished = () => {
			listenerSetter.removeAll();
			middlewareHelper.destroy();
			_element?.remove();
		};
		try {
			_element = await ButtonMenu({
				buttons: filteredButtons,
				listenerSetter
			});
			if (!isCurrent()) {
				disposeUnpublished();
				return;
			}
			_element.classList.add("contextmenu");
			await onOpenBefore?.();
			if (!isCurrent()) {
				disposeUnpublished();
				return;
			}
			onElementReady?.(_element);
			(resolveAppendTo?.() ?? appendTo ?? getOverlayRoot()).append(_element);
		} catch (err) {
			disposeUnpublished();
			throw err;
		}
		let cleaned = false;
		let instanceDestroyed = false;
		const cleanup = () => {
			if (cleaned) return;
			cleaned = true;
			listenerSetter.removeAll();
			middlewareHelper.clean();
		};
		const instance = {
			element: _element,
			cleanup,
			destroy: () => {
				if (instanceDestroyed) return;
				instanceDestroyed = true;
				listenerSetter.removeAll();
				middlewareHelper.destroy();
				_element.remove();
				instances.delete(instance);
				if (element === _element) element = void 0;
			}
		};
		instances.add(instance);
		return instance;
	};
	if (middleware) middleware.onDestroy(() => {
		destroy();
	});
	if (listenForClick) attachClickEvent(listenTo, open, { listenerSetter: attachListenerSetter });
	return {
		get element() {
			return element;
		},
		close,
		destroy,
		open
	};
}
//#endregion
//#region src/components/checkboxFieldTsx.tsx
/** The control only — put the label in a `Row.Title` next to `Row.CheckboxField` */
function CheckboxFieldTsx(props) {
	const [checked, setChecked] = props.signal ?? createSignal(props.checked ?? false);
	const checkboxField = new CheckboxField({
		toggle: props.toggle,
		toggleLockIcon: props.lockIcon,
		round: props.round,
		color: props.color,
		name: props.name,
		stateValues: props.stateValues,
		stateValueReverse: props.stateValueReverse,
		restriction: props.restriction,
		listenerSetter: props.listenerSetter,
		asRadio: props.asRadio,
		stateKey: props.stateKey,
		...props.signal || props.checked !== void 0 ? { checked: checked() } : {}
	});
	props.ref?.(checkboxField);
	createEffect(on(checked, () => {
		checkboxField.setValueSilently(checked());
	}, { defer: true }));
	createEffect(on(() => props.lockIcon, (icon) => {
		checkboxField.setToggleLockIcon(icon);
	}, { defer: true }));
	createEffect(on(() => props.checked, (value) => {
		if (value === void 0) return;
		setChecked(value);
	}));
	createEffect(() => {
		checkboxField.toggleDisability(!!props.disabled);
	});
	subscribeOn(checkboxField.input)("change", () => {
		setChecked(checkboxField.input.checked);
		untrack(() => props.onChange?.(checked()));
	});
	attachClassName(checkboxField.label, () => props.class);
	return checkboxField.label;
}
//#endregion
//#region src/helpers/solid/createComponentContext.ts
function createComponentContext() {
	return {
		context: createContext(),
		createValue: () => {
			const [store, setStore] = createStore({});
			const register = (kind, element) => {
				const resolved = children(() => element);
				createRenderEffect(() => {
					setStore(kind, resolved());
				});
				onCleanup(() => setStore(kind, void 0));
			};
			return {
				register,
				store
			};
		}
	};
}
//#endregion
//#region src/helpers/rowIconBackground.ts
var OVERLAY_COLOR = [
	255,
	255,
	255
];
var OVERLAY_OPACITY = .14;
var ROW_ICON_COLORS = {
	blue: "#2196F3",
	green: "#4CAF50",
	grey: "#78909C",
	orange: "#FB8C00",
	pink: "#E91E63",
	purple: "#7E57C2",
	red: "#F44336"
};
var ROW_ICON_COLOR_BY_NAME = {
	account_filled: "blue",
	addmember_filled: "orange",
	admin_filled: "green",
	affiliate_filled: "purple",
	ai_filled: "purple",
	android_filled: "green",
	appearance_filled: "orange",
	apple_filled: "blue",
	auto_delete_filled: "grey",
	bell_filled: "red",
	bin_filled: "red",
	birthday_filled: "purple",
	bot_filled: "green",
	bubble_filled: "pink",
	business_filled: "green",
	channel_filled: "orange",
	checkboxblock: "red",
	checkboxon: "blue",
	checklist_add: "green",
	checklist_done: "green",
	commentssticker_filled: "red",
	darkmode_filled: "purple",
	data_filled: "green",
	data_transfer_filled: "blue",
	delete_filled: "red",
	devices_filled: "blue",
	email_filled: "purple",
	emoji_filled: "orange",
	eye1_filled: "orange",
	faceid_filled: "green",
	faq_filled: "blue",
	gift_filled: "orange",
	general_filled: "grey",
	gram_filled: "blue",
	group_circle_filled: "blue",
	group_filled: "green",
	info_filled: "grey",
	key_filled: "grey",
	keyboard_filled: "orange",
	lamp_filled: "purple",
	limit_file_filled: "blue",
	limit_folders_filled: "blue",
	link_filled: "orange",
	linux_filled: "orange",
	lock_filled: "red",
	lockoff: "green",
	location: "red",
	location_filled: "green",
	message_filled: "green",
	mention_filled: "blue",
	newchannel_filled: "orange",
	newprivate_filled: "blue",
	person_crossed_filled: "grey",
	person_filled: "blue",
	phone_filled: "green",
	photo_filled: "orange",
	pie_chart_filled: "green",
	plus_circle_filled: "green",
	policy_filled: "green",
	poll_multiple_answers_filled: "blue",
	premium_avatars_filled: "pink",
	premium_filesize_filled: "blue",
	premium_lock_filled: "grey",
	reactions_filled: "pink",
	recent_actions_filled: "green",
	replace_circles: "orange",
	round_chats_filled: "green",
	saved_filled: "blue",
	sending: "orange",
	speaker_filled: "green",
	sputnik_filled: "purple",
	star_circle_filled: "orange",
	statistics_filled: "purple",
	sticker_filled: "purple",
	stories_filled: "purple",
	tag_alt_filled: "blue",
	time_filled: "pink",
	timer_filled: "orange",
	topics_filled: "purple",
	two_factor_auth_filled: "green",
	ubuntu_filled: "red",
	web_a_filled: "purple",
	web_filled: "purple",
	web_k_filled: "purple",
	win_key_filled: "blue"
};
var ROW_ICON_COLOR_VALUES = Object.values(ROW_ICON_COLORS);
var hashIconName = (icon) => {
	let hash = 2166136261;
	for (let i = 0; i < icon.length; ++i) {
		hash ^= icon.charCodeAt(i);
		hash = Math.imul(hash, 16777619);
	}
	return hash >>> 0;
};
var formatOffset = (offset) => {
	return `${+(offset * 100).toFixed(4)}%`;
};
function getRowIconBackgroundColor(icon) {
	const registeredColor = ROW_ICON_COLOR_BY_NAME[icon];
	return registeredColor && ROW_ICON_COLORS[registeredColor] || ROW_ICON_COLOR_VALUES[hashIconName(icon) % ROW_ICON_COLOR_VALUES.length];
}
/**
* Reproduces the Figma Row icon backdrop without mix-blend-mode.
*
* Figma draws a white 100% -> 0% alpha gradient at 14% fill opacity over an
* opaque base color using plus-lighter. The blend can clip individual RGB
* channels before the gradient reaches its top edge, so those clipping points
* are emitted as extra CSS stops instead of approximating the result with two
* colors.
*/
function getRowIconBackground(color) {
	const backdrop = hexToRgb(color);
	const offsets = /* @__PURE__ */ new Set([0, 1]);
	backdrop.forEach((value, index) => {
		const maximumAddition = OVERLAY_COLOR[index] * OVERLAY_OPACITY;
		if (!maximumAddition || value + maximumAddition <= 255) return;
		offsets.add(1 - (255 - value) / maximumAddition);
	});
	return `linear-gradient(180deg, ${[...offsets].sort((a, b) => a - b).map((offset) => {
		const stopColor = mixColorsPlusLighter(backdrop, OVERLAY_COLOR, OVERLAY_OPACITY * (1 - offset));
		return `${rgbaToHexa(stopColor)} ${formatOffset(offset)}`;
	}).join(", ")})`;
}
function getRowIconBackgroundImage(icon) {
	if (icon === "premium_badge") return "var(--premium-gradient)";
	return getRowIconBackground(getRowIconBackgroundColor(icon));
}
//#endregion
//#region src/components/rowTsx.tsx
var _tmpl$ = /*#__PURE__*/ template(`<div class=row-right>`);
var _tmpl$2 = /*#__PURE__*/ template(`<div dir=auto>`);
var _tmpl$3 = /*#__PURE__*/ template(`<div>`);
var _tmpl$4 = /*#__PURE__*/ template(`<span>`);
var _tmpl$5 = /*#__PURE__*/ template(`<span aria-hidden=true class=row-icon-text>`);
var createRowTitle = () => {
	const title = document.createElement("div");
	title.classList.add("row-title");
	title.dir = "auto";
	return title;
};
var { context: RowContext, createValue: createRowValue } = createComponentContext();
function registerExternalElement(context, kind, element, className) {
	createRenderEffect(() => {
		const currentElement = element();
		const classes = className().split(" ").filter(Boolean);
		if (!currentElement) return;
		const addedClasses = classes.filter((className) => !currentElement.classList.contains(className));
		currentElement.classList.add(...addedClasses);
		onCleanup(() => currentElement.classList.remove(...addedClasses));
	});
	return context.register(kind, createComponent(Show, {
		keyed: true,
		get when() {
			return element();
		},
		children: (currentElement) => currentElement
	}));
}
var Row = (props) => {
	const value = {
		...createRowValue(),
		get noWrap() {
			return props.noWrap;
		},
		get toggleAside() {
			return !!(this.store.checkboxFieldToggle && this.store.subtitle && !this.store.rightContent);
		}
	};
	const { store } = value;
	const [hasNestedControl, setHasNestedControl] = createSignal(false);
	let containerElement;
	const isCheckbox = () => !!(store.checkboxField || store.checkboxFieldToggle || store.radioField || store.radioFieldRight);
	const isClickable = () => !!(props.clickable || isCheckbox() || props.contextMenu);
	const inferredButton = () => isClickable() && !isCheckbox() && !props.as && !hasNestedControl();
	const role = () => props.role || (inferredButton() ? "button" : void 0);
	const setupAccessibility = () => {
		if (!isClickable()) return;
		let primaryTarget;
		const clearPrimaryTarget = () => {
			if (!primaryTarget) return;
			primaryTarget.removeEventListener("keydown", buttonKeyDown);
			primaryTarget.removeAttribute("role");
			primaryTarget.removeAttribute("tabindex");
			primaryTarget.removeAttribute("aria-disabled");
			primaryTarget = void 0;
		};
		const update = () => {
			const title = containerElement.querySelector(".row-title");
			containerElement.querySelectorAll("input[type=\"checkbox\"], input[type=\"radio\"]").forEach((control) => labelControl(control, title));
			const nested = Array.from(containerElement.querySelectorAll("button, a[href], input, select, textarea, [contenteditable=\"true\"], [role=\"button\"], [tabindex]")).filter((element) => element !== primaryTarget);
			setHasNestedControl(!!nested.length);
			const needsPrimaryTarget = !props.as && !props.role && !isCheckbox() && nested.length && title && !nested.some((element) => title.contains(element) || element.matches("input, select, textarea, [contenteditable=\"true\"]") && !element.closest(".row-right"));
			if (!needsPrimaryTarget || primaryTarget !== title) clearPrimaryTarget();
			if (needsPrimaryTarget) {
				primaryTarget = title;
				primaryTarget.setAttribute("role", "button");
				if (Modes.a11y) primaryTarget.tabIndex = props.disabled ? -1 : 0;
				primaryTarget.setAttribute("aria-disabled", String(!!props.disabled));
				primaryTarget.addEventListener("keydown", buttonKeyDown);
			}
		};
		createRenderEffect(update);
		const observer = Modes.a11y ? new MutationObserver(update) : void 0;
		observer?.observe(containerElement, {
			childList: true,
			subtree: true
		});
		onCleanup(() => {
			observer?.disconnect();
			clearPrimaryTarget();
		});
	};
	const haveRipple = () => !!(!props.noRipple && isClickable());
	const havePadding = () => !!(props.havePadding || store.icon || store.checkboxField || store.radioField || store.media);
	const resolvedChildren = children(() => createComponent(RowContext.Provider, {
		value,
		get children() {
			return props.children;
		}
	}));
	let openContextMenu;
	const ref = (container) => {
		containerElement = container;
		const listenerSetter = new ListenerSetter();
		if (props.contextMenu) {
			const { open } = createContextMenu({
				...props.contextMenu,
				listenTo: container,
				listenerSetter
			});
			openContextMenu = open;
			props.openContextMenuRef?.(open);
		}
		onCleanup(() => {
			openContextMenu = void 0;
			props.openContextMenuRef?.();
			listenerSetter.removeAll();
		});
		if (typeof props.ref === "function") props.ref(container);
	};
	const onLegacyKeyDown = (event) => {
		if (event.key !== "Enter" && event.key !== " ") return;
		event.preventDefault();
		event.currentTarget.click();
	};
	const onClick = (event) => {
		if (Modes.a11y && (props.disabled || props["aria-disabled"])) return;
		const clickable = props.clickable;
		if (typeof clickable === "function") {
			if (!hasMouseMovedSinceDown(event)) clickable(event);
			return;
		}
		openContextMenu?.(event);
	};
	const element = createComponent(RippleElement, {
		ref,
		get component() {
			return memo(() => props.as === "a")() ? "a" : props.as === "label" || isCheckbox() ? "label" : "div";
		},
		get role() {
			return role();
		},
		get tabIndex() {
			return props.tabIndex ?? (Modes.a11y && role() === "button" ? props.disabled ? -1 : 0 : void 0);
		},
		get ["aria-checked"]() {
			return props["aria-checked"];
		},
		get ["aria-disabled"]() {
			return props["aria-disabled"] || props.disabled ? true : void 0;
		},
		get classList() {
			return {
				"row": true,
				"no-subtitle": !store.subtitle,
				"no-wrap": value.noWrap,
				"row-with-icon": !!store.icon,
				"row-with-padding": havePadding(),
				[`row-clickable hover-${props.color ? props.color + "-" : ""}effect`]: isClickable(),
				"is-disabled": props.disabled,
				"is-fake-disabled": props.fakeDisabled,
				"row-grid": !!store.rightContent || value.toggleAside,
				"with-midtitle": !!store.midtitle,
				...props.classList || {},
				[props.class]: !!props.class
			};
		},
		get onClick() {
			return typeof props.clickable === "function" || props.contextMenu ? onClick : void 0;
		},
		get ["aria-label"]() {
			return props["aria-label"];
		},
		get style() {
			return props.style;
		},
		get onKeyDown() {
			return memo(() => !!props["on:keydown"])() ? void 0 : memo(() => !!Modes.a11y)() ? !isCheckbox() && isClickable() ? buttonKeyDown : void 0 : props.tabIndex !== void 0 && props.clickable ? onLegacyKeyDown : void 0;
		},
		get ["on:keydown"]() {
			return props["on:keydown"];
		},
		get noRipple() {
			return !haveRipple();
		},
		get children() {
			return [
				memo(() => resolvedChildren()),
				memo(() => store.title),
				memo(() => store.midtitle),
				memo(() => store.subtitle),
				memo(() => store.icon),
				memo(() => store.checkboxField || store.radioField),
				memo(() => store.rightContent),
				createComponent(Show, {
					get when() {
						return value.toggleAside;
					},
					get children() {
						var _el$ = _tmpl$();
						insert(_el$, () => store.checkboxFieldToggle);
						return _el$;
					}
				}),
				memo(() => store.media)
			];
		}
	});
	onMount(setupAccessibility);
	return element;
};
Row.RowPart = (props) => {
	const resolved = children(() => props.part);
	return createComponent(Show, {
		get when() {
			return !!props.elementRef || !!resolved();
		},
		get children() {
			var _el$2 = _tmpl$2();
			use((element) => {
				if (typeof props.elementRef === "function") props.elementRef(element);
			}, _el$2);
			insert(_el$2, resolved);
			createRenderEffect(() => className(_el$2, classNames("row-" + props.class, useContext(RowContext).noWrap && "no-wrap")));
			return _el$2;
		}
	});
};
Row.Row = (props) => {
	const part = () => createComponent(Row.RowPart, {
		get elementRef() {
			return props.leftRef;
		},
		get ["class"]() {
			return classNames(props.class, props.additionalClass);
		},
		get part() {
			return props.left;
		}
	});
	const resolved = children(() => props.right);
	return createComponent(Show, {
		get when() {
			return !!props.rightRef || !!resolved();
		},
		get fallback() {
			return part();
		},
		get children() {
			var _el$3 = _tmpl$3();
			insert(_el$3, part, null);
			insert(_el$3, createComponent(Row.RowPart, {
				get elementRef() {
					return props.rightRef;
				},
				get ["class"]() {
					return classNames(props.class, props.additionalClass, props.rightAdditionalClass, `row-${props.class}-right${props.rightSecondary ? ` row-${props.class}-right-secondary` : ""}`);
				},
				get part() {
					return resolved();
				}
			}), null);
			createRenderEffect(() => className(_el$3, classNames("row-row", `row-${props.class}-row`, props.rowClass)));
			return _el$3;
		}
	});
};
Row.Title = (props) => {
	const context = useContext(RowContext);
	const explicitRight = children(() => props.titleRight);
	const control = () => context.store.radioFieldRight || (context.toggleAside ? void 0 : context.store.checkboxFieldToggle);
	const right = () => {
		const explicit = explicitRight();
		const currentControl = control();
		return explicit && currentControl ? [explicit, currentControl] : explicit || currentControl;
	};
	return context.register("title", createComponent(Row.Row, {
		"class": "title",
		get rowClass() {
			return props.rowClass;
		},
		get additionalClass() {
			return props.class;
		},
		get left() {
			return props.children;
		},
		get right() {
			return right();
		},
		get rightAdditionalClass() {
			return classNames(props.titleRightClass, !!(explicitRight() && control()) && "row-title-right-with-control");
		},
		get rightSecondary() {
			return props.titleRightSecondary;
		},
		get leftRef() {
			return props.ref;
		},
		get rightRef() {
			return props.titleRightRef;
		}
	}));
};
Row.Midtitle = (props) => {
	return useContext(RowContext).register("midtitle", createComponent(Row.Row, {
		"class": "midtitle",
		get left() {
			return props.children;
		},
		get right() {
			return props.midtitleRight;
		},
		get leftRef() {
			return props.ref;
		}
	}));
};
Row.Subtitle = (props) => {
	return useContext(RowContext).register("subtitle", createComponent(Row.Row, {
		"class": "subtitle",
		get additionalClass() {
			return props.class;
		},
		get left() {
			return props.children;
		},
		get right() {
			return props.subtitleRight;
		},
		get leftRef() {
			return props.ref;
		},
		get rightRef() {
			return props.subtitleRightRef;
		}
	}));
};
Row.Icon = (props) => {
	return useContext(RowContext).register("icon", (() => {
		var _el$4 = _tmpl$4();
		insert(_el$4, (() => {
			var _c$ = memo(() => !!props.text);
			return () => _c$() ? (() => {
				var _el$5 = _tmpl$5();
				insert(_el$5, () => props.text);
				return _el$5;
			})() : createComponent(IconTsx, {
				get icon() {
					return props.icon;
				},
				"class": "row-icon-icon"
			});
		})());
		createRenderEffect((_p$) => {
			var _v$ = classNames("row-icon", !props.noBackground && "row-icon-colored", props.class), _v$2 = !props.noBackground && { "background-image": getRowIconBackgroundImage(props.icon) };
			_v$ !== _p$.e && className(_el$4, _p$.e = _v$);
			_p$.t = style(_el$4, _v$2, _p$.t);
			return _p$;
		}, {
			e: void 0,
			t: void 0
		});
		return _el$4;
	})());
};
Row.RightContent = (inProps) => {
	const context = useContext(RowContext);
	if ("element" in inProps) return registerExternalElement(context, "rightContent", () => inProps.element, () => classNames("row-right", inProps.class));
	const [props, restProps] = splitProps(inProps, ["class", "children"]);
	const resolved = children(() => props.children);
	return context.register("rightContent", createComponent(Show, {
		get when() {
			return !!resolved();
		},
		get children() {
			var _el$6 = _tmpl$3();
			spread(_el$6, mergeProps({ get ["class"]() {
				return classNames("row-right", props.class);
			} }, restProps), false, true);
			insert(_el$6, resolved);
			return _el$6;
		}
	}));
};
/**
* Registers a field AND marks it as the row's own, so `_row.scss` lays out this checkbox and not
* whatever else happens to sit inside the row. See `rowFieldClasses`.
*/
function registerRowField(kind, classes, element) {
	const context = useContext(RowContext);
	const resolved = children(() => element);
	const registeredKind = kind === "radioField" && resolved.toArray().some((node) => node instanceof HTMLElement && node.classList.contains("radio-field-right")) ? "radioFieldRight" : kind;
	createRenderEffect(() => {
		resolved.toArray().forEach((node) => {
			node instanceof HTMLElement && attachHotClassName(node, ...classes);
		});
	});
	return context.register(registeredKind, resolved());
}
Row.CheckboxField = (props) => {
	return registerRowField("checkboxField", [ROW_CHECKBOX_FIELD_CLASS], props.children);
};
Row.RadioField = (props) => {
	return registerRowField("radioField", [ROW_RADIO_FIELD_CLASS], props.children);
};
Row.CheckboxFieldToggle = (props) => {
	return registerRowField("checkboxFieldToggle", [ROW_CHECKBOX_FIELD_TOGGLE_CLASS], props.children);
};
Row.Media = (inProps) => {
	const context = useContext(RowContext);
	const classes = () => classNames("row-media", inProps.size && `row-media-${inProps.size}`, inProps.class);
	if ("element" in inProps) return registerExternalElement(context, "media", () => inProps.element, classes);
	const [props, restProps] = splitProps(inProps, [
		"children",
		"size",
		"class"
	]);
	return context.register("media", (() => {
		var _el$7 = _tmpl$3();
		spread(_el$7, mergeProps({ get ["class"]() {
			return classes();
		} }, restProps), false, true);
		insert(_el$7, () => props.children);
		return _el$7;
	})());
};
//#endregion
//#region src/components/popups/peer.tsx
/** This popup's line of copy. It belongs to the confirmation shell — anything else states its own. */
function Description(props) {
	const { options } = props;
	const p = document.createElement("p");
	p.classList.add("popup-description");
	if (options.descriptionLangKey) p.append(i18n(options.descriptionLangKey, options.descriptionLangArgs));
	else if (options.description && options.description !== true) setInnerHTML(p, options.description);
	else if (options.descriptionRaw) p.append(wrapEmojiText(options.descriptionRaw));
	return p;
}
function showPeerPopup(className, options = {}) {
	const buttons = options.buttons && addCancelButton(options.buttons);
	const { checkboxes, inputField } = options;
	const hasDescription = !!(options.descriptionLangKey || options.description || options.descriptionRaw);
	const [show, setShow] = createSignal(!options.deferShow);
	createPopup(() => {
		const checkedSet = () => {
			const set = /* @__PURE__ */ new Set();
			checkboxes?.forEach((checkbox) => {
				if (checkbox.checkboxField.checked) set.add(checkbox.text);
			});
			return set;
		};
		const [inputValid, setInputValid] = createSignal(!inputField || inputField.isValid());
		if (inputField) subscribeOn(inputField.input)("input", () => setInputValid(inputField.isValid()));
		const Buttons = () => {
			const confirmButton = buttons.length === 2 ? buttons.find((button) => !button.isCancel) : void 0;
			const inputButton = inputField && buttons.find((button) => !button.isCancel);
			const renderButton = (button) => {
				const gate = button.onlyWithCheckbox;
				const [gateChecked, setGateChecked] = createSignal(!gate);
				if (gate) onMount(() => {
					setGateChecked(gate.checkboxField.checked);
					subscribeOn(gate.checkboxField.input)("change", () => setGateChecked(gate.checkboxField.checked));
				});
				const props = {
					get langKey() {
						return button.langKey;
					},
					get langArgs() {
						return button.langArgs;
					},
					cancel: button.isCancel,
					noRipple: button.noRipple,
					iconLeft: button.iconLeft,
					iconRight: button.iconRight,
					get disabled() {
						return !gateChecked() || button === inputButton && !inputValid();
					},
					confirm: button === confirmButton,
					preloader: button.preloader,
					ref: (element) => button.element = element,
					callback: (e) => button.callback?.(e, checkboxes && checkedSet()),
					children: button.text
				};
				return options.footer ? createComponent(PopupElement.FooterButton, mergeProps(props, { get color() {
					return memo(() => !!button.isDanger)() ? "danger" : button.isSecondary ? "secondary" : "primary";
				} })) : createComponent(PopupElement.Button, mergeProps(props, { get danger() {
					return button.isDanger;
				} }));
			};
			return options.footer ? createComponent(PopupElement.Footer, { get children() {
				return createComponent(For, {
					each: buttons,
					children: renderButton
				});
			} }) : createComponent(PopupElement.Buttons, {
				get ["class"]() {
					return buttons.length >= 3 ? "is-vertical-layout" : void 0;
				},
				get children() {
					return createComponent(For, {
						each: buttons,
						children: renderButton
					});
				}
			});
		};
		const content = [
			memo(() => options.contentBefore),
			createComponent(Show, {
				when: hasDescription,
				get children() {
					return createComponent(Description, { options });
				}
			}),
			memo(() => inputField?.container),
			createComponent(For, {
				each: checkboxes,
				children: (checkbox) => createComponent(Row, {
					"class": "popup-peer-checkbox-row",
					get children() {
						return [createComponent(Show, {
							get when() {
								return checkbox.text;
							},
							get children() {
								return createComponent(Row.Title, { get children() {
									return i18n(checkbox.text, checkbox.textArgs);
								} });
							}
						}), createComponent(Row.CheckboxField, { get children() {
							return createComponent(CheckboxFieldTsx, mergeProps(checkbox, { ref: (checkboxField) => checkbox.checkboxField = checkboxField }));
						} })];
					}
				})
			}),
			memo(() => options.content)
		];
		return createComponent(PopupElement, mergeProps(options, {
			"class": "popup-peer" + (className ? " " + className : ""),
			get show() {
				return show();
			},
			containerClass: checkboxes ? "have-checkbox" : void 0,
			get closable() {
				return options.closable ?? true;
			},
			get initialFocus() {
				return options.initialFocus ?? (inputField && (() => inputField.input));
			},
			old: true,
			get children() {
				return [
					createComponent(Show, {
						get when() {
							return !options.noHeader;
						},
						get children() {
							return createComponent(PopupElement.Header, { get children() {
								return [createComponent(Show, {
									get when() {
										return options.avatar;
									},
									get fallback() {
										return memo(() => !!options.peerId)() && createComponent(PeerAvatar, { options });
									},
									get children() {
										return options.avatar;
									}
								}), createComponent(Show, {
									get when() {
										return !options.noTitle;
									},
									get children() {
										return createComponent(PopupElement.Title, { get children() {
											return title(options);
										} });
									}
								})];
							} });
						}
					}),
					memo(() => memo(() => !!options.body)() ? createComponent(PopupElement.Body, { children: content }) : memo(() => !!options.scrollable)() ? createComponent(PopupElement.Scrollable, { children: content }) : content),
					memo(() => buttons && createComponent(Buttons, {}))
				];
			}
		}));
	});
	return {
		show: () => setShow(true),
		hide: () => setShow(false)
	};
}
function PeerAvatar(props) {
	const { peerId, threadId } = props.options;
	const isSavedDialog = !!(peerId === rootScope.myId && threadId);
	return createComponent(AvatarNewTsx, {
		size: 32,
		isDialog: true,
		peerId: isSavedDialog ? threadId : peerId,
		threadId: isSavedDialog ? void 0 : threadId,
		meAsNotes: isSavedDialog,
		get accountNumber() {
			return props.options.accountNumber;
		}
	});
}
function title(options) {
	if (options.titleLangKey || !options.title) return i18n(options.titleLangKey || "AppName", options.titleLangArgs);
	if (options.title instanceof HTMLElement || options.title instanceof DocumentFragment) return options.title;
	return options.title || "";
}
//#endregion
//#region src/components/confirmationPopup.ts
var confirmationPopup_exports = /* @__PURE__ */ __exportAll({ default: () => confirmationPopup });
function confirmationPopup(options) {
	return new Promise((resolve, reject) => {
		const { button, cancelButton: customCancelButton, checkbox, rejectWithReason } = options;
		const ownCallback = button.callback;
		button.callback = (e, set) => {
			const settle = () => {
				if (checkbox || !set) resolve(set ? !!set.size : void 0);
				else resolve(options.checkboxes.map((checkbox) => set.has(checkbox.text)));
			};
			const result = ownCallback?.(e, set);
			if (result instanceof Promise) return result.then((value) => {
				if (value !== false) settle();
				return value;
			});
			if (result === false) return false;
			settle();
		};
		const buttons = options.buttons || [button];
		if (customCancelButton && !buttons.some((button) => button.isCancel)) {
			customCancelButton.isCancel = true;
			buttons.push(customCancelButton);
		}
		addCancelButton(buttons);
		const cancelButton = buttons.find((button) => button.isCancel);
		const cancelCallback = cancelButton.callback;
		cancelButton.callback = (event, checkboxes) => {
			cancelCallback?.(event, checkboxes);
			reject(rejectWithReason ? "canceled" : void 0);
		};
		options.buttons = buttons;
		options.checkboxes ?? (options.checkboxes = checkbox && [checkbox]);
		options.onCloseAfterTimeout = () => {
			reject(rejectWithReason ? "closed" : void 0);
		};
		const popup = showPeerPopup(classNames("popup-confirmation", options.className), options);
		options.onPopup?.(popup);
	});
}
//#endregion
export { isAtomicTextEntity as $, absNanos as $t, AvatarNewTsx as A, setPeerLanguageLoaded as At, getDefaultOptions as B, getAudioAttribute as Bt, ButtonMenuSync as C, CheckboxField as Cn, TranslatableMessage as Ct, setButtonMenuItemLoading as D, getMessageSourceText as Dt, setButtonMenuItemDisabled as E, usePremium as Et, createLoopingMutedVideo as F, useFullPeer as Ft, getCommunityServiceTitle as G, getPeerTitle as Gt, useIsNightTheme as H, getConferenceCallLangKey as Ht, createAutoDeleteIcon as I, useDynamicCachedValue as It, shouldDisplayGiftCodeAsGift as J, wrapGramTransferReactionText as Jt, truncateTextWithEntities as K, wrapCustomEmoji as Kt, customTimeOptions as L, modifyAckedPromise as Lt, avatarNew as M, getDoNotTranslateLanguages as Mt, findUpAvatar as N, Languages as Nt, createNewBadge as O, getMessageTranslationSourceToken as Ot, wrapPhotoToAvatar as P, detectLanguage as Pt, getRichMessagePreviewMedia as Q, NANOS_PER_GRAM as Qt, findExistingOrCreateCustomOption as R, isMessageRestricted as Rt, ButtonMenuItem as S, renderMediaWithFadeIn as Sn, wrapMessageActionTextNew as St, isButtonMenuItemDisabled as T, getInlineArrowKeys as Tn, usePeerTranslation as Tt, documentFragmentToNodes as U, getConferenceCallState as Ut, currencyStarIcon as V, partition as Vt, wrapTopicIcon as W, isJoinVoiceChatAnchor as Wt, wrapMessageForReply as X, readWalletCurrency as Xt, messageForReply_exports as Y, loadWalletFiatRate as Yt, getMessageForReplyContent as Z, writeWalletCurrency as Zt, ROW_SELECTION_CHECKBOX_CLASS as _, photo_exports as _n, Sparkles as _t, createRowTitle as a, groupAddress as an, snapGraphemeOffsetUp as at, ROW_WITH_CHECKBOX_AND_MEDIA_CLASS as b, getMediaThumbIfNeeded as bn, generatePremiumIcon as bt, createContextMenu as c, splitGrams as cn, updateGraphemes as ct, cancelContextMenuOpening as d, fiatToNanos as dn, wrapPeerTitle as dt, compareNanos as en, sliceTextWithEntities as et, positionFloatingMenu as f, nanosToFiat as fn, PeerTitle as ft, RADIO_FIELD_RIGHT_CLASS as g, wrapAttachBotIcon as gn, wrapEmojiStatus as gt, filterAsync as h, wrapAbbreviation as hn, generateTitleIcons as ht, Row as i, gramsToNumber as in, snapGraphemeOffsetDown as it, StoriesSegments as j, addDoNotTranslateLanguage as jt, AvatarNew as k, processMessageForTranslation as kt, verifyMenuItem as l, walletNftName as ln, getTodoItemReplyPreview as lt, positionMenuTrigger as m, Currencies as mn, createPeerTitleElement as mt, confirmationPopup_exports as n, formatGrams as nn, getCommonGraphemePrefixLength as nt, getRowIconBackgroundImage as o, isCryptoTopUp as on, splitGraphemes as ot, positionMenu as p, paymentsWrapCurrencyAmount as pn, changeTitleEmojiColor as pt, getPriceChangedActionMessageLangParams as q, formatGramsWithUnit as qt, showPeerPopup as r, formatGramsCut as rn, getGraphemeOffsets as rt, CheckboxFieldTsx as s, shortAddress as sn, updateGraphemeOffsets as st, confirmationPopup as t, formatFiat as tn, sliceTextWithEntitiesAtGraphemeBoundaries as tt, attachContextMenuListener as u, walletProviderName as un, peerTitle_exports as ut, ROW_SELECTION_MEDIA_CLASS as v, wrapPhoto as vn, wrapAdaptiveCustomEmoji as vt, appendButtonMenuItems as w, contextMenuController as wn, TranslatableMessageTsx as wt, ButtonMenu as x, ProgressivePreloader as xn, generateFakeIcon as xt, ROW_SELECTION_RADIO_CLASS as y, setAttachmentSize as yn, generateVerifiedIcon as yt, findMatchingCustomOption as z, isMessageSensitive as zt };
