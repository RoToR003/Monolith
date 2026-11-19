//# allFunctionsCalledOnLoad
import { g as createEffect, p as createComponent, s as Show, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { c as insert, f as setAttribute, g as template, o as className } from "./web-BPyQozky.js";
import { t as AutoHeight } from "./autoHeight-CPfajIaf.js";
import { t as authFlow_module_default } from "./mountAuthFlow-D-_L6zCe.js";
//#region src/pages/AuthCardError.tsx
var _tmpl$ = /*#__PURE__*/ template(`<div role=alert>`);
var seed = 0;
/**
* The error line under a code field ("Invalid code", "Code expired").
*
* It used to hold a line of height at all times so that an arriving error would
* not push the card around. It costs that line on every card that has never seen
* an error, though — so instead the line takes no room until there is something
* to say, and `AutoHeight` animates the card growing by it rather than letting it
* jump.
*/
function AuthCardError(props) {
	const id = "auth-card-error-" + ++seed;
	createEffect(() => {
		const input = props.describes;
		if (!input) return;
		if (props.content) {
			input.setAttribute("aria-invalid", "true");
			input.setAttribute("aria-describedby", id);
		} else {
			input.removeAttribute("aria-invalid");
			input.removeAttribute("aria-describedby");
		}
	});
	return createComponent(AutoHeight, {
		overflowHidden: true,
		get children() {
			return createComponent(Show, {
				get when() {
					return props.content;
				},
				get children() {
					var _el$ = _tmpl$();
					setAttribute(_el$, "id", id);
					insert(_el$, () => props.content);
					createRenderEffect(() => className(_el$, authFlow_module_default.errorLabel));
					return _el$;
				}
			});
		}
	});
}
//#endregion
export { AuthCardError as t };
