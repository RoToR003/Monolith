//# allFunctionsCalledOnLoad
import { n as appNavigationController } from "./appNavigationController-Ct0fx8yF.js";
import { V as usePeer } from "./apiManagerProxy-DmQXvxSF.js";
import { u as langPack_default } from "./langPack-BmdJGr44.js";
import { A as mergeProps, C as createSignal, I as splitProps, L as untrack, M as onCleanup, N as onMount, R as useContext, S as createSelector, _ as createMemo, b as createResource, d as batch, g as createEffect, h as createContext, i as For, m as createComputed, o as Match, p as createComponent, s as Show, u as Switch, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { t as clamp } from "./clamp-9UaNhw6N.js";
import { a as reconcile, n as createStore, o as unwrap } from "./store-PwRn5fa3.js";
import { s as useAppConfig } from "./contentSettings-DMhHR-0w.js";
import { _ as use, a as classList, c as insert, f as setAttribute, g as template, m as spread, o as className, p as setStyleProperty, r as addEventListener, s as delegateEvents, u as memo } from "./web-BPyQozky.js";
import { r as useHotReloadGuard } from "./hotReloadGuard-BUNVkeQ4.js";
import { n as mediaSizes } from "./mediaSizes-C1MTaleW.js";
import { t as ripple } from "./ripple-D7hcIc_t.js";
import { t as classNames } from "./classNames-DxGDjmvw.js";
import { t as IconTsx } from "./iconTsx-B4lOk4A6.js";
import { n as attachHotClassName } from "./classname-DB9i2ReQ.js";
import { t as I18nTsx } from "./i18n-CGMFiAW0.js";
import { t as placeCaretAtEnd } from "./placeCaretAtEnd-BtAUyd5U.js";
import { o as createMiddleware } from "./sticker-5twBOy1Y.js";
import { t as requestRAF } from "./requestRAF-CwdYaVwH.js";
import { t as animateValue } from "./animateValue-C0de6s5K.js";
import { s as getRichValueWithCaret, t as InputField } from "./inputField-CaCo30N0.js";
import { t as Transition } from "./transition-Cmlc134D.js";
import { t as TransitionGroup } from "./transitionGroup-yCGzBwpt.js";
import { et as sliceTextWithEntities } from "./confirmationPopup-Bz6mK0o-.js";
import { At as compareUint8Arrays, Gt as POLL_VOTE_RESTRICTION_EXPIRY, Jt as getPollVoteRestrictionPeerId, Kt as getActivePollVoteRestriction, Qt as parsePollVoteRestrictionError, Xt as isPollVoteRestrictionActive, Yt as isExpiringPollVoteRestriction, Zt as isRegularPollMessage, qt as getPollVotePrecheckRestriction } from "./getChatMigratedTo-ChhMNXuu.js";
import { U as getPeerId } from "./canPollPeerStories-D3HoBvLX.js";
import { t as subscribeOn } from "./subscribeOn-DnCla7ws.js";
import { Qt as wrapAsyncClickHandler, Xt as PhotoTsx } from "./appDialogsManager-CXguiKc3.js";
import { C as ButtonIconTsx, M as useIsCleaned, v as supportsVideoEncoding } from "./openEditors-7FmA7q_V.js";
import { r as toastNew } from "./toast-B6VD5M7R.js";
import { t as formatNumber } from "./formatNumber-B_dJh0pa.js";
import { t as Space } from "./space-XGOOgiuc.js";
import { a as EmojiDropdownButton, i as StickerPreview, n as MediaAttachment, o as useCreatePollLimits, r as openPollLinkPreviewPopup, t as createDelayed } from "./createDelayed--JKseGyg.js";
import { $ as getPollVoteRestrictionText, Q as getPollVoteRestrictionDisplayState, _t as Spinner, et as shouldShufflePollOptions, fn as RemainingTime, gt as createMessageSpoilerOverlay, tt as shufflePollOptions } from "./emoticonsDropdown-Cb_qGCUN.js";
import { n as VideoTsx, t as getRoundedPercentsFromResults } from "./roundPercents-DrhqyRzz.js";
import { t as attachPlainMessageEditor } from "./plainField-DIjPnqVa.js";
import { p as StaticCheckbox } from "./geoPin-BKDcrfIw.js";
import { h as ConfettiContainer } from "./payment-BzrfNdna.js";
import { t as createMutation } from "./createMutation-BLuhs8D-.js";
//#region src/components/chat/bubbleParts/pollMessageContent/context.ts
var PollMessageContentPropsContext = createContext();
var usePollMessageContentProps = () => {
	return useContext(PollMessageContentPropsContext);
};
var styles_module_default = {
	container: "_container_us6s0_16",
	pollOption: "_pollOption_us6s0_23",
	hasMedia: "_hasMedia_us6s0_32",
	pollOptionMedia: "_pollOptionMedia_us6s0_35",
	stripped: "_stripped_us6s0_44",
	clickable: "_clickable_us6s0_48",
	pollOptionMediaAttachImg: "_pollOptionMediaAttachImg_us6s0_52",
	pollOptionMediaAttachBtn: "_pollOptionMediaAttachBtn_us6s0_58",
	outgoing: "_outgoing_us6s0_73",
	pollOptionMediaDim: "_pollOptionMediaDim_us6s0_81",
	pollOptionMediaPlay: "_pollOptionMediaPlay_us6s0_90",
	pollOptionMediaGifLabel: "_pollOptionMediaGifLabel_us6s0_95",
	pollOptionMediaLinkPhoto: "_pollOptionMediaLinkPhoto_us6s0_101",
	pollOptionMediaWebPage: "_pollOptionMediaWebPage_us6s0_113",
	withPhoto: "_withPhoto_us6s0_113",
	pollOptionMediaLinkOverlay: "_pollOptionMediaLinkOverlay_us6s0_116",
	pollOptionMediaLinkIcon: "_pollOptionMediaLinkIcon_us6s0_123",
	pollOptionGeo: "_pollOptionGeo_us6s0_145",
	pollOptionSpacerFirst: "_pollOptionSpacerFirst_us6s0_156",
	pollOptionSpacerLast: "_pollOptionSpacerLast_us6s0_160",
	isAddOption: "_isAddOption_us6s0_164",
	isIncoming: "_isIncoming_us6s0_164",
	isOutgoing: "_isOutgoing_us6s0_167",
	clickableArea: "_clickableArea_us6s0_174",
	hoveredTransition: "_hoveredTransition_us6s0_200",
	hovered: "_hovered_us6s0_200",
	labelRow: "_labelRow_us6s0_207",
	labelText: "_labelText_us6s0_215",
	labelStats: "_labelStats_us6s0_218",
	labelNumber: "_labelNumber_us6s0_224",
	labelProgress: "_labelProgress_us6s0_230",
	labelProgressFill: "_labelProgressFill_us6s0_244",
	correct: "_correct_us6s0_255",
	wrong: "_wrong_us6s0_258",
	checkContainer: "_checkContainer_us6s0_262",
	checkbox: "_checkbox_us6s0_268",
	percent: "_percent_us6s0_275",
	chosenCheckbox: "_chosenCheckbox_us6s0_286",
	chosenCheckboxDot: "_chosenCheckboxDot_us6s0_300",
	footer: "_footer_us6s0_317",
	footerButton: "_footerButton_us6s0_324",
	header: "_header_us6s0_364",
	headerTitleContainer: "_headerTitleContainer_us6s0_371",
	headerTitle: "_headerTitle_us6s0_371",
	headerSubtitle: "_headerSubtitle_us6s0_380",
	avatarGroup: "_avatarGroup_us6s0_389",
	avatarGroupItem: "_avatarGroupItem_us6s0_397",
	pushOverNext: "_pushOverNext_us6s0_401",
	avatarGroupItemWrapper: "_avatarGroupItemWrapper_us6s0_404",
	addOptionPlus: "_addOptionPlus_us6s0_414",
	emojiDropdownButton: "_emojiDropdownButton_us6s0_422",
	inputFieldInternals: "_inputFieldInternals_us6s0_447",
	inputFieldInput: "_inputFieldInput_us6s0_452",
	inputFieldPlaceholder: "_inputFieldPlaceholder_us6s0_456",
	explanation: "_explanation_us6s0_462",
	explanationDocument: "_explanationDocument_us6s0_467",
	explanationText: "_explanationText_us6s0_471",
	explanationMedia: "_explanationMedia_us6s0_474",
	explanationWebPage: "_explanationWebPage_us6s0_481",
	description: "_description_us6s0_485",
	pollDescriptionMedia: "_pollDescriptionMedia_us6s0_493",
	pollDescriptionMediaWrapper: "_pollDescriptionMediaWrapper_us6s0_501",
	pollDescriptionWebPage: "_pollDescriptionWebPage_us6s0_505",
	pollWebPageMedia: "_pollWebPageMedia_us6s0_516",
	pollDocumentWrapper: "_pollDocumentWrapper_us6s0_520",
	pathDot: "_pathDot_us6s0_524",
	timer: "_timer_us6s0_531",
	spinnerContainer: "_spinnerContainer_us6s0_541",
	pointerDisabled: "_pointerDisabled_us6s0_559",
	geo: "_geo_us6s0_145"
};
//#endregion
//#region src/components/chat/bubbleParts/pollMessageContent/utils.ts
var dataPollViewerIdx = (el, payload) => {
	createEffect(() => {
		const [idx, map] = payload();
		if (idx === void 0) return;
		el.dataset.pollViewerIdx = idx.toString();
		map.set(idx, el);
		onCleanup(() => {
			map.delete(idx);
		});
	});
};
var attachSpoilerOverlay = (descriptionElement, props) => {
	const { HotReloadGuard } = useHotReloadGuard();
	const isCleaned = useIsCleaned();
	let cleanup;
	onCleanup(() => {
		cleanup?.();
	});
	(async () => {
		await Promise.all(unwrap(props.loadPromises) || []);
		if (isCleaned() || !descriptionElement.querySelector(".spoiler-text")) return;
		const spoilerOverlay = createMessageSpoilerOverlay({
			mid: props.message.mid,
			messageElement: descriptionElement,
			animationGroup: props.animationGroup || "none"
		}, HotReloadGuard);
		descriptionElement.append(spoilerOverlay.element);
		cleanup = () => {
			spoilerOverlay.dispose();
		};
	})();
};
var spinnerThickness = 2 / 12;
var useChatRights = ({ peerId, rights, getRight }) => {
	const { rootScope } = useHotReloadGuard();
	const [ready, setReady] = createSignal(false);
	const [values, setValues] = createSignal({});
	createEffect(() => {
		const keys = rights();
		let cancelled = false;
		setReady(false);
		setValues({});
		const refresh = async () => {
			const results = await Promise.all(keys.map((k) => getRight(k)));
			if (cancelled) return;
			const map = {};
			keys.forEach((k, i) => {
				map[k] = results[i];
			});
			batch(() => {
				setValues(map);
				setReady(true);
			});
		};
		const onChatUpdate = (chatId) => {
			if (peerId() !== chatId.toPeerId(true)) return;
			refresh();
		};
		subscribeOn(rootScope)("chat_update", onChatUpdate);
		onCleanup(() => {
			cancelled = true;
		});
		refresh();
	});
	const hasRight = (key) => {
		if (!ready()) return false;
		return values()[key] ?? false;
	};
	return {
		ready,
		hasRight
	};
};
var hasSelectedCorrectAnswers = (poll) => {
	if (poll.chosenIndexes?.length !== poll.correctIndexes?.length || !poll.chosenIndexes?.length) return false;
	const set = new Set(poll.correctIndexes);
	return poll.chosenIndexes?.every((i) => set.has(i)) ?? false;
};
//#endregion
//#region src/components/chat/bubbleParts/pollMessageContent/AddOption.tsx
var _tmpl$$5 = /*#__PURE__*/ template(`<div role=button>`);
var _tmpl$2$3 = /*#__PURE__*/ template(`<div>`);
var _tmpl$3$3 = /*#__PURE__*/ template(`<div><div></div><div></div><div><div></div></div><div></div><div>`);
var AddOption = (props) => {
	const contextProps = usePollMessageContentProps();
	const chatRights = useChatRights({
		peerId: () => contextProps.message.peerId,
		rights: () => [
			"send_photos",
			"send_stickers",
			"send_gifs",
			"send_videos"
		],
		getRight: (key) => contextProps.canSend(key)
	});
	const [canEncodeVideoResource] = createResource(() => supportsVideoEncoding());
	const canEncodeVideo = () => canEncodeVideoResource.state === "ready" && !!canEncodeVideoResource();
	const supportedMediaTypes = createMemo(() => {
		return [
			...chatRights.hasRight("send_photos") ? ["photo"] : [],
			...chatRights.hasRight("send_stickers") ? ["sticker"] : [],
			...chatRights.hasRight("send_gifs") && canEncodeVideo() ? ["gif"] : [],
			...chatRights.hasRight("send_videos") && canEncodeVideo() ? ["video"] : [],
			"link"
		];
	});
	const active = () => props.active;
	const delayedIsPending = createDelayed(() => props.isPending, false, (value) => value ? 200 : -1);
	const inputField = new InputField({
		placeholder: "NewPoll.Option",
		canWrapCustomEmojis: true,
		onRawInput: () => {
			const { value, entities } = getRichValueWithCaret(inputField.input, true, false);
			props.onPartialChange({
				text: value,
				entities
			});
		}
	});
	const inputFieldEditor = attachPlainMessageEditor(inputField.input);
	onCleanup(() => inputFieldEditor.destroy());
	inputField.input.classList.add(styles_module_default.inputFieldInput);
	inputField.placeholder.classList.add(...[styles_module_default.inputFieldPlaceholder, contextProps.isOutgoing ? styles_module_default.outgoing : null].filter(Boolean));
	const deactivate = () => {
		if (!props.value) props.onPartialChange({ attachment: void 0 });
		props.onActiveChange(false);
	};
	inputField.input.addEventListener("keydown", (e) => {
		if (e.key === "Enter") props.onEnter?.();
		if (e.key === "Backspace" && props.value === "") {
			e.preventDefault();
			deactivate();
		}
	});
	props.inputFieldRef(inputField);
	createEffect(() => {
		if (!active()) return;
		const navigationItem = {
			type: "inline-message-input",
			onPop: () => void deactivate()
		};
		const existing = appNavigationController.findItemByType("inline-message-input");
		if (existing) appNavigationController.backByItem(existing.item);
		appNavigationController.pushItem(navigationItem);
		onCleanup(() => {
			appNavigationController.removeItem(navigationItem);
		});
	});
	createEffect(() => {
		if (props.isPending) {
			inputFieldEditor.setEditable(false);
			onCleanup(() => {
				inputFieldEditor.setEditable(true);
			});
		}
	});
	const onAfterEnter = () => {
		if (active()) inputField.input.focus();
	};
	return (() => {
		var _el$ = _tmpl$3$3(), _el$3 = _el$.firstChild, _el$5 = _el$3.nextSibling, _el$6 = _el$5.nextSibling, _el$7 = _el$6.firstChild, _el$9 = _el$6.nextSibling, _el$0 = _el$9.nextSibling;
		insert(_el$, createComponent(Transition, {
			name: "fade-4",
			mode: "outin",
			duration: 400,
			get children() {
				return createComponent(Show, {
					get when() {
						return !active();
					},
					get children() {
						var _el$2 = _tmpl$$5();
						_el$2.$$keydown = (event) => {
							if (event.key !== "Enter" && event.key !== " ") return;
							event.preventDefault();
							props.onActiveChange(true);
						};
						_el$2.$$click = () => props.onActiveChange(true);
						use(ripple, _el$2, () => !active());
						createRenderEffect((_p$) => {
							var _v$ = styles_module_default.clickableArea, _v$2 = {
								[styles_module_default.outgoing]: contextProps.isOutgoing,
								[styles_module_default.pointerDisabled]: active()
							}, _v$3 = active() ? -1 : 0, _v$4 = langPack_default.i18n("Chat.Poll.AddAnOption").textContent;
							_v$ !== _p$.e && className(_el$2, _p$.e = _v$);
							_p$.t = classList(_el$2, _v$2, _p$.t);
							_v$3 !== _p$.a && setAttribute(_el$2, "tabindex", _p$.a = _v$3);
							_v$4 !== _p$.o && setAttribute(_el$2, "aria-label", _p$.o = _v$4);
							return _p$;
						}, {
							e: void 0,
							t: void 0,
							a: void 0,
							o: void 0
						});
						return _el$2;
					}
				});
			}
		}), _el$3);
		insert(_el$3, createComponent(Transition, {
			name: "fade",
			mode: "outin",
			get children() {
				return createComponent(Switch, { get children() {
					return [
						createComponent(Match, {
							get when() {
								return !active();
							},
							get children() {
								return createComponent(IconTsx, {
									icon: "add",
									get ["class"]() {
										return styles_module_default.addOptionPlus;
									}
								});
							}
						}),
						createComponent(Match, {
							get when() {
								return delayedIsPending();
							},
							get children() {
								var _el$4 = _tmpl$2$3();
								insert(_el$4, createComponent(Spinner, { thickness: spinnerThickness }));
								createRenderEffect(() => className(_el$4, styles_module_default.spinnerContainer));
								return _el$4;
							}
						}),
						createComponent(Match, {
							get when() {
								return active();
							},
							get children() {
								return createComponent(EmojiDropdownButton, {
									get ["class"]() {
										return classNames(styles_module_default.emojiDropdownButton, props.isPending && styles_module_default.pointerDisabled);
									},
									inputField
								});
							}
						})
					];
				} });
			}
		}));
		insert(_el$7, createComponent(Transition, {
			name: "fade",
			mode: "outin",
			onAfterEnter,
			get children() {
				return createComponent(Show, {
					get when() {
						return active();
					},
					get fallback() {
						return createComponent(I18nTsx, { key: "Chat.Poll.AddAnOption" });
					},
					get children() {
						var _el$8 = _tmpl$2$3();
						insert(_el$8, () => inputField.input, null);
						insert(_el$8, () => inputField.placeholder, null);
						createRenderEffect(() => className(_el$8, styles_module_default.inputFieldInternals));
						return _el$8;
					}
				});
			}
		}));
		insert(_el$0, createComponent(Show, {
			get when() {
				return memo(() => !!active())() && supportedMediaTypes().filter((t) => t !== "gif").length > 0;
			},
			get children() {
				return createComponent(MediaAttachment, {
					get supportedMediaTypes() {
						return supportedMediaTypes();
					},
					get btnClass() {
						return styles_module_default.pollOptionMediaAttachBtn;
					},
					get imgClass() {
						return styles_module_default.pollOptionMediaAttachImg;
					},
					get attachedMedia() {
						return props.attachment;
					},
					onLinkPopupClose: () => {
						if (inputField.input.isConnected) inputField.input.focus();
					},
					onAttach: (attachment) => props.onPartialChange({ attachment })
				});
			}
		}));
		createRenderEffect((_p$) => {
			var _v$5 = classNames(styles_module_default.pollOption, styles_module_default.hasMedia, styles_module_default.isAddOption), _v$6 = {
				[styles_module_default.isOutgoing]: contextProps.isOutgoing,
				[styles_module_default.isIncoming]: !contextProps.isOutgoing
			}, _v$7 = styles_module_default.checkContainer, _v$8 = styles_module_default.pollOptionSpacerFirst, _v$9 = styles_module_default.labelRow, _v$0 = styles_module_default.labelText, _v$1 = styles_module_default.pollOptionSpacerLast, _v$10 = styles_module_default.pollOptionMedia, _v$11 = {
				[styles_module_default.stripped]: !!props.attachment,
				[styles_module_default.clickable]: !!props.attachment,
				[styles_module_default.pointerDisabled]: props.isPending
			};
			_v$5 !== _p$.e && className(_el$, _p$.e = _v$5);
			_p$.t = classList(_el$, _v$6, _p$.t);
			_v$7 !== _p$.a && className(_el$3, _p$.a = _v$7);
			_v$8 !== _p$.o && className(_el$5, _p$.o = _v$8);
			_v$9 !== _p$.i && className(_el$6, _p$.i = _v$9);
			_v$0 !== _p$.n && className(_el$7, _p$.n = _v$0);
			_v$1 !== _p$.s && className(_el$9, _p$.s = _v$1);
			_v$10 !== _p$.h && className(_el$0, _p$.h = _v$10);
			_p$.r = classList(_el$0, _v$11, _p$.r);
			return _p$;
		}, {
			e: void 0,
			t: void 0,
			a: void 0,
			o: void 0,
			i: void 0,
			n: void 0,
			s: void 0,
			h: void 0,
			r: void 0
		});
		return _el$;
	})();
};
delegateEvents(["click", "keydown"]);
//#endregion
//#region src/components/chat/bubbleParts/pollMessageContent/PollWebPageMedia.tsx
var _tmpl$$4 = /*#__PURE__*/ template(`<div>`);
var boxSize$1 = 32;
var PollWebPageMedia = (props) => {
	const { HotReloadGuard } = useHotReloadGuard();
	const contextProps = usePollMessageContentProps();
	const openPreview = (trigger) => {
		if (!props.webPage.url) return;
		openPollLinkPreviewPopup({
			url: props.webPage.url,
			preview: props.webPage.media,
			message: contextProps.message,
			onClose: () => {
				if (trigger.isConnected) trigger.focus();
			}
		}, HotReloadGuard);
	};
	const handleClick = (event) => {
		if (!clickable()) return;
		event.preventDefault();
		event.stopPropagation();
		const trigger = event.currentTarget;
		trigger.focus();
		openPreview(trigger);
	};
	const handleKeyDown = (event) => {
		if (event.key !== "Enter" && event.key !== " ") return;
		event.preventDefault();
		event.stopPropagation();
		openPreview(event.currentTarget);
	};
	const compact = () => props.compact !== false;
	const clickable = () => !!props.webPage.url;
	return (() => {
		var _el$ = _tmpl$$4();
		addEventListener(_el$, "keydown", handleKeyDown);
		addEventListener(_el$, "click", handleClick);
		insert(_el$, createComponent(Show, {
			get when() {
				return props.webPage.photo;
			},
			keyed: true,
			children: (photo) => createComponent(PhotoTsx, {
				get ["class"]() {
					return styles_module_default.pollOptionMediaLinkPhoto;
				},
				photo,
				get boxWidth() {
					return compact() ? boxSize$1 : void 0;
				},
				get boxHeight() {
					return compact() ? boxSize$1 : void 0;
				},
				get loadPromises() {
					return unwrap(contextProps.loadPromises);
				},
				get autoDownloadSize() {
					return contextProps.autoDownload?.photo;
				},
				withoutPreloader: true
			})
		}), null);
		insert(_el$, createComponent(Show, {
			get when() {
				return props.webPage.photo;
			},
			get children() {
				var _el$2 = _tmpl$$4();
				createRenderEffect(() => className(_el$2, styles_module_default.pollOptionMediaLinkOverlay));
				return _el$2;
			}
		}), null);
		insert(_el$, createComponent(IconTsx, {
			icon: "link",
			get ["class"]() {
				return styles_module_default.pollOptionMediaLinkIcon;
			}
		}), null);
		createRenderEffect((_p$) => {
			var _v$ = classNames(styles_module_default.pollOptionMedia, styles_module_default.stripped, styles_module_default.pollWebPageMedia, props.class), _v$2 = {
				[styles_module_default.clickable]: clickable(),
				[styles_module_default.pollOptionMediaWebPage]: true,
				[styles_module_default.withPhoto]: !!props.webPage.photo
			}, _v$3 = clickable() ? "button" : void 0, _v$4 = clickable() ? 0 : void 0, _v$5 = clickable() ? props.webPage.url : void 0;
			_v$ !== _p$.e && className(_el$, _p$.e = _v$);
			_p$.t = classList(_el$, _v$2, _p$.t);
			_v$3 !== _p$.a && setAttribute(_el$, "role", _p$.a = _v$3);
			_v$4 !== _p$.o && setAttribute(_el$, "tabindex", _p$.o = _v$4);
			_v$5 !== _p$.i && setAttribute(_el$, "aria-label", _p$.i = _v$5);
			return _p$;
		}, {
			e: void 0,
			t: void 0,
			a: void 0,
			o: void 0,
			i: void 0
		});
		return _el$;
	})();
};
//#endregion
//#region src/components/chat/bubbleParts/pollMessageContent/parts.tsx
var _tmpl$$3 = /*#__PURE__*/ template(`<div>`);
var _tmpl$2$2 = /*#__PURE__*/ template(`<div><div>`);
var _tmpl$3$2 = /*#__PURE__*/ template(`<div><div class=reply-content><div class=reply-title>`);
var AvatarGroup = (props) => {
	const { AvatarNewTsx } = useHotReloadGuard();
	const contextProps = usePollMessageContentProps();
	return (() => {
		var _el$ = _tmpl$$3();
		insert(_el$, createComponent(For, {
			get each() {
				return props.peerIds.slice(0, 3);
			},
			children: (peerId, index) => (() => {
				var _el$2 = _tmpl$2$2(), _el$3 = _el$2.firstChild;
				insert(_el$3, createComponent(AvatarNewTsx, {
					size: 22,
					peerId
				}));
				createRenderEffect((_p$) => {
					var _v$ = styles_module_default.avatarGroupItem, _v$2 = {
						[styles_module_default.pushOverNext]: index() > 0,
						[styles_module_default.outgoing]: contextProps.isOutgoing
					}, _v$3 = styles_module_default.avatarGroupItemWrapper;
					_v$ !== _p$.e && className(_el$2, _p$.e = _v$);
					_p$.t = classList(_el$2, _v$2, _p$.t);
					_v$3 !== _p$.a && className(_el$3, _p$.a = _v$3);
					return _p$;
				}, {
					e: void 0,
					t: void 0,
					a: void 0
				});
				return _el$2;
			})()
		}));
		createRenderEffect(() => className(_el$, styles_module_default.avatarGroup));
		return _el$;
	})();
};
var Explanation = (props) => {
	const { TranslatableMessageTsx, DocumentTsx } = useHotReloadGuard();
	const contextProps = usePollMessageContentProps();
	const middleware = createMiddleware().get();
	return (() => {
		var _el$4 = _tmpl$3$2(), _el$5 = _el$4.firstChild, _el$6 = _el$5.firstChild;
		insert(_el$6, createComponent(I18nTsx, { key: "Chat.Quiz.Explanation" }));
		insert(_el$5, createComponent(Show, {
			get when() {
				return props.text;
			},
			get children() {
				var _el$7 = _tmpl$$3();
				insert(_el$7, createComponent(TranslatableMessageTsx, {
					get peerId() {
						return contextProps.peerId;
					},
					get textWithEntities() {
						return {
							_: "textWithEntities",
							text: props.text,
							entities: unwrap(props.entities)
						};
					},
					get richTextOptions() {
						return {
							middleware,
							loadPromises: unwrap(contextProps.loadPromises)
						};
					}
				}));
				createRenderEffect(() => className(_el$7, classNames(styles_module_default.explanationText, "reply-subtitle")));
				return _el$7;
			}
		}), null);
		insert(_el$5, createComponent(Show, {
			get when() {
				return props.webPage;
			},
			keyed: true,
			children: (webPage) => [createComponent(Space, { amount: "0.5rem" }), createComponent(PollWebPageMedia, {
				get ["class"]() {
					return styles_module_default.explanationWebPage;
				},
				webPage
			})]
		}), null);
		insert(_el$5, createComponent(Show, {
			get when() {
				return props.photo || props.video || props.geo;
			},
			get children() {
				return [createComponent(Space, { amount: "0.5rem" }), (() => {
					var _el$8 = _tmpl$$3();
					use(dataPollViewerIdx, _el$8, () => props.pollViewerPayload);
					insert(_el$8, createComponent(Switch, { get children() {
						return [
							createComponent(Match, {
								get when() {
									return props.photo;
								},
								get children() {
									return createComponent(PhotoTsx, {
										get photo() {
											return props.photo;
										},
										get loadPromises() {
											return unwrap(contextProps.loadPromises);
										},
										get autoDownloadSize() {
											return contextProps.autoDownload?.photo;
										},
										get uploadingFileName() {
											return contextProps.uploadingFileNames?.explanation;
										}
									});
								}
							}),
							createComponent(Match, {
								get when() {
									return props.video;
								},
								get children() {
									return createComponent(VideoTsx, {
										get doc() {
											return props.video;
										},
										get loadPromises() {
											return unwrap(contextProps.loadPromises);
										},
										get group() {
											return contextProps.animationGroup;
										},
										get autoDownload() {
											return unwrap(contextProps.autoDownload);
										},
										get boxWidth() {
											return mediaSizes.active.regular.width;
										},
										get boxHeight() {
											return mediaSizes.active.regular.height;
										},
										withPreview: true,
										get lazyLoadQueue() {
											return unwrap(contextProps.lazyLoadQueue) || void 0;
										},
										get observer() {
											return unwrap(contextProps.observer);
										},
										get uploadingFileName() {
											return contextProps.uploadingFileNames?.explanation;
										}
									});
								}
							}),
							createComponent(Match, {
								get when() {
									return props.geo;
								},
								get children() {
									return createComponent(GeoPreview, {
										get ["class"]() {
											return styles_module_default.geo;
										},
										get geo() {
											return props.geo;
										}
									});
								}
							})
						];
					} }));
					createRenderEffect(() => className(_el$8, styles_module_default.explanationMedia));
					return _el$8;
				})()];
			}
		}), null);
		insert(_el$5, createComponent(Show, {
			get when() {
				return memo(() => !!(props.document && !props.photo))() && !props.video;
			},
			get children() {
				return [createComponent(Space, { amount: "0.5rem" }), (() => {
					var _el$9 = _tmpl$$3();
					insert(_el$9, createComponent(DocumentTsx, {
						get message() {
							return contextProps.message;
						},
						get doc() {
							return props.document;
						},
						slot: .2,
						get loadPromises() {
							return unwrap(contextProps.loadPromises);
						},
						get lazyLoadQueue() {
							return unwrap(contextProps.lazyLoadQueue) || void 0;
						},
						get autoDownloadSize() {
							return contextProps.autoDownload?.file;
						},
						sizeType: "documentName",
						canTranscribeVoice: false,
						get uploadingFileName() {
							return contextProps.uploadingFileNames?.explanation;
						}
					}));
					createRenderEffect(() => className(_el$9, styles_module_default.explanationDocument));
					return _el$9;
				})()];
			}
		}), null);
		createRenderEffect(() => className(_el$4, "reply quote-like quote-like-border " + styles_module_default.explanation));
		return _el$4;
	})();
};
var PollType = (props) => {
	const key = createMemo(() => {
		if (props.closed) return "Chat.Poll.Type.Closed";
		if (props.hasCorrectAnswer) return props.showWhoVoted ? "Chat.Poll.Type.Quiz" : "Chat.Poll.Type.AnonymousQuiz";
		return props.showWhoVoted ? "Chat.Poll.Type.Public" : "Chat.Poll.Type.Anonymous";
	});
	return createComponent(I18nTsx, { get key() {
		return key();
	} });
};
var PollVotes = (props) => {
	const key = createMemo(() => {
		if (!props.votersCount) {
			if (props.closed) return "Chat.Poll.TotalVotesResultEmpty";
			else return "Chat.Poll.TotalVotesEmpty";
		}
		if (props.hasCorrectAnswer) return "Chat.Quiz.MembersAnswered";
		return "Chat.Poll.MembersVoted";
	});
	return createComponent(I18nTsx, {
		get key() {
			return key();
		},
		get args() {
			return [formatNumber(props.votersCount, 1)];
		}
	});
};
var AutoStartedConfetti = (props) => {
	let ref;
	onMount(() => {
		ref?.create({
			mode: "poppers",
			size: 4,
			speedScale: .6,
			count: 50
		});
	});
	return createComponent(ConfettiContainer, {
		get onEnd() {
			return props.onEnd;
		},
		ref(r$) {
			var _ref$ = ref;
			typeof _ref$ === "function" ? _ref$(r$) : ref = r$;
		}
	});
};
var GeoPreview = (props) => {
	const { wrapGeo } = useHotReloadGuard();
	const contextProps = usePollMessageContentProps();
	let attachmentDiv;
	onMount(() => {
		const middleware = createMiddleware().get();
		wrapGeo({
			messageMedia: props.geo,
			attachmentDiv,
			wrapOptions: {
				middleware,
				lazyLoadQueue: unwrap(contextProps.lazyLoadQueue) || void 0,
				animationGroup: contextProps.animationGroup
			},
			middleware,
			loadPromises: unwrap(contextProps.loadPromises) ?? [],
			date: contextProps.message.date
		});
	});
	return (() => {
		var _el$0 = _tmpl$$3();
		use((el) => attachmentDiv = el, _el$0);
		createRenderEffect(() => className(_el$0, props.class));
		return _el$0;
	})();
};
var inMessageCheckbox_module_default = { isOutgoing: "_isOutgoing_1asv0_1" };
//#endregion
//#region src/components/chat/bubbleParts/inMessageCheckbox.tsx
var InMessageCheckbox = (inProps) => {
	const [props, restProps] = splitProps(inProps, [
		"isOutgoing",
		"classList",
		"class"
	]);
	return createComponent(StaticCheckbox, mergeProps({
		get ["class"]() {
			return props.class;
		},
		get classList() {
			return {
				[inMessageCheckbox_module_default.isOutgoing]: props.isOutgoing,
				...props.classList
			};
		}
	}, restProps));
};
//#endregion
//#region src/components/chat/bubbleParts/pollMessageContent/PathDot.tsx
var _tmpl$$2 = /*#__PURE__*/ template(`<svg><path fill=none stroke-linecap=round pathLength=100>`);
var PathDot = (rawProps) => {
	const props = mergeProps({
		width: 160,
		height: 100,
		radius: 20,
		dotColor: "var(--primary-color)",
		dotThickness: 6,
		dotLength: 8,
		duration: 2,
		reverse: false,
		padding: 8
	}, rawProps);
	const r = () => Math.min(props.radius, props.width / 2, props.height / 2);
	const w = () => props.width;
	const h = () => props.height;
	const pad = () => props.padding + props.dotThickness / 2;
	const d = () => {
		const x = pad();
		const y = pad();
		const W = w();
		const H = h();
		const R = r();
		return [
			`M ${x} ${y + R}`,
			`L ${x} ${y + H - R}`,
			`A ${R} ${R} 0 0 0 ${x + R} ${y + H}`,
			`L ${x + W - R} ${y + H}`
		].join(" ");
	};
	const svgWidth = () => w() + pad() * 2;
	const svgHeight = () => h() + pad() * 2;
	const dashArray = () => `${props.dotLength} ${100 - props.dotLength}`;
	let dotPathRef;
	let animation;
	onMount(() => {
		if (!dotPathRef) return;
		const travel = 100 - props.dotLength * 2;
		const from = props.reverse ? `${-travel}` : "0";
		const to = props.reverse ? "0" : `${-travel}`;
		animation = dotPathRef.animate([{ strokeDashoffset: from }, { strokeDashoffset: to }], {
			duration: props.duration * 1e3,
			easing: "ease-in",
			fill: "forwards",
			iterations: 1
		});
		animation.finished.then(() => props.onAnimationEnd?.()).catch(() => {});
	});
	onCleanup(() => {
		animation?.cancel();
	});
	return (() => {
		var _el$ = _tmpl$$2(), _el$2 = _el$.firstChild;
		var _ref$ = dotPathRef;
		typeof _ref$ === "function" ? use(_ref$, _el$2) : dotPathRef = _el$2;
		createRenderEffect((_p$) => {
			var _v$ = props.class, _v$2 = svgWidth(), _v$3 = svgHeight(), _v$4 = `0 0 ${svgWidth()} ${svgHeight()}`, _v$5 = d(), _v$6 = props.dotColor, _v$7 = props.dotThickness, _v$8 = dashArray(), _v$9 = props.reverse ? `${-(100 - props.dotLength)}` : "0";
			_v$ !== _p$.e && setAttribute(_el$, "class", _p$.e = _v$);
			_v$2 !== _p$.t && setAttribute(_el$, "width", _p$.t = _v$2);
			_v$3 !== _p$.a && setAttribute(_el$, "height", _p$.a = _v$3);
			_v$4 !== _p$.o && setAttribute(_el$, "viewBox", _p$.o = _v$4);
			_v$5 !== _p$.i && setAttribute(_el$2, "d", _p$.i = _v$5);
			_v$6 !== _p$.n && setAttribute(_el$2, "stroke", _p$.n = _v$6);
			_v$7 !== _p$.s && setAttribute(_el$2, "stroke-width", _p$.s = _v$7);
			_v$8 !== _p$.h && setAttribute(_el$2, "stroke-dasharray", _p$.h = _v$8);
			_v$9 !== _p$.r && setAttribute(_el$2, "stroke-dashoffset", _p$.r = _v$9);
			return _p$;
		}, {
			e: void 0,
			t: void 0,
			a: void 0,
			o: void 0,
			i: void 0,
			n: void 0,
			s: void 0,
			h: void 0,
			r: void 0
		});
		return _el$;
	})();
};
//#endregion
//#region src/components/chat/bubbleParts/pollMessageContent/PollOption.tsx
var _tmpl$$1 = /*#__PURE__*/ template(`<div>`);
var _tmpl$2$1 = /*#__PURE__*/ template(`<div><div>`);
var _tmpl$3$1 = /*#__PURE__*/ template(`<div><div></div><div></div><div></div><div><div>`);
var _tmpl$4$1 = /*#__PURE__*/ template(`<div>GIF`);
var progressTransitionTimeBase = 600;
var boxSize = 32;
var PollOption = (props) => {
	const { TranslatableMessageTsx } = useHotReloadGuard();
	const contextProps = usePollMessageContentProps();
	let clickableAreaElement;
	const isShowingResult = createMemo(() => !!props.result);
	const [canAnimate, setCanAnimate] = createSignal(false);
	const [canShowPercentage, setCanShowPercentage] = createSignal(isShowingResult());
	const percentage = createMemo(() => clamp(props.result?.percent ?? 0, 0, 100));
	const canShowPercentageCheckbox = createMemo(() => isShowingResult() && canShowPercentage() && (props.result.chosen || props.hasCorrectAnswer));
	const delayedIsPendingVote = createDelayed(() => props.isPendingVote ?? false, false, (value) => value ? -1 : 100);
	const showPathDot = createMemo(() => canAnimate() && isShowingResult() && !canShowPercentage() && !delayedIsPendingVote() && !props.hideResults);
	onMount(() => {
		requestRAF(() => {
			setCanAnimate(true);
		});
	});
	createEffect(() => {
		if (isShowingResult()) onCleanup(() => {
			setCanShowPercentage(false);
		});
	});
	createEffect(() => {
		if (!props.slowHighlighted || !clickableAreaElement) return;
		requestRAF(() => {
			clickableAreaElement.classList.add(styles_module_default.hoveredTransition, styles_module_default.hovered);
		});
		onCleanup(() => {
			clickableAreaElement.classList.remove(styles_module_default.hovered);
			requestRAF(() => {
				clickableAreaElement.classList.remove(styles_module_default.hoveredTransition);
			});
		});
	});
	return (() => {
		var _el$ = _tmpl$3$1(), _el$2 = _el$.firstChild, _el$3 = _el$2.nextSibling, _el$6 = _el$3.nextSibling, _el$7 = _el$6.nextSibling, _el$8 = _el$7.firstChild;
		addEventListener(_el$2, "click", props.onToggle, true);
		use(ripple, _el$2, () => true);
		var _ref$ = clickableAreaElement;
		typeof _ref$ === "function" ? use(_ref$, _el$2) : clickableAreaElement = _el$2;
		insert(_el$3, createComponent(Transition, {
			name: "fade",
			get children() {
				return createComponent(Switch, { get children() {
					return [
						createComponent(Match, {
							get when() {
								return props.isPendingVote;
							},
							get children() {
								var _el$4 = _tmpl$$1();
								insert(_el$4, createComponent(Spinner, { thickness: spinnerThickness }));
								createRenderEffect(() => className(_el$4, styles_module_default.spinnerContainer));
								return _el$4;
							}
						}),
						createComponent(Match, {
							get when() {
								return !isShowingResult() || props.hideResults;
							},
							get children() {
								return createComponent(InMessageCheckbox, {
									get ["class"]() {
										return styles_module_default.checkbox;
									},
									get checked() {
										return memo(() => !!isShowingResult())() ? props.result?.chosen : props.checked;
									},
									get isOutgoing() {
										return contextProps.isOutgoing;
									},
									get round() {
										return !props.allowMultipleAnswers;
									}
								});
							}
						}),
						createComponent(Match, {
							get when() {
								return canShowPercentage();
							},
							get children() {
								var _el$5 = _tmpl$$1();
								insert(_el$5, createComponent(AnimatedPercentage, {
									get percentage() {
										return percentage();
									},
									get canAnimate() {
										return canAnimate();
									}
								}));
								createRenderEffect(() => className(_el$5, styles_module_default.percent));
								return _el$5;
							}
						})
					];
				} });
			}
		}));
		insert(_el$8, createComponent(TranslatableMessageTsx, {
			get peerId() {
				return contextProps.peerId;
			},
			get textWithEntities() {
				return {
					_: "textWithEntities",
					text: props.text.text,
					entities: unwrap(props.text.entities)
				};
			},
			get richTextOptions() {
				return {
					middleware: createMiddleware().get(),
					loadPromises: unwrap(contextProps.loadPromises)
				};
			}
		}));
		insert(_el$7, createComponent(Show, {
			get when() {
				return memo(() => !!isShowingResult())() && props.result.voters;
			},
			get children() {
				var _el$9 = _tmpl$2$1(), _el$0 = _el$9.firstChild;
				insert(_el$0, () => formatNumber(props.result.voters, 1));
				insert(_el$9, createComponent(Show, {
					get when() {
						return props.result.peerIds?.length > 0;
					},
					get children() {
						return createComponent(AvatarGroup, { get peerIds() {
							return props.result.peerIds;
						} });
					}
				}), null);
				createRenderEffect((_p$) => {
					var _v$ = styles_module_default.labelStats, _v$2 = styles_module_default.labelNumber;
					_v$ !== _p$.e && className(_el$9, _p$.e = _v$);
					_v$2 !== _p$.t && className(_el$0, _p$.t = _v$2);
					return _p$;
				}, {
					e: void 0,
					t: void 0
				});
				return _el$9;
			}
		}), null);
		insert(_el$7, createComponent(Transition, {
			name: "fade-2",
			get children() {
				return createComponent(Show, {
					get when() {
						return memo(() => !!(isShowingResult() && canShowPercentage()))() && !props.hideResults;
					},
					get children() {
						return createComponent(PollProgressLine, {
							get progress() {
								return (props.result.percent || 0) / 100;
							},
							get canAnimate() {
								return canAnimate();
							},
							get hasCorrectAnswer() {
								return props.hasCorrectAnswer;
							},
							get correct() {
								return props.result.correct;
							}
						});
					}
				});
			}
		}), null);
		insert(_el$7, createComponent(Show, {
			get when() {
				return showPathDot();
			},
			get children() {
				return createComponent(PathDot, {
					get ["class"]() {
						return styles_module_default.pathDot;
					},
					dotColor: "var(--primary-color)",
					width: 48,
					height: 24,
					dotThickness: 4,
					dotLength: 3.6,
					radius: 8,
					padding: 0,
					duration: .4,
					onAnimationEnd: () => void setCanShowPercentage(true)
				});
			}
		}), null);
		insert(_el$7, createComponent(Transition, {
			name: "fade-2",
			get children() {
				return createComponent(Show, {
					get when() {
						return memo(() => !!(canShowPercentageCheckbox() && props.hasCorrectAnswer && props.result.chosen))() && !props.hideResults;
					},
					get children() {
						var _el$1 = _tmpl$$1();
						createRenderEffect((_p$) => {
							var _v$3 = styles_module_default.chosenCheckboxDot, _v$4 = {
								[styles_module_default.correct]: !contextProps.isOutgoing && props.result.correct,
								[styles_module_default.wrong]: !contextProps.isOutgoing && !props.result.correct
							};
							_v$3 !== _p$.e && className(_el$1, _p$.e = _v$3);
							_p$.t = classList(_el$1, _v$4, _p$.t);
							return _p$;
						}, {
							e: void 0,
							t: void 0
						});
						return _el$1;
					}
				});
			}
		}), null);
		insert(_el$7, createComponent(Transition, {
			name: "fade-2",
			get children() {
				return createComponent(Show, {
					get when() {
						return memo(() => !!canShowPercentageCheckbox())() && !props.hideResults;
					},
					get children() {
						return createComponent(InMessageCheckbox, {
							get round() {
								return !props.allowMultipleAnswers;
							},
							get ["class"]() {
								return styles_module_default.chosenCheckbox;
							},
							get classList() {
								return {
									[styles_module_default.correct]: !contextProps.isOutgoing && props.hasCorrectAnswer && props.result.correct,
									[styles_module_default.wrong]: !contextProps.isOutgoing && props.hasCorrectAnswer && !props.result.correct
								};
							},
							checked: true,
							get cross() {
								return memo(() => !!props.hasCorrectAnswer)() ? !props.result.correct : void 0;
							},
							get isOutgoing() {
								return contextProps.isOutgoing;
							}
						});
					}
				});
			}
		}), null);
		insert(_el$, createComponent(Show, {
			get when() {
				return props.withMedia;
			},
			get children() {
				return [(() => {
					var _el$10 = _tmpl$$1();
					createRenderEffect(() => className(_el$10, styles_module_default.pollOptionSpacerLast));
					return _el$10;
				})(), createComponent(Show, {
					get when() {
						return props.webPage;
					},
					keyed: true,
					get fallback() {
						return (() => {
							var _el$11 = _tmpl$$1();
							use(dataPollViewerIdx, _el$11, () => props.pollViewerPayload);
							insert(_el$11, createComponent(Switch, { get children() {
								return [
									createComponent(Match, {
										get when() {
											return props.photo;
										},
										get children() {
											return createComponent(PhotoTsx, {
												get photo() {
													return props.photo;
												},
												boxWidth: boxSize,
												boxHeight: boxSize,
												get loadPromises() {
													return unwrap(contextProps.loadPromises);
												},
												get autoDownloadSize() {
													return contextProps.autoDownload?.photo;
												},
												get uploadingFileName() {
													return props.uploadingFileName;
												}
											});
										}
									}),
									createComponent(Match, {
										get when() {
											return props.sticker;
										},
										get children() {
											return createComponent(StickerPreview, {
												"class": "poll-option-sticker",
												get doc() {
													return props.sticker.document;
												},
												get animationGroup() {
													return contextProps.animationGroup;
												},
												width: boxSize,
												height: boxSize,
												get stickerOptions() {
													return {
														liteModeKey: "stickers_chat",
														withThumb: true,
														noPremium: props.sticker.media.pFlags.nopremium
													};
												}
											});
										}
									}),
									createComponent(Match, {
										get when() {
											return props.geo;
										},
										get children() {
											return createComponent(GeoPreview, {
												get ["class"]() {
													return styles_module_default.pollOptionGeo;
												},
												get geo() {
													return props.geo;
												}
											});
										}
									}),
									createComponent(Match, {
										get when() {
											return props.video;
										},
										get children() {
											return [createComponent(VideoTsx, {
												get doc() {
													return props.video;
												},
												get loadPromises() {
													return unwrap(contextProps.loadPromises);
												},
												get group() {
													return contextProps.animationGroup;
												},
												get autoDownload() {
													return unwrap(contextProps.autoDownload);
												},
												boxWidth: boxSize,
												boxHeight: boxSize,
												withPreview: true,
												noInfo: true,
												noPlayButton: true,
												noAutoplayAttribute: true,
												get lazyLoadQueue() {
													return unwrap(contextProps.lazyLoadQueue) || void 0;
												},
												get observer() {
													return unwrap(contextProps.observer);
												},
												get uploadingFileName() {
													return props.uploadingFileName;
												}
											}), (() => {
												var _el$12 = _tmpl$$1();
												insert(_el$12, createComponent(Show, {
													get when() {
														return props.video.type === "gif";
													},
													get fallback() {
														return (() => {
															var _el$14 = _tmpl$$1();
															insert(_el$14, createComponent(IconTsx, { icon: "play_filled" }));
															createRenderEffect(() => className(_el$14, styles_module_default.pollOptionMediaPlay));
															return _el$14;
														})();
													},
													get children() {
														var _el$13 = _tmpl$4$1();
														createRenderEffect(() => className(_el$13, styles_module_default.pollOptionMediaGifLabel));
														return _el$13;
													}
												}));
												createRenderEffect(() => className(_el$12, styles_module_default.pollOptionMediaDim));
												return _el$12;
											})()];
										}
									})
								];
							} }));
							createRenderEffect((_p$) => {
								var _v$12 = classNames(styles_module_default.pollOptionMedia, styles_module_default.stripped), _v$13 = { [styles_module_default.clickable]: !!props.video || !!props.photo || !!props.sticker || !!props.geo };
								_v$12 !== _p$.e && className(_el$11, _p$.e = _v$12);
								_p$.t = classList(_el$11, _v$13, _p$.t);
								return _p$;
							}, {
								e: void 0,
								t: void 0
							});
							return _el$11;
						})();
					},
					children: (webPage) => createComponent(PollWebPageMedia, { webPage })
				})];
			}
		}), null);
		createRenderEffect((_p$) => {
			var _v$5 = styles_module_default.pollOption, _v$6 = { [styles_module_default.hasMedia]: props.withMedia }, _v$7 = props.initialIdx, _v$8 = styles_module_default.clickableArea, _v$9 = {
				[styles_module_default.pointerDisabled]: isShowingResult() && !props.voteRestricted,
				[styles_module_default.outgoing]: contextProps.isOutgoing,
				[styles_module_default.hovered]: props.highlighted && !props.slowHighlighted
			}, _v$0 = styles_module_default.checkContainer, _v$1 = styles_module_default.pollOptionSpacerFirst, _v$10 = styles_module_default.labelRow, _v$11 = styles_module_default.labelText;
			_v$5 !== _p$.e && className(_el$, _p$.e = _v$5);
			_p$.t = classList(_el$, _v$6, _p$.t);
			_v$7 !== _p$.a && setAttribute(_el$, "data-poll-option-idx", _p$.a = _v$7);
			_v$8 !== _p$.o && className(_el$2, _p$.o = _v$8);
			_p$.i = classList(_el$2, _v$9, _p$.i);
			_v$0 !== _p$.n && className(_el$3, _p$.n = _v$0);
			_v$1 !== _p$.s && className(_el$6, _p$.s = _v$1);
			_v$10 !== _p$.h && className(_el$7, _p$.h = _v$10);
			_v$11 !== _p$.r && className(_el$8, _p$.r = _v$11);
			return _p$;
		}, {
			e: void 0,
			t: void 0,
			a: void 0,
			o: void 0,
			i: void 0,
			n: void 0,
			s: void 0,
			h: void 0,
			r: void 0
		});
		return _el$;
	})();
};
var PollProgressLine = (inProps) => {
	const contextProps = usePollMessageContentProps();
	const [props, restProps] = splitProps(inProps, [
		"class",
		"classList",
		"progress",
		"canAnimate",
		"hasCorrectAnswer",
		"correct"
	]);
	const animatedProgress = useAnimatedValueFromZero(() => props.progress, () => props.canAnimate, (value, prevValue) => progressTransitionTimeBase * Math.abs(value - prevValue));
	return (() => {
		var _el$15 = _tmpl$2$1(), _el$16 = _el$15.firstChild;
		spread(_el$15, mergeProps({
			get ["class"]() {
				return classNames(styles_module_default.labelProgress, props.class);
			},
			get classList() {
				return {
					[styles_module_default.correct]: !contextProps.isOutgoing && props.hasCorrectAnswer && props.correct,
					[styles_module_default.wrong]: !contextProps.isOutgoing && props.hasCorrectAnswer && !props.correct,
					...props.classList
				};
			}
		}, restProps), false, true);
		createRenderEffect((_p$) => {
			var _v$14 = styles_module_default.labelProgressFill, _v$15 = animatedProgress();
			_v$14 !== _p$.e && className(_el$16, _p$.e = _v$14);
			_v$15 !== _p$.t && setStyleProperty(_el$16, "--progress", _p$.t = _v$15);
			return _p$;
		}, {
			e: void 0,
			t: void 0
		});
		return _el$15;
	})();
};
var AnimatedPercentage = (props) => {
	const animatedPercentage = useAnimatedValueFromZero(() => props.percentage, () => props.canAnimate, (value, prevValue) => progressTransitionTimeBase * 1.5 * Math.abs(value - prevValue) / 100);
	return [memo(() => animatedPercentage() | 0), "%"];
};
/**
* Animates initially from zero, then from the previous value to the new value when it changes.
*/
var useAnimatedValueFromZero = (value, canAnimate, getDurationFromValue) => {
	let prevValue = 0;
	const [current, setCurrent] = createSignal(canAnimate() ? 0 : value());
	createEffect(() => {
		if (!canAnimate()) {
			prevValue = value();
			return;
		}
		if (value() === prevValue) return;
		const duration = getDurationFromValue(value(), prevValue);
		const cancel = animateValue(prevValue, value(), duration, setCurrent, { easing: (p) => p });
		prevValue = value();
		onCleanup(cancel);
	});
	return current;
};
delegateEvents(["click"]);
//#endregion
//#region src/components/chat/bubbleParts/pollMessageContent/usePollDerivedProps.ts
var getPhoto = (media) => {
	return media?._ === "messageMediaPhoto" && media.photo?._ === "photo" ? unwrap(media.photo) : void 0;
};
var getVideoDocument = (media) => {
	return media?._ === "messageMediaDocument" && media.document?._ === "document" && ["video", "gif"].includes(media.document.type) ? unwrap(media.document) : void 0;
};
var getStickerMedia = (media) => {
	if (media?._ === "messageMediaDocument" && media.document?._ === "document" && media.document.sticker) return {
		media: unwrap(media),
		document: unwrap(media.document)
	};
};
var getDocument = (media) => {
	return media?._ === "messageMediaDocument" && media.document?._ === "document" ? unwrap(media.document) : void 0;
};
var getGeo = (media) => {
	return media?._ === "messageMediaGeo" || media?._ === "messageMediaVenue" ? unwrap(media) : void 0;
};
var getWebPageMedia = (media) => {
	if (media?._ !== "messageMediaWebPage" || !media.webpage || media.webpage._ === "webPageNotModified") return;
	const webpage = unwrap(media.webpage);
	if (!webpage.url && webpage._ !== "webPagePending") return;
	return {
		media: unwrap(media),
		webpage,
		url: webpage.url,
		photo: webpage._ === "webPage" && webpage.photo?._ === "photo" ? unwrap(webpage.photo) : void 0
	};
};
/**
* Returns the various memos derived from the poll props plus helper
* functions (`getOverridenMessage`, `getResultForOption`, ...).
*/
function usePollDerivedProps({ props, pollOptions, chosenIndexes, newOptionText, activeVoteRestriction }) {
	const { rootScope } = useHotReloadGuard();
	const { maxOptions } = useCreatePollLimits();
	const [timeOffset] = createResource(() => rootScope.managers.timeManager.getServerTimeOffset());
	const question = () => props.poll.question;
	const descriptionText = () => props.message.message;
	const descriptionEntities = () => props.message.entities;
	const allowAddingOptions = createMemo(() => !!props.poll.pFlags.open_answers);
	const allowMultipleAnswers = createMemo(() => !!props.poll.pFlags.multiple_choice);
	const hasCorrectAnswer = createMemo(() => !!props.poll.pFlags.quiz);
	const shuffleOptions = createMemo(() => shouldShufflePollOptions(props.poll));
	const showWhoVoted = createMemo(() => !!props.poll.pFlags.public_voters);
	const closed = createMemo(() => !!props.poll.pFlags.closed);
	const hideResults = createMemo(() => !!props.poll.pFlags.hide_results_until_close && !closed() && !props.poll.pFlags.creator);
	const closesAtTimestamp = createMemo(() => timeOffset.state === "ready" ? props.poll.close_date - timeOffset() : 0);
	const votersCount = createMemo(() => props.results?.total_voters ?? 0);
	const recentVoters = createMemo(() => props.results?.recent_voters?.map((peer) => getPeerId(peer)) ?? []);
	const roundedPercents = createMemo(() => getRoundedPercentsFromResults(props.results));
	const hasMediaInOptions = createMemo(() => props.poll.answers.some((a) => !!getPhoto(a.media) || !!getStickerMedia(a.media) || !!getGeo(a.media) || !!getVideoDocument(a.media) || !!getWebPageMedia(a.media)));
	const isShowingResult = createMemo(() => !!props.poll.chosenIndexes?.length || props.poll.pFlags.closed || getPollVoteRestrictionDisplayState(activeVoteRestriction(), hideResults()).forceResults);
	const hasExplanation = createMemo(() => isShowingResult() && (!!props.results.solution || !!props.results.solution_media));
	const hasSelectedSomething = createMemo(() => chosenIndexes().length > 0);
	const hasTypedNewOption = createMemo(() => newOptionText().length > 0);
	const canShowAddOption = createMemo(() => allowAddingOptions() && !isShowingResult() && !activeVoteRestriction() && pollOptions.length < maxOptions());
	const canShowCloseTimer = createMemo(() => !props.poll.pFlags.closed && !!closesAtTimestamp() && closesAtTimestamp() > (/* @__PURE__ */ new Date()).getTime() / 1e3);
	const canShowViewResults = createMemo(() => !activeVoteRestriction() && showWhoVoted() && !!props.results.results?.some((r) => !!r.voters) && isShowingResult());
	const willFooterBeClickable = createMemo(() => canShowViewResults() || !activeVoteRestriction() && (hasSelectedSomething() || hasTypedNewOption()));
	const getOverridenMessage = () => ({
		...unwrap(props.message),
		media: {
			_: "messageMediaPoll",
			...unwrap(props.media),
			poll: unwrap(props.poll),
			results: unwrap(props.results)
		}
	});
	const explanationPhoto = createMemo(() => getPhoto(props.results.solution_media));
	const explanationVideo = createMemo(() => getVideoDocument(props.results.solution_media));
	const explanationDocument = createMemo(() => !getVideoDocument(props.results.solution_media) ? getDocument(props.results.solution_media) : void 0);
	const explanationGeo = createMemo(() => getGeo(props.results.solution_media));
	const explanationWebPage = createMemo(() => getWebPageMedia(props.results.solution_media));
	const descriptionPhoto = createMemo(() => getPhoto(props.media.attached_media));
	const descriptionVideo = createMemo(() => getVideoDocument(props.media.attached_media));
	const descriptionDocument = createMemo(() => !getVideoDocument(props.media.attached_media) ? getDocument(props.media.attached_media) : void 0);
	const descriptionGeo = createMemo(() => getGeo(props.media.attached_media));
	const descriptionWebPage = createMemo(() => getWebPageMedia(props.media.attached_media));
	const initialIdxFromShuffledIdx = (idx) => {
		const shuffledOption = pollOptions[idx]?.option;
		return props.poll.answers.findIndex((other) => other._ === "pollAnswer" && other.option && shuffledOption && compareUint8Arrays(other.option, shuffledOption));
	};
	const getResultForOption = (initialIdx) => {
		if (!isShowingResult()) return void 0;
		const result = props.results?.results?.[initialIdx];
		return {
			correct: props.poll.correctIndexes?.includes(initialIdx) ?? false,
			chosen: props.poll.chosenIndexes?.includes(initialIdx) ?? false,
			percent: roundedPercents()[initialIdx],
			voters: result?.voters ?? 0,
			peerIds: result?.recent_voters?.map((peer) => getPeerId(peer)) ?? []
		};
	};
	const getPhotoForOption = (initialIdx) => getPhoto(props.poll.answers[initialIdx]?.media);
	const getVideoForOption = (initialIdx) => getVideoDocument(props.poll.answers[initialIdx]?.media);
	const getStickerForOption = (initialIdx) => getStickerMedia(props.poll.answers[initialIdx]?.media);
	const getGeoForOption = (initialIdx) => getGeo(props.poll.answers[initialIdx]?.media);
	const getWebPageForOption = (initialIdx) => getWebPageMedia(props.poll.answers[initialIdx]?.media);
	return {
		question,
		descriptionText,
		descriptionEntities,
		allowAddingOptions,
		allowMultipleAnswers,
		hasCorrectAnswer,
		shuffleOptions,
		showWhoVoted,
		closed,
		hideResults,
		closesAtTimestamp,
		votersCount,
		recentVoters,
		roundedPercents,
		hasMediaInOptions,
		hasExplanation,
		hasSelectedSomething,
		isShowingResult,
		hasTypedNewOption,
		canShowAddOption,
		canShowCloseTimer,
		canShowViewResults,
		willFooterBeClickable,
		explanationPhoto,
		explanationVideo,
		explanationDocument,
		explanationGeo,
		explanationWebPage,
		descriptionPhoto,
		descriptionVideo,
		descriptionDocument,
		descriptionGeo,
		descriptionWebPage,
		getPhoto,
		getOverridenMessage,
		initialIdxFromShuffledIdx,
		getResultForOption,
		getPhotoForOption,
		getVideoForOption,
		getStickerForOption,
		getGeoForOption,
		getWebPageForOption
	};
}
//#endregion
//#region src/components/chat/bubbleParts/pollMessageContent/usePollMutations.ts
/**
* Encapsulates the vote / add-option requests fired by the poll footer.
*/
function usePollMutations({ getOverridenMessage, isShowingResult, initialIdxFromShuffledIdx, newOption, activeVoteRestriction, onVoteRestriction, showVoteRestriction, onSuccess }) {
	const { rootScope } = useHotReloadGuard();
	const sendVoteMutation = createMutation(async (indexes) => {
		if (isShowingResult() || !indexes.length) return;
		const message = getOverridenMessage();
		if (message.media?._ !== "messageMediaPoll") return;
		const restriction = activeVoteRestriction();
		if (restriction) {
			showVoteRestriction(restriction);
			return;
		}
		const optionIndexes = indexes.map(initialIdxFromShuffledIdx).filter((idx) => idx !== -1);
		try {
			await rootScope.managers.appPollsManager.sendVote(message, optionIndexes);
		} catch (error) {
			const restriction = parsePollVoteRestrictionError(error?.type);
			if (!restriction) throw error;
			onVoteRestriction(restriction);
			const activeRestriction = activeVoteRestriction();
			if (activeRestriction) showVoteRestriction(activeRestriction);
			return;
		}
		onVoteRestriction();
		onSuccess();
	});
	const wrappedSendVote = wrapAsyncClickHandler(sendVoteMutation.mutateAsync);
	const delayedSendVotePending = createDelayed(sendVoteMutation.isPending, false, (value) => value ? 100 : -1);
	const addOptionMutation = createMutation(async () => {
		const { text, entities, attachment } = unwrap(newOption);
		if (isShowingResult() || !text || attachment?.type === "pending") return;
		const restriction = activeVoteRestriction();
		if (restriction) {
			showVoteRestriction(restriction);
			return;
		}
		try {
			await rootScope.managers.appPollsManager.addPollAnswer(getOverridenMessage(), {
				_: "textWithEntities",
				text,
				entities
			}, attachment);
		} catch (error) {
			const restriction = parsePollVoteRestrictionError(error?.type);
			if (!restriction) throw error;
			onVoteRestriction(restriction);
			const activeRestriction = activeVoteRestriction();
			if (activeRestriction) showVoteRestriction(activeRestriction);
			return;
		}
		onSuccess();
	});
	return {
		sendVoteMutation,
		wrappedSendVote,
		delayedSendVotePending,
		addOptionMutation,
		wrappedAddOption: wrapAsyncClickHandler(addOptionMutation.mutateAsync)
	};
}
//#endregion
//#region src/components/chat/bubbleParts/pollMessageContent/usePollOptionsStore.ts
/**
* Stores poll options in a reactive store, applying shuffling on init
* and reconciling new/removed options as the poll updates.
*/
function usePollOptionsStore({ props, userId }) {
	let initialOptions = props.poll.answers.filter((answer) => answer._ === "pollAnswer");
	if (shouldShufflePollOptions(props.poll)) initialOptions = shufflePollOptions({
		options: initialOptions,
		userId,
		pollId: props.poll.id
	});
	const [pollOptions, setPollOptions] = createStore(initialOptions);
	createComputed(() => {
		const filteredOptions = props.poll.answers.filter((answer) => answer._ === "pollAnswer");
		filteredOptions.forEach((option) => {
			const idx = untrack(() => pollOptions.findIndex((other) => compareUint8Arrays(other.option, option.option)));
			if (idx === -1) setPollOptions(untrack(() => pollOptions.length), option);
			else setPollOptions(idx, reconcile(option));
		});
		setPollOptions((prev) => prev.filter((option) => filteredOptions.some((other) => compareUint8Arrays(option.option, other.option))));
	});
	return [pollOptions, setPollOptions];
}
//#endregion
//#region src/components/chat/bubbleParts/pollMessageContent/PollMessageContent.tsx
var _tmpl$ = /*#__PURE__*/ template(`<div><div>`);
var _tmpl$2 = /*#__PURE__*/ template(`<div>`);
var _tmpl$3 = /*#__PURE__*/ template(`<div><div><div></div><div>`);
var _tmpl$4 = /*#__PURE__*/ template(`<div style=overflow:hidden>`);
var PollMessageContent = (props) => {
	attachHotClassName(props.element, styles_module_default.container);
	createEffect(() => {
		if (props.isOutgoing) {
			props.element.classList.add(styles_module_default.outgoing);
			onCleanup(() => {
				props.element.classList.remove(styles_module_default.outgoing);
			});
		}
	});
	const { rootScope, AppMediaViewerStatic, appSidebarRight, AppPollResultsTab, TranslatableMessageTsx, DocumentTsx } = useHotReloadGuard();
	const { maxOptionLength } = useCreatePollLimits();
	const middleware = createMiddleware().get();
	const [explanationToggled, setExplanationToggled] = createSignal(false);
	const [chosenIndexes, setChosenIndexes] = createSignal([]);
	const [canFooterBeClickable, setCanFooterBeClickable] = createSignal(false);
	const [isAddingNewOptionActive, setIsAddingNewOptionActive] = createSignal(false);
	const [newOption, setNewOption] = createStore({
		text: "",
		entities: []
	});
	const [descriptionElement, setDescriptionElement] = createSignal();
	const [isConfettiActive, setIsConfettiActive] = createSignal(false);
	const [highlightedIndexes, setHighlightedIndexes] = createSignal([]);
	const [slowHighlightedIndexes, setSlowHighlightedIndexes] = createSignal([]);
	const [serverVoteRestriction, setServerVoteRestriction] = createSignal();
	let inputField;
	let voteRestrictionExpiryTimeout;
	const elementByIndexMap = /* @__PURE__ */ new Map();
	const appConfig = useAppConfig();
	const restrictionPeerId = createMemo(() => getPollVoteRestrictionPeerId(props.message));
	const restrictionPeer = usePeer(restrictionPeerId);
	const restrictionPeerName = createMemo(() => {
		const peer = restrictionPeer();
		return peer && peer._ !== "user" ? peer.title : void 0;
	});
	const isInRestrictionChat = createMemo(() => {
		if (!restrictionPeerId()?.isAnyChat()) return;
		const chat = restrictionPeer();
		if (!chat) return;
		if (chat._ === "channelForbidden" || chat._ === "chatForbidden" || chat._ === "communityForbidden") return false;
		return !chat.pFlags.left && !(chat._ === "chat" && chat.pFlags.deactivated);
	});
	const localVoteRestriction = createMemo(() => getPollVotePrecheckRestriction({
		subscribersOnly: !!props.poll.pFlags.subscribers_only,
		countriesIso2: props.poll.countries_iso2,
		isInChat: isInRestrictionChat(),
		phoneCountryIso2: appConfig.phone_country_iso2
	}));
	const knownVoteRestriction = createMemo(() => serverVoteRestriction()?.restriction || localVoteRestriction());
	const activeVoteRestriction = createMemo(() => getActivePollVoteRestriction({
		restriction: knownVoteRestriction(),
		hasVoted: !!props.poll.chosenIndexes?.length,
		closed: !!props.poll.pFlags.closed,
		creator: !!props.poll.pFlags.creator,
		isRegularMessage: isRegularPollMessage(props.message, props.isRegularSurface)
	}));
	const applyServerVoteRestriction = (state) => {
		self.clearTimeout(voteRestrictionExpiryTimeout);
		state = isPollVoteRestrictionActive(state) ? state : void 0;
		setServerVoteRestriction(state);
		if (state && isExpiringPollVoteRestriction(state.restriction)) voteRestrictionExpiryTimeout = self.setTimeout(() => setServerVoteRestriction(), Math.max(0, state.updatedAt + POLL_VOTE_RESTRICTION_EXPIRY - Date.now()));
	};
	const onVoteRestriction = (restriction) => {
		applyServerVoteRestriction(restriction ? {
			restriction,
			updatedAt: Date.now()
		} : void 0);
		if (restriction) rootScope.managers.appPollsManager.setPollVoteRestriction(props.poll.id, restriction);
	};
	const showVoteRestriction = (restriction) => {
		const { langPackKey, langPackArguments } = getPollVoteRestrictionText(props.poll, restriction, restrictionPeerName());
		toastNew({
			langPackKey,
			langPackArguments,
			duration: 5e3
		});
	};
	let cleaned = false;
	rootScope.managers.appPollsManager.getPollVoteRestriction(props.poll.id).then((state) => {
		if (!cleaned) applyServerVoteRestriction(state);
	});
	subscribeOn(rootScope)("poll_vote_restriction", ({ pollId, state }) => {
		if (pollId === props.poll.id) applyServerVoteRestriction(state);
	});
	const [pollOptions] = usePollOptionsStore({
		props,
		userId: rootScope.myId
	});
	const { question, descriptionText, descriptionEntities, allowMultipleAnswers, hasCorrectAnswer, showWhoVoted, closed, hideResults, closesAtTimestamp, votersCount, recentVoters, hasMediaInOptions, hasExplanation, hasSelectedSomething, isShowingResult, hasTypedNewOption, canShowAddOption, canShowCloseTimer, canShowViewResults, willFooterBeClickable, explanationPhoto, explanationVideo, explanationDocument, explanationGeo, explanationWebPage, descriptionPhoto, descriptionVideo, descriptionDocument, descriptionGeo, descriptionWebPage, getOverridenMessage, initialIdxFromShuffledIdx, getResultForOption, getPhotoForOption, getVideoForOption, getStickerForOption, getGeoForOption, getWebPageForOption } = usePollDerivedProps({
		props,
		pollOptions,
		chosenIndexes,
		newOptionText: () => newOption.text,
		activeVoteRestriction
	});
	const voteRestrictionDisplayState = createMemo(() => getPollVoteRestrictionDisplayState(activeVoteRestriction(), hideResults()));
	const isChecked = createSelector(chosenIndexes, (index, indices) => indices.includes(index));
	setCanFooterBeClickable(willFooterBeClickable());
	const resetInteractiveState = () => batch(() => {
		setChosenIndexes([]);
		setIsAddingNewOptionActive(false);
		setNewOption(reconcile({
			text: "",
			entities: []
		}));
		inputField?.setValueSilently("");
	});
	const { sendVoteMutation, wrappedSendVote, delayedSendVotePending, addOptionMutation, wrappedAddOption } = usePollMutations({
		getOverridenMessage,
		isShowingResult,
		initialIdxFromShuffledIdx,
		newOption,
		activeVoteRestriction,
		onVoteRestriction,
		showVoteRestriction,
		onSuccess: resetInteractiveState
	});
	createEffect(() => {
		if (activeVoteRestriction()) untrack(resetInteractiveState);
	});
	const isFooterClickable = createMemo(() => canFooterBeClickable() && !sendVoteMutation.isPending() && !addOptionMutation.isPending() && newOption.attachment?.type !== "pending");
	const mediaViewerPayload = createMemo(() => {
		let idxSeed = 0;
		const media = [];
		const indexes = { options: /* @__PURE__ */ new Map() };
		if (descriptionPhoto() || descriptionVideo()) {
			media.push(descriptionPhoto() || descriptionVideo());
			indexes.description = idxSeed++;
		}
		if (explanationPhoto() || explanationVideo()) {
			media.push(explanationPhoto() || explanationVideo());
			indexes.explanation = idxSeed++;
		}
		props.poll.answers.forEach((option, idx) => {
			const photo = getPhotoForOption(idx);
			const video = getVideoForOption(idx);
			if (photo || video) {
				media.push(photo || video);
				indexes.options.set(idx, idxSeed++);
			}
		});
		return {
			media,
			indexes
		};
	});
	const handleToggle = (index) => {
		const restriction = activeVoteRestriction();
		if (restriction) {
			showVoteRestriction(restriction);
			return;
		}
		if (!allowMultipleAnswers()) {
			wrappedSendVote([index]);
			return;
		}
		setChosenIndexes((prev) => {
			if (prev.includes(index)) return prev.filter((i) => i !== index);
			else return [...prev, index];
		});
	};
	const handleNewOptionChanged = (values) => batch(() => {
		const previousAttachment = unwrap(newOption.attachment);
		let nextAttachment = "attachment" in values ? values.attachment : previousAttachment;
		const sliced = "text" in values && "entities" in values ? sliceTextWithEntities(values.text ?? "", values.entities ?? [], 0, maxOptionLength()) : void 0;
		if (sliced && !sliced.text) nextAttachment = void 0;
		if (previousAttachment !== nextAttachment) setNewOption({ attachment: nextAttachment });
		if (!sliced) return;
		setNewOption(sliced.text ? sliced : {
			...sliced,
			attachment: void 0
		});
		if (sliced.text.length < inputField?.value.length) {
			inputField?.setValueSilently(sliced);
			placeCaretAtEnd(inputField?.input, true);
		}
	});
	onCleanup(() => {
		cleaned = true;
		self.clearTimeout(voteRestrictionExpiryTimeout);
	});
	const openViewResults = () => {
		if (!appSidebarRight.isTabExists(AppPollResultsTab)) appSidebarRight.createTab(AppPollResultsTab).open(getOverridenMessage());
		else appSidebarRight.toggleSidebar(true);
	};
	const onFooterClick = wrapAsyncClickHandler(async () => {
		if (canShowViewResults()) openViewResults();
		else if (hasSelectedSomething()) await sendVoteMutation.mutateAsync(chosenIndexes());
		else if (hasTypedNewOption()) await wrappedAddOption();
	});
	subscribeOn(rootScope)("poll_update", ({ poll, results }) => {
		if (poll.id !== props.poll.id) return;
		props.poll = poll;
		props.results = results;
		if (poll.pFlags.quiz && hasSelectedCorrectAnswers(poll)) setIsConfettiActive(true);
	});
	createEffect(() => {
		if (!descriptionElement()) return;
		attachSpoilerOverlay(descriptionElement(), props);
	});
	props.controls.openMediaViewer = (idx) => {
		const getTarget = (idx) => ({
			media: mediaViewerPayload().media[idx],
			element: elementByIndexMap.get(idx)?.querySelector(".media-video, .media-photo"),
			fromId: props.message.fromId,
			timestamp: props.message.date,
			peerId: props.message.peerId,
			mid: props.message.mid
		});
		new AppMediaViewerStatic().openMedia({
			allTargets: mediaViewerPayload().media.map((_, idx) => getTarget(idx)),
			index: idx,
			fromRight: 0,
			...getTarget(idx)
		});
	};
	let highlightedTimeout;
	props.controls.highlightAnswer = (idx) => {
		self.clearTimeout(highlightedTimeout);
		setSlowHighlightedIndexes([]);
		if (typeof idx === "number") setHighlightedIndexes([idx]);
		else setHighlightedIndexes([]);
	};
	props.controls.highlightAnswerWithTimeout = (idx, timeout) => {
		self.clearTimeout(highlightedTimeout);
		setSlowHighlightedIndexes([idx]);
		highlightedTimeout = self.setTimeout(() => setSlowHighlightedIndexes([]), timeout);
	};
	return createComponent(PollMessageContentPropsContext.Provider, {
		value: props,
		get children() {
			return [
				createComponent(Show, {
					get when() {
						return isConfettiActive();
					},
					get children() {
						return createComponent(AutoStartedConfetti, { onEnd: () => setIsConfettiActive(false) });
					}
				}),
				createComponent(Show, {
					get when() {
						return descriptionWebPage();
					},
					keyed: true,
					children: (webPage) => createComponent(PollWebPageMedia, {
						get ["class"]() {
							return styles_module_default.pollDescriptionWebPage;
						},
						compact: false,
						webPage
					})
				}),
				createComponent(Show, {
					get when() {
						return descriptionPhoto() || descriptionVideo() || descriptionGeo();
					},
					get children() {
						var _el$ = _tmpl$(), _el$2 = _el$.firstChild;
						use(dataPollViewerIdx, _el$2, () => [mediaViewerPayload().indexes.description, elementByIndexMap]);
						insert(_el$2, createComponent(Switch, { get children() {
							return [
								createComponent(Match, {
									get when() {
										return descriptionPhoto();
									},
									get children() {
										return createComponent(PhotoTsx, {
											get photo() {
												return descriptionPhoto();
											},
											get loadPromises() {
												return unwrap(props.loadPromises);
											},
											get autoDownloadSize() {
												return props.autoDownload?.photo;
											},
											get lazyLoadQueue() {
												return unwrap(props.lazyLoadQueue);
											},
											get uploadingFileName() {
												return props.uploadingFileNames?.description;
											}
										});
									}
								}),
								createComponent(Match, {
									get when() {
										return descriptionVideo();
									},
									get children() {
										return createComponent(VideoTsx, {
											get doc() {
												return descriptionVideo();
											},
											get loadPromises() {
												return unwrap(props.loadPromises);
											},
											get group() {
												return props.animationGroup;
											},
											get autoDownload() {
												return unwrap(props.autoDownload);
											},
											get boxWidth() {
												return mediaSizes.active.regular.width;
											},
											get boxHeight() {
												return mediaSizes.active.regular.height;
											},
											withPreview: true,
											get lazyLoadQueue() {
												return unwrap(props.lazyLoadQueue) || void 0;
											},
											get observer() {
												return unwrap(props.observer);
											},
											get uploadingFileName() {
												return props.uploadingFileNames?.description;
											}
										});
									}
								}),
								createComponent(Match, {
									get when() {
										return descriptionGeo();
									},
									get children() {
										return createComponent(GeoPreview, {
											get ["class"]() {
												return styles_module_default.geo;
											},
											get geo() {
												return descriptionGeo();
											}
										});
									}
								})
							];
						} }));
						createRenderEffect((_p$) => {
							var _v$ = styles_module_default.pollDescriptionMediaWrapper, _v$2 = styles_module_default.pollDescriptionMedia;
							_v$ !== _p$.e && className(_el$, _p$.e = _v$);
							_v$2 !== _p$.t && className(_el$2, _p$.t = _v$2);
							return _p$;
						}, {
							e: void 0,
							t: void 0
						});
						return _el$;
					}
				}),
				createComponent(Show, {
					get when() {
						return memo(() => !!(descriptionDocument() && !descriptionPhoto()))() && !descriptionVideo();
					},
					get children() {
						var _el$3 = _tmpl$2();
						insert(_el$3, createComponent(DocumentTsx, {
							get message() {
								return props.message;
							},
							get doc() {
								return descriptionDocument();
							},
							slot: .1,
							get loadPromises() {
								return unwrap(props.loadPromises);
							},
							get lazyLoadQueue() {
								return unwrap(props.lazyLoadQueue) || void 0;
							},
							get autoDownloadSize() {
								return props.autoDownload?.file;
							},
							sizeType: "documentName",
							canTranscribeVoice: false,
							get uploadingFileName() {
								return props.uploadingFileNames?.description;
							}
						}));
						createRenderEffect(() => className(_el$3, styles_module_default.pollDocumentWrapper));
						return _el$3;
					}
				}),
				createComponent(Show, {
					get when() {
						return descriptionText();
					},
					get children() {
						var _el$4 = _tmpl$2();
						use(setDescriptionElement, _el$4);
						insert(_el$4, createComponent(TranslatableMessageTsx, {
							get peerId() {
								return props.peerId;
							},
							get textWithEntities() {
								return {
									_: "textWithEntities",
									text: descriptionText(),
									entities: unwrap(descriptionEntities())
								};
							},
							get richTextOptions() {
								return {
									middleware: createMiddleware().get(),
									loadPromises: unwrap(props.loadPromises)
								};
							}
						}));
						createRenderEffect(() => className(_el$4, styles_module_default.description));
						return _el$4;
					}
				}),
				(() => {
					var _el$5 = _tmpl$3(), _el$6 = _el$5.firstChild, _el$7 = _el$6.firstChild, _el$8 = _el$7.nextSibling;
					insert(_el$7, createComponent(TranslatableMessageTsx, {
						get peerId() {
							return props.peerId;
						},
						get textWithEntities() {
							return unwrap(question());
						},
						get richTextOptions() {
							return {
								middleware,
								loadPromises: unwrap(props.loadPromises)
							};
						}
					}));
					insert(_el$8, createComponent(PollType, {
						get closed() {
							return closed();
						},
						get hasCorrectAnswer() {
							return hasCorrectAnswer();
						},
						get showWhoVoted() {
							return showWhoVoted();
						}
					}), null);
					insert(_el$8, createComponent(Transition, {
						name: "fade-2",
						get children() {
							return createComponent(Show, {
								get when() {
									return memo(() => !!isShowingResult())() && recentVoters().length > 0;
								},
								get children() {
									return createComponent(AvatarGroup, { get peerIds() {
										return recentVoters();
									} });
								}
							});
						}
					}), null);
					insert(_el$5, createComponent(Show, {
						get when() {
							return hasExplanation();
						},
						get children() {
							return createComponent(ButtonIconTsx, {
								icon: "lamp",
								onClick: () => setExplanationToggled((p) => !p)
							});
						}
					}), null);
					createRenderEffect((_p$) => {
						var _v$3 = styles_module_default.header, _v$4 = styles_module_default.headerTitleContainer, _v$5 = styles_module_default.headerTitle, _v$6 = styles_module_default.headerSubtitle;
						_v$3 !== _p$.e && className(_el$5, _p$.e = _v$3);
						_v$4 !== _p$.t && className(_el$6, _p$.t = _v$4);
						_v$5 !== _p$.a && className(_el$7, _p$.a = _v$5);
						_v$6 !== _p$.o && className(_el$8, _p$.o = _v$6);
						return _p$;
					}, {
						e: void 0,
						t: void 0,
						a: void 0,
						o: void 0
					});
					return _el$5;
				})(),
				createComponent(Show, {
					get when() {
						return explanationToggled();
					},
					get children() {
						return createComponent(Explanation, {
							get text() {
								return props.results?.solution;
							},
							get entities() {
								return props.results?.solution_entities;
							},
							get photo() {
								return explanationPhoto();
							},
							get video() {
								return explanationVideo();
							},
							get document() {
								return explanationDocument();
							},
							get geo() {
								return explanationGeo();
							},
							get webPage() {
								return explanationWebPage();
							},
							get pollViewerPayload() {
								return [mediaViewerPayload().indexes.explanation, elementByIndexMap];
							}
						});
					}
				}),
				createComponent(TransitionGroup, {
					name: "fade-2",
					moveClass: "t-move",
					get children() {
						return createComponent(For, {
							each: pollOptions,
							children: (option, index) => {
								const initialIdx = createMemo(() => initialIdxFromShuffledIdx(index()));
								return createComponent(PollOption, {
									get text() {
										return option.text;
									},
									get withMedia() {
										return hasMediaInOptions();
									},
									get photo() {
										return getPhotoForOption(initialIdx());
									},
									get video() {
										return getVideoForOption(initialIdx());
									},
									get sticker() {
										return getStickerForOption(initialIdx());
									},
									get geo() {
										return getGeoForOption(initialIdx());
									},
									get webPage() {
										return getWebPageForOption(initialIdx());
									},
									get allowMultipleAnswers() {
										return allowMultipleAnswers();
									},
									get hasCorrectAnswer() {
										return hasCorrectAnswer();
									},
									get checked() {
										return isChecked(index());
									},
									onToggle: () => handleToggle(index()),
									get pollViewerPayload() {
										return [mediaViewerPayload().indexes.options.get(initialIdx()), elementByIndexMap];
									},
									get initialIdx() {
										return initialIdx();
									},
									get result() {
										return getResultForOption(initialIdx());
									},
									get voteRestricted() {
										return !!activeVoteRestriction();
									},
									get isPendingVote() {
										return delayedSendVotePending();
									},
									get hideResults() {
										return hideResults();
									},
									get highlighted() {
										return highlightedIndexes().includes(initialIdx());
									},
									get slowHighlighted() {
										return slowHighlightedIndexes().includes(initialIdx());
									},
									get uploadingFileName() {
										return props.uploadingFileNames?.answers?.[initialIdx()];
									}
								});
							}
						});
					}
				}),
				createComponent(Show, {
					get when() {
						return canShowAddOption();
					},
					get children() {
						var _el$9 = _tmpl$4();
						insert(_el$9, createComponent(AddOption, {
							inputFieldRef: (value) => void (inputField = value),
							get value() {
								return newOption.text;
							},
							get attachment() {
								return newOption.attachment;
							},
							onPartialChange: handleNewOptionChanged,
							onEnter: wrappedAddOption,
							get active() {
								return isAddingNewOptionActive();
							},
							onActiveChange: setIsAddingNewOptionActive,
							get isPending() {
								return addOptionMutation.isPending();
							}
						}));
						return _el$9;
					}
				}),
				createComponent(Space, { amount: "0.25rem" }),
				(() => {
					var _el$0 = _tmpl$(), _el$1 = _el$0.firstChild;
					addEventListener(_el$1, "click", onFooterClick, true);
					use(ripple, _el$1, () => isFooterClickable());
					insert(_el$1, createComponent(Transition, {
						name: "fade-2",
						mode: "outin",
						onAfterExit: () => {
							setCanFooterBeClickable(willFooterBeClickable());
						},
						get children() {
							return createComponent(Switch, { get children() {
								return [
									createComponent(Match, {
										get when() {
											return voteRestrictionDisplayState().showVotersCount;
										},
										get children() {
											return createComponent(PollVotes, {
												get votersCount() {
													return votersCount();
												},
												get closed() {
													return closed();
												},
												get hasCorrectAnswer() {
													return hasCorrectAnswer();
												},
												get showWhoVoted() {
													return showWhoVoted();
												}
											});
										}
									}),
									createComponent(Match, {
										get when() {
											return canShowViewResults();
										},
										get children() {
											return createComponent(I18nTsx, {
												key: "Chat.Poll.ViewVotes",
												get args() {
													return votersCount()?.toString();
												}
											});
										}
									}),
									createComponent(Match, {
										get when() {
											return hasSelectedSomething();
										},
										get children() {
											return createComponent(I18nTsx, { key: "Chat.Poll.SubmitVote" });
										}
									}),
									createComponent(Match, {
										get when() {
											return memo(() => !!hasTypedNewOption())() && !isShowingResult();
										},
										get children() {
											return createComponent(I18nTsx, { key: "Save" });
										}
									}),
									createComponent(Match, {
										get when() {
											return isShowingResult();
										},
										get children() {
											return createComponent(PollVotes, {
												get votersCount() {
													return votersCount();
												},
												get closed() {
													return closed();
												},
												get hasCorrectAnswer() {
													return hasCorrectAnswer();
												},
												get showWhoVoted() {
													return showWhoVoted();
												}
											});
										}
									}),
									createComponent(Match, {
										when: true,
										get children() {
											return createComponent(I18nTsx, { key: "Chat.Poll.SelectAnOption" });
										}
									})
								];
							} });
						}
					}));
					createRenderEffect((_p$) => {
						var _v$7 = styles_module_default.footer, _v$8 = styles_module_default.footerButton, _v$9 = {
							[styles_module_default.clickable]: isFooterClickable(),
							[styles_module_default.outgoing]: props.isOutgoing
						};
						_v$7 !== _p$.e && className(_el$0, _p$.e = _v$7);
						_v$8 !== _p$.t && className(_el$1, _p$.t = _v$8);
						_p$.a = classList(_el$1, _v$9, _p$.a);
						return _p$;
					}, {
						e: void 0,
						t: void 0,
						a: void 0
					});
					return _el$0;
				})(),
				createComponent(Show, {
					get when() {
						return canShowCloseTimer();
					},
					get children() {
						var _el$10 = _tmpl$2();
						insert(_el$10, createComponent(RemainingTime, {
							get finishTimestamp() {
								return closesAtTimestamp();
							},
							children: (time) => createComponent(I18nTsx, {
								key: "Chat.Poll.EndsIn",
								get args() {
									return [time()];
								}
							})
						}));
						createRenderEffect(() => className(_el$10, styles_module_default.timer));
						return _el$10;
					}
				}),
				createComponent(Space, { amount: "1rem" })
			];
		}
	});
};
delegateEvents(["click"]);
//#endregion
export { PollMessageContent };
