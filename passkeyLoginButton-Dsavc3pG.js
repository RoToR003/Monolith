//# allFunctionsCalledOnLoad
import { U as AccountController } from "./objectUrlUtils-5x08MNuO.js";
import { n as rootScope } from "./rootScope-CZS0lmz8.js";
import { u as langPack_default } from "./langPack-BmdJGr44.js";
import { C as createSignal, M as onCleanup, N as onMount, p as createComponent, s as Show } from "./solid-9Vxm0VIz.js";
import { c as insert, g as template } from "./web-BPyQozky.js";
import { t as Button } from "./buttonTsx-Bwphkm9r.js";
import { rt as loadFonts } from "./index-B7axFZql.js";
import { r as GrowHeightReveal } from "./animations-DCmLIda3.js";
import { r as toastNew } from "./toast-B6VD5M7R.js";
import { n as IS_WEB_AUTHN_SUPPORTED, t as getInputPasskeyCredential } from "./getInputPasskeyResponse-DRILbzue.js";
import { n as useAuthFlow } from "./mountAuthFlow-D-_L6zCe.js";
//#region src/components/languageChangeButton.tsx
var _tmpl$ = /*#__PURE__*/ template(`<span dir=auto>`);
var _tmpl$2 = /*#__PURE__*/ template(`<svg xmlns=http://www.w3.org/2000/svg class=preloader-circular viewBox="25 25 50 50"><circle class=preloader-path cx=50 cy=50 r=20 fill=none stroke-miterlimit=10>`);
var KEY = "Login.ContinueOnLanguage";
var cachedPromise;
var appliedAlready = false;
function getLang() {
	return cachedPromise || (cachedPromise = rootScope.managers.apiManager.getConfig().then(async (config) => {
		if (config.suggested_lang_code === langPack_default.getLastRequestedLangCode()) return;
		const [strings] = await Promise.all([langPack_default.getStrings(config.suggested_lang_code, [KEY]), langPack_default.getCacheLangPackAndApply()]);
		return {
			config,
			strings
		};
	}));
}
function formatSuggestedText(strings) {
	const backup = [];
	strings.forEach((string) => {
		const backupString = langPack_default.strings.get(string.key);
		if (!backupString) return;
		backup.push(backupString);
		langPack_default.strings.set(string.key, string);
	});
	const text = langPack_default.format(KEY, true);
	backup.forEach((string) => langPack_default.strings.set(string.key, string));
	return text;
}
function LanguageChangeButton() {
	const [visible, setVisible] = createSignal(false);
	const [submitting, setSubmitting] = createSignal(false);
	const [content, setContent] = createSignal("");
	let suggestedLangCode;
	const onLanguageApply = () => setVisible(false);
	rootScope.addEventListener("language_apply", onLanguageApply, { once: true });
	onCleanup(() => rootScope.removeEventListener("language_apply", onLanguageApply));
	onMount(async () => {
		if (appliedAlready) return;
		const payload = await getLang();
		if (!payload) return;
		suggestedLangCode = payload.config.suggested_lang_code;
		const text = formatSuggestedText(payload.strings);
		await loadFonts({ text: [text] });
		setContent(text);
		setVisible(true);
	});
	const onClick = () => {
		appliedAlready = true;
		setSubmitting(true);
		langPack_default.getLangPackAndApply(suggestedLangCode).catch((err) => {
			console.error("suggested language error", err);
			appliedAlready = false;
			setSubmitting(false);
		});
	};
	return createComponent(GrowHeightReveal, {
		get when() {
			return visible();
		},
		get children() {
			return createComponent(Button, {
				"class": "btn-primary btn-secondary btn-primary-transparent primary",
				get disabled() {
					return submitting();
				},
				onClick,
				get children() {
					return [(() => {
						var _el$ = _tmpl$();
						insert(_el$, content);
						return _el$;
					})(), createComponent(Show, {
						get when() {
							return submitting();
						},
						get children() {
							return _tmpl$2();
						}
					})];
				}
			});
		}
	});
}
//#endregion
//#region src/components/passkeyLoginButton.tsx
var fetchedPasskeyOption;
function PasskeyLoginButton(props = {}) {
	if (!IS_WEB_AUTHN_SUPPORTED) return null;
	const { managers, navigate, toIm, openAccount, isLeaving } = useAuthFlow();
	const [visible, setVisible] = createSignal(false);
	const [submitting, setSubmitting] = createSignal(false);
	let passkeyOptionJSON;
	let passkeyInitDcId;
	const fetchPasskeyOption = (overwrite) => {
		if (overwrite || fetchedPasskeyOption?.managers !== managers) fetchedPasskeyOption = {
			managers,
			promise: Promise.all([managers.apiManager.getBaseDcId(), managers.appAccountManager.initPasskeyLogin()])
		};
		return fetchedPasskeyOption.promise.then(([dcId, passkeyLoginOptions]) => {
			passkeyInitDcId = dcId || void 0;
			passkeyOptionJSON = passkeyLoginOptions.options.data;
			setVisible(true);
		});
	};
	let gone = false;
	const isGone = () => gone || isLeaving();
	let credentialRequest;
	onCleanup(() => {
		gone = true;
		credentialRequest?.abort();
	});
	const onClick = async () => {
		setSubmitting(true);
		credentialRequest = new AbortController();
		try {
			const signedInAccounts = await AccountController.getAccounts();
			const credential = await navigator.credentials.get({
				publicKey: PublicKeyCredential.parseRequestOptionsFromJSON(JSON.parse(passkeyOptionJSON).publicKey),
				signal: credentialRequest.signal
			});
			if (isGone()) return;
			const inputPasskeyCredential = getInputPasskeyCredential(credential);
			const [dcId, userId] = inputPasskeyCredential.response.user_handle.split(":").map((n) => parseInt(n));
			const existing = signedInAccounts.find(([, accountData]) => accountData.userId === userId);
			if (existing) {
				openAccount(existing[0]);
				return;
			}
			await managers.apiManager.setBaseDcId(dcId);
			await managers.appAccountManager.finishPasskeyLogin(inputPasskeyCredential, passkeyInitDcId === dcId ? void 0 : passkeyInitDcId);
			toIm();
		} catch (err) {
			if (isGone()) return;
			if (err.type === "SESSION_PASSWORD_NEEDED") {
				navigate({ name: "password" });
				return;
			} else if (err.type === "PASSKEY_CREDENTIAL_NOT_FOUND") toastNew({ langPackKey: "Login.Passkey.Error.NotFound" });
			else toastNew({ langPackKey: "Login.Passkey.Error" });
			await fetchPasskeyOption(true);
			setSubmitting(false);
		}
	};
	onMount(() => {
		fetchPasskeyOption();
	});
	return createComponent(GrowHeightReveal, {
		get when() {
			return visible();
		},
		get children() {
			return createComponent(Button, {
				"class": "btn-primary btn-secondary btn-primary-transparent primary",
				get disabled() {
					return submitting() || props.disabled;
				},
				onClick,
				text: "Login.Passkey"
			});
		}
	});
}
//#endregion
export { LanguageChangeButton as n, PasskeyLoginButton as t };
