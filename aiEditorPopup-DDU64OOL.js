//# allFunctionsCalledOnLoad
import { t as IS_TOUCH_SUPPORTED } from "./touchSupport-B2RWO3zD.js";
import { n as fastRaf } from "./schedulers-Cx0-7a1P.js";
import { r as getTransition } from "./themeController-2cytOOn0.js";
import { _ as SEND_WHEN_ONLINE_TIMESTAMP, n as rootScope } from "./rootScope-CZS0lmz8.js";
import { A as mergeProps, C as createSignal, M as onCleanup, N as onMount, R as useContext, _ as createMemo, b as createResource, d as batch, g as createEffect, i as For, j as on, m as createComputed, o as Match, p as createComponent, s as Show, u as Switch, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { n as bindManagersToSession } from "./bindManagersToAccount-BL82O9H9.js";
import { a as reconcile, n as createStore, o as unwrap } from "./store-PwRn5fa3.js";
import { _ as use, c as insert, g as template, o as className, s as delegateEvents } from "./web-BPyQozky.js";
import { r as useHotReloadGuard } from "./hotReloadGuard-BUNVkeQ4.js";
import { t as liteMode } from "./liteMode-DeLStZfQ.js";
import { t as ripple } from "./ripple-D7hcIc_t.js";
import { t as classNames } from "./classNames-DxGDjmvw.js";
import { t as IconTsx } from "./iconTsx-B4lOk4A6.js";
import { t as I18nTsx } from "./i18n-CGMFiAW0.js";
import { t as Button } from "./buttonTsx-Bwphkm9r.js";
import { n as isElementRTL } from "./isDocumentRTL-z8ksM2Dv.js";
import { t as Scrollable } from "./scrollable2-Bau9Hoih.js";
import { i as createPopup, n as PopupElement, o as usePopupContext } from "./indexTsx-v9mB9bAq.js";
import { o as createMiddleware } from "./sticker-5twBOy1Y.js";
import { t as Transition } from "./transition-Cmlc134D.js";
import { t as TransitionGroup } from "./transitionGroup-yCGzBwpt.js";
import { i as Row, s as CheckboxFieldTsx } from "./confirmationPopup-Bz6mK0o-.js";
import { Ft as isSameAiSendStyle, It as showScheduleSendingPopup, Lt as Skeleton, Pt as getAiSendStyleOfRequest } from "./appDialogsManager-CXguiKc3.js";
import { c as smoothScrollBehavior, i as useElementSize } from "./openEditors-7FmA7q_V.js";
import { a as Section } from "./emailVerification-C8QYZSyu.js";
import { t as useObserveResize } from "./useObserveResize-C3AyElRi.js";
import { t as Space } from "./space-XGOOgiuc.js";
import { C as SelectedEffect, U as SendMenu } from "./emoticonsDropdown-Cb_qGCUN.js";
import { l as debounce } from "./pickKeys-Ckq7_h-r.js";
import { t as HeightTransition } from "./heightTransition-DUH4NxQ7.js";
import { t as track } from "./track-DjRO1FyT.js";
import { a as previewCard_module_default, r as Original, t as Divider } from "./previewCard-BwZZGFS2.js";
import { _ as useAiComposerPromptGeneration, a as Tone, b as bodyContent_module_default, c as useTransitionGroupWhenMeasured, d as AiEditorPopupContext, f as takeSavedSendStyle, g as AiComposerSection, h as AiComposerPromptField, i as Tabs, l as showCreateTonePopup, m as useAiEditorRequest, n as CreateTone, o as cachedComposedMessages, p as useAiEditorPopupContext, r as Result, s as useIsAppearing, t as CopyResultButton, u as AiEditorPopupProvider, v as useAiComposerPromptInput, x as aiEditorPopup_module_default, y as useAiComposerPromptMaxLength } from "./parts-CRAIhXx3.js";
import { t as AutoHeight } from "./autoHeight-CPfajIaf.js";
import { t as getAiComposeToneKey } from "./getAiComposeToneKey-Br4mvbFo.js";
import { t as useScrollPosition } from "./useScrollPosition-DI_ULjVI.js";
import { n as CreatorLink, t as useMaxSavedTones } from "./limits-BQ7M1Civ.js";
//#region src/components/popups/aiEditorPopup/fixTab.tsx
var FixTab = (props) => {
	const context = useContext(AiEditorPopupContext);
	const { text: originalText } = context;
	const { Wrapper, onMeasured } = useTransitionGroupWhenMeasured();
	const request = {
		text: originalText,
		proofRead: true
	};
	useAiEditorRequest(context, () => request);
	return createComponent(AutoHeight, {
		get outerClass() {
			return bodyContent_module_default.tabContent;
		},
		get children() {
			return createComponent(Wrapper, { get children() {
				return [
					createComponent(Original, {
						get isAppearing() {
							return props.isAppearing;
						},
						text: originalText,
						onMeasured
					}),
					createComponent(Divider, {}),
					createComponent(Result, {
						useDiffText: true,
						get isAppearing() {
							return props.isAppearing;
						},
						composeMessageWithAiArgs: request
					})
				];
			} });
		}
	});
};
//#endregion
//#region src/components/popups/aiEditorPopup/rowLinesTransition.ts
var DURATION = 250;
var DURATION_REDUCED = 200;
var FADE_OUT = 150;
var getParts = (row) => ({
	title: row.querySelector(".row-title:not(.row-title-right)"),
	subtitle: row.querySelector(".row-subtitle:not(.row-subtitle-right)"),
	toggle: row.querySelector(".checkbox-field-toggle")
});
var getOffset = (rect, row) => ({
	x: rect.left - row.left,
	y: rect.top - row.top
});
function createRowLinesTransition(getRow) {
	let animations = [];
	let ghost;
	let clipped;
	const getCard = (row) => row.closest(".sidebar-left-section");
	const settle = () => {
		animations.forEach((animation) => animation.cancel());
		animations = [];
		ghost?.remove();
		ghost = void 0;
		clipped?.style.removeProperty("overflow");
		clipped = void 0;
	};
	const play = (before) => {
		const row = getRow();
		const card = row && getCard(row);
		if (!card?.isConnected || !row.getClientRects().length) return;
		const motion = liteMode.isAvailable("motion");
		const options = {
			duration: motion ? DURATION : DURATION_REDUCED,
			easing: getTransition("standard").easing
		};
		const rowRect = row.getBoundingClientRect();
		const parts = getParts(row);
		const animate = (element, keyframes, animationOptions = options) => {
			const animation = element.animate(keyframes, animationOptions);
			animations.push(animation);
			return animation;
		};
		const getShift = (from, to) => {
			const rect = from && to && before.rects.get(from);
			if (!rect) return {
				x: 0,
				y: 0
			};
			const was = getOffset(rect, before.row), is = getOffset(to.getBoundingClientRect(), rowRect);
			return {
				x: was.x - is.x,
				y: was.y - is.y
			};
		};
		const slide = (element, shift) => {
			if (!motion || !element || Math.abs(shift.x) < .5 && Math.abs(shift.y) < .5) return;
			animate(element, [{ translate: `${shift.x}px ${shift.y}px` }, { translate: "0 0" }]);
		};
		const titleShift = getShift(before.parts.title, parts.title);
		slide(parts.title, titleShift);
		slide(parts.toggle, getShift(before.parts.toggle, parts.toggle));
		const lineShift = motion ? titleShift.y / 2 : 0;
		const oldSubtitle = before.parts.subtitle;
		const newSubtitle = parts.subtitle;
		if (newSubtitle && newSubtitle !== oldSubtitle) {
			const comingOut = !oldSubtitle && lineShift;
			animate(newSubtitle, [
				{
					opacity: 0,
					translate: `0 ${comingOut ? -lineShift : 0}px`
				},
				...comingOut ? [{
					opacity: 0,
					offset: .4
				}] : [],
				{
					opacity: 1,
					translate: "0 0"
				}
			]);
		}
		if (oldSubtitle && oldSubtitle !== newSubtitle && (newSubtitle || motion)) {
			const rect = before.rects.get(oldSubtitle);
			const { x, y } = getOffset(rect, before.row);
			ghost = oldSubtitle.cloneNode(true);
			ghost.setAttribute("aria-hidden", "true");
			Object.assign(ghost.style, {
				position: "absolute",
				gridArea: "auto",
				left: x + "px",
				top: y + "px",
				width: rect.width + "px",
				margin: "0"
			});
			row.append(ghost);
			const leaving = ghost;
			const goingIn = !newSubtitle && lineShift;
			animate(leaving, [
				{
					opacity: 1,
					translate: "0 0"
				},
				...goingIn ? [{
					opacity: 0,
					offset: .6
				}] : [],
				{
					opacity: 0,
					translate: `0 ${goingIn ? lineShift : 0}px`
				}
			], {
				...options,
				duration: FADE_OUT,
				fill: "forwards"
			}).finished.then(() => {
				leaving.remove();
				if (ghost === leaving) ghost = void 0;
			}, () => {});
		}
		const height = card.getBoundingClientRect().height;
		if (Math.abs(height - before.card) >= .5) {
			clipped = card;
			card.style.overflow = "hidden";
			animate(card, [{ height: before.card + "px" }, { height: height + "px" }]).finished.then(() => {
				if (clipped !== card) return;
				card.style.removeProperty("overflow");
				clipped = void 0;
			}, () => {});
		}
	};
	let pending = false;
	const prepare = () => {
		if (pending) return;
		const row = getRow();
		const card = row && getCard(row);
		if (!card?.isConnected || !row.getClientRects().length || !liteMode.isAvailable("animations")) {
			settle();
			return;
		}
		const parts = getParts(row);
		const rects = /* @__PURE__ */ new Map();
		for (const part of Object.values(parts)) if (part) rects.set(part, part.getBoundingClientRect());
		const before = {
			row: row.getBoundingClientRect(),
			rects,
			parts,
			card: card.getBoundingClientRect().height
		};
		settle();
		pending = true;
		queueMicrotask(() => {
			pending = false;
			play(before);
		});
	};
	return { prepare };
}
var fieldSectionCaption_module_default = { fieldSectionCaption: "_fieldSectionCaption_1mg0c_1" };
//#endregion
//#region src/helpers/solid/useEdgeAutoScroll.ts
function useEdgeAutoScroll(args) {
	const { container, innerThreshold, outerThreshold, axis, interval, startInterval = interval, rampFactor = () => .8, startDelay = () => 0, listenTo = () => window, enabled = () => true, smooth = () => true, padding = () => 0 } = args;
	createEffect(() => {
		const el = container();
		if (!el || !enabled()) return;
		let pointerX = 0;
		let pointerY = 0;
		let pointerKnown = false;
		let activeDirection = null;
		let timeoutId = null;
		let armTimer = null;
		let currentInterval = 0;
		const isHorizontal = () => axis() === "horizontal";
		const isRTL = () => isElementRTL(el);
		/**
		* Given a direction (-1 = toward start, +1 = toward end), find the first
		* child whose edge is not yet fully in view and bring its leading edge
		* close to the container edge (not centered).
		*/
		const scrollNearestChild = (direction) => {
			const rect = el.getBoundingClientRect();
			const children = Array.from(el.children);
			if (children.length === 0) return;
			const horizontal = isHorizontal();
			const containerStart = horizontal ? rect.left : rect.top;
			const containerEnd = horizontal ? rect.right : rect.bottom;
			const epsilon = 1;
			let target = null;
			const reversed = horizontal && isRTL();
			if (direction > 0) for (let i = 0; i < children.length; i++) {
				const child = children[reversed ? children.length - 1 - i : i];
				if (!(child instanceof HTMLElement)) continue;
				const cr = child.getBoundingClientRect();
				if ((horizontal ? cr.right : cr.bottom) > containerEnd + epsilon) {
					target = child;
					break;
				}
			}
			else for (let i = children.length - 1; i >= 0; i--) {
				const child = children[reversed ? children.length - 1 - i : i];
				if (!(child instanceof HTMLElement)) continue;
				const cr = child.getBoundingClientRect();
				if ((horizontal ? cr.left : cr.top) < containerStart - epsilon) {
					target = child;
					break;
				}
			}
			if (!target) return;
			const cr = target.getBoundingClientRect();
			let delta;
			if (direction > 0) delta = (horizontal ? cr.right : cr.bottom) - containerEnd + padding();
			else delta = (horizontal ? cr.left : cr.top) - containerStart - padding();
			const behavior = smooth() ? smoothScrollBehavior() : "auto";
			if (horizontal) el.scrollBy({
				left: delta,
				behavior
			});
			else el.scrollBy({
				top: delta,
				behavior
			});
		};
		const canScroll = (direction) => {
			const horizontal = isHorizontal();
			const maxScroll = horizontal ? el.scrollWidth - el.clientWidth : el.scrollHeight - el.clientHeight;
			const scrollPos = horizontal ? el.scrollLeft + (isRTL() ? maxScroll : 0) : el.scrollTop;
			if (direction < 0) return scrollPos > 0;
			return scrollPos < maxScroll - 1;
		};
		/** Returns the direction the cursor's current position activates, if any. */
		const resolveDirection = () => {
			if (!pointerKnown) return null;
			const rect = el.getBoundingClientRect();
			const horizontal = isHorizontal();
			const pos = horizontal ? pointerX : pointerY;
			const start = horizontal ? rect.left : rect.top;
			const end = horizontal ? rect.right : rect.bottom;
			const crossPos = horizontal ? pointerY : pointerX;
			const crossStart = horizontal ? rect.top : rect.left;
			const crossEnd = horizontal ? rect.bottom : rect.right;
			if (crossPos < crossStart || crossPos > crossEnd) return null;
			const inner = innerThreshold();
			const outer = outerThreshold();
			const distFromStart = pos - start;
			const distFromEnd = end - pos;
			if (distFromStart >= -outer && distFromStart <= inner) return -1;
			if (distFromEnd >= -outer && distFromEnd <= inner) return 1;
			return null;
		};
		const stop = () => {
			activeDirection = null;
			if (armTimer != null) {
				clearTimeout(armTimer);
				armTimer = null;
			}
			if (timeoutId != null) {
				clearTimeout(timeoutId);
				timeoutId = null;
			}
		};
		/**
		* One scroll step, then schedules the next one with a shrinking delay so
		* the loop accelerates over time. Stops if we can no longer scroll.
		*/
		const tick = () => {
			timeoutId = null;
			if (activeDirection == null) return;
			if (!canScroll(activeDirection)) {
				stop();
				return;
			}
			scrollNearestChild(activeDirection);
			const min = interval();
			const factor = rampFactor();
			currentInterval = Math.max(min, currentInterval * factor);
			timeoutId = setTimeout(tick, currentInterval);
		};
		/** Begins the ramping loop (called after the optional dwell delay). */
		const begin = () => {
			armTimer = null;
			if (activeDirection == null) return;
			currentInterval = Math.max(interval(), startInterval());
			tick();
		};
		/**
		* Start (or redirect) the auto-scroll loop. After an optional `startDelay`
		* dwell, scrolls item-by-item, ramping from `startInterval` down to
		* `interval`, until the cursor leaves the zone or scrolling bottoms out.
		*/
		const start = (direction) => {
			if (activeDirection === direction) return;
			stop();
			if (!canScroll(direction)) return;
			activeDirection = direction;
			const delay = startDelay();
			if (delay > 0) armTimer = setTimeout(begin, delay);
			else begin();
		};
		const evaluate = () => {
			const direction = resolveDirection();
			if (direction == null) stop();
			else start(direction);
		};
		const onPointerMove = (e) => {
			pointerX = e.clientX;
			pointerY = e.clientY;
			pointerKnown = true;
			evaluate();
		};
		const target = listenTo();
		if (!target) return;
		target.addEventListener("pointermove", onPointerMove);
		onCleanup(() => {
			target.removeEventListener("pointermove", onPointerMove);
			stop();
		});
	});
}
//#endregion
//#region src/components/popups/aiEditorPopup/styleTab.tsx
var _tmpl$$2 = /*#__PURE__*/ template(`<div>`);
var _tmpl$2$1 = /*#__PURE__*/ template(`<div style=overflow:hidden><div>`);
var StyleTab = () => {
	const { rootScope } = useHotReloadGuard();
	const popupContext = usePopupContext();
	const context = useContext(AiEditorPopupContext);
	const { text: originalText, initialTones, promptTextSignal: [promptText, setPromptText], primaryActionSignal: [, setPrimaryAction], resultTextSignal: [resultText], resultRichMessageSignal: [resultRichMessage] } = context;
	const hasArrows = !IS_TOUCH_SUPPORTED;
	const savedSendStyle = takeSavedSendStyle(context, (style) => !style.translateTo && !style.proofRead);
	let toneToSelect = !savedSendStyle?.customPrompt ? savedSendStyle?.toneNameOrId : void 0;
	const [emojify, setEmojify] = createSignal(!!savedSendStyle?.emojify);
	const [promptPending, setPromptPending] = createSignal(false);
	const [promptSelected, setPromptSelected] = createSignal(!!savedSendStyle?.customPrompt);
	const [tonesListEl, setTonesListEl] = createSignal();
	const [selectedTone, setSelectedTone] = createSignal();
	const maxPromptLength = useAiComposerPromptMaxLength();
	const promptLength = () => [...promptText()].length;
	const canGeneratePrompt = () => !!promptText().trim() && promptLength() <= maxPromptLength() && !promptPending();
	const hasResult = () => !!(resultRichMessage() || resultText());
	const { appliedPrompt, generate: generateWithPrompt, reset: resetAppliedPrompt } = useAiComposerPromptGeneration({
		active: promptSelected,
		canGenerate: canGeneratePrompt,
		prompt: promptText
	});
	const maxSavedTones = useMaxSavedTones();
	const scrollableSize = hasArrows ? useElementSize(tonesListEl) : {
		width: 0,
		height: 0
	};
	const scrollFromStart = hasArrows ? useScrollPosition(tonesListEl, "x") : () => 0;
	const isScrolledToStart = () => scrollFromStart() <= 1;
	const isScrolledToEnd = () => !tonesListEl() || tonesListEl().scrollWidth - scrollFromStart() - scrollableSize.width <= 1;
	const fitTones = () => {
		const list = tonesListEl();
		if (!list) return;
		const style = getComputedStyle(list);
		const minWidth = parseFloat(style.getPropertyValue("--tone-min-width"));
		const gap = parseFloat(style.columnGap) || 0;
		const width = list.clientWidth - parseFloat(style.paddingInlineStart);
		const count = [...list.children].filter((child) => !child.classList.contains(bodyContent_module_default.exit)).length;
		if (count * minWidth + (count - 1) * gap <= width) {
			list.style.removeProperty("--tone-width");
			return;
		}
		const whole = Math.max(1, Math.floor((width - minWidth / 2) / (minWidth + gap)));
		list.style.setProperty("--tone-width", (width - whole * gap) / (whole + .5) + "px");
	};
	useObserveResize(tonesListEl, fitTones);
	createEffect(() => {
		const list = tonesListEl();
		if (!list) return;
		const observer = new MutationObserver(fitTones);
		observer.observe(list, { childList: true });
		onCleanup(() => observer.disconnect());
	});
	const selectedToneAuthorId = createMemo(() => {
		const tone = selectedTone();
		const peerId = tone?._ === "aiComposeTone" ? tone.author_id?.toPeerId() : void 0;
		return peerId !== rootScope.myId ? peerId : void 0;
	});
	const [tonesResource] = createResource(() => initialTones ? void 0 : true, () => rootScope.managers.aiTonesManager.getTones(), initialTones ? { initialValue: initialTones } : void 0);
	const [tones, setTones] = createStore([]);
	createComputed(() => {
		if (tonesResource.state !== "ready") return;
		setTones(tonesResource());
		context.initialTones = unwrap(tones);
		if (toneToSelect) {
			const id = toneToSelect;
			toneToSelect = void 0;
			setSelectedTone(tones.find((tone) => getAiComposeToneKey(tone) === id));
		}
	});
	const savedTones = () => tones.filter((tone) => tone._ === "aiComposeTone").length;
	if (hasArrows) useEdgeAutoScroll({
		axis: () => "horizontal",
		container: tonesListEl,
		listenTo: () => popupContext.element,
		innerThreshold: () => 32,
		outerThreshold: () => 16,
		interval: () => 320,
		startInterval: () => 800,
		startDelay: () => 200,
		padding: () => 4,
		rampFactor: () => .75
	});
	const onSelectTone = (tone) => {
		batch(() => {
			setPromptSelected(false);
			resetAppliedPrompt();
			if (tone === selectedTone()) setSelectedTone();
			else setSelectedTone(tone);
		});
	};
	const onSelectPrompt = () => {
		const selected = !promptSelected();
		batch(() => {
			setPromptSelected(selected);
			resetAppliedPrompt();
			setSelectedTone();
			if (selected) setEmojify(false);
		});
	};
	const onPromptInput = (value) => {
		setPromptText(value);
		resetAppliedPrompt(value);
	};
	const setPromptInputField = useAiComposerPromptInput({
		active: promptSelected,
		onSubmit: generateWithPrompt
	});
	if (savedSendStyle?.customPrompt) {
		setPromptText(savedSendStyle.customPrompt);
		generateWithPrompt();
	}
	createEffect(() => {
		if (!promptSelected() || hasResult()) return;
		const action = {
			disabled: () => !canGeneratePrompt(),
			langKey: "AiEditor.Generate",
			onClick: generateWithPrompt
		};
		setPrimaryAction(action);
		onCleanup(() => setPrimaryAction((current) => current === action ? void 0 : current));
	});
	const selectedToneSlugOrId = () => {
		const localSelectedTone = selectedTone();
		if (!localSelectedTone) return void 0;
		if (localSelectedTone._ === "aiComposeTone") track(() => ({ ...localSelectedTone }));
		return getAiComposeToneKey(localSelectedTone);
	};
	const [lastPrompt, setLastPrompt] = createSignal();
	createComputed(() => {
		const prompt = appliedPrompt();
		if (prompt) setLastPrompt(prompt);
	});
	useAiEditorRequest(context, () => ({
		text: originalText,
		customPrompt: promptSelected() ? lastPrompt() : void 0,
		toneNameOrId: selectedToneSlugOrId(),
		emojify: emojify()
	}));
	const getToneContextMenu = (tone) => {
		if (tone._ !== "aiComposeTone") return void 0;
		const isSaved = !tone.pFlags.creator;
		return {
			isSaved,
			onEdit: useEditTone({
				tone,
				tones,
				setTones
			}),
			onShare: useShareTone({ tone }),
			onDelete: useDeleteTone({
				tone,
				isSaved,
				setTones
			})
		};
	};
	return (() => {
		var _el$ = _tmpl$$2();
		insert(_el$, createComponent(AiComposerSection, { get children() {
			return [(() => {
				var _el$2 = _tmpl$$2();
				insert(_el$2, createComponent(Scrollable, {
					get ["class"]() {
						return bodyContent_module_default.tonesList;
					},
					ref: setTonesListEl,
					axis: "x",
					relative: true,
					get children() {
						return createComponent(TransitionGroup, {
							name: "fade-2",
							moveClass: "t-move",
							onBeforeExit: (el) => el.classList.add(bodyContent_module_default.exit),
							get children() {
								return [
									createComponent(Tone, {
										icon: "prompt",
										get name() {
											return createComponent(I18nTsx, { key: "AiEditor.Prompt" });
										},
										get selected() {
											return promptSelected();
										},
										onClick: onSelectPrompt
									}),
									createComponent(Show, {
										get when() {
											return tonesResource.state === "ready";
										},
										get children() {
											return [createComponent(For, {
												each: tones,
												children: (tone) => createComponent(Tone, {
													get docId() {
														return tone.emoji_id;
													},
													get name() {
														return tone.title;
													},
													get selected() {
														return tone === selectedTone();
													},
													onClick: [onSelectTone, tone],
													get withContextMenu() {
														return getToneContextMenu(tone);
													}
												})
											}), createComponent(Show, {
												get when() {
													return savedTones() < maxSavedTones();
												},
												get children() {
													return createComponent(CreateTone, { onCreate: (createdTone) => {
														tonesListEl()?.scrollTo({
															left: 0,
															behavior: "instant"
														});
														setTones((prev) => [createdTone, ...prev]);
													} });
												}
											})];
										}
									}),
									createComponent(Show, {
										get when() {
											return tonesResource.state === "pending";
										},
										get children() {
											return [
												1,
												2,
												3,
												4
											].map(() => (() => {
												var _el$6 = _tmpl$$2();
												insert(_el$6, createComponent(Skeleton.Div, {
													get ["class"]() {
														return bodyContent_module_default.toneSkeletonIcon;
													},
													secondary: true
												}), null);
												insert(_el$6, createComponent(Skeleton.Div, {
													get ["class"]() {
														return bodyContent_module_default.toneSkeletonText;
													},
													textLine: true,
													secondary: true
												}), null);
												createRenderEffect(() => className(_el$6, bodyContent_module_default.toneSkeleton));
												return _el$6;
											})());
										}
									})
								];
							}
						});
					}
				}), null);
				insert(_el$2, hasArrows && [createComponent(IconTsx, {
					get ["class"]() {
						return classNames(bodyContent_module_default.sectionArrow, bodyContent_module_default.sectionArrowStart);
					},
					get classList() {
						return { [bodyContent_module_default.hidden]: isScrolledToStart() };
					},
					icon: "arrowhead"
				}), createComponent(IconTsx, {
					get ["class"]() {
						return classNames(bodyContent_module_default.sectionArrow, bodyContent_module_default.sectionArrowEnd);
					},
					get classList() {
						return { [bodyContent_module_default.hidden]: isScrolledToEnd() };
					},
					icon: "arrowhead"
				})], null);
				createRenderEffect(() => className(_el$2, bodyContent_module_default.sectionWrapper));
				return _el$2;
			})(), (() => {
				var _el$3 = _tmpl$$2();
				insert(_el$3, createComponent(TransitionGroup, {
					name: "fade-2",
					moveClass: "t-move-std",
					onBeforeExit: (el) => {
						if (!(el instanceof HTMLElement)) return;
						el.classList.add(bodyContent_module_default.exit);
					},
					get children() {
						return [
							createComponent(Show, {
								get when() {
									return promptSelected();
								},
								get children() {
									var _el$4 = _tmpl$$2();
									insert(_el$4, createComponent(AiComposerPromptField, {
										instanceRef: setPromptInputField,
										label: "AiEditor.PromptPlaceholder",
										get maxLength() {
											return maxPromptLength();
										},
										onRawInput: onPromptInput,
										get value() {
											return promptText();
										}
									}));
									createRenderEffect(() => className(_el$4, bodyContent_module_default.promptField));
									return _el$4;
								}
							}),
							(() => {
								var _el$5 = _tmpl$$2();
								createRenderEffect(() => className(_el$5, bodyContent_module_default.tonesBorder));
								return _el$5;
							})(),
							createComponent(Original, {
								isAppearing: false,
								text: originalText,
								get onEmojify() {
									return !emojify() && !selectedTone() && !promptSelected() ? () => setEmojify(true) : void 0;
								}
							}),
							createComponent(Show, {
								get when() {
									return emojify() || selectedTone() || appliedPrompt();
								},
								get children() {
									return [createComponent(Divider, {}), createComponent(Result, {
										get emojify() {
											return emojify();
										},
										onEmojify: () => setEmojify(!emojify()),
										onPendingChange: setPromptPending,
										get composeMessageWithAiArgs() {
											return {
												text: originalText,
												customPrompt: appliedPrompt(),
												toneNameOrId: selectedToneSlugOrId(),
												emojify: emojify()
											};
										}
									})];
								}
							})
						];
					}
				}));
				createRenderEffect(() => className(_el$3, bodyContent_module_default.tonesRest));
				return _el$3;
			})()];
		} }), null);
		insert(_el$, createComponent(HeightTransition, { get children() {
			return createComponent(Show, {
				get when() {
					return selectedToneAuthorId();
				},
				children: (authorId) => (() => {
					var _el$7 = _tmpl$2$1(), _el$8 = _el$7.firstChild;
					insert(_el$8, createComponent(I18nTsx, {
						key: "AiEditor.StyleBy",
						get args() {
							return [createComponent(CreatorLink, {
								get peerId() {
									return authorId();
								},
								onClick: () => popupContext.hide()
							})];
						}
					}));
					createRenderEffect(() => className(_el$8, fieldSectionCaption_module_default.fieldSectionCaption));
					return _el$7;
				})()
			});
		} }), null);
		return _el$;
	})();
};
var useEditTone = ({ tone, tones, setTones }) => {
	const { rootScope, HotReloadGuard } = useHotReloadGuard();
	if (!tone.pFlags.creator) return;
	return () => {
		showCreateTonePopup({
			HotReloadGuard,
			initialValues: {
				title: tone.title,
				emojiId: tone.emoji_id,
				prompt: tone.prompt,
				displayAuthor: !!tone.author_id
			},
			titleLangKey: "AiEditor.NewStyle.TitleEdit",
			submitLangKey: "Save",
			errorLangKey: "AiEditor.NewStyle.ErrorEdit",
			onSubmit: async (payload) => {
				const updatedTone = await rootScope.managers.aiTonesManager.editTone({
					toneId: tone.id.toString(),
					...payload
				});
				for (const [key] of cachedComposedMessages) try {
					if (JSON.parse(key).toneNameOrId.toString() === tone.id.toString()) cachedComposedMessages.delete(key);
				} catch {}
				const prevTone = tones.find((t) => t._ === "aiComposeTone" && t.id.toString() === tone.id.toString());
				if (!prevTone) return;
				batch(() => {
					setTones((prev) => [prevTone, ...prev.filter((t) => t._ !== "aiComposeTone" || t.id.toString() !== tone.id.toString())]);
					setTones(0, reconcile(updatedTone));
				});
			}
		});
	};
};
var useShareTone = ({ tone }) => {
	const { rootScope, showSharingPickerPopup, PaidMessagesInterceptor } = useHotReloadGuard();
	return () => {
		showSharingPickerPopup({ onSelect: async ([peer]) => {
			const managers = bindManagersToSession(rootScope.managers);
			if (!peer) return;
			const preparedPaymentResult = await PaidMessagesInterceptor.prepareStarsForPayment({
				peerId: peer.peerId,
				messageCount: 1
			});
			if (preparedPaymentResult === PaidMessagesInterceptor.PaymentRejectedSymbol) throw new Error();
			const link = "https://t.me/addstyle/" + tone.slug;
			managers.appMessagesManager.sendText({
				peerId: peer.peerId,
				threadId: peer.threadId,
				replyToMonoforumPeerId: peer.monoforumThreadId,
				text: link,
				confirmedPaymentResult: preparedPaymentResult
			});
		} });
	};
};
var useDeleteTone = ({ tone, isSaved, setTones }) => {
	const { rootScope, toastNew, confirmationPopup } = useHotReloadGuard();
	return async () => {
		const managers = bindManagersToSession(rootScope.managers);
		try {
			if (isSaved) await managers.aiTonesManager.removeSavedTone(tone.id);
			else {
				try {
					await confirmationPopup({
						titleLangKey: "AiEditor.DeleteStyle.Title",
						descriptionLangKey: "AiEditor.DeleteStyle.Description",
						button: {
							langKey: "Delete",
							isDanger: true
						}
					});
				} catch {
					return;
				}
				await managers.aiTonesManager.deleteTone(tone.id.toString());
			}
			setTones((prev) => prev.filter((t) => t._ !== "aiComposeTone" || t.id !== tone.id));
		} catch {
			toastNew({ langPackKey: "AiEditor.StyleRemoveError" });
		}
	};
};
//#endregion
//#region src/components/popups/aiEditorPopup/translateTab.tsx
var _tmpl$$1 = /*#__PURE__*/ template(`<span>`);
var TranslateTab = (props) => {
	const { usePeerTranslation, pickLanguage } = useHotReloadGuard();
	const context = useAiEditorPopupContext();
	const { peerId, text: originalText } = context;
	const peerTranslation = usePeerTranslation(peerId);
	const savedTranslation = takeSavedSendStyle(context, (style) => !!style.translateTo);
	const [emojify, setEmojify] = createSignal(!!savedTranslation?.emojify);
	const [language, setLanguage] = createSignal(savedTranslation?.translateTo || peerTranslation.language());
	const { Wrapper, onMeasured } = useTransitionGroupWhenMeasured();
	const request = () => ({
		text: originalText,
		translateTo: language(),
		emojify: emojify()
	});
	useAiEditorRequest(context, request);
	const onLanguageClick = async () => {
		const lang = await pickLanguage(false);
		setLanguage(lang);
		peerTranslation.setLanguage(lang);
	};
	return createComponent(AutoHeight, {
		get outerClass() {
			return bodyContent_module_default.tabContent;
		},
		get children() {
			return createComponent(Wrapper, { get children() {
				return [
					createComponent(Original, {
						get isAppearing() {
							return props.isAppearing;
						},
						text: originalText,
						onMeasured
					}),
					createComponent(Divider, {}),
					createComponent(Result, {
						get isAppearing() {
							return props.isAppearing;
						},
						get overrideTitle() {
							return createComponent(I18nTsx, {
								get ["class"]() {
									return previewCard_module_default.resultTitle;
								},
								key: "AiEditor.TranslateTo",
								get args() {
									return [(() => {
										var _el$ = _tmpl$$1();
										_el$.$$click = onLanguageClick;
										use(ripple, _el$, () => true);
										insert(_el$, createComponent(I18nTsx, { get key() {
											return `Language.${language()}`;
										} }));
										createRenderEffect(() => className(_el$, previewCard_module_default.resultLanguage));
										return _el$;
									})()];
								}
							});
						},
						get emojify() {
							return emojify();
						},
						onEmojify: () => setEmojify(!emojify()),
						get composeMessageWithAiArgs() {
							return request();
						}
					})
				];
			} });
		}
	});
};
delegateEvents(["click"]);
//#endregion
//#region src/components/popups/aiEditorPopup/bodyContent.tsx
var _tmpl$ = /*#__PURE__*/ template(`<span dir=auto>`);
var _tmpl$2 = /*#__PURE__*/ template(`<div>`);
var _tmpl$3 = /*#__PURE__*/ template(`<div> `);
var _tmpl$4 = /*#__PURE__*/ template(`<div><div>`);
var SendStyleSummary = (props) => {
	const asked = () => {
		const { style } = props;
		if (style.proofRead) return createComponent(I18nTsx, { key: "AiEditor.AlwaysUse.Summary.Fix" });
		let asked;
		if (style.translateTo) asked = createComponent(I18nTsx, { get key() {
			return `Language.${style.translateTo}`;
		} });
		else if (style.customPrompt) asked = createComponent(I18nTsx, {
			key: "AiEditor.AlwaysUse.Summary.Prompt",
			get args() {
				return [(() => {
					var _el$ = _tmpl$();
					insert(_el$, () => style.customPrompt);
					return _el$;
				})()];
			}
		});
		else if (style.toneNameOrId) asked = (() => {
			var _el$2 = _tmpl$();
			insert(_el$2, () => style.toneTitle || style.toneNameOrId);
			return _el$2;
		})();
		if (!style.emojify) return asked;
		return asked ? createComponent(I18nTsx, {
			key: "AiEditor.AlwaysUse.Summary.WithEmoji",
			args: [asked]
		}) : createComponent(I18nTsx, { key: "Emoji" });
	};
	return createComponent(I18nTsx, {
		key: "AiEditor.AlwaysUse.Summary",
		get args() {
			return [asked()];
		}
	});
};
var AiEditorPopupBodyContent = () => {
	const context = useAiEditorPopupContext();
	const { peerId, isScheduled, onApply, onApplyRichMessage, onSend, onSendRichMessage, canSendWhenOnline, savedSendStyle, onSaveSendStyle, actionPending, primaryActionSignal: [primaryAction], resultTextSignal: [resultText], resultRichMessageSignal: [resultRichMessage], requestSignal: [request] } = context;
	const popup = usePopupContext();
	const middleware = popup.middlewareHelper.get();
	const isActive = () => !popup.destroyed && middleware();
	const { toastNew, I18n } = useHotReloadGuard();
	const [effect, setEffect] = createSignal();
	const [schedulePending, setSchedulePending] = createSignal(false);
	const hasResult = () => !!(resultRichMessage() || resultText());
	const canSendResult = () => hasResult() && !actionPending() && !schedulePending();
	const prepareSendResult = () => {
		if (!isActive() || !canSendResult()) return;
		const richMessage = resultRichMessage();
		const text = resultText();
		const selectedEffect = effect();
		if (!richMessage && (!text || !onSend)) return;
		return (options) => {
			if (!isActive()) return;
			if (richMessage && onSendRichMessage) return onSendRichMessage(richMessage, {
				...options,
				effect: selectedEffect
			});
			if (text && onSend) return onSend(text, {
				...options,
				effect: selectedEffect
			});
		};
	};
	const sendResult = (options) => prepareSendResult()?.(options);
	const openScheduleAndSend = async () => {
		const send = prepareSendResult();
		if (!send) return;
		setSchedulePending(true);
		try {
			const online = await canSendWhenOnline?.();
			if (!isActive()) return;
			showScheduleSendingPopup({
				canSendWhenOnline: online,
				onPick: (timestamp, repeatPeriod, silent) => send({
					scheduleDate: timestamp,
					scheduleRepeatPeriod: repeatPeriod,
					silent
				})
			});
		} catch {
			if (isActive()) toastNew({ langPackKey: "Error.AnError" });
		} finally {
			setSchedulePending(false);
		}
	};
	const handleSendClick = () => {
		if (!canSendResult()) return;
		if (isScheduled) {
			openScheduleAndSend();
			return;
		}
		sendResult();
	};
	const sendStyle = createMemo(() => {
		const args = request();
		const tone = args?.toneNameOrId && context.initialTones?.find((tone) => getAiComposeToneKey(tone) === args.toneNameOrId);
		return getAiSendStyleOfRequest(args, tone?.title);
	}, void 0, { equals: (a, b) => isSameAiSendStyle(a, b) && a?.toneTitle === b?.toneTitle });
	const [alwaysUse, setAlwaysUse] = createSignal(!!savedSendStyle);
	let keptSendStyle = savedSendStyle;
	const keepSendStyle = (style) => {
		if (!isActive() || !onSaveSendStyle(style)) return false;
		keptSendStyle = style;
		return true;
	};
	const onAlwaysUseChange = (on) => {
		if (!keepSendStyle(on ? sendStyle() : void 0)) setAlwaysUse(!on);
	};
	createEffect(on(sendStyle, (style) => {
		if (alwaysUse() && !isSameAiSendStyle(style, keptSendStyle)) keepSendStyle(style);
	}, { defer: true }));
	let alwaysUseRow, drawn = false;
	onMount(() => fastRaf(() => drawn = true));
	const alwaysUseLines = createRowLinesTransition(() => alwaysUseRow);
	createComputed(on(sendStyle, () => {
		if (drawn) alwaysUseLines.prepare();
	}, { defer: true }));
	const [activeTab, setActiveTab] = createSignal(savedSendStyle?.translateTo ? 0 : savedSendStyle?.proofRead ? 2 : 1);
	let switchedTab = false;
	const onTabChange = (key) => {
		switchedTab = true;
		setActiveTab(key);
	};
	const [hasTransition, setHasTransition] = createSignal(false);
	const [scrollableEl, setScrollableEl] = createSignal();
	const [scrollableContentEl, setScrollableContentEl] = createSignal();
	let scrollableContextRef;
	const updateScrollable = debounce(() => {
		scrollableContextRef?.onSizeChange();
	}, 100, false, true);
	useObserveResize(scrollableContentEl, updateScrollable);
	useObserveResize(scrollableEl, updateScrollable);
	return (() => {
		var _el$3 = _tmpl$4(), _el$7 = _el$3.firstChild;
		insert(_el$3, createComponent(Tabs, {
			get items() {
				return [
					{
						label: "Translate",
						icon: "premium_translate",
						key: 0
					},
					{
						label: "AiEditor.Style",
						icon: "edit_stars",
						key: 1
					},
					{
						label: "AiEditor.Fix",
						icon: "search_check",
						key: 2
					}
				];
			},
			get activeKey() {
				return activeTab();
			},
			onTabChange
		}), _el$7);
		insert(_el$3, createComponent(Space, { amount: "0.5rem" }), _el$7);
		insert(_el$3, createComponent(Scrollable, {
			tabIndex: 0,
			ref: setScrollableEl,
			get ["class"]() {
				return bodyContent_module_default.scrollable;
			},
			relative: true,
			withBorders: "both",
			contextRef: (value) => void (scrollableContextRef = value),
			get children() {
				var _el$4 = _tmpl$3();
				_el$4.firstChild;
				insert(_el$4, createComponent(AutoHeight, {
					ref: setScrollableContentEl,
					get outerClass() {
						return bodyContent_module_default.autoHeight;
					},
					get hasTransition() {
						return hasTransition();
					},
					overflowHidden: true,
					get children() {
						return createComponent(Transition, {
							name: "fade-2",
							onBeforeExit: (el) => {
								el.classList.add(bodyContent_module_default.exit);
								setHasTransition(true);
							},
							onAfterExit: () => setHasTransition(false),
							onBeforeEnter: () => setHasTransition(true),
							onAfterEnter: () => setHasTransition(false),
							get children() {
								return createComponent(Switch, { get children() {
									return [
										createComponent(Match, {
											get when() {
												return activeTab() === 0;
											},
											children: (_) => {
												const isAppearing = switchedTab ? useIsAppearing(hasTransition) : () => false;
												return (() => {
													var _el$8 = _tmpl$2();
													insert(_el$8, createComponent(TranslateTab, { get isAppearing() {
														return isAppearing();
													} }));
													return _el$8;
												})();
											}
										}),
										createComponent(Match, {
											get when() {
												return activeTab() === 1;
											},
											get children() {
												var _el$6 = _tmpl$2();
												insert(_el$6, createComponent(StyleTab, {}));
												return _el$6;
											}
										}),
										createComponent(Match, {
											get when() {
												return activeTab() === 2;
											},
											children: (_) => {
												const isAppearing = switchedTab ? useIsAppearing(hasTransition) : () => false;
												return (() => {
													var _el$9 = _tmpl$2();
													insert(_el$9, createComponent(FixTab, { get isAppearing() {
														return isAppearing();
													} }));
													return _el$9;
												})();
											}
										})
									];
								} });
							}
						});
					}
				}), null);
				insert(_el$4, createComponent(Show, {
					when: onSaveSendStyle,
					get children() {
						return createComponent(Section, {
							get ["class"]() {
								return bodyContent_module_default.alwaysUse;
							},
							caption: "AiEditor.AlwaysUse.Footer",
							noShadow: true,
							get children() {
								return createComponent(Row, {
									ref(r$) {
										var _ref$ = alwaysUseRow;
										typeof _ref$ === "function" ? _ref$(r$) : alwaysUseRow = r$;
									},
									get disabled() {
										return actionPending() || schedulePending();
									},
									get children() {
										return [
											createComponent(Row.CheckboxFieldToggle, { get children() {
												return createComponent(CheckboxFieldTsx, {
													toggle: true,
													signal: [alwaysUse, setAlwaysUse],
													get disabled() {
														return actionPending() || schedulePending();
													},
													onChange: onAlwaysUseChange
												});
											} }),
											createComponent(Row.Title, { get children() {
												return createComponent(I18nTsx, { key: "AiEditor.AlwaysUse" });
											} }),
											createComponent(Show, {
												get when() {
													return sendStyle();
												},
												keyed: true,
												children: (style) => createComponent(Row.Subtitle, { get children() {
													return createComponent(SendStyleSummary, { style });
												} })
											})
										];
									}
								});
							}
						});
					}
				}), null);
				createRenderEffect(() => className(_el$4, bodyContent_module_default.scrollableContent));
				return _el$4;
			}
		}), _el$7);
		insert(_el$3, createComponent(Space, { amount: "0.5rem" }), _el$7);
		insert(_el$7, createComponent(CopyResultButton, {}), null);
		insert(_el$7, createComponent(Button, {
			get ["class"]() {
				return bodyContent_module_default.applyButton;
			},
			primaryFilled: true,
			get disabled() {
				return actionPending() || schedulePending() || (primaryAction()?.disabled() ?? !hasResult());
			},
			onClick: () => {
				const action = primaryAction();
				if (action) {
					action.onClick();
					return;
				}
				const richMessage = resultRichMessage();
				if (richMessage && onApplyRichMessage) onApplyRichMessage(richMessage);
				else if (resultText()) onApply(resultText());
			},
			get children() {
				return createComponent(I18nTsx, { get key() {
					return primaryAction()?.langKey || "Apply";
				} });
			}
		}), null);
		insert(_el$7, createComponent(Show, {
			when: onSend || onSendRichMessage,
			keyed: true,
			children: (_send) => {
				let sendButton;
				const withEffects = () => peerId.isUser() && peerId !== rootScope.myId;
				if (!isScheduled) onMount(() => {
					new SendMenu({
						onSilentClick: () => sendResult({ silent: true }),
						onScheduleClick: openScheduleAndSend,
						onSendWhenOnlineClick: () => sendResult({ scheduleDate: SEND_WHEN_ONLINE_TIMESTAMP }),
						onOpen: canSendResult,
						openSide: "top-left",
						onContextElement: sendButton,
						middleware: createMiddleware().get(),
						canSendWhenOnline,
						withEffects,
						effect,
						onEffect: setEffect
					}).setPeerParams({
						peerId,
						isPaid: false
					});
				});
				return (() => {
					var _el$0 = _tmpl$2();
					insert(_el$0, createComponent(Button, {
						ref(r$) {
							var _ref$2 = sendButton;
							typeof _ref$2 === "function" ? _ref$2(r$) : sendButton = r$;
						},
						get ["class"]() {
							return bodyContent_module_default.roundButton;
						},
						primaryFilled: true,
						get disabled() {
							return !canSendResult();
						},
						get ["aria-label"]() {
							return I18n.format("Send", true);
						},
						onClick: handleSendClick,
						get children() {
							return createComponent(IconTsx, {
								get ["class"]() {
									return classNames(bodyContent_module_default.roundButtonIcon, "icon-mirror");
								},
								icon: "logo"
							});
						}
					}), null);
					insert(_el$0, createComponent(Show, {
						when: !isScheduled,
						get children() {
							return createComponent(SelectedEffect, { effect });
						}
					}), null);
					createRenderEffect(() => className(_el$0, bodyContent_module_default.sendButtonWrapper));
					return _el$0;
				})();
			}
		}), null);
		createRenderEffect((_p$) => {
			var _v$ = bodyContent_module_default.bodyContent, _v$2 = bodyContent_module_default.footerButtons;
			_v$ !== _p$.e && className(_el$3, _p$.e = _v$);
			_v$2 !== _p$.t && className(_el$7, _p$.t = _v$2);
			return _p$;
		}, {
			e: void 0,
			t: void 0
		});
		return _el$3;
	})();
};
//#endregion
//#region src/components/popups/aiEditorPopup/aiEditorPopup.tsx
var AiEditorPopup = (props) => {
	return createComponent(PopupElement, {
		get ["class"]() {
			return aiEditorPopup_module_default.popup;
		},
		get containerClass() {
			return aiEditorPopup_module_default.container;
		},
		get children() {
			return [createComponent(PopupElement.Header, { get children() {
				return [createComponent(PopupElement.CloseButton, {}), createComponent(PopupElement.Title, { get children() {
					return createComponent(I18nTsx, { key: "AiEditor.Title" });
				} })];
			} }), createComponent(PopupElement.Body, { get children() {
				return createComponent(AiEditorPopupProvider, mergeProps(props, { get children() {
					return createComponent(AiEditorPopupBodyContent, {});
				} }));
			} })];
		}
	});
};
function openAiEditorPopup(props, HotReloadGuard) {
	createPopup(() => createComponent(HotReloadGuard, { get children() {
		return createComponent(AiEditorPopup, props);
	} }));
}
//#endregion
export { openAiEditorPopup };
