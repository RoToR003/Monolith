//# allFunctionsCalledOnLoad
import { n as rootScope } from "./rootScope-CZS0lmz8.js";
import { a as i18n } from "./langPack-BmdJGr44.js";
import { C as createSignal, p as createComponent, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { n as deferredPromise } from "./cancellablePromise-bof--dnO.js";
import { n as bindManagersToSession } from "./bindManagersToAccount-BL82O9H9.js";
import { n as useContentSettings } from "./contentSettings-DMhHR-0w.js";
import { c as insert, g as template, o as className } from "./web-BPyQozky.js";
import { n as hotReloadGuard } from "./hotReloadGuardProvider-CHEsZRuG.js";
import { i as createPopup, n as PopupElement } from "./indexTsx-v9mB9bAq.js";
var ageVerification_module_default = {
	popup: "_popup_10283_1",
	text: "_text_10283_8"
};
//#endregion
//#region src/components/popups/ageVerification.tsx
var _tmpl$ = /*#__PURE__*/ template(`<div>`);
async function showAgeVerificationPopup(options) {
	const managers = bindManagersToSession(rootScope.managers);
	const appConfig = await rootScope.managers.apiManager.getAppConfig();
	const [show, setShow] = createSignal(true);
	let switchedToWebApp = false;
	const textKey = appConfig.verify_age_country === "GB" ? "AgeVerification.TextGB" : "AgeVerification.Text";
	const handleVerify = async () => {
		const bot = await rootScope.managers.appUsersManager.resolveUserByUsername(appConfig.verify_age_bot_username ?? "TelegramAge");
		switchedToWebApp = true;
		setShow(false);
		hotReloadGuard.appImManager.openWebApp({
			botId: bot.id,
			main: true,
			noConfirmation: true,
			forcePopup: true,
			onClose: () => {
				options.onVerify(!!useContentSettings().ageVerified());
			}
		});
	};
	createPopup(() => createComponent(PopupElement, {
		managers,
		get ["class"]() {
			return ageVerification_module_default.popup;
		},
		closable: true,
		get show() {
			return show();
		},
		onClose: () => !switchedToWebApp && options.onClose?.(),
		old: true,
		get children() {
			return [
				createComponent(PopupElement.Header, { get children() {
					return [createComponent(PopupElement.CloseButton, {}), createComponent(PopupElement.Title, { title: "AgeVerification.Title" })];
				} }),
				createComponent(PopupElement.Body, { get children() {
					var _el$ = _tmpl$();
					insert(_el$, () => i18n(textKey));
					createRenderEffect(() => className(_el$, ageVerification_module_default.text));
					return _el$;
				} }),
				createComponent(PopupElement.Footer, { get children() {
					return createComponent(PopupElement.FooterButton, {
						langKey: "AgeVerification.Action",
						callback: handleVerify
					});
				} })
			];
		}
	}));
}
/** Resolves with what the user answered — `false` when they simply closed it. */
function createAgeVerification() {
	const promise = deferredPromise();
	showAgeVerificationPopup({
		onVerify: (verified) => promise.resolve(verified),
		onClose: () => promise.resolve(false)
	});
	return promise;
}
//#endregion
export { createAgeVerification as default, showAgeVerificationPopup };
