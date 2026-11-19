//# allFunctionsCalledOnLoad
import { p as MOUNT_CLASS_TO } from "./userAgent-ByGXcznk.js";
import { t as superMessagePort_default } from "./superMessagePort-DhrhiTig.js";
//#region src/lib/lottie/lottieMessagePort.ts
var LottieMessagePort = class extends superMessagePort_default {
	constructor() {
		super("LOTTIE");
		this.lastIndex = -1;
	}
	getNextWorkerIndex() {
		return this.lastIndex = (this.lastIndex + 1) % this.sendPorts.length;
	}
	invokeLottie(workerId, method, payload, transfer) {
		return this.invokeAs(method, payload, this.sendPorts[workerId], transfer);
	}
	invokeLottieVoid(workerId, method, payload, transfer) {
		this.invokeVoidAs(method, payload, this.sendPorts[workerId], transfer);
	}
	getWorkerIndexForName(name) {
		let hash = 0;
		for (let i = 0; i < name.length; ++i) hash = hash * 31 + name.charCodeAt(i) | 0;
		return Math.abs(hash) % this.sendPorts.length;
	}
	/** One call to every worker, resolved once all have answered */
	invokeLottieEverywhere(method, payload) {
		return this.invokeExceptSourceAsyncAs(method, payload);
	}
	get workersCount() {
		return this.sendPorts.length;
	}
	suspendAllTabPlayers(suspend) {
		for (const port of this.sendPorts) this.invokeVoidAs(suspend ? "suspendTab" : "resumeTab", void 0, port);
	}
	terminateAll() {
		const ports = this.sendPorts.slice();
		for (const port of ports) {
			this.invokeVoidAs("terminate", void 0, port);
			this.detachPort(port);
		}
	}
};
var lottieMessagePort = new LottieMessagePort();
MOUNT_CLASS_TO && (MOUNT_CLASS_TO.lottieMessagePort = lottieMessagePort);
//#endregion
export { lottieMessagePort as t };
