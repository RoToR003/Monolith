//# allFunctionsCalledOnLoad
import { t as findUpClassName } from "./findUpClassName-3V5me58N.js";
import { a as i18n } from "./langPack-BmdJGr44.js";
import { C as createSignal, p as createComponent, s as Show } from "./solid-9Vxm0VIz.js";
import { c as insert, g as template } from "./web-BPyQozky.js";
import { r as useHotReloadGuard } from "./hotReloadGuard-BUNVkeQ4.js";
import { n as attachClickEvent } from "./clickEvent-COk4YpLP.js";
import { t as Button } from "./button-DpTvniRN.js";
import { L as formatFullSentTime } from "./index-B7axFZql.js";
import { i as Row, t as confirmationPopup } from "./confirmationPopup-Bz6mK0o-.js";
import { q as getImportersLoader } from "./appDialogsManager-CXguiKc3.js";
import { i as usePromiseCollector } from "./mediaHeader-CnpQNwOl.js";
import { a as Section } from "./emailVerification-C8QYZSyu.js";
import { r as wrapSolidComponent } from "./wrapSolidComponent-BASCjNJG.js";
import { r as toastNew } from "./toast-B6VD5M7R.js";
import { n as useSuperTab } from "./superTabProvider-LtveyH7W.js";
import { n as createSelectorForTab } from "./participantsSelector-DN30gTi4.js";
//#region src/components/sidebarRight/tabs/chatRequests.tsx
var _tmpl$ = /*#__PURE__*/ template(`<div>`);
var ChatRequests = () => {
	const [tab] = useSuperTab();
	const promiseCollector = usePromiseCollector();
	const { appImManager } = useHotReloadGuard();
	const chatId = tab.payload;
	const managers = tab.managers;
	const [pendingCount, setPendingCount] = createSignal(0);
	const [hidingAll, setHidingAll] = createSignal(false);
	promiseCollector.collect((async () => {
		const isBroadcast = await managers.appChatsManager.isBroadcast(chatId);
		tab.container.classList.add("edit-peer-container", "chat-members-container", "chat-requests-container");
		tab.title.replaceChildren(i18n(isBroadcast ? "SubscribeRequests" : "MemberRequests"));
		const { importersMap, deleteImporter, load, reset } = getImportersLoader({
			chatId,
			managers,
			requested: true,
			link: void 0,
			onCount: setPendingCount
		});
		const dialogElements = /* @__PURE__ */ new Map();
		const { selector, loadPromise } = createSelectorForTab({
			appendTo: tab.content,
			managers,
			middleware: tab.middlewareHelper.get(),
			peerId: chatId.toPeerId(true),
			peerType: ["custom"],
			getMoreCustom: load,
			getSubtitleForElement: (peerId) => i18n("RequestedToJoinAt", [formatFullSentTime(importersMap.get(peerId)?.date)]),
			processElementAfter: (peerId, dialogElement) => {
				const buttons = document.createElement("div");
				buttons.classList.add("chatlist-chat-buttons");
				const button = Button("btn-primary btn-control-small btn-color-primary", { text: isBroadcast ? "AddToChannel" : "AddToGroup" });
				const button2 = Button("btn-transparent btn-control-small primary", { text: "Dismiss" });
				buttons.append(button, button2);
				dialogElement.container.append(buttons);
				dialogElements.set(peerId, dialogElement);
			},
			placeholderElementsGap: 36
		});
		let changedLength = 0;
		const hideAll = async (approved) => {
			if (hidingAll()) return;
			try {
				await confirmationPopup({
					titleLangKey: approved ? "JoinRequestAcceptAllTitle" : "JoinRequestRejectAllTitle",
					descriptionLangKey: approved ? "JoinRequestAcceptAllDescription" : "JoinRequestRejectAllDescription",
					button: approved ? { langKey: "JoinRequestAcceptAll" } : {
						langKey: "JoinRequestDismissAll",
						isDanger: true
					}
				});
			} catch {
				return;
			}
			setHidingAll(true);
			try {
				await managers.appChatsManager.hideAllChatJoinRequests(chatId, approved);
			} catch (err) {
				toastNew({ langPackKey: "Error.AnError" });
				return;
			} finally {
				setHidingAll(false);
			}
			changedLength += pendingCount();
			setPendingCount(0);
			const peerIds = /* @__PURE__ */ new Set([...importersMap.keys(), ...dialogElements.keys()]);
			reset();
			for (const peerId of peerIds) selector.deletePeerId(peerId);
			dialogElements.clear();
			selector.reload();
		};
		const bulkSection = wrapSolidComponent(() => (() => {
			var _el$ = _tmpl$();
			insert(_el$, createComponent(Show, {
				get when() {
					return pendingCount() > 1;
				},
				get children() {
					return createComponent(Section, {
						noDelimiter: true,
						get children() {
							return [createComponent(Row, {
								clickable: () => hideAll(true),
								get disabled() {
									return hidingAll();
								},
								get children() {
									return [createComponent(Row.Icon, { icon: "adduser" }), createComponent(Row.Title, {
										"class": "primary",
										get children() {
											return i18n("JoinRequestAcceptAll");
										}
									})];
								}
							}), createComponent(Row, {
								color: "danger",
								clickable: () => hideAll(false),
								get disabled() {
									return hidingAll();
								},
								get children() {
									return [createComponent(Row.Icon, { icon: "crossround" }), createComponent(Row.Title, {
										"class": "danger",
										get children() {
											return i18n("JoinRequestDismissAll");
										}
									})];
								}
							})];
						}
					});
				}
			}));
			return _el$;
		})(), tab.middlewareHelper.get());
		selector.scrollable.append(bulkSection, selector.scrollable.container.lastElementChild);
		attachClickEvent(selector.scrollable.container, async (e) => {
			const target = findUpClassName(e.target, "chatlist-chat");
			if (!target) return;
			const peerId = target.dataset.peerId.toPeerId();
			const dialogElement = dialogElements.get(peerId);
			const addButton = findUpClassName(e.target, "btn-color-primary");
			const dismissButton = findUpClassName(e.target, "btn-transparent");
			const add = addButton ? true : dismissButton ? false : void 0;
			if (add === void 0) {
				appImManager.setInnerPeer({ peerId });
				return;
			}
			const toggle = dialogElement.toggleDisability(true);
			try {
				await managers.appChatsManager.hideChatJoinRequest(chatId, peerId, add);
				++changedLength;
				setPendingCount((count) => Math.max(0, count - 1));
				selector.deletePeerId(peerId);
				dialogElements.delete(peerId);
				deleteImporter(peerId);
			} catch (err) {
				toggle();
			}
		}, { listenerSetter: tab.listenerSetter });
		tab.eventListener.addEventListener("close", () => {
			tab.eventListener.dispatchEvent("finish", changedLength);
		});
		await loadPromise;
	})());
	return null;
};
//#endregion
export { ChatRequests as default };
