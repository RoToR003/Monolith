//# allFunctionsCalledOnLoad
import { a as i18n } from "./langPack-BmdJGr44.js";
import { p as createComponent, s as Show } from "./solid-9Vxm0VIz.js";
import { n as hotReloadGuard } from "./hotReloadGuardProvider-CHEsZRuG.js";
import { i as Row } from "./confirmationPopup-Bz6mK0o-.js";
import { a as Section } from "./emailVerification-C8QYZSyu.js";
//#region src/components/stars/transactionHistory.tsx
function showPeerTransactionHistory(peerId, ton = false) {
	return hotReloadGuard.showStarsPopup({
		historyPeerId: peerId,
		ton
	});
}
function TransactionHistorySection(props) {
	return createComponent(Show, {
		get when() {
			return props.stars || props.ton;
		},
		get children() {
			return createComponent(Section, {
				name: "StarsTransactionsAll",
				get children() {
					return [createComponent(Show, {
						get when() {
							return props.stars;
						},
						get children() {
							return createComponent(Row, {
								clickable: () => showPeerTransactionHistory(props.peerId),
								get children() {
									return [createComponent(Row.Icon, { icon: "star_circle_filled" }), createComponent(Row.Title, { get children() {
										return i18n("TelegramStars");
									} })];
								}
							});
						}
					}), createComponent(Show, {
						get when() {
							return props.ton;
						},
						get children() {
							return createComponent(Row, {
								clickable: () => showPeerTransactionHistory(props.peerId, true),
								get children() {
									return [createComponent(Row.Icon, { icon: "gram_filled" }), createComponent(Row.Title, { get children() {
										return i18n("GramBalance");
									} })];
								}
							});
						}
					})];
				}
			});
		}
	});
}
//#endregion
export { TransactionHistorySection as t };
