//# allFunctionsCalledOnLoad
import { h as Modes } from "./userAgent-ByGXcznk.js";
import { n as fastRaf } from "./schedulers-Cx0-7a1P.js";
import { A as mergeProps, L as untrack, M as onCleanup, N as onMount, h as createContext, i as For, p as createComponent, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { _ as use, a as classList, c as insert, f as setAttribute, g as template, o as className, r as addEventListener, s as delegateEvents } from "./web-BPyQozky.js";
import { t as liteMode } from "./liteMode-DeLStZfQ.js";
import { t as findUpAsChild } from "./findUpAsChild-CPjgnY00.js";
import { t as ripple } from "./ripple-D7hcIc_t.js";
import { t as classNames } from "./classNames-DxGDjmvw.js";
import { t as ListenerSetter } from "./listenerSetter-BER6qAXn.js";
import { t as Scrollable } from "./scrollable2-Bau9Hoih.js";
import { n as attachClickEvent } from "./clickEvent-COk4YpLP.js";
import { t as whichChild } from "./whichChild-CwhWxnKO.js";
import { k as attachTabList } from "./openEditors-7FmA7q_V.js";
import { i as fastSmoothScroll, r as FocusDirection } from "./scrollable-C2-FwBtK.js";
import { t as ButtonIcon } from "./buttonIcon-CthJWloV.js";
import { t as TransitionSlider } from "./transition-BRcIGNUC.js";
//#region src/components/horizontalMenu.ts
async function selectTarget({ target, id, animate = true, tabs, content, onClick, scrollableX, transitionTime = 200, prevId = -1, selectTab, onChange }) {
	if (onClick) {
		const tabContent = content?.children[id];
		const result1 = onClick(id, tabContent, animate);
		if ((result1 instanceof Promise ? await result1 : result1) === false) return;
	}
	if (!target) return false;
	if (scrollableX) {
		const containerEl = scrollableX.container;
		const noOverflow = containerEl.scrollWidth <= containerEl.clientWidth;
		const isFirstAndAtStart = id === 0 && containerEl.scrollLeft === 0;
		if (!noOverflow && !isFirstAndAtStart) fastSmoothScroll({
			container: containerEl,
			element: target.parentElement.children[id],
			position: "center",
			forceDirection: animate ? void 0 : FocusDirection.Static,
			forceDuration: transitionTime,
			axis: "x"
		});
	}
	if (!liteMode.isAvailable("animations")) animate = false;
	const moveStripe = animate && liteMode.isAvailable("motion");
	if (target.classList.contains("active") || id === prevId) return false;
	const mutateCallback = animate ? fastRaf : (cb) => cb();
	const prev = tabs.querySelector(tabs.firstElementChild.tagName.toLowerCase() + ".active");
	if (prev) mutateCallback(() => {
		prev.classList.remove("active");
		onChange?.({
			element: prev,
			active: false
		});
	});
	if (prevId !== -1 && moveStripe) {
		const selector = ".menu-horizontal-div-item-background";
		mutateCallback(() => {
			const indicator = target.querySelector(selector);
			const currentIndicator = target.parentElement.children[prevId]?.querySelector(selector);
			if (!indicator || !currentIndicator) return;
			currentIndicator.classList.remove("animate");
			indicator.classList.remove("animate");
			const shiftLeft = currentIndicator.parentElement.offsetLeft - indicator.parentElement.offsetLeft;
			const clientWidth = indicator.clientWidth;
			const scaleFactor = currentIndicator.clientWidth / clientWidth;
			indicator.style.transform = `translate3d(${shiftLeft}px, 0, 0)`;
			indicator.style.width = `${clientWidth * scaleFactor}px`;
			fastRaf(() => {
				indicator.classList.add("animate");
				indicator.style.transform = "none";
				indicator.style.width = "";
			});
		});
	}
	mutateCallback(() => {
		target.classList.add("active");
		onChange?.({
			element: target,
			active: true
		});
	});
	selectTab?.(id, animate);
}
function horizontalMenuObjArgs({ tabs, content, onClick, onTransitionEnd, transitionTime, scrollableX, listenerSetter, onChange }) {
	return horizontalMenu(tabs, content, onClick, onTransitionEnd, transitionTime, scrollableX, listenerSetter, onChange);
}
function horizontalMenu(tabs, content, onClick, onTransitionEnd, transitionTime = 200, scrollableX, listenerSetter, onChange) {
	const _selectTab = TransitionSlider({
		content,
		type: tabs || content.dataset.animation === "tabs" ? "tabs" : "navigation",
		transitionTime,
		onTransitionEnd,
		listenerSetter
	});
	if (!tabs) return _selectTab;
	const detachTabList = attachTabList(tabs, content);
	listenerSetter?.addCleanup(detachTabList);
	const _selectTarget = (target, id, animate = true) => {
		return selectTarget({
			target,
			id,
			animate,
			tabs,
			content,
			onClick,
			scrollableX,
			transitionTime,
			prevId: _selectTab.prevId(),
			selectTab: _selectTab,
			onChange
		});
	};
	const proxy = new Proxy(_selectTab, { apply: (target, that, args) => {
		const animate = args[1] !== void 0 ? args[1] : true;
		let id, el;
		if (args[0] instanceof HTMLElement) {
			id = whichChild(args[0]);
			el = args[0];
		} else {
			id = +args[0];
			el = tabs.querySelector(`[data-tab="${id}"]`) || tabs.children[id];
		}
		_selectTarget(el, id, animate);
	} });
	attachClickEvent(tabs, (e) => {
		let target = e.target;
		target = findUpAsChild(target, tabs);
		if (!target) return false;
		let id;
		if (target.dataset.tab) {
			id = +target.dataset.tab;
			if (id === -1) return false;
		} else id = whichChild(target);
		_selectTarget(target, id);
	}, { listenerSetter });
	return proxy;
}
//#endregion
//#region src/components/tabs.tsx
var _tmpl$ = /*#__PURE__*/ template(`<div role=tablist>`);
var _tmpl$2 = /*#__PURE__*/ template(`<div role=tab><i class=menu-horizontal-div-item-background aria-hidden=true></i><div class=menu-horizontal-div-item-span>`);
var _tmpl$3 = /*#__PURE__*/ template(`<div>`);
var _tmpl$4 = /*#__PURE__*/ template(`<div class=menu-horizontal-inner>`);
var _tmpl$5 = /*#__PURE__*/ template(`<div><div>`);
var _tmpl$6 = /*#__PURE__*/ template(`<div role=tabpanel>`);
var TabsContext = createContext();
var Tabs = (props) => {
	return createComponent(TabsContext.Provider, {
		value: {},
		get children() {
			return props.children;
		}
	});
};
Tabs.Menu = (props) => {
	let menu;
	const element = (() => {
		var _el$ = _tmpl$();
		addEventListener(_el$, "click", props.onClick, true);
		use((el) => {
			menu = el;
			props.ref?.(el);
		}, _el$);
		insert(_el$, () => props.children);
		createRenderEffect((_p$) => {
			var _v$ = classNames("menu-horizontal-div", props.class), _v$2 = props.id;
			_v$ !== _p$.e && className(_el$, _p$.e = _v$);
			_v$2 !== _p$.t && setAttribute(_el$, "id", _p$.t = _v$2);
			return _p$;
		}, {
			e: void 0,
			t: void 0
		});
		return _el$;
	})();
	onMount(() => onCleanup(attachTabList(menu)));
	return element;
};
Tabs.MenuTab = (props) => {
	return (() => {
		var _el$2 = _tmpl$2(), _el$4 = _el$2.firstChild.nextSibling;
		use((el) => {
			if (props.ripple) ripple(el);
			props.ref?.(el);
		}, _el$2);
		insert(_el$4, () => props.children);
		createRenderEffect((_p$) => {
			var _v$3 = classNames("menu-horizontal-div-item", props.class), _v$4 = Modes.a11y ? -1 : void 0, _v$5 = props.id, _v$6 = props.controls;
			_v$3 !== _p$.e && className(_el$2, _p$.e = _v$3);
			_v$4 !== _p$.t && setAttribute(_el$2, "tabindex", _p$.t = _v$4);
			_v$5 !== _p$.a && setAttribute(_el$2, "id", _p$.a = _v$5);
			_v$6 !== _p$.o && setAttribute(_el$2, "aria-controls", _p$.o = _v$6);
			return _p$;
		}, {
			e: void 0,
			t: void 0,
			a: void 0,
			o: void 0
		});
		return _el$2;
	})();
};
/**
* The rounded plate the row sits on. A row that cannot overflow (a fixed set of tabs, or a
* decorative one) takes the plate alone; anything longer than the popup takes
* `Tabs.MenuScrollable`, which is this plus the horizontal scroller.
*/
Tabs.MenuShell = (props) => {
	return (() => {
		var _el$5 = _tmpl$3();
		var _ref$ = props.ref;
		typeof _ref$ === "function" ? use(_ref$, _el$5) : props.ref = _el$5;
		insert(_el$5, () => props.children);
		createRenderEffect((_p$) => {
			var _v$7 = classNames("menu-horizontal-scrollable", props.betweenSections && "is-between-sections", props.class), _v$8 = props.classList;
			_v$7 !== _p$.e && className(_el$5, _p$.e = _v$7);
			_p$.t = classList(_el$5, _v$8, _p$.t);
			return _p$;
		}, {
			e: void 0,
			t: void 0
		});
		return _el$5;
	})();
};
/**
* The emoticons panel's flavour of a tab: an icon button borrowing the row's item styles.
* Those rows are `no-stripe` — nothing slides behind the active tab, and the icon is the whole
* tab, so there is neither a background element nor a label wrapper.
*/
Tabs.MenuIconTab = (props) => {
	const button = ButtonIcon(props.icon, { noRipple: true });
	button.classList.add("menu-horizontal-div-item", ...props.class?.split(" ").filter(Boolean) || []);
	if (props.label) button.setAttribute("aria-label", props.label);
	if (props.tab !== void 0) button.dataset.tab = "" + props.tab;
	if (props.paddingRef) {
		const padding = document.createElement("div");
		padding.classList.add("menu-horizontal-div-item-padding");
		button.append(padding);
		props.paddingRef(padding);
	}
	return button;
};
/**
* A scroller nested inside a row, holding tabs of its own: the emoji panel's recent strip,
* which is a narrow pill until its tab goes active and then widens in place. Takes the
* caller's scroller, since that one keeps appending tabs to it and destroys it.
*/
Tabs.MenuInner = (props) => {
	props.scroll.classList.add("menu-horizontal-inner-scroll");
	return (() => {
		var _el$6 = _tmpl$4();
		insert(_el$6, () => props.scroll);
		return _el$6;
	})();
};
Tabs.MenuScrollable = (props) => {
	return createComponent(Tabs.MenuShell, {
		ref(r$) {
			var _ref$2 = props.ref;
			typeof _ref$2 === "function" ? _ref$2(r$) : props.ref = r$;
		},
		get ["class"]() {
			return props.class;
		},
		get children() {
			return createComponent(Scrollable, mergeProps({ axis: "x" }, () => props.scrollableProps || {}, { get children() {
				return props.children;
			} }));
		}
	});
};
Tabs.MenuGradient = (props) => {
	return (() => {
		var _el$7 = _tmpl$5(), _el$8 = _el$7.firstChild;
		var _ref$3 = props.ref;
		typeof _ref$3 === "function" ? use(_ref$3, _el$7) : props.ref = _el$7;
		createRenderEffect((_p$) => {
			var _v$9 = classNames("menu-horizontal-gradient-container", props.className && props.className + "-container"), _v$0 = classNames("menu-horizontal-gradient", "menu-horizontal-gradient-color-" + props.color, props.smaller && "menu-horizontal-gradient-smaller", props.className);
			_v$9 !== _p$.e && className(_el$7, _p$.e = _v$9);
			_v$0 !== _p$.t && className(_el$8, _p$.t = _v$0);
			return _p$;
		}, {
			e: void 0,
			t: void 0
		});
		return _el$7;
	})();
};
Tabs.Content = (props) => {
	return (() => {
		var _el$9 = _tmpl$3();
		var _ref$4 = props.ref;
		typeof _ref$4 === "function" ? use(_ref$4, _el$9) : props.ref = _el$9;
		insert(_el$9, () => props.children);
		createRenderEffect(() => className(_el$9, props.class));
		return _el$9;
	})();
};
Tabs.ContentTab = (props) => {
	return (() => {
		var _el$0 = _tmpl$6();
		insert(_el$0, () => props.children);
		createRenderEffect((_p$) => {
			var _v$1 = classNames(props.class, props.hide && "hide"), _v$10 = props.id, _v$11 = props.labelledBy;
			_v$1 !== _p$.e && className(_el$0, _p$.e = _v$1);
			_v$10 !== _p$.t && setAttribute(_el$0, "id", _p$.t = _v$10);
			_v$11 !== _p$.a && setAttribute(_el$0, "aria-labelledby", _p$.a = _v$11);
			return _p$;
		}, {
			e: void 0,
			t: void 0,
			a: void 0
		});
		return _el$0;
	})();
};
Tabs.Simple = (props) => {
	const className = untrack(() => props.class);
	const wrapContent = untrack(() => props.contentWrapper);
	const idBase = `tabs-${className}-${(Math.random() * 2147483647 | 0).toString(36)}`;
	const tabId = (index) => `${idBase}-tab-${index}`;
	const panelId = (index) => `${idBase}-panel-${index}`;
	let tabs, content;
	const menuElement = createComponent(Tabs.Menu, {
		ref(r$) {
			var _ref$5 = tabs;
			typeof _ref$5 === "function" ? _ref$5(r$) : tabs = r$;
		},
		"class": `${className}-tabs`,
		get children() {
			return createComponent(For, {
				get each() {
					return props.menu;
				},
				children: (item, index) => {
					return createComponent(Tabs.MenuTab, {
						"class": `${className}-tab`,
						get id() {
							return tabId(index());
						},
						get controls() {
							return panelId(index());
						},
						children: item
					});
				}
			});
		}
	});
	const contentElement = createComponent(Tabs.Content, {
		ref(r$) {
			var _ref$6 = content;
			typeof _ref$6 === "function" ? _ref$6(r$) : content = r$;
		},
		get ["class"]() {
			return classNames(`${className}-contents`);
		},
		get children() {
			return createComponent(For, {
				get each() {
					return props.content;
				},
				children: (item, index) => {
					return createComponent(Tabs.ContentTab, {
						"class": `${className}-content`,
						get hide() {
							return index() !== props.tab();
						},
						get id() {
							return panelId(index());
						},
						get labelledBy() {
							return tabId(index());
						},
						children: item
					});
				}
			});
		}
	});
	const children = wrapContent ? [createComponent(Tabs.MenuShell, {
		betweenSections: true,
		"class": `${className}-tabs-shell`,
		children: menuElement
	}), wrapContent(contentElement)] : [menuElement, contentElement];
	const ret = createComponent(Tabs, { children });
	const listenerSetter = new ListenerSetter();
	onCleanup(() => {
		listenerSetter.removeAll();
	});
	horizontalMenu(tabs, content, (tab) => {
		props.onChange(tab);
	}, void 0, void 0, void 0, listenerSetter)(props.tab());
	return ret;
};
delegateEvents(["click"]);
//#endregion
export { selectTarget as i, horizontalMenu as n, horizontalMenuObjArgs as r, Tabs as t };
