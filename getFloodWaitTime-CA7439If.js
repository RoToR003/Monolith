//# allFunctionsCalledOnLoad
//#region src/lib/appManagers/utils/getFloodWaitTime.ts
/**
* Extracts the flood wait time from an API error. Will return false in the case the match is 0 or the wait time is not a valid number.
*/
function getFloodWaitTime(error) {
	const match = typeof error?.type === "string" ? error.type.match(/^FLOOD_WAIT_(\d+)/) : null;
	const waitTime = match ? parseInt(match[1]) || 0 : 0;
	return waitTime ? {
		hasWaitTime: true,
		waitTime
	} : { hasWaitTime: false };
}
//#endregion
export { getFloodWaitTime as t };
