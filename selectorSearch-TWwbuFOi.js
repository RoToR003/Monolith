//# allFunctionsCalledOnLoad
import { t as findUpClassName } from "./findUpClassName-3V5me58N.js";
import { t as Icon } from "./icon-DbP6Es97.js";
import { m as setInnerHTML } from "./langPack-BmdJGr44.js";
import { p as createComponent } from "./solid-9Vxm0VIz.js";
import { t as liteMode } from "./liteMode-DeLStZfQ.js";
import { t as observeResize } from "./resizeObserver-DddVtfLC.js";
import { n as attachClickEvent } from "./clickEvent-COk4YpLP.js";
import { t as replaceContent } from "./replaceContent-Bi6ru3li.js";
import { M as avatarNew, ft as PeerTitle } from "./confirmationPopup-Bz6mK0o-.js";
import { n as wrapEmojiText } from "./wrapEmojiText-DT39R5Tj.js";
import { t as Scrollable } from "./scrollable-C2-FwBtK.js";
import { a as Section } from "./emailVerification-C8QYZSyu.js";
import { r as wrapSolidComponent } from "./wrapSolidComponent-BASCjNJG.js";
import { t as InputSearch } from "./inputSearch-DWd-Jn5r.js";
import { t as Tabs } from "./tabs-BOYPH0Vn.js";
//#region src/components/selectorSearch.tsx
var SelectorSearch = class SelectorSearch {
	constructor(options) {
		this.middlewareHelper = options.middlewareHelper;
		this.chipsMap = /* @__PURE__ */ new Map();
		this.flipElements = /* @__PURE__ */ new Set();
		this.inputSearch = new InputSearch({
			placeholder: "Search",
			onChange: options.onInput,
			debounceTime: 200,
			noBorder: true,
			noFocusEffect: true,
			noPlaceholderAnimation: true
		});
		this.input = this.inputSearch.input;
		this.inputSearch.container.classList.add("selector-search-input-container");
		this.input.classList.add("selector-search-input");
		this.inputSearch.clearBtn.remove();
		const topContainer = document.createElement("div");
		topContainer.classList.add("selector-search-container");
		this.selectedContainer = document.createElement("div");
		this.selectedContainer.classList.add("selector-search");
		this.selectedContainer.append(this.inputSearch.container);
		this.flipElements.add(this.inputSearch.container);
		topContainer.append(this.selectedContainer);
		this.selectedScrollable = new Scrollable(topContainer);
		this.setupHeightAnimation();
		if (options.multiSelect) attachClickEvent(this.selectedContainer, (e) => {
			let target = e.target;
			target = findUpClassName(target, "selector-user");
			if (!target) return;
			let key = target.dataset.key;
			key = key.isPeerId() ? key.toPeerId() : key;
			options.onChipClick(key);
		});
		let content;
		const container = wrapSolidComponent(() => createComponent(Section, {
			"class": "selector-search-section-container",
			innerClass: "selector-search-section",
			contentProps: { ref: (element) => content = element },
			children: topContainer
		}), this.middlewareHelper.get());
		this.section = {
			container,
			content
		};
		this.gradient = Tabs.MenuGradient({
			color: "background",
			className: "selector-search-gradient",
			smaller: true
		});
	}
	setupHeightAnimation() {
		let prevHeight = 0;
		let isAnimating = false;
		const el = this.selectedContainer;
		const unobserve = observeResize(el, () => {
			if (isAnimating) return;
			el.style.height = "";
			const targetHeight = el.clientHeight;
			if (!prevHeight || targetHeight === prevHeight || !targetHeight || !liteMode.isAvailable("animations")) {
				prevHeight = targetHeight;
				return;
			}
			isAnimating = true;
			el.style.height = prevHeight + "px";
			el.offsetHeight;
			el.style.height = targetHeight + "px";
			prevHeight = targetHeight;
		});
		const onTransitionEnd = (e) => {
			if (e.target === el && e.propertyName === "height") {
				isAnimating = false;
				el.style.height = "";
			}
		};
		el.addEventListener("transitionend", onTransitionEnd);
		el.addEventListener("transitioncancel", onTransitionEnd);
		this.middlewareHelper.get().onDestroy(unobserve);
	}
	captureChildRects(exclude) {
		if (!liteMode.isAvailable("motion")) return;
		this.capturedRects = /* @__PURE__ */ new Map();
		for (const el of this.flipElements) if (el !== exclude) this.capturedRects.set(el, el.getBoundingClientRect());
	}
	animateChildrenFlip(exclude) {
		const rects = this.capturedRects;
		if (!rects) return;
		this.capturedRects = void 0;
		const toAnimate = [];
		for (const [el, prevRect] of rects) {
			if (el === exclude) continue;
			const newRect = el.getBoundingClientRect();
			const dx = prevRect.left - newRect.left;
			const dy = prevRect.top - newRect.top;
			if (!dx && !dy) continue;
			el.style.transition = "none";
			el.style.transform = `translate(${dx}px, ${dy}px)`;
			toAnimate.push(el);
		}
		if (!toAnimate.length) return;
		this.selectedContainer.offsetHeight;
		for (const el of toAnimate) {
			el.style.transition = "";
			el.style.transform = "";
		}
	}
	addChip({ key, middleware, title, scroll = true, avatarSize = 30, fallbackIcon, primary }) {
		const rendered = SelectorSearch.renderEntity({
			key,
			middleware,
			title,
			avatarSize,
			fallbackIcon,
			primary
		});
		const { element, promises } = rendered;
		const keyStr = "" + key;
		this.chipsMap.set(keyStr, element);
		const insert = () => {
			if (this.chipsMap.get(keyStr) !== element) return;
			if (scroll) {
				element.classList.add("scale-in");
				element.addEventListener("animationend", () => {
					element.classList.remove("scale-in");
				}, { once: true });
			}
			const prevLast = this.inputSearch.container.previousElementSibling;
			if (prevLast?.classList.contains("selector-user")) prevLast.classList.remove("is-last");
			element.classList.add("is-last");
			this.captureChildRects();
			this.flipElements.add(element);
			this.inputSearch.container.before(element);
			this.animateChildrenFlip();
			if (scroll) this.selectedScrollable.scrollIntoViewNew({
				element: this.inputSearch.container,
				position: "center"
			});
		};
		if (promises.length) Promise.all(promises).then(insert);
		else insert();
		return rendered;
	}
	removeChip(key, onRemoved) {
		const keyStr = "" + key;
		const div = this.chipsMap.get(keyStr);
		const cleanup = () => {
			if (div) {
				div.remove();
				div.middlewareHelper.destroy();
			}
			onRemoved?.();
		};
		this.chipsMap.delete(keyStr);
		if (div) this.flipElements.delete(div);
		if (!div?.parentElement) {
			cleanup();
			return;
		}
		const animate = liteMode.isAvailable("motion");
		const wasLast = div.classList.contains("is-last");
		if (animate) {
			this.captureChildRects(div);
			const chipRect = div.getBoundingClientRect();
			const containerRect = this.selectedContainer.getBoundingClientRect();
			const scrollEl = this.selectedScrollable.container;
			const scrollBefore = scrollEl.scrollTop;
			div.classList.remove("scale-in", "is-last");
			div.style.position = "absolute";
			div.style.left = chipRect.left - containerRect.left + "px";
			const initialTop = chipRect.top - containerRect.top;
			const scrollDelta = scrollBefore - scrollEl.scrollTop;
			if (scrollDelta) {
				div.style.top = initialTop - scrollDelta + "px";
				div.offsetHeight;
				div.style.transition = "top .15s ease";
				div.style.top = initialTop + "px";
			} else div.style.top = initialTop + "px";
		} else {
			div.classList.remove("scale-in");
			cleanup();
		}
		if (wasLast) {
			const newLast = (animate ? div : this.inputSearch.container).previousElementSibling;
			if (newLast?.classList.contains("selector-user")) newLast.classList.add("is-last");
		}
		if (animate) {
			div.offsetWidth;
			div.classList.add("scale-out");
			this.animateChildrenFlip();
			div.addEventListener("animationend", cleanup, { once: true });
		}
	}
	clearInput() {
		this.inputSearch.value = "";
	}
	get value() {
		return this.inputSearch.value;
	}
	scrollToInput(forceDirection) {
		this.selectedScrollable.scrollIntoViewNew({
			element: this.inputSearch.container,
			position: "center",
			forceDirection
		});
	}
	destroy() {
		this.inputSearch.remove();
	}
	static renderEntity({ key, middleware, title, avatarSize, fallbackIcon, meAsSaved = true, primary }) {
		const div = document.createElement("div");
		div.classList.add("selector-user");
		div.middlewareHelper = middleware.create();
		if (primary) div.classList.add("selector-user-primary");
		const avatarContainer = document.createElement("div");
		avatarContainer.classList.add("selector-user-avatar-container");
		const avatarClose = document.createElement("div");
		avatarClose.classList.add("selector-user-avatar-close");
		avatarClose.append(Icon("close"));
		const avatarEl = avatarNew({
			middleware: div.middlewareHelper.get(),
			size: avatarSize,
			isDialog: meAsSaved
		});
		avatarEl.node.classList.add("selector-user-avatar");
		avatarContainer.append(avatarEl.node, avatarClose);
		const keyStr = "" + key;
		let threadId;
		if (keyStr.includes("_")) {
			const [_peerId, _threadId] = keyStr.split("_");
			if (_peerId.isPeerId()) {
				key = _peerId.toPeerId();
				threadId = +_threadId;
			}
		}
		div.dataset.key = keyStr;
		const promises = [];
		if (key.isPeerId()) {
			if (title === void 0) {
				const peerTitle = new PeerTitle();
				promises.push(peerTitle.update({
					peerId: key.toPeerId(),
					threadId,
					dialog: meAsSaved
				}));
				title = peerTitle.element;
			}
			avatarEl.render({
				peerId: key.toPeerId(),
				threadId
			});
			promises.push(avatarEl.readyThumbPromise);
		} else if (fallbackIcon) avatarEl.setIcon(fallbackIcon);
		if (title) {
			const t = document.createElement("div");
			t.classList.add("selector-user-title");
			if (typeof title === "string") setInnerHTML(t, wrapEmojiText(title));
			else replaceContent(t, title);
			div.append(t);
		}
		div.insertAdjacentElement("afterbegin", avatarContainer);
		return {
			element: div,
			avatar: avatarEl,
			promises
		};
	}
};
//#endregion
export { SelectorSearch as t };
