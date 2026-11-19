//# allFunctionsCalledOnLoad
import { a as i18n } from "./langPack-BmdJGr44.js";
import { N as onMount, p as createComponent, s as Show } from "./solid-9Vxm0VIz.js";
import { _ as use, c as insert, g as template } from "./web-BPyQozky.js";
import { r as useHotReloadGuard } from "./hotReloadGuard-BUNVkeQ4.js";
import { n as hotReloadGuard } from "./hotReloadGuardProvider-CHEsZRuG.js";
import { t as Button } from "./buttonTsx-Bwphkm9r.js";
import { n as putPreloader } from "./putPreloader-Bxq7N1RV.js";
import { t as replaceContent } from "./replaceContent-Bi6ru3li.js";
import { a as Section } from "./emailVerification-C8QYZSyu.js";
import { r as toastNew } from "./toast-B6VD5M7R.js";
import { t as toggleDisability } from "./toggleDisability-2oUcKWqw.js";
import { n as useSuperTab } from "./superTabProvider-LtveyH7W.js";
import { n as CodeInputFieldCompat } from "./codeInputField-CuXF8PSB.js";
import { t as canFocus } from "./canFocus-CUva3cbc.js";
import { t as ForgotPasswordLink } from "./forgotPasswordLink-BYI8z54w.js";
//#region src/components/sidebarLeft/tabs/2fa/emailConfirmation.tsx
var _tmpl$ = /*#__PURE__*/ template(`<div class=input-wrapper><div class="error-label hidden">`);
var TwoStepVerificationEmailConfirmation = () => {
	const [tab] = useSuperTab();
	const { lottieLoader } = useHotReloadGuard();
	const { state, email, length } = tab.payload;
	const isFirst = tab.payload.isFirst ?? false;
	const forPasswordReset = tab.payload.forPasswordReset ?? false;
	const justSetPasssword = tab.payload.justSetPasssword ?? false;
	let errorLabel;
	let btnChange;
	let btnResend;
	const stickerContainer = document.createElement("div");
	stickerContainer.classList.add("media-sticker-wrapper");
	lottieLoader.loadAnimationAsAsset({
		container: stickerContainer,
		width: 160,
		height: 160,
		loop: false,
		autoplay: true
	}, "Mailbox");
	const goNext = () => {
		if (forPasswordReset) {
			toastNew({ langPackKey: "PasswordDeactivated" });
			tab.slider.sliceTabsUntilTab(hotReloadGuard.tabs.AppSettingsTab, tab);
			tab.close();
		} else tab.slider.createTab(hotReloadGuard.tabs.AppTwoStepVerificationSetTab).open({ messageFor: justSetPasssword ? "password" : "email" });
	};
	const freeze = (disable) => {
		toggleDisability([btnChange, btnResend].filter(Boolean), disable);
		codeInputField.disabled = disable;
	};
	const codeInputField = new CodeInputFieldCompat({
		length,
		label: "AccDescr.EmailCode",
		onChange: (code) => {
			codeInputField.error = false;
			errorLabel.classList.add("hidden");
		},
		onFill: (code) => {
			freeze(true);
			(forPasswordReset ? tab.managers.passwordManager.confirmPasswordResetEmail("" + code) : tab.managers.passwordManager.confirmPasswordEmail("" + code)).then((value) => {
				goNext();
			}).catch((err) => {
				switch (err.type) {
					case "CODE_INVALID":
						codeInputField.error = true;
						codeInputField.value = "";
						errorLabel.classList.remove("hidden");
						replaceContent(errorLabel, i18n("TwoStepAuth.RecoveryCodeInvalid"));
						break;
					case "EMAIL_HASH_EXPIRED":
						codeInputField.error = true;
						codeInputField.value = "";
						errorLabel.classList.remove("hidden");
						replaceContent(errorLabel, i18n("TwoStepAuth.RecoveryCodeExpired"));
						break;
					default: console.error("confirm error", err);
				}
				freeze(false);
			});
		}
	});
	const resetLink = forPasswordReset ? new ForgotPasswordLink({
		state,
		managers: tab.managers,
		tab,
		allowReset: true,
		forEmail: true
	}) : void 0;
	const onChangeClick = () => {
		freeze(true);
		tab.managers.passwordManager.cancelPasswordEmail().then((value) => {
			tab.slider.sliceTabsUntilTab(hotReloadGuard.tabs.AppTwoStepVerificationEmailTab, tab);
			tab.close();
		}, () => {
			freeze(false);
		});
	};
	const onResendClick = () => {
		freeze(true);
		const d = putPreloader(btnResend);
		(forPasswordReset ? tab.managers.passwordManager.requestRecovery() : tab.managers.passwordManager.resendPasswordEmail()).catch((err) => {
			console.error(err);
			toastNew({ langPackKey: "Error.AnError" });
		}).then(() => {
			d.remove();
			freeze(false);
		});
	};
	onMount(() => {
		tab.container.classList.add("two-step-verification", "two-step-verification-email-confirmation");
	});
	tab._onOpenAfterTimeout = () => {
		if (!canFocus(isFirst)) return;
		codeInputField.input.focus();
	};
	tab._onCloseAfterTimeout = () => {
		codeInputField.cleanup();
		resetLink?.cleanup();
	};
	return createComponent(Section, {
		caption: "TwoStepAuth.ConfirmEmailCodeDesc",
		captionArgs: [email],
		captionOld: true,
		noDelimiter: true,
		get children() {
			return [stickerContainer, (() => {
				var _el$ = _tmpl$(), _el$2 = _el$.firstChild;
				insert(_el$, () => codeInputField.container, _el$2);
				var _ref$ = errorLabel;
				typeof _ref$ === "function" ? use(_ref$, _el$2) : errorLabel = _el$2;
				insert(_el$, createComponent(Show, {
					when: !forPasswordReset,
					get children() {
						return createComponent(Button, {
							ref(r$) {
								var _ref$2 = btnChange;
								typeof _ref$2 === "function" ? _ref$2(r$) : btnChange = r$;
							},
							"class": "btn-primary btn-primary-transparent primary",
							text: "TwoStepAuth.EmailCodeChangeEmail",
							onClick: onChangeClick
						});
					}
				}), null);
				insert(_el$, createComponent(Button, {
					ref(r$) {
						var _ref$3 = btnResend;
						typeof _ref$3 === "function" ? _ref$3(r$) : btnResend = r$;
					},
					"class": "btn-primary btn-secondary btn-primary-transparent primary",
					text: "ResendCode",
					onClick: onResendClick
				}), null);
				insert(_el$, () => resetLink?.container, null);
				return _el$;
			})()];
		}
	});
};
//#endregion
export { TwoStepVerificationEmailConfirmation as default };
