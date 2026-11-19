//# allFunctionsCalledOnLoad
import { A as mergeProps, I as splitProps } from "./solid-9Vxm0VIz.js";
import { g as template, m as spread } from "./web-BPyQozky.js";
//#region src/components/space.tsx
var _tmpl$ = /*#__PURE__*/ template(`<div>`);
function Space(inProps) {
	const [props, divProps] = splitProps(inProps, ["amount", "withTransition"]);
	return (() => {
		var _el$ = _tmpl$();
		spread(_el$, mergeProps(divProps, { get style() {
			return {
				"padding-top": props.amount,
				"transition": props.withTransition ? ".2s" : void 0
			};
		} }), false, false);
		return _el$;
	})();
}
//#endregion
export { Space as t };
