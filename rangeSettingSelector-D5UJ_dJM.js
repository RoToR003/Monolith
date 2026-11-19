//# allFunctionsCalledOnLoad
import { C as createSignal, g as createEffect, p as createComponent } from "./solid-9Vxm0VIz.js";
import { _ as use, c as insert, g as template } from "./web-BPyQozky.js";
import { t as labelControl } from "./labelControl-V4jClefJ.js";
import { t as RangeSelector } from "./rangeSelectorTsx-CgjeV7S5.js";
//#region src/components/rangeSettingSelector.tsx
var _tmpl$ = /*#__PURE__*/ template(`<div class=range-setting-selector><div class=range-setting-selector-details><div class=range-setting-selector-name></div><div class=range-setting-selector-value>`);
function RangeSettingSelector(props) {
	const [value, setValue] = createSignal(props.value);
	let nameRef;
	createEffect(() => {
		setValue(props.value);
	});
	return (() => {
		var _el$ = _tmpl$(), _el$3 = _el$.firstChild.firstChild, _el$4 = _el$3.nextSibling;
		var _ref$ = nameRef;
		typeof _ref$ === "function" ? use(_ref$, _el$3) : nameRef = _el$3;
		insert(_el$3, () => props.textLeft);
		insert(_el$4, () => props.textRight(value()));
		insert(_el$, createComponent(RangeSelector, {
			inputRef: (el) => labelControl(el, nameRef),
			get step() {
				return props.step;
			},
			get min() {
				return props.minValue;
			},
			get max() {
				return props.maxValue;
			},
			get value() {
				return props.value;
			},
			get disabled() {
				return props.disabled;
			},
			onScrub: (value) => {
				props.onChange?.(value);
				setValue(value);
			},
			get onMouseUp() {
				return props.onMouseUp;
			}
		}), null);
		return _el$;
	})();
}
//#endregion
export { RangeSettingSelector as t };
