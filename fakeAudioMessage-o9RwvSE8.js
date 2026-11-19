//# allFunctionsCalledOnLoad
import { n as rootScope } from "./rootScope-CZS0lmz8.js";
//#region src/components/wrappers/fakeAudioMessage.ts
/**
* A local, never-sent message wrapping an audio document, so it can be rendered with the regular
* `wrapDocument` / `AudioElement` machinery — which needs a message to hang playback state off.
*
* Used where tracks exist outside of any chat history: the profile playlist and the music picker.
* `mid` must be unique within the list that renders it (playback identifies a track by peerId+mid).
*/
async function createFakeAudioMessage({ doc, peerId, mid, savedMusic }) {
	return {
		_: "message",
		id: mid,
		mid,
		peer_id: await rootScope.managers.appPeersManager.getOutputPeer(peerId),
		peerId,
		fromId: peerId,
		date: doc.date,
		message: "",
		pFlags: {
			local: true,
			...savedMusic ? { fakeForSavedMusic: true } : {}
		},
		media: {
			_: "messageMediaDocument",
			document: doc,
			pFlags: {}
		}
	};
}
//#endregion
export { createFakeAudioMessage as t };
