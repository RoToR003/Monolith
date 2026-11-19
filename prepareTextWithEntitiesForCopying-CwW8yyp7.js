//# allFunctionsCalledOnLoad
import { O as encodeEntities, u as wrapRichText } from "./renderer-L80wjxct.js";
import { t as parseEntities } from "./parseEntities-C5qsCJ5K.js";
import { t as documentFragmentToHTML } from "./documentFragmentToHTML-CMxvOHG7.js";
//#region src/helpers/prepareTextWithEntitiesForCopying.ts
/**
* The text and entities of what was copied, next to the HTML other apps read. The draft markup
* cannot hold all of it — a code block is inline code there, a date has lost its format — so the
* composer pastes a copy from these, as it opens a message for editing.
*/
var COPIED_ATTRIBUTE = "data-text-with-entities";
/**
* The draft markup keeps a line break as the character itself, which shows as one only where
* `white-space` preserves it: whatever reads the clipboard's HTML — the composer, a document, a
* mail — folds it into a space. A <br> is a line break to every reader.
*/
function linebreaksToElements(fragment) {
	const walker = document.createTreeWalker(fragment, NodeFilter.SHOW_TEXT);
	const texts = [];
	while (walker.nextNode()) texts.push(walker.currentNode);
	for (const text of texts) {
		const lines = text.data.split("\n");
		if (lines.length === 1) continue;
		const nodes = [];
		lines.forEach((line, idx) => {
			if (idx) nodes.push(document.createElement("br"));
			if (line) nodes.push(line);
		});
		text.replaceWith(...nodes);
	}
}
/**
* The draft markup's formatting in HTML any app reads (a document, a mail): a draft span's format
* is its font family, which nothing but this client knows. A spoiler and a date have no such tag
* and stay the client's own.
*/
var MARKUP_ELEMENTS = {
	"markup-bold": "strong",
	"markup-italic": "em",
	"markup-underline": "u",
	"markup-strikethrough": "s",
	"markup-monospace": "code",
	"markup-quote": "blockquote"
};
function markupToElements(fragment) {
	fragment.querySelectorAll("[data-markup]").forEach((element) => {
		const tagName = MARKUP_ELEMENTS[element.dataset.markup];
		if (!tagName) return;
		const replacement = document.createElement(tagName);
		const { language, collapsed } = element.dataset;
		if (language) replacement.dataset.language = language;
		if (collapsed) replacement.dataset.collapsed = collapsed;
		if (element.dir) replacement.dir = element.dir;
		replacement.append(...Array.from(element.childNodes));
		element.replaceWith(replacement);
		if (tagName === "blockquote") {
			if (replacement.previousSibling?.nodeName === "BR") {
				replacement.previousSibling.remove();
				replacement.dataset.breakBefore = "";
			}
			if (replacement.nextSibling?.nodeName === "BR") {
				replacement.nextSibling.remove();
				replacement.dataset.breakAfter = "";
			}
		}
	});
}
/**
* What a copy's HTML says: its text (a <br> a line break, an image its alt) and the formatting around
* it, each element's tag and data and a link's address — what survives the browser writing it to
* the clipboard, where styles and handlers may not. The metadata keeps the shape it was written
* with: an app that keeps the wrapper while editing its text or formatting (a line more, bold taken
* off, a link pointed elsewhere) makes the HTML, not the metadata, the content.
*/
function getCopiedShape(node) {
	if (node.nodeType === node.TEXT_NODE) return node.data;
	if (node.nodeType !== node.ELEMENT_NODE) return "";
	const element = node;
	if (element.tagName === "BR") return "\n";
	const attributes = Array.from(element.attributes).filter(({ name }) => name.startsWith("data-")).map(({ name, value }) => `${name}="${value}"`);
	const href = element.tagName === "A" && element.dataset.follow === void 0 && element.getAttribute("href");
	if (href) {
		let url = href;
		try {
			url = new URL(href).href;
		} catch (err) {}
		attributes.push(`href="${url}"`);
	}
	const content = element.tagName === "IMG" ? element.alt : Array.from(element.childNodes).map(getCopiedShape).join("");
	return `<${element.tagName.toLowerCase()} ${attributes.sort().join(" ")}>${content}</>`;
}
var getContentShape = (parent) => Array.from(parent.childNodes).map(getCopiedShape).join("");
/**
* What a copy made by `prepareTextWithEntitiesForCopying` in `root` carries, while its HTML is still
* as it was written: a part of it, or one edited in another app, is read as its HTML.
*/
function getCopiedTextWithEntities(root) {
	const element = root.querySelector(`[${COPIED_ATTRIBUTE}]`);
	if (!element) return;
	let copied;
	try {
		copied = JSON.parse(element.getAttribute(COPIED_ATTRIBUTE));
	} catch (err) {
		return;
	}
	const isPlaced = (entity) => typeof entity?._ === "string" && Number.isInteger(entity.offset) && Number.isInteger(entity.length) && entity.offset >= 0 && entity.length > 0 && entity.offset + entity.length <= copied.text.length;
	if (typeof copied?.text !== "string" || !Array.isArray(copied.entities) || !copied.entities.every(isPlaced) || copied.shape !== getContentShape(element)) return;
	return {
		element,
		text: copied.text,
		entities: copied.entities,
		blocks: Array.isArray(copied.blocks) ? copied.blocks : void 0
	};
}
/**
* `blocks`, when the copy is of a rich message: the composer pastes those rather than the flat text,
* a heading as a heading, a list as a list.
*/
function prepareTextWithEntitiesForCopying(textWithEntities, meta, blocks) {
	if (!Array.isArray(textWithEntities)) textWithEntities = [textWithEntities];
	const copied = {
		text: "",
		entities: []
	};
	const html = textWithEntities.map(({ text, entities }, idx) => {
		entities = (entities ?? parseEntities(text)).filter((entity) => entity._ !== "messageEntityLinebreak");
		if (idx) copied.text += "\n\n";
		if (meta?.[idx]) copied.text += meta[idx] + "\n";
		const offset = copied.text.length;
		copied.text += text;
		copied.entities.push(...entities.map((entity) => ({
			...entity,
			offset: entity.offset + offset
		})));
		const wrapped = wrapRichText(text, {
			entities,
			wrappingDraft: true
		});
		linebreaksToElements(wrapped);
		markupToElements(wrapped);
		return documentFragmentToHTML(wrapped);
	}).map((str, idx) => {
		return meta?.[idx] ? encodeEntities(meta[idx]) + "<br>" + str : str;
	}).join("<br><br>");
	const template = document.createElement("template");
	template.innerHTML = html;
	const metadata = {
		...copied,
		shape: getContentShape(template.content),
		...blocks?.length && { blocks }
	};
	return {
		text: copied.text,
		html: `<span style="white-space: pre-wrap" ${COPIED_ATTRIBUTE}="${encodeEntities(JSON.stringify(metadata))}">${html}</span>`
	};
}
//#endregion
export { getCopiedTextWithEntities as n, prepareTextWithEntitiesForCopying as r, COPIED_ATTRIBUTE as t };
