//# allFunctionsCalledOnLoad
import { n as __exportAll } from "./rolldown-runtime-CwcJO0Gh.js";
import { A as mergeProps, C as createSignal, M as onCleanup, N as onMount, _ as createMemo, p as createComponent, s as Show, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { _ as use, c as insert, g as template, o as className, p as setStyleProperty, u as memo } from "./web-BPyQozky.js";
import { n as useReducedMotion, t as liteMode } from "./liteMode-DeLStZfQ.js";
import { t as classNames } from "./classNames-DxGDjmvw.js";
import { t as IconTsx } from "./iconTsx-B4lOk4A6.js";
import { t as clock } from "./clock-D01pG7GG.js";
import { t as addWalletFrameClient } from "./frameLoop-BVgbdMV-.js";
import { i as pixelRatio } from "./dom-CIEs7q6J.js";
import { n as GemView, t as Appearance } from "./stage-K7oS8PBR.js";
var gem_module_default = {
	gem: "_gem_45ssy_6",
	canvas: "_canvas_45ssy_13",
	still: "_still_45ssy_18",
	fallback: "_fallback_45ssy_23"
};
//#endregion
//#region src/components/wallet/gem.tsx
var gem_exports = /* @__PURE__ */ __exportAll({ default: () => WalletGem });
var _tmpl$ = /*#__PURE__*/ template(`<div>`);
var _tmpl$2 = /*#__PURE__*/ template(`<canvas aria-hidden=true>`);
/**
* A live gem on its own canvas — the headers of the wallet's sheets, the transfer cards in a chat. Without WebGL2 or
* with the animations off it is the flat gem glyph, also when they are turned off while it shows; with reduced ones
* the gem stands still, drawn once. A click spins it.
*/
function WalletGem(props) {
	const reducedMotion = useReducedMotion();
	const [failed, setFailed] = createSignal(false);
	const flat = createMemo(() => {
		reducedMotion();
		return failed() || !liteMode.isAvailable("animations");
	});
	const still = createMemo(() => {
		reducedMotion();
		return !liteMode.isAvailable("motion") || !!props.holdStill?.();
	});
	return (() => {
		var _el$ = _tmpl$();
		insert(_el$, createComponent(Show, {
			get when() {
				return memo(() => !!!flat())() && (still() ? "still" : "live");
			},
			keyed: true,
			get fallback() {
				return createComponent(IconTsx, {
					icon: "gram_filled",
					get ["class"]() {
						return classNames(gem_module_default.fallback, props.fallbackClass);
					},
					get style() {
						return { "font-size": props.widthPoints + "px" };
					}
				});
			},
			children: (mode) => createComponent(WalletGemCanvas, mergeProps(props, {
				still: mode === "still",
				onFail: () => setFailed(true)
			}))
		}));
		createRenderEffect((_p$) => {
			var _v$ = classNames(gem_module_default.gem, props.class), _v$2 = props.size + "px", _v$3 = props.size + "px";
			_v$ !== _p$.e && className(_el$, _p$.e = _v$);
			_v$2 !== _p$.t && setStyleProperty(_el$, "width", _p$.t = _v$2);
			_v$3 !== _p$.a && setStyleProperty(_el$, "height", _p$.a = _v$3);
			return _p$;
		}, {
			e: void 0,
			t: void 0,
			a: void 0
		});
		return _el$;
	})();
}
/** the live gem: its GL view and frame client go with it when the gem turns flat or still */
function WalletGemCanvas(props) {
	let canvas;
	onMount(() => {
		let gem;
		try {
			gem = new GemView(canvas, {
				appearance: props.appearance ?? Appearance.blue,
				rotationSpeed: 2 * Math.PI / 26,
				widthPoints: props.widthPoints,
				lightBackground: true,
				backgroundStars: !!props.burst,
				starEmission: .28,
				burstSize: .25,
				starZoom: .55,
				...props.style
			});
		} catch (err) {
			props.onFail();
			return;
		}
		gem.setSize(props.size, pixelRatio());
		if (props.still) {
			gem.render(0);
			onCleanup(() => gem.destroy());
			return;
		}
		const cancelBurst = props.burst ? clock.after(.15, () => gem.burst()) : void 0;
		const draw = (now) => {
			props.beforeFrame?.(gem, now);
			gem.render(now);
		};
		const detach = addWalletFrameClient({
			frame: draw,
			isVisible: props.visible,
			element: canvas,
			onHidden: () => gem.resetClock()
		});
		const onClick = () => gem.kick(9, 1.2);
		if (!props.pointerByHost) canvas.addEventListener("click", onClick);
		const release = props.onGem?.(gem);
		draw(clock.now());
		onCleanup(() => {
			release?.();
			cancelBurst?.();
			canvas.removeEventListener("click", onClick);
			detach();
			gem.destroy();
		});
	});
	return (() => {
		var _el$2 = _tmpl$2();
		var _ref$ = canvas;
		typeof _ref$ === "function" ? use(_ref$, _el$2) : canvas = _el$2;
		createRenderEffect((_p$) => {
			var _v$4 = classNames(gem_module_default.canvas, (props.still || props.pointerByHost) && gem_module_default.still), _v$5 = props.size + "px", _v$6 = props.size + "px";
			_v$4 !== _p$.e && className(_el$2, _p$.e = _v$4);
			_v$5 !== _p$.t && setStyleProperty(_el$2, "width", _p$.t = _v$5);
			_v$6 !== _p$.a && setStyleProperty(_el$2, "height", _p$.a = _v$6);
			return _p$;
		}, {
			e: void 0,
			t: void 0,
			a: void 0
		});
		return _el$2;
	})();
}
//#endregion
export { gem_exports as n, WalletGem as t };
