//# allFunctionsCalledOnLoad
import { r as IS_APPLE, s as IS_MOBILE } from "./userAgent-ByGXcznk.js";
import { a as i18n } from "./langPack-BmdJGr44.js";
import { C as createSignal, M as onCleanup, S as createSelector, b as createResource, p as createComponent, s as Show, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { t as joinDeepPath } from "./setDeepProperty-IYhQYgHt.js";
import { _ as use, a as classList, c as insert, f as setAttribute, g as template, o as className, s as delegateEvents, u as memo } from "./web-BPyQozky.js";
import { r as useHotReloadGuard } from "./hotReloadGuard-BUNVkeQ4.js";
import { t as ripple } from "./ripple-D7hcIc_t.js";
import { t as IconTsx } from "./iconTsx-B4lOk4A6.js";
import { t as ListenerSetter } from "./listenerSetter-BER6qAXn.js";
import { s as CheckboxFieldTsx } from "./confirmationPopup-Bz6mK0o-.js";
import { i as usePromiseCollector } from "./mediaHeader-CnpQNwOl.js";
import { a as Section } from "./emailVerification-C8QYZSyu.js";
import { n as useSuperTab } from "./superTabProvider-LtveyH7W.js";
import { t as Space } from "./space-XGOOgiuc.js";
import { t as InlineSelect } from "./inlineSelect-CUZ60ySC.js";
import { t as usePasscodeActions } from "./actions-StFhfjLY.js";
import { t as SettingsTabLottieAnimation } from "./settingsTabLottieAnimation-B4U2pG04.js";
import { t as common_module_default } from "./common.module-x2zhfStI.js";
var mainTab_module_default = {
	MainDescription: "_MainDescription_jku1k_16",
	FirstSection: "_FirstSection_jku1k_24",
	Row: "_Row_jku1k_29",
	ShortcutBuilderRow: "_ShortcutBuilderRow_jku1k_34",
	ShortcutBuilderRowChild: "_ShortcutBuilderRowChild_jku1k_40",
	collapsed: "_collapsed_jku1k_43",
	Hint: "_Hint_jku1k_48"
};
var shortcutBuilder_module_default = {
	Container: "_Container_1rj8z_1",
	KeysContainer: "_KeysContainer_1rj8z_9",
	KeyButton: "_KeyButton_1rj8z_15",
	selected: "_selected_1rj8z_38",
	KeyButtonFirst: "_KeyButtonFirst_1rj8z_59",
	KeyButtonLast: "_KeyButtonLast_1rj8z_63",
	PlusIcon: "_PlusIcon_1rj8z_68",
	TargetKey: "_TargetKey_1rj8z_73"
};
//#endregion
//#region src/components/sidebarLeft/tabs/passcodeLock/shortcutBuilder.tsx
var _tmpl$$1 = /*#__PURE__*/ template(`<span>`);
var _tmpl$2$1 = /*#__PURE__*/ template(`<div><div></div><div>`);
var _tmpl$3 = /*#__PURE__*/ template(`<button>`);
var shortcutKeys = [
	"Ctrl",
	"Alt",
	"Shift",
	"Meta"
];
var ShortcutBuilder = (props) => {
	const isSelected = createSelector(() => props.value, (value, shortcuts) => shortcuts.includes(value));
	const getKeyContent = (key) => {
		if (key === "Meta") return createComponent(IconTsx, { icon: IS_APPLE ? "mac_command_key" : "win_key_filled" });
		return (() => {
			var _el$ = _tmpl$$1();
			insert(_el$, key);
			return _el$;
		})();
	};
	const onKeyClick = (key) => {
		if (props.value.includes(key)) {
			const newValue = props.value.filter((k) => k !== key);
			if (!newValue.length) {
				const indicies = [
					0,
					1,
					2,
					3
				].filter((i) => i !== shortcutKeys.indexOf(key));
				newValue.push(shortcutKeys[indicies[Math.floor(Math.random() * indicies.length)]]);
			}
			props.onChange(newValue);
		} else props.onChange([...props.value, key]);
	};
	return (() => {
		var _el$2 = _tmpl$2$1(), _el$3 = _el$2.firstChild, _el$4 = _el$3.nextSibling;
		insert(_el$3, () => shortcutKeys.map((key, idx, array) => (() => {
			var _el$5 = _tmpl$3();
			_el$5.$$click = onKeyClick;
			_el$5.$$clickData = key;
			use(ripple, _el$5, () => true);
			insert(_el$5, () => getKeyContent(key));
			createRenderEffect((_p$) => {
				var _v$5 = shortcutBuilder_module_default.KeyButton, _v$6 = {
					[shortcutBuilder_module_default.selected]: isSelected(key),
					[shortcutBuilder_module_default.KeyButtonFirst]: idx === 0,
					[shortcutBuilder_module_default.KeyButtonLast]: idx === array.length - 1
				}, _v$7 = isSelected(key);
				_v$5 !== _p$.e && className(_el$5, _p$.e = _v$5);
				_p$.t = classList(_el$5, _v$6, _p$.t);
				_v$7 !== _p$.a && setAttribute(_el$5, "aria-pressed", _p$.a = _v$7);
				return _p$;
			}, {
				e: void 0,
				t: void 0,
				a: void 0
			});
			return _el$5;
		})()));
		insert(_el$2, createComponent(IconTsx, {
			get ["class"]() {
				return shortcutBuilder_module_default.PlusIcon;
			},
			icon: "plus"
		}), _el$4);
		insert(_el$4, () => props.key);
		createRenderEffect((_p$) => {
			var _v$ = shortcutBuilder_module_default.Container, _v$2 = { [props.class]: !!props.class }, _v$3 = shortcutBuilder_module_default.KeysContainer, _v$4 = shortcutBuilder_module_default.TargetKey;
			_v$ !== _p$.e && className(_el$2, _p$.e = _v$);
			_p$.t = classList(_el$2, _v$2, _p$.t);
			_v$3 !== _p$.a && className(_el$3, _p$.a = _v$3);
			_v$4 !== _p$.o && className(_el$4, _p$.o = _v$4);
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
delegateEvents(["click"]);
//#endregion
//#region src/components/sidebarLeft/tabs/passcodeLock/mainTab.tsx
var _tmpl$ = /*#__PURE__*/ template(`<div>`);
var _tmpl$2 = /*#__PURE__*/ template(`<div><button class="btn-primary btn-color-primary btn-large">`);
var getHintParams = (tab, title) => ({
	appendTo: tab.scrollable.container,
	duration: 2500,
	from: "bottom",
	textElement: i18n(title),
	icon: "premium_lock",
	class: mainTab_module_default.Hint,
	canCloseOnPeerChange: false
});
var MainTab = () => {
	const { rootScope } = useHotReloadGuard();
	const promiseCollector = usePromiseCollector();
	const [enabled, { mutate: mutateEnabled }] = createResource(() => {
		const promise = rootScope.managers.appStateManager.getState().then((state) => state.settings?.passcode?.enabled || false);
		promiseCollector.collect(promise);
		return promise;
	});
	const [isDisabling, setIsDisabling] = createSignal(false);
	const listenerSetter = new ListenerSetter();
	listenerSetter.add(rootScope)("settings_updated", ({ key, value }) => {
		if (key === joinDeepPath("settings", "passcode", "enabled")) mutateEnabled(value);
	});
	onCleanup(() => {
		listenerSetter.removeAll();
	});
	return createComponent(Show, {
		get when() {
			return enabled.state === "ready";
		},
		get children() {
			return memo(() => !!(enabled() || isDisabling()))() ? createComponent(PasscodeSetContent, { onDisable: () => setIsDisabling(true) }) : createComponent(NoPasscodeContent, {});
		}
	});
};
var NoPasscodeContent = () => {
	const [tab, { AppPasscodeEnterPasswordTab, AppPasscodeLockTab }] = useSuperTab();
	const { enablePasscode } = usePasscodeActions();
	const { setQuizHint } = useHotReloadGuard();
	const onEnable = () => {
		tab.slider.createTab(AppPasscodeEnterPasswordTab).open({
			onSubmit: (passcode) => {
				onSecondStep(passcode);
				passcode = "";
			},
			buttonText: "PasscodeLock.Next",
			inputLabel: "PasscodeLock.EnterAPasscode"
		});
	};
	const onSecondStep = (firstPasscode) => {
		tab.slider.createTab(AppPasscodeEnterPasswordTab).open({
			onSubmit: async (passcode, otherTab) => {
				if (passcode !== firstPasscode) throw {};
				await enablePasscode(passcode);
				passcode = "";
				otherTab.slider.sliceTabsUntilTab(AppPasscodeLockTab, otherTab);
				otherTab.close();
				setQuizHint(getHintParams(tab, "PasscodeLock.PasscodeHasBeenSet"));
			},
			buttonText: "PasscodeLock.SetPasscode",
			inputLabel: "PasscodeLock.ReEnterPasscode"
		});
	};
	return createComponent(Section, {
		caption: "PasscodeLock.Notice",
		get children() {
			return [
				createComponent(SettingsTabLottieAnimation, { name: "UtyanPasscode" }),
				(() => {
					var _el$ = _tmpl$();
					insert(_el$, () => i18n("PasscodeLock.Description"));
					createRenderEffect(() => className(_el$, mainTab_module_default.MainDescription));
					return _el$;
				})(),
				createComponent(Space, { amount: "0.5rem" }),
				(() => {
					var _el$2 = _tmpl$2(), _el$3 = _el$2.firstChild;
					_el$3.$$click = onEnable;
					use(ripple, _el$3, () => true);
					insert(_el$3, () => i18n("PasscodeLock.TurnOn"));
					createRenderEffect(() => className(_el$2, common_module_default.AdditionalPadding));
					return _el$2;
				})(),
				createComponent(Space, { amount: "1rem" })
			];
		}
	});
};
var PasscodeSetContent = (props) => {
	const [tab, { AppPasscodeEnterPasswordTab, AppPasscodeLockTab, AppPrivacyAndSecurityTab }] = useSuperTab();
	const { disablePasscode, changePasscode } = usePasscodeActions();
	const { rootScope, setQuizHint, Row, useAppSettings, confirmationPopup } = useHotReloadGuard();
	const [, setAppSettings] = useAppSettings();
	const options = [
		{
			value: 0,
			label: () => i18n("PasscodeLock.Disabled")
		},
		{
			value: 1,
			label: () => i18n("MinutesShort", [1])
		},
		{
			value: 5,
			label: () => i18n("MinutesShort", [5])
		},
		{
			value: 10,
			label: () => i18n("MinutesShort", [10])
		},
		{
			value: 15,
			label: () => i18n("MinutesShort", [15])
		},
		{
			value: 30,
			label: () => i18n("MinutesShort", [30])
		}
	];
	const [autoCloseRowEl, setAutoCloseRowEl] = createSignal();
	const [isOpen, setIsOpen] = createSignal(false);
	const [lockTimeout, { mutate: mutateLockTimeout }] = createResource(() => rootScope.managers.appStateManager.getState().then((state) => state?.settings?.passcode?.autoLockTimeoutMins || 0));
	const [shortcutEnabled, { mutate: mutateShortcutEnabled }] = createResource(() => rootScope.managers.appStateManager.getState().then((state) => state?.settings?.passcode?.lockShortcutEnabled || false));
	const [shortcutKeys, { mutate: mutateShortcutKeys }] = createResource(() => rootScope.managers.appStateManager.getState().then((state) => state?.settings?.passcode?.lockShortcut || []));
	const listenerSetter = new ListenerSetter();
	listenerSetter.add(rootScope)("settings_updated", ({ key, value }) => {
		if (key === joinDeepPath("settings", "passcode", "lockShortcut")) mutateShortcutKeys(value);
		else if (key === joinDeepPath("settings", "passcode", "lockShortcutEnabled")) mutateShortcutEnabled(value);
		else if (key === joinDeepPath("settings", "passcode", "autoLockTimeoutMins")) mutateLockTimeout(value);
	});
	function setShortcutKeys(value) {
		mutateShortcutKeys(value);
		setAppSettings("passcode", "lockShortcut", value);
	}
	function setShortcutEnabled(value) {
		mutateShortcutEnabled(value);
		setAppSettings("passcode", "lockShortcutEnabled", value);
	}
	function setLockTimeout(value) {
		mutateLockTimeout(value);
		setAppSettings("passcode", "autoLockTimeoutMins", value);
	}
	onCleanup(() => {
		listenerSetter.removeAll();
	});
	const canShowShortcut = () => !IS_MOBILE && shortcutKeys.state === "ready" && shortcutEnabled.state === "ready";
	const onPasscodeChange = () => {
		tab.slider.createTab(AppPasscodeEnterPasswordTab).open({
			onSubmit: (passcode) => {
				onChangeSecondStep(passcode);
				passcode = "";
			},
			buttonText: "PasscodeLock.Next",
			inputLabel: "PasscodeLock.EnterAPasscode"
		}, "PasscodeLock.EnterANewPasscode");
	};
	const onChangeSecondStep = (firstPasscode) => {
		tab.slider.createTab(AppPasscodeEnterPasswordTab).open({
			onSubmit: async (passcode, otherTab) => {
				if (passcode !== firstPasscode) throw {};
				await changePasscode(passcode);
				passcode = "";
				otherTab.slider.sliceTabsUntilTab(AppPasscodeLockTab, otherTab);
				otherTab.close();
				setQuizHint(getHintParams(tab, "PasscodeLock.PasscodeHasBeenChanged"));
			},
			buttonText: "PasscodeLock.SetPasscode",
			inputLabel: "PasscodeLock.ReEnterPasscode"
		}, "PasscodeLock.ReEnterPasscode");
	};
	const onDisable = () => {
		confirmationPopup({
			title: i18n("PasscodeLock.TurnOff.Title"),
			description: i18n("PasscodeLock.TurnOff.Description"),
			button: {
				text: i18n("PasscodeLock.TurnOff"),
				isDanger: true
			}
		}).then(async () => {
			props.onDisable();
			await disablePasscode();
			tab.close();
			setQuizHint(getHintParams(tab.slider.getTab(AppPrivacyAndSecurityTab), "PasscodeLock.PasscodeHasBeenDisabled"));
		}).catch(() => {});
	};
	const caption = [
		memo(() => i18n("PasscodeLock.Description")),
		createComponent(Space, { amount: "1rem" }),
		memo(() => i18n("PasscodeLock.Notice"))
	];
	return [createComponent(Section, {
		get ["class"]() {
			return mainTab_module_default.FirstSection;
		},
		caption,
		get children() {
			return [
				createComponent(SettingsTabLottieAnimation, { name: "UtyanPasscode" }),
				createComponent(Space, { amount: "1.125rem" }),
				createComponent(Row, {
					clickable: onDisable,
					get children() {
						return [createComponent(Row.Icon, { icon: "lockoff" }), createComponent(Row.Title, { get children() {
							return i18n("PasscodeLock.TurnOff.Title");
						} })];
					}
				}),
				createComponent(Row, {
					clickable: onPasscodeChange,
					get children() {
						return [createComponent(Row.Icon, { icon: "key_filled" }), createComponent(Row.Title, { get children() {
							return i18n("PasscodeLock.ChangePasscode");
						} })];
					}
				})
			];
		}
	}), createComponent(Section, {
		get caption() {
			return canShowShortcut() ? "PasscodeLock.LockShortcutDescription" : void 0;
		},
		get children() {
			return [createComponent(Show, {
				get when() {
					return lockTimeout.state === "ready";
				},
				get children() {
					return createComponent(Row, {
						ref: setAutoCloseRowEl,
						get ["class"]() {
							return mainTab_module_default.Row;
						},
						clickable: () => {
							setIsOpen(true);
						},
						get children() {
							return [createComponent(Row.Title, { get children() {
								return i18n("PasscodeLock.AutoLock");
							} }), createComponent(Row.RightContent, { get children() {
								return createComponent(InlineSelect, {
									get value() {
										return lockTimeout();
									},
									onClose: () => setIsOpen(false),
									options,
									onChange: setLockTimeout,
									get isOpen() {
										return isOpen();
									},
									get parent() {
										return autoCloseRowEl();
									}
								});
							} })];
						}
					});
				}
			}), createComponent(Show, {
				get when() {
					return canShowShortcut();
				},
				get children() {
					return [createComponent(Row, { get children() {
						return [createComponent(Row.CheckboxFieldToggle, { get children() {
							return createComponent(CheckboxFieldTsx, {
								toggle: true,
								get checked() {
									return shortcutEnabled();
								},
								onChange: setShortcutEnabled
							});
						} }), createComponent(Row.Title, { get children() {
							return i18n("PasscodeLock.EnableLockShortcut");
						} })];
					} }), (() => {
						var _el$4 = _tmpl$();
						insert(_el$4, createComponent(ShortcutBuilder, {
							get ["class"]() {
								return mainTab_module_default.ShortcutBuilderRowChild;
							},
							get value() {
								return shortcutKeys() || [];
							},
							onChange: setShortcutKeys,
							key: "L"
						}));
						createRenderEffect((_p$) => {
							var _v$ = mainTab_module_default.ShortcutBuilderRow, _v$2 = { [mainTab_module_default.collapsed]: !shortcutEnabled() };
							_v$ !== _p$.e && className(_el$4, _p$.e = _v$);
							_p$.t = classList(_el$4, _v$2, _p$.t);
							return _p$;
						}, {
							e: void 0,
							t: void 0
						});
						return _el$4;
					})()];
				}
			})];
		}
	})];
};
delegateEvents(["click"]);
//#endregion
export { MainTab as default };
