//# allFunctionsCalledOnLoad
import { a as i18n } from "./langPack-BmdJGr44.js";
import { p as createComponent } from "./solid-9Vxm0VIz.js";
import { o as createMiddleware } from "./sticker-5twBOy1Y.js";
import { vn as wrapPhoto } from "./confirmationPopup-Bz6mK0o-.js";
import { D as A11yButton } from "./openEditors-7FmA7q_V.js";
import { n as getWebFileLocation } from "./makeGoogleMapsUrl-gqgfvOD4.js";
import { t as confirmOpenGoogleMaps } from "./confirmOpenGoogleMaps-DhTFs0bN.js";
var mapPreview_module_default = { mapPreview: "_mapPreview_txjnm_1" };
//#endregion
//#region src/components/mapPreview.tsx
var MAP_WIDTH = 320;
var MAP_HEIGHT = 160;
var MAP_ZOOM = 15;
/** the map of a point, across a section: a press asks before leaving for Google Maps, as a profile's location does */
function MapPreview(props) {
	return createComponent(A11yButton, {
		get ["class"]() {
			return mapPreview_module_default.mapPreview;
		},
		get ["aria-label"]() {
			return i18n("Map").textContent;
		},
		onClick: () => confirmOpenGoogleMaps(props.geo),
		ref: (container) => {
			wrapPhoto({
				photo: getWebFileLocation(props.geo, MAP_WIDTH, MAP_HEIGHT, MAP_ZOOM),
				container,
				middleware: createMiddleware().get(),
				boxWidth: MAP_WIDTH,
				boxHeight: MAP_HEIGHT
			});
		}
	});
}
//#endregion
export { MapPreview as t };
