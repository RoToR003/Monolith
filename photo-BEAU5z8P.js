//# allFunctionsCalledOnLoad
import { n as autoDownloadTab, t as autoDownloadPeerTypeSection } from "./peerTypeSection-BbKdA5qo.js";
//#region src/components/sidebarLeft/tabs/autoDownload/photo.tsx
var photo_default = autoDownloadTab((tab) => {
	tab.scrollable.append(autoDownloadPeerTypeSection("photo", "AutoDownloadPhotosTitle", tab.middlewareHelper.get()));
});
//#endregion
export { photo_default as default };
