//# allFunctionsCalledOnLoad
import { h as REPLIES_PEER_ID, y as SERVICE_PEER_ID } from "./rootScope-CZS0lmz8.js";
import { a as i18n } from "./langPack-BmdJGr44.js";
import { t as numberThousandSplitter } from "./numberThousandSplitter-CGiPNwwW.js";
import { R as formatFullSentTimeRaw } from "./index-B7axFZql.js";
//#region src/components/wrappers/getUserStatusString.ts
function getUserStatusString(user) {
	if (!user) return document.createElement("span");
	let key;
	let args;
	switch (user.id) {
		case REPLIES_PEER_ID.toUserId():
			key = "Peer.RepliesNotifications";
			break;
		case SERVICE_PEER_ID.toUserId():
			key = "Peer.ServiceNotifications";
			break;
		default:
			if (user.pFlags.bot) {
				if (user.bot_active_users === void 0) {
					key = "Bot";
					break;
				}
				key = "BotUsers";
				args = [numberThousandSplitter(user.bot_active_users)];
				break;
			}
			if (user.pFlags.support) {
				key = "SupportStatus";
				break;
			}
			switch (user.status?._) {
				case "userStatusRecently":
					key = "Lately";
					break;
				case "userStatusLastWeek":
					key = "WithinAWeek";
					break;
				case "userStatusLastMonth":
					key = "WithinAMonth";
					break;
				case "userStatusOffline": {
					const date = user.status.was_online;
					const today = /* @__PURE__ */ new Date();
					const diff = (today.getTime() / 1e3 | 0) - date;
					if (diff < 60) key = "Peer.Status.justNow";
					else if (diff < 3600) {
						key = "Peer.Status.minAgo";
						args = [diff / 60 | 0];
					} else if (diff < 86400 && today.getDate() === (/* @__PURE__ */ new Date(date * 1e3)).getDate()) {
						key = "LastSeen.HoursAgo";
						args = [diff / 3600 | 0];
					} else {
						key = "Peer.Status.LastSeenAt";
						const { dateEl, timeEl } = formatFullSentTimeRaw(date);
						args = [dateEl, timeEl];
					}
					break;
				}
				case "userStatusOnline":
					key = "Online";
					break;
				default: key = "ALongTimeAgo";
			}
	}
	return i18n(key, args);
}
//#endregion
export { getUserStatusString as t };
