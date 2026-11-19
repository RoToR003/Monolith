//# allFunctionsCalledOnLoad
import { U as useUser } from "./apiManagerProxy-DmQXvxSF.js";
import { a as i18n } from "./langPack-BmdJGr44.js";
import { s as wrapUrl } from "./commonStateStorage-CW-poHCa.js";
import { C as createSignal, I as splitProps, M as onCleanup, _ as createMemo, b as createResource, g as createEffect, j as on, p as createComponent, s as Show } from "./solid-9Vxm0VIz.js";
import { c as insert, g as template, n as Portal, u as memo } from "./web-BPyQozky.js";
import { n as hotReloadGuard } from "./hotReloadGuardProvider-CHEsZRuG.js";
import { t as attachClassName } from "./classname-DB9i2ReQ.js";
import { t as Button } from "./buttonTsx-Bwphkm9r.js";
import { t as InputFieldTsx } from "./inputFieldTsx-0SbEFdGE.js";
import { t as AvatarEdit } from "./avatarEdit-Cnvqr5-1.js";
import { A as AvatarNewTsx, t as confirmationPopup } from "./confirmationPopup-Bz6mK0o-.js";
import { i as usePromiseCollector } from "./mediaHeader-CnpQNwOl.js";
import { a as Section } from "./emailVerification-C8QYZSyu.js";
import { r as toastNew } from "./toast-B6VD5M7R.js";
import { n as useSuperTab } from "./superTabProvider-LtveyH7W.js";
import { t as getPeerEditableUsername } from "./getPeerEditableUsername-BUgQbT4O.js";
import { n as UsernamesSection, r as UsernameInputField, t as purchaseUsernameCaption } from "./purchaseUsernameCaption-B5g1Cm5z.js";
import { t as CommunityLinkSection } from "./communityLinkSection-BFPquMxi.js";
import { t as TransactionHistorySection } from "./transactionHistory-BaaL1CnB.js";
//#region src/components/communities/editBotCommunitySection.tsx
function EditBotCommunitySection(props) {
	const botId = props.peerId.toUserId();
	const storedUser = useUser(() => botId);
	const user = () => {
		const value = storedUser();
		return value?._ === "user" ? value : props.initialUser;
	};
	const linkedCommunityId = () => {
		return user().linked_community_id?.toChatId();
	};
	const hasInitialCommunity = (communityId) => {
		return props.initialCommunities.some((community) => {
			return community.id.toChatId() === communityId;
		});
	};
	const [communities] = createResource(() => {
		const communityId = linkedCommunityId();
		return communityId && !hasInitialCommunity(communityId) ? communityId : void 0;
	}, () => {
		return props.tab.managers.appCommunitiesManager.getJoinedCommunities(true).catch(() => []);
	}, { initialValue: props.initialCommunities });
	const currentCommunities = createMemo(() => {
		return communities() || props.initialCommunities;
	});
	createEffect(on(linkedCommunityId, (communityId) => {
		if (communityId) Promise.resolve(props.tab.managers.appProfileManager.getChatFull(communityId)).catch(() => void 0);
	}));
	const remove = async (communityId) => {
		try {
			await confirmationPopup({
				titleLangKey: "Community.RemoveBot",
				descriptionLangKey: "Community.RemoveConfirm",
				descriptionLangArgs: [user().first_name],
				button: {
					langKey: "Remove",
					isDanger: true
				}
			});
		} catch {
			return;
		}
		try {
			await props.tab.managers.appCommunitiesManager.togglePeerLink({
				communityId,
				peerId: props.peerId,
				action: "deleted"
			});
			toastNew({ langPackKey: "Community.BotRemoved" });
		} catch (error) {
			console.error("remove bot from community error", error);
			toastNew({ langPackKey: "Error.AnError" });
		}
	};
	return createComponent(CommunityLinkSection, {
		get linkedCommunityId() {
			return linkedCommunityId();
		},
		get communities() {
			return currentCommunities();
		},
		get middleware() {
			return props.tab.middlewareHelper.get();
		},
		caption: "Community.BotDescription",
		hideCaptionWhenLinked: true,
		hideWhenLinkedCommunityMissing: true,
		addIcon: "adduser",
		addText: "Community.AddBot",
		removeText: "Community.RemoveBot",
		onAdd: () => {
			props.tab.slider.createTab(hotReloadGuard.tabs.AppAddGroupToCommunityTab).open({ peerId: props.peerId });
		},
		onOpenCommunity: (communityId) => {
			hotReloadGuard.appDialogsManager.toggleForumTabByPeerId(communityId.toPeerId(true), true, false);
		},
		onRemove: remove
	});
}
//#endregion
//#region src/components/usernameInputFieldTsx.tsx
function UsernameInputFieldTsx(props) {
	const [, options] = splitProps(props, [
		"managers",
		"instanceRef",
		"originalValue",
		"containerClass"
	]);
	const field = new UsernameInputField(options, props.managers);
	attachClassName(field.container, () => props.containerClass);
	field.setOriginalValue(props.originalValue, true);
	props.instanceRef?.(field);
	createEffect(on(() => props.originalValue, (value) => {
		if (value !== field.originalValue) field.setOriginalValue(value, true);
	}));
	return field.container;
}
//#endregion
//#region src/components/sidebarRight/tabs/editBot.tsx
var _tmpl$ = /*#__PURE__*/ template(`<div class=input-wrapper>`);
async function loadEditBotData(tab, peerId) {
	const botId = peerId.toUserId();
	const [bioMaxLength, user, botInfo, joinedCommunities] = await Promise.all([
		tab.managers.apiManager.getLimit("bio"),
		tab.managers.appUsersManager.getUser(botId),
		tab.managers.appProfileManager.getBotInfo(botId),
		tab.managers.appCommunitiesManager.getJoinedCommunities().catch(() => [])
	]);
	return {
		botId,
		peerId,
		bioMaxLength,
		user,
		botInfo,
		joinedCommunities
	};
}
var EditBot = () => {
	const [tab] = useSuperTab();
	const promiseCollector = usePromiseCollector();
	const initialPromise = loadEditBotData(tab, tab.payload);
	promiseCollector.collect(initialPromise);
	tab.container.classList.add("edit-profile-container");
	const [data] = createResource(() => initialPromise);
	return createComponent(Show, {
		get when() {
			return data();
		},
		keyed: true,
		children: (loaded) => createComponent(EditBotForm, { data: loaded })
	});
};
function EditBotForm(props) {
	const [tab] = useSuperTab();
	const initialUsername = getPeerEditableUsername(props.data.user);
	const [firstName, setFirstName] = createSignal(props.data.user.first_name);
	const [about, setAbout] = createSignal(props.data.botInfo.about || "");
	const [username, setUsername] = createSignal(initialUsername);
	const [usernameStateVersion, setUsernameStateVersion] = createSignal(0);
	const [usernameField, setUsernameField] = createSignal();
	const [hasAvatarPreview, setHasAvatarPreview] = createSignal(false);
	const [saving, setSaving] = createSignal(false);
	const purchaseCaption = purchaseUsernameCaption();
	let uploadAvatar;
	const avatarEdit = new AvatarEdit((payload) => {
		uploadAvatar = payload;
		setHasAvatarPreview(true);
	});
	const profileChanged = () => {
		return firstName() !== props.data.user.first_name || about() !== (props.data.botInfo.about || "");
	};
	const isDirty = createMemo(() => {
		usernameStateVersion();
		return profileChanged() || hasAvatarPreview() || !!usernameField()?.isValidToChange();
	});
	const canSave = () => isDirty() && !saving();
	onCleanup(() => {
		avatarEdit.clear();
		uploadAvatar = void 0;
	});
	const save = async () => {
		if (!canSave()) return;
		const promises = [tab.managers.appProfileManager.setBotInfo(props.data.botId, firstName(), about())];
		if (uploadAvatar) {
			const { file: fileFn, video: videoFn, videoStartTs } = uploadAvatar;
			promises.push(Promise.all([fileFn(), videoFn?.()]).then(([file, video]) => {
				return tab.managers.appProfileManager.uploadProfilePhoto({
					file,
					video,
					videoStartTs,
					botId: props.data.botId
				});
			}));
		}
		if (usernameField()?.isValidToChange()) promises.push(tab.managers.appUsersManager.updateUsername(username()));
		setSaving(true);
		try {
			await Promise.all(promises);
			tab.close();
		} catch (error) {
			console.error("edit bot error", error);
			toastNew({ langPackKey: "Error.AnError" });
		} finally {
			setSaving(false);
		}
	};
	return [
		createComponent(Portal, {
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
							"class": "is-visible",
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
		}),
		memo(() => avatarEdit.container),
		createComponent(Portal, {
			get mount() {
				return avatarEdit.container;
			},
			get children() {
				return createComponent(Show, {
					get when() {
						return !hasAvatarPreview();
					},
					get children() {
						return createComponent(AvatarNewTsx, {
							"class": "avatar-placeholder",
							get peerId() {
								return props.data.peerId;
							},
							size: 120
						});
					}
				});
			}
		}),
		createComponent(Section, { get children() {
			var _el$ = _tmpl$();
			insert(_el$, createComponent(InputFieldTsx, {
				label: "EditProfile.FirstNameLabel",
				name: "first-name",
				maxLength: 70,
				get value() {
					return firstName();
				},
				onRawInput: setFirstName
			}), null);
			insert(_el$, createComponent(InputFieldTsx, {
				label: "DescriptionPlaceholder",
				name: "bio",
				get maxLength() {
					return props.data.bioMaxLength;
				},
				get value() {
					return about();
				},
				onRawInput: setAbout
			}), null);
			return _el$;
		} }),
		createComponent(Section, {
			caption: "EditBot.Buttons.Caption",
			get children() {
				return [
					createComponent(BotFatherButton, {
						username: initialUsername,
						suffix: "intro",
						icon: "info",
						text: "EditBot.Buttons.Intro"
					}),
					createComponent(BotFatherButton, {
						username: initialUsername,
						suffix: "commands",
						icon: "botcom",
						text: "EditBot.Buttons.Commands"
					}),
					createComponent(BotFatherButton, {
						username: initialUsername,
						icon: "bots",
						text: "EditBot.Buttons.Settings"
					})
				];
			}
		}),
		createComponent(Show, {
			get when() {
				return memo(() => !!props.data.user.pFlags.bot)() && props.data.user.pFlags.bot_can_edit;
			},
			get children() {
				return [createComponent(TransactionHistorySection, {
					get peerId() {
						return props.data.peerId;
					},
					stars: true,
					ton: true
				}), createComponent(EditBotCommunitySection, {
					tab,
					get peerId() {
						return props.data.peerId;
					},
					get initialUser() {
						return props.data.user;
					},
					get initialCommunities() {
						return props.data.joinedCommunities;
					}
				})];
			}
		}),
		createComponent(Section, {
			name: "EditAccount.Username",
			get caption() {
				return [memo(() => i18n("EditBot.Username.Caption")), memo(() => purchaseCaption.element)];
			},
			get children() {
				var _el$2 = _tmpl$();
				insert(_el$2, createComponent(UsernameInputFieldTsx, {
					get managers() {
						return tab.managers;
					},
					instanceRef: setUsernameField,
					originalValue: initialUsername,
					containerClass: "disable-hover",
					label: "Username",
					name: "username",
					plainText: true,
					get listenerSetter() {
						return tab.listenerSetter;
					},
					onChange: () => {
						const field = usernameField();
						if (field) {
							setUsername(field.value);
							setUsernameStateVersion((value) => value + 1);
							purchaseCaption.setUsername(field.error?.type === "USERNAME_PURCHASE_AVAILABLE" ? field.value : void 0);
						}
					},
					availableText: "EditProfile.Username.Available",
					takenText: "EditProfile.Username.Taken",
					invalidText: "EditProfile.Username.Invalid"
				}));
				return _el$2;
			}
		}),
		createComponent(Show, {
			get when() {
				return usernameField();
			},
			children: (field) => createComponent(UsernamesSection, {
				get peerId() {
					return props.data.peerId;
				},
				get peer() {
					return props.data.user;
				},
				get usernameInputField() {
					return field();
				}
			})
		})
	];
}
function BotFatherButton(props) {
	const url = "t.me/botfather?start=" + props.username + (props.suffix ? "-" + props.suffix : "");
	const wrapped = wrapUrl(url);
	return createComponent(Button, {
		as: "a",
		"class": "btn-primary btn-transparent",
		get icon() {
			return props.icon;
		},
		get text() {
			return props.text;
		},
		ref: (element) => {
			const anchor = element;
			anchor.href = wrapped.url;
			anchor.setAttribute("onclick", wrapped.onclick + "(this)");
		}
	});
}
//#endregion
export { EditBot as default };
