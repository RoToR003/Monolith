//# allFunctionsCalledOnLoad
import { a as i18n } from "./langPack-BmdJGr44.js";
import { I as TEXT_LINK_ATTRIBUTE } from "./renderer-L80wjxct.js";
import { n as wrapEmojiText } from "./wrapEmojiText-DT39R5Tj.js";
//#region src/lib/appManagers/utils/chats/getParticipantRank.ts
function getParticipantRank(participant) {
	return participant.rank || (participant._ === "channelParticipantAdmin" || participant._ === "chatParticipantAdmin" ? 2 : participant._ === "chatParticipantCreator" || participant._ === "channelParticipantCreator" ? 1 : void 0);
}
//#endregion
//#region src/components/wrappers/participantRank.ts
function wrapParticipantRank(rank) {
	if (typeof rank === "object") rank = getParticipantRank(rank);
	return typeof rank === "number" ? i18n(!rank ? "Chat.ChannelBadge" : rank === 1 ? "Chat.OwnerBadge" : "ChatAdmin") : wrapEmojiText(rank);
}
function wrapMemberTag({ rank, role }) {
	const span = document.createElement("span");
	if (role && role !== "member") span.classList.add("member-tag-" + role, "member-tag-pill");
	span.append(wrapParticipantRank(rank));
	return span;
}
function makeMemberTagPressable(element) {
	element.classList.add("member-tag-pressable");
	element.setAttribute(TEXT_LINK_ATTRIBUTE, "");
}
//#endregion
//#region src/components/chat/bubbleParts/bubbleNameRank.ts
/**
* The tag at the end of a sender's name line. A member tag (one with a role) explains itself on a
* click; "channel" and a signature do not
*/
function createBubbleNameRank(rank) {
	const span = wrapMemberTag(rank);
	span.classList.add("bubble-name-rank");
	if (rank.role) {
		span.classList.add("is-member-tag");
		makeMemberTagPressable(span);
	}
	return span;
}
//#endregion
export { getParticipantRank as i, makeMemberTagPressable as n, wrapMemberTag as r, createBubbleNameRank as t };
