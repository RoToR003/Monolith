//# allFunctionsCalledOnLoad
import { i as getIconMirrorClass, r as getIconContent } from "./icon-DbP6Es97.js";
import { A as mergeProps, I as splitProps } from "./solid-9Vxm0VIz.js";
import { c as insert, g as template, m as spread } from "./web-BPyQozky.js";
import { t as classNames } from "./classNames-DxGDjmvw.js";
//#region src/components/iconTsx.tsx
var _tmpl$ = /*#__PURE__*/ template(`<span aria-hidden=true>`);
var IconTsx = (inProps) => {
	const [props, rest] = splitProps(inProps, ["icon", "class"]);
	return (() => {
		var _el$ = _tmpl$();
		spread(_el$, mergeProps({ get ["class"]() {
			return classNames("tgico", getIconMirrorClass(props.icon), props.class);
		} }, rest), false, true);
		insert(_el$, () => getIconContent(props.icon));
		return _el$;
	})();
};
//#endregion
export { IconTsx as t };
