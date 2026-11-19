//#region \0rolldown/runtime.js
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJSMin = (cb, mod) => () => (mod || (cb((mod = { exports: {} }).exports, mod), cb = null), mod.exports);
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
		key = keys[i];
		if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
			get: ((k) => from[k]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule || !__hasOwnProp.call(mod, "default") ? __defProp(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));
//#endregion
//#region src/helpers/bytes/bufferConcats.ts
function bufferConcats(...args) {
	const length = args.reduce((acc, v) => acc + (v.byteLength || v.length), 0);
	const tmp = new Uint8Array(length);
	let lastLength = 0;
	args.forEach((b) => {
		tmp.set(b instanceof ArrayBuffer ? new Uint8Array(b) : b, lastLength);
		lastLength += b.byteLength || b.length;
	});
	return tmp;
}
//#endregion
//#region src/lib/polyfill.ts
Uint8Array.prototype.concat = function(...args) {
	return bufferConcats(this, ...args);
};
Uint8Array.prototype.toJSON = function() {
	return [...this];
};
Promise.prototype.finally = Promise.prototype.finally || function(fn) {
	const onFinally = (callback) => Promise.resolve(fn()).then(callback);
	return this.then((result) => onFinally(() => result), (reason) => onFinally(() => Promise.reject(reason)));
};
//#endregion
//#region src/environment/ctx.ts
const ctx$1 = typeof window !== "undefined" ? window : self;
//#endregion
//#region src/helpers/listenMessagePort.ts
function listenMessagePort(messagePort, onConnect, onDisconnect) {
	const attachPort = (listenPort, sendPort) => {
		messagePort.attachListenPort(listenPort);
		sendPort && messagePort.attachSendPort(sendPort);
		onConnect?.(listenPort);
	};
	messagePort.setOnPortDisconnect(onDisconnect);
	if (typeof SharedWorkerGlobalScope !== "undefined") ctx$1.addEventListener("connect", (e) => attachPort(e.source, e.source));
	else if (typeof ServiceWorkerGlobalScope !== "undefined") attachPort(ctx$1, null);
	else attachPort(ctx$1, ctx$1);
}
//#endregion
//#region src/config/modes.ts
const KEPT_FLAGS_KEY = "experimental_flags";
const KEPT_FLAGS = [
	"debug",
	"logs",
	"a11y",
	"rtl",
	"noSharedWorker",
	"noServiceWorker",
	"noWorker",
	"noOffscreenCanvas",
	"noObjectUrlRevoke",
	"noPfs",
	"http",
	"noMultipleTransports",
	"forceHideNonContactLinks"
];
function getKeptFlags() {
	try {
		const flags = JSON.parse(localStorage.getItem(KEPT_FLAGS_KEY));
		if (Array.isArray(flags)) return new Set(KEPT_FLAGS.filter((flag) => flags.includes(flag)));
	} catch (err) {}
	return /* @__PURE__ */ new Set();
}
const LOADED_KEPT_FLAGS = getKeptFlags();
function isFlagInURL(flag) {
	return location.search.indexOf(flag + "=1") > 0;
}
function isFlagOn(flag) {
	return isFlagInURL(flag) || LOADED_KEPT_FLAGS.has(flag);
}
const Modes = {
	test: isFlagInURL("test") || false,
	debug: isFlagOn("debug"),
	logs: isFlagOn("logs"),
	forceHideNonContactLinks: false,
	http: false,
	ssl: true,
	asServiceWorker: false,
	transport: "websocket",
	noSharedWorker: isFlagOn("noSharedWorker"),
	noServiceWorker: isFlagOn("noServiceWorker"),
	noOffscreenCanvas: isFlagOn("noOffscreenCanvas"),
	noObjectUrlRevoke: isFlagOn("noObjectUrlRevoke"),
	noWorker: isFlagOn("noWorker") || false,
	multipleTransports: !isFlagOn("noMultipleTransports"),
	pfs: !isFlagOn("noPfs"),
	a11y: isFlagOn("a11y"),
	rtl: isFlagOn("rtl"),
	memoryWatch: isFlagInURL("memoryWatch")
};
if (Modes.http = isFlagOn("http")) Modes.multipleTransports = false;
if (Modes.multipleTransports) Modes.http = true;
if (Modes.http) Modes.transport = "https";
//#endregion
//#region src/config/debug.ts
const DEBUG = Modes.debug;
const MOUNT_CLASS_TO = typeof window !== "undefined" ? window : self;
//#endregion
//#region src/config/tabId.ts
const tabId = Date.now() % Math.random() * 1e8 | 0;
//#endregion
//#region src/helpers/array/indexOfAndSplice.ts
function indexOfAndSplice(array, item) {
	const idx = array.indexOf(item);
	return (idx === -1 ? void 0 : array.splice(idx, 1))?.[0];
}
//#endregion
//#region src/helpers/context.ts
const IS_SERVICE_WORKER = typeof ServiceWorkerGlobalScope !== "undefined" && self instanceof ServiceWorkerGlobalScope;
const IS_WEB_WORKER = typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope && !IS_SERVICE_WORKER;
const IS_WORKER = IS_WEB_WORKER || IS_SERVICE_WORKER;
const getWindowClients = () => {
	return self.clients.matchAll({
		includeUncontrolled: false,
		type: "window"
	});
};
const postMessage$1 = (listener, ...args) => {
	try {
		listener.postMessage(...args);
	} catch (err) {
		console.error("[worker] postMessage error:", err, args);
	}
};
const notifyServiceWorker = (all, ...args) => {
	getWindowClients().then((listeners) => {
		if (!listeners.length) return;
		listeners.slice(all ? 0 : -1).forEach((listener) => {
			postMessage$1(listener, ...args);
		});
	});
};
IS_SERVICE_WORKER && notifyServiceWorker.bind(null, false);
IS_SERVICE_WORKER && notifyServiceWorker.bind(null, true);
//#endregion
//#region src/environment/userAgent.ts
const USER_AGENT = navigator ? navigator.userAgent : null;
navigator.userAgent.search(/OS X|iPhone|iPad|iOS/i);
navigator.userAgent.toLowerCase().indexOf("android");
/Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
(() => {
	try {
		return +navigator.userAgent.match(/Chrom(?:e|ium)\/(.+?)(?:\s|\.)/)[1];
	} catch (err) {}
})();
(/iPad|iPhone|iPod/.test(navigator.platform) || navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1) && ctx$1.MSStream;
const IS_SAFARI = !!("safari" in ctx$1) || !!(USER_AGENT && (/\b(iPad|iPhone|iPod)\b/.test(USER_AGENT) || !!USER_AGENT.match("Safari") && !USER_AGENT.match("Chrome")));
const IS_FIREFOX = navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
(navigator.maxTouchPoints === void 0 || navigator.maxTouchPoints > 0) && navigator.userAgent.search(/iOS|iPhone OS|Android|BlackBerry|BB10|Series ?[64]0|J2ME|MIDP|opera mini|opera mobi|mobi.+Gecko|Windows Phone/i);
//#endregion
//#region src/helpers/dT.ts
const _logTimer = Date.now();
function dT() {
	return "[" + ((Date.now() - _logTimer) / 1e3).toFixed(3) + "]";
}
//#endregion
//#region src/lib/debug/logsBuffer.ts
const WANTS_STACK = 3;
const ANSI = /\x1b\[[0-9;]*m/g;
const SRC = IS_SERVICE_WORKER ? "sw" : IS_WEB_WORKER ? "mtproto" : "main";
const RING_SIZE = 4e3;
const MAX_ARGS = 24;
const MAX_DEPTH = 4;
const MAX_STRING = 2048;
const MAX_ARRAY = 64;
const MAX_KEYS = 64;
let enabled = DEBUG || Modes.logs;
const createRing = () => ({
	entries: new Array(RING_SIZE),
	head: 0,
	count: 0
});
const TRANSPORT_PREFIX = "-NET-";
const appRing = createRing();
const transportRing = createRing();
function bounded(s, max) {
	return s.length > max ? s.slice(0, max) + `…(${s.length})` : s;
}
function serialize(value, depth, seen) {
	if (value === void 0) return "[undefined]";
	if (value === null) return null;
	const t = typeof value;
	if (t === "string") return bounded(value, MAX_STRING);
	if (t === "number" || t === "boolean") return value;
	if (t === "bigint") return value.toString() + "n";
	if (t === "symbol") return value.toString();
	if (t === "function") return `ƒ ${value.name || "anonymous"}`;
	if (value instanceof Error) {
		const out = {
			__error: value.name,
			message: value.message,
			stack: value.stack
		};
		for (const key in value) {
			if (key === "name" || key === "message" || key === "stack") continue;
			try {
				out[key] = serialize(value[key], depth + 1, seen);
			} catch (err) {
				out[key] = "[unserializable]";
			}
		}
		return out;
	}
	if (typeof Node !== "undefined" && value instanceof Node) {
		const el = value;
		const id = el.id ? "#" + el.id : "";
		const cls = typeof el.className === "string" && el.className ? "." + el.className.trim().split(/\s+/).join(".") : "";
		return `<${(value.nodeName || "node").toLowerCase()}${id}${cls}>`;
	}
	if (ArrayBuffer.isView(value) || value instanceof ArrayBuffer) {
		const len = value.byteLength ?? value.length;
		return `${value.constructor?.name || "Buffer"}(${len})`;
	}
	if (seen.has(value)) return "[Circular]";
	if (depth >= MAX_DEPTH) return Array.isArray(value) ? `[Array(${value.length})]` : "[Object]";
	seen.add(value);
	try {
		if (Array.isArray(value)) {
			const out = value.slice(0, MAX_ARRAY).map((v) => serialize(v, depth + 1, seen));
			if (value.length > MAX_ARRAY) out.push(`…(+${value.length - MAX_ARRAY})`);
			return out;
		}
		if (value instanceof Map) {
			const out = {
				__map: value.size,
				entries: {}
			};
			let n = 0;
			for (const [k, v] of value) {
				if (n++ >= MAX_KEYS) {
					out.entries["…"] = `(+${value.size - MAX_KEYS})`;
					break;
				}
				out.entries[bounded(String(k), 128)] = serialize(v, depth + 1, seen);
			}
			return out;
		}
		if (value instanceof Set) return {
			__set: value.size,
			values: serialize([...value].slice(0, MAX_ARRAY), depth + 1, seen)
		};
		const out = {};
		let n = 0;
		for (const key in value) {
			if (n++ >= MAX_KEYS) {
				out["…"] = "truncated";
				break;
			}
			try {
				out[key] = serialize(value[key], depth + 1, seen);
			} catch (err) {
				out[key] = "[unserializable]";
			}
		}
		return out;
	} catch (err) {
		return "[unserializable]";
	} finally {
		seen.delete(value);
	}
}
function serializeArgs(args) {
	const slice = args.length > MAX_ARGS ? args.slice(0, MAX_ARGS) : args;
	const seen = /* @__PURE__ */ new WeakSet();
	const out = slice.map((a) => {
		try {
			return serialize(a, 0, seen);
		} catch (err) {
			return "[unserializable]";
		}
	});
	if (args.length > MAX_ARGS) out.push(`…(+${args.length - MAX_ARGS} args)`);
	return out;
}
function trimStack(stack) {
	if (!stack) return stack;
	let lines = stack.split("\n");
	if (lines.length && /^Error\s*$/.test(lines[0])) lines = lines.slice(1);
	let i = 0;
	while (i < lines.length && (lines[i].includes("logsBuffer") || /\blogger\.[tj]s\b/.test(lines[i]))) ++i;
	return lines.slice(i).join("\n");
}
function pushEntry(ring, e) {
	ring.entries[ring.head] = e;
	ring.head = (ring.head + 1) % RING_SIZE;
	if (ring.count < RING_SIZE) ring.count++;
}
/**
* Hot path: called from every logger() invocation. Returns immediately (one
* boolean check) unless buffering is enabled. Enabled === DEBUG by default, so
* normal production users pay nothing; under dev / ?debug=1, or with logs
* collected from Settings → Experimental, it records the full timeline. Never throws.
*/
function capture(level, prefix, args) {
	if (!enabled) return;
	try {
		const entry = {
			t: Date.now(),
			src: SRC,
			level,
			prefix: prefix ? prefix.replace(ANSI, "") : prefix,
			args: serializeArgs(args)
		};
		if (level & WANTS_STACK) entry.stack = trimStack((/* @__PURE__ */ new Error()).stack || "");
		pushEntry(prefix?.includes(TRANSPORT_PREFIX) ? transportRing : appRing, entry);
	} catch (err) {}
}
function clearLogBuffer() {
	appRing.head = appRing.count = 0;
	transportRing.head = transportRing.count = 0;
}
function setLogBufferEnabled(value) {
	enabled = !!value;
}
if (MOUNT_CLASS_TO) {
	MOUNT_CLASS_TO.setLogBufferEnabled = setLogBufferEnabled;
	MOUNT_CLASS_TO.clearLogBuffer = clearLogBuffer;
}
//#endregion
//#region src/lib/logger.ts
const LOG_LEVELS = [
	0,
	1,
	2,
	4,
	8
];
const STYLES_SUPPORTED = !(IS_SAFARI || IS_FIREFOX);
const LOGGER_STYLES = {
	reset: "\x1B[0m",
	bright: "\x1B[1m",
	dim: "\x1B[2m",
	underscore: "\x1B[4m",
	blink: "\x1B[5m",
	reverse: "\x1B[7m",
	hidden: "\x1B[8m",
	fg: {
		black: "\x1B[30m",
		red: "\x1B[31m",
		green: "\x1B[32m",
		yellow: "\x1B[33m",
		blue: "\x1B[34m",
		magenta: "\x1B[35m",
		cyan: "\x1B[36m",
		white: "\x1B[37m"
	},
	bg: {
		black: "\x1B[40m",
		red: "\x1B[41m",
		green: "\x1B[42m",
		yellow: "\x1B[43m",
		blue: "\x1B[44m",
		magenta: "\x1B[45m",
		cyan: "\x1B[46m",
		white: "\x1B[47m"
	}
};
const methods = [
	["debug", 8],
	["info", 4],
	["warn", 2],
	["error", 1],
	["assert", 1],
	["trace", 4],
	["group", 4],
	["groupCollapsed", 4],
	["groupEnd", 4]
];
function logger(prefix, type = 7, ignoreDebugReset = false, style = "") {
	let originalPrefix;
	if (!DEBUG && !ignoreDebugReset) type = 1;
	if (!STYLES_SUPPORTED) style = "";
	else if (!style) {
		if (IS_SERVICE_WORKER) style = LOGGER_STYLES.fg.yellow;
		else if (IS_WEB_WORKER) style = LOGGER_STYLES.fg.cyan;
	}
	const originalStyle = style;
	if (style) style = `%s ${style}%s`;
	else style = "%s";
	const log = function(...args) {
		capture(4, prefix, args);
		return type & 4 && console.log(style, dT(), prefix, ...args);
	};
	methods.forEach(([method, logType]) => {
		const isGroup = method === "group" || method === "groupCollapsed" || method === "groupEnd";
		log[method] = function(...args) {
			if (!isGroup) capture(logType, prefix, args);
			const consoleMethod = console[method];
			return type & logType && consoleMethod(style, dT(), prefix, ...args);
		};
	});
	log.setPrefix = function(newPrefix) {
		originalPrefix = newPrefix;
		prefix = "[" + newPrefix + "]";
	};
	log.setPrefix(prefix);
	log.setLevel = function(level) {
		type = LOG_LEVELS.slice(0, level + 1).reduce((acc, v) => acc | v, 0);
	};
	const prefixCache = {};
	log.bindPrefix = function(prefix, _type = type) {
		return prefixCache[prefix] ?? (prefixCache[prefix] = logger(`${originalPrefix}] ${STYLES_SUPPORTED && originalStyle ? LOGGER_STYLES.reset : ""}[${prefix}`, _type, ignoreDebugReset, originalStyle));
	};
	return log;
}
//#endregion
//#region src/helpers/eventListenerBase.ts
const log = logger("EVENTS");
let lastListenerId = 0;
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
//#region src/helpers/makeError.ts
function makeError(type, message) {
	const error = { type };
	if (message) error.message = message;
	if (DEBUG) {
		const realError = /* @__PURE__ */ new Error();
		Object.defineProperty(error, "stack", {
			configurable: true,
			enumerable: true,
			get() {
				const stack = realError.stack;
				Object.defineProperty(error, "stack", {
					value: stack,
					writable: true,
					configurable: true,
					enumerable: true
				});
				return stack;
			}
		});
	}
	return error;
}
//#endregion
//#region src/lib/superMessagePort.ts
const USE_LOCKS = true;
const STUCK_WATCHDOG_INTERVAL_MS = 2e3;
const STUCK_WARN_FIRST_MS = 5e3;
const STUCK_WARN_PERSIST_MS = 3e4;
function describeTask(task) {
	return {
		id: task?.id,
		type: task?.type,
		invoke: task?.type === "invoke" ? task.payload?.type : void 0
	};
}
function getInvokeTaskName(type, value) {
	const payload = value;
	return {
		taskType: type,
		taskName: payload?.name,
		taskMethod: payload?.method
	};
}
function formatAwaitingName(entry) {
	return [
		entry.taskType,
		entry.taskName,
		entry.taskMethod
	].filter(Boolean).join(":");
}
var SuperMessagePort = class SuperMessagePort extends EventListenerBase {
	constructor(logSuffix) {
		super(false);
		this.logSuffix = logSuffix;
		this.scanStuckAwaiting = () => {
			const now = Date.now();
			for (const id in this.awaiting) {
				const entry = this.awaiting[id];
				const age = now - entry.createdAt;
				if (!entry.warned && age >= STUCK_WARN_FIRST_MS) {
					entry.warned = true;
					this.log.warn(`[STUCK] ${formatAwaitingName(entry)} pending ${age}ms (id=${id})`);
				} else if (entry.warned && age >= STUCK_WARN_PERSIST_MS && age % STUCK_WARN_PERSIST_MS < STUCK_WATCHDOG_INTERVAL_MS) this.log.error(`[STUCK] ${formatAwaitingName(entry)} still pending after ${age}ms (id=${id}) — likely no listener on peer or port not started`);
			}
		};
		this.onMessage = (event) => {
			const task = event.data;
			const source = event.source || event.currentTarget;
			this.processTaskMap[task.type](task, source, event);
		};
		this.processResultTask = (task) => {
			const { taskId, result, error } = task.payload;
			const deferred = this.awaiting[taskId];
			if (!deferred) return;
			this.debug && this.log.debug("done", formatAwaitingName(deferred), result, error);
			"error" in task.payload ? deferred.reject(error) : deferred.resolve(result);
			delete this.awaiting[taskId];
		};
		this.processAckTask = (task) => {
			const payload = task.payload;
			const deferred = this.awaiting[payload.taskId];
			if (!deferred) return;
			const previousResolve = deferred.resolve;
			previousResolve({
				cached: payload.cached,
				result: payload.cached ? "result" in payload ? Promise.resolve(payload.result) : Promise.reject(payload.error) : new Promise((resolve, reject) => {
					deferred.resolve = resolve;
					deferred.reject = reject;
				})
			});
			if (payload.cached) delete this.awaiting[payload.taskId];
		};
		this.processPingTask = (task, source, event) => {
			this.pushTask(this.createTask("pong", void 0), event.source);
		};
		this.processPongTask = (task, source, event) => {
			const pingResolve = this.pingResolves.get(source);
			if (pingResolve) {
				this.pingResolves.delete(source);
				pingResolve();
			}
		};
		this.processCloseTask = (task, source, event) => {
			this.detachPort(source);
		};
		this.processBatchTask = (task, source, event) => {
			const newEvent = {
				data: event.data,
				source: event.source,
				currentTarget: event.currentTarget
			};
			task.payload.forEach((task) => {
				newEvent.data = task;
				this.onMessage(newEvent);
			});
		};
		this.processLockTask = (task, source, event) => {
			const id = task.payload;
			if (this.requestedLocks.has(id)) return;
			this.requestedLocks.set(id, source);
			navigator.locks.request(id, () => {
				this.processCloseTask(void 0, source, void 0);
				this.requestedLocks.delete(id);
			});
		};
		this.processInvokeTask = async (task, source, event) => {
			const id = task.id;
			const innerTask = task.payload;
			let resultTaskPayload;
			let resultTask, ackTask;
			if (!innerTask.void) {
				resultTaskPayload = { taskId: id };
				resultTask = this.createTask("result", resultTaskPayload);
			}
			if (innerTask.withAck) ackTask = this.createTask("ack", {
				taskId: id,
				cached: true
			});
			let isPromise;
			try {
				const listeners = this.listeners[innerTask.type];
				if (!listeners?.size) throw new Error("no listener");
				const listener = listeners.values().next().value;
				let result = this.invokeListenerCallback(innerTask.type, listener, innerTask.payload, source, event);
				if (innerTask.void) return;
				isPromise = result instanceof Promise;
				if (ackTask) {
					const cached = !isPromise;
					ackTask.payload.cached = cached;
					if (cached) ackTask.payload.result = result;
					this.pushTask(ackTask, source);
					if (cached) return;
				}
				if (isPromise) result = await result;
				if (result instanceof SuperMessagePort.TransferableResult) {
					resultTask.transfer = result.transferables;
					result = result.value;
				}
				resultTaskPayload.result = result;
			} catch (error) {
				this.log.error("worker task error:", error, describeTask(task));
				if (innerTask.void) return;
				if (ackTask && ackTask.payload.cached) {
					ackTask.payload.error = error;
					this.pushTask(ackTask, source);
					return;
				}
				resultTaskPayload.error = error;
			}
			this.pushTask(resultTask, source);
		};
		this.listenPorts = [];
		this.sendPorts = [];
		this.pingResolves = /* @__PURE__ */ new Map();
		this.taskId = Math.random();
		this.awaiting = {};
		this.pending = /* @__PURE__ */ new Map();
		this.log = logger("MP" + (logSuffix ? "-" + logSuffix : ""));
		this.debug = DEBUG && false;
		this.heldLocks = /* @__PURE__ */ new Map();
		this.requestedLocks = /* @__PURE__ */ new Map();
		this.processTaskMap = {
			result: this.processResultTask,
			ack: this.processAckTask,
			invoke: this.processInvokeTask,
			ping: this.processPingTask,
			pong: this.processPongTask,
			close: this.processCloseTask,
			lock: this.processLockTask,
			batch: this.processBatchTask
		};
		if (DEBUG) this.stuckWatchdogInterval = ctx$1.setInterval(this.scanStuckAwaiting, STUCK_WATCHDOG_INTERVAL_MS);
	}
	setOnPortDisconnect(callback) {
		this.onPortDisconnect = callback;
	}
	attachPort(port) {
		this.attachListenPort(port);
		this.attachSendPort(port);
	}
	attachListenPort(port) {
		this.listenPorts.push(port);
		port.addEventListener("message", this.onMessage);
	}
	attachSendPort(port) {
		this.log.warn("attaching send port");
		port.start?.();
		this.sendPorts.push(port);
		if (typeof window !== "undefined" && USE_LOCKS) {
			if ("locks" in navigator) {
				const id = [
					"lock",
					tabId,
					this.logSuffix || "",
					Math.random() * 2147483647 | 0
				].join("-");
				this.log.warn("created lock", id);
				const promise = new Promise((resolve) => this.heldLocks.set(port, {
					resolve,
					id
				})).then(() => this.heldLocks.delete(port));
				navigator.locks.request(id, () => {
					this.resendLockTask(port);
					return promise;
				});
			} else window.addEventListener("pagehide", () => {
				const task = this.createTask("close", void 0);
				this.postMessage(void 0, task);
			});
		}
		this.releasePending();
	}
	resendLockTask(port) {
		const lock = this.heldLocks.get(port);
		if (!lock) return;
		this.pushTask(this.createTask("lock", lock.id), port);
	}
	detachPort(port) {
		this.log.warn("disconnecting port");
		indexOfAndSplice(this.listenPorts, port);
		indexOfAndSplice(this.sendPorts, port);
		port.removeEventListener?.("message", this.onMessage);
		port.close?.();
		this.onPortDisconnect?.(port);
		this.heldLocks.get(port)?.resolve();
		const error = makeError("PORT_DISCONNECTED");
		for (const id in this.awaiting) {
			const task = this.awaiting[id];
			if (task.port === port) {
				task.reject(error);
				delete this.awaiting[id];
			}
		}
	}
	postMessage(port, task) {
		(Array.isArray(port) ? port : port ? [port] : this.sendPorts).forEach((port) => {
			port.postMessage(task, task.transfer);
		});
	}
	async releasePending() {
		if (this.releasingPending) return;
		this.releasingPending = true;
		await Promise.resolve();
		this.debug && this.log.debug("releasing tasks, length:", this.pending.size);
		this.pending.forEach((portTasks, port) => {
			let tasks = portTasks;
			{
				let batchTask;
				tasks = [];
				portTasks.forEach((task) => {
					if (task.transfer) {
						batchTask = void 0;
						tasks.push(task);
					} else {
						if (!batchTask) {
							batchTask = this.createTask("batch", []);
							tasks.push(batchTask);
						}
						batchTask.payload.push(task);
					}
				});
			}
			const ports = port ? [port] : this.sendPorts;
			if (!ports.length) return;
			tasks.forEach((task) => {
				this.sendTask(ports, task);
			});
			this.pending.delete(port);
		});
		this.debug && this.log.debug("released tasks");
		this.releasingPending = false;
	}
	createDataCloneError() {
		return {
			type: "DATA_CLONE_ERROR",
			message: "Message port task payload could not be cloned"
		};
	}
	isDataCloneError(error) {
		return error?.name === "DataCloneError" || error instanceof RangeError;
	}
	sendDataCloneError(port, taskId) {
		const task = this.createTask("result", {
			taskId,
			error: this.createDataCloneError()
		});
		try {
			this.postMessage(port, task);
		} catch (error) {
			this.log.error("postMessage clone-error fallback failed:", error, task.type, task.id);
		}
	}
	rejectUnsentInvoke(task, error) {
		const deferred = this.awaiting[task.id];
		if (!deferred) return;
		delete this.awaiting[task.id];
		deferred.reject(error);
	}
	getTaskDebugName(task) {
		return task.type === "invoke" ? formatAwaitingName(getInvokeTaskName(task.payload.type, task.payload.payload)) : task.type;
	}
	sendTask(ports, task, deliveredElsewhere = false) {
		const failedPorts = [];
		const cloneFailedPorts = [];
		let firstError;
		let sent = false;
		ports.forEach((port) => {
			try {
				this.postMessage(port, task);
				sent = true;
			} catch (error) {
				failedPorts.push(port);
				firstError ?? (firstError = error);
				if (this.isDataCloneError(error)) cloneFailedPorts.push(port);
				else this.log.error("postMessage error:", error, task.type, task.id);
			}
		});
		if (!failedPorts.length) return;
		if (cloneFailedPorts.length) this.log.error("postMessage data clone error:", this.getTaskDebugName(task), task.id);
		if (task.type === "batch") {
			const wasDelivered = deliveredElsewhere || sent;
			task.payload.forEach((innerTask) => {
				this.sendTask(failedPorts, innerTask, wasDelivered);
			});
		} else if (task.type === "result" || task.type === "ack") cloneFailedPorts.forEach((port) => {
			this.sendDataCloneError(port, task.payload.taskId);
		});
		else if (task.type === "invoke" && !task.payload.void && !sent && !deliveredElsewhere) this.rejectUnsentInvoke(task, cloneFailedPorts.length === failedPorts.length ? this.createDataCloneError() : firstError);
	}
	createTask(type, payload, transfer) {
		return {
			type,
			payload,
			id: this.getNextTaskId(),
			transfer
		};
	}
	createInvokeTask(type, payload, withAck, _void, transfer) {
		return this.createTask("invoke", {
			type,
			payload,
			withAck,
			void: _void
		}, transfer);
	}
	pushTask(task, port) {
		let tasks = this.pending.get(port);
		if (!tasks) this.pending.set(port, tasks = []);
		tasks.push(task);
		this.releasePending();
	}
	getNextTaskId() {
		return this.taskId++;
	}
	invokeVoid(type, payload, port, transfer) {
		const task = this.createInvokeTask(type, payload, void 0, true, transfer);
		this.pushTask(task, port);
	}
	invokeVoidAs(type, payload, port, transfer) {
		this.invokeVoid(type, payload, port, transfer);
	}
	invokeAs(type, payload, port, transfer) {
		return this.invoke(type, payload, false, port, transfer);
	}
	invokeExceptSourceAsyncAs(type, payload, source) {
		return this.invokeExceptSourceAsync(type, payload, source);
	}
	invoke(type, payload, withAck, port, transfer, timeout) {
		this.debug && this.log.debug("start", type, payload);
		let task;
		const promise = new Promise((resolve, reject) => {
			task = this.createInvokeTask(type, payload, withAck, void 0, transfer);
			this.awaiting[task.id] = {
				...getInvokeTaskName(type, payload),
				resolve,
				reject,
				port,
				createdAt: Date.now()
			};
			this.pushTask(task, port);
		});
		if (timeout) {
			const deferred = this.awaiting[task.id];
			const timeoutId = setTimeout(() => {
				if (this.awaiting[task.id] !== deferred) return;
				delete this.awaiting[task.id];
				deferred.reject(makeError("TIMEOUT"));
			}, timeout);
			promise.then(() => clearTimeout(timeoutId), () => clearTimeout(timeoutId));
		}
		if (IS_WORKER) {
			const clearLogInterval = () => {
				clearInterval(interval);
			};
			promise.then(clearLogInterval, clearLogInterval);
			const interval = ctx$1.setInterval(() => {
				this.log.error("task still has no result", describeTask(task), port);
			}, IS_WORKER ? 6e4 : 5e3);
		}
		return promise;
	}
	invokeExceptSource(type, payload, source) {
		const ports = this.sendPorts.slice();
		indexOfAndSplice(ports, source);
		ports.forEach((target) => {
			this.invokeVoid(type, payload, target);
		});
	}
	async invokeExceptSourceAsync(type, payload, source) {
		const ports = this.sendPorts.slice();
		indexOfAndSplice(ports, source);
		await Promise.all(ports.map((target) => this.invoke(type, payload, void 0, target)));
	}
};
(function(_SuperMessagePort) {
	class TransferableResult {
		constructor(value, transferables) {
			this.value = value;
			this.transferables = transferables;
		}
	}
	_SuperMessagePort.TransferableResult = TransferableResult;
})(SuperMessagePort || (SuperMessagePort = {}));
var superMessagePort_default = SuperMessagePort;
//#endregion
//#region src/helpers/bytes/bytesCmpConstTime.ts
function bytesCmpConstTime(bytes1, bytes2) {
	const len = bytes1.length;
	if (len !== bytes2.length) return false;
	let diff = 0;
	for (let i = 0; i < len; ++i) diff |= bytes1[i] ^ bytes2[i];
	return diff === 0;
}
//#endregion
//#region src/helpers/noop.ts
function noop(...args) {}
//#endregion
//#region src/helpers/cancellablePromise.ts
const deferredHelper = {
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
self.deferredPromise = deferredPromise;
//#endregion
//#region src/lib/staticUtilityClass.ts
var StaticUtilityClass = class {
	constructor() {
		throw new Error("Cannot instantiate a static utility class");
	}
};
//#endregion
//#region src/lib/passcode/keyStore.ts
var _EncryptionKeyStore;
async function exportEncryptionKey(key) {
	return key ? new Uint8Array(await crypto.subtle.exportKey("raw", key)) : null;
}
async function importEncryptionKey(bytes) {
	return bytes ? crypto.subtle.importKey("raw", bytes, { name: "AES-GCM" }, true, ["encrypt", "decrypt"]) : null;
}
var EncryptionKeyStore = class extends StaticUtilityClass {
	static async get() {
		if (this.deferred) await this.deferred;
		return this.key;
	}
	/**
	* Whatever is in memory right now, `null` while nothing has been saved yet
	*/
	static getUndeferred() {
		return this.key;
	}
	static async getAsBase64() {
		const key = await this.get();
		if (!key) return null;
		return btoa(String.fromCharCode(...await exportEncryptionKey(key)));
	}
	static save(key) {
		this.key = key || null;
		this.deferred?.resolve();
		this.deferred = void 0;
	}
	/**
	* Mainly for Service Worker
	*/
	static resetDeferred() {
		this.key = null;
		this.deferred = deferredPromise();
	}
};
_EncryptionKeyStore = EncryptionKeyStore;
_EncryptionKeyStore.key = null;
_EncryptionKeyStore.deferred = deferredPromise();
//#endregion
//#region src/lib/crypto/utils/aesLocal.ts
const IV_LENGTH = 12;
const exportedKeys = /* @__PURE__ */ new WeakMap();
function toLocalDataKeyBytes(key) {
	let bytes = exportedKeys.get(key);
	if (!bytes) exportedKeys.set(key, bytes = exportEncryptionKey(key));
	return bytes;
}
let importedKey;
function toCryptoKey(key) {
	if (!ArrayBuffer.isView(key)) return key;
	if (!importedKey || !bytesCmpConstTime(importedKey.bytes, key)) importedKey = {
		bytes: key,
		key: importEncryptionKey(key)
	};
	return importedKey.key;
}
async function encryptLocalData({ key, data }) {
	const iv = crypto.getRandomValues(new Uint8Array(IV_LENGTH));
	const encrypted = await crypto.subtle.encrypt({
		name: "AES-GCM",
		iv
	}, await toCryptoKey(key), data);
	const combined = new Uint8Array(iv.length + encrypted.byteLength);
	combined.set(iv, 0);
	combined.set(new Uint8Array(encrypted), iv.length);
	return new superMessagePort_default.TransferableResult(combined, [combined.buffer]);
}
async function decryptLocalData({ key, encryptedData }) {
	const iv = encryptedData.slice(0, IV_LENGTH);
	const ciphertext = encryptedData.slice(IV_LENGTH);
	const decrypted = await crypto.subtle.decrypt({
		name: "AES-GCM",
		iv
	}, await toCryptoKey(key), ciphertext);
	return new superMessagePort_default.TransferableResult(decrypted, [decrypted]);
}
//#endregion
//#region src/lib/crypto/cryptoMessagePort.ts
var CryptoMessagePort = class extends superMessagePort_default {
	constructor() {
		super("CRYPTO");
		this.lastIndex = -1;
	}
	invokeCryptoNew({ method, args, transfer }) {
		const payload = {
			method,
			args
		};
		const listeners = this.listeners["invoke"];
		if (listeners?.size) {
			let result = listeners.values().next().value.callback(payload);
			if (!IS_WORKER && !(result instanceof Promise)) result = Promise.resolve(result);
			return result;
		}
		const sendPortIndex = method === "aes-encrypt" || method === "aes-decrypt" ? this.lastIndex = (this.lastIndex + 1) % this.sendPorts.length : 0;
		const port = this.sendPorts[sendPortIndex];
		const keyArgs = (method === "aes-local-encrypt" || method === "aes-local-decrypt") && args[0];
		if (keyArgs && !ArrayBuffer.isView(keyArgs.key)) return toLocalDataKeyBytes(keyArgs.key).then((key) => {
			return this.invoke("invoke", {
				method,
				args: [{
					...keyArgs,
					key
				}]
			}, void 0, port, transfer);
		});
		return this.invoke("invoke", payload, void 0, port, transfer);
	}
	invokeCrypto(method, ...args) {
		return this.invokeCryptoNew({
			method,
			args
		});
	}
	sendToOnePort(port) {
		this.invokeVoid("port", void 0, this.sendPorts[0], [port]);
	}
};
const cryptoMessagePort = new CryptoMessagePort();
MOUNT_CLASS_TO && (MOUNT_CLASS_TO.cryptoMessagePort = cryptoMessagePort);
//#endregion
//#region src/helpers/bigInt/bigIntConstants.ts
var import_BigInteger = /* @__PURE__ */ __toESM((/* @__PURE__ */ __commonJSMin(((exports, module) => {
	var bigInt = (function(undefined) {
		"use strict";
		var BASE = 1e7, LOG_BASE = 7, MAX_INT = 9007199254740992, MAX_INT_ARR = smallToArray(MAX_INT), DEFAULT_ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyz";
		var supportsNativeBigInt = typeof BigInt === "function";
		function Integer(v, radix, alphabet, caseSensitive) {
			if (typeof v === "undefined") return Integer[0];
			if (typeof radix !== "undefined") return +radix === 10 && !alphabet ? parseValue(v) : parseBase(v, radix, alphabet, caseSensitive);
			return parseValue(v);
		}
		function BigInteger(value, sign) {
			this.value = value;
			this.sign = sign;
			this.isSmall = false;
		}
		BigInteger.prototype = Object.create(Integer.prototype);
		function SmallInteger(value) {
			this.value = value;
			this.sign = value < 0;
			this.isSmall = true;
		}
		SmallInteger.prototype = Object.create(Integer.prototype);
		function NativeBigInt(value) {
			this.value = value;
		}
		NativeBigInt.prototype = Object.create(Integer.prototype);
		function isPrecise(n) {
			return -MAX_INT < n && n < MAX_INT;
		}
		function smallToArray(n) {
			if (n < 1e7) return [n];
			if (n < 0x5af3107a4000) return [n % 1e7, Math.floor(n / 1e7)];
			return [
				n % 1e7,
				Math.floor(n / 1e7) % 1e7,
				Math.floor(n / 0x5af3107a4000)
			];
		}
		function arrayToSmall(arr) {
			trim(arr);
			var length = arr.length;
			if (length < 4 && compareAbs(arr, MAX_INT_ARR) < 0) switch (length) {
				case 0: return 0;
				case 1: return arr[0];
				case 2: return arr[0] + arr[1] * BASE;
				default: return arr[0] + (arr[1] + arr[2] * BASE) * BASE;
			}
			return arr;
		}
		function trim(v) {
			var i = v.length;
			while (v[--i] === 0);
			v.length = i + 1;
		}
		function createArray(length) {
			var x = new Array(length);
			var i = -1;
			while (++i < length) x[i] = 0;
			return x;
		}
		function truncate(n) {
			if (n > 0) return Math.floor(n);
			return Math.ceil(n);
		}
		function add(a, b) {
			var l_a = a.length, l_b = b.length, r = new Array(l_a), carry = 0, base = BASE, sum, i = 0;
			for (; i < l_b; i++) {
				sum = a[i] + b[i] + carry;
				carry = sum >= base ? 1 : 0;
				r[i] = sum - carry * base;
			}
			while (i < l_a) {
				sum = a[i] + carry;
				carry = sum === base ? 1 : 0;
				r[i++] = sum - carry * base;
			}
			if (carry > 0) r.push(carry);
			return r;
		}
		function addAny(a, b) {
			if (a.length >= b.length) return add(a, b);
			return add(b, a);
		}
		function addSmall(a, carry) {
			var l = a.length, r = new Array(l), base = BASE, sum, i = 0;
			for (; i < l; i++) {
				sum = a[i] - base + carry;
				carry = Math.floor(sum / base);
				r[i] = sum - carry * base;
				carry += 1;
			}
			while (carry > 0) {
				r[i++] = carry % base;
				carry = Math.floor(carry / base);
			}
			return r;
		}
		BigInteger.prototype.add = function(v) {
			var n = parseValue(v);
			if (this.sign !== n.sign) return this.subtract(n.negate());
			var a = this.value, b = n.value;
			if (n.isSmall) return new BigInteger(addSmall(a, Math.abs(b)), this.sign);
			return new BigInteger(addAny(a, b), this.sign);
		};
		BigInteger.prototype.plus = BigInteger.prototype.add;
		SmallInteger.prototype.add = function(v) {
			var n = parseValue(v);
			var a = this.value;
			if (a < 0 !== n.sign) return this.subtract(n.negate());
			var b = n.value;
			if (n.isSmall) {
				if (isPrecise(a + b)) return new SmallInteger(a + b);
				b = smallToArray(Math.abs(b));
			}
			return new BigInteger(addSmall(b, Math.abs(a)), a < 0);
		};
		SmallInteger.prototype.plus = SmallInteger.prototype.add;
		NativeBigInt.prototype.add = function(v) {
			return new NativeBigInt(this.value + parseValue(v).value);
		};
		NativeBigInt.prototype.plus = NativeBigInt.prototype.add;
		function subtract(a, b) {
			var a_l = a.length, b_l = b.length, r = new Array(a_l), borrow = 0, base = BASE, i = 0, difference;
			for (; i < b_l; i++) {
				difference = a[i] - borrow - b[i];
				if (difference < 0) {
					difference += base;
					borrow = 1;
				} else borrow = 0;
				r[i] = difference;
			}
			for (i = b_l; i < a_l; i++) {
				difference = a[i] - borrow;
				if (difference < 0) difference += base;
				else {
					r[i++] = difference;
					break;
				}
				r[i] = difference;
			}
			for (; i < a_l; i++) r[i] = a[i];
			trim(r);
			return r;
		}
		function subtractAny(a, b, sign) {
			var value;
			if (compareAbs(a, b) >= 0) value = subtract(a, b);
			else {
				value = subtract(b, a);
				sign = !sign;
			}
			value = arrayToSmall(value);
			if (typeof value === "number") {
				if (sign) value = -value;
				return new SmallInteger(value);
			}
			return new BigInteger(value, sign);
		}
		function subtractSmall(a, b, sign) {
			var l = a.length, r = new Array(l), carry = -b, base = BASE, i = 0, difference;
			for (; i < l; i++) {
				difference = a[i] + carry;
				carry = Math.floor(difference / base);
				difference %= base;
				r[i] = difference < 0 ? difference + base : difference;
			}
			r = arrayToSmall(r);
			if (typeof r === "number") {
				if (sign) r = -r;
				return new SmallInteger(r);
			}
			return new BigInteger(r, sign);
		}
		BigInteger.prototype.subtract = function(v) {
			var n = parseValue(v);
			if (this.sign !== n.sign) return this.add(n.negate());
			var a = this.value, b = n.value;
			if (n.isSmall) return subtractSmall(a, Math.abs(b), this.sign);
			return subtractAny(a, b, this.sign);
		};
		BigInteger.prototype.minus = BigInteger.prototype.subtract;
		SmallInteger.prototype.subtract = function(v) {
			var n = parseValue(v);
			var a = this.value;
			if (a < 0 !== n.sign) return this.add(n.negate());
			var b = n.value;
			if (n.isSmall) return new SmallInteger(a - b);
			return subtractSmall(b, Math.abs(a), a >= 0);
		};
		SmallInteger.prototype.minus = SmallInteger.prototype.subtract;
		NativeBigInt.prototype.subtract = function(v) {
			return new NativeBigInt(this.value - parseValue(v).value);
		};
		NativeBigInt.prototype.minus = NativeBigInt.prototype.subtract;
		BigInteger.prototype.negate = function() {
			return new BigInteger(this.value, !this.sign);
		};
		SmallInteger.prototype.negate = function() {
			var sign = this.sign;
			var small = new SmallInteger(-this.value);
			small.sign = !sign;
			return small;
		};
		NativeBigInt.prototype.negate = function() {
			return new NativeBigInt(-this.value);
		};
		BigInteger.prototype.abs = function() {
			return new BigInteger(this.value, false);
		};
		SmallInteger.prototype.abs = function() {
			return new SmallInteger(Math.abs(this.value));
		};
		NativeBigInt.prototype.abs = function() {
			return new NativeBigInt(this.value >= 0 ? this.value : -this.value);
		};
		function multiplyLong(a, b) {
			var a_l = a.length, b_l = b.length, r = createArray(a_l + b_l), base = BASE, product, carry, i = 0, a_i, b_j;
			for (; i < a_l; ++i) {
				a_i = a[i];
				for (var j = 0; j < b_l; ++j) {
					b_j = b[j];
					product = a_i * b_j + r[i + j];
					carry = Math.floor(product / base);
					r[i + j] = product - carry * base;
					r[i + j + 1] += carry;
				}
			}
			trim(r);
			return r;
		}
		function multiplySmall(a, b) {
			var l = a.length, r = new Array(l), base = BASE, carry = 0, product, i = 0;
			for (; i < l; i++) {
				product = a[i] * b + carry;
				carry = Math.floor(product / base);
				r[i] = product - carry * base;
			}
			while (carry > 0) {
				r[i++] = carry % base;
				carry = Math.floor(carry / base);
			}
			return r;
		}
		function shiftLeft(x, n) {
			var r = [];
			while (n-- > 0) r.push(0);
			return r.concat(x);
		}
		function multiplyKaratsuba(x, y) {
			var n = Math.max(x.length, y.length);
			if (n <= 30) return multiplyLong(x, y);
			n = Math.ceil(n / 2);
			var b = x.slice(n), a = x.slice(0, n), d = y.slice(n), c = y.slice(0, n);
			var ac = multiplyKaratsuba(a, c), bd = multiplyKaratsuba(b, d);
			var product = addAny(addAny(ac, shiftLeft(subtract(subtract(multiplyKaratsuba(addAny(a, b), addAny(c, d)), ac), bd), n)), shiftLeft(bd, 2 * n));
			trim(product);
			return product;
		}
		function useKaratsuba(l1, l2) {
			return -.012 * l1 - .012 * l2 + 15e-6 * l1 * l2 > 0;
		}
		BigInteger.prototype.multiply = function(v) {
			var n = parseValue(v), a = this.value, b = n.value, sign = this.sign !== n.sign, abs;
			if (n.isSmall) {
				if (b === 0) return Integer[0];
				if (b === 1) return this;
				if (b === -1) return this.negate();
				abs = Math.abs(b);
				if (abs < BASE) return new BigInteger(multiplySmall(a, abs), sign);
				b = smallToArray(abs);
			}
			if (useKaratsuba(a.length, b.length)) return new BigInteger(multiplyKaratsuba(a, b), sign);
			return new BigInteger(multiplyLong(a, b), sign);
		};
		BigInteger.prototype.times = BigInteger.prototype.multiply;
		function multiplySmallAndArray(a, b, sign) {
			if (a < BASE) return new BigInteger(multiplySmall(b, a), sign);
			return new BigInteger(multiplyLong(b, smallToArray(a)), sign);
		}
		SmallInteger.prototype._multiplyBySmall = function(a) {
			if (isPrecise(a.value * this.value)) return new SmallInteger(a.value * this.value);
			return multiplySmallAndArray(Math.abs(a.value), smallToArray(Math.abs(this.value)), this.sign !== a.sign);
		};
		BigInteger.prototype._multiplyBySmall = function(a) {
			if (a.value === 0) return Integer[0];
			if (a.value === 1) return this;
			if (a.value === -1) return this.negate();
			return multiplySmallAndArray(Math.abs(a.value), this.value, this.sign !== a.sign);
		};
		SmallInteger.prototype.multiply = function(v) {
			return parseValue(v)._multiplyBySmall(this);
		};
		SmallInteger.prototype.times = SmallInteger.prototype.multiply;
		NativeBigInt.prototype.multiply = function(v) {
			return new NativeBigInt(this.value * parseValue(v).value);
		};
		NativeBigInt.prototype.times = NativeBigInt.prototype.multiply;
		function square(a) {
			var l = a.length, r = createArray(l + l), base = BASE, product, carry, i = 0, a_i, a_j;
			for (; i < l; i++) {
				a_i = a[i];
				carry = 0 - a_i * a_i;
				for (var j = i; j < l; j++) {
					a_j = a[j];
					product = 2 * (a_i * a_j) + r[i + j] + carry;
					carry = Math.floor(product / base);
					r[i + j] = product - carry * base;
				}
				r[i + l] = carry;
			}
			trim(r);
			return r;
		}
		BigInteger.prototype.square = function() {
			return new BigInteger(square(this.value), false);
		};
		SmallInteger.prototype.square = function() {
			var value = this.value * this.value;
			if (isPrecise(value)) return new SmallInteger(value);
			return new BigInteger(square(smallToArray(Math.abs(this.value))), false);
		};
		NativeBigInt.prototype.square = function(v) {
			return new NativeBigInt(this.value * this.value);
		};
		function divMod1(a, b) {
			var a_l = a.length, b_l = b.length, base = BASE, result = createArray(b.length), divisorMostSignificantDigit = b[b_l - 1], lambda = Math.ceil(base / (2 * divisorMostSignificantDigit)), remainder = multiplySmall(a, lambda), divisor = multiplySmall(b, lambda), quotientDigit, shift, carry, borrow, i, l, q;
			if (remainder.length <= a_l) remainder.push(0);
			divisor.push(0);
			divisorMostSignificantDigit = divisor[b_l - 1];
			for (shift = a_l - b_l; shift >= 0; shift--) {
				quotientDigit = base - 1;
				if (remainder[shift + b_l] !== divisorMostSignificantDigit) quotientDigit = Math.floor((remainder[shift + b_l] * base + remainder[shift + b_l - 1]) / divisorMostSignificantDigit);
				carry = 0;
				borrow = 0;
				l = divisor.length;
				for (i = 0; i < l; i++) {
					carry += quotientDigit * divisor[i];
					q = Math.floor(carry / base);
					borrow += remainder[shift + i] - (carry - q * base);
					carry = q;
					if (borrow < 0) {
						remainder[shift + i] = borrow + base;
						borrow = -1;
					} else {
						remainder[shift + i] = borrow;
						borrow = 0;
					}
				}
				while (borrow !== 0) {
					quotientDigit -= 1;
					carry = 0;
					for (i = 0; i < l; i++) {
						carry += remainder[shift + i] - base + divisor[i];
						if (carry < 0) {
							remainder[shift + i] = carry + base;
							carry = 0;
						} else {
							remainder[shift + i] = carry;
							carry = 1;
						}
					}
					borrow += carry;
				}
				result[shift] = quotientDigit;
			}
			remainder = divModSmall(remainder, lambda)[0];
			return [arrayToSmall(result), arrayToSmall(remainder)];
		}
		function divMod2(a, b) {
			var a_l = a.length, b_l = b.length, result = [], part = [], base = BASE, guess, xlen, highx, highy, check;
			while (a_l) {
				part.unshift(a[--a_l]);
				trim(part);
				if (compareAbs(part, b) < 0) {
					result.push(0);
					continue;
				}
				xlen = part.length;
				highx = part[xlen - 1] * base + part[xlen - 2];
				highy = b[b_l - 1] * base + b[b_l - 2];
				if (xlen > b_l) highx = (highx + 1) * base;
				guess = Math.ceil(highx / highy);
				do {
					check = multiplySmall(b, guess);
					if (compareAbs(check, part) <= 0) break;
					guess--;
				} while (guess);
				result.push(guess);
				part = subtract(part, check);
			}
			result.reverse();
			return [arrayToSmall(result), arrayToSmall(part)];
		}
		function divModSmall(value, lambda) {
			var length = value.length, quotient = createArray(length), base = BASE, i, q, remainder = 0, divisor;
			for (i = length - 1; i >= 0; --i) {
				divisor = remainder * base + value[i];
				q = truncate(divisor / lambda);
				remainder = divisor - q * lambda;
				quotient[i] = q | 0;
			}
			return [quotient, remainder | 0];
		}
		function divModAny(self, v) {
			var value, n = parseValue(v);
			if (supportsNativeBigInt) return [new NativeBigInt(self.value / n.value), new NativeBigInt(self.value % n.value)];
			var a = self.value, b = n.value;
			var quotient;
			if (b === 0) throw new Error("Cannot divide by zero");
			if (self.isSmall) {
				if (n.isSmall) return [new SmallInteger(truncate(a / b)), new SmallInteger(a % b)];
				return [Integer[0], self];
			}
			if (n.isSmall) {
				if (b === 1) return [self, Integer[0]];
				if (b == -1) return [self.negate(), Integer[0]];
				var abs = Math.abs(b);
				if (abs < BASE) {
					value = divModSmall(a, abs);
					quotient = arrayToSmall(value[0]);
					var remainder = value[1];
					if (self.sign) remainder = -remainder;
					if (typeof quotient === "number") {
						if (self.sign !== n.sign) quotient = -quotient;
						return [new SmallInteger(quotient), new SmallInteger(remainder)];
					}
					return [new BigInteger(quotient, self.sign !== n.sign), new SmallInteger(remainder)];
				}
				b = smallToArray(abs);
			}
			var comparison = compareAbs(a, b);
			if (comparison === -1) return [Integer[0], self];
			if (comparison === 0) return [Integer[self.sign === n.sign ? 1 : -1], Integer[0]];
			if (a.length + b.length <= 200) value = divMod1(a, b);
			else value = divMod2(a, b);
			quotient = value[0];
			var qSign = self.sign !== n.sign, mod = value[1], mSign = self.sign;
			if (typeof quotient === "number") {
				if (qSign) quotient = -quotient;
				quotient = new SmallInteger(quotient);
			} else quotient = new BigInteger(quotient, qSign);
			if (typeof mod === "number") {
				if (mSign) mod = -mod;
				mod = new SmallInteger(mod);
			} else mod = new BigInteger(mod, mSign);
			return [quotient, mod];
		}
		BigInteger.prototype.divmod = function(v) {
			var result = divModAny(this, v);
			return {
				quotient: result[0],
				remainder: result[1]
			};
		};
		NativeBigInt.prototype.divmod = SmallInteger.prototype.divmod = BigInteger.prototype.divmod;
		BigInteger.prototype.divide = function(v) {
			return divModAny(this, v)[0];
		};
		NativeBigInt.prototype.over = NativeBigInt.prototype.divide = function(v) {
			return new NativeBigInt(this.value / parseValue(v).value);
		};
		SmallInteger.prototype.over = SmallInteger.prototype.divide = BigInteger.prototype.over = BigInteger.prototype.divide;
		BigInteger.prototype.mod = function(v) {
			return divModAny(this, v)[1];
		};
		NativeBigInt.prototype.mod = NativeBigInt.prototype.remainder = function(v) {
			return new NativeBigInt(this.value % parseValue(v).value);
		};
		SmallInteger.prototype.remainder = SmallInteger.prototype.mod = BigInteger.prototype.remainder = BigInteger.prototype.mod;
		BigInteger.prototype.pow = function(v) {
			var n = parseValue(v), a = this.value, b = n.value, value, x, y;
			if (b === 0) return Integer[1];
			if (a === 0) return Integer[0];
			if (a === 1) return Integer[1];
			if (a === -1) return n.isEven() ? Integer[1] : Integer[-1];
			if (n.sign) return Integer[0];
			if (!n.isSmall) throw new Error("The exponent " + n.toString() + " is too large.");
			if (this.isSmall) {
				if (isPrecise(value = Math.pow(a, b))) return new SmallInteger(truncate(value));
			}
			x = this;
			y = Integer[1];
			while (true) {
				if (b & true) {
					y = y.times(x);
					--b;
				}
				if (b === 0) break;
				b /= 2;
				x = x.square();
			}
			return y;
		};
		SmallInteger.prototype.pow = BigInteger.prototype.pow;
		NativeBigInt.prototype.pow = function(v) {
			var n = parseValue(v);
			var a = this.value, b = n.value;
			var _0 = BigInt(0), _1 = BigInt(1), _2 = BigInt(2);
			if (b === _0) return Integer[1];
			if (a === _0) return Integer[0];
			if (a === _1) return Integer[1];
			if (a === BigInt(-1)) return n.isEven() ? Integer[1] : Integer[-1];
			if (n.isNegative()) return new NativeBigInt(_0);
			var x = this;
			var y = Integer[1];
			while (true) {
				if ((b & _1) === _1) {
					y = y.times(x);
					--b;
				}
				if (b === _0) break;
				b /= _2;
				x = x.square();
			}
			return y;
		};
		BigInteger.prototype.modPow = function(exp, mod) {
			exp = parseValue(exp);
			mod = parseValue(mod);
			if (mod.isZero()) throw new Error("Cannot take modPow with modulus 0");
			var r = Integer[1], base = this.mod(mod);
			if (exp.isNegative()) {
				exp = exp.multiply(Integer[-1]);
				base = base.modInv(mod);
			}
			while (exp.isPositive()) {
				if (base.isZero()) return Integer[0];
				if (exp.isOdd()) r = r.multiply(base).mod(mod);
				exp = exp.divide(2);
				base = base.square().mod(mod);
			}
			return r;
		};
		NativeBigInt.prototype.modPow = SmallInteger.prototype.modPow = BigInteger.prototype.modPow;
		function compareAbs(a, b) {
			if (a.length !== b.length) return a.length > b.length ? 1 : -1;
			for (var i = a.length - 1; i >= 0; i--) if (a[i] !== b[i]) return a[i] > b[i] ? 1 : -1;
			return 0;
		}
		BigInteger.prototype.compareAbs = function(v) {
			var n = parseValue(v), a = this.value, b = n.value;
			if (n.isSmall) return 1;
			return compareAbs(a, b);
		};
		SmallInteger.prototype.compareAbs = function(v) {
			var n = parseValue(v), a = Math.abs(this.value), b = n.value;
			if (n.isSmall) {
				b = Math.abs(b);
				return a === b ? 0 : a > b ? 1 : -1;
			}
			return -1;
		};
		NativeBigInt.prototype.compareAbs = function(v) {
			var a = this.value;
			var b = parseValue(v).value;
			a = a >= 0 ? a : -a;
			b = b >= 0 ? b : -b;
			return a === b ? 0 : a > b ? 1 : -1;
		};
		BigInteger.prototype.compare = function(v) {
			if (v === Infinity) return -1;
			if (v === -Infinity) return 1;
			var n = parseValue(v), a = this.value, b = n.value;
			if (this.sign !== n.sign) return n.sign ? 1 : -1;
			if (n.isSmall) return this.sign ? -1 : 1;
			return compareAbs(a, b) * (this.sign ? -1 : 1);
		};
		BigInteger.prototype.compareTo = BigInteger.prototype.compare;
		SmallInteger.prototype.compare = function(v) {
			if (v === Infinity) return -1;
			if (v === -Infinity) return 1;
			var n = parseValue(v), a = this.value, b = n.value;
			if (n.isSmall) return a == b ? 0 : a > b ? 1 : -1;
			if (a < 0 !== n.sign) return a < 0 ? -1 : 1;
			return a < 0 ? 1 : -1;
		};
		SmallInteger.prototype.compareTo = SmallInteger.prototype.compare;
		NativeBigInt.prototype.compare = function(v) {
			if (v === Infinity) return -1;
			if (v === -Infinity) return 1;
			var a = this.value;
			var b = parseValue(v).value;
			return a === b ? 0 : a > b ? 1 : -1;
		};
		NativeBigInt.prototype.compareTo = NativeBigInt.prototype.compare;
		BigInteger.prototype.equals = function(v) {
			return this.compare(v) === 0;
		};
		NativeBigInt.prototype.eq = NativeBigInt.prototype.equals = SmallInteger.prototype.eq = SmallInteger.prototype.equals = BigInteger.prototype.eq = BigInteger.prototype.equals;
		BigInteger.prototype.notEquals = function(v) {
			return this.compare(v) !== 0;
		};
		NativeBigInt.prototype.neq = NativeBigInt.prototype.notEquals = SmallInteger.prototype.neq = SmallInteger.prototype.notEquals = BigInteger.prototype.neq = BigInteger.prototype.notEquals;
		BigInteger.prototype.greater = function(v) {
			return this.compare(v) > 0;
		};
		NativeBigInt.prototype.gt = NativeBigInt.prototype.greater = SmallInteger.prototype.gt = SmallInteger.prototype.greater = BigInteger.prototype.gt = BigInteger.prototype.greater;
		BigInteger.prototype.lesser = function(v) {
			return this.compare(v) < 0;
		};
		NativeBigInt.prototype.lt = NativeBigInt.prototype.lesser = SmallInteger.prototype.lt = SmallInteger.prototype.lesser = BigInteger.prototype.lt = BigInteger.prototype.lesser;
		BigInteger.prototype.greaterOrEquals = function(v) {
			return this.compare(v) >= 0;
		};
		NativeBigInt.prototype.geq = NativeBigInt.prototype.greaterOrEquals = SmallInteger.prototype.geq = SmallInteger.prototype.greaterOrEquals = BigInteger.prototype.geq = BigInteger.prototype.greaterOrEquals;
		BigInteger.prototype.lesserOrEquals = function(v) {
			return this.compare(v) <= 0;
		};
		NativeBigInt.prototype.leq = NativeBigInt.prototype.lesserOrEquals = SmallInteger.prototype.leq = SmallInteger.prototype.lesserOrEquals = BigInteger.prototype.leq = BigInteger.prototype.lesserOrEquals;
		BigInteger.prototype.isEven = function() {
			return (this.value[0] & 1) === 0;
		};
		SmallInteger.prototype.isEven = function() {
			return (this.value & 1) === 0;
		};
		NativeBigInt.prototype.isEven = function() {
			return (this.value & BigInt(1)) === BigInt(0);
		};
		BigInteger.prototype.isOdd = function() {
			return (this.value[0] & 1) === 1;
		};
		SmallInteger.prototype.isOdd = function() {
			return (this.value & 1) === 1;
		};
		NativeBigInt.prototype.isOdd = function() {
			return (this.value & BigInt(1)) === BigInt(1);
		};
		BigInteger.prototype.isPositive = function() {
			return !this.sign;
		};
		SmallInteger.prototype.isPositive = function() {
			return this.value > 0;
		};
		NativeBigInt.prototype.isPositive = SmallInteger.prototype.isPositive;
		BigInteger.prototype.isNegative = function() {
			return this.sign;
		};
		SmallInteger.prototype.isNegative = function() {
			return this.value < 0;
		};
		NativeBigInt.prototype.isNegative = SmallInteger.prototype.isNegative;
		BigInteger.prototype.isUnit = function() {
			return false;
		};
		SmallInteger.prototype.isUnit = function() {
			return Math.abs(this.value) === 1;
		};
		NativeBigInt.prototype.isUnit = function() {
			return this.abs().value === BigInt(1);
		};
		BigInteger.prototype.isZero = function() {
			return false;
		};
		SmallInteger.prototype.isZero = function() {
			return this.value === 0;
		};
		NativeBigInt.prototype.isZero = function() {
			return this.value === BigInt(0);
		};
		BigInteger.prototype.isDivisibleBy = function(v) {
			var n = parseValue(v);
			if (n.isZero()) return false;
			if (n.isUnit()) return true;
			if (n.compareAbs(2) === 0) return this.isEven();
			return this.mod(n).isZero();
		};
		NativeBigInt.prototype.isDivisibleBy = SmallInteger.prototype.isDivisibleBy = BigInteger.prototype.isDivisibleBy;
		function isBasicPrime(v) {
			var n = v.abs();
			if (n.isUnit()) return false;
			if (n.equals(2) || n.equals(3) || n.equals(5)) return true;
			if (n.isEven() || n.isDivisibleBy(3) || n.isDivisibleBy(5)) return false;
			if (n.lesser(49)) return true;
		}
		function millerRabinTest(n, a) {
			var nPrev = n.prev(), b = nPrev, r = 0, d, i, x;
			while (b.isEven()) b = b.divide(2), r++;
			next: for (i = 0; i < a.length; i++) {
				if (n.lesser(a[i])) continue;
				x = bigInt(a[i]).modPow(b, n);
				if (x.isUnit() || x.equals(nPrev)) continue;
				for (d = r - 1; d != 0; d--) {
					x = x.square().mod(n);
					if (x.isUnit()) return false;
					if (x.equals(nPrev)) continue next;
				}
				return false;
			}
			return true;
		}
		BigInteger.prototype.isPrime = function(strict) {
			var isPrime = isBasicPrime(this);
			if (isPrime !== undefined) return isPrime;
			var n = this.abs();
			var bits = n.bitLength();
			if (bits <= 64) return millerRabinTest(n, [
				2,
				3,
				5,
				7,
				11,
				13,
				17,
				19,
				23,
				29,
				31,
				37
			]);
			var logN = Math.log(2) * bits.toJSNumber();
			var t = Math.ceil(strict === true ? 2 * Math.pow(logN, 2) : logN);
			for (var a = [], i = 0; i < t; i++) a.push(bigInt(i + 2));
			return millerRabinTest(n, a);
		};
		NativeBigInt.prototype.isPrime = SmallInteger.prototype.isPrime = BigInteger.prototype.isPrime;
		BigInteger.prototype.isProbablePrime = function(iterations, rng) {
			var isPrime = isBasicPrime(this);
			if (isPrime !== undefined) return isPrime;
			var n = this.abs();
			var t = iterations === undefined ? 5 : iterations;
			for (var a = [], i = 0; i < t; i++) a.push(bigInt.randBetween(2, n.minus(2), rng));
			return millerRabinTest(n, a);
		};
		NativeBigInt.prototype.isProbablePrime = SmallInteger.prototype.isProbablePrime = BigInteger.prototype.isProbablePrime;
		BigInteger.prototype.modInv = function(n) {
			var t = bigInt.zero, newT = bigInt.one, r = parseValue(n), newR = this.abs(), q, lastT, lastR;
			while (!newR.isZero()) {
				q = r.divide(newR);
				lastT = t;
				lastR = r;
				t = newT;
				r = newR;
				newT = lastT.subtract(q.multiply(newT));
				newR = lastR.subtract(q.multiply(newR));
			}
			if (!r.isUnit()) throw new Error(this.toString() + " and " + n.toString() + " are not co-prime");
			if (t.compare(0) === -1) t = t.add(n);
			if (this.isNegative()) return t.negate();
			return t;
		};
		NativeBigInt.prototype.modInv = SmallInteger.prototype.modInv = BigInteger.prototype.modInv;
		BigInteger.prototype.next = function() {
			var value = this.value;
			if (this.sign) return subtractSmall(value, 1, this.sign);
			return new BigInteger(addSmall(value, 1), this.sign);
		};
		SmallInteger.prototype.next = function() {
			var value = this.value;
			if (value + 1 < MAX_INT) return new SmallInteger(value + 1);
			return new BigInteger(MAX_INT_ARR, false);
		};
		NativeBigInt.prototype.next = function() {
			return new NativeBigInt(this.value + BigInt(1));
		};
		BigInteger.prototype.prev = function() {
			var value = this.value;
			if (this.sign) return new BigInteger(addSmall(value, 1), true);
			return subtractSmall(value, 1, this.sign);
		};
		SmallInteger.prototype.prev = function() {
			var value = this.value;
			if (value - 1 > -MAX_INT) return new SmallInteger(value - 1);
			return new BigInteger(MAX_INT_ARR, true);
		};
		NativeBigInt.prototype.prev = function() {
			return new NativeBigInt(this.value - BigInt(1));
		};
		var powersOfTwo = [1];
		while (2 * powersOfTwo[powersOfTwo.length - 1] <= BASE) powersOfTwo.push(2 * powersOfTwo[powersOfTwo.length - 1]);
		var powers2Length = powersOfTwo.length, highestPower2 = powersOfTwo[powers2Length - 1];
		function shift_isSmall(n) {
			return Math.abs(n) <= BASE;
		}
		BigInteger.prototype.shiftLeft = function(v) {
			var n = parseValue(v).toJSNumber();
			if (!shift_isSmall(n)) throw new Error(String(n) + " is too large for shifting.");
			if (n < 0) return this.shiftRight(-n);
			var result = this;
			if (result.isZero()) return result;
			while (n >= powers2Length) {
				result = result.multiply(highestPower2);
				n -= powers2Length - 1;
			}
			return result.multiply(powersOfTwo[n]);
		};
		NativeBigInt.prototype.shiftLeft = SmallInteger.prototype.shiftLeft = BigInteger.prototype.shiftLeft;
		BigInteger.prototype.shiftRight = function(v) {
			var remQuo;
			var n = parseValue(v).toJSNumber();
			if (!shift_isSmall(n)) throw new Error(String(n) + " is too large for shifting.");
			if (n < 0) return this.shiftLeft(-n);
			var result = this;
			while (n >= powers2Length) {
				if (result.isZero() || result.isNegative() && result.isUnit()) return result;
				remQuo = divModAny(result, highestPower2);
				result = remQuo[1].isNegative() ? remQuo[0].prev() : remQuo[0];
				n -= powers2Length - 1;
			}
			remQuo = divModAny(result, powersOfTwo[n]);
			return remQuo[1].isNegative() ? remQuo[0].prev() : remQuo[0];
		};
		NativeBigInt.prototype.shiftRight = SmallInteger.prototype.shiftRight = BigInteger.prototype.shiftRight;
		function bitwise(x, y, fn) {
			y = parseValue(y);
			var xSign = x.isNegative(), ySign = y.isNegative();
			var xRem = xSign ? x.not() : x, yRem = ySign ? y.not() : y;
			var xDigit = 0, yDigit = 0;
			var xDivMod = null, yDivMod = null;
			var result = [];
			while (!xRem.isZero() || !yRem.isZero()) {
				xDivMod = divModAny(xRem, highestPower2);
				xDigit = xDivMod[1].toJSNumber();
				if (xSign) xDigit = highestPower2 - 1 - xDigit;
				yDivMod = divModAny(yRem, highestPower2);
				yDigit = yDivMod[1].toJSNumber();
				if (ySign) yDigit = highestPower2 - 1 - yDigit;
				xRem = xDivMod[0];
				yRem = yDivMod[0];
				result.push(fn(xDigit, yDigit));
			}
			var sum = fn(xSign ? 1 : 0, ySign ? 1 : 0) !== 0 ? bigInt(-1) : bigInt(0);
			for (var i = result.length - 1; i >= 0; i -= 1) sum = sum.multiply(highestPower2).add(bigInt(result[i]));
			return sum;
		}
		BigInteger.prototype.not = function() {
			return this.negate().prev();
		};
		NativeBigInt.prototype.not = SmallInteger.prototype.not = BigInteger.prototype.not;
		BigInteger.prototype.and = function(n) {
			return bitwise(this, n, function(a, b) {
				return a & b;
			});
		};
		NativeBigInt.prototype.and = SmallInteger.prototype.and = BigInteger.prototype.and;
		BigInteger.prototype.or = function(n) {
			return bitwise(this, n, function(a, b) {
				return a | b;
			});
		};
		NativeBigInt.prototype.or = SmallInteger.prototype.or = BigInteger.prototype.or;
		BigInteger.prototype.xor = function(n) {
			return bitwise(this, n, function(a, b) {
				return a ^ b;
			});
		};
		NativeBigInt.prototype.xor = SmallInteger.prototype.xor = BigInteger.prototype.xor;
		var LOBMASK_I = 1 << 30, LOBMASK_BI = (BASE & -BASE) * (BASE & -BASE) | LOBMASK_I;
		function roughLOB(n) {
			var v = n.value, x = typeof v === "number" ? v | LOBMASK_I : typeof v === "bigint" ? v | BigInt(LOBMASK_I) : v[0] + v[1] * BASE | LOBMASK_BI;
			return x & -x;
		}
		function integerLogarithm(value, base) {
			if (base.compareTo(value) <= 0) {
				var tmp = integerLogarithm(value, base.square(base));
				var p = tmp.p;
				var e = tmp.e;
				var t = p.multiply(base);
				return t.compareTo(value) <= 0 ? {
					p: t,
					e: e * 2 + 1
				} : {
					p,
					e: e * 2
				};
			}
			return {
				p: bigInt(1),
				e: 0
			};
		}
		BigInteger.prototype.bitLength = function() {
			var n = this;
			if (n.compareTo(bigInt(0)) < 0) n = n.negate().subtract(bigInt(1));
			if (n.compareTo(bigInt(0)) === 0) return bigInt(0);
			return bigInt(integerLogarithm(n, bigInt(2)).e).add(bigInt(1));
		};
		NativeBigInt.prototype.bitLength = SmallInteger.prototype.bitLength = BigInteger.prototype.bitLength;
		function max(a, b) {
			a = parseValue(a);
			b = parseValue(b);
			return a.greater(b) ? a : b;
		}
		function min(a, b) {
			a = parseValue(a);
			b = parseValue(b);
			return a.lesser(b) ? a : b;
		}
		function gcd(a, b) {
			a = parseValue(a).abs();
			b = parseValue(b).abs();
			if (a.equals(b)) return a;
			if (a.isZero()) return b;
			if (b.isZero()) return a;
			var c = Integer[1], d, t;
			while (a.isEven() && b.isEven()) {
				d = min(roughLOB(a), roughLOB(b));
				a = a.divide(d);
				b = b.divide(d);
				c = c.multiply(d);
			}
			while (a.isEven()) a = a.divide(roughLOB(a));
			do {
				while (b.isEven()) b = b.divide(roughLOB(b));
				if (a.greater(b)) {
					t = b;
					b = a;
					a = t;
				}
				b = b.subtract(a);
			} while (!b.isZero());
			return c.isUnit() ? a : a.multiply(c);
		}
		function lcm(a, b) {
			a = parseValue(a).abs();
			b = parseValue(b).abs();
			return a.divide(gcd(a, b)).multiply(b);
		}
		function randBetween(a, b, rng) {
			a = parseValue(a);
			b = parseValue(b);
			var usedRNG = rng || Math.random;
			var low = min(a, b);
			var range = max(a, b).subtract(low).add(1);
			if (range.isSmall) return low.add(Math.floor(usedRNG() * range));
			var digits = toBase(range, BASE).value;
			var result = [], restricted = true;
			for (var i = 0; i < digits.length; i++) {
				var top = restricted ? digits[i] + (i + 1 < digits.length ? digits[i + 1] / BASE : 0) : BASE;
				var digit = truncate(usedRNG() * top);
				result.push(digit);
				if (digit < digits[i]) restricted = false;
			}
			return low.add(Integer.fromArray(result, BASE, false));
		}
		var parseBase = function(text, base, alphabet, caseSensitive) {
			alphabet = alphabet || DEFAULT_ALPHABET;
			text = String(text);
			if (!caseSensitive) {
				text = text.toLowerCase();
				alphabet = alphabet.toLowerCase();
			}
			var length = text.length;
			var i;
			var absBase = Math.abs(base);
			var alphabetValues = {};
			for (i = 0; i < alphabet.length; i++) alphabetValues[alphabet[i]] = i;
			for (i = 0; i < length; i++) {
				var c = text[i];
				if (c === "-") continue;
				if (c in alphabetValues) {
					if (alphabetValues[c] >= absBase) {
						if (c === "1" && absBase === 1) continue;
						throw new Error(c + " is not a valid digit in base " + base + ".");
					}
				}
			}
			base = parseValue(base);
			var digits = [];
			var isNegative = text[0] === "-";
			for (i = isNegative ? 1 : 0; i < text.length; i++) {
				var c = text[i];
				if (c in alphabetValues) digits.push(parseValue(alphabetValues[c]));
				else if (c === "<") {
					var start = i;
					do
						i++;
					while (text[i] !== ">" && i < text.length);
					digits.push(parseValue(text.slice(start + 1, i)));
				} else throw new Error(c + " is not a valid character");
			}
			return parseBaseFromArray(digits, base, isNegative);
		};
		function parseBaseFromArray(digits, base, isNegative) {
			var val = Integer[0], pow = Integer[1], i = digits.length - 1;
			for (; i >= 0; i--) {
				val = val.add(digits[i].times(pow));
				pow = pow.times(base);
			}
			return isNegative ? val.negate() : val;
		}
		function stringify(digit, alphabet) {
			alphabet = alphabet || DEFAULT_ALPHABET;
			if (digit < alphabet.length) return alphabet[digit];
			return "<" + digit + ">";
		}
		function toBase(n, base) {
			base = bigInt(base);
			if (base.isZero()) {
				if (n.isZero()) return {
					value: [0],
					isNegative: false
				};
				throw new Error("Cannot convert nonzero numbers to base 0.");
			}
			if (base.equals(-1)) {
				if (n.isZero()) return {
					value: [0],
					isNegative: false
				};
				if (n.isNegative()) return {
					value: [].concat.apply([], Array.apply(null, Array(-n.toJSNumber())).map(Array.prototype.valueOf, [1, 0])),
					isNegative: false
				};
				var arr = Array.apply(null, Array(n.toJSNumber() - 1)).map(Array.prototype.valueOf, [0, 1]);
				arr.unshift([1]);
				return {
					value: [].concat.apply([], arr),
					isNegative: false
				};
			}
			var neg = false;
			if (n.isNegative() && base.isPositive()) {
				neg = true;
				n = n.abs();
			}
			if (base.isUnit()) {
				if (n.isZero()) return {
					value: [0],
					isNegative: false
				};
				return {
					value: Array.apply(null, Array(n.toJSNumber())).map(Number.prototype.valueOf, 1),
					isNegative: neg
				};
			}
			var out = [];
			var left = n, divmod;
			while (left.isNegative() || left.compareAbs(base) >= 0) {
				divmod = left.divmod(base);
				left = divmod.quotient;
				var digit = divmod.remainder;
				if (digit.isNegative()) {
					digit = base.minus(digit).abs();
					left = left.next();
				}
				out.push(digit.toJSNumber());
			}
			out.push(left.toJSNumber());
			return {
				value: out.reverse(),
				isNegative: neg
			};
		}
		function toBaseString(n, base, alphabet) {
			var arr = toBase(n, base);
			return (arr.isNegative ? "-" : "") + arr.value.map(function(x) {
				return stringify(x, alphabet);
			}).join("");
		}
		BigInteger.prototype.toArray = function(radix) {
			return toBase(this, radix);
		};
		SmallInteger.prototype.toArray = function(radix) {
			return toBase(this, radix);
		};
		NativeBigInt.prototype.toArray = function(radix) {
			return toBase(this, radix);
		};
		BigInteger.prototype.toString = function(radix, alphabet) {
			if (radix === undefined) radix = 10;
			if (radix !== 10 || alphabet) return toBaseString(this, radix, alphabet);
			var v = this.value, l = v.length, str = String(v[--l]), zeros = "0000000", digit;
			while (--l >= 0) {
				digit = String(v[l]);
				str += zeros.slice(digit.length) + digit;
			}
			return (this.sign ? "-" : "") + str;
		};
		SmallInteger.prototype.toString = function(radix, alphabet) {
			if (radix === undefined) radix = 10;
			if (radix != 10 || alphabet) return toBaseString(this, radix, alphabet);
			return String(this.value);
		};
		NativeBigInt.prototype.toString = SmallInteger.prototype.toString;
		NativeBigInt.prototype.toJSON = BigInteger.prototype.toJSON = SmallInteger.prototype.toJSON = function() {
			return this.toString();
		};
		BigInteger.prototype.valueOf = function() {
			return parseInt(this.toString(), 10);
		};
		BigInteger.prototype.toJSNumber = BigInteger.prototype.valueOf;
		SmallInteger.prototype.valueOf = function() {
			return this.value;
		};
		SmallInteger.prototype.toJSNumber = SmallInteger.prototype.valueOf;
		NativeBigInt.prototype.valueOf = NativeBigInt.prototype.toJSNumber = function() {
			return parseInt(this.toString(), 10);
		};
		function parseStringValue(v) {
			if (isPrecise(+v)) {
				var x = +v;
				if (x === truncate(x)) return supportsNativeBigInt ? new NativeBigInt(BigInt(x)) : new SmallInteger(x);
				throw new Error("Invalid integer: " + v);
			}
			var sign = v[0] === "-";
			if (sign) v = v.slice(1);
			var split = v.split(/e/i);
			if (split.length > 2) throw new Error("Invalid integer: " + split.join("e"));
			if (split.length === 2) {
				var exp = split[1];
				if (exp[0] === "+") exp = exp.slice(1);
				exp = +exp;
				if (exp !== truncate(exp) || !isPrecise(exp)) throw new Error("Invalid integer: " + exp + " is not a valid exponent.");
				var text = split[0];
				var decimalPlace = text.indexOf(".");
				if (decimalPlace >= 0) {
					exp -= text.length - decimalPlace - 1;
					text = text.slice(0, decimalPlace) + text.slice(decimalPlace + 1);
				}
				if (exp < 0) throw new Error("Cannot include negative exponent part for integers");
				text += new Array(exp + 1).join("0");
				v = text;
			}
			if (!/^([0-9][0-9]*)$/.test(v)) throw new Error("Invalid integer: " + v);
			if (supportsNativeBigInt) return new NativeBigInt(BigInt(sign ? "-" + v : v));
			var r = [], max = v.length, l = LOG_BASE, min = max - l;
			while (max > 0) {
				r.push(+v.slice(min, max));
				min -= l;
				if (min < 0) min = 0;
				max -= l;
			}
			trim(r);
			return new BigInteger(r, sign);
		}
		function parseNumberValue(v) {
			if (supportsNativeBigInt) return new NativeBigInt(BigInt(v));
			if (isPrecise(v)) {
				if (v !== truncate(v)) throw new Error(v + " is not an integer.");
				return new SmallInteger(v);
			}
			return parseStringValue(v.toString());
		}
		function parseValue(v) {
			if (typeof v === "number") return parseNumberValue(v);
			if (typeof v === "string") return parseStringValue(v);
			if (typeof v === "bigint") return new NativeBigInt(v);
			return v;
		}
		for (var i = 0; i < 1e3; i++) {
			Integer[i] = parseValue(i);
			if (i > 0) Integer[-i] = parseValue(-i);
		}
		Integer.one = Integer[1];
		Integer.zero = Integer[0];
		Integer.minusOne = Integer[-1];
		Integer.max = max;
		Integer.min = min;
		Integer.gcd = gcd;
		Integer.lcm = lcm;
		Integer.isInstance = function(x) {
			return x instanceof BigInteger || x instanceof SmallInteger || x instanceof NativeBigInt;
		};
		Integer.randBetween = randBetween;
		Integer.fromArray = function(digits, base, isNegative) {
			return parseBaseFromArray(digits.map(parseValue), parseValue(base || 10), isNegative);
		};
		return Integer;
	})();
	if (typeof module !== "undefined" && module.hasOwnProperty("exports")) module.exports = bigInt;
	if (typeof define === "function" && define.amd) define(function() {
		return bigInt;
	});
})))());
(0, import_BigInteger.default)(Number.MAX_SAFE_INTEGER);
const ulongBigInt = (0, import_BigInteger.default)(import_BigInteger.default[2]).pow(64);
const longBigInt = ulongBigInt.divide(import_BigInteger.default[2]);
//#endregion
//#region src/helpers/bigInt/bigIntConversion.ts
function bigIntFromBytes(bytes, base = 256) {
	return import_BigInteger.default.fromArray(bytes instanceof Uint8Array ? [...bytes] : bytes, base);
}
function bigIntToBytes(bigInt) {
	return new Uint8Array(bigInt.toArray(256).value);
}
function bigIntToSigned(bigInt) {
	return bigInt.greater(longBigInt) ? bigInt.minus(ulongBigInt) : bigInt;
}
//#endregion
//#region src/helpers/bytes/bytesModPow.ts
function bytesModPow(bytes, exp, mod) {
	const bytesBigInt = bigIntFromBytes(bytes);
	const expBigInt = bigIntFromBytes(exp);
	const modBigInt = bigIntFromBytes(mod);
	return bigIntToBytes(bytesBigInt.modPow(expBigInt, modBigInt));
}
//#endregion
//#region node_modules/.pnpm/fflate@0.8.3/node_modules/fflate/esm/browser.js
var u8 = Uint8Array;
var u16 = Uint16Array;
var i32 = Int32Array;
var fleb = new u8([
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	1,
	1,
	1,
	1,
	2,
	2,
	2,
	2,
	3,
	3,
	3,
	3,
	4,
	4,
	4,
	4,
	5,
	5,
	5,
	5,
	0,
	0,
	0,
	0
]);
var fdeb = new u8([
	0,
	0,
	0,
	0,
	1,
	1,
	2,
	2,
	3,
	3,
	4,
	4,
	5,
	5,
	6,
	6,
	7,
	7,
	8,
	8,
	9,
	9,
	10,
	10,
	11,
	11,
	12,
	12,
	13,
	13,
	0,
	0
]);
var clim = new u8([
	16,
	17,
	18,
	0,
	8,
	7,
	9,
	6,
	10,
	5,
	11,
	4,
	12,
	3,
	13,
	2,
	14,
	1,
	15
]);
var freb = function(eb, start) {
	var b = new u16(31);
	for (var i = 0; i < 31; ++i) b[i] = start += 1 << eb[i - 1];
	var r = new i32(b[30]);
	for (var i = 1; i < 30; ++i) for (var j = b[i]; j < b[i + 1]; ++j) r[j] = j - b[i] << 5 | i;
	return {
		b,
		r
	};
};
var _a = freb(fleb, 2);
var fl = _a.b;
var revfl = _a.r;
fl[28] = 258, revfl[258] = 28;
var _b = freb(fdeb, 0);
var fd = _b.b;
_b.r;
var rev = new u16(32768);
for (var i = 0; i < 32768; ++i) {
	var x = (i & 43690) >> 1 | (i & 21845) << 1;
	x = (x & 52428) >> 2 | (x & 13107) << 2;
	x = (x & 61680) >> 4 | (x & 3855) << 4;
	rev[i] = ((x & 65280) >> 8 | (x & 255) << 8) >> 1;
}
var hMap = (function(cd, mb, r) {
	var s = cd.length;
	var i = 0;
	var l = new u16(mb);
	for (; i < s; ++i) if (cd[i]) ++l[cd[i] - 1];
	var le = new u16(mb);
	for (i = 1; i < mb; ++i) le[i] = le[i - 1] + l[i - 1] << 1;
	var co;
	if (r) {
		co = new u16(1 << mb);
		var rvb = 15 - mb;
		for (i = 0; i < s; ++i) if (cd[i]) {
			var sv = i << 4 | cd[i];
			var r_1 = mb - cd[i];
			var v = le[cd[i] - 1]++ << r_1;
			for (var m = v | (1 << r_1) - 1; v <= m; ++v) co[rev[v] >> rvb] = sv;
		}
	} else {
		co = new u16(s);
		for (i = 0; i < s; ++i) if (cd[i]) co[i] = rev[le[cd[i] - 1]++] >> 15 - cd[i];
	}
	return co;
});
var flt = new u8(288);
for (var i = 0; i < 144; ++i) flt[i] = 8;
for (var i = 144; i < 256; ++i) flt[i] = 9;
for (var i = 256; i < 280; ++i) flt[i] = 7;
for (var i = 280; i < 288; ++i) flt[i] = 8;
var fdt = new u8(32);
for (var i = 0; i < 32; ++i) fdt[i] = 5;
var flrm = /*#__PURE__*/ hMap(flt, 9, 1);
var fdrm = /*#__PURE__*/ hMap(fdt, 5, 1);
var max = function(a) {
	var m = a[0];
	for (var i = 1; i < a.length; ++i) if (a[i] > m) m = a[i];
	return m;
};
var bits = function(d, p, m) {
	var o = p / 8 | 0;
	return (d[o] | d[o + 1] << 8) >> (p & 7) & m;
};
var bits16 = function(d, p) {
	var o = p / 8 | 0;
	return (d[o] | d[o + 1] << 8 | d[o + 2] << 16) >> (p & 7);
};
var shft = function(p) {
	return (p + 7) / 8 | 0;
};
var slc = function(v, s, e) {
	if (s == null || s < 0) s = 0;
	if (e == null || e > v.length) e = v.length;
	return new u8(v.subarray(s, e));
};
var ec = [
	"unexpected EOF",
	"invalid block type",
	"invalid length/literal",
	"invalid distance",
	"stream finished",
	"no stream handler",
	,
	"no callback",
	"invalid UTF-8 data",
	"extra field too long",
	"date not in range 1980-2099",
	"filename too long",
	"stream finishing",
	"invalid zip data"
];
var err = function(ind, msg, nt) {
	var e = new Error(msg || ec[ind]);
	e.code = ind;
	if (Error.captureStackTrace) Error.captureStackTrace(e, err);
	if (!nt) throw e;
	return e;
};
var inflt = function(dat, st, buf, dict) {
	var sl = dat.length, dl = dict ? dict.length : 0;
	if (!sl || st.f && !st.l) return buf || new u8(0);
	var noBuf = !buf;
	var resize = noBuf || st.i != 2;
	var noSt = st.i;
	if (noBuf) buf = new u8(sl * 3);
	var cbuf = function(l) {
		var bl = buf.length;
		if (l > bl) {
			var nbuf = new u8(Math.max(bl * 2, l));
			nbuf.set(buf);
			buf = nbuf;
		}
	};
	var final = st.f || 0, pos = st.p || 0, bt = st.b || 0, lm = st.l, dm = st.d, lbt = st.m, dbt = st.n;
	var tbts = sl * 8;
	do {
		if (!lm) {
			final = bits(dat, pos, 1);
			var type = bits(dat, pos + 1, 3);
			pos += 3;
			if (!type) {
				var s = shft(pos) + 4, l = dat[s - 4] | dat[s - 3] << 8, t = s + l;
				if (t > sl) {
					if (noSt) err(0);
					break;
				}
				if (resize) cbuf(bt + l);
				buf.set(dat.subarray(s, t), bt);
				st.b = bt += l, st.p = pos = t * 8, st.f = final;
				continue;
			} else if (type == 1) lm = flrm, dm = fdrm, lbt = 9, dbt = 5;
			else if (type == 2) {
				var hLit = bits(dat, pos, 31) + 257, hcLen = bits(dat, pos + 10, 15) + 4;
				var tl = hLit + bits(dat, pos + 5, 31) + 1;
				pos += 14;
				var ldt = new u8(tl);
				var clt = new u8(19);
				for (var i = 0; i < hcLen; ++i) clt[clim[i]] = bits(dat, pos + i * 3, 7);
				pos += hcLen * 3;
				var clb = max(clt), clbmsk = (1 << clb) - 1;
				var clm = hMap(clt, clb, 1);
				for (var i = 0; i < tl;) {
					var r = clm[bits(dat, pos, clbmsk)];
					pos += r & 15;
					var s = r >> 4;
					if (s < 16) ldt[i++] = s;
					else {
						var c = 0, n = 0;
						if (s == 16) n = 3 + bits(dat, pos, 3), pos += 2, c = ldt[i - 1];
						else if (s == 17) n = 3 + bits(dat, pos, 7), pos += 3;
						else if (s == 18) n = 11 + bits(dat, pos, 127), pos += 7;
						while (n--) ldt[i++] = c;
					}
				}
				var lt = ldt.subarray(0, hLit), dt = ldt.subarray(hLit);
				lbt = max(lt);
				dbt = max(dt);
				lm = hMap(lt, lbt, 1);
				dm = hMap(dt, dbt, 1);
			} else err(1);
			if (pos > tbts) {
				if (noSt) err(0);
				break;
			}
		}
		if (resize) cbuf(bt + 131072);
		var lms = (1 << lbt) - 1, dms = (1 << dbt) - 1;
		var lpos = pos;
		for (;; lpos = pos) {
			var c = lm[bits16(dat, pos) & lms], sym = c >> 4;
			pos += c & 15;
			if (pos > tbts) {
				if (noSt) err(0);
				break;
			}
			if (!c) err(2);
			if (sym < 256) buf[bt++] = sym;
			else if (sym == 256) {
				lpos = pos, lm = null;
				break;
			} else {
				var add = sym - 254;
				if (sym > 264) {
					var i = sym - 257, b = fleb[i];
					add = bits(dat, pos, (1 << b) - 1) + fl[i];
					pos += b;
				}
				var d = dm[bits16(dat, pos) & dms], dsym = d >> 4;
				if (!d) err(3);
				pos += d & 15;
				var dt = fd[dsym];
				if (dsym > 3) {
					var b = fdeb[dsym];
					dt += bits16(dat, pos) & (1 << b) - 1, pos += b;
				}
				if (pos > tbts) {
					if (noSt) err(0);
					break;
				}
				if (resize) cbuf(bt + 131072);
				var end = bt + add;
				if (bt < dt) {
					var shift = dl - dt, dend = Math.min(dt, end);
					if (shift + bt < 0) err(3);
					for (; bt < dend; ++bt) buf[bt] = dict[shift + bt];
				}
				for (; bt < end; ++bt) buf[bt] = buf[bt - dt];
			}
		}
		st.l = lm, st.p = lpos, st.b = bt, st.f = final;
		if (lm) final = 1, st.m = lbt, st.d = dm, st.n = dbt;
	} while (!final);
	return bt != buf.length && noBuf ? slc(buf, 0, bt) : buf.subarray(0, bt);
};
var et = /*#__PURE__*/ new u8(0);
var gzs = function(d) {
	if (d[0] != 31 || d[1] != 139 || d[2] != 8) err(6, "invalid gzip data");
	var flg = d[3];
	var st = 10;
	if (flg & 4) st += (d[10] | d[11] << 8) + 2;
	for (var zs = (flg >> 3 & 1) + (flg >> 4 & 1); zs > 0; zs -= !d[st++]);
	return st + (flg & 2);
};
var gzl = function(d) {
	var l = d.length;
	return (d[l - 4] | d[l - 3] << 8 | d[l - 2] << 16 | d[l - 1] << 24) >>> 0;
};
var zls = function(d, dict) {
	if ((d[0] & 15) != 8 || d[0] >> 4 > 7 || (d[0] << 8 | d[1]) % 31) err(6, "invalid zlib data");
	if ((d[1] >> 5 & 1) == +!dict) err(6, "invalid zlib data: " + (d[1] & 32 ? "need" : "unexpected") + " dictionary");
	return (d[1] >> 3 & 4) + 2;
};
function StrmOpt(opts, cb) {
	if (typeof opts == "function") cb = opts, opts = {};
	this.ondata = cb;
	return opts;
}
/**
* Streaming DEFLATE decompression
*/
var Inflate = /* @__PURE__ */ function() {
	function Inflate(opts, cb) {
		if (typeof opts == "function") cb = opts, opts = {};
		this.ondata = cb;
		var dict = opts && opts.dictionary && opts.dictionary.subarray(-32768);
		this.s = {
			i: 0,
			b: dict ? dict.length : 0
		};
		this.o = new u8(32768);
		this.p = new u8(0);
		if (dict) this.o.set(dict);
	}
	Inflate.prototype.e = function(c) {
		if (!this.ondata) err(5);
		if (this.d) err(4);
		if (!this.p.length) this.p = c;
		else if (c.length) {
			var n = new u8(this.p.length + c.length);
			n.set(this.p), n.set(c, this.p.length), this.p = n;
		}
	};
	Inflate.prototype.c = function(final) {
		this.s.i = +(this.d = final || false);
		var bts = this.s.b;
		var dt = inflt(this.p, this.s, this.o);
		this.ondata(slc(dt, bts, this.s.b), this.d);
		this.o = slc(dt, this.s.b - 32768), this.s.b = this.o.length;
		this.p = slc(this.p, this.s.p / 8 | 0), this.s.p &= 7;
	};
	/**
	* Pushes a chunk to be inflated
	* @param chunk The chunk to push
	* @param final Whether this is the final chunk
	*/
	Inflate.prototype.push = function(chunk, final) {
		this.e(chunk), this.c(final);
	};
	return Inflate;
}();
function inflateSync(data, opts) {
	return inflt(data, { i: 2 }, opts && opts.out, opts && opts.dictionary);
}
/**
* Streaming single or multi-member GZIP decompression
*/
var Gunzip = /* @__PURE__ */ function() {
	function Gunzip(opts, cb) {
		this.v = 1;
		this.r = 0;
		Inflate.call(this, opts, cb);
	}
	/**
	* Pushes a chunk to be GUNZIPped
	* @param chunk The chunk to push
	* @param final Whether this is the last chunk
	*/
	Gunzip.prototype.push = function(chunk, final) {
		Inflate.prototype.e.call(this, chunk);
		this.r += chunk.length;
		if (this.v) {
			var p = this.p.subarray(this.v - 1);
			var s = p.length > 3 ? gzs(p) : 4;
			if (s > p.length) {
				if (!final) return;
			} else if (this.v > 1 && this.onmember) this.onmember(this.r - p.length);
			this.p = p.subarray(s), this.v = 0;
		}
		Inflate.prototype.c.call(this, 0);
		if (this.s.f && !this.s.l) {
			this.v = shft(this.s.p) + 9;
			this.s = { i: 0 };
			this.o = new u8(0);
			this.push(new u8(0), final);
		} else if (final) Inflate.prototype.c.call(this, final);
	};
	return Gunzip;
}();
function gunzipSync(data, opts) {
	var st = gzs(data);
	if (st + 8 > data.length) err(6, "invalid gzip data");
	return inflt(data.subarray(st, -8), { i: 2 }, opts && opts.out || new u8(gzl(data)), opts && opts.dictionary);
}
/**
* Streaming Zlib decompression
*/
var Unzlib = /* @__PURE__ */ function() {
	function Unzlib(opts, cb) {
		Inflate.call(this, opts, cb);
		this.v = opts && opts.dictionary ? 2 : 1;
	}
	/**
	* Pushes a chunk to be unzlibbed
	* @param chunk The chunk to push
	* @param final Whether this is the last chunk
	*/
	Unzlib.prototype.push = function(chunk, final) {
		Inflate.prototype.e.call(this, chunk);
		if (this.v) {
			if (this.p.length < 6 && !final) return;
			this.p = this.p.subarray(zls(this.p, this.v - 1)), this.v = 0;
		}
		if (final) {
			if (this.p.length < 4) err(6, "invalid zlib data");
			this.p = this.p.subarray(0, -4);
		}
		Inflate.prototype.c.call(this, final);
	};
	return Unzlib;
}();
function unzlibSync(data, opts) {
	return inflt(data.subarray(zls(data, opts && opts.dictionary), -4), { i: 2 }, opts && opts.out, opts && opts.dictionary);
}
/**
* Streaming GZIP, Zlib, or raw DEFLATE decompression
*/
var Decompress = /* @__PURE__ */ function() {
	function Decompress(opts, cb) {
		this.o = StrmOpt.call(this, opts, cb) || {};
		this.G = Gunzip;
		this.I = Inflate;
		this.Z = Unzlib;
	}
	Decompress.prototype.i = function() {
		var _this = this;
		this.s.ondata = function(dat, final) {
			_this.ondata(dat, final);
		};
	};
	/**
	* Pushes a chunk to be decompressed
	* @param chunk The chunk to push
	* @param final Whether this is the last chunk
	*/
	Decompress.prototype.push = function(chunk, final) {
		if (!this.ondata) err(5);
		if (!this.s) {
			if (this.p && this.p.length) {
				var n = new u8(this.p.length + chunk.length);
				n.set(this.p), n.set(chunk, this.p.length);
			} else this.p = chunk;
			if (this.p.length > 2) {
				this.s = this.p[0] == 31 && this.p[1] == 139 && this.p[2] == 8 ? new this.G(this.o) : (this.p[0] & 15) != 8 || this.p[0] >> 4 > 7 || (this.p[0] << 8 | this.p[1]) % 31 ? new this.I(this.o) : new this.Z(this.o);
				this.i();
				this.s.push(this.p, final);
				this.p = null;
			}
		} else this.s.push(chunk, final);
	};
	return Decompress;
}();
/**
* Expands compressed GZIP, Zlib, or raw DEFLATE data, automatically detecting the format
* @param data The data to decompress
* @param opts The decompression options
* @returns The decompressed version of the data
*/
function decompressSync(data, opts) {
	return data[0] == 31 && data[1] == 139 && data[2] == 8 ? gunzipSync(data, opts) : (data[0] & 15) != 8 || data[0] >> 4 > 7 || (data[0] << 8 | data[1]) % 31 ? inflateSync(data, opts) : unzlibSync(data, opts);
}
var td = typeof TextDecoder != "undefined" && /*#__PURE__*/ new TextDecoder();
try {
	td.decode(et, { stream: true });
} catch (e) {}
//#endregion
//#region src/helpers/gzipUncompress.ts
function gzipUncompress(bytes, toString, maxSize) {
	let result;
	if (maxSize === void 0) result = decompressSync(new Uint8Array(bytes));
	else {
		const chunks = [];
		let total = 0;
		let exceeded = false;
		new Decompress((chunk) => {
			if (exceeded) return;
			total += chunk.length;
			if (total > maxSize) {
				exceeded = true;
				return;
			}
			chunks.push(chunk);
		}).push(new Uint8Array(bytes), true);
		if (exceeded) throw new Error("GZIP_MAX_SIZE_EXCEEDED");
		result = new Uint8Array(total);
		let offset = 0;
		for (const c of chunks) {
			result.set(c, offset);
			offset += c.length;
		}
	}
	return toString ? new TextDecoder().decode(result) : result;
}
//#endregion
//#region src/lib/calls/helpers/getEmojisFingerprint.ts
function readBigIntFromBytesBE(bytes) {
	const length = bytes.length;
	const bits = length * 8;
	let value = (0, import_BigInteger.default)(bytes[0]).and(127).shiftLeft(bits - 8);
	for (let i = 1; i < length; ++i) {
		const _bits = bits - (i + 1) * 8;
		const b = (0, import_BigInteger.default)(bytes[i]);
		value = value.or(_bits ? b.shiftLeft(_bits) : b);
	}
	return value;
}
const emojis = [
	"1f609",
	"1f60d",
	"1f61b",
	"1f62d",
	"1f631",
	"1f621",
	"1f60e",
	"1f634",
	"1f635",
	"1f608",
	"1f62c",
	"1f607",
	"1f60f",
	"1f46e",
	"1f477",
	"1f482",
	"1f476",
	"1f468",
	"1f469",
	"1f474",
	"1f475",
	"1f63b",
	"1f63d",
	"1f640",
	"1f47a",
	"1f648",
	"1f649",
	"1f64a",
	"1f480",
	"1f47d",
	"1f4a9",
	"1f525",
	"1f4a5",
	"1f4a4",
	"1f442",
	"1f440",
	"1f443",
	"1f445",
	"1f444",
	"1f44d",
	"1f44e",
	"1f44c",
	"1f44a",
	"270c",
	"270b",
	"1f450",
	"1f446",
	"1f447",
	"1f449",
	"1f448",
	"1f64f",
	"1f44f",
	"1f4aa",
	"1f6b6",
	"1f3c3",
	"1f483",
	"1f46b",
	"1f46a",
	"1f46c",
	"1f46d",
	"1f485",
	"1f3a9",
	"1f451",
	"1f452",
	"1f45f",
	"1f45e",
	"1f460",
	"1f455",
	"1f457",
	"1f456",
	"1f459",
	"1f45c",
	"1f453",
	"1f380",
	"1f484",
	"1f49b",
	"1f499",
	"1f49c",
	"1f49a",
	"1f48d",
	"1f48e",
	"1f436",
	"1f43a",
	"1f431",
	"1f42d",
	"1f439",
	"1f430",
	"1f438",
	"1f42f",
	"1f428",
	"1f43b",
	"1f437",
	"1f42e",
	"1f417",
	"1f434",
	"1f411",
	"1f418",
	"1f43c",
	"1f427",
	"1f425",
	"1f414",
	"1f40d",
	"1f422",
	"1f41b",
	"1f41d",
	"1f41c",
	"1f41e",
	"1f40c",
	"1f419",
	"1f41a",
	"1f41f",
	"1f42c",
	"1f40b",
	"1f410",
	"1f40a",
	"1f42b",
	"1f340",
	"1f339",
	"1f33b",
	"1f341",
	"1f33e",
	"1f344",
	"1f335",
	"1f334",
	"1f333",
	"1f31e",
	"1f31a",
	"1f319",
	"1f30e",
	"1f30b",
	"26a1",
	"2614",
	"2744",
	"26c4",
	"1f300",
	"1f308",
	"1f30a",
	"1f393",
	"1f386",
	"1f383",
	"1f47b",
	"1f385",
	"1f384",
	"1f381",
	"1f388",
	"1f52e",
	"1f3a5",
	"1f4f7",
	"1f4bf",
	"1f4bb",
	"260e",
	"1f4e1",
	"1f4fa",
	"1f4fb",
	"1f509",
	"1f514",
	"23f3",
	"23f0",
	"231a",
	"1f512",
	"1f511",
	"1f50e",
	"1f4a1",
	"1f526",
	"1f50c",
	"1f50b",
	"1f6bf",
	"1f6bd",
	"1f527",
	"1f528",
	"1f6aa",
	"1f6ac",
	"1f4a3",
	"1f52b",
	"1f52a",
	"1f48a",
	"1f489",
	"1f4b0",
	"1f4b5",
	"1f4b3",
	"2709",
	"1f4eb",
	"1f4e6",
	"1f4c5",
	"1f4c1",
	"2702",
	"1f4cc",
	"1f4ce",
	"2712",
	"270f",
	"1f4d0",
	"1f4da",
	"1f52c",
	"1f52d",
	"1f3a8",
	"1f3ac",
	"1f3a4",
	"1f3a7",
	"1f3b5",
	"1f3b9",
	"1f3bb",
	"1f3ba",
	"1f3b8",
	"1f47e",
	"1f3ae",
	"1f0cf",
	"1f3b2",
	"1f3af",
	"1f3c8",
	"1f3c0",
	"26bd",
	"26be",
	"1f3be",
	"1f3b1",
	"1f3c9",
	"1f3b3",
	"1f3c1",
	"1f3c7",
	"1f3c6",
	"1f3ca",
	"1f3c4",
	"2615",
	"1f37c",
	"1f37a",
	"1f377",
	"1f374",
	"1f355",
	"1f354",
	"1f35f",
	"1f357",
	"1f371",
	"1f35a",
	"1f35c",
	"1f361",
	"1f373",
	"1f35e",
	"1f369",
	"1f366",
	"1f382",
	"1f370",
	"1f36a",
	"1f36b",
	"1f36d",
	"1f36f",
	"1f34e",
	"1f34f",
	"1f34a",
	"1f34b",
	"1f352",
	"1f347",
	"1f349",
	"1f353",
	"1f351",
	"1f34c",
	"1f350",
	"1f34d",
	"1f346",
	"1f345",
	"1f33d",
	"1f3e1",
	"1f3e5",
	"1f3e6",
	"26ea",
	"1f3f0",
	"26fa",
	"1f3ed",
	"1f5fb",
	"1f5fd",
	"1f3a0",
	"1f3a1",
	"26f2",
	"1f3a2",
	"1f6a2",
	"1f6a4",
	"2693",
	"1f680",
	"2708",
	"1f681",
	"1f682",
	"1f68b",
	"1f68e",
	"1f68c",
	"1f699",
	"1f697",
	"1f695",
	"1f69b",
	"1f6a8",
	"1f694",
	"1f692",
	"1f691",
	"1f6b2",
	"1f6a0",
	"1f69c",
	"1f6a6",
	"26a0",
	"1f6a7",
	"26fd",
	"1f3b0",
	"1f5ff",
	"1f3aa",
	"1f3ad",
	"1f1ef-1f1f5",
	"1f1f0-1f1f7",
	"1f1e9-1f1ea",
	"1f1e8-1f1f3",
	"1f1fa-1f1f8",
	"1f1eb-1f1f7",
	"1f1ea-1f1f8",
	"1f1ee-1f1f9",
	"1f1f7-1f1fa",
	"1f1ec-1f1e7",
	"0031-20e3",
	"0032-20e3",
	"0033-20e3",
	"0034-20e3",
	"0035-20e3",
	"0036-20e3",
	"0037-20e3",
	"0038-20e3",
	"0039-20e3",
	"0030-20e3",
	"1f51f",
	"2757",
	"2753",
	"2665",
	"2666",
	"1f4af",
	"1f517",
	"1f531",
	"1f534",
	"1f535",
	"1f536",
	"1f537"
];
async function getEmojisFingerprint(key, g_a) {
	const arr = key.concat(g_a);
	const hash = await cryptoMessagePort.invokeCrypto("sha256", arr);
	const result = [];
	const emojisLength = emojis.length;
	const kPartSize = 8;
	for (let partOffset = 0; partOffset != hash.length; partOffset += kPartSize) {
		const index = readBigIntFromBytesBE(hash.slice(partOffset, partOffset + kPartSize)).mod(emojisLength).toJSNumber();
		const codePoints = emojis[index];
		result.push(codePoints);
	}
	return result;
}
//#endregion
//#region src/helpers/array/randomize.ts
function randomize(arr) {
	if (crypto && "getRandomValues" in crypto) crypto.getRandomValues(arr);
	else throw new Error("NO_SECURE_RANDOM");
	return arr;
}
//#endregion
//#region src/helpers/bytes/addPadding.ts
function addPadding(bytes, blockSize = 16, zeroes, blockSizeAsTotalLength = false, prepend = false) {
	const len = bytes.byteLength || bytes.length;
	const needPadding = blockSizeAsTotalLength ? blockSize - len : blockSize - len % blockSize;
	if (needPadding > 0 && needPadding < blockSize) {
		const padding = new Uint8Array(needPadding);
		if (zeroes) for (let i = 0; i < needPadding; ++i) padding[i] = 0;
		else randomize(padding);
		if (bytes instanceof ArrayBuffer) return (prepend ? bufferConcats(padding, bytes) : bufferConcats(bytes, padding)).buffer;
		else if (bytes instanceof Uint8Array) return prepend ? bufferConcats(padding, bytes) : bufferConcats(bytes, padding);
		else return prepend ? [...padding].concat(bytes) : bytes.concat([...padding]);
	}
	return bytes;
}
//#endregion
//#region src/helpers/bytes/bytesToHex.ts
function bytesToHex(bytes, joiner = "", uppercase) {
	const length = bytes.length;
	const arr = new Array(length);
	for (let i = 0; i < length; ++i) arr[i] = (bytes[i] < 16 ? "0" : "") + (bytes[i] || 0).toString(16);
	const joined = arr.join(joiner);
	return uppercase ? joined.toUpperCase() : joined;
}
ctx$1.bytesToHex = bytesToHex;
//#endregion
//#region src/lib/crypto/dhValidation.ts
const KNOWN_DH_PRIME_HEX = "c71caeb9c6b1c9048e6c522f70f13f73980d40238e3e21c14934d037563d930f48198a0aa7c14058229493d22530f4dbfa336f6e0ac925139543aed44cce7c3720fd51f69458705ac68cd4fe6b6b13abdc9746512969328454f18faf8c595f642477fe96bb2a941d5bcd1d4ac8cc49880708fa9b378e3c4f3a9060bee67cf9a4a4a695811051907e162753b56b0f6b410dba74d8a84b2a14b3144e0ef1284754fd17ed950d5965b4b9dd46582db1178d169c6bc465b0d6ff9ca3928fef5b9ae4e418fc15e83ebea0f87fa9ff5eed70050ded2849f47bf959d956850ce929851f0d8115f635b105ee2e4e15d04b2454bf6f4fadf034b10403119cd8e3b92fcc5b";
const DH_PRIME_BITS = 2048;
const TWO_POW = (0, import_BigInteger.default)(2).pow(1984);
const PRIME_PRIMALITY_ITERATIONS = 30;
function isGoodGeneratorForPrime(g, p) {
	switch (g) {
		case 2: return p.mod(8).toJSNumber() === 7;
		case 3: return p.mod(3).toJSNumber() === 2;
		case 4: return true;
		case 5: {
			const m = p.mod(5).toJSNumber();
			return m === 1 || m === 4;
		}
		case 6: {
			const m = p.mod(24).toJSNumber();
			return m === 19 || m === 23;
		}
		case 7: {
			const m = p.mod(7).toJSNumber();
			return m === 3 || m === 5 || m === 6;
		}
		default: return false;
	}
}
function verifyDhPrimeAndGenerator(pBytes, g) {
	if (bytesToHex(pBytes) === KNOWN_DH_PRIME_HEX && (g === 3 || g === 4 || g === 5 || g === 7)) return;
	const p = bigIntFromBytes(pBytes);
	if (p.isNegative() || p.bitLength().notEquals(DH_PRIME_BITS)) throw new Error("[DH] bad prime: wrong bit length");
	if (!isGoodGeneratorForPrime(g, p)) throw new Error("[DH] bad generator g=" + g);
	if (!p.isProbablePrime(PRIME_PRIMALITY_ITERATIONS)) throw new Error("[DH] bad prime: not prime");
	if (!p.subtract(import_BigInteger.default.one).divide(2).isProbablePrime(PRIME_PRIMALITY_ITERATIONS)) throw new Error("[DH] bad prime: (p-1)/2 not prime");
}
function verifyDhPublicValue(xBytes, pBytes) {
	if (xBytes.length > 256) throw new Error("[DH] public value too large");
	const x = bigIntFromBytes(xBytes);
	const p = bigIntFromBytes(pBytes);
	if (x.compare(import_BigInteger.default.one) <= 0) throw new Error("[DH] public value <= 1");
	if (x.compare(p.subtract(import_BigInteger.default.one)) >= 0) throw new Error("[DH] public value >= p - 1");
	if (x.compare(TWO_POW) < 0) throw new Error("[DH] public value < 2^(2048-64)");
	if (x.compare(p.subtract(TWO_POW)) >= 0) throw new Error("[DH] public value > p - 2^(2048-64)");
}
//#endregion
//#region src/lib/crypto/computeDhKey.ts
async function computeDhKey(g_b, a, p) {
	verifyDhPublicValue(g_b, p);
	const key = addPadding(await cryptoMessagePort.invokeCrypto("mod-pow", g_b, a, p), 256, true, true, true);
	return {
		key,
		key_fingerprint: bigIntToSigned(bigIntFromBytes((await cryptoMessagePort.invokeCrypto("sha1", key)).slice(-8).reverse())).toString(10)
	};
}
//#endregion
//#region src/helpers/bytes/bytesFromHex.ts
function bytesFromHex(hexString) {
	const len = hexString.length;
	const bytes = new Uint8Array(Math.ceil(len / 2));
	let start = 0;
	if (len % 2) bytes[start++] = parseInt(hexString.charAt(0), 16);
	for (let i = start; i < len; i += 2) bytes[start++] = parseInt(hexString.substr(i, 2), 16);
	return bytes;
}
MOUNT_CLASS_TO.bytesFromHex = bytesFromHex;
//#endregion
//#region src/helpers/random.ts
const arrays = {
	8: /* @__PURE__ */ new Uint8Array(1),
	16: /* @__PURE__ */ new Uint16Array(1),
	32: /* @__PURE__ */ new Uint32Array(1)
};
function nextRandomUint(bits) {
	const array = arrays[bits];
	randomize(array);
	return array[0];
}
function randomBytes(length) {
	return randomize(new Uint8Array(length));
}
//#endregion
//#region src/lib/crypto/generateDh.ts
const RANDOM_POWER_SIZE = 256;
const MAX_ATTEMPTS = 1e3;
async function generateDh(dhConfig) {
	const { p, g } = dhConfig;
	verifyDhPrimeAndGenerator(p, g);
	const generateA = (p) => {
		const pBigInt = bigIntFromBytes(p);
		for (let attempt = 0; attempt < MAX_ATTEMPTS; ++attempt) {
			const a = randomBytes(RANDOM_POWER_SIZE);
			const aBigInt = bigIntFromBytes(a);
			if (!aBigInt.greater(import_BigInteger.default.one)) continue;
			if (!aBigInt.lesser(pBigInt.subtract(import_BigInteger.default.one))) continue;
			return a;
		}
		throw new Error("[DH] could not generate a suitable secret exponent");
	};
	const gBytes = bytesFromHex(g.toString(16));
	for (let attempt = 0; attempt < MAX_ATTEMPTS; ++attempt) {
		const a = generateA(p);
		const g_a = addPadding(await cryptoMessagePort.invokeCrypto("mod-pow", gBytes, a, p), 256, true, true, true);
		try {
			verifyDhPublicValue(g_a, p);
		} catch (err) {
			continue;
		}
		return {
			a,
			g_a,
			g_a_hash: await cryptoMessagePort.invokeCrypto("sha256", g_a),
			p
		};
	}
	throw new Error("[DH] could not generate a suitable g_a");
}
//#endregion
//#region src/helpers/bytes/bytesXor.ts
function bytesXor(bytes1, bytes2) {
	const len = bytes1.length;
	const bytes = new Uint8Array(len);
	for (let i = 0; i < len; ++i) bytes[i] = bytes1[i] ^ bytes2[i];
	return bytes;
}
//#endregion
//#region src/helpers/bytes/convertToUint8Array.ts
function convertToUint8Array(bytes) {
	if (bytes instanceof Uint8Array) return bytes;
	else if (typeof bytes === "string") return new TextEncoder().encode(bytes);
	return new Uint8Array(bytes);
}
//#endregion
//#region src/lib/crypto/srp.ts
async function makePasswordHash(password, client_salt, server_salt) {
	let buffer = await cryptoMessagePort.invokeCrypto("sha256", bufferConcats(client_salt, new TextEncoder().encode(password), client_salt));
	buffer = bufferConcats(server_salt, buffer, server_salt);
	buffer = await cryptoMessagePort.invokeCrypto("sha256", buffer);
	let hash = await cryptoMessagePort.invokeCrypto("pbkdf2", new Uint8Array(buffer), client_salt, 1e5);
	hash = bufferConcats(server_salt, hash, server_salt);
	buffer = await cryptoMessagePort.invokeCrypto("sha256", hash);
	return buffer;
}
async function computeSRP(password, state, isNew) {
	const algo = isNew ? state.new_algo : state.current_algo;
	const p = bigIntFromBytes(algo.p);
	const g = (0, import_BigInteger.default)(algo.g);
	verifyDhPrimeAndGenerator(algo.p, algo.g);
	const pw_hash = await makePasswordHash(password, algo.salt1, algo.salt2);
	const x = (0, import_BigInteger.default)(bytesToHex(pw_hash), 16);
	const padArray = function(arr, len) {
		if (!(arr instanceof Uint8Array)) arr = convertToUint8Array(arr);
		return addPadding(arr, len, true, true, true);
	};
	const v = g.modPow(x, p);
	if (isNew) return padArray(bigIntToBytes(v), 256);
	if (state.srp_B.length < 248 || state.srp_B.length > 256) throw new Error("[SRP] invalid srp_B length: " + state.srp_B.length);
	const B = bigIntFromBytes(state.srp_B);
	if (!B.greater(import_BigInteger.default.zero) || !B.lesser(p)) throw new Error("[SRP] srp_B out of range");
	const pForHash = padArray(bigIntToBytes(p), 256);
	const gForHash = padArray(bigIntToBytes(g), 256);
	const b_for_hash = padArray(bigIntToBytes(B), 256);
	const k_v = bigIntFromBytes(await cryptoMessagePort.invokeCrypto("sha256", bufferConcats(pForHash, gForHash))).multiply(v).mod(p);
	const a = bigIntFromBytes(randomBytes(256));
	const a_for_hash = padArray(bigIntToBytes(g.modPow(a, p)), 256);
	const u = bigIntFromBytes(await cryptoMessagePort.invokeCrypto("sha256", bufferConcats(a_for_hash, b_for_hash)));
	let g_b;
	if (!B.greater(k_v)) g_b = B.add(p);
	else g_b = B;
	g_b = g_b.subtract(k_v).mod(p);
	const ux = u.multiply(x);
	const a_ux = a.add(ux);
	const S = g_b.modPow(a_ux, p);
	const K = await cryptoMessagePort.invokeCrypto("sha256", padArray(bigIntToBytes(S), 256));
	let h1 = await cryptoMessagePort.invokeCrypto("sha256", pForHash);
	const h2 = await cryptoMessagePort.invokeCrypto("sha256", gForHash);
	h1 = bytesXor(h1, h2);
	const buff = bufferConcats(h1, await cryptoMessagePort.invokeCrypto("sha256", algo.salt1), await cryptoMessagePort.invokeCrypto("sha256", algo.salt2), a_for_hash, b_for_hash, K);
	const M1 = await cryptoMessagePort.invokeCrypto("sha256", buff);
	return {
		_: "inputCheckPasswordSRP",
		srp_id: state.srp_id,
		A: new Uint8Array(a_for_hash),
		M1
	};
}
//#endregion
//#region node_modules/.pnpm/@cryptography+aes@0.1.1/node_modules/@cryptography/aes/dist/es/aes.js
var S = /* @__PURE__ */ new Uint8Array(256);
var Si = /* @__PURE__ */ new Uint8Array(256);
var T1 = /* @__PURE__ */ new Uint32Array(256);
var T2 = /* @__PURE__ */ new Uint32Array(256);
var T3 = /* @__PURE__ */ new Uint32Array(256);
var T4 = /* @__PURE__ */ new Uint32Array(256);
var T5 = /* @__PURE__ */ new Uint32Array(256);
var T6 = /* @__PURE__ */ new Uint32Array(256);
var T7 = /* @__PURE__ */ new Uint32Array(256);
var T8 = /* @__PURE__ */ new Uint32Array(256);
function computeTables() {
	var d = /* @__PURE__ */ new Uint8Array(256);
	var t = /* @__PURE__ */ new Uint8Array(256);
	var x2;
	var x4;
	var x8;
	var s;
	var tEnc;
	var tDec;
	var x = 0;
	var xInv = 0;
	for (var i = 0; i < 256; i++) {
		d[i] = i << 1 ^ (i >> 7) * 283;
		t[d[i] ^ i] = i;
	}
	for (; !S[x]; x ^= x2 || 1) {
		s = xInv ^ xInv << 1 ^ xInv << 2 ^ xInv << 3 ^ xInv << 4;
		s = s >> 8 ^ s & 255 ^ 99;
		S[x] = s;
		Si[s] = x;
		x8 = d[x4 = d[x2 = d[x]]];
		tDec = x8 * 16843009 ^ x4 * 65537 ^ x2 * 257 ^ x * 16843008;
		tEnc = d[s] * 257 ^ s * 16843008;
		T1[x] = tEnc = tEnc << 24 ^ tEnc >>> 8;
		T2[x] = tEnc = tEnc << 24 ^ tEnc >>> 8;
		T3[x] = tEnc = tEnc << 24 ^ tEnc >>> 8;
		T4[x] = tEnc = tEnc << 24 ^ tEnc >>> 8;
		T5[s] = tDec = tDec << 24 ^ tDec >>> 8;
		T6[s] = tDec = tDec << 24 ^ tDec >>> 8;
		T7[s] = tDec = tDec << 24 ^ tDec >>> 8;
		T8[s] = tDec = tDec << 24 ^ tDec >>> 8;
		xInv = t[xInv] || 1;
	}
}
/**
* Gets a uint32 from string in big-endian order order
*/
function s2i(str, pos) {
	return str.charCodeAt(pos) << 24 ^ str.charCodeAt(pos + 1) << 16 ^ str.charCodeAt(pos + 2) << 8 ^ str.charCodeAt(pos + 3);
}
/**
* Helper function for transforming string key to Uint32Array
*/
function getWords(key) {
	if (key instanceof Uint32Array) return key;
	if (typeof key === "string") {
		if (key.length % 4 !== 0) for (var i = key.length % 4; i <= 4; i++) key += "\0x00";
		var buf = new Uint32Array(key.length / 4);
		for (var i = 0; i < key.length; i += 4) buf[i / 4] = s2i(key, i);
		return buf;
	}
	if (key instanceof Uint8Array) {
		var buf = new Uint32Array(key.length / 4);
		for (var i = 0; i < key.length; i += 4) buf[i / 4] = key[i] << 24 ^ key[i + 1] << 16 ^ key[i + 2] << 8 ^ key[i + 3];
		return buf;
	}
	throw new Error("Unable to create 32-bit words");
}
function xor(left, right, to) {
	if (to === void 0) to = left;
	for (var i = 0; i < left.length; i++) to[i] = left[i] ^ right[i];
}
computeTables();
/**
* Low-level AES Cipher
*/
var AES = function() {
	function AES(_key) {
		var key = getWords(_key);
		if (key.length !== 4 && key.length !== 6 && key.length !== 8) throw new Error("Invalid key size");
		this.encKey = new Uint32Array(4 * key.length + 28);
		this.decKey = new Uint32Array(4 * key.length + 28);
		this.encKey.set(key);
		var rcon = 1;
		var i = key.length;
		var tmp;
		for (; i < 4 * key.length + 28; i++) {
			tmp = this.encKey[i - 1];
			if (i % key.length === 0 || key.length === 8 && i % key.length === 4) {
				tmp = S[tmp >>> 24] << 24 ^ S[tmp >> 16 & 255] << 16 ^ S[tmp >> 8 & 255] << 8 ^ S[tmp & 255];
				if (i % key.length === 0) {
					tmp = tmp << 8 ^ tmp >>> 24 ^ rcon << 24;
					rcon = rcon << 1 ^ (rcon >> 7) * 283;
				}
			}
			this.encKey[i] = this.encKey[i - key.length] ^ tmp;
		}
		for (var j = 0; i; j++, i--) {
			tmp = this.encKey[j & 3 ? i : i - 4];
			if (i <= 4 || j < 4) this.decKey[j] = tmp;
			else this.decKey[j] = T5[S[tmp >>> 24]] ^ T6[S[tmp >> 16 & 255]] ^ T7[S[tmp >> 8 & 255]] ^ T8[S[tmp & 255]];
		}
	}
	AES.prototype.encrypt = function(_message) {
		var message = getWords(_message);
		var out = /* @__PURE__ */ new Uint32Array(4);
		var a = message[0] ^ this.encKey[0];
		var b = message[1] ^ this.encKey[1];
		var c = message[2] ^ this.encKey[2];
		var d = message[3] ^ this.encKey[3];
		var rounds = this.encKey.length / 4 - 2;
		var k = 4;
		var a2;
		var b2;
		var c2;
		for (var i = 0; i < rounds; i++) {
			a2 = T1[a >>> 24] ^ T2[b >> 16 & 255] ^ T3[c >> 8 & 255] ^ T4[d & 255] ^ this.encKey[k];
			b2 = T1[b >>> 24] ^ T2[c >> 16 & 255] ^ T3[d >> 8 & 255] ^ T4[a & 255] ^ this.encKey[k + 1];
			c2 = T1[c >>> 24] ^ T2[d >> 16 & 255] ^ T3[a >> 8 & 255] ^ T4[b & 255] ^ this.encKey[k + 2];
			d = T1[d >>> 24] ^ T2[a >> 16 & 255] ^ T3[b >> 8 & 255] ^ T4[c & 255] ^ this.encKey[k + 3];
			a = a2;
			b = b2;
			c = c2;
			k += 4;
		}
		for (var i = 0; i < 4; i++) {
			out[i] = S[a >>> 24] << 24 ^ S[b >> 16 & 255] << 16 ^ S[c >> 8 & 255] << 8 ^ S[d & 255] ^ this.encKey[k++];
			a2 = a;
			a = b;
			b = c;
			c = d;
			d = a2;
		}
		return out;
	};
	AES.prototype.decrypt = function(_message) {
		var message = getWords(_message);
		var out = /* @__PURE__ */ new Uint32Array(4);
		var a = message[0] ^ this.decKey[0];
		var b = message[3] ^ this.decKey[1];
		var c = message[2] ^ this.decKey[2];
		var d = message[1] ^ this.decKey[3];
		var rounds = this.decKey.length / 4 - 2;
		var a2;
		var b2;
		var c2;
		var k = 4;
		for (var i = 0; i < rounds; i++) {
			a2 = T5[a >>> 24] ^ T6[b >> 16 & 255] ^ T7[c >> 8 & 255] ^ T8[d & 255] ^ this.decKey[k];
			b2 = T5[b >>> 24] ^ T6[c >> 16 & 255] ^ T7[d >> 8 & 255] ^ T8[a & 255] ^ this.decKey[k + 1];
			c2 = T5[c >>> 24] ^ T6[d >> 16 & 255] ^ T7[a >> 8 & 255] ^ T8[b & 255] ^ this.decKey[k + 2];
			d = T5[d >>> 24] ^ T6[a >> 16 & 255] ^ T7[b >> 8 & 255] ^ T8[c & 255] ^ this.decKey[k + 3];
			a = a2;
			b = b2;
			c = c2;
			k += 4;
		}
		for (var i = 0; i < 4; i++) {
			out[3 & -i] = Si[a >>> 24] << 24 ^ Si[b >> 16 & 255] << 16 ^ Si[c >> 8 & 255] << 8 ^ Si[d & 255] ^ this.decKey[k++];
			a2 = a;
			a = b;
			b = c;
			c = d;
			d = a2;
		}
		return out;
	};
	return AES;
}();
/**
* AES-IGE mode.
*/
var AES_IGE = function() {
	function AES_IGE(key, iv, blockSize) {
		if (blockSize === void 0) blockSize = 16;
		this.key = getWords(key);
		this.iv = getWords(iv);
		this.cipher = new AES(key);
		this.blockSize = blockSize / 4;
	}
	/**
	* Encrypts plain text with AES-IGE mode.
	*/
	AES_IGE.prototype.encrypt = function(message, buf) {
		var text = getWords(message);
		var cipherText = buf || new Uint32Array(text.length);
		var prevX = this.iv.subarray(this.blockSize, this.iv.length);
		var prevY = this.iv.subarray(0, this.blockSize);
		var yXOR = new Uint32Array(this.blockSize);
		for (var i = 0; i < text.length; i += this.blockSize) {
			var x = text.subarray(i, i + this.blockSize);
			xor(x, prevY, yXOR);
			var y = this.cipher.encrypt(yXOR);
			xor(y, prevX);
			prevX = x;
			prevY = y;
			for (var j = i, k = 0; j < text.length && k < 4; j++, k++) cipherText[j] = y[k];
		}
		return cipherText;
	};
	/**
	* Decrypts cipher text with AES-IGE mode.
	*/
	AES_IGE.prototype.decrypt = function(message, buf) {
		var cipherText = getWords(message);
		var text = buf || new Uint32Array(cipherText.length);
		var prevY = this.iv.subarray(this.blockSize, this.iv.length);
		var prevX = this.iv.subarray(0, this.blockSize);
		var yXOR = new Uint32Array(this.blockSize);
		for (var i = 0; i < text.length; i += this.blockSize) {
			var x = cipherText.subarray(i, i + this.blockSize);
			xor(x, prevY, yXOR);
			var y = this.cipher.decrypt(yXOR);
			xor(y, prevX);
			prevX = x;
			prevY = y;
			for (var j = i, k = 0; j < text.length && k < 4; j++, k++) text[j] = y[k];
		}
		return text;
	};
	return AES_IGE;
}();
(function() {
	function AES_IGE(key, counter, blockSize) {
		if (blockSize === void 0) blockSize = 16;
		this.offset = 0;
		this.key = getWords(key);
		this.counter = getWords(counter);
		this.cipher = new AES(key);
		this.blockSize = blockSize / 4;
		if (this.counter.length !== 4) throw new Error("AES-CTR mode counter must be 16 bytes length");
	}
	/**
	* Encrypts plain text with AES-IGE mode.
	*/
	AES_IGE.prototype.encrypt = function(message, buf) {
		var text = getWords(message);
		var cipherText = buf || new Uint32Array(text.length);
		var offset = this.offset;
		for (var i = 0; i < text.length; i += this.blockSize) {
			var x = this.cipher.encrypt(this.counter);
			for (var j = i, k = offset; j < text.length && k < this.blockSize; j++, k++) cipherText[j] = x[k] ^ text[j];
			if (text.length - i >= this.blockSize) this.incrementCounter();
			if (offset) {
				i -= offset;
				offset = 0;
			}
		}
		this.offset = (this.offset + text.length % 4) % 4;
		return cipherText;
	};
	/**
	* Decrypts cipher text with AES-IGE mode.
	*/
	AES_IGE.prototype.decrypt = function(message, buf) {
		return this.encrypt(message, buf);
	};
	AES_IGE.prototype.incrementCounter = function() {
		for (var carry = this.counter.length - 1; carry >= 0; carry--) if (++this.counter[carry] < 4294967295) break;
	};
	return AES_IGE;
})();
//#endregion
//#region src/helpers/bytes/bytesFromWordss.ts
function bytesFromWordss(input) {
	const o = new Uint8Array(input.byteLength);
	for (let i = 0, length = input.length * 4; i < length; ++i) o[i] = input[i >>> 2] >>> 24 - i % 4 * 8 & 255;
	return o;
}
//#endregion
//#region src/helpers/bytes/bytesToWordss.ts
function bytesToWordss(input) {
	const bytes = convertToUint8Array(input);
	const words = [];
	for (let i = 0, len = bytes.length; i < len; ++i) words[i >>> 2] |= bytes[i] << 24 - i % 4 * 8;
	return new Uint32Array(words);
}
//#endregion
//#region src/lib/crypto/utils/aesIGE.ts
function aesSync(bytes, keyBytes, ivBytes, encrypt = true) {
	return bytesFromWordss(new AES_IGE(bytesToWordss(keyBytes), bytesToWordss(ivBytes))[encrypt ? "encrypt" : "decrypt"](bytesToWordss(bytes)));
}
function aesEncryptSync(bytes, keyBytes, ivBytes) {
	return aesSync(addPadding(bytes), keyBytes, ivBytes, true);
}
function aesDecryptSync(bytes, keyBytes, ivBytes) {
	return aesSync(bytes, keyBytes, ivBytes, false);
}
//#endregion
//#region src/helpers/bigInt/bigIntRandom.ts
function bigIntRandom(min, max) {
	return import_BigInteger.default.randBetween(min, max, () => {
		return nextRandomUint(32) / 4294967295;
	});
}
//#endregion
//#region src/lib/crypto/utils/factorize/BrentPollard.ts
const MAX_FACTORIZATION_ITERATIONS = 3e6;
function createIterationBudget() {
	let iterations = 0;
	return () => {
		if (++iterations > MAX_FACTORIZATION_ITERATIONS) throw new Error("FACTORIZATION_BUDGET_EXCEEDED");
	};
}
function BrentPollardFactor(n, spend) {
	const two = import_BigInteger.default[2];
	if (n.remainder(two).isZero()) return two;
	const m = (0, import_BigInteger.default)(1e3);
	let a, x, y, ys, r, q, g;
	do {
		a = bigIntRandom(import_BigInteger.default.one, n.minus(1));
		spend();
	} while (a.isZero() || a.eq(n.minus(two)));
	y = bigIntRandom(import_BigInteger.default.one, n.minus(1));
	r = import_BigInteger.default.one;
	q = import_BigInteger.default.one;
	const bigIntUint64MinusPqPlusOne = (0, import_BigInteger.default)("FFFFFFFFFFFFFFFF", 16).minus(n).plus(1);
	const performY = (y) => {
		y = y.pow(two).mod(n);
		y = y.add(a);
		if (y.lesser(a)) y = y.add(bigIntUint64MinusPqPlusOne);
		y = y.mod(n);
		return y;
	};
	do {
		x = y;
		for (let i = 0; (0, import_BigInteger.default)(i).lesser(r); ++i) {
			y = performY(y);
			spend();
		}
		let k = import_BigInteger.default.zero;
		do {
			ys = y;
			const condition = import_BigInteger.default.min(m, r.minus(k));
			for (let i = 0; (0, import_BigInteger.default)(i).lesser(condition); ++i) {
				y = performY(y);
				q = q.multiply(x.greater(y) ? x.minus(y) : y.minus(x)).mod(n);
				spend();
			}
			g = import_BigInteger.default.gcd(q, n);
			k = k.add(m);
		} while (k.lesser(r) && g.eq(import_BigInteger.default.one));
		r = r.shiftLeft(import_BigInteger.default.one);
	} while (g.eq(import_BigInteger.default.one));
	if (g.eq(n)) do {
		ys = performY(ys);
		g = import_BigInteger.default.gcd(x.minus(ys).abs(), n);
		spend();
	} while (g.eq(import_BigInteger.default.one));
	return g;
}
function primeFactors(pqBytes) {
	const n = bigIntFromBytes(pqBytes);
	const spend = createIterationBudget();
	const factors = [];
	const primes = [];
	let factor = BrentPollardFactor(n, spend);
	factors.push(n.divide(factor));
	factors.push(factor);
	do {
		const m = factors.pop();
		spend();
		if (m.eq(import_BigInteger.default.one)) continue;
		if (m.isPrime(true)) {
			primes.push(m);
			for (let i = 0; i < factors.length; ++i) {
				let k = factors[i];
				if (k.mod(m).isZero()) {
					do {
						k = k.divide(m);
						spend();
					} while (k.mod(m).isZero());
					factors[i] = k;
				}
			}
		} else {
			factor = BrentPollardFactor(m, spend);
			factors.push(m.divide(factor));
			factors.push(factor);
		}
	} while (factors.length);
	return primes;
}
function factorizeBrentPollardPQ(pqBytes) {
	let factors = primeFactors(pqBytes);
	factors.sort((a, b) => a.compare(b));
	if (factors.length > 2) factors = [factors.splice(factors.length - 2, 1)[0], factors.reduce((acc, v) => acc.multiply(v), import_BigInteger.default.one)];
	const p = factors[0], q = factors[factors.length - 1];
	return (p.lesser(q) ? [p, q] : [q, p]).map((b) => bigIntToBytes(b));
}
//#endregion
//#region src/lib/crypto/subtle.ts
const subtle = typeof window !== "undefined" && "crypto" in window ? window.crypto.subtle : self.crypto.subtle;
//#endregion
//#region src/lib/crypto/utils/pbkdf2.ts
async function pbkdf2(buffer, salt, iterations) {
	const importKey = await subtle.importKey("raw", buffer, { name: "PBKDF2" }, false, ["deriveBits"]);
	return subtle.deriveBits({
		name: "PBKDF2",
		salt,
		iterations,
		hash: { name: "SHA-512" }
	}, importKey, 512).then((buffer) => new Uint8Array(buffer));
}
//#endregion
//#region src/lib/crypto/utils/rsa.ts
function rsaEncrypt(bytes, publicKey) {
	return bytesModPow(bytes, bytesFromHex(publicKey.exponent), bytesFromHex(publicKey.modulus));
}
//#endregion
//#region src/lib/crypto/utils/sha1.ts
function sha1(bytes) {
	return subtle.digest("SHA-1", convertToUint8Array(bytes)).then((b) => {
		return new Uint8Array(b);
	});
}
//#endregion
//#region src/lib/crypto/utils/sha256.ts
function sha256(bytes) {
	return subtle.digest("SHA-256", convertToUint8Array(bytes)).then((b) => {
		return new Uint8Array(b);
	});
}
//#endregion
//#region src/lib/crypto/utils/aesCTR.ts
const COUNTER_LENGTH = 16;
var CTR = class {
	constructor(mode, cryptoKey, counter) {
		this.mode = mode;
		this.cryptoKey = cryptoKey;
		this.queue = [];
		this.counter = bigIntFromBytes(counter);
	}
	async update(data) {
		return new Promise((resolve) => {
			this.queue.push({
				data,
				resolve
			});
			this.release();
		});
	}
	async release() {
		if (this.releasing) return;
		this.releasing = true;
		while (this.queue.length) {
			const { data, resolve } = this.queue.shift();
			resolve(await this._update(data));
		}
		this.releasing = false;
	}
	async perform(data) {
		return await subtle[this.mode]({
			name: "AES-CTR",
			counter: addPadding(bigIntToBytes(this.counter), COUNTER_LENGTH, true, true, true),
			length: 128
		}, this.cryptoKey, data);
	}
	async _update(data) {
		let toEncrypt = data;
		let head;
		if (this.leftLength) {
			const leftLength = this.leftLength;
			const leftLength2 = COUNTER_LENGTH - leftLength;
			const left = bufferConcats(new Uint8Array(leftLength), toEncrypt.slice(0, leftLength2));
			const performed = await this.perform(left);
			head = new Uint8Array(performed.slice(leftLength));
			toEncrypt = toEncrypt.slice(leftLength2);
			this.counter = this.counter.add(1);
		}
		const tail = new Uint8Array(await this.perform(toEncrypt));
		const result = head ? bufferConcats(head, tail) : tail;
		let length = toEncrypt.length;
		const leftAfter = length % COUNTER_LENGTH;
		length -= leftAfter;
		const a = length / COUNTER_LENGTH;
		this.counter = this.counter.add(a);
		this.leftLength = leftAfter || void 0;
		return result;
	}
};
//#endregion
//#region src/lib/crypto/aesCtrUtils.ts
const aesCTRs = /* @__PURE__ */ new Map();
let lastCTRId = -1;
async function aesCtrPrepare({ encKey, encIv, decKey, decIv }) {
	const id = ++lastCTRId;
	const promises = [["encrypt", encKey], ["decrypt", decKey]].map(([mode, key]) => {
		return subtle.importKey("raw", key, { name: "AES-CTR" }, false, [mode]);
	});
	const [encCryptoKey, decCryptoKey] = await Promise.all(promises);
	const k = {
		enc: new CTR("encrypt", encCryptoKey, encIv.slice()),
		dec: new CTR("decrypt", decCryptoKey, decIv.slice())
	};
	aesCTRs.set(id, k);
	return id;
}
async function aesCtrProcess({ id, data, operation }) {
	const ctrs = aesCTRs.get(id);
	return await (operation === "encrypt" ? ctrs.enc : ctrs.dec).update(data);
}
function aesCtrDestroy(id) {
	aesCTRs.delete(id);
}
//#endregion
//#region src/lib/crypto/cryptoMethodsRegistry.ts
const cryptoMethodsRegistry = {
	"sha1": sha1,
	"sha256": sha256,
	"pbkdf2": pbkdf2,
	"aes-encrypt": aesEncryptSync,
	"aes-decrypt": aesDecryptSync,
	"rsa-encrypt": rsaEncrypt,
	"factorize": factorizeBrentPollardPQ,
	"mod-pow": bytesModPow,
	"gzipUncompress": gzipUncompress,
	"computeSRP": computeSRP,
	"generate-dh": generateDh,
	"compute-dh-key": computeDhKey,
	"get-emojis-fingerprint": getEmojisFingerprint,
	"aes-ctr-prepare": aesCtrPrepare,
	"aes-ctr-process": aesCtrProcess,
	"aes-ctr-destroy": aesCtrDestroy,
	"aes-local-encrypt": encryptLocalData,
	"aes-local-decrypt": decryptLocalData
};
//#endregion
//#region src/lib/debug/memoryStats.ts
function readThreadMemory(thread, details, events) {
	const memory = performance.memory;
	return {
		thread,
		jsHeap: memory?.usedJSHeapSize,
		jsHeapTotal: memory?.totalJSHeapSize,
		details,
		events
	};
}
//#endregion
//#region src/lib/crypto/crypto.worker.ts
console.log("CryptoWorker start");
cryptoMessagePort.addMultipleEventsListeners({
	invoke: ({ method, args }) => {
		return cryptoMethodsRegistry[method](...args);
	},
	terminate: () => {
		ctx$1.close();
	},
	memoryStats: () => readThreadMemory("crypto"),
	port: (_, __, event) => {
		cryptoMessagePort.attachPort(event.ports[0]);
	}
});
if (IS_WORKER && typeof MessageChannel !== "undefined") listenMessagePort(cryptoMessagePort, (source) => {
	const channel = new MessageChannel();
	cryptoMessagePort.attachPort(channel.port1);
	cryptoMessagePort.invokeVoid("port", void 0, source, [channel.port2]);
});
//#endregion
