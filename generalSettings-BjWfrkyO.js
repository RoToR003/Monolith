//# allFunctionsCalledOnLoad
import { h as Modes } from "./userAgent-ByGXcznk.js";
import { t as themeController } from "./themeController-2cytOOn0.js";
import { ut as IS_GEOLOCATION_SUPPORTED } from "./apiManagerProxy-DmQXvxSF.js";
import { n as rootScope } from "./rootScope-CZS0lmz8.js";
import { a as i18n, u as langPack_default } from "./langPack-BmdJGr44.js";
import { C as createSignal, M as onCleanup, N as onMount, i as For, p as createComponent, s as Show, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { c as presetThemeId, o as getAccentPresetsForBase } from "./state-JPIG5PpJ.js";
import { t as joinDeepPath } from "./setDeepProperty-IYhQYgHt.js";
import { c as insert, g as template, p as setStyleProperty, s as delegateEvents } from "./web-BPyQozky.js";
import { n as hotReloadGuard } from "./hotReloadGuardProvider-CHEsZRuG.js";
import { o as useAppSettings } from "./liteMode-DeLStZfQ.js";
import { t as Scrollable } from "./scrollable2-Bau9Hoih.js";
import { t as appDownloadManager } from "./appDownloadManager-ClHW2-Dl.js";
import { m as ChatBackgroundStore } from "./index-B7axFZql.js";
import { r as GrowHeightReveal } from "./animations-DCmLIda3.js";
import { i as Row, s as CheckboxFieldTsx } from "./confirmationPopup-Bz6mK0o-.js";
import { t as subscribeOn } from "./subscribeOn-DnCla7ws.js";
import { i as fastSmoothScroll } from "./scrollable-C2-FwBtK.js";
import { a as Section } from "./emailVerification-C8QYZSyu.js";
import { t as eachTimeout } from "./eachTimeout-DofW9JiZ.js";
import { n as useSuperTab } from "./superTabProvider-LtveyH7W.js";
import { t as RadioFieldTsx } from "./radioFieldTsx-kmtuN4Dv.js";
import { t as ChatThemesPicker } from "./chatThemesPicker-CcIr98bS.js";
import { t as RangeSettingSelector } from "./rangeSettingSelector-D5UJ_dJM.js";
//#region src/helpers/eachMinute.ts
function eachMinute(callback, runFirst) {
	return eachTimeout(callback, () => (60 - (/* @__PURE__ */ new Date()).getSeconds()) * 1e3, runFirst);
}
//#endregion
//#region src/components/sidebarLeft/tabs/generalSettings.tsx
var _tmpl$ = /*#__PURE__*/ template(`<form style=margin-top:.5rem>`);
var _tmpl$2 = /*#__PURE__*/ template(`<div class="accent-circle accent-circle--default"title=Default><div class=accent-circle__inner>`);
var _tmpl$3 = /*#__PURE__*/ template(`<div class=accent-circle><div class=accent-circle__inner>`);
var _tmpl$4 = /*#__PURE__*/ template(`<form>`);
var SettingsSection = () => {
	const [tab] = useSuperTab();
	const [appSettings, setAppSettings] = useAppSettings();
	const liteModeStatus = () => appSettings.liteMode.all ? "Checkbox.Enabled" : "Checkbox.Disabled";
	const liteModeStatusEl = new langPack_default.IntlElement();
	const onUpdate = () => {
		liteModeStatusEl.compareAndUpdate({ key: liteModeStatus() });
	};
	onMount(() => {
		onUpdate();
		ChatBackgroundStore.preloadWallPapers(rootScope.managers, appDownloadManager);
	});
	subscribeOn(rootScope)("settings_updated", onUpdate);
	return createComponent(Section, {
		name: "Settings",
		get children() {
			return [
				createComponent(RangeSettingSelector, {
					get textLeft() {
						return i18n("TextSize");
					},
					textRight: (value) => "" + value,
					step: 1,
					get value() {
						return appSettings.messagesTextSize;
					},
					minValue: 12,
					maxValue: 20,
					onChange: (value) => setAppSettings("messagesTextSize", value)
				}),
				createComponent(Row, {
					clickable: () => tab.slider.createTab(hotReloadGuard.tabs.AppChatBackgroundTab).open(),
					get children() {
						return [createComponent(Row.Icon, { icon: "appearance_filled" }), createComponent(Row.Title, { get children() {
							return i18n("ChatBackground");
						} })];
					}
				}),
				createComponent(Show, {
					get when() {
						return Modes.a11y;
					},
					get children() {
						return createComponent(Row, { get children() {
							return [
								createComponent(Row.CheckboxFieldToggle, { get children() {
									return createComponent(CheckboxFieldTsx, {
										get stateKey() {
											return joinDeepPath("settings", "increaseContrast");
										},
										toggle: true
									});
								} }),
								createComponent(Row.Title, { get children() {
									return i18n("GeneralSettings.IncreaseContrast");
								} }),
								createComponent(Row.Subtitle, { get children() {
									return i18n("GeneralSettings.IncreaseContrastInfo");
								} })
							];
						} });
					}
				}),
				createComponent(Row, {
					clickable: () => tab.slider.createTab(hotReloadGuard.tabs.AppPowerSavingTab).open(),
					get children() {
						return [createComponent(Row.Icon, { icon: "sputnik_filled" }), createComponent(Row.Title, {
							get titleRight() {
								return liteModeStatusEl.element;
							},
							titleRightSecondary: true,
							get children() {
								return i18n("LiteMode.EnableText");
							}
						})];
					}
				})
			];
		}
	});
};
var THEME_VARIANTS = [
	["day", "ThemeDay"],
	["night", "ThemeNight"],
	["light", "ThemeLight"],
	["tinted", "ThemeTinted"],
	["system", "AutoNightSystemDefault"]
];
var ThemeSection = () => {
	const stateKey = joinDeepPath("settings", "theme");
	const readThemeState = () => {
		const theme = themeController.getTheme();
		return {
			id: String(theme.id ?? ""),
			name: theme.name
		};
	};
	const [themeState, setThemeState] = createSignal(readThemeState(), { equals: (a, b) => a.id === b.id && a.name === b.name });
	subscribeOn(rootScope)("theme_changed", () => setThemeState(readThemeState()));
	const selectedThemeId = () => themeState().id;
	const pickerBaseTheme = () => themeController.getBaseThemeForName(themeState().name);
	subscribeOn(rootScope)("settings_updated", ({ key }) => {
		if (key === stateKey) rootScope.dispatchEvent("theme_change");
	});
	const [isDark, setIsDark] = createSignal(themeController.getResolvedThemeName() === "tinted");
	subscribeOn(rootScope)("theme_changed", () => setIsDark(themeController.getResolvedThemeName() === "tinted"));
	return createComponent(Section, {
		name: "ColorTheme",
		get children() {
			return [
				createComponent(ChatThemesPicker, {
					selectedId: selectedThemeId,
					baseTheme: pickerBaseTheme,
					onSelect: (theme) => themeController.applyNewTheme(theme),
					recenterOnBaseChange: true
				}),
				(() => {
					var _el$ = _tmpl$();
					insert(_el$, () => THEME_VARIANTS.map(([value, langKey]) => createComponent(Row, { get children() {
						return [createComponent(Row.RadioField, { get children() {
							return createComponent(RadioFieldTsx, {
								name: "theme",
								value,
								stateKey
							});
						} }), createComponent(Row.Title, { get children() {
							return i18n(langKey);
						} })];
					} })));
					return _el$;
				})(),
				createComponent(GrowHeightReveal, {
					get when() {
						return isDark();
					},
					appear: false,
					"class": "accent-picker-frame",
					get children() {
						return createComponent(AccentPickerRow, {});
					}
				})
			];
		}
	});
};
var hexFromInt = (n) => "#" + n.toString(16).padStart(6, "0");
var AccentPickerRow = () => {
	let scrollableEl;
	const computeState = () => {
		const theme = themeController.getTheme();
		const base = themeController.getBaseThemeForName(theme.name);
		const presets = getAccentPresetsForBase(base);
		const isTinted = base === "baseThemeTinted";
		let activeId = String(theme.id ?? "");
		if (isTinted && activeId === "" && presets.length) activeId = presetThemeId(presets[0]);
		return {
			presets,
			activeId,
			showDefault: !isTinted
		};
	};
	const [state, setState] = createSignal(computeState());
	const scrollActiveIntoView = () => {
		const active = scrollableEl?.querySelector(".accent-circle--active");
		if (!active) return;
		fastSmoothScroll({
			element: active,
			container: scrollableEl,
			axis: "x",
			position: "center"
		});
	};
	subscribeOn(rootScope)("theme_changed", () => {
		setState(computeState());
		queueMicrotask(scrollActiveIntoView);
	});
	const onDefault = () => themeController.resetActiveTheme();
	const onPreset = (preset) => themeController.applyAccentPreset(preset);
	return createComponent(Scrollable, {
		axis: "x",
		"class": "accent-picker",
		ref: (el) => scrollableEl = el,
		get children() {
			return [createComponent(Show, {
				get when() {
					return state().showDefault;
				},
				get children() {
					var _el$2 = _tmpl$2();
					_el$2.$$click = onDefault;
					createRenderEffect(() => _el$2.classList.toggle("accent-circle--active", !!(state().activeId === "")));
					return _el$2;
				}
			}), createComponent(For, {
				get each() {
					return state().presets;
				},
				children: (preset) => {
					const accent = hexFromInt(preset.accent_color);
					const fill1 = hexFromInt(preset.message_colors[0] ?? preset.accent_color);
					const fill2 = preset.message_colors[1] !== void 0 ? hexFromInt(preset.message_colors[1]) : fill1;
					return (() => {
						var _el$3 = _tmpl$3();
						_el$3.$$click = () => onPreset(preset);
						setStyleProperty(_el$3, "--accent-circle-ring", accent);
						setStyleProperty(_el$3, "--accent-circle-fill-1", fill1);
						setStyleProperty(_el$3, "--accent-circle-fill-2", fill2);
						createRenderEffect(() => _el$3.classList.toggle("accent-circle--active", !!(state().activeId === presetThemeId(preset))));
						return _el$3;
					})();
				}
			})];
		}
	});
};
var DistanceUnitsSection = () => {
	const stateKey = joinDeepPath("settings", "distanceUnit");
	const radios = [["kilometers", "DistanceUnitsKilometers"], ["miles", "DistanceUnitsMiles"]];
	return createComponent(Section, {
		name: "DistanceUnitsTitle",
		get children() {
			var _el$4 = _tmpl$4();
			insert(_el$4, () => radios.map(([value, langKey]) => createComponent(Row, { get children() {
				return [createComponent(Row.RadioField, { get children() {
					return createComponent(RadioFieldTsx, {
						name: "distance-unit",
						value,
						stateKey
					});
				} }), createComponent(Row.Title, { get children() {
					return i18n(langKey);
				} })];
			} })));
			return _el$4;
		}
	});
};
var TimeFormatSection = () => {
	const stateKey = joinDeepPath("settings", "timeFormat");
	const items = [["h12", "General.TimeFormat.h12"], ["h23", "General.TimeFormat.h23"]].map(([format, langKey]) => {
		const [subtitle, setSubtitle] = createSignal("");
		return {
			format,
			langKey,
			subtitle,
			setSubtitle
		};
	});
	const updateAll = () => {
		const date = /* @__PURE__ */ new Date();
		items.forEach(({ format, setSubtitle }) => {
			setSubtitle(date.toLocaleTimeString("en-us-u-hc-" + format, {
				hour: "2-digit",
				minute: "2-digit"
			}));
		});
	};
	updateAll();
	const cancel = eachMinute(updateAll);
	onCleanup(cancel);
	return createComponent(Section, {
		name: "General.TimeFormat",
		get children() {
			var _el$5 = _tmpl$4();
			insert(_el$5, () => items.map(({ format, langKey, subtitle }) => createComponent(Row, { get children() {
				return [
					createComponent(Row.RadioField, { get children() {
						return createComponent(RadioFieldTsx, {
							name: "time-format",
							value: format,
							stateKey
						});
					} }),
					createComponent(Row.Title, { get children() {
						return i18n(langKey);
					} }),
					createComponent(Row.Subtitle, { get children() {
						return subtitle();
					} })
				];
			} })));
			return _el$5;
		}
	});
};
var GeneralSettings = () => {
	return [
		createComponent(SettingsSection, {}),
		createComponent(ThemeSection, {}),
		IS_GEOLOCATION_SUPPORTED && createComponent(DistanceUnitsSection, {}),
		createComponent(TimeFormatSection, {})
	];
};
delegateEvents(["click"]);
//#endregion
export { GeneralSettings as default };
