//# allFunctionsCalledOnLoad
import { t as _defineProperty } from "./defineProperty-_J0dqq22.js";
import { t as _virtual_sandbox_bundle_default } from "./_virtual_sandbox-bundle-Cx0JRIXr.js";
import { a as SAB_SIZE, n as LIMIT_DEFAULTS } from "./protocol-C2byfLMO.js";
//#region src/vendor/widget-sandbox/src/host/worker-pool.ts
var WorkerPool = class {
	constructor(size, opts = {}) {
		_defineProperty(this, "size", void 0);
		_defineProperty(this, "opts", void 0);
		_defineProperty(this, "idle", []);
		_defineProperty(this, "destroyed", false);
		_defineProperty(
			this,
			/** Counters for the demo / bench. */
			"stats",
			{
				created: 0,
				hits: 0,
				misses: 0
			}
		);
		this.size = size;
		this.opts = opts;
	}
	/** Fill the pool and wait until every worker is warm (app start). */
	async prewarm() {
		this.refill();
		await Promise.all(this.idle.map((e) => e.warmed.catch(() => 0)));
	}
	/** A warmed worker (or a fresh one when the pool is empty: it still boots, just later than it could have). */
	take() {
		let e = this.idle.shift();
		if (e) this.stats.hits++;
		else {
			this.stats.misses++;
			e = this.create();
		}
		queueMicrotask(() => this.refill());
		return e;
	}
	/** Top the pool up to `size` (no-op while `canRefill` says no). */
	refill() {
		if (this.destroyed) return;
		while (this.idle.length < this.size && (this.opts.canRefill?.() ?? true)) this.idle.push(this.create());
	}
	get warm() {
		return this.idle.length;
	}
	destroy() {
		this.destroyed = true;
		for (const e of this.idle.splice(0)) e.worker.terminate();
	}
	create() {
		this.stats.created++;
		const worker = new Worker(new URL(
			/* @vite-ignore */
			"/Monolith/worker-Bd-7oOvN.js",
			"" + import.meta.url
		), { type: "module" });
		const sab = new SharedArrayBuffer(SAB_SIZE);
		const config = {
			...LIMIT_DEFAULTS,
			...this.opts.limits,
			visible: true,
			viewport: {
				innerWidth: 400,
				innerHeight: 300,
				dpr: 1
			},
			theme: "light"
		};
		const pending = [];
		const warmed = new Promise((resolve, reject) => {
			worker.onmessage = (ev) => {
				pending.push(ev.data);
				if (ev.data.type === "warmed") resolve(ev.data.bootMs);
				else if (ev.data.type === "dead") reject(new Error(ev.data.reason));
			};
			worker.onerror = (ev) => reject(new Error(ev.message));
		});
		worker.postMessage({
			type: "warm",
			sab,
			config,
			sandboxBundle: _virtual_sandbox_bundle_default
		});
		return {
			worker,
			sab,
			warmed,
			pending
		};
	}
};
//#endregion
export { WorkerPool };
