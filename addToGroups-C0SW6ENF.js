//# allFunctionsCalledOnLoad
import { t as privacyTab } from "./privacyTab-CLQUZDNg.js";
import { t as PrivacySection } from "./privacySection-B6r4C4NK.js";
//#region src/components/sidebarLeft/tabs/privacy/addToGroups.tsx
var caption = "PrivacySettingsController.GroupDescription";
var addToGroups_default = privacyTab("privacy-add-to-groups", (tab) => {
	new PrivacySection({
		tab,
		title: "WhoCanAddMe",
		inputKey: "inputPrivacyKeyChatInvite",
		captions: [
			caption,
			caption,
			caption
		],
		exceptionTexts: ["PrivacySettingsController.NeverAllow", "PrivacySettingsController.AlwaysAllow"],
		appendTo: tab.scrollable,
		managers: tab.managers,
		allowPremium: true
	});
});
//#endregion
export { addToGroups_default as default };
