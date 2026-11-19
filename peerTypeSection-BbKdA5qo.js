//# allFunctionsCalledOnLoad
import { a as i18n } from "./langPack-BmdJGr44.js";
import { N as onMount, p as createComponent } from "./solid-9Vxm0VIz.js";
import { t as joinDeepPath } from "./setDeepProperty-IYhQYgHt.js";
import { u as memo } from "./web-BPyQozky.js";
import { i as Row, s as CheckboxFieldTsx } from "./confirmationPopup-Bz6mK0o-.js";
import { a as Section } from "./emailVerification-C8QYZSyu.js";
import { r as wrapSolidComponent } from "./wrapSolidComponent-BASCjNJG.js";
import { n as useSuperTab } from "./superTabProvider-LtveyH7W.js";
//#region src/components/sidebarLeft/tabs/autoDownload/autoDownloadTab.tsx
/**
* Thin Solid wrapper for an auto-download sub-tab: builds its section(s) on
* mount with the eventable tab instance (the parent dataAndStorage tab listens
* for this tab's `destroy` event to refresh its subtitles).
*/
var autoDownloadTab = (build) => {
	return () => {
		const [tab] = useSuperTab();
		onMount(() => {
			build(tab);
		});
		return null;
	};
};
//#endregion
//#region src/components/sidebarLeft/tabs/autoDownload/peerTypeSection.tsx
function autoDownloadPeerTypeSection(type, title, middleware, children) {
	const key = joinDeepPath("settings", "autoDownload", type);
	const options = [
		{
			key: "contacts",
			title: "AutodownloadContacts"
		},
		{
			key: "private",
			title: "AutodownloadPrivateChats"
		},
		{
			key: "groups",
			title: "AutodownloadGroupChats"
		},
		{
			key: "channels",
			title: "AutodownloadChannels"
		}
	];
	return wrapSolidComponent(() => createComponent(Section, {
		name: title,
		get children() {
			return [memo(() => options.map((option) => createComponent(Row, { get children() {
				return [createComponent(Row.CheckboxFieldToggle, { get children() {
					return createComponent(CheckboxFieldTsx, {
						get stateKey() {
							return joinDeepPath(key, option.key);
						},
						toggle: true
					});
				} }), createComponent(Row.Title, { get children() {
					return i18n(option.title);
				} })];
			} }))), children];
		}
	}), middleware);
}
//#endregion
export { autoDownloadTab as n, autoDownloadPeerTypeSection as t };
