//# allFunctionsCalledOnLoad
import { t as noop } from "./noop-H9NNBLfX.js";
import { t as Icon } from "./icon-DbP6Es97.js";
import { H as usePeers, c as useCommunityPeerLinkRequests, i as useCommunityDialog, l as useCommunityPendingRequestsCount, o as useCommunityFull, r as useCommunity, t as apiManagerProxy, u as useJoinedCommunities } from "./apiManagerProxy-DmQXvxSF.js";
import { n as rootScope } from "./rootScope-CZS0lmz8.js";
import { a as i18n } from "./langPack-BmdJGr44.js";
import { C as createSignal, N as onMount, _ as createMemo, g as createEffect, i as For, j as on, p as createComponent, s as Show, x as createRoot, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { o as unwrap } from "./store-PwRn5fa3.js";
import { c as insert, d as render, g as template, n as Portal, o as className, u as memo } from "./web-BPyQozky.js";
import { n as hotReloadGuard, t as SolidJSHotReloadGuardProvider } from "./hotReloadGuardProvider-CHEsZRuG.js";
import { t as IconTsx } from "./iconTsx-B4lOk4A6.js";
import { t as Button } from "./buttonTsx-Bwphkm9r.js";
import { t as PreloaderTsx } from "./putPreloader-Bxq7N1RV.js";
import { G as getCommunityServiceTitle, i as Row, s as CheckboxFieldTsx } from "./confirmationPopup-Bz6mK0o-.js";
import { gn as isDialog, un as hasRights } from "./getChatMigratedTo-ChhMNXuu.js";
import { U as getPeerId } from "./canPollPeerStories-D3HoBvLX.js";
import { Gt as getCommunityPeerSubtitle, Rt as showCommunityMutePopup, Vt as ForumTab, zt as unmuteCommunity } from "./appDialogsManager-CXguiKc3.js";
import { a as Section } from "./emailVerification-C8QYZSyu.js";
import { n as toast } from "./toast-B6VD5M7R.js";
import { n as createButtonMenuVisibility, t as ButtonMenuToggle } from "./buttonMenuToggle-1aKRQh1m.js";
import { t as positionElementByIndex } from "./positionElementByIndex-D7kiTyx2.js";
import { t as ChatType } from "./chatType-C89v744i.js";
import { t as CommunityAvatar } from "./communityAvatar-DgeXPobI.js";
import { n as CommunityPendingRequestsRow } from "./communityShared-DpGGDZXb.js";
import { n as CommunityPeerDialogList, r as createCommunityDialogElement } from "./communityPeerDialogList-eL2VIhdd.js";
import { n as CommunityPendingRequestRow, r as showCommunityRequestError, t as createCommunityPendingRequestActions } from "./communityPendingRequestActions-BFGt6gsN.js";
import { a as openCommunityPendingRequests, i as shouldCloseCommunityForum, n as getCommunityChatSections, r as getCommunityLinkedChatKind, t as openCommunityLinkedChat } from "./openCommunityLinkedChat-D2WXcHlX.js";
import { n as AutonomousDialogListBase } from "./handleTabSwipe-vDULoA1V.js";
import { t as InlinePortal } from "./inlinePortal-BWSr1YXm.js";
var communityChats_module_default = {
	HiddenPeerIcon: "_HiddenPeerIcon_7jl7z_1",
	AddChatButton: "_AddChatButton_7jl7z_10",
	LoadError: "_LoadError_7jl7z_23",
	LoadErrorButton: "_LoadErrorButton_7jl7z_29"
};
//#endregion
//#region src/components/autonomousDialogList/communityDialogs.ts
var AutonomousCommunityDialogList = class extends AutonomousDialogListBase {
	constructor({ communityId, middleware, ...options }) {
		super(options);
		this.dialogElements = /* @__PURE__ */ new Map();
		this.items = /* @__PURE__ */ new Map();
		this.itemPositions = /* @__PURE__ */ new Map();
		this.dialogInitPromises = /* @__PURE__ */ new Map();
		this.previewDates = /* @__PURE__ */ new Map();
		this.previewGenerations = /* @__PURE__ */ new Map();
		this.previewMids = /* @__PURE__ */ new Map();
		this.previewPromises = /* @__PURE__ */ new Map();
		this.previewHydrationPeerIds = /* @__PURE__ */ new Set();
		this.forcedPreviewHydrationPeerIds = /* @__PURE__ */ new Set();
		this.previewHydrationGenerations = /* @__PURE__ */ new Map();
		this.previewHydrationScheduled = false;
		this.hiddenPeerIcons = /* @__PURE__ */ new Map();
		this.previewCommunitySubscriptions = /* @__PURE__ */ new Map();
		this.communityId = communityId;
		this.middleware = middleware;
		this.middleware.onClean(() => {
			this.previewHydrationPeerIds.clear();
			this.forcedPreviewHydrationPeerIds.clear();
			this.previewHydrationGenerations.clear();
			for (const peerId of this.previewCommunitySubscriptions.keys()) this.clearCommunityPreviewSubscription(peerId);
		});
		this.lists = {
			joined: this.appDialogsManager.createChatList(),
			viewable: this.appDialogsManager.createChatList()
		};
		for (const kind of ["joined", "viewable"]) {
			const list = this.lists[kind];
			list.dataset.communitySection = kind;
			this.appDialogsManager.setListClickListener({
				list,
				withContext: true
			});
		}
		this.listenerSetter.add(hotReloadGuard.appImManager)("peer_changed", (chat) => {
			for (const [peerId, dialogElement] of this.dialogElements) this.syncDialogActive(peerId, dialogElement, chat);
		});
		this.listenerSetter.add(rootScope)("peer_typings", async ({ peerId, typings }) => {
			if (!this.dialogElements.has(peerId)) return;
			const dialog = await this.managers.appMessagesManager.getDialogOnly(peerId).catch(() => void 0);
			if (!dialog) return;
			if (typings.length) await this.setTyping(dialog).catch(noop);
			else this.unsetTyping(dialog);
		});
		this.listenerSetter.add(rootScope)("dialog_flush", ({ dialog }) => {
			if (isDialog(dialog)) this.updateDialog(dialog);
		});
		this.listenerSetter.add(rootScope)("dialogs_multiupdate", (dialogs) => {
			for (const [, { dialog }] of dialogs) if (isDialog(dialog)) this.updateDialog(dialog);
		});
		this.listenerSetter.add(rootScope)("dialog_unread", ({ dialog }) => {
			if (isDialog(dialog)) this.updateDialog(dialog);
		});
		this.listenerSetter.add(rootScope)("dialog_notify_settings", (dialog) => {
			if (isDialog(dialog)) this.updateDialog(dialog);
		});
		this.listenerSetter.add(rootScope)("dialog_draft", ({ dialog }) => {
			if (isDialog(dialog)) this.updateDialog(dialog);
		});
		this.listenerSetter.add(rootScope)("dialog_drop", (dialog) => {
			if (isDialog(dialog) && this.dialogElements.has(dialog.peerId)) {
				const promise = this.appDialogsManager.initDialog(this.dialogElements.get(dialog.peerId), this.getDialogOptions(dialog.peerId));
				this.dialogInitPromises.set(dialog.peerId, promise);
				promise.catch(noop);
			}
		});
		const updateHistoryPreview = (message) => {
			const dialogElement = this.dialogElements.get(message.peerId);
			if (!dialogElement || dialogElement.dom.listEl.dataset.communityChatKind !== "viewable") return;
			const currentMid = this.previewMids.get(message.peerId) || 0;
			if (currentMid && message.mid < currentMid) return;
			const generation = this.bumpPreviewGeneration(message.peerId);
			this.previewMids.set(message.peerId, message.mid);
			this.setViewablePreview(message.peerId, message, generation).catch(noop);
		};
		this.listenerSetter.add(rootScope)("history_append", ({ message }) => {
			updateHistoryPreview(message);
		});
		this.listenerSetter.add(rootScope)("history_update", ({ message }) => {
			updateHistoryPreview(message);
		});
		this.listenerSetter.add(rootScope)("history_multiappend", (message) => {
			updateHistoryPreview(message);
		});
		this.listenerSetter.add(rootScope)("history_delete", ({ peerId, msgs }) => {
			const dialogElement = this.dialogElements.get(peerId);
			const previewMid = this.previewMids.get(peerId);
			if (previewMid && msgs.has(previewMid) && dialogElement?.dom.listEl.dataset.communityChatKind === "viewable") this.queueViewablePreviewHydration(peerId, true);
		});
		this.listenerSetter.add(rootScope)("user_update", async (userId) => {
			const peerId = userId.toPeerId();
			const dialogElement = this.dialogElements.get(peerId);
			if (!dialogElement?.dom.avatarEl?.node) return;
			const status = await this.managers.appUsersManager.getUserStatus(userId).catch(() => void 0);
			if (this.dialogElements.get(peerId) === dialogElement) this.appDialogsManager.xd?.setOnlineStatus(dialogElement.dom.avatarEl.node, status?._ === "userStatusOnline");
		});
		this.listenerSetter.add(rootScope)("chat_update", (chatId) => {
			const peerId = chatId.toPeerId(true);
			const dialogElement = this.dialogElements.get(peerId);
			if (dialogElement) this.appDialogsManager.xd?.processDialogForCallStatus(peerId, dialogElement.dom);
		});
		this.listenerSetter.add(rootScope)("auto_delete_period_update", ({ peerId, period }) => {
			this.dialogElements.get(peerId)?.dom.avatarEl?.setAutoDeletePeriod(period);
		});
	}
	getDialogOptions(peerId) {
		return {
			peerId,
			isBatch: true,
			isMainList: false,
			controlled: true,
			dontSetActive: true,
			meAsSaved: true,
			wrapOptions: { middleware: this.middleware }
		};
	}
	removeDialogElement(peerId, dialogElement) {
		this.hiddenPeerIcons.get(peerId)?.remove();
		this.hiddenPeerIcons.delete(peerId);
		this.dialogElements.delete(peerId);
		this.items.delete(peerId);
		this.itemPositions.delete(peerId);
		this.previewDates.delete(peerId);
		this.previewGenerations.delete(peerId);
		this.previewMids.delete(peerId);
		this.previewPromises.delete(peerId);
		this.previewHydrationPeerIds.delete(peerId);
		this.forcedPreviewHydrationPeerIds.delete(peerId);
		this.previewHydrationGenerations.delete(peerId);
		this.dialogInitPromises.delete(peerId);
		this.clearCommunityPreviewSubscription(peerId);
		this.appDialogsManager.setDialogActive(dialogElement.dom.listEl, false);
		dialogElement.remove();
	}
	syncDialogActive(peerId, dialogElement, chat = hotReloadGuard.appImManager.chat) {
		const active = !!chat && hotReloadGuard.appImManager.isSamePeer(chat, {
			peerId,
			type: ChatType.Chat
		});
		this.appDialogsManager.setDialogActive(dialogElement.dom.listEl, active);
	}
	syncHiddenPeerIcon(item, dialogElement) {
		let icon = this.hiddenPeerIcons.get(item.peerId);
		if (item.linked.visible !== false) {
			icon?.remove();
			this.hiddenPeerIcons.delete(item.peerId);
			return;
		}
		if (!icon) {
			icon = Icon("eye2_filled", "inline-icon", "inline-icon-right", communityChats_module_default.HiddenPeerIcon);
			this.hiddenPeerIcons.set(item.peerId, icon);
		}
		const { mutedIcon, titleSpanContainer } = dialogElement.dom;
		const before = mutedIcon?.parentElement === titleSpanContainer ? mutedIcon : null;
		if (icon.parentElement !== titleSpanContainer || icon.nextSibling !== before) titleSpanContainer.insertBefore(icon, before);
	}
	sortList(kind) {
		const list = this.lists[kind];
		const items = [...this.items.values()].filter((item) => item.kind === kind).sort((a, b) => {
			if (kind === "viewable") {
				const dateDelta = (this.previewDates.get(b.peerId) || 0) - (this.previewDates.get(a.peerId) || 0);
				if (dateDelta) return dateDelta;
			}
			return (this.itemPositions.get(a.peerId) || 0) - (this.itemPositions.get(b.peerId) || 0);
		});
		let position = 0;
		for (const item of items) {
			const dialogElement = this.dialogElements.get(item.peerId);
			if (dialogElement) positionElementByIndex(dialogElement.dom.listEl, list, position++);
		}
	}
	async setViewablePreview(peerId, lastMessage, generation) {
		const dialogElement = this.dialogElements.get(peerId);
		if (!dialogElement || dialogElement.dom.listEl.dataset.communityChatKind !== "viewable") return;
		await this.dialogInitPromises.get(peerId)?.catch(noop);
		const dialog = this.items.get(peerId)?.dialog || {
			_: "dialog",
			peerId,
			pFlags: {}
		};
		if (this.previewGenerations.get(peerId) !== generation || this.dialogElements.get(peerId) !== dialogElement || dialogElement.dom.listEl.dataset.communityChatKind !== "viewable") return;
		await this.appDialogsManager.setLastMessageN({
			dialog,
			dialogElement,
			lastMessage,
			setUnread: true
		});
		if (this.previewGenerations.get(peerId) === generation && this.dialogElements.get(peerId) === dialogElement) {
			this.previewMids.set(peerId, lastMessage.mid);
			this.previewDates.set(peerId, lastMessage.date);
			this.syncCommunityPreviewSubscription(peerId, lastMessage, dialogElement);
			this.sortList("viewable");
		}
	}
	clearCommunityPreviewSubscription(peerId) {
		const subscription = this.previewCommunitySubscriptions.get(peerId);
		if (!subscription) return;
		this.previewCommunitySubscriptions.delete(peerId);
		subscription.dispose();
	}
	syncCommunityPreviewSubscription(peerId, message, dialogElement) {
		const action = message._ === "messageService" ? message.action : void 0;
		const communityId = action?._ === "messageActionChangeCommunity" && action.community_id !== void 0 && action.community_id !== 0 && action.community_id !== "0" ? Math.abs(+action.community_id) : void 0;
		const current = this.previewCommunitySubscriptions.get(peerId);
		if (communityId === void 0 || dialogElement.dom.listEl.dataset.communityChatKind !== "viewable") {
			this.clearCommunityPreviewSubscription(peerId);
			return;
		}
		if (current?.communityId === communityId && current.mid === message.mid) return;
		this.clearCommunityPreviewSubscription(peerId);
		const dispose = createRoot((dispose) => {
			const community = useCommunity(() => communityId);
			createEffect(on(() => getCommunityServiceTitle(community()) || "", () => {
				if (this.previewMids.get(peerId) !== message.mid || this.dialogElements.get(peerId) !== dialogElement || dialogElement.dom.listEl.dataset.communityChatKind !== "viewable") return;
				this.setViewablePreview(peerId, message, this.bumpPreviewGeneration(peerId));
			}, { defer: true }));
			return dispose;
		});
		this.previewCommunitySubscriptions.set(peerId, {
			communityId,
			dispose,
			mid: message.mid
		});
	}
	bumpPreviewGeneration(peerId) {
		const generation = (this.previewGenerations.get(peerId) || 0) + 1;
		this.previewGenerations.set(peerId, generation);
		return generation;
	}
	async clearViewablePreview(peerId, generation) {
		const dialogElement = this.dialogElements.get(peerId);
		if (!this.previewMids.has(peerId) || this.previewGenerations.get(peerId) !== generation || dialogElement?.dom.listEl.dataset.communityChatKind !== "viewable") return;
		this.previewMids.delete(peerId);
		this.previewDates.delete(peerId);
		this.clearCommunityPreviewSubscription(peerId);
		await this.appDialogsManager.setLastMessageN({
			dialog: {
				_: "dialog",
				peerId,
				pFlags: {}
			},
			dialogElement,
			setUnread: true
		});
		this.sortList("viewable");
	}
	queueViewablePreviewHydration(peerId, force = false) {
		if (!force && (this.previewPromises.has(peerId) || this.previewHydrationPeerIds.has(peerId))) return;
		this.previewHydrationPeerIds.add(peerId);
		this.previewHydrationGenerations.set(peerId, this.bumpPreviewGeneration(peerId));
		if (force) this.forcedPreviewHydrationPeerIds.add(peerId);
		if (this.previewHydrationScheduled) return;
		this.previewHydrationScheduled = true;
		queueMicrotask(() => this.flushViewablePreviewHydrations());
	}
	flushViewablePreviewHydrations() {
		this.previewHydrationScheduled = false;
		if (!this.middleware()) return;
		const peerIds = [...this.previewHydrationPeerIds].filter((peerId) => {
			return this.items.get(peerId)?.kind === "viewable";
		});
		const forcedPeerIds = new Set(this.forcedPreviewHydrationPeerIds);
		const generations = new Map(peerIds.map((peerId) => [peerId, this.previewHydrationGenerations.get(peerId)]));
		this.previewHydrationPeerIds.clear();
		this.forcedPreviewHydrationPeerIds.clear();
		this.previewHydrationGenerations.clear();
		if (!peerIds.length) return;
		const applyPreviews = async (previews, clearMissing) => {
			const previewsByPeerId = new Map(previews.map((preview) => [preview.peerId, preview]));
			await Promise.all(peerIds.map(async (peerId) => {
				const generation = generations.get(peerId);
				const preview = previewsByPeerId.get(peerId);
				const item = this.items.get(peerId);
				if (preview?.dialog && item?.kind === "viewable" && this.previewGenerations.get(peerId) === generation) item.dialog = preview.dialog;
				if (preview?.lastMessage && this.previewMids.get(peerId) !== preview.lastMessage.mid) await this.setViewablePreview(peerId, preview.lastMessage, generation);
				else if (clearMissing && !preview?.lastMessage && (forcedPeerIds.has(peerId) || this.previewMids.has(peerId))) await this.clearViewablePreview(peerId, generation);
			}));
		};
		const cachedPromise = Promise.resolve(this.managers.appMessagesManager.getConversationPreviews(peerIds)).then((previews) => applyPreviews(previews, false)).catch(noop);
		const loadPromise = Promise.resolve(this.managers.appMessagesManager.loadConversationPreviews(peerIds)).then((previews) => applyPreviews(previews, true)).catch(noop);
		const promise = Promise.all([cachedPromise, loadPromise]).then(() => void 0).finally(() => {
			for (const peerId of peerIds) if (this.previewPromises.get(peerId) === promise) this.previewPromises.delete(peerId);
		});
		for (const peerId of peerIds) this.previewPromises.set(peerId, promise);
	}
	getList(kind) {
		return this.lists[kind];
	}
	setItems(items) {
		const nextPeerIds = new Set(items.map((item) => item.peerId));
		for (const [peerId, dialogElement] of this.dialogElements) {
			if (nextPeerIds.has(peerId)) continue;
			this.removeDialogElement(peerId, dialogElement);
		}
		this.items.clear();
		this.itemPositions.clear();
		items.forEach((item, position) => {
			this.items.set(item.peerId, item);
			this.itemPositions.set(item.peerId, position);
		});
		for (const item of items) {
			let dialogElement = this.dialogElements.get(item.peerId);
			let created = false;
			if (!dialogElement) {
				created = true;
				const initialDialog = item.dialog || {
					_: "dialog",
					peerId: item.peerId,
					pFlags: {}
				};
				dialogElement = createCommunityDialogElement(this.appDialogsManager, item.peerId, { middleware: this.middleware }, {
					autoDeletePeriod: item.dialog?.ttl_period,
					dialog: initialDialog,
					dontSetActive: item.kind === "viewable",
					lastMessage: item.kind === "viewable" ? item.lastMessage : void 0,
					onInitPromise: (promise) => {
						this.dialogInitPromises.set(item.peerId, promise);
					}
				});
				dialogElement.dom.listEl.dataset.communityId = "" + this.communityId;
				this.dialogElements.set(item.peerId, dialogElement);
			}
			const { listEl } = dialogElement.dom;
			if (listEl.dataset.communityChatKind !== item.kind) listEl.dataset.communityChatKind = item.kind;
			dialogElement.setMuted(!!item.muted, 0);
			dialogElement.dom.avatarEl?.setAutoDeletePeriod(item.dialog?.ttl_period || 0);
			this.syncHiddenPeerIcon(item, dialogElement);
			this.syncDialogActive(item.peerId, dialogElement);
			if (item.kind === "viewable") {
				const { lastMessage } = item;
				if (lastMessage && this.previewMids.get(item.peerId) !== lastMessage.mid) {
					const generation = this.bumpPreviewGeneration(item.peerId);
					this.previewMids.set(item.peerId, lastMessage.mid);
					if (created) {
						this.previewDates.set(item.peerId, lastMessage.date);
						this.dialogInitPromises.get(item.peerId)?.then(() => {
							if (this.dialogElements.get(item.peerId) === dialogElement && this.previewMids.get(item.peerId) === lastMessage.mid && dialogElement.dom.listEl.dataset.communityChatKind === "viewable") this.syncCommunityPreviewSubscription(item.peerId, lastMessage, dialogElement);
						}).catch(noop);
					} else this.setViewablePreview(item.peerId, lastMessage, generation).catch(noop);
				} else if (!item.dialog?.top_message) this.queueViewablePreviewHydration(item.peerId);
				else if (this.previewMids.get(item.peerId) !== item.dialog.top_message) {
					const generation = this.bumpPreviewGeneration(item.peerId);
					this.previewMids.set(item.peerId, item.dialog.top_message);
					Promise.resolve(this.managers.appMessagesManager.getMessageByPeer(item.peerId, item.dialog.top_message)).then(async (message) => {
						if (!message && this.previewGenerations.get(item.peerId) === generation && this.previewMids.get(item.peerId) === item.dialog.top_message && this.dialogElements.get(item.peerId) === dialogElement) {
							this.previewMids.delete(item.peerId);
							this.queueViewablePreviewHydration(item.peerId);
							return;
						}
						if (message) await this.setViewablePreview(item.peerId, message, generation);
					}).catch(noop);
				}
			} else {
				this.bumpPreviewGeneration(item.peerId);
				this.previewMids.delete(item.peerId);
				this.previewDates.delete(item.peerId);
				this.clearCommunityPreviewSubscription(item.peerId);
			}
		}
		this.sortList("joined");
		this.sortList("viewable");
	}
	getDialogKey(dialog) {
		return dialog.peerId;
	}
	getDialogKeyFromElement(element) {
		return +element.dataset.peerId;
	}
	getDialogFromElement(element) {
		return this.managers.appMessagesManager.getDialogOnly(this.getDialogKeyFromElement(element));
	}
	getDialogElement(peerId) {
		return this.dialogElements.get(peerId);
	}
	updateDialog(dialog) {
		const dialogElement = this.dialogElements.get(dialog.peerId);
		if (!dialogElement) return;
		const generation = this.bumpPreviewGeneration(dialog.peerId);
		this.appDialogsManager.setLastMessageN({
			dialog,
			dialogElement,
			setUnread: true
		}).then(() => {
			if (this.previewGenerations.get(dialog.peerId) === generation && dialogElement.dom.listEl.dataset.communityChatKind === "viewable") {
				if (dialog.top_message) this.previewMids.set(dialog.peerId, dialog.top_message);
				else this.previewMids.delete(dialog.peerId);
			}
		});
	}
	onChatsScroll() {}
	destroy() {
		this.listenerSetter.removeAll();
		for (const [peerId, dialogElement] of this.dialogElements) this.removeDialogElement(peerId, dialogElement);
		this.lists.joined.remove();
		this.lists.viewable.remove();
		this.previewGenerations.clear();
		this.previewMids.clear();
		this.previewPromises.clear();
		this.dialogInitPromises.clear();
	}
};
//#endregion
//#region src/components/forumTab/communityChats.tsx
var _tmpl$ = /*#__PURE__*/ template(`<div role=alert>`);
var SECTION_TITLES = {
	joined: "Community.ChatsJoined",
	viewable: "Community.ChatsVisible",
	requestable: "Community.ChatsRequestable",
	hidden: "Community.ChatsHidden"
};
var MAX_INLINE_PENDING_REQUESTS = 1;
function CommunityDialogSection(props) {
	const list = props.tab.xd.getList(props.kind);
	return createComponent(Show, {
		get when() {
			return props.items.length;
		},
		get children() {
			return createComponent(Section, {
				get name() {
					return SECTION_TITLES[props.kind];
				},
				children: list
			});
		}
	});
}
function CommunityPeerSection(props) {
	return createComponent(Show, {
		get when() {
			return props.items.length;
		},
		get children() {
			return createComponent(Section, {
				get name() {
					return SECTION_TITLES[props.kind];
				},
				get children() {
					return createComponent(CommunityPeerDialogList, {
						avatarSize: "abitbigger",
						get items() {
							return props.items;
						},
						get middleware() {
							return props.tab.middlewareHelper.get();
						},
						getPeerId: (item) => item.peerId,
						withDialogContextMenu: true,
						getDataset: (item) => ({
							communityId: "" + props.tab.peerId.toChatId(),
							communityChatKind: item.kind
						}),
						getSubtitle: (item) => getCommunityPeerSubtitle(apiManagerProxy.getPeer(item.peerId)),
						getTitleAccessory: (item) => createComponent(Show, {
							get when() {
								return item.linked.visible === false;
							},
							get children() {
								return createComponent(IconTsx, {
									get ["class"]() {
										return `inline-icon inline-icon-right ${communityChats_module_default.HiddenPeerIcon}`;
									},
									icon: "eye2_filled"
								});
							}
						}),
						get onClick() {
							return props.open;
						},
						listRef: (list) => {
							list.dataset.communitySection = props.kind;
						}
					});
				}
			});
		}
	});
}
function CommunityChats(props) {
	const communityId = props.tab.peerId.toChatId();
	const community = useCommunity(() => communityId);
	const full = useCommunityFull(() => communityId);
	const communityDialog = useCommunityDialog(() => communityId);
	const pendingRequests = useCommunityPeerLinkRequests(() => communityId);
	const pendingRequestsCount = useCommunityPendingRequestsCount(() => communityId);
	const peers = usePeers();
	const [isTogglingAsOne, setIsTogglingAsOne] = createSignal(false);
	const [loadFailed, setLoadFailed] = createSignal(false);
	const [loadingFull, setLoadingFull] = createSignal(false);
	const loadFull = async () => {
		if (loadingFull()) return;
		setLoadingFull(true);
		try {
			await props.tab.managers.appProfileManager.getChatFull(communityId);
			setLoadFailed(false);
		} catch (error) {
			console.error("load community error", error);
			setLoadFailed(true);
		} finally {
			setLoadingFull(false);
		}
	};
	onMount(() => {
		loadFull();
	});
	const pendingActions = createCommunityPendingRequestActions({
		apply: (request, reject) => {
			return props.tab.managers.appCommunitiesManager.togglePeerLinkRequestApproval({
				communityId,
				peerId: getPeerId(request.peer),
				reject
			});
		},
		onError: (error, request) => {
			return showCommunityRequestError({
				error,
				managers: props.tab.managers,
				peerId: getPeerId(request.peer)
			});
		}
	});
	const isCollapsed = () => {
		const value = community();
		return value?._ === "community" && !!value.pFlags.collapsed_in_dialogs;
	};
	const dialogByPeerId = createMemo(() => {
		return new Map((communityDialog()?.dialogs || []).map((dialog) => [dialog.peerId, dialog]));
	});
	const mutedPeerIds = createMemo(() => {
		return new Set(communityDialog()?.mutedPeerIds || []);
	});
	const linkedChats = createMemo(() => {
		return (full()?.linked_peers || []).map((linked, order) => {
			const peerId = getPeerId(linked.peer);
			const peer = peers[peerId] || apiManagerProxy.getPeer(peerId);
			const storedDialog = dialogByPeerId().get(peerId);
			const topMessage = storedDialog?.top_message;
			const draft = storedDialog?.draft;
			const dialog = storedDialog ? unwrap(storedDialog) : void 0;
			const message = topMessage ? apiManagerProxy.getMessageByPeer(peerId, topMessage) : void 0;
			const draftDate = draft?._ === "draftMessage" ? draft.date : 0;
			return {
				linked,
				peerId,
				dialog,
				lastMessage: message,
				muted: mutedPeerIds().has(peerId),
				kind: getCommunityLinkedChatKind(peer, linked, dialog),
				order,
				activityDate: Math.max(message?.date || 0, draftDate)
			};
		});
	});
	const sections = createMemo(() => {
		return getCommunityChatSections(linkedChats());
	});
	const chatsCount = createMemo(() => full()?.linked_peers?.length);
	createEffect(() => {
		const value = sections();
		props.tab.xd.setItems([...value.joined, ...value.viewable]);
	});
	const canManageRequests = createMemo(() => {
		return hasRights(community(), "manage_linked_peers");
	});
	const canAddChats = createMemo(() => {
		const value = community();
		return value?._ === "community" && !value.pFlags.left && (hasRights(value, "manage_linked_peers") || !value.default_banned_rights?.pFlags.manage_linked_peers);
	});
	const pendingCount = createMemo(() => {
		if (!canManageRequests()) return 0;
		return pendingRequestsCount();
	});
	const inlinePendingRequests = createMemo(() => {
		if (pendingCount() > MAX_INLINE_PENDING_REQUESTS) return [];
		return (pendingRequests()?.requests || []).filter((request) => {
			return !pendingActions.stagedPeerIds().has(getPeerId(request.peer));
		});
	});
	let requestedPendingCount = -1;
	createEffect(() => {
		const count = pendingCount();
		const state = pendingRequests();
		if (state && !state.loaded) requestedPendingCount = -1;
		if (!count || count > MAX_INLINE_PENDING_REQUESTS || requestedPendingCount === count || state?.loaded && state.totalCount === count) return;
		requestedPendingCount = count;
		props.tab.loadPendingRequests().catch(() => {
			requestedPendingCount = -1;
		});
	});
	const open = (item) => {
		props.tab.openLinkedChat({
			peerId: item.peerId,
			kind: item.kind,
			visible: item.linked.visible
		});
	};
	const toggleAsOne = async (collapsed) => {
		if (isTogglingAsOne()) return;
		setIsTogglingAsOne(true);
		try {
			await props.tab.toggleAsOne(collapsed);
		} finally {
			setIsTogglingAsOne(false);
		}
	};
	return [
		createComponent(Portal, {
			get mount() {
				return props.tab.headerAvatar;
			},
			get children() {
				return createComponent(CommunityAvatar, {
					get community() {
						return community();
					},
					get title() {
						return community()?.title;
					},
					size: 32
				});
			}
		}),
		createComponent(InlinePortal, {
			get mount() {
				return props.tab.title;
			},
			get children() {
				return community()?.title || i18n("Community.Chats");
			}
		}),
		createComponent(InlinePortal, {
			get mount() {
				return props.tab.subtitle;
			},
			get children() {
				return memo(() => chatsCount() === void 0)() ? i18n("Community.Title") : i18n("Community.ChatsCount", [chatsCount()]);
			}
		}),
		createComponent(Show, {
			get when() {
				return full() || community()?._ === "communityForbidden";
			},
			get fallback() {
				return createComponent(Show, {
					get when() {
						return loadFailed();
					},
					get fallback() {
						return createComponent(PreloaderTsx, {});
					},
					get children() {
						return createComponent(Section, { get children() {
							var _el$ = _tmpl$();
							insert(_el$, () => i18n("Error.AnError"), null);
							insert(_el$, createComponent(Button, {
								get ["class"]() {
									return communityChats_module_default.LoadErrorButton;
								},
								primaryTransparent: true,
								get disabled() {
									return loadingFull();
								},
								text: "Community.Retry",
								onClick: loadFull
							}), null);
							createRenderEffect(() => className(_el$, communityChats_module_default.LoadError));
							return _el$;
						} });
					}
				});
			},
			get children() {
				return [
					createComponent(Section, {
						caption: "Community.ShowAsOneInfo",
						get children() {
							return createComponent(Row, { get children() {
								return [createComponent(Row.CheckboxFieldToggle, { get children() {
									return createComponent(CheckboxFieldTsx, {
										toggle: true,
										get checked() {
											return isCollapsed();
										},
										get disabled() {
											return isTogglingAsOne() || community()?._ !== "community";
										},
										onChange: (collapsed) => void toggleAsOne(collapsed)
									});
								} }), createComponent(Row.Title, { get children() {
									return i18n("Community.ShowAsOne");
								} })];
							} });
						}
					}),
					createComponent(Show, {
						get when() {
							return inlinePendingRequests().length;
						},
						get children() {
							return createComponent(Section, {
								name: "Community.PendingRequests",
								get children() {
									return createComponent(For, {
										get each() {
											return inlinePendingRequests();
										},
										children: (request) => createComponent(CommunityPendingRequestRow, {
											request,
											get onApply() {
												return pendingActions.stage;
											}
										})
									});
								}
							});
						}
					}),
					createComponent(Show, {
						get when() {
							return pendingCount() > MAX_INLINE_PENDING_REQUESTS;
						},
						get children() {
							return createComponent(Section, { get children() {
								return createComponent(CommunityPendingRequestsRow, {
									get count() {
										return pendingCount();
									},
									get onClick() {
										return props.tab.openPendingRequests;
									}
								});
							} });
						}
					}),
					createComponent(CommunityDialogSection, {
						get tab() {
							return props.tab;
						},
						kind: "joined",
						get items() {
							return sections().joined;
						}
					}),
					createComponent(CommunityDialogSection, {
						get tab() {
							return props.tab;
						},
						kind: "viewable",
						get items() {
							return sections().viewable;
						}
					}),
					createComponent(CommunityPeerSection, {
						get tab() {
							return props.tab;
						},
						kind: "requestable",
						get items() {
							return sections().requestable;
						},
						open
					}),
					createComponent(CommunityPeerSection, {
						get tab() {
							return props.tab;
						},
						kind: "hidden",
						get items() {
							return sections().hidden;
						},
						open
					}),
					createComponent(Show, {
						get when() {
							return canAddChats();
						},
						get children() {
							return createComponent(Button, {
								get ["class"]() {
									return communityChats_module_default.AddChatButton;
								},
								primaryFilled: true,
								icon: "add",
								text: "Community.AddChatButton",
								get onClick() {
									return props.tab.openAddChat;
								}
							});
						}
					})
				];
			}
		})
	];
}
//#endregion
//#region src/components/forumTab/communityForumTab.tsx
var CommunityForumTab = class extends ForumTab {
	constructor(..._args) {
		super(..._args);
		this.membershipCloseRequested = false;
		this.joiningPeerIds = /* @__PURE__ */ new Set();
		this.openLinkedChat = async (options) => {
			return openCommunityLinkedChat({
				...options,
				communityId: this.peerId.toChatId(),
				managers: this.managers,
				joiningPeerIds: this.joiningPeerIds,
				openPeer: this.openChat
			});
		};
		this.loadPendingRequests = () => {
			if (this.pendingRequestsPromise) return this.pendingRequestsPromise;
			const promise = this.managers.appCommunitiesManager.getPeerLinkRequests({
				communityId: this.peerId.toChatId(),
				limit: 100
			}).then(() => {}).finally(() => {
				if (this.pendingRequestsPromise === promise) this.pendingRequestsPromise = void 0;
			});
			this.pendingRequestsPromise = promise;
			return promise;
		};
		this.openPendingRequests = () => {
			openCommunityPendingRequests({
				slider: hotReloadGuard.appSidebarLeft,
				communityId: this.peerId.toChatId()
			});
		};
		this.openAddChat = () => {
			hotReloadGuard.appSidebarLeft.createTab(hotReloadGuard.tabs.AppAddChatToCommunityTab).open({ communityId: this.peerId.toChatId() });
		};
		this.openChat = async (peerId) => {
			await hotReloadGuard.appImManager.setPeer({ peerId });
		};
		this.toggleAsOne = async (collapsed) => {
			try {
				await this.managers.appCommunitiesManager.toggleCollapsedInDialogs(this.peerId.toChatId(), collapsed);
			} catch (error) {
				toast(error?.type || i18n("Error.AnError"));
			}
		};
		this.canEditCommunity = () => {
			return this.managers.appCommunitiesManager.canEditCommunity(this.peerId.toChatId());
		};
		this.isMuted = () => {
			return this.managers.appCommunitiesManager.isCommunityMuted(this.peerId.toChatId());
		};
		this.openMute = () => {
			showCommunityMutePopup(this.peerId.toChatId());
		};
		this.unmute = () => {
			unmuteCommunity(this.peerId.toChatId(), this.managers);
		};
		this.openEdit = async () => {
			if (!await this.canEditCommunity()) return;
			hotReloadGuard.appSidebarLeft.createTab(hotReloadGuard.tabs.AppEditCommunityTab).open({ communityId: this.peerId.toChatId() });
		};
	}
	syncInit() {
		super.syncInit();
		this.container.classList.add("community-forum-tab");
		this.createHeaderAvatar();
		this.xd = new AutonomousCommunityDialogList({
			appDialogsManager: hotReloadGuard.appDialogsManager,
			communityId: this.peerId.toChatId(),
			middleware: this.middlewareHelper.get()
		});
		const mount = document.createElement("div");
		this.scrollable.append(mount);
		this.dispose = render(() => {
			const _self$ = this;
			return createComponent(SolidJSHotReloadGuardProvider, { get children() {
				return createComponent(CommunityChats, { tab: _self$ });
			} });
		}, mount);
		const communityId = this.peerId.toChatId();
		this.membershipDispose = createRoot((dispose) => {
			const community = useCommunity(() => communityId);
			const communityDialog = useCommunityDialog(() => communityId);
			const joinedCommunities = useJoinedCommunities();
			let hadCommunityDialog = !!communityDialog();
			createEffect(() => {
				const currentDialog = communityDialog();
				hadCommunityDialog || (hadCommunityDialog = !!currentDialog);
				if (!this.membershipCloseRequested && shouldCloseCommunityForum({
					communityId,
					community: community(),
					communityDialog: currentDialog,
					joinedCommunities: joinedCommunities(),
					hadCommunityDialog
				})) {
					this.membershipCloseRequested = true;
					queueMicrotask(this._close);
				}
			});
			return dispose;
		});
	}
	init(options) {
		const result = super.init(options);
		const buttons = [
			{
				icon: "edit",
				text: "Community.Edit",
				onClick: this.openEdit,
				verify: this.canEditCommunity
			},
			{
				icon: "mute",
				text: "ChatList.Context.Mute",
				onClick: this.openMute,
				verify: async () => !await this.isMuted()
			},
			{
				icon: "unmute",
				text: "ChatList.Context.Unmute",
				onClick: this.unmute,
				verify: this.isMuted
			}
		];
		const menu = ButtonMenuToggle({
			listenerSetter: this.listenerSetter,
			direction: "bottom-left",
			buttons
		});
		const updateMenuVisibility = createButtonMenuVisibility(menu, buttons);
		const communityId = this.peerId.toChatId();
		this.menuDispose = createRoot((dispose) => {
			const community = useCommunity(() => communityId);
			const communityDialog = useCommunityDialog(() => communityId);
			createEffect(on([community, communityDialog], () => updateMenuVisibility()));
			return dispose;
		});
		this.header.append(menu);
		return result;
	}
	async asyncInit() {
		await super.asyncInit();
	}
	onCloseAfterTimeout() {
		this.menuDispose?.();
		this.menuDispose = void 0;
		this.membershipDispose?.();
		this.membershipDispose = void 0;
		this.dispose?.();
		this.dispose = void 0;
		super.onCloseAfterTimeout();
	}
};
//#endregion
export { CommunityForumTab };
