//# allFunctionsCalledOnLoad
import { n as rootScope } from "./rootScope-CZS0lmz8.js";
import { a as i18n } from "./langPack-BmdJGr44.js";
import { n as deferredPromise } from "./cancellablePromise-bof--dnO.js";
import { t as tsNow } from "./tsNow-DUzGGNNb.js";
import { n as bindManagersToSession } from "./bindManagersToAccount-BL82O9H9.js";
import { t as getMiddleware } from "./middleware-D6HuIqPm.js";
import { l as formatDuration, r as wrapFormattedDuration } from "./wrapDuration-BQgz9hDF.js";
import { t as AppSelectPeers } from "./appSelectPeers-BYpCZNpe.js";
import { t as showLimitPopup } from "./limit-j5BxQxwd.js";
//#region src/components/popups/channelsTooMuch.tsx
/**
* expect chat migration
*/
async function handleChannelsTooMuch(getPromise) {
	try {
		return await getPromise();
	} catch (err) {
		if (err.type === "CHANNELS_TOO_MUCH") {
			await showChannelsTooMuchPopup();
			return handleChannelsTooMuch(getPromise);
		}
		throw err;
	}
}
async function showChannelsTooMuchPopup() {
	const inactiveChannels = await rootScope.managers.appChatsManager.getInactiveChannels();
	const deferred = deferredPromise();
	showLimitPopup("channels", async (popup) => {
		const middlewareHelper = getMiddleware();
		popup.onCloseAfterTimeout(() => {
			deferred.reject();
			middlewareHelper.destroy();
		});
		const datesMap = /* @__PURE__ */ new Map();
		const selector = new AppSelectPeers({
			middleware: middlewareHelper.get(),
			appendTo: popup.body,
			onChange: (value) => {
				if (!value) {
					mainButton.element.replaceChildren(...mainButtonChildren);
					mainButton.callback = mainButtonCallback;
				} else if (value) {
					mainButton.element.replaceChildren(i18n("LeaveCommunities", [value]));
					mainButton.callback = async () => {
						const managers = bindManagersToSession(rootScope.managers);
						const peerIds = selector.getSelected();
						for (const peerId of peerIds) await managers.appChatsManager.leave(peerId.toChatId());
						deferred.resolve();
					};
				}
			},
			onFirstRender: () => {
				popup.show();
				selector.checkForTriggers();
				selector.scrollable.onAdditionalScroll();
			},
			multiSelect: true,
			noSearch: true,
			sectionNameLangPackKey: "LeastActiveCommunities",
			avatarSize: "abitbigger",
			managers: rootScope.managers,
			peerType: [],
			getSubtitleForElement: async (peerId) => {
				const date = datesMap.get(peerId);
				const duration = tsNow(true) - date;
				return i18n("InactiveChannel", [await rootScope.managers.appPeersManager.isBroadcast(peerId) ? i18n("InactiveChannel.Broadcast") : i18n("InactiveChannel.Group"), wrapFormattedDuration(formatDuration(duration, 1))]);
			}
		});
		selector.scrollable.attachBorderListeners();
		const peerIds = inactiveChannels.map(({ id, date }) => {
			const peerId = id.toPeerId(true);
			datesMap.set(peerId, date);
			return peerId;
		});
		selector.renderResultsFunc(peerIds);
		const mainButton = popup.buttons[0];
		const mainButtonChildren = [...mainButton.element.children];
		const mainButtonCallback = mainButton.callback;
	});
	return deferred;
}
//#endregion
export { handleChannelsTooMuch as t };
