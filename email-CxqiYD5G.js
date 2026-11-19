//# allFunctionsCalledOnLoad
import { N as onMount, p as createComponent } from "./solid-9Vxm0VIz.js";
import { t as cancelEvent } from "./cancelEvent-Cw8vYZHp.js";
import { c as insert, g as template } from "./web-BPyQozky.js";
import { r as useHotReloadGuard } from "./hotReloadGuard-BUNVkeQ4.js";
import { n as hotReloadGuard } from "./hotReloadGuardProvider-CHEsZRuG.js";
import { t as Button } from "./buttonTsx-Bwphkm9r.js";
import { n as putPreloader } from "./putPreloader-Bxq7N1RV.js";
import { t as InputFieldTsx } from "./inputFieldTsx-0SbEFdGE.js";
import { r as showPeerPopup } from "./confirmationPopup-Bz6mK0o-.js";
import { a as Section } from "./emailVerification-C8QYZSyu.js";
import { n as useSuperTab } from "./superTabProvider-LtveyH7W.js";
import { t as matchEmail } from "./matchEmail-DTfylaPT.js";
import { t as canFocus } from "./canFocus-CUva3cbc.js";
//#region src/components/sidebarLeft/tabs/2fa/email.tsx
var _tmpl$ = /*#__PURE__*/ template(`<div class=input-wrapper>`);
var TwoStepVerificationEmail = () => {
	const [tab] = useSuperTab();
	const { lottieLoader } = useHotReloadGuard();
	const { state, plainPassword, newPassword, hint } = tab.payload;
	const isFirst = tab.payload.isFirst ?? false;
	const justSetPasssword = tab.payload.justSetPasssword ?? false;
	let inputField;
	let btnContinue;
	let btnSkip;
	const stickerContainer = document.createElement("div");
	stickerContainer.classList.add("media-sticker-wrapper");
	lottieLoader.loadAnimationAsAsset({
		container: stickerContainer,
		width: 160,
		height: 160,
		loop: false,
		autoplay: true
	}, "LoveLetter");
	const toggleButtons = (freeze) => {
		if (freeze) {
			btnContinue.setAttribute("disabled", "true");
			btnSkip.setAttribute("disabled", "true");
		} else {
			btnContinue.removeAttribute("disabled");
			btnSkip.removeAttribute("disabled");
		}
	};
	const goNext = () => {
		tab.slider.createTab(hotReloadGuard.tabs.AppTwoStepVerificationSetTab).open({ messageFor: justSetPasssword ? "password" : "email" });
	};
	const onContinueClick = () => {
		const email = inputField.value.trim();
		const match = matchEmail(email);
		if (!match || match[0].length !== email.length) {
			inputField.input.classList.add("error");
			return;
		}
		toggleButtons(true);
		const d = putPreloader(btnContinue);
		tab.managers.passwordManager.updateSettings({
			hint,
			currentPassword: plainPassword,
			newPassword,
			email
		}).then((value) => {
			goNext();
		}, (err) => {
			if (err.type.includes("EMAIL_UNCONFIRMED")) {
				const symbols = +err.type.match(/^EMAIL_UNCONFIRMED_(\d+)/)[1];
				tab.slider.createTab(hotReloadGuard.tabs.AppTwoStepVerificationEmailConfirmationTab).open({
					state,
					email,
					length: symbols,
					justSetPasssword
				});
			} else console.log("password set error", err);
			toggleButtons(false);
			d.remove();
		});
	};
	const onSkipClick = () => {
		showPeerPopup("popup-skip-email", {
			buttons: [{
				langKey: "Cancel",
				isCancel: true
			}, {
				langKey: "YourEmailSkip",
				callback: () => {
					toggleButtons(true);
					putPreloader(btnSkip);
					tab.managers.passwordManager.updateSettings({
						hint,
						currentPassword: plainPassword,
						newPassword,
						email: ""
					}).then(() => {
						goNext();
					}, (err) => {
						toggleButtons(false);
					});
				},
				isDanger: true
			}],
			titleLangKey: "YourEmailSkipWarning",
			descriptionLangKey: "YourEmailSkipWarningText"
		});
	};
	onMount(() => {
		tab.container.classList.add("two-step-verification", "two-step-verification-email");
		inputField.input.addEventListener("keypress", (e) => {
			if (e.key === "Enter") {
				cancelEvent(e);
				return onContinueClick();
			}
		});
	});
	tab._onOpenAfterTimeout = () => {
		if (!canFocus(isFirst)) return;
		inputField.input.focus();
	};
	return createComponent(Section, {
		captionOld: true,
		noDelimiter: true,
		get children() {
			return [stickerContainer, (() => {
				var _el$ = _tmpl$();
				insert(_el$, createComponent(InputFieldTsx, {
					name: "recovery-email",
					label: "RecoveryEmail",
					plainText: true,
					instanceRef: (ref) => inputField = ref,
					onRawInput: () => inputField.input.classList.remove("error")
				}), null);
				insert(_el$, createComponent(Button, {
					ref(r$) {
						var _ref$ = btnContinue;
						typeof _ref$ === "function" ? _ref$(r$) : btnContinue = r$;
					},
					primaryFilled: true,
					text: "Continue",
					onClick: onContinueClick
				}), null);
				insert(_el$, createComponent(Button, {
					ref(r$) {
						var _ref$2 = btnSkip;
						typeof _ref$2 === "function" ? _ref$2(r$) : btnSkip = r$;
					},
					"class": "btn-primary btn-secondary btn-primary-transparent primary",
					text: "YourEmailSkip",
					onClick: onSkipClick
				}), null);
				return _el$;
			})()];
		}
	});
};
//#endregion
export { TwoStepVerificationEmail as default };
