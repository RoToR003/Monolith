//# allFunctionsCalledOnLoad
import { h as Modes } from "./userAgent-ByGXcznk.js";
import { a as i18n, u as langPack_default } from "./langPack-BmdJGr44.js";
import { C as createSignal, M as onCleanup, g as createEffect, i as For, j as on, p as createComponent, s as Show, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { i as onAppWindowChange, n as getAppWindow, t as bindActiveWindowListener } from "./appWindow-bo-KtJhy.js";
import { _ as use, c as insert, f as setAttribute, g as template, o as className } from "./web-BPyQozky.js";
import { n as PopupElement } from "./indexTsx-v9mB9bAq.js";
import { t as updateScrollRegionFocusable } from "./scrollRegion-DQB9Uktd.js";
import { C as PasscodeLockScreenController } from "./index-B7axFZql.js";
import { i as Row } from "./confirmationPopup-Bz6mK0o-.js";
import { t as MediaHeader } from "./mediaHeader-CnpQNwOl.js";
import { p as useWallet } from "./stream-DZrVqY75.js";
import { t as wallet_module_default } from "./wallet.module-3nQsE2jy.js";
import { t as WalletHeader } from "./parts-D2eDZtIN.js";
import { a as showWalletError, i as showWalletAlert } from "./alerts-DVBlV8XN.js";
import { i as isBackupWriteDownTooQuick } from "./rotation-CL3-t-0h.js";
import { ensureWalletKey, isUserCancel } from "./send-CchmriGl.js";
import { a as showWalletWriteDownTooQuick, i as guardWalletBackupDisable } from "./rotation-BVnFgKfO.js";
var phrase_module_default = {
	warnings: "_warnings_1nckk_6",
	warning: "_warning_1nckk_6",
	warningText: "_warningText_1nckk_15",
	grid: "_grid_1nckk_20",
	word: "_word_1nckk_34"
};
//#endregion
//#region src/components/wallet/screens/phrase.tsx
var _tmpl$ = /*#__PURE__*/ template(`<ol>`);
var _tmpl$2 = /*#__PURE__*/ template(`<div>`);
var _tmpl$3 = /*#__PURE__*/ template(`<li>`);
/** how often the words look whether the app was locked: the lock screen has no event of its own */
var LOCK_CHECK_INTERVAL = 1e3;
/** what iOS's recovery info warns of, each with its own icon */
var WARNINGS = [
	{
		icon: "eyecross",
		text: "WalletRecoveryPhraseNeverShare"
	},
	{
		icon: "warning_filled",
		text: "WalletRecoveryPhraseFundsWarning"
	},
	{
		icon: "shield",
		text: "WalletRecoveryPhraseSupportWarning"
	}
];
/**
* Keeps the screen on while the words are up: writing 24 words down takes longer than a screen stays lit (iOS:
* pushIdleTimerExtension). The browser lets go of it whenever the page is hidden; it is asked for again once the
* words are back.
*/
function useScreenWakeLock(active) {
	const wakeLock = navigator.wakeLock;
	let sentinel, requesting = false, disposed = false;
	const release = () => {
		sentinel?.release().catch(() => {});
		sentinel = void 0;
	};
	const request = () => {
		if (!wakeLock || sentinel || requesting || getAppWindow().document.visibilityState !== "visible") return;
		requesting = true;
		wakeLock.request("screen").then((value) => {
			requesting = false;
			if (disposed || !active()) {
				value.release().catch(() => {});
				return;
			}
			sentinel = value;
			value.addEventListener("release", () => {
				if (sentinel === value) sentinel = void 0;
			});
		}, () => requesting = false);
	};
	createEffect(() => active() ? request() : release());
	onCleanup(() => {
		disposed = true;
		release();
	});
}
/**
* The secret phrase. Shown from the keys, iOS's recovery info comes first — what the phrase is, three warnings —
* then the words, from this device's key or reassembled from Telegram's backup (which also installs the key here).
* Written down to turn the backup off, the words come ready (`words`); Continue takes them as written only once they
* have been up a while, and leaving asks first: it drops the disable. The words cannot be selected, keep the screen
* on, and leave the screen while the page is hidden or the app locked.
*/
function WalletPhraseScreen(props) {
	const wallet = useWallet();
	const store = wallet.store;
	const [words, setWords] = createSignal();
	const [busy, setBusy] = createSignal(false);
	const [covered, setCovered] = createSignal(false);
	const parked = props.params?.parked;
	const mode = props.params?.mode;
	const writeDown = mode === "disableBackup" || mode === "rotation";
	const rotation = mode === "rotation";
	const flow = props.params?.flow;
	const given = props.params?.words;
	let handedOver = false, disposed = false;
	let revealAttempt = 0;
	let grid;
	let shownAt = 0;
	if (given) {
		setWords(given);
		shownAt = Date.now();
	}
	if (writeDown) guardWalletBackupDisable(wallet, flow);
	const shownWords = () => covered() ? void 0 : words();
	useScreenWakeLock(() => !!shownWords());
	const showWords = (value) => {
		setWords(value);
		shownAt || (shownAt = Date.now());
		if (Modes.a11y) grid?.focus({ preventScroll: true });
	};
	const reveal = async () => {
		if (busy()) return;
		const attempt = ++revealAttempt;
		const current = () => attempt === revealAttempt;
		setBusy(true);
		try {
			if (parked) {
				const parkedWords = await store.session.revealParked(parked);
				if (current()) showWords(parkedWords);
				return;
			}
			await ensureWalletKey(store, "Wallet.Phrase.PasswordText");
			if (!current()) return;
			const revealed = await store.session.revealPhrase(store.status());
			if (current()) showWords(revealed);
		} catch (err) {
			if (isUserCancel(err) || disposed) return;
			else if (err?.type === "WALLET_KEY_MISSING") wallet.router.replace("restore", {});
			else if (parked && err?.type === "ROTATION_PENDING") showWalletAlert({
				title: "Wallet.Backup.PhraseUpdatePendingTitle",
				text: "Wallet.Conflict.UpdatePendingText"
			});
			else showWalletError(err, "Wallet.Phrase.ErrorTitle", parked ? "Wallet.Phrase.Error" : void 0);
		} finally {
			setBusy(false);
		}
	};
	const cover = (value) => {
		setCovered(value);
		if (value && !given) {
			++revealAttempt;
			setWords(void 0);
		}
	};
	const hidden = () => getAppWindow().document.visibilityState === "hidden";
	const onVisibility = () => cover(hidden() || !!PasscodeLockScreenController.getIsLocked());
	const unbindVisibility = bindActiveWindowListener((win) => win.document, "visibilitychange", onVisibility);
	const unwatchWindow = onAppWindowChange(onVisibility);
	const lockCheck = window.setInterval(() => {
		if (!!PasscodeLockScreenController.getIsLocked() !== covered() && !hidden()) onVisibility();
	}, LOCK_CHECK_INTERVAL);
	onCleanup(() => {
		disposed = true;
		++revealAttempt;
		unbindVisibility();
		unwatchWindow();
		clearInterval(lockCheck);
		setWords(void 0);
		if (given) given.fill("");
		if (!handedOver) {
			if (rotation) store.session.abandonRotation();
			flow?.end();
		}
	});
	const title = rotation ? "WalletNewSecretPhrase" : "WalletYourRecoveryPhrase";
	const text = rotation ? "WalletNewSecretPhraseInfo" : "WalletRecoveryPhraseInfo";
	let body;
	createEffect(on(shownWords, () => queueMicrotask(() => updateScrollRegionFocusable(body, langPack_default.format(title, true)))));
	return [
		createComponent(WalletHeader, { back: true }),
		(() => {
			var _el$ = _tmpl$2();
			var _ref$ = body;
			typeof _ref$ === "function" ? use(_ref$, _el$) : body = _el$;
			insert(_el$, createComponent(Show, {
				get when() {
					return shownWords();
				},
				get fallback() {
					return createComponent(Show, {
						when: !given,
						get children() {
							return [createComponent(MediaHeader, { get children() {
								return [
									createComponent(MediaHeader.Sticker, {
										name: "WalletWordList",
										size: 100,
										restartOnClick: false
									}),
									createComponent(MediaHeader.Title, { get children() {
										return i18n("WalletRecoveryPhraseLearnTitle");
									} }),
									createComponent(MediaHeader.Subtitle, { get children() {
										return i18n("WalletRecoveryPhraseInfo");
									} })
								];
							} }), (() => {
								var _el$3 = _tmpl$2();
								insert(_el$3, createComponent(For, {
									each: WARNINGS,
									children: (warning) => createComponent(Row, {
										get ["class"]() {
											return phrase_module_default.warning;
										},
										get children() {
											return [createComponent(Row.Icon, {
												get icon() {
													return warning.icon;
												},
												"class": "primary",
												noBackground: true
											}), createComponent(Row.Title, {
												get ["class"]() {
													return phrase_module_default.warningText;
												},
												get children() {
													return i18n(warning.text);
												}
											})];
										}
									})
								}));
								createRenderEffect(() => className(_el$3, phrase_module_default.warnings));
								return _el$3;
							})()];
						}
					});
				},
				get children() {
					return [createComponent(MediaHeader, { get children() {
						return [
							createComponent(MediaHeader.Sticker, {
								name: "WalletWordList",
								size: 100,
								restartOnClick: false
							}),
							createComponent(MediaHeader.Title, { get children() {
								return i18n(title);
							} }),
							createComponent(MediaHeader.Subtitle, { get children() {
								return i18n(text);
							} })
						];
					} }), (() => {
						var _el$2 = _tmpl$();
						var _ref$2 = grid;
						typeof _ref$2 === "function" ? use(_ref$2, _el$2) : grid = _el$2;
						insert(_el$2, createComponent(For, {
							get each() {
								return shownWords();
							},
							children: (word) => (() => {
								var _el$4 = _tmpl$3();
								insert(_el$4, word);
								createRenderEffect(() => className(_el$4, phrase_module_default.word));
								return _el$4;
							})()
						}));
						createRenderEffect((_p$) => {
							var _v$ = phrase_module_default.grid, _v$2 = Modes.a11y ? -1 : void 0;
							_v$ !== _p$.e && className(_el$2, _p$.e = _v$);
							_v$2 !== _p$.t && setAttribute(_el$2, "tabindex", _p$.t = _v$2);
							return _p$;
						}, {
							e: void 0,
							t: void 0
						});
						return _el$2;
					})()];
				}
			}));
			createRenderEffect(() => className(_el$, wallet_module_default.body));
			return _el$;
		})(),
		createComponent(PopupElement.Footer, { get children() {
			return createComponent(Show, {
				get when() {
					return words();
				},
				get fallback() {
					return createComponent(PopupElement.FooterButton, {
						langKey: "WalletRecoveryPhraseLearnButton",
						get disabled() {
							return busy();
						},
						callback: () => {
							reveal();
							return false;
						}
					});
				},
				get children() {
					return createComponent(PopupElement.FooterButton, {
						langKey: writeDown ? "WalletContinue" : "WalletDone",
						get disabled() {
							return covered();
						},
						callback: () => {
							if (!writeDown) wallet.router.pop();
							else if (isBackupWriteDownTooQuick(shownAt, Date.now())) showWalletWriteDownTooQuick();
							else {
								handedOver = true;
								wallet.router.replace("quiz", {
									words: words().slice(),
									mode,
									flow
								});
							}
							return false;
						}
					});
				}
			});
		} })
	];
}
//#endregion
export { WalletPhraseScreen as default };
