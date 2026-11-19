//# allFunctionsCalledOnLoad
import { N as onMount, p as createComponent } from "./solid-9Vxm0VIz.js";
import { c as insert, g as template } from "./web-BPyQozky.js";
import { n as hotReloadGuard } from "./hotReloadGuardProvider-CHEsZRuG.js";
import { t as Button } from "./buttonTsx-Bwphkm9r.js";
import { a as Section } from "./emailVerification-C8QYZSyu.js";
import { n as useSuperTab } from "./superTabProvider-LtveyH7W.js";
import { t as wrapStickerEmoji } from "./stickerEmoji-Ccji1LLa.js";
//#region src/components/sidebarLeft/tabs/2fa/passwordSet.tsx
var _tmpl$ = /*#__PURE__*/ template(`<div class=input-wrapper>`);
var TwoStepVerificationSet = () => {
	const [tab] = useSuperTab();
	const { messageFor } = tab.payload;
	const stickerContainer = document.createElement("div");
	wrapStickerEmoji({
		emoji: "🥳",
		div: stickerContainer,
		width: 160,
		height: 160
	});
	onMount(() => {
		tab.container.classList.add("two-step-verification", "two-step-verification-set");
		tab.slider.sliceTabsUntilTab(hotReloadGuard.tabs.AppSettingsTab, tab);
	});
	return createComponent(Section, {
		caption: messageFor === "password" ? "TwoStepVerificationPasswordSetInfo" : "TwoStepVerificationEmailSetInfo",
		captionOld: true,
		noDelimiter: true,
		get children() {
			return [stickerContainer, (() => {
				var _el$ = _tmpl$();
				insert(_el$, createComponent(Button, {
					primaryFilled: true,
					text: "TwoStepVerificationPasswordReturnSettings",
					onClick: () => tab.close()
				}));
				return _el$;
			})()];
		}
	});
};
//#endregion
export { TwoStepVerificationSet as default };
