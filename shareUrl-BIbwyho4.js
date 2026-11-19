//# allFunctionsCalledOnLoad
import { n as rootScope } from "./rootScope-CZS0lmz8.js";
import { n as bindManagersToSession } from "./bindManagersToAccount-BL82O9H9.js";
import { n as hotReloadGuard } from "./hotReloadGuardProvider-CHEsZRuG.js";
import { dt as wrapPeerTitle } from "./confirmationPopup-Bz6mK0o-.js";
import { r as toastNew } from "./toast-B6VD5M7R.js";
import { r as copyTextToClipboard } from "./clipboard-DzscV-ca.js";
import { n as PaidMessagesInterceptor, t as PAYMENT_REJECTED } from "./paidMessagesInterceptor-ypY0gcAs.js";
import { c as showSharingPickerPopup, t as createCopyLinkFooter } from "./pickUser-D8S6yVuK.js";
//#region src/components/popups/shareUrl.ts
function shareToPeers(options) {
	return showSharingPickerPopup({
		multiSelect: options.multiSelect,
		chatRightsActions: options.chatRightsActions,
		footer: options.footer,
		onChange: options.onChange,
		onSelect: async (chosen) => {
			const managers = bindManagersToSession(rootScope.managers);
			let sent = 0;
			for (const target of chosen) {
				const preparedPayment = await PaidMessagesInterceptor.prepareStarsForPayment({
					messageCount: 1,
					peerId: target.peerId
				});
				if (preparedPayment === PAYMENT_REJECTED) continue;
				options.send(managers, target, preparedPayment);
				++sent;
			}
			if (!sent) return;
			const isMulti = chosen.length > 1;
			const single = chosen[0];
			if (!isMulti && options.openAfter) {
				hotReloadGuard.appImManager.setInnerPeer({ peerId: single.peerId });
				return;
			}
			if (isMulti) {
				const key = options.toastKeyForMany || options.toastKey;
				if (key) toastNew({
					langPackKey: key,
					langPackArguments: [sent]
				});
			} else if (options.toastKey || options.toastKeyForSelf) {
				const key = single.peerId === rootScope.myId ? options.toastKeyForSelf || options.toastKey : options.toastKey;
				if (key) toastNew({
					langPackKey: key,
					langPackArguments: [await wrapPeerTitle({ peerId: single.peerId })]
				});
			}
		}
	});
}
function shareUrlToPeers(options) {
	const copyFooter = options.multiSelect && createCopyLinkFooter({
		confirmLangKey: "Send",
		copy: () => {
			copyTextToClipboard(options.url);
			toastNew({ langPackKey: "LinkCopied" });
		},
		confirm: () => popup.finalize()
	});
	const popup = shareToPeers({
		...options,
		...copyFooter || {},
		send: (managers, { peerId, threadId, monoforumThreadId }, confirmedPaymentResult) => {
			managers.appMessagesManager.sendText({
				peerId,
				threadId,
				text: options.url,
				replyToMonoforumPeerId: monoforumThreadId,
				confirmedPaymentResult
			});
		}
	});
}
//#endregion
export { shareUrlToPeers as n, shareToPeers as t };
