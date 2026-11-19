//# allFunctionsCalledOnLoad
import { f as DEBUG, p as MOUNT_CLASS_TO } from "./userAgent-ByGXcznk.js";
import { t as noop } from "./noop-H9NNBLfX.js";
import { A as captureCallAccount, N as holdCall, t as apiManagerProxy } from "./apiManagerProxy-DmQXvxSF.js";
import { n as rootScope } from "./rootScope-CZS0lmz8.js";
import { n as logger } from "./logger-7zf0rNYS.js";
import { t as EventListenerBase } from "./eventListenerBase-da40Q-0t.js";
import { E as nextRandomUint } from "./index-B7axFZql.js";
import { N as groupCallToInput } from "./getChatMigratedTo-ChhMNXuu.js";
import { t as groupCallsController } from "./groupCallsController-DyR0wA3M.js";
//#region src/lib/calls/rtmpState.ts
var RTMP_STATE = /* @__PURE__ */ function(RTMP_STATE) {
	RTMP_STATE[RTMP_STATE["PLAYING"] = 0] = "PLAYING";
	RTMP_STATE[RTMP_STATE["BUFFERING"] = 1] = "BUFFERING";
	RTMP_STATE[RTMP_STATE["CONNECTING"] = 2] = "CONNECTING";
	RTMP_STATE[RTMP_STATE["CLOSED"] = 3] = "CLOSED";
	return RTMP_STATE;
}(RTMP_STATE || {});
//#endregion
//#region src/lib/calls/callTransitionCoordinator.ts
var CallTransitionCoordinator = class {
	constructor(reserveConferenceTransition = () => groupCallsController.reserveConferenceTransition()) {
		this.reserveConferenceTransition = reserveConferenceTransition;
		this.transitionQueue = Promise.resolve();
	}
	run(callback) {
		const previous = this.transitionQueue;
		const reservation = this.reserveConferenceTransition();
		const transition = (async () => {
			let release;
			try {
				release = await reservation;
			} catch (err) {
				await previous;
				throw err;
			}
			try {
				await previous;
				return await callback();
			} finally {
				release();
			}
		})();
		this.transitionQueue = transition.then(() => void 0, () => void 0);
		return transition;
	}
};
var callTransitionCoordinator = new CallTransitionCoordinator();
//#endregion
//#region src/lib/calls/rtmpCallsController.ts
var log = logger("RTMP");
var RtmpCallInstance = class extends EventListenerBase {
	constructor(params) {
		super(false);
		Object.assign(this, params);
		this._state = RTMP_STATE.CONNECTING;
		this.heldCall = holdCall(this.accountNumber);
		this.heldCall.setId(this.call.id);
	}
	cleanup() {
		this.heldCall.release();
		super.cleanup();
	}
	get state() {
		return this._state;
	}
	set state(value) {
		this._state = value;
		this.dispatchEvent("state", value);
	}
};
var RtmpCallsController = class extends EventListenerBase {
	constructor(..._args) {
		super(..._args);
		this.currentCallGeneration = 0;
		this.onGroupCallUpdate = (update) => {
			if (update.id !== this.currentCall?.call.id) return;
			if (update._ === "groupCallDiscarded") {
				this.currentCall = void 0;
				return;
			}
			this.currentCall.call = update;
			this.dispatchEvent("currentCallChanged", this.currentCall);
		};
	}
	construct(managers) {
		this.managers = managers;
		rootScope.addEventListener("group_call_update", this.onGroupCallUpdate);
		apiManagerProxy.serviceMessagePort.addEventListener("rtmpStreamTime", ({ callId, time }) => {
			if (this.currentCall?.call.id === callId) this.currentCall.lastKnownTime = time;
		});
		if (typeof window !== "undefined") window.addEventListener("pagehide", () => {
			const { currentCall } = this;
			if (currentCall) currentCall.managers.appGroupCallsManager.hangUp(currentCall.call.id, currentCall.ssrc).catch(noop);
		});
	}
	get currentCall() {
		return this._currentCall;
	}
	set currentCall(value) {
		if (this.currentCall === value) return;
		this._currentCall?.cleanup();
		++this.currentCallGeneration;
		this.dispatchEvent("currentCallChanged", this._currentCall = value);
	}
	randomSsrc() {
		return (Math.random() < .5 ? -1 : 1) * nextRandomUint(16);
	}
	getJoinPayload(ssrc) {
		return {
			_: "dataJSON",
			data: JSON.stringify({
				"fingerprints": [],
				"pwd": "",
				"ssrc": ssrc,
				"ssrc-groups": [],
				"ufrag": ""
			})
		};
	}
	async joinCall(chatId, account = captureCallAccount(this.managers), expectedCallId) {
		if (this.currentCall) throw new Error("Already in rtmp call");
		const peerId = chatId.toPeerId(true);
		this.dispatchEvent("startedJoining", peerId);
		const ssrc = this.randomSsrc();
		const data = this.getJoinPayload(ssrc);
		const { managers } = account;
		const chat = await managers.appProfileManager.getChatFull(chatId);
		if (chat._ !== "channelFull") throw new Error("Not a chat");
		const callId = chat.call?.id;
		if (!callId) throw new Error("No call id");
		if (expectedCallId !== void 0 && String(callId) !== String(expectedCallId)) throw new Error("Not the call asked for");
		const call = await managers.appGroupCallsManager.getGroupCallFull(callId);
		if (call._ !== "groupCall") throw new Error("Not a group call");
		const update = await managers.appGroupCallsManager.joinGroupCall(callId, data, { type: "main" });
		let instance;
		try {
			if (JSON.parse(update.params.data).rtmp !== true) throw new Error("Not an rtmp call");
			instance = new RtmpCallInstance({
				call,
				inputCall: groupCallToInput(call),
				chatId,
				peerId,
				ssrc,
				pip: false,
				admin: Boolean(chat.pFlags?.can_delete_channel),
				lastKnownTime: "0",
				...account
			});
		} catch (err) {
			await this.compensateAcceptedJoin(managers, update.acceptedCallInput, ssrc, "initial RTMP join");
			throw err;
		}
		this.currentCall = instance;
	}
	async leaveCall(discard = false, expectedCall) {
		const currentCall = this.currentCall;
		if (!currentCall || expectedCall && currentCall !== expectedCall) return false;
		this.currentCall = void 0;
		apiManagerProxy.serviceMessagePort.invokeVoid("leaveRtmpCall", [currentCall.call.id, true]);
		await currentCall.managers.appGroupCallsManager.hangUp(currentCall.call.id, discard ? true : currentCall.ssrc);
		return true;
	}
	async isCurrentCallDead(checkJoined = false, triedRejoin = false) {
		const { currentCall } = this;
		if (!currentCall) return "dead";
		const state = await currentCall.managers.appGroupCallsManager.fetchRtmpState(currentCall.inputCall);
		if (!checkJoined) return state.channels.length === 0 ? "dead" : "alive";
		const unified = state.channels.find((it) => it.channel === 1);
		if (!unified) return "dead";
		try {
			const time = this.currentCall.lastKnownTime === "0" ? unified.last_timestamp_ms : this.currentCall.lastKnownTime;
			await currentCall.managers.appGroupCallsManager.fetchRtmpPart({
				_: "inputGroupCallStream",
				call: this.currentCall.inputCall,
				video_channel: 1,
				video_quality: 2,
				scale: unified.scale,
				time_ms: time
			}, state.dcId);
			return "alive";
		} catch (e) {
			if (e.type === "GROUPCALL_JOIN_MISSING" && !triedRejoin) try {
				await this.rejoinCall();
				return await this.isCurrentCallDead(true, true);
			} catch (err) {
				log.error("rejoinCall failed during dead-call check", err);
			}
		}
		return "dying";
	}
	rejoinCall() {
		if (this.rejoinPromise) return this.rejoinPromise;
		const promise = callTransitionCoordinator.run(() => this.rejoinCallInternal()).finally(() => {
			if (this.rejoinPromise === promise) this.rejoinPromise = void 0;
		});
		this.rejoinPromise = promise;
		return promise;
	}
	async rejoinCallInternal() {
		const currentCall = this.currentCall;
		if (!currentCall) return;
		const generation = this.currentCallGeneration;
		const ssrc = this.randomSsrc();
		const data = this.getJoinPayload(ssrc);
		const update = await currentCall.managers.appGroupCallsManager.joinGroupCall(currentCall.call.id, data, {
			type: "main",
			e2eCallInput: currentCall.inputCall
		});
		if (this.currentCall !== currentCall || this.currentCallGeneration !== generation) {
			await this.compensateAcceptedJoin(currentCall.managers, update.acceptedCallInput, ssrc, "late RTMP rejoin");
			return;
		}
		currentCall.ssrc = ssrc;
	}
	async compensateAcceptedJoin(managers, call, ssrc, context) {
		try {
			await managers.appGroupCallsManager.leaveGroupCall(call, ssrc);
		} catch (err) {
			log.error(`${context} compensation failed`, err);
		}
	}
};
var rtmpCallsController = new RtmpCallsController();
DEBUG && (MOUNT_CLASS_TO.rtmpCallsController = rtmpCallsController);
//#endregion
export { RTMP_STATE as i, rtmpCallsController as n, callTransitionCoordinator as r, RtmpCallInstance as t };
