//# allFunctionsCalledOnLoad
//#region src/lib/appManagers/utils/docs/isPlayableDocument.ts
/**
* A document its row plays (an audio element with the player's controls) rather than one it
* downloads.
*/
function isPlayableDocument(doc) {
	return doc?.type === "audio" || doc?.type === "voice" || doc?.type === "round";
}
//#endregion
export { isPlayableDocument as t };
