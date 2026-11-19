//# allFunctionsCalledOnLoad
import { d as MESSAGE_ID_OFFSET } from "./rootScope-CZS0lmz8.js";
//#region src/lib/appManagers/utils/messageId/clearMessageId.ts
function clearMessageId(messageId, toServer) {
	if (messageId === void 0) return;
	messageId = +messageId.toFixed(0);
	if (!toServer) return messageId;
	return messageId < 4294967296 ? messageId : messageId % MESSAGE_ID_OFFSET;
}
//#endregion
//#region src/lib/appManagers/utils/messageId/isEphemeralMessageId.ts
function isEphemeralMessageId(messageId) {
	return Number.isInteger(messageId) && messageId >= 8589934592 && messageId < 12884901888;
}
//#endregion
//#region src/lib/appManagers/utils/messageId/getServerMessageId.ts
/**
* * will ignore outgoing offset
*/
function getServerMessageId(messageId) {
	if (isEphemeralMessageId(messageId)) return 0;
	return clearMessageId(messageId, true);
}
//#endregion
export { isEphemeralMessageId as n, clearMessageId as r, getServerMessageId as t };
