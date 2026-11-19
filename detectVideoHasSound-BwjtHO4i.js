//# allFunctionsCalledOnLoad
import { t as clearMediaElementSource } from "./clearMediaElementSource-CfCKljUR.js";
//#region src/helpers/video/detectVideoHasSound.ts
/**
* Best-effort detection of whether a video contains an audio track.
*
* Strategy:
* 1. Firefox: `audioTracks.length > 0` (when enabled) or the legacy `mozHasAudio`.
* 2. Chromium/WebKit: `webkitAudioDecodedByteCount` — requires the video to have
*    actually been played for the counter to advance, so we play it muted briefly.
* 3. If none of the indicators are available, we conservatively return `true`.
*
* Accepts either a `Blob`/`File` (a temporary `<video>` is created and disposed of)
* or an already-loaded `HTMLVideoElement` (reused in place — caller keeps ownership).
*/
async function detectVideoHasSound(source) {
	if (source instanceof HTMLVideoElement) return probeVideoElementHasSound(source);
	const url = URL.createObjectURL(source);
	const video = document.createElement("video");
	video.src = url;
	video.muted = true;
	video.playsInline = true;
	video.preload = "auto";
	try {
		await new Promise((resolve, reject) => {
			const cleanup = () => {
				video.removeEventListener("loadedmetadata", onLoaded);
				video.removeEventListener("error", onError);
			};
			const onLoaded = () => {
				cleanup();
				resolve();
			};
			const onError = () => {
				cleanup();
				reject(/* @__PURE__ */ new Error("Failed to load video for sound detection"));
			};
			video.addEventListener("loadedmetadata", onLoaded);
			video.addEventListener("error", onError);
		});
		return await probeVideoElementHasSound(video);
	} finally {
		clearMediaElementSource(video);
		URL.revokeObjectURL(url);
	}
}
async function probeVideoElementHasSound(video) {
	const audioTracks = video.audioTracks;
	if (audioTracks && typeof audioTracks.length === "number") return audioTracks.length > 0;
	if (typeof video.mozHasAudio === "boolean") return video.mozHasAudio;
	if ("webkitAudioDecodedByteCount" in video) {
		const wasPaused = video.paused;
		const previousMuted = video.muted;
		video.muted = true;
		try {
			await video.play().catch(() => {});
			await new Promise((resolve) => {
				const onTimeUpdate = () => {
					video.removeEventListener("timeupdate", onTimeUpdate);
					resolve();
				};
				video.addEventListener("timeupdate", onTimeUpdate);
				setTimeout(() => {
					video.removeEventListener("timeupdate", onTimeUpdate);
					resolve();
				}, 400);
			});
		} finally {
			if (wasPaused) video.pause();
			video.muted = previousMuted;
		}
		const decoded = video.webkitAudioDecodedByteCount;
		if (typeof decoded === "number") return decoded > 0;
	}
	return true;
}
//#endregion
export { detectVideoHasSound as t };
