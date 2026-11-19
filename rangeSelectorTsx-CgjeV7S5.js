//# allFunctionsCalledOnLoad
import { C as createSignal, M as onCleanup, N as onMount, g as createEffect, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { t as clamp } from "./clamp-9UaNhw6N.js";
import { _ as use, c as insert, f as setAttribute, g as template, o as className, r as addEventListener, s as delegateEvents } from "./web-BPyQozky.js";
import { t as classNames } from "./classNames-DxGDjmvw.js";
import { n as isElementRTL } from "./isDocumentRTL-z8ksM2Dv.js";
import { E as attachGrabListeners, T as keepLeftToRight, w as onRangeInlineArrowKey } from "./openEditors-7FmA7q_V.js";
//#region src/components/rangeSelectorTsx.tsx
var _tmpl$ = /*#__PURE__*/ template(`<div><div class=progress-line__filled></div><input class=progress-line__seek type=range>`);
function RangeSelector(props) {
	const [mousedown, setMousedown] = createSignal(false);
	const [rect, setRect] = createSignal();
	const [value, setValue] = createSignal(props.value || 0);
	let containerRef;
	let filledRef;
	let seekRef;
	let removeListeners;
	const min = props.min ?? 0;
	const max = props.max ?? 0;
	const step = props.step;
	const withTransition = props.withTransition || false;
	const useTransform = props.useTransform || false;
	const useProperty = props.useProperty || false;
	const vertical = props.vertical || false;
	const offsetAxisValue = props.offsetAxisValue || 0;
	const keepLTR = props.keepLTR || false;
	const stepStr = "" + step;
	const index = stepStr.indexOf(".");
	const decimals = index === -1 ? 0 : stepStr.length - index - 1;
	const setFilled = (val) => {
		let percents = (val - min) / (max - min);
		percents = clamp(percents, 0, 1);
		if (useTransform) filledRef.style.transform = `scaleX(${percents})`;
		else if (useProperty) containerRef.style.setProperty("--progress", "" + percents);
		else filledRef.style.width = percents * 100 + "%";
	};
	const setProgress = (val) => {
		seekRef.value = "" + val;
		setFilled(+seekRef.value);
		setValue(+seekRef.value);
	};
	const onInput = () => {
		const val = +seekRef.value;
		setFilled(val);
		setValue(val);
		props.onScrub?.(val);
	};
	const onMouseMove = (event) => {
		if (!mousedown() || props.disabled) return;
		scrub(event);
	};
	let rtl = false;
	const onMouseDown = (event) => {
		if (props.disabled) return;
		setRect(containerRef.getBoundingClientRect());
		rtl = !vertical && isElementRTL(containerRef);
		setMousedown(true);
		scrub(event);
		containerRef.classList.add("is-focused");
		props.onMouseDown?.(event);
	};
	const onMouseUp = (event) => {
		if (!mousedown()) return;
		setMousedown(false);
		containerRef.classList.remove("is-focused");
		props.onMouseUp?.(event);
	};
	const scrub = (event, snapValue) => {
		const currentRect = rect();
		if (!currentRect) return 0;
		let rectMax = vertical ? currentRect.height : currentRect.width;
		if (offsetAxisValue) rectMax -= offsetAxisValue;
		let offsetAxisValue_ = clamp(vertical ? -(event.y - currentRect.bottom) : event.x - currentRect.left - offsetAxisValue / 2, 0, rectMax);
		if (rtl) offsetAxisValue_ = rectMax - offsetAxisValue_;
		let val = min + offsetAxisValue_ / rectMax * (max - min);
		if (val - min < (max - min) / 2) val -= step / 10;
		val = +val.toFixed(decimals);
		val = clamp(val, min, max);
		if (snapValue) val = snapValue(val);
		setProgress(val);
		props.onScrub?.(val);
		return val;
	};
	onMount(() => {
		if (props.value) setProgress(props.value);
		removeListeners = attachGrabListeners(containerRef, onMouseDown, onMouseMove, onMouseUp);
	});
	onCleanup(() => {
		removeListeners?.();
	});
	createEffect(() => {
		if (props.value !== void 0) setProgress(props.value);
	});
	return (() => {
		var _el$ = _tmpl$(), _el$2 = _el$.firstChild, _el$3 = _el$2.nextSibling;
		use((el) => {
			containerRef = el;
			if (keepLTR) keepLeftToRight(el);
		}, _el$);
		var _ref$ = filledRef;
		typeof _ref$ === "function" ? use(_ref$, _el$2) : filledRef = _el$2;
		addEventListener(_el$3, "keydown", vertical ? void 0 : onRangeInlineArrowKey, true);
		_el$3.$$input = onInput;
		use((el) => {
			seekRef = el;
			props.inputRef?.(el);
		}, _el$3);
		setAttribute(_el$3, "step", step);
		setAttribute(_el$3, "min", min);
		setAttribute(_el$3, "max", max);
		insert(_el$, () => props.children, null);
		createRenderEffect((_p$) => {
			var _v$ = classNames("progress-line", useTransform && "use-transform", withTransition && "with-transition"), _v$2 = props.disabled;
			_v$ !== _p$.e && className(_el$, _p$.e = _v$);
			_v$2 !== _p$.t && (_el$3.disabled = _p$.t = _v$2);
			return _p$;
		}, {
			e: void 0,
			t: void 0
		});
		createRenderEffect(() => _el$3.value = value());
		return _el$;
	})();
}
delegateEvents(["input", "keydown"]);
//#endregion
export { RangeSelector as t };
