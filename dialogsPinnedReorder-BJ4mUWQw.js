//# allFunctionsCalledOnLoad
import { n as logger } from "./logger-7zf0rNYS.js";
import { n as Sortable, t as PRESSABLE_DRAG_THRESHOLD } from "./sortable-DnDolsys.js";
//#region src/lib/appManagers/utils/dialogs/movePinnedKey.ts
/**
* Puts `key` back into a list's pinned order at the place a reorder left it, addressed by the
* neighbour it ended up next to rather than by how far it travelled.
*
* A reorder performed by hand only knows about the rows that were on screen, while the stored
* order can hold pins with no row at all - the member chats of a folded Community keep theirs -
* so counting slots would land next to the wrong pin as soon as one of those sits in between.
*
* @param order the list's whole pinned order, topmost first
* @param key the dialog that moved
* @param above the key it now follows, or `undefined` when it went to the very top of what moved
* @param below the key it now precedes, used when there is nothing above it
* @returns the new order, or `undefined` when the pins it was about are not in `order` any more
*/
function movePinnedKey(order, key, above, below) {
	const without = order.filter((pinned) => pinned !== key);
	if (without.length === order.length) return;
	const hasAbove = above !== void 0;
	const at = without.indexOf(hasAbove ? above : below);
	if (at === -1) return;
	without.splice(hasAbove ? at + 1 : at, 0, key);
	return without;
}
//#endregion
//#region src/components/dialogsPinnedReorder.ts
/** Carried by a row whose dialog is pinned in the list it is rendered in */
var PINNED_DIALOG_CLASS_NAME = "is-pinned";
/**
* Carried by a list whose pinned block can be dragged right now, and only while that is a mode it
* is in. The rows read it to show the grip they are dragged by, in place of the time and the
* badges - the affordance Android puts on a cell it lets you move.
*/
var REORDERABLE_LIST_CLASS_NAME = "is-reorderable";
var log = logger("PINNED-REORDER");
/**
* Lets the pinned block of a chat list be reordered by dragging one of its rows, like every other
* client. Only the pinned rows take part (they are the only ones carrying
* `PINNED_DIALOG_CLASS_NAME`), so a row can neither leave the block nor push an unpinned chat
* around, and the list is left to re-render the new order from its own model.
*/
function attachPinnedDialogsReorder({ list, scrollable, middleware, sortedList, managers, getFilterId, getDialogKey, canReorder }) {
	list.classList.toggle(REORDERABLE_LIST_CLASS_NAME, !!canReorder?.());
	return new Sortable({
		list,
		middleware,
		scrollable,
		threshold: PRESSABLE_DRAG_THRESHOLD,
		moveInDom: false,
		sortableClassName: PINNED_DIALOG_CLASS_NAME,
		enabled: canReorder,
		onSort: (prevIdx, newIdx, { items, from, to }) => {
			const filterId = getFilterId();
			const keys = items.map(getDialogKey);
			const reordered = keys.slice();
			reordered.splice(to, 0, ...reordered.splice(from, 1));
			const unblock = sortedList.blockAnimation();
			const revert = sortedList.reorderItems(reordered) ? () => sortedList.reorderItems(keys) : void 0;
			queueMicrotask(unblock);
			pinnedOrderAfterDrag({
				managers,
				filterId,
				key: keys[from],
				reordered,
				to
			}).then((order) => managers.appMessagesManager.reorderPinnedDialogs({
				filterId,
				order
			}).catch((err) => log.error("the pinned order was not saved", err)), (err) => {
				log.warn("not reordering the pinned dialogs:", err);
				revert?.();
			});
		}
	});
}
/**
* Turns the move the drag made into the list's whole pinned order.
*
* The order the drag produced covers only the rows that were on screen, and a list can hold pins
* with no row at all (the member chats of a folded Community keep theirs), so the move is
* replayed onto the stored order by the neighbour it ended up next to rather than by how many
* slots it travelled.
*/
async function pinnedOrderAfterDrag({ managers, filterId, key, reordered, to }) {
	const moved = movePinnedKey(await managers.dialogsStorage.getPinnedOrderForFilter(filterId), key, to > 0 ? reordered[to - 1] : void 0, reordered[to + 1]);
	if (!moved) throw new Error("the pins the drag was about are not pinned any more");
	return moved;
}
//#endregion
export { REORDERABLE_LIST_CLASS_NAME as n, attachPinnedDialogsReorder as r, PINNED_DIALOG_CLASS_NAME as t };
