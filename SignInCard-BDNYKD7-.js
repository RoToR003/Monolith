//# allFunctionsCalledOnLoad
import { t as IS_TOUCH_SUPPORTED } from "./touchSupport-B2RWO3zD.js";
import { U as AccountController } from "./objectUrlUtils-5x08MNuO.js";
import { a as i18n, u as langPack_default } from "./langPack-BmdJGr44.js";
import { t as commonStateStorage } from "./commonStateStorage-CW-poHCa.js";
import { C as createSignal, M as onCleanup, N as onMount, p as createComponent, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { t as cancelEvent } from "./cancelEvent-Cw8vYZHp.js";
import { c as insert, f as setAttribute, g as template, o as className, u as memo } from "./web-BPyQozky.js";
import { t as Button } from "./buttonTsx-Bwphkm9r.js";
import { t as placeCaretAtEnd } from "./placeCaretAtEnd-BtAUyd5U.js";
import { t as replaceContent } from "./replaceContent-Bi6ru3li.js";
import { l as formatDuration, r as wrapFormattedDuration } from "./wrapDuration-BQgz9hDF.js";
import { t as MediaHeader } from "./mediaHeader-CnpQNwOl.js";
import { n as CountryInputField, t as TelInputField } from "./telInputField-CGJ5qn0G.js";
import { t as focusWhenSettled } from "./focusWhenSettled-C7GmSekj.js";
import { n as preloadTrackingMonkey } from "./tracking-FB0DWOAE.js";
import { t as getFloodWaitTime } from "./getFloodWaitTime-CA7439If.js";
import { n as useAuthFlow, t as authFlow_module_default } from "./mountAuthFlow-D-_L6zCe.js";
import { t as AuthCard } from "./AuthCard-CS3Ku-Aa.js";
import { t as AuthCardError } from "./AuthCardError-C9ELtFaQ.js";
import { t as continueLogin } from "./continueLogin-bBDNivsU.js";
import { n as LanguageChangeButton, t as PasskeyLoginButton } from "./passkeyLoginButton-Dsavc3pG.js";
//#region src/pages/cards/SignInCard.tsx
var _tmpl$ = /*#__PURE__*/ template(`<svg xmlns=http://www.w3.org/2000/svg class=preloader-circular viewBox="25 25 50 50"><circle class=preloader-path cx=50 cy=50 r=20 fill=none stroke-miterlimit=10>`);
var _tmpl$2 = /*#__PURE__*/ template(`<div class=input-wrapper><div>`);
var _tmpl$3 = /*#__PURE__*/ template(`<svg xmlns=http://www.w3.org/2000/svg viewBox="0 0 160 160"><use href=#logo>`);
/**
* Card variant of `pageSignIn`. Country picker + tel input → `auth.sendCode` →
* branches to authCode (default), pageIm (rare authorization-on-send case),
* password (passkey path). Also exposes a QR-login button and the passkey
* button. On mount kicks off `tryAgain()` — a DC pre-warming cascade — that's
* cancelled on unmount via a local `cancelled` flag.
*/
function SignInCard(_props) {
	const { accountNumber, managers, navigate, toIm } = useAuthFlow();
	let cancelled = false;
	const [submitting, setSubmitting] = createSignal(false);
	const [hasValidInput, setHasValidInput] = createSignal(false);
	const [nextContent, setNextContent] = createSignal(i18n("Login.Next"));
	const [floodError, setFloodError] = createSignal();
	let lastCountrySelected;
	let lastCountryCodeSelected;
	let overriding = false;
	const countryInputField = new CountryInputField({ onCountryChange: (country, code) => {
		lastCountrySelected = country;
		lastCountryCodeSelected = code;
		if (!code || overriding) return;
		telInputField.value = telInputField.lastValue = "+" + code.country_code;
		setTimeout(() => {
			telEl.focus();
			placeCaretAtEnd(telEl, true);
		}, 0);
	} });
	const telInputField = new TelInputField({ onInput: (formatted) => {
		preloadTrackingMonkey();
		const { country, code } = formatted || {};
		const countryName = country ? country.name || country.default_name : "";
		if (countryName !== countryInputField.value && (!lastCountrySelected || !country || !code || lastCountrySelected !== country && lastCountryCodeSelected.country_code !== code.country_code)) {
			overriding = true;
			countryInputField.override(country, code, countryName);
			overriding = false;
		}
		setHasValidInput(!!(country || telInputField.value.length - 1 > 1));
		setFloodError();
	} });
	const telEl = telInputField.input;
	telEl.setAttribute("role", "textbox");
	telEl.setAttribute("aria-multiline", "false");
	telEl.addEventListener("keypress", (e) => {
		if (hasValidInput() && !submitting() && e.key === "Enter") return onSubmit();
	});
	function onSubmit(e) {
		if (e) cancelEvent(e);
		setSubmitting(true);
		setFloodError();
		setNextContent([memo(() => i18n("PleaseWait")), _tmpl$()]);
		const phone_number = telInputField.value;
		const stickerLoaded = preloadTrackingMonkey();
		managers.appAccountManager.sendCode(phone_number).then(async (code) => {
			await stickerLoaded;
			return continueLogin(code, {
				managers,
				navigate,
				toIm,
				phone_number
			});
		}).catch((err) => {
			setSubmitting(false);
			switch (err.type) {
				case "PHONE_NUMBER_INVALID":
					telInputField.setError();
					replaceContent(telInputField.label, i18n("Login.PhoneLabelInvalid"));
					telEl.classList.add("error");
					setNextContent(i18n("Login.Next"));
					break;
				default: {
					console.error("auth.sendCode error:", err);
					const floodWait = getFloodWaitTime(err);
					if (floodWait.hasWaitTime) {
						telInputField.setError();
						setFloodError(i18n("Login.Code.TooManyAttempts", [wrapFormattedDuration(formatDuration(floodWait.waitTime))]));
						setNextContent(i18n("Login.Next"));
					} else setNextContent(err.type);
					break;
				}
			}
		});
	}
	function tryAgain() {
		managers.apiManager.getNearestDc().then((nearestDcResult) => {
			if (cancelled) return nearestDcResult;
			const langPack = commonStateStorage.getFromCache("langPack");
			if (langPack && !langPack.countries?.hash) langPack_default.getLangPackAndApply(langPack.lang_code).then(() => {
				if (!cancelled) telInputField.simulateInputEvent();
			});
			const dcs = /* @__PURE__ */ new Set([
				1,
				2,
				3,
				4,
				5
			]);
			const done = [nearestDcResult.this_dc];
			let promise;
			if (nearestDcResult.nearest_dc !== nearestDcResult.this_dc) promise = managers.apiManager.getNetworkerVoid(nearestDcResult.nearest_dc).then(() => {
				done.push(nearestDcResult.nearest_dc);
			});
			(promise || Promise.resolve()).then(() => {
				if (cancelled) return;
				done.forEach((dcId) => dcs.delete(dcId));
				const _dcs = [...dcs];
				const g = async () => {
					if (cancelled) return;
					const dcId = _dcs.shift();
					if (!dcId) return;
					if ((await AccountController.get(accountNumber))[`dc${dcId}_auth_key`]) return g();
					setTimeout(() => {
						if (cancelled) return;
						managers.apiManager.getNetworkerVoid(dcId).finally(g);
					}, 3e3);
				};
				g();
			});
			return nearestDcResult;
		}).then((nearestDcResult) => {
			if (cancelled) return;
			if (!countryInputField.value.length && !telInputField.value.length) countryInputField.selectCountryByIso2(nearestDcResult.country);
		});
	}
	let cancelFocus;
	onMount(() => {
		managers.appStateManager.pushToState("authState", { _: "authStateSignIn" });
		if (!IS_TOUCH_SUPPORTED) cancelFocus = focusWhenSettled(telEl, () => !cancelled);
		tryAgain();
	});
	onCleanup(() => {
		cancelled = true;
		cancelFocus?.();
	});
	return createComponent(AuthCard, {
		get header() {
			return createComponent(MediaHeader, { get children() {
				return [
					createComponent(MediaHeader.Sticker, {
						get ["class"]() {
							return authFlow_module_default.logoContainer;
						},
						size: 120,
						get element() {
							return (() => {
								var _el$4 = _tmpl$3();
								createRenderEffect(() => setAttribute(_el$4, "class", authFlow_module_default.logo));
								return _el$4;
							})();
						}
					}),
					createComponent(MediaHeader.Title, {
						tag: "h1",
						get children() {
							return i18n("Login.Title");
						}
					}),
					createComponent(MediaHeader.Subtitle, {
						"class": "secondary",
						get children() {
							return i18n("Login.StartText");
						}
					})
				];
			} });
		},
		inputWrapper: false,
		get children() {
			return [
				(() => {
					var _el$2 = _tmpl$2(), _el$3 = _el$2.firstChild;
					insert(_el$2, () => countryInputField.container, _el$3);
					insert(_el$3, () => telInputField.container, null);
					insert(_el$3, createComponent(AuthCardError, {
						get content() {
							return floodError();
						},
						describes: telEl
					}), null);
					insert(_el$2, createComponent(Button, {
						"class": "btn-primary btn-color-primary",
						get disabled() {
							return !hasValidInput() || submitting();
						},
						onClick: onSubmit,
						get children() {
							return nextContent();
						}
					}), null);
					insert(_el$2, accountNumber === 1 && createComponent(LanguageChangeButton, {}), null);
					createRenderEffect(() => className(_el$3, authFlow_module_default.fieldWithError));
					return _el$2;
				})(),
				createComponent(Button, {
					"class": "btn-primary btn-secondary btn-primary-transparent primary",
					get disabled() {
						return submitting();
					},
					onClick: () => navigate({ name: "signQR" }),
					text: "Login.QR.Login"
				}),
				createComponent(PasskeyLoginButton, { get disabled() {
					return submitting();
				} })
			];
		}
	});
}
//#endregion
export { SignInCard as default };
