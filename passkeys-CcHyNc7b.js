//# allFunctionsCalledOnLoad
import { C as createSignal, g as createEffect, i as For, p as createComponent, s as Show, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { n as bindManagersToSession } from "./bindManagersToAccount-BL82O9H9.js";
import { s as useAppConfig } from "./contentSettings-DMhHR-0w.js";
import { c as insert, g as template, o as className } from "./web-BPyQozky.js";
import { r as useHotReloadGuard } from "./hotReloadGuard-BUNVkeQ4.js";
import { t as Button } from "./buttonTsx-Bwphkm9r.js";
import { i as findAndSplice } from "./parseEntities-C5qsCJ5K.js";
import { o as createMiddleware } from "./sticker-5twBOy1Y.js";
import { dt as createPasskey, ft as showPasskeyPopup } from "./appDialogsManager-CXguiKc3.js";
import { t as MediaHeader } from "./mediaHeader-CnpQNwOl.js";
import { t as anchorCallback } from "./anchorCallback-BbwAJdBk.js";
import { a as Section } from "./emailVerification-C8QYZSyu.js";
import { n as useSuperTab } from "./superTabProvider-LtveyH7W.js";
import { n as IS_WEB_AUTHN_SUPPORTED } from "./getInputPasskeyResponse-DRILbzue.js";
var passkeys_module_default = {
	container: "_container_tjnis_1",
	items: "_items_tjnis_5"
};
//#endregion
//#region src/components/sidebarLeft/tabs/passkeys.tsx
var _tmpl$ = /*#__PURE__*/ template(`<div>`);
var PasskeyItem = (passkey) => {
	const [tab] = useSuperTab();
	const { rootScope, wrapEmojiText, wrapAdaptiveCustomEmoji, Row, i18n, confirmationPopup, formatDate } = useHotReloadGuard();
	const [disabled, setDisabled] = createSignal(false);
	const subtitle = () => {
		const created = i18n("Privacy.Passkey.Created", [formatDate(/* @__PURE__ */ new Date(passkey.date * 1e3), { withTime: true })]);
		if (!passkey.last_usage_date) return created;
		return [
			created,
			" • ",
			i18n("Privacy.Passkey.LastUsage", [formatDate(/* @__PURE__ */ new Date(passkey.last_usage_date * 1e3), { withTime: true })])
		];
	};
	return createComponent(Row, {
		get disabled() {
			return disabled();
		},
		contextMenu: { buttons: [{
			icon: "delete",
			text: "Delete",
			onClick: async () => {
				const managers = bindManagersToSession(rootScope.managers);
				await confirmationPopup({
					titleLangKey: "Passkey.Deletion.Title",
					descriptionLangKey: "Passkey.Deletion.Text",
					button: {
						langKey: "Delete",
						isDanger: true
					}
				});
				setDisabled(true);
				managers.appAccountManager.deletePasskey(passkey.id).finally(() => {
					tab.payload.setPasskeys((passkeys) => {
						const arr = [...passkeys];
						findAndSplice(arr, (item) => item.id === passkey.id);
						return arr;
					});
				});
			},
			danger: true
		}] },
		get children() {
			return [
				createComponent(Show, {
					get when() {
						return !passkey.software_emoji_id;
					},
					get children() {
						return createComponent(Row.Icon, { icon: "key_filled" });
					}
				}),
				createComponent(Row.Title, {
					"class": "text-bold",
					get children() {
						return wrapEmojiText(passkey.name);
					}
				}),
				createComponent(Row.Subtitle, { get children() {
					return subtitle();
				} }),
				createComponent(Show, {
					get when() {
						return passkey.software_emoji_id;
					},
					get children() {
						return createComponent(Row.Media, {
							size: "abitbigger",
							get children() {
								return wrapAdaptiveCustomEmoji({
									docId: passkey.software_emoji_id,
									size: 42,
									wrapOptions: { middleware: createMiddleware().get() }
								}).container;
							}
						});
					}
				})
			];
		}
	});
};
var PasskeysTab = () => {
	const [tab] = useSuperTab();
	const { i18n } = useHotReloadGuard();
	const appConfig = useAppConfig();
	const onCreation = (passkey) => {
		tab.payload.setPasskeys((passkeys) => {
			const arr = [...passkeys];
			arr.unshift(passkey);
			return arr;
		});
	};
	createEffect(() => {
		if (!tab.payload.passkeys.length && !IS_WEB_AUTHN_SUPPORTED) tab.close();
	});
	return createComponent(Section, {
		get ["class"]() {
			return passkeys_module_default.container;
		},
		caption: "Privacy.Passkeys.Caption",
		get captionArgs() {
			return [anchorCallback(() => showPasskeyPopup(onCreation))];
		},
		get children() {
			return [createComponent(MediaHeader, { get children() {
				return [createComponent(MediaHeader.Sticker, {
					name: "key",
					size: 100
				}), createComponent(MediaHeader.Subtitle, {
					color: "secondary",
					get children() {
						return i18n("Passkey.Subtitle");
					}
				})];
			} }), (() => {
				var _el$ = _tmpl$();
				insert(_el$, createComponent(For, {
					get each() {
						return tab.payload.passkeys;
					},
					children: PasskeyItem
				}), null);
				insert(_el$, createComponent(Show, {
					get when() {
						return IS_WEB_AUTHN_SUPPORTED && tab.payload.passkeys.length < appConfig.passkeys_account_passkeys_max;
					},
					get children() {
						return createComponent(Button, {
							text: "Privacy.Passkey.Create",
							primaryTransparent: true,
							icon: "add",
							onClick: () => createPasskey().then(onCreation)
						});
					}
				}), null);
				createRenderEffect(() => className(_el$, passkeys_module_default.items));
				return _el$;
			})()];
		}
	});
};
//#endregion
export { PasskeysTab as default };
