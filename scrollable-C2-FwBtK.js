//# allFunctionsCalledOnLoad
import { c as IS_MOBILE_SAFARI, l as IS_SAFARI, p as MOUNT_CLASS_TO } from "./userAgent-ByGXcznk.js";
import { t as IS_TOUCH_SUPPORTED } from "./touchSupport-B2RWO3zD.js";
import { r as fastRafPromise } from "./schedulers-Cx0-7a1P.js";
import { n as logger, t as LogTypes } from "./logger-7zf0rNYS.js";
import { t as bindActiveWindowListener } from "./appWindow-bo-KtJhy.js";
import { t as cancelEvent } from "./cancelEvent-Cw8vYZHp.js";
import { t as clamp } from "./clamp-9UaNhw6N.js";
import { t as liteMode } from "./liteMode-DeLStZfQ.js";
import { i as useHeavyAnimationCheck_default, n as getHeavyAnimationPromise, t as dispatchHeavyAnimationEvent } from "./useHeavyAnimationCheck-sWeBPI3f.js";
import { t as IS_OVERLAY_SCROLL_SUPPORTED } from "./overlayScrollSupport-D1vWJ9aT.js";
import { n as isInDOM } from "./sequentialDom-CRhA0kB2.js";
import { n as isElementRTL, t as isDocumentRTL } from "./isDocumentRTL-z8ksM2Dv.js";
import { t as WeakRefSet } from "./weakRefSet-BoUw0io0.js";
import { a as getAnimationInstance, i as createAnimationInstance, n as animateSingle, r as cancelAnimationByKey } from "./animation-Dd3Xpw_9.js";
//#region src/helpers/fastSmoothScroll.ts
var MIN_JS_DURATION = 250;
var LONG_TRANSITION_MAX_DISTANCE = 1500;
var SHORT_TRANSITION_MAX_DISTANCE = 500;
/** A scroll that follows its element (`follow`) stays with it after arriving until it holds still this long… */
var FOLLOW_SETTLE_DURATION = 1e3;
/** …and no longer than this. */
var FOLLOW_MAX_DURATION = 3e3;
/** What the person does that takes the scroll over from a scroll following its element. */
var FOLLOW_INPUT_EVENTS = [
	"wheel",
	"touchstart",
	"pointerdown"
];
var FocusDirection = /* @__PURE__ */ function(FocusDirection) {
	FocusDirection[FocusDirection["Up"] = 0] = "Up";
	FocusDirection[FocusDirection["Down"] = 1] = "Down";
	FocusDirection[FocusDirection["Static"] = 2] = "Static";
	return FocusDirection;
}({});
function fastSmoothScrollToStart(container, axis, forceDuration) {
	return fastSmoothScroll({
		container,
		element: container,
		getElementPosition: () => -(axis === "x" ? Math.abs(container.scrollLeft) : container.scrollTop),
		position: "start",
		axis,
		forceDuration
	});
}
function fastSmoothScroll(options) {
	options.margin ?? (options.margin = 0);
	options.maxDistance ?? (options.maxDistance = LONG_TRANSITION_MAX_DISTANCE);
	options.axis ?? (options.axis = "y");
	if (!liteMode.isAvailable("motion") || options.forceDuration === 0) options.forceDirection = 2;
	if (options.forceDirection === 2) {
		options.forceDuration = 0;
		return scrollWithJs(options);
	}
	const promise = fastRafPromise().then(() => scrollWithJs(options));
	return options.axis === "y" ? dispatchHeavyAnimationEvent(promise) : promise;
}
function scrollWithJs(options) {
	const { element, container, getNormalSize, getElementPosition, transitionFunction, axis, margin, position, forceDirection, maxDistance, forceDuration } = options;
	if (!isInDOM(element)) {
		cancelAnimationByKey(container);
		return Promise.resolve();
	}
	const isRTL = axis === "x" && !!container.getBoundingClientRect && isElementRTL(container);
	const sign = isRTL ? -1 : 1;
	const rectStartKey = axis === "y" ? "top" : isRTL ? "right" : "left";
	const rectEndKey = axis === "y" ? "bottom" : isRTL ? "left" : "right";
	const sizeKey = axis === "y" ? "height" : "width";
	const scrollSizeKey = axis === "y" ? "scrollHeight" : "scrollWidth";
	const elementScrollSizeKey = axis === "y" ? "scrollHeight" : "offsetWidth";
	const scrollPositionKey = axis === "y" ? "scrollTop" : "scrollLeft";
	const elementRect = element.getBoundingClientRect();
	const containerRect = container.getBoundingClientRect ? container.getBoundingClientRect() : document.body.getBoundingClientRect();
	const measureFocus = () => position === "center" || position === "nearest" ? options.getFocus?.() : void 0;
	const focus = measureFocus();
	const getPosition = (rect) => {
		const possibleElementPosition = (rect[rectStartKey] - containerRect[rectStartKey]) * sign;
		return getElementPosition ? getElementPosition({
			elementRect: rect,
			containerRect,
			elementPosition: possibleElementPosition
		}) : possibleElementPosition;
	};
	const elementPosition = getPosition(elementRect) + (focus?.offset ?? 0);
	const elementSize = focus ? focus.height : element[elementScrollSizeKey];
	const containerSize = getNormalSize ? getNormalSize({ rect: containerRect }) : containerRect[sizeKey];
	let scrollPosition = container[scrollPositionKey] * sign;
	const scrollSize = container[scrollSizeKey];
	let path;
	switch (position) {
		case "start":
			path = elementPosition - margin;
			break;
		case "end":
			path = (elementRect[rectEndKey] - containerRect[rectEndKey]) * sign + margin;
			break;
		case "nearest":
		case "center": if (elementSize < containerSize) path = elementPosition + elementSize / 2 - containerSize / 2;
		else {
			const fallback = !focus && options.fallbackToElementStartWhenCentering;
			path = (fallback && fallback !== element && isInDOM(fallback) ? getPosition(fallback.getBoundingClientRect()) : elementPosition) - margin;
		}
	}
	const alignedPosition = scrollPosition + path;
	const getMaxScrollPosition = () => container[scrollSizeKey] - containerSize;
	if (position === "center" || position === "nearest") {
		const maxScrollPosition = getMaxScrollPosition();
		if (path + scrollPosition > maxScrollPosition) path = Math.max(0, maxScrollPosition - scrollPosition);
		else if (path + scrollPosition < 0) path = Math.min(0, -scrollPosition);
	}
	const following = options.follow && axis === "y";
	const getAlignedOffset = (focus) => {
		const contentTop = container.getBoundingClientRect().top - container.scrollTop;
		const rect = element.getBoundingClientRect();
		if (position === "start") return rect.top - contentTop;
		if (position === "end") return rect.bottom - contentTop;
		if (focus) {
			const top = rect.top - contentTop + focus.offset;
			return focus.height < containerSize ? top + (focus.height - containerSize) / 2 : top - margin;
		}
		const size = element[elementScrollSizeKey];
		if (size < containerSize) return rect.top - contentTop + (size - containerSize) / 2;
		const fallback = options.fallbackToElementStartWhenCentering;
		return (fallback && fallback !== element && isInDOM(fallback) ? fallback.getBoundingClientRect().top : rect.top) - contentTop - margin;
	};
	const startOffset = following ? getAlignedOffset(focus) : 0;
	let drift = 0;
	const getFollowedPosition = () => {
		if (isInDOM(element)) drift = getAlignedOffset(measureFocus()) - startOffset;
		return clamp(alignedPosition + drift, 0, Math.max(0, getMaxScrollPosition()));
	};
	if (Math.abs(path) < 1) {
		cancelAnimationByKey(container);
		if (following) followAfterArrival(container, getFollowedPosition);
		return Promise.resolve();
	}
	let jumpToScrollPosition;
	if (axis === "y") {
		if (forceDirection === void 0) {
			if (path > maxDistance) {
				jumpToScrollPosition = scrollPosition += path - maxDistance;
				path = maxDistance;
			} else if (path < -maxDistance) {
				jumpToScrollPosition = scrollPosition += path + maxDistance;
				path = -maxDistance;
			}
		}
	}
	if (path < 0) {
		const remainingPath = -scrollPosition;
		path = Math.max(path, remainingPath);
	} else if (path > 0) {
		const remainingPath = scrollSize - (scrollPosition + containerSize);
		path = Math.min(path, remainingPath);
	}
	const target = scrollPosition + path;
	const absPath = Math.abs(path);
	const duration = forceDuration ?? MIN_JS_DURATION + absPath / LONG_TRANSITION_MAX_DISTANCE * 350;
	const startAt = Date.now();
	const transition = transitionFunction ?? (absPath < SHORT_TRANSITION_MAX_DISTANCE ? shortTransition : longTransition);
	const getProgress = () => duration ? Math.min((Date.now() - startAt) / duration, 1) : 1;
	let destination;
	const tick = () => {
		if (jumpToScrollPosition !== void 0) {
			container[scrollPositionKey] = jumpToScrollPosition;
			jumpToScrollPosition = void 0;
		}
		const t = getProgress();
		const value = transition(t);
		const currentPath = path * (1 - value);
		destination = following ? getFollowedPosition() : target;
		container[scrollPositionKey] = Math.round(destination - currentPath) * sign;
		return t < 1;
	};
	if (!duration || !path) {
		cancelAnimationByKey(container);
		tick();
		if (following) followAfterArrival(container, getFollowedPosition, destination);
		return Promise.resolve();
	}
	if (options.startCallback) {
		const distanceToEnd = scrollSize - Math.round(target + container[axis === "y" ? "offsetHeight" : "offsetWidth"]);
		options.startCallback({
			scrollSize,
			scrollPosition,
			distanceToEnd,
			path,
			duration,
			containerRect,
			elementRect,
			getProgress
		});
	}
	const instance = createAnimationInstance(container);
	animateSingle(tick, container, instance);
	if (following) instance.deferred.then(() => {
		if (!instance.isCancelled) followAfterArrival(container, getFollowedPosition, destination);
	});
	return instance.deferred;
}
/**
* Keeps a scroll that has arrived with its element (`follow`) while the element still moves — a widget near it starting
* as it comes into view — until it holds still for FOLLOW_SETTLE_DURATION, the person scrolls, or another scroll of the
* container begins. `from`: where the scroll was taken to as it arrived (none: where the element is now).
*/
function followAfterArrival(container, getTarget, from = getTarget()) {
	const instance = createAnimationInstance(container);
	const arrivedAt = Date.now();
	let movedAt = arrivedAt, last = from;
	const onInput = () => {
		if (getAnimationInstance(container) === instance) cancelAnimationByKey(container);
	};
	FOLLOW_INPUT_EVENTS.forEach((type) => container.addEventListener(type, onInput, {
		passive: true,
		capture: true
	}));
	const unbindKeys = bindActiveWindowListener((win) => win, "keydown", onInput, { capture: true });
	instance.deferred.then(() => {
		FOLLOW_INPUT_EVENTS.forEach((type) => container.removeEventListener(type, onInput, { capture: true }));
		unbindKeys();
	});
	animateSingle(() => {
		const now = Date.now();
		const target = getTarget();
		if (target !== last) {
			last = target;
			movedAt = now;
			container.scrollTop = Math.round(target);
		}
		return now - movedAt < FOLLOW_SETTLE_DURATION && now - arrivedAt < FOLLOW_MAX_DURATION;
	}, container, instance);
}
function longTransition(t) {
	return 1 - (1 - t) ** 5;
}
function shortTransition(t) {
	return 1 - (1 - t) ** 3.5;
}
//#endregion
//#region src/components/scrollable.ts
var SCROLL_THROTTLE = 24;
function throttleMeasurement(callback) {
	if (!IS_OVERLAY_SCROLL_SUPPORTED()) return requestAnimationFrame(callback);
	return window.setTimeout(callback, SCROLL_THROTTLE);
}
function cancelMeasurement(id) {
	if (!IS_OVERLAY_SCROLL_SUPPORTED()) cancelAnimationFrame(id);
	else window.clearTimeout(id);
}
var listeningScrollables = new WeakRefSet();
var subscribedToWindow = false;
MOUNT_CLASS_TO && (MOUNT_CLASS_TO.listeningScrollables = listeningScrollables);
var subscribeToWindow = () => {
	if (subscribedToWindow) return;
	subscribedToWindow = true;
	window.addEventListener("resize", () => listeningScrollables.forEachLive((scrollable) => scrollable.onScroll()), { passive: true });
	useHeavyAnimationCheck_default(() => listeningScrollables.forEachLive((scrollable) => scrollable.onHeavyAnimationStart()), () => listeningScrollables.forEachLive((scrollable) => scrollable.onHeavyAnimationEnd()));
};
var ScrollableBase = class {
	constructor(el, logPrefix = "", container = document.createElement("div")) {
		this.el = el;
		this.container = container;
		this.onScrollMeasure = 0;
		this.lastScrollPosition = 0;
		this.lastScrollDirection = 0;
		this.isHeavyAnimationInProgress = false;
		this.needCheckAfterAnimation = false;
		this.onScroll = () => {
			if (this.isHeavyAnimationInProgress) {
				this.cancelMeasure();
				this.needCheckAfterAnimation = true;
				return;
			}
			if (!this.onScrolledTop && !this.onScrolledBottom && !this.splitUp && !this.onAdditionalScroll) return;
			if (this.onScrollMeasure) return;
			this.onScrollMeasure = throttleMeasurement(() => {
				this.onScrollMeasure = 0;
				const scrollPosition = this.scrollPosition;
				this.lastScrollDirection = this.lastScrollPosition === scrollPosition ? 0 : this.lastScrollPosition < scrollPosition ? 1 : -1;
				this.lastScrollPosition = scrollPosition;
				this.updateThumb(scrollPosition);
				if (this.onAdditionalScroll) this.onAdditionalScroll();
				if (this.checkForTriggers) this.checkForTriggers();
			});
		};
		this.onMouseMove = (e) => {
			cancelEvent(e);
			const contentHeight = this.scrollSize;
			const viewportHeight = this.clientSize;
			const scrollbarSize = this.thumb.offsetHeight;
			const maxScrollTop = contentHeight - viewportHeight;
			const maxScrollbarOffset = viewportHeight - scrollbarSize;
			const scrollAmount = (e[this.clientAxis] - this.startMousePosition) / maxScrollbarOffset * maxScrollTop;
			const newScrollTop = this.startScrollPosition + scrollAmount;
			this.scrollPosition = newScrollTop;
		};
		this.onMouseDown = (e) => {
			cancelEvent(e);
			this.startMousePosition = e[this.clientAxis];
			this.startScrollPosition = this.scrollPosition;
			this.thumb.classList.add("is-focused");
			const w = this.thumb.ownerDocument.defaultView || window;
			w.addEventListener("mousemove", this.onMouseMove);
			w.addEventListener("mouseup", this.onMouseUp, { once: true });
		};
		this.onMouseUp = (e) => {
			(this.thumb.ownerDocument.defaultView || window).removeEventListener("mousemove", this.onMouseMove);
			this.thumb.classList.remove("is-focused");
		};
		this.container.classList.add("scrollable");
		this.log = logger("SCROLL" + (logPrefix ? "-" + logPrefix : ""), LogTypes.Error);
		if (el) {
			Array.from(el.children).forEach((c) => this.container.append(c));
			el.append(this.container);
		}
	}
	addScrollListener() {
		if (this.addedScrollListener) return;
		this.addedScrollListener = true;
		this.container.addEventListener("scroll", this.onScroll, {
			passive: true,
			capture: true
		});
	}
	removeScrollListener() {
		if (!this.addedScrollListener) return;
		this.addedScrollListener = false;
		this.container.removeEventListener("scroll", this.onScroll, { capture: true });
	}
	setListeners() {
		if (this.selfRef) return;
		subscribeToWindow();
		this.selfRef = listeningScrollables.track(this);
		this.addScrollListener();
		if (!getHeavyAnimationPromise().isFulfilled) this.onHeavyAnimationStart();
	}
	onHeavyAnimationStart() {
		this.isHeavyAnimationInProgress = true;
		if (this.onScrollMeasure) {
			this.cancelMeasure();
			this.needCheckAfterAnimation = true;
		}
	}
	onHeavyAnimationEnd() {
		this.isHeavyAnimationInProgress = false;
		if (this.needCheckAfterAnimation) {
			this.onScroll();
			this.needCheckAfterAnimation = false;
		}
	}
	removeListeners() {
		if (!this.selfRef) return;
		listeningScrollables.delete(this.selfRef);
		this.selfRef = void 0;
		if (this.thumb) {
			this.thumb.removeEventListener("mousedown", this.onMouseMove);
			window.removeEventListener("mousemove", this.onMouseMove);
			window.removeEventListener("mouseup", this.onMouseUp);
		}
		this.removeScrollListener();
	}
	destroy() {
		this.removeListeners();
		this.onAdditionalScroll = void 0;
		this.onScrolledTop = void 0;
		this.onScrolledBottom = void 0;
	}
	prepend(...elements) {
		const prependTo = this.splitUp || this.padding || this.container;
		this.thumb && elements.unshift(this.thumbContainer);
		prependTo.prepend(...elements);
		this.onSizeChange();
	}
	append(...elements) {
		(this.splitUp || this.padding || this.container).append(...elements);
		this.onSizeChange();
	}
	scrollIntoViewNew(options) {
		return fastSmoothScroll({
			...options,
			container: this.container
		});
	}
	updateThumb(scrollPosition = this.scrollPosition) {
		if (IS_OVERLAY_SCROLL_SUPPORTED() || !this.thumb) return;
		const scrollSize = this.container[this.scrollSizeProperty];
		const clientSize = this.container[this.clientSizeProperty];
		const divider = scrollSize / clientSize / .75;
		const thumbSize = Math.max(20, clientSize / divider);
		const value = scrollPosition / (scrollSize - clientSize) * clientSize;
		const b = scrollPosition / (scrollSize - clientSize);
		const maxValue = clientSize - thumbSize;
		if (clientSize < scrollSize) {
			this.thumb.style.height = thumbSize + "px";
			this.thumb.style.transform = `translateY(${Math.min(maxValue, value - thumbSize * b)}px)`;
		} else this.thumb.style.height = "0px";
	}
	cancelMeasure() {
		if (this.onScrollMeasure) {
			cancelMeasurement(this.onScrollMeasure);
			this.onScrollMeasure = 0;
		}
	}
	onSizeChange() {
		if (!IS_OVERLAY_SCROLL_SUPPORTED() && this.thumb) this.onScroll();
	}
	getDistanceToEnd() {
		return this.scrollSize - Math.round(this.scrollPosition + this.offsetSize);
	}
	get isScrolledToEnd() {
		return this.getDistanceToEnd() <= 1;
	}
	get scrollPosition() {
		return this.container[this.scrollPositionProperty];
	}
	set scrollPosition(value) {
		this.container[this.scrollPositionProperty] = value;
	}
	get scrollSize() {
		return this.container[this.scrollSizeProperty];
	}
	get clientSize() {
		return this.container[this.clientSizeProperty];
	}
	get offsetSize() {
		return this.container[this.offsetSizeProperty];
	}
	get firstElementChild() {
		return this.thumb ? this.thumbContainer.nextElementSibling : this.container.firstElementChild;
	}
	setScrollPositionSilently(value) {
		this.lastScrollPosition = value;
		this.ignoreNextScrollEvent();
		this.scrollPosition = value;
	}
	ignoreNextScrollEvent() {
		if (this.selfRef) {
			this.removeScrollListener();
			this.container.addEventListener("scroll", (e) => {
				cancelEvent(e);
				this.addScrollListener();
			}, {
				capture: true,
				passive: false,
				once: true
			});
		}
	}
	replaceChildren(...args) {
		this.thumb && args.unshift(this.thumbContainer);
		this.container.replaceChildren(...args);
	}
};
var Scrollable = class extends ScrollableBase {
	constructor(el, logPrefix = "", onScrollOffset = 300, withPaddingContainer, container) {
		super(el, logPrefix, container);
		this.onScrollOffset = onScrollOffset;
		this.loadedAll = {
			top: true,
			bottom: false
		};
		this.checkForTriggers = () => {
			if (!this.onScrolledTop && !this.onScrolledBottom) return;
			if (this.isHeavyAnimationInProgress) {
				this.onScroll();
				return;
			}
			const { scrollSize, scrollPosition, clientSize } = this;
			if (!scrollSize) return;
			const maxScrollPosition = scrollSize - clientSize;
			if (this.onScrolledTop && scrollPosition <= this.onScrollOffset && this.lastScrollDirection <= 0) this.onScrolledTop();
			if (this.onScrolledBottom && maxScrollPosition - scrollPosition <= this.onScrollOffset && this.lastScrollDirection >= 0) this.onScrolledBottom();
		};
		this.scrollPositionProperty = "scrollTop";
		this.scrollSizeProperty = "scrollHeight";
		this.clientSizeProperty = "clientHeight";
		this.offsetSizeProperty = "offsetHeight";
		this.clientAxis = "clientY";
		if (!IS_OVERLAY_SCROLL_SUPPORTED()) {
			this.thumbContainer = document.createElement("div");
			this.thumbContainer.classList.add("scrollable-thumb-container");
			this.thumb = document.createElement("div");
			this.thumb.classList.add("scrollable-thumb");
			this.thumbContainer.append(this.thumb);
			this.container.prepend(this.thumbContainer);
			this.thumb.addEventListener("mousedown", this.onMouseDown);
		}
		this.container.classList.add("scrollable-y");
		if (IS_SAFARI && !IS_MOBILE_SAFARI) this.container.classList.add("no-scrollbar");
		this.setListeners();
	}
	attachBorderListeners(setClassOn = this.container) {
		const cb = this.onAdditionalScroll;
		this.onAdditionalScroll = () => {
			cb?.();
			setClassOn.classList.toggle("scrolled-start", !this.scrollPosition);
			setClassOn.classList.toggle("scrolled-end", this.isScrolledToEnd);
		};
		setClassOn.classList.add("scrolled-start", "scrolled-end", "scrollable-y-bordered");
	}
	setVirtualContainer(el) {
		this.splitUp = el;
		this.log("setVirtualContainer:", el, this);
	}
};
var ScrollableX = class extends ScrollableBase {
	constructor(el, logPrefix = "", onScrollOffset = 300, splitCount = 15, container = document.createElement("div")) {
		super(el, logPrefix, container);
		this.onScrollOffset = onScrollOffset;
		this.splitCount = splitCount;
		this.container = container;
		this.container.classList.add("scrollable-x");
		if (!IS_TOUCH_SUPPORTED) {
			const scrollHorizontally = (e) => {
				e.stopPropagation();
				if (!e.deltaX && this.container.scrollWidth > this.container.clientWidth) {
					this.container.scrollLeft += e.deltaY / 4 * (isDocumentRTL() ? -1 : 1);
					cancelEvent(e);
				}
			};
			this.container.addEventListener("wheel", scrollHorizontally, { passive: false });
		}
		this.scrollPositionProperty = "scrollLeft";
		this.scrollSizeProperty = "scrollWidth";
		this.clientSizeProperty = "clientWidth";
		this.offsetSizeProperty = "offsetWidth";
	}
	get scrollPosition() {
		return Math.abs(this.container.scrollLeft);
	}
	set scrollPosition(value) {
		this.container.scrollLeft = isDocumentRTL() ? -value : value;
	}
};
//#endregion
export { fastSmoothScrollToStart as a, fastSmoothScroll as i, ScrollableX as n, FocusDirection as r, Scrollable as t };
