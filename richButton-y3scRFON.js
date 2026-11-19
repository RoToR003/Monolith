//# allFunctionsCalledOnLoad
import { n as rootScope, y as SERVICE_PEER_ID } from "./rootScope-CZS0lmz8.js";
import { a as i18n, u as langPack_default } from "./langPack-BmdJGr44.js";
import { C as createSignal, M as onCleanup, g as createEffect, i as For, p as createComponent, s as Show, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { c as insert, f as setAttribute, g as template, o as className, s as delegateEvents } from "./web-BPyQozky.js";
import { n as hotReloadGuard } from "./hotReloadGuardProvider-CHEsZRuG.js";
import { t as classNames } from "./classNames-DxGDjmvw.js";
import { t as getMiddleware } from "./middleware-D6HuIqPm.js";
import { t as I18nTsx } from "./i18n-CGMFiAW0.js";
import { n as attachClickEvent } from "./clickEvent-COk4YpLP.js";
import { i as createPopup, n as PopupElement, o as usePopupContext } from "./indexTsx-v9mB9bAq.js";
import { a as isLastInputPointer } from "./focusTrap-CKEkJXZv.js";
import { r as ensureButtonSemantics } from "./button-DpTvniRN.js";
import { t as InputField } from "./inputField-CaCo30N0.js";
import { i as Row, s as CheckboxFieldTsx } from "./confirmationPopup-Bz6mK0o-.js";
import { t as subscribeOn } from "./subscribeOn-DnCla7ws.js";
import { t as getUserStatusString } from "./getUserStatusString-YlDGsxzx.js";
import { a as Section } from "./emailVerification-C8QYZSyu.js";
import { r as showPickUser2Popup } from "./pickUser-D8S6yVuK.js";
import { t as RadioFormTsx } from "./radioFormTsx-DmQSa7Gk.js";
import { i as getPageButtonClasses, o as getPageButtonRowClasses } from "./instantViewFormatting-sqXAtEbL.js";
import { n as normalizeLinkUrl } from "./normalizeLinkUrl-Rr-N4Ncf.js";
var richButton_module_default = {
	popup: "_popup_1yrzy_1",
	styles: "_styles_1yrzy_6",
	styleActive: "_styleActive_1yrzy_13",
	result: "_result_1yrzy_20"
};
//#endregion
//#region src/components/popups/richButton.tsx
var _tmpl$ = /*#__PURE__*/ template(`<div role=group>`);
var _tmpl$2 = /*#__PURE__*/ template(`<div role=radiogroup>`);
var _tmpl$3 = /*#__PURE__*/ template(`<div>`);
var _tmpl$4 = /*#__PURE__*/ template(`<button type=button>`);
var _tmpl$5 = /*#__PURE__*/ template(`<span class=danger role=alert>`);
var ACTIONS = [
	["url", "Chat.Input.Editor.Button.ActionUrl"],
	["copy", "Chat.Input.Editor.Button.ActionCopy"],
	["userProfile", "Chat.Input.Editor.Button.ActionMention"],
	["disabled", "Chat.Input.Editor.Button.ActionDisabled"]
];
var COLOR_ROWS = [[["", "Chat.Input.Editor.Button.StyleDefault"], ["primary", "Chat.Input.Editor.Button.StylePrimary"]], [["success", "Chat.Input.Editor.Button.StyleSuccess"], ["danger", "Chat.Input.Editor.Button.StyleDanger"]]];
/**
* The user a mention button opens, drawn as the picker drew them — avatar, name, status — and
* pressed to choose another.
*/
function MentionedUser(props) {
	const list = hotReloadGuard.appDialogsManager.createChatList();
	createEffect(() => {
		const peerId = props.userId.toPeerId(false);
		const middlewareHelper = getMiddleware();
		onCleanup(() => middlewareHelper.destroy());
		const middleware = middlewareHelper.get();
		list.replaceChildren();
		const { dom } = hotReloadGuard.appDialogsManager.addDialogNew({
			peerId,
			container: list,
			rippleEnabled: true,
			avatarSize: "abitbigger",
			meAsSaved: false,
			wrapOptions: { middleware }
		});
		ensureButtonSemantics(dom.listEl);
		attachClickEvent(dom.listEl, props.onClick);
		rootScope.managers.appUsersManager.getUser(props.userId).then((user) => {
			if (middleware()) dom.lastMessageSpan.replaceChildren(getUserStatusString(user));
		});
	});
	return list;
}
/**
* Makes or edits a button of layer 229 in the composer: its text, what it does and how it looks,
* the way desktop's "Add Button" box does. Rejects when dismissed.
*/
function showRichButtonPopup(options = {}) {
	return new Promise((resolve, reject) => {
		let settled = false;
		const editing = !!options.button;
		createPopup(() => {
			const button = options.button;
			const [action, setAction] = createSignal(button?.action || "url");
			const [color, setColor] = createSignal(button?.color || "");
			const [userId, setUserId] = createSignal(button?.userId);
			const [separateLine, setSeparateLine] = createSignal(!!options.separateLine);
			const [noUser, setNoUser] = createSignal(false);
			const textInputField = new InputField({
				label: "Chat.Input.Editor.Button.Text",
				plainText: true,
				required: true,
				withLinebreaks: false
			});
			const urlInputField = new InputField({
				label: "URL",
				plainText: true,
				required: true,
				validate: () => !!normalizeLinkUrl(urlInputField.value),
				withLinebreaks: false
			});
			const copyInputField = new InputField({
				label: "Chat.Input.Editor.Button.CopyText",
				plainText: true,
				required: true
			});
			const urlInput = urlInputField.input;
			urlInput.autocapitalize = "none";
			urlInput.spellcheck = false;
			urlInput.dir = "ltr";
			if (button?.text) textInputField.setValueSilently(button.text);
			if (button?.url) urlInputField.setValueSilently(button.url);
			if (button?.copyText) copyInputField.setValueSilently(button.copyText);
			const [revision, setRevision] = createSignal(0);
			const bump = () => setRevision(revision() + 1);
			[
				textInputField,
				urlInputField,
				copyInputField
			].forEach((field) => {
				subscribeOn(field.input)("input", bump);
			});
			const valid = () => {
				revision();
				if (!textInputField.value.trim()) return false;
				switch (action()) {
					case "url": return urlInputField.isValid();
					case "copy": return !!copyInputField.value;
					default: return true;
				}
			};
			const chooseUser = async (fallback) => {
				try {
					const peerId = await showPickUser2Popup({
						peerType: ["contacts"],
						filterPeerTypeBy: ["isRegularUser"],
						exceptSelf: true,
						excludePeerIds: /* @__PURE__ */ new Set([SERVICE_PEER_ID]),
						titleLangKey: "Chat.Input.Editor.Button.ChooseUser",
						placeholder: "Search"
					});
					setUserId(peerId.toUserId());
					setNoUser(false);
				} catch {
					if (fallback && !userId()) setAction(fallback);
				}
			};
			const changeAction = (value) => {
				const previous = action();
				setAction(value);
				if (value === "userProfile" && isLastInputPointer()) chooseUser(previous);
			};
			const Fields = () => {
				const popup = usePopupContext();
				createEffect(() => {
					if (!popup.shown()) return;
					queueMicrotask(() => {
						if (popup.destroyed || !popup.shown()) return;
						textInputField.input.focus();
						textInputField.select();
					});
				});
				return [
					createComponent(Section, {
						noDelimiter: true,
						get children() {
							return textInputField.container;
						}
					}),
					createComponent(Section, { get children() {
						var _el$ = _tmpl$();
						insert(_el$, createComponent(For, {
							each: COLOR_ROWS,
							children: (row) => (() => {
								var _el$5 = _tmpl$3();
								insert(_el$5, createComponent(For, {
									each: row,
									children: ([value, langKey]) => (() => {
										var _el$6 = _tmpl$4();
										_el$6.$$click = () => setColor(value);
										insert(_el$6, createComponent(I18nTsx, { key: langKey }));
										createRenderEffect((_p$) => {
											var _v$3 = classNames(...getPageButtonClasses(value || void 0), color() === value && richButton_module_default.styleActive), _v$4 = color() === value;
											_v$3 !== _p$.e && className(_el$6, _p$.e = _v$3);
											_v$4 !== _p$.t && setAttribute(_el$6, "aria-pressed", _p$.t = _v$4);
											return _p$;
										}, {
											e: void 0,
											t: void 0
										});
										return _el$6;
									})()
								}));
								createRenderEffect(() => className(_el$5, classNames(...getPageButtonRowClasses())));
								return _el$5;
							})()
						}));
						createRenderEffect((_p$) => {
							var _v$ = richButton_module_default.styles, _v$2 = langPack_default.format("Chat.Input.Editor.Button.Style", true);
							_v$ !== _p$.e && className(_el$, _p$.e = _v$);
							_v$2 !== _p$.t && setAttribute(_el$, "aria-label", _p$.t = _v$2);
							return _p$;
						}, {
							e: void 0,
							t: void 0
						});
						return _el$;
					} }),
					createComponent(Section, { get children() {
						return [
							(() => {
								var _el$2 = _tmpl$2();
								insert(_el$2, createComponent(RadioFormTsx, {
									get values() {
										return ACTIONS.map(([value, langPackKey]) => ({
											value,
											langPackKey
										}));
									},
									get selected() {
										return action();
									},
									onChange: changeAction
								}));
								createRenderEffect(() => setAttribute(_el$2, "aria-label", langPack_default.format("Chat.Input.Editor.Button.Action", true)));
								return _el$2;
							})(),
							createComponent(Show, {
								get when() {
									return action() === "url";
								},
								get children() {
									var _el$3 = _tmpl$3();
									insert(_el$3, () => urlInputField.container);
									createRenderEffect(() => className(_el$3, richButton_module_default.result));
									return _el$3;
								}
							}),
							createComponent(Show, {
								get when() {
									return action() === "copy";
								},
								get children() {
									var _el$4 = _tmpl$3();
									insert(_el$4, () => copyInputField.container);
									createRenderEffect(() => className(_el$4, richButton_module_default.result));
									return _el$4;
								}
							}),
							createComponent(Show, {
								get when() {
									return action() === "userProfile";
								},
								get children() {
									return createComponent(Show, {
										get when() {
											return userId();
										},
										get fallback() {
											return createComponent(Row, {
												clickable: () => void chooseUser(),
												get children() {
													return [
														createComponent(Row.Icon, { icon: "user" }),
														createComponent(Row.Title, { get children() {
															return createComponent(I18nTsx, { key: "Chat.Input.Editor.Button.ChooseUser" });
														} }),
														createComponent(Show, {
															get when() {
																return noUser();
															},
															get children() {
																return createComponent(Row.Subtitle, { get children() {
																	var _el$7 = _tmpl$5();
																	insert(_el$7, createComponent(I18nTsx, { key: "Chat.Input.Editor.Button.NoUser" }));
																	return _el$7;
																} });
															}
														})
													];
												}
											});
										},
										children: (userId) => createComponent(MentionedUser, {
											get userId() {
												return userId();
											},
											onClick: () => void chooseUser()
										})
									});
								}
							})
						];
					} }),
					createComponent(Show, {
						get when() {
							return options.canChooseLine;
						},
						get children() {
							return createComponent(Section, { get children() {
								return createComponent(Row, { get children() {
									return [createComponent(Row.CheckboxFieldToggle, { get children() {
										return createComponent(CheckboxFieldTsx, {
											toggle: true,
											get checked() {
												return separateLine();
											},
											onChange: setSeparateLine
										});
									} }), createComponent(Row.Title, { get children() {
										return createComponent(I18nTsx, { key: "Chat.Input.Editor.Button.SeparateLine" });
									} })];
								} });
							} });
						}
					})
				];
			};
			const submit = () => {
				if (!valid()) return false;
				if (action() === "userProfile" && !userId()) {
					setNoUser(true);
					return false;
				}
				const result = {
					text: textInputField.value.trim(),
					action: action(),
					color: color() || void 0,
					link: button?.link
				};
				if (action() === "url") result.url = normalizeLinkUrl(urlInputField.value);
				else if (action() === "copy") result.copyText = copyInputField.value;
				else if (action() === "userProfile") result.userId = userId();
				settled = true;
				resolve({
					button: result,
					separateLine: separateLine()
				});
			};
			return createComponent(PopupElement, {
				get ["class"]() {
					return classNames("popup-rich-button", richButton_module_default.popup);
				},
				closable: true,
				onClose: () => {
					if (!settled) reject();
				},
				get children() {
					return [
						createComponent(PopupElement.Header, { get children() {
							return [createComponent(PopupElement.CloseButton, {}), createComponent(PopupElement.Title, { get children() {
								return i18n(editing ? "Chat.Input.Editor.Button.EditTitle" : "Chat.Input.Editor.Button.CreateTitle");
							} })];
						} }),
						createComponent(PopupElement.Scrollable, { get children() {
							return createComponent(PopupElement.Body, { get children() {
								return createComponent(Fields, {});
							} });
						} }),
						createComponent(PopupElement.Footer, { get children() {
							return [createComponent(PopupElement.FooterButton, {
								confirm: true,
								get disabled() {
									return !valid();
								},
								langKey: editing ? "Save" : "Create",
								callback: submit
							}), createComponent(Show, {
								when: editing,
								get children() {
									return createComponent(PopupElement.FooterButton, {
										color: "danger",
										langKey: "Chat.Input.Editor.Button.Delete",
										callback: () => {
											settled = true;
											resolve({ delete: true });
										}
									});
								}
							})];
						} })
					];
				}
			});
		});
	});
}
delegateEvents(["click"]);
//#endregion
export { showRichButtonPopup as default };
