//# allFunctionsCalledOnLoad
import { a as i18n, u as langPack_default } from "./langPack-BmdJGr44.js";
import { C as createSignal, D as getOwner, M as onCleanup, P as runWithOwner, _ as createMemo, c as Suspense, g as createEffect, j as on, o as Match, p as createComponent, s as Show, u as Switch, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { c as insert, f as setAttribute, g as template, o as className, s as delegateEvents } from "./web-BPyQozky.js";
import { t as liteMode } from "./liteMode-DeLStZfQ.js";
import { t as classNames } from "./classNames-DxGDjmvw.js";
import { t as IconTsx } from "./iconTsx-B4lOk4A6.js";
import { t as getMiddleware } from "./middleware-D6HuIqPm.js";
import { A as AvatarNewTsx, i as Row, sn as shortAddress } from "./confirmationPopup-Bz6mK0o-.js";
import { n as wrapEmojiText } from "./wrapEmojiText-DT39R5Tj.js";
import { i as emptyPlaceholder } from "./appSelectPeers-BYpCZNpe.js";
import { a as Section } from "./emailVerification-C8QYZSyu.js";
import { r as toastNew } from "./toast-B6VD5M7R.js";
import { t as PeerTitleTsx } from "./peerTitleTsx-DcpEYRoE.js";
import { p as useWallet } from "./stream-DZrVqY75.js";
import { t as WalletHeader } from "./parts-D2eDZtIN.js";
import { i as walletError } from "./walletSession-BmKSk61G.js";
import { getWalletErrorLangKey, toastWalletError } from "./send-CchmriGl.js";
import { classifyRecipientInput, getRecentRecipients, resolveRecipientInput, resolveUserRecipient } from "./recipient-WQR-xzxK.js";
import { n as setWalletPickerQuery, t as WalletPicker } from "./picker-dZ3R_SfV.js";
var recipient_module_default = {
	paste: "_paste_1vkk6_6",
	fadeIn: "_fadeIn_1vkk6_11",
	failure: "_failure_1vkk6_15"
};
//#endregion
//#region src/components/wallet/screens/recipient.tsx
var _tmpl$ = /*#__PURE__*/ template(`<button type=button>`);
var _tmpl$2 = /*#__PURE__*/ template(`<span dir=ltr>`);
var _tmpl$3 = /*#__PURE__*/ template(`<div role=status>`);
/** iOS resolves what is typed after this pause */
var RESOLVE_DEBOUNCE = 400;
/**
* Who to send to — the app's people picker (tdesktop: WalletSendRecipientBox): recent recipients first, then
* chats and contacts, users only. An address, a .ton or .t.me name or a ton:// link typed into its search is checked
* as it is typed (iOS): the Telegram user its wallet belongs to, or the address itself, is offered above the list, an
* address that is none says so. The pick goes on to the amount screen, or for a collectible to its confirmation.
*/
function WalletRecipientScreen(props) {
	const wallet = useWallet();
	const store = wallet.store;
	const nft = props.params?.nft;
	const isCurrent = wallet.router.watchCurrent();
	let selector;
	let busy = false;
	/** `resolve` gives the recipient; a failure is said and the picker stays */
	const choose = async (resolve) => {
		if (busy) return;
		busy = true;
		try {
			const params = await resolve();
			if (!isCurrent()) return;
			if (!params) throw new Error("no recipient");
			if (!nft) {
				await wallet.router.push("amount", params);
				return;
			}
			const own = store.status().state?.address;
			if (own && await store.session.isSameAddress(own, params.recipient.address)) throw walletError("WALLET_NFT_OWN_WALLET");
			if (!isCurrent()) return;
			await wallet.router.push("collectibleSend", {
				recipient: params.recipient,
				nft
			});
		} catch (err) {
			if (isCurrent()) toastWalletError(err);
		} finally {
			busy = false;
		}
	};
	const [search, setSearch] = createSignal("");
	const input = createMemo(() => classifyRecipientInput(search()), void 0, { equals: (a, b) => a.kind === b.kind && a.value === b.value });
	const [resolution, setResolution] = createSignal();
	let resolveTimer, resolveRevision = 0;
	createEffect(on(input, (value) => {
		clearTimeout(resolveTimer);
		const revision = ++resolveRevision;
		if (value.kind === "search") {
			setResolution(void 0);
			return;
		}
		setResolution({ state: "resolving" });
		resolveTimer = window.setTimeout(() => {
			resolveRecipientInput(store, value).then((link) => {
				if (revision === resolveRevision) setResolution({
					state: "resolved",
					link
				});
			}, (error) => {
				if (revision === resolveRevision) setResolution({
					state: "failed",
					error
				});
			});
		}, RESOLVE_DEBOUNCE);
	}));
	onCleanup(() => {
		clearTimeout(resolveTimer);
		++resolveRevision;
	});
	const resolved = () => {
		const value = resolution();
		return value?.state === "resolved" ? value.link : void 0;
	};
	const failure = () => {
		const value = resolution();
		return value?.state === "failed" ? value.error : void 0;
	};
	const canPaste = !!navigator.clipboard?.readText;
	const paste = async () => {
		let text;
		try {
			text = (await navigator.clipboard.readText()).trim();
		} catch (err) {
			return;
		}
		if (!selector || classifyRecipientInput(text).kind === "search") {
			toastNew({ langPackKey: "Wallet.Recipient.InvalidAddress" });
			return;
		}
		setWalletPickerQuery(selector, text);
	};
	return [createComponent(WalletHeader, {
		get titleElement() {
			return nft ? i18n("WalletTransferCollectible") : i18n("WalletSendGrams");
		},
		back: true,
		get children() {
			return createComponent(Show, {
				get when() {
					return canPaste && !search();
				},
				get children() {
					var _el$ = _tmpl$();
					_el$.$$click = paste;
					insert(_el$, createComponent(IconTsx, { icon: "clipboard" }));
					createRenderEffect((_p$) => {
						var _v$ = classNames("btn-icon", recipient_module_default.paste), _v$2 = langPack_default.format("WalletPaste", true), _v$3 = langPack_default.format("WalletPaste", true);
						_v$ !== _p$.e && className(_el$, _p$.e = _v$);
						_v$2 !== _p$.t && setAttribute(_el$, "aria-label", _p$.t = _v$2);
						_v$3 !== _p$.a && setAttribute(_el$, "title", _p$.a = _v$3);
						return _p$;
					}, {
						e: void 0,
						t: void 0,
						a: void 0
					});
					return _el$;
				}
			});
		}
	}), createComponent(WalletPicker, {
		ref: (value) => selector = value,
		get options() {
			return getRecentRecipients(store).catch(() => []).then((recent) => ({
				filterPeerTypeBy: ["isRegularUser"],
				exceptSelf: true,
				meAsSaved: false,
				prependPeerIds: recent,
				onSelect: (peerId) => {
					choose(async () => ({ recipient: await resolveUserRecipient(store, peerId.toUserId()) }));
					return false;
				}
			}));
		},
		onSearch: setSearch,
		listHidden: () => input().kind !== "search",
		get aboveList() {
			return createComponent(Show, {
				get when() {
					return input().kind !== "search";
				},
				get children() {
					return createComponent(Switch, { get children() {
						return [createComponent(Match, {
							get when() {
								return resolved();
							},
							keyed: true,
							children: (link) => createComponent(RecipientResult, {
								link,
								onClick: () => choose(async () => link)
							})
						}), createComponent(Match, {
							get when() {
								return failure();
							},
							keyed: true,
							children: (error) => createComponent(RecipientFailure, {
								get input() {
									return input();
								},
								error
							})
						})];
					} });
				}
			});
		}
	})];
}
/** Comes in with a fade (iOS: 0.2 s), when fades play */
function fadeClass() {
	return liteMode.isAvailable("animations") ? recipient_module_default.fadeIn : void 0;
}
/** The typed address: the Telegram user whose wallet it is, or the address (with the name it was found by) */
function RecipientResult(props) {
	const recipient = props.link.recipient;
	const peerId = recipient.userId?.toPeerId(false);
	const subtitle = () => recipient.domain ? (() => {
		var _el$2 = _tmpl$2();
		insert(_el$2, () => recipient.domain);
		return _el$2;
	})() : i18n("WalletGramWalletAddress");
	return createComponent(Section, {
		get ["class"]() {
			return fadeClass();
		},
		get children() {
			return createComponent(Row, {
				get clickable() {
					return props.onClick;
				},
				get children() {
					return createComponent(Show, {
						when: peerId,
						get fallback() {
							return [
								createComponent(Row.Icon, { icon: "gram_filled" }),
								createComponent(Row.Title, { get children() {
									var _el$4 = _tmpl$2();
									insert(_el$4, () => shortAddress(recipient.address, 6));
									return _el$4;
								} }),
								createComponent(Row.Subtitle, { get children() {
									return subtitle();
								} })
							];
						},
						get children() {
							return [
								createComponent(Row.Media, {
									size: "abitbigger",
									get children() {
										return createComponent(AvatarNewTsx, {
											peerId,
											size: 42
										});
									}
								}),
								createComponent(Row.Title, { get children() {
									return createComponent(Suspense, { get children() {
										return createComponent(PeerTitleTsx, { peerId });
									} });
								} }),
								createComponent(Row.Subtitle, { get children() {
									var _el$3 = _tmpl$2();
									insert(_el$3, () => shortAddress(recipient.address, 6));
									return _el$3;
								} })
							];
						}
					});
				}
			});
		}
	});
}
/** Nothing behind what was typed: the app's "No Results", with iOS's words for an address and for a name */
function RecipientFailure(props) {
	const middlewareHelper = getMiddleware();
	onCleanup(() => middlewareHelper.destroy());
	const description = () => {
		const type = props.error?.type;
		if (type === "WALLET_ADDRESS_INVALID") return i18n("Wallet.Recipient.InvalidAddressText");
		if (type === "WALLET_NAME_NOT_FOUND") return i18n("WalletSearchNoResults", [wrapEmojiText(props.input.value)]);
		return i18n(getWalletErrorLangKey(props.error));
	};
	const [element, setElement] = createSignal();
	const owner = getOwner();
	emptyPlaceholder({
		middleware: middlewareHelper.get(),
		title: () => i18n("SearchEmptyViewTitle"),
		description,
		hide: () => false
	}).then((container) => runWithOwner(owner, () => setElement(container)));
	return (() => {
		var _el$5 = _tmpl$3();
		insert(_el$5, element);
		createRenderEffect(() => className(_el$5, classNames(recipient_module_default.failure, fadeClass())));
		return _el$5;
	})();
}
delegateEvents(["click"]);
//#endregion
export { WalletRecipientScreen as default };
