//# allFunctionsCalledOnLoad
import { a as i18n } from "./langPack-BmdJGr44.js";
import { N as onMount } from "./solid-9Vxm0VIz.js";
import { C as PrivacyType } from "./getChatMigratedTo-ChhMNXuu.js";
import { i as usePromiseCollector } from "./mediaHeader-CnpQNwOl.js";
import { n as useSuperTab } from "./superTabProvider-LtveyH7W.js";
import { t as PrivacySection } from "./privacySection-B6r4C4NK.js";
import { t as anchorCopy } from "./anchorCopy-CgThumwt.js";
//#region src/components/sidebarLeft/tabs/privacy/phoneNumber.tsx
var PrivacyPhoneNumber = () => {
	const [tab] = useSuperTab();
	const promiseCollector = usePromiseCollector();
	onMount(() => {
		tab.container.classList.add("privacy-tab", "privacy-phone-number");
	});
	promiseCollector.collect((async () => {
		const formatted = "+" + (await tab.managers.appUsersManager.getSelf()).phone;
		const captionEl = document.createElement("div");
		captionEl.append(i18n("PrivacyPhoneInfo"), document.createElement("br"), document.createElement("br"), i18n("PrivacyPhoneInfo4"), document.createElement("br"), anchorCopy({ mePath: formatted }));
		let phoneType;
		const phoneSection = new PrivacySection({
			tab,
			title: "PrivacyPhoneTitle",
			inputKey: "inputPrivacyKeyPhoneNumber",
			captions: [
				captionEl,
				captionEl,
				""
			],
			exceptionTexts: ["PrivacySettingsController.NeverShare", "PrivacySettingsController.AlwaysShare"],
			appendTo: tab.scrollable,
			onRadioChange: (type) => {
				if (phoneType !== void 0 && type !== phoneType) s.setRadio(PrivacyType.Everybody);
				phoneType = type;
				s.radioSection.container.classList.toggle("hide", type !== PrivacyType.Nobody);
			},
			managers: tab.managers
		});
		const sCaption = "PrivacyPhoneInfo3";
		const s = new PrivacySection({
			tab,
			title: "PrivacyPhoneTitle2",
			inputKey: "inputPrivacyKeyAddedByPhone",
			captions: [
				sCaption,
				sCaption,
				""
			],
			noExceptions: true,
			skipTypes: [PrivacyType.Nobody],
			managers: tab.managers
		});
		tab.scrollable.container.insertBefore(s.radioSection.container, phoneSection.radioSection.container.nextSibling);
	})());
	return null;
};
//#endregion
export { PrivacyPhoneNumber as default };
