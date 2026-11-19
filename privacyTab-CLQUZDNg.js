//# allFunctionsCalledOnLoad
import { N as onMount } from "./solid-9Vxm0VIz.js";
import { n as useSuperTab } from "./superTabProvider-LtveyH7W.js";
//#region src/components/sidebarLeft/tabs/privacy/privacyTab.tsx
/**
* Builds a Solid component for a privacy sub-tab. The tab body is just one (or a
* few) imperative `PrivacySection`s appended to the tab's scrollable, so the
* component renders nothing itself — `build` runs on mount with the eventable
* tab instance (PrivacySection saves on the tab's `destroy` event).
*/
var privacyTab = (containerClass, build) => {
	return () => {
		const [tab] = useSuperTab();
		onMount(() => {
			tab.container.classList.add("privacy-tab", containerClass);
			build(tab);
		});
		return null;
	};
};
//#endregion
export { privacyTab as t };
