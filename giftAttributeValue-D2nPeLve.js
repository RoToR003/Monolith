//# allFunctionsCalledOnLoad
import { h as Modes } from "./userAgent-ByGXcznk.js";
import { a as i18n } from "./langPack-BmdJGr44.js";
import { p as createComponent, s as Show, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { c as insert, f as setAttribute, g as template, o as className, r as addEventListener, s as delegateEvents, u as memo } from "./web-BPyQozky.js";
import { t as classNames } from "./classNames-DxGDjmvw.js";
import { t as buttonKeyDown } from "./buttonKeyDown-CqZzefS3.js";
import { r as TableButtonWithTooltip } from "./table-Bjjwur0y.js";
var giftAttributeValue_module_default = {
	value: "_value_1drq5_6",
	rarity: "_rarity_1drq5_11",
	clickable: "_clickable_1drq5_15",
	green: "_green_1drq5_23",
	blue: "_blue_1drq5_27",
	violet: "_violet_1drq5_31",
	gold: "_gold_1drq5_35",
	tooltip: "_tooltip_1drq5_39"
};
//#endregion
//#region src/components/stargifts/giftAttributeValue.tsx
var _tmpl$ = /*#__PURE__*/ template(`<span dir=ltr>`);
var _tmpl$2 = /*#__PURE__*/ template(`<div>`);
var _tmpl$3 = /*#__PURE__*/ template(`<span role=button dir=auto>`);
var _tmpl$4 = /*#__PURE__*/ template(`<span dir=auto>`);
var RARITY_TIERS = {
	starGiftAttributeRarityUncommon: {
		langKey: "StarGiftRarityUncommon",
		color: giftAttributeValue_module_default.green
	},
	starGiftAttributeRarityRare: {
		langKey: "StarGiftRarityRare",
		color: giftAttributeValue_module_default.blue
	},
	starGiftAttributeRarityEpic: {
		langKey: "StarGiftRarityEpic",
		color: giftAttributeValue_module_default.violet
	},
	starGiftAttributeRarityLegendary: {
		langKey: "StarGiftRarityLegendary",
		color: giftAttributeValue_module_default.gold
	}
};
/**
* How rare a collectible's attribute is, in a pill beside its value: the share of the collectibles that have
* it, which a click explains, or its tier in the tier's colour.
*/
function GiftAttributeRarity(props) {
	const rarity = props.rarity;
	if (rarity._ !== "starGiftAttributeRarity") {
		const tier = RARITY_TIERS[rarity._];
		return createComponent(TableButtonWithTooltip, {
			get ["class"]() {
				return classNames(giftAttributeValue_module_default.rarity, tier.color, "disable-hover");
			},
			get children() {
				return i18n(tier.langKey);
			}
		});
	}
	const percent = rarity.permille > 0 ? `${rarity.permille / 10}%` : "< 0.1%";
	return createComponent(TableButtonWithTooltip, {
		get tooltipTextElement() {
			return i18n("StarGiftAttributeTooltip", [percent]);
		},
		get tooltipClass() {
			return giftAttributeValue_module_default.tooltip;
		},
		get children() {
			var _el$ = _tmpl$();
			insert(_el$, percent);
			return _el$;
		}
	});
}
/**
* A collectible's attribute (model, backdrop, symbol) as a table value: its name, how rare it is when that is
* known, and the name as a link when the caller has somewhere to take it.
*/
function GiftAttributeValue(props) {
	return (() => {
		var _el$2 = _tmpl$2();
		insert(_el$2, (() => {
			var _c$ = memo(() => !!props.onClick);
			return () => _c$() ? (() => {
				var _el$3 = _tmpl$3();
				addEventListener(_el$3, "keydown", buttonKeyDown, true);
				addEventListener(_el$3, "click", props.onClick, true);
				insert(_el$3, () => props.name);
				createRenderEffect((_p$) => {
					var _v$ = giftAttributeValue_module_default.clickable, _v$2 = Modes.a11y ? 0 : void 0;
					_v$ !== _p$.e && className(_el$3, _p$.e = _v$);
					_v$2 !== _p$.t && setAttribute(_el$3, "tabindex", _p$.t = _v$2);
					return _p$;
				}, {
					e: void 0,
					t: void 0
				});
				return _el$3;
			})() : (() => {
				var _el$4 = _tmpl$4();
				insert(_el$4, () => props.name);
				return _el$4;
			})();
		})(), null);
		insert(_el$2, createComponent(Show, {
			get when() {
				return props.rarity;
			},
			keyed: true,
			children: (rarity) => createComponent(GiftAttributeRarity, { rarity })
		}), null);
		createRenderEffect(() => className(_el$2, giftAttributeValue_module_default.value));
		return _el$2;
	})();
}
delegateEvents(["click", "keydown"]);
//#endregion
export { GiftAttributeValue as t };
