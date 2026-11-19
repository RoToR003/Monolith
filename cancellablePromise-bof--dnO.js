//# allFunctionsCalledOnLoad
import { t as noop } from "./noop-H9NNBLfX.js";
//#region src/helpers/cancellablePromise.ts
var deferredHelper = {
	isFulfilled: false,
	isRejected: false,
	notify: () => {},
	notifyAll: function(...args) {
		this.lastNotify = args;
		this.listeners?.forEach((callback) => callback(...args));
	},
	addNotifyListener: function(callback) {
		if (this.lastNotify) callback(...this.lastNotify);
		if (this.isFulfilled || this.isRejected) return;
		(this.listeners ?? (this.listeners = [])).push(callback);
	},
	resolve: function(value) {
		if (this.isFulfilled || this.isRejected) return;
		this.isFulfilled = true;
		this._resolve(value);
		this.onFinish();
	},
	reject: function(...args) {
		if (this.isRejected || this.isFulfilled) return;
		this.isRejected = true;
		this._reject(...args);
		this.onFinish();
	},
	onFinish: function() {
		this.notify = this.notifyAll = this.lastNotify = null;
		if (this.listeners) this.listeners.length = 0;
		if (this.cancel) this.cancel = noop;
	}
};
function deferredPromise() {
	let resolve, reject;
	const deferred = new Promise((_resolve, _reject) => {
		resolve = _resolve, reject = _reject;
	});
	Object.assign(deferred, deferredHelper);
	deferred._resolve = resolve;
	deferred._reject = reject;
	return deferred;
}
function bindPromiseToDeferred(promise, deferred) {
	promise.then(deferred.resolve.bind(deferred), deferred.reject.bind(deferred));
}
self.deferredPromise = deferredPromise;
//#endregion
export { deferredPromise as n, bindPromiseToDeferred as t };
