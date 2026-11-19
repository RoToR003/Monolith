//# allFunctionsCalledOnLoad
import { a as i18n } from "./langPack-BmdJGr44.js";
import { n as hotReloadGuard } from "./hotReloadGuardProvider-CHEsZRuG.js";
import { t as anchorCallback } from "./anchorCallback-BbwAJdBk.js";
import { t as privacyTab } from "./privacyTab-CLQUZDNg.js";
import { t as PrivacySection } from "./privacySection-B6r4C4NK.js";
//#region src/components/sidebarLeft/tabs/privacy/voices.tsx
var caption = "PrivacyVoiceMessagesInfo";
var voices_default = privacyTab("privacy-voices", (tab) => {
	new PrivacySection({
		tab,
		title: "PrivacyVoiceMessagesTitle",
		inputKey: "inputPrivacyKeyVoiceMessages",
		captions: [
			caption,
			caption,
			caption
		],
		exceptionTexts: ["PrivacySettingsController.NeverAllow", "PrivacySettingsController.AlwaysAllow"],
		appendTo: tab.scrollable,
		managers: tab.managers,
		premiumOnly: true,
		premiumCaption: i18n("Privacy.VoiceMessagesPremiumCaption", [anchorCallback(() => {
			hotReloadGuard.showPremiumPopup();
		})]),
		premiumError: "PrivacySettings.Voice.PremiumError"
	});
});
//#endregion
export { voices_default as default };
