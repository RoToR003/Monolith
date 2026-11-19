//# allFunctionsCalledOnLoad
//#region src/helpers/dom/labelControl.ts
var labelId = 0;
/** Associate native and contenteditable controls with the same visible label. */
function labelControl(control, label) {
	if (!control || !label || control.hasAttribute("aria-label") || control.hasAttribute("aria-labelledby")) return;
	label.id || (label.id = `control-label-${++labelId}`);
	control.setAttribute("aria-labelledby", label.id);
}
//#endregion
export { labelControl as t };
