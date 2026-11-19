//# allFunctionsCalledOnLoad
//#region src/lib/appManagers/utils/communities/communityAddMode.ts
function getCommunityAddMode(rights) {
	return rights?.pFlags.manage_linked_peers ? "admins" : "all";
}
function rightsWithCommunityAddMode(mode, current) {
	const pFlags = { ...current?.pFlags };
	if (mode === "admins") pFlags.manage_linked_peers = true;
	else delete pFlags.manage_linked_peers;
	return {
		...current,
		_: "chatBannedRights",
		pFlags,
		until_date: current?.until_date ?? 2147483647
	};
}
//#endregion
export { rightsWithCommunityAddMode as n, getCommunityAddMode as t };
