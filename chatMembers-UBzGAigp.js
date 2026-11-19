//# allFunctionsCalledOnLoad
import { a as i18n } from "./langPack-BmdJGr44.js";
import { C as createSignal, p as createComponent } from "./solid-9Vxm0VIz.js";
import { n as attachClickEvent } from "./clickEvent-COk4YpLP.js";
import { i as Row, s as CheckboxFieldTsx } from "./confirmationPopup-Bz6mK0o-.js";
import { un as hasRights } from "./getChatMigratedTo-ChhMNXuu.js";
import { i as usePromiseCollector } from "./mediaHeader-CnpQNwOl.js";
import { a as Section } from "./emailVerification-C8QYZSyu.js";
import { r as wrapSolidComponent } from "./wrapSolidComponent-BASCjNJG.js";
import { n as useSuperTab } from "./superTabProvider-LtveyH7W.js";
import { t as ButtonCorner } from "./buttonCorner-HdHn23eT.js";
import { t as handleChannelsTooMuch } from "./channelsTooMuch-CxXSuR84.js";
import { t as addChatUsers } from "./addChatUsers-CGP6Ttkc.js";
import { t as createParticipantContextMenu } from "./createParticipantContextMenu-Ch5EtcJW.js";
import { t as createSelectorForParticipants } from "./participantsSelector-DN30gTi4.js";
//#region src/components/sidebarRight/tabs/chatMembers.tsx
var ChatMembers = () => {
	const [tab] = useSuperTab();
	const promiseCollector = usePromiseCollector();
	const chatId = tab.payload;
	let selector;
	promiseCollector.collect((async () => {
		const chat = await tab.managers.appChatsManager.getChat(chatId);
		const isBroadcast = await tab.managers.appChatsManager.isBroadcast(chatId);
		const channelFull = await tab.managers.appProfileManager.getChannelFull(chatId).catch(() => void 0);
		tab.container.classList.add("edit-peer-container", "chat-members-container");
		tab.title.replaceChildren(i18n(isBroadcast ? "PeerInfo.Subscribers" : "GroupMembers"));
		const canAddMembers = hasRights(chat, "invite_users");
		const addBtn = ButtonCorner({
			icon: "addmember_filled",
			className: "is-visible",
			ariaLabel: "GroupAddMembers"
		});
		if (canAddMembers) tab.content.append(addBtn);
		attachClickEvent(addBtn, () => {
			addChatUsers({
				peerId: chatId.toPeerId(true),
				slider: tab.slider
			});
		}, { listenerSetter: tab.listenerSetter });
		const participantsCount = chat.participants_count;
		const canHideMembers = !isBroadcast && participantsCount >= ((await tab.managers.apiManager.getAppConfig()).hidden_members_group_size_min || 0) && hasRights(chat, "just_admin");
		const { selector: _selector, loadPromise } = createSelectorForParticipants({
			appendTo: tab.content,
			managers: tab.managers,
			middleware: tab.middlewareHelper.get(),
			peerId: chatId.toPeerId(true),
			channelParticipantsUpdateFilter: (participant) => !!participant
		});
		selector = _selector;
		if (canHideMembers) {
			const checked = !!channelFull?.pFlags?.participants_hidden;
			const hiddenSignal = createSignal(checked);
			const [busy, setBusy] = createSignal(false);
			let confirmedHidden = checked;
			const onHiddenChange = (hidden) => {
				if (hidden === confirmedHidden) return;
				const previous = confirmedHidden;
				setBusy(true);
				handleChannelsTooMuch(() => tab.managers.appChatsManager.toggleParticipantsHidden(chatId, hidden)).then(() => {
					confirmedHidden = hidden;
				}).catch((err) => {
					console.error("toggleParticipantsHidden error", err);
					hiddenSignal[1](previous);
				}).finally(() => setBusy(false));
			};
			const section = wrapSolidComponent(() => createComponent(Section, {
				noDelimiter: true,
				caption: "ChannelHideMembersInfo",
				get children() {
					return createComponent(Row, {
						get disabled() {
							return busy();
						},
						get children() {
							return [
								createComponent(Row.Icon, { icon: "hide" }),
								createComponent(Row.CheckboxFieldToggle, { get children() {
									return createComponent(CheckboxFieldTsx, {
										get disabled() {
											return busy();
										},
										signal: hiddenSignal,
										toggle: true,
										onChange: onHiddenChange
									});
								} }),
								createComponent(Row.Title, { get children() {
									return i18n("ChannelHideMembers");
								} })
							];
						}
					});
				}
			}), tab.middlewareHelper.get());
			selector.scrollable.append(section, selector.scrollable.container.lastElementChild);
		}
		createParticipantContextMenu({
			chatId,
			listenTo: selector.scrollable.container,
			participants: selector.participants,
			slider: tab.slider,
			middleware: tab.middlewareHelper.get()
		});
		await loadPromise;
	})());
	return null;
};
//#endregion
export { ChatMembers as default };
