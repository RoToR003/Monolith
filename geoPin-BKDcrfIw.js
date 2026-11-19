//# allFunctionsCalledOnLoad
const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["Temml-Local-DQjKNG7K.css"])))=>i.map(i=>d[i]);
import { n as fastRaf } from "./schedulers-Cx0-7a1P.js";
import "./rootScope-CZS0lmz8.js";
import { A as mergeProps, C as createSignal, I as splitProps, L as untrack, M as onCleanup, N as onMount, _ as createMemo, g as createEffect, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { t as __vitePreload } from "./preload-helper-B0NHKCoo.js";
import { t as clamp } from "./clamp-9UaNhw6N.js";
import { _ as use, f as setAttribute, g as template, m as spread, o as className } from "./web-BPyQozky.js";
import { t as accumulate } from "./accumulate-DzVphodg.js";
import { t as classNames } from "./classNames-DxGDjmvw.js";
import { t as getMiddleware } from "./middleware-D6HuIqPm.js";
import { st as updateGraphemeOffsets } from "./confirmationPopup-Bz6mK0o-.js";
import { F as MATH_MARKER_RE, I as decodeInlineMath, j as getOrderedListTypePresentation } from "./canPollPeerStories-D3HoBvLX.js";
import { r as copyTextToClipboard } from "./clipboard-DzscV-ca.js";
import { u as instantViewStyles_default } from "./instantViewFormatting-sqXAtEbL.js";
//#region src/helpers/dom/copyFromElement.ts
function copyFromElement(element) {
	copyTextToClipboard(element.textContent);
}
var staticCheckbox_module_default = {
	Checkbox: "_Checkbox_e6ffx_16",
	"is-safari": "_is-safari_e6ffx_28",
	checked: "_checked_e6ffx_31",
	Check: "_Check_e6ffx_16",
	Background: "_Background_e6ffx_36",
	round: "_round_e6ffx_42",
	Border: "_Border_e6ffx_48"
};
//#endregion
//#region src/components/staticCheckbox.tsx
var _tmpl$$2 = /*#__PURE__*/ template(`<div><div></div><div></div><svg viewBox="0 0 24 24"><use>`);
var StaticCheckbox = (inProps) => {
	const [props, restProps] = splitProps(inProps, [
		"class",
		"classList",
		"checked",
		"round",
		"cross"
	]);
	return (() => {
		var _el$ = _tmpl$$2(), _el$2 = _el$.firstChild, _el$3 = _el$2.nextSibling, _el$4 = _el$3.nextSibling, _el$5 = _el$4.firstChild;
		spread(_el$, mergeProps({
			get ["class"]() {
				return classNames(staticCheckbox_module_default.Checkbox, props.class);
			},
			get classList() {
				return {
					[staticCheckbox_module_default.checked]: props.checked,
					[staticCheckbox_module_default.round]: props.round,
					...props.classList
				};
			}
		}, restProps), false, true);
		createRenderEffect((_p$) => {
			var _v$ = staticCheckbox_module_default.Border, _v$2 = staticCheckbox_module_default.Background, _v$3 = staticCheckbox_module_default.Check, _v$4 = props.cross ? "#checkbox-cross" : "#check", _v$5 = props.cross ? void 0 : "-1";
			_v$ !== _p$.e && className(_el$2, _p$.e = _v$);
			_v$2 !== _p$.t && className(_el$3, _p$.t = _v$2);
			_v$3 !== _p$.a && setAttribute(_el$4, "class", _p$.a = _v$3);
			_v$4 !== _p$.o && setAttribute(_el$5, "href", _p$.o = _v$4);
			_v$5 !== _p$.i && setAttribute(_el$5, "x", _p$.i = _v$5);
			return _p$;
		}, {
			e: void 0,
			t: void 0,
			a: void 0,
			o: void 0,
			i: void 0
		});
		return _el$;
	})();
};
//#endregion
//#region src/helpers/array/chunk.ts
/** The items in runs of at most `size`, in their order. */
function chunk(items, size) {
	const chunks = [];
	for (let index = 0; index < items.length; index += size) chunks.push(items.slice(index, index + size));
	return chunks;
}
var genericTable_module_default = {
	wrapper: "_wrapper_1ag8w_16",
	border: "_border_1ag8w_20",
	genericTable: "_genericTable_1ag8w_29",
	bordered: "_bordered_1ag8w_42",
	genericCell: "_genericCell_1ag8w_46",
	genericHeaderCell: "_genericHeaderCell_1ag8w_47",
	striped: "_striped_1ag8w_51",
	genericRow: "_genericRow_1ag8w_51",
	cellAlignCenter: "_cellAlignCenter_1ag8w_70",
	cellAlignRight: "_cellAlignRight_1ag8w_74",
	cellValignMiddle: "_cellValignMiddle_1ag8w_78",
	cellValignBottom: "_cellValignBottom_1ag8w_82"
};
//#endregion
//#region src/components/instantViewList.ts
function orderedListTypeStyle(type) {
	const presentation = getOrderedListTypePresentation(type);
	return presentation ? `list-style-type: ${presentation.style}; --iv-list-style: ${presentation.style}` : "";
}
function orderedListCounterStyle(start, reversed = false, type) {
	const step = reversed ? -1 : 1;
	return `counter-reset: iv-list-item ${start - step}; --iv-list-step: ${step}; ${orderedListTypeStyle(type)}`;
}
function orderedListItemStyle(value, type) {
	return [Number.isInteger(value) ? `--iv-list-value: ${value}` : "", orderedListTypeStyle(type)].filter(Boolean).join("; ");
}
//#endregion
//#region node_modules/.pnpm/temml@0.13.3_patch_hash=fe44cf845de8eafde1ff19dbd2f89a7efbf8aa67519b278247acae631bbd0176/node_modules/temml/dist/temml.min.js?url
var temml_min_default = "/Monolith/temml.min-hAWgkkCF.js";
//#endregion
//#region src/helpers/math/loadTemml.ts
var temmlPromise;
function loadTemml() {
	if (!temmlPromise) temmlPromise = Promise.all([loadTemmlScript(), __vitePreload(() => Promise.resolve({}), __vite__mapDeps([0]))]).then(([temml]) => temml);
	return temmlPromise;
}
function loadTemmlScript() {
	return new Promise((resolve, reject) => {
		const script = document.createElement("script");
		script.src = temml_min_default;
		script.onload = () => {
			const temml = window.temml;
			if (temml) resolve(temml);
			else reject(/* @__PURE__ */ new Error("temml: loaded but no global"));
		};
		script.onerror = () => reject(/* @__PURE__ */ new Error("temml: failed to load"));
		document.head.append(script);
	});
}
//#endregion
//#region src/components/chat/bubbleParts/solidMessageText/revealLeafBinding.ts
/**
* Registers one reveal leaf and exposes whether its latest local update has
* had visibility applied by the body coordinator. The acknowledgement signal
* changes only for this leaf, so unchanged leaves do not wake up for every
* global source revision.
*/
function createMessageTextRevealLeafBinding(options) {
	const coordinator = options.coordinator;
	if (!coordinator) return;
	const leaf = coordinator.registerLeaf();
	const updateGeneration = createMemo(() => leaf.update(options.value()));
	const ready = createMemo(() => {
		return leaf.appliedGeneration() >= updateGeneration();
	});
	onMount(() => leaf.setElement(options.element?.()));
	onCleanup(() => leaf.dispose());
	return {
		leaf,
		ready
	};
}
//#endregion
//#region src/components/instantViewMath.tsx
var _tmpl$$1 = /*#__PURE__*/ template(`<span>`);
var labelIdSeed = 0;
function namespaceLabelIds(element) {
	const labelled = element.querySelectorAll("[id]");
	const referencing = element.querySelectorAll("[href^=\"#\"]");
	if (!labelled.length && !referencing.length) return;
	const prefix = "tml-label-" + ++labelIdSeed + "-";
	labelled.forEach((node) => node.setAttribute("id", prefix + node.getAttribute("id")));
	referencing.forEach((node) => node.setAttribute("href", "#" + prefix + node.getAttribute("href").slice(1)));
}
var MAX_FORMULA_EXPANDED_TOKENS = 1e5;
var MAX_FORMULA_NODES = 4e3;
var FRAME_NODE_ALLOWANCE = 2e3;
var frameNodes = 0;
var frameArmed = false;
var waiting = [];
function armFrame() {
	if (frameArmed) return;
	frameArmed = true;
	fastRaf(() => {
		frameArmed = false;
		frameNodes = 0;
		try {
			while (waiting.length && frameNodes < FRAME_NODE_ALLOWANCE) frameNodes += waiting.shift()();
		} finally {
			if (waiting.length || frameNodes >= FRAME_NODE_ALLOWANCE) armFrame();
		}
	});
}
function typesetWithinFrameAllowance(typeset, immediate) {
	if (immediate || frameNodes < FRAME_NODE_ALLOWANCE) {
		frameNodes += typeset();
		armFrame();
		return;
	}
	return new Promise((resolve) => {
		waiting.push(() => {
			try {
				return typeset();
			} finally {
				resolve();
			}
		});
		armFrame();
	});
}
function renderLatexInto(element, source, isBlock, middleware, immediate, onReplaced) {
	element.textContent = source;
	return loadTemml().then((temml) => typesetWithinFrameAllowance(() => {
		if (middleware && !middleware()) return 0;
		try {
			element.textContent = "";
			temml.render(source, element, {
				displayMode: isBlock,
				throwOnError: true,
				maxExpandTokens: MAX_FORMULA_EXPANDED_TOKENS,
				maxNodes: MAX_FORMULA_NODES
			});
			namespaceLabelIds(element);
			return element.getElementsByTagName("*").length;
		} catch {
			element.textContent = source;
			return 0;
		} finally {
			onReplaced?.();
		}
	}, immediate), () => {
		if (middleware && !middleware()) return;
		element.textContent = source;
		onReplaced?.();
	});
}
function Latex(props) {
	let ref;
	let generation = getMiddleware();
	let offsetsText = "";
	let offsets = [0];
	let renderKey;
	const sourceRevision = () => props.sourceRevision?.() ?? 0;
	const phase = () => props.phase?.() ?? "final";
	const value = createMemo(() => ({
		_: "textWithEntities",
		text: props.source || "",
		entities: []
	}));
	const revealBinding = createMessageTextRevealLeafBinding({
		coordinator: props.revealCoordinator,
		value,
		element: () => ref
	});
	const revealLeaf = revealBinding?.leaf;
	const coordinatedPhase = revealLeaf ? props.revealCoordinator.phase : void 0;
	const [renderedSourceRevision, setRenderedSourceRevision] = createSignal(untrack(sourceRevision));
	const visibleSource = createMemo(() => {
		const source = value().text;
		const visibleGraphemes = revealLeaf?.visibleGraphemes();
		if (visibleGraphemes === void 0) return source;
		if (source !== offsetsText) {
			const append = source.length >= offsetsText.length && source.startsWith(offsetsText);
			offsets = updateGraphemeOffsets(offsetsText, offsets, source, append);
			offsetsText = source;
		}
		const index = Math.max(0, Math.min(Math.floor(visibleGraphemes), offsets.length - 1));
		return source.slice(0, offsets[index]);
	});
	createEffect(() => {
		const revision = revealLeaf ? untrack(sourceRevision) : sourceRevision();
		if (revealBinding && !revealBinding.ready()) return;
		const source = visibleSource();
		const fullSource = value().text;
		const currentPhase = coordinatedPhase?.() ?? phase();
		const shouldTypeset = source === fullSource && currentPhase === "final";
		const nextRenderKey = `${shouldTypeset ? "latex" : "raw"}\x00${source}`;
		setRenderedSourceRevision(revision);
		if (nextRenderKey === renderKey) return;
		renderKey = nextRenderKey;
		generation.destroy();
		generation = getMiddleware();
		const middleware = generation.get();
		if (!source) {
			ref.textContent = "";
			props.onTextLayout?.({
				element: ref,
				sourceRevision: revision,
				phase: currentPhase,
				reason: "render",
				renderMode: "replace"
			});
			return;
		}
		if (!shouldTypeset) {
			ref.textContent = source;
			props.onTextLayout?.({
				element: ref,
				sourceRevision: revision,
				phase: currentPhase,
				reason: "render",
				renderMode: "replace"
			});
			return;
		}
		const ready = renderLatexInto(ref, source, props.isBlock, middleware);
		props.onTextLayout?.({
			element: ref,
			sourceRevision: revision,
			phase: currentPhase,
			reason: "render",
			renderMode: "replace"
		});
		ready.then(() => {
			if (!middleware()) return;
			props.onTextLayout?.({
				element: ref,
				sourceRevision: untrack(sourceRevision),
				phase: coordinatedPhase ? untrack(coordinatedPhase) : untrack(phase),
				reason: "resources-ready",
				renderMode: "replace"
			});
		});
	});
	onCleanup(() => {
		generation.destroy();
	});
	return (() => {
		var _el$ = _tmpl$$1();
		var _ref$ = ref;
		typeof _ref$ === "function" ? use(_ref$, _el$) : ref = _el$;
		createRenderEffect((_p$) => {
			var _v$ = classNames(instantViewStyles_default.Latex, props.isBlock && instantViewStyles_default.LatexBlock), _v$2 = renderedSourceRevision(), _v$3 = props.isBlock ? "" : void 0, _v$4 = props.isBlock ? void 0 : "", _v$5 = props.source;
			_v$ !== _p$.e && className(_el$, _p$.e = _v$);
			_v$2 !== _p$.t && setAttribute(_el$, "data-source-revision", _p$.t = _v$2);
			_v$3 !== _p$.a && setAttribute(_el$, "data-block-math", _p$.a = _v$3);
			_v$4 !== _p$.o && setAttribute(_el$, "data-inline-math", _p$.o = _v$4);
			_v$5 !== _p$.i && setAttribute(_el$, "data-source", _p$.i = _v$5);
			return _p$;
		}, {
			e: void 0,
			t: void 0,
			a: void 0,
			o: void 0,
			i: void 0
		});
		return _el$;
	})();
}
function hydrateInlineMath(fragment, middleware, typeset = true) {
	const walker = document.createTreeWalker(fragment, NodeFilter.SHOW_TEXT);
	const textNodes = [];
	const work = [];
	let node;
	while (node = walker.nextNode()) if (node.nodeValue.includes("")) textNodes.push(node);
	for (const textNode of textNodes) {
		const text = textNode.nodeValue;
		MATH_MARKER_RE.lastIndex = 0;
		if (!MATH_MARKER_RE.test(text)) continue;
		MATH_MARKER_RE.lastIndex = 0;
		const pieces = document.createDocumentFragment();
		let last = 0;
		let m;
		while (m = MATH_MARKER_RE.exec(text)) {
			if (m.index > last) pieces.append(text.slice(last, m.index));
			const span = document.createElement("span");
			span.className = instantViewStyles_default.LatexInline;
			const source = decodeInlineMath(m[1]);
			span.dataset.inlineMath = "";
			span.dataset.source = source;
			if (typeset) work.push(renderLatexInto(span, source, false, middleware));
			else span.textContent = source;
			pieces.append(span);
			last = m.index + m[0].length;
		}
		if (last < text.length) pieces.append(text.slice(last));
		textNode.replaceWith(pieces);
	}
	return work.length ? Promise.allSettled(work) : void 0;
}
//#endregion
//#region src/components/groupedLayout.ts
var RectPart = {
	None: 0,
	Top: 1,
	Right: 2,
	Bottom: 4,
	Left: 8
};
var Layouter = class Layouter {
	constructor(sizes, maxWidth, minWidth, spacing, maxHeight) {
		this.sizes = sizes;
		this.maxWidth = maxWidth;
		this.minWidth = minWidth;
		this.spacing = spacing;
		this.maxHeight = maxHeight ?? maxWidth;
		this.maxHeightConstraint = maxHeight;
		this.count = sizes.length;
		this.ratios = Layouter.countRatios(sizes);
		this.proportions = Layouter.countProportions(this.ratios);
		this.averageRatio = accumulate(this.ratios, 1) / this.count;
		this.maxSizeRatio = maxWidth / this.maxHeight;
	}
	layout() {
		if (!this.count) return [];
		else if (this.count === 1) return this.layoutOne();
		if (this.count >= 5 || this.ratios.find((r) => r > 2)) return new ComplexLayouter(this.ratios, this.averageRatio, this.maxWidth, this.minWidth, this.spacing, this.maxHeightConstraint).layout();
		if (this.count === 2) return this.layoutTwo();
		else if (this.count === 3) return this.layoutThree();
		return this.layoutFour();
	}
	layoutTwo() {
		if (this.proportions === "ww" && this.averageRatio > 1.4 * this.maxSizeRatio && this.ratios[1] - this.ratios[0] < .2) return this.layoutTwoTopBottom();
		else if (this.proportions === "ww" || this.proportions === "qq") return this.layoutTwoLeftRightEqual();
		return this.layoutTwoLeftRight();
	}
	layoutThree() {
		if (this.proportions[0] === "n") return this.layoutThreeLeftAndOther();
		return this.layoutThreeTopAndOther();
	}
	layoutFour() {
		if (this.proportions[0] === "w") return this.layoutFourTopAndOther();
		return this.layoutFourLeftAndOther();
	}
	layoutOne() {
		const width = this.maxWidth;
		const naturalHeight = this.sizes[0].h * width / this.sizes[0].w;
		return [{
			geometry: {
				x: 0,
				y: 0,
				width,
				height: this.maxHeightConstraint === void 0 ? naturalHeight : Math.min(naturalHeight, this.maxHeight)
			},
			sides: RectPart.Left | RectPart.Top | RectPart.Right | RectPart.Bottom
		}];
	}
	layoutTwoTopBottom() {
		const width = this.maxWidth;
		const height = Math.round(Math.min(width / this.ratios[0], Math.min(width / this.ratios[1], (this.maxHeight - this.spacing) / 2)));
		return [{
			geometry: {
				x: 0,
				y: 0,
				width,
				height
			},
			sides: RectPart.Left | RectPart.Top | RectPart.Right
		}, {
			geometry: {
				x: 0,
				y: height + this.spacing,
				width,
				height
			},
			sides: RectPart.Left | RectPart.Bottom | RectPart.Right
		}];
	}
	layoutTwoLeftRightEqual() {
		const width = (this.maxWidth - this.spacing) / 2;
		const height = Math.round(Math.min(width / this.ratios[0], Math.min(width / this.ratios[1], this.maxHeight * 1)));
		return [{
			geometry: {
				x: 0,
				y: 0,
				width,
				height
			},
			sides: RectPart.Top | RectPart.Left | RectPart.Bottom
		}, {
			geometry: {
				x: width + this.spacing,
				y: 0,
				width,
				height
			},
			sides: RectPart.Top | RectPart.Right | RectPart.Bottom
		}];
	}
	layoutTwoLeftRight() {
		const minimalWidth = Math.round(this.minWidth * 1.5);
		const secondWidth = Math.min(Math.round(Math.max(.4 * (this.maxWidth - this.spacing), (this.maxWidth - this.spacing) / this.ratios[0] / (1 / this.ratios[0] + 1 / this.ratios[1]))), this.maxWidth - this.spacing - minimalWidth);
		const firstWidth = this.maxWidth - secondWidth - this.spacing;
		const height = Math.min(this.maxHeight, Math.round(Math.min(firstWidth / this.ratios[0], secondWidth / this.ratios[1])));
		return [{
			geometry: {
				x: 0,
				y: 0,
				width: firstWidth,
				height
			},
			sides: RectPart.Top | RectPart.Left | RectPart.Bottom
		}, {
			geometry: {
				x: firstWidth + this.spacing,
				y: 0,
				width: secondWidth,
				height
			},
			sides: RectPart.Top | RectPart.Right | RectPart.Bottom
		}];
	}
	layoutThreeLeftAndOther() {
		const firstHeight = this.maxHeight;
		const thirdHeight = Math.round(Math.min((this.maxHeight - this.spacing) / 2, this.ratios[1] * (this.maxWidth - this.spacing) / (this.ratios[2] + this.ratios[1])));
		const secondHeight = firstHeight - thirdHeight - this.spacing;
		const rightWidth = Math.max(this.minWidth, Math.round(Math.min((this.maxWidth - this.spacing) / 2, Math.min(thirdHeight * this.ratios[2], secondHeight * this.ratios[1]))));
		const leftWidth = Math.min(Math.round(firstHeight * this.ratios[0]), this.maxWidth - this.spacing - rightWidth);
		return [
			{
				geometry: {
					x: 0,
					y: 0,
					width: leftWidth,
					height: firstHeight
				},
				sides: RectPart.Top | RectPart.Left | RectPart.Bottom
			},
			{
				geometry: {
					x: leftWidth + this.spacing,
					y: 0,
					width: rightWidth,
					height: secondHeight
				},
				sides: RectPart.Top | RectPart.Right
			},
			{
				geometry: {
					x: leftWidth + this.spacing,
					y: secondHeight + this.spacing,
					width: rightWidth,
					height: thirdHeight
				},
				sides: RectPart.Bottom | RectPart.Right
			}
		];
	}
	layoutThreeTopAndOther() {
		const firstWidth = this.maxWidth;
		const firstHeight = Math.round(Math.min(firstWidth / this.ratios[0], (this.maxHeight - this.spacing) * .66));
		const secondWidth = (this.maxWidth - this.spacing) / 2;
		const secondHeight = Math.min(this.maxHeight - firstHeight - this.spacing, Math.round(Math.min(secondWidth / this.ratios[1], secondWidth / this.ratios[2])));
		const thirdWidth = firstWidth - secondWidth - this.spacing;
		return [
			{
				geometry: {
					x: 0,
					y: 0,
					width: firstWidth,
					height: firstHeight
				},
				sides: RectPart.Left | RectPart.Top | RectPart.Right
			},
			{
				geometry: {
					x: 0,
					y: firstHeight + this.spacing,
					width: secondWidth,
					height: secondHeight
				},
				sides: RectPart.Bottom | RectPart.Left
			},
			{
				geometry: {
					x: secondWidth + this.spacing,
					y: firstHeight + this.spacing,
					width: thirdWidth,
					height: secondHeight
				},
				sides: RectPart.Bottom | RectPart.Right
			}
		];
	}
	layoutFourTopAndOther() {
		const w = this.maxWidth;
		const h0 = Math.round(Math.min(w / this.ratios[0], (this.maxHeight - this.spacing) * .66));
		const h = Math.round((this.maxWidth - 2 * this.spacing) / (this.ratios[1] + this.ratios[2] + this.ratios[3]));
		const w0 = Math.max(this.minWidth, Math.round(Math.min((this.maxWidth - 2 * this.spacing) * .4, h * this.ratios[1])));
		const w2 = Math.round(Math.max(Math.max(this.minWidth * 1, (this.maxWidth - 2 * this.spacing) * .33), h * this.ratios[3]));
		const w1 = w - w0 - w2 - 2 * this.spacing;
		const h1 = Math.min(this.maxHeight - h0 - this.spacing, h);
		return [
			{
				geometry: {
					x: 0,
					y: 0,
					width: w,
					height: h0
				},
				sides: RectPart.Left | RectPart.Top | RectPart.Right
			},
			{
				geometry: {
					x: 0,
					y: h0 + this.spacing,
					width: w0,
					height: h1
				},
				sides: RectPart.Bottom | RectPart.Left
			},
			{
				geometry: {
					x: w0 + this.spacing,
					y: h0 + this.spacing,
					width: w1,
					height: h1
				},
				sides: RectPart.Bottom
			},
			{
				geometry: {
					x: w0 + this.spacing + w1 + this.spacing,
					y: h0 + this.spacing,
					width: w2,
					height: h1
				},
				sides: RectPart.Right | RectPart.Bottom
			}
		];
	}
	layoutFourLeftAndOther() {
		const h = this.maxHeight;
		const w0 = Math.round(Math.min(h * this.ratios[0], (this.maxWidth - this.spacing) * .6));
		const w = Math.round((this.maxHeight - 2 * this.spacing) / (1 / this.ratios[1] + 1 / this.ratios[2] + 1 / this.ratios[3]));
		const h0 = Math.round(w / this.ratios[1]);
		const h1 = Math.round(w / this.ratios[2]);
		const h2 = h - h0 - h1 - 2 * this.spacing;
		const w1 = Math.max(this.minWidth, Math.min(this.maxWidth - w0 - this.spacing, w));
		return [
			{
				geometry: {
					x: 0,
					y: 0,
					width: w0,
					height: h
				},
				sides: RectPart.Top | RectPart.Left | RectPart.Bottom
			},
			{
				geometry: {
					x: w0 + this.spacing,
					y: 0,
					width: w1,
					height: h0
				},
				sides: RectPart.Top | RectPart.Right
			},
			{
				geometry: {
					x: w0 + this.spacing,
					y: h0 + this.spacing,
					width: w1,
					height: h1
				},
				sides: RectPart.Right
			},
			{
				geometry: {
					x: w0 + this.spacing,
					y: h0 + h1 + 2 * this.spacing,
					width: w1,
					height: h2
				},
				sides: RectPart.Bottom | RectPart.Right
			}
		];
	}
	static countRatios(sizes) {
		return sizes.map((size) => size.w / size.h);
	}
	static countProportions(ratios) {
		return ratios.map((ratio) => ratio > 1.2 ? "w" : ratio < .8 ? "n" : "q").join("");
	}
};
var ComplexLayouter = class ComplexLayouter {
	constructor(ratios, averageRatio, maxWidth, minWidth, spacing, maxHeight) {
		this.averageRatio = averageRatio;
		this.maxWidth = maxWidth;
		this.minWidth = minWidth;
		this.spacing = spacing;
		this.ratios = ComplexLayouter.cropRatios(ratios, averageRatio);
		this.count = ratios.length;
		this.maxHeight = maxHeight ?? maxWidth * 4 / 3;
		this.constrainHeight = maxHeight !== void 0;
	}
	static cropRatios(ratios, averageRatio) {
		const kMaxRatio = 2.75;
		const kMinRatio = .6667;
		return ratios.map((ratio) => {
			return averageRatio > 1.1 ? clamp(ratio, 1, kMaxRatio) : clamp(ratio, kMinRatio, 1);
		});
	}
	layout() {
		const result = new Array(this.count);
		const attempts = [];
		const multiHeight = (offset, count) => {
			const ratios = this.ratios.slice(offset, offset + count);
			const sum = accumulate(ratios, 0);
			return (this.maxWidth - (count - 1) * this.spacing) / sum;
		};
		const pushAttempt = (lineCounts) => {
			const heights = [];
			let offset = 0;
			for (const count of lineCounts) {
				heights.push(multiHeight(offset, count));
				offset += count;
			}
			attempts.push({
				lineCounts,
				heights
			});
		};
		for (let first = 1; first !== this.count; ++first) {
			const second = this.count - first;
			if (first > 3 || second > 3) continue;
			pushAttempt([first, second]);
		}
		for (let first = 1; first !== this.count - 1; ++first) for (let second = 1; second !== this.count - first; ++second) {
			const third = this.count - first - second;
			if (first > 3 || second > (this.averageRatio < .85 ? 4 : 3) || third > 3) continue;
			pushAttempt([
				first,
				second,
				third
			]);
		}
		for (let first = 1; first !== this.count - 1; ++first) for (let second = 1; second !== this.count - first; ++second) for (let third = 1; third !== this.count - first - second; ++third) {
			const fourth = this.count - first - second - third;
			if (first > 3 || second > 3 || third > 3 || fourth > 3) continue;
			pushAttempt([
				first,
				second,
				third,
				fourth
			]);
		}
		let optimalAttempt = null;
		let optimalDiff = 0;
		for (const attempt of attempts) {
			const { heights, lineCounts: counts } = attempt;
			const lineCount = counts.length;
			const totalHeight = accumulate(heights, 0) + this.spacing * (lineCount - 1);
			const bad1 = Math.min(...heights) < this.minWidth ? 1.5 : 1;
			const bad2 = (() => {
				for (let line = 1; line !== lineCount; ++line) if (counts[line - 1] > counts[line]) return 1.5;
				return 1;
			})();
			const diff = Math.abs(totalHeight - this.maxHeight) * bad1 * bad2;
			if (!optimalAttempt || diff < optimalDiff) {
				optimalAttempt = attempt;
				optimalDiff = diff;
			}
		}
		const optimalCounts = optimalAttempt.lineCounts;
		const optimalHeights = optimalAttempt.heights;
		const rowCount = optimalCounts.length;
		const naturalHeight = accumulate(optimalHeights, 0) + this.spacing * (rowCount - 1);
		const heightScale = this.constrainHeight && naturalHeight > this.maxHeight ? Math.max(0, this.maxHeight - this.spacing * (rowCount - 1)) / accumulate(optimalHeights, 0) : 1;
		let accumulatedScaledHeight = 0;
		const scaledHeights = optimalHeights.map((height, row) => {
			let scaledHeight;
			if (heightScale === 1) scaledHeight = Math.round(height);
			else if (row !== rowCount - 1) scaledHeight = Math.floor(height * heightScale);
			else scaledHeight = Math.max(0, this.maxHeight - this.spacing * (rowCount - 1) - accumulatedScaledHeight);
			accumulatedScaledHeight += scaledHeight;
			return scaledHeight;
		});
		let index = 0;
		let y = 0;
		for (let row = 0; row !== rowCount; ++row) {
			const colCount = optimalCounts[row];
			const lineHeight = optimalHeights[row];
			const height = scaledHeights[row];
			let x = 0;
			for (let col = 0; col !== colCount; ++col) {
				const sides = RectPart.None | (row === 0 ? RectPart.Top : RectPart.None) | (row === rowCount - 1 ? RectPart.Bottom : RectPart.None) | (col === 0 ? RectPart.Left : RectPart.None) | (col === colCount - 1 ? RectPart.Right : RectPart.None);
				const ratio = this.ratios[index];
				const width = col === colCount - 1 ? this.maxWidth - x : Math.round(ratio * lineHeight);
				result[index] = {
					geometry: {
						x,
						y,
						width,
						height
					},
					sides
				};
				x += width + this.spacing;
				++index;
			}
			y += height + this.spacing;
		}
		return result;
	}
};
//#endregion
//#region src/components/prepareAlbum.ts
function layoutAlbum({ items, maxWidth, minWidth, spacing, maxHeight }) {
	const layout = new Layouter(items, maxWidth, minWidth, spacing, maxHeight).layout();
	const widthItem = layout.find((item) => item.sides & RectPart.Right);
	const width = widthItem.geometry.width + widthItem.geometry.x;
	const heightItem = layout.find((item) => item.sides & RectPart.Bottom);
	return {
		layout,
		width,
		height: heightItem.geometry.height + heightItem.geometry.y,
		stacked: false
	};
}
/**
* An album's layout has no shape for more items than an album holds: more of them (a rich message's collage) are
* laid out an album at a time, one under another (tdesktop's SplitGroupedMediaBlock), and rounded as one.
*/
function layoutAlbumItems(options) {
	if (options.items.length <= 10) return layoutAlbum(options);
	const parts = chunk(options.items, 10).map((items) => layoutAlbum({
		...options,
		items
	}));
	const layout = [];
	let top = 0;
	parts.forEach((part, index) => {
		for (const { geometry, sides } of part.layout) layout.push({
			geometry: {
				...geometry,
				y: geometry.y + top
			},
			sides: sides & ~(index ? RectPart.Top : 0) & ~(index < parts.length - 1 ? RectPart.Bottom : 0)
		});
		top += part.height + options.spacing;
	});
	return {
		layout,
		width: Math.max(...parts.map((part) => part.width)),
		height: top - options.spacing,
		stacked: true
	};
}
function prepareAlbum(options) {
	const { layout, width, height, stacked } = layoutAlbumItems(options);
	const container = options.container;
	container.style.width = width + "px";
	container.style.height = height + "px";
	const children = container.children;
	return {
		items: layout.map(({ geometry, sides }, idx) => {
			let div;
			div = children[idx];
			if (!div) {
				div = document.createElement("div");
				container.append(div);
			}
			div.classList.add("album-item");
			if (!options.noGroupedItem) div.classList.add("grouped-item");
			div.style.width = geometry.width / width * 100 + "%";
			div.style.height = geometry.height / height * 100 + "%";
			div.style.top = geometry.y / height * 100 + "%";
			div.style.insetInlineStart = geometry.x / width * 100 + "%";
			div.style.borderStartStartRadius = div.style.borderEndStartRadius = div.style.borderStartEndRadius = div.style.borderEndEndRadius = "";
			if (sides & RectPart.Left && sides & RectPart.Top) div.style.borderStartStartRadius = `calc(var(--border-start-start-radius) - ${options.spacing}px)`;
			if (sides & RectPart.Left && sides & RectPart.Bottom) div.style.borderEndStartRadius = `calc(var(--border-end-start-radius) - ${options.spacing}px)`;
			if (sides & RectPart.Right && sides & RectPart.Top) div.style.borderStartEndRadius = `calc(var(--border-start-end-radius) - ${options.spacing}px)`;
			if (sides & RectPart.Right && sides & RectPart.Bottom) div.style.borderEndEndRadius = `calc(var(--border-end-end-radius) - ${options.spacing}px)`;
			if (options.forMedia) {
				const mediaDiv = document.createElement("div");
				mediaDiv.classList.add("album-item-media");
				div.append(mediaDiv);
			}
			return div;
		}),
		width,
		height,
		stacked
	};
}
//#endregion
//#region src/components/geoPin.tsx
var _tmpl$ = /*#__PURE__*/ template(`<svg class=geo-pin xmlns=http://www.w3.org/2000/svg width=21.333 height=37.218 viewBox="0 0 20 34.892"><g transform="translate(-965.773 -331.784) scale(1.18559)"><path d="M817.112 282.971c-1.258 1.343-2.046 3.299-2.015 5.139.064 3.845 1.797 5.3 4.568 10.592.999 2.328 2.04 4.792 3.031 8.873.138.602.272 1.16.335 1.21.062.048.196-.513.334-1.115.99-4.081 2.033-6.543 3.031-8.871 2.771-5.292 4.504-6.748 4.568-10.592.031-1.84-.759-3.798-2.017-5.14-1.437-1.535-3.605-2.67-5.916-2.717-2.312-.048-4.481 1.087-5.919 2.621z"style=fill:#ea4336;stroke:#ea4336;stroke-width:1></path><circle r=3.035 cy=288.253 cx=823.031 style=fill:#970a0a;stroke-width:0>`);
/**
* The pin as a plain element, for DOM built by hand. Called directly, a component is not one in
* development: once Solid has rendered it, the hot-reload proxy hands back an accessor instead of
* the element, and a hand-built parent would append that function as text.
*/
function createGeoPin() {
	return _tmpl$();
}
function GeoPin() {
	return createGeoPin();
}
//#endregion
export { hydrateInlineMath as a, orderedListCounterStyle as c, genericTable_module_default as d, chunk as f, Latex as i, orderedListItemStyle as l, copyFromElement as m, createGeoPin as n, renderLatexInto as o, StaticCheckbox as p, prepareAlbum as r, createMessageTextRevealLeafBinding as s, GeoPin as t, orderedListTypeStyle as u };
