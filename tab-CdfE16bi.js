//# allFunctionsCalledOnLoad
import { f as DEBUG } from "./userAgent-ByGXcznk.js";
import { n as logger } from "./logger-7zf0rNYS.js";
import { c as deepEqual } from "./encryptedStorageLayer-gN9TBXzg.js";
import { C as createSignal, _ as createMemo, b as createResource, g as createEffect, m as createComputed, p as createComponent, s as Show } from "./solid-9Vxm0VIz.js";
import { n as bindManagersToSession } from "./bindManagersToAccount-BL82O9H9.js";
import { a as reconcile, n as createStore } from "./store-PwRn5fa3.js";
import { c as insert, g as template, n as Portal, u as memo } from "./web-BPyQozky.js";
import { r as useHotReloadGuard } from "./hotReloadGuard-BUNVkeQ4.js";
import { t as Transition } from "./transition-Cmlc134D.js";
import { yt as setBooleanFlag } from "./getChatMigratedTo-ChhMNXuu.js";
import { i as usePromiseCollector } from "./mediaHeader-CnpQNwOl.js";
import { t as anchorCallback } from "./anchorCallback-BbwAJdBk.js";
import { a as Section } from "./emailVerification-C8QYZSyu.js";
import { n as useSuperTab } from "./superTabProvider-LtveyH7W.js";
import { t as RadioFieldTsx } from "./radioFieldTsx-kmtuN4Dv.js";
import { t as useStarsCommissionAndWithdrawalPrice } from "./useStarsCommissionAndWithdrawalPrice-CBMOduwU.js";
import { n as SaveButton, t as useIsConfirmationNeededOnClose } from "./useIsConfirmationNeededOnClose-D8OTEl9F.js";
import { t as StarRangeInput } from "./starsRangeInput-DkDwusE1.js";
//#region src/components/sidebarLeft/tabs/privacy/messages/config.ts
var MessagesPrivacyOption = /* @__PURE__ */ function(MessagesPrivacyOption) {
	MessagesPrivacyOption[MessagesPrivacyOption["Everybody"] = 1] = "Everybody";
	MessagesPrivacyOption[MessagesPrivacyOption["ContactsAndPremium"] = 2] = "ContactsAndPremium";
	MessagesPrivacyOption[MessagesPrivacyOption["Paid"] = 3] = "Paid";
	return MessagesPrivacyOption;
}({});
var privacyRulesInputKey = "inputPrivacyKeyNoPaidMessages";
var defaultPrivacyRules = [{ _: "inputPrivacyValueAllowContacts" }];
//#endregion
//#region src/components/sidebarLeft/tabs/privacy/messages/optionsSection.tsx
var DEFAULT_STARS_AMOUNT = 10;
var OptionsSection = (props) => {
	const { showPremiumPopup, i18n, toastNew, hideToast, Row, usePremium } = useHotReloadGuard();
	const isPremium = usePremium();
	const handlePremiumOptionClick = (event) => {
		if (isPremium()) return;
		event.preventDefault();
		toastNew({
			langPackKey: "PrivacySettings.Messages.PremiumError",
			langPackArguments: [anchorCallback(() => {
				hideToast();
				showPremiumPopup({ feature: "message_privacy" });
			})]
		});
	};
	const OptionRow = (optionProps) => {
		const locked = () => !!optionProps.premium && !isPremium();
		const handleClick = (event) => {
			if (locked()) handlePremiumOptionClick(event);
		};
		return createComponent(Row, {
			clickable: handleClick,
			get children() {
				return [
					createComponent(Row.RadioField, { get children() {
						return createComponent(RadioFieldTsx, {
							get ["class"]() {
								return locked() ? "hide" : void 0;
							},
							get checked() {
								return optionProps.checked;
							},
							name: "privacy-messages",
							get value() {
								return String(optionProps.value);
							},
							onChange: (checked) => checked && optionProps.onSelect()
						});
					} }),
					createComponent(Show, {
						get when() {
							return locked();
						},
						get children() {
							return createComponent(Row.Icon, { icon: "premium_lock_filled" });
						}
					}),
					createComponent(Row.Title, { get children() {
						return i18n(optionProps.langKey);
					} })
				];
			}
		});
	};
	const caption = createComponent(Transition, {
		mode: "outin",
		onEnter: async (el, done) => {
			await el.animate({ opacity: [0, 1] }, { duration: 120 }).finished;
			done();
		},
		onExit: async (el, done) => {
			const promise = el.animate({ opacity: [1, 0] }, { duration: 120 }).finished;
			props.onExitAnimationPromise(promise);
			await promise;
			done();
		},
		get children() {
			return memo(() => !!!props.isPaid)() ? i18n("Privacy.MessagesInfo", [anchorCallback(() => void showPremiumPopup())]) : i18n("PaidMessages.ChargeForMessagesDescription");
		}
	});
	return createComponent(Section, {
		name: "PrivacyMessagesTitle",
		caption,
		get children() {
			return [
				createComponent(OptionRow, {
					get checked() {
						return props.store.option === MessagesPrivacyOption.Everybody;
					},
					langKey: "PrivacySettingsController.Everbody",
					onSelect: () => {
						props.setStore("option", MessagesPrivacyOption.Everybody);
					},
					get value() {
						return MessagesPrivacyOption.Everybody;
					}
				}),
				createComponent(OptionRow, {
					get checked() {
						return props.store.option === MessagesPrivacyOption.ContactsAndPremium;
					},
					langKey: "Privacy.ContactsAndPremium",
					onSelect: () => {
						props.setStore("option", MessagesPrivacyOption.ContactsAndPremium);
					},
					premium: true,
					get value() {
						return MessagesPrivacyOption.ContactsAndPremium;
					}
				}),
				createComponent(OptionRow, {
					get checked() {
						return props.isPaid;
					},
					langKey: "PaidMessages.ChargeForMessages",
					onSelect: () => {
						props.setStore((prev) => ({
							option: MessagesPrivacyOption.Paid,
							stars: prev.stars || DEFAULT_STARS_AMOUNT
						}));
					},
					premium: true,
					get value() {
						return MessagesPrivacyOption.Paid;
					}
				})
			];
		}
	});
};
//#endregion
//#region src/components/sidebarLeft/tabs/privacy/messages/paidSettingsSection.tsx
var _tmpl$ = /*#__PURE__*/ template(`<span class=primary>`);
var _tmpl$2 = /*#__PURE__*/ template(`<div>`);
var PaidSettingsSection = (props) => {
	const [tab, { AppAddMembersTab }] = useSuperTab();
	const { i18n, join, Row } = useHotReloadGuard();
	const { commissionPercents, willReceiveDollars } = useStarsCommissionAndWithdrawalPrice(() => props.store.stars);
	const onExceptionsClick = () => {
		tab.slider.createTab(AppAddMembersTab).open({
			type: "privacy",
			skippable: true,
			title: "PaidMessages.RemoveFee",
			placeholder: "PrivacyModal.Search.Placeholder",
			takeOut: (newPeerIds) => {
				props.setStore("chosenPeers", newPeerIds);
			},
			selectedPeerIds: [...props.store.chosenPeers]
		});
	};
	const chosenPeersLabel = () => {
		if (!props.store.chosenPeers.length) return i18n("PrivacySettingsController.AddUsers");
		const { users, chats } = props.chosenPeersByType;
		return join([users.length ? i18n("Users", [users.length]) : null, chats.length ? i18n("Chats", [chats.length]) : null].filter(Boolean), false);
	};
	return createComponent(Transition, {
		onEnter: async (_el, done) => {
			const el = _el;
			el.style.opacity = "0";
			await props.exitAnimationPromise;
			await el.animate({ opacity: [0, 1] }, { duration: 120 }).finished;
			el.style.removeProperty("opacity");
			done();
		},
		onExit: async (el, done) => {
			await el.animate({ opacity: [1, 0] }, { duration: 120 }).finished;
			done();
		},
		get children() {
			return createComponent(Show, {
				get when() {
					return props.isPaid;
				},
				get children() {
					var _el$ = _tmpl$2();
					insert(_el$, createComponent(Section, {
						name: "PaidMessages.SetPrice",
						caption: "PaidMessages.SetPriceDescription",
						get captionArgs() {
							return [commissionPercents(), willReceiveDollars()];
						},
						get children() {
							return createComponent(StarRangeInput, {
								get value() {
									return props.store.stars;
								},
								get onChange() {
									return props.setStore.bind(null, "stars");
								}
							});
						}
					}), null);
					insert(_el$, createComponent(Section, {
						name: "PrivacyExceptions",
						caption: "PaidMessages.RemoveFeeDescription",
						get children() {
							return createComponent(Row, {
								clickable: onExceptionsClick,
								get children() {
									return [createComponent(Row.Title, { get children() {
										return i18n("PaidMessages.RemoveFee");
									} }), createComponent(Row.RightContent, { get children() {
										var _el$2 = _tmpl$();
										insert(_el$2, chosenPeersLabel);
										return _el$2;
									} })];
								}
							});
						}
					}), null);
					return _el$;
				}
			});
		}
	});
};
//#endregion
//#region src/components/sidebarLeft/tabs/privacy/messages/useSaveSettings.ts
var log$1 = logger("useSaveSettings");
var useSaveSettings = ({ store, globalPrivacy, isPaid, hasChanges, chosenPeersByType }) => {
	const { rootScope } = useHotReloadGuard();
	const [tab] = useSuperTab();
	const saveGlobalSettings = () => {
		const settings = structuredClone(globalPrivacy());
		settings.noncontact_peers_paid_stars = isPaid() ? store.stars : 0;
		settings.pFlags ?? (settings.pFlags = {});
		setBooleanFlag(settings.pFlags, "new_noncontact_peers_require_premium", store.option === MessagesPrivacyOption.ContactsAndPremium);
		log$1("saving settings :>> ", settings);
		const promise = rootScope.managers.appPrivacyManager.setGlobalPrivacySettings(settings);
		tab.payload.onSaved(promise);
		return promise;
	};
	const savePrivacyRules = async () => {
		const managers = bindManagersToSession(rootScope.managers);
		const rules = [];
		const { chats, users } = chosenPeersByType();
		rules.push(...defaultPrivacyRules);
		if (chats.length) rules.push({
			_: "inputPrivacyValueAllowChatParticipants",
			chats
		});
		if (users.length) rules.push({
			_: "inputPrivacyValueAllowUsers",
			users: await Promise.all(users.map((id) => managers.appUsersManager.getUserInput(id)))
		});
		log$1("saving rules :>> ", rules);
		return managers.appPrivacyManager.setPrivacy(privacyRulesInputKey, rules);
	};
	let isSaving = false;
	const saveAllSettings = async () => {
		if (isSaving || !hasChanges()) return;
		isSaving = true;
		try {
			await Promise.all([saveGlobalSettings(), isPaid() ? savePrivacyRules() : void 0]);
			tab.close();
		} finally {
			isSaving = false;
		}
	};
	return saveAllSettings;
};
//#endregion
//#region src/components/sidebarLeft/tabs/privacy/messages/utils.ts
var getUserId = (user) => {
	if (user instanceof Object) return user.user_id?.toPeerId(true);
	return user.toPeerId(true);
};
//#endregion
//#region src/components/sidebarLeft/tabs/privacy/messages/useSettings.ts
var useSettings = () => {
	const { rootScope, usePremium } = useHotReloadGuard();
	const promiseCollector = usePromiseCollector();
	const isPremium = usePremium();
	const [privacyRules] = createResource(() => {
		const promise = rootScope.managers.appPrivacyManager.getPrivacy(privacyRulesInputKey);
		promiseCollector.collect(promise);
		return promise;
	});
	const [globalPrivacy] = createResource(() => {
		const promise = rootScope.managers.appPrivacyManager.getGlobalPrivacySettings();
		promiseCollector.collect(promise);
		return promise;
	});
	const isReady = () => privacyRules.state === "ready" && globalPrivacy.state === "ready";
	const currentOption = () => {
		if (!isPremium()) return MessagesPrivacyOption.Everybody;
		if (globalPrivacy().noncontact_peers_paid_stars) return MessagesPrivacyOption.Paid;
		if (globalPrivacy().pFlags.new_noncontact_peers_require_premium) return MessagesPrivacyOption.ContactsAndPremium;
		return MessagesPrivacyOption.Everybody;
	};
	const currentAllowedUsers = () => privacyRules()?.filter((rule) => rule._ === "privacyValueAllowUsers")?.map((rule) => rule?.users).flat()?.map((user) => user.toPeerId()) || [];
	const currentAllowedChats = () => privacyRules()?.find((rule) => rule._ === "privacyValueAllowChatParticipants")?.chats?.map(getUserId)?.filter((v) => v !== void 0) || [];
	return {
		isReady,
		globalPrivacy,
		privacyRules,
		currentOption,
		currentAllowedUsers,
		currentAllowedChats
	};
};
//#endregion
//#region src/components/sidebarLeft/tabs/privacy/messages/useStateStore.ts
var useStateStore = ({ isReady, globalPrivacy, currentOption, currentAllowedChats, currentAllowedUsers }) => {
	let initialState = {};
	const [store, setStore] = createStore({});
	createComputed(() => {
		if (!isReady()) return;
		initialState = {
			option: currentOption(),
			stars: Number(globalPrivacy().noncontact_peers_paid_stars) || void 0,
			chosenPeers: [...currentAllowedUsers(), ...currentAllowedChats()]
		};
		setStore(reconcile(structuredClone(initialState)));
	});
	const isPaid = createMemo(() => store.option === MessagesPrivacyOption.Paid);
	const hasChanges = createMemo(() => {
		const ignoreKeys = !!!isPaid() ? ["chosenPeers", "stars"] : [];
		return !deepEqual(store, initialState, ignoreKeys);
	});
	const chosenPeersByType = () => ({
		chats: store.chosenPeers.filter((peer) => peer.isAnyChat()).map((peer) => peer.toChatId()),
		users: store.chosenPeers.filter((peer) => peer.isUser())
	});
	return [
		store,
		setStore,
		{
			hasChanges,
			isPaid,
			chosenPeersByType
		}
	];
};
//#endregion
//#region src/components/sidebarLeft/tabs/privacy/messages/tab.tsx
var log = logger("MessagesPrivacyTab");
var MessagesTab = () => {
	const [tab] = useSuperTab();
	const { isReady, globalPrivacy, privacyRules, currentOption, currentAllowedUsers, currentAllowedChats } = useSettings();
	const [store, setStore, { isPaid, hasChanges, chosenPeersByType }] = useStateStore({
		isReady,
		globalPrivacy,
		currentOption,
		currentAllowedChats,
		currentAllowedUsers
	});
	const saveAllSettings = useSaveSettings({
		store,
		globalPrivacy,
		isPaid,
		hasChanges,
		chosenPeersByType
	});
	tab.isConfirmationNeededOnClose = useIsConfirmationNeededOnClose({
		hasChanges,
		saveAllSettings,
		descriptionLangKey: "UnsavedChangesDescription.Privacy"
	});
	const [exitAnimationPromise, setExitAnimationPromise] = createSignal();
	if (DEBUG) createEffect(() => {
		log("privacyRules() :>> ", privacyRules());
		log("globalPrivacy() :>> ", globalPrivacy());
	});
	return createComponent(Show, {
		get when() {
			return isReady();
		},
		get children() {
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
							onClick: () => void saveAllSettings()
						});
					}
				}),
				createComponent(OptionsSection, {
					get isPaid() {
						return isPaid();
					},
					store,
					setStore,
					onExitAnimationPromise: setExitAnimationPromise
				}),
				createComponent(PaidSettingsSection, {
					get isPaid() {
						return isPaid();
					},
					store,
					setStore,
					get chosenPeersByType() {
						return chosenPeersByType();
					},
					get exitAnimationPromise() {
						return exitAnimationPromise();
					}
				})
			];
		}
	});
};
//#endregion
export { MessagesTab as default };
