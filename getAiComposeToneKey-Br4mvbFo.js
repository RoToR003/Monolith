//# allFunctionsCalledOnLoad
//#region src/lib/appManagers/utils/aiTones/getAiComposeToneKey.ts
/** How a request names a tone (`toneNameOrId`): a default one by its name, any other by its id */
function getAiComposeToneKey(tone) {
	return tone._ === "aiComposeToneDefault" ? tone.tone : tone.id.toString();
}
//#endregion
export { getAiComposeToneKey as t };
