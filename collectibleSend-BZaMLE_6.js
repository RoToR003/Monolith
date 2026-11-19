//# allFunctionsCalledOnLoad
import { i as __toESM } from "./rolldown-runtime-CwcJO0Gh.js";
import { a as i18n } from "./langPack-BmdJGr44.js";
import { C as createSignal, M as onCleanup, _ as createMemo, d as batch, g as createEffect, j as on, p as createComponent, s as Show, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { c as insert, g as template, o as className, u as memo } from "./web-BPyQozky.js";
import { t as classNames } from "./classNames-DxGDjmvw.js";
import { n as PopupElement } from "./indexTsx-v9mB9bAq.js";
import { en as compareNanos, ln as walletNftName, nn as formatGrams } from "./confirmationPopup-Bz6mK0o-.js";
import { t as require_BigInteger } from "./BigInteger-0a0WsWCs.js";
import { a as Section } from "./emailVerification-C8QYZSyu.js";
import { a as playWalletPendingRow, p as useWallet } from "./stream-DZrVqY75.js";
import { t as wallet_module_default } from "./wallet.module-3nQsE2jy.js";
import { t as WalletHeader } from "./parts-D2eDZtIN.js";
import { t as NFT_TRANSFER_ATTACHED_NANOS } from "./walletSession-BmKSk61G.js";
import { commentBytesLeft, getWalletErrorLangKey, isUserCancel, quoteNftFee, submitNftTransfer, toastWalletError } from "./send-CchmriGl.js";
import { t as WalletCommentField } from "./commentField-DgUXY2-2.js";
import { n as WalletCollectibleHeader } from "./collectibleHeader-Dmuc712q.js";
import { WalletFeeRow, WalletRecipientRow } from "./confirm-DeSwt2oU.js";
//#region src/components/wallet/screens/collectibleSend.tsx
var import_BigInteger = /* @__PURE__ */ __toESM(require_BigInteger());
var _tmpl$ = /*#__PURE__*/ template(`<div>`);
var _tmpl$2 = /*#__PURE__*/ template(`<div role=alert>`);
var FEE_DEBOUNCE = 400;
/**
* The last look before a collectible leaves (tdesktop's collectible transfer box): what, to whom, the network
* fee from a fresh emulation that also checks the wallet still owns it, and an optional public comment. The
* wallet attaches a little Gram to the call and gets back what the transfer leaves, so the fee and that must fit
* the balance.
*/
function WalletCollectibleSendScreen(props) {
	const wallet = useWallet();
	const store = wallet.store;
	const { recipient, nft } = props.params;
	const name = walletNftName(nft);
	const [comment, setComment] = createSignal("");
	const [quote, setQuote] = createSignal();
	const [knownFee, setKnownFee] = createSignal();
	const [busy, setBusy] = createSignal(false);
	let commentField;
	let revision = 0, timer, disposed = false;
	const draft = () => ({
		recipient,
		nft,
		comment: comment().trim() || void 0
	});
	const requote = () => {
		const current = ++revision;
		const operationId = crypto.randomUUID();
		setQuote(void 0);
		return quoteNftFee(store, draft(), operationId).then((fee) => current === revision && !disposed && batch(() => {
			setQuote({
				operationId,
				fee
			});
			setKnownFee(fee);
		}), (error) => current === revision && !disposed && setQuote({
			operationId,
			error
		}));
	};
	createEffect(on(() => comment().trim(), () => {
		clearTimeout(timer);
		++revision;
		setQuote(void 0);
		timer = window.setTimeout(requote, FEE_DEBOUNCE);
	}, { defer: true }));
	requote();
	onCleanup(() => {
		disposed = true;
		clearTimeout(timer);
	});
	const needed = createMemo(() => (0, import_BigInteger.default)(NFT_TRANSFER_ATTACHED_NANOS).add((0, import_BigInteger.default)(knownFee() ?? "0")).toString());
	const insufficient = createMemo(() => {
		const balance = store.status().state?.balance;
		if (balance !== void 0 && compareNanos(needed(), String(balance)) > 0) return true;
		const error = quote()?.error;
		return !!error && getWalletErrorLangKey(error) === "Wallet.Error.Insufficient";
	});
	const refusal = createMemo(() => {
		const error = quote()?.error;
		return error && !insufficient() ? getWalletErrorLangKey(error) : void 0;
	});
	const blocked = () => insufficient() || refusal() === "Wallet.Collectible.NotOwned";
	const tooLong = () => commentBytesLeft(comment()) < 0;
	const send = async () => {
		if (busy() || blocked()) return;
		if (tooLong()) {
			commentField?.refuse();
			return;
		}
		setBusy(true);
		try {
			if (quote()?.fee === void 0) {
				clearTimeout(timer);
				await requote();
			}
			const quoted = quote();
			if (quoted?.fee === void 0 || insufficient()) return;
			const pending = await submitNftTransfer(store, draft(), quoted.operationId);
			playWalletPendingRow(wallet, pending);
		} catch (err) {
			if (isUserCancel(err)) return;
			if (err?.type === "WALLET_KEY_MISSING") {
				wallet.router.push("restore", {});
				return;
			}
			toastWalletError(err);
			if (!disposed) requote();
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
			var _el$ = _tmpl$();
			insert(_el$, createComponent(WalletCollectibleHeader, { item: nft }), null);
			insert(_el$, createComponent(Section, { get children() {
				return [createComponent(WalletRecipientRow, { recipient }), createComponent(WalletFeeRow, { get fee() {
					return memo(() => !!quote())() ? quote().fee ?? "" : void 0;
				} })];
			} }), null);
			insert(_el$, createComponent(WalletCommentField, {
				get value() {
					return comment();
				},
				onInput: setComment,
				onEnter: send,
				get disabled() {
					return busy();
				},
				handleRef: (handle) => commentField = handle
			}), null);
			insert(_el$, createComponent(Show, {
				get when() {
					return comment().trim();
				},
				get children() {
					var _el$2 = _tmpl$();
					insert(_el$2, () => i18n("WalletPublicCommentInfo"));
					createRenderEffect(() => className(_el$2, wallet_module_default.caption));
					return _el$2;
				}
			}), null);
			insert(_el$, createComponent(Show, {
				get when() {
					return insufficient();
				},
				get children() {
					var _el$3 = _tmpl$2();
					insert(_el$3, () => i18n("Wallet.Collectible.TopUpText", [formatGrams(needed(), 4)]));
					createRenderEffect(() => className(_el$3, classNames(wallet_module_default.caption, wallet_module_default.captionError)));
					return _el$3;
				}
			}), null);
			insert(_el$, createComponent(Show, {
				get when() {
					return refusal();
				},
				get children() {
					var _el$4 = _tmpl$2();
					insert(_el$4, () => i18n(refusal()));
					createRenderEffect(() => className(_el$4, classNames(wallet_module_default.caption, wallet_module_default.captionError)));
					return _el$4;
				}
			}), null);
			createRenderEffect(() => className(_el$, wallet_module_default.body));
			return _el$;
		})(),
		createComponent(PopupElement.Footer, { get children() {
			return createComponent(Show, {
				get when() {
					return insufficient();
				},
				get fallback() {
					return createComponent(PopupElement.FooterButton, {
						langKey: "WalletSendAmount",
						langArgs: [name],
						get disabled() {
							return busy() || !quote() || blocked() || tooLong();
						},
						callback: () => {
							send();
							return false;
						}
					});
				},
				get children() {
					return createComponent(PopupElement.FooterButton, {
						langKey: "WalletTopUp",
						callback: () => {
							wallet.router.push("receive");
							return false;
						}
					});
				}
			});
		} })
	];
}
//#endregion
export { WalletCollectibleSendScreen as default };
