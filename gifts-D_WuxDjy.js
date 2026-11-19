//# allFunctionsCalledOnLoad
import { n as rootScope } from "./rootScope-CZS0lmz8.js";
import { a as i18n } from "./langPack-BmdJGr44.js";
import { C as createSignal, N as onMount, p as createComponent } from "./solid-9Vxm0VIz.js";
import { n as hotReloadGuard } from "./hotReloadGuardProvider-CHEsZRuG.js";
import { i as Row, s as CheckboxFieldTsx } from "./confirmationPopup-Bz6mK0o-.js";
import { t as anchorCallback } from "./anchorCallback-BbwAJdBk.js";
import { a as Section } from "./emailVerification-C8QYZSyu.js";
import { r as toastNew, t as hideToast } from "./toast-B6VD5M7R.js";
import { n as useSuperTab } from "./superTabProvider-LtveyH7W.js";
import { t as PrivacySection } from "./privacySection-B6r4C4NK.js";
//#region src/components/sidebarLeft/tabs/privacy/gifts.tsx
var GIFT_TYPE_TOGGLES = [
	{
		flag: "disallow_limited_stargifts",
		langKey: "Privacy.GiftsTypeLimited"
	},
	{
		flag: "disallow_unlimited_stargifts",
		langKey: "Privacy.GiftsTypeUnlimited"
	},
	{
		flag: "disallow_unique_stargifts",
		langKey: "Privacy.GiftsTypeUnique"
	},
	{
		flag: "disallow_stargifts_from_channels",
		langKey: "Privacy.GiftsTypeChannel"
	},
	{
		flag: "disallow_premium_gifts",
		langKey: "Privacy.GiftsTypePremium"
	}
];
var PrivacyGifts = () => {
	const [tab] = useSuperTab();
	const globalPrivacy = tab.payload;
	const typeToggles = GIFT_TYPE_TOGGLES.map((item) => ({
		...item,
		signal: createSignal(!globalPrivacy.disallowed_gifts?.pFlags[item.flag])
	}));
	const showIconSignal = createSignal(!!globalPrivacy.pFlags.display_gifts_button);
	const showPremiumToast = () => {
		toastNew({
			langPackKey: "Privacy.GiftsPremiumError",
			langPackArguments: [anchorCallback(() => {
				hideToast();
				hotReloadGuard.showPremiumPopup();
			})]
		});
	};
	const gatePremiumToggle = (signal) => (checked) => {
		if (rootScope.premium) return;
		signal[1](!checked);
		showPremiumToast();
	};
	onMount(() => {
		tab.container.classList.add("privacy-tab", "privacy-gifts");
		const caption = "Privacy.GiftsCaption";
		new PrivacySection({
			tab,
			title: "Privacy.Gifts",
			inputKey: "inputPrivacyKeyStarGiftsAutoSave",
			captions: [
				caption,
				caption,
				caption
			],
			exceptionTexts: ["PrivacySettingsController.NeverAllow", "PrivacySettingsController.AlwaysAllow"],
			appendTo: tab.scrollable,
			managers: tab.managers,
			allowMiniApps: true
		});
		tab.eventListener.addEventListener("destroy", () => {
			if (!rootScope.premium) return;
			const newDisallowedPFlags = {};
			let hasAnyDisallow = false;
			for (const { flag, signal: [checked] } of typeToggles) if (!checked()) {
				newDisallowedPFlags[flag] = true;
				hasAnyDisallow = true;
			}
			const newDisplayGiftsButton = showIconSignal[0]();
			const currentDisallowedPFlags = globalPrivacy.disallowed_gifts?.pFlags || {};
			const sameDisallowed = GIFT_TYPE_TOGGLES.every(({ flag }) => !!currentDisallowedPFlags[flag] === !!newDisallowedPFlags[flag]);
			const sameShowIcon = !!globalPrivacy.pFlags.display_gifts_button === newDisplayGiftsButton;
			if (sameDisallowed && sameShowIcon) return;
			const settings = {
				...globalPrivacy,
				pFlags: {
					...globalPrivacy.pFlags,
					display_gifts_button: newDisplayGiftsButton || void 0
				},
				disallowed_gifts: hasAnyDisallow ? {
					_: "disallowedGiftsSettings",
					pFlags: newDisallowedPFlags
				} : void 0
			};
			const promise = tab.managers.appPrivacyManager.setGlobalPrivacySettings(settings);
			tab.eventListener.dispatchEvent("privacy", promise);
			return promise;
		});
	});
	return [createComponent(Section, {
		name: "Privacy.GiftsAcceptedTypes",
		caption: "Privacy.GiftsAcceptedTypesInfo",
		get children() {
			return typeToggles.map(({ langKey, signal }) => createComponent(Row, { get children() {
				return [createComponent(Row.CheckboxFieldToggle, { get children() {
					return createComponent(CheckboxFieldTsx, {
						signal,
						toggle: true,
						get onChange() {
							return gatePremiumToggle(signal);
						}
					});
				} }), createComponent(Row.Title, { get children() {
					return i18n(langKey);
				} })];
			} }));
		}
	}), createComponent(Section, {
		caption: "Privacy.GiftsShowIconInfo",
		get children() {
			return createComponent(Row, { get children() {
				return [createComponent(Row.CheckboxFieldToggle, { get children() {
					return createComponent(CheckboxFieldTsx, {
						signal: showIconSignal,
						toggle: true,
						get onChange() {
							return gatePremiumToggle(showIconSignal);
						}
					});
				} }), createComponent(Row.Title, { get children() {
					return i18n("Privacy.GiftsShowIcon");
				} })];
			} });
		}
	})];
};
//#endregion
export { PrivacyGifts as default };
