//# allFunctionsCalledOnLoad
import { n as fastRaf } from "./schedulers-Cx0-7a1P.js";
import { i as onAppWindowChange } from "./appWindow-bo-KtJhy.js";
import { t as liteMode } from "./liteMode-DeLStZfQ.js";
import { t as sequentialDom } from "./sequentialDom-CRhA0kB2.js";
import { t as getMiddleware } from "./middleware-D6HuIqPm.js";
import { d as getLayoutWidth, u as isInSight } from "./animations-DCmLIda3.js";
//#region src/components/animatedSuper.ts
var _AnimatedSuper;
/**
* Calls `callback` `duration` ms after the frame that renders the change just made to `element`, where
* the transitions it set off start, and not after the change itself: a long task between the two (a paid
* reaction's effect starting) would have it cut them short. Returns what cancels it
*/
function afterTransition(element, duration, callback) {
	const view = element.ownerDocument.defaultView ?? window;
	let timeout, isOver = false;
	const over = () => {
		isOver = true;
		stopFollowing();
	};
	const done = () => {
		if (isOver) return;
		over();
		callback();
	};
	const stopFollowing = onAppWindowChange(done);
	const frame = view.requestAnimationFrame(() => timeout = view.setTimeout(done, duration));
	return () => {
		if (isOver) return;
		over();
		view.cancelAnimationFrame(frame);
		view.clearTimeout(timeout);
	};
}
var AnimatedSuper = class AnimatedSuper {
	constructor(options) {
		this.rows = {};
		this.duration = options?.duration ?? AnimatedSuper.DEFAULT_DURATION;
		this.container = document.createElement("div");
		this.container.className = AnimatedSuper.BASE_CLASS;
	}
	getRow(index, animateFirst = false) {
		if (this.rows[index]) return this.rows[index].element;
		const row = document.createElement("div");
		const isFirst = !Object.keys(this.rows).length && !animateFirst;
		row.className = AnimatedSuper.BASE_CLASS + "-row" + (isFirst ? "" : " is-hiding hide");
		this.rows[index] = {
			element: row,
			middleware: row.middlewareHelper = getMiddleware(),
			new: true
		};
		this.container.append(row);
		return row;
	}
	/** Shows the row of `index` at once, with no transition, and drops every other */
	setRow(index) {
		this.cancelClear?.();
		this.destroy();
		const row = this.getRow(index);
		delete this.rows[index].new;
		return row;
	}
	clearRow(index) {
		if (!this.rows[index]) return;
		this.rows[index].element.remove();
		this.rows[index].middleware.destroy();
		delete this.rows[index];
	}
	clearRows(currentIndex) {
		this.cancelClear?.();
		this.cancelClear = afterTransition(this.container, this.duration, () => {
			for (const i in this.rows) {
				if (i === "" + currentIndex) continue;
				this.clearRow(i);
			}
		});
	}
	setNewRow(index) {
		const row = this.rows[index];
		if (row.new) {
			row.element.classList.remove("is-hiding", "hide");
			delete row.new;
		}
		this.clearRows(index);
	}
	animate(index, previousIndex, fromTop = +index > +previousIndex, ignorePrevious = false) {
		if (index === previousIndex) return this.setNewRow(index);
		if (!this.rows[previousIndex] && !ignorePrevious) return this.setNewRow(index);
		if (this.prepare(index, previousIndex, fromTop)) this.rows[index].element.offsetLeft;
		this.flip(index, previousIndex);
	}
	/**
	* Readies the change from `previousIndex` to `index` that `flip` makes: each row on its side,
	* the coming one in place but still hidden. Returns whether that one is new - and so has to be
	* styled where it comes from before the flip, which `animate` reflows for, and which a caller
	* readying many changes at once can wait a frame for
	*/
	prepare(index, previousIndex, fromTop) {
		this.cancelClear?.();
		const row = this.rows[index];
		const previousRow = this.rows[previousIndex];
		const sides = ["from-top", "from-bottom"];
		if (!fromTop) sides.reverse();
		row.element.classList.add(sides[0]);
		row.element.classList.remove(sides[1]);
		if (previousRow) {
			previousRow.element.classList.add(sides[1]);
			previousRow.element.classList.remove(sides[0]);
		}
		if (!row.new) return false;
		row.element.classList.remove("hide");
		return true;
	}
	flip(index, previousIndex) {
		const row = this.rows[index];
		delete row.new;
		row.element.classList.remove("is-hiding");
		this.rows[previousIndex]?.element.classList.add("is-hiding");
		this.clearRows(index);
	}
	destroy() {
		for (const i in this.rows) this.clearRow(i);
	}
};
_AnimatedSuper = AnimatedSuper;
_AnimatedSuper.BASE_CLASS = "animated-super";
_AnimatedSuper.DEFAULT_DURATION = 200;
//#endregion
//#region src/components/animatedCounter.ts
var _AnimatedCounter;
/** a character that stays put is not written again, and changes nothing to lay out */
function writeText(element, text) {
	if (element.textContent !== text) element.textContent = text;
}
var AnimatedCounter = class AnimatedCounter {
	constructor(options) {
		this.decimals = [];
		this.previousNumber = 0;
		this.previousText = "0";
		this.reverse = options.reverse;
		this.duration = options.duration ?? AnimatedSuper.DEFAULT_DURATION;
		this.container = document.createElement("div");
		this.container.className = AnimatedCounter.BASE_CLASS;
		this.calculateWidth = options.calculateWidth;
		if (this.calculateWidth) this.container.classList.add("animated-counter-dynamic-width");
		if (options.prefix) {
			const prefixContainer = document.createElement("div");
			prefixContainer.className = AnimatedCounter.BASE_CLASS + "-decimal-prefix";
			prefixContainer.innerText = this.prefix = options.prefix;
			this.container.append(prefixContainer);
			this.prefixContainer = prefixContainer;
		}
	}
	getDecimal(index) {
		if (this.decimals[index]) return this.decimals[index];
		const item = document.createElement("div");
		item.className = AnimatedCounter.BASE_CLASS + "-decimal";
		const placeholder = document.createElement("div");
		placeholder.className = AnimatedCounter.BASE_CLASS + "-decimal-placeholder";
		const animatedSuper = new AnimatedSuper({ duration: this.duration });
		animatedSuper.container.className = AnimatedCounter.BASE_CLASS + "-decimal-wrapper";
		item.append(placeholder, animatedSuper.container);
		this.container.append(item);
		return this.decimals[index] = {
			container: item,
			placeholder,
			animatedSuper
		};
	}
	clear(length) {
		this.cancelClear?.();
		if (length >= this.decimals.length) return;
		this.cancelClear = afterTransition(this.container, this.duration, () => {
			this.decimals.splice(length, this.decimals.length - length).forEach((decimal) => {
				decimal.container.remove();
			});
		});
	}
	setCount(number, noRaf) {
		this.setText("" + number, number - this.previousNumber, noRaf);
		this.previousNumber = number;
	}
	/**
	* Shows `text`, rolling each character that differs from the one in its place, so it takes
	* any short text and not only the digits of a number (`1.2K`, `@`). `direction` is the sign of
	* the change of the value behind it - what decides which way they roll (`putText` puts a text
	* in at once)
	*/
	setText(text, direction, noRaf) {
		if (this.prepare(text, direction)) this.container.offsetLeft;
		this.commit(noRaf);
	}
	/** Puts `text` in at once - and only it: the width follows on `updateWidth` */
	putText(text) {
		this.cancelClear?.();
		this.prepared = void 0;
		const chars = Array.from(text);
		chars.forEach((char, idx) => {
			const decimal = this.getDecimal(idx);
			decimal.animatedSuper.setRow(char).textContent = decimal.placeholder.textContent = char;
		});
		this.decimals.splice(chars.length).forEach((decimal) => {
			decimal.animatedSuper.destroy();
			decimal.container.remove();
		});
		this.previousText = text;
	}
	/**
	* Readies the roll to `text` that `commit` makes: the rows of the characters that come in are
	* put in their places, still hidden. Returns whether one of them is new - and so has to be
	* styled before the commit, which `setText` reflows for, and which a caller readying many
	* counters can wait a frame for, all of them at once (`setRollingText`)
	*/
	prepare(text, direction) {
		this.cancelClear?.();
		const fromTop = this.reverse ? direction < 0 : direction > 0;
		const previousChars = Array.from(this.previousText);
		const chars = Array.from(text);
		const flips = [];
		let hasNewRows = false;
		const ready = (animatedSuper, index, previousIndex) => {
			if (index === previousIndex) {
				flips.push(() => animatedSuper.setNewRow(index));
				return;
			}
			hasNewRows = animatedSuper.prepare(index, previousIndex, fromTop) || hasNewRows;
			flips.push(() => animatedSuper.flip(index, previousIndex));
		};
		chars.forEach((char, idx) => {
			const { animatedSuper } = this.getDecimal(idx);
			writeText(animatedSuper.getRow(char, true), char);
			ready(animatedSuper, char, previousChars[idx] ?? AnimatedCounter.EMPTY_INDEX);
		});
		this.decimals.slice(chars.length).forEach(({ animatedSuper, placeholder }) => {
			animatedSuper.getRow(AnimatedCounter.EMPTY_INDEX, true);
			ready(animatedSuper, AnimatedCounter.EMPTY_INDEX, placeholder.textContent);
		});
		this.prepared = {
			text,
			flips
		};
		return hasNewRows;
	}
	/** Makes the roll `prepare` readied */
	commit(noRaf) {
		const { text, flips } = this.prepared;
		this.prepared = void 0;
		const chars = Array.from(text);
		chars.forEach((char, idx) => {
			writeText(this.decimals[idx].placeholder, char);
		});
		flips.forEach((flip) => flip());
		this.clear(chars.length);
		this.previousText = text;
		this.updateWidth(noRaf);
	}
	/** How wide the text it last put in is - a read of the layout */
	measureWidth() {
		const { calculateWidth } = this;
		if (typeof calculateWidth !== "boolean") return calculateWidth((this.prefix || "") + this.previousText);
		let width = this.prefixContainer ? getLayoutWidth(this.prefixContainer) : 0;
		for (let i = 0, length = Array.from(this.previousText).length; i < length; ++i) width += getLayoutWidth(this.decimals[i].container);
		return width;
	}
	setWidth(width) {
		this.container.style.setProperty("--animated-counter-width", width + "px");
	}
	/**
	* Makes it as wide as its text - at once, or in the next frame, where the counters read their
	* widths all before any of them writes one
	*/
	updateWidth(noRaf) {
		if (!this.calculateWidth) return;
		if (noRaf) {
			this.setWidth(this.measureWidth());
			return;
		}
		let width;
		sequentialDom.measure(() => width = this.measureWidth());
		sequentialDom.mutate(() => this.setWidth(width));
	}
	destroy() {
		this.cancelClear?.();
		this.decimals.forEach((decimal) => {
			decimal.animatedSuper.destroy();
		});
	}
};
_AnimatedCounter = AnimatedCounter;
_AnimatedCounter.EMPTY_INDEX = -1;
_AnimatedCounter.BASE_CLASS = "animated-counter";
var rollingTexts = /* @__PURE__ */ new WeakMap();
/** the elements whose rolls were readied since the last frame began */
var readied = /* @__PURE__ */ new Set();
function settle(element, rolling) {
	clearTimeout(rolling.timeout);
	rolling.counter.destroy();
	rollingTexts.delete(element);
	element.classList.remove("is-rolling");
	element.textContent = rolling.text;
}
/**
* Puts in motion the rolls readied before a frame that has rendered them since, in the measure and
* mutate phases of the next flush (`sequentialDom`): every read of the layout before any write
*/
function commitRolls(batch) {
	const isCurrent = ([element, rolling, version]) => {
		return rollingTexts.get(element) === rolling && rolling.version === version;
	};
	let reads;
	sequentialDom.measure(() => {
		batch = batch.filter(isCurrent);
		reads = batch.map(([element, rolling]) => {
			const inSight = isInSight(element);
			return {
				inSight,
				width: inSight && rolling.isSeeded ? rolling.counter.measureWidth() : void 0
			};
		});
	});
	sequentialDom.mutate(() => batch.forEach((entry, i) => {
		const [element, rolling] = entry;
		if (!isCurrent(entry)) return;
		const { inSight, width } = reads[i];
		if (!inSight) {
			settle(element, rolling);
			return;
		}
		if (width !== void 0) {
			rolling.counter.setWidth(width);
			rolling.isSeeded = false;
		}
		rolling.counter.commit();
		rolling.timeout = window.setTimeout(() => settle(element, rolling), rolling.counter.duration + 100);
	}));
}
/**
* Writes `text` into an element that holds nothing but it, such as a counter badge, rolling the
* characters that change the way `AnimatedCounter` does. The counter is there only for the roll:
* before it and after it the element holds the plain text, so a list that wears such a badge on
* every row pays nothing for the rows that stand still, and the text reads as it always did.
*
* Nor does a roll read the layout while the caller writes to it: the counter is readied at once,
* and the rolls of every element readied before a frame are put in motion together by the next
* one - `commitRolls`
*/
function setRollingText({ element, text, direction, animate }) {
	let rolling = rollingTexts.get(element);
	if (text === (rolling ? rolling.text : element.textContent)) return;
	if (!animate || document.hidden || !element.isConnected || !liteMode.isAvailable("motion")) {
		if (rolling) {
			rolling.text = text;
			settle(element, rolling);
		} else element.textContent = text;
		return;
	}
	if (rolling) clearTimeout(rolling.timeout);
	else {
		const counter = new AnimatedCounter({
			reverse: true,
			calculateWidth: true
		});
		counter.container.setAttribute("aria-hidden", "true");
		counter.putText(element.textContent);
		const label = document.createElement("span");
		label.className = "sr-only";
		element.replaceChildren(counter.container, label);
		element.classList.add("is-rolling");
		rollingTexts.set(element, rolling = {
			counter,
			label,
			text,
			version: 0,
			isSeeded: true,
			timeout: 0
		});
	}
	rolling.counter.prepare(text, direction);
	rolling.label.textContent = rolling.text = text;
	++rolling.version;
	const isScheduled = !!readied.size;
	readied.add(element);
	if (isScheduled) return;
	fastRaf(() => {
		const batch = [];
		readied.forEach((element) => {
			const rolling = rollingTexts.get(element);
			if (rolling) batch.push([
				element,
				rolling,
				rolling.version
			]);
		});
		readied = /* @__PURE__ */ new Set();
		fastRaf(() => commitRolls(batch));
	});
}
//#endregion
export { setRollingText as n, AnimatedSuper as r, AnimatedCounter as t };
