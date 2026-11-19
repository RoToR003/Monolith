//# allFunctionsCalledOnLoad
import { t as apiManagerProxy, x as getPeerColorIndexByPeer } from "./apiManagerProxy-DmQXvxSF.js";
import { C as createSignal, p as createComponent, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { c as insert, g as template, o as className, u as memo } from "./web-BPyQozky.js";
import { t as classNames } from "./classNames-DxGDjmvw.js";
import { t as InputField } from "./inputField-CaCo30N0.js";
import { A as AvatarNewTsx } from "./confirmationPopup-Bz6mK0o-.js";
import { dt as cleanMemberTag, pt as removeMemberTagEmoji } from "./getChatMigratedTo-ChhMNXuu.js";
import { t as subscribeOn } from "./subscribeOn-DnCla7ws.js";
import { Nt as BubbleLayout } from "./appDialogsManager-CXguiKc3.js";
import { t as PeerTitleTsx } from "./peerTitleTsx-DcpEYRoE.js";
import { t as FakeBubbles } from "./fakeBubbles-D-6pHQXV.js";
import { t as createBubbleNameRank } from "./bubbleNameRank-DTa_Li_O.js";
var memberTagPreview_module_default = {
	preview: "_preview_55cbz_1",
	content: "_content_55cbz_6",
	row: "_row_55cbz_10",
	isCropped: "_isCropped_55cbz_17",
	bubble: "_bubble_55cbz_21",
	avatar: "_avatar_55cbz_25",
	lines: "_lines_55cbz_45",
	line: "_line_55cbz_45"
};
//#endregion
//#region src/components/memberTag/memberTagPreview.tsx
var _tmpl$$1 = /*#__PURE__*/ template(`<div>`);
var _tmpl$2 = /*#__PURE__*/ template(`<div class=title-flex>`);
var _tmpl$3 = /*#__PURE__*/ template(`<span class=bubble-name-first>`);
var _tmpl$4 = /*#__PURE__*/ template(`<div aria-hidden=true><span></span><span></span><span></span><span>`);
/**
* A message of `peerId`'s on the group's background, its text drawn as lines, the tag at the end of
* the name line — how the tag will look. An admin or the owner without a tag reads "admin" / "owner",
* a member without one has none
*/
function MemberTagPreview(props) {
	const colorIndex = getPeerColorIndexByPeer(apiManagerProxy.getPeer(props.peerId));
	const tag = () => {
		const rank = props.rank || (props.role === "owner" ? 1 : props.role === "admin" ? 2 : void 0);
		return rank !== void 0 && createBubbleNameRank({
			rank,
			role: props.role
		});
	};
	return createComponent(FakeBubbles, {
		get peerId() {
			return props.chatPeerId;
		},
		get ["class"]() {
			return classNames(memberTagPreview_module_default.preview, props.class);
		},
		get contentClass() {
			return memberTagPreview_module_default.content;
		},
		get children() {
			var _el$ = _tmpl$$1();
			insert(_el$, (() => {
				var _c$ = memo(() => !!!props.cropped);
				return () => _c$() && createComponent(AvatarNewTsx, {
					get peerId() {
						return props.peerId;
					},
					size: 40,
					get ["class"]() {
						return memberTagPreview_module_default.avatar;
					}
				});
			})(), null);
			insert(_el$, createComponent(BubbleLayout, {
				get ["class"]() {
					return memberTagPreview_module_default.bubble;
				},
				contentStyle: colorIndex !== -1 ? { "--peer-color-rgb": `var(--peer-${colorIndex}-color-rgb)` } : void 0,
				get tail() {
					return !props.cropped;
				},
				group: "single",
				get name() {
					return (() => {
						var _el$2 = _tmpl$2();
						insert(_el$2, (() => {
							var _c$2 = memo(() => !!props.cropped);
							return () => _c$2() ? _tmpl$3() : createComponent(PeerTitleTsx, {
								get peerId() {
									return props.peerId;
								},
								"class": "bubble-name-first"
							});
						})(), null);
						insert(_el$2, tag, null);
						return _el$2;
					})();
				},
				get content() {
					return (() => {
						var _el$4 = _tmpl$4(), _el$5 = _el$4.firstChild, _el$6 = _el$5.nextSibling, _el$7 = _el$6.nextSibling, _el$8 = _el$7.nextSibling;
						createRenderEffect((_p$) => {
							var _v$ = memberTagPreview_module_default.lines, _v$2 = memberTagPreview_module_default.line, _v$3 = memberTagPreview_module_default.line, _v$4 = memberTagPreview_module_default.line, _v$5 = memberTagPreview_module_default.line;
							_v$ !== _p$.e && className(_el$4, _p$.e = _v$);
							_v$2 !== _p$.t && className(_el$5, _p$.t = _v$2);
							_v$3 !== _p$.a && className(_el$6, _p$.a = _v$3);
							_v$4 !== _p$.o && className(_el$7, _p$.o = _v$4);
							_v$5 !== _p$.i && className(_el$8, _p$.i = _v$5);
							return _p$;
						}, {
							e: void 0,
							t: void 0,
							a: void 0,
							o: void 0,
							i: void 0
						});
						return _el$4;
					})();
				}
			}), null);
			createRenderEffect(() => className(_el$, classNames(memberTagPreview_module_default.row, props.cropped && memberTagPreview_module_default.isCropped)));
			return _el$;
		}
	});
}
var memberTagEditor_module_default = { editor: "_editor_9w8hy_1" };
//#endregion
//#region src/components/memberTag/memberTagEditor.tsx
var _tmpl$ = /*#__PURE__*/ template(`<div>`);
/**
* How the author's message will look with the tag the field holds, following it as it is typed
*/
function MemberTagFieldPreview(props) {
	const { inputField } = props;
	const [value, setValue] = createSignal(inputField.value);
	subscribeOn(inputField.input)("input", () => setValue(inputField.value));
	return createComponent(MemberTagPreview, {
		get ["class"]() {
			return props.class;
		},
		get chatPeerId() {
			return props.chatPeerId;
		},
		get peerId() {
			return props.peerId;
		},
		get rank() {
			return cleanMemberTag(value());
		},
		get role() {
			return props.role;
		}
	});
}
/**
* A tag's editor (desktop's EditTagControl): how the author's message will look, then the field.
* The same piece stands in the admin and permissions tabs
*/
function MemberTagEditor(props) {
	return (() => {
		var _el$ = _tmpl$();
		insert(_el$, createComponent(MemberTagFieldPreview, props), null);
		insert(_el$, () => props.inputField.container, null);
		createRenderEffect(() => className(_el$, memberTagEditor_module_default.editor));
		return _el$;
	})();
}
//#endregion
//#region src/components/memberTag/memberTagField.ts
/**
* The field a tag is typed in. An admin's or the owner's empty field shows what their messages
* read without a tag; emoji go as they are typed, as no tag may hold one (desktop)
*/
function createMemberTagInputField(options) {
	const { role } = options;
	const inputField = new InputField({
		name: "member-tag",
		label: "MemberTag.Label",
		placeholder: role === "owner" ? "Chat.OwnerBadge" : role === "admin" ? "ChatAdmin" : void 0,
		maxLength: 16,
		plainText: true,
		canBeEdited: options.canBeEdited
	});
	if (options.value) inputField.setOriginalValue(removeMemberTagEmoji(options.value), true);
	inputField.input.addEventListener("input", () => {
		const value = inputField.value;
		const cleaned = removeMemberTagEmoji(value);
		if (cleaned !== value) inputField.value = cleaned;
	});
	return inputField;
}
//#endregion
export { MemberTagPreview as i, MemberTagEditor as n, MemberTagFieldPreview as r, createMemberTagInputField as t };
