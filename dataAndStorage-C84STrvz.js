//# allFunctionsCalledOnLoad
import "./userAgent-ByGXcznk.js";
import { W as copy, j as CacheStorageController } from "./objectUrlUtils-5x08MNuO.js";
import { c as deepEqual } from "./encryptedStorageLayer-gN9TBXzg.js";
import { a as i18n, s as join } from "./langPack-BmdJGr44.js";
import { C as createSignal, N as onMount, b as createResource, o as Match, p as createComponent, u as Switch } from "./solid-9Vxm0VIz.js";
import { n as bindManagersToSession } from "./bindManagersToAccount-BL82O9H9.js";
import { r as SETTINGS_INIT } from "./state-JPIG5PpJ.js";
import { c as oneYearInSeconds, i as oneDayInSeconds, l as watchedCachedStorageNames, n as cachedFilesStorageName, o as oneMonthInSeconds, r as cachedVideoChunksStorageNames, s as oneWeekInSeconds, t as HTTPHeaderNames } from "./constants-DLILUQ1j.js";
import { c as insert, g as template } from "./web-BPyQozky.js";
import { r as useHotReloadGuard } from "./hotReloadGuard-BUNVkeQ4.js";
import { n as hotReloadGuard } from "./hotReloadGuardProvider-CHEsZRuG.js";
import { o as useAppSettings } from "./liteMode-DeLStZfQ.js";
import { t as I18nTsx } from "./i18n-CGMFiAW0.js";
import { t as Button$1 } from "./buttonTsx-Bwphkm9r.js";
import { i as Row, s as CheckboxFieldTsx, t as confirmationPopup } from "./confirmationPopup-Bz6mK0o-.js";
import { E as lastItem, on as namedPromises } from "./getChatMigratedTo-ChhMNXuu.js";
import { c as DurationType, r as wrapFormattedDuration } from "./wrapDuration-BQgz9hDF.js";
import { Qt as wrapAsyncClickHandler } from "./appDialogsManager-CXguiKc3.js";
import { a as Section } from "./emailVerification-C8QYZSyu.js";
import { n as useSuperTab } from "./superTabProvider-LtveyH7W.js";
import { t as Space } from "./space-XGOOgiuc.js";
import { t as formatBytes } from "./formatBytes-HLLlT7Mr.js";
import { t as RangeSettingSelector } from "./rangeSettingSelector-D5UJ_dJM.js";
var storageQuota_module_default = { Button: "_Button_5ulbx_1" };
//#endregion
//#region src/components/sidebarLeft/tabs/dataAndStorage/storageQuota.tsx
var _tmpl$ = /*#__PURE__*/ template(`<div>`);
var decimalsForFormatBytes = 1;
var getClearCachedFilesArgs = (size) => ({
	titleLangKey: "StorageQuota.ClearCachedFiles",
	descriptionLangKey: size ? "StorageQuota.ClearConfirmation" : "StorageQuota.ClearConfirmationUnknown",
	descriptionLangArgs: size ? [size] : void 0
});
var getClearStreamChunksArgs = (size) => ({
	titleLangKey: "StorageQuota.ClearCachedStreamChunks",
	descriptionLangKey: size ? "StorageQuota.ClearConfirmation" : "StorageQuota.ClearConfirmationUnknown",
	descriptionLangArgs: size ? [size] : void 0
});
var getClearAllArgs = () => ({
	titleLangKey: "StorageQuota.ClearAll",
	descriptionLangKey: "StorageQuota.ClearAllConfirmation"
});
var tryFormatBytes = (size) => {
	if (typeof size !== "number") return null;
	return formatBytes(size, decimalsForFormatBytes);
};
async function collectCachedFilesSizes() {
	const collectedSizeByTypes = {
		images: 0,
		videos: 0,
		stickers: 0,
		other: 0
	};
	let totalSize = 0;
	const storage = new CacheStorageController(cachedFilesStorageName);
	await storage.minimalBlockingIterateResponses(({ response }) => {
		const headers = response.headers;
		const contentSize = getContentSizeFromHeaders(headers);
		if (!contentSize) return;
		const contentType = headers.get("content-type");
		const category = contentType?.startsWith("image/") ? "images" : contentType?.startsWith("video/") ? "videos" : contentType?.startsWith("application/json") ? "stickers" : "other";
		collectedSizeByTypes[category] += contentSize;
		totalSize += contentSize;
	}).finally(() => {
		storage.forget();
	});
	return {
		totalSize,
		collectedSizeByTypes
	};
}
function getZeroedCollectedCachedFilesSizes() {
	return {
		totalSize: 0,
		collectedSizeByTypes: {
			images: 0,
			videos: 0,
			stickers: 0,
			other: 0
		}
	};
}
async function collectCachedVideoStreamChunksSize() {
	let totalSize = 0;
	for (const storageName of cachedVideoChunksStorageNames) {
		const storage = new CacheStorageController(storageName);
		await storage.minimalBlockingIterateResponses(({ response }) => {
			const contentSize = getContentSizeFromHeaders(response.headers);
			totalSize += contentSize;
		}).finally(() => {
			storage.forget();
		});
	}
	return totalSize;
}
function getContentSizeFromHeaders(headers) {
	const contentSize = parseInt(headers.get(HTTPHeaderNames.contentLength) || "0");
	if (!contentSize) return 0;
	return contentSize;
}
var SizeWithFallback = (props) => createComponent(Switch, { get children() {
	return [
		createComponent(Match, {
			get when() {
				return props.resource.loading;
			},
			get children() {
				return createComponent(I18nTsx, { key: "Loading" });
			}
		}),
		createComponent(Match, {
			get when() {
				return props.resource.state === "ready";
			},
			get children() {
				return formatBytes(props.value, decimalsForFormatBytes);
			}
		}),
		createComponent(Match, {
			when: true,
			get children() {
				return createComponent(I18nTsx, { key: "StorageQuota.FailedToCalculate" });
			}
		})
	];
} });
var makeTimeOption = (value, duration, type) => ({
	value,
	label: () => wrapFormattedDuration([{
		duration,
		type
	}])
});
var cacheTimeOptions = [
	makeTimeOption(oneDayInSeconds, 1, DurationType.Days),
	makeTimeOption(oneDayInSeconds * 2, 2, DurationType.Days),
	makeTimeOption(oneDayInSeconds * 3, 3, DurationType.Days),
	makeTimeOption(oneDayInSeconds * 4, 4, DurationType.Days),
	makeTimeOption(oneDayInSeconds * 5, 5, DurationType.Days),
	makeTimeOption(oneDayInSeconds * 6, 6, DurationType.Days),
	makeTimeOption(oneWeekInSeconds, 1, DurationType.Weeks),
	makeTimeOption(oneWeekInSeconds * 2, 2, DurationType.Weeks),
	makeTimeOption(oneWeekInSeconds * 3, 3, DurationType.Weeks),
	makeTimeOption(oneMonthInSeconds, 1, DurationType.Months),
	makeTimeOption(oneMonthInSeconds * 2, 2, DurationType.Months),
	makeTimeOption(oneMonthInSeconds * 3, 3, DurationType.Months),
	makeTimeOption(oneMonthInSeconds * 4, 4, DurationType.Months),
	makeTimeOption(oneMonthInSeconds * 5, 5, DurationType.Months),
	makeTimeOption(oneMonthInSeconds * 6, 6, DurationType.Months),
	makeTimeOption(oneYearInSeconds, 1, DurationType.Years)
];
var makeSizeOption = (value) => ({
	value,
	label: () => formatBytes(value, decimalsForFormatBytes)
});
var mb = 1048576;
var gb = mb * 1024;
var getCacheSizeOptions = (autoLabel) => [
	...[],
	makeSizeOption(100 * mb),
	makeSizeOption(200 * mb),
	makeSizeOption(300 * mb),
	makeSizeOption(400 * mb),
	makeSizeOption(500 * mb),
	makeSizeOption(600 * mb),
	makeSizeOption(700 * mb),
	makeSizeOption(800 * mb),
	makeSizeOption(900 * mb),
	makeSizeOption(1 * gb),
	makeSizeOption(2 * gb),
	makeSizeOption(3 * gb),
	makeSizeOption(4 * gb),
	makeSizeOption(5 * gb),
	makeSizeOption(6 * gb),
	makeSizeOption(7 * gb),
	makeSizeOption(8 * gb),
	makeSizeOption(9 * gb),
	makeSizeOption(10 * gb),
	{
		value: 0,
		label: autoLabel
	}
];
var getInitialCacheTimeIdx = (cacheTTL) => {
	const value = cacheTTL || 0;
	let foundIdx = 0;
	for (let i = 1; i < cacheTimeOptions.length; i++) if (cacheTimeOptions[i].value <= value) foundIdx = i;
	return foundIdx;
};
var getInitialCacheSizeIdx = (cacheSize, options) => {
	const value = cacheSize || 0;
	if (value === 0) return options.length - 1;
	let foundIdx = 0;
	for (let i = 1; i < options.length - 1; i++) if (options[i].value <= value) foundIdx = i;
	return foundIdx;
};
var StorageQuota = (props) => {
	const { Row, confirmationPopup, i18n, useAppSettings, apiManagerProxy, rootScope } = useHotReloadGuard();
	const cacheSizeOptions = getCacheSizeOptions(() => i18n("StorageQuota.CacheSizeLimitAuto"));
	const [appSettings, setAppSettings] = useAppSettings();
	const [cachedFilesSizes, cachedFilesSizesActions] = createResource(collectCachedFilesSizes);
	const [cachedVideoStreamChunksSize, cachedVideoStreamChunksSizeActions] = createResource(collectCachedVideoStreamChunksSize);
	const [cacheTimeIdx, setCacheTimeIdx] = createSignal(getInitialCacheTimeIdx(appSettings.cacheTTL));
	const [cacheSizeIdx, setCacheSizeIdx] = createSignal(getInitialCacheSizeIdx(appSettings.cacheSize, cacheSizeOptions));
	const getFinalCacheTTL = () => {
		const option = cacheTimeOptions[cacheTimeIdx()] || cacheTimeOptions[0];
		if (option.value === appSettings.cacheTTL) return;
		return option.value;
	};
	const getFinalCacheSize = () => {
		const option = cacheSizeOptions[cacheSizeIdx()] || lastItem(cacheSizeOptions);
		if (option.value === appSettings.cacheSize) return;
		return option.value;
	};
	props.controlsRef({ save: async () => {
		const cacheTTL = getFinalCacheTTL();
		const cacheSize = getFinalCacheSize();
		await Promise.all([cacheTTL !== void 0 ? setAppSettings("cacheTTL", cacheTTL) : Promise.resolve(), cacheSize !== void 0 ? setAppSettings("cacheSize", cacheSize) : Promise.resolve()]);
	} });
	const btnClass = `${storageQuota_module_default.Button} primary btn`;
	const getConfirmation = async (args) => {
		try {
			await confirmationPopup({
				...args,
				button: { text: i18n("StorageQuota.Clear") }
			});
			return true;
		} catch {
			return false;
		}
	};
	const onClearCachedFiles = wrapAsyncClickHandler(async () => {
		const formattedSize = tryFormatBytes(cachedFilesSizes.state === "ready" ? cachedFilesSizes()?.totalSize : null);
		if (!await getConfirmation(getClearCachedFilesArgs(formattedSize))) return;
		cachedFilesSizesActions.mutate(getZeroedCollectedCachedFilesSizes());
		await apiManagerProxy.clearCacheStoragesByNames([cachedFilesStorageName]);
		const newValue = await collectCachedFilesSizes();
		cachedFilesSizesActions.mutate(newValue);
	});
	const onClearCachedVideoStreamChunks = wrapAsyncClickHandler(async () => {
		const formattedSize = tryFormatBytes(cachedVideoStreamChunksSize.state === "ready" ? cachedVideoStreamChunksSize() : null);
		if (!await getConfirmation(getClearStreamChunksArgs(formattedSize))) return;
		cachedVideoStreamChunksSizeActions.mutate(0);
		await apiManagerProxy.clearCacheStoragesByNames(cachedVideoChunksStorageNames);
		const newValue = await collectCachedVideoStreamChunksSize();
		cachedVideoStreamChunksSizeActions.mutate(newValue);
	});
	const onClearAllCachedData = wrapAsyncClickHandler(async () => {
		const managers = bindManagersToSession(rootScope.managers);
		if (!await getConfirmation(getClearAllArgs())) return;
		cachedFilesSizesActions.mutate(getZeroedCollectedCachedFilesSizes());
		cachedVideoStreamChunksSizeActions.mutate(0);
		await Promise.all([apiManagerProxy.clearCacheStoragesByNames(watchedCachedStorageNames), managers.appWidgetsManager.clearWidgetStorage()]);
		const { newCachedFilesSizes, newCachedVideoStreamChunksSize } = await namedPromises({
			newCachedFilesSizes: collectCachedFilesSizes(),
			newCachedVideoStreamChunksSize: collectCachedVideoStreamChunksSize()
		});
		cachedFilesSizesActions.mutate(newCachedFilesSizes);
		cachedVideoStreamChunksSizeActions.mutate(newCachedVideoStreamChunksSize);
	});
	return createComponent(Section, {
		name: "StorageQuota.Title",
		caption: "StorageQuota.Caption",
		get children() {
			return [
				createComponent(Row, { get children() {
					return [
						createComponent(Row.Title, { get children() {
							return createComponent(I18nTsx, { key: "StorageQuota.CachedFiles" });
						} }),
						createComponent(Row.Subtitle, { get children() {
							return createComponent(SizeWithFallback, {
								resource: cachedFilesSizes,
								get value() {
									return cachedFilesSizes()?.totalSize;
								}
							});
						} }),
						createComponent(Row.RightContent, { get children() {
							var _el$ = _tmpl$();
							insert(_el$, createComponent(Button$1, {
								"class": btnClass,
								onClick: onClearCachedFiles,
								get children() {
									return createComponent(I18nTsx, { key: "StorageQuota.Clear" });
								}
							}));
							return _el$;
						} })
					];
				} }),
				createComponent(Row, { get children() {
					return [
						createComponent(Row.Icon, { icon: "photo_filled" }),
						createComponent(Row.Title, { get children() {
							return createComponent(I18nTsx, { key: "StorageQuota.Images" });
						} }),
						createComponent(Row.Subtitle, { get children() {
							return createComponent(SizeWithFallback, {
								resource: cachedFilesSizes,
								get value() {
									return cachedFilesSizes()?.collectedSizeByTypes["images"];
								}
							});
						} })
					];
				} }),
				createComponent(Row, { get children() {
					return [
						createComponent(Row.Icon, { icon: "play_filled" }),
						createComponent(Row.Title, { get children() {
							return createComponent(I18nTsx, { key: "StorageQuota.VideoFiles" });
						} }),
						createComponent(Row.Subtitle, { get children() {
							return createComponent(SizeWithFallback, {
								resource: cachedFilesSizes,
								get value() {
									return cachedFilesSizes()?.collectedSizeByTypes["videos"];
								}
							});
						} })
					];
				} }),
				createComponent(Row, { get children() {
					return [
						createComponent(Row.Icon, { icon: "sticker_filled" }),
						createComponent(Row.Title, { get children() {
							return createComponent(I18nTsx, { key: "StorageQuota.StickersEmoji" });
						} }),
						createComponent(Row.Subtitle, { get children() {
							return createComponent(SizeWithFallback, {
								resource: cachedFilesSizes,
								get value() {
									return cachedFilesSizes()?.collectedSizeByTypes["stickers"];
								}
							});
						} })
					];
				} }),
				createComponent(Row, { get children() {
					return [
						createComponent(Row.Icon, { icon: "limit_file_filled" }),
						createComponent(Row.Title, { get children() {
							return createComponent(I18nTsx, { key: "StorageQuota.Other" });
						} }),
						createComponent(Row.Subtitle, { get children() {
							return createComponent(SizeWithFallback, {
								resource: cachedFilesSizes,
								get value() {
									return cachedFilesSizes()?.collectedSizeByTypes["other"];
								}
							});
						} })
					];
				} }),
				createComponent(Space, { amount: "1rem" }),
				createComponent(Row, { get children() {
					return [
						createComponent(Row.Title, { get children() {
							return createComponent(I18nTsx, { key: "StorageQuota.CachedStreamChunks" });
						} }),
						createComponent(Row.Subtitle, { get children() {
							return createComponent(SizeWithFallback, {
								resource: cachedVideoStreamChunksSize,
								get value() {
									return cachedVideoStreamChunksSize();
								}
							});
						} }),
						createComponent(Row.RightContent, { get children() {
							return createComponent(Button$1, {
								"class": btnClass,
								onClick: onClearCachedVideoStreamChunks,
								get children() {
									return createComponent(I18nTsx, { key: "StorageQuota.Clear" });
								}
							});
						} })
					];
				} }),
				createComponent(Space, { amount: "1rem" }),
				createComponent(RangeSettingSelector, {
					minValue: 0,
					get maxValue() {
						return cacheTimeOptions.length - 1;
					},
					step: 1,
					get textLeft() {
						return createComponent(I18nTsx, { key: "StorageQuota.ClearCacheOlderThan" });
					},
					textRight: (idx) => cacheTimeOptions[idx]?.label(),
					get value() {
						return cacheTimeIdx();
					},
					onChange: setCacheTimeIdx
				}),
				createComponent(Space, { amount: "0.5rem" }),
				createComponent(RangeSettingSelector, {
					minValue: 0,
					get maxValue() {
						return cacheSizeOptions.length - 1;
					},
					step: 1,
					get textLeft() {
						return createComponent(I18nTsx, { key: "StorageQuota.CacheSizeLimit" });
					},
					textRight: (idx) => cacheSizeOptions[idx]?.label(),
					get value() {
						return cacheSizeIdx();
					},
					onChange: setCacheSizeIdx
				}),
				createComponent(Space, { amount: "1rem" }),
				createComponent(Button$1, {
					primaryTransparent: true,
					onClick: onClearAllCachedData,
					icon: "delete",
					get children() {
						return createComponent(I18nTsx, { key: "StorageQuota.ClearAll" });
					}
				})
			];
		}
	});
};
//#endregion
//#region src/components/sidebarLeft/tabs/dataAndStorage/index.tsx
var AUTO_DOWNLOAD_FOR_KEYS = {
	contacts: "AutoDownloadContacts",
	private: "AutoDownloadPm",
	groups: "AutoDownloadGroups",
	channels: "AutoDownloadChannels"
};
function getAutoDownloadSubtitle(settings, sizeMax) {
	let key;
	const args = [];
	const peerKeys = Object.keys(settings);
	const enabledKeys = peerKeys.map((key) => settings[key] ? AUTO_DOWNLOAD_FOR_KEYS[key] : void 0).filter(Boolean);
	if (!enabledKeys.length || sizeMax === 0) key = "AutoDownloadOff";
	else {
		const isAll = enabledKeys.length === peerKeys.length;
		if (sizeMax !== void 0) {
			key = isAll ? "AutoDownloadUpToOnAllChats" : "AutoDownloadOnUpToFor";
			args.push(formatBytes(sizeMax));
		} else key = isAll ? "AutoDownloadOnAllChats" : "AutoDownloadOnFor";
		if (!isAll) {
			const fragment = document.createElement("span");
			fragment.append(...join(enabledKeys.map((key) => i18n(key)), true, false));
			args.push(fragment);
		}
	}
	return i18n(key, args);
}
var DataAndStorage = () => {
	const [tab] = useSuperTab();
	const [appSettings, setAppSettings] = useAppSettings();
	let controls;
	const autoEnabled = () => !appSettings.autoDownloadNew.pFlags.disabled;
	const resetDisabled = () => deepEqual(appSettings.autoDownload, SETTINGS_INIT.autoDownload) && deepEqual(appSettings.autoDownloadNew, SETTINGS_INIT.autoDownloadNew);
	const openTab = (tabConstructor) => {
		tab.slider.createTab(tabConstructor).open();
	};
	const onAutoEnabledChange = (enabled) => {
		setAppSettings("autoDownloadNew", "pFlags", "disabled", enabled ? void 0 : true);
	};
	const onReset = () => confirmationPopup({
		titleLangKey: "ResetAutomaticMediaDownloadAlertTitle",
		descriptionLangKey: "ResetAutomaticMediaDownloadAlert",
		button: { langKey: "Reset" }
	}).then(() => {
		setAppSettings("autoDownload", copy(SETTINGS_INIT.autoDownload));
		setAppSettings("autoDownloadNew", copy(SETTINGS_INIT.autoDownloadNew));
	});
	onMount(() => {
		tab.eventListener.addEventListener("destroy", () => {
			controls?.save();
		});
	});
	return [createComponent(Section, {
		name: "AutomaticMediaDownload",
		caption: "AutoDownloadAudioInfo",
		get children() {
			return [
				createComponent(Row, { get children() {
					return [createComponent(Row.CheckboxFieldToggle, { get children() {
						return createComponent(CheckboxFieldTsx, {
							get checked() {
								return autoEnabled();
							},
							toggle: true,
							onChange: onAutoEnabledChange
						});
					} }), createComponent(Row.Title, { get children() {
						return i18n("AutoDownloadMedia");
					} })];
				} }),
				createComponent(Row, {
					get disabled() {
						return !autoEnabled();
					},
					clickable: () => openTab(hotReloadGuard.tabs.AppAutoDownloadPhotoTab),
					get children() {
						return [createComponent(Row.Title, { get children() {
							return i18n("AutoDownloadPhotos");
						} }), createComponent(Row.Subtitle, { get children() {
							return getAutoDownloadSubtitle(appSettings.autoDownload.photo);
						} })];
					}
				}),
				createComponent(Row, {
					get disabled() {
						return !autoEnabled();
					},
					clickable: () => openTab(hotReloadGuard.tabs.AppAutoDownloadVideoTab),
					get children() {
						return [createComponent(Row.Title, { get children() {
							return i18n("AutoDownloadVideos");
						} }), createComponent(Row.Subtitle, { get children() {
							return getAutoDownloadSubtitle(appSettings.autoDownload.video);
						} })];
					}
				}),
				createComponent(Row, {
					get disabled() {
						return !autoEnabled();
					},
					clickable: () => openTab(hotReloadGuard.tabs.AppAutoDownloadFileTab),
					get children() {
						return [createComponent(Row.Title, { get children() {
							return i18n("AutoDownloadFiles");
						} }), createComponent(Row.Subtitle, { get children() {
							return getAutoDownloadSubtitle(appSettings.autoDownload.file, appSettings.autoDownloadNew.file_size_max);
						} })];
					}
				}),
				createComponent(Button$1, {
					get disabled() {
						return resetDisabled();
					},
					icon: "delete",
					primaryTransparent: true,
					text: "ResetAutomaticMediaDownload",
					onClick: onReset
				})
			];
		}
	}), createComponent(StorageQuota, { controlsRef: (localControls) => controls = localControls })];
};
//#endregion
export { DataAndStorage as default };
