//# allFunctionsCalledOnLoad
import { a as i18n, u as langPack_default } from "./langPack-BmdJGr44.js";
import { C as createSignal, M as onCleanup, _ as createMemo, a as Index, g as createEffect, i as For, j as on, p as createComponent, s as Show, w as createUniqueId, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { n as getAppWindow } from "./appWindow-bo-KtJhy.js";
import { _ as use, a as classList, c as insert, f as setAttribute, g as template, o as className, s as delegateEvents } from "./web-BPyQozky.js";
import { t as liteMode } from "./liteMode-DeLStZfQ.js";
import { t as classNames } from "./classNames-DxGDjmvw.js";
import { t as shake } from "./shake-1vPuqgfm.js";
var wordFields_module_default = {
	grid: "_grid_bo37y_21",
	gridColumns: "_gridColumns_bo37y_31",
	gridShort: "_gridShort_bo37y_37",
	field: "_field_bo37y_41",
	fieldMismatched: "_fieldMismatched_bo37y_59",
	number: "_number_bo37y_67",
	fieldFilled: "_fieldFilled_bo37y_78",
	input: "_input_bo37y_82",
	paste: "_paste_bo37y_95",
	bubble: "_bubble_bo37y_109",
	bubbleVisible: "_bubbleVisible_bo37y_125",
	items: "_items_bo37y_133",
	item: "_item_bo37y_133",
	itemSelected: "_itemSelected_bo37y_169",
	itemMatch: "_itemMatch_bo37y_173",
	itemInvalid: "_itemInvalid_bo37y_177"
};
//#endregion
//#region src/components/wallet/screens/wordFields.tsx
var _tmpl$ = /*#__PURE__*/ template(`<div><div><div class="tooltip-part tooltip-background"></div><span class="tooltip-part tooltip-notch"></span><div>`);
var _tmpl$2 = /*#__PURE__*/ template(`<button type=button>`);
var _tmpl$3 = /*#__PURE__*/ template(`<label><span aria-hidden=true>.</span><input type=text autocomplete=off autocapitalize=off aria-autocomplete=list>`);
var _tmpl$4 = /*#__PURE__*/ template(`<button type=button role=option tabindex=-1><span>`);
var _tmpl$5 = /*#__PURE__*/ template(`<span role=alert>`);
/**
* The numbered word fields of iOS's import and "Test Time" screens (WalletImportScreen): suggestions from the word
* list in a bubble under the field being typed in, Space and Enter going on to the next field, Backspace in an empty
* one going back, a word that is no word refusing to be left, a phrase pasted (or typed) at once spread over the
* fields.
*/
/** the most suggestions a bubble holds (iOS) */
var SUGGESTIONS = 3;
/** suggestions start at this many letters (iOS) */
var SUGGEST_FROM = 2;
function normalizeWalletWord(word) {
	return word.trim().toLowerCase();
}
var QUOTES = "\"'“”‘’«»";
var LEADING_FORMATTING = "•-–—*" + QUOTES;
function stripFormatting(token) {
	let start = 0;
	while (start < token.length && LEADING_FORMATTING.includes(token[start])) ++start;
	let end = token.length;
	while (end > start && QUOTES.includes(token[end - 1])) --end;
	return token.slice(start, end);
}
/**
* The words of a pasted phrase (iOS: parseWalletPastedWords). Words split at whitespace, commas and semicolons;
* bullets, dashes and quotes around them go, and so does a number before each — `1.`, `1)`, `1:`, `(1)`, `[1]` or a
* lone `1`. A complete, unambiguous numbered list of 12 or 24 is put back in order: a phrase copied from two columns
* may come row by row.
*/
function parseWalletPastedWords(text) {
	const words = [];
	let pendingNumber;
	let hasExtraNumbers = false;
	for (const sourceToken of text.split(/[\s,;]+/)) {
		let token = stripFormatting(sourceToken);
		if (!token) continue;
		let numberToken = token;
		let closingBracket;
		if (numberToken[0] === "(" || numberToken[0] === "[") {
			closingBracket = numberToken[0] === "(" ? ")" : "]";
			numberToken = numberToken.slice(1);
		}
		const digits = numberToken.match(/^\d+/)?.[0];
		if (digits) {
			const suffix = numberToken.slice(digits.length);
			let wordAfterNumber;
			if (closingBracket) {
				if (suffix[0] === closingBracket) wordAfterNumber = suffix.slice(1);
			} else if (!suffix) wordAfterNumber = suffix;
			else if (suffix[0] === "." || suffix[0] === ")" || suffix[0] === ":") wordAfterNumber = suffix.slice(1);
			if (wordAfterNumber !== void 0) {
				if (pendingNumber !== void 0) hasExtraNumbers = true;
				pendingNumber = +digits <= Number.MAX_SAFE_INTEGER ? +digits : 0;
				token = stripFormatting(wordAfterNumber);
			}
		}
		if (token) {
			words.push({
				number: pendingNumber,
				word: token.toLowerCase()
			});
			pendingNumber = void 0;
		}
	}
	if ((words.length === 12 || words.length === 24) && !hasExtraNumbers && pendingNumber === void 0) {
		const numbers = new Set(words.map((item) => item.number));
		let complete = numbers.size === words.length;
		for (let i = 1; complete && i <= words.length; ++i) complete = numbers.has(i);
		if (complete) words.sort((a, b) => a.number - b.number);
	}
	return words.map((item) => item.word);
}
function WalletWordFields(props) {
	const [active, setActive] = createSignal();
	const inputs = [];
	const fields = [];
	let grid, bubble, invalidItem;
	let moving = false;
	const isInvalid = (index) => {
		const word = props.words()[index];
		const list = props.wordlist();
		return !!word && !!list.size && !list.has(word);
	};
	const suggestions = createMemo(() => {
		const index = active();
		const word = index === void 0 ? "" : props.words()[index] || "";
		const list = props.wordlist();
		if (word.length < SUGGEST_FROM || !list.size) return;
		const found = [];
		for (const item of list) if (item.startsWith(word)) {
			found.push(item);
			if (found.length === SUGGESTIONS) break;
		}
		if (!found.length && !list.has(word)) return {
			words: [langPack_default.format("Wallet.Import.InvalidWord", true)],
			invalid: true,
			query: word
		};
		if (found.length === 1 && found[0] === word) return;
		return found.length ? {
			words: found,
			query: word
		} : void 0;
	});
	const [shown, setShown] = createSignal();
	createEffect(() => {
		const value = suggestions();
		if (value) setShown(value);
	});
	const [pick, setPick] = createSignal();
	const picked = () => {
		const value = pick();
		return value && value.list === shown() ? value.index : 0;
	};
	const pickedWord = () => suggestions()?.words[picked()];
	const listboxId = createUniqueId();
	const optionId = (index) => `${listboxId}-${index}`;
	const focus = (index, select = true) => {
		const input = inputs[index];
		if (!input) return;
		moving = true;
		input.focus();
		moving = false;
		if (select && input.value) input.select();
	};
	const pulse = () => {
		if (!liteMode.isAvailable("motion") || !invalidItem) return;
		invalidItem.animate([
			{ transform: "scale(1)" },
			{ transform: "scale(1.04)" },
			{ transform: "scale(1)" }
		], {
			duration: 200,
			easing: "ease-in-out"
		});
	};
	const reject = (index) => {
		shake(fields[index]);
		pulse();
	};
	const accept = (index, word, advance) => {
		props.setWord(index, word);
		if (inputs[index]) inputs[index].value = word;
		if (advance) advanceFrom(index);
	};
	const advanceFrom = (index) => {
		if (!normalizeWalletWord(inputs[index]?.value || "")) {
			shake(fields[index]);
			return;
		}
		if (isInvalid(index)) {
			reject(index);
			return;
		}
		if (index + 1 < props.numbers.length) focus(index + 1);
	};
	const onReturn = (index, submit) => {
		const current = suggestions();
		if (active() === index && current && !current.invalid) accept(index, pickedWord(), false);
		if (submit && index === props.numbers.length - 1 && props.canSubmit()) props.onSubmit();
		else advanceFrom(index);
	};
	const onKeyDown = (index, e) => {
		if (e.isComposing) return;
		if (e.key === " " || e.key === "Enter") {
			e.preventDefault();
			onReturn(index, e.key === "Enter");
		} else if (e.key === "Tab" && !e.shiftKey && suggestions() && !suggestions().invalid) {
			if (pickedWord() === normalizeWalletWord(inputs[index].value)) {
				accept(index, pickedWord(), false);
				return;
			}
			e.preventDefault();
			accept(index, pickedWord(), true);
		} else if ((e.key === "ArrowDown" || e.key === "ArrowUp") && suggestions()?.words.length > 1 && !suggestions().invalid) {
			e.preventDefault();
			const count = suggestions().words.length;
			setPick({
				list: suggestions(),
				index: (picked() + (e.key === "ArrowDown" ? 1 : count - 1)) % count
			});
		} else if (e.key === "Tab" && isInvalid(index)) {
			e.preventDefault();
			reject(index);
		} else if (e.key === "Backspace" && !inputs[index].value && index > 0) {
			e.preventDefault();
			focus(index - 1);
		}
	};
	const onInput = (index, input) => {
		const value = input.value;
		if (/[\s,;]/.test(value.trim())) {
			const words = parseWalletPastedWords(value);
			if (words.length > 1) {
				input.value = props.words()[index] || "";
				props.onWords(index, words);
				return;
			}
		}
		const word = normalizeWalletWord(value);
		if (word && /\s$/.test(value)) {
			accept(index, word, true);
			return;
		}
		if (word !== value) input.value = word;
		const longer = word.length > (props.words()[index] || "").length;
		props.setWord(index, word);
		if (longer && suggestions()?.invalid) pulse();
	};
	const onPaste = (index, e) => {
		const text = e.clipboardData?.getData("text/plain") || "";
		const words = parseWalletPastedWords(text);
		if (words.length === 1 && words[0] === normalizeWalletWord(text)) return;
		e.preventDefault();
		if (words.length > 1) props.onWords(index, words);
		else if (words.length) accept(index, words[0], false);
	};
	const onFocus = (index) => {
		setActive(index);
		const input = inputs[index];
		if (input.value) setTimeout(() => input.ownerDocument.activeElement === input && input.select(), 0);
	};
	const onBlur = (index, e) => {
		const to = e.relatedTarget;
		if (!moving && to && inputs.includes(to) && isInvalid(index)) {
			queueMicrotask(() => focus(index, false));
			reject(index);
			return;
		}
		if (active() === index) setActive(void 0);
	};
	createEffect(on([active, shown], ([index]) => {
		if (index === void 0 || !bubble || !fields[index]) return;
		const field = fields[index];
		const fieldLeft = field.offsetLeft, fieldWidth = field.offsetWidth, fieldBottom = field.offsetTop + field.offsetHeight;
		const width = bubble.offsetWidth, gridWidth = grid.clientWidth;
		const center = fieldLeft + fieldWidth / 2;
		const left = Math.max(0, Math.min(gridWidth - width, center - width / 2));
		bubble.style.left = left + "px";
		bubble.style.top = fieldBottom + "px";
		bubble.style.setProperty("--notch-offset", center - left - 19 / 2 + "px");
	}));
	props.ref?.({
		focus,
		shake: (index) => shake(fields[index]),
		blur: () => getAppWindow().document.activeElement?.blur()
	});
	onCleanup(() => inputs.length = 0);
	const bubbleVisible = () => !!suggestions() && active() !== void 0;
	return (() => {
		var _el$ = _tmpl$(), _el$2 = _el$.firstChild, _el$5 = _el$2.firstChild.nextSibling.nextSibling;
		var _ref$ = grid;
		typeof _ref$ === "function" ? use(_ref$, _el$) : grid = _el$;
		insert(_el$, createComponent(Index, {
			get each() {
				return props.numbers;
			},
			children: (number, index) => (() => {
				var _el$6 = _tmpl$3(), _el$7 = _el$6.firstChild, _el$8 = _el$7.firstChild, _el$9 = _el$7.nextSibling;
				use((element) => fields[index] = element, _el$6);
				insert(_el$7, number, _el$8);
				_el$9.addEventListener("blur", (e) => onBlur(index, e));
				_el$9.addEventListener("focus", () => onFocus(index));
				_el$9.$$keydown = (e) => onKeyDown(index, e);
				_el$9.addEventListener("paste", (e) => onPaste(index, e));
				_el$9.$$input = (e) => onInput(index, e.currentTarget);
				use((element) => inputs[index] = element, _el$9);
				setAttribute(_el$9, "spellcheck", false);
				setAttribute(_el$9, "aria-controls", listboxId);
				insert(_el$6, createComponent(Show, {
					get when() {
						return index === 0 && props.paste?.shown();
					},
					get children() {
						var _el$0 = _tmpl$2();
						_el$0.$$click = () => props.paste.onClick();
						_el$0.$$mousedown = (e) => e.preventDefault();
						insert(_el$0, () => i18n("WalletPaste"));
						createRenderEffect(() => className(_el$0, wordFields_module_default.paste));
						return _el$0;
					}
				}), null);
				createRenderEffect((_p$) => {
					var _v$8 = wordFields_module_default.field, _v$9 = {
						[wordFields_module_default.fieldFilled]: !!props.words()[index],
						[wordFields_module_default.fieldMismatched]: !!props.mismatched?.().has(index)
					}, _v$0 = wordFields_module_default.number, _v$1 = wordFields_module_default.input, _v$10 = index === props.numbers.length - 1 ? "done" : "next", _v$11 = props.disabled, _v$12 = langPack_default.format("Wallet.Restore.Word", true, [number()]), _v$13 = props.mismatched?.().has(index) || isInvalid(index) || void 0, _v$14 = active() === index && bubbleVisible() && !shown()?.invalid ? optionId(picked()) : void 0;
					_v$8 !== _p$.e && className(_el$6, _p$.e = _v$8);
					_p$.t = classList(_el$6, _v$9, _p$.t);
					_v$0 !== _p$.a && className(_el$7, _p$.a = _v$0);
					_v$1 !== _p$.o && className(_el$9, _p$.o = _v$1);
					_v$10 !== _p$.i && setAttribute(_el$9, "enterkeyhint", _p$.i = _v$10);
					_v$11 !== _p$.n && (_el$9.disabled = _p$.n = _v$11);
					_v$12 !== _p$.s && setAttribute(_el$9, "aria-label", _p$.s = _v$12);
					_v$13 !== _p$.h && setAttribute(_el$9, "aria-invalid", _p$.h = _v$13);
					_v$14 !== _p$.r && setAttribute(_el$9, "aria-activedescendant", _p$.r = _v$14);
					return _p$;
				}, {
					e: void 0,
					t: void 0,
					a: void 0,
					o: void 0,
					i: void 0,
					n: void 0,
					s: void 0,
					h: void 0,
					r: void 0
				});
				createRenderEffect(() => _el$9.value = props.words()[index] || "");
				return _el$6;
			})()
		}), _el$2);
		var _ref$2 = bubble;
		typeof _ref$2 === "function" ? use(_ref$2, _el$2) : bubble = _el$2;
		setAttribute(_el$5, "id", listboxId);
		insert(_el$5, createComponent(For, {
			get each() {
				return shown()?.words;
			},
			children: (word, index) => createComponent(Show, {
				get when() {
					return !shown().invalid;
				},
				get fallback() {
					return (() => {
						var _el$11 = _tmpl$5();
						var _ref$3 = invalidItem;
						typeof _ref$3 === "function" ? use(_ref$3, _el$11) : invalidItem = _el$11;
						insert(_el$11, word);
						createRenderEffect(() => className(_el$11, classNames(wordFields_module_default.item, wordFields_module_default.itemInvalid)));
						return _el$11;
					})();
				},
				get children() {
					var _el$1 = _tmpl$4(), _el$10 = _el$1.firstChild;
					_el$1.$$click = () => {
						const field = active();
						if (field !== void 0) accept(field, word, true);
					};
					_el$1.$$mousedown = (e) => e.preventDefault();
					insert(_el$10, () => word.slice(0, shown().query.length));
					insert(_el$1, () => word.slice(shown().query.length), null);
					createRenderEffect((_p$) => {
						var _v$15 = optionId(index()), _v$16 = wordFields_module_default.item, _v$17 = { [wordFields_module_default.itemSelected]: index() === picked() && shown().words.length > 1 }, _v$18 = index() === picked(), _v$19 = wordFields_module_default.itemMatch;
						_v$15 !== _p$.e && setAttribute(_el$1, "id", _p$.e = _v$15);
						_v$16 !== _p$.t && className(_el$1, _p$.t = _v$16);
						_p$.a = classList(_el$1, _v$17, _p$.a);
						_v$18 !== _p$.o && setAttribute(_el$1, "aria-selected", _p$.o = _v$18);
						_v$19 !== _p$.i && className(_el$10, _p$.i = _v$19);
						return _p$;
					}, {
						e: void 0,
						t: void 0,
						a: void 0,
						o: void 0,
						i: void 0
					});
					return _el$1;
				}
			})
		}));
		createRenderEffect((_p$) => {
			var _v$ = classNames(wordFields_module_default.grid, props.columns && wordFields_module_default.gridColumns, props.columns && props.numbers.length <= 12 && wordFields_module_default.gridShort), _v$2 = classNames("tooltip", "tooltip-bottom", "tooltip-lighter", "is-visible", "forwards", wordFields_module_default.bubble), _v$3 = { [wordFields_module_default.bubbleVisible]: bubbleVisible() }, _v$4 = !bubbleVisible() || void 0, _v$5 = classNames("tooltip-part", wordFields_module_default.items), _v$6 = shown()?.invalid ? void 0 : "listbox", _v$7 = shown()?.invalid ? void 0 : langPack_default.format("Wallet.Restore.Suggestions", true);
			_v$ !== _p$.e && className(_el$, _p$.e = _v$);
			_v$2 !== _p$.t && className(_el$2, _p$.t = _v$2);
			_p$.a = classList(_el$2, _v$3, _p$.a);
			_v$4 !== _p$.o && setAttribute(_el$2, "aria-hidden", _p$.o = _v$4);
			_v$5 !== _p$.i && className(_el$5, _p$.i = _v$5);
			_v$6 !== _p$.n && setAttribute(_el$5, "role", _p$.n = _v$6);
			_v$7 !== _p$.s && setAttribute(_el$5, "aria-label", _p$.s = _v$7);
			return _p$;
		}, {
			e: void 0,
			t: void 0,
			a: void 0,
			o: void 0,
			i: void 0,
			n: void 0,
			s: void 0
		});
		return _el$;
	})();
}
delegateEvents([
	"input",
	"keydown",
	"mousedown",
	"click"
]);
//#endregion
export { normalizeWalletWord as n, parseWalletPastedWords as r, WalletWordFields as t };
