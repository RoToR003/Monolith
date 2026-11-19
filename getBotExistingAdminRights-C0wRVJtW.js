//# allFunctionsCalledOnLoad
import { Ht as CHAT_LEGACY_ADMIN_RIGHTS, rn as isParticipantAdmin } from "./getChatMigratedTo-ChhMNXuu.js";
//#region src/lib/appManagers/utils/bots/constants.ts
var BOT_ADMIN_RIGHTS = [
	"change_info",
	"post_messages",
	"edit_messages",
	"delete_messages",
	"ban_users",
	"invite_users",
	"pin_messages",
	"add_admins",
	"anonymous",
	"manage_call",
	"other",
	"manage_topics",
	"post_stories",
	"edit_stories",
	"delete_stories",
	"manage_direct_messages",
	"manage_ranks",
	"manage_welcome_messages"
];
var BOT_ADMIN_RIGHTS_BY_LINK_NAME = {
	change_info: "change_info",
	post_messages: "post_messages",
	edit_messages: "edit_messages",
	delete_messages: "delete_messages",
	restrict_members: "ban_users",
	invite_users: "invite_users",
	manage_topics: "manage_topics",
	pin_messages: "pin_messages",
	promote_members: "add_admins",
	post_stories: "post_stories",
	edit_stories: "edit_stories",
	delete_stories: "delete_stories",
	manage_video_chats: "manage_call",
	manage_direct_messages: "manage_direct_messages",
	manage_welcome_messages: "manage_welcome_messages",
	anonymous: "anonymous",
	manage_chat: "other"
};
//#endregion
//#region src/lib/appManagers/utils/bots/mergeBotAdminRights.ts
function mergeBotAdminRights(...values) {
	const rights = {
		_: "chatAdminRights",
		pFlags: {}
	};
	BOT_ADMIN_RIGHTS.forEach((flag) => {
		if (values.some((value) => value?.pFlags[flag])) rights.pFlags[flag] = true;
	});
	return rights;
}
//#endregion
//#region src/lib/appManagers/utils/bots/getBotExistingAdminRights.ts
function getBotExistingAdminRights(chat, participant) {
	if (!isParticipantAdmin(participant)) return;
	return mergeBotAdminRights(chat._ === "chat" ? CHAT_LEGACY_ADMIN_RIGHTS : participant.admin_rights);
}
//#endregion
export { BOT_ADMIN_RIGHTS_BY_LINK_NAME as i, mergeBotAdminRights as n, BOT_ADMIN_RIGHTS as r, getBotExistingAdminRights as t };
