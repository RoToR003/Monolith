//# allFunctionsCalledOnLoad
import { t as findUpClassName } from "./findUpClassName-3V5me58N.js";
import { n as rootScope } from "./rootScope-CZS0lmz8.js";
import { n as bindManagersToSession } from "./bindManagersToAccount-BL82O9H9.js";
import { n as hotReloadGuard } from "./hotReloadGuardProvider-CHEsZRuG.js";
import { c as createContextMenu } from "./confirmationPopup-Bz6mK0o-.js";
import { Vt as canEditAdmin, in as isParticipantCreator, lt as canEditMemberTag, rn as isParticipantAdmin } from "./getChatMigratedTo-ChhMNXuu.js";
import { t as openEditMemberTag } from "./openEditMemberTag-BzMlTpov.js";
import { n as handleMissingInvitees } from "./addChatUsers-CGP6Ttkc.js";
//#region src/helpers/dom/createParticipantContextMenu.ts
function createParticipantContextMenu(options) {
	const { listenTo, appendTo, onOpen, onClose, slider, chatId, participants, middleware, bannedParticipantAdapter } = options;
	let target, participant, participantPeerId, chat, isBroadcast, isBanned, canChangePermissions, canManageAdmins;
	const openPermissions = (isAdmin) => {
		hotReloadGuard.tabs.openUserPermissionsTab(slider, chatId, participant, isAdmin);
	};
	function getButtons() {
		return [
			{
				icon: "message",
				text: "SendMessage",
				onClick: () => {
					hotReloadGuard.appImManager.setInnerPeer({ peerId: participantPeerId });
				}
			},
			{
				icon: participant?.rank ? "edit" : "tag_add",
				text: participantPeerId === rootScope.myId ? participant?.rank ? "MemberTag.EditMine" : "MemberTag.AddMine" : participant?.rank ? "MemberTag.EditMember" : "MemberTag.AddMember",
				onClick: () => openEditMemberTag(chatId, participantPeerId, participant),
				verify: () => !bannedParticipantAdapter && !(participant?._ === "channelParticipantBanned" && participant.pFlags.left) && canEditMemberTag(chat, participantPeerId, rootScope.myId, participant)
			},
			{
				icon: "adduser",
				text: isBroadcast ? "AddToChannel" : "AddToGroup",
				onClick: () => {
					if (isBanned) rootScope.managers.appChatsManager.addToChat(chatId, participantPeerId).then((missingInvitees) => {
						handleMissingInvitees(chatId, missingInvitees);
					});
				},
				verify: () => {
					if (bannedParticipantAdapter || !isBanned) return false;
					return true;
				}
			},
			{
				icon: "promote",
				text: "SetAsAdmin",
				onClick: () => openPermissions(true),
				verify: () => !bannedParticipantAdapter && canManageAdmins && !isParticipantAdmin(participant)
			},
			{
				icon: "admin",
				text: "EditAdminRights",
				onClick: () => openPermissions(true),
				verify: () => !bannedParticipantAdapter && isParticipantAdmin(participant) && canEditAdmin(chat, participant, rootScope.myId)
			},
			{
				icon: "restrict",
				text: "KickFromSupergroup",
				onClick: () => openPermissions(false),
				verify: () => !bannedParticipantAdapter && canChangePermissions && (participant._ === "channelParticipant" || participant._ === "chatParticipant" || participant._ === "channelParticipantBanned" && !participant.pFlags.left)
			},
			{
				icon: "delete",
				text: "Delete",
				onClick: () => {
					if (isBanned) {
						if (bannedParticipantAdapter) return bannedParticipantAdapter.unban(participantPeerId, participant);
						rootScope.managers.appChatsManager.editBanned(chatId, participant, {
							_: "chatBannedRights",
							pFlags: {},
							until_date: 0
						});
					}
				},
				verify: () => {
					if (!isBanned || !canChangePermissions || participantPeerId === rootScope.myId) return false;
					return true;
				}
			},
			{
				icon: "delete",
				text: "KickFromGroup",
				onClick: () => {
					rootScope.managers.appChatsManager.kickFromChat(chatId, participantPeerId);
				},
				verify: () => !bannedParticipantAdapter && canChangePermissions && participantPeerId !== rootScope.myId && !isParticipantCreator(participant) && (!isParticipantAdmin(participant) || canEditAdmin(chat, participant, rootScope.myId)) && (participant._ === "channelParticipant" || !isBanned)
			}
		];
	}
	const buttons = [];
	return createContextMenu({
		listenTo,
		appendTo,
		middleware,
		findElement: (e) => target = findUpClassName(e.target, "chatlist-chat"),
		onOpen: async () => {
			const managers = bindManagersToSession(rootScope.managers);
			participantPeerId = target.dataset.peerId.toPeerId();
			participant = participants.get(participantPeerId);
			if (bannedParticipantAdapter) {
				isBroadcast = false;
				canChangePermissions = await bannedParticipantAdapter.hasRights();
				canManageAdmins = false;
			} else [chat, isBroadcast, canChangePermissions, canManageAdmins] = await Promise.all([
				managers.appChatsManager.getChat(chatId),
				managers.appChatsManager.isBroadcast(chatId),
				managers.appChatsManager.hasRights(chatId, "change_permissions"),
				managers.appChatsManager.hasRights(chatId, "change_permissions")
			]);
			target.classList.add("menu-open");
			isBanned = canChangePermissions && participant._ === "channelParticipantBanned" && participant.pFlags.left;
			buttons.splice(0, Infinity, ...getButtons());
			return onOpen?.();
		},
		onClose: () => {
			target.classList.remove("menu-open");
			return onClose?.();
		},
		buttons
	});
}
//#endregion
export { createParticipantContextMenu as t };
