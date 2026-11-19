//# allFunctionsCalledOnLoad
import { a as i18n } from "./langPack-BmdJGr44.js";
import { i as For, p as createComponent } from "./solid-9Vxm0VIz.js";
import { c as insert, g as template } from "./web-BPyQozky.js";
import { i as createPopup, n as PopupElement, r as addCancelButton } from "./indexTsx-v9mB9bAq.js";
//#region src/components/popups/simpleConfirmation.tsx
var _tmpl$ = /*#__PURE__*/ template(`<p class=popup-description>`);
function showSimpleConfirmationPopup(options) {
	createPopup(() => createComponent(PopupElement, {
		"class": "popup-peer popup-confirmation",
		closable: true,
		get onCloseAfterTimeout() {
			return options.onCloseAfterTimeout;
		},
		get children() {
			return [
				createComponent(PopupElement.Header, { get children() {
					return createComponent(PopupElement.Title, { get title() {
						return options.titleLangKey;
					} });
				} }),
				(() => {
					var _el$ = _tmpl$();
					insert(_el$, () => i18n(options.descriptionLangKey, options.descriptionArgs));
					return _el$;
				})(),
				createComponent(PopupElement.Buttons, { get children() {
					return createComponent(For, {
						get each() {
							return options.buttons;
						},
						children: (button) => createComponent(PopupElement.Button, {
							get langKey() {
								return button.langKey;
							},
							get langArgs() {
								return button.langArgs;
							},
							get danger() {
								return button.isDanger;
							},
							get cancel() {
								return button.isCancel;
							},
							callback: (e) => button.callback?.(e),
							get children() {
								return button.text;
							}
						})
					});
				} })
			];
		}
	}));
}
/** Resolves when the user confirms, rejects on cancel or close. */
function simpleConfirmation(options) {
	return new Promise((resolve, reject) => {
		let resolved = false;
		const settle = (accepted) => {
			if (resolved) return;
			resolved = true;
			accepted ? resolve() : reject();
		};
		const buttons = addCancelButton([options.button]);
		buttons.find((button) => button.isCancel).callback = () => settle(false);
		options.button.callback = () => settle(true);
		showSimpleConfirmationPopup({
			titleLangKey: options.titleLangKey,
			descriptionLangKey: options.descriptionLangKey,
			descriptionArgs: options.descriptionArgs,
			buttons,
			onCloseAfterTimeout: () => settle(false)
		});
	});
}
//#endregion
//#region src/helpers/dom/whenDetached.ts
/**
* Runs `callback` once `element` is out of the document — for teardown that must outlive the scope
* that rendered it, but not the element itself.
*
* `<Transition>` keeps a leaving element in place for its exit animation while Solid has already
* disposed the component that rendered it, so anything torn down in `onCleanup` is gone while the
* element is still on screen. An offscreen lottie canvas is the visible case: destroying its player
* blanks the canvas at once, and the sticker vanishes mid-fade.
*
* `timeout` is the backstop for an element taken away with its whole subtree (the observer watches
* its parent, which is then removed unobserved): the callback runs by then at the latest.
*/
function whenDetached(element, callback, timeout = 1e3) {
	const parent = element?.parentElement;
	if (!element?.isConnected || !parent) {
		callback();
		return;
	}
	let done = false;
	const finish = () => {
		if (done) return;
		done = true;
		observer.disconnect();
		clearTimeout(timer);
		callback();
	};
	const observer = new MutationObserver(() => {
		if (!element.isConnected) finish();
	});
	observer.observe(parent, { childList: true });
	const timer = self.setTimeout(finish, timeout);
}
//#endregion
export { simpleConfirmation as n, whenDetached as t };
