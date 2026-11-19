//# allFunctionsCalledOnLoad
import { t as privacyTab } from "./privacyTab-CLQUZDNg.js";
import { t as PrivacySection } from "./privacySection-B6r4C4NK.js";
//#region src/components/sidebarLeft/tabs/privacy/calls.tsx
var callCaption = "PrivacySettingsController.PhoneCallDescription";
var p2pCaption = "PrivacySettingsController.P2p.Desc";
var calls_default = privacyTab("privacy-calls", (tab) => {
	new PrivacySection({
		tab,
		title: "WhoCanCallMe",
		inputKey: "inputPrivacyKeyPhoneCall",
		captions: [
			callCaption,
			callCaption,
			callCaption
		],
		exceptionTexts: ["PrivacySettingsController.NeverAllow", "PrivacySettingsController.AlwaysAllow"],
		appendTo: tab.scrollable,
		managers: tab.managers
	});
	new PrivacySection({
		tab,
		title: "PrivacyP2PHeader",
		inputKey: "inputPrivacyKeyPhoneP2P",
		captions: [
			p2pCaption,
			p2pCaption,
			p2pCaption
		],
		exceptionTexts: ["PrivacySettingsController.NeverAllow", "PrivacySettingsController.AlwaysAllow"],
		appendTo: tab.scrollable,
		managers: tab.managers
	});
});
//#endregion
export { calls_default as default };
