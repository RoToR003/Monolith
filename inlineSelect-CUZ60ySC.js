//# allFunctionsCalledOnLoad
import { h as Modes } from "./userAgent-ByGXcznk.js";
import { C as createSignal, M as onCleanup, N as onMount, S as createSelector, _ as createMemo, g as createEffect, i as For, p as createComponent, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { _ as use, a as classList, c as insert, f as setAttribute, g as template, n as Portal, o as className, r as addEventListener, s as delegateEvents, u as memo } from "./web-BPyQozky.js";
import { t as ripple } from "./ripple-D7hcIc_t.js";
import { t as ListenerSetter } from "./listenerSetter-BER6qAXn.js";
import { t as buttonKeyDown } from "./buttonKeyDown-CqZzefS3.js";
import { n as simpleEasing } from "./easings-DXRWZVIJ.js";
import { t as animateValue } from "./animateValue-C0de6s5K.js";
import { t as Transition } from "./transition-Cmlc134D.js";
var inlineSelect_module_default = {
	Overlay: "_Overlay_1l0ge_16",
	Value: "_Value_1l0ge_25",
	SelectClip: "_SelectClip_1l0ge_32",
	Select: "_Select_1l0ge_32",
	Option: "_Option_1l0ge_50",
	selected: "_selected_1l0ge_63"
};
//#endregion
//#region src/components/sidebarLeft/tabs/passcodeLock/inlineSelect.tsx
var _tmpl$ = /*#__PURE__*/ template(`<div>`);
var _tmpl$2 = /*#__PURE__*/ template(`<div><div><div role=listbox>`);
var _tmpl$3 = /*#__PURE__*/ template(`<div role=option><span>`);
var InlineSelect = (props) => {
	let valueEl;
	const value = createMemo(() => props.options.find((option) => option.value === props.value)?.label);
	const [valueLabel, setValueLabel] = createSignal();
	createEffect(() => {
		setValueLabel(value()());
	});
	const isSelected = createSelector(() => props.value);
	const [selectEl, setSelectEl] = createSignal();
	onMount(() => {
		const listenerSetter = new ListenerSetter();
		listenerSetter.add(window)("resize", () => {
			if (props.isOpen) props.onClose?.();
		});
		onCleanup(() => {
			listenerSetter.removeAll();
		});
	});
	const onEnter = (el, done) => {
		const selectEl = el.firstElementChild;
		const selectOptionEl = selectEl.querySelector(`.${inlineSelect_module_default.selected}`);
		if (!selectOptionEl || !selectEl) return;
		if (Modes.a11y) selectOptionEl.focus({ preventScroll: true });
		const valueRect = valueEl.getBoundingClientRect();
		const selectRect = selectEl.getBoundingClientRect();
		const selectedOptionRect = selectOptionEl.getBoundingClientRect();
		const optionTop = selectedOptionRect.top - selectRect.top;
		const optionBottom = optionTop + selectedOptionRect.height;
		const distToOptionCenter = optionTop + selectedOptionRect.height / 2;
		const x = valueRect.left + valueRect.width / 2;
		let y = valueRect.top + valueRect.height / 2 - distToOptionCenter;
		const isOverflowing = y + selectRect.height > window.innerHeight || y < 0;
		if (isOverflowing) y += Math.max(0, -y) + Math.min(0, window.innerHeight - (y + selectRect.height));
		selectEl.style.setProperty("--x", "" + x);
		selectEl.style.setProperty("--y", "" + y);
		selectEl.animate({ opacity: [0, 1] }, { duration: 120 }).finished.then(() => {
			if (isOverflowing) done();
		});
		if (isOverflowing) return;
		const maxDist = Math.max(optionTop, selectRect.height - optionBottom);
		const getPath = (dist) => `polygon(0% ${optionTop - dist}px, 100% ${optionTop - dist}px, 100% ${optionBottom + dist}px, 0px ${optionBottom + dist}px)`;
		animateValue(0, maxDist, 400, (dist) => {
			selectEl.style.setProperty("clip-path", getPath(dist));
		}, {
			easing: simpleEasing,
			onEnd: () => {
				selectEl.style.removeProperty("clip-path");
				done();
			}
		});
	};
	const onExit = async (el, done) => {
		await el.firstElementChild.animate({ opacity: [1, 0] }, { duration: 120 }).finished;
		done();
	};
	const onMouseMove = (e) => {
		const toCheck = [props.parent, selectEl()];
		if (!toCheck.every(Boolean)) return;
		if (toCheck.every((el) => {
			const rect = el.getBoundingClientRect();
			return Math.max(rect.left - e.clientX, e.clientX - rect.right, rect.top - e.clientY, e.clientY - rect.bottom) > 100;
		})) props.onClose?.();
	};
	return [(() => {
		var _el$ = _tmpl$();
		var _ref$ = valueEl;
		typeof _ref$ === "function" ? use(_ref$, _el$) : valueEl = _el$;
		insert(_el$, valueLabel);
		createRenderEffect(() => className(_el$, inlineSelect_module_default.Value));
		return _el$;
	})(), createComponent(Portal, { get children() {
		return createComponent(Transition, {
			appear: true,
			onEnter,
			onExit,
			get children() {
				return memo(() => !!props.isOpen)() && (() => {
					var _el$2 = _tmpl$2(), _el$3 = _el$2.firstChild, _el$4 = _el$3.firstChild;
					_el$2.$$mousemove = onMouseMove;
					_el$2.$$keydown = (e) => {
						if (Modes.a11y && e.key === "Escape") {
							e.stopPropagation();
							props.onClose?.();
						}
					};
					_el$2.$$click = (e) => {
						e.stopPropagation();
						props.onClose?.();
					};
					use(setSelectEl, _el$4);
					insert(_el$4, createComponent(For, {
						get each() {
							return props.options;
						},
						children: (option) => (() => {
							var _el$5 = _tmpl$3(), _el$6 = _el$5.firstChild;
							addEventListener(_el$5, "keydown", buttonKeyDown, true);
							_el$5.$$click = props.onChange;
							_el$5.$$clickData = option.value;
							use(ripple, _el$5, () => true);
							insert(_el$6, () => option.label());
							createRenderEffect((_p$) => {
								var _v$4 = inlineSelect_module_default.Option, _v$5 = { [inlineSelect_module_default.selected]: isSelected(option.value) }, _v$6 = Modes.a11y ? 0 : void 0, _v$7 = isSelected(option.value);
								_v$4 !== _p$.e && className(_el$5, _p$.e = _v$4);
								_p$.t = classList(_el$5, _v$5, _p$.t);
								_v$6 !== _p$.a && setAttribute(_el$5, "tabindex", _p$.a = _v$6);
								_v$7 !== _p$.o && setAttribute(_el$5, "aria-selected", _p$.o = _v$7);
								return _p$;
							}, {
								e: void 0,
								t: void 0,
								a: void 0,
								o: void 0
							});
							return _el$5;
						})()
					}));
					createRenderEffect((_p$) => {
						var _v$ = inlineSelect_module_default.Overlay, _v$2 = inlineSelect_module_default.SelectClip, _v$3 = inlineSelect_module_default.Select;
						_v$ !== _p$.e && className(_el$2, _p$.e = _v$);
						_v$2 !== _p$.t && className(_el$3, _p$.t = _v$2);
						_v$3 !== _p$.a && className(_el$4, _p$.a = _v$3);
						return _p$;
					}, {
						e: void 0,
						t: void 0,
						a: void 0
					});
					return _el$2;
				})();
			}
		});
	} })];
};
delegateEvents([
	"click",
	"keydown",
	"mousemove"
]);
//#endregion
export { InlineSelect as t };
