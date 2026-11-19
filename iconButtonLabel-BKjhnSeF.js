//# allFunctionsCalledOnLoad
import { u as langPack_default } from "./langPack-BmdJGr44.js";
//#region src/helpers/dom/iconButtonLabel.ts
var labels = {
	close: "Close",
	cross: "Close",
	back: "AccDescr.Back",
	left: "AccDescr.Back",
	arrow_prev: "AccDescr.Back",
	more: "MultiAccount.More",
	search: "Search",
	edit: "Edit",
	delete: "Delete",
	bin_filled: "Delete",
	check: "Done",
	play_filled: "Play",
	pause_filled: "Pause",
	forward: "Forward",
	download: "MediaViewer.Context.Download",
	copy: "Copy",
	attach: "Chat.Input.Attach",
	smile: "Emoji",
	select: "Message.Context.Select",
	settings_filled: "Settings",
	fullscreen: "ConferenceCall.Controls.EnterFullscreen",
	smallscreen: "ConferenceCall.Controls.ExitFullscreen",
	zoomin: "MediaZoomIn",
	zoomout: "MediaZoomOut"
};
function getIconButtonLabelKey(icon) {
	return labels[icon];
}
function iconButtonLabel(icon) {
	const key = getIconButtonLabelKey(icon);
	return key ? langPack_default.format(key, true) : void 0;
}
//#endregion
export { iconButtonLabel as n, getIconButtonLabelKey as t };
