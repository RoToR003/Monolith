//# allFunctionsCalledOnLoad
const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["qr-code-styling-Da7gbEhC.js","rolldown-runtime-CwcJO0Gh.js"])))=>i.map(i=>d[i]);
import { i as __toESM } from "./rolldown-runtime-CwcJO0Gh.js";
import { h as Modes } from "./userAgent-ByGXcznk.js";
import { n as rootScope } from "./rootScope-CZS0lmz8.js";
import { a as i18n, u as langPack_default } from "./langPack-BmdJGr44.js";
import { s as wrapUrl } from "./commonStateStorage-CW-poHCa.js";
import { C as createSignal, M as onCleanup, N as onMount, _ as createMemo, d as batch, g as createEffect, i as For, j as on, p as createComponent, s as Show, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { t as __vitePreload } from "./preload-helper-B0NHKCoo.js";
import { n as getAppWindow, t as bindActiveWindowListener } from "./appWindow-bo-KtJhy.js";
import { _ as use, c as insert, f as setAttribute, g as template, h as style, o as className, p as setStyleProperty, s as delegateEvents } from "./web-BPyQozky.js";
import { n as hotReloadGuard } from "./hotReloadGuardProvider-CHEsZRuG.js";
import { t as liteMode } from "./liteMode-DeLStZfQ.js";
import { n as mediaSizes } from "./mediaSizes-C1MTaleW.js";
import { t as classNames } from "./classNames-DxGDjmvw.js";
import { t as IconTsx } from "./iconTsx-B4lOk4A6.js";
import { t as PreloaderTsx } from "./putPreloader-Bxq7N1RV.js";
import { an as groupAddress } from "./confirmationPopup-Bz6mK0o-.js";
import { D as settle } from "./appDialogsManager-CXguiKc3.js";
import { r as copyTextToClipboard } from "./clipboard-DzscV-ca.js";
import { t as clock } from "./clock-D01pG7GG.js";
import { t as addWalletFrameClient } from "./frameLoop-BVgbdMV-.js";
import { p as useWallet } from "./stream-DZrVqY75.js";
import { i as pixelRatio } from "./dom-CIEs7q6J.js";
import { i as easing, n as GemView, t as Appearance } from "./stage-K7oS8PBR.js";
import { i as showWalletAlert } from "./alerts-DVBlV8XN.js";
import { t as GemLensSource } from "./lens-42A1JybP.js";
import { t as GemPull } from "./pull-vIbalpR8.js";
//#region src/components/wallet/receive/qr.ts
/** the modules of a finder plus its white separator and the quiet zone: they grow as one piece */
var MARKER_BLOCK = 9;
var floorToPixels = (value, pr) => Math.floor(value * pr) / pr;
var roundToPixels = (value, pr) => Math.round(value * pr) / pr;
/**
* The modules of `data` (ECC Q): qr-code-styling's own encoder, which the app already loads for its codes. Its
* drawing is not used — iOS's style is drawn here.
*/
async function loadWalletQrMatrix(data) {
	const qr = new (await (__vitePreload(() => import("./qr-code-styling-Da7gbEhC.js").then((m) => /* @__PURE__ */ __toESM(m.default)).then((m) => m.default), __vite__mapDeps([0,1]))))({
		type: "svg",
		width: 177,
		height: 177,
		data,
		qrOptions: { errorCorrectionLevel: "Q" }
	})._qr;
	const count = qr.getModuleCount();
	const dark = new Uint8Array(count * count);
	for (let y = 0; y < count; ++y) for (let x = 0; x < count; ++x) dark[y * count + x] = qr.isDark(y, x) ? 1 : 0;
	const size = count + 2;
	const cutout = cutoutModules(size);
	const start = size - cutout >> 1;
	const isCleared = (value) => value > start && value < start + cutout - 1;
	return {
		size,
		isDark: (x, y) => {
			if (x < 1 || y < 1 || x > count || y > count) return false;
			if (isCleared(x) && isCleared(y)) return false;
			return !!dark[(y - 1) * count + x - 1];
		}
	};
}
/** iOS's centre cutout (qrCodeCutout): about 30% of the side, odd, at most 23 modules */
function cutoutModules(size) {
	let cutout = Math.round(size * .297);
	if (size === 39) cutout = 11;
	else if (cutout % 2 === 0) ++cutout;
	return Math.min(23, cutout);
}
function layoutWalletQr(matrix, imageSide, pixelRatio) {
	const { size } = matrix;
	const cutout = cutoutModules(size);
	const side = floorToPixels(imageSide / size, pixelRatio);
	const padding = roundToPixels((imageSide - side * size) / 2, pixelRatio);
	const cutoutSide = side * (cutout - 2);
	const cutoutOrigin = floorToPixels((imageSide - cutoutSide) / 2, pixelRatio);
	let markerSize = 0;
	for (let i = 1; i < size; ++i) if (!matrix.isDark(i, 1)) {
		markerSize = i - 1;
		break;
	}
	return {
		size,
		imageSide,
		side,
		padding,
		cutout,
		cutoutRect: {
			x: cutoutOrigin,
			y: cutoutOrigin,
			side: cutoutSide
		},
		markerSize,
		pixelRatio
	};
}
function isMarkerModule(layout, x, y) {
	const { size, markerSize } = layout;
	return y < markerSize + 1 && (x < markerSize + 1 || x > size - markerSize - 2) || y > size - markerSize - 2 && x < markerSize + 1;
}
/** A rectangle with its own radius per corner (0 = square) */
function roundedRect(path, x, y, w, h, tl, tr, br, bl) {
	path.moveTo(x + tl, y);
	path.lineTo(x + w - tr, y);
	if (tr) path.arcTo(x + w, y, x + w, y + tr, tr);
	path.lineTo(x + w, y + h - br);
	if (br) path.arcTo(x + w, y + h, x + w - br, y + h, br);
	path.lineTo(x + bl, y + h);
	if (bl) path.arcTo(x, y + h, x, y + h - bl, bl);
	path.lineTo(x, y + tl);
	if (tl) path.arcTo(x, y, x + tl, y, tl);
	path.closePath();
}
/**
* The finished code, black on transparent, onto `canvas` sized `imageSide` × the pixel ratio
*/
function paintWalletQr(canvas, matrix, layout) {
	const { size, side, padding, pixelRatio: pr } = layout;
	canvas.width = canvas.height = Math.round(layout.imageSide * pr);
	const ctx = canvas.getContext("2d");
	ctx.setTransform(pr, 0, 0, pr, 0, 0);
	ctx.fillStyle = ctx.strokeStyle = "#000";
	const at = matrix.isDark;
	const modules = new Path2D();
	const outer = side / 3, inner = side / 4;
	for (let y = 0; y < size; ++y) for (let x = 0; x < size; ++x) {
		if (isMarkerModule(layout, x, y)) continue;
		const left = padding + x * side, top = padding + y * side;
		const up = at(x, y - 1), down = at(x, y + 1), before = at(x - 1, y), after = at(x + 1, y);
		if (at(x, y)) {
			roundedRect(modules, left, top, side, side, !up && !before ? outer : 0, !up && !after ? outer : 0, !down && !after ? outer : 0, !down && !before ? outer : 0);
			continue;
		}
		if (up && before && at(x - 1, y - 1)) {
			modules.moveTo(left, top);
			modules.lineTo(left + inner, top);
			modules.arc(left + inner, top + inner, inner, -Math.PI / 2, -Math.PI, true);
			modules.closePath();
		}
		if (up && after && at(x + 1, y - 1)) {
			const right = left + side;
			modules.moveTo(right, top);
			modules.lineTo(right, top + inner);
			modules.arc(right - inner, top + inner, inner, 0, -Math.PI / 2, true);
			modules.closePath();
		}
		if (down && after && at(x + 1, y + 1)) {
			const right = left + side, bottom = top + side;
			modules.moveTo(right, bottom);
			modules.lineTo(right - inner, bottom);
			modules.arc(right - inner, bottom - inner, inner, Math.PI / 2, 0, true);
			modules.closePath();
		}
		if (down && before && at(x - 1, y + 1)) {
			const bottom = top + side;
			modules.moveTo(left, bottom);
			modules.lineTo(left, bottom - inner);
			modules.arc(left + inner, bottom - inner, inner, Math.PI, Math.PI / 2, true);
			modules.closePath();
		}
	}
	ctx.fill(modules);
	const markerSide = floorToPixels((layout.markerSize - 1) * side * 1.05, pr);
	const dotSide = markerSide - side * 3;
	ctx.lineWidth = side;
	const marker = (x, y) => {
		const ring = new Path2D(), dot = new Path2D();
		const radius = markerSide / 3.5, dotRadius = dotSide / 3.5;
		roundedRect(ring, padding + x + side / 2, padding + y + side / 2, markerSide, markerSide, radius, radius, radius, radius);
		roundedRect(dot, padding + x + side * 2, padding + y + side * 2, dotSide, dotSide, dotRadius, dotRadius, dotRadius, dotRadius);
		ctx.stroke(ring);
		ctx.fill(dot);
	};
	marker(side, side);
	marker((size - 2) * side - markerSide, side);
	marker(side, (size - 2) * side - markerSide);
}
/** Core Animation's easeOut, which the iOS reveal and fades use */
var easeOut = (t) => easing(t, 0, 0, .58, 1);
var easeInOut = (t) => easing(t, .42, 0, .58, 1);
/** the finders' pop: Core Animation's spring (mass 3, stiffness 1000), clamped to critical damping */
var MARKER_OMEGA = Math.sqrt(1e3 / 3);
var markerSpring = (t) => t >= .5 ? 1 : 1 - (1 + MARKER_OMEGA * t) * Math.exp(-MARKER_OMEGA * t);
var BATCHES = 48;
var BATCH_FADE = .12;
var REVEAL_DELAY = .03;
/**
* The code comes in as on iOS: the modules fade in 48 batches that sweep inward while winding clockwise around
* the gem, with a little jitter, and the three finders pop from their centres. The finished code is drawn under
* a mask, so the rounded corners and fillets come in as drawn.
*/
var WalletQrReveal = class {
	constructor(target, code, layout) {
		this.target = target;
		this.code = code;
		this.layout = layout;
		const { size, side, padding } = layout;
		this.batches = Array.from({ length: BATCHES }, () => new Path2D());
		const center = (size - 1) / 2;
		for (let y = 0; y < size; ++y) for (let x = 0; x < size; ++x) {
			if (y < MARKER_BLOCK && (x < MARKER_BLOCK || x >= size - MARKER_BLOCK) || y >= size - MARKER_BLOCK && x < MARKER_BLOCK) continue;
			const inward = Math.min(x, y, size - 1 - x, size - 1 - y) / center;
			const dx = x - center, dy = y - center;
			const spiral = (Math.atan2(dy, dx) + Math.PI) / (2 * Math.PI) + Math.hypot(dx, dy) / center * 1.25;
			const phase = inward * .55 + (spiral - Math.floor(spiral)) * .4 + Math.random() * .05;
			const batch = Math.min(47, Math.floor(phase * 47));
			this.batches[batch].rect(padding + x * side, padding + y * side, side, side);
		}
		const block = MARKER_BLOCK * side;
		this.markers = [
			[0, 0],
			[size - MARKER_BLOCK, 0],
			[0, size - MARKER_BLOCK]
		].map(([x, y]) => ({
			x: padding + x * side,
			y: padding + y * side,
			side: block
		}));
	}
	/** The reveal `elapsed` seconds in; false once it is over and the finished code is drawn */
	frame(elapsed) {
		if (elapsed >= .53) {
			this.finish();
			return false;
		}
		const { pixelRatio: pr, imageSide } = this.layout;
		const ctx = this.target.getContext("2d");
		ctx.setTransform(pr, 0, 0, pr, 0, 0);
		ctx.clearRect(0, 0, imageSide, imageSide);
		const spread = .38;
		this.batches.forEach((path, index) => {
			const alpha = easeOut((elapsed - REVEAL_DELAY - index / 47 * spread) / BATCH_FADE);
			if (alpha <= 0) return;
			ctx.save();
			ctx.globalAlpha = alpha;
			ctx.clip(path);
			ctx.drawImage(this.code, 0, 0, imageSide, imageSide);
			ctx.restore();
		});
		const markerTime = elapsed - REVEAL_DELAY;
		if (markerTime > 0) {
			const scale = Math.max(.01, markerSpring(markerTime));
			ctx.globalAlpha = easeInOut(markerTime / BATCH_FADE);
			for (const marker of this.markers) {
				const half = marker.side / 2;
				ctx.save();
				ctx.translate(marker.x + half, marker.y + half);
				ctx.scale(scale, scale);
				ctx.drawImage(this.code, marker.x * pr, marker.y * pr, marker.side * pr, marker.side * pr, -half, -half, marker.side, marker.side);
				ctx.restore();
			}
			ctx.globalAlpha = 1;
		}
		return true;
	}
	/** The finished code at once */
	finish() {
		const ctx = this.target.getContext("2d");
		ctx.setTransform(1, 0, 0, 1, 0, 0);
		ctx.clearRect(0, 0, this.target.width, this.target.height);
		ctx.drawImage(this.code, 0, 0);
	}
};
//#endregion
//#region src/components/wallet/receive/ring.ts
var SPEED = 18;
var COLOR = "rgba(0, 82, 179, .48)";
var FONT_FAMILY = "\"Roboto Mono\", monospace";
/** The loop: a rounded rectangle walked clockwise from the middle of its top edge */
var Perimeter = class {
	constructor(x, y, w, h, radius) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.radius = radius;
		this.radius = Math.min(Math.max(0, radius), Math.min(w, h) / 2);
		this.horizontal = Math.max(0, w - this.radius * 2);
		this.vertical = Math.max(0, h - this.radius * 2);
		this.corner = Math.PI * this.radius / 2;
		this.length = this.horizontal * 2 + this.vertical * 2 + this.corner * 4;
	}
	arc(cx, cy, angle) {
		return {
			x: cx + this.radius * Math.cos(angle),
			y: cy + this.radius * Math.sin(angle),
			angle: angle + Math.PI / 2
		};
	}
	sample(distance) {
		const { x, y, w, h, radius, horizontal, vertical, corner } = this;
		let d = distance % this.length;
		if (d < 0) d += this.length;
		d += horizontal / 2;
		if (d >= this.length) d -= this.length;
		if (d < horizontal) return {
			x: x + radius + d,
			y,
			angle: 0
		};
		d -= horizontal;
		if (d < corner) return this.arc(x + w - radius, y + radius, -Math.PI / 2 + d / radius);
		d -= corner;
		if (d < vertical) return {
			x: x + w,
			y: y + radius + d,
			angle: Math.PI / 2
		};
		d -= vertical;
		if (d < corner) return this.arc(x + w - radius, y + h - radius, d / radius);
		d -= corner;
		if (d < horizontal) return {
			x: x + w - radius - d,
			y: y + h,
			angle: Math.PI
		};
		d -= horizontal;
		if (d < corner) return this.arc(x + radius, y + h - radius, Math.PI / 2 + d / radius);
		d -= corner;
		if (d < vertical) return {
			x,
			y: y + h - radius - d,
			angle: -Math.PI / 2
		};
		d -= vertical;
		if (d < corner) return this.arc(x + radius, y + radius, Math.PI + d / radius);
		return {
			x: x + radius,
			y,
			angle: 0
		};
	}
};
var WalletAddressRing = class {
	constructor(canvas) {
		this.canvas = canvas;
		this.glyphs = [];
		this.scale = 1;
		this.tracking = 0;
		this.baseline = 0;
		this.offset = 0;
		this.last = null;
		this.pixelRatio = 1;
	}
	/** The text and the loop; draws the ring where it stands */
	setup(address, layout, pixelRatio) {
		this.pixelRatio = pixelRatio;
		const { width, height } = layout;
		this.canvas.width = Math.round(width * pixelRatio);
		this.canvas.height = Math.round(height * pixelRatio);
		this.glyphs = [];
		this.perimeter = void 0;
		if (!address) {
			this.draw();
			return;
		}
		const fontSize = Math.max(8, Math.min(11, width / 31)) * 1.2;
		this.font = `500 ${fontSize}px ${FONT_FAMILY}`;
		const ctx = this.canvas.getContext("2d");
		ctx.font = this.font;
		const metrics = ctx.measureText("A");
		const ascent = metrics.fontBoundingBoxAscent ?? fontSize * .93;
		const descent = metrics.fontBoundingBoxDescent ?? fontSize * .24;
		this.baseline = (ascent - descent) / 2;
		const inset = Math.ceil((ascent + descent) / 2);
		const cardX = (width - layout.cardWidth) / 2, cardY = (height - layout.cardHeight) / 2;
		const left = Math.max(cardX - layout.offset, Math.min(inset, (width - 1) / 2));
		const top = Math.max(cardY - layout.offset, Math.min(inset, (height - 1) / 2));
		const right = Math.min(cardX + layout.cardWidth + layout.offset, width - Math.min(inset, (width - 1) / 2));
		const bottom = Math.min(cardY + layout.cardHeight + layout.offset, height - Math.min(inset, (height - 1) / 2));
		if (right <= left || bottom <= top) {
			this.draw();
			return;
		}
		const radius = Math.min(layout.cardRadius, Math.min(layout.cardWidth, layout.cardHeight) / 2) + layout.offset;
		this.perimeter = new Perimeter(left, top, right - left, bottom - top, radius);
		const text = "· " + (address.match(/.{1,4}/g) || []).join(" ").toUpperCase() + " ";
		let x = 0;
		for (const char of text) {
			const advance = ctx.measureText(char).width;
			this.glyphs.push({
				char,
				center: x + advance / 2
			});
			x += advance;
		}
		const half = this.perimeter.length / 2;
		this.scale = x > half ? half / x * .99 : 1;
		this.tracking = Math.max(0, (half - x * this.scale) / this.glyphs.length);
		this.offset %= half;
		this.draw();
	}
	draw() {
		const ctx = this.canvas.getContext("2d");
		const pr = this.pixelRatio;
		ctx.setTransform(1, 0, 0, 1, 0, 0);
		ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		const perimeter = this.perimeter;
		if (!perimeter || !this.glyphs.length) return;
		ctx.font = this.font;
		ctx.fillStyle = COLOR;
		ctx.textAlign = "center";
		ctx.textBaseline = "alphabetic";
		const half = perimeter.length / 2;
		const first = this.glyphs[0].center * this.scale;
		for (let copy = 0; copy < 2; ++copy) this.glyphs.forEach((glyph, index) => {
			if (glyph.char === " ") return;
			const distance = this.offset + copy * half + glyph.center * this.scale - first + index * this.tracking;
			const sample = perimeter.sample(distance);
			const cos = Math.cos(sample.angle) * this.scale * pr, sin = Math.sin(sample.angle) * this.scale * pr;
			ctx.setTransform(cos, sin, -sin, cos, sample.x * pr, sample.y * pr);
			ctx.fillText(glyph.char, 0, this.baseline);
		});
	}
	/** One step of the run: the text moves on by the time since the last frame */
	frame(now) {
		const dt = this.last === null ? 0 : Math.min(Math.max(0, now - this.last), .05);
		this.last = now;
		if (!this.perimeter || !dt) return;
		this.offset = (this.offset + dt * SPEED) % (this.perimeter.length / 2);
		this.draw();
	}
	/** The page was hidden: no jump on return */
	resetClock() {
		this.last = null;
	}
};
//#endregion
//#region src/components/wallet/receive/gem.ts
var IDLE_SPIN = 2 * Math.PI / 26;
/** held: 1 + 2.75 times */
var HOLD_GROW = 2.75;
/** the growth's spring and the damped swing back after a release, seconds */
var GRIP_IN = .46;
var RELEASE = 1.96;
/** the gem's canvas while it drops in five times its size */
var OPENING_CANVAS = 320;
/** the code through the grown gem */
var LENS_OPACITY = .9;
/** The drop-in: iOS's InteractiveDiamondIntro at speed 1.5 and damping .64, after the reveal's .03 s */
var DROP_DELAY = .03;
var DROP_SPEED = 1.5;
var DROP_OMEGA = 2 * Math.PI / .9;
var DROP_DAMPING = .64;
function dropProgress(elapsed) {
	const t = Math.max(elapsed - DROP_DELAY, 0) * DROP_SPEED;
	const decay = DROP_DAMPING * DROP_OMEGA, frequency = DROP_OMEGA * Math.sqrt(1 - DROP_DAMPING * DROP_DAMPING);
	return 1 - Math.exp(-decay * t) * (Math.cos(frequency * t) + (decay - 1.2) / frequency * Math.sin(frequency * t));
}
var WalletQrGem = class {
	/** Throws without WebGL2 */
	constructor(canvas, hit, options) {
		this.canvas = canvas;
		this.hit = hit;
		this.options = options;
		this.width = 0;
		this.resting = 0;
		this.canvasSide = 0;
		this.transform = "";
		this.held = false;
		this.grip = 0;
		this.gripFrom = 0;
		this.holdChange = null;
		this.dropStart = null;
		this.lensDirty = true;
		this.stillDrawn = false;
		this.onDown = (e) => {
			if (this.drag || e.pointerType === "mouse" && e.button !== 0) return;
			e.preventDefault();
			try {
				this.hit.setPointerCapture(e.pointerId);
			} catch (err) {}
			const now = clock.now();
			this.drag = new GemPull(e, now);
			this.dropStart = null;
			this.gem.beginDrag(now);
			this.hold(true, now);
			this.options.onHold?.();
		};
		this.onMove = (e) => {
			const drag = this.drag;
			if (!drag || e.pointerId !== drag.pointerId) return;
			const now = clock.now();
			const [dx, dy] = drag.move(e, now);
			this.gem.drag(dx, dy, now);
		};
		this.onUp = (e) => {
			const drag = this.drag;
			if (!drag || e.pointerId !== drag.pointerId) return;
			const now = clock.now();
			const velocity = this.options.motion ? drag.velocity(e, now) : 0;
			this.gem.endDrag(velocity, now, e.type === "pointercancel");
			this.drag = void 0;
			this.hold(false, now);
		};
		this.gem = new GemView(canvas, {
			appearance: Appearance.blue,
			rotationSpeed: options.motion ? IDLE_SPIN : 0,
			swayScale: options.motion ? 1 : 0,
			lightBackground: true
		});
		this.gem.dragScale = 220;
		this.lens = new GemLensSource(this.gem);
		hit.addEventListener("pointerdown", this.onDown);
		hit.addEventListener("pointermove", this.onMove);
		hit.addEventListener("pointerup", this.onUp);
		hit.addEventListener("pointercancel", this.onUp);
	}
	/** The cleared square it stands in, CSS px: the gem is .72 of it */
	setCutout(side) {
		this.width = side * .72;
		this.resting = Math.ceil(side);
		this.canvasSide = 0;
	}
	/** The finished code the grown gem refracts, and the gem's centre on it, CSS px */
	setCode(canvas, center, side) {
		this.code = {
			canvas,
			center,
			side
		};
		this.lensDirty = true;
	}
	/** Movement turned on or off while it stands (the system's reduced motion): it stops where it is, or turns on */
	setMotion(motion) {
		if (this.options.motion === motion) return;
		this.options.motion = motion;
		this.gem.style.rotationSpeed = motion ? IDLE_SPIN : 0;
		this.gem.style.swayScale = motion ? 1 : 0;
		if (!motion) this.dropStart = null;
		this.stillDrawn = false;
	}
	/** The drop-in, from `start` (the reveal's start) */
	drop(start) {
		if (this.options.motion) this.dropStart = start;
	}
	get busy() {
		return this.dropStart !== null || this.isExpanded(clock.now()) || this.gem.isDragging;
	}
	frame(now) {
		let scale = 1, lift = 0;
		if (this.dropStart !== null) {
			const elapsed = now - this.dropStart;
			if (elapsed >= .7100000000000001) this.dropStart = null;
			else {
				const progress = dropProgress(elapsed);
				const bounce = progress > 1 ? .49 : 1;
				const remaining = 1 - progress;
				scale = 1 + 4 * (remaining < 0 ? -Math.pow(-remaining, 1.25) : Math.pow(remaining, 1.25)) * bounce;
				lift = -192 * progress * (1 - progress) * bounce;
			}
		}
		this.grip = this.gripAt(now);
		const side = this.dropStart !== null ? OPENING_CANVAS : this.isExpanded(now) ? 220 : this.resting;
		if (side !== this.canvasSide) {
			this.canvasSide = side;
			this.stillDrawn = false;
			this.gem.setSize(side, pixelRatio());
			this.canvas.style.width = this.canvas.style.height = side + "px";
		}
		const transform = `translate(-50%, -50%) translateY(${lift.toFixed(2)}px)`;
		if (transform !== this.transform) this.transform = this.canvas.style.transform = transform;
		this.gem.style.widthPoints = this.width * scale * (1 + HOLD_GROW * this.grip);
		this.updateLens();
		if (!this.options.motion && !this.busy) {
			if (this.stillDrawn) return;
			this.stillDrawn = true;
			this.gem.resetClock();
		} else this.stillDrawn = false;
		this.gem.render(now);
	}
	/** The page was hidden: no jump on return */
	resetClock() {
		this.gem.resetClock();
	}
	destroy() {
		const hit = this.hit;
		hit.removeEventListener("pointerdown", this.onDown);
		hit.removeEventListener("pointermove", this.onMove);
		hit.removeEventListener("pointerup", this.onUp);
		hit.removeEventListener("pointercancel", this.onUp);
		this.gem.destroy();
	}
	isExpanded(now) {
		return this.held || this.holdChange !== null && now - this.holdChange < RELEASE && this.gripFrom !== 0;
	}
	/** The growth under the finger: 0 at rest, 1 grown; a release swings past rest and settles */
	gripAt(now) {
		if (this.holdChange === null) return 0;
		const elapsed = now - this.holdChange;
		if (this.held) return this.gripFrom + (1 - this.gripFrom) * settle(elapsed / GRIP_IN);
		if (elapsed >= RELEASE) return 0;
		return this.gripFrom * Math.exp(-4.2 * elapsed) * Math.cos(7 * elapsed);
	}
	hold(on, now) {
		if (this.held === on) return;
		this.gripFrom = this.gripAt(now);
		this.held = on;
		this.holdChange = now;
	}
	/** The code through the grown gem: the modules bent by its facets, inside its silhouette */
	updateLens() {
		const grown = this.grip > .002 && !!this.code && this.canvasSide === 220;
		const half = 110;
		if (grown && this.lensDirty) {
			this.lensDirty = false;
			const pr = pixelRatio();
			const canvas = this.lensCanvas ?? (this.lensCanvas = document.createElement("canvas"));
			canvas.width = canvas.height = Math.round(220 * pr);
			const ctx = canvas.getContext("2d");
			ctx.setTransform(pr, 0, 0, pr, 0, 0);
			const { canvas: code, center, side } = this.code;
			ctx.drawImage(code, 0, 0, code.width, code.height, half - center[0], half - center[1], side, side);
			this.lens.changed();
		}
		this.lens.update(grown ? this.lensCanvas : void 0, [half, half], this.gem.style.widthPoints, this.grip, LENS_OPACITY);
	}
};
var receive_module_default = {
	root: "_root_xdyz9_21",
	close: "_close_xdyz9_39",
	stage: "_stage_xdyz9_57",
	ring: "_ring_xdyz9_68",
	card: "_card_xdyz9_74",
	flip: "_flip_xdyz9_78",
	flipping: "_flipping_xdyz9_85",
	face: "_face_xdyz9_89",
	shade: "_shade_xdyz9_102",
	qr: "_qr_xdyz9_111",
	qrCanvas: "_qrCanvas_xdyz9_118",
	gem: "_gem_xdyz9_125",
	gemCanvas: "_gemCanvas_xdyz9_131",
	gemHit: "_gemHit_xdyz9_140",
	gemFlat: "_gemFlat_xdyz9_154",
	pill: "_pill_xdyz9_163",
	pillIcon: "_pillIcon_xdyz9_189",
	grid: "_grid_xdyz9_193",
	groupOdd: "_groupOdd_xdyz9_209",
	copied: "_copied_xdyz9_213",
	check: "_check_xdyz9_224",
	text: "_text_xdyz9_228",
	small: "_small_xdyz9_241",
	buy: "_buy_xdyz9_245",
	buyContent: "_buyContent_xdyz9_269",
	buyOpening: "_buyOpening_xdyz9_282",
	buyIcon: "_buyIcon_xdyz9_286",
	buySpinner: "_buySpinner_xdyz9_290"
};
//#endregion
//#region src/components/wallet/screens/receive.tsx
var _tmpl$ = /*#__PURE__*/ template(`<canvas>`);
var _tmpl$2 = /*#__PURE__*/ template(`<div>`);
var _tmpl$3 = /*#__PURE__*/ template(`<div><h2 class=sr-only></h2><button type=button></button><div><canvas aria-hidden=true></canvas><div><div><div><div role=img><canvas aria-hidden=true></canvas><div aria-hidden=true></div></div><button type=button></button><div></div></div><div><div dir=ltr aria-hidden=true></div><span class=sr-only></span><div><span aria-hidden=true>✓</span></div><button type=button></button><div></div></div></div></div></div><div></div><button type=button><span></span></button><div class=sr-only role=status aria-live=polite>`);
var _tmpl$4 = /*#__PURE__*/ template(`<span>`);
var CARD_RADIUS = 28;
var PILL_HEIGHT = 28;
var RING_OFFSET = 14;
/** the card turning over */
var FLIP_DURATION = 400;
/** the code and the card's faces coming in without movement */
var FADE_DURATION = 180;
/** the code is a transfer link to the address, as on iOS */
var QR_PREFIX = "ton://transfer/";
/**
* iOS's geometry for a sheet `width` wide in a window at most `height` tall: the card is 256 wide where there is
* room, never under 216 unless the width says so; a small card tightens the gaps
*/
function receiveLayout(width, height) {
	const widthLimited = Math.max(1, width - 104);
	const cardWidth = Math.min(256, widthLimited, Math.max(Math.min(216, widthLimited), Math.max(1, height - 338)));
	const small = cardWidth < 230;
	const qrSize = Math.max(1, cardWidth - 20);
	const cardHeight = qrSize + PILL_HEIGHT + 24;
	const cardTop = small ? 58 : 70;
	const ringWidth = Math.max(1, Math.min(Math.max(1, width - 32), cardWidth + 76));
	return {
		width,
		small,
		cardWidth,
		cardHeight,
		cardTop,
		cardLeft: Math.floor((width - cardWidth) / 2),
		qrSize,
		imageSide: Math.max(1, qrSize - 12),
		ringWidth,
		ringHeight: cardHeight + 56,
		ringLeft: Math.floor((width - ringWidth) / 2),
		ringTop: cardTop - 28
	};
}
/** the tallest the wallet window may be (`--wallet-panel-max`), in the window the app is in (the tab, or its PiP) */
var windowHeight = () => mediaSizes.isMobile ? getAppWindow().innerHeight : Math.min(720, getAppWindow().innerHeight - 48);
/** a curve that goes there and back, as keyframes */
var arc = (frame) => Array.from({ length: 21 }, (_, index) => frame(Math.sin(Math.PI * index / 20)));
function WalletReceiveScreen(props) {
	const wallet = useWallet();
	const store = wallet.store;
	const address = () => store.friendlyAddress() || store.status().state?.address;
	const [layout, setLayout] = createSignal(receiveLayout(mediaSizes.isMobile ? getAppWindow().innerWidth : 420, windowHeight()));
	const [face, setFace] = createSignal(props.params?.face === "address" ? "address" : "qr");
	const [leaving, setLeaving] = createSignal();
	const [cutout, setCutout] = createSignal();
	const [flatGem, setFlatGem] = createSignal(!liteMode.isAvailable("animations"));
	const motion = createMemo(() => liteMode.isAvailable("motion"));
	const [fontsReady, setFontsReady] = createSignal(false);
	const [announcement, setAnnouncement] = createSignal("");
	const groups = createMemo(() => groupAddress(address() || "", 1));
	let root, ringCanvas, flip, qrBlock, qrCanvas, gemCanvas, gemHit;
	const faces = {}, shades = {};
	let ring, gem;
	let flipAnimations = [], flipTimeout;
	let codeSettled;
	wallet.router.holdEntrance(new Promise((resolve) => codeSettled = resolve));
	let code;
	/** the address whose code has come in: the reveal plays once per address */
	let revealedAddress;
	let revealPending = false;
	let reveal;
	let buildId = 0;
	const isFaceShown = (value) => face() === value || leaving() === value;
	const drawCode = () => {
		const ctx = qrCanvas.getContext("2d");
		ctx.setTransform(1, 0, 0, 1, 0, 0);
		ctx.clearRect(0, 0, qrCanvas.width, qrCanvas.height);
		ctx.drawImage(code.canvas, 0, 0);
	};
	const finishReveal = () => {
		if (revealPending || reveal) {
			revealPending = false;
			reveal = void 0;
			qrBlock.style.opacity = "";
			drawCode();
		}
	};
	createEffect(on([address, layout], async ([value, { imageSide }]) => {
		if (!value) return;
		const id = ++buildId;
		try {
			const matrix = code?.address === value ? code.matrix : await loadWalletQrMatrix(QR_PREFIX + value);
			if (id !== buildId) return;
			const qrLayout = layoutWalletQr(matrix, imageSide, pixelRatio());
			const canvas = document.createElement("canvas");
			paintWalletQr(canvas, matrix, qrLayout);
			code = {
				address: value,
				matrix,
				layout: qrLayout,
				canvas
			};
			qrCanvas.width = canvas.width;
			qrCanvas.height = canvas.height;
			const rect = qrLayout.cutoutRect;
			setCutout(rect);
			gem?.setCutout(rect.side);
			gem?.setCode(canvas, [rect.x + rect.side / 2, rect.y + rect.side / 2], imageSide);
			reveal = void 0;
			revealPending = revealedAddress !== value && liteMode.isAvailable("animations");
			if (!revealPending) {
				qrBlock.style.opacity = "";
				drawCode();
			}
		} catch (err) {
			console.error("wallet: QR paint failed", err);
		} finally {
			codeSettled();
		}
	}));
	onMount(() => {
		const screen = root.closest("[data-screen]");
		const measure = (width) => {
			const next = receiveLayout(width, windowHeight());
			const current = layout();
			if (next.width !== current.width || next.cardWidth !== current.cardWidth) setLayout(next);
		};
		measure(screen?.parentElement?.clientWidth || layout().width);
		const resizeObserver = new ResizeObserver(([entry]) => {
			if (entry.contentRect.width) measure(entry.contentRect.width);
		});
		resizeObserver.observe(root);
		const unbindResize = bindActiveWindowListener((win) => win, "resize", () => measure(layout().width));
		onCleanup(() => {
			resizeObserver.disconnect();
			unbindResize();
		});
		(document.fonts?.load(`500 13px "Roboto Mono"`) || Promise.resolve()).catch(() => {}).then(() => setFontsReady(true));
		if (!flatGem()) try {
			gem = new WalletQrGem(gemCanvas, gemHit, {
				motion: motion(),
				onHold: finishReveal
			});
			const rect = cutout();
			if (rect && code) {
				gem.setCutout(rect.side);
				gem.setCode(code.canvas, [rect.x + rect.side / 2, rect.y + rect.side / 2], code.layout.imageSide);
			}
		} catch (err) {
			console.warn("wallet: flat gem, no WebGL2", err);
			gem = void 0;
			setFlatGem(true);
		}
		if (!liteMode.isAvailable("animations")) return;
		const frame = (now) => {
			if (revealPending && code && isFaceShown("qr")) {
				revealPending = false;
				revealedAddress = code.address;
				reveal = {
					start: now,
					runner: motion() ? new WalletQrReveal(qrCanvas, code.canvas, code.layout) : void 0
				};
				if (motion()) gem?.drop(now);
				else drawCode();
			}
			if (reveal) {
				const elapsed = now - reveal.start;
				if (reveal.runner) {
					if (!reveal.runner.frame(elapsed)) reveal = void 0;
				} else if (elapsed >= FADE_DURATION / 1e3) {
					qrBlock.style.opacity = "";
					reveal = void 0;
				} else qrBlock.style.opacity = String(easeOut(elapsed / (FADE_DURATION / 1e3)));
			}
			if (motion()) ring?.frame(now);
			if (gem && code && isFaceShown("qr")) gem.frame(now);
		};
		const detach = addWalletFrameClient({
			frame,
			isVisible: () => wallet.shown() && !!screen && !screen.hidden,
			element: root,
			isBusy: () => revealPending || !!reveal || !!gem?.busy,
			onHidden: () => {
				finishReveal();
				ring?.resetClock();
				gem?.resetClock();
			}
		});
		onCleanup(detach);
	});
	createEffect(on(motion, (value) => {
		gem?.setMotion(value);
		ring?.resetClock();
	}, { defer: true }));
	onCleanup(() => {
		flipAnimations.forEach((animation) => animation.cancel());
		clearTimeout(flipTimeout);
		gem?.destroy();
	});
	createEffect(() => {
		const value = address(), { ringWidth, ringHeight, cardWidth, cardHeight } = layout();
		if (!fontsReady()) return;
		ring ?? (ring = new WalletAddressRing(ringCanvas));
		ring.setup(value, {
			width: ringWidth,
			height: ringHeight,
			cardWidth,
			cardHeight,
			cardRadius: CARD_RADIUS,
			offset: RING_OFFSET
		}, pixelRatio());
	});
	/**
	* The card turns over to the other face: half a turn about its vertical axis with a dip in size and a shade at
	* the edge; without movement the faces crossfade. Nothing on it answers until it is done.
	*/
	const turn = (to) => {
		const from = face();
		if (from === to || leaving()) return;
		const outgoing = faces[from], incoming = faces[to];
		const hadFocus = Modes.a11y && outgoing.contains(outgoing.ownerDocument.activeElement);
		const done = () => {
			flipAnimations.forEach((animation) => animation.cancel());
			flipAnimations = [];
			clearTimeout(flipTimeout);
			setLeaving();
			if (hadFocus) incoming.querySelector("button")?.focus({ preventScroll: true });
		};
		if (!liteMode.isAvailable("animations")) {
			setFace(to);
			done();
			return;
		}
		batch(() => {
			setLeaving(from);
			setFace(to);
		});
		if (liteMode.isAvailable("motion")) {
			const options = {
				duration: FLIP_DURATION,
				easing: "ease-out",
				fill: "both"
			};
			const half = langPack_default.getIsRTL() ? -180 : 180;
			flipAnimations = [
				outgoing.animate([{ transform: "rotateY(0deg)" }, { transform: `rotateY(${half}deg)` }], options),
				incoming.animate([{ transform: `rotateY(${-half}deg)` }, { transform: "rotateY(0deg)" }], options),
				flip.animate(arc((value) => ({ transform: `scale(${1 - .1 * value})` })), options),
				shades[from].animate(arc((value) => ({ opacity: .55 * value })), options),
				shades[to].animate(arc((value) => ({ opacity: .55 * value })), options)
			];
		} else {
			const options = {
				duration: FADE_DURATION,
				easing: "ease-in-out",
				fill: "both"
			};
			flipAnimations = [outgoing.animate([{ opacity: 1 }, { opacity: 0 }], options), incoming.animate([{ opacity: 0 }, { opacity: 1 }], options)];
		}
		flipTimeout = window.setTimeout(done, (liteMode.isAvailable("motion") ? FLIP_DURATION : FADE_DURATION) + 20);
	};
	const copyAddress = () => {
		const value = address();
		if (!value || leaving()) return;
		copyTextToClipboard(value);
		setAnnouncement(langPack_default.format("WalletAddressCopiedShort", true));
		turn("address");
	};
	const showQr = () => {
		if (leaving()) return;
		setAnnouncement("");
		turn("qr");
	};
	const [onramp, setOnramp] = createSignal();
	const [opening, setOpening] = createSignal(false);
	rootScope.managers.appWalletManager.isOnrampAvailable().then((available) => setOnramp(available), () => setOnramp(false));
	const buy = async () => {
		const available = onramp(), value = address();
		if (available === void 0 || opening() || !value) return;
		if (!available) {
			showWalletAlert({
				title: "Wallet.Receive.PurchaseUnavailableTitle",
				text: "Wallet.Receive.PurchaseUnavailableText"
			});
			return;
		}
		setOpening(true);
		try {
			const session = await rootScope.managers.appWalletManager.createOnrampSession(value);
			if (!session?.url || !wrapUrl(session.url).onclick) throw new Error("wallet: the onramp link is not an app link");
			const appImManager = hotReloadGuard.appImManager;
			wallet.close();
			appImManager.openUrl(session.url);
		} catch (err) {
			setOpening(false);
			showWalletAlert({
				title: "Wallet.Receive.PurchaseFailedTitle",
				text: "Wallet.Receive.PurchaseFailedText"
			});
		}
	};
	const gemCenter = () => {
		const rect = cutout();
		return rect && {
			left: `${6 + rect.x + rect.side / 2}px`,
			top: `${6 + rect.y + rect.side / 2}px`
		};
	};
	return (() => {
		var _el$ = _tmpl$3(), _el$2 = _el$.firstChild, _el$3 = _el$2.nextSibling, _el$4 = _el$3.nextSibling, _el$5 = _el$4.firstChild, _el$6 = _el$5.nextSibling, _el$7 = _el$6.firstChild, _el$8 = _el$7.firstChild, _el$9 = _el$8.firstChild, _el$0 = _el$9.firstChild, _el$1 = _el$0.nextSibling, _el$12 = _el$9.nextSibling, _el$13 = _el$12.nextSibling, _el$14 = _el$8.nextSibling, _el$15 = _el$14.firstChild, _el$16 = _el$15.nextSibling, _el$17 = _el$16.nextSibling, _el$18 = _el$17.firstChild, _el$19 = _el$17.nextSibling, _el$20 = _el$19.nextSibling, _el$21 = _el$4.nextSibling, _el$22 = _el$21.nextSibling, _el$23 = _el$22.firstChild, _el$24 = _el$22.nextSibling;
		var _ref$ = root;
		typeof _ref$ === "function" ? use(_ref$, _el$) : root = _el$;
		insert(_el$2, () => i18n("WalletAddFunds"));
		_el$3.$$click = () => wallet.router.pop();
		insert(_el$3, createComponent(IconTsx, { icon: "close" }));
		var _ref$2 = ringCanvas;
		typeof _ref$2 === "function" ? use(_ref$2, _el$5) : ringCanvas = _el$5;
		var _ref$3 = flip;
		typeof _ref$3 === "function" ? use(_ref$3, _el$7) : flip = _el$7;
		use((element) => faces.qr = element, _el$8);
		var _ref$4 = qrBlock;
		typeof _ref$4 === "function" ? use(_ref$4, _el$9) : qrBlock = _el$9;
		var _ref$5 = qrCanvas;
		typeof _ref$5 === "function" ? use(_ref$5, _el$0) : qrCanvas = _el$0;
		insert(_el$1, createComponent(Show, {
			get when() {
				return !flatGem();
			},
			get fallback() {
				return createComponent(IconTsx, {
					icon: "gram_filled",
					get ["class"]() {
						return receive_module_default.gemFlat;
					},
					get style() {
						return { "font-size": `${(cutout()?.side || 0) * .72}px` };
					}
				});
			},
			get children() {
				return [(() => {
					var _el$10 = _tmpl$();
					var _ref$6 = gemCanvas;
					typeof _ref$6 === "function" ? use(_ref$6, _el$10) : gemCanvas = _el$10;
					createRenderEffect(() => className(_el$10, receive_module_default.gemCanvas));
					return _el$10;
				})(), (() => {
					var _el$11 = _tmpl$2();
					var _ref$7 = gemHit;
					typeof _ref$7 === "function" ? use(_ref$7, _el$11) : gemHit = _el$11;
					createRenderEffect(() => className(_el$11, receive_module_default.gemHit));
					return _el$11;
				})()];
			}
		}));
		_el$12.$$click = copyAddress;
		insert(_el$12, createComponent(IconTsx, {
			icon: "copy",
			get ["class"]() {
				return receive_module_default.pillIcon;
			}
		}), null);
		insert(_el$12, () => i18n("WalletCopyAddress"), null);
		use((element) => shades.qr = element, _el$13);
		use((element) => faces.address = element, _el$14);
		insert(_el$15, createComponent(For, {
			get each() {
				return groups();
			},
			children: (group, index) => (() => {
				var _el$25 = _tmpl$4();
				insert(_el$25, group);
				createRenderEffect(() => className(_el$25, index() % 2 ? receive_module_default.groupOdd : void 0));
				return _el$25;
			})()
		}));
		insert(_el$16, address);
		insert(_el$17, () => i18n("WalletAddressCopiedShort"), null);
		_el$19.$$click = showQr;
		insert(_el$19, () => i18n("WalletShowMyQR"));
		use((element) => shades.address = element, _el$20);
		insert(_el$21, () => i18n("WalletReceiveInfo"));
		_el$22.$$click = buy;
		insert(_el$23, createComponent(IconTsx, {
			icon: "dollar_circle",
			get ["class"]() {
				return receive_module_default.buyIcon;
			}
		}), null);
		insert(_el$23, () => i18n("WalletBuyWithCashOrCrypto"), null);
		insert(_el$22, createComponent(Show, {
			get when() {
				return opening();
			},
			get children() {
				return createComponent(PreloaderTsx, { get ["class"]() {
					return receive_module_default.buySpinner;
				} });
			}
		}), null);
		insert(_el$24, announcement);
		createRenderEffect((_p$) => {
			var _v$ = classNames(receive_module_default.root, "no-scrollbar", layout().small && receive_module_default.small), _v$2 = receive_module_default.close, _v$3 = langPack_default.format("Close", true), _v$4 = receive_module_default.stage, _v$5 = `${layout().ringTop + layout().ringHeight}px`, _v$6 = receive_module_default.ring, _v$7 = `${layout().ringLeft}px`, _v$8 = `${layout().ringTop}px`, _v$9 = `${layout().ringWidth}px`, _v$0 = `${layout().ringHeight}px`, _v$1 = receive_module_default.card, _v$10 = `${layout().cardLeft}px`, _v$11 = `${layout().cardTop}px`, _v$12 = `${layout().cardWidth}px`, _v$13 = `${layout().cardHeight}px`, _v$14 = classNames(receive_module_default.flip, leaving() && receive_module_default.flipping), _v$15 = receive_module_default.face, _v$16 = !isFaceShown("qr"), _v$17 = face() !== "qr" || void 0, _v$18 = receive_module_default.qr, _v$19 = langPack_default.format("QRCode.Title", true), _v$20 = `${layout().qrSize}px`, _v$21 = `${layout().qrSize}px`, _v$22 = receive_module_default.qrCanvas, _v$23 = `${layout().imageSide}px`, _v$24 = `${layout().imageSide}px`, _v$25 = receive_module_default.gem, _v$26 = gemCenter(), _v$27 = !cutout(), _v$28 = receive_module_default.pill, _v$29 = !address(), _v$30 = receive_module_default.shade, _v$31 = receive_module_default.face, _v$32 = !isFaceShown("address"), _v$33 = face() !== "address" || void 0, _v$34 = receive_module_default.grid, _v$35 = `${layout().small ? 34 : 54}px`, _v$36 = receive_module_default.copied, _v$37 = `${(layout().small ? 42 : 70) + Math.ceil(groups().length / 3) * 26}px`, _v$38 = receive_module_default.check, _v$39 = receive_module_default.pill, _v$40 = receive_module_default.shade, _v$41 = receive_module_default.text, _v$42 = classNames(receive_module_default.buy, opening() && receive_module_default.buyOpening), _v$43 = onramp() === void 0 || opening() || void 0, _v$44 = opening() || void 0, _v$45 = receive_module_default.buyContent;
			_v$ !== _p$.e && className(_el$, _p$.e = _v$);
			_v$2 !== _p$.t && className(_el$3, _p$.t = _v$2);
			_v$3 !== _p$.a && setAttribute(_el$3, "aria-label", _p$.a = _v$3);
			_v$4 !== _p$.o && className(_el$4, _p$.o = _v$4);
			_v$5 !== _p$.i && setStyleProperty(_el$4, "height", _p$.i = _v$5);
			_v$6 !== _p$.n && className(_el$5, _p$.n = _v$6);
			_v$7 !== _p$.s && setStyleProperty(_el$5, "left", _p$.s = _v$7);
			_v$8 !== _p$.h && setStyleProperty(_el$5, "top", _p$.h = _v$8);
			_v$9 !== _p$.r && setStyleProperty(_el$5, "width", _p$.r = _v$9);
			_v$0 !== _p$.d && setStyleProperty(_el$5, "height", _p$.d = _v$0);
			_v$1 !== _p$.l && className(_el$6, _p$.l = _v$1);
			_v$10 !== _p$.u && setStyleProperty(_el$6, "left", _p$.u = _v$10);
			_v$11 !== _p$.c && setStyleProperty(_el$6, "top", _p$.c = _v$11);
			_v$12 !== _p$.w && setStyleProperty(_el$6, "width", _p$.w = _v$12);
			_v$13 !== _p$.m && setStyleProperty(_el$6, "height", _p$.m = _v$13);
			_v$14 !== _p$.f && className(_el$7, _p$.f = _v$14);
			_v$15 !== _p$.y && className(_el$8, _p$.y = _v$15);
			_v$16 !== _p$.g && (_el$8.hidden = _p$.g = _v$16);
			_v$17 !== _p$.p && (_el$8.inert = _p$.p = _v$17);
			_v$18 !== _p$.b && className(_el$9, _p$.b = _v$18);
			_v$19 !== _p$.T && setAttribute(_el$9, "aria-label", _p$.T = _v$19);
			_v$20 !== _p$.A && setStyleProperty(_el$9, "width", _p$.A = _v$20);
			_v$21 !== _p$.O && setStyleProperty(_el$9, "height", _p$.O = _v$21);
			_v$22 !== _p$.I && className(_el$0, _p$.I = _v$22);
			_v$23 !== _p$.S && setStyleProperty(_el$0, "width", _p$.S = _v$23);
			_v$24 !== _p$.W && setStyleProperty(_el$0, "height", _p$.W = _v$24);
			_v$25 !== _p$.C && className(_el$1, _p$.C = _v$25);
			_p$.B = style(_el$1, _v$26, _p$.B);
			_v$27 !== _p$.v && (_el$1.hidden = _p$.v = _v$27);
			_v$28 !== _p$.k && className(_el$12, _p$.k = _v$28);
			_v$29 !== _p$.x && (_el$12.disabled = _p$.x = _v$29);
			_v$30 !== _p$.j && className(_el$13, _p$.j = _v$30);
			_v$31 !== _p$.q && className(_el$14, _p$.q = _v$31);
			_v$32 !== _p$.z && (_el$14.hidden = _p$.z = _v$32);
			_v$33 !== _p$.P && (_el$14.inert = _p$.P = _v$33);
			_v$34 !== _p$.H && className(_el$15, _p$.H = _v$34);
			_v$35 !== _p$.F && setStyleProperty(_el$15, "top", _p$.F = _v$35);
			_v$36 !== _p$.M && className(_el$17, _p$.M = _v$36);
			_v$37 !== _p$.D && setStyleProperty(_el$17, "top", _p$.D = _v$37);
			_v$38 !== _p$.R && className(_el$18, _p$.R = _v$38);
			_v$39 !== _p$.E && className(_el$19, _p$.E = _v$39);
			_v$40 !== _p$.L && className(_el$20, _p$.L = _v$40);
			_v$41 !== _p$.N && className(_el$21, _p$.N = _v$41);
			_v$42 !== _p$.G && className(_el$22, _p$.G = _v$42);
			_v$43 !== _p$.U && setAttribute(_el$22, "aria-disabled", _p$.U = _v$43);
			_v$44 !== _p$.K && setAttribute(_el$22, "aria-busy", _p$.K = _v$44);
			_v$45 !== _p$.V && className(_el$23, _p$.V = _v$45);
			return _p$;
		}, {
			e: void 0,
			t: void 0,
			a: void 0,
			o: void 0,
			i: void 0,
			n: void 0,
			s: void 0,
			h: void 0,
			r: void 0,
			d: void 0,
			l: void 0,
			u: void 0,
			c: void 0,
			w: void 0,
			m: void 0,
			f: void 0,
			y: void 0,
			g: void 0,
			p: void 0,
			b: void 0,
			T: void 0,
			A: void 0,
			O: void 0,
			I: void 0,
			S: void 0,
			W: void 0,
			C: void 0,
			B: void 0,
			v: void 0,
			k: void 0,
			x: void 0,
			j: void 0,
			q: void 0,
			z: void 0,
			P: void 0,
			H: void 0,
			F: void 0,
			M: void 0,
			D: void 0,
			R: void 0,
			E: void 0,
			L: void 0,
			N: void 0,
			G: void 0,
			U: void 0,
			K: void 0,
			V: void 0
		});
		return _el$;
	})();
}
delegateEvents(["click"]);
//#endregion
export { WalletReceiveScreen as default };
