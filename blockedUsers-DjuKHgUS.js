//# allFunctionsCalledOnLoad
import { g as getPeerActiveUsernames } from "./objectUrlUtils-5x08MNuO.js";
import { n as rootScope } from "./rootScope-CZS0lmz8.js";
import { M as onCleanup, N as onMount, p as createComponent } from "./solid-9Vxm0VIz.js";
import { r as getOverlayRoot } from "./appWindow-bo-KtJhy.js";
import { n as hotReloadGuard } from "./hotReloadGuardProvider-CHEsZRuG.js";
import { n as attachClickEvent } from "./clickEvent-COk4YpLP.js";
import { t as findUpTag } from "./findUpTag-CkbKEw4y.js";
import { C as ButtonMenuSync, p as positionMenu, u as attachContextMenuListener, wn as contextMenuController } from "./confirmationPopup-Bz6mK0o-.js";
import { t as getUserStatusString } from "./getUserStatusString-YlDGsxzx.js";
import { a as Section } from "./emailVerification-C8QYZSyu.js";
import { a as showPickUserPopup } from "./pickUser-D8S6yVuK.js";
import { n as useSuperTab } from "./superTabProvider-LtveyH7W.js";
import { t as formatUserPhone } from "./formatUserPhone-BdRym6k5.js";
import { t as ButtonCorner } from "./buttonCorner-HdHn23eT.js";
import "./dialogElement-CPjhySC8.js";
//#region src/components/sidebarLeft/tabs/blockedUsers.tsx
var BlockedUsers = () => {
	const [tab] = useSuperTab();
	const { peerIds } = tab.payload;
	let captionEl;
	let menuElement;
	const list = hotReloadGuard.appDialogsManager.createChatList();
	const add = async (peerId, append) => {
		const dialogElement = hotReloadGuard.appDialogsManager.addDialogNew({
			peerId,
			container: list,
			rippleEnabled: true,
			avatarSize: "abitbigger",
			append,
			wrapOptions: { middleware: tab.middlewareHelper.get() }
		});
		dialogElement.container.dialogElement = dialogElement;
		const { dom } = dialogElement;
		const user = await tab.managers.appUsersManager.getUser(peerId.toUserId());
		if (!user) return;
		const username = getPeerActiveUsernames(user)[0];
		if (user.pFlags.bot) dom.lastMessageSpan.append("@" + username);
		else if (user.phone) dom.lastMessageSpan.textContent = formatUserPhone(user.phone);
		else dom.lastMessageSpan.append(username ? "@" + username : getUserStatusString(user));
	};
	onMount(() => {
		tab.container.classList.add("blocked-users-container");
		captionEl.parentElement.prepend(captionEl);
		tab.scrollable.container.classList.add("chatlist-container");
		const btnAdd = ButtonCorner({
			icon: "add",
			className: "is-visible",
			ariaLabel: "Add"
		});
		tab.content.append(btnAdd);
		attachClickEvent(btnAdd, (e) => {
			showPickUserPopup({
				titleLangKey: "BlockedUsers",
				peerType: ["contacts"],
				placeholder: "BlockModal.Search.Placeholder",
				onSelect: (chosen) => {
					tab.managers.appUsersManager.toggleBlock(chosen[0].peerId, true);
				}
			});
		}, { listenerSetter: tab.listenerSetter });
		for (const peerId of peerIds) add(peerId, true);
		let target;
		const onUnblock = () => {
			const peerId = target.dataset.peerId.toPeerId();
			tab.managers.appUsersManager.toggleBlock(peerId, false);
		};
		const element = menuElement = ButtonMenuSync({ buttons: [{
			icon: "lockoff",
			text: "Unblock",
			onClick: onUnblock,
			options: { listenerSetter: tab.listenerSetter }
		}] });
		element.id = "blocked-users-contextmenu";
		element.classList.add("contextmenu");
		getOverlayRoot().append(element);
		attachContextMenuListener({
			element: tab.scrollable.container,
			callback: (e) => {
				target = findUpTag(e.target, "A");
				if (!target) return;
				if (!("touches" in e)) e.preventDefault();
				if (!("touches" in e)) e.cancelBubble = true;
				positionMenu(e, element);
				contextMenuController.openBtnMenu(element);
			},
			listenerSetter: tab.listenerSetter
		});
		tab.listenerSetter.add(rootScope)("peer_block", (update) => {
			const { peerId, blocked, blockedMyStoriesFrom } = update;
			if (blockedMyStoriesFrom) return;
			const li = list.querySelector(`[data-peer-id="${peerId}"]`);
			if (blocked) {
				if (!li) add(peerId, false);
			} else if (li) li.dialogElement.remove();
		});
		const LOAD_COUNT = 50;
		let loading = false;
		tab.scrollable.onScrolledBottom = () => {
			if (loading) return;
			loading = true;
			tab.managers.appUsersManager.getBlocked(list.childElementCount, LOAD_COUNT).then((res) => {
				for (const peerId of res.peerIds) add(peerId, true);
				if (res.peerIds.length < LOAD_COUNT || list.childElementCount === res.count) tab.scrollable.onScrolledBottom = null;
				tab.scrollable.checkForTriggers();
			}).finally(() => {
				loading = false;
			});
		};
	});
	onCleanup(() => {
		menuElement?.remove();
	});
	return createComponent(Section, {
		caption: "BlockedUsersInfo",
		captionRef: (el) => captionEl = el,
		children: list
	});
};
//#endregion
export { BlockedUsers as default };
