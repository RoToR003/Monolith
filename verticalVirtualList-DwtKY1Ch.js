//# allFunctionsCalledOnLoad
import { t as noop } from "./noop-H9NNBLfX.js";
import { C as createSignal, L as untrack, M as onCleanup, N as onMount, S as createSelector, _ as createMemo, i as For, j as on, m as createComputed, p as createComponent, s as Show, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { _ as use, c as insert, g as template, o as className, p as setStyleProperty } from "./web-BPyQozky.js";
import { t as liteMode } from "./liteMode-DeLStZfQ.js";
import { t as ListenerSetter } from "./listenerSetter-BER6qAXn.js";
import { n as simpleEasing } from "./easings-DXRWZVIJ.js";
import { i as useElementSize } from "./openEditors-7FmA7q_V.js";
var verticalVirtualList_module_default = { item: "_item_5iddr_1" };
//#endregion
//#region src/components/verticalVirtualList.tsx
var _tmpl$ = /*#__PURE__*/ template(`<ul role=presentation>`);
/** What every item the list places wears - it lies over the list at the place the list gives it */
var VIRTUAL_LIST_ITEM_CLASS_NAME = verticalVirtualList_module_default.item;
var VerticalVirtualList = (props) => {
	const totalCount = createMemo(() => props.list.length);
	const [scrollAmount, setScrollAmount] = createSignal(0);
	const hostSize = useElementSize(() => props.scrollableHost);
	const hostHeight = createMemo((prev) => hostSize.height || prev, 0);
	onMount(() => {
		const listenerSetter = new ListenerSetter();
		listenerSetter.add(props.scrollableHost)("scroll", () => {
			setScrollAmount(props.scrollableHost.scrollTop);
		});
		onCleanup(() => {
			listenerSetter.removeAll();
		});
	});
	const uniformLayout = createMemo(() => createUniformLayout(props.itemHeight));
	const getLayout = () => props.layout || uniformLayout();
	let pendingScrollShift = 0;
	const onScrollShift = (amount) => {
		if (!amount) return;
		if (!pendingScrollShift) queueMicrotask(() => {
			if (pendingScrollShift) props.scrollableHost.scrollTop -= pendingScrollShift;
			pendingScrollShift = 0;
		});
		pendingScrollShift += amount;
	};
	let listEl;
	const getVisibleTop = () => {
		return props.scrollableHost.getBoundingClientRect().top - listEl.getBoundingClientRect().top - pendingScrollShift;
	};
	const shouldAnimate = useShouldAnimate({
		list: () => props.list,
		hostHeight,
		getLayout,
		scrollAmount,
		getVisibleTop,
		onScrollShift
	});
	const canAnimate = createMemo(() => shouldAnimate() && props.animate && liteMode.isAvailable("motion"));
	const isVisible = createSelector(() => [
		scrollAmount(),
		hostHeight(),
		getLayout(),
		props.thresholdPadding
	], (idx, [scrollAmount, hostHeight, layout, padding]) => layout.top(idx) >= scrollAmount - padding && layout.top(idx + 1) <= scrollAmount + hostHeight + padding);
	const Item = (itemProps) => {
		return createComponent(props.ListItem, {
			get idx() {
				return itemProps.idx;
			},
			get item() {
				return itemProps.item;
			},
			get top() {
				return getLayout().top(itemProps.idx);
			},
			get glide() {
				return canAnimate();
			}
		});
	};
	const computedItemsHeight = () => getLayout().top(totalCount()) + Number(!!totalCount()) * (props.extraPaddingBottom || 0);
	const height = createMemo(() => props.forceHostHeight ? hostHeight() : computedItemsHeight());
	return (() => {
		var _el$ = _tmpl$();
		use((el) => {
			listEl = el;
			if (typeof props.ref === "function") props.ref(el);
		}, _el$);
		insert(_el$, createComponent(For, {
			get each() {
				return props.list;
			},
			children: (item, idx) => createComponent(Show, {
				get when() {
					return isVisible(idx());
				},
				get children() {
					return createComponent(Item, {
						get idx() {
							return idx();
						},
						item
					});
				}
			})
		}));
		createRenderEffect((_p$) => {
			var _v$ = props.class, _v$2 = height() + "px", _v$3 = props.forceHostHeight ? "hidden" : void 0;
			_v$ !== _p$.e && className(_el$, _p$.e = _v$);
			_v$2 !== _p$.t && setStyleProperty(_el$, "height", _p$.t = _v$2);
			_v$3 !== _p$.a && setStyleProperty(_el$, "overflow", _p$.a = _v$3);
			return _p$;
		}, {
			e: void 0,
			t: void 0,
			a: void 0
		});
		return _el$;
	})();
};
var GLIDE_TIME = 120;
/**
* Puts an item at `top`, and when it may glide there carries it from where it was drawn: the item
* is at its new place at once, and a transform animation the compositor runs takes it there. A
* `top` animated a frame at a time laid the list out again in every frame of every row that moved
* (a chat going up the list moves every row above its old place). Gives whether it is gliding.
*/
function createItemGlide(element, top, canGlide) {
	const [gliding, setGliding] = createSignal(false);
	let glide, lastElement, lastTop;
	const getDrawnTop = () => {
		if (!glide) return lastTop;
		const time = Number(glide.animation.currentTime) || 0;
		const progress = simpleEasing(Math.min(1, time / GLIDE_TIME));
		return glide.from + (glide.to - glide.from) * progress;
	};
	const stop = () => {
		glide?.animation.cancel();
		glide = void 0;
	};
	createRenderEffect(() => {
		const _element = element(), _top = top();
		if (_element && _element === lastElement && _top === lastTop) return;
		const from = _element && _element === lastElement ? getDrawnTop() : void 0;
		stop();
		lastElement = _element;
		lastTop = _top;
		if (!_element) {
			setGliding(false);
			return;
		}
		_element.style.setProperty("top", _top + "px");
		if (from === void 0 || from === _top || !untrack(canGlide) || typeof _element.animate !== "function") {
			setGliding(false);
			return;
		}
		const animation = _element.animate([{ transform: `translateY(${from - _top}px)` }, { transform: "translateY(0)" }], {
			duration: GLIDE_TIME,
			easing: "ease"
		});
		glide = {
			animation,
			from,
			to: _top
		};
		setGliding(true);
		animation.finished.then(() => {
			if (glide?.animation === animation) {
				glide = void 0;
				setGliding(false);
			}
		}, noop);
	});
	onCleanup(stop);
	return gliding;
}
function createUniformLayout(itemHeight) {
	return { top: (idx) => idx * itemHeight };
}
/** The first of the `length` items that reaches below `offset` - `length` when none does */
function findItemAtOffset(layout, length, offset) {
	let low = 0, high = length;
	while (low < high) {
		const middle = low + high >> 1;
		if (layout.top(middle + 1) <= offset) low = middle + 1;
		else high = middle;
	}
	return low;
}
/** Lays out a list whose items differ in height, for `VerticalVirtualList`'s `layout` */
function createItemsLayout(list, getItemHeight) {
	const tops = new Array(list.length + 1);
	tops[0] = 0;
	for (let i = 0; i < list.length; ++i) tops[i + 1] = tops[i] + getItemHeight(list[i]);
	return { top: (idx) => tops[Math.min(idx, list.length)] };
}
/**
* If all the items from the viewport of the host element shift by the same amount, don't animate them
*
* For example when a new chat appears on top, and we have some scroll, prevent all the chats from viewport
* moving at the same time
*/
function useShouldAnimate({ list, scrollAmount, hostHeight, getLayout, getVisibleTop, onScrollShift }) {
	const [shouldAnimate, setShouldAnimate] = createSignal(true);
	const isActuallyVisible = (layout, idx) => {
		const top = scrollAmount();
		return layout.top(idx + 1) >= top && layout.top(idx) <= top + hostHeight();
	};
	const onHeightsChange = (length, layout) => {
		const anchorIdx = findItemAtOffset(prevLayout, length, getVisibleTop());
		const shift = anchorIdx < length ? prevLayout.top(anchorIdx) - layout.top(anchorIdx) : 0;
		setShouldAnimate(!shift);
		onScrollShift(shift);
	};
	let prevLayout;
	createComputed(on([list, getLayout], ([current, layout], prevInput) => {
		const prev = prevInput?.[0] || [];
		if (current === prev) {
			if (prevLayout && layout !== prevLayout) onHeightsChange(current.length, layout);
			prevLayout = layout;
			return;
		}
		const visiblePrev = prevLayout ? prev.filter((_, i) => isActuallyVisible(prevLayout, i)) : [];
		const visibleNow = current.filter((_, i) => isActuallyVisible(layout, i));
		const visiblePrevAndNow = Array.from(/* @__PURE__ */ new Set([...visibleNow, ...visiblePrev]));
		let allChangedTheSameAmount = true;
		let prevDiff;
		for (const item of visiblePrevAndNow) {
			const prevIdx = prev.indexOf(item);
			const currentIdx = current.indexOf(item);
			if (prevIdx === -1 || currentIdx === -1) {
				allChangedTheSameAmount = false;
				break;
			}
			const diff = prevLayout.top(prevIdx) - layout.top(currentIdx);
			if (typeof prevDiff === "undefined") {
				prevDiff = diff;
				continue;
			}
			if (prevDiff !== diff) {
				allChangedTheSameAmount = false;
				break;
			}
		}
		if (!visiblePrevAndNow.length) {
			allChangedTheSameAmount = false;
			prevDiff = 0;
		}
		prevLayout = layout;
		setShouldAnimate(!allChangedTheSameAmount);
		if (allChangedTheSameAmount) onScrollShift(prevDiff);
		return current;
	}));
	return shouldAnimate;
}
//#endregion
export { findItemAtOffset as a, createItemsLayout as i, VerticalVirtualList as n, createItemGlide as r, VIRTUAL_LIST_ITEM_CLASS_NAME as t };
