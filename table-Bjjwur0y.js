//# allFunctionsCalledOnLoad
import { h as Modes } from "./userAgent-ByGXcznk.js";
import "./rootScope-CZS0lmz8.js";
import { a as i18n } from "./langPack-BmdJGr44.js";
import { A as mergeProps, I as splitProps, L as untrack, i as For, p as createComponent, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { c as insert, f as setAttribute, g as template, o as className, r as addEventListener, s as delegateEvents, u as memo } from "./web-BPyQozky.js";
import { t as classNames } from "./classNames-DxGDjmvw.js";
import { t as Button } from "./buttonTsx-Bwphkm9r.js";
import { t as buttonKeyDown } from "./buttonKeyDown-CqZzefS3.js";
import { k as AvatarNew } from "./confirmationPopup-Bz6mK0o-.js";
import { j as showTooltip } from "./openEditors-7FmA7q_V.js";
import { t as PeerTitleTsx } from "./peerTitleTsx-DcpEYRoE.js";
var table_module_default = {
	table: "_table_tucm5_1",
	cell: "_cell_tucm5_12",
	key: "_key_tucm5_19",
	boldKey: "_boldKey_tucm5_23",
	value: "_value_tucm5_27",
	peer: "_peer_tucm5_33",
	anonymous: "_anonymous_tucm5_48",
	button: "_button_tucm5_62"
};
//#endregion
//#region src/components/table.tsx
var _tmpl$ = /*#__PURE__*/ template(`<table>`);
var _tmpl$2 = /*#__PURE__*/ template(`<tr><td></td><td><div>`);
var _tmpl$3 = /*#__PURE__*/ template(`<tr><td colspan=2>`);
var _tmpl$4 = /*#__PURE__*/ template(`<div>`);
var _tmpl$5 = /*#__PURE__*/ template(`<div class=popup-star-gift-info-anonymous><img src=assets/img/anon_paid_reaction.png alt=Anonymous>`);
var keyCellClass = classNames(table_module_default.cell, table_module_default.key);
function Table(props) {
	return (() => {
		var _el$ = _tmpl$();
		insert(_el$, createComponent(For, {
			get each() {
				return props.content;
			},
			children: ([key, value]) => (() => {
				var _el$2 = _tmpl$2(), _el$3 = _el$2.firstChild, _el$4 = _el$3.nextSibling, _el$5 = _el$4.firstChild;
				insert(_el$3, () => typeof key === "string" ? i18n(key) : key);
				insert(_el$5, value);
				createRenderEffect((_p$) => {
					var _v$ = classNames(keyCellClass, props.cellClass, props.keyCellClass), _v$2 = classNames(table_module_default.cell, props.cellClass), _v$3 = table_module_default.value;
					_v$ !== _p$.e && className(_el$3, _p$.e = _v$);
					_v$2 !== _p$.t && className(_el$4, _p$.t = _v$2);
					_v$3 !== _p$.a && className(_el$5, _p$.a = _v$3);
					return _p$;
				}, {
					e: void 0,
					t: void 0,
					a: void 0
				});
				return _el$2;
			})()
		}), null);
		insert(_el$, (() => {
			var _c$ = memo(() => !!props.footer);
			return () => _c$() && (() => {
				var _el$6 = _tmpl$3(), _el$7 = _el$6.firstChild;
				insert(_el$7, () => props.footer);
				createRenderEffect(() => className(_el$7, props.footerClass ?? classNames(table_module_default.cell, props.cellClass)));
				return _el$6;
			})();
		})(), null);
		createRenderEffect(() => className(_el$, classNames(table_module_default.table, props.boldKey && table_module_default.boldKey, props.class)));
		return _el$;
	})();
}
function TablePeer(props) {
	const avatar = untrack(() => AvatarNew({
		peerId: props.peerId,
		size: 24,
		props: { "aria-hidden": "true" }
	}));
	return (() => {
		var _el$8 = _tmpl$4();
		addEventListener(_el$8, "keydown", props.onClick ? buttonKeyDown : void 0, true);
		addEventListener(_el$8, "click", props.onClick, true);
		className(_el$8, table_module_default.peer);
		insert(_el$8, (() => {
			var _c$2 = memo(() => props.peerId === 0);
			return () => _c$2() ? [_tmpl$5(), memo(() => i18n("StarGiftHiddenUser"))] : [memo(() => avatar.element), createComponent(PeerTitleTsx, { get peerId() {
				return props.peerId;
			} })];
		})());
		createRenderEffect((_p$) => {
			var _v$4 = props.onClick ? "button" : void 0, _v$5 = props.onClick && Modes.a11y ? 0 : void 0;
			_v$4 !== _p$.e && setAttribute(_el$8, "role", _p$.e = _v$4);
			_v$5 !== _p$.t && setAttribute(_el$8, "tabindex", _p$.t = _v$5);
			return _p$;
		}, {
			e: void 0,
			t: void 0
		});
		return _el$8;
	})();
}
function TableButton(props) {
	return createComponent(Button, mergeProps(props, { "class": table_module_default.button }));
}
function TableButtonWithTooltip(props) {
	const [, rest] = splitProps(props, ["tooltipClass", "tooltipTextElement"]);
	return createComponent(Button, mergeProps(rest, {
		get ["class"]() {
			return classNames(rest.class, table_module_default.button);
		},
		onClick: (evt) => {
			props.onClick?.(evt);
			if (props.tooltipTextElement) showTooltip({
				element: evt.target,
				vertical: "top",
				container: document.body,
				class: props.tooltipClass,
				textElement: props.tooltipTextElement
			});
		}
	}));
}
delegateEvents(["click", "keydown"]);
//#endregion
export { TablePeer as i, TableButton as n, TableButtonWithTooltip as r, Table as t };
