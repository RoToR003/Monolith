//# allFunctionsCalledOnLoad
import { a as i18n } from "./langPack-BmdJGr44.js";
import { C as createSignal, N as onMount, p as createComponent } from "./solid-9Vxm0VIz.js";
import { n as hotReloadGuard } from "./hotReloadGuardProvider-CHEsZRuG.js";
import { t as Button } from "./buttonTsx-Bwphkm9r.js";
import { Et as usePremium, i as Row, s as CheckboxFieldTsx } from "./confirmationPopup-Bz6mK0o-.js";
import { C as PrivacyType } from "./getChatMigratedTo-ChhMNXuu.js";
import { a as Section } from "./emailVerification-C8QYZSyu.js";
import { n as useSuperTab } from "./superTabProvider-LtveyH7W.js";
import { t as PrivacySection } from "./privacySection-B6r4C4NK.js";
//#region src/components/sidebarLeft/tabs/privacy/lastSeen.tsx
var PrivacyLastSeen = () => {
	const [tab] = useSuperTab();
	const globalPrivacy = tab.payload;
	const isPremium = usePremium();
	const hideReadTimeSignal = createSignal(!!globalPrivacy.pFlags.hide_read_marks);
	const [showAdditionalSettings, setShowAdditionalSettings] = createSignal(true);
	let privacySection;
	const canHideReadTime = () => {
		return privacySection.type !== PrivacyType.Everybody || !!privacySection.peerIds.disallow.length;
	};
	onMount(() => {
		tab.container.classList.add("privacy-tab", "privacy-last-seen");
		const caption = "PrivacySettingsController.LastSeenDescription";
		privacySection = new PrivacySection({
			tab,
			title: "LastSeenTitle",
			inputKey: "inputPrivacyKeyStatusTimestamp",
			captions: [
				caption,
				caption,
				caption
			],
			exceptionTexts: ["PrivacySettingsController.NeverShare", "PrivacySettingsController.AlwaysShare"],
			appendTo: tab.scrollable,
			onRadioChange: () => {
				setShowAdditionalSettings(canHideReadTime());
			},
			managers: tab.managers
		});
		tab.eventListener.addEventListener("destroy", () => {
			const hide = hideReadTimeSignal[0]() && canHideReadTime();
			if (!!globalPrivacy.pFlags.hide_read_marks === hide) return;
			const promise = tab.managers.appPrivacyManager.setGlobalPrivacySettings({
				_: "globalPrivacySettings",
				pFlags: {
					...globalPrivacy.pFlags,
					hide_read_marks: hide || void 0
				}
			});
			tab.eventListener.dispatchEvent("privacy", promise);
			return promise;
		});
	});
	return [createComponent(Section, {
		get classList() {
			return { hide: !showAdditionalSettings() };
		},
		caption: "HideReadTimeInfo",
		get children() {
			return createComponent(Row, { get children() {
				return [createComponent(Row.CheckboxFieldToggle, { get children() {
					return createComponent(CheckboxFieldTsx, {
						signal: hideReadTimeSignal,
						toggle: true
					});
				} }), createComponent(Row.Title, { get children() {
					return i18n("HideReadTime");
				} })];
			} });
		}
	}), createComponent(Section, {
		get classList() {
			return { hide: !showAdditionalSettings() };
		},
		get caption() {
			return i18n(isPremium() ? "PrivacyLastSeenPremiumInfoForPremium" : "PrivacyLastSeenPremiumInfo");
		},
		get children() {
			return createComponent(Button, {
				primaryTransparent: true,
				get text() {
					return isPremium() ? "PrivacyLastSeenPremiumForPremium" : "PrivacyLastSeenPremium";
				},
				onClick: () => hotReloadGuard.showPremiumPopup()
			});
		}
	})];
};
//#endregion
export { PrivacyLastSeen as default };
