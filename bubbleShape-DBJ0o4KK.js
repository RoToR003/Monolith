//# allFunctionsCalledOnLoad
import { c as getOutgoingMessageGradientColorAt, m as readOutgoingMessageGradient } from "./themeController-2cytOOn0.js";
import { n as getAppWindow } from "./appWindow-bo-KtJhy.js";
var bubbleShape_module_default = {
	part: "_part_xpc67_1",
	piece: "_piece_xpc67_2",
	tail: "_tail_xpc67_3",
	clip: "_clip_xpc67_4"
};
//#endregion
//#region src/components/chat/bubbleShape.ts
var CURVE_X = [
	.23,
	1,
	.32,
	1
];
var CURVE_Y = [
	.1992,
	.0106,
	.2792,
	.9103
];
var EASING_X = `cubic-bezier(${CURVE_X.join(", ")})`;
var EASING_Y = `cubic-bezier(${CURVE_Y.join(", ")})`;
var toBox = (rect) => ({
	left: rect.left,
	top: rect.top,
	right: rect.right,
	bottom: rect.bottom
});
var boxWidth = (box) => box.right - box.left;
var boxHeight = (box) => box.bottom - box.top;
var centerX = (box) => (box.left + box.right) / 2;
var centerY = (box) => (box.top + box.bottom) / 2;
var makeBox = (left, top, right, bottom) => ({
	left,
	top,
	right: Math.max(left, right),
	bottom: Math.max(top, bottom)
});
var moveBox = (box, by) => ({
	left: box.left + by.left,
	top: box.top + by.top,
	right: box.right + by.right,
	bottom: box.bottom + by.bottom
});
var fromOrigin = (box, { x, y }) => makeBox(box.left - x, box.top - y, box.right - x, box.bottom - y);
var snap = (value) => {
	const { devicePixelRatio } = getAppWindow();
	return Math.round(value * devicePixelRatio) / devicePixelRatio;
};
var snapBox = (box) => ({
	left: snap(box.left),
	top: snap(box.top),
	right: snap(box.right),
	bottom: snap(box.bottom)
});
function isVisible(element) {
	return !!element?.isConnected && element.getClientRects().length > 0;
}
function createPart(className = bubbleShape_module_default.part) {
	const element = document.createElement("div");
	element.classList.add(className);
	return element;
}
function createAxes(part) {
	const wrapper = createPart(bubbleShape_module_default.part);
	wrapper.append(part);
	return {
		across: wrapper,
		part
	};
}
function layOut(element, box) {
	element.style.left = `${box.left}px`;
	element.style.top = `${box.top}px`;
	element.style.width = `${boxWidth(box)}px`;
	element.style.height = `${boxHeight(box)}px`;
}
/**
* The ways of parts on one pair of curves: across on its curve, in a part's wrapper, and up on its own, in the part
* itself. Parts in parts, each on these curves, add up their ways exactly.
*/
function createTracks({ x, y, duration }) {
	const across = (element, from, to) => {
		return {
			element,
			keyframes: [{ transform: from }, { transform: to }],
			easing: x
		};
	};
	const up = (element, from, to) => {
		return {
			element,
			keyframes: [{ transform: from }, { transform: to }],
			easing: y
		};
	};
	return {
		across,
		up,
		shift: (element, from, to) => [{
			element,
			keyframes: [{ translate: `${from.x}px 0px` }, { translate: `${to.x}px 0px` }],
			easing: x
		}, up(element, `translateY(${from.y}px)`, `translateY(${to.y}px)`)],
		move: ({ across: wrapper, part }, from, to) => [across(wrapper, `translateX(${from.x}px)`, `translateX(${to.x}px)`), up(part, `translateY(${from.y}px)`, `translateY(${to.y}px)`)],
		stretch: ({ across: wrapper, part }, base, from, to) => {
			const alongX = (box) => `translateX(${box.left - base.left}px) scaleX(${boxWidth(box) / boxWidth(base)})`;
			const alongY = (box) => `translateY(${box.top - base.top}px) scaleY(${boxHeight(box) / boxHeight(base)})`;
			return [across(wrapper, alongX(from), alongX(to)), up(part, alongY(from), alongY(to))];
		},
		scale: (element, from, to) => ({
			element,
			keyframes: [{ scale: `${from}` }, { scale: `${to}` }],
			easing: x
		}),
		fade: (element, ...stops) => ({
			element,
			keyframes: stops.map(([opacity, at]) => ({
				opacity,
				offset: at / duration
			})),
			easing: "linear"
		})
	};
}
/**
* Hands the ways to the compositor. They start with the next frame: that frame shows where they start, whenever
* the page gets to draw it, and they are timed from then — a way waiting for the compositor to start it would
* wait again each time it is planned anew.
*/
function animateTracks(tracks, duration) {
	const animations = tracks.map(({ element, keyframes, easing, composite, pseudoElement }) => {
		return element.animate(keyframes, {
			duration,
			easing,
			fill: "forwards",
			composite,
			pseudoElement
		});
	});
	startOnNextFrame(animations);
	return animations;
}
function startOnNextFrame(animations) {
	getAppWindow().requestAnimationFrame(() => {
		for (const animation of animations) {
			const time = animation.timeline?.currentTime;
			if (animation.startTime === null && time !== null) animation.startTime = time;
		}
	});
}
/** an element's corners as they are drawn: CSS makes them all smaller together when two are more than a side */
function getRadii(style, rect) {
	const toLength = (value, size) => value.endsWith("%") ? parseFloat(value) * size / 100 : parseFloat(value) || 0;
	const radii = {
		topLeft: toLength(style.borderTopLeftRadius, rect.width),
		topRight: toLength(style.borderTopRightRadius, rect.width),
		bottomRight: toLength(style.borderBottomRightRadius, rect.width),
		bottomLeft: toLength(style.borderBottomLeftRadius, rect.width)
	};
	const { topLeft, topRight, bottomRight, bottomLeft } = radii;
	const factor = Math.min(1, rect.width / (topLeft + topRight), rect.width / (bottomLeft + bottomRight), rect.height / (topLeft + bottomLeft), rect.height / (topRight + bottomRight));
	for (const key in radii) radii[key] *= factor;
	return radii;
}
function toDropShadow(boxShadow) {
	return boxShadow.split(/,(?![^(]*\))/).map((shadow) => {
		const color = shadow.match(/[a-z-]+\([^)]*\)|#[\da-f]+/i)?.[0];
		const lengths = color && shadow.replace(color, "").match(/-?[\d.]+px/g);
		return lengths?.length >= 2 && !shadow.includes("inset") ? `drop-shadow(${lengths[0]} ${lengths[1]} ${(parseFloat(lengths[2]) || 0) / 2}px ${color})` : "";
	}).join(" ");
}
/**
* How a bubble's content box draws its background: a bubble of a gradient is seen (nearly) all of its colour where it
* stands, not of its own under it, which it does not paint itself (`message-out-gradient`)
*/
function getBubbleBackground(content, style, rect) {
	const gradient = readOutgoingMessageGradient(content);
	return {
		color: gradient ? getOutgoingMessageGradientColorAt(gradient, rect) : style.backgroundColor,
		shadow: toDropShadow(style.boxShadow),
		radii: getRadii(style, rect)
	};
}
var CORNERS = [
	{
		radius: "topLeft",
		corner: "TopLeft"
	},
	{
		radius: "topRight",
		corner: "TopRight"
	},
	{
		radius: "bottomRight",
		corner: "BottomRight"
	},
	{
		radius: "bottomLeft",
		corner: "BottomLeft"
	}
];
var PIECE_SIZE = 100;
var PIECE_BOX = {
	left: 0,
	top: 0,
	right: PIECE_SIZE,
	bottom: PIECE_SIZE
};
/**
* A rounded box in pieces that only move and stretch, so that it changes its size and its corners do not:
* the four bands between the corners, from one side to past the middle (each a pixel into the corners it
* meets, where they are round, so that no seam shows), and where each corner's quarter of a circle stands.
* What is across of each depends only on the box's sides across, and what is up only on its top and bottom.
*/
function getShape(box, radii) {
	const { left, top, right, bottom } = box;
	const { topLeft, topRight, bottomRight, bottomLeft } = radii;
	const into = (radius) => Math.min(1, radius);
	return {
		bands: [
			makeBox(left + topLeft - into(topLeft), top, right - topRight + into(topRight), bottom - Math.max(bottomLeft, bottomRight)),
			makeBox(left + bottomLeft - into(bottomLeft), top + Math.max(topLeft, topRight), right - bottomRight + into(bottomRight), bottom),
			makeBox(left, top + topLeft - into(topLeft), right - Math.max(topRight, bottomRight), bottom - bottomLeft + into(bottomLeft)),
			makeBox(left + Math.max(topLeft, bottomLeft), top + topRight - into(topRight), right, bottom - bottomRight + into(bottomRight))
		],
		corners: [
			{
				x: left,
				y: top
			},
			{
				x: right - topRight,
				y: top
			},
			{
				x: right - bottomRight,
				y: bottom - bottomRight
			},
			{
				x: left,
				y: bottom - bottomLeft
			}
		]
	};
}
/**
* The pieces of a bubble's background, in its colour and with its shadow, and its tail over them, as the
* bubble's is: drawn in it, after its background
*/
function createShapeParts(background, tail) {
	const root = createPart(bubbleShape_module_default.part);
	root.style.color = background.color;
	const shape = createPart(bubbleShape_module_default.part);
	shape.style.filter = background.shadow;
	const bands = Array.from({ length: 4 }, () => {
		const band = createPart(bubbleShape_module_default.piece);
		band.style.width = band.style.height = `${PIECE_SIZE}px`;
		return createAxes(band);
	});
	const corners = CORNERS.map(() => createAxes(createPart(bubbleShape_module_default.piece)));
	setShapeRadii(corners, background.radii);
	shape.append(...[...bands, ...corners].map(({ across }) => across));
	const tailAxes = tail && createAxes(tail);
	root.append(...[shape, tailAxes?.across].filter(Boolean));
	return {
		background: root,
		bands,
		corners,
		tail: tailAxes
	};
}
/**
* The pieces of a bubble's background drawn of the outgoing bubbles' gradient (`message-out-gradient`) rather than of
* its colour, each of the part of it it stands over where it ends up (`to`, from `origin` on the page as the gradient's
* frame is): it is stretched with the piece on the way, so the bubble is of the gradient all the way and lands on the
* colours it is drawn in there
*/
function paintShapeGradient(parts, { picture, frame }, to, origin) {
	const image = `url("${picture.url}")`;
	const paint = (element, at, scale = {
		x: 1,
		y: 1
	}) => {
		if (!scale.x || !scale.y) return;
		const { style } = element;
		style.backgroundImage = image;
		style.backgroundRepeat = "no-repeat";
		style.imageRendering = picture.rendering;
		style.backgroundSize = `${boxWidth(frame) / scale.x}px ${boxHeight(frame) / scale.y}px`;
		style.backgroundPosition = `${(frame.left - origin.x - at.x) / scale.x}px ${(frame.top - origin.y - at.y) / scale.y}px`;
	};
	parts.bands.forEach(({ part }, index) => {
		const box = to.shape.bands[index];
		paint(part, {
			x: box.left,
			y: box.top
		}, {
			x: boxWidth(box) / PIECE_SIZE,
			y: boxHeight(box) / PIECE_SIZE
		});
	});
	parts.corners.forEach(({ part }, index) => paint(part, to.shape.corners[index]));
	if (parts.tail && to.tail) paint(parts.tail.part.firstElementChild, to.tail);
}
function setShapeRadii(corners, radii) {
	corners.forEach(({ part }, index) => {
		const { radius, corner } = CORNERS[index];
		part.style.width = part.style.height = `${radii[radius]}px`;
		part.style[`border${corner}Radius`] = "100%";
	});
}
/**
* Where the pieces of a background stand when it is this box on the page, from the corner of what holds them
* (`origin`, on the page too). The tail on whole pixels, as the bubble's is drawn
*/
function getShapePlaces(page, origin, radii, tailOffset) {
	const box = fromOrigin(page, origin);
	return {
		box,
		shape: getShape(box, radii),
		tail: tailOffset && {
			x: snap((tailOffset.end ? page.right : page.left) + tailOffset.x) - origin.x,
			y: snap(page.bottom + tailOffset.y) - origin.y
		}
	};
}
/** the ways of a background's pieces from where they stand to where they go */
function getShapeTracks(tracks, parts, from, to) {
	return [
		...parts.bands.flatMap((band, index) => tracks.stretch(band, PIECE_BOX, from.shape.bands[index], to.shape.bands[index])),
		...parts.corners.flatMap((corner, index) => tracks.move(corner, from.shape.corners[index], to.shape.corners[index])),
		...parts.tail && from.tail && to.tail ? tracks.move(parts.tail, from.tail, to.tail) : []
	];
}
function getTail(content) {
	const tail = content.querySelector(".bubble-tail");
	return isVisible(tail) ? tail : void 0;
}
function getOffset(tailRect, contentRect) {
	const end = tailRect.left + tailRect.width / 2 > contentRect.left + contentRect.width / 2;
	return {
		end,
		x: tailRect.left - (end ? contentRect.right : contentRect.left),
		y: tailRect.top - contentRect.bottom
	};
}
/** where a bubble's tail stands, if it has one shown */
function getTailOffset(content, contentRect) {
	const tail = getTail(content);
	return tail && getOffset(tail.getBoundingClientRect(), contentRect);
}
function copyTail(content, contentRect) {
	const tail = getTail(content);
	if (!tail) return;
	const tailRect = tail.getBoundingClientRect();
	const tailStyle = getComputedStyle(tail);
	const offset = getOffset(tailRect, contentRect);
	const matrix = tailStyle.transform !== "none" && new DOMMatrix(tailStyle.transform);
	if (matrix) matrix.e = matrix.f = 0;
	const tailCopy = document.createElement("span");
	tailCopy.style.cssText = `display: block; width: 100%; height: 100%; background-color: currentColor; clip-path: ${tailStyle.clipPath}; transform: ${matrix || "none"}`;
	const element = createPart(bubbleShape_module_default.tail);
	element.style.width = `${tailRect.width}px`;
	element.style.height = `${tailRect.height}px`;
	element.append(tailCopy);
	return {
		offset,
		element
	};
}
//#endregion
export { bubbleShape_module_default as A, makeBox as C, snapBox as D, setShapeRadii as E, startOnNextFrame as O, layOut as S, paintShapeGradient as T, getRadii as _, animateTracks as a, getTailOffset as b, centerX as c, createAxes as d, createPart as f, getBubbleBackground as g, fromOrigin as h, EASING_Y as i, toBox as k, centerY as l, createTracks as m, CURVE_Y as n, boxHeight as o, createShapeParts as p, EASING_X as r, boxWidth as s, CURVE_X as t, copyTail as u, getShapePlaces as v, moveBox as w, isVisible as x, getShapeTracks as y };
