//# allFunctionsCalledOnLoad
import { t as pause } from "./pause-BSJh-z46.js";
import { b as createResource, p as createComponent, s as Show, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { c as insert, g as template, o as className } from "./web-BPyQozky.js";
import { r as useHotReloadGuard } from "./hotReloadGuard-BUNVkeQ4.js";
import { n as hotReloadGuard } from "./hotReloadGuardProvider-CHEsZRuG.js";
import { o as createMiddleware } from "./sticker-5twBOy1Y.js";
import { rn as isParticipantAdmin } from "./getChatMigratedTo-ChhMNXuu.js";
import { Qt as wrapAsyncClickHandler } from "./appDialogsManager-CXguiKc3.js";
import { r as toastNew } from "./toast-B6VD5M7R.js";
import { n as useSuperTab } from "./superTabProvider-LtveyH7W.js";
//#region src/lib/appManagers/utils/chats/isBannedParticipant.ts
var isBannedParticipant = (participant) => participant?._ === "channelParticipantBanned" && participant.pFlags?.left;
//#endregion
//#region src/lib/appManagers/utils/chats/removeChatBannedRightsFromParticipant.ts
function removeChatBannedRightsFromParticipant(chat, rights) {
	if (chat.default_banned_rights && rights?.pFlags) {
		rights = structuredClone(rights);
		const defaultBannedRights = chat.default_banned_rights.pFlags;
		for (const key in defaultBannedRights) {
			const flagKey = key;
			if (defaultBannedRights[flagKey]) delete rights.pFlags[flagKey];
		}
	}
	return rights;
}
//#endregion
//#region src/components/sidebarRight/tabs/adminRecentActions/participantRightsMap.ts
var participantRightsMap = {
	send_plain: "UserRestrictionsSend",
	send_media: "UserRestrictionsSendMedia",
	invite_users: "UserRestrictionsInviteUsers",
	pin_messages: "UserRestrictionsPinMessages",
	manage_topics: "CreateTopicsPermission",
	change_info: "UserRestrictionsChangeInfo",
	send_photos: "UserRestrictionsSendPhotos",
	send_videos: "UserRestrictionsSendVideos",
	send_stickers: "UserRestrictionsSendStickersOnly",
	send_gifs: "UserRestrictionsSendGIFsOnly",
	send_audios: "UserRestrictionsSendMusic",
	send_docs: "UserRestrictionsSendFiles",
	send_voices: "UserRestrictionsSendVoices",
	send_roundvideos: "UserRestrictionsSendRound",
	embed_links: "UserRestrictionsEmbedLinks",
	send_polls: "UserRestrictionsSendPolls",
	edit_rank: "UserRestrictionsEditRank",
	view_messages: null,
	send_messages: null,
	send_games: null,
	send_inline: null,
	send_reactions: null,
	manage_linked_peers: null
};
var topicName_module_default = { Container: "_Container_1x7ne_1" };
//#endregion
//#region src/components/sidebarRight/tabs/adminRecentActions/topicName.tsx
var _tmpl$ = /*#__PURE__*/ template(`<div> `);
var TopicName = (props) => {
	const { wrapTopicIcon } = useHotReloadGuard();
	const topic = () => props.topic._ === "forumTopic" ? props.topic : null;
	const [icon] = createResource(topic, (topic) => {
		if (!topic) return null;
		const middleware = createMiddleware().get();
		return wrapTopicIcon({
			topic,
			middleware
		});
	});
	return createComponent(Show, {
		get when() {
			return topic();
		},
		get children() {
			var _el$ = _tmpl$(), _el$2 = _el$.firstChild;
			insert(_el$, icon, _el$2);
			insert(_el$, () => topic().title, null);
			createRenderEffect(() => className(_el$, topicName_module_default.Container));
			return _el$;
		}
	});
};
//#endregion
//#region src/components/sidebarRight/tabs/adminRecentActions/utils.ts
var getPhoto = (message) => {
	if (message?._ !== "message" || message?.media?._ !== "messageMediaPhoto" || message?.media?.photo?._ !== "photo") return;
	return message.media.photo;
};
function diffFlags(prev, next) {
	const prevNorm = prev ?? {};
	const nextNorm = next ?? {};
	const newFlags = [];
	const oldFlags = [];
	const allKeys = /* @__PURE__ */ new Set([...Object.keys(prevNorm), ...Object.keys(nextNorm)]);
	for (const key of allKeys) {
		const was = prevNorm[key];
		const isNow = nextNorm[key];
		if (!was && isNow) newFlags.push(key);
		else if (was && !isNow) oldFlags.push(key);
	}
	return {
		new: newFlags,
		old: oldFlags
	};
}
function useParticipantClickHandler(peerId) {
	const { rootScope } = useHotReloadGuard();
	const [tab, allTabs] = useSuperTab();
	return wrapAsyncClickHandler(async () => {
		try {
			const participant = await rootScope.managers.appProfileManager.getParticipant(tab.payload.channelId, peerId);
			hotReloadGuard.tabs.openUserPermissionsTab(tab.slider, tab.payload.channelId, participant, isParticipantAdmin(participant));
			await pause(200);
		} catch {
			toastNew({ langPackKey: "AdminRecentActions.UserNotMemberAnymore" });
		}
	});
}
//#endregion
export { participantRightsMap as a, TopicName as i, getPhoto as n, removeChatBannedRightsFromParticipant as o, useParticipantClickHandler as r, isBannedParticipant as s, diffFlags as t };
