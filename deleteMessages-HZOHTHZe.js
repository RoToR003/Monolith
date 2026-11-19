//# allFunctionsCalledOnLoad
import { n as rootScope } from "./rootScope-CZS0lmz8.js";
import { a as i18n, u as langPack_default } from "./langPack-BmdJGr44.js";
import { C as createSignal, M as onCleanup, g as createEffect, j as on, p as createComponent, s as Show, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { t as tsNow } from "./tsNow-DUzGGNNb.js";
import { n as bindManagersToSession } from "./bindManagersToAccount-BL82O9H9.js";
import { c as insert, g as template, o as className$1, p as setStyleProperty, u as memo } from "./web-BPyQozky.js";
import { t as classNames } from "./classNames-DxGDjmvw.js";
import { t as IconTsx } from "./iconTsx-B4lOk4A6.js";
import { t as getMiddleware } from "./middleware-D6HuIqPm.js";
import { t as ListenerSetter } from "./listenerSetter-BER6qAXn.js";
import { i as createPopup, n as PopupElement, r as addCancelButton } from "./indexTsx-v9mB9bAq.js";
import { t as animate } from "./animation-Dd3Xpw_9.js";
import { L as formatFullSentTime } from "./index-B7axFZql.js";
import { Gt as getPeerTitle, M as avatarNew, a as createRowTitle, dt as wrapPeerTitle, ft as PeerTitle, i as Row, r as showPeerPopup, t as confirmationPopup } from "./confirmationPopup-Bz6mK0o-.js";
import { Vt as canEditAdmin, Wt as isEphemeralMessage, hn as filterUnique, mn as getParticipantPeerId, on as namedPromises, un as hasRights } from "./getChatMigratedTo-ChhMNXuu.js";
import { X as flatten } from "./canPollPeerStories-D3HoBvLX.js";
import { a as Section } from "./emailVerification-C8QYZSyu.js";
import { r as toastNew } from "./toast-B6VD5M7R.js";
import { t as ChatType } from "./chatType-C89v744i.js";
import { t as CheckboxFields } from "./checkboxFields-CNHKTV_g.js";
import { n as ChatPermissions } from "./sharedPermissions-DEwJS4wx.js";
//#region src/components/stackedAvatars.ts
var CLASS_NAME = "stacked-avatars";
var AVATAR_CLASS_NAME = CLASS_NAME + "-avatar";
var AVATAR_CONTAINER_CLASS_NAME = AVATAR_CLASS_NAME + "-container";
var StackedAvatars = class {
	constructor(options) {
		this.peerIdByContainer = /* @__PURE__ */ new WeakMap();
		this.lazyLoadQueue = options.lazyLoadQueue;
		this.avatarSize = options.avatarSize;
		this.accountNumber = options.accountNumber;
		this.middlewareHelper = options.middleware.create();
		this.container = document.createElement("div");
		this.container.classList.add(CLASS_NAME);
		this.container.style.setProperty("--avatar-size", options.avatarSize + "px");
	}
	setAccountNumber(accountNumber) {
		this.accountNumber = accountNumber;
	}
	/**
	* MACOS, ANDROID - без реверса
	* WINDOWS DESKTOP - реверс
	* все приложения накладывают аватарку первую на вторую, а в макете зато вторая на первую, ЛОЛ!
	*/
	render(peerIds, loadPromises = []) {
		const children = this.container.children;
		peerIds = peerIds.slice().reverse();
		if (peerIds.length > 3) peerIds = peerIds.slice(-3);
		peerIds.forEach((peerId, idx) => {
			let avatarContainer = children[idx];
			if (avatarContainer && this.peerIdByContainer.get(avatarContainer) === peerId) {
				avatarContainer.classList.toggle("is-first", idx === 0);
				avatarContainer.classList.toggle("is-last", idx === peerIds.length - 1);
				return;
			}
			if (!avatarContainer) {
				avatarContainer = document.createElement("div");
				avatarContainer.classList.add(AVATAR_CONTAINER_CLASS_NAME);
				avatarContainer.middlewareHelper = this.middlewareHelper.get().create();
			} else avatarContainer.middlewareHelper.clean();
			const avatarElem = avatarNew({
				middleware: avatarContainer.middlewareHelper.get(),
				size: this.avatarSize,
				isDialog: false,
				lazyLoadQueue: this.lazyLoadQueue,
				peerId,
				accountNumber: this.accountNumber
			});
			avatarElem.node.classList.add(AVATAR_CLASS_NAME);
			loadPromises?.push(avatarElem.readyThumbPromise);
			avatarContainer.replaceChildren(avatarElem.node);
			this.peerIdByContainer.set(avatarContainer, peerId);
			if (!avatarContainer.parentNode) this.container.append(avatarContainer);
			avatarContainer.classList.toggle("is-first", idx === 0);
			avatarContainer.classList.toggle("is-last", idx === peerIds.length - 1);
		});
		Array.from(children).slice(peerIds.length).forEach((el) => {
			el.middlewareHelper.destroy();
			el.remove();
		});
		return Promise.all(loadPromises);
	}
};
function StackedAvatarsTsx(props) {
	const middleware = getMiddleware();
	const stackedAvatars = new StackedAvatars({
		avatarSize: props.avatarSize,
		lazyLoadQueue: props.lazyLoadQueue,
		middleware: middleware.get()
	});
	onCleanup(() => middleware.destroy());
	createEffect(on(() => [props.peerIds, props.accountNumber], ([peerIds, accountNumber]) => {
		stackedAvatars.setAccountNumber(accountNumber);
		stackedAvatars.render(peerIds);
	}));
	return stackedAvatars.container;
}
//#endregion
//#region src/components/popups/deleteMegagroupMessagesShared.ts
var getNoModerateOptions = () => ({
	reportSpam: false,
	reportReaction: false,
	deleteAllMessages: false,
	deleteAllReactions: false,
	banOrRestrict: false
});
function getCommunityId(managers, peerId) {
	return managers.appCommunitiesManager?.getPeerLinkedCommunityId(peerId);
}
async function getCommunityModerateOptions(managers, peerId) {
	const communitiesManager = managers.appCommunitiesManager;
	if (!communitiesManager) return {};
	const communityId = await getCommunityId(managers, peerId);
	if (!(!!communityId && await communitiesManager.hasRights(communityId, "ban_users").catch(() => false))) return {};
	const communityFull = await Promise.resolve(managers.appProfileManager.getChatFull(communityId)).catch(() => void 0);
	return {
		communityId,
		communityChatsCount: communityFull?._ === "communityFull" ? communityFull.linked_peers.length : void 0
	};
}
//#endregion
//#region src/components/popups/deleteMegagroupMessagesActions.ts
async function confirmDeleteMegagroupMessages(ctx) {
	const byPeers = ctx.fields.reduce((acc, field) => {
		if (field.peerId === void 0 || field.action === "deleteOptions" || !field.checkboxField.checked) return acc;
		let set = acc.get(field.peerId);
		if (!set) acc.set(field.peerId, set = /* @__PURE__ */ new Set());
		set.add(field.action);
		return acc;
	}, /* @__PURE__ */ new Map());
	const mids = ctx.messages.length ? ctx.messages.map(({ mid }) => mid) : [ctx.reaction.message.mid];
	const peerId = ctx.reaction?.message.peerId ?? ctx.messages[0].peerId;
	const deleteOriginReactions = !!ctx.reaction && byPeers.get(ctx.reaction.participantPeerId)?.has("deleteReactions");
	const { restricting, managers } = ctx;
	for (const [fromId, actions] of byPeers) {
		if (actions.has("communityBan")) {
			const communityId = await getCommunityId(managers, peerId);
			if (!communityId || !await ctx.banFromCommunity(communityId, fromId)) return false;
		}
		const promises = [];
		if (actions.has("ban") && restricting) {
			const rights = ctx.chatPermissions.takeOut();
			promises.push(managers.appChatsManager.editBanned(peerId.toChatId(), fromId, rights));
		} else if (actions.has("ban")) promises.push(managers.appChatsManager.kickFromChannel(peerId.toChatId(), fromId));
		if (actions.has("report")) {
			if (ctx.reaction && ctx.reportReaction && fromId === ctx.reaction.participantPeerId) promises.push(managers.appReactionsManager.reportParticipantReaction({
				peerId,
				mid: ctx.reaction.message.mid,
				participantPeerId: fromId
			}));
			else promises.push(managers.appMessagesManager.reportSpamMessages(peerId, fromId, mids));
		}
		if (actions.has("delete")) promises.push(managers.appMessagesManager.doFlushHistory({
			peerId,
			justClear: false,
			revoke: true,
			participantPeerId: fromId
		}));
		if (actions.has("deleteReactions")) promises.push(managers.appReactionsManager.deleteParticipantReactions({
			peerId,
			participantPeerId: fromId,
			...ctx.reaction?.participantPeerId === fromId ? {
				originMid: ctx.reaction.message.mid,
				knownReaction: ctx.reaction.knownReaction
			} : {}
		}));
	}
	if (ctx.reaction && !deleteOriginReactions) managers.appReactionsManager.deleteParticipantReaction({
		peerId,
		mid: ctx.reaction.message.mid,
		participantPeerId: ctx.reaction.participantPeerId,
		knownReaction: ctx.reaction.knownReaction
	});
	if (ctx.messages.length) managers.appMessagesManager.deleteMessages(peerId, mids, true);
	ctx.onConfirm?.();
	return true;
}
async function getModerateOptionsFor(ctx, peerId) {
	if (!ctx.reaction) return {
		reportSpam: true,
		reportReaction: false,
		deleteAllMessages: true,
		deleteAllReactions: true,
		banOrRestrict: true,
		...await getCommunityModerateOptions(ctx.managers, peerId)
	};
	const participantPeerId = ctx.reaction.participantPeerId;
	if (participantPeerId === peerId || participantPeerId === rootScope.myId) return getNoModerateOptions();
	const chatId = peerId.toChatId();
	if (participantPeerId.isAnyChat()) {
		if ((await ctx.managers.appProfileManager.getChatFull(participantPeerId.toChatId()).catch(() => void 0))?.linked_chat_id === chatId) return getNoModerateOptions();
	}
	const [chat, canDeleteMessages, canBanUsers, isPublic] = await Promise.all([
		ctx.managers.appChatsManager.getChat(chatId),
		ctx.managers.appChatsManager.hasRights(chatId, "delete_messages"),
		ctx.managers.appChatsManager.hasRights(chatId, "ban_users"),
		ctx.managers.appChatsManager.isPublic(chatId)
	]);
	const isChannel = chat?._ === "channel";
	const isMegagroup = isChannel && !!chat.pFlags.megagroup;
	let banOrRestrict = false;
	if (isChannel && canBanUsers) {
		if (chat.pFlags.creator) banOrRestrict = true;
		else {
			const participant = await ctx.managers.appProfileManager.getParticipant(chatId, participantPeerId).catch(() => void 0);
			banOrRestrict = !!participant && canEditAdmin(chat, participant, rootScope.myId);
		}
	}
	return {
		reportSpam: isChannel,
		reportReaction: isMegagroup && isPublic,
		deleteAllMessages: isChannel && canDeleteMessages,
		deleteAllReactions: canDeleteMessages,
		banOrRestrict,
		...isChannel ? await getCommunityModerateOptions(ctx.managers, peerId) : {}
	};
}
/** Ban a participant from the community behind a chat, confirming first if they own chats in it. */
async function banParticipantFromCommunity(managers, communityId, participantId) {
	try {
		const joinedChats = await managers.appCommunitiesManager.getParticipantJoinedChats({
			communityId,
			participantId
		});
		if (joinedChats.creator_chat_ids.length) {
			const title = await getPeerTitle({
				peerId: participantId,
				plainText: true,
				onlyFirstName: true
			});
			try {
				await confirmationPopup({
					titleLangKey: "Community.BanWarningTitle",
					descriptionLangKey: "Community.BanWarning",
					descriptionLangArgs: [title, joinedChats.creator_chat_ids.length],
					button: {
						langKey: "Community.Ban",
						isDanger: true
					}
				});
			} catch {
				return false;
			}
		}
		await managers.appCommunitiesManager.toggleParticipantBanned({
			communityId,
			participantId
		});
		toastNew({
			langPackKey: "Community.Banned",
			langPackArguments: [await getPeerTitle({
				peerId: participantId,
				plainText: true,
				onlyFirstName: true
			})]
		});
		return true;
	} catch (error) {
		console.error("ban participant from community error", error);
		toastNew({ langPackKey: "Error.AnError" });
		return false;
	}
}
//#endregion
//#region src/components/popups/deleteMegagroupMessages.tsx
var _tmpl$ = /*#__PURE__*/ template(`<div class=popup-delete-megagroup-messages-permissions>`);
var _tmpl$2 = /*#__PURE__*/ template(`<div>`);
var className = "popup-delete-megagroup-messages";
async function showDeleteMegagroupMessagesPopup(options) {
	const reaction = "reaction" in options ? options.reaction : void 0;
	const messages = "messages" in options ? options.messages : [];
	const managers = bindManagersToSession(rootScope.managers);
	const middlewareHelper = getMiddleware();
	const middleware = middlewareHelper.get();
	const listenerSetter = new ListenerSetter();
	const [show, setShow] = createSignal(false);
	const [title, setTitle] = createSignal(reaction ? i18n("DeleteReaction") : i18n("DeleteOptionsTitle", [messages.length]));
	const ctx = {
		fields: void 0,
		messages,
		reaction,
		managers,
		onConfirm: options.onConfirm,
		banFromCommunity: (communityId, participantId) => banParticipantFromCommunity(managers, communityId, participantId)
	};
	const [scrollableRef, setScrollableRef] = createSignal();
	function updateReactionTitle() {
		if (!reaction || !ctx.fields) return;
		const isChecked = (action) => ctx.fields.some((field) => field.peerId === reaction.participantPeerId && field.action === action && field.checkboxField?.checked);
		const key = isChecked("delete") ? "DeleteAllMessages" : isChecked("deleteReactions") ? "DeleteAllReactions" : "DeleteReaction";
		setTitle(i18n(key));
	}
	const fromPeerIds = reaction ? [reaction.participantPeerId] : filterUnique(messages.map(({ fromId }) => fromId));
	const peerId = reaction?.message.peerId ?? messages[0].peerId;
	const stackedAvatars = new StackedAvatars({
		middleware,
		avatarSize: 32
	});
	const loadPromises = [];
	stackedAvatars.render(fromPeerIds.slice(0, 3), loadPromises);
	stackedAvatars.container.classList.add(`${className}-avatars`);
	const avatarsContainer = stackedAvatars.container;
	const isSinglePeer = fromPeerIds.length === 1;
	const moderateOptions = await getModerateOptionsFor(ctx, peerId);
	ctx.reportReaction = moderateOptions.reportReaction;
	const deletePeerTitle = isSinglePeer ? await wrapPeerTitle({
		peerId: fromPeerIds[0],
		onlyFirstName: true
	}) : void 0;
	const actions = [];
	if (moderateOptions.reportSpam) actions.push({
		action: "report",
		peerIds: fromPeerIds,
		langKey: "DeleteReportSpam"
	});
	if (!isSinglePeer) {
		if (moderateOptions.deleteAllMessages) actions.push({
			action: "delete",
			peerIds: fromPeerIds,
			langKey: "DeleteAllMessages"
		});
		if (moderateOptions.deleteAllReactions) actions.push({
			action: "deleteReactions",
			peerIds: fromPeerIds,
			langKey: "DeleteAllReactions"
		});
	}
	if (moderateOptions.banOrRestrict) actions.push({
		action: "ban",
		peerIds: fromPeerIds,
		langKey: isSinglePeer ? "DeleteBan" : "DeleteBanUsers",
		langArgs: isSinglePeer ? [await wrapPeerTitle({
			peerId: fromPeerIds[0],
			onlyFirstName: true
		})] : void 0
	});
	if (isSinglePeer && fromPeerIds[0].isUser() && fromPeerIds[0] !== rootScope.myId && moderateOptions.communityId) actions.push({
		action: "communityBan",
		peerIds: fromPeerIds,
		langKey: "Community.BanFromCommunity"
	});
	const nameStart = "delete-fields";
	const join = (...args) => [nameStart, ...args].join("-");
	const wrap = (item) => {
		const nested = isSinglePeer ? [] : item.peerIds.map((peerId) => {
			const name = join(item.action, "" + peerId);
			return {
				action: item.action,
				name,
				peerId,
				peerRow: true
			};
		});
		return [{
			action: item.action,
			text: item.langKey,
			textArgs: item.langArgs,
			nested: isSinglePeer ? void 0 : nested,
			name: isSinglePeer ? join(item.action, "" + peerId) : join(item.action),
			peerId: isSinglePeer ? item.peerIds[0] : void 0
		}, ...nested];
	};
	const fields = flatten(actions.map(wrap));
	if (isSinglePeer) {
		const nested = [];
		if (moderateOptions.deleteAllMessages) nested.push({
			action: "delete",
			text: "DeleteAllMessages",
			name: join("delete", "" + fromPeerIds[0]),
			peerId: fromPeerIds[0]
		});
		if (moderateOptions.deleteAllReactions) nested.push({
			action: "deleteReactions",
			text: "DeleteAllReactions",
			name: join("deleteReactions", "" + fromPeerIds[0]),
			peerId: fromPeerIds[0]
		});
		if (nested.length) {
			const useDeleteOptions = nested.length > 1;
			const deleteOptionsField = useDeleteOptions ? {
				action: "deleteOptions",
				text: "DeleteAllFrom",
				textArgs: [deletePeerTitle],
				nested,
				name: join("deleteOptions"),
				nestedRightButtonIcon: false
			} : nested[0];
			if (useDeleteOptions) deleteOptionsField.setNestedCounter = (count) => {
				deleteOptionsField.nestedCounter.textContent = `${count}/${nested.length}`;
			};
			const reportIndex = fields.findIndex((field) => field.action === "report");
			fields.splice(reportIndex + 1, 0, deleteOptionsField, ...useDeleteOptions ? nested : []);
		}
	}
	ctx.fields = fields;
	const checkboxFields = new CheckboxFields({
		fields,
		listenerSetter,
		middleware,
		round: true,
		onRowCreation: (row, info) => {
			if (!info.nestedTo || !info.peerRow) return;
			row.container.classList.add(`${className}-row`);
			const div = document.createElement("div");
			div.classList.add(`${className}-row-title`);
			const title = createRowTitle();
			const avatar = avatarNew({
				peerId: info.peerId,
				middleware,
				size: 32
			});
			const peerTitle = new PeerTitle();
			const peerTitlePromise = peerTitle.update({
				peerId: info.peerId,
				onlyFirstName: true
			});
			title.append(peerTitle.element);
			loadPromises.push(avatar.readyThumbPromise, peerTitlePromise);
			div.append(avatar.node, title);
			row.container.append(div);
		},
		rightButtonIcon: "group_filled",
		onAnyChange: () => {
			updateReactionTitle();
			onAnyChange();
		},
		onExpand: () => {
			const duration = 300;
			const startTime = Date.now();
			animate(() => {
				scrollableRef()?.onSizeChange();
				return Math.min((Date.now() - startTime) / duration, 1) < 1;
			});
		}
	});
	const createdFields = fields.map((field) => {
		return checkboxFields.createField(field)?.nodes;
	}).filter(Boolean);
	const hasBanAction = fields.some((field) => field.action === "ban");
	let chatPermissionsContainer;
	if (hasBanAction) {
		chatPermissionsContainer = document.createElement("div");
		ctx.chatPermissions = new ChatPermissions({
			appendTo: chatPermissionsContainer,
			chatId: peerId.toChatId(),
			listenerSetter
		}, managers);
	}
	let onAnyChange;
	const Content = () => {
		const [banning, setBanning] = createSignal([]);
		const [communityBanning, setCommunityBanning] = createSignal(false);
		const [collapsed, setCollapsed] = createSignal(true);
		const collapsedName = () => collapsed() ? banning().length === 1 ? "DeleteToggleRestrictUser" : "DeleteToggleRestrictUsers" : banning().length === 1 ? "DeleteToggleBanUser" : "DeleteToggleBanUsers";
		onAnyChange = () => {
			const peerIds = fields.filter((field) => field.action === "ban" && field.checkboxField.checked && field.peerId).map(({ peerId }) => peerId);
			setBanning(peerIds);
			setCommunityBanning(fields.some((field) => {
				return field.action === "communityBan" && field.checkboxField.checked;
			}));
		};
		createEffect(() => {
			if (!banning().length) setCollapsed(true);
		});
		createEffect(() => {
			if (!hasBanAction) return;
			const field = fields.find((field) => field.action === "ban" && (isSinglePeer ? true : !field.peerId));
			const i18nElement = langPack_default.weakMap.get(field.row.title.firstElementChild);
			ctx.restricting = !collapsed();
			i18nElement.compareAndUpdate({ key: collapsed() ? isSinglePeer ? "DeleteBan" : "DeleteBanUsers" : isSinglePeer ? "DeleteRestrict" : "DeleteRestrictUsers" });
		});
		createEffect(() => {
			if (!collapsed()) {
				const duration = 300;
				const startTime = Date.now();
				const scrollPosition = scrollableRef().container.scrollTop + scrollableRef().container.clientHeight;
				const path = 712 + scrollableRef().container.scrollHeight - scrollPosition;
				animate(() => {
					const progress = Math.min((Date.now() - startTime) / duration, 1);
					const newScrollPosition = scrollPosition + path * progress;
					scrollableRef().container.scrollTop = newScrollPosition;
					return progress < 1;
				});
			}
		});
		return [
			memo(() => memo(() => !!!!createdFields.length)() && createComponent(Section, {
				name: "DeleteAdditionalActions",
				noShadow: true,
				noDelimiter: true,
				get children() {
					return flatten(createdFields);
				}
			})),
			createComponent(Show, {
				get when() {
					return memo(() => !!communityBanning())() && moderateOptions.communityChatsCount;
				},
				get children() {
					return createComponent(Section, {
						noShadow: true,
						noDelimiter: true,
						get children() {
							return createComponent(Row, { get children() {
								return createComponent(Row.Subtitle, { get children() {
									return i18n("Community.BanFromCommunityInfo", [moderateOptions.communityChatsCount]);
								} });
							} });
						}
					});
				}
			}),
			hasBanAction && [(() => {
				var _el$ = _tmpl$();
				insert(_el$, createComponent(Section, {
					name: "UserRestrictionsCanDoUsers",
					get nameArgs() {
						return [banning().length];
					},
					noShadow: true,
					children: chatPermissionsContainer
				}));
				createRenderEffect((_$p) => setStyleProperty(_el$, "max-height", collapsed() ? "0px" : "712px"));
				return _el$;
			})(), createComponent(Section, {
				get classList() {
					return { hide: !banning().length };
				},
				get children() {
					return createComponent(Row, {
						ref: (e) => {
							e.classList.add("primary");
						},
						clickable: () => {
							setCollapsed((v) => !v);
						},
						color: "primary",
						get children() {
							return createComponent(Row.Title, { get children() {
								var _el$2 = _tmpl$2();
								insert(_el$2, () => i18n(collapsedName()), null);
								insert(_el$2, createComponent(IconTsx, {
									icon: "down",
									"class": `${className}-expand-row-icon`
								}), null);
								createRenderEffect(() => className$1(_el$2, classNames(`${className}-expand-row`, !collapsed() && "is-expanded")));
								return _el$2;
							} });
						}
					});
				}
			})]
		];
	};
	await Promise.all(loadPromises);
	createPopup(() => {
		onCleanup(() => {
			listenerSetter.removeAll();
			middlewareHelper.destroy();
		});
		return createComponent(PopupElement, {
			managers,
			"class": className,
			closable: true,
			get show() {
				return show();
			},
			get children() {
				return [
					createComponent(PopupElement.Header, { get children() {
						return [avatarsContainer, createComponent(PopupElement.Title, { get children() {
							return title();
						} })];
					} }),
					createComponent(PopupElement.Scrollable, {
						contextRef: setScrollableRef,
						get children() {
							return createComponent(PopupElement.Body, { get children() {
								return createComponent(Content, {});
							} });
						}
					}),
					createComponent(PopupElement.Buttons, { get children() {
						return [createComponent(PopupElement.Button, {
							langKey: "DeleteProceedBtn",
							danger: true,
							iconLeft: "delete_filled",
							callback: () => confirmDeleteMegagroupMessages(ctx)
						}), createComponent(PopupElement.Button, {
							langKey: "Cancel",
							cancel: true
						})];
					} })
				];
			}
		});
	});
	setShow(true);
}
//#endregion
//#region src/components/popups/deleteMessages.ts
async function showDeleteMessagesPopup(peerId, mids, type, onConfirm, threadId) {
	mids = mids.slice();
	const managers = bindManagersToSession(rootScope.managers);
	const { peerTitleElement, isBot, messages } = await namedPromises({
		peerTitleElement: wrapPeerTitle({
			peerId,
			threadId,
			onlyFirstName: true
		}),
		isBot: managers.appPeersManager.isBot(peerId),
		messages: Promise.all(mids.map((mid) => type === ChatType.Scheduled ? managers.appMessagesManager.getScheduledMessageByPeer(peerId, mid) : type === ChatType.Welcome ? managers.appMessagesManager.getWelcomeMessage(peerId, mid) : managers.appMessagesManager.getMessageByPeer(peerId, mid)))
	});
	const isEphemeral = type === ChatType.Welcome || !!messages.length && messages.every(isEphemeralMessage);
	const isMegagroup = await managers.appPeersManager.isMegagroup(peerId);
	if (!isEphemeral && isMegagroup && !messages.some((message) => message.pFlags.out)) {
		const participants = await managers.appProfileManager.getParticipants({
			id: peerId.toChatId(),
			filter: { _: "channelParticipantsAdmins" },
			limit: 100
		});
		if (!messages.some((message) => {
			return participants.participants.some((participant) => getParticipantPeerId(participant) === message.fromId);
		})) {
			showDeleteMegagroupMessagesPopup({
				messages,
				onConfirm
			});
			return;
		}
	}
	const callback = (e, checked, revoke) => {
		onConfirm?.();
		if (type === ChatType.Scheduled) managers.appMessagesManager.deleteScheduledMessages(peerId, mids);
		else if (type === ChatType.Welcome) managers.appMessagesManager.deleteWelcomeMessages(peerId, mids);
		else {
			const needRevoke = !!checked.size || revoke;
			if (peerId.isUser() && needRevoke && canRevoke.length !== mids.length) {
				managers.appMessagesManager.deleteMessages(peerId, canRevoke, true);
				managers.appMessagesManager.deleteMessages(peerId, mids.filter((mid) => !canRevoke.includes(mid)), false);
			} else managers.appMessagesManager.deleteMessages(peerId, mids, needRevoke);
		}
	};
	const buttons = [{
		langKey: "Delete",
		isDanger: true,
		callback
	}];
	const checkboxes = [];
	let title, titleArgs, description, descriptionArgs;
	const isSingleMessage = mids.length === 1;
	if (isSingleMessage) title = "DeleteSingleMessagesTitle";
	else {
		title = "DeleteMessagesTitle";
		titleArgs = [i18n("messages", [mids.length])];
	}
	if (isEphemeral) description = isSingleMessage ? "AreYouSureDeleteSingleMessage" : "AreYouSureDeleteFewMessages";
	else if (isMegagroup) description = isSingleMessage ? "AreYouSureDeleteSingleMessageMega" : "AreYouSureDeleteFewMessagesMega";
	else if (isBot) description = isSingleMessage ? "AreYouSureDeleteSingleMessageBot" : "AreYouSureDeleteFewMessagesBot";
	else description = isSingleMessage ? "AreYouSureDeleteSingleMessage" : "AreYouSureDeleteFewMessages";
	let canRevoke = mids.slice();
	if (isEphemeral) canRevoke = [];
	else if (peerId === rootScope.myId || type === ChatType.Scheduled || isBot) {} else if (peerId.isUser()) {
		canRevoke = canRevoke.filter((mid, idx) => {
			if (messages[idx].media?._ === "messageMediaDice") return false;
			return true;
		});
		if (canRevoke.length === mids.length) checkboxes.push({
			text: "DeleteMessagesOptionAlso",
			textArgs: [peerTitleElement]
		});
		else {
			description = isSingleMessage ? "AreYouSureDeleteSingleMessageOnlyMe" : "AreYouSureDeleteFewMessagesOnlyMe";
			if (canRevoke.length) {
				checkboxes.push({ text: "DeleteMessagesOption" });
				description = "AreYouSureDeleteFewMessagesMixed";
				descriptionArgs = [peerTitleElement];
			}
		}
	} else {
		const chat = await managers.appChatsManager.getChat(peerId.toChatId());
		const _hasRights = hasRights(chat, "delete_messages");
		if (chat._ === "chat") {
			canRevoke = _hasRights ? canRevoke : canRevoke.filter((mid, idx) => {
				return messages[idx].fromId === rootScope.myId;
			});
			if (canRevoke.length) {
				if (canRevoke.length === mids.length) checkboxes.push({ text: "DeleteForAll" });
				else {
					checkboxes.push({ text: "DeleteMessagesOption" });
					description = "DeleteMessagesTextGroup";
					descriptionArgs = [i18n("messages", [canRevoke.length])];
				}
			}
		} else {
			let foundGiveaway;
			messages.find((message) => {
				return message && message.media?._ === "messageMediaGiveaway" && !message.fwdFromId && (foundGiveaway = message.media);
			});
			if (foundGiveaway && foundGiveaway.until_date >= tsNow(true)) {
				title = "BoostingGiveawayDeleteMsgTitle";
				description = "BoostingGiveawayDeleteMsgText";
				descriptionArgs = [formatFullSentTime(foundGiveaway.until_date, void 0, true)];
			}
			buttons[0].callback = (e, checked) => callback(e, checked, true);
		}
	}
	addCancelButton(buttons);
	showPeerPopup("popup-delete-chat", {
		peerId,
		threadId,
		titleLangKey: title,
		titleLangArgs: titleArgs,
		descriptionLangKey: description,
		descriptionLangArgs: descriptionArgs,
		buttons,
		checkboxes
	});
}
//#endregion
export { StackedAvatarsTsx as i, showDeleteMegagroupMessagesPopup as n, StackedAvatars as r, showDeleteMessagesPopup as t };
