//# allFunctionsCalledOnLoad
import { n as __exportAll } from "./rolldown-runtime-CwcJO0Gh.js";
import { h as Modes, i as IS_APPLE_MOBILE, l as IS_SAFARI, p as MOUNT_CLASS_TO, s as IS_MOBILE } from "./userAgent-ByGXcznk.js";
import { t as IS_TOUCH_SUPPORTED } from "./touchSupport-B2RWO3zD.js";
import { t as findUpClassName } from "./findUpClassName-3V5me58N.js";
import { n as fastRaf } from "./schedulers-Cx0-7a1P.js";
import { t as noop } from "./noop-H9NNBLfX.js";
import { t as Icon } from "./icon-DbP6Es97.js";
import { rt as IS_H265_SUPPORTED, t as apiManagerProxy } from "./apiManagerProxy-DmQXvxSF.js";
import { n as rootScope } from "./rootScope-CZS0lmz8.js";
import { n as logger } from "./logger-7zf0rNYS.js";
import { t as EventListenerBase } from "./eventListenerBase-da40Q-0t.js";
import { n as indexOfAndSplice } from "./superMessagePort-DhrhiTig.js";
import { t as makeError } from "./makeError-CiXxcKtE.js";
import { a as safeAssign } from "./idb-BZfkipS3.js";
import { a as i18n } from "./langPack-BmdJGr44.js";
import { A as mergeProps, C as createSignal, M as onCleanup, N as onMount, _ as createMemo, d as batch, g as createEffect, p as createComponent, s as Show, x as createRoot, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { n as deferredPromise } from "./cancellablePromise-bof--dnO.js";
import { t as __vitePreload } from "./preload-helper-B0NHKCoo.js";
import { n as getAppWindow, r as getOverlayRoot, s as setAppWindow, t as bindActiveWindowListener } from "./appWindow-bo-KtJhy.js";
import { t as cancelEvent } from "./cancelEvent-Cw8vYZHp.js";
import { t as clamp } from "./clamp-9UaNhw6N.js";
import { n as hotListen } from "./hotModule-aCRkP77w.js";
import { _ as use, c as insert, d as render, f as setAttribute, g as template, h as style, o as className$1, p as setStyleProperty, s as delegateEvents } from "./web-BPyQozky.js";
import { n as hotReloadGuard } from "./hotReloadGuardProvider-CHEsZRuG.js";
import { t as liteMode } from "./liteMode-DeLStZfQ.js";
import { n as mediaSizes, t as ScreenSize } from "./mediaSizes-C1MTaleW.js";
import { t as overlayCounter } from "./overlayCounter-SPN4H9lb.js";
import { n as isInDOM, t as sequentialDom } from "./sequentialDom-CRhA0kB2.js";
import { t as classNames } from "./classNames-DxGDjmvw.js";
import { t as IconTsx } from "./iconTsx-B4lOk4A6.js";
import "./middleware-D6HuIqPm.js";
import { t as safePlay } from "./safePlay-CCrzDSPY.js";
import { n as animationIntersector } from "./animationIntersector-vAjH_7t1.js";
import { a as requestFullScreen, i as isFullScreen, n as cancelFullScreen, r as getFullScreenElement, t as addFullScreenListener } from "./fullScreen-5nVzMsf1.js";
import { t as ListenerSetter } from "./listenerSetter-BER6qAXn.js";
import { n as iconButtonLabel } from "./iconButtonLabel-BKjhnSeF.js";
import { t as I18nTsx } from "./i18n-CGMFiAW0.js";
import { n as simulateEvent } from "./dispatchEvent-CZVxCUd_.js";
import { n as attachClickEvent } from "./clickEvent-COk4YpLP.js";
import { n as replaceButtonIcon, t as Button } from "./button-DpTvniRN.js";
import { t as throttle } from "./throttle-DxyCT6GJ.js";
import { c as setCurrentTime, g as hasMediaSpoiler, s as handleVideoLeak } from "./sticker-5twBOy1Y.js";
import { a as shouldIgnoreVideoError, i as onMediaLoad, n as renderImageFromUrl } from "./blur-BvAbRYUw.js";
import { n as animateSingle } from "./animation-Dd3Xpw_9.js";
import { r as hlsInstancesByVideo, t as createVideo } from "./createVideo-Bh2Ba_A7.js";
import { t as appDownloadManager } from "./appDownloadManager-ClHW2-Dl.js";
import { r as numberThousandSplitterForWatching } from "./numberThousandSplitter-CGiPNwwW.js";
import { n as appChatBackground } from "./index-B7axFZql.js";
import { bn as getMediaThumbIfNeeded, vn as wrapPhoto, wn as contextMenuController, xn as ProgressivePreloader } from "./confirmationPopup-Bz6mK0o-.js";
import { tn as getDocumentURL } from "./getChatMigratedTo-ChhMNXuu.js";
import { s as toHHMMSS } from "./wrapDuration-BQgz9hDF.js";
import { T as keepLeftToRight } from "./openEditors-7FmA7q_V.js";
import { r as toastNew } from "./toast-B6VD5M7R.js";
import { t as ButtonIcon } from "./buttonIcon-CthJWloV.js";
import { t as ButtonMenuToggle } from "./buttonMenuToggle-1aKRQh1m.js";
import { t as RangeSelector } from "./rangeSelector-Bspn3Z0a.js";
import { l as MediaProgressLine, n as findMediaTargets, u as appMediaPlaybackController } from "./audio-BL6xvRqa.js";
import { l as debounce } from "./pickKeys-Ckq7_h-r.js";
import { t as createCanvasStream } from "./createCanvasStream-DP3u1x9C.js";
//#region src/components/progressRing.tsx
var _tmpl$$4 = /*#__PURE__*/ template(`<svg style=transform:rotate(-90deg)><circle class=progress-ring__circle fill=transparent>`);
var DEFAULT_STROKE_WIDTH = 3.5;
function getProgressRingRadius(size, strokeWidth = DEFAULT_STROKE_WIDTH) {
	return size / 2 - strokeWidth * 2;
}
function getProgressRingCircumference(size, strokeWidth = DEFAULT_STROKE_WIDTH) {
	return 2 * Math.PI * getProgressRingRadius(size, strokeWidth);
}
function ProgressRing(props) {
	const strokeWidth = () => props.strokeWidth ?? 3.5;
	const radius = () => getProgressRingRadius(props.size, strokeWidth());
	const circumference = () => getProgressRingCircumference(props.size, strokeWidth());
	const dashoffset = () => circumference() * (1 - Math.max(0, Math.min(1, props.progress || 0)));
	return (() => {
		var _el$ = _tmpl$$4(), _el$2 = _el$.firstChild;
		var _ref$ = props.ref;
		typeof _ref$ === "function" ? use(_ref$, _el$) : props.ref = _el$;
		var _ref$2 = props.circleRef;
		typeof _ref$2 === "function" ? use(_ref$2, _el$2) : props.circleRef = _el$2;
		createRenderEffect((_p$) => {
			var _v$ = classNames("progress-ring", props.class), _v$2 = props.size, _v$3 = props.size, _v$4 = props.stroke ?? "white", _v$5 = props.strokeOpacity ?? .3, _v$6 = strokeWidth(), _v$7 = props.size / 2, _v$8 = props.size / 2, _v$9 = radius(), _v$0 = `${circumference()} ${circumference()}`, _v$1 = "" + dashoffset();
			_v$ !== _p$.e && setAttribute(_el$, "class", _p$.e = _v$);
			_v$2 !== _p$.t && setAttribute(_el$, "width", _p$.t = _v$2);
			_v$3 !== _p$.a && setAttribute(_el$, "height", _p$.a = _v$3);
			_v$4 !== _p$.o && setAttribute(_el$2, "stroke", _p$.o = _v$4);
			_v$5 !== _p$.i && setAttribute(_el$2, "stroke-opacity", _p$.i = _v$5);
			_v$6 !== _p$.n && setAttribute(_el$2, "stroke-width", _p$.n = _v$6);
			_v$7 !== _p$.s && setAttribute(_el$2, "cx", _p$.s = _v$7);
			_v$8 !== _p$.h && setAttribute(_el$2, "cy", _p$.h = _v$8);
			_v$9 !== _p$.r && setAttribute(_el$2, "r", _p$.r = _v$9);
			_v$0 !== _p$.d && setStyleProperty(_el$2, "stroke-dasharray", _p$.d = _v$0);
			_v$1 !== _p$.l && setStyleProperty(_el$2, "stroke-dashoffset", _p$.l = _v$1);
			return _p$;
		}, {
			e: void 0,
			t: void 0,
			a: void 0,
			o: void 0,
			i: void 0,
			n: void 0,
			s: void 0,
			h: void 0,
			r: void 0,
			d: void 0,
			l: void 0
		});
		return _el$;
	})();
}
function createProgressRing(opts) {
	return createRoot((dispose) => {
		const [progress, setProgress] = createSignal(opts.progress ?? 0);
		const [size, setSize] = createSignal(opts.size);
		let element;
		let circle;
		ProgressRing({
			get size() {
				return size();
			},
			strokeWidth: opts.strokeWidth,
			stroke: opts.stroke,
			strokeOpacity: opts.strokeOpacity,
			class: opts.class,
			get progress() {
				return progress();
			},
			ref: (svg) => element = svg,
			circleRef: (c) => circle = c
		});
		return {
			element,
			circle,
			setProgress,
			setSize,
			destroy: dispose
		};
	});
}
//#endregion
//#region src/helpers/dom/controlsHover.ts
var ControlsHover = class extends EventListenerBase {
	constructor() {
		super(false);
		this.hideControls = (setHideTimeout = false) => {
			if (setHideTimeout) {
				if (!this.hideControlsTimeout) this.hideControlsTimeout = window.setTimeout(this.hideControls, 3e3);
				return;
			}
			clearTimeout(this.hideControlsTimeout);
			this.hideControlsTimeout = 0;
			if (this.controlsLocked !== false && this.hasKeyboardFocus()) return;
			const isShown = this.element.classList.contains("show-controls");
			if (this.controlsLocked !== false) {
				if ((this.canHideControls ? !this.canHideControls() : false) || !isShown || this.controlsLocked) return;
			} else if (!isShown) return;
			this.dispatchEvent("toggleControls", false);
			this.element.classList.remove("show-controls");
		};
		this.showControls = (setHideTimeout = true) => {
			if (!(this.canShowControls?.() ?? true)) return;
			if (this.hideControlsTimeout) {
				clearTimeout(this.hideControlsTimeout);
				this.hideControlsTimeout = 0;
			} else if (!this.element.classList.contains("show-controls") && this.controlsLocked !== false) {
				this.dispatchEvent("toggleControls", true);
				this.element.classList.add("show-controls");
			}
			if (!setHideTimeout || this.controlsLocked) return;
			this.hideControlsTimeout = window.setTimeout(this.hideControls, 3e3);
		};
		this.toggleControls = (show) => {
			const isShown = this.element.classList.contains("show-controls");
			if (show === void 0) {
				if (isShown) this.hideControls();
				else this.showControls();
			} else if (show === isShown) return;
			else if (show === false) this.hideControls();
			else this.showControls();
		};
		this.hideControlsTimeout = 0;
	}
	setup(options) {
		safeAssign(this, options);
		const { listenerSetter, element } = this;
		if (Modes.a11y) {
			listenerSetter.add(element.ownerDocument)("focusin", () => {
				if (this.hasKeyboardFocus()) this.showControls(false);
			});
			listenerSetter.add(element.ownerDocument)("focusout", () => {
				if (element.classList.contains("show-controls")) this.hideControls(true);
			});
		}
		listenerSetter.addCleanup(() => clearTimeout(this.hideControlsTimeout));
		if (IS_TOUCH_SUPPORTED) listenerSetter.add(element)("click", (e) => {
			if (this.ignoreClickClassName && findUpClassName(e.target, this.ignoreClickClassName)) return;
			this.toggleControls();
		});
		else {
			listenerSetter.add(element)("mousemove", () => {
				this.showControls();
			});
			listenerSetter.add(element)("mouseenter", () => {
				this.showControls(false);
			});
			listenerSetter.add(element)("mouseleave", (e) => {
				const showOnLeaveClassNames = Array.isArray(this.showOnLeaveToClassName) ? this.showOnLeaveToClassName : [this.showOnLeaveToClassName];
				if (e.relatedTarget && showOnLeaveClassNames.some((className) => className && findUpClassName(e.relatedTarget, className))) {
					this.showControls(false);
					return;
				}
				this.hideControls();
			});
		}
	}
	hasKeyboardFocus() {
		if (!Modes.a11y) return false;
		const active = this.element.ownerDocument.activeElement;
		if (!active?.matches(":focus-visible")) return false;
		const controls = Array.isArray(this.showOnLeaveToClassName) ? this.showOnLeaveToClassName : [this.showOnLeaveToClassName];
		return this.element.contains(active) || controls.some((className) => className && !!findUpClassName(active, className));
	}
	lockControls(visible) {
		if (this.controlsLocked === visible) return;
		this.controlsLocked = visible;
		this.element.classList.toggle("disable-hover", visible === false);
		this.toggleControls(visible);
	}
};
//#endregion
//#region src/environment/documentPictureInPictureSupport.ts
var DOCUMENT_PICTURE_IN_PICTURE_SUPPORTED = typeof window !== "undefined" && "documentPictureInPicture" in window && typeof window.documentPictureInPicture?.requestWindow === "function";
//#endregion
//#region src/helpers/dom/mirrorDocumentStyles.ts
/**
* A Document Picture-in-Picture window starts as a blank document — none of the app's CSS reaches it.
* This clones every stylesheet from `source` into `target` and keeps them live:
*  - `<style>`/`<link>` additions & removals (Vite HMR, themeController's appended night-`<style>`);
*  - the `<html>` class + inline style (the `.night` toggle, theme CSS custom properties, and the
*    JS-owned layout vars `--vh` / `--chat-width` / `--left-column-width` …) mirrored on every change;
*  - the `<body>` class (`has-chat`, `right-column-floats`, `is-mobile`, …).
*
* Per-source-sheet node mapping means unchanged sheets are never re-created, so theme/layout updates
* don't flash the whole PiP. Returns a disposer that stops every observer.
*/
function mirrorDocumentStyles(source, target) {
	const mirrored = /* @__PURE__ */ new Map();
	const syncSheets = () => {
		const seen = /* @__PURE__ */ new Set();
		for (const sheet of Array.from(source.styleSheets)) {
			const owner = sheet.ownerNode;
			if (!owner) continue;
			seen.add(owner);
			let node = mirrored.get(owner);
			let cssText;
			try {
				cssText = Array.from(sheet.cssRules).map((rule) => rule.cssText).join("\n");
			} catch {}
			if (cssText !== void 0) {
				if (!node || node.tagName !== "STYLE") {
					node?.remove();
					node = target.createElement("style");
					mirrored.set(owner, node);
					target.head.append(node);
				}
				if (sheet.media?.mediaText) node.media = sheet.media.mediaText;
				if (node.textContent !== cssText) node.textContent = cssText;
			} else {
				const href = sheet.ownerNode.href;
				if (!href) continue;
				if (!node || node.tagName !== "LINK") {
					node?.remove();
					node = target.createElement("link");
					node.rel = "stylesheet";
					mirrored.set(owner, node);
					target.head.append(node);
				}
				if (sheet.media?.mediaText) node.media = sheet.media.mediaText;
				if (node.href !== href) node.href = href;
			}
		}
		for (const [owner, node] of mirrored) if (!seen.has(owner)) {
			node.remove();
			mirrored.delete(owner);
		}
	};
	const copyAttributes = (from, to, names) => {
		for (const name of names) {
			const value = from.getAttribute(name);
			if (value === null) to.removeAttribute(name);
			else if (to.getAttribute(name) !== value) to.setAttribute(name, value);
		}
	};
	const syncRoot = () => copyAttributes(source.documentElement, target.documentElement, [
		"class",
		"style",
		"dir",
		"lang"
	]);
	const syncBody = () => copyAttributes(source.body, target.body, ["class"]);
	syncSheets();
	syncRoot();
	syncBody();
	let scheduled = false;
	const scheduleSheets = () => {
		if (scheduled) return;
		scheduled = true;
		Promise.resolve().then(() => {
			scheduled = false;
			syncSheets();
		});
	};
	const headObserver = new MutationObserver(scheduleSheets);
	headObserver.observe(source.head, {
		childList: true,
		subtree: true,
		characterData: true
	});
	const rootObserver = new MutationObserver(syncRoot);
	rootObserver.observe(source.documentElement, {
		attributes: true,
		attributeFilter: [
			"class",
			"style",
			"dir",
			"lang"
		]
	});
	const bodyObserver = new MutationObserver(syncBody);
	bodyObserver.observe(source.body, {
		attributes: true,
		attributeFilter: ["class"]
	});
	return () => {
		headObserver.disconnect();
		rootObserver.disconnect();
		bodyObserver.disconnect();
		mirrored.clear();
	};
}
var clientPipPlaceholder_module_default = {
	screen: "_screen_gl7a7_1",
	content: "_content_gl7a7_13",
	title: "_title_gl7a7_22",
	description: "_description_gl7a7_27",
	button: "_button_gl7a7_31"
};
//#endregion
//#region src/components/clientPipPlaceholder.tsx
var _tmpl$$3 = /*#__PURE__*/ template(`<div><div><div></div><div></div><button>`);
/**
* Shown in the now-empty tab while the client is popped out into a Document Picture-in-Picture window,
* so the tab doesn't read as a blank page. The button brings the client back without the user having
* to find the PiP window's own close control.
*/
function ClientPipPlaceholder(props) {
	return (() => {
		var _el$ = _tmpl$$3(), _el$2 = _el$.firstChild, _el$3 = _el$2.firstChild, _el$4 = _el$3.nextSibling, _el$5 = _el$4.nextSibling;
		insert(_el$3, createComponent(I18nTsx, { key: "ClientPip.PlaceholderTitle" }));
		insert(_el$4, createComponent(I18nTsx, { key: "ClientPip.PlaceholderDescription" }));
		_el$5.$$click = () => props.onReturn();
		insert(_el$5, createComponent(I18nTsx, { key: "ClientPip.ReturnToTab" }));
		createRenderEffect((_p$) => {
			var _v$ = clientPipPlaceholder_module_default.screen, _v$2 = clientPipPlaceholder_module_default.content, _v$3 = clientPipPlaceholder_module_default.title, _v$4 = clientPipPlaceholder_module_default.description, _v$5 = classNames("btn-primary", "btn-color-primary", clientPipPlaceholder_module_default.button);
			_v$ !== _p$.e && className$1(_el$, _p$.e = _v$);
			_v$2 !== _p$.t && className$1(_el$2, _p$.t = _v$2);
			_v$3 !== _p$.a && className$1(_el$3, _p$.a = _v$3);
			_v$4 !== _p$.o && className$1(_el$4, _p$.o = _v$4);
			_v$5 !== _p$.i && className$1(_el$5, _p$.i = _v$5);
			return _p$;
		}, {
			e: void 0,
			t: void 0,
			a: void 0,
			o: void 0,
			i: void 0
		});
		return _el$;
	})();
}
delegateEvents(["click"]);
//#endregion
//#region src/components/clientPip.tsx
var log = logger("CLIENT-PIP");
var APP_ROOT_ID = "page-chats";
var PIP_WIDTH = 430;
var PIP_HEIGHT = 760;
var state;
function isClientPipOpen() {
	return !!state;
}
/**
* Move the WHOLE live client (`#main-columns`) into `pipWindow`'s document — same app instance, so
* it's instant (no boot). Pure DOM move + style mirror + metrics rebind; parameterized by the target
* window so the headless harness can drive it with a plain iframe (which has a real viewport, unlike
* the 0×0 preview tab). Returns false if already popped out or the shell is missing.
*/
function moveAppToWindow(pipWindow, onReturn = moveAppBack) {
	if (state) return false;
	if (!document.getElementById(APP_ROOT_ID)) return false;
	const doc = pipWindow.document;
	const disposeStyles = mirrorDocumentStyles(document, doc);
	const reset = doc.createElement("style");
	reset.textContent = "html,body{margin:0;padding:0;width:100%;height:100%;overflow:hidden}";
	doc.head.append(reset);
	doc.title = document.title;
	setAppWindow(pipWindow);
	const moved = [];
	Array.from(document.body.children).forEach((node) => {
		if (node.tagName === "SCRIPT") return;
		if (node.contentWindow === pipWindow) return;
		const placeholder = document.createComment("client-pip");
		node.before(placeholder);
		doc.body.append(node);
		moved.push({
			node,
			placeholder
		});
	});
	const delegated = document["_$DX_DELEGATE"];
	if (delegated?.size) delegateEvents([...delegated], doc);
	const placeholderScreen = document.createElement("div");
	document.body.append(placeholderScreen);
	state = {
		pipWindow,
		moved,
		placeholderScreen,
		disposePlaceholder: render(() => createComponent(ClientPipPlaceholder, { onReturn }), placeholderScreen),
		disposeStyles,
		cleanup: () => {}
	};
	appChatBackground.reRender();
	return true;
}
/** Move the client back into the main tab and tear down the pip plumbing. */
function moveAppBack() {
	if (!state) return;
	const { pipWindow, moved, placeholderScreen, disposePlaceholder, disposeStyles, cleanup } = state;
	const movedNodes = new Set(moved.map(({ node }) => node));
	let transientNodes = [];
	try {
		transientNodes = Array.from(pipWindow.document.body.children).filter((node) => !movedNodes.has(node));
	} catch {}
	cleanup();
	disposePlaceholder();
	placeholderScreen.remove();
	setAppWindow(window);
	moved.forEach(({ node, placeholder }) => placeholder.replaceWith(node));
	transientNodes.forEach((node) => node.isConnected && document.body.append(node));
	appChatBackground.reRender();
	disposeStyles();
	state = void 0;
}
/**
* Return the client to the tab AND dismiss the pip window. Mirrors the internal `closePip` closure wired
* to the pip's own pagehide/visibility auto-return; exported so the "Exit Picture-in-Picture" menu entry
* (and any other in-app affordance) can close the pip without the user reaching for the OS chrome.
*/
function closeClientPip() {
	const pipWindow = state?.pipWindow;
	moveAppBack();
	try {
		pipWindow?.close();
	} catch {}
}
/**
* Pop the whole client out into an always-on-top Document Picture-in-Picture window. MUST be called
* from a user gesture (the topbar button) so `requestWindow` is permitted. Auto-returns: once the tab
* has actually been left and is then re-shown, the app moves back and the pip closes.
*/
async function openClientPip() {
	if (!DOCUMENT_PICTURE_IN_PICTURE_SUPPORTED) return;
	if (state) {
		try {
			state.pipWindow.focus();
		} catch {}
		return;
	}
	let pipWindow;
	try {
		pipWindow = await window.documentPictureInPicture.requestWindow({
			width: PIP_WIDTH,
			height: PIP_HEIGHT
		});
	} catch (err) {
		log.error("requestWindow failed", err);
		return;
	}
	const closePip = () => {
		moveAppBack();
		try {
			pipWindow.close();
		} catch {}
	};
	if (!moveAppToWindow(pipWindow, closePip)) {
		try {
			pipWindow.close();
		} catch {}
		return;
	}
	let leftTab = false;
	const onVisibility = () => {
		if (document.visibilityState === "hidden") leftTab = true;
		else if (leftTab) closePip();
	};
	state.cleanup = () => {
		document.removeEventListener("visibilitychange", onVisibility);
		pipWindow.removeEventListener("pagehide", closePip);
	};
	document.addEventListener("visibilitychange", onVisibility);
	pipWindow.addEventListener("pagehide", closePip);
}
MOUNT_CLASS_TO && (MOUNT_CLASS_TO.clientPip = {
	moveAppToWindow,
	moveAppBack,
	closeClientPip,
	openClientPip,
	isClientPipOpen,
	getOverlayRoot
});
//#endregion
//#region src/components/volumeSelector.ts
var _VolumeSelector;
var className = "player-volume";
var VolumeSelector = class VolumeSelector extends RangeSelector {
	constructor(options) {
		super({
			ariaLabel: "AccDescr.Volume",
			step: .01,
			min: 0,
			max: options.maxVolume ?? 1,
			vertical: options.vertical,
			keepLTR: options.keepLTR
		}, 1);
		this.setVolume = ({ volume, muted, eventType }) => {
			let iconIndex;
			if (!volume || muted) iconIndex = 0;
			else if (volume > .5) iconIndex = 3;
			else if (volume > 0 && volume < .25) iconIndex = 1;
			else iconIndex = 2;
			replaceButtonIcon(this.btn, VolumeSelector.ICONS[iconIndex]).classList.add(className + "__icon");
			if (this.media) {
				this.media.volume = Math.min(volume, 1);
				this.media.muted = muted;
			}
			if (!this.mousedown) this.setProgress(muted ? 0 : volume);
			eventType && this.onVolumeChange?.(eventType);
		};
		this.setGlobalVolume = (eventType) => {
			const volume = this.readGlobalVolume();
			const muted = appMediaPlaybackController.muted;
			return this.setVolume({
				volume,
				muted,
				eventType
			});
		};
		this.setMaxVolume = (max) => {
			if (this.max === max) return;
			this.max = max;
			this.seek.max = "" + max;
			this.setFilled(+this.seek.value);
		};
		safeAssign(this, options);
		this.setListeners();
		this.setHandlers({ onScrub: (_value) => {
			const value = Math.max(Math.min(_value, this.max), 0);
			if (this.useGlobalVolume) this.modifyGlobal(() => {
				appMediaPlaybackController.muted = false;
				this.writeGlobalVolume(value);
			});
			this.setVolume({
				volume: value,
				muted: false,
				eventType: "click"
			});
		} });
		const btn = this.btn = document.createElement("div");
		btn.classList.add("btn-icon", className);
		attachClickEvent(btn, (e) => {
			if (!findUpClassName(e.target, className + "__icon") && e.target !== this.btn) return;
			this.onMuteClick(e);
		}, { listenerSetter: this.listenerSetter });
		if (this.useGlobalVolume) {
			this.listenerSetter.add(appMediaPlaybackController)("playbackParams", (params) => {
				if (this.ignoreGlobalEvents) return;
				this.setVolume({
					volume: this.readGlobalVolume(),
					muted: params.muted,
					eventType: "global"
				});
			});
			if (this.useGlobalVolume === "no-init") this.setVolume({
				volume: this.readGlobalVolume(),
				muted: this.media.muted
			});
			else this.setGlobalVolume();
		} else if (this.media) this.setVolume({
			volume: this.media.volume,
			muted: this.media.muted
		});
		btn.append(this.container);
	}
	removeListeners() {
		super.removeListeners();
		this.onVolumeChange = void 0;
	}
	modifyGlobal(callback) {
		this.ignoreGlobalEvents = true;
		callback();
		this.ignoreGlobalEvents = false;
	}
	onMuteClick(e) {
		e && cancelEvent(e);
		const globalMuted = appMediaPlaybackController.muted;
		const { volume, muted } = this.media ?? {};
		if (this.useGlobalVolume) this.modifyGlobal(() => {
			appMediaPlaybackController.muted = !globalMuted;
		});
		this.setVolume({
			volume: volume ?? this.readGlobalVolume(),
			muted: !(muted ?? globalMuted),
			eventType: "click"
		});
	}
	/**
	* Read the global volume this selector tracks. A selector bound to a concrete media
	* element (the video player) always follows the shared master `volume`. The global-only
	* selector (pinned audio plate) follows the playing media: for voice that's `volume +
	* boost` (its 0–200% range), so the boost shows on the slider without leaking elsewhere.
	*/
	readGlobalVolume() {
		return this.media ? appMediaPlaybackController.volume : appMediaPlaybackController.getGlobalSliderVolume();
	}
	/**
	* Write a slider value back to the controller. With a local media element it sets the
	* shared master directly; the global-only selector routes through the controller, which
	* splits a voice value into shared master (0–100%) + voice-only boost (100–200%).
	*/
	writeGlobalVolume(value) {
		if (this.media) appMediaPlaybackController.volume = value;
		else appMediaPlaybackController.setGlobalSliderVolume(value);
	}
};
_VolumeSelector = VolumeSelector;
_VolumeSelector.ICONS = [
	"volume_off_filled",
	"volume_mute_filled",
	"volume_down_filled",
	"volume_up_filled"
];
//#endregion
//#region src/helpers/dom/playOrPlayMuted.ts
/**
* Plays it; a browser that will not let it play aloud (`NotAllowedError`, no user gesture) gets it
* muted instead, which it always allows.
*/
function playOrPlayMuted(media) {
	return media.play().catch((err) => {
		if (err.name === "NotAllowedError") {
			media.muted = true;
			media.autoplay = true;
			safePlay(media);
		}
	});
}
//#endregion
//#region src/lib/hls/snapQualityHeight.ts
function snapQualityHeight(height) {
	const standardHeights = [
		480,
		720,
		1080
	];
	const threshold1 = (standardHeights[1] - standardHeights[0]) / 2;
	if (height < standardHeights[0] + threshold1) return standardHeights[0];
	const threshold2 = (standardHeights[2] - standardHeights[1]) / 2;
	if (height < standardHeights[1] + threshold2) return standardHeights[1];
	return standardHeights[2];
}
//#endregion
//#region src/lib/mediaPlayer/qualityLevelsSwitchButton.tsx
var _tmpl$$2 = /*#__PURE__*/ template(`<span class=btn-menu-item-with-auxiliary-text><span class=btn-menu-item-auxiliary-text>`);
var _tmpl$2$1 = /*#__PURE__*/ template(`<svg class=quality-levels-switch-button__hd-icon width=14 height=10 viewBox="0 0 14 10"fill=none xmlns=http://www.w3.org/2000/svg><rect width=14 height=10 rx=2 fill=currentColor></rect><path fill-rule=evenodd clip-rule=evenodd d="M3.5 2.5C3.5 2.08579 3.16421 1.75 2.75 1.75C2.33579 1.75 2 2.08579 2 2.5V5V7.5C2 7.91421 2.33579 8.25 2.75 8.25C3.16421 8.25 3.5 7.91421 3.5 7.5V5.75H5V7.5C5 7.91421 5.33579 8.25 5.75 8.25C6.16421 8.25 6.5 7.91421 6.5 7.5V5V2.5C6.5 2.08579 6.16421 1.75 5.75 1.75C5.33579 1.75 5 2.08579 5 2.5V4.25H3.5V2.5ZM8.25 1.75C7.83579 1.75 7.5 2.08579 7.5 2.5V7.5C7.5 7.91421 7.83579 8.25 8.25 8.25H9.75C11.2688 8.25 12.5 7.01878 12.5 5.5V4.5C12.5 2.98122 11.2688 1.75 9.75 1.75H8.25ZM9.75 6.75H9V3.25H9.75C10.4404 3.25 11 3.80964 11 4.5V5.5C11 6.19036 10.4404 6.75 9.75 6.75Z"fill=black>`);
function QualityLevelsSwitchButton(props) {
	const [qualityLevelsMenuButtons, setQualityLevelsMenuButtons] = createSignal([]);
	const [selectedHeight, setSelectedHeight] = createSignal();
	const [qualityLevelsLoaded, setQualityLevelsLoaded] = createSignal(false);
	props.controlsRef({
		loadQualityLevels: async () => {
			setQualityLevelsLoaded(true);
		},
		isMenuOpen: () => {
			return qualityLevelsButton().classList.contains("menu-open");
		}
	});
	createEffect(() => {
		if (qualityLevelsLoaded()) (async () => {
			const options = await getButtonMenuQualityOptions(props.video, setSelectedHeight);
			setQualityLevelsMenuButtons(options);
		})();
	});
	createEffect(() => {
		if (qualityLevelsLoaded()) {
			qualityLevelsMenuButtons().forEach((btn) => btn.icon = void 0);
			const selectedMenuButton = qualityLevelsMenuButtons().find((btn) => btn.id === (selectedHeight() || "auto"));
			if (selectedMenuButton) selectedMenuButton.icon = "check";
		}
	});
	const qualityLevelsButton = createMemo(() => ButtonMenuToggle({
		icon: `settings ${props.skin}__button checkable-button-menu quality-levels-switch-button`,
		buttons: qualityLevelsMenuButtons(),
		direction: "top-left",
		onOpen: () => {
			props.onMenuToggle?.(true);
		},
		onClose: () => {
			props.onMenuToggle?.(false);
		}
	}));
	createEffect(() => {
		qualityLevelsButton()?.append(HdSvg());
	});
	createEffect(() => {
		const isHd = selectedHeight() === 1080;
		qualityLevelsButton()?.querySelector(".tgico")?.replaceWith(Icon(isHd ? "settings_clipped_corner" : "settings"));
		qualityLevelsButton()?.classList.toggle("quality-levels-switch-button--is-hd", isHd);
	});
	return createComponent(Show, {
		get when() {
			return qualityLevelsMenuButtons().length > 0;
		},
		get children() {
			return qualityLevelsButton();
		}
	});
}
function createQualityLevelsSwitchButton(props) {
	const element = document.createElement("div");
	let controls;
	return {
		element,
		get controls() {
			return controls;
		},
		dispose: render(() => createComponent(QualityLevelsSwitchButton, mergeProps({ controlsRef: (value) => {
			controls = value;
		} }, props)), element)
	};
}
function ButtonMenuItemWithAuxiliaryText(mainText, additionalText) {
	return (() => {
		var _el$ = _tmpl$$2(), _el$2 = _el$.firstChild;
		insert(_el$, () => i18n(mainText), _el$2);
		insert(_el$2, additionalText);
		return _el$;
	})();
}
function ButtonMenuItemQualityText(height) {
	return ButtonMenuItemWithAuxiliaryText(`Hls.ResolutionHeightName${height}`, `${height}p`);
}
async function getButtonMenuQualityOptions(video, onHeightSelect) {
	const hls = hlsInstancesByVideo.get(video);
	if (!hls) return [];
	const deferredLevels = deferredPromise();
	const { default: Hls } = await __vitePreload(async () => {
		const { default: Hls } = await import("./hls-DDBOJHa_.js");
		return { default: Hls };
	}, []);
	if (hls.levels && hls.levels.length > 0) deferredLevels.resolve(hls.levels);
	else hls.on(Hls.Events.MANIFEST_PARSED, (_, data) => {
		deferredLevels.resolve(data.levels);
	});
	const levels = await deferredLevels;
	return [{
		id: "auto",
		text: "Hls.ResolutionHeightAuto",
		emptyIcon: true,
		onClick: () => {
			hls.currentLevel = -1;
			onHeightSelect();
		}
	}, ...Array.from(new Set(levels.map((level) => snapQualityHeight(level.height)))).sort((a, b) => b - a).map((height) => {
		const levelsOfThisHeight = levels.filter((level) => snapQualityHeight(level.height) === height).sort((a, b) => a.bitrate - b.bitrate);
		const onClick = () => {
			let optimalLevel = levelsOfThisHeight[0];
			for (const level of levelsOfThisHeight) if (level.bitrate < hls.bandwidthEstimate) optimalLevel = level;
			const idx = levels.indexOf(optimalLevel);
			hls.currentLevel = idx;
			onHeightSelect(height);
		};
		return {
			id: height,
			emptyIcon: true,
			regularText: ButtonMenuItemQualityText(height),
			onClick
		};
	})];
}
function HdSvg() {
	return _tmpl$2$1();
}
//#endregion
//#region src/components/playbackRateButton.ts
var PLAYBACK_RATES = [
	.5,
	1,
	1.5,
	2
];
var PLAYBACK_RATES_ICONS = [
	"playback_05",
	"playback_1x",
	"playback_15",
	"playback_2x"
];
var getPlaybackRateIcon = (rate) => {
	let idx = PLAYBACK_RATES.indexOf(rate);
	if (idx === -1) idx = PLAYBACK_RATES.indexOf(1);
	return PLAYBACK_RATES_ICONS[idx];
};
var setPlaybackRateMenuState = (menu, rate) => {
	menu.querySelectorAll(".btn-menu-item").forEach((item, index) => {
		item.setAttribute("role", "menuitemradio");
		item.setAttribute("aria-checked", String(PLAYBACK_RATES[index] === rate));
	});
};
var getPlaybackRateMenuButton = (rate) => ({
	id: rate.toFixed(1),
	emptyIcon: true,
	text: rate === 1 ? "PlaybackRateNormal" : void 0,
	regularText: rate !== 1 ? rate + "x" : void 0
});
var PlaybackRateButton$1 = (options) => {
	let menuElement, openCancelled = false;
	const updateMenuState = (menu) => setPlaybackRateMenuState(menu, appMediaPlaybackController.playbackRate);
	const buttons = PLAYBACK_RATES.map((rate) => ({
		regularText: rate + "x",
		onClick: () => {
			appMediaPlaybackController.playbackRate = rate;
		}
	}));
	const button = ButtonMenuToggle({
		noIcon: true,
		buttonOptions: {
			noRipple: true,
			asDiv: false,
			ariaLabel: "AccDescr.PlaybackSpeed"
		},
		direction: options.direction,
		buttons,
		onOpenBefore: () => {
			openCancelled = false;
			if (menuElement) updateMenuState(menuElement);
			options.onPlaybackRateMenuToggle?.(true);
		},
		onOpen: (_, menu) => {
			menuElement = menu;
			menu.classList.add("playback-rate-menu");
			updateMenuState(menu);
		},
		onClose: () => options.onPlaybackRateMenuToggle?.(false),
		canOpen: () => !openCancelled
	});
	const setIcon = () => {
		const playbackRateButton = button;
		const icon = Icon(getPlaybackRateIcon(appMediaPlaybackController.playbackRate));
		if (playbackRateButton.firstElementChild) playbackRateButton.firstElementChild.replaceWith(icon);
		else playbackRateButton.append(icon);
	};
	const addRate = (add) => {
		const playbackRate = appMediaPlaybackController.playbackRate;
		const nextIdx = PLAYBACK_RATES.indexOf(playbackRate) + add;
		if (nextIdx >= 0 && nextIdx < PLAYBACK_RATES.length) appMediaPlaybackController.playbackRate = PLAYBACK_RATES[nextIdx];
	};
	const isMenuOpen = () => {
		return button.classList.contains("menu-open");
	};
	const closeMenu = () => {
		openCancelled = true;
		if (isMenuOpen()) contextMenuController.close();
	};
	setIcon();
	return {
		element: button,
		setIcon,
		addRate,
		isMenuOpen,
		closeMenu
	};
};
//#endregion
//#region src/lib/mediaPlayer/playbackRateButton.tsx
var rates = [
	.5,
	1,
	1.5,
	2,
	3
];
var MAX_RATE = 5;
var geometricFontMap = {
	"0": "geometric_digit_0",
	"1": "geometric_digit_1",
	"2": "geometric_digit_2",
	"3": "geometric_digit_3",
	"4": "geometric_digit_4",
	"5": "geometric_digit_5",
	"6": "geometric_digit_6",
	"7": "geometric_digit_7",
	"8": "geometric_digit_8",
	"9": "geometric_digit_9",
	"x": "geometric_letter_x",
	".": "geometric_dot"
};
function PlaybackRateButton(props) {
	const [selectedRate, setSelectedRate] = createSignal(appMediaPlaybackController.playbackRate || 1);
	const controls = {
		setPlayBackRate: setSelectedRate,
		changeRateByAmount: (amount) => {
			const newValue = selectedRate() + amount;
			if (newValue < 1) setSelectedRate(.5);
			else setSelectedRate(Math.min(MAX_RATE, Math.round(newValue - .01)));
			appMediaPlaybackController.playbackRate = selectedRate();
		},
		isMenuOpen: () => {
			return playbackRateButton.classList.contains("menu-open");
		}
	};
	props.controlsRef(controls);
	const buttons = rates.map((rate) => ({
		...getPlaybackRateMenuButton(rate),
		onClick: () => {
			appMediaPlaybackController.playbackRate = rate;
			setSelectedRate(rate);
		}
	}));
	createEffect(() => {
		buttons.forEach((btn) => btn.icon = void 0);
		const button = buttons.find((btn) => btn.id === selectedRate().toFixed(1));
		if (button) button.icon = "check";
	});
	createEffect(() => {
		const cls = "playback-speed-icon-floating";
		playbackRateButton.querySelector(`.${cls}`)?.remove();
		const icons = selectedRate().toFixed(1).replace(/\.0$/, "x").split("").map((char) => ({
			char: char === "." ? "dot" : char,
			icon: geometricFontMap[char]
		})).filter(Boolean);
		const rateElement = document.createElement("span");
		rateElement.classList.add(cls);
		rateElement.append(...icons.map(({ char, icon }) => Icon(icon, "geometric-font-icon", `geometric-font-icon--${char}`)));
		playbackRateButton.append(rateElement);
	});
	const playbackRateButton = ButtonMenuToggle({
		icon: `mediaspeed_empty ${props.skin}__button`,
		buttons,
		direction: "top-left",
		onOpen: () => {
			props.onMenuToggle?.(true);
		},
		onClose: () => {
			props.onMenuToggle?.(false);
		}
	});
	createEffect(() => {
		playbackRateButton?.classList.add("checkable-button-menu", "playback-rate-button-menu");
	});
	return playbackRateButton;
}
function createPlaybackRateButton(props) {
	const element = document.createElement("div");
	let controls;
	return {
		element,
		get controls() {
			return controls;
		},
		dispose: render(() => createComponent(PlaybackRateButton, mergeProps({ controlsRef: (value) => {
			controls = value;
		} }, props)), element)
	};
}
//#endregion
//#region src/lib/mediaPlayer/speedDragHandler.tsx
var _tmpl$$1 = /*#__PURE__*/ template(`<div class=speed-drag-handler__speed><div class=speed-drag-handler__speed-number>x</div><div class=speed-drag-handler__speed-arrows>`);
var _tmpl$2 = /*#__PURE__*/ template(`<div class=speed-drag-handler__speed-tip><div class=speed-drag-handler__speed-tip-arrows></div><div class=speed-drag-handler__speed-tip-description dir=auto>`);
var _tmpl$3 = /*#__PURE__*/ template(`<svg width=8 height=11 viewBox="0 0 8 11"fill=none xmlns=http://www.w3.org/2000/svg><path opacity=0.7 d="M0 1.5V9.5C0 10.324 0.940764 10.7944 1.6 10.3L6.93333 6.3C7.46667 5.9 7.46667 5.1 6.93333 4.7L1.6 0.7C0.940764 0.205573 0 0.675955 0 1.5Z"fill=currentColor>`);
var HIDE_TIP_MOUSE_MOVE_THRESHOLD = 2;
var SHOW_TIP_TIMEOUT = 200;
var HIDE_TIP_TIMEOUT = 1500;
var SPEED_PER_PX = 1 / 100;
var SPEED_MULTIPLIER_WHEN_BELOW_ONE = .2;
var MAX_SPEED = 5;
var MIN_SPEED = .2;
function SpeedDragHandler(props) {
	const [currentSpeed, setCurrentSpeed] = createSignal(appMediaPlaybackController.playbackRate);
	const [showSpeed, setShowSpeed] = createSignal(false);
	const [hideSpeedTip, setHideSpeedTip] = createSignal(true);
	const [mouseCoords, setMouseCoords] = createSignal([0, 0]);
	props.controlsRef({ isChangingSpeed: () => showSpeed() });
	let speedTipRef;
	const listenerSetter = new ListenerSetter();
	onMount(() => {
		let initialMousePosition;
		let showTimeout = 0;
		let initialSpeed = 1;
		let additionalSpeed = 0;
		function show() {
			const rect = props.video.getBoundingClientRect();
			batch(() => {
				setShowSpeed(true);
				setMouseCoords([initialMousePosition[0] - rect.left, initialMousePosition[1] - rect.top]);
			});
			if (additionalSpeed) appMediaPlaybackController.playbackRate = Math.min(initialSpeed + additionalSpeed, MAX_SPEED);
			window.setTimeout(() => {
				if (!speedTipRef) return;
				const speedTipRect = speedTipRef.getBoundingClientRect();
				if (speedTipRect.left < rect.left || speedTipRect.top < rect.top || speedTipRect.right > rect.right || speedTipRect.bottom > rect.bottom) setHideSpeedTip(true);
				else setHideSpeedTip(false);
				setTimeout(() => {
					if (!hideSpeedTip()) setHideSpeedTip(true);
				}, HIDE_TIP_TIMEOUT);
			}, 0);
		}
		listenerSetter.add(props.video)("pointerdown", (e) => {
			if (props.video.paused) return;
			initialMousePosition = [e.clientX, e.clientY];
			initialSpeed = appMediaPlaybackController.playbackRate;
			if (!IS_MOBILE && areSpeedsEqual(initialSpeed, 1)) additionalSpeed = 1;
			if (IS_MOBILE) additionalSpeed = initialSpeed;
			showTimeout = window.setTimeout(() => {
				show();
			}, SHOW_TIP_TIMEOUT);
		});
		const disposePointerMove = bindActiveWindowListener((w) => w, "pointermove", (e) => {
			if (!initialMousePosition || IS_MOBILE) return;
			const moveX = e.clientX - initialMousePosition[0];
			const startSpeed = initialSpeed + additionalSpeed;
			const changedSpeed = moveX * SPEED_PER_PX;
			let newSpeed;
			if (startSpeed < 1) {
				const borrowedUnits = Math.min((1 - startSpeed) / SPEED_MULTIPLIER_WHEN_BELOW_ONE, changedSpeed);
				newSpeed = startSpeed + borrowedUnits * SPEED_MULTIPLIER_WHEN_BELOW_ONE + Math.max(0, changedSpeed - borrowedUnits);
			} else if (startSpeed + changedSpeed < 1) newSpeed = 1 - (1 - startSpeed - changedSpeed) * SPEED_MULTIPLIER_WHEN_BELOW_ONE;
			else newSpeed = startSpeed + changedSpeed;
			newSpeed = clamp(newSpeed, MIN_SPEED, MAX_SPEED);
			if (!areSpeedsEqual(appMediaPlaybackController.playbackRate, newSpeed)) appMediaPlaybackController.playbackRate = newSpeed;
			if (!initialMousePosition || hideSpeedTip()) return;
			if (Math.hypot(moveX, e.clientY - initialMousePosition[1]) > HIDE_TIP_MOUSE_MOVE_THRESHOLD) {
				setHideSpeedTip(true);
				window.clearTimeout(showTimeout);
				setShowSpeed(true);
			}
		});
		const disposePointerUp = bindActiveWindowListener((w) => w, "pointerup", () => {
			if (!initialMousePosition) return;
			window.clearTimeout(showTimeout);
			batch(() => {
				setHideSpeedTip(true);
				setShowSpeed(false);
				setMouseCoords([0, 0]);
			});
			initialMousePosition = void 0;
			if (additionalSpeed) appMediaPlaybackController.playbackRate = initialSpeed;
			additionalSpeed = 0;
		});
		listenerSetter.add(appMediaPlaybackController)("playbackParams", () => {
			setCurrentSpeed(appMediaPlaybackController.playbackRate);
		});
		onCleanup(() => {
			disposePointerMove();
			disposePointerUp();
		});
	});
	createEffect(() => {
		if (showSpeed()) {
			props.onShowSpeed();
			if (props.video) {
				props.video.dataset.startedChangingSpeed = "true";
				props.video.dataset.wasChangingSpeed = "true";
				setTimeout(() => {
					delete props.video.dataset.startedChangingSpeed;
				}, 100);
			}
			onCleanup(() => {
				props.onHideSpeed();
				if (props.video) setTimeout(() => {
					delete props.video.dataset.wasChangingSpeed;
				}, 100);
			});
		}
	});
	onCleanup(() => {
		listenerSetter.removeAll();
	});
	const formattedSpeed = () => currentSpeed().toFixed(1).replace(/\.0$/, "");
	return createComponent(Show, {
		get when() {
			return showSpeed();
		},
		get children() {
			return [(() => {
				var _el$ = _tmpl$$1(), _el$2 = _el$.firstChild, _el$3 = _el$2.firstChild, _el$4 = _el$2.nextSibling;
				insert(_el$2, formattedSpeed, _el$3);
				insert(_el$4, createComponent(SpeedArrowRight, {}), null);
				insert(_el$4, createComponent(SpeedArrowRight, { "class": "speed-drag-handler__speed-arrow-right-last" }), null);
				createRenderEffect((_$p) => setStyleProperty(_el$, "--animation-duration-multiplier", currentSpeed()));
				return _el$;
			})(), (() => {
				var _el$5 = _tmpl$2(), _el$6 = _el$5.firstChild, _el$7 = _el$6.nextSibling;
				var _ref$ = speedTipRef;
				typeof _ref$ === "function" ? use(_ref$, _el$5) : speedTipRef = _el$5;
				insert(_el$6, createComponent(IconTsx, { icon: "arrow_prev" }), null);
				insert(_el$6, createComponent(IconTsx, { icon: "arrow_next" }), null);
				insert(_el$7, () => i18n("PlaybackRateDragTip"));
				createRenderEffect((_p$) => {
					var _v$ = !!(!hideSpeedTip() && !IS_MOBILE), _v$2 = mouseCoords()[0] + "px", _v$3 = mouseCoords()[1] + "px";
					_v$ !== _p$.e && _el$5.classList.toggle("speed-drag-handler__speed-tip--visible", _p$.e = _v$);
					_v$2 !== _p$.t && setStyleProperty(_el$5, "--left", _p$.t = _v$2);
					_v$3 !== _p$.a && setStyleProperty(_el$5, "--top", _p$.a = _v$3);
					return _p$;
				}, {
					e: void 0,
					t: void 0,
					a: void 0
				});
				return _el$5;
			})()];
		}
	});
}
function createSpeedDragHandler(props) {
	const element = document.createElement("div");
	keepLeftToRight(element);
	let controls;
	return {
		element,
		get controls() {
			return controls;
		},
		dispose: render(() => createComponent(SpeedDragHandler, mergeProps({ controlsRef: (value) => {
			controls = value;
		} }, props)), element)
	};
}
function areSpeedsEqual(a, b) {
	return a.toFixed(1) === b.toFixed(1);
}
function SpeedArrowRight(props) {
	return (() => {
		var _el$8 = _tmpl$3();
		createRenderEffect(() => setAttribute(_el$8, "class", classNames("speed-drag-handler__speed-arrow-right", props.class)));
		return _el$8;
	})();
}
var preview_module_default = { Preview: "_Preview_4b7lc_1" };
//#endregion
//#region src/lib/mediaPlayer/preview.tsx
var _tmpl$ = /*#__PURE__*/ template(`<canvas>`);
function Preview(props) {
	createEffect((prevFrame) => {
		const storyboard = props.storyboard();
		if (!props.visible() || !storyboard) return;
		const time = props.time();
		const frame = storyboard.frames.find((frame) => time <= frame.time) || storyboard.frames[storyboard.frames.length - 1];
		if (prevFrame === frame) return prevFrame;
		const { width, height } = canvasRef;
		const context = canvasRef.getContext("2d");
		context.clearRect(0, 0, width, height);
		context.drawImage(storyboard.image, frame.left, frame.top, storyboard.frameWidth, storyboard.frameHeight, 0, 0, width, height);
		return frame;
	});
	let canvasRef;
	return (() => {
		var _el$ = _tmpl$();
		var _ref$ = canvasRef;
		typeof _ref$ === "function" ? use(_ref$, _el$) : canvasRef = _el$;
		createRenderEffect((_p$) => {
			var _v$ = props.storyboard()?.frameWidth, _v$2 = props.storyboard()?.frameHeight, _v$3 = props.storyboard() && {
				width: `${props.storyboard().frameWidth * 1.5}px`,
				height: `${props.storyboard().frameHeight * 1.5}px`
			};
			_v$ !== _p$.e && setAttribute(_el$, "width", _p$.e = _v$);
			_v$2 !== _p$.t && setAttribute(_el$, "height", _p$.t = _v$2);
			_p$.a = style(_el$, _v$3, _p$.a);
			return _p$;
		}, {
			e: void 0,
			t: void 0,
			a: void 0
		});
		return _el$;
	})();
}
function createPreview(props) {
	const element = document.createElement("div");
	element.classList.add(preview_module_default.Preview);
	return {
		element,
		dispose: render(() => {
			createEffect(() => {
				element.classList.toggle("hide", !props.storyboard());
			});
			return createComponent(Preview, props);
		}, element)
	};
}
//#endregion
//#region src/lib/mediaPlayer/index.ts
var VideoPlayer = class extends ControlsHover {
	constructor({ video, container, play = false, streamable = false, duration, live, width, height, videoTimestamps, onMenuToggle, onTimePreviewToggle, onPip, onPipClose, listenKeyboardEvents, useGlobalVolume, onVolumeChange, onFullScreen, onFullScreenToPip, shouldEnableSoundOnClick, storyboard }) {
		super();
		this._inPip = false;
		this._onPip = (pip) => {
			this._inPip = pip;
			this.wrapper.style.visibility = pip ? "hidden" : "";
			this.onPip?.(pip);
		};
		this.onEnterPictureInPictureLeave = (e) => {
			const onPause = () => {
				clearTimeout(timeout);
				this.onPipClose?.();
			};
			const listener = this.listenerSetter.add(e.target)("pause", onPause, { once: true });
			const timeout = setTimeout(() => {
				this.listenerSetter.remove(listener);
			}, this.debouncePipTime);
		};
		this.onEnterPictureInPicture = (e) => {
			this.debouncedPip(true);
			this.listenerSetter.add(e.target)("leavepictureinpicture", this.onEnterPictureInPictureLeave, { once: true });
		};
		this.onLeavePictureInPicture = () => {
			this.debouncedPip(false);
		};
		this.requestPictureInPicture = async () => {
			if (this.video.duration) {
				if (this.isFullScreen()) this.onFullScreenToPip?.();
				this.video.requestPictureInPicture();
				this.checkInteraction();
				return;
			}
			if (!this.emptyPipVideo) {
				const { width, height } = this;
				this.emptyPipVideo = document.createElement("video");
				this.emptyPipVideo.autoplay = true;
				this.emptyPipVideo.muted = true;
				this.emptyPipVideo.playsInline = true;
				this.emptyPipVideo.style.position = "absolute";
				this.emptyPipVideo.style.visibility = "hidden";
				getOverlayRoot().prepend(this.emptyPipVideo);
				this.emptyPipVideo.srcObject = createCanvasStream({
					width,
					height,
					image: this.emptyPipVideoSource
				});
				this.addPipListeners(this.emptyPipVideo);
			}
			await onMediaLoad(this.emptyPipVideo);
			this.emptyPipVideo.requestPictureInPicture();
			onMediaLoad(this.video).then(() => {
				if (getAppWindow().document.pictureInPictureElement === this.emptyPipVideo) {
					getAppWindow().document.exitPictureInPicture();
					this.video.requestPictureInPicture();
				}
			});
		};
		this.video = video;
		this.video.classList.add("ckin__video");
		this.wrapper = container ?? document.createElement("div");
		this.wrapper.classList.add("ckin__player");
		this.live = live;
		this.canPause = !live;
		this.canSeek = !live;
		this._width = width;
		this._height = height;
		this.onMenuToggle = onMenuToggle;
		this.onTimePreviewToggle = onTimePreviewToggle;
		this.onPip = onPip;
		this.onPipClose = onPipClose;
		this.onVolumeChange = onVolumeChange;
		this.onFullScreen = onFullScreen;
		this.onFullScreenToPip = onFullScreenToPip;
		this.listenKeyboardEvents = listenKeyboardEvents;
		this.hadContainer = !!container;
		this.useGlobalVolume = useGlobalVolume;
		this.shouldEnableSoundOnClick = shouldEnableSoundOnClick;
		if (storyboard) {
			[this.previewVisible, this.previewSetVisible] = createSignal(false);
			[this.previewTime, this.previewSetTime] = createSignal(0);
			this.previewParams = {
				storyboard,
				visible: this.previewVisible,
				time: this.previewTime
			};
		}
		this.video.playbackRate = appMediaPlaybackController.playbackRate;
		this.listenerSetter = new ListenerSetter();
		this.setup({
			element: this.wrapper,
			listenerSetter: this.listenerSetter,
			canHideControls: () => {
				if (this.video.paused) return false;
				if (this.playbackRateButton?.controls.isMenuOpen()) return false;
				if (this.qualityLevelsButton?.controls.isMenuOpen()) return false;
				return true;
			},
			canShowControls: () => {
				if (this.speedDragHandler?.controls.isChangingSpeed()) return false;
				return true;
			},
			showOnLeaveToClassName: [
				"media-viewer-caption",
				"media-viewer-topbar",
				"media-viewer-album-thumbs"
			],
			ignoreClickClassName: "ckin__controls"
		});
		if (!this.hadContainer) {
			video.parentNode.insertBefore(this.wrapper, video);
			this.wrapper.appendChild(video);
		}
		this.skin = "default";
		this.stylePlayer(duration);
		if (this.skin === "default" && !live) {
			const controls = this.controls = this.wrapper.querySelector(".default__controls.ckin__controls");
			this.gradient = this.controls.previousElementSibling;
			if (this.previewParams) this.preview = createPreview(this.previewParams);
			const debouncedToggleControls = debounce((show) => {
				this.wrapper.classList.toggle("show-time", show);
			}, 200, false, true);
			this.addEventListener("toggleControls", debouncedToggleControls);
			this.progress = new MediaProgressLine({
				videoTimestamps,
				withTime: true,
				appendToTimeElement: this.preview?.element,
				onSeekStart: () => {
					this.wrapper.classList.add("is-seeking");
				},
				onSeekEnd: () => {
					this.wrapper.classList.remove("is-seeking");
				},
				onHover: (value) => {
					if (this.previewParams) {
						this.previewSetTime(value * this.video.duration);
						this.previewSetVisible(true);
					}
					this.onTimePreviewToggle?.(true);
				},
				onPointerOut: () => {
					if (this.previewParams) this.previewSetVisible(false);
					this.onTimePreviewToggle?.(false);
				}
			});
			this.progress.setMedia({
				media: video,
				streamable,
				duration
			});
			controls.prepend(this.progress.container);
		}
		if (play) playOrPlayMuted(video).finally(() => {
			this.setIsPlaying(!this.video.paused);
		});
		else this.setIsPlaying(!this.video.paused);
	}
	get width() {
		return this.video.videoWidth || this._width;
	}
	get height() {
		return this.video.videoHeight || this._height;
	}
	setIsPlaying(isPlaying) {
		if (this.isPlaying === isPlaying) return;
		this.isPlaying = isPlaying;
		this.toggleActivity(isPlaying);
		if (this.live && !isPlaying) return;
		this.wrapper.classList.toggle("is-playing", isPlaying);
		const icon = isPlaying ? "pause_filled" : "play_filled";
		const label = iconButtonLabel(icon);
		this.toggles.forEach((toggle) => {
			toggle.replaceChildren(Icon(icon));
			toggle.setAttribute("aria-label", label);
		});
	}
	stylePlayer(initDuration) {
		const { wrapper, video, skin, listenerSetter, live } = this;
		wrapper.classList.add(skin);
		if (live) wrapper.classList.add(`${skin}-live`);
		const html = this.buildControls();
		wrapper.insertAdjacentHTML("beforeend", html);
		keepLeftToRight(wrapper.querySelector(`.${skin}__controls`));
		let timeDuration;
		const onPlayCallbacks = [], onPauseCallbacks = [];
		if (skin === "default") {
			if (this.canPause) {
				const mainToggle = this.mainToggle = Button(`${skin}__button--big toggle`, {
					noRipple: true,
					icon: "play_filled"
				});
				wrapper.firstElementChild.after(mainToggle);
			}
			const leftControls = wrapper.querySelector(".left-controls");
			if (live) this.toggles = [];
			else {
				const leftToggle = ButtonIcon(` ${skin}__button toggle`, {
					noRipple: true,
					ariaLabel: "Play"
				});
				leftControls.prepend(leftToggle);
				this.toggles = [leftToggle];
			}
			const rightControls = wrapper.querySelector(".right-controls");
			if (!live) this.playbackRateButton = createPlaybackRateButton({
				skin: this.skin,
				onMenuToggle: this.onMenuToggle
			});
			if (!IS_MOBILE && document.pictureInPictureEnabled) this.pipButton = ButtonIcon(`pip ${skin}__button`, {
				noRipple: true,
				ariaLabel: "PictureInPicture"
			});
			const fullScreenButton = ButtonIcon(` ${skin}__button`, { noRipple: true });
			rightControls.append(...[
				this.playbackRateButton?.element,
				this.createQualityLevelsButton(),
				this.pipButton,
				fullScreenButton
			].filter(Boolean));
			const timeElapsed = wrapper.querySelector(".ckin__time-elapsed");
			timeDuration = wrapper.querySelector(".ckin__time-duration");
			const volumeSelector = this.volumeSelector = new VolumeSelector({
				listenerSetter,
				vertical: false,
				keepLTR: true,
				media: video,
				useGlobalVolume: this.useGlobalVolume,
				onVolumeChange: this.onVolumeChange
			});
			volumeSelector.btn.classList.remove("btn-icon");
			if (timeElapsed) timeElapsed.parentElement.before(volumeSelector.btn);
			else leftControls.lastElementChild.before(volumeSelector.btn);
			this.toggles.forEach((button) => {
				attachClickEvent(button, () => {
					this.togglePlay();
				}, { listenerSetter: this.listenerSetter });
			});
			if (this.pipButton) {
				attachClickEvent(this.pipButton, this.requestPictureInPicture, { listenerSetter: this.listenerSetter });
				this.debouncePipTime = 20;
				this.debouncedPip = debounce(this._onPip, this.debouncePipTime, false, true);
				this.addPipListeners(video);
			}
			if (!IS_TOUCH_SUPPORTED) {
				if (this.canPause) attachClickEvent(video, () => {
					if (this.checkInteraction() || video.dataset.wasChangingSpeed) return;
					this.togglePlay();
				}, { listenerSetter: this.listenerSetter });
				if (this.listenKeyboardEvents) listenerSetter.add(getAppWindow().document)("keydown", (e) => {
					if (overlayCounter.overlaysActive > 1 || Modes.a11y && (e.defaultPrevented || contextMenuController.isOpened()) || getAppWindow().document.pictureInPictureElement === video || this.listenKeyboardEvents === "fullscreen" && !this.isFullScreen()) return;
					const { key, code } = e;
					let good = true;
					if (code === "KeyF") this.toggleFullScreen();
					else if (code === "KeyM" && !e.ctrlKey && !e.metaKey && !e.altKey) appMediaPlaybackController.muted = !appMediaPlaybackController.muted;
					else if (code === "Space" && this.canPause) this.togglePlay();
					else if (e.altKey && (code === "Equal" || code === "Minus") && this.canSeek) {
						const add = code === "Equal" ? 1 : -1;
						this.playbackRateButton.controls.changeRateByAmount(add);
					} else if (wrapper.classList.contains("ckin__fullscreen") && (key === "ArrowLeft" || key === "ArrowRight") && this.canSeek) {
						if (key === "ArrowLeft") appMediaPlaybackController.seekBackward({ action: "seekbackward" });
						else appMediaPlaybackController.seekForward({ action: "seekforward" });
					} else good = false;
					if (good) {
						cancelEvent(e);
						return false;
					}
				});
			}
			if (this.canPause) {
				this.speedDragHandler = createSpeedDragHandler({
					video: this.video,
					onShowSpeed: () => {
						this.hideControls();
					},
					onHideSpeed: () => {
						this.showControls();
					}
				});
				this.wrapper.append(this.speedDragHandler.element);
				listenerSetter.add(video)("contextmenu", (e) => {
					e.preventDefault();
				});
			}
			listenerSetter.add(video)("dblclick", () => {
				if (!IS_TOUCH_SUPPORTED) this.toggleFullScreen();
			});
			attachClickEvent(fullScreenButton, () => {
				this.toggleFullScreen();
			}, { listenerSetter: this.listenerSetter });
			addFullScreenListener(wrapper, () => this._onFullScreen(fullScreenButton), listenerSetter);
			this._onFullScreen(fullScreenButton, true);
			if (timeElapsed) listenerSetter.add(video)("timeupdate", () => {
				if (!video.paused && !this.isPlaying) {
					console.warn("video: fixing missing play event");
					simulateEvent(video, "play");
				}
				timeElapsed.textContent = toHHMMSS(video.currentTime | 0);
			});
			const onPlay = () => {
				wrapper.classList.add("played");
				if (!IS_TOUCH_SUPPORTED && !live) onPlayCallbacks.push(() => {
					this.hideControls(true);
				});
				indexOfAndSplice(onPlayCallbacks, onPlay);
			};
			if (this.hadContainer) onPlay();
			onPlayCallbacks.push(onPlay);
			onPauseCallbacks.push(() => {
				this.showControls(false);
			});
			listenerSetter.add(appMediaPlaybackController)("playbackParams", () => {
				if (this.video.dataset.startedChangingSpeed) return;
				this.playbackRateButton.controls.setPlayBackRate(appMediaPlaybackController.playbackRate);
			});
			if (live) {
				this.liveEl = i18n("Rtmp.MediaViewer.Live");
				this.liveEl.classList.add("controls-live");
				leftControls.prepend(this.liveEl);
			}
		}
		listenerSetter.add(video)("play", () => {
			this.setIsPlaying(true);
			onPlayCallbacks.forEach((cb) => cb());
		});
		listenerSetter.add(video)("pause", () => {
			this.setIsPlaying(false);
			onPauseCallbacks.forEach((cb) => cb());
		});
		if (timeDuration) {
			if (video.duration || initDuration) timeDuration.textContent = toHHMMSS(Math.round(video.duration || initDuration));
			else onMediaLoad(video).then(() => {
				timeDuration.textContent = toHHMMSS(Math.round(video.duration));
			});
		}
	}
	createQualityLevelsButton() {
		this.qualityLevelsButton = createQualityLevelsSwitchButton({
			skin: this.skin,
			video: this.video,
			onMenuToggle: this.onMenuToggle
		});
		return this.qualityLevelsButton.element;
	}
	async loadQualityLevels() {
		this.qualityLevelsButton?.controls.loadQualityLevels();
	}
	checkInteraction() {
		if (this.shouldEnableSoundOnClick?.()) {
			this.volumeSelector.setVolume({
				volume: 1,
				muted: false
			});
			return true;
		}
		return false;
	}
	addPipListeners(video) {
		this.listenerSetter.add(video)("enterpictureinpicture", this.onEnterPictureInPicture);
		this.listenerSetter.add(video)("leavepictureinpicture", this.onLeavePictureInPicture);
	}
	togglePlay(isPaused = this.video.paused) {
		this.video[isPaused ? "play" : "pause"]();
	}
	buildControls() {
		const skin = this.skin;
		if (skin === "default") return `
      <div class="${skin}__gradient-bottom ckin__controls"></div>
      <div class="${skin}__controls ckin__controls">
        <div class="bottom-controls night">
          <div class="left-controls">
            <div class="ckin__time">
              ${this.live ? `
      <span class="left-controls-watching" dir="auto"></span>
      ` : `
      <time class="ckin__time-elapsed">0:00</time>
      <span> / </span>
      <time class="ckin__time-duration">0:00</time>
      `}
            </div>
          </div>
          <div class="right-controls"></div>
        </div>
      </div>`;
	}
	cancelFullScreen() {
		if (getFullScreenElement() === this.wrapper) this.toggleFullScreen();
	}
	toggleFullScreen() {
		const player = this.wrapper;
		if (IS_APPLE_MOBILE) {
			const video = this.video;
			video.webkitEnterFullscreen();
			video.enterFullscreen();
			return;
		}
		if (!isFullScreen()) {
			if (isClientPipOpen()) {
				toastNew({ langPackKey: "ClientPip.FullscreenHint" });
				return;
			}
			requestFullScreen(player);
			this.checkInteraction();
		} else cancelFullScreen();
	}
	toggleActivity(active) {
		apiManagerProxy.invokeVoid("toggleUninteruptableActivity", {
			activity: "UsingVideoPlayer",
			active
		});
	}
	isFullScreen() {
		return isFullScreen();
	}
	_onFullScreen(fullScreenButton, noEvent) {
		const isFull = isFullScreen();
		this.wrapper.classList.toggle("ckin__fullscreen", isFull);
		if (!isFull) {
			fullScreenButton.replaceChildren(Icon("fullscreen"));
			fullScreenButton.setAttribute("title", "Full Screen");
		} else {
			fullScreenButton.replaceChildren(Icon("smallscreen"));
			fullScreenButton.setAttribute("title", "Exit Full Screen");
		}
		!noEvent && this.onFullScreen?.(isFull);
	}
	dimBackground() {
		this.wrapper.classList.add("dim-background");
	}
	setTimestamp(timestamp) {
		setCurrentTime(this.video, timestamp);
		this.togglePlay(true);
	}
	cleanup() {
		super.cleanup();
		this.listenerSetter.removeAll();
		this.progress?.removeListeners();
		this.volumeSelector?.removeListeners();
		this.qualityLevelsButton?.dispose();
		this.playbackRateButton?.dispose();
		this.speedDragHandler?.dispose();
		this.preview?.dispose();
		this.onMenuToggle = this.onTimePreviewToggle = this.onPip = this.onVolumeChange = this.onFullScreen = this.onFullScreenToPip = this.shouldEnableSoundOnClick = void 0;
		this.progress?.cleanup();
		this.toggleActivity(false);
	}
	unmount() {
		[
			this.mainToggle,
			this.gradient,
			this.controls
		].forEach((element) => {
			element.remove();
		});
	}
	setupLiveMenu(buttons) {
		this.liveMenuButton = ButtonMenuToggle({
			direction: "top-left",
			buttons,
			buttonOptions: { noRipple: true }
		});
		this.wrapper.querySelector(".right-controls").prepend(this.liveMenuButton);
	}
	updateLiveViewersCount(count) {
		this.wrapper.querySelector(".left-controls-watching").replaceChildren(i18n("Rtmp.Watching", [numberThousandSplitterForWatching(Math.max(1, count))]));
	}
	get inPip() {
		return this._inPip;
	}
};
//#endregion
//#region src/components/wrappers/video.ts
var video_exports = /* @__PURE__ */ __exportAll({
	USE_VIDEO_OBSERVER: () => false,
	default: () => wrapVideo
});
var MAX_VIDEO_AUTOPLAY_SIZE = 52428800;
var roundVideoProgressRingResizers = /* @__PURE__ */ new Set();
hotListen(void 0, mediaSizes, "changeScreen", (from, to) => {
	if (to === ScreenSize.mobile || from === ScreenSize.mobile) roundVideoProgressRingResizers.forEach((resize) => resize());
});
async function wrapVideo({ doc, altDoc, container, message, boxWidth, boxHeight, fillBox, withTail, isOut, middleware, lazyLoadQueue, noInfo, group, onlyPreview, noPreview, withoutPreloader, loadPromises, noPlayButton, photoSize, videoSize, searchContext, autoDownload, managers = rootScope.managers, noAutoplayAttribute, ignoreStreaming, canAutoplay, useBlur, observer, setShowControlsOn, uploadingFileName, onGlobalMedia, onLoad, withPreview, hlsStreaming, streamablePreloader }) {
	const supportsStreaming = doc.supportsStreaming && !ignoreStreaming;
	if (!supportsStreaming && altDoc && !onlyPreview && !IS_H265_SUPPORTED) {
		doc = altDoc;
		altDoc = void 0;
	}
	if (doc.type === "gif" && container) {
		container.classList.add("media-gif-wrapper");
		container.dataset.docId = "" + doc.id;
	}
	const autoDownloadSize = autoDownload?.video;
	let noAutoDownload = autoDownloadSize === 0;
	const isGroupedItem = !(boxWidth && boxHeight);
	uploadingFileName ?? (uploadingFileName = message?.uploadingFileName?.[0]);
	const suppressAutoplayWhileUploading = !!uploadingFileName && doc.type !== "round";
	canAutoplay ?? (canAutoplay = (doc.type !== "video" || doc.size <= MAX_VIDEO_AUTOPLAY_SIZE && !isGroupedItem) && (doc.type === "gif" ? liteMode.isAvailable("gif") : liteMode.isAvailable("video")));
	let spanTime, spanPlay, willObserveSound = false;
	if (!noInfo && container) {
		spanTime = document.createElement("span");
		spanTime.classList.add("video-time");
		container.append(spanTime);
		let needPlayButton = false;
		if (doc.type !== "gif") {
			spanTime.innerText = toHHMMSS(doc.duration, false);
			if (!noPlayButton && doc.type !== "round") {
				if (canAutoplay && !noAutoDownload) spanTime.append(Icon("nosound_filled", "video-time-icon"));
				else needPlayButton = true;
			}
		} else {
			spanTime.innerText = "GIF";
			if (!canAutoplay && !noPlayButton) {
				needPlayButton = true;
				noAutoDownload = void 0;
			}
		}
		if (needPlayButton) {
			spanPlay = Button("btn-circle video-play position-center", {
				icon: "largeplay_filled",
				noRipple: true
			});
			container.append(spanPlay);
		}
	}
	const res = {};
	if (doc.mime_type === "image/gif") {
		const photoRes = await wrapPhoto({
			photo: doc,
			message,
			container,
			boxWidth,
			boxHeight,
			fillBox,
			withTail,
			isOut,
			lazyLoadQueue,
			middleware,
			withoutPreloader,
			loadPromises,
			autoDownloadSize,
			size: photoSize,
			managers,
			useBlur,
			uploadingFileName
		});
		res.thumb = photoRes;
		res.loadPromise = photoRes.loadPromises.full;
		return res;
	}
	let preloader;
	const video = createVideo({
		middleware,
		pip: willObserveSound
	});
	video.classList.add("media-video");
	video.muted = true;
	if (doc.type === "round") {
		const divRound = document.createElement("div");
		divRound.classList.add("media-round", "z-depth-1");
		divRound.dataset.mid = "" + message.mid;
		divRound.dataset.peerId = "" + message.peerId;
		divRound.message = message;
		const strokeWidth = 3.5;
		const roundVideoSize = doc.w || mediaSizes.active.round.width;
		const getProgressRingSize = () => Math.min(roundVideoSize, mediaSizes.active.round.width);
		const progressRingSize = getProgressRingSize();
		const ring = createProgressRing({
			size: progressRingSize,
			strokeWidth,
			strokeOpacity: .3
		});
		let progress = 0;
		let circumference = getProgressRingCircumference(progressRingSize, strokeWidth);
		const setProgress = (value) => {
			progress = Math.max(0, Math.min(1, value || 0));
			ring.circle.style.strokeDashoffset = "" + circumference * (1 - progress);
		};
		const resizeProgressRing = () => {
			const size = getProgressRingSize();
			ring.setSize(size);
			circumference = getProgressRingCircumference(size, strokeWidth);
			setProgress(progress);
		};
		roundVideoProgressRingResizers.add(resizeProgressRing);
		middleware.onClean(() => {
			roundVideoProgressRingResizers.delete(resizeProgressRing);
			ring.destroy();
		});
		divRound.append(ring.element);
		if (message.pFlags.media_unread) divRound.classList.add("is-unread");
		const canvas = document.createElement("canvas");
		canvas.classList.add("video-round-canvas");
		canvas.width = canvas.height = doc.w;
		divRound.prepend(canvas, spanTime);
		divRound.append(video);
		container?.append(divRound);
		const ctx = canvas.getContext("2d");
		const onLoad = () => {
			const message = divRound.message;
			const globalVideo = appMediaPlaybackController.addMedia({
				message,
				autoload: !noAutoDownload,
				middleware
			});
			onGlobalMedia?.(globalVideo);
			const clear = () => {
				(hotReloadGuard.appImManager.chat.setPeerPromise || Promise.resolve()).finally(() => {
					if (isInDOM(globalVideo)) return;
					globalVideo.removeEventListener("play", onPlay);
					globalVideo.removeEventListener("timeupdate", throttledTimeUpdate);
					globalVideo.removeEventListener("pause", onPaused);
					globalVideo.removeEventListener("ended", onEnded);
				});
			};
			const onFrame = () => {
				ctx.drawImage(globalVideo, 0, 0);
				setProgress(globalVideo.currentTime / globalVideo.duration);
				return !globalVideo.paused;
			};
			const onTimeUpdate = () => {
				if (!globalVideo.duration) return;
				if (!isInDOM(globalVideo)) {
					clear();
					return;
				}
				if (globalVideo.paused) onFrame();
				spanTime.firstChild.nodeValue = toHHMMSS(globalVideo.duration - globalVideo.currentTime, false);
			};
			const throttledTimeUpdate = throttle(() => {
				fastRaf(onTimeUpdate);
			}, 1e3, false);
			const noSoundIcon = Icon("nosound_filled", "video-time-icon");
			const setIsPaused = (paused) => {
				divRound.classList.toggle("is-paused", paused);
				if (paused) spanTime.append(noSoundIcon);
				else noSoundIcon.remove();
			};
			const onPlay = () => {
				video.classList.add("hide");
				setIsPaused(false);
				animateSingle(onFrame, canvas);
				if (preloader?.preloader && preloader.preloader.classList.contains("manual")) preloader.onClick();
			};
			const onPaused = () => {
				if (!isInDOM(globalVideo)) {
					clear();
					return;
				}
				setIsPaused(true);
			};
			const onEnded = () => {
				video.classList.remove("hide");
				setIsPaused(true);
				setCurrentTime(video, 0);
				spanTime.firstChild.nodeValue = toHHMMSS(globalVideo.duration, false);
				if (globalVideo.currentTime) setCurrentTime(globalVideo, 0);
			};
			globalVideo.addEventListener("play", onPlay);
			globalVideo.addEventListener("timeupdate", throttledTimeUpdate);
			globalVideo.addEventListener("pause", onPaused);
			globalVideo.addEventListener("ended", onEnded);
			attachClickEvent(canvas, (e) => {
				cancelEvent(e);
				if (preloader && !preloader.detached) preloader.onClick();
				if (globalVideo.paused) {
					const hadSearchContext = !!searchContext;
					if (appMediaPlaybackController.setSearchContext(searchContext || {
						peerId: 0,
						inputFilter: { _: "inputMessagesFilterEmpty" },
						useSearch: false
					})) {
						const [prev, next] = !hadSearchContext ? [] : findMediaTargets(divRound, message.mid);
						appMediaPlaybackController.setTargets({
							peerId: message.peerId,
							mid: message.mid
						}, prev, next);
					}
					safePlay(globalVideo);
				} else globalVideo.pause();
			});
			if (globalVideo.paused) {
				if (globalVideo.duration && globalVideo.currentTime !== globalVideo.duration && globalVideo.currentTime > 0) {
					onFrame();
					onTimeUpdate();
					video.classList.add("hide");
				} else onPaused();
			} else onPlay();
		};
		if (message.pFlags.is_outgoing) {
			divRound.onLoad = onLoad;
			divRound.dataset.isOutgoing = "1";
		} else onLoad();
	} else if (!noAutoplayAttribute && !suppressAutoplayWhileUploading) video.autoplay = true;
	let photoRes;
	if (message || onlyPreview || withPreview) {
		photoRes = await wrapPhoto({
			photo: doc,
			message,
			container,
			boxWidth,
			boxHeight,
			fillBox,
			withTail,
			isOut,
			lazyLoadQueue,
			middleware,
			withoutPreloader: true,
			loadPromises,
			autoDownloadSize: autoDownload?.photo,
			size: photoSize,
			managers,
			useBlur,
			canHaveVideoPlayer: willObserveSound,
			uploadingFileName
		});
		res.thumb = photoRes;
		if (!canAutoplay && doc.type !== "gif" || onlyPreview) {
			if (!canAutoplay && doc.type === "video" && container && !photoRes.images.thumb && !photoRes.images.full) container.classList.add("video-no-thumbnail");
			if (uploadingFileName && container && !onlyPreview) {
				preloader = new ProgressivePreloader({
					attachMethod: "prepend",
					isUpload: true
				});
				preloader.attachPromise(appDownloadManager.getUpload(uploadingFileName));
				preloader.attach(container, false);
			}
			res.loadPromise = photoRes.loadPromises.full;
			return res;
		}
		if (withTail) {
			const foreignObject = (photoRes.images.thumb || photoRes.images.full).parentElement;
			video.width = +foreignObject.getAttributeNS(null, "width");
			video.height = +foreignObject.getAttributeNS(null, "height");
			foreignObject.append(video);
		}
	} else if (!noPreview) {
		const gotThumb = getMediaThumbIfNeeded({
			photo: doc,
			cacheContext: {},
			useBlur: useBlur || true
		});
		if (gotThumb) {
			const thumbImage = gotThumb.image;
			thumbImage.classList.add("media-poster");
			container?.append(thumbImage);
			res.thumb = {
				loadPromises: {
					thumb: gotThumb.loadPromise,
					full: Promise.resolve()
				},
				images: {
					thumb: thumbImage,
					full: null
				},
				preloader: null,
				aspecter: null
			};
			loadPromises?.push(gotThumb.loadPromise);
			res.loadPromise = gotThumb.loadPromise;
		}
	}
	if (onlyPreview) return res;
	const appendVideo = () => {
		(photoRes?.aspecter || container).append(video);
	};
	if (!video.parentElement && container && video.poster) appendVideo();
	let cacheContext, altCacheContext;
	const getCacheContext = () => {
		cacheContext = apiManagerProxy.getCacheContext(doc, videoSize?.type);
		altDoc && (altCacheContext = apiManagerProxy.getCacheContext(altDoc, videoSize?.type));
	};
	getCacheContext();
	if (uploadingFileName) {
		preloader = new ProgressivePreloader({
			attachMethod: "prepend",
			isUpload: true
		});
		preloader.attachPromise(appDownloadManager.getUpload(uploadingFileName));
		preloader.attach(container, false);
		noAutoDownload = void 0;
		if (!noAutoplayAttribute && suppressAutoplayWhileUploading) appDownloadManager.getUpload(uploadingFileName).then(() => {
			if (middleware && !middleware()) return;
			video.autoplay = true;
			safePlay(video);
		}, noop);
	} else if (!cacheContext.downloaded && !supportsStreaming && !withoutPreloader) preloader = new ProgressivePreloader({ attachMethod: "prepend" });
	else if (supportsStreaming && !withoutPreloader) preloader = new ProgressivePreloader({
		cancelable: false,
		streamable: streamablePreloader,
		attachMethod: "prepend"
	});
	const renderDeferred = deferredPromise();
	video.addEventListener("error", (e) => {
		if (shouldIgnoreVideoError(e)) return;
		if (video.error.code !== 4) console.error("Error " + video.error.code + "; details: " + video.error.message);
		if (preloader && !uploadingFileName) preloader.detach();
		if (!renderDeferred.isFulfilled) renderDeferred.resolve();
	}, { once: true });
	if (doc.type === "video" && spanTime) {
		const onTimeUpdate = () => {
			if (!video.duration) return;
			spanTime.firstChild.nodeValue = toHHMMSS(video.duration - video.currentTime, false);
		};
		const throttledTimeUpdate = throttle(() => {
			fastRaf(onTimeUpdate);
		}, 1e3, false);
		video.addEventListener("timeupdate", throttledTimeUpdate);
		if (spanPlay) video.addEventListener("timeupdate", () => {
			sequentialDom.mutateElement(spanPlay, () => {
				spanPlay.remove();
			});
		}, { once: true });
	}
	video.muted = true;
	video.loop = true;
	if (!noAutoplayAttribute && !suppressAutoplayWhileUploading) video.autoplay = true;
	let loadPhotoThumbFunc = noAutoDownload && photoRes?.preloader?.loadFunc;
	const load = async () => {
		if (preloader && noAutoDownload && !withoutPreloader) {
			preloader.construct();
			preloader.setManual();
		}
		getCacheContext();
		let loadPromise = Promise.resolve();
		if (preloader && !uploadingFileName || withoutPreloader) {
			if (!cacheContext.downloaded && !supportsStreaming) {
				const promise = loadPromise = appDownloadManager.downloadMediaURL({
					media: doc,
					queueId: lazyLoadQueue?.queueId,
					onlyCache: noAutoDownload,
					thumb: videoSize
				});
				if (preloader) preloader.attach(container, false, promise);
			} else if (supportsStreaming) {
				if (noAutoDownload) loadPromise = Promise.reject(makeError("NO_AUTO_DOWNLOAD"));
				else if (!cacheContext.downloaded && preloader) {
					preloader.attach(container, false, null);
					video.addEventListener(IS_SAFARI ? "timeupdate" : "canplay", () => {
						preloader.detach();
					}, { once: true });
				}
			}
		}
		if (!noAutoDownload && loadPhotoThumbFunc) {
			loadPhotoThumbFunc();
			loadPhotoThumbFunc = null;
		}
		noAutoDownload = void 0;
		loadPromise.then(async () => {
			if (middleware && !middleware()) {
				renderDeferred.resolve();
				return;
			}
			if (doc.type === "round") appMediaPlaybackController.resolveWaitingForLoadMedia(message.peerId, message.mid, message.pFlags.is_scheduled);
			getCacheContext();
			const onError = (err) => {
				console.error("video load error", video, err);
				if (spanTime) {
					spanTime.classList.add("is-error");
					const previousIcon = spanTime.querySelector(".video-time-icon");
					const newIcon = Icon("sendingerror_filled", "video-time-icon");
					if (previousIcon) previousIcon.replaceWith(newIcon);
					else spanTime.append(newIcon);
				}
				renderDeferred.reject(err);
			};
			const onMediaLoadPromise = onMediaLoad(video);
			const videoLeakPromise = handleVideoLeak(video, onMediaLoadPromise);
			videoLeakPromise.catch(onError);
			onMediaLoadPromise.then(() => {
				if (group) animationIntersector.addAnimation({
					animation: video,
					group,
					observeElement: video,
					type: "video",
					locked: willObserveSound
				});
				if (preloader && !uploadingFileName) preloader.detach();
				if (!video.parentElement && container && !video.poster) appendVideo();
				if (altDoc) {
					videoLeakPromise.then(() => {
						video.pause();
						renderDeferred.resolve();
					});
					setCurrentTime(video, 1e-4);
				} else renderDeferred.resolve();
				onLoad?.();
			}, onError);
			if (altDoc && altCacheContext) {
				const sources = [{
					context: cacheContext,
					type: "video/mp4; codecs=\"hev1\"",
					width: doc.w
				}, {
					context: altCacheContext,
					type: "video/mp4; codecs=\"avc1.64001E\"",
					width: altDoc.w
				}].map(({ context, type, width }) => {
					const source = document.createElement("source");
					source.src = context.url;
					source.width = width;
					return source;
				});
				video.append(...sources);
				video.load();
			} else renderImageFromUrl(video, hlsStreaming && supportsStreaming ? getDocumentURL(doc, { supportsHlsStreaming: true }) : cacheContext.url);
		}, noop);
		return {
			download: loadPromise,
			render: Promise.all([loadPromise, renderDeferred])
		};
	};
	if (preloader && !uploadingFileName) preloader.setDownloadFunction(load);
	container && (container.preloader = preloader);
	if (doc.type === "gif" && !canAutoplay) {
		const detach = attachClickEvent(container, (e) => {
			if (hasMediaSpoiler(container)) return;
			detach();
			cancelEvent(e);
			spanPlay?.remove();
			video.autoplay = true;
			load();
		}, { capture: true });
	} else res.loadPromise = !lazyLoadQueue ? (await load()).render : (lazyLoadQueue.push({
		div: container,
		load: () => load().then(({ render }) => render)
	}), Promise.resolve());
	if (res.thumb) await res.thumb.loadPromises.thumb;
	if (video) res.video = video;
	return res;
}
//#endregion
export { ControlsHover as _, PlaybackRateButton$1 as a, setPlaybackRateMenuState as c, playOrPlayMuted as d, VolumeSelector as f, DOCUMENT_PICTURE_IN_PICTURE_SUPPORTED as g, openClientPip as h, PLAYBACK_RATES as i, ButtonMenuItemWithAuxiliaryText as l, isClientPipOpen as m, wrapVideo as n, getPlaybackRateIcon as o, closeClientPip as p, VideoPlayer as r, getPlaybackRateMenuButton as s, video_exports as t, snapQualityHeight as u, ProgressRing as v };
