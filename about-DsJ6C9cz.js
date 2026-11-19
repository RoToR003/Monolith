//# allFunctionsCalledOnLoad
import { t as privacyTab } from "./privacyTab-CLQUZDNg.js";
import { t as PrivacySection } from "./privacySection-B6r4C4NK.js";
//#region src/components/sidebarLeft/tabs/privacy/about.tsx
var caption = "Privacy.BioCaption";
var about_default = privacyTab("privacy-about", (tab) => {
	new PrivacySection({
		tab,
		title: "Privacy.Bio",
		inputKey: "inputPrivacyKeyAbout",
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
export { about_default as default };
