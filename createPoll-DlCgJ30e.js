//# allFunctionsCalledOnLoad
import { h as Modes } from "./userAgent-ByGXcznk.js";
import { a as blurActiveElement } from "./appNavigationController-Ct0fx8yF.js";
import { t as pause } from "./pause-BSJh-z46.js";
import { a as i18n, u as langPack_default } from "./langPack-BmdJGr44.js";
import { A as mergeProps, C as createSignal, I as splitProps, L as untrack, M as onCleanup, R as useContext, _ as createMemo, b as createResource, d as batch, f as children, g as createEffect, h as createContext, i as For, j as on, k as mapArray, m as createComputed, o as Match, p as createComponent, s as Show, u as Switch, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { r as getOverlayRoot } from "./appWindow-bo-KtJhy.js";
import { a as oneHourInSeconds, i as oneDayInSeconds, s as oneWeekInSeconds } from "./constants-DLILUQ1j.js";
import { n as createStore, o as unwrap } from "./store-PwRn5fa3.js";
import { _ as use, a as classList, c as insert, f as setAttribute, g as template, h as style, o as className, p as setStyleProperty, r as addEventListener, s as delegateEvents, u as memo } from "./web-BPyQozky.js";
import { r as useHotReloadGuard } from "./hotReloadGuard-BUNVkeQ4.js";
import { t as classNames } from "./classNames-DxGDjmvw.js";
import { t as IconTsx } from "./iconTsx-B4lOk4A6.js";
import { t as I18nTsx } from "./i18n-CGMFiAW0.js";
import { t as Button } from "./buttonTsx-Bwphkm9r.js";
import { t as buttonKeyDown } from "./buttonKeyDown-CqZzefS3.js";
import { c as useSnitchedPopupContext, i as createPopup, n as PopupElement } from "./indexTsx-v9mB9bAq.js";
import { t as requestRAF } from "./requestRAF-CwdYaVwH.js";
import { s as getRichValueWithCaret, t as InputField } from "./inputField-CaCo30N0.js";
import { L as formatFullSentTime } from "./index-B7axFZql.js";
import { t as Transition } from "./transition-Cmlc134D.js";
import { t as TransitionGroup } from "./transitionGroup-yCGzBwpt.js";
import { I as createAutoDeleteIcon, f as positionFloatingMenu, i as Row, s as CheckboxFieldTsx, wn as contextMenuController } from "./confirmationPopup-Bz6mK0o-.js";
import { E as lastItem } from "./getChatMigratedTo-ChhMNXuu.js";
import { l as formatDuration, r as wrapFormattedDuration } from "./wrapDuration-BQgz9hDF.js";
import { t as subscribeOn } from "./subscribeOn-DnCla7ws.js";
import { M as useIsCleaned, c as smoothScrollBehavior, v as supportsVideoEncoding } from "./openEditors-7FmA7q_V.js";
import { a as Section } from "./emailVerification-C8QYZSyu.js";
import { r as toastNew } from "./toast-B6VD5M7R.js";
import { t as Space } from "./space-XGOOgiuc.js";
import { a as EmojiDropdownButton, n as MediaAttachment, o as useCreatePollLimits, t as createDelayed } from "./createDelayed--JKseGyg.js";
import { t as attachPlainMessageEditor } from "./plainField-DIjPnqVa.js";
import { t as showDatePickerPopup } from "./datePicker-D1G1w7Ns.js";
import { p as StaticCheckbox } from "./geoPin-BKDcrfIw.js";
import { E as showPickCountryPopup } from "./payment-BzrfNdna.js";
import { t as RadioFieldTsx } from "./radioFieldTsx-kmtuN4Dv.js";
import { t as getPollCountryName } from "./getPollCountryName-OfmUTr_N.js";
import { n as useSimpleFormFieldContext, t as SimpleFormField } from "./simpleFormField-CGA0MMzH.js";
import { t as HeightTransition } from "./heightTransition-DUH4NxQ7.js";
import { t as focusInput } from "./focusInput-BnALiJjU.js";
import { t as track } from "./track-DjRO1FyT.js";
import { t as AutoHeight } from "./autoHeight-CPfajIaf.js";
import { t as editableFieldContent_module_default } from "./editableFieldContent.module-Bmodf0Jz.js";
import { t as createSortableList } from "./createSortableList-CV67uPcH.js";
//#region src/components/popups/createPoll/config.ts
var supportedDescriptionFormattingTypes = [
	"bold",
	"italic",
	"link",
	"underline",
	"monospace",
	"spoiler",
	"strikethrough"
];
var styles_module_default = {
	popup: "_popup_z24r3_1",
	container: "_container_z24r3_6",
	flexFull: "_flexFull_z24r3_11",
	wrapper: "_wrapper_z24r3_15",
	relative: "_relative_z24r3_23",
	confirmButton: "_confirmButton_z24r3_27",
	hr: "_hr_z24r3_37",
	smallerHrWrapper: "_smallerHrWrapper_z24r3_42",
	animatedInputFieldWrapper: "_animatedInputFieldWrapper_z24r3_46",
	emojiDropdownButton: "_emojiDropdownButton_z24r3_51",
	forceFocused: "_forceFocused_z24r3_55",
	formField: "_formField_z24r3_59",
	addOptionButtonIcon: "_addOptionButtonIcon_z24r3_63",
	addOptionButton: "_addOptionButton_z24r3_63",
	inputFieldPlaceholder: "_inputFieldPlaceholder_z24r3_73",
	draggableSideContent: "_draggableSideContent_z24r3_77",
	disabled: "_disabled_z24r3_89",
	mediaAttachmentImage: "_mediaAttachmentImage_z24r3_93",
	pollDuration: "_pollDuration_z24r3_102",
	pollOptionRow: "_pollOptionRow_z24r3_106",
	pollOptionCheckWrapper: "_pollOptionCheckWrapper_z24r3_109",
	pollOptionInputField: "_pollOptionInputField_z24r3_118",
	pollOptionIconContainer: "_pollOptionIconContainer_z24r3_121",
	pollOptionIconFloating: "_pollOptionIconFloating_z24r3_126",
	checkButtonWrapper: "_checkButtonWrapper_z24r3_133",
	pollDurationMenu: "_pollDurationMenu_z24r3_155"
};
//#endregion
//#region src/components/popups/createPoll/emojiButtonWithOpacity.tsx
var EmojiButtonWithOpacity = (inProps) => {
	const [props, restProps] = splitProps(inProps, ["class"]);
	const { forceFocused, useSetForceFocused } = useSimpleFormFieldContext();
	const setForceFocused = useSetForceFocused();
	return createComponent(EmojiDropdownButton, mergeProps({ get ["class"]() {
		return classNames(props.class, styles_module_default.emojiDropdownButton, forceFocused() && styles_module_default.forceFocused);
	} }, restProps, { onToggle: setForceFocused }));
};
//#endregion
//#region src/components/popups/createPoll/utils.ts
var canSubmitPoll = (store, limits) => {
	if (!store.question) return false;
	if (store.question.length > limits.maxQuestionLength) return false;
	if (store.description.length > limits.maxDescriptionLength) return false;
	const trimmedOptions = [...store.pollOptions];
	if (!checkOptionHasValue(lastItem(trimmedOptions))) trimmedOptions.pop();
	if (trimmedOptions.length < 2) return false;
	if (trimmedOptions.some((option) => !option.text)) return false;
	if (store.pollOptions.some((option) => option.attachment?.type === "pending")) return false;
	if (store.descriptionAttachment?.type === "pending") return false;
	if (store.explanationAttachment?.type === "pending") return false;
	if (store.pollOptions.length > limits.maxOptions) return false;
	if (store.pollOptions.some((option) => option.text.length > limits.maxOptionLength)) return false;
	if (new Set(store.pollOptions.map((option) => option.text)).size !== store.pollOptions.length) return false;
	if (store.hasCorrectAnswer && !store.pollOptions.some((option) => option.checked)) return false;
	if (store.hasCorrectAnswer && store.explanation.length > limits.maxExplanationLength) return false;
	return true;
};
var useCanSubmit = () => {
	const { store } = useCreatePollContext();
	const { maxOptions, maxQuestionLength, maxDescriptionLength, maxOptionLength, maxExplanationLength } = useCreatePollLimits();
	return createMemo(() => canSubmitPoll(store, {
		maxDescriptionLength: maxDescriptionLength(),
		maxExplanationLength: maxExplanationLength(),
		maxOptionLength: maxOptionLength(),
		maxOptions: maxOptions(),
		maxQuestionLength: maxQuestionLength()
	}));
};
/**
* How many options the user may still add, the way the caption under the options section counts
* them: the trailing option is the empty one being typed into, so it is not spent yet.
*/
var useVisibleOptionsLeft = () => {
	const { store } = useCreatePollContext();
	const { maxOptions } = useCreatePollLimits();
	return createMemo(() => {
		if (store.pollOptions.length === 2 && !checkOptionHasValue(store.pollOptions[0])) return maxOptions();
		return Math.max(0, maxOptions() - store.pollOptions.length) + (store.pollOptions.length && checkOptionHasValue(lastItem(store.pollOptions)) ? 0 : 1);
	});
};
var validateCountryRestriction = (store, isBroadcast, onError, countriesElement) => {
	if (!isBroadcast || !store.limitByCountry || store.countriesIso2.length) return true;
	onError();
	countriesElement?.scrollIntoView({
		behavior: smoothScrollBehavior(),
		block: "center"
	});
	return false;
};
var finalizeAttachment = (attachment) => {
	if (!attachment || attachment.type === "pending") return void 0;
	return attachment;
};
var finalizeBodyAttachment = (attachment) => {
	const finalized = finalizeAttachment(attachment);
	return finalized?.type === "link" ? void 0 : finalized;
};
var getFinalPayload = (context) => {
	const { store, isBroadcast } = context;
	const cloned = structuredClone(unwrap(store));
	if (isBroadcast()) {
		cloned.allowAddingOptions = false;
		cloned.showWhoVoted = false;
	} else {
		cloned.restrictToSubscribers = false;
		cloned.limitByCountry = false;
		cloned.countriesIso2 = [];
	}
	if (!cloned.limitByCountry) cloned.countriesIso2 = [];
	if (cloned.hasCorrectAnswer || !cloned.showWhoVoted) cloned.allowAddingOptions = false;
	if (!cloned.durationLimited) cloned.timeLimit = void 0;
	if (cloned.pollOptions.length && !checkOptionHasValue(lastItem(cloned.pollOptions))) cloned.pollOptions.pop();
	const { descriptionAttachment, explanationAttachment, pollOptions, ...rest } = cloned;
	return {
		...rest,
		descriptionAttachment: finalizeBodyAttachment(descriptionAttachment),
		explanationAttachment: finalizeBodyAttachment(explanationAttachment),
		pollOptions: pollOptions.map(({ attachment, ...option }) => ({
			...option,
			attachment: finalizeAttachment(attachment)
		}))
	};
};
var hasMeaningfulChanges = (store) => {
	return store.question !== "" || store.description !== "" || store.descriptionAttachment || store.pollOptions.some((option) => option.text !== "" || option.attachment) || store.restrictToSubscribers || store.limitByCountry || store.hasCorrectAnswer && (store.explanation !== "" || store.explanationAttachment);
};
var useSupportsMedia = () => {
	const { supportedMediaTypes, canEncodeVideo } = useCreatePollContext();
	return (mediaType) => {
		if (!supportedMediaTypes().includes(mediaType)) return false;
		if (mediaType === "video" || mediaType === "gif") return canEncodeVideo();
		return true;
	};
};
var checkOptionHasValue = (option) => {
	return !!option.text || !!option.attachment;
};
var interactableClass = "form-field-clickable";
var createFormFieldClickHandler = (inputField) => (e) => {
	const target = e.target;
	if (target instanceof HTMLElement && !target.closest(`.form-field-clickable`)) inputField.input.focus();
};
//#endregion
//#region src/components/popups/createPoll/storeContext.ts
/** What turning a poll into a quiz changes besides itself: a quiz takes no added options and no revotes. */
var QUIZ_POLL_SETTINGS = {
	hasCorrectAnswer: true,
	allowAddingOptions: false,
	allowRevoting: false
};
var CreatePollContext = createContext();
var useCreatePollContext = () => useContext(CreatePollContext);
var createPollStoreContextValue = (extra) => {
	const [store, setStore] = createStore({
		question: "",
		questionEntities: [],
		description: "",
		descriptionEntities: [],
		pollOptions: [{
			text: "",
			entities: []
		}, {
			text: "",
			entities: []
		}],
		showWhoVoted: true,
		allowMultipleAnswers: true,
		allowAddingOptions: true,
		allowRevoting: true,
		shuffleOptions: true,
		hasCorrectAnswer: false,
		restrictToSubscribers: false,
		limitByCountry: false,
		countriesIso2: [],
		durationLimited: false,
		timeLimit: {
			type: "duration",
			duration: oneDayInSeconds
		},
		explanation: "",
		explanationEntities: [],
		hideResults: false,
		...extra.quiz ? QUIZ_POLL_SETTINGS : {}
	});
	const { maxOptions } = useCreatePollLimits();
	createComputed(() => {
		if (store.allowMultipleAnswers) return;
		const firstChecked = untrack(() => store.pollOptions.findIndex((option) => option.checked));
		setStore("pollOptions", (option) => option.checked, "checked", false);
		if (firstChecked !== -1) setStore("pollOptions", firstChecked, "checked", true);
	});
	createComputed(() => {
		for (const option of store.pollOptions) track(() => option.text);
		if (store.pollOptions.length && store.pollOptions.length < maxOptions() && checkOptionHasValue(lastItem(store.pollOptions))) {
			setStore("pollOptions", store.pollOptions.length, {
				text: "",
				entities: []
			});
			return;
		}
	});
	const [canEncodeVideoResource] = createResource(() => supportsVideoEncoding());
	const canEncodeVideo = () => canEncodeVideoResource.state === "ready" && !!canEncodeVideoResource();
	return {
		store,
		setStore,
		canEncodeVideo,
		...extra
	};
};
//#endregion
//#region src/components/popups/createPoll/pollOptionsSectionContent.tsx
var _tmpl$$1 = /*#__PURE__*/ template(`<div>`);
var _tmpl$2$1 = /*#__PURE__*/ template(`<div role=checkbox>`);
var PollOptionsSectionContent = (props) => {
	const { maxOptions } = useCreatePollLimits();
	let idSeed = 0;
	const context = useCreatePollContext();
	const rawMappedItems = mapArray(() => context.store.pollOptions, (option) => ({
		type: "mappedItem",
		id: idSeed++,
		option
	}));
	const mappedItems = createMemo(rawMappedItems);
	const optionsLeft = createMemo(() => Math.max(0, maxOptions() - mappedItems().length));
	const canShowAddOption = createMemo(() => optionsLeft() > 0);
	const sortable = createSortableList({
		container: () => props.scrollable,
		items: mappedItems,
		getId: (item) => item.id,
		onReorder: (newItems) => {
			context.setStore("pollOptions", newItems.map((item) => item.option));
		}
	});
	const isDragging = createDelayed(sortable.isDragging, false, (value) => value ? -1 : 100);
	const TransitionGroupWhenNotDragging = (props) => {
		const resolved = children(() => props.children);
		return createComponent(Show, {
			get when() {
				return !isDragging();
			},
			get fallback() {
				return resolved();
			},
			get children() {
				return createComponent(TransitionGroup, {
					name: "fade-2",
					moveClass: "t-move",
					get children() {
						return resolved();
					}
				});
			}
		});
	};
	const items = createMemo(() => {
		return [...mappedItems()];
	});
	const onAdd = () => {
		if (optionsLeft() === 0) return;
		blurActiveElement();
		context.setStore("pollOptions", context.store.pollOptions.length, {
			text: "",
			entities: []
		});
	};
	return createComponent(AutoHeight, { get children() {
		return createComponent(TransitionGroupWhenNotDragging, { get children() {
			return createComponent(For, {
				get each() {
					return items();
				},
				children: (item, index) => createComponent(Switch, { get children() {
					return [createComponent(Match, {
						get when() {
							return item.type === "mappedItem" && item;
						},
						keyed: true,
						children: (item) => [memo(() => memo(() => index() > 0)() && createComponent(Space, { amount: "0.75rem" })), createComponent(PollOptionFullField, {
							get index() {
								return index();
							},
							mappedItem: item,
							get mappedItems() {
								return mappedItems();
							},
							sortable,
							get optionsLeft() {
								return optionsLeft();
							}
						})]
					}), createComponent(Match, {
						get when() {
							return item.type === "addOption";
						},
						get children() {
							var _el$ = _tmpl$$1();
							insert(_el$, createComponent(Button, {
								get ["class"]() {
									return styles_module_default.addOptionButton;
								},
								primary: true,
								onClick: onAdd,
								get children() {
									return [createComponent(IconTsx, {
										get ["class"]() {
											return styles_module_default.addOptionButtonIcon;
										},
										icon: "plus"
									}), createComponent(I18nTsx, { key: "NewPoll.OptionsAddOption" })];
								}
							}));
							createRenderEffect((_$p) => setStyleProperty(_el$, "height", !canShowAddOption() ? "0" : void 0));
							return _el$;
						}
					})];
				} })
			});
		} });
	} });
};
var PollOptionFullField = (props) => {
	const { store, setStore } = useCreatePollContext();
	const [container, setContainer] = createSignal();
	const value = () => props.mappedItem.option.text;
	const isDuplicate = createMemo(() => {
		const text = value();
		if (!text) return false;
		return store.pollOptions.filter((option) => option.text === text).length > 1;
	});
	const noIcon = createMemo(() => store.pollOptions.length === 2 && !props.mappedItem.option.text && props.index === 0);
	const isAdd = createMemo(() => props.index === store.pollOptions.length - 1 && !checkOptionHasValue(lastItem(store.pollOptions)));
	const canBeReordered = createMemo(() => !noIcon() && !isAdd());
	const noEmojiPicker = createMemo(() => isAdd() && !checkOptionHasValue(props.mappedItems[0].option));
	const noAttachment = createMemo(() => noEmojiPicker() || noIcon() || isAdd());
	const onPointerDown = createMemo(() => props.sortable.dragHandleProps(props.mappedItem.id).onPointerDown);
	createEffect(() => {
		if (!container() || !canBeReordered()) return;
		props.sortable.itemRef(props.mappedItem.id)(container());
	});
	const onRadioClick = () => {
		batch(() => {
			setStore("pollOptions", (option) => option.checked, "checked", false);
			setStore("pollOptions", props.index, "checked", true);
		});
	};
	const focusToEmptyInputCallback = createMemo(() => {
		if (!isAdd() || store.pollOptions.length !== 2 || checkOptionHasValue(store.pollOptions[0])) return;
		return () => {
			props.mappedItems[0]?.inputField?.input.focus();
		};
	});
	return (() => {
		var _el$2 = _tmpl$$1();
		use(setContainer, _el$2);
		insert(_el$2, createComponent(Show, {
			get when() {
				return store.hasCorrectAnswer;
			},
			get children() {
				var _el$3 = _tmpl$$1();
				insert(_el$3, createComponent(Transition, {
					name: "t-zoom",
					duration: 200,
					mode: "outin",
					get children() {
						return [createComponent(Show, {
							get when() {
								return !store.allowMultipleAnswers;
							},
							get children() {
								return createComponent(Row, {
									get ["class"]() {
										return styles_module_default.checkButtonWrapper;
									},
									noRipple: true,
									get children() {
										return createComponent(Row.RadioField, { get children() {
											return createComponent(RadioFieldTsx, {
												get ariaLabel() {
													return props.mappedItem.option.text || langPack_default.format("NewPoll.SetCorrectAnswer", true);
												},
												get checked() {
													return props.mappedItem.option.checked;
												},
												name: "new-poll-correct-answer",
												get value() {
													return String(props.mappedItem.id);
												},
												onChange: (checked) => checked && onRadioClick()
											});
										} });
									}
								});
							}
						}), createComponent(Show, {
							get when() {
								return store.allowMultipleAnswers;
							},
							get children() {
								var _el$4 = _tmpl$2$1();
								addEventListener(_el$4, "keydown", buttonKeyDown, true);
								_el$4.$$click = () => setStore("pollOptions", props.index, "checked", (v) => !v);
								insert(_el$4, createComponent(StaticCheckbox, { get checked() {
									return props.mappedItem.option.checked;
								} }));
								createRenderEffect((_p$) => {
									var _v$ = styles_module_default.checkButtonWrapper, _v$2 = Modes.a11y ? canBeReordered() ? 0 : -1 : void 0, _v$3 = !!props.mappedItem.option.checked, _v$4 = langPack_default.format("NewPoll.SetCorrectAnswer", true);
									_v$ !== _p$.e && className(_el$4, _p$.e = _v$);
									_v$2 !== _p$.t && setAttribute(_el$4, "tabindex", _p$.t = _v$2);
									_v$3 !== _p$.a && setAttribute(_el$4, "aria-checked", _p$.a = _v$3);
									_v$4 !== _p$.o && setAttribute(_el$4, "aria-label", _p$.o = _v$4);
									return _p$;
								}, {
									e: void 0,
									t: void 0,
									a: void 0,
									o: void 0
								});
								return _el$4;
							}
						})];
					}
				}));
				createRenderEffect((_p$) => {
					var _v$5 = styles_module_default.pollOptionCheckWrapper, _v$6 = { [styles_module_default.disabled]: !canBeReordered() };
					_v$5 !== _p$.e && className(_el$3, _p$.e = _v$5);
					_p$.t = classList(_el$3, _v$6, _p$.t);
					return _p$;
				}, {
					e: void 0,
					t: void 0
				});
				return _el$3;
			}
		}), null);
		insert(_el$2, createComponent(PollOptionInputField, {
			get value() {
				return value();
			},
			get attachment() {
				return props.mappedItem.option.attachment;
			},
			get isError() {
				return isDuplicate();
			},
			get canBeReordered() {
				return canBeReordered();
			},
			get noIcon() {
				return noIcon();
			},
			get isAdd() {
				return isAdd();
			},
			get noEmojiPicker() {
				return noEmojiPicker();
			},
			get noAttachment() {
				return noAttachment();
			},
			onPointerDown: (e) => {
				if (!canBeReordered()) return;
				blurActiveElement();
				onPointerDown()(e);
			},
			get hoverDisabled() {
				return props.sortable.draggingId() !== null;
			},
			inputFieldRef: (inputField) => {
				props.mappedItem.inputField = inputField;
			},
			onChange: (option) => {
				setStore("pollOptions", props.index, option);
			},
			onEnter: () => {
				if (noIcon()) return;
				for (const item of props.mappedItems.slice(props.index + 1)) if (!item.inputField?.value) {
					focusInput(item.inputField?.input);
					return;
				}
			},
			onEmptyBackspace: () => {
				if (store.pollOptions.length <= 1) return;
				if (store.pollOptions.length > 2 && props.index < store.pollOptions.length - 1) setStore("pollOptions", (prev) => prev.filter((_, i) => i !== props.index));
				focusInput(props.mappedItems[Math.max(0, props.index - 1)]?.inputField?.input);
			},
			get onClickOverride() {
				return focusToEmptyInputCallback();
			},
			get onFocus() {
				return focusToEmptyInputCallback();
			}
		}), null);
		createRenderEffect((_p$) => {
			var _v$7 = styles_module_default.pollOptionRow, _v$8 = props.sortable.itemStyle(props.mappedItem.id);
			_v$7 !== _p$.e && className(_el$2, _p$.e = _v$7);
			_p$.t = style(_el$2, _v$8, _p$.t);
			return _p$;
		}, {
			e: void 0,
			t: void 0
		});
		return _el$2;
	})();
};
var PollOptionInputField = (props) => {
	const { maxOptionLength } = useCreatePollLimits();
	const supportsMedia = useSupportsMedia();
	const inputField = new InputField({
		placeholder: props.isAdd ? "NewPoll.OptionsAddOption" : "NewPoll.Option",
		canWrapCustomEmojis: true,
		onRawInput: () => {
			const { value, entities } = getRichValueWithCaret(inputField.input);
			props.onChange(value ? {
				text: value,
				entities
			} : {
				text: value,
				entities,
				attachment: void 0
			});
		}
	});
	createEffect(on(() => props.isAdd, () => {
		const element = langPack_default.weakMap.get(inputField.placeholder);
		if (element instanceof langPack_default.IntlElement) element.update({ key: props.isAdd ? "NewPoll.OptionsAddOption" : "NewPoll.Option" });
	}, { defer: true }));
	const inputFieldEditor = attachPlainMessageEditor(inputField.input);
	onCleanup(() => inputFieldEditor.destroy());
	props.inputFieldRef?.(inputField);
	inputField.input.classList.replace("input-field-input", editableFieldContent_module_default.editableFieldContent);
	inputField.placeholder.classList.add(styles_module_default.inputFieldPlaceholder);
	inputField.input.addEventListener("keydown", (e) => {
		if (e.key === "Enter") props.onEnter?.();
		if (e.key === "Backspace" && props.value === "") {
			e.preventDefault();
			props.onEmptyBackspace?.();
		}
	});
	createEffect(() => {
		if (!props.onFocus) return;
		subscribeOn(inputField.input)("focus", props.onFocus);
	});
	const onFormFieldClickOriginal = createFormFieldClickHandler(inputField);
	return createComponent(SimpleFormField, {
		ref(r$) {
			var _ref$ = props.ref;
			typeof _ref$ === "function" ? _ref$(r$) : props.ref = r$;
		},
		get value() {
			return props.value;
		},
		get ["class"]() {
			return classNames(styles_module_default.flexFull, styles_module_default.formField, styles_module_default.pollOptionInputField);
		},
		withEndButtonIcon: true,
		withStartButtonIcon: true,
		withMinHeight: true,
		solidBackground: true,
		get hoverDisabled() {
			return props.hoverDisabled;
		},
		get isError() {
			return props.isError;
		},
		get style() {
			return props.style;
		},
		onClick: (e) => {
			if (props.onClickOverride) props.onClickOverride(e);
			else onFormFieldClickOriginal(e);
		},
		get children() {
			return [
				createComponent(SimpleFormField.SideContent, {
					get ["class"]() {
						return styles_module_default.draggableSideContent;
					},
					get classList() {
						return {
							[interactableClass]: props.canBeReordered,
							[styles_module_default.disabled]: !props.canBeReordered
						};
					},
					first: true,
					last: true,
					get onPointerDown() {
						return props.onPointerDown;
					},
					get children() {
						var _el$5 = _tmpl$$1();
						insert(_el$5, createComponent(Transition, {
							name: "t-var-zoom",
							get children() {
								return createComponent(Show, {
									get when() {
										return !props.noIcon;
									},
									get children() {
										return createComponent(Show, {
											get when() {
												return props.isAdd;
											},
											get fallback() {
												return createComponent(IconTsx, {
													icon: "menu",
													get ["class"]() {
														return styles_module_default.pollOptionIconFloating;
													}
												});
											},
											get children() {
												return createComponent(IconTsx, {
													icon: "plus",
													get ["class"]() {
														return styles_module_default.pollOptionIconFloating;
													}
												});
											}
										});
									}
								});
							}
						}));
						createRenderEffect(() => className(_el$5, styles_module_default.pollOptionIconContainer));
						return _el$5;
					}
				}),
				createComponent(SimpleFormField.InputStub, { get children() {
					return [memo(() => inputField.input), memo(() => inputField.placeholder)];
				} }),
				createComponent(TransitionGroup, {
					name: "t-zoom",
					moveClass: "t-move",
					get children() {
						return [createComponent(Show, {
							get when() {
								return !props.noEmojiPicker;
							},
							get children() {
								return createComponent(SimpleFormField.SideContent, {
									withFixedIcon: true,
									first: true,
									last: true,
									get children() {
										return createComponent(EmojiButtonWithOpacity, {
											"class": interactableClass,
											inputField
										});
									}
								});
							}
						}), createComponent(Show, {
							get when() {
								return memo(() => !!!props.noAttachment)() && (supportsMedia("photo") || supportsMedia("video") || supportsMedia("sticker") || supportsMedia("link"));
							},
							get children() {
								return createComponent(SimpleFormField.WithAutoLengthCounter, {
									get maxLength() {
										return maxOptionLength();
									},
									get first() {
										return !props.attachment;
									},
									last: true,
									withFixedIcon: true,
									get children() {
										return createComponent(MediaAttachment, {
											btnClass: interactableClass,
											get supportedMediaTypes() {
												return [
													...supportsMedia("photo") ? ["photo"] : [],
													...supportsMedia("video") ? ["video"] : [],
													...supportsMedia("gif") ? ["gif"] : [],
													...supportsMedia("sticker") ? ["sticker"] : [],
													...supportsMedia("link") ? ["link"] : []
												];
											},
											get imgClass() {
												return styles_module_default.mediaAttachmentImage;
											},
											get attachedMedia() {
												return props.attachment;
											},
											onLinkPopupClose: () => {
												if (inputField.input.isConnected) inputField.input.focus();
											},
											onAttach: (value) => {
												props.onChange?.({ attachment: value });
											}
										});
									}
								});
							}
						})];
					}
				})
			];
		}
	});
};
delegateEvents(["click", "keydown"]);
//#endregion
//#region src/components/popups/createPoll/pollSettingsSectionContent.tsx
var _tmpl$ = /*#__PURE__*/ template(`<div style=overflow:hidden>`);
var _tmpl$2 = /*#__PURE__*/ template(`<div><div><hr></div><div style=position:relative>`);
var minEndTimeFromNowMinutes = 5;
var PollSettingsSectionContent = (props) => {
	const { Row } = useHotReloadGuard();
	const { countriesMax, maxExplanationLength } = useCreatePollLimits();
	const context = useCreatePollContext();
	const supportsMedia = useSupportsMedia();
	const [limitDurationExtraElement, setLimitDurationExtraElement] = createSignal();
	const [explanationElement, setExplanationElement] = createSignal();
	const [pollDurationRowElement, setPollDurationRowElement] = createSignal();
	const [isDurationMenuOpen, setIsDurationMenuOpen] = createSignal(false);
	const getCountriesLabel = () => {
		const countries = context.store.countriesIso2;
		if (countries.length === 1) return getPollCountryName(countries[0]);
		if (countries.length > 1) return i18n("NewPoll.CountriesCount", [countries.length]);
	};
	const openCountriesPicker = () => {
		showPickCountryPopup({
			initial: context.store.countriesIso2,
			limit: countriesMax(),
			limitReachedLangKey: "BoostingSelectUpToWarningCountriesPlural",
			naming: "poll",
			onSelect: (countriesIso2) => context.setStore("countriesIso2", countriesIso2),
			titleLangKey: "BoostingSelectCountry"
		});
	};
	const explanationInput = new InputField({
		canHaveFormatting: supportedDescriptionFormattingTypes,
		canWrapCustomEmojis: true,
		withLinebreaks: true,
		onRawInput: () => {
			const { value, entities } = getRichValueWithCaret(explanationInput.input);
			context.setStore({
				explanation: value,
				explanationEntities: entities
			});
		}
	});
	const explanationInputEditor = attachPlainMessageEditor(explanationInput.input);
	onCleanup(() => explanationInputEditor.destroy());
	explanationInput.input.classList.replace("input-field-input", editableFieldContent_module_default.editableFieldContent);
	explanationInput.input.setAttribute("aria-label", langPack_default.format("NewPoll.Explanation.Placeholder", true));
	const formatTimeInSpan = (timestamp) => {
		const span = document.createElement("span");
		span.appendChild(formatFullSentTime(timestamp, true));
		return span;
	};
	const handleSettingsFlag = (flag) => () => {
		context.setStore(flag, (prev) => !prev);
	};
	usePollDurationMenu({
		open: isDurationMenuOpen,
		container: pollDurationRowElement,
		onOptionClick: (duration) => {
			context.setStore("timeLimit", {
				type: "duration",
				duration
			});
		},
		onCustomTimestamp: (timestamp) => {
			context.setStore("timeLimit", {
				type: "timestamp",
				timestamp
			});
		},
		onClose: () => setIsDurationMenuOpen(false)
	});
	return [
		createComponent(Show, {
			get when() {
				return !context.isBroadcast();
			},
			get children() {
				return createComponent(SettingsOption, {
					title: "NewPoll.ShowWhoVoted",
					subtitle: "NewPoll.ShowWhoVotedSubtitle",
					icon: "eye1_filled",
					get checked() {
						return context.store.showWhoVoted;
					},
					onClick: () => {
						if (context.store.showWhoVoted) context.setStore({
							allowAddingOptions: false,
							showWhoVoted: false
						});
						else context.setStore({ showWhoVoted: true });
					}
				});
			}
		}),
		createComponent(SettingsOption, {
			title: "NewPoll.AllowMultipleAnswers",
			subtitle: "NewPoll.AllowMultipleAnswersSubtitle",
			icon: "poll_multiple_answers_filled",
			get checked() {
				return context.store.allowMultipleAnswers;
			},
			get onClick() {
				return handleSettingsFlag("allowMultipleAnswers");
			}
		}),
		createComponent(Show, {
			get when() {
				return !context.isBroadcast();
			},
			get children() {
				return createComponent(SettingsOption, {
					title: "NewPoll.AllowAddingOptions",
					subtitle: "NewPoll.AllowAddingOptionsSubtitle",
					icon: "checklist_add",
					get checked() {
						return context.store.allowAddingOptions;
					},
					get disabled() {
						return context.store.hasCorrectAnswer || !context.store.showWhoVoted;
					},
					get onClick() {
						return handleSettingsFlag("allowAddingOptions");
					}
				});
			}
		}),
		createComponent(SettingsOption, {
			title: "NewPoll.AllowRevoting",
			subtitle: "NewPoll.AllowRevotingSubtitle",
			icon: "flip",
			get checked() {
				return context.store.allowRevoting;
			},
			get onClick() {
				return handleSettingsFlag("allowRevoting");
			}
		}),
		createComponent(SettingsOption, {
			title: "NewPoll.ShuffleOptions",
			subtitle: "NewPoll.ShuffleOptionsSubtitle",
			icon: "replace_circles",
			get checked() {
				return context.store.shuffleOptions;
			},
			get onClick() {
				return handleSettingsFlag("shuffleOptions");
			}
		}),
		createComponent(SettingsOption, {
			title: "NewPoll.SetCorrectAnswer",
			get subtitle() {
				return context.store.allowMultipleAnswers ? "NewPoll.SetMultipleCorrectAnswerSubtitle" : "NewPoll.SetCorrectAnswerSubtitle";
			},
			icon: "checklist_done",
			get checked() {
				return context.store.hasCorrectAnswer;
			},
			get disabled() {
				return context.quiz !== void 0;
			},
			onClick: () => {
				if (!context.store.hasCorrectAnswer) context.setStore(QUIZ_POLL_SETTINGS);
				else context.setStore({ hasCorrectAnswer: false });
			}
		}),
		createComponent(Show, {
			get when() {
				return context.isBroadcast();
			},
			get children() {
				return [
					createComponent(SettingsOption, {
						title: "NewPoll.RestrictToSubscribers",
						subtitle: "NewPoll.RestrictToSubscribersSubtitle",
						icon: "group",
						get checked() {
							return context.store.restrictToSubscribers;
						},
						get onClick() {
							return handleSettingsFlag("restrictToSubscribers");
						}
					}),
					createComponent(SettingsOption, {
						title: "NewPoll.LimitByCountry",
						subtitle: "NewPoll.LimitByCountrySubtitle",
						icon: "location",
						get checked() {
							return context.store.limitByCountry;
						},
						get onClick() {
							return handleSettingsFlag("limitByCountry");
						}
					}),
					createComponent(HeightTransition, { get children() {
						return createComponent(Show, {
							get when() {
								return context.store.limitByCountry;
							},
							get children() {
								var _el$ = _tmpl$();
								insert(_el$, createComponent(Row, {
									ref(r$) {
										var _ref$ = props.countriesElementRef;
										typeof _ref$ === "function" ? _ref$(r$) : props.countriesElementRef = r$;
									},
									clickable: openCountriesPicker,
									get children() {
										return [createComponent(Row.Title, { get children() {
											return createComponent(I18nTsx, { key: "NewPoll.AllowedCountries" });
										} }), createComponent(Row.RightContent, {
											get ["class"]() {
												return styles_module_default.pollDuration;
											},
											get children() {
												return getCountriesLabel();
											}
										})];
									}
								}));
								return _el$;
							}
						});
					} })
				];
			}
		}),
		createComponent(SettingsOption, {
			title: "NewPoll.LimitDuration",
			subtitle: "NewPoll.LimitDurationSubtitle",
			icon: "timer_filled",
			get checked() {
				return context.store.durationLimited;
			},
			get onClick() {
				return handleSettingsFlag("durationLimited");
			}
		}),
		createComponent(HeightTransition, {
			onAfterEnter: () => limitDurationExtraElement()?.scrollIntoView({
				behavior: smoothScrollBehavior(),
				block: "center"
			}),
			get children() {
				return createComponent(Show, {
					get when() {
						return context.store.durationLimited;
					},
					get children() {
						var _el$2 = _tmpl$2(), _el$3 = _el$2.firstChild, _el$4 = _el$3.firstChild, _el$5 = _el$3.nextSibling;
						use(setLimitDurationExtraElement, _el$2);
						insert(_el$2, createComponent(Space, { amount: "0.25rem" }), _el$3);
						insert(_el$2, createComponent(Space, { amount: "0.25rem" }), _el$5);
						insert(_el$5, createComponent(Row, {
							ref: setPollDurationRowElement,
							clickable: () => setIsDurationMenuOpen((prev) => !prev),
							get children() {
								return [createComponent(Row.Title, { get children() {
									return createComponent(I18nTsx, { key: "NewPoll.PollDuration" });
								} }), createComponent(Row.RightContent, {
									get ["class"]() {
										return styles_module_default.pollDuration;
									},
									get children() {
										return [createComponent(Show, {
											get when() {
												return memo(() => context.store.timeLimit?.type === "duration")() && context.store.timeLimit.duration;
											},
											keyed: true,
											children: (duration) => wrapFormattedDuration(formatDuration(duration))
										}), createComponent(Show, {
											get when() {
												return memo(() => context.store.timeLimit?.type === "timestamp")() && context.store.timeLimit.timestamp;
											},
											keyed: true,
											children: (timestamp) => formatTimeInSpan(timestamp)
										})];
									}
								})];
							}
						}));
						insert(_el$2, createComponent(Row, { get children() {
							return [
								createComponent(Row.CheckboxFieldToggle, { get children() {
									return createComponent(CheckboxFieldTsx, {
										toggle: true,
										get checked() {
											return context.store.hideResults;
										},
										get onChange() {
											return handleSettingsFlag("hideResults");
										}
									});
								} }),
								createComponent(Row.Title, { get children() {
									return createComponent(I18nTsx, { key: "NewPoll.HideResults" });
								} }),
								createComponent(Row.Subtitle, { get children() {
									return createComponent(I18nTsx, { key: "NewPoll.HideResultsSubtitle" });
								} })
							];
						} }), null);
						createRenderEffect((_p$) => {
							var _v$ = !isDurationMenuOpen() ? "hidden" : void 0, _v$2 = styles_module_default.smallerHrWrapper, _v$3 = styles_module_default.hr;
							_v$ !== _p$.e && setStyleProperty(_el$2, "overflow", _p$.e = _v$);
							_v$2 !== _p$.t && className(_el$3, _p$.t = _v$2);
							_v$3 !== _p$.a && className(_el$4, _p$.a = _v$3);
							return _p$;
						}, {
							e: void 0,
							t: void 0,
							a: void 0
						});
						return _el$2;
					}
				});
			}
		}),
		createComponent(HeightTransition, {
			onAfterEnter: () => explanationElement()?.scrollIntoView({
				behavior: smoothScrollBehavior(),
				block: "center"
			}),
			get children() {
				return createComponent(Show, {
					get when() {
						return context.store.hasCorrectAnswer;
					},
					get children() {
						var _el$6 = _tmpl$();
						use(setExplanationElement, _el$6);
						insert(_el$6, createComponent(Space, { amount: "1rem" }), null);
						insert(_el$6, createComponent(SimpleFormField, {
							get value() {
								return context.store.explanation;
							},
							get ["class"]() {
								return classNames(styles_module_default.flexFull, styles_module_default.formField);
							},
							withEndButtonIcon: true,
							withMinHeight: true,
							isMarkupTooltipHost: true,
							get onClick() {
								return createFormFieldClickHandler(explanationInput);
							},
							get children() {
								return [
									createComponent(SimpleFormField.InputStub, { get children() {
										return explanationInput.input;
									} }),
									createComponent(SimpleFormField.Label, { get children() {
										return createComponent(I18nTsx, { key: "NewPoll.Explanation.Placeholder" });
									} }),
									createComponent(SimpleFormField.SideContent, {
										withFixedIcon: true,
										first: true,
										last: true,
										get children() {
											return createComponent(EmojiButtonWithOpacity, {
												"class": interactableClass,
												inputField: explanationInput
											});
										}
									}),
									createComponent(Show, {
										get when() {
											return supportsMedia("photo") || supportsMedia("video");
										},
										get children() {
											return createComponent(SimpleFormField.WithAutoLengthCounter, {
												get maxLength() {
													return maxExplanationLength();
												},
												get first() {
													return !context.store.explanationAttachment;
												},
												last: true,
												withFixedIcon: true,
												get children() {
													return createComponent(MediaAttachment, {
														btnClass: interactableClass,
														get supportedMediaTypes() {
															return [
																...supportsMedia("photo") ? ["photo"] : [],
																...supportsMedia("video") ? ["video"] : [],
																...supportsMedia("gif") ? ["gif"] : []
															];
														},
														get imgClass() {
															return styles_module_default.mediaAttachmentImage;
														},
														get attachedMedia() {
															return context.store.explanationAttachment;
														},
														onAttach: (value) => context.setStore("explanationAttachment", value)
													});
												}
											});
										}
									})
								];
							}
						}), null);
						return _el$6;
					}
				});
			}
		})
	];
};
var SettingsOption = (props) => {
	const { Row } = useHotReloadGuard();
	return createComponent(Row, {
		get disabled() {
			return props.disabled;
		},
		get children() {
			return [
				createComponent(Row.CheckboxFieldToggle, { get children() {
					return createComponent(CheckboxFieldTsx, {
						toggle: true,
						get checked() {
							return props.checked;
						},
						get disabled() {
							return props.disabled;
						},
						get lockIcon() {
							return props.disabled ? "lock" : void 0;
						},
						onChange: () => props.onClick?.()
					});
				} }),
				createComponent(Row.Icon, { get icon() {
					return props.icon;
				} }),
				createComponent(Row.Title, { get children() {
					return createComponent(I18nTsx, { get key() {
						return props.title;
					} });
				} }),
				createComponent(Row.Subtitle, { get children() {
					return createComponent(I18nTsx, { get key() {
						return props.subtitle;
					} });
				} })
			];
		}
	});
};
var durationOptions = [
	oneHourInSeconds,
	oneHourInSeconds * 3,
	oneHourInSeconds * 8,
	oneDayInSeconds,
	oneDayInSeconds * 3,
	oneWeekInSeconds
];
var usePollDurationMenu = (args) => {
	const { ButtonMenuSync } = useHotReloadGuard();
	const { closePeriodMax } = useCreatePollLimits();
	const format = (duration) => wrapFormattedDuration(formatDuration(duration, 1));
	const isCleaned = useIsCleaned();
	createEffect(on(args.open, (open) => {
		if (!open) return;
		const buttonMenu = ButtonMenuSync({ buttons: [...durationOptions.map((duration) => ({
			iconElement: createAutoDeleteIcon(duration),
			regularText: format(duration),
			onClick: () => {
				args.onOptionClick(duration);
			}
		})), {
			icon: "tools",
			text: "Other",
			onClick: () => {
				const minTimeDate = /* @__PURE__ */ new Date();
				minTimeDate.setMinutes(minTimeDate.getMinutes() + minEndTimeFromNowMinutes);
				const minDate = new Date(minTimeDate);
				minDate.setHours(0, 0, 0, 0);
				const maxDate = new Date(minDate);
				maxDate.setDate(maxDate.getDate() + Math.floor(closePeriodMax() / oneDayInSeconds));
				showDatePickerPopup({
					initDate: new Date(minTimeDate),
					minSendDateLangKey: "NewPoll.MinEndTime",
					minDate,
					minTimeDate,
					maxDate,
					withTime: true,
					onPick: (timestamp) => {
						args.onCustomTimestamp(timestamp);
					},
					sendTodayLangKey: "NewPoll.EndToday",
					sendDateLangKey: "NewPoll.EndDate"
				});
			}
		}] });
		buttonMenu.classList.add(styles_module_default.pollDurationMenu);
		getOverlayRoot().appendChild(buttonMenu);
		requestRAF(() => {
			if (isCleaned()) return;
			positionFloatingMenu(args.container().getBoundingClientRect(), buttonMenu, "top-end");
			contextMenuController.openBtnMenu(buttonMenu, async () => {
				await pause(400);
				args.onClose?.();
			});
		});
		onCleanup(() => {
			buttonMenu.remove();
		});
	}));
};
//#endregion
//#region src/components/popups/createPoll/index.tsx
var CreatePollPopup = (props) => {
	const { confirmationPopup } = useHotReloadGuard();
	const context = createPollStoreContextValue({
		isBroadcast: () => props.isBroadcast ?? false,
		supportedMediaTypes: () => props.supportedMediaTypes ?? [],
		quiz: props.quiz
	});
	const [countriesElement, setCountriesElement] = createSignal();
	const { SnitchPopupContext, popupContext } = useSnitchedPopupContext();
	const isConfirmationNeededOnClose = () => {
		if (!hasMeaningfulChanges(context.store)) return false;
		return confirmationPopup({
			titleLangKey: "CancelPollAlertTitle",
			descriptionLangKey: "CancelPollAlertText",
			button: {
				langKey: "Discard",
				isDanger: true
			}
		});
	};
	return createComponent(PopupElement, {
		show: true,
		get ["class"]() {
			return styles_module_default.popup;
		},
		get containerClass() {
			return styles_module_default.container;
		},
		isConfirmationNeededOnClose,
		get children() {
			return [createComponent(SnitchPopupContext, {}), createComponent(CreatePollContext.Provider, {
				value: context,
				get children() {
					return [createComponent(Header, { onSubmit: () => {
						if (!validateCountryRestriction(context.store, context.isBroadcast(), () => toastNew({ langPackKey: "NewPoll.ChooseCountry" }), countriesElement())) return;
						props.onSubmit(getFinalPayload(context));
						popupContext()?.destroy();
					} }), createComponent(PopupElement.Body, { get children() {
						return createComponent(BodyContent, { setCountriesElement });
					} })];
				}
			})];
		}
	});
};
var Header = (props) => {
	const canSubmit = useCanSubmit();
	return createComponent(PopupElement.Header, { get children() {
		return [
			createComponent(PopupElement.CloseButton, {}),
			createComponent(PopupElement.Title, { get children() {
				return createComponent(I18nTsx, { key: "NewPoll" });
			} }),
			createComponent(Button, {
				get ["class"]() {
					return styles_module_default.confirmButton;
				},
				primaryFilled: true,
				get onClick() {
					return props.onSubmit;
				},
				get disabled() {
					return !canSubmit();
				},
				get children() {
					return createComponent(I18nTsx, { key: "Create" });
				}
			})
		];
	} });
};
var QuestionAndDescription = () => {
	const context = useCreatePollContext();
	const { maxQuestionLength, maxDescriptionLength } = useCreatePollLimits();
	const supportsMedia = useSupportsMedia();
	const questionInput = new InputField({
		canWrapCustomEmojis: true,
		onRawInput: () => {
			const { value, entities } = getRichValueWithCaret(questionInput.input);
			context.setStore({
				question: value,
				questionEntities: entities
			});
		}
	});
	const questionInputEditor = attachPlainMessageEditor(questionInput.input);
	onCleanup(() => questionInputEditor.destroy());
	questionInput.input.classList.replace("input-field-input", editableFieldContent_module_default.editableFieldContent);
	questionInput.input.setAttribute("aria-label", langPack_default.format("AskAQuestion", true));
	const descriptionInput = new InputField({
		canHaveFormatting: supportedDescriptionFormattingTypes,
		canWrapCustomEmojis: true,
		withLinebreaks: true,
		onRawInput: () => {
			const { value, entities } = getRichValueWithCaret(descriptionInput.input);
			context.setStore({
				description: value,
				descriptionEntities: entities
			});
		}
	});
	const descriptionInputEditor = attachPlainMessageEditor(descriptionInput.input);
	onCleanup(() => descriptionInputEditor.destroy());
	descriptionInput.input.classList.replace("input-field-input", editableFieldContent_module_default.editableFieldContent);
	return [
		createComponent(SimpleFormField, {
			get value() {
				return context.store.question;
			},
			get ["class"]() {
				return classNames(styles_module_default.flexFull, styles_module_default.formField);
			},
			withEndButtonIcon: true,
			withMinHeight: true,
			get onClick() {
				return createFormFieldClickHandler(questionInput);
			},
			get children() {
				return [
					createComponent(SimpleFormField.InputStub, { get children() {
						return questionInput.input;
					} }),
					createComponent(SimpleFormField.Label, {
						get maxLength() {
							return maxQuestionLength();
						},
						get children() {
							return createComponent(I18nTsx, { key: "AskAQuestion" });
						}
					}),
					createComponent(SimpleFormField.SideContent, {
						withFixedIcon: true,
						first: true,
						last: true,
						get children() {
							return createComponent(EmojiButtonWithOpacity, {
								"class": interactableClass,
								inputField: questionInput
							});
						}
					})
				];
			}
		}),
		createComponent(Space, {
			amount: "1rem",
			get ["class"]() {
				return styles_module_default.flexFull;
			}
		}),
		createComponent(SimpleFormField, {
			get value() {
				return context.store.description;
			},
			get ["class"]() {
				return classNames(styles_module_default.flexFull, styles_module_default.formField);
			},
			withEndButtonIcon: true,
			withMinHeight: true,
			isMarkupTooltipHost: true,
			get onClick() {
				return createFormFieldClickHandler(descriptionInput);
			},
			get children() {
				return [
					createComponent(SimpleFormField.InputStub, { get children() {
						return descriptionInput.input;
					} }),
					createComponent(SimpleFormField.Label, { get children() {
						return createComponent(I18nTsx, { key: "DescriptionOptionalPlaceholder" });
					} }),
					createComponent(SimpleFormField.SideContent, {
						withFixedIcon: true,
						first: true,
						last: true,
						get children() {
							return createComponent(EmojiButtonWithOpacity, {
								"class": interactableClass,
								inputField: descriptionInput
							});
						}
					}),
					createComponent(Show, {
						get when() {
							return supportsMedia("photo") || supportsMedia("video");
						},
						get children() {
							return createComponent(SimpleFormField.WithAutoLengthCounter, {
								get maxLength() {
									return maxDescriptionLength();
								},
								get first() {
									return !context.store.descriptionAttachment;
								},
								last: true,
								withFixedIcon: true,
								get children() {
									return createComponent(MediaAttachment, {
										btnClass: interactableClass,
										get supportedMediaTypes() {
											return [
												...supportsMedia("photo") ? ["photo"] : [],
												...supportsMedia("video") ? ["video"] : [],
												...supportsMedia("gif") ? ["gif"] : []
											];
										},
										get imgClass() {
											return styles_module_default.mediaAttachmentImage;
										},
										get attachedMedia() {
											return context.store.descriptionAttachment;
										},
										onAttach: (value) => context.setStore("descriptionAttachment", value)
									});
								}
							});
						}
					})
				];
			}
		})
	];
};
var BodyContent = (props) => {
	const context = useCreatePollContext();
	const [scrollable, setScrollable] = createSignal();
	const visibleOptionsLeft = useVisibleOptionsLeft();
	return createComponent(PopupElement.Scrollable, {
		ref: setScrollable,
		get children() {
			return [
				createComponent(Section, { get children() {
					return createComponent(QuestionAndDescription, {});
				} }),
				createComponent(Section, {
					name: "PollOptions",
					get caption() {
						return createComponent(Show, {
							get when() {
								return visibleOptionsLeft() > 0;
							},
							get fallback() {
								return createComponent(I18nTsx, { key: "NewPoll.MaxOptions" });
							},
							get children() {
								return createComponent(I18nTsx, {
									key: "NewPoll.OptionsLeft",
									get args() {
										return visibleOptionsLeft().toString();
									}
								});
							}
						});
					},
					get children() {
						return createComponent(PollOptionsSectionContent, { get scrollable() {
							return scrollable();
						} });
					}
				}),
				createComponent(Section, {
					name: "Settings",
					get caption() {
						return memo(() => !!context.store.hasCorrectAnswer)() ? createComponent(I18nTsx, { key: "AddAnExplanationInfo" }) : void 0;
					},
					get children() {
						return createComponent(PollSettingsSectionContent, { get countriesElementRef() {
							return props.setCountriesElement;
						} });
					}
				})
			];
		}
	});
};
function openCreatePollPopup(props, HotReloadGuard) {
	createPopup(() => createComponent(HotReloadGuard, { get children() {
		return createComponent(CreatePollPopup, props);
	} }));
}
//#endregion
export { openCreatePollPopup };
