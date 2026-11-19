//# allFunctionsCalledOnLoad
import { n as rootScope } from "./rootScope-CZS0lmz8.js";
//#region src/components/wallet/watchSendingTransfer.ts
/**
* A transfer's message this device still sends: `onSent` gets the served message that takes its place, `onError`
* the error that failed it. Returns the stop.
*/
function watchSendingTransfer(message, handlers) {
	const onSent = ({ tempId, tempMessage, message: served }) => {
		if (tempId !== message.mid || tempMessage?.peerId !== message.peerId) return;
		handlers.onSent(served);
	};
	const onError = ({ tempId, peerId, error }) => {
		if (tempId !== message.mid || peerId !== message.peerId) return;
		handlers.onError(error);
	};
	rootScope.addEventListener("message_sent", onSent);
	rootScope.addEventListener("message_error", onError);
	return () => {
		rootScope.removeEventListener("message_sent", onSent);
		rootScope.removeEventListener("message_error", onError);
	};
}
//#endregion
export { watchSendingTransfer as t };
