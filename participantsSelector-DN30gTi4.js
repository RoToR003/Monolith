//# allFunctionsCalledOnLoad
import { x as createRoot } from "./solid-9Vxm0VIz.js";
import { n as deferredPromise } from "./cancellablePromise-bof--dnO.js";
import { t as AppSelectPeers } from "./appSelectPeers-BYpCZNpe.js";
//#region src/components/sidebarRight/tabs/participantsSelector.ts
function createSelectorForTab(options) {
	const deferred = deferredPromise();
	let selector;
	createRoot((dispose) => {
		options.middleware.onClean(() => {
			dispose();
			deferred.resolve();
		});
		selector = new AppSelectPeers({
			...options,
			multiSelect: false,
			headerSearch: true,
			placeholder: "SearchPlaceholder",
			meAsSaved: false,
			onFirstRender: () => {
				deferred.resolve();
			}
		});
	});
	return {
		selector,
		loadPromise: deferred
	};
}
function createSelectorForParticipants(options) {
	return createSelectorForTab({
		...options,
		peerType: ["channelParticipants"]
	});
}
//#endregion
export { createSelectorForTab as n, createSelectorForParticipants as t };
