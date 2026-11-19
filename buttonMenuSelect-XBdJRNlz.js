//# allFunctionsCalledOnLoad
import { r as fastRafPromise, t as doubleRaf } from "./schedulers-Cx0-7a1P.js";
import { n as rootScope } from "./rootScope-CZS0lmz8.js";
import { a as i18n } from "./langPack-BmdJGr44.js";
import { C as createSignal, I as splitProps, M as onCleanup, N as onMount, _ as createMemo, g as createEffect, i as For, j as on, p as createComponent, s as Show, x as createRoot, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { n as getAppWindow, r as getOverlayRoot } from "./appWindow-bo-KtJhy.js";
import { _ as use, c as insert, f as setAttribute, g as template, o as className, p as setStyleProperty, r as addEventListener, s as delegateEvents, u as memo } from "./web-BPyQozky.js";
import { M as LazyLoadQueue } from "./renderer-L80wjxct.js";
import { t as classNames } from "./classNames-DxGDjmvw.js";
import { t as IconTsx } from "./iconTsx-B4lOk4A6.js";
import { r as resolveFirst } from "./dist-Fd6wPWkH.js";
import { t as I18nTsx } from "./i18n-CGMFiAW0.js";
import { t as Scrollable } from "./scrollable2-Bau9Hoih.js";
import { t as buttonKeyDown } from "./buttonKeyDown-CqZzefS3.js";
import { n as attachClickEvent } from "./clickEvent-COk4YpLP.js";
import { f as positionFloatingMenu, m as positionMenuTrigger, wn as contextMenuController } from "./confirmationPopup-Bz6mK0o-.js";
import { s as SuperStickerRenderer } from "./openEditors-7FmA7q_V.js";
//#region src/components/buttonMenuSelect.tsx
var _tmpl$ = /*#__PURE__*/ template(`<span class=btn-menu-select-text-faded>`);
var _tmpl$2 = /*#__PURE__*/ template(`<div class="btn-menu-item btn-menu-search"><input type=text class=btn-menu-item-input>`);
var _tmpl$3 = /*#__PURE__*/ template(`<div class=btn-menu-search-delimiter>`);
var _tmpl$4 = /*#__PURE__*/ template(`<div class=btn-menu-item role=option tabindex=0>`);
var _tmpl$5 = /*#__PURE__*/ template(`<div role=listbox>`);
var _tmpl$6 = /*#__PURE__*/ template(`<div class="btn-menu-item is-static"aria-disabled=true><span class=btn-menu-item-icon></span><span class=btn-menu-item-text>`);
var _tmpl$7 = /*#__PURE__*/ template(`<div><div class=btn-menu-search-scrollable>`);
function normalizeSearchText(text) {
	let normalized = "";
	const sourcePositions = [];
	for (let i = 0; i < text.length; ++i) {
		const normalizedCharacter = text[i].toLowerCase().replace(/[\s+/\\_-]/g, "");
		for (let j = 0; j < normalizedCharacter.length; ++j) {
			normalized += normalizedCharacter[j];
			sourcePositions.push(i);
		}
	}
	return {
		normalized,
		sourcePositions
	};
}
function findButtonMenuSelectHighlight(text, search) {
	const normalizedSearch = normalizeSearchText(search).normalized;
	if (!normalizedSearch) return;
	const normalizedText = normalizeSearchText(text);
	const index = normalizedText.normalized.indexOf(normalizedSearch);
	if (index === -1) return;
	const start = normalizedText.sourcePositions[index];
	const last = normalizedText.sourcePositions[index + normalizedSearch.length - 1];
	if (start === void 0 || last === void 0) return;
	return {
		start,
		end: last + 1
	};
}
function ButtonMenuSelectText(props) {
	function content() {
		if (!props.highlight) return props.text;
		const { start, end } = props.highlight;
		const parts = [];
		if (start > 0) parts.push((() => {
			var _el$ = _tmpl$();
			insert(_el$, () => props.text.slice(0, start));
			return _el$;
		})());
		parts.push(props.text.slice(start, end));
		if (end < props.text.length) parts.push((() => {
			var _el$2 = _tmpl$();
			insert(_el$2, () => props.text.slice(end));
			return _el$2;
		})());
		return parts;
	}
	return memo(content);
}
function ButtonMenuSelectInner(props) {
	const [search, setSearch] = createSignal("");
	const hasSearch = !!props.optionSearchText;
	const filteredOptions = createMemo(() => {
		const search$ = search();
		const options = props.options;
		if (search$ === "" || !hasSearch) return options.map((option) => ({ option }));
		if (!normalizeSearchText(search$).normalized) return options.map((option) => ({ option }));
		const results = [];
		for (const option of options) {
			const highlight = findButtonMenuSelectHighlight(props.optionSearchText(option), search$);
			if (highlight) results.push({
				option,
				highlight
			});
		}
		return results;
	});
	const chosenKeys = createMemo(() => {
		const chosen$ = props.value;
		return new Set(chosen$.map((it) => props.optionKey(it)));
	});
	const empty = createMemo(() => !!props.emptyText && !filteredOptions().length);
	let scrollable;
	const lazyLoadQueue = props.needStickerRenderer ? new LazyLoadQueue() : void 0;
	const stickerRenderer = props.needStickerRenderer ? new SuperStickerRenderer({
		regularLazyLoadQueue: lazyLoadQueue,
		group: "none",
		managers: rootScope.managers,
		intersectionObserverInit: { root: scrollable },
		visibleRenderOptions: {
			play: false,
			width: 20,
			height: 20,
			...props.stickerOptions
		},
		withLock: false
	}) : void 0;
	onCleanup(() => {
		stickerRenderer?.destroy();
		lazyLoadQueue?.clear();
	});
	let inputEl;
	onMount(() => doubleRaf().then(() => inputEl?.focus()));
	function focusSearchFromStaticArea(event) {
		if (!hasSearch || !inputEl) return;
		const target = event.target;
		if (target === inputEl) return;
		const item = target.closest?.(".btn-menu-item");
		if (item && !item.classList.contains("btn-menu-search") && !item.classList.contains("is-static")) return;
		inputEl.focus({ preventScroll: true });
	}
	return (() => {
		var _el$3 = _tmpl$7(), _el$7 = _el$3.firstChild;
		_el$3.$$click = focusSearchFromStaticArea;
		insert(_el$3, createComponent(Show, {
			when: hasSearch,
			get children() {
				return [(() => {
					var _el$4 = _tmpl$2(), _el$5 = _el$4.firstChild;
					insert(_el$4, createComponent(IconTsx, {
						icon: "search",
						"class": "btn-menu-item-icon"
					}), _el$5);
					var _ref$ = inputEl;
					typeof _ref$ === "function" ? use(_ref$, _el$5) : inputEl = _el$5;
					_el$5.$$input = (e) => setSearch(e.currentTarget.value);
					createRenderEffect(() => setAttribute(_el$5, "placeholder", i18n("Search").textContent));
					createRenderEffect(() => _el$5.value = search());
					return _el$4;
				})(), _tmpl$3()];
			}
		}), _el$7);
		insert(_el$7, createComponent(Scrollable, {
			axis: "y",
			ref(r$) {
				var _ref$2 = scrollable;
				typeof _ref$2 === "function" ? _ref$2(r$) : scrollable = r$;
			},
			get children() {
				return [(() => {
					var _el$8 = _tmpl$5();
					insert(_el$8, createComponent(Show, {
						get when() {
							return !props.single;
						},
						get children() {
							var _el$9 = _tmpl$4();
							addEventListener(_el$9, "keydown", buttonKeyDown, true);
							_el$9.$$click = () => props.onValueChange(props.options);
							insert(_el$9, createComponent(IconTsx, {
								icon: "checkround",
								"class": "btn-menu-item-icon"
							}), null);
							insert(_el$9, createComponent(I18nTsx, {
								"class": "btn-menu-item-text",
								key: "SelectAll2"
							}), null);
							createRenderEffect(() => setAttribute(_el$9, "aria-selected", props.value.length === props.options.length));
							return _el$9;
						}
					}), null);
					insert(_el$8, createComponent(For, {
						get each() {
							return filteredOptions();
						},
						children: (filteredOption) => (() => {
							var _el$11 = _tmpl$4();
							addEventListener(_el$11, "keydown", buttonKeyDown, true);
							_el$11.$$click = () => {
								const optionKey = props.optionKey(filteredOption.option);
								const wasChosen = chosenKeys().has(optionKey);
								if (props.deselectAllOnFirstSelect && props.value.length === props.options.length) {
									props.onValueChange([filteredOption.option]);
									return;
								}
								if (wasChosen) props.onValueChange(props.value.filter((it) => props.optionKey(it) !== optionKey));
								else if (props.single) props.onValueChange([filteredOption.option]);
								else props.onValueChange([...props.value, filteredOption.option]);
							};
							insert(_el$11, () => props.renderOption({
								option: filteredOption.option,
								get chosen() {
									return chosenKeys().has(props.optionKey(filteredOption.option));
								},
								stickerRenderer,
								highlight: filteredOption.highlight,
								optionText: props.optionSearchText?.(filteredOption.option)
							}));
							createRenderEffect(() => setAttribute(_el$11, "aria-selected", chosenKeys().has(props.optionKey(filteredOption.option))));
							return _el$11;
						})()
					}), null);
					createRenderEffect(() => setAttribute(_el$8, "aria-multiselectable", !props.single));
					return _el$8;
				})(), createComponent(Show, {
					get when() {
						return empty();
					},
					get children() {
						var _el$0 = _tmpl$6(), _el$10 = _el$0.firstChild.nextSibling;
						insert(_el$10, () => props.emptyText);
						return _el$0;
					}
				})];
			}
		}));
		createRenderEffect((_p$) => {
			var _v$ = classNames("btn-menu", "btn-menu-select", props.class), _v$2 = `${10 + Math.min(filteredOptions().length + (props.single ? 0 : 1) + (empty() ? 1 : 0), 7.5) * 32}px`;
			_v$ !== _p$.e && className(_el$3, _p$.e = _v$);
			_v$2 !== _p$.t && setStyleProperty(_el$7, "height", _p$.t = _v$2);
			return _p$;
		}, {
			e: void 0,
			t: void 0
		});
		return _el$3;
	})();
}
function createButtonMenuSelect(props) {
	let currentMenu;
	let destroyed = false;
	let tempId = 0;
	let opened = false;
	function removeMenu(menu) {
		if (menu.removed) return;
		menu.removed = true;
		if (menu.removeTimeout) {
			clearTimeout(menu.removeTimeout);
			menu.removeTimeout = void 0;
		}
		menu.removeClickListener?.();
		menu.element.remove();
		menu.dispose();
		if (currentMenu === menu) currentMenu = void 0;
	}
	function close() {
		++tempId;
		if (opened) {
			opened = false;
			contextMenuController.close();
		} else if (currentMenu) removeMenu(currentMenu);
	}
	async function open(triggerEl) {
		if (destroyed || opened) return;
		if (currentMenu) removeMenu(currentMenu);
		const _tempId = ++tempId;
		await fastRafPromise();
		if (destroyed || _tempId !== tempId) return;
		let disposeMenu;
		const el = createRoot((dispose) => {
			disposeMenu = dispose;
			const [, innerProps] = splitProps(props, [
				"direction",
				"floatingDirection",
				"floatingOptions",
				"onToggleMenu",
				"activateFocus"
			]);
			return createComponent(ButtonMenuSelectInner, innerProps);
		});
		const domEl = typeof el === "function" ? el() : el;
		const menu = currentMenu = {
			dispose: disposeMenu,
			element: domEl
		};
		if (props.single) menu.removeClickListener = attachClickEvent(domEl, (event) => {
			const item = event.target?.closest?.(".btn-menu-item");
			if (!item || item.classList.contains("btn-menu-search") || item.classList.contains("is-static")) return;
			close();
		});
		domEl.classList.add(props.direction);
		getOverlayRoot().append(domEl);
		if (props.floatingDirection) {
			const triggerRect = triggerEl.getBoundingClientRect();
			const offset = [0, 8];
			if (props.floatingOptions?.constrainHeight) {
				const side = props.floatingDirection.split("-")[0];
				const appWindow = triggerEl.ownerDocument.defaultView || getAppWindow();
				let maxHeight = appWindow.innerHeight - 32;
				if (side === "bottom") maxHeight = appWindow.innerHeight - 16 - triggerRect.bottom - offset[1];
				else if (side === "top") maxHeight = triggerRect.top - 16 - offset[1];
				domEl.classList.add("is-height-constrained");
				domEl.style.maxHeight = `${Math.max(0, maxHeight)}px`;
			}
			positionFloatingMenu(triggerRect, domEl, props.floatingDirection, offset, { flip: props.floatingOptions?.flip });
		} else positionMenuTrigger(triggerEl, domEl, props.direction, { top: 8 });
		await fastRafPromise();
		if (destroyed || _tempId !== tempId || currentMenu !== menu) {
			removeMenu(menu);
			return;
		}
		props.onToggleMenu?.(true);
		contextMenuController.openBtnMenu(domEl, () => {
			++tempId;
			props.onToggleMenu?.(false);
			opened = false;
			menu.removeTimeout = window.setTimeout(() => {
				menu.removeTimeout = void 0;
				removeMenu(menu);
			}, 300);
		}, void 0, props.activateFocus);
		opened = true;
	}
	onCleanup(() => {
		destroyed = true;
		++tempId;
		if (opened) contextMenuController.close();
		opened = false;
		if (currentMenu) removeMenu(currentMenu);
	});
	return {
		open,
		close
	};
}
function ButtonMenuSelect(props) {
	const children = resolveFirst(() => props.children, (it) => it instanceof HTMLElement);
	const { open } = createButtonMenuSelect(props);
	createEffect(on(children, (el) => {
		if (!el) return;
		const clean = attachClickEvent(el, (evt) => {
			if (evt.target.closest(".btn-menu")) return;
			open(el);
		});
		onCleanup(clean);
	}));
	return children();
}
delegateEvents([
	"click",
	"input",
	"keydown"
]);
//#endregion
export { ButtonMenuSelectText as n, createButtonMenuSelect as r, ButtonMenuSelect as t };
