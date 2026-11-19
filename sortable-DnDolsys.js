//# allFunctionsCalledOnLoad
import { t as IS_TOUCH_SUPPORTED } from "./touchSupport-B2RWO3zD.js";
import { t as pause } from "./pause-BSJh-z46.js";
import { a as safeAssign } from "./idb-BZfkipS3.js";
import { r as getOverlayRoot } from "./appWindow-bo-KtJhy.js";
import { t as cancelEvent } from "./cancelEvent-Cw8vYZHp.js";
import { t as clamp } from "./clamp-9UaNhw6N.js";
import { t as liteMode } from "./liteMode-DeLStZfQ.js";
import { t as findUpAsChild } from "./findUpAsChild-CPjgnY00.js";
import { n as attachClickEvent } from "./clickEvent-COk4YpLP.js";
import { t as whichChild } from "./whichChild-CwhWxnKO.js";
import { l as SwipeHandler } from "./openEditors-7FmA7q_V.js";
import { t as positionElementByIndex } from "./positionElementByIndex-D7kiTyx2.js";
//#region src/helpers/dom/swallowNextClick.ts
/**
* Swallows the click that ends a gesture - a drag, a held press - so that what the press began on is
* not clicked as well. That click lands on the common ancestor of the press and the release rather
* than on either element, so it has to get past the moved-since-mousedown guard (`ignoreMove`). A
* release that makes no click leaves nothing behind: the next press, of the mouse or a key, drops the
* swallow.
*/
function swallowNextClick(target) {
	const detach = attachClickEvent(target, cancelEvent, {
		capture: true,
		once: true,
		passive: false,
		ignoreMove: true
	});
	const doc = "document" in target ? target.document : target.ownerDocument;
	doc.addEventListener("mousedown", detach, {
		capture: true,
		once: true
	});
	doc.addEventListener("keydown", detach, {
		capture: true,
		once: true
	});
}
//#endregion
//#region src/helpers/dom/sortableRun.ts
/** Worn by a child that is not to be dragged, in a list that is sortable throughout */
var CANT_SORT_CLASS_NAME = "cant-sort";
/**
* Whether an element can take part in a reorder. `cant-sort` says "not this one"; a
* `sortableClassName` is the other way round - only the children carrying it take part, which is
* how a list where just a part of the rows is sortable (a chat list's pinned block) says so.
*/
function isSortableElement(element, sortableClassName) {
	return !!element && !element.classList.contains(CANT_SORT_CLASS_NAME) && (!sortableClassName || element.classList.contains(sortableClassName));
}
/**
* The maximal run of adjacent sortable siblings around `element`, in visual order, `element`
* included. A sibling that cannot be sorted ends the run, which is what keeps a chat list's pinned
* block - or a section of rows of any other kind - apart from everything else in the same list.
*/
function getSortableRun(element, sortableClassName) {
	const items = [element];
	for (let sibling = element.previousElementSibling; isSortableElement(sibling, sortableClassName); sibling = sibling.previousElementSibling) items.unshift(sibling);
	for (let sibling = element.nextElementSibling; isSortableElement(sibling, sortableClassName); sibling = sibling.nextElementSibling) items.push(sibling);
	return items;
}
/**
* The `threshold` of a list of such elements. On touch the drag starts from a long press instead
* (`SwipeHandler`'s `withDelay`), which has already said what it is, so the element is picked up
* right away.
*/
var PRESSABLE_DRAG_THRESHOLD = IS_TOUCH_SUPPORTED ? 0 : 8;
/**
* Where an element dragged `yDiff` off its place in a run stands: how far it may go either way,
* and which of its siblings it has passed - each one once it is half-way past it. Off the heights
* of the run's elements, top to bottom, which do not have to be equal: a chat with folder tags is
* a line taller than one without.
*/
function getSortableDragStep(heights, idx, yDiff) {
	let minY = 0, maxY = 0;
	for (let i = 0; i < idx; ++i) minY -= heights[i];
	for (let i = idx + 1; i < heights.length; ++i) maxY += heights[i];
	yDiff = clamp(yDiff, minY, maxY);
	const direction = yDiff >= 0 ? 1 : -1;
	const distance = Math.abs(yDiff);
	let count = 0, passedHeight = 0;
	for (let i = idx + direction; i >= 0 && i < heights.length; i += direction) {
		if (distance < passedHeight + heights[i] / 2) break;
		passedHeight += heights[i];
		++count;
	}
	return {
		minY,
		maxY,
		yDiff,
		count,
		passedHeight
	};
}
/**
* Where an element dragged over a grid of equal cells lands: the cell nearest to its middle. The
* cells are where they stood when it was picked up, its middle is where it is now, in the same terms.
*/
function getSortableGridTarget(slots, center) {
	let target = 0, nearest = Infinity;
	slots.forEach((slot, idx) => {
		const x = slot.left + slot.width / 2 - center.x;
		const y = slot.top + slot.height / 2 - center.y;
		const distance = x * x + y * y;
		if (distance < nearest) {
			nearest = distance;
			target = idx;
		}
	});
	return target;
}
/**
* The cell the element at `idx` of a grid stands in while the one at `from` is held over `to`: the
* ones in between step a cell towards the place it left.
*/
function getSortableGridSlot(idx, from, to) {
	if (idx === from) return to;
	if (from < to && idx > from && idx <= to) return idx - 1;
	if (to < from && idx >= to && idx < from) return idx + 1;
	return idx;
}
var Sortable = class {
	constructor(options) {
		this.onSwipe = (xDiff, yDiff) => {
			if (!this.pickedUp) {
				if ((this.axis === "y" ? Math.abs(yDiff) : this.axis === "x" ? Math.abs(xDiff) : Math.max(Math.abs(xDiff), Math.abs(yDiff))) < this.threshold) return;
				this.pickUp();
				this.pickUpX = xDiff;
				this.pickUpY = yDiff;
			}
			xDiff -= this.pickUpX;
			yDiff -= this.pickUpY;
			if (this.axis === "grid") this.moveInGrid(xDiff, yDiff);
			else this.moveInLine(this.axis === "x" ? xDiff * this.inlineSign : yDiff);
		};
		this.verifyTouchTarget = (e) => {
			if (this.list.classList.contains("is-reordering") || this.enabled?.() === false) return false;
			this.element = this.getSortableTarget(e.target);
			if (!this.element) return false;
			return getSortableRun(this.element, this.sortableClassName).length > 1;
		};
		this.onScroll = () => {
			const diff = this.addScrollPos = this.getScrollPos() - this.startScrollPos;
			const isX = this.axis === "x";
			this.swipeHandler.add(isX ? diff : 0, isX ? 0 : diff);
		};
		this.onStart = () => {
			this.pickedUp = false;
			this.siblings = void 0;
			this.cancelled = false;
		};
		this.onReset = async () => {
			if (!this.pickedUp) {
				this.clearState();
				return;
			}
			const items = this.items;
			const from = items.indexOf(this.element);
			const isGrid = this.axis === "grid";
			const siblings = (isGrid ? items.filter((item) => item !== this.element) : this.siblings) || [];
			const move = this.cancelled ? 0 : isGrid ? this.to - this.from : siblings.length && siblings.length * this.moveDirection;
			const idx = whichChild(this.element);
			const newIdx = idx + move;
			const element = this.element;
			let transform = "";
			if (move && isGrid) {
				const { slots } = this;
				transform = `translate(${slots[this.to].left - slots[this.from].left}px, ${slots[this.to].top - slots[this.from].top}px)`;
			} else if (move) transform = this.translateInLine(this.moveDirection * this.passedHeight);
			this.element.classList.remove("no-transition");
			this.element.style.transform = transform;
			if (this.cancelled) siblings.forEach((sibling) => sibling.style.transform = "");
			this.swipeHandler.setCursor("");
			if (this.scrollable) this.scrollable.container.removeEventListener("scroll", this.onScroll);
			if (!IS_TOUCH_SUPPORTED) swallowNextClick(getOverlayRoot());
			if (liteMode.isAvailable("motion")) await pause(250);
			this.list.classList.remove("is-reordering");
			this.element.classList.remove("is-dragging");
			if (this.moveInDom) positionElementByIndex(this.element, this.list, newIdx, idx);
			[this.element, ...siblings].forEach((element) => {
				element.style.transform = "";
			});
			this.clearState();
			if (!move || from === -1) return;
			this.onSort(idx, newIdx, {
				element,
				items,
				from,
				to: from + move
			});
		};
		this.threshold = 0;
		this.moveInDom = true;
		this.axis = "y";
		safeAssign(this, options);
		this.swipeHandler = new SwipeHandler({
			element: this.list,
			onSwipe: this.onSwipe,
			verifyTouchTarget: this.verifyTouchTarget,
			onStart: this.onStart,
			onReset: this.onReset,
			setCursorTo: getOverlayRoot(),
			middleware: this.middleware,
			withDelay: true
		});
	}
	/** The element's shift by `diff` along the line, towards its end, as a transform */
	translateInLine(diff) {
		return this.axis === "x" ? `translateX(${diff * this.inlineSign}px)` : `translateY(${diff}px)`;
	}
	moveInLine(diff) {
		this.items = getSortableRun(this.element, this.sortableClassName);
		const idx = this.items.indexOf(this.element);
		if (idx === -1) {
			this.swipeHandler.reset();
			return;
		}
		const isX = this.axis === "x";
		const step = getSortableDragStep(this.items.map((item) => isX ? item.offsetWidth + this.gap : item.offsetHeight), idx, diff);
		this.minY = step.minY;
		this.maxY = step.maxY;
		diff = step.yDiff;
		this.element.style.transform = this.translateInLine(diff);
		const toEnd = diff >= 0;
		this.moveDirection = toEnd ? 1 : -1;
		this.passedHeight = step.passedHeight;
		const count = step.count;
		const lastSiblings = this.siblings;
		this.siblings = toEnd ? this.items.slice(idx + 1, idx + 1 + count) : this.items.slice(idx - count, idx);
		(lastSiblings || []).forEach((sibling) => {
			if (!this.siblings.includes(sibling)) sibling.style.transform = "";
		});
		const elementSize = isX ? this.elementRect.width + this.gap : this.elementRect.height;
		this.siblings.forEach((sibling) => {
			sibling.style.transform = this.translateInLine(elementSize * (toEnd ? -1 : 1));
		});
		const shift = diff * (isX ? this.inlineSign : 1);
		this.scrollToEdge(isX ? shift : 0, isX ? 0 : shift);
	}
	moveInGrid(xDiff, yDiff) {
		if (!this.element.isConnected) {
			this.swipeHandler.reset();
			return;
		}
		const run = getSortableRun(this.element, this.sortableClassName);
		if (run.length < this.items.length || this.items.some((item, idx) => run[idx] !== item)) {
			this.cancel();
			return;
		}
		for (const item of run.slice(this.items.length)) {
			const rect = item.getBoundingClientRect();
			this.slots.push({
				left: rect.left,
				top: rect.top + this.addScrollPos,
				width: rect.width,
				height: rect.height
			});
			this.items.push(item);
		}
		this.element.style.transform = `translate(${xDiff}px, ${yDiff}px)`;
		const { from, slots } = this;
		const slot = slots[from];
		const to = getSortableGridTarget(slots, {
			x: slot.left + slot.width / 2 + xDiff,
			y: slot.top + slot.height / 2 + yDiff
		});
		if (to !== this.to) {
			this.to = to;
			this.items.forEach((item, idx) => {
				if (item === this.element) return;
				const target = slots[getSortableGridSlot(idx, from, to)];
				const x = target.left - slots[idx].left;
				const y = target.top - slots[idx].top;
				item.style.transform = x || y ? `translate(${x}px, ${y}px)` : "";
			});
		}
		this.scrollToEdge(xDiff, yDiff);
	}
	/**
	* Scrolls on a little while the element, shifted by `x` and `y` from its place, reaches over an
	* edge of the scrollable - along the line for a line, down the page for a grid. Physical
	* coordinates throughout: the rects are, and `scrollLeft` moves the view right in either direction.
	*/
	scrollToEdge(x, y) {
		if (!this.scrollableRect) return;
		const isX = this.axis === "x";
		const start = (isX ? this.elementRect.left + x : this.elementRect.top + y) - this.addScrollPos;
		const end = start + (isX ? this.elementRect.width : this.elementRect.height);
		let change;
		if (end >= (isX ? this.scrollableRect.right : this.scrollableRect.bottom)) change = 2;
		else if (start <= (isX ? this.scrollableRect.left : this.scrollableRect.top)) change = -2;
		if (change) this.scrollable.container[isX ? "scrollLeft" : "scrollTop"] += change;
	}
	/** The scrollable's offset along the list's axis, physical: what the element's layout moves by */
	getScrollPos() {
		const container = this.scrollable.container;
		return this.axis === "x" ? container.scrollLeft : container.scrollTop;
	}
	/**
	* Drops the gesture under way, if there is one: what it moved goes back to its place and nothing is
	* sorted - for a list whose mode ends while an element is held
	*/
	cancel() {
		if (!this.element) return;
		this.cancelled = true;
		this.swipeHandler.reset();
	}
	/** The visual half of the start, deferred until the pointer has travelled `threshold` */
	pickUp() {
		this.pickedUp = true;
		this.list.classList.add("is-reordering");
		this.element.classList.add("is-dragging", "no-transition");
		this.swipeHandler.setCursor("grabbing");
		this.elementRect = this.element.getBoundingClientRect();
		this.addScrollPos = 0;
		if (this.axis === "x") {
			const style = getComputedStyle(this.list);
			this.inlineSign = style.direction === "rtl" ? -1 : 1;
			this.gap = parseFloat(style.columnGap) || 0;
		} else if (this.axis === "grid") {
			this.items = getSortableRun(this.element, this.sortableClassName);
			this.slots = this.items.map((item) => item.getBoundingClientRect());
			this.from = this.to = this.items.indexOf(this.element);
		}
		if (this.scrollable) {
			this.startScrollPos = this.getScrollPos();
			this.scrollableRect = this.scrollable.container.getBoundingClientRect();
			this.scrollable.container.addEventListener("scroll", this.onScroll);
		}
	}
	clearState() {
		this.pickedUp = false;
		this.pickUpX = this.pickUpY = this.slots = this.from = this.to = this.inlineSign = this.gap = this.element = this.siblings = this.items = this.elementRect = this.minY = this.maxY = this.passedHeight = this.moveDirection = this.startScrollPos = this.addScrollPos = void 0;
	}
	getSortableTarget(target) {
		if (!target) return;
		const child = findUpAsChild(target, this.list);
		return isSortableElement(child, this.sortableClassName) ? child : void 0;
	}
};
//#endregion
export { swallowNextClick as i, Sortable as n, getSortableRun as r, PRESSABLE_DRAG_THRESHOLD as t };
