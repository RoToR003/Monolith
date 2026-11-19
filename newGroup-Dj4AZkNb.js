//# allFunctionsCalledOnLoad
import { a as i18n, u as langPack_default } from "./langPack-BmdJGr44.js";
import { M as onCleanup, N as onMount, p as createComponent } from "./solid-9Vxm0VIz.js";
import { u as memo } from "./web-BPyQozky.js";
import { r as useHotReloadGuard } from "./hotReloadGuard-BUNVkeQ4.js";
import { n as hotReloadGuard } from "./hotReloadGuardProvider-CHEsZRuG.js";
import { n as attachClickEvent } from "./clickEvent-COk4YpLP.js";
import { t as InputField } from "./inputField-CaCo30N0.js";
import { t as AvatarEdit } from "./avatarEdit-Cnvqr5-1.js";
import { i as usePromiseCollector } from "./mediaHeader-CnpQNwOl.js";
import { t as getUserStatusString } from "./getUserStatusString-YlDGsxzx.js";
import { a as Section } from "./emailVerification-C8QYZSyu.js";
import { n as unwrapSolidElement } from "./wrapSolidComponent-BASCjNJG.js";
import { t as toggleDisability } from "./toggleDisability-2oUcKWqw.js";
import { n as useSuperTab } from "./superTabProvider-LtveyH7W.js";
import { t as ButtonCorner } from "./buttonCorner-HdHn23eT.js";
import { t as handleChannelsTooMuch } from "./channelsTooMuch-CxXSuR84.js";
import { n as handleMissingInvitees } from "./addChatUsers-CGP6Ttkc.js";
//#region src/components/sidebarLeft/tabs/newGroup.tsx
var NewGroup = () => {
	const [tab] = useSuperTab();
	const { appImManager } = useHotReloadGuard();
	const promiseCollector = usePromiseCollector();
	const { peerIds, isGeoChat = false, onCreate, openAfter = true, title, asChannel = false } = tab.payload;
	let uploadAvatar = null;
	let userLocationCoords;
	let userLocationAddress;
	let nextBtn;
	const avatarEdit = new AvatarEdit((_upload) => {
		uploadAvatar = _upload;
	});
	const groupNameInputField = new InputField({
		label: "CreateGroup.NameHolder",
		maxLength: 128
	});
	const groupLocationInputField = new InputField({
		label: "ChatLocation",
		name: "location",
		canBeEdited: false
	});
	const list = hotReloadGuard.appDialogsManager.createChatList({ new: true });
	const startLocating = () => {
		navigator.geolocation.getCurrentPosition((location) => {
			userLocationCoords = {
				lat: location.coords.latitude,
				long: location.coords.longitude
			};
			let uri = "https://nominatim.openstreetmap.org/reverse";
			uri += "?lat=" + location.coords.latitude;
			uri += "&lon=" + location.coords.longitude;
			uri += "&format=json";
			uri += "&addressdetails=1";
			uri += "&accept-language=en";
			fetch(uri).then((response) => response.json()).then((response) => {
				userLocationAddress = response.display_name;
				groupLocationInputField.setValueSilently(response.display_name);
			});
		}, (error) => {
			if (error instanceof GeolocationPositionError) groupLocationInputField.setValueSilently("Location permission denied. Please retry later.");
			else groupLocationInputField.setValueSilently("An error has occurred. Please retry later.");
		});
	};
	onMount(() => {
		tab.container.classList.add("new-group-container");
		const inputWrapper = document.createElement("div");
		inputWrapper.classList.add("input-wrapper");
		inputWrapper.append(groupNameInputField.container, groupLocationInputField.container);
		tab.listenerSetter.add(groupNameInputField.input)("input", () => {
			let valueCheck = !!groupNameInputField.value.length && !groupNameInputField.input.classList.contains("error");
			if (isGeoChat) valueCheck = valueCheck && !!userLocationCoords && !!userLocationAddress;
			nextBtn.classList.toggle("is-visible", !!valueCheck);
		});
		nextBtn = ButtonCorner({
			icon: "arrow_next",
			ariaLabel: "Next"
		});
		attachClickEvent(nextBtn, () => {
			const groupTitle = groupNameInputField.value;
			const userIds = peerIds.map((peerId) => peerId.toUserId());
			const toggle = toggleDisability(nextBtn, true);
			let promise;
			if (isGeoChat) {
				if (!userLocationAddress || !userLocationCoords) {
					toggle();
					return;
				}
				const options = {
					title: groupTitle,
					about: "",
					geo_point: {
						_: "inputGeoPoint",
						...userLocationCoords
					},
					address: userLocationAddress,
					megagroup: true
				};
				promise = handleChannelsTooMuch(() => tab.managers.appChatsManager.createChannel(options)).then(async (chatId) => {
					if (uploadAvatar) uploadAvatar.file().then((inputFile) => {
						tab.managers.appChatsManager.editPhoto(chatId, inputFile);
					});
					return {
						chatId,
						missingInvitees: peerIds.length ? await tab.managers.appChatsManager.inviteToChannel(chatId, peerIds) : []
					};
				});
			} else {
				if (asChannel) {
					const options = {
						megagroup: true,
						title: groupTitle,
						about: ""
					};
					promise = handleChannelsTooMuch(() => tab.managers.appChatsManager.createChannel(options)).then((chatId) => ({
						chatId,
						missingInvitees: []
					}));
					if (peerIds.length) promise = promise.then(({ chatId }) => {
						return tab.managers.appChatsManager.inviteToChannel(chatId, userIds).then((missingInvitees) => ({
							chatId,
							missingInvitees
						}));
					});
				} else promise = tab.managers.appChatsManager.createChat(groupTitle, userIds);
				promise = promise.then((result) => {
					if (uploadAvatar) uploadAvatar.file().then((inputFile) => {
						tab.managers.appChatsManager.editPhoto(result.chatId, inputFile);
					});
					return result;
				});
			}
			if (!promise) {
				toggle();
				return;
			}
			promise.then(async ({ chatId, missingInvitees }) => {
				await onCreate?.(chatId);
				tab.close();
				if (openAfter) appImManager.setInnerPeer({ peerId: chatId.toPeerId(true) });
				handleMissingInvitees(chatId, missingInvitees);
			}).catch((err) => {
				console.error("createGroup error", err);
				toggle();
			});
		}, { listenerSetter: tab.listenerSetter });
		const section = unwrapSolidElement(createComponent(Section, { get children() {
			return [memo(() => avatarEdit.container), inputWrapper];
		} }));
		const chatsSection = unwrapSolidElement(createComponent(Section, {
			get ["class"]() {
				return !peerIds.length ? "hide" : void 0;
			},
			name: "Members",
			get nameArgs() {
				return [peerIds.length];
			},
			children: list
		}));
		tab.content.append(nextBtn);
		tab.scrollable.append(section, chatsSection);
		if (isGeoChat) {
			tab.title.replaceChildren(i18n("NearbyCreateGroup"));
			groupLocationInputField.container.classList.remove("hide");
			groupLocationInputField.setValueSilently(langPack_default.format("Loading", true));
			startLocating();
		} else groupLocationInputField.container.classList.add("hide");
		const usersPromise = Promise.all(peerIds.map((peerId) => tab.managers.appUsersManager.getUser(peerId.toUserId())));
		const myUserPromise = tab.managers.appUsersManager.getSelf();
		const a = usersPromise.then((users) => {
			users.forEach((user) => {
				const { dom } = hotReloadGuard.appDialogsManager.addDialogNew({
					peerId: user.id.toPeerId(false),
					container: list,
					rippleEnabled: false,
					avatarSize: "abitbigger",
					wrapOptions: { middleware: tab.middlewareHelper.get() }
				});
				dom.lastMessageSpan.append(getUserStatusString(user));
			});
		});
		let setTitlePromise;
		if (!title) setTitlePromise = peerIds.length > 0 && peerIds.length < 5 ? Promise.all([usersPromise, myUserPromise]).then(([users, myUser]) => {
			const names = users.map((user) => [
				user.first_name,
				user.last_name,
				user.username
			].find(Boolean));
			names.unshift(myUser.first_name);
			names[0] = names[0] + " & " + names.splice(1, 1)[0];
			groupNameInputField.setDraftValue(names.join(", "));
		}) : Promise.resolve();
		else groupNameInputField.setDraftValue(title);
		promiseCollector.collect(Promise.all([a, setTitlePromise]));
	});
	onCleanup(() => {
		avatarEdit.clear();
		uploadAvatar = null;
	});
	return null;
};
//#endregion
export { NewGroup as default };
