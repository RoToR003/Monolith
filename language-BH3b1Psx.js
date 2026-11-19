//# allFunctionsCalledOnLoad
import { n as rootScope } from "./rootScope-CZS0lmz8.js";
import { a as i18n, s as join, u as langPack_default } from "./langPack-BmdJGr44.js";
import { C as createSignal, N as onMount, _ as createMemo, i as For, p as createComponent } from "./solid-9Vxm0VIz.js";
import { c as insert, g as template, u as memo } from "./web-BPyQozky.js";
import { n as hotReloadGuard } from "./hotReloadGuardProvider-CHEsZRuG.js";
import { o as useAppSettings } from "./liteMode-DeLStZfQ.js";
import { O as randomLong } from "./index-B7axFZql.js";
import { Et as usePremium, Mt as getDoNotTranslateLanguages, i as Row, s as CheckboxFieldTsx } from "./confirmationPopup-Bz6mK0o-.js";
import { ht as pickLanguage } from "./appDialogsManager-CXguiKc3.js";
import { i as usePromiseCollector } from "./mediaHeader-CnpQNwOl.js";
import { t as anchorCallback } from "./anchorCallback-BbwAJdBk.js";
import { a as Section } from "./emailVerification-C8QYZSyu.js";
import { n as useSuperTab } from "./superTabProvider-LtveyH7W.js";
import { t as RadioFieldTsx } from "./radioFieldTsx-kmtuN4Dv.js";
//#region src/components/sidebarLeft/tabs/language.tsx
var _tmpl$ = /*#__PURE__*/ template(`<form>`);
var TranslateSection = () => {
	const [appSettings, setAppSettings] = useAppSettings();
	const isPremium = usePremium();
	const doNotTranslate = createMemo(() => getDoNotTranslateLanguages(appSettings.translations.doNotTranslate));
	return createComponent(Section, {
		name: "TranslateMessages",
		get caption() {
			return isPremium() ? "Translation.DoNotShow" : "Language.TranslateMessages.Channel.Premium";
		},
		get captionArgs() {
			return [anchorCallback(() => {
				hotReloadGuard.showPremiumPopup({ feature: "translations" });
			})];
		},
		get children() {
			return [
				createComponent(Row, { get children() {
					return [createComponent(Row.CheckboxFieldToggle, { get children() {
						return createComponent(CheckboxFieldTsx, {
							get checked() {
								return appSettings.translations.showInMenu;
							},
							toggle: true,
							onChange: (checked) => {
								setAppSettings("translations", "showInMenu", checked);
							}
						});
					} }), createComponent(Row.Title, { get children() {
						return i18n("ShowTranslateButton");
					} })];
				} }),
				createComponent(Row, {
					get fakeDisabled() {
						return !isPremium();
					},
					get clickable() {
						return !isPremium() ? (e) => {
							e.preventDefault();
							hotReloadGuard.showPremiumPopup({ feature: "translations" });
						} : void 0;
					},
					get children() {
						return [createComponent(Row.CheckboxFieldToggle, { get children() {
							return createComponent(CheckboxFieldTsx, {
								get checked() {
									return appSettings.translations.enabled;
								},
								toggle: true,
								onChange: (checked) => {
									setAppSettings("translations", "enabled", checked);
								}
							});
						} }), createComponent(Row.Title, { get children() {
							return i18n("ShowTranslateChatButton");
						} })];
					}
				}),
				memo(() => memo(() => !!(appSettings.translations.showInMenu || appSettings.translations.enabled))() && createComponent(Row, {
					clickable: async () => {
						const languages = await pickLanguage(true, doNotTranslate());
						setAppSettings("translations", "doNotTranslate", languages);
					},
					get children() {
						return createComponent(Row.Title, {
							get titleRight() {
								return memo(() => doNotTranslate().length < 3)() ? join(doNotTranslate().map((lang) => i18n(`Language.${lang}`)), false) : i18n("Languages", [doNotTranslate().length]);
							},
							titleRightSecondary: true,
							get children() {
								return i18n("DoNotTranslate");
							}
						});
					}
				}))
			];
		}
	});
};
var LanguageListSection = () => {
	const promiseCollector = usePromiseCollector();
	const [languages, setLanguages] = createSignal([]);
	const [selectedLanguage, setSelectedLanguage] = createSignal();
	const radioName = randomLong();
	let webLangCodes = [];
	promiseCollector.collect((async () => {
		const langs1 = await rootScope.managers.appLangPackManager.getLanguages("web");
		const langs2 = [];
		const rendered = /* @__PURE__ */ new Set();
		webLangCodes = langs1.map((language) => language.lang_code);
		setLanguages(langs1.concat(langs2).filter((language) => {
			if (rendered.has(language.lang_code)) return false;
			rendered.add(language.lang_code);
			return true;
		}));
		const langPack = await langPack_default.getCacheLangPackAndApply();
		if (!rendered.has(langPack.lang_code)) {
			console.error("no language row", langPack);
			return;
		}
		setSelectedLanguage(langPack.lang_code);
	})());
	return createComponent(Section, { get children() {
		var _el$ = _tmpl$();
		insert(_el$, createComponent(For, {
			get each() {
				return languages();
			},
			children: (language) => createComponent(Row, { get children() {
				return [
					createComponent(Row.RadioField, { get children() {
						return createComponent(RadioFieldTsx, {
							"class": "disable-hover",
							get checked() {
								return selectedLanguage() === language.lang_code;
							},
							name: radioName,
							get value() {
								return language.lang_code;
							},
							onChange: (checked) => {
								if (!checked) return;
								setSelectedLanguage(language.lang_code);
								langPack_default.getLangPackAndApply(language.lang_code, webLangCodes.includes(language.lang_code));
							}
						});
					} }),
					createComponent(Row.Title, { get children() {
						return language.name;
					} }),
					createComponent(Row.Subtitle, { get children() {
						return language.native_name;
					} })
				];
			} })
		}));
		return _el$;
	} });
};
var Language = () => {
	const [tab] = useSuperTab();
	onMount(() => {
		tab.header.classList.add("with-border");
		tab.container.classList.add("language-container");
	});
	return [createComponent(TranslateSection, {}), createComponent(LanguageListSection, {})];
};
//#endregion
export { Language as default };
