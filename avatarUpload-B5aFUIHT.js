//# allFunctionsCalledOnLoad
import { C as createSignal, x as createRoot } from "./solid-9Vxm0VIz.js";
//#region src/stores/avatarUpload.ts
var [map, setMap] = createRoot(() => createSignal(/* @__PURE__ */ new Map()));
var avatarUploads = map;
function setEntry(peerId, entry) {
	setMap((prev) => {
		const next = new Map(prev);
		if (entry) next.set(peerId, entry);
		else next.delete(peerId);
		return next;
	});
}
function trackAvatarUpload(peerId, promises) {
	const progressSource = promises.video || promises.file;
	if (!progressSource) return;
	const fileCancel = promises.file?.cancel?.bind(promises.file);
	const videoCancel = promises.video?.cancel?.bind(promises.video);
	progressSource.cancel = () => {
		fileCancel?.();
		videoCancel?.();
	};
	setEntry(peerId, { promise: progressSource });
	Promise.all([promises.file, promises.video].filter(Boolean)).catch(() => {}).finally(() => setEntry(peerId, null));
}
//#endregion
export { trackAvatarUpload as n, avatarUploads as t };
