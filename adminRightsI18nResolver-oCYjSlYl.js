//# allFunctionsCalledOnLoad
//#region src/components/sidebarRight/tabs/adminRecentActions/adminRightsI18nResolver.ts
var adminRightToI18n = {
	other: () => "AdminRights.Other",
	manage_call: () => "Channel.EditAdmin.ManageCalls",
	manage_direct_messages: () => "Channel.EditAdmin.ManageDirectMessages",
	manage_linked_peers: () => "AdminRights.Other",
	manage_welcome_messages: () => "AdminRights.ManageWelcomeMessages",
	change_info: ({ isBroadcast }) => isBroadcast ? "EditAdminChangeChannelInfo" : "EditAdminChangeGroupInfo",
	post_messages: () => "EditAdminPostMessages",
	edit_messages: () => "EditAdminEditMessages",
	delete_messages: ({ isBroadcast }) => isBroadcast ? "EditAdminDeleteMessages" : "EditAdminGroupDeleteMessages",
	ban_users: () => "EditAdminBanUsers",
	pin_messages: () => "EditAdminPinMessages",
	add_admins: () => "EditAdminAddAdmins",
	anonymous: () => "EditAdminSendAnonymously",
	manage_topics: () => "ManageTopicsPermission",
	manage_ranks: () => "EditAdminManageRanks",
	invite_users: ({ isBroadcast }) => isBroadcast ? "Channel.EditAdmin.PermissionInviteSubscribers" : "EditAdminAddUsersViaLink",
	post_stories: () => "AdminRights.PostStories",
	edit_stories: () => "AdminRights.EditStories",
	delete_stories: () => "AdminRights.DeleteStories"
};
function resolveAdminRightFlagI18n(flag, args) {
	const resolver = adminRightToI18n[flag];
	return resolver(args);
}
//#endregion
export { resolveAdminRightFlagI18n as t };
