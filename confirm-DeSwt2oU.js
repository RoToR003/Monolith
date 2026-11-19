//# allFunctionsCalledOnLoad
import { a as i18n, u as langPack_default } from "./langPack-BmdJGr44.js";
import { C as createSignal, M as onCleanup, _ as createMemo, g as createEffect, i as For, j as on, p as createComponent, s as Show, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { c as insert, g as template, o as className, u as memo } from "./web-BPyQozky.js";
import { n as PopupElement } from "./indexTsx-v9mB9bAq.js";
import { an as groupAddress, i as Row, in as gramsToNumber, nn as formatGrams, tn as formatFiat } from "./confirmationPopup-Bz6mK0o-.js";
import { a as Section } from "./emailVerification-C8QYZSyu.js";
import { o as runWalletSendFlight, p as useWallet } from "./stream-DZrVqY75.js";
import { t as wallet_module_default } from "./wallet.module-3nQsE2jy.js";
import { a as WalletTonAmount, l as showWalletFeesInfo, t as WalletHeader } from "./parts-D2eDZtIN.js";
import { t as WalletGem } from "./gem-7eTuGYEC.js";
import { canEncryptCommentTo, commentBytesLeft, getDeliveredNanos, isGaslessEligible, isUserCancel, openWalletRecipientChat, quoteFee, showWalletSendError, submitWalletTransfer, waitForCommentPrivacy } from "./send-CchmriGl.js";
import { t as WalletCommentField } from "./commentField-DgUXY2-2.js";
import { t as details_module_default } from "./details.module-B1UHcwZQ.js";
//#region src/components/wallet/screens/confirm.tsx
var _tmpl$ = /*#__PURE__*/ template(`<span>`);
var _tmpl$2 = /*#__PURE__*/ template(`<span dir=ltr>`);
var _tmpl$3 = /*#__PURE__*/ template(`<span class=preloader>`);
var _tmpl$4 = /*#__PURE__*/ template(`<div dir=ltr>`);
var _tmpl$5 = /*#__PURE__*/ template(`<div>`);
var _tmpl$6 = /*#__PURE__*/ template(`<div><div><div dir=ltr><span>GRAM`);
var FEE_DEBOUNCE = 400;
/** Where it goes: the .ton name it was found by, and the address. */
function WalletRecipientRow(props) {
	const lines = () => [...props.recipient.domain ? [props.recipient.domain] : [], ...groupAddress(props.recipient.address, 6)];
	return createComponent(Row, { get children() {
		return [createComponent(Row.Title, { get children() {
			var _el$ = _tmpl$();
			insert(_el$, createComponent(For, {
				get each() {
					return lines();
				},
				children: (line, index) => [memo(() => index() ? "\n" : ""), (() => {
					var _el$2 = _tmpl$2();
					insert(_el$2, line);
					return _el$2;
				})()]
			}));
			createRenderEffect(() => className(_el$, details_module_default.address));
			return _el$;
		} }), createComponent(Row.Subtitle, { get children() {
			return i18n("WalletRecipient");
		} })];
	} });
}
/** The quoted network fee: `undefined` while it is quoted, `''` when it could not be, `'free'` when Telegram pays. */
function WalletFeeRow(props) {
	return createComponent(Row, {
		clickable: showWalletFeesInfo,
		get children() {
			return [createComponent(Row.Title, { get children() {
				return createComponent(Show, {
					get when() {
						return props.fee !== void 0;
					},
					get fallback() {
						return _tmpl$3();
					},
					get children() {
						return createComponent(Show, {
							get when() {
								return props.fee !== "free";
							},
							get fallback() {
								return i18n("WalletFeePaidByTelegram");
							},
							get children() {
								return createComponent(Show, {
									get when() {
										return props.fee;
									},
									fallback: "—",
									get children() {
										return ["≈ ", createComponent(WalletTonAmount, { get nanos() {
											return props.fee;
										} })];
									}
								});
							}
						});
					}
				});
			} }), createComponent(Row.Subtitle, { get children() {
				return i18n("WalletFee");
			} })];
		}
	});
}
/**
* The last look before Grams leave for a bare address, or for whoever a .ton name stands for: what, where, for how
* much. The comment can still be changed here, and made private or public with its lock (Android's confirmation
* sheet, iOS's transfer preview). Transfers to Telegram users picked as such skip it, their address is the one
* Telegram knows.
*/
function WalletConfirmScreen(props) {
	const wallet = useWallet();
	const store = wallet.store;
	const draft = props.params;
	const recipient = draft.recipient;
	const [busy, setBusy] = createSignal(false);
	let button, commentField;
	let revision = 0, timer, disposed = false;
	onCleanup(() => {
		disposed = true;
		clearTimeout(timer);
	});
	const [comment, setComment] = createSignal(draft.comment || "");
	const [encrypt, setEncrypt] = createSignal(draft.comment ? !!draft.encryptComment : true);
	const [canEncrypt, setCanEncrypt] = createSignal(draft.canEncrypt ?? (draft.encryptComment || void 0));
	const encryptionCheck = canEncrypt() === void 0 ? canEncryptCommentTo(store, recipient) : void 0;
	encryptionCheck?.then((value) => {
		if (!disposed) setCanEncrypt(value);
	});
	const encrypting = () => !!comment().trim() && encrypt() && canEncrypt() === true;
	const tooLong = createMemo(() => commentBytesLeft(comment()) < 0);
	const current = () => {
		const text = comment().trim();
		return {
			...draft,
			comment: text || void 0,
			encryptComment: text ? encrypting() : void 0,
			payload: text ? void 0 : draft.payload ?? draft.linkPayload
		};
	};
	const [fee, setFee] = createSignal();
	const gasless = draft.sendAll ? Promise.resolve(false) : isGaslessEligible(store, draft);
	const requote = () => {
		const quote = ++revision;
		gasless.then((free) => free ? "free" : quoteFee(store, current())).then((value) => quote === revision && !disposed && setFee(value), () => quote === revision && !disposed && setFee(""));
	};
	requote();
	createEffect(on(() => `${comment().trim()}|${encrypting()}`, () => {
		clearTimeout(timer);
		if (fee() === "free") return;
		++revision;
		setFee(void 0);
		timer = window.setTimeout(requote, FEE_DEBOUNCE);
	}, { defer: true }));
	/** what arrives: all of it, or for the whole balance what the fee leaves of it */
	const quotedFee = () => fee() && fee() !== "free" ? fee() : draft.fee;
	const delivered = () => getDeliveredNanos({
		...draft,
		fee: quotedFee()
	});
	const amountText = () => langPack_default.format("Wallet.GramsAmount", true, [formatGrams(delivered()), langPack_default.format("Wallet.Card.Ticker", true, [gramsToNumber(delivered())])]);
	const waitsForFee = () => !!draft.sendAll && fee() === void 0;
	const send = async () => {
		if (busy() || waitsForFee()) return;
		if (tooLong()) {
			commentField?.refuse();
			return;
		}
		setBusy(true);
		try {
			if (comment().trim() && encrypt() && canEncrypt() === void 0) {
				const value = await waitForCommentPrivacy(encryptionCheck);
				if (disposed) return;
				if (canEncrypt() === void 0) setCanEncrypt(value);
				if (!value || waitsForFee()) return;
			}
			const pending = await submitWalletTransfer(store, {
				...current(),
				gasless: await gasless,
				fee: quotedFee()
			});
			if (draft.openChat && recipient.userId) {
				openWalletRecipientChat(wallet, recipient.userId.toPeerId(false));
				return;
			}
			const rect = button?.getBoundingClientRect();
			runWalletSendFlight(wallet, {
				pending,
				from: rect ? [rect.left + rect.width / 2, rect.top + rect.height / 2] : void 0
			});
		} catch (err) {
			if (err?.type === "WALLET_KEY_MISSING") wallet.router.push("restore", {});
			else if (!isUserCancel(err)) showWalletSendError(err);
		} finally {
			if (!disposed) setBusy(false);
		}
	};
	return [
		createComponent(WalletHeader, {
			title: "Wallet.Confirm.Title",
			back: true
		}),
		(() => {
			var _el$4 = _tmpl$6(), _el$5 = _el$4.firstChild, _el$6 = _el$5.firstChild, _el$7 = _el$6.firstChild;
			insert(_el$5, createComponent(WalletGem, {
				size: 96,
				widthPoints: 52,
				get visible() {
					return wallet.shown;
				}
			}), _el$6);
			insert(_el$6, () => formatGrams(delivered()), _el$7);
			insert(_el$5, createComponent(Show, {
				get when() {
					return store.fiatPerGram();
				},
				get children() {
					var _el$8 = _tmpl$4();
					insert(_el$8, () => formatFiat(delivered(), store.fiatPerGram(), store.currency()));
					createRenderEffect(() => className(_el$8, details_module_default.fiat));
					return _el$8;
				}
			}), null);
			insert(_el$4, createComponent(Section, { get children() {
				return [createComponent(WalletRecipientRow, { recipient }), createComponent(WalletFeeRow, { get fee() {
					return fee();
				} })];
			} }), null);
			insert(_el$4, createComponent(WalletCommentField, {
				get value() {
					return comment();
				},
				onInput: setComment,
				onEnter: send,
				get disabled() {
					return busy();
				},
				get lock() {
					return memo(() => canEncrypt() === true)() ? {
						encrypted: encrypt(),
						onToggle: () => setEncrypt((value) => !value)
					} : void 0;
				},
				handleRef: (handle) => commentField = handle
			}), null);
			insert(_el$4, createComponent(Show, {
				get when() {
					return memo(() => !!comment().trim())() && (canEncrypt() !== void 0 || !encrypt());
				},
				get children() {
					var _el$9 = _tmpl$5();
					insert(_el$9, () => i18n(encrypting() ? "WalletPrivateCommentInfo" : "WalletPublicCommentInfo"));
					createRenderEffect(() => className(_el$9, wallet_module_default.caption));
					return _el$9;
				}
			}), null);
			createRenderEffect((_p$) => {
				var _v$ = wallet_module_default.body, _v$2 = details_module_default.hero, _v$3 = details_module_default.amount, _v$4 = details_module_default.code;
				_v$ !== _p$.e && className(_el$4, _p$.e = _v$);
				_v$2 !== _p$.t && className(_el$5, _p$.t = _v$2);
				_v$3 !== _p$.a && className(_el$6, _p$.a = _v$3);
				_v$4 !== _p$.o && className(_el$7, _p$.o = _v$4);
				return _p$;
			}, {
				e: void 0,
				t: void 0,
				a: void 0,
				o: void 0
			});
			return _el$4;
		})(),
		createComponent(PopupElement.Footer, { get children() {
			return createComponent(PopupElement.FooterButton, {
				ref: (element) => button = element,
				langKey: "WalletSendAmount",
				get langArgs() {
					return [amountText()];
				},
				get disabled() {
					return busy() || waitsForFee() || tooLong();
				},
				callback: () => {
					send();
					return false;
				}
			});
		} })
	];
}
//#endregion
export { WalletFeeRow, WalletRecipientRow, WalletConfirmScreen as default };
