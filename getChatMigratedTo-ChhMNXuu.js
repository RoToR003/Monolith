//# allFunctionsCalledOnLoad
import { p as MOUNT_CLASS_TO } from "./userAgent-ByGXcznk.js";
import { O as getFileURL, g as getPeerActiveUsernames, z as recordPromise } from "./objectUrlUtils-5x08MNuO.js";
import { c as GENERAL_TOPIC_ID, i as ATTACH_MENU_BOT_ICON_NAME } from "./rootScope-CZS0lmz8.js";
import { c as deepEqual } from "./encryptedStorageLayer-gN9TBXzg.js";
import { m as MARKDOWN_REG_EXP, p as MARKDOWN_ENTITIES, x as URL_REG_EXP } from "./commonStateStorage-CW-poHCa.js";
import { t as originalString } from "./regex-DmbDaFB2.js";
import { t as getServerMessageId } from "./getServerMessageId-1hhP4U5Q.js";
import { r as gzipSync } from "./browser-CNMy5TzU.js";
import { a as getEmojiToneIndex, n as emojiFromCodePoints, o as getEmojiToneIndexes, r as encodeEmoji, s as removeEmojiTone, t as EMOJI_TONE_MODIFIERS } from "./emoji-Bi9QRCod.js";
import { n as months } from "./common-C5Bbi6I4.js";
import { t as bytesFromHex } from "./bytesFromHex-DEB8Alee.js";
import { t as assumeType } from "./assumeType-CmXHXz9E.js";
import { c as getDocumentDownloadOptions } from "./mimeTypeMap-CnhjI2wm.js";
import { t as combineSameEntities } from "./combineSameEntities-BecixTXD.js";
import { r as findConflictingEntity } from "./sortEntities-9u5MR7Xq.js";
import { B as mergeEntities, U as getPeerId, X as flatten, a as starsAmountNanounits, s as getMessageMediaOrRich } from "./canPollPeerStories-D3HoBvLX.js";
import { r as concatRichText } from "./hasRichTextContent-rOE0S9M6.js";
import { n as bytesToBase64 } from "./bytesCmp-BHLrucCP.js";
import { n as fixBase64String, t as base64ToBytes } from "./base64ToBytes-BKoIm5Yd.js";
//#region src/lib/appManagers/utils/dialogs/isDialog.ts
function isForumTopic(dialog) {
	return dialog?._ === "forumTopic";
}
function isSavedDialog(dialog) {
	return dialog?._ === "savedDialog";
}
function isMonoforumDialog(dialog) {
	return dialog?._ === "monoForumDialog";
}
function isDialog(dialog) {
	return dialog?._ === "dialog";
}
//#endregion
//#region src/helpers/array/filterUnique.ts
function filterUnique(arr) {
	return [...new Set(arr)];
}
//#endregion
//#region src/lib/appManagers/utils/chats/getParticipantPeerId.ts
function getParticipantPeerId(participant) {
	if (typeof participant !== "object") return participant;
	return participant.peer ? getPeerId(participant.peer) : participant.user_id?.toPeerId();
}
//#endregion
//#region src/lib/appManagers/utils/chats/getParticipantsCount.ts
function getParticipantsCount(chatFull) {
	return chatFull.participants_count || chatFull.participants?.participants?.length || 1;
}
//#endregion
//#region src/lib/appManagers/utils/users/canSendToUser.ts
function canSendToUser(user) {
	return !!(user && !user.pFlags.deleted && user.id.toPeerId() !== 1271266957);
}
//#endregion
//#region src/lib/appManagers/utils/chats/hasRights.ts
var isSendRight = (action) => action === "embed_links" || action.startsWith("send_");
var NO_BANS = {
	_: "chatBannedRights",
	pFlags: {},
	until_date: 0
};
/**
* Check the user's ability to do an action in chat
* @param id
* @param action creator can still send messages to left channel. so this function shows server rights. see canSendToPeer for local rights in messages manager.
* @param rights do not provide this parameter when checking rights for self
* @param isThread
* @param defaultBansLifted the member's own boosts set the group's restrictions of what is sent aside — never the
* member's own ban, nor anything else that says no (appChatsManager.isRestrictionLiftedByBoosts)
* @returns
*/
function hasRights(chat, action, rights, isThread, defaultBansLifted) {
	if (!chat) return false;
	if (chat.pFlags.deactivated && action !== "view_messages") return false;
	const isCheckingRightsForSelf = rights === void 0;
	if (chat.pFlags.creator && isCheckingRightsForSelf) return true;
	if (chat._ === "chatForbidden" || chat._ === "channelForbidden" || chat._ === "communityForbidden" || chat.pFlags.left && !chat.pFlags.megagroup) return false;
	if (!rights) {
		const defaultBans = defaultBansLifted && isSendRight(action) ? NO_BANS : chat.default_banned_rights;
		rights = chat.admin_rights || chat.banned_rights || defaultBans;
		if (!rights) return false;
	}
	let myFlags = {};
	if (rights) myFlags = rights.pFlags;
	const isAdmin = rights._ === "chatAdminRights";
	switch (action) {
		case "embed_links":
		case "send_games":
		case "send_gifs":
		case "send_inline":
		case "send_media":
		case "send_messages":
		case "send_polls":
		case "send_stickers":
		case "send_photos":
		case "send_videos":
		case "send_roundvideos":
		case "send_audios":
		case "send_voices":
		case "send_docs":
		case "send_plain":
			if (!isAdmin && myFlags[action]) return false;
			if (chat._ === "channel") {
				if ((!chat.pFlags.megagroup || chat.pFlags.gigagroup) && !myFlags.post_messages) return false;
			}
			break;
		case "delete_messages":
		case "manage_call": return !!myFlags[action];
		case "pin_messages": return isAdmin ? !!(myFlags[action] || !chat.pFlags.megagroup && myFlags.post_messages) : !myFlags[action];
		case "invite_links": return isAdmin && !!myFlags["invite_users"];
		case "toggle_forum":
		case "change_type":
		case "delete_chat": return false;
		case "change_info":
		case "invite_users":
			if (chat._ === "community") return isAdmin && !!myFlags[action];
			return isAdmin || chat.pFlags.broadcast ? !!myFlags[action] : !myFlags[action];
		case "delete_stories":
		case "edit_stories":
		case "post_stories":
		case "add_admins":
		case "anonymous":
		case "post_messages":
		case "manage_direct_messages":
		case "manage_linked_peers":
		case "manage_welcome_messages":
		case "edit_messages": return isAdmin && !!myFlags[action];
		case "ban_users":
		case "change_permissions": return isAdmin && !!myFlags["ban_users"];
		case "view_participants":
			if (chat._ === "community") return !!(chat.pFlags.creator || isAdmin);
			return !!(chat._ === "chat" || !chat.pFlags.broadcast || chat.pFlags.creator || isAdmin);
		case "create_giveaway": return isAdmin && !!myFlags["post_messages"];
		case "manage_topics": return isAdmin ? !!myFlags[action] : !myFlags[action];
		case "just_admin": return isAdmin;
		case "edit_rank":
		case "manage_ranks":
			if (chat._ === "community" || chat.pFlags.broadcast) return false;
			if (action === "manage_ranks") return isAdmin && !!myFlags[action];
			return isAdmin || !myFlags[action] && !chat.default_banned_rights?.pFlags[action];
	}
	return true;
}
//#endregion
//#region src/lib/appManagers/utils/dialogs/getDialogIndexKey.ts
function getDialogIndexKey(localId = 0) {
	return `index_${localId}`;
}
//#endregion
//#region src/lib/appManagers/utils/dialogs/getDialogIndex.ts
function getDialogIndex(dialog, indexKey = getDialogIndexKey(dialog?.folder_id)) {
	return dialog?.[indexKey];
}
//#endregion
//#region src/lib/mtproto/connectionStatus.ts
var ConnectionStatus = /* @__PURE__ */ function(ConnectionStatus) {
	ConnectionStatus[ConnectionStatus["Connected"] = 0] = "Connected";
	ConnectionStatus[ConnectionStatus["Connecting"] = 1] = "Connecting";
	ConnectionStatus[ConnectionStatus["Closed"] = 2] = "Closed";
	ConnectionStatus[ConnectionStatus["TimedOut"] = 3] = "TimedOut";
	return ConnectionStatus;
}({});
//#endregion
//#region src/helpers/namedPromises.ts
async function namedPromises(promises, log) {
	const result = {};
	await Promise.all(Object.entries(promises).map(async ([name, promise]) => {
		log && recordPromise(promise, name, log);
		result[name] = await promise;
	}));
	return result;
}
//#endregion
//#region src/lib/appManagers/utils/chats/isParticipantAdmin.ts
var participantCreatorPredicates = /* @__PURE__ */ new Set(["channelParticipantCreator", "chatParticipantCreator"]);
var participantAdminPredicates = /* @__PURE__ */ new Set([
	...Array.from(participantCreatorPredicates),
	"channelParticipantAdmin",
	"chatParticipantAdmin"
]);
var isParticipantCreator = (participant) => participantCreatorPredicates.has(participant?._);
var isParticipantAdmin = (participant) => participantAdminPredicates.has(participant?._);
//#endregion
//#region src/config/limitDefaults.ts
/**
* What a limit of the app config is when the config does not have it: tdesktop's defaults
* (data_premium_limits.cpp, data_message_reactions.cpp)
*/
var LIMIT_DEFAULTS = {
	dialogs_pinned_limit_default: 5,
	dialogs_pinned_limit_premium: 10,
	dialogs_folder_pinned_limit_default: 100,
	dialogs_folder_pinned_limit_premium: 200,
	dialog_filters_limit_default: 10,
	dialog_filters_limit_premium: 30,
	stickers_faved_limit_default: 5,
	stickers_faved_limit_premium: 10,
	reactions_user_max_default: 1,
	reactions_user_max_premium: 3,
	about_length_limit_default: 70,
	about_length_limit_premium: 140,
	topics_pinned_limit: 5,
	caption_length_limit_default: 1024,
	caption_length_limit_premium: 2048,
	chatlist_invites_limit_default: 3,
	chatlist_invites_limit_premium: 20,
	chatlists_joined_limit_default: 2,
	chatlists_joined_limit_premium: 20,
	channels_limit_default: 500,
	channels_limit_premium: 1e3,
	channels_public_limit_default: 10,
	channels_public_limit_premium: 20,
	saved_gifs_limit_default: 200,
	saved_gifs_limit_premium: 400,
	dialog_filters_chats_limit_default: 100,
	dialog_filters_chats_limit_premium: 200,
	upload_max_fileparts_default: 4e3,
	upload_max_fileparts_premium: 8e3,
	recommended_channels_limit_default: 10,
	recommended_channels_limit_premium: 100,
	saved_dialogs_pinned_limit_default: 5,
	saved_dialogs_pinned_limit_premium: 100
};
//#endregion
//#region src/lib/appManagers/utils/docs/getDocumentURL.ts
function getDocumentURL(doc, { download = false, thumb, supportsHlsStreaming } = {}) {
	let type;
	if (download) type = "download";
	else if (thumb) type = "thumb";
	else if (supportsHlsStreaming) type = "hls";
	else if (doc.supportsStreaming) type = "stream";
	else type = "document";
	return getFileURL(type, getDocumentDownloadOptions(doc, { thumb }));
}
//#endregion
//#region src/lib/appManagers/utils/docs/getDocumentInput.ts
function getDocumentInput(doc) {
	return {
		_: "inputDocument",
		id: doc.id,
		access_hash: doc.access_hash,
		file_reference: doc.file_reference
	};
}
//#endregion
//#region src/lib/appManagers/utils/messages/getFwdFromName.ts
function getFwdFromName(fwdFrom) {
	return fwdFrom && (fwdFrom.saved_from_name || fwdFrom.from_name);
}
//#endregion
//#region src/lib/appManagers/utils/polls/pollVoteRestriction.ts
var SUBSCRIBERS_ONLY_ERROR_PATTERNS = [
	"POLL_SUBSCRIBERS_ONLY",
	"POLL_MEMBER_RESTRICTED",
	"VOTE_SUBSCRIBERS_ONLY",
	"SUBSCRIBERS_ONLY",
	"SUBSCRIBER_REQUIRED",
	"SUBSCRIBER_ONLY"
];
var SUBSCRIBERS_JOINED_TOO_RECENTLY_ERROR_PATTERNS = [
	"POLL_SUBSCRIBERS_TOO_RECENT",
	"VOTE_SUBSCRIBERS_TOO_RECENT",
	"SUBSCRIBERS_TOO_RECENT",
	"SUBSCRIBER_TOO_RECENT",
	"JOINED_TOO_RECENTLY",
	"24_HOURS"
];
var COUNTRIES_ERROR_PATTERNS = [
	"POLL_COUNTRIES_ISO2",
	"VOTE_COUNTRIES_ISO2",
	"COUNTRIES_ISO2",
	"COUNTRY_RESTRICTED",
	"COUNTRY_ISO2"
];
var POLL_VOTE_RESTRICTION_EXPIRY = 6e5;
var matchesAnyErrorPattern = (errorType, patterns) => patterns.some((pattern) => errorType.includes(pattern));
function isExpiringPollVoteRestriction(restriction) {
	return restriction === "subscribersOnly" || restriction === "subscribersJoinedTooRecently";
}
function isPollVoteRestrictionActive(state, now = Date.now()) {
	return !!state && (!isExpiringPollVoteRestriction(state.restriction) || state.updatedAt + 6e5 > now);
}
function getActivePollVoteRestriction({ restriction, hasVoted, closed, creator, isRegularMessage }) {
	if (!restriction || hasVoted || closed || creator || !isRegularMessage) return;
	return restriction;
}
function getPollVoteRestrictionPeerId(message) {
	return message.peerId;
}
function isRegularPollMessage(message, isRegularSurface = true) {
	return isRegularSurface && !!message.mid && message.mid > 0 && !message.pFlags.local && !message.pFlags.is_scheduled;
}
function getPollVotePrecheckRestriction({ subscribersOnly, countriesIso2, isInChat, phoneCountryIso2 }) {
	if (subscribersOnly && isInChat === false) return "subscribersOnly";
	const normalizedCountry = phoneCountryIso2?.trim().toUpperCase();
	if (!normalizedCountry || !countriesIso2?.length) return;
	if (!countriesIso2.some((country) => country.trim().toUpperCase() === normalizedCountry)) return "countries";
}
function parsePollVoteRestrictionError(errorType) {
	const normalizedType = errorType?.toUpperCase();
	if (!normalizedType) return;
	if (matchesAnyErrorPattern(normalizedType, SUBSCRIBERS_JOINED_TOO_RECENTLY_ERROR_PATTERNS)) return "subscribersJoinedTooRecently";
	if (matchesAnyErrorPattern(normalizedType, SUBSCRIBERS_ONLY_ERROR_PATTERNS)) return "subscribersOnly";
	if (matchesAnyErrorPattern(normalizedType, COUNTRIES_ERROR_PATTERNS)) return "countries";
}
//#endregion
//#region src/lib/appManagers/utils/messages/isEphemeralMessage.ts
function isEphemeralMessage(message) {
	const value = message;
	return value?._ === "message" && !!value.pFlags?.ephemeral && value.ephemeral_id !== void 0;
}
//#endregion
//#region src/lib/appManagers/utils/messages/isAnchoredEphemeralMessage.ts
/**
* An ordinary message whose content an ephemeral message (layer 229's `anchor_msg_id`) is
* currently standing in for. It keeps its own id and place in the history — only what it shows
* belongs to the bot, and the original comes back once the ephemeral one is gone. Deliberately
* NOT `isEphemeralMessage`: that one means a message that exists only as an ephemeral one.
*/
function isAnchoredEphemeralMessage(message) {
	const value = message;
	return value?._ === "message" && !!value.pFlags?.ephemeral_anchored && value.ephemeral_id !== void 0;
}
//#endregion
//#region src/lib/appManagers/utils/chats/constants.ts
var CHAT_LEGACY_ADMIN_RIGHTS = {
	"_": "chatAdminRights",
	"pFlags": {
		"change_info": true,
		"delete_messages": true,
		"ban_users": true,
		"invite_users": true,
		"pin_messages": true,
		"manage_call": true,
		"other": true,
		"manage_topics": true
	}
};
//#endregion
//#region src/lib/appManagers/utils/chats/canEditAdmin.ts
function canEditAdmin(chat, participant, myId) {
	const isCreator = isParticipantCreator(participant);
	const myUserId = myId.toUserId();
	const promotedBy = participant?.promoted_by || participant?.inviter_id;
	return !!chat.pFlags.creator || !isCreator && (!promotedBy || promotedBy === myUserId);
}
//#endregion
//#region src/lib/appManagers/utils/reactions/createEmojiReaction.ts
function createEmojiReaction(emoticon) {
	return {
		_: "reactionEmoji",
		emoticon
	};
}
//#endregion
//#region src/lib/appManagers/utils/reactions/availableReactionToReaction.ts
function availableReactionToReaction(availableReaction) {
	return createEmojiReaction(availableReaction.reaction);
}
//#endregion
//#region src/lib/appManagers/utils/reactions/reactionsEqual.ts
function reactionsEqual(r1, r2) {
	if (typeof r1 !== typeof r2) return false;
	[r1, r2] = [r1, r2].map((r) => {
		return r._ === "availableReaction" ? availableReactionToReaction(r) : r;
	});
	return deepEqual(r1, r2);
}
//#endregion
//#region src/config/latinizeMap.ts
var LatinizeMap = {
	"Á": "A",
	"Ă": "A",
	"Ắ": "A",
	"Ặ": "A",
	"Ằ": "A",
	"Ẳ": "A",
	"Ẵ": "A",
	"Ǎ": "A",
	"Â": "A",
	"Ấ": "A",
	"Ậ": "A",
	"Ầ": "A",
	"Ẩ": "A",
	"Ẫ": "A",
	"Ä": "A",
	"Ǟ": "A",
	"Ȧ": "A",
	"Ǡ": "A",
	"Ạ": "A",
	"Ȁ": "A",
	"À": "A",
	"Ả": "A",
	"Ȃ": "A",
	"Ā": "A",
	"Ą": "A",
	"Å": "A",
	"Ǻ": "A",
	"Ḁ": "A",
	"Ⱥ": "A",
	"Ã": "A",
	"Ꜳ": "AA",
	"Æ": "AE",
	"Ǽ": "AE",
	"Ǣ": "AE",
	"Ꜵ": "AO",
	"Ꜷ": "AU",
	"Ꜹ": "AV",
	"Ꜻ": "AV",
	"Ꜽ": "AY",
	"Ḃ": "B",
	"Ḅ": "B",
	"Ɓ": "B",
	"Ḇ": "B",
	"Ƀ": "B",
	"Ƃ": "B",
	"Ć": "C",
	"Č": "C",
	"Ç": "C",
	"Ḉ": "C",
	"Ĉ": "C",
	"Ċ": "C",
	"Ƈ": "C",
	"Ȼ": "C",
	"Ď": "D",
	"Ḑ": "D",
	"Ḓ": "D",
	"Ḋ": "D",
	"Ḍ": "D",
	"Ɗ": "D",
	"Ḏ": "D",
	"ǲ": "D",
	"ǅ": "D",
	"Đ": "D",
	"Ƌ": "D",
	"Ǳ": "DZ",
	"Ǆ": "DZ",
	"É": "E",
	"Ĕ": "E",
	"Ě": "E",
	"Ȩ": "E",
	"Ḝ": "E",
	"Ê": "E",
	"Ế": "E",
	"Ệ": "E",
	"Ề": "E",
	"Ể": "E",
	"Ễ": "E",
	"Ḙ": "E",
	"Ë": "E",
	"Ė": "E",
	"Ẹ": "E",
	"Ȅ": "E",
	"È": "E",
	"Ẻ": "E",
	"Ȇ": "E",
	"Ē": "E",
	"Ḗ": "E",
	"Ḕ": "E",
	"Ę": "E",
	"Ɇ": "E",
	"Ẽ": "E",
	"Ḛ": "E",
	"Ꝫ": "ET",
	"Ḟ": "F",
	"Ƒ": "F",
	"Ǵ": "G",
	"Ğ": "G",
	"Ǧ": "G",
	"Ģ": "G",
	"Ĝ": "G",
	"Ġ": "G",
	"Ɠ": "G",
	"Ḡ": "G",
	"Ǥ": "G",
	"Ḫ": "H",
	"Ȟ": "H",
	"Ḩ": "H",
	"Ĥ": "H",
	"Ⱨ": "H",
	"Ḧ": "H",
	"Ḣ": "H",
	"Ḥ": "H",
	"Ħ": "H",
	"Í": "I",
	"Ĭ": "I",
	"Ǐ": "I",
	"Î": "I",
	"Ï": "I",
	"Ḯ": "I",
	"İ": "I",
	"Ị": "I",
	"Ȉ": "I",
	"Ì": "I",
	"Ỉ": "I",
	"Ȋ": "I",
	"Ī": "I",
	"Į": "I",
	"Ɨ": "I",
	"Ĩ": "I",
	"Ḭ": "I",
	"Ꝺ": "D",
	"Ꝼ": "F",
	"Ᵹ": "G",
	"Ꞃ": "R",
	"Ꞅ": "S",
	"Ꞇ": "T",
	"Ꝭ": "IS",
	"Ĵ": "J",
	"Ɉ": "J",
	"Ḱ": "K",
	"Ǩ": "K",
	"Ķ": "K",
	"Ⱪ": "K",
	"Ꝃ": "K",
	"Ḳ": "K",
	"Ƙ": "K",
	"Ḵ": "K",
	"Ꝁ": "K",
	"Ꝅ": "K",
	"Ĺ": "L",
	"Ƚ": "L",
	"Ľ": "L",
	"Ļ": "L",
	"Ḽ": "L",
	"Ḷ": "L",
	"Ḹ": "L",
	"Ⱡ": "L",
	"Ꝉ": "L",
	"Ḻ": "L",
	"Ŀ": "L",
	"Ɫ": "L",
	"ǈ": "L",
	"Ł": "L",
	"Ǉ": "LJ",
	"Ḿ": "M",
	"Ṁ": "M",
	"Ṃ": "M",
	"Ɱ": "M",
	"Ń": "N",
	"Ň": "N",
	"Ņ": "N",
	"Ṋ": "N",
	"Ṅ": "N",
	"Ṇ": "N",
	"Ǹ": "N",
	"Ɲ": "N",
	"Ṉ": "N",
	"Ƞ": "N",
	"ǋ": "N",
	"Ñ": "N",
	"Ǌ": "NJ",
	"Ó": "O",
	"Ŏ": "O",
	"Ǒ": "O",
	"Ô": "O",
	"Ố": "O",
	"Ộ": "O",
	"Ồ": "O",
	"Ổ": "O",
	"Ỗ": "O",
	"Ö": "O",
	"Ȫ": "O",
	"Ȯ": "O",
	"Ȱ": "O",
	"Ọ": "O",
	"Ő": "O",
	"Ȍ": "O",
	"Ò": "O",
	"Ỏ": "O",
	"Ơ": "O",
	"Ớ": "O",
	"Ợ": "O",
	"Ờ": "O",
	"Ở": "O",
	"Ỡ": "O",
	"Ȏ": "O",
	"Ꝋ": "O",
	"Ꝍ": "O",
	"Ō": "O",
	"Ṓ": "O",
	"Ṑ": "O",
	"Ɵ": "O",
	"Ǫ": "O",
	"Ǭ": "O",
	"Ø": "O",
	"Ǿ": "O",
	"Õ": "O",
	"Ṍ": "O",
	"Ṏ": "O",
	"Ȭ": "O",
	"Ƣ": "OI",
	"Ꝏ": "OO",
	"Ɛ": "E",
	"Ɔ": "O",
	"Ȣ": "OU",
	"Ṕ": "P",
	"Ṗ": "P",
	"Ꝓ": "P",
	"Ƥ": "P",
	"Ꝕ": "P",
	"Ᵽ": "P",
	"Ꝑ": "P",
	"Ꝙ": "Q",
	"Ꝗ": "Q",
	"Ŕ": "R",
	"Ř": "R",
	"Ŗ": "R",
	"Ṙ": "R",
	"Ṛ": "R",
	"Ṝ": "R",
	"Ȑ": "R",
	"Ȓ": "R",
	"Ṟ": "R",
	"Ɍ": "R",
	"Ɽ": "R",
	"Ꜿ": "C",
	"Ǝ": "E",
	"Ś": "S",
	"Ṥ": "S",
	"Š": "S",
	"Ṧ": "S",
	"Ş": "S",
	"Ŝ": "S",
	"Ș": "S",
	"Ṡ": "S",
	"Ṣ": "S",
	"Ṩ": "S",
	"ẞ": "SS",
	"Ť": "T",
	"Ţ": "T",
	"Ṱ": "T",
	"Ț": "T",
	"Ⱦ": "T",
	"Ṫ": "T",
	"Ṭ": "T",
	"Ƭ": "T",
	"Ṯ": "T",
	"Ʈ": "T",
	"Ŧ": "T",
	"Ɐ": "A",
	"Ꞁ": "L",
	"Ɯ": "M",
	"Ʌ": "V",
	"Ꜩ": "TZ",
	"Ú": "U",
	"Ŭ": "U",
	"Ǔ": "U",
	"Û": "U",
	"Ṷ": "U",
	"Ü": "U",
	"Ǘ": "U",
	"Ǚ": "U",
	"Ǜ": "U",
	"Ǖ": "U",
	"Ṳ": "U",
	"Ụ": "U",
	"Ű": "U",
	"Ȕ": "U",
	"Ù": "U",
	"Ủ": "U",
	"Ư": "U",
	"Ứ": "U",
	"Ự": "U",
	"Ừ": "U",
	"Ử": "U",
	"Ữ": "U",
	"Ȗ": "U",
	"Ū": "U",
	"Ṻ": "U",
	"Ų": "U",
	"Ů": "U",
	"Ũ": "U",
	"Ṹ": "U",
	"Ṵ": "U",
	"Ꝟ": "V",
	"Ṿ": "V",
	"Ʋ": "V",
	"Ṽ": "V",
	"Ꝡ": "VY",
	"Ẃ": "W",
	"Ŵ": "W",
	"Ẅ": "W",
	"Ẇ": "W",
	"Ẉ": "W",
	"Ẁ": "W",
	"Ⱳ": "W",
	"Ẍ": "X",
	"Ẋ": "X",
	"Ý": "Y",
	"Ŷ": "Y",
	"Ÿ": "Y",
	"Ẏ": "Y",
	"Ỵ": "Y",
	"Ỳ": "Y",
	"Ƴ": "Y",
	"Ỷ": "Y",
	"Ỿ": "Y",
	"Ȳ": "Y",
	"Ɏ": "Y",
	"Ỹ": "Y",
	"Ź": "Z",
	"Ž": "Z",
	"Ẑ": "Z",
	"Ⱬ": "Z",
	"Ż": "Z",
	"Ẓ": "Z",
	"Ȥ": "Z",
	"Ẕ": "Z",
	"Ƶ": "Z",
	"Ĳ": "IJ",
	"Œ": "OE",
	"ᴀ": "A",
	"ᴁ": "AE",
	"ʙ": "B",
	"ᴃ": "B",
	"ᴄ": "C",
	"ᴅ": "D",
	"ᴇ": "E",
	"ꜰ": "F",
	"ɢ": "G",
	"ʛ": "G",
	"ʜ": "H",
	"ɪ": "I",
	"ʁ": "R",
	"ᴊ": "J",
	"ᴋ": "K",
	"ʟ": "L",
	"ᴌ": "L",
	"ᴍ": "M",
	"ɴ": "N",
	"ᴏ": "O",
	"ɶ": "OE",
	"ᴐ": "O",
	"ᴕ": "OU",
	"ᴘ": "P",
	"ʀ": "R",
	"ᴎ": "N",
	"ᴙ": "R",
	"ꜱ": "S",
	"ᴛ": "T",
	"ⱻ": "E",
	"ᴚ": "R",
	"ᴜ": "U",
	"ᴠ": "V",
	"ᴡ": "W",
	"ʏ": "Y",
	"ᴢ": "Z",
	"á": "a",
	"ă": "a",
	"ắ": "a",
	"ặ": "a",
	"ằ": "a",
	"ẳ": "a",
	"ẵ": "a",
	"ǎ": "a",
	"â": "a",
	"ấ": "a",
	"ậ": "a",
	"ầ": "a",
	"ẩ": "a",
	"ẫ": "a",
	"ä": "a",
	"ǟ": "a",
	"ȧ": "a",
	"ǡ": "a",
	"ạ": "a",
	"ȁ": "a",
	"à": "a",
	"ả": "a",
	"ȃ": "a",
	"ā": "a",
	"ą": "a",
	"ᶏ": "a",
	"ẚ": "a",
	"å": "a",
	"ǻ": "a",
	"ḁ": "a",
	"ⱥ": "a",
	"ã": "a",
	"ꜳ": "aa",
	"æ": "ae",
	"ǽ": "ae",
	"ǣ": "ae",
	"ꜵ": "ao",
	"ꜷ": "au",
	"ꜹ": "av",
	"ꜻ": "av",
	"ꜽ": "ay",
	"ḃ": "b",
	"ḅ": "b",
	"ɓ": "b",
	"ḇ": "b",
	"ᵬ": "b",
	"ᶀ": "b",
	"ƀ": "b",
	"ƃ": "b",
	"ɵ": "o",
	"ć": "c",
	"č": "c",
	"ç": "c",
	"ḉ": "c",
	"ĉ": "c",
	"ɕ": "c",
	"ċ": "c",
	"ƈ": "c",
	"ȼ": "c",
	"ď": "d",
	"ḑ": "d",
	"ḓ": "d",
	"ȡ": "d",
	"ḋ": "d",
	"ḍ": "d",
	"ɗ": "d",
	"ᶑ": "d",
	"ḏ": "d",
	"ᵭ": "d",
	"ᶁ": "d",
	"đ": "d",
	"ɖ": "d",
	"ƌ": "d",
	"ı": "i",
	"ȷ": "j",
	"ɟ": "j",
	"ʄ": "j",
	"ǳ": "dz",
	"ǆ": "dz",
	"é": "e",
	"ĕ": "e",
	"ě": "e",
	"ȩ": "e",
	"ḝ": "e",
	"ê": "e",
	"ế": "e",
	"ệ": "e",
	"ề": "e",
	"ể": "e",
	"ễ": "e",
	"ḙ": "e",
	"ë": "e",
	"ė": "e",
	"ẹ": "e",
	"ȅ": "e",
	"è": "e",
	"ẻ": "e",
	"ȇ": "e",
	"ē": "e",
	"ḗ": "e",
	"ḕ": "e",
	"ⱸ": "e",
	"ę": "e",
	"ᶒ": "e",
	"ɇ": "e",
	"ẽ": "e",
	"ḛ": "e",
	"ꝫ": "et",
	"ḟ": "f",
	"ƒ": "f",
	"ᵮ": "f",
	"ᶂ": "f",
	"ǵ": "g",
	"ğ": "g",
	"ǧ": "g",
	"ģ": "g",
	"ĝ": "g",
	"ġ": "g",
	"ɠ": "g",
	"ḡ": "g",
	"ᶃ": "g",
	"ǥ": "g",
	"ḫ": "h",
	"ȟ": "h",
	"ḩ": "h",
	"ĥ": "h",
	"ⱨ": "h",
	"ḧ": "h",
	"ḣ": "h",
	"ḥ": "h",
	"ɦ": "h",
	"ẖ": "h",
	"ħ": "h",
	"ƕ": "hv",
	"í": "i",
	"ĭ": "i",
	"ǐ": "i",
	"î": "i",
	"ï": "i",
	"ḯ": "i",
	"ị": "i",
	"ȉ": "i",
	"ì": "i",
	"ỉ": "i",
	"ȋ": "i",
	"ī": "i",
	"į": "i",
	"ᶖ": "i",
	"ɨ": "i",
	"ĩ": "i",
	"ḭ": "i",
	"ꝺ": "d",
	"ꝼ": "f",
	"ᵹ": "g",
	"ꞃ": "r",
	"ꞅ": "s",
	"ꞇ": "t",
	"ꝭ": "is",
	"ǰ": "j",
	"ĵ": "j",
	"ʝ": "j",
	"ɉ": "j",
	"ḱ": "k",
	"ǩ": "k",
	"ķ": "k",
	"ⱪ": "k",
	"ꝃ": "k",
	"ḳ": "k",
	"ƙ": "k",
	"ḵ": "k",
	"ᶄ": "k",
	"ꝁ": "k",
	"ꝅ": "k",
	"ĺ": "l",
	"ƚ": "l",
	"ɬ": "l",
	"ľ": "l",
	"ļ": "l",
	"ḽ": "l",
	"ȴ": "l",
	"ḷ": "l",
	"ḹ": "l",
	"ⱡ": "l",
	"ꝉ": "l",
	"ḻ": "l",
	"ŀ": "l",
	"ɫ": "l",
	"ᶅ": "l",
	"ɭ": "l",
	"ł": "l",
	"ǉ": "lj",
	"ſ": "s",
	"ẜ": "s",
	"ẛ": "s",
	"ẝ": "s",
	"ḿ": "m",
	"ṁ": "m",
	"ṃ": "m",
	"ɱ": "m",
	"ᵯ": "m",
	"ᶆ": "m",
	"ń": "n",
	"ň": "n",
	"ņ": "n",
	"ṋ": "n",
	"ȵ": "n",
	"ṅ": "n",
	"ṇ": "n",
	"ǹ": "n",
	"ɲ": "n",
	"ṉ": "n",
	"ƞ": "n",
	"ᵰ": "n",
	"ᶇ": "n",
	"ɳ": "n",
	"ñ": "n",
	"ǌ": "nj",
	"ó": "o",
	"ŏ": "o",
	"ǒ": "o",
	"ô": "o",
	"ố": "o",
	"ộ": "o",
	"ồ": "o",
	"ổ": "o",
	"ỗ": "o",
	"ö": "o",
	"ȫ": "o",
	"ȯ": "o",
	"ȱ": "o",
	"ọ": "o",
	"ő": "o",
	"ȍ": "o",
	"ò": "o",
	"ỏ": "o",
	"ơ": "o",
	"ớ": "o",
	"ợ": "o",
	"ờ": "o",
	"ở": "o",
	"ỡ": "o",
	"ȏ": "o",
	"ꝋ": "o",
	"ꝍ": "o",
	"ⱺ": "o",
	"ō": "o",
	"ṓ": "o",
	"ṑ": "o",
	"ǫ": "o",
	"ǭ": "o",
	"ø": "o",
	"ǿ": "o",
	"õ": "o",
	"ṍ": "o",
	"ṏ": "o",
	"ȭ": "o",
	"ƣ": "oi",
	"ꝏ": "oo",
	"ɛ": "e",
	"ᶓ": "e",
	"ɔ": "o",
	"ᶗ": "o",
	"ȣ": "ou",
	"ṕ": "p",
	"ṗ": "p",
	"ꝓ": "p",
	"ƥ": "p",
	"ᵱ": "p",
	"ᶈ": "p",
	"ꝕ": "p",
	"ᵽ": "p",
	"ꝑ": "p",
	"ꝙ": "q",
	"ʠ": "q",
	"ɋ": "q",
	"ꝗ": "q",
	"ŕ": "r",
	"ř": "r",
	"ŗ": "r",
	"ṙ": "r",
	"ṛ": "r",
	"ṝ": "r",
	"ȑ": "r",
	"ɾ": "r",
	"ᵳ": "r",
	"ȓ": "r",
	"ṟ": "r",
	"ɼ": "r",
	"ᵲ": "r",
	"ᶉ": "r",
	"ɍ": "r",
	"ɽ": "r",
	"ↄ": "c",
	"ꜿ": "c",
	"ɘ": "e",
	"ɿ": "r",
	"ś": "s",
	"ṥ": "s",
	"š": "s",
	"ṧ": "s",
	"ş": "s",
	"ŝ": "s",
	"ș": "s",
	"ṡ": "s",
	"ṣ": "s",
	"ṩ": "s",
	"ʂ": "s",
	"ᵴ": "s",
	"ᶊ": "s",
	"ȿ": "s",
	"ɡ": "g",
	"ß": "ss",
	"ᴑ": "o",
	"ᴓ": "o",
	"ᴝ": "u",
	"ť": "t",
	"ţ": "t",
	"ṱ": "t",
	"ț": "t",
	"ȶ": "t",
	"ẗ": "t",
	"ⱦ": "t",
	"ṫ": "t",
	"ṭ": "t",
	"ƭ": "t",
	"ṯ": "t",
	"ᵵ": "t",
	"ƫ": "t",
	"ʈ": "t",
	"ŧ": "t",
	"ᵺ": "th",
	"ɐ": "a",
	"ᴂ": "ae",
	"ǝ": "e",
	"ᵷ": "g",
	"ɥ": "h",
	"ʮ": "h",
	"ʯ": "h",
	"ᴉ": "i",
	"ʞ": "k",
	"ꞁ": "l",
	"ɯ": "m",
	"ɰ": "m",
	"ᴔ": "oe",
	"ɹ": "r",
	"ɻ": "r",
	"ɺ": "r",
	"ⱹ": "r",
	"ʇ": "t",
	"ʌ": "v",
	"ʍ": "w",
	"ʎ": "y",
	"ꜩ": "tz",
	"ú": "u",
	"ŭ": "u",
	"ǔ": "u",
	"û": "u",
	"ṷ": "u",
	"ü": "u",
	"ǘ": "u",
	"ǚ": "u",
	"ǜ": "u",
	"ǖ": "u",
	"ṳ": "u",
	"ụ": "u",
	"ű": "u",
	"ȕ": "u",
	"ù": "u",
	"ủ": "u",
	"ư": "u",
	"ứ": "u",
	"ự": "u",
	"ừ": "u",
	"ử": "u",
	"ữ": "u",
	"ȗ": "u",
	"ū": "u",
	"ṻ": "u",
	"ų": "u",
	"ᶙ": "u",
	"ů": "u",
	"ũ": "u",
	"ṹ": "u",
	"ṵ": "u",
	"ᵫ": "ue",
	"ꝸ": "um",
	"ⱴ": "v",
	"ꝟ": "v",
	"ṿ": "v",
	"ʋ": "v",
	"ᶌ": "v",
	"ⱱ": "v",
	"ṽ": "v",
	"ꝡ": "vy",
	"ẃ": "w",
	"ŵ": "w",
	"ẅ": "w",
	"ẇ": "w",
	"ẉ": "w",
	"ẁ": "w",
	"ⱳ": "w",
	"ẘ": "w",
	"ẍ": "x",
	"ẋ": "x",
	"ᶍ": "x",
	"ý": "y",
	"ŷ": "y",
	"ÿ": "y",
	"ẏ": "y",
	"ỵ": "y",
	"ỳ": "y",
	"ƴ": "y",
	"ỷ": "y",
	"ỿ": "y",
	"ȳ": "y",
	"ẙ": "y",
	"ɏ": "y",
	"ỹ": "y",
	"ź": "z",
	"ž": "z",
	"ẑ": "z",
	"ʑ": "z",
	"ⱬ": "z",
	"ż": "z",
	"ẓ": "z",
	"ȥ": "z",
	"ẕ": "z",
	"ᵶ": "z",
	"ᶎ": "z",
	"ʐ": "z",
	"ƶ": "z",
	"ɀ": "z",
	"ﬀ": "ff",
	"ﬃ": "ffi",
	"ﬄ": "ffl",
	"ﬁ": "fi",
	"ﬂ": "fl",
	"ĳ": "ij",
	"œ": "oe",
	"ﬆ": "st",
	"ₐ": "a",
	"ₑ": "e",
	"ᵢ": "i",
	"ⱼ": "j",
	"ₒ": "o",
	"ᵣ": "r",
	"ᵤ": "u",
	"ᵥ": "v",
	"ₓ": "x",
	"Ё": "YO",
	"Й": "I",
	"Ц": "TS",
	"У": "U",
	"К": "K",
	"Е": "E",
	"Н": "N",
	"Г": "G",
	"Ш": "SH",
	"Щ": "SCH",
	"З": "Z",
	"Х": "H",
	"Ъ": "",
	"ё": "yo",
	"й": "i",
	"ц": "ts",
	"у": "u",
	"к": "k",
	"е": "e",
	"н": "n",
	"г": "g",
	"ш": "sh",
	"щ": "sch",
	"з": "z",
	"х": "h",
	"ъ": "",
	"Ф": "F",
	"Ы": "I",
	"В": "V",
	"А": "A",
	"П": "P",
	"Р": "R",
	"О": "O",
	"Л": "L",
	"Д": "D",
	"Ж": "ZH",
	"Э": "E",
	"ф": "f",
	"ы": "i",
	"в": "v",
	"а": "a",
	"п": "p",
	"р": "r",
	"о": "o",
	"л": "l",
	"д": "d",
	"ж": "zh",
	"э": "e",
	"Я": "Ya",
	"Ч": "CH",
	"С": "S",
	"М": "M",
	"И": "I",
	"Т": "T",
	"Ь": "",
	"Б": "B",
	"Ю": "YU",
	"я": "ya",
	"ч": "ch",
	"с": "s",
	"м": "m",
	"и": "i",
	"т": "t",
	"ь": "",
	"б": "b",
	"ю": "yu"
};
//#endregion
//#region src/helpers/cleanSearchText.ts
var badCharsRe = /[`~!@#$%^&*()\-_=+\[\]\\|{}'";:\/?.>,<]+/g;
var trimRe = /^\s+|\s+$/g;
var C2L = {
	"й": "q",
	"ц": "w",
	"у": "e",
	"к": "r",
	"е": "t",
	"н": "y",
	"г": "u",
	"ш": "i",
	"щ": "o",
	"з": "p",
	"х": "[",
	"ъ": "]",
	"ф": "a",
	"ы": "s",
	"в": "d",
	"а": "f",
	"п": "g",
	"р": "h",
	"о": "j",
	"л": "k",
	"д": "l",
	"ж": ";",
	"э": "'",
	"я": "z",
	"ч": "x",
	"с": "c",
	"м": "v",
	"и": "b",
	"т": "n",
	"ь": "m",
	"б": ",",
	"ю": ".",
	".": "/"
};
function clearBadCharsAndTrim(text) {
	return text.replace(badCharsRe, "").replace(trimRe, "");
}
function fixCyrillic(text) {
	return text.toLowerCase().replace(/[\wа-я]/g, (ch) => {
		return C2L[ch] ?? ch;
	});
}
function latinizeString(text) {
	return text.replace(/[^A-Za-z0-9]/g, (ch) => {
		return LatinizeMap[ch] ?? ch;
	});
}
function cleanSearchText(text, latinize = true) {
	return processSearchText(text, {
		clearBadChars: true,
		latinize,
		ignoreCase: true
	});
}
function processSearchText(text = "", options = {}) {
	const hasTag = options.includeTag && text.charAt(0) === "%";
	const originalText = text;
	if (options.clearBadChars) text = clearBadCharsAndTrim(text);
	if (options.latinize) text = latinizeString(text);
	if (options.ignoreCase) text = text.toLowerCase();
	if (hasTag) text = "%" + text;
	if (options.latinize) text += "" + fixCyrillic(originalText);
	return text;
}
//#endregion
//#region src/lib/richTextProcessor/trimRichText.ts
function trimRichText(text, entities) {
	const originalText = text;
	entities = structuredClone(entities);
	const left = originalText.match(/^\s*/)[0].length;
	text = originalText.slice(left).replace(/\s*$/, "");
	const right = left + text.length;
	entities = entities.filter((entity) => {
		const start = Math.max(left, entity.offset);
		const end = Math.min(right, entity.offset + entity.length);
		entity.offset = start - left;
		entity.length = end - start;
		return entity.length > 0;
	});
	return {
		text,
		entities
	};
}
//#endregion
//#region src/lib/richTextProcessor/parseMarkdown.ts
function parseMarkdown(raw, currentEntities = [], noTrim) {
	const entities = [];
	let pushedEntity = false;
	const pushEntity = (entity, adjustOffset = 0, adjustLength = 0) => {
		return !findConflictingEntity(currentEntities, adjustOffset || adjustLength ? {
			...entity,
			length: entity.length + adjustLength + adjustOffset
		} : entity, true) ? (entities.push(entity), pushedEntity = true) : pushedEntity = false;
	};
	const newTextParts = [];
	let rawOffset = 0, match;
	while (match = raw.match(MARKDOWN_REG_EXP)) {
		const matchWhitespace = match[1] || "";
		const matchIndexAfterWhitespace = match.index + matchWhitespace.length;
		const matchValueAfterWhitespace = match[0].slice(matchWhitespace.length);
		const matchIndex = rawOffset + matchIndexAfterWhitespace;
		const possibleNextRawOffset = matchIndex + matchValueAfterWhitespace.length;
		const beforeMatch = matchIndexAfterWhitespace > 0 && raw.slice(0, matchIndexAfterWhitespace);
		beforeMatch && newTextParts.push(beforeMatch);
		const text = match[3] || match[8] || match[11] || match[13];
		let entity;
		pushedEntity = false;
		if (text.match(/^`*$/)) {} else if (match[3]) {
			let language = match[3].match(/(.*?)\n/)?.[1] || "";
			if (language && !/^[\w+#.-]{1,32}$/.test(language)) language = "";
			let code = language ? match[3].slice(language.length) : match[3];
			const startIndex = code[0] === "\n" ? 1 : 0;
			const endIndex = code[code.length - 1] === "\n" ? -1 : void 0;
			code = code.slice(startIndex, endIndex);
			entity = {
				_: "messageEntityPre",
				language,
				offset: matchIndex,
				length: code.length
			};
			const adjustOffset = match[2].length + (language ? language.length : 0) + (startIndex ? 1 : 0);
			const adjustLength = match[4].length + (endIndex ? 1 : 0);
			if (pushEntity(entity, adjustOffset, adjustLength)) {
				if (startIndex) rawOffset -= 1;
				if (endIndex) rawOffset -= 1;
				if (language) rawOffset -= language.length;
				let whitespace = "";
				{
					const previousPart = newTextParts[newTextParts.length - 1];
					if (previousPart && !/\s/.test(previousPart[previousPart.length - 1])) whitespace = "\n";
				}
				newTextParts.push(whitespace, code, match[5]);
				rawOffset -= match[2].length + match[4].length;
			}
		} else if (match[7]) {
			const isSOH = match[6] === "";
			const symbol = match[7];
			entity = {
				_: MARKDOWN_ENTITIES[symbol],
				offset: matchIndex + (isSOH ? 0 : match[6].length),
				length: text.length
			};
			if (pushEntity(entity, symbol.length, symbol.length)) {
				if (!isSOH) newTextParts.push(match[6] + text + match[9]);
				else newTextParts.push(text);
				rawOffset -= symbol.length * 2 + (isSOH ? 2 : 0);
			}
		} else if (match[11]) {
			entity = {
				_: "messageEntityMentionName",
				user_id: match[10].toUserId(),
				offset: matchIndex,
				length: text.length
			};
			if (pushEntity(entity)) {
				newTextParts.push(text);
				rawOffset -= matchValueAfterWhitespace.length - text.length;
			}
		} else if (match[12]) {
			const url = match[14];
			entity = {
				_: "messageEntityTextUrl",
				url,
				offset: matchIndex,
				length: text.length
			};
			const adjustOffset = 1;
			const adjustLength = 4 + url.length;
			if (pushEntity(entity, adjustOffset, adjustLength)) {
				newTextParts.push(text);
				rawOffset -= match[12].length - text.length;
			}
		}
		if (!pushedEntity) newTextParts.push(matchValueAfterWhitespace);
		raw = raw.substr(matchIndexAfterWhitespace + matchValueAfterWhitespace.length);
		rawOffset += matchIndexAfterWhitespace + matchValueAfterWhitespace.length;
		const rawOffsetDiff = rawOffset - possibleNextRawOffset;
		if (rawOffsetDiff) currentEntities.forEach((entity) => {
			if (entity.offset >= matchIndex) entity.offset += rawOffsetDiff;
		});
	}
	raw && newTextParts.push(raw);
	let newText = newTextParts.join("");
	if (!newText.replace(/\s+/g, "").length) {
		newText = raw;
		entities.splice(0, entities.length);
	}
	currentEntities = mergeEntities(currentEntities, entities);
	combineSameEntities(currentEntities);
	if (!noTrim) ({text: newText, entities: currentEntities} = trimRichText(newText, currentEntities));
	return [newText, currentEntities];
}
MOUNT_CLASS_TO && (MOUNT_CLASS_TO.parseMarkdown = parseMarkdown);
//#endregion
//#region src/lib/appManagers/utils/messages/getGroupedText.ts
function getGroupedText(messages) {
	let foundMessages = 0, message;
	for (const m of messages) {
		assumeType(m);
		if (m.message) {
			if (++foundMessages > 1) break;
			message = m;
		}
	}
	if (foundMessages > 1) message = void 0;
	return message;
}
//#endregion
//#region src/helpers/array/insertInDescendSortedArray.ts
function insertInDescendSortedArray(array, element, getProperty, pos, cmp) {
	if (!getProperty) getProperty = (element) => element;
	else if (typeof getProperty !== "function") {
		const property = getProperty;
		getProperty = (element) => element[property];
	}
	cmp || (cmp = (val1, val2) => val1 - val2);
	const sortProperty = getProperty(element);
	pos ?? (pos = array.indexOf(element));
	if (pos !== -1) {
		const prev = array[pos - 1];
		const next = array[pos + 1];
		if ((!prev || cmp(getProperty(prev), sortProperty) >= 0) && (!next || cmp(getProperty(next), sortProperty) <= 0)) return pos;
		array.splice(pos, 1);
	}
	const len = array.length;
	if (!len || cmp(sortProperty, getProperty(array[len - 1])) <= 0) return array.push(element) - 1;
	else if (cmp(sortProperty, getProperty(array[0])) >= 0) {
		array.unshift(element);
		return 0;
	} else for (let i = 0; i < len; i++) if (cmp(sortProperty, getProperty(array[i])) > 0) {
		array.splice(i, 0, element);
		return i;
	}
	console.error("wtf", array, element);
	return array.indexOf(element);
}
//#endregion
//#region src/lib/appManagers/utils/messages/getMessageThreadId.ts
function getMessageThreadId(message, { isForum = false, isBotforum = false } = {}) {
	let threadId;
	const replyTo = message.reply_to;
	const savedPeerId = message.saved_peer_id && getPeerId(message.saved_peer_id);
	if (savedPeerId) threadId = savedPeerId;
	else if (replyTo?._ === "messageReplyHeader" && (!isForum && !isBotforum || replyTo.pFlags.forum_topic)) threadId = replyTo.reply_to_top_id || replyTo.reply_to_msg_id;
	else if (isForum || isBotforum) {
		if (message._ === "messageService" && message.action?._ === "messageActionTopicCreate") threadId = message.mid;
		else if (isForum) threadId = GENERAL_TOPIC_ID;
	}
	return threadId;
}
//#endregion
//#region src/helpers/bytes/compareUint8Arrays.ts
function compareUint8Arrays(arr1, arr2) {
	return arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);
}
//#endregion
//#region src/helpers/date/getFullDate.ts
var getFullDate = (date, options = {}) => {
	const joiner = options.monthAsNumber ? "." : " ";
	const time = ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2) + (options.noSeconds ? "" : ":" + ("0" + date.getSeconds()).slice(-2));
	const fullYear = date.getFullYear();
	return (options.leadingZero ? ("0" + date.getDate()).slice(-2) : date.getDate()) + joiner + (options.monthAsNumber ? ("0" + (date.getMonth() + 1)).slice(-2) : months[date.getMonth()]) + joiner + ("" + fullYear).slice(options.shortYear ? 2 : 0) + (options.noTime ? "" : (options.timeJoiner || ", ") + time);
};
//#endregion
//#region src/lib/appManagers/utils/messages/getMainGroupedMessage.ts
function getMainGroupedMessage(messages) {
	return messages[0];
}
//#endregion
//#region src/helpers/forgetSettledRequest.ts
/**
* A request kept in a map while it is on its way, and forgotten once it settles - answered or failed - if the map
* still keeps this very one (a newer request for the key stays): the next ask makes a new request.
*/
function forgetSettledRequest(map, key, promise) {
	const forget = () => {
		if (map.get(key) === promise) map.delete(key);
	};
	promise.then(forget, forget);
	return promise;
}
//#endregion
//#region src/lib/appManagers/utils/messages/isMentionUnread.ts
function isMentionUnread(message) {
	if (!message) return false;
	const doc = message.media?.document;
	return !!(message.pFlags.media_unread && message.pFlags.mentioned && (!doc || !["voice", "round"].includes(doc.type)));
}
//#endregion
//#region src/lib/appManagers/utils/messages/getReadMaxIdIfUnread.ts
/** The unread-divider cursor, not the inbox cursor used to classify individual messages. */
function getReadMaxIdIfUnread({ readMaxId, maxId, topMessageOut, mergedThread = false }) {
	const hasCursor = mergedThread || !!getServerMessageId(readMaxId);
	return !topMessageOut && readMaxId < maxId && hasCursor ? readMaxId : 0;
}
//#endregion
//#region src/lib/appManagers/utils/gifts/inputStarGiftEquals.ts
function inputStarGiftEquals(gift, b) {
	const a = "type" in gift ? gift.input : gift;
	if (a._ === "inputSavedStarGiftChat" && b._ === "inputSavedStarGiftChat") return a.saved_id === b.saved_id && getPeerId(a.peer) === getPeerId(b.peer);
	if (a._ === "inputSavedStarGiftUser" && b._ === "inputSavedStarGiftUser") return a.msg_id === b.msg_id;
	if (a._ === "inputSavedStarGiftSlug" && b._ === "inputSavedStarGiftSlug") return a.slug === b.slug;
	if ("raw" in gift && gift.raw._ === "starGiftUnique" && b._ === "inputSavedStarGiftSlug") return gift.raw.slug === b.slug;
	return false;
}
//#endregion
//#region src/lib/richTextProcessor/inputRichMessageBlocks.ts
function inputRichText(text) {
	switch (text._) {
		case "textMention":
		case "textHashtag":
		case "textBotCommand":
		case "textCashtag":
		case "textAutoUrl":
		case "textAutoEmail":
		case "textAutoPhone":
		case "textBankCard":
		case "textTonAddress":
		case "textDiff": return inputRichText(text.text);
		case "textConcat": return concatRichText(text.texts.map(inputRichText));
		case "textUrl": return {
			...text,
			text: inputRichText(text.text),
			webpage_id: 0
		};
		case "textBold":
		case "textItalic":
		case "textUnderline":
		case "textStrike":
		case "textFixed":
		case "textEmail":
		case "textSubscript":
		case "textSuperscript":
		case "textMarked":
		case "textPhone":
		case "textAnchor":
		case "textSpoiler":
		case "textMentionName":
		case "textDate":
		case "textButton": return {
			...text,
			text: inputRichText(text.text)
		};
		default: return text;
	}
}
function inputPageCaption(caption) {
	return {
		_: "pageCaption",
		text: inputRichText(caption.text),
		credit: inputRichText(caption.credit)
	};
}
function inputPageBlock(block) {
	switch (block._) {
		case "pageBlockParagraph":
		case "pageBlockHeading1":
		case "pageBlockHeading2":
		case "pageBlockHeading3":
		case "pageBlockHeading4":
		case "pageBlockHeading5":
		case "pageBlockHeading6":
		case "pageBlockPreformatted":
		case "pageBlockThinking":
		case "pageBlockFooter": return {
			...block,
			text: inputRichText(block.text)
		};
		case "pageBlockBlockquote":
		case "pageBlockPullquote": return {
			...block,
			text: inputRichText(block.text),
			caption: inputRichText(block.caption)
		};
		case "pageBlockBlockquoteBlocks": return {
			...block,
			blocks: block.blocks.map(inputPageBlock),
			caption: inputRichText(block.caption)
		};
		case "pageBlockDetails": return {
			...block,
			blocks: block.blocks.map(inputPageBlock),
			title: inputRichText(block.title)
		};
		case "pageBlockList": return {
			...block,
			items: block.items.map((item) => item._ === "pageListItemText" ? {
				...item,
				text: inputRichText(item.text)
			} : {
				...item,
				blocks: item.blocks.map(inputPageBlock)
			})
		};
		case "pageBlockOrderedList": return {
			...block,
			items: block.items.map((item) => {
				const result = item._ === "pageListOrderedItemText" ? {
					...item,
					text: inputRichText(item.text)
				} : {
					...item,
					blocks: item.blocks.map(inputPageBlock)
				};
				delete result.num;
				return result;
			})
		};
		case "pageBlockTable": return {
			...block,
			title: inputRichText(block.title),
			rows: block.rows.map((row) => ({
				...row,
				cells: row.cells.map((cell) => cell.text ? {
					...cell,
					text: inputRichText(cell.text)
				} : { ...cell })
			}))
		};
		case "pageBlockPhoto": return {
			_: "pageBlockPhoto",
			pFlags: { spoiler: block.pFlags.spoiler },
			photo_id: block.photo_id,
			caption: inputPageCaption(block.caption)
		};
		case "pageBlockVideo": return {
			_: "pageBlockVideo",
			pFlags: { spoiler: block.pFlags.spoiler },
			video_id: block.video_id,
			caption: inputPageCaption(block.caption)
		};
		case "pageBlockAudio":
		case "pageBlockDocument": return {
			...block,
			caption: inputPageCaption(block.caption)
		};
		case "pageBlockCollage":
		case "pageBlockSlideshow": return {
			...block,
			items: block.items.map(inputPageBlock),
			caption: inputPageCaption(block.caption)
		};
		case "pageBlockMap": return {
			_: "inputPageBlockMap",
			geo: block.geo._ === "geoPoint" ? {
				_: "inputGeoPoint",
				lat: block.geo.lat,
				long: block.geo.long,
				accuracy_radius: block.geo.accuracy_radius
			} : { _: "inputGeoPointEmpty" },
			zoom: block.zoom,
			w: block.w,
			h: block.h,
			caption: inputPageCaption(block.caption)
		};
		case "inputPageBlockMap": return {
			...block,
			caption: inputPageCaption(block.caption)
		};
		case "pageBlockButtonRow": return {
			...block,
			buttons: block.buttons.map((button) => ({
				...button,
				text: inputRichText(button.text)
			}))
		};
		default: return block;
	}
}
//#endregion
//#region src/lib/appManagers/utils/photos/getPhotoInput.ts
function getPhotoInput(photo) {
	return {
		_: "inputPhoto",
		id: photo.id,
		access_hash: photo.access_hash,
		file_reference: photo.file_reference
	};
}
//#endregion
//#region src/lib/richTextProcessor/inferRichMessageNoAutolink.ts
var AUTOLINK_CANDIDATE = /(?:https?:\/\/|tg:\/\/|tonsite:\/\/|www\.)\S+|[\w.+-]+@[\w.-]+\.\w+/i;
function inspectAutolinkRichText(text, state, protectedContext = false) {
	switch (text._) {
		case "textPlain":
			if (!protectedContext && AUTOLINK_CANDIDATE.test(text.text)) state.candidate = true;
			return;
		case "textConcat":
			text.texts.forEach((child) => inspectAutolinkRichText(child, state, protectedContext));
			return;
		case "textMention":
		case "textHashtag":
		case "textBotCommand":
		case "textCashtag":
		case "textAutoUrl":
		case "textAutoEmail":
		case "textAutoPhone":
		case "textBankCard":
		case "textTonAddress":
			state.auto = true;
			inspectAutolinkRichText(text.text, state, true);
			return;
		case "textUrl":
		case "textEmail":
		case "textPhone":
		case "textMentionName":
		case "textFixed":
		case "textAnchor":
		case "textButton":
			inspectAutolinkRichText(text.text, state, true);
			return;
		case "textEmpty":
		case "textImage":
		case "textMath":
		case "textCustomEmoji": return;
		case "textDiff":
			inspectAutolinkRichText(text.text, state, protectedContext);
			return;
		default: inspectAutolinkRichText(text.text, state, protectedContext);
	}
}
function inspectAutolinkBlock(block, state) {
	const inspectText = (text) => text && inspectAutolinkRichText(text, state);
	const inspectCaption = (caption) => {
		inspectText(caption.text);
		inspectText(caption.credit);
	};
	switch (block._) {
		case "pageBlockParagraph":
		case "pageBlockHeading1":
		case "pageBlockHeading2":
		case "pageBlockHeading3":
		case "pageBlockHeading4":
		case "pageBlockHeading5":
		case "pageBlockHeading6":
		case "pageBlockFooter":
		case "pageBlockThinking":
			inspectText(block.text);
			return;
		case "pageBlockPreformatted": return;
		case "pageBlockBlockquote":
		case "pageBlockPullquote":
			inspectText(block.text);
			inspectText(block.caption);
			return;
		case "pageBlockBlockquoteBlocks":
			inspectText(block.caption);
			block.blocks.forEach((child) => inspectAutolinkBlock(child, state));
			return;
		case "pageBlockDetails":
			inspectText(block.title);
			block.blocks.forEach((child) => inspectAutolinkBlock(child, state));
			return;
		case "pageBlockList":
		case "pageBlockOrderedList":
			block.items.forEach((item) => {
				if (item._ === "pageListItemText" || item._ === "pageListOrderedItemText") inspectText(item.text);
				else item.blocks.forEach((child) => inspectAutolinkBlock(child, state));
			});
			return;
		case "pageBlockTable":
			inspectText(block.title);
			block.rows.forEach((row) => row.cells.forEach((cell) => inspectText(cell.text)));
			return;
		case "pageBlockPhoto":
		case "pageBlockVideo":
		case "pageBlockAudio":
		case "pageBlockDocument":
		case "pageBlockMap":
		case "inputPageBlockMap":
			inspectCaption(block.caption);
			return;
		case "pageBlockCollage":
		case "pageBlockSlideshow":
			inspectCaption(block.caption);
			block.items.forEach((item) => inspectAutolinkBlock(item, state));
			return;
		case "pageBlockButtonRow":
			block.buttons.forEach((button) => inspectAutolinkRichText(button.text, state, true));
			return;
		default: return;
	}
}
function inferRichMessageNoAutolink(message) {
	if (message._ === "inputRichMessage") return !!message.pFlags.noautolink;
	const state = {
		auto: false,
		candidate: false
	};
	message.blocks.forEach((block) => inspectAutolinkBlock(block, state));
	return state.candidate && !state.auto;
}
//#endregion
//#region src/helpers/object/setBooleanFlag.ts
function setBooleanFlag(obj, key, value) {
	if (value) obj[key] = true;
	else delete obj[key];
}
//#endregion
//#region src/helpers/array/putInOrder.ts
/**
* `items` rearranged so that the ones `order` names come first, in its order, and the rest follow
* in their own - how a list takes a new order that covers only a part of it (what has been loaded
* of it, say). Keys `items` does not hold are passed over.
*/
function putInOrder(items, order, getKey = (item) => item) {
	const byKey = new Map(items.map((item) => [getKey(item), item]));
	const ordered = [];
	for (const key of order) if (byKey.has(key)) {
		ordered.push(byKey.get(key));
		byKey.delete(key);
	}
	return ordered.concat(items.filter((item) => byKey.has(getKey(item))));
}
//#endregion
//#region src/lib/appManagers/utils/payments/starsTransaction.ts
var starsTransactionProviders = {
	starsTransactionPeerAppStore: "Stars.Transaction.AppStore",
	starsTransactionPeerPlayMarket: "Stars.Transaction.PlayMarket",
	starsTransactionPeerPremiumBot: "Stars.Via.Bot",
	starsTransactionPeerFragment: "Stars.Transaction.Fragment",
	starsTransactionPeerAds: "Stars.Transaction.Ads",
	starsTransactionPeerAPI: "Stars.Transaction.API",
	starsTransactionPeerUnsupported: "Stars.Transaction.Unsupported"
};
/** The sign describes this balance change; a refund reverses the original operation. */
function getStarsTransactionPresentation(transaction) {
	const { pFlags: flags, stargift: gift } = transaction;
	const incoming = !starsAmountNanounits(transaction.amount).isNegative();
	const outgoing = flags.refund ? incoming : !incoming;
	const ton = transaction.amount._ === "starsTonAmount";
	let kind;
	let titleKey;
	let titleArgs = [];
	let icon = ton ? "gram_filled" : "star";
	const set = (type, key, args = []) => {
		kind = type;
		titleKey = key;
		titleArgs = args;
	};
	if (flags.stargift_drop_original_details) set("giftDescription", "Stars.Transaction.GiftDescription");
	else if (flags.posts_search) {
		set("search", "Stars.Transaction.Search");
		icon = "search";
	} else if (transaction.premium_gift_months) {
		set("premium", "Stars.Transaction.Premium", [transaction.premium_gift_months]);
		icon = "premium";
	} else if (flags.phonegroup_message || flags.reaction && transaction.paid_messages && !transaction.msg_id) set("live", flags.reaction ? "Stars.Transaction.LiveReaction" : "Stars.Transaction.LiveMessages", [transaction.paid_messages || 1]);
	else if (transaction.paid_messages !== void 0) set("messages", "PaidMessages.FeeForMessages", [transaction.paid_messages]);
	else if (transaction.floodskip_number !== void 0 || transaction.peer._ === "starsTransactionPeerAPI") set("api", transaction.floodskip_number === void 0 ? "Stars.Transaction.API" : "Stars.Transaction.Broadcast", [transaction.floodskip_number || 0]);
	else if (flags.stargift_auction_bid) set("auction", "Stars.Transaction.Auction");
	else if (flags.stargift_prepaid_upgrade) set("prepaidUpgrade", "Stars.Transaction.PrepaidUpgrade");
	else if (flags.stargift_upgrade) set("upgrade", "Stars.Transaction.Upgrade");
	else if (flags.offer) set("offer", outgoing ? "StarGiftOffer.CreateOfferTitle" : "Stars.Transaction.GiftSale");
	else if (flags.stargift_resale || gift?._ === "starGiftUnique") {
		const resale = flags.stargift_resale || !outgoing && !starsAmountNanounits(transaction.amount).isZero();
		set(resale ? "resale" : "transfer", resale ? outgoing ? "Stars.Transaction.GiftPurchase" : "Stars.Transaction.GiftSale" : "Stars.Transaction.GiftTransfer");
	} else if (gift) set("gift", outgoing ? "StarsGiftSent" : "Stars.Transaction.GiftConverted");
	else if (transaction.starref_commission_permille !== void 0 && !transaction.starref_amount) set("affiliate", "Stars.Transaction.Commission", [transaction.starref_commission_permille / 10]);
	else if (flags.business_transfer) set("business", "Stars.Transaction.BusinessTransfer");
	else if (transaction.ads_proceeds_from_date !== void 0) set("adsProceeds", "Stars.Transaction.AdsProceeds");
	else if (transaction.giveaway_post_id) set("giveaway", "StarsGiveawayPrizeReceived");
	else if (transaction.extended_media?.length) set("media", "StarMediaPurchase");
	else if (flags.reaction) set("reaction", "StarsReactionTitle");
	else if (transaction.subscription_period) set("subscription", transaction.subscription_period === 2592e3 ? "Stars.Subscription.Title" : "Stars.Transaction.Subscription");
	else if (flags.gift) set("starsGift", outgoing ? "StarsGiftSent" : "StarsGiftReceived");
	else if (transaction.peer._ === "starsTransactionPeerFragment") set(outgoing ? "withdrawal" : "topup", outgoing ? "Stars.Transaction.Withdrawal" : ton ? "Stars.Transaction.GramTopup" : "Stars.TopUp");
	else if (transaction.peer._ === "starsTransactionPeerAds") set("ads", "Stars.Transaction.Ads");
	else if (transaction.peer._ === "starsTransactionPeerUnsupported") set("unsupported", "Stars.Transaction.Unsupported");
	else if (transaction.peer._ !== "starsTransactionPeer") set("topup", ton ? "Stars.Transaction.GramTopup" : "Stars.TopUp");
	else set("payment", "Stars.Transaction.Payment");
	const statusKey = flags.refund ? "StarsRefunded" : flags.failed ? "StarsFailed" : flags.pending ? "StarsPending" : void 0;
	const anonymousGift = kind === "starsGift" && !ton && transaction.peer._ === "starsTransactionPeerFragment";
	return {
		kind,
		titleKey,
		titleArgs,
		icon,
		incoming,
		outgoing,
		ton,
		statusKey,
		anonymousGift
	};
}
/** Gross income is the credited amount plus its fee; old resale receipts provide only a rate. */
function getStarsTransactionFullAmount(transaction) {
	const { kind, incoming } = getStarsTransactionPresentation(transaction);
	if (!incoming || transaction.pFlags.refund || ![
		"messages",
		"live",
		"resale",
		"offer"
	].includes(kind)) return;
	const net = starsAmountNanounits(transaction.amount);
	let full = net;
	if (transaction.starref_amount) {
		if (transaction.starref_amount._ !== transaction.amount._) return;
		const fee = starsAmountNanounits(transaction.starref_amount);
		if (fee.isNegative()) return;
		full = net.add(fee);
	} else {
		const rate = transaction.starref_commission_permille;
		if (!["resale", "offer"].includes(kind) || !Number.isInteger(rate) || rate < 0 || rate >= 1e3) return;
		const denominator = 1e3 - rate;
		full = net.multiply(1e3).add(Math.floor(denominator / 2)).divide(denominator);
	}
	if (transaction.amount._ === "starsTonAmount") return {
		_: "starsTonAmount",
		amount: full.toString()
	};
	const { quotient, remainder } = full.divmod(1e9);
	return {
		_: "starsAmount",
		amount: quotient.toString(),
		nanos: remainder.toJSNumber()
	};
}
/** Message/media belong to the seller's ledger for incoming sales, not the buyer's chat. */
function getStarsTransactionMessagePeerId(transaction, ownerPeerId, selfPeerId) {
	const peerId = transaction.peer._ === "starsTransactionPeer" ? getPeerId(transaction.peer.peer) : void 0;
	if (transaction.giveaway_post_id) return peerId;
	const incoming = !starsAmountNanounits(transaction.amount).isNegative();
	return (transaction.pFlags.refund ? !incoming : incoming) && ownerPeerId !== selfPeerId && (transaction.pFlags.reaction || transaction.extended_media?.length || transaction.paid_messages !== void 0) ? ownerPeerId : peerId;
}
var EMOJI_REG_EXP = new RegExp(originalString, "g");
function getMemberTagRole(participant) {
	return isParticipantCreator(participant) ? "owner" : isParticipantAdmin(participant) ? "admin" : "member";
}
function removeMemberTagEmoji(text) {
	return text.replace(EMOJI_REG_EXP, "");
}
function cleanMemberTag(text) {
	return removeMemberTagEmoji(text).replace(/\s+/g, " ").trim().slice(0, 16);
}
function canHaveMemberTags(chat) {
	return chat?._ === "chat" || chat?._ === "channel" && !!chat.pFlags.megagroup && !chat.pFlags.monoforum;
}
/**
* Whether I may set `peerId`'s tag (desktop's rules): mine when the group lets me, anyone else's
* with the right to — an admin's or the owner's only when I may edit that admin too
*/
function canEditMemberTag(chat, peerId, myId, participant) {
	if (!canHaveMemberTags(chat)) return false;
	const group = chat;
	if (peerId === myId) return hasRights(group, "edit_rank");
	return hasRights(group, "manage_ranks") && (!isParticipantAdmin(participant) || canEditAdmin(chat, participant, myId));
}
/**
* Puts a basic group's member tag into its participants, by the version they carry (desktop's
* applyUpdateVersion): an older state is dropped, and so is one past a change never received —
* 'gap' asks for the whole list again. Without a version (my own change) it just applies
*/
function applyChatParticipantRank(chatParticipants, userId, rank, version) {
	if (version !== void 0) {
		if (version < chatParticipants.version) return "old";
		else if (version > chatParticipants.version + 1) return "gap";
	}
	const participant = chatParticipants.participants.find((participant) => participant.user_id === userId);
	if (!participant) return "missing";
	if (version !== void 0) chatParticipants.version = version;
	if (rank) participant.rank = rank;
	else delete participant.rank;
	return "applied";
}
//#endregion
//#region src/lib/appManagers/utils/messages/fullMid.ts
function makeFullMid(peerId, mid) {
	if (typeof peerId === "object") {
		mid = peerId.mid;
		peerId = peerId.peerId;
	}
	return `${peerId}_${mid}`;
}
function splitFullMid(fullMid) {
	const [peerId, mid] = fullMid.split("_");
	return {
		peerId: peerId.toPeerId(),
		mid: +mid
	};
}
//#endregion
//#region src/lib/appManagers/utils/messages/getUnreadReactions.ts
function getUnreadReactions(message) {
	const recentReactions = (message?.reactions)?.recent_reactions;
	if (!recentReactions) return;
	const arr = recentReactions.filter((reaction) => reaction.pFlags.unread);
	if (!arr.length) return;
	return arr;
}
//#endregion
//#region src/lib/wallet/tonAddress.ts
/**
* TON addresses without the engine: a chat card shows the counterparty as a user-friendly address and must not
* load three megabytes of WebAssembly for it. A friendly address is 36 bytes in URL-safe base64 — a tag, the
* workchain, the 32-byte account id and a CRC16 of those 34 bytes; the tag says whether the address bounces and
* whether it is a testnet one.
*/
var TAG_BOUNCEABLE = 17;
var TAG_NON_BOUNCEABLE = 81;
var TAG_TESTNET = 128;
/** CRC-16/XMODEM, the checksum of a friendly address */
function crc16(bytes) {
	let crc = 0;
	for (const byte of bytes) {
		crc ^= byte << 8;
		for (let i = 0; i < 8; ++i) {
			crc = crc & 32768 ? crc << 1 ^ 4129 : crc << 1;
			crc &= 65535;
		}
	}
	return crc;
}
function parseTonAddress(address) {
	address = address?.trim();
	if (!address) return;
	const raw = address.match(/^(-?\d+):([0-9a-fA-F]{64})$/);
	if (raw) return {
		workchain: +raw[1],
		hash: bytesFromHex(raw[2]),
		bounceable: true,
		testnet: false
	};
	if (address.length !== 48) return;
	let bytes;
	try {
		bytes = base64ToBytes(address);
	} catch (err) {
		return;
	}
	if (bytes.length !== 36) return;
	const checksum = bytes[34] << 8 | bytes[35];
	if (crc16(bytes.subarray(0, 34)) !== checksum) return;
	const tag = bytes[0];
	const testnet = !!(tag & TAG_TESTNET);
	const kind = tag & -129;
	if (kind !== TAG_BOUNCEABLE && kind !== TAG_NON_BOUNCEABLE) return;
	return {
		workchain: bytes[1] > 127 ? bytes[1] - 256 : bytes[1],
		hash: bytes.slice(2, 34),
		bounceable: kind === TAG_BOUNCEABLE,
		testnet
	};
}
function formatTonAddress(parts) {
	const bytes = /* @__PURE__ */ new Uint8Array(36);
	bytes[0] = (parts.bounceable ? TAG_BOUNCEABLE : TAG_NON_BOUNCEABLE) | (parts.testnet ? TAG_TESTNET : 0);
	bytes[1] = parts.workchain & 255;
	bytes.set(parts.hash, 2);
	const checksum = crc16(bytes.subarray(0, 34));
	bytes[34] = checksum >> 8;
	bytes[35] = checksum & 255;
	return fixBase64String(bytesToBase64(bytes), true);
}
/**
* The non-bounceable form a wallet shows to people (UQ… on the mainnet), or nothing when the text is no address
*/
function toFriendlyTonAddress(address, bounceable = false) {
	const parts = parseTonAddress(address);
	return parts && formatTonAddress({
		...parts,
		bounceable
	});
}
//#endregion
//#region src/lib/appManagers/utils/peers/isSuspiciousPeer.ts
/**
* A user whose chat still offers to report or block them: they wrote first, and the account has
* neither dismissed the bar nor written back. Until then their links show as plain text and their
* messages' buttons are not shown (iOS `CachedUserData.isSuspiciousPeer`).
*/
function isSuspiciousPeer(peerId, peerSettings) {
	return peerId.isUser() && !!(peerSettings?.pFlags.report_spam || peerSettings?.pFlags.block_contact);
}
function endSuspiciousPeerSettings(peerSettings) {
	delete peerSettings.pFlags.report_spam;
	delete peerSettings.pFlags.block_contact;
}
//#endregion
//#region src/lib/richTextProcessor/tableGrid.ts
function tableSpan(value) {
	if (value === void 0) return {
		valid: true,
		value: 1
	};
	const valid = Number.isInteger(value) && value > 0 && value <= 2147483647;
	return {
		valid,
		value: valid ? value : 1
	};
}
/** Both lists in column order, merged into one in column order. */
function mergeRowSpans(spans, started) {
	if (!spans.length || started[0].start >= spans[spans.length - 1].start) {
		for (const span of started) spans.push(span);
		return spans;
	}
	const merged = [];
	let index = 0;
	for (const span of spans) {
		while (index < started.length && started[index].start < span.start) merged.push(started[index++]);
		merged.push(span);
	}
	while (index < started.length) merged.push(started[index++]);
	return merged;
}
/**
* Lays the rows out on their grid as a table does: a cell takes the first column its row has free,
* after the cells reaching down from the rows above. `columns` is the grid's width (at most
* `maxColumns`), `conflict` tells of an invalid span or two cells on one slot.
*
* The table is whatever its sender made it, so a row walks the cells reaching into it from above once,
* left to right, whatever their spans: rows × such cells at most, less than the browser's own layout of
* the table costs.
*/
function measureTableGrid(rows, maxColumns = Number.MAX_SAFE_INTEGER) {
	let spans = [];
	let nextEndRow = Infinity;
	let columns = 0;
	let conflict = false;
	for (let rowIndex = 0; rowIndex < rows.length; ++rowIndex) {
		if (rowIndex >= nextEndRow) {
			spans = spans.filter((span) => span.endRow > rowIndex);
			nextEndRow = spans.reduce((min, span) => Math.min(min, span.endRow), Infinity);
		}
		const started = [];
		let spanIndex = 0;
		let column = 0;
		for (const cell of rows[rowIndex].cells) {
			for (; spanIndex < spans.length && spans[spanIndex].start <= column; ++spanIndex) column = Math.max(column, spans[spanIndex].end);
			const colspan = tableSpan(cell.colspan);
			const rowspan = tableSpan(cell.rowspan);
			if (!colspan.valid || !rowspan.valid) conflict = true;
			const end = Math.min(Number.MAX_SAFE_INTEGER, column + colspan.value);
			if (spanIndex < spans.length && spans[spanIndex].start < end) conflict = true;
			const endRow = Math.min(rows.length, rowIndex + rowspan.value);
			if (endRow > rowIndex + 1) {
				started.push({
					start: column,
					end,
					endRow
				});
				nextEndRow = Math.min(nextEndRow, endRow);
			}
			columns = Math.max(columns, Math.min(end, maxColumns));
			column = end;
		}
		if (started.length) spans = mergeRowSpans(spans, started);
	}
	return {
		columns,
		conflict
	};
}
//#endregion
//#region src/lib/appManagers/utils/richMessage/toggleChecklist.ts
function updateBlocks(blocks, path, checked) {
	const [index, ...remainder] = path;
	if (index === void 0 || index < 0 || index >= blocks.length) return {
		found: false,
		value: blocks
	};
	const result = updateBlock(blocks[index], remainder, checked);
	if (!result.found || result.value === blocks[index]) return {
		found: result.found,
		value: blocks
	};
	const value = [...blocks];
	value[index] = result.value;
	return {
		found: true,
		value
	};
}
function updateListItem(item, path, checked) {
	if (!path.length) {
		if (!item.pFlags.checkbox) return {
			found: false,
			value: item
		};
		if (!!item.pFlags.checked === checked) return {
			found: true,
			value: item
		};
		return {
			found: true,
			value: {
				...item,
				pFlags: {
					...item.pFlags,
					checked: checked || void 0
				}
			}
		};
	}
	if (item._ !== "pageListItemBlocks" && item._ !== "pageListOrderedItemBlocks") return {
		found: false,
		value: item
	};
	const result = updateBlocks(item.blocks, path, checked);
	if (!result.found || result.value === item.blocks) return {
		found: result.found,
		value: item
	};
	return {
		found: true,
		value: {
			...item,
			blocks: result.value
		}
	};
}
function updateList(block, path, checked) {
	const [index, ...remainder] = path;
	if (index === void 0 || index < 0 || index >= block.items.length) return {
		found: false,
		value: block
	};
	const result = updateListItem(block.items[index], remainder, checked);
	if (!result.found || result.value === block.items[index]) return {
		found: result.found,
		value: block
	};
	const items = [...block.items];
	items[index] = result.value;
	return {
		found: true,
		value: {
			...block,
			items
		}
	};
}
function updateBlock(block, path, checked) {
	switch (block._) {
		case "pageBlockList":
		case "pageBlockOrderedList": return updateList(block, path, checked);
		case "pageBlockDetails":
		case "pageBlockBlockquoteBlocks": {
			const result = updateBlocks(block.blocks, path, checked);
			if (!result.found || result.value === block.blocks) return {
				found: result.found,
				value: block
			};
			return {
				found: true,
				value: {
					...block,
					blocks: result.value
				}
			};
		}
		case "pageBlockCover": {
			const result = updateBlock(block.cover, path, checked);
			if (!result.found || result.value === block.cover) return {
				found: result.found,
				value: block
			};
			return {
				found: true,
				value: {
					...block,
					cover: result.value
				}
			};
		}
		default: return {
			found: false,
			value: block
		};
	}
}
/**
* Applies the checklist path format used by official clients:
* root block index, then child block/list-item indices. A cover is transparent
* and therefore does not consume an extra path component.
*
* Returns `undefined` for a stale/invalid path. For an idempotent update the
* original RichMessage instance is returned.
*/
function toggleRichMessageChecklist(richMessage, path, checked) {
	if (!path.length) return;
	const result = updateBlocks(richMessage.blocks, path, checked);
	if (!result.found) return;
	if (result.value === richMessage.blocks) return richMessage;
	return {
		...richMessage,
		blocks: result.value
	};
}
//#endregion
//#region src/lib/appManagers/utils/messages/canReplyToEphemeralMessage.ts
/**
* A reply to an ephemeral message goes privately to the bot that sent it, so only an incoming one
* from a user can be answered — not our own, and not one the chat itself sent, as a delivered
* welcome message is (desktop's `CanReplyToEphemeral` → `botForSending`).
*/
function canReplyToEphemeralMessage(message) {
	return !message.pFlags.out && !!message.fromId?.isUser();
}
//#endregion
//#region src/helpers/object/defineNotNumerableProperties.ts
function defineNotNumerableProperties(obj, names) {
	const props = {
		writable: true,
		configurable: true
	};
	const out = {};
	names.forEach((name) => {
		if (!obj.hasOwnProperty(name)) out[name] = props;
	});
	Object.defineProperties(obj, out);
}
//#endregion
//#region src/lib/appManagers/utils/stickers/isStickerSetAdded.ts
/**
* An archived set keeps its `installed_date` — it counts as added only while it is out of the archive.
*/
function isStickerSetAdded(set) {
	return !!set.installed_date && !set.pFlags.archived;
}
//#endregion
//#region src/config/emojiSkinTone.ts
var EmojiSkinToneTemplates = {
	"1f385": "🎅🏻",
	"1f3c2": "🏂🏻",
	"1f3c3": "🏃🏻",
	"1f3c3-200d-2640": "🏃🏻‍♀",
	"1f3c3-200d-2640-200d-27a1": "🏃🏻‍♀‍➡",
	"1f3c3-200d-2642": "🏃🏻‍♂",
	"1f3c3-200d-2642-200d-27a1": "🏃🏻‍♂‍➡",
	"1f3c3-200d-27a1": "🏃🏻‍➡",
	"1f3c4": "🏄🏻",
	"1f3c4-200d-2640": "🏄🏻‍♀",
	"1f3c4-200d-2642": "🏄🏻‍♂",
	"1f3c7": "🏇🏻",
	"1f3ca": "🏊🏻",
	"1f3ca-200d-2640": "🏊🏻‍♀",
	"1f3ca-200d-2642": "🏊🏻‍♂",
	"1f3cb": "🏋🏻",
	"1f3cb-200d-2640": "🏋🏻‍♀",
	"1f3cb-200d-2642": "🏋🏻‍♂",
	"1f3cc": "🏌🏻",
	"1f3cc-200d-2640": "🏌🏻‍♀",
	"1f3cc-200d-2642": "🏌🏻‍♂",
	"1f442": "👂🏻",
	"1f443": "👃🏻",
	"1f446": "👆🏻",
	"1f447": "👇🏻",
	"1f448": "👈🏻",
	"1f449": "👉🏻",
	"1f44a": "👊🏻",
	"1f44b": "👋🏻",
	"1f44c": "👌🏻",
	"1f44d": "👍🏻",
	"1f44e": "👎🏻",
	"1f44f": "👏🏻",
	"1f450": "👐🏻",
	"1f466": "👦🏻",
	"1f467": "👧🏻",
	"1f468": "👨🏻",
	"1f468-200d-1f33e": "👨🏻‍🌾",
	"1f468-200d-1f373": "👨🏻‍🍳",
	"1f468-200d-1f37c": "👨🏻‍🍼",
	"1f468-200d-1f393": "👨🏻‍🎓",
	"1f468-200d-1f3a4": "👨🏻‍🎤",
	"1f468-200d-1f3a8": "👨🏻‍🎨",
	"1f468-200d-1f3eb": "👨🏻‍🏫",
	"1f468-200d-1f3ed": "👨🏻‍🏭",
	"1f468-200d-1f4bb": "👨🏻‍💻",
	"1f468-200d-1f4bc": "👨🏻‍💼",
	"1f468-200d-1f527": "👨🏻‍🔧",
	"1f468-200d-1f52c": "👨🏻‍🔬",
	"1f468-200d-1f680": "👨🏻‍🚀",
	"1f468-200d-1f692": "👨🏻‍🚒",
	"1f468-200d-1f9af": "👨🏻‍🦯",
	"1f468-200d-1f9af-200d-27a1": "👨🏻‍🦯‍➡",
	"1f468-200d-1f9b0": "👨🏻‍🦰",
	"1f468-200d-1f9b1": "👨🏻‍🦱",
	"1f468-200d-1f9b2": "👨🏻‍🦲",
	"1f468-200d-1f9b3": "👨🏻‍🦳",
	"1f468-200d-1f9bc": "👨🏻‍🦼",
	"1f468-200d-1f9bc-200d-27a1": "👨🏻‍🦼‍➡",
	"1f468-200d-1f9bd": "👨🏻‍🦽",
	"1f468-200d-1f9bd-200d-27a1": "👨🏻‍🦽‍➡",
	"1f468-200d-2695": "👨🏻‍⚕",
	"1f468-200d-2696": "👨🏻‍⚖",
	"1f468-200d-2708": "👨🏻‍✈",
	"1f468-200d-2764-200d-1f468": "👨🏻‍❤‍👨🏻",
	"1f468-200d-2764-200d-1f48b-200d-1f468": "👨🏻‍❤‍💋‍👨🏻",
	"1f469": "👩🏻",
	"1f469-200d-1f33e": "👩🏻‍🌾",
	"1f469-200d-1f373": "👩🏻‍🍳",
	"1f469-200d-1f37c": "👩🏻‍🍼",
	"1f469-200d-1f393": "👩🏻‍🎓",
	"1f469-200d-1f3a4": "👩🏻‍🎤",
	"1f469-200d-1f3a8": "👩🏻‍🎨",
	"1f469-200d-1f3eb": "👩🏻‍🏫",
	"1f469-200d-1f3ed": "👩🏻‍🏭",
	"1f469-200d-1f4bb": "👩🏻‍💻",
	"1f469-200d-1f4bc": "👩🏻‍💼",
	"1f469-200d-1f527": "👩🏻‍🔧",
	"1f469-200d-1f52c": "👩🏻‍🔬",
	"1f469-200d-1f680": "👩🏻‍🚀",
	"1f469-200d-1f692": "👩🏻‍🚒",
	"1f469-200d-1f9af": "👩🏻‍🦯",
	"1f469-200d-1f9af-200d-27a1": "👩🏻‍🦯‍➡",
	"1f469-200d-1f9b0": "👩🏻‍🦰",
	"1f469-200d-1f9b1": "👩🏻‍🦱",
	"1f469-200d-1f9b2": "👩🏻‍🦲",
	"1f469-200d-1f9b3": "👩🏻‍🦳",
	"1f469-200d-1f9bc": "👩🏻‍🦼",
	"1f469-200d-1f9bc-200d-27a1": "👩🏻‍🦼‍➡",
	"1f469-200d-1f9bd": "👩🏻‍🦽",
	"1f469-200d-1f9bd-200d-27a1": "👩🏻‍🦽‍➡",
	"1f469-200d-2695": "👩🏻‍⚕",
	"1f469-200d-2696": "👩🏻‍⚖",
	"1f469-200d-2708": "👩🏻‍✈",
	"1f469-200d-2764-200d-1f468": "👩🏻‍❤‍👨🏻",
	"1f469-200d-2764-200d-1f469": "👩🏻‍❤‍👩🏻",
	"1f469-200d-2764-200d-1f48b-200d-1f468": "👩🏻‍❤‍💋‍👨🏻",
	"1f469-200d-2764-200d-1f48b-200d-1f469": "👩🏻‍❤‍💋‍👩🏻",
	"1f46b": "👫🏻",
	"1f46c": "👬🏻",
	"1f46d": "👭🏻",
	"1f46e": "👮🏻",
	"1f46e-200d-2640": "👮🏻‍♀",
	"1f46e-200d-2642": "👮🏻‍♂",
	"1f470": "👰🏻",
	"1f470-200d-2640": "👰🏻‍♀",
	"1f470-200d-2642": "👰🏻‍♂",
	"1f471": "👱🏻",
	"1f471-200d-2640": "👱🏻‍♀",
	"1f471-200d-2642": "👱🏻‍♂",
	"1f472": "👲🏻",
	"1f473": "👳🏻",
	"1f473-200d-2640": "👳🏻‍♀",
	"1f473-200d-2642": "👳🏻‍♂",
	"1f474": "👴🏻",
	"1f475": "👵🏻",
	"1f476": "👶🏻",
	"1f477": "👷🏻",
	"1f477-200d-2640": "👷🏻‍♀",
	"1f477-200d-2642": "👷🏻‍♂",
	"1f478": "👸🏻",
	"1f47c": "👼🏻",
	"1f481": "💁🏻",
	"1f481-200d-2640": "💁🏻‍♀",
	"1f481-200d-2642": "💁🏻‍♂",
	"1f482": "💂🏻",
	"1f482-200d-2640": "💂🏻‍♀",
	"1f482-200d-2642": "💂🏻‍♂",
	"1f483": "💃🏻",
	"1f485": "💅🏻",
	"1f486": "💆🏻",
	"1f486-200d-2640": "💆🏻‍♀",
	"1f486-200d-2642": "💆🏻‍♂",
	"1f487": "💇🏻",
	"1f487-200d-2640": "💇🏻‍♀",
	"1f487-200d-2642": "💇🏻‍♂",
	"1f48f": "💏🏻",
	"1f491": "💑🏻",
	"1f4aa": "💪🏻",
	"1f574": "🕴🏻",
	"1f575": "🕵🏻",
	"1f575-200d-2640": "🕵🏻‍♀",
	"1f575-200d-2642": "🕵🏻‍♂",
	"1f57a": "🕺🏻",
	"1f590": "🖐🏻",
	"1f595": "🖕🏻",
	"1f596": "🖖🏻",
	"1f645": "🙅🏻",
	"1f645-200d-2640": "🙅🏻‍♀",
	"1f645-200d-2642": "🙅🏻‍♂",
	"1f646": "🙆🏻",
	"1f646-200d-2640": "🙆🏻‍♀",
	"1f646-200d-2642": "🙆🏻‍♂",
	"1f647": "🙇🏻",
	"1f647-200d-2640": "🙇🏻‍♀",
	"1f647-200d-2642": "🙇🏻‍♂",
	"1f64b": "🙋🏻",
	"1f64b-200d-2640": "🙋🏻‍♀",
	"1f64b-200d-2642": "🙋🏻‍♂",
	"1f64c": "🙌🏻",
	"1f64d": "🙍🏻",
	"1f64d-200d-2640": "🙍🏻‍♀",
	"1f64d-200d-2642": "🙍🏻‍♂",
	"1f64e": "🙎🏻",
	"1f64e-200d-2640": "🙎🏻‍♀",
	"1f64e-200d-2642": "🙎🏻‍♂",
	"1f64f": "🙏🏻",
	"1f6a3": "🚣🏻",
	"1f6a3-200d-2640": "🚣🏻‍♀",
	"1f6a3-200d-2642": "🚣🏻‍♂",
	"1f6b4": "🚴🏻",
	"1f6b4-200d-2640": "🚴🏻‍♀",
	"1f6b4-200d-2642": "🚴🏻‍♂",
	"1f6b5": "🚵🏻",
	"1f6b5-200d-2640": "🚵🏻‍♀",
	"1f6b5-200d-2642": "🚵🏻‍♂",
	"1f6b6": "🚶🏻",
	"1f6b6-200d-2640": "🚶🏻‍♀",
	"1f6b6-200d-2640-200d-27a1": "🚶🏻‍♀‍➡",
	"1f6b6-200d-2642": "🚶🏻‍♂",
	"1f6b6-200d-2642-200d-27a1": "🚶🏻‍♂‍➡",
	"1f6b6-200d-27a1": "🚶🏻‍➡",
	"1f6c0": "🛀🏻",
	"1f6cc": "🛌🏻",
	"1f90c": "🤌🏻",
	"1f90f": "🤏🏻",
	"1f918": "🤘🏻",
	"1f919": "🤙🏻",
	"1f91a": "🤚🏻",
	"1f91b": "🤛🏻",
	"1f91c": "🤜🏻",
	"1f91d": "🤝🏻",
	"1f91e": "🤞🏻",
	"1f91f": "🤟🏻",
	"1f926": "🤦🏻",
	"1f926-200d-2640": "🤦🏻‍♀",
	"1f926-200d-2642": "🤦🏻‍♂",
	"1f930": "🤰🏻",
	"1f931": "🤱🏻",
	"1f932": "🤲🏻",
	"1f933": "🤳🏻",
	"1f934": "🤴🏻",
	"1f935": "🤵🏻",
	"1f935-200d-2640": "🤵🏻‍♀",
	"1f935-200d-2642": "🤵🏻‍♂",
	"1f936": "🤶🏻",
	"1f937": "🤷🏻",
	"1f937-200d-2640": "🤷🏻‍♀",
	"1f937-200d-2642": "🤷🏻‍♂",
	"1f938": "🤸🏻",
	"1f938-200d-2640": "🤸🏻‍♀",
	"1f938-200d-2642": "🤸🏻‍♂",
	"1f939": "🤹🏻",
	"1f939-200d-2640": "🤹🏻‍♀",
	"1f939-200d-2642": "🤹🏻‍♂",
	"1f93d": "🤽🏻",
	"1f93d-200d-2640": "🤽🏻‍♀",
	"1f93d-200d-2642": "🤽🏻‍♂",
	"1f93e": "🤾🏻",
	"1f93e-200d-2640": "🤾🏻‍♀",
	"1f93e-200d-2642": "🤾🏻‍♂",
	"1f977": "🥷🏻",
	"1f9b5": "🦵🏻",
	"1f9b6": "🦶🏻",
	"1f9b8": "🦸🏻",
	"1f9b8-200d-2640": "🦸🏻‍♀",
	"1f9b8-200d-2642": "🦸🏻‍♂",
	"1f9b9": "🦹🏻",
	"1f9b9-200d-2640": "🦹🏻‍♀",
	"1f9b9-200d-2642": "🦹🏻‍♂",
	"1f9bb": "🦻🏻",
	"1f9cd": "🧍🏻",
	"1f9cd-200d-2640": "🧍🏻‍♀",
	"1f9cd-200d-2642": "🧍🏻‍♂",
	"1f9ce": "🧎🏻",
	"1f9ce-200d-2640": "🧎🏻‍♀",
	"1f9ce-200d-2640-200d-27a1": "🧎🏻‍♀‍➡",
	"1f9ce-200d-2642": "🧎🏻‍♂",
	"1f9ce-200d-2642-200d-27a1": "🧎🏻‍♂‍➡",
	"1f9ce-200d-27a1": "🧎🏻‍➡",
	"1f9cf": "🧏🏻",
	"1f9cf-200d-2640": "🧏🏻‍♀",
	"1f9cf-200d-2642": "🧏🏻‍♂",
	"1f9d1": "🧑🏻",
	"1f9d1-200d-1f33e": "🧑🏻‍🌾",
	"1f9d1-200d-1f373": "🧑🏻‍🍳",
	"1f9d1-200d-1f37c": "🧑🏻‍🍼",
	"1f9d1-200d-1f384": "🧑🏻‍🎄",
	"1f9d1-200d-1f393": "🧑🏻‍🎓",
	"1f9d1-200d-1f3a4": "🧑🏻‍🎤",
	"1f9d1-200d-1f3a8": "🧑🏻‍🎨",
	"1f9d1-200d-1f3eb": "🧑🏻‍🏫",
	"1f9d1-200d-1f3ed": "🧑🏻‍🏭",
	"1f9d1-200d-1f4bb": "🧑🏻‍💻",
	"1f9d1-200d-1f4bc": "🧑🏻‍💼",
	"1f9d1-200d-1f527": "🧑🏻‍🔧",
	"1f9d1-200d-1f52c": "🧑🏻‍🔬",
	"1f9d1-200d-1f680": "🧑🏻‍🚀",
	"1f9d1-200d-1f692": "🧑🏻‍🚒",
	"1f9d1-200d-1f91d-200d-1f9d1": "🧑🏻‍🤝‍🧑🏻",
	"1f9d1-200d-1f9af": "🧑🏻‍🦯",
	"1f9d1-200d-1f9af-200d-27a1": "🧑🏻‍🦯‍➡",
	"1f9d1-200d-1f9b0": "🧑🏻‍🦰",
	"1f9d1-200d-1f9b1": "🧑🏻‍🦱",
	"1f9d1-200d-1f9b2": "🧑🏻‍🦲",
	"1f9d1-200d-1f9b3": "🧑🏻‍🦳",
	"1f9d1-200d-1f9bc": "🧑🏻‍🦼",
	"1f9d1-200d-1f9bc-200d-27a1": "🧑🏻‍🦼‍➡",
	"1f9d1-200d-1f9bd": "🧑🏻‍🦽",
	"1f9d1-200d-1f9bd-200d-27a1": "🧑🏻‍🦽‍➡",
	"1f9d1-200d-2695": "🧑🏻‍⚕",
	"1f9d1-200d-2696": "🧑🏻‍⚖",
	"1f9d1-200d-2708": "🧑🏻‍✈",
	"1f9d2": "🧒🏻",
	"1f9d3": "🧓🏻",
	"1f9d4": "🧔🏻",
	"1f9d4-200d-2640": "🧔🏻‍♀",
	"1f9d4-200d-2642": "🧔🏻‍♂",
	"1f9d5": "🧕🏻",
	"1f9d6": "🧖🏻",
	"1f9d6-200d-2640": "🧖🏻‍♀",
	"1f9d6-200d-2642": "🧖🏻‍♂",
	"1f9d7": "🧗🏻",
	"1f9d7-200d-2640": "🧗🏻‍♀",
	"1f9d7-200d-2642": "🧗🏻‍♂",
	"1f9d8": "🧘🏻",
	"1f9d8-200d-2640": "🧘🏻‍♀",
	"1f9d8-200d-2642": "🧘🏻‍♂",
	"1f9d9": "🧙🏻",
	"1f9d9-200d-2640": "🧙🏻‍♀",
	"1f9d9-200d-2642": "🧙🏻‍♂",
	"1f9da": "🧚🏻",
	"1f9da-200d-2640": "🧚🏻‍♀",
	"1f9da-200d-2642": "🧚🏻‍♂",
	"1f9db": "🧛🏻",
	"1f9db-200d-2640": "🧛🏻‍♀",
	"1f9db-200d-2642": "🧛🏻‍♂",
	"1f9dc": "🧜🏻",
	"1f9dc-200d-2640": "🧜🏻‍♀",
	"1f9dc-200d-2642": "🧜🏻‍♂",
	"1f9dd": "🧝🏻",
	"1f9dd-200d-2640": "🧝🏻‍♀",
	"1f9dd-200d-2642": "🧝🏻‍♂",
	"1fac3": "🫃🏻",
	"1fac4": "🫄🏻",
	"1fac5": "🫅🏻",
	"1faf0": "🫰🏻",
	"1faf1": "🫱🏻",
	"1faf2": "🫲🏻",
	"1faf3": "🫳🏻",
	"1faf4": "🫴🏻",
	"1faf5": "🫵🏻",
	"1faf6": "🫶🏻",
	"1faf7": "🫷🏻",
	"1faf8": "🫸🏻",
	"261d": "☝🏻",
	"26f9": "⛹🏻",
	"26f9-200d-2640": "⛹🏻‍♀",
	"26f9-200d-2642": "⛹🏻‍♂",
	"270a": "✊🏻",
	"270b": "✋🏻",
	"270c": "✌🏻",
	"270d": "✍🏻"
};
//#endregion
//#region src/helpers/emojiSkinTone.ts
function getNormalizedKey(emoji) {
	return encodeEmoji(emoji).replace(/-?fe0f/g, "");
}
function getEmojiSkinToneVariants(emoji) {
	const baseKey = getNormalizedKey(removeEmojiTone(emoji));
	const template = EmojiSkinToneTemplates[baseKey];
	if (!template) return;
	const baseEmoji = emojiFromCodePoints(baseKey);
	return {
		baseEmoji,
		variants: [baseEmoji, ...EMOJI_TONE_MODIFIERS.map((tone) => template.split(EMOJI_TONE_MODIFIERS[0]).join(tone))]
	};
}
function getEmojiSkinToneBase(emoji) {
	return getEmojiSkinToneVariants(emoji)?.baseEmoji || emoji;
}
function getEmojiSkinTone(emoji) {
	const tones = getEmojiToneIndexes(emoji);
	if (!tones.length || !tones.every((tone) => tone === tones[0])) return 0;
	return getEmojiToneIndex(emoji);
}
//#endregion
//#region src/helpers/createSerializedQueue.ts
function createSerializedQueue() {
	let tail = Promise.resolve();
	return { enqueue(operation) {
		const run = tail.then(operation);
		tail = run.then(() => void 0, () => void 0);
		return run;
	} };
}
//#endregion
//#region src/lib/appManagers/utils/messages/isForceReplyMarkup.ts
/**
* Whether a markup asks for a reply. Layer 229 moved the force-reply bit onto the keyboard markups
* themselves, so a `replyKeyboardMarkup` / `replyInlineMarkup` carrying `force_reply` asks for one
* exactly like the standalone `replyKeyboardForceReply` does.
*/
function isForceReplyMarkup(replyMarkup) {
	return replyMarkup?._ === "replyKeyboardForceReply" || (replyMarkup?._ === "replyKeyboardMarkup" || replyMarkup?._ === "replyInlineMarkup") && !!replyMarkup.pFlags.force_reply;
}
//#endregion
//#region src/lib/calls/utils.ts
function toTelegramSource(source) {
	return source << 0;
}
function fromTelegramSource(source) {
	return source >>> 0;
}
var normalizeSsrc = fromTelegramSource;
//#endregion
//#region src/lib/calls/helpers/sameInputGroupCall.ts
/**
* Compare two group-call references only when they prove the same identity.
*
* A canonical call is identified by `id`; its access hash may be refreshed by
* a later join response and is authorization material rather than identity.
* Slugs and invite-message references cannot be safely equated with a canonical
* id until the server resolves them, so cross-constructor comparisons fail.
*/
function sameInputGroupCall(left, right) {
	if (left._ !== right._) return false;
	switch (left._) {
		case "inputGroupCall": return String(left.id) === String(right.id);
		case "inputGroupCallSlug": return left.slug === right.slug;
		case "inputGroupCallInviteMessage": return left.msg_id === right.msg_id;
	}
}
//#endregion
//#region src/lib/calls/constants.ts
var P2P_SIGNALING_MAX_INFLATED_BYTES = 2097152;
var CALL_REQUEST_TIMEOUT = 45e3;
var CALL_WAITING_RING_VOLUME = .3;
var CONFERENCE_CALL_SLUG_REGEXP = /^[A-Za-z0-9_-]{1,64}$/;
var UNMUTE_INTENT_TTL_MS = 15e3;
//#endregion
//#region src/lib/calls/helpers/groupCallUpdates.ts
function getUpdatesList(updates) {
	switch (updates._) {
		case "updates":
		case "updatesCombined": return updates.updates;
		case "updateShort": return [updates.update];
		default: return [];
	}
}
function groupCallToInput(call) {
	return {
		_: "inputGroupCall",
		id: call.id,
		access_hash: call.access_hash
	};
}
function findGroupCallChainUpdate(updates, subChainId, requestedCall, expectedCanonicalInput) {
	const expectedCall = requestedCall._ === "inputGroupCall" ? requestedCall : expectedCanonicalInput;
	if (!expectedCall) return;
	return getUpdatesList(updates).find((update) => {
		return update._ === "updateGroupCallChainBlocks" && update.sub_chain_id === subChainId && sameInputGroupCall(update.call, expectedCall);
	});
}
function getActiveGroupCallUpdates(updates) {
	return getUpdatesList(updates).filter((update) => update._ === "updateGroupCall" && update.call._ === "groupCall");
}
/** Return the only active call identity carried by an Updates container. */
function getInputGroupCallFromUpdates(updates) {
	const calls = getActiveGroupCallUpdates(updates);
	if (!calls.length) return;
	if (new Set(calls.map(({ call }) => String(call.id))).size !== 1) return;
	return groupCallToInput(calls[calls.length - 1].call);
}
/**
* The invite link the server minted for a link-only conference. A call created
* without the join flags carries no chain update, so its `updateGroupCall` is
* matched by id rather than through `findResolvedGroupCallUpdate`.
*/
function getGroupCallInviteLinkFromUpdates(updates, call) {
	return getActiveGroupCallUpdates(updates).find(({ call: found }) => String(found.id) === String(call.id))?.call.invite_link;
}
/**
* Resolve a non-canonical call reference only when the same container links an
* active updateGroupCall to a chain update naming that canonical call. A lone
* updateGroupCall is not proof that it belongs to a requested slug/message.
*/
function findResolvedGroupCallUpdate(updates, requestedCall, expectedCall) {
	const calls = getActiveGroupCallUpdates(updates);
	const expected = requestedCall._ === "inputGroupCall" ? requestedCall : expectedCall;
	if (!expected) return;
	for (let index = calls.length - 1; index >= 0; --index) if (sameInputGroupCall(groupCallToInput(calls[index].call), expected)) return calls[index];
}
//#endregion
//#region src/lib/appManagers/utils/messages/getPeerThreadKey.ts
/** A key of a chat, or of a topic in it (a forum topic, a saved sub-dialog) */
function getPeerThreadKey(peerId, threadId) {
	return peerId + (threadId ? "_" + threadId : "");
}
//#endregion
//#region src/helpers/array/lastItem.ts
function lastItem(arr) {
	return arr[arr.length - 1];
}
//#endregion
//#region src/lib/appManagers/utils/stories/cacheType.ts
var StoriesCacheType = /* @__PURE__ */ function(StoriesCacheType) {
	StoriesCacheType["Stories"] = "stories";
	StoriesCacheType["Pinned"] = "pinnedStories";
	StoriesCacheType["Archive"] = "archiveStories";
	return StoriesCacheType;
}(StoriesCacheType || {});
//#endregion
//#region src/lib/appManagers/utils/stories/insertStory.ts
function insertStory(array, storyItem, onlyId, cacheType, pinnedToTop) {
	const valueToInsert = onlyId ? storyItem.id : storyItem;
	if (cacheType === StoriesCacheType.Pinned) return insertInDescendSortedArray(array, valueToInsert, (_storyItem) => {
		const storyId = onlyId ? _storyItem : _storyItem.id;
		const pinnedIndex = onlyId ? pinnedToTop.get(storyId) : _storyItem.pinnedIndex;
		return pinnedIndex !== void 0 ? 4294967295 - pinnedIndex : storyId;
	});
	else if (cacheType === StoriesCacheType.Archive) return insertInDescendSortedArray(array, valueToInsert, onlyId ? (storyId) => storyId : (storyItem) => storyItem.id);
	else return insertInDescendSortedArray(array, valueToInsert, onlyId ? (storyId) => 4294967295 - storyId : (storyItem) => 4294967295 - storyItem.id);
}
//#endregion
//#region src/lib/appManagers/utils/privacy/privacyType.ts
var PrivacyType = /* @__PURE__ */ function(PrivacyType) {
	PrivacyType[PrivacyType["Everybody"] = 2] = "Everybody";
	PrivacyType[PrivacyType["Contacts"] = 1] = "Contacts";
	PrivacyType[PrivacyType["Nobody"] = 0] = "Nobody";
	return PrivacyType;
}(PrivacyType || {});
//#endregion
//#region src/lib/appManagers/utils/privacy/getPrivacyRulesDetails.ts
function getPrivacyRulesDetails(rules) {
	const types = [];
	const allowPeers = {
		users: [],
		chats: []
	}, disallowPeers = {
		users: [],
		chats: []
	};
	let allowMiniApps = false;
	let disallowMiniApps = false;
	let allowPremium = false;
	rules.forEach((rule) => {
		switch (rule._) {
			case "privacyValueAllowAll":
				types.push(PrivacyType.Everybody);
				break;
			case "privacyValueDisallowAll":
				types.push(PrivacyType.Nobody);
				break;
			case "privacyValueAllowContacts":
				types.push(PrivacyType.Contacts);
				break;
			case "privacyValueAllowChatParticipants":
				allowPeers.chats.push(...rule.chats);
				break;
			case "privacyValueAllowUsers":
				allowPeers.users.push(...rule.users);
				break;
			case "privacyValueDisallowChatParticipants":
				disallowPeers.chats.push(...rule.chats);
				break;
			case "privacyValueDisallowUsers":
				disallowPeers.users.push(...rule.users);
				break;
			case "privacyValueAllowBots":
				allowMiniApps = true;
				break;
			case "privacyValueDisallowBots":
				disallowMiniApps = true;
				break;
			case "privacyValueAllowPremium": allowPremium = true;
		}
	});
	return {
		type: types[0],
		disallowPeers,
		allowPeers,
		allowMiniApps,
		disallowMiniApps,
		allowPremium
	};
}
//#endregion
//#region src/helpers/isSameUserId.ts
function isSameUserId(a, b) {
	return a === void 0 ? b === void 0 : b !== void 0 && String(a) === String(b);
}
//#endregion
//#region src/lib/searchIndex.ts
var SearchIndex = class {
	constructor(options = {}) {
		this.options = options;
		this.fullTexts = /* @__PURE__ */ new Map();
		options.minChars ?? (options.minChars = 0);
	}
	indexObject(id, searchText) {
		if (searchText.trim()) searchText = this.processSearchText(searchText);
		if (!searchText) {
			this.fullTexts.delete(id);
			return false;
		}
		this.fullTexts.set(id, searchText);
	}
	indexObjectArray(id, searchText) {
		return this.indexObject(id, searchText.join(" "));
	}
	_search(query, queryWords = query.split(" ").filter((word) => word.trim()), minChars = this.options.minChars) {
		const newFoundObjs = [];
		const fullTexts = this.fullTexts;
		const queryWordsLength = queryWords.length;
		fullTexts.forEach((fullText, what) => {
			let found = true;
			let foundChars = 0;
			for (let i = 0; i < queryWordsLength; ++i) {
				const word = queryWords[i];
				const idx = fullText.indexOf(word);
				const isLastWord = i === queryWordsLength - 1;
				if (idx === -1 || this.options.fullWords && !isLastWord && fullText[idx + word.length] !== " " || idx !== 0 && fullText[idx - 1] !== " ") {
					found = false;
					break;
				}
				foundChars += word.length;
			}
			if (found) {
				foundChars += queryWordsLength - 1;
				const fullTextLength = fullText.length;
				if (minChars <= foundChars || fullTextLength <= foundChars) newFoundObjs.push({
					fullText,
					fullTextLength,
					what,
					foundChars
				});
			}
		});
		return newFoundObjs;
	}
	search(query, minChars) {
		query = this.processSearchText(query);
		const results = query.split("").map((query) => this._search(query, void 0, minChars));
		const newFoundObjs = flatten(results);
		newFoundObjs.sort((a, b) => {
			return a.fullTextLength - a.foundChars - (b.fullTextLength - b.foundChars) || a.fullTextLength - b.fullTextLength;
		});
		return new Set(newFoundObjs.map((o) => o.what));
	}
	processSearchText(query) {
		return this.options ? processSearchText(query, this.options) : query;
	}
};
//#endregion
//#region src/lib/appManagers/utils/stories/privacyType.ts
function getStoryPrivacyType(story) {
	let privacyType;
	if (story.pFlags.close_friends) privacyType = "close";
	else if (story.pFlags.public) privacyType = "public";
	else if (story.pFlags.selected_contacts) privacyType = "selected";
	else if (story.pFlags.contacts) privacyType = "contacts";
	else if (story.privacy) {
		if (story.privacy.some((rule) => rule._ === "privacyValueAllowCloseFriends")) privacyType = "close";
		else if (story.privacy.some((rule) => rule._ === "privacyValueAllowAll")) privacyType = "public";
		else if (story.privacy.some((privacyRule) => privacyRule._ === "privacyValueAllowContacts")) privacyType = "contacts";
		else privacyType = "selected";
	}
	return privacyType;
}
//#endregion
//#region src/lib/appManagers/utils/stories/storyLink.ts
function makeStoryLink(username, storyId) {
	return `https://t.me/${username}/s/${storyId}`;
}
/**
* Whether a story has a link anyone can open: a public one has it by its peer's username, or, for a peer
* without one, from the server where it exports such links (`stories_export_nopublic_link`; see
* `appStoriesManager.getStoryLink`)
*/
function canCopyStoryLink(story, peer, appConfig) {
	return story?._ === "storyItem" && !!story.pFlags.public && (!!getPeerActiveUsernames(peer)[0] || !!appConfig?.stories_export_nopublic_link);
}
//#endregion
//#region src/helpers/gzipCompress.ts
function gzipCompress(bytes) {
	return gzipSync(bytes);
}
//#endregion
//#region src/lib/richTextProcessor/matchUrl.ts
function matchUrl(text) {
	return !text ? null : text.match(URL_REG_EXP);
}
//#endregion
//#region src/lib/appManagers/utils/messages/filterMessagesByInputFilter.ts
function filterMessagesByInputFilter({ inputFilter, messages, limit, savedReaction }) {
	if (inputFilter === "inputMessagesFilterEmpty" && !savedReaction) return messages.slice(0, limit);
	const foundMsgs = [];
	if (!messages.length) return foundMsgs;
	let filtering = true;
	const neededContents = {}, neededDocTypes = [], neededFlags = [];
	switch (inputFilter) {
		case "inputMessagesFilterPhotos":
			neededContents["messageMediaPhoto"] = true;
			break;
		case "inputMessagesFilterPhotoVideo":
			neededContents["messageMediaPhoto"] = true;
			neededContents["messageMediaDocument"] = true;
			neededDocTypes.push("video");
			break;
		case "inputMessagesFilterVideo":
			neededContents["messageMediaDocument"] = true;
			neededDocTypes.push("video");
			break;
		case "inputMessagesFilterDocument":
			neededContents["messageMediaDocument"] = true;
			neededDocTypes.push(void 0, "photo", "pdf");
			break;
		case "inputMessagesFilterVoice":
			neededContents["messageMediaDocument"] = true;
			neededDocTypes.push("voice");
			break;
		case "inputMessagesFilterRoundVoice":
			neededContents["messageMediaDocument"] = true;
			neededDocTypes.push("round", "voice");
			break;
		case "inputMessagesFilterRoundVideo":
			neededContents["messageMediaDocument"] = true;
			neededDocTypes.push("round");
			break;
		case "inputMessagesFilterMusic":
			neededContents["messageMediaDocument"] = true;
			neededDocTypes.push("audio");
			break;
		case "inputMessagesFilterGif":
			neededContents["messageMediaDocument"] = true;
			neededDocTypes.push("gif");
			break;
		case "inputMessagesFilterUrl":
			neededContents["url"] = true;
			break;
		case "inputMessagesFilterChatPhotos":
			neededContents["avatar"] = true;
			break;
		case "inputMessagesFilterPinned":
			neededFlags.push("pinned");
			break;
		default: filtering = false;
	}
	if (!filtering && !savedReaction?.length) return foundMsgs;
	for (let i = 0, length = messages.length; i < length; ++i) {
		const message = messages[i];
		if (!message) continue;
		let found = !filtering;
		if (neededFlags?.some((flag) => message.pFlags[flag])) found = true;
		else if (message._ === "message") {
			const media = getMessageMediaOrRich(message);
			if (media && neededContents[media._] && !media.ttl_seconds) {
				const doc = media.document;
				if (doc && neededDocTypes.length && !neededDocTypes.includes(doc.type)) continue;
				found = true;
			} else if (neededContents["url"] && message.message) {
				const goodEntities = ["messageEntityTextUrl", "messageEntityUrl"];
				if (message.totalEntities.find((e) => goodEntities.includes(e._)) || matchUrl(message.message)) found = true;
			}
			if (found && savedReaction) {
				const results = message.reactions?.results;
				found = results ? savedReaction.every((reaction) => {
					return results.some((reactionCount) => reactionsEqual(reactionCount.reaction, reaction));
				}) : false;
			}
		} else if (neededContents["avatar"] && message.action && [
			"messageActionChannelEditPhoto",
			"messageActionChatEditPhoto",
			"messageActionChannelEditVideo",
			"messageActionChatEditVideo"
		].includes(message.action._)) found = true;
		if (found && foundMsgs.push(message) >= limit) break;
	}
	return foundMsgs;
}
//#endregion
//#region src/lib/appManagers/utils/dialogs/getFolderPinLimitType.ts
/** Which limit a real folder's pins are held to: the archive's own, or the main list's */
function getFolderPinLimitType(folderId) {
	return folderId === 1 ? "folderPin" : "pin";
}
//#endregion
//#region src/helpers/sliceMessageEntities.ts
function sliceMessageEntities(entities, offset, length) {
	if (!entities?.length) return [];
	const result = [];
	const end = offset + length;
	for (const entity of entities) {
		const entityEnd = entity.offset + entity.length;
		if (entityEnd <= offset || entity.offset >= end) continue;
		const newOffset = Math.max(entity.offset, offset) - offset;
		const newLength = Math.min(entityEnd, end) - Math.max(entity.offset, offset);
		if (newLength > 0) result.push({
			...entity,
			offset: newOffset,
			length: newLength
		});
	}
	return result;
}
//#endregion
//#region src/lib/appManagers/utils/inlineBots/generateQId.ts
function generateQId(queryId, resultId) {
	return queryId + "_" + resultId;
}
//#endregion
//#region src/lib/appManagers/utils/messages/repliesAreEqual.ts
function repliesAreEqual(reply1, reply2) {
	return deepEqual(reply1, reply2);
}
//#endregion
//#region src/lib/appManagers/utils/drafts/draftsAreEqual.ts
function draftsAreEqual(draft1, draft2) {
	return deepEqual(draft1, draft2, ["date", "reply_to"]) && repliesAreEqual(draft1?.reply_to, draft2?.reply_to);
}
//#endregion
//#region src/lib/appManagers/utils/attachMenuBots/getAttachMenuBotIcon.ts
function getAttachMenuBotIcon(attachMenuBot) {
	if (!attachMenuBot) return;
	return attachMenuBot.icons.find((icon) => icon.name === ATTACH_MENU_BOT_ICON_NAME);
}
//#endregion
//#region src/lib/appManagers/utils/messages/forwardKeepsAuthor.ts
/**
* Whether a forward of the message keeps its author and the captions, whatever was chosen: a rich message's author is
* hidden only by one who may (`canDropRichAuthor`: Premium), a widget's never — it always shows which bot it is from
* (widget-sandbox docs/sdk-v1.md §5.11)
*/
function forwardKeepsAuthor(message, canDropRichAuthor) {
	return !canDropRichAuthor && !!message.rich_message || message.media?._ === "messageMediaWidget";
}
//#endregion
//#region src/helpers/string/splitStringByLength.ts
function splitStringByLength(str, maxLength) {
	if (str.length <= maxLength) return [str];
	const delimiter = " ";
	const out = [];
	let current = "";
	const flush = () => {
		if (current.length) {
			out.push(current);
			current = "";
		}
	};
	let lastIndex = 0;
	do {
		let index = str.indexOf(delimiter, lastIndex);
		if (index === -1) index = str.length;
		else index += 1;
		let token = str.slice(lastIndex, index);
		lastIndex = index;
		if (token.length > maxLength) {
			flush();
			while (token.length > maxLength) {
				out.push(token.slice(0, maxLength));
				token = token.slice(maxLength);
			}
		}
		if (current.length + token.length > maxLength) flush();
		current += token;
	} while (lastIndex < str.length);
	flush();
	return out;
}
//#endregion
//#region src/lib/appManagers/utils/messages/makeMessageMediaInput.ts
function makeMessageMediaInput(media) {
	if (!media) return;
	if (media._ === "messageMediaPhoto" && media.photo?._ === "photo") return {
		_: "inputMediaPhoto",
		id: getPhotoInput(media.photo),
		pFlags: { spoiler: media.pFlags.spoiler },
		ttl_seconds: media.ttl_seconds
	};
	if (media._ === "messageMediaDocument" && media.document?._ === "document") return {
		_: "inputMediaDocument",
		id: getDocumentInput(media.document),
		pFlags: { spoiler: media.pFlags.spoiler },
		video_cover: media.video_cover?._ === "photo" ? getPhotoInput(media.video_cover) : void 0,
		ttl_seconds: media.ttl_seconds
	};
	if (media._ === "messageMediaContact") return {
		_: "inputMediaContact",
		user_id: media.user_id,
		phone_number: media.phone_number,
		first_name: media.first_name,
		last_name: media.last_name,
		vcard: media.vcard
	};
}
function makeMessageMediaInputForSuggestedPost(media) {
	if (media && (media._ === "messageMediaPhoto" && media.photo?._ === "photo" || media._ === "messageMediaDocument" && media.document?._ === "document")) return makeMessageMediaInput(media);
}
//#endregion
//#region src/lib/appManagers/utils/bots/resolveEphemeralCommand.ts
function parseCommand(text) {
	const match = /^\/([a-z0-9_]+)(?:@([a-z0-9_]+))?(?=\s|$)/i.exec(text.trim());
	if (!match) return;
	return {
		command: match[1].toLowerCase(),
		username: match[2]?.toLowerCase()
	};
}
function resolveEphemeralCommand(text, candidates) {
	const parsed = parseCommand(text);
	if (!parsed) return { state: "none" };
	const uniqueCandidates = /* @__PURE__ */ new Map();
	for (const candidate of candidates) {
		const existing = uniqueCandidates.get(candidate.botId);
		if (existing) {
			const commands = [...existing.commands || []];
			for (const command of candidate.commands || []) if (!commands.some((current) => current.command.toLowerCase() === command.command.toLowerCase() && !!current.pFlags.ephemeral === !!command.pFlags.ephemeral)) commands.push(command);
			existing.commands = commands;
			existing.username || (existing.username = candidate.username);
			existing.available = existing.available === true || candidate.available === true ? true : existing.available === false || candidate.available === false ? false : void 0;
		} else uniqueCandidates.set(candidate.botId, {
			...candidate,
			commands: candidate.commands?.slice()
		});
	}
	const matching = [...uniqueCandidates.values()].filter(({ commands }) => commands?.some((command) => command.command.toLowerCase() === parsed.command));
	const matchingEphemeral = matching.filter(({ commands }) => commands.some((command) => command.command.toLowerCase() === parsed.command && command.pFlags.ephemeral));
	if (!matchingEphemeral.length) return { state: "none" };
	if (parsed.username) {
		const matchingUsername = matching.filter(({ username }) => username?.toLowerCase() === parsed.username);
		if (matchingUsername.length > 1) return { state: "ambiguous" };
		const candidate = matchingUsername[0];
		if (candidate) {
			if (!candidate.commands.some((command) => command.command.toLowerCase() === parsed.command && command.pFlags.ephemeral)) return { state: "none" };
			return candidate.available === false ? { state: "unavailable" } : {
				state: "resolved",
				receiverId: candidate.botId
			};
		}
		return matchingEphemeral.some(({ username }) => !username) ? { state: "unavailable" } : { state: "none" };
	}
	if (matching.length > 1) return { state: "ambiguous" };
	const candidate = matchingEphemeral[0];
	return candidate.available === false ? { state: "unavailable" } : {
		state: "resolved",
		receiverId: candidate.botId
	};
}
//#endregion
//#region src/lib/appManagers/utils/messages/getPinnedMessagesKey.ts
/**
* Storage key of a peer's pinned-message list. Thread-scoped in a forum topic
* (or a saved sub-dialog), where the pinned list is per-thread rather than
* per-peer. Shared by the manager's pin cache and by the UI's
* `hiddenPinnedMessages` state so both sides key the same way.
*/
function getPinnedMessagesKey(peerId, threadId) {
	return getPeerThreadKey(peerId, threadId);
}
//#endregion
//#region src/lib/appManagers/utils/dialogs/getDialogKey.ts
function getDialogKey(dialog) {
	let key;
	if (isDialog(dialog)) key = dialog.peerId;
	else if (isForumTopic(dialog)) key = dialog.id;
	else if (isSavedDialog(dialog)) key = dialog.savedPeerId;
	return key;
}
//#endregion
//#region src/lib/appManagers/utils/communities/isCommunity.ts
function isCommunity(chat) {
	return chat?._ === "community" || chat?._ === "communityForbidden";
}
//#endregion
//#region src/lib/appManagers/utils/peers/getChatMigratedTo.ts
/** the channel a basic group has been upgraded to, once the group itself is deactivated */
function getChatMigratedTo(chat) {
	const migratedTo = chat?.migrated_to;
	if (migratedTo && chat.pFlags.deactivated) return getPeerId(migratedTo);
}
//#endregion
export { tableSpan as $, getFwdFromName as $t, getGroupCallInviteLinkFromUpdates as A, compareUint8Arrays as At, fromTelegramSource as B, createEmojiReaction as Bt, PrivacyType as C, inputRichText as Ct, getPeerThreadKey as D, forgetSettledRequest as Dt, lastItem as E, isMentionUnread as Et, CALL_WAITING_RING_VOLUME as F, trimRichText as Ft, getEmojiSkinTone as G, POLL_VOTE_RESTRICTION_EXPIRY as Gt, toTelegramSource as H, CHAT_LEGACY_ADMIN_RIGHTS as Ht, CONFERENCE_CALL_SLUG_REGEXP as I, cleanSearchText as It, isStickerSetAdded as J, getPollVoteRestrictionPeerId as Jt, getEmojiSkinToneBase as K, getActivePollVoteRestriction as Kt, P2P_SIGNALING_MAX_INFLATED_BYTES as L, clearBadCharsAndTrim as Lt, getUpdatesList as M, insertInDescendSortedArray as Mt, groupCallToInput as N, getGroupedText as Nt, findGroupCallChainUpdate as O, getMainGroupedMessage as Ot, CALL_REQUEST_TIMEOUT as P, parseMarkdown as Pt, measureTableGrid as Q, parsePollVoteRestrictionError as Qt, UNMUTE_INTENT_TTL_MS as R, reactionsEqual as Rt, getPrivacyRulesDetails as S, inputPageBlock as St, StoriesCacheType as T, getReadMaxIdIfUnread as Tt, isForceReplyMarkup as U, isAnchoredEphemeralMessage as Ut, normalizeSsrc as V, canEditAdmin as Vt, createSerializedQueue as W, isEphemeralMessage as Wt, canReplyToEphemeralMessage as X, isPollVoteRestrictionActive as Xt, defineNotNumerableProperties as Y, isExpiringPollVoteRestriction as Yt, toggleRichMessageChecklist as Z, isRegularPollMessage as Zt, canCopyStoryLink as _, isForumTopic as _n, starsTransactionProviders as _t, resolveEphemeralCommand as a, participantAdminPredicates as an, getUnreadReactions as at, SearchIndex as b, inferRichMessageNoAutolink as bt, forwardKeepsAuthor as c, getDialogIndex as cn, applyChatParticipantRank as ct, generateQId as d, isSendRight as dn, cleanMemberTag as dt, getDocumentInput as en, endSuspiciousPeerSettings as et, sliceMessageEntities as f, canSendToUser as fn, getMemberTagRole as ft, gzipCompress as g, isDialog as gn, getStarsTransactionPresentation as gt, matchUrl as h, filterUnique as hn, getStarsTransactionMessagePeerId as ht, getPinnedMessagesKey as i, isParticipantCreator as in, toFriendlyTonAddress as it, getInputGroupCallFromUpdates as j, getMessageThreadId as jt, findResolvedGroupCallUpdate as k, getFullDate as kt, getAttachMenuBotIcon as l, getDialogIndexKey as ln, canEditMemberTag as lt, filterMessagesByInputFilter as m, getParticipantPeerId as mn, getStarsTransactionFullAmount as mt, isCommunity as n, LIMIT_DEFAULTS as nn, formatTonAddress as nt, makeMessageMediaInputForSuggestedPost as o, namedPromises as on, makeFullMid as ot, getFolderPinLimitType as p, getParticipantsCount as pn, removeMemberTagEmoji as pt, getEmojiSkinToneVariants as q, getPollVotePrecheckRestriction as qt, getDialogKey as r, isParticipantAdmin as rn, parseTonAddress as rt, splitStringByLength as s, ConnectionStatus as sn, splitFullMid as st, getChatMigratedTo as t, getDocumentURL as tn, isSuspiciousPeer as tt, draftsAreEqual as u, hasRights as un, canHaveMemberTags as ut, makeStoryLink as v, isMonoforumDialog as vn, putInOrder as vt, insertStory as w, inputStarGiftEquals as wt, isSameUserId as x, getPhotoInput as xt, getStoryPrivacyType as y, isSavedDialog as yn, setBooleanFlag as yt, sameInputGroupCall as z, availableReactionToReaction as zt };
