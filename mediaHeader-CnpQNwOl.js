//# allFunctionsCalledOnLoad
import { t as noop } from "./noop-H9NNBLfX.js";
import { A as mergeProps, M as onCleanup, R as useContext, h as createContext, p as createComponent, s as Show, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { _ as use, a as classList, c as insert, g as template, o as className, p as setStyleProperty, s as delegateEvents, t as Dynamic, u as memo } from "./web-BPyQozky.js";
import { t as classNames } from "./classNames-DxGDjmvw.js";
import { t as lottieLoader } from "./lottieLoader-B3FXw0K7.js";
//#region src/components/lottieAnimation.tsx
var _tmpl$$1 = /*#__PURE__*/ template(`<div>`);
var LottieAnimation = (inProps) => {
	const props = mergeProps({ size: 100 }, inProps);
	let animationPromise;
	const div = (() => {
		var _el$ = _tmpl$$1();
		_el$.$$click = () => {
			if (!props.restartOnClick) return;
			animationPromise?.then((animation) => {
				animation.playOrRestart();
			});
		};
		createRenderEffect((_p$) => {
			var _v$ = { [props.class]: !!props.class }, _v$2 = props.size + "px";
			_p$.e = classList(_el$, _v$, _p$.e);
			_v$2 !== _p$.t && setStyleProperty(_el$, "--size", _p$.t = _v$2);
			return _p$;
		}, {
			e: void 0,
			t: void 0
		});
		return _el$;
	})();
	let cleanup = false;
	function loadAnimation() {
		if (props.needRaf && !div.isConnected && !cleanup) {
			requestAnimationFrame(loadAnimation);
			return;
		}
		const params = {
			container: div,
			loop: false,
			autoplay: true,
			width: props.size,
			height: props.size,
			group: "none",
			...props.lottieOptions
		};
		animationPromise = props.animationData ? props.animationData.then((load) => load(params)) : props.lottieLoader.loadAnimationAsAsset(params, props.name);
		props.onPromise?.(animationPromise);
	}
	createRenderEffect(loadAnimation);
	onCleanup(() => {
		cleanup = true;
		animationPromise?.then((animation) => {
			animation.remove();
		});
	});
	return div;
};
delegateEvents(["click"]);
//#endregion
//#region src/components/solidJsTabs/promiseCollector.tsx
var PromiseCollectorContext = createContext({ collect: () => {} });
var PromiseCollector = (props) => {
	return createComponent(PromiseCollectorContext.Provider, {
		get value() {
			return { collect: props.onCollect };
		},
		get children() {
			return props.children;
		}
	});
};
PromiseCollector.createHelper = () => {
	const promises = [];
	let collectPromise = (promise) => {
		promises.push(promise);
	};
	return {
		onCollect: (promise) => collectPromise(promise),
		await: () => {
			collectPromise = () => {};
			return Promise.all(promises);
		}
	};
};
var usePromiseCollector = () => useContext(PromiseCollectorContext);
var mediaHeader_module_default = {
	container: "_container_16kfa_1",
	alignStart: "_alignStart_16kfa_8",
	title: "_title_16kfa_11",
	subtitle: "_subtitle_16kfa_12",
	onBackdrop: "_onBackdrop_16kfa_17",
	sticker: "_sticker_16kfa_21",
	backdrop: "_backdrop_16kfa_30",
	marginTop: "_marginTop_16kfa_41",
	marginBottom: "_marginBottom_16kfa_45",
	title20: "_title20_16kfa_63",
	secondary: "_secondary_16kfa_73",
	danger: "_danger_16kfa_78",
	lottie: "_lottie_16kfa_98"
};
//#endregion
//#region src/components/mediaHeader.tsx
var _tmpl$ = /*#__PURE__*/ template(`<div>`);
/**
* Compound header used by auth cards, intro popups, and other "icon → title →
* subtitle" surfaces. Each piece is a sub-component with its own props, so a
* caller picks only what they need:
*
* ```tsx
* <MediaHeader>
*   <MediaHeader.Sticker name="key" size={120} />
*   <MediaHeader.Title>{i18n('Login.Title')}</MediaHeader.Title>
*   <MediaHeader.Subtitle>{i18n('Login.StartText')}</MediaHeader.Subtitle>
* </MediaHeader>
* ```
*
* `MediaHeader.Sticker` accepts either a built-in lottie asset (`name`) or a
* custom JSX element (`element`) — useful for SVG logos, avatars, canvases,
* monkey components, etc. Cards that need an imperative ref to the slot can
* pass a stable container element via `element`. It is a square, centred box;
* media that is not square (a wide illustration) goes straight into
* `<MediaHeader>` as a child instead, with its own sizing. A tab passes its
* asset as `animationData` instead of `name`, fetched from its `getInitArgs`,
* and does not slide in before the sticker has drawn its first frame.
*
* The type scale is deliberately narrow — a 24px or a 20px title (`size`), body
* copy or a smaller grey / danger variant (`color`). Reach for a prop rather
* than restyling a copy of it. A subtitle honours the line breaks its language
* string carries, so translated copy never needs markup to break a line.
*
* A header can also sit on a painted backdrop, which is how collectible gifts
* are presented — the copy turns white and stacks above it:
*
* ```tsx
* <MediaHeader onBackdrop>
*   <MediaHeader.Backdrop><StarGiftBackdrop … /></MediaHeader.Backdrop>
*   <MediaHeader.Sticker size={120} ref={stickerContainer} />
*   <MediaHeader.Title>{gift.title}</MediaHeader.Title>
* </MediaHeader>
* ```
*
* Spacing: the block owns the rhythm between its own pieces (a single `gap`),
* and the pieces themselves declare no vertical margins — so a caller is free
* to set any margin on any of them without racing this module's declarations
* through CSS-module load order. Distance around the whole block comes from
* `marginTop` / `marginBottom`; a block that wants a different internal rhythm
* overrides `gap` on its own class. A `Title`/`Subtitle` pair rendered loose,
* without a `<MediaHeader>` around it, gets no gap at all — wrap the pair.
*/
function MediaHeader(props) {
	return (() => {
		var _el$ = _tmpl$();
		insert(_el$, () => props.children);
		createRenderEffect(() => className(_el$, classNames(mediaHeader_module_default.container, props.align === "start" && mediaHeader_module_default.alignStart, props.onBackdrop && mediaHeader_module_default.onBackdrop, props.marginTop && mediaHeader_module_default.marginTop, props.marginBottom && mediaHeader_module_default.marginBottom, props.class)));
		return _el$;
	})();
}
/**
* Fills the header behind everything else — pass the painted element (a gift's
* `StarGiftBackdrop`, say) as the child. Needs `onBackdrop` on the header.
*/
MediaHeader.Backdrop = function MediaHeaderBackdrop(props) {
	return (() => {
		var _el$2 = _tmpl$();
		insert(_el$2, () => props.children);
		createRenderEffect(() => className(_el$2, classNames(mediaHeader_module_default.backdrop, props.class)));
		return _el$2;
	})();
};
MediaHeader.Sticker = function MediaHeaderSticker(props) {
	const size = () => props.size || 130;
	const promiseCollector = usePromiseCollector();
	if (props.element) props.onReady?.();
	return (() => {
		var _el$3 = _tmpl$();
		var _ref$ = props.ref;
		typeof _ref$ === "function" ? use(_ref$, _el$3) : props.ref = _el$3;
		insert(_el$3, createComponent(Show, {
			get when() {
				return props.name || props.animationData;
			},
			get fallback() {
				return memo(() => typeof props.element === "function")() ? props.element() : props.element;
			},
			get children() {
				return createComponent(LottieAnimation, {
					get ["class"]() {
						return mediaHeader_module_default.lottie;
					},
					get size() {
						return size();
					},
					lottieLoader,
					get restartOnClick() {
						return props.restartOnClick ?? true;
					},
					get name() {
						return props.name;
					},
					get animationData() {
						return props.animationData;
					},
					onPromise: (promise) => {
						promise.then(props.onReady);
						if (props.animationData) promiseCollector.collect(promise.then((player) => lottieLoader.waitForFirstFrame(player)).catch(noop));
					}
				});
			}
		}));
		createRenderEffect((_p$) => {
			var _v$ = classNames(mediaHeader_module_default.sticker, props.class), _v$2 = size() + "px";
			_v$ !== _p$.e && className(_el$3, _p$.e = _v$);
			_v$2 !== _p$.t && setStyleProperty(_el$3, "--sticker-size", _p$.t = _v$2);
			return _p$;
		}, {
			e: void 0,
			t: void 0
		});
		return _el$3;
	})();
};
MediaHeader.Title = function MediaHeaderTitle(props) {
	return createComponent(Dynamic, {
		get component() {
			return props.tag || "div";
		},
		"data-popup-title": true,
		get ["class"]() {
			return classNames(mediaHeader_module_default.title, props.size === 20 && mediaHeader_module_default.title20, props.class);
		},
		get children() {
			return props.children;
		}
	});
};
MediaHeader.Subtitle = function MediaHeaderSubtitle(props) {
	return (() => {
		var _el$4 = _tmpl$();
		insert(_el$4, () => props.children);
		createRenderEffect(() => className(_el$4, classNames(mediaHeader_module_default.subtitle, props.color && mediaHeader_module_default[props.color], props.class)));
		return _el$4;
	})();
};
//#endregion
export { LottieAnimation as a, usePromiseCollector as i, mediaHeader_module_default as n, PromiseCollector as r, MediaHeader as t };
