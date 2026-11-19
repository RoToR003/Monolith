//# allFunctionsCalledOnLoad
import { M as onCleanup, N as onMount, R as useContext, g as createEffect, h as createContext, j as on, x as createRoot, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { n as getAppWindow, r as getOverlayRoot } from "./appWindow-bo-KtJhy.js";
import { t as bytesToHex } from "./bytesToHex-BQHuRHPP.js";
import { _ as use, f as setAttribute, g as template, o as className } from "./web-BPyQozky.js";
import { t as liteMode } from "./liteMode-DeLStZfQ.js";
import { t as isDocumentRTL } from "./isDocumentRTL-z8ksM2Dv.js";
import { it as toFriendlyTonAddress } from "./getChatMigratedTo-ChhMNXuu.js";
import { D as settle, E as linearEasing, O as spring, nt as smoothstep01, w as impact } from "./appDialogsManager-CXguiKc3.js";
import { t as base64ToBytes } from "./base64ToBytes-BKoIm5Yd.js";
import { t as clock } from "./clock-D01pG7GG.js";
import { i as watchWalletElement, n as isWalletElementOnScreen, r as requestWalletFrame, t as addWalletFrameClient } from "./frameLoop-BVgbdMV-.js";
import { t as getWalletChatCardTarget } from "./targets-CuHpMo-4.js";
import { i as canonicalTonAddress } from "./transferMessages-BVUO3_q3.js";
import { i as pixelRatio, r as offsetIn } from "./dom-CIEs7q6J.js";
import { c as ca, u as clamp01 } from "./geometry-BSiIZt3R.js";
import { n as GemView, t as Appearance } from "./stage-K7oS8PBR.js";
import { t as wallet_module_default } from "./wallet.module-3nQsE2jy.js";
//#region src/components/wallet/context.ts
var WalletContext = createContext();
function useWallet() {
	return useContext(WalletContext);
}
//#endregion
//#region src/components/wallet/visual/card/layout.ts
var DESIGN = {
	width: 336,
	height: 205,
	radius: 20,
	/** Card thickness: four times thinner than the iOS demo (9 points on a 361 card there). */
	thickness: 756 / 361,
	/**
	* Centre of the gem canvas: the «Diamond 20» glyph is centred at (36, 85.05),
	* and the gem's silhouette sits 0.71 points below the canvas centre.
	*/
	gemCenter: [36, 84.34],
	/** The gem canvas is wider than the gem, for growth and sparkles (96 on a 361 card). */
	gemCanvas: 32256 / 361,
	/** Gem width — the glyph's width in the design. */
	gemWidth: 20,
	/** The gem's touch circle. */
	gemHitRadius: 19,
	/** The QR chip: a 48×36 rectangle, corner radius 8. */
	chip: {
		x: 242,
		y: 74,
		width: 48,
		height: 36,
		radius: 8
	}
};
/**
* The gem's middle on the card. The card's text is the interface's and stands mirrored right to left; the gem heads
* the balance, so it goes with it to the inline start, and the QR chip to the inline end.
*/
function cardGemCenter(rtl) {
	return rtl ? [DESIGN.width - DESIGN.gemCenter[0], DESIGN.gemCenter[1]] : DESIGN.gemCenter;
}
/** The QR chip's left edge on the card, mirrored as the gem is */
function cardChipX(rtl) {
	return rtl ? DESIGN.width - DESIGN.chip.x - DESIGN.chip.width : DESIGN.chip.x;
}
//#endregion
//#region src/components/wallet/cardScroll.ts
/**
* The main screen's scroll, as iOS plays it (WalletScreen.updateScrolling and WalletCardComponent): the card
* folds back and shrinks around its middle while it lags behind the history; its name, address and QR chip
* fade and blur away; its balance — gem, amount and fiat — leaves it and flies into the header's middle,
* where a copy in the text colour takes over below the card's bottom edge; the title gives way to the card
* coming up under it, and an edge of the background fades in under the header. Let go half way, the card
* settles folded or unfolded. With reduced animations nothing travels: the card scrolls away with the history,
* and the header's title and balance cross-fade as it goes.
*
* Positions are read off the screen as they stand, left to right: right to left the same sums mirror the flight.
* Everything is written in one frame per scroll, transforms, opacities and clips only; what it measures is
* measured when something changes size.
*/
/** the card and the buttons under it (iOS cardSpacing) */
var CARD_SPACING = 12;
var COLLAPSED_PITCH = Math.PI / 3;
/** the fold's camera, in points of the 361-wide iOS card */
var CAMERA = 650;
/** the card lags behind the history by this share of the fold's travel, most half way */
var LAG = .6;
var DETAILS_BLUR = 8;
var TITLE_BLUR = 8;
/** the header's edge is fully there after this much scroll */
var EDGE_DISTANCE = 20;
/** a row revealed by the scroll stands this far below the header, and this far above the bottom (iOS) */
var REVEAL_TOP = 16;
var REVEAL_BOTTOM = 24;
/** the header's gram icon holds the gem with this much air around it (iOS) */
var ICON_INSET = .0545;
/** where scrollend is missing, a scroll that stood still this long has ended */
var HAS_SCROLLEND = typeof window !== "undefined" && "onscrollend" in window;
var SCROLL_STILL = 150;
var rect = (x, y, w, h) => ({
	x,
	y,
	w,
	h
});
var lerp = (a, b, t) => a + (b - a) * t;
var cx = (r) => r.x + r.w / 2;
var cy = (r) => r.y + r.h / 2;
var union = (a, b) => {
	const x = Math.min(a.x, b.x), y = Math.min(a.y, b.y);
	return rect(x, y, Math.max(a.x + a.w, b.x + b.w) - x, Math.max(a.y + a.h, b.y + b.h) - y);
};
var rectOf = (element, root) => {
	const { x, y } = offsetIn(element, root);
	return rect(x, y, element.offsetWidth, element.offsetHeight);
};
/** A point through a CATransform3D-style matrix about the origin: the perspective divide included */
function project(m, x, y) {
	const X = x * m[0] + y * m[4] + m[12];
	const Y = x * m[1] + y * m[5] + m[13];
	let W = x * m[3] + y * m[7] + m[15];
	if (Math.abs(W) < 1e-4) W = 1e-4;
	return [X / W, Y / W];
}
/** The bounds of a rect (relative to the origin) through a matrix */
function projectRect(m, r) {
	const points = [
		project(m, r.x, r.y),
		project(m, r.x + r.w, r.y),
		project(m, r.x, r.y + r.h),
		project(m, r.x + r.w, r.y + r.h)
	];
	const xs = points.map((p) => p[0]), ys = points.map((p) => p[1]);
	const x = Math.min(...xs), y = Math.min(...ys);
	return rect(x, y, Math.max(...xs) - x, Math.max(...ys) - y);
}
/** iOS flattens the card's own transform before the scroll's goes on it */
function flatten(m) {
	const out = m.slice();
	out[2] = out[6] = out[14] = 0;
	out[10] = 1;
	return out;
}
var mix = (m, k) => {
	const identity = ca.identity();
	return m.map((value, index) => identity[index] + (value - identity[index]) * k);
};
/** the choreography of a scroller: what plays in the history (a send) asks it to reveal a row */
var registry = /* @__PURE__ */ new WeakMap();
function getWalletCardScroll(scroller) {
	return scroller && registry.get(scroller);
}
var WalletCardScroll = class {
	constructor(options) {
		this.fraction = 0;
		this.s = 1;
		this.k = 1;
		this.titleBottom = 0;
		this.headerBottom = 0;
		this.measured = false;
		this.scrollTop = 0;
		this.flying = false;
		this.folded = false;
		this.programmatic = false;
		this.destroyed = false;
		this.onScrollEvent = () => {
			this.onScroll?.();
			if (!HAS_SCROLLEND) {
				this.cancelSettle?.();
				const win = getAppWindow(), timer = win.setTimeout(this.onScrollEnd, SCROLL_STILL);
				this.cancelSettle = () => win.clearTimeout(timer);
			}
			this.cancelFrame || (this.cancelFrame = requestWalletFrame(this.onFrame));
		};
		this.onFrame = () => {
			this.cancelFrame = void 0;
			this.scrollTop = this.scroller.scrollTop;
			this.update();
		};
		this.onScrollEnd = () => {
			if (this.destroyed) return;
			if (this.programmatic) {
				this.programmatic = false;
				return;
			}
			if (!liteMode.isAvailable("motion") || !this.measured) return;
			const offset = this.scroller.scrollTop;
			const start = this.start(), distance = this.distance();
			const maximum = this.scroller.scrollHeight - this.scroller.clientHeight;
			if (start + distance > maximum || offset <= start || offset >= start + distance) return;
			this.scrollTo(offset < start + distance * .5 ? start : start + distance, true);
		};
		this.scroller = options.scroller;
		this.room = options.room;
		this.card = options.card;
		this.flight = options.flight;
		this.header = options.header;
		registry.set(this.scroller, this);
		this.scroller.addEventListener("scroll", this.onScrollEvent, { passive: true });
		if (HAS_SCROLLEND) this.scroller.addEventListener("scrollend", this.onScrollEnd);
		this.resizeObserver = new ResizeObserver(() => {
			this.measure();
			this.update();
		});
		const h = this.header;
		[
			this.scroller,
			this.scroller.firstElementChild,
			this.card.root,
			this.card.balance,
			this.card.fiat,
			h.navPrimary,
			h.navFiat,
			h.title
		].forEach((element) => element && this.resizeObserver.observe(element));
	}
	get isFlying() {
		return this.flying;
	}
	scrollTo(top, smooth) {
		if (Math.abs(this.scroller.scrollTop - top) < 1) return;
		this.programmatic = true;
		this.scroller.scrollTo({
			top,
			behavior: smooth && liteMode.isAvailable("motion") ? "smooth" : "auto"
		});
	}
	/** the header's balance, tapped: back to the top */
	scrollToTop() {
		this.scrollTo(0, true);
	}
	/** a row the history just got (a transfer sent): scrolled into view under the header when it is not (iOS) */
	reveal(row) {
		if (!row?.isConnected) return;
		const { y } = offsetIn(row, this.scroller);
		const top = this.headerBottom + REVEAL_TOP;
		const offset = this.scroller.scrollTop, height = this.scroller.clientHeight;
		if (y >= offset + top && y + row.offsetHeight <= offset + height - REVEAL_BOTTOM) return;
		const maximum = this.scroller.scrollHeight - height;
		this.scrollTo(Math.max(0, Math.min(maximum, y - top)), false);
	}
	start() {
		return 0;
	}
	distance() {
		return this.cardRect.h + CARD_SPACING;
	}
	measure() {
		const { card, header } = this;
		if (this.destroyed || !card.root.isConnected || !card.root.offsetWidth) return;
		const root = card.root;
		this.cardRect = rect(root.offsetLeft, offsetIn(root, this.scroller).y, root.offsetWidth, root.offsetHeight);
		this.s = this.cardRect.w / DESIGN.width;
		this.k = this.cardRect.w / 361;
		const design = card.design;
		const slot = rectOf(card.gemSlot, design);
		const amount = rectOf(card.amount, design), fraction = rectOf(card.fraction, design);
		const amountBox = rectOf(card.amount.parentElement, design);
		this.textD = rect(amount.x, amountBox.y, fraction.x + fraction.w - amount.x, amountBox.h);
		this.lineD = amountBox;
		this.iconD = slot;
		this.primaryD = union(slot, this.textD);
		this.secondaryD = rectOf(card.fiat, design);
		const top = header.top;
		this.navP = rectOf(header.navPrimary, top);
		this.navS = rectOf(header.navFiat, top);
		const icon = rectOf(header.navIcon, top), text = rectOf(header.navText, top);
		this.navIconRect = rect(icon.x - this.navP.x, icon.y - this.navP.y, icon.w, icon.h);
		this.navTextRect = rect(text.x - this.navP.x, text.y - this.navP.y, text.w, text.h);
		const title = rectOf(header.title, top);
		this.titleBottom = title.y + title.h;
		this.headerBottom = header.title.parentElement.offsetHeight;
		this.layoutFlight();
		this.makeRoom();
		this.measured = true;
		this.scrollTop = this.scroller.scrollTop;
	}
	/** the copy laid out as the card's balance, in the card's design units */
	layoutFlight() {
		const { flight, primaryD, secondaryD, iconD, textD, lineD } = this;
		Object.assign(flight.primary.style, {
			width: `${primaryD.w}px`,
			height: `${primaryD.h}px`
		});
		Object.assign(flight.secondary.style, {
			width: `${secondaryD.w}px`,
			height: `${secondaryD.h}px`
		});
		Object.assign(flight.icon.style, {
			left: `${iconD.x - primaryD.x}px`,
			top: `${iconD.y - primaryD.y}px`,
			width: `${iconD.w}px`,
			height: `${iconD.h}px`
		});
		Object.assign(flight.text.style, {
			left: `${lineD.x - primaryD.x}px`,
			top: `${textD.y - primaryD.y}px`,
			transformOrigin: `${textD.x - lineD.x}px 0`
		});
		if (flight.gem && this.card.card) {
			const size = DESIGN.gemCanvas, [x, y] = this.card.card.gemCenter();
			Object.assign(flight.gem.style, {
				width: `${size}px`,
				height: `${size}px`,
				left: `${x - iconD.x - size / 2}px`,
				top: `${y - iconD.y - size / 2}px`
			});
		}
		this.syncText();
	}
	/** the copy reads what the card's balance reads, the running count included */
	syncText() {
		const { flight, card } = this;
		if (flight.amount.textContent !== card.amount.textContent) flight.amount.textContent = card.amount.textContent;
		if (flight.fraction.textContent !== card.fraction.textContent) flight.fraction.textContent = card.fraction.textContent;
		if (flight.secondary.textContent !== card.fiat.textContent) flight.secondary.textContent = card.fiat.textContent;
	}
	/**
	* A history long enough to scroll lets the card fold away completely (iOS minimum content height); a short
	* one keeps the window short
	*/
	makeRoom() {
		const scroller = this.scroller, room = this.room;
		const current = room.offsetHeight;
		const natural = scroller.scrollHeight - current;
		const height = scroller.clientHeight;
		const needed = natural > height ? Math.max(0, height + this.start() + this.distance() + 1 - natural) : 0;
		if (Math.abs(needed - current) > .5) room.style.height = `${needed}px`;
	}
	/** the card's own transform moved (tilt): the balance in flight follows it */
	onCardFrame() {
		if (this.flying) this.update();
	}
	update() {
		if (this.destroyed || !this.measured) return;
		const y = this.scrollTop;
		const { card, flight, header, cardRect: E } = this;
		const animations = liteMode.isAvailable("animations"), motion = liteMode.isAvailable("motion");
		const start = this.start(), distance = this.distance();
		const fraction = clamp01((y - start) / distance);
		this.fraction = fraction;
		header.edge.style.opacity = String(clamp01(y / EDGE_DISTANCE));
		if (!motion) {
			this.setFlying(false);
			card.root.style.zIndex = "0";
			card.fold.style.transform = card.fold.style.opacity = "";
			card.shading.style.opacity = "";
			card.details.forEach((element) => element.style.opacity = element.style.filter = "");
			card.card?.setScroll(0, 0);
			card.card?.setChip(1, 0);
			const goneAt = E.y + E.h - this.headerBottom;
			const gone = y >= goneAt;
			const shown = animations ? smoothstep01((y - goneAt) / (E.h / 2) + 1) : +gone;
			header.title.style.opacity = shown ? String(1 - shown) : "";
			header.title.style.filter = "";
			header.navPrimary.style.transform = header.navFiat.style.transform = "";
			header.navClip.style.clipPath = shown ? "" : "inset(100%)";
			header.navClip.style.opacity = shown && shown < 1 ? String(shown) : "";
			this.setFolded(gone);
			return;
		}
		card.root.style.zIndex = "";
		header.navClip.style.opacity = "";
		const lag = LAG * distance * fraction * (1 - fraction);
		const offset = y - lag;
		const pitch = motion ? COLLAPSED_PITCH * fraction * (2 - fraction) : 0;
		const scale = 1 + -.81 * fraction;
		let scroll = ca.identity();
		if (motion) scroll[11] = -fraction / (CAMERA * this.k);
		scroll = ca.rotate(scroll, pitch, 1, 0, 0);
		scroll = ca.scale(scroll, scale, scale);
		card.fold.style.transform = fraction > 0 ? ca.css(ca.concat(scroll, ca.translation(0, lag))) : "";
		const centerX = E.x + E.w / 2, centerY = E.y + E.h / 2 - offset;
		const renderedTop = centerY + project(scroll, 0, -E.h / 2)[1];
		const edgeY = centerY + project(scroll, 0, E.h / 2)[1];
		const renderedMid = (renderedTop + edgeY) / 2;
		const fadeDistance = Math.min(24, Math.max(1, (edgeY - renderedTop) / 2));
		card.fold.style.opacity = String(1 - smoothstep01(-renderedMid / fadeDistance));
		const details = smoothstep01((fraction - .3) / .3);
		card.details.forEach((element) => {
			element.style.opacity = details ? String(1 - details) : "";
			element.style.filter = details ? `blur(${details * DETAILS_BLUR}px)` : "";
		});
		card.card?.setChip(1 - details, details * DETAILS_BLUR);
		const pitchFraction = pitch / COLLAPSED_PITCH;
		card.card?.setScroll(fraction, pitchFraction);
		card.shading.style.opacity = pitchFraction ? String(smoothstep01(pitchFraction)) : "";
		if (!card.card) {
			const wave = Math.sin(Math.PI * fraction);
			card.shadow.style.opacity = String(.12 * wave * wave);
		}
		let titleFade = 0;
		if (y > 0) {
			const fadeStart = this.titleBottom + 24, fadeStop = this.titleBottom;
			titleFade = smoothstep01((fadeStart - renderedTop) / Math.max(1, fadeStart - fadeStop));
		}
		header.title.style.opacity = titleFade ? String(1 - titleFade) : "";
		header.title.style.filter = titleFade ? `blur(${titleFade * TITLE_BLUR}px)` : "";
		this.updateBalance(y, offset, scroll, centerX, centerY, renderedMid, edgeY);
		this.setFolded(fraction >= 1);
	}
	updateBalance(y, offset, scroll, centerX, centerY, cardMid, edgeY) {
		const { card, flight, header, cardRect: E, s } = this;
		const start = this.start();
		const flying = y > start;
		this.setFlying(flying);
		header.navClip.style.clipPath = `polygon(0 ${edgeY}px, 100% ${edgeY}px, 100% 100%, 0 100%)`;
		if (!flying) {
			header.navPrimary.style.transform = header.navFiat.style.transform = "";
			return;
		}
		const own = card.card?.cardMatrix || ca.identity();
		const half = (r) => rect(r.x * s - E.w / 2, r.y * s - E.h / 2, r.w * s, r.h * s);
		const base = (r) => rect(0, 0, r.w * s, r.h * s);
		const ownP = projectRect(own, half(this.primaryD)), ownS = projectRect(own, half(this.secondaryD));
		const toScreen = (r) => rect(r.x + E.x + E.w / 2, r.y + E.y + E.h / 2, r.w, r.h);
		const sourceP = toScreen(ownP), sourceS = toScreen(ownS);
		const targetP = this.navP, targetS = this.navS;
		const navFrame = union(targetP, targetS);
		const travel = Math.max(1, E.y + E.h / 2 - start - cy(navFrame));
		const t = clamp01((offset - start) / travel);
		const b = t + Math.pow(t, 6) * (1 - t);
		const horizontal = 1 - Math.pow(1 - b, 3);
		const sourceUnion = union(sourceP, sourceS);
		const following = lerp(cy(sourceUnion) - offset, cardMid, b);
		const arrival = Math.max(1, navFrame.h / 2);
		const toHeader = following - cy(navFrame);
		const verticalOffset = (toHeader >= arrival ? following : cy(navFrame) + Math.pow(Math.max(0, toHeader + arrival), 2) / (4 * arrival)) - lerp(cy(sourceUnion), cy(navFrame), b);
		const frame = (source, target) => {
			const w = lerp(source.w, target.w, b), h = lerp(source.h, target.h, b);
			const x = lerp(cx(source), cx(target), horizontal), yy = lerp(cy(source), cy(target), b) + verticalOffset;
			return rect(x - w / 2, yy - h / 2, w, h);
		};
		const primary = frame(sourceP, targetP), secondary = frame(sourceS, targetS);
		const place = (element, from, to) => {
			element.style.transform = `translate(${to.x - from.x}px, ${to.y - from.y}px) scale(${to.w / from.w}, ${to.h / from.h})`;
		};
		place(header.navPrimary, targetP, primary);
		place(header.navFiat, targetS, secondary);
		const collapse = b * b * b;
		const residual = mix(ca.concat(flatten(own), scroll), 1 - collapse);
		flight.root.style.clipPath = `polygon(0 0, 100% 0, 100% ${edgeY}px, 0 ${edgeY}px)`;
		const box = (element, target, projected, rest, design) => {
			const reference = rect(0, 0, lerp(projected.w, rest.w, collapse), lerp(projected.h, rest.h, collapse));
			const sx = target.w / reference.w * s, sy = target.h / reference.h * s;
			element.style.transform = `translate(${cx(target)}px, ${cy(target)}px) scale(${sx}, ${sy}) translate(${-design.w / 2}px, ${-design.h / 2}px)`;
		};
		box(flight.primary, primary, ownP, base(this.primaryD), this.primaryD);
		box(flight.secondary, secondary, ownS, base(this.secondaryD), this.secondaryD);
		const together = union(primary, secondary);
		const [px, py] = project(residual, cx(together) - centerX, cy(together) - centerY);
		const correction = [cx(together) - (centerX + px), cy(together) - (centerY + py)];
		flight.group.style.transformOrigin = `${centerX}px ${centerY}px`;
		flight.group.style.transform = `translate(${correction[0]}px, ${correction[1]}px) ${ca.css(residual)}`;
		const content = smoothstep01(b);
		const { primaryD, iconD, textD, navIconRect, navTextRect } = this;
		const kx = primaryD.w / targetP.w, ky = primaryD.h / targetP.h;
		const inset = navIconRect.w * ICON_INSET;
		const iconTo = rect((navIconRect.x + inset) * kx, (navIconRect.y + inset) * ky, (navIconRect.w - inset * 2) * kx, (navIconRect.h - inset * 2) * ky);
		const textTo = rect(navTextRect.x * kx, navTextRect.y * ky, navTextRect.w * kx, navTextRect.h * ky);
		const iconFrom = rect(iconD.x - primaryD.x, iconD.y - primaryD.y, iconD.w, iconD.h);
		const textFrom = rect(textD.x - primaryD.x, textD.y - primaryD.y, textD.w, textD.h);
		const iconNow = rect(lerp(iconFrom.x, iconTo.x, content), lerp(iconFrom.y, iconTo.y, content), lerp(iconFrom.w, iconTo.w, content), lerp(iconFrom.h, iconTo.h, content));
		const textNow = rect(lerp(textFrom.x, textTo.x, content), lerp(textFrom.y, textTo.y, content), lerp(textFrom.w, textTo.w, content), lerp(textFrom.h, textTo.h, content));
		flight.icon.style.transform = `translate(${cx(iconNow) - cx(iconFrom)}px, ${cy(iconNow) - cy(iconFrom)}px) scale(${iconNow.w / iconFrom.w})`;
		flight.text.style.transform = `translate(${textNow.x - textFrom.x}px, ${textNow.y - textFrom.y}px) scale(${textNow.w / textFrom.w}, ${textNow.h / textFrom.h})`;
		flight.currency.style.opacity = String(1 - smoothstep01(Math.min(1, this.fraction / .25)));
	}
	/** the card's own balance and the copy swap: one of them shows */
	setFlying(flying) {
		if (this.flying === flying) return;
		this.flying = flying;
		const { card, flight } = this;
		const visibility = flying ? "hidden" : "";
		card.balance.style.visibility = card.fiat.style.visibility = card.gemClip.style.visibility = visibility;
		flight.root.hidden = !flying;
		if (flying) this.syncText();
		card.card?.setGemMirror(flying ? flight.gem : null);
	}
	setFolded(folded) {
		if (this.folded === folded) return;
		this.folded = folded;
		this.onFolded?.(folded);
	}
	destroy() {
		this.destroyed = true;
		if (registry.get(this.scroller) === this) registry.delete(this.scroller);
		this.cancelFrame?.();
		this.cancelSettle?.();
		this.resizeObserver.disconnect();
		this.scroller.removeEventListener("scroll", this.onScrollEvent);
		this.scroller.removeEventListener("scrollend", this.onScrollEnd);
		this.card.card?.setGemMirror(null);
	}
};
//#endregion
//#region src/components/wallet/visual/flow/timing.ts
/** The flight from the screen into the row, seconds. */
var TRAVEL = .5;
/** The gem turns into the icon this long after the completion. */
var MORPH_AT = .32;
var STAR_SPAN = 1.25;
/** The gem in the row spins fast. */
var ROW_SPIN = 6.5;
/** The gem's visible width against its slot. */
var GEM_INK = 1.06;
var LIFT_SCALE = .035;
/**
* How far the lifted row's plate goes beyond the row itself: history rows
* have a padding of 8 — this way it goes 6 beyond the white block's edges.
*/
var PLATE_OUT_X = 8.5;
var BIG_SCALE = .33;
/** The row is inserted this long after the throw, while the screen slides away. */
var ROW_DELAY = .1;
/**
* The throw: hops `apex` above the start (and above the target, if it is
* higher) and falls exactly into the target along a parabola, gaining speed.
*/
function toss(a, b, apex, t) {
	const d = b[1] - a[1];
	const rise = apex + Math.max(0, -d);
	const B = -2 * rise - 2 * Math.sqrt(rise * rise + rise * d);
	const C = d - B;
	return [a[0] + (b[0] - a[0]) * t, a[1] + B * t + C * t * t];
}
/**
* The row's lift: 0 — in the list, 1 — lifted. It rises on a spring with an
* overshoot and settles back the same way, sagging a little.
*/
function rowLift(now, liftStart, settleStart) {
	let v = spring(now - liftStart);
	if (settleStart !== null) v *= 1 - spring(now - settleStart, 8, 13);
	return v;
}
/** 1 — the pending layout (big centred amount), falling to 0 once the transfer completes. */
function rowBig(now, settleStart) {
	if (settleStart === null) return 1;
	const u = Math.min(1, Math.max(0, (now - settleStart) / .3));
	return Math.pow(1 - u, 3);
}
/** The hit of the landing gem, px down. */
function rowDip(now, landStart) {
	return 5 * impact(now - landStart);
}
/**
* The gem's place in the row, in the row's coordinates: while the transfer
* goes — after the big amount in the row's middle, then — in the icon's place,
* at the row's inline end (the left one with `rtl`).
*/
function gemSlot(rowWidth, big, rowHeight = 76, rtl) {
	const w = rowWidth;
	const pending = [w - 12 - 17, rowHeight / 2];
	const normal = [w - 12 - 7 + .4, 18.5];
	const x = normal[0] + (pending[0] - normal[0]) * big;
	return [rtl ? w - x : x, normal[1] + (pending[1] - normal[1]) * big];
}
//#endregion
//#region src/components/wallet/chatCard/flight.ts
/**
* A send started in the recipient's chat ends in that chat (iOS ChatWalletTransferAnimation): the wallet closes
* and the amount screen's gem flies into the transfer's new card — a parabola that hops 56 px over the higher of
* its ends, the gem swelling at the top and spinning up, cooled to the card's colour on the way down. The card's
* own gem steps aside until it lands, and the card takes the hit. No card in sight within half a second, or the
* card scrolled away mid-flight: the gem fades where it is.
*/
/** the flight, seconds */
var FLIGHT = .62;
/** the hop over the higher end, px */
var APEX = 56;
/** the card has this long to show up, seconds */
var TARGET_WAIT = .5;
/** a gem that does not fly fades in this long, ms */
var CANCEL_FADE = 150;
var IDLE_SPIN = 2 * Math.PI / 26;
var FLIGHT_SPIN = 5;
function flyWalletGemIntoChat(launch, randomId) {
	const canvas = document.createElement("canvas");
	canvas.setAttribute("aria-hidden", "true");
	canvas.style.cssText = `position:fixed;left:0;top:0;width:150px;height:150px;pointer-events:none;z-index:100`;
	let gem;
	try {
		gem = new GemView(canvas, {
			appearance: Appearance.blue,
			swayScale: 1.6,
			lightBackground: true
		});
	} catch (err) {
		return false;
	}
	gem.setSize(150, pixelRatio());
	gem.adopt(launch.gem);
	gem.style.widthPoints = launch.width;
	gem.style.rotationSpeed = launch.spin;
	getOverlayRoot().append(canvas);
	const [fromX, fromY] = launch.from;
	const place = (x, y) => canvas.style.transform = `translate(${x - 75}px, ${y - 75}px)`;
	place(fromX, fromY);
	let created, started, target, finished = false;
	const finish = () => {
		finished = true;
		detach();
		gem.destroy();
	};
	const cancel = () => {
		if (finished) return;
		finish();
		target?.await(false);
		canvas.animate({ opacity: [1, 0] }, { duration: CANCEL_FADE }).finished.finally(() => canvas.remove());
	};
	const land = () => {
		finish();
		canvas.remove();
		target.land(gem);
	};
	const frame = (now) => {
		created ?? (created = now);
		if (!target) {
			target = getWalletChatCardTarget(randomId);
			target?.await(true);
		}
		const slot = target?.slot();
		const win = getAppWindow();
		if (!(slot && slot.x >= 0 && slot.y >= 0 && slot.x <= win.innerWidth && slot.y <= win.innerHeight)) {
			if (started !== void 0 || now - created >= TARGET_WAIT) {
				cancel();
				return;
			}
			gem.render(now);
			return;
		}
		started ?? (started = now);
		const t = Math.min(1, (now - started) / FLIGHT);
		const [x, y] = toss([fromX, fromY], [slot.x, slot.y], APEX, t);
		place(x, y);
		gem.style.widthPoints = (launch.width + (slot.width - launch.width) * t) * (1 + .28 * Math.sin(Math.PI * Math.min(1, t / .75)));
		gem.style.rotationSpeed = IDLE_SPIN + (FLIGHT_SPIN - IDLE_SPIN) * Math.min(1, t / .6);
		gem.style.appearance = t > .5 ? Appearance.cool : Appearance.blue;
		gem.render(now);
		if (t >= 1) land();
	};
	const detach = addWalletFrameClient({
		frame,
		isVisible: () => true,
		isBusy: () => true,
		onHidden: cancel
	});
	return true;
}
//#endregion
//#region src/components/wallet/visual/flow/overlay.ts
/**
* The sheen over the lifted row: a slanted blue band from left to right,
* starting smoothly and braking softly; a pass takes a second and a half,
* then a pause. `t` — seconds since the lift.
*/
function sheen(g, w, h, t) {
	const u = (t + .2) % 2.5 / 1.5;
	if (u > 1) return;
	const e = .5 - .5 * Math.cos(Math.PI * u);
	const fade = Math.sin(Math.PI * u);
	const x = (-.25 + 1.5 * e) * w;
	const band = (width, peak, rgb) => {
		const grad = g.createLinearGradient(x - width, 0, x + width, width * .55);
		grad.addColorStop(0, `rgba(${rgb},0)`);
		grad.addColorStop(.3, `rgba(${rgb},${peak * .35})`);
		grad.addColorStop(.5, `rgba(${rgb},${peak})`);
		grad.addColorStop(.7, `rgba(${rgb},${peak * .35})`);
		grad.addColorStop(1, `rgba(${rgb},0)`);
		return grad;
	};
	const shape = () => {
		g.beginPath();
		g.roundRect(0, 0, w, h, 22);
	};
	g.save();
	shape();
	g.clip();
	g.fillStyle = band(150, .07 * fade, "92,204,255");
	g.fillRect(0, 0, w, h);
	g.fillStyle = band(60, .07 * fade, "48,161,245");
	g.fillRect(0, 0, w, h);
	g.restore();
	shape();
	g.lineWidth = 5;
	g.strokeStyle = band(120, .22 * fade, "92,204,255");
	g.stroke();
	shape();
	g.lineWidth = 1.2;
	g.strokeStyle = band(90, .85 * fade, "48,161,245");
	g.stroke();
}
var STARS = (() => {
	let seed = 31;
	const rnd = (a, b) => {
		seed = Math.imul(seed, 1664525) + 1013904223 >>> 0;
		return a + (b - a) * seed / 4294967296;
	};
	return Array.from({ length: 34 }, (_, i) => ({
		angle: i % 2 === 0 ? Math.PI + rnd(-.75, .75) : rnd(0, 2 * Math.PI),
		speed: rnd(160, 760),
		size: rnd(2.6, 6.2),
		life: rnd(.6, 1.15),
		delay: rnd(0, .09),
		phase: rnd(0, 2 * Math.PI),
		tone: Math.floor(rnd(0, 2.99))
	}));
})();
var TONES = [
	"48,161,245",
	"92,204,255",
	"33,120,247"
];
/**
* The transfer went through: four-pointed stars fly out of the gem across the
* row — fast, then they brake viscously and fade. More along the row than
* across it. `t` — seconds since the completion, `origin` — the gem's centre.
*/
function starBurst(g, w, h, t, origin) {
	if (t <= 0 || t >= 1.25) return;
	g.save();
	g.beginPath();
	g.roundRect(0, 0, w, h, 22);
	g.clip();
	for (const star of STARS) {
		const age = t - star.delay;
		if (age <= 0 || age >= star.life) continue;
		const u = age / star.life;
		const distance = star.speed * (1 - Math.exp(-2.6 * age)) / 2.6;
		const px = origin[0] + Math.cos(star.angle) * distance;
		const py = origin[1] + Math.sin(star.angle) * distance * .45;
		const fade = Math.min(1, u / .12) * (1 - u * u);
		const twinkle = .72 + .28 * Math.sin(age * 19 + star.phase);
		const r = star.size * (.55 + .45 * (1 - u)) * twinkle;
		const rgb = TONES[star.tone];
		const halo = g.createRadialGradient(px, py, 0, px, py, 2.4 * r);
		halo.addColorStop(0, `rgba(${rgb},${.28 * fade})`);
		halo.addColorStop(1, `rgba(${rgb},0)`);
		g.fillStyle = halo;
		g.fillRect(px - 2.4 * r, py - 2.4 * r, 4.8 * r, 4.8 * r);
		const rot = star.phase + age * 2.4, R = r * 1.5;
		const point = (a, d) => [px + Math.cos(a) * d, py + Math.sin(a) * d];
		g.beginPath();
		g.moveTo(...point(rot, R));
		for (let i = 1; i <= 4; i++) {
			const a = rot + i * Math.PI / 2;
			g.quadraticCurveTo(...point(a - Math.PI / 4, R * .18), ...point(a, R));
		}
		g.closePath();
		g.fillStyle = `rgba(${rgb},${fade})`;
		g.fill();
	}
	g.restore();
}
//#endregion
//#region src/components/wallet/visual/flow/transferRow.ts
var TransferRow = class {
	/**
	* `liftStart` — when the row starts rising (the throw's time + ROW_DELAY in
	* the design). The elements must already be in the document. Throws when
	* WebGL2 is unavailable.
	*/
	constructor(elements, liftStart, callbacks = {}, options = {}) {
		const { shell, row, gemCanvas } = elements;
		this.shell = shell;
		this.row = row;
		this.plate = elements.plate;
		this.amountText = elements.amountText;
		this.overlay = elements.overlay;
		this.gemCanvas = gemCanvas;
		this.badge = elements.badge;
		this.callbacks = callbacks;
		this.reduced = !!options.reduced;
		this.gemless = !!options.gemless || this.reduced;
		this.status = elements.status;
		this.date = elements.date;
		this.timers = [];
		this.rtl = isDocumentRTL(row.ownerDocument);
		Object.assign(gemCanvas.style, {
			width: `150px`,
			height: `150px`,
			visibility: "hidden"
		});
		this.height = shell.offsetHeight || 76;
		if (this.status) this.status.style.opacity = "1";
		if (this.date) this.date.style.opacity = "0";
		if (options.entrance !== false && !this.reduced) {
			const ease = linearEasing(settle, 32);
			shell.animate([{ height: "0px" }, { height: `${this.height}px` }], {
				duration: 520,
				easing: ease
			});
			row.animate([
				{
					opacity: 0,
					scale: "0.86",
					translate: "0 -22px"
				},
				{
					opacity: 1,
					offset: .35
				},
				{
					opacity: 1,
					scale: "1",
					translate: "0 0"
				}
			], {
				duration: 560,
				easing: ease
			});
		}
		row.style.transformOrigin = "50% 50%";
		if (!this.gemless) {
			this.gem = new GemView(gemCanvas, {
				appearance: Appearance.blue,
				rotationSpeed: ROW_SPIN,
				swayScale: 1.6,
				widthPoints: 34 * GEM_INK,
				lightBackground: true,
				starZoom: .55,
				starEmission: .3,
				burstSize: .7
			});
			this.gem.setSize(150, pixelRatio());
		}
		this.overlayCtx = this.overlay.getContext("2d");
		this.width = row.offsetWidth;
		this.liftStart = liftStart;
		this.landStart = options.noFlight ? -Infinity : liftStart - ROW_DELAY + TRAVEL;
		this.landed = this.gemless || options.noFlight ? liftStart : null;
		if (options.noFlight && this.gem) {
			gemCanvas.style.visibility = "visible";
			gemCanvas.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 200 });
		}
		this.settleStart = null;
		this.doneStart = null;
		this.finished = false;
		this.completeOnLand = false;
	}
	/** The flying gem has landed: the row takes it over in the same frame the flying one disappears. */
	land(fly, now) {
		this.landed = now;
		this.gem.adopt(fly);
		this.gem.kick(7, .7);
		this.gemCanvas.style.visibility = "visible";
		navigator.vibrate?.(12);
		if (this.completeOnLand) this.complete(now);
	}
	/**
	* The transfer went through: stars across the row, the gem hops and becomes
	* the icon. Called before the landing, it waits for it.
	*/
	complete(now = clock.now()) {
		if (this.finished || this.doneStart !== null) return;
		if (this.landed === null) {
			this.completeOnLand = true;
			return;
		}
		this.settleStart = this.doneStart = now;
		const settle = this.reduced ? 150 : 350;
		const options = {
			duration: settle,
			easing: "ease-in-out",
			fill: "forwards"
		};
		this.badge?.animate([{
			opacity: 1,
			scale: 1
		}, {
			opacity: 0,
			scale: .001
		}], options);
		this.status?.animate([{ opacity: 1 }, { opacity: 0 }], options);
		this.date?.animate([{ opacity: 0 }, { opacity: 1 }], options);
		if (this.gemless) {
			this.timers.push(clock.after(settle / 1e3, () => this.finish()));
			return;
		}
		this.gem.kick(12, .7);
		this.gem.style.backgroundStars = true;
		this.gem.burst();
		navigator.vibrate?.(20);
		this.timers.push(clock.after(MORPH_AT, () => this.callbacks.onMorph?.()));
		this.timers.push(clock.after(STAR_SPAN + .05, () => this.finish()));
	}
	finish() {
		this.finished = true;
		this.row.style.transform = "";
		if (this.amountText) this.amountText.style.transform = "";
		if (this.status) this.status.style.opacity = "0";
		if (this.date) this.date.style.opacity = "1";
		this.gem?.destroy();
		this.callbacks.onFinish?.();
	}
	frame(now) {
		if (this.finished) return;
		const lift = this.reduced ? 0 : rowLift(now, this.liftStart, this.settleStart);
		const big = this.gemless ? 0 : rowBig(now, this.settleStart);
		const dip = this.gemless ? 0 : rowDip(now, this.landStart);
		this.row.style.transform = `translateY(${-2 * lift + dip}px) scale(${1 + LIFT_SCALE * lift - .004 * dip})`;
		const k = Math.max(0, lift);
		const mx = PLATE_OUT_X * k, my = 3 * k;
		this.plate.style.inset = `${-my}px ${-mx}px`;
		this.plate.style.boxShadow = `0 ${6 * k}px ${14 * k}px rgba(0,0,0,${.13 * Math.min(1, k)})`;
		if (this.amountText) this.amountText.style.transform = `translate(${-24 * big * (this.rtl ? -1 : 1)}px, ${19.5 * big}px) scale(${1 + BIG_SCALE * big})`;
		const w = this.width, H = this.height, OX = PLATE_OUT_X + 2, OY = 5;
		const scale = pixelRatio();
		if (this.overlay.width !== Math.round((w + 2 * OX) * scale)) {
			this.overlay.width = Math.round((w + 2 * OX) * scale);
			this.overlay.height = Math.round((H + 10) * scale);
			Object.assign(this.overlay.style, {
				width: `${w + 2 * OX}px`,
				height: `${H + 10}px`,
				left: `${-OX}px`,
				top: `-5px`
			});
		}
		const g = this.overlayCtx;
		g.setTransform(scale, 0, 0, scale, 0, 0);
		g.clearRect(0, 0, w + 2 * OX, H + 10);
		g.translate(OX - mx, OY - my);
		const pw = w + 2 * mx, ph = H + 2 * my;
		if (this.rtl) {
			g.translate(pw, 0);
			g.scale(-1, 1);
		}
		if (this.doneStart === null && !this.reduced) sheen(g, pw, ph, now - this.liftStart);
		if (this.gemless) return;
		const [sx, sy] = gemSlot(w, 1, H);
		if (this.doneStart !== null) starBurst(g, pw, ph, now - this.doneStart, [sx + mx, sy + my]);
		if (this.landed === null) {
			const [x, y] = gemSlot(w, big, H, this.rtl);
			this.gemCanvas.style.transform = `translate(${x - 75}px, ${y - 75}px)`;
			return;
		}
		const finish = this.doneStart === null ? null : now - this.doneStart;
		const sinceLand = now - this.landStart;
		let width = 34;
		if (finish === null) {
			if (sinceLand > 0 && sinceLand < .36) width *= 1 + .26 * Math.sin(Math.PI * sinceLand / .36) * (1 - .3 * sinceLand / .36);
		} else {
			const pop = Math.sin(Math.PI * Math.min(1, finish / .26)) * .3;
			const shrink = Math.max(0, Math.min(1, (finish - .18) / .16));
			width = 34 * (1 + pop) * (1 - shrink) + 13 * shrink;
		}
		const hop = finish !== null && finish < .34 ? Math.sin(Math.PI * finish / .34) * 11 : 0;
		const fade = finish !== null && finish > .35 ? Math.max(0, 1 - (finish - MORPH_AT - .03) / .1) : 1;
		this.gem.style.widthPoints = width * GEM_INK;
		const [x, y] = gemSlot(w, big, H, this.rtl);
		this.gemCanvas.style.transform = `translate(${x - 75}px, ${y - hop - 75}px)`;
		this.gemCanvas.style.opacity = String(fade);
		this.gem.render(now);
	}
	/** Cancels the pending steps and releases the row's gem. */
	destroy() {
		for (const cancel of this.timers) cancel();
		this.timers = [];
		this.finished = true;
		this.gem?.destroy();
	}
};
//#endregion
//#region src/components/wallet/visual/flow/sendFlow.ts
var SendFlow = class {
	/** Throws when WebGL2 is unavailable. */
	constructor({ list, parent = document.body, onLand }) {
		this.list = list;
		this.onLand = onLand;
		this.flights = [];
		this.rows = [];
		this.flyCanvas = document.createElement("canvas");
		this.flyCanvas.setAttribute("aria-hidden", "true");
		this.flyCanvas.style.cssText = "position:fixed;left:0;top:0;pointer-events:none;z-index:100;display:none";
		this.fly = new GemView(this.flyCanvas, {
			appearance: Appearance.blue,
			swayScale: 1.6,
			lightBackground: true
		});
		this.fly.setSize(150, pixelRatio());
		Object.assign(this.flyCanvas.style, {
			width: `150px`,
			height: `150px`
		});
		parent.append(this.flyCanvas);
	}
	/** The send went off: the gem is thrown from the place of the amount screen's gem. */
	launch({ gem, from, width, spin }, now = clock.now()) {
		const flight = {
			launch: now,
			from,
			fromWidth: width,
			fromSpin: spin,
			row: null,
			landed: false
		};
		this.fly.adopt(gem);
		this.fly.style.rotationSpeed = spin;
		this.fly.style.widthPoints = width;
		this.fly.bursts = [];
		this.flyCanvas.style.display = "block";
		this.flights.push(flight);
		return flight;
	}
	/**
	* The flight's row is in the list (ROW_DELAY after the throw): it starts
	* rising, and the gem falls into it.
	*/
	addRow(flight, elements, callbacks) {
		const row = new TransferRow(elements, flight.launch + ROW_DELAY, callbacks);
		flight.row = row;
		this.rows.push(row);
		return row;
	}
	/**
	* Rows first — they move (lift, hit, opening), then the flying gems: each
	* aims at where its row stands on screen in this frame, with all its
	* shifts. One layout read per frame, after all the writes.
	*/
	frame(now) {
		for (const row of this.rows) row.frame(now);
		for (const flight of this.flights) this.flightFrame(flight, now);
		this.flights = this.flights.filter((f) => !f.landed);
		if (!this.flights.length) this.flyCanvas.style.display = "none";
		this.rows = this.rows.filter((row) => !row.finished);
	}
	get active() {
		return this.flights.length > 0 || this.rows.length > 0;
	}
	flightFrame(flight, now) {
		const t = Math.min(1, Math.max(0, (now - flight.launch) / TRAVEL));
		let slot, slotWidth = 34 * GEM_INK;
		if (flight.row) {
			const r = flight.row.gemCanvas.getBoundingClientRect();
			slot = [r.left + r.width / 2, r.top + r.height / 2];
			slotWidth *= r.width / 150;
		} else {
			const r = this.list.getBoundingClientRect();
			const inset = 37;
			slot = [isDocumentRTL(this.list.ownerDocument) ? r.left + inset : r.right - inset, r.top + 8 + 38];
		}
		const p = toss(flight.from, slot, 44, t);
		const width = (flight.fromWidth + (slotWidth - flight.fromWidth) * t) * (1 + .28 * Math.sin(Math.PI * Math.min(1, t / .75)));
		this.fly.style.widthPoints = width;
		this.fly.style.rotationSpeed = flight.fromSpin + (ROW_SPIN - flight.fromSpin) * Math.min(1, t / .6);
		this.flyCanvas.style.transform = `translate(${p[0] - 75}px, ${p[1] - 75}px)`;
		this.fly.render(now);
		if (t >= 1 && flight.row) this.land(flight, now);
	}
	/** Landed: the row takes the gem over in the same frame the flying one disappears. */
	land(flight, now) {
		flight.landed = true;
		flight.row.land(this.fly, now);
		this.onLand?.(flight.row, now);
	}
	/** Releases the rows' gems, the flying gem and its canvas. */
	destroy() {
		for (const row of this.rows) row.destroy();
		this.rows = [];
		this.flights = [];
		this.fly.destroy();
		this.flyCanvas.remove();
	}
};
var sendAnimation_module_default = {
	lifted: "_lifted_1tunx_6",
	plate: "_plate_1tunx_11",
	overlay: "_overlay_1tunx_20",
	gem: "_gem_1tunx_21",
	badge: "_badge_1tunx_37",
	badgeBackground: "_badgeBackground_1tunx_50",
	badgeRing: "_badgeRing_1tunx_54",
	badgeHand: "_badgeHand_1tunx_60",
	hand: "_hand_1tunx_64",
	hour: "_hour_1tunx_68",
	"hand-spin": "_hand-spin_1tunx_1",
	minute: "_minute_1tunx_72"
};
//#endregion
//#region src/components/wallet/sendAnimation.tsx
var _tmpl$ = /*#__PURE__*/ template(`<div hidden>`);
var _tmpl$2 = /*#__PURE__*/ template(`<canvas hidden aria-hidden=true>`);
var _tmpl$3 = /*#__PURE__*/ template(`<span hidden aria-hidden=true><svg viewBox="0 0 17 17"><circle cx=8.5 cy=8.5 r=8.5></circle><circle cx=8.5 cy=8.5 r=5.6></circle><g><rect x=7.85 y=8.5 width=1.3 height=3.6 rx=0.65 transform="rotate(180 8.5 8.5)"></rect></g><g><rect x=7.85 y=5.95 width=1.3 height=3.2 rx=0.65 transform="rotate(90 8.5 8.5)">`);
/**
* The send after Continue, as the design plays it: the gem of the amount screen is tossed and falls along a
* parabola into the new pending row of the history while the window slides back to the main screen. The row
* rises over the list, sags from the hit and keeps the gem spinning while the transfer goes; when the server
* has it, stars fly out across the row, the gem hops and shrinks into the icon, and the row sits back down.
*
* - the main screen's pending rows carry `WalletPendingRowDecor`: the plate, the sheen, the row's gem. Every
*   transfer that goes plays (iOS), not only the one a gem flew into: the row rises with its own gem once the
*   main screen shows it;
* - a screen calls `runWalletSendFlight` once `submitWalletTransfer` resolved;
* - the store awaits `waitWalletSendSettled(id)` before it swaps the pending row for the transaction.
*
* Frames come only from the wallet's frame loop; in lite mode nothing flies, the screen just goes back.
*/
var ROW_GEM_ICON_POP = [{
	transform: "scale(0.2)",
	opacity: 0
}, {
	transform: "scale(1)",
	opacity: 1
}];
/** The longest a confirmed transfer waits for its row to finish: frames may not come in a hidden tab. */
var SETTLE_TIMEOUT = 4e3;
/** A row this young comes out from under the buttons as it starts; an older one was in the list already. */
var ENTRANCE_WINDOW = 2e3;
var RESTING_WIDTH = 32;
var RESTING_SPIN = 2 * Math.PI / 26;
/** The decor of every pending row on screen, by pending id (an operation id: unique) */
var decors = /* @__PURE__ */ new Map();
var states = /* @__PURE__ */ new WeakMap();
/** Rows that play, by pending id */
var attached = /* @__PURE__ */ new Map();
/**
* The pieces the flow draws over a pending history row. Render it inside the row (it positions itself
* absolutely against it); it shows nothing until a flight lands in its row.
*/
function WalletPendingRowDecor(props) {
	const wallet = useWallet();
	let plate, overlay, gem, badge;
	onMount(() => {
		const id = props.pending.id;
		const row = plate.parentElement;
		const parts = {
			row,
			plate,
			overlay,
			gem,
			badge,
			status: row.querySelector("[data-wallet-row-sending]"),
			date: row.querySelector("[data-wallet-row-date]")
		};
		decors.set(id, parts);
		onCleanup(() => {
			if (decors.get(id) === parts) decors.delete(id);
			attached.get(id)?.release();
		});
	});
	createEffect(on(() => props.pending.failed, (failed) => {
		if (failed) attached.get(props.pending.id)?.release();
	}, { defer: true }));
	createEffect(() => {
		if (props.pending.failed || !wallet.shown() || wallet.router.current()?.name !== "main") return;
		const pending = props.pending;
		onCleanup(requestWalletFrame(() => startPendingRow(wallet, pending)));
	});
	return [
		(() => {
			var _el$ = _tmpl$();
			var _ref$ = plate;
			typeof _ref$ === "function" ? use(_ref$, _el$) : plate = _el$;
			createRenderEffect(() => className(_el$, sendAnimation_module_default.plate));
			return _el$;
		})(),
		(() => {
			var _el$2 = _tmpl$2();
			var _ref$2 = overlay;
			typeof _ref$2 === "function" ? use(_ref$2, _el$2) : overlay = _el$2;
			createRenderEffect(() => className(_el$2, sendAnimation_module_default.overlay));
			return _el$2;
		})(),
		(() => {
			var _el$3 = _tmpl$2();
			var _ref$3 = gem;
			typeof _ref$3 === "function" ? use(_ref$3, _el$3) : gem = _el$3;
			createRenderEffect(() => className(_el$3, sendAnimation_module_default.gem));
			return _el$3;
		})(),
		(() => {
			var _el$4 = _tmpl$3(), _el$6 = _el$4.firstChild.firstChild, _el$7 = _el$6.nextSibling, _el$8 = _el$7.nextSibling, _el$9 = _el$8.firstChild, _el$0 = _el$8.nextSibling, _el$1 = _el$0.firstChild;
			var _ref$4 = badge;
			typeof _ref$4 === "function" ? use(_ref$4, _el$4) : badge = _el$4;
			createRenderEffect((_p$) => {
				var _v$ = sendAnimation_module_default.badge, _v$2 = sendAnimation_module_default.badgeBackground, _v$3 = sendAnimation_module_default.badgeRing, _v$4 = `${sendAnimation_module_default.hand} ${sendAnimation_module_default.hour}`, _v$5 = sendAnimation_module_default.badgeHand, _v$6 = `${sendAnimation_module_default.hand} ${sendAnimation_module_default.minute}`, _v$7 = sendAnimation_module_default.badgeHand;
				_v$ !== _p$.e && className(_el$4, _p$.e = _v$);
				_v$2 !== _p$.t && setAttribute(_el$6, "class", _p$.t = _v$2);
				_v$3 !== _p$.a && setAttribute(_el$7, "class", _p$.a = _v$3);
				_v$4 !== _p$.o && setAttribute(_el$8, "class", _p$.o = _v$4);
				_v$5 !== _p$.i && setAttribute(_el$9, "class", _p$.i = _v$5);
				_v$6 !== _p$.n && setAttribute(_el$0, "class", _p$.n = _v$6);
				_v$7 !== _p$.s && setAttribute(_el$1, "class", _p$.s = _v$7);
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
			return _el$4;
		})()
	];
}
function disposeState(state) {
	if (state.disposed) return;
	state.disposed = true;
	for (const entry of [...attached.values()]) if (entry.state === state) entry.release();
	state.detachFrame();
	state.disposeRoot();
	state.flow.destroy();
	if (states.get(state.wallet.store) === state) states.delete(state.wallet.store);
}
/** The flow of a wallet window: created with its first flight, gone once nothing plays. Throws without WebGL2. */
function getFlightState(wallet, parts) {
	const existing = states.get(wallet.store);
	if (existing && !existing.disposed) return existing;
	const flow = new SendFlow({
		list: parts.row.parentElement,
		parent: parts.row.closest(".popup") || getOverlayRoot()
	});
	const state = {
		wallet,
		flow,
		detachFrame: void 0,
		disposeRoot: void 0,
		disposed: false
	};
	state.detachFrame = addWalletFrameClient({
		frame: (now) => {
			flow.frame(now);
			if (!flow.active) disposeState(state);
		},
		isVisible: () => wallet.shown() && (flow.flights.some((flight) => !flight.landed) || flow.rows.some((row) => isWalletElementOnScreen(row.row))),
		isBusy: () => flow.active
	});
	createRoot((dispose) => {
		state.disposeRoot = dispose;
		createEffect(on(wallet.shown, (shown) => {
			if (!shown) queueMicrotask(() => disposeState(state));
		}, { defer: true }));
	});
	states.set(wallet.store, state);
	return state;
}
/** A gem at rest to fly from, for a screen that has none of its own. */
function restingLaunch(from) {
	return {
		gem: new GemView(document.createElement("canvas"), {
			appearance: Appearance.blue,
			rotationSpeed: RESTING_SPIN
		}),
		from,
		width: RESTING_WIDTH,
		spin: RESTING_SPIN
	};
}
/**
* Lifts a pending row for the flow to play: the plate, the sheen's canvas, the clock on the avatar, the amount
* ready to grow and the gram icon hidden until the gem becomes it. `restore` puts the row back as it was.
*/
function liftRow(parts) {
	const { row, plate, overlay, gem, badge } = parts;
	const reduced = !liteMode.isAvailable("motion");
	const amount = row.querySelector(".currency-amount");
	const amountText = amount?.querySelector("span") || amount;
	const icon = amount?.querySelector("[data-wallet-amount-icon]");
	const media = row.querySelector(".row-media");
	plate.hidden = overlay.hidden = gem.hidden = badge.hidden = false;
	if (!reduced) row.classList.add(sendAnimation_module_default.lifted);
	if (media) {
		const rowRect = row.getBoundingClientRect(), mediaRect = media.getBoundingClientRect();
		const x = isDocumentRTL(row.ownerDocument) ? mediaRect.left - 3 : mediaRect.right - 14;
		badge.style.left = `${x - rowRect.left}px`;
		badge.style.top = `${mediaRect.bottom - rowRect.top - 14}px`;
	} else badge.hidden = true;
	if (amountText) {
		amountText.style.display = "inline-block";
		amountText.style.transformOrigin = "var(--transform-origin-inline-end) 50%";
	}
	const hideIcon = () => {
		if (!icon) return;
		icon.style.opacity = "0";
		icon.style.transform = "scale(0.2)";
	};
	const restore = () => {
		badge.getAnimations().forEach((animation) => animation.cancel());
		row.classList.remove(sendAnimation_module_default.lifted);
		row.style.transform = row.style.transformOrigin = "";
		plate.hidden = overlay.hidden = gem.hidden = badge.hidden = true;
		if (amountText) amountText.style.display = amountText.style.transformOrigin = amountText.style.transform = "";
		if (icon) {
			icon.getAnimations().forEach((animation) => animation.cancel());
			icon.style.opacity = icon.style.transform = "";
		}
	};
	return {
		amountText,
		icon,
		hideIcon,
		restore,
		reduced
	};
}
/** the icon pops in where the gem shrank into it */
function revealIcon(icon) {
	if (!icon) return;
	icon.style.opacity = icon.style.transform = "";
	icon.animate(ROW_GEM_ICON_POP, {
		duration: 450,
		easing: "cubic-bezier(0.34, 1.9, 0.5, 1)",
		fill: "backwards"
	});
}
var rowElements = (parts, amountText) => ({
	shell: parts.row,
	row: parts.row,
	plate: parts.plate,
	amountText,
	overlay: parts.overlay,
	gemCanvas: parts.gem,
	badge: parts.badge,
	status: parts.status,
	date: parts.date
});
/**
* A transfer's row plays with no gem flying into it (iOS: every pending transfer animates): it rises with its
* sheen and clock and — for Grams, with WebGL2 — its own gem, which becomes the icon when the transfer went.
* Nothing when nothing may move, when it plays already or when its row is gone.
*/
function startPendingRow(wallet, pending) {
	const parts = decors.get(pending.id);
	if (!parts?.row.isConnected || attached.has(pending.id) || pending.failed || !liteMode.isAvailable("animations")) return;
	const { amountText, icon, hideIcon, restore, reduced } = liftRow(parts);
	const elements = rowElements(parts, amountText);
	const callbacks = {
		onMorph: () => revealIcon(icon),
		onFinish: () => entry.release()
	};
	const entrance = Date.now() - pending.date < ENTRANCE_WINDOW;
	let transferRow;
	try {
		transferRow = new TransferRow(elements, clock.now(), callbacks, {
			gemless: !!pending.nft,
			noFlight: true,
			entrance,
			reduced
		});
	} catch (err) {
		transferRow = new TransferRow(elements, clock.now(), callbacks, {
			gemless: true,
			noFlight: true,
			entrance: false,
			reduced
		});
	}
	if (transferRow.gem) hideIcon();
	const detachFrame = addWalletFrameClient({
		frame: (now) => transferRow.frame(now),
		isVisible: () => wallet.shown(),
		isBusy: () => !transferRow.finished,
		element: parts.row
	});
	const entry = trackRow(pending.id, transferRow, void 0, () => {
		detachFrame();
		restore();
	});
}
/** back on the main screen, the new row is scrolled into view under the header, not the whole list to the top */
function revealRow(parts) {
	requestWalletFrame(() => {
		const scroller = parts?.row.closest("." + wallet_module_default.content);
		const scroll = getWalletCardScroll(scroller);
		if (scroll) scroll.reveal(parts.row);
		else if (scroller) scroller.scrollTop = 0;
	});
}
/** One playing row: released when it finished, failed, left the screen or the window closed */
function trackRow(id, row, state, cleanup) {
	let resolveSettled;
	const settled = new Promise((resolve) => resolveSettled = resolve);
	let released = false;
	const entry = {
		state,
		row,
		settled,
		release: () => {
			if (released) return;
			released = true;
			if (attached.get(id) === entry) attached.delete(id);
			row.destroy();
			cleanup();
			resolveSettled();
		}
	};
	attached.set(id, entry);
	return entry;
}
function attachRow(state, flight, id, parts) {
	const { amountText, icon, hideIcon, restore } = liftRow(parts);
	hideIcon();
	const unwatch = watchWalletElement(parts.row);
	const transferRow = state.flow.addRow(flight, rowElements(parts, amountText), {
		onMorph: () => revealIcon(icon),
		onFinish: () => entry.release()
	});
	const entry = trackRow(id, transferRow, state, () => {
		unwatch();
		state.flow.rows = state.flow.rows.filter((item) => item !== transferRow);
		for (const item of state.flow.flights) if (item.row === transferRow) item.landed = true;
		restore();
		queueMicrotask(() => !state.flow.active && disposeState(state));
	});
}
/**
* A collectible's transfer, as the desktop client plays it: no gem flies, the new row rises with its sheen and
* clock while the transfer goes and sits back down once the store found it. Back to the main screen first.
*/
function playWalletPendingRow(wallet, pending) {
	wallet.router.pop("main");
	requestWalletFrame(() => {
		const parts = decors.get(pending.id);
		if (!parts) return;
		revealRow(parts);
		startPendingRow(wallet, pending);
	});
}
/**
* Back to the main screen with the new row scrolled into view, and — unless nothing may move — the gem's flight
* into it. Call it once the transfer went through.
*/
function runWalletSendFlight(wallet, options) {
	if (options.fromChat && options.pending.draftRandomId) {
		if (options.launch && liteMode.isAvailable("motion")) flyWalletGemIntoChat(options.launch, options.pending.draftRandomId);
		wallet.close();
		return;
	}
	wallet.router.pop("main");
	const parts = decors.get(options.pending.id);
	if (parts) revealRow(parts);
	if (!parts?.row.isConnected || !liteMode.isAvailable("motion") || attached.has(options.pending.id)) return;
	let state, launch = options.launch;
	try {
		state = getFlightState(wallet, parts);
		if (!launch) {
			const rect = (parts.row.closest(".popup")?.querySelector("." + wallet_module_default.screens))?.getBoundingClientRect();
			const win = getAppWindow();
			launch = restingLaunch(options.from ?? (rect ? [rect.left + rect.width / 2, rect.top + rect.height * .6] : [win.innerWidth / 2, win.innerHeight / 2]));
		}
	} catch (err) {
		startPendingRow(wallet, options.pending);
		return;
	}
	const flight = state.flow.launch(launch);
	if (!options.launch) launch.gem.destroy();
	attachRow(state, flight, options.pending.id, parts);
}
/**
* The store found the transfer on the chain: the row plays its ending (stars, the gem turning into the icon,
* the row sitting down) and this resolves when it is done — or at once when the row does not play.
*/
function waitWalletSendSettled(pendingId) {
	const entry = attached.get(pendingId);
	if (!entry) return Promise.resolve();
	entry.row.complete();
	return Promise.race([entry.settled, new Promise((resolve) => setTimeout(resolve, SETTLE_TIMEOUT))]);
}
//#endregion
//#region src/lib/wallet/stream.ts
/** the id of a transfer read off the stream: the server's own ids never take this form */
var WALLET_STREAM_ID_PREFIX = "stream:";
var PING_INTERVAL = 1e4;
var STALL_TIMEOUT = 3e4;
var RENEW_MARGIN = 6e4;
var BACKOFF = [
	500,
	1e3,
	2e3,
	4e3,
	8e3,
	15e3,
	3e4
];
/** a frame bigger than this is no frame of one wallet's (iOS walletStreamingMaximumFrameBytes) */
var MAX_FRAME_LENGTH = 4194304;
/**
* The opcodes of a plain transfer: none (an empty body), a comment, a private comment. Anything else — a token's or a
* collectible's notification, a bounce — is no transfer of Grams the history would list as one.
*/
var PLAIN_TRANSFER_OPCODES = /* @__PURE__ */ new Set([
	"",
	"0x00000000",
	"0x2167da4b"
]);
var isString = (value) => typeof value === "string";
var isNanos = (value) => isString(value) && /^\d{1,30}$/.test(value);
/**
* A 32-byte hash however it is written — hex, base64 or its URL form — as lowercase hex: the provider and the server
* may write one hash differently. Anything else stays as it is.
*/
function normalizeWalletHash(hash) {
	if (!isString(hash)) return "";
	const text = hash.trim();
	if (/^[0-9a-fA-F]{64}$/.test(text)) return text.toLowerCase();
	if (/^[A-Za-z0-9+/_-]{43}=?$/.test(text)) try {
		const bytes = base64ToBytes(text);
		if (bytes.length === 32) return bytesToHex(bytes);
	} catch (err) {}
	return text;
}
function parseFinality(value) {
	return value === "pending" || value === "confirmed" || value === "finalized" ? value : void 0;
}
/**
* A transaction of the wallet's that is a plain transfer in (iOS WalletStreamingEventParser.transaction, Android
* fromStreamTransaction): from another address, with a value, nothing sent out of it, not aborted, not bounced, and a
* body that is a comment or none. No comment is read off the body: the server's copy brings it.
*/
function parseIncoming(transaction, own, addressBook) {
	const message = transaction?.in_msg;
	const description = transaction?.description;
	const compute = description?.compute_ph;
	const opcode = message?.opcode === null ? "" : message?.opcode;
	if (transaction.emulated === true || !isString(transaction.hash) || !transaction.hash || !isString(transaction.lt) || !/^\d+$/.test(transaction.lt) || !Number.isSafeInteger(transaction.now) || transaction.now <= 0 || !isNanos(transaction.total_fees) || Array.isArray(transaction.out_msgs) && transaction.out_msgs.length || description?.aborted === true || compute && !compute.skipped && compute.success !== true || !message || message.bounced === true || !isNanos(message.value) || !/[1-9]/.test(message.value) || !isString(opcode) || !PLAIN_TRANSFER_OPCODES.has(opcode.toLowerCase()) || canonicalTonAddress(message.destination) !== own) return;
	const source = canonicalTonAddress(message.source);
	if (!source || source === own) return;
	const friendly = addressBook?.[message.source]?.user_friendly;
	return {
		_: "walletTransaction",
		pFlags: { incoming: true },
		id: WALLET_STREAM_ID_PREFIX + transaction.lt + ":" + transaction.hash,
		amount: message.value,
		fee: transaction.total_fees,
		date: transaction.now,
		peer: {
			_: "walletTransactionPeerAddress",
			address: isString(friendly) && canonicalTonAddress(friendly) === source ? friendly : toFriendlyTonAddress(message.source)
		},
		tx_hash: transaction.hash
	};
}
/**
* What a frame says of the wallet at `address`, or nothing: a frame of another account, one that does not parse, one
* too big to be one wallet's
*/
function parseWalletStreamFrame(data, address) {
	if (!isString(data) || data.length > MAX_FRAME_LENGTH) return;
	let object;
	try {
		object = JSON.parse(data);
	} catch (err) {
		return;
	}
	const own = canonicalTonAddress(address);
	if (!own || !object || typeof object !== "object") return;
	switch (object.type) {
		case "account_state_change": {
			const balance = object.state?.balance;
			if (canonicalTonAddress(object.account) !== own || !isNanos(balance)) return;
			return {
				type: "state",
				finality: parseFinality(object.finality),
				balance
			};
		}
		case "transactions": {
			const traceId = object.trace_external_hash_norm;
			const list = Array.isArray(object.transactions) ? object.transactions.filter((transaction) => canonicalTonAddress(transaction?.account) === own) : [];
			if (!isString(traceId) || !traceId || !list.length) return;
			const finality = parseFinality(object.finality);
			return {
				type: "transactions",
				finality,
				traceId,
				incoming: finality === "finalized" ? list.map((transaction) => parseIncoming(transaction, own, object.address_book)).filter(Boolean) : [],
				outgoing: list.some((transaction) => transaction.in_msg && transaction.in_msg.source == null)
			};
		}
		case "trace_invalidated": {
			const traceId = object.trace_external_hash_norm;
			return isString(traceId) && traceId ? {
				type: "invalidated",
				traceId
			} : void 0;
		}
	}
}
var WalletStream = class {
	constructor(managers, address, onEvent) {
		this.managers = managers;
		this.address = address;
		this.onEvent = onEvent;
		this.stopped = true;
		this.attempt = 0;
		this.lastFrameAt = 0;
		this.pingId = 0;
		this.subscriptionId = 0;
	}
	get healthy() {
		return !!this.socket && this.socket.readyState === WebSocket.OPEN && Date.now() - this.lastFrameAt < STALL_TIMEOUT;
	}
	start() {
		if (!this.stopped) return;
		this.stopped = false;
		this.connect();
	}
	stop() {
		this.stopped = true;
		this.teardown();
		clearTimeout(this.reconnectTimer);
	}
	teardown() {
		clearInterval(this.pingTimer);
		clearInterval(this.stallTimer);
		clearTimeout(this.renewTimer);
		const socket = this.socket;
		this.socket = void 0;
		if (socket) {
			socket.onopen = socket.onmessage = socket.onclose = socket.onerror = null;
			try {
				socket.close();
			} catch (err) {}
		}
	}
	async connect() {
		let result;
		try {
			result = await this.managers.appWalletManager.getStreamingUrl();
		} catch (err) {
			this.scheduleReconnect();
			return;
		}
		if (this.stopped) return;
		let url;
		try {
			url = new URL(result.url);
			if (url.protocol !== "wss:" || url.username || url.password) throw new Error("bad stream url");
		} catch (err) {
			this.scheduleReconnect();
			return;
		}
		const socket = this.socket = new WebSocket(url.toString());
		socket.onopen = () => {
			this.attempt = 0;
			this.lastFrameAt = Date.now();
			socket.send(JSON.stringify({
				operation: "subscribe",
				id: "sub-" + ++this.subscriptionId,
				types: ["account_state_change", "transactions"],
				addresses: [this.address],
				min_finality: "pending"
			}));
			this.pingTimer = self.setInterval(() => {
				socket.readyState === WebSocket.OPEN && socket.send(JSON.stringify({
					operation: "ping",
					id: "ping-" + ++this.pingId
				}));
			}, PING_INTERVAL);
			this.stallTimer = self.setInterval(() => {
				if (Date.now() - this.lastFrameAt > STALL_TIMEOUT) this.reconnect();
			}, STALL_TIMEOUT / 3);
		};
		socket.onmessage = (e) => {
			this.lastFrameAt = Date.now();
			const event = parseWalletStreamFrame(e.data, this.address);
			if (event) this.onEvent(event);
		};
		socket.onclose = socket.onerror = () => this.reconnect();
		const expires = result.expires > 1e9 ? result.expires * 1e3 - Date.now() : result.expires * 1e3;
		if (expires > 0) this.renewTimer = self.setTimeout(() => this.reconnect(true), Math.max(5e3, expires - RENEW_MARGIN));
	}
	reconnect(immediately) {
		this.teardown();
		if (this.stopped) return;
		if (immediately) this.connect();
		else this.scheduleReconnect();
	}
	scheduleReconnect() {
		if (this.stopped) return;
		clearTimeout(this.reconnectTimer);
		const delay = BACKOFF[Math.min(this.attempt++, BACKOFF.length - 1)] * (.8 + Math.random() * .4);
		this.reconnectTimer = self.setTimeout(() => this.connect(), delay);
	}
};
//#endregion
export { playWalletPendingRow as a, WalletCardScroll as c, cardGemCenter as d, WalletContext as f, WalletPendingRowDecor as i, DESIGN as l, WalletStream as n, runWalletSendFlight as o, useWallet as p, normalizeWalletHash as r, waitWalletSendSettled as s, WALLET_STREAM_ID_PREFIX as t, cardChipX as u };
