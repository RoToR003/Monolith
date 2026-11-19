//# allFunctionsCalledOnLoad
import { h as Modes } from "./userAgent-ByGXcznk.js";
import { a as safeAssign } from "./idb-BZfkipS3.js";
import { a as i18n } from "./langPack-BmdJGr44.js";
import { C as createSignal, p as createComponent, x as createRoot } from "./solid-9Vxm0VIz.js";
import { t as cancelEvent } from "./cancelEvent-Cw8vYZHp.js";
import { _ as use, g as template, u as memo } from "./web-BPyQozky.js";
import { t as findUpAsChild } from "./findUpAsChild-CPjgnY00.js";
import { t as IconTsx } from "./iconTsx-B4lOk4A6.js";
import { t as buttonKeyDown } from "./buttonKeyDown-CqZzefS3.js";
import { n as attachClickEvent } from "./clickEvent-COk4YpLP.js";
import { r as ensureButtonSemantics } from "./button-DpTvniRN.js";
import { i as Row, s as CheckboxFieldTsx } from "./confirmationPopup-Bz6mK0o-.js";
import { n as unwrapSolidElement } from "./wrapSolidComponent-BASCjNJG.js";
import { r as toastNew } from "./toast-B6VD5M7R.js";
//#region src/components/checkboxFields.tsx
var _tmpl$ = /*#__PURE__*/ template(`<b class=accordion-counter>`);
var nextAccordionId = 0;
var CheckboxFields = class {
	constructor(options) {
		safeAssign(this, options);
	}
	createField(info, isNested) {
		if (info.nestedTo && !isNested) return;
		let accordion;
		let rightContent;
		let expanded;
		let setExpanded;
		const updateAccordionHeight = () => {
			accordion.style.setProperty("--max-height", accordion.scrollHeight + "px");
		};
		const setAccordionExpanded = (expanded) => {
			updateAccordionHeight();
			setExpanded(expanded);
			accordion.classList.toggle("is-expanded", expanded);
			if (Modes.a11y) accordion.toggleAttribute("inert", !expanded);
			rightContent?.setAttribute("aria-expanded", "" + expanded);
			this.onExpand?.(info);
		};
		let title;
		let checkboxField;
		let disposeRoot;
		let disabled;
		let setDisabled;
		let disposed = false;
		const titleContent = info.text ? i18n(info.text, info.textArgs) : void 0;
		const subtitleContent = info.description ? i18n(info.description) : void 0;
		const isToggle = !this.round && !isNested;
		const nestedRightButtonIcon = info.nestedRightButtonIcon === false ? void 0 : info.nestedRightButtonIcon ?? this.rightButtonIcon;
		const onClick = info.nested ? (e) => {
			if (this.round ? !findUpAsChild(e.target, rightContent) && e.target !== rightContent : findUpAsChild(e.target, checkboxField.label)) {
				if (checkboxField.input.disabled) {
					const checked = checkboxField.checked;
					info.nested.forEach((field) => {
						field.checkboxField.checked = !checked;
					});
				} else checkboxField.checked = !checkboxField.checked;
				return;
			}
			cancelEvent(e);
			setAccordionExpanded(!accordion.classList.contains("is-expanded"));
		} : void 0;
		const rowElement = createRoot((dispose) => {
			const _self$ = this, _self$2 = this;
			disposeRoot = dispose;
			[expanded, setExpanded] = createSignal(false);
			[disabled, setDisabled] = createSignal(false);
			const field = createComponent(CheckboxFieldTsx, {
				get checked() {
					return memo(() => !!info.nested)() ? false : info.checked;
				},
				get toggle() {
					return _self$.round ? void 0 : !isNested;
				},
				get listenerSetter() {
					return _self$.listenerSetter;
				},
				get restriction() {
					return _self$.asRestrictions && !isNested;
				},
				get name() {
					return info.name;
				},
				get round() {
					return _self$.round;
				},
				get lockIcon() {
					return info.restrictionText && !info.nestedTo ? "premium_lock" : void 0;
				},
				ref: (createdField) => {
					checkboxField = info.checkboxField = createdField;
					createdField.label.classList.add("disable-hover");
				}
			});
			const element = createComponent(Row, {
				ref: (element) => element,
				clickable: onClick,
				get disabled() {
					return disabled();
				},
				get ["aria-disabled"]() {
					return disabled();
				},
				get classList() {
					return {
						"accordion-row": true,
						"accordion-toggler": !!info.nested,
						"accordion-toggler-round": !!info.nested && !!_self$2.round,
						"accordion-toggler-expanded": expanded()
					};
				},
				get children() {
					return [
						memo(() => isToggle ? createComponent(Row.CheckboxFieldToggle, { children: field }) : createComponent(Row.CheckboxField, { children: field })),
						memo(() => memo(() => !!(titleContent || !_self$2.round && info.nested))() && createComponent(Row.Title, {
							ref: (element) => title = element,
							get rowClass() {
								return !_self$2.round && info.nested ? "with-delimiter" : void 0;
							},
							get children() {
								return [titleContent, memo(() => memo(() => !!(!_self$2.round && info.nested))() && [
									" ",
									(() => {
										var _el$ = _tmpl$();
										use((element) => info.nestedCounter = element, _el$);
										return _el$;
									})(),
									" ",
									createComponent(IconTsx, {
										icon: "down",
										"class": "accordion-icon"
									})
								])];
							}
						})),
						memo(() => subtitleContent && createComponent(Row.Subtitle, { children: subtitleContent })),
						memo(() => memo(() => !!(_self$2.round && info.nested))() && createComponent(Row.RightContent, {
							ref: (element) => {
								rightContent = element;
								ensureButtonSemantics(element);
								element.setAttribute("aria-expanded", "false");
								if (title) {
									var _title;
									(_title = title).id || (_title.id = `accordion-title-${++nextAccordionId}`);
									element.setAttribute("aria-labelledby", title.id);
								}
								element.addEventListener("keydown", (e) => buttonKeyDown(e, element));
							},
							"class": "accordion-right-button",
							get children() {
								return [
									memo(() => nestedRightButtonIcon && [createComponent(IconTsx, { icon: nestedRightButtonIcon }), " "]),
									(() => {
										var _el$2 = _tmpl$();
										use((element) => info.nestedCounter = element, _el$2);
										return _el$2;
									})(),
									" ",
									createComponent(IconTsx, {
										icon: "down",
										"class": "accordion-icon"
									})
								];
							}
						}))
					];
				}
			});
			return unwrapSolidElement(element);
		});
		const dispose = () => {
			if (disposed) return;
			disposed = true;
			disposeRoot();
		};
		if (this.middleware) this.middleware.onDestroy(dispose);
		else this.listenerSetter.addCleanup(dispose);
		const row = info.row = {
			container: rowElement,
			title,
			toggleDisability: (disable = !disabled()) => {
				setDisabled(disable);
				return () => setDisabled(!disable);
			}
		};
		if (info.restrictionText) {
			info.checkboxField.input.disabled = true;
			if (!info.nested) attachClickEvent(row.container, (e) => {
				toastNew({ langPackKey: info.restrictionText });
			}, { listenerSetter: this.listenerSetter });
		}
		const nodes = [row.container];
		if (info.nested) {
			const container = accordion = document.createElement("div");
			container.classList.add("accordion");
			if (Modes.a11y) container.toggleAttribute("inert", true);
			if (rightContent) {
				container.id || (container.id = `accordion-panel-${++nextAccordionId}`);
				rightContent.setAttribute("aria-controls", container.id);
			}
			const _info = info;
			info.nested.forEach((info) => {
				info.nestedTo ?? (info.nestedTo = _info);
				container.append(...this.createField(info, true).nodes);
			});
			nodes.push(container);
			this.setNestedCounter(info);
			checkboxField.input.disabled = true;
			checkboxField.setValueSilently(this.getNestedCheckedLength(info) === info.nested.length);
			info.toggleWith ?? (info.toggleWith = {
				checked: info.nested,
				unchecked: info.nested
			});
		}
		if (info.toggleWith || info.nestedTo) {
			const processToggleWith = info.toggleWith ? (info) => {
				const { toggleWith, nested } = info;
				const value = info.checkboxField.checked;
				const arr = value ? toggleWith.checked : toggleWith.unchecked;
				if (!arr) return;
				this.fields.filter((i) => arr.includes(i)).forEach((info) => {
					if (info.restrictionText) return;
					info.checkboxField.setValueSilently(value);
					if (info.nestedTo && !nested) this.setNestedCounter(info.nestedTo);
					if (info.toggleWith) processToggleWith(info);
				});
				if (info.nested) this.setNestedCounter(info);
			} : void 0;
			const processNestedTo = info.nestedTo ? () => {
				const length = this.getNestedCheckedLength(info.nestedTo);
				info.nestedTo.checkboxField.setValueSilently(length === info.nestedTo.nested.length);
				this.setNestedCounter(info.nestedTo, length);
			} : void 0;
			this.listenerSetter.add(info.checkboxField.input)("change", () => {
				processToggleWith?.(info);
				processNestedTo?.();
				this.onAnyChange?.();
			});
		} else if (this.onAnyChange && !info.nested) this.listenerSetter.add(info.checkboxField.input)("change", () => {
			this.onAnyChange();
		});
		this.onRowCreation?.(row, info);
		return {
			row,
			nodes
		};
	}
	getNestedCheckedLength(info) {
		return info.nested.reduce((acc, v) => acc + +v.checkboxField.checked, 0);
	}
	setNestedCounter(info, count = this.getNestedCheckedLength(info)) {
		if (info.setNestedCounter) {
			info.setNestedCounter(count);
			return;
		}
		info.nestedCounter.textContent = this.round ? "" + info.nested.length : `${count}/${info.nested.length}`;
	}
};
//#endregion
export { CheckboxFields as t };
