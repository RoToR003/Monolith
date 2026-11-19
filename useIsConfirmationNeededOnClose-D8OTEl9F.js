//# allFunctionsCalledOnLoad
import { u as langPack_default } from "./langPack-BmdJGr44.js";
import { C as createSignal, g as createEffect, p as createComponent, s as Show, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { _ as use, c as insert, f as setAttribute, g as template, s as delegateEvents } from "./web-BPyQozky.js";
import { r as useHotReloadGuard } from "./hotReloadGuard-BUNVkeQ4.js";
import { t as ripple } from "./ripple-D7hcIc_t.js";
import { t as IconTsx } from "./iconTsx-B4lOk4A6.js";
import { t as PreloaderTsx } from "./putPreloader-Bxq7N1RV.js";
import { t as throttle } from "./throttle-DxyCT6GJ.js";
import { t as Transition } from "./transition-Cmlc134D.js";
import { t as track } from "./track-DjRO1FyT.js";
//#region src/components/sidebarLeft/tabs/privacy/messages/appearZoomTransition.tsx
var animateEl = (backwards = false) => async (el, done) => {
	const keyframes = ["scale(0)", "scale(1)"];
	if (backwards) keyframes.reverse();
	await el.animate({ transform: keyframes }, { duration: 80 }).finished;
	done();
};
var AppearZoomTransition = (props) => {
	return createComponent(Transition, {
		get onEnter() {
			return animateEl();
		},
		get onExit() {
			return animateEl(true);
		},
		get children() {
			return props.children;
		}
	});
};
//#endregion
//#region src/helpers/solid/createScheduled.ts
function createScheduled(value, scheduleWith) {
	const [scheduledValue, setScheduledValue] = createSignal(value());
	const scheduledSet = scheduleWith(() => setScheduledValue(() => value()));
	createEffect(() => {
		track(value);
		scheduledSet();
	});
	return scheduledValue;
}
function createThrottled(value, delayMs, shouldRunFirst) {
	return createScheduled(value, (callback) => throttle(callback, delayMs, shouldRunFirst));
}
//#endregion
//#region src/components/saveButton.tsx
var _tmpl$ = /*#__PURE__*/ template(`<button class="btn-icon blue">`);
var SaveButton = (props) => {
	const hasChanges = createThrottled(() => props.hasChanges, 200, true);
	return createComponent(AppearZoomTransition, { get children() {
		return createComponent(Show, {
			get when() {
				return hasChanges();
			},
			get children() {
				var _el$ = _tmpl$();
				_el$.$$click = () => !props.saving && props.onClick();
				use(ripple, _el$, () => true);
				insert(_el$, createComponent(Show, {
					get when() {
						return props.saving;
					},
					get children() {
						return createComponent(PreloaderTsx, {});
					}
				}), null);
				insert(_el$, createComponent(IconTsx, {
					icon: "check",
					get style() {
						return { visibility: props.saving ? "hidden" : void 0 };
					}
				}), null);
				createRenderEffect((_p$) => {
					var _v$ = langPack_default.format("Save", true), _v$2 = props.saving || void 0, _v$3 = props.saving || void 0;
					_v$ !== _p$.e && setAttribute(_el$, "aria-label", _p$.e = _v$);
					_v$2 !== _p$.t && setAttribute(_el$, "aria-busy", _p$.t = _v$2);
					_v$3 !== _p$.a && setAttribute(_el$, "aria-disabled", _p$.a = _v$3);
					return _p$;
				}, {
					e: void 0,
					t: void 0,
					a: void 0
				});
				return _el$;
			}
		});
	} });
};
delegateEvents(["click"]);
//#endregion
//#region src/hooks/useIsConfirmationNeededOnClose.ts
var useIsConfirmationNeededOnClose = ({ descriptionLangKey, hasChanges, saveAllSettings, waitForSave }) => {
	const { confirmationPopup } = useHotReloadGuard();
	return async () => {
		if (!hasChanges()) return;
		const saveButton = { langKey: "Save" };
		try {
			await confirmationPopup({
				titleLangKey: "UnsavedChanges",
				descriptionLangKey,
				button: saveButton,
				buttons: [saveButton, {
					isCancel: true,
					langKey: "Discard"
				}],
				rejectWithReason: true
			});
		} catch (_reason) {
			if (_reason === "closed") throw new Error();
			return;
		}
		if (waitForSave) await saveAllSettings();
		else saveAllSettings();
		return true;
	};
};
//#endregion
export { SaveButton as n, useIsConfirmationNeededOnClose as t };
