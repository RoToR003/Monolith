//# allFunctionsCalledOnLoad
import { M as onCleanup, N as onMount, p as createComponent } from "./solid-9Vxm0VIz.js";
import { c as insert, g as template, u as memo } from "./web-BPyQozky.js";
import { r as useHotReloadGuard } from "./hotReloadGuard-BUNVkeQ4.js";
import { n as attachClickEvent } from "./clickEvent-COk4YpLP.js";
import { t as InputFieldTsx } from "./inputFieldTsx-0SbEFdGE.js";
import { t as AvatarEdit } from "./avatarEdit-Cnvqr5-1.js";
import { a as Section } from "./emailVerification-C8QYZSyu.js";
import { t as toggleDisability } from "./toggleDisability-2oUcKWqw.js";
import { n as useSuperTab } from "./superTabProvider-LtveyH7W.js";
import { t as ButtonCorner } from "./buttonCorner-HdHn23eT.js";
import { t as handleChannelsTooMuch } from "./channelsTooMuch-CxXSuR84.js";
import { t as addChatUsers } from "./addChatUsers-CGP6Ttkc.js";
//#region src/components/sidebarLeft/tabs/newChannel.tsx
var _tmpl$ = /*#__PURE__*/ template(`<div class=input-wrapper>`);
var NewChannel = () => {
	const [tab] = useSuperTab();
	const { appImManager, appSidebarLeft } = useHotReloadGuard();
	const { onCreate, openAfter = true } = tab.payload;
	let uploadAvatar = null;
	let nameField;
	let descField;
	let nextBtn;
	const avatarEdit = new AvatarEdit((_upload) => {
		uploadAvatar = _upload;
	});
	const onLengthChange = () => {
		nextBtn.classList.toggle("is-visible", !!nameField.value.length && !nameField.input.classList.contains("error") && !descField.input.classList.contains("error"));
	};
	onMount(() => {
		tab.container.classList.add("new-channel-container");
		nextBtn = ButtonCorner({
			icon: "arrow_next",
			ariaLabel: "Next"
		});
		tab.content.append(nextBtn);
		attachClickEvent(nextBtn, () => {
			const title = nameField.value;
			const about = descField.value;
			const toggle = toggleDisability(nextBtn, true);
			const options = {
				title,
				about,
				broadcast: true
			};
			handleChannelsTooMuch(() => tab.managers.appChatsManager.createChannel(options)).then(async (channelId) => {
				if (uploadAvatar) uploadAvatar.file().then((inputFile) => {
					tab.managers.appChatsManager.editPhoto(channelId, inputFile);
				});
				await onCreate?.(channelId);
				if (!openAfter) {
					tab.close();
					return;
				}
				appImManager.setInnerPeer({ peerId: channelId.toPeerId(true) });
				appSidebarLeft.removeTabFromHistory(tab);
				addChatUsers({
					peerId: channelId.toPeerId(true),
					slider: tab.slider,
					skippable: true
				});
			}).catch((err) => {
				console.error("createChannel error", err);
				toggle();
			});
		}, { listenerSetter: tab.listenerSetter });
		nameField.input.addEventListener("input", onLengthChange);
		descField.input.addEventListener("input", onLengthChange);
	});
	onCleanup(() => {
		avatarEdit.clear();
		uploadAvatar = null;
	});
	return createComponent(Section, {
		caption: "Channel.DescriptionHolderDescrpiton",
		get children() {
			return [memo(() => avatarEdit.container), (() => {
				var _el$ = _tmpl$();
				insert(_el$, createComponent(InputFieldTsx, {
					label: "EnterChannelName",
					maxLength: 128,
					instanceRef: (ref) => nameField = ref
				}), null);
				insert(_el$, createComponent(InputFieldTsx, {
					label: "DescriptionOptionalPlaceholder",
					maxLength: 255,
					withLinebreaks: true,
					instanceRef: (ref) => descField = ref
				}), null);
				return _el$;
			})()];
		}
	});
};
//#endregion
export { NewChannel as default };
