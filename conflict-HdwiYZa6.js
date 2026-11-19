//# allFunctionsCalledOnLoad
import { a as i18n } from "./langPack-BmdJGr44.js";
import { C as createSignal, M as onCleanup, g as createEffect, i as For, j as on, p as createComponent, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { c as insert, g as template, o as className } from "./web-BPyQozky.js";
import { t as classNames } from "./classNames-DxGDjmvw.js";
import { R as formatFullSentTimeRaw } from "./index-B7axFZql.js";
import { i as Row, in as gramsToNumber, nn as formatGrams, t as confirmationPopup } from "./confirmationPopup-Bz6mK0o-.js";
import { a as Section } from "./emailVerification-C8QYZSyu.js";
import { r as toastNew } from "./toast-B6VD5M7R.js";
import { p as useWallet } from "./stream-DZrVqY75.js";
import { t as wallet_module_default } from "./wallet.module-3nQsE2jy.js";
import { o as copyWalletAddress, t as WalletHeader } from "./parts-D2eDZtIN.js";
import { t as WalletAddressGroups } from "./addressGroups-CCa8-ngl.js";
import { i as showWalletAlert } from "./alerts-DVBlV8XN.js";
import { t as keys_module_default } from "./keys.module-BPV1871L.js";
var conflict_module_default = {
	addressTitle: "_addressTitle_157av_6",
	address: "_address_157av_6"
};
//#endregion
//#region src/components/wallet/screens/conflict.tsx
var _tmpl$ = /*#__PURE__*/ template(`<div>`);
/**
* The wallet used before on this device (tdesktop's conflict box): its address, its phrase to save, and "Switch
* Now", which drops its key so the Telegram wallet goes on alone. Opened from the main screen's notice, or by an
* action that needs the key: that one goes on once no old key is left, and ends when the user leaves first.
*/
function WalletConflictScreen(props) {
	const wallet = useWallet();
	const store = wallet.store;
	const [busy, setBusy] = createSignal(false);
	const wallets = () => store.parked().wallets;
	const leave = wallet.router.bindLeave();
	let shown = false, settled = false;
	onCleanup(() => {
		if (!settled) props.params?.onLeft?.();
	});
	createEffect(on(() => wallets().length, (length) => {
		if (length) {
			shown = true;
			return;
		}
		if (!shown || settled) return;
		settled = true;
		leave();
		props.params?.onSwitched?.();
	}));
	const switchNow = async (item) => {
		if (busy()) return;
		try {
			await confirmationPopup({
				titleLangKey: "Wallet.Conflict.Switch",
				descriptionLangKey: "Wallet.Conflict.SwitchText",
				button: {
					langKey: "Wallet.Conflict.Switch",
					isDanger: true
				}
			});
		} catch (err) {
			return;
		}
		setBusy(true);
		try {
			await store.session.dropParked(item.record);
			await store.refreshParked();
		} catch (err) {
			if (err?.type === "ROTATION_PENDING") showWalletAlert({
				title: "Wallet.Backup.PhraseUpdatePendingTitle",
				text: "Wallet.Conflict.UpdatePendingText"
			});
			else toastNew({ langPackKey: "Wallet.Conflict.SwitchError" });
		} finally {
			setBusy(false);
		}
	};
	return [createComponent(WalletHeader, {
		title: "Wallet.Conflict.Title",
		back: true
	}), (() => {
		var _el$ = _tmpl$();
		insert(_el$, createComponent(For, {
			get each() {
				return wallets();
			},
			children: (item, index) => createComponent(Section, {
				get caption() {
					return index() ? void 0 : "Wallet.Conflict.Text";
				},
				captionTop: true,
				get ["class"]() {
					return keys_module_default.section;
				},
				get children() {
					return [
						createComponent(ParkedAddressRow, { item }),
						createComponent(Row, {
							clickable: () => wallet.router.push("phrase", { parked: item.record }),
							get children() {
								return [createComponent(Row.Icon, { icon: "key" }), createComponent(Row.Title, { get children() {
									return i18n("WalletRecoveryPhraseLearnButton");
								} })];
							}
						}),
						createComponent(Row, {
							clickable: () => switchNow(item),
							color: "danger",
							get disabled() {
								return busy();
							},
							get children() {
								return [createComponent(Row.Icon, { icon: "delete" }), createComponent(Row.Title, { get children() {
									return i18n("Wallet.Conflict.Switch");
								} })];
							}
						})
					];
				}
			})
		}));
		createRenderEffect(() => className(_el$, classNames(wallet_module_default.body, keys_module_default.body)));
		return _el$;
	})()];
}
/**
* The old wallet's address in iOS's checkerboard of groups, and under it what it holds and when it was last used
* here (iOS: the previous wallets of Keys & Backup)
*/
function ParkedAddressRow(props) {
	const { store } = useWallet();
	const record = props.item.record;
	const [address, setAddress] = createSignal(record.address);
	store.session.friendlyAddress(record.address).then(setAddress, () => {});
	const copy = () => copyWalletAddress(address());
	const amount = () => {
		const nanos = props.item.nanos;
		const fragment = document.createDocumentFragment();
		fragment.append(nanos !== void 0 ? formatGrams(nanos, 2) : "—", " ", i18n("Wallet.Card.Ticker", [nanos !== void 0 ? gramsToNumber(nanos) : 2]));
		return fragment;
	};
	return createComponent(Row, {
		clickable: copy,
		get children() {
			return [
				createComponent(Row.Icon, { icon: "wallet" }),
				createComponent(Row.Title, {
					get ["class"]() {
						return conflict_module_default.addressTitle;
					},
					get children() {
						return createComponent(WalletAddressGroups, {
							get address() {
								return address();
							},
							perLine: 6,
							get ["class"]() {
								return conflict_module_default.address;
							}
						});
					}
				}),
				createComponent(Row.Subtitle, { get children() {
					return i18n("WalletPreviousWalletLastUsed", [amount(), formatFullSentTimeRaw(Math.floor(record.date / 1e3)).dateEl]);
				} })
			];
		}
	});
}
//#endregion
export { WalletConflictScreen as default };
