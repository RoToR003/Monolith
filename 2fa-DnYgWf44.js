//# allFunctionsCalledOnLoad
import { N as onMount, p as createComponent, s as Show } from "./solid-9Vxm0VIz.js";
import { c as insert, g as template } from "./web-BPyQozky.js";
import { n as hotReloadGuard } from "./hotReloadGuardProvider-CHEsZRuG.js";
import { t as Button } from "./buttonTsx-Bwphkm9r.js";
import { r as showPeerPopup } from "./confirmationPopup-Bz6mK0o-.js";
import { a as Section } from "./emailVerification-C8QYZSyu.js";
import { n as useSuperTab } from "./superTabProvider-LtveyH7W.js";
import { t as wrapStickerEmoji } from "./stickerEmoji-Ccji1LLa.js";
//#region src/components/sidebarLeft/tabs/2fa/index.tsx
var _tmpl$ = /*#__PURE__*/ template(`<div class=input-wrapper>`);
var TwoStepVerification = () => {
	const [tab] = useSuperTab();
	const { state, plainPassword } = tab.payload;
	const stickerContainer = document.createElement("div");
	wrapStickerEmoji({
		div: stickerContainer,
		width: 168,
		height: 168,
		emoji: "🔐"
	});
	onMount(() => {
		tab.container.classList.add("two-step-verification", "two-step-verification-main");
	});
	const onDisablePassword = () => {
		showPeerPopup("popup-disable-password", {
			buttons: [{
				langKey: "Disable",
				callback: () => {
					tab.managers.passwordManager.updateSettings({ currentPassword: plainPassword }).then(() => {
						tab.slider.sliceTabsUntilTab(hotReloadGuard.tabs.AppSettingsTab, tab);
						tab.close();
					});
				},
				isDanger: true
			}],
			titleLangKey: "TurnPasswordOffQuestionTitle",
			descriptionLangKey: "TurnPasswordOffQuestion"
		});
	};
	return createComponent(Section, {
		get caption() {
			return state.pFlags.has_password ? "TwoStepAuth.GenericHelp" : "TwoStepAuth.SetPasswordHelp";
		},
		captionOld: true,
		noDelimiter: true,
		get children() {
			return [stickerContainer, createComponent(Show, {
				get when() {
					return state.pFlags.has_password;
				},
				get fallback() {
					return (() => {
						var _el$ = _tmpl$();
						insert(_el$, createComponent(Button, {
							primaryFilled: true,
							text: "TwoStepVerificationSetPassword",
							onClick: () => tab.slider.createTab(hotReloadGuard.tabs.AppTwoStepVerificationEnterPasswordTab).open({ state })
						}));
						return _el$;
					})();
				},
				get children() {
					return [
						createComponent(Button, {
							"class": "btn-primary btn-transparent",
							icon: "edit",
							text: "TwoStepAuth.ChangePassword",
							onClick: () => tab.slider.createTab(hotReloadGuard.tabs.AppTwoStepVerificationEnterPasswordTab).open({
								state,
								plainPassword
							})
						}),
						createComponent(Button, {
							"class": "btn-primary btn-transparent",
							icon: "passwordoff",
							text: "TwoStepAuth.RemovePassword",
							onClick: onDisablePassword
						}),
						createComponent(Button, {
							"class": "btn-primary btn-transparent",
							icon: "email",
							get text() {
								return state.pFlags.has_recovery ? "TwoStepAuth.ChangeEmail" : "TwoStepAuth.SetupEmail";
							},
							onClick: () => tab.slider.createTab(hotReloadGuard.tabs.AppTwoStepVerificationEmailTab).open({
								state,
								hint: state.hint,
								plainPassword,
								newPassword: plainPassword,
								isFirst: true
							})
						})
					];
				}
			})];
		}
	});
};
//#endregion
export { TwoStepVerification as default };
