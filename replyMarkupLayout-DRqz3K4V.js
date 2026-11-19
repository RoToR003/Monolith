//# allFunctionsCalledOnLoad
import { n as __exportAll } from "./rolldown-runtime-CwcJO0Gh.js";
import { t as findUpClassName } from "./findUpClassName-3V5me58N.js";
import { g as getPeerActiveUsernames } from "./objectUrlUtils-5x08MNuO.js";
import { n as rootScope } from "./rootScope-CZS0lmz8.js";
import { a as i18n, s as join } from "./langPack-BmdJGr44.js";
import { C as createSignal, M as onCleanup, R as useContext, _ as createMemo, f as children, g as createEffect, h as createContext, i as For, j as on, m as createComputed, p as createComponent, s as Show, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { n as bindManagersToSession } from "./bindManagersToAccount-BL82O9H9.js";
import { n as isEphemeralMessageId } from "./getServerMessageId-1hhP4U5Q.js";
import { t as cancelEvent } from "./cancelEvent-Cw8vYZHp.js";
import { _ as use, c as insert, d as render, g as template, o as className, u as memo } from "./web-BPyQozky.js";
import { r as useHotReloadGuard } from "./hotReloadGuard-BUNVkeQ4.js";
import { n as hotReloadGuard, t as SolidJSHotReloadGuardProvider } from "./hotReloadGuardProvider-CHEsZRuG.js";
import { a as makeMediaSize } from "./mediaSizes-C1MTaleW.js";
import { u as wrapRichText } from "./renderer-L80wjxct.js";
import { t as classNames } from "./classNames-DxGDjmvw.js";
import { t as IconTsx } from "./iconTsx-B4lOk4A6.js";
import { t as RippleElement } from "./rippleElement-C-prm4MP.js";
import { t as I18nTsx } from "./i18n-CGMFiAW0.js";
import { i as createPopup, n as PopupElement } from "./indexTsx-v9mB9bAq.js";
import { Kt as wrapCustomEmoji, dt as wrapPeerTitle, t as confirmationPopup } from "./confirmationPopup-Bz6mK0o-.js";
import { un as hasRights } from "./getChatMigratedTo-ChhMNXuu.js";
import { l as formatDuration, r as wrapFormattedDuration } from "./wrapDuration-BQgz9hDF.js";
import { t as MediaHeader } from "./mediaHeader-CnpQNwOl.js";
import { a as Section } from "./emailVerification-C8QYZSyu.js";
import { n as toast, r as toastNew } from "./toast-B6VD5M7R.js";
import { r as copyTextToClipboard } from "./clipboard-DzscV-ca.js";
import { i as showPickUser3Popup, r as showPickUser2Popup } from "./pickUser-D8S6yVuK.js";
import { t as toggleDisability } from "./toggleDisability-2oUcKWqw.js";
import { t as resolveAdminRightFlagI18n } from "./adminRightsI18nResolver-oCYjSlYl.js";
import { n as getButtonBackground, r as getButtonTypeIcon, t as CHATLESS_BUTTON_TYPES } from "./buttonTypes-Blee5UbL.js";
import { t as getBotExistingAdminRights } from "./getBotExistingAdminRights-C0wRVJtW.js";
import { t as SimpleFormField } from "./simpleFormField-CGA0MMzH.js";
import { t as createMutation } from "./createMutation-BLuhs8D-.js";
import { n as copyUrlButtonAnchor, r as createUrlButtonAnchor } from "./urlButtonAnchor-M4Obwqr2.js";
//#region src/components/chat/bubbleParts/filterReplyMarkupRows.ts
function filterReplyMarkupRows(rows) {
	return rows.filter((row) => row.buttons.length);
}
//#endregion
//#region src/components/popups/requestPeer.ts
var COMMON_CHATS_LIMIT = 100;
function holdsAdminRights(held, wanted) {
	return !!held && Object.keys(wanted.pFlags).every((right) => !wanted.pFlags[right] || held.pFlags[right]);
}
/**
* Whether the user can make the bot an admin of `chat` with `rights`, which the server does once the chat is sent
* to the bot: the owner can grant anything, an admin only with the right to add admins and every right asked for
*/
function canGrantBotAdminRights(chat, rights) {
	return hasRights(chat, "add_admins") && (!!chat.pFlags.creator || holdsAdminRights(chat.admin_rights, rights));
}
async function wrapPeerTitles(peerIds) {
	const titles = join(await Promise.all(peerIds.map((peerId) => wrapPeerTitle({ peerId }))), false);
	if (titles.length === 1) return titles[0];
	const element = document.createElement("span");
	element.append(...titles);
	return element;
}
function wrapAdminRights(rights, isBroadcast) {
	const keys = /* @__PURE__ */ new Set();
	for (const right in rights.pFlags) if (rights.pFlags[right]) keys.add(resolveAdminRightFlagI18n(right, { isBroadcast }));
	if (keys.delete("AdminRights.Other")) keys.add("AdminRights.Other");
	if (!keys.size) return;
	const element = document.createElement("span");
	element.append(...join([...keys].map((key) => i18n(key)), true));
	return element;
}
/**
* Asks before chats are sent to the bot. Sending one has the server add the bot to it — as an admin with the
* rights the bot asked for, or, for a group that has to have the bot in it, as a member — so the question says
* which chats the bot joins and with which rights. Rejects if the user declines.
*/
async function showRequestPeerConfirmation({ peerType, requestingPeerId, requestedPeerIds, botChatIds }) {
	const botAdminRights = peerType.bot_admin_rights;
	const isBotParticipant = peerType._ === "requestPeerTypeChat" && !!peerType.pFlags.bot_participant;
	const addedPeerIds = botAdminRights ? requestedPeerIds : isBotParticipant ? requestedPeerIds.filter((peerId) => !botChatIds?.includes(peerId.toChatId())) : [];
	const wrapBotTitle = () => wrapPeerTitle({ peerId: requestingPeerId });
	const descriptionLangArgs = [await wrapPeerTitles(requestedPeerIds), await wrapBotTitle()];
	let descriptionLangKey = "Chat.Service.PeerRequest.Confirm.Plain";
	if (addedPeerIds.length) {
		descriptionLangArgs.push(await wrapBotTitle(), await wrapPeerTitles(addedPeerIds));
		const rightsElement = botAdminRights && wrapAdminRights(botAdminRights, peerType._ === "requestPeerTypeBroadcast");
		if (rightsElement) {
			descriptionLangKey = "Chat.Service.PeerRequest.Confirm.Permission";
			descriptionLangArgs.push(rightsElement);
		} else descriptionLangKey = "Chat.Service.PeerRequest.Confirm.Add";
	}
	return confirmationPopup({
		descriptionLangKey,
		descriptionLangArgs,
		button: { langKey: "Chat.Service.PeerRequest.Confirm.Ok" }
	});
}
async function selectRequestPeers({ button, requestingPeerId }) {
	const peerType = button.peer_type;
	if (peerType._ === "requestPeerTypeCreateBot") throw new Error("REQUEST_PEER_CREATE_BOT_UNSUPPORTED");
	const isRequestingUser = peerType._ === "requestPeerTypeUser";
	const isRequestingChannel = peerType._ === "requestPeerTypeBroadcast";
	const isRequestingGroup = peerType._ === "requestPeerTypeChat";
	const managers = bindManagersToSession(rootScope.managers);
	let filterPeerTypeBy;
	let commonChatIds;
	const _peerType = ["dialogs"];
	if (isRequestingUser) {
		filterPeerTypeBy = (peer) => {
			if (peer._ !== "user") return false;
			if (peerType.bot !== void 0 && peerType.bot !== !!peer.pFlags.bot) return false;
			if (peerType.premium !== void 0 && peerType.premium !== !!peer.pFlags.premium) return false;
			return true;
		};
		_peerType.push("contacts");
	} else {
		let hasAllCommonChats = false;
		if (isRequestingGroup) {
			commonChatIds = (await managers.appUsersManager.getCommonChats(requestingPeerId, COMMON_CHATS_LIMIT)).chats.map((chat) => chat.id);
			hasAllCommonChats = commonChatIds.length < COMMON_CHATS_LIMIT;
		}
		const mayBotHoldAdminRights = async (chat, rights) => {
			if (!hasRights(chat, "just_admin") && !commonChatIds?.includes(chat.id)) return isRequestingChannel || !hasAllCommonChats;
			try {
				const participant = await managers.appProfileManager.getParticipant(chat.id, requestingPeerId);
				return holdsAdminRights(getBotExistingAdminRights(chat, participant), rights);
			} catch (err) {
				return err?.type !== "USER_NOT_PARTICIPANT";
			}
		};
		filterPeerTypeBy = (peer) => {
			if (peer._ !== "channel" && (isRequestingChannel ? true : peer._ !== "chat")) return false;
			if (!!peer.pFlags.broadcast !== isRequestingChannel) return false;
			if (peerType.pFlags.creator && !peer.pFlags.creator) return false;
			if (peerType.has_username !== void 0 && !!getPeerActiveUsernames(peer)[0] !== !!peerType.has_username) return false;
			if (peerType.forum !== void 0 && peerType.forum !== !!peer.pFlags.forum) return false;
			if (peerType.user_admin_rights) {
				for (const action in peerType.user_admin_rights.pFlags) if (!hasRights(peer, action)) return false;
			}
			if (peerType.pFlags.bot_participant) {
				if (!commonChatIds.includes(peer.id) && !hasRights(peer, "invite_users")) return false;
			}
			if (peerType.bot_admin_rights && !canGrantBotAdminRights(peer, peerType.bot_admin_rights)) return mayBotHoldAdminRights(peer, peerType.bot_admin_rights);
			return true;
		};
	}
	const requestedPeerIds = await showPickUser2Popup({
		peerType: _peerType,
		filterPeerTypeBy,
		multiSelect: true,
		limit: button.max_quantity,
		limitCallback: () => {
			toastNew({
				langPackKey: "RequestPeer.MultipleLimit",
				langPackArguments: [i18n(isRequestingUser ? "RequestPeer.MultipleLimit.Users" : isRequestingChannel ? "RequestPeer.MultipleLimit.Channels" : "RequestPeer.MultipleLimit.Groups", [button.max_quantity])]
			});
		},
		titleLangKey: isRequestingUser ? "RequestPeer.Title.Users" : isRequestingChannel ? "RequestPeer.Title.Channels" : "RequestPeer.Title.Groups"
	});
	if (!isRequestingUser) await showRequestPeerConfirmation({
		peerType,
		requestingPeerId,
		requestedPeerIds,
		botChatIds: commonChatIds
	});
	return requestedPeerIds;
}
var createBot_module_default = {
	popup: "_popup_rg9bv_1",
	popupBody: "_popupBody_rg9bv_5",
	usernameField: "_usernameField_rg9bv_9",
	usernameFieldHiddenPrefix: "_usernameFieldHiddenPrefix_rg9bv_12",
	usernameInput: "_usernameInput_rg9bv_20",
	usernameOverlay: "_usernameOverlay_rg9bv_26",
	usernameOverlayPrefix: "_usernameOverlayPrefix_rg9bv_39",
	usernameOverlaySuffix: "_usernameOverlaySuffix_rg9bv_40",
	usernameOverlayValue: "_usernameOverlayValue_rg9bv_44",
	linkInfoLink: "_linkInfoLink_rg9bv_48",
	statusError: "_statusError_rg9bv_52",
	statusSuccess: "_statusSuccess_rg9bv_56",
	statusLoading: "_statusLoading_rg9bv_60"
};
//#endregion
//#region src/components/popups/createBot/CreateBotPopup.tsx
var _tmpl$$1 = /*#__PURE__*/ template(`<div><span>@</span><span></span><span>bot`);
var _tmpl$2$1 = /*#__PURE__*/ template(`<span>`);
var _tmpl$3$1 = /*#__PURE__*/ template(`<span dir=ltr>t.me/`);
var USERNAME_SUFFIX = "bot";
var USERNAME_PREFIX = "@";
var MIN_USERNAME_LENGTH = 3;
var MAX_USERNAME_LENGTH = 29;
var MAX_BOT_NAME_LENGTH = 128;
var USERNAME_REGEX = /^[a-zA-Z][a-zA-Z0-9_]*$/;
var CreateBotPopup = (props) => {
	const { PeerTitleTsx, AvatarNewTsx, rootScope } = useHotReloadGuard();
	const [show, setShow] = createSignal(true);
	const [botName, setBotName] = createSignal(props.suggestedBotName ?? "");
	const [usernameValue, setUsernameValue] = createSignal(props.suggestedUsername ?? "");
	const [usernameStatus, setUsernameStatus] = createSignal({ state: "idle" });
	const trimmedName = createMemo(() => botName().trim());
	const nameError = createMemo(() => {
		const name = trimmedName();
		if (!name) return "empty";
		if (name.length > MAX_BOT_NAME_LENGTH) return "tooLong";
	});
	const submitMutation = createMutation(async () => {
		if (!isValid()) return false;
		return await props.onCreate({
			name: trimmedName(),
			username: fullUsername()
		});
	});
	function validateUsernameLocally(value) {
		if (!value) return { state: "idle" };
		if (!/^[a-zA-Z]/.test(value)) return {
			state: "invalid",
			reason: "mustStartLetter"
		};
		if (!USERNAME_REGEX.test(value)) return {
			state: "invalid",
			reason: "invalidChars"
		};
		if (value.length < MIN_USERNAME_LENGTH) return {
			state: "invalid",
			reason: "tooShort"
		};
		if (value.length > MAX_USERNAME_LENGTH) return {
			state: "invalid",
			reason: "tooLong"
		};
	}
	createComputed(on(usernameValue, (value) => {
		const managers = bindManagersToSession(rootScope.managers);
		const localResult = validateUsernameLocally(value);
		if (localResult) {
			setUsernameStatus(localResult);
			return;
		}
		setUsernameStatus({ state: "loading" });
		let cancelled = false;
		const timeout = self.setTimeout(async () => {
			if (cancelled) return;
			const fullUsername = value + USERNAME_SUFFIX;
			const result = await managers.appBotsManager.checkUsername(fullUsername);
			if (cancelled) return;
			if (usernameValue() !== value) return;
			if (result === "invalid") setUsernameStatus({
				state: "invalid",
				reason: "unknown"
			});
			else setUsernameStatus({ state: result });
		}, 500);
		onCleanup(() => {
			cancelled = true;
			self.clearTimeout(timeout);
		});
	}));
	const fullUsername = createMemo(() => usernameValue() + USERNAME_SUFFIX);
	const isValid = createMemo(() => {
		return !nameError() && usernameStatus().state === "available";
	});
	function handleUsernameChange(value) {
		let cleaned = value.replace(/[^a-zA-Z0-9_]/g, "");
		if (cleaned.length > MAX_USERNAME_LENGTH) cleaned = cleaned.slice(0, MAX_USERNAME_LENGTH);
		setUsernameValue(cleaned);
	}
	const usernameStatusKey = createMemo(() => {
		const s = usernameStatus();
		switch (s.state) {
			case "idle": return "CreateBot.Username.Caption";
			case "loading": return "CreateBot.Username.Checking";
			case "available": return "CreateBot.Username.Available";
			case "taken": return "CreateBot.Username.Taken";
			case "invalid":
				switch (s.reason) {
					case "tooShort": return "CreateBot.Username.TooShort";
					case "tooLong": return "CreateBot.Username.TooLong";
					case "mustStartLetter": return "CreateBot.Username.MustStartLetter";
					case "invalidChars": return "CreateBot.Username.InvalidChars";
					case "unknown": return "CreateBot.Username.Invalid";
				}
				break;
			case "error": return "CreateBot.Username.Error";
		}
	});
	const usernameStatusClass = createMemo(() => {
		const s = usernameStatus();
		if (s.state === "available") return createBot_module_default.statusSuccess;
		if (s.state === "taken" || s.state === "invalid") return createBot_module_default.statusError;
		if (s.state === "loading") return createBot_module_default.statusLoading;
	});
	return createComponent(PopupElement, {
		get ["class"]() {
			return createBot_module_default.popup;
		},
		get show() {
			return show();
		},
		get children() {
			return [
				createComponent(PopupElement.Header, {
					floating: true,
					get children() {
						return createComponent(PopupElement.CloseButton, {});
					}
				}),
				createComponent(PopupElement.Body, {
					get ["class"]() {
						return createBot_module_default.popupBody;
					},
					get children() {
						return [
							createComponent(MediaHeader, {
								marginTop: true,
								marginBottom: true,
								get children() {
									return [
										createComponent(MediaHeader.Sticker, {
											size: 120,
											get element() {
												return createComponent(AvatarNewTsx, {
													get peerId() {
														return props.requestingPeerId;
													},
													size: 120
												});
											}
										}),
										createComponent(MediaHeader.Title, { get children() {
											return createComponent(I18nTsx, { key: "CreateBot.Title" });
										} }),
										createComponent(MediaHeader.Subtitle, {
											color: "secondary",
											get children() {
												return createComponent(I18nTsx, {
													key: "CreateBot.Description",
													get args() {
														return [createComponent(PeerTitleTsx, { get peerId() {
															return props.requestingPeerId;
														} })];
													}
												});
											}
										})
									];
								}
							}),
							createComponent(Section, {
								caption: "CreateBot.Name.Caption",
								get children() {
									return createComponent(SimpleFormField, {
										get value() {
											return botName();
										},
										onChange: setBotName,
										get isError() {
											return memo(() => !!!!nameError())() && botName().length > 0;
										},
										get children() {
											return [createComponent(SimpleFormField.Label, { get children() {
												return createComponent(I18nTsx, { key: "CreateBot.Name.Label" });
											} }), createComponent(SimpleFormField.Input, {
												forceFieldValue: true,
												maxLength: MAX_BOT_NAME_LENGTH
											})];
										}
									});
								}
							}),
							createComponent(Section, {
								get caption() {
									return createComponent(Show, {
										get when() {
											return usernameStatus().state === "available";
										},
										get fallback() {
											return createComponent(Show, {
												get when() {
													return usernameStatusKey();
												},
												get children() {
													var _el$5 = _tmpl$2$1();
													insert(_el$5, createComponent(I18nTsx, { get key() {
														return usernameStatusKey();
													} }));
													createRenderEffect(() => className(_el$5, usernameStatusClass()));
													return _el$5;
												}
											});
										},
										get children() {
											return createComponent(I18nTsx, {
												key: "CreateBot.Link",
												get args() {
													return [(() => {
														var _el$6 = _tmpl$3$1();
														_el$6.firstChild;
														insert(_el$6, fullUsername, null);
														createRenderEffect(() => className(_el$6, createBot_module_default.linkInfoLink));
														return _el$6;
													})()];
												}
											});
										}
									});
								},
								get children() {
									return createComponent(SimpleFormField, {
										get ["class"]() {
											return createBot_module_default.usernameField;
										},
										get value() {
											return usernameValue();
										},
										onChange: handleUsernameChange,
										get isError() {
											return usernameStatus().state === "taken" || usernameStatus().state === "invalid";
										},
										get children() {
											return [
												createComponent(SimpleFormField.SideContent, {
													first: true,
													last: true,
													get ["class"]() {
														return createBot_module_default.usernameFieldHiddenPrefix;
													},
													children: USERNAME_PREFIX
												}),
												createComponent(SimpleFormField.Label, {
													active: true,
													get children() {
														return createComponent(I18nTsx, { key: "CreateBot.Username.Label" });
													}
												}),
												createComponent(SimpleFormField.Input, {
													forceFieldValue: true,
													get ["class"]() {
														return createBot_module_default.usernameInput;
													},
													autocapitalize: "off",
													autocomplete: "off",
													spellcheck: false
												}),
												(() => {
													var _el$ = _tmpl$$1(), _el$2 = _el$.firstChild, _el$3 = _el$2.nextSibling, _el$4 = _el$3.nextSibling;
													insert(_el$3, usernameValue);
													createRenderEffect((_p$) => {
														var _v$ = createBot_module_default.usernameOverlay, _v$2 = createBot_module_default.usernameOverlayPrefix, _v$3 = createBot_module_default.usernameOverlayValue, _v$4 = createBot_module_default.usernameOverlaySuffix;
														_v$ !== _p$.e && className(_el$, _p$.e = _v$);
														_v$2 !== _p$.t && className(_el$2, _p$.t = _v$2);
														_v$3 !== _p$.a && className(_el$3, _p$.a = _v$3);
														_v$4 !== _p$.o && className(_el$4, _p$.o = _v$4);
														return _p$;
													}, {
														e: void 0,
														t: void 0,
														a: void 0,
														o: void 0
													});
													return _el$;
												})()
											];
										}
									});
								}
							})
						];
					}
				}),
				createComponent(PopupElement.Footer, { get children() {
					return createComponent(PopupElement.FooterButton, {
						get disabled() {
							return !isValid() || submitMutation.isPending();
						},
						langKey: "CreateBot.Create",
						callback: () => submitMutation.mutateAsync()
					});
				} })
			];
		}
	});
};
//#endregion
//#region src/components/popups/createBot/index.tsx
function showCreateBotPopup(props) {
	const { HotReloadGuard, ...rest } = props;
	createPopup(() => createComponent(HotReloadGuard, { get children() {
		return createComponent(CreateBotPopup, rest);
	} }));
}
//#endregion
//#region src/components/wrappers/keyboardButton.ts
var keyboardButton_exports = /* @__PURE__ */ __exportAll({
	default: () => wrapKeyboardButton,
	getKeyboardButtonHandler: () => getKeyboardButtonHandler,
	getRichPageButtonHandler: () => getRichPageButtonHandler
});
function openUserProfile(peerId) {
	hotReloadGuard.appImManager.setInnerPeer({ peerId });
	hotReloadGuard.appSidebarRight.toggleSidebar(true);
}
/**
* What a button of this type does. The bot keyboards and the buttons laid out inside a rich
* message share it; they differ only in the label and the style drawn around it. `label` is the
* button's text as a string, for the places that need one (a web view's title, the reply
* keyboard's plain button that sends its text).
*/
function getButtonTypeHandler({ type, label, chat, message, replyMarkup }) {
	let buttonEl;
	const result = {
		as: "button",
		classNames: [],
		icon: getButtonTypeIcon(type),
		refCallbacks: [(ref) => {
			buttonEl = ref;
		}]
	};
	if (!chat && !CHATLESS_BUTTON_TYPES.has(type._)) {
		result.classNames.push("is-disabled");
		result.unavailable = true;
		return result;
	}
	const peerId = chat?.peerId;
	const messageMedia = message?.media;
	const messageMid = replyMarkup?.mid || message?.mid;
	const botId = replyMarkup?.fromId || message?.viaBotId || message?.fromId;
	switch (type._) {
		case "inlineButtonTypeUrl": {
			const anchor = createUrlButtonAnchor(type.url);
			result.as = "a";
			result.classNames.push("is-link", anchor.className);
			result.refCallbacks.push((ref) => copyUrlButtonAnchor(anchor, ref));
			break;
		}
		case "inlineButtonTypeSwitchInline":
			result.classNames.push("is-switch-inline");
			result.onClick = (e) => {
				const managers = bindManagersToSession(rootScope.managers);
				cancelEvent(e);
				let promise;
				if (type.pFlags.same_peer) promise = Promise.resolve(peerId);
				else promise = managers.appInlineBotsManager.checkSwitchReturn(botId).then((peerId) => {
					if (peerId) return peerId;
					let types;
					if (type.peer_types) {
						const map = {
							inlineQueryPeerTypePM: "users",
							inlineQueryPeerTypeBotPM: "bots",
							inlineQueryPeerTypeBroadcast: "channels",
							inlineQueryPeerTypeChat: "groups",
							inlineQueryPeerTypeMegagroup: "groups"
						};
						types = type.peer_types.map((type) => map[type._]);
					}
					return showPickUser3Popup(types, ["send_inline"]);
				});
				promise.then(async (chosenPeerId) => {
					const threadId = peerId === chosenPeerId ? chat.threadId : void 0;
					await chat.appImManager.setInnerPeer({
						peerId: chosenPeerId,
						threadId
					});
					managers.appInlineBotsManager.switchInlineQuery(chosenPeerId, threadId, botId, type.query);
				});
			};
			break;
		case "inlineButtonTypeBuy": {
			const mediaInvoice = messageMedia?._ === "messageMediaInvoice" ? messageMedia : void 0;
			if (mediaInvoice?.extended_media) return;
			result.classNames.push("is-buy");
			if (mediaInvoice?.receipt_msg_id) {
				result.text = i18n("Message.ReplyActionButtonShowReceipt");
				result.classNames.push("is-receipt");
			}
			break;
		}
		case "inlineButtonTypeUrlAuth": {
			result.classNames.push("is-url-auth");
			const { url, button_id } = type;
			result.onClick = () => {
				const toggle = toggleDisability([buttonEl], true);
				chat.appImManager.handleUrlAuth({
					peerId,
					mid: messageMid,
					url,
					buttonId: button_id
				}).then(() => {
					toggle();
				});
			};
			break;
		}
		case "buttonTypeSimpleWebView":
		case "inlineButtonTypeWebView":
			result.classNames.push("is-web-view");
			result.onClick = () => {
				const toggle = toggleDisability([buttonEl], true);
				chat.openWebApp({
					botId,
					url: type.url,
					isSimpleWebView: type._ === "buttonTypeSimpleWebView",
					buttonText: label
				}).finally(() => {
					toggle();
				});
			};
			break;
		case "buttonTypeRequestPhone":
			result.classNames.push("is-request-phone");
			result.onClick = () => {
				chat.appImManager.requestPhone({
					peerId,
					threadId: chat.threadId
				});
			};
			break;
		case "buttonTypeRequestGeoLocation":
			result.onClick = () => {
				chat.appImManager.requestLocation({
					peerId,
					threadId: chat.threadId,
					replyToMsgId: messageMid
				});
			};
			break;
		case "buttonTypeRequestPoll":
			result.onClick = () => {
				chat.input.openPollCreation({ quiz: type.quiz });
			};
			break;
		case "inlineButtonTypeCallback":
			result.onClick = () => {
				rootScope.managers.appInlineBotsManager.callbackButtonClick(peerId, messageMid, type.data).then((callbackAnswer) => {
					if (typeof callbackAnswer.message === "string" && callbackAnswer.message.length) {
						if (callbackAnswer.pFlags.alert) confirmationPopup({
							description: wrapRichText(callbackAnswer.message, { noLinks: true }),
							button: {
								langKey: "OK",
								isCancel: true
							}
						}).catch(() => {});
						else toast(wrapRichText(callbackAnswer.message, {
							noLinks: true,
							noLinebreaks: true
						}));
					} else if (typeof callbackAnswer.url === "string" && callbackAnswer.url.length) chat.appImManager.openUrl(callbackAnswer.url, true);
				});
			};
			break;
		case "inlineButtonTypeGame":
			result.classNames.push("is-game");
			result.onClick = () => {
				if (!message) return;
				const bubble = findUpClassName(buttonEl, "bubble");
				const currentMid = bubble && +bubble.dataset.mid;
				const target = (currentMid && currentMid !== message.mid ? chat.getMessageByPeer(message.peerId, currentMid) : void 0) || message;
				chat.appImManager.playGame(target);
			};
			break;
		case "buttonTypeRequestPeer":
			result.onClick = async () => {
				const managers = bindManagersToSession(rootScope.managers);
				const peerType = type.peer_type;
				if (peerType._ === "requestPeerTypeCreateBot") {
					showCreateBotPopup({
						requestingPeerId: peerId,
						suggestedBotName: peerType.suggested_name,
						suggestedUsername: peerType.suggested_username,
						onCreate: async ({ name, username }) => {
							try {
								const createBotResult = await managers.appBotsManager.createManagedBot({
									managerId: peerId,
									botName: name,
									username
								});
								if (createBotResult.status === "wait") {
									toastNew({
										langPackKey: "CreateBot.TooManyBotsCreated",
										langPackArguments: [wrapFormattedDuration(formatDuration(createBotResult.waitTime))]
									});
									return true;
								}
								if (createBotResult.status === "error") {
									toastNew({
										langPackKey: "CreateBot.FailedToCreate",
										langPackArguments: []
									});
									return false;
								}
								const user = createBotResult.user;
								await managers.appMessagesManager.sendBotRequestedPeer(peerId, type.button_id, [user.id.toPeerId()], { mid: messageMid });
								return true;
							} catch {
								return false;
							}
						},
						HotReloadGuard: SolidJSHotReloadGuardProvider
					});
					return;
				}
				let requestedPeerIds;
				try {
					requestedPeerIds = await selectRequestPeers({
						button: type,
						requestingPeerId: peerId
					});
				} catch {
					return;
				}
				managers.appMessagesManager.sendBotRequestedPeer(peerId, type.button_id, requestedPeerIds, { mid: messageMid }).catch((err) => {
					if (err.type === "CHAT_ADMIN_INVITE_REQUIRED") toastNew({ langPackKey: peerType._ === "requestPeerTypeBroadcast" ? "Error.RequestPeer.NoRights.Channel" : "Error.RequestPeer.NoRights.Group" });
				});
			};
			break;
		case "inlineButtonTypeUserProfile":
			result.classNames.push("is-user-profile");
			result.onClick = () => {
				openUserProfile(type.user_id.toPeerId(false));
			};
			break;
		case "inlineButtonTypeCopy":
			result.onClick = () => {
				copyTextToClipboard(type.copy_text);
				toastNew({ langPackKey: "TextCopied" });
			};
			break;
		case "inlineButtonTypeDisabled":
			result.classNames.push("is-disabled");
			break;
		case "buttonTypeDefault": if (!message) result.onClick = () => {
			const ephemeralSnapshot = chat.input?.getEphemeralSendingSnapshot();
			const replyToKeyboard = messageMid && (isEphemeralMessageId(messageMid) || !ephemeralSnapshot && !peerId.isUser()) ? { replyToMsgId: messageMid } : void 0;
			rootScope.managers.appMessagesManager.sendText({
				...ephemeralSnapshot,
				...replyToKeyboard,
				peerId,
				threadId: chat.threadId,
				text: label
			});
		};
	}
	if (message?.pFlags.welcome_template && !CHATLESS_BUTTON_TYPES.has(type._)) result.onClick = void 0;
	return result;
}
function getKeyboardButtonHandler({ button, chat, message, replyMarkup, wrapOptions, className }) {
	const typeHandler = getButtonTypeHandler({
		type: button.type,
		label: button.text,
		chat,
		message,
		replyMarkup
	});
	if (!typeHandler) return;
	const text = typeHandler.text || wrapRichText(button.text, {
		noLinks: true,
		noLinebreaks: true
	});
	const classNamesArr = [className, ...typeHandler.classNames].filter(Boolean);
	const bg = getButtonBackground(button.style);
	if (bg) classNamesArr.push("reply-markup-button-bg", `reply-markup-button-bg-${bg}`);
	if (button.style?.icon) {
		let customEmojiSize = wrapOptions?.customEmojiSize;
		if (customEmojiSize) customEmojiSize = makeMediaSize(customEmojiSize.width - 2, customEmojiSize.height - 2);
		text.prepend(wrapCustomEmoji({
			docIds: [button.style.icon],
			...wrapOptions,
			textColor: bg ? "white" : wrapOptions.textColor,
			customEmojiSize
		}), " ");
	}
	return {
		text,
		onClick: typeHandler.onClick,
		icon: typeHandler.icon,
		as: typeHandler.as,
		classNames: classNamesArr,
		refCallbacks: typeHandler.refCallbacks,
		bg
	};
}
/**
* A button inside a rich message or a page. Its label is drawn by the page (it is rich text), so
* only the action comes from here. `chat` and `message` are the message the page is shown in;
* without them only the types that need no message work.
*/
function getRichPageButtonHandler({ button, label, chat, message }) {
	return getButtonTypeHandler({
		type: button.type,
		label,
		chat,
		message
	});
}
function wrapKeyboardButton(options) {
	const handler = getKeyboardButtonHandler(options);
	if (!handler) return;
	const { onClick: _onClick } = options;
	return ReplyMarkupLayout.Button({
		children: handler.text,
		class: classNames(...handler.classNames),
		onClick: _onClick ? (e) => (_onClick(), handler.onClick?.(e)) : handler.onClick,
		icon: handler.icon,
		ref: (ref) => {
			handler.refCallbacks.forEach((cb) => cb(ref));
		},
		as: handler.as
	});
}
//#endregion
//#region src/components/chat/bubbleParts/replyMarkupLayout.tsx
var _tmpl$ = /*#__PURE__*/ template(`<div class=reply-markup>`);
var _tmpl$2 = /*#__PURE__*/ template(`<div>`);
var _tmpl$3 = /*#__PURE__*/ template(`<span>`);
var Context = createContext();
var ReplyMarkupLayout = (props) => {
	const [elements, setElements] = createSignal([]);
	const value = { elements };
	const resolvedChildren = children(() => createComponent(Context.Provider, {
		value,
		get children() {
			return props.children;
		}
	}));
	createEffect(() => void setElements(resolvedChildren.toArray()));
	return (() => {
		var _el$ = _tmpl$();
		insert(_el$, resolvedChildren);
		return _el$;
	})();
};
var RowContext = createContext();
ReplyMarkupLayout.Row = (props) => {
	const context = useContext(Context);
	const [elements, setElements] = createSignal([]);
	let ref;
	const value = {
		get isLast() {
			return context.elements()[context.elements().length - 1] === ref;
		},
		elements
	};
	const resolvedChildren = children(() => createComponent(RowContext.Provider, {
		value,
		get children() {
			return props.children;
		}
	}));
	createEffect(() => void setElements(resolvedChildren.toArray()));
	return (() => {
		var _el$2 = _tmpl$2();
		var _ref$ = ref;
		typeof _ref$ === "function" ? use(_ref$, _el$2) : ref = _el$2;
		insert(_el$2, resolvedChildren);
		createRenderEffect(() => className(_el$2, classNames("reply-markup-row", props.class)));
		return _el$2;
	})();
};
ReplyMarkupLayout.Button = (props) => {
	const rowContext = useContext(RowContext);
	let ref;
	const isFirst = createMemo(() => rowContext.elements()[0] === ref);
	const isLast = createMemo(() => rowContext.elements()[rowContext.elements().length - 1] === ref);
	return createComponent(RippleElement, {
		get component() {
			return props.as || "button";
		},
		ref: (_ref) => {
			ref = _ref;
			props.ref?.(ref);
		},
		get ["class"]() {
			return classNames("reply-markup-button", rowContext.isLast && isFirst() && "is-first", rowContext.isLast && isLast() && "is-last", props.class);
		},
		get onClick() {
			return props.onClick;
		},
		get children() {
			return [createComponent(Show, {
				get when() {
					return props.icon;
				},
				get children() {
					return createComponent(IconTsx, {
						get icon() {
							return props.icon;
						},
						"class": "reply-markup-button-icon"
					});
				}
			}), (() => {
				var _el$3 = _tmpl$3();
				insert(_el$3, () => props.children);
				createRenderEffect(() => className(_el$3, classNames("reply-markup-button-text", props.textClass)));
				return _el$3;
			})()];
		}
	});
};
ReplyMarkupLayout.Inline = (props) => {
	const rows = filterReplyMarkupRows(props.rows);
	return createComponent(ReplyMarkupLayout, { get children() {
		return createComponent(For, {
			each: rows,
			children: (row) => createComponent(ReplyMarkupLayout.Row, { get children() {
				return createComponent(For, {
					get each() {
						return row.buttons;
					},
					children: (button) => {
						return wrapKeyboardButton({
							button,
							chat: props.chat,
							message: props.message,
							wrapOptions: props.wrapOptions
						});
					}
				});
			} })
		});
	} });
};
function createInlineReplyMarkup(options) {
	const container = document.createElement("div");
	const dispose = render(() => createComponent(ReplyMarkupLayout.Inline, {
		get rows() {
			return options.rows;
		},
		get chat() {
			return options.chat;
		},
		get message() {
			return options.message;
		},
		get wrapOptions() {
			return options.wrapOptions;
		}
	}), container);
	options.wrapOptions.middleware.onDestroy(dispose);
	return container.firstElementChild || container;
}
//#endregion
export { wrapKeyboardButton as a, keyboardButton_exports as i, createInlineReplyMarkup as n, selectRequestPeers as o, getKeyboardButtonHandler as r, filterReplyMarkupRows as s, ReplyMarkupLayout as t };
