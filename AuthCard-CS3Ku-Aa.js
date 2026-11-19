//# allFunctionsCalledOnLoad
import { p as createComponent, s as Show, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { c as insert, g as template, o as className } from "./web-BPyQozky.js";
import { t as classNames } from "./classNames-DxGDjmvw.js";
import { t as authFlow_module_default } from "./mountAuthFlow-D-_L6zCe.js";
//#region src/pages/AuthCard.tsx
var _tmpl$ = /*#__PURE__*/ template(`<div class=input-wrapper>`);
var _tmpl$2 = /*#__PURE__*/ template(`<div>`);
function AuthCard(props) {
	const useInputWrapper = () => props.inputWrapper !== false;
	return (() => {
		var _el$ = _tmpl$2();
		insert(_el$, () => props.header, null);
		insert(_el$, createComponent(Show, {
			get when() {
				return useInputWrapper();
			},
			get fallback() {
				return props.children;
			},
			get children() {
				var _el$2 = _tmpl$();
				insert(_el$2, () => props.children);
				return _el$2;
			}
		}), null);
		createRenderEffect(() => className(_el$, classNames(authFlow_module_default.card, props.class)));
		return _el$;
	})();
}
//#endregion
export { AuthCard as t };
