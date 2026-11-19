//# allFunctionsCalledOnLoad
import { r as useCommunity, u as useJoinedCommunities } from "./apiManagerProxy-DmQXvxSF.js";
import { g as createEffect } from "./solid-9Vxm0VIz.js";
//#region src/components/communities/useCommunityTabGuard.ts
function shouldCloseCommunityTab(options) {
	const { community } = options;
	if (community?._ === "communityForbidden" || community?._ === "community" && community.pFlags.left) return true;
	return options.joinedCommunities !== null && !options.joinedCommunities.some((item) => {
		return item.id.toChatId() === options.communityId;
	});
}
function useCommunityTabGuard(tab, communityId) {
	if (!communityId) return;
	const community = useCommunity(() => communityId);
	const joinedCommunities = useJoinedCommunities();
	let closing = false;
	createEffect(() => {
		if (closing || !shouldCloseCommunityTab({
			communityId,
			community: community(),
			joinedCommunities: joinedCommunities()
		})) return;
		closing = true;
		queueMicrotask(() => tab.close());
	});
}
//#endregion
export { useCommunityTabGuard as t };
