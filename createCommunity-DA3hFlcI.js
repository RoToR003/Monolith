//# allFunctionsCalledOnLoad
import { a as i18n } from "./langPack-BmdJGr44.js";
import { C as createSignal, M as onCleanup, p as createComponent, w as createUniqueId, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { c as insert, f as setAttribute, g as template, o as className } from "./web-BPyQozky.js";
import { n as hotReloadGuard } from "./hotReloadGuardProvider-CHEsZRuG.js";
import { t as Button } from "./buttonTsx-Bwphkm9r.js";
import { t as InputFieldTsx } from "./inputFieldTsx-0SbEFdGE.js";
import { t as AvatarEdit } from "./avatarEdit-Cnvqr5-1.js";
import { a as Section } from "./emailVerification-C8QYZSyu.js";
import { r as toastNew } from "./toast-B6VD5M7R.js";
import { n as useSuperTab } from "./superTabProvider-LtveyH7W.js";
import { n as CommunityAvatarEditor } from "./communityAvatar-DgeXPobI.js";
import { t as communityShared_module_default } from "./communityShared.module-UBZ3o4PU.js";
import { r as CommunityRadioOption } from "./communityShared-DpGGDZXb.js";
import { n as CommunityPeerDialogList } from "./communityPeerDialogList-eL2VIhdd.js";
import { a as saveCurrentCommunityAvatar, i as saveCreatedCommunityFields, n as hasCommunityCreateChanges } from "./communityEditState-C0FX6AvJ.js";
//#region src/components/communities/createCommunity.tsx
var _tmpl$ = /*#__PURE__*/ template(`<div>`);
var _tmpl$2 = /*#__PURE__*/ template(`<div role=radiogroup>`);
var _tmpl$3 = /*#__PURE__*/ template(`<div><div>`);
function CreateCommunity() {
	const [tab] = useSuperTab();
	const { peerId } = tab.payload;
	const [title, setTitle] = createSignal("");
	const [mode, setMode] = createSignal("all");
	const [sourceVisibility, setSourceVisibility] = createSignal("visible");
	const [hasAvatarPreview, setHasAvatarPreview] = createSignal(false);
	const [saving, setSaving] = createSignal(false);
	const modeRadioName = createUniqueId();
	let uploadAvatar;
	let createdCommunityId;
	let savedState;
	const avatarEdit = new AvatarEdit((payload) => {
		uploadAvatar = payload;
		setHasAvatarPreview(true);
	});
	const openVisibility = () => {
		tab.slider.createTab(hotReloadGuard.tabs.AppCommunityChatSettingsTab).open({
			peerId,
			initialVisibility: sourceVisibility(),
			onSave: setSourceVisibility
		});
	};
	const getCurrentState = () => {
		return {
			title: title(),
			visibility: sourceVisibility(),
			mode: mode()
		};
	};
	const create = async () => {
		const trimmedTitle = title().trim();
		if (!trimmedTitle || saving()) return;
		const middleware = tab.middlewareHelper.get();
		let didRequestPeerLink = false;
		setSaving(true);
		try {
			if (!createdCommunityId) {
				const creatingState = getCurrentState();
				const communityId = await tab.managers.appCommunitiesManager.createCommunity({
					title: trimmedTitle,
					peerId,
					hidden: creatingState.visibility === "hidden"
				});
				if (!middleware()) return;
				createdCommunityId = communityId;
				savedState = {
					title: trimmedTitle,
					visibility: creatingState.visibility
				};
			}
			const currentState = getCurrentState();
			if (!currentState.title.trim()) return;
			await saveCreatedCommunityFields({
				current: currentState,
				saved: savedState,
				saveTitle: (nextTitle) => {
					if (!middleware()) return Promise.resolve();
					return tab.managers.appChatsManager.editTitle(createdCommunityId, nextTitle);
				},
				saveVisibility: async (nextVisibility) => {
					if (!middleware()) return;
					const result = await tab.managers.appCommunitiesManager.togglePeerLink({
						communityId: createdCommunityId,
						peerId,
						action: nextVisibility
					});
					didRequestPeerLink || (didRequestPeerLink = result.status === "requested");
				},
				saveMode: (nextMode) => {
					if (!middleware()) return Promise.resolve();
					return tab.managers.appCommunitiesManager.editDefaultBannedRightsMode(createdCommunityId, nextMode);
				}
			});
			if (!middleware()) return;
			if (hasAvatarPreview() && uploadAvatar) await saveCurrentCommunityAvatar({
				getPayload: () => uploadAvatar,
				save: (upload) => {
					return tab.managers.appChatsManager.editPhoto(createdCommunityId, upload);
				},
				clear: () => {
					uploadAvatar = void 0;
					setHasAvatarPreview(false);
				}
			});
			if (!middleware()) return;
			if (hasCommunityCreateChanges(getCurrentState(), savedState) || hasAvatarPreview()) return;
			toastNew({ langPackKey: didRequestPeerLink ? "Community.RequestSent" : "Community.Created" });
			const editTab = tab.slider.createTab(hotReloadGuard.tabs.AppEditCommunityTab);
			await editTab.open({ communityId: createdCommunityId });
			if (middleware() && tab.slider.getTab(hotReloadGuard.tabs.AppEditChatTab)) tab.slider.sliceTabsUntilTab(hotReloadGuard.tabs.AppEditChatTab, editTab);
		} catch (error) {
			if (!middleware()) return;
			console.error("create community error", error);
			toastNew({ langPackKey: "Error.AnError" });
		} finally {
			if (middleware()) setSaving(false);
		}
	};
	onCleanup(() => {
		avatarEdit.clear();
		uploadAvatar = void 0;
	});
	return (() => {
		var _el$ = _tmpl$3(), _el$2 = _el$.firstChild;
		insert(_el$2, createComponent(CommunityAvatarEditor, {
			avatarEdit,
			peerId,
			get title() {
				return title() || i18n("Community.Title").textContent;
			},
			get hasPreview() {
				return hasAvatarPreview();
			}
		}));
		insert(_el$, createComponent(Section, { get children() {
			var _el$3 = _tmpl$();
			insert(_el$3, createComponent(InputFieldTsx, {
				label: "Community.Name",
				name: "community-name",
				maxLength: 128,
				required: true,
				get value() {
					return title();
				},
				onRawInput: setTitle
			}));
			createRenderEffect(() => className(_el$3, `input-wrapper ${communityShared_module_default.editorFields}`));
			return _el$3;
		} }), null);
		insert(_el$, createComponent(Section, {
			name: "Community.WhoCanAddChats",
			get children() {
				var _el$4 = _tmpl$2();
				insert(_el$4, createComponent(CommunityRadioOption, {
					name: modeRadioName,
					value: "all",
					get selected() {
						return mode();
					},
					title: "Community.AllMembers",
					subtitle: "Community.AllMembersInfo",
					onSelect: setMode
				}), null);
				insert(_el$4, createComponent(CommunityRadioOption, {
					name: modeRadioName,
					value: "admins",
					get selected() {
						return mode();
					},
					title: "Community.OnlyAdmins",
					subtitle: "Community.OnlyAdminsInfo",
					onSelect: setMode
				}), null);
				createRenderEffect(() => setAttribute(_el$4, "aria-label", i18n("Community.WhoCanAddChats").textContent));
				return _el$4;
			}
		}), null);
		insert(_el$, createComponent(Section, {
			name: "Community.ChatsCount",
			nameArgs: [1],
			get children() {
				return createComponent(CommunityPeerDialogList, {
					items: [peerId],
					get middleware() {
						return tab.middlewareHelper.get();
					},
					getPeerId: (itemPeerId) => itemPeerId,
					onClick: openVisibility
				});
			}
		}), null);
		insert(_el$, createComponent(Button, {
			get ["class"]() {
				return communityShared_module_default.primaryButton;
			},
			primaryFilled: true,
			text: "Community.Create",
			get disabled() {
				return !title().trim() || saving();
			},
			onClick: create
		}), null);
		createRenderEffect(() => className(_el$2, communityShared_module_default.hero));
		return _el$;
	})();
}
//#endregion
export { CreateCommunity as default };
