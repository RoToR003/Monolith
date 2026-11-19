//# allFunctionsCalledOnLoad
//#region src/environment/conferenceCallSupport.ts
var IS_CONFERENCE_CALL_SUPPORTED = typeof globalThis.RTCRtpScriptTransform === "function";
//#endregion
export { IS_CONFERENCE_CALL_SUPPORTED as t };
