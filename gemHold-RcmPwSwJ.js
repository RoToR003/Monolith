//# allFunctionsCalledOnLoad
import { t as cancelEvent } from "./cancelEvent-Cw8vYZHp.js";
import { t as clock } from "./clock-D01pG7GG.js";
import { i as pixelRatio } from "./dom-CIEs7q6J.js";
import { t as GemLensSource } from "./lens-42A1JybP.js";
import { t as GemPull } from "./pull-vIbalpR8.js";
//#region src/components/wallet/chatCard/gemHold.ts
/** held: three times its size, and down by 12 pt for every size it grew (iOS dragGrow, growShift) */
var CARD_GEM_HOLD_GROW = 3;
var HOLD_SHIFT = 12;
/** a throw's push, rad/s */
var RELEASE_IMPULSE = 19.5;
/** the card takes the hit this long after the release, ms */
var LANDING_DELAY = 200;
/** the amount through the grown gem: its own colours, over the facets (iOS: preserved colours at 0.7) */
var LENS_OPACITY = .7;
var CardGemHold = class {
	constructor(gem, hit, options) {
		this.gem = gem;
		this.hit = hit;
		this.options = options;
		this.pressed = false;
		this.onDown = (e) => {
			this.pressed = false;
			if (this.pull || e.pointerType === "mouse" && e.button !== 0 || !this.options.canHold()) return;
			cancelEvent(e);
			try {
				this.hit.setPointerCapture(e.pointerId);
			} catch (err) {}
			clearTimeout(this.landing);
			this.pressed = true;
			const rect = this.hit.getBoundingClientRect();
			this.center = [rect.left + rect.width / 2, rect.top + rect.height / 2];
			this.drawAmount();
			const now = clock.now();
			this.pull = new GemPull(e, now);
			this.gem.beginDrag(now);
			this.hit.style.cursor = "grabbing";
		};
		this.onMove = (e) => {
			const pull = this.pull;
			if (!pull || e.pointerId !== pull.pointerId) return;
			if (!e.buttons) {
				this.onUp(e);
				return;
			}
			const now = clock.now();
			const [dx, dy] = pull.move(e, now);
			this.gem.drag(dx, dy, now);
		};
		this.onUp = (e) => {
			const pull = this.pull;
			if (!pull || e.pointerId !== pull.pointerId) return;
			this.pull = void 0;
			const now = clock.now(), cancelled = e.type === "pointercancel", released = e.type === "pointerup";
			const power = this.strength;
			const tapDirection = released && pull.isTap(e, now) ? e.clientX < this.center[0] ? -1 : 1 : void 0;
			this.gem.endDrag(released ? pull.velocity(e, now) : 0, now, cancelled, tapDirection, RELEASE_IMPULSE);
			this.hit.style.cursor = "";
			if (cancelled || power <= 0) return;
			this.landing = window.setTimeout(() => !this.pull && this.options.onLand(power), LANDING_DELAY);
		};
		this.onClick = (e) => {
			if (!this.pressed) return;
			this.pressed = false;
			this.claimedClick = e;
		};
		this.onDoubleClick = (e) => {
			if (this.options.canHold()) e.stopPropagation();
		};
		this.onContextMenu = (e) => {
			if (this.pull) cancelEvent(e);
		};
		this.onTouchStart = (e) => {
			if (this.options.canHold()) e.stopPropagation();
		};
		this.side = options.restingCanvas;
		this.expandedSide = Math.round(220 * options.point);
		gem.dragScale = 220 * options.point;
		this.lens = new GemLensSource(gem);
		hit.addEventListener("pointerdown", this.onDown);
		hit.addEventListener("pointermove", this.onMove);
		hit.addEventListener("pointerup", this.onUp);
		hit.addEventListener("pointercancel", this.onUp);
		hit.addEventListener("lostpointercapture", this.onUp);
		hit.addEventListener("click", this.onClick);
		hit.addEventListener("dblclick", this.onDoubleClick);
		hit.addEventListener("contextmenu", this.onContextMenu);
		hit.addEventListener("touchstart", this.onTouchStart);
	}
	/** How far it has grown: 0 at rest, 1 at three times its size */
	get strength() {
		return Math.min(1, Math.max(0, (this.gem.grow - 1) / 2));
	}
	/** The click that ended a press on the gem: the card opens nothing for it */
	tookClick(event) {
		return event === this.claimedClick;
	}
	/**
	* Before each frame: the canvas grows with the gem and the amount shows through it. Gives how far down the gem
	* goes as it grows, px.
	*/
	frame() {
		const gem = this.gem;
		const side = gem.isDragging || Math.abs(gem.grow - 1) > .001 || Math.abs(gem.growVelocity) > .001 ? this.expandedSide : this.options.restingCanvas;
		if (side !== this.side) {
			this.side = side;
			gem.setSize(side, pixelRatio());
			gem.canvas.style.width = gem.canvas.style.height = side + "px";
		}
		const shift = HOLD_SHIFT * this.options.point * (gem.grow - 1), half = side / 2;
		const source = side === this.expandedSide ? this.lensCanvas : void 0;
		this.lens.update(source, [half, half + shift], gem.style.widthPoints * gem.grow, this.strength, LENS_OPACITY);
		return shift;
	}
	destroy() {
		const hit = this.hit;
		hit.removeEventListener("pointerdown", this.onDown);
		hit.removeEventListener("pointermove", this.onMove);
		hit.removeEventListener("pointerup", this.onUp);
		hit.removeEventListener("pointercancel", this.onUp);
		hit.removeEventListener("lostpointercapture", this.onUp);
		hit.removeEventListener("click", this.onClick);
		hit.removeEventListener("dblclick", this.onDoubleClick);
		hit.removeEventListener("contextmenu", this.onContextMenu);
		hit.removeEventListener("touchstart", this.onTouchStart);
		clearTimeout(this.landing);
		hit.style.cursor = "";
	}
	/** The amount as it stands now, on a canvas the size of the grown gem's and centred on it */
	drawAmount() {
		const side = this.expandedSide, half = side / 2, pr = pixelRatio();
		const canvas = this.lensCanvas ?? (this.lensCanvas = document.createElement("canvas"));
		canvas.width = canvas.height = Math.round(side * pr);
		const ctx = canvas.getContext("2d");
		ctx.setTransform(pr, 0, 0, pr, 0, 0);
		ctx.clearRect(0, 0, side, side);
		ctx.textBaseline = "alphabetic";
		for (const span of this.options.amount()) {
			const text = span.textContent;
			if (!text) continue;
			const style = getComputedStyle(span);
			ctx.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
			ctx.fillStyle = style.color;
			const rect = span.getBoundingClientRect();
			const ascent = ctx.measureText(text).fontBoundingBoxAscent;
			ctx.fillText(text, rect.left - this.center[0] + half, rect.top - this.center[1] + half + ascent);
		}
		this.lens.changed();
	}
};
//#endregion
export { CARD_GEM_HOLD_GROW, CardGemHold };
