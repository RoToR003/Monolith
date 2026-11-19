//# allFunctionsCalledOnLoad
import { n as rootScope } from "./rootScope-CZS0lmz8.js";
import { a as i18n, u as langPack_default } from "./langPack-BmdJGr44.js";
import { C as createSignal, i as For, p as createComponent, s as Show, w as createUniqueId, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { _ as use, c as insert, f as setAttribute, g as template, o as className, u as memo } from "./web-BPyQozky.js";
import { t as classNames } from "./classNames-DxGDjmvw.js";
import { i as createPopup, n as PopupElement } from "./indexTsx-v9mB9bAq.js";
import { t as InputField } from "./inputField-CaCo30N0.js";
import { i as Row, s as CheckboxFieldTsx } from "./confirmationPopup-Bz6mK0o-.js";
import { o as SectionName } from "./emailVerification-C8QYZSyu.js";
import { t as createArray } from "./createArray-sIAdGFqT.js";
var rateCall_module_default = {
	popup: "_popup_1rr2o_16",
	body: "_body_1rr2o_21",
	text: "_text_1rr2o_25",
	stars: "_stars_1rr2o_32",
	star: "_star_1rr2o_32",
	starInput: "_starInput_1rr2o_47",
	starIcon: "_starIcon_1rr2o_57",
	isFilled: "_isFilled_1rr2o_70",
	problems: "_problems_1rr2o_79",
	comment: "_comment_1rr2o_83"
};
//#endregion
//#region src/components/popups/rateCall.tsx
var _tmpl$ = /*#__PURE__*/ template(`<p>`);
var _tmpl$2 = /*#__PURE__*/ template(`<div role=radiogroup>`);
var _tmpl$3 = /*#__PURE__*/ template(`<div role=group>`);
var _tmpl$4 = /*#__PURE__*/ template(`<label><input type=radio><svg viewBox="0 0 24 24"aria-hidden=true><path d="M12 2.75l2.86 5.8 6.4.93-4.63 4.51 1.09 6.37L12 17.35l-5.72 3.01 1.09-6.37-4.63-4.51 6.4-.93z">`);
/** tdesktop `RateCallBox`: `kRateCallCommentLengthMax`. */
var COMMENT_MAX_LENGTH = 200;
/**
* What went wrong, in the official clients' order. The tag is what reaches the server: each ticked
* problem goes into the comment as `#tag` (Android `showRateAlert`, iOS `CallFeedbackReason.hashtag`).
* The two video problems are only asked about a video call.
*/
var PROBLEMS = [
	{
		tag: "distorted_video",
		langKey: "RateCallVideoDistorted",
		video: true
	},
	{
		tag: "pixelated_video",
		langKey: "RateCallVideoPixelated",
		video: true
	},
	{
		tag: "echo",
		langKey: "RateCallEcho"
	},
	{
		tag: "noise",
		langKey: "RateCallNoise"
	},
	{
		tag: "interruptions",
		langKey: "RateCallInterruptions"
	},
	{
		tag: "distorted_speech",
		langKey: "RateCallDistorted"
	},
	{
		tag: "silent_local",
		langKey: "RateCallSilentLocal"
	},
	{
		tag: "silent_remote",
		langKey: "RateCallSilentRemote"
	},
	{
		tag: "dropped",
		langKey: "RateCallDropped"
	}
];
var STARS = createArray(5, 0, (_, index) => index + 1);
function getCallRatingProblems(isVideo) {
	return PROBLEMS.filter((problem) => isVideo || !problem.video);
}
/**
* The `comment` of `phone.setCallRating`: what the user typed, then the ticked problems as hashtags
* on a line of their own (iOS `CallFeedbackController`). A good rating carries neither — the clients
* only ask for them below `CALL_RATING_FEEDBACK_BELOW`.
*/
function composeCallRatingComment(rating, problems, comment = "") {
	if (rating >= 4) return "";
	const hashtags = PROBLEMS.filter((problem) => problems.includes(problem.tag)).map((problem) => "#" + problem.tag).join(" ");
	return [comment.trim(), hashtags].filter(Boolean).join("\n");
}
/**
* "Please rate the quality of your Telegram call" — five stars, and below four a list of what went
* wrong plus an optional comment. Send rates the call; closing the popup any other way sends nothing.
*
* tdesktop and Android keep the choice and the sending apart (a Send button), unlike iOS and macOS,
* which send on the tap of a star: with the stars a radio group, arrow keys move the choice, and a
* choice that sent itself could not be walked through.
*/
function showRateCallPopup(options) {
	const problems = getCallRatingProblems(!!options.isVideo);
	createPopup(() => {
		const [rating, setRating] = createSignal(options.rating ?? 0);
		const [hoveredRating, setHoveredRating] = createSignal(0);
		const [checkedProblems, setCheckedProblems] = createSignal([]);
		const needsFeedback = () => rating() > 0 && rating() < 4;
		const groupName = createUniqueId();
		const labelId = groupName + "-label";
		const problemsLabelId = groupName + "-problems";
		const commentField = new InputField({
			label: "VoipFeedbackCommentHint",
			plainText: true,
			maxLength: COMMENT_MAX_LENGTH
		});
		commentField.container.classList.add(rateCall_module_default.comment);
		const starInputs = [];
		const toggleProblem = (tag, checked) => {
			setCheckedProblems((tags) => checked ? [...tags, tag] : tags.filter((_tag) => _tag !== tag));
		};
		const send = () => {
			const value = rating();
			const comment = composeCallRatingComment(value, checkedProblems(), commentField.value);
			(options.managers ?? rootScope.managers).appCallsManager.setCallRating(options.call, value, comment, options.userInitiative).catch((err) => {
				console.error("phone.setCallRating failed", err);
			});
		};
		return createComponent(PopupElement, {
			get ["class"]() {
				return rateCall_module_default.popup;
			},
			closable: true,
			initialFocus: () => starInputs[Math.max(rating(), 1) - 1],
			get children() {
				return [
					createComponent(PopupElement.Header, { get children() {
						return createComponent(PopupElement.Title, { title: "CallMessageReportProblem" });
					} }),
					createComponent(PopupElement.Scrollable, { get children() {
						return createComponent(PopupElement.Body, {
							get ["class"]() {
								return rateCall_module_default.body;
							},
							get children() {
								return [
									(() => {
										var _el$ = _tmpl$();
										setAttribute(_el$, "id", labelId);
										insert(_el$, () => i18n("VoipRateCallAlert"));
										createRenderEffect(() => className(_el$, rateCall_module_default.text));
										return _el$;
									})(),
									(() => {
										var _el$2 = _tmpl$2();
										_el$2.addEventListener("pointerleave", () => setHoveredRating(0));
										setAttribute(_el$2, "aria-labelledby", labelId);
										insert(_el$2, createComponent(For, {
											each: STARS,
											children: (value) => (() => {
												var _el$4 = _tmpl$4(), _el$5 = _el$4.firstChild, _el$6 = _el$5.nextSibling;
												_el$4.addEventListener("pointerenter", (event) => event.pointerType === "mouse" && setHoveredRating(value));
												_el$5.addEventListener("change", (event) => event.currentTarget.checked && setRating(value));
												use((element) => starInputs[value - 1] = element, _el$5);
												setAttribute(_el$5, "name", groupName);
												_el$5.value = value;
												createRenderEffect((_p$) => {
													var _v$ = classNames(rateCall_module_default.star, value <= (hoveredRating() || rating()) && rateCall_module_default.isFilled), _v$2 = rateCall_module_default.starInput, _v$3 = langPack_default.format("AccDescr.CallRatingStars", true, [value]), _v$4 = rateCall_module_default.starIcon;
													_v$ !== _p$.e && className(_el$4, _p$.e = _v$);
													_v$2 !== _p$.t && className(_el$5, _p$.t = _v$2);
													_v$3 !== _p$.a && setAttribute(_el$5, "aria-label", _p$.a = _v$3);
													_v$4 !== _p$.o && setAttribute(_el$6, "class", _p$.o = _v$4);
													return _p$;
												}, {
													e: void 0,
													t: void 0,
													a: void 0,
													o: void 0
												});
												createRenderEffect(() => _el$5.checked = rating() === value);
												return _el$4;
											})()
										}));
										createRenderEffect(() => className(_el$2, rateCall_module_default.stars));
										return _el$2;
									})(),
									createComponent(Show, {
										get when() {
											return needsFeedback();
										},
										get children() {
											return [(() => {
												var _el$3 = _tmpl$3();
												setAttribute(_el$3, "aria-labelledby", problemsLabelId);
												insert(_el$3, createComponent(SectionName, {
													ref: (element) => element.id = problemsLabelId,
													get children() {
														return i18n("CallReportHint");
													}
												}), null);
												insert(_el$3, createComponent(For, {
													each: problems,
													children: (problem) => createComponent(Row, { get children() {
														return [createComponent(Row.CheckboxField, { get children() {
															return createComponent(CheckboxFieldTsx, {
																get checked() {
																	return checkedProblems().includes(problem.tag);
																},
																onChange: (checked) => toggleProblem(problem.tag, checked)
															});
														} }), createComponent(Row.Title, { get children() {
															return i18n(problem.langKey);
														} })];
													} })
												}), null);
												createRenderEffect(() => className(_el$3, rateCall_module_default.problems));
												return _el$3;
											})(), memo(() => commentField.container)];
										}
									})
								];
							}
						});
					} }),
					createComponent(PopupElement.Buttons, { get children() {
						return [createComponent(PopupElement.Button, {
							langKey: "Send",
							confirm: true,
							get disabled() {
								return !rating();
							},
							callback: send
						}), createComponent(PopupElement.Button, {
							langKey: "Cancel",
							cancel: true
						})];
					} })
				];
			}
		});
	});
}
//#endregion
export { showRateCallPopup as default };
