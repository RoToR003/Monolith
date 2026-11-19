//# allFunctionsCalledOnLoad
import { c as IS_MOBILE_SAFARI, h as Modes, r as IS_APPLE } from "./userAgent-ByGXcznk.js";
import { t as IS_TOUCH_SUPPORTED } from "./touchSupport-B2RWO3zD.js";
import { t as themeController } from "./themeController-2cytOOn0.js";
import { n as rootScope } from "./rootScope-CZS0lmz8.js";
import { a as i18n, u as langPack_default } from "./langPack-BmdJGr44.js";
import { C as createSignal, M as onCleanup, R as useContext, _ as createMemo, a as Index, b as createResource, g as createEffect, h as createContext, i as For, j as on, p as createComponent, s as Show, w as createUniqueId, x as createRoot, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { c as useAppState } from "./contentSettings-DMhHR-0w.js";
import { _ as use, c as insert, d as render, f as setAttribute, g as template, n as Portal, o as className, p as setStyleProperty, t as Dynamic } from "./web-BPyQozky.js";
import { r as useHotReloadGuard } from "./hotReloadGuard-BUNVkeQ4.js";
import { n as hotReloadGuard, t as SolidJSHotReloadGuardProvider } from "./hotReloadGuardProvider-CHEsZRuG.js";
import { o as useAppSettings } from "./liteMode-DeLStZfQ.js";
import { r as useMediaSizes } from "./mediaSizes-C1MTaleW.js";
import { t as classNames } from "./classNames-DxGDjmvw.js";
import { t as IconTsx } from "./iconTsx-B4lOk4A6.js";
import { n as animationIntersector } from "./animationIntersector-vAjH_7t1.js";
import { t as Button } from "./buttonTsx-Bwphkm9r.js";
import { t as Scrollable } from "./scrollable2-Bau9Hoih.js";
import { n as StickerTsx, o as createMiddleware } from "./sticker-5twBOy1Y.js";
import { n as wrapEmojiText } from "./wrapEmojiText-DT39R5Tj.js";
import { t as subscribeOn } from "./subscribeOn-DnCla7ws.js";
import { D as A11yButton } from "./openEditors-7FmA7q_V.js";
import { t as anchorCallback } from "./anchorCallback-BbwAJdBk.js";
import { f as renderTopPeerItem } from "./pickUser-D8S6yVuK.js";
import { m as showStickersPopup } from "./emoticonsDropdown-Cb_qGCUN.js";
import { o as getStickerSetInputByStickerSet } from "./pickKeys-Ckq7_h-r.js";
import { r as attachPickerGrid } from "./useBaseTheme-kxtvTIO1.js";
import { t as ChatThemesPicker } from "./chatThemesPicker-CcIr98bS.js";
var chatTips_module_default = {
	mount: "_mount_1bofx_6",
	host: "_host_1bofx_7",
	hostHidden: "_hostHidden_1bofx_36",
	scrollable: "_scrollable_1bofx_41",
	toggleButton: "_toggleButton_1bofx_49",
	selectChat: "_selectChat_1bofx_64",
	selectChatShown: "_selectChatShown_1bofx_79",
	selectChatPill: "_selectChatPill_1bofx_83",
	placeholder: "_placeholder_1bofx_95",
	carousel: "_carousel_1bofx_101",
	carouselHidden: "_carouselHidden_1bofx_114",
	stage: "_stage_1bofx_125",
	card: "_card_1bofx_131",
	cardTitle: "_cardTitle_1bofx_141",
	buttons: "_buttons_1bofx_150",
	button: "_button_1bofx_150",
	buttonSelected: "_buttonSelected_1bofx_181",
	buttonIcon: "_buttonIcon_1bofx_190",
	buttonText: "_buttonText_1bofx_195",
	content: "_content_1bofx_202",
	contentTitle: "_contentTitle_1bofx_210",
	description: "_description_1bofx_220",
	themes: "_themes_1bofx_232",
	peers: "_peers_1bofx_270",
	empty: "_empty_1bofx_289",
	stickerSets: "_stickerSets_1bofx_300",
	stickerSet: "_stickerSet_1bofx_300",
	stickerSetCover: "_stickerSetCover_1bofx_325",
	stickerSetName: "_stickerSetName_1bofx_332",
	nav: "_nav_1bofx_344",
	navButton: "_navButton_1bofx_352",
	slot: "_slot_1bofx_381",
	slotActive: "_slotActive_1bofx_396"
};
//#endregion
//#region src/components/chatTips/tipCard.tsx
var _tmpl$$3 = /*#__PURE__*/ template(`<div>`);
var _tmpl$2$2 = /*#__PURE__*/ template(`<div><div></div><div></div><div></div><div>`);
var _tmpl$3$1 = /*#__PURE__*/ template(`<span>`);
/**
* The shared tip-card frame, after the macOS client's `WidgetView` (Telegram-Mac/WidgetView.swift):
* a fixed-size card holding four slots — title, a row of segmented buttons, the content, and a
* description pinned to the bottom edge with a link into the matching settings screen.
*
* Every card is the SAME fixed size (macOS lays each widget out at 320×320 and centres it), which
* is what lets the carousel cross-fade one card into the next without the box resizing under the
* nav buttons.
*/
/**
* What the carousel hands each card through its slot:
* - `ready` — how a card tells the carousel its content has landed. The deck stays folded away
*   until the card being shown reports in, so the first thing the empty column does is animate a
*   finished card in rather than show three quarters of one assembling itself.
* - `titleId` — the id the card's title is rendered with, so the slot can be named by it and the
*   carousel can announce it when stepping to the card.
*/
var TipSlotContext = createContext();
var TipSlotProvider = TipSlotContext.Provider;
/** Call once the card's own content is on screen. Safe to call more than once. */
var useTipReady = () => useContext(TipSlotContext)?.ready ?? (() => {});
/** The empty-column deck stays mounted while a conversation covers it. */
var useTipVisibility = () => useContext(TipSlotContext)?.isVisible ?? (() => true);
/**
* Opens the settings screen a card's description points at. An already-open copy is brought back
* to the front instead of stacking a second one — the description can be clicked any number of
* times, and `createTab` would happily pile up identical tabs.
*/
function openSettingsTab(appSidebarLeft, tab) {
	const existing = appSidebarLeft.getTab(tab);
	if (existing) {
		appSidebarLeft.closeTabsUntilTab(existing);
		return;
	}
	appSidebarLeft.createTab(tab).open();
}
function TipCard(props) {
	const slot = useContext(TipSlotContext);
	return (() => {
		var _el$ = _tmpl$2$2(), _el$2 = _el$.firstChild, _el$3 = _el$2.nextSibling, _el$4 = _el$3.nextSibling, _el$6 = _el$4.nextSibling;
		insert(_el$2, () => props.title);
		use((el) => onCleanup(attachPickerGrid(el, `.${chatTips_module_default.button}`)), _el$3);
		insert(_el$3, createComponent(Index, {
			get each() {
				return props.buttons;
			},
			children: (button) => createComponent(A11yButton, {
				ripple: true,
				get ["class"]() {
					return classNames(chatTips_module_default.button, button().selected && chatTips_module_default.buttonSelected);
				},
				get ["aria-pressed"]() {
					return button().selected;
				},
				onClick: (e) => button().onClick(e),
				get children() {
					return [createComponent(IconTsx, {
						get icon() {
							return button().icon;
						},
						get ["class"]() {
							return chatTips_module_default.buttonIcon;
						}
					}), (() => {
						var _el$7 = _tmpl$3$1();
						insert(_el$7, () => button().text);
						createRenderEffect(() => className(_el$7, chatTips_module_default.buttonText));
						return _el$7;
					})()];
				}
			})
		}));
		insert(_el$4, createComponent(Show, {
			get when() {
				return props.contentTitle;
			},
			get children() {
				var _el$5 = _tmpl$$3();
				insert(_el$5, () => props.contentTitle);
				createRenderEffect(() => className(_el$5, chatTips_module_default.contentTitle));
				return _el$5;
			}
		}), null);
		insert(_el$4, () => props.children, null);
		insert(_el$6, () => props.description);
		createRenderEffect((_p$) => {
			var _v$ = chatTips_module_default.card, _v$2 = slot?.titleId, _v$3 = chatTips_module_default.cardTitle, _v$4 = chatTips_module_default.buttons, _v$5 = props.buttons.length > 2 ? "toolbar" : "group", _v$6 = slot?.titleId, _v$7 = chatTips_module_default.content, _v$8 = chatTips_module_default.description;
			_v$ !== _p$.e && className(_el$, _p$.e = _v$);
			_v$2 !== _p$.t && setAttribute(_el$2, "id", _p$.t = _v$2);
			_v$3 !== _p$.a && className(_el$2, _p$.a = _v$3);
			_v$4 !== _p$.o && className(_el$3, _p$.o = _v$4);
			_v$5 !== _p$.i && setAttribute(_el$3, "role", _p$.i = _v$5);
			_v$6 !== _p$.n && setAttribute(_el$3, "aria-labelledby", _p$.n = _v$6);
			_v$7 !== _p$.s && className(_el$4, _p$.s = _v$7);
			_v$8 !== _p$.h && className(_el$6, _p$.h = _v$8);
			return _p$;
		}, {
			e: void 0,
			t: void 0,
			a: void 0,
			o: void 0,
			i: void 0,
			n: void 0,
			s: void 0,
			h: void 0
		});
		return _el$;
	})();
}
//#endregion
//#region src/components/chatTips/appearanceCard.tsx
/**
* Appearance tip — macOS' `WidgetAppearanceController`: System / Dark / Light in the button row,
* live theme thumbnails as the content, and a line pointing at the full Appearance screen.
*
* macOS fills the content with its Minimalism/Colorful chat-mode previews; tweb has no
* non-bubbled mode, so the equivalent "pick how the chat looks, from thumbnails" control here is
* the cloud-theme strip — the same `<ChatThemesPicker>` General Settings and the My QR popup use.
*/
function AppearanceTipCard() {
	const { appSidebarLeft } = useHotReloadGuard();
	const [appSettings] = useAppSettings();
	const markReady = useTipReady();
	const readTheme = () => {
		const theme = themeController.getTheme();
		return {
			id: String(theme.id ?? ""),
			name: theme.name
		};
	};
	const [themeState, setThemeState] = createSignal(readTheme(), { equals: (a, b) => a.id === b.id && a.name === b.name });
	subscribeOn(rootScope)("theme_changed", () => setThemeState(readTheme()));
	const [isNight, setIsNight] = createSignal(themeController.isNight());
	subscribeOn(rootScope)("theme_changed", () => setIsNight(themeController.isNight()));
	const isSystem = () => appSettings.theme === "system";
	const isDark = () => !isSystem() && isNight();
	const apply = (name, e) => {
		const rect = e.currentTarget.getBoundingClientRect();
		themeController.switchTheme(name, {
			x: rect.left + rect.width / 2,
			y: rect.top + rect.height / 2
		});
	};
	const buttons = () => [
		{
			icon: "sputnik_filled",
			text: i18n("ChatTips.Appearance.System"),
			selected: isSystem(),
			onClick: (e) => apply("system", e)
		},
		{
			icon: "darkmode_filled",
			text: i18n("ChatTips.Appearance.Dark"),
			selected: isDark(),
			onClick: (e) => apply(appSettings.lastThemeNames?.dark ?? "night", e)
		},
		{
			icon: "brightness",
			text: i18n("ChatTips.Appearance.Light"),
			selected: !isSystem() && !isDark(),
			onClick: (e) => apply(appSettings.lastThemeNames?.light ?? "day", e)
		}
	];
	return createComponent(TipCard, {
		get title() {
			return i18n("ChatTips.Appearance");
		},
		get buttons() {
			return buttons();
		},
		get contentTitle() {
			return i18n("ColorTheme");
		},
		get description() {
			return i18n("ChatTips.Appearance.Description", [anchorCallback(() => openSettingsTab(appSidebarLeft, hotReloadGuard.tabs.AppGeneralSettingsTab))]);
		},
		get children() {
			return createComponent(ChatThemesPicker, {
				get ["class"]() {
					return chatTips_module_default.themes;
				},
				selectedId: () => themeState().id,
				baseTheme: () => themeController.getBaseThemeForName(themeState().name),
				onSelect: (theme) => themeController.applyNewTheme(theme),
				onReady: markReady
			});
		}
	});
}
//#endregion
//#region src/components/chatTips/chatsCard.tsx
var _tmpl$$2 = /*#__PURE__*/ template(`<div>`);
/** macOS lays the peers out as a 4×2 grid inside the content slot. */
var PEERS_LIMIT = 8;
var FILTERS = [
	[
		"popular",
		"newprivate",
		"ChatTips.Chats.Popular"
	],
	[
		"recent",
		"search",
		"ChatTips.Chats.RecentSearch"
	],
	[
		"closed",
		"close",
		"ChatTips.Chats.RecentlyClosed"
	]
];
var [filter, setFilter] = createRoot(() => createSignal("popular"));
/**
* Chats tip — macOS' `WidgetRecentPeersController`: a filter row over a 4×2 grid of peers to jump
* back into. macOS filters by Popular / Recent / Both; here the three are the ones talked to most
* (top peers), the ones last searched for, and the ones whose chat was last closed (recorded by
* `appUsersManager.pushRecentlyClosedChat`).
*/
function ChatsTipCard() {
	const { appSidebarLeft, rootScope } = useHotReloadGuard();
	const [appState] = useAppState();
	const isVisible = useTipVisibility();
	const [topPeers] = createResource(() => appState.topPeersCache?.correspondents?.disabled ? "off" : "on", () => rootScope.managers.appUsersManager.getTopPeers("correspondents").catch(() => []));
	const lists = createMemo((previous) => {
		if (!isVisible()) return previous ?? {
			popular: [],
			recent: [],
			closed: []
		};
		return {
			popular: topPeers()?.map(({ id }) => id) ?? [],
			recent: [...appState.recentSearch ?? []],
			closed: [...appState.recentlyClosedChats ?? []]
		};
	});
	const listOf = (value) => lists()[value];
	const available = createMemo(() => FILTERS.filter(([value]) => listOf(value).length));
	const current = createMemo(() => {
		const list = available();
		return list.some(([value]) => value === filter()) ? filter() : list[0]?.[0] ?? filter();
	});
	const peerIds = createMemo(() => listOf(current()).slice(0, PEERS_LIMIT));
	const isEmpty = () => !peerIds().length && !topPeers.loading;
	const markReady = useTipReady();
	createEffect(() => !topPeers.loading && markReady());
	const buttons = () => available().map(([value, icon, langKey]) => ({
		icon,
		text: i18n(langKey),
		selected: current() === value,
		onClick: () => setFilter(value)
	}));
	let peersEl;
	const bindPeersList = (el) => {
		peersEl = el;
		hotReloadGuard.appDialogsManager.setListClickListener({
			list: el,
			autonomous: true
		});
	};
	createEffect(on(peerIds, (ids) => {
		if (!peersEl) return;
		peersEl.replaceChildren();
		const middleware = createMiddleware();
		onCleanup(() => middleware.destroy());
		ids.forEach((peerId) => renderTopPeerItem({
			peerId,
			container: peersEl,
			middleware: middleware.get()
		}));
	}));
	return createComponent(TipCard, {
		get title() {
			return i18n("ChatTips.Chats");
		},
		get buttons() {
			return buttons();
		},
		get description() {
			return i18n(IS_APPLE ? "ChatTips.Chats.DescriptionMac" : "ChatTips.Chats.Description", [anchorCallback(async () => {
				await appSidebarLeft.closeAllTabsNaturally();
				appSidebarLeft.initSearch().open();
			})]);
		},
		get children() {
			return createComponent(Show, {
				get when() {
					return !isEmpty();
				},
				get fallback() {
					return (() => {
						var _el$2 = _tmpl$$2();
						insert(_el$2, () => i18n("ChatTips.Chats.Empty"));
						createRenderEffect(() => className(_el$2, chatTips_module_default.empty));
						return _el$2;
					})();
				},
				get children() {
					var _el$ = _tmpl$$2();
					use(bindPeersList, _el$);
					createRenderEffect(() => className(_el$, classNames(chatTips_module_default.peers, "search-group-people")));
					return _el$;
				}
			});
		}
	});
}
//#endregion
//#region src/components/chatTips/stickersCard.tsx
var _tmpl$$1 = /*#__PURE__*/ template(`<div>`);
var _tmpl$2$1 = /*#__PURE__*/ template(`<div aria-hidden=true>`);
/** macOS shows three featured packs side by side in the content slot. */
var SETS_LIMIT = 3;
var COVER_SIZE = 88;
var MODES = [
	[
		"none",
		"stop",
		"SuggestStickersNone"
	],
	[
		"installed",
		"newprivate",
		"SuggestStickersInstalled"
	],
	[
		"all",
		"stickers_face",
		"SuggestStickersAll"
	]
];
/**
* Stickers tip — macOS' `WidgetStickersController`: the "Suggest Stickers by Emoji" mode in the
* button row (the same `settings.stickers.suggest` key Stickers and Emoji writes), a few trending
* packs as the content, and a line pointing at the full Trending list.
*/
function StickersTipCard() {
	const { appSidebarLeft, rootScope } = useHotReloadGuard();
	const [appSettings, setAppSettings] = useAppSettings();
	const [featured] = createResource(async () => {
		return (await rootScope.managers.appStickersManager.getFeaturedStickers()).slice(0, SETS_LIMIT).map(({ set }) => set);
	});
	const markReady = useTipReady();
	createEffect(on(featured, (sets) => sets && markReady()));
	const buttons = () => MODES.map(([value, icon, langKey]) => ({
		icon,
		text: i18n(langKey),
		selected: appSettings.stickers.suggest === value,
		onClick: () => setAppSettings("stickers", "suggest", value)
	}));
	return createComponent(TipCard, {
		get title() {
			return i18n("Stickers.SuggestStickers");
		},
		get buttons() {
			return buttons();
		},
		get contentTitle() {
			return i18n("Stickers.Trending");
		},
		get description() {
			return i18n("ChatTips.Stickers.Description", [anchorCallback(() => openSettingsTab(appSidebarLeft, hotReloadGuard.tabs.AppStickersTab))]);
		},
		get children() {
			var _el$ = _tmpl$$1();
			insert(_el$, createComponent(For, {
				get each() {
					return featured();
				},
				children: (set) => createComponent(TrendingStickerSet, { set })
			}));
			createRenderEffect(() => className(_el$, chatTips_module_default.stickerSets));
			return _el$;
		}
	});
}
/** One trending pack: its cover sticker over the pack title. Clicking it opens the pack. */
function TrendingStickerSet(props) {
	const { rootScope } = useHotReloadGuard();
	const input = createMemo(() => getStickerSetInputByStickerSet(props.set));
	const [cover] = createResource(async () => {
		return (await rootScope.managers.appStickersManager.getStickerSet(input())).documents.find((doc) => doc._ !== "documentEmpty");
	});
	return createComponent(A11yButton, {
		get ["class"]() {
			return chatTips_module_default.stickerSet;
		},
		onClick: () => showStickersPopup(input()),
		get children() {
			return [(() => {
				var _el$2 = _tmpl$2$1();
				insert(_el$2, createComponent(Show, {
					get when() {
						return cover();
					},
					children: (doc) => createComponent(StickerTsx, {
						get sticker() {
							return doc();
						},
						width: COVER_SIZE,
						height: COVER_SIZE,
						extraOptions: {
							group: "CHAT-TIPS",
							play: true,
							loop: true,
							withLock: true
						}
					})
				}));
				createRenderEffect(() => className(_el$2, chatTips_module_default.stickerSetCover));
				return _el$2;
			})(), (() => {
				var _el$3 = _tmpl$$1();
				insert(_el$3, () => wrapEmojiText(props.set.title));
				createRenderEffect(() => className(_el$3, chatTips_module_default.stickerSetName));
				return _el$3;
			})()];
		}
	});
}
//#endregion
//#region src/components/chatTips/index.tsx
var _tmpl$ = /*#__PURE__*/ template(`<div>`);
var _tmpl$2 = /*#__PURE__*/ template(`<div><div></div><div class=sr-only aria-live=polite></div><div>`);
var _tmpl$3 = /*#__PURE__*/ template(`<div><div><span>`);
var _tmpl$4 = /*#__PURE__*/ template(`<div role=group>`);
/**
* Tip cards for the empty chat column — what the middle column shows while no chat is open
* (nothing but the wallpaper, before this), after the macOS client's `WidgetController`
* (Telegram-Mac/WidgetController.swift). One tip at a time, centred, stepped through with the
* Previous / Next pills under it. Each card carries the real control it talks about, so the app
* is configurable without ever leaving the empty screen:
*
* - **Appearance** — light/dark/system plus the cloud-theme thumbnails.
* - **Stickers** — the "Suggest Stickers by Emoji" mode plus a few trending packs.
* - **Chats** — the peers to jump back into, filtered by popular / recently searched / recently
*   closed (see `appUsersManager.pushRecentlyClosedChat`).
*
* The deck collapses to a service pill with the corner toggle, and stays collapsed (and on the tip
* it was left on) across reopens.
*/
var TIPS = [
	AppearanceTipCard,
	StickersTipCard,
	ChatsTipCard
];
/** How far a waiting card sits to the side, in px. macOS slides its widgets by 50. */
var SLIDE = 50;
/**
* Animation group for everything the cards play, so it can be parked wholesale while a chat is
* open — the deck stays mounted and ready, but its stickers have no business looping behind a
* conversation.
*/
var ANIMATION_GROUP = "CHAT-TIPS";
/** Show the deck anyway if the card that is up never reports in (a failed fetch, say). */
var REVEAL_TIMEOUT = 2e3;
/**
* A single-column layout — a handheld, or the width at which the chat list turns into a drawer
* over the chat — has no empty column to fill: the chat list itself is the empty state there, and
* the chat column only ever shows up with a chat in it. So the deck isn't drawn at all, not just
* hidden: nothing mounts, nothing is fetched, until the window is wide enough for two columns.
*/
function ChatTips(props) {
	const mediaSizes = useMediaSizes();
	return createComponent(Show, {
		get when() {
			return !mediaSizes.isLessThanFloatingLeftSidebar;
		},
		get children() {
			return createComponent(ChatTipsDeck, { get page() {
				return props.page;
			} });
		}
	});
}
function ChatTipsDeck(props) {
	const { appImManager, rootScope, themeController } = useHotReloadGuard();
	const [peerId, setPeerId] = createSignal(appImManager.chat.peerId);
	subscribeOn(appImManager)("peer_changed", (chat) => setPeerId(chat.peerId));
	const [appSettings, setAppSettings] = useAppSettings();
	const index = () => Math.min(appSettings.chatTips?.index ?? 0, TIPS.length - 1);
	const hidden = () => !!appSettings.chatTips?.hidden;
	const titleIds = TIPS.map(() => createUniqueId());
	const carouselId = createUniqueId();
	const [announcement, setAnnouncement] = createSignal("");
	let carousel;
	const step = (by) => {
		const next = (index() + by + TIPS.length) % TIPS.length;
		setAppSettings("chatTips", "index", next);
		setAnnouncement(carousel.ownerDocument.getElementById(titleIds[next])?.textContent ?? "");
	};
	const offsetOf = (i) => (i - index() + TIPS.length) % TIPS.length === 1 ? `${SLIDE}px` : `-50px`;
	const shown = () => !peerId();
	const [revealed, setRevealed] = createSignal(false);
	const onTipReady = (i) => i === index() && setRevealed(true);
	const revealTimeout = setTimeout(() => setRevealed(true), REVEAL_TIMEOUT);
	onCleanup(() => clearTimeout(revealTimeout));
	const folded = () => hidden() || !revealed();
	createEffect(() => {
		if (shown() && !folded()) {
			animationIntersector.unlockGroup(ANIMATION_GROUP);
			animationIntersector.refreshGroup(ANIMATION_GROUP);
		} else {
			animationIntersector.lockGroup(ANIMATION_GROUP);
			animationIntersector.checkAnimations(true, ANIMATION_GROUP);
		}
	});
	onCleanup(() => animationIntersector.unlockGroup(ANIMATION_GROUP));
	const pinServiceColor = (el) => {
		const sync = () => themeController.applyHighlightingColor({ element: el });
		sync();
		subscribeOn(rootScope)("theme_changed", sync);
	};
	return (() => {
		var _el$ = _tmpl$3(), _el$8 = _el$.firstChild, _el$9 = _el$8.firstChild;
		use(pinServiceColor, _el$);
		insert(_el$, createComponent(Show, {
			get when() {
				return shown();
			},
			get children() {
				return createComponent(Portal, {
					get mount() {
						return props.page;
					},
					get children() {
						return createComponent(Button.Icon, {
							ref: pinServiceColor,
							get ["class"]() {
								return chatTips_module_default.toggleButton;
							},
							get icon() {
								return hidden() ? "lamp_filled" : "close";
							},
							get ["aria-label"]() {
								return langPack_default.format("ChatTips.Title", true);
							},
							get ["aria-expanded"]() {
								return !hidden();
							},
							"aria-controls": carouselId,
							onClick: () => setAppSettings("chatTips", "hidden", !hidden())
						});
					}
				});
			}
		}), _el$8);
		insert(_el$, createComponent(Scrollable, {
			get ["class"]() {
				return classNames(chatTips_module_default.scrollable, (!IS_TOUCH_SUPPORTED || IS_MOBILE_SAFARI) && "no-scrollbar");
			},
			get children() {
				return [
					(() => {
						var _el$2 = _tmpl$();
						createRenderEffect(() => className(_el$2, chatTips_module_default.placeholder));
						return _el$2;
					})(),
					(() => {
						var _el$3 = _tmpl$2(), _el$4 = _el$3.firstChild, _el$5 = _el$4.nextSibling, _el$6 = _el$5.nextSibling;
						var _ref$ = carousel;
						typeof _ref$ === "function" ? use(_ref$, _el$3) : carousel = _el$3;
						setAttribute(_el$3, "id", carouselId);
						insert(_el$4, createComponent(For, {
							each: TIPS,
							children: (Tip, i) => (() => {
								var _el$0 = _tmpl$4();
								insert(_el$0, createComponent(TipSlotProvider, {
									get value() {
										return {
											ready: () => onTipReady(i()),
											titleId: titleIds[i()],
											isVisible: shown
										};
									},
									get children() {
										return createComponent(Dynamic, { component: Tip });
									}
								}));
								createRenderEffect((_p$) => {
									var _v$8 = classNames(chatTips_module_default.slot, i() === index() && chatTips_module_default.slotActive), _v$9 = offsetOf(i()), _v$0 = titleIds[i()], _v$1 = Modes.a11y && i() !== index();
									_v$8 !== _p$.e && className(_el$0, _p$.e = _v$8);
									_v$9 !== _p$.t && setStyleProperty(_el$0, "--tip-slide", _p$.t = _v$9);
									_v$0 !== _p$.a && setAttribute(_el$0, "aria-labelledby", _p$.a = _v$0);
									_v$1 !== _p$.o && (_el$0.inert = _p$.o = _v$1);
									return _p$;
								}, {
									e: void 0,
									t: void 0,
									a: void 0,
									o: void 0
								});
								return _el$0;
							})()
						}));
						insert(_el$5, announcement);
						insert(_el$6, createComponent(Button, {
							get ["class"]() {
								return chatTips_module_default.navButton;
							},
							icon: "arrow_prev",
							onClick: () => step(-1),
							get children() {
								return i18n("ChatTips.PreviousTip");
							}
						}), null);
						insert(_el$6, createComponent(Button, {
							get ["class"]() {
								return chatTips_module_default.navButton;
							},
							iconAfter: "arrow_next",
							onClick: () => step(1),
							get children() {
								return i18n("ChatTips.NextTip");
							}
						}), null);
						createRenderEffect((_p$) => {
							var _v$ = classNames(chatTips_module_default.carousel, folded() && chatTips_module_default.carouselHidden), _v$2 = chatTips_module_default.stage, _v$3 = chatTips_module_default.nav;
							_v$ !== _p$.e && className(_el$3, _p$.e = _v$);
							_v$2 !== _p$.t && className(_el$4, _p$.t = _v$2);
							_v$3 !== _p$.a && className(_el$6, _p$.a = _v$3);
							return _p$;
						}, {
							e: void 0,
							t: void 0,
							a: void 0
						});
						return _el$3;
					})(),
					(() => {
						var _el$7 = _tmpl$();
						createRenderEffect(() => className(_el$7, chatTips_module_default.placeholder));
						return _el$7;
					})()
				];
			}
		}), _el$8);
		insert(_el$9, () => i18n("EmptyPeer.Description"));
		createRenderEffect((_p$) => {
			var _v$4 = classNames(chatTips_module_default.host, !shown() && chatTips_module_default.hostHidden), _v$5 = classNames(chatTips_module_default.selectChat, hidden() && chatTips_module_default.selectChatShown), _v$6 = !hidden(), _v$7 = chatTips_module_default.selectChatPill;
			_v$4 !== _p$.e && className(_el$, _p$.e = _v$4);
			_v$5 !== _p$.t && className(_el$8, _p$.t = _v$5);
			_v$6 !== _p$.a && setAttribute(_el$8, "aria-hidden", _p$.a = _v$6);
			_v$7 !== _p$.o && className(_el$9, _p$.o = _v$7);
			return _p$;
		}, {
			e: void 0,
			t: void 0,
			a: void 0,
			o: void 0
		});
		return _el$;
	})();
}
/**
* Marks the mount so a later instance of this module can find and clear it. Deliberately a plain
* class: the CSS-module one is rehashed every time the stylesheet changes, which is exactly one
* of the cases this has to survive.
*/
var MOUNT_CLASS = "chat-tips-mount";
/**
* Mounts the tips right above the chat stack: `anchor` is `appImManager.chatsContainer`, so the
* cards paint over the empty chat but stay under the call / audio plates appended after it.
*/
function renderChatTips(anchor) {
	document.querySelectorAll("." + MOUNT_CLASS).forEach((el) => {
		el.disposeChatTips?.();
		el.remove();
	});
	const container = document.createElement("div");
	container.classList.add(MOUNT_CLASS, chatTips_module_default.mount);
	anchor.after(container);
	const page = anchor.closest(".page-chats") || document.body;
	container.disposeChatTips = render(() => createComponent(SolidJSHotReloadGuardProvider, { get children() {
		return createComponent(ChatTips, { page });
	} }), container);
}
//#endregion
export { renderChatTips };
