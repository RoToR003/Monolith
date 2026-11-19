//# allFunctionsCalledOnLoad
import { t as noop } from "./noop-H9NNBLfX.js";
import { t as Icon } from "./icon-DbP6Es97.js";
import { t as apiManagerProxy } from "./apiManagerProxy-DmQXvxSF.js";
import { n as rootScope } from "./rootScope-CZS0lmz8.js";
import { a as i18n } from "./langPack-BmdJGr44.js";
import { C as createSignal, N as onMount, g as createEffect, i as For, p as createComponent, s as Show, x as createRoot } from "./solid-9Vxm0VIz.js";
import { t as joinDeepPath } from "./setDeepProperty-IYhQYgHt.js";
import { n as createStore } from "./store-PwRn5fa3.js";
import { n as useContentSettings } from "./contentSettings-DMhHR-0w.js";
import { c as insert, g as template } from "./web-BPyQozky.js";
import { n as hotReloadGuard } from "./hotReloadGuardProvider-CHEsZRuG.js";
import { t as Button } from "./buttonTsx-Bwphkm9r.js";
import { p as clearSensitiveSpoilers } from "./sticker-5twBOy1Y.js";
import { R as findExistingOrCreateCustomOption, i as Row, r as showPeerPopup, s as CheckboxFieldTsx, t as confirmationPopup } from "./confirmationPopup-Bz6mK0o-.js";
import { C as PrivacyType, S as getPrivacyRulesDetails } from "./getChatMigratedTo-ChhMNXuu.js";
import { ft as showPasskeyPopup } from "./appDialogsManager-CXguiKc3.js";
import { i as usePromiseCollector } from "./mediaHeader-CnpQNwOl.js";
import { a as Section, i as wrapEmailPattern } from "./emailVerification-C8QYZSyu.js";
import { r as toastNew } from "./toast-B6VD5M7R.js";
import { t as toggleDisability } from "./toggleDisability-2oUcKWqw.js";
import { n as useSuperTab } from "./superTabProvider-LtveyH7W.js";
import { t as toastError } from "./toastError-BSN4cjN_.js";
import { t as createOptimisticSave } from "./createOptimisticSave-CgP3bGGy.js";
import { t as renderComponent } from "./renderComponent-eWfIuOhm.js";
import createAgeVerification from "./ageVerification-Dd8fkLAD.js";
import { n as InactivityPeriodRow, t as ACCOUNT_TTL_OPTIONS } from "./inactivityPeriodRow-CubtXQqx.js";
import { openChangeLoginEmailTab } from "./changeLoginEmail-BJ9INv6_.js";
import { t as convertKeyToInputKey } from "./convertKeyToInputKey-B-LMU_ro.js";
import { n as IS_WEB_AUTHN_SUPPORTED } from "./getInputPasskeyResponse-DRILbzue.js";
//#region src/components/sidebarLeft/tabs/privacyAndSecurity.tsx
var _tmpl$ = /*#__PURE__*/ template(`<span dir=ltr>`);
var PrivacyAndSecurity = () => {
	const [tab] = useSuperTab();
	const promiseCollector = usePromiseCollector();
	const p = tab.payload;
	const contentSettings = useContentSettings();
	let sessionsContent;
	let privacyContent;
	let newChatsContent;
	let sensitiveContent;
	let clearButton;
	let deleteButton;
	const [privacyCaption, setPrivacyCaption] = createSignal();
	const [newChatsHidden, setNewChatsHidden] = createSignal(false);
	const [sensitiveHidden, setSensitiveHidden] = createSignal(true);
	const topPeersSignal = createSignal();
	const accountTTLSignal = createSignal(0);
	const saveTopPeers = createOptimisticSave((enabled) => {
		return tab.managers.appUsersManager.toggleTopPeers(enabled);
	}, (enabled) => {
		topPeersSignal[1](enabled);
		toastNew({ langPackKey: "Error.AnError" });
	}, () => tab.managers.appUsersManager.isTopPeersEnabled());
	const onTopPeersChange = (enabled) => saveTopPeers(enabled, !enabled);
	const onClearClick = () => {
		const options = {
			titleLangKey: "PrivacyPaymentsClearAlertTitle",
			descriptionLangKey: "PrivacyPaymentsClearAlertText",
			button: { langKey: "Clear" },
			checkboxes: [{
				text: "PrivacyClearShipping",
				checked: true
			}, {
				text: "PrivacyClearPayment",
				checked: true
			}]
		};
		confirmationPopup(options).then(() => {
			const [info, payment] = options.checkboxes.map((c) => c.checkboxField.checked);
			const toggle = toggleDisability([clearButton], true);
			tab.managers.appPaymentsManager.clearSavedInfo(info, payment).then(() => {
				if (!info && !payment) return;
				toastNew({ langPackKey: info && payment ? "PrivacyPaymentsPaymentShippingCleared" : info ? "PrivacyPaymentsShippingInfoCleared" : "PrivacyPaymentsPaymentInfoCleared" });
			}, (err) => {
				toastError(err, "clear saved info error");
			}).finally(toggle);
		}, noop);
	};
	const onDeleteClick = () => {
		showPeerPopup("popup-delete-drafts", {
			buttons: [{
				langKey: "Delete",
				callback: () => {
					const toggle = toggleDisability([deleteButton], true);
					tab.managers.appDraftsManager.clearAllDrafts().catch((err) => {
						toastError(err, "clear drafts error");
					}).finally(toggle);
				},
				isDanger: true
			}],
			titleLangKey: "AreYouSureClearDraftsTitle",
			descriptionLangKey: "AreYouSureClearDrafts"
		});
	};
	onMount(() => {
		tab.container.classList.add("dont-u-dare-block-me");
		const build = async () => {
			const SUBTITLE = "Loading";
			const promises = [];
			{
				let blockedPeerIds;
				let passwordState;
				let websites;
				let passkeys;
				let setPasskeys;
				let autoDeletePeriod;
				const [blockedSubtitle, setBlockedSubtitle] = createSignal(i18n(SUBTITLE));
				const [blockedFrozen, setBlockedFrozen] = createSignal(true);
				const [websitesSubtitle, setWebsitesSubtitle] = createSignal(i18n(SUBTITLE));
				const [websitesFrozen, setWebsitesFrozen] = createSignal(true);
				const [websitesHidden, setWebsitesHidden] = createSignal(false);
				const [autoDeleteSubtitle, setAutoDeleteSubtitle] = createSignal(i18n(SUBTITLE));
				const [autoDeleteFrozen, setAutoDeleteFrozen] = createSignal(true);
				const [passcodeSubtitle, setPasscodeSubtitle] = createSignal(i18n(SUBTITLE));
				const [passcodeFrozen, setPasscodeFrozen] = createSignal(true);
				const [twoFactorSubtitle, setTwoFactorSubtitle] = createSignal(i18n(SUBTITLE));
				const [twoFactorFrozen, setTwoFactorFrozen] = createSignal(true);
				const [emailSubtitle, setEmailSubtitle] = createSignal(i18n(SUBTITLE));
				const [emailFrozen, setEmailFrozen] = createSignal(true);
				const [emailHidden, setEmailHidden] = createSignal(true);
				const [passkeysSubtitle, setPasskeysSubtitle] = createSignal(i18n(SUBTITLE));
				const [passkeysFrozen, setPasskeysFrozen] = createSignal(true);
				const [passkeysHidden, setPasskeysHidden] = createSignal(false);
				const openPasskeysTab = () => {
					tab.slider.createTab(hotReloadGuard.tabs.AppPasskeysTab).open({
						passkeys,
						setPasskeys
					});
				};
				const updateActiveWebsites = (promise = tab.managers.appSeamlessLoginManager.getWebAuthorizations()) => {
					return promise.then((authorizations) => {
						websites = authorizations;
						setWebsitesSubtitle(i18n("Privacy.Websites", [websites.length]));
						setWebsitesHidden(!websites.length);
						setWebsitesFrozen(false);
					});
				};
				const updatePasskeys = () => {
					setPasskeysFrozen(true);
					return Promise.all([tab.managers.apiManager.getAppConfig(), tab.managers.appAccountManager.getPasskeys()]).then(([appConfig, passkeysResult]) => {
						setPasskeysFrozen(false);
						[passkeys, setPasskeys] = createStore(passkeysResult.passkeys);
						createRoot((dispose) => {
							tab.middlewareHelper.onDestroy(dispose);
							createEffect(() => {
								setPasskeysSubtitle(i18n("Passkeys", [passkeys.length]));
								setPasskeysHidden(!passkeys.length && (!appConfig.settings_display_passkeys || !IS_WEB_AUTHN_SUPPORTED));
							});
						});
					});
				};
				renderComponent({
					element: sessionsContent,
					Component: () => [
						createComponent(Row, {
							clickable: () => {
								if (!blockedFrozen()) tab.slider.createTab(hotReloadGuard.tabs.AppBlockedUsersTab).open({ peerIds: blockedPeerIds });
							},
							get children() {
								return [
									createComponent(Row.Icon, { icon: "person_crossed_filled" }),
									createComponent(Row.Title, { get children() {
										return i18n("BlockedUsers");
									} }),
									createComponent(Row.Subtitle, { get children() {
										return blockedSubtitle();
									} })
								];
							}
						}),
						createComponent(Row, {
							get classList() {
								return { hide: websitesHidden() };
							},
							clickable: () => {
								if (websitesFrozen()) return;
								const webTab = tab.slider.createTab(hotReloadGuard.tabs.AppActiveWebSessionsTab);
								webTab.eventListener.addEventListener("destroy", () => {
									updateActiveWebsites();
								});
								webTab.open(websites);
							},
							get children() {
								return [
									createComponent(Row.Icon, { icon: "mention_filled" }),
									createComponent(Row.Title, { get children() {
										return i18n("OtherWebSessions");
									} }),
									createComponent(Row.Subtitle, { get children() {
										return websitesSubtitle();
									} })
								];
							}
						}),
						createComponent(Row, {
							clickable: () => {
								if (autoDeleteFrozen() || isNaN(autoDeletePeriod)) return;
								tab.slider.createTab(hotReloadGuard.tabs.AppMessagesAutoDeleteTab).open({
									period: autoDeletePeriod,
									onSaved: (period) => {
										autoDeletePeriod = period;
										updateAutoDeleteRow();
									}
								});
							},
							get children() {
								return [
									createComponent(Row.Icon, { icon: "auto_delete_filled" }),
									createComponent(Row.Title, { get children() {
										return i18n("AutoDeleteMessages");
									} }),
									createComponent(Row.Subtitle, { get children() {
										return autoDeleteSubtitle();
									} })
								];
							}
						}),
						createComponent(Row, {
							clickable: () => !passcodeFrozen() && hotReloadGuard.tabs.AppPasscodeLockTab.openChecked(tab.slider),
							get children() {
								return [
									createComponent(Row.Icon, { icon: "key_filled" }),
									createComponent(Row.Title, { get children() {
										return i18n("PasscodeLock.Item.Title");
									} }),
									createComponent(Row.Subtitle, { get children() {
										return passcodeSubtitle();
									} })
								];
							}
						}),
						createComponent(Row, {
							clickable: () => !twoFactorFrozen() && hotReloadGuard.tabs.AppTwoStepVerificationTab.openChecked(tab.slider, passwordState),
							get children() {
								return [
									createComponent(Row.Icon, { icon: "two_factor_auth_filled" }),
									createComponent(Row.Title, { get children() {
										return i18n("TwoStepVerification");
									} }),
									createComponent(Row.Subtitle, { get children() {
										return twoFactorSubtitle();
									} })
								];
							}
						}),
						createComponent(Show, {
							get when() {
								return !emailHidden();
							},
							get children() {
								return createComponent(Row, {
									clickable: () => {
										if (emailFrozen()) return;
										openChangeLoginEmailTab(tab.slider, passwordState);
									},
									get children() {
										return [
											createComponent(Row.Icon, { icon: "email_filled" }),
											createComponent(Row.Title, { get children() {
												return i18n("LoginEmail");
											} }),
											createComponent(Row.Subtitle, { get children() {
												return emailSubtitle();
											} })
										];
									}
								});
							}
						}),
						createComponent(Row, {
							get classList() {
								return { hide: passkeysHidden() };
							},
							clickable: () => {
								if (passkeysFrozen()) return;
								if (passkeys.length) {
									openPasskeysTab();
									return;
								}
								showPasskeyPopup((passkey) => {
									setPasskeys([passkey]);
									openPasskeysTab();
								});
							},
							get children() {
								return [
									createComponent(Row.Icon, { icon: "faceid_filled" }),
									createComponent(Row.Title, { get children() {
										return i18n("Privacy.Passkeys");
									} }),
									createComponent(Row.Subtitle, { get children() {
										return passkeysSubtitle();
									} })
								];
							}
						})
					],
					middleware: tab.middlewareHelper.get()
				});
				const setBlockedCount = (count) => {
					setBlockedSubtitle(i18n(count ? "PrivacySettingsController.UserCount" : "BlockedEmpty", [count]));
				};
				tab.listenerSetter.add(rootScope)("peer_block", () => {
					updateBlocked();
				});
				const updateBlocked = () => {
					tab.managers.appUsersManager.getBlocked().then((res) => {
						setBlockedCount(res.count);
						blockedPeerIds = res.peerIds;
						setBlockedFrozen(false);
					});
				};
				updateBlocked();
				tab.managers.passwordManager.getState().then((state) => {
					passwordState = state;
					setTwoFactorSubtitle(i18n(state.pFlags.has_password ? "PrivacyAndSecurity.Item.On" : "PrivacyAndSecurity.Item.Off"));
					setTwoFactorFrozen(false);
					if (state.login_email_pattern) {
						setEmailSubtitle(wrapEmailPattern(state.login_email_pattern));
						setEmailFrozen(false);
						setEmailHidden(false);
					}
				});
				const setPasscodeEnabledState = (enabled) => {
					setPasscodeSubtitle(i18n(enabled ? "PrivacyAndSecurity.Item.On" : "PrivacyAndSecurity.Item.Off"));
				};
				tab.managers.appStateManager.getState().then((state) => {
					setPasscodeEnabledState(state.settings?.passcode?.enabled || false);
					setPasscodeFrozen(false);
				});
				tab.listenerSetter.add(rootScope)("settings_updated", ({ key, value }) => {
					if (key === joinDeepPath("settings", "passcode", "enabled")) setPasscodeEnabledState(value);
				});
				promises.push(updateActiveWebsites(p.webAuthorizations));
				updatePasskeys();
				function updateAutoDeleteRow() {
					setAutoDeleteSubtitle(!autoDeletePeriod ? i18n("Off") : findExistingOrCreateCustomOption(autoDeletePeriod).label());
				}
				(async () => {
					autoDeletePeriod = await tab.managers.appPrivacyManager.getDefaultAutoDeletePeriod();
					updateAutoDeleteRow();
					setAutoDeleteFrozen(false);
				})();
			}
			{
				const isPremiumFeaturesHidden = await apiManagerProxy.isPremiumFeaturesHidden();
				setPrivacyCaption(isPremiumFeaturesHidden ? "GroupsAndChannelsHelp" : "Privacy.MessagesCaption");
				const rowsByKeys = {};
				const rows = [];
				const addRow = (key, title, clickable) => {
					rowsByKeys[key] = createSignal(i18n(SUBTITLE));
					rows.push({
						key,
						title,
						clickable
					});
				};
				const openTabWithGlobalPrivacy = async (constructor, key) => {
					const globalPrivacy = await p.globalPrivacy;
					const subTab = tab.slider.createTab(constructor);
					subTab.open(globalPrivacy);
					subTab.eventListener.addEventListener("privacy", (privacy) => {
						p.globalPrivacy = privacy;
						updatePrivacyRow(key);
					});
				};
				addRow("inputPrivacyKeyPhoneNumber", i18n("PrivacyPhoneTitle"), () => {
					tab.slider.createTab(hotReloadGuard.tabs.AppPrivacyPhoneNumberTab).open();
				});
				addRow("inputPrivacyKeyStatusTimestamp", i18n("LastSeenTitle"), () => {
					openTabWithGlobalPrivacy(hotReloadGuard.tabs.AppPrivacyLastSeenTab, "inputPrivacyKeyStatusTimestamp");
				});
				addRow("inputPrivacyKeyProfilePhoto", i18n("PrivacyProfilePhotoTitle"), () => {
					tab.slider.createTab(hotReloadGuard.tabs.AppPrivacyProfilePhotoTab).open();
				});
				addRow("inputPrivacyKeyAbout", i18n("Privacy.BioRow"), () => {
					tab.slider.createTab(hotReloadGuard.tabs.AppPrivacyAboutTab).open();
				});
				addRow("inputPrivacyKeyPhoneCall", i18n("WhoCanCallMe"), () => {
					tab.slider.createTab(hotReloadGuard.tabs.AppPrivacyCallsTab).open();
				});
				addRow("inputPrivacyKeyForwards", i18n("PrivacyForwardsTitle"), () => {
					tab.slider.createTab(hotReloadGuard.tabs.AppPrivacyForwardMessagesTab).open();
				});
				addRow("inputPrivacyKeyChatInvite", i18n("WhoCanAddMe"), () => {
					tab.slider.createTab(hotReloadGuard.tabs.AppPrivacyAddToGroupsTab).open();
				});
				const createPremiumTitle = (langKey) => {
					const fragment = document.createDocumentFragment();
					const icon = Icon("star", "privacy-premium-icon");
					fragment.append(i18n(langKey), icon);
					const onPremium = () => {
						icon.classList.toggle("hide", !rootScope.premium);
					};
					onPremium();
					tab.listenerSetter.add(rootScope)("premium_toggle", onPremium);
					return fragment;
				};
				if (!isPremiumFeaturesHidden) {
					addRow("inputPrivacyKeyVoiceMessages", createPremiumTitle("PrivacyVoiceMessagesTitle"), () => {
						tab.slider.createTab(hotReloadGuard.tabs.AppPrivacyVoicesTab).open();
					});
					addRow("new_noncontact_peers_require_premium", createPremiumTitle("PrivacyMessagesTitle"), () => {
						tab.slider.createTab(hotReloadGuard.tabs.AppPrivacyMessagesTab).open({ onSaved: (updatedPrivacy) => {
							p.globalPrivacy = updatedPrivacy;
							updatePrivacyRow("new_noncontact_peers_require_premium");
						} });
					});
				}
				addRow("inputPrivacyKeyBirthday", i18n("Privacy.BirthdayRow"), () => {
					tab.slider.createTab(hotReloadGuard.tabs.AppPrivacyBirthdayTab).open();
				});
				addRow("inputPrivacyKeyStarGiftsAutoSave", i18n("Privacy.GiftsRow"), () => {
					openTabWithGlobalPrivacy(hotReloadGuard.tabs.AppPrivacyGiftsTab, "inputPrivacyKeyStarGiftsAutoSave");
				});
				addRow("inputPrivacyKeySavedMusic", i18n("Privacy.SavedMusicRow"), () => {
					tab.slider.createTab(hotReloadGuard.tabs.AppPrivacySavedMusicTab).open();
				});
				renderComponent({
					element: privacyContent,
					Component: () => createComponent(For, {
						each: rows,
						children: (row) => createComponent(Row, {
							get clickable() {
								return row.clickable;
							},
							get children() {
								return [createComponent(Row.Title, { get children() {
									return row.title;
								} }), createComponent(Row.Subtitle, { get children() {
									return rowsByKeys[row.key][0]();
								} })];
							}
						})
					}),
					middleware: tab.middlewareHelper.get()
				});
				const updatePrivacyRow = (key) => {
					const subtitleSignal = rowsByKeys[key];
					if (!subtitleSignal) return;
					const map = {
						[PrivacyType.Everybody]: "PrivacySettingsController.Everbody",
						[PrivacyType.Contacts]: "PrivacySettingsController.MyContacts",
						[PrivacyType.Nobody]: "PrivacySettingsController.Nobody"
					};
					const getLangKeyForMessagesPrivacy = (globalPrivacy) => {
						if (!rootScope.premium) return map[PrivacyType.Everybody];
						if (+globalPrivacy.noncontact_peers_paid_stars) return "PrivacySettingsController.Paid";
						if (globalPrivacy.pFlags.new_noncontact_peers_require_premium) return "Privacy.ContactsAndPremium";
						return map[PrivacyType.Everybody];
					};
					if (!key.startsWith("inputPrivacy")) {
						p.globalPrivacy.then((globalPrivacy) => {
							const langKey = getLangKeyForMessagesPrivacy(globalPrivacy);
							subtitleSignal[1](i18n(langKey));
						});
						return;
					}
					tab.managers.appPrivacyManager.getPrivacy(key).then((rules) => {
						const details = getPrivacyRulesDetails(rules);
						let langKey = map[details.type];
						if (details.type === PrivacyType.Nobody && details.allowPremium) langKey = "PrivacyPremium";
						else if (details.type === PrivacyType.Contacts && details.allowPremium) langKey = "Privacy.ContactsAndPremium";
						else if (details.type === PrivacyType.Nobody && details.allowMiniApps) langKey = "PrivacyMiniApps";
						else if (details.type === PrivacyType.Everybody && details.disallowMiniApps) langKey = "PrivacyNoMiniApps";
						else if (details.type === PrivacyType.Contacts && details.allowMiniApps) langKey = "PrivacyContactsAndMiniApps";
						const disallowLength = details.disallowPeers.users.length + details.disallowPeers.chats.length;
						const allowLength = details.allowPeers.users.length + details.allowPeers.chats.length;
						const subtitle = [i18n(langKey)];
						if (disallowLength || allowLength) {
							const counts = `(${[-disallowLength, allowLength ? "+" + allowLength : 0].filter(Boolean).join(", ")})`;
							subtitle.push(" ", (() => {
								var _el$ = _tmpl$();
								insert(_el$, counts);
								return _el$;
							})());
						}
						subtitleSignal[1](subtitle);
					});
				};
				for (const key in rowsByKeys) updatePrivacyRow(key);
				tab.listenerSetter.add(rootScope)("privacy_update", (update) => {
					updatePrivacyRow(convertKeyToInputKey(update.key._));
				});
			}
			{
				const archiveAndMuteSignal = createSignal(false);
				renderComponent({
					element: newChatsContent,
					Component: () => createComponent(Row, { get children() {
						return [createComponent(Row.CheckboxFieldToggle, { get children() {
							return createComponent(CheckboxFieldTsx, {
								signal: archiveAndMuteSignal,
								toggle: true
							});
						} }), createComponent(Row.Title, { get children() {
							return i18n("ArchiveAndMute");
						} })];
					} }),
					middleware: tab.middlewareHelper.get()
				});
				let enabled, destroyed;
				tab.eventListener.addEventListener("destroy", async () => {
					destroyed = true;
					if (enabled === void 0 || enabled === archiveAndMuteSignal[0]()) return;
					return tab.managers.appPrivacyManager.setGlobalPrivacySettings({
						_: "globalPrivacySettings",
						pFlags: {
							...(await p.globalPrivacy).pFlags,
							archive_and_mute_new_noncontact_peers: archiveAndMuteSignal[0]() || void 0
						}
					});
				}, { once: true });
				const promise = Promise.all([p.appConfig, p.globalPrivacy]).then(([appConfig, settings]) => {
					if (destroyed) return;
					const onPremiumToggle = (isPremium) => {
						setNewChatsHidden(!isPremium && !appConfig.autoarchive_setting_available);
					};
					tab.listenerSetter.add(rootScope)("premium_toggle", onPremiumToggle);
					onPremiumToggle(rootScope.premium);
					enabled = !!settings.pFlags.archive_and_mute_new_noncontact_peers;
					archiveAndMuteSignal[1](enabled);
				});
				promises.push(promise);
			}
			{
				const sensitiveSignal = createSignal(false);
				let pendingChange = false;
				const onSensitiveChange = (newEnabled) => {
					if (pendingChange) {
						sensitiveSignal[1](!newEnabled);
						return;
					}
					if (newEnabled && contentSettings.needAgeVerification()) {
						sensitiveSignal[1](false);
						createAgeVerification().then((verified) => {
							if (verified) {
								sensitiveSignal[1](true);
								clearSensitiveSpoilers();
							}
						});
						return;
					}
					pendingChange = true;
					tab.managers.appPrivacyManager.setContentSettings({ sensitive_enabled: newEnabled }).then(() => {
						if (newEnabled) clearSensitiveSpoilers();
					}, () => {
						toastNew({ langPackKey: "Error.AnError" });
						sensitiveSignal[1](!newEnabled);
					}).finally(() => {
						pendingChange = false;
					});
				};
				renderComponent({
					element: sensitiveContent,
					Component: () => createComponent(Row, { get children() {
						return [createComponent(Row.CheckboxFieldToggle, { get children() {
							return createComponent(CheckboxFieldTsx, {
								signal: sensitiveSignal,
								toggle: true,
								onChange: onSensitiveChange
							});
						} }), createComponent(Row.Title, { get children() {
							return i18n("PrivacyAndSecurity.SensitiveText");
						} })];
					} }),
					middleware: tab.middlewareHelper.get()
				});
				if (contentSettings.sensitiveCanChange()) {
					sensitiveSignal[1](contentSettings.sensitiveEnabled());
					setSensitiveHidden(false);
				}
			}
			promises.push(tab.managers.appUsersManager.isTopPeersEnabled().then(topPeersSignal[1], noop));
			tab.managers.appAccountManager.getAccountTTL().then(accountTTLSignal[1], noop);
			await Promise.all(promises);
		};
		promiseCollector.collect(build());
	});
	return [
		createComponent(Section, {
			caption: "SessionsInfo",
			noDelimiter: true,
			contentProps: { ref: (el) => sessionsContent = el }
		}),
		createComponent(Section, {
			name: "PrivacyTitle",
			get caption() {
				return privacyCaption();
			},
			contentProps: {
				ref: (el) => privacyContent = el,
				class: "privacy-navigation-container"
			}
		}),
		createComponent(Section, {
			name: "NewChatsFromNonContacts",
			caption: "ArchiveAndMuteInfo",
			get classList() {
				return { hide: newChatsHidden() };
			},
			contentProps: { ref: (el) => newChatsContent = el }
		}),
		createComponent(Section, {
			name: "Privacy.SensitiveContent",
			caption: "PrivacyAndSecurity.SensitiveDesc",
			get classList() {
				return { hide: sensitiveHidden() };
			},
			contentProps: { ref: (el) => sensitiveContent = el }
		}),
		createComponent(Section, {
			name: "PrivacyPayments",
			caption: "PrivacyPaymentsClearInfo",
			get children() {
				return createComponent(Button, {
					ref(r$) {
						var _ref$ = clearButton;
						typeof _ref$ === "function" ? _ref$(r$) : clearButton = r$;
					},
					"class": "btn-primary btn-transparent",
					icon: "delete",
					text: "PrivacyPaymentsClear",
					onClick: onClearClick
				});
			}
		}),
		createComponent(Section, {
			name: "FilterChats",
			get children() {
				return createComponent(Button, {
					ref(r$) {
						var _ref$2 = deleteButton;
						typeof _ref$2 === "function" ? _ref$2(r$) : deleteButton = r$;
					},
					"class": "btn-primary btn-transparent",
					icon: "delete",
					text: "PrivacyDeleteCloudDrafts",
					onClick: onDeleteClick
				});
			}
		}),
		createComponent(Section, {
			name: "Contacts",
			caption: "SuggestContactsInfo",
			get children() {
				return createComponent(Row, { get children() {
					return [createComponent(Row.CheckboxFieldToggle, { get children() {
						return createComponent(CheckboxFieldTsx, {
							signal: topPeersSignal,
							toggle: true,
							get disabled() {
								return topPeersSignal[0]() === void 0;
							},
							onChange: onTopPeersChange
						});
					} }), createComponent(Row.Title, { get children() {
						return i18n("SuggestContacts");
					} })];
				} });
			}
		}),
		createComponent(Section, {
			name: "DeleteAccountTitle",
			caption: "DeleteAccountHelp",
			get children() {
				return createComponent(InactivityPeriodRow, {
					title: "DeleteAccountIfAwayFor2",
					options: ACCOUNT_TTL_OPTIONS,
					days: accountTTLSignal,
					save: (days) => tab.managers.appAccountManager.setAccountTTL(days),
					reload: () => tab.managers.appAccountManager.getAccountTTL()
				});
			}
		})
	];
};
//#endregion
export { PrivacyAndSecurity as default };
