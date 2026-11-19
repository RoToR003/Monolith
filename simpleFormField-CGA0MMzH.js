//# allFunctionsCalledOnLoad
import { A as mergeProps, C as createSignal, I as splitProps, M as onCleanup, N as onMount, R as useContext, _ as createMemo, d as batch, g as createEffect, h as createContext, p as createComponent, s as Show, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { _ as use, a as classList, c as insert, g as template, m as spread, o as className, p as setStyleProperty, s as delegateEvents, u as memo } from "./web-BPyQozky.js";
import { t as classNames } from "./classNames-DxGDjmvw.js";
import { t as isDocumentRTL } from "./isDocumentRTL-z8ksM2Dv.js";
import { t as labelControl } from "./labelControl-V4jClefJ.js";
import { t as requestRAF } from "./requestRAF-CwdYaVwH.js";
var styles_module_default = {
	Container: "_Container_37je4_16",
	fixedHeight: "_fixedHeight_37je4_28",
	minHeight: "_minHeight_37je4_31",
	solidBackground: "_solidBackground_37je4_34",
	clickable: "_clickable_37je4_37",
	withEndButtonIcon: "_withEndButtonIcon_37je4_40",
	withStartButtonIcon: "_withStartButtonIcon_37je4_43",
	hoverEnabled: "_hoverEnabled_37je4_46",
	error: "_error_37je4_46",
	BorderThin: "_BorderThin_37je4_46",
	BorderThick: "_BorderThick_37je4_49",
	forceFocused: "_forceFocused_37je4_49",
	Label: "_Label_37je4_52",
	active: "_active_37je4_52",
	Input: "_Input_37je4_95",
	InputStub: "_InputStub_37je4_127",
	noTransition: "_noTransition_37je4_150",
	SideContent: "_SideContent_37je4_154",
	first: "_first_37je4_158",
	last: "_last_37je4_161",
	withFixedIcon: "_withFixedIcon_37je4_164",
	lengthLeft: "_lengthLeft_37je4_168",
	withLimit: "_withLimit_37je4_171"
};
//#endregion
//#region src/helpers/solid/useMaxLengthError.ts
var useMaxLengthError = (value, maxLength) => {
	const threshold = () => Math.min(40, Math.round(maxLength() / 3));
	const lengthLeft = () => maxLength() - value().length;
	const shouldShowLengthLeft = createMemo(() => lengthLeft() < threshold());
	return {
		hasError: createMemo(() => value().length > maxLength()),
		shouldShowLengthLeft,
		lengthLeft
	};
};
//#endregion
//#region src/components/simpleFormField/index.tsx
var _tmpl$ = /*#__PURE__*/ template(`<div><div></div><div>`);
var _tmpl$2 = /*#__PURE__*/ template(`<input>`);
var _tmpl$3 = /*#__PURE__*/ template(`<div>`);
var Context = createContext();
var useSimpleFormFieldContext = () => useContext(Context);
var SimpleFormField = (inProps) => {
	const [props, restProps] = splitProps(inProps, [
		"value",
		"onChange",
		"isError",
		"children",
		"onClick",
		"class",
		"classList",
		"clickable",
		"withEndButtonIcon",
		"withStartButtonIcon",
		"withMinHeight",
		"solidBackground",
		"hoverDisabled",
		"isMarkupTooltipHost"
	]);
	const [input, setInput] = createSignal();
	const [offsetElement, setOffsetElement] = createSignal();
	const [label, setLabel] = createSignal();
	const { value: forceFocused, useSetter: useSetForceFocused } = useForceState();
	const { value: forceError, useSetter: useSetForceError } = useForceState();
	createEffect(() => {
		const control = input() || offsetElement()?.querySelector("input, textarea, [contenteditable=\"true\"]");
		labelControl(control, label());
		if (control) control.setAttribute("aria-invalid", String(!!props.isError || forceError()));
	});
	const contextValue = {
		input,
		setInput,
		offsetElement,
		setOffsetElement,
		value: () => props.value,
		get onChange() {
			return props.onChange;
		},
		forceFocused,
		useSetForceFocused,
		forceError,
		useSetForceError,
		setLabel
	};
	return createComponent(Context.Provider, {
		value: contextValue,
		get children() {
			var _el$ = _tmpl$(), _el$2 = _el$.firstChild, _el$3 = _el$2.nextSibling;
			_el$.$$click = (...args) => {
				contextValue.input()?.focus();
				props.onClick?.(...args);
			};
			spread(_el$, mergeProps({
				get ["class"]() {
					return classNames(styles_module_default.Container, props.class);
				},
				get classList() {
					return {
						[styles_module_default.error]: props.isError || forceError(),
						[styles_module_default.clickable]: props.clickable,
						[styles_module_default.withEndButtonIcon]: props.withEndButtonIcon,
						[styles_module_default.withStartButtonIcon]: props.withStartButtonIcon,
						[styles_module_default.fixedHeight]: !props.withMinHeight,
						[styles_module_default.minHeight]: props.withMinHeight,
						[styles_module_default.forceFocused]: forceFocused(),
						[styles_module_default.solidBackground]: props.solidBackground,
						[styles_module_default.hoverEnabled]: !props.hoverDisabled,
						...props.classList
					};
				},
				get ["data-markup-tooltip-host"]() {
					return props.isMarkupTooltipHost;
				}
			}, restProps), false, true);
			insert(_el$, () => props.children, null);
			createRenderEffect((_p$) => {
				var _v$ = styles_module_default.BorderThin, _v$2 = styles_module_default.BorderThick;
				_v$ !== _p$.e && className(_el$2, _p$.e = _v$);
				_v$2 !== _p$.t && className(_el$3, _p$.t = _v$2);
				return _p$;
			}, {
				e: void 0,
				t: void 0
			});
			return _el$;
		}
	});
};
SimpleFormField.Input = (inProps) => {
	const [props, restProps] = splitProps(inProps, [
		"ref",
		"class",
		"forceFieldValue"
	]);
	const context = useSimpleFormFieldContext();
	return (() => {
		var _el$4 = _tmpl$2();
		_el$4.$$input = (e) => {
			context.onChange(e.currentTarget.value);
			if (props.forceFieldValue) context.input().value = context.value();
		};
		use((el) => batch(() => {
			context.setInput(el);
			context.setOffsetElement(el);
			if (props.ref instanceof Function) props.ref(el);
		}), _el$4);
		spread(_el$4, mergeProps({
			get ["class"]() {
				return classNames(styles_module_default.Input, props.class);
			},
			get value() {
				return context.value();
			}
		}, restProps), false, false);
		return _el$4;
	})();
};
SimpleFormField.InputStub = (props) => {
	const context = useSimpleFormFieldContext();
	return (() => {
		var _el$5 = _tmpl$3();
		var _ref$ = context.setOffsetElement;
		typeof _ref$ === "function" ? use(_ref$, _el$5) : context.setOffsetElement = _el$5;
		insert(_el$5, () => props.children);
		createRenderEffect(() => className(_el$5, classNames(styles_module_default.InputStub, props.class)));
		return _el$5;
	})();
};
SimpleFormField.Label = (props) => {
	const context = useSimpleFormFieldContext();
	const [offset, setOffset] = createSignal(0);
	const [noTransition, setNoTransition] = createSignal(true);
	onMount(() => {
		if (props.forceOffset || !context.offsetElement()) return;
		const parentElement = context.offsetElement().parentElement;
		if (!parentElement) return;
		const rect = parentElement.getBoundingClientRect();
		const inputRect = context.offsetElement().getBoundingClientRect();
		setOffset(isDocumentRTL(parentElement.ownerDocument) ? rect.right - inputRect.right : inputRect.left - rect.left);
	});
	onMount(() => {
		requestRAF(() => {
			setNoTransition(false);
		});
	});
	return (() => {
		var _el$6 = _tmpl$3();
		var _ref$2 = context.setLabel;
		typeof _ref$2 === "function" ? use(_ref$2, _el$6) : context.setLabel = _el$6;
		insert(_el$6, () => props.children, null);
		insert(_el$6, createComponent(Show, {
			get when() {
				return props.maxLength;
			},
			get children() {
				return createComponent(LabelMaxLength, { get maxLength() {
					return props.maxLength;
				} });
			}
		}), null);
		createRenderEffect((_p$) => {
			var _v$3 = styles_module_default.Label, _v$4 = {
				[styles_module_default.active]: props.active || !!context.value(),
				[styles_module_default.noTransition]: noTransition()
			}, _v$5 = `${props.forceOffset || offset()}px`;
			_v$3 !== _p$.e && className(_el$6, _p$.e = _v$3);
			_p$.t = classList(_el$6, _v$4, _p$.t);
			_v$5 !== _p$.a && setStyleProperty(_el$6, "--offset", _p$.a = _v$5);
			return _p$;
		}, {
			e: void 0,
			t: void 0,
			a: void 0
		});
		return _el$6;
	})();
};
var LabelMaxLength = (props) => {
	const context = useSimpleFormFieldContext();
	const { shouldShowLengthLeft, lengthLeft, hasError } = useMaxLengthError(context.value, () => props.maxLength);
	const setForceError = context.useSetForceError();
	createEffect(() => {
		setForceError(hasError());
	});
	return createComponent(Show, {
		get when() {
			return shouldShowLengthLeft();
		},
		get children() {
			return [
				" ",
				"(",
				memo(() => lengthLeft()),
				")"
			];
		}
	});
};
SimpleFormField.SideContent = (inProps) => {
	const [props, restProps] = splitProps(inProps, [
		"class",
		"first",
		"last",
		"withFixedIcon",
		"classList",
		"children"
	]);
	return (() => {
		var _el$7 = _tmpl$3();
		spread(_el$7, mergeProps({
			get ["class"]() {
				return classNames(styles_module_default.SideContent, props.class);
			},
			get classList() {
				return {
					[styles_module_default.first]: props.first,
					[styles_module_default.last]: props.last,
					[styles_module_default.withFixedIcon]: props.withFixedIcon,
					...props.classList
				};
			}
		}, restProps), false, true);
		insert(_el$7, () => props.children);
		return _el$7;
	})();
};
SimpleFormField.WithLengthCounter = (inProps) => {
	const [props, restProps] = splitProps(inProps, [
		"class",
		"showLengthLeft",
		"lengthLeft",
		"children"
	]);
	return createComponent(SimpleFormField.SideContent, mergeProps({ get ["class"]() {
		return classNames(styles_module_default.withLimit, props.class);
	} }, restProps, { get children() {
		return [memo(() => props.children), createComponent(Show, {
			get when() {
				return props.showLengthLeft;
			},
			get children() {
				var _el$8 = _tmpl$3();
				insert(_el$8, () => props.lengthLeft);
				createRenderEffect(() => className(_el$8, styles_module_default.lengthLeft));
				return _el$8;
			}
		})];
	} }));
};
SimpleFormField.WithAutoLengthCounter = (inProps) => {
	const [props, restProps] = splitProps(inProps, ["maxLength"]);
	const context = useSimpleFormFieldContext();
	const { shouldShowLengthLeft, lengthLeft, hasError } = useMaxLengthError(context.value, () => props.maxLength);
	const setForceError = context.useSetForceError();
	createEffect(() => {
		setForceError(hasError());
	});
	return createComponent(SimpleFormField.WithLengthCounter, mergeProps({
		get showLengthLeft() {
			return shouldShowLengthLeft();
		},
		get lengthLeft() {
			return lengthLeft();
		}
	}, restProps));
};
/**
* Aggregates a boolean state across multiple independent consumers.
*
* Each consumer obtains its own setter via `useSetter()`. The aggregated
* `value` is `true` whenever at least one consumer has set its flag to `true`.
* The setter is automatically reset on cleanup of the calling owner.
*/
var useForceState = () => {
	const [refs, setRefs] = createSignal([]);
	const value = createMemo(() => refs().length > 0);
	const useSetter = () => {
		const ref = {};
		const setter = (active) => setRefs((refs) => {
			const filtered = refs.filter((other) => other !== ref);
			return active ? [...filtered, ref] : filtered;
		});
		onCleanup(() => {
			setter(false);
		});
		return setter;
	};
	return {
		value,
		useSetter
	};
};
delegateEvents(["click", "input"]);
//#endregion
export { useSimpleFormFieldContext as n, SimpleFormField as t };
