//# allFunctionsCalledOnLoad
import { n as autoDownloadTab, t as autoDownloadPeerTypeSection } from "./peerTypeSection-BbKdA5qo.js";
//#region src/components/sidebarLeft/tabs/autoDownload/video.tsx
var video_default = autoDownloadTab((tab) => {
	tab.scrollable.append(autoDownloadPeerTypeSection("video", "AutoDownloadVideosTitle", tab.middlewareHelper.get()));
});
//#endregion
export { video_default as default };
