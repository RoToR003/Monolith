//# allFunctionsCalledOnLoad
import { t as privacyTab } from "./privacyTab-CLQUZDNg.js";
import { t as PrivacySection } from "./privacySection-B6r4C4NK.js";
//#region src/components/sidebarLeft/tabs/privacy/birthday.tsx
var caption = "Privacy.BirthdayCaption";
var birthday_default = privacyTab("privacy-birthday", (tab) => {
	new PrivacySection({
		tab,
		title: "Privacy.Birthday",
		inputKey: "inputPrivacyKeyBirthday",
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
export { birthday_default as default };
