//# allFunctionsCalledOnLoad
//#region src/helpers/string/isRTL.ts
var rtlChars = "֑-߿יִ-﷽ﹰ-ﻼ";
var fullRtlDirCheck = new RegExp("^[^A-Za-zÀ-ÖØ-öø-ʸ̀-֐ࠀ-῿Ⰰ-퟿豈-﬜﷾-﷿︐-﹯﻽-￿]*[" + rtlChars + "]");
var justRtlDirCheck = new RegExp("[" + rtlChars + "]");
function isRTL(s, anyChar) {
	return anyChar ? justRtlDirCheck.test(s) : fullRtlDirCheck.test(s);
}
//#endregion
export { isRTL as t };
