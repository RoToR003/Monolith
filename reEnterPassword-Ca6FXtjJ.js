//# allFunctionsCalledOnLoad
import { N as onMount, p as createComponent } from "./solid-9Vxm0VIz.js";
import { t as cancelEvent } from "./cancelEvent-Cw8vYZHp.js";
import { c as insert, g as template, u as memo } from "./web-BPyQozky.js";
import { n as hotReloadGuard } from "./hotReloadGuardProvider-CHEsZRuG.js";
import { t as Button } from "./buttonTsx-Bwphkm9r.js";
import { n as InputState } from "./inputField-CaCo30N0.js";
import { t as PasswordInputField } from "./passwordInputField-QceorkLx.js";
import { i as usePromiseCollector } from "./mediaHeader-CnpQNwOl.js";
import { a as Section } from "./emailVerification-C8QYZSyu.js";
import { n as useSuperTab } from "./superTabProvider-LtveyH7W.js";
import { t as TrackingMonkey } from "./tracking-FB0DWOAE.js";
//#region src/components/sidebarLeft/tabs/2fa/reEnterPassword.tsx
var _tmpl$ = /*#__PURE__*/ template(`<div class=input-wrapper>`);
var TwoStepVerificationReEnterPassword = () => {
	const [tab] = useSuperTab();
	const promiseCollector = usePromiseCollector();
	const { state, plainPassword, newPassword } = tab.payload;
	const passwordInputField = new PasswordInputField({
		name: "re-enter-password",
		label: "PleaseReEnterPassword"
	});
	const monkey = new TrackingMonkey(passwordInputField, 157);
	const verifyInput = () => {
		if (newPassword !== passwordInputField.value) {
			passwordInputField.setError();
			return false;
		}
		return true;
	};
	const onContinueClick = (e) => {
		if (e) cancelEvent(e);
		if (!verifyInput()) return;
		tab.slider.createTab(hotReloadGuard.tabs.AppTwoStepVerificationHintTab).open({
			state,
			plainPassword,
			newPassword
		});
	};
	onMount(() => {
		tab.container.classList.add("two-step-verification", "two-step-verification-enter-password", "two-step-verification-re-enter-password");
		passwordInputField.input.addEventListener("keypress", (e) => {
			if (passwordInputField.input.classList.contains("error")) passwordInputField.setState(InputState.Neutral);
			if (e.key === "Enter") return onContinueClick();
		});
	});
	tab._onOpenAfterTimeout = () => {
		passwordInputField.input.focus();
	};
	promiseCollector.collect(monkey.load());
	return createComponent(Section, {
		noDelimiter: true,
		get children() {
			return [memo(() => monkey.container), (() => {
				var _el$ = _tmpl$();
				insert(_el$, () => passwordInputField.container, null);
				insert(_el$, createComponent(Button, {
					primaryFilled: true,
					text: "Continue",
					onClick: onContinueClick
				}), null);
				return _el$;
			})()];
		}
	});
};
//#endregion
export { TwoStepVerificationReEnterPassword as default };
