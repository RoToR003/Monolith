//# allFunctionsCalledOnLoad
import { n as rootScope } from "./rootScope-CZS0lmz8.js";
import { a as i18n, r as _i18n, s as join } from "./langPack-BmdJGr44.js";
import { C as createSignal, i as For, p as createComponent, w as createUniqueId } from "./solid-9Vxm0VIz.js";
import { r as getCurrentAccount } from "./getCurrentAccount-D0KQFbZ6.js";
import { t as bindManagersToAccount } from "./bindManagersToAccount-BL82O9H9.js";
import { t as cancelEvent } from "./cancelEvent-Cw8vYZHp.js";
import { c as insert, g as template } from "./web-BPyQozky.js";
import { n as hotReloadGuard } from "./hotReloadGuardProvider-CHEsZRuG.js";
import { t as replaceContent } from "./replaceContent-Bi6ru3li.js";
import { i as Row } from "./confirmationPopup-Bz6mK0o-.js";
import { C as PrivacyType, S as getPrivacyRulesDetails } from "./getChatMigratedTo-ChhMNXuu.js";
import { t as anchorCallback } from "./anchorCallback-BbwAJdBk.js";
import { a as Section } from "./emailVerification-C8QYZSyu.js";
import { r as wrapSolidComponent } from "./wrapSolidComponent-BASCjNJG.js";
import { r as toastNew, t as hideToast } from "./toast-B6VD5M7R.js";
import { t as RadioFieldTsx } from "./radioFieldTsx-kmtuN4Dv.js";
import { t as convertKeyToInputKey } from "./convertKeyToInputKey-B-LMU_ro.js";
//#region src/lib/appManagers/utils/privacy/getPrivacyRulesToKeep.ts
var KEEP_NEXT_TO = {
	privacyValueAllowBots: (type) => type !== PrivacyType.Everybody,
	privacyValueDisallowBots: (type) => type !== PrivacyType.Nobody,
	privacyValueAllowCloseFriends: (type) => type !== PrivacyType.Everybody && type !== PrivacyType.Contacts,
	privacyValueDisallowContacts: (type) => type !== PrivacyType.Nobody && type !== PrivacyType.Contacts
};
/**
* The account's rules a privacy screen sends back as they are when it saves: it saves what it shows, and the rest -
* mini apps where it has no such exception, kinds no screen here shows - would be lost. `edited` are the kinds it shows
*/
function getPrivacyRulesToKeep(rules, type, edited = []) {
	return rules.filter((rule) => !edited.includes(rule._) && KEEP_NEXT_TO[rule._]?.(type)).map((rule) => ({ _: convertKeyToInputKey(rule._) }));
}
//#endregion
//#region src/components/privacySection.tsx
var _tmpl$ = /*#__PURE__*/ template(`<form>`);
var PREMIUM_CATEGORY = {
	key: "premium",
	icon: "premium_badge",
	text: "PrivacyPremium"
};
var MINI_APPS_CATEGORY = {
	key: "miniapps",
	icon: "bot_filled",
	text: "PrivacyMiniApps",
	statusLangKey: "PrivacyMiniAppsStatus"
};
var PrivacySection = class {
	constructor(options) {
		this.options = options;
		this.extras = {};
		this.onTabDestroy = async () => {
			const managers = bindManagersToAccount(rootScope.managers, getCurrentAccount());
			if (this.isLocked()) return;
			if (!this.options.inputKey) return;
			if (this.getEditedState(this.type) === this.loadedState) return;
			const rules = [];
			switch (this.type) {
				case PrivacyType.Everybody:
					rules.push({ _: "inputPrivacyValueAllowAll" });
					break;
				case PrivacyType.Contacts:
					rules.push({ _: "inputPrivacyValueAllowContacts" });
					break;
				case PrivacyType.Nobody: rules.push({ _: "inputPrivacyValueDisallowAll" });
			}
			if (this.peerIds) for (const [k, chatKey, usersKey, botsKey] of [[
				"allow",
				"inputPrivacyValueAllowChatParticipants",
				"inputPrivacyValueAllowUsers",
				"inputPrivacyValueAllowBots"
			], [
				"disallow",
				"inputPrivacyValueDisallowChatParticipants",
				"inputPrivacyValueDisallowUsers",
				"inputPrivacyValueDisallowBots"
			]]) {
				if (k === "allow" && this.type === PrivacyType.Everybody || k === "disallow" && this.type === PrivacyType.Nobody) continue;
				const _peerIds = this.peerIds[k];
				if (!_peerIds) continue;
				const splitted = this.splitPeersByType(_peerIds);
				if (splitted.chats.length) rules.push({
					_: chatKey,
					chats: splitted.chats
				});
				if (splitted.users.length) rules.push({
					_: usersKey,
					users: await Promise.all(splitted.users.map((id) => managers.appUsersManager.getUserInput(id)))
				});
				if (this.options.allowMiniApps && this.extras[k]?.has(MINI_APPS_CATEGORY.key)) rules.push({ _: botsKey });
				if (k === "allow" && this.extras[k]?.has(PREMIUM_CATEGORY.key)) rules.push({ _: "inputPrivacyValueAllowPremium" });
			}
			rules.push(...getPrivacyRulesToKeep(this.loadedRules, this.type, this.options.allowMiniApps ? ["privacyValueAllowBots", "privacyValueDisallowBots"] : []));
			managers.appPrivacyManager.setPrivacy(this.options.inputKey, rules);
		};
		this.onRadioChange = (value) => {
			value = +value;
			this.type = value;
			this.setSelectedType(value);
			this.replaceCaption();
			this.options.onRadioChange && this.options.onRadioChange(value);
		};
		if (options.captions) options.captions.reverse();
		const managers = options.managers;
		const rulesPromise = options.inputKey ? managers.appPrivacyManager.getPrivacy(options.inputKey) : Promise.resolve();
		let radioOptions = [
			{
				type: PrivacyType.Everybody,
				langKey: "PrivacySettingsController.Everbody"
			},
			{
				type: PrivacyType.Contacts,
				langKey: "PrivacySettingsController.MyContacts"
			},
			{
				type: PrivacyType.Nobody,
				langKey: "PrivacySettingsController.Nobody"
			}
		];
		if (options.myContactsAndPremium) {
			const rr = radioOptions.find((option) => option.type === PrivacyType.Contacts);
			rr.langKey = "PrivacyMessagesContactsAndPremium";
		}
		if (options.skipTypes) radioOptions = radioOptions.filter((option) => !options.skipTypes.includes(option.type));
		const [selectedType, setSelectedType] = createSignal();
		const [locked, setLocked] = createSignal(false);
		this.setSelectedType = setSelectedType;
		this.setLocked = setLocked;
		let radioContent, radioCaption;
		const radioContainer = wrapSolidComponent(() => {
			const _self$ = this;
			const name = createUniqueId();
			return createComponent(Section, {
				get name() {
					return options.title;
				},
				caption: true,
				contentProps: { ref: (element) => radioContent = element },
				captionRef: (element) => radioCaption = element,
				get children() {
					var _el$ = _tmpl$();
					insert(_el$, createComponent(For, {
						each: radioOptions,
						children: ({ type, langKey }) => {
							const isLocked = () => locked() && type !== PrivacyType.Everybody;
							return createComponent(Row, {
								get clickable() {
									return isLocked() ? (event) => {
										cancelEvent(event);
										toastNew({
											langPackKey: options.premiumError,
											langPackArguments: [anchorCallback(() => {
												hideToast();
												hotReloadGuard.showPremiumPopup();
											})]
										});
									} : void 0;
								},
								get children() {
									return [createComponent(Row.RadioField, { get children() {
										return createComponent(RadioFieldTsx, {
											get checked() {
												return selectedType() === type;
											},
											"class": "disable-hover",
											get locked() {
												return isLocked();
											},
											name,
											get value() {
												return String(type);
											},
											onChange: (checked) => checked && _self$.onRadioChange(type)
										});
									} }), createComponent(Row.Title, { get children() {
										return i18n(langKey);
									} })];
								}
							});
						}
					}));
					return _el$;
				}
			});
		}, options.tab.middlewareHelper.get());
		this.radioSection = {
			container: radioContainer,
			content: radioContent,
			caption: radioCaption
		};
		if (options.appendTo) options.appendTo.append(radioContainer);
		if (!options.noExceptions) {
			const createException = (key, titleLangKey, icon) => {
				const [subtitle, setSubtitle] = createSignal(i18n("PrivacySettingsController.AddUsers"));
				return {
					titleLangKey,
					key,
					icon,
					subtitle,
					setSubtitle
				};
			};
			this.exceptions = /* @__PURE__ */ new Map([["disallow", createException("disallow", options.exceptionTexts[0], "person_crossed_filled")], ["allow", createException("allow", options.exceptionTexts[1], "adduser")]]);
			let exceptionsContent;
			const exceptionsContainer = wrapSolidComponent(() => {
				const _self$2 = this;
				return createComponent(Section, {
					name: "PrivacyExceptions",
					caption: "PrivacySettingsController.PeerInfo",
					contentProps: { ref: (element) => exceptionsContent = element },
					get children() {
						return createComponent(For, {
							get each() {
								return [..._self$2.exceptions.values()];
							},
							children: (exception) => createComponent(Row, {
								get classList() {
									return { hide: exception.key === "allow" ? selectedType() === PrivacyType.Everybody : selectedType() === PrivacyType.Nobody };
								},
								clickable: () => {
									promise.then(() => {
										const _peerIds = _self$2.peerIds[exception.key];
										const _extras = _self$2.extras[exception.key] ?? (_self$2.extras[exception.key] = /* @__PURE__ */ new Set());
										const extraCategories = [exception.key === "allow" && (options.allowPremium || _extras.has(PREMIUM_CATEGORY.key)) && PREMIUM_CATEGORY, options.allowMiniApps && MINI_APPS_CATEGORY].filter(Boolean);
										options.tab.slider.createTab(hotReloadGuard.tabs.AppAddMembersTab).open({
											type: "privacy",
											skippable: true,
											title: exception.titleLangKey,
											placeholder: "PrivacyModal.Search.Placeholder",
											takeOut: (newPeerIds, newExtras) => {
												_peerIds.length = 0;
												_peerIds.push(...newPeerIds);
												_extras.clear();
												if (newExtras) for (const extra of newExtras) _extras.add(extra);
												exception.setSubtitle(_self$2.generateStr(_self$2.splitPeersByType(newPeerIds), _extras));
												_self$2.onRadioChange(_self$2.type);
											},
											selectedPeerIds: _peerIds,
											selectedExtras: new Set(_extras),
											extraCategories,
											...extraCategories.length && {
												extraCategoriesSectionLangKey: "PrivacyUserTypes",
												peersSectionLangKey: "PrivacyUsersAndGroups"
											}
										});
									});
								},
								get children() {
									return [
										createComponent(Row.Icon, { get icon() {
											return exception.icon;
										} }),
										createComponent(Row.Title, { get children() {
											return i18n(exception.titleLangKey);
										} }),
										createComponent(Row.Subtitle, { get children() {
											return exception.subtitle();
										} })
									];
								}
							})
						});
					}
				});
			}, options.tab.middlewareHelper.get());
			this.exceptionsSection = {
				container: exceptionsContainer,
				content: exceptionsContent
			};
			if (options.appendTo) options.appendTo.append(exceptionsContainer);
		}
		const promise = rulesPromise.then((rules) => {
			const details = rules ? getPrivacyRulesDetails(rules) : void 0;
			const originalType = options.privacyType || details?.type;
			if (details) {
				this.peerIds = {};
				this.extras = {};
				["allow", "disallow"].forEach((k) => {
					const arr = [];
					const from = k === "allow" ? details.allowPeers : details.disallowPeers;
					arr.push(...from.users.map((id) => id.toPeerId()));
					arr.push(...from.chats.map((id) => id.toPeerId(true)));
					this.peerIds[k] = arr;
					const extras = this.extras[k] = /* @__PURE__ */ new Set();
					if (options.allowMiniApps && (k === "allow" ? details.allowMiniApps : details.disallowMiniApps)) extras.add(MINI_APPS_CATEGORY.key);
					if (k === "allow" && (details.allowPremium || options.allowPremium && originalType === PrivacyType.Everybody)) extras.add(PREMIUM_CATEGORY.key);
					this.exceptions?.get(k).setSubtitle(this.generateStr(from, extras));
				});
			}
			this.loadedRules = rules || [];
			this.loadedState = this.getEditedState(originalType);
			if (options.premiumOnly) {
				const toggleLock = () => {
					const locked = this.isLocked();
					this.setLocked(locked);
					this.setRadio(this.isLocked() ? PrivacyType.Everybody : originalType);
					if (this.exceptionsSection) this.exceptionsSection.container.classList.toggle("hide", locked);
				};
				toggleLock();
				options.tab.listenerSetter.add(rootScope)("premium_toggle", toggleLock);
			} else this.setRadio(this.isLocked() ? PrivacyType.Everybody : originalType);
			options.tab.eventListener.addEventListener("destroy", this.onTabDestroy, { once: true });
		});
	}
	isLocked() {
		return this.options.premiumOnly && !rootScope.premium;
	}
	getEditedState(type) {
		const sorted = (values = []) => [...values].map(String).sort();
		return JSON.stringify([type, ...["allow", "disallow"].map((k) => [sorted(this.peerIds?.[k]), sorted(this.extras[k])])]);
	}
	replaceCaption(caption = this.isLocked() ? this.options.premiumCaption : this.options.captions[this.type]) {
		const captionElement = this.radioSection.caption;
		if (!caption) captionElement.replaceChildren();
		else if (caption instanceof HTMLElement) replaceContent(captionElement, caption);
		else _i18n(captionElement, caption);
		captionElement.classList.toggle("hide", !caption);
	}
	setRadio(type) {
		this.onRadioChange(type);
	}
	splitPeersByType(peerIds) {
		const peers = {
			users: [],
			chats: []
		};
		peerIds.forEach((peerId) => {
			peers[peerId.isAnyChat() ? "chats" : "users"].push(peerId.isAnyChat() ? peerId.toChatId() : peerId);
		});
		return peers;
	}
	generateStr(peers, extras) {
		const hasMiniApps = extras?.has(MINI_APPS_CATEGORY.key);
		const hasPremium = extras?.has(PREMIUM_CATEGORY.key);
		if (!peers.users.length && !peers.chats.length && !hasMiniApps && !hasPremium) return [i18n("PrivacySettingsController.AddUsers")];
		return join([
			hasPremium ? i18n(PREMIUM_CATEGORY.text) : null,
			peers.users.length ? i18n("Users", [peers.users.length]) : null,
			peers.chats.length ? i18n("Chats", [peers.chats.length]) : null,
			hasMiniApps ? i18n(MINI_APPS_CATEGORY.text) : null
		].filter(Boolean), false);
	}
};
//#endregion
export { PrivacySection as t };
