//# allFunctionsCalledOnLoad
import { h as Modes } from "./userAgent-ByGXcznk.js";
import { a as i18n } from "./langPack-BmdJGr44.js";
import { A as mergeProps, C as createSignal, I as splitProps, _ as createMemo, p as createComponent } from "./solid-9Vxm0VIz.js";
import { u as memo } from "./web-BPyQozky.js";
import { t as classNames } from "./classNames-DxGDjmvw.js";
import { t as IconTsx } from "./iconTsx-B4lOk4A6.js";
import { t as RippleElement } from "./rippleElement-C-prm4MP.js";
import { n as iconButtonLabel } from "./iconButtonLabel-BKjhnSeF.js";
import { t as I18nTsx } from "./i18n-CGMFiAW0.js";
//#region src/components/buttonTsx.tsx
var Button = (props = {}) => {
	let disabled, setDisabled;
	if (props.disabled !== void 0) disabled = createMemo(() => props.disabled);
	else [disabled, setDisabled] = createSignal(false);
	return createComponent(RippleElement, {
		ref(r$) {
			var _ref$ = props.ref;
			typeof _ref$ === "function" ? _ref$(r$) : props.ref = r$;
		},
		get component() {
			return props.as || "button";
		},
		get type() {
			return !props.as || props.as === "button" ? "button" : void 0;
		},
		get ["class"]() {
			return classNames(props.class, props.primaryFilled && "btn-primary btn-color-primary", props.primary && "btn btn-primary primary", props.primaryTransparent && "btn-primary primary btn-transparent", props.large && "btn-large", props.onlyMobile && "only-handhelds");
		},
		get disabled() {
			return disabled();
		},
		get onClick() {
			return memo(() => !!(props.onClick && setDisabled))() ? (e) => {
				try {
					const result = props.onClick(e);
					if (result instanceof Promise) {
						setDisabled(true);
						result.finally(() => {
							setDisabled(false);
						});
					}
				} catch (err) {
					throw err;
				}
			} : props.onClick;
		},
		get noRipple() {
			return props.noRipple;
		},
		get rippleSquare() {
			return props.rippleSquare;
		},
		get tabIndex() {
			return props.tabIndex;
		},
		get ["aria-hidden"]() {
			return props["aria-hidden"];
		},
		get ["aria-label"]() {
			return props["aria-label"];
		},
		get ["aria-pressed"]() {
			return props["aria-pressed"];
		},
		get ["aria-expanded"]() {
			return props["aria-expanded"];
		},
		get ["aria-controls"]() {
			return props["aria-controls"];
		},
		get ["on:click"]() {
			return props["on:click"];
		},
		get ["on:keydown"]() {
			return props["on:keydown"];
		},
		get children() {
			return [
				memo(() => memo(() => !!props.icon)() && createComponent(IconTsx, {
					get icon() {
						return props.icon;
					},
					get ["class"]() {
						return classNames("button-icon", props.iconClass);
					}
				})),
				memo(() => memo(() => !!props.text)() ? i18n(props.text, props.textArgs) : props.children),
				memo(() => memo(() => !!props.iconAfter)() && createComponent(IconTsx, {
					get icon() {
						return props.iconAfter;
					},
					get ["class"]() {
						return classNames("button-icon", props.iconClass);
					}
				}))
			];
		}
	});
};
Button.Corner = (props) => {
	return createComponent(Button, mergeProps(props, {
		get ["class"]() {
			return classNames("btn-circle", "btn-corner", "z-depth-1", props.class);
		},
		get tabIndex() {
			return props.tabIndex ?? (Modes.a11y ? void 0 : -1);
		}
	}));
};
Button.Icon = (props) => {
	return createComponent(Button, mergeProps(props, {
		get ["class"]() {
			return classNames("btn-icon", props.icon, props.class);
		},
		get ["aria-label"]() {
			return props["aria-label"] || iconButtonLabel(props.icon);
		},
		get tabIndex() {
			return props.tabIndex ?? (Modes.a11y ? void 0 : -1);
		}
	}));
};
Button.Tile = (props) => {
	const [local, others] = splitProps(props, ["text", "class"]);
	return createComponent(Button, mergeProps(others, {
		get ["class"]() {
			return classNames("btn-tile", local.class);
		},
		get children() {
			return createComponent(I18nTsx, {
				get key() {
					return local.text;
				},
				"class": "btn-tile-text"
			});
		}
	}));
};
//#endregion
export { Button as t };
