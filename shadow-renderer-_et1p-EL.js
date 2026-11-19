//# allFunctionsCalledOnLoad
import { t as _defineProperty } from "./defineProperty-_J0dqq22.js";
import { n as claimOf, t as GestureArbiter } from "./gesture-policy-Ba1jg4xj.js";
import { d as PROFILE_UA_STYLESHEET, t as EVENT_TYPES } from "./protocol-C2byfLMO.js";
import { s as THEME_VARIABLES, v as contentSafeAreaVariables, x as themeVariables } from "./sdk-policy-J1ymCNEZ.js";
var PAINT_LIMIT_CODES = [
	"paint-limit",
	"backdrop-limit",
	"layout-limit"
];
var word = (v) => (v ?? "").trim().toLowerCase();
var isNone = (v) => {
	const w = word(v);
	return w === "" || w === "none";
};
/** The comma-separated layers of a list value, commas inside parentheses kept. */
function layers(value) {
	const out = [];
	let depth = 0, from = 0;
	for (let i = 0; i < value.length; i++) {
		const c = value[i];
		if (c === "(") depth++;
		else if (c === ")") depth = Math.max(0, depth - 1);
		else if (c === "," && depth === 0) {
			out.push(value.slice(from, i));
			from = i + 1;
		}
	}
	out.push(value.slice(from));
	return out.map((l) => l.trim()).filter(Boolean);
}
var LENGTH = /^[+-]?(\d+\.?\d*|\.\d+)(e[+-]?\d+)?[a-z%]*$/i;
var MATH = /^(calc|min|max|clamp)$/i;
/** The lengths of one shadow layer in order (offset x, offset y, blur, spread); NaN for a math function's. */
function layerLengths(layer) {
	const out = [];
	let i = 0;
	while (i < layer.length) {
		if (/\s/.test(layer[i])) {
			i++;
			continue;
		}
		let j = i;
		while (j < layer.length && !/[\s(]/.test(layer[j])) j++;
		const token = layer.slice(i, j);
		if (layer[j] === "(") {
			let depth = 0, k = j;
			for (; k < layer.length; k++) if (layer[k] === "(") depth++;
			else if (layer[k] === ")" && --depth === 0) {
				k++;
				break;
			}
			if (MATH.test(token)) out.push(NaN);
			i = k;
			continue;
		}
		if (LENGTH.test(token)) out.push(parseFloat(token));
		i = j;
	}
	return out;
}
/** Whether a layer's blur radius (its third length) is above 0; one of unknown size (calc()) counts as blurred. */
function layerBlurred(layer) {
	const n = layerLengths(layer);
	return n.length >= 3 && !(n[2] <= 0);
}
/** Rule 1: whether a computed `box-shadow` has a layer with a blur radius above 0. */
function boxShadowBlurred(value) {
	if (isNone(value)) return false;
	return layers(value).some(layerBlurred);
}
/** The layers of a `box-shadow` without the blurred ones ('none' when nothing is left): what a stopped widget keeps. */
function boxShadowWithoutBlur(value) {
	if (isNone(value)) return "none";
	const kept = layers(value).filter((l) => !layerBlurred(l));
	return kept.length ? kept.join(", ") : "none";
}
/** Rule 4: `opacity` below 1 (a percentage is a share; a value that is no number is 1). */
function transparent(value) {
	if (typeof value === "number") return value < 1;
	const w = word(value);
	if (!w) return false;
	return (w.endsWith("%") ? parseFloat(w) / 100 : parseFloat(w)) < 1;
}
/** `display: none` on an element: neither it nor anything under it builds a box. */
function hidesSubtree(display) {
	return word(display) === "none";
}
/**
* The box an element (or, with `pseudo`, its ::before / ::after) builds and what it adds, from its computed values;
* null when it builds none (`display: none` or `contents`; a pseudo-element whose content is none / normal). Rules 1–4
* (a disabled or pressed `<button>`'s opacity aside); a running animation (rule 5) is PaintCounter's.
*/
function boxPaint(style, pseudo = false) {
	const display = word(style.display);
	if (display === "none" || !pseudo && display === "contents") return null;
	if (pseudo) {
		const content = word(style.content);
		if (content === "" || content === "none" || content === "normal") return null;
	}
	const backdrop = !isNone(style.backdropFilter);
	const dimmedButton = !pseudo && (style.button === "disabled" || style.button === "pressed");
	return {
		heavy: backdrop || !isNone(style.filter) || !dimmedButton && transparent(style.opacity) || boxShadowBlurred(style.boxShadow),
		backdrop
	};
}
/** A property name as CSS writes it: camelCase (`boxShadow`, from getKeyframes) to kebab, the vendor prefix dropped. */
function cssName(name) {
	return name.replace(/[A-Z]/g, (c) => "-" + c.toLowerCase()).toLowerCase().replace(/^-(webkit|moz|ms|o)-/, "");
}
var KEYFRAME_MEMBERS$1 = /* @__PURE__ */ new Set([
	"offset",
	"computedoffset",
	"easing",
	"composite"
]);
/**
* Rule 5: what an animation with these keyframes adds to its box while it runs; null when it changes none of
* filter, backdrop-filter and opacity, and box-shadow only between layers without blur (every keyframe from the first
* to the last sets it, none with a blurred layer; a value that is not a string is unknown, so blurred).
*/
function animationPaint(keyframes) {
	let heavy = false, backdrop = false, shadow = false, shadowBlurred = false, shadowFirst = false, shadowLast = false;
	for (const k of keyframes) {
		const at = typeof k.computedOffset === "number" ? k.computedOffset : typeof k.offset === "number" ? k.offset : null;
		for (const p of Object.keys(k)) {
			if (KEYFRAME_MEMBERS$1.has(p.toLowerCase())) continue;
			const name = cssName(p);
			if (name === "backdrop-filter") heavy = backdrop = true;
			else if (name === "filter" || name === "opacity") heavy = true;
			else if (name === "box-shadow") {
				shadow = true;
				const v = k[p];
				if (typeof v !== "string" || boxShadowBlurred(v)) shadowBlurred = true;
				if (at === 0) shadowFirst = true;
				if (at === 1) shadowLast = true;
			}
		}
	}
	if (shadow && (shadowBlurred || !shadowFirst || !shadowLast)) heavy = true;
	return heavy ? {
		heavy,
		backdrop
	} : null;
}
/** The reason a host stops the widget with (`onDead`, the diagnostics), the same on every platform. */
function paintLimitMessage(code, count) {
	if (code === "layout-limit") return `Layout limit exceeded: ${count} boxes to lay out afresh, of nested grids`;
	return code === "backdrop-limit" ? `Paint limit exceeded: ${count} boxes with backdrop-filter (max 2)` : `Paint limit exceeded: ${count} boxes with shadows, filters or transparency (max 16)`;
}
/** A renderer's `limit` report as the host takes it: a known code and a count (a whole number from 0); null otherwise. */
function checkPaintLimit(code, count) {
	if (!PAINT_LIMIT_CODES.includes(code)) return null;
	if (typeof count !== "number" || !Number.isFinite(count) || count < 0) return null;
	return {
		code,
		count: Math.floor(count)
	};
}
/**
* The renderer's ledger of heavy boxes, by any key it gives a box (the core uses node id × 4 + 0 / 1 / 2 for the
* element, ::before, ::after). It keeps the two counts current as boxes change and animations start and end, and gives
* the verdict when the renderer is about to draw: the first one past a limit sticks (the widget stops there).
*/
var PaintCounter = class {
	constructor() {
		_defineProperty(this, "boxes", /* @__PURE__ */ new Map());
		_defineProperty(this, "heavyBoxes", 0);
		_defineProperty(this, "backdropBoxes", 0);
		_defineProperty(this, "stopped", null);
		_defineProperty(
			this,
			/** The most heavy boxes there were at once, and with backdrop-filter. */
			"peakHeavy",
			0
		);
		_defineProperty(this, "peakBackdrop", 0);
	}
	get heavy() {
		return this.heavyBoxes;
	}
	get backdrop() {
		return this.backdropBoxes;
	}
	contribution(b) {
		if (!b || !b.paint) return {
			heavy: false,
			backdrop: false
		};
		let heavy = b.paint.heavy, backdrop = b.paint.backdrop;
		if (b.anims) for (const a of b.anims.values()) {
			heavy = true;
			if (a.backdrop) backdrop = true;
		}
		return {
			heavy,
			backdrop
		};
	}
	/** Applies `change` to the box of `key` and keeps the counts in step. */
	update(key, change) {
		let b = this.boxes.get(key);
		const before = this.contribution(b);
		if (!b) b = {
			paint: null,
			anims: null
		};
		change(b);
		const after = this.contribution(b);
		this.heavyBoxes += Number(after.heavy) - Number(before.heavy);
		this.backdropBoxes += Number(after.backdrop) - Number(before.backdrop);
		if (b.paint || b.anims) this.boxes.set(key, b);
		else this.boxes.delete(key);
		if (this.heavyBoxes > this.peakHeavy) this.peakHeavy = this.heavyBoxes;
		if (this.backdropBoxes > this.peakBackdrop) this.peakBackdrop = this.backdropBoxes;
	}
	/** The box's computed values (`boxPaint`), or null: it builds no box now (display contents, a pseudo-element without content); its animations stay. */
	setBox(key, paint) {
		if (!paint && !this.boxes.has(key)) return;
		this.update(key, (b) => {
			b.paint = paint ? {
				heavy: paint.heavy,
				backdrop: paint.backdrop
			} : null;
		});
	}
	/** The box is not rendered (`display: none` on it or an ancestor), or its node left the document: its CSS animations are cancelled with it. */
	removeBox(key) {
		if (this.boxes.has(key)) this.update(key, (b) => {
			b.paint = null;
			b.anims = null;
		});
	}
	/** An animation of rule 5 started on the box (`animationPaint` of its properties); `id` tells it from the box's others. */
	startAnimation(key, id, paint) {
		this.update(key, (b) => {
			b.anims ?? (b.anims = /* @__PURE__ */ new Map());
			const a = b.anims.get(id);
			if (a) {
				a.n++;
				a.backdrop || (a.backdrop = paint.backdrop);
			} else b.anims.set(id, {
				n: 1,
				backdrop: paint.backdrop
			});
		});
	}
	/** That animation ended or was cancelled (an end without a start, a cancel during its delay, changes nothing). */
	endAnimation(key, id) {
		const a = this.boxes.get(key)?.anims?.get(id);
		if (!a) return;
		this.update(key, (b) => {
			if (--a.n > 0) return;
			b.anims.delete(id);
			if (!b.anims.size) b.anims = null;
		});
	}
	/** Whether the box of `key` has running animations under `id`. */
	animating(key, id) {
		return !!this.boxes.get(key)?.anims?.has(id);
	}
	/**
	* The verdict before a frame is drawn: null while both counts are within their limits; the first time one is past
	* its limit, `paint-limit` with the heavy count (checked first) or `backdrop-limit` with the backdrop count, and the
	* same verdict from then on.
	*/
	check() {
		if (this.stopped) return this.stopped;
		if (this.heavyBoxes > 16) this.stopped = {
			code: "paint-limit",
			count: this.heavyBoxes
		};
		else if (this.backdropBoxes > 2) this.stopped = {
			code: "backdrop-limit",
			count: this.backdropBoxes
		};
		return this.stopped;
	}
};
//#endregion
//#region src/vendor/widget-sandbox/src/shared/layout-policy.ts
/** The boxes one layout of a widget may make afresh: as many as a native renderer lays out (twidget's bound). */
var LAYOUT_BOXES = 1e5;
var layoutBudget = (nodes) => LAYOUT_BOXES + 50 * nodes;
/**
* Whether a declared `display` may compute to a grid container. A value the declaration takes from elsewhere may be one:
* a substitution (`var()`, `attr()`, `env()`; the sanitizer checks only what it sees) or a keyword that takes the
* parent's or a lower layer's value.
*/
function mayDisplayGrid(value) {
	return /grid|\b(?:var|attr|env)\(|^\s*(?:inherit|revert-layer)\s*$/i.test(value);
}
/** Whether a declared `all` may bring a grid's display with it. */
function mayAllGrid(value) {
	return /\b(?:var|attr|env)\(|^\s*(?:inherit|revert-layer)\s*$/i.test(value);
}
/**
* Whether declared animations may run anything (one of the @keyframes may set a display): an `animation-name` that is
* not `none`, or an `animation` shorthand with a substitution in it, whose longhands CSSOM gives as empty strings
* until the substitution is made.
*/
function mayAnimate(name, shorthand) {
	return !/^\s*(?:none\s*(?:,\s*none\s*)*)?$/i.test(name) || /\b(?:var|attr|env)\(/i.test(shorthand);
}
/**
* Pseudo-classes that only the widget's DOM decides, which changes by ops alone: kept (the renderer counts again after
* them). Not `:lang()` nor `:dir()`: an element without its own takes the page's, which the client changes as it runs.
*/
var STATIC_PSEUDO = /* @__PURE__ */ new Set([
	"root",
	"scope",
	"empty",
	"first-child",
	"last-child",
	"only-child",
	"first-of-type",
	"last-of-type",
	"only-of-type",
	"nth-child",
	"nth-last-child",
	"nth-of-type",
	"nth-last-of-type",
	"defined",
	"not"
]);
/** Pseudo-classes whose argument is a selector list matched as it is: widened inside. */
var LIST_PSEUDO = /* @__PURE__ */ new Set([
	"is",
	"where",
	"has",
	"matches",
	"any",
	"-webkit-any",
	"-moz-any"
]);
/** Pseudo-elements in their legacy one-colon spelling. */
var LEGACY_PSEUDO_ELEMENTS = /* @__PURE__ */ new Set([
	"before",
	"after",
	"first-line",
	"first-letter"
]);
/**
* Attributes that change without an op: the renderer's own (the theme's variables and a held play state in `style`,
* `data-tw-active` while pressed, `data-tw-frozen`) and a `<details>`' `open`, which a click toggles.
*/
var DYNAMIC_ATTRIBUTE = /^\[\s*(?:[\w*-]*\|)?(?:style|open|data-tw-[\w-]*)\s*(?:[~|^$*]?=|\])/i;
var IDENT_CHAR = /[\w-]/;
/** The end of the quoted string that starts at `from`. */
function stringEnd(s, from) {
	const quote = s[from];
	let i = from + 1;
	while (i < s.length && s[i] !== quote) i += s[i] === "\\" ? 2 : 1;
	return Math.min(i + 1, s.length);
}
/** The end of the bracketed or parenthesized part that opens at `from`, strings and escapes inside skipped. */
function groupEnd(s, from) {
	const open = s[from], close = open === "[" ? "]" : ")";
	let depth = 0;
	for (let i = from; i < s.length;) {
		const c = s[i];
		if (c === "\\") {
			i += 2;
			continue;
		}
		if (c === "\"" || c === "'") {
			i = stringEnd(s, i);
			continue;
		}
		if (c === open) depth++;
		else if (c === close && --depth === 0) return i + 1;
		i++;
	}
	return s.length;
}
function widen(s) {
	let out = "";
	let dynamic = false;
	for (let i = 0; i < s.length;) {
		const c = s[i];
		if (c === "\\") {
			out += s.slice(i, i + 2);
			i += 2;
			continue;
		}
		if (c === "\"" || c === "'") {
			const end = stringEnd(s, i);
			out += s.slice(i, end);
			i = end;
			continue;
		}
		if (c === "[") {
			const end = groupEnd(s, i);
			const attribute = s.slice(i, end);
			if (DYNAMIC_ATTRIBUTE.test(attribute)) {
				out += ":is(*)";
				dynamic = true;
			} else out += attribute;
			i = end;
			continue;
		}
		if (c !== ":") {
			out += c;
			i++;
			continue;
		}
		const element = s[i + 1] === ":";
		let j = i + (element ? 2 : 1);
		while (j < s.length && (IDENT_CHAR.test(s[j]) || s[j] === "\\")) j += s[j] === "\\" ? 2 : 1;
		const name = s.slice(i + (element ? 2 : 1), j).toLowerCase();
		let argument = null;
		if (s[j] === "(") {
			const end = groupEnd(s, j);
			argument = s.slice(j + 1, end - 1);
			j = end;
		}
		if (element || LEGACY_PSEUDO_ELEMENTS.has(name)) out += ":is(*)";
		else if (LIST_PSEUDO.has(name) && argument !== null) {
			const inner = widen(argument);
			out += ":" + name + "(" + inner.out + ")";
			dynamic || (dynamic = inner.dynamic);
		} else if (STATIC_PSEUDO.has(name) && (argument === null || !widen(argument).dynamic)) out += s.slice(i, j);
		else {
			out += ":is(*)";
			dynamic = true;
		}
		i = j;
	}
	return {
		out,
		dynamic
	};
}
/**
* `selector` (a list) widened to every element it may match before the DOM changes by an op: a state of the user's or
* an attribute the renderer or the browser writes counts as held both ways, a negation or a pseudo-class whose argument
* names one as matching, and a pseudo-element as its element.
*/
function widenSelector(selector) {
	return widen(selector).out;
}
//#endregion
//#region src/vendor/widget-sandbox/src/renderer/web-animations.ts
/**
* One per renderer instance: the shadow-DOM renderer puts many widgets in one
* page, and a widget must neither see nor drive another widget's animations.
*/
var AnimationState = class {
	constructor() {
		_defineProperty(this, "scripted", /* @__PURE__ */ new Map());
		_defineProperty(this, "cssIds", /* @__PURE__ */ new WeakMap());
		_defineProperty(this, "cssById", /* @__PURE__ */ new Map());
		_defineProperty(this, "cssSeq", 0);
		_defineProperty(
			this,
			/** tweb: where the engine last put a running scripted animation on this page's clock (held or gone: none). */
			"startTimes",
			/* @__PURE__ */ new Map()
		);
	}
};
/**
* tweb: a CSS transition, or a CSS animation, by what it has rather than by `instanceof`: once the widget's element is in
* another window (Document Picture-in-Picture) the ones its styles start can be of that window's realm (Firefox).
*/
var isCSSTransition = (a) => "transitionProperty" in a;
var isCSSAnimation = (a) => "animationName" in a;
/** Keyframe members; a CSS property of the same name never overrides them (validator.ts KEYFRAME_MEMBERS). */
var KEYFRAME_MEMBERS = /* @__PURE__ */ new Set([
	"offset",
	"easing",
	"composite",
	"computedOffset"
]);
function cssAnimationList(state, el, subtree, idOf) {
	const { cssIds, cssById } = state;
	const out = [];
	const index = /* @__PURE__ */ new Map();
	for (const a of el.getAnimations({ subtree })) {
		const isAnimation = isCSSAnimation(a);
		const isTransition = isCSSTransition(a);
		if (!isAnimation && !isTransition || a.currentTime === null) continue;
		let origin = cssIds.get(a);
		if (origin === void 0) {
			origin = ++state.cssSeq;
			cssIds.set(a, origin);
			cssById.set(origin, new WeakRef(a));
		}
		const target = a.effect?.target ?? null;
		const id = target ? idOf(target) : 0;
		if (!id) continue;
		const t = a.effect.getTiming();
		const n = index.get(id) ?? 0;
		index.set(id, n + 1);
		out.push({
			kind: isAnimation ? "animation" : "transition",
			id,
			name: isAnimation ? a.animationName : a.transitionProperty,
			index: n,
			origin,
			currentTime: a.currentTime,
			playbackRate: a.playbackRate,
			paused: a.playState === "paused",
			duration: typeof t.duration === "number" ? t.duration : 0,
			delay: t.delay,
			iterations: t.iterations === Infinity ? null : t.iterations,
			direction: t.direction,
			fill: t.fill,
			easing: t.easing
		});
	}
	return out;
}
var camel = (n) => n.startsWith("--") ? n : n === "float" ? "cssFloat" : n.replace(/^-(webkit|moz|ms)-/, "$1-").replace(/-([a-z])/g, (_, c) => c.toUpperCase());
/**
* tweb: this window's clock in the timeline of `el`'s document — another window's (Document Picture-in-Picture) counts
* from its own time origin.
*/
function timelineShift(el) {
	const view = el?.ownerDocument?.defaultView;
	return view && view !== window ? performance.timeOrigin - view.performance.timeOrigin : 0;
}
function applyAnims(state, now, anims, nodeById) {
	const { scripted, cssById } = state;
	const offset = performance.now() - Number(now);
	for (const r of anims) {
		if ("css" in r) {
			const a = cssById.get(r.css.origin)?.deref();
			if (!a || a.effect?.target !== nodeById(r.target)) continue;
			try {
				if (r.cancelled) a.cancel();
				else {
					a.playbackRate = r.playbackRate;
					if (r.holdTime !== null) {
						a.pause();
						a.currentTime = r.holdTime;
					} else a.startTime = r.startTime + offset + timelineShift(nodeById(r.target));
				}
			} catch {}
			continue;
		}
		const old = scripted.get(r.aid);
		state.startTimes.delete(r.aid);
		if ("remove" in r) {
			if (old) {
				old.cancel();
				scripted.delete(r.aid);
			}
			continue;
		}
		const el = nodeById(r.target);
		if (!(el instanceof Element)) {
			if (old) {
				old.cancel();
				scripted.delete(r.aid);
			}
			continue;
		}
		const frames = r.keyframes.map((k) => {
			const o = {};
			for (const name of Object.keys(k.values)) {
				const key = camel(name);
				if (!KEYFRAME_MEMBERS.has(key)) o[key] = k.values[name];
			}
			o.offset = k.offset;
			o.easing = k.easing;
			if (k.composite) o.composite = k.composite;
			return o;
		});
		const t = r.timing;
		const timing = {
			duration: t.duration,
			delay: t.delay,
			endDelay: t.endDelay,
			iterations: t.iterations === null ? Infinity : t.iterations,
			iterationStart: t.iterationStart,
			direction: t.direction,
			fill: t.fill,
			easing: t.easing
		};
		let a = old;
		try {
			const effect = a?.effect;
			if (!a || !effect || effect.target !== el) {
				if (a) a.cancel();
				a = new Animation(new KeyframeEffect(el, frames, {
					composite: r.composite,
					iterationComposite: r.iterationComposite,
					...timing
				}), el.ownerDocument.timeline);
				scripted.set(r.aid, a);
			} else {
				effect.setKeyframes(frames);
				effect.updateTiming(timing);
				effect.composite = r.composite;
				if ("iterationComposite" in effect) effect.iterationComposite = r.iterationComposite;
			}
			a.playbackRate = r.playbackRate;
			if (r.holdTime !== null) {
				a.pause();
				a.currentTime = r.holdTime;
			} else {
				a.startTime = r.startTime + offset + timelineShift(el);
				state.startTimes.set(r.aid, a.startTime);
			}
		} catch {
			try {
				a?.cancel();
			} catch {}
			scripted.delete(r.aid);
		}
	}
}
//#endregion
//#region src/vendor/widget-sandbox/src/renderer/touch-action.ts
/** The custom property that keeps the widget's own `touch-action` next to the engine's (it inherits, so an ancestor's value reaches its descendants, as `claimOf` reads the chain). */
var TOUCH_ACTION_CLAIM = "--tw-touch-action";
var VERTICAL = /* @__PURE__ */ new Set([
	"pan-y",
	"pan-up",
	"pan-down"
]);
/**
* The `touch-action` the engine gets for the widget's `value`: vertical panning in both directions is always allowed.
* `auto`, `manipulation`, the CSS-wide keywords and a value with `pan-y` stay; `none` becomes `pan-y`; `pan-up` and
* `pan-down` become `pan-y`; any other value gains `pan-y` (`pan-x` → `pan-x pan-y`, `pinch-zoom` → `pinch-zoom pan-y`).
*/
function engineTouchAction(value) {
	const words = value.trim().toLowerCase().split(/\s+/).filter(Boolean);
	if (words.length === 0) return value;
	if (words.length === 1 && [
		"auto",
		"manipulation",
		"inherit",
		"initial",
		"unset",
		"revert",
		"revert-layer",
		"pan-y"
	].includes(words[0])) return value;
	if (words.length === 1 && words[0] === "none") return "pan-y";
	if (words.includes("pan-y")) return value;
	return [...words.filter((w) => !VERTICAL.has(w)), "pan-y"].join(" ");
}
//#endregion
//#region src/vendor/widget-sandbox/src/renderer/core.ts
var SVG_NS = "http://www.w3.org/2000/svg";
var uncurry = (f) => (self, ...args) => f.apply(self, args);
var getter = (proto, name) => {
	const g = Object.getOwnPropertyDescriptor(proto, name).get;
	return (self) => g.call(self);
};
var setter = (proto, name) => {
	const s = Object.getOwnPropertyDescriptor(proto, name).set;
	return (self, v) => s.call(self, v);
};
var createElement = uncurry(Document.prototype.createElement);
var createElementNS = uncurry(Document.prototype.createElementNS);
var createTextNode = uncurry(Document.prototype.createTextNode);
var setAttribute = uncurry(Element.prototype.setAttribute);
var getAttribute = uncurry(Element.prototype.getAttribute);
var removeAttribute = uncurry(Element.prototype.removeAttribute);
var closest = uncurry(Element.prototype.closest);
var getBoundingClientRect = uncurry(Element.prototype.getBoundingClientRect);
var getClientRects = uncurry(Element.prototype.getClientRects);
var insertBefore = uncurry(Node.prototype.insertBefore);
var removeChild = uncurry(Node.prototype.removeChild);
var parentNodeOf = getter(Node.prototype, "parentNode");
var firstChildOf = getter(Node.prototype, "firstChild");
var nextSiblingOf = getter(Node.prototype, "nextSibling");
var localNameOf = getter(Element.prototype, "localName");
var setTextContent = setter(Node.prototype, "textContent");
var textContentOf = getter(Node.prototype, "textContent");
var setCharData = setter(CharacterData.prototype, "data");
var htmlStyleOf = getter(HTMLElement.prototype, "style");
var svgStyleOf = getter(SVGElement.prototype, "style");
var styleOf = (el) => el instanceof SVGElement ? svgStyleOf(el) : htmlStyleOf(el);
var sheetOf = getter(HTMLStyleElement.prototype, "sheet");
var isConnectedOf = getter(Node.prototype, "isConnected");
var matches = uncurry(Element.prototype.matches);
var getAnimationsOf = uncurry(Element.prototype.getAnimations);
/** Defense in depth: the validator never emits these, but the renderer refuses them regardless. */
var FORBIDDEN_TAGS = /* @__PURE__ */ new Set([
	"script",
	"iframe",
	"frame",
	"frameset",
	"object",
	"embed",
	"link",
	"meta",
	"base",
	"portal",
	"noscript",
	"set",
	"template",
	"audio",
	"video",
	"source",
	"track",
	"input",
	"select",
	"option",
	"optgroup",
	"textarea",
	"datalist",
	"fieldset",
	"progress",
	"meter",
	"form",
	"dialog"
]);
var FORBIDDEN_ATTRS = /* @__PURE__ */ new Set([
	"srcdoc",
	"srcset",
	"action",
	"formaction",
	"ping",
	"background",
	"nonce",
	"target",
	"http-equiv"
]);
var scrollTopSet = setter(Element.prototype, "scrollTop");
var scrollLeftSet = setter(Element.prototype, "scrollLeft");
var rectJson = (r, o) => {
	const dx = o?.x ?? 0, dy = o?.y ?? 0, s = o?.scale ?? 1;
	if (s !== 1) {
		const x = (r.x - dx) / s, y = (r.y - dy) / s, width = r.width / s, height = r.height / s;
		return {
			x,
			y,
			width,
			height,
			top: y,
			left: x,
			right: x + width,
			bottom: y + height
		};
	}
	return {
		x: r.x - dx,
		y: r.y - dy,
		width: r.width,
		height: r.height,
		top: r.top - dy,
		left: r.left - dx,
		right: r.right - dx,
		bottom: r.bottom - dy
	};
};
var matrixJson = (m) => m ? {
	a: m.a,
	b: m.b,
	c: m.c,
	d: m.d,
	e: m.e,
	f: m.f
} : null;
var ALWAYS_FORWARD = /* @__PURE__ */ new Set([
	"click",
	"load",
	"error",
	"toggle"
]);
var THROTTLED = /* @__PURE__ */ new Set(["pointermove", "mousemove"]);
/** What the widget can get: the profile's events (no keyboard, focus, touch, wheel or scroll; dblclick and contextmenu only the renderer's own). */
var ALL_EVENTS = [...EVENT_TYPES];
/** The engine's double click and context menu: never forwarded, the arbiter decides (gesture-policy.ts) and the renderer sends its own. */
var ENGINE_GESTURES = /* @__PURE__ */ new Set(["dblclick", "contextmenu"]);
/** Compatibility mouse events: they carry no pointerId, so they follow the press the bubble took. */
var MOUSE_COMPAT = /* @__PURE__ */ new Set([
	"mousedown",
	"mouseup",
	"mousemove",
	"click"
]);
var ENTER_LEAVE = [
	"pointerenter",
	"pointerleave",
	"mouseenter",
	"mouseleave"
];
/** Rule 5 of the heavy-box count (paint-policy.ts): a CSS animation or transition from its start event to its end or cancel. */
var PAINT_ANIMATION_EVENTS = [
	"animationstart",
	"animationend",
	"animationcancel",
	"transitionstart",
	"transitionend",
	"transitioncancel"
];
/** What moves :hover / :active (and a details element's `open`) without an op. */
var PAINT_INPUT_EVENTS = [
	"pointerover",
	"pointerout",
	"pointerdown",
	"pointerup",
	"pointercancel",
	"toggle"
];
var noop = () => {};
/**
* Input that belongs to the chat, never to the widget (D4, docs/profile-v1.md):
* keys and editing are swallowed (no Enter or Space activation), the platform's
* context menu is cancelled (the bubble's own menu wins), a mouse press neither
* moves the focus into the widget nor starts a text selection unless it lands on
* text the widget made selectable (`user-select: text`, D18), and the focus
* never stays in it.
*/
var SWALLOWED = [
	"keydown",
	"keyup",
	"keypress",
	"beforeinput",
	"input",
	"contextmenu",
	"mousedown",
	"focusin",
	"submit",
	"selectstart"
];
function decodeBase64(b64) {
	const bin = atob(b64);
	const out = new Uint8ClampedArray(bin.length);
	for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
	return out;
}
var emojiImages = /* @__PURE__ */ new Map();
/** The emoji's image if it is loaded; it starts loading otherwise. */
function emojiImage(src) {
	let image = emojiImages.get(src);
	if (!image) {
		image = new Image();
		image.src = src;
		emojiImages.set(src, image);
	}
	return image.complete && image.naturalWidth ? image : void 0;
}
function createRenderer(env) {
	const doc = env.doc;
	const root = env.root;
	const elementFromPoint = root instanceof Document ? uncurry(Document.prototype.elementFromPoint) : uncurry(ShadowRoot.prototype.elementFromPoint);
	let send = () => {};
	const post = (msg, transfer = []) => send(msg, transfer);
	const violation = (detail) => post({
		type: "violation",
		detail
	});
	let HTML;
	let HEAD;
	let BODY;
	const nodes = /* @__PURE__ */ new Map();
	const ids = /* @__PURE__ */ new WeakMap();
	const animations = new AnimationState();
	function register(id, node) {
		nodes.set(id, node);
		ids.set(node, id);
	}
	const wrapped = /* @__PURE__ */ new WeakMap();
	const TEXT_ONLY = /* @__PURE__ */ new Set([
		"style",
		"title",
		"textarea",
		"option",
		"script"
	]);
	const CLIENT_TEXT_CSS = "@layer tw-text{tw-text,tw-emoji{all:unset!important;direction:inherit!important;unicode-bidi:normal!important;pointer-events:none!important}tw-text{display:inline!important}tw-emoji{display:inline-block!important;width:1em!important;height:1em!important;vertical-align:-.15em!important;line-height:1!important;text-indent:100%!important;white-space:nowrap!important;overflow:hidden!important;color:transparent!important;text-shadow:none!important;background-position:center!important;background-size:contain!important;background-repeat:no-repeat!important}tw-text::before,tw-text::after,tw-emoji::before,tw-emoji::after{content:none!important}tw-emoji::first-letter,tw-emoji::first-line{all:unset!important}}";
	const EMOJI_PARTS = 1024;
	const EMOJI_PARTS_PER_SECOND = 2048;
	/** The extra parts the widget's texts stand in now, and those it may make now. */
	let emojiParts = 0;
	let emojiTokens = EMOJI_PARTS;
	let emojiTokensAt = 0;
	/**
	* `text` in its parts (env.emoji) if they fit the budget; `held`: the parts of the node's text it replaces (none for a
	* canvas's, which stays nowhere). The caller makes them, and pays with `spendEmoji`.
	*/
	function emojiRuns(text, held) {
		if (!text || !env.emoji) return;
		const now = performance.now();
		emojiTokens = Math.min(EMOJI_PARTS, emojiTokens + (now - emojiTokensAt) * EMOJI_PARTS_PER_SECOND / 1e3);
		emojiTokensAt = now;
		const room = Math.floor(held === void 0 ? emojiTokens : Math.min(emojiTokens, EMOJI_PARTS - emojiParts + held));
		const runs = env.emoji(text, room + 1);
		return runs && runs.length - 1 <= room ? runs : void 0;
	}
	function spendEmoji(runs) {
		emojiTokens -= runs.length - 1;
	}
	const isText = (node) => node.nodeType === 3;
	const takesEmoji = (parent) => !!parent && parent.nodeType === 1 && parent.namespaceURI === "http://www.w3.org/1999/xhtml" && !TEXT_ONLY.has(localNameOf(parent));
	/** What stands for a widget's node in its parent: the wrapper of a text shown with the client's emoji, else the node. */
	function outerOf(node) {
		const entry = isText(node) ? wrapped.get(node) : void 0;
		return entry?.active ? entry.wrapper : node;
	}
	/** Takes `t` out of its wrapper, back to where the wrapper stood. */
	function unwrap(t, wrapper) {
		const parent = parentNodeOf(wrapper);
		if (parent) {
			insertBefore(parent, t, wrapper);
			removeChild(parent, wrapper);
		} else removeChild(wrapper, t);
	}
	/** Shows `t`'s text as its parent takes it: wrapped with the client's emoji, or whole in the node. */
	function placeText(t) {
		const entry = wrapped.get(t);
		if (!entry) return;
		const { wrapper } = entry;
		const parent = entry.active ? parentNodeOf(wrapper) : parentNodeOf(t);
		if (!takesEmoji(parent)) {
			if (entry.active) unwrap(t, wrapper);
			entry.active = false;
			setCharData(t, entry.data);
			return;
		}
		if (!entry.active) {
			insertBefore(parent, wrapper, t);
			insertBefore(wrapper, t, firstChildOf(wrapper));
			entry.active = true;
		}
		setCharData(t, entry.lead);
	}
	function showText(t, data) {
		let entry = wrapped.get(t);
		const runs = emojiRuns(data, entry?.extra ?? 0);
		if (!runs) {
			if (entry) {
				if (entry.active) unwrap(t, entry.wrapper);
				emojiParts -= entry.extra;
				wrapped.delete(t);
			}
			setCharData(t, data);
			return;
		}
		spendEmoji(runs);
		if (!entry) {
			const wrapper = createElement(doc, "tw-text");
			wrapped.set(t, entry = {
				data,
				lead: "",
				wrapper,
				parts: [],
				extra: 0,
				active: false
			});
		}
		for (const part of entry.parts) removeChild(entry.wrapper, part);
		emojiParts += runs.length - 1 - entry.extra;
		entry.extra = runs.length - 1;
		entry.data = data;
		entry.lead = typeof runs[0] === "string" ? runs[0] : "";
		entry.parts = (entry.lead ? runs.slice(1) : runs).map((run) => {
			if (typeof run === "string") return createTextNode(doc, run);
			const el = createElement(doc, "tw-emoji");
			el.style.cssText = `background-image:url("${run.src.replace(/["\\\n]/g, "")}")!important`;
			setTextContent(el, run.emoji);
			emojiImage(run.src);
			return el;
		});
		for (const part of entry.parts) insertBefore(entry.wrapper, part, null);
		placeText(t);
	}
	function forget(node) {
		const id = ids.get(node);
		if (id !== void 0) {
			nodes.delete(id);
			ids.delete(node);
			canvases.delete(id);
			if (node instanceof Element) {
				resizeObserver.unobserve(node);
				observed.delete(node);
				heldPlayStates.delete(node);
				paintDirty.delete(node);
				paintDirtySelf.delete(node);
				inlineGrid.delete(node);
				for (const aid of animatedGrid.get(node) ?? []) gridAnimations.delete(aid);
				animatedGrid.delete(node);
			}
			if (node instanceof HTMLCanvasElement) {
				canvasPixelsTotal -= canvasPixels.get(node) ?? 0;
				canvasPixels.delete(node);
			}
			const entry = isText(node) ? wrapped.get(node) : void 0;
			if (entry) {
				emojiParts -= entry.extra;
				wrapped.delete(node);
			}
			if (node instanceof HTMLStyleElement && widgetStyles.delete(node)) {
				paintSheetsDirty = layoutSheetsDirty = true;
				paintEverything();
			}
		}
		for (let c = firstChildOf(node); c; c = nextSiblingOf(c)) forget(c);
	}
	/**
	* A canvas's bitmap is the page's memory, as large as the widget makes it (four canvases of 16384² grew a browser by
	* ~16 GB): a widget's canvases hold at most this many pixels together (64 MB as RGBA; a canvas over a whole bubble at
	* 3× is ~2.5 M). A size past it is not applied: the canvas keeps the one it had, a new one is 0 × 0.
	*/
	const CANVAS_PIXELS_MAX = 16777216;
	const canvasPixels = /* @__PURE__ */ new Map();
	let canvasPixelsTotal = 0;
	/** Charges `el` the size `w` × `h` if the widget's canvases can hold it together; false, and nothing charged, if not. */
	function fitCanvas(el, w, h) {
		const others = canvasPixelsTotal - (canvasPixels.get(el) ?? 0);
		if (!(others + w * h <= CANVAS_PIXELS_MAX)) {
			violation(`canvas ${w}×${h}: a widget's canvases hold at most ${CANVAS_PIXELS_MAX} pixels together`);
			return false;
		}
		canvasPixels.set(el, w * h);
		canvasPixelsTotal = others + w * h;
		return true;
	}
	/** Whether `el` may take `value` (null: none) as its `name`: anything but a canvas's width or height may. */
	function canvasSizeFits(el, name, value) {
		if (!(el instanceof HTMLCanvasElement) || name !== "width" && name !== "height") return true;
		const parsed = /^[\t\n\f\r ]*\+?(\d+)/.exec(value ?? "");
		const n = parsed ? Number(parsed[1]) : name === "width" ? 300 : 150;
		return fitCanvas(el, name === "width" ? n : el.width, name === "height" ? n : el.height);
	}
	function idOf(node) {
		for (let n = node; n; n = parentNodeOf(n)) {
			const id = ids.get(n);
			if (id !== void 0) return id;
		}
		return 0;
	}
	function applyAttr(el, name, value) {
		const lower = name.toLowerCase();
		if (lower.startsWith("on") || FORBIDDEN_ATTRS.has(lower)) return violation(`attribute ${name}`);
		if (el instanceof HTMLCanvasElement && (lower === "width" || lower === "height") && getAttribute(el, lower) === value) return;
		if (!canvasSizeFits(el, lower, value)) return;
		setAttribute(el, name, value);
		if (lower === "style") widenTouchAction(styleOf(el));
	}
	/** One declaration block: the engine gets the widened `touch-action`, the claim keeps the widget's own (same priority). */
	function widenTouchAction(style) {
		const value = style.getPropertyValue("touch-action");
		if (!value) return;
		const priority = style.getPropertyPriority("touch-action");
		style.setProperty(TOUCH_ACTION_CLAIM, value, priority);
		const engine = engineTouchAction(value);
		if (engine !== value) style.setProperty("touch-action", engine, priority);
	}
	/**
	* The element's own touch-action as the widget declared it: the claim property when the engine's value is that
	* value widened (the element declares it), else the engine's (`auto`: the claim property inherited from an ancestor).
	*/
	function ownTouchAction(cs) {
		const own = cs.getPropertyValue(TOUCH_ACTION_CLAIM).trim();
		const words = (v) => v.trim().toLowerCase().split(/\s+/).sort().join(" ");
		return own && words(cs.touchAction) === words(engineTouchAction(own)) ? own : cs.touchAction;
	}
	/**
	* Every rule of a `<style>` element's sheet (none until it is connected), nested rules included. tweb: `fresh`, only
	* the rules that do not carry the claim yet — a sheet parsed again from its text has lost what was widened.
	*/
	function widenSheet(el, fresh = false) {
		if (!(el instanceof HTMLStyleElement)) return;
		if (!/touch-action/i.test(el.textContent ?? "")) return;
		const sheet = sheetOf(el);
		if (!sheet) return;
		const walk = (rules) => {
			for (let i = 0; i < rules.length; i++) {
				const r = rules[i];
				if (r.style && !(fresh && r.style.getPropertyValue("--tw-touch-action"))) widenTouchAction(r.style);
				if (r.cssRules) walk(r.cssRules);
			}
		};
		walk(sheet.cssRules);
	}
	function applyOp(op) {
		switch (op.op) {
			case "el": {
				const tag = op.tag.toLowerCase();
				if (FORBIDDEN_TAGS.has(tag)) return violation(`element <${op.tag}>`);
				let el;
				if (op.adopt) canvasDirty = true;
				if (op.adopt === "html") el = HTML;
				else if (op.adopt === "head") el = HEAD;
				else if (op.adopt === "body") el = BODY;
				else el = op.ns === "svg" ? createElementNS(doc, SVG_NS, op.tag) : createElement(doc, op.tag);
				if (tag === "img" && !op.adopt) for (const type of ["load", "error"]) el.addEventListener(type, onDetachedImage);
				register(op.id, el);
				if (el instanceof HTMLCanvasElement && !fitCanvas(el, 300, 150)) {
					el.width = 0;
					el.height = 0;
				}
				for (const [name, value] of op.attrs) applyAttr(el, name, value);
				if (hostHidden) holdPlayState(el);
				return;
			}
			case "text": {
				const t = createTextNode(doc, "");
				register(op.id, t);
				return showText(t, op.data);
			}
			case "comment": return;
		}
		const node = nodes.get(op.id);
		if (!node) return;
		if (node === HTML || node === BODY || op.op === "css" || (op.op === "ins" || op.op === "rm") && node instanceof HTMLStyleElement) canvasDirty = true;
		switch (op.op) {
			case "attr": {
				const held = hostHidden && op.name.toLowerCase() === "style";
				if (held) releasePlayState(node);
				applyAttr(node, op.name, op.value);
				if (node === HTML && op.name.toLowerCase() === "style") applyThemeVariables();
				if (held) holdPlayState(node);
				return;
			}
			case "rattr": {
				if (!canvasSizeFits(node, op.name.toLowerCase(), null)) return;
				const held = hostHidden && op.name.toLowerCase() === "style";
				if (held) releasePlayState(node);
				removeAttribute(node, op.name);
				if (node === HTML && op.name.toLowerCase() === "style") applyThemeVariables();
				if (held) holdPlayState(node);
				return;
			}
			case "data": return isText(node) ? showText(node, op.data) : setCharData(node, op.data);
			case "ins": {
				if (node === HTML || node === HEAD || node === BODY) return;
				const outer = outerOf(node);
				if (op.parent === 0) {
					const p = parentNodeOf(outer);
					if (p) removeChild(p, outer);
					return;
				}
				const parent = nodes.get(op.parent);
				if (!parent) return;
				const before = op.before === null ? void 0 : nodes.get(op.before);
				const ref = before ? outerOf(before) : null;
				insertBefore(parent, outer, ref && parentNodeOf(ref) === parent ? ref : null);
				if (isText(node)) placeText(node);
				widenSheet(node);
				return;
			}
			case "rm": {
				if (node === HTML || node === HEAD || node === BODY) return;
				const outer = outerOf(node);
				const p = parentNodeOf(outer);
				if (p) removeChild(p, outer);
				forget(node);
				return;
			}
			case "style": {
				if (node === HTML && THEME_VARIABLES.includes(op.name)) return;
				const style = styleOf(node);
				const held = hostHidden && PLAY_STATE_STYLE.test(op.name);
				if (held) releasePlayState(node);
				if (op.name === "touch-action") style.removeProperty(TOUCH_ACTION_CLAIM);
				if (op.value === "") style.removeProperty(op.name);
				else style.setProperty(op.name, op.value, op.important ? "important" : "");
				if (op.name === "touch-action") widenTouchAction(style);
				if (held) holdPlayState(node);
				return;
			}
			case "css":
				if (localNameOf(node) === "style") {
					setTextContent(node, op.text);
					widenSheet(node);
				}
				return;
			case "prop": return applyProp(node, op.name, op.value);
			case "call": return applyCall(node, op.method, op.args);
			case "canvas":
				if (node instanceof HTMLCanvasElement) replay(op.id, node, op.cmds);
				return;
		}
	}
	function applyProp(el, name, value) {
		switch (name) {
			case "scrollTop": return scrollTopSet(el, value);
			case "scrollLeft": return scrollLeftSet(el, value);
		}
	}
	/** The profile's element methods (no focus, selection, dialogs, popovers or scrollIntoView: docs/profile-v1.md). */
	const METHOD_IMPL = {
		scrollTo: (el, a) => Element.prototype.scrollTo.call(el, a[0], a[1]),
		scrollBy: (el, a) => Element.prototype.scrollBy.call(el, a[0], a[1]),
		setPointerCapture: (el, a) => {
			if (!ownPointers.has(a[0])) return;
			try {
				Element.prototype.setPointerCapture.call(el, a[0]);
			} catch {}
		},
		releasePointerCapture: (el, a) => {
			try {
				Element.prototype.releasePointerCapture.call(el, a[0]);
			} catch {}
		},
		observeResize: (el) => {
			observed.add(el);
			resizeObserver.observe(el);
		},
		unobserveResize: (el) => {
			observed.delete(el);
			resizeObserver.unobserve(el);
		}
	};
	function applyCall(el, method, args) {
		const impl = Object.prototype.hasOwnProperty.call(METHOD_IMPL, method) ? METHOD_IMPL[method] : null;
		if (impl) impl(el, args);
	}
	const canvases = /* @__PURE__ */ new Map();
	function canvasState(id, el) {
		let st = canvases.get(id);
		if (!st) {
			const ctx = HTMLCanvasElement.prototype.getContext.call(el, "2d");
			if (!ctx) return null;
			st = {
				ctx,
				objects: /* @__PURE__ */ new Map(),
				paths: /* @__PURE__ */ new Map()
			};
			canvases.set(id, st);
		}
		return st;
	}
	function resolveArg(st, a) {
		if (a && typeof a === "object" && !Array.isArray(a)) {
			if ("g" in a) return st.objects.get(a.g) ?? void 0;
			if ("p" in a) return st.paths.get(a.p) ?? void 0;
			if ("n" in a) return nodes.get(a.n);
			if ("b64" in a) try {
				return new ImageData(decodeBase64(a.b64), a.w, a.h);
			} catch {
				return;
			}
		}
		return a;
	}
	const RTL_TEXT = /[\u0590-\u08FF\uFB1D-\uFDFF\uFE70-\uFEFF\u200F\u202B\u202E\u2067\u{10800}-\u{10FFF}\u{1E800}-\u{1EFFF}]/u;
	const fontSizeOf = (font) => parseFloat(/([\d.]+)px/.exec(font)?.[1] ?? "10");
	/**
	* Parts side by side composite as their whole only over what is there and with no shadow (one part's would fall on
	* another) or filter (one part's blur would): another composite operation, a shadow or a filter are outside profile 1,
	* which the validator drops, but the split must not rest on that. A filter Safari lacks reads undefined.
	*/
	const drawsInParts = (ctx) => ctx.globalCompositeOperation === "source-over" && (ctx.filter ?? "none") === "none" && !((ctx.shadowBlur || ctx.shadowOffsetX || ctx.shadowOffsetY) && !/, 0\)$/.test(ctx.shadowColor));
	/**
	* Where the alphabetic baseline of text drawn at `y` lies, whatever the text's baseline: from where a glyph's top is
	* under each (`actualBoundingBoxAscent`, which every engine has — Firefox gives no `alphabeticBaseline` without its
	* extended text metrics). NaN where it cannot be told.
	*/
	function alphabeticY(ctx, y) {
		const baseline = ctx.textBaseline;
		if (baseline === "alphabetic") return y;
		const under = ctx.measureText("H").actualBoundingBoxAscent;
		ctx.textBaseline = "alphabetic";
		const alphabetic = ctx.measureText("H").actualBoundingBoxAscent;
		ctx.textBaseline = baseline;
		return y - under + alphabetic;
	}
	function drawEmojiText(ctx, method, args) {
		const [text, x, y, maxWidth] = args;
		const runs = RTL_TEXT.test(String(text)) ? void 0 : emojiRuns(String(text));
		if (!runs || !drawsInParts(ctx)) return false;
		if (ctx.direction === "rtl" || ctx.direction === "inherit" && getComputedStyle(ctx.canvas).direction === "rtl") return false;
		const size = fontSizeOf(ctx.font);
		const top = alphabeticY(ctx, y) - .35 * size - size / 2;
		if (!Number.isFinite(top)) return false;
		spendEmoji(runs);
		const widths = runs.map((run) => ctx.measureText(typeof run === "string" ? run : run.emoji).width);
		const total = widths.reduce((a, b) => a + b, 0);
		const scale = maxWidth !== void 0 && total > maxWidth ? Math.max(maxWidth, 0) / total : 1;
		const align = ctx.textAlign;
		let at = x - (align === "center" ? total * scale / 2 : align === "right" || align === "end" ? total * scale : 0);
		ctx.save();
		ctx.textAlign = "left";
		ctx.imageSmoothingEnabled = true;
		runs.forEach((run, i) => {
			const width = widths[i] * scale;
			const image = typeof run === "string" ? void 0 : emojiImage(run.src);
			if (image) ctx.drawImage(image, at + (width - size * scale) / 2, top, size * scale, size);
			else if (scale !== 1) ctx[method](typeof run === "string" ? run : run.emoji, at, y, width);
			else ctx[method](typeof run === "string" ? run : run.emoji, at, y);
			at += width;
		});
		ctx.restore();
		return true;
	}
	function replay(id, el, cmds) {
		const st = canvasState(id, el);
		if (!st) return;
		const ctx = st.ctx;
		for (const cmd of cmds) try {
			const [kind, name, ...rest] = cmd;
			switch (kind) {
				case "c": {
					const args = rest.map((a) => resolveArg(st, a));
					if (args.includes(void 0)) break;
					if ((name === "fillText" || name === "strokeText") && drawEmojiText(ctx, name, args)) break;
					ctx[name](...args);
					break;
				}
				case "s":
					ctx[name] = resolveArg(st, rest[0]);
					break;
				case "r":
					if (!fitCanvas(el, name, rest[0])) {
						el.width = el.width;
						break;
					}
					el.width = name;
					el.height = rest[0];
					break;
				case "g": {
					const [type, ...args] = rest;
					let obj = null;
					if (type === "linear") obj = ctx.createLinearGradient(...args);
					else if (type === "radial") obj = ctx.createRadialGradient(...args);
					else if (type === "conic") obj = ctx.createConicGradient(...args);
					else if (type === "pattern") {
						const src = resolveArg(st, args[0]);
						if (src) obj = ctx.createPattern(src, args[1] ?? "repeat");
					}
					st.objects.set(name, obj);
					break;
				}
				case "gs":
					st.objects.get(name)?.addColorStop(rest[0], rest[1]);
					break;
				case "pn":
					st.paths.set(name, typeof rest[0] === "string" ? new Path2D(rest[0]) : new Path2D());
					break;
				case "pc": {
					const path = st.paths.get(name);
					const [method, ...args] = rest;
					if (path) path[method](...args.map((a) => resolveArg(st, a)));
					break;
				}
			}
		} catch {}
	}
	let scratch = null;
	function answer(q) {
		const el = "id" in q ? nodes.get(q.id) : null;
		if ("id" in q && !(el instanceof Element)) return { result: { error: "no such element" } };
		switch (q.q) {
			case "rect": return { result: rectJson(getBoundingClientRect(el), env.origin()) };
			case "rects": {
				const o = env.origin();
				return { result: Array.from(getClientRects(el), (r) => rectJson(r, o)) };
			}
			case "box": {
				const g = (name) => getter(Element.prototype, name)(el);
				const html = el instanceof HTMLElement;
				const h = (name) => html ? getter(HTMLElement.prototype, name)(el) : 0;
				return { result: {
					offsetWidth: h("offsetWidth"),
					offsetHeight: h("offsetHeight"),
					offsetTop: h("offsetTop"),
					offsetLeft: h("offsetLeft"),
					offsetParent: html ? idOf(h("offsetParent")) : 0,
					clientWidth: g("clientWidth"),
					clientHeight: g("clientHeight"),
					clientTop: g("clientTop"),
					clientLeft: g("clientLeft"),
					scrollWidth: g("scrollWidth"),
					scrollHeight: g("scrollHeight"),
					scrollTop: g("scrollTop"),
					scrollLeft: g("scrollLeft")
				} };
			}
			case "cs": {
				const cs = getComputedStyle(el, q.pseudo ?? null);
				const touchAction = () => ownTouchAction(cs);
				if (q.prop) return { result: q.prop === "touch-action" ? touchAction() : cs.getPropertyValue(q.prop) };
				const out = {};
				for (let i = 0; i < cs.length; i++) if (cs[i] !== "--tw-touch-action") out[cs[i]] = cs.getPropertyValue(cs[i]);
				out["touch-action"] = touchAction();
				return { result: out };
			}
			case "svg":
				try {
					const args = q.args ?? [];
					switch (q.method) {
						case "getBBox": {
							const b = el.getBBox();
							return { result: {
								x: b.x,
								y: b.y,
								width: b.width,
								height: b.height
							} };
						}
						case "getCTM": return { result: matrixJson(el[q.method]()) };
						case "getScreenCTM": {
							const m = matrixJson(el.getScreenCTM());
							const o = env.origin();
							if (m && o) {
								const s = o.scale ?? 1;
								m.e = (m.e - o.x) / s;
								m.f = (m.f - o.y) / s;
								if (s !== 1) {
									m.a /= s;
									m.b /= s;
									m.c /= s;
									m.d /= s;
								}
							}
							return { result: m };
						}
						case "getPointAtLength": {
							const p = el.getPointAtLength(args[0] ?? 0);
							return { result: {
								x: p.x,
								y: p.y
							} };
						}
						case "getComputedTextLength":
						case "getTotalLength":
						case "getNumberOfChars": return { result: el[q.method]() };
						case "getSubStringLength": return { result: el.getSubStringLength(args[0] ?? 0, args[1] ?? 0) };
					}
				} catch (e) {
					return { result: { error: String(e) } };
				}
				return { result: { error: "unsupported" } };
			case "measureText": {
				scratch ?? (scratch = HTMLCanvasElement.prototype.getContext.call(createElement(doc, "canvas"), "2d"));
				scratch.font = "10px sans-serif";
				scratch.font = q.font;
				const m = scratch.measureText(q.text);
				return { result: {
					width: m.width,
					actualBoundingBoxLeft: m.actualBoundingBoxLeft,
					actualBoundingBoxRight: m.actualBoundingBoxRight,
					actualBoundingBoxAscent: m.actualBoundingBoxAscent,
					actualBoundingBoxDescent: m.actualBoundingBoxDescent,
					fontBoundingBoxAscent: m.fontBoundingBoxAscent,
					fontBoundingBoxDescent: m.fontBoundingBoxDescent
				} };
			}
			case "imageData": {
				const st = canvasState(q.id, el);
				if (!st) return { result: { error: "no context" } };
				const data = st.ctx.getImageData(q.x, q.y, q.w, q.h);
				const buf = data.data.buffer.slice(0);
				return {
					result: {
						width: data.width,
						height: data.height
					},
					binary: buf
				};
			}
			case "canvasCall": {
				const st = canvasState(q.id, el);
				if (!st) return { result: { error: "no context" } };
				const args = (q.args ?? []).map((a) => resolveArg(st, a));
				try {
					switch (q.method) {
						case "isPointInPath":
						case "isPointInStroke": return { result: st.ctx[q.method](...args) };
						case "getTransform": return { result: matrixJson(st.ctx.getTransform()) };
						case "getLineDash": return { result: st.ctx.getLineDash() };
						case "toDataURL": return { result: HTMLCanvasElement.prototype.toDataURL.call(el, ...args) };
					}
				} catch (e) {
					return { result: { error: String(e) } };
				}
				return { result: { error: "unsupported" } };
			}
			case "elementFromPoint": {
				const o = env.origin();
				const s = o?.scale ?? 1;
				return { result: idOf(elementFromPoint(root, q.x * s + (o?.x ?? 0), q.y * s + (o?.y ?? 0))) };
			}
			case "validity": {
				const v = el.validity;
				if (!v) return { result: {
					valid: true,
					message: ""
				} };
				const out = { message: el.validationMessage };
				for (const k of [
					"valid",
					"valueMissing",
					"typeMismatch",
					"patternMismatch",
					"tooLong",
					"tooShort",
					"rangeUnderflow",
					"rangeOverflow",
					"stepMismatch",
					"badInput",
					"customError"
				]) out[k] = v[k];
				return { result: out };
			}
			case "matchMedia": return { result: { matches: env.matchMedia(q.query) } };
			case "viewport": return { result: env.viewport() };
			case "anims": return { result: { list: cssAnimationList(animations, el, q.subtree === true, idOf) } };
		}
	}
	let interest = /* @__PURE__ */ new Set();
	/**
	* tweb: animation and transition events no listener asked for yet, kept a moment. A widget's task that asks a layout
	* question sends its DOM before it ends, so an animation can start (and a short one end) before the listeners the
	* same task adds come as `listen`; a browser would still deliver them (it sends animation events with the next
	* frame). What `listen` then asks for of these goes to the widget — of those that came once the task that sends it
	* had begun (`listen`'s `since`; each is kept with when it came, on the clock every thread shares): one that came
	* before (an animation that ended before a later task listened) a browser had delivered to no one.
	*/
	const ANIMATION_EVENTS = /* @__PURE__ */ new Set([
		"animationstart",
		"animationiteration",
		"animationend",
		"animationcancel",
		"transitionrun",
		"transitionstart",
		"transitionend",
		"transitioncancel"
	]);
	const EARLY_EVENTS_MS = 1e3;
	const EARLY_EVENTS_MAX = 64;
	let earlyEvents = [];
	/** The clock every thread shares (the glue's in a worker, a frame's or another window's): `listen`'s `since`. */
	const sharedNow = () => performance.timeOrigin + performance.now();
	/** "Learned preventDefault": keys reported by the sandbox for which the default is cancelled synchronously. */
	let preventKeys = /* @__PURE__ */ new Set();
	const pendingMoves = /* @__PURE__ */ new Map();
	let moveFrame = 0;
	/** Pending `requestFrame` from the host (one at a time: the shim coalesces its callbacks into one request). */
	let frameReq = 0;
	/** Set by the `frozen` op: the runtime is gone, the last render stays as a static snapshot. */
	let frozen = false;
	/**
	* tweb: the last position of each pointer, for a move whose browser says it moved nothing (WebKit's synthetic ones,
	* which have no screen position either): its screen coordinates, and its client ones. A touch contact's goes when the
	* contact ends, and what follows its end (its out, its leave, its click) keeps none: each contact has an id of its own,
	* and a widget's every tap stayed. At most POSITIONS_KEPT pointers, the one heard from longest ago going first (a pen
	* may get a new id each time it comes near).
	*/
	const lastPosition = /* @__PURE__ */ new Map();
	const POSITIONS_KEPT = 16;
	const TOUCH_GONE = /* @__PURE__ */ new Set([
		"pointerup",
		"pointercancel",
		"pointerout",
		"pointerleave",
		"lostpointercapture",
		"click",
		"auxclick"
	]);
	/**
	* tweb: an event's kind by what it carries rather than by `instanceof`: one of a Document Picture-in-Picture window,
	* where the widget's element can move, is of that window's realm.
	*/
	const isMouseEvent = (e) => "clientX" in e;
	const isPointerEvent = (e) => "pointerId" in e;
	function serialize(e, targetId) {
		const ev = {
			type: e.type,
			targetId
		};
		const t = e.target;
		if (isMouseEvent(e)) {
			const o = env.origin();
			ev.clientX = e.clientX;
			ev.clientY = e.clientY;
			ev.offsetX = e.offsetX;
			ev.offsetY = e.offsetY;
			ev.pageX = e.pageX;
			ev.pageY = e.pageY;
			ev.movementX = e.movementX;
			ev.movementY = e.movementY;
			const pointer = isPointerEvent(e) ? "p" + e.pointerId : "m";
			const last = lastPosition.get(pointer);
			if (last && !e.movementX && !e.movementY && e.type.endsWith("move")) {
				const screen = e.screenX !== last[0] || e.screenY !== last[1];
				ev.movementX = screen ? e.screenX - last[0] : e.clientX - last[2];
				ev.movementY = screen ? e.screenY - last[1] : e.clientY - last[3];
			}
			lastPosition.delete(pointer);
			if (!(isPointerEvent(e) && e.pointerType === "touch" && TOUCH_GONE.has(e.type))) {
				lastPosition.set(pointer, [
					e.screenX,
					e.screenY,
					e.clientX,
					e.clientY
				]);
				if (lastPosition.size > POSITIONS_KEPT) lastPosition.delete(lastPosition.keys().next().value);
			}
			if (o) {
				const s = o.scale ?? 1;
				ev.clientX = (ev.clientX - o.x) / s;
				ev.clientY = (ev.clientY - o.y) / s;
				ev.pageX = ev.clientX;
				ev.pageY = ev.clientY;
				if (s !== 1) {
					ev.movementX /= s;
					ev.movementY /= s;
				}
			}
			ev.button = e.button;
			ev.buttons = e.buttons;
			ev.detail = e.detail;
			if (e.relatedTarget) ev.relatedId = idOf(e.relatedTarget);
		}
		if (isPointerEvent(e)) {
			ev.pointerId = e.pointerId;
			ev.pointerType = e.pointerType;
			ev.isPrimary = e.isPrimary;
			ev.pressure = e.pressure;
		}
		if (isMouseEvent(e)) {
			const m = e;
			ev.modifiers = (m.altKey ? 1 : 0) | (m.ctrlKey ? 2 : 0) | (m.metaKey ? 4 : 0) | (m.shiftKey ? 8 : 0);
		}
		if (t instanceof HTMLImageElement && e.type === "load") {
			ev.naturalWidth = t.naturalWidth;
			ev.naturalHeight = t.naturalHeight;
		}
		if ("animationName" in e) {
			const a = e;
			ev.animationName = a.animationName;
			ev.elapsedTime = a.elapsedTime;
			ev.pseudoElement = a.pseudoElement;
		}
		if ("propertyName" in e) {
			const tr = e;
			ev.propertyName = tr.propertyName;
			ev.elapsedTime = tr.elapsedTime;
			ev.pseudoElement = tr.pseudoElement;
		}
		if (t instanceof HTMLDetailsElement && e.type === "toggle") ev.open = t.open;
		return ev;
	}
	/**
	* What of the press that starts on `el` the widget claims (gesture-policy.ts
	* `claimOf`, docs/sdk-v1.md §5.5): from the `touch-action` the widget gave `el`
	* and its ancestors (`none` claims horizontal drags and holds, a value without a
	* horizontal pan claims horizontal drags; vertical drags are never claimed) and
	* a pointerdown / touchstart the sandbox has learned to prevent on this target
	* (horizontal drags). The host tells the client (`onGestureClaim`).
	*/
	function gestureClaim(el, targetId) {
		const values = [];
		for (let n = el ?? HTML; n; n = n === HTML ? null : parentNodeOf(n)) {
			if (!(n instanceof Element)) break;
			const cs = getComputedStyle(n);
			values.push(cs.getPropertyValue("--tw-touch-action").trim() || cs.touchAction);
		}
		return claimOf(values, preventKeys.has(`${targetId}:pointerdown`) || preventKeys.has(`${targetId}:touchstart`));
	}
	const arbiter = new GestureArbiter();
	/** `arbitrate` from the host: null while the client's own recognizers take the bubble's presses (the native WebViews). */
	let bubbleMode = null;
	let rtl = false;
	/** The primary pointer the arbiter follows, and its last event as the widget saw it (the base of what the renderer sends for it). */
	let pressPointer = -1;
	let pressEv = null;
	let holdTimer = 0;
	/** A pointer the bubble took: nothing more of it reaches the widget. */
	let takenPointer = -1;
	/** After a taken press's pointerup: its compatibility mouseup / click are not the widget's either. */
	let dropClick = false;
	/** A double tap the widget won: its `dblclick` follows the second tap's click. */
	let pendingDblclick = null;
	/** Reproducing a phone (`touch`), a mouse press is a finger's for the widget too: `pointerType` 'touch', also on its click. */
	let pressAsTouch = false;
	let clickAsTouch = false;
	/** tweb: from the event as the widget sees it, whose coordinates are already the widget's (no second origin() read). */
	function pressPoint(ev) {
		const cx = ev.clientX ?? 0, cy = ev.clientY ?? 0;
		return {
			x: rtl ? HTML.clientWidth - cx : cx,
			y: cy
		};
	}
	function clearHold() {
		if (holdTimer) {
			clearTimeout(holdTimer);
			holdTimer = 0;
		}
	}
	function scheduleHold() {
		clearHold();
		const at = arbiter.holdDeadline();
		if (at === null) return;
		holdTimer = setTimeout(() => {
			holdTimer = 0;
			if (frozen) return;
			const v = arbiter.tick(Math.max(win.performance.now(), at));
			if (v && pressEv) settle(v, pressEv);
		}, Math.max(0, at - win.performance.now()) + 1);
	}
	/**
	* Feeds a primary pointer's down / move / up / cancel to the arbiter (posting the claim at pointerdown) and answers
	* its verdict, or null for an event the arbiter does not follow.
	*/
	function track(e, targetEl, targetId, ev) {
		const type = e.type;
		if (type === "pointerdown") {
			if (!e.isPrimary) return null;
			dropClick = false;
			pendingDblclick = null;
			const claim = gestureClaim(targetEl, targetId);
			post({
				type: "gesture",
				wants: claim.y,
				x: claim.x,
				y: claim.y,
				hold: claim.hold
			});
			const kind = bubbleMode?.touch && e.button !== 2 ? "touch" : e.pointerType === "mouse" ? "mouse" : e.pointerType === "pen" ? "pen" : "touch";
			pressAsTouch = clickAsTouch = kind === "touch" && e.pointerType === "mouse";
			if (pressAsTouch) ev.pointerType = "touch";
			const p = pressPoint(ev);
			pressPointer = e.pointerId;
			pressEv = ev;
			const v = arbiter.down(e.timeStamp, p.x, p.y, claim, kind, e.button);
			scheduleHold();
			return v;
		}
		if (e.pointerId !== pressPointer) return null;
		const p = pressPoint(ev);
		if (pressAsTouch) ev.pointerType = "touch";
		pressEv = ev;
		if (type === "pointermove") return arbiter.move(e.timeStamp, p.x, p.y);
		clearHold();
		pressPointer = -1;
		pressAsTouch = false;
		if (type === "pointerup") return arbiter.up(e.timeStamp, p.x, p.y);
		arbiter.cancel();
		return null;
	}
	/**
	* Acts on a verdict once the event that produced it has gone to the widget: the widget's own `contextmenu` / `dblclick`
	* for a hold / double tap it claims, and with the renderer playing the bubble, the end of a press the bubble takes.
	*/
	function settle(v, base) {
		if (v.event === "contextmenu") forward({
			...base,
			type: "contextmenu"
		}, true);
		else if (v.event === "dblclick") pendingDblclick = {
			...base,
			type: "dblclick",
			detail: 2
		};
		if (!v.cancel || !bubbleMode || base.pointerId === void 0) return;
		forward({
			...base,
			type: "pointercancel",
			button: -1,
			buttons: 0
		}, true);
		takenPointer = base.pointerId;
		ownPointers.delete(base.pointerId);
		clearHold();
		pressPointer = -1;
		pressAsTouch = clickAsTouch = false;
		arbiter.cancel();
		post({
			type: "bubble",
			action: v.action ?? "menu",
			gesture: v.gesture,
			x: base.clientX ?? 0,
			y: base.clientY ?? 0,
			edge: v.edge === true
		});
	}
	/** Queues or posts one event for the widget, if it listens for that type (`ALWAYS_FORWARD` aside). */
	function forward(ev, trusted) {
		if (!ALWAYS_FORWARD.has(ev.type) && !interest.has(ev.type)) return;
		if (THROTTLED.has(ev.type)) {
			const key = ev.type + ":" + (ev.pointerId ?? 0);
			const replaced = pendingMoves.get(key);
			if (replaced) {
				ev.movementX = (ev.movementX ?? 0) + (replaced.movementX ?? 0);
				ev.movementY = (ev.movementY ?? 0) + (replaced.movementY ?? 0);
			}
			pendingMoves.set(key, ev);
			if (!moveFrame) moveFrame = win.requestAnimationFrame(flushMoves);
			return;
		}
		if (pendingMoves.size) {
			for (const m of pendingMoves.values()) post({
				type: "event",
				ev: m,
				trusted: false
			});
			pendingMoves.clear();
		}
		post({
			type: "event",
			ev,
			trusted
		});
	}
	function onDetachedImage(e) {
		if (!root.contains(e.currentTarget)) onEvent(e);
	}
	function onEvent(e) {
		const type = e.type;
		const target = e.target instanceof Node ? e.target : null;
		const targetEl = target instanceof Element ? target : null;
		if (type === "click" && targetEl && closest(targetEl, "a, area")) e.preventDefault();
		if (type === "click" && e.detail === 0 && e.isTrusted) {
			e.preventDefault();
			return;
		}
		if (frozen) return;
		const targetId = target === root || target === null ? ids.get(HTML) ?? 0 : idOf(target);
		if (!targetId) return;
		if (preventKeys.size && e.cancelable && preventKeys.has(`${targetId}:${type}`)) e.preventDefault();
		if (ENGINE_GESTURES.has(type)) return;
		let verdict = null;
		let ev = null;
		if (isPointerEvent(e) && (type === "pointerdown" || type === "pointermove" || type === "pointerup" || type === "pointercancel")) {
			if ((type === "pointerup" || type === "pointercancel") && e.isPrimary && e.isTrusted) post({ type: "release" });
			if (e.pointerId === takenPointer && type !== "pointerdown") {
				if (type === "pointerup" || type === "pointercancel") {
					takenPointer = -1;
					dropClick = type === "pointerup";
				}
				return;
			}
			if (type === "pointerdown" && e.pointerId === takenPointer) takenPointer = -1;
			if ((type === "pointerdown" ? !e.isPrimary : e.pointerId !== pressPointer) && !interest.has(type)) return;
			ev = serialize(e, targetId);
			verdict = track(e, targetEl, targetId, ev);
			if (verdict?.cancel && bubbleMode && type === "pointerup") {
				settle(verdict, ev);
				takenPointer = -1;
				dropClick = true;
				return;
			}
			if (type === "pointerup" && bubbleMode?.touch && verdict && (verdict.gesture === "drag-x" || verdict.gesture === "drag-y" || verdict.gesture === "hold")) dropClick = true;
		} else if (MOUSE_COMPAT.has(type) && (takenPointer !== -1 || dropClick && type !== "mousemove")) return;
		const mayScroll = type === "pointerdown" ? isPointerEvent(e) && isFingerOrPen(e) : (type === "mousedown" || type === "mouseup") && changedFingerDown;
		const trusted = e.isTrusted && !mayScroll && (changedOwn || type !== "pointerup" && type !== "mouseup");
		if (ev) forward(ev, trusted);
		else if (ALWAYS_FORWARD.has(type) || interest.has(type)) {
			const out = serialize(e, targetId);
			if (type === "click" && clickAsTouch && out.pointerType === "mouse") {
				out.pointerType = "touch";
				clickAsTouch = false;
			}
			forward(out, trusted);
		} else if (ANIMATION_EVENTS.has(type)) {
			const now = sharedNow();
			if (earlyEvents.length >= EARLY_EVENTS_MAX) earlyEvents = earlyEvents.filter((kept) => now - kept.at < EARLY_EVENTS_MS);
			if (earlyEvents.length >= EARLY_EVENTS_MAX) earlyEvents.shift();
			earlyEvents.push({
				ev: serialize(e, targetId),
				at: now
			});
		}
		if (verdict && ev) settle(verdict, ev);
		if (type === "click" && pendingDblclick) {
			const dbl = pendingDblclick;
			pendingDblclick = null;
			forward({
				...serialize(e, targetId),
				type: "dblclick",
				detail: 2,
				pointerId: dbl.pointerId,
				pointerType: dbl.pointerType
			}, e.isTrusted);
		}
	}
	let lastSize = "";
	let lastViewport = "";
	function reportSize() {
		checkLayout();
		const viewport = env.viewport();
		const msg = {
			type: "size",
			width: HTML.clientWidth,
			height: env.docHeight(),
			...viewport
		};
		const key = JSON.stringify(msg);
		if (key !== lastSize) {
			lastSize = key;
			post(msg);
		}
		const vp = viewport.innerWidth + "x" + viewport.innerHeight;
		if (vp !== lastViewport) {
			lastViewport = vp;
			paintEverything();
		}
		if (paintPending && isConnectedOf(HTML)) {
			paintPending = false;
			schedulePaint();
		}
	}
	function flushMoves() {
		moveFrame = 0;
		for (const m of pendingMoves.values()) post({
			type: "event",
			ev: m,
			trusted: false
		});
		pendingMoves.clear();
	}
	/**
	* tweb: off screen the engine gets no frames and its timers slow down, but CSS and Web Animations would go on in the
	* page (an iframe off screen is throttled by the browser, a shadow root is not). While the host keeps the widget
	* hidden, CSS animations are held by their own property (a pause() call would take them from the widget's CSS for
	* good), from the first cascade layer, which outranks any important declaration of the widget's sheets — an element's
	* own important one outranks every layer, so that one is held in the element's style (`holdPlayState`); transitions,
	* which have no such property, and the engine's scripted animations are paused. Shown again, transitions still paused
	* go on, scripted animations go back to where the engine's timeline has them, unless the engine held, moved or dropped
	* them meanwhile (`AnimationState.startTimes`), and the elements' own play states are the widget's again.
	*/
	let hostHidden = false;
	let hiddenStyle = null;
	/** tweb: the elements whose own important `animation-play-state` is held paused while hidden, with the widget's declaration. */
	const heldPlayStates = /* @__PURE__ */ new Map();
	/**
	* Holds `el`'s own important play state paused, if it has one: call it where the value there is the widget's. tweb: an
	* important `all` sets one too, whose longhands Chromium reports with no priority (`all: initial !important` and an
	* animation ran on while hidden).
	*/
	function holdPlayState(el) {
		heldPlayStates.delete(el);
		const style = styleOf(el);
		if (!(style.getPropertyPriority("animation-play-state") === "important" || style.getPropertyPriority("all") === "important" && style.getPropertyValue("animation-play-state") !== "")) return;
		heldPlayStates.set(el, {
			value: style.getPropertyValue("animation-play-state"),
			priority: style.getPropertyPriority("animation-play-state")
		});
		style.setProperty("animation-play-state", "paused", "important");
		ownStyleWritten(el);
	}
	/**
	* tweb: gives `el` back its own play state, held by the renderer. Before an op of the widget's that may change it, too
	* (and `holdPlayState` after): the op acts on what the widget set, and a value the browser refuses (`all: bogus`, a
	* play state it does not know) leaves the widget's — taken again from the style, the renderer's own `paused` had been
	* kept for good.
	*/
	function releasePlayState(el) {
		const held = heldPlayStates.get(el);
		if (!held) return;
		heldPlayStates.delete(el);
		styleOf(el).setProperty("animation-play-state", held.value, held.priority);
		ownStyleWritten(el);
	}
	/** Whether a style op of `name` may change an element's own play state (holdPlayState). */
	const PLAY_STATE_STYLE = /^((-webkit-)?animation(-play-state)?|all)$/i;
	/**
	* tweb: the renderer wrote `el`'s style attribute itself, outside any op of the widget's: a selector of the widget's on
	* the attribute (`[style*=…]`) may match it, or what it reaches, otherwise now — counted as the widget's own write is.
	*/
	function ownStyleWritten(el) {
		if (paintSheets.styleAttr) paintChanged(el, true);
	}
	/** Ids of the scripted animations the host paused. */
	const hostPaused = /* @__PURE__ */ new Set();
	const pausedTransitions = /* @__PURE__ */ new Set();
	/**
	* tweb: the CSS animations and transitions the widget's own call played while hidden (`anim`: `play()`, a seek, a
	* rate), held paused by the host with where the engine put their start: shown, they go on from there. One the widget
	* paused itself is its own, and stays paused.
	*/
	const heldCss = /* @__PURE__ */ new Map();
	/** Holds `a`, which the widget's call has just played while hidden, paused till the widget is shown. */
	function holdCssForHost(a) {
		for (const [kept] of heldCss) if (kept.playState === "idle") heldCss.delete(kept);
		const start = a.startTime;
		if (a.playState !== "running" || typeof start !== "number") return;
		try {
			a.pause();
		} catch {
			return;
		}
		heldCss.set(a, start);
	}
	function pauseTransitions() {
		for (const a of pausedTransitions) if (a.playState === "idle") pausedTransitions.delete(a);
		for (const a of animationsOf()) {
			if (!isCSSTransition(a) || a.playState !== "running") continue;
			try {
				a.pause();
			} catch {
				continue;
			}
			pausedTransitions.add(a);
		}
	}
	const animationsOf = () => {
		try {
			return root.getAnimations?.() ?? [];
		} catch {
			return [];
		}
	};
	function pauseForHost() {
		for (const aid of hostPaused) if (!animations.scripted.has(aid)) hostPaused.delete(aid);
		for (const [aid, a] of animations.scripted) {
			if (a.playState !== "running") continue;
			try {
				a.pause();
			} catch {
				continue;
			}
			hostPaused.add(aid);
		}
	}
	function setHostHidden(hidden) {
		if (hidden === hostHidden) return;
		hostHidden = hidden;
		if (hidden) {
			hiddenStyle = createElement(doc, "style");
			setTextContent(hiddenStyle, "@layer tw-hidden{*,*::before,*::after{animation-play-state:paused!important}}");
			insertBefore(HEAD, hiddenStyle, firstChildOf(HEAD));
			for (const node of nodes.values()) if (node instanceof Element) holdPlayState(node);
			pauseForHost();
			pauseTransitions();
			return;
		}
		for (const el of [...heldPlayStates.keys()]) releasePlayState(el);
		if (hiddenStyle) {
			try {
				removeChild(HEAD, hiddenStyle);
			} catch {}
			hiddenStyle = null;
		}
		if (!frozen) {
			for (const aid of hostPaused) {
				const a = animations.scripted.get(aid), start = animations.startTimes.get(aid);
				if (a && start !== void 0 && a.playState === "paused") try {
					a.startTime = start;
				} catch {}
			}
			for (const a of pausedTransitions) if (a.playState === "paused") try {
				a.play();
			} catch {}
			for (const [a, start] of heldCss) if (a.playState === "paused") try {
				a.startTime = start;
			} catch {}
		}
		hostPaused.clear();
		pausedTransitions.clear();
		heldCss.clear();
		schedulePaint();
	}
	/** tweb: the window frames are asked of and observers made in, the one the widget's DOM is in (`rebind`). */
	let win = window;
	function onFrame(time) {
		frameReq = 0;
		post({
			type: "frame",
			time: time + win.performance.timeOrigin - performance.timeOrigin
		});
	}
	function onResizeEntries(entries) {
		const out = [];
		for (const entry of entries) {
			const id = ids.get(entry.target);
			if (id !== void 0) out.push({
				id,
				width: entry.contentRect.width,
				height: entry.contentRect.height
			});
		}
		if (out.length) post({
			type: "resize",
			entries: out
		});
	}
	/** The elements the widget observes the size of, so that a new observer can take them over. */
	const observed = /* @__PURE__ */ new Set();
	let resizeObserver = new ResizeObserver(onResizeEntries);
	/** Counted unless the host says `compat` (fail closed: before the host's `policy`, and for any other value). */
	let paintOn = true;
	/** `policy.paintReports` (tooling): post the counts whenever they change. */
	let paintReports = false;
	let lastPaintReport = "";
	const paint = new PaintCounter();
	/** Elements whose computed values, and their subtrees', may have changed since the last count. */
	const paintDirty = /* @__PURE__ */ new Set();
	/** Elements whose own values may have changed (the chain a press goes through, when only the UA layer's `button:active` can match). */
	const paintDirtySelf = /* @__PURE__ */ new Set();
	/** Every box is recomputed at the next count (a stylesheet, the theme, the safe area, the viewport; the first count). */
	let paintAll = true;
	let paintFrame = 0;
	/** Changes wait for a count while the tree is off the page (a Shadow DOM renderer built before it is attached). */
	let paintPending = false;
	/** Past a limit: the widget is drawn without effects, takes no more ops, and waits for the host's `frozen`. */
	let paintStopped = false;
	/** What the widget's stylesheets use: how far a change reaches beyond the element and its subtree; `styleAttr`: a selector on the style attribute. */
	let paintSheets = {
		siblings: false,
		structural: false,
		hover: false,
		active: false,
		styleAttr: false
	};
	/**
	* Inline properties that can change whether a box is heavy, on the element or below it (a custom property can feed
	* `opacity: var(--x)`; prefixed aliases match too); any other inline property (transform, left, background, …)
	* cannot, unless a selector reads the style attribute. Animations and transitions it starts are rule 5, their events.
	*/
	const PAINT_STYLE_PROPS = /^--|opacity|filter|box-shadow|^display$|^all$/i;
	/** The same in a whole style attribute (a declaration of one of them; an escape may spell one). */
	const PAINT_STYLE_TEXT = /--|\\|(?:opacity|filter|box-shadow|display|all)\s*:/i;
	/** Elements whose inline style may declare one of them (an over-estimate: set by an op that wrote one, cleared when the attribute is replaced). */
	const inlineHeavy = /* @__PURE__ */ new WeakSet();
	/** The elements a `::before` / `::after` rule may match (its selectors without the pseudo-element): only theirs are computed. */
	let pseudoSelector = "";
	let paintSheetsDirty = true;
	const widgetStyles = /* @__PURE__ */ new Set();
	const styleConnected = /* @__PURE__ */ new WeakMap();
	/** The renderer's Web Animations counted under rule 5: animation id → the box key. */
	const scriptedCounted = /* @__PURE__ */ new Map();
	let scriptedPaint = /* @__PURE__ */ new WeakMap();
	const scriptedListened = /* @__PURE__ */ new WeakSet();
	/** Box keys: the element, its ::before, its ::after. */
	const BEFORE = 1, AFTER = 2;
	const backdropOf = (cs) => cs.getPropertyValue("backdrop-filter") || cs.getPropertyValue("-webkit-backdrop-filter");
	function schedulePaint() {
		if (paintFrame || !paintOn || paintStopped || frozen) return;
		paintFrame = win.requestAnimationFrame(countPaint);
	}
	/** `el` (and everything under it) may have changed; with a sibling combinator or a structural pseudo-class in the widget's sheets, its siblings too. */
	function paintChanged(el, siblings = false) {
		if (!paintOn || paintStopped || !(el instanceof Element)) return;
		const parent = siblings && (paintSheets.siblings || paintSheets.structural) ? parentNodeOf(el) : null;
		paintDirty.add(parent instanceof Element && ids.has(parent) ? parent : el);
		schedulePaint();
	}
	function paintEverything() {
		if (!paintOn || paintStopped) return;
		paintAll = true;
		schedulePaint();
	}
	/**
	* tweb: what stood for a text among its siblings before a `data` op: one the op wraps or unwraps (the client's emoji,
	* `outerOf`) adds an element there or takes one away.
	*/
	let dataOuter = null;
	/** Before an op: a node about to leave its place (rm, or ins of a node already in the tree) takes its boxes with it. */
	function paintBefore(op) {
		if (op.op === "data") {
			const node = nodes.get(op.id);
			dataOuter = node ? outerOf(node) : null;
			return;
		}
		if (op.op !== "rm" && op.op !== "ins") return;
		const node = nodes.get(op.id);
		if (!node || node === HTML || node === HEAD || node === BODY) return;
		const parent = parentNodeOf(outerOf(node));
		if (!parent) return;
		if (node instanceof Element) clearBoxes(node);
		if (paintSheets.siblings || paintSheets.structural) paintChanged(parent);
	}
	/** After an op: what it can have changed (the subtree of an element whose attribute or style changed, an inserted subtree). */
	function paintAfter(op) {
		switch (op.op) {
			case "el": {
				const el = nodes.get(op.id);
				if (el instanceof HTMLStyleElement) widgetStyles.add(el);
				if (el instanceof Element) {
					for (const [name, value] of op.attrs) if (name.toLowerCase() === "style" && PAINT_STYLE_TEXT.test(value)) inlineHeavy.add(el);
				}
				if (op.adopt) paintChanged(el);
				return;
			}
			case "style": {
				if (!paintSheets.styleAttr && !PAINT_STYLE_PROPS.test(op.name)) return;
				const el = nodes.get(op.id);
				if (el instanceof Element) inlineHeavy.add(el);
				paintChanged(el, true);
				return;
			}
			case "attr":
			case "rattr": {
				const el = nodes.get(op.id);
				if (!(el instanceof Element)) return;
				if (el instanceof HTMLStyleElement) {
					paintSheetsDirty = true;
					paintEverything();
					return;
				}
				if (op.name.toLowerCase() === "style") {
					const had = inlineHeavy.has(el), has = op.op === "attr" && PAINT_STYLE_TEXT.test(op.value);
					if (has) inlineHeavy.add(el);
					else inlineHeavy.delete(el);
					if (!had && !has && !paintSheets.styleAttr) return;
				}
				paintChanged(el, true);
				return;
			}
			case "ins": {
				if (op.parent === 0) return;
				const node = nodes.get(op.id);
				if (node instanceof Element) paintChanged(node, true);
				else if (node && (paintSheets.structural || paintSheets.siblings && outerOf(node) !== node)) paintChanged(parentNodeOf(outerOf(node)), true);
				return;
			}
			case "data": {
				const node = nodes.get(op.id);
				const outer = node ? outerOf(node) : null;
				if (outer && (paintSheets.structural || paintSheets.siblings && outer !== dataOuter)) paintChanged(parentNodeOf(outer), true);
				return;
			}
			case "css":
				paintSheetsDirty = true;
				paintEverything();
				return;
		}
	}
	/** The widget's stylesheets, read again when one changed or was connected or removed: what a change reaches, and which elements may have pseudo-element boxes. */
	function refreshSheets() {
		let changed = paintSheetsDirty;
		for (const el of widgetStyles) {
			const on = isConnectedOf(el);
			if (styleConnected.get(el) !== on) {
				styleConnected.set(el, on);
				changed = true;
			}
		}
		if (!changed) return;
		paintSheetsDirty = false;
		paintAll = true;
		const flags = {
			siblings: false,
			structural: false,
			hover: false,
			active: false,
			styleAttr: false
		};
		const pseudo = [];
		const inspect = (selector) => {
			const bare = selector.replace(/"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/g, "\"\"").replace(/\[[^\]]*\]/g, "[]");
			if (/[+~]/.test(bare.replace(/:nth-[a-z-]+\([^)]*\)/gi, ""))) flags.siblings = true;
			if (/:(nth-|first-child|last-child|only-child|first-of-type|last-of-type|only-of-type|empty)/i.test(bare)) flags.structural = true;
			if (/:hover/i.test(bare)) flags.hover = true;
			if (/:active/i.test(bare) || /\[\s*data-tw-active\b/i.test(selector)) flags.active = true;
			if (/\[\s*style\b/i.test(selector)) flags.styleAttr = true;
			if (!/::?(before|after)\b/i.test(bare)) return;
			let depth = 0, from = 0;
			const parts = [];
			for (let i = 0; i <= selector.length; i++) {
				const c = selector[i];
				if (c === "(") depth++;
				else if (c === ")") depth--;
				else if (c === "," && depth === 0 || c === void 0) {
					parts.push(selector.slice(from, i));
					from = i + 1;
				}
			}
			for (const part of parts) {
				if (!/::?(before|after)\b/i.test(part)) continue;
				pseudo.push(part.replace(/(^|[\s>+~(,])::?(before|after)\b/gi, "$1*").replace(/::?(before|after)\b/gi, "").trim() || "*");
			}
		};
		const walk = (rules) => {
			for (let i = 0; i < rules.length; i++) {
				const r = rules[i];
				if (typeof r.selectorText === "string") inspect(r.selectorText);
				if (r.cssRules) walk(r.cssRules);
			}
		};
		for (const el of widgetStyles) {
			const sheet = sheetOf(el);
			if (sheet) try {
				walk(sheet.cssRules);
			} catch {}
		}
		paintSheets = flags;
		pseudoSelector = pseudo.join(",");
		if (pseudoSelector) try {
			matches(HTML, pseudoSelector);
		} catch {
			pseudoSelector = "*";
		}
	}
	/** The boxes of `el` and of everything under it are gone (display: none, removed, moved away). */
	function clearBoxes(el) {
		const id = ids.get(el);
		if (id !== void 0) {
			paint.removeBox(id * 4);
			paint.removeBox(id * 4 + BEFORE);
			paint.removeBox(id * 4 + AFTER);
		}
		for (let c = firstChildOf(el); c; c = nextSiblingOf(c)) if (c instanceof Element) clearBoxes(c);
	}
	/** A `<button>` that is disabled or held down: its opacity is the button's own dimming, not a heavy effect (paint-policy.ts). */
	function buttonState(el) {
		if (!(el instanceof HTMLButtonElement)) return void 0;
		if (getAttribute(el, "disabled") !== null) return "disabled";
		return (root instanceof ShadowRoot ? pressed.includes(el) : matches(el, ":active")) ? "pressed" : void 0;
	}
	/** What a box adds, from its computed values; `el` for an element's own box (a pseudo-element's has none). */
	function stylePaint(cs, display, pseudo, el) {
		return boxPaint({
			display,
			content: pseudo ? cs.content : void 0,
			boxShadow: cs.boxShadow,
			filter: cs.filter,
			backdropFilter: backdropOf(cs),
			opacity: cs.opacity,
			button: el ? buttonState(el) : void 0
		}, pseudo);
	}
	function pseudoPaint(el, key, which) {
		const cs = getComputedStyle(el, which);
		paint.setBox(key, stylePaint(cs, cs.display, true));
	}
	/** Recomputes the boxes of `el` and of its subtree (`hidden`: an ancestor is display: none). */
	function scanBoxes(el, hidden) {
		const id = ids.get(el);
		if (id === void 0) return;
		if (hidden) return clearBoxes(el);
		const cs = getComputedStyle(el);
		const display = cs.display;
		if (hidesSubtree(display)) return clearBoxes(el);
		const key = id * 4;
		paint.setBox(key, stylePaint(cs, display, false, el));
		if (pseudoSelector && matches(el, pseudoSelector)) {
			pseudoPaint(el, key + BEFORE, "::before");
			pseudoPaint(el, key + AFTER, "::after");
		} else {
			paint.setBox(key + BEFORE, null);
			paint.setBox(key + AFTER, null);
		}
		for (let c = firstChildOf(el); c; c = nextSiblingOf(c)) if (c instanceof Element) scanBoxes(c, false);
	}
	/** Whether `n` or an element above it (up to the widget's root) is display: none; remembered for one count. */
	function hiddenAt(n, memo) {
		if (!(n instanceof Element)) return false;
		let v = memo.get(n);
		if (v !== void 0) return v;
		v = hidesSubtree(getComputedStyle(n).display) || n !== HTML && hiddenAt(parentNodeOf(n), memo);
		memo.set(n, v);
		return v;
	}
	function coveredByDirty(el) {
		for (let p = el === HTML ? null : parentNodeOf(el); p instanceof Element; p = p === HTML ? null : parentNodeOf(p)) if (paintDirty.has(p)) return true;
		return false;
	}
	/** Rule 5 for the renderer's own Web Animations (the shim's `webAnimations`): counted while `running`. */
	function syncScriptedPaint() {
		for (const [aid, key] of scriptedCounted) {
			if (animations.scripted.has(aid)) continue;
			paint.endAnimation(key, "w:" + aid);
			scriptedCounted.delete(aid);
		}
		for (const [aid, a] of animations.scripted) {
			if (!scriptedListened.has(a)) {
				scriptedListened.add(a);
				a.addEventListener("finish", schedulePaint);
				a.addEventListener("cancel", schedulePaint);
			}
			const name = "w:" + aid;
			let key = -1;
			let p = null;
			let fresh = false;
			const effect = a.effect;
			const id = a.playState === "running" && effect?.target ? ids.get(effect.target) : void 0;
			if (id !== void 0) {
				p = scriptedPaint.get(a);
				if (p === void 0) {
					let frames = [];
					try {
						frames = effect.getKeyframes();
					} catch {}
					p = animationPaint(frames);
					scriptedPaint.set(a, p);
					fresh = true;
				}
				if (p) key = id * 4;
			}
			const was = scriptedCounted.get(aid);
			if (was !== void 0 && (was !== key || !paint.animating(was, name))) {
				paint.endAnimation(was, name);
				scriptedCounted.delete(aid);
				const target = nodes.get(Math.floor(was / 4));
				if (target instanceof Element) {
					paintDirtySelf.add(target);
					schedulePaint();
				}
			}
			if (p && fresh && was === key && paint.animating(key, name)) {
				paint.endAnimation(key, name);
				paint.startAnimation(key, name, p);
			}
			if (p && key >= 0 && !paint.animating(key, name)) {
				paint.startAnimation(key, name, p);
				scriptedCounted.set(aid, key);
			}
		}
	}
	function countPaint() {
		paintFrame = 0;
		if (!paintOn || paintStopped || frozen || !HTML || !ids.has(HTML)) return;
		if (!isConnectedOf(HTML)) {
			paintPending = true;
			return;
		}
		refreshSheets();
		if (paintAll) {
			paintAll = false;
			paintDirty.clear();
			paintDirtySelf.clear();
			scanBoxes(HTML, false);
		} else {
			const memo = /* @__PURE__ */ new Map();
			for (const el of paintDirty) {
				if (!ids.has(el) || !isConnectedOf(el) || coveredByDirty(el)) continue;
				scanBoxes(el, el !== HTML && hiddenAt(parentNodeOf(el), memo));
			}
			for (const el of paintDirtySelf) {
				const id = ids.get(el);
				if (id === void 0 || paintDirty.has(el) || !isConnectedOf(el) || coveredByDirty(el) || hiddenAt(el, memo)) continue;
				const cs = getComputedStyle(el);
				paint.setBox(id * 4, stylePaint(cs, cs.display, false, el));
				if (pseudoSelector && matches(el, pseudoSelector)) {
					pseudoPaint(el, id * 4 + BEFORE, "::before");
					pseudoPaint(el, id * 4 + AFTER, "::after");
				}
			}
			paintDirty.clear();
			paintDirtySelf.clear();
		}
		if (animations.scripted.size || scriptedCounted.size) syncScriptedPaint();
		if (paintReports) {
			const key = paint.heavy + ":" + paint.backdrop;
			if (key !== lastPaintReport) {
				lastPaintReport = key;
				post({
					type: "paint",
					heavy: paint.heavy,
					backdrop: paint.backdrop
				});
			}
		}
		const verdict = paint.check();
		if (verdict) stopPaint(verdict);
	}
	/** A CSS animation or transition starts or ends: rule 5 (from its start event until its end or cancel event). */
	function onPaintAnimation(e) {
		if (!paintOn || paintStopped || frozen) return;
		const el = e.target;
		const id = el instanceof Element ? ids.get(el) : void 0;
		if (id === void 0) return;
		const ev = e;
		const pseudo = ev.pseudoElement || "";
		const slot = pseudo === "" ? 0 : pseudo === "::before" ? BEFORE : pseudo === "::after" ? AFTER : -1;
		if (slot < 0) return;
		const key = id * 4 + slot;
		const transition = e.type.startsWith("transition");
		const name = transition ? "t:" + ev.propertyName : "a:" + ev.animationName;
		if (e.type === "animationstart" || e.type === "transitionstart") {
			const p = cssAnimationPaint(el, transition, transition ? ev.propertyName : ev.animationName, pseudo);
			if (!p) return;
			paint.startAnimation(key, name, p);
		} else {
			if (!paint.animating(key, name)) return;
			paint.endAnimation(key, name);
			paintDirtySelf.add(el);
		}
		schedulePaint();
	}
	/**
	* What the CSS animation `name` (or the transition of property `name`) running on `el` or its pseudo-element adds,
	* from its keyframes (a transition's: its two ends). A transition the engine no longer lists counts by its property
	* alone (its values unknown); an animation it no longer lists has ended (its end event follows).
	*/
	function cssAnimationPaint(el, transition, name, pseudo) {
		for (const a of getAnimationsOf(el, pseudo ? { subtree: true } : void 0)) {
			if (transition ? !isCSSTransition(a) || a.transitionProperty !== name : !isCSSAnimation(a) || a.animationName !== name) continue;
			const effect = a.effect;
			if (!effect || effect.target !== el || (effect.pseudoElement ?? "") !== pseudo) continue;
			try {
				return animationPaint(effect.getKeyframes());
			} catch {
				break;
			}
		}
		return transition ? animationPaint([{
			offset: 0,
			[name]: null
		}, {
			offset: 1,
			[name]: null
		}]) : null;
	}
	/** :hover and :active move with the pointer, without ops: the elements whose state changed (and their subtrees) are counted again. */
	function onPaintInput(e) {
		if (!paintOn || paintStopped || frozen) return;
		const type = e.type;
		if (type === "toggle") return paintChanged(e.target, true);
		if (type === "pointerover" || type === "pointerout") {
			if (!paintSheets.hover) return;
			const a = chainOf(e.target), b = chainOf(e.relatedTarget);
			const inA = new Set(a), inB = new Set(b);
			for (const el of a) if (!inB.has(el)) paintChanged(el, true);
			for (const el of b) if (!inA.has(el)) paintChanged(el, true);
			return;
		}
		pressChanged(chainOf(e.target));
	}
	/**
	* A press began or ended on `els` (tweb: and with it the shadow root's `[data-tw-active]`): :active on them; with no
	* :active rule of the widget's only the UA layer's `button:active` can match, which changes the element itself.
	*/
	function pressChanged(els) {
		if (!paintOn || paintStopped || frozen) return;
		for (const el of els) if (paintSheets.active) paintChanged(el, true);
		else {
			paintDirtySelf.add(el);
			schedulePaint();
		}
	}
	/** The widget's elements from `t` up to its root. */
	function chainOf(t) {
		const out = [];
		for (let n = t instanceof Element ? t : null; n instanceof Element; n = n === HTML ? null : parentNodeOf(n)) if (ids.has(n)) out.push(n);
		return out;
	}
	/**
	* Past a limit (paint-policy.ts): the frame is drawn without the effects that cost (blurred shadows, filters,
	* backdrop-filter, opacity), animations stop where they are, and the host hears it (`limit`) and stops the widget;
	* until its `frozen` the renderer takes no more ops. Trusted renderer content only.
	*/
	function stopPaint(v) {
		paintStopped = true;
		if (paintFrame) {
			win.cancelAnimationFrame(paintFrame);
			paintFrame = 0;
		}
		drawWithoutEffects();
		post({
			type: "limit",
			code: v.code,
			count: v.count
		});
	}
	/**
	* A layer declared before every other one: its !important declarations beat every declaration of the widget's
	* stylesheets, layered or not, and the animations. Pseudo-elements lose their shadows; elements keep their shadows
	* without blur (set inline below, as are what their inline styles would otherwise keep). A disabled button keeps its
	* dimming: it is no heavy effect.
	*/
	const NO_EFFECTS_CSS = "@layer tw-no-effects{*,::before,::after{filter:none!important;-webkit-backdrop-filter:none!important;backdrop-filter:none!important;transition:none!important}:not(button[disabled]),::before,::after{opacity:1!important}::before,::after{box-shadow:none!important}}";
	function drawWithoutEffects() {
		try {
			for (const a of getAnimationsOf(HTML, { subtree: true })) try {
				if (isCSSTransition(a)) a.cancel();
				else a.pause();
			} catch {}
		} catch {}
		const fixes = [];
		const visit = (el) => {
			if (!ids.has(el)) return;
			const cs = getComputedStyle(el);
			if (hidesSubtree(cs.display)) return;
			const style = styleOf(el);
			if (parseFloat(cs.opacity) === 0) fixes.push([
				style,
				"visibility",
				"hidden"
			]);
			if (boxShadowBlurred(cs.boxShadow)) fixes.push([
				style,
				"box-shadow",
				boxShadowWithoutBlur(cs.boxShadow)
			]);
			for (const prop of [
				"filter",
				"backdrop-filter",
				"-webkit-backdrop-filter",
				"opacity"
			]) if (style.getPropertyValue(prop) && !(prop === "opacity" && buttonState(el) === "disabled")) fixes.push([
				style,
				prop,
				""
			]);
			for (let c = firstChildOf(el); c; c = nextSiblingOf(c)) if (c instanceof Element) visit(c);
		};
		visit(HTML);
		const sheet = createElement(doc, "style");
		setTextContent(sheet, NO_EFFECTS_CSS);
		insertBefore(HEAD, sheet, firstChildOf(HEAD));
		for (const [style, prop, value] of fixes) if (value) style.setProperty(prop, value, "important");
		else style.removeProperty(prop);
		checkLayout(true);
	}
	/** Past the budget: the widget's grids from some level on are gone, and it takes no more ops. */
	let layoutStopped = false;
	/** An op changed what may be a grid, or where (counted before the next layout). */
	let layoutDirty = false;
	/** A stylesheet of the widget's changed, came or went: the rules are read again. */
	let layoutSheetsDirty = true;
	/** The rules that may make a grid, their selectors widened to what they may match (layout-policy.ts) and joined. */
	let gridSelector = "";
	/** One of the widget's @keyframes may set a grid's display: what runs an animation may be a grid. */
	let gridKeyframes = false;
	/** Elements whose own declarations (the style attribute) may make them grids. */
	const inlineGrid = /* @__PURE__ */ new Set();
	/** A script's animations whose keyframes may set a grid's display, by id: their targets, and the ids by target. */
	const gridAnimations = /* @__PURE__ */ new Map();
	const animatedGrid = /* @__PURE__ */ new Map();
	/** What each <style> of the widget's holds that may make a grid, read from its text (kept while the text is the same). */
	const gridRules = /* @__PURE__ */ new WeakMap();
	const mayGrid = (el) => inlineGrid.has(el) || animatedGrid.has(el) || gridSelector !== "" && matches(el, gridSelector);
	/** Whether `el`'s own declarations may make it a grid; noted for the count. */
	function noteInlineGrid(el) {
		const style = styleOf(el);
		if (mayDisplayGrid(style.getPropertyValue("display")) || mayAllGrid(style.getPropertyValue("all")) || gridKeyframes && mayAnimate(style.getPropertyValue("animation-name"), style.getPropertyValue("animation"))) inlineGrid.add(el);
		else inlineGrid.delete(el);
	}
	/** The script's animation `aid` now may make `el` a grid (null: makes nothing one, or is gone). */
	function noteGridAnimation(aid, el) {
		const was = gridAnimations.get(aid);
		if (was === el || !was && !el) return;
		if (was) {
			const aids = animatedGrid.get(was);
			aids?.delete(aid);
			if (!aids?.size) animatedGrid.delete(was);
			gridAnimations.delete(aid);
		}
		if (el) {
			gridAnimations.set(aid, el);
			let aids = animatedGrid.get(el);
			if (!aids) animatedGrid.set(el, aids = /* @__PURE__ */ new Set());
			aids.add(aid);
		}
		layoutDirty = true;
	}
	/** After an op: what it can have changed of what may be a grid, or of where it is. */
	function layoutAfter(op) {
		switch (op.op) {
			case "el": {
				const el = nodes.get(op.id);
				if (!(el instanceof Element)) return;
				if (el instanceof HTMLStyleElement) {
					widgetStyles.add(el);
					layoutSheetsDirty = true;
				}
				if (op.attrs.some(([name]) => name.toLowerCase() === "style")) noteInlineGrid(el);
				if (op.adopt) layoutDirty = true;
				return;
			}
			case "ins":
			case "rm":
			case "data":
				layoutDirty = true;
				return;
			case "attr":
			case "rattr": {
				const el = nodes.get(op.id);
				if (!(el instanceof Element)) return;
				if (op.name.toLowerCase() === "style") noteInlineGrid(el);
				layoutDirty = true;
				return;
			}
			case "style": {
				const el = nodes.get(op.id);
				if (!(el instanceof Element) || !/^(?:display|all|animation(?:-name)?)$/i.test(op.name)) return;
				noteInlineGrid(el);
				layoutDirty = true;
				return;
			}
			case "css":
				layoutSheetsDirty = layoutDirty = true;
				return;
		}
	}
	/**
	* What a <style> holds that may make a grid. Read from its text, parsed as a sheet of its own: a <style> out of the
	* document has no sheet, and a widget built before its renderer is in the page (or moved, `rebind`) would count none
	* of its rules and be laid out once attached with nothing to count it again. One the widget made but never put in
	* counts too, which only over-counts.
	*/
	function sheetGrids(el) {
		const text = textContentOf(el) ?? "";
		const known = gridRules.get(el);
		if (known && known.text === text) return known;
		const info = {
			text,
			grids: [],
			animated: [],
			keyframes: false
		};
		const walk = (rules) => {
			for (let i = 0; i < rules.length; i++) {
				const r = rules[i];
				if (r.style) {
					const grid = mayDisplayGrid(r.style.getPropertyValue("display")) || mayAllGrid(r.style.getPropertyValue("all"));
					if (typeof r.selectorText === "string") {
						if (grid) info.grids.push(r.selectorText);
						else if (mayAnimate(r.style.getPropertyValue("animation-name"), r.style.getPropertyValue("animation"))) info.animated.push(r.selectorText);
					} else if (grid && typeof r.keyText === "string") info.keyframes = true;
				}
				if (r.cssRules) walk(r.cssRules);
			}
		};
		let rules = null;
		try {
			const sheet = new CSSStyleSheet();
			sheet.replaceSync(text);
			rules = sheet.cssRules;
		} catch {
			try {
				rules = sheetOf(el)?.cssRules ?? null;
			} catch {}
		}
		if (!rules) {
			if (text.trim()) info.grids.push("*");
			return info;
		}
		try {
			walk(rules);
		} catch {
			info.grids.push("*");
		}
		gridRules.set(el, info);
		return info;
	}
	/** The widget's stylesheets read again: the rules that may make a grid, and whether an animation may. */
	function readGridSheets() {
		layoutSheetsDirty = false;
		const grids = [];
		const animated = [];
		let keyframes = false;
		for (const el of widgetStyles) {
			const info = sheetGrids(el);
			grids.push(...info.grids);
			animated.push(...info.animated);
			keyframes || (keyframes = info.keyframes);
		}
		if (keyframes !== gridKeyframes) {
			gridKeyframes = keyframes;
			for (const node of nodes.values()) if (node instanceof Element && getAttribute(node, "style") !== null) noteInlineGrid(node);
		}
		gridSelector = (keyframes ? grids.concat(animated) : grids).map((selector) => {
			const wide = widenSelector(selector);
			try {
				matches(HTML, wide);
				return wide;
			} catch {
				return "*";
			}
		}).join(",");
	}
	/**
	* Before anything lays the widget out: the boxes the layout makes afresh, and past the budget the stop. `always`:
	* counted whatever was counted before, the widget stopped too — after the renderer changed the DOM itself (the stopped
	* badge, the sheet without effects), which the widget's selectors see as they see its own changes.
	*/
	function checkLayout(always = false) {
		if (!HTML || !always && (!layoutDirty || layoutStopped)) return;
		layoutDirty = false;
		if (layoutSheetsDirty) readGridSheets();
		if (!gridSelector && !inlineGrid.size && !animatedGrid.size) return;
		const levels = [];
		let count = 0;
		const visit = (node, level) => {
			const own = ids.has(node);
			if (own) {
				count++;
				levels[level] = (levels[level] ?? 0) + 1;
			}
			if (!(node instanceof Element)) return;
			const below = own && level < 63 && mayGrid(node) ? level + 1 : level;
			for (let c = firstChildOf(node); c; c = nextSiblingOf(c)) visit(c, below);
		};
		visit(HTML, 0);
		const budget = layoutBudget(count);
		let boxes = 0, keep = 0;
		for (let level = 0; level < levels.length; level++) {
			boxes += (levels[level] ?? 0) * 2 ** level;
			if (boxes > budget) break;
			keep = level;
		}
		if (boxes <= budget) return;
		const cut = (el, level) => {
			const grid = ids.has(el) && mayGrid(el);
			if (grid && level >= keep) return styleOf(el).setProperty("display", "none", "important");
			for (let c = firstChildOf(el); c; c = nextSiblingOf(c)) if (c instanceof Element) cut(c, grid ? level + 1 : level);
		};
		cut(HTML, 0);
		if (layoutStopped) return;
		layoutStopped = true;
		post({
			type: "limit",
			code: "layout-limit",
			count: Math.min(boxes, Number.MAX_SAFE_INTEGER)
		});
	}
	function onMessage(msg) {
		switch (msg.type) {
			case "ops":
				if (paintStopped || layoutStopped) break;
				for (const op of msg.ops) {
					if (op.op === "prop" || op.op === "call" || op.op === "canvas") checkLayout();
					if (layoutStopped) break;
					try {
						if (paintOn) paintBefore(op);
						applyOp(op);
					} catch (e) {
						violation("op failed: " + String(e));
					}
					if (paintOn) try {
						paintAfter(op);
					} catch {}
					try {
						layoutAfter(op);
					} catch {
						layoutDirty = layoutSheetsDirty = true;
					}
				}
				checkLayout();
				scheduleCanvas();
				if (!env.deferSize) reportSize();
				if (hostHidden) pauseTransitions();
				break;
			case "query": {
				let res;
				checkLayout();
				try {
					res = answer(msg.query);
				} catch (e) {
					res = { result: { error: String(e) } };
				}
				post({
					type: "result",
					qid: msg.qid,
					result: res.result,
					binary: res.binary
				}, res.binary ? [res.binary] : []);
				break;
			}
			case "listen": {
				interest = new Set(msg.types);
				const now = sharedNow();
				const since = msg.since ?? Infinity;
				const early = earlyEvents.filter((e) => now - e.at < EARLY_EVENTS_MS);
				earlyEvents = early.filter(({ ev }) => !interest.has(ev.type));
				for (const e of early) if (interest.has(e.ev.type) && e.at >= since) post({
					type: "event",
					ev: e.ev,
					trusted: true
				});
				break;
			}
			case "preventDefault":
				preventKeys = new Set(msg.keys);
				break;
			case "anim": {
				if (paintStopped || layoutStopped) break;
				const reached = [];
				for (const r of msg.anims) {
					if (!("css" in r)) continue;
					const a = animations.cssById.get(r.css.origin)?.deref();
					if (!a) continue;
					pausedTransitions.delete(a);
					heldCss.delete(a);
					if (hostHidden && !r.cancelled) reached.push(a);
				}
				try {
					applyAnims(animations, msg.now, msg.anims, (id) => nodes.get(id));
				} catch (e) {
					violation("anim failed: " + String(e));
				}
				for (const r of msg.anims) if ("remove" in r) noteGridAnimation(r.aid, null);
				else if ("keyframes" in r) {
					const target = nodes.get(r.target);
					const grid = r.keyframes.some((f) => mayDisplayGrid(f.values.display ?? "") || mayAllGrid(f.values.all ?? ""));
					noteGridAnimation(r.aid, grid && target instanceof Element ? target : null);
				}
				checkLayout();
				if (hostHidden) {
					pauseForHost();
					for (const a of reached) holdCssForHost(a);
				}
				scriptedPaint = /* @__PURE__ */ new WeakMap();
				schedulePaint();
				break;
			}
			case "requestFrame":
				if (frozen || paintStopped || frameReq) break;
				frameReq = win.requestAnimationFrame(onFrame);
				break;
			case "frozen":
				freeze(String(msg.reason), !!msg.fatal);
				break;
			case "visibility":
				setHostHidden(!msg.visible);
				break;
			case "arbitrate":
				rtl = msg.rtl === true;
				bubbleMode = msg.bubble === true ? {
					touch: msg.touch === true,
					rtl
				} : null;
				break;
			case "theme":
				themeVars = themeVariables(msg.theme);
				applyThemeVariables();
				env.frameColorScheme?.(themeVars["--tg-color-scheme"] === "dark" ? "dark" : "light");
				canvasDirty = true;
				scheduleCanvas();
				paintEverything();
				break;
			case "safeArea":
				safeAreaVars = contentSafeAreaVariables(msg.inset);
				applyThemeVariables();
				paintEverything();
				break;
			case "policy": {
				const on = msg.policy !== "compat";
				paintReports = msg.paintReports === true;
				lastPaintReport = "";
				if (on && !paintOn) paintAll = true;
				paintOn = on;
				if (!on && paintFrame) {
					win.cancelAnimationFrame(paintFrame);
					paintFrame = 0;
				}
				schedulePaint();
				break;
			}
		}
	}
	let themeVars = {};
	/** The client's chrome over the widget (docs/sdk-v1.md §2.17): always set, 0 until the host says otherwise. */
	let safeAreaVars = contentSafeAreaVariables(null);
	/** The host's variables, inline and important on the widget's root: no widget stylesheet or root style op overrides them. */
	function applyThemeVariables() {
		if (!HTML) return;
		const style = styleOf(HTML);
		for (const name of THEME_VARIABLES) {
			const v = themeVars[name] ?? safeAreaVars[name];
			if (v === void 0) style.removeProperty(name);
			else style.setProperty(name, v, "important");
		}
	}
	let canvasDirty = true;
	/** What the canvas was given last (`CANVAS_PROPS` order). */
	let canvasValues = [];
	/** Painted on the canvas element; `background-attachment` stays `scroll` (fixed would follow the chat page's viewport). */
	const CANVAS_PROPS = [
		"background-color",
		"background-image",
		"background-position",
		"background-size",
		"background-repeat",
		"background-origin",
		"background-clip"
	];
	const transparentColor = (c) => c === "transparent" || /^rgba\(\s*0,\s*0,\s*0,\s*0\s*\)$/.test(c);
	/**
	* CSS paints a document's canvas with the root element's background, or with the body's when the root has none
	* (and a body background then reaches the whole bubble, its margins included). A shadow root has no canvas, so the
	* core does it on `env.canvas` after every change that can move either background. Widget content only: the values
	* are the widget's own computed, validated ones; the bubble's own colour is behind the renderer, never painted here.
	*/
	function syncCanvas() {
		const canvas = env.canvas;
		if (!canvas || !canvasDirty || !HTML || !BODY) return;
		canvasDirty = false;
		const root = getComputedStyle(HTML);
		const src = root.backgroundImage !== "none" || !transparentColor(root.backgroundColor) ? root : getComputedStyle(BODY);
		const values = CANVAS_PROPS.map((p) => src.getPropertyValue(p));
		if (values.every((v, i) => v === canvasValues[i])) return;
		canvasValues = values;
		const style = styleOf(canvas);
		CANVAS_PROPS.forEach((p, i) => style.setProperty(p, values[i]));
	}
	let canvasFrame = 0;
	/**
	* tweb (`deferSize`): the canvas follows once a frame, before it paints, and when the host takes the size (`flushSize`)
	* — a sync reads computed styles, and after every batch of a widget being built that was a style recalculation of the
	* whole page apiece.
	*/
	function scheduleCanvas() {
		if (!env.deferSize) return syncCanvas();
		if (canvasFrame || !canvasDirty || !env.canvas) return;
		canvasFrame = win.requestAnimationFrame(() => {
			canvasFrame = 0;
			syncCanvas();
		});
	}
	/** The size now, and the canvas with it (the layout is done by then, so reading the backgrounds costs nothing more). */
	function flushSize() {
		reportSize();
		syncCanvas();
	}
	/** Whether a press on `t` may start a text selection: the nearest `user-select` that is not `auto`, from the target up to the root, where the UA layer says none (D18). */
	function selectable(t) {
		let el = t instanceof Element ? t : t instanceof Node ? t.parentElement : null;
		while (el) {
			const cs = getComputedStyle(el);
			const v = cs.userSelect || cs.webkitUserSelect;
			if (v && v !== "auto") return v !== "none";
			if (el === HTML) return false;
			el = el.parentElement;
		}
		return false;
	}
	/**
	* The host reports that the widget's runtime died (fatal) or was stopped. The
	* DOM stays exactly as it was (the shim flushes ops only at the end of a task,
	* so a kill mid-task leaves the previous consistent state), events and frames
	* stop, and a small badge — a renderer element, never part of the widget's
	* node table — tells the user. Both the stylesheet and the badge are trusted
	* renderer content; nothing here comes from the widget.
	*/
	function freeze(reason, fatal) {
		if (frozen) return;
		frozen = true;
		if (frameReq) {
			win.cancelAnimationFrame(frameReq);
			frameReq = 0;
		}
		if (moveFrame) {
			win.cancelAnimationFrame(moveFrame);
			moveFrame = 0;
		}
		pendingMoves.clear();
		for (const a of animationsOf()) try {
			a.pause();
		} catch {}
		hostPaused.clear();
		pausedTransitions.clear();
		heldCss.clear();
		setAttribute(HTML, "data-tw-frozen", fatal ? "fatal" : "paused");
		const style = createElement(doc, "style");
		setTextContent(style, "[data-tw-frozen]{pointer-events:none}[data-tw-frozen=fatal]{filter:grayscale(.3)}[data-tw-badge]{position:fixed;right:6px;bottom:6px;z-index:2147483647;font:11px/1.3 system-ui,sans-serif;color:#fff;background:rgba(60,60,60,.75);padding:2px 7px;border-radius:9px;pointer-events:none;user-select:none}");
		insertBefore(HEAD, style, null);
		if (reason) {
			const badge = createElement(doc, "div");
			setAttribute(badge, "data-tw-badge", fatal ? "fatal" : "paused");
			setTextContent(badge, reason);
			insertBefore(BODY, badge, null);
		}
		checkLayout(true);
	}
	let sizeObservers = [];
	let offViewport = null;
	/** Input the chat keeps (SWALLOWED): never forwarded to the widget, and without its default action inside it. */
	function swallow(e) {
		if (e.type === "mousedown" || e.type === "selectstart") {
			if (e.cancelable && !selectable(e.target)) e.preventDefault();
			return;
		}
		if (e.type === "focusin") {
			const t = e.target;
			if (t instanceof HTMLElement || t instanceof SVGElement) (t instanceof SVGElement ? SVGElement.prototype.blur : HTMLElement.prototype.blur).call(t);
			return;
		}
		if (e.cancelable) e.preventDefault();
	}
	/**
	* tweb: the press held on the widget, as `[data-tw-active]` on the pressed element and its ancestors — what `:active`
	* becomes in a shadow root's stylesheets (css-sanitizer.ts): Firefox applies no `:active` after the mousedown that
	* `swallow` cancels.
	*/
	let pressed = [];
	/**
	* tweb: the pointers whose trusted press began on the widget, until they are let go — the only ones it may capture — and
	* whether the pointer whose buttons changed last was one of them: pressed, let go (the window hears a release before the
	* root does) or chorded (a button pressed or let go while another is held: a pointermove and its mouse event, no
	* pointerdown or pointerup). A compatibility mouse event follows its pointer's change at once.
	*/
	const ownPointers = /* @__PURE__ */ new Set();
	let changedOwn = false;
	/** Of those, the fingers' and pens' still down (a press of theirs is no gesture before its release), and whether the pointer whose buttons changed last is one. */
	const fingersDown = /* @__PURE__ */ new Set();
	let changedFingerDown = false;
	const isFingerOrPen = (e) => e.pointerType === "touch" || e.pointerType === "pen";
	function press(e) {
		if (e.isTrusted) {
			const id = e.pointerId;
			ownPointers.add(id);
			if (isFingerOrPen(e)) fingersDown.add(id);
			changedOwn = true;
			changedFingerDown = fingersDown.has(id);
		}
		if (e.button !== 0) return;
		release();
		for (let n = e.target instanceof Element ? e.target : null; n; n = parentNodeOf(n)) {
			if (!(n instanceof Element)) break;
			n.setAttribute("data-tw-active", "");
			pressed.push(n);
			if (n === HTML) break;
		}
		pressChanged(pressed);
	}
	function release() {
		const was = pressed;
		for (const n of was) n.removeAttribute("data-tw-active");
		pressed = [];
		pressChanged(was);
	}
	function buttonsChanged(e) {
		if (!e.isTrusted || e.button === -1) return;
		const id = e.pointerId;
		changedOwn = ownPointers.has(id);
		changedFingerDown = fingersDown.has(id);
	}
	/** A pointer let go anywhere in the window (a press ends wherever its pointer is let go). */
	function letGo(e) {
		const id = e.pointerId;
		changedOwn = ownPointers.delete(id);
		fingersDown.delete(id);
		changedFingerDown = false;
		release();
	}
	function init(s) {
		send = s;
		({html: HTML, head: HEAD, body: BODY} = env.roots());
		const ua = createElement(doc, "style");
		setTextContent(ua, (root instanceof ShadowRoot ? PROFILE_UA_STYLESHEET.replace(/:active/g, "[data-tw-active]") : PROFILE_UA_STYLESHEET) + (env.emoji ? CLIENT_TEXT_CSS : ""));
		insertBefore(HEAD, ua, firstChildOf(HEAD));
		root.addEventListener("pointerdown", press, true);
		root.addEventListener("pointermove", buttonsChanged, true);
		for (const type of SWALLOWED) root.addEventListener(type, swallow, {
			capture: true,
			passive: false
		});
		for (const type of ALL_EVENTS) root.addEventListener(type, onEvent, {
			capture: true,
			passive: false
		});
		if (root instanceof ShadowRoot) for (const type of ENTER_LEAVE) root.host.addEventListener(type, noop, true);
		for (const type of [
			"auxclick",
			"dragstart",
			"dblclick"
		]) root.addEventListener(type, (e) => e.preventDefault(), true);
		for (const type of PAINT_ANIMATION_EVENTS) root.addEventListener(type, onPaintAnimation, true);
		for (const type of PAINT_INPUT_EVENTS) root.addEventListener(type, onPaintInput, true);
		win = HTML.ownerDocument.defaultView ?? window;
		win.addEventListener("pointerup", letGo, true);
		win.addEventListener("pointercancel", letGo, true);
		observeOwnSize();
		reportSize();
	}
	/** The observers of the widget's own size, the viewport and the colour scheme, made in `win`. */
	function observeOwnSize() {
		const RO = win.ResizeObserver;
		sizeObservers = [new RO(reportSize), new RO(reportSize)];
		sizeObservers[0].observe(HTML);
		sizeObservers[1].observe(BODY);
		const offResize = env.onViewportResize(reportSize);
		const offScheme = env.onColorSchemeChange(() => post({ type: "media" }));
		offViewport = () => {
			offResize();
			offScheme();
		};
	}
	function rebind() {
		for (const el of root.querySelectorAll("style")) widenSheet(el, true);
		const next = HTML?.ownerDocument.defaultView;
		if (!next || next === win) return;
		const prev = win;
		win = next;
		prev.removeEventListener("pointerup", letGo, true);
		prev.removeEventListener("pointercancel", letGo, true);
		win.addEventListener("pointerup", letGo, true);
		win.addEventListener("pointercancel", letGo, true);
		if (frameReq) {
			prev.cancelAnimationFrame(frameReq);
			frameReq = win.requestAnimationFrame(onFrame);
		}
		if (moveFrame) {
			prev.cancelAnimationFrame(moveFrame);
			moveFrame = win.requestAnimationFrame(flushMoves);
		}
		if (canvasFrame) {
			prev.cancelAnimationFrame(canvasFrame);
			canvasFrame = 0;
			scheduleCanvas();
		}
		if (paintFrame) {
			prev.cancelAnimationFrame(paintFrame);
			paintFrame = 0;
			schedulePaint();
		}
		const toNext = prev.performance.timeOrigin - win.performance.timeOrigin;
		for (const [aid, a] of animations.scripted) {
			const timeline = (a.effect?.target)?.ownerDocument.timeline;
			if (!timeline || a.timeline === timeline) continue;
			const time = a.currentTime, running = a.playState === "running";
			try {
				a.timeline = timeline;
				if (running && time !== null) a.currentTime = time;
			} catch {}
			const start = animations.startTimes.get(aid);
			if (start === void 0) continue;
			animations.startTimes.set(aid, typeof a.startTime === "number" ? a.startTime : start + toNext);
		}
		resizeObserver.disconnect();
		resizeObserver = new win.ResizeObserver(onResizeEntries);
		for (const el of observed) resizeObserver.observe(el);
		for (const o of sizeObservers) o.disconnect();
		offViewport?.();
		observeOwnSize();
		reportSize();
	}
	function destroy() {
		for (const type of ALL_EVENTS) root.removeEventListener(type, onEvent, { capture: true });
		for (const type of SWALLOWED) root.removeEventListener(type, swallow, { capture: true });
		root.removeEventListener("pointerdown", press, true);
		root.removeEventListener("pointermove", buttonsChanged, true);
		win?.removeEventListener("pointerup", letGo, true);
		win?.removeEventListener("pointercancel", letGo, true);
		release();
		ownPointers.clear();
		fingersDown.clear();
		if (root instanceof ShadowRoot) for (const type of ENTER_LEAVE) root.host.removeEventListener(type, noop, true);
		for (const type of PAINT_ANIMATION_EVENTS) root.removeEventListener(type, onPaintAnimation, true);
		for (const type of PAINT_INPUT_EVENTS) root.removeEventListener(type, onPaintInput, true);
		if (paintFrame) {
			win.cancelAnimationFrame(paintFrame);
			paintFrame = 0;
		}
		for (const o of sizeObservers) o.disconnect();
		sizeObservers = [];
		offViewport?.();
		offViewport = null;
		resizeObserver.disconnect();
		observed.clear();
		if (frameReq) {
			win.cancelAnimationFrame(frameReq);
			frameReq = 0;
		}
		if (moveFrame) {
			win.cancelAnimationFrame(moveFrame);
			moveFrame = 0;
		}
		if (canvasFrame) {
			win.cancelAnimationFrame(canvasFrame);
			canvasFrame = 0;
		}
		clearHold();
		send = () => {};
	}
	return {
		init,
		onMessage,
		flushSize,
		rebind,
		destroy
	};
}
//#endregion
//#region src/vendor/widget-sandbox/src/host/shadow-renderer.ts
var _ShadowDomRenderer;
/**
* Base styles of the shadow tree. `:host { all: initial }` cuts inheritance
* from the chat page so the widget starts from UA defaults like in a frame;
* the width/height media queries and viewport units the sanitizer turned into
* `@container tw` queries / `cq*` units resolve against the host
* (`container-type: size`: the host's height is explicit, set by WidgetHost
* from the size reports measured on the inner <html>, so `100cqh` is the
* bubble height exactly as `100vh` was the frame's — the same fixed point).
* `:where()` keeps the specificity at zero: the widget's own `html { }` /
* `body { }` rules always win. `flow-root` on <html> keeps body margins inside
* the measured height (our <html> is not a root element, its margins would
* otherwise collapse through). The body's margin and padding, the font and the
* colours come from the renderer's UA layer (profile.json `uaStylesheet`), as in
* the iframe: an unlayered rule here would beat that layer. The host element is
* the canvas: the renderer core paints the root's or the body's background on it
* (`RendererEnv.canvas`), so a body background covers the body's margins too.
*/
var BASE_CSS = ":host{all:initial;direction:ltr;display:block;width:100%;position:relative;contain:layout paint style;container-type:size;container-name:tw}:where(html){display:flow-root;position:relative;min-height:0}:where(head){display:none}:where(body){display:block}";
/** tweb: the client's own emoji (RendererEnv.emoji) for every renderer made from now on; none: the platform's font. */
var clientEmoji;
function setClientEmoji(emoji) {
	clientEmoji = emoji;
}
/** `(min-width: 400px)`-style queries on the widget's own box; anything else goes to the window. */
var SIZE_QUERY = /^\s*\(\s*(min|max)-(width|height)\s*:\s*([\d.]+)px\s*\)\s*$/i;
var ShadowDomRenderer = class {
	constructor(container, theme) {
		_defineProperty(
			this,
			/** Tells WidgetHost to run the validator in shadow scope (`:root`, `:host`, `@media`, viewport units). */
			"cssScope",
			"shadow"
		);
		_defineProperty(this, "element", void 0);
		_defineProperty(this, "onMessage", null);
		_defineProperty(this, "onDiag", null);
		_defineProperty(this, "shadow", void 0);
		_defineProperty(this, "html", void 0);
		_defineProperty(this, "core", void 0);
		_defineProperty(this, "queued", []);
		_defineProperty(this, "destroyed", false);
		const el = document.createElement("div");
		el.className = "widget-frame widget-shadow";
		el.style.colorScheme = theme;
		this.element = el;
		this.shadow = el.attachShadow({ mode: "open" });
		const base = document.createElement("style");
		base.textContent = BASE_CSS;
		const html = document.createElement("html");
		html.setAttribute("data-tw-root", "");
		const head = document.createElement("head");
		const body = document.createElement("body");
		html.append(head, body);
		this.shadow.append(base, html);
		this.html = html;
		this.core = createRenderer(this.env(head, body));
		container.appendChild(el);
	}
	env(head, body) {
		const html = this.html;
		const el = this.element;
		const ownerWindow = () => el.ownerDocument.defaultView ?? window;
		let layout = null;
		const layoutWidth = () => {
			const win = ownerWindow();
			if (layout?.win !== win) layout = {
				win,
				style: win.getComputedStyle(el)
			};
			return parseFloat(layout.style.width);
		};
		const scale = () => {
			const w = layoutWidth();
			const s = w > 0 ? el.getBoundingClientRect().width / w : 1;
			return s > 0 && Math.abs(s - 1) > .001 ? s : 1;
		};
		return {
			doc: document,
			root: this.shadow,
			roots: () => ({
				html,
				head,
				body
			}),
			origin: () => {
				const r = html.getBoundingClientRect();
				return {
					x: r.left,
					y: r.top,
					scale: scale()
				};
			},
			viewport: () => ({
				innerWidth: el.clientWidth,
				innerHeight: el.clientHeight,
				dpr: ownerWindow().devicePixelRatio
			}),
			docHeight: () => {
				const h = html.getBoundingClientRect().height, s = scale();
				return Math.ceil(s === 1 ? h : h / s - .001);
			},
			matchMedia: (query) => {
				const m = SIZE_QUERY.exec(query);
				if (!m) return ownerWindow().matchMedia(query).matches;
				const actual = m[2].toLowerCase() === "width" ? el.clientWidth : el.clientHeight;
				const limit = parseFloat(m[3]);
				return m[1].toLowerCase() === "min" ? actual >= limit : actual <= limit;
			},
			onViewportResize: (cb) => {
				const ro = new (ownerWindow()).ResizeObserver(cb);
				ro.observe(el);
				return () => ro.disconnect();
			},
			onColorSchemeChange: (cb) => {
				const mq = ownerWindow().matchMedia("(prefers-color-scheme: dark)");
				mq.addEventListener("change", cb);
				return () => mq.removeEventListener("change", cb);
			},
			deferSize: true,
			canvas: el,
			emoji: clientEmoji
		};
	}
	load() {
		if (this.destroyed || !this.queued) return;
		this.core.init((msg) => {
			if (!this.destroyed) this.onMessage?.(msg);
		});
		const q = this.queued;
		this.queued = null;
		for (const msg of q) this.core.onMessage(msg);
	}
	send(msg) {
		if (this.destroyed) return;
		if (this.queued) this.queued.push(msg);
		else this.core.onMessage(msg);
	}
	setTheme(theme) {
		this.element.style.colorScheme = theme;
	}
	flushSize() {
		if (!this.destroyed && !this.queued) this.core.flushSize();
	}
	rebind() {
		if (!this.destroyed && !this.queued) this.core.rebind();
	}
	destroy() {
		if (this.destroyed) return;
		this.destroyed = true;
		this.core.destroy();
		this.element.remove();
	}
};
_ShadowDomRenderer = ShadowDomRenderer;
_defineProperty(ShadowDomRenderer, "factory", (container, theme) => new _ShadowDomRenderer(container, theme));
//#endregion
export { ShadowDomRenderer, paintLimitMessage as n, setClientEmoji, checkPaintLimit as t };
