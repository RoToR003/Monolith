//# allFunctionsCalledOnLoad
import { t as apiManagerProxy } from "./apiManagerProxy-DmQXvxSF.js";
import { a as i18n } from "./langPack-BmdJGr44.js";
import { n as hotReloadGuard } from "./hotReloadGuardProvider-CHEsZRuG.js";
import { Gt as getPeerTitle, t as confirmationPopup } from "./confirmationPopup-Bz6mK0o-.js";
import { Ht as joinChat } from "./appDialogsManager-CXguiKc3.js";
import { n as toast, r as toastNew } from "./toast-B6VD5M7R.js";
import { t as getCommunityLinkedPeerKind } from "./getCommunityLinkedPeerKind-BYk-BWVI.js";
//#region src/components/communities/openCommunityPendingRequests.ts
function openCommunityPendingRequests(options) {
	const { slider, communityId } = options;
	const history = slider.getHistory();
	for (let i = history.length - 1; i >= 0; --i) {
		const existingTab = history[i];
		if (existingTab instanceof hotReloadGuard.tabs.AppCommunityPendingRequestsTab && existingTab.payload.communityId === communityId) return slider.closeTabsUntilTab(existingTab);
	}
	return slider.createTab(hotReloadGuard.tabs.AppCommunityPendingRequestsTab).open({ communityId });
}
//#endregion
//#region src/components/forumTab/communityChatsModel.ts
function shouldCloseCommunityForum(options) {
	const { community } = options;
	if (community?._ === "communityForbidden" || community?._ === "community" && community.pFlags.left) return true;
	if (options.joinedCommunities !== null && !options.joinedCommunities.some((community) => {
		return community.id.toChatId() === options.communityId;
	})) return true;
	return options.hadCommunityDialog && !options.communityDialog;
}
function hasKind(kind) {
	return (item) => item.kind === kind;
}
function getCommunityLinkedChatKind(peer, linked, dialog) {
	return getCommunityLinkedPeerKind(peer, linked, dialog);
}
function getCommunityLinkedChatOpenAction(options) {
	if (options.kind === "hidden" || options.kind === "excluded" || options.kind === "requestable" && options.visible === false) return "hidden";
	if (options.kind === "joined" || options.kind === "viewable" || options.peerType === "user") return "open";
	if (options.kind === "requestable") return "join";
	return "hidden";
}
function getCommunityChatSections(items) {
	const byActivity = (a, b) => {
		return (b.activityDate || 0) - (a.activityDate || 0) || a.order - b.order;
	};
	return {
		joined: items.filter(hasKind("joined")).sort(byActivity),
		viewable: items.filter(hasKind("viewable")).sort(byActivity),
		requestable: items.filter(hasKind("requestable")).sort(byActivity),
		hidden: items.filter(hasKind("hidden")).sort(byActivity)
	};
}
//#endregion
//#region src/components/communities/openCommunityLinkedChat.ts
async function openCommunityLinkedChat(options) {
	const peer = apiManagerProxy.getPeer(options.peerId);
	const kind = "kind" in options ? options.kind : getCommunityLinkedChatKind(peer, options.linked, options.dialog);
	const visible = "kind" in options ? options.visible : options.linked.visible;
	const action = getCommunityLinkedChatOpenAction({
		kind,
		peerType: peer?._,
		visible
	});
	if (action === "open") return options.openPeer ? options.openPeer(options.peerId) : hotReloadGuard.appImManager.setInnerPeer({ peerId: options.peerId });
	if (action === "hidden") {
		toast(i18n(peer?._ === "user" && peer.pFlags.bot ? "Community.HiddenBotInfo" : peer?._ === "channel" && peer.pFlags.broadcast ? "Community.HiddenChannelInfo" : "Community.HiddenChatInfo"));
		return;
	}
	if (options.joiningPeerIds.has(options.peerId)) return;
	options.joiningPeerIds.add(options.peerId);
	try {
		try {
			await confirmationPopup({
				descriptionLangKey: "Community.RequestJoinConfirm",
				descriptionLangArgs: [await getPeerTitle({
					peerId: options.peerId,
					plainText: true
				})],
				button: { langKey: "RequestJoin.Button" }
			});
		} catch {
			return;
		}
		await joinChat({
			peerId: options.peerId,
			managers: options.managers,
			appImManager: hotReloadGuard.appImManager,
			communityId: options.communityId
		});
	} catch (error) {
		console.error("join Community chat error", error);
		toastNew({ langPackKey: "Error.AnError" });
	} finally {
		options.joiningPeerIds.delete(options.peerId);
	}
}
//#endregion
export { openCommunityPendingRequests as a, shouldCloseCommunityForum as i, getCommunityChatSections as n, getCommunityLinkedChatKind as r, openCommunityLinkedChat as t };
