//# allFunctionsCalledOnLoad
import { p as createComponent, s as Show } from "./solid-9Vxm0VIz.js";
import { u as memo } from "./web-BPyQozky.js";
import { r as useHotReloadGuard } from "./hotReloadGuard-BUNVkeQ4.js";
import { n as useSuperTab } from "./superTabProvider-LtveyH7W.js";
import { u as wrapStickerSetThumb } from "./emoticonsDropdown-Cb_qGCUN.js";
import { t as RadioFieldTsx } from "./radioFieldTsx-kmtuN4Dv.js";
var stickerSetRow_module_default = {
	setRow: "_setRow_8h75r_1",
	setAction: "_setAction_8h75r_5"
};
//#endregion
//#region src/components/stickerSetRow.tsx
var THUMB_SIZE = 36;
/**
* A sticker set as a row of a tab's list — its thumb, title and count — with a radio to choose it or an
* action (a button) of its own at the end
*/
function StickerSetRow(props) {
	const [tab] = useSuperTab();
	const { Row, i18n, wrapEmojiText } = useHotReloadGuard();
	const thumb = document.createElement("div");
	wrapStickerSetThumb({
		set: props.set,
		container: thumb,
		group: "GENERAL-SETTINGS",
		lazyLoadQueue: props.lazyLoadQueue,
		width: THUMB_SIZE,
		height: THUMB_SIZE,
		autoplay: true,
		middleware: tab.middlewareHelper.get()
	});
	return createComponent(Row, {
		get ["class"]() {
			return stickerSetRow_module_default.setRow;
		},
		get clickable() {
			return memo(() => !!props.radioName)() ? void 0 : props.onClick;
		},
		get children() {
			return [
				createComponent(Show, {
					get when() {
						return props.radioName;
					},
					get children() {
						return createComponent(Row.RadioField, { get children() {
							return createComponent(RadioFieldTsx, {
								alignRight: true,
								"class": "disable-hover",
								get checked() {
									return props.radioChecked;
								},
								get name() {
									return props.radioName;
								},
								get value() {
									return props.radioValue;
								},
								get onChange() {
									return props.onRadioChange;
								}
							});
						} });
					}
				}),
				createComponent(Row.Media, { children: thumb }),
				createComponent(Row.Title, { get children() {
					return wrapEmojiText(props.set.title);
				} }),
				createComponent(Row.Subtitle, { get children() {
					return i18n(props.isEmoji ? "EmojiCount" : "Stickers", [props.set.count]);
				} }),
				createComponent(Show, {
					get when() {
						return props.action;
					},
					get children() {
						return createComponent(Row.RightContent, {
							get ["class"]() {
								return stickerSetRow_module_default.setAction;
							},
							onClick: (event) => event.stopPropagation(),
							get children() {
								return props.action();
							}
						});
					}
				})
			];
		}
	});
}
//#endregion
export { StickerSetRow as t };
