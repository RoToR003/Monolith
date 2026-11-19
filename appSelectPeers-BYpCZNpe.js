//# allFunctionsCalledOnLoad
import { h as Modes } from "./userAgent-ByGXcznk.js";
import { i as windowSize, o as customProperties } from "./themeController-2cytOOn0.js";
import { t as Icon } from "./icon-DbP6Es97.js";
import { S as callbackify } from "./objectUrlUtils-5x08MNuO.js";
import { p as drawCircleFromStart, t as apiManagerProxy } from "./apiManagerProxy-DmQXvxSF.js";
import { m as REAL_FOLDERS, n as rootScope } from "./rootScope-CZS0lmz8.js";
import { a as safeAssign } from "./idb-BZfkipS3.js";
import { a as i18n } from "./langPack-BmdJGr44.js";
import { C as createSignal, g as createEffect, p as createComponent, x as createRoot, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { n as bindManagersToSession } from "./bindManagersToAccount-BL82O9H9.js";
import { t as cancelEvent } from "./cancelEvent-Cw8vYZHp.js";
import { t as clamp } from "./clamp-9UaNhw6N.js";
import { c as insert, g as template, u as memo } from "./web-BPyQozky.js";
import { n as hotReloadGuard } from "./hotReloadGuardProvider-CHEsZRuG.js";
import { t as liteMode } from "./liteMode-DeLStZfQ.js";
import { n as mediaSizes } from "./mediaSizes-C1MTaleW.js";
import { t as classNames } from "./classNames-DxGDjmvw.js";
import { t as getMiddleware } from "./middleware-D6HuIqPm.js";
import { t as ListenerSetter } from "./listenerSetter-BER6qAXn.js";
import { t as isDocumentRTL } from "./isDocumentRTL-z8ksM2Dv.js";
import { i as simulateClickEvent, n as attachClickEvent } from "./clickEvent-COk4YpLP.js";
import { t as labelControl } from "./labelControl-V4jClefJ.js";
import { a as wrapSticker } from "./sticker-5twBOy1Y.js";
import { t as animate } from "./animation-Dd3Xpw_9.js";
import { t as lottieLoader } from "./lottieLoader-B3FXw0K7.js";
import { d as findUpAttribute } from "./inputField-CaCo30N0.js";
import { t as numberThousandSplitter } from "./numberThousandSplitter-CGiPNwwW.js";
import { o as CROSS_FADE_KEYFRAMES } from "./animations-DCmLIda3.js";
import { Cn as CheckboxField, _ as ROW_SELECTION_CHECKBOX_CLASS, b as ROW_WITH_CHECKBOX_AND_MEDIA_CLASS, c as createContextMenu, dt as wrapPeerTitle, h as filterAsync, v as ROW_SELECTION_MEDIA_CLASS } from "./confirmationPopup-Bz6mK0o-.js";
import { cn as getDialogIndex, fn as canSendToUser, hn as filterUnique, mn as getParticipantPeerId, on as namedPromises, pn as getParticipantsCount, un as hasRights } from "./getChatMigratedTo-ChhMNXuu.js";
import { n as createAppWindowIntersectionObserver } from "./preloaderRing-EqVZpID6.js";
import { n as wrapEmojiText } from "./wrapEmojiText-DT39R5Tj.js";
import { t as anchorCallback } from "./anchorCallback-BbwAJdBk.js";
import { r as FocusDirection, t as Scrollable } from "./scrollable-C2-FwBtK.js";
import { t as getUserStatusString } from "./getUserStatusString-YlDGsxzx.js";
import { a as Section, s as appendSectionContent } from "./emailVerification-C8QYZSyu.js";
import { r as wrapSolidComponent } from "./wrapSolidComponent-BASCjNJG.js";
import { t as easeInOutSine } from "./easeInOutSine-Dxgh7RmF.js";
import { r as toastNew, t as hideToast } from "./toast-B6VD5M7R.js";
import { t as SelectorSearch } from "./selectorSearch-TWwbuFOi.js";
import { t as formatNumber } from "./formatNumber-B_dJh0pa.js";
//#region src/components/wrappers/getChatMembersString.ts
function _getChatMembersString(chat, chatFull) {
	let count;
	if (chatFull) count = getParticipantsCount(chatFull);
	else count = chat.participants_count || chat.participants?.participants.length;
	const isBroadcast = chat.pFlags.broadcast;
	count = count || 1;
	return i18n(isBroadcast ? "Peer.Status.Subscribers" : "Peer.Status.Member", [numberThousandSplitter(count)]);
}
function getChatMembersString(chatId, managers = rootScope.managers, chat, onlySync, chatFull) {
	chat ?? (chat = apiManagerProxy.getChat(chatId));
	if (chat._ === "chatForbidden") return i18n("YouWereKicked");
	if (onlySync) return _getChatMembersString(chat, void 0);
	const result = chatFull || managers.appProfileManager.getCachedFullChat(chatId);
	return callbackify(result, (chatFull) => _getChatMembersString(chat, chatFull));
}
//#endregion
//#region src/components/wrappers/localSticker.ts
async function wrapLocalSticker({ container, emoji, width, height, assetName, middleware, managers = rootScope.managers, loop = false, autoplay = true }) {
	container || (container = document.createElement("div"));
	container.classList.add("media-sticker-wrapper");
	let playerPromise;
	if (assetName) playerPromise = lottieLoader.loadAnimationAsAsset({
		container,
		loop,
		autoplay,
		width,
		height,
		noCache: true,
		middleware
	}, assetName).then((animation) => {
		return lottieLoader.waitForFirstFrame(animation);
	});
	else if (emoji) {
		const doc = await managers.appStickersManager.getAnimatedEmojiSticker(emoji);
		if (doc) playerPromise = wrapSticker({
			doc,
			div: container,
			loop,
			play: autoplay,
			width,
			height,
			emoji,
			managers,
			middleware
		}).then((result) => {
			return result.render;
		});
	}
	return {
		container,
		promise: playerPromise
	};
}
//#endregion
//#region src/components/emptyPlaceholder.tsx
var _tmpl$ = /*#__PURE__*/ template(`<div class=selector-empty-placeholder><div class=selector-empty-placeholder-title>`);
var _tmpl$2 = /*#__PURE__*/ template(`<div class=selector-empty-placeholder-description>`);
async function emptyPlaceholder({ middleware, title, description, hide, assetName = "UtyanSearch", width = 140, height = 140, isFullSize }) {
	const { container, promise } = await wrapLocalSticker({
		width,
		height,
		assetName,
		middleware,
		loop: true
	});
	if (!middleware()) return;
	await promise;
	if (!middleware()) return;
	container.classList.add("selector-empty-placeholder-sticker");
	let ret;
	createRoot((disposer) => {
		middleware.onClean(disposer);
		ret = (() => {
			var _el$ = _tmpl$(), _el$2 = _el$.firstChild;
			_el$.classList.toggle("is-full", !!isFullSize);
			insert(_el$, container, _el$2);
			insert(_el$2, title);
			insert(_el$, (() => {
				var _c$ = memo(() => !!description());
				return () => _c$() && (() => {
					var _el$3 = _tmpl$2();
					insert(_el$3, description);
					return _el$3;
				})();
			})(), null);
			createRenderEffect(() => _el$.classList.toggle("hide", !!hide()));
			return _el$;
		})();
	});
	return ret;
}
//#endregion
//#region src/helpers/canvas/roundRect.ts
function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
	const dpr = ctx.canvas.dpr;
	if (dpr) {
		x *= dpr;
		y *= dpr;
		width *= dpr;
		height *= dpr;
	}
	if (typeof radius === "number") {
		if (dpr) radius *= dpr;
		radius = {
			tl: radius,
			tr: radius,
			br: radius,
			bl: radius
		};
	} else {
		const defaultRadius = {
			tl: 0,
			tr: 0,
			br: 0,
			bl: 0
		};
		for (const side in defaultRadius) radius[side] = radius[side] ? dpr ? radius[side] * dpr : radius[side] : defaultRadius[side];
	}
	ctx.beginPath();
	ctx.moveTo(x + radius.tl, y);
	ctx.lineTo(x + width - radius.tr, y);
	ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
	ctx.lineTo(x + width, y + height - radius.br);
	ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
	ctx.lineTo(x + radius.bl, y + height);
	ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
	ctx.lineTo(x, y + radius.tl);
	ctx.quadraticCurveTo(x, y, x + radius.tl, y);
	ctx.closePath();
	if (fill) ctx.fill();
	if (stroke) ctx.stroke();
}
//#endregion
//#region src/helpers/canvas/shimmer.ts
var Shimmer = class {
	constructor() {
		this.font = "30pt Helvetica";
		this.currTime = Date.now();
		this.diffTime = 0;
		this.spread = 0;
		this.paused = false;
		this.pausedTime = 0;
		this.pauseInterval = 850;
		this.lightSource = 0;
		this.inc = .032;
		this.lightSpread = .55;
		this.animations = [
			"slide",
			"slide",
			"slide",
			"slide"
		];
		this.currentAnimationIndex = 0;
	}
	keepTime() {
		this.diffTime = Date.now() - this.currTime;
		this.currTime = Date.now();
	}
	cycleAnimation() {
		++this.currentAnimationIndex;
		if (this.currentAnimationIndex >= this.animations.length) this.currentAnimationIndex = 0;
	}
	animate() {
		const currentAnimation = this.animations[this.currentAnimationIndex];
		if (currentAnimation === "glow") return this.animateGlow();
		else if (currentAnimation === "slide") return this.animateSlide();
		else console.log("unknown animation type: " + String(currentAnimation));
	}
	animateGlow() {
		var glowEnd = 255, rgbStart = 68, r = rgbStart, increment = 10, interval = 800;
		return () => {
			var smartInc = increment * (this.diffTime / (1e3 / 60));
			if (this.paused) {
				if (Date.now() - this.pausedTime > interval) {
					r = rgbStart;
					this.cycleAnimation();
					this.paused = false;
				}
			} else {
				r = parseInt("" + (r + smartInc));
				if (r >= glowEnd) {
					this.paused = true;
					this.pausedTime = Date.now();
				}
			}
			return "rgb(" + r + "," + r + "," + r + ")";
		};
	}
	animateSlide() {
		var gradient = isDocumentRTL() ? this.ctx.createLinearGradient(this.canvas.width, 0, 0, 0) : this.ctx.createLinearGradient(0, 0, this.canvas.width, 0), smartInc = this.inc * (this.diffTime / (1e3 / 60)), lightLeft, lightRight, lightCenter;
		if (this.paused) {
			if (Date.now() - this.pausedTime > this.pauseInterval) {
				this.lightSource = -.6;
				this.cycleAnimation();
				this.paused = false;
				return this.animateSlide();
			}
		} else {
			this.lightSource += smartInc;
			if (this.lightSource > 1 + this.lightSpread) {
				this.paused = true;
				this.pausedTime = Date.now();
			}
		}
		lightCenter = clamp(this.lightSource, 0, 1);
		lightLeft = clamp(this.lightSource - this.lightSpread, 0, 1);
		lightRight = clamp(this.lightSource + this.lightSpread, 0, 1);
		const backgroundColor = customProperties.getProperty("background-color", this.night);
		const shimmerColor = customProperties.getProperty("surface-color", this.night);
		gradient.addColorStop(lightLeft, backgroundColor);
		gradient.addColorStop(lightCenter, shimmerColor);
		gradient.addColorStop(lightRight, backgroundColor);
		return gradient;
	}
	settings(dict = {}) {
		this.canvas = dict.canvas ?? document.createElement("canvas");
		this.ctx = this.canvas.getContext("2d");
		this.font = dict.font ?? this.font;
		this.lightSpread = dict.lightSpread ?? this.lightSpread;
		this.inc = dict.inc ?? this.inc;
		this.animations = dict.animations ?? this.animations;
		this.text = dict.text ?? this.text;
		this.fillStyle = dict.fillStyle;
		this.canvas.classList.add("shimmer-canvas");
	}
	on() {
		const { width, height } = this.canvas;
		this.keepTime();
		this.ctx.clearRect(0, 0, width, height);
		if (this.font) this.ctx.font = this.font;
		this.ctx.fillStyle = this.animate();
		this.ctx.fillRect(0, 0, width, height);
		if (this.fillStyle) {
			this.ctx.fillStyle = this.fillStyle;
			this.ctx.fillRect(0, 0, width, height);
		}
		if (this.text) this.ctx.fillText(this.text, 50, 50);
	}
};
//#endregion
//#region src/helpers/dialogsPlaceholder.ts
var DialogsPlaceholder = class {
	constructor(sizes = {}) {
		this.inView = true;
		this.onThemeChange = () => {
			this.runAnimation();
		};
		this.onResize = () => {
			const { canvas } = this;
			const { width, height, dpr } = canvas;
			this.updateCanvasSize();
			if (canvas.width === width && canvas.height === height && canvas.dpr === dpr) return;
			this.runAnimation();
		};
		this.shimmer = new Shimmer();
		this.shimmer.night = this.night = sizes.night;
		this.tempId = 0;
		this.canvas = document.createElement("canvas");
		this.canvas.classList.add("dialogs-placeholder-canvas", "disable-hover");
		this.ctx = this.canvas.getContext("2d");
		this.generatedValues = [];
		this.avatarSize = sizes.avatarSize ?? 54;
		this.avatarMarginRight = sizes.avatarMarginRight ?? 10;
		this.marginVertical = sizes.marginVertical ?? 9;
		this.marginLeft = sizes.marginLeft ?? 17;
		this.gapVertical = sizes.gapVertical ?? 0;
		this.totalHeight = sizes.totalHeight ?? this.avatarSize + this.marginVertical * 2;
		this.lineHeight = 10;
		this.lineBorderRadius = 6;
		this.lineMarginVertical = sizes.lineMarginVertical ?? 8;
		this.statusWidth = sizes.statusWidth ?? 24;
		this.noSecondLine = sizes.noSecondLine;
	}
	attach({ container, rect, getRectFrom, onRemove, blockScrollable }) {
		const { canvas } = this;
		this.detachTime = void 0;
		this.onRemove = onRemove;
		this.getRectFrom = typeof getRectFrom === "function" ? getRectFrom : (getRectFrom || container).getBoundingClientRect.bind(getRectFrom || container);
		if (this.blockScrollable = blockScrollable) blockScrollable.container.style.overflowY = "hidden";
		this.updateCanvasSize(rect);
		this.startAnimation();
		container.append(canvas);
		this.observer?.disconnect();
		this.observer = createAppWindowIntersectionObserver((entries) => {
			this.inView = entries[entries.length - 1].isIntersecting;
			if (this.inView && this.held) {
				this.held = false;
				this.runAnimation();
			}
		});
		this.observer.observe(canvas);
	}
	detach(availableLength) {
		if (this.detachTime) return;
		this.availableLength = availableLength;
		this.detachTime = Date.now();
		const animationLevel = liteMode.getAnimationLevel();
		if (!animationLevel || !this.inView || !this.hasSize()) this.remove();
		else if (animationLevel === 1) this.canvas.animate(CROSS_FADE_KEYFRAMES.slice().reverse(), {
			duration: 150,
			easing: "ease-in-out",
			fill: "forwards"
		}).finished.then(() => this.remove());
		else if (!this.looping) this.runAnimation();
	}
	removeWithoutUnmounting() {
		this.stopAnimation();
		this.onRemove?.();
		this.onRemove = void 0;
	}
	remove() {
		this.stopAnimation();
		if (this.canvas.parentElement) {
			this.canvas.remove();
			if (this.blockScrollable) {
				this.blockScrollable.container.style.overflowY = "";
				this.blockScrollable = void 0;
			}
		}
		this.onRemove?.();
		this.onRemove = void 0;
	}
	updateCanvasSize(rect = this.getRectFrom()) {
		const { canvas } = this;
		const dpr = canvas.dpr = window.devicePixelRatio;
		canvas.width = rect.width * dpr;
		canvas.height = rect.height * dpr;
		canvas.style.width = rect.width + "px";
		canvas.style.height = rect.height + "px";
	}
	renderDetachAnimationFrame() {
		const { canvas, ctx, detachTime, length, availableLength } = this;
		if (!detachTime) return;
		else if (!liteMode.isAvailable("animations")) {
			this.remove();
			return;
		}
		const { width } = canvas;
		ctx.globalCompositeOperation = "destination-out";
		const DURATION = 150;
		const DELAY = 15;
		const elapsedTime = Date.now() - detachTime;
		let completed = true;
		for (let i = 0; i < length; ++i) {
			const elapsedRowTime = elapsedTime - (availableLength < length && i >= availableLength ? DELAY * (availableLength - 1) : DELAY * i);
			if (elapsedRowTime <= 0) {
				completed = false;
				continue;
			}
			const progress = easeInOutSine(elapsedRowTime, 0, 1, DURATION);
			ctx.beginPath();
			ctx.rect(0, this.dialogHeight * i, width, this.dialogHeight);
			ctx.fillStyle = `rgba(0, 0, 0, ${progress})`;
			ctx.fill();
			if (progress < 1) completed = false;
		}
		ctx.globalCompositeOperation = "source-over";
		if (completed) this.remove();
	}
	renderFrame() {
		this.shimmer.on();
		this.renderDetachAnimationFrame();
	}
	startAnimation() {
		this.runAnimation();
		rootScope.addEventListener("theme_changed", this.onThemeChange);
		mediaSizes.addEventListener("resize", this.onResize);
	}
	hasSize() {
		const { canvas } = this;
		return !!(canvas.width && canvas.height);
	}
	runAnimation() {
		const { canvas, shimmer } = this;
		const tempId = ++this.tempId;
		if (!this.hasSize()) {
			this.looping = false;
			if (this.detachTime) this.remove();
			return;
		}
		const pattern = this.createPattern();
		shimmer.settings({
			canvas,
			fillStyle: pattern
		});
		const middleware = () => {
			return this.tempId === tempId;
		};
		this.renderFrame();
		this.looping = liteMode.isAvailable("motion");
		if (!this.looping) return;
		animate(() => {
			if (!middleware()) return false;
			if (!liteMode.isAvailable("motion") && !this.detachTime) {
				this.looping = false;
				return false;
			}
			if (!this.inView) {
				this.looping = false;
				if (this.detachTime) this.remove();
				else this.held = true;
				return false;
			}
			this.renderFrame();
			return middleware();
		});
	}
	stopAnimation() {
		++this.tempId;
		this.observer?.disconnect();
		this.observer = void 0;
		this.held = false;
		this.inView = true;
		rootScope.removeEventListener("theme_changed", this.onThemeChange);
		mediaSizes.removeEventListener("resize", this.onResize);
	}
	createPattern() {
		const { canvas, ctx } = this;
		const patternCanvas = document.createElement("canvas");
		const patternContext = patternCanvas.getContext("2d");
		const dpr = canvas.dpr;
		patternCanvas.dpr = dpr;
		patternCanvas.width = canvas.width;
		patternCanvas.height = canvas.height;
		patternContext.fillStyle = customProperties.getProperty("surface-color", this.night);
		patternContext.fillRect(0, 0, patternCanvas.width, patternCanvas.height);
		patternContext.fillStyle = "#000";
		patternContext.globalCompositeOperation = "destination-out";
		if (isDocumentRTL()) patternContext.setTransform(-1, 0, 0, 1, patternCanvas.width, 0);
		const dialogHeight = this.dialogHeight = this.totalHeight * dpr;
		const gapVertical = this.gapVertical * dpr;
		let gapVerticalSum = 0;
		const length = this.length = Math.ceil(canvas.height / dialogHeight);
		for (let i = 0; i < length; ++i) {
			this.drawChat(patternContext, i, i * dialogHeight + gapVerticalSum);
			gapVerticalSum += gapVertical;
		}
		return ctx.createPattern(patternCanvas, "no-repeat");
	}
	drawChat(ctx, i, y) {
		let generatedValues = this.generatedValues[i];
		if (!generatedValues) generatedValues = this.generatedValues[i] = {
			firstLineWidth: 40 + Math.random() * 100,
			secondLineWidth: this.noSecondLine ? 0 : 120 + Math.random() * 130,
			statusWidth: this.statusWidth ? this.statusWidth + Math.random() * 16 : void 0
		};
		const { firstLineWidth, secondLineWidth, statusWidth } = generatedValues;
		const { canvas } = ctx;
		const { dpr } = canvas;
		y /= dpr;
		const { avatarSize, marginVertical, lineHeight, lineBorderRadius, lineMarginVertical } = this;
		let marginLeft = this.marginLeft;
		if (avatarSize) {
			drawCircleFromStart(ctx, marginLeft, y + marginVertical, avatarSize / 2, true);
			marginLeft += avatarSize + this.avatarMarginRight;
		}
		roundRect(ctx, marginLeft, y + marginVertical + lineMarginVertical, firstLineWidth, lineHeight, lineBorderRadius, true);
		secondLineWidth && roundRect(ctx, marginLeft, y + this.totalHeight - marginVertical - lineHeight - lineMarginVertical, secondLineWidth, lineHeight, lineBorderRadius, true);
		statusWidth && roundRect(ctx, canvas.width / dpr - 24 - statusWidth, y + marginVertical + lineMarginVertical, statusWidth, lineHeight, lineBorderRadius, true);
	}
};
//#endregion
//#region src/components/appSelectPeers.tsx
var _AppSelectPeers;
/** A row whose trailing checkbox is painted over it — the lane it takes is reserved in `_selector.scss`. */
var ROW_WITH_CHECKBOX_CLASS = "selector-row-with-checkbox";
var AppSelectPeers = class {
	constructor(options) {
		this.container = document.createElement("div");
		this.list = hotReloadGuard.appDialogsManager.createChatList();
		this.selected = /* @__PURE__ */ new Set();
		this.changes = [];
		this.freezed = false;
		this.folderId = 0;
		this.offsetIndex = 0;
		this.channelParticipantsSkipped = /* @__PURE__ */ new Set();
		this.query = "";
		this.loadedWhat = {};
		this.renderedPeerIds = /* @__PURE__ */ new Set();
		this.pendingLists = /* @__PURE__ */ new Set();
		this.peerType = ["dialogs"];
		this.multiSelect = "enabled";
		this.rippleEnabled = true;
		this.avatarSize = "abitbigger";
		this.tempIds = {};
		this.selfPresence = "Presence.YourChat";
		this.needSwitchList = false;
		this.design = "round";
		this.participants = /* @__PURE__ */ new Map();
		this.starsAmountByPeer = /* @__PURE__ */ new Map();
		this.prependedPeerIds = false;
		this.onInput = () => {
			const value = this.inputSearch.value;
			if (this.query === value) return;
			if (this.peerType.includes("contacts") || this.peerType.includes("dialogs")) this.cachedContacts = void 0;
			if (this.peerType.includes("dialogs")) {
				this._setFolderId(value);
				this.offsetIndex = 0;
			}
			for (const i in this.tempIds) ++this.tempIds[i];
			if (this.oldList) this.listMiddlewareHelper.destroy();
			else {
				this.oldList = this.list;
				this.oldListMiddlewareHelper = this.listMiddlewareHelper;
			}
			this.list = hotReloadGuard.appDialogsManager.createChatList();
			this.listMiddlewareHelper = this.middlewareHelper.get().create();
			this.promise = void 0;
			this.query = value;
			this.onSearchChange?.(value);
			this.renderedPeerIds.clear();
			this.prependedPeerIds = false;
			this.needSwitchList = true;
			this.middlewareHelperLoader.clean();
			this.loadedWhat = {};
			if (this.peerType.includes("dialogs")) {
				this.loadedWhat.dialogs = false;
				this.loadedWhat.archived = false;
				this.loadedWhat.contacts = false;
			}
			if (this.peerType.includes("contacts")) this.loadedWhat.contacts = false;
			if (this.peerType.includes("channelParticipants")) {
				this.loadedWhat.channelParticipants = false;
				this.channelParticipantsSkipped.clear();
			}
			if (this.peerType.includes("custom")) this.loadedWhat.custom = false;
			if (this.oldList?.childElementCount) this.emptySearchPlaceholderHideSetter?.(true);
			this.getMoreResults();
		};
		this.checkForTriggers = () => {
			this.scrollable.checkForTriggers();
		};
		this.processPlaceholderOnResults = () => {
			const length = this.list.childElementCount;
			if (!length) {
				if (!this.emptySearchPlaceholderMiddlewareHelper) {
					this.emptySearchPlaceholderMiddlewareHelper = getMiddleware();
					const middleware = this.emptySearchPlaceholderMiddlewareHelper.get();
					createRoot((dispose) => {
						const [query, setQuery] = createSignal(this.query);
						const [description, setDescription] = createSignal();
						const [hide, setHide] = createSignal(false);
						this.emptySearchPlaceholderQuerySetter = setQuery;
						this.emptySearchPlaceholderHideSetter = setHide;
						middleware.onClean(dispose);
						createEffect(() => {
							const query$ = query();
							setDescription(query$.trim() ? i18n("RequestJoin.List.SearchEmpty", [wrapEmojiText(query$)]) : i18n("Search.EmptyQuery"));
						});
						createEffect(() => {
							this.section.container.classList.toggle("is-visible", hide());
						});
						emptyPlaceholder({
							middleware,
							title: () => i18n("SearchEmptyViewTitle"),
							description,
							hide
						}).then((container) => {
							if (!middleware()) return;
							this.heightContainer.append(container);
						});
					});
					return;
				} else {
					this.dialogsPlaceholder?.detach(length);
					this.emptySearchPlaceholderHideSetter(false);
					this.emptySearchPlaceholderQuerySetter(this.query);
				}
			} else {
				this.dialogsPlaceholder?.detach(length);
				this.emptySearchPlaceholderHideSetter?.(true);
				this.emptySearchPlaceholderQuerySetter?.(this.query);
			}
		};
		safeAssign(this, options);
		if (typeof options.multiSelect === "boolean") this.multiSelect = options.multiSelect ? "enabled" : "disabled";
		this.listenerSetter ?? (this.listenerSetter = new ListenerSetter());
		this.checkboxSide ?? (this.checkboxSide = "right");
		this.exceptSelf ?? (this.exceptSelf = false);
		this.meAsSaved ?? (this.meAsSaved = !(this.peerType.length === 1 && this.peerType[0] === "channelParticipants"));
		this.headerSearch = !this.noSearch;
		this.excludePeerIds ?? (this.excludePeerIds = /* @__PURE__ */ new Set());
		if (this.exceptSelf) this.excludePeerIds.add(rootScope.myId);
		this.children = [];
		this.middlewareHelper = options.middleware.create();
		this.middlewareHelperLoader = this.middlewareHelper.get().create();
		this.listMiddlewareHelper = this.middlewareHelper.get().create();
		if (!this.noPlaceholder) this.dialogsPlaceholder = new DialogsPlaceholder(options.placeholderSizes || {
			avatarSize: 42,
			avatarMarginRight: 18,
			marginVertical: 7,
			marginLeft: 12 + (this.design === "square" ? 48 : 0),
			totalHeight: 56,
			gapVertical: options.placeholderElementsGap,
			statusWidth: 0,
			night: this.night
		});
		this.container.classList.add("selector", "selector-" + this.design, "selector-" + this.checkboxSide);
		this.setMultiSelectMode(this.multiSelect);
		this.multiSelectWasHidden = this.multiSelect === "hidden";
		const f = (this.renderResultsFunc || this.renderResults).bind(this);
		this.renderResultsFunc = async (peerIds, append) => {
			const managers = bindManagersToSession(this.managers);
			const middleware = this.middlewareHelperLoader.get();
			if (this.needSwitchList) this.needSwitchList = false;
			peerIds = peerIds.filter((peerId) => {
				if (this.excludePeerIds.has(peerId)) return false;
				if (options.excludeMonoforums) {
					const chat = apiManagerProxy.getChat(peerId.toChatId());
					if (chat?._ === "channel" && chat?.pFlags?.monoforum) return false;
				}
				if (options.excludeBotforums && apiManagerProxy.isBotforum(peerId)) return false;
				const notRendered = !this.renderedPeerIds.has(peerId);
				if (notRendered) this.renderedPeerIds.add(peerId);
				return notRendered;
			});
			if (this.filterPeerTypeBy) {
				const isFunction = typeof this.filterPeerTypeBy === "function";
				peerIds = await filterAsync(peerIds, async (peerId) => {
					if (peerId.isPeerId()) {
						if (isFunction) {
							const peer = await managers.appPeersManager.getPeer(peerId);
							return this.filterPeerTypeBy(peer);
						} else for (const method of this.filterPeerTypeBy) if (await managers.appPeersManager[method](peerId)) return true;
						return false;
					}
					return true;
				});
				if (!middleware()) return;
			}
			await f(peerIds, append);
			if (!middleware()) return;
			if (!this.promise) this.mountList();
			if (!this.promise) this.processPlaceholderOnResults();
			if (this.chatRightsActions?.some((action) => action.startsWith("send_"))) Promise.all(peerIds.map(async (peerId) => {
				const userId = peerId.toUserId();
				const { requirement, starsAmount, canManageDirectMessages } = await namedPromises({
					requirement: managers.appUsersManager.getRequirementToContact(userId),
					starsAmount: managers.appPeersManager.getStarsAmount(peerId),
					canManageDirectMessages: peerId.isAnyChat() && managers.appChatsManager.canManageDirectMessages(peerId.toChatId())
				});
				return {
					peerId,
					userId,
					requirement,
					requiredStars: starsAmount,
					canManageDirectMessages
				};
			})).then((result) => {
				for (const { peerId, requirement, requiredStars, canManageDirectMessages } of result) {
					this.starsAmountByPeer.set(peerId.toPeerId(false), +requiredStars || 0);
					const element = this.getElementByKey(peerId.toPeerId(false));
					if (!element) continue;
					if (requirement?._ === "requirementToContactPremium") {
						const lock = Icon("premium_lock", "selector-premium-lock");
						element.append(lock);
						element.classList.add("is-premium-locked");
					} else if (+requiredStars && !canManageDirectMessages) {
						const starsAmount = formatNumber(+requiredStars, 1);
						const starsBadge = document.createElement("span");
						starsBadge.classList.add("stars-badge-base", "dialog-stars-badge");
						const starsBadgeStars = document.createElement("span");
						starsBadgeStars.append(starsAmount + "");
						starsBadge.append(Icon("star", "stars-badge-base__icon"), starsBadgeStars);
						element.append(starsBadge);
					}
				}
				this.onStarsAmountUpdate?.();
			});
		};
		this.heightContainer = document.createElement("div");
		this.heightContainer.classList.add("selector-height-container");
		let content, title;
		const container = wrapSolidComponent(() => {
			const _self$ = this;
			return createComponent(Section, {
				get ["class"]() {
					return classNames("is-visible", !_self$.sectionCaption && "selector-list-section-container");
				},
				get name() {
					return _self$.sectionNameLangPackKey;
				},
				get caption() {
					return _self$.sectionCaption;
				},
				contentProps: { ref: (element) => content = element },
				nameRef: (element) => title = element
			});
		}, this.middlewareHelper.get());
		if (this.sectionNameLangPackKey) content = appendSectionContent(container);
		if (!this.sectionCaption) content.classList.add("selector-list-section-content");
		content.append(this.list);
		this.section = {
			container,
			content,
			title
		};
		this.heightContainer.append(container);
		const hadScrollable = !!this.scrollable;
		this.scrollable || (this.scrollable = new Scrollable());
		this.scrollable.container.classList.add("selector-scrollable");
		if (Modes.a11y) this.scrollable.container.tabIndex = 0;
		this.container.append(this.scrollable.container);
		this.children.push(this.heightContainer);
		if (!this.noSearch) {
			this.selectorSearch = new SelectorSearch({
				middlewareHelper: this.middlewareHelper,
				multiSelect: this.multiSelect !== "disabled",
				onInput: () => this.onInput(),
				onChipClick: (key) => {
					if (this.freezed) return;
					const li = this.getElementByKey(key);
					if (!li) this.remove(key);
					else simulateClickEvent(li);
				}
			});
			this.searchSection = this.selectorSearch.section;
			this.inputSearch = this.selectorSearch.inputSearch;
			this.input = this.selectorSearch.input;
			this.children.unshift(this.selectorSearch.gradient, this.selectorSearch.section.container);
		} else this.scrollable.attachBorderListeners();
		attachClickEvent(this.container, async (e) => {
			const target = findUpAttribute(e.target, "data-peer-id");
			if (!target || !target.classList.contains("row") && !target.classList.contains("btn-primary")) return;
			cancelEvent(e);
			if (this.freezed) return;
			let key = target.dataset.peerId;
			key = key.isPeerId() ? key.toPeerId() : key;
			if (key.isPeerId() && target.classList.contains("is-premium-locked")) {
				wrapPeerTitle({
					peerId: key,
					onlyFirstName: true
				}).then((title) => {
					toastNew({
						langPackKey: "OnlyPremiumCanMessage",
						langPackArguments: [title, anchorCallback(() => {
							hideToast();
							hotReloadGuard.showPremiumPopup();
						})]
					});
				});
				return;
			}
			const adding = !this.selected.has(key);
			if (this.onSelect) {
				if (await this.onSelect(key, adding, e) === false) return;
			}
			if (!(adding ? this.add({ key }) : this.remove(key))) return;
			this.toggleElementCheckboxByKey(key, adding);
		});
		if (this.multiSelect === "hidden") {
			let target;
			let key;
			createContextMenu({
				listenTo: this.container,
				buttons: [{
					icon: "select",
					text: "SelectChat",
					onClick: () => {
						this.setMultiSelectMode("enabled");
						simulateClickEvent(target);
					},
					verify: () => !this.selected.has(key)
				}, {
					icon: "close",
					text: "Deselect",
					onClick: () => {
						simulateClickEvent(target);
					},
					verify: () => this.selected.has(key)
				}],
				findElement: (e) => findUpAttribute(e.target, "data-peer-id"),
				onOpen: (_e, _target) => {
					target = _target;
					key = target.dataset.peerId;
					key = key.isPeerId() ? key.toPeerId() : key;
				},
				listenerSetter: this.listenerSetter,
				middleware: this.middlewareHelper.get()
			});
		}
		this.scrollable.onScrolledBottom = () => {
			this.getMoreResults();
		};
		this.appendTo.append(this.container);
		const onChatParticipant = (participant, peerId, needAdd = this.channelParticipantsUpdateFilter(participant)) => {
			if (needAdd) this.participants.set(peerId, participant);
			else this.participants.delete(peerId);
			if (needAdd) this.renderResultsFunc([peerId], false);
			else this.deletePeerId(peerId);
		};
		if (this.channelParticipantsUpdateFilter) this.listenerSetter.add(rootScope)("chat_participant", (update) => {
			if (update.channel_id.toPeerId(true) !== (this.channelParticipantsUpdatePeerId ?? this.peerId)) return;
			onChatParticipant(update.new_participant, update.user_id.toPeerId(false));
		});
		if (this.channelParticipantsUpdateFilter && apiManagerProxy.getPeer(this.peerId)?._ === "chat") this.listenerSetter.add(rootScope)("chat_full_update", async (chatId) => {
			if (chatId.toPeerId(true) !== this.peerId) return;
			const middleware = this.middlewareHelperLoader.get();
			const chatFull = await this.managers.appProfileManager.getChatFull(this.peerId.toChatId());
			if (!middleware()) return;
			const participants = chatFull.participants;
			const processedPeerIds = /* @__PURE__ */ new Set();
			for (const participant of participants.participants) {
				const peerId = participant.user_id.toPeerId(false);
				processedPeerIds.add(peerId);
				onChatParticipant(participant, peerId, void 0);
			}
			this.participants.forEach((participant, peerId) => {
				if (!processedPeerIds.has(peerId)) onChatParticipant(participant, peerId, false);
			});
		});
		options.middleware.onDestroy(() => {
			this.destroy();
		});
		if (!options.noInstantLoad) this.loadFirst();
		if (!hadScrollable) this.scrollable.append(...this.children);
	}
	loadFirst() {
		if (this.loadedFirst) return;
		this.loadedFirst = true;
		setTimeout(() => {
			const getResultsPromise = this.getMoreResults();
			if (this.onFirstRender) getResultsPromise.then(() => {
				this.onFirstRender();
			});
		}, 0);
	}
	static convertPeerTypes(types) {
		const isPeerTypeMap = {
			bots: "isBot",
			users: "isRegularUser",
			groups: "isAnyGroup",
			channels: "isBroadcast"
		};
		return types.map((type) => isPeerTypeMap[type]);
	}
	setLimit(limit, callback) {
		this.limit = limit;
		this.limitCallback = callback;
	}
	destroy() {
		this.middlewareHelper.destroy();
		this.emptySearchPlaceholderMiddlewareHelper?.destroy();
		this.listenerSetter.removeAll();
		this.dialogsPlaceholder?.removeWithoutUnmounting();
		this.selectorSearch?.destroy();
		this.inputSearch?.remove();
	}
	deletePeerId(peerId) {
		for (const list of [
			this.list,
			this.oldList,
			...this.pendingLists
		]) {
			const el = list?.querySelector(`[data-peer-id="${peerId}"]`);
			const dialogElement = el?.dialogElement;
			if (dialogElement) dialogElement.remove();
			else el?.remove();
		}
		this.renderedPeerIds.delete(peerId);
		this.channelParticipantsSkipped.delete(peerId);
		if (!this.promise) this.processPlaceholderOnResults();
	}
	_setFolderId(value) {
		this.folderId = (value ? 0 : this.selectedFolderId) ?? 0;
	}
	clearInput() {
		this.inputSearch.value = "";
		this.onInput();
	}
	async renderSaved() {
		if (!this.exceptSelf && !this.offsetIndex && this.folderId === 0 && this.peerType.includes("dialogs") && (!this.query || await this.managers.appUsersManager.testSelfSearch(this.query))) await this.renderResultsFunc([rootScope.myId]);
	}
	getTempId(type) {
		var _this$tempIds;
		(_this$tempIds = this.tempIds)[type] ?? (_this$tempIds[type] = 0);
		const tempId = ++this.tempIds[type];
		return {
			tempId,
			middleware: () => this.tempIds[type] === tempId
		};
	}
	async getMoreDialogs() {
		if (this.loadedWhat.dialogs && this.loadedWhat.archived) return;
		const pageCount = windowSize.height / 56 * 1.25 | 0;
		const { middleware } = this.getTempId("dialogs");
		const promise = this.managers.dialogsStorage.getDialogs({
			query: this.query,
			offsetIndex: this.offsetIndex,
			limit: pageCount,
			filterId: this.folderId,
			skipMigrated: true
		});
		promise.catch(() => {
			if (!middleware()) return;
			this.loadedWhat[this.loadedWhat.dialogs ? "archived" : "dialogs"] = true;
		});
		const value = await promise;
		if (!middleware()) return;
		let dialogs = value.dialogs;
		if (dialogs.length) {
			const newOffsetIndex = getDialogIndex(dialogs[dialogs.length - 1]) || 0;
			dialogs = dialogs.slice();
			if (this.chatRightsActions) {
				dialogs = await filterAsync(dialogs, (d) => this.filterByRights(d.peerId));
				if (!middleware()) return;
			}
			await this.renderSaved();
			if (!middleware()) return;
			this.offsetIndex = newOffsetIndex;
		}
		await this.renderResultsFunc(dialogs.map((dialog) => dialog.peerId));
		if (value.isEnd) {
			if (!this.loadedWhat.dialogs) {
				await this.renderSaved();
				if (!middleware()) return;
				this.loadedWhat.dialogs = true;
				if (this.selectedFolderId !== void 0) this.loadedWhat.archived = true;
				else {
					this.offsetIndex = 0;
					this.folderId = 1;
					return this.getMoreDialogs();
				}
			} else this.loadedWhat.archived = true;
			if (this.canLoadContacts()) return this.getMoreContacts();
		} else if (this.renderedPeerIds.size < pageCount) return this.getMoreDialogs();
	}
	async filterByRights(peerId) {
		const peer = apiManagerProxy.getPeer(peerId);
		if (peerId.isUser()) return this.chatRightsActions[0] !== "send_plain" || canSendToUser(peer);
		else if (this.chatRightsActions.every((action) => hasRights(peer, action))) return true;
	}
	canLoadContacts() {
		return !(this.loadedWhat.contacts || !REAL_FOLDERS.has(this.folderId));
	}
	async getMoreContacts() {
		if (!this.canLoadContacts()) return;
		const isGlobalSearch = this.peerType.includes("contacts");
		if (!this.cachedContacts) {
			const { middleware } = this.getTempId("contacts");
			const promise = Promise.all([isGlobalSearch ? this.managers.appUsersManager.getContactsPeerIds(this.query) : [], this.query ? this.managers.appUsersManager.searchContacts(this.query) : void 0]);
			promise.catch(() => {
				if (!middleware()) return;
				this.loadedWhat.contacts = true;
			});
			const [cachedContacts, searchResult] = await promise;
			if (!middleware()) return;
			if (searchResult) {
				let resultPeerIds = isGlobalSearch ? searchResult.my_results.concat(searchResult.results) : searchResult.my_results;
				if (this.chatRightsActions) {
					resultPeerIds = await filterAsync(resultPeerIds, (peerId) => this.filterByRights(peerId));
					if (!middleware()) return;
				}
				if (!this.peerType.includes("dialogs")) resultPeerIds = resultPeerIds.filter((peerId) => peerId.isUser());
				this.cachedContacts = filterUnique(cachedContacts.concat(resultPeerIds));
			} else this.cachedContacts = cachedContacts.slice();
		}
		const pageCount = windowSize.height / 56 * 1.25 | 0;
		const arr = this.cachedContacts.splice(0, pageCount);
		await this.renderResultsFunc(arr);
		if (!this.cachedContacts.length) this.loadedWhat.contacts = true;
	}
	async getMoreChannelParticipants() {
		if (this.loadedWhat.channelParticipants) return;
		const pageCount = 50;
		let filter;
		if (this.channelParticipantsFilter) filter = typeof this.channelParticipantsFilter === "function" ? this.channelParticipantsFilter(this.query) : this.channelParticipantsFilter;
		else filter = {
			_: "channelParticipantsSearch",
			q: this.query
		};
		const { middleware } = this.getTempId("channelParticipants");
		const promise = this.managers.appProfileManager.getParticipants({
			id: this.peerId.toChatId(),
			filter,
			limit: pageCount,
			offset: this.getChannelParticipantsOffset()
		});
		promise.catch(() => {
			if (!middleware()) return;
			this.loadedWhat.channelParticipants = true;
		});
		const chatParticipants = await promise;
		if (!middleware()) return;
		const { participants } = chatParticipants;
		const peerIds = participants.map((participant) => {
			const peerId = getParticipantPeerId(participant);
			this.participants.set(peerId, participant);
			return peerId;
		});
		const rowsBefore = this.list.childElementCount;
		await this.renderResultsFunc(peerIds);
		if (!middleware()) return;
		if (this.list.childElementCount - rowsBefore < peerIds.length) {
			const rowPeerIds = new Set(Array.from(this.list.children, (row) => row.dataset.peerId));
			for (const peerId of peerIds) if (!rowPeerIds.has("" + peerId) && this.participants.has(peerId)) this.channelParticipantsSkipped.add(peerId);
		}
		const count = chatParticipants.count ?? participants.length;
		if (this.getChannelParticipantsOffset() >= count || participants.length < pageCount) this.loadedWhat.channelParticipants = true;
	}
	getChannelParticipantsOffset() {
		return this.list.childElementCount + this.channelParticipantsSkipped.size;
	}
	async _getMoreCustom() {
		if (this.loadedWhat.custom) return;
		const { middleware } = this.getTempId("custom");
		const promise = this.getMoreCustom(this.query, middleware);
		promise.catch(() => {
			if (!middleware()) return;
			this.loadedWhat.custom = true;
		});
		const res = await promise;
		if (!middleware()) return;
		const { result, isEnd } = res;
		await this.renderResultsFunc(result);
		if (!middleware()) return;
		if (isEnd) this.loadedWhat.custom = true;
	}
	_getMoreResults() {
		if (!this.query && !this.prependedPeerIds && this.prependPeerIds?.length) {
			this.prependedPeerIds = true;
			return Promise.resolve(this.renderResultsFunc(this.prependPeerIds)).then(() => this._getMoreResults());
		}
		if (this.peerType.includes("dialogs") && !this.loadedWhat.archived) return this.getMoreSomething("dialogs");
		if ((this.peerType.includes("contacts") || this.peerType.includes("dialogs")) && !this.loadedWhat.contacts && this.canLoadContacts()) return this.getMoreSomething("contacts");
		if (this.peerType.includes("channelParticipants") && !this.loadedWhat.channelParticipants) {
			const middleware = this.middlewareHelperLoader.get();
			return this.getMoreSomething("channelParticipants").then(() => {
				if (middleware() && this.loadedWhat.channelParticipants) return this._getMoreResults();
			});
		}
		if (this.peerType.includes("custom") && !this.loadedWhat.custom) return this.getMoreSomething("custom");
	}
	getMoreResults() {
		if (this.promise) return this.promise;
		const loadPromise = this._getMoreResults();
		if (!loadPromise) {
			this.processPlaceholderOnResults();
			return Promise.resolve();
		}
		const middleware = this.middlewareHelperLoader.get();
		const promise = this.promise = loadPromise.catch((err) => {
			console.error("get more result error", err);
		}).then(() => {
			if (this.promise === promise) this.promise = void 0;
			if (middleware()) {
				this.mountList();
				const loadedAll = Object.values(this.loadedWhat).every((v) => v);
				const length = this.list.childElementCount;
				if (loadedAll && !length) {
					this.dialogsPlaceholder?.detach(length);
					return this.processPlaceholderOnResults();
				} else if (length || loadedAll) {
					this.dialogsPlaceholder?.detach(length);
					this.emptySearchPlaceholderHideSetter?.(true);
				}
			}
			this.checkForTriggers();
			return this.promise;
		});
		return promise;
	}
	/**
	* What the rows put in `list` live by - the list itself, which a new search keeps on screen until
	* its results take its place. The loader's middleware only says whether a search is still current
	*/
	getRowsMiddleware() {
		return this.listMiddlewareHelper.get();
	}
	mountList() {
		if (!this.oldList) return;
		this.oldList.replaceWith(this.list);
		this.oldList = void 0;
		this.oldListMiddlewareHelper.destroy();
		this.oldListMiddlewareHelper = void 0;
	}
	getMoreSomething(peerType) {
		return {
			dialogs: this.getMoreDialogs,
			contacts: this.getMoreContacts,
			channelParticipants: this.getMoreChannelParticipants,
			custom: this._getMoreCustom
		}[peerType].call(this);
	}
	async renderResults(peerIds, append) {
		const middleware = this.middlewareHelperLoader.get();
		const list = this.list;
		if (!this.peerType.includes("dialogs") && this.loadedWhat.contacts) peerIds = await filterAsync(peerIds, (peerId) => {
			return this.managers.appUsersManager.isNonContactUser(peerId);
		});
		if (!middleware()) return;
		const container = document.createElement("div");
		this.pendingLists.add(container);
		const position = document.createComment("");
		list[append === false ? "prepend" : "append"](position);
		const rowsMiddleware = this.getRowsMiddleware();
		const cancelled = new Promise((resolve) => middleware.onClean(resolve));
		const dialogElements = [];
		let mounted = false;
		const checkboxes = [];
		const promises = peerIds.map(async (key) => {
			const additionalParams = this.additionalDialogParams?.(key);
			const dialogLoadPromises = additionalParams?.loadPromises || [];
			const dialogElement = hotReloadGuard.appDialogsManager.addDialogNew({
				peerId: this.getPeerIdFromKey?.(key) ?? key,
				rippleEnabled: this.rippleEnabled,
				avatarSize: this.avatarSize,
				meAsSaved: this.meAsSaved,
				append,
				wrapOptions: { middleware: rowsMiddleware },
				withStories: this.withStories,
				...additionalParams,
				container,
				loadPromises: dialogLoadPromises
			});
			dialogElements.push(dialogElement);
			const rowMiddleware = dialogElement.middlewareHelper.get();
			if (this.getPeerIdFromKey) dialogElement.container.dataset.peerId = key;
			const { dom } = dialogElement;
			if (this.design === "square") {
				dom.containerEl.classList.add(ROW_WITH_CHECKBOX_AND_MEDIA_CLASS);
				dialogElement.media?.classList.add(ROW_SELECTION_MEDIA_CLASS);
			}
			if (this.multiSelect !== "disabled") {
				const selected = this.selected.has(key);
				const checkbox = this.checkbox(selected, void 0, dom.titleSpan);
				if (this.design === "square") checkbox.classList.add(ROW_SELECTION_CHECKBOX_CLASS);
				checkboxes.push({
					key,
					input: checkbox.querySelector("input")
				});
				if (this.checkboxSide === "right") {
					dom.containerEl.classList.add(ROW_WITH_CHECKBOX_CLASS);
					dom.containerEl.append(checkbox);
				} else dom.containerEl.prepend(checkbox);
			}
			const prepare = async () => {
				let subtitleEl;
				if (this.getSubtitleForElement) subtitleEl = await this.getSubtitleForElement(key, rowMiddleware);
				if (!middleware() || !rowMiddleware()) return;
				if (!subtitleEl) subtitleEl = await this.wrapSubtitle(key);
				if (!middleware() || !rowMiddleware()) return;
				dom.lastMessageSpan.append(subtitleEl);
				if (this.processElementAfter) await this.processElementAfter(key, dialogElement);
			};
			return Promise.race([
				Promise.all([...dialogLoadPromises, prepare()]),
				new Promise((resolve) => rowMiddleware.onClean(resolve)),
				cancelled
			]);
		});
		try {
			await Promise.all(promises);
			if (!middleware()) return;
			for (const { key, input } of checkboxes) input.checked = this.selected.has(key);
			position.replaceWith(...container.children);
			mounted = true;
		} finally {
			position.remove();
			this.pendingLists.delete(container);
			if (!mounted) dialogElements.forEach((dialogElement) => dialogElement.destroy());
		}
	}
	async wrapSubtitle(peerId) {
		const managers = bindManagersToSession(this.managers);
		let subtitleEl;
		if (peerId.isAnyChat()) subtitleEl = await getChatMembersString(peerId.toChatId());
		else if (peerId === rootScope.myId) subtitleEl = i18n(this.selfPresence);
		else subtitleEl = getUserStatusString(await managers.appUsersManager.getUser(peerId.toUserId()));
		return subtitleEl;
	}
	checkbox(selected, color = "secondary", label) {
		const checkboxField = new CheckboxField({
			round: this.design === "round",
			color
		});
		if (selected) checkboxField.input.checked = selected;
		if (typeof label === "string") checkboxField.input.setAttribute("aria-label", label);
		else labelControl(checkboxField.input, label);
		return checkboxField.label;
	}
	add({ key, title, scroll = true, fireOnChange = true, fallbackIcon }) {
		if (this.limit && this.selected.size >= this.limit) {
			this.limitCallback?.();
			return false;
		}
		const added = !this.selected.has(key);
		this.selected.add(key);
		if (added) this.changes.push({
			key,
			add: true
		});
		if (this.multiSelect !== "enabled" || !this.input) {
			fireOnChange && this.dispatchOnChange();
			return this.multiSelect !== "disabled";
		}
		if (this.query.trim()) this.clearInput();
		const rendered = this.selectorSearch.addChip({
			key,
			middleware: this.middlewareHelper.get(),
			title,
			scroll,
			fallbackIcon,
			primary: true
		});
		fireOnChange && this.dispatchOnChange();
		return rendered;
	}
	remove(key, fireOnChange = true) {
		if (this.multiSelect !== "enabled") return false;
		const onRemoved = () => {
			if (this.selected.delete(key)) this.changes.push({
				key,
				add: false
			});
			fireOnChange && this.dispatchOnChange();
		};
		onRemoved();
		if (this.selectorSearch) this.selectorSearch.removeChip(key);
		return true;
	}
	getSelected() {
		return [...this.selected];
	}
	getElementByKey(key) {
		return this.container.querySelector(`.row[data-peer-id="${key}"]`);
	}
	toggleElementCheckboxByKey(key, checked) {
		const checkboxes = this.findCheckboxes(key);
		const value = checked === void 0 ? void 0 : checked;
		checkboxes.forEach((checkbox) => checkbox.checked = value ?? !checkbox.checked);
	}
	addBatch(values) {
		if (!values.length) return;
		values.forEach((value) => {
			this.add({
				key: value,
				scroll: false,
				fireOnChange: false
			});
			this.toggleElementCheckboxByKey(value, true);
		});
		this.dispatchOnChange();
	}
	removeBatch(values, fireOnChange = true) {
		if (!values.length) return;
		values.forEach((value) => {
			this.remove(value, false);
			this.toggleElementCheckboxByKey(value, false);
		});
		if (fireOnChange) this.dispatchOnChange();
	}
	dispatchOnChange() {
		const changes = this.changes;
		this.changes = [];
		this.onChange?.(this.selected.size, changes);
		if (!this.selected.size && this.multiSelectWasHidden) this.setMultiSelectMode("hidden");
	}
	findCheckboxes(key) {
		const query = `[data-peer-id="${key}"] input`;
		return [this.container].flatMap((c) => [...c.querySelectorAll(query)]);
	}
	addInitial(values) {
		if (!values?.length) return;
		this.addBatch(values);
		this.selectorSearch && window.requestAnimationFrame(() => {
			this.selectorSearch.scrollToInput(FocusDirection.Static);
		});
	}
	setMultiSelectMode(mode) {
		this.multiSelect = mode;
		this.container.classList.toggle("selector-multiselect-hidden", mode === "hidden");
	}
	setFolderId(folderId) {
		const willBeFolderId = folderId || void 0;
		if (this.selectedFolderId === willBeFolderId) return;
		this.selectedFolderId = willBeFolderId;
		if (!this.loadedFirst) {
			this._setFolderId("");
			return;
		}
		this.reload();
	}
	/** Loads what the selector lists anew, from the start and for the search it has: what it shows has changed */
	reload() {
		this.query = "";
		this.onInput();
	}
};
_AppSelectPeers = AppSelectPeers;
_AppSelectPeers.renderEntity = SelectorSearch.renderEntity;
//#endregion
export { wrapLocalSticker as a, emptyPlaceholder as i, DialogsPlaceholder as n, getChatMembersString as o, roundRect as r, AppSelectPeers as t };
