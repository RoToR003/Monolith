//# allFunctionsCalledOnLoad
import { p as MOUNT_CLASS_TO } from "./userAgent-ByGXcznk.js";
import { t as noop } from "./noop-H9NNBLfX.js";
import { g as SEND_PAID_WITH_STARS_DELAY, n as rootScope } from "./rootScope-CZS0lmz8.js";
import { a as i18n, u as langPack_default } from "./langPack-BmdJGr44.js";
import { C as createSignal, M as onCleanup, g as createEffect, p as createComponent, x as createRoot, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { n as bindManagersToSession } from "./bindManagersToAccount-BL82O9H9.js";
import { c as useAppState } from "./contentSettings-DMhHR-0w.js";
import { c as insert, f as setAttribute, g as template, u as memo } from "./web-BPyQozky.js";
import { n as hotReloadGuard } from "./hotReloadGuardProvider-CHEsZRuG.js";
import { t as classNames } from "./classNames-DxGDjmvw.js";
import { t as animate } from "./animation-Dd3Xpw_9.js";
import { dt as wrapPeerTitle, t as confirmationPopup } from "./confirmationPopup-Bz6mK0o-.js";
import { D as A11yButton, j as showTooltip } from "./openEditors-7FmA7q_V.js";
import { i as useStars, r as setReservedStars } from "./stars-RHwyveTa.js";
import { t as eachSecond } from "./eachSecond-BNMFzIIa.js";
import { t as AnimatedCounter } from "./animatedCounter-DSopLGin.js";
//#region src/components/chat/chatToast.tsx
var current;
var isListenerSet = false;
/**
* A toast docked just below the chat topbar (and floating pinned plates).
*
* Mounted on the .chat element (sibling to .topbar / .bubbles), NOT inside
* .bubbles: .bubbles is a transformed z-index:1 stacking context that would
* trap the toast below the topbar (z-index:2) and chat input. Docking is done
* by the chat-toast class (see _chatToast.scss).
*
* Only one toast is shown at a time — showing a new one hides the previous.
*/
function showChatToast(options) {
	current?.hide();
	if (!isListenerSet) {
		isListenerSet = true;
		hotReloadGuard.appImManager.addEventListener("peer_changed", () => {
			if (current?.closeOnPeerChange) current.hide();
		});
	}
	options.title?.classList.add("text-bold");
	const { close } = showTooltip({
		element: hotReloadGuard.appImManager.chat.container,
		container: hotReloadGuard.appImManager.chat.container,
		mountOn: hotReloadGuard.appImManager.chat.container,
		relative: true,
		vertical: "top",
		class: classNames("chat-toast", `chat-toast--${options.animation ?? "slide"}`, options.class),
		icon: options.icon,
		textElement: options.title ?? options.textElement,
		subtitleElement: options.title && options.textElement,
		rightElement: options.rightElement,
		onClose: () => {
			if (current === entry) current = void 0;
			options.onHide?.();
		}
	});
	const entry = current = {
		hide: close,
		closeOnPeerChange: options.closeOnPeerChange ?? true
	};
	if (options.duration) setTimeout(close, options.duration);
	return { hide: close };
}
//#endregion
//#region src/components/chat/undoablePaidTooltip.tsx
var _tmpl$ = /*#__PURE__*/ template(`<span class=tooltip-undo-timer aria-hidden=true><svg class=tooltip-undo-timer-svg width=24px height=24px><circle cx=12 cy=12 r=10 class=tooltip-undo-timer-circle transform="rotate(-90, 12, 12)"></circle></svg><span class=tooltip-undo-timer-number>`);
var paidReactionLangKeys = {
	titleKey: "PaidReaction.Sent",
	subtitleKey: "StarsSentText"
};
var paidMessagesLangKeys = {
	titleKey: "PaidMessages.MessagesSent",
	subtitleKey: "PaidMessages.YouPaidForMessages"
};
function showUndoablePaidTooltip(props) {
	createRoot((dispose) => {
		const [secondsLeft, setSecondsLeft] = createSignal();
		const [progressCircumference, setProgressCircumference] = createSignal();
		const title = new langPack_default.IntlElement({ key: props.titleKey });
		const subtitle = new langPack_default.IntlElement({ key: props.subtitleKey });
		createEffect(() => {
			title.compareAndUpdate({ args: [props.titleCount()] });
			subtitle.compareAndUpdate({ args: [props.subtitleCount()] });
		});
		createEffect(() => {
			if (!!!props.sendTime()) {
				dispose();
				hide();
			} else {
				const disposeTimer = eachSecond(() => {
					setSecondsLeft((props.sendTime() - Date.now()) / 1e3 | 0);
				});
				animate(() => {
					const progress = (props.sendTime() - Date.now()) / SEND_PAID_WITH_STARS_DELAY;
					setProgressCircumference(progress * circumference);
					return !cleaned;
				});
				let cleaned = false;
				onCleanup(() => {
					cleaned = true;
					disposeTimer();
				});
			}
		});
		const circumference = 20 * Math.PI;
		const countdown = new AnimatedCounter({ reverse: false });
		createEffect(() => countdown.setCount(secondsLeft()));
		const { hide } = showChatToast({
			animation: "fade",
			closeOnPeerChange: false,
			class: classNames("paid-reaction-tooltip", props.wider && "paid-reaction-tooltip--a-little-wider"),
			title: title.element,
			textElement: subtitle.element,
			rightElement: createComponent(A11yButton, {
				as: "span",
				"class": "tooltip-undo",
				get ["aria-label"]() {
					return langPack_default.format("Undo", true);
				},
				onClick: () => void props.onUndo(),
				get children() {
					return [memo(() => i18n("Undo")), (() => {
						var _el$ = _tmpl$(), _el$2 = _el$.firstChild, _el$3 = _el$2.firstChild, _el$4 = _el$2.nextSibling;
						insert(_el$4, () => countdown.container);
						createRenderEffect(() => setAttribute(_el$3, "stroke-dasharray", `${progressCircumference()} ${circumference}`));
						return _el$;
					})()];
				}
			}),
			icon: "star"
		});
	});
}
//#endregion
//#region src/components/chat/pendingUndoableMessage.ts
var createPendingUndoableMessage = () => createRoot((dispose) => {
	const [messageCount, setMessageCount] = createSignal(0);
	const [sendTime, setSendTime] = createSignal(0);
	const [reserved, setReserved] = createSignal(0);
	let abortController = new AbortController();
	return {
		timeoutId: 0,
		messageCount,
		setMessageCount,
		sendTime,
		setSendTime,
		reserved,
		setReserved,
		abort() {
			abortController.abort();
		},
		get signal() {
			return abortController.signal;
		},
		softReset() {
			self.clearTimeout(this.timeoutId);
			this.timeoutId = 0;
			abortController = new AbortController();
		},
		resetGlobalReserved() {
			setReservedStars((prev) => prev - reserved());
		},
		reset() {
			this.softReset();
			setSendTime(0);
			setMessageCount(0);
			setReserved(0);
		},
		dispose
	};
});
//#endregion
//#region src/components/chat/paidMessagesInterceptor.ts
var _PaidMessagesInterceptor;
var PAYMENT_REJECTED = Symbol("Payment rejected");
var PaidMessagesInterceptor = class PaidMessagesInterceptor {
	constructor(chat, managers) {
		this.chat = chat;
		this.managers = managers;
		this.pendingUndoableMessage = createPendingUndoableMessage();
	}
	dispose() {
		this.pendingUndoableMessage.dispose();
	}
	static get starsBalance() {
		return +useStars()();
	}
	/**
	* The starsAmount better be provided by this interceptor and then passed manually to the send method
	* to make sure we don't accidentally send stars in a case that might have not been handled
	*/
	async prepareStarsForPayment(messageCount) {
		const { peerId, starsAmount } = this.chat;
		if (!starsAmount) return;
		const totalStarsAmount = messageCount * starsAmount;
		if (PaidMessagesInterceptor.starsBalance < totalStarsAmount) {
			this.pendingUndoableMessage.abort();
			hotReloadGuard.showStarsPopup({ spendPurposePeerId: peerId });
			return PAYMENT_REJECTED;
		}
		const userConfirmation = await PaidMessagesInterceptor.checkIfUserReallyWantsToPay({
			peerId,
			messageCount,
			starsAmount,
			withDontShowAgain: true
		});
		if (userConfirmation === 2) return PAYMENT_REJECTED;
		const canUndo = PaidMessagesInterceptor.canUndoMessageSending({
			userConfirmation,
			messageCount,
			starsAmount
		}) || !!this.pendingUndoableMessage.messageCount();
		if (canUndo) {
			setReservedStars((prev) => prev + totalStarsAmount);
			this.pendingUndoableMessage.setReserved((prev) => prev + totalStarsAmount);
			this.triggerUndoableMessages({
				peerId,
				messageCount,
				starsAmount
			});
		}
		return {
			starsAmount,
			canUndo
		};
	}
	static canUndoMessageSending(args) {
		const { messageCount, starsAmount, userConfirmation } = args;
		if (0 !== userConfirmation) return false;
		return starsAmount >= this.MIN_UNDO_SENDING_PARAMS.starsAmount || messageCount >= this.MIN_UNDO_SENDING_PARAMS.messageCount;
	}
	/**
	* Static method - to be used outside a chat instance
	*
	* The starsAmount better be provided by this interceptor and then passed manually to the send method
	* to make sure we don't accidentally send stars in a case that might have not been handled
	*/
	static async prepareStarsForPayment(args) {
		const { peerId, messageCount } = args;
		const starsAmount = await rootScope.managers.appPeersManager.getStarsAmount(peerId);
		if (!starsAmount) return;
		const totalStarsAmount = messageCount * starsAmount;
		if (PaidMessagesInterceptor.starsBalance < totalStarsAmount) {
			hotReloadGuard.showStarsPopup({ spendPurposePeerId: peerId });
			return PAYMENT_REJECTED;
		}
		if (await PaidMessagesInterceptor.checkIfUserReallyWantsToPay({
			peerId,
			messageCount,
			starsAmount,
			withDontShowAgain: false
		}) === 2) return PAYMENT_REJECTED;
		return {
			starsAmount,
			canUndo: false
		};
	}
	static async checkIfUserReallyWantsToPay({ peerId, messageCount, starsAmount, withDontShowAgain }) {
		const totalStarsAmount = starsAmount * messageCount;
		let onNotShowAgain = noop;
		if (withDontShowAgain) {
			const { dontShowPaidMessageWarningFor = [] } = await rootScope.managers.appStateManager.getState();
			if (!!dontShowPaidMessageWarningFor.includes(peerId)) return 0;
			onNotShowAgain = () => {
				const [, setAppState] = useAppState();
				setAppState("dontShowPaidMessageWarningFor", [...dontShowPaidMessageWarningFor, peerId]);
			};
		}
		try {
			const dontShowAgain = await confirmationPopup({
				titleLangKey: "ConfirmPayment",
				descriptionLangKey: messageCount > 1 ? "PaidMessages.UserChargesForMultipleMessageWarning" : "PaidMessages.UserChargesForOneMessageWarning",
				descriptionLangArgs: [
					await wrapPeerTitle({
						peerId,
						onlyFirstName: true
					}),
					i18n("Stars", [starsAmount]),
					i18n("Stars", [totalStarsAmount]),
					...messageCount > 1 ? [messageCount] : []
				],
				checkbox: withDontShowAgain ? { text: "DontAskAgain" } : void 0,
				button: {
					langKey: "PaidMessages.PayForMessages",
					langArgs: [messageCount]
				}
			});
			if (withDontShowAgain && dontShowAgain) onNotShowAgain();
		} catch {
			return 2;
		}
		return 1;
	}
	triggerUndoableMessages({ peerId, messageCount, starsAmount }) {
		const managers = bindManagersToSession(this.managers);
		this.pendingUndoableMessage.setMessageCount((prev) => prev + messageCount);
		this.pendingUndoableMessage.setSendTime(Date.now() + SEND_PAID_WITH_STARS_DELAY);
		if (!this.pendingUndoableMessage.timeoutId) showUndoablePaidTooltip({
			sendTime: this.pendingUndoableMessage.sendTime,
			titleCount: this.pendingUndoableMessage.messageCount,
			subtitleCount: () => this.pendingUndoableMessage.messageCount() * starsAmount,
			onUndo: () => void this.pendingUndoableMessage.abort(),
			...paidMessagesLangKeys
		});
		this.pendingUndoableMessage.softReset();
		this.pendingUndoableMessage.signal.addEventListener("abort", () => {
			this.managers.appMessagesManager.cancelQueuedPaidMessages(peerId);
			this.pendingUndoableMessage.resetGlobalReserved();
			this.pendingUndoableMessage.reset();
		});
		this.pendingUndoableMessage.timeoutId = self.setTimeout(() => {
			managers.appMessagesManager.sendQueuedPaidMessages(peerId);
			this.pendingUndoableMessage.reset();
		}, SEND_PAID_WITH_STARS_DELAY);
	}
};
_PaidMessagesInterceptor = PaidMessagesInterceptor;
_PaidMessagesInterceptor.MIN_UNDO_SENDING_PARAMS = {
	starsAmount: 100,
	messageCount: 3
};
_PaidMessagesInterceptor.PaymentRejectedSymbol = PAYMENT_REJECTED;
MOUNT_CLASS_TO["PaidMessagesInterceptor"] = PaidMessagesInterceptor;
//#endregion
export { showChatToast as a, showUndoablePaidTooltip as i, PaidMessagesInterceptor as n, paidReactionLangKeys as r, PAYMENT_REJECTED as t };
