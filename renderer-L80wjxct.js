//# allFunctionsCalledOnLoad
const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["prism-DEZT2ZRf.js","rolldown-runtime-CwcJO0Gh.js"])))=>i.map(i=>d[i]);
import { d as ctx, o as IS_FIREFOX } from "./userAgent-ByGXcznk.js";
import { t as findUpClassName } from "./findUpClassName-3V5me58N.js";
import { i as windowSize, o as customProperties } from "./themeController-2cytOOn0.js";
import { t as noop } from "./noop-H9NNBLfX.js";
import { t as Icon } from "./icon-DbP6Es97.js";
import { S as callbackify, W as copy } from "./objectUrlUtils-5x08MNuO.js";
import { at as IS_WEBM_SUPPORTED, t as apiManagerProxy } from "./apiManagerProxy-DmQXvxSF.js";
import { n as rootScope } from "./rootScope-CZS0lmz8.js";
import { a as i18n, d as setBlankToAnchor, h as capitalizeFirstLetter, p as setDirection, u as langPack_default } from "./langPack-BmdJGr44.js";
import { b as SITE_HASHTAGS, l as matchUrlHost, s as wrapUrl, w as normalizeUrlProtocol } from "./commonStateStorage-CW-poHCa.js";
import { C as createSignal, L as untrack, M as onCleanup, _ as createMemo, g as createEffect, j as on, x as createRoot } from "./solid-9Vxm0VIz.js";
import { n as deferredPromise } from "./cancellablePromise-bof--dnO.js";
import { t as __vitePreload } from "./preload-helper-B0NHKCoo.js";
import { t as tsNow } from "./tsNow-DUzGGNNb.js";
import { i as onAppWindowChange, n as getAppWindow, t as bindActiveWindowListener } from "./appWindow-bo-KtJhy.js";
import { n as bindManagersToSession } from "./bindManagersToAccount-BL82O9H9.js";
import { r as appState } from "./contentSettings-DMhHR-0w.js";
import { n as hotListen, t as hotEffect } from "./hotModule-aCRkP77w.js";
import { t as liteMode } from "./liteMode-DeLStZfQ.js";
import { n as mediaSizes } from "./mediaSizes-C1MTaleW.js";
import { i as useHeavyAnimationCheck_default, n as getHeavyAnimationPromise } from "./useHeavyAnimationCheck-sWeBPI3f.js";
import { n as unobserveResize, t as observeResize } from "./resizeObserver-DddVtfLC.js";
import { n as startRippleWave } from "./ripple-D7hcIc_t.js";
import { t as getMiddleware } from "./middleware-D6HuIqPm.js";
import { t as safePlay } from "./safePlay-CCrzDSPY.js";
import { n as animationIntersector } from "./animationIntersector-vAjH_7t1.js";
import { t as CLICK_EVENT_NAME } from "./clickEvent-COk4YpLP.js";
import { i as findAndSplice, n as encodeSpoiler, r as LazyLoadQueueBase, t as parseEntities } from "./parseEntities-C5qsCJ5K.js";
import { t as WeakRefSet } from "./weakRefSet-BoUw0io0.js";
import { a as wrapSticker, i as videosCache, w as DotRenderer } from "./sticker-5twBOy1Y.js";
import { a as compositorMessagePort, c as SHOULD_RENDER_OFFSCREEN, i as ensureCompositor, l as readValue, n as LottiePlayer, o as applyColorOnContext, r as getLottiePixelRatio, s as framesCache, t as lottieLoader } from "./lottieLoader-B3FXw0K7.js";
import { t as assumeType } from "./assumeType-CmXHXz9E.js";
import { t as StickerType } from "./stickerType-BNJr-Zar.js";
import { t as replaceContent } from "./replaceContent-Bi6ru3li.js";
import { i as isEmojiNative, n as getEmojiImageUrl } from "./emojiImage-DBZC34jk.js";
//#region src/lib/richTextProcessor/richTextButtons.ts
/**
* Layer 229's inline buttons, by the element wrapRichText drew for each. Drawing one is all the
* text does: what a button does depends on the page and the message showing it, so that page
* finds its buttons here and wires them.
*/
var buttons = /* @__PURE__ */ new WeakMap();
var RICH_TEXT_BUTTON_ATTRIBUTE = "data-rich-button";
var RICH_TEXT_BUTTON_SELECTOR = `[${RICH_TEXT_BUTTON_ATTRIBUTE}]`;
function setRichTextButton(element, button) {
	element.setAttribute(RICH_TEXT_BUTTON_ATTRIBUTE, "");
	buttons.set(element, button);
}
function getRichTextButton(element) {
	return buttons.get(element);
}
//#endregion
//#region src/helpers/dom/linkPress.ts
/**
* A text link held under the pointer gets a ripple that fills a rounded plate of its own colour on
* every line of it (`scss/mixins/_linkPlate.scss`, `scss/partials/_linkPress.scss`), and the plate
* stays, lightly, while a menu opened from the link is open; under the mouse the link is underlined.
* For every link in the text of the app: messages, captions, bios, Instant View, popups, the names in
* messages (PeerTitle `link`) — and for what acts as one without being an `<a>`
* (`TEXT_LINK_ATTRIBUTE`).
*
* Only an `<a>` that runs with the text takes it (`display: inline`): a link drawn as a row, a
* button or a chip keeps the press look it has (ripple, hover background).
*/
/** marks an element that is pressed as a link is without being one: "via @bot" starts a draft */
var TEXT_LINK_ATTRIBUTE = "data-text-link";
var LINK_SELECTOR = `a, [${TEXT_LINK_ATTRIBUTE}]`;
/** a link with its plate in it, which is placed against the link */
var PLATE_CLASS = "has-link-plate";
/** a link under the mouse: underlined, as links are on the web (`scss/partials/_linkPress.scss`) */
var HOVERED_CLASS = "is-link-hovered";
/** the plate lit: a menu opened from the link is open */
var LIT_CLASS = "is-lit";
/** the plate filled for a press no ripple can show (animations off) */
var PRESSED_CLASS = "is-pressed";
/** how long a lit plate takes to fade (`.link-plate:before`), after which it goes */
var FADE_OUT_DURATION = 150;
/**
* A finger that lands on a link to scroll must not light it up: a touch takes the ripple only once
* it has held still this long (Android's tap timeout), or when it is lifted as a tap.
*/
var TOUCH_DELAY = 100;
/** a finger that moves this far before then is passing over the link (Android's touch slop) */
var MOVE_SLOP = 8;
var press;
/**
* the text link under the mouse, the link (text or not) the pointer was last seen in, and whether it
* came into that one with a button down
*/
var hovered;
var hoverTarget;
var hoverDragged;
var plates = /* @__PURE__ */ new Map();
function getPressableLink(target) {
	const link = target.closest?.(LINK_SELECTOR);
	if (!link || link.isContentEditable || link.closest(`button, ${RICH_TEXT_BUTTON_SELECTOR}`) || isUnderHiddenSpoiler(link)) return;
	const inline = link.ownerDocument.defaultView.getComputedStyle(link).display === "inline";
	if (!inline && !link.classList.contains("peer-title") && !link.hasAttribute("data-text-link")) return;
	return {
		link,
		inline
	};
}
/**
* A spoiler over the link (or in it) still hides it: a message's spoilers are a particle overlay,
* shown until its canvas goes, others open in place (`.is-spoiler-visible`).
*/
function isUnderHiddenSpoiler(link) {
	if (!link.closest(".spoiler") && !link.querySelector(".spoiler")) return false;
	const container = link.closest(".spoilers-container");
	const overlay = container?.querySelector(".message-spoiler-overlay__canvas");
	if (overlay) return !overlay.classList.contains("message-spoiler-overlay__canvas--hidden") || !container.classList.contains("can-show-spoiler-text");
	return !link.closest(".is-spoiler-visible");
}
/**
* The link's plate, mounted unless it is there already. A link gets one only while something draws
* on it, rather than carrying one all the time as a button does its ripple: there are links in
* every message.
*/
function mountPlate(link, inline) {
	let plate = plates.get(link);
	if (!plate) {
		const container = link.ownerDocument.createElement("span");
		container.classList.add("c-ripple", "link-plate");
		plate = {
			link,
			inline,
			container,
			x: 0,
			y: 0,
			laidOut: false,
			holds: 0,
			pressed: false,
			waves: 0
		};
		plates.set(link, plate);
	}
	clearTimeout(plate.unmountTimeout);
	if (plate.container.parentElement !== link) {
		link.classList.add(PLATE_CLASS);
		link.prepend(plate.container);
		plate.laidOut = false;
	}
	return plate;
}
function unmountPlate(plate) {
	clearTimeout(plate.unmountTimeout);
	plates.delete(plate.link);
	plate.container.remove();
	plate.link.classList.remove(PLATE_CLASS);
}
/** draws what the plate is for now, and lets it go once it is for nothing */
function updatePlate(plate) {
	const { container } = plate;
	const wasLit = container.classList.contains(LIT_CLASS);
	container.classList.toggle(LIT_CLASS, plate.laidOut && plate.holds > 0);
	container.classList.toggle(PRESSED_CLASS, plate.laidOut && plate.pressed);
	clearTimeout(plate.unmountTimeout);
	if (plate.holds || plate.pressed || plate.waves) return;
	if (wasLit && liteMode.isAvailable("animations")) plate.unmountTimeout = window.setTimeout(() => unmountPlate(plate), FADE_OUT_DURATION);
	else unmountPlate(plate);
}
/** shapes the plate at once: for a press or a menu, once per action */
function layoutPlate(plate) {
	const shape = measurePlate(plate);
	applyPlate(plate, shape);
	return !!shape;
}
/**
* The plate's shape: a rounded plate a little larger than each line of the link, as far as what
* clips the link lets it show. Reads only.
*/
function measurePlate(plate) {
	const { link, inline, container } = plate;
	const lines = Array.from(link.getClientRects()).filter((rect) => rect.width && rect.height);
	if (!lines.length) return;
	const style = link.ownerDocument.defaultView.getComputedStyle(container);
	const bleedX = parseFloat(style.paddingLeft) || 0;
	const bleedY = inline ? parseFloat(style.paddingTop) || 0 : 0;
	const radius = parseFloat(style.borderTopLeftRadius) || 0;
	const clip = getClipRect(link);
	const rects = lines.map((rect) => {
		let left = rect.left - bleedX, right = rect.right + bleedX;
		let top = rect.top - bleedY, bottom = rect.bottom + bleedY;
		if (clip) {
			left = Math.max(left, clip.left);
			right = Math.min(right, clip.right);
			top = Math.max(top, clip.top);
			bottom = Math.min(bottom, clip.bottom);
		}
		return new DOMRect(left, top, right - left, bottom - top);
	}).filter((rect) => rect.width > 0 && rect.height > 0);
	if (!rects.length) return;
	const left = Math.min(...rects.map((rect) => rect.left));
	const top = Math.min(...rects.map((rect) => rect.top));
	const width = Math.max(...rects.map((rect) => rect.right)) - left;
	const height = Math.max(...rects.map((rect) => rect.bottom)) - top;
	const plates = rects.map((rect) => roundedRectPath(rect.left - left, rect.top - top, rect.width, rect.height, radius));
	const placed = container.getBoundingClientRect();
	return {
		x: plate.x + left - placed.left,
		y: plate.y + top - placed.top,
		width,
		height,
		clipPath: `path('${plates.join(" ")}')`
	};
}
/** writes only; a plate with no shape (nothing of the link shows) is cut away whole */
function applyPlate(plate, shape) {
	const { style } = plate.container;
	plate.laidOut = true;
	if (!shape) {
		style.clipPath = "inset(50%)";
		return;
	}
	plate.x = shape.x;
	plate.y = shape.y;
	style.left = shape.x + "px";
	style.top = shape.y + "px";
	style.width = shape.width + "px";
	style.height = shape.height + "px";
	style.clipPath = shape.clipPath;
}
/**
* What the nearest ancestor that clips its overflow lets show of the link: its padding box, grown by
* its `overflow-clip-margin` where the engine has one (WebKit has none).
*/
function getClipRect(link) {
	const view = link.ownerDocument.defaultView;
	for (let element = link.parentElement; element; element = element.parentElement) {
		const style = view.getComputedStyle(element);
		if (style.overflowX === "visible" && style.overflowY === "visible" || style.display === "inline" || style.display === "contents") continue;
		const rect = element.getBoundingClientRect();
		const margin = style.overflowX === "clip" ? parseFloat(style.overflowClipMargin) || 0 : 0;
		const left = rect.left + element.clientLeft - margin, top = rect.top + element.clientTop - margin;
		return new DOMRect(left, top, element.clientWidth + margin * 2, element.clientHeight + margin * 2);
	}
}
/** an SVG path of a rounded rectangle, for a clip path */
function roundedRectPath(x, y, width, height, radius) {
	const r = Math.min(radius, width / 2, height / 2);
	const right = x + width, bottom = y + height;
	return `M${x + r},${y}H${right - r}A${r},${r} 0 0 1 ${right},${y + r}V${bottom - r}A${r},${r} 0 0 1 ${right - r},${bottom}H${x + r}A${r},${r} 0 0 1 ${x},${bottom - r}V${y + r}A${r},${r} 0 0 1 ${x + r},${y}Z`;
}
/**
* The press's ripple, run in the link's plate. Without animations there is none: the plate is
* simply filled while the link is held.
*/
function show(current) {
	current.shown = true;
	current.link.removeEventListener("pointermove", onPointerMove);
	const plate = current.plate = mountPlate(current.link, current.inline);
	if (layoutPlate(plate)) {
		if (liteMode.isAvailable("animations")) {
			++plate.waves;
			current.releaseRipple = startRippleWave(plate.container, current.x, current.y, { onEnd: () => {
				--plate.waves;
				updatePlate(plate);
			} });
		} else plate.pressed = true;
	}
	updatePlate(plate);
}
/** `tap`: the press ended as a press does, so one that has not lit up yet ripples now */
function release(tap) {
	if (!press) return;
	const current = press;
	press = void 0;
	clearTimeout(current.timeout);
	current.link.removeEventListener("pointermove", onPointerMove);
	if (!current.shown && !tap) return;
	if (!current.shown) show(current);
	current.releaseRipple?.();
	current.plate.pressed = false;
	updatePlate(current.plate);
}
function onPointerDown(e) {
	release(false);
	if (!e.isPrimary || e.button !== 0) return;
	const pressable = getPressableLink(e.target);
	if (!pressable) return;
	const current = press = {
		...pressable,
		pointerId: e.pointerId,
		x: e.clientX,
		y: e.clientY,
		shown: false
	};
	if (e.pointerType === "touch") {
		current.timeout = window.setTimeout(() => show(current), TOUCH_DELAY);
		current.link.addEventListener("pointermove", onPointerMove);
	} else show(current);
}
/** a finger moving on before its ripple has shown: a swipe over the link, not a press */
function onPointerMove(e) {
	if (press?.pointerId === e.pointerId && Math.hypot(e.clientX - press.x, e.clientY - press.y) > MOVE_SLOP) release(false);
}
function onPointerEnd(e) {
	if (hoverDragged && e.type === "pointerup") {
		hoverDragged = false;
		setHovered(getPressableLink(hoverTarget)?.link);
	}
	if (press?.pointerId === e.pointerId) release(e.type === "pointerup");
}
/** underlines the text link under the mouse, and no other */
function setHovered(link) {
	hovered?.classList.remove(HOVERED_CLASS);
	hovered = link;
	link?.classList.add(HOVERED_CLASS);
}
/** a mouse or a pen over a text link underlines it (a finger hovers over nothing) */
function onPointerOver(e) {
	if (e.pointerType === "touch") return;
	const link = e.target.closest?.(LINK_SELECTOR);
	if (link === hoverTarget) return;
	hoverTarget = link;
	hoverDragged = !!link && !!e.buttons;
	setHovered(link && !e.buttons ? getPressableLink(link)?.link : void 0);
}
/** the pointer leaving the window, or into a frame */
function onPointerOut(e) {
	if (!e.relatedTarget) {
		hoverTarget = void 0;
		hoverDragged = false;
		setHovered(void 0);
	}
}
/** the first of the link's own nodes, past the plate a press or a menu may have put in it */
function getLinkFirstChild(link) {
	const first = link.firstChild;
	return first && first === plates.get(link)?.container ? first.nextSibling : first;
}
/**
* Keeps the plate of the link `target` is in lit while a menu opened from it stays open, so that the
* menu shows what it was opened on. Returns what lets it go, or nothing when `target` is in no link.
*/
function holdLinkPlate(target) {
	const pressable = getPressableLink(target);
	if (!pressable) return;
	const plate = mountPlate(pressable.link, pressable.inline);
	if (!plate.laidOut) layoutPlate(plate);
	++plate.holds;
	updatePlate(plate);
	let held = true;
	return () => {
		if (held) {
			held = false;
			--plate.holds;
			updatePlate(plate);
		}
	};
}
function listenForLinkPress() {
	const options = {
		capture: true,
		passive: true
	};
	bindActiveWindowListener((w) => w.document, "pointerdown", onPointerDown, options);
	bindActiveWindowListener((w) => w.document, "pointerup", onPointerEnd, options);
	bindActiveWindowListener((w) => w.document, "pointercancel", onPointerEnd, options);
	bindActiveWindowListener((w) => w.document, "pointerover", onPointerOver, options);
	bindActiveWindowListener((w) => w.document, "pointerout", onPointerOut, options);
	bindActiveWindowListener((w) => w.document, "dragstart", () => release(false), options);
	bindActiveWindowListener((w) => w.document, "contextmenu", () => release(false), options);
	onAppWindowChange(() => {
		release(false);
		hoverTarget = void 0;
		hoverDragged = false;
		setHovered(void 0);
	});
}
//#endregion
//#region src/components/visibilityIntersector.ts
var VisibilityIntersector = class {
	constructor(onVisibilityChange, options) {
		this.items = /* @__PURE__ */ new Map();
		this.locked = false;
		this.observer = new IntersectionObserver((entries) => {
			if (this.locked) return;
			const changed = [];
			entries.forEach((entry, index) => {
				const target = entry.target;
				if (this.items.get(target) === entry.isIntersecting) return;
				else this.items.set(target, entry.isIntersecting);
				const change = {
					target,
					visible: entry.isIntersecting,
					entry,
					index
				};
				changed.push(change);
			});
			changed.forEach((item) => {
				onVisibilityChange(item);
			});
		}, options);
	}
	getVisible() {
		const items = [];
		this.items.forEach((value, key) => {
			if (value) items.push(key);
		});
		return items;
	}
	clearVisible() {
		const visible = this.getVisible();
		for (const target of visible) this.items.set(target, false);
	}
	isVisible(target) {
		return !!this.items.get(target);
	}
	disconnect() {
		this.observer.disconnect();
		this.items.clear();
	}
	refresh() {
		this.observer.disconnect();
		const targets = [...this.items.keys()];
		for (const target of targets) this.observer.observe(target);
	}
	refreshVisible() {
		const visible = this.getVisible();
		for (const target of visible) this.observer.unobserve(target);
		for (const target of visible) this.observer.observe(target);
	}
	observe(target) {
		this.items.set(target, false);
		this.observer.observe(target);
	}
	unobserve(target) {
		this.observer.unobserve(target);
		this.items.delete(target);
	}
	unlock() {
		this.locked = false;
	}
	unlockAndRefresh() {
		this.unlock();
		this.refresh();
	}
	lock() {
		this.locked = true;
	}
};
//#endregion
//#region src/helpers/array/findAndSpliceAll.ts
function findAndSpliceAll(array, verify) {
	const out = [];
	let idx = -1;
	while ((idx = array.findIndex(verify)) !== -1) out.push(array.splice(idx, 1)[0]);
	return out;
}
//#endregion
//#region src/components/lazyLoadQueueIntersector.ts
var LazyLoadQueueIntersector = class extends LazyLoadQueueBase {
	constructor(parallelLimit) {
		super(parallelLimit);
		this.queue = [];
		this.inProcess = /* @__PURE__ */ new Set();
	}
	lock() {
		super.lock();
		this.intersector.lock();
	}
	unlock() {
		super.unlock();
		this.intersector.unlock();
	}
	unlockAndRefresh() {
		super.unlock();
		this.intersector.unlockAndRefresh();
	}
	clear() {
		super.clear();
		this.intersector.disconnect();
	}
	refresh() {
		this.intersector.refresh();
	}
	loadItem(item) {
		return item.load(item.div);
	}
	discardItem(item) {
		this.unobserve(item);
	}
	addElement(method, el) {
		if (this.queue.find((i) => i.div === el.div && i.load === el.load)) return false;
		else for (const item of this.inProcess) if (item.div === el.div && item.load === el.load) return false;
		this.queue[method](el);
		return true;
	}
	setProcessQueueTimeout() {
		this.intersectorTimeout ?? (this.intersectorTimeout = window.setTimeout(() => {
			this.intersectorTimeout = void 0;
			this.processQueue();
		}, 0));
	}
	push(el) {
		return super.push(el);
	}
	unshift(el) {
		return super.unshift(el);
	}
	delete(el) {
		findAndSpliceAll(this.queue, (i) => i.div === el.div);
		this.unobserve(el);
	}
	observe(el) {
		this.intersector.observe(el.div);
	}
	unobserve(el) {
		this.intersector.unobserve(el.div);
	}
};
//#endregion
//#region src/components/lazyLoadQueue.ts
var heavyAnimationQueues = new WeakRefSet();
var subscribedToHeavyAnimation = false;
var subscribeToHeavyAnimation = () => {
	if (subscribedToHeavyAnimation) return;
	subscribedToHeavyAnimation = true;
	useHeavyAnimationCheck_default(() => heavyAnimationQueues.forEachLive((queue) => queue.lock()), () => heavyAnimationQueues.forEachLive((queue) => queue.unlockAndRefresh()));
};
var LazyLoadQueue = class extends LazyLoadQueueIntersector {
	constructor(parallelLimit, ignoreHeavyAnimation) {
		super(parallelLimit);
		this.onVisibilityChange = ({ target, visible }) => {
			findAndSpliceAll(this.queue, (i) => i.div === target).forEach((item) => {
				if (visible) item.wasSeen = true;
				item.visible = visible;
				const index = this.queue.findIndex((item) => !item.visible);
				this.queue.splice(Math.max(0, index), 0, item);
			});
			this.setProcessQueueTimeout();
		};
		this.intersector = new VisibilityIntersector(this.onVisibilityChange);
		if (!ignoreHeavyAnimation) {
			heavyAnimationQueues.track(this);
			subscribeToHeavyAnimation();
			if (!getHeavyAnimationPromise().isFulfilled) this.lock();
		}
	}
	getItem() {
		return findAndSplice(this.queue, (item) => item.wasSeen);
	}
	async processItem(item) {
		await super.processItem(item);
		this.intersector.unobserve(item.div);
	}
	addElement(method, el) {
		if (!super.addElement(method, el)) return false;
		this.observe(el);
		el.wasSeen ?? (el.wasSeen = false);
		return true;
	}
	setAllSeen() {
		this.queue.forEach((item) => {
			item.wasSeen = true;
		});
		this.setProcessQueueTimeout();
	}
};
//#endregion
//#region src/helpers/dom/getVisibleRect.ts
function getVisibleRect(element, overflowElement, lookForSticky, rect = element.getBoundingClientRect(), overflowRect = overflowElement.getBoundingClientRect(), ignoreBoundaries) {
	let { top: overflowTop, right: overflowRight, bottom: overflowBottom, left: overflowLeft } = overflowRect;
	if (lookForSticky) {
		const sticky = overflowElement.querySelector(".sticky");
		if (sticky) overflowTop = sticky.getBoundingClientRect().bottom;
	}
	if (rect.top >= overflowBottom || rect.bottom <= overflowTop || rect.right <= overflowLeft || rect.left >= overflowRight) return null;
	const overflow = {
		top: false,
		right: false,
		bottom: false,
		left: false,
		vertical: 0,
		horizontal: 0
	};
	const windowWidth = windowSize.width;
	const windowHeight = windowSize.height;
	return {
		rect: {
			top: rect.top < overflowTop && (ignoreBoundaries || overflowTop !== 0) ? (overflow.top = true, ++overflow.vertical, overflowTop) : rect.top,
			right: rect.right > overflowRight && (ignoreBoundaries || overflowRight !== windowWidth) ? (overflow.right = true, ++overflow.horizontal, overflowRight) : rect.right,
			bottom: rect.bottom > overflowBottom && (ignoreBoundaries || overflowBottom !== windowHeight) ? (overflow.bottom = true, ++overflow.vertical, overflowBottom) : rect.bottom,
			left: rect.left < overflowLeft && (ignoreBoundaries || overflowLeft !== 0) ? (overflow.left = true, ++overflow.horizontal, overflowLeft) : rect.left
		},
		overflow
	};
}
window.getVisibleRect = getVisibleRect;
//#endregion
//#region src/helpers/dom/getViewportSlice.ts
function getViewportSlice({ overflowElement, overflowRect, selector, extraSize, extraMinLength, elements }) {
	overflowRect ?? (overflowRect = overflowElement.getBoundingClientRect());
	elements ?? (elements = Array.from(overflowElement.querySelectorAll(selector)));
	if (extraSize) overflowRect = {
		top: overflowRect.top - extraSize,
		right: overflowRect.right + extraSize,
		bottom: overflowRect.bottom + extraSize,
		left: overflowRect.left - extraSize
	};
	const invisibleTop = [], visible = [], invisibleBottom = [];
	let foundVisible = false;
	for (const element of elements) {
		const rect = element.getBoundingClientRect();
		const visibleRect = getVisibleRect(element, overflowElement, false, rect, overflowRect);
		const isVisible = !!visibleRect;
		let array;
		if (isVisible) {
			foundVisible = true;
			array = visible;
		} else if (foundVisible) array = invisibleBottom;
		else array = invisibleTop;
		array.push({
			element,
			rect,
			visibleRect
		});
	}
	if (extraMinLength) {
		visible.unshift(...invisibleTop.splice(Math.max(0, invisibleTop.length - extraMinLength), extraMinLength));
		visible.push(...invisibleBottom.splice(0, extraMinLength));
	}
	return {
		invisibleTop,
		visible,
		invisibleBottom
	};
}
//#endregion
//#region src/helpers/buildURLHash.ts
function buildURLHash(str) {
	return "#" + encodeURIComponent(str);
}
//#endregion
//#region src/helpers/string/encodeEntities.ts
function encodeEntities(value) {
	return value.replace(/&/g, "&amp;").replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, (value) => {
		const hi = value.charCodeAt(0);
		const low = value.charCodeAt(1);
		return "&#" + ((hi - 55296) * 1024 + (low - 56320) + 65536) + ";";
	}).replace(/([^\#-~| |!])/g, (value) => {
		return "&#" + value.charCodeAt(0) + ";";
	}).replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
//#endregion
//#region src/helpers/electronHelpers.ts
/**
* The Electron wrapper injects `electronHelpers` as a page global so links can be handed to the
* system browser instead of navigating the app window.
*
* A bare `typeof electronHelpers !== 'undefined'` must never be used to detect it: every element
* carrying an `id` is exposed on `window` under that id, so rendered message content can forge the
* binding (a LaTeX `\label{electronHelpers}` becomes `<mtr id="electronHelpers">`). Requiring a
* callable `openExternal` rules that out — DOM clobbering only ever yields elements and
* collections, never a function.
*/
function getElectronHelpers() {
	const helpers = typeof electronHelpers === "undefined" ? void 0 : electronHelpers;
	return typeof helpers?.openExternal === "function" ? helpers : void 0;
}
var EXTERNAL_ANCHOR_ATTRIBUTE = "data-open-external";
var listening = false;
function listenForExternalAnchors() {
	if (listening) return;
	listening = true;
	document.addEventListener("click", (e) => {
		if (e.defaultPrevented) return;
		const helpers = getElectronHelpers();
		if (!helpers) return;
		const anchor = e.target?.closest?.("a[data-open-external]");
		if (!anchor?.href) return;
		e.preventDefault();
		helpers.openExternal(anchor.href);
	});
}
/**
* Mark an anchor as belonging to the system browser. The URL stays in `href` as data and is read
* back at click time — it is never interpolated into executable markup, so a URL containing quotes
* cannot escape into script.
*/
function setExternalToAnchor(anchor) {
	anchor.setAttribute(EXTERNAL_ANCHOR_ATTRIBUTE, "");
	listenForExternalAnchors();
	return anchor;
}
var BOM_REG_EXP = /* @__PURE__ */ new RegExp("﻿", "g");
//#endregion
//#region src/lib/richTextProcessor/wrapTelegramUrlToAnchor.ts
function wrapTelegramUrlToAnchor(url1) {
	const { url, onclick } = wrapUrl(url1);
	const element = document.createElement("a");
	element.href = url;
	if (onclick) element.setAttribute("onclick", `${onclick}(this)`);
	return element;
}
//#endregion
//#region src/helpers/dom/codeBlockClick.ts
function createCodeHeaderButton(icon, className) {
	const button = document.createElement("button");
	button.type = "button";
	button.contentEditable = "false";
	button.classList.add("code-header-button", "hover-primary-effect", className);
	const iconElement = Icon(icon);
	iconElement.setAttribute("aria-hidden", "true");
	button.append(iconElement);
	return button;
}
function getCodeBlockClickTarget(target) {
	const container = findUpClassName(target, "code-header") && findUpClassName(target, "code");
	const code = container?.querySelector(".code-code") || findUpClassName(target, "monospace-text");
	if (!code) return null;
	return {
		code,
		container: container || null,
		isWrapToggle: !!findUpClassName(target, "code-header-toggle-wrap")
	};
}
function toggleCodeBlockWrap({ code, container }) {
	if (!container) return;
	const present = container.classList.toggle("is-scrollable");
	code.classList.toggle("no-scrollbar", present);
}
//#endregion
//#region src/codeLanguageDetector.ts
var CODE_LANGUAGE_DETECTION_CACHE_LIMIT = 64;
var CODE_LANGUAGE_DETECTION_SAMPLE_LIMIT = 16384;
var CODE_LANGUAGE_DETECTION_TIMEOUT = 5e3;
var cache = /* @__PURE__ */ new Map();
var pending = /* @__PURE__ */ new Map();
var worker;
var workerFailed = false;
var requestId = 0;
function settleDetection(id, language) {
	const detection = pending.get(id);
	if (!detection) return;
	pending.delete(id);
	clearTimeout(detection.timeout);
	detection.promise.resolve(language);
}
function settlePending(language) {
	[...pending.keys()].forEach((id) => settleDetection(id, language));
}
function getWorker() {
	if (worker || workerFailed || typeof Worker === "undefined") return worker;
	worker = new Worker(new URL(
		/* @vite-ignore */
		"/Monolith/codeLanguageDetector.worker-H2F07oEl.js",
		"" + import.meta.url
	), { type: "module" });
	worker.addEventListener("message", (event) => {
		const { id, language } = event.data;
		settleDetection(id, language);
	});
	worker.addEventListener("error", (error) => {
		console.error("Code language detector worker failed", error.message, error.filename, error.lineno, error);
		workerFailed = true;
		worker?.terminate();
		worker = void 0;
		settlePending();
	});
	return worker;
}
function detect(code) {
	const detectorWorker = getWorker();
	if (!detectorWorker) return Promise.resolve(void 0);
	const id = ++requestId;
	const promise = deferredPromise();
	const timeout = ctx.setTimeout(() => {
		if (cache.get(code) === promise) cache.delete(code);
		settleDetection(id);
	}, CODE_LANGUAGE_DETECTION_TIMEOUT);
	const request = {
		id,
		code
	};
	pending.set(id, {
		promise,
		timeout
	});
	detectorWorker.postMessage(request);
	return promise;
}
function detectCodeLanguage$1(code) {
	const sample = code.slice(0, CODE_LANGUAGE_DETECTION_SAMPLE_LIMIT).trim();
	if (!sample) return Promise.resolve(void 0);
	let result = cache.get(sample);
	if (result) {
		cache.delete(sample);
		cache.set(sample, result);
		return result;
	}
	result = detect(sample);
	cache.set(sample, result);
	if (cache.size > CODE_LANGUAGE_DETECTION_CACHE_LIMIT) cache.delete(cache.keys().next().value);
	return result;
}
//#endregion
//#region src/codeLanguages.ts
var CodeLanguageMap = {
	"Markup": [
		"markup",
		"html",
		"xml",
		"svg",
		"mathml",
		"ssml",
		"atom",
		"rss"
	],
	"CSS": ["css"],
	"C-like": ["clike"],
	"Regex": ["regex"],
	"JavaScript": ["javascript", "js"],
	"ABAP": ["abap"],
	"ABNF": ["abnf"],
	"ActionScript": ["actionscript"],
	"Ada": ["ada"],
	"Agda": ["agda"],
	"AL": ["al"],
	"ANTLR4": ["antlr4", "g4"],
	"Apache Configuration": ["apacheconf"],
	"SQL": ["sql"],
	"Apex": ["apex"],
	"APL": ["apl"],
	"AppleScript": ["applescript"],
	"AQL": ["aql"],
	"C": ["c"],
	"C++": ["cpp"],
	"Arduino": ["arduino", "ino"],
	"ARFF": ["arff"],
	"ARM Assembly": ["armasm", "arm-asm"],
	"Bash": [
		"bash",
		"sh",
		"shell"
	],
	"YAML": ["yaml", "yml"],
	"Markdown": ["markdown", "md"],
	"Arturo": ["arturo", "art"],
	"AsciiDoc": ["asciidoc", "adoc"],
	"C#": [
		"csharp",
		"cs",
		"dotnet"
	],
	"ASP.NET (C#)": ["aspnet"],
	"6502 Assembly": ["asm6502"],
	"Atmel AVR Assembly": ["asmatmel"],
	"AutoHotkey": ["autohotkey"],
	"AutoIt": ["autoit"],
	"AviSynth": ["avisynth", "avs"],
	"Avro IDL": ["avro-idl", "avdl"],
	"AWK": ["awk", "gawk"],
	"BASIC": ["basic"],
	"Batch": ["batch"],
	"BBcode": ["bbcode", "shortcode"],
	"BBj": ["bbj"],
	"Bicep": ["bicep"],
	"Birb": ["birb"],
	"Bison": ["bison"],
	"BNF": ["bnf", "rbnf"],
	"BQN": ["bqn"],
	"Brainfuck": ["brainfuck"],
	"BrightScript": ["brightscript"],
	"Bro": ["bro"],
	"CFScript": ["cfscript", "cfc"],
	"ChaiScript": ["chaiscript"],
	"CIL": ["cil"],
	"Cilk/C": ["cilkc", "cilk-c"],
	"Cilk/C++": [
		"cilkcpp",
		"cilk-cpp",
		"cilk"
	],
	"Clojure": ["clojure"],
	"CMake": ["cmake"],
	"COBOL": ["cobol"],
	"CoffeeScript": ["coffeescript", "coffee"],
	"Concurnas": ["concurnas", "conc"],
	"Content-Security-Policy": ["csp"],
	"Cooklang": ["cooklang"],
	"Ruby": ["ruby", "rb"],
	"Crystal": ["crystal"],
	"CSV": ["csv"],
	"CUE": ["cue"],
	"Cypher": ["cypher"],
	"D": ["d"],
	"Dart": ["dart"],
	"DataWeave": ["dataweave"],
	"DAX": ["dax"],
	"Dhall": ["dhall"],
	"Diff": ["diff"],
	"Markup templating": ["markup-templating"],
	"Django/Jinja2": ["django", "jinja2"],
	"DNS zone file": ["dns-zone-file", "dns-zone"],
	"Docker": ["docker", "dockerfile"],
	"DOT (Graphviz)": ["dot", "gv"],
	"EBNF": ["ebnf"],
	"EditorConfig": ["editorconfig"],
	"Eiffel": ["eiffel"],
	"EJS": ["ejs", "eta"],
	"Elixir": ["elixir"],
	"Elm": ["elm"],
	"Lua": ["lua"],
	"Embedded Lua templating": ["etlua"],
	"ERB": ["erb"],
	"Erlang": ["erlang"],
	"Excel Formula": [
		"excel-formula",
		"xlsx",
		"xls"
	],
	"F#": ["fsharp"],
	"Factor": ["factor"],
	"False": ["false"],
	"Firestore security rules": ["firestore-security-rules"],
	"Flow": ["flow"],
	"Fortran": ["fortran"],
	"FreeMarker Template Language": ["ftl"],
	"GameMaker Language": ["gml", "gamemakerlanguage"],
	"GAP (CAS)": ["gap"],
	"G-code": ["gcode"],
	"GDScript": ["gdscript"],
	"GEDCOM": ["gedcom"],
	"gettext": ["gettext", "po"],
	"Git": ["git"],
	"GLSL": ["glsl"],
	"GN": ["gn", "gni"],
	"GNU Linker Script": ["linker-script", "ld"],
	"Go": ["go"],
	"Go module": ["go-module", "go-mod"],
	"Gradle": ["gradle"],
	"GraphQL": ["graphql"],
	"Groovy": ["groovy"],
	"Less": ["less"],
	"Sass (SCSS)": ["scss"],
	"Textile": ["textile"],
	"Haml": ["haml"],
	"Handlebars": [
		"handlebars",
		"hbs",
		"mustache"
	],
	"Haskell": ["haskell", "hs"],
	"Haxe": ["haxe"],
	"HCL": ["hcl"],
	"HLSL": ["hlsl"],
	"Hoon": ["hoon"],
	"HTTP Public-Key-Pins": ["hpkp"],
	"HTTP Strict-Transport-Security": ["hsts"],
	"JSON": ["json", "webmanifest"],
	"URI": ["uri", "url"],
	"HTTP": ["http"],
	"IchigoJam": ["ichigojam"],
	"Icon": ["icon"],
	"ICU Message Format": ["icu-message-format"],
	"Idris": ["idris", "idr"],
	".ignore": [
		"ignore",
		"gitignore",
		"hgignore",
		"npmignore"
	],
	"Inform 7": ["inform7"],
	"Ini": ["ini"],
	"Io": ["io"],
	"J": ["j"],
	"Java": ["java"],
	"Scala": ["scala"],
	"PHP": ["php"],
	"JavaDoc-like": ["javadoclike"],
	"JavaDoc": ["javadoc"],
	"Java stack trace": ["javastacktrace"],
	"Jolie": ["jolie"],
	"JQ": ["jq"],
	"TypeScript": ["typescript", "ts"],
	"JSDoc": ["jsdoc"],
	"N4JS": ["n4js", "n4jsd"],
	"JSON5": ["json5"],
	"JSONP": ["jsonp"],
	"JS stack trace": ["jsstacktrace"],
	"Julia": ["julia"],
	"Keepalived Configure": ["keepalived"],
	"Keyman": ["keyman"],
	"Kotlin": [
		"kotlin",
		"kt",
		"kts"
	],
	"Kusto": ["kusto"],
	"LaTeX": [
		"latex",
		"tex",
		"context"
	],
	"Latte": ["latte"],
	"Scheme": ["scheme"],
	"LilyPond": ["lilypond", "ly"],
	"Liquid": ["liquid"],
	"Lisp": [
		"lisp",
		"emacs",
		"elisp",
		"emacs-lisp"
	],
	"LiveScript": ["livescript"],
	"LLVM IR": ["llvm"],
	"Log file": ["log"],
	"LOLCODE": ["lolcode"],
	"Magma (CAS)": ["magma"],
	"Makefile": ["makefile"],
	"Mata": ["mata"],
	"MATLAB": ["matlab"],
	"MAXScript": ["maxscript"],
	"MEL": ["mel"],
	"Mermaid": ["mermaid"],
	"METAFONT": ["metafont"],
	"Mizar": ["mizar"],
	"MongoDB": ["mongodb"],
	"Monkey": ["monkey"],
	"MoonScript": ["moonscript", "moon"],
	"N1QL": ["n1ql"],
	"Nand To Tetris HDL": ["nand2tetris-hdl"],
	"Naninovel Script": ["naniscript", "nani"],
	"NASM": ["nasm"],
	"NEON": ["neon"],
	"Nevod": ["nevod"],
	"nginx": ["nginx"],
	"Nim": ["nim"],
	"Nix": ["nix"],
	"NSIS": ["nsis"],
	"Objective-C": ["objectivec", "objc"],
	"OCaml": ["ocaml"],
	"Odin": ["odin"],
	"OpenCL": ["opencl"],
	"OpenQasm": ["openqasm", "qasm"],
	"Oz": ["oz"],
	"PARI/GP": ["parigp"],
	"Parser": ["parser"],
	"Pascal": ["pascal", "objectpascal"],
	"Pascaligo": ["pascaligo"],
	"PATROL Scripting Language": ["psl"],
	"PC-Axis": ["pcaxis", "px"],
	"PeopleCode": ["peoplecode", "pcode"],
	"Perl": ["perl"],
	"PHPDoc": ["phpdoc"],
	"PlantUML": ["plant-uml", "plantuml"],
	"PL/SQL": ["plsql"],
	"PowerQuery": [
		"powerquery",
		"pq",
		"mscript"
	],
	"PowerShell": ["powershell"],
	"Processing": ["processing"],
	"Prolog": ["prolog"],
	"PromQL": ["promql"],
	".properties": ["properties"],
	"Protocol Buffers": ["protobuf"],
	"Stylus": ["stylus"],
	"Twig": ["twig"],
	"Pug": ["pug"],
	"Puppet": ["puppet"],
	"PureBasic": ["purebasic", "pbfasm"],
	"Python": ["python", "py"],
	"Q#": ["qsharp", "qs"],
	"Q (kdb+ database)": ["q"],
	"QML": ["qml"],
	"Qore": ["qore"],
	"R": ["r"],
	"Racket": ["racket", "rkt"],
	"Razor C#": ["cshtml", "razor"],
	"React JSX": ["jsx"],
	"React TSX": ["tsx"],
	"Reason": ["reason"],
	"Rego": ["rego"],
	"Ren'py": ["renpy", "rpy"],
	"ReScript": ["rescript", "res"],
	"reST (reStructuredText)": ["rest"],
	"Rip": ["rip"],
	"Roboconf": ["roboconf"],
	"Robot Framework": ["robotframework", "robot"],
	"Rust": ["rust"],
	"SAS": ["sas"],
	"Sass (Sass)": ["sass"],
	"Shell session": [
		"shell-session",
		"sh-session",
		"shellsession"
	],
	"Smali": ["smali"],
	"Smalltalk": ["smalltalk"],
	"Smarty": ["smarty"],
	"SML": ["sml", "smlnj"],
	"Solidity (Ethereum)": ["solidity", "sol"],
	"Solution file": ["solution-file", "sln"],
	"Soy (Closure Template)": ["soy"],
	"Splunk SPL": ["splunk-spl"],
	"SQF: Status Quo Function (Arma 3)": ["sqf"],
	"Squirrel": ["squirrel"],
	"Stan": ["stan"],
	"Stata Ado": ["stata"],
	"Structured Text (IEC 61131-3)": ["iecst"],
	"SuperCollider": ["supercollider", "sclang"],
	"Swift": ["swift"],
	"Systemd configuration file": ["systemd"],
	"T4 templating": ["t4-templating"],
	"T4 Text Templates (C#)": ["t4-cs", "t4"],
	"VB.Net": ["vbnet"],
	"T4 Text Templates (VB)": ["t4-vb"],
	"TAP": ["tap"],
	"Tcl": ["tcl"],
	"Template Toolkit 2": ["tt2"],
	"TOML": ["toml"],
	"Tremor": [
		"tremor",
		"trickle",
		"troy"
	],
	"TypoScript": ["typoscript", "tsconfig"],
	"UnrealScript": [
		"unrealscript",
		"uscript",
		"uc"
	],
	"UO Razor Script": ["uorazor"],
	"V": ["v"],
	"Vala": ["vala"],
	"Velocity": ["velocity"],
	"Verilog": ["verilog"],
	"VHDL": ["vhdl"],
	"vim": ["vim"],
	"Visual Basic": [
		"visual-basic",
		"vb",
		"vba"
	],
	"WarpScript": ["warpscript"],
	"WebAssembly": ["wasm"],
	"Web IDL": ["web-idl", "webidl"],
	"WGSL": ["wgsl"],
	"Wiki markup": ["wiki"],
	"Wolfram language": [
		"wolfram",
		"mathematica",
		"nb",
		"wl"
	],
	"Wren": ["wren"],
	"Xeora": ["xeora", "xeoracube"],
	"Xojo (REALbasic)": ["xojo"],
	"XQuery": ["xquery"],
	"YANG": ["yang"],
	"Zig": ["zig"]
};
var CodeLanguageAliases = {};
for (const language in CodeLanguageMap) {
	const aliases = CodeLanguageMap[language];
	aliases.unshift(language.toLowerCase());
	for (let i = 0, l = aliases.length; i < l; ++i) CodeLanguageAliases[aliases[i]] = language;
}
function importPrismLanguage(language) {
	const lowerCase = language.toLowerCase();
	const aliases = CodeLanguageMap[CodeLanguageAliases[lowerCase]] || [];
	for (const alias of aliases) if (prism.languages[alias]) return {
		language: alias,
		prism
	};
	console.error("No prism language " + lowerCase);
}
var prism;
function importPrism(language) {
	if (prism) return callbackify(prism, () => importPrismLanguage(language));
	const hadBefore = !!window.Prism;
	if (!hadBefore) {
		window.Prism = window.Prism || {};
		window.Prism.manual = true;
	}
	return prism = __vitePreload(() => import("./prism-DEZT2ZRf.js").then((module) => {
		const Prism = module.default;
		if (!hadBefore) Prism.hooks.add("wrap", (env) => {
			env.classes.forEach((className, i, arr) => {
				arr[i] = "prism-" + className;
			});
		});
		prism = Prism;
		return importPrismLanguage(language);
	}), __vite__mapDeps([0,1]));
}
function highlightCode(code, _language) {
	return callbackify(importPrism(_language), (imported) => {
		if (!imported) {
			console.error(`Language "${_language}" is not supported`, code);
			return;
		}
		const { prism, language } = imported;
		return prism.highlight(code, prism.languages[language], language);
	});
}
function detectCodeLanguage(code) {
	return detectCodeLanguage$1(code).then((detectedLanguage) => detectedLanguage && CodeLanguageAliases[detectedLanguage.toLowerCase()]);
}
function highlightCodeAuto(code) {
	return detectCodeLanguage(code).then((detectedLanguage) => {
		if (!detectedLanguage) return;
		return callbackify(highlightCode(code, detectedLanguage), (html) => {
			if (!html) return;
			return {
				html,
				language: detectedLanguage
			};
		});
	});
}
//#endregion
//#region src/helpers/array/findIndexFrom.ts
function findIndexFrom(arr, predicate, i = 0) {
	for (const length = arr.length; i < length; ++i) if (predicate(arr[i], i, arr)) return i;
	return -1;
}
//#endregion
//#region src/vendor/convertPunycode.js
var utf16 = {
	decode: (input) => {
		const output = [];
		let i = 0;
		const len = input.length;
		let value;
		let extra;
		while (i < len) {
			value = input.charCodeAt(i++);
			if ((value & 63488) === 55296) {
				extra = input.charCodeAt(i++);
				if ((value & 64512) !== 55296 || (extra & 64512) !== 56320) throw new RangeError("UTF-16(decode): Illegal UTF-16 sequence");
				value = ((value & 1023) << 10) + (extra & 1023) + 65536;
			}
			output.push(value);
		}
		return output;
	},
	encode: (input) => {
		const output = [];
		let i = 0;
		const len = input.length;
		let value;
		while (i < len) {
			value = input[i++];
			if ((value & 63488) === 55296) throw new RangeError("UTF-16(encode): Illegal UTF-16 value");
			if (value > 65535) {
				value -= 65536;
				output.push(String.fromCharCode(value >>> 10 & 1023 | 55296));
				value = 56320 | value & 1023;
			}
			output.push(String.fromCharCode(value));
		}
		return output.join("");
	}
};
var initial_n = 128;
var initial_bias = 72;
var delimiter = "-";
var base = 36;
var damp = 700;
var tmin = 1;
var tmax = 26;
var skew = 38;
var maxint = 2147483647;
function decode_digit(cp) {
	return cp - 48 < 10 ? cp - 22 : cp - 65 < 26 ? cp - 65 : cp - 97 < 26 ? cp - 97 : base;
}
function adapt(delta, numpoints, firsttime) {
	let k;
	delta = firsttime ? Math.floor(delta / damp) : delta >> 1;
	delta += Math.floor(delta / numpoints);
	for (k = 0; delta > 455; k += base) delta = Math.floor(delta / 35);
	return Math.floor(k + 36 * delta / (delta + skew));
}
function decode(input, preserveCase) {
	const output = [];
	const case_flags = [];
	const input_length = input.length;
	let n;
	let out;
	let i;
	let bias;
	let basic;
	let j;
	let ic;
	let oldi;
	let w;
	let k;
	let digit;
	let t;
	let len;
	n = initial_n;
	i = 0;
	bias = initial_bias;
	basic = input.lastIndexOf(delimiter);
	if (basic < 0) basic = 0;
	for (j = 0; j < basic; ++j) {
		if (preserveCase) case_flags[output.length] = input.charCodeAt(j) - 65 < 26;
		if (input.charCodeAt(j) >= 128) throw new RangeError("Illegal input >= 0x80");
		output.push(input.charCodeAt(j));
	}
	for (ic = basic > 0 ? basic + 1 : 0; ic < input_length;) {
		for (oldi = i, w = 1, k = base;; k += base) {
			if (ic >= input_length) throw RangeError("punycode_bad_input(1)");
			digit = decode_digit(input.charCodeAt(ic++));
			if (digit >= base) throw RangeError("punycode_bad_input(2)");
			if (digit > Math.floor((maxint - i) / w)) throw RangeError("punycode_overflow(1)");
			i += digit * w;
			t = k <= bias ? tmin : k >= bias + tmax ? tmax : k - bias;
			if (digit < t) break;
			if (w > Math.floor(maxint / (base - t))) throw RangeError("punycode_overflow(2)");
			w *= base - t;
		}
		out = output.length + 1;
		bias = adapt(i - oldi, out, oldi === 0);
		if (Math.floor(i / out) > maxint - n) throw RangeError("punycode_overflow(3)");
		n += Math.floor(i / out);
		i %= out;
		if (preserveCase) case_flags.splice(i, 0, input.charCodeAt(ic - 1) - 65 < 26);
		output.splice(i, 0, n);
		i++;
	}
	if (preserveCase) {
		for (i = 0, len = output.length; i < len; i++) if (case_flags[i]) output[i] = String.fromCharCode(output[i]).toUpperCase().charCodeAt(0);
	}
	return utf16.encode(output);
}
function toUnicode(domain) {
	const domain_array = domain.split(".");
	const out = [];
	for (let i = 0; i < domain_array.length; ++i) {
		const s = domain_array[i];
		out.push(s.match(/^xn--/) ? decode(s.slice(4)) : s);
	}
	return out.join(".");
}
//#endregion
//#region src/helpers/string/letterRegExp.ts
/** A letter of any script */
var LETTER_REG_EXP = /\p{L}/u;
//#endregion
//#region src/helpers/string/isSuspiciousUrl.ts
var SCRIPT_REG_EXPS = [
	"Latin",
	"Cyrillic",
	"Greek",
	"Armenian",
	"Hebrew",
	"Arabic",
	"Thaana",
	"Devanagari",
	"Bengali",
	"Gurmukhi",
	"Gujarati",
	"Oriya",
	"Tamil",
	"Telugu",
	"Kannada",
	"Malayalam",
	"Sinhala",
	"Thai",
	"Lao",
	"Tibetan",
	"Myanmar",
	"Georgian",
	"Ethiopic",
	"Khmer",
	"Han",
	"Hiragana",
	"Katakana",
	"Hangul",
	"Bopomofo"
].map((script) => [script, new RegExp(`\\p{Script=${script}}`, "u")]);
var SCRIPTLESS_REG_EXP = /[\p{Script=Common}\p{Script=Inherited}]/u;
var ALLOWED_SCRIPT_SETS = [
	[
		"Han",
		"Hiragana",
		"Katakana"
	],
	["Han", "Hangul"],
	["Han", "Bopomofo"]
];
var LATIN_CONFUSABLE_SCRIPTS = [
	"Cyrillic",
	"Greek",
	"Armenian"
];
var scriptsCache = /* @__PURE__ */ new Map();
function getScript(char) {
	let script = scriptsCache.get(char);
	if (script === void 0) {
		if (scriptsCache.size > 1024) scriptsCache.clear();
		script = SCRIPT_REG_EXPS.find(([, regExp]) => regExp.test(char))?.[0] ?? null;
		scriptsCache.set(char, script);
	}
	return script;
}
function getLabelScripts(label) {
	const scripts = /* @__PURE__ */ new Set();
	for (const char of label) {
		if (!LETTER_REG_EXP.test(char) || SCRIPTLESS_REG_EXP.test(char)) continue;
		const script = getScript(char);
		if (!script) return;
		scripts.add(script);
	}
	return scripts;
}
function isSuspiciousUrl(url) {
	url = normalizeUrlProtocol(url);
	let parsed;
	try {
		parsed = new URL(url);
	} catch (e) {
		return true;
	}
	if (parsed.username || parsed.password) return true;
	let hostname;
	try {
		hostname = toUnicode(parsed.hostname);
	} catch (e) {
		return true;
	}
	const labels = hostname.toLowerCase().split(".");
	if (labels.length > 1 && labels[0] === "www") labels.shift();
	const domainScripts = /* @__PURE__ */ new Set();
	for (const label of labels) {
		const scripts = getLabelScripts(label);
		if (!scripts) return true;
		if (scripts.size > 1 && !ALLOWED_SCRIPT_SETS.some((allowed) => Array.from(scripts).every((script) => allowed.includes(script)))) return true;
		scripts.forEach((script) => domainScripts.add(script));
	}
	return domainScripts.has("Latin") && LATIN_CONFUSABLE_SCRIPTS.some((script) => domainScripts.has(script));
}
//#endregion
//#region src/lib/richTextProcessor/isWhitelistedUrl.ts
/**
* Tells whether `url` sits on one of `domains`, a host list the server sends in the app config.
* The host has to be listed itself — the server names every one it means, so a subdomain of a
* listed host is not covered.
*/
function isWhitelistedUrl(url, domains) {
	if (!domains?.length) return false;
	let parsedUrl;
	try {
		parsedUrl = new URL(url);
	} catch (err) {
		return false;
	}
	return matchUrlHost(parsedUrl, domains)?.subdomain === "";
}
/**
* Tells whether a link that hides its address under other text may open without asking: the
* server vouches for its host in the app config's `whitelisted_domains`.
*/
function isMaskedUrlTrusted(url) {
	return untrack(() => isWhitelistedUrl(url, appState.appConfig?.whitelisted_domains));
}
//#endregion
//#region src/helpers/date/formatFormattedDate.ts
function formatFormattedDate(timestampSec, pFlags) {
	const date = /* @__PURE__ */ new Date(timestampSec * 1e3);
	const options = {};
	if (pFlags.short_date) {
		options.year = "2-digit";
		options.month = "numeric";
		options.day = "numeric";
	}
	if (pFlags.long_date) {
		options.year = "numeric";
		options.month = "long";
		options.day = "numeric";
	}
	if (pFlags.day_of_week) options.weekday = "long";
	if (pFlags.short_time) {
		options.hour = "2-digit";
		options.minute = "2-digit";
	}
	if (pFlags.long_time) {
		options.hour = "2-digit";
		options.minute = "2-digit";
		options.second = "2-digit";
	}
	return capitalizeFirstLetter(langPack_default.getDateTimeFormat(options).format(date));
}
//#endregion
//#region src/helpers/date/formatRelativeTime.ts
function formatRelativeTime(timestampSec, nowSec) {
	const diff = nowSec - timestampSec;
	const absDiff = Math.abs(diff);
	const isPast = diff > 0;
	if (absDiff < 3) return {
		key: "FormattedDate.JustNow",
		updateInterval: (3 - absDiff) * 1e3 || 1e3
	};
	if (absDiff < 60) return {
		key: isPast ? "FormattedDate.SecondsAgo" : "FormattedDate.InSeconds",
		args: [absDiff],
		updateInterval: 1e3
	};
	if (absDiff < 3600) return {
		key: isPast ? "FormattedDate.MinutesAgo" : "FormattedDate.InMinutes",
		args: [absDiff / 60 | 0],
		updateInterval: nextBoundaryDelay(absDiff, 60, isPast)
	};
	if (absDiff < 86400) return {
		key: isPast ? "FormattedDate.HoursAgo" : "FormattedDate.InHours",
		args: [absDiff / 3600 | 0],
		updateInterval: nextBoundaryDelay(absDiff, 3600, isPast)
	};
	if (absDiff < 604800) return {
		key: isPast ? "FormattedDate.DaysAgo" : "FormattedDate.InDays",
		args: [absDiff / 86400 | 0],
		updateInterval: nextBoundaryDelay(absDiff, 86400, isPast)
	};
	if (absDiff < 2592e3) return {
		key: isPast ? "FormattedDate.WeeksAgo" : "FormattedDate.InWeeks",
		args: [absDiff / 604800 | 0],
		updateInterval: nextBoundaryDelay(absDiff, 604800, isPast)
	};
	if (absDiff < 31536e3) return {
		key: isPast ? "FormattedDate.MonthsAgo" : "FormattedDate.InMonths",
		args: [absDiff / 2592e3 | 0],
		updateInterval: nextBoundaryDelay(absDiff, 2592e3, isPast)
	};
	return {
		key: isPast ? "FormattedDate.YearsAgo" : "FormattedDate.InYears",
		args: [absDiff / 31536e3 | 0],
		updateInterval: nextBoundaryDelay(absDiff, 31536e3, isPast)
	};
}
function nextBoundaryDelay(absDiff, unit, isPast) {
	const remainder = absDiff % unit;
	return (isPast ? unit - remainder : remainder || 1) * 1e3;
}
//#endregion
//#region src/lib/richTextProcessor/filterDisabledEntities.ts
var MESSAGE_LINK_ENTITY_TYPES = /* @__PURE__ */ new Set([
	"messageEntityMention",
	"messageEntityMentionName",
	"messageEntityHashtag",
	"messageEntityCashtag",
	"messageEntityUrl",
	"messageEntityTextUrl",
	"messageEntityEmail",
	"messageEntityBankCard",
	"messageEntityRichButton"
]);
var MESSAGE_LINK_ENTITY_ATTRIBUTE = "data-message-link-entity";
var MESSAGE_LINK_ENTITY_SELECTOR = `[${MESSAGE_LINK_ENTITY_ATTRIBUTE}]`;
/**
* Whether an entity is one of `types`: by its own type, or as the link it is — a rich text's phone or email
* has a target of its own, whatever it reads, which makes it a text link to that number or address too
* (tdesktop's CustomUrl), hidden where text links are.
*/
function isEntityOfTypes(entity, types) {
	return types.has(entity._) || entity.richTextTarget !== void 0 && types.has("messageEntityTextUrl");
}
function markMessageLinkEntity(element, entity) {
	if (element.tagName === "A" && isEntityOfTypes(entity, MESSAGE_LINK_ENTITY_TYPES)) element.setAttribute(MESSAGE_LINK_ENTITY_ATTRIBUTE, "");
}
function filterDisabledEntities(entities, disabledEntities) {
	return entities.filter((entity) => !isEntityOfTypes(entity, disabledEntities));
}
//#endregion
//#region src/helpers/string/replaceNonNumber.ts
function replaceNonNumber(str) {
	return str.replace(/\D/g, "");
}
//#endregion
//#region src/lib/richTextProcessor/wrapRichText.ts
var ENTITY_ELEMENT_MAP = /* @__PURE__ */ new WeakMap();
var ENTITY_DIRECTIONS = {
	messageEntityUrl: "ltr",
	messageEntityEmail: "ltr",
	messageEntityPhone: "ltr",
	messageEntityBankCard: "ltr",
	messageEntityBotCommand: "ltr",
	messageEntityMention: "ltr",
	messageEntityCashtag: "ltr",
	messageEntityHashtag: "auto"
};
var UNDRAWN_TEXT_ENTITY_TYPES = /* @__PURE__ */ new Set(["messageEntityCustomEmoji", "messageEntitySpoiler"]);
/**
* Whether some of the text of the entity at `index` (ending at `end`) is not drawn as itself: a link made
* of that text goes somewhere else than it reads. What is inside an entity follows it in the sorted list.
*/
function hasUndrawnText(entities, index, end) {
	for (let i = index + 1; i < entities.length && entities[i].offset < end; ++i) if (UNDRAWN_TEXT_ENTITY_TYPES.has(entities[i]._)) return true;
	return false;
}
function createMarkupFormatting(formatting, element = document.createElement("span")) {
	const str = "markup-" + formatting;
	element.style.fontFamily = str;
	element.classList.add("is-markup");
	element.dataset.markup = str;
	return element;
}
function onQuoteResize(entry) {
	const target = entry.target;
	if (target.ignoreQuoteResize) {
		if (Date.now() < target.ignoreQuoteResize) return;
		delete target.ignoreQuoteResize;
	}
	const scrollHeight = target.scrollHeight;
	if (!scrollHeight) return;
	const isExpanded = scrollHeight - (entry.contentRect.bottom - entry.contentRect.height + entry.contentRect.top) - 0 - Math.floor(entry.contentRect.height) <= 1;
	target.style.setProperty("--quote-max-height", scrollHeight + "px");
	target.classList.toggle("is-truncated", !isExpanded);
}
function makeQuoteCollapsable(element) {
	element.classList.add("quote-like-collapsable");
	const collapseButton = document.createElement("button");
	collapseButton.type = "button";
	collapseButton.classList.add("quote-like-icon", "quote-like-collapse");
	collapseButton.setAttribute("aria-label", langPack_default.format("Chat.Quote.FullText", true));
	collapseButton.setAttribute("aria-expanded", "false");
	element.append(collapseButton);
	return observeResize(element, onQuoteResize);
}
/**
* * Expecting correctly sorted nested entities (RichTextProcessor.sortEntities)
*/
function wrapRichText(text, options = {}) {
	const fragment = document.createDocumentFragment();
	if (!text) return fragment;
	const disabledEntities = options.disabledEntities;
	if (disabledEntities && !options.nasty) {
		const entities = options.entities ?? parseEntities(text);
		options.entities = filterDisabledEntities(entities, disabledEntities);
		if (options.entities.length !== entities.length) options.onEntitiesDisabled?.();
	}
	const nasty = options.nasty ?? (options.nasty = {
		i: 0,
		usedLength: 0,
		text
	});
	const askBeforeOpening = (element, masked) => {
		if (masked && !options.passMaskedLinks && !options.wrappingDraft) element.setAttribute("onclick", "showMaskedAlert(this)");
	};
	const wrapSomething = (wrapElement, noFiller) => {
		const element = document.createElement("span");
		if (options.wrappingDraft) element.contentEditable = "false";
		element.classList.add("input-something");
		element.append(wrapElement);
		(lastElement || fragment).append(element);
		wrapElement.classList.add("input-selectable");
		!noFiller && wrapElement.append(createCustomFiller(true));
		customWraps.add(element);
		return element;
	};
	options.isSelectable || (options.isSelectable = options.wrappingDraft);
	const customEmojis = options.customEmojis ?? (options.customEmojis = /* @__PURE__ */ new Map());
	const customWraps = options.customWraps ?? (options.customWraps = /* @__PURE__ */ new Set());
	const entities = options.entities ?? (options.entities = parseEntities(nasty.text));
	const passEntities = options.passEntities ?? (options.passEntities = {});
	const contextSite = options.contextSite ?? (options.contextSite = "Telegram");
	const contextExternal = contextSite !== "Telegram";
	const skipEmojiInside = (endOffset) => {
		let nextEntity = entities[nasty.i + 1];
		while (nextEntity?._ === "messageEntityEmoji" && nextEntity.offset < endOffset) {
			++nasty.i;
			nasty.lastEntity = nextEntity;
			nasty.usedLength += nextEntity.length;
			nextEntity = entities[nasty.i + 1];
		}
		return nextEntity;
	};
	const textLength = nasty.text.length;
	const length = entities.length;
	let lastElement;
	for (; nasty.i < length; ++nasty.i) {
		let entity = entities[nasty.i];
		if (entity.offset >= textLength) {
			if (entity._ !== "messageEntityCaret") continue;
		} else if (entity.offset + entity.length > textLength) {
			entity = copy(entity);
			entity.length = textLength - entity.offset;
		}
		if (entity.length) nasty.lastEntity = entity;
		let nextEntity = entities[nasty.i + 1];
		const startOffset = entity.offset;
		const endOffset = startOffset + entity.length;
		const endPartOffset = Math.min(endOffset, nextEntity?.offset ?? 65535);
		const fullEntityText = nasty.text.slice(startOffset, endOffset);
		let partText = nasty.text.slice(startOffset, endPartOffset);
		if (nasty.usedLength < startOffset) (lastElement || fragment).append(nasty.text.slice(nasty.usedLength, startOffset));
		if (lastElement) lastElement = fragment;
		nasty.usedLength = endPartOffset;
		let element, property, usedText = false, processingBlockElement = false;
		switch (entity._) {
			case "messageEntityBold":
				if (!options.noTextFormat) {
					if (options.wrappingDraft) element = createMarkupFormatting("bold");
					else element = document.createElement("strong");
				}
				break;
			case "messageEntityItalic":
				if (!options.noTextFormat) {
					if (options.wrappingDraft) element = createMarkupFormatting("italic");
					else element = document.createElement("em");
				}
				break;
			case "messageEntityStrike":
				if (options.wrappingDraft) element = createMarkupFormatting("strikethrough");
				else element = document.createElement("del");
				break;
			case "messageEntityUnderline":
				if (options.wrappingDraft) element = createMarkupFormatting("underline");
				else if (!options.noTextFormat) element = document.createElement("u");
				break;
			case "messageEntityPre":
			case "messageEntityCode": {
				const entityLanguage = entity.language;
				if (options.wrappingDraft) {
					element = createMarkupFormatting("monospace");
					if (entityLanguage) element.dataset.language = entityLanguage;
				} else if (entity._ === "messageEntityPre" && !options.noTextFormat) {
					const container = document.createElement("pre");
					const content = document.createElement("div");
					content.classList.add("code-content");
					content.dir = "ltr";
					element = document.createElement("code");
					element.classList.add("code-code");
					fragment.append(container);
					content.append(element);
					container.classList.add("quote-like", "quote-like-border", "code");
					const languageName = CodeLanguageAliases[entityLanguage.toLowerCase()];
					const header = document.createElement("div");
					header.classList.add("code-header");
					const headerName = document.createElement("span");
					headerName.classList.add("code-header-name");
					headerName.append(languageName || i18n("CopyCode"));
					const headerWrapButton = createCodeHeaderButton("menu", "code-header-toggle-wrap");
					header.append(headerName, headerWrapButton, createCodeHeaderButton("copy_alt", "code-header-copy"));
					container.append(header, content);
					const result = !options.noCodeHighlight && (languageName ? highlightCode(fullEntityText, languageName) : !entityLanguage ? highlightCodeAuto(fullEntityText).then((highlight) => highlight?.html) : void 0);
					result && callbackify(result, (html) => {
						if (html && (!options.middleware || options.middleware())) element.innerHTML = html;
					});
					usedText = true;
					if (!result || result instanceof Promise) element.textContent = fullEntityText;
					let lastInnerEntityIndex = findIndexFrom(entities, (n) => n.offset >= endOffset, nasty.i + 1);
					if (lastInnerEntityIndex === -1) lastInnerEntityIndex = entities.length - 1;
					else lastInnerEntityIndex -= 1;
					nasty.i = lastInnerEntityIndex;
					nasty.usedLength = endOffset;
					nasty.lastEntity = entities[lastInnerEntityIndex];
					nextEntity = void 0;
					processingBlockElement = true;
				} else if (!options.noTextFormat) {
					element = document.createElement("code");
					element.classList.add("monospace-text");
				}
				break;
			}
			case "messageEntityHighlight":
				element = document.createElement("i");
				element.className = "text-highlight";
				break;
			case "messageEntitySubscript":
				element = document.createElement("sub");
				break;
			case "messageEntitySuperscript":
				element = document.createElement("sup");
				break;
			case "messageEntityRichButton":
				element = document.createElement("span");
				if (entity.button.type._ !== "inlineButtonTypeUrl") element.setAttribute("role", "button");
				setRichTextButton(element, entity.button);
				break;
			case "messageEntityIcon": {
				nextEntity = skipEmojiInside(endOffset);
				element = document.createElement("span");
				const text = document.createElement("span");
				text.className = "sr-only";
				text.textContent = fullEntityText;
				element.append(Icon(entity.icon, "inline-icon"), text);
				usedText = true;
				break;
			}
			case "messageEntityAnchor":
				element = document.createElement("span");
				element.id = entity.name;
				if (entity.richTextReference) element.classList.add("tg-reference");
				break;
			case "messageEntityPhone":
				if (!(options.noLinks && !passEntities[entity._])) {
					const target = entity.richTextTarget || fullEntityText;
					element = document.createElement("a");
					element.classList.add("phone-url");
					element.href = encodeEntities("tel:" + target);
					askBeforeOpening(element, replaceNonNumber(target) !== replaceNonNumber(fullEntityText) || hasUndrawnText(entities, nasty.i, endOffset));
				}
				break;
			case "messageEntityBankCard":
				if (!(options.noLinks && !passEntities[entity._]) && !options.wrappingDraft) {
					element = document.createElement("a");
					element.classList.add("bank-card");
					element.href = "#";
					element.dataset.bankCard = fullEntityText;
					element.setAttribute("aria-haspopup", "menu");
					element.setAttribute("aria-expanded", "false");
					element.setAttribute("onclick", "onBankCardClick(this, event)");
				}
				break;
			case "messageEntityTonAddress":
				if (!options.noLinks && window.openTonAddress) {
					element = document.createElement("a");
					element.classList.add("ton-address");
					element.href = encodeEntities("tg://sendgrams?to=" + encodeURIComponent(fullEntityText));
					if (!contextExternal) {
						element.setAttribute("onclick", "openTonAddress(this)");
						element.setAttribute("aria-haspopup", "menu");
					}
				}
				break;
			case "messageEntityBotCommand":
				if (!options.noLinks && passEntities[entity._] && !hasUndrawnText(entities, nasty.i, endOffset)) {
					let command = fullEntityText.slice(1);
					let bot;
					let atPos;
					if ((atPos = command.indexOf("@")) !== -1) {
						bot = command.slice(atPos + 1);
						command = command.slice(0, atPos);
					} else bot = options.fromBot;
					element = document.createElement("a");
					element.href = encodeEntities("tg://bot_command?command=" + encodeURIComponent(command) + (bot ? "&bot=" + encodeURIComponent(bot) : ""));
					if (!contextExternal) element.setAttribute("onclick", "execBotCommand(this)");
				}
				break;
			case "messageEntityCustomEmoji": {
				nextEntity = skipEmojiInside(endOffset);
				const customEmojiElement = element = CustomEmojiElement.create(entity.document_id);
				const { docId } = customEmojiElement;
				let set = customEmojis.get(docId);
				if (!set) customEmojis.set(docId, set = /* @__PURE__ */ new Set());
				set.add(customEmojiElement);
				customEmojiElement.dataset.stickerEmoji = fullEntityText;
				if (entity.w) {
					customEmojiElement.classList.add("custom-emoji-custom-sized");
					customEmojiElement.style.setProperty("--width", entity.w + "px");
					customEmojiElement.style.setProperty("--height", entity.h + "px");
				}
				if (options.wrappingDraft) {
					element = document.createElement("img");
					element.alt = fullEntityText;
					for (const i in customEmojiElement.dataset) element.dataset[i] = customEmojiElement.dataset[i];
					element.customEmojiElement = customEmojiElement;
					customEmojiElement.placeholder = element;
					element.classList.add("custom-emoji-placeholder");
					element.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAAtJREFUGFdjYAACAAAFAAGq1chRAAAAAElFTkSuQmCC";
					property = "alt";
					break;
				}
				if (options.isSelectable) element = wrapSomething(element, !!options.customEmojiRenderer);
				property = "alt";
				break;
			}
			case "messageEntityEmoji":
				if (!isEmojiNative(entity.unicode)) {
					element = document.createElement("img");
					element.src = getEmojiImageUrl(entity.unicode);
					property = "alt";
					element.className = "emoji emoji-image";
				} else if (!options.wrappingDraft) {
					element = document.createElement("span");
					element.className = "emoji emoji-native";
				}
				break;
			case "messageEntityCaret":
				element = document.createElement("span");
				element.className = "composer-sel";
				break;
			case "messageEntityLinebreak":
				if (options.ignoreNextIndex === nasty.i || options.wrappingDraft && !options.noTextFormat && nextEntity?._ === "messageEntityBlockquote" && nextEntity.offset === endOffset) usedText = true;
				else if (options.wrappingDraft && IS_FIREFOX) {
					element = document.createElement("br");
					usedText = true;
				}
				if (options.doubleLinebreak === nasty.i) {
					options.doubleLinebreak = void 0;
					(element || fragment).append("\n\n");
					usedText = true;
				}
				break;
			case "messageEntityUrl":
			case "messageEntityTextUrl":
				if (!(options.noLinks && !passEntities[entity._])) {
					let url = entity.url || fullEntityText;
					let masked = false;
					let onclick;
					const wrapped = wrapUrl(url, entity.safe);
					url = wrapped.url;
					onclick = wrapped.onclick;
					if (options.whitelistedDomains && !isWhitelistedUrl(url, options.whitelistedDomains)) break;
					if (entity._ === "messageEntityTextUrl") {
						if (nextEntity?._ === "messageEntityUrl" && nextEntity.length === entity.length && nextEntity.offset === entity.offset) {
							nasty.lastEntity = nextEntity;
							++nasty.i;
						}
						if (url !== fullEntityText && !isMaskedUrlTrusted(url)) masked = true;
					} else masked = isSuspiciousUrl(url);
					if (!masked && hasUndrawnText(entities, nasty.i, endOffset) && !isMaskedUrlTrusted(url)) masked = true;
					const currentContext = !!onclick;
					if (!onclick && masked && !currentContext && !options.passMaskedLinks) onclick = "showMaskedAlert";
					if (options.wrappingDraft) onclick = void 0;
					element = document.createElement("a");
					element.className = "anchor-url";
					element.href = url;
					if (!currentContext) (getElectronHelpers() ? setExternalToAnchor : setBlankToAnchor)(element);
					if (onclick) element.setAttribute("onclick", onclick + "(this)");
				}
				break;
			case "messageEntityEmail":
				if (!options.noLinks && !passEntities[entity._]) {
					const target = entity.richTextTarget || fullEntityText;
					element = document.createElement("a");
					element.href = encodeEntities("mailto:" + target);
					setBlankToAnchor(element);
					askBeforeOpening(element, target.trim().toLowerCase() !== fullEntityText.trim().toLowerCase() || hasUndrawnText(entities, nasty.i, endOffset));
				}
				break;
			case "messageEntityCashtag":
			case "messageEntityHashtag": {
				const contextUrl = !options.noLinks && SITE_HASHTAGS[contextSite];
				if (contextUrl) {
					const tag = fullEntityText.slice(1);
					const linkTag = entity._ === "messageEntityCashtag" ? "$" + tag : tag;
					element = document.createElement("a");
					element.className = "anchor-hashtag";
					element.href = contextUrl.replace("{1}", encodeURIComponent(linkTag));
					if (contextExternal) setBlankToAnchor(element);
					else element.setAttribute("onclick", "searchByHashtag(this)");
				}
				break;
			}
			case "messageEntityMentionName":
				if (!(options.noLinks && !passEntities[entity._])) {
					element = document.createElement("a");
					element.href = buildURLHash("" + entity.user_id);
					element.className = "follow";
					element.dataset.follow = "" + entity.user_id;
				}
				break;
			case "messageEntityMention":
				if (!options.noLinks && !hasUndrawnText(entities, nasty.i, endOffset)) {
					element = wrapTelegramUrlToAnchor("t.me/" + fullEntityText.slice(1));
					element.className = "mention";
				}
				break;
			case "messageEntitySpoiler":
				if (options.noTextFormat) {
					const encoded = encodeSpoiler(nasty.text, entity);
					nasty.text = encoded.text;
					partText = encoded.entityText;
					if (endPartOffset !== endOffset) nasty.usedLength += endOffset - endPartOffset;
					let n;
					for (; n = entities[nasty.i + 1], n && n.offset < endOffset;) {
						++nasty.i;
						nasty.lastEntity = n;
						nextEntity = entities[nasty.i + 1];
					}
					if (!IS_FIREFOX) {
						element = document.createElement("span");
						element.className = "bluff-spoiler";
						element.append(...partText.split("").map((encodedLetter) => {
							const letter = document.createElement("span");
							letter.className = "bluff-spoiler-letter";
							letter.textContent = encodedLetter;
							return letter;
						}));
						const canvas = document.createElement("canvas");
						canvas.className = "bluff-spoiler-canvas";
						element.append(canvas);
						fragment.append(element);
						DotRenderer.attachBluffTextSpoilerTarget(element, options.textColor);
						usedText = true;
					}
				} else if (options.wrappingDraft) element = createMarkupFormatting("spoiler");
				else {
					const container = document.createElement("span");
					container.className = "spoiler";
					element = document.createElement("span");
					element.className = "spoiler-text";
					element.textContent = partText;
					usedText = true;
					container.append(element);
					fragment.append(container);
					container[`on${CLICK_EVENT_NAME}`] = window.onSpoilerClick;
				}
				break;
			case "messageEntityTimestamp":
				if (!options.maxMediaTimestamp || entity.time > options.maxMediaTimestamp) break;
				element = document.createElement("a");
				element.classList.add("timestamp");
				element.dataset.timestamp = "" + entity.time;
				element.href = "#";
				element.setAttribute("onclick", "setMediaTimestamp(this)");
				if (options.maxMediaTimestamp === Infinity) element.classList.add("is-disabled");
				break;
			case "messageEntityFormattedDate":
				if (options.noTextFormat) break;
				element = document.createElement("span");
				if (options.wrappingDraft) {
					createMarkupFormatting("date", element);
					element.dataset.date = "" + entity.date;
				} else {
					element.classList.add("formatted-date");
					element.setAttribute("onclick", "onFormattedDateClick(this, event)");
					element.setAttribute(TEXT_LINK_ATTRIBUTE, "");
				}
				ENTITY_ELEMENT_MAP.set(element, entity);
				if (Object.keys(entity.pFlags).length && !options.wrappingDraft) {
					usedText = true;
					element.dataset.originalText = fullEntityText;
					const textNode = document.createTextNode("");
					element.append(textNode);
					const updateText = (text) => {
						element.dataset.fakeText = text;
						textNode.data = text;
					};
					if (entity.pFlags.relative) {
						if (options.middleware) {
							const dispose = createRoot((dispose) => {
								const [now, setNow] = createSignal(tsNow(true));
								let timerId;
								const scheduleUpdate = (ms) => {
									clearTimeout(timerId);
									timerId = setTimeout(() => {
										setNow(tsNow(true));
									}, ms);
								};
								createEffect(() => {
									const result = formatRelativeTime(entity.date, now());
									updateText(langPack_default.format(result.key, true, result.args));
									scheduleUpdate(result.updateInterval);
								});
								onCleanup(() => clearTimeout(timerId));
								return dispose;
							});
							options.middleware.onClean(dispose);
						} else {
							const result = formatRelativeTime(entity.date, tsNow(true));
							updateText(langPack_default.format(result.key, true, result.args));
						}
					} else updateText(formatFormattedDate(entity.date, entity.pFlags));
				}
				break;
			case "messageEntityBlockquote":
				if (options.noTextFormat) break;
				if (options.wrappingDraft) {
					element = createMarkupFormatting("quote");
					if (entity.pFlags?.collapsed) element.dataset.collapsed = "1";
				} else {
					element = document.createElement("blockquote");
					element.classList.add("quote", "quote-block");
					if (entity.pFlags?.collapsed) {
						const dispose = makeQuoteCollapsable(element);
						options.middleware.onClean(dispose);
					}
				}
				element.classList.add("quote-like", "quote-like-border", "quote-like-icon", "input-collapsible-quote");
				setDirection(element);
				processingBlockElement = true;
				break;
			case "messageEntityDiffInsert":
				element = document.createElement("span");
				element.classList.add("markup-diff-insert");
				break;
			case "messageEntityDiffDelete":
				element = document.createElement("span");
				element.classList.add("markup-diff-delete");
				break;
			case "messageEntityDiffReplace": {
				const container = document.createElement("span");
				fragment.appendChild(container);
				const deleted = document.createElement("span");
				deleted.classList.add("markup-diff-delete");
				deleted.textContent = entity.old_text;
				const inserted = document.createElement("span");
				inserted.classList.add("markup-diff-insert");
				container.append(deleted, inserted);
				element = inserted;
				break;
			}
		}
		if (element) markMessageLinkEntity(element, entity);
		if (element && !options.wrappingDraft && ENTITY_DIRECTIONS[entity._]) element.dir = ENTITY_DIRECTIONS[entity._];
		if (processingBlockElement) {
			let foundNextLinebreakIndex = -1;
			for (let i = nasty.i; i < length; ++i) {
				const n = entities[i];
				if (n._ === "messageEntityLinebreak" && n.offset >= endOffset) {
					foundNextLinebreakIndex = i;
					break;
				}
			}
			if (foundNextLinebreakIndex !== -1 && nasty.text.slice(endOffset, entities[foundNextLinebreakIndex].offset).trim()) foundNextLinebreakIndex = -1;
			if (!options.wrappingDraft && endOffset < nasty.text.length) {
				if (!element.parentElement) {
					const container = document.createElement("div");
					container.append(element);
					fragment.append(container);
				}
				if (nasty.text[endOffset - 1] === "\n") {
					let lastInnerLinebreakIndex = -1;
					for (let i = nasty.i; i < length; ++i) {
						const n = entities[i];
						if (n.offset >= endOffset) break;
						if (n._ === "messageEntityLinebreak") lastInnerLinebreakIndex = i;
					}
					if (lastInnerLinebreakIndex !== -1) options.ignoreNextIndex = lastInnerLinebreakIndex;
				} else if (foundNextLinebreakIndex !== -1) options.ignoreNextIndex = foundNextLinebreakIndex;
			}
			if (options.wrappingDraft && foundNextLinebreakIndex !== -1) options.ignoreNextIndex = foundNextLinebreakIndex;
		}
		if (!usedText && partText) {
			if (element) {
				if (property) element[property] = partText;
				else element.append(partText);
			} else (element || fragment).append(partText);
		}
		if (element && !element.parentNode) (lastElement || fragment).append(element);
		while (nextEntity && nextEntity.offset < endOffset) {
			++nasty.i;
			(element || fragment).append(wrapRichText(nasty.text, {
				...options,
				voodoo: true
			}));
			nextEntity = entities[nasty.i + 1];
		}
		if (nasty.usedLength <= endOffset) {
			if (nasty.usedLength < endOffset) {
				(element || fragment).append(nasty.text.slice(nasty.usedLength, endOffset));
				nasty.usedLength = endOffset;
			}
			lastElement = fragment;
			nasty.lastEntity = void 0;
		} else if (entity.length > partText.length && element) lastElement = element;
		else lastElement = fragment;
		if (options.voodoo) return fragment;
	}
	if (nasty.lastEntity) nasty.usedLength = nasty.lastEntity.offset + nasty.lastEntity.length;
	if (nasty.usedLength < textLength) (lastElement || fragment).append(nasty.text.slice(nasty.usedLength));
	if (options.richButtonCustomEmojiRenderer && !options.wrappingDraft && customEmojis.size) takeRichButtonCustomEmojis(fragment, customEmojis, options);
	if (options.reuseCustomEmojis && options.customEmojiRenderer && !options.wrappingDraft && customEmojis.size) reuseCustomEmojis(customEmojis, options.reuseCustomEmojis, options.customEmojiRenderer);
	if ((!options.wrappingDraft || options.customEmojiRenderer) && customEmojis.size) {
		let renderer = options.customEmojiRenderer;
		if (!renderer) {
			renderer = CustomEmojiRendererElement.create(options);
			fragment.prepend(renderer);
		}
		const loadPromise = renderer.add({
			addCustomEmojis: customEmojis,
			lazyLoadQueue: options.lazyLoadQueue,
			onlyThumb: options.wrappingDraft
		});
		options.loadPromises?.push(loadPromise);
	}
	if (customWraps.size) insertCustomFillers(customWraps);
	fragment.normalize();
	return fragment;
}
/** Puts the old text's drawn custom emoji in place of the new text's of the same documents. */
function reuseCustomEmojis(customEmojis, pool, renderer) {
	customEmojis.forEach((elements, docId) => {
		const candidates = pool.get(docId);
		if (!candidates?.length) return;
		Array.from(elements).forEach((element) => {
			const index = candidates.findIndex((candidate) => candidate.renderer === renderer && !candidate.clean);
			if (index === -1) return;
			const [old] = candidates.splice(index, 1);
			old.dataset.stickerEmoji = element.dataset.stickerEmoji;
			old.classList.toggle("custom-emoji-custom-sized", element.classList.contains("custom-emoji-custom-sized"));
			["--width", "--height"].forEach((property) => {
				const value = element.style.getPropertyValue(property);
				if (value) old.style.setProperty(property, value);
				else old.style.removeProperty(property);
			});
			element.replaceWith(old);
			elements.delete(element);
			elements.add(old);
		});
	});
}
/** Hands a rich button's custom emoji to the renderer its owner gave it, out of the text's. */
function takeRichButtonCustomEmojis(fragment, customEmojis, options) {
	fragment.querySelectorAll(RICH_TEXT_BUTTON_SELECTOR).forEach((button) => {
		const elements = button.querySelectorAll("custom-emoji-element");
		if (!elements.length) return;
		const renderer = options.richButtonCustomEmojiRenderer(button, options.middleware);
		if (!renderer) return;
		const own = /* @__PURE__ */ new Map();
		elements.forEach((element) => {
			const { docId } = element;
			const set = customEmojis.get(docId);
			set?.delete(element);
			if (set && !set.size) customEmojis.delete(docId);
			let ownSet = own.get(docId);
			if (!ownSet) own.set(docId, ownSet = /* @__PURE__ */ new Set());
			ownSet.add(element);
		});
		const loadPromise = renderer.add({
			addCustomEmojis: own,
			lazyLoadQueue: options.lazyLoadQueue
		});
		options.loadPromises?.push(loadPromise);
	});
}
var createCustomFiller = (notFiller) => {
	const x = document.createElement("span");
	x.classList.add(notFiller ? "input-filler2" : "input-filler");
	x.textContent = "﻿";
	return x;
};
function isCustomFillerNeededBySiblingNode(node) {
	if (node?.textContent !== "﻿" || node?.getAttribute?.("contenteditable") === "false") {
		if (!node || node.textContent !== "﻿" || node.firstElementChild) return 2;
		else if (node.nodeType === node.ELEMENT_NODE) return 1;
	}
	return 0;
}
function insertCustomFillers(elements) {
	const check = (element, node, method) => {
		const needed = isCustomFillerNeededBySiblingNode(node);
		if (needed === 2) element[method](createCustomFiller());
		else if (needed === 1) node.appendChild(document.createTextNode("﻿"));
	};
	for (const element of elements) {
		const { previousSibling, nextSibling } = element;
		check(element, previousSibling, "before");
		check(element, nextSibling, "after");
	}
}
window.wrapRichText = wrapRichText;
//#endregion
//#region src/lib/customEmoji/element.ts
var TAG_NAME$1 = "custom-emoji-element";
var CustomEmojiElement = class extends HTMLElement {
	constructor() {
		super();
		this.paused = true;
		this.classList.add("custom-emoji");
	}
	get docId() {
		return this.dataset.docId;
	}
	set docId(docId) {
		this.dataset.docId = "" + docId;
	}
	static create(docId) {
		const element = new (customElements.get(TAG_NAME$1))();
		if (docId) element.docId = docId;
		return element;
	}
	get isConnected() {
		return this.placeholder?.isConnected ?? super.isConnected;
	}
	connectedCallback() {
		if (this.player) animationIntersector.addAnimation({
			animation: this,
			group: this.renderer.animationGroup,
			observeElement: this.placeholder ?? this,
			controlled: true,
			type: "emoji"
		});
	}
	disconnectedCallback() {
		if (this.isConnected || !this.renderer?.isSelectable) return;
		this.clear();
	}
	destroy() {
		this.clear();
	}
	clear(replaceChildren = true) {
		if (this.clean) return;
		this.clean = true;
		this.pause();
		const { syncedPlayer } = this;
		if (syncedPlayer) syncedPlayer.pausedElements.delete(this);
		this.middlewareHelper?.clean();
		this.readyPromise?.reject();
		if (this.renderer) {
			const elements = this.renderer.customEmojis.get(this.docId);
			if (elements?.delete(this)) this.renderer.onElementCleared(this.docId, elements);
			if (replaceChildren) {
				if (this.renderer.isSelectable) this.replaceChildren(createCustomFiller(true));
				else this.replaceChildren();
			}
		}
		if (this.player) animationIntersector.removeAnimationByPlayer(this);
		CustomEmojiRendererElement.globalLazyLoadQueue?.delete({ div: this });
		this.elements = this.renderer = this.player = this.syncedPlayer = void 0;
	}
	pause() {
		if (this.paused) return;
		this.paused = true;
		if (this.player instanceof HTMLVideoElement && !this.syncedPlayer) {
			this.renderer.lastPausedVideo = this.player;
			this.player.pause();
		}
		if (this.syncedPlayer && !this.syncedPlayer.pausedElements.has(this)) {
			this.syncedPlayer.pausedElements.add(this);
			if (this.syncedPlayer.player && this.syncedPlayer.pausedElements.size === this.syncedPlayer.middlewares.size) this.syncedPlayer.player.pause();
		}
	}
	play() {
		if (!this.paused) return;
		this.paused = false;
		if (this.player instanceof HTMLVideoElement) {
			this.player.currentTime = this.renderer.lastPausedVideo?.currentTime ?? this.player.currentTime;
			safePlay(this.player);
		}
		if (this.syncedPlayer && this.syncedPlayer.pausedElements.has(this)) {
			this.syncedPlayer.pausedElements.delete(this);
			if (this.syncedPlayer.pausedElements.size !== this.syncedPlayer.middlewares.size) this.player.play();
		}
	}
	remove() {
		super.remove();
		this.clear();
	}
	get autoplay() {
		return true;
	}
	get loop() {
		return true;
	}
};
if (!customElements.get(TAG_NAME$1)) customElements.define(TAG_NAME$1, CustomEmojiElement);
var CUSTOM_EMOJI_FRAME_INTERVAL = 1e3 / 60;
var PAID_REACTION_EMOJI_DOCID = "__PAID_REACTION_EMOJI__";
//#endregion
//#region src/lib/customEmoji/layoutWatch.ts
var MUTATIONS = {
	childList: true,
	subtree: true,
	characterData: true,
	attributes: true,
	attributeFilter: [
		"class",
		"style",
		"hidden",
		"dir",
		"src",
		"srcset",
		"width",
		"height",
		"open",
		"colspan",
		"rowspan",
		"contenteditable"
	]
};
var MOVES = /^(transform|translate|scale|rotate|offset|all|width|height|(min|max)-(width|height)|inset|top|left|right|bottom|margin|padding|border(-(top|bottom|left|right|block|inline)(-(start|end))?)?-width|font-size|line-height|letter-spacing|flex|grid|gap|(row|column)-gap|block-size|inline-size)/;
var MOTION_MAX_MS = 1e3;
var changed = true;
var watching = false;
var onChange;
var isRelevant;
var moving = /* @__PURE__ */ new Map();
var observer = new MutationObserver(() => {
	observer.disconnect();
	markEmojiLayoutChanged();
});
var getMotionName = (e) => {
	return e.propertyName ?? e.animationName;
};
var onMotionStart = (e) => {
	const name = getMotionName(e);
	if (e.type === "transitionrun" && !MOVES.test(name)) return;
	if (isRelevant && !isRelevant(e.target)) return;
	let motions = moving.get(e.target);
	if (!motions) moving.set(e.target, motions = /* @__PURE__ */ new Map());
	motions.set(name, performance.now() + MOTION_MAX_MS);
	markEmojiLayoutChanged();
};
var onMotionEnd = (e) => {
	const motions = moving.get(e.target);
	if (!motions?.delete(getMotionName(e))) return;
	if (!motions.size) moving.delete(e.target);
	markEmojiLayoutChanged();
};
var onChangeEvent = () => markEmojiLayoutChanged();
var getDocument = (win) => win.document;
var LISTENER_OPTIONS = {
	capture: true,
	passive: true
};
var unbind = [];
var observe = () => observer.observe(getAppWindow().document.documentElement, MUTATIONS);
function markEmojiLayoutChanged() {
	if (changed) return;
	changed = true;
	onChange?.();
}
/**
* Starts watching, while there are emoji to draw; `callback` is called when a measurement becomes due,
* `relevant` says whether something moving there can move an emoji
*/
function watchEmojiLayout(callback, relevant) {
	onChange = callback;
	isRelevant = relevant;
	if (watching) return;
	watching = true;
	unbind = [
		bindActiveWindowListener(getDocument, "scroll", onChangeEvent, LISTENER_OPTIONS),
		bindActiveWindowListener((win) => win, "resize", onChangeEvent, LISTENER_OPTIONS),
		bindActiveWindowListener(getDocument, "transitionrun", onMotionStart, LISTENER_OPTIONS),
		bindActiveWindowListener(getDocument, "animationstart", onMotionStart, LISTENER_OPTIONS),
		bindActiveWindowListener(getDocument, "transitionend", onMotionEnd, LISTENER_OPTIONS),
		bindActiveWindowListener(getDocument, "transitioncancel", onMotionEnd, LISTENER_OPTIONS),
		bindActiveWindowListener(getDocument, "animationend", onMotionEnd, LISTENER_OPTIONS),
		bindActiveWindowListener(getDocument, "animationcancel", onMotionEnd, LISTENER_OPTIONS),
		onAppWindowChange(() => {
			observer.disconnect();
			moving.clear();
			changed = false;
			observe();
			markEmojiLayoutChanged();
		})
	];
	changed = false;
	observe();
}
function unwatchEmojiLayout() {
	if (!watching) return;
	watching = false;
	onChange = isRelevant = void 0;
	unbind.forEach((callback) => callback());
	unbind = [];
	observer.disconnect();
	moving.clear();
	changed = true;
}
/**
* Web Animations that move what emoji are drawn over (a bubble shown changing, its reactions moving): measured every
* frame till `over` settles, and once more then
*/
function markEmojiLayoutMoving(over) {
	if (!watching) return;
	const token = {};
	moving.set(token, /* @__PURE__ */ new Map([["animation", Infinity]]));
	markEmojiLayoutChanged();
	over.finally(() => {
		if (moving.delete(token)) markEmojiLayoutChanged();
	});
}
/** Whether something that moves is running, waited out for a second at most */
function isEmojiLayoutMoving() {
	if (!moving.size) return false;
	const now = performance.now();
	for (const [target, motions] of moving) {
		for (const [name, until] of motions) if (until <= now) motions.delete(name);
		if (!motions.size) moving.delete(target);
	}
	return !!moving.size;
}
/** Measures: what the callback itself changes is not taken for a change, what comes after is */
function measureEmojiLayout(callback) {
	if (watching) observer.disconnect();
	try {
		return callback();
	} finally {
		if (watching) {
			changed = false;
			observe();
		}
	}
}
//#endregion
//#region src/lib/customEmoji/renderer.ts
var _CustomEmojiRendererElement;
var globalLazyLoadQueue = new LazyLoadQueue();
var TAG_NAME = "custom-emoji-renderer-element";
var CustomEmojiRendererElement = class extends HTMLElement {
	constructor() {
		super();
		this.onResizeEntry = (entry) => {
			if (!hasSize(entry.contentRect)) return;
			const heavyAnimation = getHeavyAnimationPromise();
			const hasSomethingDrawn = this.isDimensionsSet && (this.offscreen || !this.isCanvasClean);
			if (heavyAnimation.isFulfilled || !hasSomethingDrawn) {
				this.setDimensionsFromRect(entry.contentRect);
				return;
			}
			if (this.observeResizeElement === void 0 && !this.showsCommittedSize()) this.pinCanvasSize();
			else this.pendingRect = entry.contentRect;
			if (this.awaitsHeavyAnimation) return;
			this.awaitsHeavyAnimation = true;
			heavyAnimation.then(() => {
				this.awaitsHeavyAnimation = void 0;
				const rect = this.pendingRect;
				this.pendingRect = void 0;
				if (this.destroyed) return;
				this.forceRenderAfterSize = true;
				if (rect) this.setDimensionsFromRect(rect);
				else {
					this.unpinCanvasSize();
					const { canvas } = this;
					const size = {
						width: canvas.offsetWidth,
						height: canvas.offsetHeight
					};
					if (hasSize(size)) this.setDimensionsFromRect(size);
				}
			});
		};
		this.endPass = () => {
			const { removed, added, emptied } = this.pass;
			this.pass = void 0;
			if (this.destroyed) return;
			emptied.forEach((elements, docId) => {
				if (!elements.size && this.customEmojis.get(docId) === elements) {
					this.customEmojis.delete(docId);
					this.textColored.delete(elements);
					this.playersSynced.delete(elements);
				}
			});
			const groups = removed && this.isShowingPicture() ? [...added].filter((docId) => this.customEmojis.has(docId)) : [];
			if (groups.length) {
				this.hold ?? (this.hold = {
					groups: /* @__PURE__ */ new Set(),
					timeout: window.setTimeout(this.endHold, PASS_HOLD_TIMEOUT)
				});
				groups.forEach((docId) => this.hold.groups.add(docId));
			}
			if (!this.hold) this.scheduleTakeOffGoneGroups();
		};
		this.endHold = () => {
			this.hold = void 0;
			this.scheduleTakeOffGoneGroups();
		};
		this.takeOffGoneGroups = () => {
			if (this.destroyed) return;
			if (this.offscreen) {
				const groups = [];
				for (const groupId of this.lastSentOffsets.keys()) if (!this.customEmojis.has(groupId)) {
					this.lastSentOffsets.delete(groupId);
					groups.push({
						groupId,
						offsets: []
					});
				}
				if (groups.length) compositorMessagePort.invokeCompositorVoid("setOffsets", { batch: [{
					rendererId: this.rendererId,
					groups
				}] });
			} else if (!this.playersSynced.size) this.clearCanvas();
		};
		this.onElementCleanup = (element, syncedPlayer, middleware) => {
			element.clear();
			syncedPlayer.middlewares.delete(middleware);
			if (syncedPlayer.middlewares.size) return;
			const { docId } = element;
			setTimeout(() => this.releaseSyncedPlayer(syncedPlayer, docId), SYNCED_PLAYER_RELEASE_DELAY);
		};
		this.classList.add("custom-emoji-renderer");
		this.canvas = document.createElement("canvas");
		this.canvas.classList.add("custom-emoji-canvas");
		this.append(this.canvas);
		this.lastSentOffsets = /* @__PURE__ */ new Map();
		this.lastSentSuspended = false;
		this.playersSynced = /* @__PURE__ */ new Map();
		this.textColored = /* @__PURE__ */ new Set();
		this.clearedElements = /* @__PURE__ */ new WeakSet();
		this.customEmojis = /* @__PURE__ */ new Map();
		this.animationGroup = "EMOJI";
		this.isCanvasClean = false;
	}
	get context() {
		return this._context ?? (this._context = this.canvas.getContext("2d"));
	}
	sendCompositor(method, payload, transfer) {
		compositorMessagePort.invokeCompositorVoid(method, {
			...payload,
			rendererId: this.rendererId
		}, transfer);
	}
	/**
	* An offscreen canvas laid out by its own style is shown at the size of the picture the compositor
	* last committed to it, from the corner the offsets are measured from - not stretched over the
	* renderer's box. That box changes a frame before the compositor draws for it, and every frame of
	* a box that grows (a details opening, a quote expanding) would scale the picture over it, the
	* emoji riding up and down with that. So the renderer's own box is what is watched then.
	*/
	showsCommittedSize() {
		return this.offscreen && this.observeResizeElement === void 0;
	}
	getObservedElement() {
		return this.observeResizeElement ?? (this.showsCommittedSize() ? this : this.canvas);
	}
	/** Holds the canvas at the size the picture on it was drawn for, so nothing stretches it */
	pinCanvasSize() {
		const rect = this.lastRect;
		if (this.pinnedCanvasSize || !rect) return;
		this.pinnedCanvasSize = true;
		this.setCanvasCssSize(rect.width, rect.height);
	}
	/** Lays the canvas out at this size whatever its own style says */
	setCanvasCssSize(width, height) {
		this.canvas.style.setProperty("width", width + "px", "important");
		this.canvas.style.setProperty("height", height + "px", "important");
	}
	unpinCanvasSize() {
		if (!this.pinnedCanvasSize) return;
		this.pinnedCanvasSize = void 0;
		this.canvas.style.removeProperty("width");
		this.canvas.style.removeProperty("height");
	}
	connectedCallback() {
		if (this.destroyed || this.selfRef) return;
		const observeElement = this.getObservedElement();
		if (observeElement) observeResize(observeElement, this.onResizeEntry);
		const ref = this.selfRef = new WeakRef(this);
		emojiRenderers.add(ref);
		collectedRenderers.register(this, () => emojiRenderers.delete(ref), this);
	}
	disconnectedCallback() {
		if (this.isConnected || this.destroyed) return;
		if (this.auto) this.destroy();
	}
	destroy() {
		if (this.destroyed) return;
		this.destroyed = true;
		const observeElement = this.getObservedElement();
		if (observeElement) unobserveResize(observeElement, this.onResizeEntry);
		this.customEmojis.forEach((elements) => {
			elements.forEach((element) => {
				element.clear();
			});
		});
		if (this.offscreen) {
			this.sendCompositor("detachRenderer");
			offscreenRenderers.delete(this.rendererId);
		}
		if (this.selfRef) {
			emojiRenderers.delete(this.selfRef);
			this.selfRef = void 0;
		}
		collectedRenderers.unregister(this);
		clearTimeout(this.takeOffTimeout);
		if (this.hold) {
			clearTimeout(this.hold.timeout);
			this.hold = void 0;
		}
		this.playersSynced.clear();
		this.middlewareHelper?.clean();
		this.customEmojis.clear();
		this.textColored.clear();
		this.lastPausedVideo = void 0;
	}
	getOffsets(offsetsMap = /* @__PURE__ */ new Map()) {
		if (!this.playersSynced.size) return offsetsMap;
		const overflowElement = findUpClassName(this, "scrollable") || this.offsetParent;
		if (!overflowElement) return offsetsMap;
		const overflowRect = overflowElement.getBoundingClientRect();
		const rect = this.getBoundingClientRect();
		for (const elements of this.playersSynced.keys()) {
			const elementsArr = Array.from(elements);
			const { visible } = getViewportSlice({
				overflowElement,
				overflowRect,
				elements: (this.isSelectable ? elementsArr.map((element) => element.placeholder) : elementsArr).filter((el) => !isHeldStill(el)),
				extraSize: this.size.height * 2.5
			});
			const offsets = visible.map(({ rect: elementRect }) => {
				return {
					top: elementRect.top - rect.top,
					left: elementRect.left - rect.left,
					width: elementRect.width
				};
			});
			if (offsets.length) offsetsMap.set(elements, offsets);
		}
		return offsetsMap;
	}
	diffOffsets(offsetsMap) {
		const groups = [];
		for (const [groupId, elements] of this.customEmojis) {
			const offsets = offsetsMap.get(elements);
			if (!offsets) continue;
			const last = this.lastSentOffsets.get(groupId);
			let changed = !last || last.length !== offsets.length * 3;
			if (!changed) for (let i = 0; i < offsets.length; ++i) {
				const { top, left, width } = offsets[i];
				if (last[i * 3] !== top || last[i * 3 + 1] !== left || last[i * 3 + 2] !== width) {
					changed = true;
					break;
				}
			}
			if (changed) {
				const flat = [];
				for (const { top, left, width } of offsets) flat.push(top, left, width);
				this.lastSentOffsets.set(groupId, flat);
				groups.push({
					groupId,
					offsets: flat
				});
			}
		}
		for (const groupId of this.lastSentOffsets.keys()) {
			const elements = this.customEmojis.get(groupId);
			if (elements && offsetsMap.has(elements)) continue;
			if (elements && isAnyElementVisible(elements)) continue;
			this.lastSentOffsets.delete(groupId);
			groups.push({
				groupId,
				offsets: []
			});
		}
		this.restoreAllPlaceholders(offsetsMap);
		return groups;
	}
	updateSuspended() {
		let suspended = false;
		for (const elements of this.playersSynced.keys()) for (const element of elements) {
			if (!element.paused) {
				this.setSuspended(false);
				return;
			}
			suspended = true;
		}
		this.setSuspended(suspended);
	}
	setSuspended(suspended) {
		if (this.lastSentSuspended !== suspended) {
			this.lastSentSuspended = suspended;
			this.sendCompositor("suspendRenderer", { suspended });
		}
	}
	/**
	* Whether the renderer is laid out right now - not in a tab hidden with `display: none`, not out
	* of the document. One that is not has nowhere to measure its emoji at, so it is left as it is.
	*/
	hasLayout() {
		return !!this.canvas.getClientRects().length;
	}
	/**
	* What, besides the layout, decides which emoji are measured and how they are sent: the groups,
	* which of them have a frame, which emoji are held still, which are in view. While it stays the
	* same and nothing moved, the last measurement still holds (`renderEmojis`)
	*/
	stateSignature() {
		let signature = this.customEmojis.size;
		for (const [elements, player] of this.playersSynced) {
			signature = signature * 31 + elements.size * 2 + +this.hasFrame(player) | 0;
			for (const element of elements) signature = signature * 31 + +isHeldStill(element) + 2 * +animationIntersector.isVisible(element) | 0;
		}
		return signature;
	}
	/**
	* Whether every emoji it draws is held still - in the sense `getOffsets` leaves an element out
	* for, so a static emoji (no synced player) is never among them. Such a renderer has nothing new
	* to draw, and none of its emoji has gone anywhere either.
	*/
	isEveryElementHeldStill() {
		if (this.isSelectable) return false;
		let any = false;
		for (const elements of this.playersSynced.keys()) for (const element of elements) {
			if (!isHeldStill(element)) return false;
			any = true;
		}
		return any;
	}
	clearCanvas() {
		if (this.offscreen) return;
		if (this.isCanvasClean) return;
		const { context, canvas } = this;
		context.clearRect(0, 0, canvas.width, canvas.height);
		this.isCanvasClean = true;
	}
	render(offsetsMap) {
		if (this.offscreen) return;
		const { context, canvas, isDimensionsSet } = this;
		if (!isDimensionsSet) this.setDimensionsFromRect(void 0, false);
		this.isCanvasClean = false;
		const { width, height, dpr } = canvas;
		const animationsEnabled = liteMode.isAvailable("emoji_appear");
		let _color;
		for (const [elements, offsets] of offsetsMap) {
			const player = this.playersSynced.get(elements);
			const frame = syncedPlayersFrames.get(player) || (player instanceof HTMLVideoElement ? player : void 0);
			if (!frame) continue;
			const isImageData = frame instanceof ImageData;
			let frameWidth, frameHeight;
			if (player instanceof HTMLVideoElement) {
				frameWidth = this.size.width * dpr;
				frameHeight = this.size.height * dpr;
			} else {
				frameWidth = frame.width;
				frameHeight = frame.height;
			}
			const elementWidth = Math.round(offsets[0].width * dpr);
			if (elementWidth !== frameWidth) {
				frameWidth = elementWidth;
				frameHeight = elementWidth;
			}
			height - frameHeight;
			const maxLeft = width - frameWidth;
			const color = this.textColored.has(elements) ? _color ?? (_color = customProperties.getProperty(this.textColor())) : void 0;
			let alpha = 1;
			if (animationsEnabled) {
				let startTime = elementsFadeInStartTimes.get(elements);
				if (startTime === void 0) {
					startTime = hasRasterThumbPlaceholder(elements) ? 0 : performance.now();
					elementsFadeInStartTimes.set(elements, startTime);
				}
				alpha = Math.min(1, (performance.now() - startTime) / 250);
			}
			const applyFade = alpha < 1 && !isImageData;
			if (!applyFade && !this.clearedElements.has(elements) && !this.isSelectable) {
				if (this.isSelectable) {
					elements.forEach((element) => {
						element.lastChildWas ?? (element.lastChildWas = element.lastChild);
						replaceContent(element, element.firstChild);
					});
					this.clearedElements.add(elements);
				} else this.clearPlaceholders(elements);
			}
			if (applyFade) context.globalAlpha = alpha;
			offsets.forEach(({ top, left }) => {
				top = Math.round(top * dpr), left = Math.round(left * dpr);
				if (left < 0 || left > maxLeft) return;
				if (isImageData) context.putImageData(frame, left, top);
				else context.drawImage(frame, left, top, frameWidth, frameHeight);
				if (color) applyColorOnContext(context, color, left, top, frameWidth, frameHeight);
			});
			if (applyFade) context.globalAlpha = 1;
		}
		for (const elements of this.customEmojis.values()) if (!offsetsMap.has(elements) && this.clearedElements.has(elements) && !isAnyElementVisible(elements)) this.restorePlaceholders(elements);
	}
	clearPlaceholders(elements) {
		elements.forEach((element) => {
			element.savedChildren ?? (element.savedChildren = Array.from(element.childNodes));
			element.replaceChildren();
		});
		this.clearedElements.add(elements);
	}
	restorePlaceholders(elements) {
		if (this.isSelectable) return;
		elements.forEach((element) => {
			const saved = element.savedChildren;
			if (saved?.length && !element.firstChild) element.replaceChildren(...saved);
		});
		this.onPlaceholdersShown(elements);
	}
	/** The group is shown by its placeholders again: they are cleared, and it fades in, once it is drawn anew */
	onPlaceholdersShown(elements, docId = elements.values().next().value?.docId) {
		if (this.offscreen && docId !== void 0) this.sendCompositor("resetFade", { groupId: docId });
		this.clearedElements.delete(elements);
		elementsFadeInStartTimes.delete(elements);
	}
	restoreAllPlaceholders(except) {
		for (const elements of this.customEmojis.values()) if (!except?.has(elements) && this.clearedElements.has(elements) && !isAnyElementVisible(elements)) this.restorePlaceholders(elements);
	}
	hasFrame(player) {
		if (this.offscreen) return player instanceof LottiePlayer && player.offscreen === "emoji" && player.hasRenderedFirstFrame;
		return syncedPlayersFrames.has(player) || player instanceof HTMLVideoElement;
	}
	/** Whether a group is on the canvas: its placeholders cleared for a player that has a frame. */
	isGroupDrawn(elements) {
		const player = this.playersSynced.get(elements);
		return this.clearedElements.has(elements) && !!player && this.hasFrame(player);
	}
	checkForAnyFrame() {
		for (const player of this.playersSynced.values()) if (this.hasFrame(player)) return true;
		return false;
	}
	remove() {
		super.remove();
	}
	setDimensionsFromRect(rect = this.lastRect, forceRenderAfter = true) {
		const { canvas } = this;
		const { dpr } = canvas;
		if (this.lastRect !== rect) this.lastRect = rect;
		if (!rect || !dpr || this.ignoreSettingDimensions) return;
		const { width, height } = rect;
		const newWidth = Math.floor(Math.round(width * dpr));
		const newHeight = Math.floor(Math.round(height * dpr));
		if (this.offscreen) {
			const { lastSentSize } = this;
			if (lastSentSize && lastSentSize.width === newWidth && lastSentSize.height === newHeight) return;
			this.lastSentSize = {
				width: newWidth,
				height: newHeight
			};
			this.sendCompositor("resizeRenderer", {
				width: newWidth,
				height: newHeight
			});
		} else {
			if (canvas.width === newWidth && canvas.height === newHeight) return;
			canvas.width = newWidth;
			canvas.height = newHeight;
		}
		this.isDimensionsSet = true;
		this.isCanvasClean = true;
		if (this.observeResizeElement || this.observeResizeElement === false) this.setCanvasCssSize(width, height);
		if (this.forceRenderAfterSize || this.isSelectable && forceRenderAfter) {
			this.forceRenderAfterSize = void 0;
			this.forceRender();
		}
	}
	forceRender() {
		if (!this.isDimensionsSet) return;
		if (!renderEmojis([this])) {
			if (this.offscreen) this.sendCompositor("clearRenderer");
			else this.clearCanvas();
		}
	}
	getPass() {
		if (!this.pass) {
			this.pass = {
				removed: false,
				added: /* @__PURE__ */ new Set(),
				emptied: /* @__PURE__ */ new Map()
			};
			queueMicrotask(this.endPass);
		}
		return this.pass;
	}
	onElementCleared(docId, elements) {
		if (this.destroyed) return;
		const pass = this.getPass();
		pass.removed = true;
		if (!elements.size) pass.emptied.set(docId, elements);
	}
	onGroupAdded(docId) {
		if (!this.isSelectable) this.getPass().added.add(docId);
	}
	isShowingPicture() {
		return this.offscreen ? !!this.lastSentOffsets.size : !this.isCanvasClean;
	}
	/** Whether a group that came in a pass is waited for (wrap: drawn without a placeholder or a fade) */
	isHeld(docId) {
		return !!this.hold?.groups.has(docId);
	}
	unhold(docId) {
		this.hold?.groups.delete(docId);
	}
	/** Whether the canvas still keeps its picture for groups that are loading (asked by the tick) */
	isHolding() {
		if (!this.hold) return false;
		for (const docId of this.hold.groups) {
			const elements = this.customEmojis.get(docId);
			const player = elements && this.playersSynced.get(elements);
			if (elements && !(player && this.hasFrame(player))) return true;
		}
		clearTimeout(this.hold.timeout);
		this.hold = void 0;
		return false;
	}
	scheduleTakeOffGoneGroups() {
		clearTimeout(this.takeOffTimeout);
		this.takeOffTimeout = window.setTimeout(this.takeOffGoneGroups, CUSTOM_EMOJI_FRAME_INTERVAL * 2);
	}
	releaseSyncedPlayer(syncedPlayer, docId) {
		if (syncedPlayer.middlewares.size) return;
		if (syncedPlayer.player) {
			this.playersSynced.forEach((player, elements) => {
				if (player === syncedPlayer.player) this.playersSynced.delete(elements);
			});
			const frame = syncedPlayersFrames.get(syncedPlayer.player);
			if (frame) {
				frame.close?.();
				syncedPlayersFrames.delete(syncedPlayer.player);
			}
			syncedPlayersFrames.delete(syncedPlayer.player);
			if (syncedPlayer.player instanceof LottiePlayer) {
				if (this.offscreen) compositorMessagePort.invokeCompositorVoid("detachPlayer", { playerReqId: syncedPlayer.player.reqId });
				syncedPlayer.player.overrideRender = noop;
				syncedPlayer.player.remove();
			} else if (syncedPlayer.player instanceof HTMLVideoElement) {
				const cacheName = framesCache.generateName("" + docId, 0, 0, void 0, void 0);
				delete videosCache[cacheName];
			}
			syncedPlayer.player = void 0;
		}
		if (syncedPlayers.get(syncedPlayer.key) === syncedPlayer && syncedPlayers.delete(syncedPlayer.key) && !syncedPlayers.size) clearRenderInterval();
	}
	async wrapPaidReactionEmoji(element) {
		const size = this.size;
		const player = await lottieLoader.loadAnimationAsAsset({
			container: element,
			width: size.width,
			height: size.height,
			loop: true,
			autoplay: CUSTOM_EMOJI_INSTANT_PLAY,
			sync: true
		}, "StarReaction");
		return {
			width: size.width,
			height: size.height,
			downloaded: true,
			load: () => Promise.resolve(player),
			render: void 0
		};
	}
	wrap({ doc, isPaidReactionEmoji, addCustomEmojis, usingOwnQueue, lazyLoadQueue, onlyThumb, withThumb, loadPromises }) {
		const renderer = this;
		const size = this.size;
		const managers = bindManagersToSession(rootScope.managers);
		const middleware = this.middlewareHelper.get();
		const docId = doc.id;
		const newElements = addCustomEmojis.get(docId);
		const customEmojis = renderer.customEmojis.get(docId);
		const newElementsArray = Array.from(newElements);
		const stickerType = doc.sticker ?? (this.renderNonSticker ? StickerType.Static : void 0);
		const isLottie = stickerType === StickerType.Lottie;
		const isStatic = newElementsArray[0].static || doc.mime_type === "video/webm" && !IS_WEBM_SUPPORTED;
		const willHaveSyncedPlayer = (isLottie || stickerType === StickerType.WebM && this.isSelectable) && !onlyThumb && !isStatic;
		const attribute = doc.attributes.find((attribute) => attribute._ === "documentAttributeCustomEmoji");
		if (attribute && attribute.pFlags.text_color) renderer.textColored.add(customEmojis);
		const cacheContext = apiManagerProxy.getCacheContext(doc);
		const isAlreadyAvailable = !!(cacheContext.downloaded && cacheContext.url);
		const loadStickerMiddleware = willHaveSyncedPlayer ? middleware.create().get(() => {
			return !!syncedPlayer.middlewares.size;
		}) : void 0;
		const willDomFade = !willHaveSyncedPlayer && !this.isSelectable && (stickerType === StickerType.Static || onlyThumb || isStatic || !isAlreadyAvailable) && liteMode.isAvailable("emoji_appear");
		const joinsDrawnGroup = !onlyThumb && renderer.isGroupDrawn(customEmojis);
		const held = willHaveSyncedPlayer && renderer.isHeld(docId);
		if (!willHaveSyncedPlayer) renderer.unhold(docId);
		else if (held) elementsFadeInStartTimes.set(customEmojis, 0);
		const _loadPromises = [];
		const promise = isPaidReactionEmoji ? this.wrapPaidReactionEmoji(newElementsArray[0]) : wrapSticker({
			div: newElementsArray,
			doc,
			width: size.width,
			height: size.height,
			loop: true,
			play: CUSTOM_EMOJI_INSTANT_PLAY,
			managers,
			isCustomEmoji: true,
			group: "none",
			loadPromises: _loadPromises,
			middleware,
			exportLoad: usingOwnQueue || lazyLoadQueue === false ? 2 : 1,
			needFadeIn: false,
			loadStickerMiddleware,
			static: isStatic,
			onlyThumb,
			withThumb: withThumb ?? (joinsDrawnGroup || held ? false : void 0),
			syncedVideo: this.isSelectable,
			textColor: renderer.textColor,
			keepThumb: willDomFade,
			compositorDelivery: this.offscreen || void 0
		});
		if (loadPromises) promise.then(() => loadPromises.push(..._loadPromises));
		const addition = { elements: newElements };
		const readyPromise = newElementsArray[0].readyPromise;
		if (readyPromise) promise.then(({ render }) => {
			if (!render) {
				readyPromise.resolve();
				return;
			}
			render.then(() => readyPromise.resolve(), readyPromise.reject.bind(readyPromise));
		});
		if (stickerType === StickerType.Static || onlyThumb || isStatic) {
			addition.onRender = () => {
				if (willDomFade) newElementsArray.forEach(preHideMediaWithThumbOverlay);
				return Promise.all(_loadPromises).then(() => {
					if (!middleware()) return;
					if (this.isSelectable) newElementsArray.forEach((element) => {
						const { placeholder } = element;
						placeholder.src = element.firstElementChild.src;
					});
					else newElementsArray.forEach(fadeInMediaAndCleanupThumbs);
				});
			};
			return promise.then((res) => ({
				...res,
				...addition
			}));
		}
		addition.onRender = (_p) => {
			if (willDomFade) newElementsArray.forEach(preHideMediaWithThumbOverlay);
			return Promise.all(_loadPromises).then(() => {
				if (!middleware() || !doc.animated) return;
				const players = Array.isArray(_p) ? _p : [_p];
				const player = Array.isArray(players) ? players[0] : players;
				assumeType(player);
				newElementsArray.forEach((element, idx) => {
					if (element.clean) return;
					const player = players[idx] || players[0];
					element.player = player;
					if (syncedPlayer) {
						element.syncedPlayer = syncedPlayer;
						if (joinsDrawnGroup || held) element.paused = false;
						if (element.paused) element.syncedPlayer.pausedElements.add(element);
						else if (player.paused) player.play();
					}
					if (element.isConnected || middleware()) animationIntersector.addAnimation({
						animation: element,
						group: element.renderer.animationGroup,
						observeElement: element.placeholder ?? element,
						controlled: true,
						type: "emoji"
					});
				});
				if (player instanceof LottiePlayer || player instanceof HTMLVideoElement && this.isSelectable) {
					syncedPlayer.player = player;
					if (renderer.customEmojis.get(docId) !== customEmojis) {
						this.releaseSyncedPlayer(syncedPlayer, docId);
						return;
					}
					renderer.playersSynced.set(customEmojis, player);
				}
				if (player instanceof LottiePlayer) {
					player.group = renderer.animationGroup;
					if (renderer.offscreen && player.offscreen === "emoji") {
						renderer.lastSentOffsets.delete(docId);
						renderer.sendCompositor("attachGroup", {
							groupId: docId,
							playerReqId: player.reqId,
							textColored: renderer.textColored.has(customEmojis),
							skipFade: held || hasRasterThumbPlaceholder(customEmojis)
						});
					} else {
						if (renderer.offscreen) console.warn("offscreen renderer received a legacy player", player, renderer);
						player.overrideRender ?? (player.overrideRender = (frame) => {
							syncedPlayersFrames.set(player, frame);
						});
					}
				} else if (player instanceof HTMLVideoElement) {}
				if (willHaveSyncedPlayer) {
					if (!renderer.offscreen) renderer.canvas.dpr = getLottiePixelRatio(this.size.width, this.size.height);
					setRenderInterval();
				} else if (!isAlreadyAvailable) newElementsArray.forEach(fadeInMediaAndCleanupThumbs);
			});
		};
		let syncedPlayer;
		const key = [
			docId,
			size.width,
			size.height,
			+!!this.offscreen
		].join("-");
		if (willHaveSyncedPlayer) {
			syncedPlayer = syncedPlayers.get(key);
			if (!syncedPlayer) {
				syncedPlayer = {
					player: void 0,
					middlewares: /* @__PURE__ */ new Set(),
					pausedElements: /* @__PURE__ */ new Set(),
					key
				};
				syncedPlayers.set(key, syncedPlayer);
			}
			for (const element of newElements) {
				const middleware = element.middlewareHelper.get();
				syncedPlayer.middlewares.add(middleware);
				middleware.onClean(this.onElementCleanup.bind(this, element, syncedPlayer, middleware));
			}
		}
		return promise.then((res) => ({
			...res,
			...addition
		}));
	}
	add({ addCustomEmojis, lazyLoadQueue, onlyThumb, withThumb }) {
		const renderer = this;
		const middleware = this.middlewareHelper.get();
		addCustomEmojis.forEach((addElements, docId) => {
			let elements = this.customEmojis.get(docId);
			if (!elements) {
				this.customEmojis.set(docId, elements = /* @__PURE__ */ new Set());
				this.onGroupAdded(docId);
			} else if (this.isSelectable) this.clearedElements.delete(elements);
			else if (onlyThumb && this.clearedElements.has(elements)) this.onPlaceholdersShown(elements, docId);
			for (const el of addElements) if (elements.has(el)) addElements.delete(el);
			else {
				el.clean = false;
				el.renderer = renderer;
				el.elements = elements;
				el.middlewareHelper = middleware.create();
				elements.add(el);
				if (el.lastChildWas && !el.lastChildWas.parentNode) el.append(el.lastChildWas);
			}
			if (!addElements.size) addCustomEmojis.delete(docId);
		});
		if (!addCustomEmojis.size) return;
		const usingOwnQueue = !!(!lazyLoadQueue && lazyLoadQueue !== false && globalLazyLoadQueue);
		const docIds = Array.from(addCustomEmojis.keys());
		const managers = bindManagersToSession(rootScope.managers);
		return managers.appEmojiManager.getCachedCustomEmojiDocuments(docIds).then((docs) => {
			if (!middleware()) return;
			const wrapOptions = {
				addCustomEmojis,
				usingOwnQueue,
				lazyLoadQueue,
				onlyThumb,
				withThumb
			};
			const loadPromises = [];
			const missing = [];
			const cachedPromises = docs.map((doc, idx) => {
				if (!doc) {
					const docId = docIds[idx];
					if (docId === "__PAID_REACTION_EMOJI__") return this.wrap({
						...wrapOptions,
						doc: {
							_: "document",
							id: docId,
							attributes: [],
							...this.isSelectable && {
								sticker: StickerType.Lottie,
								animated: true
							}
						},
						isPaidReactionEmoji: true,
						loadPromises
					});
					missing.push(docId);
					return;
				}
				return this.wrap({
					...wrapOptions,
					doc,
					loadPromises
				});
			}).filter(Boolean);
			const uncachedPromisesPromise = !missing.length ? Promise.resolve([]) : managers.appEmojiManager.getCustomEmojiDocuments(missing).then((docs) => {
				if (!middleware()) return [];
				return docs.filter(Boolean).map((doc) => this.wrap({
					...wrapOptions,
					doc
				}));
			});
			const loadFromPromises = async (_promises) => {
				const promises = (await Promise.all(_promises)).map(({ load, onRender, elements }) => {
					if (!load) return;
					const l = () => load().then(onRender);
					if (!usingOwnQueue) return l();
					elements.forEach((element) => {
						globalLazyLoadQueue.push({
							div: element,
							load: () => {
								elements.forEach((element) => {
									globalLazyLoadQueue.delete({ div: element });
								});
								return l();
							}
						});
					});
				});
				return Promise.all(promises.filter(Boolean));
			};
			const load = () => {
				if (!middleware()) return;
				const cached = loadFromPromises(cachedPromises);
				const uncached = uncachedPromisesPromise.then((promises) => loadFromPromises(promises));
				return Promise.all([cached, uncached]);
			};
			if (lazyLoadQueue) lazyLoadQueue.push({
				div: renderer.canvas,
				load,
				middleware
			});
			else load();
			return Promise.all(cachedPromises).then(() => Promise.all(loadPromises)).then(() => {});
		});
	}
	setTextColor(textColor) {
		this._setTextColor(textColor);
	}
	static create(options) {
		const renderer = new (customElements.get(TAG_NAME))();
		renderer.animationGroup = options.animationGroup;
		renderer.size = options.customEmojiSize || mediaSizes.active.customEmoji;
		renderer.isSelectable = options.isSelectable;
		renderer.offscreen = SHOULD_RENDER_OFFSCREEN && !options.isSelectable;
		if (renderer.offscreen) {
			renderer.rendererId = ++nextRendererId;
			const rendererId = renderer.rendererId;
			offscreenRenderers.set(rendererId, new WeakRef(renderer));
			collectedRenderers.register(renderer, () => offscreenRenderers.delete(rendererId), renderer);
			const dpr = renderer.canvas.dpr = getLottiePixelRatio(renderer.size.width, renderer.size.height);
			ensureCompositor();
			renderer.canvas.dataset.offscreen = "1";
			const offscreenCanvas = renderer.canvas.transferControlToOffscreen();
			renderer.sendCompositor("attachRenderer", {
				canvas: offscreenCanvas,
				dpr,
				fadeEnabled: liteMode.isAvailable("emoji_appear")
			}, [offscreenCanvas]);
		}
		[renderer._textColor, renderer._setTextColor] = createSignal();
		renderer.observeResizeElement = options.observeResizeElement;
		if (renderer.showsCommittedSize()) {
			renderer.classList.add("custom-emoji-renderer-committed-size");
			renderer.canvas.classList.add("custom-emoji-canvas-committed-size");
			renderer.canvas.style.setProperty("--dpr", "" + renderer.canvas.dpr);
		}
		renderer.renderNonSticker = options.renderNonSticker;
		if (options.wrappingDraft) {
			renderer.contentEditable = "false";
			renderer.style.height = "inherit";
		}
		const middleware = options.middleware;
		if (middleware) {
			renderer.middlewareHelper = middleware.create();
			renderer.middlewareHelper.get().onDestroy(() => {
				renderer.destroy?.();
			});
		} else {
			renderer.auto = true;
			renderer.middlewareHelper = getMiddleware();
		}
		createRoot((dispose) => {
			renderer.textColor = createMemo(() => renderer._textColor() || readValue(options.textColor));
			if (renderer.offscreen) createEffect(() => {
				const property = renderer.textColor();
				renderer.sendCompositor("configRenderer", { color: property ? customProperties.getProperty(property) : void 0 });
			});
			renderer.middlewareHelper.get().onDestroy(dispose);
		});
		return renderer;
	}
};
_CustomEmojiRendererElement = CustomEmojiRendererElement;
_CustomEmojiRendererElement.globalLazyLoadQueue = globalLazyLoadQueue;
var CUSTOM_EMOJI_INSTANT_PLAY = true;
var SYNCED_PLAYER_RELEASE_DELAY = 1e3;
var PASS_HOLD_TIMEOUT = 1e3;
/** Whether an element is kept out of what is drawn anew: paused, while its synced player plays on */
var isHeldStill = (element) => {
	return element instanceof CustomEmojiElement && !!element.syncedPlayer?.pausedElements?.has(element);
};
/** Whether a box is laid out at all: one hidden with `display: none` measures as no size */
var hasSize = (size) => !!(size.width && size.height);
var isAnyElementVisible = (elements) => {
	for (const element of elements) if (animationIntersector.isVisible(element)) return true;
	return false;
};
var hasRasterThumbPlaceholder = (elements) => {
	for (const element of elements) return !!element.querySelector?.("img");
	return false;
};
var emojiRenderInterval;
var emojiMeasureFrame;
var emojiMeasureWindow;
var lastEmojiMeasure = 0;
var emojiRenderers = /* @__PURE__ */ new Set();
var collectedRenderers = new FinalizationRegistry((release) => release());
var liveEmojiRenderers = () => {
	const live = [];
	for (const ref of emojiRenderers) {
		const renderer = ref.deref();
		if (!renderer) {
			emojiRenderers.delete(ref);
			continue;
		}
		live.push(renderer);
	}
	return live;
};
var syncedPlayers = /* @__PURE__ */ new Map();
var syncedPlayersFrames = /* @__PURE__ */ new Map();
var elementsFadeInStartTimes = /* @__PURE__ */ new WeakMap();
var nextRendererId = 0;
var offscreenRenderers = /* @__PURE__ */ new Map();
var getOffscreenRenderer = (rendererId) => {
	const ref = offscreenRenderers.get(rendererId);
	const renderer = ref?.deref();
	if (ref && !renderer) offscreenRenderers.delete(rendererId);
	return renderer;
};
hotListen(void 0, compositorMessagePort, "groupPainted", ({ rendererId, groupId }) => {
	const renderer = getOffscreenRenderer(rendererId);
	const elements = renderer?.customEmojis.get(groupId);
	if (!elements || !renderer.isConnected || renderer.clearedElements.has(elements)) return;
	renderer.clearPlaceholders(elements);
});
var forEachOffscreenRenderer = (callback) => {
	for (const rendererId of Array.from(offscreenRenderers.keys())) {
		const renderer = getOffscreenRenderer(rendererId);
		if (renderer) callback(renderer);
	}
};
hotListen(void 0, rootScope, "theme_changed", () => {
	forEachOffscreenRenderer((renderer) => {
		const property = renderer.textColor();
		if (property) renderer.sendCompositor("configRenderer", { color: customProperties.getProperty(property) });
	});
});
hotEffect(void 0, () => createRoot((dispose) => {
	createEffect(on(() => liteMode.isAvailable("emoji_appear"), (fadeEnabled) => {
		forEachOffscreenRenderer((renderer) => renderer.sendCompositor("configRenderer", { fadeEnabled }));
	}, { defer: true }));
	return dispose;
}));
/**
* Draws the emoji, and with `measure` reads where they are. Without it (the timer's ticks, between
* frames) nothing is read: a renderer whose state did not change since it was last measured keeps
* what it was measured at - an offscreen one has nothing to do then, a legacy one draws at the
* offsets it has - and one whose state did change asks for a measurement in the next frame
* (`layoutWatch.ts` tells when the layout itself may have changed). Only a measurement of every
* renderer settles what the watch was told: one of some (`forceRender`) leaves it for the next frame's
*/
var renderEmojis = (renderers, measure = true) => {
	const t = (renderers ?? liveEmojiRenderers()).filter((r) => r.isConnected && r.checkForAnyFrame() && !r.ignoreSettingDimensions);
	if (measure && !renderers) {
		lastEmojiMeasure = performance.now();
		return measureEmojiLayout(() => t.length ? renderEmojisPass(t, true) : false);
	}
	return t.length ? renderEmojisPass(t, measure) : false;
};
var renderEmojisPass = (t, measure) => {
	const legacy = [];
	const batch = [];
	for (const renderer of t) {
		if (renderer.isHolding()) continue;
		if (renderer.offscreen) renderer.updateSuspended();
		const paused = [...renderer.playersSynced.values()].reduce((acc, v) => acc + +!!v.paused, 0);
		if (renderer.playersSynced.size === paused) continue;
		if (renderer.isEveryElementHeldStill()) continue;
		const signature = renderer.stateSignature();
		let offsets;
		if (!measure) {
			if (signature !== renderer.measuredSignature) {
				markEmojiLayoutChanged();
				continue;
			}
			if (renderer.offscreen || !renderer.measuredOffsets) continue;
			offsets = renderer.measuredOffsets;
		} else {
			renderer.measuredSignature = signature;
			renderer.measuredOffsets = void 0;
			if (!renderer.hasLayout()) continue;
			offsets = renderer.getOffsets();
			if (!renderer.offscreen) renderer.measuredOffsets = offsets;
		}
		if (renderer.offscreen) {
			const groups = renderer.diffOffsets(offsets);
			if (groups.length) batch.push({
				rendererId: renderer.rendererId,
				groups
			});
		} else if (offsets.size) legacy.push([renderer, offsets]);
		else renderer.restoreAllPlaceholders();
	}
	if (batch.length) compositorMessagePort.invokeCompositorVoid("setOffsets", { batch });
	for (const [renderer] of legacy) renderer.clearCanvas();
	for (const [renderer, offsets] of legacy) renderer.render(offsets);
	return true;
};
var EMOJI_MEASURE_ANYWAY_MS = 1e3;
var onRenderTick = () => {
	renderEmojis(void 0, performance.now() - lastEmojiMeasure >= EMOJI_MEASURE_ANYWAY_MS);
};
var onMeasureFrame = () => {
	emojiMeasureFrame = void 0;
	renderEmojis(void 0, true);
	if (isEmojiLayoutMoving()) requestEmojiMeasure();
};
var requestEmojiMeasure = () => {
	if (!emojiRenderInterval) return;
	const win = getAppWindow();
	if (emojiMeasureFrame) {
		if (emojiMeasureWindow === win) return;
		emojiMeasureWindow.cancelAnimationFrame(emojiMeasureFrame);
	}
	emojiMeasureWindow = win;
	emojiMeasureFrame = win.requestAnimationFrame(onMeasureFrame);
};
var isEmojiLayoutRelevant = (node) => {
	for (const ref of emojiRenderers) {
		const renderer = ref.deref();
		if (renderer && (node.contains(renderer) || renderer.parentElement?.contains(node))) return true;
	}
	return false;
};
var setRenderInterval = () => {
	if (emojiRenderInterval) return;
	emojiRenderInterval = window.setInterval(onRenderTick, CUSTOM_EMOJI_FRAME_INTERVAL);
	watchEmojiLayout(requestEmojiMeasure, isEmojiLayoutRelevant);
	requestEmojiMeasure();
};
var clearRenderInterval = () => {
	if (!emojiRenderInterval) return;
	clearInterval(emojiRenderInterval);
	emojiMeasureWindow?.cancelAnimationFrame(emojiMeasureFrame);
	emojiRenderInterval = emojiMeasureFrame = void 0;
	emojiMeasureWindow = void 0;
	unwatchEmojiLayout();
};
var domFadeIns = /* @__PURE__ */ new Set();
var domFadeRaf;
var stepDomFadeIns = () => {
	const now = performance.now();
	for (const fade of domFadeIns) {
		const alpha = Math.min(1, (now - fade.startTime) / 250);
		if (alpha >= 1) {
			fade.element.style.removeProperty("opacity");
			fade.element.style.removeProperty("will-change");
			domFadeIns.delete(fade);
		} else fade.element.style.setProperty("opacity", String(alpha));
	}
	domFadeRaf = domFadeIns.size ? requestAnimationFrame(stepDomFadeIns) : void 0;
};
var startDomFadeIn = (element) => {
	if (!liteMode.isAvailable("emoji_appear")) return;
	element.style.setProperty("opacity", "0");
	domFadeIns.add({
		element,
		startTime: performance.now()
	});
	if (!domFadeRaf) domFadeRaf = requestAnimationFrame(stepDomFadeIns);
};
var preHideMediaWithThumbOverlay = (el) => {
	const media = el.querySelector(".media-sticker:not(.thumbnail)");
	if (media instanceof HTMLElement) {
		media.style.setProperty("opacity", "0");
		media.style.setProperty("will-change", "opacity");
	}
	const thumb = el.querySelector(".thumbnail");
	if (thumb instanceof HTMLElement) {
		thumb.style.setProperty("position", "absolute");
		thumb.style.setProperty("top", "0");
		thumb.style.setProperty("left", "0");
	}
};
var fadeInMediaAndCleanupThumbs = (el) => {
	const media = el.querySelector(".media-sticker:not(.thumbnail)");
	if (!(media instanceof HTMLElement)) return;
	startDomFadeIn(media);
	setTimeout(() => {
		el.querySelectorAll(".thumbnail").forEach((t) => t.remove());
	}, 250);
};
window.syncedPlayers = syncedPlayers;
window.emojiRenderers = emojiRenderers;
if (!customElements.get(TAG_NAME)) customElements.define(TAG_NAME, CustomEmojiRendererElement);
//#endregion
export { getViewportSlice as A, RICH_TEXT_BUTTON_SELECTOR as B, createCodeHeaderButton as C, BOM_REG_EXP as D, wrapTelegramUrlToAnchor as E, VisibilityIntersector as F, TEXT_LINK_ATTRIBUTE as I, getLinkFirstChild as L, LazyLoadQueue as M, LazyLoadQueueIntersector as N, encodeEntities as O, findAndSpliceAll as P, holdLinkPlate as R, highlightCodeAuto as S, toggleCodeBlockWrap as T, getRichTextButton as V, LETTER_REG_EXP as _, ENTITY_ELEMENT_MAP as a, detectCodeLanguage as b, isCustomFillerNeededBySiblingNode as c, replaceNonNumber as d, MESSAGE_LINK_ENTITY_SELECTOR as f, isSuspiciousUrl as g, isMaskedUrlTrusted as h, CustomEmojiElement as i, getVisibleRect as j, buildURLHash as k, makeQuoteCollapsable as l, filterDisabledEntities as m, markEmojiLayoutMoving as n, createCustomFiller as o, MESSAGE_LINK_ENTITY_TYPES as p, PAID_REACTION_EMOJI_DOCID as r, insertCustomFillers as s, CustomEmojiRendererElement as t, wrapRichText as u, CodeLanguageAliases as v, getCodeBlockClickTarget as w, highlightCode as x, CodeLanguageMap as y, listenForLinkPress as z };
