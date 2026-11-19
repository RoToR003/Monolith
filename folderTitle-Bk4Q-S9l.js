//# allFunctionsCalledOnLoad
import { u as wrapRichText } from "./renderer-L80wjxct.js";
import { R as wrapTextWithEntities } from "./canPollPeerStories-D3HoBvLX.js";
//#region src/components/wrappers/folderTitle.ts
function wrapFolderTitle(text, middleware, noWait, { textColor = "primary-text-color" } = {}) {
	const loadPromises = [];
	text = wrapTextWithEntities(text);
	const wrapped = wrapRichText(text.text, {
		entities: text.entities,
		middleware,
		loadPromises,
		textColor
	});
	if (noWait) return wrapped;
	return Promise.all(loadPromises).then(() => wrapped);
}
//#endregion
export { wrapFolderTitle as t };
