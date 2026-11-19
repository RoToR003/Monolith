//# allFunctionsCalledOnLoad
import { p as MOUNT_CLASS_TO } from "./userAgent-ByGXcznk.js";
import { t as EventListenerBase } from "./eventListenerBase-da40Q-0t.js";
//#region src/helpers/overlayCounter.ts
var OverlayCounter = class extends EventListenerBase {
	constructor(..._args) {
		super(..._args);
		this.overlaysActive = 0;
		this.hasDarkOverlays = 0;
	}
	get isOverlayActive() {
		return this.overlaysActive > 0;
	}
	set isOverlayActive(value) {
		this.overlaysActive += value ? 1 : -1;
		this.dispatchEvent("change", this.isOverlayActive);
	}
	get isDarkOverlayActive() {
		return this.hasDarkOverlays > 0;
	}
	set isDarkOverlayActive(value) {
		this.hasDarkOverlays += value ? 1 : -1;
		this.isOverlayActive = value;
	}
};
var overlayCounter = new OverlayCounter();
MOUNT_CLASS_TO && (MOUNT_CLASS_TO.overlayCounter = overlayCounter);
//#endregion
export { overlayCounter as t };
