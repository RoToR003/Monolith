//# allFunctionsCalledOnLoad
import { p as createComponent } from "./solid-9Vxm0VIz.js";
import { u as memo } from "./web-BPyQozky.js";
import { t as IconTsx } from "./iconTsx-B4lOk4A6.js";
import { i as Row } from "./confirmationPopup-Bz6mK0o-.js";
//#region src/components/usernameRow.tsx
var CLASS_NAME = "usernames";
function UsernameRow(props) {
	const icon = () => props.icon || "limit_link";
	return createComponent(Row, {
		ref(r$) {
			var _ref$ = props.ref;
			typeof _ref$ === "function" ? _ref$(r$) : props.ref = r$;
		},
		"class": `${CLASS_NAME}-username`,
		get style() {
			return props.style;
		},
		get classList() {
			return {
				"active": !!props.active,
				"is-link": !!props.isLink,
				"is-paid": !!props.isLink && icon() === "link_paid",
				"row-sortable": !!props.sortable,
				"cant-sort": !!props.sortable && !props.sortingEnabled,
				"is-dragging": !!props.dragging
			};
		},
		get clickable() {
			return props.clickable ?? true;
		},
		get contextMenu() {
			return props.contextMenu;
		},
		get children() {
			return [
				createComponent(Row.Title, {
					ref(r$) {
						var _ref$2 = props.titleRef;
						typeof _ref$2 === "function" ? _ref$2(r$) : props.titleRef = r$;
					},
					get ["class"]() {
						return props.isLink ? "text-bold" : void 0;
					},
					get titleRight() {
						return props.titleRight;
					},
					get titleRightSecondary() {
						return props.titleRightSecondary;
					},
					get children() {
						return props.title;
					}
				}),
				createComponent(Row.Subtitle, {
					ref(r$) {
						var _ref$3 = props.subtitleRef;
						typeof _ref$3 === "function" ? _ref$3(r$) : props.subtitleRef = r$;
					},
					"class": `${CLASS_NAME}-username-status`,
					get subtitleRight() {
						return props.subtitleRight;
					},
					get children() {
						return props.subtitle;
					}
				}),
				createComponent(Row.Media, {
					ref(r$) {
						var _ref$4 = props.mediaRef;
						typeof _ref$4 === "function" ? _ref$4(r$) : props.mediaRef = r$;
					},
					size: "abitbigger",
					"class": `${CLASS_NAME}-username-icon avatar-gradient`,
					get ["data-color"]() {
						return props.color;
					},
					get children() {
						return createComponent(IconTsx, { get icon() {
							return icon();
						} });
					}
				}),
				memo(() => memo(() => !!props.sortable)() && createComponent(IconTsx, {
					icon: "menu",
					"class": "row-sortable-icon row-sortable-handle",
					"on:click": (event) => event.stopPropagation(),
					get onPointerDown() {
						return props.sortHandlePointerDown;
					}
				}))
			];
		}
	});
}
//#endregion
export { UsernameRow as t };
