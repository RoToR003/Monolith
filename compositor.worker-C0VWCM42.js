//#region src/helpers/canvas/applyColorOnContext.ts
const lottieColorToString = (color) => typeof color === "string" ? color : `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
function applyColorOnContext(context, color, x, y, width, height) {
	context.globalCompositeOperation = "source-atop";
	context.fillStyle = lottieColorToString(color);
	context.fillRect(x, y, width, height);
	context.globalCompositeOperation = "source-over";
}
function paintFrameTinted(context, frame, color) {
	context.drawImage(frame, 0, 0);
	if (color) applyColorOnContext(context, color, 0, 0, context.canvas.width, context.canvas.height);
}
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
function canvasBytes(canvas) {
	return (canvas?.width || 0) * (canvas?.height || 0) * 4;
}
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
const postMessage = (listener, ...args) => {
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
			postMessage(listener, ...args);
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
//#region src/lib/customEmoji/compositorMessagePort.ts
var EmojiCompositorMessagePort = class extends superMessagePort_default {
	constructor() {
		super("EMOJI-COMPOSITOR");
	}
	invokeCompositorVoid(method, payload, transfer) {
		this.invokeVoidAs(method, payload, void 0, transfer);
	}
	invokeCompositor(method, payload, transfer) {
		return this.invokeAs(method, payload, void 0, transfer);
	}
};
const compositorMessagePort = new EmojiCompositorMessagePort();
MOUNT_CLASS_TO && (MOUNT_CLASS_TO.compositorMessagePort = compositorMessagePort);
const CUSTOM_EMOJI_FRAME_INTERVAL = 1e3 / 60;
//#endregion
//#region src/lib/customEmoji/compositor.worker.ts
const renderers = /* @__PURE__ */ new Map();
const latestFrames = /* @__PURE__ */ new Map();
const decodePorts = /* @__PURE__ */ new Map();
const stickerRenderers = /* @__PURE__ */ new Map();
const paintSticker = (sticker) => {
	const { latestFrame, color } = sticker;
	if (!latestFrame) return;
	for (const { canvas, context } of sticker.surfaces) {
		context.clearRect(0, 0, canvas.width, canvas.height);
		paintFrameTinted(context, latestFrame, color);
	}
};
let flushTimeout;
const withRenderer = (rendererId, callback) => {
	const renderer = renderers.get(rendererId);
	if (renderer) callback(renderer);
};
const forEachRendererReferencing = (playerReqId, callback) => {
	for (const renderer of renderers.values()) for (const group of renderer.groups.values()) if (group.playerReqId === playerReqId) {
		callback(renderer);
		break;
	}
};
const isPlayerReferenced = (playerReqId) => {
	let referenced = false;
	forEachRendererReferencing(playerReqId, () => {
		referenced = true;
	});
	return referenced;
};
const releasePlayerFrameIfOrphan = (playerReqId) => {
	if (isPlayerReferenced(playerReqId)) return;
	latestFrames.get(playerReqId)?.close?.();
	latestFrames.delete(playerReqId);
};
const paintRenderer = (rendererId, renderer) => {
	const { canvas, context, dpr } = renderer;
	context.clearRect(0, 0, canvas.width, canvas.height);
	let fading = false;
	const now = performance.now();
	for (const [groupId, group] of renderer.groups) {
		if (!group.offsets.length) continue;
		const frame = latestFrames.get(group.playerReqId);
		if (!frame) continue;
		let alpha = 1;
		if (!group.skipFade && renderer.fadeEnabled) {
			if (!group.fadeStartTime) group.fadeStartTime = now;
			alpha = Math.min(1, (now - group.fadeStartTime) / 250);
			if (alpha < 1) fading = true;
		}
		if (alpha < 1) context.globalAlpha = alpha;
		for (let i = 0; i < group.offsets.length; i += 3) {
			const top = Math.round(group.offsets[i] * dpr);
			const left = Math.round(group.offsets[i + 1] * dpr);
			let frameWidth = frame.width;
			let frameHeight = frame.height;
			const elementWidth = Math.round(group.offsets[i + 2] * dpr);
			if (elementWidth !== frameWidth) {
				frameWidth = elementWidth;
				frameHeight = elementWidth;
			}
			if (left < 0 || left > canvas.width - frameWidth) continue;
			context.drawImage(frame, left, top, frameWidth, frameHeight);
			if (group.textColored && renderer.color) applyColorOnContext(context, renderer.color, left, top, frameWidth, frameHeight);
		}
		if (alpha < 1) context.globalAlpha = 1;
		if (!group.painted && alpha >= 1) {
			group.painted = true;
			compositorMessagePort.invokeVoid("groupPainted", {
				rendererId,
				groupId
			});
		}
	}
	return fading;
};
const flush = () => {
	flushTimeout = void 0;
	let anyFading = false;
	for (const [rendererId, renderer] of renderers) {
		if (!renderer.dirty || renderer.suspended) continue;
		const fading = paintRenderer(rendererId, renderer);
		renderer.dirty = fading;
		anyFading || (anyFading = fading);
	}
	if (anyFading) scheduleFlush();
};
const scheduleFlush = () => {
	if (flushTimeout !== void 0) return;
	flushTimeout = setTimeout(flush, CUSTOM_EMOJI_FRAME_INTERVAL);
};
const onDecodedFrame = ({ data }) => {
	const sticker = stickerRenderers.get(data.reqId);
	if (sticker) {
		sticker.latestFrame?.close?.();
		sticker.latestFrame = data.frame;
		paintSticker(sticker);
		return;
	}
	latestFrames.get(data.reqId)?.close?.();
	let dirty = false;
	forEachRendererReferencing(data.reqId, (renderer) => {
		renderer.dirty = dirty = true;
	});
	if (!dirty) {
		data.frame.close?.();
		latestFrames.delete(data.reqId);
		return;
	}
	latestFrames.set(data.reqId, data.frame);
	scheduleFlush();
};
compositorMessagePort.addMultipleEventsListeners({
	attachRenderer: ({ rendererId, canvas, dpr, fadeEnabled }) => {
		renderers.set(rendererId, {
			canvas,
			context: canvas.getContext("2d"),
			dpr,
			color: void 0,
			fadeEnabled,
			groups: /* @__PURE__ */ new Map(),
			dirty: false,
			suspended: false
		});
	},
	detachRenderer: ({ rendererId }) => withRenderer(rendererId, (renderer) => {
		renderers.delete(rendererId);
		for (const group of renderer.groups.values()) releasePlayerFrameIfOrphan(group.playerReqId);
	}),
	resizeRenderer: ({ rendererId, width, height }) => withRenderer(rendererId, (renderer) => {
		const { canvas, context } = renderer;
		const { width: oldWidth, height: oldHeight } = canvas;
		let carried;
		if (oldWidth && oldHeight && width && height) {
			carried = new OffscreenCanvas(oldWidth, oldHeight);
			carried.getContext("2d").drawImage(canvas, 0, 0);
		}
		canvas.width = width;
		canvas.height = height;
		if (carried) context.drawImage(carried, 0, 0);
		renderer.dirty = true;
		scheduleFlush();
	}),
	configRenderer: (payload) => withRenderer(payload.rendererId, (renderer) => {
		if ("color" in payload) renderer.color = payload.color;
		if ("fadeEnabled" in payload) renderer.fadeEnabled = payload.fadeEnabled;
		if ("dpr" in payload) renderer.dpr = payload.dpr;
		renderer.dirty = true;
		scheduleFlush();
	}),
	attachGroup: ({ rendererId, groupId, playerReqId, textColored, skipFade }) => withRenderer(rendererId, (renderer) => {
		const existing = renderer.groups.get(groupId);
		if (existing) {
			const previousPlayerReqId = existing.playerReqId;
			existing.playerReqId = playerReqId;
			existing.textColored = textColored;
			existing.skipFade = skipFade;
			existing.painted = false;
			if (previousPlayerReqId !== playerReqId) releasePlayerFrameIfOrphan(previousPlayerReqId);
			return;
		}
		renderer.groups.set(groupId, {
			playerReqId,
			textColored,
			skipFade,
			offsets: [],
			fadeStartTime: 0,
			painted: false
		});
	}),
	detachPlayer: ({ playerReqId }) => {
		for (const renderer of renderers.values()) for (const [groupId, group] of renderer.groups) if (group.playerReqId === playerReqId) {
			renderer.groups.delete(groupId);
			renderer.dirty = true;
		}
		releasePlayerFrameIfOrphan(playerReqId);
		scheduleFlush();
	},
	resetFade: ({ rendererId, groupId }) => {
		const group = renderers.get(rendererId)?.groups.get(groupId);
		if (!group) return;
		group.fadeStartTime = 0;
		group.painted = false;
	},
	setOffsets: ({ batch }) => {
		for (const { rendererId, groups } of batch) {
			const renderer = renderers.get(rendererId);
			if (!renderer) continue;
			for (const { groupId, offsets } of groups) {
				const group = renderer.groups.get(groupId);
				if (group) group.offsets = offsets;
			}
			renderer.dirty = true;
		}
		scheduleFlush();
	},
	clearRenderer: ({ rendererId }) => withRenderer(rendererId, (renderer) => {
		renderer.context.clearRect(0, 0, renderer.canvas.width, renderer.canvas.height);
		renderer.dirty = false;
	}),
	suspendRenderer: ({ rendererId, suspended }) => withRenderer(rendererId, (renderer) => {
		renderer.suspended = suspended;
		if (!suspended && renderer.dirty) scheduleFlush();
	}),
	attachSticker: ({ reqId, canvases, color }) => {
		stickerRenderers.get(reqId)?.latestFrame?.close?.();
		const sticker = {
			surfaces: canvases.map((canvas) => ({
				canvas,
				context: canvas.getContext("2d")
			})),
			color
		};
		stickerRenderers.set(reqId, sticker);
		paintSticker(sticker);
	},
	detachSticker: ({ reqId }) => {
		const sticker = stickerRenderers.get(reqId);
		if (!sticker) return;
		sticker.latestFrame?.close?.();
		stickerRenderers.delete(reqId);
	},
	resizeSticker: ({ reqId, width, height }) => {
		const sticker = stickerRenderers.get(reqId);
		if (!sticker) return;
		for (const { canvas } of sticker.surfaces) {
			canvas.width = width;
			canvas.height = height;
		}
		paintSticker(sticker);
	},
	configSticker: ({ reqId, color }) => {
		const sticker = stickerRenderers.get(reqId);
		if (!sticker) return;
		sticker.color = color;
		paintSticker(sticker);
	},
	presentSticker: ({ reqId }) => {
		const sticker = stickerRenderers.get(reqId);
		if (sticker) paintSticker(sticker);
	},
	memoryStats: () => {
		let rendererBytes = 0, groups = 0, stickerBytes = 0, surfaces = 0, frameBytes = 0;
		for (const renderer of renderers.values()) {
			rendererBytes += canvasBytes(renderer.canvas);
			groups += renderer.groups.size;
		}
		for (const sticker of stickerRenderers.values()) {
			surfaces += sticker.surfaces.length;
			for (const { canvas } of sticker.surfaces) stickerBytes += canvasBytes(canvas);
		}
		for (const frame of latestFrames.values()) frameBytes += canvasBytes(frame);
		return readThreadMemory("compositor", {
			renderers: renderers.size,
			rendererCanvasGpuBytes: rendererBytes,
			groups,
			stickerRenderers: stickerRenderers.size,
			stickerSurfaces: surfaces,
			stickerCanvasGpuBytes: stickerBytes,
			latestFrames: latestFrames.size,
			latestFrameGpuBytes: frameBytes,
			decodePorts: decodePorts.size
		});
	},
	decodePort: ({ workerId }, _, event) => {
		const port = event.ports[0];
		decodePorts.set(workerId, port);
		port.onmessage = onDecodedFrame;
		port.start?.();
	}
});
listenMessagePort(compositorMessagePort);
//#endregion
