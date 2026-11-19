//# allFunctionsCalledOnLoad
import { n as rootScope } from "./rootScope-CZS0lmz8.js";
import { a as i18n } from "./langPack-BmdJGr44.js";
import { N as onMount, b as createResource, p as createComponent, s as Show } from "./solid-9Vxm0VIz.js";
import { t as joinDeepPath } from "./setDeepProperty-IYhQYgHt.js";
import { n as hotReloadGuard } from "./hotReloadGuardProvider-CHEsZRuG.js";
import { o as useAppSettings } from "./liteMode-DeLStZfQ.js";
import { M as LazyLoadQueue } from "./renderer-L80wjxct.js";
import { t as IconTsx } from "./iconTsx-B4lOk4A6.js";
import { t as assumeType } from "./assumeType-CmXHXz9E.js";
import { t as numberThousandSplitter } from "./numberThousandSplitter-CGiPNwwW.js";
import { c as createContextMenu, i as Row, s as CheckboxFieldTsx } from "./confirmationPopup-Bz6mK0o-.js";
import { n as wrapEmojiText } from "./wrapEmojiText-DT39R5Tj.js";
import { i as usePromiseCollector } from "./mediaHeader-CnpQNwOl.js";
import { a as Section, s as appendSectionContent } from "./emailVerification-C8QYZSyu.js";
import { n as unwrapSolidElement, t as mountSolidComponent } from "./wrapSolidComponent-BASCjNJG.js";
import { n as useSuperTab } from "./superTabProvider-LtveyH7W.js";
import { m as showStickersPopup, u as wrapStickerSetThumb } from "./emoticonsDropdown-Cb_qGCUN.js";
import { r as getStickerSetInputById } from "./pickKeys-Ckq7_h-r.js";
import { t as positionElementByIndex } from "./positionElementByIndex-D7kiTyx2.js";
import { n as Sortable } from "./sortable-DnDolsys.js";
import { t as ReactionStickerPreview } from "./reactionStickerPreview-1AWURcyU.js";
//#region src/components/sidebarLeft/tabs/stickersAndEmoji.tsx
var StickersAndEmoji = () => {
	const [tab] = useSuperTab();
	const [appSettings, setAppSettings] = useAppSettings();
	const promiseCollector = usePromiseCollector();
	const [quickReactionDoc, { refetch: refetchQuickReaction }] = createResource(async () => {
		const reaction = await tab.managers.appReactionsManager.getQuickReaction();
		return reaction._ === "availableReaction" ? reaction.static_icon : tab.managers.appEmojiManager.getCustomEmojiDocument(reaction.document_id);
	});
	const [archivedCount, { refetch: refetchArchivedCount }] = createResource(() => {
		return tab.managers.appStickersManager.getArchivedStickers(0, 0).then(({ count }) => count, () => 0);
	});
	onMount(() => {
		tab.container.classList.add("stickers-emoji-container");
		const allStickersPromise = tab.managers.appStickersManager.getAllStickers();
		const promises = [];
		{
			let suggestStickersRow;
			const map = {
				all: "SuggestStickersAll",
				installed: "SuggestStickersInstalled",
				none: "SuggestStickersNone"
			};
			const setStickersSuggest = (value) => {
				if (appSettings.stickers.suggest === value) return;
				setAppSettings("stickers", "suggest", value);
			};
			const section = unwrapSolidElement(createComponent(Section, {
				caption: "LoopAnimatedStickersInfo",
				get children() {
					return [
						createComponent(Show, {
							get when() {
								return archivedCount();
							},
							get children() {
								return createComponent(Row, {
									clickable: () => tab.slider.createTab(hotReloadGuard.tabs.AppArchivedStickersTab).open(),
									get children() {
										return [createComponent(Row.Icon, { icon: "archive" }), createComponent(Row.Title, {
											get titleRight() {
												return numberThousandSplitter(archivedCount());
											},
											titleRightSecondary: true,
											get children() {
												return i18n("ArchivedStickers");
											}
										})];
									}
								});
							}
						}),
						createComponent(Row, {
							havePadding: true,
							clickable: () => tab.slider.createTab(hotReloadGuard.tabs.AppQuickReactionTab).open(),
							get children() {
								return [createComponent(Row.Title, { get children() {
									return i18n("DoubleTapSetting");
								} }), createComponent(ReactionStickerPreview, { get sticker() {
									return quickReactionDoc();
								} })];
							}
						}),
						createComponent(Row, {
							ref(r$) {
								var _ref$ = suggestStickersRow;
								typeof _ref$ === "function" ? _ref$(r$) : suggestStickersRow = r$;
							},
							clickable: true,
							get children() {
								return [createComponent(Row.Icon, { icon: "lamp_filled" }), createComponent(Row.Title, {
									get titleRight() {
										return i18n(map[appSettings.stickers.suggest]);
									},
									titleRightSecondary: true,
									get children() {
										return i18n("Stickers.SuggestStickers");
									}
								})];
							}
						}),
						createComponent(Row, { get children() {
							return [
								createComponent(Row.Icon, { icon: "flip" }),
								createComponent(Row.CheckboxFieldToggle, { get children() {
									return createComponent(CheckboxFieldTsx, {
										get stateKey() {
											return joinDeepPath("settings", "stickers", "loop");
										},
										toggle: true
									});
								} }),
								createComponent(Row.Title, { get children() {
									return i18n("InstalledStickers.LoopAnimated");
								} })
							];
						} })
					];
				}
			}));
			createContextMenu({
				buttons: [
					{
						icon: "stickers_face",
						text: "SuggestStickersAll",
						onClick: setStickersSuggest.bind(null, "all")
					},
					{
						icon: "newprivate",
						text: "SuggestStickersInstalled",
						onClick: setStickersSuggest.bind(null, "installed")
					},
					{
						icon: "stop",
						text: "SuggestStickersNone",
						onClick: setStickersSuggest.bind(null, "none")
					}
				],
				listenTo: suggestStickersRow,
				middleware: tab.middlewareHelper.get(),
				listenForClick: true
			});
			tab.listenerSetter.add(rootScope)("quick_reaction", () => {
				refetchQuickReaction();
			});
			tab.scrollable.append(section);
		}
		tab.scrollable.append(unwrapSolidElement(createComponent(Section, {
			name: "Emoji",
			get children() {
				return [createComponent(Row, { get children() {
					return [
						createComponent(Row.Icon, { icon: "lamp_filled" }),
						createComponent(Row.CheckboxFieldToggle, { get children() {
							return createComponent(CheckboxFieldTsx, {
								get stateKey() {
									return joinDeepPath("settings", "emoji", "suggest");
								},
								toggle: true
							});
						} }),
						createComponent(Row.Title, { get children() {
							return i18n("GeneralSettings.EmojiPrediction");
						} })
					];
				} }), createComponent(Row, { get children() {
					return [
						createComponent(Row.Icon, { icon: "emoji_filled" }),
						createComponent(Row.CheckboxFieldToggle, { get children() {
							return createComponent(CheckboxFieldTsx, {
								get stateKey() {
									return joinDeepPath("settings", "emoji", "big");
								},
								toggle: true
							});
						} }),
						createComponent(Row.Title, { get children() {
							return i18n("GeneralSettings.BigEmoji");
						} })
					];
				} })];
			}
		})));
		tab.scrollable.append(unwrapSolidElement(createComponent(Section, {
			name: "DynamicPackOrder",
			caption: "DynamicPackOrderInfo",
			get children() {
				return createComponent(Row, { get children() {
					return [
						createComponent(Row.Icon, { icon: "replace_squares" }),
						createComponent(Row.CheckboxFieldToggle, { get children() {
							return createComponent(CheckboxFieldTsx, {
								get stateKey() {
									return joinDeepPath("settings", "stickers", "dynamicPackOrder");
								},
								toggle: true
							});
						} }),
						createComponent(Row.Title, { get children() {
							return i18n("DynamicPackOrder");
						} })
					];
				} });
			}
		})));
		{
			const section = unwrapSolidElement(createComponent(Section, {
				name: "Telegram.InstalledStickerPacksController",
				caption: "StickersBotInfo"
			}));
			const stickerSets = {};
			const stickersContent = appendSectionContent(section);
			const lazyLoadQueue = new LazyLoadQueue();
			const renderStickerSet = (stickerSet, method = "append") => {
				const media = document.createElement("div");
				const mounted = mountSolidComponent((middleware) => {
					wrapStickerSetThumb({
						set: stickerSet,
						container: media,
						group: "GENERAL-SETTINGS",
						lazyLoadQueue,
						width: 36,
						height: 36,
						autoplay: true,
						middleware
					});
					return createComponent(Row, {
						"class": "row-sortable",
						havePadding: true,
						clickable: () => showStickersPopup(getStickerSetInputById(stickerSet)),
						get children() {
							return [
								createComponent(Row.Title, { get children() {
									return wrapEmojiText(stickerSet.title);
								} }),
								createComponent(Row.Subtitle, { get children() {
									return i18n("Stickers", [stickerSet.count]);
								} }),
								createComponent(Row.Media, { element: media }),
								createComponent(IconTsx, {
									icon: "menu",
									"class": "row-sortable-icon"
								})
							];
						}
					});
				}, tab.middlewareHelper.get());
				const row = mounted.element;
				row.dataset.id = "" + stickerSet.id;
				stickerSets[stickerSet.id] = {
					container: row,
					dispose: mounted.dispose
				};
				stickersContent[method](row);
			};
			const promise = allStickersPromise.then((allStickers) => {
				assumeType(allStickers);
				const promises = allStickers.sets.map((stickerSet) => renderStickerSet(stickerSet));
				return Promise.all(promises);
			});
			promises.push(promise);
			tab.listenerSetter.add(rootScope)("stickers_installed", (set) => {
				if (!stickerSets[set.id]) renderStickerSet(set, "prepend");
				if (archivedCount()) refetchArchivedCount();
			});
			tab.listenerSetter.add(rootScope)("stickers_deleted", (set) => {
				if (set.pFlags.archived) refetchArchivedCount();
				const row = stickerSets[set.id];
				if (row) {
					row.dispose();
					row.container.remove();
					delete stickerSets[set.id];
				}
			});
			tab.listenerSetter.add(rootScope)("stickers_order", ({ type, order }) => {
				if (type !== "stickers") return;
				order.forEach((id, idx) => {
					const row = stickerSets[id];
					if (!row) return;
					positionElementByIndex(row.container, stickersContent, idx);
				});
			});
			tab.listenerSetter.add(rootScope)("stickers_top", (id) => {
				const row = stickerSets[id];
				if (!row) return;
				positionElementByIndex(row.container, stickersContent, 0);
			});
			new Sortable({
				list: stickersContent,
				middleware: tab.middlewareHelper.get(),
				onSort: (idx, newIdx) => {
					const order = Array.from(stickersContent.children).map((el) => el.dataset.id);
					tab.managers.appStickersManager.reorderStickerSets(order);
				}
			});
			tab.scrollable.append(section);
		}
		promiseCollector.collect(Promise.all(promises));
	});
	return null;
};
//#endregion
export { StickersAndEmoji as default };
