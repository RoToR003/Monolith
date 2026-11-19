//# allFunctionsCalledOnLoad
import { u as langPack_default } from "./langPack-BmdJGr44.js";
import { p as createComponent, s as Show, w as createUniqueId, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { _ as use, c as insert, f as setAttribute, g as template, o as className, s as delegateEvents, u as memo } from "./web-BPyQozky.js";
import { t as liteMode } from "./liteMode-DeLStZfQ.js";
import { t as classNames } from "./classNames-DxGDjmvw.js";
import { t as IconTsx } from "./iconTsx-B4lOk4A6.js";
import { t as InputFieldTsx } from "./inputFieldTsx-0SbEFdGE.js";
import { t as shake } from "./shake-1vPuqgfm.js";
import { commentBytesLeft } from "./send-CchmriGl.js";
var commentField_module_default = {
	field: "_field_53qu0_6",
	counting: "_counting_53qu0_11",
	withLock: "_withLock_53qu0_14",
	input: "_input_53qu0_21",
	counter: "_counter_53qu0_34",
	over: "_over_53qu0_48",
	lock: "_lock_53qu0_52",
	locked: "_locked_53qu0_59"
};
//#endregion
//#region src/components/wallet/commentField.tsx
var _tmpl$ = /*#__PURE__*/ template(`<span><span dir=ltr>`);
var _tmpl$2 = /*#__PURE__*/ template(`<button type=button>`);
var _tmpl$3 = /*#__PURE__*/ template(`<div>`);
/**
* A transfer's comment: the app's text field, counting down the last bytes of its limit (tdesktop ApplyCommentLimit —
* the limit is in UTF-8 bytes, so the count starts late and may go below zero, then the send refuses it), and on the
* confirmation the lock that makes it private or public (Android's confirmation sheet, iOS's transfer preview).
* Enter sends, Shift+Enter starts a new line.
*/
function WalletCommentField(props) {
	const counterId = createUniqueId();
	const left = () => commentBytesLeft(props.value);
	const counting = () => left() <= 50;
	let container;
	props.handleRef?.({ refuse: () => {
		navigator.vibrate?.([
			12,
			60,
			10
		]);
		if (liteMode.isAvailable("motion")) shake(container);
	} });
	return (() => {
		var _el$ = _tmpl$3();
		var _ref$ = container;
		typeof _ref$ === "function" ? use(_ref$, _el$) : container = _el$;
		insert(_el$, createComponent(InputFieldTsx, {
			get ["class"]() {
				return commentField_module_default.input;
			},
			placeholder: "WalletOptionalComment",
			withLinebreaks: true,
			get value() {
				return props.value;
			},
			get onRawInput() {
				return props.onInput;
			},
			get disabled() {
				return props.disabled;
			},
			get errorDescriptionId() {
				return counting() ? counterId : void 0;
			},
			instanceRef: (field) => {
				field.input.addEventListener("keydown", (e) => {
					if (e.key === "Enter" && !e.shiftKey && !e.isComposing && e.keyCode !== 229 && !e.repeat && props.onEnter) {
						e.preventDefault();
						props.onEnter();
					}
				});
			}
		}), null);
		insert(_el$, createComponent(Show, {
			get when() {
				return counting();
			},
			get children() {
				var _el$2 = _tmpl$(), _el$3 = _el$2.firstChild;
				setAttribute(_el$2, "id", counterId);
				insert(_el$3, (() => {
					var _c$ = memo(() => left() < 0);
					return () => _c$() ? "−" + -left() : left();
				})());
				createRenderEffect(() => className(_el$2, classNames(commentField_module_default.counter, left() < 0 && commentField_module_default.over)));
				return _el$2;
			}
		}), null);
		insert(_el$, createComponent(Show, {
			get when() {
				return !!props.lock;
			},
			get children() {
				var _el$4 = _tmpl$2();
				_el$4.$$click = () => props.lock.onToggle();
				insert(_el$4, createComponent(IconTsx, { get icon() {
					return props.lock.encrypted ? "lock" : "lockoff";
				} }));
				createRenderEffect((_p$) => {
					var _v$ = classNames("btn-icon", commentField_module_default.lock, props.lock.encrypted && commentField_module_default.locked), _v$2 = langPack_default.format("WalletMakeCommentPublic", true), _v$3 = !props.lock.encrypted, _v$4 = props.disabled;
					_v$ !== _p$.e && className(_el$4, _p$.e = _v$);
					_v$2 !== _p$.t && setAttribute(_el$4, "aria-label", _p$.t = _v$2);
					_v$3 !== _p$.a && setAttribute(_el$4, "aria-pressed", _p$.a = _v$3);
					_v$4 !== _p$.o && (_el$4.disabled = _p$.o = _v$4);
					return _p$;
				}, {
					e: void 0,
					t: void 0,
					a: void 0,
					o: void 0
				});
				return _el$4;
			}
		}), null);
		createRenderEffect(() => className(_el$, classNames(commentField_module_default.field, props.lock && commentField_module_default.withLock, counting() && commentField_module_default.counting, props.class)));
		return _el$;
	})();
}
delegateEvents(["click"]);
//#endregion
export { WalletCommentField as t };
