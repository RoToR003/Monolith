//# allFunctionsCalledOnLoad
import { t as themeController } from "./themeController-2cytOOn0.js";
import { t as noop } from "./noop-H9NNBLfX.js";
import { W as copy } from "./objectUrlUtils-5x08MNuO.js";
import { n as rootScope } from "./rootScope-CZS0lmz8.js";
import { a as i18n, u as langPack_default } from "./langPack-BmdJGr44.js";
import { A as mergeProps, C as createSignal, M as onCleanup, _ as createMemo, b as createResource, p as createComponent, s as Show, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { a as isSessionLeaving, i as getManagersSession } from "./getCurrentAccount-D0KQFbZ6.js";
import { n as bindManagersToSession } from "./bindManagersToAccount-BL82O9H9.js";
import { o as unwrap } from "./store-PwRn5fa3.js";
import { s as useAppConfig } from "./contentSettings-DMhHR-0w.js";
import { c as insert, g as template, o as className, u as memo } from "./web-BPyQozky.js";
import { n as hotReloadGuard } from "./hotReloadGuardProvider-CHEsZRuG.js";
import { t as classNames } from "./classNames-DxGDjmvw.js";
import { t as I18nTsx } from "./i18n-CGMFiAW0.js";
import { i as createPopup, n as PopupElement } from "./indexTsx-v9mB9bAq.js";
import { t as throttle } from "./throttle-DxyCT6GJ.js";
import { m as ChatBackgroundStore, o as isSameWallPaper, r as getChatBackgroundFromFullPeer } from "./index-B7axFZql.js";
import { r as GrowHeightReveal } from "./animations-DCmLIda3.js";
import { Ft as useFullPeer, Gt as getPeerTitle, i as Row, s as CheckboxFieldTsx } from "./confirmationPopup-Bz6mK0o-.js";
import { yt as setBooleanFlag } from "./getChatMigratedTo-ChhMNXuu.js";
import { Nt as BubbleLayout } from "./appDialogsManager-CXguiKc3.js";
import { C as ButtonIconTsx } from "./openEditors-7FmA7q_V.js";
import { a as Section } from "./emailVerification-C8QYZSyu.js";
import { r as toastNew } from "./toast-B6VD5M7R.js";
import { t as PeerTitleTsx } from "./peerTitleTsx-DcpEYRoE.js";
import { t as FakeBubbles } from "./fakeBubbles-D-6pHQXV.js";
import { t as service_module_default } from "./service.module-X48sUWGP.js";
import { t as RangeSettingSelector } from "./rangeSettingSelector-D5UJ_dJM.js";
var chatWallPaper_module_default = {
	popup: "_popup_2krcq_1",
	grid: "_grid_2krcq_6"
};
var chatWallPaperPreview_module_default = {
	forWhom: "_forWhom_48awy_1",
	night: "_night_48awy_5",
	preview: "_preview_48awy_9",
	messages: "_messages_48awy_16",
	service: "_service_48awy_39"
};
//#endregion
//#region src/components/popups/chatWallPaperPreview.tsx
var _tmpl$ = /*#__PURE__*/ template(`<div>`);
var DEFAULT_DIMMING = 50;
/**
* Who the wallpaper is for: this side, or both (Premium) — tdesktop's choice, asked in a popup of the app's
* own: a close button in its header and the two choices as its footer's buttons.
*/
function ForWhom(props) {
	let chosen = false;
	const choose = (choice) => {
		chosen = true;
		props.onChoice(choice);
	};
	return createComponent(PopupElement, {
		get ["class"]() {
			return chatWallPaperPreview_module_default.forWhom;
		},
		get managers() {
			return props.managers;
		},
		closable: true,
		onClose: () => chosen || props.onChoice(),
		get children() {
			return [createComponent(PopupElement.Header, { get children() {
				return [createComponent(PopupElement.CloseButton, {}), createComponent(PopupElement.Title, { title: "ApplyWallpaperForThisChat" })];
			} }), createComponent(PopupElement.Footer, { get children() {
				return [createComponent(PopupElement.FooterButton, {
					langKey: "ApplyWallpaperForMe",
					callback: () => choose("me")
				}), createComponent(PopupElement.FooterButton, {
					langKey: "ApplyWallpaperForMeAndPeer",
					get langArgs() {
						return [props.name];
					},
					get iconRight() {
						return rootScope.premium ? void 0 : "premium_lock";
					},
					callback: () => {
						if (!rootScope.premium) {
							hotReloadGuard.showPremiumPopup({ feature: "wallpapers" });
							return false;
						}
						choose("both");
					}
				})];
			} })];
		}
	});
}
async function chooseChatWallPaperForWhom(peerId, managers) {
	const session = getManagersSession(managers);
	const name = await getPeerTitle({
		peerId,
		plainText: true,
		onlyFirstName: true
	});
	if (isSessionLeaving(session)) return;
	return new Promise((resolve) => {
		createPopup(() => createComponent(ForWhom, {
			name,
			managers,
			onChoice: resolve
		}));
	});
}
/** A picked image that is not applied: its prepared upload goes, and what the background kept of it. */
function discardPickedWallPaper(wallPaper, managers) {
	const { slug } = wallPaper;
	managers.appDocsManager.discardWallPaperUpload(wallPaper.id).catch(noop);
	ChatBackgroundStore.deleteBackgroundUrlFromCache({ slug });
	ChatBackgroundStore.deleteBackgroundUrlFromCache({
		slug,
		blur: true
	});
}
/**
* A wallpaper shown on the chat it would go to, with the chat's theme and fake messages, before it
* is applied — tdesktop's BackgroundPreviewBox for one chat.
*/
function WallPaperPreview(options) {
	const { peerId, fromMessageId, upload, managers } = options;
	const wallPaper = copy(unwrap(options.wallPaper));
	const slug = wallPaper.slug;
	const settings = wallPaper.settings || {
		_: "wallPaperSettings",
		pFlags: {}
	};
	const isImage = wallPaper._ === "wallPaper" && !wallPaper.pFlags.pattern;
	const fullPeer = useFullPeer(peerId);
	const [starsAmount] = createResource(() => {
		return fromMessageId || peerId === rootScope.myId ? 0 : managers.appPeersManager.getStarsAmount(peerId).catch(() => 0);
	});
	const [isNight, setIsNight] = createSignal(themeController.isNight());
	const [blur, setBlur] = createSignal(!!settings.pFlags.blur);
	const [drawnBlur, setDrawnBlur] = createSignal(blur());
	const [dimming, setDimming] = createSignal(settings.intensity ?? DEFAULT_DIMMING);
	const [drawnDimming, setDrawnDimming] = createSignal(dimming());
	const drawDimming = throttle(setDrawnDimming, 100);
	const theme = createMemo(() => {
		const current = themeController.getTheme();
		const appTheme = themeController.isNightThemeName(current.name) === isNight() ? current : themeController.getTheme(isNight() ? "night" : "day");
		const chatTheme = getChatBackgroundFromFullPeer(fullPeer()).theme;
		if (!chatTheme) return appTheme;
		return appTheme === current ? chatTheme : {
			...chatTheme,
			name: appTheme.name
		};
	});
	const getSettings = (dimmingValue, blurValue) => {
		const adjustedSettings = {
			...settings,
			pFlags: { ...settings.pFlags }
		};
		if (isImage) {
			setBooleanFlag(adjustedSettings.pFlags, "blur", blurValue);
			adjustedSettings.intensity = dimmingValue;
		}
		return adjustedSettings;
	};
	const drawn = createMemo(() => ({
		...wallPaper,
		settings: getSettings(drawnDimming(), drawnBlur())
	}));
	let blurredUpload;
	let blurChange = 0;
	const onBlurChange = async (value) => {
		setBlur(value);
		const change = ++blurChange;
		if (value && upload) await (blurredUpload ?? (blurredUpload = Promise.resolve(ChatBackgroundStore.getBackground({ slug })).then(async (url) => {
			const blurred = await ChatBackgroundStore.blurWallPaperImage(url);
			if (!disposed) ChatBackgroundStore.setBackgroundUrlToCache({
				slug,
				url: blurred,
				blur: true
			});
		})));
		if (change === blurChange) setDrawnBlur(value);
	};
	let closed = false, disposed = false;
	onCleanup(() => {
		disposed = true;
		if (upload) discardPickedWallPaper(wallPaper, managers);
	});
	const apply = async () => {
		const paper = {
			...wallPaper,
			settings: getSettings(dimming(), blur())
		};
		const current = unwrap(fullPeer()?.wallpaper);
		if (!upload && current && isSameWallPaper(current, paper)) {
			options.onApplied?.();
			return;
		}
		let forBoth = false;
		if (!fromMessageId && !useAppConfig().premium_purchase_blocked && peerId !== rootScope.myId) {
			const choice = await chooseChatWallPaperForWhom(peerId, managers);
			if (!choice || closed) return false;
			forBoth = choice === "both";
		}
		let uploaded;
		if (upload) {
			try {
				uploaded = await managers.appDocsManager.uploadWallPaper(wallPaper.id, {
					forChat: true,
					settings: paper.settings
				});
			} catch (err) {
				console.error("chat wallpaper: cannot upload", err);
				if (!closed) toastNew({ langPackKey: "Error.AnError" });
				return;
			}
			if (closed) return;
		}
		applyOnClose = () => {
			managers.appThemesManager.setChatWallPaper(peerId, {
				wallPaper: uploaded ? {
					...uploaded,
					settings: paper.settings
				} : paper,
				forBoth,
				fromMessageId,
				justUploaded: !!uploaded
			}).catch((err) => {
				console.error("chat wallpaper: cannot apply", err);
				toastNew({ langPackKey: "Error.AnError" });
			});
		};
		options.onApplied?.();
	};
	let applyOnClose;
	return createComponent(PopupElement, {
		get ["class"]() {
			return chatWallPaper_module_default.popup;
		},
		managers,
		closable: true,
		onClose: () => closed = true,
		onCloseAfterTimeout: () => applyOnClose?.(),
		get children() {
			return [
				createComponent(PopupElement.Header, { get children() {
					return [
						createComponent(PopupElement.CloseButton, {}),
						createComponent(PopupElement.Title, { title: "WallpaperPreview" }),
						createComponent(ButtonIconTsx, {
							get ["class"]() {
								return classNames(chatWallPaperPreview_module_default.night, isNight() && "active");
							},
							icon: "darkmode",
							get ["aria-label"]() {
								return langPack_default.format("DarkMode", true);
							},
							get ["aria-pressed"]() {
								return isNight();
							},
							onClick: () => setIsNight(!isNight())
						})
					];
				} }),
				createComponent(PopupElement.Body, { get children() {
					return createComponent(PopupElement.Scrollable, { get children() {
						return [createComponent(FakeBubbles, {
							get ["class"]() {
								return chatWallPaperPreview_module_default.preview;
							},
							get contentClass() {
								return chatWallPaperPreview_module_default.messages;
							},
							get theme() {
								return theme();
							},
							get wallPaper() {
								return drawn();
							},
							get children() {
								return [
									createComponent(Show, {
										get when() {
											return !starsAmount.loading;
										},
										get children() {
											var _el$ = _tmpl$();
											insert(_el$, (() => {
												var _c$ = memo(() => !!(fromMessageId || peerId === rootScope.myId || starsAmount()));
												return () => _c$() ? createComponent(I18nTsx, { key: "Date.Today" }) : createComponent(I18nTsx, {
													key: "ChatBackgroundHint",
													get args() {
														return createComponent(PeerTitleTsx, {
															peerId,
															onlyFirstName: true
														});
													}
												});
											})());
											createRenderEffect(() => className(_el$, classNames(service_module_default.text, chatWallPaperPreview_module_default.service)));
											return _el$;
										}
									}),
									createComponent(BubbleLayout, {
										get text() {
											return langPack_default.format("BackgroundColorSinglePreviewLine3", true);
										},
										tail: true,
										group: "single"
									}),
									createComponent(BubbleLayout, {
										get text() {
											return langPack_default.format("BackgroundPreviewLooksGood", true);
										},
										tail: true,
										out: true,
										group: "single"
									})
								];
							}
						}), createComponent(Show, {
							when: isImage,
							get children() {
								return createComponent(Section, {
									noShadow: true,
									noMarginBottom: true,
									get children() {
										return [createComponent(Row, { get children() {
											return [createComponent(Row.CheckboxFieldToggle, { get children() {
												return createComponent(CheckboxFieldTsx, {
													name: "wallpaper-blur",
													get checked() {
														return blur();
													},
													toggle: true,
													onChange: onBlurChange
												});
											} }), createComponent(Row.Title, { get children() {
												return i18n("BackgroundBlurred");
											} })];
										} }), createComponent(GrowHeightReveal, {
											get when() {
												return isNight();
											},
											appear: false,
											get children() {
												return createComponent(RangeSettingSelector, {
													get textLeft() {
														return i18n("WallpaperDimming");
													},
													textRight: (value) => value + "%",
													step: 1,
													get value() {
														return dimming();
													},
													minValue: 0,
													maxValue: 100,
													onChange: (value) => {
														setDimming(value);
														drawDimming(value);
													}
												});
											}
										})];
									}
								});
							}
						})];
					} });
				} }),
				createComponent(PopupElement.Footer, { get children() {
					return createComponent(PopupElement.FooterButton, {
						langKey: "ApplyWallpaperForThisChat",
						callback: apply,
						preloader: true
					});
				} })
			];
		}
	});
}
function showChatWallPaperPreviewPopup(options) {
	const managers = bindManagersToSession(options.managers || rootScope.managers);
	createPopup(() => createComponent(WallPaperPreview, mergeProps(options, { managers })));
}
//#endregion
export { showChatWallPaperPreviewPopup as default, discardPickedWallPaper, chatWallPaper_module_default as t };
