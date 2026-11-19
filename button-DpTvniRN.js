//# allFunctionsCalledOnLoad
import { h as Modes } from "./userAgent-ByGXcznk.js";
import { t as Icon } from "./icon-DbP6Es97.js";
import { a as i18n, u as langPack_default } from "./langPack-BmdJGr44.js";
import { t as ripple } from "./ripple-D7hcIc_t.js";
import { t as getIconButtonLabelKey } from "./iconButtonLabel-BKjhnSeF.js";
//#region src/helpers/dom/ensureButtonSemantics.ts
/** Shared semantics for legacy/custom-element triggers using attachClickEvent. */
function ensureButtonSemantics(element) {
	if (!Modes.a11y) {
		if (!element.matches("button, input, select, textarea, a[href], [role]")) element.setAttribute("role", "button");
		return;
	}
	if (element.matches("button, input, select, textarea, a[href]")) {
		if (element.tagName === "BUTTON" && !element.hasAttribute("type")) element.type = "button";
		return;
	}
	if (!element.hasAttribute("role")) element.setAttribute("role", "button");
	if (!element.hasAttribute("tabindex")) element.tabIndex = 0;
}
//#endregion
//#region src/components/button.ts
function Button(className, options = {}) {
	const button = document.createElement(options.asLink ? "a" : options.asDiv ? "div" : "button");
	button.className = className;
	if (!options.asLink) ensureButtonSemantics(button);
	if (!options.noRipple) {
		if (options.rippleSquare) button.classList.add("rp-square");
		ripple(button);
	}
	if (options.icon) replaceButtonIcon(button, options.icon, false);
	if (options.onlyMobile) button.classList.add("only-handhelds");
	if (options.disabled) button.setAttribute("disabled", "true");
	if (options.text) button.append(i18n(options.text, options.textArgs));
	const ariaLabel = options.ariaLabel || !options.text && getIconButtonLabelKey(options.icon);
	if (ariaLabel) button.setAttribute("aria-label", langPack_default.format(ariaLabel, true));
	return button;
}
function replaceButtonIcon(element, icon, oldIcon = element.querySelector(".button-icon")) {
	const newIcon = Icon(icon, "button-icon");
	if (oldIcon) oldIcon.replaceWith(newIcon);
	else element.append(newIcon);
	return newIcon;
}
//#endregion
export { replaceButtonIcon as n, ensureButtonSemantics as r, Button as t };
