//# allFunctionsCalledOnLoad
import { C as createSignal, L as untrack, M as onCleanup, _ as createMemo, g as createEffect, i as For, j as on, p as createComponent, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { _ as use, c as insert, g as template, o as className, s as delegateEvents } from "./web-BPyQozky.js";
import { r as useHotReloadGuard } from "./hotReloadGuard-BUNVkeQ4.js";
import { t as I18nTsx } from "./i18n-CGMFiAW0.js";
import { i as createPopup, n as PopupElement } from "./indexTsx-v9mB9bAq.js";
import { t as animate } from "./animation-Dd3Xpw_9.js";
import { t as animateValue } from "./animateValue-C0de6s5K.js";
import { t as defineSolidElement } from "./defineSolidElement-DU5LO9SF.js";
import { L as customTimeOptions } from "./confirmationPopup-Bz6mK0o-.js";
import { E as lastItem } from "./getChatMigratedTo-ChhMNXuu.js";
import { t as subscribeOn } from "./subscribeOn-DnCla7ws.js";
import { M as useIsCleaned, i as useElementSize } from "./openEditors-7FmA7q_V.js";
import { t as swipe } from "./useSwipe-BLYcg7-N.js";
import { t as useScrollPosition } from "./useScrollPosition-DI_ULjVI.js";
var verticalOptionWheel_module_default = {
	Container: "_Container_88x8u_1",
	Scrollable: "_Scrollable_88x8u_5",
	Option: "_Option_88x8u_15",
	hidden: "_hidden_88x8u_23",
	EmptyOption: "_EmptyOption_88x8u_27",
	Divider: "_Divider_88x8u_31",
	upper: "_upper_88x8u_40",
	lower: "_lower_88x8u_43"
};
//#endregion
//#region src/components/verticalOptionWheel.tsx
var _tmpl$$1 = /*#__PURE__*/ template(`<div>`);
var _tmpl$2 = /*#__PURE__*/ template(`<div style=--option-size:40px><div><div></div><div></div><div></div><div></div></div><div></div><div>`);
var snapTimeout = 250;
var scrollDuration = 320;
var optionSize = 40;
var dragThreshold = 10;
var generousDiffError = .1;
var VerticalOptionWheel = (props) => {
	const [scrollable, setScrollable] = createSignal();
	const [hasScrolledInitially, setHasScrolledInitially] = createSignal(false);
	const [isDragging, setIsDragging] = createSignal(false);
	const [hasDraggedALittle, setHasDraggedALittle] = createSignal(false);
	const scrollTop = useScrollPosition(scrollable);
	const size = useElementSize(scrollable);
	const isCleaned = useIsCleaned();
	const elementsAndOptions = createMemo(() => props.options.map((option, idx) => ({
		option,
		element: (() => {
			var _el$ = _tmpl$$1();
			_el$.$$click = onOptionClick;
			_el$.$$clickData = idx;
			insert(_el$, () => option.label);
			createRenderEffect(() => className(_el$, verticalOptionWheel_module_default.Option));
			return _el$;
		})()
	})));
	createEffect(on(elementsAndOptions, () => {
		const localScrollable = scrollable();
		const localElementsAndOptions = elementsAndOptions();
		if (!localScrollable || !localElementsAndOptions.length) return;
		const selectedOptionIdx = Math.max(0, localElementsAndOptions.findIndex(({ option }) => option.value === props.value));
		if (selectedOptionIdx) localScrollable.scrollTop = selectedOptionIdx * optionSize;
		setHasScrolledInitially(true);
	}));
	createEffect(() => {
		const localElementsAndOptions = elementsAndOptions();
		if (!localElementsAndOptions.length || !hasScrolledInitially()) return;
		let bestItem = localElementsAndOptions[0];
		let bestDiff = Infinity;
		for (let i = 0; i < localElementsAndOptions.length; i++) {
			const item = localElementsAndOptions[i];
			const element = item.element;
			const diffSigned = calcDiffFromCenterFor(i);
			const diff = Math.abs(diffSigned);
			const distSigned = diffSigned / size.height * 2;
			const dist = Math.abs(distSigned);
			if (diff < bestDiff) {
				bestItem = item;
				bestDiff = diff;
			}
			element.classList.toggle(verticalOptionWheel_module_default.hidden, dist > 1);
			if (dist <= 1) {
				element.style.setProperty("--current-dist", `${dist}`);
				element.style.setProperty("--current-dist-sign", `${Math.sign(distSigned)}`);
			} else {
				element.style.removeProperty("--current-dist");
				element.style.removeProperty("--current-dist-sign");
			}
		}
		const prevValue = untrack(() => props.value);
		const newValue = bestItem.option.value;
		if (newValue !== prevValue) props.onChange(newValue);
	});
	let timeoutId;
	createEffect(() => {
		if (isDragging()) return;
		scrollTop();
		timeoutId = self.setTimeout(snapClosestToCenter, snapTimeout);
		onCleanup(() => {
			self.clearTimeout(timeoutId);
		});
	});
	createEffect(() => {
		const localScrollable = scrollable();
		if (!localScrollable) return;
		subscribeOn(localScrollable)("wheel", () => {
			cancelSmoothScroll?.();
		}, { passive: true });
	});
	let cancelDeceleration;
	let cancelSmoothScroll;
	onCleanup(() => {
		cancelSmoothScroll?.();
		cancelDeceleration?.();
	});
	let initialScroll = 0;
	let lastDiffs = [];
	const swipeArgs = {
		onStart: () => {
			initialScroll = scrollable()?.scrollTop ?? 0;
			lastDiffs = [];
			cancelDeceleration?.();
			cancelSmoothScroll?.();
			setIsDragging(true);
		},
		onMove: (_, yDiff) => {
			const localScrollable = scrollable();
			if (!localScrollable) return;
			pushDiffWithTime(yDiff);
			if (Math.abs(yDiff) > dragThreshold) setHasDraggedALittle(true);
			localScrollable.scrollTop = initialScroll - yDiff;
		},
		onEnd: () => {
			cancelDeceleration = runDeceleration();
			setIsDragging(false);
			setTimeout(() => {
				setHasDraggedALittle(false);
			}, 0);
		}
	};
	function calcDiffFromCenterFor(idx) {
		return size.height / 2 + scrollTop() - (idx + 2.5) * optionSize;
	}
	function runDeceleration() {
		const localScrollable = scrollable();
		if (lastDiffs.length < 2 || !localScrollable) {
			lastDiffs = [];
			return;
		}
		const endTime = performance.now();
		let isCanceled = false;
		const deceleration = .2;
		const referenceFrameTime = 1e3 / 60;
		let speed = 0;
		for (let i = 0; i < lastDiffs.length - 1; i++) speed += lastDiffs[i + 1].diff - lastDiffs[i].diff;
		speed = speed * referenceFrameTime / (endTime - lastItem(lastDiffs).time);
		let lastTime = performance.now();
		let lastScrollTop = -1;
		animate(() => {
			if (isCleaned() || isCanceled) return false;
			const time = performance.now();
			const deltaTime = time - lastTime;
			lastTime = time;
			if (localScrollable.scrollTop === lastScrollTop) return false;
			lastScrollTop = localScrollable.scrollTop;
			localScrollable.scrollTop = lastScrollTop + speed;
			speed -= Math.sign(speed) * (deceleration * deltaTime / referenceFrameTime);
			return Math.abs(speed) > 1;
		});
		return () => {
			isCanceled = true;
		};
	}
	function pushDiffWithTime(yDiff) {
		lastDiffs = [{
			time: performance.now(),
			diff: yDiff
		}, ...lastDiffs.slice(0, 4)];
	}
	function snapClosestToCenter() {
		const localScrollable = scrollable();
		const localElementsAndOptions = elementsAndOptions();
		if (!localElementsAndOptions.length || !localScrollable) return;
		let bestIdx = 0;
		let bestDiff = Infinity;
		for (let i = 0; i < localElementsAndOptions.length; i++) {
			const diff = Math.abs(calcDiffFromCenterFor(i));
			if (diff < bestDiff) {
				bestIdx = i;
				bestDiff = diff;
			}
		}
		if (bestDiff > generousDiffError) scrollToIdx(bestIdx);
	}
	function onOptionClick(idx) {
		if (hasDraggedALittle()) return;
		scrollToIdx(idx);
	}
	function scrollToIdx(idx) {
		const localScrollable = scrollable();
		if (!localScrollable) return;
		cancelSmoothScroll?.();
		cancelSmoothScroll = animateValue(localScrollable.scrollTop, idx * optionSize, scrollDuration, (value) => {
			localScrollable.scrollTop = value;
		});
	}
	return (() => {
		var _el$2 = _tmpl$2(), _el$3 = _el$2.firstChild, _el$4 = _el$3.firstChild, _el$5 = _el$4.nextSibling, _el$6 = _el$5.nextSibling, _el$7 = _el$6.nextSibling, _el$8 = _el$3.nextSibling, _el$9 = _el$8.nextSibling;
		use(swipe, _el$3, () => swipeArgs);
		use(setScrollable, _el$3);
		insert(_el$3, createComponent(For, {
			get each() {
				return elementsAndOptions();
			},
			children: ({ element }) => element
		}), _el$6);
		createRenderEffect((_p$) => {
			var _v$ = verticalOptionWheel_module_default.Container, _v$2 = verticalOptionWheel_module_default.Scrollable, _v$3 = verticalOptionWheel_module_default.EmptyOption, _v$4 = verticalOptionWheel_module_default.EmptyOption, _v$5 = verticalOptionWheel_module_default.EmptyOption, _v$6 = verticalOptionWheel_module_default.EmptyOption, _v$7 = `${verticalOptionWheel_module_default.Divider} ${verticalOptionWheel_module_default.upper}`, _v$8 = `${verticalOptionWheel_module_default.Divider} ${verticalOptionWheel_module_default.lower}`;
			_v$ !== _p$.e && className(_el$2, _p$.e = _v$);
			_v$2 !== _p$.t && className(_el$3, _p$.t = _v$2);
			_v$3 !== _p$.a && className(_el$4, _p$.a = _v$3);
			_v$4 !== _p$.o && className(_el$5, _p$.o = _v$4);
			_v$5 !== _p$.i && className(_el$6, _p$.i = _v$5);
			_v$6 !== _p$.n && className(_el$7, _p$.n = _v$6);
			_v$7 !== _p$.s && className(_el$8, _p$.s = _v$7);
			_v$8 !== _p$.h && className(_el$9, _p$.h = _v$8);
			return _p$;
		}, {
			e: void 0,
			t: void 0,
			a: void 0,
			o: void 0,
			i: void 0,
			n: void 0,
			s: void 0,
			h: void 0
		});
		return _el$2;
	})();
};
delegateEvents(["click"]);
var styles_module_default = { Container: "_Container_1kyr7_1" };
//#endregion
//#region src/components/sidebarLeft/tabs/autoDeleteMessages/customTimePopup/content.tsx
var _tmpl$ = /*#__PURE__*/ template(`<div>`);
var AutoDeleteMessagesCustomTimePopupContent = defineSolidElement({
	name: "auto-delete-messages-custom-time-popup-content",
	component: (props) => {
		const { i18n } = useHotReloadGuard();
		const [period, setPeriod] = createSignal(props.initialPeriod);
		const options = [{
			value: 0,
			label: () => i18n("Never")
		}, ...customTimeOptions];
		return (() => {
			var _el$ = _tmpl$();
			insert(_el$, createComponent(I18nTsx, { get key() {
				return props.descriptionLangKey;
			} }), null);
			insert(_el$, createComponent(VerticalOptionWheel, {
				get value() {
					return period();
				},
				onChange: (value) => {
					setPeriod(value);
					props.onChange(value);
				},
				get options() {
					return options.map((option) => ({
						label: option.label(),
						value: option.value
					}));
				}
			}), null);
			createRenderEffect(() => className(_el$, styles_module_default.Container));
			return _el$;
		})();
	}
});
//#endregion
//#region src/components/sidebarLeft/tabs/autoDeleteMessages/customTimePopup/index.tsx
function showAutoDeleteMessagesCustomTimePopup({ descriptionLangKey, period, HotReloadGuard, onFinish }) {
	let currentPeriod = period;
	const content = new AutoDeleteMessagesCustomTimePopupContent();
	content.HotReloadGuard = HotReloadGuard;
	content.feedProps({
		initialPeriod: period || 0,
		descriptionLangKey,
		onChange: (newPeriod) => {
			currentPeriod = newPeriod;
		}
	});
	createPopup(() => createComponent(PopupElement, {
		"class": "auto-delete-messages-custom-time-popup",
		closable: true,
		old: true,
		get children() {
			return [
				createComponent(PopupElement.Header, { get children() {
					return [createComponent(PopupElement.CloseButton, {}), createComponent(PopupElement.Title, { title: "AutoDeleteMessages" })];
				} }),
				createComponent(PopupElement.Body, { children: content }),
				createComponent(PopupElement.Buttons, { get children() {
					return [createComponent(PopupElement.Button, {
						langKey: "Save",
						callback: () => onFinish(currentPeriod)
					}), createComponent(PopupElement.Button, {
						langKey: "Cancel",
						cancel: true
					})];
				} })
			];
		}
	}));
}
//#endregion
export { showAutoDeleteMessagesCustomTimePopup as default };
