//# allFunctionsCalledOnLoad
import { t as noop } from "./noop-H9NNBLfX.js";
import { V as usePeer, s as useCommunityFulls } from "./apiManagerProxy-DmQXvxSF.js";
import { a as i18n } from "./langPack-BmdJGr44.js";
import { C as createSignal, M as onCleanup, g as createEffect, p as createComponent, s as Show, x as createRoot } from "./solid-9Vxm0VIz.js";
import { c as insert, d as render, u as memo } from "./web-BPyQozky.js";
import { n as hotReloadGuard } from "./hotReloadGuardProvider-CHEsZRuG.js";
import { A as AvatarNewTsx, c as createContextMenu } from "./confirmationPopup-Bz6mK0o-.js";
import { Gt as getCommunityPeerSubtitle } from "./appDialogsManager-CXguiKc3.js";
import { t as communityShared_module_default } from "./communityShared.module-UBZ3o4PU.js";
import { t as createCommunityAvatarElement } from "./communityAvatarElement-BAQVXePo.js";
//#region src/components/autonomousDialogList/createCommunityDialogElement.ts
function createCommunityDialogElement(manager, peerId, wrapOptions, options, initialize = true) {
	const loadPromises = [];
	const dialogOptions = {
		peerId,
		loadPromises,
		isBatch: true,
		isMainList: false,
		controlled: true,
		meAsSaved: true,
		wrapOptions,
		...options
	};
	const dialogElement = initialize ? manager.addListDialog(dialogOptions) : manager.addDialogNew({
		...dialogOptions,
		autonomous: false,
		withStories: true
	});
	if (initialize) Promise.all(loadPromises).catch(noop);
	dialogElement.dom.listEl.dataset.communityDialog = "true";
	return dialogElement;
}
var communityPeerDialogList_module_default = {
	withRightInteractive: "_withRightInteractive_kl5em_1",
	rightInteractive: "_rightInteractive_kl5em_6"
};
//#endregion
//#region src/components/communities/communityPeerDialogList.tsx
function getClassTokens(value) {
	return value?.split(/\s+/).filter(Boolean) || [];
}
function CommunityPeerDialogList(props) {
	const list = hotReloadGuard.appDialogsManager.createChatList();
	const records = /* @__PURE__ */ new Map();
	const rightActionRows = /* @__PURE__ */ new Map();
	let rightResizeObserver;
	let listClassTokens = [];
	const syncRightActionWidth = (right) => {
		const element = rightActionRows.get(right);
		if (!element) return;
		element.style.setProperty("--community-peer-dialog-action-width", `${right.getBoundingClientRect().width}px`);
	};
	const getRightResizeObserver = () => {
		if (!rightResizeObserver && window.ResizeObserver) {
			const ResizeObserverConstructor = window.ResizeObserver;
			rightResizeObserver = new ResizeObserverConstructor((entries) => {
				for (const entry of entries) syncRightActionWidth(entry.target);
			});
		}
		return rightResizeObserver;
	};
	const observeRightAction = (right, element) => {
		if (rightActionRows.get(right) !== element) {
			rightActionRows.set(right, element);
			getRightResizeObserver()?.observe(right);
		}
		queueMicrotask(() => syncRightActionWidth(right));
	};
	const unobserveRightAction = (right, element) => {
		if (rightActionRows.get(right) === element) {
			rightResizeObserver?.unobserve(right);
			rightActionRows.delete(right);
		}
		element.style.removeProperty("--community-peer-dialog-action-width");
	};
	const onListClick = (event) => {
		if (event.button !== 0 || !props.onClick || event.target.closest?.("[data-dialog-list-action]")) return;
		const element = event.target.closest?.("[data-community-peer-dialog]");
		if (!element || element.parentElement !== list) return;
		const record = records.get(element.dataset.peerId.toPeerId());
		if (record) props.onClick(record.getItem(), event);
	};
	list.addEventListener("click", onListClick, { capture: true });
	hotReloadGuard.appDialogsManager.setListClickListener({
		list,
		onFound: () => false,
		withContext: props.withDialogContextMenu
	});
	props.listRef?.(list);
	createEffect(() => {
		const nextTokens = getClassTokens(props.class);
		for (const token of listClassTokens) if (!nextTokens.includes(token)) list.classList.remove(token);
		for (const token of nextTokens) list.classList.add(token);
		listClassTokens = nextTokens;
	});
	const createDialogRecord = (peerId, initialItem) => {
		let record;
		const dispose = createRoot((disposeRoot) => {
			const [item, setItem] = createSignal(initialItem);
			const initialCommunity = props.getCommunity?.(initialItem);
			const communityAvatar = initialCommunity ? createCommunityAvatarElement(initialCommunity.id, 42) : void 0;
			const communityAvatarMedia = communityAvatar && props.getAvatarOverlayPeerId ? document.createElement("div") : void 0;
			if (communityAvatarMedia) {
				communityAvatarMedia.classList.add(communityShared_module_default.avatarMedia);
				communityAvatar.element.classList.add(communityShared_module_default.peerAvatar);
				communityAvatarMedia.append(communityAvatar.element);
			}
			const peer = usePeer(() => peerId);
			const dialogElement = initialCommunity ? hotReloadGuard.appDialogsManager.addDialogNew({
				peerId,
				container: false,
				autonomous: true,
				rippleEnabled: true,
				avatarSize: "abitbigger",
				meAsSaved: false,
				fromName: initialCommunity.title,
				noIcons: true,
				avatarElement: communityAvatarMedia || communityAvatar.element,
				wrapOptions: { middleware: props.middleware }
			}) : createCommunityDialogElement(hotReloadGuard.appDialogsManager, peerId, { middleware: props.middleware }, {
				avatarSize: props.avatarSize,
				dontSetActive: true
			}, false);
			if (communityAvatar) dialogElement.middlewareHelper.onDestroy(communityAvatar.dispose);
			const { dom } = dialogElement;
			const element = dom.listEl;
			element.dataset.communityPeerDialog = "true";
			const activateFromKeyboard = (event) => {
				const MouseEventConstructor = element.ownerDocument.defaultView?.MouseEvent || MouseEvent;
				element.dispatchEvent(new MouseEventConstructor("click", {
					bubbles: true,
					cancelable: true,
					button: 0,
					ctrlKey: event.ctrlKey,
					metaKey: event.metaKey,
					shiftKey: event.shiftKey
				}));
			};
			const onKeyDown = (event) => {
				if (event.target !== element || !props.onClick || event.key !== "Enter" && event.key !== " ") return;
				event.preventDefault();
				if (event.key === "Enter" && !event.repeat) activateFromKeyboard(event);
			};
			element.addEventListener("keydown", onKeyDown);
			const onKeyUp = (event) => {
				if (event.target !== element || !props.onClick || event.key !== " ") return;
				event.preventDefault();
				activateFromKeyboard(event);
			};
			element.addEventListener("keyup", onKeyUp);
			createEffect(() => {
				if (!!props.onClick) {
					element.setAttribute("role", "button");
					element.tabIndex = 0;
				} else {
					element.removeAttribute("role");
					element.removeAttribute("tabindex");
				}
			});
			let itemDatasetKeys = [];
			createEffect(() => {
				const next = props.getDataset?.(item()) || {};
				for (const key of itemDatasetKeys) if (!(key in next)) delete element.dataset[key];
				for (const [key, value] of Object.entries(next)) element.dataset[key] = value;
				itemDatasetKeys = Object.keys(next);
			});
			let itemClassTokens = [];
			createEffect(() => {
				const nextTokens = getClassTokens(props.getClass?.(item()));
				for (const token of itemClassTokens) if (!nextTokens.includes(token)) element.classList.remove(token);
				for (const token of nextTokens) element.classList.add(token);
				itemClassTokens = nextTokens;
			});
			const disposeSubtitle = render(() => memo(() => memo(() => !!props.getSubtitle)() ? props.getSubtitle(item()) : getCommunityPeerSubtitle(peer())), dom.lastMessageSpan);
			onCleanup(disposeSubtitle);
			const titleAccessoryMarker = document.createComment("community-peer-title-accessory");
			dom.titleSpan.after(titleAccessoryMarker);
			insert(dom.titleSpan.parentElement, () => props.getTitleAccessory?.(item()), titleAccessoryMarker);
			onCleanup(() => {
				let node = dom.titleSpan.nextSibling;
				while (node && node !== titleAccessoryMarker) {
					const next = node.nextSibling;
					node.remove();
					node = next;
				}
				titleAccessoryMarker.remove();
			});
			const right = document.createElement("span");
			dialogElement.titleRight.replaceChildren(right);
			const disposeRight = render(() => memo(() => props.getRight?.(item())), right);
			onCleanup(disposeRight);
			onCleanup(() => unobserveRightAction(right, element));
			createEffect(() => {
				const interactive = !!props.isRightInteractive?.(item());
				element.classList.toggle(communityPeerDialogList_module_default.withRightInteractive, interactive);
				if (interactive) {
					right.classList.add(communityPeerDialogList_module_default.rightInteractive);
					right.dataset.dialogListAction = "true";
					element.append(right);
					observeRightAction(right, element);
				} else {
					unobserveRightAction(right, element);
					right.classList.remove(communityPeerDialogList_module_default.rightInteractive);
					delete right.dataset.dialogListAction;
					dialogElement.titleRight.append(right);
				}
			});
			if (initialCommunity) createEffect(() => {
				dialogElement.updateTitle(props.getCommunity?.(item())?.title || "");
			});
			if (props.getAvatarOverlayPeerId) {
				const avatarMedia = communityAvatarMedia || document.createElement("div");
				if (!communityAvatarMedia) {
					const avatar = dom.avatarEl?.node;
					avatarMedia.classList.add(communityShared_module_default.avatarMedia);
					if (avatar) avatar.classList.add(communityShared_module_default.peerAvatar);
					dialogElement.applyMediaElement(avatarMedia, "abitbigger");
					if (avatar) avatarMedia.append(avatar);
				}
				const avatarOverlay = document.createElement("span");
				avatarMedia.append(avatarOverlay);
				const disposeAvatarOverlay = render(() => createComponent(Show, {
					get when() {
						return props.getAvatarOverlayPeerId?.(item());
					},
					children: (overlayPeerId) => createComponent(AvatarNewTsx, {
						get ["class"]() {
							return communityShared_module_default.peerAvatarOverlay;
						},
						get peerId() {
							return overlayPeerId();
						},
						size: 18
					})
				}), avatarOverlay);
				onCleanup(disposeAvatarOverlay);
			}
			createEffect(() => {
				const options = props.getContextMenu?.(item());
				if (!options) return;
				const { destroy } = createContextMenu({
					...options,
					listenTo: element
				});
				onCleanup(destroy);
			});
			onCleanup(() => {
				element.removeEventListener("keydown", onKeyDown);
				element.removeEventListener("keyup", onKeyUp);
				dialogElement.remove();
			});
			record = {
				dialogElement,
				dispose: disposeRoot,
				getItem: item,
				setItem
			};
			return disposeRoot;
		});
		record.dispose = dispose;
		return record;
	};
	createEffect(() => {
		const nextPeerIds = [];
		const nextItems = /* @__PURE__ */ new Map();
		for (const item of props.items) {
			const peerId = props.getPeerId(item);
			if (!nextItems.has(peerId)) nextPeerIds.push(peerId);
			nextItems.set(peerId, item);
		}
		for (const [peerId, record] of records) {
			if (nextItems.has(peerId)) continue;
			records.delete(peerId);
			record.dispose();
		}
		for (const peerId of nextPeerIds) {
			const item = nextItems.get(peerId);
			let record = records.get(peerId);
			if (record) record.setItem(item);
			else {
				record = createDialogRecord(peerId, item);
				records.set(peerId, record);
			}
			list.append(record.dialogElement.dom.listEl);
		}
	});
	onCleanup(() => {
		list.removeEventListener("click", onListClick, { capture: true });
		for (const record of records.values()) record.dispose();
		records.clear();
		rightResizeObserver?.disconnect();
		rightActionRows.clear();
	});
	return list;
}
function CommunityDialogList(props) {
	const communityFulls = useCommunityFulls();
	return createComponent(CommunityPeerDialogList, {
		get items() {
			return props.communities;
		},
		get middleware() {
			return props.middleware;
		},
		getPeerId: (community) => community.id.toPeerId(true),
		getCommunity: (community) => community,
		getSubtitle: (community) => {
			const full = communityFulls[community.id.toChatId()];
			return full ? i18n("Community.ChatsCount", [full.linked_peers.length]) : i18n("Community.Title");
		},
		get onClick() {
			return props.onClick;
		},
		get getContextMenu() {
			return props.getContextMenu;
		},
		get ["class"]() {
			return props.class;
		}
	});
}
//#endregion
export { CommunityPeerDialogList as n, createCommunityDialogElement as r, CommunityDialogList as t };
