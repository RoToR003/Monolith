//# allFunctionsCalledOnLoad
import { a as i18n } from "./langPack-BmdJGr44.js";
import { C as createSignal, _ as createMemo, b as createResource, p as createComponent, s as Show, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { s as useAppConfig } from "./contentSettings-DMhHR-0w.js";
import { c as insert, g as template, n as Portal, o as className, u as memo } from "./web-BPyQozky.js";
import { n as hotReloadGuard } from "./hotReloadGuardProvider-CHEsZRuG.js";
import { t as classNames } from "./classNames-DxGDjmvw.js";
import { n as StickerTsx } from "./sticker-5twBOy1Y.js";
import { t as InputFieldTsx } from "./inputFieldTsx-0SbEFdGE.js";
import { i as Row } from "./confirmationPopup-Bz6mK0o-.js";
import { i as usePromiseCollector } from "./mediaHeader-CnpQNwOl.js";
import { a as Section } from "./emailVerification-C8QYZSyu.js";
import { r as toastNew } from "./toast-B6VD5M7R.js";
import { n as useSuperTab } from "./superTabProvider-LtveyH7W.js";
import { n as wrapBusinessIntroLines, t as EMPTY_PLACEHOLDER_CLASS } from "./businessIntroPlaceholder-b9hefnsq.js";
import { t as shake } from "./shake-1vPuqgfm.js";
import { t as FakeBubbles } from "./fakeBubbles-D-6pHQXV.js";
import { n as SaveButton, t as useIsConfirmationNeededOnClose } from "./useIsConfirmationNeededOnClose-D8OTEl9F.js";
var businessIntro_module_default = {
	preview: "_preview_1qmoy_1",
	bubble: "_bubble_1qmoy_6"
};
//#endregion
//#region src/components/sidebarLeft/tabs/businessIntro.tsx
var _tmpl$ = /*#__PURE__*/ template(`<div aria-hidden=true><div class=bubble-content-wrapper><div class=bubble-content><div class=service-msg>`);
var _tmpl$2 = /*#__PURE__*/ template(`<div class=input-wrapper>`);
var _tmpl$3 = /*#__PURE__*/ template(`<span class=primary>`);
/** tdesktop's fallbacks for `intro_title_length_limit` and `intro_description_length_limit`. */
var DEFAULT_TITLE_LENGTH_LIMIT = 32;
var DEFAULT_DESCRIPTION_LENGTH_LIMIT = 70;
/** The size the greeting's sticker has in an empty chat (`.empty-bubble-placeholder-sticker`). */
var PREVIEW_STICKER_SIZE = 200;
var ROW_STICKER_SIZE = 24;
/** The way the field counts: an emoji is one character. */
var textLength = (text) => [...text].length;
var BusinessIntroTab = () => {
	const [tab] = useSuperTab();
	const promiseCollector = usePromiseCollector();
	const loadPromise = Promise.resolve(tab.payload.userFull).then((userFull) => ({ intro: userFull?.business_intro }));
	promiseCollector.collect(loadPromise);
	const [data] = createResource(() => loadPromise);
	return createComponent(Show, {
		get when() {
			return data();
		},
		get children() {
			return createComponent(BusinessIntroForm, { get intro() {
				return data().intro;
			} });
		}
	});
};
/**
* The start page as others will see it in an empty chat: the same greeting bubble, on the chat's
* background, without the line that says who set it (tdesktop's preview leaves it out too).
*/
function BusinessIntroPreview(props) {
	const lines = createMemo(() => {
		const { title, subtitle } = wrapBusinessIntroLines({
			title: props.title,
			description: props.description
		});
		title.classList.add(EMPTY_PLACEHOLDER_CLASS + "-line");
		subtitle.classList.add(EMPTY_PLACEHOLDER_CLASS + "-line");
		return [title, subtitle];
	});
	return createComponent(FakeBubbles, {
		get ["class"]() {
			return businessIntro_module_default.preview;
		},
		get children() {
			var _el$ = _tmpl$(), _el$4 = _el$.firstChild.firstChild.firstChild;
			insert(_el$4, lines, null);
			insert(_el$4, createComponent(Show, {
				get when() {
					return props.sticker;
				},
				get children() {
					return createComponent(StickerTsx, {
						get sticker() {
							return props.sticker;
						},
						width: PREVIEW_STICKER_SIZE,
						height: PREVIEW_STICKER_SIZE,
						"class": EMPTY_PLACEHOLDER_CLASS + "-sticker",
						ref: (element) => element.classList.add(EMPTY_PLACEHOLDER_CLASS + "-line"),
						extraOptions: {
							play: true,
							loop: true,
							withThumb: true,
							liteModeKey: "stickers_chat"
						}
					});
				}
			}), null);
			createRenderEffect(() => className(_el$, classNames("bubble service is-group-first is-group-last has-service-description", EMPTY_PLACEHOLDER_CLASS, EMPTY_PLACEHOLDER_CLASS + "-greeting", businessIntro_module_default.bubble)));
			return _el$;
		}
	});
}
var BusinessIntroForm = (props) => {
	const [tab] = useSuperTab();
	const managers = tab.managers;
	const appConfig = useAppConfig();
	const titleMaxLength = appConfig.intro_title_length_limit || DEFAULT_TITLE_LENGTH_LIMIT;
	const descriptionMaxLength = appConfig.intro_description_length_limit || DEFAULT_DESCRIPTION_LENGTH_LIMIT;
	const savedTitle = props.intro?.title || "";
	const savedDescription = props.intro?.description || "";
	const savedSticker = props.intro?.sticker;
	const [title, setTitle] = createSignal(savedTitle);
	const [description, setDescription] = createSignal(savedDescription);
	const [sticker, setSticker] = createSignal(savedSticker);
	const [saving, setSaving] = createSignal(false);
	const [randomSticker] = createResource(() => managers.appStickersManager.getGreetingSticker().catch(() => void 0));
	let titleField, descriptionField;
	const isTitleTooLong = () => textLength(title()) > titleMaxLength;
	const isDescriptionTooLong = () => textLength(description()) > descriptionMaxLength;
	const isEmpty = () => !title().trim() && !description().trim() && !sticker();
	const isTooLong = () => isTitleTooLong() || isDescriptionTooLong();
	const hasChanges = createMemo(() => title().trim() !== savedTitle || description().trim() !== savedDescription || sticker()?.id !== savedSticker?.id);
	const canSave = createMemo(() => hasChanges() && !isTooLong());
	/**
	* Resolves to whether the intro was saved. The header button closes the tab once it is; the
	* "unsaved changes" popup does not, since the slider is closing the tab already.
	*/
	const save = async (close) => {
		if (saving()) return false;
		if (isTooLong()) {
			if (isTitleTooLong()) shake(titleField.container);
			if (isDescriptionTooLong()) shake(descriptionField.container);
			return false;
		}
		setSaving(true);
		try {
			await managers.appBusinessManager.updateBusinessIntro({
				title: title(),
				description: description(),
				stickerId: sticker()?.id
			});
			tab.isConfirmationNeededOnClose = void 0;
			if (close) tab.close();
			return true;
		} catch (err) {
			console.error("updateBusinessIntro error:", err);
			toastNew({ langPackKey: "Error.AnError" });
			return false;
		} finally {
			setSaving(false);
		}
	};
	const reset = () => {
		setTitle("");
		setDescription("");
		setSticker(void 0);
	};
	let stickerRow;
	const openStickers = hotReloadGuard.useStickersDropdown({ onStickerClick: async ({ docId }) => {
		const doc = await managers.appDocsManager.getDoc(docId);
		if (doc) setSticker(doc);
	} });
	tab.isConfirmationNeededOnClose = useIsConfirmationNeededOnClose({
		hasChanges,
		saveAllSettings: async () => {
			if (!await save(false)) throw new Error("BUSINESS_INTRO_NOT_SAVED");
		},
		descriptionLangKey: "BusinessIntroUnsavedChanges",
		waitForSave: true
	});
	return [
		createComponent(Portal, {
			get mount() {
				return tab.header;
			},
			get children() {
				return createComponent(SaveButton, {
					get hasChanges() {
						return memo(() => !!canSave())() && !saving();
					},
					onClick: () => save(true)
				});
			}
		}),
		createComponent(BusinessIntroPreview, {
			get title() {
				return title().trim();
			},
			get description() {
				return description().trim();
			},
			get sticker() {
				return sticker() || randomSticker();
			}
		}),
		createComponent(Section, {
			caption: "BusinessIntroInfo",
			get children() {
				return [(() => {
					var _el$5 = _tmpl$2();
					insert(_el$5, createComponent(InputFieldTsx, {
						label: "BusinessIntroTitleHint",
						name: "business-intro-title",
						maxLength: titleMaxLength,
						get value() {
							return title();
						},
						onRawInput: setTitle,
						instanceRef: (ref) => titleField = ref
					}), null);
					insert(_el$5, createComponent(InputFieldTsx, {
						label: "BusinessIntroMessageHint",
						name: "business-intro-message",
						maxLength: descriptionMaxLength,
						withLinebreaks: true,
						get value() {
							return description();
						},
						onRawInput: setDescription,
						instanceRef: (ref) => descriptionField = ref
					}), null);
					return _el$5;
				})(), createComponent(Row, {
					ref: (element) => {
						stickerRow = element;
						element.setAttribute("aria-haspopup", "dialog");
					},
					clickable: () => openStickers(stickerRow),
					get children() {
						return [createComponent(Row.Icon, { icon: "stickers" }), createComponent(Row.Title, {
							get titleRight() {
								return memo(() => !!sticker())() ? createComponent(StickerTsx, {
									get sticker() {
										return sticker();
									},
									width: ROW_STICKER_SIZE,
									height: ROW_STICKER_SIZE,
									autoStyle: true,
									extraOptions: { play: false }
								}) : (() => {
									var _el$6 = _tmpl$3();
									insert(_el$6, () => i18n("BusinessIntroStickerRandom"));
									return _el$6;
								})();
							},
							get children() {
								return i18n("BusinessIntroSticker");
							}
						})];
					}
				})];
			}
		}),
		createComponent(Show, {
			get when() {
				return !isEmpty();
			},
			get children() {
				return createComponent(Section, { get children() {
					return createComponent(Row, {
						color: "danger",
						clickable: reset,
						get children() {
							return [createComponent(Row.Icon, { icon: "delete" }), createComponent(Row.Title, {
								"class": "danger",
								get children() {
									return i18n("BusinessIntroReset");
								}
							})];
						}
					});
				} });
			}
		})
	];
};
//#endregion
export { BusinessIntroTab as default };
