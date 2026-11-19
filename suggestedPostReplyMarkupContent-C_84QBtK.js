//# allFunctionsCalledOnLoad
import { t as Icon } from "./icon-DbP6Es97.js";
import { n as rootScope } from "./rootScope-CZS0lmz8.js";
import { a as i18n } from "./langPack-BmdJGr44.js";
import { C as createSignal, o as Match, p as createComponent, u as Switch, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { n as bindManagersToSession } from "./bindManagersToAccount-BL82O9H9.js";
import { _ as use, c as insert, g as template, o as className, s as delegateEvents, u as memo } from "./web-BPyQozky.js";
import { r as useHotReloadGuard } from "./hotReloadGuard-BUNVkeQ4.js";
import { t as ripple } from "./ripple-D7hcIc_t.js";
import { t as I18nTsx } from "./i18n-CGMFiAW0.js";
import { i as createPopup, n as PopupElement } from "./indexTsx-v9mB9bAq.js";
import { t as InputFieldTsx } from "./inputFieldTsx-0SbEFdGE.js";
import { n as numberThousandSplitterForStars } from "./numberThousandSplitter-CGiPNwwW.js";
import { t as defineSolidElement } from "./defineSolidElement-DU5LO9SF.js";
import { dt as wrapPeerTitle, t as confirmationPopup } from "./confirmationPopup-Bz6mK0o-.js";
import { t as PeerTitleTsx } from "./peerTitleTsx-DcpEYRoE.js";
import { t as Space } from "./space-XGOOgiuc.js";
import { t as ReplyMarkupLayout } from "./replyMarkupLayout-DRqz3K4V.js";
import { t as PublishTimeField } from "./publishTimeField-Cbosu3ZN.js";
var styles_module_default = { Description: "_Description_jg6m1_1" };
//#endregion
//#region src/components/chat/bubbleParts/suggestedPostAcceptWithTimePopup/useFormattedCommission.ts
function useFormattedCommission() {
	const { useAppConfig } = useHotReloadGuard();
	const appConfig = useAppConfig();
	const commission = () => (appConfig.stars_suggested_post_commission_permille || 850) / 1e3;
	const formattedCommission = () => `${Math.round(commission() * 100)}%`;
	return {
		commission,
		formattedCommission
	};
}
//#endregion
//#region src/components/chat/bubbleParts/suggestedPostAcceptWithTimePopup/content.tsx
var _tmpl$$1 = /*#__PURE__*/ template(`<div>`);
var _tmpl$2$1 = /*#__PURE__*/ template(`<button class="btn-primary btn-color-primary btn-large">`);
var SuggestedPostAcceptWithTimePopupContent = defineSolidElement({
	name: "suggested-post-accept-with-time-popup-content",
	component: (props) => {
		const [publishTimestamp, setPublishTimestamp] = createSignal();
		const { commission, formattedCommission } = useFormattedCommission();
		let isFinishing = false;
		const onFinish = () => {
			if (isFinishing) return;
			isFinishing = true;
			rootScope.managers.monoforumDialogsStorage.toggleSuggestedPostApproval({
				parentPeerId: props.peerId,
				messageId: props.message.mid,
				scheduleTimestamp: publishTimestamp()
			});
			props.onFinish();
		};
		return [
			createComponent(Space, { amount: "0.5rem" }),
			(() => {
				var _el$ = _tmpl$$1();
				insert(_el$, createComponent(Switch, { get children() {
					return [createComponent(Match, {
						get when() {
							return props.offeredStars;
						},
						get children() {
							return createComponent(I18nTsx, {
								key: "SuggestedPosts.AcceptOfferDescription.ForAdminPaid",
								get args() {
									return [
										createComponent(PeerTitleTsx, { get peerId() {
											return props.message.fromId;
										} }),
										createComponent(I18nTsx, {
											key: "Stars",
											get args() {
												return [numberThousandSplitterForStars(props.offeredStars * commission())];
											}
										}),
										formattedCommission(),
										"24"
									];
								}
							});
						}
					}), createComponent(Match, {
						when: true,
						get children() {
							return createComponent(I18nTsx, {
								key: "SuggestedPosts.AcceptOfferDescription.ForAdmin",
								get args() {
									return [createComponent(PeerTitleTsx, { get peerId() {
										return props.message.fromId;
									} })];
								}
							});
						}
					})];
				} }));
				createRenderEffect(() => className(_el$, styles_module_default.Description));
				return _el$;
			})(),
			createComponent(Space, { amount: "1.5rem" }),
			createComponent(PublishTimeField, {
				noTimeLangKey: "SuggestedPosts.PublishingTime.PublishNow",
				get value() {
					return publishTimestamp();
				},
				onChange: setPublishTimestamp
			}),
			createComponent(Space, { amount: "2rem" }),
			(() => {
				var _el$2 = _tmpl$2$1();
				_el$2.$$click = onFinish;
				use(ripple, _el$2, () => true);
				insert(_el$2, createComponent(I18nTsx, { key: "SuggestedPosts.Accept" }));
				return _el$2;
			})(),
			createComponent(Space, { amount: "0.5rem" })
		];
	}
});
delegateEvents(["click"]);
//#endregion
//#region src/components/chat/bubbleParts/suggestedPostAcceptWithTimePopup/index.tsx
function showSuggestedPostAcceptWithTimePopup({ peerId, message, offeredStars, HotReloadGuard }) {
	const [show, setShow] = createSignal(true);
	const content = new SuggestedPostAcceptWithTimePopupContent();
	content.HotReloadGuard = HotReloadGuard;
	content.feedProps({
		peerId,
		message,
		offeredStars,
		onFinish: () => setShow(false)
	});
	createPopup(() => createComponent(PopupElement, {
		"class": "suggested-post-popup",
		closable: true,
		get show() {
			return show();
		},
		get children() {
			return [createComponent(PopupElement.Header, { get children() {
				return [createComponent(PopupElement.CloseButton, {}), createComponent(PopupElement.Title, { title: "SuggestedPosts.AcceptOffer" })];
			} }), createComponent(PopupElement.Body, { children: content })];
		}
	}));
}
var style_module_default = { Caption: "_Caption_wd2cn_1" };
//#endregion
//#region src/components/chat/bubbleParts/suggestedPostRejectPopup/content.tsx
var _tmpl$ = /*#__PURE__*/ template(`<div>`);
var _tmpl$2 = /*#__PURE__*/ template(`<button class="btn-primary btn-color-primary btn-large">`);
var MAX_LENGTH = 100;
var SuggestedPostRejectPopupContent = defineSolidElement({
	name: "suggested-post-reject-popup-content",
	component: (props) => {
		const [comment, setComment] = createSignal("");
		const tooLong = () => comment().length > MAX_LENGTH;
		let isFinishing = false;
		const onFinish = () => {
			if (isFinishing || tooLong()) return;
			isFinishing = true;
			rootScope.managers.monoforumDialogsStorage.toggleSuggestedPostApproval({
				parentPeerId: props.peerId,
				messageId: props.messageId,
				reject: true,
				rejectComment: comment() || void 0
			});
			props.onFinish();
		};
		return [
			createComponent(Space, { amount: "0.5rem" }),
			createComponent(InputFieldTsx, {
				get value() {
					return comment();
				},
				onRawInput: setComment,
				label: "SuggestedPosts.RejectComment.Label",
				maxLength: MAX_LENGTH
			}),
			(() => {
				var _el$ = _tmpl$();
				insert(_el$, createComponent(I18nTsx, { key: "SuggestedPosts.RejectComment.Caption" }));
				createRenderEffect(() => className(_el$, style_module_default.Caption));
				return _el$;
			})(),
			createComponent(Space, { amount: "2rem" }),
			(() => {
				var _el$2 = _tmpl$2();
				_el$2.$$click = onFinish;
				use(ripple, _el$2, () => true);
				insert(_el$2, createComponent(I18nTsx, { key: "SuggestedPosts.Reject" }));
				createRenderEffect(() => _el$2.disabled = tooLong());
				return _el$2;
			})(),
			createComponent(Space, { amount: "0.5rem" })
		];
	}
});
delegateEvents(["click"]);
//#endregion
//#region src/components/chat/bubbleParts/suggestedPostRejectPopup/index.tsx
function showSuggestedPostRejectPopup({ peerId, messageId }) {
	const [show, setShow] = createSignal(true);
	const content = new SuggestedPostRejectPopupContent();
	content.feedProps({
		peerId,
		messageId,
		onFinish: () => setShow(false)
	});
	createPopup(() => createComponent(PopupElement, {
		"class": "suggested-post-popup",
		closable: true,
		get show() {
			return show();
		},
		get children() {
			return [createComponent(PopupElement.Header, { get children() {
				return [createComponent(PopupElement.CloseButton, {}), createComponent(PopupElement.Title, { title: "SuggestedPosts.RejectOffer" })];
			} }), createComponent(PopupElement.Body, { children: content })];
		}
	}));
}
//#endregion
//#region src/components/chat/bubbleParts/suggestedPostReplyMarkupContent.tsx
var SuggestedPostReplyMarkupContent = defineSolidElement({
	name: "suggested-post-reply-markup-content",
	component: (props) => {
		const { rootScope, HotReloadGuard } = useHotReloadGuard();
		const { commission, formattedCommission } = useFormattedCommission();
		const onAcceptClick = async () => {
			const managers = bindManagersToSession(rootScope.managers);
			const canManageDirectMessages = await managers.appPeersManager.canManageDirectMessages(props.message.peerId);
			const stars = props.message.suggested_post?.price?._ === "starsAmount" && +props.message.suggested_post?.price?.amount || void 0;
			let scheduleDate = props.message.suggested_post?.schedule_date || void 0;
			if (scheduleDate * 1e3 < Date.now()) scheduleDate = void 0;
			if (canManageDirectMessages && !scheduleDate) {
				showSuggestedPostAcceptWithTimePopup({
					message: props.message,
					peerId: props.chat.peerId,
					HotReloadGuard,
					offeredStars: stars
				});
				return;
			}
			try {
				await confirmationPopup({
					className: "suggested-post-popup",
					titleLangKey: "SuggestedPosts.AcceptOffer",
					descriptionLangKey: canManageDirectMessages ? stars ? "SuggestedPosts.AcceptOfferDescription.ForAdminPaid" : "SuggestedPosts.AcceptOfferDescription.ForAdmin" : "SuggestedPosts.AcceptOfferDescription.ForSubscriber",
					descriptionLangArgs: [await wrapPeerTitle({
						peerId: props.message.fromId,
						onlyFirstName: true
					}), ...canManageDirectMessages && stars ? [
						i18n("Stars", [numberThousandSplitterForStars((stars * commission()).toFixed(2))]),
						formattedCommission(),
						24
					] : []],
					button: { langKey: "SuggestedPosts.Accept" }
				});
				await managers.monoforumDialogsStorage.toggleSuggestedPostApproval({
					parentPeerId: props.message.peerId,
					messageId: props.message.mid
				});
			} catch {}
		};
		const onRejectClick = () => {
			showSuggestedPostRejectPopup({
				peerId: props.message.peerId,
				messageId: props.message.mid
			});
		};
		const onSuggestChangesClick = () => {
			props.chat.input.initSuggestPostChange(props.message.mid);
		};
		return createComponent(ReplyMarkupLayout, { get children() {
			return [createComponent(ReplyMarkupLayout.Row, { get children() {
				return [createComponent(ReplyMarkupLayout.Button, {
					textClass: "reply-markup-suggested-action",
					onClick: onRejectClick,
					get children() {
						return [memo(() => Icon("crossround_filled")), i18n("SuggestedPosts.Reject")];
					}
				}), createComponent(ReplyMarkupLayout.Button, {
					textClass: "reply-markup-suggested-action",
					onClick: onAcceptClick,
					get children() {
						return [memo(() => Icon("checkround_filled")), i18n("SuggestedPosts.Accept")];
					}
				})];
			} }), createComponent(ReplyMarkupLayout.Row, { get children() {
				return createComponent(ReplyMarkupLayout.Button, {
					textClass: "reply-markup-suggested-action",
					onClick: onSuggestChangesClick,
					get children() {
						return [memo(() => Icon("newchat_filled")), i18n("SuggestedPosts.SuggestChanges")];
					}
				});
			} })];
		} });
	}
});
//#endregion
export { SuggestedPostReplyMarkupContent as default };
