//# allFunctionsCalledOnLoad
import { n as __exportAll } from "./rolldown-runtime-CwcJO0Gh.js";
import { u as langPack_default } from "./langPack-BmdJGr44.js";
import { t as getMiddleware } from "./middleware-D6HuIqPm.js";
import { i as simulateClickEvent } from "./clickEvent-COk4YpLP.js";
import { t as placeCaretAtEnd } from "./placeCaretAtEnd-BtAUyd5U.js";
import { wn as contextMenuController } from "./confirmationPopup-Bz6mK0o-.js";
import { a as highlightText } from "./textHighlight-BHWnL6Fg.js";
//#region src/lib/settingsSearch/highlight.ts
var highlight_exports = /* @__PURE__ */ __exportAll({
	flashControl: () => flashControl,
	focusControl: () => focusControl,
	highlightControl: () => highlightControl,
	highlightMenuControl: () => highlightMenuControl,
	highlightSettingsEntry: () => highlightSettingsEntry
});
var HIGHLIGHT_CLASS = "is-settings-highlighted";
var HIGHLIGHT_DURATION = 1600;
/** Rows behind a manager round-trip (privacy values, sessions) render late. */
var WAIT_TIMEOUT = 3e3;
/** A control is flashed whole, the way tdesktop flashes a settings button. */
var ANCHOR_SELECTOR = ".row, .checkbox-field, .radio-field, .btn-menu-item";
/**
* Finds the element rendering `key`. Every `i18n()` label registers itself in
* `I18n.weakMap`, so the lookup is by language key rather than by text — it keeps
* working in any language and needs no markers in the settings tabs themselves.
*/
var findLabel = (container, key) => {
	for (const element of Array.from(container.querySelectorAll(".i18n"))) if (langPack_default.weakMap.get(element)?.key === key) return element;
};
/**
* Flashes a control that is already in hand - a row, a menu item, a header's icon
* button - the way tdesktop flashes the control a link points at.
*/
function flashControl(control, middleware) {
	control.classList.add(HIGHLIGHT_CLASS);
	const fade = setTimeout(() => control.classList.remove(HIGHLIGHT_CLASS), HIGHLIGHT_DURATION);
	middleware.onClean(() => clearTimeout(fade));
}
/**
* Flashes the control rendering `key`, wherever it is: a row of a settings tab,
* or an item of a menu that was opened for the occasion.
*/
/**
* Runs `use` on the element rendering `key` — right away, or as soon as it is on
* the screen: a row behind a manager round-trip renders after its tab is open.
*/
function onLabel(key, options, use) {
	const { root } = options;
	const middleware = options.middleware || getMiddleware().get();
	const found = findLabel(root, key);
	if (found) {
		use(found);
		return;
	}
	const observer = new MutationObserver(() => {
		const label = findLabel(root, key);
		if (!label && middleware()) return;
		observer.disconnect();
		clearTimeout(timeout);
		if (label) use(label);
	});
	observer.observe(root, {
		childList: true,
		subtree: true
	});
	const timeout = setTimeout(() => observer.disconnect(), WAIT_TIMEOUT);
	middleware.onClean(() => {
		observer.disconnect();
		clearTimeout(timeout);
	});
}
/**
* Flashes the control rendering `key`, wherever it is: a row of a settings tab,
* or an item of a menu that was opened for the occasion.
*/
function highlightControl(key, options) {
	const { scrollable } = options;
	const middleware = options.middleware || getMiddleware().get();
	onLabel(key, options, (label) => {
		if (!middleware()) return;
		const row = label.closest(ANCHOR_SELECTOR);
		const target = row || label;
		if (scrollable?.container.contains(target)) scrollable.scrollIntoViewNew({
			element: target,
			position: "center"
		});
		if (row) {
			flashControl(row, middleware);
			return;
		}
		const painted = highlightText({
			container: label,
			match: {
				type: "quote",
				text: label.textContent
			}
		});
		const fade = setTimeout(() => painted.fadeOut(), HIGHLIGHT_DURATION);
		middleware.onClean(() => {
			clearTimeout(fade);
			painted.dispose();
		});
	});
}
/**
* Puts the caret in the field labelled `key` — what a link naming a field
* (`tg://settings/edit/bio`) does once the screen carrying it is open. Pointing
* at an input is typing in it, so it is a caret rather than a flash.
*/
function focusControl(key, options) {
	const middleware = options.middleware || getMiddleware().get();
	onLabel(key, options, (label) => {
		const input = label.closest(".input-field")?.querySelector(".input-field-input");
		if (input && middleware()) placeCaretAtEnd(input);
	});
}
/**
* Opens the menu behind `toggle` (unless it already is) and flashes the item
* rendering `key` — how a control that lives in a menu is pointed at, the way
* tdesktop's `ShowLogOutMenu` shows the menu before highlighting the item in it.
*/
function highlightMenuControl(toggle, key) {
	if (!toggle) return;
	if (!toggle.classList.contains("menu-open")) {
		contextMenuController.keepNextOpenOnMouseMove();
		simulateClickEvent(toggle);
	}
	highlightControl(key, { root: document.body });
}
/** The same, for a control that belongs to a settings tab. */
function highlightSettingsEntry(tab, key, root = tab.container) {
	return highlightControl(key, {
		root,
		middleware: tab.middlewareHelper.get(),
		scrollable: tab.scrollable
	});
}
//#endregion
export { highlight_exports as i, highlightMenuControl as n, highlightSettingsEntry as r, flashControl as t };
