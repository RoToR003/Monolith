//# allFunctionsCalledOnLoad
import { p as MOUNT_CLASS_TO } from "./userAgent-ByGXcznk.js";
import { n as fastRaf } from "./schedulers-Cx0-7a1P.js";
import { n as deferredPromise } from "./cancellablePromise-bof--dnO.js";
//#region src/helpers/dom/isInDOM.ts
function isInDOM(element) {
	return !!element?.isConnected;
}
//#endregion
//#region src/helpers/sequentialDom.ts
var SequentialDom = class {
	constructor() {
		this.promises = {};
		this.raf = fastRaf.bind(null);
		this.scheduled = false;
	}
	do(kind, callback) {
		let promise = this.promises[kind];
		if (!promise) {
			this.scheduleFlush();
			promise = this.promises[kind] = deferredPromise();
		}
		if (callback !== void 0) promise.then(() => callback());
		return promise;
	}
	measure(callback) {
		return this.do("read", callback);
	}
	mutate(callback) {
		return this.do("write", callback);
	}
	/**
	* Will fire instantly if element is not connected
	* @param element
	* @param callback
	*/
	mutateElement(element, callback) {
		const isConnected = isInDOM(element);
		const promise = isConnected ? this.mutate() : Promise.resolve();
		if (callback !== void 0) {
			if (!isConnected) callback();
			else promise.then(() => callback());
		}
		return promise;
	}
	scheduleFlush() {
		if (!this.scheduled) {
			this.scheduled = true;
			this.raf(() => {
				this.promises.read && this.promises.read.resolve();
				this.promises.write && this.promises.write.resolve();
				this.scheduled = false;
				this.promises = {};
			});
		}
	}
};
var sequentialDom = new SequentialDom();
MOUNT_CLASS_TO && (MOUNT_CLASS_TO.sequentialDom = sequentialDom);
//#endregion
export { isInDOM as n, sequentialDom as t };
