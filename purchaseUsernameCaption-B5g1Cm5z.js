//# allFunctionsCalledOnLoad
import { t as noop } from "./noop-H9NNBLfX.js";
import { n as rootScope } from "./rootScope-CZS0lmz8.js";
import { a as i18n, d as setBlankToAnchor } from "./langPack-BmdJGr44.js";
import { C as createSignal, M as onCleanup, _ as createMemo, i as For, p as createComponent } from "./solid-9Vxm0VIz.js";
import { n as bindManagersToSession } from "./bindManagersToAccount-BL82O9H9.js";
import { _ as use, c as insert, g as template } from "./web-BPyQozky.js";
import { t as ListenerSetter } from "./listenerSetter-BER6qAXn.js";
import { t as placeCaretAtEnd } from "./placeCaretAtEnd-BtAUyd5U.js";
import { n as InputState, t as InputField } from "./inputField-CaCo30N0.js";
import { t as confirmationPopup } from "./confirmationPopup-Bz6mK0o-.js";
import { gt as isUsernameValid } from "./appDialogsManager-CXguiKc3.js";
import { a as Section } from "./emailVerification-C8QYZSyu.js";
import { l as debounce } from "./pickKeys-Ckq7_h-r.js";
import { t as createSortableList } from "./createSortableList-CV67uPcH.js";
import { t as UsernameRow } from "./usernameRow-_ciwjIjr.js";
//#region src/components/usernameInputField.ts
var UsernameInputField = class extends InputField {
	constructor(options, managers) {
		super(options);
		this.managers = managers;
		this.checkUsernameDebounced = debounce(this.checkUsername.bind(this), 150, false, true);
		options.listenerSetter.add(this.input)("input", () => {
			const value = this.getValue();
			this.error = void 0;
			if (value === this.originalValue || !value.length) {
				this.setState(InputState.Neutral);
				this.options.onChange?.();
				return;
			} else if (!isUsernameValid(value)) this.setError(this.options.invalidText);
			else this.setState(InputState.Neutral);
			if (this.input.classList.contains("error")) {
				this.options.onChange?.();
				return;
			}
			this.checkUsernameDebounced(value);
		});
	}
	getValue() {
		let value = this.value;
		if (this.options.head) {
			value = value.slice(this.options.head.length);
			this.setValueSilently(this.options.head + value);
		}
		return value;
	}
	checkUsername(username) {
		if (this.checkUsernamePromise) return;
		this.error = void 0;
		let checkPromise;
		if (this.options.peerId) checkPromise = this.managers.appChatsManager.checkUsername(this.options.peerId.toChatId(), username);
		else checkPromise = this.managers.appUsersManager.checkUsername(username);
		const promise = this.checkUsernamePromise = checkPromise.then((available) => {
			if (this.getValue() !== username) return;
			if (available) this.setState(InputState.Valid, this.options.availableText);
			else this.setError(this.options.takenText);
		}, (err) => {
			if (this.getValue() !== username) return;
			this.error = err;
			switch (this.error.type) {
				case "USERNAME_PURCHASE_AVAILABLE":
					this.setError(this.options.takenText);
					break;
				default: this.setError(this.options.invalidText);
			}
		}).then(() => {
			if (this.checkUsernamePromise === promise) this.checkUsernamePromise = void 0;
			this.options.onChange?.();
			const value = this.getValue();
			if (value !== username && this.isValidToChange() && isUsernameValid(value)) this.checkUsername(value);
		});
	}
};
//#endregion
//#region src/components/usernamesSection.tsx
var _tmpl$ = /*#__PURE__*/ template(`<div class=usernames>`);
var cloneUsernames = (usernames = []) => usernames.map((username) => ({
	...username,
	pFlags: { ...username.pFlags }
}));
function UsernamesSection(props) {
	const managers = bindManagersToSession(rootScope.managers);
	const channelId = props.peerId.isUser() ? void 0 : props.peerId.toChatId();
	const botId = props.peer.pFlags.bot ? props.peerId.toUserId() : void 0;
	const [usernames, setUsernames] = createSignal(cloneUsernames(props.peer.usernames));
	const activeUsernames = createMemo(() => usernames().filter((username) => username.pFlags.active));
	const listenerSetter = new ListenerSetter();
	let list;
	listenerSetter.add(rootScope)("peer_title_edit", async ({ peerId }) => {
		if (peerId !== props.peerId) return;
		const peer = await managers.appPeersManager.getPeer(props.peerId);
		setUsernames(cloneUsernames(peer.usernames));
	});
	const sortable = createSortableList({
		container: () => list,
		items: activeUsernames,
		getId: (username) => username.username,
		onReorder: (nextActiveUsernames) => {
			const inactiveUsernames = usernames().filter((username) => !username.pFlags.active);
			setUsernames([...nextActiveUsernames, ...inactiveUsernames]);
			managers.appUsernamesManager.reorderUsernames({
				peerId: props.peerId,
				order: nextActiveUsernames.map((username) => username.username)
			});
		}
	});
	onCleanup(() => listenerSetter.removeAll());
	const onUsernameClick = async (username) => {
		if (username.pFlags.editable) {
			if (!botId) placeCaretAtEnd(props.usernameInputField.input, true, true);
			return;
		}
		const active = !!username.pFlags.active;
		let titleLangKey, descriptionLangKey;
		if (active) {
			titleLangKey = "UsernameDeactivateLink";
			descriptionLangKey = botId ? "UsernameDeactivateLinkBotMessage" : channelId ? "UsernameDeactivateLinkChannelMessage" : "UsernameDeactivateLinkProfileMessage";
		} else {
			titleLangKey = "UsernameActivateLink";
			descriptionLangKey = botId ? "UsernameActivateLinkBotMessage" : channelId ? "UsernameActivateLinkChannelMessage" : "UsernameActivateLinkProfileMessage";
		}
		try {
			await confirmationPopup({
				titleLangKey,
				descriptionLangKey,
				button: { langKey: active ? "Hide" : "Show" }
			});
		} catch (err) {
			return;
		}
		managers.appUsernamesManager.toggleUsername({
			peerId: props.peerId,
			username: username.username,
			active: !active
		}).catch((err) => {
			if (err.type === "USERNAMES_ACTIVE_TOO_MUCH") confirmationPopup({
				titleLangKey: "UsernameActivateErrorTitle",
				descriptionLangKey: "UsernameActivateErrorMessage",
				button: {
					langKey: "OK",
					isCancel: true
				}
			}).catch(noop);
			else console.error("turn username error", err);
		});
	};
	return createComponent(Section, {
		get classList() {
			return { hide: !usernames().length };
		},
		name: "UsernamesProfileHeader",
		get caption() {
			return botId ? "UsernamesBotHelp" : !props.peerId.isUser() ? "UsernamesChannelHelp" : "UsernamesProfileHelp";
		},
		get children() {
			var _el$ = _tmpl$();
			var _ref$ = list;
			typeof _ref$ === "function" ? use(_ref$, _el$) : list = _el$;
			insert(_el$, createComponent(For, {
				get each() {
					return usernames();
				},
				children: (username) => {
					const active = !!username.pFlags.active;
					const editable = !!username.pFlags.editable;
					const sortId = username.username;
					return createComponent(UsernameRow, {
						active,
						sortable: true,
						sortingEnabled: active,
						get dragging() {
							return sortable.draggingId() === sortId;
						},
						get sortHandlePointerDown() {
							return active ? sortable.dragHandleProps(sortId).onPointerDown : void 0;
						},
						get style() {
							return active ? sortable.itemStyle(sortId) : void 0;
						},
						get title() {
							return "@" + username.username;
						},
						get subtitle() {
							return i18n(editable ? botId ? "UsernameLinkBotUsername" : "UsernameLinkEditable" : active ? "UsernameLinkActive" : "UsernameLinkInactive");
						},
						clickable: () => onUsernameClick(username)
					});
				}
			}));
			return _el$;
		}
	});
}
//#endregion
//#region src/components/sidebarLeft/tabs/purchaseUsernameCaption.ts
var FRAGMENT_USERNAME_URL = "https://fragment.com/username/";
function purchaseUsernameCaption() {
	const p = document.createElement("div");
	const a = setBlankToAnchor(document.createElement("a"));
	const purchaseText = i18n("Username.Purchase", [a]);
	purchaseText.classList.add("username-purchase-help");
	p.append(purchaseText, document.createElement("br"), document.createElement("br"));
	p.classList.add("hide");
	return {
		element: p,
		setUsername: (username) => {
			if (username) a.href = FRAGMENT_USERNAME_URL + username;
			p.classList.toggle("hide", !username);
		}
	};
}
//#endregion
export { UsernamesSection as n, UsernameInputField as r, purchaseUsernameCaption as t };
