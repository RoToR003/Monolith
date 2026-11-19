//# allFunctionsCalledOnLoad
import { n as logger } from "./logger-7zf0rNYS.js";
//#region src/helpers/eventListenerBase.ts
var log = logger("EVENTS");
var lastListenerId = 0;
var EventListenerBase = class {
	constructor(reuseResults) {
		this._constructor(reuseResults);
	}
	_constructor(reuseResults) {
		this.reuseResults = reuseResults;
		this.listeners = {};
		this.listenerResults = {};
	}
	addEventListener(name, callback, options) {
		var _this$listeners;
		const listenerObject = {
			callback,
			options,
			id: ++lastListenerId
		};
		((_this$listeners = this.listeners)[name] ?? (_this$listeners[name] = /* @__PURE__ */ new Set())).add(listenerObject);
		if (this.listenerResults.hasOwnProperty(name)) {
			callback(...this.listenerResults[name]);
			if (options?.once) {
				this.listeners[name].delete(listenerObject);
				return;
			}
		}
	}
	addMultipleEventsListeners(obj) {
		for (const i in obj) this.addEventListener(i, obj[i]);
	}
	removeEventListener(name, callback, options) {
		if (this.listeners[name]) {
			for (const l of this.listeners[name]) if (l.callback === callback) {
				this.listeners[name].delete(l);
				break;
			}
		}
	}
	invokeListenerCallback(name, listener, ...args) {
		let result, error;
		try {
			result = listener.callback(...args);
		} catch (err) {
			error = err;
		}
		if (listener.options?.once) this.removeEventListener(name, listener.callback);
		if (error) throw error;
		return result;
	}
	_dispatchEvent(name, collectResults, ...args) {
		if (this.reuseResults) this.listenerResults[name] = args;
		const results = collectResults && [];
		const listeners = this.listeners[name];
		const lastId = lastListenerId;
		for (const listener of listeners || []) {
			if (listener.id > lastId) continue;
			try {
				const result = this.invokeListenerCallback(name, listener, ...args);
				if (results) results.push(result);
			} catch (err) {
				if (results) throw err;
				log.error("listener error", name, err);
			}
		}
		return results;
	}
	dispatchResultableEvent(name, ...args) {
		return this._dispatchEvent(name, true, ...args);
	}
	dispatchEvent(name, ...args) {
		this._dispatchEvent(name, false, ...args);
	}
	cleanup() {
		this.listeners = {};
		this.listenerResults = {};
	}
};
//#endregion
export { EventListenerBase as t };
