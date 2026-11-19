//# allFunctionsCalledOnLoad
import { f as DEBUG, h as Modes, l as IS_SAFARI, o as IS_FIREFOX, p as MOUNT_CLASS_TO } from "./userAgent-ByGXcznk.js";
//#region src/helpers/context.ts
var IS_SERVICE_WORKER = typeof ServiceWorkerGlobalScope !== "undefined" && self instanceof ServiceWorkerGlobalScope;
var IS_WEB_WORKER = typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope && !IS_SERVICE_WORKER;
var IS_WORKER = IS_WEB_WORKER || IS_SERVICE_WORKER;
var getWindowClients = () => {
	return self.clients.matchAll({
		includeUncontrolled: false,
		type: "window"
	});
};
var postMessage = (listener, ...args) => {
	try {
		listener.postMessage(...args);
	} catch (err) {
		console.error("[worker] postMessage error:", err, args);
	}
};
var notifyServiceWorker = (all, ...args) => {
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
//#region src/helpers/dT.ts
var _logTimer = Date.now();
function dT() {
	return "[" + ((Date.now() - _logTimer) / 1e3).toFixed(3) + "]";
}
//#endregion
//#region src/lib/debug/logsBuffer.ts
var WANTS_STACK = 3;
var ANSI = /\x1b\[[0-9;]*m/g;
var SRC = IS_SERVICE_WORKER ? "sw" : IS_WEB_WORKER ? "mtproto" : "main";
var RING_SIZE = 4e3;
var MAX_ARGS = 24;
var MAX_DEPTH = 4;
var MAX_STRING = 2048;
var MAX_ARRAY = 64;
var MAX_KEYS = 64;
var enabled = DEBUG || Modes.logs;
var createRing = () => ({
	entries: new Array(RING_SIZE),
	head: 0,
	count: 0
});
var TRANSPORT_PREFIX = "-NET-";
var appRing = createRing();
var transportRing = createRing();
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
function getRingEntries(ring) {
	const out = new Array(ring.count);
	const start = ring.count < RING_SIZE ? 0 : ring.head;
	for (let i = 0; i < ring.count; ++i) out[i] = ring.entries[(start + i) % RING_SIZE];
	return out;
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
/** Snapshot of this context's buffer, oldest-first. */
function getLogEntries() {
	const app = getRingEntries(appRing);
	const transport = getRingEntries(transportRing);
	const out = new Array(app.length + transport.length);
	for (let i = 0, a = 0, b = 0; i < out.length; ++i) out[i] = b >= transport.length || a < app.length && app[a].t <= transport[b].t ? app[a++] : transport[b++];
	return out;
}
function clearLogBuffer() {
	appRing.head = appRing.count = 0;
	transportRing.head = transportRing.count = 0;
}
function setLogBufferEnabled(value) {
	enabled = !!value;
}
function isLogBufferEnabled() {
	return enabled;
}
if (MOUNT_CLASS_TO) {
	MOUNT_CLASS_TO.setLogBufferEnabled = setLogBufferEnabled;
	MOUNT_CLASS_TO.clearLogBuffer = clearLogBuffer;
}
//#endregion
//#region src/lib/logger.ts
var LogTypes = /* @__PURE__ */ function(LogTypes) {
	LogTypes[LogTypes["None"] = 0] = "None";
	LogTypes[LogTypes["Error"] = 1] = "Error";
	LogTypes[LogTypes["Warn"] = 2] = "Warn";
	LogTypes[LogTypes["Log"] = 4] = "Log";
	LogTypes[LogTypes["Debug"] = 8] = "Debug";
	return LogTypes;
}({});
var LOG_LEVELS = [
	0,
	1,
	2,
	4,
	8
];
var STYLES_SUPPORTED = !(IS_SAFARI || IS_FIREFOX);
var LOGGER_STYLES = {
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
var methods = [
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
export { isLogBufferEnabled as a, IS_WORKER as c, getLogEntries as i, logger as n, setLogBufferEnabled as o, clearLogBuffer as r, dT as s, LogTypes as t };
