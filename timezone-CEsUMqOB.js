//# allFunctionsCalledOnLoad
import { a as i18n } from "./langPack-BmdJGr44.js";
import { C as createSignal, M as onCleanup, N as onMount, _ as createMemo, g as createEffect, i as For, j as on, p as createComponent, s as Show } from "./solid-9Vxm0VIz.js";
import { c as insert, g as template, u as memo } from "./web-BPyQozky.js";
import { O as randomLong } from "./index-B7axFZql.js";
import { i as Row, s as CheckboxFieldTsx } from "./confirmationPopup-Bz6mK0o-.js";
import { a as Section } from "./emailVerification-C8QYZSyu.js";
import { t as InputSearch } from "./inputSearch-DWd-Jn5r.js";
import { a as highlightText } from "./textHighlight-BHWnL6Fg.js";
import { n as useSuperTab } from "./superTabProvider-LtveyH7W.js";
import { t as RadioFieldTsx } from "./radioFieldTsx-kmtuN4Dv.js";
import { n as getTimezoneName, r as getTimezoneOffsetName, t as getSystemTimezoneId } from "./timezones-Dpjwg9c5.js";
//#region src/components/sidebarLeft/tabs/timezone.tsx
var _tmpl$ = /*#__PURE__*/ template(`<form>`);
/** Android matches a query at a word start, `/` counting as a separator. */
var matchesQuery = (timezone, query) => {
	const name = `${timezone.name} ${timezone.id}`.toLowerCase().replace(/[/_]/g, " ");
	return name.startsWith(query) || name.includes(" " + query);
};
var TimezoneTab = () => {
	const [tab] = useSuperTab();
	const { timezones, onSelect } = tab.payload;
	const systemTimezoneId = getSystemTimezoneId(timezones);
	const [selected, setSelected] = createSignal(tab.payload.selected);
	const [useSystem, setUseSystem] = createSignal(tab.payload.selected === systemTimezoneId);
	const [query, setQuery] = createSignal("");
	const radioName = randomLong();
	const filtered = createMemo(() => {
		const normalized = query().trim().toLowerCase();
		if (!normalized) return timezones;
		return timezones.filter((timezone) => matchesQuery(timezone, normalized));
	});
	const select = (id) => {
		setSelected(id);
		onSelect(id);
	};
	const toggleSystem = (value) => {
		setUseSystem(value);
		if (value) select(systemTimezoneId);
	};
	const inputSearch = new InputSearch({
		placeholder: "Search",
		onChange: setQuery
	});
	onMount(() => {
		tab.title.replaceWith(inputSearch.container);
	});
	onCleanup(() => inputSearch.remove());
	return [createComponent(Show, {
		get when() {
			return !query();
		},
		get children() {
			return createComponent(Section, {
				caption: "TimezoneDetectAutomaticallyInfo",
				get captionArgs() {
					return [getTimezoneName(timezones, selected(), true)];
				},
				get children() {
					return createComponent(Row, { get children() {
						return [createComponent(Row.CheckboxFieldToggle, { get children() {
							return createComponent(CheckboxFieldTsx, {
								get checked() {
									return useSystem();
								},
								toggle: true,
								onChange: toggleSystem
							});
						} }), createComponent(Row.Title, { get children() {
							return i18n("TimezoneDetectAutomatically");
						} })];
					} });
				}
			});
		}
	}), createComponent(Show, {
		get when() {
			return filtered().length;
		},
		get fallback() {
			return createComponent(Section, {
				noContent: true,
				get caption() {
					return i18n("TimezoneNotFound");
				}
			});
		},
		get children() {
			return createComponent(Section, {
				get name() {
					return !query() ? "TimezoneHeader" : void 0;
				},
				get children() {
					var _el$ = _tmpl$();
					insert(_el$, createComponent(For, {
						get each() {
							return filtered();
						},
						children: (timezone) => createComponent(Row, {
							get disabled() {
								return memo(() => !!useSystem())() && !query().trim();
							},
							get children() {
								return [
									createComponent(Row.RadioField, { get children() {
										return createComponent(RadioFieldTsx, {
											"class": "disable-hover",
											get checked() {
												return selected() === timezone.id;
											},
											name: radioName,
											get value() {
												return timezone.id;
											},
											onChange: (checked) => {
												if (!checked) return;
												setUseSystem(false);
												select(timezone.id);
											}
										});
									} }),
									createComponent(Row.Title, {
										ref: (element) => useHighlight(element, query),
										get children() {
											return getTimezoneName(timezones, timezone.id);
										}
									}),
									createComponent(Row.Subtitle, { get children() {
										return getTimezoneOffsetName(timezone);
									} })
								];
							}
						})
					}));
					return _el$;
				}
			});
		}
	})];
};
/** Paints the matched part of a row title, the way the settings search does. */
function useHighlight(container, query) {
	createEffect(on(query, (value) => {
		const trimmed = value.trim();
		if (!trimmed) return;
		const highlight = highlightText({
			container,
			match: {
				type: "search",
				query: trimmed
			}
		});
		onCleanup(() => highlight.dispose());
	}));
}
//#endregion
export { TimezoneTab as default };
