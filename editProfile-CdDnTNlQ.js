//# allFunctionsCalledOnLoad
import { h as Modes } from "./userAgent-ByGXcznk.js";
import { n as rootScope } from "./rootScope-CZS0lmz8.js";
import { a as i18n } from "./langPack-BmdJGr44.js";
import { C as createSignal, M as onCleanup, N as onMount, _ as createMemo, b as createResource, g as createEffect, j as on, p as createComponent, s as Show } from "./solid-9Vxm0VIz.js";
import { c as insert, g as template, u as memo } from "./web-BPyQozky.js";
import { r as useHotReloadGuard } from "./hotReloadGuard-BUNVkeQ4.js";
import { n as hotReloadGuard } from "./hotReloadGuardProvider-CHEsZRuG.js";
import { n as attachClickEvent } from "./clickEvent-COk4YpLP.js";
import { n as PopupElement } from "./indexTsx-v9mB9bAq.js";
import { n as InputState } from "./inputField-CaCo30N0.js";
import { t as InputFieldTsx } from "./inputFieldTsx-0SbEFdGE.js";
import { Et as usePremium, dt as wrapPeerTitle, i as Row } from "./confirmationPopup-Bz6mK0o-.js";
import { i as usePromiseCollector } from "./mediaHeader-CnpQNwOl.js";
import { a as Section } from "./emailVerification-C8QYZSyu.js";
import { r as toastNew } from "./toast-B6VD5M7R.js";
import { a as showPickUserPopup } from "./pickUser-D8S6yVuK.js";
import { n as useSuperTab } from "./superTabProvider-LtveyH7W.js";
import { t as toastError } from "./toastError-BSN4cjN_.js";
import { t as EditPeer } from "./editPeer-DiIQE_5N.js";
import { n as showBirthdayPopup, t as saveMyBirthday } from "./birthday-n9InLDUb.js";
import { t as OpeningHours } from "./openingHours-DvQwjHAK.js";
import { t as getPeerEditableUsername } from "./getPeerEditableUsername-BUgQbT4O.js";
import { n as UsernamesSection, r as UsernameInputField, t as purchaseUsernameCaption } from "./purchaseUsernameCaption-B5g1Cm5z.js";
import { n as trackAvatarUpload } from "./avatarUpload-B5aFUIHT.js";
//#region src/components/sidebarLeft/tabs/editProfile.tsx
var _tmpl$ = /*#__PURE__*/ template(`<div class=input-wrapper>`);
var _tmpl$2 = /*#__PURE__*/ template(`<span class=primary>`);
var EditProfileTab = () => {
	const [tab] = useSuperTab();
	const promiseCollector = usePromiseCollector();
	const { appSidebarLeft } = useHotReloadGuard();
	const payload = tab.payload;
	const loadPromise = Promise.all([
		Promise.resolve(payload.bioMaxLength),
		Promise.resolve(payload.user),
		Promise.resolve(payload.userFull)
	]);
	promiseCollector.collect(loadPromise);
	const [data] = createResource(() => loadPromise.then(([bioMaxLength, user, userFull]) => ({
		bioMaxLength,
		user,
		userFull
	})));
	return createComponent(Show, {
		get when() {
			return data();
		},
		get children() {
			return createComponent(EditProfileForm, {
				get data() {
					return data();
				},
				get connectedBot() {
					return payload.connectedBot;
				}
			});
		}
	});
};
var EditProfileForm = (props) => {
	const [tab] = useSuperTab();
	const { user, userFull, bioMaxLength } = props.data;
	tab.container.classList.add("edit-profile-container");
	const inputFields = [];
	const editPeer = new EditPeer({
		peerId: rootScope.myId,
		inputFields,
		listenerSetter: tab.listenerSetter,
		middleware: tab.middlewareHelper.get()
	});
	tab.content.append(editPeer.nextBtn);
	let firstNameInputField;
	let lastNameInputField;
	let bioInputField;
	let usernameInputField;
	const trackInputField = (field) => {
		inputFields.push(field);
		tab.listenerSetter.add(field.input)("input", editPeer.handleChange);
	};
	const initialPersonalChannelId = userFull.personal_channel_id ? userFull.personal_channel_id.toChatId() : 0;
	const [personalChannelId, setPersonalChannelId] = createSignal(initialPersonalChannelId);
	const [personalChannelTitle, setPersonalChannelTitle] = createSignal(i18n("EditProfile.PersonalChannel.Add"));
	const [hasBirthday, setHasBirthday] = createSignal(!!userFull.birthday);
	const premium = usePremium();
	const [businessWorkHours, setBusinessWorkHours] = createSignal(userFull.business_work_hours);
	const [businessLocation, setBusinessLocation] = createSignal(userFull.business_location);
	const [connectedBot, setConnectedBot] = createSignal();
	const [connectedBotLoaded, setConnectedBotLoaded] = createSignal(false);
	const [connectedBotLoadFailed, setConnectedBotLoadFailed] = createSignal(false);
	const [chatAutomationTitle, setChatAutomationTitle] = createSignal(i18n("Loading"));
	/** `open 24/7`, or how many days of the week have hours — the row's value. */
	const businessHoursSummary = () => {
		const hours = businessWorkHours();
		if (OpeningHours.is24x7(hours)) return i18n("BusinessHoursProfileFullOpen");
		const openDays = OpeningHours.getDaysHours(hours.weekly_open).filter((periods) => periods.length);
		return i18n("Days", [openDays.length]);
	};
	let cleanedUp = false;
	let connectedBotVersion = 0;
	onCleanup(() => cleanedUp = true);
	const setConnectedBotFromUpdate = (bot) => {
		++connectedBotVersion;
		setConnectedBot(bot);
		setConnectedBotLoadFailed(false);
		setConnectedBotLoaded(true);
	};
	const loadConnectedBot = async (promise) => {
		const requestVersion = ++connectedBotVersion;
		setConnectedBotLoadFailed(false);
		setConnectedBotLoaded(false);
		try {
			const bot = await Promise.resolve(promise);
			if (cleanedUp || requestVersion !== connectedBotVersion) return false;
			setConnectedBot(bot);
			setConnectedBotLoaded(true);
			return true;
		} catch {
			if (!cleanedUp && requestVersion === connectedBotVersion) setConnectedBotLoadFailed(true);
			return false;
		}
	};
	loadConnectedBot(props.connectedBot);
	const isPersonalChannelChanged = createMemo(() => personalChannelId() !== initialPersonalChannelId);
	const origIsChanged = editPeer.isChanged;
	editPeer.isChanged = () => origIsChanged() || isPersonalChannelChanged();
	const { setUsername: setPurchaseUsername, element: purchaseEl } = purchaseUsernameCaption();
	let personalChannelTitleVersion = 0;
	createEffect(on(personalChannelId, async (channelId) => {
		const version = ++personalChannelTitleVersion;
		if (channelId) {
			const title = await wrapPeerTitle({ peerId: channelId.toPeerId(true) });
			if (!cleanedUp && version === personalChannelTitleVersion) setPersonalChannelTitle(title);
		} else setPersonalChannelTitle(i18n("EditProfile.PersonalChannel.Add"));
	}));
	let chatAutomationTitleVersion = 0;
	createEffect(() => {
		const loaded = connectedBotLoaded();
		const failed = connectedBotLoadFailed();
		const bot = connectedBot();
		const version = ++chatAutomationTitleVersion;
		if (failed) setChatAutomationTitle(i18n("ChatAutomation.LoadFailed"));
		else if (!loaded) setChatAutomationTitle(i18n("Loading"));
		else if (!bot) setChatAutomationTitle(i18n("ChatAutomation.Off"));
		else wrapPeerTitle({ peerId: bot.bot_id.toPeerId(false) }).then((title) => {
			if (version === chatAutomationTitleVersion) setChatAutomationTitle(title);
		});
	});
	tab.listenerSetter.add(rootScope)("chat_automation_update", setConnectedBotFromUpdate);
	tab.listenerSetter.add(rootScope)("user_full_update", async (userId) => {
		if (userId !== rootScope.myId.toUserId()) return;
		const fresh = await tab.managers.appProfileManager.getCachedFullUser(userId);
		if (cleanedUp || !fresh) return;
		setBusinessWorkHours(fresh.business_work_hours);
		setBusinessLocation(fresh.business_location);
	});
	const openChatAutomation = async () => {
		if (connectedBotLoadFailed()) {
			await loadConnectedBot(tab.managers.appBusinessManager.getConnectedBot(true));
			if (!connectedBotLoaded()) {
				toastNew({ langPackKey: "Error.AnError" });
				return;
			}
		}
		if (!connectedBotLoaded()) return;
		tab.slider.createTab(hotReloadGuard.tabs.AppChatAutomationTab).open({ connectedBot: connectedBot() });
	};
	const openPersonalChannelPicker = async () => {
		let channelIds;
		try {
			channelIds = await tab.managers.appProfileManager.getAdminedPersonalChannels();
		} catch (err) {
			console.error("getAdminedPersonalChannels error:", err);
			toastNew({ langPackKey: "Error.AnError" });
			return;
		}
		if (!channelIds.length && !personalChannelId()) {
			toastNew({ langPackKey: "EditProfile.PersonalChannel.NoChannels" });
			return;
		}
		const peerIds = channelIds.map((id) => id.toPeerId(true));
		showPickUserPopup({
			titleLangKey: "EditProfile.PersonalChannel.PickerTitle",
			peerType: ["custom"],
			getMoreCustom: async () => ({
				result: peerIds,
				isEnd: true
			}),
			noSearch: true,
			onSelect: (chosen) => {
				const newChatId = chosen[0].peerId.toChatId();
				if (newChatId === personalChannelId()) return;
				setPersonalChannelId(newChatId);
				editPeer.handleChange();
			},
			footer: () => createComponent(Show, {
				get when() {
					return personalChannelId();
				},
				get children() {
					return createComponent(PopupElement.FooterButton, {
						color: "danger",
						langKey: "EditProfile.PersonalChannel.Remove",
						callback: () => {
							setPersonalChannelId(0);
							editPeer.handleChange();
						}
					});
				}
			})
		});
	};
	const onSave = () => {
		editPeer.nextBtn.disabled = true;
		const promises = [];
		promises.push(tab.managers.appProfileManager.updateProfile(firstNameInputField.value, lastNameInputField.value, bioInputField.value).then(() => {
			tab.close();
		}, (err) => {
			const field = {
				FIRSTNAME_INVALID: firstNameInputField,
				LASTNAME_INVALID: lastNameInputField,
				ABOUT_TOO_LONG: bioInputField
			}[err?.type];
			if (field) {
				field.setError();
				if (Modes.a11y) field.input.focus();
				tab.listenerSetter.add(field.input)("input", () => {
					field.setState(InputState.Neutral);
					field.simulateInputEvent();
				}, { once: true });
			} else toastError(err, "updateProfile error:");
		}));
		if (editPeer.uploadAvatar) {
			const { file: fileFn, video: videoFn, videoStartTs } = editPeer.uploadAvatar;
			const filePromise = fileFn();
			const videoPromise = videoFn?.();
			trackAvatarUpload(rootScope.myId, {
				file: filePromise,
				video: videoPromise
			});
			promises.push(Promise.all([filePromise, videoPromise]).then(([file, video]) => {
				return tab.managers.appProfileManager.uploadProfilePhoto({
					file,
					video,
					videoStartTs
				});
			}, () => {}));
		}
		if (usernameInputField.isValidToChange()) promises.push(tab.managers.appUsersManager.updateUsername(usernameInputField.value));
		if (isPersonalChannelChanged()) promises.push(tab.managers.appProfileManager.updatePersonalChannel(personalChannelId() || void 0));
		Promise.race(promises).finally(() => {
			editPeer.nextBtn.removeAttribute("disabled");
		});
	};
	attachClickEvent(editPeer.nextBtn, onSave, { listenerSetter: tab.listenerSetter });
	onMount(() => {
		firstNameInputField.setOriginalValue(user.first_name, true);
		lastNameInputField.setOriginalValue(user.last_name, true);
		bioInputField.setOriginalValue(userFull.about, true);
		usernameInputField.setOriginalValue(getPeerEditableUsername(user), true);
		editPeer.handleChange();
	});
	return [
		memo(() => editPeer.avatarEdit.container),
		createComponent(Section, {
			caption: "Bio.Description",
			get children() {
				return [(() => {
					var _el$ = _tmpl$();
					insert(_el$, createComponent(InputFieldTsx, {
						label: "EditProfile.FirstNameLabel",
						name: "first-name",
						maxLength: 70,
						instanceRef: (ref) => {
							firstNameInputField = ref;
							trackInputField(ref);
						}
					}), null);
					insert(_el$, createComponent(InputFieldTsx, {
						label: "Login.Register.LastName.Placeholder",
						name: "last-name",
						maxLength: 64,
						instanceRef: (ref) => {
							lastNameInputField = ref;
							trackInputField(ref);
						}
					}), null);
					insert(_el$, createComponent(InputFieldTsx, {
						label: "EditProfile.BioLabel",
						name: "bio",
						maxLength: bioMaxLength,
						instanceRef: (ref) => {
							bioInputField = ref;
							trackInputField(ref);
						}
					}), null);
					return _el$;
				})(), createComponent(Show, {
					get when() {
						return !hasBirthday();
					},
					get children() {
						return createComponent(Row, {
							clickable: () => {
								showBirthdayPopup({ onSave: async (date) => {
									if (await saveMyBirthday(date)) {
										setHasBirthday(true);
										return true;
									}
									return false;
								} });
							},
							get children() {
								return [createComponent(Row.Icon, { icon: "gift_filled" }), createComponent(Row.Title, { get children() {
									return i18n("EditProfile.AddBirthdayRow");
								} })];
							}
						});
					}
				})];
			}
		}),
		createComponent(UsernameSection, {
			user,
			editPeer,
			purchaseEl,
			onPurchaseUsernameChange: setPurchaseUsername,
			usernameInputFieldRef: (ref) => {
				usernameInputField = ref;
				trackInputField(ref);
			}
		}),
		createComponent(UsernamesSection, {
			get peerId() {
				return rootScope.myId;
			},
			peer: user,
			usernameInputField
		}),
		createComponent(Section, {
			name: "EditProfile.PersonalChannel.Title",
			caption: "EditProfile.PersonalChannel.Description",
			get children() {
				return createComponent(Row, {
					clickable: openPersonalChannelPicker,
					get children() {
						return [createComponent(Row.Icon, { icon: "newchannel_filled" }), createComponent(Row.Title, {
							get titleRight() {
								return memo(() => !!!personalChannelId())() && (() => {
									var _el$2 = _tmpl$2();
									insert(_el$2, personalChannelTitle);
									return _el$2;
								})();
							},
							get children() {
								return memo(() => !!personalChannelId())() ? personalChannelTitle() : i18n("EditProfile.PersonalChannel.Label");
							}
						})];
					}
				});
			}
		}),
		createComponent(Section, {
			name: "TelegramBusiness",
			get caption() {
				return i18n(premium() ? "TelegramBusinessSubscribedSubtitle" : "TelegramBusinessSubtitle");
			},
			get children() {
				return [
					createComponent(Row, {
						clickable: () => hotReloadGuard.tabs.openBusinessEditorTab(tab.slider, hotReloadGuard.tabs.AppBusinessHoursTab),
						get children() {
							return [createComponent(Row.Icon, { icon: "time_filled" }), createComponent(Row.Title, {
								get titleRight() {
									return memo(() => !!businessWorkHours())() ? businessHoursSummary() : i18n("Off");
								},
								titleRightSecondary: true,
								get children() {
									return i18n("BusinessHours");
								}
							})];
						}
					}),
					createComponent(Row, {
						clickable: () => hotReloadGuard.tabs.openBusinessEditorTab(tab.slider, hotReloadGuard.tabs.AppBusinessLocationTab),
						get children() {
							return [createComponent(Row.Icon, { icon: "location_filled" }), createComponent(Row.Title, {
								get titleRight() {
									return businessLocation()?.address || i18n("Off");
								},
								titleRightSecondary: true,
								get children() {
									return i18n("BusinessLocation");
								}
							})];
						}
					}),
					createComponent(Row, {
						clickable: () => hotReloadGuard.tabs.openBusinessEditorTab(tab.slider, hotReloadGuard.tabs.AppBusinessChatLinksTab),
						get children() {
							return [createComponent(Row.Icon, { icon: "link_filled" }), createComponent(Row.Title, { get children() {
								return i18n("PremiumBusinessChatLinks");
							} })];
						}
					}),
					createComponent(Row, {
						clickable: () => hotReloadGuard.tabs.openBusinessEditorTab(tab.slider, hotReloadGuard.tabs.AppBusinessIntroTab),
						get children() {
							return [createComponent(Row.Icon, { icon: "message_quote" }), createComponent(Row.Title, { get children() {
								return i18n("PremiumBusinessIntro");
							} })];
						}
					})
				];
			}
		}),
		createComponent(Section, {
			name: "ChatAutomation.Title",
			caption: "ChatAutomation.ProfileDescription",
			get children() {
				return createComponent(Row, {
					get disabled() {
						return memo(() => !!!connectedBotLoaded())() && !connectedBotLoadFailed();
					},
					clickable: openChatAutomation,
					get children() {
						return [createComponent(Row.Icon, { icon: "bot_filled" }), createComponent(Row.Title, {
							get titleRight() {
								return memo(() => !!!connectedBot())() && (() => {
									var _el$3 = _tmpl$2();
									insert(_el$3, chatAutomationTitle);
									return _el$3;
								})();
							},
							get children() {
								return memo(() => !!connectedBot())() ? chatAutomationTitle() : i18n("ChatAutomation.ProfileLabel");
							}
						})];
					}
				});
			}
		})
	];
};
var UsernameSection = (props) => {
	const [tab] = useSuperTab();
	const onChange = () => {
		props.editPeer.handleChange();
		const isPurchase = inputField.error?.type === "USERNAME_PURCHASE_AVAILABLE";
		props.onPurchaseUsernameChange(isPurchase ? inputField.value : void 0);
	};
	const inputField = new UsernameInputField({
		label: "EditProfile.Username.Label",
		name: "username",
		plainText: true,
		listenerSetter: tab.listenerSetter,
		onChange,
		availableText: "EditProfile.Username.Available",
		takenText: "EditProfile.Username.Taken",
		invalidText: "EditProfile.Username.Invalid"
	}, tab.managers);
	props.usernameInputFieldRef(inputField);
	const captionContent = (() => {
		const fragment = document.createDocumentFragment();
		fragment.append(props.purchaseEl, i18n("UsernameHelp"));
		return fragment;
	})();
	return createComponent(Section, {
		name: "EditAccount.Username",
		caption: captionContent,
		get children() {
			var _el$4 = _tmpl$();
			insert(_el$4, () => inputField.container);
			return _el$4;
		}
	});
};
//#endregion
export { EditProfileTab as default };
