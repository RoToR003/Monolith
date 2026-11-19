//# allFunctionsCalledOnLoad
import { A as mergeProps, C as createSignal, M as onCleanup, N as onMount, _ as createMemo, d as batch, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { _ as use, a as classList, c as insert, g as template, o as className, p as setStyleProperty } from "./web-BPyQozky.js";
import { t as classNames } from "./classNames-DxGDjmvw.js";
var autoHeight_module_default = {
	outer: "_outer_1kzdh_16",
	hasTransition: "_hasTransition_1kzdh_16",
	overflowHidden: "_overflowHidden_1kzdh_19"
};
//#endregion
//#region src/components/autoHeight.tsx
var _tmpl$ = /*#__PURE__*/ template(`<div><div>`);
var AutoHeight = (inProps) => {
	const props = mergeProps({ hasTransition: true }, inProps);
	let contentRef;
	const [canHaveHeight, setCanHaveHeight] = createSignal(false);
	const [height, setHeight] = createSignal(0);
	const canHaveHeightAndTransition = createMemo(() => canHaveHeight() && props.hasTransition);
	onMount(() => {
		const observer = new ResizeObserver(() => {
			if (!contentRef.getClientRects().length) return;
			batch(() => {
				setCanHaveHeight(true);
				setHeight(contentRef.offsetHeight);
			});
		});
		observer.observe(contentRef);
		onCleanup(() => observer.disconnect());
	});
	return (() => {
		var _el$ = _tmpl$(), _el$2 = _el$.firstChild;
		var _ref$ = props.ref;
		typeof _ref$ === "function" ? use(_ref$, _el$) : props.ref = _el$;
		var _ref$2 = contentRef;
		typeof _ref$2 === "function" ? use(_ref$2, _el$2) : contentRef = _el$2;
		insert(_el$2, () => props.children);
		createRenderEffect((_p$) => {
			var _v$ = classNames(props.outerClass, autoHeight_module_default.outer), _v$2 = {
				[autoHeight_module_default.overflowHidden]: props.overflowHidden,
				[autoHeight_module_default.hasTransition]: canHaveHeightAndTransition()
			}, _v$3 = canHaveHeightAndTransition() ? `${height()}px` : void 0;
			_v$ !== _p$.e && className(_el$, _p$.e = _v$);
			_p$.t = classList(_el$, _v$2, _p$.t);
			_v$3 !== _p$.a && setStyleProperty(_el$, "height", _p$.a = _v$3);
			return _p$;
		}, {
			e: void 0,
			t: void 0,
			a: void 0
		});
		return _el$;
	})();
};
//#endregion
export { AutoHeight as t };
