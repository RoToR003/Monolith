//# allFunctionsCalledOnLoad
import { C as VERIFICATION_CODES_BOT_ID } from "./rootScope-CZS0lmz8.js";
import { B as formatTime, R as formatFullSentTimeRaw } from "./index-B7axFZql.js";
import { U as getPeerId } from "./canPollPeerStories-D3HoBvLX.js";
import { a as wrapSlowModeLeftDuration } from "./wrapDuration-BQgz9hDF.js";
import { t as eachSecond } from "./eachSecond-BNMFzIIa.js";
//#region src/components/chat/utils.ts
function isMessageForVerificationBot(message) {
	return (message.fromId === 489e3 || getPeerId(message.peer_id) === 489e3) && message._ === "message";
}
function isVerificationBot(peerId) {
	return peerId === VERIFICATION_CODES_BOT_ID;
}
function isGuestChatMessage(message) {
	return message._ === "message" && !!message.guestchat_via_from;
}
function getGuestChatViaFromId(message) {
	return message._ === "message" && message.guestchat_via_from ? getPeerId(message.guestchat_via_from) : void 0;
}
function getMid(message) {
	if (message._ === "channelAdminLogEvent") return +message.id;
	return message.mid;
}
function isMessage(message) {
	return message._ === "message" || message._ === "messageService";
}
function makeTime(date, includeDate) {
	return includeDate ? formatFullSentTimeRaw(date.getTime() / 1e3 | 0, { combined: true }).dateEl : formatTime(date);
}
function generateTail() {
	const span = document.createElement("span");
	span.classList.add("bubble-tail");
	return span;
}
function generateGradient() {
	const div = document.createElement("div");
	div.classList.add("bubble-gradient");
	return div;
}
function linkColor(el) {
	if (typeof el === "string") {
		const span = document.createElement("span");
		span.textContent = el;
		span.classList.add("link-color");
		return span;
	}
	if (el instanceof HTMLElement) el.classList.add("link-color");
	return el;
}
var allowedDocumentTypesAsGroup = [
	"audio",
	"photo",
	"pdf"
];
var documentAsMediaTypes = ["gif", "video"];
var canUploadAsWhenEditing = ({ asWhat, message }) => {
	if (!message || !message.media) return true;
	if (!!!message.grouped_id) return true;
	return getMediaTypeForMessage(message) === asWhat;
};
var getMediaTypeForMessage = (message) => {
	if (!message || !message.media) return null;
	if (message.media._ === "messageMediaDocument") {
		if (message.media.document?._ !== "document") return null;
		if (documentAsMediaTypes.includes(message.media.document.type)) return "media";
		if (message.media.document.type && !allowedDocumentTypesAsGroup.includes(message.media.document.type)) return null;
		return "document";
	}
	if (message.media._ === "messageMediaPhoto") return "media";
	return null;
};
var shouldUseReplaceMediaIcon = (isEditing, message) => {
	return isEditing && getMediaTypeForMessage(message) !== null;
};
function slowModeTimer(getLeftDuration) {
	const s = document.createElement("span");
	return {
		element: s,
		dispose: eachSecond(() => {
			const leftDuration = getLeftDuration();
			s.replaceChildren(wrapSlowModeLeftDuration(leftDuration));
			if (!leftDuration) close();
		}, true)
	};
}
//#endregion
export { getMediaTypeForMessage as a, isMessage as c, linkColor as d, makeTime as f, getGuestChatViaFromId as i, isMessageForVerificationBot as l, slowModeTimer as m, generateGradient as n, getMid as o, shouldUseReplaceMediaIcon as p, generateTail as r, isGuestChatMessage as s, canUploadAsWhenEditing as t, isVerificationBot as u };
