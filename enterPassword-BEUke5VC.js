//# allFunctionsCalledOnLoad
import { a as i18n, m as setInnerHTML, u as langPack_default } from "./langPack-BmdJGr44.js";
import { N as onMount, p as createComponent } from "./solid-9Vxm0VIz.js";
import { t as cancelEvent } from "./cancelEvent-Cw8vYZHp.js";
import { c as insert, g as template, u as memo } from "./web-BPyQozky.js";
import { n as hotReloadGuard } from "./hotReloadGuardProvider-CHEsZRuG.js";
import { t as Button } from "./buttonTsx-Bwphkm9r.js";
import { n as putPreloader } from "./putPreloader-Bxq7N1RV.js";
import { t as replaceContent } from "./replaceContent-Bi6ru3li.js";
import { t as PasswordInputField } from "./passwordInputField-QceorkLx.js";
import { t as PasswordMonkey } from "./password-CY8CwFDA.js";
import { n as wrapEmojiText } from "./wrapEmojiText-DT39R5Tj.js";
import { i as usePromiseCollector } from "./mediaHeader-CnpQNwOl.js";
import { a as Section } from "./emailVerification-C8QYZSyu.js";
import { n as useSuperTab } from "./superTabProvider-LtveyH7W.js";
import { t as canFocus } from "./canFocus-CUva3cbc.js";
import { t as ForgotPasswordLink } from "./forgotPasswordLink-BYI8z54w.js";
//#region src/components/sidebarLeft/tabs/2fa/enterPassword.tsx
var _tmpl$ = /*#__PURE__*/ template(`<div class=input-wrapper>`);
var TwoStepVerificationEnterPassword = () => {
	const [tab] = useSuperTab();
	const promiseCollector = usePromiseCollector();
	let state = tab.payload.state;
	const plainPassword = tab.payload.plainPassword;
	const isFirst = tab.payload.isFirst ?? true;
	const isNew = !state.pFlags.has_password || plainPassword;
	const passwordInputField = new PasswordInputField({
		name: "enter-password",
		label: isNew ? "PleaseEnterFirstPassword" : state.hint ? void 0 : "LoginPassword",
		labelText: !isNew && state.hint ? wrapEmojiText(state.hint) : void 0
	});
	const monkey = new PasswordMonkey(passwordInputField, 157);
	const forgotLink = !isNew ? new ForgotPasswordLink({
		state,
		managers: tab.managers,
		tab,
		allowReset: true,
		forEmail: false
	}) : void 0;
	const textEl = new langPack_default.IntlElement({ key: "Continue" });
	const verifyInput = () => {
		if (!passwordInputField.value.length) {
			passwordInputField.input.classList.add("error");
			return false;
		}
		return true;
	};
	let onContinueClick;
	if (!isNew) {
		let getStateInterval;
		const getState = () => {
			if (!getStateInterval) getStateInterval = window.setInterval(getState, 1e4);
			return tab.managers.passwordManager.getState().then((_state) => {
				state = _state;
				if (state.hint) setInnerHTML(passwordInputField.label, wrapEmojiText(state.hint));
				else replaceContent(passwordInputField.label, i18n("LoginPassword"));
			});
		};
		const submit = (e) => {
			if (!verifyInput()) {
				cancelEvent(e);
				return;
			}
			btnContinue.setAttribute("disabled", "true");
			textEl.key = "PleaseWait";
			textEl.update();
			const preloader = putPreloader(btnContinue);
			const plainPassword = passwordInputField.value;
			tab.managers.passwordManager.check(passwordInputField.value, state).then((auth) => {
				if (auth._ === "auth.authorization") {
					clearInterval(getStateInterval);
					if (monkey) monkey.remove();
					if (!tab.slider.getHistory().includes(tab)) return;
					const screen = tab.slider.createTab(hotReloadGuard.tabs.AppTwoStepVerificationTab);
					const opening = screen.open({
						state,
						plainPassword
					});
					tab.payload.onPassed?.(opening.then(() => screen));
					tab.slider.removeTabFromHistory(tab);
				}
			}, (err) => {
				btnContinue.removeAttribute("disabled");
				passwordInputField.input.classList.add("error");
				switch (err.type) {
					default:
						textEl.key = "PASSWORD_HASH_INVALID";
						textEl.update();
						preloader.remove();
						passwordInputField.select();
				}
				getState();
			});
		};
		onContinueClick = submit;
		getState();
	} else onContinueClick = (e) => {
		if (e) cancelEvent(e);
		if (!verifyInput()) return;
		tab.slider.createTab(hotReloadGuard.tabs.AppTwoStepVerificationReEnterPasswordTab).open({
			state,
			newPassword: passwordInputField.value,
			plainPassword
		});
	};
	let btnContinue;
	onMount(() => {
		tab.container.classList.add("two-step-verification", "two-step-verification-enter-password");
		passwordInputField.input.addEventListener("keypress", (e) => {
			if (passwordInputField.input.classList.contains("error")) {
				passwordInputField.input.classList.remove("error");
				textEl.key = "Continue";
				textEl.update();
			}
			if (e.key === "Enter") return onContinueClick();
		});
	});
	tab._onOpenAfterTimeout = () => {
		if (!canFocus(isFirst)) return;
		passwordInputField.input.focus();
	};
	tab._onClose = () => {
		forgotLink?.cleanup();
	};
	promiseCollector.collect(monkey.load());
	return createComponent(Section, {
		noDelimiter: true,
		get children() {
			return [memo(() => monkey.container), (() => {
				var _el$ = _tmpl$();
				insert(_el$, () => passwordInputField.container, null);
				insert(_el$, () => forgotLink?.container, null);
				insert(_el$, createComponent(Button, {
					ref(r$) {
						var _ref$ = btnContinue;
						typeof _ref$ === "function" ? _ref$(r$) : btnContinue = r$;
					},
					primaryFilled: true,
					onClick: onContinueClick,
					get children() {
						return textEl.element;
					}
				}), null);
				return _el$;
			})()];
		}
	});
};
//#endregion
export { TwoStepVerificationEnterPassword as default };
