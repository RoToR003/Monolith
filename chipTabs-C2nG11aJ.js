//# allFunctionsCalledOnLoad
import { h as Modes } from "./userAgent-ByGXcznk.js";
import { t as findUpClassName } from "./findUpClassName-3V5me58N.js";
import { n as fastRaf } from "./schedulers-Cx0-7a1P.js";
import { M as onCleanup, N as onMount, R as useContext, g as createEffect, h as createContext, j as on, p as createComponent, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { _ as use, c as insert, f as setAttribute, g as template, o as className, r as addEventListener, s as delegateEvents, u as memo } from "./web-BPyQozky.js";
import { j as getVisibleRect } from "./renderer-L80wjxct.js";
import { t as classNames } from "./classNames-DxGDjmvw.js";
import { t as Scrollable } from "./scrollable2-Bau9Hoih.js";
import { c as createContextMenu, h as filterAsync, l as verifyMenuItem } from "./confirmationPopup-Bz6mK0o-.js";
import { A as handleTabKeyDown } from "./openEditors-7FmA7q_V.js";
import { i as fastSmoothScroll } from "./scrollable-C2-FwBtK.js";
var chipTabs_module_default = {
	container: "_container_akb3x_16",
	center: "_center_akb3x_28",
	chip: "_chip_akb3x_37",
	primary: "_primary_akb3x_52",
	active: "_active_akb3x_55",
	chosen: "_chosen_akb3x_59",
	animate: "_animate_akb3x_66",
	surface: "_surface_akb3x_69",
	secondary: "_secondary_akb3x_72"
};
//#endregion
//#region src/components/chipTabs.tsx
var _tmpl$ = /*#__PURE__*/ template(`<div role=tab>`);
var _tmpl$2 = /*#__PURE__*/ template(`<div aria-hidden=true>`);
var _tmpl$3 = /*#__PURE__*/ template(`<div role=tablist>`);
var ChipTabsContext = createContext(null);
function ChipTab(props) {
	const ctx = useContext(ChipTabsContext);
	const selected = () => ctx.value === props.value;
	return (() => {
		var _el$ = _tmpl$();
		_el$.$$click = (event) => ctx.onClick(event, props.value);
		insert(_el$, () => props.children);
		createRenderEffect((_p$) => {
			var _v$ = classNames(chipTabs_module_default.chip, selected() && chipTabs_module_default.active, props.class), _v$2 = props.value, _v$3 = selected(), _v$4 = Modes.a11y ? selected() ? 0 : -1 : void 0;
			_v$ !== _p$.e && className(_el$, _p$.e = _v$);
			_v$2 !== _p$.t && setAttribute(_el$, "data-value", _p$.t = _v$2);
			_v$3 !== _p$.a && setAttribute(_el$, "aria-selected", _p$.a = _v$3);
			_v$4 !== _p$.o && setAttribute(_el$, "tabindex", _p$.o = _v$4);
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
function ChipTabs(props) {
	let scrollable;
	let chosenRef;
	function updateChosen(categoryEl, categoryRect) {
		const scrollableRect = scrollable.getBoundingClientRect();
		chosenRef.style.width = `${categoryRect.width}px`;
		chosenRef.style.left = `${categoryRect.left - scrollableRect.left + scrollable.scrollLeft}px`;
		const visibleRect = getVisibleRect(categoryEl, scrollable, false, categoryRect, void 0, true);
		if (!visibleRect || visibleRect.overflow.horizontal) fastSmoothScroll({
			element: categoryEl,
			container: scrollable,
			position: "center",
			axis: "x"
		});
	}
	function handleClick(event, value) {
		if (props.onChange(value) === false) return;
		const categoryEl = findUpClassName(event.target, chipTabs_module_default.chip);
		fastRaf(() => {
			const categoryRect = categoryEl.getBoundingClientRect();
			updateChosen(categoryEl, categoryRect);
		});
	}
	let updatedOnce = false;
	function updateCurrent() {
		const categoryEl = scrollable.querySelector(`[data-value="${props.value}"]`);
		if (categoryEl) {
			const rect = categoryEl.getBoundingClientRect();
			if (rect.width === 0 && rect.height === 0) return;
			updateChosen(categoryEl, rect);
		}
		if (!updatedOnce) {
			chosenRef.classList.add(chipTabs_module_default.animate);
			updatedOnce = true;
		}
	}
	createEffect(on(() => props.value, () => fastRaf(updateCurrent)));
	onMount(() => {
		const observer = new MutationObserver(() => fastRaf(updateCurrent));
		observer.observe(scrollable, { childList: true });
		onCleanup(() => observer.disconnect());
	});
	if (props.needIntersectionObserver) onMount(() => {
		const observer = new IntersectionObserver((mutations) => {
			mutations.forEach((mutation) => {
				if (mutation.isIntersecting) {
					updateCurrent();
					observer.disconnect();
				}
			});
		}, { threshold: 1 });
		observer.observe(scrollable.parentElement);
		onCleanup(() => observer.disconnect());
	});
	if (props.contextMenuButtons) {
		let chosenElement;
		onMount(() => {
			createContextMenu({
				listenTo: scrollable,
				findElement: (event) => findUpClassName(event.target, chipTabs_module_default.chip),
				onOpen: (event, target) => {
					chosenElement = target;
				},
				buttons: [],
				filterButtons: async () => {
					const buttons = await props.contextMenuButtons(chosenElement.dataset.value);
					return filterAsync(buttons, verifyMenuItem);
				}
			});
		});
	}
	return createComponent(ChipTabsContext.Provider, {
		value: {
			get value() {
				return props.value;
			},
			onClick: handleClick
		},
		get children() {
			var _el$2 = _tmpl$3();
			addEventListener(_el$2, "keydown", handleTabKeyDown, true);
			var _ref$ = props.ref;
			typeof _ref$ === "function" ? use(_ref$, _el$2) : props.ref = _el$2;
			insert(_el$2, createComponent(Scrollable, {
				axis: "x",
				ref: (el) => {
					scrollable = el;
					props.scrollableRef?.(el);
				},
				tabIndex: null,
				get children() {
					return [(() => {
						var _el$3 = _tmpl$2();
						var _ref$2 = chosenRef;
						typeof _ref$2 === "function" ? use(_ref$2, _el$3) : chosenRef = _el$3;
						createRenderEffect(() => className(_el$3, chipTabs_module_default.chosen));
						return _el$3;
					})(), memo(() => props.children)];
				}
			}));
			createRenderEffect(() => className(_el$2, classNames(props.class, chipTabs_module_default.container, chipTabs_module_default[props.view], props.view === "primary" && chipTabs_module_default.primary, props.center && chipTabs_module_default.center)));
			return _el$2;
		}
	});
}
delegateEvents(["click", "keydown"]);
//#endregion
export { ChipTabs as n, ChipTab as t };
