//# allFunctionsCalledOnLoad
import { t as findUpClassName } from "./findUpClassName-3V5me58N.js";
import { a as i18n } from "./langPack-BmdJGr44.js";
import { p as createComponent } from "./solid-9Vxm0VIz.js";
import { n as deferredPromise } from "./cancellablePromise-bof--dnO.js";
import { t as tsNow } from "./tsNow-DUzGGNNb.js";
import { n as hotReloadGuard } from "./hotReloadGuardProvider-CHEsZRuG.js";
import { n as attachClickEvent } from "./clickEvent-COk4YpLP.js";
import { L as formatFullSentTime } from "./index-B7axFZql.js";
import { c as createContextMenu, i as Row } from "./confirmationPopup-Bz6mK0o-.js";
import { n as wrapEmojiText } from "./wrapEmojiText-DT39R5Tj.js";
import { W as ChatInviteLink, q as getImportersLoader } from "./appDialogsManager-CXguiKc3.js";
import { i as usePromiseCollector } from "./mediaHeader-CnpQNwOl.js";
import { t as AppSelectPeers } from "./appSelectPeers-BYpCZNpe.js";
import { a as Section } from "./emailVerification-C8QYZSyu.js";
import { r as wrapSolidComponent } from "./wrapSolidComponent-BASCjNJG.js";
import { n as useSuperTab } from "./superTabProvider-LtveyH7W.js";
import { t as StarsAmount } from "./starsAmount-DnM7V5Ca.js";
import { t as UsernameRow } from "./usernameRow-_ciwjIjr.js";
//#region src/components/sidebarRight/tabs/chatInviteLink.tsx
var ChatInviteLinkTab = () => {
	const [tab] = useSuperTab();
	const promiseCollector = usePromiseCollector();
	const { chatId, chatInvite, menuButtons, actions, onUpdate } = tab.payload;
	promiseCollector.collect((async () => {
		const isBroadcast = await tab.managers.appChatsManager.isBroadcast(chatId);
		if (chatInvite.title) tab.title.replaceChildren(wrapEmojiText(chatInvite.title));
		{
			const isExpiring = chatInvite.expire_date && chatInvite.expire_date > tsNow(true);
			const isUsageLimit = chatInvite.usage_limit && chatInvite.usage_limit <= (chatInvite.usage || 0);
			const inviteLink = new ChatInviteLink({
				buttons: menuButtons,
				listenerSetter: tab.listenerSetter,
				url: chatInvite.link,
				actions
			});
			inviteLink.setChatInvite(chatInvite);
			tab.scrollable.append(wrapSolidComponent(() => createComponent(Section, {
				name: "InviteLink",
				get caption() {
					return isUsageLimit ? "LinkIsExpiredLimitReached" : isExpiring ? "InviteLinks.ExpiresCaption" : chatInvite.expire_date ? "LinkIsExpired" : void 0;
				},
				get captionArgs() {
					return isExpiring ? [formatFullSentTime(chatInvite.expire_date)] : void 0;
				},
				get children() {
					return inviteLink.container;
				}
			}), tab.middlewareHelper.get()));
		}
		{
			const div = document.createElement("div");
			div.classList.add("chatlist-container");
			const list = hotReloadGuard.appDialogsManager.createChatList({ new: true });
			div.append(list);
			const peerId = chatInvite.admin_id.toPeerId(false);
			const { dom } = hotReloadGuard.appDialogsManager.addDialogNew({
				peerId,
				container: list,
				rippleEnabled: true,
				avatarSize: "abitbigger",
				meAsSaved: false,
				wrapOptions: { middleware: tab.middlewareHelper.get() }
			});
			dom.titleSpan.classList.add("text-bold");
			attachClickEvent(dom.listEl, () => {
				hotReloadGuard.appImManager.setInnerPeer({ peerId });
			}, { listenerSetter: tab.listenerSetter });
			dom.lastMessageSpan.append(formatFullSentTime(chatInvite.date));
			tab.scrollable.append(wrapSolidComponent(() => createComponent(Section, {
				name: "LinkCreatedeBy",
				children: div
			}), tab.middlewareHelper.get()));
		}
		if (chatInvite.subscription_pricing) {
			const stars = chatInvite.subscription_pricing.amount;
			const usage = chatInvite.usage ?? 0;
			const title = i18n("InviteLink.Observe.Fee.Title", [StarsAmount({ stars }), usage]);
			const subtitle = i18n("InviteLink.Observe.Fee.Subtitle", ["$" + (usage * +stars * .02).toFixed(2)]);
			tab.scrollable.append(wrapSolidComponent(() => createComponent(Section, {
				name: "InviteLink.Observe.Fee",
				get children() {
					return createComponent(UsernameRow, {
						isLink: true,
						icon: "link_paid",
						color: "green",
						title,
						subtitle
					});
				}
			}), tab.middlewareHelper.get()));
		}
		if (chatInvite.usage_limit && !chatInvite.usage && (!chatInvite.expire_date || chatInvite.expire_date > tsNow(true))) tab.scrollable.append(wrapSolidComponent(() => createComponent(Section, { get children() {
			return createComponent(Row, { get children() {
				return createComponent(Row.Title, { get children() {
					return i18n("PeopleCanJoinViaLinkCount", [chatInvite.usage_limit]);
				} });
			} });
		} }), tab.middlewareHelper.get()));
		const promises = [];
		if (chatInvite.requested) {
			const { importersMap, load } = getImportersLoader({
				chatId,
				managers: tab.managers,
				link: chatInvite.link,
				requested: true
			});
			const dialogElements = /* @__PURE__ */ new Map();
			const onResult = async (result) => {
				const loadPromises = [];
				result.result.forEach((peerId) => {
					const dialogElement = hotReloadGuard.appDialogsManager.addDialogNew({
						peerId,
						container: chatlist,
						rippleEnabled: true,
						avatarSize: "abitbigger",
						append: true,
						loadPromises,
						wrapOptions: { middleware: tab.middlewareHelper.get() }
					});
					dialogElements.set(peerId, dialogElement);
					dialogElement.dom.lastMessageSpan.append(formatFullSentTime(importersMap.get(peerId).date));
				});
				return Promise.all(loadPromises);
			};
			const chatlist = hotReloadGuard.appDialogsManager.createChatList();
			const section = wrapSolidComponent(() => createComponent(Section, {
				name: "JoinRequests",
				get nameArgs() {
					return [chatInvite.requested];
				},
				children: chatlist
			}), tab.middlewareHelper.get());
			tab.scrollable.append(section);
			let target;
			const toggleRequest = async (add) => {
				const peerId = target.dataset.peerId.toPeerId();
				const dialogElement = dialogElements.get(peerId);
				const toggle = dialogElement.toggleDisability(true);
				try {
					await tab.managers.appChatsManager.hideChatJoinRequest(chatId, peerId, add);
					dialogElement.remove();
					dialogElements.delete(peerId);
					if (add) chatInvite.usage = (chatInvite.usage || 0) + 1;
					if (!--chatInvite.requested) {
						delete chatInvite.requested;
						section.remove();
					}
					onUpdate?.(chatInvite);
				} catch (err) {
					toggle();
				}
			};
			createContextMenu({
				buttons: [{
					icon: "adduser",
					text: isBroadcast ? "AddToChannel" : "AddToGroup",
					onClick: () => toggleRequest(true)
				}, {
					icon: "crossround",
					text: "Dismiss",
					onClick: () => toggleRequest(false)
				}],
				listenTo: chatlist,
				listenerSetter: tab.listenerSetter,
				middleware: tab.middlewareHelper.get(),
				findElement: (e) => target = findUpClassName(e.target, "chatlist-chat")
			});
			promises.push(load("", () => true).then(onResult));
		}
		if (chatInvite.usage) {
			const { importersMap, load } = getImportersLoader({
				chatId,
				managers: tab.managers,
				link: chatInvite.link,
				requested: false
			});
			const deferred = deferredPromise();
			const selector = new AppSelectPeers({
				middleware: tab.middlewareHelper.get(),
				appendTo: tab.container,
				onSelect: (peerId) => {
					hotReloadGuard.appImManager.setInnerPeer({ peerId });
				},
				peerType: ["custom"],
				getMoreCustom: load,
				getSubtitleForElement: (peerId) => formatFullSentTime(importersMap.get(peerId)?.date),
				sectionNameLangPackKey: i18n("PeopleJoined", [chatInvite.usage]),
				onFirstRender: () => {
					deferred.resolve();
				},
				managers: tab.managers,
				noSearch: true,
				multiSelect: false
			});
			tab.content.remove();
			selector.scrollable.attachBorderListeners(tab.container);
			selector.scrollable.prepend(...Array.from(tab.scrollable.container.children));
			if (chatInvite.usage_limit) {
				const i = i18n("PeopleJoinedRemaining", [chatInvite.usage_limit - chatInvite.usage]);
				i.classList.add("sidebar-left-section-name-right");
				selector.section.title.append(i);
			}
			promises.push(deferred);
		}
		await Promise.all(promises);
	})());
	return null;
};
//#endregion
export { ChatInviteLinkTab as default };
