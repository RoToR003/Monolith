//# allFunctionsCalledOnLoad
//#region src/lib/appManagers/utils/peers/getPeerEditableUsername.ts
function getPeerEditableUsername(peer) {
	if (peer.username) return peer.username;
	return (peer.usernames?.find((username) => username.pFlags.editable))?.username;
}
//#endregion
export { getPeerEditableUsername as t };
