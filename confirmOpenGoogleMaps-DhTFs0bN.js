//# allFunctionsCalledOnLoad
import { t as confirmationPopup } from "./confirmationPopup-Bz6mK0o-.js";
import { t as safeWindowOpen } from "./safeWindowOpen-BUv4gymx.js";
import { t as makeGoogleMapsUrl } from "./makeGoogleMapsUrl-gqgfvOD4.js";
//#region src/components/confirmOpenGoogleMaps.ts
/** "Open in Google Maps?", asked before a point leaves for Google Maps: whether to go. */
function askOpenGoogleMaps() {
	return confirmationPopup({
		descriptionLangKey: "Popup.OpenInGoogleMaps",
		button: { langKey: "Open" }
	}).then(() => true, () => false);
}
/** A point leaves for Google Maps only once asked — a profile's location, a page's map. */
async function confirmOpenGoogleMaps(geo) {
	if (await askOpenGoogleMaps()) safeWindowOpen(makeGoogleMapsUrl(geo));
}
//#endregion
export { confirmOpenGoogleMaps as t };
