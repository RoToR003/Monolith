//# allFunctionsCalledOnLoad
import { a as i18n } from "./langPack-BmdJGr44.js";
import { y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { c as insert, g as template, o as className, u as memo } from "./web-BPyQozky.js";
import { t as classNames } from "./classNames-DxGDjmvw.js";
//#region src/components/currencyAmount.tsx
var _tmpl$ = /*#__PURE__*/ template(`<div><span dir=ltr>`);
var _tmpl$2 = /*#__PURE__*/ template(`<span class=currency-amount-status>`);
var _tmpl$3 = /*#__PURE__*/ template(`<div class=currency-balance><div class=currency-balance-title></div><div class=currency-balance-subtitle>`);
/**
* An amount with its currency's icon, as receipts and transaction lists write it (Stars, Grams): bold, and
* coloured by which way it went — green in, red out, grey while it has not settled
*/
function CurrencyAmount(props) {
	return (() => {
		var _el$ = _tmpl$(), _el$2 = _el$.firstChild;
		insert(_el$2, () => props.amount);
		insert(_el$, () => props.icon, null);
		insert(_el$, (() => {
			var _c$ = memo(() => !!props.status);
			return () => _c$() && (() => {
				var _el$3 = _tmpl$2();
				insert(_el$3, () => props.status);
				return _el$3;
			})();
		})(), null);
		createRenderEffect(() => className(_el$, classNames("currency-amount", props.color, props.reverse && "reverse", props.inline && "inline")));
		return _el$;
	})();
}
/**
* A balance at the far end of a popup's header: "Balance" over the amount
*/
function CurrencyBalance(props) {
	return (() => {
		var _el$4 = _tmpl$3(), _el$5 = _el$4.firstChild, _el$6 = _el$5.nextSibling;
		insert(_el$5, () => i18n("StarsBalance"));
		insert(_el$6, () => props.icon, null);
		insert(_el$6, () => props.children, null);
		return _el$4;
	})();
}
//#endregion
export { CurrencyBalance as n, CurrencyAmount as t };
