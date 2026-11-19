//# allFunctionsCalledOnLoad
import { n as rootScope } from "./rootScope-CZS0lmz8.js";
import { C as createSignal, M as onCleanup, b as createResource, g as createEffect, i as For, j as on, p as createComponent, s as Show } from "./solid-9Vxm0VIz.js";
import { t as cancelEvent } from "./cancelEvent-Cw8vYZHp.js";
import { c as insert, g as template, u as memo } from "./web-BPyQozky.js";
import { r as useHotReloadGuard } from "./hotReloadGuard-BUNVkeQ4.js";
import { M as LazyLoadQueue } from "./renderer-L80wjxct.js";
import { t as Button } from "./buttonTsx-Bwphkm9r.js";
import { t as subscribeOn } from "./subscribeOn-DnCla7ws.js";
import { U as openBoosts } from "./appDialogsManager-CXguiKc3.js";
import { i as usePromiseCollector } from "./mediaHeader-CnpQNwOl.js";
import { t as anchorCallback } from "./anchorCallback-BbwAJdBk.js";
import { a as Section } from "./emailVerification-C8QYZSyu.js";
import { n as useSuperTab } from "./superTabProvider-LtveyH7W.js";
import { l as getGroupStickerSet, m as showStickersPopup } from "./emoticonsDropdown-Cb_qGCUN.js";
import { o as getStickerSetInputByStickerSet } from "./pickKeys-Ckq7_h-r.js";
import { t as StickerSetRow } from "./stickerSetRow-Dh90LptU.js";
import { n as SearchLoading, t as SearchEmpty } from "./searchStatus-DMXeLaKl.js";
//#region src/components/sidebarRight/tabs/groupStickers.tsx
var _tmpl$ = /*#__PURE__*/ template(`<div class=input-wrapper>`);
var SEARCH_DEBOUNCE = 300;
var STICKERS_BOT_USERNAME = "stickers";
/**
* Accepts what a user is likely to paste: a full `t.me/addstickers/name` link,
* a bare short name or a `@name`.
*/
function extractStickerSetShortName(value) {
	const trimmed = value.trim();
	const match = /(?:^|\/)(?:addstickers|addemoji)\/([a-zA-Z0-9_]+)/.exec(trimmed);
	if (match) return match[1];
	return /^@?[a-zA-Z0-9_]+$/.test(trimmed) ? trimmed.replace(/^@/, "") : "";
}
async function loadGroupStickersData(tab) {
	const { chatId } = tab.payload;
	const isEmoji = !!tab.payload.isEmoji;
	const [chatFull, chat, appConfig, allStickers] = await Promise.all([
		tab.managers.appProfileManager.getChatFull(chatId),
		tab.managers.appChatsManager.getChat(chatId),
		tab.managers.apiManager.getAppConfig(),
		isEmoji ? tab.managers.appStickersManager.getEmojiStickers() : tab.managers.appStickersManager.getAllStickers()
	]);
	return {
		chatId,
		isEmoji,
		appConfig,
		chat,
		currentSet: getGroupStickerSet(chatFull, isEmoji),
		sets: allStickers.sets
	};
}
function GroupStickersForm(props) {
	const [tab] = useSuperTab();
	const { I18n, InputFieldTsx, appImManager, hideToast, i18n, toastNew } = useHotReloadGuard();
	const { chatId, isEmoji } = props.data;
	const lazyLoadQueue = new LazyLoadQueue();
	const [chat, setChat] = createSignal(props.data.chat);
	const [currentSet, setCurrentSet] = createSignal(props.data.currentSet);
	const [query, setQuery] = createSignal(props.data.currentSet?.short_name || "");
	const [searching, setSearching] = createSignal(false);
	const [searchFinished, setSearchFinished] = createSignal(false);
	const [foundSet, setFoundSet] = createSignal();
	let searchTimer;
	let searchRequestId = 0;
	let applyRevision = 0;
	let pendingApplyCount = 0;
	let applyQueue = Promise.resolve();
	let confirmedSet = props.data.currentSet;
	let disposed = false;
	onCleanup(() => {
		disposed = true;
		++applyRevision;
		++searchRequestId;
		window.clearTimeout(searchTimer);
		lazyLoadQueue.clear();
	});
	createEffect(on(query, (value) => {
		++searchRequestId;
		window.clearTimeout(searchTimer);
		setFoundSet(void 0);
		setSearchFinished(false);
		const shortName = extractStickerSetShortName(value);
		if (!shortName) {
			setSearching(false);
			return;
		}
		const requestId = searchRequestId;
		setSearching(true);
		searchTimer = window.setTimeout(async () => {
			const stickerSet = await tab.managers.appStickersManager.getStickerSet(shortName);
			if (requestId !== searchRequestId) return;
			const set = stickerSet?.set;
			setFoundSet(set && !!set.pFlags?.emojis === isEmoji ? set : void 0);
			setSearching(false);
			setSearchFinished(true);
		}, SEARCH_DEBOUNCE);
	}, { defer: true }));
	subscribeOn(rootScope)("chat_full_update", async (updatedChatId) => {
		if (updatedChatId !== chatId) return;
		const chatFull = await tab.managers.appProfileManager.getChatFull(chatId);
		confirmedSet = getGroupStickerSet(chatFull, isEmoji);
		if (!pendingApplyCount) setCurrentSet(confirmedSet);
	});
	subscribeOn(rootScope)("chat_update", async (updatedChatId) => {
		if (updatedChatId !== chatId) return;
		setChat(await tab.managers.appChatsManager.getChat(chatId));
	});
	const isSearching = () => searching() || searchFinished();
	const displayedSet = () => isSearching() ? foundSet() : currentSet();
	const isCurrent = (set) => currentSet()?.id === set.id;
	const requiredLevel = () => props.data.appConfig.group_emoji_stickers_level_min ?? 0;
	const hasRequiredLevel = () => (chat()?.level ?? 0) >= requiredLevel();
	const showLevelToast = () => {
		toastNew({
			langPackKey: "GroupEmojiPack.LevelMin",
			langPackArguments: [requiredLevel(), anchorCallback(() => {
				hideToast();
				openBoosts({
					peerId: chatId.toPeerId(true),
					slider: tab.slider,
					reason: {
						titleLangKey: "GroupEmojiPack.BoostTitle",
						descriptionLangKey: "GroupEmojiPack.BoostDescription",
						descriptionArgs: [requiredLevel()]
					}
				});
			})]
		});
	};
	const applySet = async (set) => {
		const previousSet = currentSet();
		const revision = ++applyRevision;
		setCurrentSet(set);
		if (set && isEmoji && !hasRequiredLevel()) {
			showLevelToast();
			setCurrentSet(previousSet);
			--applyRevision;
			return;
		}
		++pendingApplyCount;
		const request = applyQueue.then(() => tab.managers.appChatsManager.setGroupStickerSet(chatId, set, isEmoji));
		applyQueue = request.then(() => void 0, () => void 0);
		try {
			await request;
		} catch (err) {
			if (!disposed && revision === applyRevision) {
				setCurrentSet(confirmedSet);
				toastNew({ langPackKey: "Error.AnError" });
			}
			return;
		} finally {
			--pendingApplyCount;
		}
		confirmedSet = set;
		if (disposed || revision !== applyRevision) return;
		if (extractStickerSetShortName(query()) !== set?.short_name) setQuery(set?.short_name || "");
		toastNew({ langPackKey: set ? isEmoji ? "GroupEmojiPack.Updated" : "GroupStickers.Updated" : isEmoji ? "GroupEmojiPack.Removed" : "GroupStickers.Removed" });
	};
	const renderSearchedSetAction = (set) => {
		if (isCurrent(set)) return createComponent(Button, {
			"class": "btn-icon danger",
			icon: "delete",
			get ["aria-label"]() {
				return I18n.format(isEmoji ? "GroupEmojiPack.Remove" : "GroupStickers.Remove", true);
			},
			onClick: (event) => {
				cancelEvent(event);
				return applySet();
			}
		});
		return createComponent(Button, {
			"class": "btn-primary btn-color-primary btn-control-small",
			text: "Stickers.SearchAdd",
			onClick: (event) => {
				cancelEvent(event);
				return applySet(set);
			}
		});
	};
	return [createComponent(Section, {
		caption: isEmoji ? "GroupEmojiPack.LinkInfo" : "GroupStickers.LinkInfo",
		"data-group-stickers-section": "search",
		get children() {
			return [
				(() => {
					var _el$ = _tmpl$();
					insert(_el$, createComponent(InputFieldTsx, {
						label: isEmoji ? "GroupEmojiPack.LinkPlaceholder" : "GroupStickers.LinkPlaceholder",
						get value() {
							return query();
						},
						onRawInput: setQuery,
						plainText: true,
						instanceRef: (field) => {
							field.input.setAttribute("autocapitalize", "none");
							field.input.setAttribute("autocorrect", "off");
							field.input.spellcheck = false;
						}
					}));
					return _el$;
				})(),
				createComponent(Show, {
					get when() {
						return searching();
					},
					get children() {
						return createComponent(SearchLoading, { get ["aria-label"]() {
							return I18n.format("Loading", true);
						} });
					}
				}),
				createComponent(Show, {
					get when() {
						return displayedSet();
					},
					keyed: true,
					children: (set) => createComponent(StickerSetRow, {
						set,
						isEmoji,
						lazyLoadQueue,
						action: () => renderSearchedSetAction(set),
						onClick: () => showStickersPopup(getStickerSetInputByStickerSet(set), isEmoji)
					})
				}),
				createComponent(Show, {
					get when() {
						return memo(() => !!searchFinished())() && !foundSet();
					},
					get children() {
						return createComponent(SearchEmpty, { get children() {
							return i18n(isEmoji ? "AddEmojiNotFound" : "GroupStickers.NotFound");
						} });
					}
				})
			];
		}
	}), createComponent(Section, {
		name: isEmoji ? "GroupEmojiPack.MyPacks" : "GroupStickers.MySets",
		get caption() {
			return i18n(isEmoji ? "GroupEmojiPack.CreateInfo" : "GroupStickers.CreateInfo", [anchorCallback(() => appImManager.openUsername({ userName: STICKERS_BOT_USERNAME }))]);
		},
		"data-group-stickers-section": "own",
		get children() {
			return createComponent(For, {
				get each() {
					return props.data.sets;
				},
				children: (set) => createComponent(StickerSetRow, {
					set,
					isEmoji,
					lazyLoadQueue,
					get radioChecked() {
						return isCurrent(set);
					},
					radioName: `group-${isEmoji ? "emoji" : "sticker"}-${chatId}`,
					get radioValue() {
						return String(set.id);
					},
					onRadioChange: (checked) => checked && !isCurrent(set) && applySet(set)
				})
			});
		}
	})];
}
var GroupStickersTab = () => {
	const [tab] = useSuperTab();
	const promiseCollector = usePromiseCollector();
	const initialPromise = loadGroupStickersData(tab);
	promiseCollector.collect(initialPromise);
	const [data] = createResource(() => initialPromise);
	return createComponent(Show, {
		get when() {
			return data();
		},
		keyed: true,
		children: (loaded) => createComponent(GroupStickersForm, { data: loaded })
	});
};
//#endregion
export { GroupStickersTab as default, extractStickerSetShortName };
