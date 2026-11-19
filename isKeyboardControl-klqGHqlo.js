//# allFunctionsCalledOnLoad
//#region src/helpers/dom/isTargetAnInput.ts
function isTargetAnInput(target) {
	return !!target && (target.tagName === "TEXTAREA" || target.tagName === "INPUT" && ![
		"checkbox",
		"radio",
		"button",
		"submit",
		"reset",
		"file",
		"range",
		"color"
	].includes(target.type) || target.isContentEditable);
}
//#endregion
//#region src/helpers/dom/isKeyboardControl.ts
/** Controls whose keys must not be redirected into a chat or story composer. */
function isKeyboardControl(element) {
	return !!element.closest("button, a[href], select, input[type=\"checkbox\"], input[type=\"radio\"], input[type=\"range\"], [role=\"button\"], [role=\"link\"], [role=\"tab\"], [role=\"menuitem\"], [role=\"menuitemcheckbox\"], [role=\"menuitemradio\"], [role=\"checkbox\"], [role=\"radio\"], [role=\"slider\"]");
}
/** Keys a composer that takes what is typed anywhere (a chat's, a story's) leaves where they are: a
* bare Control or Meta, which begins a shortcut, and copying (Ctrl+C, Cmd+C, and Ctrl+Insert on
* Windows and Linux), which copies what is selected on the page — focusing the field first would
* drop that selection. */
function keepsKeyFromComposer(event) {
	return event.key === "Control" || event.key === "Meta" || event.code === "KeyC" && (event.ctrlKey || event.metaKey) || event.key === "Insert" && event.ctrlKey;
}
function shouldPreserveKeyboardFocus(event) {
	const target = event.target;
	return event.defaultPrevented || event.isComposing || [
		"Tab",
		"Shift",
		"Control",
		"Alt",
		"Meta",
		"CapsLock",
		"ContextMenu"
	].includes(event.key) || /^F\d+$/.test(event.key) || isKeyboardControl(target) || !event.altKey && !event.ctrlKey && !event.metaKey && [
		"ArrowUp",
		"ArrowDown",
		"PageUp",
		"PageDown",
		"Home",
		"End",
		" "
	].includes(event.key) && !isTargetAnInput(target) && target.matches(".scrollable, [role=\"region\"]") && target.tabIndex >= 0;
}
//#endregion
export { isTargetAnInput as i, keepsKeyFromComposer as n, shouldPreserveKeyboardFocus as r, isKeyboardControl as t };
