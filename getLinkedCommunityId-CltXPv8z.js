//# allFunctionsCalledOnLoad
//#region src/lib/appManagers/utils/communities/getLinkedCommunityId.ts
/**
* The Community a chat or a user is linked to, if any. Only channels and users can carry
* the link, so anything else resolves to undefined rather than reading a missing field.
*/
function getLinkedCommunityId(peer) {
	return peer?._ === "channel" || peer?._ === "user" ? peer.linked_community_id?.toChatId() : void 0;
}
//#endregion
export { getLinkedCommunityId as t };
