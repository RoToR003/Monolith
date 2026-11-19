//# allFunctionsCalledOnLoad
import { g as getPeerActiveUsernames } from "./objectUrlUtils-5x08MNuO.js";
//#region src/lib/appManagers/utils/communities/getCommunityLinkedPeerKind.ts
function isCommunityLinkedPeerJoined(peer, dialog) {
	if (peer?._ === "user") return !!dialog;
	return peer?._ === "channel" && !peer.pFlags.left;
}
function getCommunityLinkedPeerKind(peer, linked, dialog) {
	if (isCommunityLinkedPeerJoined(peer, dialog)) return "joined";
	if (peer?._ === "user") {
		if (peer.pFlags.bot) return "viewable";
		if (linked.pFlags.can_view_history) return "viewable";
		if (linked.visible === false) return !getPeerActiveUsernames(peer).length ? "hidden" : "excluded";
		return "requestable";
	}
	if (linked.pFlags.can_view_history) return "viewable";
	if (linked.visible === false) return !getPeerActiveUsernames(peer).length ? "hidden" : "excluded";
	return "requestable";
}
//#endregion
export { isCommunityLinkedPeerJoined as n, getCommunityLinkedPeerKind as t };
