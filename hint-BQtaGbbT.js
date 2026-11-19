//# allFunctionsCalledOnLoad
import { N as onMount, p as createComponent } from "./solid-9Vxm0VIz.js";
import { t as cancelEvent } from "./cancelEvent-Cw8vYZHp.js";
import { c as insert, g as template } from "./web-BPyQozky.js";
import { n as hotReloadGuard } from "./hotReloadGuardProvider-CHEsZRuG.js";
import { t as Button } from "./buttonTsx-Bwphkm9r.js";
import { t as InputFieldTsx } from "./inputFieldTsx-0SbEFdGE.js";
import { a as Section } from "./emailVerification-C8QYZSyu.js";
import { r as toastNew } from "./toast-B6VD5M7R.js";
import { n as useSuperTab } from "./superTabProvider-LtveyH7W.js";
import { t as wrapStickerEmoji } from "./stickerEmoji-Ccji1LLa.js";
//#region src/components/sidebarLeft/tabs/2fa/hint.tsx
var _tmpl$ = /*#__PURE__*/ template(`<div class=input-wrapper>`);
var TwoStepVerificationHint = () => {
	const [tab] = useSuperTab();
	const { state, plainPassword, newPassword } = tab.payload;
	let inputField;
	const stickerContainer = document.createElement("div");
	wrapStickerEmoji({
		div: stickerContainer,
		width: 160,
		height: 160,
		emoji: "💡"
	});
	const goNext = (e, saveHint) => {
		if (e) cancelEvent(e);
		const hint = saveHint ? inputField.value : void 0;
		if (hint && newPassword === hint) {
			toastNew({ langPackKey: "PasswordAsHintError" });
			return;
		}
		tab.slider.createTab(hotReloadGuard.tabs.AppTwoStepVerificationEmailTab).open({
			state,
			plainPassword,
			newPassword,
			hint,
			justSetPasssword: true
		});
	};
	const onContinueClick = (e) => goNext(e, true);
	const onSkipClick = (e) => goNext(e, false);
	onMount(() => {
		tab.container.classList.add("two-step-verification", "two-step-verification-hint");
		inputField.input.addEventListener("keypress", (e) => {
			if (e.key === "Enter") {
				cancelEvent(e);
				return inputField.value ? onContinueClick() : onSkipClick();
			}
		});
	});
	tab._onOpenAfterTimeout = () => {
		inputField.input.focus();
	};
	return createComponent(Section, {
		noDelimiter: true,
		get children() {
			return [stickerContainer, (() => {
				var _el$ = _tmpl$();
				insert(_el$, createComponent(InputFieldTsx, {
					name: "hint",
					label: "TwoStepAuth.SetupHintPlaceholder",
					instanceRef: (ref) => inputField = ref
				}), null);
				insert(_el$, createComponent(Button, {
					primaryFilled: true,
					text: "Continue",
					onClick: onContinueClick
				}), null);
				insert(_el$, createComponent(Button, {
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
export { TwoStepVerificationHint as default };
