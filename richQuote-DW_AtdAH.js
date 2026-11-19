//# allFunctionsCalledOnLoad
import { t as clamp } from "./clamp-9UaNhw6N.js";
import { at as snapGraphemeOffsetUp, it as snapGraphemeOffsetDown, rt as getGraphemeOffsets } from "./confirmationPopup-Bz6mK0o-.js";
import { M as isDecimalOrderedListType, N as orderedListValues, _ as getRichTextFlatText, w as joinRichTexts } from "./canPollPeerStories-D3HoBvLX.js";
import { n as EMPTY_RICH_TEXT, r as concatRichText, t as hasRichTextContent } from "./hasRichTextContent-rOE0S9M6.js";
/** what a quote keeps of its text's formatting, in a quote of a message's text as in one of a rich message */
var QUOTE_ENTITY_TYPES = /* @__PURE__ */ new Set([
	"messageEntityBold",
	"messageEntityItalic",
	"messageEntityUnderline",
	"messageEntityStrike",
	"messageEntitySpoiler",
	"messageEntityCustomEmoji",
	"messageEntityEmoji",
	"messageEntityFormattedDate"
]);
/**
* Where a text stands in a rich message, as iOS' InstantPageTextNodeId has it: the path of its block (a block's index
* among its own; what a quote, a details, a collage or a slideshow holds goes on from its path, a list item from its
* list's), and what of the block it is: its `text`, its `caption` or `credit`, its `title`, a `cell:<row>,<column>`
*/
var getRichQuoteNodeId = (path, part) => path.join(".") + ":" + part;
var isAtom = (text) => text._ === "textImage" || text._ === "textMath" || text._ === "textCustomEmoji" || text._ === "textDate" || text._ === "textDiff" || text._ === "textButton";
var paragraphBlock = (text) => ({
	_: "pageBlockParagraph",
	text
});
/** A text as a paragraph of its own: none when it has nothing a message sends (`hasRichTextContent`), as an empty caption */
var ownLine = (text) => hasRichTextContent(text) ? [paragraphBlock(text)] : [];
var SPACE_RICH_TEXT = {
	_: "textPlain",
	text: " "
};
/** What an ordered list counts for each of its items: from its start, an item's own value counting on from it */
var countOrderedListValues = (block) => [...orderedListValues(block.items.length, block.start, !!block.pFlags.reversed, (index) => block.items[index].value)];
/**
* The list of `items` (none where one is left out), each numbered as `values` says: the list starts from the first
* one's number, and an item whose number does not follow the one before it carries its own.
*/
function numberOrderedListItems(block, items, values) {
	const step = block.pFlags.reversed ? -1 : 1;
	let next;
	const kept = items.flatMap((item, index) => {
		if (!item) return [];
		const { value: _value, ...rest } = item;
		const value = values[index];
		const numbered = next === void 0 || value === next ? rest : {
			...rest,
			value
		};
		next = value + step;
		return [numbered];
	});
	return {
		...block,
		items: kept,
		start: values[items.findIndex(Boolean)]
	};
}
/**
* An ordered list whose items' markers (`num`: a bot's markdown list, `7.`) are all numbers, numbered as it is drawn
* without them: a field keeps no marker of an item's own. A marker is a label, so an item without one keeps the number
* the list counts for it, and one with one is drawn in figures whatever the list's type. A list with a marker that is no
* number stays as it is.
*/
function countOrderedListMarkers(block) {
	const { items } = block;
	if (!items.some((item) => item.num) || items.some((item) => item.num && !/^\d{1,9}$/.test(item.num))) return block;
	const counted = countOrderedListValues(block);
	const values = items.map((item, index) => item.num ? Number(item.num) : counted[index]);
	return numberOrderedListItems(block, items.map(({ num, ...item }) => num && !isDecimalOrderedListType(item.type || block.type) ? {
		...item,
		type: "1"
	} : item), values);
}
/**
* The blocks of a rich message with each of the texts a quote can take as `map` gives it back, called in the order
* the texts stand in the message. A block left with no text is left out, as are a list's items and a table's rows
* with none; a text the block it stands in cannot carry by itself (a picture's caption, a table's title, a quote's
* author or a details block's title without the rest) is a paragraph. A code block or a formula is `code`: drawn as it
* reads, nothing of it formatted.
*/
function mapRichQuoteTexts(blocks, map, options = {}) {
	const { onUnknown, copy } = options;
	let reading = 0;
	const mapBlocks = (blocks, prefix) => (blocks || []).flatMap((block, index) => {
		const path = [...prefix, index];
		const mapText = (text, part, code, at = path) => {
			const mapped = text ? map(text, getRichQuoteNodeId(at, part), code) : void 0;
			if (hasRichTextContent(mapped)) ++reading;
			return mapped;
		};
		/** A container's body, and whether any of it has content (`normalizePageBlocks` sends one that has none as none) */
		const mapBody = (blocks) => {
			const before = reading;
			return {
				inner: mapBlocks(blocks, path),
				reads: reading > before
			};
		};
		const mapCaption = (caption) => caption ? [mapText(caption.text, "caption"), mapText(caption.credit, "credit")].flatMap(ownLine) : [];
		switch (block._) {
			case "pageBlockParagraph":
			case "pageBlockHeading1":
			case "pageBlockHeading2":
			case "pageBlockHeading3":
			case "pageBlockHeading4":
			case "pageBlockHeading5":
			case "pageBlockHeading6":
			case "pageBlockFooter": {
				const text = mapText(block.text, "text");
				return text ? [{
					...block,
					text
				}] : [];
			}
			case "pageBlockThinking": {
				const text = mapText(block.text, "text");
				return text ? [copy ? paragraphBlock(text) : {
					...block,
					text
				}] : [];
			}
			case "pageBlockPreformatted": {
				const text = mapText(block.text, "text", true);
				return text ? [{
					...block,
					text
				}] : [];
			}
			case "pageBlockMath": return mapText({
				_: "textMath",
				source: block.source
			}, "text", true) ? [block] : [];
			case "pageBlockBlockquote":
			case "pageBlockPullquote": {
				const text = mapText(block.text, "text");
				const caption = mapText(block.caption, "caption");
				if (!hasRichTextContent(text)) return ownLine(caption);
				return [{
					...block,
					text,
					caption: caption || EMPTY_RICH_TEXT
				}];
			}
			case "pageBlockBlockquoteBlocks": {
				const { inner, reads } = mapBody(block.blocks);
				const caption = mapText(block.caption, "caption");
				if (!reads) return ownLine(caption);
				return [{
					...block,
					blocks: inner,
					caption: caption || EMPTY_RICH_TEXT
				}];
			}
			case "pageBlockList":
			case "pageBlockOrderedList": {
				const list = copy && block._ === "pageBlockOrderedList" ? countOrderedListMarkers(block) : block;
				const items = list.items.map((item, itemIndex) => {
					const at = [...path, itemIndex];
					if ("text" in item) {
						const text = mapText(item.text, "text", false, at);
						return text && {
							...item,
							text
						};
					}
					const inner = mapBlocks(item.blocks, at);
					return inner.length ? {
						...item,
						blocks: inner
					} : void 0;
				});
				const kept = items.filter(Boolean);
				if (!kept.length) return [];
				if (list._ === "pageBlockList") return [{
					...list,
					items: kept
				}];
				if (kept.length === items.length) return [{
					...list,
					items: kept
				}];
				return [numberOrderedListItems(list, items, countOrderedListValues(list))];
			}
			case "pageBlockTable": {
				const title = mapText(block.title, "title");
				const rows = block.rows.map((row, rowIndex) => {
					const texts = row.cells.map((cell, cellIndex) => mapText(cell.text, `cell:${rowIndex},${cellIndex}`));
					return texts.some(Boolean) ? {
						...row,
						cells: row.cells.map((cell, cellIndex) => ({
							...cell,
							text: texts[cellIndex] || EMPTY_RICH_TEXT
						}))
					} : void 0;
				}).filter(Boolean);
				if (rows.length) return [{
					...block,
					title: title || EMPTY_RICH_TEXT,
					rows
				}];
				return ownLine(title);
			}
			case "pageBlockDetails": {
				const title = mapText(block.title, "title");
				const { inner, reads } = mapBody(block.blocks);
				if (!reads) return ownLine(title);
				return [{
					...block,
					title: title || EMPTY_RICH_TEXT,
					blocks: inner
				}];
			}
			case "pageBlockPhoto":
			case "pageBlockVideo":
			case "pageBlockAudio":
			case "pageBlockMap": return mapCaption(block.caption);
			case "pageBlockCollage":
			case "pageBlockSlideshow": return [...mapBlocks(block.items, path), ...mapCaption(block.caption)];
			case "pageBlockDocument": return copy ? mapCaption(block.caption) : [];
			case "pageBlockButtonRow":
				if (!copy) return [];
				return ownLine(mapText(concatRichText(block.buttons.flatMap((button, buttonIndex) => buttonIndex ? [SPACE_RICH_TEXT, button.text] : [button.text])), "buttons"));
			case "pageBlockUnsupported":
				onUnknown?.();
				return [];
			default: return [];
		}
	});
	return mapBlocks(blocks, []);
}
/** The texts of a rich message a quote can take, in the order they stand in it: those that read something */
function getRichQuoteNodes(blocks) {
	const nodes = [];
	let unknown = false;
	mapRichQuoteTexts(blocks, (text, id, code) => {
		const flat = getRichTextFlatText(text);
		if (flat) {
			nodes.push({
				text,
				id,
				flat,
				...unknown && { afterUnknown: true },
				...code && { code }
			});
			unknown = false;
		}
		return text;
	}, { onUnknown: () => unknown = true });
	return nodes;
}
var getWrapped = (text) => {
	return !isAtom(text) && text._ !== "textPlain" && text._ !== "textConcat" && "text" in text ? text.text : void 0;
};
/** The part of `text` that reads its flat range [from, to): what is wholly in it as it is, an atom it touches whole */
function sliceRichText(text, from, to) {
	let position = 0;
	const slice = (text) => {
		const start = position;
		if (isAtom(text)) {
			position += getRichTextFlatText(text).length;
			const end = position;
			return (start === end ? from <= start && start < to : start < to && end > from) ? text : void 0;
		}
		let sliced;
		if (text._ === "textPlain") {
			position += text.text.length;
			const [lower, upper] = [Math.max(from, start) - start, Math.min(to, position) - start];
			if (lower < upper) sliced = {
				_: "textPlain",
				text: text.text.slice(lower, upper)
			};
		} else if (text._ === "textConcat") {
			const texts = text.texts.map(slice).filter(Boolean);
			if (texts.length) sliced = {
				_: "textConcat",
				texts
			};
		} else {
			const wrapped = getWrapped(text);
			const child = wrapped && slice(wrapped);
			if (child) sliced = {
				...text,
				text: child
			};
		}
		const end = position;
		if (start === end || end <= from || start >= to) return;
		return from <= start && end <= to ? text : sliced;
	};
	return slice(text);
}
/**
* `offset` moved off where no quote may start or end: out of an atom (to its start, or to its end `up`) and out of
* a grapheme (a surrogate pair, an emoji of a skin tone, a flag)
*/
function snapRichTextOffset(text, offset, up) {
	let position = 0, result = offset;
	const walk = (text) => {
		const start = position;
		if (isAtom(text)) {
			position += getRichTextFlatText(text).length;
			if (start < offset && offset < position) result = up ? position : start;
		} else if (text._ === "textPlain") {
			position += text.text.length;
			if (start < offset && offset < position) {
				const offsets = getGraphemeOffsets(text.text);
				result = start + (up ? snapGraphemeOffsetUp : snapGraphemeOffsetDown)(offsets, offset - start);
			}
		} else if (text._ === "textConcat") text.texts.forEach(walk);
		else {
			const wrapped = getWrapped(text);
			if (wrapped) walk(wrapped);
		}
	};
	walk(text);
	return result;
}
/** What a quote, or a copy, may carry: a button as its label, no pictures */
function normalizeRichQuoteFragment(text) {
	switch (text._) {
		case "textImage": return;
		case "textButton": {
			const label = getRichTextFlatText(text.text);
			return label ? {
				_: "textPlain",
				text: label
			} : void 0;
		}
		case "textConcat": {
			const texts = text.texts.map(normalizeRichQuoteFragment).filter(Boolean);
			return texts.length ? {
				_: "textConcat",
				texts
			} : void 0;
		}
		default: {
			const wrapped = getWrapped(text);
			if (!wrapped) return text;
			const child = normalizeRichQuoteFragment(wrapped);
			return child && {
				...text,
				text: child
			};
		}
	}
}
var isBefore = (a, b) => a.index < b.index || a.index === b.index && a.offset < b.offset;
var isTrimmable = (character) => character === " " || character === "\n";
/**
* The quote of what runs from `start` to `end` across `nodes`, made as the server checks it (iOS'
* makeRichReplyQuote): spaces and line breaks at either end left out, at most `RICH_QUOTE_MAX_FRAGMENTS` fragments
* and `maxLength` of what they read together, the rest cut off where a quote may end. None if nothing is taken
*/
function makeRichQuote(nodes, start, end, maxLength) {
	const clampBoundary = ({ index, offset }) => ({
		index,
		offset: clamp(offset, 0, nodes[index].flat.length)
	});
	if (!nodes[start.index] || !nodes[end.index]) return;
	let [lower, upper] = [clampBoundary(start), clampBoundary(end)];
	if (isBefore(upper, lower)) [lower, upper] = [upper, lower];
	while (isBefore(lower, upper)) {
		const flat = nodes[lower.index].flat;
		if (lower.offset >= flat.length) lower = {
			index: lower.index + 1,
			offset: 0
		};
		else if (isTrimmable(flat[lower.offset])) ++lower.offset;
		else break;
	}
	while (isBefore(lower, upper)) {
		const flat = nodes[upper.index].flat;
		if (upper.offset <= 0) upper = {
			index: upper.index - 1,
			offset: nodes[upper.index - 1].flat.length
		};
		else if (isTrimmable(flat[upper.offset - 1])) --upper.offset;
		else break;
	}
	lower.offset = snapRichTextOffset(nodes[lower.index].text, lower.offset, false);
	upper.offset = snapRichTextOffset(nodes[upper.index].text, upper.offset, true);
	if (!isBefore(lower, upper)) return;
	const fragments = [];
	let remaining = maxLength;
	for (let index = lower.index; index <= upper.index && fragments.length < 32; ++index) {
		const node = nodes[index];
		if (index > lower.index && node.afterUnknown) break;
		if (fragments.length) --remaining;
		const from = index === lower.index ? lower.offset : 0;
		let to = index === upper.index ? upper.offset : node.flat.length;
		let isCut = false;
		if (to - from > remaining) {
			to = snapRichTextOffset(node.text, from + Math.max(0, remaining), false);
			while (to > from && isTrimmable(node.flat[to - 1])) --to;
			to = snapRichTextOffset(node.text, to, false);
			isCut = true;
		}
		const sliced = to > from && sliceRichText(node.text, from, to);
		const fragment = sliced && normalizeRichQuoteFragment(sliced);
		if (fragment) {
			fragments.push(fragment);
			remaining -= getRichTextFlatText(fragment).length;
		} else if (!isCut) return;
		if (isCut) break;
	}
	if (!fragments.length) return;
	let offset = lower.offset;
	for (let index = 0; index < lower.index; ++index) offset += nodes[index].flat.length + 1;
	return {
		fragments,
		offset
	};
}
/**
* What a selection from `start` to `end` across the texts of `blocks` copies: the blocks those texts stand in, as
* they stand (a heading a heading, a list's items its list, a quote with its author), the first and the last text
* only as far as it is taken, every text between whole — those no quote counts too: an empty paragraph, a file's
* caption, a row of buttons' labels. What reads nothing (a picture, a divider) is left out.
*/
function sliceRichQuoteBlocks(blocks, nodes, start, end) {
	const taken = /* @__PURE__ */ new Map();
	for (let index = start.index; index <= end.index; ++index) taken.set(nodes[index].id, {
		from: index === start.index ? start.offset : 0,
		to: index === end.index ? end.offset : nodes[index].flat.length
	});
	const endId = nodes[end.index].id;
	let inside = false;
	return mapRichQuoteTexts(blocks, (text, id) => {
		const range = taken.get(id);
		if (!range) return inside ? normalizeRichQuoteFragment(text) : void 0;
		inside = id !== endId;
		const sliced = range.to > range.from && sliceRichText(text, range.from, range.to);
		return sliced && normalizeRichQuoteFragment(sliced);
	}, { copy: true });
}
/**
* Where a selection that took `runs` (each a text of `nodes` and how far from and to in what it reads) begins and
* ends: the first text's lowest offset, the last one's highest — what is drawn first is not always first in the
* message (a table's cell that spans rows comes after the cells of its last row)
*/
function getRichQuoteSelectionBoundaries(runs) {
	let start, end;
	for (const { index, from, to } of runs) {
		if (!start || isBefore({
			index,
			offset: from
		}, start)) start = {
			index,
			offset: from
		};
		if (!end || isBefore(end, {
			index,
			offset: to
		})) end = {
			index,
			offset: to
		};
	}
	return start && {
		start,
		end
	};
}
/** A rich quote as text: its fragments one under another, with what a quote keeps of their formatting */
function getRichQuoteTextWithEntities(fragments) {
	const joined = joinRichTexts(fragments, "\n");
	return {
		...joined,
		entities: joined.entities.filter((entity) => QUOTE_ENTITY_TYPES.has(entity._))
	};
}
/** The quote a reply carries, as text (a rich one's fragments joined), and the fragments of a rich one */
function getReplyQuote(replyTo) {
	if (replyTo.quote_rich?.length) {
		const { text, entities } = getRichQuoteTextWithEntities(replyTo.quote_rich);
		return {
			text,
			entities,
			offset: replyTo.quote_offset,
			rich: replyTo.quote_rich
		};
	}
	if (replyTo.quote_text) return {
		text: replyTo.quote_text,
		entities: replyTo.quote_entities,
		offset: replyTo.quote_offset
	};
}
//#endregion
export { getRichQuoteSelectionBoundaries as a, mapRichQuoteTexts as c, getRichQuoteNodes as i, normalizeRichQuoteFragment as l, getReplyQuote as n, getRichQuoteTextWithEntities as o, getRichQuoteNodeId as r, makeRichQuote as s, QUOTE_ENTITY_TYPES as t, sliceRichQuoteBlocks as u };
