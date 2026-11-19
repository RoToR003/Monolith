//# allFunctionsCalledOnLoad
//#region src/components/wallet/visual/clock.ts
var WalletClock = class {
	constructor() {
		this.manual = false;
		this.t = 0;
		this.timers = [];
	}
	/** Seconds. */
	now() {
		return this.manual ? this.t : performance.now() / 1e3;
	}
	/** Run `fn` after `seconds` — in the first frame past the due time. Returns a cancel function. */
	after(seconds, fn) {
		const timer = {
			at: this.now() + seconds,
			fn,
			cancelled: false
		};
		this.timers.push(timer);
		return () => {
			timer.cancelled = true;
			const index = this.timers.indexOf(timer);
			if (index !== -1) this.timers.splice(index, 1);
		};
	}
	/** Fire the due ones — in order of their due time. */
	run(now) {
		if (!this.timers.length) return;
		const due = this.timers.filter((t) => t.at <= now).sort((a, b) => a.at - b.at);
		if (!due.length) return;
		this.timers = this.timers.filter((t) => t.at > now);
		for (const t of due) if (!t.cancelled) t.fn();
	}
};
var clock = new WalletClock();
//#endregion
export { clock as t };
