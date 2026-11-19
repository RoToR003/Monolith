//# allFunctionsCalledOnLoad
import { n as rootScope } from "./rootScope-CZS0lmz8.js";
import { o as Match, p as createComponent, s as Show, u as Switch, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { c as insert, g as template, o as className, u as memo } from "./web-BPyQozky.js";
import { t as I18nTsx } from "./i18n-CGMFiAW0.js";
import { n as numberThousandSplitterForStars } from "./numberThousandSplitter-CGiPNwwW.js";
import { L as formatFullSentTime } from "./index-B7axFZql.js";
import { t as defineSolidElement } from "./defineSolidElement-DU5LO9SF.js";
import "./confirmationPopup-Bz6mK0o-.js";
import { G as formatNanoton, U as getPeerId } from "./canPollPeerStories-D3HoBvLX.js";
import { n as wrapEmojiText } from "./wrapEmojiText-DT39R5Tj.js";
import { t as PeerTitleTsx } from "./peerTitleTsx-DcpEYRoE.js";
var suggestedPostActionContent_module_default = {
	Container: "_Container_dgqba_1",
	Label: "_Label_dgqba_9",
	Subtitle: "_Subtitle_dgqba_14",
	center: "_center_dgqba_21",
	Grid: "_Grid_dgqba_26",
	GridValue: "_GridValue_dgqba_34"
};
//#endregion
//#region src/components/chat/bubbleParts/suggestedPostActionContent.tsx
var _tmpl$ = /*#__PURE__*/ template(`<span>`);
var _tmpl$2 = /*#__PURE__*/ template(`<div>`);
var _tmpl$3 = /*#__PURE__*/ template(`<div>"<!>"`);
var LIMIT_SYMBOLS = 20;
var PriceTsx = (props) => memo(() => memo(() => props.price._ === "starsTonAmount")() ? createComponent(I18nTsx, {
	key: "SuggestedPosts.TONAmount",
	get args() {
		return [formatNanoton(props.price.amount, 2)];
	}
}) : createComponent(I18nTsx, {
	key: "Stars",
	get args() {
		return [numberThousandSplitterForStars(props.price.amount)];
	}
}));
var SuggestedPostActionContent = defineSolidElement({
	name: "suggested-post-action-content",
	component: (props) => {
		props.element.classList.add(suggestedPostActionContent_module_default.Container);
		const suggestedPost = () => props.message._ === "message" ? props.message.suggested_post : void 0;
		const isChangeSuggestion = () => !!props.message.reply_to;
		const wasPublished = () => props.action?._ === "messageActionSuggestedPostApproval" && props.action?.schedule_date && props.action.schedule_date * 1e3 <= Date.now();
		const savedPeerId = () => props.message.saved_peer_id && getPeerId(props.message.saved_peer_id);
		const chargedPeerId = () => savedPeerId() !== rootScope.myId ? savedPeerId() : void 0;
		const awardedPrice = () => props.action?._ === "messageActionSuggestedPostSuccess" && props.action.price;
		const chargedPrice = () => props.action?._ === "messageActionSuggestedPostApproval" && props.action.price ? createComponent(PriceTsx, { get price() {
			return props.action.price;
		} }) : void 0;
		const makeEmoji = (text) => (() => {
			var _el$ = _tmpl$();
			insert(_el$, () => wrapEmojiText(text));
			return _el$;
		})();
		return [
			(() => {
				var _el$2 = _tmpl$2();
				insert(_el$2, createComponent(Switch, { get children() {
					return [
						createComponent(Match, {
							get when() {
								return memo(() => !!suggestedPost())() && isChangeSuggestion();
							},
							get children() {
								return createComponent(I18nTsx, {
									get key() {
										return props.fromPeerTitle ? "SuggestedPosts.SuggestedAChange" : "SuggestedPosts.YouSuggestedAChange";
									},
									get args() {
										return memo(() => !!props.fromPeerTitle)() ? [props.fromPeerTitle] : void 0;
									}
								});
							}
						}),
						createComponent(Match, {
							get when() {
								return suggestedPost();
							},
							get children() {
								return createComponent(I18nTsx, {
									get key() {
										return props.fromPeerTitle ? "SuggestedPosts.SuggestedAPost" : "SuggestedPosts.YouSuggestedAPost";
									},
									get args() {
										return memo(() => !!props.fromPeerTitle)() ? [props.fromPeerTitle] : void 0;
									}
								});
							}
						}),
						createComponent(Match, {
							get when() {
								return props.action?._ === "messageActionSuggestedPostRefund";
							},
							get children() {
								return createComponent(I18nTsx, {
									key: "SuggestedPosts.Refund",
									get args() {
										return [createComponent(PeerTitleTsx, {
											get peerId() {
												return savedPeerId();
											},
											onlyFirstName: true,
											limitSymbols: LIMIT_SYMBOLS
										})];
									}
								});
							}
						}),
						createComponent(Match, {
							get when() {
								return memo(() => props.action?._ === "messageActionSuggestedPostApproval")() && props.action?.pFlags?.balance_too_low;
							},
							get children() {
								return createComponent(I18nTsx, {
									key: "SuggestedPosts.BalanceTooLow",
									get args() {
										return [wrapEmojiText("❌")];
									}
								});
							}
						}),
						createComponent(Match, {
							get when() {
								return memo(() => props.action?._ === "messageActionSuggestedPostApproval")() && props.action?.pFlags?.rejected;
							},
							get children() {
								return createComponent(I18nTsx, {
									get key() {
										return props.fromPeerTitle ? "SuggestedPosts.RejectedAPost" : "SuggestedPosts.YouRejectedAPost";
									},
									get args() {
										return memo(() => !!props.fromPeerTitle)() ? [wrapEmojiText("❌"), props.fromPeerTitle] : [wrapEmojiText("❌")];
									}
								});
							}
						}),
						createComponent(Match, {
							get when() {
								return props.action?._ === "messageActionSuggestedPostApproval";
							},
							get children() {
								return createComponent(I18nTsx, {
									key: "SuggestedPosts.AgreementReached",
									get args() {
										return [makeEmoji("🤝")];
									}
								});
							}
						}),
						createComponent(Match, {
							get when() {
								return props.action?._ === "messageActionSuggestedPostSuccess";
							},
							get children() {
								return createComponent(I18nTsx, {
									key: "SuggestedPosts.PostSuccess",
									get args() {
										return [makeEmoji("✅"), createComponent(PriceTsx, { get price() {
											return awardedPrice();
										} })];
									}
								});
							}
						})
					];
				} }));
				createRenderEffect(() => className(_el$2, suggestedPostActionContent_module_default.Label));
				return _el$2;
			})(),
			createComponent(Show, {
				get when() {
					return suggestedPost()?.price || suggestedPost()?.schedule_date;
				},
				get children() {
					var _el$3 = _tmpl$2();
					insert(_el$3, createComponent(Show, {
						get when() {
							return suggestedPost().price;
						},
						get children() {
							return [(() => {
								var _el$4 = _tmpl$2();
								insert(_el$4, createComponent(I18nTsx, { key: "SuggestedPosts.Price" }));
								return _el$4;
							})(), (() => {
								var _el$5 = _tmpl$2();
								insert(_el$5, createComponent(PriceTsx, { get price() {
									return suggestedPost().price;
								} }));
								createRenderEffect(() => className(_el$5, suggestedPostActionContent_module_default.GridValue));
								return _el$5;
							})()];
						}
					}), null);
					insert(_el$3, createComponent(Show, {
						get when() {
							return suggestedPost().schedule_date;
						},
						get children() {
							return [(() => {
								var _el$6 = _tmpl$2();
								insert(_el$6, createComponent(I18nTsx, { key: "SuggestedPosts.Time" }));
								return _el$6;
							})(), (() => {
								var _el$7 = _tmpl$2();
								insert(_el$7, () => formatFullSentTime(suggestedPost().schedule_date));
								createRenderEffect(() => className(_el$7, suggestedPostActionContent_module_default.GridValue));
								return _el$7;
							})()];
						}
					}), null);
					createRenderEffect(() => className(_el$3, suggestedPostActionContent_module_default.Grid));
					return _el$3;
				}
			}),
			memo(() => memo(() => !!(props.action?._ === "messageActionSuggestedPostApproval" && props.action.reject_comment))() && (() => {
				var _el$8 = _tmpl$3(), _el$1 = _el$8.firstChild.nextSibling;
				_el$1.nextSibling;
				insert(_el$8, () => props.action.reject_comment, _el$1);
				createRenderEffect(() => className(_el$8, `${suggestedPostActionContent_module_default.Subtitle} ${suggestedPostActionContent_module_default.center}`));
				return _el$8;
			})()),
			memo(() => memo(() => !!(props.action?._ === "messageActionSuggestedPostApproval" && !props.action?.pFlags?.balance_too_low && !props.action?.pFlags?.rejected))() && [createComponent(I18nTsx, {
				get ["class"]() {
					return suggestedPostActionContent_module_default.Subtitle;
				},
				get key() {
					return wasPublished() ? "SuggestedPosts.AgreementReached.Published" : "SuggestedPosts.AgreementReached.ToBePublished";
				},
				get args() {
					return [makeEmoji("📅"), formatFullSentTime(props.action.schedule_date)];
				}
			}), createComponent(Show, {
				get when() {
					return props.action.price;
				},
				get children() {
					return [
						createComponent(I18nTsx, {
							get ["class"]() {
								return suggestedPostActionContent_module_default.Subtitle;
							},
							get key() {
								return chargedPeerId() ? "SuggestedPosts.AgreementReached.HasBeenCharged" : "SuggestedPosts.AgreementReached.YouHaveBeenCharged";
							},
							get args() {
								return memo(() => !!chargedPeerId())() ? [
									makeEmoji("💰"),
									createComponent(PeerTitleTsx, {
										get peerId() {
											return chargedPeerId();
										},
										onlyFirstName: true,
										limitSymbols: LIMIT_SYMBOLS
									}),
									chargedPrice()
								] : [makeEmoji("💰"), chargedPrice()];
							}
						}),
						createComponent(I18nTsx, {
							get ["class"]() {
								return suggestedPostActionContent_module_default.Subtitle;
							},
							key: "SuggestedPosts.AgreementReached.WillReceive",
							get args() {
								return [
									makeEmoji("⏳"),
									createComponent(PeerTitleTsx, {
										get peerId() {
											return props.message.peerId;
										},
										limitSymbols: LIMIT_SYMBOLS
									}),
									"24"
								];
							}
						}),
						createComponent(I18nTsx, {
							get ["class"]() {
								return suggestedPostActionContent_module_default.Subtitle;
							},
							key: "SuggestedPosts.AgreementReached.WillBeRefunded",
							get args() {
								return [
									makeEmoji("🔄"),
									createComponent(PeerTitleTsx, {
										get peerId() {
											return props.message.peerId;
										},
										limitSymbols: LIMIT_SYMBOLS
									}),
									"24"
								];
							}
						})
					];
				}
			})])
		];
	}
});
//#endregion
export { SuggestedPostActionContent as default };
