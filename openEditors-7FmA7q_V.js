//# allFunctionsCalledOnLoad
const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["src-Dma656V6.js","rolldown-runtime-CwcJO0Gh.js","__vite-browser-external-bastLX3_.js"])))=>i.map(i=>d[i]);
import { n as __exportAll } from "./rolldown-runtime-CwcJO0Gh.js";
import { h as Modes, p as MOUNT_CLASS_TO, r as IS_APPLE } from "./userAgent-ByGXcznk.js";
import { i as isSwipingBackSafari } from "./appNavigationController-Ct0fx8yF.js";
import { t as IS_TOUCH_SUPPORTED } from "./touchSupport-B2RWO3zD.js";
import { i as windowSize } from "./themeController-2cytOOn0.js";
import { t as noop } from "./noop-H9NNBLfX.js";
import { t as pause } from "./pause-BSJh-z46.js";
import { t as Icon } from "./icon-DbP6Es97.js";
import { n as logger } from "./logger-7zf0rNYS.js";
import { n as indexOfAndSplice } from "./superMessagePort-DhrhiTig.js";
import { a as safeAssign } from "./idb-BZfkipS3.js";
import { A as mergeProps, C as createSignal, I as splitProps, M as onCleanup, N as onMount, _ as createMemo, p as createComponent, x as createRoot, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { n as deferredPromise } from "./cancellablePromise-bof--dnO.js";
import { t as __vitePreload } from "./preload-helper-B0NHKCoo.js";
import { r as getOverlayRoot, t as bindActiveWindowListener } from "./appWindow-bo-KtJhy.js";
import { t as cancelEvent } from "./cancelEvent-Cw8vYZHp.js";
import { t as clamp } from "./clamp-9UaNhw6N.js";
import { n as createStore } from "./store-PwRn5fa3.js";
import { n as hotListen } from "./hotModule-aCRkP77w.js";
import { _ as use, c as insert, g as template, h as style, m as spread, n as Portal, o as className, t as Dynamic, u as memo } from "./web-BPyQozky.js";
import { t as liteMode } from "./liteMode-DeLStZfQ.js";
import { a as makeMediaSize, n as mediaSizes } from "./mediaSizes-C1MTaleW.js";
import { F as VisibilityIntersector, N as LazyLoadQueueIntersector } from "./renderer-L80wjxct.js";
import { t as ripple } from "./ripple-D7hcIc_t.js";
import { t as classNames } from "./classNames-DxGDjmvw.js";
import { t as IconTsx } from "./iconTsx-B4lOk4A6.js";
import { t as getMiddleware } from "./middleware-D6HuIqPm.js";
import { n as animationIntersector } from "./animationIntersector-vAjH_7t1.js";
import { t as ListenerSetter } from "./listenerSetter-BER6qAXn.js";
import { t as tooltipController } from "./tooltipController-C8K0zGt8.js";
import { t as RippleElement } from "./rippleElement-C-prm4MP.js";
import { n as iconButtonLabel } from "./iconButtonLabel-BKjhnSeF.js";
import { n as isElementRTL } from "./isDocumentRTL-z8ksM2Dv.js";
import { a as wrapSticker, c as setCurrentTime } from "./sticker-5twBOy1Y.js";
import { t as SetTransition } from "./singleTransition-UfxhQocw.js";
import { t as IS_IMAGE_BITMAP_SUPPORTED } from "./imageBitmapSupport-CG1okL3h.js";
import { t as requestRAF } from "./requestRAF-CwdYaVwH.js";
import { t as OverlayClickHandler } from "./overlayClickHandler-CXjT0xwp.js";
import { Tn as getInlineArrowKeys, u as attachContextMenuListener, wn as contextMenuController } from "./confirmationPopup-Bz6mK0o-.js";
import { l as debounce, t as pickKeys } from "./pickKeys-Ckq7_h-r.js";
//#region src/hooks/useIsCleaned.ts
function useIsCleaned() {
	let isCleaned = false;
	onCleanup(() => {
		isCleaned = true;
	});
	return () => isCleaned;
}
//#endregion
//#region src/components/tooltip.tsx
var _tmpl$$1 = /*#__PURE__*/ template(`<div><div class="tooltip-part tooltip-background"></div><span class="tooltip-part tooltip-notch"></span><div class="tooltip-part tooltip-text">`);
var _tmpl$2 = /*#__PURE__*/ template(`<div>`);
var _tmpl$3 = /*#__PURE__*/ template(`<div class=tooltip-subtitle>`);
var _tmpl$4 = /*#__PURE__*/ template(`<div class="tooltip-part tooltip-right">`);
var tooltipOverlayClickHandler = new OverlayClickHandler(void 0, true);
function showTooltip({ element, class: className$1, container = element.parentElement, vertical, textElement, subtitleElement, paddingX = 0, offsetY = 0, centerVertically, onClose, icon, auto, mountOn = getOverlayRoot(), relative, absolute, lighter, rightElement, useOverlay = mountOn === getOverlayRoot() }) {
	const containerRect = !relative && container.getBoundingClientRect();
	const elementRect = !relative && element.getBoundingClientRect();
	const mountRect = absolute && mountOn.getBoundingClientRect();
	let close;
	createRoot((dispose) => {
		let unregisterTooltip = () => false;
		const [getRect, setRect] = createSignal();
		const getStyle = () => {
			const css = { "max-width": Math.min(containerRect.width - paddingX * 2, 320) + "px" };
			if (absolute) css.position = "absolute";
			const rect = getRect();
			if (!rect) return css;
			const mountLeft = absolute ? mountRect.left : 0;
			const mountTop = absolute ? mountRect.top : 0;
			const minX = Math.min(containerRect.left + paddingX, containerRect.right);
			const maxX = Math.max(containerRect.left, containerRect.right - Math.min(containerRect.width, rect.width) - paddingX);
			const centerX = elementRect.left + (elementRect.width - rect.width) / 2;
			const left = clamp(centerX, minX, maxX);
			const verticalOffset = 12;
			if (vertical === "top") css.top = (centerVertically ? elementRect.top + elementRect.height / 2 : elementRect.top) - rect.height - verticalOffset + offsetY - mountTop + "px";
			else css.top = elementRect.bottom + verticalOffset - mountTop + "px";
			css.left = left - mountLeft + "px";
			css["--notch-offset"] = elementRect.left + (elementRect.width - 19) / 2 - left + "px";
			return css;
		};
		let div;
		const tooltip = (() => {
			var _el$ = _tmpl$$1(), _el$4 = _el$.firstChild.nextSibling.nextSibling;
			var _ref$ = div;
			typeof _ref$ === "function" ? use(_ref$, _el$) : div = _el$;
			insert(_el$4, icon && createComponent(IconTsx, {
				icon,
				"class": "tooltip-icon"
			}), null);
			insert(_el$4, subtitleElement ? [(() => {
				var _el$5 = _tmpl$2();
				insert(_el$5, textElement);
				return _el$5;
			})(), (() => {
				var _el$6 = _tmpl$3();
				insert(_el$6, subtitleElement);
				return _el$6;
			})()] : textElement, null);
			insert(_el$, rightElement && (() => {
				var _el$7 = _tmpl$4();
				insert(_el$7, rightElement);
				return _el$7;
			})(), null);
			createRenderEffect((_p$) => {
				var _v$ = classNames("tooltip", "tooltip-" + vertical, icon && "tooltip-with-icon", className$1, lighter && "tooltip-lighter"), _v$2 = !relative && getStyle();
				_v$ !== _p$.e && className(_el$, _p$.e = _v$);
				_p$.t = style(_el$, _v$2, _p$.t);
				return _p$;
			}, {
				e: void 0,
				t: void 0
			});
			return _el$;
		})();
		createComponent(Portal, {
			mount: mountOn,
			children: tooltip
		});
		onMount(() => {
			!relative && setRect(div.getBoundingClientRect());
			div.classList.add("mounted");
			SetTransition({
				element: div,
				className: "is-visible",
				duration: 200,
				useRafs: 2,
				forwards: true
			});
		});
		let closed = false;
		const onToggle = (open) => {
			if (open) return;
			closed = true;
			clearTimeout(timeout);
			SetTransition({
				element: div,
				className: "is-visible",
				duration: 200,
				forwards: false,
				onTransitionEnd: () => {
					unregisterTooltip();
					onClose?.();
					dispose();
				}
			});
		};
		close = () => {
			if (closed) return;
			if (useOverlay) {
				tooltipOverlayClickHandler.close();
				if (!closed) onToggle(false);
			} else onToggle(false);
		};
		const timeout = !auto ? 0 : window.setTimeout(close, 3e3);
		unregisterTooltip = tooltipController.register(close);
		useOverlay && Promise.resolve().then(() => {
			if (closed) return;
			tooltipOverlayClickHandler.open(mountOn);
			tooltipOverlayClickHandler.addEventListener("toggle", onToggle, { once: true });
		});
	});
	return { close };
}
//#endregion
//#region src/helpers/dom/tabList.ts
function getTabs(menu) {
	return Array.from(menu.querySelectorAll("[role=\"tab\"]")).filter((tab) => tab.closest("[role=\"tablist\"]") === menu);
}
function handleTabKeyDown(event) {
	if (!Modes.a11y || event.defaultPrevented || event.isComposing) return;
	const current = event.target;
	const menu = event.currentTarget;
	if (current.getAttribute("role") !== "tab" || current.closest("[role=\"tablist\"]") !== menu) return;
	const tabs = getTabs(menu).filter((tab) => !tab.matches(":disabled, [aria-disabled=\"true\"]") && !tab.closest("[hidden], [inert], .hide") && tab.ownerDocument.defaultView.getComputedStyle(tab).display !== "none");
	const index = tabs.indexOf(current);
	if (index === -1) return;
	const vertical = menu.getAttribute("aria-orientation") === "vertical";
	const inlineKeys = getInlineArrowKeys(isElementRTL(menu));
	const previous = vertical ? "ArrowUp" : inlineKeys.previous;
	const next = vertical ? "ArrowDown" : inlineKeys.next;
	let nextIndex;
	switch (event.key) {
		case "Home":
			nextIndex = 0;
			break;
		case "End":
			nextIndex = tabs.length - 1;
			break;
		case previous:
			nextIndex = (index - 1 + tabs.length) % tabs.length;
			break;
		case next:
			nextIndex = (index + 1) % tabs.length;
			break;
		case "Enter":
		case " ":
			if (!current.matches("button, a[href]") && !event.repeat) {
				event.preventDefault();
				current.click();
			}
			return;
		default: return;
	}
	event.preventDefault();
	tabs[nextIndex].focus();
	tabs[nextIndex].click();
}
var nextTabId = 0;
var tabLists = /* @__PURE__ */ new WeakMap();
/** Shared by Solid tab strips and legacy horizontalMenu. One listener and observer per strip. */
function attachTabList(menu, content) {
	let state = tabLists.get(menu);
	if (!state) {
		state = {
			references: 0,
			content,
			sync: () => {
				Array.from(menu.children).forEach((child, index) => {
					const panel = state.content?.children[+(child.dataset.tab ?? index)];
					if (!panel && !child.matches(".menu-horizontal-div-item, [role=\"tab\"]") || child.dataset.tab === "-1") return;
					child.setAttribute("role", "tab");
					if (panel) {
						child.id || (child.id = `tab-${++nextTabId}`);
						panel.id || (panel.id = `tabpanel-${++nextTabId}`);
						child.setAttribute("aria-controls", panel.id);
						panel.setAttribute("role", "tabpanel");
						panel.setAttribute("aria-labelledby", child.id);
					}
				});
				const tabs = getTabs(menu);
				const selected = tabs.find((tab) => tab.classList.contains("active")) || tabs[0];
				tabs.forEach((tab) => {
					const active = tab === selected;
					tab.setAttribute("aria-selected", String(active));
					if (Modes.a11y) tab.tabIndex = active ? 0 : -1;
					const panelId = tab.getAttribute("aria-controls");
					const panel = panelId && state.content?.children.namedItem(panelId);
					if (panel) {
						if (Modes.a11y) panel.inert = !active;
						panel.setAttribute("aria-hidden", String(!active));
					}
				});
			},
			destroy: () => {
				observer.disconnect();
				menu.removeEventListener("keydown", handleTabKeyDown);
				tabLists.delete(menu);
			}
		};
		const observer = new MutationObserver(state.sync);
		observer.observe(menu, {
			attributes: true,
			attributeFilter: ["class"],
			childList: true,
			subtree: true
		});
		menu.setAttribute("role", "tablist");
		menu.addEventListener("keydown", handleTabKeyDown);
		tabLists.set(menu, state);
	}
	if (content) state.content = content;
	++state.references;
	state.sync();
	return () => {
		if (!--state.references) state.destroy();
	};
}
//#endregion
//#region src/helpers/dom/loadDecodedImage.ts
/** A new image element with `src` loaded and decoded; rejects when it cannot be */
async function loadDecodedImage(src) {
	const image = new Image();
	image.src = src;
	await image.decode();
	return image;
}
//#endregion
//#region src/components/a11yButton.tsx
/**
* A control that is a native `<button>` with the a11y layer (`?a11y=1`) and, without it, the element
* it was before the layer (`as`): a native button brings the browser's own box, takes the focus on
* a click and answers Enter and Space. `disabled` counts only with the layer too, as a div ignores
* it; `ripple` draws the control through RippleElement.
*/
function A11yButton(props) {
	const [local, rest] = splitProps(props, [
		"as",
		"disabled",
		"ripple"
	]);
	const component = Modes.a11y ? "button" : local.as || "div";
	const type = Modes.a11y ? "button" : void 0;
	return local.ripple ? createComponent(RippleElement, mergeProps(rest, {
		component,
		type,
		get disabled() {
			return memo(() => !!Modes.a11y)() ? local.disabled : void 0;
		}
	})) : createComponent(Dynamic, mergeProps(rest, {
		component,
		type,
		get disabled() {
			return memo(() => !!Modes.a11y)() ? local.disabled : void 0;
		}
	}));
}
//#endregion
//#region src/helpers/dom/attachGrabListeners.ts
function attachGrabListeners(element, onStart, onMove, onEnd) {
	const onMouseMove = (event) => {
		onMove({
			x: event.pageX,
			y: event.pageY,
			event
		});
	};
	const onMouseUp = (event) => {
		element.ownerDocument.removeEventListener("mousemove", onMouseMove);
		element.addEventListener("mousedown", onMouseDown, { once: true });
		onEnd?.({
			x: event.pageX,
			y: event.pageY,
			event
		});
	};
	const onMouseDown = (event) => {
		if (event.button !== 0) {
			element.addEventListener("mousedown", onMouseDown, { once: true });
			return;
		}
		onStart({
			x: event.pageX,
			y: event.pageY,
			event
		});
		onMouseMove(event);
		element.ownerDocument.addEventListener("mousemove", onMouseMove);
		element.ownerDocument.addEventListener("mouseup", onMouseUp, { once: true });
	};
	element.addEventListener("mousedown", onMouseDown, { once: true });
	const onTouchMove = (event) => {
		event.preventDefault();
		onMove({
			x: event.touches[0].clientX,
			y: event.touches[0].clientY,
			isTouch: true,
			event
		});
	};
	const onTouchEnd = (event) => {
		element.ownerDocument.removeEventListener("touchmove", onTouchMove);
		element.addEventListener("touchstart", onTouchStart, {
			passive: false,
			once: true
		});
		const touch = event.touches[0] || event.changedTouches[0];
		onEnd?.({
			x: touch.clientX,
			y: touch.clientY,
			isTouch: true,
			event
		});
	};
	const onTouchStart = (event) => {
		onStart({
			x: event.touches[0].clientX,
			y: event.touches[0].clientY,
			isTouch: true,
			event
		});
		onTouchMove(event);
		element.ownerDocument.addEventListener("touchmove", onTouchMove, { passive: false });
		element.ownerDocument.addEventListener("touchend", onTouchEnd, {
			passive: false,
			once: true
		});
	};
	element.addEventListener("touchstart", onTouchStart, {
		passive: false,
		once: true
	});
	return () => {
		element.removeEventListener("mousedown", onMouseDown);
		element.ownerDocument.removeEventListener("mousemove", onMouseMove);
		element.ownerDocument.removeEventListener("mouseup", onMouseUp);
		element.removeEventListener("touchstart", onTouchStart);
		element.ownerDocument.removeEventListener("touchmove", onTouchMove);
		element.ownerDocument.removeEventListener("touchend", onTouchEnd);
	};
}
//#endregion
//#region src/helpers/dom/keepLeftToRight.ts
/**
* Lays a control out left to right in any language — media playback follows the tape, not the line.
* `dir` turns its own layout, and with it (base.scss) the vars that move things along the line
* (`--reflect`, the `--transform-origin-*` ones) and the `.icon-mirror` glyphs inside.
*/
function keepLeftToRight(element) {
	element.dir = "ltr";
}
//#endregion
//#region src/helpers/dom/onRangeInlineArrowKey.ts
/**
* The horizontal arrows on a value slider (`<input type="range">`) go toward its end and its start:
* ArrowLeft raises a right-to-left one. Chromium and Firefox step such a range by its direction,
* WebKit by the keys' sides, so a right-to-left range is stepped here, the same in every engine.
*/
function onRangeInlineArrowKey(event) {
	const input = event.currentTarget;
	if (event.key !== "ArrowLeft" && event.key !== "ArrowRight" || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey || !isElementRTL(input)) return;
	event.preventDefault();
	const value = input.value;
	try {
		if (event.key === getInlineArrowKeys(true).next) input.stepUp();
		else input.stepDown();
	} catch {
		return;
	}
	if (input.value === value) return;
	input.dispatchEvent(new Event("input", { bubbles: true }));
	input.dispatchEvent(new Event("change", { bubbles: true }));
}
//#endregion
//#region src/components/buttonIconTsx.tsx
var _tmpl$ = /*#__PURE__*/ template(`<button>`);
var ButtonIconTsx = (inProps) => {
	const [props, restProps] = splitProps(inProps, [
		"icon",
		"class",
		"children",
		"noRipple",
		"tabIndex"
	]);
	const hasRipple = !props.noRipple;
	const btn = (() => {
		var _el$ = _tmpl$();
		spread(_el$, mergeProps({ get ["class"]() {
			return classNames("btn-icon", hasRipple && "rp", props.class);
		} }, restProps, {
			get type() {
				return restProps.type || "button";
			},
			get tabIndex() {
				return props.tabIndex ?? (Modes.a11y ? restProps.tabindex : -1);
			},
			get ["aria-label"]() {
				return restProps["aria-label"] || (!restProps["aria-labelledby"] && !restProps.title ? iconButtonLabel(props.icon) : void 0);
			}
		}), false, true);
		insert(_el$, (() => {
			var _c$ = memo(() => !!props.icon);
			return () => _c$() && Icon(props.icon);
		})(), null);
		insert(_el$, () => props.children, null);
		return _el$;
	})();
	if (hasRipple) ripple(btn);
	return btn;
};
//#endregion
//#region src/helpers/createElementFromMarkup.ts
function createElementFromMarkup(markup) {
	const div = document.createElement("div");
	div.innerHTML = markup.trim();
	return div.firstElementChild;
}
MOUNT_CLASS_TO.createElementFromMarkup = createElementFromMarkup;
var highResCodec = {
	codec: "avc1.4d4028",
	width: 1920,
	height: 1080,
	bitrate: 2e7
};
var defaultCodec = {
	codec: "avc1.42001f",
	width: 1280,
	height: 720,
	bitrate: 14e6
};
function calcCodecAndBitrate(w, h, fps) {
	const { codec, width, height, bitrate } = h > defaultCodec.height || w > defaultCodec.width ? highResCodec : defaultCodec;
	return {
		codec,
		bitrate: w * h * fps / (width * height * 30) * bitrate
	};
}
//#endregion
//#region src/components/mediaEditor/support.ts
var support_exports = /* @__PURE__ */ __exportAll({
	MAX_EDITABLE_VIDEO_SIZE: () => MAX_EDITABLE_VIDEO_SIZE,
	supportsAudioEncoding: () => supportsAudioEncoding,
	supportsVideoEncoding: () => supportsVideoEncoding
});
var supportsVideo;
var supportsAudio;
var MAX_EDITABLE_VIDEO_SIZE = 104857600;
var supportsVideoEncoding = () => supportsVideo ?? (supportsVideo = (async () => {
	const configs = [highResCodec, defaultCodec];
	for (const config of configs) try {
		if (!(await VideoEncoder.isConfigSupported(config)).supported) return false;
	} catch {
		return false;
	}
	return true;
})());
var supportsAudioEncoding = () => supportsAudio ?? (supportsAudio = (async () => {
	const config = {
		codec: "opus",
		sampleRate: 48e3,
		numberOfChannels: 2,
		bitrate: 128e3
	};
	try {
		return !!(await AudioEncoder.isConfigSupported(config)).supported;
	} catch {
		return false;
	}
})());
//#endregion
//#region src/helpers/canvas/canvasToBlob.ts
function canvasToBlob(canvas, type, quality) {
	return new Promise((resolve, reject) => {
		canvas.toBlob((blob) => {
			if (blob) resolve(blob);
			else reject(/* @__PURE__ */ new Error("Failed to encode canvas"));
		}, type, quality);
	});
}
//#endregion
//#region src/helpers/canvas/scaleMediaElement.ts
async function scaleMediaElement(options) {
	const canvas = document.createElement("canvas");
	const size = options.size ?? options.mediaSize.aspectFitted(options.boxSize);
	const dpr = window.devicePixelRatio && 1;
	canvas.width = size.width * dpr;
	canvas.height = size.height * dpr;
	const ctx = canvas.getContext("2d");
	const { crop } = options;
	if (crop) ctx.drawImage(options.media, crop.x, crop.y, crop.width, crop.height, 0, 0, canvas.width, canvas.height);
	else if (IS_IMAGE_BITMAP_SUPPORTED) {
		const source = await createImageBitmap(options.media, {
			resizeWidth: size.width,
			resizeHeight: size.height
		});
		ctx.drawImage(source, 0, 0, canvas.width, canvas.height);
		source.close();
	} else ctx.drawImage(options.media, 0, 0, canvas.width, canvas.height);
	const mimeType = options.mimeType ?? "image/jpeg";
	const quality = options.quality ?? 1;
	if (options.toDataURL) return {
		url: canvas.toDataURL(mimeType, quality),
		size
	};
	return {
		blob: await canvasToBlob(canvas, mimeType, quality),
		size
	};
}
//#endregion
//#region src/helpers/createPoster.ts
var POSTER_MAX_SIZE = 720;
function createPosterFromMedia(media, mimeType, maxSize = POSTER_MAX_SIZE) {
	let width, height;
	if (media instanceof HTMLVideoElement) {
		width = media.videoWidth;
		height = media.videoHeight;
	} else {
		width = media.naturalWidth;
		height = media.naturalHeight;
	}
	return scaleMediaElement({
		media,
		mediaSize: makeMediaSize(width, height),
		boxSize: makeMediaSize(Math.min(width, maxSize), Math.min(height, maxSize)),
		mimeType,
		quality: .9
	});
}
function createPosterFromVideo(video) {
	return new Promise((resolve, reject) => {
		video.onseeked = () => {
			video.onseeked = () => {
				createPosterFromMedia(video).then(resolve);
				video.onseeked = void 0;
			};
			setCurrentTime(video, 0);
		};
		video.onerror = reject;
		setCurrentTime(video, Math.min(video.duration, 1));
	});
}
//#endregion
//#region src/components/swipeHandler.ts
var getEvent = (e) => {
	return "touches" in e ? e.touches[0] : e;
};
function getDistance(a, b) {
	if (!b) return 0;
	return Math.hypot(b.pageX - a.pageX, b.pageY - a.pageY);
}
function getTouchCenter(a, b) {
	return {
		x: (a.pageX + b.pageX) / 2,
		y: (a.pageY + b.pageY) / 2
	};
}
var RESET_GLOBAL = false;
hotListen(void 0, contextMenuController, "toggle", (visible) => {
	RESET_GLOBAL = visible;
});
var TOUCH_MOVE_OPTIONS = { passive: false };
var MOUSE_MOVE_OPTIONS = false;
var WHEEL_OPTIONS = {
	capture: true,
	passive: false
};
var SwipeHandler = class {
	constructor(options) {
		this.reset = (e) => {
			this.log("reset");
			if (IS_TOUCH_SUPPORTED) this.listenerSetter.removeManual(this.element.ownerDocument, "touchmove", this.handleMove, TOUCH_MOVE_OPTIONS);
			else {
				this.listenerSetter.removeManual(this.element.ownerDocument, "mousemove", this.handleMove, MOUSE_MOVE_OPTIONS);
				this.setCursorTo.style.cursor = "";
			}
			if (this.endListener) {
				this.listenerSetter.remove(this.endListener);
				this.endListener = void 0;
			}
			if (this.hadMove) this.onReset?.(e);
			this.releaseWheelDrag?.clearTimeout();
			this.releaseWheelZoom?.clearTimeout();
			this.resetValues();
		};
		this.handleStart = async (_e) => {
			this.log("start");
			if (this.isMouseDown) {
				const touches = _e.touches;
				if (touches?.length === 2) {
					this.initialDistance = getDistance(touches[0], touches[1]);
					this.initialTouchCenter = getTouchCenter(touches[0], touches[1]);
				}
				return;
			}
			const e = getEvent(_e);
			if (![0, 1].includes(Math.max(0, e.button ?? 0))) return;
			if (e.button === 1) cancelEvent(_e);
			if (isSwipingBackSafari(_e)) return;
			const tempId = ++this.tempId;
			if (this.endListener) this.listenerSetter.remove(this.endListener);
			this.endListener = this.listenerSetter.add(this.element.ownerDocument)(IS_TOUCH_SUPPORTED ? "touchend" : "mouseup", this.reset);
			const verifyResult = this.verifyTouchTarget?.(_e);
			if (verifyResult !== void 0) {
				let result;
				if (verifyResult instanceof Promise) {
					result = await verifyResult;
					if (this.tempId !== tempId) return;
				} else result = verifyResult;
				if (!result) return this.reset();
			}
			this.isMouseDown = true;
			if (this.withDelay && !IS_TOUCH_SUPPORTED) {
				const options = { once: true };
				const deferred = deferredPromise();
				const cb = () => deferred.resolve();
				const listener = this.listenerSetter.add(this.element.ownerDocument)("mousemove", cb, options);
				await Promise.race([pause(300), deferred]);
				deferred.resolve();
				this.listenerSetter.remove(listener);
				if (this.tempId !== tempId) return;
			}
			this.xDown = e.clientX;
			this.yDown = e.clientY;
			this.eventUp = e;
			if (IS_TOUCH_SUPPORTED) this.listenerSetter.add(this.element.ownerDocument)("touchmove", this.handleMove, TOUCH_MOVE_OPTIONS);
			else this.listenerSetter.add(this.element.ownerDocument)("mousemove", this.handleMove, MOUSE_MOVE_OPTIONS);
			if (this.onStart) {
				this.onStart();
				this.hadMove = true;
				this.handleMove(e);
			}
		};
		this.handleMove = (_e) => {
			if (this.xDown === void 0 || this.yDown === void 0 || RESET_GLOBAL) {
				this.reset();
				return;
			}
			if (this.cancelEvent) cancelEvent(_e);
			if (this.releaseWheelDrag?.isDebounced() || this.releaseWheelZoom?.isDebounced()) return;
			this.log("move");
			const e = this.eventUp = getEvent(_e);
			const xUp = e.clientX;
			const yUp = e.clientY;
			const xDiff = xUp - this.xDown + this.xAdded;
			const yDiff = yUp - this.yDown + this.yAdded;
			if (!this.hadMove) {
				if (!xDiff && !yDiff) return;
				this.setHadMove(_e);
			}
			const touches = _e.touches;
			if (this.onZoom && this.initialDistance > 0 && touches.length === 2) {
				const endDistance = getDistance(touches[0], touches[1]);
				const touchCenter = getTouchCenter(touches[0], touches[1]);
				const dragOffsetX = touchCenter.x - this.initialTouchCenter.x;
				const dragOffsetY = touchCenter.y - this.initialTouchCenter.y;
				const details = {
					zoomFactor: endDistance / this.initialDistance,
					initialCenterX: this.initialTouchCenter.x,
					initialCenterY: this.initialTouchCenter.y,
					dragOffsetX,
					dragOffsetY,
					currentCenterX: touchCenter.x,
					currentCenterY: touchCenter.y
				};
				this.onZoom(details);
			}
			this.dispatchOnSwipe(xDiff, yDiff, _e);
		};
		this.handleWheel = (e) => {
			if (!this.hadMove && this.verifyTouchTarget) {
				const result = this.verifyTouchTarget(e);
				if (result !== void 0 && !result) {
					this.reset(e);
					return;
				}
			}
			cancelEvent(e);
			this.log("wheel");
			if (this.onDoubleClick && Object.is(e.deltaX, -0) && Object.is(e.deltaY, -0) && e.ctrlKey) {
				this.onWheelCapture(e);
				this.onDoubleClick({
					centerX: e.pageX,
					centerY: e.pageY
				});
				this.reset();
				return;
			}
			if (e.metaKey || e.ctrlKey || e.shiftKey) {
				if (this.releaseWheelDrag?.isDebounced()) this.reset();
				this.onWheelZoom(e);
			} else this.handleWheelDrag(e);
		};
		this.handleWheelDrag = (e) => {
			this.log("wheel drag");
			this.onWheelCapture(e);
			if (!this.isDragCanceled.x || Math.sign(this.initialDragOffset.x) === Math.sign(e.deltaX)) this.initialDragOffset.x -= e.deltaX;
			if (!this.isDragCanceled.y || Math.sign(this.initialDragOffset.y) === Math.sign(e.deltaY)) this.initialDragOffset.y -= e.deltaY;
			const { x, y } = this.initialDragOffset;
			this.releaseWheelDrag(e);
			this.dispatchOnSwipe(x, y, e, (dx, dy) => {
				this.isDragCanceled = {
					x: dx,
					y: dy
				};
			});
		};
		this.onWheelCapture = (e) => {
			if (this.hadMove) return;
			this.log("wheel capture");
			this.handleStart(e);
			this.setHadMove(e);
			this.initialTouchCenter = {
				x: e.x,
				y: e.y
			};
		};
		this.onWheelZoom = (e) => {
			if (!this.onZoom) return;
			this.log("wheel zoom");
			this.onWheelCapture(e);
			const dragOffsetX = e.x - this.initialTouchCenter.x;
			const dragOffsetY = e.y - this.initialTouchCenter.y;
			const delta = clamp(e.deltaY, -25, 25);
			this.wheelZoom -= delta * .01;
			const details = {
				zoomAdd: this.wheelZoom - 1,
				initialCenterX: this.initialTouchCenter.x,
				initialCenterY: this.initialTouchCenter.y,
				dragOffsetX,
				dragOffsetY,
				currentCenterX: e.x,
				currentCenterY: e.y
			};
			this.onZoom(details);
			this.releaseWheelZoom(e);
		};
		safeAssign(this, options);
		this.log = logger("SWIPE-HANDLER");
		this.cursor ?? (this.cursor = "grabbing");
		this.cancelEvent ?? (this.cancelEvent = true);
		this.listenerOptions ?? (this.listenerOptions = TOUCH_MOVE_OPTIONS);
		this.setCursorTo ?? (this.setCursorTo = this.element);
		this.listenerSetter = new ListenerSetter();
		this.setListeners();
		this.resetValues();
		this.tempId = 0;
		options.middleware?.onDestroy(() => {
			this.reset();
			this.removeListeners();
		});
		this.releaseWheelDrag = debounce(this.reset, 150, false);
		this.releaseWheelZoom = debounce(this.reset, 150, false);
	}
	setListeners() {
		if (!IS_TOUCH_SUPPORTED) {
			this.listenerSetter.add(this.element)("mousedown", this.handleStart, this.listenerOptions);
			if (this.onZoom || this.onDoubleClick || this.wheelSwipe) this.listenerSetter.add(this.element)("wheel", this.handleWheel, WHEEL_OPTIONS);
		} else {
			if (this.withDelay) attachContextMenuListener({
				element: this.element,
				callback: (e) => {
					cancelEvent(e);
					this.handleStart(e);
				},
				listenerSetter: this.listenerSetter,
				listenerOptions: this.listenerOptions
			});
			else this.listenerSetter.add(this.element)("touchstart", this.handleStart, this.listenerOptions);
			if (this.onDoubleClick) this.listenerSetter.add(this.element)("dblclick", (e) => {
				this.onDoubleClick({
					centerX: e.pageX,
					centerY: e.pageY
				});
			});
		}
	}
	removeListeners() {
		this.log("remove listeners");
		this.reset();
		this.listenerSetter.removeAll();
	}
	setCursor(cursor = "") {
		this.cursor = cursor;
		if (!IS_TOUCH_SUPPORTED && this.hadMove) this.setCursorTo.style.setProperty("cursor", this.cursor, "important");
	}
	add(x, y) {
		this.xAdded = x;
		this.yAdded = y;
		this.handleMove({
			clientX: this.eventUp.clientX,
			clientY: this.eventUp.clientY,
			target: this.eventUp.target
		});
	}
	resetValues() {
		++this.tempId;
		this.hadMove = false;
		this.xAdded = this.yAdded = 0;
		this.xDown = this.yDown = this.eventUp = this.isMouseDown = void 0;
		if (this.onZoom || this.wheelSwipe) {
			this.initialDistance = 0;
			this.initialTouchCenter = {
				x: windowSize.width / 2,
				y: windowSize.height / 2
			};
			this.initialDragOffset = {
				x: 0,
				y: 0
			};
			this.isDragCanceled = {
				x: false,
				y: false
			};
			this.wheelZoom = 1;
		}
	}
	setHadMove(_e) {
		if (!this.hadMove) {
			this.log("had move");
			this.hadMove = true;
			this.setCursorTo.style.setProperty("cursor", this.cursor, "important");
			this.onFirstSwipe?.(_e);
		}
	}
	dispatchOnSwipe(...args) {
		const onSwipeResult = this.onSwipe(...args);
		if (onSwipeResult !== void 0 && onSwipeResult) this.reset();
	}
};
//#endregion
//#region src/helpers/dom/smoothScrollBehavior.ts
/** A native scroll glides only with full animations - below them it jumps */
function smoothScrollBehavior() {
	return liteMode.isAvailable("motion") ? "smooth" : "auto";
}
//#endregion
//#region src/components/lazyLoadQueueRepeat.ts
var LazyLoadQueueRepeat = class extends LazyLoadQueueIntersector {
	constructor(parallelLimit, onVisibilityChange, options) {
		super(parallelLimit);
		this.onVisibilityChange = onVisibilityChange;
		this.elementsMap = /* @__PURE__ */ new Map();
		this.intersector = new VisibilityIntersector((item) => {
			const { target, visible } = item;
			const queueItem = this.elementsMap.get(target);
			queueItem.visible = visible;
			if (visible) {
				queueItem.wasSeen = true;
				if (!this.queue.includes(queueItem)) this.queue.push(queueItem);
			} else indexOfAndSplice(this.queue, queueItem);
			this.onVisibilityChange?.(item);
			this.setProcessQueueTimeout();
		}, options);
	}
	clear() {
		super.clear();
		this.elementsMap.clear();
	}
	observe(el) {
		this.elementsMap.set(el.div, el);
		super.observe(el);
	}
	unobserve(el) {
		this.elementsMap.delete(el.div);
		super.unobserve(el);
	}
};
//#endregion
//#region src/components/emoticonsDropdown/tabs/SuperStickerRenderer.ts
var SuperStickerRenderer = class {
	constructor(options) {
		this.animated = /* @__PURE__ */ new Set();
		this.checkAnimationContainer = (element, visible) => {
			animationIntersector.getAnimations(element).forEach((player) => {
				if (!visible) animationIntersector.removeAnimation(player);
				else animationIntersector.checkAnimation(player, false);
			});
		};
		this.rendererByElement = /* @__PURE__ */ new WeakMap();
		this.processVisible = async (element) => {
			const docId = element.dataset.docId;
			const doc = await this.managers.appDocsManager.getDoc(docId);
			const size = mediaSizes.active.esgSticker.width;
			element.middlewareHelper ?? (element.middlewareHelper = getMiddleware());
			element.middlewareHelper.clean();
			const promise = wrapSticker({
				doc,
				div: element,
				width: size,
				height: size,
				lazyLoadQueue: null,
				group: this.group,
				onlyThumb: false,
				play: true,
				loop: true,
				withLock: this.withLock,
				middleware: element.middlewareHelper.get(),
				...this.visibleRenderOptions || {}
			}).then(({ render }) => render);
			promise.then(() => {
				this.checkAnimationContainer(element, this.lazyLoadQueue.intersector.isVisible(element));
			}, noop);
			if (this.playOnHover) promise.then((renderer) => {
				this.rendererByElement.set(element, renderer);
			});
			return promise;
		};
		this.processInvisible = async (element) => {
			const docId = element.dataset.docId;
			const doc = await this.managers.appDocsManager.getDoc(docId);
			if (this.lazyLoadQueue.intersector.isVisible(element)) return;
			this.checkAnimationContainer(element, false);
			element.middlewareHelper?.clean();
			this.renderSticker(doc, element);
		};
		options.withLock ?? (options.withLock = true);
		safeAssign(this, options);
		this.lazyLoadQueue = new LazyLoadQueueRepeat(void 0, ({ target, visible }) => {
			if (!visible) this.processInvisible(target);
		}, this.intersectionObserverInit);
	}
	clear() {
		this.lazyLoadQueue.clear();
		this.animated.forEach((element) => {
			element.middlewareHelper?.destroy();
		});
		this.animated.clear();
	}
	destroy() {
		this.clear();
	}
	renderSticker(doc, element, loadPromises, middleware) {
		var _element;
		if (!element) {
			element = document.createElement("div");
			element.classList.add("grid-item", "super-sticker");
			element.dataset.docId = "" + doc.id;
			element.dataset.emoji = doc.stickerEmojiRaw || "";
			if (doc.animated) this.observeAnimated(element);
		}
		(_element = element).middlewareHelper ?? (_element.middlewareHelper = middleware ? middleware.create() : getMiddleware());
		wrapSticker({
			doc,
			div: element,
			lazyLoadQueue: this.regularLazyLoadQueue,
			group: this.group,
			onlyThumb: doc.animated,
			loadPromises,
			middleware: element.middlewareHelper.get(),
			...doc.animated ? {} : this.visibleRenderOptions || {}
		});
		if (this.playOnHover) element.addEventListener("mouseenter", () => {
			const renderer = this.rendererByElement.get(element);
			if (renderer && "playOrRestart" in renderer) renderer.playOrRestart();
		});
		return element;
	}
	observeAnimated(element) {
		this.animated.add(element);
		this.lazyLoadQueue.observe({
			div: element,
			load: this.processVisible
		});
	}
	unobserveAnimated(element) {
		element.middlewareHelper?.destroy();
		this.animated.delete(element);
		this.lazyLoadQueue.delete({ div: element });
	}
	deleteSticker(element) {
		return this.unobserveAnimated(element);
	}
};
//#endregion
//#region src/components/mediaEditor/finalRender/createMp4VideoEncoder.ts
async function createMp4VideoEncoder({ width, height, frameRate, onError }) {
	const { BufferTarget, EncodedPacket, EncodedVideoPacketSource, Mp4OutputFormat, Output } = await __vitePreload(async () => {
		const { BufferTarget, EncodedPacket, EncodedVideoPacketSource, Mp4OutputFormat, Output } = await import("./src-Dma656V6.js");
		return {
			BufferTarget,
			EncodedPacket,
			EncodedVideoPacketSource,
			Mp4OutputFormat,
			Output
		};
	}, __vite__mapDeps([0,1,2]));
	const output = new Output({
		format: new Mp4OutputFormat({ fastStart: "in-memory" }),
		target: new BufferTarget()
	});
	const videoSource = new EncodedVideoPacketSource("avc");
	output.addVideoTrack(videoSource, { frameRate });
	await output.start();
	let addChain = Promise.resolve();
	const encoder = new VideoEncoder({
		output: (chunk, meta) => {
			addChain = addChain.then(() => videoSource.add(EncodedPacket.fromEncodedChunk(chunk), meta));
			addChain.catch(noop);
		},
		error: onError || ((e) => console.error(e))
	});
	encoder.configure({
		width,
		height,
		...calcCodecAndBitrate(width, height, 30)
	});
	return {
		encoder,
		finalize: async () => {
			await addChain;
			await output.finalize();
			return new Blob([output.target.buffer], { type: "video/mp4" });
		}
	};
}
//#endregion
//#region src/components/emoticonsDropdown/stickersSearch.ts
var SERVER_SEARCH_DELAY = 400;
/**
* Sticker search the way the official clients run it (tdesktop's StickersListWidget, iOS's SearchStickers):
* the user's own stickers for the emoji the query stands for come at once, the server's search follows
* once typing pauses, and its later pages as the results are scrolled toward their end. A sticker comes
* once, wherever it was found first — `shown` are those already on the screen. Its pages come after
* waits, so `managers` are the session's.
*/
function createStickersSearch(managers, query, shown = []) {
	const shownIds = new Set(shown.map((doc) => doc.id));
	const take = (stickers) => stickers.filter((doc) => !shownIds.has(doc.id) && !!shownIds.add(doc.id));
	let nextOffset = 0;
	let failed = false;
	let loading = false, destroyed = false;
	let observer, disarm;
	/**
	* The server's next stickers, without what came already: pages on until one brings a sticker not shown
	* yet (one of only those, or of WebM a browser cannot play, says nothing about the next) or there are no
	* more. Nothing while a page is on its way or once all came.
	*/
	const more = () => {
		if (loading || destroyed || nextOffset === void 0) return;
		loading = true;
		failed = false;
		return (nextOffset ? Promise.resolve() : pause(SERVER_SEARCH_DELAY)).then(async () => {
			let stickers = [];
			while (!stickers.length && !destroyed && nextOffset !== void 0) {
				const page = await managers.appStickersManager.searchStickersOnServer(query, nextOffset);
				nextOffset = page.nextOffset;
				stickers = take(page.stickers);
			}
			return stickers;
		}).catch(() => {
			failed = true;
			return [];
		}).finally(() => {
			loading = false;
		});
	};
	/**
	* Hands the server's pages to `onStickers` as they come: the first right away, each next one while
	* `sentinel`, placed after the results, is within a few screens of the end of `root`; `onEnd` once the
	* server has nothing more.
	*/
	const paginate = (sentinel, root, onStickers, onEnd) => {
		const rearm = () => {
			disarm?.();
			disarm = void 0;
			if (!destroyed) {
				observer.unobserve(sentinel);
				observer.observe(sentinel);
			}
		};
		const load = () => {
			more()?.then(async (stickers) => {
				if (destroyed) return;
				if (stickers.length) await onStickers(stickers);
				if (destroyed) return;
				if (nextOffset === void 0) {
					onEnd?.();
					return;
				}
				if (failed) {
					root.addEventListener("scroll", rearm, {
						once: true,
						passive: true,
						capture: true
					});
					disarm = () => root.removeEventListener("scroll", rearm, { capture: true });
				} else rearm();
			});
		};
		observer = new IntersectionObserver((entries) => {
			if (entries[entries.length - 1].isIntersecting) load();
		}, {
			root,
			rootMargin: `0px 0px 400% 0px`
		});
		if (nextOffset === 0) load();
		observer.observe(sentinel);
	};
	return {
		query,
		/** The user's own stickers for the query: they come first */
		local: () => managers.appStickersManager.searchStickers(query).then(take),
		/**
		* What to show first: the user's own stickers, or with none of those the server's first page —
		* whether anything is found at all is then the server's to say, unless its page did not come (`failed`)
		*/
		first: (own) => own.length ? Promise.resolve(own) : more() || Promise.resolve([]),
		more,
		/** The last page asked for did not come: nothing came is then no answer, `paginate` asks again */
		failed: () => failed,
		paginate,
		destroy: () => {
			destroyed = true;
			observer?.disconnect();
			disarm?.();
		}
	};
}
//#endregion
//#region src/hooks/useElementSize.ts
var NULL_KEY = {};
var map = /* @__PURE__ */ new WeakMap();
var createSizeRoot = (element) => createRoot((dispose) => {
	const [store, setStore] = createStore({
		width: 0,
		height: 0
	});
	createRenderEffect(() => {
		if (!element()) return;
		setStore(pickKeys(element().getBoundingClientRect(), ["width", "height"]));
		let callback, isQueued = false;
		const resizeObserver = new ResizeObserver(([entry]) => {
			const boxSize = entry.borderBoxSize[0];
			if (!boxSize) return;
			callback = () => setStore({
				width: boxSize.inlineSize,
				height: boxSize.blockSize
			});
			if (isQueued) return;
			isQueued = true;
			requestRAF(() => {
				callback?.();
				callback = void 0;
				isQueued = false;
			});
		});
		resizeObserver.observe(element());
		onCleanup(() => {
			resizeObserver.disconnect();
		});
	});
	return {
		count: 0,
		store,
		dispose
	};
});
function useElementSize(element) {
	const root = createMemo(() => {
		const key = element() || NULL_KEY;
		const root = map.get(key) || createSizeRoot(element);
		if (!map.has(key)) map.set(key, root);
		root.count++;
		onCleanup(() => {
			root.count--;
			if (!root.count) {
				root.dispose();
				map.delete(key);
			}
		});
		return root;
	});
	return {
		get width() {
			return root().store.width;
		},
		get height() {
			return root().store.height;
		}
	};
}
//#endregion
//#region src/helpers/shortcutListener.ts
var positionKeyRegexp = /^key[a-zA-Z]$/i;
var latinLetterRegexp = /^[a-z]$/i;
var nonLatinLetterRegexp = /^(?!\p{Script=Latin})\p{L}$/u;
function matchNonMetaKey(event, key) {
	if (positionKeyRegexp.test(key)) return event.code.toLowerCase() === key.toLowerCase();
	if (event.key.toLowerCase() === key.toLowerCase()) return true;
	return latinLetterRegexp.test(key) && nonLatinLetterRegexp.test(event.key) && !event.getModifierState("AltGraph") && !(IS_APPLE && event.altKey) && event.code.toLowerCase() === "key" + key.toLowerCase();
}
function matchComboKey(event, key) {
	return key === "ctrl" && event.ctrlKey || key === "shift" && event.shiftKey || key === "alt" && event.altKey || key === "meta" && event.metaKey || key === "anymeta" && (event.ctrlKey || event.shiftKey || event.altKey || event.metaKey) || matchNonMetaKey(event, key);
}
function addShortcutListener(combos, callback, preventByDefault = true) {
	const listener = (event) => {
		const pairs = combos.map((combo) => [combo, combo.toLowerCase().split("+")]).sort((a, b) => b[1].length - a[1].length);
		for (const [combo, keys] of pairs) if (keys.every((key) => matchComboKey(event, key))) {
			preventByDefault && event.preventDefault();
			callback(combo, event);
			break;
		}
	};
	return bindActiveWindowListener((w) => w.document, "keydown", listener);
}
//#endregion
//#region src/components/mediaEditor/openEditors.ts
var openEditors = /* @__PURE__ */ new Set();
function trackOpenMediaEditor(close) {
	openEditors.add(close);
	return () => openEditors.delete(close);
}
function closeAllMediaEditors() {
	[...openEditors].forEach((close) => close());
}
//#endregion
export { handleTabKeyDown as A, ButtonIconTsx as C, A11yButton as D, attachGrabListeners as E, useIsCleaned as M, loadDecodedImage as O, createElementFromMarkup as S, keepLeftToRight as T, supportsAudioEncoding as _, createStickersSearch as a, defaultCodec as b, smoothScrollBehavior as c, createPosterFromMedia as d, createPosterFromVideo as f, support_exports as g, MAX_EDITABLE_VIDEO_SIZE as h, useElementSize as i, showTooltip as j, attachTabList as k, SwipeHandler as l, canvasToBlob as m, trackOpenMediaEditor as n, createMp4VideoEncoder as o, scaleMediaElement as p, addShortcutListener as r, SuperStickerRenderer as s, closeAllMediaEditors as t, getEvent as u, supportsVideoEncoding as v, onRangeInlineArrowKey as w, highResCodec as x, calcCodecAndBitrate as y };
