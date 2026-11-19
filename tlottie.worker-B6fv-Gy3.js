//#region src/environment/ctx.ts
const ctx$1 = typeof window !== "undefined" ? window : self;
//#endregion
//#region src/environment/imageBitmapSupport.ts
const IS_IMAGE_BITMAP_SUPPORTED = typeof ImageBitmap !== "undefined";
//#endregion
//#region src/helpers/blob/readBlobAs.ts
function readBlobAs(blob, method) {
	return new Promise((resolve) => {
		const reader = new FileReader();
		reader.addEventListener("loadend", (e) => {
			resolve(e.target.result);
		});
		reader[method](blob);
	});
}
//#endregion
//#region src/helpers/blob/readBlobAsText.ts
function readBlobAsText(blob) {
	return readBlobAs(blob, "readAsText");
}
//#endregion
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
//#region src/helpers/object/safeAssign.ts
function safeAssign(object, fromObject) {
	if (fromObject) {
		for (const i in fromObject) if (fromObject[i] !== void 0) object[i] = fromObject[i];
	}
	return object;
}
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
const lottieMessagePort = new LottieMessagePort();
MOUNT_CLASS_TO && (MOUNT_CLASS_TO.lottieMessagePort = lottieMessagePort);
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
function createPeakRecorder(name, { min, step = 1.25, keep = 16 }) {
	const events = [];
	let next = min;
	return {
		events,
		observe(value, details) {
			if (value < next) return;
			events.push({
				t: Date.now(),
				name,
				value,
				details: details?.()
			});
			if (events.length > keep) events.shift();
			next = value * step;
		},
		reset() {
			next = min;
		}
	};
}
function canvasBytes(canvas) {
	return (canvas?.width || 0) * (canvas?.height || 0) * 4;
}
//#endregion
//#region src/helpers/forgetFailedRequest.ts
/**
* A request kept for whoever asks next - while it is on its way, and once answered - but not once it has failed:
* then it is forgotten, if it is still the one kept, and the next ask goes to the server again instead of getting
* that failure for the rest of the session (one dropped connection or flood wait would leave a panel empty until a
* reload). The failure still reaches whoever waits for it.
*
*   return this.x ??= forgetFailedRequest(this.apiManager.invokeApi(...), () => this.x, () => this.x = undefined);
*/
function forgetFailedRequest(promise, kept, forget) {
	promise.catch(() => {
		if (kept() === promise) forget();
	});
	return promise;
}
//#endregion
//#region src/lib/lottie/tlottieWasm.ts
const getAuthoredFrameCount = (json, frameCount) => {
	if (frameCount !== 1) return frameCount;
	try {
		const data = JSON.parse(json);
		if (typeof data?.ip !== "number" || typeof data?.op !== "number") return frameCount;
		const authoredFrameCount = Math.floor(Math.fround(data.op) - Math.fround(data.ip));
		if (Number.isNaN(authoredFrameCount)) return frameCount;
		return Math.min(4294967295, Math.max(1, authoredFrameCount));
	} catch {
		return frameCount;
	}
};
const instantiate = async (wasmUrl) => {
	const response = await fetch(wasmUrl);
	if (!response.ok) throw new Error(`Failed to load tlottie WebAssembly: ${response.status}`);
	if (typeof WebAssembly.instantiateStreaming === "function") try {
		return await WebAssembly.instantiateStreaming(response.clone(), {});
	} catch (err) {
		if (err instanceof WebAssembly.CompileError) throw err;
	}
	return WebAssembly.instantiate(await response.arrayBuffer(), {});
};
const AWAKE_BUDGET = 25165824;
const PLAYING_WINDOW = 2e3;
const IDLE_SLEEP = 12e4;
const SWEEP_INTERVAL = 15e3;
const BUDGET_DELAY = 1e3;
const RECYCLE_DELAY = 5e3;
const RECYCLE_MIN_HEAP = 33554432;
const RECYCLE_MIN_HEAP_ASLEEP = 8388608;
const RECYCLE_RATIO = 4;
const RECYCLE_MAX_AWAKE_SOURCE = 262144;
const RECYCLE_MIN_INTERVAL = 6e4;
const estimateBytes = (animation) => {
	return animation.pointer ? 4 * animation.sourceBytes + 3 * animation.renderBytes : 0;
};
const newAnimationPointer = (exports, bytes, fitzModifier) => {
	const pointer = exports.tlottie_alloc(bytes.length);
	if (!pointer) throw new Error("tlottie input allocation failed");
	try {
		new Uint8Array(exports.memory.buffer, pointer, bytes.length).set(bytes);
		return exports.tlottie_new_with_options(pointer, bytes.length, fitzModifier, 0, 0);
	} finally {
		exports.tlottie_free(pointer, bytes.length);
	}
};
var TLottieWasm = class TLottieWasm {
	constructor(exports, module) {
		this.module = module;
		this.encoder = new TextEncoder();
		this.staticAnimations = /* @__PURE__ */ new Set();
		this.animations = /* @__PURE__ */ new Map();
		this.lastHandle = 0;
		this.awake = 0;
		this.awakeBytes = 0;
		this.maintenanceAt = Infinity;
		this.recycledAt = -Infinity;
		this.peaks = createPeakRecorder("wasmHeap", { min: 16777216 });
		this.wakes = 0;
		this.recycles = 0;
		this.maintain = () => {
			this.maintenanceAt = Infinity;
			this.maintenanceTimeout = void 0;
			const now = performance.now();
			const idle = [];
			for (const animation of this.animations.values()) {
				if (!animation.pointer) continue;
				const idleFor = now - animation.renderedAt;
				if (idleFor >= IDLE_SLEEP) this.sleep(animation);
				else if (idleFor >= PLAYING_WINDOW) idle.push(animation);
			}
			if (this.awakeBytes > AWAKE_BUDGET) {
				idle.sort((a, b) => a.renderedAt - b.renderedAt);
				for (const animation of idle) {
					if (this.awakeBytes <= AWAKE_BUDGET) break;
					this.sleep(animation);
				}
			}
			if (this.isRecycleWorthIt()) {
				const wait = this.recycledAt + RECYCLE_MIN_INTERVAL - now;
				if (wait > 0) this.requestMaintenance(wait);
				else this.recycle();
			}
			if (this.awakeBytes > AWAKE_BUDGET) this.requestMaintenance(PLAYING_WINDOW);
			else if (this.awake) this.requestMaintenance(SWEEP_INTERVAL);
		};
		this.exports = exports;
	}
	get heapBytes() {
		return this.exports.memory.buffer.byteLength;
	}
	get stats() {
		return {
			heapBytes: this.heapBytes,
			animations: this.animations.size,
			awake: this.awake,
			wakes: this.wakes,
			recycles: this.recycles
		};
	}
	static async create(wasmUrl) {
		const { instance, module } = await instantiate(wasmUrl);
		return new TLottieWasm(instance.exports, module);
	}
	createAnimation(json, fitzModifier = 0, source) {
		if (!Number.isInteger(fitzModifier) || fitzModifier < 0 || fitzModifier > 5) throw new RangeError(`Invalid tlottie Fitz modifier: ${fitzModifier}`);
		const pointer = this.newPointer(json, fitzModifier);
		const handle = ++this.lastHandle;
		const keptSource = source && typeof FileReaderSync !== "undefined" ? source : json;
		const animation = {
			pointer,
			source: keptSource,
			fitzModifier,
			sourceBytes: typeof keptSource === "string" ? keptSource.length : keptSource.size,
			renderBytes: 0,
			renderedAt: performance.now()
		};
		this.animations.set(handle, animation);
		this.onWoken(animation);
		const rendererFrameCount = this.exports.tlottie_frame_count(pointer);
		const frameCount = getAuthoredFrameCount(json, rendererFrameCount);
		if (rendererFrameCount === 1 && frameCount > 1) this.staticAnimations.add(handle);
		return {
			handle,
			width: this.exports.tlottie_width(pointer),
			height: this.exports.tlottie_height(pointer),
			frameRate: this.exports.tlottie_frame_rate(pointer),
			frameCount
		};
	}
	destroyAnimation(handle) {
		const animation = this.animations.get(handle);
		if (!animation) return;
		this.sleep(animation);
		this.animations.delete(handle);
		this.staticAnimations.delete(handle);
		this.requestMaintenance(RECYCLE_DELAY);
	}
	render(handle, frame, width, height) {
		const animation = this.animations.get(handle);
		if (!animation) throw new Error("tlottie animation is destroyed");
		if (!animation.pointer) {
			const { source } = animation;
			const json = typeof source === "string" ? source : new FileReaderSync().readAsText(source);
			animation.pointer = this.newPointer(json, animation.fitzModifier);
			++this.wakes;
			this.onWoken(animation);
		}
		animation.renderedAt = performance.now();
		const renderBytes = width * height * 4;
		if (animation.renderBytes !== renderBytes) {
			this.awakeBytes -= estimateBytes(animation);
			animation.renderBytes = renderBytes;
			this.awakeBytes += estimateBytes(animation);
			this.checkBudget();
		}
		const rendererFrame = this.staticAnimations.has(handle) ? 0 : frame;
		const pointer = this.exports.tlottie_render(animation.pointer, rendererFrame, width, height, 1);
		if (!pointer) throw new Error("tlottie frame render failed");
		this.noteHeap(animation);
		return new Uint8Array(this.exports.memory.buffer, pointer, width * height * 4);
	}
	recycle() {
		let exports;
		try {
			exports = new WebAssembly.Instance(this.module, {}).exports;
		} catch (err) {
			console.error("tlottie: no fresh instance, keeping the current heap:", err);
			return false;
		}
		this.exports = exports;
		for (const animation of this.animations.values()) animation.pointer = 0;
		this.awake = this.awakeBytes = 0;
		this.recycledAt = performance.now();
		this.peaks.reset();
		++this.recycles;
		return true;
	}
	newPointer(json, fitzModifier) {
		const pointer = newAnimationPointer(this.exports, this.encoder.encode(json), fitzModifier);
		if (!pointer) throw new Error("tlottie rejected the animation");
		return pointer;
	}
	onWoken(animation) {
		++this.awake;
		this.awakeBytes += estimateBytes(animation);
		this.noteHeap(animation);
		this.checkBudget();
		this.requestMaintenance(SWEEP_INTERVAL);
	}
	noteHeap(animation) {
		this.peaks.observe(this.heapBytes, () => ({
			animations: this.animations.size,
			awake: this.awake,
			awakeEstimateBytes: this.awakeBytes,
			frameBytes: animation.renderBytes,
			sourceBytes: animation.sourceBytes
		}));
	}
	sleep(animation) {
		if (!animation.pointer) return;
		this.awakeBytes -= estimateBytes(animation);
		--this.awake;
		this.exports.tlottie_drop(animation.pointer);
		animation.pointer = 0;
	}
	checkBudget() {
		if (this.awakeBytes > AWAKE_BUDGET) this.requestMaintenance(BUDGET_DELAY);
	}
	requestMaintenance(delay) {
		const at = performance.now() + delay;
		if (at >= this.maintenanceAt) return;
		clearTimeout(this.maintenanceTimeout);
		this.maintenanceAt = at;
		this.maintenanceTimeout = setTimeout(this.maintain, delay);
	}
	isRecycleWorthIt() {
		const heapBytes = this.heapBytes;
		if (heapBytes < (this.awake ? RECYCLE_MIN_HEAP : RECYCLE_MIN_HEAP_ASLEEP) || heapBytes < RECYCLE_RATIO * this.awakeBytes) return false;
		let awakeSourceBytes = 0;
		for (const animation of this.animations.values()) if (animation.pointer) awakeSourceBytes += animation.sourceBytes;
		return awakeSourceBytes <= RECYCLE_MAX_AWAKE_SOURCE;
	}
};
const tlottiePromises = /* @__PURE__ */ new Map();
const loadedWasms = /* @__PURE__ */ new Set();
function getTLottieMemoryStats() {
	const total = {
		heapBytes: 0,
		animations: 0,
		awake: 0,
		wakes: 0,
		recycles: 0
	};
	const events = [];
	for (const wasm of loadedWasms) {
		const stats = wasm.stats;
		for (const key in total) total[key] += stats[key];
		events.push(...wasm.peaks.events);
	}
	return {
		...total,
		events
	};
}
function loadTLottieWasm(wasmUrl) {
	let promise = tlottiePromises.get(wasmUrl);
	if (!promise) {
		promise = forgetFailedRequest(TLottieWasm.create(wasmUrl), () => tlottiePromises.get(wasmUrl), () => tlottiePromises.delete(wasmUrl));
		tlottiePromises.set(wasmUrl, promise);
		promise.then((wasm) => loadedWasms.add(wasm), () => {});
	}
	return promise;
}
//#endregion
//#region src/lib/lottie/tlottie.worker.ts
const framesCacheByName = /* @__PURE__ */ new Map();
const compositorPorts = /* @__PURE__ */ new Map();
const suspendedPorts = /* @__PURE__ */ new Set();
var TLottieItem = class {
	constructor(reqId, width, height, wasmUrl, raw) {
		this.reqId = reqId;
		this.width = width;
		this.height = height;
		this.wasmUrl = wasmUrl;
		this.raw = raw;
		this.freeRunTick = async () => {
			const freeRun = this.freeRun;
			if (!freeRun || this.dead) return;
			freeRun.timeout = void 0;
			const { curFrame, skipDelta, direction, minFrame, maxFrame, loop } = freeRun;
			const forwards = direction === 1;
			const frame = forwards ? curFrame + skipDelta > maxFrame ? loop ? minFrame : maxFrame : curFrame + skipDelta : curFrame - skipDelta < minFrame ? loop ? maxFrame : minFrame : curFrame - skipDelta;
			freeRun.curFrame = frame;
			const ended = !loop && curFrame === frame && (forwards ? frame + skipDelta > maxFrame : frame - skipDelta < minFrame);
			try {
				await this.renderOffscreen(frame);
				if (this.dead || this.freeRun !== freeRun || this.freeRunSuspended) return;
				this.presentFrame();
			} catch (err) {
				this.stopFreeRun("error");
				if (!this.dead) lottieMessagePort.invokeVoid("freeRunStopped", {
					reqId: this.reqId,
					curFrame: freeRun.curFrame,
					error: String(err?.message || err)
				}, this.port);
				return;
			}
			if (ended) {
				this.stopFreeRun("ended");
				if (!this.dead) lottieMessagePort.invokeVoid("freeRunEnded", {
					reqId: this.reqId,
					curFrame: frame
				}, this.port);
				return;
			}
			this.armFreeRun();
		};
	}
	initOffscreen(offscreen) {
		this.offscreen = true;
		this.canvases = offscreen.canvases;
		this.cacheName = offscreen.cacheName && `${this.wasmUrl}|${offscreen.cacheName}-${this.width}x${this.height}`;
		this.cachingDelta = offscreen.cachingDelta;
		this.color = offscreen.color;
		this.compositorDelivery = offscreen.compositorDelivery;
		this.contexts = offscreen.canvases.map((canvas) => canvas.getContext("2d"));
		if (this.cacheName) {
			let entry = framesCacheByName.get(this.cacheName);
			if (!entry) framesCacheByName.set(this.cacheName, entry = {
				frames: /* @__PURE__ */ new Map(),
				refs: /* @__PURE__ */ new Set()
			});
			entry.refs.add(this.reqId);
			this.cacheEntry = entry;
		}
	}
	init(json, tlottie, fitzModifier, source) {
		if (this.dead) throw makeError("ITEM_DESTROYED");
		this.tlottie = tlottie;
		try {
			const animation = this.tlottie.createAnimation(json, fitzModifier, source);
			this.handle = animation.handle;
			this.frameCount = animation.frameCount;
			this.fps = Math.max(1, Math.min(60, animation.frameRate));
			if (!this.raw && IS_IMAGE_BITMAP_SUPPORTED) this.imageData = new ImageData(this.width, this.height);
			return {
				frameCount: this.frameCount,
				fps: this.fps
			};
		} catch (e) {
			console.error("init TLottieItem error:", e);
			throw e;
		}
	}
	assertRenderable(frameNo) {
		if (this.dead || this.handle === void 0) throw makeError("ITEM_DESTROYED");
		if (this.frameCount < frameNo || frameNo < 0) throw makeError("FRAME_OUT_OF_RANGE");
	}
	renderToHeap(frameNo) {
		return this.tlottie.render(this.handle, frameNo, this.width, this.height);
	}
	heapToBitmap(data) {
		this.imageData.data.set(data);
		return createImageBitmap(this.imageData).then((bitmap) => {
			if (this.dead) throw makeError("ITEM_DESTROYED");
			return bitmap;
		});
	}
	render(frameNo, clamped) {
		this.assertRenderable(frameNo);
		try {
			const data = this.renderToHeap(frameNo);
			if (this.imageData) return this.heapToBitmap(data).then((imageBitmap) => {
				return new superMessagePort_default.TransferableResult({
					frameNo,
					frame: imageBitmap
				}, [imageBitmap]);
			});
			else {
				if (!clamped) clamped = new Uint8ClampedArray(data);
				else clamped.set(data);
				return new superMessagePort_default.TransferableResult({
					frameNo,
					frame: clamped
				}, [clamped.buffer]);
			}
		} catch (e) {
			console.error("Render error:", e);
			this.dead = true;
			throw e;
		}
	}
	renderOffscreen(frameNo, withDelivery = true) {
		this.assertRenderable(frameNo);
		const entry = this.cacheEntry;
		const cachedBitmap = entry?.frames.get(frameNo);
		if (cachedBitmap) {
			this.stage(cachedBitmap, frameNo, true);
			return withDelivery && this.compositorDelivery ? this.deliver(frameNo) : { frameNo };
		}
		try {
			const data = this.renderToHeap(frameNo);
			return this.heapToBitmap(data).then((bitmap) => {
				let inCache = false;
				if (entry && this.cachingDelta && (frameNo % this.cachingDelta || !frameNo)) {
					entry.frames.set(frameNo, bitmap);
					inCache = true;
				}
				this.stage(bitmap, frameNo, inCache);
				return withDelivery && this.compositorDelivery ? this.deliver(frameNo) : { frameNo };
			});
		} catch (e) {
			console.error("Render error:", e);
			this.dead = true;
			throw e;
		}
	}
	async deliver(frameNo) {
		const staged = this.stagedFrame;
		const port = staged && compositorPorts.get(this.port);
		if (!port) return { frameNo };
		let frame;
		if (!this.stagedFrameInCache && this.stagedFrame === staged) {
			this.stagedFrame = void 0;
			frame = staged;
		} else frame = await createImageBitmap(staged);
		port.postMessage({
			reqId: this.reqId,
			frame
		}, [frame]);
		return { frameNo };
	}
	stage(bitmap, frameNo, inCache) {
		const previous = this.stagedFrame;
		if (previous && !this.stagedFrameInCache && previous !== bitmap) previous.close?.();
		this.stagedFrame = bitmap;
		this.stagedFrameNo = frameNo;
		this.stagedFrameInCache = inCache;
	}
	paintStaged(context) {
		paintFrameTinted(context, this.stagedFrame, this.color);
	}
	presentFrame() {
		if (!this.stagedFrame) return;
		for (const context of this.contexts) {
			context.clearRect(0, 0, context.canvas.width, context.canvas.height);
			this.paintStaged(context);
		}
	}
	resizeCanvases(width, height) {
		this.canvases.forEach((canvas) => {
			canvas.width = width;
			canvas.height = height;
		});
	}
	setColor(color, reTint) {
		this.color = color;
		if (reTint && color) this.contexts.forEach((context) => {
			applyColorOnContext(context, color, 0, 0, context.canvas.width, context.canvas.height);
		});
	}
	async exportFrame(frameNo) {
		frameNo ?? (frameNo = this.stagedFrameNo ?? 0);
		if (this.stagedFrameNo !== frameNo || !this.stagedFrame) await this.renderOffscreen(frameNo, false);
		const canvas = new OffscreenCanvas(this.width, this.height);
		const context = canvas.getContext("2d");
		this.paintStaged(context);
		const frame = canvas.transferToImageBitmap();
		return new superMessagePort_default.TransferableResult({
			frameNo,
			frame
		}, [frame]);
	}
	clearFramesCache() {
		if (this.cachingDelta === Infinity) return;
		const entry = this.cacheEntry;
		if (!entry || entry.refs.size > 1) return;
		for (const bitmap of entry.frames.values()) {
			if (bitmap === this.stagedFrame) {
				this.stagedFrameInCache = false;
				continue;
			}
			bitmap.close?.();
		}
		entry.frames.clear();
	}
	playFreeRun(params) {
		this.stopFreeRun("play");
		this.freeRun = {
			...params,
			timeout: void 0,
			frThen: Date.now()
		};
		if (suspendedPorts.has(this.port)) {
			this.freeRunSuspended = true;
			return;
		}
		this.armFreeRun();
	}
	pauseFreeRun() {
		const curFrame = this.freeRun ? this.freeRun.curFrame : this.stagedFrameNo;
		this.stopFreeRun("pause");
		return { curFrame };
	}
	updateFreeRun(params) {
		const freeRun = this.freeRun;
		if (!freeRun) return;
		safeAssign(freeRun, params);
	}
	suspendFreeRun() {
		const freeRun = this.freeRun;
		if (!freeRun) return;
		if (freeRun.timeout !== void 0) {
			clearTimeout(freeRun.timeout);
			freeRun.timeout = void 0;
		}
		this.freeRunSuspended = true;
	}
	resumeFreeRun() {
		const freeRun = this.freeRun;
		if (!freeRun || !this.freeRunSuspended) return;
		this.freeRunSuspended = false;
		freeRun.frThen = Date.now();
		this.armFreeRun();
	}
	stopFreeRun(reason = "?") {
		const freeRun = this.freeRun;
		if (!freeRun) return;
		if (freeRun.timeout !== void 0) clearTimeout(freeRun.timeout);
		this.freeRun = void 0;
		this.freeRunSuspended = false;
	}
	armFreeRun() {
		const freeRun = this.freeRun;
		if (!freeRun || freeRun.timeout !== void 0) return;
		const now = Date.now();
		freeRun.frThen = Math.max(now, freeRun.frThen + freeRun.frInterval);
		freeRun.timeout = setTimeout(this.freeRunTick, freeRun.frThen - now);
	}
	destroy() {
		this.dead = true;
		this.stopFreeRun();
		if (this.handle !== void 0) this.tlottie.destroyAnimation(this.handle);
		if (this.offscreen) {
			const entry = this.cacheEntry;
			if (entry) {
				entry.refs.delete(this.reqId);
				if (!entry.refs.size) {
					for (const bitmap of entry.frames.values()) bitmap.close?.();
					entry.frames.clear();
					framesCacheByName.delete(this.cacheName);
				}
				this.cacheEntry = void 0;
			}
			if (this.stagedFrame && !this.stagedFrameInCache) this.stagedFrame.close?.();
			this.stagedFrame = void 0;
			this.canvases = this.contexts = void 0;
		}
	}
};
const items = {};
const destroyItem = (reqId) => {
	const item = items[reqId];
	if (!item) return;
	item.destroy();
	delete items[reqId];
};
const withItem = (reqId, callback) => {
	const item = items[reqId];
	if (item) return callback(item);
};
const forEachItemOfSource = (source, callback) => {
	for (const reqId in items) {
		const item = items[reqId];
		if (item.port === source) callback(item, reqId);
	}
};
lottieMessagePort.addMultipleEventsListeners({
	terminate: () => {
		ctx$1.close();
	},
	port: (_, __, event) => {
		lottieMessagePort.attachPort(event.ports[0]);
	},
	loadWasm: async ({ wasmUrl }) => {
		await loadTLottieWasm(wasmUrl);
	},
	loadFromData: async ({ reqId, blob, wasmUrl, width, height, toneIndex, raw, offscreen }, source) => {
		const item = items[reqId] = new TLottieItem(reqId, width, height, wasmUrl, raw);
		item.port = source;
		try {
			if (offscreen) item.initOffscreen(offscreen);
			const json = await readBlobAsText(blob);
			const tlottie = await loadTLottieWasm(wasmUrl);
			const fitzModifier = typeof toneIndex === "number" && Number.isInteger(toneIndex) && toneIndex >= 1 && toneIndex <= 5 ? toneIndex : 0;
			return item.init(json, tlottie, fitzModifier, blob);
		} catch (err) {
			destroyItem(reqId);
			console.error("Unable to load lottie animation:", err);
			throw err;
		}
	},
	destroy: ({ reqId }) => {
		destroyItem(reqId);
	},
	renderFrame: ({ reqId, frameNo, clamped }) => {
		const item = items[reqId];
		return item.offscreen ? item.renderOffscreen(frameNo) : item.render(frameNo, clamped);
	},
	presentFrame: async ({ reqId, frameNo }) => withItem(reqId, async (item) => {
		item.presentFrame();
		return { frameNo };
	}),
	resizeCanvases: ({ reqId, width, height }) => withItem(reqId, (item) => item.resizeCanvases(width, height)),
	setColor: ({ reqId, color, reTint }) => withItem(reqId, (item) => item.setColor(color, reTint)),
	exportFrame: ({ reqId, frameNo }) => withItem(reqId, (item) => item.exportFrame(frameNo)),
	clearFramesCache: ({ reqId }) => withItem(reqId, (item) => item.clearFramesCache()),
	compositorPort: (_, source, event) => {
		compositorPorts.set(source, event.ports[0]);
	},
	playFreeRun: ({ reqId, curFrame, frInterval, skipDelta, direction, minFrame, maxFrame, loop }) => withItem(reqId, (item) => {
		item.playFreeRun({
			curFrame,
			frInterval,
			skipDelta,
			direction,
			minFrame,
			maxFrame,
			loop
		});
	}),
	pauseFreeRun: async ({ reqId }) => withItem(reqId, (item) => item.pauseFreeRun()),
	updateFreeRun: ({ reqId, ...params }) => withItem(reqId, (item) => item.updateFreeRun(params)),
	suspendTab: (_, source) => {
		suspendedPorts.add(source);
		forEachItemOfSource(source, (item) => item.suspendFreeRun());
	},
	debugTag: () => "tlottie-simd-6",
	memoryStats: () => {
		let cachedFrames = 0, cachedFrameBytes = 0, itemCanvasBytes = 0, orphanedCaches = 0;
		for (const entry of framesCacheByName.values()) {
			cachedFrames += entry.frames.size;
			for (const frame of entry.frames.values()) cachedFrameBytes += canvasBytes(frame);
			if (!entry.refs.size) ++orphanedCaches;
		}
		const itemsArr = Object.values(items);
		for (const item of itemsArr) item.canvases?.forEach((canvas) => itemCanvasBytes += canvasBytes(canvas));
		const wasm = getTLottieMemoryStats();
		return readThreadMemory("lottie", {
			items: itemsArr.length,
			tabs: compositorPorts.size,
			frameCaches: framesCacheByName.size,
			orphanedFrameCaches: orphanedCaches,
			cachedFrames,
			cachedFrameGpuBytes: cachedFrameBytes,
			itemCanvasGpuBytes: itemCanvasBytes,
			wasmHeapBytes: wasm.heapBytes,
			wasmAwake: wasm.awake,
			wasmAsleep: wasm.animations - wasm.awake,
			wasmWakes: wasm.wakes,
			wasmRecycles: wasm.recycles
		}, wasm.events);
	},
	resumeTab: (_, source) => {
		suspendedPorts.delete(source);
		forEachItemOfSource(source, (item) => item.resumeFreeRun());
	}
});
if (typeof MessageChannel !== "undefined") listenMessagePort(lottieMessagePort, (source) => {
	const channel = new MessageChannel();
	lottieMessagePort.attachPort(channel.port1);
	lottieMessagePort.invokeVoid("port", void 0, source, [channel.port2]);
}, (source) => {
	forEachItemOfSource(source, (item, reqId) => destroyItem(reqId));
	const compositorPort = compositorPorts.get(source);
	if (compositorPort) {
		compositorPort.close();
		compositorPorts.delete(source);
	}
	suspendedPorts.delete(source);
});
//#endregion
