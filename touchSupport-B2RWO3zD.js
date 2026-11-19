//# allFunctionsCalledOnLoad
//#region src/environment/touchSupport.ts
var IS_TOUCH_SUPPORTED = "ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch;
//#endregion
export { IS_TOUCH_SUPPORTED as t };
