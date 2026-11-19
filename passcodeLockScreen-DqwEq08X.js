//# allFunctionsCalledOnLoad
import { h as Modes } from "./userAgent-ByGXcznk.js";
import { t as pause } from "./pause-BSJh-z46.js";
import { U as AccountController } from "./objectUrlUtils-5x08MNuO.js";
import { a as i18n, u as langPack_default } from "./langPack-BmdJGr44.js";
import { t as commonStateStorage } from "./commonStateStorage-CW-poHCa.js";
import { A as mergeProps, C as createSignal, M as onCleanup, N as onMount, b as createResource, g as createEffect, j as on, p as createComponent, s as Show, w as createUniqueId, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { n as getAppWindow, r as getOverlayRoot, t as bindActiveWindowListener } from "./appWindow-bo-KtJhy.js";
import { t as createMutable } from "./store-PwRn5fa3.js";
import { _ as use, a as classList, c as insert, f as setAttribute, g as template, n as Portal, o as className, p as setStyleProperty, r as addEventListener, s as delegateEvents, u as memo } from "./web-BPyQozky.js";
import { i as useLockScreenHotReloadGuard } from "./hotReloadGuard-BUNVkeQ4.js";
import { r as useMediaSizes, t as ScreenSize } from "./mediaSizes-C1MTaleW.js";
import { t as ripple } from "./ripple-D7hcIc_t.js";
import { n as createFocusTrap } from "./focusTrap-CKEkJXZv.js";
import { t as throttle } from "./throttle-DxyCT6GJ.js";
import { t as animateValue } from "./animateValue-C0de6s5K.js";
import { t as ChatBackground } from "./index-B7axFZql.js";
import { t as Transition } from "./transition-Cmlc134D.js";
import { t as Space } from "./space-XGOOgiuc.js";
import { t as focusInput } from "./focusInput-BnALiJjU.js";
import { t as usePasscodeActions } from "./actions-StFhfjLY.js";
//#region src/components/passcodeLock/background.tsx
var Background = (props) => {
	const { themeController, rootScope } = useLockScreenHotReloadGuard();
	const mediaSizes = useMediaSizes();
	return createComponent(Show, {
		get when() {
			return mediaSizes.activeScreen !== ScreenSize.mobile;
		},
		get children() {
			return createComponent(ChatBackground, {
				themeController,
				get managers() {
					return rootScope.managers;
				},
				get gradientRendererRef() {
					return props.gradientRendererRef;
				}
			});
		}
	});
};
var passcodeLockScreen_module_default = {
	Container: "_Container_3qox7_16",
	Card: "_Card_3qox7_26",
	Description: "_Description_3qox7_40",
	Input: "_Input_3qox7_47",
	SubmitButton: "_SubmitButton_3qox7_51",
	LogoutButton: "_LogoutButton_3qox7_55"
};
var passwordMonkeyTsx_module_default = {
	PasswordMonkey: "_PasswordMonkey_1h0e6_1",
	hidden: "_hidden_1h0e6_8",
	MonkeyImage: "_MonkeyImage_1h0e6_13"
};
//#endregion
//#region src/components/passcodeLock/passwordMonkeyTsx.tsx
var _tmpl$$2 = /*#__PURE__*/ template(`<img src=assets/img/password-monkey-closed.png alt aria-hidden=true>`);
var _tmpl$2$1 = /*#__PURE__*/ template(`<div>`);
var PasswordMonkeyTsx = (inProps) => {
	const props = mergeProps({ size: 100 }, inProps);
	const { PasswordMonkey } = useLockScreenHotReloadGuard();
	const [monkey, setMonkey] = createSignal();
	const [monkeyLoaded, setMonkeyLoaded] = createSignal(false);
	createRenderEffect(() => {
		const monkey = new PasswordMonkey(props.passwordInputField, props.size);
		monkey.load().then(() => setMonkeyLoaded(true));
		setMonkey(monkey);
		onCleanup(() => {
			monkey.remove();
		});
	});
	return (() => {
		var _el$ = _tmpl$2$1();
		var _ref$ = props.ref;
		typeof _ref$ === "function" ? use(_ref$, _el$) : props.ref = _el$;
		insert(_el$, () => monkey().container, null);
		insert(_el$, createComponent(Show, {
			get when() {
				return !monkeyLoaded();
			},
			get children() {
				var _el$2 = _tmpl$$2();
				createRenderEffect(() => className(_el$2, passwordMonkeyTsx_module_default.MonkeyImage));
				return _el$2;
			}
		}), null);
		createRenderEffect((_p$) => {
			var _v$ = passwordMonkeyTsx_module_default.PasswordMonkey, _v$2 = { [passwordMonkeyTsx_module_default.hidden]: props.hidden }, _v$3 = props.size + "px";
			_v$ !== _p$.e && className(_el$, _p$.e = _v$);
			_p$.t = classList(_el$, _v$2, _p$.t);
			_v$3 !== _p$.a && setStyleProperty(_el$, "--size", _p$.a = _v$3);
			return _p$;
		}, {
			e: void 0,
			t: void 0,
			a: void 0
		});
		return _el$;
	})();
};
var simplePopup_module_default = { Popup: "_Popup_1o70z_1" };
//#endregion
//#region src/components/passcodeLock/simplePopup.tsx
var _tmpl$$1 = /*#__PURE__*/ template(`<div><div class=popup-container role=dialog aria-modal=true><div class=popup-header><div class=popup-title></div></div><div class=popup-description></div><div class=popup-buttons><button class="popup-button btn danger"></button><button class="popup-button btn primary"autofocus>`);
var SimplePopup = (props) => {
	const [container, setContainer] = createSignal();
	const titleId = createUniqueId();
	const descriptionId = createUniqueId();
	const root = getOverlayRoot();
	createEffect(() => {
		const element = container();
		if (!props.visible || !element) return;
		const trap = createFocusTrap(element);
		trap.activate(void 0, element.querySelector("[autofocus]"));
		const listener = (e) => {
			if (e.key === "Escape" && (!Modes.a11y || !e.defaultPrevented)) {
				if (Modes.a11y) e.preventDefault();
				props.onClose?.();
			}
		};
		const detach = bindActiveWindowListener((win) => win.document, "keydown", listener);
		onCleanup(() => {
			detach();
			trap.deactivate();
		});
	});
	return createComponent(Portal, {
		mount: root,
		get children() {
			return createComponent(Transition, {
				onEnter: async (el, done) => {
					await pause(0);
					el.classList.add("active");
					await pause(0);
					done();
				},
				onExit: async (el, done) => {
					el.classList.remove("active");
					await pause(200);
					done();
				},
				get children() {
					return memo(() => !!props.visible)() && (() => {
						var _el$ = _tmpl$$1(), _el$2 = _el$.firstChild, _el$3 = _el$2.firstChild, _el$4 = _el$3.firstChild, _el$5 = _el$3.nextSibling, _el$7 = _el$5.nextSibling.firstChild, _el$8 = _el$7.nextSibling;
						_el$.$$click = (e) => {
							if (e.target === e.currentTarget) props.onClose?.();
						};
						use(setContainer, _el$2);
						setAttribute(_el$2, "aria-labelledby", titleId);
						setAttribute(_el$2, "aria-describedby", descriptionId);
						setAttribute(_el$4, "id", titleId);
						insert(_el$4, () => props.title);
						setAttribute(_el$5, "id", descriptionId);
						insert(_el$5, () => props.description);
						addEventListener(_el$7, "click", props.onConfirm, true);
						use(ripple, _el$7, () => true);
						insert(_el$7, () => props.confirmButtonContent);
						addEventListener(_el$8, "click", props.onClose, true);
						use(ripple, _el$8, () => true);
						insert(_el$8, () => i18n("Cancel"));
						createRenderEffect((_p$) => {
							var _v$ = "popup popup-peer popup-confirmation " + simplePopup_module_default.Popup, _v$2 = Modes.a11y ? -1 : void 0;
							_v$ !== _p$.e && className(_el$, _p$.e = _v$);
							_v$2 !== _p$.t && setAttribute(_el$2, "tabindex", _p$.t = _v$2);
							return _p$;
						}, {
							e: void 0,
							t: void 0
						});
						return _el$;
					})();
				}
			});
		}
	});
};
delegateEvents(["click"]);
//#endregion
//#region src/components/passcodeLock/passcodeLockScreen.tsx
var _tmpl$ = /*#__PURE__*/ template(`<div><div><form action><button></button></form><div>`);
var _tmpl$2 = /*#__PURE__*/ template(`<button hidden aria-hidden=true type=submit style=visibility:hidden;height:0;width:0>`);
var _tmpl$3 = /*#__PURE__*/ template(`<button>`);
var MAX_ATTEMPTS = 5;
var MAX_ATTEMPTS_TIMEOUT_SEC = 60;
var PasscodeLockScreen = (props) => {
	let container;
	let passwordInputField;
	let passwordMonkeyContainer;
	let attempts = 0;
	const { isMyPasscode, unlockWithPasscode } = usePasscodeActions();
	const { InputFieldTsx, PasswordInputField, apiManagerProxy } = useLockScreenHotReloadGuard();
	const store = createMutable({
		isMonkeyHidden: !!props.fromLockIcon,
		isError: false,
		tooManyAttempts: false,
		passcode: "",
		isLogoutPopupOpen: false
	});
	const [totalAccounts] = createResource(() => AccountController.getUnencryptedTotalAccounts());
	onMount(() => {
		attempts = 0;
		const doc = container.ownerDocument;
		const trap = createFocusTrap(container);
		trap.activate();
		onCleanup(() => trap.deactivate());
		const lockIcon = props.fromLockIcon;
		if (lockIcon) (async () => {
			const lockIconRect = lockIcon.getBoundingClientRect();
			const rect = passwordMonkeyContainer.getBoundingClientRect();
			lockIcon.style.setProperty("--x", rect.left + rect.width / 2 + "px");
			lockIcon.style.setProperty("--y", rect.top + rect.height / 2 + "px");
			lockIcon.style.setProperty("--scale", rect.width / lockIconRect.width + "");
			lockIcon.classList.add("passcode-lock-screen__animated-lock-icon--shift-body");
			await pause(500);
			lockIcon.classList.add("passcode-lock-screen__animated-lock-icon--disappear");
			store.isMonkeyHidden = false;
			await pause(400);
			lockIcon.remove();
			props.onAnimationEnd?.();
		})();
		const listenerDoc = Modes.a11y ? doc : getAppWindow().document;
		const listener = (e) => {
			if (!Modes.a11y) {
				const activeDoc = getAppWindow().document;
				if (activeDoc.activeElement && activeDoc.activeElement.tagName === "INPUT") return;
			} else if (e.defaultPrevented || store.isLogoutPopupOpen || e.target !== doc.body && e.target !== container) return;
			focusInput(passwordInputField.input, e);
		};
		listenerDoc.addEventListener("keydown", listener);
		onCleanup(() => {
			listenerDoc.removeEventListener("keydown", listener);
		});
	});
	let cancelAnimation;
	function rotateBackgroundGradient() {
		cancelAnimation?.();
		if (store.gradientRenderer) {
			let progress = 0;
			cancelAnimation = animateValue(0, 1, 200, (p) => progress = p);
			store.gradientRenderer.toNextPosition(() => progress);
		}
	}
	const rotateBackgroundGradientThrottled = throttle(rotateBackgroundGradient, 100, true);
	createEffect(on(() => store.passcode, () => {
		rotateBackgroundGradientThrottled();
		store.isError = false;
		store.tooManyAttempts = false;
	}));
	onCleanup(() => {
		store.passcode = "";
		passwordInputField.input.value = "";
	});
	const canSubmit = () => !!store.passcode && store.passcode.length <= 32;
	const canAttempt = async () => {
		const settings = structuredClone(await commonStateStorage.get("settings", false));
		const canAttemptAgainOn = settings?.passcode?.canAttemptAgainOn;
		if (!canAttemptAgainOn) return true;
		if (canAttemptAgainOn > Date.now()) return false;
		store.tooManyAttempts = false;
		attempts = 0;
		settings.passcode.canAttemptAgainOn = null;
		commonStateStorage.set({ settings });
		return true;
	};
	let isSubmiting = false;
	const onSubmit = async (e) => {
		e?.preventDefault();
		if (isSubmiting) return;
		isSubmiting = true;
		try {
			if (!await canAttempt()) store.tooManyAttempts = true;
			else if (canSubmit() && await isMyPasscode(store.passcode)) {
				await unlockWithPasscode(store.passcode);
				props.onUnlock();
			} else {
				attempts++;
				store.isError = true;
				if (attempts > MAX_ATTEMPTS) {
					store.tooManyAttempts = true;
					const settings = structuredClone(await commonStateStorage.get("settings", false));
					settings.passcode.canAttemptAgainOn = Date.now() + MAX_ATTEMPTS_TIMEOUT_SEC * 1e3;
					await commonStateStorage.set({ settings });
				}
			}
		} catch {
			store.isError = true;
		} finally {
			isSubmiting = false;
		}
	};
	const input = createComponent(InputFieldTsx, {
		InputFieldClass: PasswordInputField,
		instanceRef: (value) => void (passwordInputField = value),
		get ["class"]() {
			return passcodeLockScreen_module_default.Input;
		},
		get value() {
			return store.passcode;
		},
		onRawInput: (value) => void (store.passcode = value),
		label: "PasscodeLock.EnterYourPasscode",
		get errorLabel() {
			return memo(() => !!store.tooManyAttempts)() ? "PasscodeLock.TooManyAttempts" : store.isError ? "PasscodeLock.WrongPasscode" : void 0;
		},
		maxLength: 32
	});
	return (() => {
		var _el$ = _tmpl$(), _el$2 = _el$.firstChild, _el$3 = _el$2.firstChild, _el$4 = _el$3.firstChild, _el$5 = _el$3.nextSibling;
		var _ref$ = container;
		typeof _ref$ === "function" ? use(_ref$, _el$) : container = _el$;
		insert(_el$, createComponent(Background, { gradientRendererRef: (value) => void (store.gradientRenderer = value) }), _el$2);
		insert(_el$2, createComponent(PasswordMonkeyTsx, {
			get hidden() {
				return store.isMonkeyHidden;
			},
			ref(r$) {
				var _ref$2 = passwordMonkeyContainer;
				typeof _ref$2 === "function" ? _ref$2(r$) : passwordMonkeyContainer = r$;
			},
			passwordInputField
		}), _el$3);
		insert(_el$2, createComponent(Space, { amount: "1.125rem" }), _el$3);
		_el$3.addEventListener("submit", onSubmit);
		insert(_el$3, input, _el$4);
		insert(_el$3, createComponent(Space, { amount: "1rem" }), _el$4);
		addEventListener(_el$4, "mousedown", Modes.a11y ? void 0 : () => {
			onSubmit();
		}, true);
		insert(_el$4, () => i18n("PasscodeLock.Proceed"));
		insert(_el$3, (() => {
			var _c$ = memo(() => !!!Modes.a11y);
			return () => _c$() && _tmpl$2();
		})(), null);
		insert(_el$2, createComponent(Space, { amount: "1.625rem" }), _el$5);
		insert(_el$5, () => i18n(totalAccounts() > 1 ? "PasscodeLock.ForgotPasscode.MultipleAccounts" : "PasscodeLock.ForgotPasscode.OneAccount", [(() => {
			var _el$7 = _tmpl$3();
			_el$7.$$click = () => {
				store.isLogoutPopupOpen = true;
			};
			createRenderEffect((_p$) => {
				var _v$7 = passcodeLockScreen_module_default.LogoutButton, _v$8 = langPack_default.format("LogOut", true);
				_v$7 !== _p$.e && className(_el$7, _p$.e = _v$7);
				_v$8 !== _p$.t && setAttribute(_el$7, "aria-label", _p$.t = _v$8);
				return _p$;
			}, {
				e: void 0,
				t: void 0
			});
			return _el$7;
		})()]));
		insert(_el$, createComponent(SimplePopup, {
			get visible() {
				return store.isLogoutPopupOpen;
			},
			get title() {
				return i18n("LogOut");
			},
			get description() {
				return i18n("PasscodeLock.LogoutPopup.Description");
			},
			get confirmButtonContent() {
				return i18n("LogOut");
			},
			onConfirm: () => {
				apiManagerProxy.invokeVoid("forceLogout", void 0);
			},
			onClose: () => void (store.isLogoutPopupOpen = false)
		}), null);
		createRenderEffect((_p$) => {
			var _v$ = passcodeLockScreen_module_default.Container, _v$2 = passcodeLockScreen_module_default.Card, _v$3 = Modes.a11y ? "submit" : "button", _v$4 = `btn-primary btn-color-primary btn-large ${passcodeLockScreen_module_default.SubmitButton}`, _v$5 = !store.passcode, _v$6 = passcodeLockScreen_module_default.Description;
			_v$ !== _p$.e && className(_el$, _p$.e = _v$);
			_v$2 !== _p$.t && className(_el$2, _p$.t = _v$2);
			_v$3 !== _p$.a && setAttribute(_el$4, "type", _p$.a = _v$3);
			_v$4 !== _p$.o && className(_el$4, _p$.o = _v$4);
			_v$5 !== _p$.i && (_el$4.disabled = _p$.i = _v$5);
			_v$6 !== _p$.n && className(_el$5, _p$.n = _v$6);
			return _p$;
		}, {
			e: void 0,
			t: void 0,
			a: void 0,
			o: void 0,
			i: void 0,
			n: void 0
		});
		return _el$;
	})();
};
delegateEvents(["mousedown", "click"]);
//#endregion
export { PasscodeLockScreen as default };
