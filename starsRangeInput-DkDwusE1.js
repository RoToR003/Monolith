//# allFunctionsCalledOnLoad
import { a as i18n } from "./langPack-BmdJGr44.js";
import { _ as createMemo, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { t as clamp } from "./clamp-9UaNhw6N.js";
import { c as insert, f as setAttribute, g as template, o as className, p as setStyleProperty, r as addEventListener, s as delegateEvents } from "./web-BPyQozky.js";
import { t as accumulate } from "./accumulate-DzVphodg.js";
import { t as nMap } from "./nMap-DhT1-MiT.js";
import { n as numberThousandSplitterForStars } from "./numberThousandSplitter-CGiPNwwW.js";
import { w as onRangeInlineArrowKey } from "./openEditors-7FmA7q_V.js";
var starsRangeInput_module_default = {
	Container: "_Container_o17o4_16",
	Row: "_Row_o17o4_21",
	Limit: "_Limit_o17o4_29",
	LimitLast: "_LimitLast_o17o4_33",
	Value: "_Value_o17o4_37",
	InputWrapper: "_InputWrapper_o17o4_43",
	Thumb: "_Thumb_o17o4_58",
	Background: "_Background_o17o4_78",
	Progress: "_Progress_o17o4_88"
};
//#endregion
//#region src/components/sidebarLeft/tabs/privacy/messages/starsRangeInput.tsx
var _tmpl$ = /*#__PURE__*/ template(`<div><div><div></div><div></div><div></div></div><div><input type=range step=1><div></div><div></div><div>`);
var starsPerUnits = [
	[10, 1],
	[10, 2],
	[14, 5],
	[10, 10],
	[12, 25],
	[10, 50],
	[15, 100],
	[20, 250],
	[5, 500]
];
var totalUnits = accumulate(starsPerUnits.map((v) => v[0]), 0);
var totalStars = unitsToStars(totalUnits);
function unitsToStars(units) {
	let stars = 0;
	for (const [u, s] of starsPerUnits) {
		stars += Math.min(units, u) * s;
		units -= u;
		if (units <= 0) break;
	}
	return stars;
}
function starsToUnits(stars) {
	let units = 0;
	for (const [u, s] of starsPerUnits) {
		const v = Math.min(u, Math.floor(stars / s));
		stars -= v * s;
		units += v;
	}
	return units;
}
var StarRangeInput = (props) => {
	const min = createMemo(() => props.startFromZero ? 0 : 1);
	const units = () => clamp(starsToUnits(props.value), min(), totalUnits);
	const normalizedValue = () => nMap(units(), min(), totalUnits, 0, 1);
	const onInput = (e) => {
		const clampedValue = clamp(e.currentTarget.valueAsNumber, min(), totalUnits);
		const newValue = Math.round(unitsToStars(clampedValue));
		props.onChange(newValue);
	};
	return (() => {
		var _el$ = _tmpl$(), _el$2 = _el$.firstChild, _el$3 = _el$2.firstChild, _el$4 = _el$3.nextSibling, _el$5 = _el$4.nextSibling, _el$6 = _el$2.nextSibling, _el$7 = _el$6.firstChild, _el$8 = _el$7.nextSibling, _el$9 = _el$8.nextSibling, _el$0 = _el$9.nextSibling;
		insert(_el$3, min);
		insert(_el$4, () => i18n("Stars", [numberThousandSplitterForStars(parseInt(props.value.toFixed(0)))]));
		insert(_el$5, () => numberThousandSplitterForStars(totalStars));
		addEventListener(_el$7, "keydown", onRangeInlineArrowKey, true);
		_el$7.$$input = onInput;
		setAttribute(_el$7, "max", totalUnits);
		createRenderEffect((_p$) => {
			var _v$ = starsRangeInput_module_default.Container, _v$2 = normalizedValue(), _v$3 = normalizedValue() * 100 + "%", _v$4 = starsRangeInput_module_default.Row, _v$5 = starsRangeInput_module_default.Limit, _v$6 = starsRangeInput_module_default.Value, _v$7 = `${starsRangeInput_module_default.Limit} ${starsRangeInput_module_default.LimitLast}`, _v$8 = starsRangeInput_module_default.InputWrapper, _v$9 = min(), _v$0 = starsRangeInput_module_default.Background, _v$1 = starsRangeInput_module_default.Thumb, _v$10 = starsRangeInput_module_default.Progress;
			_v$ !== _p$.e && className(_el$, _p$.e = _v$);
			_v$2 !== _p$.t && setStyleProperty(_el$, "--normalized", _p$.t = _v$2);
			_v$3 !== _p$.a && setStyleProperty(_el$, "--w", _p$.a = _v$3);
			_v$4 !== _p$.o && className(_el$2, _p$.o = _v$4);
			_v$5 !== _p$.i && className(_el$3, _p$.i = _v$5);
			_v$6 !== _p$.n && className(_el$4, _p$.n = _v$6);
			_v$7 !== _p$.s && className(_el$5, _p$.s = _v$7);
			_v$8 !== _p$.h && className(_el$6, _p$.h = _v$8);
			_v$9 !== _p$.r && setAttribute(_el$7, "min", _p$.r = _v$9);
			_v$0 !== _p$.d && className(_el$8, _p$.d = _v$0);
			_v$1 !== _p$.l && className(_el$9, _p$.l = _v$1);
			_v$10 !== _p$.u && className(_el$0, _p$.u = _v$10);
			return _p$;
		}, {
			e: void 0,
			t: void 0,
			a: void 0,
			o: void 0,
			i: void 0,
			n: void 0,
			s: void 0,
			h: void 0,
			r: void 0,
			d: void 0,
			l: void 0,
			u: void 0
		});
		createRenderEffect(() => _el$7.value = units());
		return _el$;
	})();
};
delegateEvents(["input", "keydown"]);
//#endregion
export { StarRangeInput as t };
