//# allFunctionsCalledOnLoad
import { C as createSignal, M as onCleanup, N as onMount, _ as createMemo, i as For, p as createComponent, s as Show } from "./solid-9Vxm0VIz.js";
import { u as memo } from "./web-BPyQozky.js";
import { r as useHotReloadGuard } from "./hotReloadGuard-BUNVkeQ4.js";
import { n as hotReloadGuard } from "./hotReloadGuardProvider-CHEsZRuG.js";
import { t as Button } from "./buttonTsx-Bwphkm9r.js";
import { t as InputField } from "./inputField-CaCo30N0.js";
import { F as formatDateAccordingToTodayNew } from "./index-B7axFZql.js";
import { ft as PeerTitle } from "./confirmationPopup-Bz6mK0o-.js";
import { Et as getAuthorizationErrorLangKey } from "./appDialogsManager-CXguiKc3.js";
import { t as anchorCallback } from "./anchorCallback-BbwAJdBk.js";
import { a as Section } from "./emailVerification-C8QYZSyu.js";
import { n as useSuperTab } from "./superTabProvider-LtveyH7W.js";
import { n as InactivityPeriodRow, r as SESSION_TTL_OPTIONS } from "./inactivityPeriodRow-CubtXQqx.js";
import { t as joinSessionParts } from "./joinSessionParts-BAWE5-8v.js";
import { t as getSessionPlatformIcon } from "./sessionPlatformIcon-Csi49ekf.js";
//#region src/components/sidebarLeft/tabs/activeSessions.tsx
var TERMINATE_CONNECTED_BOT_KEY = "ChatAutomation.TerminateConnectedBot";
/** tdesktop's `kMaxDeviceModelLength`. */
var MAX_DEVICE_MODEL_LENGTH = 32;
/** tdesktop's `kShortPollTimeout` — the sessions list has no update to listen to. */
var REFRESH_INTERVAL = 6e4;
var isSameHash = (a, b) => {
	return "" + a.hash === "" + b.hash;
};
var ActiveSessions = () => {
	const [tab] = useSuperTab();
	const { rootScope, Row, i18n, confirmationPopup, toastNew, useAppSettings, AvatarNewTsx, PeerTitleTsx } = useHotReloadGuard();
	const [appSettings, setAppSettings] = useAppSettings();
	const [authorizations, setAuthorizations] = createSignal(tab.payload.authorizations || []);
	const [connectedBot, setConnectedBot] = createSignal(tab.payload.connectedBot);
	const ttlDaysSignal = createSignal(tab.payload.ttlDays || 0);
	const [ttlDays, setTtlDays] = ttlDaysSignal;
	const currentSession = createMemo(() => {
		const authorization = authorizations().find((authorization) => authorization.pFlags.current);
		const customDeviceModel = appSettings.customDeviceModel;
		if (!authorization || !customDeviceModel) return authorization;
		return {
			...authorization,
			device_model: customDeviceModel
		};
	});
	const incompleteSessions = createMemo(() => authorizations().filter((authorization) => {
		return !authorization.pFlags.current && !!authorization.pFlags.password_pending;
	}));
	const otherSessions = createMemo(() => authorizations().filter((authorization) => {
		return !authorization.pFlags.current && !authorization.pFlags.password_pending;
	}));
	const hasOtherSessions = () => !!otherSessions().length || !!incompleteSessions().length || !!connectedBot();
	const refresh = () => {
		return tab.managers.appAccountManager.getAuthorizations().then((result) => {
			setAuthorizations(result.authorizations);
			setTtlDays(result.authorization_ttl_days || 0);
		}, () => {});
	};
	tab.listenerSetter.add(rootScope)("chat_automation_update", (bot) => {
		setConnectedBot(bot);
	});
	tab.listenerSetter.add(rootScope)("unconfirmed_authorizations_update", () => {
		refresh();
	});
	onMount(() => {
		if (tab.payload.ttlDays === void 0) refresh();
		const interval = setInterval(refresh, REFRESH_INTERVAL);
		onCleanup(() => clearInterval(interval));
	});
	const onError = (err) => {
		toastNew({ langPackKey: getAuthorizationErrorLangKey(err) });
	};
	const confirmTerminate = () => confirmationPopup({
		titleLangKey: "AreYouSureSessionTitle",
		descriptionLangKey: "TerminateSessionText",
		button: {
			langKey: "Terminate",
			isDanger: true
		}
	});
	const terminateSession = async (authorization) => {
		try {
			await confirmTerminate();
		} catch (err) {
			return false;
		}
		try {
			const terminated = await tab.managers.appAccountManager.resetAuthorization(authorization.hash);
			if (terminated) setAuthorizations((list) => list.filter((item) => !isSameHash(item, authorization)));
			return terminated;
		} catch (err) {
			onError(err);
			return false;
		}
	};
	const terminateConnectedBot = async (bot) => {
		try {
			await confirmTerminate();
		} catch (err) {
			return;
		}
		tab.managers.appBusinessManager.updateConnectedBot({ previousBotId: bot.bot_id }).catch(onError);
	};
	const terminateAll = async () => {
		const bot = connectedBot();
		const options = {
			titleLangKey: "AreYouSureSessionsTitle",
			descriptionLangKey: "AreYouSureSessions",
			button: {
				langKey: "Terminate",
				isDanger: true
			}
		};
		let alsoTerminateBot = false;
		try {
			if (bot) alsoTerminateBot = await confirmationPopup({
				...options,
				checkbox: {
					text: TERMINATE_CONNECTED_BOT_KEY,
					textArgs: [new PeerTitle({
						peerId: bot.bot_id.toPeerId(false),
						username: true
					}).element]
				}
			});
			else await confirmationPopup(options);
		} catch (err) {
			return;
		}
		try {
			if (!await tab.managers.appAccountManager.resetAuthorizations()) {
				toastNew({ langPackKey: "Error.AnError" });
				return;
			}
			setAuthorizations((list) => list.filter((authorization) => authorization.pFlags.current));
			if (alsoTerminateBot) await tab.managers.appBusinessManager.updateConnectedBot({ previousBotId: bot.bot_id });
		} catch (err) {
			onError(err);
		}
	};
	const renameDevice = async () => {
		const inputField = new InputField({
			maxLength: MAX_DEVICE_MODEL_LENGTH,
			label: "AuthSessions.DeviceName"
		});
		inputField.value = appSettings.customDeviceModel || "";
		try {
			await confirmationPopup({
				titleLangKey: "AuthSessions.RenameDevice",
				inputField,
				button: { langKey: "Save" }
			});
		} catch (err) {
			return;
		}
		setAppSettings("customDeviceModel", inputField.value.trim());
	};
	const renameAnchor = () => {
		const anchor = anchorCallback(renameDevice);
		anchor.append(i18n("AuthSessions.RenameDevice"));
		return anchor;
	};
	const openSession = (authorization) => {
		tab.slider.createTab(hotReloadGuard.tabs.AppSessionTab).open({
			authorization,
			onTerminate: authorization.pFlags.current ? void 0 : () => terminateSession(authorization),
			onSettingsChanged: (updated) => setAuthorizations((list) => {
				return list.map((item) => isSameHash(item, updated) ? {
					...item,
					pFlags: updated.pFlags
				} : item);
			})
		});
	};
	const terminateMenu = (onClick) => ({ buttons: [{
		icon: "stop",
		text: "Terminate",
		danger: true,
		onClick
	}] });
	const SessionRow = (props) => {
		const authorization = () => props.authorization;
		const isCurrent = () => !!authorization().pFlags.current;
		const lastActive = () => formatDateAccordingToTodayNew(/* @__PURE__ */ new Date(Math.max(authorization().date_active, authorization().date_created) * 1e3));
		return createComponent(Row, {
			"class": "session-row",
			clickable: () => openSession(authorization()),
			role: "button",
			tabIndex: 0,
			get contextMenu() {
				return memo(() => !!isCurrent())() ? void 0 : terminateMenu(() => {
					terminateSession(authorization());
				});
			},
			get children() {
				return [
					createComponent(Row.Icon, { get icon() {
						return getSessionPlatformIcon(authorization());
					} }),
					createComponent(Row.Title, {
						get titleRight() {
							return memo(() => !!isCurrent())() ? void 0 : lastActive();
						},
						get children() {
							return [authorization().app_name, authorization().app_version].filter(Boolean).join(" ");
						}
					}),
					createComponent(Row.Midtitle, { get children() {
						return joinSessionParts([authorization().device_model, authorization().system_version || authorization().platform], ", ");
					} }),
					createComponent(Row.Subtitle, { get children() {
						return joinSessionParts([{ ltr: authorization().ip }, authorization().country], " - ");
					} })
				];
			}
		});
	};
	const ConnectedBotRow = (props) => {
		const bot = () => props.connectedBot;
		const peerId = () => bot().bot_id.toPeerId(false);
		return createComponent(Row, {
			"class": "session-row",
			clickable: () => tab.slider.createTab(hotReloadGuard.tabs.AppConnectedBotSessionTab).open({ connectedBot: bot() }),
			role: "button",
			tabIndex: 0,
			get contextMenu() {
				return terminateMenu(() => {
					terminateConnectedBot(bot());
				});
			},
			get children() {
				return [
					createComponent(Row.Media, {
						size: "40",
						get children() {
							return createComponent(AvatarNewTsx, {
								get peerId() {
									return peerId();
								},
								size: 40
							});
						}
					}),
					createComponent(Row.Title, {
						get titleRight() {
							return memo(() => !!bot().date)() ? formatDateAccordingToTodayNew(/* @__PURE__ */ new Date(bot().date * 1e3)) : void 0;
						},
						get children() {
							return createComponent(PeerTitleTsx, { get peerId() {
								return peerId();
							} });
						}
					}),
					createComponent(Row.Midtitle, { get children() {
						return joinSessionParts([bot().device, bot().location], ", ");
					} }),
					createComponent(Row.Subtitle, { get children() {
						return i18n("ChatAutomation.Session");
					} })
				];
			}
		});
	};
	return [
		createComponent(Section, {
			name: "CurrentSession",
			get nameRight() {
				return renameAnchor();
			},
			get caption() {
				return hasOtherSessions() ? "ClearOtherSessionsHelp" : void 0;
			},
			get children() {
				return [createComponent(Show, {
					get when() {
						return currentSession();
					},
					children: (authorization) => createComponent(SessionRow, { get authorization() {
						return authorization();
					} })
				}), createComponent(Show, {
					get when() {
						return hasOtherSessions();
					},
					get children() {
						return createComponent(Button, {
							"class": "btn-primary btn-transparent danger",
							icon: "stop",
							text: "TerminateAllSessions",
							onClick: terminateAll
						});
					}
				})];
			}
		}),
		createComponent(Show, {
			get when() {
				return incompleteSessions().length;
			},
			get children() {
				return createComponent(Section, {
					name: "AuthSessions.IncompleteAttempts",
					caption: "AuthSessions.IncompleteAttemptsInfo",
					get children() {
						return createComponent(For, {
							get each() {
								return incompleteSessions();
							},
							children: (authorization) => createComponent(SessionRow, { authorization })
						});
					}
				});
			}
		}),
		createComponent(Show, {
			get when() {
				return otherSessions().length || connectedBot();
			},
			get children() {
				return createComponent(Section, {
					name: "OtherSessions",
					caption: "SessionsListInfo",
					get children() {
						return [createComponent(Show, {
							get when() {
								return connectedBot();
							},
							children: (bot) => createComponent(ConnectedBotRow, { get connectedBot() {
								return bot();
							} })
						}), createComponent(For, {
							get each() {
								return otherSessions();
							},
							children: (authorization) => createComponent(SessionRow, { authorization })
						})];
					}
				});
			}
		}),
		createComponent(Show, {
			get when() {
				return ttlDays();
			},
			get children() {
				return createComponent(Section, {
					name: "AuthSessions.TerminateIfAwayTitle",
					get children() {
						return createComponent(InactivityPeriodRow, {
							title: "AuthSessions.TerminateIfAwayFor",
							options: SESSION_TTL_OPTIONS,
							days: ttlDaysSignal,
							save: (days) => tab.managers.appAccountManager.setAuthorizationTTL(days),
							reload: () => tab.managers.appAccountManager.getAuthorizationTTL()
						});
					}
				});
			}
		})
	];
};
//#endregion
export { ActiveSessions as default };
