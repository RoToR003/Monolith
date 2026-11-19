//# allFunctionsCalledOnLoad
import { t as apiManagerProxy } from "./apiManagerProxy-DmQXvxSF.js";
import { a as i18n } from "./langPack-BmdJGr44.js";
import { C as createSignal, M as onCleanup, _ as createMemo, p as createComponent, s as Show, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { c as insert, f as setAttribute, g as template, o as className, u as memo } from "./web-BPyQozky.js";
import { n as hotReloadGuard } from "./hotReloadGuardProvider-CHEsZRuG.js";
import { t as IconTsx } from "./iconTsx-B4lOk4A6.js";
import { t as Button } from "./buttonTsx-Bwphkm9r.js";
import { i as createPopup, n as PopupElement } from "./indexTsx-v9mB9bAq.js";
import { A as AvatarNewTsx, i as Row } from "./confirmationPopup-Bz6mK0o-.js";
import { U as getPeerId } from "./canPollPeerStories-D3HoBvLX.js";
import { Wt as getCommunityPeerParticipantsCount } from "./appDialogsManager-CXguiKc3.js";
import { t as MediaHeader } from "./mediaHeader-CnpQNwOl.js";
import { n as toast, r as toastNew, t as hideToast } from "./toast-B6VD5M7R.js";
import { t as formatNumber } from "./formatNumber-B_dJh0pa.js";
import { t as PeerTitleTsx } from "./peerTitleTsx-DcpEYRoE.js";
import { t as communityShared_module_default } from "./communityShared.module-UBZ3o4PU.js";
var communityPrivateChat_module_default = {
	popup: "_popup_i96eh_16",
	header: "_header_i96eh_20",
	info: "_info_i96eh_24"
};
//#endregion
//#region src/components/popups/communityPrivateChat.tsx
var _tmpl$$1 = /*#__PURE__*/ template(`<div><span>`);
function showCommunityPrivateChat(options) {
	const [show, setShow] = createSignal(false);
	const close = () => setShow(false);
	const kind = createMemo(() => {
		const peer = apiManagerProxy.getPeer(options.peerId);
		if (peer?._ === "user" && peer.pFlags.bot) return "bot";
		if (peer?._ === "channel" && peer.pFlags.broadcast) return "channel";
		return "group";
	});
	const infoKey = () => {
		switch (kind()) {
			case "bot": return "Community.PrivateBotInfo";
			case "channel": return "Community.PrivateChannelInfo";
			default: return "Community.PrivateChatInfo";
		}
	};
	const messageOwnerKey = () => {
		switch (kind()) {
			case "bot": return "Community.MessageBotOwner";
			case "channel": return "Community.MessageChannelOwner";
			default: return "Community.MessageOwner";
		}
	};
	createPopup(() => createComponent(PopupElement, {
		get ["class"]() {
			return communityPrivateChat_module_default.popup;
		},
		get show() {
			return show();
		},
		old: true,
		get children() {
			return [
				createComponent(PopupElement.Header, {
					get ["class"]() {
						return communityPrivateChat_module_default.header;
					},
					get children() {
						return createComponent(PopupElement.CloseButton, {});
					}
				}),
				createComponent(PopupElement.Body, { get children() {
					return [createComponent(MediaHeader, {
						marginTop: true,
						marginBottom: true,
						get children() {
							return [
								createComponent(MediaHeader.Sticker, {
									size: 100,
									get element() {
										return createComponent(AvatarNewTsx, {
											get peerId() {
												return options.peerId;
											},
											size: 100,
											isBig: true
										});
									}
								}),
								createComponent(MediaHeader.Title, { get children() {
									return createComponent(PeerTitleTsx, { get peerId() {
										return options.peerId;
									} });
								} }),
								createComponent(Show, {
									get when() {
										return options.memberCount !== void 0;
									},
									get children() {
										return createComponent(MediaHeader.Subtitle, {
											color: "secondary",
											get children() {
												return i18n(kind() === "channel" ? "Subscribers" : "Members", [options.memberCount]);
											}
										});
									}
								})
							];
						}
					}), (() => {
						var _el$ = _tmpl$$1(), _el$2 = _el$.firstChild;
						insert(_el$, createComponent(IconTsx, {
							"class": "inline-icon inline-icon-left",
							icon: "eye2_filled"
						}), _el$2);
						insert(_el$2, () => i18n(infoKey()));
						createRenderEffect(() => className(_el$, communityPrivateChat_module_default.info));
						return _el$;
					})()];
				} }),
				createComponent(PopupElement.Footer, { get children() {
					return [createComponent(Show, {
						get when() {
							return options.canOpenChat;
						},
						get children() {
							return createComponent(PopupElement.FooterButton, {
								color: "secondary",
								get langKey() {
									return kind() === "channel" ? "OpenChannel2" : "OpenChat";
								},
								callback: () => {
									hotReloadGuard.appImManager.setInnerPeer({ peerId: options.peerId });
								}
							});
						}
					}), createComponent(PopupElement.FooterButton, {
						get disabled() {
							return !options.requestedByPeerId;
						},
						callback: () => {
							if (options.requestedByPeerId) hotReloadGuard.appImManager.setInnerPeer({ peerId: options.requestedByPeerId });
						},
						get children() {
							return i18n(messageOwnerKey());
						}
					})];
				} })
			];
		}
	}));
	queueMicrotask(() => setShow(true));
	return close;
}
//#endregion
//#region src/components/communities/communityRequestNavigation.ts
function isCommunityRequestPrivate(request) {
	const peerId = getPeerId(request.peer);
	const peer = apiManagerProxy.getPeer(peerId);
	const hasPublicUsername = peer?._ === "channel" && (!!peer.username || !!peer.usernames?.some((username) => username.pFlags.active));
	return peer?._ === "channelForbidden" || peer?._ === "channel" && !request.pFlags.visible && !!peer.pFlags.left && !hasPublicUsername;
}
var communityManagement_module_default = {
	root: "_root_mjd38_1",
	danger: "_danger_mjd38_5",
	requestActions: "_requestActions_mjd38_9",
	requestAvatarMedia: "_requestAvatarMedia_mjd38_16",
	requestAction: "_requestAction_mjd38_9",
	bulkAction: "_bulkAction_mjd38_26",
	bulkActionUppercase: "_bulkActionUppercase_mjd38_31",
	requestMetadata: "_requestMetadata_mjd38_35",
	requestMetadataPill: "_requestMetadataPill_mjd38_41",
	requestMetadataIcon: "_requestMetadataIcon_mjd38_56",
	stickyBulkActions: "_stickyBulkActions_mjd38_60",
	bulkActionsScrollable: "_bulkActionsScrollable_mjd38_72",
	empty: "_empty_mjd38_77",
	retryAction: "_retryAction_mjd38_83",
	loadMoreSentinel: "_loadMoreSentinel_mjd38_87",
	captionAction: "_captionAction_mjd38_91"
};
//#endregion
//#region src/components/communities/communityPendingRequest.tsx
var _tmpl$ = /*#__PURE__*/ template(`<span>`);
var _tmpl$2 = /*#__PURE__*/ template(`<div>`);
var _tmpl$3 = /*#__PURE__*/ template(`<span><span>`);
async function showCommunityRequestError(options) {
	if (options.error.type === "COMMUNITY_PEERS_TOO_MUCH") try {
		const isBot = !!options.peerId?.isUser();
		const limit = await options.managers.appCommunitiesManager.getPeersLimit(isBot);
		toastNew({
			langPackKey: isBot ? "Community.BotPeersLimit" : "Community.PeersLimit",
			langPackArguments: [limit]
		});
		return;
	} catch {}
	toastNew({ langPackKey: options.error.type === "CHAT_ADMIN_REQUIRED" ? "Community.AdminRequired" : "Community.RequestFailed" });
}
function getSuggestedKey(peerId) {
	const peer = apiManagerProxy.getPeer(peerId);
	if (peer?._ === "user" && peer.pFlags.bot) return "Community.SuggestedBot";
	if (peer?._ === "channel" && peer.pFlags.broadcast) return "Community.SuggestedChannel";
	return "Community.SuggestedGroup";
}
function CommunityPendingRequestRow(props) {
	const peerId = getPeerId(props.request.peer);
	const requestedBy = props.request.requested_by.toPeerId(false);
	const requester = apiManagerProxy.getPeer(requestedBy);
	const peer = apiManagerProxy.getPeer(peerId);
	const membersCount = getCommunityPeerParticipantsCount(peer);
	const openRequest = () => {
		if (props.disabled) return;
		showCommunityPrivateChat({
			peerId,
			requestedByPeerId: requester ? requestedBy : void 0,
			memberCount: membersCount,
			canOpenChat: !isCommunityRequestPrivate(props.request)
		});
	};
	const onKeyDown = (event) => {
		if (!props.disabled && (event.key === "Enter" || event.key === " ")) {
			event.preventDefault();
			event.currentTarget.dispatchEvent(new MouseEvent("click", {
				bubbles: true,
				cancelable: true
			}));
		}
	};
	return createComponent(Row, {
		clickable: openRequest,
		role: "button",
		get tabIndex() {
			return props.disabled ? -1 : 0;
		},
		"on:keydown": onKeyDown,
		get disabled() {
			return props.disabled;
		},
		get children() {
			return [
				createComponent(Row.Media, {
					size: "abitbigger",
					get ["class"]() {
						return `${communityShared_module_default.avatarMedia} ${communityManagement_module_default.requestAvatarMedia}`;
					},
					get children() {
						return [createComponent(AvatarNewTsx, {
							get ["class"]() {
								return communityShared_module_default.peerAvatar;
							},
							peerId,
							size: 42
						}), createComponent(Show, {
							when: requester,
							get children() {
								var _el$ = _tmpl$();
								insert(_el$, createComponent(AvatarNewTsx, {
									peerId: requestedBy,
									size: 18
								}));
								createRenderEffect(() => className(_el$, communityShared_module_default.peerAvatarOverlay));
								return _el$;
							}
						})];
					}
				}),
				createComponent(Row.Title, {
					get titleRight() {
						return (() => {
							var _el$3 = _tmpl$();
							insert(_el$3, createComponent(Show, {
								when: membersCount !== void 0,
								get children() {
									var _el$4 = _tmpl$3(), _el$5 = _el$4.firstChild;
									insert(_el$4, createComponent(IconTsx, {
										get ["class"]() {
											return communityManagement_module_default.requestMetadataIcon;
										},
										icon: "group_filled",
										"aria-hidden": "true"
									}), _el$5);
									insert(_el$5, () => formatNumber(membersCount, 1));
									createRenderEffect((_p$) => {
										var _v$ = communityManagement_module_default.requestMetadataPill, _v$2 = i18n("Members", [membersCount]).textContent;
										_v$ !== _p$.e && className(_el$4, _p$.e = _v$);
										_v$2 !== _p$.t && setAttribute(_el$4, "aria-label", _p$.t = _v$2);
										return _p$;
									}, {
										e: void 0,
										t: void 0
									});
									return _el$4;
								}
							}), null);
							insert(_el$3, createComponent(Show, {
								get when() {
									return !props.request.pFlags.visible;
								},
								get children() {
									var _el$6 = _tmpl$();
									insert(_el$6, createComponent(IconTsx, {
										get ["class"]() {
											return communityManagement_module_default.requestMetadataIcon;
										},
										icon: "eye2_filled",
										"aria-hidden": "true"
									}));
									createRenderEffect((_p$) => {
										var _v$3 = communityManagement_module_default.requestMetadataPill, _v$4 = i18n("Community.Hidden").textContent;
										_v$3 !== _p$.e && className(_el$6, _p$.e = _v$3);
										_v$4 !== _p$.t && setAttribute(_el$6, "aria-label", _p$.t = _v$4);
										return _p$;
									}, {
										e: void 0,
										t: void 0
									});
									return _el$6;
								}
							}), null);
							createRenderEffect(() => className(_el$3, communityManagement_module_default.requestMetadata));
							return _el$3;
						})();
					},
					get children() {
						return createComponent(PeerTitleTsx, { peerId });
					}
				}),
				createComponent(Row.Subtitle, { get children() {
					return createComponent(Show, {
						when: requester,
						get fallback() {
							return i18n("Community.SuggestedBySomeone");
						},
						get children() {
							return [
								createComponent(PeerTitleTsx, { peerId: requestedBy }),
								" ",
								memo(() => i18n(getSuggestedKey(peerId)))
							];
						}
					});
				} }),
				(() => {
					var _el$2 = _tmpl$2();
					insert(_el$2, createComponent(Button, {
						get ["class"]() {
							return `${communityManagement_module_default.requestAction} btn-control-small`;
						},
						primaryFilled: true,
						get disabled() {
							return props.disabled;
						},
						text: "Add",
						onClick: (event) => {
							event.stopPropagation();
							props.onApply(props.request, false);
						}
					}), null);
					insert(_el$2, createComponent(Button, {
						get ["class"]() {
							return `${communityManagement_module_default.requestAction} btn-control-small`;
						},
						primaryTransparent: true,
						get disabled() {
							return props.disabled;
						},
						text: "Decline",
						onClick: (event) => {
							event.stopPropagation();
							props.onApply(props.request, true);
						}
					}), null);
					createRenderEffect(() => className(_el$2, communityManagement_module_default.requestActions));
					return _el$2;
				})()
			];
		}
	});
}
//#endregion
//#region src/components/communities/communityPendingRequestActions.ts
function getRequestSuccessKey(reject) {
	return reject ? "Community.RequestDeclined" : "Community.RequestAdded";
}
function createUndoToast(action, undo) {
	const content = document.createElement("span");
	const undoLink = document.createElement("a");
	undoLink.href = "#";
	undoLink.append(i18n("Undo"));
	undoLink.addEventListener("click", (event) => {
		event.preventDefault();
		event.stopPropagation();
		undo();
	});
	content.append(i18n(getRequestSuccessKey(action.reject)), " ", undoLink);
	return content;
}
function createCommunityPendingRequestActions(options) {
	const [stagedPeerIds, setStagedPeerIds] = createSignal(/* @__PURE__ */ new Set());
	const commits = /* @__PURE__ */ new Set();
	let activeAction;
	let disposed = false;
	const setStaged = (peerId, staged) => {
		if (disposed) return;
		setStagedPeerIds((current) => {
			const next = new Set(current);
			if (staged) next.add(peerId);
			else next.delete(peerId);
			return next;
		});
	};
	const commit = (action) => {
		if (action.canceled || action.committed) return Promise.resolve();
		action.committed = true;
		if (activeAction === action) activeAction = void 0;
		const promise = options.apply(action.request, action.reject).catch((error) => options.onError(error, action.request)).then(() => {}).finally(() => {
			commits.delete(promise);
			setStaged(action.peerId, false);
		});
		commits.add(promise);
		return promise;
	};
	const undo = (action) => {
		if (action.committed) return;
		action.canceled = true;
		if (activeAction === action) activeAction = void 0;
		setStaged(action.peerId, false);
		hideToast();
	};
	const stage = (request, reject) => {
		const peerId = getPeerId(request.peer);
		if (stagedPeerIds().has(peerId)) return;
		if (activeAction) commit(activeAction);
		const action = {
			peerId,
			request,
			reject,
			canceled: false,
			committed: false
		};
		activeAction = action;
		setStaged(peerId, true);
		toast(createUndoToast(action, () => undo(action)), () => void commit(action), 3e3);
	};
	const flush = async () => {
		if (activeAction) commit(activeAction);
		await Promise.all([...commits]);
	};
	onCleanup(() => {
		flush();
		disposed = true;
	});
	return {
		stage,
		flush,
		stagedPeerIds
	};
}
//#endregion
export { communityManagement_module_default as i, CommunityPendingRequestRow as n, showCommunityRequestError as r, createCommunityPendingRequestActions as t };
