//# allFunctionsCalledOnLoad
import { t as privacyTab } from "./privacyTab-CLQUZDNg.js";
import { t as PrivacySection } from "./privacySection-B6r4C4NK.js";
//#region src/components/sidebarLeft/tabs/privacy/savedMusic.tsx
var caption = "Privacy.SavedMusicCaption";
var savedMusic_default = privacyTab("privacy-saved-music", (tab) => {
	new PrivacySection({
		tab,
		title: "Privacy.SavedMusic",
		inputKey: "inputPrivacyKeySavedMusic",
		captions: [
			caption,
			caption,
			caption
		],
		exceptionTexts: ["PrivacySettingsController.NeverAllow", "PrivacySettingsController.AlwaysAllow"],
		appendTo: tab.scrollable,
		managers: tab.managers
	});
});
//#endregion
export { savedMusic_default as default };
