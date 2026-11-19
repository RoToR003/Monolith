//# allFunctionsCalledOnLoad
import { p as createComponent, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { c as insert, f as setAttribute, g as template, o as className } from "./web-BPyQozky.js";
import { t as classNames } from "./classNames-DxGDjmvw.js";
import { t as PreloaderTsx } from "./putPreloader-Bxq7N1RV.js";
var searchStatus_module_default = {
	loading: "_loading_125tt_1",
	preloader: "_preloader_125tt_6",
	empty: "_empty_125tt_11"
};
//#endregion
//#region src/components/searchStatus.tsx
var _tmpl$ = /*#__PURE__*/ template(`<div role=status aria-live=polite>`);
/**
* Spinner shown inside a section while an inline search is in flight.
*/
function SearchLoading(props) {
	return (() => {
		var _el$ = _tmpl$();
		insert(_el$, createComponent(PreloaderTsx, { get ["class"]() {
			return searchStatus_module_default.preloader;
		} }));
		createRenderEffect((_p$) => {
			var _v$ = classNames(searchStatus_module_default.loading, props.class), _v$2 = props["aria-label"];
			_v$ !== _p$.e && className(_el$, _p$.e = _v$);
			_v$2 !== _p$.t && setAttribute(_el$, "aria-label", _p$.t = _v$2);
			return _p$;
		}, {
			e: void 0,
			t: void 0
		});
		return _el$;
	})();
}
/**
* Centered secondary text shown instead of the results of an inline search.
*/
function SearchEmpty(props) {
	return (() => {
		var _el$2 = _tmpl$();
		insert(_el$2, () => props.children);
		createRenderEffect(() => className(_el$2, classNames(searchStatus_module_default.empty, props.class)));
		return _el$2;
	})();
}
//#endregion
export { SearchLoading as n, SearchEmpty as t };
