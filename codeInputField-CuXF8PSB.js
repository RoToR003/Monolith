//# allFunctionsCalledOnLoad
import { u as langPack_default } from "./langPack-BmdJGr44.js";
import { A as mergeProps, C as createSignal, a as Index, f as children, p as createComponent, s as Show, x as createRoot, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { _ as use, c as insert, f as setAttribute, g as template, o as className, s as delegateEvents, u as memo } from "./web-BPyQozky.js";
import { t as classNames } from "./classNames-DxGDjmvw.js";
import { t as Transition } from "./transition-Cmlc134D.js";
import { t as subscribeOn } from "./subscribeOn-DnCla7ws.js";
var codeInputField_module_default = {
	wrap: "_wrap_49ts9_1",
	input: "_input_49ts9_11",
	disabled: "_disabled_49ts9_29",
	digit: "_digit_49ts9_37",
	active: "_active_49ts9_53",
	error: "_error_49ts9_57",
	digitContent: "_digitContent_49ts9_64",
	caret: "_caret_49ts9_91",
	"caret-blink": "_caret-blink_49ts9_1"
};
//#endregion
//#region src/components/codeInputField.tsx
var _tmpl$ = /*#__PURE__*/ template(`<div dir=ltr><input inputmode=numeric autocomplete=one-time-code required pattern=^\\d*$>`);
var _tmpl$2 = /*#__PURE__*/ template(`<div>`);
var CodeInputFieldCompat = class {
	constructor(options) {
		this.options = options;
		this.errorSignal = createSignal(false);
		this.disabledSignal = createSignal(false);
		this.valueSignal = createSignal("");
		this.container = createRoot((dispose) => {
			const _self$ = this;
			this.dispose = dispose;
			const el = createComponent(CodeInputField, mergeProps(options, {
				ref(r$) {
					var _ref$ = _self$.input;
					typeof _ref$ === "function" ? _ref$(r$) : _self$.input = r$;
				},
				get error() {
					return _self$.errorSignal[0]();
				},
				get disabled() {
					return _self$.disabledSignal[0]();
				},
				get valueSignal() {
					return _self$.valueSignal;
				}
			}));
			return children(() => el)();
		});
	}
	set error(value) {
		this.errorSignal[1](value);
	}
	set disabled(value) {
		this.disabledSignal[1](value);
	}
	set value(value) {
		this.valueSignal[1](value);
	}
	get value() {
		return this.valueSignal[0]();
	}
	cleanup() {
		this.dispose();
	}
};
function CodeInputField(props) {
	const [value, setValue] = props.valueSignal ?? createSignal("");
	const [activeIndexStart, setActiveIndexStart] = createSignal(-1);
	const [activeIndexEnd, setActiveIndexEnd] = createSignal(-1);
	const [isInserting, setIsInserting] = createSignal(false);
	let isFocused = false;
	let isShiftKeyDown = false;
	const previousSelection = {
		inserting: false,
		start: null,
		end: null
	};
	const syncSelection = (props) => {
		previousSelection.inserting = props.inserting;
		previousSelection.start = props.originalStart;
		previousSelection.end = props.originalEnd;
		const start = props.start;
		const end = props.end;
		if (start === null || end === null) {
			setActiveIndexStart(-1);
			setActiveIndexEnd(-1);
			return;
		}
		setActiveIndexStart(start);
		setActiveIndexEnd(end);
	};
	const onSelectionChange = (inputType) => {
		if (!isFocused || inputRef.ownerDocument.activeElement !== inputRef || inputRef.selectionStart === null || inputRef.selectionEnd === null) {
			syncSelection({
				start: null,
				end: null,
				inserting: false,
				originalStart: inputRef.selectionStart,
				originalEnd: inputRef.selectionEnd
			});
			setIsInserting(false);
			return;
		}
		const maxLength = props.length;
		const inserting = inputRef.value.length < maxLength && inputRef.selectionStart === inputRef.value.length;
		setIsInserting(inserting);
		if (inserting || inputRef.selectionStart !== inputRef.selectionEnd) {
			syncSelection({
				start: inputRef.selectionStart,
				end: inserting ? inputRef.selectionEnd + 1 : inputRef.selectionEnd,
				inserting,
				originalStart: inputRef.selectionStart,
				originalEnd: inputRef.selectionEnd
			});
			return;
		}
		let selectionStart = 0;
		let selectionEnd = 0;
		let direction = void 0;
		if (inputRef.selectionStart === 0) {
			selectionStart = 0;
			selectionEnd = 1;
			direction = "forward";
		} else if (inputRef.selectionStart === maxLength) {
			selectionStart = maxLength - 1;
			selectionEnd = maxLength;
			direction = "backward";
		} else {
			let startOffset = 0;
			let endOffset = 1;
			if (previousSelection.start !== null && previousSelection.end !== null) {
				const navigatedBackwards = inputRef.selectionStart < previousSelection.end && Math.abs(previousSelection.start - previousSelection.end) === 1;
				direction = navigatedBackwards ? "backward" : "forward";
				if (navigatedBackwards && !previousSelection.inserting && inputType !== "deleteContentForward" || !navigatedBackwards && isShiftKeyDown) startOffset += -1;
			}
			if (isShiftKeyDown && inputType === void 0) endOffset += 1;
			selectionStart = inputRef.selectionStart + startOffset;
			selectionEnd = inputRef.selectionEnd + startOffset + endOffset;
		}
		inputRef.setSelectionRange(selectionStart, selectionEnd, direction);
		syncSelection({
			start: selectionStart,
			end: selectionEnd,
			inserting,
			originalStart: inputRef.selectionStart,
			originalEnd: inputRef.selectionEnd
		});
	};
	subscribeOn(document)("selectionchange", () => onSelectionChange());
	let inputRef;
	return (() => {
		var _el$ = _tmpl$(), _el$2 = _el$.firstChild;
		_el$2.$$input = (e) => {
			const rawValue = inputRef.value;
			let finalValue = rawValue;
			const oldValue = value();
			const selectionSize = Math.abs((previousSelection.start ?? 0) - (previousSelection.end ?? 0));
			if (previousSelection.inserting || selectionSize === oldValue.length) finalValue = finalValue.replace(/[^\d]/g, "");
			finalValue = finalValue.slice(0, props.length);
			const hasInvalidChars = !/^\d*$/.test(finalValue);
			if (rawValue.length !== 0 && finalValue.length === 0 || finalValue === oldValue || hasInvalidChars) {
				e.preventDefault();
				e.currentTarget.value = oldValue;
				if (hasInvalidChars) e.currentTarget.setSelectionRange(previousSelection.start ?? 0, previousSelection.end ?? 0);
				return;
			}
			if (finalValue.length < oldValue.length) onSelectionChange(e.inputType);
			setValue(finalValue);
			props.onChange?.(finalValue);
			if (finalValue.length === props.length) props.onFill?.(finalValue);
		};
		_el$2.$$keyup = (e) => {
			if (e.key === "Shift") isShiftKeyDown = false;
		};
		_el$2.$$keydown = (e) => {
			if (e.key === "Shift") isShiftKeyDown = true;
		};
		_el$2.addEventListener("blur", () => {
			isFocused = false;
			onSelectionChange();
		});
		_el$2.addEventListener("focus", () => {
			inputRef.setSelectionRange(value().length, value().length);
			isFocused = true;
			onSelectionChange();
		});
		use((el) => {
			inputRef = el;
			props.ref?.(el);
		}, _el$2);
		setAttribute(_el$2, "spellcheck", false);
		insert(_el$, createComponent(Index, {
			get each() {
				return Array.from({ length: props.length });
			},
			children: (_, idx) => (() => {
				var _el$3 = _tmpl$2();
				insert(_el$3, createComponent(Transition, { get children() {
					return createComponent(Show, {
						get when() {
							return value()[idx];
						},
						get children() {
							var _el$4 = _tmpl$2();
							insert(_el$4, () => value()[idx]);
							createRenderEffect(() => className(_el$4, codeInputField_module_default.digitContent));
							return _el$4;
						}
					});
				} }), null);
				insert(_el$3, (() => {
					var _c$ = memo(() => !!(isInserting() && value().length === idx));
					return () => _c$() && (() => {
						var _el$5 = _tmpl$2();
						createRenderEffect(() => className(_el$5, codeInputField_module_default.caret));
						return _el$5;
					})();
				})(), null);
				createRenderEffect(() => className(_el$3, classNames(codeInputField_module_default.digit, activeIndexStart() <= idx && idx < activeIndexEnd() && codeInputField_module_default.active)));
				return _el$3;
			})()
		}), null);
		createRenderEffect((_p$) => {
			var _v$ = classNames(codeInputField_module_default.wrap, props.error && codeInputField_module_default.error, props.disabled && codeInputField_module_default.disabled, props.class), _v$2 = codeInputField_module_default.input, _v$3 = langPack_default.format(props.label || "AccDescr.LoginCode", true), _v$4 = props.disabled;
			_v$ !== _p$.e && className(_el$, _p$.e = _v$);
			_v$2 !== _p$.t && className(_el$2, _p$.t = _v$2);
			_v$3 !== _p$.a && setAttribute(_el$2, "aria-label", _p$.a = _v$3);
			_v$4 !== _p$.o && (_el$2.disabled = _p$.o = _v$4);
			return _p$;
		}, {
			e: void 0,
			t: void 0,
			a: void 0,
			o: void 0
		});
		createRenderEffect(() => _el$2.value = value());
		return _el$;
	})();
}
delegateEvents([
	"keydown",
	"keyup",
	"input"
]);
//#endregion
export { CodeInputFieldCompat as n, CodeInputField as t };
