//# allFunctionsCalledOnLoad
import { c as IS_MOBILE_SAFARI, h as Modes, l as IS_SAFARI } from "./userAgent-ByGXcznk.js";
import { t as IS_TOUCH_SUPPORTED } from "./touchSupport-B2RWO3zD.js";
import { C as createSignal, L as untrack, M as onCleanup, _ as createMemo, f as children, g as createEffect, h as createContext, j as on, p as createComponent, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { t as cancelEvent } from "./cancelEvent-Cw8vYZHp.js";
import { _ as use, a as classList, c as insert, f as setAttribute, g as template, h as style, o as className, r as addEventListener, s as delegateEvents, u as memo } from "./web-BPyQozky.js";
import { i as useHeavyAnimationCheck_default } from "./useHeavyAnimationCheck-sWeBPI3f.js";
import { t as IS_OVERLAY_SCROLL_SUPPORTED } from "./overlayScrollSupport-D1vWJ9aT.js";
import { t as classNames } from "./classNames-DxGDjmvw.js";
import { t as isDocumentRTL } from "./isDocumentRTL-z8ksM2Dv.js";
//#region src/components/scrollable2.tsx
var _tmpl$ = /*#__PURE__*/ template(`<div>`);
var _tmpl$2 = /*#__PURE__*/ template(`<div class=scrollable-thumb-container><div class=scrollable-thumb>`);
var SCROLL_THROTTLE = 24;
function throttleMeasurement(callback) {
	if (!IS_OVERLAY_SCROLL_SUPPORTED()) return requestAnimationFrame(callback);
	return window.setTimeout(callback, SCROLL_THROTTLE);
}
function cancelMeasurement(id) {
	if (!IS_OVERLAY_SCROLL_SUPPORTED()) cancelAnimationFrame(id);
	else window.clearTimeout(id);
}
var ScrollableContext = createContext();
function Scrollable(props) {
	const axis = props.axis ?? "y";
	const scrollPositionProperty = axis === "x" ? "scrollLeft" : "scrollTop";
	const scrollSizeProperty = axis === "x" ? "scrollWidth" : "scrollHeight";
	const clientSizeProperty = axis === "x" ? "clientWidth" : "clientHeight";
	const offsetSizeProperty = axis === "x" ? "offsetWidth" : "offsetHeight";
	const clientAxis = axis === "x" ? "clientX" : "clientY";
	const [ignoreScrollEvent, setIgnoreScrollEvent] = createSignal(false);
	const scrollPosition = () => axis === "x" ? Math.abs(ref.scrollLeft) : ref.scrollTop;
	const setScrollPosition = (value) => {
		if (axis === "x") ref.scrollLeft = isDocumentRTL() ? -value : value;
		else ref.scrollTop = value;
	};
	const scrollSize = () => ref[scrollSizeProperty];
	const clientSize = () => ref[clientSizeProperty];
	const offsetSize = () => ref[offsetSizeProperty];
	const getDistanceToEnd = () => scrollSize() - Math.round(scrollPosition() + offsetSize());
	const onScrollOffset = createMemo(() => props.onScrollOffset ?? 300);
	let lastScrollDirection = 0;
	let lastScrollPosition = 0;
	let startMousePosition;
	let startScrollPosition;
	let isHeavyAnimationInProgress = false;
	let needCheckAfterAnimation = false;
	const [isScrolledToStart, setIsScrolledToStart] = createSignal(true);
	const [isScrolledToEnd, setIsScrolledToEnd] = createSignal(true);
	let onScrollMeasure = 0;
	const removeHeavyAnimationListener = useHeavyAnimationCheck_default(() => {
		isHeavyAnimationInProgress = true;
		if (onScrollMeasure) {
			cancelMeasure();
			needCheckAfterAnimation = true;
		}
	}, () => {
		isHeavyAnimationInProgress = false;
		if (needCheckAfterAnimation) {
			onScroll();
			needCheckAfterAnimation = false;
		}
	});
	onCleanup(removeHeavyAnimationListener);
	const onScroll = () => {
		if (isHeavyAnimationInProgress) {
			cancelMeasure();
			needCheckAfterAnimation = true;
			return;
		}
		if (!props.onScrolledTop && !props.onScrolledBottom && !onScrollCallbacks().length && IS_OVERLAY_SCROLL_SUPPORTED()) return;
		if (onScrollMeasure) return;
		onScrollMeasure = throttleMeasurement(() => {
			onScrollMeasure = 0;
			const _scrollPosition = scrollPosition();
			lastScrollDirection = lastScrollPosition === _scrollPosition ? 0 : lastScrollPosition < _scrollPosition ? 1 : -1;
			lastScrollPosition = _scrollPosition;
			updateThumb(_scrollPosition);
			onScrollCallbacks().forEach((callback) => callback());
			checkForTriggers();
		});
	};
	const cancelMeasure = () => {
		if (onScrollMeasure) {
			cancelMeasurement(onScrollMeasure);
			onScrollMeasure = 0;
		}
	};
	const checkForTriggers = () => {
		if (!props.onScrolledTop && !props.onScrolledBottom) return;
		const _scrollSize = scrollSize();
		if (!_scrollSize) return;
		const _scrollPosition = scrollPosition();
		const _clientSize = offsetSize();
		const _onScrollOffset = onScrollOffset();
		const maxScrollPosition = _scrollSize - _clientSize;
		if (props.onScrolledTop && _scrollPosition <= _onScrollOffset && lastScrollDirection <= 0) props.onScrolledTop();
		if (props.onScrolledBottom && maxScrollPosition - _scrollPosition <= _onScrollOffset && lastScrollDirection >= 0) props.onScrolledBottom();
	};
	const checkEnds = () => {
		setIsScrolledToStart(!scrollPosition());
		setIsScrolledToEnd(getDistanceToEnd() <= 1);
	};
	const updateThumb = (_scrollPosition = scrollPosition()) => {
		if (IS_OVERLAY_SCROLL_SUPPORTED() || !thumbRef) return;
		const _scrollSize = scrollSize();
		const _clientSize = clientSize();
		const divider = _scrollSize / _clientSize / .75;
		const thumbSize = Math.max(20, _clientSize / divider);
		const value = _scrollPosition / (_scrollSize - _clientSize) * _clientSize;
		const b = _scrollPosition / (_scrollSize - _clientSize);
		const maxValue = _clientSize - thumbSize;
		if (_clientSize < _scrollSize) {
			thumbRef.style.height = thumbSize + "px";
			thumbRef.style.transform = `translateY(${Math.min(maxValue, value - thumbSize * b)}px)`;
		} else thumbRef.style.height = "0px";
	};
	const setScrollPositionSilently = (value) => {
		lastScrollPosition = value;
		ignoreNextScrollEvent();
		setScrollPosition(value);
	};
	const ignoreNextScrollEvent = () => {
		setIgnoreScrollEvent(true);
		ref.addEventListener("scroll", (e) => {
			cancelEvent(e);
			setIgnoreScrollEvent(false);
		}, {
			capture: true,
			passive: false,
			once: true
		});
	};
	const onScrollCallbacks = createMemo(() => [props.onScroll, (props.withBorders || props.trackEnds) && checkEnds].filter(Boolean));
	const onThumbMouseMove = (e) => {
		cancelEvent(e);
		const contentHeight = scrollSize();
		const viewportHeight = clientSize();
		const scrollbarSize = thumbRef.offsetHeight;
		const maxScrollTop = contentHeight - viewportHeight;
		const maxScrollbarOffset = viewportHeight - scrollbarSize;
		const scrollAmount = (e[clientAxis] - startMousePosition) / maxScrollbarOffset * maxScrollTop;
		const newScrollTop = startScrollPosition + scrollAmount;
		ref[scrollPositionProperty] = newScrollTop;
	};
	const onThumbMouseDown = (e) => {
		cancelEvent(e);
		startMousePosition = e[clientAxis];
		startScrollPosition = scrollPosition();
		e.target.classList.add("is-focused");
		const w = thumbRef.ownerDocument.defaultView || window;
		w.addEventListener("mousemove", onThumbMouseMove);
		w.addEventListener("mouseup", onThumbMouseUp, { once: true });
	};
	const onThumbMouseUp = (e) => {
		(thumbRef.ownerDocument.defaultView || window).removeEventListener("mousemove", onThumbMouseMove);
		thumbRef.classList.remove("is-focused");
	};
	const onWheel = (e) => {
		e.stopPropagation();
		const container = ref;
		if (!e.deltaX && container.scrollWidth > container.clientWidth) {
			container.scrollLeft += e.deltaY / 4 * (isDocumentRTL() ? -1 : 1);
			cancelEvent(e);
		}
	};
	const tracksEnds = () => !!(props.withBorders || props.trackEnds);
	const checkEndsIfTracked = () => {
		if (tracksEnds()) checkEnds();
	};
	const onSizeChange = () => {
		checkEndsIfTracked();
		if (!IS_OVERLAY_SCROLL_SUPPORTED() && thumbRef) onScroll();
	};
	/**
	* Which end the content sits at cannot be known before it is laid out — and whether it
	* matters at all can turn true after mount, since a footer registers itself with the popup
	* only once the whole body has rendered. Content that grows later says so through
	* `onSizeChange`.
	*/
	createEffect(checkEndsIfTracked);
	const value = {
		get scrollPosition() {
			return scrollPosition();
		},
		get scrollSize() {
			return scrollSize();
		},
		get clientSize() {
			return clientSize();
		},
		get offsetSize() {
			return offsetSize();
		},
		getDistanceToEnd,
		get container() {
			return ref;
		},
		onSizeChange,
		setScrollPositionSilently,
		checkForTriggers,
		get isScrolledToStart() {
			return isScrolledToStart();
		},
		get isScrolledToEnd() {
			return isScrolledToEnd();
		}
	};
	if (props.contextRef) untrack(() => props.contextRef)(value);
	const resolvedChildren = children(() => {
		return createComponent(ScrollableContext.Provider, {
			value,
			get children() {
				return props.children;
			}
		});
	});
	createEffect(on(resolvedChildren, onSizeChange));
	let ref, thumbRef;
	return (() => {
		var _el$ = _tmpl$();
		addEventListener(_el$, "wheel", axis === "x" && !IS_TOUCH_SUPPORTED && onWheel || void 0);
		addEventListener(_el$, "scroll", !ignoreScrollEvent() && onScroll);
		use((_ref) => {
			ref = _ref;
			props.ref?.(_ref);
		}, _el$);
		insert(_el$, (() => {
			var _c$ = memo(() => !!(!IS_OVERLAY_SCROLL_SUPPORTED() && axis === "y"));
			return () => _c$() && (() => {
				var _el$2 = _tmpl$2(), _el$3 = _el$2.firstChild;
				_el$3.$$mousedown = onThumbMouseDown;
				use((el) => {
					thumbRef = el;
					props.thumbRef?.(el);
				}, _el$3);
				createRenderEffect(() => _el$3.classList.toggle("scrollable-thumb--hidden", !!props.hideThumb));
				return _el$2;
			})();
		})(), null);
		insert(_el$, resolvedChildren, null);
		createRenderEffect((_p$) => {
			var _v$ = Modes.a11y ? props.tabIndex : void 0, _v$2 = classNames("scrollable", `scrollable-${axis}`, props.class, props.relative && "relative", IS_SAFARI && !IS_MOBILE_SAFARI && "no-scrollbar", ...props.withBorders === "manual" ? [
				isScrolledToStart() && "scrolled-start-manual",
				isScrolledToEnd() && "scrolled-end-manual",
				isScrolledToStart() && !isScrolledToEnd() && "scrolled-only-start-manual",
				isScrolledToEnd() && !isScrolledToStart() && "scrolled-only-end-manual",
				!isScrolledToStart() && !isScrolledToEnd() && "scrolled-none-manual"
			] : props.withBorders ? [
				isScrolledToStart() && "scrolled-start",
				isScrolledToEnd() && "scrolled-end",
				axis === "y" && "scrollable-y-bordered",
				(props.withBorders === "top" || props.withBorders === "both") && "scrollable-y-bordered-top",
				(props.withBorders === "bottom" || props.withBorders === "both") && "scrollable-y-bordered-bottom"
			] : []), _v$3 = props.classList, _v$4 = props.style;
			_v$ !== _p$.e && setAttribute(_el$, "tabindex", _p$.e = _v$);
			_v$2 !== _p$.t && className(_el$, _p$.t = _v$2);
			_p$.a = classList(_el$, _v$3, _p$.a);
			_p$.o = style(_el$, _v$4, _p$.o);
			return _p$;
		}, {
			e: void 0,
			t: void 0,
			a: void 0,
			o: void 0
		});
		return _el$;
	})();
}
delegateEvents(["mousedown"]);
//#endregion
export { ScrollableContext as n, Scrollable as t };
