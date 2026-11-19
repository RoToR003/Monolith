//# allFunctionsCalledOnLoad
//#region src/helpers/listenerSetter.ts
var isNode = (element) => typeof element.nodeType === "number";
var NODES_SWEEP_MIN = 64;
var ListenerSetter = class {
	constructor() {
		this.listeners = /* @__PURE__ */ new Set();
		this.nodeListeners = /* @__PURE__ */ new WeakMap();
		this.nodes = /* @__PURE__ */ new Set();
		this.nodesSweepAt = NODES_SWEEP_MIN;
		this.cleanups = /* @__PURE__ */ new Set();
	}
	add(element) {
		return ((event, callback, options) => {
			const listener = {
				element,
				event,
				callback,
				options
			};
			this.addManual(listener);
			return listener;
		});
	}
	addManual(listener) {
		listener.element.addEventListener(listener.event, listener.callback, listener.options);
		if (listener.options?.once) {
			listener.onceCallback = () => {
				this.remove(listener);
				listener.onceFired = true;
			};
			listener.element.addEventListener(listener.event, listener.onceCallback, listener.options);
		}
		const { element } = listener;
		if (!isNode(element)) {
			this.listeners.add(listener);
			return;
		}
		let entry = this.nodeListeners.get(element);
		if (!entry) {
			this.nodeListeners.set(element, entry = {
				ref: new WeakRef(element),
				listeners: /* @__PURE__ */ new Set()
			});
			this.nodes.add(entry.ref);
			if (this.nodes.size >= this.nodesSweepAt) this.sweepNodes();
		}
		entry.listeners.add(listener);
	}
	sweepNodes() {
		for (const ref of this.nodes) if (!ref.deref()) this.nodes.delete(ref);
		this.nodesSweepAt = Math.max(NODES_SWEEP_MIN, this.nodes.size * 2);
	}
	remove(listener) {
		if (!listener.onceFired) {
			listener.element.removeEventListener(listener.event, listener.callback, listener.options);
			if (listener.onceCallback) listener.element.removeEventListener(listener.event, listener.onceCallback, listener.options);
		}
		const { element } = listener;
		if (!isNode(element)) {
			this.listeners.delete(listener);
			return;
		}
		const entry = this.nodeListeners.get(element);
		if (entry?.listeners.delete(listener) && !entry.listeners.size) {
			this.nodeListeners.delete(element);
			this.nodes.delete(entry.ref);
		}
	}
	removeManual(element, event, callback, options) {
		const listeners = isNode(element) ? this.nodeListeners.get(element)?.listeners : this.listeners;
		if (!listeners) return;
		for (const listener of listeners) if (listener.element === element && listener.event === event && listener.callback === callback && listener.options === options) {
			this.remove(listener);
			break;
		}
	}
	addCleanup(cleanup) {
		this.cleanups.add(cleanup);
		return () => this.cleanups.delete(cleanup);
	}
	removeAll() {
		this.listeners.forEach((listener) => {
			this.remove(listener);
		});
		for (const ref of this.nodes) {
			const node = ref.deref();
			(node && this.nodeListeners.get(node))?.listeners.forEach((listener) => this.remove(listener));
		}
		this.nodes.clear();
		this.nodesSweepAt = NODES_SWEEP_MIN;
		this.cleanups.forEach((cleanup) => cleanup());
		this.cleanups.clear();
	}
};
//#endregion
export { ListenerSetter as t };
