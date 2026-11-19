//# allFunctionsCalledOnLoad
import { C as setKeptFlags, S as setKeptFlag, b as isFlagOn, f as DEBUG, g as getKeptFlags, h as Modes, m as KEPT_FLAGS, v as getURLWithoutFlags, y as isFlagInURL } from "./userAgent-ByGXcznk.js";
import { r as getAppVersionText } from "./app-BuFf8z8C.js";
import { n as appNavigationController } from "./appNavigationController-Ct0fx8yF.js";
import { t as noop } from "./noop-H9NNBLfX.js";
import { t as CURRENT_ACCOUNT_QUERY_PARAM } from "./constants-DqJIiZwa.js";
import { gt as IS_SHARED_WORKER_SUPPORTED, t as apiManagerProxy } from "./apiManagerProxy-DmQXvxSF.js";
import { a as i18n, u as langPack_default } from "./langPack-BmdJGr44.js";
import { C as createSignal, _ as createMemo, i as For, p as createComponent, s as Show } from "./solid-9Vxm0VIz.js";
import { a as isSessionLeaving, i as getManagersSession } from "./getCurrentAccount-D0KQFbZ6.js";
import { n as Portal, u as memo } from "./web-BPyQozky.js";
import { o as useAppSettings, t as liteMode } from "./liteMode-DeLStZfQ.js";
import { $ as startMemoryWatch, Q as isMemoryWatchOn, et as stopMemoryWatch } from "./index-B7axFZql.js";
import { i as Row, s as CheckboxFieldTsx, t as confirmationPopup } from "./confirmationPopup-Bz6mK0o-.js";
import { t as MediaHeader } from "./mediaHeader-CnpQNwOl.js";
import { a as Section } from "./emailVerification-C8QYZSyu.js";
import { r as toastNew } from "./toast-B6VD5M7R.js";
import { r as copyTextToClipboard } from "./clipboard-DzscV-ca.js";
import { t as shareToPeers } from "./shareUrl-BIbwyho4.js";
import { n as useSuperTab } from "./superTabProvider-LtveyH7W.js";
import { t as RadioFieldTsx } from "./radioFieldTsx-kmtuN4Dv.js";
import { n as SaveButton, t as useIsConfirmationNeededOnClose } from "./useIsConfirmationNeededOnClose-D8OTEl9F.js";
import { clearLogs, createLogsFile, downloadLogsFile, setLogsCollected } from "./exportLogs-DuyW_OXC.js";
//#region src/components/sidebarLeft/tabs/experimental.tsx
var RESTART_FLAGS = [...KEPT_FLAGS.filter((flag) => flag !== "logs" && flag !== "rtl"), "test"];
var FORCED = {
	test: false,
	noWorker: false
};
var isStartedWith = (flag) => !!FORCED[flag] || (flag === "test" ? isFlagInURL(flag) : isFlagOn(flag));
var TRANSPORTS_AVAILABLE = true;
var TRANSPORTS = [
	{
		value: "auto",
		title: "Experimental.Transport.Auto",
		subtitle: "Experimental.Transport.Auto.Subtitle"
	},
	{
		value: "websocket",
		title: "Experimental.Transport.WebSocket"
	},
	{
		value: "http",
		title: "Experimental.Transport.HTTP"
	}
];
var TOOLS = [
	{
		title: "Experimental.PopupSandbox",
		icon: "tools",
		open: "showPopupSandbox"
	},
	{
		title: "Experimental.BubbleSandbox",
		icon: "message_filled",
		open: "showBubbleSandbox"
	},
	{
		title: "Experimental.WidgetSandbox",
		icon: "webview",
		open: "showWidgetSandbox"
	},
	{
		title: "Experimental.IconLibrary",
		icon: "smile",
		open: "showIconLibrary"
	}
];
var ExperimentalTab = () => {
	const [tab] = useSuperTab();
	const startedWith = new Set(RESTART_FLAGS.filter(isStartedWith));
	const [flags, setFlags] = createSignal(startedWith);
	const isSet = (flag) => flags().has(flag);
	const setFlag = (flag, on) => {
		const next = new Set(flags());
		if (on) next.add(flag);
		else next.delete(flag);
		setFlags(next);
	};
	const changed = createMemo(() => RESTART_FLAGS.filter((flag) => isSet(flag) !== startedWith.has(flag)));
	const hasChanges = () => changed().length > 0;
	const isEveryTabRestarted = () => changed().some((flag) => flag !== "test");
	const restart = () => {
		const kept = getKeptFlags();
		const dropped = [];
		let test;
		for (const flag of changed()) {
			const on = isSet(flag);
			if (flag === "test") test = on;
			else if (on) kept.add(flag);
			else {
				kept.delete(flag);
				dropped.push(flag);
			}
		}
		const url = getURLWithoutFlags(dropped) ?? new URL(location.href);
		if (test !== void 0) {
			if (test) url.searchParams.set("test", "1");
			else url.searchParams.delete("test");
			url.searchParams.delete(CURRENT_ACCOUNT_QUERY_PARAM);
			url.hash = "";
		}
		setKeptFlags(kept);
		tab.isConfirmationNeededOnClose = void 0;
		if (isEveryTabRestarted()) apiManagerProxy.reloadEveryTab(dropped, url);
		else appNavigationController.reload(url);
	};
	const confirmRestart = () => {
		confirmationPopup({
			titleLangKey: "Experimental.Restart.Title",
			descriptionLangKey: isEveryTabRestarted() ? "Experimental.Restart.EveryTab" : "Experimental.Restart.ThisTab",
			button: { langKey: "Experimental.Restart" }
		}).then(restart, noop);
	};
	tab.isConfirmationNeededOnClose = useIsConfirmationNeededOnClose({
		hasChanges,
		saveAllSettings: async () => restart(),
		descriptionLangKey: "UnsavedChangesDescription.Experimental"
	});
	const transport = () => isSet("http") ? "http" : isSet("noMultipleTransports") ? "websocket" : "auto";
	const setTransport = (value) => {
		const next = new Set(flags());
		next.delete("http");
		next.delete("noMultipleTransports");
		if (value === "http") next.add("http");
		else if (value === "websocket") next.add("noMultipleTransports");
		setFlags(next);
	};
	const dropFromURL = (flag) => {
		const url = getURLWithoutFlags([flag]);
		if (url) history.replaceState(history.state, "", url);
	};
	const [logs, setLogs] = createSignal(getKeptFlags().has("logs") || isFlagInURL("logs"));
	const onLogsChange = (on) => {
		setLogs(on);
		setLogsCollected(on);
		if (!on) dropFromURL("logs");
	};
	const [rtl, setRtl] = createSignal(getKeptFlags().has("rtl") || isFlagInURL("rtl"));
	const onRtlChange = (on) => {
		setRtl(on);
		setKeptFlag("rtl", on);
		langPack_default.forceRTL(on || void 0);
		if (!on) dropFromURL("rtl");
	};
	const [memoryWatch, setMemoryWatch] = createSignal(isMemoryWatchOn());
	const onMemoryWatchChange = (on) => {
		setMemoryWatch(on);
		if (on) startMemoryWatch();
		else stopMemoryWatch();
		if (!on) dropFromURL("memoryWatch");
	};
	const [appSettings, setAppSettings] = useAppSettings();
	const isAllDefault = () => !RESTART_FLAGS.some((flag) => isSet(flag) && !FORCED[flag]) && !logs() && !rtl() && !memoryWatch() && !appSettings.showPeerIds;
	const resetAll = () => {
		setFlags(new Set(RESTART_FLAGS.filter((flag) => FORCED[flag])));
		if (logs()) onLogsChange(false);
		if (rtl()) onRtlChange(false);
		if (memoryWatch()) onMemoryWatchChange(false);
		if (appSettings.showPeerIds) setAppSettings("showPeerIds", false);
	};
	let exporting = false;
	const withLogsFile = async (callback) => {
		if (exporting) return;
		const session = getManagersSession(tab.managers);
		exporting = true;
		try {
			const { file, count } = await createLogsFile();
			if (isSessionLeaving(session)) return;
			if (!count) {
				toastNew({ langPackKey: "Experimental.Logs.Empty" });
				return;
			}
			await callback(file);
		} finally {
			exporting = false;
		}
	};
	const sendLogs = () => withLogsFile((file) => {
		shareToPeers({
			chatRightsActions: ["send_docs"],
			toastKey: "Experimental.Logs.SentTo",
			toastKeyForSelf: "Experimental.Logs.SentToSavedMessages",
			send: (managers, { peerId, threadId, monoforumThreadId }, confirmedPaymentResult) => {
				managers.appMessagesManager.sendFile({
					peerId,
					threadId,
					replyToMonoforumPeerId: monoforumThreadId,
					confirmedPaymentResult,
					file
				});
			}
		});
	});
	const toShareFile = (file) => new File([file], file.name.replace(/\.ndjson$/, ".txt"), { type: "text/plain" });
	const canShareFiles = (() => {
		try {
			return !!navigator.canShare?.({ files: [toShareFile(new File([""], "logs.ndjson"))] });
		} catch (err) {
			return false;
		}
	})();
	const shareLogs = () => withLogsFile(async (file) => {
		const share = () => navigator.share({ files: [toShareFile(file)] });
		try {
			await share();
		} catch (err) {
			if (err?.name !== "NotAllowedError") return;
			await confirmationPopup({
				descriptionLangKey: "Experimental.Logs.Ready",
				button: { langKey: "Experimental.Logs.Share" }
			}).then(share).catch(noop);
		}
	});
	const onClearLogs = () => {
		clearLogs();
		toastNew({ langPackKey: "Experimental.Logs.Cleared" });
	};
	const copyDebugInfo = () => {
		const flagsOn = [
			...RESTART_FLAGS.filter((flag) => startedWith.has(flag)),
			...logs() ? ["logs"] : [],
			...rtl() ? ["rtl"] : [],
			...memoryWatch() ? ["memoryWatch"] : []
		].map((flag) => isFlagInURL(flag) ? flag + " (url)" : flag);
		const workers = [Modes.noWorker ? "network in the tab" : IS_SHARED_WORKER_SUPPORTED ? "shared worker" : "dedicated worker", navigator.serviceWorker?.controller ? "service worker" : "no service worker"];
		const lines = [
			`${getAppVersionText()}, production`,
			navigator.userAgent,
			`Language: ${langPack_default.getLastAppliedLangCode()}, ${langPack_default.getIsRTL() ? "RTL" : "LTR"}`,
			`Screen: ${screen.width}×${screen.height} @${devicePixelRatio}x, window ${innerWidth}×${innerHeight}`,
			`Animations: level ${liteMode.getAnimationLevel()}`,
			`Threads: ${workers.join(", ")}`,
			`Logs: ${DEBUG || logs() ? "collected" : "off"}`,
			`Flags: ${flagsOn.join(", ") || "none"}`
		];
		copyTextToClipboard(lines.join("\n"));
		toastNew({ langPackKey: "Experimental.DebugInfoCopied" });
	};
	const tools = TOOLS.filter((tool) => typeof window[tool.open] === "function");
	const RestartToggle = (props) => {
		const forced = !!FORCED[props.flag];
		return createComponent(Row, {
			disabled: forced,
			get children() {
				return [
					createComponent(Row.CheckboxFieldToggle, { get children() {
						return createComponent(CheckboxFieldTsx, {
							toggle: true,
							get checked() {
								return isSet(props.flag) !== !!props.inverted;
							},
							disabled: forced,
							onChange: (checked) => setFlag(props.flag, checked !== !!props.inverted)
						});
					} }),
					createComponent(Row.Title, { get children() {
						return i18n(props.title);
					} }),
					createComponent(Row.Subtitle, { get children() {
						return i18n(props.subtitle);
					} })
				];
			}
		});
	};
	const LiveToggle = (props) => createComponent(Row, {
		get disabled() {
			return props.disabled;
		},
		get children() {
			return [
				memo(() => memo(() => !!props.icon)() && createComponent(Row.Icon, { get icon() {
					return props.icon;
				} })),
				createComponent(Row.CheckboxFieldToggle, { get children() {
					return createComponent(CheckboxFieldTsx, {
						toggle: true,
						get checked() {
							return props.checked;
						},
						get disabled() {
							return props.disabled;
						},
						get onChange() {
							return props.onChange;
						}
					});
				} }),
				createComponent(Row.Title, { get children() {
					return i18n(props.title);
				} }),
				createComponent(Row.Subtitle, { get children() {
					return i18n(props.subtitle);
				} })
			];
		}
	});
	const ActionRow = (props) => createComponent(Row, {
		get color() {
			return props.danger ? "danger" : void 0;
		},
		get clickable() {
			return props.onClick;
		},
		get children() {
			return [
				createComponent(Row.Icon, { get icon() {
					return props.icon;
				} }),
				createComponent(Row.Title, {
					get ["class"]() {
						return props.danger ? "danger" : void 0;
					},
					get children() {
						return i18n(props.title);
					}
				}),
				memo(() => memo(() => !!props.subtitle)() && createComponent(Row.Subtitle, { get children() {
					return i18n(props.subtitle);
				} }))
			];
		}
	});
	return [
		createComponent(Portal, {
			get mount() {
				return tab.header;
			},
			get children() {
				return createComponent(SaveButton, {
					get hasChanges() {
						return hasChanges();
					},
					onClick: confirmRestart
				});
			}
		}),
		createComponent(MediaHeader, {
			marginBottom: true,
			get children() {
				return [createComponent(MediaHeader.Sticker, {
					get animationData() {
						return tab.payload.animationData;
					},
					size: 130
				}), createComponent(MediaHeader.Subtitle, { get children() {
					return i18n("Experimental.Info");
				} })];
			}
		}),
		createComponent(Section, {
			name: "Experimental.Logs",
			caption: "Experimental.Logs.Info",
			get children() {
				return [
					createComponent(LiveToggle, {
						icon: "bug",
						title: "Experimental.Logs.Collect",
						subtitle: DEBUG ? "Experimental.Logs.Collect.Debug" : "Experimental.Logs.Collect.Subtitle",
						get checked() {
							return DEBUG || logs();
						},
						disabled: DEBUG,
						onChange: onLogsChange
					}),
					createComponent(ActionRow, {
						icon: "send_filled",
						title: "Experimental.Logs.Send",
						onClick: sendLogs
					}),
					createComponent(Show, {
						when: canShareFiles,
						get children() {
							return createComponent(ActionRow, {
								icon: "forward_filled",
								title: "Experimental.Logs.Share",
								onClick: shareLogs
							});
						}
					}),
					createComponent(ActionRow, {
						icon: "download",
						title: "Experimental.Logs.Download",
						onClick: () => withLogsFile(downloadLogsFile)
					}),
					createComponent(ActionRow, {
						icon: "delete_filled",
						title: "Experimental.Logs.Clear",
						onClick: onClearLogs,
						danger: true
					})
				];
			}
		}),
		createComponent(Section, {
			name: "Experimental.Interface",
			get children() {
				return [
					createComponent(LiveToggle, {
						title: "Experimental.ShowPeerIds",
						subtitle: "Experimental.ShowPeerIds.Subtitle",
						get checked() {
							return appSettings.showPeerIds;
						},
						onChange: (checked) => setAppSettings("showPeerIds", checked)
					}),
					createComponent(LiveToggle, {
						title: "Experimental.RTL",
						subtitle: "Experimental.RTL.Subtitle",
						get checked() {
							return rtl();
						},
						onChange: onRtlChange
					}),
					createComponent(RestartToggle, {
						flag: "a11y",
						title: "Experimental.A11y",
						subtitle: "Experimental.A11y.Subtitle"
					})
				];
			}
		}),
		createComponent(Section, {
			name: "Experimental.Connection",
			get children() {
				return [createComponent(RestartToggle, {
					flag: "noPfs",
					title: "Experimental.Pfs",
					subtitle: "Experimental.Pfs.Subtitle",
					inverted: true
				}), createComponent(RestartToggle, {
					flag: "test",
					title: "Experimental.TestServer",
					subtitle: "Experimental.TestServer.Subtitle"
				})];
			}
		}),
		createComponent(Show, {
			when: TRANSPORTS_AVAILABLE,
			get children() {
				return createComponent(Section, {
					name: "Experimental.Transport",
					get children() {
						return createComponent(For, {
							each: TRANSPORTS,
							children: (item) => createComponent(Row, { get children() {
								return [
									createComponent(Row.RadioField, { get children() {
										return createComponent(RadioFieldTsx, {
											name: "experimental-transport",
											get value() {
												return item.value;
											},
											get checked() {
												return transport() === item.value;
											},
											onChange: (checked) => checked && setTransport(item.value)
										});
									} }),
									createComponent(Row.Title, { get children() {
										return i18n(item.title);
									} }),
									memo(() => memo(() => !!item.subtitle)() && createComponent(Row.Subtitle, { get children() {
										return i18n(item.subtitle);
									} }))
								];
							} })
						});
					}
				});
			}
		}),
		createComponent(Section, {
			name: "Experimental.Engine",
			get children() {
				return [
					createComponent(RestartToggle, {
						flag: "noSharedWorker",
						title: "Experimental.SharedWorker",
						subtitle: "Experimental.SharedWorker.Subtitle",
						inverted: true
					}),
					createComponent(RestartToggle, {
						flag: "noWorker",
						title: "Experimental.Worker",
						subtitle: "Experimental.Worker.Subtitle",
						inverted: true
					}),
					createComponent(RestartToggle, {
						flag: "noServiceWorker",
						title: "Experimental.ServiceWorker",
						subtitle: "Experimental.ServiceWorker.Subtitle",
						inverted: true
					}),
					createComponent(RestartToggle, {
						flag: "noOffscreenCanvas",
						title: "Experimental.OffscreenCanvas",
						subtitle: "Experimental.OffscreenCanvas.Subtitle",
						inverted: true
					}),
					createComponent(RestartToggle, {
						flag: "noObjectUrlRevoke",
						title: "Experimental.ReleaseMedia",
						subtitle: "Experimental.ReleaseMedia.Subtitle",
						inverted: true
					})
				];
			}
		}),
		createComponent(Section, {
			name: "Experimental.Debugging",
			get children() {
				return [
					createComponent(RestartToggle, {
						flag: "debug",
						title: "Experimental.Debug",
						subtitle: "Experimental.Debug.Subtitle"
					}),
					createComponent(LiveToggle, {
						title: "Experimental.MemoryWatch",
						subtitle: "Experimental.MemoryWatch.Subtitle",
						get checked() {
							return memoryWatch();
						},
						onChange: onMemoryWatchChange
					}),
					createComponent(Show, {
						get when() {},
						get children() {
							return createComponent(RestartToggle, {
								flag: "forceHideNonContactLinks",
								title: "Experimental.HideNonContactLinks",
								subtitle: "Experimental.HideNonContactLinks.Subtitle"
							});
						}
					})
				];
			}
		}),
		createComponent(Section, {
			name: "Experimental.Tools",
			get children() {
				return [createComponent(ActionRow, {
					icon: "copy",
					title: "Experimental.CopyDebugInfo",
					subtitle: "Experimental.CopyDebugInfo.Subtitle",
					onClick: copyDebugInfo
				}), createComponent(For, {
					each: tools,
					children: (tool) => createComponent(ActionRow, {
						get icon() {
							return tool.icon;
						},
						get title() {
							return tool.title;
						},
						onClick: () => window[tool.open]()
					})
				})];
			}
		}),
		createComponent(Show, {
			get when() {
				return !isAllDefault();
			},
			get children() {
				return createComponent(Section, { get children() {
					return createComponent(ActionRow, {
						icon: "delete_filled",
						title: "Experimental.ResetAll",
						onClick: resetAll,
						danger: true
					});
				} });
			}
		})
	];
};
//#endregion
export { ExperimentalTab as default };
