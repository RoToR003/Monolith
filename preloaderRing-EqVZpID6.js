//# allFunctionsCalledOnLoad
import { g as createEffect, j as on, x as createRoot } from "./solid-9Vxm0VIz.js";
import { i as onAppWindowChange, n as getAppWindow } from "./appWindow-bo-KtJhy.js";
import { t as clamp } from "./clamp-9UaNhw6N.js";
import { t as liteMode } from "./liteMode-DeLStZfQ.js";
import { t as animate } from "./animation-Dd3Xpw_9.js";
import { t as defaultEasing } from "./easings-DXRWZVIJ.js";
//#region src/helpers/dom/htmlToDocumentFragment.ts
function htmlToDocumentFragment(html) {
	if (html instanceof DocumentFragment) return html;
	const template = document.createElement("template");
	html = html.trim();
	template.innerHTML = html;
	return template.content;
}
//#endregion
//#region src/helpers/dom/createAppWindowIntersectionObserver.ts
/**
* An IntersectionObserver of the viewport that follows the app: the viewport an observer looks at is
* the one of the realm that made it, and the whole app moves into a Document PiP window and back
* (`@helpers/appWindow`), so on every move it is made anew there and given everything observed.
* Made at the first `observe`; where there is no IntersectionObserver (jsdom) nothing is observed.
*/
function createAppWindowIntersectionObserver(callback) {
	const observed = /* @__PURE__ */ new Set();
	let observer, stopFollowing;
	const create = () => {
		const IO = getAppWindow().IntersectionObserver;
		observer = new IO(callback);
	};
	return {
		observe(element) {
			if (typeof IntersectionObserver === "undefined") return;
			if (!observer) {
				create();
				stopFollowing = onAppWindowChange(() => {
					observer.disconnect();
					create();
					observed.forEach((element) => observer.observe(element));
				});
			}
			observed.add(element);
			observer.observe(element);
		},
		unobserve(element) {
			observed.delete(element);
			observer?.unobserve(element);
		},
		disconnect() {
			observed.clear();
			observer?.disconnect();
			stopFollowing?.();
			observer = stopFollowing = void 0;
		}
	};
}
//#endregion
//#region src/components/preloaderRing.ts
var _PreloaderRing;
var N = 12;
var R = 19;
var CIRCUMFERENCE = 2 * Math.PI * R;
var DEG = Math.PI / 180;
var round = (x) => Math.round(x * 100) / 100;
var clamp01 = (x) => clamp(x, 0, 1);
var smooth = (x) => x * x * (3 - 2 * x);
var ringPoint = (a) => [round(27 + R * Math.cos(a)), round(27 + R * Math.sin(a))];
var easeInOut = (x) => defaultEasing(clamp01(x));
var TIP = [27, 30.96];
var SHAFT_TOP = 19.08;
var ARM_ENDS = [[21.85, 25.81], [32.15, 25.81]];
var ARM_LENGTH = Math.hypot(TIP[0] - ARM_ENDS[0][0], TIP[1] - ARM_ENDS[0][1]);
var BASE_Y = 34.92;
var BASE_FROM = 20.07;
var BASE_TO = 33.93;
var BASE_LENGTH = 13.86;
var J_START = 159 * DEG;
var J_BEND = 148 * DEG;
var [J_X0, J_Y0] = ringPoint(J_START), [J_X1, J_Y1] = ringPoint(J_BEND);
var J_C1 = [round(J_X1 + 9.6 * Math.sin(J_BEND)), round(J_Y1 - 9.6 * Math.cos(J_BEND))];
var J_C2 = [TIP[0], round(TIP[1] + 10.1)];
var J_PATH = `M${J_X0} ${J_Y0}A${R} ${R} 0 0 0 ${J_X1} ${J_Y1}C${J_C1[0]} ${J_C1[1]} ${J_C2[0]} ${J_C2[1]} ${TIP[0]} ${TIP[1]}L${TIP[0]} ${SHAFT_TOP}`;
var J_LENGTH = (() => {
	let length = R * (J_START - J_BEND), [px, py] = [J_X1, J_Y1];
	for (let i = 1; i <= 64; ++i) {
		const t = i / 64, u = 1 - t;
		const x = u * u * u * J_X1 + 3 * u * u * t * J_C1[0] + 3 * u * t * t * J_C2[0] + t * t * t * TIP[0];
		const y = u * u * u * J_Y1 + 3 * u * u * t * J_C1[1] + 3 * u * t * t * J_C2[1] + t * t * t * TIP[1];
		length += Math.hypot(x - px, y - py);
		[px, py] = [x, y];
	}
	return length + TIP[1] - SHAFT_TOP;
})();
var J_SHAFT = 1 - (TIP[1] - SHAFT_TOP) / J_LENGTH;
var DOTS = Array.from({ length: N }, (_, i) => {
	const [x, y] = ringPoint(-90 * DEG + i * 360 / N * DEG);
	return `M${round(x - 1.5)} ${y}a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0-3 0`;
});
var dotMarkup = (d) => `<path class="preloader-dot" d="${d}" opacity=".35"/>`;
var WAVE_DOTS = DOTS.slice(1).map(dotMarkup).join("");
var RING_MARKUP = "<div class=\"preloader-dots-spin\"><svg class=\"preloader-dots-ring\" viewBox=\"0 0 54 54\">" + dotMarkup(DOTS[0]) + `<path class="preloader-dots-rest" d="${DOTS.slice(1).join("")}" opacity=".35"/><circle class="preloader-line" cx="27" cy="27" r="${R}" transform="rotate(-90 27 27)" stroke-dasharray="0 ${round(CIRCUMFERENCE)}" opacity="0"/></svg></div>`;
var MARKUP = `<div class="preloader-circular"></div><svg class="preloader-arrow" viewBox="0 0 54 54"><path d="M${BASE_FROM} ${BASE_Y}H${BASE_TO}"/><path d="${J_PATH}" stroke-dasharray="${round(J_LENGTH * (1 - J_SHAFT))} ${round(J_LENGTH * 2)}" stroke-dashoffset="${-round(J_LENGTH * J_SHAFT)}"/>` + ARM_ENDS.map(([x, y]) => `<path d="M${TIP[0]} ${TIP[1]}L${x} ${y}"/>`).join("") + "</svg><svg class=\"preloader-cross\" viewBox=\"0 0 54 54\"><path d=\"M21.6 21.6L32.4 32.4M32.4 21.6L21.6 32.4\"/></svg>" + RING_MARKUP;
var PERCENT_MARKUP = "<span class=\"preloader-percent\" dir=\"ltr\"></span>" + RING_MARKUP;
var parsed = /* @__PURE__ */ new Map();
function copyOf(markup) {
	let fragment = parsed.get(markup);
	if (!fragment) parsed.set(markup, fragment = htmlToDocumentFragment(markup));
	return fragment.cloneNode(true);
}
var GO = 500;
var ARMS_IN = 200;
var RING_IN = 240;
var CROSS_IN = 270;
var LAND = 440;
var LANDED = 600;
var BACK = 250;
var SPIN = 8e3;
var SPIN_DELAY = -Math.round(((J_START / DEG + 90 - 360 * GO / SPIN) % 360 + 360) % 360 / 360 * SPIN);
var FOLLOW = 160;
var WAVE = 1200;
var WAVE_STEP = 100;
var WAVE_KEYFRAMES = [
	{
		opacity: .35,
		easing: "ease-in-out"
	},
	{
		opacity: 1,
		offset: .35,
		easing: "ease-in-out"
	},
	{ opacity: .35 }
];
var landing = (t) => 1 - .65 * smooth(clamp01((t - 250) / 300));
var observed = /* @__PURE__ */ new Map();
var observer = createAppWindowIntersectionObserver((entries) => {
	for (const entry of entries) observed.get(entry.target)?.setInSight(entry.isIntersecting);
});
function observe(element, ring) {
	if (typeof IntersectionObserver === "undefined") return;
	observed.forEach((other) => other !== ring && other.sweep());
	observed.set(element, ring);
	observer.observe(element);
}
function unobserve(element) {
	observed.delete(element);
	observer.unobserve(element);
}
var PreloaderRing = class PreloaderRing {
	/**
	* `percent`: the share done in the middle instead of the arrow and the cross, for a progress that cannot
	* be cancelled; such a ring is never made manual.
	*/
	constructor(container, options = {}) {
		this.container = container;
		this.manual = false;
		this.arrowAtRest = true;
		this.inSight = true;
		this.target = 0;
		this.shown = 0;
		this.resetAfterBack = false;
		this.seen = false;
		this.phaseAt = 0;
		this.animating = false;
		this.lastAt = 0;
		this.waveId = 0;
		this.written = /* @__PURE__ */ new Map();
		this.tick = () => {
			if (!this.container.isConnected) {
				this.animating = false;
				this.stop();
				return false;
			}
			if (!this.inSight) {
				this.animating = false;
				return false;
			}
			const now = performance.now();
			const dt = Math.min(64, now - this.lastAt);
			this.lastAt = now;
			let phaseTime = 0;
			if (this.phase) {
				phaseTime = now - this.phaseAt;
				const level = liteMode.getAnimationLevel();
				if (phaseTime >= (this.phase === "go" ? LANDED : BACK)) this.stopPhase();
				else if (level === 2) this.drawPhase(phaseTime);
			}
			const held = this.phase === "go" && phaseTime < LAND;
			if (this.target > this.shown && !held) {
				this.shown += (this.target - this.shown) * (1 - Math.exp(-dt / FOLLOW));
				if (this.target - this.shown < .004) this.shown = this.target;
				if (this.shown >= .996 && this.target >= 1) this.shown = 1;
			}
			const landed = this.phase === "go" && phaseTime >= LAND ? landing(phaseTime) : 0;
			this.render(landed);
			if (this.shown >= 1) this.finishing?.();
			this.animating = !!this.phase || this.target > this.shown;
			return this.animating;
		};
		container.classList.add("preloader-dots");
		container.append(copyOf(options.percent ? PERCENT_MARKUP : MARKUP));
		this.spin = container.querySelector(".preloader-dots-spin");
		this.dot = container.querySelector(".preloader-dot");
		this.rest = container.querySelector(".preloader-dots-rest");
		this.line = container.querySelector(".preloader-line");
		if (options.percent) {
			this.percent = container.querySelector(".preloader-percent");
			this.setPercent(0);
		} else {
			this.arrow = container.querySelector(".preloader-arrow");
			[this.base, this.shaft, ...this.arms] = Array.from(this.arrow.children);
			this.cross = container.querySelector(".preloader-cross");
		}
		this.setSpinning(true);
	}
	/**
	* Put in the document: a download that has not had a byte yet shows its wave.
	*/
	onAttach() {
		if (!this.manual) observe(this.container, this);
		this.updateWave();
	}
	setInSight(inSight) {
		if (this.sweep()) return;
		inSight && (inSight = this.container.isConnected);
		const changed = this.inSight !== inSight;
		this.inSight = inSight;
		if (inSight) {
			this.updateWave();
			this.run();
		} else if (changed) this.stop();
	}
	/**
	* A download starts: the line goes back to the start.
	*/
	begin() {
		this.target = this.shown = 0;
		this.resetAfterBack = false;
		this.render(0);
		this.updateWave();
	}
	/**
	* Where the bytes are, 0-1. Back to 0 is a new start (while the ring fades after a cancel, that waits
	* until it has).
	*/
	setTarget(value) {
		value = clamp01(value);
		this.setPercent(value);
		if (!value) {
			if (this.phase === "back") {
				this.resetAfterBack = true;
				return;
			}
			this.target = this.shown = 0;
			this.render(0);
			this.updateWave();
			return;
		}
		if (value <= this.target) return;
		this.target = value;
		this.updateWave();
		if (!liteMode.isAvailable("animations")) {
			this.shown = value;
			this.render(0);
			this.finishing?.();
			return;
		}
		this.run();
	}
	/**
	* Resolves once the line has come round to the end (at once with no animations, or out of sight).
	*/
	finish() {
		if (this.shown >= .996 || !liteMode.isAvailable("animations") || !this.container.isConnected || !this.inSight) return Promise.resolve();
		return this.finished ?? (this.finished = new Promise((resolve) => {
			const done = () => {
				clearTimeout(timeout);
				this.finishing = this.finished = void 0;
				resolve();
			};
			const timeout = window.setTimeout(done, 1e3);
			this.finishing = done;
		}));
	}
	/**
	* Whether the arrow and the ring are turning into one another.
	*/
	isChanging() {
		return !!this.phase;
	}
	/**
	* The arrow (true) or the ring. `animated`: whether the change is seen happen.
	*/
	setManual(manual, animated) {
		if (this.manual === manual) return;
		this.manual = manual;
		const level = animated && this.container.isConnected && this.inSight ? liteMode.getAnimationLevel() : 0;
		this.stopPhase();
		if (manual) {
			this.letGo();
			this.inSight = true;
			this.stopWave(true);
			if (level) this.startPhase("back", level);
			else {
				this.setSpinning(false);
				this.drawArrowAtRest();
			}
			return;
		}
		if (this.container.isConnected) observe(this.container, this);
		this.spin.style.animationDelay = level === 2 ? SPIN_DELAY + "ms" : "";
		this.setSpinning(true);
		if (level === 2) this.startPhase("go", level);
		else this.updateWave();
	}
	/**
	* Out of the document: whatever plays stops.
	*/
	halt() {
		this.letGo();
		this.stop();
	}
	/**
	* Let go of it if it has been taken out of the document without a detach (the media viewer removes
	* it, a composer drops its overlay), and say so.
	*/
	sweep() {
		if (this.container.isConnected) this.seen = true;
		else if (this.seen) {
			this.halt();
			return true;
		}
		return false;
	}
	letGo() {
		unobserve(this.container);
		this.seen = false;
	}
	stop() {
		this.stopPhase();
		this.stopWave(true);
		this.finishing?.();
	}
	startPhase(phase, level) {
		this.phase = phase;
		this.phaseAt = performance.now();
		if (level === 2) {
			this.arrow.style.transition = this.cross.style.transition = "none";
			this.arrow.style.opacity = "1";
			if (phase === "go") this.container.classList.add("is-going");
		}
		if (level === 2) this.drawPhase(0);
		this.run();
	}
	stopPhase() {
		if (!this.phase) return;
		const phase = this.phase;
		this.phase = void 0;
		this.container.classList.remove("is-going");
		this.dot.style.visibility = "";
		for (const element of [this.arrow, this.cross]) element.style.transition = element.style.opacity = element.style.transform = "";
		this.shaft.style.strokeWidth = "";
		if (phase === "back") {
			this.setSpinning(false);
			this.drawArrowAtRest();
			if (this.resetAfterBack) {
				this.resetAfterBack = false;
				this.target = this.shown = 0;
				this.render(0);
			}
		}
		this.updateWave();
	}
	setSpinning(spinning) {
		this.container.classList.toggle("is-spinning", spinning);
	}
	piece(path, length, from, to) {
		this.put(path, "stroke-dasharray", `${round(Math.max(0, to - from) * length)} ${round(length * 2)}`);
		this.put(path, "stroke-dashoffset", "" + -round(from * length));
	}
	drawArrowAtRest() {
		if (this.arrowAtRest) return;
		this.arrowAtRest = true;
		this.piece(this.shaft, J_LENGTH, J_SHAFT, 1);
		this.put(this.shaft, "opacity", "1");
		for (const arm of this.arms) {
			this.piece(arm, ARM_LENGTH, 0, 1);
			this.put(arm, "opacity", "1");
		}
		this.piece(this.base, BASE_LENGTH, 0, 1);
		this.put(this.base, "opacity", "1");
	}
	drawPhase(t) {
		this.arrowAtRest = false;
		const go = this.phase === "go";
		let from = J_SHAFT, to = 1, opacity = 1, width = 2;
		if (go) {
			const e = easeInOut(t / GO);
			from = J_SHAFT * (1 - e);
			to = 1 - e;
			opacity = t < LAND ? landing(t) : 0;
			width = 2 + clamp01((t - 250) / 190);
		} else {
			to = J_SHAFT + (1 - J_SHAFT) * easeInOut(t / BACK);
			opacity = clamp01(t / BACK);
		}
		this.piece(this.shaft, J_LENGTH, from, to);
		this.put(this.shaft, "opacity", opacity.toFixed(3));
		this.shaft.style.strokeWidth = width.toFixed(2);
		const drawn = go ? 1 - easeInOut(t / ARMS_IN) : easeInOut(t / BACK);
		const seen = (go ? 1 - clamp01((t - 70) / 200) : clamp01(t / BACK)).toFixed(3);
		for (const arm of this.arms) {
			this.piece(arm, ARM_LENGTH, 0, drawn);
			this.put(arm, "opacity", seen);
		}
		this.piece(this.base, BASE_LENGTH, .5 - drawn / 2, .5 + drawn / 2);
		this.put(this.base, "opacity", seen);
		let scale = 1, crossOpacity = 1;
		if (go) {
			crossOpacity = t < CROSS_IN ? 0 : 1;
			scale = .2 + .8 * easeInOut((t - CROSS_IN) / 200);
		} else {
			scale = 1 - .8 * easeInOut(t / 150);
			crossOpacity = 1 - clamp01(t / BACK);
		}
		this.cross.style.opacity = crossOpacity.toFixed(3);
		this.cross.style.transform = `scale(${scale.toFixed(3)})`;
		if (go) {
			if (t >= RING_IN) this.container.classList.remove("is-going");
			this.dot.style.visibility = t < LAND ? "hidden" : "";
		}
	}
	run() {
		if (this.animating) return;
		this.animating = true;
		this.lastAt = performance.now();
		animate(this.tick);
	}
	render(lit) {
		const started = this.shown > 5e-4;
		this.put(this.line, "stroke-dasharray", `${round(this.shown * CIRCUMFERENCE)} ${round(CIRCUMFERENCE)}`);
		this.put(this.line, "opacity", started ? Math.max(.35 + .65 * clamp01(this.shown * N * 2), lit).toFixed(3) : "0");
		this.put(this.dot, "opacity", started ? "0" : Math.max(.35, lit).toFixed(3));
	}
	updateWave() {
		if (!this.manual && !this.target && this.phase !== "go" && this.inSight && this.container.isConnected && liteMode.getAnimationLevel() === 2 && typeof this.dot.animate === "function") {
			if (!this.wave) {
				++this.waveId;
				this.wave = this.splitDots().map((dot, i) => dot.animate(WAVE_KEYFRAMES, {
					duration: WAVE,
					delay: i * WAVE_STEP,
					iterations: Infinity
				}));
				PreloaderRing.waving.add(this);
				PreloaderRing.watchLevel();
			}
		} else this.stopWave(this.manual || !this.inSight || !this.container.isConnected || !liteMode.isAvailable("animations"));
	}
	static watchLevel() {
		if (PreloaderRing.levelWatched) return;
		PreloaderRing.levelWatched = true;
		createRoot(() => createEffect(on(() => liteMode.getAnimationLevel(), () => {
			PreloaderRing.waving.forEach((ring) => ring.updateWave());
		}, { defer: true })));
	}
	stopWave(now) {
		const wave = this.wave;
		if (!wave) return;
		this.wave = void 0;
		PreloaderRing.waving.delete(this);
		const waveId = this.waveId;
		let running = 0;
		const ended = () => {
			if (!--running && waveId === this.waveId) this.joinDots();
		};
		for (const animation of wave) {
			const iteration = animation.effect.getComputedTiming().currentIteration;
			if (now || iteration === null || iteration === void 0) animation.cancel();
			else {
				++running;
				animation.effect.updateTiming({ iterations: iteration + 1 });
				animation.finished.then(ended, ended);
			}
		}
		if (!running) this.joinDots();
	}
	splitDots() {
		if (!this.waveDots) {
			this.rest.insertAdjacentHTML("afterend", WAVE_DOTS);
			this.waveDots = Array.from(this.rest.parentElement.querySelectorAll(".preloader-dot")).slice(1);
			this.rest.style.display = "none";
		}
		return [this.dot, ...this.waveDots];
	}
	joinDots() {
		if (!this.waveDots) return;
		this.waveDots.forEach((dot) => dot.remove());
		this.waveDots = void 0;
		this.rest.style.display = "";
	}
	setPercent(value) {
		const text = Math.floor(value * 100) + "%";
		if (this.percent && this.percent.textContent !== text) this.percent.textContent = text;
	}
	put(element, name, value) {
		let values = this.written.get(element);
		if (!values) this.written.set(element, values = {});
		if (values[name] === value) return;
		values[name] = value;
		element.setAttribute(name, value);
	}
};
_PreloaderRing = PreloaderRing;
_PreloaderRing.waving = /* @__PURE__ */ new Set();
_PreloaderRing.levelWatched = false;
//#endregion
export { createAppWindowIntersectionObserver as n, htmlToDocumentFragment as r, PreloaderRing as t };
