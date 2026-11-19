//# allFunctionsCalledOnLoad
import { a as i18n } from "./langPack-BmdJGr44.js";
import { i as For, p as createComponent, s as Show, w as createUniqueId } from "./solid-9Vxm0VIz.js";
import { c as insert, g as template, u as memo } from "./web-BPyQozky.js";
import { i as Row } from "./confirmationPopup-Bz6mK0o-.js";
import { t as RadioFieldTsx } from "./radioFieldTsx-kmtuN4Dv.js";
//#region src/components/radioFormTsx.tsx
var _tmpl$ = /*#__PURE__*/ template(`<form>`);
function RadioFormTsx(props) {
	const name = props.name || createUniqueId();
	return (() => {
		var _el$ = _tmpl$();
		insert(_el$, createComponent(For, {
			get each() {
				return props.values;
			},
			children: (item) => createComponent(Row, { get children() {
				return [
					createComponent(Row.RadioField, { get children() {
						return createComponent(RadioFieldTsx, {
							"class": "disable-hover",
							get checked() {
								return memo(() => props.selected === void 0)() ? item.checked : props.selected === item.value;
							},
							name,
							get value() {
								return String(item.value);
							},
							onChange: (checked, event) => checked && props.onChange(item.value, event)
						});
					} }),
					createComponent(Row.Title, { get children() {
						return memo(() => !!item.langPackKey)() ? i18n(item.langPackKey) : item.textElement ?? item.text;
					} }),
					createComponent(Show, {
						get when() {
							return item.subtitle !== void 0;
						},
						get children() {
							return createComponent(Row.Subtitle, { get children() {
								return item.subtitle;
							} });
						}
					})
				];
			} })
		}));
		return _el$;
	})();
}
//#endregion
export { RadioFormTsx as t };
