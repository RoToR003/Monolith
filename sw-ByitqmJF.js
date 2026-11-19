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
//#region src/environment/ctx.ts
const ctx$7 = typeof window !== "undefined" ? window : self;
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
(/iPad|iPhone|iPod/.test(navigator.platform) || navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1) && ctx$7.MSStream;
const IS_SAFARI = !!("safari" in ctx$7) || !!(USER_AGENT && (/\b(iPad|iPhone|iPod)\b/.test(USER_AGENT) || !!USER_AGENT.match("Safari") && !USER_AGENT.match("Chrome")));
const IS_FIREFOX = navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
(navigator.maxTouchPoints === void 0 || navigator.maxTouchPoints > 0) && navigator.userAgent.search(/iOS|iPhone OS|Android|BlackBerry|BB10|Series ?[64]0|J2ME|MIDP|opera mini|opera mobi|mobi.+Gecko|Windows Phone/i);
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
if (MOUNT_CLASS_TO) {
	MOUNT_CLASS_TO.setLogBufferEnabled = setLogBufferEnabled;
	MOUNT_CLASS_TO.clearLogBuffer = clearLogBuffer;
}
//#endregion
//#region src/lib/logger.ts
let LogTypes = /* @__PURE__ */ function(LogTypes) {
	LogTypes[LogTypes["None"] = 0] = "None";
	LogTypes[LogTypes["Error"] = 1] = "Error";
	LogTypes[LogTypes["Warn"] = 2] = "Warn";
	LogTypes[LogTypes["Log"] = 4] = "Log";
	LogTypes[LogTypes["Debug"] = 8] = "Debug";
	return LogTypes;
}({});
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
//#region src/helpers/schedulers/pause.ts
function pause(ms) {
	return new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
}
//#endregion
//#region src/lib/serviceWorker/cache.ts
const ctx$6 = self;
const CACHE_ASSETS_NAME = "cachedAssets";
function isCorrectResponse(response) {
	return response.ok && response.status === 200;
}
function timeoutRace(promise) {
	return Promise.race([promise, pause(1e4).then(() => Promise.reject())]);
}
async function requestCache(event) {
	try {
		const cache = await timeoutRace(ctx$6.caches.open(CACHE_ASSETS_NAME));
		const file = await timeoutRace(cache.match(event.request, { ignoreVary: true }));
		if (file && isCorrectResponse(file)) return file;
		const headers = { "Vary": "*" };
		let response = await fetch(event.request, { headers });
		if (isCorrectResponse(response)) cache.put(event.request, response.clone());
		else if (response.status === 304) {
			const url = event.request.url.replace(/\?.+$/, "") + "?" + (Math.random() * 1e5 | 0);
			response = await fetch(url, { headers });
			if (isCorrectResponse(response)) cache.put(event.request, response.clone());
		}
		return response;
	} catch (err) {
		return fetch(event.request);
	}
}
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
//#region src/helpers/blob/readBlobAsArrayBuffer.ts
function readBlobAsArrayBuffer(blob) {
	return readBlobAs(blob, "readAsArrayBuffer");
}
//#endregion
//#region src/helpers/blob/readBlobAsUint8Array.ts
function readBlobAsUint8Array(blob) {
	return readBlobAsArrayBuffer(blob).then((buffer) => new Uint8Array(buffer));
}
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
//#region src/helpers/noop.ts
function noop$1(...args) {}
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
		if (this.cancel) this.cancel = noop$1;
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
//#region src/helpers/bytes/bytesCmp.ts
function bytesCmp(bytes1, bytes2) {
	const len = bytes1.length;
	if (len !== bytes2.length) return false;
	for (let i = 0; i < len; ++i) if (bytes1[i] !== bytes2[i]) return false;
	return true;
}
//#endregion
//#region src/helpers/fixChromiumMp4.ts
function readLengthField(buf, offset) {
	let length = 0;
	let size = 0;
	for (let i = 0; i < 4; i++) {
		const byte = buf[offset + i];
		length = (length << 7) + (byte & 127);
		size++;
		if ((byte & 128) === 0) break;
	}
	return [size, length];
}
function parseDecoderSpecificInfo(buf) {
	if (buf[0] !== 5) throw new Error("Invalid DecoderSpecificInfo tag");
	const [lenSz, len] = readLengthField(buf, 1);
	const offset = 1 + lenSz;
	return buf.subarray(offset, offset + len);
}
function parseDecoderConfigDescriptor(buf) {
	if (buf[0] !== 4) throw new Error("Invalid DecoderConfigDescriptor tag");
	const [lenSz, len] = readLengthField(buf, 1);
	let offset = 1 + lenSz;
	offset += 13;
	return parseDecoderSpecificInfo(buf.subarray(offset));
}
function parseES_Descriptor(buf) {
	if (buf[0] !== 3) throw new Error("Invalid ES_Descriptor tag");
	const dv = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
	const [lenSz, len] = readLengthField(buf, 1);
	let offset = 1 + lenSz;
	offset += 2;
	const flags = dv.getUint8(offset);
	offset += 1;
	const streamDependenceFlag = flags & 128;
	const URL_Flag = flags & 64;
	if (streamDependenceFlag) offset += 2;
	if (URL_Flag) {
		const URLlength = readLengthField(buf, offset);
		offset += 1 + URLlength[0] + URLlength[1];
	}
	return { decoderConfigDescriptor: parseDecoderConfigDescriptor(buf.subarray(offset)) };
}
const BROKEN_DSCI = [19, 136];
const FIXED_ESDS = bytesFromHex("0327000100041940150000000001f4000000bb750507138856e5a5");
const ESDS = new TextEncoder().encode("esds");
const MP4A = new TextEncoder().encode("mp4a");
function findUint8ArrayBack(buf, needle, start = buf.length) {
	for (let i = start - needle.length; i >= 0; i--) {
		let found = true;
		for (let j = 0; j < needle.length; j++) if (buf[i + j] !== needle[j]) {
			found = false;
			break;
		}
		if (found) return i;
	}
	return -1;
}
function fixMp4ForChromium(u8) {
	const dv = new DataView(u8.buffer, u8.byteOffset, u8.byteLength);
	let pos = u8.length;
	let found = null;
	while (true) {
		const esdsOffset = findUint8ArrayBack(u8, ESDS, pos);
		if (esdsOffset === -1) break;
		pos = esdsOffset;
		const esdsSize = dv.getUint32(esdsOffset - 4);
		if (esdsSize < 0 || esdsOffset + esdsSize > u8.length) continue;
		const mp4aOffset = findUint8ArrayBack(u8, MP4A, esdsOffset);
		if (mp4aOffset === -1 || esdsOffset - mp4aOffset > 100) continue;
		found = {
			offset: esdsOffset + 8,
			size: esdsSize - 12
		};
	}
	if (!found) throw new Error("No ESDS found");
	const parsed = parseES_Descriptor(u8.subarray(found.offset, found.offset + found.size));
	if (!parsed) throw new Error("Invalid ESDS");
	if (!bytesCmp(parsed.decoderConfigDescriptor, BROKEN_DSCI)) throw new Error("Not a broken DSCI");
	if (found.size < FIXED_ESDS.length) throw new Error(`ESDS Size not enough (expected at least ${FIXED_ESDS.length}, got ${found.size})`);
	u8.set(FIXED_ESDS, found.offset);
}
function tryPatchMp4(u8) {
	try {
		fixMp4ForChromium(u8);
		return true;
	} catch (e) {
		return false;
	}
}
//#endregion
//#region src/helpers/schedulers/debounce.ts
function debounce(fn, ms, shouldRunFirst = true, shouldRunLast = true) {
	let waitingTimeout;
	let waitingPromise, resolve, reject;
	let hadNewCall = false;
	const invoke = (args) => {
		const _resolve = resolve, _reject = reject;
		try {
			_resolve(fn.apply(null, args));
		} catch (err) {
			console.error("debounce error", err);
			_reject(err);
		}
	};
	const debounce = (...args) => {
		if (!waitingPromise) waitingPromise = new Promise((_resolve, _reject) => (resolve = _resolve, reject = _reject));
		if (waitingTimeout) {
			clearTimeout(waitingTimeout);
			hadNewCall = true;
			reject();
			waitingPromise = new Promise((_resolve, _reject) => (resolve = _resolve, reject = _reject));
		} else if (shouldRunFirst) {
			invoke(args);
			hadNewCall = false;
		}
		const _waitingTimeout = ctx$7.setTimeout(() => {
			if (shouldRunLast && (!shouldRunFirst || hadNewCall)) invoke(args);
			if (waitingTimeout === _waitingTimeout) {
				waitingTimeout = waitingPromise = resolve = reject = void 0;
				hadNewCall = false;
			}
		}, ms);
		waitingTimeout = _waitingTimeout;
		waitingPromise.catch(noop$1);
		return waitingPromise;
	};
	debounce.clearTimeout = () => {
		if (waitingTimeout) {
			ctx$7.clearTimeout(waitingTimeout);
			reject();
			waitingTimeout = waitingPromise = resolve = reject = void 0;
			hadNewCall = false;
		}
	};
	debounce.isDebounced = () => !!waitingTimeout;
	return debounce;
}
//#endregion
//#region src/lib/accounts/getValidatedAccount.ts
function getValidatedAccount(input) {
	input = parseInt((input || "1") + "");
	return input <= 4 && input >= 1 ? input : 1;
}
//#endregion
//#region src/lib/accounts/constants.ts
const CURRENT_ACCOUNT_QUERY_PARAM = "account";
//#endregion
//#region src/lib/accounts/getCurrentAccountFromURL.ts
function getCurrentAccountFromURL(urlString) {
	const params = new URL(urlString).searchParams;
	return getValidatedAccount(params.get("account") || "");
}
//#endregion
//#region src/lib/serviceWorker/clientAccounts.ts
/**
* The account a tab shows. A tab switches accounts in place and says so (`tabAccount`), while a
* client's `url` stays the one the tab was opened with - Chromium does not follow `history`.
* A worker that has just started knows none of them yet: it asks every tab (`hello`) and gives the
* answer a moment before falling back to the url.
*/
const ANSWER_TIMEOUT = 300;
const accounts = /* @__PURE__ */ new Map();
const waiting = /* @__PURE__ */ new Map();
function setClientAccount(clientId, accountNumber) {
	accounts.set(clientId, accountNumber);
	waiting.get(clientId)?.forEach((resolve) => resolve());
	waiting.delete(clientId);
}
function deleteClientAccount(clientId) {
	accounts.delete(clientId);
	waiting.delete(clientId);
}
async function getClientAccount(client) {
	if (!accounts.has(client.id)) {
		await new Promise((resolve) => {
			const list = waiting.get(client.id) ?? [];
			list.push(resolve);
			waiting.set(client.id, list);
			setTimeout(resolve, ANSWER_TIMEOUT);
		});
		if (!accounts.has(client.id)) accounts.set(client.id, getCurrentAccountFromURL(client.url));
	}
	return accounts.get(client.id);
}
//#endregion
//#region src/helpers/array/toArray.ts
function toArray(value) {
	return Array.isArray(value) ? value : [value];
}
//#endregion
//#region src/helpers/blob/blobSafeMimeType.ts
function blobSafeMimeType(mimeType) {
	if ([
		"image/jpeg",
		"image/png",
		"image/gif",
		"image/svg+xml",
		"image/webp",
		"image/bmp",
		"image/avif",
		"image/jxl",
		"image/heic",
		"video/mp4",
		"video/webm",
		"video/quicktime",
		"audio/ogg",
		"audio/mpeg",
		"audio/mp4",
		"audio/wav",
		"application/json",
		"application/pdf"
	].indexOf(mimeType) === -1) return "application/octet-stream";
	return mimeType;
}
//#endregion
//#region src/helpers/blob/blobConstruct.ts
function blobConstruct(blobParts, mimeType = "") {
	blobParts = toArray(blobParts);
	const safeMimeType = blobSafeMimeType(mimeType);
	return new Blob(blobParts, { type: safeMimeType });
}
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
//#region src/config/tabId.ts
const tabId = Date.now() % Math.random() * 1e8 | 0;
//#endregion
//#region src/helpers/array/indexOfAndSplice.ts
function indexOfAndSplice(array, item) {
	const idx = array.indexOf(item);
	return (idx === -1 ? void 0 : array.splice(idx, 1))?.[0];
}
//#endregion
//#region src/helpers/eventListenerBase.ts
const log$3 = logger("EVENTS");
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
				log$3.error("listener error", name, err);
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
		if (DEBUG) this.stuckWatchdogInterval = ctx$7.setInterval(this.scanStuckAwaiting, STUCK_WATCHDOG_INTERVAL_MS);
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
			const interval = ctx$7.setInterval(() => {
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
//#region src/lib/crypto/utils/aesLocal.ts
const exportedKeys = /* @__PURE__ */ new WeakMap();
function toLocalDataKeyBytes(key) {
	let bytes = exportedKeys.get(key);
	if (!bytes) exportedKeys.set(key, bytes = exportEncryptionKey(key));
	return bytes;
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
//#region src/lib/passcode/deferredIsUsingPasscode.ts
var _DeferredIsUsingPasscode;
var DeferredIsUsingPasscode = class extends StaticUtilityClass {
	static resolveDeferred(value) {
		this.value = value;
		this.deferred?.resolve();
		this.deferred = void 0;
	}
	static async isUsingPasscode() {
		if (this.deferred) await this.deferred;
		if (typeof this.value !== "boolean") throw new Error("Is using passcode is not boolean WTF?");
		return this.value;
	}
	static isUsingPasscodeUndeferred() {
		return this.value;
	}
	/**
	* Mainly for Service worker
	*/
	static resetDeferred() {
		this.value = void 0;
		this.deferred = deferredPromise();
	}
};
_DeferredIsUsingPasscode = DeferredIsUsingPasscode;
_DeferredIsUsingPasscode.deferred = deferredPromise();
//#endregion
//#region src/lib/files/memoryWriter.ts
const liveWriters = /* @__PURE__ */ new Set();
const collected = new FinalizationRegistry((ref) => liveWriters.delete(ref));
var MemoryWriter = class {
	constructor(mimeType, size, saveFileCallback) {
		this.mimeType = mimeType;
		this.size = size;
		this.saveFileCallback = saveFileCallback;
		this.bytes = new Uint8Array(size);
		const ref = new WeakRef(this);
		liveWriters.add(ref);
		collected.register(this, ref);
	}
	get byteLength() {
		return this.bytes.byteLength;
	}
	async write(part, offset) {
		const endOffset = offset + part.byteLength;
		if (endOffset > this.bytes.byteLength) {
			const newBytes = new Uint8Array(endOffset);
			newBytes.set(this.bytes, 0);
			this.bytes = newBytes;
		}
		this.bytes.set(part, offset);
	}
	truncate() {
		this.bytes = /* @__PURE__ */ new Uint8Array();
	}
	trim(size) {
		this.bytes = this.bytes.slice(0, size);
	}
	finalize(saveToStorage = true) {
		const blob = blobConstruct(this.bytes, this.mimeType);
		if (saveToStorage && this.saveFileCallback) this.saveFileCallback(blob);
		return blob;
	}
	getParts() {
		return this.bytes;
	}
	replaceParts(parts) {
		this.bytes = parts;
	}
};
const watchedCachedStorageNames = ["cachedFiles", ...[
	"cachedStreamChunks",
	"cachedHlsStreamChunks",
	"cachedHlsQualityFiles"
]];
const HTTPHeaderNames = {
	cachedTime: "Time-Cached",
	contentLength: "Content-Length",
	contentType: "Content-Type"
};
//#endregion
//#region src/lib/files/cacheStorage.ts
var _CacheStorageController;
const cacheStorageDbConfig = {
	cachedAssets: { encryptable: false },
	cachedBackgrounds: { encryptable: false },
	cachedFiles: { encryptable: true },
	cachedStreamChunks: { encryptable: true },
	cachedHlsQualityFiles: { encryptable: true },
	cachedHlsStreamChunks: { encryptable: true }
};
const defaultOperationTimeout = 15e3;
const minimalBlockingIterationTotalTimeout = defaultOperationTimeout;
const minimalBlockingAllowedTimePerBulk = 4;
const ENTRY_NAME_ESCAPED = /^\/|(^|\/)\.|[^A-Za-z0-9\-_.~!$&'()*+,;=:@/?\u0080-\uD7FF\uE000-\u{10FFFF}]/gu;
function getEntryRequestPath(entryName) {
	return "/" + entryName.replace(ENTRY_NAME_ESCAPED, (char, segmentStart) => {
		if (segmentStart !== void 0) return segmentStart + "%u002E";
		const code = char.charCodeAt(0);
		return code < 128 ? "%" + code.toString(16).toUpperCase().padStart(2, "0") : "%u" + code.toString(16).toUpperCase();
	});
}
var CacheStorageController = class CacheStorageController {
	static getStats() {
		return {
			storages: this.STORAGES.length,
			inFlightOperations: this.inFlightOperations,
			inFlightSaveBytes: this.inFlightSaveBytes
		};
	}
	constructor(dbName) {
		this.dbName = dbName;
		this.useStorage = true;
		if (Modes.test) this.dbName += "_test";
		if (CacheStorageController.STORAGES.length) this.useStorage = CacheStorageController.STORAGES[0].useStorage;
		this.config = Object.entries(cacheStorageDbConfig).find(([name]) => name === dbName)?.[1];
		this.openDatabase();
		CacheStorageController.STORAGES.push(this);
	}
	forget() {
		CacheStorageController.STORAGES = CacheStorageController.STORAGES.filter((storage) => storage !== this);
	}
	get isEncryptable() {
		return this.config?.encryptable;
	}
	static async encrypt(blob) {
		const key = await EncryptionKeyStore.get();
		const dataAsBuffer = await readBlobAsUint8Array(blob);
		const type = blob.type;
		const result = await cryptoMessagePort.invokeCryptoNew({
			method: "aes-local-encrypt",
			args: [{
				key,
				data: dataAsBuffer
			}],
			transfer: [dataAsBuffer.buffer]
		});
		return new Blob([result], { type });
	}
	static async decrypt(blob) {
		const key = await EncryptionKeyStore.get();
		const dataAsBuffer = await readBlobAsUint8Array(blob);
		const type = blob.type;
		const result = await cryptoMessagePort.invokeCryptoNew({
			method: "aes-local-decrypt",
			args: [{
				key,
				encryptedData: dataAsBuffer
			}],
			transfer: [dataAsBuffer.buffer]
		});
		return new Blob([result], { type });
	}
	getDisabledPromises() {
		return [CacheStorageController.disabledPromise, CacheStorageController.disabledPromisesByKey.get(this.dbName)].filter(Boolean);
	}
	async waitToEnable() {
		let disabledPromises;
		while ((disabledPromises = this.getDisabledPromises()).length) await Promise.all(disabledPromises);
	}
	openDatabase() {
		return this.openDbPromise ?? (this.openDbPromise = caches.open(this.dbName));
	}
	delete(entryName) {
		return this.timeoutOperation((cache) => cache.delete(getEntryRequestPath(entryName)));
	}
	/**
	* Requires reconnection in order to save to disc again
	*/
	deleteAll() {
		this.openDbPromise = void 0;
		return caches.delete(this.dbName);
	}
	reset() {
		this.openDbPromise = void 0;
	}
	async minimalBlockingIterateResponses(callback) {
		await this.waitToEnable();
		const batchSize = 10;
		await this.timeoutOperation(async (cache) => {
			const allKeys = await cache.keys();
			let prevTime = performance.now();
			for (let i = 0; i < allKeys.length; i += batchSize) {
				const slice = allKeys.slice(i, i + batchSize);
				await Promise.all(slice.map(async (key) => {
					const callbackResult = callback({
						request: key,
						response: await cache.match(key),
						cache
					});
					if (callbackResult instanceof Promise) await callbackResult;
				}));
				const now = performance.now();
				if (now - prevTime > minimalBlockingAllowedTimePerBulk) {
					await pause(0);
					prevTime = now;
				}
			}
		}, minimalBlockingIterationTotalTimeout);
	}
	async has(entryName) {
		return !!await this.timeoutOperation((cache) => cache.match(getEntryRequestPath(entryName)));
	}
	async get(entryName) {
		await this.waitToEnable();
		const response = await this.timeoutOperation((cache) => cache.match(getEntryRequestPath(entryName)));
		if (!response) return void 0;
		if (this.config?.encryptable && await DeferredIsUsingPasscode.isUsingPasscode()) return new Response(await CacheStorageController.decrypt(await response.blob()), {
			headers: response.headers,
			status: response.status,
			statusText: response.statusText
		});
		return response;
	}
	async save({ entryName, response, size, contentType }) {
		await this.waitToEnable();
		let result = new Response(response.body, {
			headers: {
				...Object.fromEntries(response.headers),
				[HTTPHeaderNames.cachedTime]: Math.floor(Date.now() / 1e3 | 0).toString(),
				[HTTPHeaderNames.contentLength]: size.toString(),
				...contentType ? { [HTTPHeaderNames.contentType]: contentType } : {}
			},
			status: response.status,
			statusText: response.statusText
		});
		if (this.config?.encryptable && await DeferredIsUsingPasscode.isUsingPasscode()) result = new Response(await CacheStorageController.encrypt(await response.blob()), {
			headers: result.headers,
			status: result.status,
			statusText: result.statusText
		});
		return this.timeoutOperation((cache) => cache.put(getEntryRequestPath(entryName), result), void 0, size);
	}
	getFile(fileName, method = "blob") {
		return this.get(fileName).then((response) => {
			if (!response) throw makeError("NO_ENTRY_FOUND");
			return response[method]();
		});
	}
	saveFile(fileName, blob) {
		if (!(blob instanceof Blob)) blob = blobConstruct(blob);
		const response = new Response(blob);
		return this.save({
			entryName: fileName,
			response,
			size: blob.size
		}).then(() => blob);
	}
	timeoutOperation(callback, operationTimeout = defaultOperationTimeout, bytes = 0) {
		if (!this.useStorage) return Promise.reject(makeError("STORAGE_OFFLINE"));
		++CacheStorageController.inFlightOperations;
		CacheStorageController.inFlightSaveBytes += bytes;
		return new Promise(async (resolve, reject) => {
			let rejected = false;
			const timeout = setTimeout(() => {
				reject();
				rejected = true;
			}, operationTimeout);
			try {
				const cache = await this.openDatabase();
				if (!cache) {
					this.useStorage = false;
					this.openDbPromise = void 0;
					throw "no cache?";
				}
				const res = await callback(cache);
				if (rejected) return;
				resolve(res);
			} catch (err) {
				reject(err);
			} finally {
				--CacheStorageController.inFlightOperations;
				CacheStorageController.inFlightSaveBytes -= bytes;
				clearTimeout(timeout);
			}
		});
	}
	prepareWriting(fileName, fileSize, mimeType) {
		return {
			deferred: deferredPromise(),
			getWriter: () => {
				return new MemoryWriter(mimeType, fileSize, (blob) => {
					return this.saveFile(fileName, blob).catch(() => blob);
				});
			}
		};
	}
	static toggleStorage(enabled, _clearWrite) {
		this.STORAGES.forEach((storage) => {
			storage.useStorage = enabled;
		});
		return Promise.resolve();
	}
	static async deleteAllStorages() {
		const storageNames = Object.keys(cacheStorageDbConfig);
		await Promise.all(storageNames.map(async (storageName) => {
			await new CacheStorageController(storageName).deleteAll();
		}));
	}
	static temporarilyToggle(enabled) {
		if (enabled) {
			this.disabledPromise?.resolve();
			this.disabledPromise = void 0;
		} else if (!this.disabledPromise) this.disabledPromise = deferredPromise();
	}
	static temporarilyToggleByName(name, enabled) {
		const hadPromise = this.disabledPromisesByKey.has(name);
		if (enabled) {
			this.disabledPromisesByKey.get(name)?.resolve();
			this.disabledPromisesByKey.delete(name);
		} else if (!hadPromise) this.disabledPromisesByKey.set(name, deferredPromise());
	}
	static temporarilyToggleByNames(names, enabled) {
		names.forEach((name) => this.temporarilyToggleByName(name, enabled));
	}
	static async clearEncryptableStorages() {
		const encryptableStorageNames = Object.entries(cacheStorageDbConfig).filter(([, { encryptable }]) => encryptable).map(([name]) => name);
		await this.clearStoragesByNames(encryptableStorageNames);
	}
	static async clearStoragesByNames(names) {
		await Promise.all(names.map(async (storageName) => {
			const storage = new CacheStorageController(storageName);
			try {
				await storage.deleteAll();
			} catch (e) {
				console.error(e);
			} finally {
				storage.forget();
			}
		}));
	}
	static getOpenEncryptableStorages() {
		return this.STORAGES.filter((storage) => storage.isEncryptable);
	}
	static resetOpenEncryptableCacheStorages() {
		this.getOpenEncryptableStorages().forEach((storage) => storage.reset());
	}
	static getOpenStoragesByNames(names) {
		return this.STORAGES.filter((storage) => names.includes(storage.dbName));
	}
	static async resetOpenStoragesByNames(names) {
		this.getOpenStoragesByNames(names).forEach((storage) => storage.reset());
	}
};
_CacheStorageController = CacheStorageController;
_CacheStorageController.STORAGES = [];
_CacheStorageController.disabledPromisesByKey = /* @__PURE__ */ new Map();
_CacheStorageController.inFlightOperations = 0;
_CacheStorageController.inFlightSaveBytes = 0;
//#endregion
//#region src/lib/serviceWorker/timeout.ts
function timeout(delay) {
	return new Promise(((resolve) => {
		setTimeout(() => {
			resolve(new Response("", {
				status: 408,
				statusText: "Request timed out."
			}));
		}, delay);
	}));
}
//#endregion
//#region src/lib/serviceWorker/stream.ts
const ctx$5 = self;
const deferredPromises = /* @__PURE__ */ new Map();
const cacheStorage$2 = new CacheStorageController("cachedStreamChunks");
const PRELOAD_SIZE = 20971520;
setInterval(() => {
	const mtprotoMessagePort = getMtprotoMessagePort();
	for (const [messagePort, promises] of deferredPromises) {
		if (messagePort === mtprotoMessagePort) continue;
		for (const taskId in promises) promises[taskId].reject();
		deferredPromises.delete(messagePort);
	}
}, 12e4);
const STREAMABLE_MIME_TYPE = /^(?:video|audio|image)\/[\w.+-]+$/;
function safeContentType(mimeType) {
	return STREAMABLE_MIME_TYPE.test(mimeType) ? mimeType : "application/octet-stream";
}
const streams = /* @__PURE__ */ new Map();
ctx$5.streams = streams;
var Stream = class Stream {
	constructor(info) {
		this.info = info;
		this.loadedOffsets = /* @__PURE__ */ new Set();
		this.destroy = () => {
			if (this.inUse > 0) {
				this.destroyDebounced();
				return;
			}
			this.destroyDebounced.clearTimeout();
			streams.delete(this.id);
			serviceMessagePort.invokeVoid("cancelFilePartRequests", {
				docId: Stream.getDocId(this.info),
				accountNumber: this.info.accountNumber
			}, getMtprotoMessagePort());
		};
		this.toggleInUse = (inUse) => {
			this.inUse = Math.max(0, this.inUse + (inUse ? 1 : -1));
			if (!this.inUse) this.destroy();
		};
		this.id = Stream.getId(info);
		streams.set(this.id, this);
		this.inUse = 0;
		this.limitPart = info.size > 78643200 ? STREAM_CHUNK_UPPER_LIMIT : STREAM_CHUNK_MIDDLE_LIMIT;
		this.destroyDebounced = debounce(this.destroy, 15e4, false, true);
	}
	async requestFilePartFromWorker(alignedOffset, limit, fromPreload = false) {
		const payload = {
			docId: Stream.getDocId(this.info),
			dcId: this.info.dcId,
			offset: alignedOffset,
			limit,
			accountNumber: this.info.accountNumber
		};
		const taskId = JSON.stringify(payload);
		const mtprotoMessagePort = getMtprotoMessagePort();
		let promises = deferredPromises.get(mtprotoMessagePort);
		if (!promises) deferredPromises.set(mtprotoMessagePort, promises = {});
		let deferred = promises[taskId];
		if (deferred) return deferred.then((uploadFile) => uploadFile.bytes);
		this.loadedOffsets.add(alignedOffset);
		deferred = promises[taskId] = deferredPromise();
		serviceMessagePort.invoke("requestFilePart", payload, void 0, mtprotoMessagePort, void 0, 6e4).then(deferred.resolve.bind(deferred), deferred.reject.bind(deferred)).finally(() => {
			if (promises[taskId] === deferred) {
				delete promises[taskId];
				if (!Object.keys(promises).length) deferredPromises.delete(mtprotoMessagePort);
			}
		});
		const bytesPromise = deferred.then((uploadFile) => uploadFile.bytes);
		this.saveChunkToCache(bytesPromise, alignedOffset, limit);
		!fromPreload && this.preloadChunks(alignedOffset, PRELOAD_SIZE);
		return bytesPromise;
	}
	requestFilePartFromCache(alignedOffset, limit, fromPreload) {
		const key = this.getChunkKey(alignedOffset, limit);
		return cacheStorage$2.getFile(key).then((blob) => {
			return fromPreload ? /* @__PURE__ */ new Uint8Array() : readBlobAsUint8Array(blob);
		}, (error) => {
			if (error?.type === "NO_ENTRY_FOUND") return;
		});
	}
	requestFilePart(alignedOffset, limit, fromPreload) {
		return this.requestFilePartFromCache(alignedOffset, limit, fromPreload).then((bytes) => {
			return bytes || this.requestFilePartFromWorker(alignedOffset, limit, fromPreload);
		});
	}
	saveChunkToCache(deferred, alignedOffset, limit) {
		return deferred.then((bytes) => {
			const key = this.getChunkKey(alignedOffset, limit);
			const response = new Response(bytes);
			return cacheStorage$2.save({
				entryName: key,
				response,
				size: bytes.length,
				contentType: "application/octet-stream"
			});
		}).catch(() => {});
	}
	preloadChunk(offset) {
		if (this.loadedOffsets.has(offset)) return;
		this.loadedOffsets.add(offset);
		this.requestFilePart(offset, this.limitPart, true).catch(() => {});
	}
	preloadChunks(from, size) {
		if (!from) {
			if (this.info.size) this.preloadChunk(alignOffset(this.info.size - 1, this.limitPart));
			return;
		}
		let offset = alignOffset(from, this.limitPart);
		let end = offset + size;
		if (end > this.info.size) end = this.info.size;
		for (; offset < end; offset += this.limitPart) this.preloadChunk(offset);
	}
	requestRange(range) {
		this.destroyDebounced();
		const possibleResponse = responseForSafariFirstRange(range, this.info.mimeType, this.info.size);
		if (possibleResponse) return possibleResponse;
		let [offset, end] = range;
		const limit = end && end < this.limitPart ? Math.max(SMALLEST_CHUNK_LIMIT, alignLimit(end - offset + 1)) : this.limitPart;
		const alignedOffset = alignOffset(offset, limit);
		if (!end) end = Math.min(offset + limit, this.info.size - 1);
		let overflow;
		if (offset !== alignedOffset || end !== alignedOffset + limit) overflow = end - alignedOffset - limit + 1;
		return Promise.all([this.requestFilePart(alignedOffset, limit), overflow > 0 && this.requestFilePart(alignedOffset + limit, limit)]).then((parts) => {
			let ab = bufferConcats(...parts.filter(Boolean));
			if (offset !== alignedOffset || end !== alignedOffset + limit) {
				const sliceStart = offset - alignedOffset;
				const sliceEnd = end - alignedOffset + 1;
				ab = ab.slice(sliceStart, sliceEnd);
			}
			if (this.shouldPatchMp4 === true || this.shouldPatchMp4 === alignedOffset) {
				if (tryPatchMp4(ab)) this.shouldPatchMp4 = alignedOffset;
			}
			const headers = {
				"Accept-Ranges": "bytes",
				"Content-Range": `bytes ${offset}-${offset + ab.byteLength - 1}/${this.info.size || "*"}`,
				"Content-Length": `${ab.byteLength}`
			};
			if (this.info.mimeType) {
				headers["Content-Type"] = safeContentType(this.info.mimeType);
				headers["X-Content-Type-Options"] = "nosniff";
			}
			return new Response(ab, {
				status: 206,
				statusText: "Partial Content",
				headers
			});
		});
	}
	getChunkKey(alignedOffset, limit) {
		return this.id + "?offset=" + alignedOffset + "&limit=" + limit;
	}
	patchChromiumMp4() {
		this.shouldPatchMp4 = true;
	}
	static get(info) {
		return streams.get(this.getId(info)) ?? new Stream(info);
	}
	static getExisting(info) {
		return streams.get(this.getId(info));
	}
	static getId(info) {
		return `${info.accountNumber}-${this.getDocId(info)}`;
	}
	static getDocId(info) {
		return info.location.id;
	}
};
function parseInfo(params) {
	return JSON.parse(decodeURIComponent(params));
}
function onStreamFetch(event, params, search) {
	if (event.request.mode === "navigate") {
		event.respondWith(new Response("", {
			status: 403,
			statusText: "Forbidden"
		}));
		return;
	}
	async function performRequest() {
		const range = parseRange(event.request.headers.get("Range"));
		const info = parseInfo(params);
		const client = await ctx$5.clients.get(event.clientId);
		if (client?.type === "window") info.accountNumber = await getClientAccount(client);
		const stream = Stream.get(info);
		if (search === "_crbug1250841") stream.patchChromiumMp4();
		return stream.requestRange(range);
	}
	event.respondWith(Promise.race([timeout(45e3), performRequest()]));
}
function toggleStreamInUse({ url, inUse, accountNumber }) {
	[url] = url.split("?");
	const index = url.indexOf("stream/");
	const info = parseInfo(url.slice(index + 7));
	info.accountNumber = accountNumber;
	(inUse ? Stream.get(info) : Stream.getExisting(info))?.toggleInUse(inUse);
}
function responseForSafariFirstRange(range, mimeType, size) {
	if (range[0] === 0 && range[1] === 1) return new Response((/* @__PURE__ */ new Uint8Array(2)).buffer, {
		status: 206,
		statusText: "Partial Content",
		headers: {
			"Accept-Ranges": "bytes",
			"Content-Range": `bytes 0-1/${size || "*"}`,
			"Content-Length": "2",
			"Content-Type": mimeType || "video/mp4"
		}
	});
	return null;
}
const STREAM_CHUNK_MIDDLE_LIMIT = 524288;
const STREAM_CHUNK_UPPER_LIMIT = 1048576;
const SMALLEST_CHUNK_LIMIT = 4096;
function parseRange(header) {
	if (!header) return [0, 0];
	const [, chunks] = header.split("=");
	const [offset, end] = chunks.split(", ")[0].split("-");
	return [+offset, +end || 0];
}
function alignOffset(offset, base = SMALLEST_CHUNK_LIMIT) {
	return offset - offset % base;
}
function alignLimit(limit) {
	return limit <= 1 ? 1 : 2 ** (32 - Math.clz32(limit - 1));
}
//#endregion
//#region src/config/databases/state.ts
const getCommonDatabaseState = () => ({
	name: `tweb-common`,
	version: 8,
	stores: [{ name: "session" }, {
		name: "localStorage",
		encryptedName: "localStorage__encrypted"
	}]
});
const getDatabaseState = (accountNumber) => ({
	name: `tweb-account-${accountNumber}`,
	version: 10,
	stores: [
		{
			name: "session",
			encryptedName: "session__encrypted"
		},
		{
			name: "stickerSets",
			encryptedName: "stickerSets__encrypted"
		},
		{
			name: "users",
			encryptedName: "users__encrypted"
		},
		{
			name: "chats",
			encryptedName: "chats__encrypted"
		},
		{
			name: "dialogs",
			encryptedName: "dialogs__encrypted"
		},
		{
			name: "messages",
			encryptedName: "messages__encrypted"
		},
		{
			name: "webapp",
			encryptedName: "webapp__encrypted"
		},
		{
			name: "widgets",
			encryptedName: "widgets__encrypted"
		}
	]
});
MOUNT_CLASS_TO.getDatabaseState = getDatabaseState;
//#endregion
//#region src/config/notifications.ts
const NOTIFICATION_ICON_PATH = "assets/img/logo_filled_rounded.png";
const NOTIFICATION_BADGE_PATH = "assets/img/logo_plain.svg";
//#endregion
//#region src/helpers/object/deepEqual.ts
/**
* ignores `undefined` properties
* `ignoreKeys` applies only at the top level — it is NOT propagated into nested objects
*/
function deepEqual(x, y, ignoreKeys) {
	const ignoreSet = ignoreKeys && new Set(ignoreKeys);
	const okok = (obj) => Object.keys(obj).filter((key) => obj[key] !== void 0);
	const ok = ignoreKeys ? (obj) => okok(obj).filter((key) => !ignoreSet.has(key)) : okok, tx = typeof x;
	return x && y && tx === "object" && tx === typeof y ? ok(x).length === ok(y).length && ok(x).every((key) => deepEqual(x[key], y[key])) : x === y;
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
//#region src/config/app.ts
const MAIN_DOMAINS = ["web.telegram.org", "webk.telegram.org"];
const threads = Math.min(4, navigator.hardwareConcurrency ?? 4);
const App = {
	id: 1025907,
	hash: "452b0359b988148995f22ff0f4229750",
	pushServerKey: "BB3JzmQIBTl8ZdTmLzhkZVnoYxoSvUmCe1CqqF53u2j0WbEFo2m--mOBagroDFdqMeESfz3ue1Z1e5PTIxMYH_g",
	version: "2.3",
	versionFull: "2.3 (687)",
	build: 687,
	langPackVersion: 378801,
	langPack: "webk",
	langPackCode: "en",
	domains: MAIN_DOMAINS,
	baseDcId: 2,
	isMainDomain: MAIN_DOMAINS.includes(location.hostname),
	suffix: "K",
	threads,
	lottieWorkers: threads,
	cryptoWorkers: threads,
	interclientBroadcastChannel: "tgweb"
};
if (App.isMainDomain) {
	App.id = 2496;
	App.hash = "8da85b0d5bfe62527e5b244c209159c3";
	App.pushServerKey = "BHEbKOXt-GD8MCTTYiAYT3I5R4MB0epIE7Tbbymj1uR0xJRE_7m27eXTVAC_P19TeZnO9413lRz-0oZ87JRPKPM";
}
//#endregion
//#region src/config/broadcastChannel.ts
const unversionedMainBroadcastChannelName = "webk-main-broadcast-channel";
//#endregion
//#region src/lib/broadcastChannelWrapper.ts
function isEventValid(eventData) {
	return typeof eventData === "object" && eventData !== null && "eventName" in eventData && typeof eventData.eventName === "string";
}
function createBroadcastChannelWrapper(name) {
	const broadcastChannel = new BroadcastChannel(name);
	const listeners = /* @__PURE__ */ new Map();
	broadcastChannel.onmessage = (event) => {
		const data = event.data;
		if (!isEventValid(data)) return;
		const { eventName, payload } = data;
		const listenersForEvent = listeners.get(eventName);
		if (listenersForEvent) listenersForEvent.forEach((listener) => listener(payload));
	};
	return {
		on: (inEventName, listener) => {
			const eventName = inEventName;
			const listenersForEvent = listeners.get(eventName);
			if (listenersForEvent) listenersForEvent.push(listener);
			else listeners.set(eventName, [listener]);
			const remove = () => {
				const listenersForEvent = listeners.get(eventName);
				if (listenersForEvent) {
					const index = listenersForEvent.indexOf(listener);
					if (index !== -1) listenersForEvent.splice(index, 1);
				}
			};
			return remove;
		},
		emit: (eventName, payload) => {
			broadcastChannel.postMessage({
				eventName,
				payload
			});
		},
		emitVoid: (eventName) => {
			broadcastChannel.postMessage({ eventName });
		},
		close: () => {
			broadcastChannel.close();
		}
	};
}
//#endregion
//#region src/lib/files/idb.ts
var _IDB;
const BLOCKED_OPEN_TIMEOUT = 2e4;
let askedOlderVersionsToReload = false;
/**
* The tabs of older builds are asked to reload, once, on the channel every version reloads on
* (apiManagerProxy; a tab of this build or a newer one does not, by `olderThan`). Sent from wherever the upgrade is
* found held back — the worker opens the account's databases before the page does
*/
function askOlderVersionsToReload() {
	if (askedOlderVersionsToReload) return;
	askedOlderVersionsToReload = true;
	try {
		const channel = createBroadcastChannelWrapper(unversionedMainBroadcastChannelName);
		channel.emit("reload", {
			dropFlags: [],
			olderThan: App.build
		});
		channel.close();
	} catch (err) {}
}
var IDB = class IDB {
	constructor(db) {
		safeAssign(this, db);
		if (Modes.test) this.name += "_test";
		this.storageIsAvailable = true;
		this.log = logger(["IDB", db.name].join("-"));
		this.log("constructor");
		this.openDatabase(true);
		IDB.INSTANCES.push(this);
	}
	isAvailable() {
		return this.storageIsAvailable;
	}
	openDatabase(createNew = false) {
		if (this.openDbPromise && !createNew) return this.openDbPromise;
		const createIndexes = (os, store) => {
			const indexNames = Array.from(os.indexNames);
			for (const indexName of indexNames) os.deleteIndex(indexName);
			if (!store.indexes?.length) return;
			for (const index of store.indexes) {
				if (os.indexNames.contains(index.indexName)) continue;
				os.createIndex(index.indexName, index.keyPath, index.objectParameters);
			}
		};
		const createObjectStore = (db, store) => {
			const os = db.createObjectStore(store.name);
			createIndexes(os, store);
		};
		try {
			var request = indexedDB.open(this.name, this.version);
			if (!request) return Promise.reject();
		} catch (error) {
			this.log.error("error opening db", error.message);
			this.storageIsAvailable = false;
			return Promise.reject(error);
		}
		let finished = false, waiting = false;
		const startedAt = Date.now();
		const waitForUpgrade = () => {
			if (waiting) return;
			waiting = true;
			this.log.warn("the upgrade waits for the connections of an older version to close");
			IDB.onUpgradeBlocked?.(this.name);
		};
		const isUpgradePending = async () => {
			try {
				const databases = await Promise.race([indexedDB.databases?.(), pause(1e3)]);
				const found = databases ? databases.find((database) => database.name === this.name) : void 0;
				return !!found && found.version < this.version;
			} catch (err) {
				return false;
			}
		};
		const checkTimeout = async () => {
			if (finished) return;
			if (!waiting && await isUpgradePending()) waitForUpgrade();
			if (finished) return;
			if (waiting && Date.now() - startedAt < BLOCKED_OPEN_TIMEOUT) {
				setTimeout(checkTimeout, 1e3);
				return;
			}
			request.onerror(makeError("IDB_CREATE_TIMEOUT"));
		};
		setTimeout(checkTimeout, 3e3);
		request.onblocked = waitForUpgrade;
		return this.openDbPromise = new Promise((resolve, reject) => {
			request.onsuccess = (event) => {
				finished = true;
				const db = request.result;
				let calledNew = false;
				this.log("Opened");
				db.onerror = (error) => {
					this.storageIsAvailable = false;
					this.log.error("Error creating/accessing IndexedDB database", error);
					reject(error);
				};
				db.onclose = (e) => {
					this.log.error("closed:", e);
					!calledNew && this.openDatabase();
				};
				db.onabort = (e) => {
					this.log.error("abort:", e);
					const transaction = e.target;
					this.openDatabase(calledNew = true);
					if (transaction.onerror) transaction.onerror(e);
					db.close();
				};
				db.onversionchange = (e) => {
					this.log.error("onversionchange, lol?");
				};
				resolve(this.db = db);
			};
			request.onerror = (event) => {
				finished = true;
				this.storageIsAvailable = false;
				this.log.error("Error creating/accessing IndexedDB database", event);
				reject(event);
			};
			request.onupgradeneeded = (event) => {
				finished = true;
				this.log.warn("performing idb upgrade from", event.oldVersion, "to", event.newVersion);
				const target = event.target;
				const db = target.result;
				this.stores.forEach((store) => {
					if (!db.objectStoreNames.contains(store.name)) createObjectStore(db, store);
					else {
						const os = target.transaction.objectStore(store.name);
						createIndexes(os, store);
					}
					if (store.encryptedName && !db.objectStoreNames.contains(store.encryptedName)) db.createObjectStore(store.encryptedName);
				});
			};
		}).then((db) => this.openDbPromise = db);
	}
	async closeDatabase() {
		if (!this.db) return;
		this.db.onclose = () => {};
		this.db.close();
	}
	static create(db) {
		return this.INSTANCES.find((instance) => instance.name === db.name) ?? new IDB(db);
	}
	static closeDatabases(preserve) {
		this.INSTANCES.forEach((storage) => {
			if (preserve && preserve === storage) return;
			storage.closeDatabase();
		});
	}
	/**
	* ! WARNING ! function requires at least one opened connection
	*/
	/**
	* Promise will be resolved only when all connections are closed \
	* You can skip waiting since it'll be deleted after all connections are closed
	*/
	static deleteDatabaseByName(dbName) {
		return new Promise((resolve, reject) => {
			this.INSTANCES.forEach((storage) => {
				if (storage.name === dbName) return storage.closeDatabase();
			});
			const request = indexedDB.deleteDatabase(dbName);
			request.onerror = () => reject();
			request.onsuccess = () => resolve();
		});
	}
};
_IDB = IDB;
_IDB.INSTANCES = [];
_IDB.onUpgradeBlocked = askOlderVersionsToReload;
var IDBStorage = class {
	constructor(db, storeName) {
		this.storeName = storeName;
		this.log = logger([
			"IDB",
			db.name,
			storeName
		].join("-"));
		this.idb = IDB.create(db);
	}
	close() {
		return this.idb.closeDatabase();
	}
	delete(entryName, storeName) {
		const isArray = Array.isArray(entryName);
		if (!isArray) entryName = [].concat(entryName);
		return this.getObjectStore("readwrite", (objectStore) => {
			const promises = entryName.map((entryName) => objectStore.delete(entryName));
			return isArray ? promises : promises[0];
		}, "", storeName);
	}
	clear(storeName) {
		return this.getObjectStore("readwrite", (objectStore) => objectStore.clear(), "", storeName);
	}
	save(entryName, value, storeName) {
		const isArray = Array.isArray(entryName);
		if (!isArray) {
			entryName = [entryName];
			value = [value];
		}
		return this.getObjectStore("readwrite", (objectStore) => {
			const promises = entryName.map((entryName, idx) => objectStore.put(value[idx], entryName));
			return isArray ? promises : promises[0];
		}, "", storeName);
	}
	get(entryName, storeName) {
		const isArray = Array.isArray(entryName);
		if (!isArray) {
			if (!entryName) return;
			entryName = [].concat(entryName);
		} else if (!entryName.length) return Promise.resolve([]);
		return this.getObjectStore("readonly", (objectStore) => {
			const promises = entryName.map((entryName) => objectStore.get(entryName));
			return isArray ? promises : promises[0];
		}, "", storeName);
	}
	async getObjectStore(mode, callback, log, storeName = this.storeName) {
		let perf;
		if (log) {
			perf = performance.now();
			this.log(log + ": start");
		}
		const _db = this.idb.openDatabase();
		const db = _db instanceof Promise ? await _db : _db;
		let resolve, reject;
		const promise = new Promise((a, b) => [resolve, reject] = [a, b]);
		const transaction = db.transaction([storeName], mode, { durability: "relaxed" });
		const timeout = setTimeout(() => {
			this.log.error("transaction not finished", transaction, log);
		}, 1e4);
		const onError = () => {
			clearTimeout(timeout);
			reject(transaction.error);
		};
		const onComplete = () => {
			clearTimeout(timeout);
			if (log) this.log(log + ": end", performance.now() - perf);
			const results = requests.map((r) => r.result);
			resolve(isArray ? results : results[0]);
			if (log) this.log(log + ": resolved", isArray ? results : results[0]);
		};
		transaction.onerror = onError;
		const waitForTransactionComplete = mode === "readwrite";
		if (waitForTransactionComplete) transaction.oncomplete = () => onComplete();
		const callbackResult = callback(transaction.objectStore(storeName), onComplete, onError);
		const isArray = Array.isArray(callbackResult);
		const requests = isArray ? callbackResult : [].concat(callbackResult);
		if (waitForTransactionComplete) return promise;
		const length = requests.length;
		let left = length;
		const onRequestFinished = () => {
			if (transaction.error) return;
			if (!--left) onComplete();
		};
		for (let i = 0; i < length; ++i) {
			const request = requests[i];
			request.onerror = onError;
			request.onsuccess = onRequestFinished;
		}
		return promise;
	}
	getAll(storeName) {
		return this.getObjectStore("readonly", (objectStore) => objectStore.getAll(), "", storeName);
	}
	getAllKeys(storeName) {
		return this.getObjectStore("readonly", (objectStore) => objectStore.getAllKeys(), "", storeName);
	}
	getAllEntries(storeName) {
		const entries = [];
		return new Promise((resolve, reject) => {
			this.getObjectStore("readonly", (objectStore, onComplete, onError) => {
				const request = objectStore.openCursor();
				request.onsuccess = (event) => {
					const cursor = event.target.result;
					if (cursor) {
						entries.push([cursor.key, cursor.value]);
						cursor.continue();
					} else {
						onComplete();
						resolve(entries);
					}
				};
				request.onerror = onError;
				return [];
			}, "", storeName).catch(reject);
		});
	}
};
const REAL_FOLDERS = /* @__PURE__ */ new Set([0, 1]);
Math.max(...Array.from(REAL_FOLDERS)) + 1;
//#endregion
//#region src/lib/appManagers/utils/messages/getLoginCodeEntity.ts
/**
* A login code in a text from the service notifications or the verification codes bot,
* as the spoiler that hides it wherever the message is previewed
*/
function getLoginCodeEntity(peerId, text) {
	const codeRegex = peerId === 777e3 ? /[\d\-]{5,7}/ : peerId === 489e3 ? /[\d\-]{3,8}/ : void 0;
	const match = codeRegex && text.match(codeRegex);
	if (!match) return;
	return {
		_: "messageEntitySpoiler",
		offset: match.index,
		length: match[0].length
	};
}
//#endregion
//#region src/lib/richTextProcessor/spoiler.ts
function spoiler(text) {
	const chars = "⠁⠂⠄⠈⠐⠠⡀⢀⠃⠅⠆⠉⠊⠌⠑⠒⠔⠘⠡⠢⠤⠨⠰⡁⡂⡄⡈⡐⡠⢁⢂⢄⢈⢐⢠⣀⠇⠋⠍⠎⠓⠕⠖⠙⠚⠜⠣⠥⠦⠩⠪⠬⠱⠲⠴⠸⡃⡅⡆⡉⡊⡌⡑⡒⡔⡘⡡⡢⡤⡨⡰⢃⢅⢆⢉⢊⢌⢑⢒⢔⢘⢡⢢⢤⢨⢰⣁⣂⣄⣈⣐⣠⠏⠗⠛⠝⠞⠧⠫⠭⠮⠳⠵⠶⠹⠺⠼⡇⡋⡍⡎⡓⡕⡖⡙⡚⡜⡣⡥⡦⡩⡪⡬⡱⡲⡴⡸⢇⢋⢍⢎⢓⢕⢖⢙⢚⢜⢣⢥⢦⢩⢪⢬⢱⢲⢴⢸⣃⣅⣆⣉⣊⣌⣑⣒⣔⣘⣡⣢⣤⣨⣰⠟⠯⠷⠻⠽⠾⡏⡗⡛⡝⡞⡧⡫⡭⡮⡳⡵⡶⡹⡺⡼⢏⢗⢛⢝⢞⢧⢫⢭⢮⢳⢵⢶⢹⢺⢼⣇⣋⣍⣎⣓⣕⣖⣙⣚⣜⣣⣥⣦⣩⣪⣬⣱⣲⣴⣸⠿⡟⡯⡷⡻⡽⡾⢟⢯⢷⢻⢽⢾⣏⣗⣛⣝⣞⣧⣫⣭⣮⣳⣵⣶⣹⣺⣼⡿⢿⣟⣯⣷⣻⣽⣾⣿";
	const charsLength = 255;
	const out = [];
	for (let i = 0; i < text.length; ++i) out.push(chars[(Math.random() * 1e3 | 0) % charsLength]);
	return out.join("");
}
//#endregion
//#region src/lib/richTextProcessor/encodeSpoiler.ts
function encodeSpoiler(text, entity) {
	const before = text.slice(0, entity.offset);
	const spoilerAfter = spoiler(text.slice(entity.offset, entity.offset + entity.length));
	const after = text.slice(entity.offset + entity.length);
	text = before + spoilerAfter + after;
	return {
		text,
		entityText: spoilerAfter
	};
}
//#endregion
//#region src/lib/serviceWorker/push.ts
const ctx$4 = self;
const defaultBaseUrl = location.protocol + "//" + location.hostname + location.pathname.split("/").slice(0, -1).join("/") + "/";
let localNotificationsAvailable = true;
var SomethingGetter = class {
	constructor(db, storeName, defaults) {
		this.defaults = defaults;
		this.cache = {};
		this.storage = new IDBStorage(db, storeName);
	}
	getDefault(key) {
		const callback = this.defaults[key];
		return typeof callback === "function" ? callback() : callback;
	}
	get(key) {
		if (this.cache.hasOwnProperty(key)) return this.cache[key];
		return this.storage.get(key).then((value) => value, () => void 0).then((value) => {
			if (this.cache.hasOwnProperty(key)) return this.cache[key];
			value ?? (value = this.getDefault(key));
			return this.cache[key] = value;
		});
	}
	getCached(key) {
		const value = this.get(key);
		if (value instanceof Promise) throw "no property";
		return value;
	}
	async set(key, value) {
		if (deepEqual(this.cache[key] ?? this.defaults[key], value)) return;
		this.cache[key] = value;
		try {
			this.storage.save(key, value);
		} catch (err) {}
	}
};
const defaults = {
	push_mute_until: 0,
	push_lang: {
		push_message_nopreview: "You have a new message",
		push_message_error: "Telegram is syncing in the background...",
		push_action_mute1d: "Mute for 24H",
		push_action_settings: "Settings"
	},
	push_settings: {},
	push_accounts: {},
	push_keys_ids_base64: []
};
const getter = new SomethingGetter(getCommonDatabaseState(), "session", defaults);
for (const i in defaults) getter.get(i);
async function handlePushNotificationObject(obj) {
	const copy = JSON.parse(JSON.stringify(obj));
	log("push", copy);
	let fix = false, _lang;
	try {
		if (obj.mute === "1") throw `supress push notification because obj.mute is 1`;
		const [muteUntil, settings, lang, windowClients] = await Promise.all([
			getter.get("push_mute_until"),
			getter.get("push_settings"),
			getter.get("push_lang"),
			getWindowClients()
		]);
		_lang = lang;
		const nowTime = Date.now();
		if (userInvisibleIsSupported() && muteUntil && nowTime < muteUntil) throw `supress push notification because mute for ${Math.ceil((muteUntil - nowTime) / 6e4)} min`;
		if (windowClients.length && localNotificationsAvailable) {
			fix = false;
			throw "supress push notification because some instance is alive";
		}
		await fireNotification(obj, settings, lang).catch((err) => {
			log.error("push notification error", err, copy);
			throw err;
		});
	} catch (err) {
		log(err);
		if (!fix) return;
		const tag = "fix";
		const notificationPromise = ctx$4.registration.showNotification("Telegram Web", {
			body: _lang.push_message_error,
			icon: NOTIFICATION_ICON_PATH,
			tag,
			badge: NOTIFICATION_BADGE_PATH,
			silent: true
		});
		notificationPromise.then(() => {
			setTimeout(() => {
				closeAllNotifications(tag);
			}, 2e3);
		});
		return notificationPromise;
	}
}
ctx$4.handlePushNotificationObject = handlePushNotificationObject;
function onPushEvent(event) {
	const obj = event.data.json();
	if (!("p" in obj)) {
		event.waitUntil(handlePushNotificationObject(obj));
		return;
	}
	const emptyNotification = {
		loc_key: "",
		loc_args: [],
		custom: { msg_id: "" },
		random_id: 0,
		description: "",
		title: "",
		mute: "0",
		user_id: 0,
		accountNumber: 1
	};
	log("encrypted push", obj);
	const { p } = obj;
	if (!p) {
		log("no p");
		event.waitUntil(handlePushNotificationObject(emptyNotification));
		return;
	}
	const keysIdsBase64 = getter.getCached("push_keys_ids_base64");
	const keyIndex = keysIdsBase64?.findIndex((key) => p.startsWith(key)) ?? -1;
	if (keyIndex === -1) {
		log("no key");
		event.waitUntil(handlePushNotificationObject(emptyNotification));
		return;
	}
	const keyIdBase64 = keysIdsBase64[keyIndex];
	emptyNotification.accountNumber = keyIndex + 1;
	emptyNotification.p = p;
	emptyNotification.keyIdBase64 = keyIdBase64;
	event.waitUntil(serviceMessagePort.invoke("decryptPush", {
		p,
		keyIdBase64
	}, void 0, void 0, void 0, 1e3).catch((err) => {
		log.error("decryptPush error", err);
		return emptyNotification;
	}).then(handlePushNotificationObject));
}
async function isPasscodeLocked() {
	return Promise.race([pause(1e3).then(() => void 0), Promise.all([DeferredIsUsingPasscode.isUsingPasscode(), EncryptionKeyStore.get()]).then(([isUsingPasscode, encryptionKey]) => {
		return isUsingPasscode && !encryptionKey;
	})]);
}
function onNotificationClick(event) {
	const notification = event.notification;
	log("on notification click", notification);
	notification.close();
	const action = event.action;
	if (action === "mute1d" && userInvisibleIsSupported()) {
		log("[SW] mute for 1d");
		getter.set("push_mute_until", Date.now() + 864e5);
		return;
	}
	const data = notification.data;
	if (!data) return;
	const clickId = ++lastClickId;
	const promise = Promise.all([
		ctx$4.clients.matchAll({ type: "window" }),
		getter.get("push_settings"),
		getter.get("push_accounts"),
		isPasscodeLocked()
	]).then(async ([clientList, settings, accounts, isLocked]) => {
		data.action = action;
		for (const _accountNumber in accounts) {
			const accountNumber = +_accountNumber;
			if (accounts[accountNumber] === data.user_id) {
				data.accountNumber = accountNumber;
				break;
			}
		}
		const clientAccounts = await Promise.all(clientList.map((client) => getClientAccount(client)));
		for (let i = 0; i < clientList.length; ++i) {
			const client = clientList[i];
			if (!("focus" in client)) continue;
			if (clientAccounts[i] !== data.accountNumber) continue;
			client.focus();
			if (isLocked) {
				setPendingNotification(data, clickId);
				return;
			}
			serviceMessagePort.invokeVoid("pushClick", data, client);
			if (pendingNotificationClickId < clickId) pendingNotification = void 0;
			return;
		}
		setPendingNotification(data, clickId);
		if (ctx$4.clients.openWindow) {
			const url = new URL(settings.baseUrl || defaultBaseUrl);
			if (data.accountNumber && data.accountNumber > 1) url.searchParams.set(CURRENT_ACCOUNT_QUERY_PARAM, data.accountNumber + "");
			return ctx$4.clients.openWindow(url);
		}
	}).catch((error) => {
		log.error("Clients.matchAll error", error);
	});
	event.waitUntil(promise);
}
const notifications = /* @__PURE__ */ new Set();
let pendingNotification;
let pendingNotificationClickId = 0;
let lastClickId = 0;
function setPendingNotification(data, clickId) {
	if (pendingNotification && pendingNotificationClickId > clickId) return;
	pendingNotification = data;
	pendingNotificationClickId = clickId;
}
function onCloseNotification(event) {
	removeFromNotifications(event.notification);
}
function removeFromNotifications(notification) {
	notifications.delete(notification);
}
function closeAllNotifications(tag) {
	for (const notification of notifications) try {
		if (tag && notification.tag !== tag) continue;
		notification.close();
		notifications.delete(notification);
	} catch (e) {}
	let promise;
	if ("getNotifications" in ctx$4.registration) promise = ctx$4.registration.getNotifications({ tag }).then((notifications) => {
		for (let i = 0, len = notifications.length; i < len; ++i) try {
			notifications[i].close();
		} catch (e) {}
	}).catch((error) => {
		log.error("Offline register SW error", error);
	});
	else promise = Promise.resolve();
	return promise;
}
function userInvisibleIsSupported() {
	return IS_FIREFOX;
}
function fillPushObject(obj) {
	let peerId;
	if (obj.custom) {
		if (obj.custom.channel_id) peerId = "" + -obj.custom.channel_id;
		else if (obj.custom.chat_id) peerId = "" + -obj.custom.chat_id;
		else peerId = obj.custom.from_id || "";
	}
	obj.custom.peerId = "" + peerId;
	return obj;
}
function fireNotification(obj, settings, lang) {
	obj = fillPushObject(obj);
	const peerId = obj.custom.peerId;
	let title = obj.title || "Telegram";
	let body = obj.description || "";
	let tag = "peer" + peerId;
	const loginCodeEntity = getLoginCodeEntity(+peerId, body);
	if (loginCodeEntity) body = encodeSpoiler(body, loginCodeEntity).text;
	const messageKey = peerId + "_" + obj.custom.msg_id;
	if (ignoreMessages.has(messageKey)) {
		const error = "ignoring push";
		log.warn(error, obj);
		ignoreMessages.delete(messageKey);
		throw error;
	}
	if (settings?.nopreview || !obj.loc_key) {
		title = "Telegram";
		body = lang.push_message_nopreview;
		tag = "unknown_peer";
	}
	const actions = [userInvisibleIsSupported() && {
		action: "mute1d",
		title: lang.push_action_mute1d
	}];
	const notificationOptions = {
		body,
		icon: NOTIFICATION_ICON_PATH,
		tag,
		data: obj,
		actions: actions.filter(Boolean),
		badge: NOTIFICATION_BADGE_PATH,
		silent: obj.custom.silent === "1"
	};
	log("show notify", title, body, obj, notificationOptions);
	return ctx$4.registration.showNotification(title, notificationOptions).catch((error) => {
		log.error("show notification promise error", error);
		throw error;
	});
}
async function canSaveAccounts() {
	const [isUsingPasscode] = await Promise.all([DeferredIsUsingPasscode.isUsingPasscode()]);
	return !isUsingPasscode;
}
async function onPing(payload, source) {
	localNotificationsAvailable = payload.localNotifications;
	if (pendingNotification && source) {
		serviceMessagePort.invokeVoid("pushClick", pendingNotification, source);
		pendingNotification = void 0;
	}
	if (payload.lang) getter.set("push_lang", payload.lang);
	if (payload.settings) getter.set("push_settings", payload.settings);
	const canSave = await canSaveAccounts();
	getter.set("push_accounts", canSave && payload.accounts || defaults.push_accounts);
	getter.set("push_keys_ids_base64", payload.keysIdsBase64 || defaults.push_keys_ids_base64);
}
function resetPushAccounts() {
	getter.set("push_accounts", defaults.push_accounts);
}
const ignoreMessages = /* @__PURE__ */ new Map();
function onShownNotification(payload) {
	ignoreMessages.set(payload, Date.now());
}
setInterval(() => {
	const time = Date.now();
	ignoreMessages.forEach((_time, key) => {
		if (time - _time > 3e4) ignoreMessages.delete(key);
	});
}, 18e5);
ctx$4.addEventListener("notificationclick", onNotificationClick);
ctx$4.addEventListener("notificationclose", onCloseNotification);
ctx$4.addEventListener("push", onPushEvent);
//#endregion
//#region src/lib/serviceWorker/serviceMessagePort.ts
var ServiceMessagePort = class extends superMessagePort_default {
	constructor() {
		super("SERVICE");
		MOUNT_CLASS_TO && (MOUNT_CLASS_TO.serviceMessagePort = this);
	}
};
//#endregion
//#region src/helpers/listenMessagePort.ts
function listenMessagePort(messagePort, onConnect, onDisconnect) {
	const attachPort = (listenPort, sendPort) => {
		messagePort.attachListenPort(listenPort);
		sendPort && messagePort.attachSendPort(sendPort);
		onConnect?.(listenPort);
	};
	messagePort.setOnPortDisconnect(onDisconnect);
	if (typeof SharedWorkerGlobalScope !== "undefined") ctx$7.addEventListener("connect", (e) => attachPort(e.source, e.source));
	else if (typeof ServiceWorkerGlobalScope !== "undefined") attachPort(ctx$7, null);
	else attachPort(ctx$7, ctx$7);
}
//#endregion
//#region src/lib/serviceWorker/download.ts
const downloadMap = /* @__PURE__ */ new Map();
const DOWNLOAD_ERROR = makeError("UNKNOWN");
self.downloadMap = downloadMap;
const events = {
	download: (payload) => {
		const { id } = payload;
		if (downloadMap.has(id)) return Promise.reject(DOWNLOAD_ERROR);
		const log = logger("DOWNLOAD-" + id);
		log("prepare");
		const strategy = new CountQueuingStrategy({ highWaterMark: 1 });
		const promise = deferredPromise();
		promise.then(() => {
			setTimeout(() => {
				downloadMap.delete(id);
			}, 5e3);
		}, () => {
			downloadMap.delete(id);
		});
		let controller;
		const readable = new ReadableStream({
			start: (_controller) => {
				controller = _controller;
			},
			cancel: (reason) => {
				log("cancel", id, reason);
				promise.reject(DOWNLOAD_ERROR);
			}
		}, strategy);
		const item = {
			...payload,
			readableStream: readable,
			promise,
			controller,
			log
		};
		downloadMap.set(id, item);
		return promise.catch(() => {
			throw DOWNLOAD_ERROR;
		});
	},
	downloadChunk: ({ id, chunk }) => {
		const item = downloadMap.get(id);
		if (!item) return Promise.reject();
		return item.controller.enqueue(chunk);
	},
	downloadFinalize: (id) => {
		const item = downloadMap.get(id);
		if (!item) return Promise.reject();
		item.log("finalize");
		item.promise.resolve();
		return item.controller.close();
	},
	downloadCancel: (id) => {
		const item = downloadMap.get(id);
		if (!item) return;
		item.log("cancel");
		item.promise.reject();
		return item.controller.error();
	}
};
function handleDownload(serviceMessagePort) {
	serviceMessagePort.addMultipleEventsListeners(events);
	return {
		onDownloadFetch: onDownloadFetch$1,
		onClosedWindows: cancelAllDownloads
	};
}
function onDownloadFetch$1(event, params) {
	invokeVoidAll("downloadRequestReceived", params);
	const promise = pause(100).then(() => {
		const item = downloadMap.get(params);
		if (!item || item.used && true) {
			log.warn("no such download", params);
			return;
		}
		item.log("fetch");
		item.used = true;
		const stream = item.readableStream;
		return new Response(stream, {
			headers: item.headers,
			status: 200
		});
	});
	event.respondWith(promise);
}
function cancelAllDownloads() {
	log("cancelling all downloads");
	if (downloadMap.size) for (const [id, item] of downloadMap) item.controller.error();
}
//#endregion
//#region src/lib/serviceWorker/share.ts
const deferred = {};
function parseFormData(formData) {
	return {
		files: formData.getAll("files"),
		title: formData.get("title"),
		text: formData.get("text"),
		url: formData.get("url")
	};
}
async function processShareEvent(formData, clientId) {
	try {
		log("share data", formData);
		const data = parseFormData(formData);
		(deferred[clientId] ?? (deferred[clientId] = [])).push(data);
	} catch (err) {
		log.warn("something wrong with the data", err);
	}
}
function checkWindowClientForDeferredShare(windowClient) {
	const arr = deferred[windowClient.id];
	if (!arr) return;
	delete deferred[windowClient.id];
	log("releasing share events to client:", windowClient.id, "length:", arr.length);
	arr.forEach((data) => {
		serviceMessagePort.invokeVoid("share", data, windowClient);
	});
}
function onShareFetch(event, params) {
	const promise = event.request.formData().then((formData) => {
		processShareEvent(formData, event.resultingClientId);
		return Response.redirect("..");
	});
	event.respondWith(promise);
}
//#endregion
//#region src/lib/rtmp/utils.ts
function findIsoBox(box, type) {
	if (box.type === type) return box;
	if (!box.boxes) return null;
	for (const b of box.boxes) {
		const res = findIsoBox(b, type);
		if (res) return res;
	}
	return null;
}
function isoBoxToBuffer(box) {
	return new Uint8Array(box._raw.buffer, box._raw.byteOffset, box._raw.byteLength);
}
function scaleToChunkTime(scale) {
	if (!Number.isInteger(scale) || Math.abs(scale) > 3) throw new Error(`Invalid stream channel scale: ${scale}`);
	return scale < 0 ? 1e3 << -scale : 1e3 >> scale;
}
//#endregion
//#region src/lib/rtmp/isoboxer.js
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
var ISOBoxer = {};
ISOBoxer.parseBuffer = function(arrayBuffer) {
	return new ISOFile(arrayBuffer).parse();
};
ISOBoxer.addBoxProcessor = function(type, parser) {
	if (typeof type !== "string" || typeof parser !== "function") return;
	ISOBox.prototype._boxProcessors[type] = parser;
};
ISOBoxer.createFile = function() {
	return new ISOFile();
};
ISOBoxer.createBox = function(type, parent, pos) {
	var newBox = ISOBox.create(type);
	if (parent) parent.append(newBox, pos);
	return newBox;
};
ISOBoxer.createFullBox = function(type, parent, pos) {
	var newBox = ISOBoxer.createBox(type, parent, pos);
	newBox.version = 0;
	newBox.flags = 0;
	return newBox;
};
ISOBoxer.Utils = {};
ISOBoxer.Utils.dataViewToString = function(dataView, encoding) {
	var impliedEncoding = encoding || "utf-8";
	if (typeof TextDecoder !== "undefined") return new TextDecoder(impliedEncoding).decode(dataView);
	var a = [];
	var i = 0;
	if (impliedEncoding === "utf-8") while (i < dataView.byteLength) {
		var c = dataView.getUint8(i++);
		if (c < 128) {} else if (c < 224) {
			c = (c & 31) << 6;
			c |= dataView.getUint8(i++) & 63;
		} else if (c < 240) {
			c = (c & 15) << 12;
			c |= (dataView.getUint8(i++) & 63) << 6;
			c |= dataView.getUint8(i++) & 63;
		} else {
			c = (c & 7) << 18;
			c |= (dataView.getUint8(i++) & 63) << 12;
			c |= (dataView.getUint8(i++) & 63) << 6;
			c |= dataView.getUint8(i++) & 63;
		}
		a.push(String.fromCharCode(c));
	}
	else while (i < dataView.byteLength) a.push(String.fromCharCode(dataView.getUint8(i++)));
	return a.join("");
};
ISOBoxer.Utils.utf8ToByteArray = function(string) {
	var u, i;
	if (typeof TextEncoder !== "undefined") u = new TextEncoder().encode(string);
	else {
		u = [];
		for (i = 0; i < string.length; ++i) {
			var c = string.charCodeAt(i);
			if (c < 128) u.push(c);
			else if (c < 2048) {
				u.push(192 | c >> 6);
				u.push(128 | 63 & c);
			} else if (c < 65536) {
				u.push(224 | c >> 12);
				u.push(128 | 63 & c >> 6);
				u.push(128 | 63 & c);
			} else {
				u.push(240 | c >> 18);
				u.push(128 | 63 & c >> 12);
				u.push(128 | 63 & c >> 6);
				u.push(128 | 63 & c);
			}
		}
	}
	return u;
};
ISOBoxer.Utils.appendBox = function(parent, box, pos) {
	box._offset = parent._cursor.offset;
	box._root = parent._root ? parent._root : parent;
	box._raw = parent._raw;
	box._parent = parent;
	if (pos === -1) return;
	if (pos === void 0 || pos === null) {
		parent.boxes.push(box);
		return;
	}
	var index = -1, type;
	if (typeof pos === "number") index = pos;
	else {
		if (typeof pos === "string") type = pos;
		else if (typeof pos === "object" && pos.type) type = pos.type;
		else {
			parent.boxes.push(box);
			return;
		}
		for (var i = 0; i < parent.boxes.length; i++) if (type === parent.boxes[i].type) {
			index = i + 1;
			break;
		}
	}
	parent.boxes.splice(index, 0, box);
};
ISOBoxer.Cursor = function(initialOffset) {
	this.offset = typeof initialOffset == "undefined" ? 0 : initialOffset;
};
var ISOFile = function(arrayBuffer) {
	this._cursor = new ISOBoxer.Cursor();
	this.boxes = [];
	if (arrayBuffer) this._raw = new DataView(arrayBuffer);
};
ISOFile.prototype.fetch = function(type) {
	var result = this.fetchAll(type, true);
	return result.length ? result[0] : null;
};
ISOFile.prototype.fetchAll = function(type, returnEarly) {
	var result = [];
	ISOFile._sweep.call(this, type, result, returnEarly);
	return result;
};
ISOFile.prototype.parse = function() {
	this._cursor.offset = 0;
	this.boxes = [];
	while (this._cursor.offset < this._raw.byteLength) {
		var box = ISOBox.parse(this);
		if (typeof box.type === "undefined") break;
		this.boxes.push(box);
	}
	return this;
};
ISOFile._sweep = function(type, result, returnEarly) {
	if (this.type && this.type == type) result.push(this);
	for (var box in this.boxes) {
		if (result.length && returnEarly) return;
		ISOFile._sweep.call(this.boxes[box], type, result, returnEarly);
	}
};
ISOFile.prototype.write = function() {
	var length = 0, i = 0;
	for (; i < this.boxes.length; i++) length += this.boxes[i].getLength(false);
	var bytes = new Uint8Array(length);
	this._rawo = new DataView(bytes.buffer);
	this.bytes = bytes;
	this._cursor.offset = 0;
	for (i = 0; i < this.boxes.length; i++) this.boxes[i].write();
	return bytes.buffer;
};
ISOFile.prototype.append = function(box, pos) {
	ISOBoxer.Utils.appendBox(this, box, pos);
};
var ISOBox = function() {
	this._cursor = new ISOBoxer.Cursor();
};
ISOBox.parse = function(parent) {
	var newBox = new ISOBox();
	newBox._offset = parent._cursor.offset;
	newBox._root = parent._root ? parent._root : parent;
	newBox._raw = parent._raw;
	newBox._parent = parent;
	newBox._parseBox();
	parent._cursor.offset = newBox._raw.byteOffset + newBox._raw.byteLength;
	return newBox;
};
ISOBox.create = function(type) {
	var newBox = new ISOBox();
	newBox.type = type;
	newBox.boxes = [];
	return newBox;
};
ISOBox.prototype._boxContainers = [
	"dinf",
	"edts",
	"mdia",
	"meco",
	"mfra",
	"minf",
	"moof",
	"moov",
	"mvex",
	"stbl",
	"strk",
	"traf",
	"trak",
	"tref",
	"udta",
	"vttc",
	"sinf",
	"schi",
	"encv",
	"enca",
	"ilst"
];
ISOBox.prototype._boxProcessors = {};
ISOBox.prototype._procField = function(name, type, size) {
	if (this._parsing) this[name] = this._readField(type, size);
	else this._writeField(type, size, this[name]);
};
ISOBox.prototype._procFieldArray = function(name, length, type, size) {
	var i;
	if (this._parsing) {
		this[name] = [];
		for (i = 0; i < length; i++) this[name][i] = this._readField(type, size);
	} else for (i = 0; i < this[name].length; i++) this._writeField(type, size, this[name][i]);
};
ISOBox.prototype._procFullBox = function() {
	this._procField("version", "uint", 8);
	this._procField("flags", "uint", 24);
};
ISOBox.prototype._procEntries = function(name, length, fn) {
	var i;
	if (this._parsing) {
		this[name] = [];
		for (i = 0; i < length; i++) {
			this[name].push({});
			fn.call(this, this[name][i]);
		}
	} else for (i = 0; i < length; i++) fn.call(this, this[name][i]);
};
ISOBox.prototype._procSubEntries = function(entry, name, length, fn) {
	var i;
	if (this._parsing) {
		entry[name] = [];
		for (i = 0; i < length; i++) {
			entry[name].push({});
			fn.call(this, entry[name][i]);
		}
	} else for (i = 0; i < length; i++) fn.call(this, entry[name][i]);
};
ISOBox.prototype._procEntryField = function(entry, name, type, size) {
	if (this._parsing) entry[name] = this._readField(type, size);
	else this._writeField(type, size, entry[name]);
};
ISOBox.prototype._procSubBoxes = function(name, length = -1) {
	const untilEnd = length === -1;
	var i;
	if (this._parsing) {
		if (untilEnd) length = Infinity;
		const end = this._offset + this.size;
		this[name] = [];
		for (i = 0; i < length; i++) {
			this[name].push(ISOBox.parse(this));
			if (untilEnd && this._cursor.offset >= end) break;
		}
	} else {
		if (untilEnd) length = this[name].length;
		for (i = 0; i < length; i++) if (this._rawo) this[name][i].write();
		else this.size += this[name][i].getLength();
	}
};
ISOBox.prototype._readField = function(type, size) {
	switch (type) {
		case "uint": return this._readUint(size);
		case "int": return this._readInt(size);
		case "template": return this._readTemplate(size);
		case "string": return size === -1 ? this._readTerminatedString() : this._readString(size);
		case "data": return this._readData(size);
		case "utf8": return this._readUTF8String();
		default: return -1;
	}
};
ISOBox.prototype._readInt = function(size) {
	var result = null, offset = this._cursor.offset - this._raw.byteOffset;
	switch (size) {
		case 8:
			result = this._raw.getInt8(offset);
			break;
		case 16:
			result = this._raw.getInt16(offset);
			break;
		case 32:
			result = this._raw.getInt32(offset);
			break;
		case 64: {
			const hi = this._raw.getInt32(offset);
			const lo = this._raw.getInt32(offset + 4);
			result = (0, import_BigInteger.default)(hi).shiftLeft(32).add(lo);
			break;
		}
	}
	this._cursor.offset += size >> 3;
	return result;
};
ISOBox.prototype._readUint = function(size) {
	var result = null, offset = this._cursor.offset - this._raw.byteOffset, s1, s2;
	switch (size) {
		case 8:
			result = this._raw.getUint8(offset);
			break;
		case 16:
			result = this._raw.getUint16(offset);
			break;
		case 24:
			s1 = this._raw.getUint16(offset);
			s2 = this._raw.getUint8(offset + 2);
			result = (s1 << 8) + s2;
			break;
		case 32:
			result = this._raw.getUint32(offset);
			break;
		case 64: {
			const hi = this._raw.getUint32(offset);
			const lo = this._raw.getUint32(offset + 4);
			result = (0, import_BigInteger.default)(hi).shiftLeft(32).add(lo);
			break;
		}
	}
	this._cursor.offset += size >> 3;
	return result;
};
ISOBox.prototype._readString = function(length) {
	var str = "";
	for (var c = 0; c < length; c++) {
		var char = this._readUint(8);
		str += String.fromCharCode(char);
	}
	return str;
};
ISOBox.prototype._readTemplate = function(size) {
	return this._readUint(size / 2) + this._readUint(size / 2) / Math.pow(2, size / 2);
};
ISOBox.prototype._readTerminatedString = function() {
	var str = "";
	while (this._cursor.offset - this._offset < this._raw.byteLength) {
		var char = this._readUint(8);
		if (char === 0) break;
		str += String.fromCharCode(char);
	}
	return str;
};
ISOBox.prototype._readData = function(size) {
	var length = size > 0 ? size : this._raw.byteLength - (this._cursor.offset - this._offset);
	if (length > 0) {
		var data = new Uint8Array(this._raw.buffer, this._cursor.offset, length);
		this._cursor.offset += length;
		return data;
	} else return null;
};
ISOBox.prototype._readUTF8String = function() {
	var length = this._raw.byteLength - (this._cursor.offset - this._offset);
	var data = null;
	if (length > 0) {
		data = new DataView(this._raw.buffer, this._cursor.offset, length);
		this._cursor.offset += length;
	}
	return data ? ISOBoxer.Utils.dataViewToString(data) : data;
};
ISOBox.prototype._parseBox = function() {
	this._parsing = true;
	this._cursor.offset = this._offset;
	if (this._offset + 8 > this._raw.buffer.byteLength) {
		this._root._incomplete = true;
		return;
	}
	this._procField("size", "uint", 32);
	this._procField("type", "string", 4);
	if (this.size === 1) this._procField("largesize", "uint", 64);
	if (this.type === "uuid") this._procFieldArray("usertype", 16, "uint", 8);
	switch (this.size) {
		case 0:
			this._raw = new DataView(this._raw.buffer, this._offset);
			break;
		case 1:
			if (this._offset + this.size > this._raw.buffer.byteLength) {
				this._incomplete = true;
				this._root._incomplete = true;
			} else this._raw = new DataView(this._raw.buffer, this._offset, this.largesize);
			break;
		default: if (this._offset + this.size > this._raw.buffer.byteLength) {
			this._incomplete = true;
			this._root._incomplete = true;
		} else this._raw = new DataView(this._raw.buffer, this._offset, this.size);
	}
	if (!this._incomplete) {
		if (this._boxProcessors[this.type]) this._boxProcessors[this.type].call(this);
		if (this._boxContainers.indexOf(this.type) !== -1) this._parseContainerBox();
		else this._data = this._readData();
	}
};
ISOBox.prototype._parseFullBox = function() {
	this.version = this._readUint(8);
	this.flags = this._readUint(24);
};
ISOBox.prototype._parseContainerBox = function() {
	this.boxes = [];
	while (this._cursor.offset - this._raw.byteOffset < this._raw.byteLength) this.boxes.push(ISOBox.parse(this));
};
ISOBox.prototype.append = function(box, pos) {
	ISOBoxer.Utils.appendBox(this, box, pos);
};
ISOBox.prototype.getLength = function() {
	this._parsing = false;
	this._rawo = null;
	this.size = 0;
	this._procField("size", "uint", 32);
	this._procField("type", "string", 4);
	if (this.size === 1) this._procField("largesize", "uint", 64);
	if (this.type === "uuid") this._procFieldArray("usertype", 16, "uint", 8);
	if (this._boxProcessors[this.type]) this._boxProcessors[this.type].call(this);
	if (this._boxContainers.indexOf(this.type) !== -1) for (var i = 0; i < this.boxes.length; i++) this.size += this.boxes[i].getLength();
	if (this._data) this._writeData(this._data);
	return this.size;
};
ISOBox.prototype.write = function() {
	this._parsing = false;
	if (!this._parent) throw new Error(`no root at ${this.type}`);
	this._cursor.offset = this._parent._cursor.offset;
	switch (this.size) {
		case 0:
			this._rawo = new DataView(this._parent._rawo.buffer, this._cursor.offset, this.parent._rawo.byteLength - this._cursor.offset);
			break;
		case 1:
			this._rawo = new DataView(this._parent._rawo.buffer, this._cursor.offset, this.largesize);
			break;
		default:
			if (!this._parent._rawo) console.log(this.type);
			this._rawo = new DataView(this._parent._rawo.buffer, this._cursor.offset, this.size);
	}
	this._procField("size", "uint", 32);
	this._procField("type", "string", 4);
	if (this.size === 1) this._procField("largesize", "uint", 64);
	if (this.type === "uuid") this._procFieldArray("usertype", 16, "uint", 8);
	if (this._boxProcessors[this.type]) this._boxProcessors[this.type].call(this);
	if (this._boxContainers.indexOf(this.type) !== -1) for (var i = 0; i < this.boxes.length; i++) this.boxes[i].write();
	if (this._data) this._writeData(this._data);
	this._parent._cursor.offset += this.size;
	return this.size;
};
ISOBox.prototype._writeInt = function(size, value) {
	if (this._rawo) {
		var offset = this._cursor.offset - this._rawo.byteOffset;
		switch (size) {
			case 8:
				this._rawo.setInt8(offset, value);
				break;
			case 16:
				this._rawo.setInt16(offset, value);
				break;
			case 32:
				this._rawo.setInt32(offset, value);
				break;
			case 64:
				this._rawo.setUint32(offset, value.shiftRight(32).and(4294967295).toJSNumber());
				this._rawo.setUint32(offset + 4, value.and(4294967295).toJSNumber());
		}
		this._cursor.offset += size >> 3;
	} else this.size += size >> 3;
};
ISOBox.prototype._writeUint = function(size, value) {
	if (this._rawo) {
		var offset = this._cursor.offset - this._rawo.byteOffset, s1, s2;
		switch (size) {
			case 8:
				this._rawo.setUint8(offset, value);
				break;
			case 16:
				this._rawo.setUint16(offset, value);
				break;
			case 24:
				s1 = (value & 16776960) >> 8;
				s2 = value & 255;
				this._rawo.setUint16(offset, s1);
				this._rawo.setUint8(offset + 2, s2);
				break;
			case 32:
				this._rawo.setUint32(offset, value);
				break;
			case 64:
				this._rawo.setUint32(offset, value.shiftRight(32).and(4294967295).toJSNumber());
				this._rawo.setUint32(offset + 4, value.and(4294967295).toJSNumber());
		}
		this._cursor.offset += size >> 3;
	} else this.size += size >> 3;
};
ISOBox.prototype._writeString = function(size, str) {
	for (var c = 0; c < size; c++) this._writeUint(8, str.charCodeAt(c));
};
ISOBox.prototype._writeTerminatedString = function(str) {
	if (str.length === 0) return;
	for (var c = 0; c < str.length; c++) this._writeUint(8, str.charCodeAt(c));
	this._writeUint(8, 0);
};
ISOBox.prototype._writeTemplate = function(size, value) {
	var pre = Math.floor(value);
	var post = (value - pre) * Math.pow(2, size / 2);
	this._writeUint(size / 2, pre);
	this._writeUint(size / 2, post);
};
ISOBox.prototype._writeData = function(data) {
	var i;
	if (data) {
		if (this._rawo) {
			if (data instanceof Array) {
				var offset = this._cursor.offset - this._rawo.byteOffset;
				for (var i = 0; i < data.length; i++) this._rawo.setInt8(offset + i, data[i]);
				this._cursor.offset += data.length;
			}
			if (data instanceof Uint8Array) {
				this._root.bytes.set(data, this._cursor.offset);
				this._cursor.offset += data.length;
			}
		} else this.size += data.length;
	}
};
ISOBox.prototype._writeUTF8String = function(string) {
	var u = ISOBoxer.Utils.utf8ToByteArray(string);
	if (this._rawo) {
		var dataView = new DataView(this._rawo.buffer, this._cursor.offset, u.length);
		for (var i = 0; i < u.length; i++) dataView.setUint8(i, u[i]);
	} else this.size += u.length;
};
ISOBox.prototype._writeField = function(type, size, value) {
	switch (type) {
		case "uint":
			this._writeUint(size, value);
			break;
		case "int":
			this._writeInt(size, value);
			break;
		case "template":
			this._writeTemplate(size, value);
			break;
		case "string":
			if (size == -1) this._writeTerminatedString(value);
			else this._writeString(size, value);
			break;
		case "data":
			this._writeData(value);
			break;
		case "utf8": this._writeUTF8String(value);
	}
};
ISOBox.prototype._boxProcessors["avc1"] = ISOBox.prototype._boxProcessors["avc2"] = ISOBox.prototype._boxProcessors["avc3"] = ISOBox.prototype._boxProcessors["avc4"] = ISOBox.prototype._boxProcessors["hvc1"] = ISOBox.prototype._boxProcessors["hev1"] = ISOBox.prototype._boxProcessors["encv"] = function() {
	this._procFieldArray("reserved1", 6, "uint", 8);
	this._procField("data_reference_index", "uint", 16);
	this._procField("pre_defined1", "uint", 16);
	this._procField("reserved2", "uint", 16);
	this._procFieldArray("pre_defined2", 3, "uint", 32);
	this._procField("width", "uint", 16);
	this._procField("height", "uint", 16);
	this._procField("horizresolution", "template", 32);
	this._procField("vertresolution", "template", 32);
	this._procField("reserved3", "uint", 32);
	this._procField("frame_count", "uint", 16);
	this._procFieldArray("compressorname", 32, "uint", 8);
	this._procField("depth", "uint", 16);
	this._procField("pre_defined3", "int", 16);
	this._procField("config", "data", -1);
};
ISOBox.prototype._boxProcessors["ctts"] = function() {
	this._procFullBox();
	this._procField("entry_count", "uint", 32);
	this._procEntries("entries", this.entry_count, function(entry) {
		this._procEntryField(entry, "sample_count", "uint", 32);
		this._procEntryField(entry, "sample_offset", this.version === 1 ? "int" : "uint", 32);
	});
};
ISOBox.prototype._boxProcessors["dref"] = function() {
	this._procFullBox();
	this._procField("entry_count", "uint", 32);
	this._procSubBoxes("entries", this.entry_count);
};
ISOBox.prototype._boxProcessors["elst"] = function() {
	this._procFullBox();
	this._procField("entry_count", "uint", 32);
	this._procEntries("entries", this.entry_count, function(entry) {
		this._procEntryField(entry, "segment_duration", "uint", this.version === 1 ? 64 : 32);
		this._procEntryField(entry, "media_time", "int", this.version === 1 ? 64 : 32);
		this._procEntryField(entry, "media_rate_integer", "int", 16);
		this._procEntryField(entry, "media_rate_fraction", "int", 16);
	});
};
ISOBox.prototype._boxProcessors["emsg"] = function() {
	this._procFullBox();
	if (this.version == 1) {
		this._procField("timescale", "uint", 32);
		this._procField("presentation_time", "uint", 64);
		this._procField("event_duration", "uint", 32);
		this._procField("id", "uint", 32);
		this._procField("scheme_id_uri", "string", -1);
		this._procField("value", "string", -1);
	} else {
		this._procField("scheme_id_uri", "string", -1);
		this._procField("value", "string", -1);
		this._procField("timescale", "uint", 32);
		this._procField("presentation_time_delta", "uint", 32);
		this._procField("event_duration", "uint", 32);
		this._procField("id", "uint", 32);
	}
	this._procField("message_data", "data", -1);
};
ISOBox.prototype._boxProcessors["free"] = ISOBox.prototype._boxProcessors["skip"] = function() {
	this._procField("data", "data", -1);
};
ISOBox.prototype._boxProcessors["frma"] = function() {
	this._procField("data_format", "uint", 32);
};
ISOBox.prototype._boxProcessors["ftyp"] = ISOBox.prototype._boxProcessors["styp"] = function() {
	this._procField("major_brand", "string", 4);
	this._procField("minor_version", "uint", 32);
	var nbCompatibleBrands = -1;
	if (this._parsing) nbCompatibleBrands = (this._raw.byteLength - (this._cursor.offset - this._raw.byteOffset)) / 4;
	this._procFieldArray("compatible_brands", nbCompatibleBrands, "string", 4);
};
ISOBox.prototype._boxProcessors["hdlr"] = function() {
	this._procFullBox();
	this._procField("pre_defined", "uint", 32);
	this._procField("handler_type", "string", 4);
	this._procFieldArray("reserved", 3, "uint", 32);
	this._procField("name", "string", -1);
};
ISOBox.prototype._boxProcessors["mdat"] = function() {
	this._procField("data", "data", -1);
};
ISOBox.prototype._boxProcessors["mdhd"] = function() {
	this._procFullBox();
	this._procField("creation_time", "uint", this.version == 1 ? 64 : 32);
	this._procField("modification_time", "uint", this.version == 1 ? 64 : 32);
	this._procField("timescale", "uint", 32);
	this._procField("duration", "uint", this.version == 1 ? 64 : 32);
	if (!this._parsing && typeof this.language === "string") this.language = this.language.charCodeAt(0) - 96 << 10 | this.language.charCodeAt(1) - 96 << 5 | this.language.charCodeAt(2) - 96;
	this._procField("language", "uint", 16);
	if (this._parsing) this.language = String.fromCharCode((this.language >> 10 & 31) + 96, (this.language >> 5 & 31) + 96, (this.language & 31) + 96);
	this._procField("pre_defined", "uint", 16);
};
ISOBox.prototype._boxProcessors["mehd"] = function() {
	this._procFullBox();
	this._procField("fragment_duration", "uint", this.version == 1 ? 64 : 32);
};
ISOBox.prototype._boxProcessors["mfhd"] = function() {
	this._procFullBox();
	this._procField("sequence_number", "uint", 32);
};
ISOBox.prototype._boxProcessors["mfro"] = function() {
	this._procFullBox();
	this._procField("mfra_size", "uint", 32);
};
ISOBox.prototype._boxProcessors["mp4a"] = ISOBox.prototype._boxProcessors["enca"] = function() {
	this._procFieldArray("reserved1", 6, "uint", 8);
	this._procField("data_reference_index", "uint", 16);
	this._procFieldArray("reserved2", 2, "uint", 32);
	this._procField("channelcount", "uint", 16);
	this._procField("samplesize", "uint", 16);
	this._procField("pre_defined", "uint", 16);
	this._procField("reserved3", "uint", 16);
	this._procField("samplerate", "template", 32);
	this._procSubBoxes("esds", 1);
};
ISOBox.prototype._boxProcessors["mvhd"] = function() {
	this._procFullBox();
	this._procField("creation_time", "uint", this.version == 1 ? 64 : 32);
	this._procField("modification_time", "uint", this.version == 1 ? 64 : 32);
	this._procField("timescale", "uint", 32);
	this._procField("duration", "uint", this.version == 1 ? 64 : 32);
	this._procField("rate", "template", 32);
	this._procField("volume", "template", 16);
	this._procField("reserved1", "uint", 16);
	this._procFieldArray("reserved2", 2, "uint", 32);
	this._procFieldArray("matrix", 9, "template", 32);
	this._procFieldArray("pre_defined", 6, "uint", 32);
	this._procField("next_track_ID", "uint", 32);
};
ISOBox.prototype._boxProcessors["payl"] = function() {
	this._procField("cue_text", "utf8");
};
ISOBox.prototype._boxProcessors["prft"] = function() {
	this._procFullBox();
	this._procField("reference_track_ID", "uint", 32);
	this._procField("ntp_timestamp_sec", "uint", 32);
	this._procField("ntp_timestamp_frac", "uint", 32);
	this._procField("media_time", "uint", this.version == 1 ? 64 : 32);
};
ISOBox.prototype._boxProcessors["pssh"] = function() {
	this._procFullBox();
	this._procFieldArray("SystemID", 16, "uint", 8);
	this._procField("DataSize", "uint", 32);
	this._procFieldArray("Data", this.DataSize, "uint", 8);
};
ISOBox.prototype._boxProcessors["schm"] = function() {
	this._procFullBox();
	this._procField("scheme_type", "uint", 32);
	this._procField("scheme_version", "uint", 32);
	if (this.flags & 1) this._procField("scheme_uri", "string", -1);
};
ISOBox.prototype._boxProcessors["sdtp"] = function() {
	this._procFullBox();
	var sample_count = -1;
	if (this._parsing) sample_count = this._raw.byteLength - (this._cursor.offset - this._raw.byteOffset);
	this._procFieldArray("sample_dependency_table", sample_count, "uint", 8);
};
ISOBox.prototype._boxProcessors["sidx"] = function() {
	this._procFullBox();
	this._procField("reference_ID", "uint", 32);
	this._procField("timescale", "uint", 32);
	this._procField("earliest_presentation_time", "uint", this.version == 1 ? 64 : 32);
	this._procField("first_offset", "uint", this.version == 1 ? 64 : 32);
	this._procField("reserved", "uint", 16);
	this._procField("reference_count", "uint", 16);
	this._procEntries("references", this.reference_count, function(entry) {
		if (!this._parsing) {
			entry.reference = (entry.reference_type & 1) << 31;
			entry.reference |= entry.referenced_size & 2147483647;
			entry.sap = (entry.starts_with_SAP & 1) << 31;
			entry.sap |= (entry.SAP_type & 3) << 28;
			entry.sap |= entry.SAP_delta_time & 268435455;
		}
		this._procEntryField(entry, "reference", "uint", 32);
		this._procEntryField(entry, "subsegment_duration", "uint", 32);
		this._procEntryField(entry, "sap", "uint", 32);
		if (this._parsing) {
			entry.reference_type = entry.reference >> 31 & 1;
			entry.referenced_size = entry.reference & 2147483647;
			entry.starts_with_SAP = entry.sap >> 31 & 1;
			entry.SAP_type = entry.sap >> 28 & 7;
			entry.SAP_delta_time = entry.sap & 268435455;
		}
	});
};
ISOBox.prototype._boxProcessors["smhd"] = function() {
	this._procFullBox();
	this._procField("balance", "uint", 16);
	this._procField("reserved", "uint", 16);
};
ISOBox.prototype._boxProcessors["ssix"] = function() {
	this._procFullBox();
	this._procField("subsegment_count", "uint", 32);
	this._procEntries("subsegments", this.subsegment_count, function(subsegment) {
		this._procEntryField(subsegment, "ranges_count", "uint", 32);
		this._procSubEntries(subsegment, "ranges", subsegment.ranges_count, function(range) {
			this._procEntryField(range, "level", "uint", 8);
			this._procEntryField(range, "range_size", "uint", 24);
		});
	});
};
ISOBox.prototype._boxProcessors["stsd"] = function() {
	this._procFullBox();
	this._procField("entry_count", "uint", 32);
	this._procSubBoxes("entries", this.entry_count);
};
ISOBox.prototype._boxProcessors["stts"] = function() {
	this._procFullBox();
	this._procField("entry_count", "uint", 32);
	this._procEntries("entries", this.entry_count, function(entry) {
		this._procEntryField(entry, "sample_count", "uint", 32);
		this._procEntryField(entry, "sample_delta", "uint", 32);
	});
};
ISOBox.prototype._boxProcessors["subs"] = function() {
	this._procFullBox();
	this._procField("entry_count", "uint", 32);
	this._procEntries("entries", this.entry_count, function(entry) {
		this._procEntryField(entry, "sample_delta", "uint", 32);
		this._procEntryField(entry, "subsample_count", "uint", 16);
		this._procSubEntries(entry, "subsamples", entry.subsample_count, function(subsample) {
			this._procEntryField(subsample, "subsample_size", "uint", this.version === 1 ? 32 : 16);
			this._procEntryField(subsample, "subsample_priority", "uint", 8);
			this._procEntryField(subsample, "discardable", "uint", 8);
			this._procEntryField(subsample, "codec_specific_parameters", "uint", 32);
		});
	});
};
ISOBox.prototype._boxProcessors["tenc"] = function() {
	this._procFullBox();
	this._procField("default_IsEncrypted", "uint", 24);
	this._procField("default_IV_size", "uint", 8);
	this._procFieldArray("default_KID", 16, "uint", 8);
};
ISOBox.prototype._boxProcessors["tfdt"] = function() {
	this._procFullBox();
	this._procField("baseMediaDecodeTime", "uint", this.version == 1 ? 64 : 32);
};
ISOBox.prototype._boxProcessors["tfhd"] = function() {
	this._procFullBox();
	this._procField("track_ID", "uint", 32);
	if (this.flags & 1) this._procField("base_data_offset", "uint", 64);
	if (this.flags & 2) this._procField("sample_description_offset", "uint", 32);
	if (this.flags & 8) this._procField("default_sample_duration", "uint", 32);
	if (this.flags & 16) this._procField("default_sample_size", "uint", 32);
	if (this.flags & 32) this._procField("default_sample_flags", "uint", 32);
};
ISOBox.prototype._boxProcessors["tfra"] = function() {
	this._procFullBox();
	this._procField("track_ID", "uint", 32);
	if (!this._parsing) {
		this.reserved = 0;
		this.reserved |= (this.length_size_of_traf_num & 48) << 4;
		this.reserved |= (this.length_size_of_trun_num & 12) << 2;
		this.reserved |= this.length_size_of_sample_num & 3;
	}
	this._procField("reserved", "uint", 32);
	if (this._parsing) {
		this.length_size_of_traf_num = (this.reserved & 48) >> 4;
		this.length_size_of_trun_num = (this.reserved & 12) >> 2;
		this.length_size_of_sample_num = this.reserved & 3;
	}
	this._procField("number_of_entry", "uint", 32);
	this._procEntries("entries", this.number_of_entry, function(entry) {
		this._procEntryField(entry, "time", "uint", this.version === 1 ? 64 : 32);
		this._procEntryField(entry, "moof_offset", "uint", this.version === 1 ? 64 : 32);
		this._procEntryField(entry, "traf_number", "uint", (this.length_size_of_traf_num + 1) * 8);
		this._procEntryField(entry, "trun_number", "uint", (this.length_size_of_trun_num + 1) * 8);
		this._procEntryField(entry, "sample_number", "uint", (this.length_size_of_sample_num + 1) * 8);
	});
};
ISOBox.prototype._boxProcessors["tkhd"] = function() {
	this._procFullBox();
	this._procField("creation_time", "uint", this.version == 1 ? 64 : 32);
	this._procField("modification_time", "uint", this.version == 1 ? 64 : 32);
	this._procField("track_ID", "uint", 32);
	this._procField("reserved1", "uint", 32);
	this._procField("duration", "uint", this.version == 1 ? 64 : 32);
	this._procFieldArray("reserved2", 2, "uint", 32);
	this._procField("layer", "uint", 16);
	this._procField("alternate_group", "uint", 16);
	this._procField("volume", "template", 16);
	this._procField("reserved3", "uint", 16);
	this._procFieldArray("matrix", 9, "template", 32);
	this._procField("width", "template", 32);
	this._procField("height", "template", 32);
};
ISOBox.prototype._boxProcessors["trex"] = function() {
	this._procFullBox();
	this._procField("track_ID", "uint", 32);
	this._procField("default_sample_description_index", "uint", 32);
	this._procField("default_sample_duration", "uint", 32);
	this._procField("default_sample_size", "uint", 32);
	this._procField("default_sample_flags", "uint", 32);
};
ISOBox.prototype._boxProcessors["trun"] = function() {
	this._procFullBox();
	this._procField("sample_count", "uint", 32);
	if (this.flags & 1) this._procField("data_offset", "int", 32);
	if (this.flags & 4) this._procField("first_sample_flags", "uint", 32);
	this._procEntries("samples", this.sample_count, function(sample) {
		if (this.flags & 256) this._procEntryField(sample, "sample_duration", "uint", 32);
		if (this.flags & 512) this._procEntryField(sample, "sample_size", "uint", 32);
		if (this.flags & 1024) this._procEntryField(sample, "sample_flags", "uint", 32);
		if (this.flags & 2048) this._procEntryField(sample, "sample_composition_time_offset", this.version === 1 ? "int" : "uint", 32);
	});
};
ISOBox.prototype._boxProcessors["url "] = ISOBox.prototype._boxProcessors["urn "] = function() {
	this._procFullBox();
	if (this.type === "urn ") this._procField("name", "string", -1);
	this._procField("location", "string", -1);
};
ISOBox.prototype._boxProcessors["vlab"] = function() {
	this._procField("source_label", "utf8");
};
ISOBox.prototype._boxProcessors["vmhd"] = function() {
	this._procFullBox();
	this._procField("graphicsmode", "uint", 16);
	this._procFieldArray("opcolor", 3, "uint", 16);
};
ISOBox.prototype._boxProcessors["vttC"] = function() {
	this._procField("config", "utf8");
};
ISOBox.prototype._boxProcessors["vtte"] = function() {};
ISOBox.prototype._boxProcessors["stco"] = function() {
	this._procFullBox();
	this._procField("entry_count", "uint", 32);
	this._procFieldArray("chunk_offsets", this.entry_count, "uint", 32);
};
ISOBox.prototype._boxProcessors["stsz"] = function() {
	this._procFullBox();
	this._procField("sample_size", "uint", 32);
	this._procField("sample_count", "uint", 32);
	if (this.sample_size === 0) this._procFieldArray("entry_sizes", this.sample_count, "uint", 32);
};
ISOBox.prototype._boxProcessors["stsc"] = function() {
	this._procFullBox();
	this._procField("entry_count", "uint", 32);
	this._procEntries("entries", this.entry_count, function(entry) {
		this._procEntryField(entry, "first_chunk", "uint", 32);
		this._procEntryField(entry, "samples_per_chunk", "uint", 32);
		this._procEntryField(entry, "sample_description_index", "uint", 32);
	});
};
ISOBox.prototype._boxProcessors["stss"] = function() {
	this._procFullBox();
	this._procField("entry_count", "uint", 32);
	this._procFieldArray("sample_numbers", this.entry_count, "uint", 32);
};
ISOBox.prototype._boxProcessors["hdlr"] = function() {
	this._procFullBox();
	this._procField("pre_defined", "uint", 32);
	this._procField("handler_type", "string", 4);
	this._procFieldArray("reserved", 3, "uint", 32);
	this._procField("name", "string", -1);
};
ISOBox.prototype._boxProcessors["Opus"] = function() {
	this._procFieldArray("reserved1", 3, "uint", 16);
	this._procField("data_reference_index", "uint", 16);
	this._procFieldArray("reserved2", 2, "uint", 32);
	this._procField("channel_count", "uint", 16);
	this._procField("sample_size", "uint", 16);
	this._procFieldArray("reserved3", 2, "uint", 16);
	this._procField("samplerate", "template", 32);
	this._procSubBoxes("entries");
};
ISOBox.prototype._boxProcessors["dOps"] = function() {
	this._procField("version", "int", 8);
	this._procField("output_channel_count", "uint", 8);
	this._procField("pre_skip", "uint", 16);
	this._procField("input_sample_rate", "uint", 32);
	this._procField("output_gain", "uint", 16);
	this._procField("channel_mapping_family", "uint", 8);
	if (this.channel_mapping_family !== 0) {
		this._procField("stream_count", "uint", 8);
		this._procField("coupled_count", "uint", 8);
		this._procFieldArray("channel_mapping", this.output_channel_count, "uint", 8);
	}
};
ISOBox.prototype._boxProcessors["fLaC"] = function() {
	this._procFieldArray("reserved1", 3, "uint", 16);
	this._procField("data_reference_index", "uint", 16);
	this._procFieldArray("reserved2", 2, "uint", 32);
	this._procField("channel_count", "uint", 16);
	this._procField("sample_size", "uint", 16);
	this._procFieldArray("reserved3", 2, "uint", 16);
	this._procField("sample_rate", "template", 32);
	this._procSubBoxes("entries");
};
ISOBox.prototype._boxProcessors["dfLa"] = function() {
	this._procFullBox();
};
ISOBox.prototype._boxProcessors["btrt"] = function() {
	this._procField("bufferSizeDB", "uint", 32);
	this._procField("maxBitrate", "uint", 32);
	this._procField("avgBitrate", "uint", 32);
};
//#endregion
//#region src/lib/rtmp/flac-crc.ts
const CRC8_TABLE = new Uint8Array([
	0,
	7,
	14,
	9,
	28,
	27,
	18,
	21,
	56,
	63,
	54,
	49,
	36,
	35,
	42,
	45,
	112,
	119,
	126,
	121,
	108,
	107,
	98,
	101,
	72,
	79,
	70,
	65,
	84,
	83,
	90,
	93,
	224,
	231,
	238,
	233,
	252,
	251,
	242,
	245,
	216,
	223,
	214,
	209,
	196,
	195,
	202,
	205,
	144,
	151,
	158,
	153,
	140,
	139,
	130,
	133,
	168,
	175,
	166,
	161,
	180,
	179,
	186,
	189,
	199,
	192,
	201,
	206,
	219,
	220,
	213,
	210,
	255,
	248,
	241,
	246,
	227,
	228,
	237,
	234,
	183,
	176,
	185,
	190,
	171,
	172,
	165,
	162,
	143,
	136,
	129,
	134,
	147,
	148,
	157,
	154,
	39,
	32,
	41,
	46,
	59,
	60,
	53,
	50,
	31,
	24,
	17,
	22,
	3,
	4,
	13,
	10,
	87,
	80,
	89,
	94,
	75,
	76,
	69,
	66,
	111,
	104,
	97,
	102,
	115,
	116,
	125,
	122,
	137,
	142,
	135,
	128,
	149,
	146,
	155,
	156,
	177,
	182,
	191,
	184,
	173,
	170,
	163,
	164,
	249,
	254,
	247,
	240,
	229,
	226,
	235,
	236,
	193,
	198,
	207,
	200,
	221,
	218,
	211,
	212,
	105,
	110,
	103,
	96,
	117,
	114,
	123,
	124,
	81,
	86,
	95,
	88,
	77,
	74,
	67,
	68,
	25,
	30,
	23,
	16,
	5,
	2,
	11,
	12,
	33,
	38,
	47,
	40,
	61,
	58,
	51,
	52,
	78,
	73,
	64,
	71,
	82,
	85,
	92,
	91,
	118,
	113,
	120,
	127,
	106,
	109,
	100,
	99,
	62,
	57,
	48,
	55,
	34,
	37,
	44,
	43,
	6,
	1,
	8,
	15,
	26,
	29,
	20,
	19,
	174,
	169,
	160,
	167,
	178,
	181,
	188,
	187,
	150,
	145,
	152,
	159,
	138,
	141,
	132,
	131,
	222,
	217,
	208,
	215,
	194,
	197,
	204,
	203,
	230,
	225,
	232,
	239,
	250,
	253,
	244,
	243
]);
const CRC16_TABLE = new Uint16Array([
	0,
	32773,
	32783,
	10,
	32795,
	30,
	20,
	32785,
	32819,
	54,
	60,
	32825,
	40,
	32813,
	32807,
	34,
	32867,
	102,
	108,
	32873,
	120,
	32893,
	32887,
	114,
	80,
	32853,
	32863,
	90,
	32843,
	78,
	68,
	32833,
	32963,
	198,
	204,
	32969,
	216,
	32989,
	32983,
	210,
	240,
	33013,
	33023,
	250,
	33003,
	238,
	228,
	32993,
	160,
	32933,
	32943,
	170,
	32955,
	190,
	180,
	32945,
	32915,
	150,
	156,
	32921,
	136,
	32909,
	32903,
	130,
	33155,
	390,
	396,
	33161,
	408,
	33181,
	33175,
	402,
	432,
	33205,
	33215,
	442,
	33195,
	430,
	420,
	33185,
	480,
	33253,
	33263,
	490,
	33275,
	510,
	500,
	33265,
	33235,
	470,
	476,
	33241,
	456,
	33229,
	33223,
	450,
	320,
	33093,
	33103,
	330,
	33115,
	350,
	340,
	33105,
	33139,
	374,
	380,
	33145,
	360,
	33133,
	33127,
	354,
	33059,
	294,
	300,
	33065,
	312,
	33085,
	33079,
	306,
	272,
	33045,
	33055,
	282,
	33035,
	270,
	260,
	33025,
	33539,
	774,
	780,
	33545,
	792,
	33565,
	33559,
	786,
	816,
	33589,
	33599,
	826,
	33579,
	814,
	804,
	33569,
	864,
	33637,
	33647,
	874,
	33659,
	894,
	884,
	33649,
	33619,
	854,
	860,
	33625,
	840,
	33613,
	33607,
	834,
	960,
	33733,
	33743,
	970,
	33755,
	990,
	980,
	33745,
	33779,
	1014,
	1020,
	33785,
	1e3,
	33773,
	33767,
	994,
	33699,
	934,
	940,
	33705,
	952,
	33725,
	33719,
	946,
	912,
	33685,
	33695,
	922,
	33675,
	910,
	900,
	33665,
	640,
	33413,
	33423,
	650,
	33435,
	670,
	660,
	33425,
	33459,
	694,
	700,
	33465,
	680,
	33453,
	33447,
	674,
	33507,
	742,
	748,
	33513,
	760,
	33533,
	33527,
	754,
	720,
	33493,
	33503,
	730,
	33483,
	718,
	708,
	33473,
	33347,
	582,
	588,
	33353,
	600,
	33373,
	33367,
	594,
	624,
	33397,
	33407,
	634,
	33387,
	622,
	612,
	33377,
	544,
	33317,
	33327,
	554,
	33339,
	574,
	564,
	33329,
	33299,
	534,
	540,
	33305,
	520,
	33293,
	33287,
	514
]);
function crc8(buf) {
	let crc = 0;
	for (let i = 0; i < buf.length; i++) crc = CRC8_TABLE[crc ^ buf[i]];
	return crc;
}
function crc16(buf) {
	let crc = 0;
	for (let i = 0; i < buf.length; i++) crc = (crc << 8 ^ CRC16_TABLE[crc >> 8 ^ buf[i]]) & 65535;
	return crc;
}
//#endregion
//#region src/lib/rtmp/flac.ts
function writeUtf8Integer(dv, pos, value) {
	while (true) {
		const byte = value & 127;
		value >>= 7;
		if (value === 0) {
			dv.setUint8(pos++, byte);
			break;
		} else dv.setUint8(pos++, byte | 128);
	}
	return pos;
}
function encodeFlacFrame(params) {
	const buf = /* @__PURE__ */ new Uint8Array(1e4);
	const dv = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
	dv.setUint16(0, 65528);
	dv.setUint8(2, 122);
	const channelAssignment = params.pcms.length - 1;
	if (channelAssignment > 7) throw new Error("Too many channels");
	dv.setUint8(3, channelAssignment << 4 | 8);
	let pos = writeUtf8Integer(dv, 4, params.index);
	dv.setUint16(pos, params.blockSize - 1);
	pos += 2;
	const crc = crc8(buf.subarray(0, pos));
	dv.setUint8(pos++, crc);
	for (const channelPcms of params.pcms) {
		dv.setUint8(pos++, 2);
		let currentBuffer = channelPcms[0];
		let currentBufferIdx = 0;
		let currentBufferPos = 0;
		for (let i = 0; i < params.blockSize; i++) {
			if (currentBufferPos >= currentBuffer.length) {
				currentBuffer = channelPcms[++currentBufferIdx];
				currentBufferPos = 0;
			}
			dv.setInt16(pos, currentBuffer[currentBufferPos++]);
			pos += 2;
		}
		if (currentBufferIdx > 0) channelPcms.splice(0, currentBufferIdx);
		if (currentBufferPos > 0) channelPcms[0] = currentBuffer.subarray(currentBufferPos);
	}
	const crc2 = crc16(buf.subarray(0, pos));
	dv.setUint16(pos, crc2);
	pos += 2;
	return {
		data: buf.subarray(0, pos),
		duration: params.blockSize / 48e3
	};
}
function encodeFlacHeader(params) {
	const buf = /* @__PURE__ */ new Uint8Array(38);
	const dv = new DataView(buf.buffer);
	dv.setUint8(0, 128);
	dv.setUint8(1, 0);
	dv.setUint16(2, 34);
	dv.setUint16(4, params.blockSize);
	dv.setUint16(6, params.blockSize);
	dv.setUint16(8, 0);
	dv.setUint16(10, 0);
	dv.setUint16(12, 0);
	dv.setUint8(14, 11);
	dv.setUint8(15, 184);
	dv.setUint8(16, params.channelCount - 1 << 1);
	dv.setUint8(17, 240);
	dv.setUint32(18, 0);
	dv.setUint32(22, 0);
	dv.setUint32(26, 0);
	dv.setUint32(30, 0);
	dv.setUint32(34, 0);
	return buf;
}
//#endregion
//#region src/lib/rtmp/mp4.ts
function parseMp4Samples(trak) {
	const stbl = findIsoBox(trak, "stbl");
	const mdhd = findIsoBox(trak, "mdhd");
	let stts, stsc, stco, ctts, stsz, stsd, stss;
	for (const box of stbl.boxes) {
		if (box.type === "stts") stts = box;
		if (box.type === "stsc") stsc = box;
		if (box.type === "stco") stco = box;
		if (box.type === "ctts") ctts = box;
		if (box.type === "stsz") stsz = box;
		if (box.type === "stsd") stsd = box;
		if (box.type === "stss") stss = box;
	}
	if (!stts || !stsc || !stco || !stsz || !stsd) throw new Error("Missing required box");
	const samples = [];
	let hasSyncSamples = false;
	let totalDuration = 0;
	let totalSize = 0;
	let chunkIdx, chunkRunIdx, lastSampleInChunk, offsetInChunk, lastChunkInRun;
	let lastSampleInSttsRun = -1;
	let sttsRunIdx = -1;
	let lastSampleInCttsRun = -1;
	let cttsRunIdx = -1;
	let lastStssIndex = 0;
	for (let i = 0; i < stsz.sample_count; i++) {
		const sample = {
			idx: i,
			size: stsz.sample_size || stsz.entry_sizes[i]
		};
		totalSize += sample.size;
		samples.push(sample);
		if (i === 0) {
			chunkIdx = 1;
			chunkRunIdx = 0;
			lastSampleInChunk = stsc.entries[chunkRunIdx].samples_per_chunk;
			offsetInChunk = 0;
			sample.chunkIdx = chunkIdx;
			sample.chunkRunIdx = chunkRunIdx;
			if (chunkRunIdx + 1 < stsc.entry_count) lastChunkInRun = stsc.entries[chunkRunIdx + 1].first_chunk - 1;
			else lastChunkInRun = Infinity;
		} else if (i < lastSampleInChunk) {
			sample.chunkIdx = chunkIdx;
			sample.chunkRunIdx = chunkRunIdx;
		} else {
			chunkIdx++;
			sample.chunkIdx = chunkIdx;
			offsetInChunk = 0;
			if (chunkIdx <= lastChunkInRun) {} else {
				chunkRunIdx++;
				if (chunkRunIdx + 1 < stsc.entry_count) lastChunkInRun = stsc.entries[chunkRunIdx + 1].first_chunk - 1;
				else lastChunkInRun = Infinity;
			}
			sample.chunkRunIdx = chunkRunIdx;
			lastSampleInChunk += stsc.entries[chunkRunIdx].samples_per_chunk;
		}
		sample.descriptionIndex = stsc.entries[chunkRunIdx].sample_description_index - 1;
		sample.offset = stco.chunk_offsets[sample.chunkIdx - 1] + offsetInChunk;
		offsetInChunk += sample.size;
		if (i > lastSampleInSttsRun) {
			sttsRunIdx += 1;
			if (lastSampleInSttsRun < 0) lastSampleInSttsRun = 0;
			lastSampleInSttsRun += stts.entries[sttsRunIdx].sample_count;
		}
		if (i > 0) {
			const prevSample = samples[i - 1];
			prevSample.duration = stts.entries[sttsRunIdx].sample_delta;
			totalDuration += prevSample.duration;
			sample.dts = prevSample.dts + prevSample.duration;
		} else sample.dts = 0;
		if (ctts) {
			if (i >= lastSampleInCttsRun) {
				cttsRunIdx += 1;
				if (lastSampleInCttsRun < 0) lastSampleInCttsRun = 0;
				lastSampleInCttsRun += ctts.entries[cttsRunIdx].sample_count;
			}
			sample.cts = sample.dts + ctts.entries[cttsRunIdx].sample_offset;
		} else sample.cts = sample.dts;
		if (stss) {
			if (i === stss.sample_numbers[lastStssIndex] - 1) {
				sample.isSync = true;
				hasSyncSamples = true;
				lastStssIndex++;
			} else sample.isSync = false;
		} else {
			sample.isSync = true;
			hasSyncSamples = true;
		}
	}
	if (samples.length) {
		const lastSample = samples[samples.length - 1];
		lastSample.duration = Math.max(0, mdhd.duration - lastSample.dts);
		totalDuration += lastSample.duration;
	}
	return {
		mdhd,
		totalSize,
		samples,
		hasSyncSamples
	};
}
//#endregion
//#region src/lib/rtmp/opus.ts
async function reencodeOpusToFlac(params) {
	const { decodeOpus, chunk, samples } = params;
	const samplesPerFrame = 2048;
	let pcms = null;
	let pendingPcmsCount = 0;
	let totalPcmCount = 0;
	const flacFrames = [];
	function encodePendingPcms(force = false) {
		if (!force && pendingPcmsCount < samplesPerFrame) return;
		const blockSize = force ? pendingPcmsCount : samplesPerFrame;
		const frame = encodeFlacFrame({
			index: flacFrames.length,
			blockSize,
			pcms
		});
		pendingPcmsCount -= blockSize;
		flacFrames.push(frame);
	}
	for (const sample of samples) {
		const { channelData, samplesDecoded } = await decodeOpus(chunk.subarray(sample.offset, sample.offset + sample.size));
		pendingPcmsCount += samplesDecoded;
		totalPcmCount += samplesDecoded;
		if (pcms === null) pcms = Array.from({ length: channelData.length }, () => []);
		for (let i = 0; i < channelData.length; i++) pcms[i].push(floatPcmTo16BitPcm(channelData[i]));
		encodePendingPcms();
	}
	encodePendingPcms(true);
	return flacFrames;
}
function floatPcmTo16BitPcm(floatPcm) {
	const intPcm = new Int16Array(floatPcm.length);
	for (let i = 0; i < floatPcm.length; i++) {
		const sample = Math.max(-1, Math.min(1, floatPcm[i]));
		intPcm[i] = sample * 32767.5 - .5;
	}
	return intPcm;
}
//#endregion
//#region src/lib/rtmp/fmp4.ts
function generateFmp4Init(iso, params) {
	const { opusToFlac = false } = params;
	let opusTrackId;
	let opusInitOptions;
	const data = bufferConcats(isoBoxToBuffer(iso.fetch("ftyp")), isoBoxToBuffer(iso.fetch("moov")));
	const iso2 = ISOBoxer.parseBuffer(data.buffer);
	const ftyp = iso2.fetch("ftyp");
	if (!ftyp.compatible_brands.includes("iso6")) ftyp.compatible_brands.push("iso6");
	const moov = iso2.fetch("moov");
	let lastTrakIdx = -1;
	const traks = [];
	for (let i = 0; i < moov.boxes.length; i++) {
		const box = moov.boxes[i];
		if (box.type === "mvhd") {
			box.duration = 0;
			box.next_track_ID = 2;
		}
		if (box.type !== "trak") continue;
		const trak = box;
		lastTrakIdx = i;
		traks.push(trak);
		const newTrakBoxes = [];
		let thisTrakId = null;
		for (const trakBox of trak.boxes) {
			if (trakBox.type === "tkhd") {
				trakBox.duration = 0;
				thisTrakId = trakBox.track_ID;
				newTrakBoxes.push(trakBox);
				continue;
			}
			if (trakBox.type === "mdia") {
				const mdhd = findIsoBox(trakBox, "mdhd");
				mdhd.duration = 0;
				const stbl = findIsoBox(trakBox, "stbl");
				const newStblBoxes = [];
				for (const stblBox of stbl.boxes) {
					if (stblBox.type === "stts") {
						stblBox.entry_count = 0;
						stblBox.entries = [];
						newStblBoxes.push(stblBox);
						continue;
					}
					if (stblBox.type === "stsc") {
						stblBox.entry_count = 0;
						stblBox.entries = [];
						newStblBoxes.push(stblBox);
						continue;
					}
					if (stblBox.type === "stsz") {
						stblBox.sample_size = 0;
						stblBox.sample_count = 0;
						stblBox.entry_sizes = [];
						newStblBoxes.push(stblBox);
						continue;
					}
					if (stblBox.type === "stco") {
						stblBox.entry_count = 0;
						stblBox.chunk_offsets = [];
						newStblBoxes.push(stblBox);
						continue;
					}
					if (stblBox.type === "stsd") {
						if (opusToFlac && stblBox.entries[0].type === "Opus") {
							const opusBox = stblBox.entries[0];
							const dopsBox = opusBox.entries[0];
							if (dopsBox.type !== "dOps") throw new Error("Invalid Opus box");
							const flacBox = ISOBoxer.createFullBox("fLaC", stblBox, -1);
							flacBox.reserved1 = [
								0,
								0,
								0
							];
							flacBox.reserved2 = [0, 0];
							flacBox.reserved3 = [0, 0];
							flacBox.data_reference_index = opusBox.data_reference_index;
							flacBox.channel_count = dopsBox.output_channel_count;
							flacBox.sample_size = 16;
							flacBox.sample_rate = 48e3;
							const dfla = ISOBoxer.createFullBox("dfLa", flacBox, -1);
							dfla._data = encodeFlacHeader({
								blockSize: 4096 / dopsBox.output_channel_count,
								channelCount: dopsBox.output_channel_count
							});
							const btrt = ISOBoxer.createFullBox("btrt", flacBox, -1);
							btrt.bufferSizeDB = 0;
							btrt.maxBitrate = 768e3 * dopsBox.output_channel_count;
							btrt.avgBitrate = btrt.maxBitrate / 2;
							flacBox.entries = [dfla, btrt];
							stblBox.entries = [flacBox];
							opusTrackId = thisTrakId;
							opusInitOptions = {
								preSkip: dopsBox.pre_skip,
								channels: dopsBox.output_channel_count,
								streamCount: dopsBox.stream_count,
								coupledStreamCount: dopsBox.coupled_count,
								channelMappingTable: dopsBox.channel_mapping
							};
						}
						newStblBoxes.push(stblBox);
						continue;
					}
				}
				stbl.boxes = newStblBoxes;
				newTrakBoxes.push(trakBox);
			}
		}
		trak.boxes = newTrakBoxes;
	}
	if (lastTrakIdx === -1) throw new Error("No trak box found");
	const mvex = ISOBoxer.createFullBox("mvex", moov, lastTrakIdx + 1);
	for (const trak of traks) {
		const trex = ISOBoxer.createFullBox("trex", mvex);
		trex.track_ID = findIsoBox(trak, "tkhd").track_ID;
		trex.default_sample_description_index = 1;
		trex.default_sample_duration = 0;
		trex.default_sample_size = 0;
		trex.default_sample_flags = 0;
	}
	return {
		opusTrackId,
		opusInitOptions,
		data: new Uint8Array(iso2.write())
	};
}
async function generateFmp4Segment(params) {
	const { chunk, seq = 0, timestamp = import_BigInteger.default.zero, decodeOpus, opusTrackId } = params;
	const chunkU8 = isoBoxToBuffer(chunk);
	const moov = chunk.fetch("moov");
	const file = ISOBoxer.createFile();
	const moof = ISOBoxer.createFullBox("moof");
	const mfhd = ISOBoxer.createFullBox("mfhd", moof);
	mfhd.sequence_number = seq;
	const truns = [];
	let totalSamplesSize = 0;
	for (const moovBox of moov.boxes) {
		if (moovBox.type !== "trak") continue;
		const trak = moovBox;
		const { mdhd, samples, totalSize, hasSyncSamples } = parseMp4Samples(trak);
		const traf = ISOBoxer.createFullBox("traf", moof);
		const tfhd = ISOBoxer.createFullBox("tfhd", traf);
		tfhd.flags = 131072;
		tfhd.track_ID = findIsoBox(trak, "tkhd").track_ID;
		const tfdt = ISOBoxer.createFullBox("tfdt", traf);
		tfdt.version = 1;
		tfdt.baseMediaDecodeTime = timestamp.multiply(mdhd.timescale).divide(1e3);
		const trun = ISOBoxer.createFullBox("trun", traf);
		trun.flags = 3841;
		trun.data_offset = 0;
		if (opusTrackId === tfhd.track_ID) {
			const flacFrames = await reencodeOpusToFlac({
				decodeOpus,
				samples,
				chunk: chunkU8
			});
			trun.sample_count = flacFrames.length;
			trun.samples = flacFrames.map((frame) => {
				totalSamplesSize += frame.data.byteLength;
				return {
					__data: frame.data,
					sample_duration: Math.round(frame.duration * mdhd.timescale),
					sample_size: frame.data.byteLength,
					sample_flags: 2 << 24,
					sample_composition_time_offset: 0
				};
			});
		} else {
			totalSamplesSize += totalSize;
			trun.sample_count = samples.length;
			trun.samples = samples.map((it) => {
				let flags = 0;
				if (hasSyncSamples) {
					if (it.isSync) flags |= 2 << 24;
					else flags |= 16842752;
				}
				return {
					__data: chunkU8.subarray(it.offset, it.offset + it.size),
					sample_duration: it.duration,
					sample_size: it.size,
					sample_flags: flags,
					sample_composition_time_offset: it.cts - it.dts
				};
			});
		}
		truns.push(trun);
	}
	const myMdat = ISOBoxer.createFullBox("mdat");
	myMdat.data = new Uint8Array(totalSamplesSize);
	let myMdatOffset = 0;
	const moofSize = moof.getLength();
	for (const trun of truns) {
		trun.data_offset = moofSize + myMdatOffset + 8;
		for (const sample of trun.samples) {
			myMdat.data.set(sample.__data, myMdatOffset);
			myMdatOffset += sample.sample_size;
		}
	}
	file.append(moof);
	file.append(myMdat);
	return new Uint8Array(file.write());
}
//#endregion
//#region src/vendor/simple-yenc.js
const crc32 = (buf, init = 4294967295, poly = 79764919) => {
	const crc32Table = /* @__PURE__ */ new Int32Array(256);
	let i, j, c, crc = init;
	for (i = 0; i < 256; i++) {
		for (c = i << 24, j = 8; j > 0; --j) c = c & 2147483648 ? c << 1 ^ poly : c << 1;
		crc32Table[i] = c;
	}
	for (i = 0; i < buf.length; i++) crc = crc << 8 ^ crc32Table[(crc >> 24 ^ buf[i]) & 255];
	return crc;
};
const decode = (string, crc32Function = crc32) => {
	const stringToBytes = (string) => new Uint8Array(string.length / 2).map((_, i) => parseInt(string.substring(i * 2, (i + 1) * 2), 16));
	const hexToUint8 = (string) => stringToBytes(string)[0];
	const hexToInt32_LE = (string) => new DataView(stringToBytes(string).buffer).getInt32(0, true);
	const htmlCodeOverrides = /* @__PURE__ */ new Map();
	[
		,
		8364,
		,
		8218,
		402,
		8222,
		8230,
		8224,
		8225,
		710,
		8240,
		352,
		8249,
		338,
		,
		381,
		,
		,
		8216,
		8217,
		8220,
		8221,
		8226,
		8211,
		8212,
		732,
		8482,
		353,
		8250,
		339,
		,
		382,
		376
	].forEach((k, v) => htmlCodeOverrides.set(k, v));
	const output = new Uint8Array(string.length);
	let escaped = false, byteIndex = 0, byte, offset = 42, isDynEncode = string.length > 13 && string.substring(0, 9) === "dynEncode", dynEncodeVersion, startIdx = 0, crc;
	if (isDynEncode) {
		startIdx = 11;
		dynEncodeVersion = hexToUint8(string.substring(9, startIdx));
		if (dynEncodeVersion <= 1) {
			startIdx += 2;
			offset = hexToUint8(string.substring(11, startIdx));
		}
		if (dynEncodeVersion === 1) {
			startIdx += 8;
			crc = hexToInt32_LE(string.substring(13, startIdx));
		}
	}
	const offsetReverse = 256 - offset;
	for (let i = startIdx; i < string.length; i++) {
		byte = string.charCodeAt(i);
		if (byte === 61 && !escaped) {
			escaped = true;
			continue;
		}
		if (byte === 92 && i < string.length - 5 && isDynEncode) {
			const secondCharacter = string.charCodeAt(i + 1);
			if (secondCharacter === 117 || secondCharacter === 85) {
				byte = parseInt(string.substring(i + 2, i + 6), 16);
				i += 5;
			}
		}
		if (byte > 255) {
			const htmlOverride = htmlCodeOverrides.get(byte);
			if (htmlOverride) byte = htmlOverride + 127;
		}
		if (escaped) {
			escaped = false;
			byte -= 64;
		}
		output[byteIndex++] = byte < offset && byte > 0 ? byte + offsetReverse : byte - offset;
	}
	const results = output.subarray(0, byteIndex);
	if (isDynEncode && dynEncodeVersion === 1) {
		const actualCrc = crc32Function(results);
		if (actualCrc !== crc) {
			const error = "Decode failed crc32 validation";
			console.error("`simple-yenc`\n", error + "\n", "Expected: " + crc + "; Got: " + actualCrc + "\n", "Visit https://github.com/eshaz/simple-yenc for more information");
			throw new Error(error);
		}
	}
	return results;
};
//#endregion
//#region src/vendor/opus/WASMAudioDecoderCommon.js
function WASMAudioDecoderCommon() {
	const uint8Array = Uint8Array;
	const float32Array = Float32Array;
	if (!WASMAudioDecoderCommon.modules) Object.defineProperties(WASMAudioDecoderCommon, {
		modules: { value: /* @__PURE__ */ new WeakMap() },
		setModule: { value(Ref, module) {
			WASMAudioDecoderCommon.modules.set(Ref, Promise.resolve(module));
		} },
		getModule: { value(Ref, wasmString) {
			let module = WASMAudioDecoderCommon.modules.get(Ref);
			if (!module) {
				if (!wasmString) {
					wasmString = Ref.wasm;
					module = WASMAudioDecoderCommon.inflateDynEncodeString(wasmString).then((data) => WebAssembly.compile(data));
				} else module = WebAssembly.compile(decode(wasmString));
				WASMAudioDecoderCommon.modules.set(Ref, module);
			}
			return module;
		} },
		concatFloat32: { value(buffers, length) {
			let ret = new float32Array(length), i = 0, offset = 0;
			while (i < buffers.length) {
				ret.set(buffers[i], offset);
				offset += buffers[i++].length;
			}
			return ret;
		} },
		getDecodedAudio: { value: (errors, channelData, samplesDecoded, sampleRate, bitDepth) => ({
			errors,
			channelData,
			samplesDecoded,
			sampleRate,
			bitDepth
		}) },
		getDecodedAudioMultiChannel: { value(errors, input, channelsDecoded, samplesDecoded, sampleRate, bitDepth) {
			let channelData = [], i, j;
			for (i = 0; i < channelsDecoded; i++) {
				const channel = [];
				for (j = 0; j < input.length;) channel.push(input[j++][i] || []);
				channelData.push(WASMAudioDecoderCommon.concatFloat32(channel, samplesDecoded));
			}
			return WASMAudioDecoderCommon.getDecodedAudio(errors, channelData, samplesDecoded, sampleRate, bitDepth);
		} },
		inflateDynEncodeString: { value(source) {
			source = decode(source);
			return new Promise((resolve) => {
				const puffString = String.raw`dynEncode0114db91da9bu*ttt$#U¤¤U¤¤3yzzss|yusvuyÚ&4<054<,5T44^T44<(6U~J(44< ~A544U~6J0444545 444J0444J,4U4UÒ7U454U4Z4U4U^/6545T4T44BU~64CU~O4U54U~5 U5T4B4Z!4U~5U5U5T4U~6U4ZTU5U5T44~4O4U2ZTU5T44Z!4B6T44U~64B6U~O44U~4O4U~54U~5 44~C4~54U~5 44~5454U4B6Ub!444~UO4U~5 U54U4ZTU#44U$464<4~B6^4<444~U~B4U~54U544~544~U5 µUä#UJUè#5TT4U0ZTTUX5U5T4T4Uà#~4OU4U $~C4~54U~5 T44$6U\!TTT4UaT4<6T4<64<Z!44~4N4<U~5 4UZ!4U±_TU#44UU6UÔ~B$544$6U\!4U6U¤#~B44Uä#~B$~64<6_TU#444U~B~6~54<Y!44<_!T4Y!4<64~444~AN44<U~6J4U5 44J4U[!U#44UO4U~54U~5 U54 7U6844J44J 4UJ4UJ04VK(44<J44<J$4U´~54U~5 4U¤~5!TTT4U$5"U5TTTTTTT4U$"4VK,U54<(6U~64<$6_!4< 64~6A54A544U~6#J(U54A4U[!44J(44#~A4U6UUU[!4464~64_!4<64~54<6T4<4]TU5 T4Y!44~44~AN4U~54U~54U5 44J(44J UÄA!U5U#UôJU"UÔJU#UÔ"JU#U´"JT4U´ZTU5T4UôZTU5T4UDZTU5T4U$[T44~UO4U~5 UÔUô4U~U´$.U5T4UP[T4U~4~UO4U~5 U#<U#<4U~U2$.UÄUN 44 ~UO4U~5 44!~UO4U~5 4U~4~UO4U~5 44J44J(U5 44U¤~J@44Uä~J<44UD~J844U~J44U$54U$5U54U$54U1^4U1^!4U~54U~5U54U~6U4U^/65T4T4U$54U~4BU~4O4U54U~5 UU'464U'_/54UU~5T4T4U~4BU~UO4U54U~5 U54Uä~4U¤~4U~U'$!44~5U5T44\T44U<~$6U\!4U#aT4U~4U~4O4U~5 U5U5U5TTT4U$"4YTU5 4U4~C5U5 U5U5444$4~64~\TU5 4U~4U~5T4Y!44O4U~54U~54U5 4CYTU5 4Uä~4U¤~4U~4$6TU54U\!44Bæ4Bä~[!4U~4UD~4U~4U~4$6TU54U\!44B4B~[!44U<~4U4~$5 4U"U#$544"Y!454U^!44<J44<(J454U~84­UN!#%'+/37?GOWgw·×÷Uä;U9$%& !"#`;
				WASMAudioDecoderCommon.getModule(WASMAudioDecoderCommon, puffString).then((wasm) => WebAssembly.instantiate(wasm, {})).then(({ exports }) => {
					const instanceExports = new Map(Object.entries(exports));
					const puff = instanceExports.get("puff");
					const memory = instanceExports.get("memory")["buffer"];
					const dataArray = new uint8Array(memory);
					const heapView = new DataView(memory);
					let heapPos = instanceExports.get("__heap_base");
					const sourceLength = source.length;
					const sourceLengthPtr = heapPos;
					heapPos += 4;
					heapView.setInt32(sourceLengthPtr, sourceLength, true);
					const sourcePtr = heapPos;
					heapPos += sourceLength;
					dataArray.set(source, sourcePtr);
					const destLengthPtr = heapPos;
					heapPos += 4;
					heapView.setInt32(destLengthPtr, dataArray.byteLength - heapPos, true);
					puff(heapPos, destLengthPtr, sourcePtr, sourceLengthPtr);
					resolve(dataArray.slice(heapPos, heapPos + heapView.getInt32(destLengthPtr, true)));
				});
			});
		} }
	});
	Object.defineProperty(this, "wasm", {
		enumerable: true,
		get: () => this._wasm
	});
	this.getOutputChannels = (outputData, channelsDecoded, samplesDecoded) => {
		let output = [], i = 0;
		while (i < channelsDecoded) output.push(outputData.slice(i * samplesDecoded, i++ * samplesDecoded + samplesDecoded));
		return output;
	};
	this.allocateTypedArray = (len, TypedArray, setPointer = true) => {
		const ptr = this._wasm.malloc(TypedArray.BYTES_PER_ELEMENT * len);
		if (setPointer) this._pointers.add(ptr);
		return {
			ptr,
			len,
			buf: new TypedArray(this._wasm.HEAP, ptr, len)
		};
	};
	this.free = () => {
		this._pointers.forEach((ptr) => {
			this._wasm.free(ptr);
		});
		this._pointers.clear();
	};
	this.codeToString = (ptr) => {
		const characters = [], heap = new Uint8Array(this._wasm.HEAP);
		for (let character = heap[ptr]; character !== 0; character = heap[++ptr]) characters.push(character);
		return String.fromCharCode.apply(null, characters);
	};
	this.addError = (errors, message, frameLength, frameNumber, inputBytes, outputSamples) => {
		errors.push({
			message,
			frameLength,
			frameNumber,
			inputBytes,
			outputSamples
		});
	};
	this.instantiate = (_EmscriptenWASM, _module) => {
		if (_module) WASMAudioDecoderCommon.setModule(_EmscriptenWASM, _module);
		this._wasm = new _EmscriptenWASM(WASMAudioDecoderCommon).instantiate();
		this._pointers = /* @__PURE__ */ new Set();
		return this._wasm.ready.then(() => this);
	};
}
//#endregion
//#region src/vendor/opus/EmscriptenWasm.js
function EmscriptenWASM(WASMAudioDecoderCommon) {
	var Module = Module;
	function ready() {}
	Module = {};
	/** @param {string|number=} what */ function abort(what) {
		throw what;
	}
	for (var base64ReverseLookup = /* @__PURE__ */ new Uint8Array(123), i = 25; i >= 0; --i) {
		base64ReverseLookup[48 + i] = 52 + i;
		base64ReverseLookup[65 + i] = i;
		base64ReverseLookup[97 + i] = 26 + i;
	}
	base64ReverseLookup[43] = 62;
	base64ReverseLookup[47] = 63;
	if (!EmscriptenWASM.wasm) Object.defineProperty(EmscriptenWASM, "wasm", { get: () => String.raw`dynEncode01a36c6f98c83ø%yã¯#6ïIØh¼ÿ-^º*:8ÖJÒ#Á(¶3ùsÕÿ§£/.*[v²¯\õzºÜá»(oBM×å ÊvmË1±Iü(&Øb?0=MáPðxA%TÔÎ=} c×0ÓPùN:Ê£ÌÓ±æQñÒ¥M_ªqA1kð¹¥ÊÇ@6u§­k¿Ä9Ó²FÒà(A£c£  )ìTÃ=M]+àaåÅBÃ±cÈ¼{±!ÕÕ_ò#²ßá'Ö«ñÛ.ò¿á(h¯Äò´ýÏ ÆB\0¬E¸?s*iê9)~QÄõÿ6+º·=Ml½UÀ<i½í¤ìgà°Wå,µ$Ü®(m¬ézq§6¥Ô"±¬o1ÜGw¾Yüá¼¸Æ$)ÍÏ(!jÃä »ãóªI,XÍÑãÈ_Ø±ã°=M6ØJX½>«¥$´ªFÏó	÷¨M/§=}WÃs¥FÈ$9»PsH0Ç3»P®WqöCðé~¥Ö}¸:taã/±©Ý×sôdv[<áëx[ôÿ0bñRºÊ½jËzhq¹J"Ò'*¤0Ó34Þ¯rÑöv[B/¨¿ê9!ïr÷²Çn5ÉMEk5Ú?7Úk,*dÔörÏk4VáÔÕÖÝjooooaú¼l^Û=}MQï]½ßQ²lÂù[g=M9	~êÃ3¨¨Ó 9ñgGze	¹©ulfÙ	|¯Sà¦oÌt= ¶zÈ<Ã·ÿñºßÏÃh]9Í©:#Dãø»­3LeÙ	¯©[¿)hÓ¯fó¦Ûæþ?p9
VïÈnÊ á$Ëµ¥Ö%Ú1Érn:fÓ¯æ¸©Õº£¬ó+ |;ýoô:*W(©Jÿ+vOÄb7<×­ßëÙ	[)oU89~ÚÇ3Í¿V¡N¢&¿vlGÐäÝk©&M6» ¡6!^°©äÞÔûÏ vÚÃBÆL¿,Y+ÏÇjàìL£¡Rñ¤ekX\ÍyF= 1X1ªhýQ^údç@!G
¥ Ñ)°+w±yÅIOiÇµ;gR#ó¨'%âfº£P¾ SÃã[¥Eýc&0v¢\G-ÌÏùÙ¡ÜpSX-UQÏ <ÄJ#i"Ú<Ùo;ðúÙ¡Ú6i¹|#òm·ÝßÝYÐÓ	= ë$}¥Ö
q_.Ä¾³}ÊðÿXi·xKQQK=MÎKÚ8ÏR«øé³M[§ÍôÛ§@4åÁË¿Ç(=Mð2¦ù ÍèÃÊÃ
Ë'ÇeÜ3£<ü¨Ü&lw"j5i,¤{öÞØ~OcÒWØ®æÏ¦ëJòªéøX¦±n«rüÆ»g/Ò	ðlzd²IªÎ~¨Ö j=Mv0ª¬¢©Aí~DøÝõU±nø+møFÛæiáFU'ª³'ø^%npÂû d)"~ßVÔÒY¿gò}Q7"Ìæ]Âº¯eFZ0í îv ídc§ª^i\Ò	qÖáÏ¿û·Ãdý©Äî-|7Ñ{à~UrÂVÆ¯£ª/wYÒF',nÃæV¶ócyçiØç7µe$ É~)&òûô$d1G5Sê=M@= ÓçÓ^=}Q²U¾µ:ã7ç4ÿît3?Âvsºïÿ
ðëA¨ 4e\WÓXÉ2¾Àl<U£{>f«#¬pªÔHê5_Ìîr³éÄ¼áõ,=}ËÖõ7Â= = T	qãMaÑ¤Ö)_;©T$¢¡k"×b¢"lë­}åëí"ÐDã:Ôo5{Ïªæ6Nnû?=M)~9Î* ä@­Äk¨c$ne&^3ÕÔ/Vì§"ñ1Ô¯»3Hæ}oTÏ{ËZ= jùÔòó¡6_DÒKM÷ÞwÙ.tRc£I!fuWw¶YYT»° I ·®D=M5ß®ÆhÙðí=M¨þ­¹§«ùïËÔtëYÌìnÉÔ~eóóÌ
íef»1öýÆìôu)Àê±tõ¸pK*ÄÕ;ñßé;{OtÑü;åpñÞSØo¬9<{	ÛS¼Súë!<qV»¶ã®Ôlù>Ä,(s³UÊ­Õ£õ5Éµ-û©^Üëã¶SÃC%(%^}3ùIã4}ý¼|
^ëºhÜ*ßÓ{ðÕ¥rí¬Øz´cTd<xOZ¡5¾µÙà?´àLsk|êLà; -«)rSXY»ûWf³Ü{JAÀÀÐ.pD× LØIÞoÉHö¤ÍI§{®/¥õ= 'ç+éy¹¦3ÁMjÌ:mÕP@²û×,Ö½0ù	:ÒÁ>!\¼á0%ãôw¡AGi´à/X®¤k¯þK²Ï:ÛÑýPHõ·_rÊ¾²îrÈO¸û8u=}ðè¡¸8ÐÑØQR5y)P/¿!5ÇZ#lõ;4°0­ÅÉ±RµòòÁ{±«W¯üý²!¥ú¯×U1¼{gÏTïìÑîu´&iFÀ7zÅÐ÷îHÁªT÷°s©ãÞCu½Pðìô»Y$íÌ?ËÜ*=Mq¤àþ?ðN\ëÝ§Ñdñ+´ä°iyßÌzp´(õ¦Lvç»P~áÆínÄÇ:Ñ= ×k¤Oæ~Ù¶Ï¦?¨¾Uh,a[SäÅP,æu«NèÆÝýI<Ç}:«3;·Õ = ·@kj;@#G:ÓWÚµ!­[>YÂyX×vF?êÀædø!¿ñ°×_o3¥)fÇ(LÝÙª±~O÷M{^=MuØ]§6áÊc$ÅT@{õI=M{÷¼d	Û³=}8>³LlÊUÕmí(kx¾ý;çZÇâùÂÀ+·@Xª¥¡ò F@¨¾	h<FB+îQ BG¨= h©¢âcWIå
21ä²¸´R»ç]rÁÓ·³ÖÜ}À^o³ô¤ðÚË'±<<äìqNun¬Ê%vu³0îlS%Ç *þ5HV÷ø9O tõn#he¤M·ÅÏKg³æÚ=M¥L&¬67°¬Òäªw+²¥Äq¼í°EW+ð/¦MüÚù=}]Åz?HËÂ+'·¸SÁ [ð9jÐ6ÂÈÏå ò%n38áü-1t±)	Å,W¬­GÏ¸£Qå¤^P5«4w¥Ýx¾vÉ7ì¸0FI,´4§ó7-+¬öXdo6ÊHî=M¤Ä.pU´ü$¶7÷þÔ±Bãÿ)(ö=MO/k4,NHEÊzØqìß,j[I®iÈªÇë[Ò¸îl¶uB×C°sÍ×Xµ{îw+\;K½@
M(¨Ll£v¬i?æÆQPê½²óÿ>¤ØfüÐ¬v;­RÐíMj\Èìë¦æz-K{|xÐJt<aóñ/·}µ½þæF®|´h_Å ÂQ%<ÊÙg2(e3ß/¡òm6Y/= s72õr7 x¡IuhzY_1nf>©Uc|zõ¥g¸¢}ÛOÕUéñ!%@Âíç¥ßm¹v9ôÈÚ+QÒcÏ?'À4c£%%àAÛ'.¯«¸Q¸¶0dÜS³îC£÷Ý%$ô¼pÄ:¹(hLd¯<#hö1X3³¢ÏÅØèÐøå§²Íú¡.¨KqÏ¸eÿ¾H¯æîÎÜ7³u= q/<ý\ióLñ$w£GÑ¹zÿôí©¶¦EØØ²HY7RöÇNðBAÆ§8ÿ&.ði? °v°¶ìcøø¤ähá= DW×mclÜê<ô|­p7<#lïsVÊ°ä3*5ÞHñ]Þû5Gòqw,uhõÁuJ¸vJ?HËL*Ç,wðB56T=}óíB×WîyM
ÒÂÌ±[¿m)i°­M
¡Íãe§(¤78m}ô= Þw^kF#].âÂ'à6"7ï ª¢Ã*¾	¾à·UóÝ71\gÒ«k®ÿunÑH[[1Î3.'5à·ËßuCLBÔgî­ïÖaäèûV3_×ÏævOqaçUZ<-KsZù~©\!¼¾^Íô2^?*\ÓRG+lÑ)ÀØËDÝf|]\xÂý$4ðÛþw¸9GÐ ýA·¶¶vpZºüX@@øp	4z&²Âj3É·=Må¯= v¾gUR¨Wdª­/x·+,ae*1ù¦vÎl
^mºò¦Ó"@×¥sô#ù  ;Êr[B¢êµ- [a|>]ê6¢JHXÎÒ@:{=}qá!ÍÌ³K¡ "A=Mä= °zÞÆç*1z^5ºbÏÈ*mZUíí ÅÐá´ çÏã){ÜÄ½
8ApG× ¬·F¼EÌ1å9ÚbnX&>÷ÿÉ~1$5@Òa,à¢'¹<i´Å?2U¸Ðá©´¡ª¬;pwÌ µÑËu ý¸Æ¸fæ­¾â@À2>Ðÿy2ûL¯×VãñéÊ^sY8éíÍ,FìQÖ§<uDR.´Oôùï lh%øiîcÜUª4Jsá±|"VèhejÙSqúcá5T©¶Ê¨^'Þl ±ÞSÄ¬#ÂÀÃ"¼ôÖ£;R"¡sÙáY¿±Y k Ç5wBY®z®³
V9Ý-[°,ÒÀ\l
þyãÈËh8ºÇ@´i1üÂ&qÙÖ-b:ê|Ï3 ¯üÃ¹¦Ædù"YèIÁ«_è;÷UÓ¬pÛCôÂ»s]@ÇD ëT®\,"jif¨ 	hg£> )[Ç9)Æ,3Ó©Î¼= ¸k@ÄÊÖH7¨Å9ywÐ¢WBÄ¨)*Ó/Û#:÷¤%ÛKu3f@¿Z(M=M°/ }àPC¡OCÿîòE?¥Æ±G(´MùcpÁ0¶YE$$IH®ô¼ÚXr§pþkÞå%>ÖÚn  ºóØ@ýµÐú-²ø\ø?L©}]NõqlÅiÑ3Ï³ì¥Ú½vëýô3?r+¬Áõ¥â4Û¥ )H¤ë}ºæQ´*Ã8¡x(ðª=M=}¶wªf4¯FR!"µö·\VêT)jâßm8¨ÛM¬¥úãcFÁÏrHÖ¢8[á¦c@¡JÍûv
Tb!r~{%u·Ûû3pC0¦wnP/{³¹½ Þs³¡å5!Üf^¦³Ó"ì¼QÌ¦kú5µ-ðøD¿h6õÈ þ©ªVàÍà©×ãGß¬H#þhïdiÊàÕ\-´°3Tê¼Eû¤ .[fL¡Jü,ÉKÃ®ëBF³.Z*ÌE¨V^
¯ªf#ºuºY)êÜ£Pñf×Z	Iºæ2ÞÆÔUÇx4"BU®¯RÐúÖ:ô·eAAlD,[Oò0bÁ¡){Ãuánò\ a?ÁlaÇPæÌ+ê° ?ywíÑî.Ùãë3;+@ü>Õ= î}1võQ%n<_¸FÆï!ZµÑã}¡"ÉS°É'íÔ¶¶)ÞÒü;?í÷LäIá¨H0Ô#ÁB§#J½¢=}î¥"ÉØ\?rÚÃp®2q(=MY¯hµ ¥x4ôË_·2ögÉXP/_ÇF|Ë¾ÿfêÛ*Ó2 q¸Ó®»cþëÝSÛ¹
rÞ¤®Qb.©6®8W
³Ågz¦Û**ºYbY,ÒZð$æÍ¸oíÁhóÃdrö #°ñ0Ì^kØâ\Ìºå umónÏxÂA5ÁkmW,iÖL4aavw¹Ç°=M3ªë09WTÓ­¤Énýö§:Îâ-* bÀi­%º²ÜÖ±bÝÏ	Ïna«è
êÕw®ç§·ÁÂz ~	ûµ/<4Ç¬Õf¢P{½}Ù®ÏI ä1Áb= ÐgçM$7G=}sd¹P»ì2U©B¿eM&%T
5´iâgeúeù'ú¾"Ie$ðW´K*¼ÚE=M T	 àýoC½7Äf*±²ýÔLBÞûGW ô õ¥sÏÄûnüvw¢]×0LþQiÅK¿¬ÇÀ¤¬/´õ	4tµbU,¢2¬ ÄtppåkJÌD·É7æýD8ªüMÀLbÝå?;¤$Â1½\iJfÙèôA»ýMÝCuü)ÏUx}êßj¡4x¢âêä¯±%§^¸©ïÂõ¡´ÃÌãq§è&¾Þ°®÷á]9´Fñ Ý3+c¾ë60\¹þ7ú=MÑyÿ-)F¿ÑF¤2Ù­ÂgÍ=}2ÈHéº?é.½=MORèàl;U¸/wØs¯£à±:7p©:®¡ZLá*wE#vShdäª¥JNóq¯BîÅó¡JVAve7¿Á,´¦@0PôRC5aÚç¸\·}x¡r6Ïpoÿ÷ÁÕ«G_Ü7dqé³wJÏ¯3Ë |FKcÈ¡´+/ÍN4Jðø VnÛ·ø= ¸«A,¬*=}óo@Ú¿ö»b=MAöf_ú³ï¢ÓÑ¢ÐÌJtSò²LI>Ix'áÎº°»â=MC¼Vé^>Ý¹V9§ãÉ-Ð|£CÖËÜ­ùCt[
Fg7WÚlÂ³ä¯Õsü÷±,d%¤ÊÒzjªGI®®&)AeQÞÈÇ.ú:VÂ$Éíøßó¦²°Po{±]Êv,NXå¸P8Ý_#12·u",Æ4bà"¡&ÚªGÊz§§\üÝ½gò6Ñ&{àciÓÉ¯f»5[ =}#ÿ¼\ëe}²¾~ªi~ÆÓa§N@væ4L­lì=}Y°EQÆÈ©8÷_d*8M×ÿÐÉøa=M­³«5nm'±öq\±/+â!4g,TN»ø P©0}[zñZÿèr)¦EÏ;N¡ß$= ¢aÛÁÔdº®Ñ;Xò\tIþ}T¾grGu<ï rB¯Õ}PÞîãB=}iÓ5ÀÁ)Y.½Ãqó ÓS«N¡µaÜT,BÊõd'~²h%tüõÀíÖzô{DW Àþ=M «.v·õâñÉe6eR¾fµh¾ñ¼¶zõñèLLRYË"&ÅÃ£z{èý4LÄ.H¬41~ÈdPîÏÀ¼ð lröø*¿pÇÃiz.aá^¹î/u ?a£e±lzZÚ>\¦ê= ²HõsßÔ1/ô= F¨e´B{¸Û­ºÇûf©U8grÉ4â	²À ¾Ï+Â§¹ò@YÆª´+±õ1½Ê'·³ó¯¼ô{	1ç£Ü½~ííÍñFû{M\ÎîÖ5h¼L+;Âf4Rs³++ôp¥\±(KR{0ãÏýñÍ;&e¤»ïí9øl-Eî¦§âz{´ÈDÔ¬Ì@ìCÖt Hv¹é³ûé#= 1H/10ûÍX¬!L&Ì[(Ì£¸©äh´|®gû4×½Y~#¹øÿ'÷J×dF4¸T÷ ¥£bÏçÜþMªúSOÅúr0pÛG¯µ]LU³ÍÝH<äO³Åúª"Nðå+/±#Ñ¸£¼Ä/]»ÀÎ0¾ôËÍDÍ½IæÇÀöàHÂ=Mæké+êévË|àÅ.UK
ôF1c§Ô+ÎÜ¤¦$îP7ä¼ÕJ>ëC¸¬KX»N8üÐÀ­G2¥g>}r°ùÊæ.¨ä¸´&ÈWûq
6¹ïÿâî¨Ïº%Ú!ÜMÞÀU=}ð"ÛZ­ÃjÇ=}âY<úÍìuõ÷p¿pÕ6âqäÔfÔÜá;ÀÛ	)Û)%			^e	I!=MüíY¡NÈîRþ@/·°ÍmOÀÇ(óuWu!¸õVgÆ½ó5hí²¾8,ÚAÌr4AöäfgeÕ"Zz
i,òk¬SÎ%>6û¼u
ªùâ{rþJªÆ0³îêqvHÕS8í´öhm±hÜè¿ô<ÏjÛ
Ëä\rçÓ'ñmúÉgðB;9i¨ÜÌ{îRxø+Tz®
åÞë¥vì[JþæZmË[µ÷ª4}qRÒÜ4Ýf~ |1¬ 9¹5lK/=M0JÓNuÏMüæ­Þû¸Y4 #x|= >ÍÆZ¯:nR{ª$* ¶¶2èÌ>%m ÿQd±P-
ÁoJäcNôK)÷è63W+¨¥nÆ¡A§áÆ§ßWqsÝ#ºF
6]äc&õîáÊæ:=}Â|<f¥¢e£Àà^	Ì4Öçã#s^MY=M:­uygmqEÊÑr«¢H·ÀY>?ÕAëéXjÖb&ù ¡6âyÚÑÌúxô¬¼H'¬+5pP*þüGzñè7A)-	Ê0BDmHÐ Þ+ª0®G±uRMGm/Y<¥go³§Â4Hð=}óç6À-	éàsó9uÉ+,â¥Ò.ØöÑü0k5­Ñ¦.&ëüýpz|Ú¦ZdhæÀùèíü<= é!gaô·îØµÈIC;­|°Ëo~)ñ{Pö<FÑ{D¸ðÓe9?hBêÀ-
²×öÞ1ûWDPzö¡j÷ßøÆZ
aDM¹}éO70ÈÓÔ2?A,Æ¨d«OãÚ÷YTKmæ:¸ÆÜÆhàèdUo·æ}ÆmßwMå¾!UìxøCGHFGfnØk:e±Æ)ùTÂÊ¬o¥ü·Hp×ÛcI#º|&ûß4qYêæwA¼íE£0Ôx²'Õ'=}æ»DÄêóÈâ6jÅ^p·~Païw
¸°N¼í7­×~j:ÎG H smâmá«7-°í =}mÙi'pë*K2¡ÞâV^É%gg~lç½Ò
°oã)kË*c¦ÿJø_µ ³ÜéßÒïÔ=M°I°j,KCÌ}}P¥Øs._ÆõZ¬´äêN­»ö²¸Ã#ÊG?­UÙ­JejzûË(}®¨gñ¬Ïº<õ6ë8eK>$Öæ3ù³²sæ+¿á]#[:ÜJ6ì@¡÷!U£ i{ê= =}iU,m0Ü±ôú°ÿ×µßc¦¥ß¯S$V£N£Î®^7#Áv#I/ÙGu;ä©0xNðqßÜJd-cÅ;¿±n	ÌÇÕ"àÖQRs½BÜ|ÇI }¶à'ÛCÊ³@æ/¤Ôw+aAå©çI2äÄ+1á±TOòãÇÇçOòäÏ³z®³Ð ´ß£VTIn¸èÕ²º=}ga;v8\GTÑwax¨h{Ôdqª_j±¬ÍJßÊdñ©Gjy¨Þ´S¶ÁÞË{#À»¬Ë*ßãS¤ÞT4¾¤~©nvZmo	åt]ÒPJDwâÌ¶¿STjÝ%¸¤Îß9«9ªÏ{56#ðßyµ»SDv¨aÅ°w1¨jÉ[§2¿8¸´ÌÝÐx8Ü EýÜKv»|U¼øhÌeñë(Ã£UYçúçDSLîù_õúÇÿ(4¿º¤Ot=}w|é8HÛísfmc[DÒoêûtPW½]=}ÇsKê¼LV²6kòfÄx(&«ÁAzq1Q+j'ÕA\BZd ;W¼Ñèü*Å[À×$ì|µ±uûÈe«&G{¬öoa³F°ôî³=}C"|pzJ8ÀD,eO2f:·®¨À¯8ÂOÏÛÈ5\TöFsP¼+½#5[k0E¼ù{! ¢W=MéØ=Mx¢+áGê,?	æåh¯tgÁw´%uu¦ÅnëåÐ/Þê%Åï=}PJKqÝCG=}¹ØæS·í£ 7{ï¿8ïã¶<·<ûk e&f0½Ñ&Þ´=}ÄéN¢ØhaÄáTü%5íÀÛìl¿dU|ïp &4^Æv2{h÷ Å7+x®îß¸Hdjô@m«hÑß,Ìf9øâP^ú¦"e¥wkWxWÞ6¦¾?i²þéC»TNô&¾pHß´Â5=M:d´R, N»¸½:zÃÊú4ËB¡ÖþZ@  Ã2iÒtÅ/© FÆÉXÕÓO³¾Ûs0æ³(é»RÅ¢:zuwçÕ?½d÷8¿òÃ\¡°Q/Ý¿¡9/p_2WÚGy3f8øIëV9I.\êÿöG =M9Uý+ ÷Ü}J~@»o¨q§_>Ëd1ÕüIÃ=}=}µ¶I^pãÕñó+k#càñõ­´ö¥t(ÛC³= ­Ôuà+DÁå½çòòÃÕ= ±tx§tt>³nÝ*ë¤´TÇPJ³z°+9áÉÄ¹"ïÊ¢§2?]°¼&KiÖNrï/À¶½SLj±¬Ù±{{µO«ûTd#ÁÞË{	cÙàé%ôckª§þ²{]jé%ð¥ÙäÊ61ïë*åfa×ÿ®°zæÕd)¤¾OÆûÒà2È%P©xî%¦yûîSc]ñuD»G¦:$3ß&m¿=}JÀ*¥¹* ñ*1·Môþy61ÇoÕ*ø±úx£~ìdScäçZj.=MeäML\òc>@Òf7ý~¬ñ¥ãÜ{ 
YåQdÙ°ï0·uØÛ&qa¡Ê¦Wg
1.µ{]1nnÃeþï¤;ÖDÉYR¦Yjòæv§é²µ-õaRÛÈ\²ò¤¥Êè¦ð=MVÂ¬×MANdYËÑúa¶mà+ÂßgH»hI.Ú@ÚbLÚb%ðPðPðºoýÄlIs,w/æÃ²Ù*Ø%~@n4Î½nN"-3Õ5<i©túQmø­ÊJà³q'ØÙ¬î÷µ-¡:]R­2ÆîyOïøøIG÷îYíÑ|1Ç~Õn9\dQ©~àÖ5¯°fÖøK\baozÕfnaZB:ÑvnÕÖÖ"glíoÕrùÁ1¶ÊÅ±èçM%m_ÛKæØÈJ±A¼kâbÎû)3ÍL= õ§q Î°dËøÂ½]:}x-Ü¸£-Ì(= ð*f¢×Q ]µÈsFØdþmZ·,À^þdH!7d=}¨õè6ÁèEÁ
-ÚØÛ/o= ãÕ-  P=MQÿ°ÑÕDºYÈäÃ\ÇªÚ¸ç=}ì.s[ërGJÊDàoâ«»bÙÔÊ«!S_pðùôG¥	ÛH¿×TùË3®³ddú vêKÎ®[ïºYMÃrcÃuÔOñw¾²PYãM_ón,%Ùré¹\,Öãrz%ám:±haMUNyºã=}òævS®bÃúaËPÀSºõ»NÊc­Ü¬¡ËiôFnÎ;?]	ØsþiÄß=}KS=}íÅahGØ|ú,éfõÐ"Ý'd­NÍÍÉ
3"A}Çó©ÍøU/¾äÊºå.mÌIÛÜÎbÐ5
ëËm§ãOÑô  [wmó 3IL#Wõ¥Õ)_·¿Ðk4Eö±Kd§%#Í4wÆ:ì¡ :;ÇÐ7­ýw§æùùY|Ìq7-
\Ôo­¿+V~QÀwD}ÉÒK¹hÓ¹ÅD¡)òÅÅ£à¬üÆÏdjc¤±0ùÙª,ØÔ·}çÿÙôý½;)¾jÈÅw3x·þÇ|¬= Iï$xiÌKSÍÉL<mó<Åoª7q]o2
hþð= üIÕ®)õMÑ÷v×¨Â*ñ;©v/oæ¨K®»ÌEþÑ
¡FÔÆVíV=}% Erð¥YSHyG9ÿ*Ðäyï9)!,ä5d/î×ÑfVÛ>6t
FtCÜ5¿½= x¡K±û	p=MÌìóÁèÞ÷(+~Èðð=M\¹ÐÑ»É:(ù5XàV=MÏ¬á²Ü uSÓ%$ik<d-oÓ¿¬å5®5ÇÔàÎ³oþ!LtÜ	+4LJfI×:ïæ=}ëâÉîÒhÒ\$8%?å}¸ÿé¦ÝÅ¬ºÙÔ^¤Ö(;°¦®ë½¨ßõÚ¢Ó¨LG´èçÙ;ü1j¯Á#yï¤Æ:ÎàæpQRE1 îWøMûG9­çuwG"}õ¦îNÈfÔëI%uåzÜzoüj)²9ÁíC>ìojóy-¢Mù¯»w8,Ë1B¹³&¢­Õ¢!'!}uå³17¬HMm+Óíé	É¦]Ý·oÿQÕp§/<bC2êÌØ|~dr´<ø.:a4ëTCãðEmóiï3âTÀÑì7p#¿Ì1Äð¾Ì_ýä\mñguiz$§|äÔLèPÀñz¯u]Áç[dÍàæ­=}+A­qS¼ô£cÂó£'£¨uÇ	Ù81Ï=}Yü,2k#ÑÍC.¢ËØeËa¬¶¸7¼ªêGªå7Dä°ëî±Å3ÕúôÕ»l@ë÷¾ÃæÃ¬xÍnN¼)]è¦ì§µDÃÃË!UgÆsèMpÑ9'ë±BËÏ×Ä\¤þ·ÿ#5LkÏ¬Âjyû4[/ÿëî¯¨ôR#»¯Iün¦^ÀPZmýÿó70ø]ºD\àYÇR¸B÷×ÈAº1ÝFÒ¡6.¢¡ââ"¡fèf7É¬J7!ªPÝÙ= ¤×\ØQäz¯w%ÈÉï±uUí±t¢IÍ>_ÈîkÑ!ô½OÐR·iX]GF²	ìâhØbo	"_	Ï'²ëç9ÊMê,ÎZÈ¥*IO³I¸&+ì1aã¶vÐ»]8uÁ9ëÛÑË1âFc=MÆ\#PüóCÄj&Y7T´Eøè:v&¬5I}ÑÄÌ©Ý)S/cëtÁvy×.iu8¯Iî«³ú°ü	>4¿vyÆ%âKiÝVÅ@ñ1¶¶ ñÚX3ª£wØÃÀÞ,EÜ
~ðF¼ÜÃjW²C«¸GüPcA,"s(\«[1²I¥8@n°øBK	«Ùtj5·eÕÖ¥t~ÿú;ïd=M,ë¿ðÇü?JuùJîÏó(¹è'>i7åkõ:Ø8Åg4HÅUHIáhÛ)ïH<ÕOûAJßJ!Ì}mÔëöW=MÒ
øzxåß=M/
N+v©·-ÖýI.'Ü_Hýòh©rÖ©r¨×ù&%ü§ß Ôë"uI%T%OÊ°Á vïÿæGÞmF7Æ%2c=M ;öæx/äÛ#Ígã/}óTáI²WÄÑútB(# éIÁñ#Z3l*Æ:æP\J2M°ýÕ¾æ\ø Ý½jGø= ÊÛ/qYßÇTÉê~¡³FqnÄéÐDRnd ±n,ÐÕEÑÛÌÐò?9Þ+ßg)Æ{P :OmÑÜcÑ¼|cSPÕ{ÀvD0Å¦aAÅÒÍBA= 3¬Vá,ö-×·åsB/×¼àØ6W éLº\IÂÄ´£hªWB0¨zÇ*á£/8ÏVuä[fØlûIG0ã=MFhÔmÌfB5²ñlEÜÁÝÏÀP·ÍrÛÁsA"Ð¼1ªnÐ8óÃxô3·Ýî«'À7æ-g&5Fõ9ð¿	»N[ñ&¡WLÉ{Ó=}n=}fWI$1^ü¾ì1züFØôÂÒ%²Cd1
(æ¿Jå±ì»B¿~«okÄá+Î]7ß²ã<ßæ<2öÜ;Ú¯,|§Ry=}Cy<ÔSg¤k×ôA®j,ËR¾]¬è7Y¹ùA7üh»ÀÍ?÷3Õ(ÓñsÅvÈ°pZ¼WÝeÓWíR¼¡ÌêÁÉG¸ò* úÀ
!ÙNÏ¾æ)¦SMk§8AoôµUëàD
¬®U­^â?ÕAþfF,¤NÖ{¬Üè+IÝLªkþ§=}±­Ð|Ìþ~£T§ÃßÛ;VÉ6iu=}UGÁ¾aá=Mh3Ì	Ó~c.}ÏUÂ7Z«Ê0Æö@4f/<u/pÕk;Öø8·Á§~Ê0ñ<XÎóU¼nEÍgO#Ñ®ìlO»3×Ü:õ5ø3j.6(To./ÂßãåsÎ@LK§t%ç¸#ÉÐöoï3$'ÐÁ|.	iHóÛ/©^í*\;sy±üSy]ÕðºÇàl¬Ô~ã9wMn«×¾W}C,/&­ºÖÂwP4ù²näá±m¤á±ë62	ìjYùÌhiÌ)ñl¼®ÀÖÝjo/q9Ê(ä"õÑ{Ê3²-HD¿ºj¯ùÛëÞºýÎIÞyþÔ¥ïùØ¡2ÇêiVUçSé8¾¥ÃææÑOèÈ¦òøÇ;QíOPîz÷ñàYÇdÏ?ãºµù{Ö(ZÎ\ñ´fç0'fm9^©ì!62[§Ãõ£UB+EñP¤Ç_¸ãóÿv9pdp0üÌ]ÙÂ,ÍaV·ÍVT$#Ê6×@ÚòÂLÝa:Ë[T¿%Ö±ñà¹xÌqý¢ÖA´DÚr#Î~Ò= ,BZö °1ß¡£@w;ãì·¡BHÆ>,ÈÙ±\gÆÙu+ø²óíØ©ãzÄÐ#ãËïW»£æ´Úá¼:x«¶úHtL®³²wNÓñÒeG&ðõwüÖ0¢A	ýÚNhég[JK(Ô ¿¬ûñÚM/o·=}¬Há>{øN-pÆ¯ÁLúÂÓÐ«æG¶~ã»¥%S|¬ûä&48¾Ï~3'tG90x¯Â«DÇjð0-6'"Jb¿SBn¤%Âwf®¤¢éÞ#i§&= þõ¦¢wÚ¬C2êt'!ã@m'qa$äUjKÇ¡k¶D2áò Yç$nNÓlã búB´ôï¶2èé:Pbìb!Â÷Êæ4!ÝÎê0Pi[O4*K¶1)Ek=MgÓâh,~p_¾ yÉnà³Tr¿ÆÀ_ºÕ	0Züoì&aÄÈ©%{g"+ñ jÂ¦ýòÕÌjvwÁ]ÍrdGÕÆqnxp<^L*Î OãÈá1LjK= ßÎ">g'èø:¬S>·BqA¢sDý§ÐÖÆãÚs~K²æ³Z\âIÿÔ´{¹$êþ¿ÈS6K¾eó ±am+TÏfcoÒ~§×¡øÚn¹Î_?zyúGÃYÿîÄNõK]Ì¹¶ì§gÀÆvH¶¢çªb)'Å5Idj>µç¢W¾í¥­:øiµe=}Æk¸ÖJ¥=}(+%°9g¯?d(xÄo7¨¯s&K±øÇÒl¾ä"zÉÜøYÜíÀÚkv±#mO*süÂGçìR@¼3'Mý3.BB]Ï= a~SÀQ9,xìÄêð!Ç@¶Úu50*! y!p°ûó¿VäWvËLý4rIP2Î6jèßë!o-ÿ<ØoÉuá¼¤É@¤;|Y1H\êÏt3î÷âÿÍç«8n¬~;:qB@uJ>ð²ÚlÅQñø5 
*j$^örÁ\Ì \\Ml@1kë+Ì°¯îÐ÷ó2(Þgã+Y:ÉXÚ5Î%jÔi^ußò| Q¬Ñ¤bO¹È^[)t+J
÷%j­fÜM@V2ñ¹Mîx9V¨ø­Ú8­Na)ÝÁðà¹4ÝÊ·øf#çTÆps!K þôP Ê¥Sü¦ôM»Wïæq¯¨5#ÀAJ'gdk®zÉaÕ)IÓK×6ò¯×þí'MÚ¨j=M<T¿n°¥Vi=M&6hß¢À×O]M6o
á&ÆC^é¯X,¸ìnI]ÀÁ^z»d®¯I¡QHm¦©5Õb áÍ9þ6âi0}AàÙ+
îÇRliû3^äÈ»]ÊR6i¦v)^æ\^UlÝóPc"¾Z´nGQm*Lô\@¯a	wÞ×@@ðªZr&b}ô5êl½r,uàþºÙTfÐ¡G?"
Å«>ë]ËÙàôû]µ|ÞCë*hôóÀ&ÙõaX_[jz|#(Bä£NÁ \}ÓBa&¬þWnGÕ$GEÏC=}¶ÀG9$p1øA.\öj=MV' ©Náõsò5è¨ùÅª·¶ÿÅÞåDê¦h{ª+2®¿-'«ËºU,sØK-*uÓY(XXXnÚó¶Õ yF/EîOmõ­ýEÇÖè@vð¿×éÿqRÍ(ûQLW;\Ë½bnl=M<Ç©a°Þ·½ñ¡MçUÓVÉU?ä{2âÆÔö^Ü>°þÄÅSe[cãqØP*_ÏkaUpvÇÙ|fN^Øý:7.6x7\ûñ<Üß$s=M;Û­ãêtçÚ@íd¦û<ìç·ÿæRz[¯Ølß%Ëûm½/HpyS;;g"Ús;= d Ç2ý®ÝÒÞî¥STåiÃcQ.½þb·Íá/3ð´i3oÇ8uCj]$§ÃßÉé¢¼»xèO¼Çµ×hÙë£.s~·xÅ¶Uw3ÔÂZí×IFÔBs;ëý½ì÷!eÆ-dòìej ¸L"ðµáÓRîejj×{ëejêjíÎWÌäyz§¼ºçbä¬ð§uáiW2Õ0õ2U6=}ìGÄ½e3>ë«_MR¥ò¨^Á´ljs-g"Ýëlb]ÔD_MÎ¬a õè¶ádZa ?¹%ÄñÀJSy'÷tUDdÓMùì /Wï/ßãæ<UL°-t$t¼MßÐ-	ó"*R¾X_èþéhJé2R»"XÁ°¾ ÅLWofEå4aë	K)@Êúe-¿òÙ±¢n@;öôr¬\cÜ$øY¯NxúóßHL´¡)¥pÌIé"¯T©ÎØ"H®	Þô7÷IËoÌ#á¶ÌÊ'çÅ+¿ª¾5òèÒ|ic@¬;MVï7¾m¦­ûxy±t¢FÜ¦È[Ê8Y@(KlXSü©éälã+7¼¼Õ :=}r´Öú=}Ú2/ÆÆ	¿"éuÀ¿r;¿r;ÊzÇj¾©1Bµíøo¶Îi¡4õx	?PÅ´6,>9¬|¯,9ÎäQíHfÿ9UÁüGoA)\ïú|ð±ìZWôBÔ4i)VÀçíþÆUJÓn÷Ìï{¿ÛCQ¿Íp{è\3´
Î´WÊôJ1¹"\K"5liýI³õÜÏ Åb¹ÅD¹\FÒ)¾Ä_×»jÒùk)à"~çp3Ì²]¤ö5À¹(°n5k½¥çY%½zaTìd= ]­Vµ,XAG?
Ô/ùÌ$äÑìdX-ØIÙq.iÖ9²ýÿhÄx;sÄa÷eú¤ÙÎ´tlã÷Wê¶µüs+}]å¾g.¯Ðm-(-däþJÚ±ké¼I%i¼-Äj¨ü<3= ÕsðKß¨ÙäDB*xgÕI&¡·òÖATfÕ+kÁ6¦Ñs×Ò^÷^H!ÜÆxÕ@¯m²ãRÊ0ýþYÄÌk©Êí¥4°Q9îÅ6}¸vOÜê(ÞGô~qWrd½S«½1Þ]þÒ('+µÀ§øKÔ<ÿ·;É-!ÝÅ5Fo@ä²øe+'.ßÔdë.ô+Ç£¥lPrÆÑnëÕì7kÐ§*E(fë*sÍIHLê¨¨y}µJµ4Di.}®P{ÊBÀ±0ã§ë ]î&[ëêå6<ùàßÙxÂxÕØÎrEÕaÓ¤µøÊ=Må¬¢§bKÐN|®ºÔvÐ+<Wugã¸b:Ças@®r<äï "úøkDlBX/néÞ<§¤7ÆsÚ -æÂlÑ|'Ãd#ô[O">~ÃÔ»Ú\ÿ¯'K>^á­	0ÿKDõæùVæQJ,Qü'ý¦^xâøöà,YÌhuÈU=M"RÄ÷ÞÞië@= Y8uL DÊEì¡è¡ynV¹´ã	(u¥ÈêMDpªÈ®hKÑS~GúÞe§ÖÅÐ4Ùpê¬rðÖ#V.¾¦³bIç×}CÎ)Kú6VO¾*iÂ@ád7QHæ³¿AgL¨®¦Òþïô¼-Çöb½4IóH´Ì@Zo=}àyK?Ý«GáE:uÿ²D&&Â¨Ð¸[h¥¡w:z|êÖ>GmzÂë ^ä4°Áè]XFª	ÞÎÎèyW¬L Y¶¸Üùþü ³Ô63ÖÈtÃ@-(¦¼²µ\*ÃäÒv¿IH«y%ÏÓB±=}kÅÌ÷GÍ=M[íNî9rÆ.ÞÊÍá= 6ï2- N(¤ÁYÀÕÇ²d¹äã?%B=MÌëãÆà(°#>ïOí]9¤ûÙÆ¥Íß¾=}Ji1z6.~C¯õ¾Ò°=}3ÅàC)÷!jSnS\©uÑxù<ÝÒ= ]ïQf*÷²x´ýÅ ý&LJÎc2¿Yf÷E7#øÑµ?§:ÉÏhÞ­^.å.ÝÈ¶£=M\/@ ¹ØõóYêbÊ\ïu¦²a´7vÒf op´bÈ_&¹rzl¡jÔ¿öß$YÜNafä.p,¿±&1I¿Y= }·Ïx{Òì¿]%zÀTÚ6CæµÆ1l÷ùPõòÖZ[1ìû +WzÁzÁNp!n!bK Y= ´Ñe+wçvæ°\Jª>÷¢0?cc6­ÚA_d´­«vr¹ÞN2¤k<6ã7z,	µYô¶¶¨×åþÍ­HxDôxZ½WäøÀ>>Õ(æ8ÿ),Ü/>2¤üÿµ:GËj*&"fDÃøTÈ5Îõ0é¡üóiV%:õs88^V_|§Põ³~)ÕÛZ
ÐÒÕhþÿø¯KBàÆÂÖ9ûcþÉµ¥Ð/ôÈíZ¡g&= »ìJ"øÒhLeLKï0û©nõ ¥mý~öÿýÒâ%àY D6Û[sn¬o|¼Üd½eÐ<aúÌ±£3§çIðõ=}n0 Ëlp	'å&ÀÞqDÑ,@Ýùq }µbâV&¬5Íô3_FzêÖOÎm>q¹W%ÚaÄ±ÕnÅtx¡+Ü~Ñ@ã¿'¸xÎÃ÷ï0^ªw)WS®oiFq»Ä© ´<ÑDöÛNO%9÷Sr¼Ío÷!U6ÝØç¦^äw»ð^ñ=}57= iæÌÞÈÍùî§Õfdµé:òÓA¥×Ówp¾ ¾kÜhf/axr®·º]àßãþ¸«s¥âòFä½WÁCêèc¹}h~¤ÉÑÎ½1÷jlyú	iO1ý­SZáÑÂP¹oV#¡²ú Ê¾Öýqo¤;j3wÁ}ê4wéLjgfêO­0n-? gi¾þ÷§@Ï²HP-iUÕ7 ¢Kù_<UòÎnÈH¶L5)[gÅæRâ´.ßÉ^sIþ¾7\}~J1paõÏËQ,wJªÁýÞSÓ.¸áäÃÀ·t/ÅÝ$ÅÃÛbµègÙ¤9üÆ*[A­ujr$µcñ£ñ¸wÄo·UÏã{ù«à-¾ûZçn<ßÞ77£nÒäyZîr>çM®jµß&aæË°©íñÂÒj3ê÷¢Èh¤<U²"p)Ü%;Ùªe;^þð0!8áÑ&VÆÝèÁe'=MüSß_òZÃv¿= 2= k)U>'(åó¿ì]øu½ñ÷ÂÏøÞ?ÜåJîMl«ûìêkh]¿hmVï¶zg[]UÒ/¿Py04Û5Ù;þ:-6ce0CÆÔH=MT²aÃê*;Öãë6;ïmÂm7dî®,Wrû!'CçfEÊÐÓ¯UÖ6±¹Õ$¸ºÛ?Òy^	+=MÈ<7¯>9eXe"i¥|±£~±úi
ù£Â= (­´ÇzuRh|ã½L
â÷êÍfcaræ@âóÍÙPNÒælõÃÀ½Ô@0¦ÏlÿíTùV.ÓPÜ;²e3 OòT]w<Qõÿ06lÂN­Ý¬5fÝ|}IàælNÉû¬KLâ¼P6ä0®gÂ5®&t¹ÊåLáK9Då¡³Â· õ¬@ÞV¨Ëí³ëçÔG³üö»~%cv¬é
­ûå GDKfêá¦sö«Ù å/CXóùIí ØÀ@Ó= 0ÊÝ!K<ô>WÓÈ-è4	G{)öL8«?BP»«·lrõn·Éy¼a8_jÌ¾Gy./êÝ¥öAÝû¯Î;Ýû@F~ÏR½\gÑö= ÐÞV0ö×¬:î»hëFæùãí=M]¼Ùûü£{3 ¤ùp<ût? ÅJÆ(2X}}äèqÉïëXåew}56Ãæv«ÄúºÃvn	çvø±úÎ_n²©tíO-t~Öd(Ô6!õZhÞr/í³â'u=}m³çRÍìUæÔ+¥9r NtDþ¡\Gb0Áé]utÆZkêë?ý<Ð>ùLëé{Rôãhr®dg½ºÒî_Á'gf«UÉS ë1ÆjúSJÊQ$×=M_ÑT_³íD+¬®'JÁ¸Ææ8î6¯òÖ¢ÐAÕ²~³¡)BeêéÕv>0´ïOÆj¶%Nô¡ÑVhd4Q+õBÙüÚßU"þX ÀB´a.'}_AÜ£¶ã¾1¯7HñDò²íJvwSÂ£¹ñ2%ÉM×3qC2°	9=}Ç] gs sl{ ½_ÊK[®e«ØäÜ$ xïScBÛzÃ,C6!r]?;¥f&	^a¿?]²0B_b1oÁäïîXh&ý"GísÚ³ÿúR
H QÏú¶}i»7¢æatæ ÖÉÔîe o°= ¡8®À	g(N Z\"íòéÇË7lÎëÕÜKorÐvíGõ7aÕ÷*ê&¸®<GÖá4ûö4kDÿFØ.?6þ4â/¦Í{rÍzL0sæìðÏZþáëÏóJÂNë-6-½_pr´/[F÷]·ÏË(èLJÚ|®5(´èæÒ²¬°0ê×ØkÖ= Æýñ/h]0h?ØÆø¼=M
SHn];9ÐXTêðpßq=}gsK9XÔíÍÊ§+¹ânßª÷@ì5)'q@ ¤/î©¸#(aÞÇVUo:ÈÑå°r<Zr H»}:_%Ö¦·í&÷õØo©¨rªIÆù^smî¦¾ùj¦ñ7à=M¾çß^öM²!ád~°Á~&h/ y3#ñàÙ'nE¦»ÑÐÜ£h¤¸¾sÝÈã³
)ù(øqùå;LbaHóÛê	|ÿd8Ú¤õÌ¯ DÖ3MoXaþF¯%E	#^èÖÈà[ã¥)ð²ÒOà_#øcÃõñ	[ÂSÒlï,@|r6@V [Â¨;«£r7³$S#¶G SØ¯Èáæ92eDüù?ðM¥Äf.¿YÆ&«S3¥s>tÌm+i»t DþOü'±¬GJ9êlôü¼Rù.3×3= Þ.:oÐE>K<?Ï£ÖÈm·ÿ1q=MäÌUû×UÔÏØ80ë«ÞK¤x XªQÕ3ÓªÃ:ÈI°Iü38°<J%ùÐð0qÏÐ9PÉØÕê·$ðáºªß¥ÿ¬»_I¡Fã?-uÙd.hÚÆvþ$¥_GÞT4¦¾3]Ý¡TØt½ìís¾oýþ²^×ÜÚsvüúõâñtÚI\ÌÎß®ZIn]êÍýx£ý ¿ÝÅ®¦tÓ¥Rªðì)xI(zî?*³'l5Í}¦³ÁUîyª±få%²= ¥ë_åd£R2 Ý^brÿÁ$0ºá$= :Jc@ªæ»õìz>ÎðgNÛV1ãhQ= Qfß²4-ÇÒ8X¬¸£,¤wàm5è*íT8£*$cmChýSMrÝ¶öpÅªp] U3Þè1lÜ¶Ü;ós·ï)è,YW£È~åð>¼GhcÏÌ¼¸ÿþhk)d´QÞGb%è¼MlKìjý·=}k:#ÌÏðH3ÜÌú\N>Ì= ¾ ÒÚí¨	üU:.cÜá9ëFS¬=}r×½\¶ûN­1k."T½¹W¿|;ZäÐúüßV]:0Ó| Cþ;\YëæßÙ ÁBöÌ¶~ Û#ð1bB|jèj¤#þ_ñ5Ä ÍnZûse²¡$Â£D¨_ºxxi¹£Õ±S¾»T® ÙØ4íA½kTÄ=Mf××íRëG²3\ï£NQÇô½FÙN¶ ý}§?¶ÔìvâX±>boÎgV ¾÷³Ùøl2NæäÑÞÇªýÇ9Á¬òo§/gK~Xh#¼|ã~ðª¦+Cät~Ikbi3gK(5D¹ÎV¥îÿtÑ÷Wo­¹X]m|FÖë+.\Oÿs¿ëwéR]ÜÈ6¡³	º 3Á_õ¯ú@bXT;xUq=Mq&O¼¡ &¶©üÉlÖ(e&­äJ¦ú/éü
=}Z¶µR÷TÎOjÉYÄ4ýÏìë@âÒU{Î\h'
æhÄ!ðLyOgæyM0mØ|Îtk­ýL2÷U~Q¹Ä¿oy´T$°õ¢]¹KùáÑéÂ¨³¦±\i³£ÉÓ)(Qþe8O»v°ñàý\GKÍ¯Ú)ÚI-6ÛÛªq×ÎE]¡Sç5tÙÃø91^ ÅíM@»~ds½=M_3 uun¼\-=}X:i÷}}Ct:Yäå¸ÐUÀ70jäl©ôãÒ#nØOý%È6æNz1ÅÔ³A(ARO ¨;Àê5	¹a:N!0¹çx*lÑêÎðjZ Ij59ÏX)<Ôßo			Øÿ´üø ý9á®øéééçyÑW¾1´Êý×¢j+)õ*p¹+&æ¦é®9·8M­xøDM­HÐÂBÐ6|äù¶ñ«°TÔ/FR-öÿ«ºçÈHi=}VtÙ½IÇqXaåÔwB?lÞàoSÛ)Kùÿ&öàïÞKÊ¿.qÐÌÎT²=Mÿîý:4Bêp= ñ¯üæ´­Nõ¦ýsô¬Ù¶²tVM²ó"aÂ%*ú¼W¥qïíöh¡oÏOÂ3Î¶n;f·FK-«lg&ÙJE+vÜ·= QË(á6ÿ°òOÆÈ+XTÝjëì8·pÀ¥_C;7¯ÈûîÑî/Ò,üõÏ|pÉ8&ÅQZ»*.XYÜÎ(.7±ÄMÙØáË8Þ×ÄàÌõ²òª¬Êíæ|éZ}²C´ZÔvÒ«ËÐC;õÕTK#»ìCw¿­Â/e¼ørB4³³¯¨oÕ±3©^ÃÕ¨Ð!ÍËô ïï²x?¬.óK@¾÷Å·ã½ÜÈº³§Mt¼úíF2/T=MY1-aÀÁF×ù= ç_o% AÑÖçæóÿ_	¾ðuxÖ¨O4ªÐã8ò%ç@òz$0k-ÒH¢bt)tüVÑ2mÃ¦ü/x_ ;<þÓûAsvü¤kx7¬N5aÛ¢ØÞ¢FÓHz6^]òÊ(l	¼ù_MÐÝÁ½Õ/#¡çy4äÄ<¡BN¸é"Quú)K>èZ~í|¤è8ëÍzÙýÛÍùÿL¹èEÈÚjmr= èÀ®ýB×æus~òåà¥£ F­dcæz]¨äüC)q©y[VÖüoxà÷6ÑW-4íü0ªßª«$Dot;VÀ¶= $ü3dCç2eióW[)°ÂªÄaðïË_wÉáÄ§/Z,Ú@ð_L<,[P-wÉá=Mð
¶f'.iÉ3ô>»ÙIT,ª¨=M¶_ð_4#'¯D ÙT}gFßË1t5îÄWogD×+39c,^»Q=M:Dçã
0£è®ZñxR¬ò1w1.¢.Â= Ý~5eâ±Ô)R³ivÊKÿBal!§%%ö£Â|~?uèÎDýx­{N!ðiÒh°Ø¬CSxKVv¿QÀïMÁ"3©®-üL¿èg#5-b,ìÀMÂà{¤åØSâJI¯Ü£o¬^³z7RùÚ³	EÍôwàû¯HüHN¤44¬¶D 4¬÷MÛÙqp÷Ü­Â&jéÒÜ	ß	= ^= HæONó]º(­åý:ì &µÔh½/7µÌ£<ÍõþIâ-¤þ)Ä!õÌP[Ãä¾«È6~°ÒÐÝögGÎh¤fùßIÝ¨ ÖRq-Òâý)ýN¼&±Gx!5­NGÄ(ÖÛµWÜÔ'¶³,ó&U¶Ã$ò³=}ùæÀ5ó{Õ®Áðw#dJÌ¼÷Røwüé=}mç}^¦
Â= ¶Èªæº¨§eüÆ¦»¿BtþÞÍÏKýbÂ§zu©rþÙÛ-Äû"MF¥m6vt0©ÉÒsMUcä4fðÆá²÷éT*Ýf®6ÞMW3ñôY=MöÎ)Íø¿¸«hèIWÞ;gÈt·Íúèk£ ÖiÖüìÐî	kkm/ß#1Ù%­÷¨çdFì XtýC	Þ|ùÈVA4ÿ'9Õ%ÜËèþ	mÜ¶&9Ì}ç¸«ÏUÞþÍÉàâV¼ql¯i:Ïwßô«ÇªSâ\aØYífF¯­¯\ÃaUU-S'õ-§
Æ³¤§êÌZ þ×¶:rg¸KÕ»2ô<¶.}3hêõÝC7.ä"ôv?â¾PûU2ÙKë,FÏ9ÎúÉü\Â¥ä·£©±K÷éº«ô¹ 	çöÄç0.D¼ÒEÿÓq°µß-Õù:Émî7àßÅà4ùÌùÏ¿Fç*^^Àèoï#Oß¤	«Ã®ä3ø_¶§|Ô¢!vg'Så¯hÎ÷-úPy² ç5²YIæ»QÊxKá#P4êKÙèyËw só*C@d*ªä¦#SåGÖðàïKÀø®Ç~\¹ÁHMzõ¨øL5óÞÛ0Sô-÷ãæL#UB¶N3àÌt®ETp¶Vt­!CfFJ!"õ7$ôüT OÙë~Ã¾ñSw&Æ|=M_¤´	ÏúLÌª\§½&=MD|Å>wkÈJ
zµJ(ZÄ¢A·øF¥J¿·l-'gÖálÈ¡jAEúN¦<ÌÍ-ütµæù±J=Mæ³ãÏ[ä±Éº3ß«*÷¯zî±n#ý´8Î	]þqP?CÚþnn=M0åus x¤Û2þaóÑv½PÛ^c«= MëÊ|¯¤1ÂW¼«õ9
-å÷?¬e±¿Ü­¤ÖGü-)ÄüdãnRP{õ!J[zí¤M8®z y(^mbpî%7¸úÜjÉ[~ÆRä;&âx^¼^+tÀñk9¨¿w?#Æoä¨ä"¤b¢js\Êxf øX'~S ÀÍíqóiX[P¿Ã½TagÅÈ­çSUíÏõÔNÎôKÐe«¦ZXh¸ãø3Éw¡X½ª[²¶*åmä	!¯(M+©Åú¨Zú¨lçed½}±¯¶±÷¦!"xB9ºBo§pJÒ©¶"¢:d­UÕö©Hä®åø¬É*ÞK{HhSÎAUîô@Õ7<Ùt/gÃÈ²¦*öy«wô£îjÆ
WÓbà:ÚÎbß§òñ[=}wÖ:¿©Ehã¤ºÉQ·9¶W6z×vuX/¹RÙ®D¹SÙçØÃÉ-rà©È!Z¯ù¿KÌCb= WÃîÝæ!þÌR®U¼¹s¼å¯ùÝf¥(V@Äz¼Ã«<ÂõöÄHô@('>ã(ì[ZÍ# )0ÍÃ­z¥|ÌFØ ËG®{+ÝÉÜ7eñ	®=}úó!ò.ôkg>X<¾ã}Ã£ÄÃWõj%Gó@G|ð1ôEeî,¥*ü¾°É$x0Ëg±¼ò,Å·tÀÄÔ$à4s¦;GL¥È³.@®};FéÛÑ*=}oè/jlð£Ìú¯Ëø=MÑy[Ú@'n?¬íHðQ9O(nÄk%ò9OU)k½%Oÿ¸,åH°(¶D×Ú38Ù9}r¿åb±SOãÓô¿gdU³{Sà<0²Æé\oÈë·c0d´·r3ÈW¿Ò¿µXz= £i_9ëmwvGàöýÔ{ËÈ(Hèòn~æ*Ú4^|ùç*ëÏØ+ô´ÀµK+Ñ§Ë¾´À	èùÿìÅÝ5
.wìhµ/nã';¥Å¥
ÀYË³ncõÚK4ßuß}rtèó:-/Õ»Øsn½K¼E´iÇ	ÑÞ4¹0Ô³5I¨´¹*?³EV*p+pÌNíxH]µVênão×TM8¡­ÐóxÐ<ú¶ê­ù­ÔÎüªÝÜ¨n|llµI- ¼{¹ «Dê:ÇÌ]5\¹ÀI3(Ï¦®0"i4µÕÌÌßU/èÓZÄºc¥¹EÓËÇ:KüXÆUû¶×«ÓVÉEQ°®ý³­½©4^·z&*²EÍ|=M¢ÙA:ÄÚ»S°(ÍçLªóª©iKoØjÁñò%/YÑèFu{ç³2Xl2Ã$Ã÷¢R³/ïË	P¯¿XÞo´áªÖÝf?ôàõdñy«ÛöSã¬¦3n×ñ8¦(Q5ÿ½{
¶ m¡¹WÍ~óãÓ°Ík©'>ÒýÁCØµøqó²ªòÐ_HÕ¢öóÇ|Ì®ñP°z}ZÔñÿSÄÀ9á±y¡ÉA?4ÈÎ¼OIOÅðÍioBÅ&WlÃÌ:Ëx¯<ayaP3D°rá:o&p®½= ¼còù¥þ!KQÎCÌKéü°e¬ïäæ9²äfÊ	!¤´1©¿¿Æ;fjØeÙ¯<¬hqNÕýY×C´pÅ¡¹Î¡þ#'åc(yCÿG?l{F8q«è)&!^¡ðQZYÔPA*f'C~×ÐYvíòÞÛøíÎ3ø'ÚtøúwyÀúNãxyQ¸Ì%¤p\ÃwíG]mHQñ´o:Ö9ÕÌðÜøEXÙ|1qM¦@aÒ4+È[ÛàÞ7Ëõà d×rXuX·mË0}¹é\ù5EÑÓ3_7£·Ùç×ïÂ£0[cf¨QÎ¹°Ô´	ÎVJxÝn!\ÿul¡N-âJÊmVg3¸7D#\FÁxHµ÷áî=MnT~FV·L*E«Á-ÉáàÀ·n#Ât¬±½¦zÍQÜl(E¥2K¿´7ý&.·+%òMRîûyj-áùè:(Xò#µß±«=M@µß±l÷ó%j%´ 3Gíù{Ç9ª+äz,¤{e£®à´Ze®+þèÿ$[ÔYT+þ[ø1f
Ý2@5gÐiøÌÌÁÔÐ7;îK¿Úái©Ê_t8¶ÊïÈèÿMçÑç%e¨Ä¬Ï«¤k äUæ0²ßµ÷ßà8¬¹àËößyý7NÐmEèÜù7åÇFôo±FòHéì.ÏßUÎi»¦Ð3Kó9÷VTr¾¶ýÕ!ü!üWIMÁ×výH­¿åDÎ8](IºÅ	_¸òCYç±êG å$$
ØËÏJEµ~ ½9¿µ-©#då¼pïÛRñ_jE]¥.]bÁðsPbYü"ÐyÊ5Hmído·êÃ¼äÀÙKx¢*½1ëÍtuÔS<RTeÆÂ´wÅ½h|P;´3íÓÁ¢e}Ï6Âlhh6O=Mj¬,AW¼x^yÑíÑÃytØ5.Õ³;MæGdï²¤§ð8ÎEi¤·YÂBR$À ¼4¤Þ+U~ûrAÞÀo°Ã{§2ÞÃTA3gØ¦6ÜÑ$Á1ö	mBé¤g}<ðQ®«c;|þ×"kÅ níáÔM¹wG¡\PmÊ7ÎÏm1ø2 s#s=}#¼ûõ'Sëaúð°Nh>ìªÑ­ã_¸rvupC¡)Æ]ã'[,³	?= bÎ\FÃfìÔ,ày%àwS«_¦à+Èå²1VüVx[EÚA6÷ûF5¡R
{ùd»ÎÚ·-¸R¸û ;&Ý±2,NÝ¯3Ð2)°QÂT Û{Á¹:¿~êVjdÈjýËÜå1ÆmAsÕÊÛÁ&æéj=}²biß¬_Ô÷õzáÂL¦´»¯ú/´ù]±Ó¹(F¡ßu(±4&| ÔØ>j¢«Ï*9*±ê ÊÒ­é&&1üä³mc±a´FCU"ü£òº¨±¢»©iÝ³ùþ ©óÁ*©Èþ?		Î'Ã³+ðÀÏ:<õk#ÏPÖZî â+»ÑêÉ»öïã5xÖd/É)äÉñÂÅ+?¬ó¾~ªLÅÁwzøüêcä©;9©¾XroÄ3
$âQºhÛ
Ç;=}cÕ¤æ ÔÓÂOÉe?ÃÎÍÜõÉkÃÂFÝPotÅªT1Lå¬ôN{[Ý³Tc :RÑmÄkº±V ´/R>¯hí=MNK'»54¦üw+wð2»çv(ÒêÐ°{½¡),÷EÓTeÖÓsuf;åÕ)ûó=Mûå¤ê¥>[Ç8%¯HßÑ«ÌKÊWU9ÓÅR÷çc§/E¶ÀÄÆvÇ¤¹JYýN%½Ð{9:~®Øêù2öÖÕõoëËÈ6ù]ìÔD÷w¶ô4IÙãR¸_.WÉsßøBTFÖn¼]@ÆQ= ÒîBRê#L"úÛLµêÔù»ÿ­T*NÞÊìiB÷$à°¹,{9?%n)ç·äJ%:
ûÝÆ0,?ìjV·Nç÷ÛÅ«IÁ²MÃ¥J±Jx%õ¶ÃÚãÁ9KocÆ²	3*4^OìÄÈ.òòø"cÄplh(SZ+ovß±h¹ó²d¬e´jÇv¸y= 	}=}<w¬]bU¬Ý1ÐLèì¬wê-02Ù»³C@DÚ=}M.Í»qÚJPà!­T­ÚF*x8|¶kºISÀBV~ü^;)í83=Mù-Ãy&a§÷_;à;A{D®Â\z0,m4q¤ÁÏÿRVöYBFFdýbVR*Gü$¨=MÉ	¢ºqÀÆùLeÚôj±bGý_Ùúü >ìñ¯ë¯¹%+ÅÓ@cK%%ë+bO°ö=}JZøíqNÇ81Ì|ç2Ý¸?çøAQXl%'öE>Äj¯ïùc÷1û \Ú Ü9öàHû]Ñ7 >ð³>óGf0Iõ8ïÎï73ÓD¡ªìû]°ñmr'æþ[h7ØdQÏÜ.àh´T5 Ö"Ý	AòhÔÞNå=}ÄÞÎ2
¢°ºõsh5.h¢H¤gNhÖøPÂs4§ÀÿÒKÕÄp%ÛÈ°'X\XsùYÌAè±ËE^G¯))=}<ÚT»¬À+D.¬ðÜ¸ê.jSÂàb¿,´ïªHA¬Jc°Ú~öt|rè#H£ÝÏa¢ÙVjh×åHz­ñ>Ú?^+*±=MüÿFRÍ·ÛTTÊ[¤ôFfæ´9Õë÷Cäs~wÉ?ÃµAãJMTÔßÐäR4
ð¢¿1jô<Ùì1Ûh&g©,ôRM©2V«ãlÙz  pÁèï­Æ(} JÈÍ®>¦tkJÈ"~ÌÊÿÈÒ3* ª"ÁP_ö#¢7Ê<²4OêßÔT¦2·Ô³r[­¸Ujf¥êÒCû:TÉã14×Û
*DÝgBMfo ¦|ie¡Ñð;ÆÙÃú^Ú]º³î ÊÅ	 Ý/ìè\m²m^I­9l0¸øûíÉÞO×æµ¢[½Dâ-N<+©}¨yL*ö?$=}GÜ"x&ópêBýÊT?aÎ§?,S	åù^p'®èy(h\5Q¾«)­¹»,ô»7Nô«àè)J%KèíJ%óWiD¡ç= >æ=MÀ
»Ä2jr6òÔ¶0Ç¤;¢i¦«bC·&i°÷èõRÃEÕuYL_¢> Þ"½¹8[ÉÇ¢LÝ#¨2:+"Ax¢Í¶ÀÂ[vkwN¶­·,-%Ô /Éä©j<ý
=}È^äC|,p[?g=Miz]÷>YÚdÐsBÎ$G¡¤-TÓi0pIjèY9c+±·2¨«D½w'Ð7Zd¼ÍÙèöùº?å½³+­D¦\@z]Ýåâù»ÌåÂE=MLñ¾Á$!ýý4Ùzò=}­nJïl38øi&b ç\Äìg®xxóùs¯ÎU^;Ý-Êm}½Îçr­¨0Û9³±_³>£¤NÈ~7)3ÉrcÀ<Q´wºhÙËþóÉb ö\Û?AihÜÀ#e¬,¶«ØÎ·9 Äå»e(y;ÝbDåzÁ*à=M)Cæ]½ø&öðÀéé+¢ãÂçnO« nú/êBömd%aKõ/ w¬§Þ½Z¿ÃK¿¼Íº·8n!%m¸ßâéÅÿ6'õÁlHMú¾8ß±Dç3Zñ~{¸×'éR×tüº= èÒÚtº= {èÒÙtèºàEj½pa¿¢52<²Ç"àaÚ?÷ê3AuI½L©5­¶IÝõxüÒÔIØWn=}Z¨õÔ=MÖËtðcúRæt¸¶}GÈKÎaÝGH¬*4ºçbÔ5pö2¼2ÈÏéw°C5[èk¤Èòè¨Ó¹02G¨ØàQ­XÓD0ÔËä:P=Mì
¦ã'ÎÐ9¾OæÝ_n¶òËö8àßK¿[¿Sÿg= ß'jý»28¼2H¨2\-êôQÔå]û{)=M ûtJQõy=}Y­já\Ï=M¾Ü ¨2<vò³«0ÞhÀaú±*}[FÝºr%Ò{Ü ª½zµúiMÿõsÝÇÙ Å@³^|£_[¢òyvuo4êwo¶ª½âcüëuj¯°ÉÔÏ¿T§÷ØúÅ{tÇÑ¹Å4wlÑsáûO»ÝÈZÓw)¶H{k>FoO¡õu&;f) ²óíÂõä[Ü2JÈ­º(ËZgãÒË' ø8dFUÄ¢o¦Ä(AÂÍnRâ_¯u3 b._rmµ:ÿkU
ÿUE¼´º£î´ÍùÀÅ¦hç¸rÍúj>3jW?Výß¶tÂøé¹äGùD3_\]blÔ2Ùâ×Æ­Þ
!÷[ãçÙm <L§µé]ïî!;ÏÐ½A{¥¿Ey£Y:c¹wBÅ0Eÿ"³ïÆ"µÿâ£ºâZô¼mû*;q	kræJøÉ×ä!CÜ}he¦
Vï^2Ý"æsä4 ¸Ëå,ö!/¯Ú^m Ìâ'Æ#:»GP ÙÎîCïµË~ñ^æóvz^ÐÙìÃ­õþèöi®á7Â¯ÝIã±QÈ#UúKoöÖ'ã¼8ÈÙ)ì÷å;Ï-JÊDÅ;¹êàCòësÊY¦ æ%á¼-£íxo&vYKawd÷¥Â_g{= .Ô´Æn¶ô°Bx¼y½Ff-ºöbþ¯Ô=MÞl -V¿V(àA/ì\ÃW­ t'SMÀÒõ.2åÅÃS»øºhFÉkäÇÖ®U_?[J©ÑÚÃïIt?W{3í4¥A bÕÜõ8ý)DëÄÀ²ù)Â©æÌ<ÍL,o{°Ë6øß±c»K= {m¸Rµ­;§Íµþ
ôãrÌc÷¸±>zÝ¶¼æ§lÔ93éI°ÂÐÿ1	âËÝõ= øëÑì¸C=MXJé¯·x:i½×à2´­ÕJíÍ ¤ÃIt_¾ðÎk=}äLg÷ëµô/ ÜZIq©©Âá×9Ktÿìl+B¾õå0¦»ÔOá=Mbë<]=}hG¡2=}´dj9dS «Ài ijÜäÇÙ/ À}º¤ÎXõ­üdè7«]áÄÇ #W= àGfa»¦»yæjÃ³n=}:.26)8NµEv·>E¶6ÑzGÁ4pÚÏ­$ö/[|w;í= Êeø­Ûrù¢ÎdQ4àý¦ÛüCAñÿ\=  øÐIêª!$~þ°
4×8-¦JOôÕG{ëÊ}¡¬D5{NEJ§þZí¼éôCæ£×ãå®=}¥×*½ÑS¬Cì3Ú¬qâað3ö/ÇU|¹Kô¦Øº<Ûñ(4ôï¼ñÐ»v8¬pt¡Çm¬f¦ð%Eõ-÷Ë(õ9ÌÌ³oõ)ßH-õÌ¨¥¼mSâNwöªð^ãíQFq 1]§w°ôJ<¿\×·å-Wu6ë]R-äú%I¦øØºý»3	®¦µn¯wÄ,·Ç¨w!MaÃ« A	­tØ*á= W©Ûx-¹"¬SË­½XZJUz]s>H²ÜNU­Õ 1igv[Ñ8ªGCUÎÞ¦nõûLÞË<­TI2åÂüFz/Ï¸A£q_ N=Mðõ/Ù2¶@õ=}æAwsGÎùÂb¡Íà÷åacp£7+RYÊ(5#>¼±ÑÆ;K·nê'(§YMÍø÷Í®(öóPDwÉè1¶5yê4É,<óÓ^êYçLÑ\æ_æ'TqìÄæ×èëk!Ëpô3)ÿ¦ûº½yøî)1ÌÀjûRi¼ïnòævZ-ÔÞ,zmÀ,´kØHW¡ 9CÃDØãö4ØYÝL­*¶â\vKlHÿ²øMWþ¾xÜY8PT¿éEÝCr>g¦-ß°«ëf¬e¬Ö³ÿGÌS_£Ïà~¦zSèÛzS¿}¸Yõ©í£é\MOô®®3ÁÙp»3²§"B°G!+æ¼o=MâÐPyQË<9=Mõ»ìT)è õ³[ ¡lEüã^Èÿdjùù¯£ÿÆ\Ç».[¿£YmÃ ¼éýó|zçp­Ýóå½m·J5ïÉÁM -÷Æ8-ñSµ¾¦Rl%¨½MEa²5\÷­«ºÄGw®ÅõÀs%~ÃH¿¸l&k÷<n=MLHÁxÓF0Ø÷Òç¿EºÓ~\[tN§Èp¬Î'À­ÉÅâ{g¬Êéê-çÒ%,#è­y]6¹Ñö[º«ÿÙÂQR¨ÑB²:Î@Ì&°¸V×ÂOóSöÅÍ<²ÙùS
.Wá{5%*&PË{r+o
á{=}% G+0&PÎ{2-á{ä¨þÅ_=}²ûd¡=}kb&4% È´DpªN·ùß á{ô¨^´âzqªÍ¥g¬³õ¨.íF­-¤!í$j4ññÅ´³-ëÏ89¨©oÃ¼¦î³ô<49¬ÚK¿y	GU¯&ÕÜ-)¯	©ëÊá=}ÿ®³ÌãÙºÃô#ÑãI£hÿ#a¥Ïp¨k¸Ñcó¤±q¨ËM«£W²Ãõ#ÔßLäÿxøÂâW²_ø>¥ÿÞºÃõ#Jr¨ë·l¤Õ¨ÿ#a¥ß	ÑãQ£2;®Ó÷#@®N8Íã!@õM ½Dî/!À!ÿÚªúA¢yøð"bv PúÚ~V ,N>"	RY"xpòa]|¡ú?Æ<dY"{ãÓæÓEÙ#YYÓÓÆ=}¯ín7úÍÖm)ðþ]ÇÅÖ
JgÆÀ¨ZøoòòLí¾×)pþÛë×bÖ	 àE¨®=}ÿ¬	Ñ7DI¾û·b¬Áª8÷ðð¬øsï§Ã3ê	ÿÐÃ¸þ¬Yß=M9J~ÛPÞ¹$B¸= "JÔßÝU[ÜÖ~5Þ.FäN«®Àã\"ð©YØMç\ïÀ¶yFÚt+ØÆ
Ó±mÐä'bÿç¤©À£Ò<:ò¡ó×h¿\¼Úà@ÄXþ ÂÑðTÒPåqï·;µy
×"á¢úbRê²\ÈÖ¬ÒÑð¨>.laé¸pá6ÿc¤Ïßnrq«=}{½[âØÔíºñOlÇ!1èõ(ó«"¯l&N{hÜ7façz4Î£ï¾âºï-ÔñaÎ qcÞæ°U]Ëg¢_QáÎ¾.¿	ï]÷ðr:z÷ÀÃcÒa. '¬-3Ë/yçBw¿ºò0jí¿'áÞã9ßÕK¸Í|6 vùâ2wä4PFay»¨ô¼Dy½·;=}ý®>ýE¨E± Pzö#èå<¿,Î©ªÔ@yçù´!ô ]  ðÞ¡íß Â2cµËt q¾¶AHûýM&¹Peãª¬1ÃÌã»Ä!XOu^åãJ8è2¥K8Ke]ëFw}ü.Z]µ?Sùà¬>ùyÎþñsºëí¿ùÓ[ûí>ÐUhnÔBäpR*Å¾@hÓÒ@7Àc¦)-ªI«8Ów|íà&M¢ì·Mú7NFúÛ$7ÓÇ2Áú&®ÿ´¸§ÑÒ³Ôàa.1ên3B6Kå= âk4NèD÷¸Ò[AgØÉ^\M¿«DÍ_8ýÂMfT>¸bÓÃ'ê[ÔõLu^[3©N]vòý(7UHe3¤Ö(sQf+s÷²ÅR×ßÝïë\Rµiµ²Ú¯ÝñrípuÜCë&ctJ+=}.H)¾¡âïþXTGíä¿wc´MÌK;ÎÍFÂ+YHÏQÁ¢²ø¿QR¶JNøäÆX;¬sqK^ ø>ãcy -(DsbÜx:ÊÚ($EêÅ3Vz0¾õQYÁwj:^vf9:î5\Kàã\û[¬È¼ÚÎÿ!÷P~_Þ~üw©ó®KÀÿþÙG´¥æàªsä6³eÃnÌçn(QÛ+Ñû {6ËÖj1.[mtp@ÿ=}'D2Le¿G_×w¹°cw°KCThBÍµ8×Ü#u_UnIôðÒ¦â±çj±Æñôõ÷½ZI3K4Åçtµý7:<Õ¼Rø\·»Z'ÐFÓúÉoØEqWÄ¶XóÉ:Pû¾¬aGP­Z[Bá3fCÍd÷=}8\úà-IÀòÌW-÷aJh	¡=M®[gf1XÄÞ3¹D©!;÷ï¾-ÃÕÓ½DµOx}{¡ðÛ7úcùH;|ç¤Lz£ÿÞiË 8¶ã4ó%¹ª,ØL}.9é'Ëë= 	ò¸©#¼d 	kêDØÎpmU>NÑï	æ¦à¹c/È7èa¹Tß>µÛè¢þ·ÈÚïi8æsÂp	Äñ½kçßú;Jó°A¨ùf-ÜoÛË=}¾û£K2¶ñ$ed¹*÷¬>yIeÕúûTôî.E¥^,¤~Ãè«q¢$ÇçGdÆøb·ï@Q³¼I
¬ó)êç"ºrþÓÙAèÒû§àüZm??(£ÓæIá¸ÚKÚ^ÌË	JñKõÌ)å: ,Ô'LÿúÜHhÊ8R»kXä?W<NäÂYåÆ±Pý¾¯áX<:Ýå=Ms©ññQi²w·÷Ïù(æN,>%x|ë ²±wëEaé)"óPõx@áÝYnzÃþÓ= Ô\¥LuM"·*Ä x)ÜõÈ éP]Á&Fu
yô¬©kwë¯Á_%ÂÔ+'ãOúùç¶¡ãÑú?¿ã{*ßXÞÜ+ò@©k7ÌØl7°À4
ùÂÛ¬)¯"x}W±~°~EuûÑîVQB*éL=}Æ¿_V/3÷Üà2eégÝ<&ÛÌi&Òª©òµiÄËÁÒ ó¿iÜÝvüªkÊhFM«FÃW~óSRZ$ªq¾tò>0ã)¦k»|ÃÓ$NÍìsÒcÙÓã_ÆòÆ*f>äÚÝÍ+5ð$²u+)°Ó«æÑæßè±.¤÷fÖ¹Ó+¬[ÂÎ/uk<A¶~\·gCïÎ©(/Ç¿XOk«¡ö9'«³w´MüßjcüóÁK÷@7ÿôiI;ªôöi Z¦Ô<)ÔaõC»2Á]Êÿ Ó8Øêdõ¾£8a£½xï.èÌ¼ióêè4;ÂmïÓ×ñ£ ãÊMÿô¹_ÿ&À}hMswI1«?áeNo*Ü²ô(ù"/fTXä?¯Z­Ï&ï÷¬¿º÷Ý= m1iR¢»z<k×*O×ÃçÑ\þ1?A{EÔS{Ûwg\[b=}yb5UÒp¹Ýc¤QJh= ^YÙ½sZÐ
ð(tÍß= ×:ä8)¶Å¤6{§:ÞPðíSatt;>÷©8m¤ºoÖcàA{v)4c±^´?Úûâ×gC&®7Ù= ³}Rh;«Y¬To^Ôr6=}ó3ÍVÞbs,3ªJ[·òóµh³t5UøXÿÏÏ×¦Å$.ð?¯õì\áÂÍSl~WpÁ Ô¯Pè¢½d]ï*OÂÚ8Ç©ÖöS§Òérï<ÿî)ÃC7â§BjD^C¥HÆJîêÍ*?{¢Æ>Eû{FëWÁZÖ?¥±º\K+¯0âHdzÿØr§#*À¥YùàÑöD)¥eE'ÚÇ¿u®ïM¸|~¨×_%Ó¥Ô¦;ÐØd÷öëÍ×þJ£÷w4¯Z(ýÉÛz±ÄÁô,é|É=M&À|Ù ³£Rª¤cäè hMbÿ.)¶£Ýý|.¬+©¤Jª²ã|j+¤o¤DKËF¸8ÌÂî¬>póUØ´I÷µàW§´HÀ%ßåÁ´£wßR$íÑªHÈ=MYv[±×ÿ¬ófÓÓ¡ø5öñRj{O¥bt³ ó«
ø&®%M«« ðãvMU@¿¶m1ò³Y¬ÆÇ¯AË;ð»¬¨¥BòÓÚÂ÷¢2dãÌùÌËùØÉiñDDÄ©¢4¦x:é¶ùÜºNW.s-êOÞBáaÊKB>\ÂÁs±u¾=}C:'ô?¼>¡z¢¢r¢ò¢zâê%ã¡CsáÂ«Ò¿:$Óm }ûÁÏ¯e´­ s&yÃÝ£;fbª°Æcf®.Eâ.¢r5âì2}¼iæÆ"3cìÏÊåc£m%Í³	Â¯Â#æ§ëh¤¡¹èj::g"9 B ìÒ¬eÃ[!6â2¥n«ô½¨AIO»º-¢nåÜ#ÚUè¤/Ei!w~Y~Y~YÎM¸ñuÇz¢}ÛëÝ|¾÷ºÇÓ£fgd¦³BNÚg%Ás¼ ª¸oMbYÍäâtÛ%ôöO¼fh	f¢Ï5OÑo(hË©=M³-ú2w+Â4e·$Pã»@éÍ÷Ó·ºßHôßGfµð(NË°3·LK¾ ßÚæú¾C¨­o¶óà±s ÛÆ=M*ú	xàæ¨YÑwÆ¥?K»Ü³±½+°ÈÞ])ÙDK½gr§*]íä¨¾ê¯Ë¤áåBêFåäIóñã­¯'F%Ï¹­%ä¨Z»ámÇ*¢ïO¤bËà×&ÇDÖ
þçÎ*@èn+ìO±^sî!|É>s¶(àá¾=}îAQ«ôg¾K£ar^øÁÀfÒ)äçÓ?±Ò¯¢½!âu¡_Ri= i¡iËòfýæ æL!Vá ¢øÚjvwÉÒ=MuØÚx<nMíM= íTYÅý!ùÉ909á8»È¶h2èítã$2:bÓÌ2jq qoi||OLwU3+Å]T£ó®0±Á±	7ïbî n&a=}G	]]ÛQq@1å] <H×X ,= [Åtåä%pÂØo?~Õqc¿}Y}9À8ýþiýÏbp^p p¬	}{W~×xwx7íÓÌðß¶¥v(¤sÇØ|KVÃg6æ
1~TìùG«8+¦±*ÊÚq¿Y/f~WýX7[ë&ýÑÌ¿ÑT¤)u~óªlõVÌJ E#-5×åÏ;@HÔ'BOr,($ëKãC/úôï @b?úÞü%¿¯=}z]Z¥çÒÀF0rÃÛW­7Ì!¥úîn&mìe:G¨êæÿ¸O ÌËÅ3å?zhöAGQÇ¹oOjs	L;úy~¨¡£¹lÌ¼ÿl¸î§qÐ{WwöÄê½úè¨iÀ-eËrÇHrR=}É«Âàì.ýÝ³Ü¶
+[1ßÿ3Ç«úÓL8³-58zmløPä7ô7AáÏC·6I¾+¼¯ö¢HïÊ~ô§¾ª"þªÿ6ìv³m6JÇ$s4Ågéô¯uÏ×L- g¤dcÑ= |ÎxÍÃªõ÷ÏT¥*¸ôg6É­E7Êõp)_ °Þrqo"	zX4.´$3Ð§ÓWhw¨¾q¸b0
Û* l(r>¨9ÁîYÈ]²}ã^	zLNr½°P= 9.bóÿ|o}r°,mËQ0
Yt?2¥ : ÊÁazØ¸p¬}8?þN1T0kaVðÉ¶
Q| ×>¨©6_úÛ9 õ
Õð{,ÎØ©Æ@_:à9øK^	,_2}iEîÁrC=MT=Mì+Dâuy1[hr=}éª)Þ6þùÛudq7:péNÙçIº_yÙ ZØÝPü@\xW|ÎYHN r{paGnÚÕ}ìûrý/Ê]©á\F4OC{Úm"ßi] lèòÞéýñTÞ= VT 9'Wøb>ïý» ÙhF¹©*ÿ¡jß-Å]«5Öã$î6îÜQÓ}å¯vìÙê«×®µè?Îµn{ÑB[ã÷& ©Êºî*¬GÃsÉÖÕ=M±* Ûxgþ}.iôAÍ	A§Ã³0:òïÈJ5¹Aë'súúñátn,õç­ª5\k6Ê,=M+É¥N®'àÄksm£ÊQ°Ú-v«µ1Þ£³.ñHöì¶»û²³¦Óá*ç¢é:5àÔcøðß(´e<mEëc²´ñe{öc:íJ ëU(+È£Ús­czìº¦-ß_
©*$R+ ¾3jµÚ;Z×lÜï©5-ãÑ+øoÆÈF©+½mÖF<Ôgäu<%/cÑJ@ög= k?z³6KéèøÕ£Þ¼gH-l³±ç]®+Ù [½zcÓCÏúwÆA±çóêm:µ¥9JçÛäå¯¶MAw'o#;ÄC½3øÛSÎj2ß¯w®\êäN¸<­¤p§» ë HÃÑ'·M²Ù»¦qY0&xv)]ÐéµØ,õÕ>ía$ø=MÆºv|z'¦¸ü­,zòêûÀÓ"qOö?@É}}û1¾Þý­ªÍl	ÄZY=}-*è("Þ6S">|ßBL6OÏé®Wí°ëÝÝï=MÀvòüÎU¿\ú¼õPÏá%YqæË×º=}æþÈ?aæüÇ×²ÿËÇóo= ÞÂµG*%ÈòrXõ*^Nî­íbÆðÞàÈÄIq@o=}_æâ4	!Oð"!ñ4'?G]æ<ÒáÇ4Á}ÄP6É,h,\JJ{ÖJEDÙíýåS	òDg}]æDdñÑþ¨Õ¿½KX»¹MIKÍ'AÕÂµ®¦Z¶­îõðÏmþE-}ú0ud¶§xlk¶}úùÎ'U¨©á°û[
¬ZªO?äaj·«|>? %m ÀàhG +0w$ÔLÍí¹å	+ç}hÏþ±åþë'×åY¯å$cÿ'1¦0­³+áøºÓqtd}Ðª2An^úôq&V}ÄªµõQëÎ>G1óÝ
xI¦êqâKswÁÚ5s= 
Ö÷ÙlëA<NZçÁàB¢ ÞDÖmq q}Pª5u7_LH1QV¦Ú'èBaÅPK®o'ñ9«îën^Ua&½Øi5^r	¸:¢JÝ"LÖ:*ðoô ÖÈÓT©&Ìâ ô<¹»2üÏ¸Ýyv²=}¹@	Ð²|¾ª!=M}{^qÿµ]àÉÜ¡N©¼*ßyl
óý&m2À$sy|â ûo|ÎuºXWIT&r_8dªµqsd¾Ôdq=}4êv-nM½Þ¬Q,0n8>²Á^óû]TîvEn?DÔÊÑ¹ßü¢(Î³}ïYõ}øì<}ï¹]ÚÌÐn)évwmäsYÖ3" *IQ(|ÎÙâ7A¢ø6/<.IÒûZàÇOj>IÑ)âqftMp´,
Ò!xJIdKìQÖ:îe1ÏQøÝt $
Lb¸ù ¢<ñÿ¿Wãu<nzÓáa'¡îæedC«lÝ¹E!.y­2ßõGYf2^4­ÆåÀJ¼Ý&5¤8eÖ¦±Ì¶CÑR#:èhv»È&´´ÿ¦÷Ûál0w 	â é<u¸Óæ¾GböÌóó³é ?Ï)7eRrâï95¼³¸pEÍ¡ª®\¸wÓá
M*7¤ùSLFÏM6ÑGåXr­}ÜÇ'©Ç]WÐ6èf Ã¿#ÉwùUéCPDR<d<êXåÁ&Ô,V¦àû-kN¥Ò«âÁÅ<å1a-¯Ö£*»Ó_
M+þg= í>%°ye»iaT= ;å ÿXÓ+2àÕ×1àï}G½òiÖ	Ö],7dÿ´°ãº«Ü;ãié}É%÷ý0Z8üærF¥;= ¯aõYå±C(]ÔíÀwFµ¾#*´#è°wb8MQu[¡´3lß[MÓ·öl=M!Ø½QVK?ÐfI|sn+5°¡3²aCECóè¼ÎJJl&{ÃùP½ÁpEgãüãÕkÛoiÖÖ·W´_i@W#dø{ÿ»À³ëÕKÂQaêË!Í#MAws=MwÿæÍpFáå¯/·¶QduAB²¸	6Çé)²{¥«ZÓHâ4¢ÖmÓÅª
äØ´o÷6¼¤¥Ñ<<°Øo#Î_·¢ªQ«AÆi¯ »¨¡¸¨VÄåÞÿ~ü³TÎ%°$ÃÎsèóq,t8ôdï°/ú­zùüb­S;ª#¾ös$¹7ë±mË¿¢Û ª7o(êüÏßlWl¬nºAòî0²aviúp?ÇUXTÕÖØuÅ|ë¢2rn la??Wöu|¡qÙÝ7]=}Í¾¸AaûàbÃýäPÊÈZß ßI¯û½93t!~5Íô,È:®pú
)A:¹î²ìßQêÏVMæêÁHëv&ú¨
îÇ5»¹%iF\¾
*í²¨ ókDw= äåGÏ~oÖ!3zýrC µBX¬íà·ú8 &^æpÉ=}&"ð8Z±8ÉQ2þ¾ÂîÞÒñÁ9Ð·eÐÀª= \\êo^A*åæ¦È] µf%YhÊQr®´<
aâï=}_ÞKgÛ!xi¼ÒÇíÙH(¨¡³¡¦õäåD*Jhï,û+÷éìÍ3+ºMK+æ(®ÂÆÞvmZævD¢0VMå¡lîÄ"]VóæÔÅ^^+N³]QÒÖô¦Rzg¥»$bØFV)=M=}¿ZÈ_­D$aÞ¹q2 ² fVO¿HÃîT=}«NEàçÁD+{bÑêmÉé×¹»6½¥4+¥<ã¿G¤ ÕhÞ%2ÇFûøÿ'Mc}«³UhO.ó§¸ÓðþOÛjD15»àøÇÂìBéLÃ2~÷ÚN~­Â4.4IiÆ/¯°Kl¼=}ÅÜ'©Ëß |9bùýîiÂ^}b¿;g1Fµ§¦,¯Ö2Ô<= "¡h
2®ò»R.ÃÚ÷¹ ö¡ð´Wßà'­#D«Úß,¡ã¾íåÕ©âÎJÅþ9º#íã<ÉTæx´¤ùKLg=MÚS»nz¦MdaYZqé}WÙcgT	©¥Áæ ¶~Mú¸òî¿°AÔ74Ù:÷úhL~õü0rìì}ZÜÑñÅÔ¹IéÝýÑðµ-l.u6ezïZÕÇôù¶Ïc¤ê¸è[ZÖw þ0AOZt 4îÞ¹ïTÕvªæ±/Tøóz= Àöé¢xI.ï§¯ìËêb÷îÖÅ%¹{þ1×wtë×wø	{Oéõ{éá{~ø¢ËÆßc7Á²
¨Æ àÀ0¸ÚõP@Ûyû**Ú:åIþ1sEÜÛÈkÿç¡ï/ÿwû+»Ð"ÛLù§,açCÞa·¡áeõ¦ q@C)~B¿sFaqBÒoZLDay-?+h©C&©BTýMv+HqI¯¾°W= ^ =MFBXÁ¬s0òãÖÇÀCZa= vo©W½q
æ	gL¹ý§þ4|¢ ø6bP´ºÒÕøãº,.óGÙÉÈôGHÝÔsë¸Z8è\NEazºzðsÆ\Où_·®íså×ÿTYú\´.ç½Ãyà= d/¹iÖX¼CÕ÷zZyÚÛ§¦íø$QFQg­:ô¥¨]DaâþÍR@{ßjq'J±"¯ÎsøÛCr4~Àâµ µÜñ°°mGré&U
4ñß¸×{ 6\×lå&ýÁg»#wvý= 6Á© î0{#¬¥Ø¿æ|(@F¸ ¸ þ åè´ù¢ïÄ coK°BàBNPìø/Qg¤sèD
6ô7ÄOOâ0êüL$»B¸tñÿ¸ûR)ÎÎÐ«¹XòHô»é"zr:y|÷TX/4·þôCâ?ORcÖz:Ú¹ý®×7½nÒµ)t°åÐ.µùÛ½ô$Q)UÞ ÐX÷|» .ÆhöôX0ÏOÀ
Ð°±2*EÁV)ÉñBØ"h]Ê79aLséámÍQ1<H@*iÐ~fa~p _í%)¾.hõV|"
gIYö î!ýãqõ=}T8= ­ÓÁvó!NÍmØH°òLÊ7YWu1õqÍÜm\/ÁL¡i<ÒBÂXi}îDNÅq¨\PäÈMÑËE¦çº'þ,bÎå8vS«XÔsöäª(¯¿ÊÖ6Lx½Ä9¿°Dä¸r)áe»ÄÛ¾t£ÿ/hFò~jÅG(ó\°åy¶³§_¿?¢
BÁWWÜ&Ó£qYO~Y= T~Y~Y~Y6]/rLx!]âÅë@«¥© dwºz=MËJ¢iÕA,ï	Ív<lÕB(Ï	Ìnül=Myµì×Tg6ëÕLG6ìÙ\öëÔH7öìØXwvëÖPWvìÚ= ÖkÓFOnkimlynkqmln¡¿kd¿m¿lt¿n?kl?m?l|?nÿkhÿmÿlxÿnkpmln ßkfßmßlvßn_kn_m_l~_nkjmlznkrmì»=}â<kIÕ@<o	Ñük9U?8O	Ð4ç¶îß,Ç6íÝ<6îá(·öíÜ8÷öîà0×víÞ@vîâ&¯Öàó¶T·uly¿pkìòqqù2TÖÿqrw1ØöaJ?\Ô"_àÊ;¬8¶p/uì	éÖÌÕLA	â ñÖo7@
m9ÜÞê	p,>|^ýÃJ(ÕßRT~:{LH<@ÿòú{|8O=M¢þ}ýç[ÚuÖôA0±$i
_ÊÛÆtüìqïM½uw5QIïXLÔþP\=MqöaÁ'4A-ùMjÕ= ù\õxÕK4è@ïvËFÉüXkOðÕ7:ï~Ê!ü²mûF	S1üO
É¾;pé	W,ü=M	>>9	+@~=}	^F¼y^}vA  "z±rdàwÖ*ëÛ}^1q= Ç
?Ov?)Vrõf\=MÜðºMØIyÎw8}Rxf\ìòZÙàLz^BÂ3dfU÷ÉòkÌ¼àÎN58UîIm ¼"Çò¡\bU$¼ÄÞ*¡Y&HãZ{A ÜtöÿZêâ~@à]ïÿ]\qEAr\]½ßÒhÖ"]!9fB[¶ ¨  b^áÊ¯DÐäÏ®&¦Z®&hê(dB:tbûW­SÙUéç¥´ßã¾H'ðJ[Þõ=MYLÎõòHA]!^øÍoÿÚ¥Ö%2í©øD¯¯©U¯¯½2ÓÃ»;Å÷·D'«eÝ´É¹ä
ÎéøÔ§¯ÑÔá!SFÇÃfÇ3:ãè¥®Ìõ;ÒíôÌ&#¯?ÃfÞÜ= µÿÌofÌáDKíó#M#ïO'QRµ0ú8ÃP	(mÃ×Ùûæùß¸9pÿxßXèR$\ä&2äý×z%WZ$I°&÷}$ª¾÷áX*T}¤ÿ_ÆÉâ'1¶=}}c xd_x¼Âª^CÍ}¸"Q3væÚ°0ÃdÁÓ¶ò÷çÒ«91Û/² ô8ªDHâo¤»iEÌËsá«Uæ¸­áÎ¯ÁKÆO0§z»,â½ÝøÏ=}µc.*è¥á)Í¦qì3P¢°]2é×ã½ýc\ÈÍ®þFTT°'#9Z*1çx{ñ³aÇfßÝ¸Âè=}<¤A¨|õ<ªaI£	è9ºf[W·ÿñ\HÞæX®=}^$¦¹= tH²Má¨ê£¶¦ó¬Ãk¤ñ¨óªc¤«D££Ù²Cæ¤!$â£s²£¾ðãé´«
«ï¯à¦q §Ò´I»É(§ø¬àõS^C:Ãy­3qísù*KcêcÜ~c·ª}¤eÜÊ  ã°ÓØ'Ó}ª"S&ã:*$b¸¨aÇÁ7ð¥~_¨kY³m5½3¬ÖÂÿ ¼'fävfwE¥ÿ ¸öcQL¤Ðý¯ÕÈëC $Ý¥á¥Û^Ó0¬ý¼%åäÛ&1ó¾9;¡ëÃe±'ÏÑÅ"å'BØ2àz´M·«Þ­Ä´A7Ô
d§)Nl'¤¯=}d;yQ[?¯ÒmSªL+q­µ4-·´L¿ÇEXè.àÅaÆ´Mµ>·=}{üÏM¹Æ+%º6éÒ´AJëëÛ¬N'Míáõ¡T7Ñ ÃBÿ75öÙÕÄÆæ	½ÞþéîÑn[qDø\?¹>I¹zËâ
©ØÚÌÀÁEÃºjÍë¨@µEïõ ÎÜìÎv¡ÝÎ]$û®Ê^ý$ÊP8@íóûNl9ô=MÎØðOÞ z
ÕXq¼ÐÞÄh)¿àÆmWØH ZHÝ~ª~¬i{v½ª6H¦ÚjkRÛUÖ)Ûô8= 1×z4wõ
è ûBPÑÚúYñýùòrï¶U~\Lªmf÷âzös84cÉæ¶R>
î$yÍã­F#eÿcÉó®ëëÉ;É©%«A¬y 4¹æÄ~GgTÍçØ|t¼ê'ø´ô&rd{SÚ©¾=}ÆâÑ¼E"­´vU²/!øpäj®Ô}Ë2àiöªíÑ·)4,ÒìM÷5²üOã5JjÕ~}2Í¿9:]-Ñ üÄÍ°^ÄÍùTakÃ~S'Ï7± Å5bzüáS ÓðÏ¶Ìa"M[Q@ÊùÐÔMD¢)LN±sî±Jjé}|[|Q^
M¦^;Uq±¼[÷~NR4b4"6áWùû]4 sïS= #S]3L4°,;C}['V)l@ØÒ>t=MvT0]Ví¡cE"98/ ÷»Uñ<ÅZÂÁ"fcÐ]ª¸0hccC	¬x2CN¸&J¸ÅÏÿÉäoÜå©ûæþÁhn¤»ÝÎÁ5d!±¢IÅk	GàfâYdyô^~ûéÙVÆ¤Úæ7Ïrµ®¦0µÑ×ö=M¡¿|¼7É÷úWr ÈÜ!úø~î¾Bjà!ÿù¾=}¾ì¢'àÛIøåõÜúwæ üm9ú]<è@]1¢Hôð£U)C]Z«HÓþäëUêù_ 5#Iå3òvDÁ±¦¾Æ,tÅnKr7-©qO¸Ú0ï55P<È·n÷ixÖ§æ1x F!ðBú*4Èpµx¢=MâuaW (_ª¶+í/½ò­SÐ[úaõ~EIûâ¥Ö;3ü¨/9ºxg9xN?W8>½Å
ßo:5èzwYxÑ iPM= vÀkÕ:Û0(¢èLgÚi@GìßR÷BHÎ?ù:Vê¾éÔºÎö¢M²ÜYëï OÆ¬í;Ç*NÐ@Î= #fýòôWjsê9Ø¹¡hú HÂÉ7ûâ YdH=Mû!~FÁ1EÈ%xGíØtîMIÆâßKÙÁp=}ÞÀ+þ£×P§gþ#*#yú£|rºC¤f¤{¢TË+Â»¡b,£ç£ñ¬cÆµsç¤pÐ¢û|ò2».aÊÓCº³s¾ËVJ³. Ýó9¤_lgÒ³Ó³ä¯¬G3ä±¨OC%©%Î_³#»3%ÑYß'ßÌë{}»Â´HZVôºÌkínØ.­YVÛO?W1[g;S£êX»£i÷¯ô=}B<uQ(ÄÙoæJXÅcGM&]:º	¢×= 1½¨[ô¦ÐpnwI%Èò
ØüóÖekD ¡RËÊPænG[+ÃÂÞU?<¶NÍªùù38yµK¾übUäwF*°xHÇÚ Eæ1¡eY0¾yÏR Û*¤Q¡Ô7Ü!õ&¹Ýä²ÒÊ\¡ÁBTnP<_p	Éñ_Ôô·ËÔ'ïÓ¡Pe]_yÄfZì°.z5Ç¾¥6É67[î5¢¦(£¢%à*B6ànUHàta[àÝboà÷Rà·-à±Èªá|µáÔÂázÎá-ÛáÓõéá7Â÷ábêá1iáS:"áõþ*á²2á;9á~AáIá{¾RáZá´^báéÊkáZEsáÍ|á7^á¯öáá©,áa³¥âÂý©¯>¦ã@ »#
þÙVlYÚ/übÜ~Y~/V0{®éq)rï»wÂþêØéH4Þ«
ésûÖ)ßh§«>%i¦=}½rï¯þG}9eº±«ºi]Yw.)õ§ó½ï=MîË1Å%rBEk°0?±¿ðÁòUEÖÓ8ZÕ½~SÊÕ:Ä®{ÉBj¨OËR.èßýøïñ¬ikÝÌ
ñ7¥Fê­¡²øUC5uÄÍm÷O}Iþ¸Fj¬í¦¨î§"¡ÆÛ= ôÓ;ã=}iÆd@J%P§8Â¨jb«Q!¶¡ÄûÅ	ì"6WWØ[ÒPgUÑ¹âÇtTð/WÐ)í¾F.WäÝëõ£?8ÛéªëþËçeëA¶IâG_X5ñÑN÷
L1õÀR¨]rÈ^üâ7eî:¨J¨*G­O¶¿þÏsêSbýS«A	®­¨¤%Ïªd ¦dbf¨.«á"öÔJøèpø¸J±K«ýPBÍ(-FlÍí= øO(Y-b~LKõ75Gí?!ø5:JøC5iíQ¯õdn­÷ýRì)%þÑ­WéÍû ñ|Ü>ÚktP7Øù1=}<?¼= ûØ7UV'(XÈiìFµ!ÿ%0ù¹¶ùõï.Ôjx.wû'´v.kÏEø= +02­ÜVI³eåáôëZÑ(@ÎwB¨ï,ËCû¤90{OoRoT @j>SknfgÓ2UÚ\ï;nüÑ¨6tpcu¿µI@æjN|§zviÈ>Ââ§6tÑîéJ4Õï÷)}ðy^ÏûA("û¹^
ô]Þ6È¼<
©ýh¼Ï»@dWîµïëj=M½xvusÂB)tH÷!6JÜÅ8'6Ìÿ:HSó­úÈ¶¶6/î*9È9'vç¡MìÇÅ(
¶:<cÁ¬þ¸r©:yÚgt
é¿ºVà9å¢ûÅAhS[×©RÄÔ'.7ú×¾E[Å2åyÚ-OH4ÿ×2V´¿00ÃÛaHOø®Ê
»ïf;ß7ÔdD7Ø'@¾%¶%ýðÓ½doû¿çs7Ã!~´+\ ÃJ¦Û¹³c}~¡Wð
NÂÐÕâg	k  f*Ö sfh­áIai.tXq6
= ßTPCò²ÏMsh@òV;|q°DÊºq\Ó(Örõ?¼s,>ñW\k"1Oá#aL¦öy}V'àØ"~E*ÀjJ|Ey))Ç¾i#©Ús}p,y-ÜàO{ÎZÇEx%³®]ÀØêjc?Øo{x¯åöÂ=}vf'êþ0ìÂ=Mï(´¼uÜo3±»Ó"O¤]{= v;ÁRõÞõ:ö«Ý<6tÛ,w¤6»öÓ4¶ÓÔ@ãxì¡Û1vd{\Ï¦j3Þ) êu-ÎêTOÇTÆüÔ
§m2f\Ú?N*|»tæ[«F¯s
3±vÖW<ó®ðÐÖØó¦ä½»JLV2½ªK4¿â+èþ©õsÃ²å©è"g!jW"uwu*	váoÍpQÎ= KÀt.UA~~&ðÜKÞ¹Æ¡úíp]ÝN®Nr	@
¥ÝM1o~$ùÀS=}A
}ôÝCÀâ¬%ª£ÄC£#|Y~¢~Y~QV~Y~YXA_¡EùJ¢Æ~tâ~i#e¹_ÁÚz}k{°±Ojìa9Á¶ÓsPåÈÈ¹ëÑÒæeT'%hË\º[T#GqH:òÙ5>V8äc)[H
­à¿5kþ=}k¥u
jtKÀf~t6.Çã§e+=M°6·.¥<Ä#üT!K:NÚÈ._v«a^Õbt<m>ñÏìCJà®ÀÌ>fåÜÎM]ýUDÜuïÜYn'(éëïÙxÂ mÌbCf>ÃÐ:=MUäè@úw{ê¨pÈÇzËÕåöAèàk_ÆfËÌQ7^"w}¢ÂW!ÄÜÊ6¡ã|úI¿%_ÊÏ)ÇÐÀ)Ra¡%(ÖBõ93ÝÙÉõu¸­Òµ!¿AÉgÛ2häq9h ºõ
Y6×®¤¾«ÎS°	ÎÛNW7bºTLvýp	v8¼ë±Bmàb,Çâ¾êu/t0¾1ezÄ?Ù³JOa{î«4ÌïhEùtú@;øÑ9QÌ·ÈVç!US¸À§d¦ãÉä£©sV~Ù¢Ü~Y0~Y~|V~á<;ìE¾6ërh»H¾ä=M¥¬zLå¹~µ~¦çéu#¯G5(>7,=MD·\ÈeîáQé­3êZlUyG³=UÎÜç:6#zVëÞný9ÆÒ/Vó}=}eú$Öµ;ÖT¦cu7.QºÒÁ4Ñ«r= hÂüô¾EX:4¢4L¡Iq{À}id§I¹ÖøÉ o¢\wp=MMÈ\&QOÝíZÃw|ÁX)ñ Gk·CÐi¸}ÑMðâØE®Ï[5àu0¹úsÝd×¥æÊ½L*ä­ðÉ|èö¤= 
óñ@Ñyt2Ð÷ãN>9B¿E¹È¶ü¯/P;&~âçÅçoþ)ZÎT©ÐÆ4 ÖþfF@Ká^ºv÷±c(à¯~ËBåü? ´)òÑ%ø_Nb$QÆÓÏÂåt2Ö§á!¬ä6ÚSÍ2¦Þá,P@"§º/'Åç£¢©(dA¸*YK·ïåÄÏÄ2>¸´ÁM':ÍóøèXAÝí±%Òø®ñbÃ×æ²8yKÞ
«y«ÄÉ3B)½Þ·AZgÿÎ+¢Vdq¼2àj¿Ä@'ÒÂÿ3|-ç¸,ÊaK]&¡¡*ë£Á=M¨$
«9'{HçC¦¦(ù­ÆË@¾&@éTS¹² R§¯@ð¥¾>/À²öôö3)8Õ³7,§aÿ¾mdü¹-V V£n-Ó÷/Hø)pþÎnaµ1=MgÛy|QÝcTÁÞ½qa¬vYY:øÎ¿yXæeK¦Aî^õF¾Î	9ÂUdà+]Ä_â% ÜF;Å«Á£ã³£­iY~Y~Y<}Yz}Øqú~YP<GrZUÚgû) ¢6y×üÙilô1ð_öÃñ4-_AFçë5Õ9B7&­ê>÷<QiV¢M%Ý®%Ø¢¦°¡ýH,æ1¹Ä}~G0F±Éé]ÏÜEnÄà@üýB¶°sÚg]Äj	¾DµoiGÏÕÄÈy7î2ïôû=MiaÛWÂ>T¨Ô9WZnßÎ¿fO\½ÙYH/ÐÅÞñ|}+àuª!xG6ÆN-?§Î?Ñu¨NÑ8]ÅYeáÚ¡qDøÁ®¡ò±±ÔMpJS1²uav2þ3rA^¡0¨rÛ3$»È¨tÌ+gaùÍ*s^Õ'fáDÏá·m@ÓÙá«6Ë?¦ý´k"ºd!Bëá.?ËÑ0åú×â"-É	¯iTÿÔ9þw-ÆâÌA= ¢.
ü¥ÉCÆ´hz,¹Èòá<v6üH6%·oö<= É8×¢5iz¢<ñ= 
©%X¼k
Éü'¡@(gà¾¢VÌmq²ÜUmÈ
ÑÑ)qlfíØB¿3rYa¥/Á·XI³= V(OrË~¡Å?&-4F;ÛnµÁpÌ.ÌÆ H7Í*%Õ²8tq0nÜK $=}[%ÎÛùûìw¡íïßMËÿhRøLI¢x*yó °Ò8=M\ôî{,ýA¨xDUE1TÒ7yyÖ¢àÁ1°ÛñãJ$GéU!S¶n>ÉMo>l¿	,	µßþëBue}Ð*YÕÎ­þÜÂ)Ù¹áæ»vq(7ÊÞ_&	3!X&Bñ¡ÁG"@¯ýXV.TîH¾Re z0F¹¨sßyfàJWº üZ:ráafþÂUÂ.
ûâ®²ë!#w'¤É±3#¶U&¹àk¬tÃÜÞ©T àëEr³});v³bÿÁek;<fß@ÛïQB²×%C§Z|Æ[Âä§þjô/-éL;ßm.ÐFÿ[Ø-Aa#Ô¥Þ¨OýÉcS#Nò¨_Ö¸õ¾ÒgOæ+åÄ% å«Ôù´ôÌüQ+6&Å·:,;_îç´ çÿXµVßío28á«hOüÉ	¡ùÔÊò+LÅÉýøåN= '´µ!Ð7SVö%Ç¬júëÛWä%ô¬âÿ7ÓL'Ðõ¯H5EÂÅËè-,·*	Ì &õ·Êë\Úê-íÌ.aÔ÷¤øWî7¹4W63©þ¤|ÛZfL¸R{@¥0ðÚ{7Pû6zJ?Aµ¹fÒV; qªÏQM
T´.8Ï)a	4kURÏaqLÏ9¢V¾¡â'h¡´¹o)üÛ:¨:á¹	_
äÜ®$ØÏ\lå¹ÙSC>qå3Ú®Û2(#Ïo!Ò©À·ækÔ÷i+Ä$»OéçôÌ% >èCÐ%½ø´7Ú­©Ä[|­¤w@¸c*³¤{/´ãøáÿ²ævËá;·ºã= ð¤ÿm*ºøpªL5ß3ÕnÖºef1¿¸>¦ÜÂVdÙÜ¾Uü¹¿q'^¤<ù:¤3¤®rJæ|7ÛUÕ°Ger÷{!Ü¨éLIãþ=MÕK÷Èd0üìó8V¯?Í¶dõÅ2ð#W.óÊ±'Ç±¹iå}»Ë9+$Ã.Ëm,¥zV4S\Î¥¥øÆ_øÛ·H)$ó3^¶¥ê©æ&ÓÔ«%¤jã»-¬#f"V6ª0J Ã=}(FáS\Úa%?Aó~¦¹±]f<Ú¿(yäº{j¼iÜ$ªê+£*É»[ªÎÒ}e>¦ÙÓ0Ø;JüdåâîóÖ¦Õ(c}!®sU·QÔ*h>oå/Ì=}Ò$-.ä]Ä«rÒ#b%SeÁïù<®B;£k»ôéK«äRÔà¬v(/lÝÓ^ü¾z$¹t'?üÃÉ×r#zµv$ÜÚ¸] Jã.g;Åÿ>£Jx^½ÿK­XÐm<D§y-C[Ï«Ð¸CTßî4&²F$~Ä°6Gã³~1%jêë=MÃR¢îM^!4zb¶Rd-oºC{æ]÷6r=MëA}îUé\6Î_Ã¤5ò,dÙõL<wXÚ3®XXgù¸d²l)õÕ$j´¬võuØ©!Äê>Ñ5@
q4¢Þð½¥î+QìÔ\Ï7·×ÀÇN1Æ@Ì^l¹VÀ+´<õ^,ëò5¥y³W8GQÜ\±¥E/|GÍL]¹ò/ÆìTÃÕEî_ù\4gá5Ëù<4\®ky éÇV"Ùü´Õ6×:òÅ\öø¬>RãéXí4Ä&ïIúéb_>,îøÎ»=uþopVoílfoY¶è/O íéXÝ(îÓèg7Ìq<q¯AÁp÷°¹ßP ¹4?ÏÁ77Ð_õÕxrÈù}RåÜÐàzÚe ²áV\Ì*yyæÞ[mCºÛ"1>3ópÁ7,4 ÿ(´qüÇæ¶×·¢àØÜ	­Ø4uC
2õÂi'Íâë>ö:uxõyÁêýCäFß^³aÄ-QòG2Gt\×böë rºueA8w÷Ðp/ãXIðèWñ	Ê= a*!ìòV²ÁEïô=MZ;	BG°
KöqÈ=}òRuL ÚëÌ<ñ(ÀÝ~á°ñOC4=MÝZK19ÂGµºþ|Æ]dö0¹Ù N¸þuöÐ"mxs2asþ= ×²]cÝ âoÁEÌÉµË·½Ní~åÌ×É0 ÄUýÌ*Ö2d ­Û"7ÅÉj0f,xíG%
ÚMyÁØ¿2\h¶ÓÅðiKös×ÿÚÀî	pR<ûN$è=}ËQ(}}V<±1aK.bm(©{B+þÑ¼ÄÙéüÜÍÑÙ;*x8Ta"¤áÖû'¦¹8î¨ö7 )5æ{Þn¥¾O¼ºèsÜ* 9;p­ÂyýK:ÙÛJÐím{ ªÛæÊ/P	Ñ[,èæþ1oõ²Yk¶&ï_Sã~¾@ÊX_Ò¡¡.sP4*Ú lD£ßó»+êE%3û¨q³WÀ%jæjÓ÷r°êð«Ïø.gJÀ4k9çL7@º&a»w\·.ñÌéÊÁ¢Wj¬ËSðg¶4ÛyÈ¬Èj/Ôòär
ÌÇÒ¸ ÷vÓ½á(ßx?1ô¼»Ð¦p¨<;Ä<(æVSæÄ¾øÙ	Ñ¿ïý<&þ©óÅÖº\z\sÚ²Êpfné[ êá9 pê= 3¥ýù#6ÛÝ.2¨x?Öö#}¼¥¯[ÐcMTåo¬ÔC³ú®Tîö'4ÅÛËå2êÅßù/õ9_;Ñi*gMí/âh;Ö4è ¹8&û×oÔb+hâÊüßpT[H$h¶ÀÏ!¡k²¹ø©¡fÏ!¿pÂ¹¡n%¸®eÆÏï	Dc;¨Fú[Wì¯­i#ÞÅ¹$H³9­Ô¤Æûhªjà¨ÓFØÂHäpÓ²ÏÒªæUdwâ®ÀÕäpÛ¦IlHfDÊLó­û©È&ûÄ¬5ÑÊe2§{xÀª ,Tãêf)3ËÓ¥õfäê¿­ØdS=Mÿ³Û©cÁÛ®VÛk'Ò$(2@äPu´'ºdVÐûhûæ ßî.::9%%¼?ö¥mZ¹e=MbC¢±/rÖ){ä¦ûgz&F	ffÐ[ Ô®qp#öÎIå~Çy?£©¬=MS= ç¼-^·äCI£	9Ó·Ê°y/©´µ?:ÑñWîá¶^n+h8ÜÌéM§°'MëJà5úñÿ\ñ©5Ò5e¼JlYmÇÎÃì9ðÁ¿{íÍ¯z6þú¢êÍuçÆÌ(K'ç³ ¾ÂÕ×nAoí¼5XÖ+T&­Â4ÇLtB<^ÿÖðIf¢ÃÖS¨ö!y&,@Ù(|ÞImeCLh@êHiY¼¡28^¹Þ7å\q[Ã<ÑH/=}¬òÜ(ÂÎÒüÝ
2Ý  û&AóAæ¢VUCÔn?K~ÁPÞµðàrHö^®ÅMV-ÁMã¸ðZôxF?-Ê6n
kÈ=M6áüñLdXúØàÄ|çIâIÜiWdÎ=}Þ¦= P8½6"zòþåÇswõµBò:d âÓKå¤"¾*a¤ÍÜôÀ½É|el{×°J×pc7÷°ßÆH0ÚY÷ O{+~xðSxÿwÝÂÑåbvîx#¼Ý~ü=M%îsµÚXéB,;V{¤B\Ýõ3®Í*^8Ã²Ç[T²<*<BC×£-&St×§Fá'EyW×1g~ôcÌ©ÎT*,júÊ¶Sç!¼éÇD|?È¨VvÓcÞÀr
iï	^ |[±-:QKßØnjÜÕ¨KE£Ê-[æ#-x¥*®T&³ÊÈ-3W.su/v-hûî/'h¦¹RB¶.ÙBû_Ýc"ÆÏhe$ Ïw=MV]å¯æ:è£Ú'Sè£psý=}²Ííì±WÐm¥Ü¯= 7­"Éfyx,Óí¿+)8~ÆcÔ·Á¨%Ç$+à±^?DÙlÁ9pS)b¼S?©-Ì®¡$ÜSO¤¿=}°3à®õ/Jåpóó)'þÃìä½ïÙ±6yáu~9SB4¢w6Xô,rØ-Àáã)Z37ÚÎë øµ,ÝèÑÄÐ vëRµ8sc«ÈÔ}¦1owÕ._U»IZ_×ºÂýeLÒÛl¤Ü=}h=Mt(»ý¿ãÖLM=M]ñÞ {;Y¬ru¨tÌ%ª×[E,y JAâs-*âyþµKöÃ&}½vè¸/v<+H(vrÀ°¿¢éª@¯4zÕº&²Ïe¢|<óÀdd(Ùû#E Ñ[RªqodF]¡» à«Âq«f\´4Kg2dÊìË^¼qîiöÑ[ò©é8	xH¿?ÃqfÖ­óªÂ }¨»{Òg¡2Å¿ä/|ÏÍ T¡®.¢
÷Á#ì¥Ã¯@~ÖSY~Y~Y~Y~YÚ»]²
¢ª¥AµåVéõ3±±Oí©é£¿?OBíäÞã¤¥¯ÿ¡q½#ª³¥Ýc¤§£ÿ¡!c«dãÁK¤À£:"âsgB5êÖ¥¹c±Û¦'Ä¨_þ½p¢¬: n"rAb,*2òëçïåíéññìèðæîêòrkgoemiq1 
¿¤ÌÈÐ¦¶ÎÞÊÚ²B#3K[GW/?%5M]IY1A$4L\HX0@¦î¯Ô°ÖÊbS[W?E-=}IYaT<H0@FV^Zëûý	ñR´ÕìÍ¾ü{\©)éiJ	º7÷yÙW±òoÏQB"¡Ö¸bE$P
ëýü
¢jbu.üêG¹ùZ0pP  ÆÜZWIL&úó÷éì jcd êbÔíÜ§gùYòÑÀ = .õ«rLÂÿß_"ÜbAúø¢|»#7UYT8f~Z«½×/bìËBóâ¡©T_þùy>yt¸Æ^3Ë°¿_ñL¸S¡ÝX!ÿzdx®Rv»É _i8b½V |¹¥Ðã¬KmmmEE¯Ú}ºC¦÷"""þþ£¶Ù¤MçØÙÙ9:Ô£F½¾î<S8óÆ­á¼Ô ó²MVVVIIc:¬~²ððð¸¸\/;ÁK¶xyyù  ã³ß£©$££· âzU|mY~yU~Ð~|YR1é)ªµYb¤ôäà[í!Æoò§Â³Ùæ|©MÌ»c ¥@Ã%©V¤ë£=}A´ßHOnÏnÕ!C(jdÔuÞeJ	
¥LÝNU1âÜÞ1ñPìfð­Þ~eo¶[nÝÅ, _=M)35éý5ëaD,*eÄõÞg*		¯ÒLÍÎU-Ì~-o1H\<åÏØðÙ² _ºÑ5~ÌiÍà\é¤
û#¼ë;~°Þ}vIÃ«$äÏî½])ÊH¦= 
©é/ÑZ¿n49ÁZÈjlëB<&,_F=}Pi¡GFôÇ-¿ñ@ìnÐ-ÛjÅoö]~]ÉL = ½)+õÑY·.9IÁYÌ*ìóÂ<(T_E5NPg=M!HPJnUÛyúÍwVX{ob5 \çÁJ½
Å@%qWÃÖ+»q±µ|nI³Ìå.V3R¤¾#÷±a¼¼hm^eOÊýeù?ÃFFñÉ´ðÚû@°èÊr~,5tÉFÂZÌÿ.Õ:rKÁT*Y¼ií^guÏÞ=}g	¿ÄPfùi=}mQTÕ0ATÀ
kÛ>:g¶¹&|e"U[ïJ¼&åqU³V;}WÙÞì»cÁóeè9´v{&ÙÃ¤±$<»p®Í[u­O
ýuy?Ç6F ÑÉ¶æ°Úý&0ð
Ò{<®UÔÉJâËß.Ô2rLV:1»q¶m[wÕÏ=}w¿È@f Ùi)ÍQX­@AXà
l;2Ç³ùæ{m¢-\åáJ>Ãç'_Js=}¥/{~YÐXZpY><~Yaw5å(­ÜV¢lÿ[Ññ»o$ÕMn%7¦òñÚÀ:ÞsÊÐ1sÛó= 2 ã>°®ü8úpf!pWFûxnï*	jþ¹i)8Î.v,ç¾_LåpRü4uL´*ýìwA	Zf?áçxÏ{"kB>¯8%ÉçÜ¨¾½ÔZE8A¼}ÈæYÁ¦a2IÁÝÀìwlMèkh¼GÕ=MÜB--x{ÔÌ /óä]=}e~ÎÔKjÉ=Mê1eyÀGâÏfb(äÁÌMbÜãò]î^=Mþ'ÛîøO¨;?<Ñùojªlðuqmh=Mp ÍÿÞªÍxö½Úá®ÈöN¼¼4ÁÊJ^î¢-èõó´asÒ¬) hú¥árÑh,&äù9a´&= ÎÚE¡|úu-4ÛqNùÚ¿XïØz©DÛxYÙùÞ»jRwÆn§@X¤Òd²pÙq²(bõ¢ È[rì¢­ªjJ×XVVút©PÂÂxRWluAte¢'wèéâV;¥»C²¥#$»)$oE9²²p@¼nOl}|6= F´Pt/gßà¼5ÕÈ~ïyl?vÄ Iö]ðj@qá¯e;'pÓ­N¹fÓÏ²vSà/fÓ²
;±«££$Ã'¸RÝxÿ©i×ë.5ÙvËPIü}ðfW?IÞ0v=}J »+(Ô´¾Çùiï/Dû½öTØioh»/hÔ¼>×ùj1ûÁvTài oj¡ß3º,_Ô28ïÜ²H÷Ý2XÿÞ²hÁpNrV -&S¥Ë'¤Ã³#ô×0ÿ¢&=MYf{â^A
z|!PjQ|XÂ^
z{á@: 
z {â: 
zß{ØÂp. zß|Øp> 
úÁm* TÎâlQ|8Ú^
úÂ{x²(  úB{xÒ0  úÂ|xò8  úB|x@  
:ª:º:Ê:Ú:ê:ú ~A½RÁX)XO{nA©
É
é
	
ªÊê
Ú¦VÓ¶VÔÆVÕÖVÖæV×öVØVÙV:$ÏÅ¾¼lí	U6DÏÍþ¼nýUz¤ s¬s´ t¼tÄ uÌuÔ vÜvä wìwô xüx yy z
#¨É{'¸	{+ÈI{/Ø{3èÉ|7ø	Ú)BèÝY¥³)$»Ý¤¾WÐIÈ²ëì_âr¢?âp Öro:Ö"l!|Ú*ê'ú(
)jêgúh
iJ*4uòíÐ à¹#©£³©ÃqÍ¥0äyUßRnàáR\ÞArÁU2ÈlAURÐnÁVrØpAVà2ªÄg2µð,êÌhR¹ .*Ôir½0jÜjÁ ò²u*Å ëòu:É ì2uJÍ íruZÑ î²vjÕ ïòvzY~Âý2vÝ ñrvá Â9C££³«%óÔJ"ÎâW#Ãá+º*Åa+Ú2Çá,ú:Éa,BËá-:JÍa-ZRÏá.zZÑa.bÓá/ºjÕa/Úr×á0úzÙa0Ûá1:Ýa1Zßá2záa2¢Ãâkº*ÅbkÚ2!Õ<bo
Ú@r!×=}âpJúPz!Ù>bp= !Û?âqÊ:prtvxz|~^¶§²«$£££cY~Y~Y~Y~Y'ÙmP^uMO= mNP\qÎD-©}D/½=}C2­D.¥Èøxóþà8øööÀøô ÐøK7=M½J:=MI6!ÍLJ8-·òÜ OòÝ/VrÞWÖrÜ¢ÇõlÃ>ß5ìÆ6¿ìÄ@Ïì3M¼	>
U	=}aÌI>Q¬6íÐFíÑPomÒHUmÐôÎRbîRaÒbÞbgÍ¾VjÕUfáÎOVhÑ®9ÿfÿpðhZõNWnPX|ñPWù^Ðý¥¸¯Sd¦¼×Ód¤Â·sd¥º§ëE-ÄYÅ.ÉIÛ.Å]û-³ÌwÓe±Òse¯Êóå²Î³Ä0Ýi{0ß};/âm0ÞgÅ1ëûÓ­cË~Y~Y¾fÓlÞ¸ÇQEè6/àrW}l ÏytÛj§2¢[ÕÜ"ê:l]K¥t$¨Y¸>$§MÂÅ©lÁÏSPäª¿ï
ó ­Ô çØ´läÏÂTç³û×[hJ¹D /<èº8Åÿ93ìå«2Ê=}³ÝeËñ7U)ï½½_v)s¼ét÷InXëIÓðBïÝjöHBÑMJwáPÖòD",æPÙÇmúJãçêÁ1ÕÞLFzTgÇöï°(Kõå:ÁáBæL¹ýì9¸UP6mÆ¶|ûlmä!Ø00O/ü¼~{=}j}Ùé.ùwVÆAÒü6rA¹0°êE ú<ÅE&úìò¼£j¶©£²
~Y\ÝàbV~Y¢K~	ó~ùû^0MYÊÈB©T*þ^\? Z9eSkÐU·<.2ïÅ4<k÷:¼k
"z¡0á"°aù³s ïÒîµ«x>Ìn7
mu0q°ññ&É&ÉöW:ÙY0Y0ª/§¯²ª°¨±©±)zê-õhLÌE×ÉÆEÓWuJxLárø6Ãî/î¸Ê.õu(üEÏô8ö=  6ð6p"}öIÑPøàCó.]y#©U;l2Í³Hh«ÖlT<ï¹ø¿ýµù½yzÙÞ<Ã²òr­ÎLQKK×¼×Àx@w>JTëDqý¡¹qáXfÍ>wºZ)ùjÇ.6µ¶Õ;÷-Ãö?ÒË®L«N²O°À=}àAÎnÍ ?=}ÝOýýOO*ÉJ¼qyþßzH¡©P?<¬ð&P= ËáÔÄÖa'k¸é·¬Î§$p! !p!ð$Æ1®OI;üî@ÓO;gÓ¬#ÇÙÿäETìO£$@:³ä(>Ûzí0RHN=M	

R>XþÛz Ûªöt\ï£+|½ »XP÷QVÈû³JºÆ+Y÷9Z}¥@¾Ý= ÿcAÜ'£³æpóCèA^5£Ë)öt[zçHÍÞQá!+£³æpqE'¨Záª2{ürÞn¬£ÔwYßÛä\7TÃa"yRSIbâmiÖZñµ=M£2]ÑqøG}Ò` });
	var HEAPU8, wasmMemory;
	function updateMemoryViews() {
		var b = wasmMemory.buffer;
		new Int8Array(b);
		new Int16Array(b);
		HEAPU8 = new Uint8Array(b);
		new Uint16Array(b);
		new Int32Array(b);
		new Uint32Array(b);
		new Float32Array(b);
		new Float64Array(b);
	}
	function JS_cos(x) {
		return Math.cos(x);
	}
	function JS_exp(x) {
		return Math.exp(x);
	}
	var _emscripten_memcpy_js = (dest, src, num) => HEAPU8.copyWithin(dest, src, src + num);
	var abortOnCannotGrowMemory = (requestedSize) => {
		abort("OOM");
	};
	var _emscripten_resize_heap = (requestedSize) => {
		HEAPU8.length;
		requestedSize >>>= 0;
		abortOnCannotGrowMemory(requestedSize);
	};
	var wasmImports = {
		/** @export */ b: JS_cos,
		/** @export */ a: JS_exp,
		/** @export */ c: _emscripten_memcpy_js,
		/** @export */ d: _emscripten_resize_heap
	};
	function initRuntime(wasmExports) {
		wasmExports["f"]();
	}
	var imports = { "a": wasmImports };
	var _opus_frame_decoder_create, _malloc, _opus_frame_decode_float_deinterleaved, _opus_frame_decoder_destroy, _free;
	this.setModule = (data) => {
		WASMAudioDecoderCommon.setModule(EmscriptenWASM, data);
	};
	this.getModule = () => WASMAudioDecoderCommon.getModule(EmscriptenWASM);
	this.instantiate = () => {
		this.getModule().then((wasm) => WebAssembly.instantiate(wasm, imports)).then((instance) => {
			const wasmExports = instance.exports;
			_opus_frame_decoder_create = wasmExports["g"];
			_malloc = wasmExports["h"];
			_opus_frame_decode_float_deinterleaved = wasmExports["i"];
			_opus_frame_decoder_destroy = wasmExports["j"];
			_free = wasmExports["k"];
			wasmMemory = wasmExports["e"];
			updateMemoryViews();
			initRuntime(wasmExports);
			ready();
		});
		this.ready = new Promise((resolve) => {
			ready = resolve;
		}).then(() => {
			this.HEAP = wasmMemory.buffer;
			this.malloc = _malloc;
			this.free = _free;
			this.opus_frame_decoder_create = _opus_frame_decoder_create;
			this.opus_frame_decode_float_deinterleaved = _opus_frame_decode_float_deinterleaved;
			this.opus_frame_decoder_destroy = _opus_frame_decoder_destroy;
		});
		return this;
	};
}
//#endregion
//#region src/vendor/opus/index.js
function OpusDecoder(options = {}) {
	if (!OpusDecoder.errors) Object.defineProperties(OpusDecoder, { errors: { value: /* @__PURE__ */ new Map([
		[-1, "OPUS_BAD_ARG: One or more invalid/out of range arguments"],
		[-2, "OPUS_BUFFER_TOO_SMALL: Not enough bytes allocated in the buffer"],
		[-3, "OPUS_INTERNAL_ERROR: An internal error was detected"],
		[-4, "OPUS_INVALID_PACKET: The compressed data passed is corrupted"],
		[-5, "OPUS_UNIMPLEMENTED: Invalid/unsupported request number"],
		[-6, "OPUS_INVALID_STATE: An encoder or decoder structure is invalid or already freed"],
		[-7, "OPUS_ALLOC_FAIL: Memory allocation has failed"]
	]) } });
	this._init = () => new this._WASMAudioDecoderCommon(this).instantiate(this._EmscriptenWASM, this._module).then((common) => {
		this._common = common;
		this._inputBytes = 0;
		this._outputSamples = 0;
		this._frameNumber = 0;
		this._input = this._common.allocateTypedArray(this._inputSize, Uint8Array);
		this._output = this._common.allocateTypedArray(this._outputChannels * this._outputChannelSize, Float32Array);
		const mapping = this._common.allocateTypedArray(this._channels, Uint8Array);
		mapping.buf.set(this._channelMappingTable);
		this._decoder = this._common.wasm.opus_frame_decoder_create(this._sampleRate, this._channels, this._streamCount, this._coupledStreamCount, mapping.ptr, this._preSkip, this._forceStereo);
	});
	Object.defineProperty(this, "ready", {
		enumerable: true,
		get: () => this._ready
	});
	this.reset = () => {
		this.free();
		return this._init();
	};
	this.free = () => {
		this._common.free();
		this._common.wasm.opus_frame_decoder_destroy(this._decoder);
		this._common.wasm.free(this._decoder);
	};
	this._decode = (opusFrame) => {
		if (!(opusFrame instanceof Uint8Array)) throw Error("Data to decode must be Uint8Array. Instead got " + typeof opusFrame);
		this._input.buf.set(opusFrame);
		let samplesDecoded = this._common.wasm.opus_frame_decode_float_deinterleaved(this._decoder, this._input.ptr, opusFrame.length, this._output.ptr);
		let error;
		if (samplesDecoded < 0) {
			error = "libopus " + samplesDecoded + " " + (OpusDecoder.errors.get(samplesDecoded) || "Unknown Error");
			console.error(error);
			samplesDecoded = 0;
		}
		return {
			outputBuffer: this._common.getOutputChannels(this._output.buf, this._outputChannels, samplesDecoded),
			samplesDecoded,
			error
		};
	};
	this.decodeFrame = (opusFrame) => {
		let errors = [];
		const decoded = this._decode(opusFrame);
		if (decoded.error) this._common.addError(errors, decoded.error, opusFrame.length, this._frameNumber, this._inputBytes, this._outputSamples);
		this._frameNumber++;
		this._inputBytes += opusFrame.length;
		this._outputSamples += decoded.samplesDecoded;
		return this._WASMAudioDecoderCommon.getDecodedAudioMultiChannel(errors, [decoded.outputBuffer], this._outputChannels, decoded.samplesDecoded, this._sampleRate);
	};
	this.decodeFrames = (opusFrames) => {
		let outputBuffers = [], errors = [], samplesDecoded = 0, i = 0;
		while (i < opusFrames.length) {
			const opusFrame = opusFrames[i++];
			const decoded = this._decode(opusFrame);
			outputBuffers.push(decoded.outputBuffer);
			samplesDecoded += decoded.samplesDecoded;
			if (decoded.error) this._common.addError(errors, decoded.error, opusFrame.length, this._frameNumber, this._inputBytes, this._outputSamples);
			this._frameNumber++;
			this._inputBytes += opusFrame.length;
			this._outputSamples += decoded.samplesDecoded;
		}
		return this._WASMAudioDecoderCommon.getDecodedAudioMultiChannel(errors, outputBuffers, this._outputChannels, samplesDecoded, this._sampleRate);
	};
	this._isWebWorker = OpusDecoder.isWebWorker;
	this._WASMAudioDecoderCommon = OpusDecoder.WASMAudioDecoderCommon || WASMAudioDecoderCommon;
	this._EmscriptenWASM = OpusDecoder.EmscriptenWASM || EmscriptenWASM;
	this._module = OpusDecoder.module;
	const MAX_FORCE_STEREO_CHANNELS = 8;
	const isNumber = (param) => typeof param === "number";
	const sampleRate = options.sampleRate;
	const channels = options.channels;
	const streamCount = options.streamCount;
	const coupledStreamCount = options.coupledStreamCount;
	const channelMappingTable = options.channelMappingTable;
	const preSkip = options.preSkip;
	const forceStereo = options.forceStereo ? 1 : 0;
	if (channels > 2 && (!isNumber(streamCount) || !isNumber(coupledStreamCount) || !Array.isArray(channelMappingTable))) throw new Error("Invalid Opus Decoder Options for multichannel decoding.");
	this._sampleRate = [
		8e3,
		12e3,
		16e3,
		24e3,
		48e3
	].includes(sampleRate) ? sampleRate : 48e3;
	this._channels = isNumber(channels) ? channels : 2;
	this._streamCount = isNumber(streamCount) ? streamCount : 1;
	this._coupledStreamCount = isNumber(coupledStreamCount) ? coupledStreamCount : this._channels - 1;
	this._channelMappingTable = channelMappingTable || (this._channels === 2 ? [0, 1] : [0]);
	this._preSkip = preSkip || 0;
	this._forceStereo = channels <= MAX_FORCE_STEREO_CHANNELS && channels != 2 ? forceStereo : 0;
	this._inputSize = 3840 * this._channels;
	this._outputChannelSize = 5760;
	this._outputChannels = this._forceStereo ? 2 : this._channels;
	this._ready = this._init();
	return this;
}
//#endregion
//#region src/helpers/number/clamp.ts
function clamp(v, min, max) {
	return Math.min(max, Math.max(min, v));
}
//#endregion
//#region src/lib/serviceWorker/rtmp.ts
const ctx$3 = self;
const pendingStreams = /* @__PURE__ */ new Map();
ctx$3.pendingStreams = pendingStreams;
const lastKnownTime = /* @__PURE__ */ new Map();
const floodRelease = /* @__PURE__ */ new Map();
const BUFFER_MS_MIN = 8e3;
const BUFFER_MS_MAX = 1e4;
const BUFFER_MS_START = 5e3;
const OFFSET_MS = 1e3;
const MAX_REPLENISH_CHUNKS = 64;
const HLS_TIMEOUT = 3e4;
const STREAM_TIMEOUT = 5e3;
const MP4_MIME = "video/mp4";
const HLS_MIME = "application/vnd.apple.mpegurl";
var RtmpStream = class {
	constructor(call, accountNumber) {
		this.call = call;
		this.accountNumber = accountNumber;
		this._generation = 0;
		this._retryCount = 0;
		this._destroyed = false;
		this._controllers = /* @__PURE__ */ new Set();
		this._waitingForBuffer = /* @__PURE__ */ new Set();
		this._timeouts = /* @__PURE__ */ new Set();
		this._hlsWaitingForBuffer = [];
		this._hlsWaitingForChunk = /* @__PURE__ */ new Map();
		this._pendingRejects = [];
		this.destroy = (error = /* @__PURE__ */ new Error("destroyed")) => {
			this._log("destroying rtmp stream", error);
			pendingStreams.delete(this.call.id);
			this.clearClock();
			this.clearDeadTimeout();
			for (const timeout of this._timeouts) clearTimeout(timeout);
			if (this._opusDecoder !== void 0) this._opusDecoder.free();
			for (const controller of this._controllers) controller.close();
			for (const controller of this._waitingForBuffer) controller.close();
			for (const reject of this._pendingRejects) reject(error);
			this._destroyed = true;
			this._generation = 0;
			invokeVoidAll("rtmpStreamDestroyed", this.call.id);
		};
		this.onHlsTimeout = () => {
			const log = this._log.bindPrefix("onHlsTimeout");
			log("hls playlist refetch timeout");
			if (this._hlsWaitingForBuffer.length || this._hlsWaitingForChunk.size) {
				log("still active (some fetch is pending)");
				this.setDeadTimeout(this.onHlsTimeout, HLS_TIMEOUT);
				return;
			}
			log("destroying due to inactivity");
			this.destroy();
		};
		this.decodeOpus = this.decodeOpus.bind(this);
		this._log = logger("RTMP-" + (Date.now() + "").slice(-2));
		this._log("constructor", call.id);
	}
	updateRtt(rtt) {
		if (this._rtts.push(rtt) > 10) this._rtts.shift();
	}
	maybeAdjustBufferSize() {
		if (this._rtts.length < 3) return;
		const log = this._log.bindPrefix("maybeAdjustBufferSize");
		const avgRtt = this._rtts.reduce((a, b) => a + b, 0) / this._rtts.length;
		const targetBufferSize = Math.ceil(clamp(avgRtt * 3, BUFFER_MS_MIN, BUFFER_MS_MAX) / this._chunkTime);
		log(`avg rtt=${avgRtt} target buffer size=${targetBufferSize}`);
		if (targetBufferSize !== this._bufferSize) {
			const diff = targetBufferSize - this._bufferSize;
			this._cutoff = this._cutoff.minus(this._chunkTime * diff);
			this._bufferSize = targetBufferSize;
			log(`adjusted buffer size to ${targetBufferSize}`);
		}
	}
	async processChunk(iso, seq) {
		if (!iso) return /* @__PURE__ */ new Uint8Array(0);
		return generateFmp4Segment({
			chunk: iso,
			seq,
			timestamp: (0, import_BigInteger.default)(seq).multiply(this._chunkTime),
			opusTrackId: this._initChunk.opusTrackId,
			decodeOpus: IS_SAFARI && this.decodeOpus
		});
	}
	async fetchChunk(time, ignoreRequestedTime) {
		const log = this._log.bindPrefix("fetchChunk-" + time.toString());
		if (time.isNegative()) {
			log.warn("negative time");
			return;
		}
		if (!ignoreRequestedTime && this._lastRequestedTime !== void 0 && time.lesserOrEquals(this._lastRequestedTime)) {
			log.warn("last requested time is greater or equals", this._lastRequestedTime.toString());
			return;
		}
		this._lastRequestedTime = time;
		log(`starting fetch time=${time}`);
		const now = Date.now();
		const info = await serviceMessagePort.invoke("requestRtmpPart", {
			dcId: this._dcId,
			accountNumber: this.accountNumber,
			request: {
				_: "inputGroupCallStream",
				call: this.call,
				time_ms: time.toString(),
				scale: this._scale,
				video_channel: 1,
				video_quality: 2
			}
		});
		const rtt = Date.now() - now;
		this.updateRtt(rtt);
		log(`ended fetch time=${time}, rtt=${rtt}`);
		if (!info) {
			log.warn("no bytes");
			return;
		}
		if (info.container !== "mp4") throw new Error("Invalid container");
		return ISOBoxer.parseBuffer(info.bytes.slice(info.contentOffset).buffer);
	}
	async generateInitChunk(iso) {
		if (this._initChunk) return;
		this._initChunk = generateFmp4Init(iso, { opusToFlac: IS_SAFARI });
		if (this._initChunk.opusInitOptions) await this.initOpusDecoder();
		this._retryCount = 0;
	}
	async initOpusDecoder(ignoreExisting = false) {
		if (this._decoderInitPromise) {
			await this._decoderInitPromise;
			return;
		}
		this._log("creating opus decoder");
		if (this._opusDecoder !== void 0 && !ignoreExisting) this._opusDecoder.free();
		const decoder = new OpusDecoder(this._initChunk.opusInitOptions);
		this._decoderInitPromise = decoder.ready;
		await this._decoderInitPromise;
		this._opusDecoder = decoder;
		this._log("opus decoder created");
	}
	async decodeOpus(chunk) {
		if (this._opusDecoder === void 0) await this.initOpusDecoder();
		return this._opusDecoder.decodeFrame(chunk);
	}
	hasEnoughBuffer() {
		return !!this._initChunk && this._bufferSize && this._buffer.some((chunk) => !!chunk.segment);
	}
	sendBufferToController(controller) {
		this._log("sending buffer to controller");
		controller.enqueue(this._initChunk.data);
		for (const chunk of this._buffer) {
			if (!chunk.segment) break;
			controller.enqueue(chunk.segment);
		}
	}
	removeStaleChunks() {
		do {
			const chunk = this._buffer[0];
			if (chunk && chunk.time.lt(this._cutoff)) {
				this._buffer.shift();
				this._log("removing stale chunk", chunk.time.toString());
			} else break;
		} while (true);
	}
	async _replenishBuffer(maxChunks = 1, lastReplenishingPromise = this._lastReplenishingPromise) {
		const log = this._log.bindPrefix("replenishBuffer-" + this._replenishTempId++);
		this.removeStaleChunks();
		const thisGeneration = this._generation;
		const chunksToFetch = clamp(this._bufferSize - this._buffer.length, 0, Math.min(maxChunks, MAX_REPLENISH_CHUNKS));
		if (!chunksToFetch) {
			log("skipping replenish - buffer full");
			return;
		}
		const shouldSkip = () => this._destroyed || this._generation !== thisGeneration;
		const lastBufferedChunkTime = this._lastRequestedTime;
		const tasks = [];
		log(`replenishing buffer chunksToFetch=${chunksToFetch} lastBufferedChunkTime=${lastBufferedChunkTime} bufferLength=${this._buffer.length}`);
		for (let i = 1; i <= chunksToFetch; ++i) {
			const nextTime = lastBufferedChunkTime.add(this._chunkTime * i);
			const chunk = { time: nextTime };
			this._buffer.push(chunk);
			const fetchChunk = async (ignoreRequestedTime) => {
				try {
					chunk.iso = await this.fetchChunk(nextTime, ignoreRequestedTime);
				} catch (e) {
					log("error", e.type, nextTime.toString());
					const retry = async (delay) => {
						await pause(delay);
						if (shouldSkip()) return;
						return fetchChunk(true);
					};
					if (e.type === "TIME_TOO_BIG") {
						if (ignoreRequestedTime) throw new Error("stream ended");
						const state = await this.fetchState();
						if (shouldSkip()) return;
						const channel = this.findChannel(state);
						const delay = nextTime.minus((0, import_BigInteger.default)(channel.last_timestamp_ms)).add(this._chunkTime).toJSNumber();
						if (delay < 0) throw new Error("stream ended");
						return retry(delay);
					} else throw e;
				}
				return chunk;
			};
			tasks.push(fetchChunk());
		}
		let newChunks = await Promise.all(tasks);
		if (shouldSkip()) return;
		this.maybeAdjustBufferSize();
		await lastReplenishingPromise;
		if (shouldSkip()) return;
		newChunks = newChunks.filter((chunk) => chunk.time.gt(this._lastFlushedTime));
		if (!newChunks.length) {
			log.warn("skipping flush - no new chunks");
			return;
		}
		if (this._lastFlushedTime.notEquals(import_BigInteger.default.zero) && newChunks[0].time.minus(this._lastFlushedTime).notEquals(this._chunkTime)) log.error(`chunks are not continuous, lastFlushed=${this._lastFlushedTime.toString()}, newChunks=${newChunks[0].time.toString()}`);
		this._lastFlushedTime = newChunks[newChunks.length - 1].time;
		newChunks = newChunks.filter((chunk) => {
			if (!chunk.iso) {
				this._log.error("empty chunk?", chunk);
				return false;
			}
			return true;
		});
		if (IS_SAFARI) {
			for (const waiter of this._hlsWaitingForBuffer) waiter();
			this._hlsWaitingForBuffer.length = 0;
			for (const chunk of newChunks) {
				await this.prepareChunkForFlushing(chunk);
				const waiters = this._hlsWaitingForChunk.get(chunk.seq) || [];
				this._hlsWaitingForChunk.delete(chunk.seq);
				log(`sending chunk to waiters time=${chunk.time} seq=${chunk.seq}`);
				for (const waiter of waiters) waiter(chunk.segment);
			}
		} else {
			for (const chunk of newChunks) {
				await this.prepareChunkForFlushing(chunk);
				log(`sending chunk to controller time=${chunk.time} seq=${chunk.seq}`);
				for (const controller of this._controllers) controller.enqueue(chunk.segment);
			}
			for (const controller of this._waitingForBuffer) {
				this.sendBufferToController(controller);
				this._controllers.add(controller);
			}
			this._waitingForBuffer.clear();
		}
		log("buffer replenished");
	}
	replenishBuffer(...args) {
		const lastReplenishingPromise = this._lastReplenishingPromise;
		const promise = this._lastReplenishingPromise = (async () => {
			const originalPromise = this._replenishBuffer(...args);
			try {
				const result = await originalPromise;
				await lastReplenishingPromise;
				return result;
			} catch (err) {
				throw err;
			}
		})();
		if (this._bufferSize - this._buffer.length > 0 && this._lastRequestedTime.geq(import_BigInteger.default.zero)) return Promise.all([promise, this.replenishBuffer()]).then(() => {});
		return promise;
	}
	async prepareChunkForFlushing(chunk) {
		if (!this._initChunk) {
			this._log(`will add init chunk to time=${chunk.time.toString()}`);
			await this.generateInitChunk(chunk.iso);
		}
		const seq = this._lastChunkSeq++;
		chunk.seq = seq;
		chunk.segment = await this.processChunk(chunk.iso, seq);
	}
	async fetchState() {
		const promise = deferredPromise();
		let retries = 0;
		let timeout;
		const retry = () => {
			if (retries > 3) {
				promise.reject(/* @__PURE__ */ new Error("Failed to fetch state"));
				return;
			}
			if (timeout) {
				clearTimeout(timeout);
				this._timeouts.delete(timeout);
			}
			timeout = ctx$3.setTimeout(() => {
				retries++;
				retry();
			}, 1e3);
			this._timeouts.add(timeout);
			serviceMessagePort.invoke("requestRtmpState", {
				call: this.call,
				accountNumber: this.accountNumber
			}).then((state) => {
				clearTimeout(timeout);
				promise.resolve(state);
			}).catch((e) => {
				this._log.error("error fetching state", e);
				retries++;
				retry();
			});
		};
		retry();
		return promise;
	}
	clearClock() {
		clearInterval(this._clock);
		this._clock = void 0;
	}
	setClock() {
		const log = this._log.bindPrefix("clock");
		const clock = this._clock = ctx$3.setInterval(() => {
			this._time = this._time.add(this._chunkTime);
			this._cutoff = this._cutoff.add(this._chunkTime);
			this.notifyTime();
			log(`tick ts=${this._time.toString()} cutoff=${this._cutoff.toString()}`);
			this.replenishBuffer().catch((e) => {
				if (this._destroyed || this._clock !== clock) return;
				log.error("error replenishing buffer", e);
				if (!this._buffer.some((it) => it.segment)) this.handleError(e);
			});
		}, this._chunkTime);
	}
	findChannel(state) {
		const channel = state.channels.find((channel) => channel.channel === 1);
		if (!channel) {
			log.error("no unified channel found", state);
			throw new Error("No unified channel found");
		}
		return channel;
	}
	async _start() {
		const log = this._log.bindPrefix("start");
		log(`starting ${this.call.id} generation ${this._generation} -> ${this._generation + 1}`, this);
		this.clearClock();
		this._initChunk = void 0;
		this._lastChunkSeq = 0;
		this._buffer = [];
		this._lastFlushedTime = import_BigInteger.default.zero;
		this._replenishTempId = 0;
		this._lastReplenishingPromise = Promise.resolve();
		this._rtts = [];
		const generation = ++this._generation;
		const check = () => this._generation === generation && !this._destroyed;
		const [state] = await Promise.all([this.fetchState(), floodRelease.get(this.call.id) && pause(Math.max(0, floodRelease.get(this.call.id) - Date.now()))]);
		if (!check()) return;
		floodRelease.delete(this.call.id);
		const channel = this.findChannel(state);
		log(`started, last_ts=${channel.last_timestamp_ms}, scale=${channel.scale}`);
		this._time = (0, import_BigInteger.default)(channel.last_timestamp_ms).minus(OFFSET_MS);
		this._lastRequestedTime = this._time;
		if (IS_SAFARI) {
			const lastKnown = lastKnownTime.get(this.call.id);
			if (lastKnown && lastKnown.gt(this._time)) this._time = lastKnown;
		}
		this._cutoff = this._time.minus(BUFFER_MS_MIN);
		this._scale = channel.scale;
		this._chunkTime = scaleToChunkTime(this._scale);
		this._bufferSize = Math.ceil(BUFFER_MS_MIN / this._chunkTime);
		this._dcId = state.dcId;
		this.notifyTime();
		this.setClock();
		await this.replenishBuffer(Math.ceil(BUFFER_MS_START / this._chunkTime));
	}
	start() {
		this._start().catch((e) => this.handleError(e));
	}
	notifyTime() {
		if (IS_SAFARI) lastKnownTime.set(this.call.id, this._time);
		invokeVoidAll("rtmpStreamTime", {
			callId: this.call.id,
			time: this._time.toString()
		});
	}
	/**
	* @returns whether the request should be retried
	*/
	handleError(error) {
		if (this._destroyed) return false;
		const log = this._log.bindPrefix("handleError");
		if (typeof error === "object" && error && typeof error.type === "string") {
			if (error.type.startsWith("FLOOD_WAIT")) {
				const wait = +error.type.split("_").pop();
				floodRelease.set(this.call.id, Date.now() + wait * 1e3);
				this.start();
				return true;
			}
			if (error.type === "TIME_TOO_SMALL" || error.type === "TIME_INVALID") {
				log("rtmp stream need resync", error);
				this.start();
				return true;
			}
			if ((error.type === "GROUPCALL_FORBIDDEN" || error.type === "VIDEO_CHANNEL_INVALID") && this._retryCount < 3) {
				log("retrying rtmp stream", error);
				this._retryCount += 1;
				this.start();
				return true;
			}
		}
		log("rtmp stream error", error);
		this.destroy(error);
	}
	createStream() {
		const log = this._log.bindPrefix("createStream");
		let controller_;
		return new ReadableStream({
			start: (controller) => {
				log(`added rtmp stream controller call=${this.call.id} gen=${this._generation} destroyed=${this._destroyed}`);
				controller_ = controller;
				if (this._generation === 0) this.start();
				this.clearDeadTimeout();
				if (this.hasEnoughBuffer()) {
					this.sendBufferToController(controller);
					this._controllers.add(controller);
				} else this._waitingForBuffer.add(controller);
			},
			cancel: () => {
				if (this._destroyed) return;
				log("rtmp stream controller died", this.call.id);
				this._controllers.delete(controller_);
				this._waitingForBuffer.delete(controller_);
				if (!this._controllers.size) this.setDeadTimeout(this.destroy, STREAM_TIMEOUT);
			}
		});
	}
	clearDeadTimeout() {
		if (this._deadTimeout) {
			clearTimeout(this._deadTimeout);
			this._deadTimeout = void 0;
		}
	}
	setDeadTimeout(callback, delay) {
		this.clearDeadTimeout();
		this._deadTimeout = ctx$3.setTimeout(callback, delay);
	}
	generateHlsPlaylist(baseUrl, end = false) {
		const chunkDuration = this._chunkTime / 1e3;
		const playlist = [
			"#EXTM3U",
			"#EXT-X-VERSION:7",
			`#EXT-X-TARGETDURATION:${Math.ceil(chunkDuration)}`,
			`#EXT-X-MEDIA-SEQUENCE:${this._buffer[0]?.seq ?? 0}`,
			"#EXT-X-INDEPENDENT-SEGMENTS",
			`#EXT-X-MAP:URI="${baseUrl}?hls=init"`
		];
		for (const chunk of this._buffer) {
			if (!chunk.segment) break;
			playlist.push(`#EXTINF:${chunkDuration},`, `${baseUrl}?hls=${chunk.seq}`);
		}
		if (end) playlist.push("#EXT-X-ENDLIST");
		return playlist.join("\n");
	}
	async getHlsPlaylist(baseUrl) {
		const log = this._log.bindPrefix("getHlsPlaylist");
		log("getting hls playlist");
		this.setDeadTimeout(this.onHlsTimeout, HLS_TIMEOUT);
		if (this._generation !== 0) return this.generateHlsPlaylist(baseUrl);
		this.start();
		return new Promise((resolve) => {
			const reject = (err) => {
				log("hls playlist fetch error, returning empty+end", err);
				resolve(this.generateHlsPlaylist(baseUrl, true));
			};
			this._pendingRejects.push(reject);
			this._hlsWaitingForBuffer.push(() => {
				const idx = this._pendingRejects.indexOf(reject);
				if (idx !== -1) this._pendingRejects.splice(idx, 1);
				resolve(this.generateHlsPlaylist(baseUrl));
			});
		});
	}
	getInitChunk() {
		return this._initChunk?.data;
	}
	async getHlsChunk(seq) {
		const log = this._log.bindPrefix("getHlsChunk");
		log("getting hls chunk", seq);
		const chunk = this._buffer.find((chunk) => chunk.seq === seq);
		if (chunk && chunk.segment) return chunk.segment;
		if (this._buffer.length && seq < this._buffer[0].seq) {
			log("hls chunk to old", seq);
			log(this._buffer);
			return;
		}
		return new Promise((resolve, reject) => {
			const interval = ctx$3.setInterval(() => {
				if (this._buffer.length && seq < this._buffer[0].seq) {
					log("hls chunk fetch timeout", seq);
					resolve(void 0);
				}
			}, this._chunkTime ?? 500);
			const rejectWrap = (err) => {
				clearInterval(interval);
				reject(err);
			};
			const waiters = this._hlsWaitingForChunk.get(seq) || [];
			waiters.push((chunk) => {
				const idx = this._pendingRejects.indexOf(rejectWrap);
				if (idx !== -1) this._pendingRejects.splice(idx, 1);
				clearInterval(interval);
				resolve(chunk);
			});
			this._pendingRejects.push(rejectWrap);
			this._hlsWaitingForChunk.set(seq, waiters);
		});
	}
};
async function getRtmpFetchResponse(event, params, search) {
	const { accountNumber: streamAccountNumber, ...call } = JSON.parse(decodeURIComponent(params));
	let pending = pendingStreams.get(call.id);
	const isHls = search?.startsWith("hls=");
	const accountNumber = streamAccountNumber ?? await getClientAccount(await ctx$3.clients.get(event.clientId));
	if (!pending) {
		log("creating rtmp stream", call.id);
		pending = new RtmpStream(call, accountNumber);
		pendingStreams.set(call.id, pending);
	}
	if (isHls) {
		search = search.split("&t=")[0];
		const baseUrl = event.request.url.split("?")[0];
		const chunk = search.slice(4);
		if (chunk === "playlist") return pending.getHlsPlaylist(baseUrl).then((r) => new Response(r, { headers: { "Content-Type": HLS_MIME } }));
		if (chunk === "init") {
			const init = pending.getInitChunk();
			if (!init) return new Response("", { status: 404 });
			return new Response(init, { headers: { "Content-Type": MP4_MIME } });
		}
		const seq = Number(chunk);
		if (isNaN(seq)) return new Response("", { status: 404 });
		return pending.getHlsChunk(seq).then((r) => {
			if (!r) return new Response("", { status: 404 });
			return new Response(r, { headers: { "Content-Type": MP4_MIME } });
		});
	}
	return new Response(pending.createStream(), { headers: { "Content-Type": "video/mp4" } });
}
function onRtmpFetch(event, params, search) {
	const responsePromise = getRtmpFetchResponse(event, params, search);
	event.respondWith(responsePromise);
}
function onRtmpLeftCall([callId, forever]) {
	const stream = pendingStreams.get(callId + "");
	if (stream) stream.destroy();
	if (IS_SAFARI && forever) lastKnownTime.delete(callId);
}
//#endregion
//#region src/lib/serviceWorker/errors.ts
const get500ErrorResponse = () => new Response("", {
	status: 500,
	statusText: "Internal Server Error",
	headers: { "Cache-Control": "no-cache" }
});
//#endregion
//#region src/lib/hls/common.ts
const QUALITY_FILE_MIME_TYPE = "application/x-mpegurl";
const ctx$2 = self;
logger("HLS");
const swLog = logger("SW-HLS");
function isDocumentHlsQualityFile(doc) {
	return doc?.mime_type === QUALITY_FILE_MIME_TYPE;
}
//#endregion
//#region src/helpers/forgetSettledRequest.ts
/**
* A request kept in a map while it is on its way, and forgotten once it settles - answered or failed - if the map
* still keeps this very one (a newer request for the key stays): the next ask makes a new request.
*/
function forgetSettledRequest(map, key, promise) {
	const forget = () => {
		if (map.get(key) === promise) map.delete(key);
	};
	promise.then(forget, forget);
	return promise;
}
//#endregion
//#region src/lib/hls/requestSynchronizer.ts
var RequestSynchronizer = class {
	constructor() {
		this.ongoingRequests = /* @__PURE__ */ new Map();
	}
	async performRequest(key, requestFn) {
		let request = this.ongoingRequests.get(key);
		if (!request) {
			this.ongoingRequests.set(key, request = requestFn());
			forgetSettledRequest(this.ongoingRequests, key, request);
		}
		return request;
	}
};
//#endregion
//#region src/lib/hls/onHlsQualityFileFetch.ts
const cacheStorage$1 = new CacheStorageController("cachedHlsQualityFiles");
const requestSynchronizer$1 = new RequestSynchronizer();
async function onHlsQualityFileFetch(event, params, search) {
	const deferred = deferredPromise();
	event.respondWith(deferred);
	try {
		const docId = params;
		const accountNumber = await getClientAccount(await ctx$2.clients.get(event.clientId));
		const result = await requestSynchronizer$1.performRequest(getHlsQualityCacheFilename(docId), () => fetchAndProcessQualityFile(docId, accountNumber));
		deferred.resolve(new Response(result));
	} catch (e) {
		deferred.resolve(get500ErrorResponse());
		swLog.error(e);
	}
}
async function fetchAndProcessQualityFile(docId, accountNumber) {
	return await replaceQualityFileWithLocalURLs(await (await getHlsQualityFile(docId, accountNumber)).text(), accountNumber);
}
function getHlsQualityCacheFilename(docId) {
	return `hls_quality_${docId}`;
}
async function getHlsQualityFile(docId, accountNumber) {
	try {
		const file = await cacheStorage$1.getFile(getHlsQualityCacheFilename(docId));
		swLog.info("using cached quality file", docId);
		return file;
	} catch {
		swLog.info("fetching quality file", docId);
		const file = await serviceMessagePort.invoke("downloadDoc", {
			docId,
			accountNumber
		});
		cacheStorage$1.saveFile(getHlsQualityCacheFilename(docId), file);
		return file;
	}
}
async function replaceQualityFileWithLocalURLs(fileString, accountNumber) {
	const regex = "mtproto:(\\d+)";
	const match = fileString.match(new RegExp(regex));
	if (!match) throw new Error("Wrong Hls quality file format");
	const targetDocId = match[1];
	swLog.info("targetDocId", targetDocId);
	if (!targetDocId) throw new Error("Wrong Hls quality file format");
	const doc = await serviceMessagePort.invoke("requestDoc", {
		docId: targetDocId,
		accountNumber
	});
	const params = {
		docId: targetDocId,
		dcId: doc.dc_id,
		size: doc.size,
		mimeType: doc.mime_type
	};
	const pathname = `hls_stream/${encodeURIComponent(JSON.stringify(params))}`;
	const targetFileURL = new URL(pathname, location.origin).toString();
	return fileString.replace(new RegExp(regex, "g"), targetFileURL);
}
//#endregion
//#region src/lib/hls/fetchAndConcatFileParts.ts
const cacheStorage = new CacheStorageController("cachedHlsStreamChunks");
const requestSynchronizer = new RequestSynchronizer();
async function fetchAndConcatFileParts(params, ranges) {
	const fileParts = [];
	let totalLength = 0;
	for (const range of ranges) {
		const bytes = await requestSynchronizer.performRequest(getChunkFilename(params, range), () => fetchFilePart(params, range));
		totalLength += bytes.length;
		fileParts.push(bytes);
	}
	if (fileParts.length === 1) return fileParts[0];
	const result = new Uint8Array(totalLength);
	let currentOffset = 0;
	for (const part of fileParts) {
		result.set(part, currentOffset);
		currentOffset += part.length;
	}
	return result;
}
async function fetchFilePart(params, range) {
	try {
		const filename = getChunkFilename(params, range);
		return await readBlobAsUint8Array(await cacheStorage.getFile(filename, "blob"));
	} catch {
		const { bytes } = await serviceMessagePort.invoke("requestFilePart", {
			...params,
			...range
		});
		saveChunkToCache(bytes, params, range);
		return bytes;
	}
}
function getChunkFilename(params, range) {
	return `${params.accountNumber}-${params.docId}?offset=${range.offset}&limit=${range.limit}`;
}
async function saveChunkToCache(bytes, params, range) {
	const filename = getChunkFilename(params, range);
	const response = new Response(bytes);
	await cacheStorage.save({
		entryName: filename,
		response,
		size: bytes.length,
		contentType: "application/octet-stream"
	});
}
//#endregion
//#region src/lib/hls/splitRangeForGettingFileParts.ts
/**
* Fetching file parts are implemented based on these restrictions:
* https://core.telegram.org/cdn#restrictions-on-uploadgetfile-and-uploadgetcdnfile-parameters
*/
const STREAM_CHUNK_MULTIPLIER = 4096;
const STREAM_FRAGMENT_SIZE = 1048576;
function splitRangeForGettingFileParts(lowerBound, upperBound) {
	const lowerBoundChunkStart = Math.floor(lowerBound / STREAM_CHUNK_MULTIPLIER) * STREAM_CHUNK_MULTIPLIER;
	const upperBoundNextChunkStart = (Math.floor(upperBound / STREAM_CHUNK_MULTIPLIER) + 1) * STREAM_CHUNK_MULTIPLIER;
	const lowerBoundFragmentStart = Math.floor(lowerBound / STREAM_FRAGMENT_SIZE) * STREAM_FRAGMENT_SIZE;
	const lowerBoundNextFragmentStart = (Math.floor(lowerBound / STREAM_FRAGMENT_SIZE) + 1) * STREAM_FRAGMENT_SIZE;
	const upperBoundInThisFragment = Math.min(lowerBoundNextFragmentStart, upperBoundNextChunkStart);
	const limitForFirstPart = snapLimit(upperBoundInThisFragment - lowerBoundChunkStart);
	const alignedLowerBound = Math.max(upperBoundInThisFragment - limitForFirstPart, lowerBoundFragmentStart);
	const ranges = [{
		offset: alignedLowerBound,
		limit: limitForFirstPart
	}];
	let currentOffset = lowerBoundNextFragmentStart;
	while (currentOffset < upperBound) {
		if ((Math.floor(currentOffset / STREAM_FRAGMENT_SIZE) + 1) * STREAM_FRAGMENT_SIZE > upperBound) break;
		ranges.push({
			offset: currentOffset,
			limit: STREAM_FRAGMENT_SIZE
		});
		currentOffset += STREAM_FRAGMENT_SIZE;
	}
	if (currentOffset <= upperBound) {
		const limitForLastPart = snapLimit(upperBound - currentOffset + 1);
		ranges.push({
			offset: currentOffset,
			limit: limitForLastPart
		});
	}
	const lastRange = ranges[ranges.length - 1];
	return {
		alignedLowerBound,
		alignedUpperBound: lastRange.offset + lastRange.limit - 1,
		ranges
	};
}
function snapLimit(limit) {
	return Math.max(2 ** Math.ceil(Math.log2(limit)), STREAM_CHUNK_MULTIPLIER);
}
//#endregion
//#region src/lib/hls/onHlsStreamFetch.ts
const ctx$1 = self;
async function onHlsStreamFetch(event, inParams, search) {
	const deferred = deferredPromise();
	event.respondWith(deferred);
	try {
		const { docId, dcId, size, mimeType } = JSON.parse(decodeURIComponent(inParams));
		const range = parseRange(event.request.headers.get("Range"));
		const accountNumber = await getClientAccount(await ctx$1.clients.get(event.clientId));
		const [lowerBound, upperBound] = range;
		const { ranges, alignedLowerBound } = splitRangeForGettingFileParts(lowerBound, upperBound);
		const filePart = await fetchAndConcatFileParts({
			docId,
			dcId,
			accountNumber
		}, ranges);
		const headers = {
			"Accept-Ranges": "bytes",
			"Content-Range": `bytes ${range[0]}-${range[1]}/${size || "*"}`,
			"Content-Length": `${upperBound - lowerBound + 1}`
		};
		headers["Content-Type"] = mimeType;
		const resultingBuffer = filePart.slice(lowerBound - alignedLowerBound, upperBound - alignedLowerBound + 1);
		deferred.resolve(new Response(resultingBuffer, {
			status: 206,
			statusText: "Partial Content",
			headers
		}));
	} catch (e) {
		deferred.resolve(get500ErrorResponse());
		swLog.error(e);
	}
}
//#endregion
//#region src/environment/utils.ts
let environment;
function getEnvironment() {
	return environment;
}
function setEnvironment(env) {
	return environment = env;
}
//#endregion
//#region src/lib/hls/createHlsVideoSource.ts
const FALLBACK_BANDWIDTH = 1e6;
const FALLBACK_WIDTH = 1280;
const FALLBACK_HEIGHT = 720;
function createHlsVideoSource(altDocs) {
	let qualityEntries = getQualityFilesEntries(altDocs);
	if (!getEnvironment().IS_AV1_SUPPORTED) qualityEntries = qualityEntries.filter((entry) => entry.codec !== "av01");
	if (!qualityEntries.length) return null;
	qualityEntries.sort((a, b) => a.bandwidth - b.bandwidth);
	let hlsFileSource = "#EXTM3U\n";
	for (const qualityEntry of qualityEntries) {
		const { w, h, bandwidth, url } = qualityEntry;
		hlsFileSource += `#EXT-X-STREAM-INF:BANDWIDTH=${bandwidth},RESOLUTION=${w}x${h}\n`;
		hlsFileSource += url + "\n";
	}
	hlsFileSource += "\n#EXT-X-ENDLIST";
	return hlsFileSource;
}
function getQualityFilesEntries(altDocs) {
	if (!altDocs?.length) return [];
	const videoAttributes = getVideoAttributesFromAltDocs(altDocs);
	const qualityURLs = getQualityURLsFromAltDocs(altDocs);
	return Object.entries(videoAttributes).map(([id, attr]) => {
		const { w = FALLBACK_WIDTH, h = FALLBACK_HEIGHT, duration = 0, video_codec: codec } = attr;
		const { size } = altDocs.find((doc) => doc.id.toString() === id);
		return {
			id,
			w,
			h,
			duration,
			bandwidth: (duration > 0 ? size / duration * 8 : FALLBACK_BANDWIDTH) | 0,
			url: qualityURLs[id],
			codec
		};
	});
}
function getVideoAttributesFromAltDocs(altDocs) {
	const result = {};
	for (const doc of altDocs) {
		const videoAttribute = doc?.attributes?.find((attr) => attr._ === "documentAttributeVideo");
		if (!videoAttribute) continue;
		result[doc.id] = videoAttribute;
	}
	return result;
}
function getQualityURLsFromAltDocs(altDocs) {
	const result = {};
	for (const doc of altDocs) {
		if (!isDocumentHlsQualityFile(doc)) continue;
		result[getTargetDocIdForQualityFile(doc)] = getURLForQualityFile(doc);
	}
	return result;
}
function getURLForQualityFile(doc) {
	return `hls_quality_file/${doc.id}`;
}
function getTargetDocIdForQualityFile(doc) {
	const fileNameAttribute = doc.attributes?.find((attr) => attr._ === "documentAttributeFilename");
	return (doc.file_name || fileNameAttribute?.file_name)?.slice(8);
}
//#endregion
//#region src/lib/hls/onHlsPlaylistFetch.ts
async function onHlsPlaylistFetch(event, params, search) {
	const deferred = deferredPromise();
	event.respondWith(deferred);
	try {
		const options = JSON.parse(decodeURIComponent(params));
		const accountNumber = await getClientAccount(await ctx$2.clients.get(event.clientId));
		const docId = options.location?.id;
		const altDocs = await serviceMessagePort.invoke("requestAltDocsByDoc", {
			docId,
			accountNumber
		});
		if (!altDocs) throw new Error("No alt docs found for document");
		const videoSource = createHlsVideoSource(altDocs);
		if (!videoSource) throw new Error("Failed to create video source for hls streaming");
		deferred.resolve(new Response(videoSource));
	} catch (e) {
		deferred.resolve(get500ErrorResponse());
		swLog.error(e);
	}
}
//#endregion
//#region src/lib/serviceWorker/backgrounds.ts
const backgroundsCache = new CacheStorageController("cachedBackgrounds");
/**
* Need the image element to fetch the background so the browser waits it, to avoid the background blinking when refreshing the page while the screen is locked
*/
function onBackgroundsFetch(event) {
	const url = event.request.url.match(/backgrounds.*/)[0];
	if (!url) {
		event.respondWith(get500ErrorResponse());
		return;
	}
	const deferred = deferredPromise();
	event.respondWith(deferred);
	(async () => {
		const blob = await backgroundsCache.getFile(url, "blob");
		deferred.resolve(new Response(blob, { status: 200 }));
	})();
}
logger("SW-mtproto-bug", LogTypes.None);
function watchMtprotoOnDev({ connectedWindows, onWindowConnected }) {}
//#endregion
//#region src/helpers/formatBytesPure.ts
function formatBytesPure(bytes, decimals = "auto") {
	if (bytes === 0) return `0 B`;
	const strictDecimals = decimals === "auto";
	const k = 1024;
	const sizes = [
		"B",
		"KB",
		"MB",
		"GB",
		"TB",
		"PB"
	];
	const i = Math.min(Math.floor(Math.log(bytes) / Math.log(k)), sizes.length - 1);
	const _decimals = decimals === "auto" ? Math.max(0, i - 1) : decimals;
	const dm = Math.max(0, _decimals);
	const fixed = (bytes / Math.pow(k, i)).toFixed(dm);
	return [sizes[i], strictDecimals ? fixed : parseFloat(fixed)].reverse().join(" ");
}
//#endregion
//#region src/helpers/schedulers/throttleWith.ts
function throttleWith(schedulerFn, fn, shouldRunFirst = false) {
	let isPending;
	let waiting;
	let args;
	const ret = (..._args) => {
		isPending = true;
		args = _args;
		if (waiting) return;
		if (shouldRunFirst) {
			isPending = false;
			fn(...args);
		}
		const _waiting = waiting = Math.random();
		schedulerFn(() => {
			if (waiting !== _waiting) return;
			ret.clear();
			if (!isPending) return;
			isPending = false;
			fn(...args);
		});
	};
	ret.clear = () => {
		waiting = void 0;
	};
	return ret;
}
//#endregion
//#region src/helpers/bytes/convertToUint8Array.ts
function convertToUint8Array(bytes) {
	if (bytes instanceof Uint8Array) return bytes;
	else if (typeof bytes === "string") return new TextEncoder().encode(bytes);
	return new Uint8Array(bytes);
}
//#endregion
//#region src/helpers/schedulers/asyncThrottle.ts
function asyncThrottle(callback, timeoutMs) {
	let lastArgs;
	let timeoutId;
	let wasCalledWhileRunning = false;
	function runAfterTimeout() {
		timeoutId = self.setTimeout(() => {
			wasCalledWhileRunning = false;
			callback(...lastArgs)?.then(() => {
				timeoutId = void 0;
				if (wasCalledWhileRunning) runAfterTimeout();
			});
		}, timeoutMs);
	}
	const result = (...args) => {
		lastArgs = args;
		wasCalledWhileRunning = true;
		if (timeoutId) return;
		runAfterTimeout();
	};
	result.clear = () => {
		self.clearTimeout(timeoutId);
		lastArgs = void 0;
		timeoutId = void 0;
		wasCalledWhileRunning = false;
	};
	return result;
}
//#endregion
//#region src/lib/mainWorker/mainMessagePort.ts
var MTProtoMessagePort = class MTProtoMessagePort extends superMessagePort_default {
	constructor(isMaster = true) {
		super("MTPROTO");
		MTProtoMessagePort.INSTANCE = this;
		if (isMaster) MTProtoMessagePort.MASTER_INSTANCE = this;
		else MTProtoMessagePort.NON_MASTER_INSTANCE = this;
		MOUNT_CLASS_TO && (MOUNT_CLASS_TO.mtprotoMessagePort = this);
	}
	static getInstance() {
		return this.INSTANCE;
	}
	static getMasterInstance() {
		return this.MASTER_INSTANCE;
	}
	static getNonMasterInstance() {
		return this.NON_MASTER_INSTANCE;
	}
};
//#endregion
//#region src/lib/encryptedStorageLayer.ts
var _EncryptedStorageLayer;
var EncryptedStorageLayer = class EncryptedStorageLayer {
	constructor(db, encryptedStoreName) {
		this.db = db;
		this.encryptedStoreName = encryptedStoreName;
		this.saveToIDB = async () => {
			await this.waitToLoad();
			const startTime = performance.now();
			const encryptedData = await EncryptedStorageLayer.encrypt(this.data);
			if (!encryptedData) {
				await this.storage.delete(EncryptedStorageLayer.STORAGE_KEY);
				return;
			}
			const encryptedDataSize = encryptedData.length;
			const encryptionTime = performance.now();
			await this.storage.save(EncryptedStorageLayer.STORAGE_KEY, encryptedData);
			const endTime = performance.now();
			if (DEBUG && IS_WORKER) {
				/**
				* The time it takes is very random, it might be because of the busy-ness of the crypto worker and the indexed DB
				*
				* Can be a log for 5.5 KB in 8ms, and then another for 40 KB in just 3ms
				* Or a whole MegaByte in just 20ms which is not proportional at all
				*/
				const f = (n) => n.toFixed(2);
				MTProtoMessagePort.getInstance().invokeVoid("log", `[${this.db.name}-${this.encryptedStoreName}] Encrypted and saved ${encryptedDataSize} bytes (${formatBytesPure(encryptedDataSize, 2)}) of data in ${f(endTime - startTime)}ms -- (encrypted in ${f(encryptionTime - startTime)}ms, saved in ${f(endTime - encryptionTime)}ms)`);
			}
		};
		this.saveToIDBThrottled = asyncThrottle(() => this.saveToIDB(), EncryptedStorageLayer.STORAGE_THROTTLE_TIME_MS);
		this.storage = new IDBStorage(db, encryptedStoreName);
		this.log = logger(`encrypted-storage-${encryptedStoreName}`);
	}
	static getInstance(db, encryptedStoreName) {
		const key = this.getStorageKey(db.name, encryptedStoreName);
		if (this.instances.has(key)) return this.instances.get(key);
		const instance = new EncryptedStorageLayer(db, encryptedStoreName);
		this.instances.set(key, instance);
		return instance;
	}
	static getStorageKey(dbName, storeName) {
		return `${dbName}**${storeName}`;
	}
	static async encrypt(data) {
		if (!Object.keys(data).length) return null;
		const key = await EncryptionKeyStore.get();
		const dataAsBuffer = convertToUint8Array(JSON.stringify(data));
		return await cryptoMessagePort.invokeCryptoNew({
			method: "aes-local-encrypt",
			args: [{
				key,
				data: dataAsBuffer
			}],
			transfer: [dataAsBuffer.buffer]
		});
	}
	static async decrypt(data) {
		const key = await EncryptionKeyStore.get();
		const result = await cryptoMessagePort.invokeCryptoNew({
			method: "aes-local-decrypt",
			args: [{
				key,
				encryptedData: data
			}],
			transfer: [data.buffer]
		});
		const decoded = new TextDecoder().decode(result);
		return JSON.parse(decoded);
	}
	loadEncrypted() {
		(async () => {
			this.loadingDataPromise = this.loadFromIDB();
			await this.loadingDataPromise;
			this.loadingDataPromise = void 0;
		})();
	}
	/**
	* Unlike `loadEncrypted`, will not re-read the store when the data is already in memory
	*/
	async ensureLoaded() {
		if (!this.data && !this.loadingDataPromise) this.loadEncrypted();
		await this.waitToLoad();
	}
	/**
	* Whether anything is written in the store: what is in memory is empty as well when that could not be read
	*/
	async hasStored() {
		const stored = await this.storage.get(EncryptedStorageLayer.STORAGE_KEY);
		return stored !== void 0 && stored !== null;
	}
	async loadDecrypted(data) {
		this.log("loading decrypted", Object.keys(data));
		this.data = data;
		await this.saveToIDB();
	}
	/**
	* Folds data that was left in the unencrypted store into this one. \
	* The already encrypted values win, they are the newer ones
	*/
	async mergeDecrypted(data) {
		await this.ensureLoaded();
		this.log("merging decrypted", Object.keys(data));
		this.data = {
			...data,
			...this.data
		};
		await this.saveToIDB();
	}
	waitToLoad() {
		if (this.loadingDataPromise) return this.loadingDataPromise;
	}
	async loadFromIDB() {
		try {
			const storageData = await this.storage.get(EncryptedStorageLayer.STORAGE_KEY);
			if (storageData === null || storageData === void 0) throw null;
			if (!(storageData instanceof Uint8Array)) throw new Error("Stored data in encrypted store is not a Uint8Array");
			const decrypted = await EncryptedStorageLayer.decrypt(storageData);
			this.data = decrypted;
		} catch (error) {
			if (error) this.log(error);
			this.data = {};
		}
		return this.data;
	}
	async reEncrypt() {
		await this.saveToIDB();
	}
	async save(entryName, value) {
		await this.waitToLoad();
		const names = toArray(entryName);
		const values = toArray(value);
		names.forEach((name, idx) => {
			this.data[name] = values[idx];
		});
		this.saveToIDBThrottled();
	}
	async get(entryNames) {
		await this.waitToLoad();
		return entryNames.map((entryName) => this.data[entryName]);
	}
	async getAllEntries() {
		await this.waitToLoad();
		return Object.entries(this.data);
	}
	async getAll() {
		await this.waitToLoad();
		return Object.values(this.data);
	}
	async getAllKeys() {
		await this.waitToLoad();
		return Object.keys(this.data);
	}
	async delete(entryName) {
		await this.waitToLoad();
		toArray(entryName).forEach((name) => {
			delete this.data[name];
		});
		this.saveToIDBThrottled();
	}
	async clear() {
		this.data = {};
		await this.storage.clear();
	}
};
_EncryptedStorageLayer = EncryptedStorageLayer;
_EncryptedStorageLayer.STORAGE_KEY = "data";
_EncryptedStorageLayer.STORAGE_THROTTLE_TIME_MS = 0;
_EncryptedStorageLayer.instances = /* @__PURE__ */ new Map();
//#endregion
//#region src/lib/storage.ts
var _AppStorage;
function noop() {}
var AppStorage = class AppStorage {
	constructor(db, storeName) {
		this.db = db;
		this.storeName = storeName;
		this._save = async () => {
			const deferred = this.saveDeferred;
			this.saveDeferred = deferredPromise();
			const set = this.keysToSet;
			if (set.size) {
				const keys = Array.from(set.values());
				set.clear();
				const values = keys.map((key) => this.cache[key]);
				try {
					(await this.getStorage()).save(keys, values);
				} catch (e) {
					this.log.error("set error", e, keys, values);
				}
			}
			deferred.resolve();
			if (set.size) this.saveThrottled();
		};
		this._delete = async () => {
			const deferred = this.deleteDeferred;
			this.deleteDeferred = deferredPromise();
			const set = this.keysToDelete;
			if (set.size) {
				const keys = Array.from(set.values());
				set.clear();
				try {
					(await this.getStorage()).delete(keys);
				} catch (e) {
					this.log.error("delete error", e, keys);
				}
			}
			deferred.resolve();
			if (set.size) this.deleteThrottled();
		};
		this._get = async () => {
			const keys = Array.from(this.getPromises.keys());
			(await this.getStorage()).get(keys).then((values) => {
				for (let i = 0, length = keys.length; i < length; ++i) {
					const key = keys[i];
					const deferred = this.getPromises.get(key);
					if (deferred) {
						deferred.resolve(this.cache[key] = values[i]);
						this.getPromises.delete(key);
					}
				}
			}, (error) => {
				if (!(/* @__PURE__ */ new Set(["NO_ENTRY_FOUND", "STORAGE_OFFLINE"])).has(error.type)) {
					this.useStorage = false;
					this.log.error("get error", error, keys, this.storeName);
				}
				for (let i = 0, length = keys.length; i < length; ++i) {
					const key = keys[i];
					const deferred = this.getPromises.get(key);
					if (deferred) {
						deferred.resolve(void 0);
						this.getPromises.delete(key);
					}
				}
			}).finally(() => {
				if (this.getPromises.size) this.getThrottled();
			});
		};
		this.log = logger(`AS-${db.name}-${storeName}`);
		this.cache = {};
		this.getPromises = /* @__PURE__ */ new Map();
		this.keysToSet = /* @__PURE__ */ new Set();
		this.saveDeferred = deferredPromise();
		this.keysToDelete = /* @__PURE__ */ new Set();
		this.deleteDeferred = deferredPromise();
		const store = db.stores.find((store) => store.name === storeName);
		this.isEncryptable = !!store?.encryptedName;
		this.encryptedStoreName = store?.encryptedName;
		if (AppStorage.STORAGES.length) this.useStorage = AppStorage.STORAGES[0].useStorage;
		else this.useStorage = true;
		this.savingFreezed = false;
		AppStorage.STORAGES.push(this);
		this.saveThrottled = throttleWith(queueMicrotask, this._save, false);
		this.deleteThrottled = throttleWith(queueMicrotask, this._delete, false);
		this.getThrottled = throttleWith(queueMicrotask, this._get, false);
	}
	getPlainStorage() {
		return new IDBStorage(this.db, this.storeName);
	}
	getEncryptedStorage() {
		return EncryptedStorageLayer.getInstance(this.db, this.encryptedStoreName);
	}
	getStorage() {
		if (this.storage) return Promise.resolve(this.storage);
		return this.storagePromise ?? (this.storagePromise = this.createStorage().then((storage) => this.storage ?? (this.storage = storage)).finally(() => this.storagePromise = void 0));
	}
	async createStorage() {
		if (!(this.isEncryptable ? await DeferredIsUsingPasscode.isUsingPasscode() : false)) return this.getPlainStorage();
		const storage = this.getEncryptedStorage();
		await storage.ensureLoaded();
		await this.encryptLeftovers(storage);
		return storage;
	}
	/**
	* A store that was never opened while the passcode was being enabled had nothing to migrate back then
	* (see `toggleEncrypted`), so its data was left lying in the unencrypted store - fold it in on the first open
	*/
	async encryptLeftovers(encryptedStorage) {
		const plainStorage = this.getPlainStorage();
		try {
			const entries = await plainStorage.getAllEntries();
			if (!entries.length) return;
			this.log.warn("found unencrypted entries, encrypting them", entries.length);
			await encryptedStorage.mergeDecrypted(Object.fromEntries(entries));
			await plainStorage.clear();
		} catch (err) {
			this.log.error("encrypt leftovers error", err);
		}
	}
	isAvailable() {
		return this.useStorage;
	}
	getCache() {
		return this.cache;
	}
	getFromCache(key) {
		return this.cache[key];
	}
	setToCache(key, value) {
		return this.cache[key] = value;
	}
	async get(key, useCache = true) {
		if (this.cache.hasOwnProperty(key) && useCache) return this.getFromCache(key);
		else if (this.useStorage) {
			const r = this.getPromises.get(key);
			if (r) return r;
			const p = deferredPromise();
			this.getPromises.set(key, p);
			this.getThrottled();
			return p;
		}
	}
	async getAll() {
		return (await this.getStorage()).getAll().catch(() => []);
	}
	async getAllKeys() {
		return (await this.getStorage()).getAllKeys().catch(() => []);
	}
	async getAllEntries() {
		return (await this.getStorage()).getAllEntries().catch(() => []);
	}
	warnAboutSaving() {}
	set(obj, onlyLocal = false) {
		const canUseStorage = this.useStorage && !onlyLocal && !this.savingFreezed;
		this.warnAboutSaving();
		let setSomething = false;
		for (const key in obj) if (obj.hasOwnProperty(key)) {
			const value = obj[key];
			this.setToCache(key, value);
			if (canUseStorage) {
				this.keysToSet.add(key);
				this.keysToDelete.delete(key);
				this.saveThrottled();
			}
			setSomething = true;
		}
		return canUseStorage && setSomething ? this.saveDeferred : Promise.resolve();
	}
	delete(key, saveLocal = false) {
		this.warnAboutSaving();
		key = "" + key;
		if (!saveLocal) delete this.cache[key];
		if (this.useStorage) {
			this.keysToSet.delete(key);
			this.keysToDelete.add(key);
			this.deleteThrottled();
		}
		return this.useStorage ? this.deleteDeferred : Promise.resolve();
	}
	async clear(saveLocal = false) {
		if (!saveLocal) for (const i in this.cache) delete this.cache[i];
		try {
			await Promise.all([this.getPlainStorage().clear(), this.isEncryptable && this.getEncryptedStorage().clear()]);
		} catch {}
	}
	async unfreezeAsync(callback) {
		const prevFreezed = this.savingFreezed;
		this.savingFreezed = false;
		try {
			await callback();
		} catch (err) {
			console.error("unfreezeAsync callback error:", err);
		}
		this.savingFreezed = prevFreezed;
	}
	static toggleStorage(enabled, clearWrite) {
		return Promise.all(this.STORAGES.map((storage) => {
			storage.useStorage = enabled;
			if (!IS_WORKER || !clearWrite) return;
			if (!enabled) {
				storage.keysToSet.clear();
				storage.keysToDelete.clear();
				storage.getPromises.forEach((deferred) => deferred.resolve(void 0));
				storage.getPromises.clear();
			} else return storage.set(storage.cache);
		})).catch(noop);
	}
	static freezeSaving(callback, names) {
		this.STORAGES.forEach((storage) => storage.savingFreezed = true);
		try {
			callback();
		} catch (err) {
			console.error("freezeSaving callback error:", err);
		}
		this.STORAGES.forEach((storage) => storage.savingFreezed = false);
	}
	static async freezeSavingAsync(callback) {
		this.STORAGES.forEach((storage) => storage.savingFreezed = true);
		try {
			await callback();
		} catch (err) {
			console.error("freezeSavingAsync callback error:", err);
		}
		this.STORAGES.forEach((storage) => storage.savingFreezed = false);
	}
	/**
	* The direction is taken from the argument, never from `this.storage`: the store might not have been
	* opened yet, and by the time this runs `getStorage` would already answer with the layer the new flag
	* dictates, so the data would be read from the empty destination and left in the source
	*/
	async toggleEncrypted(shouldEncrypt) {
		if (!this.isEncryptable) return;
		const encryptedStorage = this.getEncryptedStorage();
		const plainStorage = this.getPlainStorage();
		if (shouldEncrypt) {
			const entries = await plainStorage.getAllEntries().catch((err) => {
				this.log.error("toggle encrypted read error", err);
			});
			await encryptedStorage.mergeDecrypted(Object.fromEntries(entries || []));
			if (entries) await plainStorage.clear();
			this.storage = encryptedStorage;
		} else {
			await encryptedStorage.ensureLoaded();
			const entries = await encryptedStorage.getAllEntries();
			if (entries.length) await plainStorage.save(entries.map((entry) => entry[0]), entries.map((entry) => entry[1]));
			await encryptedStorage.clear();
			this.storage = plainStorage;
		}
		this.storagePromise = void 0;
	}
	/**
	* Has to be awaited BEFORE the encryption key is replaced, otherwise a store nobody has opened yet
	* would stay encrypted with the old key and become unreadable
	*/
	async loadEncrypted() {
		if (!this.isEncryptable) return;
		if (!await DeferredIsUsingPasscode.isUsingPasscode()) return;
		await this.getStorage();
	}
	async reEncrypt() {
		if (!(this.storage instanceof EncryptedStorageLayer)) return;
		await this.storage.reEncrypt();
	}
	static async toggleEncryptedForAll(shouldEncrypt) {
		await this.freezeSavingAsync(async () => {
			await Promise.all(this.STORAGES.map((storage) => storage.toggleEncrypted(shouldEncrypt)));
		});
	}
	static async loadEncryptedForAll() {
		await Promise.all(this.STORAGES.map((storage) => storage.loadEncrypted().catch((err) => {
			storage.log.error("load encrypted error", err);
		})));
	}
	static async reEncryptEncrypted() {
		await this.freezeSavingAsync(async () => {
			await Promise.all(this.STORAGES.map((storage) => storage.reEncrypt()));
		});
	}
};
_AppStorage = AppStorage;
_AppStorage.STORAGES = [];
MOUNT_CLASS_TO && (MOUNT_CLASS_TO.AppStorage = AppStorage);
//#endregion
//#region src/lib/commonStateStorage.ts
var CommonStateStorage = class extends AppStorage {
	constructor() {
		super(getCommonDatabaseState(), "session");
	}
};
const commonStateStorage = new CommonStateStorage();
commonStateStorage.get("settings", false).then((settings) => {
	DeferredIsUsingPasscode.resolveDeferred(settings?.passcode?.enabled || false);
});
MOUNT_CLASS_TO.commonStateStorage = commonStateStorage;
//#endregion
//#region src/lib/serviceWorker/clearOldCache.ts
const log$1 = logger("SW-clear-old-cache");
async function clearOldCacheInWatchedStorages({ onStorageError }) {
	const settings = await commonStateStorage.get("settings");
	const cacheTTLSeconds = settings?.cacheTTL;
	if (typeof cacheTTLSeconds !== "number" || !cacheTTLSeconds) return;
	const referenceTimeSeconds = Math.floor(Date.now() / 1e3 - cacheTTLSeconds);
	log$1({
		referenceTimeSeconds,
		cacheTTLSeconds
	});
	const collectedResponses = [];
	let totalSize = 0;
	for (const storageName of watchedCachedStorageNames) {
		const cacheStorage = new CacheStorageController(storageName);
		log$1(`iterating ${storageName}`);
		let caughtError;
		const collectedForThisStorage = [];
		try {
			await cacheStorage.minimalBlockingIterateResponses(async ({ request, cache, response }) => {
				const cachedTimeSeconds = parseInt(response.headers.get(HTTPHeaderNames.cachedTime)) || 0;
				if (cachedTimeSeconds < referenceTimeSeconds) {
					log$1(`deleteing cache from ${storageName}:`, request.url, {
						cachedTimeSeconds,
						referenceTimeSeconds
					});
					await cache.delete(request);
				} else {
					const contentLength = parseInt(response.headers.get(HTTPHeaderNames.contentLength)) || 0;
					totalSize += contentLength;
					collectedForThisStorage.push({
						request,
						response,
						timeSeconds: cachedTimeSeconds,
						size: contentLength,
						storageName
					});
				}
			});
			collectedResponses.push(...collectedForThisStorage);
		} catch (error) {
			caughtError = error;
		} finally {
			cacheStorage.forget();
		}
		if (caughtError) await onStorageError({
			storageName,
			error: caughtError
		});
	}
	const cacheMaxSize = settings?.cacheSize;
	if (!cacheMaxSize) return;
	log$1(`Total size before deletion: ${formatBytesPure(totalSize)}, Max size: ${formatBytesPure(cacheMaxSize)}`);
	collectedResponses.sort((a, b) => a.timeSeconds - b.timeSeconds);
	const toBeDeleted = /* @__PURE__ */ new Map([
		["cachedFiles", []],
		["cachedStreamChunks", []],
		["cachedHlsStreamChunks", []],
		["cachedHlsQualityFiles", []]
	]);
	for (const collectedResponse of collectedResponses) {
		const { size, storageName } = collectedResponse;
		if (totalSize <= cacheMaxSize) break;
		totalSize -= size;
		toBeDeleted.get(storageName)?.push(collectedResponse);
	}
	const entries = Array.from(toBeDeleted.entries());
	const prettyLog = (collectedResponses) => collectedResponses.map(({ request, size, timeSeconds }) => ({
		url: request.url,
		size: formatBytesPure(size),
		time: /* @__PURE__ */ new Date(timeSeconds * 1e3)
	}));
	await Promise.all(entries.map(async ([storageName, collectedResponses]) => {
		if (!collectedResponses.length) return;
		log$1(`Deleting ${collectedResponses.length} entries from ${storageName}`, prettyLog(collectedResponses));
		const cacheStorage = new CacheStorageController(storageName);
		try {
			await cacheStorage.timeoutOperation(async (cache) => {
				await Promise.all(collectedResponses.map(({ request }) => cache.delete(request)));
			});
		} finally {
			cacheStorage.forget();
		}
	}));
}
const seconds = 1e3;
const minutes = 60 * seconds;
const warmUpWaitTime = 20 * seconds;
const intervalTime = 10 * minutes;
async function watchCacheStoragesLifetime(args) {
	await pause(warmUpWaitTime);
	const tick = async () => {
		await clearOldCacheInWatchedStorages(args);
		setTimeout(tick, intervalTime);
	};
	tick();
}
//#endregion
//#region src/lib/serviceWorker/index.service.ts
const log = logger("SW", LogTypes.Error | LogTypes.Debug | LogTypes.Log | LogTypes.Warn, true);
const ctx = self;
let _mtprotoMessagePort;
const getMtprotoMessagePort = () => _mtprotoMessagePort;
let _cryptoMessagePort;
const invokeVoidAll = (...args) => {
	getWindowClients().then((windowClients) => {
		windowClients.forEach((windowClient) => {
			serviceMessagePort.invokeVoid(...args, windowClient);
		});
	});
};
log("init");
const sendMessagePort = (source) => {
	const channel = new MessageChannel();
	serviceMessagePort.attachPort(_mtprotoMessagePort = channel.port1);
	serviceMessagePort.invokeVoid("port", void 0, source, [channel.port2]);
	const channel2 = new MessageChannel();
	cryptoMessagePort.attachPort(_cryptoMessagePort = channel2.port1);
	serviceMessagePort.invokeVoid("serviceCryptoPort", void 0, source, [channel2.port2]);
};
const sendMessagePortIfNeeded = (source) => {
	if (!connectedWindows.size && !_mtprotoMessagePort) {
		log("sending message port for mtproto");
		sendMessagePort(source);
	}
};
const onWindowConnected = (source, from) => {
	const _log = log.bindPrefix("windowConnected");
	_log("new", source.id, "from", from, "before", connectedWindows.size);
	if (source.frameType === "none") {
		log.warn("maybe a bugged Safari starting window", source.id);
		return;
	}
	if (connectedWindows.has(source.id)) {
		_log("already connected", source.id);
		return;
	}
	_log("before", Array.from(connectedWindows));
	serviceMessagePort.invokeVoid("hello", void 0, source);
	sendMessagePortIfNeeded(source);
	connectedWindows.set(source.id, source);
	_log("after", Array.from(connectedWindows));
	checkWindowClientForDeferredShare(source);
};
const serviceMessagePort = new ServiceMessagePort();
serviceMessagePort.addMultipleEventsListeners({
	environment: (environment) => {
		setEnvironment(environment);
	},
	getLogs: () => getLogEntries(),
	setLogBufferEnabled: (enabled) => setLogBufferEnabled(enabled),
	clearLogs: () => clearLogBuffer(),
	notificationsClear: closeAllNotifications,
	toggleStorages: ({ enabled, clearWrite }) => {
		CacheStorageController.toggleStorage(enabled, clearWrite);
	},
	pushPing: (payload, source) => {
		onPing(payload, source);
	},
	hello: (payload, source) => {
		onWindowConnected(source, "hello");
	},
	shownNotification: onShownNotification,
	leaveRtmpCall: onRtmpLeftCall,
	toggleStreamInUse,
	tabAccount: (accountNumber, source) => {
		setClientAccount(source.id, accountNumber);
	},
	toggleCacheStorage: (enabled) => {
		CacheStorageController.temporarilyToggle(enabled);
	},
	resetEncryptableCacheStorages: () => {
		CacheStorageController.resetOpenEncryptableCacheStorages();
	},
	toggleUsingPasscode: (payload) => {
		DeferredIsUsingPasscode.resolveDeferred(payload.isUsingPasscode);
		if (payload.type === "full") EncryptionKeyStore.save(payload.encryptionKey);
	},
	saveEncryptionKey: (payload) => {
		EncryptionKeyStore.save(payload);
	},
	fillPushObject,
	disableCacheStoragesByNames: (names) => {
		CacheStorageController.temporarilyToggleByNames(names, false);
	},
	enableCacheStoragesByNames: (names) => {
		CacheStorageController.temporarilyToggleByNames(names, true);
	},
	resetOpenCacheStoragesByNames: (names) => {
		CacheStorageController.resetOpenStoragesByNames(names);
	}
});
const { onDownloadFetch, onClosedWindows: onDownloadClosedWindows } = handleDownload(serviceMessagePort);
const helloAwaiting = /* @__PURE__ */ new Set();
let checkingWindows;
async function helloWindows(from) {
	const windowClients = await getWindowClients();
	const length = windowClients.length;
	log(`got ${length} windows from`, from);
	windowClients.forEach((windowClient) => {
		if (windowClient.frameType === "none") {
			log.warn("skipping bugged Safari starting window", windowClient.id);
			return;
		}
		if (helloAwaiting.has(windowClient.id)) return;
		log("checking window", windowClient.id);
		helloAwaiting.add(windowClient.id);
		serviceMessagePort.invoke("hello", void 0, void 0, windowClient).then(() => {
			onWindowConnected(windowClient, from);
		}, (err) => {
			log.error("failed to send hello to window", windowClient.id, err);
		}).finally(() => {
			helloAwaiting.delete(windowClient.id);
		});
	});
}
const checkWindows = (from) => checkingWindows ?? (checkingWindows = helloWindows(from).finally(() => {
	checkingWindows = void 0;
}));
checkWindows("startup check");
const connectedWindows = /* @__PURE__ */ new Map();
self.connectedWindows = connectedWindows;
listenMessagePort(serviceMessagePort, void 0, (source) => {
	log("something has disconnected", source);
	if (!(source instanceof WindowClient) || !connectedWindows.has(source.id)) {
		log.warn("it is not a window");
		return;
	}
	connectedWindows.delete(source.id);
	deleteClientAccount(source.id);
	log("window disconnected, left", connectedWindows.size);
	if (!connectedWindows.size) {
		log.warn("no windows left");
		if (DeferredIsUsingPasscode.isUsingPasscodeUndeferred()) resetPushAccounts();
		EncryptionKeyStore.resetDeferred();
		DeferredIsUsingPasscode.resetDeferred();
		if (_mtprotoMessagePort) {
			serviceMessagePort.detachPort(_mtprotoMessagePort);
			_mtprotoMessagePort = void 0;
		}
		if (_cryptoMessagePort) {
			cryptoMessagePort.detachPort(_cryptoMessagePort);
			_cryptoMessagePort = void 0;
		}
		onDownloadClosedWindows();
	}
});
watchCacheStoragesLifetime({ onStorageError: async ({ storageName, error }) => {
	log(`Error clearing old cache in ${storageName}:`, error);
	log(`Clearing cache storage ${storageName}`);
	const windowClients = await getWindowClients();
	if (!windowClients.length) return;
	await serviceMessagePort.invoke("clearCacheStoragesByNames", [storageName], void 0, windowClients[0]);
} });
watchMtprotoOnDev({
	connectedWindows,
	onWindowConnected
});
const onFetch = (event) => {
	if (!IS_SAFARI && event.request.url.indexOf(location.origin + "/") === 0 && event.request.url.match(/\.(js|css|jpe?g|json|wasm|png|mp3|svg|tgs|ico|woff2?|ttf|mesh)(?:\?.*)?$/)) return event.respondWith(requestCache(event));
	if (!_mtprotoMessagePort) checkWindows("fetch");
	try {
		const [scope, _params] = event.request.url.split("/").slice(-2);
		const [params, search] = _params.split("?");
		switch (scope) {
			case "stream":
				onStreamFetch(event, params, search);
				break;
			case "d":
			case "download":
				onDownloadFetch(event, params);
				break;
			case "share":
				onShareFetch(event, params);
				break;
			case "ping":
				event.respondWith(new Response("pong"));
				break;
			case "rtmp":
				onRtmpFetch(event, params, search);
				break;
			case "hls":
				onHlsPlaylistFetch(event, params, search);
				break;
			case "hls_quality_file":
				onHlsQualityFileFetch(event, params, search);
				break;
			case "hls_stream":
				onHlsStreamFetch(event, params, search);
				break;
			case "backgrounds": onBackgroundsFetch(event);
		}
	} catch (err) {
		log.error("fetch error", err);
		event.respondWith(get500ErrorResponse());
	}
};
const onChangeState = () => {
	ctx.onfetch = onFetch;
};
ctx.addEventListener("install", (event) => {
	log("installing");
	event.waitUntil(ctx.skipWaiting().then(() => log("skipped waiting")));
});
ctx.addEventListener("activate", (event) => {
	log("activating", ctx);
	event.waitUntil(ctx.caches.delete(CACHE_ASSETS_NAME).then(() => log("cleared assets cache")));
	event.waitUntil(ctx.clients.claim().then(() => log("claimed clients")));
});
ctx.onoffline = ctx.ononline = onChangeState;
onChangeState();
//#endregion
