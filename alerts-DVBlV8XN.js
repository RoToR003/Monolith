//# allFunctionsCalledOnLoad
const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["wrapDuration-BQgz9hDF.js","rolldown-runtime-CwcJO0Gh.js","langPack-BmdJGr44.js","userAgent-ByGXcznk.js","app-BuFf8z8C.js","icon-DbP6Es97.js","rootScope-CZS0lmz8.js","eventListenerBase-da40Q-0t.js","logger-7zf0rNYS.js","mainMessagePort-B60c5YFT.js","superMessagePort-DhrhiTig.js","makeError-CiXxcKtE.js","encryptedStorageLayer-gN9TBXzg.js","idb-BZfkipS3.js","pause-BSJh-z46.js","cancellablePromise-bof--dnO.js","noop-H9NNBLfX.js","cryptoMessagePort-D8QFBtT1.js","commonStateStorage-CW-poHCa.js","regex-DmbDaFB2.js","solid-9Vxm0VIz.js","preload-helper-B0NHKCoo.js"])))=>i.map(i=>d[i]);
import { n as __exportAll } from "./rolldown-runtime-CwcJO0Gh.js";
import { a as i18n } from "./langPack-BmdJGr44.js";
import { p as createComponent, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { t as __vitePreload } from "./preload-helper-B0NHKCoo.js";
import { c as insert, g as template, o as className } from "./web-BPyQozky.js";
import { t as classNames } from "./classNames-DxGDjmvw.js";
import { t as confirmationPopup } from "./confirmationPopup-Bz6mK0o-.js";
import { n as toast } from "./toast-B6VD5M7R.js";
import { t as WalletAddressGroups } from "./addressGroups-CCa8-ngl.js";
var alerts_module_default = {
	plate: "_plate_a1898_6",
	plateCenter: "_plateCenter_a1898_16",
	error: "_error_a1898_20",
	loading: "_loading_a1898_28"
};
//#endregion
//#region src/components/wallet/alerts.tsx
var alerts_exports = /* @__PURE__ */ __exportAll({
	WalletAddressPlate: () => WalletAddressPlate,
	isWalletNetworkError: () => isWalletNetworkError,
	showWalletAlert: () => showWalletAlert,
	showWalletError: () => showWalletError,
	toastWallet: () => toastWallet,
	toastWalletAfterBack: () => toastWalletAfterBack,
	walletAuthorizationMessage: () => walletAuthorizationMessage
});
var _tmpl$ = /*#__PURE__*/ template(`<div>`);
/** a bold title over its text: iOS's "actionSucceeded" toast */
function toastWallet(title, text, textArgs) {
	const content = document.createDocumentFragment();
	const strong = document.createElement("strong");
	strong.append(i18n(title));
	content.append(strong, document.createElement("br"), i18n(text, textArgs));
	toast(content);
}
/** the same, once the window went back to another screen: the screens slide first (iOS waits 0.4 s) */
function toastWalletAfterBack(title, text) {
	setTimeout(() => toastWallet(title, text), 400);
}
/**
* A title and a text with OK, or with `actions` and Cancel. Each action runs its own callback; the alert closes
* after it. Settles when the alert is closed, whichever way.
*/
function showWalletAlert(message, options = {}) {
	const actions = options.actions || [];
	return confirmationPopup({
		titleLangKey: message.title,
		descriptionLangKey: message.text,
		descriptionLangArgs: message.textArgs,
		content: options.content,
		button: actions[0] || {
			langKey: "OK",
			isCancel: true
		},
		buttons: actions.length ? [...actions, {
			langKey: "Cancel",
			isCancel: true
		}] : void 0
	}).then(() => {}, () => {});
}
var TOO_FRESH_REGEXP = /^(PASSWORD|SESSION)_TOO_FRESH_(\d+)$/;
/** what an unanswered request, or the provider, failed on: worth another try as it is */
function isWalletNetworkError(error) {
	const type = String(error?.type || "");
	const code = error?.code;
	return type.startsWith("NETWORK_") || type === "RPC_CALL_FAIL" || type === "WALLET_TONCENTER_ERROR" || type === "ROTATION_QUOTE_FAILED" || typeof code === "number" && (code >= 500 || code < 0);
}
/**
* The alert iOS shows for what the server and the 2FA check refuse (walletAuthorizationErrorMessage); nothing for
* any other failure, which the caller words itself
*/
async function walletAuthorizationMessage(error) {
	const type = String(error?.type || "");
	const fresh = type.match(TOO_FRESH_REGEXP);
	if (fresh) {
		const [{ default: formatDuration }, { wrapFormattedDuration }] = await Promise.all([__vitePreload(() => import("./wrapDuration-BQgz9hDF.js").then((n) => n.u), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21])), __vitePreload(() => import("./wrapDuration-BQgz9hDF.js").then((n) => n.n), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]))]);
		const password = fresh[1] === "PASSWORD";
		return {
			title: password ? "Wallet.Auth.PasswordTooNewTitle" : "Wallet.Auth.SessionTooNewTitle",
			text: password ? "Wallet.Auth.PasswordRetryAfter" : "Wallet.Auth.SessionRetryAfter",
			textArgs: [wrapFormattedDuration(formatDuration(+fresh[2]), true)]
		};
	}
	switch (type) {
		case "WALLET_PHRASE_OUTDATED": return {
			title: "Wallet.Import.PhraseChangedTitle",
			text: "Wallet.Import.PhraseChangedText"
		};
		case "NO_PASSWORD":
		case "INTERNAL_NO_PASSWORD": return {
			title: "Wallet.Auth.TwoStepRequiredTitle",
			text: "Wallet.Auth.TwoStepRequiredText"
		};
		case "WALLET_BACKUP_DISABLED": return {
			title: "Wallet.Auth.BackupDisabledTitle",
			text: "Wallet.Auth.BackupDisabledText"
		};
		case "WALLET_BACKUP_NOT_AVAILABLE": return {
			title: "Wallet.Auth.BackupUnavailableTitle",
			text: "Wallet.Auth.BackupUnavailableText"
		};
		case "ROTATION_PREPARE_FAILED": return {
			title: "Wallet.Backup.UpdatePhraseErrorTitle",
			text: "Wallet.Auth.UpdatePhraseErrorText"
		};
		case "WALLET_PROOF_INVALID": return {
			title: "Wallet.Auth.VerifyWalletErrorTitle",
			text: "Wallet.Auth.VerifyWalletErrorText"
		};
		case "WALLET_PROOF_EXPIRED": return {
			title: "Wallet.Auth.VerificationExpiredTitle",
			text: "Wallet.Auth.VerificationExpiredText"
		};
	}
}
/** the alert for a failure with no words of its own: `title`, and the network as the likely cause */
async function showWalletError(error, title, text = "Wallet.NetworkError") {
	return showWalletAlert(await walletAuthorizationMessage(error) ?? {
		title,
		text
	});
}
/** an address on a plate under an alert's text */
function WalletAddressPlate(props) {
	return (() => {
		var _el$ = _tmpl$();
		insert(_el$, createComponent(WalletAddressGroups, { get address() {
			return props.address;
		} }));
		createRenderEffect(() => className(_el$, classNames(alerts_module_default.plate, alerts_module_default.plateCenter)));
		return _el$;
	})();
}
//#endregion
export { showWalletError as a, walletAuthorizationMessage as c, showWalletAlert as i, alerts_module_default as l, alerts_exports as n, toastWallet as o, isWalletNetworkError as r, toastWalletAfterBack as s, WalletAddressPlate as t };
