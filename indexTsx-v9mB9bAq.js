//# allFunctionsCalledOnLoad
import { h as Modes, r as IS_APPLE, s as IS_MOBILE } from "./userAgent-ByGXcznk.js";
import { a as blurActiveElement, n as appNavigationController } from "./appNavigationController-Ct0fx8yF.js";
import { t as findUpClassName } from "./findUpClassName-3V5me58N.js";
import { t as doubleRaf } from "./schedulers-Cx0-7a1P.js";
import { t as noop } from "./noop-H9NNBLfX.js";
import { n as indexOfAndSplice } from "./superMessagePort-DhrhiTig.js";
import { a as i18n, u as langPack_default } from "./langPack-BmdJGr44.js";
import { A as mergeProps, C as createSignal, L as untrack, M as onCleanup, N as onMount, R as useContext, _ as createMemo, g as createEffect, h as createContext, j as on, p as createComponent, s as Show, x as createRoot, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { n as deferredPromise } from "./cancellablePromise-bof--dnO.js";
import { r as getOverlayRoot, t as bindActiveWindowListener } from "./appWindow-bo-KtJhy.js";
import { a as isSessionLeaving, i as getManagersSession } from "./getCurrentAccount-D0KQFbZ6.js";
import { n as bindManagersToSession } from "./bindManagersToAccount-BL82O9H9.js";
import { t as cancelEvent } from "./cancelEvent-Cw8vYZHp.js";
import { n as createStore } from "./store-PwRn5fa3.js";
import { t as hotEffect } from "./hotModule-aCRkP77w.js";
import { _ as use, c as insert, f as setAttribute, g as template, m as spread, n as Portal, o as className, s as delegateEvents, u as memo } from "./web-BPyQozky.js";
import { o as useAppSettings } from "./liteMode-DeLStZfQ.js";
import { t as overlayCounter } from "./overlayCounter-SPN4H9lb.js";
import { t as classNames } from "./classNames-DxGDjmvw.js";
import { t as IconTsx } from "./iconTsx-B4lOk4A6.js";
import { t as getMiddleware } from "./middleware-D6HuIqPm.js";
import { n as animationIntersector } from "./animationIntersector-vAjH_7t1.js";
import { r as getFullScreenElement, t as addFullScreenListener } from "./fullScreen-5nVzMsf1.js";
import { t as ListenerSetter } from "./listenerSetter-BER6qAXn.js";
import { t as tooltipController } from "./tooltipController-C8K0zGt8.js";
import { t as Button } from "./buttonTsx-Bwphkm9r.js";
import { n as putPreloader } from "./putPreloader-Bxq7N1RV.js";
import { t as Scrollable } from "./scrollable2-Bau9Hoih.js";
import { i as simulateClickEvent } from "./clickEvent-COk4YpLP.js";
import { n as createFocusTrap } from "./focusTrap-CKEkJXZv.js";
import { i as isTargetAnInput, t as isKeyboardControl } from "./isKeyboardControl-klqGHqlo.js";
import { t as placeCaretAtEnd } from "./placeCaretAtEnd-BtAUyd5U.js";
import { t as updateScrollRegionFocusable } from "./scrollRegion-DQB9Uktd.js";
//#region src/helpers/dom/isSendShortcutPressed.ts
function isSendShortcutPressed(e) {
	if (e.key === "Enter" && !IS_MOBILE && !e.isComposing) {
		const [appSettings] = useAppSettings();
		if (appSettings.sendShortcut === "enter") {
			if (e.shiftKey || e.ctrlKey || e.metaKey) return;
			return true;
		} else {
			const secondaryKey = IS_APPLE ? e.metaKey : e.ctrlKey;
			if (e.shiftKey || (IS_APPLE ? e.ctrlKey : e.metaKey)) return;
			if (secondaryKey) return true;
		}
	}
	return false;
}
function isNewLineShortcutPressed(e) {
	if (e.key !== "Enter" || IS_MOBILE || e.isComposing || e.altKey) return false;
	const [appSettings] = useAppSettings();
	if (appSettings.sendShortcut === "enter") return e.shiftKey && !e.ctrlKey && !e.metaKey;
	return !e.shiftKey && !e.ctrlKey && !e.metaKey;
}
var SEND_SHORTCUT_LEFT = Symbol("sendShortcutLeft");
/**
* A message field whose popup sends on the shortcut keeps its editor from breaking the line on it,
* which prevents the event's default — so it marks the event for the popup to still send on
* (`PopupElement`'s confirm-on-Enter) rather than read it as handled by someone else. A one-line
* field marks its Enter for the same reason: it has no second line to take, and what the field
* sits in (a popup's confirm) still acts on it.
*/
function leaveSendShortcut(e) {
	e[SEND_SHORTCUT_LEFT] = true;
}
function isSendShortcutLeft(e) {
	return !!e[SEND_SHORTCUT_LEFT];
}
//#endregion
//#region src/components/popups/indexTsx.tsx
var _tmpl$ = /*#__PURE__*/ template(`<div><div>`);
var _tmpl$2 = /*#__PURE__*/ template(`<div class=popup-header-background>`);
var _tmpl$3 = /*#__PURE__*/ template(`<div>`);
var _tmpl$4 = /*#__PURE__*/ template(`<div dir=auto>`);
var _tmpl$5 = /*#__PURE__*/ template(`<button>`);
var _tmpl$6 = /*#__PURE__*/ template(`<div class=popup-footer-placeholder>`);
var PopupContext = createContext();
var usePopupContext = () => useContext(PopupContext);
var PopupControllerContext = createContext();
/** Inside `createPopup`: disposes the popup's root — for a popup that has to go before it ever showed. */
var usePopupController = () => useContext(PopupControllerContext);
var DEFAULT_APPEND_TO = document.body;
var [fullScreenElement, setFullScreenElement] = createSignal(null);
var onFullScreenChange = () => {
	setFullScreenElement(getFullScreenElement() || null);
};
hotEffect(void 0, () => {
	const listenerSetter = new ListenerSetter();
	addFullScreenListener(DEFAULT_APPEND_TO, onFullScreenChange, listenerSetter);
	return () => listenerSetter.removeAll();
});
var useSnitchedPopupContext = () => {
	let context;
	return {
		SnitchPopupContext: () => {
			context = useContext(PopupContext);
			return [];
		},
		popupContext: () => context
	};
};
var popupTitleIdSeed = 0;
var PopupElement = (props) => {
	const [shown, setShown] = createSignal(false);
	const [store, setStore] = createStore({});
	const [buttons, setButtons] = createStore([]);
	const [navigationItem, setNavigationItem] = createSignal();
	const [scrollableRef, setScrollableRef] = createSignal();
	const [hasFloatingHeader, setHasFloatingHeader] = createSignal(false);
	const [hasFlowFooter, setHasFlowFooter] = createSignal(false);
	const [hasFlowButtons, setHasFlowButtons] = createSignal(false);
	const controllerContext = useContext(PopupControllerContext);
	const managers = bindManagersToSession(props.managers || PopupElement.MANAGERS);
	const session = getManagersSession(managers);
	const capturedRoot = getOverlayRoot();
	const middlewareHelper = getMiddleware();
	const lateMiddlewareHelper = getMiddleware();
	const withoutOverlay = props.withoutOverlay || false;
	const night = overlayCounter.isDarkOverlayActive;
	const confirmShortcutIsSendShortcut = props.confirmShortcutIsSendShortcut || false;
	const isConfirmationNeededOnClose = props.isConfirmationNeededOnClose;
	let focusTrap;
	let previouslyFocusedEl;
	let overlaid = false;
	const register = (kind, element) => {
		setStore(kind, element);
		onCleanup(() => setStore(kind, void 0));
		return element;
	};
	const registerButton = (props, element) => {
		setButtons([...buttons, props]);
		onCleanup(() => setButtons(buttons.filter((b) => b !== props)));
		return element;
	};
	const show = () => {
		if (shown() || destroyed()) return;
		if (!props.keepOnAccountSwitch && isSessionLeaving(session)) {
			destroy();
			return;
		}
		previouslyFocusedEl = (capturedRoot.ownerDocument || document).activeElement;
		tooltipController.closeAll();
		setShown(true);
		props.onShow?.();
		const navItem = {
			type: "popup",
			noBlurOnPop: Modes.a11y,
			onPop: () => {
				if (isConfirmationNeededOnClose) {
					const result = isConfirmationNeededOnClose();
					if (result) {
						Promise.resolve(result).then(() => {
							destroy();
						});
						return false;
					}
				}
				destroy();
			}
		};
		setNavigationItem(navItem);
		appNavigationController.pushItem(navItem);
		if (!Modes.a11y) blurActiveElement();
		else if (!withoutOverlay) previouslyFocusedEl?.blur?.();
		if (!withoutOverlay) {
			overlaid = true;
			overlayCounter.isOverlayActive = true;
			animationIntersector.checkAnimations2(true, props.animationGroup, popupElement());
		}
		setTimeout(() => {
			const element = popupElement();
			if (!element || !element.classList.contains("active")) return;
			const container = element.querySelector(".popup-container");
			if (container) {
				const titleEl = container.querySelector(".popup-title, [data-popup-title], h1, h2");
				if (titleEl && !container.hasAttribute("aria-label") && !container.hasAttribute("aria-labelledby")) {
					if (!titleEl.id) titleEl.id = "popup-title-tsx-" + ++popupTitleIdSeed;
					container.setAttribute("aria-labelledby", titleEl.id);
				}
				const initialFocus = props.initialFocus?.();
				if (!withoutOverlay && Modes.a11y) {
					focusTrap = createFocusTrap(container, () => PopupElement.POPUPS[PopupElement.POPUPS.length - 1] === value);
					focusTrap.activate(previouslyFocusedEl, initialFocus);
				}
				if (initialFocus && isTargetAnInput(initialFocus)) placeCaretAtEnd(initialFocus);
			}
			const handleKeydown = (e) => {
				const btnConfirm = value.btnConfirmOnEnter;
				if (destroyed() || e.defaultPrevented && !isSendShortcutLeft(e) || e.isComposing || e.repeat || !btnConfirm || btnConfirm.disabled || PopupElement.POPUPS[PopupElement.POPUPS.length - 1] !== value) return;
				const target = e.target;
				if (Modes.a11y && (isKeyboardControl(target) || target.closest("[role=\"combobox\"][aria-expanded=\"true\"]") || !confirmShortcutIsSendShortcut && (target.tagName === "TEXTAREA" || target.isContentEditable))) return;
				if (confirmShortcutIsSendShortcut ? isSendShortcutPressed(e) : e.key === "Enter") {
					simulateClickEvent(btnConfirm);
					cancelEvent(e);
				}
			};
			middlewareHelper.get().onClean(bindActiveWindowListener((win) => win.document.body, "keydown", handleKeydown));
		}, 0);
	};
	const hide = () => {
		if (destroyed()) return;
		const navItem = navigationItem();
		if (!navItem) {
			destroy();
			return;
		}
		appNavigationController.backByItem(navItem);
	};
	const disposed = deferredPromise();
	const destroy = () => {
		if (destroyed()) return disposed;
		focusTrap?.deactivate();
		props.onClose?.();
		setHiding(true);
		setDestroyed(true);
		setShown(false);
		setTimeout(() => {
			setHiding(false);
			middlewareHelper.destroy();
			controllerContext.dispose();
			tooltipController.closeAll();
			if (overlaid) overlayCounter.isOverlayActive = false;
			const navItem = navigationItem();
			if (navItem) {
				appNavigationController.removeItem(navItem);
				setNavigationItem(void 0);
			}
			indexOfAndSplice(PopupElement.POPUPS, value);
			onFullScreenChange();
			lateMiddlewareHelper.destroy();
			if (overlaid) animationIntersector.checkAnimations2(false);
			props.onCloseAfterTimeout?.();
			disposed.resolve();
		}, 250);
		return disposed;
	};
	const [destroyed, setDestroyed] = createSignal(false);
	const [hiding, setHiding] = createSignal(false);
	const [popupElement, setPopupElement] = createSignal();
	const portalMount = createMemo(() => {
		const element = fullScreenElement();
		return element && !popupElement()?.contains(element) ? element : capturedRoot;
	});
	const [containerElement, setContainerElement] = createSignal();
	const [btnConfirmOnEnter, setBtnConfirmOnEnter] = createSignal();
	if (props.btnConfirmOnEnter) createEffect(() => {
		setBtnConfirmOnEnter(props.btnConfirmOnEnter());
	});
	const value = {
		register,
		registerButton,
		store,
		buttons,
		shown,
		show,
		hide,
		destroy,
		get destroyed() {
			return destroyed();
		},
		managers,
		middlewareHelper,
		lateMiddlewareHelper,
		get navigationItem() {
			return navigationItem();
		},
		get scrollableRef() {
			return scrollableRef();
		},
		setScrollableRef,
		get hasFloatingHeader() {
			return hasFloatingHeader();
		},
		get hasFlowFooter() {
			return hasFlowFooter();
		},
		setHasFlowFooter,
		get hasFlowButtons() {
			return hasFlowButtons();
		},
		setHasFlowButtons,
		setHasFloatingHeader,
		withoutOverlay,
		night,
		confirmShortcutIsSendShortcut,
		get btnConfirmOnEnter() {
			return btnConfirmOnEnter();
		},
		setBtnConfirmOnEnter: props.btnConfirmOnEnter ? noop : setBtnConfirmOnEnter,
		isConfirmationNeededOnClose,
		closable: props.closable || false,
		get element() {
			return popupElement();
		},
		get container() {
			return containerElement();
		},
		kind: props.kind,
		keepOnAccountSwitch: !!props.keepOnAccountSwitch,
		old: props.old
	};
	PopupElement.POPUPS.push(value);
	onCleanup(() => {
		indexOfAndSplice(PopupElement.POPUPS, value);
	});
	if (props.show !== void 0) {
		let asked = false;
		createEffect(on(() => props.show, (_show) => {
			if (_show) asked = true;
			else if (!asked) return;
			doubleRaf().then(() => {
				if (props.show) show();
				else if (shown()) hide();
				else destroy();
			});
		}));
	} else doubleRaf().then(show);
	createEffect(() => {
		const scrollable = scrollableRef();
		if (!shown() || !scrollable) return;
		doubleRaf().then(() => !destroyed() && scrollable.onSizeChange());
	});
	let mouseDownTarget;
	const { ref: containerRef, ...containerPropsWithoutRef } = props.containerProps || {};
	return createComponent(PopupContext.Provider, {
		value,
		get children() {
			return createComponent(Portal, {
				get mount() {
					return portalMount();
				},
				get children() {
					var _el$ = _tmpl$(), _el$2 = _el$.firstChild;
					_el$.$$click = (e) => {
						if (findUpClassName(e.target, "popup-container") || !e.target.isConnected) return;
						if (props.closable === false) return;
						if (mouseDownTarget && mouseDownTarget !== e.target) return;
						mouseDownTarget = void 0;
						hide();
					};
					_el$.$$mousedown = (e) => {
						mouseDownTarget = e.target;
					};
					use(setPopupElement, _el$);
					use((element) => {
						setContainerElement(element);
						containerRef?.(element);
					}, _el$2);
					spread(_el$2, mergeProps(containerPropsWithoutRef, {
						"role": "dialog",
						"aria-modal": withoutOverlay ? void 0 : "true",
						get tabindex() {
							return Modes.a11y ? -1 : void 0;
						},
						get ["class"]() {
							return classNames("popup-container z-depth-1", props.containerClass, props.containerProps?.class);
						}
					}), false, true);
					insert(_el$2, () => props.children);
					createRenderEffect(() => className(_el$, classNames("popup", props.class, night && "night", withoutOverlay && "no-overlay", shown() && "active", hiding() && "hiding", props.old && "old")));
					return _el$;
				}
			});
		}
	});
};
PopupElement.POPUPS = [];
PopupElement.MANAGERS = void 0;
PopupElement.Header = (props) => {
	const context = useContext(PopupContext);
	createRenderEffect(() => context.setHasFloatingHeader(!!props.floating));
	onCleanup(() => context.setHasFloatingHeader(false));
	const isScrolledToStart = () => context.scrollableRef?.isScrolledToStart ?? true;
	return context.register("header", (() => {
		var _el$3 = _tmpl$3();
		var _ref$ = props.ref;
		typeof _ref$ === "function" ? use(_ref$, _el$3) : props.ref = _el$3;
		insert(_el$3, createComponent(Show, {
			get when() {
				return props.floating;
			},
			get children() {
				return _tmpl$2();
			}
		}), null);
		insert(_el$3, () => props.children, null);
		createRenderEffect(() => className(_el$3, classNames("popup-header", props.class, props.floating && "is-floating", props.floating && isScrolledToStart() && "scrolled-start")));
		return _el$3;
	})());
};
PopupElement.Title = (props) => {
	const context = useContext(PopupContext);
	const titleContent = () => {
		if (props.title) {
			if (typeof props.title === "string") return i18n(props.title);
			else if (typeof props.title !== "boolean") return props.title;
		}
		return props.children;
	};
	return context.register("title", createComponent(Show, {
		get when() {
			return titleContent();
		},
		get children() {
			var _el$5 = _tmpl$4();
			insert(_el$5, titleContent);
			createRenderEffect(() => className(_el$5, classNames("popup-title", props.class)));
			return _el$5;
		}
	}));
};
PopupElement.CloseButton = (props) => {
	const context = useContext(PopupContext);
	const handleClick = () => {
		if (props.canGoBack && props.onBackClick) props.onBackClick();
		else context.hide();
	};
	return context.register("closeButton", (() => {
		var _el$6 = _tmpl$5();
		_el$6.$$click = handleClick;
		insert(_el$6, createComponent(Show, {
			get when() {
				return props.onBackClick;
			},
			get fallback() {
				return createComponent(IconTsx, { icon: "close" });
			},
			get children() {
				var _el$7 = _tmpl$3();
				createRenderEffect(() => className(_el$7, classNames("animated-close-icon", props.canGoBack && "state-back")));
				return _el$7;
			}
		}));
		createRenderEffect((_p$) => {
			var _v$ = classNames("btn-icon popup-close", props.class), _v$2 = langPack_default.format("Close", true);
			_v$ !== _p$.e && className(_el$6, _p$.e = _v$);
			_v$2 !== _p$.t && setAttribute(_el$6, "aria-label", _p$.t = _v$2);
			return _p$;
		}, {
			e: void 0,
			t: void 0
		});
		return _el$6;
	})());
};
PopupElement.Body = (props) => {
	return useContext(PopupContext).register("body", (() => {
		var _el$8 = _tmpl$3();
		var _ref$2 = props.ref;
		typeof _ref$2 === "function" ? use(_ref$2, _el$8) : props.ref = _el$8;
		insert(_el$8, () => props.children);
		createRenderEffect(() => className(_el$8, classNames("popup-body", props.class)));
		return _el$8;
	})());
};
/**
* The popup's scrolling area. Where a flow footer follows it, the scroll's clip box reaches a
* few pixels into the footer's padding, so a card that ends at the very bottom can still paint
* its shadow there — see `$popup-scroll-bleed`.
*/
PopupElement.Scrollable = (props) => {
	const context = useContext(PopupContext);
	const borders = () => {
		const top = !!context.store.header && !context.hasFloatingHeader;
		const bottom = context.hasFlowButtons;
		return top && bottom ? "both" : top ? "top" : bottom ? "bottom" : void 0;
	};
	let scrollElement;
	const decideFocusability = () => {
		if (props.tabIndex !== void 0) return;
		updateScrollRegionFocusable(scrollElement, context.store.title instanceof HTMLElement ? context.store.title.textContent : void 0);
	};
	onMount(() => {
		if (!scrollElement || !Modes.a11y) return;
		decideFocusability();
		const observer = new MutationObserver(decideFocusability);
		observer.observe(scrollElement, {
			childList: true,
			subtree: true
		});
		onCleanup(() => observer.disconnect());
	});
	return createComponent(Scrollable, mergeProps(props, {
		get tabIndex() {
			return props.tabIndex;
		},
		contextRef: (ref) => {
			context.setScrollableRef(ref);
			props.contextRef?.(ref);
		},
		ref: (element) => {
			scrollElement = element;
			props.ref?.(element);
		},
		get trackEnds() {
			return props.trackEnds || context.hasFloatingHeader || context.hasFlowFooter;
		},
		get withBorders() {
			return props.withBorders ?? borders();
		},
		get ["class"]() {
			return classNames("popup-scrollable", props.class);
		},
		get children() {
			return props.children;
		}
	}));
};
PopupElement.Footer = (props) => {
	const context = useContext(PopupContext);
	const inFlow = () => !props.floating && !props.sticky;
	createRenderEffect(() => context.setHasFlowFooter(inFlow()));
	onCleanup(() => context.setHasFlowFooter(false));
	const isScrolledToEnd = () => context.scrollableRef?.isScrolledToEnd ?? true;
	return context.register("footer", (() => {
		var _el$9 = _tmpl$3();
		insert(_el$9, () => props.children);
		createRenderEffect(() => className(_el$9, classNames("popup-footer popup-footer-abitlarger", (props.floating || props.sticky) && "popup-footer-floating", props.sticky && "popup-footer-sticky", inFlow() && "popup-footer-shaded", isScrolledToEnd() && "scrolled-end", props.class)));
		return _el$9;
	})());
};
/**
* Spacer for a floating footer: it stands at the end of the scroll so the last of the content
* clears the footer painted over it. It is one button tall (`--popup-footer-height`) — a footer
* with more in it than that is taller, and the popup has to reserve the difference itself.
*/
PopupElement.FooterPlaceholder = () => {
	return _tmpl$6();
};
PopupElement.FooterButton = (props) => {
	return createComponent(PopupElement.Button, mergeProps(props, {
		noDefaultClass: true,
		get ["class"]() {
			return classNames("popup-footer-button", "btn-primary", props.color === "danger" && "btn-primary-transparent danger", props.color === "secondary" && "btn-transparent primary text-bold", (!props.color || props.color === "primary") && "btn-color-primary", props.class);
		}
	}));
};
PopupElement.Button = (props) => {
	const context = useContext(PopupContext);
	const [disabled, setDisabled] = createSignal(false);
	const [pending, setPending] = createSignal(false);
	const handleClick = async (e) => {
		if (context.destroyed) return;
		let result = props.callback?.(e);
		if (result !== void 0 && result instanceof Promise) {
			setDisabled(true);
			setPending(true);
			try {
				result = await result;
			} catch (err) {
				console.log("popup button error", err);
				result = false;
			}
			if (result === false) {
				setDisabled(false);
				setPending(false);
			}
		}
		if (result === false) return;
		context.hide();
	};
	onMount(() => {
		createEffect(() => {
			if (props.confirm) {
				context.setBtnConfirmOnEnter(ref);
				onCleanup(() => {
					context.setBtnConfirmOnEnter();
				});
			}
		});
		createEffect(() => {
			if (!props.preloader || !pending()) return;
			const preloader = putPreloader(ref);
			onCleanup(() => preloader.remove());
		});
	});
	const pendingLangKey = () => pending() ? props.pendingLangKey : void 0;
	let ref;
	return context.registerButton(props, createComponent(Button, {
		get ["class"]() {
			return classNames(!props.noDefaultClass && "popup-button btn", props.noDefaultClass ? void 0 : props.danger ? "danger" : "primary", props.preloader && pending() && "is-pending", props.class);
		},
		get noRipple() {
			return props.noRipple;
		},
		onClick: handleClick,
		get disabled() {
			return props.disabled || disabled();
		},
		get icon() {
			return props.iconLeft;
		},
		get iconAfter() {
			return props.iconRight;
		},
		get iconClass() {
			return classNames("popup-button-icon", "inline-icon", props.iconLeft ? "left" : "right");
		},
		get text() {
			return pendingLangKey() ?? props.langKey;
		},
		get textArgs() {
			return memo(() => !!pendingLangKey())() ? void 0 : props.langArgs;
		},
		ref: (_ref) => {
			ref = _ref;
			props.ref?.(ref);
		},
		get children() {
			return props.children;
		}
	}));
};
PopupElement.Buttons = (props) => {
	const context = useContext(PopupContext);
	createRenderEffect(() => context.setHasFlowButtons(true));
	onCleanup(() => context.setHasFlowButtons(false));
	return context.register("buttons", (() => {
		var _el$1 = _tmpl$3();
		insert(_el$1, () => props.children);
		createRenderEffect(() => className(_el$1, classNames("popup-buttons", props.class)));
		return _el$1;
	})());
};
/**
* Whether a modal popup is open over `element`: the top one has an overlay and
* does not hold it. The composer can still get the focus under one — given back
* after the key that sent the message — and the keys meant for the popup must
* not act on it. A popup on its way out, whose fade outlasts it, holds nothing.
*/
function isUnderModalPopup(element) {
	let top;
	for (let index = PopupElement.POPUPS.length - 1; index >= 0 && !top; --index) if (!PopupElement.POPUPS[index].destroyed) top = PopupElement.POPUPS[index];
	return !!top && !top.withoutOverlay && !top.element?.contains(element);
}
PopupElement.getPopups = (popupKind) => {
	return PopupElement.POPUPS.filter((element) => {
		return element.kind === popupKind;
	});
};
var addCancelButton = (buttons) => {
	if (!buttons.find((b) => b.isCancel)) buttons.push({
		langKey: "Cancel",
		isCancel: true
	});
	return buttons;
};
function createPopup(callback) {
	createRoot((dispose) => {
		createComponent(PopupControllerContext.Provider, {
			value: { dispose },
			get children() {
				return untrack(callback);
			}
		});
	});
}
delegateEvents(["mousedown", "click"]);
//#endregion
export { isUnderModalPopup as a, useSnitchedPopupContext as c, leaveSendShortcut as d, createPopup as i, isNewLineShortcutPressed as l, PopupElement as n, usePopupContext as o, addCancelButton as r, usePopupController as s, PopupContext as t, isSendShortcutPressed as u };
