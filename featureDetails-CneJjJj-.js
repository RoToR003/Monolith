//# allFunctionsCalledOnLoad
import { A as mergeProps, C as createSignal, i as For, p as createComponent, s as Show, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { c as insert, g as template, o as className } from "./web-BPyQozky.js";
import { t as classNames } from "./classNames-DxGDjmvw.js";
import { i as createPopup, n as PopupElement } from "./indexTsx-v9mB9bAq.js";
import { i as Row } from "./confirmationPopup-Bz6mK0o-.js";
import { t as MediaHeader } from "./mediaHeader-CnpQNwOl.js";
var featureRows_module_default = {
	row: "_row_1k0hw_1",
	icon: "_icon_1k0hw_6",
	subtitle: "_subtitle_1k0hw_11"
};
//#endregion
//#region src/components/featureRows.tsx
/**
* The list a popup shows to say what something gives you: a bare icon in a lane of its own, a
* bold line, and the explanation under it. The icon sits at the top of the row rather than in
* its middle, so a two-line explanation does not push it out of line with the title.
*/
function FeatureRows(props) {
	return createComponent(For, {
		get each() {
			return props.rows;
		},
		children: (row) => createComponent(Row, {
			get ["class"]() {
				return featureRows_module_default.row;
			},
			get children() {
				return [
					createComponent(Row.Icon, {
						get ["class"]() {
							return classNames("primary", featureRows_module_default.icon);
						},
						get icon() {
							return row.icon;
						},
						noBackground: true
					}),
					createComponent(Row.Title, {
						"class": "text-bold",
						get children() {
							return row.title;
						}
					}),
					createComponent(Row.Subtitle, {
						get ["class"]() {
							return featureRows_module_default.subtitle;
						},
						get children() {
							return row.subtitle;
						}
					})
				];
			}
		})
	});
}
var featureDetails_module_default = {
	popup: "_popup_hvw9p_1",
	popupBody: "_popupBody_hvw9p_5",
	caption: "_caption_hvw9p_9",
	captionTitle: "_captionTitle_hvw9p_17",
	captionSubtitle: "_captionSubtitle_hvw9p_21"
};
//#endregion
//#region src/components/popups/featureDetails.tsx
var _tmpl$ = /*#__PURE__*/ template(`<div>`);
function showFeatureDetailsPopup(props) {
	const [show, setShow] = createSignal(false);
	const close = () => setShow(false);
	createPopup(() => createComponent(PopupElement, {
		get ["class"]() {
			return featureDetails_module_default.popup;
		},
		get show() {
			return show();
		},
		get onClose() {
			return props.onClose;
		},
		old: true,
		get children() {
			return [
				createComponent(PopupElement.Header, {
					floating: true,
					get children() {
						return createComponent(PopupElement.CloseButton, {});
					}
				}),
				createComponent(PopupElement.Body, {
					get ["class"]() {
						return featureDetails_module_default.popupBody;
					},
					get children() {
						return [
							createComponent(MediaHeader, { get children() {
								return [
									createComponent(MediaHeader.Sticker, mergeProps(() => props.sticker, { onReady: () => setShow(true) })),
									createComponent(Show, {
										get when() {
											return props.title;
										},
										get children() {
											return createComponent(MediaHeader.Title, { get children() {
												return props.title;
											} });
										}
									}),
									createComponent(Show, {
										get when() {
											return props.subtitle;
										},
										get children() {
											return createComponent(MediaHeader.Subtitle, {
												get color() {
													return props.subtitleSecondary ? "secondary" : void 0;
												},
												get children() {
													return props.subtitle;
												}
											});
										}
									})
								];
							} }),
							createComponent(FeatureRows, { get rows() {
								return props.rows;
							} }),
							createComponent(Show, {
								get when() {
									return props.caption;
								},
								get children() {
									var _el$ = _tmpl$();
									insert(_el$, createComponent(Show, {
										get when() {
											return props.caption.title;
										},
										get children() {
											var _el$2 = _tmpl$();
											insert(_el$2, () => props.caption.title);
											createRenderEffect(() => className(_el$2, featureDetails_module_default.captionTitle));
											return _el$2;
										}
									}), null);
									insert(_el$, createComponent(Show, {
										get when() {
											return props.caption.subtitle;
										},
										get children() {
											var _el$3 = _tmpl$();
											insert(_el$3, () => props.caption.subtitle);
											createRenderEffect(() => className(_el$3, featureDetails_module_default.captionSubtitle));
											return _el$3;
										}
									}), null);
									createRenderEffect(() => className(_el$, featureDetails_module_default.caption));
									return _el$;
								}
							})
						];
					}
				}),
				createComponent(PopupElement.Footer, { get children() {
					return createComponent(For, {
						get each() {
							return props.buttons;
						},
						children: (button) => createComponent(PopupElement.FooterButton, {
							get callback() {
								return button.onClick ? () => button.onClick?.(close) : close;
							},
							get cancel() {
								return button.isCancel;
							},
							get color() {
								return button.isSecondary ? "secondary" : void 0;
							},
							get children() {
								return button.text;
							}
						})
					});
				} })
			];
		}
	}));
	return close;
}
//#endregion
export { FeatureRows as n, showFeatureDetailsPopup as t };
