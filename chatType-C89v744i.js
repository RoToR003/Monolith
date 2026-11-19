//# allFunctionsCalledOnLoad
import { Ut as isAnchoredEphemeralMessage, Wt as isEphemeralMessage } from "./getChatMigratedTo-ChhMNXuu.js";
//#region src/components/chat/chatType.ts
var ChatType = /* @__PURE__ */ function(ChatType) {
	ChatType["Chat"] = "chat";
	ChatType["Pinned"] = "pinned";
	ChatType["Discussion"] = "discussion";
	ChatType["Scheduled"] = "scheduled";
	ChatType["Stories"] = "stories";
	ChatType["Saved"] = "saved";
	ChatType["Search"] = "search";
	ChatType["Static"] = "static";
	ChatType["Logs"] = "logs";
	ChatType["Welcome"] = "welcome";
	return ChatType;
}({});
/**
* Whether a message a chat of this type shows is of the chat's history as the server keeps it (tdesktop's
* `isRegular`): not an admin log's entry, a static preview, a scheduled, welcome or ephemeral message — one standing in
* for a message of the history too, which shows what is not that message's — which nothing can be asked through or
* kept for
*/
function isHistoryMessage(type, message) {
	return !getNonHistoryStore(type, message);
}
/** What a message that is not of the chat's history (isHistoryMessage) is of instead: its ids are that store's own */
function getNonHistoryStore(type, message) {
	if (type === "scheduled" || message.pFlags.is_scheduled) return "scheduled";
	if (type === "logs" || type === "static" || type === "welcome") return type;
	if (isEphemeralMessage(message) || isAnchoredEphemeralMessage(message)) return "ephemeral";
}
//#endregion
export { getNonHistoryStore as n, isHistoryMessage as r, ChatType as t };
