//# allFunctionsCalledOnLoad
import { a as i18n } from "./langPack-BmdJGr44.js";
import { C as createSignal, M as onCleanup, _ as createMemo, p as createComponent, s as Show, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { t as bindActiveWindowListener } from "./appWindow-bo-KtJhy.js";
import { t as bytesToHex } from "./bytesToHex-BQHuRHPP.js";
import { c as insert, g as template, o as className, s as delegateEvents, u as memo } from "./web-BPyQozky.js";
import { t as I18nTsx } from "./i18n-CGMFiAW0.js";
import { n as PopupElement } from "./indexTsx-v9mB9bAq.js";
import { t as MediaHeader } from "./mediaHeader-CnpQNwOl.js";
import { t as anchorCallback } from "./anchorCallback-BbwAJdBk.js";
import { r as toastNew } from "./toast-B6VD5M7R.js";
import { n as ChipTabs, t as ChipTab } from "./chipTabs-C2nG11aJ.js";
import { p as useWallet } from "./stream-DZrVqY75.js";
import { t as wallet_module_default } from "./wallet.module-3nQsE2jy.js";
import { t as WalletHeader } from "./parts-D2eDZtIN.js";
import { c as walletAuthorizationMessage, i as showWalletAlert, s as toastWalletAfterBack, t as WalletAddressPlate } from "./alerts-DVBlV8XN.js";
import { ensureWalletKey, isUserCancel, withWalletPassword } from "./send-CchmriGl.js";
import { r as enableWalletBackup } from "./rotation-BVnFgKfO.js";
import { r as parseWalletPastedWords, t as WalletWordFields } from "./wordFields-DESG870k.js";
var restore_module_default = {
	tabs: "_tabs_1n95y_6",
	link: "_link_1n95y_10"
};
//#endregion
//#region src/components/wallet/screens/restore.tsx
var _tmpl$ = /*#__PURE__*/ template(`<button type=button>`);
var _tmpl$2 = /*#__PURE__*/ template(`<div>`);
/**
* The phrase this wallet expects: 24 words once its key was updated — a key update in the history, or this
* device's old key of it with another signing key than the served one — 12 otherwise, as iOS starts (it offers both).
*/
async function expectedPhraseLength(store) {
	const state = store.status().state;
	if (!state) return 12;
	if (store.history.transactions().some((transaction) => transaction.pFlags.key_change)) return 24;
	const record = await store.session.vault.getCustody().catch(() => void 0);
	if (record && record.anchorKey !== bytesToHex(state.public_key) && await store.session.isSameAddress(record.address, state.address)) return 24;
	return 12;
}
/**
* "Wrong Secret Phrase": the words are another wallet's — with the address of the one they should open (iOS)
*/
function showWalletWrongPhrase(address) {
	return showWalletAlert({
		title: "WalletWrongSecretPhrase",
		text: "WalletWrongSecretPhraseInfo"
	}, { content: address && createComponent(WalletAddressPlate, { address }) });
}
/**
* Typing a phrase (iOS: WalletImportScreen): this wallet's, to put its key on this device; another wallet's, to make
* it the account's (`import`); or this wallet's current one, to turn the backup on with it (`enableBackup`). 12 or
* 24 numbered words with suggestions from the word list; a pasted phrase fills them all. What the words turn out to
* be is said in an alert: another wallet's, an old phrase of this one, no phrase at all.
*/
function WalletRestoreScreen(props) {
	const mode = props.params?.mode;
	const importing = mode === "import";
	const wallet = useWallet();
	const store = wallet.store;
	const [count, setCount] = createSignal(12);
	const [words, setWords] = createSignal(new Array(12).fill(""));
	const [busy, setBusy] = createSignal(false);
	const [wordlist, setWordlist] = createSignal(/* @__PURE__ */ new Set());
	const [canPaste, setCanPaste] = createSignal(false);
	let fields;
	store.session.getEngine().then((engine) => engine.mnemonicWordlist()).then((list) => setWordlist(new Set(list)));
	onCleanup(() => setWords([]));
	if (!importing) {
		const length = expectedPhraseLength(store).then((length) => {
			if (length !== count()) resize(length);
		}, () => {});
		wallet.router.holdEntrance(length);
	}
	const autofocus = window.setTimeout(() => fields?.focus(0), 450);
	onCleanup(() => clearTimeout(autofocus));
	const checkClipboard = () => {
		navigator.permissions?.query({ name: "clipboard-read" }).then((status) => {
			setCanPaste(status.state === "granted" && !!navigator.clipboard?.readText);
		}, () => setCanPaste(false));
	};
	checkClipboard();
	onCleanup(bindActiveWindowListener((win) => win, "focus", checkClipboard));
	const isWord = (word) => !!word && (!wordlist().size || wordlist().has(word));
	const complete = createMemo(() => words().length === count() && words().every(isWord));
	const numbers = createMemo(() => Array.from({ length: count() }, (_, index) => index + 1));
	const setWord = (index, word) => {
		setWords((list) => {
			const copy = list.slice();
			copy[index] = word;
			return copy;
		});
	};
	const resize = (length, keep = words()) => {
		setCount(length);
		setWords(Array.from({ length }, (_, index) => keep[index] || ""));
	};
	const clear = (length = count()) => {
		resize(length, []);
		queueMicrotask(() => fields?.focus(0));
	};
	const alertPhraseLength = (length, index) => {
		if (index !== void 0) fields?.shake(index);
		showWalletAlert({
			title: "WalletInvalidRecoveryPhrase",
			text: mode === "enableBackup" ? "Wallet.Import.InvalidCurrentPhraseLength" : "Wallet.Import.InvalidPhraseLength",
			textArgs: [i18n("WalletPhraseWords", [length])]
		});
	};
	const onWords = (index, list) => {
		if (list.length > 1 && list.length !== 12 && list.length !== 24) {
			alertPhraseLength(list.length, index);
			return;
		}
		if (list.length === 1) {
			setWord(index, list[0]);
			return;
		}
		resize(list.length, list);
		queueMicrotask(() => {
			const invalid = list.findIndex((word) => !isWord(word));
			if (invalid !== -1) fields?.focus(invalid);
			else fields?.blur();
		});
	};
	const paste = async () => {
		let text;
		try {
			text = await navigator.clipboard.readText();
		} catch (err) {
			setCanPaste(false);
			return;
		}
		const list = parseWalletPastedWords(text || "");
		if (!list.length) {
			setCanPaste(false);
			return;
		}
		if (list.length !== 12 && list.length !== 24) {
			alertPhraseLength(list.length);
			return;
		}
		if (!(await (await store.session.getEngine()).detectMnemonicSchemes(list)).includes("rotation")) {
			showWalletAlert({
				title: "WalletInvalidRecoveryPhrase",
				text: "WalletInvalidRecoveryPhraseInfo"
			});
			return;
		}
		resize(list.length, list);
		fields?.blur();
	};
	const fromBackup = async () => {
		if (busy()) return;
		setBusy(true);
		try {
			await ensureWalletKey(store);
			toastNew({ langPackKey: "Wallet.Restore.Done" });
			wallet.router.pop();
		} catch (err) {
			if (!isUserCancel(err)) showWalletAlert(await walletAuthorizationMessage(err) ?? {
				title: "Wallet.Restore.ErrorTitle",
				text: "Wallet.NetworkError"
			});
		} finally {
			setBusy(false);
		}
	};
	const showFailure = async (error) => {
		const type = String(error?.type || "");
		if (type === "WALLET_PHRASE_OTHER_WALLET") {
			await showWalletWrongPhrase(store.friendlyAddress() || store.status().state?.address);
			clear();
			return;
		}
		if (type === "WALLET_PHRASE_OUTDATED") {
			await showWalletAlert({
				title: "Wallet.Import.PhraseChangedTitle",
				text: "Wallet.Import.PhraseChangedText"
			}, { actions: [{ langKey: "Wallet.Import.Proceed" }] });
			clear(24);
			return;
		}
		if (type === "WALLET_PHRASE_INVALID" || type === "WALLET_PHRASE_FOREIGN") {
			showWalletAlert({
				title: "WalletInvalidRecoveryPhrase",
				text: "WalletInvalidRecoveryPhraseInfo"
			});
			return;
		}
		const fallback = importing ? {
			title: "Wallet.Import.ErrorTitle",
			text: "Wallet.Import.ErrorText"
		} : {
			title: "Wallet.Restore.ErrorTitle",
			text: "Wallet.NetworkError"
		};
		showWalletAlert(await walletAuthorizationMessage(error) ?? fallback);
	};
	const enableBackup = async () => {
		if (await enableWalletBackup(wallet, {
			retry: () => void runEnable(),
			enterPhrase: () => clear()
		})) wallet.router.pop("keys");
	};
	const runEnable = async () => {
		if (busy()) return;
		setBusy(true);
		try {
			await enableBackup();
		} finally {
			setBusy(false);
		}
	};
	const submit = async () => {
		if (busy()) return;
		const list = words().slice(0, count());
		const empty = list.findIndex((word) => !isWord(word));
		if (empty !== -1) {
			fields?.focus(empty);
			fields?.shake(empty);
			return;
		}
		setBusy(true);
		fields?.blur();
		try {
			if (importing) {
				await store.session.replaceWithImported(list, (replace) => withWalletPassword("Wallet.Replace.PasswordText", replace));
				await store.refreshStatus(true);
				await store.refreshDeviceMode();
				wallet.router.pop("main");
				toastWalletAfterBack("WalletImported", "WalletImportedInfo");
				return;
			}
			await store.session.restoreFromWords(list, store.status());
			await store.refreshDeviceMode();
			if (mode === "enableBackup") {
				await enableBackup();
				return;
			}
			wallet.router.pop();
			toastWalletAfterBack("WalletImported", "WalletImportedInfo");
		} catch (err) {
			if (!isUserCancel(err)) showFailure(err);
		} finally {
			setBusy(false);
		}
	};
	const title = importing ? "WalletImport" : mode === "enableBackup" ? "WalletEnableBackup" : "WalletSecretPhrase";
	const action = importing ? "WalletImportButton" : mode === "enableBackup" ? "WalletEnableBackup" : "WalletDone";
	const why = anchorCallback(() => showWalletAlert({
		title: "WalletSecretPhrase",
		text: "WalletEnterSecretPhraseInfo"
	}));
	return [
		createComponent(WalletHeader, {
			title,
			back: true
		}),
		(() => {
			var _el$ = _tmpl$2();
			insert(_el$, createComponent(MediaHeader, { get children() {
				return [createComponent(MediaHeader.Sticker, {
					name: importing ? "WalletWordList" : "WalletWordCheck",
					size: 100,
					restartOnClick: false
				}), createComponent(MediaHeader.Subtitle, { get children() {
					return importing ? createComponent(I18nTsx, {
						key: "WalletImportPhraseInfo",
						get args() {
							return ["" + count()];
						}
					}) : mode === "enableBackup" ? i18n("Wallet.Import.EnableBackupText") : store.status().state?.pFlags.can_export_phrase ? i18n("Wallet.Restore.TextBackup") : i18n("WalletEnterSecretPhrase", [why]);
				} })];
			} }), null);
			insert(_el$, createComponent(ChipTabs, {
				center: true,
				get ["class"]() {
					return restore_module_default.tabs;
				},
				get value() {
					return "" + count();
				},
				view: "primary",
				onChange: (value) => resize(+value),
				get children() {
					return [createComponent(ChipTab, {
						value: "12",
						get children() {
							return createComponent(I18nTsx, {
								key: "WalletPhraseWords",
								args: ["12"]
							});
						}
					}), createComponent(ChipTab, {
						value: "24",
						get children() {
							return createComponent(I18nTsx, {
								key: "WalletPhraseWords",
								args: ["24"]
							});
						}
					})];
				}
			}), null);
			insert(_el$, createComponent(WalletWordFields, {
				get numbers() {
					return numbers();
				},
				words,
				setWord,
				wordlist,
				columns: true,
				get disabled() {
					return busy();
				},
				onWords,
				onSubmit: submit,
				canSubmit: complete,
				paste: {
					shown: () => canPaste() && words().every((word) => !word),
					onClick: paste
				},
				ref: (handle) => fields = handle
			}), null);
			insert(_el$, createComponent(Show, {
				get when() {
					return memo(() => !!(!mode && store.status().state?.pFlags.can_export_phrase))() && store.deviceMode() !== "full";
				},
				get children() {
					var _el$2 = _tmpl$();
					_el$2.$$click = fromBackup;
					insert(_el$2, () => i18n("Wallet.Keys.RestoreBackup"));
					createRenderEffect(() => className(_el$2, restore_module_default.link));
					return _el$2;
				}
			}), null);
			createRenderEffect(() => className(_el$, wallet_module_default.body));
			return _el$;
		})(),
		createComponent(PopupElement.Footer, { get children() {
			return createComponent(PopupElement.FooterButton, {
				langKey: action,
				get disabled() {
					return !complete();
				},
				preloader: true,
				callback: () => submit().then(() => false)
			});
		} })
	];
}
delegateEvents(["click"]);
//#endregion
export { WalletRestoreScreen as default, showWalletWrongPhrase };
