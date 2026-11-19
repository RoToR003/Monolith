//# allFunctionsCalledOnLoad
import { t as noop } from "./noop-H9NNBLfX.js";
import { W as copy } from "./objectUrlUtils-5x08MNuO.js";
import { I as createProxiedManagersForAccount } from "./apiManagerProxy-DmQXvxSF.js";
import { f as MUTE_UNTIL, n as rootScope } from "./rootScope-CZS0lmz8.js";
import { a as i18n } from "./langPack-BmdJGr44.js";
import { A as mergeProps, C as createSignal, D as getOwner, M as onCleanup, P as runWithOwner, _ as createMemo, g as createEffect, p as createComponent, s as Show } from "./solid-9Vxm0VIz.js";
import { r as getCurrentAccount } from "./getCurrentAccount-D0KQFbZ6.js";
import { t as cancelEvent } from "./cancelEvent-Cw8vYZHp.js";
import { r as SETTINGS_INIT } from "./state-JPIG5PpJ.js";
import { c as insert, g as template, u as memo } from "./web-BPyQozky.js";
import { r as useHotReloadGuard } from "./hotReloadGuard-BUNVkeQ4.js";
import { n as hotReloadGuard } from "./hotReloadGuardProvider-CHEsZRuG.js";
import { o as useAppSettings } from "./liteMode-DeLStZfQ.js";
import { t as Button } from "./buttonTsx-Bwphkm9r.js";
import { i as Row, s as CheckboxFieldTsx, t as confirmationPopup } from "./confirmationPopup-Bz6mK0o-.js";
import { t as subscribeOn } from "./subscribeOn-DnCla7ws.js";
import { pt as IS_NOTIFICATION_SUPPORTED } from "./appDialogsManager-CXguiKc3.js";
import { a as Section } from "./emailVerification-C8QYZSyu.js";
import { r as toastNew } from "./toast-B6VD5M7R.js";
import { n as useSuperTab } from "./superTabProvider-LtveyH7W.js";
import { t as RangeSettingSelector } from "./rangeSettingSelector-D5UJ_dJM.js";
import { t as convertInputKeyToKey } from "./convertInputKeyToKey-CLmfTaJC.js";
import { t as convertKeyToInputKey } from "./convertKeyToInputKey-B-LMU_ro.js";
//#region src/components/sidebarLeft/tabs/notificationsTypeSettings.ts
/**
* A chat type's settings as the server has them, following every change of them, for the Notifications tab. Once
* Reset All is through they are none until asked for again (should the reset's own read of them have failed, this
* asks the server, and should that fail too, they stay none): the switches compose nothing from the ones it cleared
*/
function createTypeNotifySettings(inputKey) {
	const [notifySettings, setNotifySettings] = createSignal();
	const load = () => {
		const ret = rootScope.managers.appNotificationsManager.getNotifySettings({ _: inputKey });
		(ret instanceof Promise ? ret : Promise.resolve(ret)).then((_notifySettings) => {
			if (!notifySettings()) setNotifySettings(_notifySettings);
		}, noop);
	};
	subscribeOn(rootScope)("notify_settings", (update) => {
		if (convertKeyToInputKey(update.peer._) === inputKey) setNotifySettings(update.notify_settings);
	});
	subscribeOn(rootScope)("notify_settings_reset", () => {
		setNotifySettings(void 0);
		load();
	});
	load();
	return notifySettings;
}
//#endregion
//#region src/components/sidebarLeft/tabs/notifications.tsx
var _tmpl$ = /*#__PURE__*/ template(`<span>`);
var NotifySection = (props) => {
	const [enabled, setEnabled] = createSignal(true);
	const [showPreviews, setShowPreviews] = createSignal(true);
	const notifySettings = createTypeNotifySettings(props.inputKey);
	const inputNotifyPeer = { _: props.inputKey };
	let saved;
	createEffect(async () => {
		const _notifySettings = notifySettings();
		if (!_notifySettings) return;
		const muted = await rootScope.managers.appNotificationsManager.isMuted(_notifySettings);
		saved = {
			enabled: !muted,
			showPreviews: !!_notifySettings.show_previews
		};
		setEnabled(saved.enabled);
		setShowPreviews(saved.showPreviews);
		return muted;
	});
	props.reset.discards.add(() => {
		if (saved) {
			setEnabled(saved.enabled);
			setShowPreviews(saved.showPreviews);
		}
	});
	onCleanup(() => {
		if (props.reset.pending || !saved || !notifySettings() || enabled() === saved.enabled && showPreviews() === saved.showPreviews) return;
		const managers = createProxiedManagersForAccount(getCurrentAccount());
		const inputSettings = copy(notifySettings());
		inputSettings._ = "inputPeerNotifySettings";
		inputSettings.mute_until = enabled() ? 0 : MUTE_UNTIL;
		inputSettings.show_previews = showPreviews();
		managers.appNotificationsManager.updateNotifySettings(inputNotifyPeer, inputSettings);
	});
	const exceptions = createNotifyExceptions(props.inputKey);
	return createComponent(Section, {
		get name() {
			return props.name;
		},
		get children() {
			return [
				createComponent(Row, { get children() {
					return [createComponent(Row.CheckboxFieldToggle, { get children() {
						return createComponent(CheckboxFieldTsx, {
							get checked() {
								return enabled();
							},
							onChange: setEnabled,
							toggle: true
						});
					} }), createComponent(Row.Title, { get children() {
						return i18n(props.typeText);
					} })];
				} }),
				createComponent(Row, { get children() {
					return [createComponent(Row.CheckboxFieldToggle, { get children() {
						return createComponent(CheckboxFieldTsx, {
							get checked() {
								return showPreviews();
							},
							onChange: setShowPreviews,
							toggle: true
						});
					} }), createComponent(Row.Title, { get children() {
						return i18n("MessagePreview");
					} })];
				} }),
				createComponent(Row, {
					clickable: () => exceptions.open(),
					get children() {
						return createComponent(Row.Title, {
							get titleRight() {
								return (() => {
									var _el$ = _tmpl$();
									insert(_el$, () => exceptions.list()?.length || "");
									return _el$;
								})();
							},
							titleRightSecondary: true,
							get children() {
								return i18n("NotificationsExceptions");
							}
						});
					}
				})
			];
		}
	});
};
/**
* A chat type's exceptions (tdesktop's), asked for as the screen opens and following every change of them; the list
* the tab of the exceptions shows
*/
var createNotifyExceptions = (inputKey) => {
	const [tab] = useSuperTab();
	const [list, setList] = createSignal();
	const key = convertInputKeyToKey(inputKey);
	subscribeOn(rootScope)("notify_exceptions", (event) => {
		if (event.key === key) setList(event.exceptions);
	});
	tab.managers.appNotificationsManager.getNotifyExceptions(inputKey).then(setList);
	return {
		list,
		open: () => tab.slider.createTab(hotReloadGuard.tabs.AppNotificationExceptionsTab).open({
			inputKey,
			exceptions: list
		})
	};
};
var StoriesNotifySection = (props) => {
	const [enabled, setEnabled] = createSignal(true);
	const [important, setImportant] = createSignal(true);
	const [showSender, setShowSender] = createSignal(true);
	const inputNotifyPeer = { _: "inputNotifyUsers" };
	const notifySettings = createTypeNotifySettings(inputNotifyPeer._);
	createEffect(() => {
		const _notifySettings = notifySettings();
		if (!_notifySettings) return;
		const muted = _notifySettings.stories_muted;
		setEnabled(muted === false);
		setImportant(muted !== true);
		setShowSender(!_notifySettings.stories_hide_sender);
	});
	const save = () => {
		const _notifySettings = notifySettings();
		if (!_notifySettings || props.reset.pending) return;
		const storiesMuted = enabled() ? false : important() ? void 0 : true;
		const hideSender = !showSender();
		if (storiesMuted === _notifySettings.stories_muted && hideSender === !!_notifySettings.stories_hide_sender) return;
		const inputSettings = copy(_notifySettings);
		inputSettings._ = "inputPeerNotifySettings";
		if (storiesMuted === void 0) delete inputSettings.stories_muted;
		else inputSettings.stories_muted = storiesMuted;
		if (hideSender) inputSettings.stories_hide_sender = true;
		else delete inputSettings.stories_hide_sender;
		rootScope.managers.appNotificationsManager.updateNotifySettings(inputNotifyPeer, inputSettings);
		rootScope.managers.appNotificationsManager.generateLocalNotifySettingsUpdate(inputNotifyPeer, inputSettings);
	};
	return createComponent(Section, {
		name: "Stories",
		get caption() {
			return !enabled() ? "NotificationsStoriesImportantInfo" : void 0;
		},
		get children() {
			return [
				createComponent(Row, { get children() {
					return [createComponent(Row.CheckboxFieldToggle, { get children() {
						return createComponent(CheckboxFieldTsx, {
							get checked() {
								return enabled();
							},
							onChange: (value) => {
								setEnabled(value);
								save();
							},
							toggle: true
						});
					} }), createComponent(Row.Title, { get children() {
						return i18n("NotificationsStoriesGlobal");
					} })];
				} }),
				createComponent(Show, {
					get when() {
						return !enabled();
					},
					get children() {
						return createComponent(Row, { get children() {
							return [createComponent(Row.CheckboxFieldToggle, { get children() {
								return createComponent(CheckboxFieldTsx, {
									get checked() {
										return important();
									},
									onChange: (value) => {
										setImportant(value);
										save();
									},
									toggle: true
								});
							} }), createComponent(Row.Title, { get children() {
								return i18n("NotificationsStoriesImportant");
							} })];
						} });
					}
				}),
				createComponent(Show, {
					get when() {
						return enabled() || important();
					},
					get children() {
						return createComponent(Row, { get children() {
							return [createComponent(Row.CheckboxFieldToggle, { get children() {
								return createComponent(CheckboxFieldTsx, {
									get checked() {
										return showSender();
									},
									onChange: (value) => {
										setShowSender(value);
										save();
									},
									toggle: true
								});
							} }), createComponent(Row.Title, { get children() {
								return i18n("NotificationsStoriesDisplayAuthor");
							} })];
						} });
					}
				})
			];
		}
	});
};
var ReactionsNotifySection = (props) => {
	const [messages, setMessages] = createSignal("off");
	const [stories, setStories] = createSignal("off");
	const [pollVotes, setPollVotes] = createSignal("off");
	const [showPreviews, setShowPreviews] = createSignal(true);
	const [settings, setSettings] = createSignal();
	const fromToStr = (from) => !from ? "off" : from._ === "reactionNotificationsFromAll" ? "all" : "contacts";
	const strToFrom = (v) => v === "off" ? void 0 : v === "all" ? { _: "reactionNotificationsFromAll" } : { _: "reactionNotificationsFromContacts" };
	createEffect(() => {
		const s = settings();
		if (!s) return;
		setMessages(fromToStr(s.messages_notify_from));
		setStories(fromToStr(s.stories_notify_from));
		setPollVotes(fromToStr(s.poll_votes_notify_from));
		setShowPreviews(!!s.show_previews);
	});
	const save = () => {
		const s = settings();
		if (!s || props.reset.pending) return;
		rootScope.managers.appNotificationsManager.setReactionsNotifySettings({
			_: "reactionsNotifySettings",
			sound: s.sound,
			show_previews: showPreviews(),
			messages_notify_from: strToFrom(messages()),
			stories_notify_from: strToFrom(stories()),
			poll_votes_notify_from: strToFrom(pollVotes())
		}).then(setSettings);
	};
	rootScope.managers.appNotificationsManager.getReactionsNotifySettings().then((s) => {
		if (!settings()) setSettings(s);
	});
	subscribeOn(rootScope)("notify_settings_reset", () => {
		setSettings(void 0);
		rootScope.managers.appNotificationsManager.getReactionsNotifySettings().then(setSettings);
	});
	const CategoryRows = (props) => {
		const set = (v) => {
			props.setValue(v);
			save();
		};
		return [createComponent(Row, { get children() {
			return [createComponent(Row.CheckboxFieldToggle, { get children() {
				return createComponent(CheckboxFieldTsx, {
					get checked() {
						return props.value() !== "off";
					},
					onChange: (checked) => set(checked ? "contacts" : "off"),
					toggle: true
				});
			} }), createComponent(Row.Title, { get children() {
				return i18n(props.title);
			} })];
		} }), createComponent(Show, {
			get when() {
				return props.value() !== "off";
			},
			get children() {
				return createComponent(Row, {
					contextMenu: { buttons: [{
						text: "ReactionsNotifyContacts",
						onClick: () => set("contacts")
					}, {
						text: "ReactionsNotifyEveryone",
						onClick: () => set("all")
					}] },
					get children() {
						return createComponent(Row.Title, {
							get titleRight() {
								return i18n(props.value() === "all" ? "ReactionsNotifyEveryone" : "ReactionsNotifyContacts");
							},
							titleRightSecondary: true,
							get children() {
								return i18n("ReactionsNotifyFrom");
							}
						});
					}
				});
			}
		})];
	};
	return createComponent(Section, {
		name: "Reactions",
		get children() {
			return [
				createComponent(CategoryRows, {
					title: "ReactionsNotifyMessages",
					value: messages,
					setValue: setMessages
				}),
				createComponent(CategoryRows, {
					title: "ReactionsNotifyStories",
					value: stories,
					setValue: setStories
				}),
				createComponent(CategoryRows, {
					title: "ReactionsNotifyPollVotes",
					value: pollVotes,
					setValue: setPollVotes
				}),
				createComponent(Show, {
					get when() {
						return messages() !== "off" || stories() !== "off" || pollVotes() !== "off";
					},
					get children() {
						return createComponent(Row, { get children() {
							return [createComponent(Row.CheckboxFieldToggle, { get children() {
								return createComponent(CheckboxFieldTsx, {
									get checked() {
										return showPreviews();
									},
									onChange: (value) => {
										setShowPreviews(value);
										save();
									},
									toggle: true
								});
							} }), createComponent(Row.Title, { get children() {
								return i18n("NotificationsStoriesDisplayAuthor");
							} })];
						} });
					}
				})
			];
		}
	});
};
var OtherSection = (props) => {
	const [contactJoined, setContactJoined] = createSignal(true);
	const owner = getOwner();
	let saved;
	const load = () => rootScope.managers.appNotificationsManager.getContactSignUpNotification().then((enabled) => {
		saved = enabled;
		setContactJoined(enabled);
	});
	props.reset.discards.add(() => {
		if (saved !== void 0) setContactJoined(saved);
	});
	load().then(() => {
		runWithOwner(owner, () => onCleanup(() => {
			const _enabled = contactJoined();
			if (!props.reset.pending && _enabled !== saved) rootScope.managers.appNotificationsManager.setContactSignUpNotification(!_enabled);
		}));
	});
	subscribeOn(rootScope)("notify_settings_reset", load);
	return createComponent(Section, {
		name: "NotificationsOther",
		get children() {
			return createComponent(Row, { get children() {
				return [createComponent(Row.CheckboxFieldToggle, { get children() {
					return createComponent(CheckboxFieldTsx, {
						get checked() {
							return contactJoined();
						},
						onChange: setContactJoined,
						toggle: true
					});
				} }), createComponent(Row.Title, { get children() {
					return i18n("ContactJoined");
				} })];
			} });
		}
	});
};
var NotificationsSection = () => {
	const { uiNotificationsManager } = useHotReloadGuard();
	const [appSettings, setAppSettings] = useAppSettings();
	const [permission, setPermission] = createSignal(IS_NOTIFICATION_SUPPORTED ? Notification.permission : "denied");
	const isGranted = createMemo(() => permission() === "granted");
	const onClick = (e) => {
		cancelEvent(e);
		if (!IS_NOTIFICATION_SUPPORTED) {
			toastNew({ langPackKey: "Notifications.Restricted" });
			return;
		}
		Notification.requestPermission().then((permission) => {
			setPermission(permission);
			if (permission === "granted") uiNotificationsManager.onPushConditionsChange();
			else throw 1;
		}, () => {
			toastNew({ langPackKey: "Notifications.Restricted" });
		});
	};
	const NotificationRow = (props) => {
		return createComponent(Row, mergeProps(props, {
			get fakeDisabled() {
				return !isGranted();
			},
			get clickable() {
				return !isGranted() && onClick;
			}
		}));
	};
	const NotificationCheckbox = (props) => {
		return createComponent(CheckboxFieldTsx, mergeProps(props, { get checked() {
			return memo(() => !!isGranted())() && props.checked;
		} }));
	};
	return createComponent(Section, {
		name: "Notifications.Web",
		get caption() {
			return isGranted() ? "MultiAccount.ShowNotificationsFromCaption" : "Notifications.Default";
		},
		get children() {
			return [
				createComponent(NotificationRow, { get children() {
					return [createComponent(Row.CheckboxFieldToggle, { get children() {
						return createComponent(NotificationCheckbox, {
							get checked() {
								return appSettings.notifications.desktop;
							},
							onChange: (value) => setAppSettings("notifications", "desktop", value),
							toggle: true
						});
					} }), createComponent(Row.Title, { get children() {
						return i18n("Notifications.Show");
					} })];
				} }),
				createComponent(NotificationRow, { get children() {
					return [createComponent(Row.CheckboxFieldToggle, { get children() {
						return createComponent(NotificationCheckbox, {
							get checked() {
								return appSettings.notifications.push;
							},
							onChange: (value) => setAppSettings("notifications", "push", value),
							toggle: true
						});
					} }), createComponent(Row.Title, { get children() {
						return i18n("Notifications.Offline");
					} })];
				} }),
				createComponent(NotificationRow, { get children() {
					return [createComponent(Row.CheckboxFieldToggle, { get children() {
						return createComponent(NotificationCheckbox, {
							get checked() {
								return appSettings.notifyAllAccounts;
							},
							onChange: (value) => setAppSettings("notifyAllAccounts", value),
							toggle: true
						});
					} }), createComponent(Row.Title, { get children() {
						return i18n("MultiAccount.AllAccounts");
					} })];
				} }),
				memo(() => memo(() => !!!isGranted())() && createComponent(Button, {
					text: "Notifications.Enable",
					"class": "btn-primary primary btn-transparent",
					icon: "unmute",
					get disabled() {
						return isGranted();
					},
					onClick
				}))
			];
		}
	});
};
var SoundSection = () => {
	const { uiNotificationsManager } = useHotReloadGuard();
	const [appSettings, setAppSettings] = useAppSettings();
	return createComponent(Section, {
		name: "Notifications.Sound.Section",
		caption: "Notifications.Sound.Caption",
		get children() {
			return [createComponent(Row, { get children() {
				return [createComponent(Row.CheckboxFieldToggle, { get children() {
					return createComponent(CheckboxFieldTsx, {
						get checked() {
							return appSettings.notifications.sound;
						},
						onChange: (value) => {
							if (value && !appSettings.notifications.volume) setAppSettings("notifications", "volume", SETTINGS_INIT.notifications.volume);
							setAppSettings("notifications", "sound", value);
						},
						toggle: true
					});
				} }), createComponent(Row.Title, { get children() {
					return i18n("Notifications.Sound");
				} })];
			} }), createComponent(RangeSettingSelector, {
				get textLeft() {
					return i18n("Notifications.Sound.Volume");
				},
				textRight: (value) => "" + Math.floor(value * 100) + "%",
				step: .01,
				get value() {
					return appSettings.notifications.volume;
				},
				minValue: 0,
				maxValue: 1,
				onChange: (value) => {
					value = +value.toFixed(2);
					if (!value) setAppSettings("notifications", "sound", false);
					setAppSettings("notifications", "volume", value);
				},
				onMouseUp: () => {
					uiNotificationsManager.testSound(appSettings.notifications.volume);
				}
			})];
		}
	});
};
var SoundEffectsSection = () => {
	const [appSettings, setAppSettings] = useAppSettings();
	return createComponent(Section, {
		name: "Notifications.Sound.Effects",
		get children() {
			return createComponent(Row, { get children() {
				return [createComponent(Row.CheckboxFieldToggle, { get children() {
					return createComponent(CheckboxFieldTsx, {
						get checked() {
							return appSettings.notifications.sentMessageSound;
						},
						onChange: (value) => setAppSettings("notifications", "sentMessageSound", value),
						toggle: true
					});
				} }), createComponent(Row.Title, { get children() {
					return i18n("Notifications.Sound.Sent");
				} })];
			} });
		}
	});
};
var ResetSection = (props) => {
	const [tab] = useSuperTab();
	const onClick = async () => {
		const { managers } = tab;
		try {
			await confirmationPopup({
				titleLangKey: "ResetNotificationsAlertTitle",
				descriptionLangKey: "ResetNotificationsAlert",
				button: {
					langKey: "Reset",
					isDanger: true
				}
			});
		} catch (err) {
			return;
		}
		const discardUnsaved = () => props.reset.discards.forEach((discard) => discard());
		discardUnsaved();
		props.reset.pending = true;
		try {
			await managers.appNotificationsManager.resetNotifySettings();
		} catch (err) {
			toastNew({ langPackKey: "Error.AnError" });
			return;
		} finally {
			props.reset.pending = false;
			discardUnsaved();
		}
		toastNew({ langPackKey: "ResetNotificationsText" });
	};
	return createComponent(Section, {
		caption: "UndoAllCustom",
		get children() {
			return createComponent(Button, {
				"class": "btn-primary btn-transparent danger",
				icon: "delete",
				text: "ResetAllNotifications",
				onClick
			});
		}
	});
};
var Notifications = () => {
	const reset = {
		discards: /* @__PURE__ */ new Set(),
		pending: false
	};
	return [
		createComponent(NotificationsSection, {}),
		createComponent(SoundSection, {}),
		createComponent(SoundEffectsSection, {}),
		createComponent(NotifySection, {
			name: "NotificationsPrivateChats",
			typeText: "NotificationsForPrivateChats",
			inputKey: "inputNotifyUsers",
			reset
		}),
		createComponent(NotifySection, {
			name: "NotificationsGroups",
			typeText: "NotificationsForGroups",
			inputKey: "inputNotifyChats",
			reset
		}),
		createComponent(NotifySection, {
			name: "NotificationsChannels",
			typeText: "NotificationsForChannels",
			inputKey: "inputNotifyBroadcasts",
			reset
		}),
		createComponent(StoriesNotifySection, { reset }),
		createComponent(ReactionsNotifySection, { reset }),
		createComponent(OtherSection, { reset }),
		createComponent(ResetSection, { reset })
	];
};
//#endregion
export { Notifications as default };
