//# allFunctionsCalledOnLoad
import { t as findUpClassName } from "./findUpClassName-3V5me58N.js";
import { n as rootScope } from "./rootScope-CZS0lmz8.js";
import { a as i18n, u as langPack_default } from "./langPack-BmdJGr44.js";
import { x as createRoot } from "./solid-9Vxm0VIz.js";
import { l as useIsFrozen } from "./contentSettings-DMhHR-0w.js";
import { r as useHotReloadGuard } from "./hotReloadGuard-BUNVkeQ4.js";
import { n as hotReloadGuard } from "./hotReloadGuardProvider-CHEsZRuG.js";
import { t as liteMode } from "./liteMode-DeLStZfQ.js";
import { n as attachClickEvent } from "./clickEvent-COk4YpLP.js";
import { t as Button } from "./button-DpTvniRN.js";
import { c as createContextMenu, dt as wrapPeerTitle } from "./confirmationPopup-Bz6mK0o-.js";
import { jt as getMessageThreadId, on as namedPromises, un as hasRights } from "./getChatMigratedTo-ChhMNXuu.js";
import { U as getPeerId } from "./canPollPeerStories-D3HoBvLX.js";
import { B as profileStarGiftsButtonMenu, F as AppSearchSuper, I as isCounterDrivenMediaTab, L as canSetMainProfileTabForMediaType, R as getMediaTypeForProfileTab, V as createButtonMenuCheckboxFilters, z as getProfileTabForMediaType } from "./appDialogsManager-CXguiKc3.js";
import { r as toastNew } from "./toast-B6VD5M7R.js";
import { t as ButtonIcon } from "./buttonIcon-CthJWloV.js";
import { t as TransitionSlider } from "./transition-BRcIGNUC.js";
import { n as createButtonMenuVisibility, t as ButtonMenuToggle } from "./buttonMenuToggle-1aKRQh1m.js";
import { n as useSuperTab } from "./superTabProvider-LtveyH7W.js";
import { t as ButtonCorner } from "./buttonCorner-HdHn23eT.js";
import { a as profileStoriesButtonMenu } from "./sharedMediaScrollDateBadge-CcjBOjgJ.js";
import { t as addChatUsers } from "./addChatUsers-CGP6Ttkc.js";
import { n as renderPeerProfile, t as getPeerProfileTitleKey } from "./peerProfile-B0nSVWXM.js";
//#region src/components/sharedMediaFilters.ts
function getSharedMediaInputFilter(filters) {
	return filters.photos && filters.videos ? "inputMessagesFilterPhotoVideo" : filters.photos ? "inputMessagesFilterPhotos" : "inputMessagesFilterVideo";
}
function getSharedMediaFilters(inputFilter) {
	return {
		photos: inputFilter !== "inputMessagesFilterVideo",
		videos: inputFilter !== "inputMessagesFilterPhotos"
	};
}
//#endregion
//#region src/components/sidebarRight/tabs/sharedMedia.tsx
var historiesStorage = {};
var MEDIA_COUNTER_LANG_KEYS = {
	photos: "Photos",
	videos: "Videos"
};
var SharedMedia = () => {
	const [tab] = useSuperTab();
	const { HotReloadGuard, apiManagerProxy, appImManager } = useHotReloadGuard();
	let hideButtonMenu = false;
	let updateButtonMenuVisibility = () => {};
	const getHistoryStorage = (peerId, threadId) => {
		var _historiesStorage$pee;
		return (_historiesStorage$pee = historiesStorage[peerId] ?? (historiesStorage[peerId] = {}))[threadId] ?? (_historiesStorage$pee[threadId] = {});
	};
	const setQuery = () => {
		var _getHistoryStorage;
		const { peerId, threadId } = tab;
		const historyStorage = getHistoryStorage(peerId, threadId);
		historyStorage.inputMessagesFilterEmpty = (_getHistoryStorage = getHistoryStorage(rootScope.myId, peerId)).inputMessagesFilterEmpty ?? (_getHistoryStorage.inputMessagesFilterEmpty = []);
		tab.searchSuper.setQuery({
			peerId,
			threadId,
			historyStorage
		});
	};
	const cleanupHTML = async () => {
		const isAnyChat = tab.peerId.isAnyChat();
		const [canViewMembers, hasInviteRights] = await Promise.all([isAnyChat ? tab.searchSuper.canViewMembers() : false, isAnyChat ? tab.managers.appChatsManager.hasRights(tab.peerId.toChatId(), "invite_users") : false]);
		return () => {
			editBtn.classList.add("hide");
			tab.searchSuper.cleanupHTML();
			tab.container.classList.toggle("can-add-members", canViewMembers && hasInviteRights);
		};
	};
	const changeTitleKey = async () => {
		const { peerId, threadId } = tab;
		const isSavedDialog = !!(peerId === rootScope.myId && threadId);
		const usePeerId = isSavedDialog ? threadId : peerId;
		const { isForum, isBotforum, isBroadcast, isBot, peerTitle } = await namedPromises({
			isForum: tab.managers.appPeersManager.isForum(usePeerId),
			isBotforum: tab.managers.appPeersManager.isBotforum(usePeerId),
			isBroadcast: tab.managers.appPeersManager.isBroadcast(usePeerId),
			isBot: tab.managers.appPeersManager.isBot(usePeerId),
			peerTitle: wrapPeerTitle({
				peerId,
				threadId: isSavedDialog ? void 0 : threadId,
				meAsNotes: isSavedDialog && threadId === rootScope.myId,
				dialog: true
			})
		});
		const titleKey = getPeerProfileTitleKey({
			isTopic: (isForum || isBotforum) && !!threadId,
			isBot,
			isBroadcast,
			isUser: usePeerId.isUser()
		});
		return () => {
			titleI18n.compareAndUpdate({ key: titleKey });
			sharedMediaTitle.replaceChildren(peerTitle);
			hideButtonMenu = isSavedDialog;
			updateButtonMenuVisibility();
		};
	};
	async function toggleEditBtn(manual) {
		const { peerId } = tab;
		let show;
		if (useIsFrozen()) show = false;
		else if (peerId.isUser()) show = peerId !== rootScope.myId && await tab.managers.appUsersManager.canEdit(peerId.toUserId());
		else {
			const chatId = peerId.toChatId();
			if (tab.threadId && apiManagerProxy.isForum(peerId)) show = await tab.managers.dialogsStorage.canManageTopic(await tab.managers.dialogsStorage.getForumTopic(peerId, tab.threadId));
			else {
				const chat = apiManagerProxy.getChat(chatId);
				if (chat._ === "channel") show = !chat.pFlags.monoforum && (hasRights(chat, "just_admin") || hasRights(chat, "change_info"));
				else show = hasRights(chat, "change_info") || hasRights(chat, "change_permissions");
			}
		}
		const callback = () => {
			editBtn.classList.toggle("hide", !show);
		};
		return manual ? callback : callback();
	}
	const fillProfileElements = async () => {
		if (!tab.peerChanged) return;
		tab.peerChanged = false;
		const callbacks = await Promise.all([
			cleanupHTML(),
			toggleEditBtn(true),
			changeTitleKey(),
			(() => {
				!tab.noProfile && createRoot((dispose) => {
					tab.middlewareHelper.onDestroy(dispose);
					tab.scrollable.append(renderPeerProfile({
						peerId: tab.peerId,
						threadId: tab.threadId,
						isDialog: tab.isDialog,
						scrollable: tab.scrollable,
						setCollapsedOn: tab.container,
						slider: tab.slider,
						openChatStack: tab.openChatStack,
						searchSuperContainer: tab.searchSuper.container,
						onPinnedGiftsChange: (gifts) => {
							tab.searchSuper.setPinnedGifts(gifts);
						}
					}, HotReloadGuard));
				});
				if (tab.noProfile) {
					tab.container.classList.add("profile-container");
					const content = document.createElement("div");
					content.classList.add("profile-content");
					tab.searchSuper.container.replaceWith(content);
					content.append(tab.searchSuper.container);
				}
				return () => {};
			})()
		]);
		return () => {
			callbacks.forEach((callback) => {
				callback?.();
			});
		};
	};
	const loadSidebarMedia = (single, justLoad) => {
		return tab.searchSuper.load(single, justLoad);
	};
	const setSearchTab = (type) => {
		const idx = tab.searchSuper.mediaTabs.findIndex((t) => t.type === type);
		if (idx === -1) return;
		tab.searchSuper.selectTab(idx);
	};
	const setLoadMutex = (promise) => {
		tab.searchSuper.loadMutex = promise;
	};
	const _renderNewMessage = (message, peerId = message.peerId, threadId) => {
		const historyStorage = historiesStorage[peerId]?.[threadId];
		if (!historyStorage) return;
		for (const mediaTab of tab.searchSuper.mediaTabs) {
			const inputFilter = mediaTab.inputFilter;
			const history = historyStorage[inputFilter];
			if (!history) {
				if (isCounterDrivenMediaTab(mediaTab) && tab.peerId === peerId && tab.threadId === threadId && tab.searchSuper.filterMessagesByType([message], inputFilter).length) tab.searchSuper.setCounter(mediaTab.type, (tab.searchSuper.counters[mediaTab.type] || 0) + 1);
				continue;
			}
			let filtered;
			if (mediaTab.type === "saved") filtered = [message].filter((message) => {
				const savedPeerId = message.saved_peer_id;
				return savedPeerId && getPeerId(savedPeerId) === tab.searchSuper.searchContext.peerId && !history.some((m) => m.mid === message.mid);
			});
			else filtered = tab.searchSuper.filterMessagesByType([message], inputFilter);
			if (!filtered.length) continue;
			const toInsert = filtered.filter((message) => !history.find((m) => m.mid === message.mid && m.peerId === message.peerId)).map((message) => ({
				mid: message.mid,
				peerId: message.peerId
			}));
			history.unshift(...toInsert);
			if ((mediaTab.type === "saved" ? tab.peerId === threadId : tab.peerId === peerId) && tab.searchSuper.usedFromHistory[inputFilter] !== -1 && tab.threadId === threadId) {
				tab.searchSuper.usedFromHistory[inputFilter] += filtered.length;
				tab.searchSuper.performSearchResult({
					messages: filtered,
					mediaTab,
					append: false
				}).then((length) => {
					tab.searchSuper.setCounter(mediaTab.type, tab.searchSuper.counters[mediaTab.type] + length);
				});
			}
		}
	};
	const renderNewMessage = async (message) => {
		const { peerId } = message;
		const isForum = await tab.managers.appPeersManager.isForum(peerId);
		const threadId = getMessageThreadId(message, { isForum });
		if (tab.peerId === peerId && tab.threadId === threadId) tab.searchSuper.updateMediaCountersByMessage(message, 1);
		_renderNewMessage(message);
		if (threadId) _renderNewMessage(message, void 0, threadId);
	};
	const _deleteDeletedMessages = (historyStorage, peerId, mids, threadId) => {
		const notFound = /* @__PURE__ */ new Set();
		for (const mid of mids) for (const mediaTab of tab.searchSuper.mediaTabs) {
			const inputFilter = mediaTab.inputFilter;
			const history = historyStorage[inputFilter];
			if (!history) continue;
			const isGood = mediaTab.type === "saved" ? tab.peerId === threadId : tab.peerId === peerId && tab.threadId === threadId;
			const idx = history.findIndex((m) => m.mid === mid);
			if (idx !== -1) history.splice(idx, 1);
			if (isGood) {
				const container = tab.searchSuper.tabs[inputFilter];
				const div = container.querySelector(`[data-mid="${mid}"][data-peer-id="${peerId}"]`);
				if (div) {
					if (tab.searchSuper.selection.isSelecting) tab.searchSuper.selection.toggleByElement(div);
					const divs = container.querySelectorAll("[data-mid][data-peer-id]");
					const idx = Array.from(divs).indexOf(div);
					div.remove();
					if (idx !== -1 && tab.searchSuper.usedFromHistory[inputFilter] >= idx + 1) --tab.searchSuper.usedFromHistory[inputFilter];
					tab.searchSuper.setCounter(mediaTab.type, tab.searchSuper.counters[mediaTab.type] - 1);
				} else notFound.add(mediaTab);
			}
		}
		if (tab.peerId === peerId && tab.threadId === threadId) {
			for (const mediaTab of tab.searchSuper.mediaTabs) if (isCounterDrivenMediaTab(mediaTab) && !historyStorage[mediaTab.inputFilter]) notFound.add(mediaTab);
		}
		const filters = Array.from(notFound).map((mediaTab) => ({ _: mediaTab.inputFilter }));
		if (!filters.length) return;
		const middleware = tab.searchSuper.middleware.get();
		tab.searchSuper.getSearchCounters(filters).then((counters) => {
			if (!middleware()) return;
			notFound.forEach((mediaTab) => {
				const counter = counters.find((c) => c.filter._ === mediaTab.inputFilter);
				if (counter) tab.searchSuper.setCounter(mediaTab.type, counter.count);
			});
		});
	};
	const deleteDeletedMessages = (peerId, msgs) => {
		const h = historiesStorage[peerId];
		if (!h) return;
		const mids = [...msgs.keys()];
		for (const threadId in h) _deleteDeletedMessages(h[threadId], peerId, mids, isNaN(+threadId) ? void 0 : +threadId);
		if (tab.peerId === peerId) tab.searchSuper.refreshMediaCounters();
		tab.scrollable.onScroll();
	};
	tab.container.classList.add("shared-media-container");
	const newCloseBtn = Button("btn-icon sidebar-close-button", {
		noRipple: true,
		ariaLabel: "Close"
	});
	tab.closeBtn.replaceWith(newCloseBtn);
	tab.closeBtn = newCloseBtn;
	const animatedCloseIcon = document.createElement("div");
	animatedCloseIcon.classList.add("animated-close-icon");
	newCloseBtn.append(animatedCloseIcon);
	if (tab.isFirst) animatedCloseIcon.classList.add("state-back");
	const createTransitionContainer = () => {
		const transitionContainer = document.createElement("div");
		transitionContainer.className = "transition slide-fade";
		return transitionContainer;
	};
	const transitionContainer = createTransitionContainer();
	const makeTransitionItem = (titleInner, noCounter, title) => {
		const element = document.createElement("div");
		element.classList.add("transition-item");
		title ?? (title = tab.title.cloneNode());
		title.append(titleInner);
		let subtitle;
		if (noCounter) element.append(title);
		else {
			const rows = document.createElement("div");
			rows.classList.add("sidebar-header__rows");
			subtitle = document.createElement("div");
			subtitle.classList.add("sidebar-header__subtitle");
			rows.append(title, subtitle);
			element.append(rows);
		}
		return {
			element,
			title,
			subtitle
		};
	};
	const titleI18n = new langPack_default.IntlElement();
	const transitionFirstItem = makeTransitionItem(titleI18n.element, true, tab.title);
	const editBtn = ButtonIcon("edit", { ariaLabel: "Edit" });
	let lastMediaTabType;
	const mediaFilters = {
		photos: true,
		videos: true
	};
	let mediaCounters;
	const mediaSubtitle = document.createElement("span");
	mediaSubtitle.append(i18n("Loading"));
	const updateMediaSubtitle = () => {
		if (!mediaCounters) return;
		const enabled = Object.keys(MEDIA_COUNTER_LANG_KEYS).filter((key) => mediaFilters[key]);
		const nonEmpty = enabled.filter((key) => mediaCounters[key]);
		const parts = [];
		for (const key of nonEmpty.length ? nonEmpty : enabled.slice(0, 1)) {
			if (parts.length) parts.push(document.createTextNode(", "));
			parts.push(i18n(MEDIA_COUNTER_LANG_KEYS[key], [mediaCounters[key]]));
		}
		mediaSubtitle.replaceChildren(...parts);
	};
	const applyMediaInputFilter = (inputFilter) => {
		const filters = getSharedMediaFilters(inputFilter);
		Object.assign(mediaFilters, filters);
		mediaFilterCheckboxFields.photos.checked = filters.photos;
		mediaFilterCheckboxFields.videos.checked = filters.videos;
		updateMediaSubtitle();
	};
	const { checkboxFields: mediaFilterCheckboxFields, toggleFilter: toggleMediaFilter } = createButtonMenuCheckboxFilters({
		filterGroups: [["photos", "videos"]],
		getState: () => mediaFilters,
		onChange: (changes) => {
			Object.assign(mediaFilters, changes);
			updateMediaSubtitle();
			const inputFilter = getSharedMediaInputFilter(mediaFilters);
			tab.searchSuper.setMediaInputFilter(inputFilter).then((restoredInputFilter) => {
				if (restoredInputFilter) applyMediaInputFilter(restoredInputFilter);
			});
		}
	});
	const btnMenuButtons = [
		{
			icon: "message",
			text: "SavedViewAsMessages",
			onClick: () => {
				appImManager.toggleViewAsMessages(rootScope.myId, true);
			},
			verify: () => tab.peerId === rootScope.myId && tab.isFirst
		},
		{
			checkboxField: mediaFilterCheckboxFields.photos,
			text: "AutoDownloadPhotos",
			onClick: () => toggleMediaFilter("photos"),
			verify: () => lastMediaTabType === "media"
		},
		{
			checkboxField: mediaFilterCheckboxFields.videos,
			text: "AutoDownloadVideos",
			onClick: () => toggleMediaFilter("videos"),
			verify: () => lastMediaTabType === "media"
		},
		...profileStoriesButtonMenu({
			peerId: tab.peerId,
			slider: tab.slider,
			verify: () => lastMediaTabType === "stories",
			canEdit: () => {
				if (tab.peerId === rootScope.myId) return true;
				if (tab.peerId.isAnyChat()) return tab.managers.appChatsManager.hasRights(tab.peerId.toChatId(), "edit_stories");
				return false;
			}
		}),
		...profileStarGiftsButtonMenu({
			get store() {
				return tab.searchSuper.stargiftsStore;
			},
			get actions() {
				return tab.searchSuper.stargiftsActions;
			},
			verify: () => lastMediaTabType === "gifts",
			peerId: tab.peerId
		})
	];
	const btnMenu = ButtonMenuToggle({
		listenerSetter: tab.listenerSetter,
		direction: "bottom-left",
		buttons: btnMenuButtons,
		buttonOptions: { ariaLabel: "MultiAccount.More" }
	});
	updateButtonMenuVisibility = createButtonMenuVisibility(btnMenu, btnMenuButtons, () => hideButtonMenu);
	transitionFirstItem.element.append(editBtn);
	const transitionSharedMedia = makeTransitionItem(i18n("PeerInfo.SharedMedia"));
	const sharedMediaTitle = transitionSharedMedia.title;
	const sharedMediaTransitionContainer = createTransitionContainer();
	transitionSharedMedia.subtitle.append(sharedMediaTransitionContainer);
	const c = [
		["savedDialogs", "SavedDialogsTabCount"],
		["stories", "StoriesCount"],
		["botPreviews", "BotPreviews.SubtitleCount"],
		["gifts", "StarGiftsCount"],
		["members", "Members"],
		["media", "MediaFiles"],
		["saved", "SavedMessagesCount"],
		["files", "Files"],
		["links", "Links"],
		["music", "MusicFiles"],
		["voice", "Voice"],
		["gifs", "GIFs"],
		["groups", "CommonGroups"],
		["similar", "SimilarChannelsCount"]
	];
	const subtitles = /* @__PURE__ */ new Map();
	sharedMediaTransitionContainer.append(...c.map(([type]) => {
		const element = document.createElement("div");
		element.classList.add("transition-item");
		if (type === "media") element.append(mediaSubtitle);
		else {
			const subtitle = new langPack_default.IntlElement({ key: "Loading" });
			subtitles.set(type, subtitle);
			element.append(subtitle.element);
		}
		return element;
	}));
	transitionContainer.append(...[transitionFirstItem, transitionSharedMedia].map(({ element }) => element));
	tab.header.append(transitionContainer, btnMenu);
	const OFFSET = 72;
	const cb = tab.scrollable.onAdditionalScroll;
	tab.scrollable.onAdditionalScroll = () => {
		cb?.();
		const rect = (tab.searchSuper.navScrollableContainer.classList.contains("is-single") ? tab.searchSuper.container : tab.searchSuper.nav).getBoundingClientRect();
		if (!rect.width) return;
		const isSharedMedia = rect.top - tab.container.getBoundingClientRect().top - 1 <= OFFSET;
		setIsSharedMedia(isSharedMedia);
		tab.searchSuper.updateScrollDateBadge(isSharedMedia);
	};
	const getTitleIndex = (isSharedMedia = transition.prevId() !== 0) => {
		let index = 0;
		if (isSharedMedia) index = 1;
		return index;
	};
	const setIsSharedMedia = (isSharedMedia) => {
		animatedCloseIcon.classList.toggle("state-back", tab.isFirst || isSharedMedia);
		tab.searchSuper.container.classList.toggle("is-full-viewport", isSharedMedia);
		tab.header.classList.toggle("hide-border", isSharedMedia);
		transition(getTitleIndex(isSharedMedia));
		if (isSharedMedia) tab.container.classList.add("header-filled");
		else tab.searchSuper.cleanScrollPositions();
	};
	const transition = TransitionSlider({
		content: transitionContainer,
		type: "slide-fade",
		transitionTime: 400,
		isHeavy: false
	});
	transition(tab.noProfile ? 1 : 0);
	const transitionSubtitle = TransitionSlider({
		content: sharedMediaTransitionContainer,
		type: "slide-fade",
		transitionTime: 400,
		isHeavy: false
	});
	transitionSubtitle(0);
	attachClickEvent(tab.closeBtn, (e) => {
		if (transition.prevId() && !tab.noProfile) {
			tab.scrollable.scrollIntoViewNew({
				element: tab.scrollable.container.querySelector(".profile-content"),
				position: "start"
			});
			transition(0);
			if (!tab.isFirst) {
				animatedCloseIcon.classList.remove("state-back");
				tab.container.classList.remove("header-filled");
			}
		} else if (!tab.scrollable.isHeavyAnimationInProgress) tab.slider.onCloseBtnClick();
	}, { listenerSetter: tab.listenerSetter });
	attachClickEvent(editBtn, async () => {
		let editTab;
		const { peerId, threadId } = tab;
		if (threadId && await tab.managers.appPeersManager.isForum(peerId)) editTab = tab.slider.createTab(hotReloadGuard.tabs.AppEditTopicTab);
		else if (peerId.isAnyChat()) editTab = tab.slider.createTab(hotReloadGuard.tabs.AppEditChatTab);
		else if (await tab.managers.appUsersManager.isBot(peerId)) editTab = tab.slider.createTab(hotReloadGuard.tabs.AppEditBotTab);
		else editTab = tab.slider.createTab(hotReloadGuard.tabs.AppEditContactTab);
		if (!editTab) return;
		if (editTab instanceof hotReloadGuard.tabs.AppEditTopicTab) editTab.open({
			peerId,
			threadId: tab.threadId
		});
		else if (editTab instanceof hotReloadGuard.tabs.AppEditBotTab) editTab.open(peerId);
		else if (editTab instanceof hotReloadGuard.tabs.AppEditContactTab) editTab.open(peerId);
		else editTab.open({ chatId: peerId.toChatId() });
	}, { listenerSetter: tab.listenerSetter });
	tab.listenerSetter.add(rootScope)("contacts_update", (userId) => {
		if (tab.peerId === userId.toPeerId(false)) toggleEditBtn();
	});
	tab.listenerSetter.add(rootScope)("chat_update", (chatId) => {
		if (tab.peerId === chatId.toPeerId(true)) toggleEditBtn();
	});
	tab.listenerSetter.add(rootScope)("history_multiappend", (message) => {
		renderNewMessage(message);
	});
	tab.listenerSetter.add(rootScope)("history_delete", ({ peerId, msgs }) => {
		deleteDeletedMessages(peerId, msgs);
	});
	tab.searchSuper = new AppSearchSuper({
		mediaTabs: [
			{
				name: "SharedMedia.SavedDialogs",
				type: "savedDialogs"
			},
			{
				name: "Stories",
				type: "stories"
			},
			{
				name: "ProfileBotPreviewTab",
				type: "botPreviews"
			},
			{
				name: "SharedMedia.Gifts",
				type: "gifts"
			},
			{
				name: "PeerMedia.Members",
				type: "members"
			},
			{
				inputFilter: "inputMessagesFilterPhotoVideo",
				name: "SharedMediaTab2",
				type: "media"
			},
			{
				inputFilter: "inputMessagesFilterEmpty",
				name: "SharedMedia.Saved",
				type: "saved"
			},
			{
				inputFilter: "inputMessagesFilterDocument",
				name: "SharedFilesTab2",
				type: "files"
			},
			{
				inputFilter: "inputMessagesFilterUrl",
				name: "SharedLinksTab2",
				type: "links"
			},
			{
				inputFilter: "inputMessagesFilterMusic",
				name: "SharedMusicTab2",
				type: "music"
			},
			{
				inputFilter: "inputMessagesFilterRoundVoice",
				name: "SharedVoiceTab2",
				type: "voice"
			},
			{
				inputFilter: "inputMessagesFilterGif",
				name: "SharedGIFsTab2",
				type: "gifs"
			},
			{
				name: "ChatList.Filter.Groups",
				type: "groups"
			},
			{
				name: "SimilarChannels",
				type: "similar"
			}
		],
		scrollable: tab.scrollable,
		onChangeTab: (mediaTab) => {
			transitionSubtitle(c.findIndex((item) => item[0] === mediaTab.type));
			lastMediaTabType = mediaTab.type;
			const timeout = mediaTab.type === "members" && liteMode.isAvailable("animations") ? 250 : 0;
			setTimeout(() => {
				btnAddMembers.classList.toggle("is-hidden", mediaTab.type !== "members");
			}, timeout);
			updateButtonMenuVisibility();
		},
		managers: tab.managers,
		onLengthChange: (type, length) => {
			if (type === "media") return;
			const item = c.find((item) => item[0] === type);
			if (!item) return;
			const key = type === "similar" && tab.peerId.isUser() ? "SimilarBotsCount" : item[1];
			subtitles.get(type).compareAndUpdate({
				key,
				args: [length]
			});
		},
		onMediaCountersChange: (counters) => {
			mediaCounters = counters;
			if (!counters) {
				mediaSubtitle.replaceChildren(i18n("Loading"));
				return;
			}
			updateMediaSubtitle();
		},
		openSavedDialogsInner: !tab.isFirst,
		useMainProfileTab: true,
		slider: tab.slider,
		scrollOffset: OFFSET
	});
	let mainProfileTabTarget;
	let mainProfileTabChanging = false;
	const canSetMainProfileTab = () => {
		const mediaTab = mainProfileTabTarget;
		if (!mediaTab || mainProfileTabChanging || tab.threadId || tab.searchSuper.getFirstVisibleMediaTab() === mediaTab) return false;
		let isEditableBroadcast = false;
		if (tab.peerId.isAnyChat()) {
			const chat = apiManagerProxy.getChat(tab.peerId.toChatId());
			isEditableBroadcast = chat?._ === "channel" && !!chat.pFlags.broadcast && hasRights(chat, "change_info");
		}
		return canSetMainProfileTabForMediaType(mediaTab.type, {
			isSelf: tab.peerId === rootScope.myId,
			isSavedMessages: tab.noProfile && tab.peerId === rootScope.myId,
			isEditableBroadcast
		});
	};
	const setMainProfileTab = async () => {
		const mediaTab = mainProfileTabTarget;
		const profileTab = mediaTab && getProfileTabForMediaType(mediaTab.type);
		const mediaType = getMediaTypeForProfileTab(profileTab);
		if (!profileTab || !mediaType || mainProfileTabChanging) return;
		const peerId = tab.peerId;
		const previousType = tab.searchSuper.mainMediaTabType;
		const middleware = tab.searchSuper.middleware.get();
		mainProfileTabChanging = true;
		tab.searchSuper.setMainMediaTab(mediaType);
		try {
			const result = await tab.managers.appProfileManager.setMainProfileTab(peerId, profileTab);
			if (!middleware()) return;
			if (result) toastNew({ langPackKey: "ProfileTab.OrderChanged" });
			else {
				tab.searchSuper.setMainMediaTab(previousType);
				toastNew({ langPackKey: "Error.AnError" });
			}
		} catch {
			if (middleware()) {
				tab.searchSuper.setMainMediaTab(previousType);
				toastNew({ langPackKey: "Error.AnError" });
			}
		} finally {
			mainProfileTabChanging = false;
		}
	};
	createContextMenu({
		listenTo: tab.searchSuper.nav,
		findElement: (e) => {
			const target = findUpClassName(e.target, "menu-horizontal-div-item");
			return target?.parentElement === tab.searchSuper.nav ? target : void 0;
		},
		onOpen: (_, target) => {
			const index = Array.from(tab.searchSuper.nav.children).indexOf(target);
			mainProfileTabTarget = tab.searchSuper.mediaTabs[index];
		},
		onClose: () => {
			mainProfileTabTarget = void 0;
		},
		buttons: [{
			icon: "pin",
			text: "ProfileTab.SetAsMain",
			onClick: () => void setMainProfileTab(),
			verify: canSetMainProfileTab
		}],
		listenerSetter: tab.listenerSetter,
		middleware: tab.middlewareHelper.get()
	});
	tab.searchSuper.scrollStartCallback = () => {
		setIsSharedMedia(true);
	};
	if (tab.noProfile) tab.scrollable.append(tab.searchSuper.container);
	const btnAddMembers = ButtonCorner({
		icon: "addmember_filled",
		ariaLabel: "GroupAddMembers"
	});
	tab.content.append(btnAddMembers);
	attachClickEvent(btnAddMembers, () => {
		addChatUsers({
			peerId: tab.peerId,
			slider: tab.slider
		});
	}, { listenerSetter: tab.listenerSetter });
	tab._impl = {
		setQuery,
		fillProfileElements,
		loadSidebarMedia,
		setSearchTab,
		setLoadMutex
	};
	return null;
};
//#endregion
export { SharedMedia as default };
