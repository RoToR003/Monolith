//# allFunctionsCalledOnLoad
//#region src/components/wallet/visual/gem/pull.ts
/** a tap: shorter than this, seconds, and moving less than this, px (iOS: 0.25 s, 10 pt) */
var TAP_TIME = .25;
var TAP_TRAVEL = 10;
/** the release's speed is the finger's over this long, seconds */
var SPEED_WINDOW = .08;
var GemPull = class {
	constructor(e, now) {
		this.pointerId = e.pointerId;
		this.start = [e.clientX, e.clientY];
		this.last = [e.clientX, e.clientY];
		this.startTime = now;
		this.samples = [[now, e.clientX]];
	}
	/** How far the finger went since its last move, px. */
	move(e, now) {
		const delta = [e.clientX - this.last[0], e.clientY - this.last[1]];
		this.last = [e.clientX, e.clientY];
		this.samples.push([now, e.clientX]);
		while (this.samples.length > 2 && now - this.samples[0][0] > SPEED_WINDOW) this.samples.shift();
		return delta;
	}
	/** The finger's speed along x as it lets go, px/s. */
	velocity(e, now) {
		const first = this.samples[0];
		return first && now - first[0] > .005 ? (e.clientX - first[1]) / (now - first[0]) : 0;
	}
	isTap(e, now) {
		return e.type !== "pointercancel" && now - this.startTime < TAP_TIME && Math.hypot(e.clientX - this.start[0], e.clientY - this.start[1]) < TAP_TRAVEL;
	}
};
//#endregion
export { GemPull as t };
