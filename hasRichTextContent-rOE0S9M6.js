//# allFunctionsCalledOnLoad
//#region src/lib/richTextProcessor/concatRichText.ts
var EMPTY_RICH_TEXT = { _: "textEmpty" };
function concatRichText(texts) {
	const compact = [];
	texts.forEach((text) => {
		if (text._ === "textEmpty") return;
		const previous = compact[compact.length - 1];
		if (previous?._ === "textPlain" && text._ === "textPlain") compact[compact.length - 1] = {
			_: "textPlain",
			text: previous.text + text.text
		};
		else if (text._ === "textConcat") text.texts.forEach((child) => compact.push(child));
		else compact.push(text);
	});
	if (!compact.length) return EMPTY_RICH_TEXT;
	if (compact.length === 1) return compact[0];
	return {
		_: "textConcat",
		texts: compact
	};
}
//#endregion
//#region src/lib/richTextProcessor/hasRichTextContent.ts
function hasRichTextContent(text) {
	if (!text) return false;
	switch (text._) {
		case "textEmpty": return false;
		case "textPlain": return !!text.text.trim();
		case "textConcat": return text.texts.some(hasRichTextContent);
		case "textMath": return !!text.source.trim();
		case "textCustomEmoji": return !!text.document_id || !!text.alt;
		case "textImage": return true;
		case "textAnchor": return !!text.name || hasRichTextContent(text.text);
		case "textDiff": return hasRichTextContent(text.text);
		default: return hasRichTextContent(text.text);
	}
}
//#endregion
export { EMPTY_RICH_TEXT as n, concatRichText as r, hasRichTextContent as t };
