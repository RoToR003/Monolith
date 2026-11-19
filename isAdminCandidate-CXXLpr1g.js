//# allFunctionsCalledOnLoad
//#region src/lib/appManagers/utils/communities/isAdminCandidate.ts
function isCommunityAdminCandidate(peer) {
	return peer?._ === "user" && !peer.pFlags.bot;
}
//#endregion
export { isCommunityAdminCandidate as t };
