//# allFunctionsCalledOnLoad
const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["widget-host-C3y2l8XZ.js","rolldown-runtime-CwcJO0Gh.js","defineProperty-_J0dqq22.js","_virtual_sandbox-bundle-Cx0JRIXr.js","engine-client-CTcFsvrw.js","iframe-renderer-BXXFMzxx.js","protocol-C2byfLMO.js","sdk-policy-J1ymCNEZ.js","inline-engine-B3BQc13q.js","preload-helper-B0NHKCoo.js","shadow-renderer-_et1p-EL.js","gesture-policy-Ba1jg4xj.js","worker-pool-BxRQ_2fj.js","emoji-DoM3TRja.js","emojiImage-DBZC34jk.js","emojiSupport-Cdbu9YLM.js","regex-DmbDaFB2.js","getEmojiUnified-BWhll3lJ.js","emoji-Bi9QRCod.js"])))=>i.map(i=>d[i]);
import { n as __exportAll } from "./rolldown-runtime-CwcJO0Gh.js";
import { h as Modes } from "./userAgent-ByGXcznk.js";
import { t as themeController } from "./themeController-2cytOOn0.js";
import { t as noop } from "./noop-H9NNBLfX.js";
import { n as rootScope } from "./rootScope-CZS0lmz8.js";
import { a as i18n, d as setBlankToAnchor, u as langPack_default } from "./langPack-BmdJGr44.js";
import { C as createSignal, L as untrack, M as onCleanup, N as onMount, g as createEffect, j as on, p as createComponent, s as Show, x as createRoot, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { t as __vitePreload } from "./preload-helper-B0NHKCoo.js";
import { i as getManagersSession } from "./getCurrentAccount-D0KQFbZ6.js";
import { E as hexToRgb, P as mixColors, V as rgbaToRgb, z as rgbaToHexa } from "./state-JPIG5PpJ.js";
import { _ as use, c as insert, f as setAttribute, g as template, o as className, p as setStyleProperty } from "./web-BPyQozky.js";
import { n as hotReloadGuard } from "./hotReloadGuardProvider-CHEsZRuG.js";
import { t as classNames } from "./classNames-DxGDjmvw.js";
import { t as IconTsx } from "./iconTsx-B4lOk4A6.js";
import { n as animationIntersector } from "./animationIntersector-vAjH_7t1.js";
import { t as PreloaderTsx } from "./putPreloader-Bxq7N1RV.js";
import { r as IS_WEB_ASSEMBLY_SUPPORTED } from "./webAssemblyBaselineSupport-CW9cv_m1.js";
import { E as lastItem } from "./getChatMigratedTo-ChhMNXuu.js";
import { S as confirmOpenUrl } from "./appDialogsManager-CXguiKc3.js";
import { D as A11yButton } from "./openEditors-7FmA7q_V.js";
import { i as getPageButtonClasses, o as getPageButtonRowClasses } from "./instantViewFormatting-sqXAtEbL.js";
import { a as getWidgetFixedHeight, l as rememberWidgetHeight, r as getRememberedWidgetHeight } from "./sizing-CYIKGrfN.js";
import { a as setWidgetClaim, n as getWidgetClaim, t as WIDGET_ATTRIBUTE } from "./gestures-CSyJN1uf.js";
import { t as shallowCopy } from "./shallowCopy-kG7Opd76.js";
//#region src/components/widgetSandbox/staging.ts
var layers = /* @__PURE__ */ new WeakMap();
function getLayer(chat) {
	let entry = layers.get(chat);
	if (entry) return entry;
	const bubbles = chat.bubbles;
	const layer = document.createElement("div");
	layer.style.cssText = "position:absolute;top:var(--chat-padding-top,0px);left:0;height:0;overflow:hidden;pointer-events:none;contain:strict;";
	layer.setAttribute("aria-hidden", "true");
	let markSized;
	const sized = new Promise((resolve) => markSized = resolve);
	const observer = new (bubbles.container.ownerDocument.defaultView ?? window).ResizeObserver(([entry]) => {
		layer.style.width = entry.contentRect.width + "px";
		markSized();
	});
	observer.observe(bubbles.scrollable.container);
	bubbles.container.append(layer);
	layers.set(chat, entry = {
		layer,
		observer,
		sized,
		users: 0
	});
	return entry;
}
/**
* Makes the point (x, y) of a widget's frame (widget CSS px) hit-testable for one synchronous call (the widget's
* `elementFromPoint`): where something else is topmost there — it is out of the viewport, under the topbar or the
* input field — `mover`, the frame's bubble or its staged copy, is shifted so that the point lands in the middle of
* what its scrolling container shows, over the rest of the chat; returns what puts it back. No frame is painted, nor
* input taken, in between.
*/
function reachPoint(frame, x, y, mover) {
	const doc = frame.ownerDocument;
	const view = doc.defaultView;
	const rect = frame.getBoundingClientRect();
	const scale = frame.offsetWidth ? rect.width / frame.offsetWidth : 1;
	const px = rect.left + x * scale, py = rect.top + y * scale;
	if (px >= 0 && py >= 0 && px < view.innerWidth && py < view.innerHeight && doc.elementFromPoint(px, py) === frame) return noop;
	const area = (mover.closest(".scrollable") ?? doc.documentElement).getBoundingClientRect();
	const top = Math.max(area.top, 0), bottom = Math.min(area.bottom, view.innerHeight);
	const left = Math.max(area.left, 0), right = Math.min(area.right, view.innerWidth);
	const dx = px < left || px >= right ? (left + right) / 2 - px : 0;
	const dy = (top + bottom) / 2 - py;
	const style = mover.style.cssText;
	mover.style.translate = `${dx}px ${dy}px`;
	mover.style.zIndex = "2147483647";
	if (view.getComputedStyle(mover).position === "static") mover.style.position = "relative";
	return () => mover.style.cssText = style;
}
var REVEALED = "pointer-events:auto;overflow:visible;contain:none;clip-path:none;z-index:2147483647;";
/**
* `copy`: the copy, inert (out of hit testing and focus) but for the call; `layer`: what holds it under everything,
* clipped; `clipping`: an ancestor that clips it too (the block it waits in). Other copies in the layer stay inert.
*/
function revealer(copy, layer, clipping) {
	return () => {
		const style = layer.style.cssText;
		const overflow = clipping?.style.overflow;
		layer.style.cssText = style + REVEALED;
		copy.inert = false;
		if (clipping) clipping.style.overflow = "visible";
		return () => {
			layer.style.cssText = style;
			copy.inert = true;
			if (clipping) clipping.style.overflow = overflow;
		};
	};
}
/**
* Stages a frame for the widget block `block`, which is inside its bubble while the bubble is not in the chat;
* undefined where there is nothing to copy (no bubble, no chat), or the start is let go (`cancelled`) before the chat's
* scrollable has a width — one taken out of the page never reports it. `overlay`, what the bubble draws over the block
* (the message's time over its corner), is copied whole into the copy of its parent, so that it can be measured there.
*/
async function stageInChat(chat, block, overlay, cancelled) {
	const bubble = block.closest(".bubble");
	if (!bubble || !chat?.bubbles?.container) return;
	const entry = getLayer(chat);
	++entry.users;
	const release = () => {
		if (--entry.users || layers.get(chat) !== entry) return;
		entry.observer.disconnect();
		entry.layer.remove();
		layers.delete(chat);
	};
	if (!await Promise.race([entry.sized.then(() => true), ...cancelled ? [cancelled.then(() => false)] : []])) {
		release();
		return;
	}
	const column = document.createElement("div");
	column.className = chat.bubbles.chatInner.className;
	column.style.cssText = "position:absolute;top:0;left:0;right:0;min-height:0;transform:none;transition:none;";
	column.inert = true;
	const dateGroup = document.createElement("div");
	dateGroup.className = "bubbles-date-group";
	const group = document.createElement("div");
	group.className = "bubbles-group";
	column.append(dateGroup);
	dateGroup.append(group);
	const path = [];
	for (let node = block; node; node = node === bubble ? null : node.parentElement) path.unshift(node);
	let parent = group;
	const copies = /* @__PURE__ */ new Map();
	for (const node of path) {
		const copy = shallowCopy(node);
		parent.append(copy);
		copies.set(node, parent = copy);
	}
	const overlayCopy = (overlay && copies.get(overlay.parentElement))?.appendChild(overlay.cloneNode(true));
	entry.layer.append(column);
	return {
		container: parent,
		reveal: revealer(column, entry.layer),
		mover: column,
		overlay: overlayCopy,
		dispose: () => {
			column.remove();
			release();
		}
	};
}
/**
* Stages a frame inside the block itself (a widget starting again where its picture is): hidden over it, at its size
* (a height the bot declared is the block's).
*/
function stageInBlock(block) {
	const container = document.createElement("div");
	container.style.cssText = "position:absolute;inset:0;clip-path:inset(50%);pointer-events:none;";
	container.inert = true;
	container.setAttribute("aria-hidden", "true");
	block.append(container);
	return {
		container,
		reveal: revealer(container, container, block),
		dispose: () => container.remove()
	};
}
//#endregion
//#region src/lib/widgetSandbox/actions.ts
/** Who takes the widgets' actions instead of the client, the last one taken first. */
var interceptors = [];
var dialogOpen = false;
function openLink(url) {
	const anchor = setBlankToAnchor(document.createElement("a"));
	anchor.href = url;
	dialogOpen = true;
	confirmOpenUrl(anchor, () => dialogOpen = false);
}
function openTelegramLink(url) {
	hotReloadGuard.appImManager.openUrl(url);
}
function handleWidgetAction(action) {
	const interceptor = lastItem(interceptors);
	if (interceptor) return interceptor(action);
	switch (action.kind) {
		case "openLink":
			if (!dialogOpen) openLink(action.url);
			break;
		case "openTelegramLink": openTelegramLink(action.url);
	}
}
//#endregion
//#region src/vendor/widget-sandbox/src/host/suspend-kind.ts
var W = globalThis.WebAssembly;
/** JSPI where the engine has it (Chromium, Safari), the asyncify build elsewhere (Firefox) or when `prefer`red. */
function suspendKind(prefer = "auto") {
	return prefer !== "asyncify" && typeof W?.Suspending === "function" && typeof W.promising === "function" ? "jspi" : "asyncify";
}
//#endregion
//#region src/helpers/storedChoice.ts
/** What is stored under `key` if it is one of `values`, else `fallback`. */
function readStoredChoice(key, values, fallback) {
	try {
		const value = localStorage.getItem(key);
		return values.includes(value) ? value : fallback;
	} catch {
		return fallback;
	}
}
//#endregion
//#region src/lib/widgetSandbox/runtime.ts
/** `sab`: sandbox workers kept booted (QuickJS + the shim) so the next widget skips a cold start. */
var POOL_SIZE = 2;
/** Widgets that keep an engine at once; past it the one hidden the longest keeps only its picture. */
var MAX_LIVE_WIDGETS = 8;
/** The wire forms widget profile 1 sets for every client (docs/integration.md, "Policy and features"). */
var FEATURES = ["webAnimations"];
var RENDERER_STORAGE_KEY = "tweb-widget-renderer";
var TRANSPORT_STORAGE_KEY = "tweb-widget-transport";
var SUSPEND_STORAGE_KEY = "tweb-widget-suspend";
var ENGINES_STORAGE_KEY = "tweb-widget-engines";
var [widgetRendererKind, setRendererKind] = createRoot(() => createSignal(readStoredChoice(RENDERER_STORAGE_KEY, ["iframe", "shadow"], "iframe")));
var [widgetTransport, setTransport] = createRoot(() => createSignal(readStoredChoice(TRANSPORT_STORAGE_KEY, [
	"auto",
	"worker",
	"inline",
	"sab",
	"frame"
], "auto")));
var [widgetSuspend, setSuspend] = createRoot(() => createSignal(readStoredChoice(SUSPEND_STORAGE_KEY, [
	"auto",
	"jspi",
	"asyncify"
], "auto")));
var [widgetEngineCount, setEngineCount] = createRoot(() => createSignal(readStoredChoice(ENGINES_STORAGE_KEY, [
	"auto",
	"1",
	"2"
], "auto")));
function engineOptions() {
	const count = widgetEngineCount();
	return {
		suspend: widgetSuspend(),
		engines: count === "auto" ? "auto" : +count
	};
}
function canShareMemory() {
	return typeof SharedArrayBuffer !== "undefined" && !!self.crossOriginIsolated;
}
/** The transport a widget started now gets. */
function resolveWidgetTransport(choice = widgetTransport()) {
	if (choice === "sab") return canShareMemory() ? "sab" : "frame";
	if (choice === "frame" || choice === "inline") return choice;
	return typeof Worker !== "undefined" ? "worker" : "inline";
}
/** The UI language as a BCP 47 tag (`navigator.language` and the Intl default inside the widget). */
function getWidgetLocale() {
	const code = langPack_default.getLastRequestedLangCode() || "en";
	try {
		return Intl.getCanonicalLocales(code.replace(/_/g, "-"))[0];
	} catch {
		return code.split(/[-_]/)[0];
	}
}
/** QuickJS is WebAssembly; that is all the sandbox needs from the browser now. */
function isWidgetSandboxSupported() {
	return IS_WEB_ASSEMBLY_SUPPORTED;
}
var runtimePromise;
function loadWidgetRuntime() {
	return runtimePromise ?? (runtimePromise = Promise.all([
		__vitePreload(() => import("./widget-host-C3y2l8XZ.js"), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11])),
		__vitePreload(() => import("./engine-client-CTcFsvrw.js"), __vite__mapDeps([4,3])),
		__vitePreload(() => import("./inline-engine-B3BQc13q.js"), __vite__mapDeps([8,9,2,3,6,7])),
		__vitePreload(() => import("./worker-pool-BxRQ_2fj.js"), __vite__mapDeps([12,2,3,6])),
		__vitePreload(() => import("./iframe-renderer-BXXFMzxx.js"), __vite__mapDeps([5,2])),
		__vitePreload(() => import("./shadow-renderer-_et1p-EL.js"), __vite__mapDeps([10,2,11,6,7])),
		__vitePreload(() => import("./emoji-DoM3TRja.js"), __vite__mapDeps([13,14,15,16,17,18]))
	]).then(([{ WidgetHost }, { reserveEngine, setEngineOptions }, { prepareInlineVM }, { WorkerPool }, { IframeRenderer }, { ShadowDomRenderer, setClientEmoji }, { splitWidgetEmoji }]) => {
		setClientEmoji(splitWidgetEmoji);
		const options = engineOptions();
		if (options.suspend !== "auto" || options.engines !== "auto") setEngineOptions(options);
		const factories = {
			iframe: IframeRenderer.factory,
			shadow: ShadowDomRenderer.factory
		};
		let pool;
		return {
			createHost: (container, html, { renderer, transport, engine, ...options }) => {
				const syncTransport = resolveWidgetTransport(transport);
				return new WidgetHost(container, html, {
					...options,
					features: FEATURES,
					syncTransport,
					...syncTransport === "inline" && { inlineVM: engine },
					...syncTransport === "worker" && { engineSlot: engine },
					...syncTransport === "sab" && {
						rendererFactory: factories[renderer],
						workerPool: pool ?? (pool = new WorkerPool(POOL_SIZE))
					}
				});
			},
			prepare: (transport) => {
				if (transport === "worker") return reserveEngine();
				return transport === "inline" ? prepareInlineVM() : Promise.resolve(void 0);
			}
		};
	}).catch((err) => {
		runtimePromise = void 0;
		throw err;
	}));
}
var liveWidgets = /* @__PURE__ */ new Set();
/**
* Parks the widgets hidden the longest while more than MAX_LIVE_WIDGETS keep an engine. One the chat has not yet
* reported on (just inserted) is never parked: it may be the one on screen.
*/
function checkLiveWidgets() {
	if (liveWidgets.size <= MAX_LIVE_WIDGETS) return;
	const parkable = [...liveWidgets].filter((widget) => widget.visible === false).sort((a, b) => a.lastVisibleAt - b.lastVisibleAt);
	while (liveWidgets.size > MAX_LIVE_WIDGETS && parkable.length) {
		const widget = parkable.shift();
		liveWidgets.delete(widget);
		widget.park();
	}
}
/** Counts a running widget against MAX_LIVE_WIDGETS; returns the unregister. */
function registerLiveWidget(widget) {
	liveWidgets.add(widget);
	checkLiveWidgets();
	return () => {
		liveWidgets.delete(widget);
	};
}
//#endregion
//#region src/lib/widgetSandbox/publicData.ts
/** By account and `widget_id`. */
var polls = /* @__PURE__ */ new Map();
/** A carrier the poll can go through: active, and of a message the server knows (not one being sent). */
var canPollThrough = (carrier) => carrier.active && Number.isInteger(carrier.mid);
var getDelay = (poll) => Math.max(0, poll.nextAt - Date.now());
/**
* The next poll of a widget, when one of its carriers is active. With none left at all, its record outlives them while
* a poll is out or until the next one would go, so a chat reopened meanwhile neither asks again early nor asks twice.
*/
function schedule(key, poll) {
	clearTimeout(poll.timer);
	poll.timer = void 0;
	if (!poll.carriers.size) {
		if (!poll.inFlight) poll.timer = window.setTimeout(() => polls.get(key) === poll && polls.delete(key), getDelay(poll));
		return;
	}
	if (![...poll.carriers].find(canPollThrough) || poll.inFlight) return;
	poll.nextAt || (poll.nextAt = Date.now() + 3e4);
	poll.timer = window.setTimeout(() => run(key, poll), getDelay(poll));
}
function run(key, poll) {
	poll.timer = void 0;
	const carrier = [...poll.carriers].find(canPollThrough);
	if (!carrier || polls.get(key) !== poll) return;
	poll.inFlight = true;
	const carriers = [...poll.carriers].map(({ peerId, mid }) => ({
		peerId,
		mid
	}));
	carrier.managers.appWidgetsManager.pollWidgetPublicData(carrier.peerId, carrier.mid, carriers).then((nextAt) => {
		poll.nextAt = nextAt;
	}, () => {
		poll.nextAt = Date.now() + 3e4;
	}).finally(() => {
		poll.inFlight = false;
		if (polls.get(key) === poll) schedule(key, poll);
	});
}
/**
* Counts the widget of a message among the carriers of `widgetId`; `setActive` says whether it watches and is on screen
* now. A widget is first polled the default period after its first carrier became active.
*/
function trackWidgetCarrier(widgetId, carrier) {
	const key = `${getManagersSession(carrier.managers).accountNumber}_${widgetId}`;
	let poll = polls.get(key);
	if (!poll) polls.set(key, poll = {
		carriers: /* @__PURE__ */ new Set(),
		nextAt: 0,
		inFlight: false
	});
	const tracked = {
		...carrier,
		active: false
	};
	poll.carriers.add(tracked);
	schedule(key, poll);
	return {
		setActive(active) {
			if (tracked.active === active) return;
			tracked.active = active;
			schedule(key, poll);
		},
		dispose() {
			poll.carriers.delete(tracked);
			schedule(key, poll);
		}
	};
}
//#endregion
//#region src/lib/widgetSandbox/theme.ts
/**
* The chat's palette for a widget (docs/sdk-v1.md §2.3, §2.4): the colours of the bubble it sits in, as the bubble
* resolves them — incoming or outgoing, the chat's own theme, night mode — so read from an element inside it. Every
* key is `#rrggbb`; a translucent colour is laid over the bubble. Its text tokens are a message's text: the chat's
* text size, its line height and its inset in the bubble.
*/
/** Each key from the first custom property the element resolves; a bubble remaps the generic ones to its own. */
var SOURCES = [
	["bg_color", ["--message-background-color", "--surface-color"]],
	["text_color", ["--primary-text-color"]],
	["hint_color", ["--secondary-text-color"]],
	["link_color", ["--link-color", "--primary-color"]],
	["button_color", ["--primary-color"]],
	["accent_text_color", ["--primary-color"]],
	["subtitle_text_color", ["--secondary-text-color"]],
	["destructive_text_color", ["--danger-color"]],
	["section_header_text_color", ["--primary-color"]],
	["section_separator_color", ["--border-color"]]
];
/** The bubble's second surface (a quote, an inline button): its accent this strong over its background. */
var SECONDARY_SURFACE_WEIGHT = .1;
var context;
var chatThemeWatches = /* @__PURE__ */ new WeakMap();
/**
* Calls `onChange` whenever the chat `element` sits in applies its theme variables to itself: its own theme, night
* mode — which a chat does once its wallpaper is drawn, after `theme_changed`, so a palette read then is the old
* one. Returns what stops it; nothing outside a chat. One observer per chat, however many widgets it has.
*/
function watchChatTheme(element, onChange) {
	const chat = element.closest(".chat");
	if (!chat) return;
	let watch = chatThemeWatches.get(chat);
	if (!watch) {
		const listeners = /* @__PURE__ */ new Set();
		const observer = new MutationObserver(() => listeners.forEach((listener) => listener()));
		observer.observe(chat, {
			attributes: true,
			attributeFilter: ["style"]
		});
		chatThemeWatches.set(chat, watch = {
			observer,
			listeners
		});
	}
	watch.listeners.add(onChange);
	return () => {
		watch.listeners.delete(onChange);
		if (watch.listeners.size) return;
		watch.observer.disconnect();
		chatThemeWatches.delete(chat);
	};
}
/** Any CSS colour as RGBA, by letting a canvas parse it; undefined for what is not a colour. */
function parseColor(value) {
	if (!value) return;
	context ?? (context = document.createElement("canvas").getContext("2d"));
	const probe = "#010203";
	context.fillStyle = probe;
	context.fillStyle = value;
	const parsed = context.fillStyle;
	if (parsed === probe && value.toLowerCase() !== probe) return;
	if (parsed[0] === "#") return [...hexToRgb(parsed), 1];
	const scale = parsed.startsWith("color(") ? 255 : 1;
	const match = parsed.match(/[\d.]+/g);
	return match && [
		Math.round(+match[0] * scale),
		Math.round(+match[1] * scale),
		Math.round(+match[2] * scale),
		match[3] === void 0 ? 1 : +match[3]
	];
}
/** The buttons read off a probe (getButtonTokens), by what they depend on: few kinds per chat, many widgets. */
var buttonTokens = /* @__PURE__ */ new Map();
var MAX_BUTTON_TOKENS = 32;
var px = (value) => {
	const number = parseFloat(value);
	return Number.isFinite(number) ? +number.toFixed(2) + "px" : void 0;
};
/**
* The client's own button where the widget is (docs/sdk-v1.md §2.4): the one a rich message has in its rows of buttons
* (`.PageButton`, its default look), read off one put in the widget's place — the bubble decides its colours (a tint of
* the accent in an outgoing one, a shade in an incoming one) — with its height, rounding, padding and font (that of the
* message's text, in the generic family the widget's grammar takes). `key` is what the colours and sizes depend on.
*/
function getButtonTokens(element, key, toHex) {
	let tokens = buttonTokens.get(key);
	if (tokens) return tokens;
	const row = document.createElement("div");
	row.className = classNames(...getPageButtonRowClasses());
	row.style.cssText = "--iv-scale:1;font-size:var(--messages-text-size);line-height:var(--line-height);position:absolute;visibility:hidden;pointer-events:none;";
	const probe = document.createElement("button");
	probe.className = classNames(...getPageButtonClasses());
	row.append(probe);
	element.append(row);
	const style = getComputedStyle(probe);
	const color = (value) => {
		const parsed = parseColor(value);
		return parsed && toHex(parsed);
	};
	const lineHeight = px(style.lineHeight);
	tokens = {
		bg: color(style.backgroundColor),
		text: color(style.color),
		radius: px(style.borderTopLeftRadius),
		font: `${style.fontWeight} ${px(style.fontSize)}${lineHeight ? "/" + lineHeight : ""} system-ui, sans-serif`,
		padding: [
			style.paddingTop,
			style.paddingRight,
			style.paddingBottom,
			style.paddingLeft
		].map(px).join(" "),
		height: px(style.minHeight)
	};
	row.remove();
	if (buttonTokens.size >= MAX_BUTTON_TOKENS) buttonTokens.clear();
	buttonTokens.set(key, tokens);
	return tokens;
}
function getWidgetTheme(element, colorScheme) {
	const style = getComputedStyle(element);
	const resolve = (properties) => {
		for (const property of properties) {
			const color = parseColor(style.getPropertyValue(property).trim());
			if (color) return color;
		}
	};
	const background = resolve(SOURCES[0][1]);
	const backgroundRgb = background && background.slice(0, 3);
	const toHex = (color) => {
		const rgb = color[3] < 1 && backgroundRgb ? rgbaToRgb(color, backgroundRgb) : color.slice(0, 3);
		return rgbaToHexa(rgb);
	};
	const params = {};
	for (const [key, properties] of SOURCES) {
		const color = resolve(properties);
		if (color) params[key] = toHex(color);
	}
	if (params.bg_color) params.section_bg_color = params.header_bg_color = params.bottom_bar_bg_color = params.bg_color;
	params.button_text_color = "#ffffff";
	const accent = resolve(["--primary-color"]);
	if (accent && backgroundRgb) params.secondary_bg_color = rgbaToHexa(mixColors(accent.slice(0, 3), backgroundRgb, SECONDARY_SURFACE_WEIGHT));
	const number = (property) => parseFloat(style.getPropertyValue(property)) || void 0;
	const text = {
		fontSize: number("--messages-text-size"),
		lineHeight: number("--line-height"),
		padding: style.getPropertyValue("--widget-text-padding").trim() || void 0
	};
	return {
		colorScheme,
		params,
		button: getButtonTokens(element, [
			!!element.closest(".bubble.is-in"),
			params.bg_color,
			params.text_color,
			params.button_color,
			text.fontSize,
			text.lineHeight,
			document.documentElement.className
		].join(), toHex),
		text
	};
}
//#endregion
//#region src/lib/widgetSandbox/safeArea.ts
/**
* The content safe area (widget-sandbox docs/sdk-v1.md §2.17, §5.12): a widget with no caption below it has the
* message's time drawn over its bottom corner, as a photo has, and is told the band and the corner the time takes, so
* that it keeps what is tapped out from under it.
*/
var NO_CONTENT_SAFE_AREA = {
	top: 0,
	right: 0,
	bottom: 0,
	left: 0,
	cornerLeft: 0,
	cornerRight: 0
};
/** The most the widget takes (the framework's range: a value past it would count as none). */
var MAX_INSET = 64;
var MAX_CORNER = 200;
/**
* Where `element` is laid out in `ancestor` (from its padding edge), by the offsets, which no transform moves: the
* chat scales while it opens and moves a bubble's attachment while an edit changes it (bubbleTransitions). Undefined
* when `ancestor` is not on the element's offset chain.
*/
function layoutBox(element, ancestor) {
	let left = 0, top = 0;
	let node = element;
	while (node && node !== ancestor) {
		left += node.offsetLeft;
		top += node.offsetTop;
		const parent = node.offsetParent;
		if (parent && parent !== ancestor) {
			left += parent.clientLeft;
			top += parent.clientTop;
		}
		node = parent;
	}
	if (node !== ancestor) return;
	return {
		left,
		top,
		right: left + element.offsetWidth,
		bottom: top + element.offsetHeight
	};
}
/**
* The band and the corner `time` takes over `block`, as both are laid out: the band is the time's backing with its
* margin above and below it, the corner its width with its margin on both sides, on the interface's side (the right
* left to right, the left right to left). The chat's floating time stands as far from the bottom edge as from the side
* (`.time.is-floating`), so the margin is read from the side: the bottom edge it stands on may be another element's
* (a channel post's comments footer, which lifts it over itself and which the staged copy of the bubble has not got),
* and before the widget has drawn the block may have no height yet. None when the time is below the block (a caption's
* line) or not there.
*/
function measureContentSafeArea(block, time, rtl) {
	const ancestor = time?.isConnected && block.isConnected && time.offsetParent;
	if (!ancestor || !time.offsetWidth || !time.offsetHeight) return NO_CONTENT_SAFE_AREA;
	const area = layoutBox(block, ancestor);
	const rect = layoutBox(time, ancestor);
	if (!area || !rect) return NO_CONTENT_SAFE_AREA;
	const side = rtl ? rect.left - area.left : area.right - rect.right;
	if (rect.bottom > area.bottom + 1 || side < -1 || side > (area.right - area.left) / 2) return NO_CONTENT_SAFE_AREA;
	const margin = Math.max(0, side);
	const bottom = Math.min(MAX_INSET, time.offsetHeight + 2 * margin);
	const corner = Math.min(MAX_CORNER, time.offsetWidth + 2 * margin);
	return {
		...NO_CONTENT_SAFE_AREA,
		bottom,
		[rtl ? "cornerLeft" : "cornerRight"]: corner
	};
}
var widgetBlock_module_default = {
	Widget: "_Widget_1n3n5_16",
	IsWaiting: "_IsWaiting_1n3n5_27",
	Frame: "_Frame_1n3n5_31",
	IsStarting: "_IsStarting_1n3n5_34",
	IsFixedHeight: "_IsFixedHeight_1n3n5_46",
	Placeholder: "_Placeholder_1n3n5_54",
	Preloader: "_Preloader_1n3n5_68",
	PlaceholderIcon: "_PlaceholderIcon_1n3n5_74",
	PlaceholderTitle: "_PlaceholderTitle_1n3n5_79",
	PlaceholderText: "_PlaceholderText_1n3n5_83",
	Button: "_Button_1n3n5_88",
	Slot: "_Slot_1n3n5_94",
	IsPreview: "_IsPreview_1n3n5_101"
};
//#endregion
//#region src/components/widgetSandbox/widgetBlock.tsx
var widgetBlock_exports = /* @__PURE__ */ __exportAll({ default: () => WidgetBlock });
var _tmpl$ = /*#__PURE__*/ template(`<div>`);
/** A widget that died this many times in a row stays stopped until the app restarts or its HTML changes (D22). */
var MAX_CRASHES = 2;
/** How long a widget in a chat waits after `theme_changed` for the chat to apply its colours (watchChatTheme). */
var CHAT_THEME_WAIT_MS = 1e3;
/** Deaths in a row per widget, kept across re-renders of its bubble. */
var crashes = /* @__PURE__ */ new Map();
var OWN_EVENTS = [
	"pointerdown",
	"mousedown",
	"click",
	"dblclick"
];
/**
* Where the widget's frame sits in its block, and what says when the block enters the document: the moment a
* widget started off screen moves in (its first task done, its height known), or an `inline` one runs. Entering
* another window's document later (the client moving into Document Picture-in-Picture) moves the renderers' frames
* and observers there.
*/
var WidgetSlotElement = class extends HTMLElement {
	connectedCallback() {
		this.onConnect?.();
	}
};
var SLOT_TAG = "tweb-widget-slot";
if (!customElements.get(SLOT_TAG)) customElements.define(SLOT_TAG, WidgetSlotElement);
/**
* A promise the chat's bubble batch waits on that runs `start` only then: by the time the chat waits for a bubble's
* media the bubble is complete, and the classes that set its width (the share button beside a channel post, the
* side it is on) come after the widget is made.
*/
function startWhenAwaited(start) {
	let started;
	const run = () => started ?? (started = start());
	return {
		then: (onFulfilled, onRejected) => run().then(onFulfilled, onRejected),
		catch: (onRejected) => run().catch(onRejected),
		finally: (onFinally) => run().finally(onFinally),
		[Symbol.toStringTag]: "Promise"
	};
}
/**
* How near the screen a widget that waits (`lazy`) starts: within a screen above or below what its scroller shows (a
* vertical rootMargin percentage is of the root's height in Chromium, Firefox and WebKit alike).
*/
var NEAR_MARGIN = "100% 0px";
/** One observer per scroller, for every widget waiting in it. */
var nearObservers = /* @__PURE__ */ new WeakMap();
/**
* Calls `callback` once, when `element` comes within NEAR_MARGIN of what `root` shows (the viewport, without one);
* returns what stops the wait.
*/
function whenNear(element, root, callback) {
	const key = root ?? element.ownerDocument.documentElement;
	let entry = nearObservers.get(key);
	if (!entry) {
		const callbacks = /* @__PURE__ */ new Map();
		const observer = new (element.ownerDocument.defaultView ?? window).IntersectionObserver((entries) => {
			for (const { target, isIntersecting } of entries) {
				const fn = isIntersecting && callbacks.get(target);
				if (!fn) continue;
				callbacks.delete(target);
				observer.unobserve(target);
				fn();
			}
		}, {
			root,
			rootMargin: NEAR_MARGIN
		});
		nearObservers.set(key, entry = {
			observer,
			callbacks
		});
	}
	const { observer, callbacks } = entry;
	callbacks.set(element, callback);
	observer.observe(element);
	return () => {
		if (callbacks.delete(element)) observer.unobserve(element);
	};
}
/**
* An HTML widget (`messageMediaWidget`): the widget's script in QuickJS, its DOM validated before it reaches the
* renderer. The engine runs off the page's thread (the `worker` transport) and the widget runs its first task while
* its bubble is built, in a hidden copy of the bubble at its width (staging.ts): the chat waits for that
* (`loadPromises`), and the widget's frame moves into the bubble as the bubble enters, so the chat lays the bubble out,
* and keeps its scroll, with the widget's content already in it, and nothing moves after. A widget that starts again
* (shown after it was parked, new HTML) starts hidden over its picture and takes its place once it has drawn. It pauses
* with the chat's other animations (out of view, another chat, a hidden tab), takes the colours of the bubble it sits
* in, and keeps only its picture when too many widgets are alive. A bubble that goes in out of sight (`lazy`) waits for
* nothing: its widget keeps the place it is known to take and starts as it comes near the screen.
*/
function WidgetBlock(props) {
	let element;
	/** The widget on screen, and its frame in the slot. */
	let host;
	let frame;
	/** A widget starting off screen (`worker`), until it takes the place of what is on screen. */
	let next;
	/** The widget starting off screen is dropped. */
	const dropNext = () => {
		next?.host.destroy();
		next?.stage.dispose();
		next = void 0;
	};
	let unregisterLive;
	/** What ends the message selection's hold a press of the widget started (selection.holdOn): a frame's release. */
	let releaseHold;
	/**
	* The hold ends with the press, or with the widget on screen that took it: one that goes (gone, parked, dead, another
	* in its place) says nothing of the press any more, and a finger's touchend goes to what is gone.
	*/
	const endHold = () => {
		releaseHold?.();
		releaseHold = void 0;
	};
	let disposed = false;
	/** The block has been in the document. */
	let entered = false;
	const whenEntered = [];
	/** Bumped by every (re)start: a preparation that comes back for an older one is dropped. */
	let generation = 0;
	const [state, setState] = createSignal("idle");
	const [inView, setInView] = createSignal(true);
	/** The widget on screen watches its shared state (`watchPublicData`). */
	const [watching, setWatching] = createSignal(false);
	const preview = untrack(() => props.context?.preview);
	/**
	* The renderer arbitrates the widget's presses: a widget that runs. A placeholder, a stopped or a parked picture is
	* plain bubble (and a preview, whose presses are its result's).
	*/
	const ownsInput = () => !preview && state() === "running";
	const widgetKey = untrack(() => props.widgetKey);
	const [height, setHeight] = createSignal(getRememberedWidgetHeight(widgetKey));
	const supported = isWidgetSandboxSupported();
	const fixedHeight = () => getWidgetFixedHeight(props.height);
	/**
	* What each host was given last of a kind (as JSON), so that the same again is not sent; `send` sends a change and
	* `remember` notes what a host was made with.
	*/
	const sendChanged = (send) => {
		const sent = /* @__PURE__ */ new WeakMap();
		return {
			send: (target, value) => {
				const json = JSON.stringify(value);
				if (sent.get(target) === json) return;
				sent.set(target, json);
				send(target, value);
			},
			remember: (target, value) => sent.set(target, JSON.stringify(value))
		};
	};
	const theme = (from = element) => getWidgetTheme(from, themeController.isNight() ? "dark" : "light");
	const themes = sendChanged((target, value) => target.setTheme(value));
	const applyTheme = (target, from) => themes.send(target, theme(from));
	const showsPlaceholder = () => !supported || state() === "waiting" || state() === "starting" || state() === "crashed" || state() === "failed";
	/** The band and the corner the time takes over the block, as laid out in the document (none before it is there). */
	const measureSafeArea = () => measureContentSafeArea(element, untrack(() => props.timeOver?.()), langPack_default.getIsRTL());
	const safeAreas = sendChanged((target, area) => target.setContentSafeArea(area));
	const applySafeArea = safeAreas.send;
	/**
	* Only with the bubble's layout: the time widened ("edited", views), the language turned the corner's side. A widget
	* still in the copy of its bubble measures the copy's time; nothing is measured while the block is out of the
	* document (what was given stands).
	*/
	const updateSafeArea = () => {
		if (host && element.isConnected) applySafeArea(host, measureSafeArea());
		if (!next) return;
		const { stage } = next;
		if (stage.overlay) applySafeArea(next.host, measureContentSafeArea(stage.container, stage.overlay, langPack_default.getIsRTL()));
		else if (element.isConnected) applySafeArea(next.host, measureSafeArea());
	};
	const slot = document.createElement(SLOT_TAG);
	slot.className = classNames(widgetBlock_module_default.Slot, preview && widgetBlock_module_default.IsPreview);
	if (preview) slot.inert = true;
	else OWN_EVENTS.forEach((type) => slot.addEventListener(type, (e) => {
		if (untrack(ownsInput)) e.stopPropagation();
	}));
	slot.addEventListener("contextmenu", (e) => {
		e.preventDefault();
		if (getWidgetClaim(element)?.hold) e.stopPropagation();
	});
	slot.onConnect = () => {
		if (entered) {
			host?.rebind();
			next?.host.rebind();
			return;
		}
		entered = true;
		for (const fn of whenEntered.splice(0)) try {
			fn();
		} catch (err) {
			console.error("[widget] failed to start", err);
			setState("failed");
		}
		if (!host && untrack(state) === "idle" && generation) setState("starting");
	};
	const onEntered = (fn) => entered ? fn() : whenEntered.push(fn);
	/** Marks the bubble complete (the chat is waiting for its media); without a chat to wait, it is complete now. */
	let markComplete;
	const bubbleComplete = new Promise((resolve) => markComplete = resolve);
	const crashCount = () => {
		const entry = crashes.get(widgetKey);
		return entry?.html === props.html ? entry.count : 0;
	};
	/** A run that ends without dying — parked, or its bubble gone — breaks the row of deaths (D22: "in a row"). */
	const endRun = () => {
		if (untrack(state) === "running" && untrack(crashCount)) crashes.delete(widgetKey);
	};
	const live = {
		visible: void 0,
		lastVisibleAt: 0,
		park: () => {
			unregisterLive = void 0;
			if (state() === "stopped") return;
			endRun();
			endHold();
			host?.suspend();
			props.storage?.flush();
			setState("parked");
		}
	};
	const playback = {
		paused: false,
		autoplay: true,
		loop: true,
		pause: () => {
			playback.paused = true;
			live.visible = false;
			setInView(false);
			host?.setVisible(false);
			props.storage?.flush();
			checkLiveWidgets();
		},
		play: () => {
			playback.paused = false;
			live.visible = true;
			live.lastVisibleAt = Date.now();
			setInView(true);
			host?.setVisible(true);
		},
		remove: noop
	};
	/**
	* A height change keeps what is on screen in place: on screen the edge the widget chose (`setResizeAnchor`,
	* docs/integration.md "Bubble sizing"), above the screen the bottom one, next to what is on screen — read before the
	* new height lays the block out, the scroll corrected after by as much as the edge has moved (the chat's scroller does
	* not anchor its content by itself; one that does has moved it back already). The top edge on screen, and anything
	* below the screen, moves nothing on screen.
	*/
	const measureBlock = () => {
		const scrollable = props.scrollable ?? props.chat?.bubbles?.scrollable;
		if (!scrollable || !element.isConnected) return;
		return {
			scrollable,
			view: (props.scrollable ? scrollable.container : props.chat.bubblesViewport ?? scrollable.container).getBoundingClientRect(),
			rect: element.getBoundingClientRect()
		};
	};
	const getAnchoredEdge = (measured, anchor) => {
		if (!measured) return;
		const { scrollable, view, rect } = measured;
		if (rect.bottom > view.top && (anchor !== "bottom" || rect.top >= view.bottom)) return;
		return {
			scrollable,
			bottom: rect.bottom
		};
	};
	const readAnchoredEdge = (anchor) => getAnchoredEdge(measureBlock(), anchor);
	const keepAnchoredEdge = (edge) => {
		if (!edge) return;
		const moved = element.getBoundingClientRect().bottom - edge.bottom;
		if (Math.abs(moved) >= .5) edge.scrollable.setScrollPositionSilently(edge.scrollable.scrollPosition + moved);
	};
	let anchoredEdge;
	const prepare = async () => {
		const runtime = await loadWidgetRuntime();
		const transport = resolveWidgetTransport(untrack(widgetTransport));
		const [storage, engine] = await Promise.all([props.storage?.load(), runtime.prepare(transport)]);
		return {
			runtime,
			storage,
			transport,
			engine
		};
	};
	const createFrame = () => {
		const div = document.createElement("div");
		div.className = widgetBlock_module_default.Frame;
		return div;
	};
	/** Creates a host into `container`, which takes the colours of `themeFrom`; `safeArea`: what is drawn over it. */
	const createHost = ({ runtime, storage, transport, engine }, container, themeFrom, safeArea, events) => {
		const html = untrack(() => props.html);
		const ref = {};
		const initialTheme = untrack(() => theme(themeFrom));
		const created = ref.host = runtime.createHost(container, html, {
			theme: initialTheme,
			contentSafeArea: safeArea,
			locale: getWidgetLocale(),
			storage,
			renderer: untrack(widgetRendererKind),
			transport,
			engine,
			visible: live.visible !== false,
			stoppedLabel: langPack_default.format("Widget.Stopped", true),
			data: untrack(() => props.data),
			context: props.context,
			onRequest: props.onRequest,
			onWallet: props.onWallet,
			onCopyText: props.onCopyText,
			onWatchPublicData: (on) => {
				if (ref.host === host) setWatching(on);
			},
			onBeforeResize: (_, anchor) => {
				if ((ref.host === host || !host && entered) && !untrack(fixedHeight)) anchoredEdge = readAnchoredEdge(anchor);
			},
			onResize: (value) => {
				if (!untrack(fixedHeight)) {
					rememberWidgetHeight(widgetKey, value, props.layout?.());
					setHeight(value);
				}
				keepAnchoredEdge(anchoredEdge);
				anchoredEdge = void 0;
				props.onLayout?.(element);
			},
			onLoaded: () => events.onLoaded(),
			onDead: (reason) => {
				if (Modes.debug) console.warn("[widget] stopped:", reason);
				crashes.set(widgetKey, {
					html,
					count: untrack(crashCount) + 1
				});
				if (ref.host && ref.host === host) {
					endHold();
					unregisterLive?.();
					unregisterLive = void 0;
					setState("stopped");
				}
				events.onDead();
			},
			onAction: handleWidgetAction,
			onStorageCommit: (area, values) => {
				props.storage?.commit(area, values);
				if (!untrack(inView) || document.hidden) props.storage?.flush();
			},
			onGestureClaim: (claim) => setWidgetClaim(element, claim),
			bubbleGestures: !preview && { rtl: langPack_default.getIsRTL() },
			onBubbleGesture: (taken) => {
				props.onBubbleGesture?.(taken);
				const { gesture, x, y } = taken;
				const bubble = element.closest(".bubble");
				if (gesture === "hold") {
					releaseHold = bubble && props.chat?.selection.holdOn(bubble);
					return;
				}
				const frame = created.element;
				if (gesture !== "menu-click" || !(frame instanceof HTMLIFrameElement)) return;
				const rect = frame.getBoundingClientRect();
				frame.dispatchEvent(new MouseEvent("contextmenu", {
					bubbles: true,
					cancelable: true,
					clientX: rect.left + x,
					clientY: rect.top + y
				}));
			},
			onRelease: () => {
				if (created.element instanceof HTMLIFrameElement) endHold();
			},
			hitTestable: (x, y) => {
				const staged = next?.host === ref.host ? next : void 0;
				const unreveal = staged?.stage.reveal();
				const unreach = reachPoint(ref.host?.element ?? container.firstElementChild, x, y, staged?.stage.mover ?? element.closest(".bubble") ?? element);
				return () => {
					unreach();
					unreveal?.();
				};
			},
			onLog: Modes.debug ? (level, text) => console.log(`[widget] ${level}:`, text) : void 0,
			onDiag: Modes.debug ? (kind, detail) => console.log(`[widget] ${kind}:`, detail) : void 0
		});
		themes.remember(created, initialTheme);
		safeAreas.remember(created, safeArea);
		const label = langPack_default.format("Widget.Title", true);
		const rendered = created.element;
		if (rendered instanceof HTMLIFrameElement) {
			rendered.title = label;
			let loads = 0;
			rendered.addEventListener("load", () => {
				if (++loads > 1 && host?.element === rendered) restart();
			});
		} else rendered.setAttribute("aria-label", label);
		return created;
	};
	/**
	* Puts `newHost` on screen in `newFrame`, in the place of what was there, in one task; `before`: the block as it was
	* before `newFrame` went into it beside what was there (a widget starting in its place).
	*/
	const show = (newHost, newFrame, alive, before) => {
		const replaced = host;
		if (frame !== newFrame) {
			const edge = replaced && !untrack(fixedHeight) ? getAnchoredEdge(before ?? measureBlock(), newHost.resizeAnchor) : void 0;
			const moved = newFrame.parentElement !== slot;
			slot.append(newFrame);
			frame?.remove();
			frame = newFrame;
			if (moved) newHost.rebind();
			keepAnchoredEdge(edge);
		}
		host = newHost;
		setWatching(newHost.watchesPublicData);
		if (replaced && replaced !== newHost) {
			endHold();
			replaced.destroy();
		}
		if (live.visible !== void 0) newHost.setVisible(live.visible);
		unregisterLive?.();
		unregisterLive = alive ? registerLiveWidget(live) : void 0;
	};
	/** `inline` and the debug transports: the widget starts in its place (`inline`: drawing in the call). */
	const startInPlace = (prepared) => {
		const before = host && !untrack(fixedHeight) ? measureBlock() : void 0;
		const newFrame = createFrame();
		slot.append(newFrame);
		let synchronous = true, loaded = false, died = false;
		const created = createHost(prepared, newFrame, element, measureSafeArea(), {
			onLoaded: () => {
				loaded = true;
				if (!synchronous && created === host && untrack(state) === "starting") setState("running");
			},
			onDead: () => died = true
		});
		synchronous = false;
		setState(died ? "stopped" : loaded ? "running" : "starting");
		show(created, newFrame, !died, before);
	};
	/**
	* `worker`: the widget starts off screen — before its bubble is in the chat in a copy of the bubble, else hidden
	* over its picture — and takes the place of what is on screen once it has drawn its first task. Resolves then.
	* `superseded`: the start is let go (another one, the block gone, its bubble out of sight).
	*/
	const startOffScreen = async (prepared, current, superseded) => {
		if (!entered) await bubbleComplete;
		if (disposed || current !== generation) return;
		const overlay = untrack(() => props.timeOver?.());
		const stage = (!entered && props.chat ? await stageInChat(props.chat, element, overlay, superseded) : void 0) ?? (entered ? stageInBlock(element) : void 0);
		if (disposed || current !== generation) return stage?.dispose();
		if (!stage) return new Promise((resolve) => onEntered(() => {
			if (!disposed && current === generation) startOffScreen(prepared, current, superseded).then(resolve, resolve);
			else resolve();
		}));
		const newFrame = createFrame();
		stage.container.append(newFrame);
		const safeArea = stage.overlay ? measureContentSafeArea(stage.container, stage.overlay, langPack_default.getIsRTL()) : entered ? measureSafeArea() : NO_CONTENT_SAFE_AREA;
		return new Promise((resolve) => {
			let alive = true, placing = false;
			const take = () => {
				resolve();
				if (placing || disposed || current !== generation || next?.frame !== newFrame) return;
				placing = true;
				onEntered(() => {
					if (disposed || current !== generation || next?.frame !== newFrame) return;
					next = void 0;
					setState(alive ? "running" : "stopped");
					show(created, newFrame, alive);
					stage.dispose();
				});
			};
			const created = createHost(prepared, newFrame, stage.container, safeArea, {
				onLoaded: () => {
					if (next?.frame === newFrame) next.loaded = true;
					take();
				},
				onDead: () => {
					alive = false;
					take();
				}
			});
			dropNext();
			next = {
				host: created,
				frame: newFrame,
				stage,
				loaded: false
			};
			onEntered(() => {
				if (next?.frame === newFrame && !next.loaded && !host && untrack(state) === "idle") setState("starting");
			});
		});
	};
	const unmount = () => {
		endRun();
		endHold();
		unregisterLive?.();
		unregisterLive = void 0;
		host?.destroy();
		host = void 0;
		dropNext();
		props.storage?.flush();
	};
	/** Prepares a start and runs it; resolves when the widget has drawn (`worker`) or can draw without waiting. */
	/**
	* The latest start (a restart takes the place of the one before), and what lets go of the one before: a start whose
	* host was dropped may never settle.
	*/
	let starting, supersede;
	const start = () => {
		const current = ++generation;
		supersede?.();
		const superseded = new Promise((resolve) => supersede = resolve);
		return starting = Promise.race([superseded, prepare().then((prepared) => {
			if (disposed || current !== generation) return;
			if (prepared.transport === "worker") return startOffScreen(prepared, current, superseded);
			onEntered(() => {
				if (!disposed && current === generation) startInPlace(prepared);
			});
		}, (err) => {
			if (disposed || current !== generation) return;
			console.error("[widget] failed to load the sandbox", err);
			setState("failed");
		})]);
	};
	/** A new widget from the HTML, over the current one (which stays on screen until the new one has drawn). */
	const restart = () => {
		props.storage?.flush();
		start();
	};
	/** A waiting widget (`lazy`) starts: it has come near the screen. */
	let stopWaiting;
	const startWaiting = () => {
		stopWaiting?.();
		stopWaiting = void 0;
		if (disposed || untrack(state) !== "waiting") return;
		setState("starting");
		start();
	};
	/** Keeps its place until it comes near the screen, then starts. */
	const wait = () => {
		setState("waiting");
		onEntered(() => {
			if (disposed || untrack(state) !== "waiting") return;
			stopWaiting = whenNear(element, (props.scrollable ?? props.chat?.bubbles?.scrollable)?.container, startWaiting);
		});
	};
	let stopWatchingSight;
	if (supported && crashCount() >= MAX_CRASHES) {
		setState("crashed");
		markComplete();
	} else if (supported) {
		if (untrack(() => props.lazy)) {
			markComplete();
			wait();
		} else if (props.loadPromises) {
			start();
			let release;
			const released = new Promise((resolve) => release = resolve);
			stopWatchingSight = untrack(() => props.whenOutOfSight)?.(() => {
				stopWatchingSight = void 0;
				if (disposed || entered || next?.loaded) return;
				++generation;
				supersede?.();
				dropNext();
				wait();
				release();
			});
			const untilStarted = () => {
				const current = starting;
				return current.then(() => current === starting ? void 0 : untilStarted());
			};
			props.loadPromises.push(startWhenAwaited(() => {
				markComplete();
				return Promise.race([untilStarted(), released]).then(noop, noop);
			}));
		} else {
			markComplete();
			start();
		}
	} else markComplete();
	createEffect(() => element.toggleAttribute(WIDGET_ATTRIBUTE, ownsInput()));
	createEffect(on(() => props.data, (data) => {
		host?.setData(data);
		next?.host.setData(data);
	}, { defer: true }));
	createEffect(on(langPack_default.isRTL, (rtl) => {
		queueMicrotask(updateSafeArea);
		if (preview) return;
		host?.setBubbleGestures({ rtl });
		next?.host.setBubbleGestures({ rtl });
	}, { defer: true }));
	let timeObserver;
	onEntered(() => {
		const time = untrack(() => props.timeOver?.());
		if (!time || disposed) return;
		timeObserver = new (element.ownerDocument.defaultView ?? window).ResizeObserver(updateSafeArea);
		timeObserver.observe(time);
	});
	const publicData = untrack(() => props.publicData);
	if (publicData && supported) {
		const carrier = trackWidgetCarrier(publicData.widgetId, publicData);
		createEffect(() => carrier.setActive(watching() && inView() && state() === "running"));
		onCleanup(() => carrier.dispose());
	}
	const selection = props.chat?.selection;
	if (selection) {
		const onSelecting = (selecting) => element.inert = selecting;
		onMount(() => onSelecting(selection.isSelecting));
		selection.addEventListener("toggle", onSelecting);
		onCleanup(() => selection.removeEventListener("toggle", onSelecting));
	}
	onMount(() => {
		if (!supported) return;
		const group = props.chat?.animationGroup || "";
		animationIntersector.addAnimation({
			animation: playback,
			group,
			observeElement: element,
			controlled: true,
			type: "widget"
		});
		if (animationIntersector.isGroupHeld(group)) playback.pause();
	});
	createEffect(on(inView, (visible) => {
		if (!visible) return;
		if (state() === "waiting") startWaiting();
		else if (state() === "parked" || state() === "stopped" && crashCount() < MAX_CRASHES) restart();
	}, { defer: true }));
	createEffect(on(() => props.html, () => {
		if (state() !== "waiting" && (state() !== "idle" || generation)) restart();
	}, { defer: true }));
	createEffect(on([
		widgetRendererKind,
		widgetTransport,
		widgetSuspend,
		widgetEngineCount
	], () => {
		if (host) restart();
	}, { defer: true }));
	const applyThemes = () => {
		clearTimeout(themeFallback);
		if (host) applyTheme(host);
		if (next) applyTheme(next.host, next.stage.container);
	};
	let unwatchChatTheme, themeFallback;
	const onThemeChanged = () => {
		if (!unwatchChatTheme) return applyThemes();
		clearTimeout(themeFallback);
		themeFallback = window.setTimeout(applyThemes, CHAT_THEME_WAIT_MS);
	};
	rootScope.addEventListener("theme_changed", onThemeChanged);
	const chatContainer = props.chat?.container;
	if (chatContainer) unwatchChatTheme = watchChatTheme(chatContainer, applyThemes);
	else onEntered(() => unwatchChatTheme = watchChatTheme(element, applyThemes));
	const onSettingsUpdated = ({ key }) => {
		if (key === "settings.messagesTextSize") applyThemes();
	};
	rootScope.addEventListener("settings_updated", onSettingsUpdated);
	onCleanup(() => {
		disposed = true;
		supersede?.();
		stopWaiting?.();
		stopWatchingSight?.();
		slot.onConnect = void 0;
		whenEntered.length = 0;
		rootScope.removeEventListener("theme_changed", onThemeChanged);
		rootScope.removeEventListener("settings_updated", onSettingsUpdated);
		unwatchChatTheme?.();
		timeObserver?.disconnect();
		clearTimeout(themeFallback);
		animationIntersector.removeAnimationByPlayer(playback);
		unmount();
	});
	return (() => {
		var _el$ = _tmpl$();
		var _ref$ = element;
		typeof _ref$ === "function" ? use(_ref$, _el$) : element = _el$;
		insert(_el$, slot, null);
		insert(_el$, createComponent(Show, {
			get when() {
				return showsPlaceholder();
			},
			get children() {
				var _el$2 = _tmpl$();
				insert(_el$2, createComponent(Show, {
					get when() {
						return state() === "starting";
					},
					get children() {
						return createComponent(PreloaderTsx, { get ["class"]() {
							return widgetBlock_module_default.Preloader;
						} });
					}
				}), null);
				insert(_el$2, createComponent(Show, {
					get when() {
						return !supported || state() === "crashed" || state() === "failed";
					},
					get children() {
						return [
							createComponent(IconTsx, {
								icon: "apps",
								get ["class"]() {
									return widgetBlock_module_default.PlaceholderIcon;
								}
							}),
							(() => {
								var _el$3 = _tmpl$();
								insert(_el$3, () => i18n("Widget.Title"));
								createRenderEffect(() => className(_el$3, widgetBlock_module_default.PlaceholderTitle));
								return _el$3;
							})(),
							(() => {
								var _el$4 = _tmpl$();
								insert(_el$4, () => i18n(!supported ? "Widget.Unsupported" : state() === "crashed" ? "Widget.Stopped" : "Widget.Failed"));
								createRenderEffect(() => className(_el$4, widgetBlock_module_default.PlaceholderText));
								return _el$4;
							})(),
							createComponent(Show, {
								get when() {
									return supported && state() === "failed";
								},
								get children() {
									return createComponent(A11yButton, {
										ripple: true,
										get ["class"]() {
											return classNames(...getPageButtonClasses("primary"), "rp-overflow", widgetBlock_module_default.Button);
										},
										onClick: restart,
										get children() {
											return i18n("Widget.Restart");
										}
									});
								}
							})
						];
					}
				}), null);
				createRenderEffect(() => className(_el$2, widgetBlock_module_default.Placeholder));
				return _el$2;
			}
		}), null);
		createRenderEffect((_p$) => {
			var _v$ = classNames(widgetBlock_module_default.Widget, fixedHeight() && widgetBlock_module_default.IsFixedHeight, !fixedHeight() && showsPlaceholder() && widgetBlock_module_default.IsWaiting, state() === "starting" && widgetBlock_module_default.IsStarting, props.class), _v$2 = state() === "starting" ? "true" : void 0, _v$3 = props.width ? `min(100%, ${Math.max(props.width, 200)}px)` : void 0, _v$4 = fixedHeight() ? fixedHeight() + "px" : void 0, _v$5 = height() ? height() + "px" : void 0;
			_v$ !== _p$.e && className(_el$, _p$.e = _v$);
			_v$2 !== _p$.t && setAttribute(_el$, "aria-busy", _p$.t = _v$2);
			_v$3 !== _p$.a && setStyleProperty(_el$, "width", _p$.a = _v$3);
			_v$4 !== _p$.o && setStyleProperty(_el$, "height", _p$.o = _v$4);
			_v$5 !== _p$.i && setStyleProperty(_el$, "--widget-height", _p$.i = _v$5);
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
//#endregion
export { WidgetBlock as default, suspendKind as n, widgetBlock_exports as t };
