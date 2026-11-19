//# allFunctionsCalledOnLoad
import { l as useCommunityPendingRequestsCount, o as useCommunityFull, r as useCommunity } from "./apiManagerProxy-DmQXvxSF.js";
import { a as i18n } from "./langPack-BmdJGr44.js";
import { C as createSignal, M as onCleanup, _ as createMemo, p as createComponent, s as Show, w as createUniqueId, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { c as insert, f as setAttribute, g as template, n as Portal, o as className, u as memo } from "./web-BPyQozky.js";
import { n as hotReloadGuard } from "./hotReloadGuardProvider-CHEsZRuG.js";
import { t as IconTsx } from "./iconTsx-B4lOk4A6.js";
import { t as Button } from "./buttonTsx-Bwphkm9r.js";
import { t as InputFieldTsx } from "./inputFieldTsx-0SbEFdGE.js";
import { t as AvatarEdit } from "./avatarEdit-Cnvqr5-1.js";
import { i as Row, t as confirmationPopup } from "./confirmationPopup-Bz6mK0o-.js";
import { un as hasRights } from "./getChatMigratedTo-ChhMNXuu.js";
import { U as getPeerId } from "./canPollPeerStories-D3HoBvLX.js";
import { Ut as removeChatFromCommunityWithConfirmation } from "./appDialogsManager-CXguiKc3.js";
import { i as usePromiseCollector } from "./mediaHeader-CnpQNwOl.js";
import { a as Section } from "./emailVerification-C8QYZSyu.js";
import { r as toastNew } from "./toast-B6VD5M7R.js";
import { n as useSuperTab } from "./superTabProvider-LtveyH7W.js";
import { n as CommunityAvatarEditor, t as CommunityAvatar } from "./communityAvatar-DgeXPobI.js";
import { t as useCommunityTabGuard } from "./useCommunityTabGuard-CjtFqUbl.js";
import { t as communityShared_module_default } from "./communityShared.module-UBZ3o4PU.js";
import { n as CommunityPendingRequestsRow, r as CommunityRadioOption, t as CommunityManagementRow } from "./communityShared-DpGGDZXb.js";
import { n as CommunityPeerDialogList } from "./communityPeerDialogList-eL2VIhdd.js";
import { a as saveCurrentCommunityAvatar, r as hasCommunityEditChanges, t as canSaveCommunityEdit } from "./communityEditState-C0FX6AvJ.js";
import { t as getCommunityAddMode } from "./communityAddMode-xmcOpp6c.js";
import { a as openCommunityPendingRequests, t as openCommunityLinkedChat } from "./openCommunityLinkedChat-D2WXcHlX.js";
//#region src/components/communities/editCommunity.tsx
var _tmpl$ = /*#__PURE__*/ template(`<div>`);
var _tmpl$2 = /*#__PURE__*/ template(`<div role=radiogroup>`);
var _tmpl$3 = /*#__PURE__*/ template(`<div><div>`);
function EditCommunity() {
	const [tab] = useSuperTab();
	const promiseCollector = usePromiseCollector();
	const { communityId } = tab.payload;
	useCommunityTabGuard(tab, communityId);
	const community = useCommunity(() => communityId);
	const full = useCommunityFull(() => communityId);
	if (!community() || !full()) promiseCollector.collect(tab.managers.appCommunitiesManager.reloadCommunity(communityId, false));
	return createComponent(Show, {
		get when() {
			return memo(() => !!community())() && full();
		},
		get children() {
			return createComponent(EditCommunityForm, {
				get initialCommunity() {
					return community();
				},
				get initialFull() {
					return full();
				}
			});
		}
	});
}
function EditCommunityForm(props) {
	const [tab] = useSuperTab();
	const { communityId } = tab.payload;
	const communityStore = useCommunity(() => communityId);
	const fullStore = useCommunityFull(() => communityId);
	const pendingRequestsCount = useCommunityPendingRequestsCount(() => communityId);
	const community = () => communityStore() || props.initialCommunity;
	const full = () => fullStore() || props.initialFull;
	const [savedTitle, setSavedTitle] = createSignal(props.initialCommunity.title);
	const initialRights = props.initialCommunity._ === "community" ? props.initialCommunity.default_banned_rights : void 0;
	const [savedMode, setSavedMode] = createSignal(getCommunityAddMode(initialRights));
	const [title, setTitle] = createSignal(savedTitle());
	const [mode, setMode] = createSignal(savedMode());
	const [saving, setSaving] = createSignal(false);
	const [removingPeerId, setRemovingPeerId] = createSignal();
	const [deleting, setDeleting] = createSignal(false);
	const [hasAvatarPreview, setHasAvatarPreview] = createSignal(false);
	const joiningPeerIds = /* @__PURE__ */ new Set();
	const modeRadioName = createUniqueId();
	let uploadAvatar;
	const hasRight = (permission) => {
		return hasRights(community(), permission);
	};
	const canEditInfo = () => hasRight("change_info");
	const canManageChats = () => hasRight("manage_linked_peers");
	const canDeleteCommunity = () => {
		const value = community();
		return value?._ === "community" && !!value.pFlags.creator;
	};
	const editState = () => {
		return {
			title: title(),
			savedTitle: savedTitle(),
			mode: mode(),
			savedMode: savedMode(),
			hasAvatarPreview: hasAvatarPreview()
		};
	};
	const isDirty = createMemo(() => {
		return hasCommunityEditChanges({
			...editState(),
			canEditInfo: canEditInfo(),
			canManageChats: canManageChats()
		});
	});
	const canSave = createMemo(() => {
		return canSaveCommunityEdit({
			...editState(),
			canEditInfo: canEditInfo(),
			canManageChats: canManageChats(),
			saving: saving()
		});
	});
	const avatarEdit = new AvatarEdit((payload) => {
		if (!canEditInfo()) return;
		uploadAvatar = payload;
		setHasAvatarPreview(true);
	});
	const openAddChat = () => {
		tab.slider.createTab(hotReloadGuard.tabs.AppAddChatToCommunityTab).open({ communityId });
	};
	const openAdministrators = () => {
		tab.slider.createTab(hotReloadGuard.tabs.AppChatAdministratorsTab).open({ communityId });
	};
	const openPendingRequests = () => {
		openCommunityPendingRequests({
			slider: tab.slider,
			communityId
		});
	};
	const openRemovedUsers = () => {
		tab.slider.createTab(hotReloadGuard.tabs.AppRemovedUsersTab).open({ communityId });
	};
	const openPeer = (linkedPeer) => {
		const peerId = getPeerId(linkedPeer.peer);
		openCommunityLinkedChat({
			communityId,
			peerId,
			linked: linkedPeer,
			managers: tab.managers,
			joiningPeerIds
		});
	};
	const removePeer = async (peerId) => {
		if (removingPeerId() !== void 0) return;
		setRemovingPeerId(peerId);
		try {
			await removeChatFromCommunityWithConfirmation({
				communityId,
				peerId,
				managers: tab.managers
			});
		} finally {
			setRemovingPeerId(void 0);
		}
	};
	const deleteCommunity = async () => {
		if (deleting()) return;
		try {
			await confirmationPopup({
				titleLangKey: "Community.Delete",
				descriptionLangKey: "Community.DeleteConfirm",
				button: {
					langKey: "Delete",
					isDanger: true
				}
			});
		} catch {
			return;
		}
		setDeleting(true);
		try {
			await tab.managers.appChatsManager.delete(communityId);
			toastNew({ langPackKey: "Community.Deleted" });
			tab.close();
		} catch (error) {
			console.error("delete community error", error);
			toastNew({ langPackKey: "Error.AnError" });
		} finally {
			setDeleting(false);
		}
	};
	const save = async () => {
		const trimmedTitle = title().trim();
		const editInfo = canEditInfo();
		const manageChats = canManageChats();
		if (!canSave()) return;
		setSaving(true);
		try {
			if (editInfo && trimmedTitle !== savedTitle()) {
				await tab.managers.appChatsManager.editTitle(communityId, trimmedTitle);
				setSavedTitle(trimmedTitle);
			}
			if (manageChats && mode() !== savedMode()) {
				const nextMode = mode();
				await tab.managers.appCommunitiesManager.editDefaultBannedRightsMode(communityId, nextMode);
				setSavedMode(nextMode);
			}
			if (editInfo && hasAvatarPreview() && uploadAvatar) await saveCurrentCommunityAvatar({
				getPayload: () => uploadAvatar,
				save: (upload) => {
					return tab.managers.appChatsManager.editPhoto(communityId, upload);
				},
				clear: () => {
					uploadAvatar = void 0;
					setHasAvatarPreview(false);
				}
			});
			if (!isDirty()) tab.close();
		} catch (error) {
			console.error("edit community error", error);
			toastNew({ langPackKey: "Error.AnError" });
		} finally {
			setSaving(false);
		}
	};
	onCleanup(() => {
		avatarEdit.clear();
		uploadAvatar = void 0;
	});
	return (() => {
		var _el$ = _tmpl$3(), _el$2 = _el$.firstChild;
		insert(_el$, createComponent(Portal, {
			get mount() {
				return tab.content;
			},
			get children() {
				return createComponent(Show, {
					get when() {
						return isDirty();
					},
					get children() {
						return createComponent(Button.Corner, {
							get ["class"]() {
								return `${communityShared_module_default.saveCorner} is-visible`;
							},
							icon: "check",
							get ["aria-label"]() {
								return i18n("Save").textContent;
							},
							get disabled() {
								return !canSave();
							},
							tabIndex: 0,
							onClick: save
						});
					}
				});
			}
		}), _el$2);
		insert(_el$2, createComponent(Show, {
			get when() {
				return canEditInfo();
			},
			get fallback() {
				return createComponent(CommunityAvatar, {
					get community() {
						return community();
					},
					get title() {
						return title();
					},
					size: 120
				});
			},
			get children() {
				return createComponent(CommunityAvatarEditor, {
					avatarEdit,
					get community() {
						return community();
					},
					get title() {
						return title();
					},
					get hasPreview() {
						return hasAvatarPreview();
					}
				});
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
				onRawInput: setTitle,
				get disabled() {
					return !canEditInfo();
				}
			}));
			createRenderEffect(() => className(_el$3, `input-wrapper ${communityShared_module_default.editorFields}`));
			return _el$3;
		} }), null);
		insert(_el$, createComponent(Show, {
			get when() {
				return canManageChats();
			},
			get children() {
				return createComponent(Section, {
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
				});
			}
		}), null);
		insert(_el$, createComponent(Section, { get children() {
			return [
				createComponent(CommunityManagementRow, {
					icon: "admin_filled",
					title: "PeerInfo.Administrators",
					get right() {
						return String(full().admins_count ?? 0);
					},
					rightSecondary: true,
					onClick: openAdministrators
				}),
				createComponent(Show, {
					get when() {
						return memo(() => !!canManageChats())() && !!pendingRequestsCount();
					},
					get children() {
						return createComponent(CommunityPendingRequestsRow, {
							get count() {
								return pendingRequestsCount();
							},
							onClick: openPendingRequests
						});
					}
				}),
				createComponent(CommunityManagementRow, {
					icon: "deleteuser",
					title: "ChannelBlockedUsers",
					get right() {
						return String(full().kicked_count ?? 0);
					},
					rightSecondary: true,
					onClick: openRemovedUsers
				})
			];
		} }), null);
		insert(_el$, createComponent(Section, {
			name: "Community.ChatsCount",
			get nameArgs() {
				return [full().linked_peers.length];
			},
			get children() {
				return [createComponent(Show, {
					get when() {
						return canManageChats();
					},
					get children() {
						return createComponent(Row, {
							clickable: openAddChat,
							role: "button",
							tabIndex: 0,
							"on:keydown": (event) => {
								if (event.key === "Enter" || event.key === " ") {
									event.preventDefault();
									event.currentTarget.click();
								}
							},
							get children() {
								return [createComponent(Row.Icon, { icon: "add" }), createComponent(Row.Title, { get children() {
									return i18n("Community.AddChat");
								} })];
							}
						});
					}
				}), createComponent(CommunityPeerDialogList, {
					avatarSize: "abitbigger",
					get items() {
						return full().linked_peers;
					},
					get middleware() {
						return tab.middlewareHelper.get();
					},
					getPeerId: (linkedPeer) => getPeerId(linkedPeer.peer),
					getTitleAccessory: (linkedPeer) => linkedPeer.visible === false ? createComponent(IconTsx, {
						get ["class"]() {
							return `inline-icon inline-icon-right ${communityShared_module_default.hiddenPeerIcon}`;
						},
						icon: "eye2_filled"
					}) : void 0,
					getContextMenu: (linkedPeer) => canManageChats() ? { buttons: [{
						icon: "crossround",
						text: "Community.RemoveChat",
						onClick: () => {
							removePeer(getPeerId(linkedPeer.peer));
						}
					}] } : void 0,
					onClick: (linkedPeer) => {
						openPeer(linkedPeer);
					}
				})];
			}
		}), null);
		insert(_el$, createComponent(Show, {
			get when() {
				return canDeleteCommunity();
			},
			get children() {
				return createComponent(Section, { get children() {
					return createComponent(Button, {
						get ["class"]() {
							return `${communityShared_module_default.footerAction} btn-primary btn-transparent danger`;
						},
						get disabled() {
							return deleting();
						},
						icon: "delete",
						text: "Community.Delete",
						onClick: deleteCommunity
					});
				} });
			}
		}), null);
		createRenderEffect(() => className(_el$2, communityShared_module_default.hero));
		return _el$;
	})();
}
//#endregion
export { EditCommunity as default };
