//# allFunctionsCalledOnLoad
import { n as __exportAll } from "./rolldown-runtime-CwcJO0Gh.js";
import { h as Modes } from "./userAgent-ByGXcznk.js";
import { t as findUpClassName } from "./findUpClassName-3V5me58N.js";
import { t as noop } from "./noop-H9NNBLfX.js";
import { F as readBlobAs } from "./objectUrlUtils-5x08MNuO.js";
import { et as MEDIA_MIME_TYPES_SUPPORTED, t as apiManagerProxy } from "./apiManagerProxy-DmQXvxSF.js";
import { n as rootScope, u as MAX_FILE_SAVE_SIZE } from "./rootScope-CZS0lmz8.js";
import { c as joinElementsWith, u as langPack_default } from "./langPack-BmdJGr44.js";
import { n as hotListen } from "./hotModule-aCRkP77w.js";
import { n as hotReloadGuard, t as SolidJSHotReloadGuardProvider } from "./hotReloadGuardProvider-CHEsZRuG.js";
import "./liteMode-DeLStZfQ.js";
import { i as simulateClickEvent, n as attachClickEvent } from "./clickEvent-COk4YpLP.js";
import { t as Button } from "./button-DpTvniRN.js";
import { i as getDownloadMediaDetails } from "./mimeTypeMap-CnhjI2wm.js";
import { t as appDownloadManager } from "./appDownloadManager-ClHW2-Dl.js";
import { t as choosePhotoSize } from "./choosePhotoSize-VRMYg-1A.js";
import { t as sortEntities } from "./sortEntities-9u5MR7Xq.js";
import { L as formatFullSentTime } from "./index-B7axFZql.js";
import { t as confirmationPopup, vn as wrapPhoto, xn as ProgressivePreloader } from "./confirmationPopup-Bz6mK0o-.js";
import { Lt as clearBadCharsAndTrim, Pt as parseMarkdown } from "./getChatMigratedTo-ChhMNXuu.js";
import { H as wrapPlainText, L as encodeInlineMath } from "./canPollPeerStories-D3HoBvLX.js";
import { t as MiddleEllipsisElement } from "./middleEllipsis-BLGR6PDz.js";
import { h as ListLoader, o as wrapSentTime, s as wrapSenderToPeer, t as createAudioElement } from "./audio-BL6xvRqa.js";
import { t as formatBytes } from "./formatBytes-HLLlT7Mr.js";
import { t as isPlayableDocument } from "./isPlayableDocument-zgcKwSZF.js";
//#region src/environment/ipRevealingDocuments.ts
var extensionsSet = /* @__PURE__ */ new Set([
	"htm",
	"html",
	"svg",
	"m4v",
	"m3u",
	"m3u8",
	"xhtml",
	"xml",
	"kml",
	"kmz"
]);
var mimeTypesSet = /* @__PURE__ */ new Set([
	"text/html",
	"image/svg+xml",
	"application/vnd.google-earth.kml+xml",
	"application/vnd.google-earth.kmz"
]);
var isIpRevealingExtension = (extension) => extensionsSet.has(extension);
var isIpRevealingMimeType = (mimeType) => mimeTypesSet.has(mimeType);
//#endregion
//#region src/components/emptyMediaListLoader.ts
/**
* A `MediaListLoader` implementation that exposes an always-empty playlist.
*
* Intended for media that should play in isolation (e.g. a poll's
* description / explanation audio) — the playback controller still
* tracks the media as the currently-playing one, but `next` / `previous`
* navigation does nothing because there is nothing to navigate to.
*
* Use the exported `emptyMediaListLoaderFactory` as the
* `listLoaderFactory` on an `AudioElement`.
*/
var EmptyMediaListLoader = class extends ListLoader {
	constructor() {
		super({ loadMore: async () => ({
			count: 0,
			items: []
		}) });
		this.setLoaded(true, true);
		this.setLoaded(false, true);
	}
	setOptions(options) {
		this.processItem = options.processItem;
		this.loadCount = options.loadCount ?? 50;
		this.loadWhenLeft = options.loadWhenLeft ?? 20;
		this.onJump = options.onJump;
		this.onEmptied = options.onEmptied;
		this.onLoadedMore = options.onLoadedMore;
	}
	goRound(_length, _dispatchJump) {}
	getPrevious(_withOtherSide) {
		return [];
	}
	getNext(_withOtherSide) {
		return [];
	}
	setCurrent(item) {
		this.current = item;
	}
	cleanup() {}
};
var emptyMediaListLoaderFactory = (options) => {
	const loader = new EmptyMediaListLoader();
	loader.setOptions(options);
	return loader;
};
//#endregion
//#region src/helpers/blob/readBlobAsText.ts
function readBlobAsText(blob) {
	return readBlobAs(blob, "readAsText");
}
//#endregion
//#region src/lib/richTextProcessor/inlineMarkdownToRichText.ts
var ESCAPABLE = "\\*_`[]<>~|()#+-=!.";
var ESC_PUA_BASE = 57344;
var ESC_PUA_RE = new RegExp("[" + String.fromCharCode(ESC_PUA_BASE) + "-]", "g");
var SOH = "";
var FN_SENTINEL = "";
var SUP_SENTINEL = "";
var SUB_SENTINEL = "";
var MARK_SENTINEL = "\x07";
var SENTINEL_TYPE = {
	[SUP_SENTINEL]: "textSuperscript",
	[SUB_SENTINEL]: "textSubscript",
	[MARK_SENTINEL]: "textMarked"
};
var SENTINEL_RE = /([\x03\x04\x06\x07])([^\x03\x04\x06\x07]+?)\1/g;
var CONVERTIBLE = /* @__PURE__ */ new Set([
	"messageEntityBold",
	"messageEntityItalic",
	"messageEntityUnderline",
	"messageEntityStrike",
	"messageEntityCode",
	"messageEntityPre",
	"messageEntityTextUrl",
	"messageEntityUrl",
	"messageEntityEmail",
	"messageEntityPhone",
	"messageEntityHighlight",
	"messageEntityAnchor",
	"messageEntitySubscript",
	"messageEntitySuperscript"
]);
function preprocess(raw, refs, footnoteNumbers) {
	let s = raw;
	s = s.replace(/<!--[\s\S]*?-->/g, "");
	s = s.replace(/<br\s*\/?>/gi, "\n");
	s = s.replace(/<sub\b[^<>]*>([\s\S]*?)<\/sub>/gi, `${SUB_SENTINEL}$1${SUB_SENTINEL}`);
	s = s.replace(/<sup\b[^<>]*>([\s\S]*?)<\/sup>/gi, `${SUP_SENTINEL}$1${SUP_SENTINEL}`);
	s = s.replace(/<mark\b[^<>]*>([\s\S]*?)<\/mark>/gi, `${MARK_SENTINEL}$1${MARK_SENTINEL}`);
	s = s.replace(/<\/?(div|details|summary|p|span)\b[^<>]*>/gi, "");
	s = s.replace(/<(https?:\/\/[^\s<>]+)>/g, "[$1]($1)");
	s = s.replace(/<([\w.+-]+@[\w.-]+\.\w+)>/g, "[$1](mailto:$1)");
	s = s.replace(/\[\^([^\]\n]+)\]/g, (_full, id) => {
		const n = footnoteNumbers?.get(id);
		return n !== void 0 ? FN_SENTINEL + n + FN_SENTINEL : SUP_SENTINEL + id + SUP_SENTINEL;
	});
	if (refs && refs.size > 0) s = s.replace(/\[([^\]\n]+)\]\[([^\]\n]+)\]/g, (full, text, id) => {
		const url = refs.get(String(id).toLowerCase());
		return url ? `[${text}](${url})` : full;
	});
	s = s.replace(/\[([^\]\n]+)\]\(\s*([^\s)]+)\s+"[^"]*"\s*\)/g, "[$1]($2)");
	s = s.replace(/(?<!\\|\$)\$(?!\s|\$)([^$\n]+?)(?<!\s)\$(?!\$)/g, (_full, src) => encodeInlineMath(src));
	s = s.replace(/\\([\\*_`\[\]<>~|()#+\-=!.])/g, (_full, ch) => String.fromCharCode(ESC_PUA_BASE + ESCAPABLE.indexOf(ch)));
	const tripleReplacement = `${SOH}**${SOH}__${SOH}$1${SOH}__${SOH}**${SOH}`;
	s = s.replace(/___([^\n_\x00\x01]+?)___/g, tripleReplacement);
	s = s.replace(/\*\*\*([^\n*\x00\x01]+?)\*\*\*/g, tripleReplacement);
	s = s.replace(/__([^\n_\x00\x01]+?)__/g, `${SOH}**$1**${SOH}`);
	s = s.replace(/(?<![*\\\x00\x01])\*(?![\s*\x00\x01])([^\n*\x00\x01]+?)(?<![\s\x00\x01])\*(?![*\x00\x01])/g, `${SOH}__$1__${SOH}`);
	s = s.replace(/(?<![_\\\w\x00\x01])_(?![_\s\x00\x01])([^\n_\x00\x01]+?)(?<![\s\x00\x01])_(?![_\w\x00\x01])/g, `${SOH}__$1__${SOH}`);
	s = s.replace(/<(?:strong|b)\b[^<>]*>([\s\S]*?)<\/(?:strong|b)>/gi, `${SOH}**$1**${SOH}`);
	s = s.replace(/<(?:em|i)\b[^<>]*>([\s\S]*?)<\/(?:em|i)>/gi, `${SOH}__$1__${SOH}`);
	s = s.replace(/<u\b[^<>]*>([\s\S]*?)<\/u>/gi, `${SOH}_-_$1_-_${SOH}`);
	s = s.replace(/<(?:s|strike|del)\b[^<>]*>([\s\S]*?)<\/(?:s|strike|del)>/gi, `${SOH}~~$1~~${SOH}`);
	return s;
}
function cleanup(s) {
	if (!s) return s;
	s = s.replace(/\x01/g, "");
	s = s.replace(ESC_PUA_RE, (ch) => ESCAPABLE[ch.charCodeAt(0) - ESC_PUA_BASE]);
	return s;
}
function plain(s) {
	return s ? {
		_: "textPlain",
		text: s
	} : { _: "textEmpty" };
}
function wrapEntity(entity, sourceText, inner) {
	switch (entity._) {
		case "messageEntityBold": return {
			_: "textBold",
			text: inner
		};
		case "messageEntityItalic": return {
			_: "textItalic",
			text: inner
		};
		case "messageEntityUnderline": return {
			_: "textUnderline",
			text: inner
		};
		case "messageEntityStrike": return {
			_: "textStrike",
			text: inner
		};
		case "messageEntityCode":
		case "messageEntityPre": return {
			_: "textFixed",
			text: inner
		};
		case "messageEntityTextUrl": return {
			_: "textUrl",
			text: inner,
			url: cleanup(entity.url),
			webpage_id: 0
		};
		case "messageEntityUrl": return {
			_: "textUrl",
			text: inner,
			url: cleanup(sourceText),
			webpage_id: 0
		};
		case "messageEntityEmail": return {
			_: "textEmail",
			text: inner,
			email: cleanup(sourceText)
		};
		case "messageEntityPhone": return {
			_: "textPhone",
			text: inner,
			phone: cleanup(sourceText)
		};
		case "messageEntityHighlight": return {
			_: "textMarked",
			text: inner
		};
		case "messageEntityAnchor": return {
			_: "textAnchor",
			text: inner,
			name: entity.name || ""
		};
		case "messageEntitySubscript": return {
			_: "textSubscript",
			text: inner
		};
		case "messageEntitySuperscript": return {
			_: "textSuperscript",
			text: inner
		};
		default: return inner;
	}
}
function buildSegment(text, entities, from, to) {
	const parts = [];
	let cursor = from;
	let i = 0;
	while (i < entities.length) {
		const e = entities[i];
		const eStart = e.offset;
		const eEnd = e.offset + e.length;
		if (eStart < cursor || eEnd > to) {
			++i;
			continue;
		}
		if (eStart > cursor) parts.push(plain(cleanup(text.slice(cursor, eStart))));
		const children = [];
		let j = i + 1;
		while (j < entities.length) {
			const c = entities[j];
			if (c.offset >= eStart && c.offset + c.length <= eEnd) {
				children.push(c);
				++j;
			} else break;
		}
		const innerText = text.slice(eStart, eEnd);
		let inner;
		if (children.length > 0) inner = buildSegment(innerText, children.map((c) => ({
			...c,
			offset: c.offset - eStart
		})), 0, innerText.length);
		else inner = parseAndBuild(innerText);
		parts.push(wrapEntity(e, innerText, inner));
		cursor = eEnd;
		i = j;
	}
	if (cursor < to) parts.push(plain(cleanup(text.slice(cursor, to))));
	if (parts.length === 0) return { _: "textEmpty" };
	if (parts.length === 1) return parts[0];
	return {
		_: "textConcat",
		texts: parts
	};
}
function parseAndBuild(text) {
	if (!text) return { _: "textEmpty" };
	const [t, entities] = parseMarkdown(text, [], true);
	const filtered = entities.filter((e) => CONVERTIBLE.has(e._));
	sortEntities(filtered);
	return buildSegment(t, filtered, 0, t.length);
}
function splitOnSentinels(text) {
	SENTINEL_RE.lastIndex = 0;
	const parts = [];
	let last = 0;
	let m;
	const pushPlain = (s) => {
		s = s.replace(/[\x03\x04\x06\x07]/g, "");
		if (s) parts.push({
			_: "textPlain",
			text: s
		});
	};
	while ((m = SENTINEL_RE.exec(text)) !== null) {
		if (m.index > last) pushPlain(text.slice(last, m.index));
		if (m[1] === FN_SENTINEL) {
			const n = m[2];
			parts.push({
				_: "textAnchor",
				name: "fnref-" + n,
				text: {
					_: "textSuperscript",
					text: {
						_: "textUrl",
						url: "#fn-" + n,
						text: {
							_: "textPlain",
							text: n
						},
						webpage_id: 0
					}
				}
			});
		} else parts.push({
			_: SENTINEL_TYPE[m[1]],
			text: postProcessSentinels(parseAndBuild(m[2]))
		});
		last = m.index + m[0].length;
	}
	if (last < text.length) pushPlain(text.slice(last));
	if (parts.length === 0) return { _: "textEmpty" };
	if (parts.length === 1) return parts[0];
	return {
		_: "textConcat",
		texts: parts
	};
}
function postProcessSentinels(rt) {
	switch (rt._) {
		case "textPlain":
			if (/[\x03\x04\x06\x07]/.test(rt.text)) return splitOnSentinels(rt.text);
			return rt;
		case "textConcat": return {
			_: "textConcat",
			texts: rt.texts.map(postProcessSentinels)
		};
		case "textBold":
		case "textItalic":
		case "textUnderline":
		case "textStrike":
		case "textFixed":
		case "textMarked":
		case "textSubscript":
		case "textSuperscript":
		case "textUrl":
		case "textEmail":
		case "textPhone":
		case "textAnchor": return {
			...rt,
			text: postProcessSentinels(rt.text)
		};
		default: return rt;
	}
}
function inlineMarkdownToRichText(raw, refs, footnoteNumbers) {
	if (!raw) return { _: "textEmpty" };
	return postProcessSentinels(parseAndBuild(preprocess(raw, refs, footnoteNumbers).replace(/^\s+|\s+$/g, "")));
}
//#endregion
//#region src/lib/richTextProcessor/parseMarkdownToPage.ts
var FENCED_OPEN_RE = /^(`{3,}|~{3,})\s*(\S*).*$/;
var DIVIDER_RE = /^([-*_])\1{2,}\s*$/;
var ATX_RE = /^(#{1,6})\s+(.+?)\s*#*\s*$/;
var BLOCKQUOTE_RE = /^>\s?(.*)$/;
var UNORDERED_RE = /^(\s*)([*\-+•])\s+(.+)$/;
var ORDERED_RE = /^(\s*)(\d+)[.)]\s+(.+)$/;
var INDENTED_CODE_RE = /^( {4}|\t)(.*)$/;
var REF_LINK_DEF_RE = /^ {0,3}\[([^\]\n^][^\]\n]*)\]:\s+(\S+)(?:\s+["'][^"']*["'])?\s*$/;
var FOOTNOTE_DEF_RE = /^ {0,3}\[\^([^\]\n]+)\]:\s+(.*)$/;
var TABLE_LINE_RE = /^\s*\|.*\|\s*$/;
var TABLE_CELL_SEP_RE = /^\s*:?-{3,}:?\s*$/;
var TASK_RE = /^\[([ xX])\]\s+(.*)$/;
var MATH_BLOCK_RE = /^\$\$\s*$/;
var DEFLIST_DEF_RE = /^:\s+(.+)$/;
var DETAILS_OPEN_RE = /^\s*<details\b[^>]*>/i;
var DETAILS_CLOSE_RE = /<\/details\s*>/i;
var SUMMARY_RE = /<summary\b[^>]*>([\s\S]*?)<\/summary\s*>/i;
var BLOCKQUOTE_ATTRIBUTION_RE = /^(?:—|–|--)\s+(.+)$/;
function plainOrEmpty(text) {
	return text ? {
		_: "textPlain",
		text
	} : { _: "textEmpty" };
}
function slugifyHeading(text) {
	return text.toLowerCase().replace(/<[^<>]+>/g, "").replace(/[`*_~]/g, "").replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "-");
}
var activeFootnoteNumbers;
function inlineToRichText(raw, refs) {
	return inlineMarkdownToRichText(raw, refs, activeFootnoteNumbers);
}
function makeListItem(content, num, isOrdered, refs) {
	const task = TASK_RE.exec(content);
	const text = inlineToRichText(task ? task[2] : content, refs);
	const pFlags = {};
	if (task) {
		pFlags.checkbox = true;
		if (task[1].toLowerCase() === "x") pFlags.checked = true;
	}
	return isOrdered ? {
		_: "pageListOrderedItemText",
		pFlags,
		num,
		text
	} : {
		_: "pageListItemText",
		pFlags,
		text
	};
}
function isBlockStart(line) {
	return FENCED_OPEN_RE.test(line) || DIVIDER_RE.test(line) || ATX_RE.test(line) || BLOCKQUOTE_RE.test(line) || UNORDERED_RE.test(line) || ORDERED_RE.test(line) || INDENTED_CODE_RE.test(line) || TABLE_LINE_RE.test(line) || MATH_BLOCK_RE.test(line) || DETAILS_OPEN_RE.test(line) || REF_LINK_DEF_RE.test(line) || FOOTNOTE_DEF_RE.test(line);
}
function isFenceClose(line, openMarker) {
	const m = line.match(/^(`{3,}|~{3,})\s*$/);
	if (!m) return false;
	return m[1][0] === openMarker[0] && m[1].length >= openMarker.length;
}
function splitTableCells(line) {
	let s = line.trim();
	if (s.startsWith("|")) s = s.slice(1);
	if (s.endsWith("|")) s = s.slice(0, -1);
	s = s.replace(/\\\|/g, "");
	return s.split("|").map((c) => c.trim().replace(/\x05/g, "|"));
}
function isTableSeparatorLine(line) {
	if (!TABLE_LINE_RE.test(line)) return false;
	const cells = splitTableCells(line);
	return cells.length > 0 && cells.every((c) => TABLE_CELL_SEP_RE.test(c));
}
function parseAlignments(separatorCells) {
	return separatorCells.map((c) => {
		const trimmed = c.trim();
		const left = trimmed.startsWith(":");
		const right = trimmed.endsWith(":");
		if (left && right) return "center";
		if (right) return "right";
		return "left";
	});
}
function makeTableCell(text, header, align, refs) {
	const pFlags = {};
	if (header) pFlags.header = true;
	if (align === "center") pFlags.align_center = true;
	else if (align === "right") pFlags.align_right = true;
	const cell = {
		_: "pageTableCell",
		pFlags
	};
	if (text) cell.text = inlineToRichText(text, refs);
	return cell;
}
function lineIndent(line) {
	let n = 0;
	for (const ch of line) if (ch === " ") ++n;
	else if (ch === "	") n += 4;
	else break;
	return n;
}
function parseListBlock(lines, startIdx, baseIndent, refs, skipLines) {
	let scan = startIdx;
	while (scan < lines.length && (skipLines.has(scan) || lines[scan].trim() === "")) ++scan;
	if (scan >= lines.length) return {
		endIdx: startIdx,
		block: null
	};
	const firstLine = lines[scan];
	const ordMatch = ORDERED_RE.exec(firstLine);
	const unMatch = ordMatch ? null : UNORDERED_RE.exec(firstLine);
	if (!ordMatch && !unMatch) return {
		endIdx: startIdx,
		block: null
	};
	const isOrdered = !!ordMatch;
	const itemIndent = lineIndent(firstLine);
	if (itemIndent < baseIndent) return {
		endIdx: startIdx,
		block: null
	};
	const items = [];
	let i = scan;
	while (i < lines.length) {
		if (skipLines.has(i)) {
			++i;
			continue;
		}
		if (lines[i].trim() === "") break;
		const line = lines[i];
		const ind = lineIndent(line);
		if (ind < itemIndent) break;
		if (ind === itemIndent) {
			const m = isOrdered ? ORDERED_RE.exec(line) : UNORDERED_RE.exec(line);
			if (!m) break;
			const content = m[3];
			const newItem = makeListItem(content, m[2], isOrdered, refs);
			items.push(newItem);
			++i;
		} else {
			const nestedOrd = ORDERED_RE.exec(line);
			const nestedUn = nestedOrd ? null : UNORDERED_RE.exec(line);
			if ((nestedOrd || nestedUn) && items.length > 0) {
				const { endIdx, block: nestedBlock } = parseListBlock(lines, i, itemIndent + 1, refs, skipLines);
				if (nestedBlock) {
					const last = items[items.length - 1];
					attachNestedBlock(items, items.length - 1, last, nestedBlock);
					i = endIdx;
					continue;
				}
			}
			break;
		}
	}
	if (items.length === 0) return {
		endIdx: i,
		block: null
	};
	return {
		endIdx: i,
		block: isOrdered ? {
			_: "pageBlockOrderedList",
			pFlags: {},
			items
		} : {
			_: "pageBlockList",
			items
		}
	};
}
function attachNestedBlock(items, index, item, nested) {
	if (item._ === "pageListItemBlocks" || item._ === "pageListOrderedItemBlocks") {
		item.blocks.push(nested);
		return;
	}
	const paraBlock = {
		_: "pageBlockParagraph",
		text: item.text
	};
	if (item._ === "pageListOrderedItemText") items[index] = {
		_: "pageListOrderedItemBlocks",
		pFlags: item.pFlags,
		num: item.num,
		blocks: [paraBlock, nested]
	};
	else items[index] = {
		_: "pageListItemBlocks",
		pFlags: item.pFlags,
		blocks: [paraBlock, nested]
	};
}
function makeBlockquote(quoteLines, refs) {
	let caption = { _: "textEmpty" };
	let last = quoteLines.length - 1;
	while (last >= 0 && quoteLines[last].trim() === "") --last;
	if (last >= 1 && quoteLines[last - 1].trim() === "" && quoteLines.slice(0, last - 1).some((l) => l.trim() !== "")) {
		const m = BLOCKQUOTE_ATTRIBUTION_RE.exec(quoteLines[last].trim());
		if (m) {
			caption = inlineToRichText(m[1], refs);
			quoteLines = quoteLines.slice(0, last);
		}
	}
	const innerBlocks = parseMarkdownToPage(quoteLines.join("\n")).blocks;
	if (innerBlocks.length === 0) return {
		_: "pageBlockBlockquote",
		pFlags: {},
		text: { _: "textEmpty" },
		caption
	};
	if (innerBlocks.length === 1 && innerBlocks[0]._ === "pageBlockParagraph") return {
		_: "pageBlockBlockquote",
		pFlags: {},
		text: innerBlocks[0].text,
		caption
	};
	return {
		_: "pageBlockBlockquoteBlocks",
		blocks: innerBlocks,
		caption
	};
}
function preScan(lines) {
	const refs = /* @__PURE__ */ new Map();
	const footnotes = [];
	const skipLines = /* @__PURE__ */ new Set();
	for (let i = 0; i < lines.length; ++i) {
		const line = lines[i];
		const fn = FOOTNOTE_DEF_RE.exec(line);
		if (fn) {
			let content = fn[2];
			let j = i + 1;
			while (j < lines.length && /^[ \t]+\S/.test(lines[j]) && lines[j].trim() !== "" && !FOOTNOTE_DEF_RE.test(lines[j]) && !REF_LINK_DEF_RE.test(lines[j])) {
				content += "\n" + lines[j].trim();
				skipLines.add(j);
				++j;
			}
			if (!footnotes.some((f) => f.id === fn[1])) footnotes.push({
				id: fn[1],
				content
			});
			skipLines.add(i);
			continue;
		}
		const ref = REF_LINK_DEF_RE.exec(line);
		if (ref) {
			refs.set(ref[1].toLowerCase(), ref[2]);
			skipLines.add(i);
		}
	}
	return {
		refs,
		footnotes,
		skipLines
	};
}
function parseMarkdownToPage(raw, url = "") {
	raw = raw.replace(/<!--[\s\S]*?-->/g, "");
	const lines = raw.replace(/\r\n?/g, "\n").split("\n");
	const blocks = [];
	let firstHash = true;
	const { refs, footnotes, skipLines } = preScan(lines);
	const footnoteNumbers = new Map(footnotes.map((fn, idx) => [fn.id, idx + 1]));
	const prevFootnoteNumbers = activeFootnoteNumbers;
	activeFootnoteNumbers = footnoteNumbers;
	let hasFootnotesHeading = false;
	let i = 0;
	while (i < lines.length) {
		if (skipLines.has(i)) {
			++i;
			continue;
		}
		const line = lines[i];
		if (line.trim() === "") {
			++i;
			continue;
		}
		const fence = line.match(FENCED_OPEN_RE);
		if (fence) {
			const openMarker = fence[1];
			const language = fence[2] || "";
			const codeLines = [];
			let j = i + 1;
			while (j < lines.length && !isFenceClose(lines[j], openMarker)) {
				codeLines.push(lines[j]);
				++j;
			}
			blocks.push({
				_: "pageBlockPreformatted",
				text: plainOrEmpty(codeLines.join("\n")),
				language
			});
			i = j < lines.length ? j + 1 : j;
			continue;
		}
		if (MATH_BLOCK_RE.test(line)) {
			const mathLines = [];
			let j = i + 1;
			while (j < lines.length && !MATH_BLOCK_RE.test(lines[j])) {
				mathLines.push(lines[j]);
				++j;
			}
			blocks.push({
				_: "pageBlockPreformatted",
				text: plainOrEmpty(mathLines.join("\n")),
				language: "math"
			});
			i = j < lines.length ? j + 1 : j;
			continue;
		}
		if (DIVIDER_RE.test(line)) {
			blocks.push({ _: "pageBlockDivider" });
			++i;
			continue;
		}
		const atx = line.match(ATX_RE);
		if (atx) {
			const level = atx[1].length;
			const headingText = atx[2];
			if (headingText.trim().toLowerCase() === "footnotes") hasFootnotesHeading = true;
			const inner = inlineToRichText(headingText, refs);
			const slug = slugifyHeading(headingText);
			let block;
			if (level === 1) {
				if (firstHash) {
					block = {
						_: "pageBlockTitle",
						text: inner
					};
					firstHash = false;
				} else block = {
					_: "pageBlockHeader",
					text: inner
				};
			} else if (level === 2) block = {
				_: "pageBlockHeader",
				text: inner
			};
			else block = {
				_: "pageBlockSubheader",
				text: inner
			};
			if (block._ !== "pageBlockTitle") block.headingLevel = level;
			if (slug && block._ !== "pageBlockTitle") blocks.push({
				_: "pageBlockAnchor",
				name: slug
			});
			blocks.push(block);
			++i;
			continue;
		}
		if (DETAILS_OPEN_RE.test(line)) {
			const openMatch = line.match(DETAILS_OPEN_RE);
			const firstRemainder = line.slice(openMatch[0].length);
			const innerLines = [];
			let next;
			if (DETAILS_CLOSE_RE.test(firstRemainder)) {
				innerLines.push(firstRemainder.slice(0, firstRemainder.search(DETAILS_CLOSE_RE)));
				next = i + 1;
			} else {
				if (firstRemainder.trim()) innerLines.push(firstRemainder);
				let j = i + 1;
				while (j < lines.length && !DETAILS_CLOSE_RE.test(lines[j])) {
					innerLines.push(lines[j]);
					++j;
				}
				if (j < lines.length) {
					const before = lines[j].slice(0, lines[j].search(DETAILS_CLOSE_RE));
					if (before.trim()) innerLines.push(before);
				}
				next = j < lines.length ? j + 1 : j;
			}
			let innerText = innerLines.join("\n");
			let title = { _: "textEmpty" };
			const sm = SUMMARY_RE.exec(innerText);
			if (sm) {
				title = inlineToRichText(sm[1].trim(), refs);
				innerText = innerText.replace(SUMMARY_RE, "");
			}
			blocks.push({
				_: "pageBlockDetails",
				pFlags: {},
				title,
				blocks: parseMarkdownToPage(innerText).blocks
			});
			i = next;
			continue;
		}
		if (BLOCKQUOTE_RE.test(line)) {
			const quoteLines = [];
			while (i < lines.length) {
				const m = lines[i].match(BLOCKQUOTE_RE);
				if (!m) break;
				quoteLines.push(m[1]);
				++i;
			}
			blocks.push(makeBlockquote(quoteLines, refs));
			continue;
		}
		if (TABLE_LINE_RE.test(line) && i + 1 < lines.length && isTableSeparatorLine(lines[i + 1])) {
			const headerCells = splitTableCells(line);
			const aligns = parseAlignments(splitTableCells(lines[i + 1]));
			const rows = [];
			rows.push({
				_: "pageTableRow",
				cells: headerCells.map((c, idx) => makeTableCell(c, true, aligns[idx] || "left", refs))
			});
			let j = i + 2;
			while (j < lines.length && TABLE_LINE_RE.test(lines[j]) && !isTableSeparatorLine(lines[j])) {
				const dataCells = splitTableCells(lines[j]);
				rows.push({
					_: "pageTableRow",
					cells: dataCells.map((c, idx) => makeTableCell(c, false, aligns[idx] || "left", refs))
				});
				++j;
			}
			blocks.push({
				_: "pageBlockTable",
				pFlags: { bordered: true },
				title: { _: "textEmpty" },
				rows
			});
			i = j;
			continue;
		}
		if (UNORDERED_RE.test(line) || ORDERED_RE.test(line)) {
			const { endIdx, block: listBlock } = parseListBlock(lines, i, 0, refs, skipLines);
			if (listBlock) {
				blocks.push(listBlock);
				i = endIdx;
				continue;
			}
		}
		if (INDENTED_CODE_RE.test(line)) {
			const codeLines = [];
			while (i < lines.length) {
				const m = lines[i].match(INDENTED_CODE_RE);
				if (!m) break;
				codeLines.push(m[2]);
				++i;
			}
			blocks.push({
				_: "pageBlockPreformatted",
				text: plainOrEmpty(codeLines.join("\n")),
				language: ""
			});
			continue;
		}
		if (i + 1 < lines.length && DEFLIST_DEF_RE.test(lines[i + 1]) && !isBlockStart(line)) {
			const term = line;
			const definitions = [];
			let j = i + 1;
			while (j < lines.length) {
				const m = DEFLIST_DEF_RE.exec(lines[j]);
				if (!m) break;
				definitions.push(m[1]);
				++j;
			}
			blocks.push({
				_: "pageBlockParagraph",
				text: {
					_: "textBold",
					text: inlineToRichText(term, refs)
				}
			});
			for (const def of definitions) blocks.push({
				_: "pageBlockBlockquote",
				pFlags: {},
				text: inlineToRichText(def, refs),
				caption: { _: "textEmpty" }
			});
			i = j;
			continue;
		}
		const paragraphLines = [];
		while (i < lines.length && lines[i].trim() !== "" && !isBlockStart(lines[i]) && !skipLines.has(i)) {
			paragraphLines.push(lines[i]);
			++i;
		}
		if (paragraphLines.length) blocks.push({
			_: "pageBlockParagraph",
			text: inlineToRichText(paragraphLines.join("\n"), refs)
		});
		else {
			blocks.push({
				_: "pageBlockParagraph",
				text: inlineToRichText(line, refs)
			});
			++i;
		}
	}
	if (footnotes.length > 0) {
		blocks.push({ _: "pageBlockDivider" });
		if (!hasFootnotesHeading) blocks.push({
			_: "pageBlockHeader",
			text: {
				_: "textPlain",
				text: "Footnotes"
			}
		});
		for (const fn of footnotes) {
			const n = footnoteNumbers.get(fn.id);
			blocks.push({
				_: "pageBlockAnchor",
				name: "fn-" + n
			});
			blocks.push({
				_: "pageBlockParagraph",
				text: {
					_: "textConcat",
					texts: [
						{
							_: "textSuperscript",
							text: {
								_: "textUrl",
								url: "#fnref-" + n,
								text: {
									_: "textPlain",
									text: "" + n
								},
								webpage_id: 0
							}
						},
						{
							_: "textPlain",
							text: " "
						},
						inlineToRichText(fn.content, refs)
					]
				}
			});
		}
	}
	activeFootnoteNumbers = prevFootnoteNumbers;
	return {
		_: "page",
		pFlags: {},
		url,
		blocks,
		photos: [],
		documents: []
	};
}
//#endregion
//#region src/components/markdownInstantView.ts
function openMarkdownInstantView({ raw, url = "", HotReloadGuardProvider }) {
	const page = parseMarkdownToPage(raw, url);
	page.views = 0;
	hotReloadGuard.openInstantViewInAppBrowser({
		cachedPage: page,
		HotReloadGuardProvider
	});
}
//#endregion
//#region src/components/wrappers/document.ts
var document_exports = /* @__PURE__ */ __exportAll({ default: () => wrapDocument });
var attachToDownloadOfRow = /* @__PURE__ */ new WeakMap();
hotListen(void 0, rootScope, "document_downloading", (docId) => {
	Array.from(document.querySelectorAll(`.document[data-doc-id="${docId}"]`)).forEach((element) => attachToDownloadOfRow.get(element)?.());
});
async function wrapDocument({ message, middleware, withTime, fontWeight, voiceAsMusic, showSender, searchContext, loadPromises, autoDownloadSize, lazyLoadQueue, sizeType, managers = rootScope.managers, cacheContext, fontSize, getSize, canTranscribeVoice, isOut, clickable, uploadingFileName, shouldWrapAsVoice, customAudioToTextButton, globalMedia, doc: docOverride, slot, draft, cover }) {
	fontWeight ?? (fontWeight = 500);
	sizeType ?? (sizeType = "");
	fontSize ?? (fontSize = 16);
	const noAutoDownload = autoDownloadSize === 0;
	const doc = docOverride ?? (message.media.document || message.media.webpage.document);
	uploadingFileName ?? (uploadingFileName = message?.uploadingFileName?.[0]);
	if (isPlayableDocument(doc)) return createAudioElement({
		message,
		middleware,
		doc: docOverride,
		...slot !== void 0 ? {
			mediaSlot: slot,
			listLoaderFactory: emptyMediaListLoaderFactory
		} : {},
		withTime,
		voiceAsMusic,
		searchContext,
		showSender,
		noAutoDownload,
		clickable,
		lazyLoadQueue,
		loadPromises,
		uploadingFileName,
		shouldWrapAsVoice,
		customAudioToTextButton,
		globalMedia,
		isOut,
		canTranscribe: canTranscribeVoice && doc.type === "voice",
		fontWeight,
		fontSize,
		sizeType,
		getSize,
		cover
	});
	const extSplitted = doc.file_name ? doc.file_name.split(".") : "";
	let ext = "";
	ext = extSplitted.length > 1 && Array.isArray(extSplitted) ? clearBadCharsAndTrim(extSplitted.pop().split(" ", 1)[0].toLowerCase()) : "file";
	const docDiv = document.createElement("div");
	docDiv.classList.add("document", `ext-${ext}`);
	docDiv.dataset.docId = "" + doc.id;
	docDiv.doc = doc;
	const canActivate = !(!uploadingFileName && message.pFlags.is_outgoing && !message.mid);
	const canOpen = canActivate && !draft;
	const canSaveToCache = doc.size <= MAX_FILE_SAVE_SIZE;
	const isMarkdown = (doc) => ext === "md" || ext === "markdown" || /^text\/(x-)?markdown\b/i.test(doc.mime_type || "");
	const isViewable = (doc) => MEDIA_MIME_TYPES_SUPPORTED.has(doc.mime_type) && !!doc.thumbs?.length && canSaveToCache;
	const icoDiv = canOpen && Modes.a11y ? Button("", { noRipple: true }) : document.createElement("div");
	if (canOpen && Modes.a11y) {
		const opens = isMarkdown(doc) || isViewable(doc);
		icoDiv.setAttribute("aria-label", langPack_default.format(opens ? "AccDescr.OpenDocument" : "AccDescr.DownloadDocument", true, [doc.file_name || "Unknown.file"]));
	}
	icoDiv.classList.add("document-ico");
	let icoTextEl;
	const hadContext = !!cacheContext;
	const getCacheContext = () => {
		return hadContext ? cacheContext : apiManagerProxy.getCacheContext(doc);
	};
	cacheContext = getCacheContext();
	let hasThumb = false;
	if (doc.thumbs?.length || message.pFlags.is_outgoing && cacheContext.url && doc.type === "photo") {
		docDiv.classList.add("document-with-thumb");
		hasThumb = true;
		const imgs = [];
		if (message.pFlags.is_outgoing && ["photo", "video"].includes(doc.type) && cacheContext.url) {
			const image = document.createElement("img");
			image.src = cacheContext.url;
			image.alt = "";
			icoDiv.append(image);
			imgs.push(image);
		} else {
			performance.now();
			const wrapped = await wrapPhoto({
				photo: doc,
				message: null,
				container: icoDiv,
				boxWidth: 54,
				boxHeight: 54,
				loadPromises,
				withoutPreloader: true,
				lazyLoadQueue,
				size: choosePhotoSize(doc, 54, 54, true),
				managers
			});
			icoDiv.style.width = icoDiv.style.height = "";
			if (wrapped.images.thumb) imgs.push(wrapped.images.thumb);
			if (wrapped.images.full) imgs.push(wrapped.images.full);
		}
		imgs.forEach((img) => img.classList.add("document-thumb"));
	} else {
		icoTextEl = document.createElement("span");
		icoTextEl.classList.add("document-ico-text");
		icoTextEl.innerText = ext;
		icoDiv.append(icoTextEl);
	}
	const fileName = doc.file_name ? wrapPlainText(doc.file_name) : "Unknown.file";
	document.createElement("div").classList.add("document-description");
	const bytesContainer = document.createElement("span");
	const bytesEl = formatBytes(doc.size);
	const bytesJoiner = " / ";
	const descriptionParts = [bytesEl];
	if (withTime) descriptionParts.push(formatFullSentTime(message.date));
	if (showSender) descriptionParts.push(await wrapSenderToPeer(message));
	let progressRoom;
	if (!withTime && !showSender) {
		progressRoom = document.createElement("span");
		progressRoom.append(bytesJoiner, formatBytes(doc.size));
		progressRoom.style.visibility = "hidden";
	}
	docDiv.innerHTML = `
  ${cacheContext.downloaded && !uploadingFileName || !message.mid || !hasThumb ? "" : `<div class="document-download"></div>`}
  <div class="document-name"></div>
  <div class="document-size"></div>
  `;
	const nameDiv = docDiv.querySelector(".document-name");
	const middleEllipsisEl = MiddleEllipsisElement.create();
	middleEllipsisEl.dataset.fontWeight = "" + fontWeight;
	middleEllipsisEl.dataset.fontSize = "" + fontSize;
	middleEllipsisEl.dataset.sizeType = sizeType;
	middleEllipsisEl.getSize = getSize;
	middleEllipsisEl.textContent = fileName;
	if (!message.mid) docDiv.classList.add("downloaded");
	nameDiv.append(middleEllipsisEl);
	if (showSender) nameDiv.append(wrapSentTime(message));
	const sizeDiv = docDiv.querySelector(".document-size");
	bytesContainer.append(...joinElementsWith(descriptionParts, " · "));
	if (progressRoom) bytesContainer.append(progressRoom);
	sizeDiv.append(bytesContainer);
	docDiv.prepend(icoDiv);
	if (!canActivate) return docDiv;
	let downloadDiv, preloader = null;
	const onLoad = () => {
		docDiv.classList.remove("downloading");
		if (doc.size > 20971520 && !uploadingFileName) {
			preloader.setManual();
			preloader.attach(downloadDiv);
			preloader.preloader.classList.add("manual");
			preloader.setDownloadFunction(load);
			return;
		}
		if (canSaveToCache) docDiv.classList.add("downloaded");
		if (downloadDiv) {
			if (downloadDiv !== icoDiv) {
				const _downloadDiv = downloadDiv;
				setTimeout(() => {
					_downloadDiv.remove();
				}, 200);
			}
			downloadDiv = null;
		}
		if (preloader) preloader = null;
	};
	const addByteProgress = (promise) => {
		docDiv.classList.add("downloading");
		const sizeContainer = document.createElement("span");
		const _bytesContainer = formatBytes(doc.size);
		sizeContainer.style.position = "absolute";
		sizeContainer.style.insetInlineStart = "0";
		promise.then(() => preloader?.whenCaughtUp()).then(onLoad, () => docDiv.classList.remove("downloading")).finally(() => {
			bytesContainer.style.visibility = "";
			sizeContainer.remove();
		});
		const format = (bytes) => formatBytes(bytes);
		let d = format(0);
		bytesContainer.style.visibility = "hidden";
		sizeContainer.append(d, bytesJoiner, _bytesContainer);
		bytesContainer.parentElement.append(sizeContainer);
		promise.addNotifyListener((progress) => {
			const _d = format(progress.done);
			d.replaceWith(_d);
			d = _d;
		});
	};
	const load = (e, onlyAttach) => {
		const save = !e || e.isTrusted;
		const doc = docDiv.doc;
		let download;
		const queueId = hotReloadGuard.appImManager.chat?.bubbles?.lazyLoadQueue.queueId;
		if (onlyAttach) download = appDownloadManager.attachToDownloadToDisc(doc);
		else if (!save) download = appDownloadManager.downloadToDisc({
			media: doc,
			queueId
		}, true);
		else if (isMarkdown(doc)) {
			download = appDownloadManager.downloadMedia({
				media: doc,
				queueId
			});
			download.then(readBlobAsText).then((raw) => {
				openMarkdownInstantView({
					raw,
					HotReloadGuardProvider: SolidJSHotReloadGuardProvider
				});
			}).catch(noop);
		} else if (doc.type === "pdf" && false);
		else if (isViewable(doc)) download = appDownloadManager.downloadMediaURL({
			media: doc,
			queueId
		});
		else {
			download = appDownloadManager.downloadToDisc({
				media: doc,
				queueId
			});
			if (isIpRevealingMimeType(doc.mime_type) || isIpRevealingExtension(ext)) confirmationPopup({
				descriptionLangKey: "Chat.File.QuickLook.Svg",
				button: {
					langKey: "OK",
					isCancel: true
				}
			});
		}
		download.catch(() => {
			docDiv.classList.remove("downloading");
		});
		if (downloadDiv) {
			preloader.attach(downloadDiv, true, download);
			addByteProgress(download);
		}
	};
	const { fileName: downloadFileName } = getDownloadMediaDetails({
		media: doc,
		downloadId: "1"
	});
	if (await managers.apiFileManager.isDownloading(downloadFileName)) {
		downloadDiv = docDiv.querySelector(".document-download") || icoDiv;
		const promise = appDownloadManager.attachToDownloadToDisc(doc);
		preloader = new ProgressivePreloader();
		preloader.attach(downloadDiv, false, promise);
		preloader.setDownloadFunction(load);
		addByteProgress(promise);
	} else if (!cacheContext.downloaded || uploadingFileName) {
		downloadDiv = docDiv.querySelector(".document-download") || icoDiv;
		preloader = new ProgressivePreloader({ isUpload: !!uploadingFileName });
		if (!uploadingFileName) {
			preloader.construct();
			preloader.setManual();
			preloader.attach(downloadDiv);
			preloader.setDownloadFunction(load);
			if (autoDownloadSize !== void 0 && autoDownloadSize >= doc.size) simulateClickEvent(preloader.preloader);
		} else {
			const uploadPromise = appDownloadManager.getUpload(uploadingFileName);
			preloader.attachPromise(uploadPromise);
			preloader.attach(downloadDiv);
			addByteProgress(uploadPromise);
		}
	}
	attachClickEvent(docDiv, (e) => {
		if (findUpClassName(e.target, "time")) return;
		if (preloader) preloader.onClick(e);
		else if (canOpen) load(e);
	});
	attachToDownloadOfRow.set(docDiv, () => {
		if (preloader?.preloader.classList.contains("manual")) load(void 0, true);
	});
	return docDiv;
}
//#endregion
export { emptyMediaListLoaderFactory as i, wrapDocument as n, readBlobAsText as r, document_exports as t };
