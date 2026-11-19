//# allFunctionsCalledOnLoad
import { n as suspendKind } from "./widgetBlock-YX1yzMWT.js";
import { t as _virtual_sandbox_bundle_default } from "./_virtual_sandbox-bundle-Cx0JRIXr.js";
//#region src/vendor/widget-sandbox/src/host/engine-client.ts
/** Live widgets an engine takes before a second one starts. */
var WIDGETS_PER_ENGINE = 4;
/** Engines at most: a second one for the asyncify build (no JSPI) where there are cores for it besides the page's. */
var maxEngines = () => options.engines !== "auto" ? Math.max(1, options.engines) : suspendKind(options.suspend) === "asyncify" && (navigator.hardwareConcurrency || 0) >= 4 ? 2 : 1;
/** An engine that runs no widget stops after this long; the last one after IDLE_LAST_MS. */
var IDLE_EXTRA_MS = 3e4;
var IDLE_LAST_MS = 3e5;
/** A reservation no host takes up is dropped after this long. */
var RESERVATION_MS = 15e3;
/** A second engine waits this long for the first one's snapshot, then warms its own. */
var SHARE_TIMEOUT_MS = 5e3;
/** The engines that take widgets (a retired one is only in its channels' hands). */
var engines = [];
var nextId = 0;
var options = {
	suspend: "auto",
	engines: "auto"
};
/** Changes how engines start; the running ones take no new widget and stop when their last one is gone. */
function setEngineOptions(next) {
	const changed = {
		...options,
		...next
	};
	if (changed.suspend === options.suspend && changed.engines === options.engines) return;
	options = changed;
	for (const engine of engines.splice(0)) {
		engine.retired = true;
		checkIdle(engine);
	}
}
function listEngines() {
	return engines.filter((engine) => engine.info).map((engine) => ({
		...engine.info,
		widgets: engine.channels.size
	}));
}
function load(engine) {
	return engine.channels.size + engine.reserved;
}
function startEngine(from) {
	const worker = new Worker(new URL(
		/* @vite-ignore */
		"/Monolith/engine-worker-C7hAjF8I.js",
		"" + import.meta.url
	), { type: "module" });
	const channels = /* @__PURE__ */ new Map();
	let settle;
	const ready = new Promise((resolve, reject) => {
		settle = {
			resolve,
			reject
		};
	});
	ready.catch(() => {});
	let markGone;
	const gone = new Promise((_, reject) => {
		markGone = reject;
	});
	gone.catch(() => {});
	const engine = {
		worker,
		ready,
		gone,
		channels,
		reserved: 0,
		idleTimer: 0,
		retired: false,
		stop: (reason) => stop(reason)
	};
	const stop = (reason) => {
		const index = engines.indexOf(engine);
		if (index !== -1) engines.splice(index, 1);
		if (engine.idleTimer) clearTimeout(engine.idleTimer);
		worker.terminate();
		markGone(new Error(reason));
	};
	const lose = (reason) => {
		stop(reason);
		settle.reject(new Error(reason));
		for (const deliver of channels.values()) deliver({
			type: "lost",
			reason
		});
		channels.clear();
	};
	worker.onmessage = (e) => {
		const msg = e.data;
		if (msg.type === "ready") {
			engine.info = {
				kind: msg.kind,
				bootMs: msg.bootMs
			};
			settle.resolve();
		} else if (msg.type === "failed") lose("the engine failed to start: " + msg.error);
		else if (msg.type !== "shared") channels.get(msg.id)?.(msg);
	};
	worker.onerror = (e) => lose("the engine worker failed: " + (e.message || "error"));
	const suspend = options.suspend;
	const boot = (shared) => worker.postMessage({
		type: "boot",
		sandboxBundle: _virtual_sandbox_bundle_default,
		timeOrigin: performance.timeOrigin,
		shared,
		suspend
	});
	if (from) {
		let onShared;
		let timer;
		let settled = false;
		let shared;
		Promise.race([
			from.ready.then(() => new Promise((resolve) => {
				if (settled) return resolve();
				onShared = (e) => {
					if (e.data.type !== "shared") return;
					shared = e.data;
					resolve();
				};
				from.worker.addEventListener("message", onShared);
				from.worker.postMessage({ type: "share" });
			})),
			from.gone,
			new Promise((_, reject) => {
				timer = setTimeout(() => reject(/* @__PURE__ */ new Error("timeout")), SHARE_TIMEOUT_MS);
			})
		]).finally(() => {
			settled = true;
			clearTimeout(timer);
			if (onShared) from.worker.removeEventListener("message", onShared);
		}).then(() => {
			const handed = shared;
			shared = void 0;
			boot(handed);
		}, () => {
			shared = void 0;
			boot();
		});
	} else boot();
	engines.push(engine);
	return engine;
}
/** Stops `engine` once it has run nothing for a while (sooner if another engine is left). */
function checkIdle(engine) {
	if (engine.idleTimer) clearTimeout(engine.idleTimer);
	engine.idleTimer = 0;
	if (load(engine)) return;
	if (engine.retired) return engine.stop("retired");
	const stopIfIdle = (waited) => {
		engine.idleTimer = 0;
		if (load(engine) || !engines.includes(engine)) return;
		if (engines.length === 1 && waited < IDLE_LAST_MS) {
			engine.idleTimer = setTimeout(() => stopIfIdle(IDLE_LAST_MS), IDLE_LAST_MS - waited);
			return;
		}
		engine.stop("idle");
	};
	const wait = engines.length > 1 ? IDLE_EXTRA_MS : IDLE_LAST_MS;
	engine.idleTimer = setTimeout(() => stopIfIdle(wait), wait);
}
/** The engine for the next widget: the least busy one, a new one past WIDGETS_PER_ENGINE each (up to maxEngines). */
function pickEngine() {
	let best = engines[0];
	for (const engine of engines) if (load(engine) < load(best)) best = engine;
	if (!best) return startEngine();
	if (load(best) >= WIDGETS_PER_ENGINE && engines.length < maxEngines()) return startEngine(engines[0]);
	return best;
}
/** Starts the engine worker a widget will run in and resolves when it can (`openEngineChannel` with the slot). */
function reserveEngine() {
	const engine = pickEngine();
	++engine.reserved;
	checkIdle(engine);
	let taken = false;
	const release = () => {
		if (taken) return;
		taken = true;
		--engine.reserved;
		checkIdle(engine);
	};
	const timer = setTimeout(release, RESERVATION_MS);
	const slot = {
		engine,
		take: () => {
			clearTimeout(timer);
			release();
		}
	};
	return engine.ready.then(() => slot, (e) => {
		slot.take();
		throw e;
	});
}
/** A channel to an engine for one widget (the reserved one, if any); `onMessage` also gets `lost` when the worker is gone. */
function openEngineChannel(onMessage, slot) {
	const reserved = slot;
	const engine = reserved && engines.includes(reserved.engine) ? reserved.engine : pickEngine();
	reserved?.take();
	const id = ++nextId;
	engine.channels.set(id, onMessage);
	checkIdle(engine);
	let open = true;
	let booting = engine.info ? void 0 : engine.ready.catch(() => {});
	let dropped = false;
	const post = (msg, transfer) => {
		if (booting) booting = booting.then(() => {
			if (!dropped) engine.worker.postMessage(msg, transfer ?? []);
		});
		else engine.worker.postMessage(msg, transfer ?? []);
	};
	return {
		send(msg, transfer) {
			if (open) post({
				...msg,
				id
			}, transfer);
		},
		close() {
			if (!open) return;
			open = false;
			if (!engine.channels.delete(id)) return;
			if (!engine.info) dropped = true;
			else post({
				type: "input",
				id,
				msg: { type: "stop" }
			});
			checkIdle(engine);
		}
	};
}
//#endregion
export { listEngines, openEngineChannel, reserveEngine, setEngineOptions };
