//# allFunctionsCalledOnLoad
import { t as privacyTab } from "./privacyTab-CLQUZDNg.js";
import { t as PrivacySection } from "./privacySection-B6r4C4NK.js";
//#region src/components/sidebarLeft/tabs/privacy/forwardMessages.tsx
var caption = "PrivacySettingsController.Forwards.CustomHelp";
var forwardMessages_default = privacyTab("privacy-forward-messages", (tab) => {
	new PrivacySection({
		tab,
		title: "PrivacyForwardsTitle",
		inputKey: "inputPrivacyKeyForwards",
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
export { forwardMessages_default as default };
