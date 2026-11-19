//# allFunctionsCalledOnLoad
import { W as copy } from "./objectUrlUtils-5x08MNuO.js";
import { a as BANNED_RIGHTS_UNTIL_FOREVER, n as rootScope } from "./rootScope-CZS0lmz8.js";
import { c as deepEqual } from "./encryptedStorageLayer-gN9TBXzg.js";
import { a as i18n } from "./langPack-BmdJGr44.js";
import { p as createComponent } from "./solid-9Vxm0VIz.js";
import { t as tsNow } from "./tsNow-DUzGGNNb.js";
import { n as hotReloadGuard } from "./hotReloadGuardProvider-CHEsZRuG.js";
import { n as attachClickEvent } from "./clickEvent-COk4YpLP.js";
import { t as Button } from "./button-DpTvniRN.js";
import { L as formatFullSentTime, P as formatDate } from "./index-B7axFZql.js";
import { Cn as CheckboxField, dt as wrapPeerTitle, i as Row, t as confirmationPopup } from "./confirmationPopup-Bz6mK0o-.js";
import { Vt as canEditAdmin, an as participantAdminPredicates, dt as cleanMemberTag, in as isParticipantCreator, lt as canEditMemberTag, mn as getParticipantPeerId, rn as isParticipantAdmin, ut as canHaveMemberTags } from "./getChatMigratedTo-ChhMNXuu.js";
import { l as formatDuration, r as wrapFormattedDuration } from "./wrapDuration-BQgz9hDF.js";
import { i as usePromiseCollector } from "./mediaHeader-CnpQNwOl.js";
import { t as anchorCallback } from "./anchorCallback-BbwAJdBk.js";
import { t as getUserStatusString } from "./getUserStatusString-YlDGsxzx.js";
import { a as Section } from "./emailVerification-C8QYZSyu.js";
import { r as wrapSolidComponent } from "./wrapSolidComponent-BASCjNJG.js";
import { r as toastNew } from "./toast-B6VD5M7R.js";
import { t as toggleDisability } from "./toggleDisability-2oUcKWqw.js";
import { n as useSuperTab } from "./superTabProvider-LtveyH7W.js";
import { n as ChatPermissions, r as createSolidTabState, t as ChatAdministratorRights } from "./sharedPermissions-DEwJS4wx.js";
import { t as showDatePickerPopup } from "./datePicker-D1G1w7Ns.js";
import { n as mergeBotAdminRights, r as BOT_ADMIN_RIGHTS } from "./getBotExistingAdminRights-C0wRVJtW.js";
import { t as useCommunityTabGuard } from "./useCommunityTabGuard-CjtFqUbl.js";
import { t as handleChannelsTooMuch } from "./channelsTooMuch-CxXSuR84.js";
import { n as MemberTagEditor, t as createMemberTagInputField } from "./memberTagField-DOg7B-ka.js";
//#region src/lib/appManagers/utils/bots/limitBotAdminRights.ts
function limitBotAdminRights(chat, rights) {
	const normalized = mergeBotAdminRights(rights);
	if (chat._ === "chat" || chat.pFlags.creator) return normalized;
	const editableRights = chat.admin_rights;
	const pFlags = {};
	BOT_ADMIN_RIGHTS.forEach((flag) => {
		if (normalized.pFlags[flag] && editableRights?.pFlags[flag]) pFlags[flag] = true;
	});
	return {
		_: "chatAdminRights",
		pFlags
	};
}
//#endregion
//#region src/components/sidebarRight/tabs/attachAdminRightsCaption.ts
function attachAdminRightsCaption(options) {
	const field = options.permissions.fields.find((field) => field.flags[0] === "add_admins");
	const update = () => {
		options.caption.replaceChildren(i18n(options.canEdit ? field.checkboxField.checked ? "Channel.Admin.AdminAccess" : "Channel.Admin.AdminRestricted" : "EditAdminCantEdit"));
	};
	update();
	options.listenerSetter.add(field.checkboxField.input)("change", update);
}
//#endregion
//#region src/components/sidebarRight/tabs/permissionsPeerDialog.ts
function appendPermissionsPeerDialog(options) {
	const container = document.createElement("div");
	container.classList.add("chatlist-container");
	options.content.insertBefore(container, options.title);
	const list = hotReloadGuard.appDialogsManager.createChatList({ new: true });
	container.append(list);
	const { dom } = hotReloadGuard.appDialogsManager.addDialogNew({
		peerId: options.userId.toPeerId(false),
		container: list,
		rippleEnabled: true,
		avatarSize: "abitbigger",
		meAsSaved: false,
		wrapOptions: { middleware: options.middleware }
	});
	dom.lastMessageSpan.append(getUserStatusString(options.user));
}
//#endregion
//#region src/components/sidebarRight/tabs/chatUserPermissions.tsx
var ChatUserPermissions = () => {
	const [tab] = useSuperTab();
	if ("communityId" in tab.payload) return null;
	const promiseCollector = usePromiseCollector();
	const { participant, chatId, userId, editingAdmin, initialAdminRights, existingAdminRights, addingBot } = tab.payload;
	let saveCallback;
	const solidState = createSolidTabState({
		tab,
		save: () => handleChannelsTooMuch(saveCallback),
		unsavedConfirmationProps: {},
		alwaysShowSave: !!(addingBot?.existingAdmin && addingBot.sendStartAfterAdmin && addingBot.startParam)
	});
	tab.header.append(solidState.saveIcon());
	promiseCollector.collect((async () => {
		tab.container.classList.add("edit-peer-container", "user-permissions-container");
		const [chat, isChannel, isGroup, user] = await Promise.all([
			tab.managers.appChatsManager.getChat(chatId),
			tab.managers.appChatsManager.isChannel(chatId),
			tab.managers.appPeersManager.isAnyGroup(chatId.toPeerId(true)),
			tab.managers.appUsersManager.getUser(userId)
		]);
		const isBroadcast = chat._ === "channel" && !!chat.pFlags.broadcast;
		const isCreator = isParticipantCreator(participant);
		const isAdmin = isParticipantAdmin(participant);
		const _canEditAdmin = canEditAdmin(chat, participant, rootScope.myId);
		let addAsAdmin = true;
		let goodTypes;
		if (editingAdmin) goodTypes = [...participantAdminPredicates];
		else goodTypes = ["channelParticipantBanned"];
		let confirmGuardBotChange;
		let applyGuardBotChange;
		let guardBotSection;
		let chatPermissions;
		{
			let sectionContent, sectionTitle, sectionCaption;
			const section = wrapSolidComponent(() => createComponent(Section, {
				name: editingAdmin ? "EditAdminWhatCanDo" : "UserRestrictionsCanDo",
				caption: editingAdmin ? true : void 0,
				contentProps: { ref: (element) => sectionContent = element },
				nameRef: (element) => sectionTitle = element,
				captionRef: (element) => sectionCaption = element
			}), tab.middlewareHelper.get());
			appendPermissionsPeerDialog({
				content: sectionContent,
				title: sectionTitle,
				userId,
				user,
				middleware: tab.middlewareHelper.get()
			});
			const participantRights = goodTypes.includes(participant._) ? editingAdmin ? participant.admin_rights : participant.banned_rights : void 0;
			const options = {
				chatId,
				listenerSetter: tab.listenerSetter,
				appendTo: sectionContent,
				participant: goodTypes.includes(participant._) ? participant : void 0,
				rights: editingAdmin ? initialAdminRights : void 0,
				chat,
				canEdit: _canEditAdmin,
				isBot: !!user?.pFlags.bot
			};
			if (editingAdmin) {
				options.onSomethingChanged = () => solidState.set({ rights: p.takeOut() });
				const p = new ChatAdministratorRights(options);
				if (isAdmin) solidState.setInitial({ rights: copy(existingAdminRights || (isChannel ? participantRights : p.takeOut())) });
				options.onSomethingChanged();
				attachAdminRightsCaption({
					caption: sectionCaption,
					permissions: p,
					canEdit: _canEditAdmin,
					listenerSetter: tab.listenerSetter
				});
				saveCallback = async () => {
					if (!_canEditAdmin) return;
					await confirmGuardBotChange?.();
					let rights = p.takeOut();
					if (addingBot && !addAsAdmin) {
						await tab.managers.appMessagesManager.addBotToChat(userId, chatId, addingBot.startParam);
						hotReloadGuard.appImManager.setInnerPeer({ peerId: chatId.toPeerId(true) });
						return;
					}
					if (addingBot) {
						rights = limitBotAdminRights(chat, rights);
						if (!addingBot.existingAdmin) await confirmationPopup({
							titleLangKey: "AddBot",
							descriptionLangKey: isBroadcast ? "BotAddAsAdminChannelConfirm" : "BotAddAsAdminGroupConfirm",
							descriptionLangArgs: [await wrapPeerTitle({ peerId: chatId.toPeerId(true) })],
							button: { langKey: "Add" }
						});
					}
					const targetChatId = await tab.managers.appChatsManager.editAdmin(chatId, participant, rights, rankInputField && cleanMemberTag(rankInputField.value)) || chatId;
					await applyGuardBotChange?.();
					if (addingBot?.sendStartAfterAdmin && addingBot.startParam) await tab.managers.appMessagesManager.startBot(userId, targetChatId, addingBot.startParam);
					if (addingBot) hotReloadGuard.appImManager.setInnerPeer({ peerId: targetChatId.toPeerId(true) });
				};
			} else {
				options.onSomethingChanged = () => solidState.set({ rights: p.takeOut() });
				const p = chatPermissions = new ChatPermissions(options, tab.managers);
				const initialRights = p.takeOut();
				solidState.setInitial({ rights: initialRights });
				options.onSomethingChanged();
				saveCallback = async () => {
					const rights = p.takeOut();
					let targetChatId = chatId;
					if (!deepEqual(rights, initialRights)) {
						await tab.managers.appChatsManager.editBanned(chatId, participant, rights);
						targetChatId = await tab.managers.appChatsManager.migrateChat(chatId);
					}
					const rank = rankInputField && cleanMemberTag(rankInputField.value);
					if (rankInputField && rank !== initialRank) await tab.managers.appChatsManager.editParticipantRank(targetChatId, userId.toPeerId(false), rank);
				};
			}
			if (addingBot && !isBroadcast && !addingBot.existingAdmin) {
				const addAsAdminField = new CheckboxField({
					name: "add-as-admin",
					toggle: true,
					checked: true,
					listenerSetter: tab.listenerSetter
				});
				const addAsAdminSection = wrapSolidComponent(() => createComponent(Section, { get children() {
					return createComponent(Row, { get children() {
						return [createComponent(Row.CheckboxFieldToggle, { get children() {
							return addAsAdminField.label;
						} }), createComponent(Row.Title, { get children() {
							return i18n("EditAdmin");
						} })];
					} });
				} }), tab.middlewareHelper.get());
				const onAddAsAdminChange = () => {
					addAsAdmin = addAsAdminField.checked;
					section.classList.toggle("hide", !addAsAdmin);
					guardBotSection?.classList.toggle("hide", !addAsAdmin);
					solidState.set({ addAsAdmin });
				};
				tab.listenerSetter.add(addAsAdminField.input)("change", onAddAsAdminChange);
				tab.scrollable.append(addAsAdminSection);
				onAddAsAdminChange();
			}
			tab.scrollable.append(section);
		}
		if (editingAdmin && isChannel && user.pFlags.bot_guard && _canEditAdmin && userId !== rootScope.myId) {
			const getCurrentGuardBotId = async () => {
				return (await tab.managers.appProfileManager.getChannelFull(chatId))?.guard_bot_id;
			};
			const isThisBot = (guardBotId) => {
				return !!guardBotId && String(guardBotId) === String(userId);
			};
			const wasEnabled = isThisBot(await getCurrentGuardBotId());
			const checkboxField = new CheckboxField({
				toggle: true,
				checked: wasEnabled,
				listenerSetter: tab.listenerSetter
			});
			const section = guardBotSection = wrapSolidComponent(() => createComponent(Section, {
				caption: "GuardBotProcessJoinRequestsInfo",
				get children() {
					return createComponent(Row, { get children() {
						return [createComponent(Row.CheckboxFieldToggle, { get children() {
							return checkboxField.label;
						} }), createComponent(Row.Title, { get children() {
							return i18n("GuardBotProcessJoinRequests");
						} })];
					} });
				}
			}), tab.middlewareHelper.get());
			solidState.setInitial({ processJoinRequests: wasEnabled });
			tab.listenerSetter.add(checkboxField.input)("change", () => {
				solidState.set({ processJoinRequests: checkboxField.checked });
			});
			section.classList.toggle("hide", !addAsAdmin);
			tab.scrollable.append(section);
			confirmGuardBotChange = async () => {
				const currentGuardBotId = await getCurrentGuardBotId();
				if (!addAsAdmin || !checkboxField.checked || isThisBot(currentGuardBotId)) return;
				const peerId = userId.toPeerId(false);
				if (currentGuardBotId) {
					await confirmationPopup({
						titleLangKey: "GuardBotReplaceTitle",
						descriptionLangKey: "GuardBotReplaceText",
						descriptionLangArgs: [await wrapPeerTitle({ peerId: currentGuardBotId.toPeerId(false) }), await wrapPeerTitle({ peerId })],
						button: {
							langKey: "GuardBotReplaceUse",
							langArgs: [await wrapPeerTitle({ peerId })]
						},
						peerId,
						rejectWithReason: true
					});
					return;
				}
				await confirmationPopup({
					titleLangKey: isBroadcast ? "ChannelSettingsJoinRequestChannel" : "ChannelSettingsJoinRequest",
					descriptionLangKey: isBroadcast ? "GuardBotEnableSubscribersText" : "GuardBotEnableMembersText",
					descriptionLangArgs: [await wrapPeerTitle({ peerId })],
					button: { langKey: "GuardBotEnable" },
					peerId,
					rejectWithReason: true
				});
			};
			applyGuardBotChange = async () => {
				const currentGuardBotId = await getCurrentGuardBotId();
				const isCurrent = isThisBot(currentGuardBotId);
				if (!addAsAdmin || checkboxField.checked === isCurrent) return;
				try {
					if (checkboxField.checked) await tab.managers.appChatsManager.toggleJoinRequest(chatId, true, { guardBotId: userId });
					else await tab.managers.appChatsManager.toggleJoinRequest(chatId, !!chat.pFlags.join_request, { clearGuardBot: true });
				} catch (err) {
					toastNew({ langPackKey: "Error.AnError" });
					throw err;
				}
			};
		}
		let rankInputField, initialRank;
		const peerId = userId.toPeerId(false);
		if (isGroup && canHaveMemberTags(chat) && (editingAdmin || canEditMemberTag(chat, peerId, rootScope.myId, participant))) {
			const role = editingAdmin ? isCreator ? "owner" : "admin" : "member";
			initialRank = participant.rank || "";
			const inputField = rankInputField = createMemberTagInputField({
				role,
				value: initialRank,
				canBeEdited: editingAdmin ? _canEditAdmin : true
			});
			if (initialRank) solidState.setInitial({ rank: initialRank });
			tab.listenerSetter.add(inputField.input)("input", () => {
				solidState.set({ rank: cleanMemberTag(inputField.value) || void 0 });
				solidState.setValid(inputField.isValid());
			});
			const isSelf = peerId === rootScope.myId;
			const captionArgs = isSelf ? void 0 : [await wrapPeerTitle({
				peerId,
				onlyFirstName: true
			})];
			tab.scrollable.append(wrapSolidComponent(() => createComponent(Section, {
				name: "EditAdminRank",
				caption: isSelf ? "MemberTag.AboutSelf" : "MemberTag.About",
				captionArgs,
				get children() {
					return createComponent(MemberTagEditor, {
						get chatPeerId() {
							return chatId.toPeerId(true);
						},
						peerId,
						role,
						inputField
					});
				}
			}), tab.middlewareHelper.get()));
		}
		const saveSomethingDifferent = async (btn, _callback) => {
			if (solidState.saving()) return;
			const toggle = toggleDisability([btn], true);
			const callback = saveCallback;
			try {
				saveCallback = _callback;
				await solidState.save();
			} catch (err) {
				saveCallback = callback;
				toggle();
				throw err;
			}
		};
		if (editingAdmin) {
			let btnDelete;
			if (!isCreator && _canEditAdmin && isAdmin && getParticipantPeerId(participant) !== rootScope.myId) {
				btnDelete = Button("btn-primary btn-transparent danger", {
					icon: "deleteuser",
					text: "Channel.Admin.Dismiss"
				});
				const removeAdmin = () => tab.managers.appChatsManager.editAdmin(chatId, participant, {
					_: "chatAdminRights",
					pFlags: {}
				}, "");
				attachClickEvent(btnDelete, () => {
					saveSomethingDifferent(btnDelete, removeAdmin);
				}, { listenerSetter: tab.listenerSetter });
			}
			if (btnDelete) tab.scrollable.append(wrapSolidComponent(() => createComponent(Section, { children: btnDelete }), tab.middlewareHelper.get()));
		} else {
			const wrapDuration = (duration) => {
				return wrapFormattedDuration(formatDuration(duration, 1));
			};
			const getDurationOnClick = (duration, isTimestamp) => {
				const timestamp = isTimestamp ? duration : tsNow(true) + duration;
				return () => chatPermissions.setUntilDate(timestamp);
			};
			const durationButtons = [
				{
					text: "UserPermissions.Duration.Forever",
					onClick: getDurationOnClick(BANNED_RIGHTS_UNTIL_FOREVER, true)
				},
				...[
					86400,
					604800,
					2628e3
				].map((duration) => ({
					regularText: wrapDuration(duration),
					onClick: getDurationOnClick(duration, false)
				})),
				{
					text: "UserPermissions.Duration.Custom",
					onClick: () => {
						showDatePickerPopup({
							initDate: /* @__PURE__ */ new Date(),
							withTime: true,
							onPick: (timestamp) => {
								getDurationOnClick(timestamp, true)();
							},
							btnConfirmLangKey: "Set"
						});
					}
				}
			];
			const sectionDuration = wrapSolidComponent(() => {
				const getSubtitle = () => {
					const timestamp = solidState.store.rights.until_date;
					return timestamp === 2147483647 ? i18n("UserPermissions.Duration.Forever") : formatDate(/* @__PURE__ */ new Date(timestamp * 1e3), { withTime: true });
				};
				return createComponent(Section, { get children() {
					return createComponent(Row, {
						contextMenu: { buttons: durationButtons },
						get children() {
							return [createComponent(Row.Title, { get children() {
								return i18n("UserPermissions.Duration");
							} }), createComponent(Row.Subtitle, { get children() {
								return getSubtitle();
							} })];
						}
					});
				} });
			}, tab.middlewareHelper.get());
			const restrictedByPeerId = participant?.kicked_by?.toPeerId(false);
			const anchor = restrictedByPeerId ? anchorCallback(() => {
				hotReloadGuard.appImManager.setInnerPeer({ peerId: restrictedByPeerId });
			}) : void 0;
			if (restrictedByPeerId) anchor.append(await wrapPeerTitle({ peerId: restrictedByPeerId }));
			let btnDeleteException;
			if (participant._ === "channelParticipantBanned") {
				btnDeleteException = Button("btn-primary btn-transparent danger", {
					icon: "delete",
					text: "GroupPermission.Delete"
				});
				const clearChannelParticipantBannedRights = () => {
					return tab.managers.appChatsManager.clearChannelParticipantBannedRights(chatId, participant);
				};
				attachClickEvent(btnDeleteException, () => {
					saveSomethingDifferent(btnDeleteException, clearChannelParticipantBannedRights);
				}, { listenerSetter: tab.listenerSetter });
			}
			const btnDelete = Button("btn-primary btn-transparent danger", {
				icon: "deleteuser",
				text: "UserRestrictionsBlock"
			});
			const kickFromChat = async () => {
				const peerId = userId.toPeerId();
				await confirmationPopup({
					peerId: chatId.toPeerId(true),
					descriptionLangKey: "Permissions.RemoveFromGroup",
					descriptionLangArgs: [await wrapPeerTitle({ peerId })],
					titleLangKey: "ChannelBlockUser",
					button: {
						langKey: "Remove",
						isDanger: true
					}
				});
				await tab.managers.appChatsManager.kickFromChat(chatId, participant);
			};
			attachClickEvent(btnDelete, async () => {
				saveSomethingDifferent(btnDelete, kickFromChat);
			}, { listenerSetter: tab.listenerSetter });
			const section = wrapSolidComponent(() => createComponent(Section, {
				caption: anchor ? "UserPermissions.RestrictedBy" : void 0,
				get captionArgs() {
					return anchor ? [anchor, formatFullSentTime(participant.date)] : void 0;
				},
				get children() {
					return [btnDeleteException, btnDelete];
				}
			}), tab.middlewareHelper.get());
			tab.scrollable.append(sectionDuration, section);
		}
	})());
	return null;
};
//#endregion
//#region src/components/sidebarRight/tabs/communityUserPermissions.tsx
var COMMUNITY_ADMIN_RIGHT_OPTIONS = [
	{
		flag: "change_info",
		title: "Community.AdminEditInfo"
	},
	{
		flag: "manage_linked_peers",
		title: "Community.AdminEditChats"
	},
	{
		flag: "ban_users",
		title: "Community.AdminBanMembers"
	},
	{
		flag: "add_admins",
		title: "Community.AdminAddAdmins"
	}
];
var CommunityUserPermissions = () => {
	const [tab] = useSuperTab();
	const promiseCollector = usePromiseCollector();
	if (!("communityId" in tab.payload)) return null;
	const { communityId, participantId, participant, onUpdated } = tab.payload;
	useCommunityTabGuard(tab, communityId);
	let saveCallback;
	const solidState = createSolidTabState({
		tab,
		save: () => handleChannelsTooMuch(saveCallback),
		unsavedConfirmationProps: {}
	});
	tab.header.append(solidState.saveIcon());
	promiseCollector.collect((async () => {
		tab.container.classList.add("edit-peer-container", "user-permissions-container");
		let community = await tab.managers.appChatsManager.getChat(communityId);
		if (!community) {
			await tab.managers.appCommunitiesManager.reloadCommunity(communityId);
			community = await tab.managers.appChatsManager.getChat(communityId);
		}
		if (community?._ !== "community" || !participantId.isUser()) return;
		const userId = participantId.toUserId();
		const user = await tab.managers.appUsersManager.getUser(userId);
		const originalRights = participant?._ === "channelParticipantAdmin" || participant?._ === "channelParticipantCreator" ? participant.admin_rights : void 0;
		const isCreator = isParticipantCreator(participant);
		const existingAdmin = participant?._ === "channelParticipantAdmin" ? participant : void 0;
		const isSelf = participant?._ === "channelParticipantAdmin" && !!participant.pFlags.self || participantId === rootScope.myId;
		const currentUserCanAct = !community.pFlags.left;
		const currentUserIsCreator = currentUserCanAct && !!community.pFlags.creator;
		const currentRights = currentUserCanAct ? community.admin_rights : void 0;
		const canGrant = (permission) => {
			return currentUserIsCreator || !!currentRights?.pFlags[permission];
		};
		const canEditParticipant = !isCreator && !isSelf && canGrant("add_admins") && (!participant || !existingAdmin || currentUserIsCreator || !!existingAdmin.pFlags.can_edit || existingAdmin.promoted_by.toPeerId(false) === rootScope.myId);
		const canDismissParticipant = !!participant && canEditParticipant;
		let sectionContent, sectionTitle, sectionCaption;
		const section = wrapSolidComponent(() => createComponent(Section, {
			name: "EditAdminWhatCanDo",
			caption: true,
			contentProps: { ref: (element) => sectionContent = element },
			nameRef: (element) => sectionTitle = element,
			captionRef: (element) => sectionCaption = element
		}), tab.middlewareHelper.get());
		appendPermissionsPeerDialog({
			content: sectionContent,
			title: sectionTitle,
			userId,
			user,
			middleware: tab.middlewareHelper.get()
		});
		const fields = COMMUNITY_ADMIN_RIGHT_OPTIONS.map((option) => ({
			flags: [option.flag],
			text: option.title,
			checked: originalRights ? !!originalRights.pFlags[option.flag] : option.flag === "add_admins" ? false : canGrant(option.flag)
		}));
		const permissionOptions = {
			chatId: communityId,
			listenerSetter: tab.listenerSetter,
			appendTo: sectionContent,
			participant: participant?._ === "channelParticipantAdmin" || participant?._ === "channelParticipantCreator" ? participant : void 0,
			rights: originalRights,
			canEdit: canEditParticipant,
			fields,
			canGrant: (right) => canGrant(right),
			preserveUnhandledRights: true
		};
		permissionOptions.onSomethingChanged = () => {
			solidState.set({ rights: permissions.takeOut() });
		};
		const permissions = new ChatAdministratorRights(permissionOptions);
		const initialRights = permissions.takeOut();
		if (originalRights || !canEditParticipant) solidState.setInitial({ rights: copy(initialRights) });
		else solidState.set({ rights: initialRights });
		attachAdminRightsCaption({
			caption: sectionCaption,
			permissions,
			canEdit: canEditParticipant,
			listenerSetter: tab.listenerSetter
		});
		saveCallback = async () => {
			if (!canEditParticipant) return;
			if (!existingAdmin) await confirmationPopup({
				titleLangKey: "Community.PromoteAdmin",
				descriptionLangKey: "Community.PromoteAdminConfirm",
				descriptionLangArgs: [await wrapPeerTitle({ peerId: participantId })],
				button: { langKey: "Community.Promote" }
			});
			const rights = permissions.takeOut();
			const updatedParticipant = await tab.managers.appChatsManager.editAdmin(communityId, participant || participantId, rights, existingAdmin?.rank || "", true);
			await onUpdated?.(updatedParticipant || (existingAdmin ? {
				...existingAdmin,
				admin_rights: rights
			} : {
				_: "channelParticipantAdmin",
				pFlags: { can_edit: true },
				user_id: userId,
				promoted_by: rootScope.myId.toUserId(),
				date: Math.floor(Date.now() / 1e3),
				admin_rights: rights
			}));
		};
		tab.scrollable.append(section);
		if (canDismissParticipant) {
			const dismissButton = Button("btn-primary btn-transparent danger", {
				icon: "deleteuser",
				text: "Channel.Admin.Dismiss"
			});
			attachClickEvent(dismissButton, async () => {
				if (solidState.saving()) return;
				const toggle = toggleDisability([dismissButton], true);
				try {
					await confirmationPopup({
						titleLangKey: "Community.RemoveAdmin",
						descriptionLangKey: "Community.RemoveAdminConfirm",
						button: {
							langKey: "Channel.Admin.Dismiss",
							isDanger: true
						}
					});
					const updatedParticipant = await tab.managers.appChatsManager.editAdmin(communityId, participant || participantId, {
						_: "chatAdminRights",
						pFlags: {}
					}, "", true);
					await onUpdated?.(updatedParticipant || {
						_: "channelParticipant",
						user_id: userId,
						date: Math.floor(Date.now() / 1e3)
					});
					solidState.dispose();
					tab.close();
				} catch (error) {
					toggle();
					throw error;
				}
			}, { listenerSetter: tab.listenerSetter });
			tab.scrollable.append(wrapSolidComponent(() => createComponent(Section, { children: dismissButton }), tab.middlewareHelper.get()));
		}
	})());
	return null;
};
//#endregion
//#region src/components/sidebarRight/tabs/userPermissions.tsx
var UserPermissions = () => {
	const [tab] = useSuperTab();
	return "communityId" in tab.payload ? createComponent(CommunityUserPermissions, {}) : createComponent(ChatUserPermissions, {});
};
//#endregion
export { UserPermissions as default };
