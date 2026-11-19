//# allFunctionsCalledOnLoad
import { a as i18n } from "./langPack-BmdJGr44.js";
import { p as createComponent, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { c as insert, g as template, o as className, u as memo } from "./web-BPyQozky.js";
import { i as Row } from "./confirmationPopup-Bz6mK0o-.js";
import { t as RadioFieldTsx } from "./radioFieldTsx-kmtuN4Dv.js";
import { t as communityShared_module_default } from "./communityShared.module-UBZ3o4PU.js";
//#region src/components/communities/communityShared.tsx
var _tmpl$ = /*#__PURE__*/ template(`<span>`);
function CommunityRadioOption(props) {
	return createComponent(Row, { get children() {
		return [
			createComponent(Row.RadioField, { get children() {
				return createComponent(RadioFieldTsx, {
					get checked() {
						return props.selected === props.value;
					},
					get name() {
						return props.name;
					},
					get value() {
						return props.value;
					},
					onChange: (checked) => checked && props.onSelect(props.value)
				});
			} }),
			createComponent(Row.Title, { get children() {
				return i18n(props.title);
			} }),
			createComponent(Row.Subtitle, { get children() {
				return i18n(props.subtitle);
			} })
		];
	} });
}
function CommunityManagementRow(props) {
	const onKeyDown = (event) => {
		if (event.key === "Enter" || event.key === " ") {
			event.preventDefault();
			event.currentTarget.click();
		}
	};
	return createComponent(Row, {
		get clickable() {
			return props.onClick;
		},
		role: "button",
		tabIndex: 0,
		"on:keydown": onKeyDown,
		get children() {
			return [
				createComponent(Row.Icon, { get icon() {
					return props.icon;
				} }),
				createComponent(Row.Title, {
					get titleRight() {
						return props.right;
					},
					get titleRightSecondary() {
						return props.rightSecondary;
					},
					get children() {
						return i18n(props.title);
					}
				}),
				memo(() => memo(() => props.subtitle !== void 0)() && createComponent(Row.Subtitle, { get children() {
					return props.subtitle;
				} }))
			];
		}
	});
}
function CommunityPendingRequestsRow(props) {
	return createComponent(CommunityManagementRow, {
		icon: "adduser",
		title: "Community.PendingRequests",
		get right() {
			return (() => {
				var _el$ = _tmpl$();
				insert(_el$, () => props.count);
				createRenderEffect(() => className(_el$, `${communityShared_module_default.pendingCount} text-bold`));
				return _el$;
			})();
		},
		get onClick() {
			return props.onClick;
		}
	});
}
//#endregion
export { CommunityPendingRequestsRow as n, CommunityRadioOption as r, CommunityManagementRow as t };
