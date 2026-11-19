//# allFunctionsCalledOnLoad
import { a as i18n, p as setDirection } from "./langPack-BmdJGr44.js";
import { C as createSignal, M as onCleanup, N as onMount, p as createComponent } from "./solid-9Vxm0VIz.js";
import { t as cancelEvent } from "./cancelEvent-Cw8vYZHp.js";
import { g as template, u as memo } from "./web-BPyQozky.js";
import { n as mediaSizes } from "./mediaSizes-C1MTaleW.js";
import { t as Button } from "./buttonTsx-Bwphkm9r.js";
import { t as replaceContent } from "./replaceContent-Bi6ru3li.js";
import { t as PasswordInputField } from "./passwordInputField-QceorkLx.js";
import { t as PasswordMonkey } from "./password-CY8CwFDA.js";
import { n as wrapEmojiText } from "./wrapEmojiText-DT39R5Tj.js";
import { t as htmlToSpan } from "./htmlToSpan-D_IqA3Cl.js";
import { l as formatDuration, r as wrapFormattedDuration } from "./wrapDuration-BQgz9hDF.js";
import { t as MediaHeader } from "./mediaHeader-CnpQNwOl.js";
import { t as anchorCallback } from "./anchorCallback-BbwAJdBk.js";
import { r as toastNew } from "./toast-B6VD5M7R.js";
import { t as focusWhenSettled } from "./focusWhenSettled-C7GmSekj.js";
import { n as useAuthFlow, t as authFlow_module_default } from "./mountAuthFlow-D-_L6zCe.js";
import { n as simpleConfirmation, t as whenDetached } from "./whenDetached-Da0StEoY.js";
import { t as AuthCard } from "./AuthCard-CS3Ku-Aa.js";
//#region src/pages/cards/PasswordCard.tsx
var _tmpl$ = /*#__PURE__*/ template(`<svg xmlns=http://www.w3.org/2000/svg class=preloader-circular viewBox="25 25 50 50"><circle class=preloader-path cx=50 cy=50 r=20 fill=none stroke-miterlimit=10>`);
/**
* Card variant of `pagePassword`. Single password input over a `PasswordMonkey`
* animation, with a "forgot password" link that leads to `emailRecover` (or to
* full account reset if recovery isn't available).
*/
function PasswordCard(_props) {
	const { managers, navigate, toIm, isLeaving } = useAuthFlow();
	let monkey;
	const monkeyContainer = document.createElement("div");
	const monkeySize = mediaSizes.isMobile ? 100 : 130;
	let getStateInterval;
	let state;
	let resetLoading = false;
	let gone = false;
	const isGone = () => gone || isLeaving();
	const [submitting, setSubmitting] = createSignal(false);
	const [nextKey, setNextKey] = createSignal("Login.Next");
	const passwordInputField = new PasswordInputField({
		label: "LoginPassword",
		name: "password"
	});
	const passwordInput = passwordInputField.input;
	const resetLink = i18n("ForgotPassword", [anchorCallback(() => {
		if (resetLoading) return;
		resetLoading = true;
		managers.passwordManager.requestRecovery().then((res) => {
			navigate({
				name: "emailRecover",
				payload: { email_pattern: res.email_pattern }
			});
		}).catch(async (err) => {
			if (isGone()) return;
			if (err.type === "PASSWORD_RECOVERY_NA") {
				await simpleConfirmation({
					titleLangKey: "Login.ResetPassword.Title",
					descriptionLangKey: "Login.ResetPassword.NoEmailText",
					button: {
						langKey: "Login.ResetPassword.ResetAccount",
						isDanger: true
					}
				});
				await simpleConfirmation({
					titleLangKey: "Login.ResetAccount.Title",
					descriptionLangKey: "Login.ResetAccount.Text",
					button: {
						langKey: "Login.ResetPassword.ResetAccount",
						isDanger: true
					}
				});
				await managers.appAccountManager.deleteAccount("Forgot password").then(() => {
					navigate({ name: "signIn" });
				}).catch((err) => {
					if (err.type === "2FA_RECENT_CONFIRM") simpleConfirmation({
						titleLangKey: "Login.ResetAccountFail.Title",
						descriptionLangKey: "Login.ResetAccountFail.TextCancelled",
						button: { langKey: "OK" }
					});
					else if (err.type.startsWith("2FA_CONFIRM_WAIT_")) {
						const waitTime = +err.type.replace("2FA_CONFIRM_WAIT_", "");
						simpleConfirmation({
							titleLangKey: "Login.ResetAccountFail.Title",
							descriptionLangKey: "Login.ResetAccountFail.TextWait",
							descriptionArgs: [wrapFormattedDuration(formatDuration(waitTime))],
							button: { langKey: "OK" }
						});
					} else {
						console.error(err);
						toastNew({ langPackKey: "Error.AnError" });
					}
				});
				return;
			}
			toastNew({ langPackKey: "Error.AnError" });
		}).finally(() => {
			resetLoading = false;
		});
	})]);
	resetLink.classList.add(authFlow_module_default.forgotLink);
	function getState() {
		if (isGone()) return;
		if (!getStateInterval) getStateInterval = window.setInterval(getState, 1e4);
		return managers.passwordManager.getState().then((_state) => {
			state = _state;
			if (state.hint) {
				const hint = htmlToSpan(wrapEmojiText(state.hint));
				setDirection(hint);
				replaceContent(passwordInputField.label, hint);
			} else passwordInputField.setLabel();
		});
	}
	function onSubmit(e) {
		if (e) cancelEvent(e);
		if (!passwordInput.value.length) {
			passwordInput.classList.add("error");
			return;
		}
		setSubmitting(true);
		passwordInput.disabled = true;
		setNextKey("PleaseWait");
		const value = passwordInput.value;
		passwordInputField.setValueSilently("" + Math.random());
		passwordInputField.setValueSilently(value);
		managers.passwordManager.check(value, state).then((response) => {
			switch (response._) {
				case "auth.authorization":
					if (getStateInterval) {
						clearInterval(getStateInterval);
						getStateInterval = void 0;
					}
					toIm();
					break;
				default:
					setSubmitting(false);
					passwordInput.disabled = false;
					setNextKey(response._);
			}
		}).catch((err) => {
			if (isGone()) return;
			setSubmitting(false);
			passwordInput.disabled = false;
			passwordInputField.input.classList.add("error");
			switch (err.type) {
				default:
					setNextKey("PASSWORD_HASH_INVALID");
					passwordInput.select();
			}
			getState();
		});
	}
	passwordInput.addEventListener("keypress", function(e) {
		this.classList.remove("error");
		setNextKey("Login.Next");
		if (e.key === "Enter") return onSubmit();
	});
	let cancelFocus;
	onMount(() => {
		managers.appStateManager.pushToState("authState", { _: "authStatePassword" });
		monkey = new PasswordMonkey(passwordInputField, monkeySize);
		monkeyContainer.append(monkey.container);
		monkey.load();
		getState();
		cancelFocus = focusWhenSettled(passwordInput);
	});
	onCleanup(() => {
		gone = true;
		cancelFocus?.();
		if (getStateInterval) {
			clearInterval(getStateInterval);
			getStateInterval = void 0;
		}
		const leaving = monkey;
		monkey = void 0;
		whenDetached(monkeyContainer.closest("." + authFlow_module_default.card), () => leaving?.remove());
	});
	return createComponent(AuthCard, {
		get ["class"]() {
			return authFlow_module_default.pagePassword;
		},
		get header() {
			return createComponent(MediaHeader, { get children() {
				return [
					createComponent(MediaHeader.Sticker, {
						element: monkeyContainer,
						size: monkeySize
					}),
					createComponent(MediaHeader.Title, {
						tag: "h1",
						get children() {
							return i18n("Login.Password.Title");
						}
					}),
					createComponent(MediaHeader.Subtitle, { get children() {
						return i18n("Login.Password.Subtitle");
					} })
				];
			} });
		},
		get children() {
			return [
				memo(() => passwordInputField.container),
				resetLink,
				createComponent(Button, {
					"class": "btn-primary btn-color-primary",
					get disabled() {
						return submitting();
					},
					onClick: onSubmit,
					get children() {
						return [memo(() => i18n(nextKey())), memo(() => memo(() => !!submitting())() && _tmpl$())];
					}
				})
			];
		}
	});
}
//#endregion
export { PasswordCard as default };
