//# allFunctionsCalledOnLoad
import { h as Modes } from "./userAgent-ByGXcznk.js";
import { n as rootScope } from "./rootScope-CZS0lmz8.js";
import { a as i18n, t as I18n } from "./langPack-BmdJGr44.js";
import { C as createSignal, M as onCleanup, N as onMount, _ as createMemo, g as createEffect, i as For, j as on, p as createComponent, s as Show, w as createUniqueId, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { n as getAppWindow, r as getOverlayRoot } from "./appWindow-bo-KtJhy.js";
import { t as clamp } from "./clamp-9UaNhw6N.js";
import { c as insert, g as template, n as Portal, o as className, r as addEventListener, u as memo } from "./web-BPyQozky.js";
import { r as PAID_REACTION_EMOJI_DOCID } from "./renderer-L80wjxct.js";
import { t as Button } from "./buttonTsx-Bwphkm9r.js";
import { t as parseEntities } from "./parseEntities-C5qsCJ5K.js";
import { t as InputField } from "./inputField-CaCo30N0.js";
import { s as cleanEmoji } from "./index-B7axFZql.js";
import { i as Row, s as CheckboxFieldTsx } from "./confirmationPopup-Bz6mK0o-.js";
import { Bt as createEmojiReaction, Rt as reactionsEqual, zt as availableReactionToReaction } from "./getChatMigratedTo-ChhMNXuu.js";
import { H as getCustomReactionsBoostReason, U as openBoosts } from "./appDialogsManager-CXguiKc3.js";
import { i as usePromiseCollector } from "./mediaHeader-CnpQNwOl.js";
import { t as anchorCallback } from "./anchorCallback-BbwAJdBk.js";
import { a as Section } from "./emailVerification-C8QYZSyu.js";
import { n as toast, r as toastNew } from "./toast-B6VD5M7R.js";
import { n as useSuperTab } from "./superTabProvider-LtveyH7W.js";
import { $t as docIdToReaction, N as getMessageEntityForEmojiWithDocId, a as EmojiTab, en as getReactionDocId, t as EmoticonsDropdown, tn as bindDisposablePicker } from "./emoticonsDropdown-Cb_qGCUN.js";
import { l as debounce } from "./pickKeys-Ckq7_h-r.js";
import { t as cloneDOMRect } from "./cloneDOMRect-DCQvg4jX.js";
import { t as attachPlainMessageEditor } from "./plainField-DIjPnqVa.js";
import { t as RadioFieldTsx } from "./radioFieldTsx-kmtuN4Dv.js";
import { t as RangeSettingSelector } from "./rangeSettingSelector-D5UJ_dJM.js";
import { n as SaveButton, t as useIsConfirmationNeededOnClose } from "./useIsConfirmationNeededOnClose-D8OTEl9F.js";
import { t as ReactionStickerPreview } from "./reactionStickerPreview-1AWURcyU.js";
//#region src/components/sidebarRight/tabs/chatReactionsState.ts
/**
* The state of the chat's Reactions screen, apart from the screen: what it opens with, how a change
* moves it, and what a save sends. A group keeps the All / Some / None choice; a channel has the
* modern editor — a master switch, an ordered list of standard and custom emoji, a maximum of
* distinct reactions per post and Stars reactions (as on Android).
*/
/** Seeded when Some is chosen with nothing picked (Android): the thumbs, else the first two active. */
var SEED_EMOTICONS = ["👍", "👎"];
function hasReaction(reactions, reaction) {
	return reactions.some((other) => reactionsEqual(other, reaction));
}
function withoutReaction(reactions, reaction) {
	return reactions.filter((other) => !reactionsEqual(other, reaction));
}
function getSeedReactions(activeEmoticons) {
	let emoticons = SEED_EMOTICONS.filter((emoticon) => activeEmoticons.includes(emoticon));
	if (!emoticons.length) emoticons = activeEmoticons.slice(0, 2);
	return emoticons.map(createEmojiReaction);
}
function initGroupDraft(available) {
	if (available?._ === "chatReactionsAll") return {
		mode: "all",
		allowCustom: !!available.pFlags?.allow_custom,
		reactions: []
	};
	if (available?._ === "chatReactionsSome" && available.reactions.length) return {
		mode: "some",
		allowCustom: false,
		reactions: available.reactions.slice()
	};
	return {
		mode: "none",
		allowCustom: false,
		reactions: []
	};
}
function setGroupMode(draft, mode, activeEmoticons) {
	if (draft.mode === mode) return draft;
	if (mode === "all") return {
		...draft,
		mode,
		allowCustom: false
	};
	if (mode === "some" && !draft.reactions.length) return {
		...draft,
		mode,
		reactions: getSeedReactions(activeEmoticons)
	};
	return {
		...draft,
		mode
	};
}
function toggleGroupReaction(draft, reaction, checked) {
	if (checked === hasReaction(draft.reactions, reaction)) return draft;
	const reactions = checked ? [...draft.reactions, reaction] : withoutReaction(draft.reactions, reaction);
	return {
		...draft,
		mode: reactions.length ? "some" : "none",
		reactions
	};
}
function buildGroupPayload(draft) {
	let reactions;
	if (draft.mode === "all") reactions = {
		_: "chatReactionsAll",
		pFlags: draft.allowCustom ? { allow_custom: true } : {}
	};
	else if (draft.mode === "some" && draft.reactions.length) reactions = {
		_: "chatReactionsSome",
		reactions: draft.reactions.slice()
	};
	else reactions = { _: "chatReactionsNone" };
	return {
		reactions,
		options: {}
	};
}
function initChannelDraft({ available, paid, limit, activeEmoticons }) {
	let reactions = [];
	if (available?._ === "chatReactionsAll") reactions = activeEmoticons.map(createEmojiReaction);
	else if (available?._ === "chatReactionsSome") reactions = available.reactions.filter((reaction) => reaction._ !== "reactionPaid");
	return {
		enabled: !!reactions.length || paid,
		reactions,
		paid,
		limit
	};
}
function setChannelEnabled(draft, enabled, activeEmoticons) {
	if (draft.enabled === enabled) return draft;
	if (enabled && !draft.reactions.length) return {
		...draft,
		enabled,
		reactions: activeEmoticons.map(createEmojiReaction)
	};
	return {
		...draft,
		enabled
	};
}
/** Puts a reaction at `index` of the free list; never twice, never past `max` */
function insertChannelReaction(draft, reaction, index, max) {
	if (reaction._ === "reactionPaid") return { draft: setChannelPaid(draft, true) };
	if (hasReaction(draft.reactions, reaction)) return {
		draft,
		refused: "duplicate"
	};
	if (draft.reactions.length >= max) return {
		draft,
		refused: "limit"
	};
	const reactions = draft.reactions.slice();
	reactions.splice(clamp(index, 0, reactions.length), 0, reaction);
	return { draft: {
		...draft,
		reactions
	} };
}
function removeChannelReactionAt(draft, index) {
	if (index < 0 || index >= draft.reactions.length) return draft;
	const reactions = draft.reactions.slice();
	reactions.splice(index, 1);
	return {
		...draft,
		reactions
	};
}
function setChannelPaid(draft, paid) {
	return draft.paid === paid ? draft : {
		...draft,
		paid
	};
}
function setChannelLimit(draft, limit) {
	return draft.limit === limit ? draft : {
		...draft,
		limit
	};
}
function countCustomReactions(reactions) {
	return reactions.reduce((count, reaction) => count + +(reaction._ === "reactionCustomEmoji"), 0);
}
/** The level a channel needs for the draft: one per custom emoji, while reactions are on */
function getRequiredBoostLevel(draft) {
	return draft.enabled ? countCustomReactions(draft.reactions) : 0;
}
function isExactlyCatalog(reactions, activeEmoticons) {
	if (reactions.length !== activeEmoticons.length) return false;
	const set = new Set(activeEmoticons);
	return reactions.every((reaction) => reaction._ === "reactionEmoji" && set.delete(reaction.emoticon));
}
function buildChannelPayload(draft, { activeEmoticons, paidShown }) {
	const options = {};
	if (paidShown) options.paidEnabled = draft.enabled && draft.paid;
	if (!draft.enabled) return {
		reactions: { _: "chatReactionsNone" },
		options
	};
	options.reactionsLimit = draft.limit;
	let reactions;
	if (!draft.reactions.length) reactions = { _: "chatReactionsNone" };
	else if (isExactlyCatalog(draft.reactions, activeEmoticons)) reactions = {
		_: "chatReactionsAll",
		pFlags: {}
	};
	else reactions = {
		_: "chatReactionsSome",
		reactions: draft.reactions.slice()
	};
	return {
		reactions,
		options
	};
}
function chatReactionsEqual(a, b) {
	if (a._ !== b._) return false;
	if (a._ === "chatReactionsAll") return !!a.pFlags?.allow_custom === !!b.pFlags?.allow_custom;
	if (a._ === "chatReactionsSome") {
		const other = b.reactions;
		return a.reactions.length === other.length && a.reactions.every((reaction, index) => reactionsEqual(reaction, other[index]));
	}
	return true;
}
function savePayloadsEqual(a, b) {
	return chatReactionsEqual(a.reactions, b.reactions) && a.options.reactionsLimit === b.options.reactionsLimit && a.options.paidEnabled === b.options.paidEnabled;
}
/**
* What a cell of the emoji picker stands for: Stars, a standard reaction (its select animation, or
* its emoji), or a custom emoji
*/
function pickedEmojiToReaction(emoji, catalog) {
	if (emoji.docId) return docIdToReaction(emoji.docId, (docId) => catalog.find((item) => item.docId === docId)?.emoticon);
	const emoticon = emoji.emoji && cleanEmoji(emoji.emoji);
	const standard = emoticon && catalog.find((item) => item.emoticon === emoticon);
	if (standard) return createEmojiReaction(standard.emoticon);
}
/** The custom emoji a reaction is drawn as, if any: Stars' own, a standard one's select animation, a custom one */
function reactionToDocId(reaction, catalog) {
	return getReactionDocId(reaction, (emoticon) => catalog.find((item) => item.emoticon === emoticon)?.docId);
}
/**
* What a token of the field's text, a new one (pasted, dropped, typed), stands for: an ACTIVE standard
* reaction (its emoji, or its select animation), a custom emoji, or Stars while their switch is shown.
* Anything else — text, an emoji that is no active reaction — stands for nothing and is dropped.
*/
function fieldTokenToReaction(token, { catalog, activeEmoticons, paidShown }) {
	if (!token.docId && !token.emoji) return;
	let reaction = pickedEmojiToReaction(token, catalog);
	if (!reaction && paidShown && !token.docId && cleanEmoji(token.emoji) === cleanEmoji("⭐")) reaction = { _: "reactionPaid" };
	if (reaction?._ === "reactionPaid") return paidShown ? reaction : void 0;
	if (reaction?._ === "reactionEmoji" && !activeEmoticons.includes(reaction.emoticon)) return;
	return reaction;
}
/** Whether a token of the field's text is how the field draws `reaction` */
function isFieldTokenOf(token, reaction) {
	switch (reaction._) {
		case "reactionPaid": return token.docId === PAID_REACTION_EMOJI_DOCID;
		case "reactionCustomEmoji": return token.docId === reaction.document_id;
		case "reactionEmoji": return !token.docId && !!token.emoji && cleanEmoji(token.emoji) === cleanEmoji(reaction.emoticon);
		default: return false;
	}
}
/** The reactions in the order the field shows them: Stars first, when on */
function getChannelFieldReactions(draft) {
	return draft.paid ? [{ _: "reactionPaid" }, ...draft.reactions] : draft.reactions;
}
/**
* The draft after an edit of the field's text (as tdesktop's field takes it): what stands where it stood
* stays, whatever it is (an inactive emoji another client set too); of what came in between them — a paste,
* a drop, an emoji typed — only reactions, each once and none already there (the first one wins), and
* no more than `max` free ones. Stars are the paid switch wherever they come in, and stand first.
* `caret` is the token the caret stands before in `tokens`; the result's is in the field's new order.
*/
function editChannelField(draft, tokens, caret, options) {
	const previous = getChannelFieldReactions(draft);
	let prefix = 0;
	while (prefix < tokens.length && prefix < previous.length && isFieldTokenOf(tokens[prefix], previous[prefix])) ++prefix;
	let suffix = 0;
	while (prefix + suffix < tokens.length && prefix + suffix < previous.length && isFieldTokenOf(tokens[tokens.length - 1 - suffix], previous[previous.length - 1 - suffix])) ++suffix;
	const kept = [...previous.slice(0, prefix), ...previous.slice(previous.length - suffix)];
	let free = countFreeReactions(kept);
	let refused;
	const inserted = [];
	let insertedBeforeCaret = 0;
	tokens.slice(prefix, tokens.length - suffix).forEach((token, index) => {
		const reaction = fieldTokenToReaction(token, options);
		if (!reaction || hasReaction(kept, reaction) || hasReaction(inserted, reaction)) return;
		if (reaction._ !== "reactionPaid") {
			if (free >= options.max) {
				refused = "limit";
				return;
			}
			++free;
		}
		inserted.push(reaction);
		if (prefix + index < caret) ++insertedBeforeCaret;
	});
	const list = [
		...previous.slice(0, prefix),
		...inserted,
		...previous.slice(previous.length - suffix)
	];
	let index = caret <= prefix ? caret : caret >= tokens.length - suffix ? caret - (tokens.length - suffix) + prefix + inserted.length : prefix + insertedBeforeCaret;
	const paidIndex = list.findIndex((reaction) => reaction._ === "reactionPaid");
	if (paidIndex > 0 && index <= paidIndex) ++index;
	const reactions = list.filter((reaction) => reaction._ !== "reactionPaid");
	const paid = paidIndex !== -1;
	return {
		draft: paid !== draft.paid || reactions.length !== draft.reactions.length || reactions.some((reaction, i) => reaction !== draft.reactions[i]) ? {
			...draft,
			reactions,
			paid
		} : draft,
		caret: clamp(index, 0, reactions.length + +paid),
		...refused && { refused }
	};
}
function countFreeReactions(reactions) {
	return reactions.reduce((count, reaction) => count + +(reaction._ !== "reactionPaid"), 0);
}
/**
* Whether typed text would become a reaction, under the rule of a paste (`fieldTokenToReaction`): it holds an emoji
* and every emoji in it is an active standard reaction. Checked before the text replaces the selection, so one
* that would be dropped afterwards never takes the selected reactions with it.
*/
function isReactionTyping(data, options) {
	if (!data) return false;
	const emojis = parseEntities(data).filter((entity) => entity._ === "messageEntityEmoji");
	return !!emojis.length && emojis.every((entity) => {
		return !!fieldTokenToReaction({ emoji: data.substr(entity.offset, entity.length) }, options);
	});
}
var chatReactionsField_module_default = {
	field: "_field_yhlnn_1",
	focused: "_focused_yhlnn_10",
	wrap: "_wrap_yhlnn_19",
	button: "_button_yhlnn_26"
};
//#endregion
//#region src/components/sidebarRight/tabs/chatReactionsField.tsx
var _tmpl$$1 = /*#__PURE__*/ template(`<div>`);
var CUSTOM_EMOJI_ALT = "🙂";
function getCustomEmojiEntities(entities) {
	return entities.filter((entity) => entity._ === "messageEntityCustomEmoji");
}
/**
* The ordered reactions of a channel as a line of emoji (as tdesktop's field): a field on the composer's
* engine, so the caret, the selection, the clipboard, a drop and undo are an input's own. Whatever an
* edit leaves in it is handed to `onEdit`, which says what of it is reactions; the field then shows
* that list. Every reaction is a custom emoji in it: a standard one its select animation (with its emoji
* as the text), custom ones their own, Stars a sentinel; a standard one without an animation is its emoji.
*/
function ChatReactionsField(props) {
	const inputField = new InputField({
		placeholder: "ReactionAddReactionsHint",
		withLinebreaks: false
	});
	const { container, input } = inputField;
	input.classList.add(chatReactionsField_module_default.field);
	input.dataset.drawsCustomEmoji = "";
	input.dataset.customEmojiSize = "24";
	input.style.setProperty("--messages-custom-emoji-size", "24px");
	input.dataset.animationGroup = "GENERAL-SETTINGS";
	input.removeAttribute("aria-labelledby");
	input.setAttribute("aria-label", I18n.format("AvailableReactions", true));
	if (inputField.placeholder) input.setAttribute("aria-describedby", inputField.placeholder.id);
	const alts = /* @__PURE__ */ new Map();
	const [altsVersion, setAltsVersion] = createSignal(0);
	const buildValue = (reactions) => {
		const value = {
			text: "",
			entities: [],
			sizes: []
		};
		for (const reaction of reactions) {
			const docId = reactionToDocId(reaction, props.catalog);
			if (!docId) {
				const emoticon = reaction.emoticon;
				value.text += emoticon;
				value.sizes.push(emoticon.length);
				continue;
			}
			const alt = reaction._ === "reactionPaid" ? "⭐" : reaction._ === "reactionEmoji" ? reaction.emoticon : alts.get(docId) || CUSTOM_EMOJI_ALT;
			value.entities.push({
				...getMessageEntityForEmojiWithDocId({
					docId,
					emoji: alt
				}),
				offset: value.text.length
			});
			value.text += alt;
			value.sizes.push(1);
		}
		return value;
	};
	/** The document as tokens: an emoji, a custom emoji, or a run of anything else; and where each starts */
	const readTokens = () => {
		const tokens = [];
		const starts = [];
		const push = (token, start) => {
			tokens.push(token);
			starts.push(start);
		};
		let position = 0;
		for (const block of editor.getDocument().content || []) {
			++position;
			for (const node of block.content || []) if (node.type === "customEmoji") {
				const docId = "" + node.attrs.documentId;
				const standard = props.catalog.find((item) => item.docId === docId);
				push(standard ? { emoji: standard.emoticon } : {
					docId,
					emoji: node.attrs.emoji
				}, position++);
			} else if (node.type === "text") {
				const { text } = node;
				let last = 0;
				for (const entity of parseEntities(text)) {
					if (entity._ !== "messageEntityEmoji") continue;
					if (entity.offset > last) push({}, position + last);
					push({ emoji: text.slice(entity.offset, entity.offset + entity.length) }, position + entity.offset);
					last = entity.offset + entity.length;
				}
				if (last < text.length) push({}, position + last);
				position += text.length;
			} else push({}, position++);
			++position;
		}
		return {
			tokens,
			starts
		};
	};
	const getTokenIndex = (starts, position) => {
		let index = 0;
		while (index < starts.length && starts[index] < position) ++index;
		return index;
	};
	const getCaret = () => getTokenIndex(readTokens().starts, editor.captureSelection().to);
	/** Whether the document is `value` */
	const isShowing = (value) => {
		const current = editor.getRichValue(true, false);
		const entities = getCustomEmojiEntities(current.entities);
		return current.value === value.text && entities.length === value.entities.length && entities.every((entity, i) => entity.offset === value.entities[i].offset && entity.document_id === value.entities[i].document_id);
	};
	/** Shows `props.reactions`, if the field does not already, with the caret before the `caret`-th */
	const render = (caret, keepSelection) => {
		const value = buildValue(props.reactions);
		if (isShowing(value)) return;
		let kept;
		if (keepSelection) {
			const selection = editor.captureSelection();
			const { starts } = readTokens();
			kept = {
				from: getTokenIndex(starts, selection.from),
				to: getTokenIndex(starts, selection.to),
				...selection.backward && { backward: true }
			};
		}
		inputField.setValueSilently({
			text: value.text,
			entities: value.entities
		});
		const positionOf = (index) => 1 + value.sizes.slice(0, Math.max(0, index)).reduce((sum, size) => sum + size, 0);
		if (kept) {
			editor.restoreSelection({
				from: positionOf(kept.from),
				to: positionOf(kept.to),
				...kept.backward && { backward: true }
			}, false);
			return;
		}
		const position = positionOf(caret);
		editor.restoreSelection({
			from: position,
			to: position
		}, false);
	};
	let editing = false;
	let nextCaret;
	const onStateChange = () => {
		if (editor.isComposing || editing) return;
		inputField.syncFromInput();
		const { tokens, starts } = readTokens();
		let altsChanged = false;
		for (const token of tokens) if (token.docId && token.docId !== "__PAID_REACTION_EMOJI__" && token.emoji && token.emoji !== CUSTOM_EMOJI_ALT && !alts.has(token.docId)) {
			alts.set(token.docId, token.emoji);
			altsChanged = true;
		}
		if (!altsChanged && isShowing(buildValue(props.reactions))) return;
		editing = true;
		let caret;
		try {
			caret = props.onEdit(tokens, getTokenIndex(starts, editor.captureSelection().to));
		} finally {
			editing = false;
		}
		render(caret);
	};
	const editor = attachPlainMessageEditor(input, { onStateChange });
	onCleanup(() => editor.destroy());
	input.addEventListener("beforeinput", (e) => {
		if ((e.inputType === "insertText" || e.inputType === "insertReplacementText") && e.data && !props.canType(e.data)) e.preventDefault();
	}, true);
	input.addEventListener("keypress", (e) => {
		if (e.charCode >= 32 && !e.ctrlKey && !e.metaKey && !props.canType(String.fromCodePoint(e.charCode))) e.preventDefault();
	}, true);
	input.addEventListener("compositionend", () => queueMicrotask(onStateChange));
	createEffect(on(() => [
		props.reactions,
		props.catalog,
		altsVersion()
	], () => {
		if (editing) return;
		const keepSelection = nextCaret === void 0;
		const caret = nextCaret ?? Math.min(getCaret(), props.reactions.length);
		nextCaret = void 0;
		render(caret, keepSelection);
	}));
	createEffect(() => {
		const missing = props.reactions.filter((reaction) => reaction._ === "reactionCustomEmoji" && !alts.has(reaction.document_id)).map((reaction) => reaction.document_id);
		if (!missing.length) return;
		props.managers.appEmojiManager.getCustomEmojiDocuments(missing).then((docs) => {
			let changed = false;
			docs.forEach((doc) => {
				if (doc?.stickerEmojiRaw && !alts.has(doc.id)) {
					alts.set(doc.id, doc.stickerEmojiRaw);
					changed = true;
				}
			});
			if (changed) setAltsVersion((version) => version + 1);
		}, (err) => console.error("chat reactions: custom emoji", err));
	});
	createEffect(() => {
		editor.setEditable(!props.disabled);
		if (props.disabled) input.setAttribute("aria-disabled", "true");
		else input.removeAttribute("aria-disabled");
	});
	createEffect(() => input.classList.toggle(chatReactionsField_module_default.focused, props.pickerOpen));
	const isPlainOut = (docId) => docId === "__PAID_REACTION_EMOJI__" || props.catalog.some((item) => item.docId === docId);
	const writePlain = (data) => {
		const html = data?.getData("text/html");
		if (!html?.includes("data-doc-id")) return;
		const doc = new DOMParser().parseFromString(html, "text/html");
		let changed = false;
		doc.querySelectorAll("[data-doc-id]").forEach((el) => {
			if (!isPlainOut(el.getAttribute("data-doc-id"))) return;
			el.replaceWith(el.getAttribute("data-sticker-emoji") || el.getAttribute("alt") || el.textContent);
			changed = true;
		});
		if (changed) data.setData("text/html", doc.body.innerHTML);
	};
	const onCopy = (e) => writePlain(e.clipboardData);
	const onDragStart = (e) => writePlain(e.dataTransfer);
	const onKeyDown = (e) => {
		if (e.key === "Tab" || e.key === "Escape") return;
		e.stopPropagation();
		if (e.target === input && (e.key === "Home" || e.key === "End") && !e.altKey && !e.metaKey) {
			e.preventDefault();
			const selection = editor.captureSelection();
			const anchor = selection.backward ? selection.to : selection.from;
			const head = e.key === "Home" ? 1 : 1 + buildValue(props.reactions).sizes.reduce((sum, size) => sum + size, 0);
			const from = e.shiftKey ? Math.min(anchor, head) : head;
			const to = e.shiftKey ? Math.max(anchor, head) : head;
			editor.restoreSelection({
				from,
				to,
				...e.shiftKey && head < anchor && { backward: true }
			}, false);
			return;
		}
		if (e.target === input && e.key === "Enter" && !e.isComposing && !editor.isComposing && Modes.a11y && !props.disabled) {
			e.preventDefault();
			props.onOpenPicker();
		}
	};
	props.inputRef?.(input);
	props.ref?.({
		getCaret,
		setNextCaret: (index) => nextCaret = index
	});
	return (() => {
		var _el$ = _tmpl$$1();
		addEventListener(_el$, "dragstart", onDragStart);
		addEventListener(_el$, "cut", onCopy);
		addEventListener(_el$, "copy", onCopy);
		addEventListener(_el$, "keydown", onKeyDown);
		insert(_el$, container, null);
		insert(_el$, createComponent(Button.Icon, {
			icon: "smile",
			get ["class"]() {
				return chatReactionsField_module_default.button;
			},
			get ["aria-label"]() {
				return I18n.format("ReactionAddReactionsHint", true);
			},
			get ["aria-expanded"]() {
				return props.pickerOpen;
			},
			get disabled() {
				return props.disabled;
			},
			noRipple: true,
			onClick: (e) => {
				e.stopPropagation();
				props.onOpenPicker();
			}
		}), null);
		createRenderEffect(() => className(_el$, chatReactionsField_module_default.wrap));
		return _el$;
	})();
}
//#endregion
//#region src/components/sidebarRight/tabs/chatReactions.tsx
var _tmpl$ = /*#__PURE__*/ template(`<form>`);
var _tmpl$2 = /*#__PURE__*/ template(`<div class=input-wrapper>`);
var _tmpl$3 = /*#__PURE__*/ template(`<br>`);
var PICKER_GAP = 8;
var NO_REACTIONS = [];
var ChatReactionsTab = () => {
	const [tab] = useSuperTab();
	const promiseCollector = usePromiseCollector();
	const managers = tab.managers;
	const middleware = tab.middlewareHelper.get();
	let closing = false;
	tab.eventListener.addEventListener("close", () => {
		closing = true;
	});
	const isAlive = () => !closing && middleware();
	const { chatId } = tab.payload;
	const peerId = chatId.toPeerId(true);
	const [loaded, setLoaded] = createSignal(false);
	const [isBroadcast, setIsBroadcast] = createSignal(false);
	const [catalog, setCatalog] = createSignal([]);
	const [activeCatalog, setActiveCatalog] = createSignal([]);
	const [appConfig, setAppConfig] = createSignal();
	const [saving, setSaving] = createSignal(false);
	const activeEmoticons = createMemo(() => activeCatalog().map((reaction) => reaction.reaction));
	const catalogItems = createMemo(() => catalog().map((reaction) => ({
		emoticon: reaction.reaction,
		docId: reaction.select_animation?.id
	})));
	const showSelectionLimitError = () => {
		toastNew({
			langPackKey: "ReactionMaxCountError",
			langPackArguments: [getSelectionCeiling()]
		});
	};
	const showSaveError = (error) => {
		if (error?.type === "MIDDLEWARE") return;
		console.error("setChatAvailableReactions error", error);
		if (error?.type === "REACTIONS_TOO_MANY") showSelectionLimitError();
		else if (error?.type) toast(error.type);
		else toastNew({ langPackKey: "Error.AnError" });
	};
	const [groupDraft, setGroupDraft] = createSignal();
	let groupTouched = false;
	const saveGroup = () => {
		saveGroupDebounced.clearTimeout();
		const draft = groupDraft();
		if (!draft) return;
		const { reactions } = buildGroupPayload(draft);
		managers.appChatsManager.setChatAvailableReactions(chatId, reactions).catch(showSaveError);
	};
	const saveGroupDebounced = debounce(saveGroup, 3e3, false, true);
	const changeGroupDraft = (draft) => {
		if (draft === groupDraft()) return;
		groupTouched = true;
		setGroupDraft(draft);
		saveGroupDebounced();
	};
	let fullUpdatedWhileLoading = false;
	tab.listenerSetter.add(rootScope)("chat_full_update", (id) => {
		if (id !== chatId || groupTouched) return;
		if (!groupDraft()) {
			fullUpdatedWhileLoading = true;
			return;
		}
		managers.appProfileManager.getChatFull(chatId).then((chatFull) => {
			if (groupTouched || chatFull._ === "communityFull") return;
			setGroupDraft(initGroupDraft(chatFull.available_reactions));
		});
	});
	const getGroupCaption = () => {
		const mode = groupDraft()?.mode;
		return mode === "all" ? "EnableAllReactionsInfo" : mode === "none" ? "DisableReactionsInfo" : "EnableSomeReactionsInfo";
	};
	const groupModes = [
		["all", "AllReactions"],
		["some", "SomeReactions"],
		["none", "NoReactions"]
	];
	const radioName = createUniqueId();
	const [channelDraft, setChannelDraft] = createSignal();
	const [confirmed, setConfirmed] = createSignal();
	const [paidShown, setPaidShown] = createSignal(false);
	const [boostLevel, setBoostLevel] = createSignal();
	const [pickerOpen, setPickerOpen] = createSignal(false);
	const getSelectionCeiling = () => appConfig()?.reactions_in_chat_max || 100;
	const getUniqMax = () => appConfig()?.reactions_uniq_max || 11;
	const channelPayload = createMemo(() => {
		const draft = channelDraft();
		return draft && buildChannelPayload(draft, {
			activeEmoticons: activeEmoticons(),
			paidShown: paidShown()
		});
	});
	const hasChannelChanges = () => {
		const payload = channelPayload();
		return !!payload && !savePayloadsEqual(payload, confirmed());
	};
	const requiredLevel = () => {
		const draft = channelDraft();
		return draft ? getRequiredBoostLevel(draft) : 0;
	};
	const needsBoosts = () => boostLevel() !== void 0 && requiredLevel() > boostLevel();
	/** The channel's level as the server has it now (it may have been boosted meanwhile); undefined when not known */
	const refreshBoostLevel = () => {
		return managers.appBoostsManager.getBoostsStatus(peerId).then((status) => {
			const level = status.level ?? 0;
			setBoostLevel(level);
			return level;
		}, (err) => {
			console.error("chat reactions: boosts status", err);
		});
	};
	const openReactionsBoosts = (explain) => {
		const reason = getCustomReactionsBoostReason(requiredLevel());
		if (explain) managers.appProfileManager.canViewStatistics(peerId).then((isAdmin) => {
			if (isAdmin && isAlive()) toastNew({
				langPackKey: reason.descriptionLangKey,
				langPackArguments: reason.descriptionArgs
			});
		});
		openBoosts({
			peerId,
			slider: tab.slider,
			managers,
			reason,
			isAlive
		});
	};
	const changeChannelDraft = (draft) => {
		setChannelDraft(draft);
	};
	const fieldReactions = createMemo(() => {
		const draft = channelDraft();
		return draft ? getChannelFieldReactions(draft) : NO_REACTIONS;
	});
	let field;
	/** An edit of the field's text: what of it is reactions goes in the draft */
	const onFieldEdit = (tokens, caret) => {
		const result = editChannelField(channelDraft(), tokens, caret, {
			catalog: catalogItems(),
			activeEmoticons: activeEmoticons(),
			paidShown: paidShown(),
			max: getSelectionCeiling()
		});
		if (result.refused === "limit") showSelectionLimitError();
		changeChannelDraft(result.draft);
		return result.caret;
	};
	/** Resolves to whether the server took the reactions; the button closes the tab once it has */
	const saveChannel = async (close) => {
		const payload = channelPayload();
		if (saving() || !payload) return false;
		setSaving(true);
		picker?.dropdown.toggle(false);
		try {
			const required = requiredLevel();
			if (required && required > await refreshBoostLevel()) {
				if (isAlive()) openReactionsBoosts(true);
				return false;
			}
			if (!isAlive()) return false;
			await managers.appChatsManager.setChatAvailableReactions(chatId, payload.reactions, payload.options);
			setConfirmed(payload);
			if (close && isAlive()) tab.close();
			return true;
		} catch (err) {
			if (!isAlive()) return false;
			const error = err;
			if (error?.type === "BOOSTS_REQUIRED") openReactionsBoosts(true);
			else showSaveError(error);
			return false;
		} finally {
			setSaving(false);
		}
	};
	tab.isConfirmationNeededOnClose = useIsConfirmationNeededOnClose({
		hasChanges: () => isBroadcast() && hasChannelChanges(),
		saveAllSettings: async () => {
			if (!await saveChannel(false)) throw new Error("CHAT_REACTIONS_NOT_SAVED");
		},
		descriptionLangKey: "ReactionApplyChangesDialog",
		waitForSave: true
	});
	const togglePaid = (paid) => {
		changeChannelDraft(setChannelPaid(channelDraft(), paid));
	};
	let fieldElement;
	let picker;
	const selectedCustomDocIds = () => (channelDraft()?.reactions || []).filter((reaction) => reaction._ === "reactionCustomEmoji").map((reaction) => reaction.document_id);
	const pickerDocIds = () => (channelDraft()?.reactions || []).map((reaction) => reactionToDocId(reaction, catalogItems())).filter(Boolean);
	createEffect(() => {
		const docIds = pickerDocIds();
		if (pickerOpen()) picker?.emojiTab.setActiveDocIds(docIds);
	});
	const onPick = (emoji) => {
		const reaction = pickedEmojiToReaction(emoji, catalogItems());
		const draft = channelDraft();
		if (!reaction || !draft || saving()) return;
		const caret = field.getCaret();
		const paidOffset = +draft.paid;
		const index = getChannelFieldReactions(draft).findIndex((other) => hasReaction([other], reaction));
		if (index !== -1) {
			field.setNextCaret(index < caret ? caret - 1 : caret);
			changeChannelDraft(reaction._ === "reactionPaid" ? setChannelPaid(draft, false) : removeChannelReactionAt(draft, index - paidOffset));
			return;
		}
		const freeIndex = Math.max(0, caret - paidOffset);
		const result = insertChannelReaction(draft, reaction, freeIndex, getSelectionCeiling());
		if (result.refused === "limit") {
			showSelectionLimitError();
			return;
		}
		if (result.refused) return;
		field.setNextCaret(reaction._ === "reactionPaid" ? caret + 1 : Math.min(freeIndex, draft.reactions.length) + paidOffset + 1);
		changeChannelDraft(result.draft);
	};
	const openPicker = () => {
		if (saving()) return;
		if (picker) {
			if (!picker.closing) picker.dropdown.toggle(false);
			return;
		}
		const activeDocIds = activeCatalog().map((reaction) => reaction.select_animation?.id).filter(Boolean);
		const getMainDocIds = () => [...activeDocIds, ...selectedCustomDocIds()];
		const emojiTab = new EmojiTab({
			managers,
			noRegularEmoji: true,
			noSearchGroups: true,
			canUsePremiumEmojiAlways: true,
			packsWithoutPremium: true,
			mainSets: () => [Promise.resolve(getMainDocIds())],
			searchFetcher: async (q) => {
				const emojis = await managers.appEmojiManager.prepareAndSearchEmojis({
					q,
					limit: Infinity,
					minChars: 1,
					addCustom: true
				});
				const items = catalogItems();
				const active = new Set(activeEmoticons());
				return { emojis: emojis.map((emoji) => {
					if (emoji.docId) return emoji;
					const emoticon = cleanEmoji(emoji.emoji);
					const docId = active.has(emoticon) && items.find((item) => item.emoticon === emoticon)?.docId;
					return docId ? {
						emoji: emoji.emoji,
						docId
					} : void 0;
				}).filter(Boolean) };
			},
			onClick: onPick
		});
		const dropdown = new EmoticonsDropdown({
			tabsToRender: [emojiTab],
			customParentElement: getOverlayRoot,
			getOpenPosition: () => {
				const rect = fieldElement.getBoundingClientRect();
				const cloned = cloneDOMRect(rect);
				cloned.top = rect.bottom + PICKER_GAP;
				if (cloned.top + 420 > getAppWindow().innerHeight) cloned.top = Math.max(PICKER_GAP, rect.top - 420 - PICKER_GAP);
				return cloned;
			}
		});
		picker = {
			dropdown,
			emojiTab
		};
		emojiTab.setActiveDocIds(pickerDocIds());
		setPickerOpen(true);
		bindDisposablePicker(dropdown, {
			returnFocusTo: fieldElement,
			onClose: () => {
				picker.closing = true;
			},
			onClosed: () => {
				picker = void 0;
				setPickerOpen(false);
			}
		});
		dropdown.onButtonClick();
	};
	onCleanup(() => {
		picker?.dropdown.hideAndDestroy();
		picker = void 0;
	});
	onMount(() => {
		tab.eventListener.addEventListener("destroy", () => {
			if (saveGroupDebounced.isDebounced()) saveGroup();
		}, { once: true });
		promiseCollector.collect((async () => {
			const [reactions, activeReactions, loadedChatFull, broadcast, config] = await Promise.all([
				managers.appReactionsManager.getAvailableReactions(),
				managers.appReactionsManager.getActiveAvailableReactions(),
				managers.appProfileManager.getChatFull(chatId),
				managers.appChatsManager.isBroadcast(chatId),
				managers.apiManager.getAppConfig()
			]);
			let chatFull = loadedChatFull;
			while (fullUpdatedWhileLoading) {
				fullUpdatedWhileLoading = false;
				chatFull = await managers.appProfileManager.getChatFull(chatId);
			}
			const full = chatFull._ === "communityFull" ? void 0 : chatFull;
			const available = full?.available_reactions;
			setCatalog(reactions);
			setActiveCatalog(activeReactions);
			setAppConfig(config);
			setIsBroadcast(broadcast);
			if (!broadcast) {
				setGroupDraft(initGroupDraft(available));
				setLoaded(true);
				return;
			}
			const channelFull = full;
			const paid = !!channelFull?.pFlags.paid_reactions_available;
			setPaidShown(!!(channelFull?.pFlags.paid_media_allowed || paid));
			const uniqMax = getUniqMax();
			const draft = initChannelDraft({
				available,
				paid,
				limit: clamp(full?.reactions_limit || uniqMax, 1, uniqMax),
				activeEmoticons: activeEmoticons()
			});
			setChannelDraft(draft);
			setConfirmed(buildChannelPayload(draft, {
				activeEmoticons: activeEmoticons(),
				paidShown: paidShown()
			}));
			setLoaded(true);
			refreshBoostLevel();
		})());
	});
	const boostHint = () => {
		const reason = getCustomReactionsBoostReason(requiredLevel());
		const anchor = anchorCallback(() => openReactionsBoosts());
		anchor.append(i18n("BoostChannel"));
		return [
			memo(() => i18n(reason.descriptionLangKey, reason.descriptionArgs)),
			" ",
			anchor
		];
	};
	const GroupScreen = () => [createComponent(Section, {
		name: "AvailableReactions",
		get caption() {
			return getGroupCaption();
		},
		get children() {
			var _el$ = _tmpl$();
			insert(_el$, createComponent(For, {
				each: groupModes,
				children: ([mode, langPackKey]) => createComponent(Row, { get children() {
					return [createComponent(Row.RadioField, { get children() {
						return createComponent(RadioFieldTsx, {
							"class": "disable-hover",
							get checked() {
								return groupDraft().mode === mode;
							},
							name: radioName,
							value: mode,
							onChange: (checked) => checked && changeGroupDraft(setGroupMode(groupDraft(), mode, activeEmoticons()))
						});
					} }), createComponent(Row.Title, { get children() {
						return i18n(langPackKey);
					} })];
				} })
			}));
			return _el$;
		}
	}), createComponent(Show, {
		get when() {
			return groupDraft().mode === "some";
		},
		get children() {
			return createComponent(Section, {
				name: "OnlyAllowThisReactions",
				get children() {
					return createComponent(For, {
						get each() {
							return activeCatalog();
						},
						children: (availableReaction) => {
							const reaction = availableReactionToReaction(availableReaction);
							return createComponent(Row, {
								havePadding: true,
								get children() {
									return [
										createComponent(Row.CheckboxFieldToggle, { get children() {
											return createComponent(CheckboxFieldTsx, {
												"class": "disable-hover",
												get checked() {
													return hasReaction(groupDraft().reactions, reaction);
												},
												toggle: true,
												onChange: (checked) => changeGroupDraft(toggleGroupReaction(groupDraft(), reaction, checked))
											});
										} }),
										createComponent(Row.Title, { get children() {
											return availableReaction.title;
										} }),
										createComponent(ReactionStickerPreview, { get sticker() {
											return availableReaction.static_icon;
										} })
									];
								}
							});
						}
					});
				}
			});
		}
	})];
	const ChannelScreen = () => [
		createComponent(Portal, {
			get mount() {
				return tab.header;
			},
			get children() {
				return createComponent(SaveButton, {
					get hasChanges() {
						return hasChannelChanges();
					},
					get saving() {
						return saving();
					},
					onClick: () => saveChannel(true)
				});
			}
		}),
		createComponent(Section, {
			caption: "ReactionAddEmojiFromAnyPack",
			get children() {
				return createComponent(Row, { get children() {
					return [createComponent(Row.CheckboxFieldToggle, { get children() {
						return createComponent(CheckboxFieldTsx, {
							"class": "disable-hover",
							get checked() {
								return channelDraft().enabled;
							},
							toggle: true,
							get disabled() {
								return saving();
							},
							onChange: (enabled) => changeChannelDraft(setChannelEnabled(channelDraft(), enabled, activeEmoticons()))
						});
					} }), createComponent(Row.Title, { get children() {
						return i18n("AllowReactions");
					} })];
				} });
			}
		}),
		createComponent(Show, {
			get when() {
				return channelDraft().enabled;
			},
			get children() {
				return [
					createComponent(Section, {
						name: "AvailableReactions",
						get caption() {
							return [memo(() => i18n("ReactionCreateOwnEmojiPacks")), createComponent(Show, {
								get when() {
									return needsBoosts();
								},
								get children() {
									return [_tmpl$3(), memo(() => boostHint())];
								}
							})];
						},
						get children() {
							var _el$2 = _tmpl$2();
							insert(_el$2, createComponent(ChatReactionsField, {
								managers,
								get reactions() {
									return fieldReactions();
								},
								get catalog() {
									return catalogItems();
								},
								get pickerOpen() {
									return pickerOpen();
								},
								get disabled() {
									return saving();
								},
								onEdit: onFieldEdit,
								canType: (data) => isReactionTyping(data, {
									catalog: catalogItems(),
									activeEmoticons: activeEmoticons(),
									paidShown: paidShown()
								}),
								onOpenPicker: openPicker,
								ref: (api) => field = api,
								inputRef: (el) => fieldElement = el
							}));
							return _el$2;
						}
					}),
					createComponent(Section, {
						caption: "MaximumReactionsInfo",
						get children() {
							return createComponent(RangeSettingSelector, {
								get textLeft() {
									return i18n("MaximumReactionsHeader");
								},
								textRight: (value) => value,
								step: 1,
								get value() {
									return channelDraft().limit;
								},
								minValue: 1,
								get maxValue() {
									return getUniqMax();
								},
								get disabled() {
									return saving();
								},
								onChange: (value) => changeChannelDraft(setChannelLimit(channelDraft(), Math.round(value)))
							});
						}
					}),
					createComponent(Show, {
						get when() {
							return paidShown();
						},
						get children() {
							return createComponent(Section, {
								caption: "ChannelEnablePaidReactionsInfo",
								get children() {
									return createComponent(Row, { get children() {
										return [createComponent(Row.CheckboxFieldToggle, { get children() {
											return createComponent(CheckboxFieldTsx, {
												"class": "disable-hover",
												get checked() {
													return channelDraft().paid;
												},
												toggle: true,
												get disabled() {
													return saving();
												},
												onChange: togglePaid
											});
										} }), createComponent(Row.Title, { get children() {
											return i18n("ChannelEnablePaidReactions");
										} })];
									} });
								}
							});
						}
					})
				];
			}
		})
	];
	return createComponent(Show, {
		get when() {
			return loaded();
		},
		get children() {
			return createComponent(Show, {
				get when() {
					return isBroadcast();
				},
				get fallback() {
					return createComponent(GroupScreen, {});
				},
				get children() {
					return createComponent(ChannelScreen, {});
				}
			});
		}
	});
};
//#endregion
export { ChatReactionsTab as default };
