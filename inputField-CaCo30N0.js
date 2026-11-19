//# allFunctionsCalledOnLoad
import { h as Modes, o as IS_FIREFOX, p as MOUNT_CLASS_TO } from "./userAgent-ByGXcznk.js";
import { n as rootScope } from "./rootScope-CZS0lmz8.js";
import { n as logger } from "./logger-7zf0rNYS.js";
import { a as i18n, m as setInnerHTML, p as setDirection, r as _i18n } from "./langPack-BmdJGr44.js";
import { S as isWebPageUrl, w as normalizeUrlProtocol, y as SINGLE_ENTITIES } from "./commonStateStorage-CW-poHCa.js";
import { w as createUniqueId } from "./solid-9Vxm0VIz.js";
import { n as getAppWindow, t as bindActiveWindowListener } from "./appWindow-bo-KtJhy.js";
import { t as cancelEvent } from "./cancelEvent-Cw8vYZHp.js";
import { t as clamp } from "./clamp-9UaNhw6N.js";
import { D as BOM_REG_EXP, a as ENTITY_ELEMENT_MAP, c as isCustomFillerNeededBySiblingNode, o as createCustomFiller, s as insertCustomFillers, t as CustomEmojiRendererElement, u as wrapRichText } from "./renderer-L80wjxct.js";
import { t as findUpAsChild } from "./findUpAsChild-CPjgnY00.js";
import { t as ListenerSetter } from "./listenerSetter-BER6qAXn.js";
import { n as simulateEvent } from "./dispatchEvent-CZVxCUd_.js";
import { n as getChatInputEditor, t as placeCaretAtEnd } from "./placeCaretAtEnd-BtAUyd5U.js";
import { t as labelControl } from "./labelControl-V4jClefJ.js";
import { t as parseEntities } from "./parseEntities-C5qsCJ5K.js";
import { t as replaceContent } from "./replaceContent-Bi6ru3li.js";
import { t as documentFragmentToHTML } from "./documentFragmentToHTML-CMxvOHG7.js";
import { t as findUpTag } from "./findUpTag-CkbKEw4y.js";
import { t as combineSameEntities } from "./combineSameEntities-BecixTXD.js";
import { r as findConflictingEntity, t as sortEntities } from "./sortEntities-9u5MR7Xq.js";
import { t as whichChild } from "./whichChild-CwhWxnKO.js";
//#region src/helpers/dom/findUpAttribute.ts
function findUpAttribute(el, attribute) {
	return el.closest(`[${attribute}]`);
}
//#endregion
//#region src/helpers/dom/getCaretPosNew.ts
function getCaretPosNew(input, anchor) {
	const selection = input.ownerDocument.defaultView.getSelection();
	const node = selection[anchor ? "anchorNode" : "focusNode"];
	const offset = selection[anchor ? "anchorOffset" : "focusOffset"];
	if (!findUpAsChild(node, input) && node !== input) return { selection };
	return {
		...getCaretPosF(input, node, offset),
		selection
	};
}
function getCaretPosF(input, node, offset) {
	if (node === input) {
		const childNodes = input.childNodes;
		const childNodesLength = childNodes.length;
		if (childNodesLength && offset >= childNodesLength) {
			node = childNodes[childNodesLength - 1];
			offset = (node.textContent || node.alt || "").length;
		} else {
			node = childNodes[offset];
			offset = 0;
		}
	}
	return {
		node,
		offset
	};
}
//#endregion
//#region src/helpers/dom/getRichElementValue.ts
function join(...arr) {
	return arr.join(", ");
}
var markdownTags = {
	bold: {
		match: join("[style*=\"bold\"]", "[style*=\"font-weight: 700\"]", "[style*=\"font-weight: 600\"]", "[style*=\"font-weight:700\"]", "[style*=\"font-weight:600\"]", "b", "strong", "h1", "h2", "h3", "h4", "h5", "h6"),
		entityName: "messageEntityBold"
	},
	underline: {
		match: join("[style*=\"underline\"]", "u", "ins"),
		entityName: "messageEntityUnderline"
	},
	italic: {
		match: join("[style*=\"italic\"]", "i", "em"),
		entityName: "messageEntityItalic"
	},
	monospace: {
		match: join("[style*=\"monospace\"]", "[face*=\"monospace\"]", "pre"),
		entityName: "messageEntityCode"
	},
	strikethrough: {
		match: join("[style*=\"line-through\"]", "[style*=\"strikethrough\"]", "strike", "del", "s"),
		entityName: "messageEntityStrike"
	},
	link: {
		match: "A:not(.follow)",
		entityName: "messageEntityTextUrl"
	},
	mentionName: {
		match: "A.follow",
		entityName: "messageEntityMentionName"
	},
	spoiler: {
		match: "[style*=\"spoiler\"]",
		entityName: "messageEntitySpoiler"
	},
	quote: {
		match: join("[style*=\"quote\"]", ".quote"),
		entityName: "messageEntityBlockquote"
	},
	date: {
		match: join("[style*=\"date\"]", ".formatted-date"),
		entityName: "messageEntityFormattedDate"
	},
	highlight: {
		match: join("[style*=\"highlight\"]", "[data-highlight]", "mark"),
		entityName: "messageEntityHighlight"
	},
	subscript: {
		match: join("[style*=\"subscript\"]", "sub"),
		entityName: "messageEntitySubscript"
	},
	superscript: {
		match: join("[style*=\"superscript\"]", "sup"),
		entityName: "messageEntitySuperscript"
	}
};
var tabulationMatch = join("[style*=\"table-cell\"]", "th", "td");
var BLOCK_TAGS = /* @__PURE__ */ new Set([
	"DIV",
	"P",
	"BR",
	"LI",
	"SECTION",
	"H6",
	"H5",
	"H4",
	"H3",
	"H2",
	"H1",
	"TR",
	"OL",
	"UL",
	"BLOCKQUOTE"
]);
function getListItemPrefix(element) {
	if (element.tagName !== "LI") return "";
	const list = element.parentElement;
	if (list?.tagName !== "UL" && list?.tagName !== "OL") return "";
	let depth = 0;
	for (let parent = list.parentElement; parent; parent = parent.parentElement) if (parent.tagName === "LI") ++depth;
	if (list.tagName === "UL") return `${"  ".repeat(depth)}- `;
	const startAttribute = Number(list.getAttribute("start"));
	const start = list.hasAttribute("start") && Number.isFinite(startAttribute) ? startAttribute : 1;
	const index = Array.from(list.children).filter((child) => child.tagName === "LI").indexOf(element);
	const valueAttribute = Number(element.getAttribute("value"));
	const value = element.hasAttribute("value") && Number.isFinite(valueAttribute) ? valueAttribute : start + index;
	return `${"  ".repeat(depth)}${value}. `;
}
var FORMATTED_DATE_FLAGS = [
	"relative",
	"short_time",
	"long_time",
	"short_date",
	"long_date",
	"day_of_week"
];
function getFormattedDateEntityByElement(element, offset, length) {
	const dateStr = element.dataset.date;
	const date = dateStr ? +dateStr : void 0;
	const dateFlags = new Set((element.dataset.dateFlags || "").split(","));
	return {
		_: "messageEntityFormattedDate",
		pFlags: Object.fromEntries(FORMATTED_DATE_FLAGS.filter((flag) => dateFlags.has(flag)).map((flag) => [flag, true])),
		date: 0,
		...ENTITY_ELEMENT_MAP.get(element) || {},
		...date ? { date } : {},
		offset,
		length
	};
}
function pushEntity(entities, entity) {
	entities.push(entity);
	return entity;
}
function checkElementForEntity(element, value, entities, offset, line, currentEntities) {
	for (const type in markdownTags) {
		const tag = markdownTags[type];
		const closest = element.closest(tag.match + ", [contenteditable=\"true\"]");
		if (closest?.getAttribute("contenteditable") !== null) continue;
		let codeElement;
		if (tag.entityName === "messageEntityCode" && (codeElement = element.closest("[data-language]"))) {
			var _tag$entityName;
			(currentEntities[_tag$entityName = tag.entityName] || (currentEntities[_tag$entityName] = pushEntity(entities, {
				_: "messageEntityPre",
				language: codeElement.dataset.language || "",
				offset: offset.offset,
				length: 0
			}))).length += value.length;
		} else if (tag.entityName === "messageEntityTextUrl") {
			if (!value) continue;
			let entity = currentEntities[tag.entityName];
			if (!entity) {
				let good = false;
				try {
					const url1 = new URL(closest.href);
					const url1String = url1.toString();
					if (!isWebPageUrl(url1)) throw 1;
					const url2Before = normalizeUrlProtocol(value);
					let url2;
					let url2String;
					try {
						url2 = new URL(url2Before);
						url2String = url2.toString();
					} catch (err) {}
					good = !(url1String === url2String);
				} catch (err) {}
				good && (entity = currentEntities[tag.entityName] = pushEntity(entities, {
					_: tag.entityName,
					url: closest.href,
					offset: offset.offset,
					length: 0
				}));
			}
			if (entity) entity.length += value.length;
		} else if (tag.entityName === "messageEntityMentionName") {
			var _tag$entityName2;
			const follow = closest.dataset.follow;
			if (!/^\d+$/.test(follow) || !+follow) continue;
			(currentEntities[_tag$entityName2 = tag.entityName] || (currentEntities[_tag$entityName2] = pushEntity(entities, {
				_: tag.entityName,
				offset: offset.offset,
				length: 0,
				user_id: follow.toUserId()
			}))).length += value.length;
		} else if (tag.entityName === "messageEntityBlockquote") {
			var _tag$entityName3;
			(currentEntities[_tag$entityName3 = tag.entityName] || (currentEntities[_tag$entityName3] = pushEntity(entities, {
				_: tag.entityName,
				pFlags: { collapsed: !!closest.dataset.collapsed || void 0 },
				offset: offset.offset,
				length: 0
			}))).length += value.length;
		} else if (tag.entityName === "messageEntityFormattedDate") {
			if (!value) continue;
			const entity = getFormattedDateEntityByElement(closest, offset.offset, value.length);
			const { originalText, fakeText } = closest.dataset;
			if (originalText) {
				entity.length = originalText.length + value.length - fakeText.length;
				offset.offset += originalText.length - fakeText.length;
				line[line.length - 1] = line[line.length - 1].replace(fakeText, originalText);
			}
			entities.push(entity);
		} else if (!(tag.entityName === "messageEntityUnderline" && closest.classList.contains("anchor-url") && closest === element)) {
			var _tag$entityName4;
			(currentEntities[_tag$entityName4 = tag.entityName] || (currentEntities[_tag$entityName4] = pushEntity(entities, {
				_: tag.entityName,
				offset: offset.offset,
				length: 0
			}))).length += value.length;
		}
	}
}
function isLineEmpty(line) {
	const { length } = line;
	if (!length) return true;
	if (line[length - 1] === "" && length === 1) return true;
	return false;
}
function getRichElementValue(node, lines, line, selNode, selOffset, entities, offset = { offset: 0 }, currentEntities = {}) {
	if (node.nodeType === node.TEXT_NODE) {
		let nodeValue = node.nodeValue;
		nodeValue = nodeValue.replace(BOM_REG_EXP, "");
		if (nodeValue) {
			if (selNode === node) line.push(nodeValue.substr(0, selOffset) + "" + nodeValue.substr(selOffset));
			else line.push(nodeValue);
		} else if (selNode === node) line.push("");
		if (entities && nodeValue.length && node.parentElement) checkElementForEntity(node.parentElement, nodeValue, entities, offset, line, currentEntities);
		offset.offset += nodeValue.length;
		if (nodeValue.length) offset.contentEnd = offset.offset;
		return;
	}
	if (node.nodeType !== node.ELEMENT_NODE) return;
	const pushLine = () => {
		lines.push(line.join(""));
		line.length = 0;
		++offset.offset;
	};
	const isSelected = selNode === node;
	const isQuote = node.matches(".quote");
	const isBlock = BLOCK_TAGS.has(node.tagName) || isQuote;
	if (isBlock && (line.length && line[line.length - 1].slice(-1) !== "\n" || node.tagName === "BR")) pushLine();
	else {
		const alt = node.dataset.stickerEmoji || node.alt;
		const stickerEmoji = node.dataset.stickerEmoji;
		if (alt && entities) checkElementForEntity(node, alt, entities, offset, line, currentEntities);
		if (stickerEmoji && entities) entities.push({
			_: "messageEntityCustomEmoji",
			document_id: node.dataset.docId,
			offset: offset.offset,
			length: alt.length
		});
		if (alt) {
			line.push(alt);
			offset.offset += alt.length;
			offset.contentEnd = offset.offset;
		}
	}
	const listItemPrefix = getListItemPrefix(node);
	if (listItemPrefix) {
		if (entities) checkElementForEntity(node, listItemPrefix, entities, offset, line, currentEntities);
		line.push(listItemPrefix);
		offset.offset += listItemPrefix.length;
		offset.contentEnd = offset.offset;
	}
	if (isSelected && !selOffset) line.push("");
	const isTableCell = node.matches(tabulationMatch);
	const wasEntitiesLength = entities?.length;
	let wasNodeEmpty = true;
	if (node.getAttribute("contenteditable") === null && entities) checkElementForEntity(node, "", entities, offset, line, currentEntities);
	let curChild = node.firstChild;
	while (curChild) {
		getRichElementValue(curChild, lines, line, selNode, selOffset, entities, offset, curChild.nodeType === curChild.TEXT_NODE ? currentEntities : { ...currentEntities });
		curChild = curChild.nextSibling;
		if (!isLineEmpty(line)) wasNodeEmpty = false;
	}
	if (isQuote) {
		const lastValue = line[line.length - 1];
		if (lastValue?.endsWith("\n")) {
			line[line.length - 1] = lastValue.slice(0, -1);
			offset.offset -= 1;
		}
		const quoteEntity = currentEntities.messageEntityBlockquote;
		if (quoteEntity) {
			const contentEnd = Math.min(offset.contentEnd ?? offset.offset, offset.offset);
			quoteEntity.length = Math.max(0, contentEnd - quoteEntity.offset);
		}
	}
	if (wasNodeEmpty && node.textContent?.replace(/[\r\n]/g, "")) wasNodeEmpty = false;
	if (isSelected && selOffset) line.push("");
	if (isTableCell && node.nextSibling && !isLineEmpty(line)) {
		line.push(" ");
		++offset.offset;
		if (wasEntitiesLength !== void 0) for (let i = wasEntitiesLength, length = entities.length; i < length; ++i) ++entities[i].length;
	}
	const lastChild = node.lastChild;
	const childClosedLine = lastChild?.nodeType === node.ELEMENT_NODE && lastChild.tagName !== "BR" && (BLOCK_TAGS.has(lastChild.tagName) || lastChild.matches(".quote"));
	const isFinishedBlockContainer = isLineEmpty(line) && (node.tagName === "UL" || node.tagName === "OL" || node.tagName === "LI" || childClosedLine);
	if (isBlock && !wasNodeEmpty && !isFinishedBlockContainer) pushLine();
	if (!wasNodeEmpty && node.tagName === "P" && node.nextSibling) {
		lines.push("");
		++offset.offset;
	}
}
//#endregion
//#region src/helpers/dom/getRichValueWithCaret.ts
function getCaretPos(field) {
	const sel = field.ownerDocument.defaultView.getSelection();
	let selNode;
	let selOffset;
	if (sel?.rangeCount) {
		const range = sel.getRangeAt(0);
		const startOffset = range.startOffset;
		if (range.startContainer && range.startContainer == range.endContainer && startOffset == range.endOffset) {
			const possibleChildrenFocusOffset = startOffset - 1;
			const childNodes = field.childNodes;
			if (range.startContainer === field && childNodes[possibleChildrenFocusOffset]) {
				selNode = childNodes[possibleChildrenFocusOffset];
				selOffset = 0;
				for (let i = 0; i < range.endOffset; ++i) {
					const node = childNodes[i];
					const value = node.nodeValue || node.alt;
					if (value) selOffset += value.length;
				}
			} else {
				selNode = range.startContainer;
				selOffset = startOffset;
			}
		}
	}
	return {
		node: selNode,
		offset: selOffset
	};
}
function getRichValueWithCaret(field, withEntities = true, withCaret = true) {
	if (field.nodeType === field.ELEMENT_NODE) {
		const editor = getChatInputEditor(field);
		if (editor) return editor.getRichValue(withEntities, withCaret);
	}
	const lines = [];
	const line = [];
	const { node: selNode, offset: selOffset } = !(field instanceof DocumentFragment) && withCaret && getCaretPos(field);
	const entities = withEntities ? [] : void 0;
	const offset = { offset: 0 };
	if (field instanceof DocumentFragment) {
		let curChild = field.firstChild;
		while (curChild) {
			getRichElementValue(curChild, lines, line, selNode, selOffset, entities, offset);
			curChild = curChild.nextSibling;
		}
	} else getRichElementValue(field, lines, line, selNode, selOffset, entities, offset);
	if (line.length) lines.push(line.join(""));
	let value = lines.join("\n");
	const caretPos = value.indexOf("");
	if (caretPos !== -1) value = value.substr(0, caretPos) + value.substr(caretPos + 1);
	value = value.replace(/\u00A0/g, " ");
	if (entities?.length) {
		const singleEntities = entities.filter((entity) => SINGLE_ENTITIES.has(entity._));
		for (let i = 0; i < entities.length; ++i) {
			const entity = entities[i];
			if (SINGLE_ENTITIES.has(entity._)) continue;
			const conflictingEntity = findConflictingEntity(singleEntities, entity);
			if (!conflictingEntity) continue;
			entity.length = conflictingEntity.offset - entity.offset;
			if (entity.length <= 0) entities.splice(i--, 1);
		}
		combineSameEntities(entities);
		sortEntities(entities);
	}
	return {
		value,
		entities,
		caretPos
	};
}
MOUNT_CLASS_TO.getCaretPos = getCaretPos;
MOUNT_CLASS_TO.getRichValueWithCaret = getRichValueWithCaret;
//#endregion
//#region src/helpers/dom/isInputEmpty.ts
function isInputEmpty(element, allowStartingSpace) {
	const editor = getChatInputEditor(element);
	if (editor) return editor.isEmpty();
	return isNativeInputEmpty(element, allowStartingSpace);
}
function isInputPlaceholderEmpty(element, allowStartingSpace) {
	const editor = getChatInputEditor(element);
	if (editor) return editor.isPlaceholderEmpty();
	return isNativeInputEmpty(element, allowStartingSpace);
}
function isNativeInputEmpty(element, allowStartingSpace) {
	let value;
	if (element.isContentEditable || element.tagName !== "INPUT") {
		if (element.querySelector(".emoji, .custom-emoji, .custom-emoji-placeholder")) return false;
		value = element.textContent;
	} else value = element.value;
	if (!allowStartingSpace) return !value.trim();
	return !value;
}
//#endregion
//#region src/helpers/dom/compareNodes.ts
function compareNodes(node1, node1Offset, node2, node2Offset) {
	let diff;
	if (node1 === node2) diff = node1Offset - node2Offset;
	else if (node1.parentElement === node2.parentElement) diff = whichChild(node1, true) - whichChild(node2, true);
	else {
		const parents = [];
		let parentElement = node1.parentElement;
		do
			parents.push(parentElement);
		while (parentElement = parentElement.parentElement);
		parentElement = node2.parentElement;
		do
			if (parents.includes(parentElement)) break;
		while (parentElement = parentElement.parentElement);
		const commonAncestorContainer = parentElement;
		node1 = findUpAsChild(node1, commonAncestorContainer);
		node2 = findUpAsChild(node2, commonAncestorContainer);
		diff = whichChild(node1, true) - whichChild(node2, true);
	}
	return clamp(diff, -1, 1);
}
window.compareNodes = compareNodes;
//#endregion
//#region src/helpers/dom/richInputHandler.ts
var NOT_ONLY_BOMS_REG_EXP = new RegExp(`[^﻿]`);
var RichInputHandler = class RichInputHandler {
	constructor() {
		this.saveSelectionOnChange = (e) => {
			const element = getAppWindow().document.activeElement;
			this.saveRangeForElement(element);
		};
		this.onFocusOut = (e) => {
			this.lastNode = this.lastOffset = void 0;
		};
		this.onSelectionChange = (e) => {
			const { input } = this;
			if (!input) {
				this.setSelectionClassName(getAppWindow().getSelection());
				return;
			}
			let caret = this.getCaretPosN();
			do {
				const { node, offset, selection, move } = caret;
				if (node?.nodeValue !== "﻿" || !this.lastNode) break;
				const toLeft = compareNodes(node, offset, this.lastNode, this.lastOffset) < 0;
				if (toLeft !== void 0) {
					if (selection.isCollapsed) this.superMove(input, caret, toLeft, true);
					else selection.modify(selection.isCollapsed ? "move" : "extend", toLeft ? "backward" : "forward", "character");
				}
				this.log("selectionchange", node, offset, this.lastNode, this.lastOffset, node === this.lastNode, whichChild(this.getFiller(node)), whichChild(this.getFiller(this.lastNode)), toLeft, selection, input.ownerDocument.defaultView.getSelection(), input.ownerDocument.defaultView.getSelection().getRangeAt(0), node?.parentNode, this.lastNode?.parentNode);
				caret = this.getCaretPosN();
				this.lastNode = node;
				this.lastOffset = offset;
				break;
			} while (true);
			this.lastNode = this.lastOffset = void 0;
			this.setSelectionClassName(caret.selection, input);
		};
		this.onBeforeInput = (e) => {
			const { input, log } = this;
			if (!input) return;
			const addInputCallback = this.addInputCallback.bind(this, input);
			const caretPos = this.getCaretPosN();
			let { node, offset, selection, move } = caretPos;
			log("beforeinput", e, node, offset, selection, caretPos);
			this.lastNode = this.lastOffset = void 0;
			if (e.inputType.startsWith("delete")) {
				addInputCallback(() => {
					this.processEmptiedFillers(input);
					this.removeExtraBOMs(input);
					this.fixInsertedLineBreaks(input);
				});
				if (node?.nodeValue === "﻿" && selection.isCollapsed && e.inputType.includes("deleteContent")) {
					const toLeft = e.inputType.includes("Backward");
					const moveFirst = offset === 1 && toLeft || !offset && !toLeft;
					this.superMove(input, caretPos, toLeft, moveFirst);
				}
			} else if (e.inputType.startsWith("insert")) {
				if (node?.classList?.contains("input-something")) {
					node = node.previousSibling.firstChild;
					const range = selection.getRangeAt(0);
					range.setStart(node, 0);
					range.setEnd(node, 0);
					range.collapse(true);
					const c = this.getCaretPosN();
					node = c.node;
					selection = c.selection;
					offset = c.offset;
				}
				if (node && node.textContent === "﻿" && offset === 1) {
					selection.modify("move", "backward", "character");
					const c = this.getCaretPosN();
					node = c.node;
					selection = c.selection;
					offset = c.offset;
				}
				if (e.inputType === "insertLineBreak" || true) {
					{
						if (node && node.nodeType === node.ELEMENT_NODE) {
							node = node.firstChild;
							log.warn("fixing focus on span");
						}
						const isBOM = node?.nodeValue === "﻿";
						log("inserting line break", isBOM, node, `"${node?.nodeValue}"`, node?.parentElement ? Array.from(node.parentElement.childNodes).slice() : []);
						if (isBOM) {
							const parentElement = node.parentElement;
							parentElement.classList.replace("input-filler", "input-filler-text");
							parentElement.childNodes.length;
							addInputCallback(() => {
								if (parentElement.childNodes.length > 1) {
									log("inserting line break, remove");
									node = Array.from(parentElement.childNodes).find((node) => node.nodeValue === "﻿");
									parentElement.t = node;
								} else if (node.nodeValue !== "﻿") {
									log("inserting line break, deleteData");
									node.deleteData(node.nodeValue.indexOf("﻿"), 1);
								}
								this.fixInsertedLineBreaks(input);
							});
						} else if (e.inputType === "insertLineBreak") addInputCallback(() => {
							this.fixInsertedLineBreaks(input);
						});
					}
					return;
				}
				if (node?.nodeValue === "﻿") {
					if (e.inputType === "insertLineBreak") {
						if (offset === 1) selection.modify("move", "backward", "character");
						addInputCallback(() => {
							node.remove();
							setTimeout(() => {
								selection.modify("move", "forward", "character");
							}, 0);
						});
					}
					if (e.inputType === "insertLineBreak") {} else addInputCallback(() => {
						node.deleteData(node.nodeValue.indexOf("﻿"), 1);
						if (!node.nodeValue) node.remove();
					});
					if (selection.isCollapsed && false);
				} else if (e.inputType === "insertLineBreak" && node && node.nodeType === node.TEXT_NODE && node.nodeValue.length === offset) {
					log("inserting line break");
					input.querySelectorAll(".input-something").forEach((el) => {
						el.contentEditable = "inherit";
					});
					addInputCallback(() => {
						input.querySelectorAll(".input-something").forEach((el) => {
							el.contentEditable = "false";
						});
					});
				}
			} else if (e.inputType === "historyUndo") addInputCallback(() => {
				this.processFilledFillers(input);
				this.processEmptiedFillers(input);
				this.removeExtraBOMs(input);
				this.removeEmptyTextNodes(input);
				this.fixBuggedCaret();
			});
			else if (e.inputType === "historyRedo") addInputCallback(() => {
				this.processFilledFillers(input);
				this.processEmptiedFillers(input);
				input.querySelectorAll(".input-something:not([contenteditable])").forEach((el) => {
					el.contentEditable = "false";
				});
				this.removeExtraBOMs(input);
				this.fixBuggedCaret();
			});
		};
		this.onKeyDown = (e) => {
			const key = e.key;
			if (key === "ArrowDown" || key === "ArrowUp") this.lastNode = this.lastOffset = void 0;
			else {
				const { node, offset } = this.getCaretPosN();
				this.lastNode = node, this.lastOffset = offset;
				if (this.lastNode === this.input) this.lastNode = this.lastOffset = void 0;
			}
			this.log("keydown", this.lastNode, this.lastNode?.parentNode, this.lastOffset, this.getCaretPosN(), e);
		};
		this.log = logger("RICH-INPUT");
		this.listenerSetter = new ListenerSetter();
		this.savedRanges = /* @__PURE__ */ new WeakMap();
		bindActiveWindowListener((w) => w.document, "selectionchange", this.saveSelectionOnChange);
	}
	get input() {
		const { anchorNode: node } = getAppWindow().getSelection();
		if (!node) return;
		return (node.closest ? node : node.parentElement).closest("[contenteditable=\"true\"]");
	}
	saveRangeForElement(element) {
		if (element && (element.isContentEditable || element.tagName === "INPUT")) {
			const selection = element.ownerDocument.defaultView.getSelection();
			if (selection.rangeCount) this.savedRanges.set(element, selection.getRangeAt(0));
		}
	}
	findPreviousSmthIndex(input, node, something) {
		const elements = Array.from(something ?? input.querySelectorAll(".input-something"));
		const index = elements.findIndex((element) => compareNodes(element, 0, node, 0) >= 0);
		return index === -1 ? elements.length - 1 : Math.max(0, index - 1);
	}
	superMove(input, caret, toLeft, fromSelectionChange) {
		const { node, offset, move } = caret;
		const something = input.querySelectorAll(".input-something");
		const smthIndex = this.findPreviousSmthIndex(input, node, something);
		const r = input.ownerDocument.createRange();
		r[toLeft ? "setEnd" : "setStart"](node, offset);
		if (fromSelectionChange) move(toLeft);
		const c = this.getCaretPosN();
		if (c.node?.nodeValue === "﻿" && (!fromSelectionChange || node === this.lastNode)) {
			const idx = this.findPreviousSmthIndex(input, c.node, something);
			let moved = !fromSelectionChange;
			do {
				const c = this.getCaretPosN();
				const idxidx = this.findPreviousSmthIndex(input, c.node, something);
				r[toLeft ? "setStart" : "setEnd"](c.node, c.offset);
				const rangeString = r.toString();
				const onlyBOMs = !NOT_ONLY_BOMS_REG_EXP.test(rangeString);
				this.log("test cursor", rangeString, onlyBOMs, idx, idxidx);
				if (onlyBOMs && c.node?.nodeValue === "﻿" && idxidx === idx && (idxidx || c.offset) && (idxidx < something.length - 1 || c.offset < 1)) {
					move(toLeft);
					moved = true;
				} else if (!moved) break;
				else {
					if (!this.getFiller(node).classList.contains("input-filler-text") && idx !== smthIndex || c.offset === 1) move(!toLeft);
					break;
				}
			} while (true);
		}
	}
	restoreSavedRange(input) {
		const range = this.getSavedRange(input);
		if (!range) return false;
		const selection = input.ownerDocument.defaultView.getSelection();
		selection.removeAllRanges();
		selection.addRange(range);
		return true;
	}
	getSavedRange(input) {
		return this.savedRanges.get(input);
	}
	makeFocused(input) {
		if (input.ownerDocument.activeElement !== input && !this.restoreSavedRange(input)) placeCaretAtEnd(input, false, false);
	}
	fixInsertedLineBreaks(input) {
		input.querySelectorAll("br").forEach((br) => {
			br.classList.add("br-not-br");
		});
	}
	fixBuggedCaret() {
		const selection = getAppWindow().getSelection();
		const range = selection.getRangeAt(0);
		selection.removeAllRanges();
		selection.addRange(range);
	}
	addInputCallback(input, callback, capture = true) {
		const newCallback = () => {
			this.log("input modify callback");
			callback();
		};
		if (capture && IS_FIREFOX) this.inputCaptureCallbacks.push(newCallback);
		else this.listenerSetter.add(input)("input", newCallback, {
			once: true,
			capture
		});
	}
	removeExtraBOMs(input) {
		const c = (sibling) => {
			return sibling?.classList?.contains("input-something");
		};
		input.querySelectorAll(".input-filler").forEach((el) => {
			const { previousSibling, nextSibling } = el;
			let needed = false;
			if (!nextSibling?.classList?.contains("input-filler") && isCustomFillerNeededBySiblingNode(nextSibling)) needed = c(previousSibling) || c(nextSibling);
			if (!needed) {
				this.log.warn("removing empty bom node", el);
				el.remove();
			}
		});
	}
	getFiller(node) {
		return node && node.nodeType === node.TEXT_NODE && node.parentElement !== this.input ? node.parentElement : node;
	}
	getCaretPosN() {
		const ret = getCaretPosNew(this.input);
		return {
			...ret,
			move: this.move.bind(this, ret.selection)
		};
	}
	removeEmptyTextNodes(input) {
		const { log } = this;
		const treeWalker = document.createTreeWalker(input, NodeFilter.SHOW_TEXT, { acceptNode: (node) => node.parentElement === input && !node.nodeValue ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT });
		let textNode;
		while (textNode = treeWalker.nextNode()) {
			log.warn("removing empty text node", textNode);
			textNode.remove();
		}
	}
	removePossibleBOMSiblings(previousSibling, nextSibling) {
		[previousSibling, nextSibling].forEach((sibling) => {
			if (sibling?.classList?.contains("input-filler")) sibling.remove();
		});
	}
	removePossibleBOMSiblingsByNode(node) {
		const { previousSibling, nextSibling } = node;
		this.removePossibleBOMSiblings(previousSibling, nextSibling);
	}
	processEmptiedFillers(input) {
		input.querySelectorAll(".input-filler-text").forEach((el) => {
			this.removeExtraBOMs(el);
			let cleanSiblings = true;
			if (!el.textContent) {
				el.classList.replace("input-filler-text", "input-filler");
				const textNode = Array.from(el.childNodes).find((node) => node.nodeType === node.TEXT_NODE);
				if (textNode) textNode.insertData(0, "﻿");
				else if (el.t?.nodeValue) el.append(el.t);
				else el.append(document.createTextNode("﻿"));
			} else if (!NOT_ONLY_BOMS_REG_EXP.test(el.textContent) && !el.querySelector(".input-something")) el.classList.replace("input-filler-text", "input-filler");
			else cleanSiblings = false;
			if (cleanSiblings) this.removePossibleBOMSiblingsByNode(el);
		});
	}
	processFilledFillers(input) {
		input.querySelectorAll(".input-filler").forEach((el) => {
			if (el.textContent !== "﻿") {
				el.classList.replace("input-filler", "input-filler-text");
				const t = el.t;
				const bomNode = Array.from(el.childNodes).find((node) => node.nodeType === node.TEXT_NODE && node.nodeValue.includes("﻿"));
				if (bomNode && !t?.nodeValue) {
					const idx = bomNode.nodeValue.indexOf("﻿");
					if (idx !== -1) bomNode.deleteData(idx, 1);
				}
			}
		});
	}
	setSelectionClassName(selection, input) {
		if (selection.rangeCount) {
			const range = selection.getRangeAt(0);
			if (input) Array.from(input.querySelectorAll(".input-selectable")).forEach((element) => {
				element.classList.toggle("selection", !range.collapsed && range.intersectsNode(element));
			});
			else Array.from(document.querySelectorAll(".input-selectable.selection")).forEach((element) => element.classList.remove("selection"));
		}
	}
	move(selection, left) {
		const { focusNode: focusNodeBefore, focusOffset: focusOffsetBefore } = selection;
		selection.modify("extend", left ? "backward" : "forward", "character");
		if (left) selection.collapseToStart();
		else selection.collapseToEnd();
		const { focusNode: focusNodeAfter, focusOffset: focusOffsetAfter } = selection;
		this.log("moving cursor", left, focusNodeBefore, focusNodeBefore.nodeType === focusNodeBefore.ELEMENT_NODE ? focusNodeBefore : focusNodeBefore.parentElement, focusOffsetBefore, focusNodeAfter, focusNodeAfter.nodeType === focusNodeAfter.ELEMENT_NODE ? focusNodeAfter : focusNodeAfter.parentElement, focusOffsetAfter);
	}
	prepareApplyingMarkdown() {
		const { input } = this;
		const fillers = input.querySelectorAll(".input-filler");
		const smths = input.querySelectorAll(".input-something");
		smths.forEach((el) => {
			el.contentEditable = "inherit";
		});
		return () => {
			fillers.forEach((el) => {
				el.contentEditable = "inherit";
			});
			smths.forEach((el) => {
				el.contentEditable = "false";
			});
			this.removeExtraBOMs(input);
		};
	}
	static getInstance() {
		return this.INSTANCE ?? (this.INSTANCE = new RichInputHandler());
	}
};
//#endregion
//#region src/helpers/dom/selectElementContents.ts
function selectElementContents(el) {
	const range = el.ownerDocument.createRange();
	range.selectNodeContents(el);
	const sel = el.ownerDocument.defaultView.getSelection();
	sel.removeAllRanges();
	sel.addRange(range);
}
//#endregion
//#region src/lib/richTextProcessor/wrapDraftText.ts
function wrapDraftText(text, options = {}) {
	if (!text) return wrapRichText("");
	let entities = options.entities;
	if (entities && !rootScope.premium && options.wrappingForPeerId !== rootScope.myId) entities = entities.filter((entity) => entity._ !== "messageEntityCustomEmoji");
	return wrapRichText(text, {
		...options,
		entities,
		noLinks: true,
		wrappingDraft: true,
		passEntities: {
			messageEntityTextUrl: true,
			messageEntityMentionName: true
		}
	});
}
//#endregion
//#region src/components/chat/inputEditor/paste.ts
var proseMirrorPasteEvents = /* @__PURE__ */ new WeakSet();
function markProseMirrorPaste(event) {
	proseMirrorPasteEvents.add(event);
}
function isProseMirrorPaste(event) {
	return proseMirrorPasteEvents.has(event);
}
//#endregion
//#region src/components/inputField.ts
function asTextWithEntities(value) {
	return value && typeof value === "object" && value.nodeType === void 0 ? value : void 0;
}
async function insertRichTextAsHTML(input, text, entities, wrappingForPeerId) {
	const editor = getChatInputEditor(input);
	if (editor) {
		editor.replaceSelection(text, entities);
		return;
	}
	const loadPromises = [];
	const renderer = entities?.some((entity) => entity._ === "messageEntityCustomEmoji") ? createCustomEmojiRendererForInput() : void 0;
	const fragment = wrapDraftText(text, {
		entities,
		wrappingForPeerId,
		loadPromises,
		customEmojiRenderer: renderer
	});
	fragment.querySelectorAll("[contenteditable=\"false\"]").forEach((el) => {
		el.contentEditable = "inherit";
		el.classList.add("pc");
	});
	loadPromises.length && await Promise.all(loadPromises);
	fragment.querySelectorAll(".input-selectable").forEach((el) => {
		el.prepend(createCustomFiller(true));
	});
	const customEmojiElements = Array.from(fragment.querySelectorAll(".custom-emoji-placeholder")).map((el) => {
		el.dataset.ces = "1";
		return el.customEmojiElement;
	});
	const html = documentFragmentToHTML(fragment);
	renderer?.destroy();
	const pre = getCaretPosNew(input);
	if (pre.node) {} else {
		const range = input.ownerDocument.createRange();
		let node = input.lastChild;
		if (!node) input.append(node = input.ownerDocument.createTextNode(""));
		range.setStartAfter(node);
		range.collapse(true);
		pre.selection.removeAllRanges();
		pre.selection.addRange(range);
	}
	input.addEventListener("input", cancelEvent, {
		capture: true,
		once: true,
		passive: false
	});
	input.ownerDocument.execCommand("insertHTML", false, html);
	Array.from(input.querySelectorAll("[data-ces]")).forEach((el, idx) => {
		delete el.dataset.ces;
		const customEmojiElement = customEmojiElements[idx];
		el.customEmojiElement = customEmojiElement;
		customEmojiElement.placeholder = el;
	});
	input.querySelectorAll(".pc").forEach((el) => {
		el.contentEditable = "false";
	});
	simulateEvent(input, "input");
}
var init = () => {
	bindActiveWindowListener((w) => w.document, "paste", (e) => {
		const input = findUpAttribute(e.target, "contenteditable=\"true\"");
		if (!input) return;
		if (getChatInputEditor(input) || isProseMirrorPaste(e)) return;
		e.preventDefault();
		let text = e.clipboardData.getData("text/plain").replace(/\r/g, "");
		if (input.dataset.noLinebreaks) text = text.replace(/\n/g, "");
		const peerId = (input.dataset.peerId || 0).toPeerId();
		const entities = parseEntities(text).filter((entity) => entity._ === "messageEntityEmoji");
		insertRichTextAsHTML(input, text, entities, peerId);
	});
	init = null;
};
var InputState = /* @__PURE__ */ function(InputState) {
	InputState[InputState["Neutral"] = 0] = "Neutral";
	InputState[InputState["Valid"] = 1] = "Valid";
	InputState[InputState["Error"] = 2] = "Error";
	return InputState;
}({});
function createCustomEmojiRendererForInput(textColor, animationGroup) {
	return CustomEmojiRendererElement.create({
		wrappingDraft: true,
		isSelectable: true,
		textColor: textColor || "primary-text-color",
		animationGroup
	});
}
function processCustomEmojisInInput(input) {
	const customEmojiElements = Array.from(input.querySelectorAll(".custom-emoji, .custom-emoji-placeholder"));
	let renderer = input.querySelector(".custom-emoji-renderer");
	if (!renderer && customEmojiElements.length) {
		renderer = createCustomEmojiRendererForInput(input.dataset.textColor, input.dataset.animationGroup);
		input.prepend(renderer);
	} else if (renderer && !customEmojiElements.length) {
		renderer.remove();
		return;
	}
	if (!renderer) return;
	const customEmojis = /* @__PURE__ */ new Map();
	customEmojiElements.forEach((element) => {
		const customEmojiElement = element.loop !== void 0 ? element : element.customEmojiElement;
		const { docId } = customEmojiElement;
		let set = customEmojis.get(docId);
		if (!set) customEmojis.set(docId, set = /* @__PURE__ */ new Set());
		set.add(customEmojiElement);
	});
	for (const [docId, customEmojiElements] of customEmojis) {
		let hasSet = renderer.customEmojis.get(docId);
		if (hasSet) {
			for (const customEmojiElement of hasSet) if (!customEmojiElements.has(customEmojiElement)) customEmojiElement.destroy();
		} else hasSet = /* @__PURE__ */ new Set();
		for (const customEmojiElement of customEmojiElements) if (!hasSet.has(customEmojiElement)) customEmojiElement.connectedCallback();
	}
	renderer.add({
		addCustomEmojis: customEmojis,
		lazyLoadQueue: false
	});
	renderer.forceRender();
}
var inputFieldErrorIdSeed = 0;
var InputField = class {
	constructor(options = {}) {
		this.options = options;
		this.isInputHidden = false;
		this.setEmpty = (empty = this.isPlaceholderEmpty()) => {
			[this.input, this.placeholder].filter(Boolean).forEach((el) => {
				el.classList.toggle("is-empty", empty);
			});
		};
		this.container = document.createElement("div");
		this.container.classList.add("input-field");
		this.required = options.required;
		this.validate = options.validate;
		if (options.maxLength !== void 0 && options.showLengthOn === void 0) options.showLengthOn = Math.min(40, Math.round(options.maxLength / 3));
		const { placeholder, maxLength, showLengthOn, name, plainText, canBeEdited = true, autocomplete, withBorder, allowStartingSpace, canHaveFormatting, canWrapCustomEmojis } = options;
		const label = options.label || options.labelText;
		this.allowStartingSpace = allowStartingSpace;
		const onInputCallbacks = [];
		let input;
		if (!plainText) {
			if (init) init();
			this.container.innerHTML = `<div class="input-field-input"></div>`;
			input = this.container.firstElementChild;
			input.contentEditable = "" + !!canBeEdited;
			input.setAttribute("role", "textbox");
			input.setAttribute("aria-multiline", `${!!options.withLinebreaks}`);
			if (!canBeEdited) input.setAttribute("aria-readonly", "true");
			input.translate = false;
			RichInputHandler.getInstance();
			input.addEventListener("mousedown", (e) => {
				if (getChatInputEditor(input)) return;
				const selection = input.ownerDocument.defaultView.getSelection();
				if (!selection.isCollapsed) return;
				const placeholder = findUpTag(e.target, "IMG");
				if (!placeholder) return;
				const rect = placeholder.getBoundingClientRect();
				const centerX = rect.left + rect.width / 2;
				const focusOnNext = e.clientX >= centerX;
				const range = input.ownerDocument.createRange();
				range.setStartAfter(focusOnNext ? placeholder : placeholder.previousSibling ?? placeholder);
				selection.removeAllRanges();
				selection.addRange(range);
			});
			if (canHaveFormatting) input.setAttribute("can-format", canHaveFormatting.join(","));
			onInputCallbacks.push(() => {
				const isEmpty = this.isEmpty();
				const editor = getChatInputEditor(input);
				if (isEmpty && !editor) input.replaceChildren();
				this.setEmpty();
				if (!editor) {
					insertCustomFillers(Array.from(input.querySelectorAll(".input-something")));
					processCustomEmojisInInput(input);
				}
			});
		} else {
			this.container.innerHTML = `
      <input type="text" ${name ? `name="${name}"` : ""} autocomplete="${autocomplete ?? "off"}" ${label ? "required=\"\"" : ""} class="input-field-input">
      `;
			input = this.container.firstElementChild;
			if (!canBeEdited) input.readOnly = true;
			onInputCallbacks.push(() => {
				if (this.isEmpty()) input.value = "";
				this.setEmpty();
			});
		}
		setDirection(input);
		if (options.inputMode) input.inputMode = options.inputMode;
		if (placeholder) {
			this.placeholder = document.createElement("span");
			this.placeholder.id = createUniqueId();
			if (!label) input.setAttribute("aria-labelledby", this.placeholder.id);
			this.placeholder.classList.add("input-field-placeholder");
			this.container.append(this.placeholder);
			_i18n(this.placeholder, placeholder, void 0);
		}
		if (withBorder !== false && withBorder || label || placeholder) {
			const border = document.createElement("div");
			border.classList.add("input-field-border");
			this.container.append(border);
		}
		if (label != null || maxLength) {
			this.label = document.createElement("label");
			this.label.id = createUniqueId();
			input.setAttribute(label ? "aria-labelledby" : "aria-describedby", this.label.id);
			if (input.tagName === "INPUT" || input.tagName === "TEXTAREA") {
				var _input;
				(_input = input).id || (_input.id = createUniqueId());
				this.label.htmlFor = input.id;
			}
			this.setLabel();
			this.container.append(this.label);
		}
		const namingElement = this.label || this.placeholder;
		labelControl(input, namingElement);
		if (maxLength) {
			const labelEl = this.label;
			let showingLength = false;
			const onInput = () => {
				const wasError = input.classList.contains("error");
				const inputLength = plainText ? input.value.length : [...getRichValueWithCaret(input, false, false).value].length;
				const diff = maxLength - inputLength;
				const isError = diff < 0;
				input.classList.toggle("error", isError);
				labelEl.classList.toggle("error", isError);
				if (isError || diff <= showLengthOn) {
					this.setLabel();
					labelEl.append(` (${maxLength - inputLength})`);
					labelEl.style.visibility = "visible";
					if (!showingLength) showingLength = true;
				} else if (wasError && !isError || showingLength) {
					this.setLabel();
					showingLength = false;
				}
			};
			onInputCallbacks.push(onInput);
		}
		if (!options.withLinebreaks && !plainText) {
			input.dataset.noLinebreaks = "1";
			input.addEventListener("keypress", (e) => {
				if (e.key === "Enter") {
					e.preventDefault();
					return false;
				}
			});
		}
		if (options.onRawInput) onInputCallbacks.push(() => {
			options.onRawInput(this.value);
		});
		if (onInputCallbacks.length) input.addEventListener("input", () => {
			onInputCallbacks.forEach((callback) => callback());
		});
		if (canWrapCustomEmojis) input.dataset.canWrapCustomEmojis = "1";
		this.input = input;
		this.setEmpty(true);
	}
	select() {
		if (!this.value) return;
		if (this.options.plainText) this.input.select();
		else selectElementContents(this.input);
	}
	setLabel() {
		this.label.textContent = "";
		if (this.options.labelText) setInnerHTML(this.label, this.options.labelText);
		else if (this.options.label) this.label.append(i18n(this.options.label, this.options.labelOptions));
		this.label.style.visibility = this.label.textContent ? "visible" : "hidden";
	}
	get value() {
		return this.options.plainText ? this.input.value : getRichValueWithCaret(this.input, false, false).value;
	}
	set value(value) {
		this.setValueSilently(value, true);
		this.simulateInputEvent();
	}
	simulateInputEvent() {
		simulateEvent(this.input, "input");
	}
	syncFromInput() {
		this.setEmpty();
	}
	setValueSilently(value, fromSet) {
		if (this.options.plainText) this.input.value = value;
		else {
			const textWithEntities = asTextWithEntities(value);
			const editor = getChatInputEditor(this.input);
			if (editor) {
				if (textWithEntities) editor.setTextWithEntities(textWithEntities.text, textWithEntities.entities);
				else editor.setContent(value);
			} else {
				replaceContent(this.input, textWithEntities ? wrapDraftText(textWithEntities.text, {
					entities: textWithEntities.entities,
					wrappingForPeerId: this.input.dataset.peerId?.toPeerId()
				}) : value);
				processCustomEmojisInInput(this.input);
			}
		}
		this.setEmpty();
	}
	isPlaceholderEmpty() {
		return isInputPlaceholderEmpty(this.input, this.allowStartingSpace) || this.isInputHidden;
	}
	setHidden(hidden) {
		this.isInputHidden = hidden;
		this.setEmpty();
	}
	isEmpty() {
		return isInputEmpty(this.input, this.allowStartingSpace) || this.isInputHidden;
	}
	isChanged() {
		return this.value !== this.originalValue;
	}
	isValid() {
		return !this.input.classList.contains("error") && (!this.validate || this.validate()) && (!this.required || !this.isEmpty());
	}
	isValidToChange() {
		return this.isValid() && this.isChanged();
	}
	setDraftValue(value = "", silent) {
		let _value = value;
		if (!this.options.plainText) _value = wrapDraftText(value);
		if (silent) this.setValueSilently(_value, false);
		else this.value = _value;
	}
	setOriginalValue(value = "", silent) {
		this.originalValue = value;
		this.setDraftValue(value, silent);
	}
	removeErrorLabel() {
		if (!this.errorLabel) return;
		const describedBy = (this.input.getAttribute("aria-describedby") || "").split(/\s+/).filter((id) => id && id !== this.errorLabel.id);
		if (describedBy.length) this.input.setAttribute("aria-describedby", describedBy.join(" "));
		else this.input.removeAttribute("aria-describedby");
		this.errorLabel.remove();
		this.errorLabel = void 0;
		this.container.classList.remove("has-error-label");
	}
	setState(state, label, labelOptions) {
		const isError = !!(state & 2);
		if (label && isError && Modes.a11y) {
			if (!this.errorLabel) {
				this.errorLabel = this.container.ownerDocument.createElement("span");
				this.errorLabel.id = "input-field-error-" + ++inputFieldErrorIdSeed;
				this.errorLabel.classList.add("input-field-error-label");
				this.errorLabel.setAttribute("role", "alert");
				this.container.append(this.errorLabel);
			}
			this.errorLabel.replaceChildren(i18n(label, labelOptions ?? this.options.labelOptions));
			this.container.classList.add("has-error-label");
			const describedBy = new Set((this.input.getAttribute("aria-describedby") || "").split(/\s+/).filter(Boolean));
			describedBy.add(this.errorLabel.id);
			this.input.setAttribute("aria-describedby", [...describedBy].join(" "));
		} else if (label) {
			this.label.textContent = "";
			this.label.append(i18n(label, labelOptions ?? this.options.labelOptions));
			this.label.style.visibility = "visible";
		} else this.setLabel();
		if ((!isError || !label) && this.errorLabel) this.removeErrorLabel();
		if (isError) this.input.setAttribute("aria-invalid", "true");
		else this.input.removeAttribute("aria-invalid");
		this.input.classList.toggle("error", isError);
		this.input.classList.toggle("valid", !!(state & 1));
	}
	setError(label, labelOptions) {
		this.setState(2, label, labelOptions);
	}
	toggleForceFocus(enabled) {
		this.input.classList.toggle("force-focus", enabled);
	}
};
//#endregion
export { RichInputHandler as a, getFormattedDateEntityByElement as c, findUpAttribute as d, markProseMirrorPaste as i, markdownTags as l, InputState as n, isInputEmpty as o, insertRichTextAsHTML as r, getRichValueWithCaret as s, InputField as t, getCaretPosF as u };
