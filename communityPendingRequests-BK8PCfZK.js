//# allFunctionsCalledOnLoad
import { c as useCommunityPeerLinkRequests, r as useCommunity } from "./apiManagerProxy-DmQXvxSF.js";
import { a as i18n } from "./langPack-BmdJGr44.js";
import { C as createSignal, M as onCleanup, _ as createMemo, g as createEffect, i as For, p as createComponent, s as Show, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { _ as use, c as insert, g as template, n as Portal, o as className, s as delegateEvents, u as memo } from "./web-BPyQozky.js";
import { n as hotReloadGuard } from "./hotReloadGuardProvider-CHEsZRuG.js";
import { t as Button } from "./buttonTsx-Bwphkm9r.js";
import { t as confirmationPopup } from "./confirmationPopup-Bz6mK0o-.js";
import { U as getPeerId } from "./canPollPeerStories-D3HoBvLX.js";
import { i as usePromiseCollector } from "./mediaHeader-CnpQNwOl.js";
import { a as Section } from "./emailVerification-C8QYZSyu.js";
import { r as toastNew } from "./toast-B6VD5M7R.js";
import { n as useSuperTab } from "./superTabProvider-LtveyH7W.js";
import { t as useCommunityTabGuard } from "./useCommunityTabGuard-CjtFqUbl.js";
import { i as communityManagement_module_default, n as CommunityPendingRequestRow, r as showCommunityRequestError, t as createCommunityPendingRequestActions } from "./communityPendingRequestActions-BFGt6gsN.js";
//#region src/components/communities/communityPendingRequests.tsx
var _tmpl$ = /*#__PURE__*/ template(`<span> <button type=button>`);
var _tmpl$2 = /*#__PURE__*/ template(`<div><div>`);
var _tmpl$3 = /*#__PURE__*/ template(`<div>`);
var _tmpl$4 = /*#__PURE__*/ template(`<div aria-hidden=true>`);
function CommunityPendingRequests() {
	const [tab] = useSuperTab();
	const promiseCollector = usePromiseCollector();
	const { communityId } = tab.payload;
	useCommunityTabGuard(tab, communityId);
	const community = useCommunity(() => communityId);
	const state = useCommunityPeerLinkRequests(() => communityId);
	const [bulkWorking, setBulkWorking] = createSignal(false);
	const [loadingMore, setLoadingMore] = createSignal(false);
	const [loadFailed, setLoadFailed] = createSignal(false);
	const [retrying, setRetrying] = createSignal(false);
	const actions = createCommunityPendingRequestActions({
		apply: (request, reject) => {
			return tab.managers.appCommunitiesManager.togglePeerLinkRequestApproval({
				communityId,
				peerId: getPeerId(request.peer),
				reject
			});
		},
		onError: (error, request) => {
			return showCommunityRequestError({
				error,
				managers: tab.managers,
				peerId: getPeerId(request.peer)
			});
		}
	});
	const visibleRequests = createMemo(() => {
		const staged = actions.stagedPeerIds();
		return (state()?.requests || []).filter((request) => {
			return !staged.has(getPeerId(request.peer));
		});
	});
	const totalCount = () => state()?.totalCount || visibleRequests().length;
	const onlyAdminsCanAdd = () => {
		const value = community();
		return value?._ === "community" && !!value.default_banned_rights?.pFlags.manage_linked_peers;
	};
	let loadMoreSentinel;
	const loadInitial = async () => {
		setRetrying(true);
		try {
			await tab.managers.appCommunitiesManager.getPeerLinkRequests({ communityId });
			setLoadFailed(false);
		} catch (error) {
			console.error("load community requests error", error);
			setLoadFailed(true);
			toastNew({ langPackKey: "Community.RequestsLoadFailed" });
		} finally {
			setRetrying(false);
		}
	};
	const initialLoad = loadInitial();
	promiseCollector.collect(initialLoad);
	let hadLoadedState = !!state()?.loaded;
	createEffect(() => {
		const loaded = !!state()?.loaded;
		if (hadLoadedState && !loaded && !retrying()) loadInitial();
		hadLoadedState = loaded;
	});
	const applyAll = async (reject) => {
		if (bulkWorking()) return;
		const count = totalCount();
		try {
			await confirmationPopup({
				titleLangKey: reject ? "Community.DeclineAllRequests" : "Community.AddAllRequests",
				descriptionLangKey: reject ? "Community.DeclineAllRequestsConfirm" : "Community.AddAllRequestsConfirm",
				descriptionLangArgs: [count],
				button: {
					langKey: reject ? "Decline" : "Add",
					isDanger: reject
				}
			});
		} catch {
			return;
		}
		setBulkWorking(true);
		try {
			await actions.flush();
			await tab.managers.appCommunitiesManager.toggleAllPeerLinkRequestApproval(communityId, reject);
			tab.close();
			toastNew({
				langPackKey: reject ? "Community.RequestsDeclined" : "Community.RequestsAdded",
				langPackArguments: [count]
			});
		} catch (error) {
			await showCommunityRequestError({
				error,
				managers: tab.managers
			});
		} finally {
			setBulkWorking(false);
		}
	};
	const loadMore = async () => {
		const nextOffset = state()?.nextOffset;
		if (!nextOffset || loadingMore()) return;
		setLoadingMore(true);
		try {
			await tab.managers.appCommunitiesManager.getPeerLinkRequests({
				communityId,
				offset: nextOffset
			});
		} catch (error) {
			console.error("load more community requests error", error);
			toastNew({ langPackKey: "Community.RequestsLoadFailed" });
		} finally {
			setLoadingMore(false);
		}
	};
	createEffect(() => {
		if (!state()?.nextOffset || !loadMoreSentinel || !window.IntersectionObserver) return;
		const observer = new IntersectionObserver((entries) => {
			if (entries.some((entry) => entry.isIntersecting)) loadMore();
		}, {
			root: tab.scrollable.container,
			rootMargin: "200px 0px"
		});
		observer.observe(loadMoreSentinel);
		onCleanup(() => observer.disconnect());
	});
	const openSettings = () => {
		const existingTab = tab.slider.getTab(hotReloadGuard.tabs.AppEditCommunityTab);
		if (existingTab?.payload.communityId === communityId) {
			tab.slider.closeTabsUntilTab(existingTab);
			return;
		}
		tab.slider.createTab(hotReloadGuard.tabs.AppEditCommunityTab).open({ communityId });
	};
	const caption = () => {
		if (!onlyAdminsCanAdd()) return;
		return (() => {
			var _el$ = _tmpl$(), _el$2 = _el$.firstChild, _el$3 = _el$2.nextSibling;
			insert(_el$, () => i18n("Community.PendingRequestsInfo"), _el$2);
			_el$3.$$click = openSettings;
			insert(_el$3, () => i18n("Community.ChangeSettings"));
			createRenderEffect(() => className(_el$3, communityManagement_module_default.captionAction));
			return _el$;
		})();
	};
	createEffect(() => {
		tab.scrollable.container.classList.toggle(communityManagement_module_default.bulkActionsScrollable, !!state()?.loaded && totalCount() > 0);
	});
	onCleanup(() => {
		tab.scrollable.container.classList.remove(communityManagement_module_default.bulkActionsScrollable);
	});
	return [(() => {
		var _el$4 = _tmpl$3();
		insert(_el$4, createComponent(Show, {
			get when() {
				return memo(() => !!loadFailed())() && !state()?.loaded;
			},
			get children() {
				return createComponent(Section, { get children() {
					var _el$5 = _tmpl$2(), _el$6 = _el$5.firstChild;
					insert(_el$5, () => i18n("Community.RequestsLoadFailed"), _el$6);
					insert(_el$6, createComponent(Button, {
						primaryTransparent: true,
						get disabled() {
							return retrying();
						},
						text: "Community.Retry",
						onClick: loadInitial
					}));
					createRenderEffect((_p$) => {
						var _v$ = communityManagement_module_default.empty, _v$2 = communityManagement_module_default.retryAction;
						_v$ !== _p$.e && className(_el$5, _p$.e = _v$);
						_v$2 !== _p$.t && className(_el$6, _p$.t = _v$2);
						return _p$;
					}, {
						e: void 0,
						t: void 0
					});
					return _el$5;
				} });
			}
		}), null);
		insert(_el$4, createComponent(Show, {
			get when() {
				return state()?.loaded;
			},
			get children() {
				return createComponent(Section, {
					get name() {
						return visibleRequests().length ? "Community.PendingRequestsCount" : void 0;
					},
					get nameArgs() {
						return [totalCount()];
					},
					get caption() {
						return caption();
					},
					captionTop: true,
					get children() {
						return [
							createComponent(For, {
								get each() {
									return visibleRequests();
								},
								children: (request) => createComponent(CommunityPendingRequestRow, {
									request,
									get disabled() {
										return bulkWorking();
									},
									get onApply() {
										return actions.stage;
									}
								})
							}),
							createComponent(Show, {
								get when() {
									return !visibleRequests().length;
								},
								get children() {
									var _el$7 = _tmpl$3();
									insert(_el$7, () => i18n("Community.NoPendingRequests"));
									createRenderEffect(() => className(_el$7, communityManagement_module_default.empty));
									return _el$7;
								}
							}),
							(() => {
								var _el$8 = _tmpl$4();
								var _ref$ = loadMoreSentinel;
								typeof _ref$ === "function" ? use(_ref$, _el$8) : loadMoreSentinel = _el$8;
								createRenderEffect(() => className(_el$8, communityManagement_module_default.loadMoreSentinel));
								return _el$8;
							})()
						];
					}
				});
			}
		}), null);
		createRenderEffect(() => className(_el$4, communityManagement_module_default.root));
		return _el$4;
	})(), createComponent(Show, {
		get when() {
			return memo(() => !!state()?.loaded)() && totalCount() > 0;
		},
		get children() {
			return createComponent(Portal, {
				get mount() {
					return tab.content;
				},
				get children() {
					var _el$9 = _tmpl$3();
					insert(_el$9, createComponent(Button, {
						get ["class"]() {
							return `${communityManagement_module_default.bulkAction} ${communityManagement_module_default.bulkActionUppercase} ${communityManagement_module_default.danger} text-bold`;
						},
						primaryTransparent: true,
						get disabled() {
							return bulkWorking();
						},
						text: "Community.DeclineAll",
						onClick: () => applyAll(true)
					}), null);
					insert(_el$9, createComponent(Button, {
						get ["class"]() {
							return communityManagement_module_default.bulkAction;
						},
						primaryFilled: true,
						get disabled() {
							return bulkWorking();
						},
						text: "Community.AddAll",
						onClick: () => applyAll(false)
					}), null);
					createRenderEffect(() => className(_el$9, communityManagement_module_default.stickyBulkActions));
					return _el$9;
				}
			});
		}
	})];
}
delegateEvents(["click"]);
//#endregion
export { CommunityPendingRequests as default };
