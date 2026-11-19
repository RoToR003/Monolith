//# allFunctionsCalledOnLoad
import { t as hotEffect } from "./hotModule-aCRkP77w.js";
import { t as liteMode } from "./liteMode-DeLStZfQ.js";
import { t as animateValue } from "./animateValue-C0de6s5K.js";
import { t as throttleWithRaf } from "./throttleWithRaf-CCqKl0-N.js";
//#region src/environment/textHighlightSupport.ts
var IS_TEXT_HIGHLIGHT_SUPPORTED = typeof CSS !== "undefined" && "highlights" in CSS && typeof Highlight === "function";
//#endregion
//#region src/helpers/string/escapeRegExp.ts
function escapeRegExp(str) {
	return str.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}
//#endregion
//#region src/helpers/dom/textHighlight.scss?inline
var textHighlight_default = "::highlight(tg-search),\n::highlight(tg-quote) {\n  background-color: color-mix(in srgb, var(--selection-background-color) calc(100% * var(--text-highlight-opacity, 1)), transparent);\n}\n\n.chatlist-chat ::highlight(tg-search) {\n  background-color: var(--chatlist-search-highlight-background, transparent);\n  color: var(--chatlist-search-highlight-color, var(--primary-color));\n}";
//#endregion
//#region src/helpers/dom/textHighlight.ts
/**
* Text highlighting for arbitrary rendered DOM — search matches in bubbles and chat-list rows,
* the quoted part of a replied-to message, …
*
* The matched text is described by live `Range`s over the container's text nodes, so entities,
* custom emoji, spoilers, code blocks and translations stay untouched and a match that wraps
* over several lines is still a single range. Two ways to paint them:
*
* - default: the CSS Custom Highlight API — ranges registered under a global `Highlight`
*   (`CSS.highlights`) and styled by `::highlight(<name>)` rules (see
*   `helpers/dom/textHighlight.scss`). Nothing is inserted into the text DOM, but browsers paint
*   only glyph-high boxes, which leaves gaps between wrapped lines;
* - `lineBoxes`: an absolutely positioned overlay inside the container with one box per line,
*   stretched to the full line height — a contiguous block like a text selection. Needs a
*   positioned container that paints its background below its text.
*
* A highlight re-finds its text whenever the container mutates (translation swap, re-render …)
* or is re-laid out, and is dropped automatically once its container has left the document for
* good, so callers that cannot easily track the lifetime of their element do not have to.
*/
var HIGHLIGHT_NAMES = {
	search: "tg-search",
	quote: "tg-quote"
};
var HIGHLIGHT_PRIORITIES = {
	search: 1,
	quote: 2
};
/** inherited by `::highlight()` / read by the overlay from the container, animated by `fadeOut` */
var OPACITY_PROPERTY = "--text-highlight-opacity";
var FADE_DURATION = 400;
var OVERLAY_CLASS = "text-highlight-overlay";
var OVERLAY_BOX_CLASS = "text-highlight-overlay-box";
/** `animateIn` overlay states: the intro is on / the whole-text selection is still transparent / narrowing */
var OVERLAY_INTRO_CLASS = "is-intro";
var OVERLAY_APPEARING_CLASS = "is-appearing";
var OVERLAY_NARROWING_CLASS = "is-narrowing";
/** hairline gaps between consecutive line boxes (rounding, mixed inline heights) get closed */
var LINE_BOX_SNAP = 3;
/** `animateIn`: the whole-text selection fades in (must match the transition in scss) … */
var NARROW_APPEAR = 200;
/** … then narrows down to the match over this long (must match the transition in scss) */
var NARROW_DURATION = 400;
/** elements `extractText` reads as their text (`alt` / `data-sticker-emoji`) instead of what they hold */
var TEXT_STANDING_SELECTOR = "[data-sticker-emoji], img[alt]:not([alt=\"\"])";
/** icons are text glyphs in a private-use range — never part of the searchable text */
var DEFAULT_SKIP = `.tgico, .${OVERLAY_CLASS}`;
var WORD_CHARACTER = "\\p{L}\\p{N}\\p{M}";
var WORD_START = `(?<![${WORD_CHARACTER}])`;
/** what `extractText` passes by: icons, and `skip` on top of them */
function getTextSkip(skip) {
	return skip ? `${DEFAULT_SKIP}, ${skip}` : DEFAULT_SKIP;
}
var getMathSource = (element) => {
	const { dataset } = element;
	return ("inlineMath" in dataset || "blockMath" in dataset) && dataset.source;
};
/**
* collects the visible text of `root` together with the DOM positions it came from; `sourceText`
* reads an element drawn otherwise than the text it stands for (a date in local time) as that text
*/
function extractText(root, skip = DEFAULT_SKIP, { sourceText } = {}) {
	const segments = [];
	let text = "";
	const push = (node, value, atomic) => {
		if (!value) return;
		segments.push({
			node,
			start: text.length,
			end: text.length + value.length,
			atomic
		});
		text += value;
	};
	const visit = (node) => {
		if (node.nodeType === Node.TEXT_NODE) {
			push(node, node.data, false);
			return;
		}
		if (node.nodeType !== Node.ELEMENT_NODE) return;
		const element = node;
		if (element.matches(skip)) return;
		const alt = sourceText && (element.dataset.originalText || getMathSource(element)) || element.dataset.stickerEmoji || element.alt;
		if (alt) {
			push(element, alt, true);
			return;
		}
		for (let child = node.firstChild; child; child = child.nextSibling) visit(child);
	};
	visit(root);
	return {
		text,
		segments
	};
}
function execAll(regExp, text) {
	const spans = [];
	let match;
	while ((match = regExp.exec(text)) !== null) {
		if (!match[0].length) {
			++regExp.lastIndex;
			continue;
		}
		spans.push([match.index, match.index + match[0].length]);
	}
	return spans;
}
function mergeSpans(spans) {
	spans.sort((a, b) => a[0] - b[0]);
	const merged = [];
	for (const span of spans) {
		const last = merged[merged.length - 1];
		if (last && span[0] < last[1]) last[1] = Math.max(last[1], span[1]);
		else merged.push([span[0], span[1]]);
	}
	return merged;
}
/**
* What the server search matched: the whole query as a phrase, otherwise every query word as
* a word prefix (extended to the end of the word it starts, so "hel" lights up "hello"). Falls
* back to shorter prefixes of a word — down to half of it — the way tdesktop does.
*/
function findSearchSpans(text, query) {
	query = query.trim();
	if (!query || !text) return [];
	const phrase = execAll(new RegExp(`${WORD_START}${escapeRegExp(query)}(?![${WORD_CHARACTER}])`, "giu"), text);
	if (phrase.length) return mergeSpans(phrase);
	const spans = [];
	const words = query.split(new RegExp(`[^${WORD_CHARACTER}]+`, "u")).filter(Boolean);
	for (const word of words) {
		const minLength = Math.ceil(word.length / 2);
		for (let length = word.length; length >= minLength; --length) {
			const prefix = escapeRegExp(word.slice(0, length));
			const found = execAll(new RegExp(`${WORD_START}${prefix}[${WORD_CHARACTER}]*`, "giu"), text);
			if (found.length) {
				spans.push(...found);
				break;
			}
		}
	}
	return mergeSpans(spans);
}
function findNearest(text, needle, hint) {
	hint = Math.max(0, Math.min(hint, text.length));
	const after = text.indexOf(needle, hint);
	const before = text.lastIndexOf(needle, hint);
	if (after === -1 && before === -1) return;
	const start = after === -1 ? before : before === -1 ? after : hint - before <= after - hint ? before : after;
	return [start, start + needle.length];
}
/**
* The quote is a verbatim slice of the message text, `offset` is where it started there. The
* rendered text may differ slightly (dropped line breaks around block quotes, media captions
* preceded by a file name, an emoji completed by its variation selector …), hence the occurrence
* nearest to the offset, of the exact text or of the text whitespace and variation selectors aside.
*/
function findQuoteSpan(text, quote, offset = 0) {
	if (!quote || !text) return;
	const exact = findNearest(text, quote, offset);
	const loose = findLooseQuoteSpan(text, quote, offset);
	return exact && loose && Math.abs(loose[0] - offset) < Math.abs(exact[0] - offset) ? loose : exact ?? loose;
}
function findLooseQuoteSpan(text, quote, offset) {
	const needle = quote.replace(/[\s\ufe0f]+/g, "");
	if (!needle) return;
	const map = [];
	let stripped = "";
	let strippedHint = 0;
	for (let i = 0; i < text.length; ++i) {
		if (i === offset) strippedHint = stripped.length;
		if (!/[\s\ufe0f]/.test(text[i])) {
			map.push(i);
			stripped += text[i];
		}
	}
	if (offset >= text.length) strippedHint = stripped.length;
	const found = findNearest(stripped, needle, strippedHint);
	return found && [map[found[0]], map[found[1] - 1] + 1];
}
function findSpans(text, match) {
	if (match.type === "search") return findSearchSpans(text, match.query);
	const span = findQuoteSpan(text, match.text, match.offset);
	return span ? [span] : [];
}
/** turns text spans into DOM ranges over the container's text */
function computeRanges(container, match, skip) {
	const { text, segments } = extractText(container, getTextSkip(skip), { sourceText: match.type === "quote" });
	const ranges = [];
	if (!segments.length) return ranges;
	let index = 0;
	for (const [start, end] of findSpans(text, match)) {
		while (index < segments.length && segments[index].end <= start) ++index;
		const startSegment = segments[index];
		if (!startSegment) break;
		let endIndex = index;
		while (segments[endIndex].end < end && endIndex + 1 < segments.length) ++endIndex;
		const endSegment = segments[endIndex];
		const range = new Range();
		if (startSegment.atomic) range.setStartBefore(startSegment.node);
		else range.setStart(startSegment.node, start - startSegment.start);
		if (endSegment.atomic) range.setEndAfter(endSegment.node);
		else range.setEnd(endSegment.node, Math.min(end, endSegment.end) - endSegment.start);
		ranges.push(range);
	}
	return ranges;
}
/**
* Where the match sits on the screen right now, without painting anything: the rect of its
* first occurrence (the whole of it, several lines included). For scrolling the text into
* view before the highlight is applied to it.
*/
function findTextRect(container, match, skip) {
	const [range] = computeRanges(container, match, skip);
	const rect = range?.getBoundingClientRect();
	return rect?.height ? rect : void 0;
}
/**
* Turns the ranges' fragment rects into per-line boxes stretched to the line height (glyph rects
* are only font-high; the missing half-leading is added on both sides), unioned along a line
* and expressed relative to `origin`, in its own pixels: `scale` is how much bigger the screen
* shows them (an ancestor scaled - a bubble zooming in as its chat opens).
*/
function computeLineBoxes(ranges, origin, lineHeight, scale = {
	x: 1,
	y: 1
}) {
	const fragments = [];
	for (const range of ranges) for (const rect of range.getClientRects()) {
		if (!rect.width || !rect.height) continue;
		const top = (rect.top - origin.top) / scale.y, bottom = (rect.bottom - origin.top) / scale.y;
		const extra = Math.max(0, lineHeight - (bottom - top)) / 2;
		fragments.push({
			left: (rect.left - origin.left) / scale.x,
			right: (rect.right - origin.left) / scale.x,
			top: top - extra,
			bottom: bottom + extra
		});
	}
	fragments.sort((a, b) => a.top - b.top || a.left - b.left);
	const boxes = [];
	for (const fragment of fragments) {
		const last = boxes[boxes.length - 1];
		if (last) {
			if (Math.min(last.bottom, fragment.bottom) - Math.max(last.top, fragment.top) >= Math.min(last.bottom - last.top, fragment.bottom - fragment.top) / 2 && fragment.left <= last.right + 1 && fragment.right >= last.left - 1) {
				last.left = Math.min(last.left, fragment.left);
				last.right = Math.max(last.right, fragment.right);
				last.top = Math.min(last.top, fragment.top);
				last.bottom = Math.max(last.bottom, fragment.bottom);
				continue;
			}
		}
		boxes.push({ ...fragment });
	}
	for (let i = 1; i < boxes.length; ++i) {
		const previous = boxes[i - 1], box = boxes[i];
		const gap = box.top - previous.bottom;
		if (gap > 0 && gap < LINE_BOX_SNAP) previous.bottom = box.top = (previous.bottom + box.top) / 2;
	}
	return boxes.map((box) => ({
		left: box.left,
		top: box.top,
		width: box.right - box.left,
		height: box.bottom - box.top
	}));
}
/** ranges over all the searchable text of the container shown (skipped subtrees excluded at the ends) */
function computeFullRanges(container, skip) {
	const { segments } = extractText(container, getTextSkip(skip));
	const hidden = Array.from(container.querySelectorAll("[inert]"));
	const ranges = [];
	let first, last;
	const flush = () => {
		if (!first) return;
		const range = new Range();
		if (first.atomic) range.setStartBefore(first.node);
		else range.setStart(first.node, 0);
		if (last.atomic) range.setEndAfter(last.node);
		else range.setEnd(last.node, last.end - last.start);
		ranges.push(range);
		first = last = void 0;
	};
	for (const segment of segments) {
		if (hidden.some((element) => element.contains(segment.node))) {
			flush();
			continue;
		}
		first ?? (first = segment);
		last = segment;
	}
	flush();
	return ranges;
}
/**
* Where every "whole text" line box goes when the selection narrows down to the match: onto the
* first match box of its line, or collapsed onto the nearest edge of the match; match boxes that
* no line box lands on (`extra`) fade in on their own.
*/
function computeNarrowing(full, targets) {
	const ends = [];
	const claimed = /* @__PURE__ */ new Set();
	const first = targets[0];
	for (const box of full) {
		const bottom = box.top + box.height;
		const onLine = targets.find((target) => {
			return Math.min(bottom, target.top + target.height) - Math.max(box.top, target.top) >= Math.min(box.height, target.height) / 2;
		});
		if (onLine) {
			claimed.add(onLine);
			ends.push(onLine);
			continue;
		}
		const above = [...targets].reverse().find((target) => target.top < box.top);
		const anchor = above || first;
		const edge = above ? above.top + above.height : first.top;
		ends.push({
			left: anchor.left,
			top: edge,
			width: anchor.width,
			height: 0
		});
	}
	return {
		ends,
		extra: targets.filter((target) => !claimed.has(target))
	};
}
var registryHighlights = /* @__PURE__ */ new Map();
var highlightStyle;
var styleRemovalQueued = false;
function getRegistryHighlight(type) {
	let highlight = registryHighlights.get(type);
	if (!highlight) {
		highlight = new Highlight();
		highlight.priority = HIGHLIGHT_PRIORITIES[type];
		registryHighlights.set(type, highlight);
	}
	return highlight;
}
function hasCssRanges() {
	for (const highlight of registryHighlights.values()) if (highlight.size) return true;
	return false;
}
function syncCssHighlights() {
	for (const [type, highlight] of registryHighlights) {
		const name = HIGHLIGHT_NAMES[type];
		if (highlight.size) {
			if (CSS.highlights.get(name) !== highlight) CSS.highlights.set(name, highlight);
		} else if (CSS.highlights.get(name) === highlight) CSS.highlights.delete(name);
	}
	if (hasCssRanges()) {
		if (!highlightStyle) {
			highlightStyle = document.createElement("style");
			highlightStyle.dataset.textHighlight = "";
		}
		if (highlightStyle.textContent !== "::highlight(tg-search),\n::highlight(tg-quote) {\n  background-color: color-mix(in srgb, var(--selection-background-color) calc(100% * var(--text-highlight-opacity, 1)), transparent);\n}\n\n.chatlist-chat ::highlight(tg-search) {\n  background-color: var(--chatlist-search-highlight-background, transparent);\n  color: var(--chatlist-search-highlight-color, var(--primary-color));\n}") highlightStyle.textContent = textHighlight_default;
		if (!highlightStyle.isConnected) document.head.append(highlightStyle);
	} else if (highlightStyle?.isConnected && !styleRemovalQueued) {
		styleRemovalQueued = true;
		queueMicrotask(() => {
			styleRemovalQueued = false;
			if (!hasCssRanges()) highlightStyle?.remove();
		});
	}
}
hotEffect(void 0, () => {
	syncCssHighlights();
	return () => highlightStyle?.remove();
});
var instances = /* @__PURE__ */ new Set();
/**
* Finds the text of every highlight inside `root` again. Its ranges collapse when an ancestor of its container
* is moved to another parent (rows put in from a list built aside, held in a look-alike of what they were in),
* and the container's own observer sees nothing of that: whoever moves highlighted rows calls this after
*/
function reapplyTextHighlights(root) {
	for (const instance of instances) if (root.contains(instance.container)) instance.apply();
}
var SWEEP_INTERVAL = 3e4;
var DETACHED_GRACE = 1e4;
var sweepTimeout;
function scheduleSweep() {
	if (sweepTimeout || !instances.size) return;
	sweepTimeout = window.setTimeout(() => {
		sweepTimeout = void 0;
		const now = Date.now();
		for (const instance of instances) if (instance.container.isConnected) instance.detachedAt = void 0;
		else if (!instance.detachedAt) instance.detachedAt = now;
		else if (now - instance.detachedAt >= DETACHED_GRACE) instance.dispose();
		scheduleSweep();
	}, SWEEP_INTERVAL);
}
var TextHighlighter = class {
	constructor(options) {
		this.options = options;
		this.found = false;
		this.ranges = [];
		this.disposed = false;
		this.container = options.container;
		if (options.lineBoxes) {
			this.overlay = document.createElement("span");
			this.overlay.className = OVERLAY_CLASS;
			this.overlay.setAttribute("aria-hidden", "true");
			this.container.prepend(this.overlay);
			this.introPending = !!options.animateIn && liteMode.isAvailable("animations");
		} else this.highlight = getRegistryHighlight(options.match.type);
		this.apply();
		const reapply = throttleWithRaf(() => this.apply());
		if (options.observe !== false) {
			this.mutationObserver = new MutationObserver((records) => {
				records = records.filter((record) => !this.isOwnMutation(record));
				if (!records.length) return;
				if (this.introTimeout && !records.some((record) => this.changesText(record))) {
					this.introStale = true;
					return;
				}
				reapply();
			});
			this.mutationObserver.observe(this.container, {
				childList: true,
				characterData: true,
				subtree: true
			});
		}
		if (this.overlay) {
			let lastSize;
			this.resizeObserver = new ResizeObserver(([entry]) => {
				const size = `${entry.contentRect.width}x${entry.contentRect.height}`;
				if (lastSize !== void 0 && lastSize !== size) reapply();
				lastSize = size;
			});
			this.resizeObserver.observe(this.container);
		}
		instances.add(this);
		scheduleSweep();
	}
	isOwnMutation(record) {
		const { overlay } = this;
		if (!overlay) return false;
		if (record.target === overlay || overlay.contains(record.target)) return true;
		return record.type === "childList" && [...record.addedNodes, ...record.removedNodes].every((node) => node === overlay);
	}
	/**
	* whether the change is to the text looked in (`extractText`'s): text outside `skip`, or an emoji standing for its
	* text — not what is drawn inside such an emoji
	*/
	changesText(record) {
		const { container } = this;
		const skip = getTextSkip(this.options.skip);
		const target = record.target;
		const unread = (target instanceof Element ? target : target.parentElement)?.closest(`${skip}, ${TEXT_STANDING_SELECTOR}`);
		if (unread && container.contains(unread)) return false;
		if (record.type === "characterData") return true;
		const carriesText = (node) => {
			if (!(node instanceof Element)) return !!node.textContent;
			return !node.matches(skip) && (!!node.textContent || node.matches(TEXT_STANDING_SELECTOR) || !!node.querySelector(TEXT_STANDING_SELECTOR));
		};
		return [...record.addedNodes, ...record.removedNodes].some(carriesText);
	}
	clearRanges() {
		if (this.highlight) for (const range of this.ranges) this.highlight.delete(range);
		this.ranges = [];
		this.found = false;
	}
	apply() {
		if (this.disposed) return;
		this.clearRanges();
		this.clearIntro();
		const { container, match, skip } = this.options;
		this.ranges = computeRanges(container, match, skip);
		this.found = this.ranges.length > 0;
		if (!this.overlay) {
			for (const range of this.ranges) this.highlight.add(range);
			syncCssHighlights();
			return;
		}
		const boxes = this.computeLineBoxes(this.ranges);
		if (this.introPending) {
			this.introPending = false;
			if (!liteMode.isAvailable("motion")) {
				this.fadeOverlayIn(boxes.map((box) => this.createLineBox(box)));
				this.introTimeout = window.setTimeout(() => {
					this.introTimeout = void 0;
					this.overlay.classList.remove(OVERLAY_INTRO_CLASS);
					if (this.introStale) this.apply();
				}, NARROW_APPEAR);
				return;
			}
			const full = boxes.length ? this.computeLineBoxes(computeFullRanges(container, skip)) : [];
			if (full.length) {
				this.narrowIn(full, boxes);
				return;
			}
		}
		this.paintLineBoxes(boxes);
	}
	computeLineBoxes(ranges) {
		const { overlay } = this;
		const lineHeight = parseFloat(getComputedStyle(this.container).lineHeight) || 0;
		const origin = overlay.getBoundingClientRect();
		const { width, height } = getComputedStyle(overlay);
		return computeLineBoxes(ranges, origin, lineHeight, {
			x: origin.width / parseFloat(width) || 1,
			y: origin.height / parseFloat(height) || 1
		});
	}
	createLineBox(box) {
		const element = document.createElement("span");
		element.className = OVERLAY_BOX_CLASS;
		element.style.cssText = `left:${box.left}px;top:${box.top}px;width:${box.width}px;height:${box.height}px`;
		return element;
	}
	paintLineBoxes(boxes) {
		this.overlay.replaceChildren(...boxes.map((box) => this.createLineBox(box)));
	}
	/**
	* The whole text is selected (fading in), holds a moment, then every line box slides / scales
	* onto the match (transforms only, so nothing is laid out again); the plain match boxes take
	* over once the transition is through.
	*/
	narrowIn(full, targets) {
		const { overlay } = this;
		const elements = full.map((box) => this.createLineBox(box));
		this.fadeOverlayIn(elements);
		this.introTimeout = window.setTimeout(() => {
			const { ends, extra } = computeNarrowing(full, targets);
			const extraElements = extra.map((box) => {
				const element = this.createLineBox(box);
				element.style.opacity = "0";
				return element;
			});
			overlay.append(...extraElements);
			overlay.offsetWidth;
			overlay.classList.add(OVERLAY_NARROWING_CLASS);
			elements.forEach((element, i) => {
				const from = full[i], to = ends[i];
				element.style.transform = `translate(${to.left - from.left}px, ${to.top - from.top}px) scale(${to.width / from.width}, ${to.height / from.height})`;
			});
			extraElements.forEach((element) => element.style.opacity = "");
			this.introTimeout = window.setTimeout(() => {
				this.introTimeout = void 0;
				overlay.classList.remove(OVERLAY_INTRO_CLASS, OVERLAY_NARROWING_CLASS);
				if (this.introStale) this.apply();
				else this.paintLineBoxes(targets);
			}, NARROW_DURATION);
		}, 500);
	}
	/** puts `elements` into the overlay and fades it in */
	fadeOverlayIn(elements) {
		const { overlay } = this;
		overlay.classList.add(OVERLAY_APPEARING_CLASS);
		overlay.replaceChildren(...elements);
		overlay.offsetWidth;
		overlay.classList.add(OVERLAY_INTRO_CLASS);
		overlay.classList.remove(OVERLAY_APPEARING_CLASS);
	}
	clearIntro() {
		this.introStale = false;
		if (this.introTimeout) {
			clearTimeout(this.introTimeout);
			this.introTimeout = void 0;
		}
		this.overlay?.classList.remove(OVERLAY_INTRO_CLASS, OVERLAY_APPEARING_CLASS, OVERLAY_NARROWING_CLASS);
	}
	stopObserving() {
		this.mutationObserver?.disconnect();
		this.mutationObserver = void 0;
		this.resizeObserver?.disconnect();
		this.resizeObserver = void 0;
	}
	fadeOut(duration = FADE_DURATION) {
		if (this.disposed || this.cancelFade) return;
		if (!liteMode.isAvailable("animations")) {
			this.dispose();
			return;
		}
		this.stopObserving();
		this.cancelFade = animateValue(1, 0, duration, (value) => {
			this.container.style.setProperty(OPACITY_PROPERTY, "" + value);
		}, { onEnd: () => this.dispose() });
	}
	dispose() {
		if (this.disposed) return;
		this.disposed = true;
		this.clearRanges();
		if (this.highlight) syncCssHighlights();
		this.clearIntro();
		this.stopObserving();
		this.cancelFade?.();
		this.cancelFade = void 0;
		this.container.style.removeProperty(OPACITY_PROPERTY);
		this.overlay?.remove();
		this.overlay = void 0;
		instances.delete(this);
	}
};
var NOOP_HIGHLIGHT = {
	found: false,
	fadeOut: () => {},
	dispose: () => {}
};
/**
* Highlights `match` inside `container`. Returns a handle: call `dispose()` (or `fadeOut()`)
* once the highlight should go; forgetting it is not fatal — a highlight whose container has
* been removed from the document is collected on its own.
*/
function highlightText(options) {
	if (!options.lineBoxes && !IS_TEXT_HIGHLIGHT_SUPPORTED) return NOOP_HIGHLIGHT;
	return new TextHighlighter(options);
}
//#endregion
export { highlightText as a, getTextSkip as i, extractText as n, reapplyTextHighlights as o, findTextRect as r, computeRanges as t };
