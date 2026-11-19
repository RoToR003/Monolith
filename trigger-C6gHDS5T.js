//# allFunctionsCalledOnLoad
import { h as Modes } from "./userAgent-ByGXcznk.js";
import { a as Icons } from "./icon-DbP6Es97.js";
import { C as createSignal, p as createComponent } from "./solid-9Vxm0VIz.js";
import { c as insert, d as render, f as setAttribute, g as template, o as className, r as addEventListener, s as delegateEvents } from "./web-BPyQozky.js";
import { t as IconTsx } from "./iconTsx-B4lOk4A6.js";
import { t as Scrollable$1 } from "./scrollable2-Bau9Hoih.js";
var iconLibrary_module_default = {
	Popup: "_Popup_12ybw_1",
	Scrollable: "_Scrollable_12ybw_17",
	Name: "_Name_12ybw_22",
	Grid: "_Grid_12ybw_30",
	Icon: "_Icon_12ybw_37"
};
//#endregion
//#region src/components/iconLibrary/iconLibrary.tsx
var _tmpl$ = /*#__PURE__*/ template(`<div>`);
var _tmpl$2 = /*#__PURE__*/ template(`<div><div>`);
var _tmpl$3 = /*#__PURE__*/ template(`<button type=button>`);
var icons = Object.keys(Icons);
var IconLibrary = () => {
	const [selected, setSelected] = createSignal("");
	const [copied, setCopied] = createSignal(false);
	let timeout = 0;
	const onMouseEnter = (icon) => {
		setSelected(icon);
		setCopied(false);
		self.clearTimeout(timeout);
	};
	const onClick = (icon) => {
		navigator.clipboard.writeText(icon).then(() => {
			setCopied(true);
			self.clearTimeout(timeout);
			timeout = self.setTimeout(() => {
				setCopied(false);
			}, 2e3);
		});
	};
	return (() => {
		var _el$ = _tmpl$2(), _el$2 = _el$.firstChild;
		className(_el$, iconLibrary_module_default.Popup);
		className(_el$2, iconLibrary_module_default.Name);
		insert(_el$2, () => selected() || "none", null);
		insert(_el$2, () => copied() && " - Copied!", null);
		insert(_el$, createComponent(Scrollable$1, {
			"class": iconLibrary_module_default.Scrollable,
			get children() {
				var _el$3 = _tmpl$();
				className(_el$3, iconLibrary_module_default.Grid);
				insert(_el$3, icons.map((icon) => createComponent(IconItem, {
					icon,
					onMouseEnter: [onMouseEnter, icon],
					onClick: [onClick, icon]
				})));
				return _el$3;
			}
		}), null);
		return _el$;
	})();
};
var IconItem = (props) => {
	if (!Modes.a11y) return createComponent(IconTsx, {
		"class": iconLibrary_module_default.Icon,
		icon: props.icon,
		onMouseEnter: props.onMouseEnter,
		onClick: props.onClick
	});
	return (() => {
		var _el$4 = _tmpl$3();
		addEventListener(_el$4, "click", props.onClick, true);
		addEventListener(_el$4, "mouseenter", props.onMouseEnter);
		className(_el$4, iconLibrary_module_default.Icon);
		setAttribute(_el$4, "aria-label", props.icon);
		insert(_el$4, createComponent(IconTsx, { icon: props.icon }));
		return _el$4;
	})();
};
delegateEvents(["click"]);
//#endregion
//#region src/components/iconLibrary/trigger.tsx
function showIconLibrary() {
	const div = document.createElement("div");
	document.body.append(div);
	const dispose = render(() => createComponent(IconLibrary, {}), div);
	window["closeIcons"] = () => {
		dispose();
		div.remove();
	};
}
//#endregion
export { showIconLibrary };
