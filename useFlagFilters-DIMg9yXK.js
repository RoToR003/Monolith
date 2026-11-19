//# allFunctionsCalledOnLoad
import { h as Modes } from "./userAgent-ByGXcznk.js";
import { C as createSignal, S as createSelector, _ as createMemo, b as createResource, i as For, p as createComponent, s as Show, w as createUniqueId, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { a as reconcile, n as createStore } from "./store-PwRn5fa3.js";
import { _ as use, c as insert, f as setAttribute, g as template, o as className, r as addEventListener, s as delegateEvents, t as Dynamic, u as memo } from "./web-BPyQozky.js";
import { r as useHotReloadGuard } from "./hotReloadGuard-BUNVkeQ4.js";
import { t as ripple } from "./ripple-D7hcIc_t.js";
import { t as classNames } from "./classNames-DxGDjmvw.js";
import { t as IconTsx } from "./iconTsx-B4lOk4A6.js";
import { t as I18nTsx } from "./i18n-CGMFiAW0.js";
import { t as Button$1 } from "./buttonTsx-Bwphkm9r.js";
import { t as Scrollable$1 } from "./scrollable2-Bau9Hoih.js";
import { s as CheckboxFieldTsx } from "./confirmationPopup-Bz6mK0o-.js";
import { D as A11yButton } from "./openEditors-7FmA7q_V.js";
import { t as Space } from "./space-XGOOgiuc.js";
import { t as SimpleFormField } from "./simpleFormField-CGA0MMzH.js";
import { t as HeightTransition } from "./heightTransition-DUH4NxQ7.js";
var expandableFilterGroup_module_default = {
	Row: "_Row_xdvvq_1",
	RowCheckbox: "_RowCheckbox_xdvvq_9",
	RowCheckboxPassive: "_RowCheckboxPassive_xdvvq_13",
	RowCheckboxWrapper: "_RowCheckboxWrapper_xdvvq_16",
	RowCheckboxClickArea: "_RowCheckboxClickArea_xdvvq_21",
	RowSeparator: "_RowSeparator_xdvvq_25",
	RowLabel: "_RowLabel_xdvvq_31",
	RowOffset: "_RowOffset_xdvvq_43",
	Count: "_Count_xdvvq_47",
	CountArrow: "_CountArrow_xdvvq_54",
	toggled: "_toggled_xdvvq_57",
	ExpandedItems: "_ExpandedItems_xdvvq_61"
};
//#endregion
//#region src/components/sidebarRight/tabs/adminRecentActions/filters/expandableFilterGroup.tsx
var _tmpl$$1 = /*#__PURE__*/ template(`<span>`);
var _tmpl$2$1 = /*#__PURE__*/ template(`<span>/`);
var _tmpl$3 = /*#__PURE__*/ template(`<div><div></div><div>`);
var _tmpl$4 = /*#__PURE__*/ template(`<div>`);
var ExpandableFilterGroup = (props) => {
	const [isExpanded, setIsExpanded] = createSignal(false);
	const mainLabelId = createUniqueId();
	const isMainChecked = createMemo(() => props.items.every((item) => item.checked()));
	const checkboxClass = Modes.a11y ? expandableFilterGroup_module_default.RowCheckbox : classNames(expandableFilterGroup_module_default.RowCheckbox, expandableFilterGroup_module_default.RowCheckboxPassive);
	return [(() => {
		var _el$ = _tmpl$3(), _el$2 = _el$.firstChild, _el$3 = _el$2.nextSibling;
		_el$.$$click = () => setIsExpanded(!isExpanded());
		use(ripple, _el$, () => true);
		_el$2.$$click = (e) => {
			e.stopPropagation();
			if (!Modes.a11y) props.onMainCheckboxClick();
		};
		insert(_el$2, createComponent(CheckboxFieldTsx, {
			"class": checkboxClass,
			get checked() {
				return isMainChecked();
			},
			get onChange() {
				return memo(() => !!Modes.a11y)() ? props.onMainCheckboxClick : void 0;
			},
			ref: (field) => field.input.setAttribute("aria-labelledby", mainLabelId)
		}), null);
		insert(_el$2, (() => {
			var _c$ = memo(() => !!!Modes.a11y);
			return () => _c$() && (() => {
				var _el$8 = _tmpl$4();
				createRenderEffect(() => className(_el$8, expandableFilterGroup_module_default.RowCheckboxClickArea));
				return _el$8;
			})();
		})(), null);
		insert(_el$, createComponent(A11yButton, {
			get ["class"]() {
				return expandableFilterGroup_module_default.RowLabel;
			},
			get ["aria-expanded"]() {
				return isExpanded();
			},
			get children() {
				return [(() => {
					var _el$4 = _tmpl$$1();
					setAttribute(_el$4, "id", mainLabelId);
					insert(_el$4, () => props.mainLabel);
					return _el$4;
				})(), (() => {
					var _el$5 = _tmpl$2$1(), _el$6 = _el$5.firstChild;
					insert(_el$5, () => props.checkedCount, _el$6);
					insert(_el$5, () => props.items.length, null);
					insert(_el$5, createComponent(IconTsx, {
						get ["class"]() {
							return expandableFilterGroup_module_default.CountArrow;
						},
						get classList() {
							return { [expandableFilterGroup_module_default.toggled]: isExpanded() };
						},
						icon: "arrowhead"
					}), null);
					createRenderEffect(() => className(_el$5, expandableFilterGroup_module_default.Count));
					return _el$5;
				})()];
			}
		}), null);
		createRenderEffect((_p$) => {
			var _v$ = `${expandableFilterGroup_module_default.Row} hover-effect rp`, _v$2 = expandableFilterGroup_module_default.RowCheckboxWrapper, _v$3 = expandableFilterGroup_module_default.RowSeparator;
			_v$ !== _p$.e && className(_el$, _p$.e = _v$);
			_v$2 !== _p$.t && className(_el$2, _p$.t = _v$2);
			_v$3 !== _p$.a && className(_el$3, _p$.a = _v$3);
			return _p$;
		}, {
			e: void 0,
			t: void 0,
			a: void 0
		});
		return _el$;
	})(), createComponent(HeightTransition, { get children() {
		return createComponent(Show, {
			get when() {
				return isExpanded();
			},
			get children() {
				var _el$7 = _tmpl$4();
				insert(_el$7, createComponent(For, {
					get each() {
						return props.items;
					},
					children: (item) => {
						const inputId = createUniqueId();
						return (() => {
							var _el$9 = _tmpl$3(), _el$0 = _el$9.firstChild, _el$1 = _el$0.nextSibling;
							addEventListener(_el$9, "click", Modes.a11y ? void 0 : item.onClick, true);
							use(ripple, _el$9, () => true);
							insert(_el$1, createComponent(CheckboxFieldTsx, {
								"class": checkboxClass,
								get checked() {
									return item.checked();
								},
								get onChange() {
									return memo(() => !!Modes.a11y)() ? item.onClick : void 0;
								},
								ref: (field) => field.input.id = inputId
							}));
							insert(_el$9, createComponent(Dynamic, {
								get component() {
									return Modes.a11y ? "label" : "div";
								},
								get ["for"]() {
									return Modes.a11y ? inputId : void 0;
								},
								get ["class"]() {
									return expandableFilterGroup_module_default.RowLabel;
								},
								get children() {
									return item.label;
								}
							}), null);
							createRenderEffect((_p$) => {
								var _v$4 = `${expandableFilterGroup_module_default.Row} hover-effect rp`, _v$5 = expandableFilterGroup_module_default.RowOffset, _v$6 = expandableFilterGroup_module_default.RowCheckboxWrapper;
								_v$4 !== _p$.e && className(_el$9, _p$.e = _v$4);
								_v$5 !== _p$.t && className(_el$0, _p$.t = _v$5);
								_v$6 !== _p$.a && className(_el$1, _p$.a = _v$6);
								return _p$;
							}, {
								e: void 0,
								t: void 0,
								a: void 0
							});
							return _el$9;
						})();
					}
				}));
				createRenderEffect(() => className(_el$7, expandableFilterGroup_module_default.ExpandedItems));
				return _el$7;
			}
		});
	} })];
};
delegateEvents(["click"]);
var flagFilters_module_default = {
	SectionTitle: "_SectionTitle_2ta4z_1",
	Footer: "_Footer_2ta4z_7",
	Button: "_Button_2ta4z_16",
	Search: "_Search_2ta4z_22",
	Scrollable: "_Scrollable_2ta4z_26"
};
//#endregion
//#region src/components/sidebarRight/tabs/adminRecentActions/filters/flagFilters.tsx
var _tmpl$ = /*#__PURE__*/ template(`<form>`);
var _tmpl$2 = /*#__PURE__*/ template(`<div>`);
var FlagFilters = (props) => {
	const { PeerTitleTsx } = useHotReloadGuard();
	const filtersControls = () => props.filtersControls;
	const onCommit = () => {
		props.onCommit(filtersControls().getCommittedReady());
	};
	const onSubmit = (e) => {
		e.preventDefault();
		onCommit();
	};
	return [
		createComponent(Show, {
			get when() {
				return props.hasSearch;
			},
			get children() {
				return [
					createComponent(Space, { amount: "2px" }),
					(() => {
						var _el$ = _tmpl$();
						_el$.addEventListener("submit", onSubmit);
						insert(_el$, createComponent(SimpleFormField, {
							get value() {
								return filtersControls().search();
							},
							get onChange() {
								return filtersControls().onSearchChange;
							},
							get children() {
								return [createComponent(SimpleFormField.Label, { get children() {
									return createComponent(I18nTsx, { key: "Search" });
								} }), createComponent(SimpleFormField.Input, { ref(r$) {
									var _ref$ = props.inputRef;
									typeof _ref$ === "function" ? _ref$(r$) : props.inputRef = r$;
								} })];
							}
						}));
						createRenderEffect(() => className(_el$, flagFilters_module_default.Search));
						return _el$;
					})(),
					createComponent(Space, { amount: "1rem" })
				];
			}
		}),
		createComponent(Scrollable$1, {
			get ["class"]() {
				return flagFilters_module_default.Scrollable;
			},
			withBorders: "both",
			relative: true,
			get children() {
				return [
					(() => {
						var _el$2 = _tmpl$2();
						insert(_el$2, createComponent(I18nTsx, { key: "AdminRecentActionsFilters.ByType" }));
						createRenderEffect(() => className(_el$2, flagFilters_module_default.SectionTitle));
						return _el$2;
					})(),
					createComponent(For, {
						get each() {
							return filtersControls().filterGroupsConfig();
						},
						children: (group) => createComponent(ExpandableFilterGroup, {
							get mainLabel() {
								return createComponent(I18nTsx, { get key() {
									return group.i18nKey;
								} });
							},
							get checkedCount() {
								return filtersControls().flagGroupCheckCount(group);
							},
							onMainCheckboxClick: () => filtersControls().onFlagGroupClick(group),
							get items() {
								return group.items.map((item) => ({
									checked: () => filtersControls().isFlagSelected(item.pFlag),
									label: createComponent(I18nTsx, { get key() {
										return item.i18nKey;
									} }),
									onClick: () => filtersControls().onFlagClick(item.pFlag)
								}));
							}
						})
					}),
					createComponent(Space, { amount: "1rem" }),
					(() => {
						var _el$3 = _tmpl$2();
						insert(_el$3, createComponent(I18nTsx, { key: "AdminRecentActionsFilters.ByAdmin" }));
						createRenderEffect(() => className(_el$3, flagFilters_module_default.SectionTitle));
						return _el$3;
					})(),
					createComponent(Show, {
						get when() {
							return filtersControls().adminIds().length;
						},
						get children() {
							return createComponent(ExpandableFilterGroup, {
								get mainLabel() {
									return createComponent(I18nTsx, { key: "AdminRecentActionsFilters.ShowAllAdminActions" });
								},
								get checkedCount() {
									return filtersControls().selectedAdminIds().size;
								},
								get onMainCheckboxClick() {
									return filtersControls().onAllAdminsClick;
								},
								get items() {
									return filtersControls().adminIds().map((userId) => ({
										checked: () => filtersControls().isAdminIdSelected(userId.toPeerId()),
										label: createComponent(PeerTitleTsx, {
											get peerId() {
												return userId.toPeerId();
											},
											limitSymbols: 32
										}),
										onClick: () => filtersControls().onAdminClick(userId.toPeerId())
									}));
								}
							});
						}
					}),
					createComponent(Show, {
						get when() {
							return filtersControls().notShowingAdmins();
						},
						get children() {
							var _el$4 = _tmpl$2();
							insert(_el$4, createComponent(I18nTsx, {
								key: "AdminRecentActionsFilters.NotShowingAdmins",
								get args() {
									return [filtersControls().notShowingAdmins() + ""];
								}
							}));
							createRenderEffect(() => className(_el$4, flagFilters_module_default.SectionTitle));
							return _el$4;
						}
					})
				];
			}
		}),
		createComponent(Space, { amount: "1rem" }),
		(() => {
			var _el$5 = _tmpl$2();
			insert(_el$5, createComponent(Button$1, {
				get ["class"]() {
					return flagFilters_module_default.Button;
				},
				primary: true,
				get onClick() {
					return props.onReset;
				},
				get children() {
					return createComponent(I18nTsx, { key: "AdminRecentActionsFilters.ResetFilters" });
				}
			}), null);
			insert(_el$5, createComponent(Button$1, {
				get ["class"]() {
					return flagFilters_module_default.Button;
				},
				primaryFilled: true,
				onClick: onCommit,
				get children() {
					return createComponent(I18nTsx, { key: "Apply" });
				}
			}), null);
			createRenderEffect(() => className(_el$5, flagFilters_module_default.Footer));
			return _el$5;
		})()
	];
};
//#endregion
//#region src/helpers/solid/createSetSignal.ts
var createSetSignal = (initialValue = /* @__PURE__ */ new Set()) => createSignal(initialValue, { equals: (prev, next) => prev.size === next.size && [...prev].every((id) => next.has(id)) });
//#endregion
//#region src/components/sidebarRight/tabs/adminRecentActions/filters/config.ts
function getFilterGroupsConfig({ isBroadcast }) {
	return [
		{
			i18nKey: "AdminRecentActionsFilters.MembersAndAdmins",
			items: [
				{
					pFlag: "join",
					i18nKey: "AdminRecentActionsFilters.NewMembers"
				},
				{
					pFlag: "leave",
					i18nKey: isBroadcast ? "AdminRecentActionsFilters.MembersLeftChannel" : "AdminRecentActionsFilters.MembersLeftGroup"
				},
				{
					pFlag: "invite",
					i18nKey: "AdminRecentActionsFilters.InvitedMembers"
				},
				{
					pFlag: "ban",
					i18nKey: "AdminRecentActionsFilters.BannedMembers"
				},
				{
					pFlag: "unban",
					i18nKey: "AdminRecentActionsFilters.UnbannedMembers"
				},
				{
					pFlag: "kick",
					i18nKey: "AdminRecentActionsFilters.RemovedMembers"
				},
				{
					pFlag: "unkick",
					i18nKey: "AdminRecentActionsFilters.UnkickedMembers"
				},
				{
					pFlag: "promote",
					i18nKey: "AdminRecentActionsFilters.NewAdminRights"
				},
				{
					pFlag: "demote",
					i18nKey: "AdminRecentActionsFilters.RemovedAdminRights"
				},
				...isBroadcast ? [] : [{
					pFlag: "edit_rank",
					i18nKey: "AdminRecentActionsFilters.TagChanges"
				}]
			]
		},
		{
			i18nKey: isBroadcast ? "AdminRecentActionsFilters.ChannelSettings" : "AdminRecentActionsFilters.GroupSettings",
			items: [
				{
					pFlag: "info",
					i18nKey: isBroadcast ? "AdminRecentActionsFilters.ChannelInfo" : "AdminRecentActionsFilters.GroupInfo"
				},
				{
					pFlag: "settings",
					i18nKey: isBroadcast ? "AdminRecentActionsFilters.ChannelSettings" : "AdminRecentActionsFilters.GroupSettings"
				},
				{
					pFlag: "invites",
					i18nKey: "AdminRecentActionsFilters.InviteLinks"
				},
				{
					pFlag: "group_call",
					i18nKey: "AdminRecentActionsFilters.GroupCall"
				},
				{
					pFlag: "forums",
					i18nKey: "AdminRecentActionsFilters.Forums"
				},
				{
					pFlag: "sub_extend",
					i18nKey: "AdminRecentActionsFilters.SubscriptionExtensions"
				}
			]
		},
		{
			i18nKey: "AdminRecentActionsFilters.Messages",
			items: [
				{
					pFlag: "send",
					i18nKey: "AdminRecentActionsFilters.SentMessages"
				},
				{
					pFlag: "delete",
					i18nKey: "AdminRecentActionsFilters.DeletedMessages"
				},
				{
					pFlag: "edit",
					i18nKey: "AdminRecentActionsFilters.EditedMessages"
				},
				{
					pFlag: "pinned",
					i18nKey: "AdminRecentActionsFilters.PinnedMessages"
				}
			]
		}
	];
}
//#endregion
//#region src/components/sidebarRight/tabs/adminRecentActions/filters/useFlagFilters.ts
var adminsFetchLimit = 40;
function useFlagFilters({ channelId, isBroadcast }) {
	const { rootScope } = useHotReloadGuard();
	const filterGroupsConfig = createMemo(() => getFilterGroupsConfig({ isBroadcast: isBroadcast() }));
	const getAllFlagKeys = () => filterGroupsConfig().flatMap((group) => group.items.map((item) => item.pFlag));
	const getInitialFlagsStore = () => {
		const keys = getAllFlagKeys();
		return Object.fromEntries(keys.map((key) => [key, true]));
	};
	const [adminsResource] = createResource(channelId, (id) => rootScope.managers.appProfileManager.getChannelParticipants({
		id,
		filter: { _: "channelParticipantsAdmins" },
		offset: 0,
		limit: adminsFetchLimit
	}));
	const [search, setSearch] = createSignal("");
	const [selectedFlagsStore, setSelectedFlagsStore] = createStore(getInitialFlagsStore());
	const [selectedAdminIds, setSelectedAdminIds] = createSetSignal();
	const adminIds = createMemo(() => adminsResource()?.participants?.filter((item) => "user_id" in item).map((item) => item.user_id) || []);
	const notShowingAdmins = createMemo(() => {
		if (!adminsResource()) return null;
		const length = adminIds().length;
		const count = adminsResource().count || length;
		return count - length > 0 ? count - length : null;
	});
	const allAdminPeerIds = createMemo(() => adminIds().map((id) => id.toPeerId()));
	const isAdminIdSelected = createSelector(selectedAdminIds, (id, ids) => ids.has(id.toPeerId()));
	const isFlagSelected = (flag) => selectedFlagsStore[flag];
	const flagGroupCheckCount = (group) => {
		return group.items.filter((item) => selectedFlagsStore[item.pFlag]).length;
	};
	const onFlagClick = (flag) => {
		setSelectedFlagsStore(flag, (prev) => !prev);
	};
	const onFlagGroupClick = (group) => {
		const areAllChecked = group.items.every((item) => selectedFlagsStore[item.pFlag]);
		setSelectedFlagsStore(group.items.map((item) => item.pFlag), !areAllChecked);
	};
	const onAllAdminsClick = () => {
		const areAllSelected = selectedAdminIds().size === allAdminPeerIds().length;
		setSelectedAdminIds(areAllSelected ? /* @__PURE__ */ new Set() : new Set(allAdminPeerIds()));
	};
	const onAdminClick = (id) => {
		const newIds = new Set(selectedAdminIds());
		if (newIds.has(id.toPeerId())) newIds.delete(id.toPeerId());
		else newIds.add(id.toPeerId());
		setSelectedAdminIds(newIds);
	};
	const getCommittedReady = () => {
		const activeFlagEntries = Object.entries(selectedFlagsStore).filter(([, value]) => value);
		const flags = activeFlagEntries.length && activeFlagEntries.length < getAllFlagKeys().length ? Object.fromEntries(activeFlagEntries) : void 0;
		const admins = selectedAdminIds().size < allAdminPeerIds().length ? Array.from(selectedAdminIds()) : void 0;
		if (!search() && !flags && !admins) return null;
		return {
			search: search() || void 0,
			flags,
			admins
		};
	};
	const setFromCommittedFilters = (committedFilters) => {
		setSearch(committedFilters?.search || "");
		setSelectedFlagsStore(reconcile(committedFilters?.flags || getInitialFlagsStore()));
		setSelectedAdminIds(new Set(committedFilters?.admins || allAdminPeerIds()));
	};
	return {
		filterGroupsConfig,
		adminIds,
		notShowingAdmins,
		setFromCommittedFilters,
		getCommittedReady,
		search,
		selectedAdminIds,
		onSearchChange: setSearch,
		onFlagClick,
		onFlagGroupClick,
		onAllAdminsClick,
		onAdminClick,
		isFlagSelected,
		isAdminIdSelected,
		flagGroupCheckCount
	};
}
//#endregion
export { createSetSignal as n, FlagFilters as r, useFlagFilters as t };
