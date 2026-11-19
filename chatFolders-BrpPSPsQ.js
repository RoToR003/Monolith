//# allFunctionsCalledOnLoad
import { m as REAL_FOLDERS, n as rootScope } from "./rootScope-CZS0lmz8.js";
import { n as indexOfAndSplice } from "./superMessagePort-DhrhiTig.js";
import { a as i18n, s as join } from "./langPack-BmdJGr44.js";
import { C as createSignal, L as untrack, N as onMount, g as createEffect, p as createComponent, s as Show } from "./solid-9Vxm0VIz.js";
import { t as cancelEvent } from "./cancelEvent-Cw8vYZHp.js";
import { t as joinDeepPath } from "./setDeepProperty-IYhQYgHt.js";
import { _ as use, c as insert, g as template, u as memo } from "./web-BPyQozky.js";
import { r as useHotReloadGuard } from "./hotReloadGuard-BUNVkeQ4.js";
import { t as IconTsx } from "./iconTsx-B4lOk4A6.js";
import { t as ListenerSetter } from "./listenerSetter-BER6qAXn.js";
import { t as Button } from "./buttonTsx-Bwphkm9r.js";
import { n as attachClickEvent } from "./clickEvent-COk4YpLP.js";
import { t as whichChild } from "./whichChild-CwhWxnKO.js";
import { y as useHasFoldersSidebar } from "./index-B7axFZql.js";
import { i as Row, s as CheckboxFieldTsx } from "./confirmationPopup-Bz6mK0o-.js";
import { xt as usePremiumFeaturesHidden } from "./appDialogsManager-CXguiKc3.js";
import { t as wrapFolderTitle } from "./folderTitle-Bk4Q-S9l.js";
import { i as usePromiseCollector } from "./mediaHeader-CnpQNwOl.js";
import { a as Section } from "./emailVerification-C8QYZSyu.js";
import { t as mountSolidComponent } from "./wrapSolidComponent-BASCjNJG.js";
import { t as showLimitPopup } from "./limit-j5BxQxwd.js";
import { n as useSuperTab } from "./superTabProvider-LtveyH7W.js";
import { t as positionElementByIndex } from "./positionElementByIndex-D7kiTyx2.js";
import { n as Sortable } from "./sortable-DnDolsys.js";
import { t as RadioFieldTsx } from "./radioFieldTsx-kmtuN4Dv.js";
import { l as FolderTagColorDot, r as getFolderTagColor, s as useFolderTagsShown } from "./folderTags-BLsLsYVO.js";
//#region src/components/sidebarLeft/tabs/chatFolders.tsx
var _tmpl$ = /*#__PURE__*/ template(`<div class=sticker-container>`);
var _tmpl$2 = /*#__PURE__*/ template(`<div class=caption>`);
var _tmpl$3 = /*#__PURE__*/ template(`<div>`);
var _tmpl$4 = /*#__PURE__*/ template(`<form>`);
var ChatFolders = () => {
	const [tab] = useSuperTab();
	const promiseCollector = usePromiseCollector();
	const { AppEditFolderTab, appSidebarLeft, lottieLoader, appImManager, showPremiumPopup, usePremium } = useHotReloadGuard();
	const p = tab.payload;
	const isPremium = usePremium();
	const tagsShown = useFolderTagsShown();
	const filtersRendered = {};
	const suggestedRows = /* @__PURE__ */ new Set();
	let animation;
	let loadAnimationPromise;
	let stickerContainer;
	let list;
	let suggestedContent;
	const [foldersHidden, setFoldersHidden] = createSignal(true);
	const [suggestedHidden, setSuggestedHidden] = createSignal(true);
	const renderFolder = async (dialogFilter, container, row, append) => {
		let filter;
		let description = "";
		const d = [];
		if (dialogFilter._ === "dialogFilterSuggested") {
			filter = dialogFilter.filter;
			description = dialogFilter.description;
		} else {
			filter = dialogFilter;
			const pFlags = filter.pFlags || {};
			if (Object.keys(pFlags).length === 1) {
				let k;
				if (pFlags.contacts) k = "FilterAllContacts";
				else if (pFlags.non_contacts) k = "FilterAllNonContacts";
				else if (pFlags.groups) k = "FilterAllGroups";
				else if (pFlags.broadcasts) k = "FilterAllChannels";
				else if (pFlags.bots) k = "FilterAllBots";
				if (k) d.push(i18n(k));
			}
			if (!d.length) {
				const folder = await tab.managers.dialogsStorage.getFolderDialogs(filter.id);
				let chats = 0, channels = 0, groups = 0;
				await Promise.all(folder.map(async (dialog) => {
					if (await tab.managers.appPeersManager.isAnyGroup(dialog.peerId)) ++groups;
					else if (await tab.managers.appPeersManager.isBroadcast(dialog.peerId)) ++channels;
					else ++chats;
				}));
				if (chats) d.push(i18n("Chats", [chats]));
				if (channels) d.push(i18n("Channels", [channels]));
				if (groups) d.push(i18n("Groups", [groups]));
			}
		}
		if (!row) {
			const isSuggested = dialogFilter._ === "dialogFilterSuggested";
			const title = createSignal(filter.id === 0 && !isSuggested ? i18n("FilterAllChats") : void 0);
			const subtitle = createSignal(description || (d.length ? join(d) : void 0));
			const color = createSignal(isSuggested ? void 0 : getFolderTagColor(filter));
			let buttonRight;
			const mounted = mountSolidComponent(() => createComponent(Row, {
				"class": isSuggested ? void 0 : "row-sortable",
				clickable: true,
				get children() {
					return [
						createComponent(Row.Title, { get children() {
							return title[0]();
						} }),
						createComponent(Show, {
							get when() {
								return subtitle[0]();
							},
							get children() {
								return createComponent(Row.Subtitle, { get children() {
									return subtitle[0]();
								} });
							}
						}),
						createComponent(Show, {
							when: isSuggested,
							get children() {
								return createComponent(Row.RightContent, { get children() {
									return createComponent(Button, {
										ref(r$) {
											var _ref$ = buttonRight;
											typeof _ref$ === "function" ? _ref$(r$) : buttonRight = r$;
										},
										"class": "btn-primary btn-color-primary btn-control-small",
										text: "Add"
									});
								} });
							}
						}),
						createComponent(Show, {
							when: !isSuggested,
							get children() {
								return createComponent(IconTsx, {
									icon: "menu",
									"class": "row-sortable-icon"
								});
							}
						}),
						createComponent(Show, {
							get when() {
								return memo(() => !!tagsShown())() && color[0]() !== void 0;
							},
							get children() {
								return createComponent(FolderTagColorDot, {
									"class": "chat-folder-color",
									get color() {
										return color[0]();
									}
								});
							}
						})
					];
				}
			}), tab.middlewareHelper.get());
			const rowContainer = mounted.element;
			const listenerSetter = new ListenerSetter();
			mounted.middleware.onClean(() => listenerSetter.removeAll());
			if (filter.id !== 0 || isSuggested) try {
				title[1](await wrapFolderTitle(filter.title, mounted.middleware, false, { textColor: "primary-text-color" }));
			} catch (err) {
				mounted.dispose();
				throw err;
			}
			(container || (isSuggested ? suggestedContent : list)).append(rowContainer);
			row = {
				container: rowContainer,
				title,
				subtitle,
				color,
				buttonRight,
				middleware: mounted.middleware,
				listenerSetter,
				dispose: mounted.dispose
			};
			if (!isSuggested) {
				const filterId = filter.id;
				if (!filtersRendered[filter.id] && filter.id !== 0) {
					const initArgs = AppEditFolderTab.getInitArgs();
					attachClickEvent(row.container, async () => {
						const filter = await tab.managers.filtersStorage.getFilter(filterId);
						tab.slider.createTab(AppEditFolderTab).open({
							...initArgs,
							initFilter: filter
						});
					}, { listenerSetter: row.listenerSetter });
				}
				filtersRendered[filter.id] = row;
			}
		} else {
			if (filter.id !== 0) row.title[1](await wrapFolderTitle(filter.title, row.middleware));
			row.subtitle[1](d.length ? join(d) : void 0);
			row.color[1](getFolderTagColor(filter));
		}
		const div = row.container;
		if (append) {
			const localId = filter.localId;
			if (localId !== void 0) positionElementByIndex(div, div.parentElement || container, localId);
			else if (container) container.append(div);
		}
		return row;
	};
	const toggleAllChats = () => {
		filtersRendered[0].container.classList.toggle("hide", !rootScope.premium);
	};
	const canCreateFolder = async () => {
		const [limit, filters] = await Promise.all([tab.managers.apiManager.getLimit("folders"), tab.managers.filtersStorage.getDialogFilters()]);
		return filters.filter((filter) => !REAL_FOLDERS.has(filter.id)).length < limit;
	};
	const getSuggestedFilters = () => {
		return tab.managers.filtersStorage.getSuggestedDialogsFilters().then(async (suggestedFilters) => {
			setSuggestedHidden(!suggestedFilters.length);
			suggestedRows.forEach((row) => {
				row.dispose();
				row.container.remove();
			});
			suggestedRows.clear();
			for (const filter of suggestedFilters) {
				const row = await renderFolder(filter);
				suggestedRows.add(row);
				const button = row.buttonRight;
				attachClickEvent(button, async (e) => {
					cancelEvent(e);
					if (!await canCreateFolder()) {
						showLimitPopup("folders");
						return;
					}
					button.setAttribute("disabled", "true");
					const f = filter.filter;
					f.includePeerIds = [];
					f.excludePeerIds = [];
					f.pinnedPeerIds = [];
					tab.managers.filtersStorage.createDialogFilter(f, true).then(() => {
						suggestedRows.delete(row);
						row.dispose();
						row.container.remove();
						setSuggestedHidden(suggestedContent.childElementCount === 1);
					}).finally(() => {
						button.removeAttribute("disabled");
					});
				}, { listenerSetter: row.listenerSetter });
			}
		});
	};
	const onFiltersContainerUpdate = () => {
		setFoldersHidden(!Object.keys(filtersRendered).length);
	};
	tab._onOpenAfterTimeout = () => {
		loadAnimationPromise.then(() => {
			animation.autoplay = true;
			animation.play();
		});
	};
	const name = "theme";
	const stateKey = joinDeepPath("settings", "tabsInSidebar");
	const premiumFeaturesHidden = usePremiumFeaturesHidden();
	const tagsChecked = createSignal(untrack(tagsShown));
	createEffect(() => tagsChecked[1](tagsShown()));
	const onTagsToggle = (checked) => {
		if (!isPremium()) {
			tagsChecked[1](false);
			showPremiumPopup({ feature: "folder_tags" });
			return;
		}
		tab.managers.filtersStorage.toggleDialogFilterTags(checked).catch(() => {
			tagsChecked[1](untrack(tagsShown));
		});
	};
	onMount(() => {
		tab.container.classList.add("chat-folders-container");
		tab.scrollable.container.classList.add("chat-folders");
		tab.listenerSetter.add(rootScope)("settings_updated", ({ key, value }) => {
			if (key === stateKey) {
				const [, setHasFoldersSidebar] = useHasFoldersSidebar();
				setHasFoldersSidebar(!!value);
				appImManager.adjustChatPatternBackground();
				if (!value) appSidebarLeft.showCtrlFTip();
			}
		});
		const loadPromises = [];
		const renderFiltersPromise = p.filters.then(async (filters) => {
			for (const filter of filters) {
				if (filter.id === 1) continue;
				await renderFolder(filter, list, void 0, true);
			}
			toggleAllChats();
			onFiltersContainerUpdate();
		});
		loadPromises.push(renderFiltersPromise);
		tab.listenerSetter.add(rootScope)("filter_update", async (filter) => {
			const filterRendered = filtersRendered[filter.id];
			if (filterRendered) await renderFolder(filter, null, filterRendered);
			else if (filter.id !== 1) await renderFolder(filter, list, void 0, true);
			onFiltersContainerUpdate();
			getSuggestedFilters();
		});
		tab.listenerSetter.add(rootScope)("filter_delete", (filter) => {
			const filterRendered = filtersRendered[filter.id];
			if (filterRendered) {
				getSuggestedFilters();
				filterRendered.dispose();
				filterRendered.container.remove();
				delete filtersRendered[filter.id];
			}
			onFiltersContainerUpdate();
		});
		tab.listenerSetter.add(rootScope)("filter_order", (order) => {
			order.filter((filterId) => !!filtersRendered[filterId]).forEach((filterId, idx) => {
				const container = filtersRendered[filterId].container;
				positionElementByIndex(container, container.parentElement, idx + 1);
			});
		});
		tab.listenerSetter.add(rootScope)("premium_toggle", () => {
			toggleAllChats();
		});
		loadAnimationPromise = p.animationData.then(async (cb) => {
			const player = await cb({
				container: stickerContainer,
				loop: false,
				autoplay: false,
				width: 86,
				height: 86
			});
			animation = player;
			return lottieLoader.waitForFirstFrame(player);
		});
		loadPromises.push(loadAnimationPromise);
		new Sortable({
			list,
			middleware: tab.middlewareHelper.get(),
			onSort: (prevIdx, newIdx) => {
				let order = [];
				for (const filterId in filtersRendered) {
					const row = filtersRendered[filterId];
					const idx = whichChild(row.container);
					order[idx] = +filterId;
				}
				order = order.filter((filterId) => filterId !== void 0);
				if (!rootScope.premium) indexOfAndSplice(order, 0);
				tab.managers.filtersStorage.updateDialogFiltersOrder(order);
			},
			scrollable: tab.scrollable
		});
		getSuggestedFilters();
		promiseCollector.collect(Promise.all(loadPromises));
	});
	return [
		(() => {
			var _el$ = _tmpl$();
			var _ref$2 = stickerContainer;
			typeof _ref$2 === "function" ? use(_ref$2, _el$) : stickerContainer = _el$;
			return _el$;
		})(),
		(() => {
			var _el$2 = _tmpl$2();
			insert(_el$2, () => i18n("ChatList.Filter.Header"));
			return _el$2;
		})(),
		createComponent(Button, {
			"class": "btn-primary btn-color-primary btn-control",
			icon: "add",
			text: "ChatList.Filter.NewTitle",
			onClick: async () => {
				if (!await canCreateFolder()) showLimitPopup("folders");
				else tab.slider.createTab(AppEditFolderTab).open(AppEditFolderTab.getInitArgs());
			}
		}),
		createComponent(Section, {
			name: "Filters",
			get classList() {
				return { hide: foldersHidden() };
			},
			get children() {
				var _el$3 = _tmpl$3();
				var _ref$3 = list;
				typeof _ref$3 === "function" ? use(_ref$3, _el$3) : list = _el$3;
				return _el$3;
			}
		}),
		createComponent(Section, {
			name: "FilterRecommended",
			get classList() {
				return { hide: suggestedHidden() };
			},
			contentProps: { ref: (el) => suggestedContent = el }
		}),
		createComponent(Show, {
			get when() {
				return !premiumFeaturesHidden();
			},
			get children() {
				return createComponent(Section, {
					get caption() {
						return isPremium() ? "FolderShowTagsInfo" : "FolderShowTagsInfoPremium";
					},
					get children() {
						return createComponent(Row, { get children() {
							return [createComponent(Row.CheckboxFieldToggle, { get children() {
								return createComponent(CheckboxFieldTsx, {
									toggle: true,
									signal: tagsChecked,
									get lockIcon() {
										return isPremium() ? void 0 : "premium_lock";
									},
									onChange: onTagsToggle
								});
							} }), createComponent(Row.Title, { get children() {
								return i18n("FolderShowTags");
							} })];
						} });
					}
				});
			}
		}),
		createComponent(Section, {
			name: "FiltersView",
			get children() {
				var _el$4 = _tmpl$4();
				insert(_el$4, createComponent(Row, { get children() {
					return [createComponent(Row.RadioField, { get children() {
						return createComponent(RadioFieldTsx, {
							name,
							value: "true",
							valueForState: true,
							stateKey
						});
					} }), createComponent(Row.Title, { get children() {
						return i18n("FiltersOnLeft");
					} })];
				} }), null);
				insert(_el$4, createComponent(Row, { get children() {
					return [createComponent(Row.RadioField, { get children() {
						return createComponent(RadioFieldTsx, {
							name,
							value: "false",
							valueForState: false,
							stateKey
						});
					} }), createComponent(Row.Title, { get children() {
						return i18n("FiltersOnTop");
					} })];
				} }), null);
				return _el$4;
			}
		})
	];
};
//#endregion
export { ChatFolders as default };
