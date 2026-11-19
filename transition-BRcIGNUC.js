//# allFunctionsCalledOnLoad
import { u as langPack_default } from "./langPack-BmdJGr44.js";
import { n as deferredPromise } from "./cancellablePromise-bof--dnO.js";
import { t as cancelEvent } from "./cancelEvent-Cw8vYZHp.js";
import { t as liteMode } from "./liteMode-DeLStZfQ.js";
import { t as dispatchHeavyAnimationEvent } from "./useHeavyAnimationCheck-sWeBPI3f.js";
import { t as whichChild } from "./whichChild-CwhWxnKO.js";
//#region src/components/transition.ts
function makeTranslate(x, y) {
	if (langPack_default.getIsRTL()) x = -x;
	return `translate3d(${x}px, ${y}px, 0)`;
}
function makeTransitionFunction(options) {
	return options;
}
var slideNavigation = makeTransitionFunction({
	callback: (tabContent, prevTabContent, toRight) => {
		const width = prevTabContent.getBoundingClientRect().width;
		const elements = [tabContent, prevTabContent];
		if (toRight) elements.reverse();
		elements[0].style.filter = `brightness(80%)`;
		elements[0].style.transform = makeTranslate(-width * .25, 0);
		elements[1].style.transform = makeTranslate(width, 0);
		tabContent.classList.add("active");
		tabContent.offsetWidth;
		tabContent.style.transform = "";
		tabContent.style.filter = "";
		return () => {
			prevTabContent.style.transform = prevTabContent.style.filter = "";
		};
	},
	animateFirst: false
});
var slideTabs = makeTransitionFunction({
	callback: (tabContent, prevTabContent, toRight) => {
		const width = prevTabContent.getBoundingClientRect().width;
		const elements = [tabContent, prevTabContent];
		if (toRight) elements.reverse();
		elements[0].style.transform = makeTranslate(-width, 0);
		elements[1].style.transform = makeTranslate(width, 0);
		tabContent.classList.add("active");
		tabContent.offsetWidth;
		tabContent.style.transform = "";
		return () => {
			prevTabContent.style.transform = "";
		};
	},
	animateFirst: false
});
var transitions = {
	navigation: slideNavigation,
	premiumTabs: makeTransitionFunction({
		callback: (tabContent, prevTabContent, toRight) => {
			const width = prevTabContent.getBoundingClientRect().width;
			const elements = [tabContent, prevTabContent];
			const classes = ["slide-right", "slide-left"];
			if (toRight) {
				elements.reverse();
				classes.reverse();
			}
			elements[0].style.transform = makeTranslate(-width, 0);
			elements[1].style.transform = makeTranslate(width, 0);
			tabContent.classList.add("active", classes[0]);
			prevTabContent.classList.add(classes[1]);
			tabContent.offsetWidth;
			tabContent.style.transform = "";
			tabContent.classList.remove(classes[0]);
			return () => {
				prevTabContent.style.transform = "";
				prevTabContent.classList.remove(classes[1]);
			};
		},
		animateFirst: false
	}),
	tabs: slideTabs
};
var TransitionSlider = (options) => {
	let { content, type: t, transitionTime, onTransitionEnd, onTransitionStart, onTransitionStartAfter, isHeavy = true, once = false, withAnimationListener = true, listenerSetter, animateFirst = false } = options;
	const type = t;
	const { callback: animationFunction, animateFirst: _animateFirst } = transitions[type] || {};
	content.dataset.animation = type;
	if (_animateFirst !== void 0) animateFirst = _animateFirst;
	const onTransitionEndCallbacks = /* @__PURE__ */ new Map();
	let animationDeferred;
	let from = null;
	let endEventName = animationFunction ? "transitionend" : "animationend";
	if (withAnimationListener) {
		const listenerNames = animationFunction ? ["transitionend", "animationend"] : ["animationend"];
		const onEndEvent = (e) => {
			if (e.type !== endEventName || e.target === content) return;
			cancelEvent(e);
			if (e.target.parentElement !== content) return;
			onTransitionEndCallbacks.get(e.target)?.();
			if (e.target !== from) return;
			if (!animationDeferred && isHeavy) return;
			if (animationDeferred) {
				animationDeferred.resolve();
				animationDeferred = void 0;
			}
			onTransitionEnd?.(selectTab.prevId());
			content.classList.remove("animating", "animating-fade", "backwards", "disable-hover");
			if (once) {
				listenerNames.forEach((listenerName) => {
					if (listenerSetter) listenerSetter.removeManual(content, listenerName, onEndEvent);
					else content.removeEventListener(listenerName, onEndEvent);
				});
				from = animationDeferred = void 0;
				onTransitionEndCallbacks.clear();
			}
		};
		listenerNames.forEach((listenerName) => {
			if (listenerSetter) listenerSetter.add(content)(listenerName, onEndEvent);
			else content.addEventListener(listenerName, onEndEvent);
		});
	}
	function selectTab(id, animate = true, overrideFrom) {
		if (overrideFrom) from = overrideFrom;
		if (id instanceof HTMLElement) id = whichChild(id);
		const prevId = selectTab.prevId();
		if (id === prevId) return false;
		onTransitionStart?.(id);
		const to = content.children[id];
		const animationLevel = liteMode.getAnimationLevel();
		if (!animationLevel || prevId === -1 && !animateFirst) animate = false;
		if (!withAnimationListener) {
			const timeout = content.dataset.timeout;
			if (timeout !== void 0) clearTimeout(+timeout);
			delete content.dataset.timeout;
		}
		if (!animate) {
			if (from) from.classList.remove("active", "to", "from");
			else if (to) onTransitionEndCallbacks.get(to)?.();
			if (to) {
				to.classList.remove("to", "from");
				to.classList.add("active");
			}
			content.classList.remove("animating", "animating-fade", "backwards", "disable-hover");
			from = to;
			onTransitionEnd?.(id);
			return;
		}
		if (!withAnimationListener) content.dataset.timeout = "" + window.setTimeout(() => {
			to.classList.remove("to");
			from && from.classList.remove("from");
			content.classList.remove("animating", "animating-fade", "backwards", "disable-hover");
			delete content.dataset.timeout;
		}, transitionTime);
		if (from) {
			from.classList.remove("to");
			from.classList.add("from");
		}
		const fade = animationLevel === 1 && type !== "none" && !!to;
		endEventName = fade || !animationFunction ? "animationend" : "transitionend";
		content.classList.add("animating");
		content.classList.toggle("animating-fade", fade);
		const toRight = prevId < id;
		content.classList.toggle("backwards", !toRight);
		let onTransitionEndCallback;
		if (!to) {} else {
			if (animationFunction && !fade) onTransitionEndCallback = animationFunction(to, from, toRight);
			else to.classList.add("active");
			onTransitionStartAfter?.(id);
			to.classList.remove("from");
			to.classList.add("to");
		}
		if (to) {
			const transitionTimeout = to.dataset.transitionTimeout;
			if (transitionTimeout) clearTimeout(+transitionTimeout);
			onTransitionEndCallbacks.set(to, () => {
				to.classList.remove("to");
				onTransitionEndCallbacks.delete(to);
			});
		}
		if (from) {
			let timeout;
			const _from = from;
			const callback = () => {
				clearTimeout(timeout);
				_from.classList.remove("active", "from");
				onTransitionEndCallback?.();
				onTransitionEndCallbacks.delete(_from);
			};
			if (to) {
				timeout = window.setTimeout(callback, transitionTime + 100);
				onTransitionEndCallbacks.set(_from, callback);
			} else {
				timeout = window.setTimeout(callback, transitionTime + 100);
				onTransitionEndCallbacks.set(_from, () => {
					clearTimeout(timeout);
					onTransitionEndCallbacks.delete(_from);
				});
			}
			_from.dataset.transitionTimeout = "" + timeout;
			if (isHeavy) {
				if (!animationDeferred) animationDeferred = deferredPromise();
				dispatchHeavyAnimationEvent(animationDeferred, transitionTime * 2);
			}
		}
		from = to;
	}
	selectTab.prevId = () => from ? whichChild(from) : -1;
	selectTab.getFrom = () => from;
	selectTab.setFrom = (_from) => from = _from;
	return selectTab;
};
//#endregion
export { TransitionSlider as t };
