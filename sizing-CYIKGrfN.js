//# allFunctionsCalledOnLoad
import { t as clamp } from "./clamp-9UaNhw6N.js";
//#region src/helpers/mapDeleteWhere.ts
/** Deletes the entries of `map` whose keys `filter` takes; says whether there were any. */
function mapDeleteWhere(map, filter) {
	let deleted = false;
	for (const key of map.keys()) if (filter(key)) deleted = map.delete(key) || deleted;
	return deleted;
}
/**
* What a chat knows of a widget's height before the widget runs. The bot's height is the widget's (docs/integration.md,
* "Bubble sizing"); an auto height is the content's, which the chat remembers per message once the widget has reported
* it, so that its bubble takes that place the next time — and with it the layout it was laid out at (the chat's width
* and text size), which the content wraps to. Kept on disk with the account's widget storage (heights.ts), the newest
* MAX_REMEMBERED_HEIGHTS.
*/
var heights = /* @__PURE__ */ new Map();
var MAX_REMEMBERED_HEIGHTS = 1e3;
/** What marks the key of a message out of the chat's history (`getWidgetKey`'s `store`). */
var STORE_SEPARATOR = "@";
/**
* A widget message's key: its remembered height and crash count go by it, for that account's message only. `store`: a
* message that is not of the chat's history (a scheduled one, an admin log's entry...), whose ids are that store's own —
* its height is remembered for the page only.
*/
function getWidgetKey(accountNumber, peerId, mid, store) {
	return `${accountNumber}_${peerId}_${mid}` + (store ? STORE_SEPARATOR + store : "");
}
/** The bot's height, within the bounds every client keeps it in; none: the content's. */
function getWidgetFixedHeight(height) {
	return height ? clamp(height, 50, 600) : void 0;
}
var listeners = /* @__PURE__ */ new Set();
/** Calls `listener` whenever a widget's height is remembered (its key; none: several, from the disk); returns what stops it. */
function onWidgetHeightRemembered(listener) {
	listeners.add(listener);
	return () => {
		listeners.delete(listener);
	};
}
var trimHeights = () => {
	while (heights.size > MAX_REMEMBERED_HEIGHTS) heights.delete(heights.keys().next().value);
};
function rememberWidgetHeight(key, height, layout) {
	heights.delete(key);
	heights.set(key, {
		height,
		layout
	});
	trimHeights();
	listeners.forEach((listener) => listener(key));
}
var accountPrefix = (accountNumber) => accountNumber + "_";
/** An account's heights from the disk, older than any this page remembered meanwhile. */
function restoreWidgetHeights(accountNumber, stored) {
	const remembered = [...heights];
	heights.clear();
	for (const [fullMid, height, layout] of stored) heights.set(accountPrefix(accountNumber) + fullMid, {
		height,
		layout
	});
	for (const [key, entry] of remembered) {
		heights.delete(key);
		heights.set(key, entry);
	}
	trimHeights();
	listeners.forEach((listener) => listener());
}
/** An account's heights as the disk keeps them, oldest first: of its chats' histories. */
function getStoredWidgetHeights(accountNumber) {
	const prefix = accountPrefix(accountNumber);
	const stored = [];
	for (const [key, { height, layout }] of heights) if (key.startsWith(prefix) && !key.includes(STORE_SEPARATOR)) stored.push([
		key.slice(prefix.length),
		height,
		layout
	]);
	return stored;
}
/** Forgets the heights of the messages `filter` takes (by key); its listeners hear of it as of a height remembered. */
function forgetWidgetHeights(filter) {
	let forgotten;
	mapDeleteWhere(heights, (key) => filter(key) && !!(forgotten = key));
	if (forgotten) listeners.forEach((listener) => listener(forgotten));
}
/** The height the widget had when it last ran; with `layout`, only if it was laid out at that one. */
function getRememberedWidgetHeight(key, layout) {
	const entry = heights.get(key);
	return entry && (layout === void 0 || entry.layout === layout) ? entry.height : void 0;
}
/**
* The height a widget's block has at least before the widget runs, at `layout`: the bot's, else the one it had there
* when it last ran, else the lowest a widget is.
*/
function getWidgetHeightAtLeast(media, key, layout) {
	return getWidgetFixedHeight(media.height) ?? getRememberedWidgetHeight(key, layout) ?? 50;
}
//#endregion
export { getWidgetFixedHeight as a, onWidgetHeightRemembered as c, mapDeleteWhere as d, getStoredWidgetHeights as i, rememberWidgetHeight as l, forgetWidgetHeights as n, getWidgetHeightAtLeast as o, getRememberedWidgetHeight as r, getWidgetKey as s, MAX_REMEMBERED_HEIGHTS as t, restoreWidgetHeights as u };
