//# allFunctionsCalledOnLoad
import { n as rootScope } from "./rootScope-CZS0lmz8.js";
import { a as i18n } from "./langPack-BmdJGr44.js";
import { C as createSignal, p as createComponent, s as Show, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { c as insert, g as template, o as className, p as setStyleProperty, u as memo } from "./web-BPyQozky.js";
import { t as IconTsx } from "./iconTsx-B4lOk4A6.js";
import { t as Button } from "./buttonTsx-Bwphkm9r.js";
import { P as formatDate } from "./index-B7axFZql.js";
import { i as Row, o as getRowIconBackgroundImage, s as CheckboxFieldTsx } from "./confirmationPopup-Bz6mK0o-.js";
import { t as MediaHeader } from "./mediaHeader-CnpQNwOl.js";
import { a as Section } from "./emailVerification-C8QYZSyu.js";
import { r as toastNew } from "./toast-B6VD5M7R.js";
import { n as useSuperTab } from "./superTabProvider-LtveyH7W.js";
import { t as getSessionPlatformIcon } from "./sessionPlatformIcon-Csi49ekf.js";
import { n as sessionDetails_module_default, t as SessionInfoRow } from "./sessionInfoRow-4lMxlo9s.js";
//#region src/components/sidebarLeft/tabs/session.tsx
var _tmpl$ = /*#__PURE__*/ template(`<span dir=auto>`);
var _tmpl$2 = /*#__PURE__*/ template(`<div>`);
function SessionTab() {
	const [tab] = useSuperTab();
	const authorization = () => tab.payload.authorization;
	const isCurrent = () => !!authorization().pFlags.current;
	const icon = () => getSessionPlatformIcon(authorization());
	const application = () => [authorization().app_name, authorization().app_version].filter(Boolean).join(" ");
	const system = () => authorization().system_version || authorization().platform;
	const location = () => [authorization().region, authorization().country].filter(Boolean).join(", ");
	const terminate = async () => {
		if (await tab.payload.onTerminate()) tab.close();
	};
	const canTerminate = () => !!tab.payload.onTerminate;
	const [acceptsCalls, setAcceptsCalls] = createSignal(!authorization().pFlags.call_requests_disabled);
	const [acceptsSecretChats, setAcceptsSecretChats] = createSignal(!authorization().pFlags.encrypted_requests_disabled);
	const changeSetting = async (setter, accepted, options) => {
		setter(accepted);
		try {
			await rootScope.managers.appAccountManager.changeAuthorizationSettings(authorization().hash, options);
			tab.payload.onSettingsChanged?.({
				...authorization(),
				pFlags: {
					...authorization().pFlags,
					call_requests_disabled: acceptsCalls() ? void 0 : true,
					encrypted_requests_disabled: acceptsSecretChats() ? void 0 : true
				}
			});
		} catch (err) {
			setter(!accepted);
			toastNew({ langPackKey: "Error.AnError" });
		}
	};
	return [
		createComponent(MediaHeader, {
			get ["class"]() {
				return sessionDetails_module_default.heroHeader;
			},
			get children() {
				return [
					createComponent(MediaHeader.Sticker, {
						size: 100,
						get element() {
							return (() => {
								var _el$2 = _tmpl$2();
								insert(_el$2, createComponent(IconTsx, { get icon() {
									return icon();
								} }));
								createRenderEffect((_p$) => {
									var _v$ = sessionDetails_module_default.deviceIcon, _v$2 = getRowIconBackgroundImage(icon());
									_v$ !== _p$.e && className(_el$2, _p$.e = _v$);
									_v$2 !== _p$.t && setStyleProperty(_el$2, "background-image", _p$.t = _v$2);
									return _p$;
								}, {
									e: void 0,
									t: void 0
								});
								return _el$2;
							})();
						}
					}),
					createComponent(MediaHeader.Title, {
						get ["class"]() {
							return sessionDetails_module_default.deviceName;
						},
						get children() {
							var _el$ = _tmpl$();
							insert(_el$, () => authorization().device_model || application());
							return _el$;
						}
					}),
					createComponent(MediaHeader.Subtitle, {
						color: "secondary",
						get children() {
							return memo(() => !!isCurrent())() ? i18n("Online") : formatDate(/* @__PURE__ */ new Date(Math.max(authorization().date_active, authorization().date_created) * 1e3), {
								withTime: true,
								shortMonth: true
							});
						}
					})
				];
			}
		}),
		createComponent(Section, {
			name: "Info",
			get caption() {
				return location() ? "AuthSessions.View.LocationInfo" : void 0;
			},
			get children() {
				return [
					createComponent(SessionInfoRow, {
						get label() {
							return i18n("AuthSessions.View.Application");
						},
						get value() {
							return application();
						}
					}),
					createComponent(SessionInfoRow, {
						get label() {
							return i18n("AuthSessions.View.System");
						},
						get value() {
							return system();
						}
					}),
					createComponent(SessionInfoRow, {
						get label() {
							return i18n("AuthSessions.View.Location");
						},
						get value() {
							return location();
						}
					})
				];
			}
		}),
		createComponent(Section, {
			name: "AuthSessions.View.AcceptTitle",
			get children() {
				return [createComponent(Show, {
					get when() {
						return !isCurrent();
					},
					get children() {
						return createComponent(Row, { get children() {
							return [createComponent(Row.CheckboxFieldToggle, { get children() {
								return createComponent(CheckboxFieldTsx, {
									toggle: true,
									get checked() {
										return acceptsSecretChats();
									},
									onChange: (checked) => changeSetting(setAcceptsSecretChats, checked, { encryptedRequestsDisabled: !checked })
								});
							} }), createComponent(Row.Title, { get children() {
								return i18n("AuthSessions.View.AcceptSecretChats");
							} })];
						} });
					}
				}), createComponent(Row, { get children() {
					return [createComponent(Row.CheckboxFieldToggle, { get children() {
						return createComponent(CheckboxFieldTsx, {
							toggle: true,
							get checked() {
								return acceptsCalls();
							},
							onChange: (checked) => changeSetting(setAcceptsCalls, checked, { callRequestsDisabled: !checked })
						});
					} }), createComponent(Row.Title, { get children() {
						return i18n("AuthSessions.View.AcceptIncomingCalls");
					} })];
				} })];
			}
		}),
		createComponent(Show, {
			get when() {
				return canTerminate();
			},
			get children() {
				return createComponent(Section, { get children() {
					return createComponent(Button, {
						"class": "btn-primary btn-transparent danger",
						icon: "stop",
						text: "AuthSessions.View.TerminateSession",
						onClick: terminate
					});
				} });
			}
		})
	];
}
//#endregion
export { SessionTab as default };
