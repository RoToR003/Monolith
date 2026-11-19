//# allFunctionsCalledOnLoad
import { i as __toESM } from "./rolldown-runtime-CwcJO0Gh.js";
import { a as i18n, u as langPack_default } from "./langPack-BmdJGr44.js";
import { C as createSignal, g as createEffect, j as on, o as Match, p as createComponent, s as Show, u as Switch, x as createRoot, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { t as bytesToHex } from "./bytesToHex-BQHuRHPP.js";
import { c as insert, f as setAttribute, g as template, o as className } from "./web-BPyQozky.js";
import { n as putPreloader } from "./putPreloader-Bxq7N1RV.js";
import { i as Row, in as gramsToNumber, mn as Currencies, nn as formatGrams, pn as paymentsWrapCurrencyAmount, s as CheckboxFieldTsx, t as confirmationPopup, tn as formatFiat } from "./confirmationPopup-Bz6mK0o-.js";
import { t as require_BigInteger } from "./BigInteger-0a0WsWCs.js";
import { t as HeightTransition } from "./heightTransition-DUH4NxQ7.js";
import { a as showWalletError, c as walletAuthorizationMessage, i as showWalletAlert, l as alerts_module_default, o as toastWallet, r as isWalletNetworkError } from "./alerts-DVBlV8XN.js";
import { o as isRotationFeeCovered } from "./rotation-CL3-t-0h.js";
import { ensureWalletKey, isUserCancel, toastWalletError } from "./send-CchmriGl.js";
//#region src/components/wallet/rotation.tsx
var import_BigInteger = /* @__PURE__ */ __toESM(require_BigInteger());
var _tmpl$ = /*#__PURE__*/ template(`<p>`);
var _tmpl$2 = /*#__PURE__*/ template(`<p>\n\n`);
var _tmpl$3 = /*#__PURE__*/ template(`<div role=status>`);
var _tmpl$4 = /*#__PURE__*/ template(`<div>`);
var _tmpl$5 = /*#__PURE__*/ template(`<div><p role=alert>`);
/** under it the update asks for a top-up instead of a price (iOS: 0.0005 Gram) */
var ROTATION_MIN_BALANCE = 5e5;
/** the fee's decimals (iOS) */
var FEE_DECIMALS = 5;
/**
* The fiat beside a fee: `~$0.01`, or `<$0.01` when it rounds to nothing (iOS); nothing without a rate
*/
function feeFiat(store, nanos) {
	const rate = store.fiatPerGram();
	if (!rate) return;
	const currency = store.currency();
	const exp = Currencies[currency]?.exp ?? 2;
	if (!Math.round(gramsToNumber(nanos) * rate * 10 ** exp)) return "<" + paymentsWrapCurrencyAmount(1, currency, false, false, true);
	return "~" + formatFiat(nanos, rate, store.currency());
}
/** "Network fee: …", or the balance the fee needs; the fiat part only when a rate is known */
function rotationFeeLang(store, fee, required) {
	const amount = formatGrams(fee, FEE_DECIMALS);
	const fiat = feeFiat(store, fee);
	if (!fiat) return [required ? "Wallet.Backup.RequiredBalanceGrams" : "Wallet.Backup.UpdateFeeGrams", [amount]];
	return [required ? "Wallet.Backup.RequiredBalance" : "Wallet.Backup.UpdateFee", [amount, fiat]];
}
function isLowWalletBalance(balance) {
	return (0, import_BigInteger.default)(String(balance ?? 0)).lesser(ROTATION_MIN_BALANCE);
}
function walletIdentity(status) {
	const state = status?.state;
	return state && state.address + ":" + bytesToHex(state.public_key);
}
/**
* Starts watching the wallet for the flow: another address, or another key (it moved on elsewhere), takes the flow
* down with "Wallet Changed"; a backup turned off elsewhere takes it down quietly — there is nothing to disable. A
* status that is still loading, or the wallet being made, is no change (iOS: reconcileBackupDisableWalletState).
*/
function createWalletBackupFlow(wallet) {
	const store = wallet.store;
	let identity = walletIdentity(store.status());
	let dispose;
	const check = (status) => {
		const presence = status.presence;
		if (presence === "unknown" || presence === "error" || presence === "provisioning") return true;
		if (!identity) {
			identity = walletIdentity(status);
			return true;
		}
		const current = walletIdentity(status);
		if (current === identity || flow.rotatedIdentity && current === flow.rotatedIdentity) {
			if (!status.state.pFlags.backup_enabled) leaveWalletBackupFlow(wallet, flow);
			return !flow.ended;
		}
		leaveWalletBackupFlow(wallet, flow);
		showWalletAlert({
			title: "Wallet.Backup.WalletChangedTitle",
			text: "Wallet.Backup.DisableWalletChangedText"
		});
		return false;
	};
	const flow = {
		dismissing: false,
		committing: false,
		rotationSent: false,
		ended: false,
		end: () => {
			if (flow.ended) return;
			flow.ended = true;
			dispose?.();
		},
		check: () => !flow.ended && check(store.status())
	};
	createRoot((_dispose) => {
		dispose = _dispose;
		createEffect(on(store.status, (status) => {
			if (flow.committing || flow.ended) return;
			check(status);
		}, { defer: true }));
	});
	return flow;
}
/**
* Takes the flow down: its question closes, its screens go back to the keys
*/
function leaveWalletBackupFlow(wallet, flow) {
	if (flow.ended) return;
	flow.dismissing = true;
	flow.popup?.hide();
	const name = wallet.router.current().name;
	if (name === "phrase" || name === "quiz") wallet.router.pop("keys");
	flow.end();
}
/**
* Leaving the write-down of the words or their quiz drops the disable (and a prepared update with it): while it still
* would — `abandons` — leaving asks "Cancel Disabling Backup?" first (iOS). To be called in the screen.
*/
function guardWalletBackupDisable(wallet, flow, abandons = () => true) {
	wallet.router.guardLeave(() => {
		if (!abandons() || flow?.dismissing) return;
		return confirmationPopup({
			titleLangKey: "Wallet.Backup.CancelTitle",
			descriptionLangKey: "Wallet.Backup.CancelText",
			button: { langKey: "Wallet.Backup.CancelDisabling" },
			cancelButton: { langKey: "WalletContinue" }
		});
	});
}
/** what Disable failed on, in iOS's words (disableBackupErrorMessage) */
async function disableBackupErrorMessage(store, error) {
	switch (String(error?.type || "")) {
		case "WALLET_PROOF_INVALID": return {
			title: "Wallet.Auth.VerifyWalletErrorTitle",
			text: "Wallet.Backup.DisableVerificationErrorText"
		};
		case "WALLET_PROOF_EXPIRED": return {
			title: "Wallet.Auth.VerificationExpiredTitle",
			text: "Wallet.Backup.DisableVerificationExpiredText"
		};
		case "WALLET_ROTATION_NOT_FOUND":
		case "ROTATION_PENDING": return {
			title: "Wallet.Backup.PhraseUpdatePendingTitle",
			text: "Wallet.Backup.DisablePhraseUpdatePendingText"
		};
		case "ROTATION_FEES": {
			const [text, textArgs] = rotationFeeLang(store, error.fee, true);
			return {
				title: "WalletNotEnoughGram",
				text,
				textArgs
			};
		}
	}
	if (isWalletNetworkError(error)) return {
		title: "Wallet.Backup.DisableErrorTitle",
		text: "Wallet.NetworkError"
	};
	if (isRotationError(error)) return {
		title: "Wallet.Backup.UpdatePhraseErrorTitle",
		text: "Wallet.Backup.DisablePhraseUpdateErrorText"
	};
	return await walletAuthorizationMessage(error) ?? {
		title: "Wallet.Backup.DisableErrorTitle",
		text: "Wallet.Backup.DisableErrorText"
	};
}
/**
* "Disable Backup?" with "Update Secret Phrase" under it (iOS: presentDisableBackupAlert). Ticked, the update's price
* shows under it once quoted — or, on a balance too low for any fee, a note that it needs funds, and Disable becomes
* Top Up. Disable gets the words ready with a spinner on it; what fails is said in red under the question, and the
* next press tries again. Resolves with the words to write down (or the top-up), rejects when cancelled.
*/
function confirmWalletBackupDisable(options) {
	return createRoot(async (dispose) => {
		const { fiat, offered } = options;
		const [update, setUpdate] = createSignal(false);
		const [quoted, setQuoted] = createSignal();
		const [quoteError, setQuoteError] = createSignal();
		const [error, setError] = createSignal();
		const [errorText, setErrorText] = createSignal();
		const lowBalance = () => isLowWalletBalance(options.balance());
		const topUp = () => update() && lowBalance();
		let quoting;
		const quote = () => {
			setQuoteError(void 0);
			const promise = quoting = options.quote();
			promise.then((value) => {
				if (quoting === promise) setQuoted(value);
			}, (err) => {
				if (quoting === promise) setQuoteError(err);
			});
			return promise;
		};
		if (offered && !lowBalance()) quote();
		createEffect(() => {
			const shown = error() || update() && !lowBalance() && quoteError();
			if (!shown) {
				setErrorText(void 0);
				return;
			}
			disableBackupErrorMessage(fiat, shown).then((message) => {
				if (error() === shown || quoteError() === shown) setErrorText(message);
			});
		});
		let choice;
		const disable = async () => {
			if (topUp()) {
				choice = { topUp: true };
				return;
			}
			setError(void 0);
			try {
				let price;
				if (update()) {
					price = quoted();
					if (!price) {
						const fresh = !!quoteError() || !quoting;
						price = await (fresh ? quote() : quoting);
						if (fresh) return false;
					}
					if (!isRotationFeeCovered(price.fee, options.balance())) {
						setError({
							type: "ROTATION_FEES",
							fee: price.fee
						});
						return false;
					}
				}
				choice = {
					update: !!price,
					words: await options.prepare(price)
				};
			} catch (err) {
				if (!isUserCancel(err) && err !== quoteError()) setError(err);
				return false;
			}
		};
		const button = {
			get langKey() {
				return topUp() ? "WalletTopUp" : "WalletDisable";
			},
			get isDanger() {
				return !topUp();
			},
			preloader: true,
			callback: disable
		};
		try {
			await confirmationPopup({
				titleLangKey: "WalletDisableBackupTitle",
				descriptionLangKey: "WalletDisableBackupInfo",
				onPopup: (popup) => options.flow && (options.flow.popup = popup),
				content: (() => {
					var _el$ = _tmpl$4();
					insert(_el$, createComponent(Show, {
						when: offered,
						get children() {
							return createComponent(Row, {
								"class": "popup-peer-checkbox-row",
								get children() {
									return [createComponent(Row.Title, { get children() {
										return i18n("WalletUpdateSecretPhrase");
									} }), createComponent(Row.CheckboxField, { get children() {
										return createComponent(CheckboxFieldTsx, {
											signal: [update, setUpdate],
											onChange: () => setError(void 0)
										});
									} })];
								}
							});
						}
					}), null);
					insert(_el$, createComponent(HeightTransition, { get children() {
						return createComponent(Show, {
							get when() {
								return update();
							},
							get children() {
								var _el$2 = _tmpl$4();
								insert(_el$2, createComponent(Switch, { get children() {
									return [
										createComponent(Match, {
											get when() {
												return lowBalance();
											},
											get children() {
												var _el$3 = _tmpl$();
												insert(_el$3, () => i18n("Wallet.Backup.UpdateTopUpText"));
												createRenderEffect(() => className(_el$3, `${alerts_module_default.plate} ${alerts_module_default.plateCenter}`));
												return _el$3;
											}
										}),
										createComponent(Match, {
											get when() {
												return quoted();
											},
											get children() {
												var _el$4 = _tmpl$2(), _el$5 = _el$4.firstChild;
												insert(_el$4, () => i18n("WalletUpdateSecretPhraseInfo"), _el$5);
												insert(_el$4, () => i18n(...rotationFeeLang(fiat, quoted().fee)), null);
												createRenderEffect(() => className(_el$4, `${alerts_module_default.plate} ${alerts_module_default.plateCenter}`));
												return _el$4;
											}
										}),
										createComponent(Match, {
											get when() {
												return !quoteError();
											},
											get children() {
												var _el$6 = _tmpl$3();
												insert(_el$6, () => putPreloader(void 0, true));
												createRenderEffect((_p$) => {
													var _v$ = alerts_module_default.loading, _v$2 = langPack_default.format("Loading", true);
													_v$ !== _p$.e && className(_el$6, _p$.e = _v$);
													_v$2 !== _p$.t && setAttribute(_el$6, "aria-label", _p$.t = _v$2);
													return _p$;
												}, {
													e: void 0,
													t: void 0
												});
												return _el$6;
											}
										})
									];
								} }));
								return _el$2;
							}
						});
					} }), null);
					insert(_el$, createComponent(HeightTransition, { get children() {
						return createComponent(Show, {
							get when() {
								return errorText();
							},
							get children() {
								var _el$7 = _tmpl$5(), _el$8 = _el$7.firstChild;
								insert(_el$8, () => i18n("Wallet.Backup.RetryText", [langPack_default.format(errorText().text, true, errorText().textArgs)]));
								createRenderEffect(() => className(_el$8, alerts_module_default.error));
								return _el$7;
							}
						});
					} }), null);
					return _el$;
				})(),
				button
			});
			return choice;
		} finally {
			if (options.flow) options.flow.popup = void 0;
			dispose();
		}
	});
}
/**
* From the keys screen: the question, then the words to write down — the current phrase, or the update's new one
*/
async function startWalletBackupDisable(wallet) {
	const store = wallet.store;
	const session = store.session;
	let quoting;
	let flow;
	try {
		await ensureWalletKey(store, "Wallet.Phrase.PasswordText");
		const offered = await session.isRotationOffered(store.status());
		if (offered && !isLowWalletBalance(store.status().state?.balance)) await session.ensureUnlocked("prepareKeyRotation");
		flow = createWalletBackupFlow(wallet);
		const choice = await confirmWalletBackupDisable({
			fiat: store,
			balance: () => store.status().state?.balance ?? 0,
			offered,
			quote: () => quoting = session.quoteRotationFee(store.status()),
			prepare: (quote) => quote ? session.prepareRotation(store.status(), quote) : session.revealPhrase(store.status()),
			flow
		});
		if (flow.ended) return;
		if ("topUp" in choice) {
			flow.end();
			wallet.router.push("receive");
			return;
		}
		wallet.router.push("phrase", {
			mode: choice.update ? "rotation" : "disableBackup",
			words: choice.words,
			flow
		});
	} catch (err) {
		flow?.end();
		if (err?.type === "WALLET_KEY_MISSING") wallet.router.push("restore", {});
		else if (!isUserCancel(err)) showWalletError(err, "Wallet.Backup.DisableErrorTitle");
	} finally {
		await quoting?.catch(() => {});
	}
}
/**
* "All Done?": Continue came too soon after the words appeared to have written them down; the words stay
*/
function showWalletWriteDownTooQuick() {
	confirmationPopup({
		titleLangKey: "Wallet.Backup.SureTitle",
		descriptionLangKey: "Wallet.Backup.SureText",
		button: {
			langKey: "Wallet.Backup.SureOk",
			isCancel: true
		}
	}).catch(() => {});
}
function isRotationError(error) {
	return String(error?.type || "").startsWith("ROTATION_");
}
/**
* An update that did not take effect: "Action Failed", the reason, and that the old phrase stays the one in use.
* One the chain has not answered for yet is no failure: it settles by itself.
*/
function showWalletRotationFailed(error) {
	const type = error?.type;
	if (type === "ROTATION_PENDING") {
		toastWalletError(error);
		return;
	}
	const reason = type === "ROTATION_FEES" ? "Wallet.Error.Insufficient" : type === "ROTATION_ALREADY_SENDING" ? "Wallet.Error.InProgress" : "Wallet.Backup.RotateReasonFailed";
	confirmationPopup({
		titleLangKey: "Wallet.Backup.RotateFailedTitle",
		descriptionLangKey: "Wallet.Backup.RotateFailedText",
		descriptionLangArgs: [langPack_default.format(reason, true)],
		button: {
			langKey: "OK",
			isCancel: true
		}
	}).catch(() => {});
}
/**
* The quiz passed: "Disable Backup?" once more, saying what happens (iOS: presentFinalDisableBackupAlert). Disable
* sends the update, when there is one, waits for the chain, and turns the backup off with the proof of the record's
* key; the screens go once it is done, or once the update failed. A disable that failed says why and may be pressed
* again. Cancel goes back to the keys and drops an update that was not sent.
*/
async function confirmWalletBackupDisableDone(wallet, flow, rotation) {
	const store = wallet.store;
	const disable = async () => {
		if (!flow.check()) return;
		flow.committing = true;
		if (rotation && !flow.rotationSent) try {
			const address = store.status().state?.address;
			const newKey = await store.session.submitRotation(store.status());
			flow.rotationSent = true;
			flow.rotatedIdentity = address && address + ":" + newKey;
			await store.refreshStatus(true).catch(() => {});
			if (!flow.check()) return;
		} catch (err) {
			if (isUserCancel(err)) {
				flow.committing = false;
				return false;
			}
			showWalletRotationFailed(err);
			return;
		}
		try {
			await store.session.disableBackup(store.status());
			await store.refreshStatus(true);
			toastWallet("WalletBackupDisabled", "WalletBackupDisabledInfo");
		} catch (err) {
			flow.committing = false;
			if (isUserCancel(err)) return false;
			const message = await disableBackupErrorMessage(store, err);
			if (!flow.check()) return;
			showWalletAlert(message);
			return false;
		}
	};
	try {
		await confirmationPopup({
			titleLangKey: "WalletDisableBackupTitle",
			descriptionLangKey: rotation ? "WalletDisableBackupConfirmInfo" : "WalletDisableBackupExistingPhraseInfo",
			onPopup: (popup) => flow.popup = popup,
			button: {
				langKey: "WalletDisable",
				isDanger: true,
				preloader: true,
				callback: disable
			}
		});
	} catch (err) {} finally {
		flow.popup = void 0;
	}
	leaveWalletBackupFlow(wallet, flow);
}
/** what Enable failed on, in iOS's words (walletBackupEnableErrorMessage), and what may help */
async function enableBackupErrorMessage(error) {
	switch (String(error?.type || "")) {
		case "WALLET_KEY_MISMATCH":
		case "WALLET_PROOF_INVALID":
		case "WALLET_PHRASE_OTHER_WALLET": return {
			title: "Wallet.Backup.VerifyPhraseErrorTitle",
			text: "Wallet.Backup.VerifyPhraseErrorText",
			enterPhrase: true
		};
		case "WALLET_PHRASE_OUTDATED": return {
			title: "Wallet.Backup.VerifyPhraseErrorTitle",
			text: "Wallet.Backup.VerifyPhraseErrorText"
		};
		case "WALLET_ROTATION_NOT_FOUND":
		case "ROTATION_PENDING": return {
			title: "Wallet.Backup.PhraseUpdatePendingTitle",
			text: "Wallet.Backup.EnablePhraseUpdatePendingText",
			retry: true,
			enterPhrase: true
		};
		case "WALLET_PROOF_EXPIRED": return {
			title: "Wallet.Auth.VerificationExpiredTitle",
			text: "Wallet.Backup.EnableVerificationExpiredText",
			retry: true
		};
		case "WALLET_PHRASE_INVALID":
		case "WALLET_PHRASE_FOREIGN": return {
			title: "WalletInvalidRecoveryPhrase",
			text: "Wallet.Backup.InvalidPhraseText",
			enterPhrase: true
		};
	}
	if (isWalletNetworkError(error)) return {
		title: "Wallet.Backup.EnableErrorTitle",
		text: "Wallet.NetworkError",
		retry: true
	};
	return await walletAuthorizationMessage(error) ?? {
		title: "Wallet.Backup.EnableErrorTitle",
		text: "Wallet.NetworkError"
	};
}
/**
* Turns the backup on with the key on this device (iOS: enableBackup, no question first). Without the key the phrase
* is typed first (`enterPhrase`), and the enable goes on from there. A failure says why, with Retry where another try
* may help and "Enter Current Secret Phrase" where the key itself may be the wrong one. Resolves with whether it is on.
*/
async function enableWalletBackup(wallet, handlers) {
	const store = wallet.store;
	try {
		await ensureWalletKey(store, "Wallet.Phrase.PasswordText");
		await store.session.enableBackup(store.status());
		await store.refreshStatus(true);
		toastWallet("WalletBackupEnabled", "WalletBackupEnabledInfo");
		return true;
	} catch (err) {
		if (err?.type === "WALLET_KEY_MISSING") handlers.enterPhrase();
		else if (!isUserCancel(err)) showWalletEnableBackupError(err, handlers);
		return false;
	}
}
async function showWalletEnableBackupError(error, handlers) {
	const message = await enableBackupErrorMessage(error);
	const actions = [];
	if (message.retry) actions.push({
		langKey: "Wallet.Retry",
		callback: () => void handlers.retry()
	});
	if (message.enterPhrase) actions.push({
		langKey: "Wallet.Backup.EnterCurrentPhrase",
		callback: () => void handlers.enterPhrase()
	});
	return showWalletAlert(message, { actions });
}
//#endregion
export { showWalletWriteDownTooQuick as a, guardWalletBackupDisable as i, createWalletBackupFlow as n, startWalletBackupDisable as o, enableWalletBackup as r, confirmWalletBackupDisableDone as t };
