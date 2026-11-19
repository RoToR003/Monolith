//# allFunctionsCalledOnLoad
import { t as findUpClassName } from "./findUpClassName-3V5me58N.js";
import { t as Icon } from "./icon-DbP6Es97.js";
import { n as rootScope } from "./rootScope-CZS0lmz8.js";
import { a as i18n, u as langPack_default } from "./langPack-BmdJGr44.js";
import { C as createSignal, L as untrack, M as onCleanup, R as useContext, _ as createMemo, b as createResource, g as createEffect, i as For, p as createComponent, x as createRoot, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { n as getAppWindow } from "./appWindow-bo-KtJhy.js";
import { n as bindManagersToSession } from "./bindManagersToAccount-BL82O9H9.js";
import { _ as use, c as insert, g as template, o as className, p as setStyleProperty, u as memo } from "./web-BPyQozky.js";
import { n as hotReloadGuard } from "./hotReloadGuardProvider-CHEsZRuG.js";
import { t as liteMode } from "./liteMode-DeLStZfQ.js";
import { n as mediaSizes } from "./mediaSizes-C1MTaleW.js";
import { a as getEmojiToneIndex } from "./emoji-Bi9QRCod.js";
import { t as classNames } from "./classNames-DxGDjmvw.js";
import { t as getMiddleware } from "./middleware-D6HuIqPm.js";
import { n as resolveElements } from "./dist-Fd6wPWkH.js";
import { t as Button } from "./buttonTsx-Bwphkm9r.js";
import { i as createPopup, n as PopupElement, t as PopupContext } from "./indexTsx-v9mB9bAq.js";
import { d as saveLottiePreviewFromPlayer, o as createMiddleware } from "./sticker-5twBOy1Y.js";
import { t as lottieLoader } from "./lottieLoader-B3FXw0K7.js";
import { t as appDownloadManager } from "./appDownloadManager-ClHW2-Dl.js";
import { t as InputField } from "./inputField-CaCo30N0.js";
import { f as createListTransition } from "./animations-DCmLIda3.js";
import { i as Row, r as showPeerPopup } from "./confirmationPopup-Bz6mK0o-.js";
import { n as wrapEmojiText } from "./wrapEmojiText-DT39R5Tj.js";
import { a as Section } from "./emailVerification-C8QYZSyu.js";
import { r as toastNew } from "./toast-B6VD5M7R.js";
import { t as TransitionSlider } from "./transition-BRcIGNUC.js";
import { t as ChatType } from "./chatType-C89v744i.js";
import { t as wrapStickerEmoji } from "./stickerEmoji-Ccji1LLa.js";
//#region src/components/popups/sendNow.ts
function showSendNowPopup(peerId, mids, onConfirm) {
	showPeerPopup("popup-delete-chat", {
		title: `Send Message${mids.length > 1 ? "s" : ""} Now`,
		description: mids.length > 1 ? "Send " + mids.length + " messages now?" : "Send message now?",
		buttons: [{
			langKey: "Send",
			callback: () => {
				onConfirm && onConfirm();
				rootScope.managers.appMessagesManager.sendScheduledMessages(peerId, mids);
			}
		}]
	});
}
//#endregion
//#region src/components/chat/getSelectionElementFromTarget.ts
/**
* The message unit a click addresses: a single item of an album (a photo, a video or a document of
* a group), or the whole bubble otherwise. What ChatSelection selects — and what the context menu
* highlights as its target.
*/
function getSelectionElementFromTarget(target) {
	return findUpClassName(target, "grouped-item") || findUpClassName(target, "bubble");
}
//#endregion
//#region src/helpers/dom/cancelSelection.ts
function cancelSelection() {
	const win = getAppWindow();
	if (win.getSelection) {
		if (win.getSelection().empty) win.getSelection().empty();
		else if (win.getSelection().removeAllRanges) win.getSelection().removeAllRanges();
	} else if (document.selection) document.selection.empty();
}
//#endregion
//#region src/helpers/dom/getSelectedText.ts
function getSelectedText() {
	if (getAppWindow().getSelection) return getAppWindow().getSelection().toString();
	else if (document.selection) return document.selection.createRange().text;
	return "";
}
//#endregion
//#region src/helpers/solid/transitionGroup.ts
var TransitionGroup = (props) => {
	const observeElement = (element, callback) => {
		const transition = props.transitions.get(element);
		createEffect((prev) => {
			const t = transition();
			if (prev || t) {
				if (!t) callback();
				return true;
			}
		});
	};
	const disposers = /* @__PURE__ */ new Map();
	const exitElement = (element, callback) => {
		createRoot((dispose) => {
			disposers.set(element, dispose);
			observeElement(element, () => {
				dispose();
				callback();
			});
			onCleanup(() => {
				if (disposers.get(element) === dispose) disposers.delete(element);
			});
		});
	};
	onCleanup(() => {
		disposers.forEach((dispose) => dispose());
	});
	return createListTransition(resolveElements(() => props.children).toArray, {
		exitMethod: "keep-relative",
		onChange: ({ added, removed, finishRemoved }) => {
			for (const element of added) disposers.get(element)?.();
			if (props.noWait?.() || !liteMode.isAvailable("motion")) {
				finishRemoved(removed);
				return;
			}
			const filtered = [];
			for (const element of removed) {
				if (!props.transitions.has(element)) {
					filtered.push(element);
					continue;
				}
				exitElement(element, () => {
					finishRemoved([element]);
				});
			}
			if (filtered.length) finishRemoved(filtered);
		}
	});
};
//#endregion
//#region src/helpers/preloadAnimatedEmojiSticker.ts
function preloadAnimatedEmojiSticker(emoji, width, height) {
	return rootScope.managers.appStickersManager.preloadAnimatedEmojiSticker(emoji).then(({ doc }) => {
		if (!doc) return;
		return appDownloadManager.downloadMedia({ media: doc }).then(async (blob) => {
			const mediaSize = mediaSizes.active.emojiSticker;
			const toneIndex = getEmojiToneIndex(emoji);
			const middlewareHelper = getMiddleware();
			const animation = await lottieLoader.loadAnimationWorker({
				container: void 0,
				animationData: blob,
				width: width ?? mediaSize.width,
				height: height ?? mediaSize.height,
				name: "doc" + doc.id,
				autoplay: false,
				loop: false,
				toneIndex,
				group: "none",
				middleware: middlewareHelper.get()
			});
			animation.addEventListener("firstFrame", () => {
				saveLottiePreviewFromPlayer(doc, animation, toneIndex).finally(() => {
					middlewareHelper.destroy();
				});
			}, { once: true });
		});
	});
}
//#endregion
//#region src/components/popups/reportAd.tsx
var _tmpl$ = /*#__PURE__*/ template(`<div>`);
var _tmpl$2 = /*#__PURE__*/ template(`<div class="popup-report-ad-tabs tabs-container">`);
var _tmpl$3 = /*#__PURE__*/ template(`<div class="transition slide-fade"><div class=transition-item></div><div class=transition-item><div class=popup-report-ad-header-rows><div class=popup-report-ad-header-title></div><div class=popup-report-ad-header-subtitle>`);
var STICKER_EMOJI = "👮‍♀️";
var getTerminalState = (result) => {
	const hasReported = result._ === "channels.sponsoredMessageReportResultReported" || result._ === "reportResultReported";
	const hasHidden = result._ === "channels.sponsoredMessageReportResultAdsHidden";
	return hasReported || hasHidden ? { hasReported } : void 0;
};
function showReportAdPopup(type, report, onAdHide, onError, initial) {
	const managers = bindManagersToSession(rootScope.managers);
	preloadAnimatedEmojiSticker(STICKER_EMOJI);
	const finishReport = (hasReported) => {
		onAdHide?.();
		toastNew({ langPackKey: type === "ad" ? hasReported ? "Ads.Reported" : "AdHidden" : "Reported2" });
	};
	const handleError = (err, option, text) => {
		if (err?.type === "MIDDLEWARE") return true;
		console.error("report error", err);
		if (onError?.(err, option, text)) return true;
		toastNew({ langPackKey: "Error.AnError" });
		return false;
	};
	function Inner(props) {
		const context = useContext(PopupContext);
		const transitions = /* @__PURE__ */ new WeakMap();
		const [sections, setSections] = createSignal([]);
		const [activeSection, setActiveSection] = createSignal();
		function renderSection(result, prevText) {
			const [option, setOption] = createSignal(void 0, { equals: false });
			const [data] = createResource(() => option()?.option, (option) => report(option).catch((err) => {
				if (handleError(err, option)) context.hide();
				setOption();
			}));
			const onReport = (hasReported) => {
				context.hide();
				finishReport(hasReported);
			};
			createEffect(() => {
				const _data = data();
				if (!_data) return;
				const terminal = getTerminalState(_data);
				if (terminal) {
					onReport(terminal.hasReported);
					return;
				}
				const rendered = renderSection(_data, untrack(option).text);
				const middleware = createMiddleware().get();
				rendered.readyPromise.then(() => {
					if (!middleware()) return;
					setSections((sections) => [...sections, rendered]);
				});
				setOption();
			});
			const [transition, setTransition] = createSignal(false);
			let timeout;
			const onTransition = (e) => {
				if (e.target !== container) return;
				const isStart = e.type === "transitionstart";
				setTransition(isStart);
				clearTimeout(timeout);
				if (isStart) timeout = window.setTimeout(() => {
					setTransition(false);
				}, 300);
			};
			let maxHeight, setMaxHeight;
			let stickerDiv, inputField, sendButton;
			let readyPromise = Promise.resolve();
			const isComment = result._ === "reportResultAddComment";
			if (isComment) {
				stickerDiv = document.createElement("div");
				const size = 130;
				readyPromise = wrapStickerEmoji({
					div: stickerDiv,
					emoji: STICKER_EMOJI,
					width: size,
					height: size,
					middleware: createMiddleware().get()
				}).then(({ render }) => render);
				inputField = new InputField({
					label: "ReportHint",
					maxLength: 512,
					placeholder: result.pFlags.optional ? "Report2CommentOptional" : "Report2Comment",
					required: !result.pFlags.optional
				});
				inputField.input.setAttribute("aria-label", langPack_default.format("ReportHint", true));
				[maxHeight, setMaxHeight] = createSignal();
			} else maxHeight = () => 48 * result.options.length;
			let container, caption;
			const activeHeight = createMemo(() => {
				const section = activeSection();
				const height = section?.maxHeight();
				return height && section.isComment && !isComment ? height - 64 : height;
			});
			const inner = isComment ? [stickerDiv, memo(() => inputField.container)] : createComponent(For, {
				get each() {
					return result.options;
				},
				children: (option) => {
					return createComponent(Row, {
						clickable: () => setOption(option),
						get children() {
							return [createComponent(Row.Title, { get children() {
								return wrapEmojiText(option.text);
							} }), createComponent(Row.RightContent, { get children() {
								return Icon("next", "popup-report-ad-option-arrow-icon");
							} })];
						}
					});
				}
			});
			createComponent(Section, {
				ref(r$) {
					var _ref$ = container;
					typeof _ref$ === "function" ? _ref$(r$) : container = r$;
				},
				get name() {
					return memo(() => "title" in result)() ? wrapEmojiText(result.title) : void 0;
				},
				caption: type === "ad" ? "ReportAdLearnMore" : isComment ? "ReportInfo" : void 0,
				captionRef: (ref) => caption = ref,
				"class": "popup-report-ad-tab tabs-tab",
				noShadow: true,
				noDelimiter: true,
				onTransitionStart: onTransition,
				onTransitionEnd: onTransition,
				get children() {
					var _el$ = _tmpl$();
					insert(_el$, inner);
					createRenderEffect((_p$) => {
						var _v$ = classNames("popup-report-ad-tab-options"), _v$2 = (activeHeight() || maxHeight()) + "px";
						_v$ !== _p$.e && className(_el$, _p$.e = _v$);
						_v$2 !== _p$.t && setStyleProperty(_el$, "height", _p$.t = _v$2);
						return _p$;
					}, {
						e: void 0,
						t: void 0
					});
					return _el$;
				}
			});
			transitions.set(container, transition);
			onCleanup(() => transitions.delete(container));
			if (isComment) {
				const [disabled, setDisabled] = createSignal(false);
				createComponent(Button, {
					ref(r$) {
						var _ref$2 = sendButton;
						typeof _ref$2 === "function" ? _ref$2(r$) : sendButton = r$;
					},
					get disabled() {
						return disabled();
					},
					"class": "btn-primary btn-color-primary popup-report-ad-send-button",
					text: "Report2Send",
					onClick: async () => {
						setDisabled(true);
						inputField.input.contentEditable = "false";
						try {
							await report(result.option, inputField.value);
							onReport(true);
						} catch (err) {
							if (handleError(err, result.option, inputField.value)) {
								context.hide();
								return;
							}
							setDisabled(false);
							inputField.input.contentEditable = "true";
						}
					}
				});
				const onChange = () => {
					setDisabled(!inputField.isValid());
					setMaxHeight((inputField.value ? inputField.container.offsetHeight : 54) + 142 + 147);
				};
				inputField.input.addEventListener("input", onChange);
				onChange();
				caption.classList.add("popup-report-ad-comment-caption");
				caption.after(sendButton);
			}
			return {
				container,
				transition,
				maxHeight,
				prevText,
				readyPromise,
				isComment
			};
		}
		setSections([renderSection(props.reportResult)]);
		createEffect(() => {
			const _sections = sections();
			transition(_sections.length - 1);
			headerTransition(_sections.length === 1 ? 0 : 1);
			if (!untrack(activeSection)) setActiveSection(_sections[_sections.length - 1]);
		});
		let container;
		const body = (() => {
			var _el$2 = _tmpl$2();
			var _ref$3 = container;
			typeof _ref$3 === "function" ? use(_ref$3, _el$2) : container = _el$2;
			insert(_el$2, createComponent(TransitionGroup, {
				transitions,
				get children() {
					return sections().map(({ container }) => container);
				}
			}));
			return _el$2;
		})();
		const transition = TransitionSlider({
			content: container,
			type: "tabs",
			transitionTime: 150,
			animateFirst: false,
			onTransitionStartAfter: () => {
				setActiveSection(sections()[sections().length - 1]);
			}
		});
		const prevText = createMemo((prev) => activeSection()?.prevText ?? prev);
		const titleKey = type === "ad" ? "ReportAd" : "ReportChat";
		let titleRef;
		const title = (() => {
			var _el$3 = _tmpl$3(), _el$4 = _el$3.firstChild, _el$7 = _el$4.nextSibling.firstChild.firstChild, _el$8 = _el$7.nextSibling;
			var _ref$4 = titleRef;
			typeof _ref$4 === "function" ? use(_ref$4, _el$3) : titleRef = _el$3;
			insert(_el$4, () => i18n(titleKey));
			insert(_el$7, () => i18n(titleKey));
			insert(_el$8, () => wrapEmojiText(prevText()));
			return _el$3;
		})();
		const headerTransition = TransitionSlider({
			content: titleRef,
			type: "slide-fade",
			transitionTime: 400,
			isHeavy: false
		});
		return [createComponent(PopupElement.Header, { get children() {
			return [createComponent(PopupElement.CloseButton, {
				get canGoBack() {
					return sections().length > 1;
				},
				onBackClick: () => {
					setSections((sections) => sections.slice(0, -1));
				}
			}), createComponent(PopupElement.Title, { children: title })];
		} }), createComponent(PopupElement.Scrollable, { get children() {
			return createComponent(PopupElement.Body, { children: body });
		} })];
	}
	report(initial?.option ?? /* @__PURE__ */ new Uint8Array(), initial?.text).then((reportResult) => {
		const terminal = getTerminalState(reportResult);
		if (terminal) {
			finishReport(terminal.hasReported);
			return;
		}
		createPopup(() => createComponent(PopupElement, {
			managers,
			"class": "popup-report-ad",
			closable: true,
			old: true,
			show: true,
			get children() {
				return createComponent(Inner, { reportResult });
			}
		}));
	}, (err) => {
		handleError(err, initial?.option ?? /* @__PURE__ */ new Uint8Array(), initial?.text);
	});
}
function showAdReport(sponsoredMessage, onAdHide) {
	showReportAdPopup("ad", (option) => rootScope.managers.appMessagesManager.reportSponsoredMessage(sponsoredMessage.random_id, option), onAdHide);
}
function showMessageReport(peerId, mids, onFinish) {
	showReportAdPopup("message", (option, text) => rootScope.managers.appMessagesManager.reportMessages(peerId, mids, option, text), onFinish);
}
function showPeerReport(peerId) {
	let selecting = false;
	showReportAdPopup("peer", (option, text) => rootScope.managers.appMessagesManager.reportMessages(peerId, [], option, text), void 0, (err, option, text) => {
		if (err?.type !== "MESSAGE_ID_REQUIRED") return false;
		if (!selecting) {
			selecting = true;
			selectMessagesToReport(peerId, option, text);
		}
		return true;
	});
}
function showSelectedMessagesReport(peerId, mids, option, text, onFinish) {
	showReportAdPopup("peer", (option, text) => rootScope.managers.appMessagesManager.reportMessages(peerId, mids, option, text), onFinish, void 0, {
		option,
		text
	});
}
async function selectMessagesToReport(peerId, option, text) {
	const chat = hotReloadGuard.appImManager.chat;
	if (chat?.peerId !== peerId || chat.type !== ChatType.Chat) return;
	chat.selection.enterReportSelection({
		option,
		text
	});
	toastNew({ langPackKey: "Report2SelectMessages" });
}
function showStoryReport(peerId, ids, onFinish) {
	showReportAdPopup("story", (option, text) => rootScope.managers.appStoriesManager.report(peerId, ids, option, text), onFinish);
}
/**
* The reasons tdesktop and iOS give for a profile or chat photo, in their order. "Other" asks what is wrong, as
* on Android and iOS; the rest are sent at once.
*/
var PROFILE_PHOTO_REPORT_REASONS = [
	["ReportChatSpam", "inputReportReasonSpam"],
	["ReportChatViolence", "inputReportReasonViolence"],
	["ReportChatChild", "inputReportReasonChildAbuse"],
	["ReportChatPornography", "inputReportReasonPornography"],
	["ReportChatCopyright", "inputReportReasonCopyright"],
	["ReportChatOther", "inputReportReasonOther"]
];
/**
* A photo is reported by a reason (`account.reportProfilePhoto`), not by the server's options: the reasons are
* put to the report popup as options of its own, one byte each — the reason's place in the list, from 1.
*/
function createProfilePhotoReport(managers, peerId, photoId, titleKey) {
	return async (option, text) => {
		const reason = PROFILE_PHOTO_REPORT_REASONS[option[0] - 1];
		if (!reason) return {
			_: "reportResultChooseOption",
			title: langPack_default.format(titleKey, true),
			options: PROFILE_PHOTO_REPORT_REASONS.map(([key], index) => ({
				_: "messageReportOption",
				text: langPack_default.format(key, true),
				option: new Uint8Array([index + 1])
			}))
		};
		const [, reasonType] = reason;
		if (reasonType === "inputReportReasonOther" && text === void 0) return {
			_: "reportResultAddComment",
			pFlags: {},
			option
		};
		await managers.appProfileManager.reportProfilePhoto(peerId, photoId, { _: reasonType }, text);
		return { _: "reportResultReported" };
	};
}
function showProfilePhotoReport(peerId, photoId, titleKey) {
	showReportAdPopup("photo", createProfilePhotoReport(bindManagersToSession(rootScope.managers), peerId, photoId, titleKey));
}
//#endregion
export { showSelectedMessagesReport as a, TransitionGroup as c, getSelectionElementFromTarget as d, showSendNowPopup as f, showProfilePhotoReport as i, getSelectedText as l, showMessageReport as n, showStoryReport as o, showPeerReport as r, preloadAnimatedEmojiSticker as s, showAdReport as t, cancelSelection as u };
