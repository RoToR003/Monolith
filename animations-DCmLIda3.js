//# allFunctionsCalledOnLoad
import { r as getTransition } from "./themeController-2cytOOn0.js";
import { t as noop$1 } from "./noop-H9NNBLfX.js";
import { C as createSignal, L as untrack, _ as createMemo, i as For, n as $TRACK, p as createComponent, s as Show, y as createRenderEffect, z as useTransition } from "./solid-9Vxm0VIz.js";
import { c as insert, g as template, o as className, t as Dynamic } from "./web-BPyQozky.js";
import { t as liteMode } from "./liteMode-DeLStZfQ.js";
import { t as sequentialDom } from "./sequentialDom-CRhA0kB2.js";
import { t as classNames } from "./classNames-DxGDjmvw.js";
import { n as resolveElements } from "./dist-Fd6wPWkH.js";
import { t as keyframesAtLevel } from "./reducedKeyframes-Dx3U8F3X.js";
//#region src/vendor/createListTransition.ts
var noop = () => {};
function createListTransition(source, options) {
	const initSource = untrack(source);
	const { onChange } = options;
	let prevSet = new Set(options.appear ? void 0 : initSource);
	const exiting = /* @__PURE__ */ new WeakSet();
	const [toRemove, setToRemove] = createSignal([], { equals: false });
	const [isTransitionPending] = useTransition();
	const finishRemoved = options.exitMethod === "remove" ? noop : (els) => {
		setToRemove((p) => (p.push(...els), p));
		for (const el of els) exiting.delete(el);
	};
	let handleRemoved;
	if (options.exitMethod === "remove") handleRemoved = noop;
	else if (options.exitMethod === "keep-index") handleRemoved = (options) => options.elements.splice(options.previousIndex, 0, options.element);
	else if (options.exitMethod === "keep-relative") handleRemoved = (options) => {
		let index;
		if (options.side === "start") index = options.previousIndex;
		else index = options.elements.length;
		options.elements.splice(index, 0, options.element);
	};
	else handleRemoved = (options) => options.elements.push(options.element);
	const compute = (prev) => {
		const elsToRemove = toRemove();
		const sourceList = source();
		sourceList[$TRACK];
		if (untrack(isTransitionPending)) {
			isTransitionPending();
			return prev;
		}
		if (elsToRemove.length) {
			const next = prev.filter((e) => !elsToRemove.includes(e));
			elsToRemove.length = 0;
			onChange({
				list: next,
				added: [],
				removed: [],
				unchanged: next,
				finishRemoved
			});
			return next;
		}
		return untrack(() => {
			const nextSet = new Set(sourceList);
			const next = sourceList.slice();
			const added = [];
			const removed = [];
			const unchanged = [];
			for (const el of sourceList) (prevSet.has(el) ? unchanged : added).push(el);
			const removedOptions = {
				elements: next,
				previousElements: prev,
				side: "start"
			};
			let nothingChanged = !added.length;
			for (let i = 0; i < prev.length; ++i) {
				const el = prev[i];
				if (!nextSet.has(el)) {
					if (!exiting.has(el)) {
						removed.push(el);
						exiting.add(el);
					}
					removedOptions.element = el;
					removedOptions.previousIndex = i;
					handleRemoved(removedOptions);
				} else removedOptions.side = "end";
				if (nothingChanged && el !== next[i]) nothingChanged = false;
			}
			if (!removed.length && nothingChanged) return prev;
			onChange({
				list: next,
				added,
				removed,
				unchanged,
				finishRemoved
			});
			prevSet = nextSet;
			return next;
		});
	};
	return createMemo(compute, options.appear ? [] : initSource.slice());
}
//#endregion
//#region src/helpers/dom/getLayoutWidth.ts
/**
* The width an element is laid out to - fractional, unlike `offsetWidth`, and with its transforms
* aside, unlike `getBoundingClientRect` - or 0 for one not laid out. A read of the layout
*/
function getLayoutWidth(element) {
	return parseFloat((element.ownerDocument.defaultView || window).getComputedStyle(element).width) || 0;
}
//#endregion
//#region src/helpers/dom/isInSight.ts
/**
* Whether an element can be seen: laid out, within the viewport, and not hidden by an ancestor's
* opacity or visibility - the chat list of a narrow screen with a chat open over it. A read of
* the layout: for a measure phase (`sequentialDom.measure`)
*/
function isInSight(element) {
	const rect = element.getBoundingClientRect();
	return !!rect.width && rect.bottom > 0 && rect.right > 0 && rect.top < innerHeight && rect.left < innerWidth && (element.checkVisibility?.({
		opacityProperty: true,
		visibilityProperty: true
	}) ?? true);
}
//#endregion
//#region src/helpers/dom/crossfadeContent.ts
/** the `cross-fade` of `Animated` (`@helpers/solid/animations`), and of the DOM that has no Solid around it */
var CROSS_FADE_KEYFRAMES = [{ opacity: 0 }, { opacity: 1 }];
/** the timing of `Animated`, whatever it animates */
function getAnimatedOptions(duration = 200) {
	return {
		duration,
		easing: getTransition("standard").easing
	};
}
var crossfades = /* @__PURE__ */ new WeakMap();
/** Ends the crossfade of `element` at once, leaving it what it was crossfading to */
function finishCrossfade(element) {
	const crossfade = crossfades.get(element);
	if (!crossfade) return;
	crossfades.delete(element);
	crossfade.fadingOut.cancel();
	crossfade.fadingIn.forEach((animation) => animation.cancel());
	crossfade.resizing?.animation.cancel();
	element.classList.remove("is-crossfading");
	if (crossfade.leaving.parentNode === element) crossfade.leaving.remove();
	crossfade.wrappers.forEach((wrapper) => {
		if (wrapper.parentNode === element) wrapper.replaceWith(...wrapper.childNodes);
	});
}
/**
* What `element` is crossfading to, as `crossfadeContent` was given it, while it does - the
* element's own children then hold the wrapped text of it, and what fades out
*/
function getCrossfadingTo(element) {
	const crossfade = crossfades.get(element);
	return crossfade?.leaving.parentNode === element ? crossfade.nodes : void 0;
}
/** Puts `nodes` in before what is fading out, fading in in step with it */
function enter(crossfade, nodes) {
	const wrappers = [];
	const entering = nodes.map((node) => {
		if (typeof node !== "string" && node.nodeType === Node.ELEMENT_NODE) return node;
		const wrapper = document.createElement("span");
		wrapper.append(node);
		wrappers.push(wrapper);
		return wrapper;
	});
	crossfade.leaving.before(...entering);
	crossfade.nodes = nodes;
	crossfade.wrappers = wrappers;
	const options = getAnimatedOptions(crossfade.duration);
	const { currentTime } = crossfade.fadingOut;
	crossfade.fadingIn = entering.map((node) => {
		const animation = node.animate(CROSS_FADE_KEYFRAMES, options);
		if (currentTime !== null) animation.currentTime = currentTime;
		return animation;
	});
}
/**
* Takes an element as wide as its content (`resize`) from the width of what it held to the
* width of what it holds, in step with what is left of the crossfade. Nothing is read while the
* caller writes: the widths are read in the next frame's measure phase - the old one off what
* fades out, which keeps its own width (`width: max-content`), or off the resize under way - and
* the resize starts in its mutate phase, before that frame paints. Out of sight, the crossfade
* ends there instead
*/
function resize(element, crossfade) {
	let from;
	const { resizing } = crossfade;
	if (resizing) {
		const { animation } = resizing;
		const progress = animation.effect.getComputedTiming().progress ?? (animation.playState === "finished" ? 1 : 0);
		from = resizing.from + (resizing.to - resizing.from) * progress;
		animation.cancel();
		crossfade.resizing = void 0;
	}
	const version = crossfade.resizeVersion = (crossfade.resizeVersion || 0) + 1;
	const isCurrent = () => crossfades.get(element) === crossfade && crossfade.resizeVersion === version;
	let to, inSight;
	sequentialDom.measure(() => {
		if (!isCurrent()) return;
		inSight = isInSight(element);
		if (inSight) {
			from ?? (from = getLayoutWidth(crossfade.leaving));
			to = getLayoutWidth(element);
		}
	});
	sequentialDom.mutate(() => {
		if (!isCurrent() || inSight === void 0) return;
		if (!inSight) {
			finishCrossfade(element);
			return;
		}
		if (Math.abs(to - from) < .5) return;
		const options = getAnimatedOptions(crossfade.duration);
		crossfade.resizing = {
			from,
			to,
			animation: element.animate([{ width: from + "px" }, { width: to + "px" }], {
				...options,
				duration: Math.max(0, options.duration - (crossfade.fadingOut.currentTime || 0))
			})
		};
	});
}
/**
* Puts `content` in place of what `element` holds with a crossfade: the old content fades out
* over the new, which fades in. The new content takes the element's flow from the start - so
* nothing is measured, and whoever looks for it finds it among the element's children - while
* the old one is laid over the element's own box (`.crossfade-leaving`) and dropped once faded.
* The `mode` says what the content is to what the element holds:
*
* - `crossfade` - another thing, to crossfade to;
* - `update` - the content is of the kind it holds, new only in its details: a plain replacement,
*   unless the element is crossfading to it, when the update fades in where that left off;
* - `replace` - a plain replacement, cutting a crossfade short.
*
* With animations off or out of sight it is always the plain replacement.
*
* An element as wide as its content - next to something its width moves - can be given `resize`:
* its width then goes from the old content's to the new one's in step with the crossfade, read
* and started a frame later (`resize`) - and `duration`, when the default length is not its own
*/
function crossfadeContent(element, content, mode = "crossfade", { resize: shouldResize, duration } = {}) {
	const nodes = Array.isArray(content) ? content : [content];
	const canAnimate = element.isConnected && !document.hidden && liteMode.isAvailable("animations");
	const running = crossfades.get(element);
	if (mode === "update" && canAnimate && running?.leaving.parentNode === element) {
		running.fadingIn.forEach((animation) => animation.cancel());
		Array.from(element.childNodes).forEach((node) => {
			if (node !== running.leaving) node.remove();
		});
		enter(running, nodes);
		if (shouldResize) resize(element, running);
		return;
	}
	finishCrossfade(element);
	if (mode !== "crossfade" || !canAnimate || !element.firstChild) {
		element.replaceChildren(...nodes);
		return;
	}
	const leaving = document.createElement("span");
	leaving.className = "crossfade-leaving";
	leaving.setAttribute("aria-hidden", "true");
	leaving.append(...element.childNodes);
	element.classList.add("is-crossfading");
	element.append(leaving);
	const options = getAnimatedOptions(duration);
	const crossfade = {
		leaving,
		fadingOut: leaving.animate(CROSS_FADE_KEYFRAMES.slice().reverse(), {
			...options,
			fill: "forwards"
		}),
		nodes,
		wrappers: [],
		fadingIn: [],
		duration: options.duration
	};
	enter(crossfade, nodes);
	crossfades.set(element, crossfade);
	if (shouldResize) resize(element, crossfade);
	crossfade.fadingOut.finished.then(() => {
		if (crossfades.get(element) === crossfade) finishCrossfade(element);
	}, noop$1);
}
//#endregion
//#region src/helpers/solid/animationList.ts
function wrapKeyframes(keyframes) {
	return typeof keyframes !== "function" ? () => keyframes : keyframes;
}
function AnimationList(props) {
	const children = resolveElements(() => props.children).toArray;
	const itemClassSplitted = props.itemClass?.split(" ");
	const addClassName = itemClassSplitted?.length && itemClassSplitted[0].trim() ? (added) => {
		added.forEach((element) => {
			element.classList.add(...itemClassSplitted);
		});
	} : void 0;
	addClassName?.(children());
	return createListTransition(children, {
		exitMethod: "keep-index",
		appear: props.appear,
		onChange: ({ added, removed, finishRemoved: _finishRemoved }) => {
			const finishRemoved = (removed) => {
				_finishRemoved(removed);
				removed.forEach((element) => props.onAfterExit?.(element));
			};
			const animationLevel = liteMode.getAnimationLevel();
			const options = props.animationOptions;
			addClassName?.(added);
			const keyframesOf = wrapKeyframes(props.keyframes);
			const getKeyframes = (element, removed) => {
				return keyframesAtLevel(keyframesOf(element, removed), animationLevel) || (animationLevel === 1 && props.mode === "replacement" ? CROSS_FADE_KEYFRAMES : void 0);
			};
			let shouldAnimateAdded = false, shouldAnimateRemoved = false;
			if (props.mode === "replacement") {
				shouldAnimateAdded = !!removed.length;
				shouldAnimateRemoved = !!added.length;
			} else if (props.mode === "remove") shouldAnimateRemoved = !!removed.length;
			else if (props.mode === "add-remove") {
				shouldAnimateAdded = !!added.length;
				shouldAnimateRemoved = !!removed.length;
			}
			queueMicrotask(() => {
				if (shouldAnimateAdded) {
					const elements = added.filter((element) => element.isConnected);
					const keyframes = elements.map((element) => getKeyframes(element, false));
					elements.forEach((element, idx) => {
						if (keyframes[idx]) element.animate(keyframes[idx], options);
					});
				}
				if (!shouldAnimateRemoved) {
					finishRemoved(removed);
					return;
				}
				const elements = removed.filter((element) => element.isConnected);
				const reversedKeyframes = elements.map((element) => getKeyframes(element, true)?.slice().reverse());
				const animations = elements.map((element, idx) => {
					return reversedKeyframes[idx] && element.animate(reversedKeyframes[idx], {
						...options,
						fill: "forwards"
					});
				}).filter(Boolean);
				Promise.all(animations.map((animation) => animation.finished)).catch(noop$1).then(() => {
					finishRemoved(removed);
					animations.forEach((animation) => animation.cancel());
				});
			});
		}
	});
}
//#endregion
//#region src/helpers/solid/animations.tsx
var _tmpl$ = /*#__PURE__*/ template(`<div style=overflow:hidden>`);
var growKeyframes = (property, size) => {
	return [{
		[property]: 0,
		opacity: 0
	}, {
		[property]: size + "px",
		opacity: 1
	}];
};
var ANIMATIONS = {
	"cross-fade": CROSS_FADE_KEYFRAMES,
	"grow-width": (element) => growKeyframes("width", element.clientWidth),
	"grow-height": (element) => growKeyframes("height", element.clientHeight)
};
function SimpleAnimation(props) {
	return createComponent(AnimationList, {
		get animationOptions() {
			return getAnimatedOptions();
		},
		get keyframes() {
			return props.keyframes;
		},
		get mode() {
			return props.mode || "replacement";
		},
		get itemClass() {
			return classNames(!props.noItemClass && "animated-item", props.itemClass);
		},
		get appear() {
			return props.appear;
		},
		get onAfterExit() {
			return props.onAfterExit;
		},
		get children() {
			return props.children;
		}
	});
}
function Animated(props) {
	return createComponent(Dynamic, {
		component: SimpleAnimation,
		get keyframes() {
			return ANIMATIONS[props.type];
		},
		get mode() {
			return props.mode;
		},
		get appear() {
			return props.appear;
		},
		get noItemClass() {
			return props.noItemClass;
		},
		get itemClass() {
			return props.itemClass;
		},
		get onAfterExit() {
			return props.onAfterExit;
		},
		get children() {
			return props.children;
		}
	});
}
function GrowHeightReveal(props) {
	return createComponent(Animated, {
		type: "grow-height",
		noItemClass: true,
		mode: "add-remove",
		get appear() {
			return props.appear ?? true;
		},
		get children() {
			return createComponent(Show, {
				get when() {
					return props.when;
				},
				get children() {
					var _el$ = _tmpl$();
					insert(_el$, () => props.children);
					createRenderEffect(() => className(_el$, props.class));
					return _el$;
				}
			});
		}
	});
}
function GrowHeightList(props) {
	return createComponent(Animated, {
		type: "grow-height",
		noItemClass: true,
		mode: "add-remove",
		appear: false,
		get children() {
			return createComponent(For, {
				get each() {
					return props.each;
				},
				children: (item, index) => (() => {
					var _el$2 = _tmpl$();
					insert(_el$2, () => props.children(item, index));
					return _el$2;
				})()
			});
		}
	});
}
//#endregion
export { AnimationList as a, getAnimatedOptions as c, getLayoutWidth as d, createListTransition as f, SimpleAnimation as i, getCrossfadingTo as l, GrowHeightList as n, CROSS_FADE_KEYFRAMES as o, GrowHeightReveal as r, crossfadeContent as s, Animated as t, isInSight as u };
