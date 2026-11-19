//# allFunctionsCalledOnLoad
import { C as createSignal, m as createComputed, p as createComponent } from "./solid-9Vxm0VIz.js";
import { n as attachHotClassName } from "./classname-DB9i2ReQ.js";
import { i as createPopup, n as PopupElement } from "./indexTsx-v9mB9bAq.js";
import { t as defineSolidElement } from "./defineSolidElement-DU5LO9SF.js";
import { r as FlagFilters, t as useFlagFilters } from "./useFlagFilters-DIMg9yXK.js";
var styles_module_default = { Container: "_Container_rsf96_1" };
//#endregion
//#region src/components/chat/logFiltersPopup/content.tsx
var LogFiltersPopupContent = defineSolidElement({
	name: "log-filters-popup-content",
	component: (props) => {
		attachHotClassName(props.element, styles_module_default.Container);
		const filtersControls = useFlagFilters({
			channelId: () => props.channelId,
			isBroadcast: () => props.isBroadcast
		});
		createComputed(() => {
			filtersControls.setFromCommittedFilters(props.committedFilters);
		});
		const onCommit = (committedFilters) => {
			props.onFinish({ committedFilters });
		};
		return createComponent(FlagFilters, {
			filtersControls,
			onCommit,
			onReset: () => onCommit()
		});
	}
});
//#endregion
//#region src/components/chat/logFiltersPopup/index.tsx
function showLogFiltersPopup({ HotReloadGuard, onFinish, ...rest }) {
	const [show, setShow] = createSignal(true);
	const content = new LogFiltersPopupContent();
	content.HotReloadGuard = HotReloadGuard;
	content.feedProps({
		...rest,
		onFinish: (payload) => {
			onFinish(payload);
			setShow(false);
		}
	});
	createPopup(() => createComponent(PopupElement, {
		"class": "log-filters-popup",
		closable: true,
		get show() {
			return show();
		},
		get children() {
			return [createComponent(PopupElement.Header, { get children() {
				return [createComponent(PopupElement.CloseButton, {}), createComponent(PopupElement.Title, { title: "RecentActions" })];
			} }), createComponent(PopupElement.Body, { children: content })];
		}
	}));
}
//#endregion
export { showLogFiltersPopup as default };
