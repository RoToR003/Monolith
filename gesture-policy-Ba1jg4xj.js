//# allFunctionsCalledOnLoad
import { t as _defineProperty } from "./defineProperty-_J0dqq22.js";
var NO_CLAIM = Object.freeze({
	x: false,
	y: false,
	hold: false
});
/**
* The claim of a press from the computed `touch-action` of the target and of each
* ancestor up to the root (the widget's `<html>`) included, target first, and whether the widget
* prevented pointerdown on the target before. `none` anywhere claims horizontal
* drags and holds; a value without a horizontal pan (`pan-x`, `pan-left`,
* `pan-right`) claims `x`; `auto` and `manipulation` claim nothing, and so does a
* value with a horizontal pan (`pan-x`: vertical drags cannot be claimed). A
* prevented pointerdown claims `x`, never holds: only `touch-action: none` does.
* `y` is always false.
*/
function claimOf(touchActions, prevented = false) {
	let x = prevented;
	for (const raw of touchActions) {
		const ta = raw.trim().toLowerCase();
		if (ta === "" || ta === "auto" || ta === "manipulation") continue;
		if (ta === "none") return {
			x: true,
			y: false,
			hold: true
		};
		if (!/\bpan-(x|left|right)\b/.test(ta)) x = true;
	}
	return {
		x,
		y: false,
		hold: false
	};
}
/**
* One pointer's presses over one widget, in order. `x` is measured from the
* widget's leading edge (the left one in a left-to-right UI, the right one in a
* right-to-left UI: pass `width - x` there), `y` from its top, CSS px; `t` in ms on
* one clock. Calls with a `t` past the hold deadline decide the hold first, so a
* late `tick` changes nothing.
*/
var GestureArbiter = class {
	constructor() {
		_defineProperty(this, "press", null);
		_defineProperty(this, "lastTap", null);
	}
	/** A primary pointerdown. `button` 2 with a mouse is the secondary click. A press still open is replaced. */
	down(t, x, y, claim, pointer = "touch", button = 0) {
		const edge = pointer !== "mouse" && x < 20;
		const last = this.lastTap;
		this.lastTap = null;
		const second = last !== null && t - last.t <= 300 && Math.hypot(x - last.x, y - last.y) <= 40;
		const p = {
			t0: t,
			x0: x,
			y0: y,
			claim: edge ? NO_CLAIM : claim,
			pointer,
			edge,
			second,
			locked: false,
			owner: "pending",
			gesture: "press"
		};
		this.press = p;
		if (pointer === "mouse" && button === 2) return p.claim.hold ? this.decide(p, "widget", "menu-click", void 0, "contextmenu") : this.decide(p, "bubble", "menu-click", "menu");
		return this.verdict(p);
	}
	/** A move of the press's pointer. Null when no press is open. */
	move(t, x, y) {
		const p = this.press;
		if (!p) return null;
		const held = this.holdFirst(p, t);
		if (held) return held;
		const dx = x - p.x0, dy = y - p.y0;
		if (p.locked || Math.hypot(dx, dy) <= 10) return this.verdict(p);
		p.locked = true;
		const horizontal = Math.abs(dx) > Math.abs(dy);
		if (p.owner === "widget" && p.gesture === "hold") return horizontal ? this.verdict(p) : this.decide(p, "bubble", "drag-y", "scroll");
		if (p.owner !== "pending") return this.verdict(p);
		const gesture = horizontal ? "drag-x" : "drag-y";
		if (p.pointer === "mouse" || horizontal && p.claim.x) return this.decide(p, "widget", gesture);
		return this.decide(p, "bubble", gesture, horizontal ? p.edge ? "back" : "swipe" : "scroll");
	}
	/** The hold timer: call it at `holdDeadline()`. Null when no press is open. */
	tick(t) {
		const p = this.press;
		if (!p) return null;
		return this.holdFirst(p, t) ?? this.verdict(p);
	}
	/** The pointerup. A press still undecided is a tap, or the second tap of a double tap. Null when no press is open. */
	up(t, x, y) {
		const p = this.press;
		if (!p) return null;
		const v = this.move(t, x, y);
		this.press = null;
		if (p.owner !== "pending") return v.cancel || v.event ? v : this.verdict(p);
		if (p.second) return this.decide(p, "widget", "double-tap", void 0, "dblclick");
		this.lastTap = {
			t,
			x: p.x0,
			y: p.y0
		};
		return this.decide(p, "widget", "tap");
	}
	/** The platform cancelled the press (a scroll, the client's own recognizer): it is over, and no double tap continues it. */
	cancel() {
		this.press = null;
		this.lastTap = null;
	}
	/** When `tick` may turn the open press into a hold, or null. */
	holdDeadline() {
		const p = this.press;
		return p && p.owner === "pending" && p.pointer !== "mouse" ? p.t0 + 500 : null;
	}
	holdFirst(p, t) {
		if (p.owner !== "pending" || p.pointer === "mouse" || t - p.t0 < 500) return null;
		return p.claim.hold ? this.decide(p, "widget", "hold", void 0, "contextmenu") : this.decide(p, "bubble", "hold", "menu");
	}
	decide(p, owner, gesture, action, event) {
		p.owner = owner;
		p.gesture = gesture;
		p.action = action;
		const v = this.verdict(p);
		v.cancel = owner === "bubble";
		if (event) v.event = event;
		return v;
	}
	verdict(p) {
		const v = {
			owner: p.owner,
			gesture: p.gesture,
			cancel: false
		};
		if (p.action) v.action = p.action;
		if (p.edge) v.edge = true;
		return v;
	}
};
//#endregion
export { claimOf as n, GestureArbiter as t };
