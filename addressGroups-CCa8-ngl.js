//# allFunctionsCalledOnLoad
import { i as For, p as createComponent, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { c as insert, g as template, o as className, u as memo } from "./web-BPyQozky.js";
import { t as classNames } from "./classNames-DxGDjmvw.js";
import { an as groupAddress } from "./confirmationPopup-Bz6mK0o-.js";
import { t as wallet_module_default } from "./wallet.module-3nQsE2jy.js";
//#region src/components/wallet/addressGroups.tsx
var _tmpl$ = /*#__PURE__*/ template(`<span>`);
var _tmpl$2 = /*#__PURE__*/ template(`<span><span dir=ltr>`);
/**
* An address in groups of four, `perLine` to a line (four by default), every other group grey like a checkerboard,
* in the monospace font (iOS): an address is read and compared group by group
*/
function WalletAddressGroups(props) {
	const lines = () => groupAddress(props.address, props.perLine ?? 4).map((line) => line.split(" "));
	return (() => {
		var _el$ = _tmpl$();
		insert(_el$, createComponent(For, {
			get each() {
				return lines();
			},
			children: (groups, row) => (() => {
				var _el$2 = _tmpl$2(), _el$3 = _el$2.firstChild;
				insert(_el$3, createComponent(For, {
					each: groups,
					children: (group, column) => [memo(() => column() ? " " : ""), (() => {
						var _el$4 = _tmpl$();
						insert(_el$4, group);
						createRenderEffect(() => className(_el$4, (row() + column()) % 2 ? props.mutedClass ?? wallet_module_default.addressGroupMuted : void 0));
						return _el$4;
					})()]
				}));
				createRenderEffect(() => className(_el$2, wallet_module_default.addressGroupLine));
				return _el$2;
			})()
		}));
		createRenderEffect(() => className(_el$, classNames(wallet_module_default.addressGroups, props.class)));
		return _el$;
	})();
}
//#endregion
export { WalletAddressGroups as t };
