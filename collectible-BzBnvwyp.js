//# allFunctionsCalledOnLoad
import { t as noop } from "./noop-H9NNBLfX.js";
import { n as rootScope } from "./rootScope-CZS0lmz8.js";
import { a as i18n } from "./langPack-BmdJGr44.js";
import { C as createSignal, p as createComponent, s as Show, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { c as insert, g as template, o as className, u as memo } from "./web-BPyQozky.js";
import { n as PopupElement } from "./indexTsx-v9mB9bAq.js";
import { A as AvatarNewTsx, an as groupAddress, i as Row, ln as walletNftName } from "./confirmationPopup-Bz6mK0o-.js";
import { a as Section } from "./emailVerification-C8QYZSyu.js";
import { t as Table } from "./table-Bjjwur0y.js";
import { t as safeWindowOpen } from "./safeWindowOpen-BUv4gymx.js";
import { i as formatPhoneNumber } from "./telInputField-CGJ5qn0G.js";
import { t as GiftAttributeValue } from "./giftAttributeValue-D2nPeLve.js";
import { t as ButtonMenuToggleTsx } from "./buttonMenuToggleTsx-qF_itysT.js";
import { d as getWalletNftTrait, f as isWalletNftGift, l as getWalletNftFragmentUrl, s as classifyWalletNft } from "./collectibles-BaTGzfgT.js";
import { p as useWallet } from "./stream-DZrVqY75.js";
import { t as wallet_module_default } from "./wallet.module-3nQsE2jy.js";
import { o as copyWalletAddress, t as WalletHeader } from "./parts-D2eDZtIN.js";
import { n as WalletCollectibleHeader } from "./collectibleHeader-Dmuc712q.js";
import { t as details_module_default } from "./details.module-B1UHcwZQ.js";
var collectible_module_default = {
	description: "_description_1450g_6",
	table: "_table_1450g_17",
	tableCell: "_tableCell_1450g_21",
	tableKey: "_tableKey_1450g_25",
	owner: "_owner_1450g_29"
};
//#endregion
//#region src/components/wallet/screens/collectible.tsx
var _tmpl$ = /*#__PURE__*/ template(`<div>`);
var _tmpl$2 = /*#__PURE__*/ template(`<span dir=auto>`);
var _tmpl$3 = /*#__PURE__*/ template(`<div dir=auto>`);
var _tmpl$4 = /*#__PURE__*/ template(`<span dir=ltr>`);
/**
* What the collectible is, under its header: a username or a number in Fragment's words (tdesktop's
* `CollectibleAboutText`), anything else in its own, as iOS shows it. A gift says it with its table instead.
*/
function walletNftAbout(item, { kind, key }) {
	if (key && kind === "username") return i18n("Wallet.Collectible.UsernameAbout", ["@" + key]);
	if (key && kind === "number") return i18n("Wallet.Collectible.NumberAbout", ["+" + formatPhoneNumber(key).formatted]);
	if (kind === "gift") return;
	return item.description?.trim() || i18n("Wallet.Collectible.NftAbout");
}
/** The gift's attributes and what each is called in its table, in iOS's order */
var GIFT_TRAITS = [
	["StarGiftModel", "model"],
	["StarGiftPattern", "symbol"],
	["StarGiftBackdrop", "backdrop"]
];
/**
* A gift's table (iOS): its owner, then its model, symbol and backdrop with how rare each is. The rarity comes
* with the gift itself once the server confirmed it is this item; until then, or without that, the item's own
* traits stand alone.
*/
function giftTable(item, gift) {
	const attribute = (trait) => {
		const attributes = gift()?.collectibleAttributes;
		return trait === "model" ? attributes?.model : trait === "backdrop" ? attributes?.backdrop : attributes?.pattern;
	};
	return [["StarGiftOwner", (() => {
		var _el$ = _tmpl$();
		insert(_el$, createComponent(AvatarNewTsx, {
			get peerId() {
				return rootScope.myId;
			},
			size: 24
		}), null);
		insert(_el$, () => i18n("FromYou"), null);
		createRenderEffect(() => className(_el$, collectible_module_default.owner));
		return _el$;
	})()], ...GIFT_TRAITS.map(([langKey, trait]) => [langKey, createComponent(GiftAttributeValue, {
		get name() {
			return attribute(trait)?.name || getWalletNftTrait(item, trait) || "—";
		},
		get rarity() {
			return attribute(trait)?.rarity;
		}
	})])];
}
/** Any other collectible's traits, as its metadata names them */
function traitsTable(item) {
	return (item.attributes || []).filter((attribute) => attribute.trait_type && attribute.value).map((attribute) => [(() => {
		var _el$2 = _tmpl$2();
		insert(_el$2, () => attribute.trait_type);
		return _el$2;
	})(), (() => {
		var _el$3 = _tmpl$2();
		insert(_el$3, () => attribute.value);
		return _el$3;
	})()]);
}
/**
* One collectible: its picture (or animation), name and collection, what it is, its traits, and where it lives
* on the chain. Send hands it on: the recipient screen picks the new owner, the collectible's confirmation sends
* it. A Telegram username, number or gift is sold on Fragment: Sell opens its page there.
*/
function WalletCollectibleScreen(props) {
	const wallet = useWallet();
	const item = props.params.item;
	const explorerUrl = () => `${wallet.store.config().explorerUrl.replace(/\/$/, "")}/${item.address}`;
	const nftClass = classifyWalletNft(item);
	const fragmentUrl = getWalletNftFragmentUrl(nftClass);
	const [foreignGift, setForeignGift] = createSignal(false);
	const [gift, setGift] = createSignal();
	if (fragmentUrl && nftClass.kind === "gift") rootScope.managers.appGiftsManager.getGiftBySlug(nftClass.key).then((gift) => {
		if (isWalletNftGift(gift?.raw, item.address)) setGift(gift);
		else setForeignGift(true);
	}, noop);
	const about = walletNftAbout(item, nftClass);
	const table = nftClass.kind === "gift" ? giftTable(item, gift) : traitsTable(item);
	const sellUrl = () => foreignGift() ? void 0 : fragmentUrl;
	const canSend = () => wallet.store.status().presence === "ready";
	return [
		createComponent(WalletHeader, {
			title: "WalletCollectible",
			back: true,
			get children() {
				return createComponent(ButtonMenuToggleTsx, {
					buttonOptions: { ariaLabel: "MultiAccount.More" },
					direction: "bottom-left",
					buttons: [{
						icon: "link",
						text: "WalletViewInExplorer",
						onClick: () => safeWindowOpen(explorerUrl())
					}]
				});
			}
		}),
		(() => {
			var _el$4 = _tmpl$();
			insert(_el$4, createComponent(WalletCollectibleHeader, {
				item,
				get collection() {
					return nftClass.kind === "gift" || nftClass.kind === "generic";
				},
				get children() {
					return createComponent(Show, {
						when: about,
						get children() {
							var _el$5 = _tmpl$3();
							insert(_el$5, about);
							createRenderEffect(() => className(_el$5, collectible_module_default.description));
							return _el$5;
						}
					});
				}
			}), null);
			insert(_el$4, createComponent(Show, {
				get when() {
					return table.length;
				},
				get children() {
					return createComponent(Table, {
						get ["class"]() {
							return collectible_module_default.table;
						},
						get cellClass() {
							return collectible_module_default.tableCell;
						},
						get keyCellClass() {
							return collectible_module_default.tableKey;
						},
						content: table
					});
				}
			}), null);
			insert(_el$4, createComponent(Section, { get children() {
				return [createComponent(Show, {
					get when() {
						return item.collection_address;
					},
					get children() {
						return createComponent(Row, {
							clickable: () => copyWalletAddress(item.collection_address),
							get children() {
								return [createComponent(Row.Title, { get children() {
									var _el$6 = _tmpl$4();
									insert(_el$6, () => groupAddress(item.collection_address, 6).join("\n"));
									createRenderEffect(() => className(_el$6, details_module_default.address));
									return _el$6;
								} }), createComponent(Row.Subtitle, { get children() {
									return i18n("Wallet.Collectible.Collection");
								} })];
							}
						});
					}
				}), createComponent(Row, {
					clickable: () => copyWalletAddress(item.address),
					get children() {
						return [createComponent(Row.Title, { get children() {
							var _el$7 = _tmpl$4();
							insert(_el$7, () => groupAddress(item.address, 6).join("\n"));
							createRenderEffect(() => className(_el$7, details_module_default.address));
							return _el$7;
						} }), createComponent(Row.Subtitle, { get children() {
							return i18n("WalletAddress");
						} })];
					}
				})];
			} }), null);
			createRenderEffect(() => className(_el$4, wallet_module_default.body));
			return _el$4;
		})(),
		createComponent(Show, {
			get when() {
				return canSend() || sellUrl();
			},
			get children() {
				return createComponent(PopupElement.Footer, { get children() {
					return [createComponent(Show, {
						get when() {
							return canSend();
						},
						get children() {
							return createComponent(PopupElement.FooterButton, {
								get langKey() {
									return sellUrl() ? "WalletSend" : "WalletSendAmount";
								},
								get langArgs() {
									return memo(() => !!sellUrl())() ? void 0 : [walletNftName(item)];
								},
								callback: () => {
									wallet.router.push("recipient", { nft: item });
									return false;
								}
							});
						}
					}), createComponent(Show, {
						get when() {
							return sellUrl();
						},
						get children() {
							return createComponent(PopupElement.FooterButton, {
								langKey: "WalletSell",
								callback: () => {
									safeWindowOpen(sellUrl());
									return false;
								}
							});
						}
					})];
				} });
			}
		})
	];
}
//#endregion
export { WalletCollectibleScreen as default };
