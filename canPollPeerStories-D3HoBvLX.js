//# allFunctionsCalledOnLoad
import { i as __toESM } from "./rolldown-runtime-CwcJO0Gh.js";
import { H as isObject, _ as limitSymbols } from "./objectUrlUtils-5x08MNuO.js";
import "./rootScope-CZS0lmz8.js";
import { r as isRestricted, t as SENSITIVE_RESTRICTION_REASON } from "./restrictions-BZnhcj9D.js";
import { n as encodeSpoiler, t as parseEntities } from "./parseEntities-C5qsCJ5K.js";
import { t as lowerBound } from "./lowerBound-DXL9JCGb.js";
import { n as createEntityConflictCheck, t as sortEntities } from "./sortEntities-9u5MR7Xq.js";
import { c as fixEmoji } from "./index-B7axFZql.js";
import { t as require_BigInteger } from "./BigInteger-0a0WsWCs.js";
//#region src/helpers/array/flatten.ts
function flatten(arr) {
	return arr.reduce((acc, val) => (acc.push(...val), acc), []);
}
//#endregion
//#region src/lib/appManagers/utils/peers/isPeerRestricted.ts
function isPeerRestricted(peer, skipSensitive, ignored) {
	let restrictionReasons = peer?.restriction_reason;
	if (!(restrictionReasons && peer.pFlags.restricted)) return false;
	if (skipSensitive) restrictionReasons = restrictionReasons.filter((reason) => reason.reason !== SENSITIVE_RESTRICTION_REASON);
	return isRestricted(restrictionReasons, ignored);
}
//#endregion
//#region src/lib/appManagers/utils/peers/getPeerPhoto.ts
function getPeerPhoto(peer, ignored) {
	if (!peer || isPeerRestricted(peer, false, ignored)) return;
	const photo = peer?.photo;
	if (photo?._ === "userProfilePhoto" || photo?._ === "chatPhoto") return photo;
}
//#endregion
//#region src/helpers/nanoton.ts
var import_BigInteger = /* @__PURE__ */ __toESM(require_BigInteger());
var NANOTON_DECIMALS = 9;
var GRAM_CURRENCY_SYMBOL = "GRAM";
function formatNanoton(amount, maxDecimals = 2, withThousandsSep = true) {
	let amountStr = String(amount);
	let negative = false;
	if (amountStr.startsWith("-")) {
		negative = true;
		amountStr = amountStr.slice(1);
	}
	if (amountStr.length < NANOTON_DECIMALS) amountStr = amountStr.padStart(NANOTON_DECIMALS, "0");
	let intPart = amountStr.slice(0, amountStr.length - NANOTON_DECIMALS) || "0";
	const fracPart = amountStr.slice(-9).padEnd(NANOTON_DECIMALS, "0");
	let frac2 = fracPart.slice(0, maxDecimals);
	if ((fracPart.length > maxDecimals ? parseInt(fracPart[maxDecimals], 10) : 0) >= 5) {
		const asNum = Number(frac2) + 1;
		if (asNum >= 10 ** maxDecimals) {
			intPart = (0, import_BigInteger.default)(intPart).plus(1).toString();
			frac2 = "0".repeat(maxDecimals);
		} else frac2 = asNum.toString().padStart(maxDecimals, "0");
	}
	let res = "";
	if (negative && (intPart !== "0" || Number(frac2) !== 0)) res += "-";
	if (withThousandsSep) res += intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	else res += intPart;
	if (maxDecimals > 0) {
		frac2 = frac2.replace(/0+$/, "");
		if (frac2) res += "." + frac2;
	}
	return res;
}
function nanotonToJsNumber(nanoton) {
	return Number(formatNanoton(nanoton, NANOTON_DECIMALS, false));
}
function parseNanotonFromDecimal(decimal) {
	const negative = decimal.startsWith("-");
	const [int, frac = "0"] = (negative ? decimal.slice(1) : decimal).split(".");
	const intPart = int + "0".repeat(NANOTON_DECIMALS);
	const fracPart = frac.padEnd(NANOTON_DECIMALS, "0").slice(0, NANOTON_DECIMALS);
	const amount = (0, import_BigInteger.default)(intPart).plus((0, import_BigInteger.default)(fracPart));
	return negative ? amount.negate() : amount;
}
//#endregion
//#region src/lib/appManagers/utils/peers/getPeerId.ts
function getPeerId(peerId) {
	if (peerId !== void 0 && (peerId.isPeerId ? peerId.isPeerId() : false)) return peerId;
	else if (isObject(peerId)) {
		const userId = peerId.user_id;
		if (userId !== void 0) return userId.toPeerId(false);
		const chatId = peerId.channel_id || peerId.chat_id;
		if (chatId !== void 0) return chatId.toPeerId(true);
		return 0;
	} else if (!peerId) return 0;
	const isUser = peerId.charAt(0) === "u";
	const peerParams = peerId.substr(1).split("_");
	return isUser ? peerParams[0].toPeerId() : (peerParams[0] || "").toPeerId(true);
}
//#endregion
//#region src/lib/richTextProcessor/wrapPlainText.ts
/**
* ! This function is still unsafe to use with .innerHTML
*/
function wrapPlainText(text, entities = []) {
	entities.forEach((entity) => {
		if (entity._ === "messageEntitySpoiler") text = encodeSpoiler(text, entity).text;
	});
	return text;
}
//#endregion
//#region src/lib/appManagers/utils/messages/isOwnMessage.ts
/**
* Whether one sent the message oneself, as tdesktop's `out()` tells it: an outgoing one — the server
* may leave its sender out — or one from oneself where nothing is outgoing, in Saved Messages.
*/
function isOwnMessage(message, myId) {
	return !!message.pFlags.out || message.fromId === myId;
}
//#endregion
//#region src/lib/richTextProcessor/mergeEntities.ts
function mergeEntities(currentEntities, newEntities) {
	const isConflicting = createEntityConflictCheck(currentEntities);
	currentEntities = currentEntities.concat(newEntities.filter((entity) => !isConflicting(entity)));
	sortEntities(currentEntities);
	for (let i = 0; i < currentEntities.length; ++i) {
		let entity = currentEntities[i];
		if (entity._ === "messageEntityEmoji") {
			const nextEntity = currentEntities[i + 1];
			if (nextEntity && nextEntity.offset < entity.offset + entity.length) {
				entity = currentEntities[i] = { ...entity };
				entity.length = nextEntity.offset - entity.offset;
			}
		}
	}
	return currentEntities;
}
//#endregion
//#region src/lib/richTextProcessor/wrapMessageEntities.ts
function wrapMessageEntities(message, entities = []) {
	message = fixEmoji(message, entities);
	const myEntities = parseEntities(message);
	const totalEntities = mergeEntities(entities, myEntities);
	return {
		message,
		entities,
		myEntities,
		totalEntities
	};
}
//#endregion
//#region src/lib/richTextProcessor/wrapTextWithEntities.ts
function wrapTextWithEntities(textWithEntities) {
	const { message, entities, myEntities } = wrapMessageEntities(textWithEntities.text, textWithEntities.entities);
	return {
		_: "textWithEntities",
		text: message,
		entities: mergeEntities(entities, myEntities.filter((entity) => entity._ === "messageEntityCustomEmoji" || entity._ === "messageEntityEmoji"))
	};
}
var MATH_MARKER_RE = /\x02([A-Za-z0-9+/=]*)\x02/g;
function toBase64(s) {
	const bytes = new TextEncoder().encode(s);
	let bin = "";
	for (let i = 0; i < bytes.length; ++i) bin += String.fromCharCode(bytes[i]);
	return btoa(bin);
}
function fromBase64(b64) {
	const bin = atob(b64);
	const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
	return new TextDecoder().decode(bytes);
}
function encodeInlineMath(source) {
	return "" + toBase64(source) + "";
}
function decodeInlineMath(encoded) {
	return fromBase64(encoded);
}
//#endregion
//#region src/lib/richTextProcessor/wrapTelegramRichText.ts
function wrapTelegramRichText(richText, options) {
	return wrapTextWithEntities(processRichText(richText, options));
}
function processRichText(richText, options) {
	const output = {
		text: "",
		entities: []
	};
	appendRichText(richText, options, output);
	return {
		_: "textWithEntities",
		text: output.text,
		entities: output.entities
	};
}
function appendRichText(richText, options, output) {
	switch (richText._) {
		case "textEmpty": return;
		case "textPlain":
			output.text += richText.text;
			return;
		case "textConcat":
			for (const part of richText.texts) appendRichText(part, options, output);
			return;
		case "textBold": return wrapEntity(richText.text, (offset, length) => ({
			_: "messageEntityBold",
			offset,
			length
		}), options, output);
		case "textItalic": return wrapEntity(richText.text, (offset, length) => ({
			_: "messageEntityItalic",
			offset,
			length
		}), options, output);
		case "textUnderline": return wrapEntity(richText.text, (offset, length) => ({
			_: "messageEntityUnderline",
			offset,
			length
		}), options, output);
		case "textStrike": return wrapEntity(richText.text, (offset, length) => ({
			_: "messageEntityStrike",
			offset,
			length
		}), options, output);
		case "textFixed": return wrapEntity(richText.text, (offset, length) => ({
			_: "messageEntityCode",
			offset,
			length
		}), options, output);
		case "textUrl": {
			const hasWebPage = !!richText.webpage_id && richText.webpage_id !== "0";
			return wrapEntity(richText.text, (offset, length) => ({
				_: "messageEntityTextUrl",
				offset,
				length,
				url: hasWebPage ? "tg://iv?url=" + encodeURIComponent(richText.url) : richText.url,
				safe: hasWebPage
			}), options, output);
		}
		case "textEmail": return wrapEntity(richText.text, (offset, length) => ({
			_: "messageEntityEmail",
			offset,
			length,
			richTextTarget: richText.email
		}), options, output);
		case "textMarked": return wrapEntity(richText.text, (offset, length) => ({
			_: "messageEntityHighlight",
			offset,
			length
		}), options, output);
		case "textPhone": return wrapEntity(richText.text, (offset, length) => ({
			_: "messageEntityPhone",
			offset,
			length,
			richTextTarget: richText.phone
		}), options, output);
		case "textMath":
			output.text += encodeInlineMath(richText.source);
			return;
		case "textImage": return wrapEntity({
			_: "textPlain",
			text: ""
		}, (offset, length) => ({
			_: "messageEntityCustomEmoji",
			document_id: richText.document_id,
			offset,
			length,
			w: richText.w,
			h: richText.h
		}), options, output);
		case "textCustomEmoji": return wrapEntity({
			_: "textPlain",
			text: richText.alt || ""
		}, (offset, length) => ({
			_: "messageEntityCustomEmoji",
			document_id: richText.document_id,
			offset,
			length
		}), options, output);
		case "textSpoiler": return wrapEntity(richText.text, (offset, length) => ({
			_: "messageEntitySpoiler",
			offset,
			length
		}), options, output);
		case "textMention": return wrapEntity(richText.text, (offset, length) => ({
			_: "messageEntityMention",
			offset,
			length
		}), options, output);
		case "textHashtag": return wrapEntity(richText.text, (offset, length) => ({
			_: "messageEntityHashtag",
			offset,
			length
		}), options, output);
		case "textBotCommand": return wrapEntity(richText.text, (offset, length) => ({
			_: "messageEntityBotCommand",
			offset,
			length
		}), options, output);
		case "textCashtag": return wrapEntity(richText.text, (offset, length) => ({
			_: "messageEntityCashtag",
			offset,
			length
		}), options, output);
		case "textAutoUrl": return wrapEntity(richText.text, (offset, length) => ({
			_: "messageEntityUrl",
			offset,
			length
		}), options, output);
		case "textAutoEmail": return wrapEntity(richText.text, (offset, length) => ({
			_: "messageEntityEmail",
			offset,
			length
		}), options, output);
		case "textAutoPhone": return wrapEntity(richText.text, (offset, length) => ({
			_: "messageEntityPhone",
			offset,
			length
		}), options, output);
		case "textBankCard": return wrapEntity(richText.text, (offset, length) => ({
			_: "messageEntityBankCard",
			offset,
			length
		}), options, output);
		case "textTonAddress": return wrapEntity(richText.text, (offset, length) => ({
			_: "messageEntityTonAddress",
			offset,
			length
		}), options, output);
		case "textMentionName": return wrapEntity(richText.text, (offset, length) => ({
			_: "messageEntityMentionName",
			offset,
			length,
			user_id: richText.user_id
		}), options, output);
		case "textDate": return wrapEntity(richText.text, (offset, length) => ({
			_: "messageEntityFormattedDate",
			pFlags: richText.pFlags,
			offset,
			length,
			date: richText.date
		}), options, output);
		case "textSubscript": return wrapEntity(richText.text, (offset, length) => ({
			_: "messageEntitySubscript",
			offset,
			length
		}), options, output);
		case "textSuperscript": return wrapEntity(richText.text, (offset, length) => ({
			_: "messageEntitySuperscript",
			offset,
			length
		}), options, output);
		case "textAnchor":
			if (!options?.anchorPrefix) return appendRichText(richText.text, options, output);
			return wrapEntity(richText.text, (offset, length) => ({
				_: "messageEntityAnchor",
				offset,
				length,
				name: options.anchorPrefix + richText.name,
				richTextReference: length > 0
			}), options, output);
		case "textDiff":
			if (!options?.displayTextDiff) return appendRichText(richText.text, options, output);
			wrapEntity(richText.old_text, (offset, length) => ({
				_: "messageEntityDiffDelete",
				offset,
				length
			}), options, output);
			return wrapEntity(richText.text, (offset, length) => ({
				_: "messageEntityDiffInsert",
				offset,
				length
			}), options, output);
		case "textButton": {
			const index = output.entities.length;
			const offset = output.text.length;
			appendRichText(richText.text, options, output);
			const length = output.text.length - offset;
			if (!length) return;
			const entities = [{
				_: "messageEntityRichButton",
				offset,
				length,
				button: richText
			}];
			if (richText.type._ === "inlineButtonTypeUrl") entities.push({
				_: "messageEntityTextUrl",
				offset,
				length,
				url: richText.type.url
			});
			output.entities.splice(index, 0, ...entities);
			return;
		}
		default: return;
	}
}
function wrapEntity(innerRichText, createEntity, options, output) {
	const offset = output.text.length;
	const index = output.entities.push(void 0) - 1;
	appendRichText(innerRichText, options, output);
	output.entities[index] = createEntity(offset, output.text.length - offset);
}
//#endregion
//#region src/lib/richTextProcessor/orderedList.ts
var ORDERED_LIST_TYPES = {
	"1": {
		htmlType: "1",
		style: "decimal"
	},
	"decimal": {
		htmlType: "1",
		style: "decimal"
	},
	"a": {
		htmlType: "a",
		style: "lower-alpha"
	},
	"lower-alpha": {
		htmlType: "a",
		style: "lower-alpha"
	},
	"lower-latin": {
		htmlType: "a",
		style: "lower-alpha"
	},
	"A": {
		htmlType: "A",
		style: "upper-alpha"
	},
	"upper-alpha": {
		htmlType: "A",
		style: "upper-alpha"
	},
	"upper-latin": {
		htmlType: "A",
		style: "upper-alpha"
	},
	"i": {
		htmlType: "i",
		style: "lower-roman"
	},
	"lower-roman": {
		htmlType: "i",
		style: "lower-roman"
	},
	"I": {
		htmlType: "I",
		style: "upper-roman"
	},
	"upper-roman": {
		htmlType: "I",
		style: "upper-roman"
	}
};
function getOrderedListTypePresentation(value) {
	const type = typeof value === "string" ? value : "";
	const key = type.length > 1 ? type.toLowerCase() : type;
	return Object.prototype.hasOwnProperty.call(ORDERED_LIST_TYPES, key) ? ORDERED_LIST_TYPES[key] : void 0;
}
function canonicalOrderedListType(value) {
	const type = typeof value === "string" ? value : "";
	return getOrderedListTypePresentation(type)?.htmlType || type || "1";
}
/**
* The number of each of a list's `count` items, as the list counts them: from its start (its first item's,
* when it has none), an item's own value taking over.
*/
function* orderedListValues(count, start, reversed, itemValue) {
	let value = Number.isInteger(start) ? start : reversed ? count : 1;
	for (let index = 0; index < count; ++index) {
		const explicit = itemValue(index);
		if (Number.isInteger(explicit)) value = explicit;
		yield value;
		value += reversed ? -1 : 1;
	}
}
function isDecimalOrderedListType(value) {
	return canonicalOrderedListType(value) === "1";
}
/**
* A list item written as text — what stands for a list where a message carries
* none: a rich list sent without formatting, a list pasted into a caption.
*/
function formatListItemMarker({ ordered, value, type, num, checkbox, checked }) {
	const marker = ordered ? `${num || formatOrderedListMarker(value, type)}. ` : "- ";
	return checkbox ? `${marker}[${checked ? "x" : " "}] ` : marker;
}
/** The textual equivalent of the CSS counter style, including its decimal fallback. */
function formatOrderedListMarker(value, type) {
	const htmlType = getOrderedListTypePresentation(type)?.htmlType;
	if (!Number.isInteger(value) || value < 1 || !htmlType || htmlType === "1") return String(value);
	let marker = "";
	if (htmlType === "a" || htmlType === "A") for (let remaining = value; remaining > 0; remaining = Math.floor((remaining - 1) / 26)) marker = String.fromCharCode(65 + (remaining - 1) % 26) + marker;
	else {
		if (value > 3999) return String(value);
		const numerals = [
			[1e3, "M"],
			[900, "CM"],
			[500, "D"],
			[400, "CD"],
			[100, "C"],
			[90, "XC"],
			[50, "L"],
			[40, "XL"],
			[10, "X"],
			[9, "IX"],
			[5, "V"],
			[4, "IV"],
			[1, "I"]
		];
		let remaining = value;
		for (const [number, text] of numerals) while (remaining >= number) {
			marker += text;
			remaining -= number;
		}
	}
	return htmlType === htmlType.toLowerCase() ? marker.toLowerCase() : marker;
}
//#endregion
//#region src/lib/richMessage.ts
var emptyRichText = { _: "textEmpty" };
/** What a text of a rich message reads: what its length is checked by, and a quote of it counted in (`@lib/richQuote`) */
function getRichTextFlatText(text) {
	if (!text) return "";
	switch (text._) {
		case "textEmpty":
		case "textImage": return "";
		case "textPlain": return text.text;
		case "textMath": return text.source;
		case "textCustomEmoji": return text.alt;
		case "textConcat": return text.texts.map(getRichTextFlatText).join("");
		default: return getRichTextFlatText(text.text);
	}
}
/**
* What a reply asks for of its quote: a quote of a rich message (`rich`, `@lib/richQuote`) goes by itself, its
* fragments and where it starts — with a text beside it the server takes it for a quote of a text
*/
function getInputReplyQuote(quote) {
	return quote.rich ? {
		quote_rich: quote.rich,
		quote_offset: quote.offset
	} : {
		quote_text: quote.text,
		quote_entities: quote.entities,
		quote_offset: quote.offset
	};
}
function richMessageToPage(richMessage) {
	const pFlags = richMessage.pFlags || {};
	return {
		_: "page",
		pFlags: {
			rtl: pFlags.rtl,
			part: pFlags.part
		},
		url: "",
		blocks: richMessage.blocks || [],
		photos: richMessage.photos || [],
		documents: richMessage.documents || [],
		views: 0
	};
}
function isRichMessagePart(richMessage) {
	return !!richMessage.pFlags?.part;
}
function flattenRichMessageSummary(richMessage) {
	return flattenRichMessage(richMessage, true);
}
/** Real rich-message text only, without UI fallback labels such as Photo or Unsupported. */
function flattenRichMessageContent(richMessage) {
	return flattenRichMessage(richMessage, false);
}
function flattenRichMessage(richMessage, includeFallbacks) {
	const summary = emptySummary();
	if (richMessage) appendBlocks(summary, richMessage.blocks || [], "", includeFallbacks);
	return summary;
}
function flattenRichMessageSummaryText(richMessage) {
	return flattenRichMessageSummary(richMessage).text;
}
var spoilersCache = /* @__PURE__ */ new WeakMap();
/** Whether a rich message hides any of its text behind a spoiler. */
function hasRichMessageSpoilers(richMessage) {
	if (!richMessage) return false;
	let hasSpoilers = spoilersCache.get(richMessage);
	if (hasSpoilers === void 0) {
		hasSpoilers = flattenRichMessageContent(richMessage).entities.some((entity) => entity._ === "messageEntitySpoiler");
		spoilersCache.set(richMessage, hasSpoilers);
	}
	return hasSpoilers;
}
/**
* Whether a rich message is as wide as a message gets, the way tdesktop lays one out: text takes the
* width of its longest line, but a table (stretched over the width), a row of buttons, details, a
* pullquote and media take all of it, and a quote or a list as much as what is inside. So a message
* with one of them keeps its width whatever its text is - a bot editing it in place does not resize it.
*/
function isRichMessageFullWidth(blocks) {
	return blocks.some(isFullWidthBlock);
}
function isFullWidthBlock(block) {
	switch (block._) {
		case "pageBlockTitle":
		case "pageBlockSubtitle":
		case "pageBlockAuthorDate":
		case "pageBlockHeader":
		case "pageBlockSubheader":
		case "pageBlockParagraph":
		case "pageBlockPreformatted":
		case "pageBlockFooter":
		case "pageBlockKicker":
		case "pageBlockHeading1":
		case "pageBlockHeading2":
		case "pageBlockHeading3":
		case "pageBlockHeading4":
		case "pageBlockHeading5":
		case "pageBlockHeading6":
		case "pageBlockThinking":
		case "pageBlockMath":
		case "pageBlockBlockquote":
		case "pageBlockDivider":
		case "pageBlockAnchor": return false;
		case "pageBlockBlockquoteBlocks": return isRichMessageFullWidth(block.blocks);
		case "pageBlockList": return block.items.some((item) => item._ === "pageListItemBlocks" && isRichMessageFullWidth(item.blocks));
		case "pageBlockOrderedList": return block.items.some((item) => item._ === "pageListOrderedItemBlocks" && isRichMessageFullWidth(item.blocks));
		default: return true;
	}
}
function getRichMessageBubbleEdges(blocks) {
	const edges = {
		firstMedia: -1,
		firstText: -1,
		lastMedia: -1,
		lastParagraph: -1
	};
	let first = -1, last = -1;
	blocks.forEach((block, index) => {
		if (block._ === "pageBlockAnchor") return;
		if (first === -1) first = index;
		last = index;
	});
	if (first === -1) return edges;
	const firstBlock = blocks[first], lastBlock = blocks[last];
	if (isEdgeMediaBlock(firstBlock)) edges.firstMedia = first;
	else if (firstBlock._ === "pageBlockParagraph" || isHeadingBlock(firstBlock)) edges.firstText = first;
	if (isEdgeMediaBlock(lastBlock)) {
		if (isPageCaptionEmpty(unwrapPageBlockCover(lastBlock).caption)) edges.lastMedia = last;
	} else if (lastBlock._ === "pageBlockParagraph") {
		const text = getRichTextFlatText(lastBlock.text);
		if (text.trim()) {
			edges.lastParagraph = last;
			edges.lastParagraphText = text;
		}
	}
	return edges;
}
/**
* What a cover presents: a cover only presents its block, and a cover's cover the same one (tdesktop appends
* the cover's block in its place). Any other block is itself
*/
function unwrapPageBlockCover(block) {
	while (block?._ === "pageBlockCover") block = block.cover;
	return block;
}
function isRichTextEmpty(text) {
	return text._ === "textEmpty" || text._ === "textPlain" && !text.text.trim();
}
function isPageCaptionEmpty(caption) {
	return !caption || isRichTextEmpty(caption.text) && isRichTextEmpty(caption.credit);
}
function isEdgeMediaBlock(block) {
	block = unwrapPageBlockCover(block);
	switch (block?._) {
		case "pageBlockPhoto":
		case "pageBlockVideo":
		case "pageBlockSlideshow":
		case "pageBlockCollage": return true;
		default: return false;
	}
}
function isHeadingBlock(block) {
	switch (block._) {
		case "pageBlockTitle":
		case "pageBlockSubtitle":
		case "pageBlockHeader":
		case "pageBlockSubheader":
		case "pageBlockHeading1":
		case "pageBlockHeading2":
		case "pageBlockHeading3":
		case "pageBlockHeading4":
		case "pageBlockHeading5":
		case "pageBlockHeading6": return true;
		default: return false;
	}
}
function isDocumentRowBlock(block) {
	return block?._ === "pageBlockAudio" || block?._ === "pageBlockDocument";
}
function getDocumentRowBlockId(block) {
	return block._ === "pageBlockAudio" ? block.audio_id : block.document_id;
}
/** The number an ordered list shows for its item, the one it carries or the one its place gives. */
var MAX_LIST_MARKER_LENGTH = 16;
/** `value`: the number counted for the item (`orderedListValues`), when its place alone does not give it */
function getOrderedListItemNumber(block, index, value) {
	const start = block.start ?? (block.pFlags.reversed ? block.items.length : 1);
	const num = block.items[index].num;
	if (num?.length > MAX_LIST_MARKER_LENGTH) return limitSymbols(num, MAX_LIST_MARKER_LENGTH, MAX_LIST_MARKER_LENGTH);
	return num || `${value ?? (block.pFlags.reversed ? start - index : start + index)}`;
}
function emptySummary() {
	return {
		_: "textWithEntities",
		text: "",
		entities: []
	};
}
function appendBlocks(summary, blocks, prefix = "", includeFallbacks = true) {
	for (const block of blocks) appendBlock(summary, block, prefix, includeFallbacks);
}
function appendBlock(summary, block, prefix = "", includeFallbacks = true) {
	switch (block._) {
		case "pageBlockTitle":
		case "pageBlockSubtitle":
		case "pageBlockHeader":
		case "pageBlockSubheader":
		case "pageBlockParagraph":
		case "pageBlockPreformatted":
		case "pageBlockFooter":
		case "pageBlockKicker":
		case "pageBlockHeading1":
		case "pageBlockHeading2":
		case "pageBlockHeading3":
		case "pageBlockHeading4":
		case "pageBlockHeading5":
		case "pageBlockHeading6":
		case "pageBlockThinking":
			appendRichTextLine(summary, block.text, prefix);
			break;
		case "pageBlockMath":
			appendPlainLine(summary, block.source, prefix);
			break;
		case "pageBlockBlockquote":
		case "pageBlockPullquote":
			appendRichTextLine(summary, block.text, prefix);
			appendRichTextLine(summary, block.caption, prefix);
			break;
		case "pageBlockBlockquoteBlocks":
			appendBlocks(summary, block.blocks, prefix, includeFallbacks);
			appendRichTextLine(summary, block.caption, prefix);
			break;
		case "pageBlockList":
			block.items.forEach((item) => {
				const itemPrefix = prefix + "- ";
				if (item._ === "pageListItemText") appendRichTextLine(summary, item.text, itemPrefix);
				else appendBlocks(summary, item.blocks, itemPrefix, includeFallbacks);
			});
			break;
		case "pageBlockOrderedList":
			block.items.forEach((item, index) => {
				const itemPrefix = `${prefix}${getOrderedListItemNumber(block, index)}. `;
				if (item._ === "pageListOrderedItemText") appendRichTextLine(summary, item.text, itemPrefix);
				else appendBlocks(summary, item.blocks, itemPrefix, includeFallbacks);
			});
			break;
		case "pageBlockTable":
			appendRichTextLine(summary, block.title, prefix);
			for (const row of block.rows) appendTextWithEntitiesLine(summary, joinRichTexts(row.cells.map((cell) => cell.text || emptyRichText), "	"), prefix);
			break;
		case "pageBlockDetails":
			appendRichTextLine(summary, block.title, prefix);
			appendBlocks(summary, block.blocks, prefix, includeFallbacks);
			break;
		case "pageBlockPhoto":
			appendCaptionOrFallback(summary, block.caption, "Photo", prefix, includeFallbacks);
			break;
		case "pageBlockVideo":
			appendCaptionOrFallback(summary, block.caption, "Video", prefix, includeFallbacks);
			break;
		case "pageBlockAudio":
			appendCaptionOrFallback(summary, block.caption, "Audio", prefix, includeFallbacks);
			break;
		case "pageBlockDocument":
			appendCaptionOrFallback(summary, block.caption, "File", prefix, includeFallbacks);
			break;
		case "pageBlockMap":
			appendCaptionOrFallback(summary, block.caption, "Location", prefix, includeFallbacks);
			break;
		case "inputPageBlockMap":
			appendCaptionOrFallback(summary, block.caption, "Location", prefix, includeFallbacks);
			break;
		case "pageBlockEmbed":
			appendCaptionOrFallback(summary, block.caption, "Embed", prefix, includeFallbacks);
			break;
		case "pageBlockEmbedPost": {
			const before = summary.text;
			appendCaptionOrFallback(summary, block.caption, "Embed", prefix, includeFallbacks);
			if (!includeFallbacks || summary.text === before) {
				if (!includeFallbacks) appendPlainLine(summary, block.author, prefix);
				appendBlocks(summary, block.blocks, prefix, includeFallbacks);
			}
			break;
		}
		case "pageBlockCollage":
		case "pageBlockSlideshow": {
			const before = summary.text;
			appendCaptionOrFallback(summary, block.caption, "Media", prefix, includeFallbacks);
			if (!includeFallbacks || summary.text === before) appendBlocks(summary, block.items, prefix, includeFallbacks);
			break;
		}
		case "pageBlockCover":
			appendBlock(summary, block.cover, prefix, includeFallbacks);
			break;
		case "pageBlockRelatedArticles":
			appendRichTextLine(summary, block.title, prefix);
			for (const article of block.articles) {
				appendPlainLine(summary, article.title, prefix);
				appendPlainLine(summary, article.description, prefix);
				if (!includeFallbacks) appendPlainLine(summary, article.author, prefix);
			}
			break;
		case "pageBlockUnsupported":
			if (includeFallbacks) appendPlainLine(summary, "Unsupported block", prefix);
			break;
		case "pageBlockDivider":
		case "pageBlockAnchor": break;
		case "pageBlockChannel":
			if (!includeFallbacks && "title" in block.channel) appendPlainLine(summary, block.channel.title, prefix);
			break;
		case "pageBlockAuthorDate":
			appendRichTextLine(summary, block.author, prefix);
			break;
		case "pageBlockButtonRow":
			appendTextWithEntitiesLine(summary, joinRichTexts(block.buttons.map((button) => button.text), " "), prefix);
			break;
		default: if (includeFallbacks) appendPlainLine(summary, `Unsupported block: ${block._}`, prefix);
	}
}
function appendCaptionOrFallback(summary, caption, fallback, prefix = "", includeFallback = true) {
	const before = summary.text;
	appendRichTextLine(summary, caption?.text || emptyRichText, prefix);
	if (!includeFallback) appendRichTextLine(summary, caption?.credit || emptyRichText, prefix);
	if (includeFallback && summary.text === before) appendPlainLine(summary, fallback, prefix);
}
function appendRichTextLine(summary, richText, prefix = "") {
	appendTextWithEntitiesLine(summary, wrapSummaryRichText(richText), prefix);
}
function wrapSummaryRichText(richText) {
	const textWithEntities = wrapTelegramRichText(richText);
	textWithEntities.entities = textWithEntities.entities?.filter((entity) => entity._ !== "messageEntityRichButton");
	const { text } = textWithEntities;
	if (!text.includes("")) return textWithEntities;
	let out = "";
	let last = 0;
	const shifts = [];
	for (const match of text.matchAll(MATH_MARKER_RE)) {
		const source = decodeInlineMath(match[1]);
		out += text.slice(last, match.index) + source;
		const markerEnd = match.index + match[0].length;
		shifts.push({
			from: markerEnd,
			delta: source.length - match[0].length
		});
		last = markerEnd;
	}
	out += text.slice(last);
	let totalDelta = 0;
	const shiftFroms = shifts.map((shift) => shift.from);
	const deltasUpTo = shifts.map((shift) => totalDelta += shift.delta);
	const shiftOffset = (offset) => {
		const count = lowerBound(0, shiftFroms.length - 1, offset + 1, (index) => shiftFroms[index]);
		return offset + (count ? deltasUpTo[count - 1] : 0);
	};
	return {
		_: "textWithEntities",
		text: out,
		entities: (textWithEntities.entities || []).map((entity) => {
			const offset = shiftOffset(entity.offset);
			const end = shiftOffset(entity.offset + entity.length);
			return {
				...entity,
				offset,
				length: Math.max(0, end - offset)
			};
		})
	};
}
function appendTextWithEntitiesLine(summary, textWithEntities, prefix = "") {
	if (!textWithEntities.text.trim()) return;
	const lineStart = summary.text ? summary.text.length + 1 : 0;
	if (summary.text) summary.text += "\n";
	summary.text += prefix + textWithEntities.text;
	appendEntities(summary, textWithEntities.entities, lineStart + prefix.length);
}
function appendPlainLine(summary, text, prefix = "") {
	if (!text?.trim()) return;
	appendTextWithEntitiesLine(summary, {
		_: "textWithEntities",
		text,
		entities: []
	}, prefix);
}
function appendEntities(summary, entities, offset) {
	for (const entity of entities || []) summary.entities.push({
		...entity,
		offset: entity.offset + offset
	});
}
function joinRichTexts(texts, separator) {
	return joinTexts(texts.map(wrapSummaryRichText), separator);
}
function joinTexts(texts, separator) {
	const joined = emptySummary();
	for (const [index, textWithEntities] of texts.entries()) {
		const offset = joined.text.length + (index ? separator.length : 0);
		if (index) joined.text += separator;
		joined.text += textWithEntities.text;
		appendEntities(joined, textWithEntities.entities, offset);
	}
	return joined;
}
var PLAIN_MESSAGE_DIVIDER = "——————————";
var PLAIN_MESSAGE_TABLE_CELL_SEPARATOR = "  |  ";
/**
* A rich message as a plain one, for a sender who may not post rich text. What a plain message
* carries stays — bold, links, code, a quote with its author; a heading turns bold and a formula
* code, a list and a table are written out as text, and a picture leaves its caption. Android's
* conversion (RichMessageConvert) does the same. Entities only a rich message carries (a highlight,
* an index) are left for the receiving field to drop.
*/
function richMessageToPlainMessage(richMessage) {
	const plain = joinTexts(plainMessageBlocks(richMessage.blocks || []), "\n");
	sortEntities(plain.entities);
	return plain;
}
function plainMessageBlocks(blocks, depth = 0) {
	return blocks.map((block) => plainMessageBlock(block, depth)).filter(Boolean);
}
function plainMessageBlock(block, depth) {
	switch (block._) {
		case "pageBlockParagraph":
		case "pageBlockFooter":
		case "pageBlockKicker":
		case "pageBlockThinking": return wrapSummaryRichText(block.text);
		case "pageBlockTitle":
		case "pageBlockSubtitle":
		case "pageBlockHeader":
		case "pageBlockSubheader":
		case "pageBlockHeading1":
		case "pageBlockHeading2":
		case "pageBlockHeading3":
		case "pageBlockHeading4":
		case "pageBlockHeading5":
		case "pageBlockHeading6": return withWholeEntity(wrapSummaryRichText(block.text), (length) => ({
			_: "messageEntityBold",
			offset: 0,
			length
		}));
		case "pageBlockPreformatted": return withWholeEntity(wrapSummaryRichText(block.text), (length) => ({
			_: "messageEntityPre",
			offset: 0,
			length,
			language: block.language || ""
		}));
		case "pageBlockMath": return withWholeEntity(plainText(block.source), (length) => ({
			_: "messageEntityCode",
			offset: 0,
			length
		}));
		case "pageBlockDivider": return plainText(PLAIN_MESSAGE_DIVIDER);
		case "pageBlockBlockquote":
		case "pageBlockPullquote": return quotedPlainMessage(wrapSummaryRichText(block.text), block.caption);
		case "pageBlockBlockquoteBlocks": return quotedPlainMessage(joinTexts(plainMessageBlocks(block.blocks, depth), "\n"), block.caption);
		case "pageBlockDetails": return joinTexts(nonEmpty([wrapSummaryRichText(block.title), ...plainMessageBlocks(block.blocks, depth)]), "\n");
		case "pageBlockList":
		case "pageBlockOrderedList": {
			const values = block._ === "pageBlockOrderedList" ? [...orderedListValues(block.items.length, block.start, !!block.pFlags.reversed, (index) => block.items[index].value)] : [];
			return joinTexts(block.items.map((item, index) => {
				const content = "text" in item ? wrapSummaryRichText(item.text) : joinTexts(plainMessageBlocks(item.blocks, depth + 1), "\n");
				return prefixedText("  ".repeat(depth) + plainMessageListMarker(block, index, values[index]), content);
			}), "\n");
		}
		case "pageBlockTable": return joinTexts(nonEmpty([wrapSummaryRichText(block.title), ...block.rows.map((row) => joinRichTexts(row.cells.map((cell) => cell.text || emptyRichText), PLAIN_MESSAGE_TABLE_CELL_SEPARATOR))]), "\n");
		case "pageBlockAuthorDate": return wrapSummaryRichText(block.author);
		case "pageBlockCover": return plainMessageBlock(block.cover, depth);
		case "pageBlockPhoto":
		case "pageBlockVideo":
		case "pageBlockAudio":
		case "pageBlockDocument":
		case "pageBlockMap":
		case "inputPageBlockMap":
		case "pageBlockEmbed":
		case "pageBlockEmbedPost":
		case "pageBlockCollage":
		case "pageBlockSlideshow": {
			const caption = joinTexts(nonEmpty([block.caption?.text, block.caption?.credit].map((text) => wrapSummaryRichText(text || emptyRichText))), "\n");
			return caption.text ? caption : void 0;
		}
	}
}
function plainMessageListMarker(block, index, value) {
	const item = block.items[index];
	const { checkbox, checked } = item.pFlags;
	if (block._ === "pageBlockList") return formatListItemMarker({
		ordered: false,
		checkbox,
		checked
	});
	const number = getOrderedListItemNumber(block, index, value);
	const numberValue = Number(number);
	return formatListItemMarker({
		ordered: true,
		...Number.isInteger(numberValue) ? {
			value: numberValue,
			type: item.type || block.type
		} : { num: number },
		checkbox,
		checked
	});
}
function quotedPlainMessage(body, author) {
	const authorText = wrapSummaryRichText(author || emptyRichText);
	const quote = joinTexts(nonEmpty([body, authorText.text ? prefixedText("— ", authorText) : void 0]), "\n");
	if (!quote.text) return;
	return withWholeEntity(quote, (length) => ({
		_: "messageEntityBlockquote",
		offset: 0,
		length,
		pFlags: {}
	}));
}
function withWholeEntity(textWithEntities, entity) {
	if (!textWithEntities.text) return;
	const whole = entity(textWithEntities.text.length);
	return {
		_: "textWithEntities",
		text: textWithEntities.text,
		entities: [whole, ...textWithEntities.entities.filter((inner) => inner._ !== whole._)]
	};
}
function prefixedText(prefix, textWithEntities) {
	return joinTexts([plainText(prefix), textWithEntities], "");
}
function plainText(text) {
	return {
		_: "textWithEntities",
		text: text || "",
		entities: []
	};
}
function nonEmpty(texts) {
	return texts.filter((text) => text?.text);
}
//#endregion
//#region src/lib/appManagers/utils/richMessage/getRichMessageMedia.ts
/**
* The photo or video a rich message stands for where one picture shows the whole message (a reply,
* the shared media), as Android picks it (`MessageObject.findVideo`, `findPhoto`): the first video, or
* the first photo when there is none, among the top blocks and the items of the first collage or
* slideshow.
*/
function getRichMessageMedia(richMessage) {
	const video = findRichMedia(richMessage?.blocks, "pageBlockVideo");
	if (video) {
		const document = findRichMessageDocument(richMessage, video.video_id);
		return document && {
			_: "messageMediaDocument",
			pFlags: { spoiler: video.pFlags.spoiler },
			document
		};
	}
	const photo = findRichMedia(richMessage?.blocks, "pageBlockPhoto");
	const found = photo && richMessage.photos?.find((item) => item.id === photo.photo_id);
	return found && {
		_: "messageMediaPhoto",
		pFlags: { spoiler: photo.pFlags.spoiler },
		photo: found
	};
}
function findRichMedia(blocks, type) {
	for (const block of blocks || []) if (block._ === type) return block;
	else if (block._ === "pageBlockCollage" || block._ === "pageBlockSlideshow") return findRichMedia(block.items, type);
}
function findRichMessageDocument(richMessage, id) {
	return richMessage.documents?.find((document) => document.id === id);
}
/** A message's media, or for a rich message the photo or video it stands for */
function getMessageMediaOrRich(message) {
	return message?.media || getRichMessageMedia(message?.rich_message);
}
/**
* A rich message as a message holding `media` (by default the photo or video it stands for), for what reads only a
* message's own media: the shared media's context menu, the playback controller. Any other message as it is
*/
function getMessageWithRichMedia(message, media) {
	const { rich_message: richMessage, media: ownMedia } = message ?? {};
	if (!richMessage || ownMedia) return message;
	media ?? (media = getRichMessageMedia(richMessage));
	return media ? {
		...message,
		media
	} : message;
}
//#endregion
//#region src/lib/appManagers/utils/payments/formatStarsAmount.ts
function formatStarsAmount(amount, ton) {
	if (isObject(amount)) {
		if (amount._ === "starsAmount") return +amount.amount + +(amount.nanos || 0) / 1e9;
		else return +amount.amount / 1e9;
	}
	const integerString = typeof amount === "string" && /^-?\d+$/.test(amount);
	const whole = integerString ? amount : Math.trunc(+amount);
	const nanos = integerString ? 0 : Math.round((+amount - +whole) * 1e9);
	if (ton) return {
		_: "starsTonAmount",
		amount: (0, import_BigInteger.default)(String(whole)).multiply(1e9).add(nanos).toString()
	};
	return {
		_: "starsAmount",
		amount: whole,
		nanos
	};
}
/** Keep int64 amounts and all nine fractional digits intact in transaction receipts. */
function starsAmountNanounits(amount) {
	const value = (0, import_BigInteger.default)(String(amount.amount));
	return amount._ === "starsAmount" ? value.multiply(1e9).add(amount.nanos || 0) : value;
}
function formatStarsAmountExact(amount) {
	const value = starsAmountNanounits(amount);
	const { quotient, remainder } = value.abs().divmod(1e9);
	const fraction = remainder.toString().padStart(9, "0").replace(/0+$/, "");
	return (value.isNegative() ? "-" : "") + quotient.toString() + (fraction ? "." + fraction : "");
}
//#endregion
//#region src/lib/appManagers/utils/stories/canPollPeerStories.ts
/** how long what the server said a peer has in stories stands before it is asked again, as in the other apps
* (iOS `AccountViewTracker.refreshStoryStatsForPeerIds`, Android `UserListPoller`) */
var PEER_STORIES_POLL_INTERVAL = 36e5;
/**
* Whether what a peer on screen has in stories is worth asking the server again (`stories.getPeerMaxIDs`):
* the feed brings the stories of contacts and of the chats one is in, so it is everyone else who can have
* them - chosen as Android's `UserListPoller` and Web A's `usePeerStoriesPolling` choose them: a user who is
* no contact, no bot and not oneself, with a status to show, and a channel or supergroup one is not in.
* A `min` peer is left out: it may not be addressable on its own, and one bad peer fails the whole request.
*/
function canPollPeerStories(peer) {
	if (peer?._ === "user") {
		const { pFlags, status } = peer;
		return !pFlags.self && !pFlags.contact && !pFlags.bot && !pFlags.support && !pFlags.deleted && !pFlags.min && !!status && status._ !== "userStatusEmpty";
	}
	return peer?._ === "channel" && !!peer.pFlags.left && !peer.pFlags.min && !peer.pFlags.monoforum;
}
//#endregion
export { formatListItemMarker as A, mergeEntities as B, isRichTextEmpty as C, unwrapPageBlockCover as D, richMessageToPlainMessage as E, MATH_MARKER_RE as F, formatNanoton as G, wrapPlainText as H, decodeInlineMath as I, getPeerPhoto as J, nanotonToJsNumber as K, encodeInlineMath as L, isDecimalOrderedListType as M, orderedListValues as N, wrapSummaryRichText as O, wrapTelegramRichText as P, wrapTextWithEntities as R, isRichMessagePart as S, richMessageToPage as T, getPeerId as U, isOwnMessage as V, GRAM_CURRENCY_SYMBOL as W, flatten as X, isPeerRestricted as Y, getRichTextFlatText as _, starsAmountNanounits as a, isPageCaptionEmpty as b, getMessageWithRichMedia as c, flattenRichMessageSummary as d, flattenRichMessageSummaryText as f, getRichMessageBubbleEdges as g, getOrderedListItemNumber as h, formatStarsAmountExact as i, getOrderedListTypePresentation as j, canonicalOrderedListType as k, getRichMessageMedia as l, getInputReplyQuote as m, canPollPeerStories as n, findRichMessageDocument as o, getDocumentRowBlockId as p, parseNanotonFromDecimal as q, formatStarsAmount as r, getMessageMediaOrRich as s, PEER_STORIES_POLL_INTERVAL as t, flattenRichMessageContent as u, hasRichMessageSpoilers as v, joinRichTexts as w, isRichMessageFullWidth as x, isDocumentRowBlock as y, wrapMessageEntities as z };
