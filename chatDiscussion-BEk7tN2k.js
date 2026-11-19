//# allFunctionsCalledOnLoad
import { t as findUpClassName } from "./findUpClassName-3V5me58N.js";
import { g as getPeerActiveUsernames } from "./objectUrlUtils-5x08MNuO.js";
import { n as rootScope } from "./rootScope-CZS0lmz8.js";
import { a as i18n } from "./langPack-BmdJGr44.js";
import { C as createSignal, N as onMount, p as createComponent, s as Show } from "./solid-9Vxm0VIz.js";
import { _ as use, c as insert, g as template, u as memo } from "./web-BPyQozky.js";
import { r as useHotReloadGuard } from "./hotReloadGuard-BUNVkeQ4.js";
import { n as hotReloadGuard } from "./hotReloadGuardProvider-CHEsZRuG.js";
import { t as Button } from "./buttonTsx-Bwphkm9r.js";
import { n as attachClickEvent } from "./clickEvent-COk4YpLP.js";
import { Gt as getPeerTitle, dt as wrapPeerTitle, t as confirmationPopup } from "./confirmationPopup-Bz6mK0o-.js";
import { un as hasRights } from "./getChatMigratedTo-ChhMNXuu.js";
import { i as usePromiseCollector } from "./mediaHeader-CnpQNwOl.js";
import { a as Section } from "./emailVerification-C8QYZSyu.js";
import { r as toastNew } from "./toast-B6VD5M7R.js";
import { t as toggleDisability } from "./toggleDisability-2oUcKWqw.js";
import { n as useSuperTab } from "./superTabProvider-LtveyH7W.js";
import { t as shake } from "./shake-1vPuqgfm.js";
import { t as handleChannelsTooMuch } from "./channelsTooMuch-CxXSuR84.js";
//#region src/components/sidebarRight/tabs/chatDiscussion.tsx
var _tmpl$ = /*#__PURE__*/ template(`<div class=sticker-container>`);
var _tmpl$2 = /*#__PURE__*/ template(`<div class=caption>`);
var ChatDiscussion = () => {
	const [tab] = useSuperTab();
	const promiseCollector = usePromiseCollector();
	const { appImManager, lottieLoader } = useHotReloadGuard();
	const { chatId } = tab.payload;
	let linkedChatId = tab.payload.linkedChatId;
	let isBroadcast;
	let canChangeInfo;
	let stickerContainer;
	let btnUnlink;
	const [captionEl, setCaptionEl] = createSignal();
	const [chatlistElement, setChatlistElement] = createSignal();
	const [sectionCaption, setSectionCaption] = createSignal();
	const [isBroadcastSig, setIsBroadcastSig] = createSignal(false);
	const [createGroupHidden, setCreateGroupHidden] = createSignal(false);
	const [unlinkHidden, setUnlinkHidden] = createSignal(false);
	const [unlinkText, setUnlinkText] = createSignal();
	const setDiscussionGroup = async (id, groupId) => {
		return handleChannelsTooMuch(() => {
			return tab.managers.appChatsManager.setDiscussionGroup(id, groupId);
		});
	};
	const onCreateGroup = async () => {
		let title = await getPeerTitle({
			peerId: chatId.toPeerId(true),
			plainText: true
		});
		title += " Chat";
		tab.slider.createTab(hotReloadGuard.tabs.AppNewGroupTab).open({
			peerIds: [],
			onCreate: (newChatId) => {
				tab.slider.removeTabFromHistory(tab);
				setDiscussionGroup(chatId, newChatId);
			},
			openAfter: false,
			title,
			asChannel: true
		});
	};
	const onUnlink = async () => {
		const _linkedChatId = linkedChatId;
		await confirmationPopup({
			descriptionLangKey: isBroadcast ? "DiscussionUnlinkChannelAlert" : "DiscussionUnlinkGroupAlert",
			descriptionLangArgs: [await wrapPeerTitle({ peerId: _linkedChatId.toPeerId(true) })],
			button: { langKey: "DiscussionUnlink" }
		});
		const toggle = toggleDisability([btnUnlink], true);
		try {
			await setDiscussionGroup(isBroadcast ? chatId : _linkedChatId, void 0);
		} catch (err) {}
		if (!isBroadcast) {
			tab.close();
			return;
		}
		toggle();
	};
	onMount(() => {
		promiseCollector.collect((async () => {
			const p = {
				animationData: lottieLoader.loadAnimationFromURLManually("UtyanDiscussion"),
				chats: tab.managers.appChatsManager.getGroupsForDiscussion()
			};
			const [_isBroadcast, chat, linkedChat] = await Promise.all([
				tab.managers.appChatsManager.isBroadcast(chatId),
				tab.managers.appChatsManager.getChat(chatId),
				linkedChatId && tab.managers.appChatsManager.getChat(linkedChatId)
			]);
			isBroadcast = _isBroadcast;
			canChangeInfo = hasRights(chat, "change_info");
			tab.title.replaceChildren(i18n(isBroadcast ? "DiscussionController.Channel.Title" : "DiscussionController.Group.Title"));
			tab.container.classList.add("chat-folders-container", "chat-discussion-container");
			setIsBroadcastSig(isBroadcast);
			setSectionCaption(isBroadcast ? "DiscussionChannelHelp2" : "DiscussionGroupHelp2");
			setUnlinkText(isBroadcast ? "DiscussionUnlinkGroup" : "DiscussionUnlinkChannel");
			const setCaption = async () => {
				setCaptionEl(i18n(linkedChatId ? isBroadcast ? "DiscussionChannelGroupSetHelp2" : "DiscussionGroupHelp" : "DiscussionChannelHelp3", linkedChatId ? [await wrapPeerTitle({ peerId: linkedChatId.toPeerId(true) })] : void 0));
			};
			const chatlist = hotReloadGuard.appDialogsManager.createChatList();
			chatlist.classList.add("chatlist");
			let busy = false;
			attachClickEvent(chatlist, async (e) => {
				const el = findUpClassName(e.target, "chatlist-chat");
				if (!el) return;
				const peerId = el.dataset.peerId.toPeerId();
				if (linkedChatId) {
					appImManager.setInnerPeer({ peerId });
					return;
				}
				if (busy) return;
				if (await tab.managers.appPeersManager.isForum(peerId)) {
					toastNew({ langPackKey: "ChannelTopicsDiscussionForbidden" });
					shake(el);
					return;
				}
				const d = document.createDocumentFragment();
				d.append(i18n("Discussion.Set.Modal.Text.PublicChannelPublicGroup", [await wrapPeerTitle({ peerId }), await wrapPeerTitle({ peerId: chatId.toPeerId(true) })]));
				const [isPublicGroup, isPublicChannel, groupChatFull] = await Promise.all([
					tab.managers.appChatsManager.isPublic(peerId.toChatId()),
					tab.managers.appChatsManager.isPublic(chatId),
					tab.managers.appProfileManager.getChatFull(peerId.toChatId())
				]);
				const br = document.createElement("br");
				if (!isPublicChannel) d.append(br.cloneNode(), br.cloneNode(), i18n("Discussion.Set.PrivateChannel"));
				if (!isPublicGroup) d.append(br.cloneNode(), br.cloneNode(), i18n("Discussion.Set.PrivateGroup"));
				if (groupChatFull._ === "chatFull" || groupChatFull._ === "channelFull" && groupChatFull.pFlags.hidden_prehistory) d.append(br.cloneNode(), br.cloneNode(), i18n("DiscussionLinkGroupAlertHistory"));
				await confirmationPopup({
					peerId: chatId.toPeerId(true),
					description: d,
					button: { langKey: "DiscussionLinkGroup" }
				});
				busy = true;
				try {
					await setDiscussionGroup(chatId, peerId.toChatId());
				} catch (err) {
					console.error("setDiscussionGroup error", err);
				}
				busy = false;
			}, { listenerSetter: tab.listenerSetter });
			setChatlistElement(chatlist);
			const loadPromises = [];
			const loadAnimationPromise = p.animationData.then(async (cb) => {
				const player = await cb({
					container: stickerContainer,
					loop: true,
					autoplay: true,
					width: 120,
					height: 120
				});
				return lottieLoader.waitForFirstFrame(player);
			});
			const loadChatsPromise = (isBroadcast ? p.chats : Promise.resolve([])).then((chats) => {
				if (linkedChatId && !chats.some((chat) => chat.id === linkedChatId)) chats.push(linkedChat);
				const promises = chats.map((chat) => {
					const loadPromises = [];
					const { dom } = hotReloadGuard.appDialogsManager.addDialogNew({
						peerId: chat.id.toPeerId(true),
						container: chatlist,
						rippleEnabled: true,
						avatarSize: "abitbigger",
						loadPromises,
						wrapOptions: { middleware: tab.middlewareHelper.get() }
					});
					const username = getPeerActiveUsernames(chat)[0];
					if (username) dom.lastMessageSpan.textContent = "@" + username;
					else dom.lastMessageSpan.append(i18n(isBroadcast ? "DiscussionController.PrivateGroup" : "DiscussionController.PrivateChannel"));
					return Promise.all(loadPromises);
				});
				return Promise.all(promises);
			});
			const update = async () => {
				await setCaption();
				if (!isBroadcast) return;
				Array.from(chatlist.children).forEach((el) => {
					const _chatId = el.dataset.peerId.toChatId();
					el.classList.toggle("hide", linkedChatId ? linkedChatId !== _chatId : false);
				});
				setUnlinkHidden(!linkedChatId || !canChangeInfo);
				setCreateGroupHidden(!!linkedChatId || !canChangeInfo);
			};
			tab.listenerSetter.add(rootScope)("dialog_migrate", ({ migrateFrom, migrateTo }) => {
				const el = chatlist.querySelector(`[data-peer-id="${migrateFrom}"]`);
				if (el) el.dataset.peerId = "" + migrateTo;
			});
			tab.listenerSetter.add(rootScope)("chat_full_update", async (updatedChatId) => {
				if (chatId !== updatedChatId) return;
				linkedChatId = (await tab.managers.appProfileManager.getChannelFull(updatedChatId)).linked_chat_id;
				update();
			});
			loadPromises.push(loadAnimationPromise, loadChatsPromise);
			await Promise.all(loadPromises);
			await update();
		})());
	});
	return [
		(() => {
			var _el$ = _tmpl$();
			var _ref$ = stickerContainer;
			typeof _ref$ === "function" ? use(_ref$, _el$) : stickerContainer = _el$;
			return _el$;
		})(),
		(() => {
			var _el$2 = _tmpl$2();
			insert(_el$2, captionEl);
			return _el$2;
		})(),
		createComponent(Section, {
			get caption() {
				return sectionCaption();
			},
			get children() {
				return [createComponent(Show, {
					keyed: true,
					get when() {
						return chatlistElement();
					},
					children: (element) => element
				}), createComponent(Show, {
					get when() {
						return memo(() => !!isBroadcastSig())() && !createGroupHidden();
					},
					get children() {
						return createComponent(Button, {
							"class": "btn-primary btn-transparent primary",
							icon: "newgroup",
							text: "DiscussionCreateGroup",
							onClick: () => {
								onCreateGroup();
							}
						});
					}
				})];
			}
		}),
		createComponent(Section, {
			get classList() {
				return { hide: unlinkHidden() };
			},
			get children() {
				return createComponent(Button, {
					ref(r$) {
						var _ref$2 = btnUnlink;
						typeof _ref$2 === "function" ? _ref$2(r$) : btnUnlink = r$;
					},
					"class": "btn-primary btn-transparent danger",
					icon: "delete",
					get text() {
						return unlinkText();
					},
					onClick: () => {
						onUnlink();
					}
				});
			}
		})
	];
};
//#endregion
export { ChatDiscussion as default };
