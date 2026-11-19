//# allFunctionsCalledOnLoad
import { t as apiManagerProxy } from "./apiManagerProxy-DmQXvxSF.js";
import { n as rootScope } from "./rootScope-CZS0lmz8.js";
import { a as isSessionLeaving, i as getManagersSession } from "./getCurrentAccount-D0KQFbZ6.js";
import { n as bindManagersToSession } from "./bindManagersToAccount-BL82O9H9.js";
import { n as hotReloadGuard } from "./hotReloadGuardProvider-CHEsZRuG.js";
import { dt as wrapPeerTitle, t as confirmationPopup } from "./confirmationPopup-Bz6mK0o-.js";
import { rn as isParticipantAdmin, un as hasRights } from "./getChatMigratedTo-ChhMNXuu.js";
import { r as toastNew } from "./toast-B6VD5M7R.js";
import { a as showPickUserPopup } from "./pickUser-D8S6yVuK.js";
import { n as mergeBotAdminRights, t as getBotExistingAdminRights } from "./getBotExistingAdminRights-C0wRVJtW.js";
//#region src/lib/appManagers/utils/bots/hasBotAdminRights.ts
function hasBotAdminRights(rights) {
	return !!rights && Object.keys(rights.pFlags).length > 0;
}
//#endregion
//#region src/lib/appManagers/utils/bots/getBotAdminRightsForChat.ts
function getBotAdminRightsForChat({ chat, userFull, scope, requestedRights }) {
	if (scope === "groupAdmin") {
		if (chat._ === "channel" && chat.pFlags.broadcast) return;
		return hasBotAdminRights(requestedRights) ? requestedRights : userFull.bot_group_admin_rights;
	}
	if (scope === "channelAdmin") {
		if (chat._ !== "channel" || !chat.pFlags.broadcast) return;
		return hasBotAdminRights(requestedRights) ? requestedRights : userFull.bot_broadcast_admin_rights;
	}
	return chat._ === "channel" && chat.pFlags.broadcast ? userFull.bot_broadcast_admin_rights : userFull.bot_group_admin_rights;
}
//#endregion
//#region src/lib/appManagers/utils/chats/canOpenAdminEditor.ts
function canOpenAdminEditor(chat, participantMissing) {
	return !participantMissing || chat._ === "channel" && !!chat.pFlags.broadcast || hasRights(chat, "invite_users");
}
//#endregion
//#region src/lib/appManagers/utils/bots/getAddBotToChatAction.ts
function getAddBotToChatAction(user, userFull) {
	const userId = +user?.id;
	if (!user?.pFlags.bot || user.pFlags.support || userId === 1271266957 || userId === 489e3) return;
	const canAddToGroup = !user.pFlags.bot_nochats;
	const canManageGroup = hasBotAdminRights(userFull?.bot_group_admin_rights);
	const canAddToChannel = hasBotAdminRights(userFull?.bot_broadcast_admin_rights);
	if (!canAddToGroup && !canAddToChannel) return;
	if (canAddToGroup && canAddToChannel) return {
		text: "BotAddToGroupOrChannel",
		about: canManageGroup ? "BotAddToGroupOrChannelAbout" : "BotAddToChannelAbout",
		pickerTitle: "SelectChat"
	};
	if (canAddToChannel) return {
		text: "AddToChannel",
		about: "BotAddToChannelAbout",
		pickerTitle: "SelectChat"
	};
	return {
		text: "AddToGroup",
		about: canManageGroup ? "BotAddToGroupAbout" : void 0,
		pickerTitle: "BotChooseGroup"
	};
}
//#endregion
//#region src/components/popups/addBotToChat.ts
/**
* Opens the admin rights editor for the bot in the chat, with `rights` offered: a bot not in the chat yet
* joins it as an admin once they are saved. `managers` are the opener's, bound to its account session: once
* that is over, the editor is not opened over the next account
*/
async function openBotAdminEditor({ managers, chat, botId, rights, startParam, sendStartAfterAdmin }) {
	const session = getManagersSession(managers);
	const { participant, missing } = await managers.appProfileManager.getParticipantOrMissing(chat.id, botId.toPeerId(false));
	if (isSessionLeaving(session)) return;
	if (!canOpenAdminEditor(chat, missing)) {
		toastNew({ langPackKey: "Error.RequestPeer.NoRights.Group" });
		return;
	}
	const existingAdminRights = getBotExistingAdminRights(chat, participant);
	const initialAdminRights = mergeBotAdminRights(rights, existingAdminRights);
	hotReloadGuard.tabs.openUserPermissionsTab(hotReloadGuard.appSidebarRight, chat.id, participant, true, {
		initialAdminRights,
		existingAdminRights,
		addingBot: {
			startParam,
			sendStartAfterAdmin,
			existingAdmin: isParticipantAdmin(participant)
		}
	});
	hotReloadGuard.appSidebarRight.toggleSidebar(true);
}
async function showAddBotToChat(options) {
	const scope = options.scope ?? "all";
	const [user, userFull] = await Promise.all([rootScope.managers.appUsersManager.getUser(options.botId), rootScope.managers.appProfileManager.getProfile(options.botId)]);
	const action = getAddBotToChatAction(user, userFull);
	if (scope === "all" && !action) return;
	const getRights = (chat) => getBotAdminRightsForChat({
		chat,
		userFull,
		scope,
		requestedRights: options.requestedRights
	});
	return showPickUserPopup({
		titleLangKey: scope === "groupAdmin" ? "BotChooseGroup" : action?.pickerTitle || "SelectChat",
		placeholder: "SelectChat",
		peerType: ["dialogs"],
		filterPeerTypeBy: (peer) => {
			if (peer._ !== "chat" && peer._ !== "channel") return false;
			const isBroadcast = peer._ === "channel" && !!peer.pFlags.broadcast;
			const canAddAsAdmin = hasBotAdminRights(getRights(peer)) && hasRights(peer, "add_admins");
			if (scope === "groupAdmin") return !isBroadcast && canAddAsAdmin;
			if (scope === "channelAdmin") return isBroadcast && canAddAsAdmin;
			if (isBroadcast) return canAddAsAdmin;
			return canAddAsAdmin || !user.pFlags.bot_nochats && hasRights(peer, "invite_users");
		},
		onSelect: async (chosen) => {
			const managers = bindManagersToSession(rootScope.managers);
			const peerId = chosen[0].peerId;
			const chatId = peerId.toChatId();
			const chat = apiManagerProxy.getChat(chatId);
			chat._ === "channel" && chat.pFlags.broadcast;
			const rights = getRights(chat);
			if (hasBotAdminRights(rights) && hasRights(chat, "add_admins")) {
				await openBotAdminEditor({
					managers,
					chat,
					botId: options.botId,
					rights,
					startParam: options.startParam,
					sendStartAfterAdmin: scope === "groupAdmin"
				});
				return;
			}
			await confirmationPopup({
				titleLangKey: "AddOneMemberAlertTitle",
				descriptionLangKey: "AddMembersAlertNamesText",
				descriptionLangArgs: [await wrapPeerTitle({ peerId: options.botId.toPeerId(false) }), await wrapPeerTitle({ peerId })],
				button: { langKey: "Add" }
			});
			await managers.appMessagesManager.addBotToChat(options.botId, chatId, options.startParam);
			hotReloadGuard.appImManager.setInnerPeer({ peerId });
		}
	});
}
//#endregion
export { getBotAdminRightsForChat as a, canOpenAdminEditor as i, showAddBotToChat as n, hasBotAdminRights as o, getAddBotToChatAction as r, openBotAdminEditor as t };
