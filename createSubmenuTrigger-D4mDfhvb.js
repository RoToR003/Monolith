//# allFunctionsCalledOnLoad
import { h as Modes } from "./userAgent-ByGXcznk.js";
import { t as doubleRaf } from "./schedulers-Cx0-7a1P.js";
import { t as noop } from "./noop-H9NNBLfX.js";
import { t as pause } from "./pause-BSJh-z46.js";
import { t as Icon } from "./icon-DbP6Es97.js";
import { a as i18n } from "./langPack-BmdJGr44.js";
import { r as getOverlayRoot } from "./appWindow-bo-KtJhy.js";
import { t as getMiddleware } from "./middleware-D6HuIqPm.js";
import { n as attachClickEvent, t as CLICK_EVENT_NAME } from "./clickEvent-COk4YpLP.js";
import { T as isButtonMenuItemDisabled, Tn as getInlineArrowKeys, f as positionFloatingMenu, wn as contextMenuController } from "./confirmationPopup-Bz6mK0o-.js";
//#region src/components/floatingButtonMenu.ts
function attachFloatingButtonMenu({ element, triggerEvent, direction, level, offset = [0, 0], createMenu, canOpen = () => true, onClose: onCloseArg }) {
	const triggerEvents = Array.isArray(triggerEvent) ? triggerEvent : [triggerEvent];
	let opened = false;
	let hovered = false;
	let requestId = 0;
	const listener = (event) => void (async () => {
		const activatedWithKeyboard = event?.type === "keydown" || event?.type === "click" && event.detail === 0;
		hovered = true;
		if (opened || !canOpen()) return;
		const currentRequestId = ++requestId;
		const triggerBcr = element.getBoundingClientRect();
		let menu;
		try {
			menu = await createMenu();
		} catch {}
		if (!menu || opened || currentRequestId !== requestId || !hovered && !activatedWithKeyboard || !canOpen() || !contextMenuController.isOpened()) return;
		opened = true;
		const onClose = async () => {
			opened = false;
			onCloseArg?.();
		};
		getOverlayRoot().append(menu);
		positionFloatingMenu(triggerBcr, menu, direction, offset);
		await doubleRaf();
		if (currentRequestId !== requestId || !contextMenuController.isOpened()) {
			opened = false;
			menu.remove();
			return;
		}
		contextMenuController.addAdditionalMenu(menu, element, level, onClose, activatedWithKeyboard);
	})();
	const onMouseLeave = () => {
		hovered = false;
		++requestId;
	};
	triggerEvents.forEach((event) => element.addEventListener(event, listener));
	const hoverTriggered = triggerEvents.includes("mouseenter");
	const detachActivation = Modes.a11y && hoverTriggered && !triggerEvents.includes("click") ? attachClickEvent(element, listener) : void 0;
	if (hoverTriggered) {
		element.addEventListener("mouseleave", onMouseLeave);
		if (Modes.a11y) element.addEventListener("keydown", onKeyDown);
	}
	return () => {
		++requestId;
		triggerEvents.forEach((event) => element.removeEventListener(event, listener));
		element.removeEventListener("mouseleave", onMouseLeave);
		element.removeEventListener("keydown", onKeyDown);
		detachActivation?.();
	};
	function onKeyDown(e) {
		if (e.key !== getInlineArrowKeys().next && e.key !== "Enter" && e.key !== " ") return;
		e.preventDefault();
		e.stopPropagation();
		listener(e);
	}
}
//#endregion
//#region src/components/createSubmenuTrigger.ts
var submenuHelperIdSeed = 0;
function createSubmenuTrigger({ options, createSubmenu, direction = "right-start" }) {
	let isDisabled = false, currentMiddleware, detachTriggerListeners;
	const onOpen = () => {
		if (!menuBtnOptions.element) return;
		detachTriggerListeners?.();
		currentMiddleware?.destroy();
		currentMiddleware = getMiddleware();
		const stopPropagation = (e) => {
			e.stopPropagation();
		};
		menuBtnOptions.element.addEventListener(CLICK_EVENT_NAME, stopPropagation, true);
		menuBtnOptions.element.classList.add("submenu-trigger");
		menuBtnOptions.element.setAttribute("aria-haspopup", "menu");
		menuBtnOptions.element.setAttribute("aria-expanded", "false");
		const detachFloatingMenu = attachFloatingButtonMenu({
			element: menuBtnOptions.element,
			direction,
			createMenu: async () => {
				const menu = await createSubmenu({ middleware: currentMiddleware.get() });
				menu.classList.add("btn-menu-submenu");
				return menu;
			},
			offset: [-5, -5],
			level: 2,
			triggerEvent: ["mouseenter", CLICK_EVENT_NAME],
			canOpen: () => !isDisabled && !isButtonMenuItemDisabled(menuBtnOptions.element),
			onClose
		});
		detachTriggerListeners = () => {
			menuBtnOptions.element?.removeEventListener(CLICK_EVENT_NAME, stopPropagation, true);
			detachFloatingMenu();
		};
	};
	const onClose = async () => {
		currentMiddleware?.destroy();
		isDisabled = true;
		await pause(200);
		isDisabled = false;
	};
	const menuBtnOptions = {
		...options,
		keepOpen: true,
		get regularText() {
			const content = document.createElement("span");
			content.classList.add("submenu-label");
			const text = document.createElement("span");
			text.classList.add("submenu-label-text");
			text.append(options.regularText ?? i18n(options.text));
			content.append(text, Icon("arrowhead", "submenu-label-arrow"));
			return content;
		},
		onClick: noop,
		onOpen,
		onClose,
		dispose: () => {
			detachTriggerListeners?.();
			detachTriggerListeners = void 0;
			currentMiddleware?.destroy();
			currentMiddleware = void 0;
		},
		id: submenuHelperIdSeed++
	};
	delete menuBtnOptions.text;
	return menuBtnOptions;
}
//#endregion
export { createSubmenuTrigger as t };
