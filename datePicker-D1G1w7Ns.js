//# allFunctionsCalledOnLoad
import { t as Icon } from "./icon-DbP6Es97.js";
import { _ as limitSymbols } from "./objectUrlUtils-5x08MNuO.js";
import { n as rootScope } from "./rootScope-CZS0lmz8.js";
import { a as i18n, p as setDirection, u as langPack_default } from "./langPack-BmdJGr44.js";
import { C as createSignal, M as onCleanup, N as onMount, _ as createMemo, d as batch, g as createEffect, i as For, p as createComponent, s as Show, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { _ as use, c as insert, g as template, o as className, p as setStyleProperty, s as delegateEvents } from "./web-BPyQozky.js";
import { n as mediaSizes } from "./mediaSizes-C1MTaleW.js";
import { u as wrapRichText } from "./renderer-L80wjxct.js";
import { t as classNames } from "./classNames-DxGDjmvw.js";
import { t as ListenerSetter } from "./listenerSetter-BER6qAXn.js";
import { i as createPopup, n as PopupElement } from "./indexTsx-v9mB9bAq.js";
import { a as wrapSticker, b as wrapMediaSpoiler, o as createMiddleware } from "./sticker-5twBOy1Y.js";
import { t as choosePhotoSize } from "./choosePhotoSize-VRMYg-1A.js";
import { t as replaceContent } from "./replaceContent-Bi6ru3li.js";
import { B as formatTime, M as earliestSelectableMinuteMs } from "./index-B7axFZql.js";
import { Q as getRichMessagePreviewMedia, X as wrapMessageForReply, lt as getTodoItemReplyPreview, vn as wrapPhoto, zt as isMessageSensitive } from "./confirmationPopup-Bz6mK0o-.js";
import { At as compareUint8Arrays } from "./getChatMigratedTo-ChhMNXuu.js";
import { n as wrapEmojiText } from "./wrapEmojiText-DT39R5Tj.js";
import { C as ButtonIconTsx, c as smoothScrollBehavior } from "./openEditors-7FmA7q_V.js";
import { n as wrapVideo } from "./video-ByfiTxvV.js";
import { n as padTime, t as createTimeInputs } from "./timeInputs-D49SN0XZ.js";
import { n as getReplyQuote } from "./richQuote-DW_AtdAH.js";
var styles_module_default = {
	Container: "_Container_66c8g_1",
	Caption: "_Caption_66c8g_5",
	center: "_center_66c8g_10"
};
//#endregion
//#region src/components/divAndCaption.ts
var DivAndCaption = class {
	constructor(className, fill) {
		this.className = className;
		this.fill = fill;
		this.container = document.createElement("div");
		this.container.className = className;
		this.border = document.createElement("div");
		this.border.classList.add(className + "-border");
		this.content = document.createElement("div");
		this.content.classList.add(className + "-content");
		this.title = document.createElement("div");
		this.title.classList.add(className + "-title");
		setDirection(this.title);
		this.subtitle = document.createElement("div");
		this.subtitle.classList.add(className + "-subtitle");
		setDirection(this.subtitle);
		this.content.append(this.title, this.subtitle);
		this.container.append(this.border, this.content);
	}
};
//#endregion
//#region src/components/chat/replyContainer.ts
var MEDIA_SIZE = 32;
/**
* Render a small thumbnail of the media attached to a message (or story item)
* into `mediaEl`. Handles photos, videos (via thumbs), stickers, gifs, and
* round videos. Returns `{setMedia, isRound}` describing whether anything was
* inserted and whether it should be drawn as a circle.
*
* Extracted from `wrapReplyDivAndCaption` so the same render can be reused
* outside of reply-style previews (e.g. day cells in the date-picker calendar).
*/
async function wrapReplyMedia({ message, storyItem, replyHeader, mediaEl, size = MEDIA_SIZE, isSensitive, middleware, lazyLoadQueue, loadPromises, animationGroup }) {
	loadPromises ?? (loadPromises = []);
	let messageMedia = storyItem?.media || message?.media || replyHeader?._ === "messageReplyHeader" && replyHeader.reply_media || getRichMessagePreviewMedia(message?.rich_message);
	if (messageMedia?._ === "messageMediaStory") {
		storyItem = messageMedia.story;
		messageMedia = storyItem?.media;
	}
	let setMedia = false, isRound = false;
	if (!messageMedia || !mediaEl || messageMedia.ttl_seconds) return {
		setMedia,
		isRound
	};
	messageMedia = messageMedia.webpage || messageMedia;
	const photo = messageMedia.photo;
	const document = messageMedia.document;
	const spoiler = messageMedia?.pFlags?.spoiler;
	if (!photo && !(document && document.thumbs?.length)) return {
		setMedia,
		isRound
	};
	if (document?.type === "sticker") {
		await wrapSticker({
			doc: document,
			div: mediaEl,
			lazyLoadQueue: lazyLoadQueue || void 0,
			group: animationGroup,
			width: size,
			height: size,
			middleware,
			loadPromises
		});
		setMedia = true;
	} else if (document?.type === "gif" && document.video_thumbs) {
		setMedia = true;
		await wrapVideo({
			doc: document,
			container: mediaEl,
			boxWidth: size,
			boxHeight: size,
			lazyLoadQueue: lazyLoadQueue || void 0,
			noPlayButton: true,
			noInfo: true,
			middleware,
			loadPromises,
			withoutPreloader: true,
			videoSize: document.video_thumbs[0],
			group: animationGroup
		});
	} else {
		const m = photo || document;
		isRound = document?.type === "round";
		try {
			await wrapPhoto({
				photo: m,
				container: mediaEl,
				boxWidth: size,
				boxHeight: size,
				size: choosePhotoSize(m, size, size),
				middleware,
				lazyLoadQueue,
				noBlur: true,
				withoutPreloader: true,
				loadPromises
			});
			if (spoiler || isSensitive) {
				const spoilerEl = await wrapMediaSpoiler({
					media: m,
					width: size,
					height: size,
					multiply: .1,
					middleware,
					animationGroup
				});
				mediaEl.append(spoilerEl);
			}
			setMedia = true;
		} catch (err) {}
	}
	return {
		setMedia,
		isRound
	};
}
async function wrapReplyDivAndCaption(options) {
	options.loadPromises || (options.loadPromises = []);
	const { titleEl, subtitleEl, mediaEl, message, loadPromises, animationGroup, middleware, lazyLoadQueue, replyHeader } = options;
	let { storyItem, quote } = options;
	if (titleEl) setDirection(titleEl);
	if (subtitleEl) setDirection(subtitleEl);
	let quoteIcon;
	let wrappedTitle = options.title;
	if (wrappedTitle !== void 0) {
		if (typeof wrappedTitle === "string") {
			wrappedTitle = limitSymbols(wrappedTitle, 140);
			wrappedTitle = wrapEmojiText(wrappedTitle);
		}
		replaceContent(titleEl, wrappedTitle);
	} else if (options.isStoryExpired) {
		const icon = Icon("bomb_filled", "expired-story-icon");
		titleEl.append(icon, i18n("ExpiredStory"));
	}
	const isMessageReply = replyHeader?._ === "messageReplyHeader";
	const replyQuote = isMessageReply && getReplyQuote(replyHeader);
	if (replyQuote) quote ?? (quote = {
		text: replyQuote.text,
		entities: replyQuote.entities
	});
	if (isMessageReply && replyHeader.poll_option && message?._ === "message" && message.media?._ === "messageMediaPoll") {
		const pollOption = message.media.poll.answers.find((answer) => answer._ === "pollAnswer" && compareUint8Arrays(replyHeader.poll_option, answer.option));
		if (pollOption) {
			quoteIcon = Icon("checkround_filled", "inline-icon", "inline-icon-left");
			quote ?? (quote = {
				text: pollOption.text.text,
				entities: pollOption.text.entities
			});
		}
	}
	if (isMessageReply && replyHeader.todo_item_id !== void 0 && message?._ === "message" && message.media?._ === "messageMediaToDo") {
		const todoItemPreview = getTodoItemReplyPreview(message.media, replyHeader.todo_item_id);
		if (todoItemPreview) {
			quoteIcon = Icon(todoItemPreview.icon, "inline-icon", "inline-icon-left");
			quote ?? (quote = todoItemPreview.text);
		}
	}
	const mediaChildren = mediaEl ? Array.from(mediaEl.children).slice() : [];
	const { setMedia, isRound } = await wrapReplyMedia({
		message,
		storyItem,
		replyHeader,
		mediaEl,
		isSensitive: options.isSensitive,
		middleware,
		lazyLoadQueue,
		loadPromises,
		animationGroup
	});
	if (options.subtitle !== void 0) {
		let wrappedSubtitle = options.subtitle;
		if (typeof wrappedSubtitle === "string") {
			wrappedSubtitle = limitSymbols(wrappedSubtitle, 140);
			wrappedSubtitle = wrapEmojiText(wrappedSubtitle);
		}
		replaceContent(subtitleEl, wrappedSubtitle || "");
	} else if (storyItem && options.storyItem) subtitleEl.replaceChildren(i18n("Story"));
	else if (options.isStoryExpired) {
		const icon = Icon("bomb_filled", "expired-story-icon");
		subtitleEl.replaceChildren(icon, i18n("ExpiredStory"));
	} else if (quote) {
		const fragment = wrapRichText(limitSymbols(quote.text, 200), {
			...options,
			noLinebreaks: true,
			entities: quote.entities,
			noLinks: true
		});
		subtitleEl.replaceChildren(...[quoteIcon, fragment].filter(Boolean));
	} else if (message) {
		const fragment = await wrapMessageForReply({
			...options,
			withoutMessageIcon: setMedia
		});
		subtitleEl.replaceChildren(fragment);
	}
	Promise.all(loadPromises).then(() => {
		if (middleware && !middleware()) return;
		mediaChildren.forEach((child) => child.remove());
		if (mediaEl) mediaEl.classList.toggle("is-round", isRound);
	});
	return setMedia;
}
var ReplyContainer = class extends DivAndCaption {
	constructor(className) {
		super(className, async (options) => {
			if (!this.mediaEl) {
				this.mediaEl = document.createElement("div");
				this.mediaEl.classList.add(this.className + "-media");
			}
			const isMediaSet = await wrapReplyDivAndCaption({
				...options,
				isSensitive: options.isChatSensitive || options.message && isMessageSensitive(options.message),
				titleEl: this.title,
				subtitleEl: this.subtitle,
				mediaEl: this.mediaEl
			});
			if (options.isStoryExpired) this.container.classList.add("is-expired-story");
			this.container.classList.toggle("is-media", isMediaSet);
			if (isMediaSet) this.content.prepend(this.mediaEl);
			else this.mediaEl.remove();
		});
		this.className = className;
	}
};
//#endregion
//#region src/components/popups/datePicker.tsx
var _tmpl$ = /*#__PURE__*/ template(`<div class=date-picker-month-title>`);
var _tmpl$2 = /*#__PURE__*/ template(`<div class=date-picker-controls>`);
var _tmpl$3 = /*#__PURE__*/ template(`<div class=date-picker-months>`);
var _tmpl$4 = /*#__PURE__*/ template(`<div class=date-picker-time><div class=date-picker-time-delimiter>:`);
var _tmpl$5 = /*#__PURE__*/ template(`<div>`);
var _tmpl$6 = /*#__PURE__*/ template(`<div class=date-picker-month-section><div class=date-picker-month-label></div><div class=date-picker-weekdays></div><div class=date-picker-month-grid>`);
var _tmpl$7 = /*#__PURE__*/ template(`<div class=date-picker-spacer>`);
var _tmpl$8 = /*#__PURE__*/ template(`<button><span class=date-picker-day-num>`);
var _tmpl$9 = /*#__PURE__*/ template(`<div class=date-picker-cell-photo>`);
var MILLIS_IN_MINUTE = 6e4;
var CELL_HEIGHT = 40;
var ROW_GAP = 4;
var SCROLL_BUFFER_PX = 200;
var getMaxScheduleDate = () => {
	const date = /* @__PURE__ */ new Date();
	date.setFullYear(date.getFullYear() + 1);
	date.setDate(date.getDate() - 1);
	return date;
};
var checkDate = (date, addMinutes) => {
	const ret = date.getTime() > getMaxScheduleDate().getTime() ? /* @__PURE__ */ new Date() : date;
	if (addMinutes) ret.setMinutes(ret.getMinutes() + addMinutes);
	return ret;
};
var monthKey = (d) => `${d.getFullYear()}-${d.getMonth()}`;
var dayKey = (d) => `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
var dayKeyFromTimestamp = (ts) => {
	return dayKey(new Date(ts));
};
var weekendDaysCache;
function getWeekendDays() {
	if (weekendDaysCache) return weekendDaysCache;
	try {
		const langCode = langPack_default.getLastRequestedLangCode?.() || "en";
		const locale = new Intl.Locale(langCode);
		const info = typeof locale.getWeekInfo === "function" ? locale.getWeekInfo() : locale.weekInfo;
		if (info && Array.isArray(info.weekend)) {
			weekendDaysCache = new Set(info.weekend.map((d) => d % 7));
			return weekendDaysCache;
		}
	} catch {}
	weekendDaysCache = /* @__PURE__ */ new Set([0, 6]);
	return weekendDaysCache;
}
var isWeekend = (date) => getWeekendDays().has(date.getDay());
var DATE_PICKER_POPUP_KIND = Symbol("date-picker-popup");
function showDatePickerPopup(opts) {
	const minDate = opts.minDate || /* @__PURE__ */ new Date("2013-08-01T00:00:00");
	minDate.setHours(0, 0, 0, 0);
	const maxDate = opts.maxDate || (opts.withTime ? getMaxScheduleDate() : /* @__PURE__ */ new Date());
	maxDate.setHours(0, 0, 0, 0);
	const initDate = checkDate(opts.initDate, opts.addMinutes ? 10 : void 0);
	if (initDate < minDate) initDate.setFullYear(minDate.getFullYear(), minDate.getMonth(), minDate.getDate());
	if (opts.minTimeDate) {
		const minInit = earliestSelectableMinuteMs(opts.minTimeDate.getTime(), Date.now());
		if (initDate.getTime() < minInit) initDate.setTime(minInit);
	}
	const initHours = initDate.getHours();
	const initMinutes = initDate.getMinutes();
	initDate.setHours(0, 0, 0, 0);
	function Inner() {
		const listenerSetter = new ListenerSetter();
		const [selectedDate, setSelectedDate] = createSignal(initDate);
		const [selectionStart, setSelectionStart] = createSignal(null);
		const [selectionEnd, setSelectionEnd] = createSignal(null);
		const [multiSelectActive, setMultiSelectActive] = createSignal(!!opts.multiSelect);
		const showMultiSelectToggle = !!(opts.canMultiSelect || opts.onPickRange || opts.multiSelectAction);
		function toggleMultiSelect() {
			batch(() => {
				const next = !multiSelectActive();
				setMultiSelectActive(next);
				setSelectionStart(null);
				setSelectionEnd(null);
			});
		}
		const [scrollTop, setScrollTop] = createSignal(0);
		const [viewportHeight, setViewportHeight] = createSignal(0);
		const [mediaByDay, setMediaByDay] = createSignal(/* @__PURE__ */ new Map());
		const requestedMonths = /* @__PURE__ */ new Set();
		let scrollableContextRef;
		let scrollableHostRef;
		let didInitialScroll = false;
		const minMonth = new Date(minDate);
		minMonth.setDate(1);
		minMonth.setHours(0, 0, 0, 0);
		const maxMonth = new Date(maxDate);
		maxMonth.setDate(1);
		maxMonth.setHours(0, 0, 0, 0);
		const timeInputs = opts.withTime ? createTimeInputs({
			listenerSetter,
			hours: initHours,
			minutes: initMinutes
		}) : void 0;
		const hoursValue = () => timeInputs?.hours() ?? padTime(initHours);
		const minutesValue = () => timeInputs?.minutes() ?? padTime(initMinutes);
		const monthSections = (() => {
			const list = [];
			const cursor = new Date(minMonth);
			let runningOffset = 0;
			while (cursor <= maxMonth) {
				const cells = buildMonthCells(cursor);
				const rows = Math.ceil(cells.length / 7);
				const height = 80 + rows * CELL_HEIGHT + Math.max(0, rows - 1) * ROW_GAP;
				list.push({
					date: new Date(cursor),
					key: monthKey(cursor),
					cells,
					rows,
					height,
					offset: runningOffset
				});
				runningOffset += height;
				cursor.setMonth(cursor.getMonth() + 1);
			}
			return list;
		})();
		function buildMonthCells(month) {
			const cells = [];
			const firstDate = new Date(month);
			firstDate.setHours(0, 0, 0, 0);
			const monthKeyStr = monthKey(firstDate);
			let leading = firstDate.getDay() - 1;
			if (leading === -1) leading = 6;
			for (let i = 0; i < leading; ++i) cells.push({
				kind: "spacer",
				key: `${monthKeyStr}-pre-${i}`
			});
			const dayCursor = new Date(firstDate);
			do {
				cells.push({
					kind: "day",
					date: new Date(dayCursor),
					timestamp: dayCursor.getTime(),
					disabled: dayCursor < minDate || dayCursor > maxDate
				});
				dayCursor.setDate(dayCursor.getDate() + 1);
			} while (dayCursor.getDate() !== 1);
			const remainder = cells.length % 7;
			if (remainder) for (let i = remainder; i < 7; ++i) cells.push({
				kind: "spacer",
				key: `${monthKeyStr}-post-${i}`
			});
			return cells;
		}
		const totalHeight = monthSections.length ? monthSections[monthSections.length - 1].offset + monthSections[monthSections.length - 1].height : 0;
		const initialMonthIndex = Math.max(0, monthSections.findIndex((m) => m.key === monthKey(initDate)));
		const visibleSections = createMemo(() => {
			const top = scrollTop();
			const bottom = top + Math.max(viewportHeight(), 240);
			const result = [];
			for (const section of monthSections) {
				if (section.offset + section.height < top - SCROLL_BUFFER_PX) continue;
				if (section.offset > bottom + SCROLL_BUFFER_PX) break;
				result.push(section);
			}
			return result;
		});
		const topMostSection = createMemo(() => {
			if (!monthSections.length) return void 0;
			const top = scrollTop();
			const vh = viewportHeight();
			const probe = vh > 0 ? top + vh / 2 : top + 1;
			for (const m of monthSections) if (m.offset + m.height > probe) return m;
			return monthSections[monthSections.length - 1];
		});
		const isPrevDisabled = createMemo(() => {
			const top = topMostSection();
			return !top || top.key === monthSections[0]?.key;
		});
		const isNextDisabled = createMemo(() => {
			const top = topMostSection();
			return !top || top.key === monthSections[monthSections.length - 1]?.key;
		});
		function scrollToSection(section, smooth = true) {
			if (!scrollableHostRef) return;
			scrollableHostRef.scrollTo({
				top: section.offset,
				behavior: smooth ? smoothScrollBehavior() : "auto"
			});
		}
		function onPrev() {
			const top = topMostSection();
			if (!top) return;
			const idx = monthSections.indexOf(top);
			if (idx > 0) scrollToSection(monthSections[idx - 1]);
		}
		function onNext() {
			const top = topMostSection();
			if (!top) return;
			const idx = monthSections.indexOf(top);
			if (idx < monthSections.length - 1) scrollToSection(monthSections[idx + 1]);
		}
		async function fetchMonthMedia(section) {
			if (!opts.peerId) return;
			if (requestedMonths.has(section.key)) return;
			requestedMonths.add(section.key);
			const lastDay = new Date(section.date);
			lastDay.setMonth(lastDay.getMonth() + 1);
			lastDay.setDate(0);
			lastDay.setHours(23, 59, 59, 999);
			try {
				const result = await rootScope.managers.appMessagesManager.getSearchResultsCalendar({
					peerId: opts.peerId,
					threadId: opts.threadId,
					filter: { _: opts.mediaFilter || "inputMessagesFilterPhotoVideo" },
					offsetDate: Math.floor(lastDay.getTime() / 1e3)
				});
				if (!result.messages?.length) return;
				const next = new Map(mediaByDay());
				let added = 0;
				for (const message of result.messages) {
					if (message._ !== "message") continue;
					if (!message.media) continue;
					const key = dayKeyFromTimestamp(message.date * 1e3);
					if (!next.has(key)) {
						next.set(key, message);
						++added;
					}
				}
				if (added) setMediaByDay(next);
			} catch (err) {
				requestedMonths.delete(section.key);
			}
		}
		createEffect(() => {
			if (!opts.peerId) return;
			const sections = visibleSections();
			for (const section of sections) if (!requestedMonths.has(section.key)) fetchMonthMedia(section);
		});
		const selectedDayCount = createMemo(() => {
			const start = selectionStart();
			if (!start) return 0;
			const end = selectionEnd();
			if (!end) return 1;
			const ms = end.getTime() - start.getTime();
			return Math.round(ms / 864e5) + 1;
		});
		const monthTitleEl = createMemo(() => {
			if (multiSelectActive() && selectedDayCount() > 0) return i18n("Calendar.SelectedDays", [selectedDayCount()]);
			const section = topMostSection();
			const date = section ? section.date : initDate;
			return new langPack_default.IntlDateElement({
				date,
				options: {
					year: "numeric",
					month: opts.withTime && mediaSizes.isMobile ? "short" : "long"
				}
			}).element;
		});
		const weekdayInfo = (() => {
			const cursor = /* @__PURE__ */ new Date();
			const day = cursor.getDay();
			if (day !== 1) cursor.setHours(-24 * (day - 1));
			const out = [];
			for (let i = 0; i < 7; ++i) {
				out.push({
					name: new langPack_default.IntlDateElement({
						date: cursor,
						options: { weekday: "narrow" }
					}).element.textContent,
					weekend: isWeekend(cursor)
				});
				cursor.setDate(cursor.getDate() + 1);
			}
			return out;
		})();
		const confirmColor = createMemo(() => {
			if (multiSelectActive() && opts.multiSelectAction?.isDanger) return "danger";
			return "primary";
		});
		const confirmLabel = createMemo(() => {
			if (multiSelectActive() && opts.multiSelectAction) return i18n(opts.multiSelectAction.langKey);
			if (opts.btnConfirmLangKey) return i18n(opts.btnConfirmLangKey);
			if (multiSelectActive() && selectedDayCount() > 0) return i18n("Calendar.SelectedDays", [selectedDayCount()]);
			if (!opts.withTime) return i18n("JumpToDate");
			let key;
			const args = [];
			const today = /* @__PURE__ */ new Date();
			today.setHours(0, 0, 0, 0);
			const sendDate = new Date(selectedDate().getTime());
			sendDate.setHours(+hoursValue() || 0, +minutesValue() || 0);
			if (selectedDate().getTime() === today.getTime()) key = opts.sendTodayLangKey ?? "Schedule.SendToday";
			else {
				key = opts.sendDateLangKey ?? "Schedule.SendDate";
				const dateOptions = {
					month: "short",
					day: "numeric"
				};
				if (sendDate.getFullYear() !== today.getFullYear()) dateOptions.year = "numeric";
				args.push(new langPack_default.IntlDateElement({
					date: sendDate,
					options: dateOptions
				}).element);
			}
			args.push(new langPack_default.IntlDateElement({
				date: sendDate,
				options: {
					minute: "2-digit",
					hour: "2-digit"
				}
			}).element);
			return i18n(key, args);
		});
		const [nowMinute, setNowMinute] = createSignal(Math.floor(Date.now() / MILLIS_IN_MINUTE));
		if (opts.minTimeDate) {
			const interval = setInterval(() => {
				const minute = Math.floor(Date.now() / MILLIS_IN_MINUTE);
				if (minute !== nowMinute()) setNowMinute(minute);
			}, 1e3);
			onCleanup(() => clearInterval(interval));
		}
		const effectiveMinTime = createMemo(() => {
			nowMinute();
			return opts.minTimeDate ? new Date(earliestSelectableMinuteMs(opts.minTimeDate.getTime(), Date.now())) : /* @__PURE__ */ new Date();
		});
		const isConfirmDisabled = createMemo(() => {
			if (multiSelectActive()) {
				if (opts.onPickRange) return !selectionStart() || !selectionEnd();
				return !selectionStart();
			}
			if (!opts.minTimeDate) return false;
			const minTime = effectiveMinTime();
			const sendDate = new Date(selectedDate().getTime());
			sendDate.setHours(+hoursValue() || 0, +minutesValue() || 0);
			return sendDate < /* @__PURE__ */ new Date() || (sendDate.valueOf() / MILLIS_IN_MINUTE | 0) < (minTime.valueOf() / MILLIS_IN_MINUTE | 0);
		});
		const isMinTimeCaptionVisible = createMemo(() => {
			if (!opts.minTimeDate) return true;
			const minTime = effectiveMinTime();
			const sendDate = new Date(selectedDate().getTime());
			sendDate.setHours(+hoursValue() || 0, +minutesValue() || 0);
			return sendDate.getDate() === minTime.getDate();
		});
		function onCellClick(cell) {
			if (cell.kind !== "day") return;
			if (cell.disabled) return;
			if (multiSelectActive()) {
				batch(() => {
					const start = selectionStart();
					const end = selectionEnd();
					if (!start || start && end) {
						setSelectionStart(cell.date);
						setSelectionEnd(null);
					} else if (cell.date < start) {
						setSelectionStart(cell.date);
						setSelectionEnd(start);
					} else setSelectionEnd(cell.date);
					setSelectedDate(cell.date);
				});
				return;
			}
			setSelectedDate(cell.date);
		}
		async function onConfirm() {
			if (multiSelectActive()) {
				const start = selectionStart();
				if (!start) return;
				if (opts.multiSelectAction) {
					const end = selectionEnd() || start;
					const from = new Date(start);
					from.setHours(0, 0, 0, 0);
					const to = new Date(end);
					to.setHours(23, 59, 59, 999);
					await opts.multiSelectAction.callback(from.getTime() / 1e3 | 0, to.getTime() / 1e3 | 0);
					return;
				}
				if (opts.onPickRange) {
					const end = selectionEnd();
					if (!end) return;
					const from = new Date(start);
					from.setHours(0, 0, 0, 0);
					const to = new Date(end);
					to.setHours(23, 59, 59, 999);
					return opts.onPickRange(from.getTime() / 1e3 | 0, to.getTime() / 1e3 | 0);
				}
				return opts.onPick(start.getTime() / 1e3 | 0);
			}
			const date = new Date(selectedDate());
			if (opts.withTime) date.setHours(+hoursValue() || 0, +minutesValue() || 0, 0, 0);
			opts.onPick(date.getTime() / 1e3 | 0);
		}
		function onDanger() {
			opts.onPick(void 0);
		}
		const onScroll = () => {
			if (!scrollableContextRef) return;
			setScrollTop(scrollableContextRef.scrollPosition);
		};
		onMount(() => {
			queueMicrotask(() => {
				if (scrollableContextRef) setViewportHeight(scrollableContextRef.clientSize);
				if (!didInitialScroll && scrollableHostRef && monthSections[initialMonthIndex]) {
					didInitialScroll = true;
					scrollableHostRef.scrollTop = monthSections[initialMonthIndex].offset;
					if (scrollableContextRef) setScrollTop(scrollableContextRef.scrollPosition);
				}
			});
		});
		onCleanup(() => {
			listenerSetter.removeAll();
		});
		function isCellSelected(cell) {
			if (multiSelectActive()) {
				const start = selectionStart();
				if (!start) return false;
				if (cell.date.getTime() === start.getTime()) return true;
				const end = selectionEnd();
				if (end && cell.date.getTime() === end.getTime()) return true;
				return false;
			}
			return cell.timestamp === selectedDate().getTime();
		}
		function isCellInRange(cell) {
			if (!multiSelectActive()) return false;
			const start = selectionStart();
			const end = selectionEnd();
			if (!start || !end) return false;
			return cell.date >= start && cell.date <= end;
		}
		function isCellRangeEdgeLeft(cell, idx, cells) {
			if (!isCellInRange(cell)) return false;
			if (idx % 7 === 0) return true;
			const prev = cells[idx - 1];
			if (!prev || prev.kind !== "day") return true;
			return !isCellInRange(prev);
		}
		function isCellRangeEdgeRight(cell, idx, cells) {
			if (!isCellInRange(cell)) return false;
			if (idx % 7 === 6) return true;
			const next = cells[idx + 1];
			if (!next || next.kind !== "day") return true;
			return !isCellInRange(next);
		}
		function isCellRangeStart(cell) {
			if (!multiSelectActive()) return false;
			const start = selectionStart();
			const end = selectionEnd();
			return !!(start && end && cell.date.getTime() === start.getTime());
		}
		function isCellRangeEnd(cell) {
			if (!multiSelectActive()) return false;
			const start = selectionStart();
			const end = selectionEnd();
			return !!(start && end && cell.date.getTime() === end.getTime());
		}
		function getCellMedia(cell) {
			return mediaByDay().get(dayKey(cell.date));
		}
		return [
			createComponent(PopupElement.Header, { get children() {
				return [
					createComponent(PopupElement.CloseButton, {}),
					createComponent(PopupElement.Title, { get children() {
						var _el$ = _tmpl$();
						insert(_el$, monthTitleEl);
						return _el$;
					} }),
					(() => {
						var _el$2 = _tmpl$2();
						insert(_el$2, createComponent(Show, {
							get when() {
								return opts.headerActions;
							},
							get children() {
								return opts.headerActions();
							}
						}), null);
						insert(_el$2, createComponent(Show, {
							when: showMultiSelectToggle,
							get children() {
								return createComponent(ButtonIconTsx, {
									icon: "select",
									get ["class"]() {
										return classNames("date-picker-multiselect", "primary", multiSelectActive() && "is-active");
									},
									noRipple: true,
									get ["aria-label"]() {
										return langPack_default.format("Message.Context.Select", true);
									},
									get ["aria-pressed"]() {
										return multiSelectActive();
									},
									onClick: toggleMultiSelect
								});
							}
						}), null);
						insert(_el$2, createComponent(ButtonIconTsx, {
							icon: "up",
							get ["class"]() {
								return classNames("date-picker-prev", "primary");
							},
							get ["aria-label"]() {
								return langPack_default.format("AccDescr.PreviousMonth", true);
							},
							noRipple: true,
							get disabled() {
								return isPrevDisabled();
							},
							onClick: onPrev
						}), null);
						insert(_el$2, createComponent(ButtonIconTsx, {
							icon: "down",
							get ["class"]() {
								return classNames("date-picker-next", "primary");
							},
							get ["aria-label"]() {
								return langPack_default.format("AccDescr.NextMonth", true);
							},
							noRipple: true,
							get disabled() {
								return isNextDisabled();
							},
							onClick: onNext
						}), null);
						return _el$2;
					})()
				];
			} }),
			createComponent(PopupElement.Scrollable, {
				"class": "date-picker-scrollable",
				ref: (el) => scrollableHostRef = el,
				contextRef: (ctx) => scrollableContextRef = ctx,
				onScroll,
				get children() {
					var _el$3 = _tmpl$3();
					setStyleProperty(_el$3, "height", totalHeight + "px");
					insert(_el$3, createComponent(For, {
						get each() {
							return visibleSections();
						},
						children: (section) => (() => {
							var _el$7 = _tmpl$6(), _el$8 = _el$7.firstChild, _el$9 = _el$8.nextSibling, _el$0 = _el$9.nextSibling;
							insert(_el$8, () => new langPack_default.IntlDateElement({
								date: section.date,
								options: {
									year: "numeric",
									month: "long"
								}
							}).element);
							insert(_el$9, createComponent(For, {
								each: weekdayInfo,
								children: (info) => (() => {
									var _el$1 = _tmpl$5();
									insert(_el$1, () => info.name);
									createRenderEffect(() => className(_el$1, classNames("date-picker-weekday", info.weekend && "danger")));
									return _el$1;
								})()
							}));
							insert(_el$0, createComponent(For, {
								get each() {
									return section.cells;
								},
								children: (cell, index) => {
									if (cell.kind === "spacer") return _tmpl$7();
									const media = createMemo(() => getCellMedia(cell));
									const selected = createMemo(() => isCellSelected(cell));
									const inRange = createMemo(() => isCellInRange(cell));
									const edgeLeft = createMemo(() => isCellRangeEdgeLeft(cell, index(), section.cells));
									const edgeRight = createMemo(() => isCellRangeEdgeRight(cell, index(), section.cells));
									const rangeStart = createMemo(() => isCellRangeStart(cell));
									const rangeEnd = createMemo(() => isCellRangeEnd(cell));
									const cellWeekend = isWeekend(cell.date);
									return (() => {
										var _el$11 = _tmpl$8(), _el$12 = _el$11.firstChild;
										_el$11.$$click = () => onCellClick(cell);
										insert(_el$11, createComponent(Show, {
											get when() {
												return media();
											},
											get children() {
												return createComponent(DayMediaThumb, {
													get message() {
														return media();
													},
													size: CELL_HEIGHT
												});
											}
										}), _el$12);
										insert(_el$12, () => cell.date.getDate());
										createRenderEffect((_p$) => {
											var _v$3 = classNames("btn-icon", "date-picker-month-date", selected() && "active", inRange() && "in-range", edgeLeft() && "range-edge-left", edgeRight() && "range-edge-right", rangeStart() && "range-start", rangeEnd() && "range-end", media() && "with-media", cellWeekend && !selected() && !inRange() && "danger"), _v$4 = cell.disabled;
											_v$3 !== _p$.e && className(_el$11, _p$.e = _v$3);
											_v$4 !== _p$.t && (_el$11.disabled = _p$.t = _v$4);
											return _p$;
										}, {
											e: void 0,
											t: void 0
										});
										return _el$11;
									})();
								}
							}));
							createRenderEffect((_p$) => {
								var _v$ = `translateY(${section.offset}px)`, _v$2 = section.height + "px";
								_v$ !== _p$.e && setStyleProperty(_el$7, "transform", _p$.e = _v$);
								_v$2 !== _p$.t && setStyleProperty(_el$7, "height", _p$.t = _v$2);
								return _p$;
							}, {
								e: void 0,
								t: void 0
							});
							return _el$7;
						})()
					}));
					return _el$3;
				}
			}),
			createComponent(Show, {
				get when() {
					return opts.withTime;
				},
				get children() {
					var _el$4 = _tmpl$4(), _el$5 = _el$4.firstChild;
					insert(_el$4, () => timeInputs.hoursInputField.container, _el$5);
					insert(_el$4, () => timeInputs.minutesInputField.container, null);
					return _el$4;
				}
			}),
			createComponent(Show, {
				get when() {
					return opts.minTimeDate;
				},
				get children() {
					var _el$6 = _tmpl$5();
					insert(_el$6, () => i18n(opts.minSendDateLangKey ?? "SuggestedPosts.PublishingTime.MinSendTime", [formatTime(effectiveMinTime())]));
					createRenderEffect(() => className(_el$6, classNames(styles_module_default.Caption, styles_module_default.center, !isMinTimeCaptionVisible() && "hide")));
					return _el$6;
				}
			}),
			createComponent(Show, {
				get when() {
					return opts.bodyAfter;
				},
				get children() {
					return opts.bodyAfter();
				}
			}),
			createComponent(PopupElement.Footer, { get children() {
				return [
					createComponent(PopupElement.FooterButton, {
						get color() {
							return confirmColor();
						},
						get ["class"]() {
							return classNames(opts.btnConfirmLangKey && "text-uppercase");
						},
						get disabled() {
							return isConfirmDisabled();
						},
						callback: onConfirm,
						get children() {
							return confirmLabel();
						}
					}),
					createComponent(Show, {
						get when() {
							return opts.footerAfter;
						},
						get children() {
							return opts.footerAfter();
						}
					}),
					createComponent(Show, {
						get when() {
							return opts.btnDangerLangKey;
						},
						get children() {
							return createComponent(PopupElement.FooterButton, {
								color: "danger",
								"class": "popup-schedule-secondary text-uppercase",
								get langKey() {
									return opts.btnDangerLangKey;
								},
								callback: onDanger
							});
						}
					})
				];
			} })
		];
	}
	createPopup(() => createComponent(PopupElement, {
		"class": "popup-schedule popup-date-picker",
		closable: true,
		kind: DATE_PICKER_POPUP_KIND,
		old: true,
		get children() {
			return createComponent(Inner, {});
		}
	}));
}
function DayMediaThumb(props) {
	let containerRef;
	const middleware = createMiddleware().get();
	onMount(() => {
		wrapReplyMedia({
			message: props.message,
			mediaEl: containerRef,
			size: props.size,
			middleware
		});
	});
	return (() => {
		var _el$13 = _tmpl$9();
		use((el) => containerRef = el, _el$13);
		return _el$13;
	})();
}
delegateEvents(["click"]);
//#endregion
export { styles_module_default as i, ReplyContainer as n, wrapReplyDivAndCaption as r, showDatePickerPopup as t };
