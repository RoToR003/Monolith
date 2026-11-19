//# allFunctionsCalledOnLoad
import { h as Modes } from "./userAgent-ByGXcznk.js";
import { t as IS_TOUCH_SUPPORTED } from "./touchSupport-B2RWO3zD.js";
import { t as doubleRaf } from "./schedulers-Cx0-7a1P.js";
import { S as callbackify } from "./objectUrlUtils-5x08MNuO.js";
import { u as langPack_default } from "./langPack-BmdJGr44.js";
import { n as getAppWindow, r as getOverlayRoot } from "./appWindow-bo-KtJhy.js";
import { t as cancelEvent } from "./cancelEvent-Cw8vYZHp.js";
import { r as getFullScreenElement } from "./fullScreen-5nVzMsf1.js";
import { t as ListenerSetter } from "./listenerSetter-BER6qAXn.js";
import { n as attachClickEvent, r as hasMouseMovedSinceDown } from "./clickEvent-COk4YpLP.js";
import { r as ensureButtonSemantics } from "./button-DpTvniRN.js";
import { f as positionFloatingMenu, h as filterAsync, l as verifyMenuItem, m as positionMenuTrigger, wn as contextMenuController, x as ButtonMenu } from "./confirmationPopup-Bz6mK0o-.js";
import { t as ButtonIcon } from "./buttonIcon-CthJWloV.js";
//#region src/components/buttonMenuToggle.ts
function ButtonMenuToggleHandler({ el, onOpen, options, onClose }) {
	ensureButtonSemantics(el);
	el.setAttribute("aria-haspopup", "menu");
	el.setAttribute("aria-expanded", "false");
	return attachClickEvent(el, (e) => {
		if (!el.classList.contains("btn-menu-toggle") || hasMouseMovedSinceDown(e)) return false;
		cancelEvent(e);
		if (el.classList.contains("menu-open")) {
			if (e.target && e.target.classList.contains("btn-menu")) return;
			contextMenuController.close();
		} else {
			const result = onOpen?.(e);
			const open = (element) => {
				const openedMenu = element ?? el.querySelector(".btn-menu");
				if (!openedMenu) return;
				el.setAttribute("aria-expanded", "true");
				const activatedWithKeyboard = e.type === "click" && e.detail === 0;
				contextMenuController.openBtnMenu(openedMenu, () => {
					el.setAttribute("aria-expanded", "false");
					onClose?.();
				}, el, activatedWithKeyboard || !IS_TOUCH_SUPPORTED);
			};
			callbackify(result, open);
		}
	}, options);
}
function filterButtonMenuItems(buttons) {
	return filterAsync(buttons, verifyMenuItem);
}
/**
* A menu whose every item fails its verify has nothing to open, so hide its trigger.
* Returns a function to call whenever something the verifies depend on has changed.
*/
function createButtonMenuVisibility(button, buttons, hide) {
	let changeId = 0;
	return () => {
		const id = ++changeId;
		filterButtonMenuItems(buttons).then((items) => {
			if (id === changeId) button.classList.toggle("hide", (hide?.() ?? false) || !items.length);
		});
	};
}
function ButtonMenuToggle({ buttonOptions, listenerSetter: attachListenerSetter, container, direction, buttons, onOpenBefore, onOpen, onClose, onCloseAfter, noIcon, icon = "more", appendTo, floatingDirection, positionPadding, canOpen }) {
	const resolvedButtonOptions = buttonOptions ? { ...buttonOptions } : {};
	if (!Modes.a11y && buttonOptions && buttonOptions.asDiv === void 0 && Object.keys(buttonOptions).some((key) => key !== "ariaLabel")) resolvedButtonOptions.asDiv = true;
	if (!container && !resolvedButtonOptions.ariaLabel) resolvedButtonOptions.ariaLabel = "MultiAccount.More";
	const button = container ?? ButtonIcon(noIcon ? void 0 : icon, resolvedButtonOptions);
	if (container && buttonOptions?.ariaLabel) button.setAttribute("aria-label", langPack_default.format(buttonOptions.ariaLabel, true));
	const autoPosition = !appendTo;
	button.classList.add("btn-menu-toggle");
	const listenerSetter = new ListenerSetter();
	const clearCloseTimeout = () => {
		clearTimeout(closeTimeout);
		closeTimeout = void 0;
	};
	const canDeleteTextElementsOnClose = buttons.filter((button) => !button.textElement);
	const previousButtons = buttons.slice();
	let element, closeTimeout, tempId = 0;
	ButtonMenuToggleHandler({
		el: button,
		onOpen: async (e) => {
			const _tempId = ++tempId;
			await onOpenBefore?.(e);
			if (_tempId !== tempId) return;
			if (closeTimeout) {
				clearCloseTimeout();
				if (element?.isConnected) return element;
			}
			const filteredButtons = await filterButtonMenuItems(buttons);
			if (_tempId !== tempId) return;
			if (!filteredButtons.length) return;
			const newButtons = filteredButtons.slice().filter((button) => !previousButtons.includes(button));
			previousButtons.push(...newButtons);
			canDeleteTextElementsOnClose.push(...newButtons.filter((button) => !button.textElement));
			const _element = element = await ButtonMenu({
				buttons: filteredButtons,
				listenerSetter
			});
			if (_tempId !== tempId) return;
			_element.classList.add(direction);
			if (direction === "bottom-center") _element.style.setProperty("--parent-half-width", (container ?? button).clientWidth / 2 + "px");
			await onOpen?.(e, _element);
			if (_tempId !== tempId) return;
			const fullScreenElement = getFullScreenElement();
			(appendTo ?? (fullScreenElement?.contains(button) ? fullScreenElement : getOverlayRoot())).append(_element);
			if (autoPosition) {
				if (floatingDirection) {
					const appWindow = getAppWindow();
					const margin = 32;
					_element.style.inset = "auto";
					_element.style.maxHeight = `${Math.max(0, appWindow.innerHeight - margin)}px`;
					_element.style.maxWidth = `${Math.max(0, appWindow.innerWidth - margin)}px`;
					_element.style.overflowY = "auto";
					positionFloatingMenu(button.getBoundingClientRect(), _element, floatingDirection, [0, 8]);
				} else positionMenuTrigger(button, _element, direction, positionPadding ?? {
					top: 8,
					bottom: 8
				});
			}
			await doubleRaf();
			if (_tempId !== tempId) _element.remove();
			if (canOpen && !canOpen()) {
				_element.remove();
				return;
			}
			return _element;
		},
		options: { listenerSetter: attachListenerSetter },
		onClose: () => {
			++tempId;
			clearCloseTimeout();
			onClose?.();
			closeTimeout = window.setTimeout(() => {
				onCloseAfter?.();
				closeTimeout = void 0;
				listenerSetter.removeAll();
				buttons.forEach((button) => {
					try {
						button.dispose?.();
					} catch {}
					button.element = void 0;
				});
				canDeleteTextElementsOnClose.forEach((button) => delete button.textElement);
				element.remove();
			}, 300);
		}
	});
	return button;
}
//#endregion
export { createButtonMenuVisibility as n, filterButtonMenuItems as r, ButtonMenuToggle as t };
