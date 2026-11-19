//# allFunctionsCalledOnLoad
import { h as Modes } from "./userAgent-ByGXcznk.js";
import { C as FontFamily } from "./themeController-2cytOOn0.js";
import { t as noop } from "./noop-H9NNBLfX.js";
import { t as Icon } from "./icon-DbP6Es97.js";
import { n as rootScope } from "./rootScope-CZS0lmz8.js";
import { a as i18n, u as langPack_default } from "./langPack-BmdJGr44.js";
import { C as createSignal, D as getOwner, L as untrack, P as runWithOwner, _ as createMemo, i as For, p as createComponent, s as Show, w as createUniqueId, x as createRoot, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { n as deferredPromise } from "./cancellablePromise-bof--dnO.js";
import { t as cancelEvent } from "./cancelEvent-Cw8vYZHp.js";
import { c as insert, u as memo } from "./web-BPyQozky.js";
import { n as hotReloadGuard } from "./hotReloadGuardProvider-CHEsZRuG.js";
import { t as liteMode } from "./liteMode-DeLStZfQ.js";
import { n as isInDOM, t as sequentialDom } from "./sequentialDom-CRhA0kB2.js";
import { t as getMiddleware } from "./middleware-D6HuIqPm.js";
import { t as Button } from "./button-DpTvniRN.js";
import { t as SetTransition } from "./singleTransition-UfxhQocw.js";
import { t as replaceContent } from "./replaceContent-Bi6ru3li.js";
import { t as findUpTag } from "./findUpTag-CkbKEw4y.js";
import { l as getCrossfadingTo, s as crossfadeContent } from "./animations-DCmLIda3.js";
import { Cn as CheckboxField, M as avatarNew, a as createRowTitle, ft as PeerTitle, i as Row } from "./confirmationPopup-Bz6mK0o-.js";
import { gn as isDialog } from "./getChatMigratedTo-ChhMNXuu.js";
import { R as wrapTextWithEntities } from "./canPollPeerStories-D3HoBvLX.js";
import { r as htmlToDocumentFragment } from "./preloaderRing-EqVZpID6.js";
import { t as getTextWidth } from "./getTextWidth-DuqOrM4A.js";
import { n as setRollingText } from "./animatedCounter-DSopLGin.js";
import { t as ChatType } from "./chatType-C89v744i.js";
import { t as middlewarePromise } from "./middlewarePromise-CVgtM5sE.js";
import { t as PINNED_DIALOG_CLASS_NAME } from "./dialogsPinnedReorder-BJ4mUWQw.js";
import { a as useChatListNarrow, c as FolderTag, n as getDialogFolderTags, o as useFolderTagFilters, r as getFolderTagColor, s as useFolderTagsShown } from "./folderTags-BLsLsYVO.js";
//#region src/components/folderTags/layout.ts
var FOLDER_TAG_FONT = `500 11px ${FontFamily}`;
var FOLDER_TAG_PADDING = 10;
var FOLDER_TAG_EMOJI_SIZE = 13;
var FOLDER_TAG_GAP = 4;
var widths = /* @__PURE__ */ new Map();
/**
* How wide a tag with this text is: the text upper-cased, and every emoji in it - a custom one, or
* one drawn as text or as a picture - a square of its own (`folderTag.module.scss`)
*/
function measureFolderTag(title) {
	const raw = typeof title === "string" ? {
		text: title,
		entities: []
	} : title;
	const key = raw.text + "" + (raw.entities || []).filter((entity) => entity._ === "messageEntityCustomEmoji").map((entity) => entity.offset + ":" + entity.length).join(",");
	let width = widths.get(key);
	if (width !== void 0) return width;
	const { text, entities } = wrapTextWithEntities({
		_: "textWithEntities",
		text: raw.text,
		entities: raw.entities || []
	});
	const emojis = entities.filter((entity) => entity._ === "messageEntityCustomEmoji" || entity._ === "messageEntityEmoji").sort((a, b) => a.offset - b.offset);
	let plain = "", offset = 0, emojiCount = 0;
	for (const entity of emojis) {
		if (entity.offset < offset) continue;
		plain += text.slice(offset, entity.offset);
		offset = entity.offset + entity.length;
		++emojiCount;
	}
	plain += text.slice(offset);
	width = Math.ceil(getTextWidth(plain.toUpperCase(), FOLDER_TAG_FONT)) + emojiCount * FOLDER_TAG_EMOJI_SIZE + FOLDER_TAG_PADDING;
	widths.set(key, width);
	return width;
}
function getFolderTagMoreText(count) {
	return "+" + count;
}
/**
* Which of a row's tags fit in its width, as Telegram Desktop lays them out: in the folders' order
* while they fit, every one after the first that does not is counted into a "+N" at the end - and
* when the "+N" itself does not fit, it takes the place of the last tag that did.
*
* @returns how many tags go first, and the number on the "+N" after them (0 for none)
*/
function fitFolderTags(tagWidths, availableWidth, getMoreWidth = (count) => measureFolderTag(getFolderTagMoreText(count)), gap = FOLDER_TAG_GAP) {
	let visible = 0, more = 0;
	for (const width of tagWidths) {
		if (more || availableWidth < width) {
			++more;
			continue;
		}
		++visible;
		availableWidth -= width + gap;
	}
	if (more && availableWidth < getMoreWidth(more)) return visible ? {
		visible: visible - 1,
		more: more + 1
	} : {
		visible: 0,
		more: 0
	};
	return {
		visible,
		more
	};
}
//#endregion
//#region src/components/folderTags/dialogFolderTags.tsx
/**
* Where the tags line starts and ends in a row of the chat list: the avatar's lane on the start,
* the row's padding on the end (`.chatlist-chat.row-with-padding`, `.row-big`)
*/
var DIALOG_FOLDER_TAGS_INSET = 84;
var NOTHING_FITTED = {
	visible: 0,
	more: 0
};
/**
* Gives a row of a folder's chat list its line of folder tags, under the message, the way the
* other clients put it: one tag for every other folder with a colour the chat is in, as many as the
* row has room for and a "+N" for the rest. A row with tags is a line taller (`hasTags`) - the list
* lays it out at `DIALOG_WITH_FOLDER_TAGS_HEIGHT` instead of its usual height.
*/
function attachDialogFolderTags({ listEl, after, context, middleware }) {
	return createRoot((dispose) => {
		middleware.onClean(dispose);
		const shown = useFolderTagsShown();
		const filters = useFolderTagFilters();
		const narrow = useChatListNarrow();
		const [dialog, setDialog] = createSignal(void 0, { equals: false });
		const tags = createMemo(() => {
			if (!shown() || narrow()) return [];
			const _dialog = dialog();
			return isDialog(_dialog) ? getDialogFolderTags(_dialog, filters(), context.filterId) : [];
		});
		const hasTags = createMemo(() => !!tags().length);
		const fitted = createMemo(() => {
			const _tags = tags();
			if (!_tags.length) return NOTHING_FITTED;
			return fitFolderTags(_tags.map((filter) => measureFolderTag(filter.title)), context.width() - DIALOG_FOLDER_TAGS_INSET);
		}, void 0, { equals: (prev, next) => prev?.visible === next.visible && prev?.more === next.more });
		const visibleTags = createMemo(() => tags().slice(0, fitted().visible));
		let container;
		const mountContainer = () => {
			container = document.createElement("div");
			container.classList.add("dialog-folder-tags");
			after.after(container);
			insert(container, () => [createComponent(For, {
				get each() {
					return visibleTags();
				},
				children: (filter) => createComponent(FolderTag, {
					get color() {
						return getFolderTagColor(filter);
					},
					get title() {
						return filter.title;
					}
				})
			}), createComponent(Show, {
				get when() {
					return fitted().more;
				},
				get children() {
					return createComponent(FolderTag, {
						color: 5,
						dir: "ltr",
						get children() {
							return getFolderTagMoreText(fitted().more);
						}
					});
				}
			})]);
		};
		const owner = getOwner();
		createRenderEffect(() => {
			const _hasTags = hasTags();
			listEl.classList.toggle("has-folder-tags", _hasTags);
			if (_hasTags && !container) untrack(() => runWithOwner(owner, mountContainer));
		});
		return {
			setDialog,
			hasTags
		};
	});
}
//#endregion
//#region src/components/rowTsxController.tsx
/** The grip a sortable row is dragged by */
function createRowSortableIcon() {
	return Icon("menu", "row-sortable-icon");
}
var resolveRowContent = (content) => {
	return typeof content === "string" ? htmlToDocumentFragment(content) : content;
};
/** Mounts the Solid Row used by the remaining imperative dialog-row controller. */
var mountRowController = (initialOptions = {}) => {
	const options = { ...initialOptions };
	if (options.checkboxFieldOptions) options.checkboxField = new CheckboxField({
		listenerSetter: options.listenerSetter,
		...options.checkboxFieldOptions
	});
	const checkboxField = options.checkboxField;
	const isToggle = checkboxField?.label.classList.contains("checkbox-field-toggle");
	checkboxField?.label.classList.add("disable-hover");
	let clickable = options.clickable;
	if (options.navigationTab) {
		let getInitArgs = options.navigationTab.getInitArgs;
		if (!getInitArgs) {
			const getArgs = options.navigationTab.constructor.getInitArgs;
			if (getArgs) getInitArgs = () => getArgs();
		}
		let args = options.navigationTab.args ?? getInitArgs?.();
		clickable = async () => {
			if (args instanceof Promise) args = await args;
			const tab = options.navigationTab.slider.createTab(options.navigationTab.constructor);
			tab.open(args);
			const eventListener = tab.eventListener;
			if (eventListener && getInitArgs) eventListener.addEventListener("destroyAfter", (promise) => {
				args = promise.then(() => getInitArgs());
			});
		};
	}
	let rightContent = options.rightContent;
	let buttonRight;
	if (options.buttonRight || options.buttonRightLangKey) rightContent = buttonRight = options.buttonRight instanceof HTMLElement ? options.buttonRight : Button("btn-primary btn-color-primary btn-control-small", { text: options.buttonRightLangKey });
	if (options.rightTextContent) {
		rightContent = document.createElement("span");
		rightContent.classList.add("row-title-right-secondary");
		rightContent.textContent = options.rightTextContent;
	}
	const initialSubtitle = options.subtitleLangKey ? i18n(options.subtitleLangKey, options.subtitleLangArgs) : resolveRowContent(options.subtitle);
	const initialTitle = options.titleLangKey ? i18n(options.titleLangKey, options.titleLangArgs) : resolveRowContent(options.title);
	const titleRight = resolveRowContent(options.titleRight || options.titleRightSecondary);
	const subtitleRight = resolveRowContent(options.subtitleRight);
	let container;
	let openContextMenu;
	let freezed = false;
	let currentMedia;
	const [hasSubtitle, setHasSubtitle] = createSignal(!!initialSubtitle);
	const [hasMidtitle, setHasMidtitle] = createSignal(false);
	const [media, setMedia] = createSignal();
	const parts = {};
	const getPart = (className) => container.querySelector(`.${className}`);
	const getTitle = () => container.querySelector(":scope > .row-title, :scope > .row-title-row > .row-title:not(.row-title-right)");
	const getSubtitle = () => container.querySelector(":scope > .row-subtitle, :scope > .row-subtitle-row > .row-subtitle:not(.row-subtitle-right)");
	const getMidtitle = () => container.querySelector(":scope > .row-midtitle, :scope > .row-midtitle-row > .row-midtitle:not(.row-midtitle-right)");
	const ensureSubtitle = () => {
		setHasSubtitle(true);
		return parts.subtitle || (parts.subtitle = getSubtitle());
	};
	const ensureMidtitle = () => {
		setHasMidtitle(true);
		return parts.midtitle || (parts.midtitle = getMidtitle());
	};
	let rootDispose;
	let disposed = false;
	const dispose = () => {
		if (disposed) return;
		disposed = true;
		rootDispose?.();
	};
	const controller = {
		get container() {
			return container;
		},
		get titleRow() {
			return parts.titleRow;
		},
		get titleRight() {
			return parts.titleRight;
		},
		get media() {
			return currentMedia;
		},
		set media(value) {
			currentMedia = value;
		},
		get subtitleRow() {
			return parts.subtitleRow;
		},
		get subtitleRight() {
			return parts.subtitleRight;
		},
		checkboxField,
		get freezed() {
			return freezed;
		},
		set freezed(value) {
			freezed = value;
		},
		buttonRight,
		get title() {
			return parts.title;
		},
		get subtitle() {
			return parts.subtitle;
		},
		get midtitle() {
			return parts.midtitle;
		},
		get openContextMenu() {
			return openContextMenu;
		},
		set openContextMenu(open) {
			openContextMenu = open;
		},
		dispose,
		ensureSubtitle,
		ensureMidtitle,
		createTitle: createRowTitle,
		createMedia: (size) => {
			return controller.applyMediaElement(document.createElement("div"), size);
		},
		applyMediaElement: (element, size) => {
			currentMedia = element;
			setMedia({
				element,
				size
			});
			return element;
		},
		isDisabled: () => container.classList.contains("is-disabled"),
		toggleDisability: (disable = !container.classList.contains("is-disabled")) => {
			container.classList.toggle("is-disabled", disable);
			return () => controller.toggleDisability(!disable);
		},
		disableWithPromise: (promise) => {
			const toggle = controller.toggleDisability(true);
			promise.finally(toggle);
		},
		makeSortable: () => {
			container.classList.add("row-sortable");
			container.append(createRowSortableIcon());
		},
		toggleSorting: (enabled) => {
			container.classList.toggle("cant-sort", !enabled);
		}
	};
	const clickHandler = clickable;
	createRoot((_dispose) => {
		rootDispose = _dispose;
		return createComponent(Row, {
			ref: (element) => container = element,
			clickable: typeof clickHandler === "function" ? (event) => {
				if (!controller.freezed) clickHandler(event);
			} : clickHandler,
			get havePadding() {
				return options.havePadding;
			},
			get noRipple() {
				return options.noRipple;
			},
			get noWrap() {
				return options.noWrap;
			},
			get as() {
				return memo(() => !!options.asLink)() ? "a" : options.asLabel ? "label" : void 0;
			},
			get contextMenu() {
				return options.contextMenu;
			},
			openContextMenuRef: (open) => openContextMenu = open,
			get children() {
				return [
					createComponent(Show, {
						get when() {
							return hasMidtitle();
						},
						get children() {
							return createComponent(Row.Midtitle, { children: true });
						}
					}),
					createComponent(Show, {
						get when() {
							return hasSubtitle();
						},
						get children() {
							return createComponent(Row.Subtitle, {
								subtitleRight,
								children: initialSubtitle || true
							});
						}
					}),
					createComponent(Show, {
						get when() {
							return options.icon;
						},
						get children() {
							return createComponent(Row.Icon, {
								get icon() {
									return options.icon;
								},
								get ["class"]() {
									return (options.iconClasses || []).join(" ");
								}
							});
						}
					}),
					createComponent(Show, {
						when: checkboxField && !isToggle,
						get children() {
							return createComponent(Row.CheckboxField, { get children() {
								return checkboxField.label;
							} });
						}
					}),
					createComponent(Show, {
						when: checkboxField && isToggle,
						get children() {
							return createComponent(Row.CheckboxFieldToggle, { get children() {
								return checkboxField.label;
							} });
						}
					}),
					createComponent(Show, {
						when: rightContent,
						get children() {
							return createComponent(Row.RightContent, { element: rightContent });
						}
					}),
					createComponent(Show, {
						keyed: true,
						get when() {
							return media();
						},
						children: (value) => createComponent(Row.Media, {
							get element() {
								return value.element;
							},
							get size() {
								return value.size;
							}
						})
					}),
					createComponent(Show, {
						when: initialTitle || titleRight || isToggle,
						get children() {
							return createComponent(Row.Title, {
								titleRight,
								get titleRightSecondary() {
									return !!options.titleRightSecondary;
								},
								children: initialTitle
							});
						}
					})
				];
			}
		});
	});
	parts.title = getTitle();
	parts.titleRow = getPart("row-title-row");
	parts.titleRight = getPart("row-title-right");
	parts.subtitle = getSubtitle();
	parts.subtitleRow = getPart("row-subtitle-row");
	parts.subtitleRight = getPart("row-subtitle-right");
	parts.midtitle = getMidtitle();
	if (options.middleware) options.middleware.onDestroy(dispose);
	else options.listenerSetter?.addCleanup(dispose);
	if (options.withCheckboxSubtitle && checkboxField && !isToggle) {
		const [enabledKey, disabledKey] = options.checkboxKeys || ["Checkbox.Enabled", "Checkbox.Disabled"];
		const onChange = () => {
			replaceContent(controller.ensureSubtitle(), i18n(checkboxField.checked ? enabledKey : disabledKey));
		};
		if (options.listenerSetter) options.listenerSetter.add(checkboxField.input)("change", onChange);
		else checkboxField.input.addEventListener("change", onChange);
	}
	return controller;
};
var ROW_CONTROLLER = Symbol.for("tweb.row-controller");
var prototypesWithRowController = /* @__PURE__ */ new WeakSet();
var installRowControllerDescriptors = (target, controller) => {
	const prototype = Object.getPrototypeOf(target);
	const descriptorTarget = prototype && prototype !== Object.prototype ? prototype : target;
	if (prototypesWithRowController.has(descriptorTarget)) return;
	const descriptors = {};
	for (const key of Reflect.ownKeys(controller)) {
		const source = Object.getOwnPropertyDescriptor(controller, key);
		descriptors[key] = {
			configurable: true,
			get() {
				return this[ROW_CONTROLLER][key];
			},
			set: source.set || "writable" in source && source.writable ? function(value) {
				this[ROW_CONTROLLER][key] = value;
			} : void 0
		};
	}
	Object.defineProperties(descriptorTarget, descriptors);
	prototypesWithRowController.add(descriptorTarget);
};
var attachRowController = (target, options = {}) => {
	const controller = mountRowController(options);
	Object.defineProperty(target, ROW_CONTROLLER, { value: controller });
	installRowControllerDescriptors(target, controller);
	return target;
};
function findDialogListElement(target) {
	return findUpTag(target, "A");
}
function setPromiseMiddleware(obj, key) {
	obj[key]?.reject();
	const deferred = obj[key] = deferredPromise();
	deferred.catch(() => {}).finally(() => {
		if (obj[key] === deferred) delete obj[key];
	});
	return {
		deferred,
		middleware: middlewarePromise(() => obj[key] === deferred)
	};
}
function disposeTextHighlight(dom) {
	dom.textHighlight?.dispose();
	dom.textHighlight = void 0;
}
/**
* Puts the subtitle of a row in - crossfading from the activity it takes the place of, which
* came in the same way (`setDialogTyping`)
*/
function setDialogSubtitle(dom, nodes, middlewareHelper) {
	dom.subtitleMiddlewareHelper?.destroy();
	dom.subtitleMiddlewareHelper = middlewareHelper;
	const { lastMessageSpan } = dom;
	const wasTyping = lastMessageSpan.classList.contains("user-typing");
	lastMessageSpan.classList.remove("user-typing");
	dom.showsActivity = false;
	crossfadeContent(lastMessageSpan, nodes, wasTyping ? "crossfade" : "update", wasTyping ? { duration: 120 } : void 0);
}
/**
* Whether the subtitle in the DOM is still exactly what `setLastMessage` put
* there — anyone else writing into `lastMessageSpan` (a community dialog
* falling back to its chat count, a search result, a sidebar picker) has to
* invalidate the skip.
*/
function isRenderedSubtitleIntact(dom) {
	const parts = dom.lastMessageRenderParts;
	const childNodes = getCrossfadingTo(dom.lastMessageSpan) ?? dom.lastMessageSpan.childNodes;
	return !!parts && parts.length === childNodes.length && parts.every((part, idx) => part === childNodes[idx]);
}
function getFolderTitleTextColor(active) {
	return active ? "primary-color" : "secondary-text-color";
}
var BADGE_SIZE = 22;
var DIALOG_AVATAR_SIZES = {
	bigger: 54,
	abitbigger: 42,
	small: 32
};
var DialogElement = class {
	constructor({ peerId, rippleEnabled = true, onlyFirstName = false, meAsSaved = true, avatarSize = "bigger", autonomous, loadPromises, fromName, noIcons, threadId, monoforumParentPeerId, wrapOptions = {}, isMainList, withStories, controlled, dontSetActive, asAllChats, autoDeletePeriod, avatarElement, folderTags, accountNumber }) {
		const wrapMiddleware = wrapOptions?.middleware;
		this.middlewareHelper = wrapMiddleware ? wrapOptions.middleware.create() : controlled ? getMiddleware() : void 0;
		attachRowController(this, {
			clickable: true,
			noRipple: !rippleEnabled,
			havePadding: !threadId && asAllChats !== "topics",
			title: true,
			titleRightSecondary: true,
			subtitle: true,
			subtitleRight: true,
			noWrap: true,
			asLink: true,
			middleware: this.middlewareHelper?.get()
		});
		this.isMainList = isMainList;
		this.subtitleRight.remove();
		const newWrapOptions = { ...wrapOptions };
		if (this.middlewareHelper) newWrapOptions.middleware = this.middlewareHelper.get();
		const isSavedDialog = !!threadId && peerId === rootScope.myId;
		const isForumTopic = !!threadId && !isSavedDialog;
		const usePeerId = isSavedDialog ? threadId : peerId;
		const avatar = avatarElement || isForumTopic || asAllChats === "topics" ? void 0 : avatarNew({
			middleware: this.middlewareHelper.get(),
			size: DIALOG_AVATAR_SIZES[avatarSize],
			lazyLoadQueue: newWrapOptions.lazyLoadQueue,
			isDialog: !!meAsSaved,
			peerId: fromName ? 0 : usePeerId,
			peerTitle: fromName,
			withStories,
			withVideoAvatar: withStories,
			wrapOptions: newWrapOptions,
			meAsNotes: isSavedDialog,
			asAllChats: asAllChats === "monoforum",
			autoDeletePeriod,
			accountNumber
		});
		loadPromises?.push(avatar?.readyThumbPromise);
		const avatarEl = avatarElement || avatar?.node;
		if (avatarEl) {
			avatarEl.classList.add("dialog-avatar");
			this.applyMediaElement(avatarEl, avatarSize);
		}
		const captionDiv = this.container;
		const titleSpanContainer = this.title;
		titleSpanContainer.classList.add("user-title");
		this.titleRow.classList.add("dialog-title");
		const isActive = !dontSetActive && !autonomous && hotReloadGuard.appImManager.chat && hotReloadGuard.appImManager.isSamePeer(hotReloadGuard.appImManager.chat, {
			peerId: monoforumParentPeerId || peerId,
			monoforumThreadId: monoforumParentPeerId ? peerId : void 0,
			threadId,
			type: isSavedDialog ? ChatType.Saved : ChatType.Chat
		});
		const titleWrapOptions = {
			textColor: hotReloadGuard.appDialogsManager.getTextColor(isActive),
			...newWrapOptions
		};
		const peerTitle = this.peerTitle = new PeerTitle();
		const peerTitlePromise = peerTitle.update({
			peerId: usePeerId,
			fromName,
			dialog: meAsSaved,
			onlyFirstName,
			withIcons: !noIcons,
			threadId: isSavedDialog ? void 0 : threadId,
			wrapOptions: titleWrapOptions,
			iconsColor: hotReloadGuard.appDialogsManager.getPrimaryColor(isActive),
			meAsNotes: isSavedDialog,
			asAllChats,
			accountNumber
		});
		loadPromises?.push(peerTitlePromise);
		titleSpanContainer.append(peerTitle.element);
		const span = this.subtitle;
		const li = this.container;
		li.classList.add("chatlist-chat", "chatlist-chat-" + avatarSize);
		if (!autonomous) li.href = "#" + peerId;
		if (avatarSize === "bigger") this.container.classList.add("row-big");
		else if (avatarSize === "small") this.container.classList.add("row-small");
		li.dataset.peerId = "" + peerId;
		if (threadId) li.dataset.threadId = "" + threadId;
		if (monoforumParentPeerId) li.dataset.monoforumParentPeerId = "" + monoforumParentPeerId;
		if (asAllChats) li.dataset.isAllChats = "true";
		const statusSpan = document.createElement("span");
		statusSpan.classList.add("message-status", "sending-status");
		const lastTimeSpan = document.createElement("span");
		lastTimeSpan.classList.add("message-time");
		const rightSpan = this.titleRight;
		rightSpan.classList.add("dialog-title-details");
		rightSpan.append(statusSpan, lastTimeSpan);
		this.subtitleRow.classList.add("dialog-subtitle");
		const dom = this.dom = {
			avatarEl: avatar,
			captionDiv,
			titleSpan: peerTitle.element,
			titleSpanContainer,
			statusSpan,
			lastTimeSpan,
			lastMessageSpan: span,
			containerEl: li,
			listEl: li,
			subtitleEl: this.subtitleRow,
			titleWrapOptions
		};
		if (folderTags && this.middlewareHelper) this.folderTags = attachDialogFolderTags({
			listEl: li,
			after: this.subtitleRow,
			context: folderTags,
			middleware: this.middlewareHelper.get()
		});
		if (!autonomous) {
			li.dialogDom = dom;
			if (isMainList && !asAllChats && hotReloadGuard.appDialogsManager.forumTab?.peerId === peerId && !threadId) li.classList.add("is-forum-open");
		}
		if (isActive) hotReloadGuard.appDialogsManager.setDialogActive(li, true);
	}
	destroy() {
		this.dispose();
		this.middlewareHelper?.destroy();
		disposeTextHighlight(this.dom);
	}
	updateTitle(fromName) {
		return this.peerTitle.update({ fromName });
	}
	remove() {
		this.destroy();
		this.dom.listEl.remove();
	}
	setMuted(isMuted, transitionDuration = 0) {
		const { dom } = this;
		if (isMuted === (dom.listEl.classList.contains("is-muted") && !dom.listEl.classList.contains("backwards"))) return;
		if (isMuted && !dom.mutedIcon) {
			dom.mutedIcon = Icon("nosound_filled", "dialog-muted-icon");
			dom.titleSpanContainer.append(dom.mutedIcon);
		}
		SetTransition({
			element: dom.listEl,
			className: "is-muted",
			forwards: isMuted,
			duration: transitionDuration,
			onTransitionEnd: !isMuted ? (() => {
				dom.mutedIcon?.remove();
				delete dom.mutedIcon;
			}) : void 0
		});
	}
	/**
	* The pill a pinned row's time stands in, with the pin in front of it: drawn only while the row
	* is pinned, and kept once made, as the grip is. The time itself is rewritten by several hands
	* (the last message, search, a community row), so the pin stays out of it
	*/
	createTimePill() {
		if (this.dom.timePill) return;
		const { lastTimeSpan } = this.dom;
		const pill = this.dom.timePill = document.createElement("span");
		pill.className = "dialog-time-pill";
		lastTimeSpan.replaceWith(pill);
		pill.append(Icon("pin_status_filled", "dialog-time-pill-pin"), lastTimeSpan);
	}
	/** The grip a pinned row is dragged by, shown only while its list can be reordered */
	createSortableIcon() {
		if (this.dom.sortableIcon) return;
		const icon = this.dom.sortableIcon = createRowSortableIcon();
		this.dom.listEl.append(icon);
	}
	createUnreadBadge() {
		if (this.dom.unreadBadge) return;
		const badge = this.dom.unreadBadge = document.createElement("div");
		badge.className = `dialog-subtitle-badge badge badge-${BADGE_SIZE} dialog-subtitle-badge-unread`;
		this.dom.subtitleEl.append(badge);
	}
	createUnreadAvatarBadge() {
		if (this.dom.unreadAvatarBadge) return;
		const badge = this.dom.unreadAvatarBadge = document.createElement("div");
		badge.className = `dialog-subtitle-badge badge badge-${BADGE_SIZE} avatar-badge`;
		this.dom.listEl.append(badge);
	}
	createMentionsBadge() {
		if (this.dom.mentionsBadge) return;
		const badge = this.dom.mentionsBadge = document.createElement("div");
		badge.className = `dialog-subtitle-badge badge badge-${BADGE_SIZE} mention mention-badge dialog-subtitle-badge-mention`;
		badge.innerText = "@";
		this.dom.subtitleEl.append(badge);
	}
	createReactionsBadge() {
		if (this.dom.reactionsBadge) return;
		const badge = this.dom.reactionsBadge = document.createElement("div");
		badge.className = `dialog-subtitle-badge badge badge-${BADGE_SIZE} reaction-badge dialog-subtitle-badge-reaction`;
		badge.append(Icon("reactions_filled"));
		this.dom.subtitleEl.append(badge);
	}
	createGramBadge() {
		if (this.dom.gramBadge) return;
		const badge = this.dom.gramBadge = document.createElement("div");
		badge.className = `dialog-subtitle-badge badge badge-${BADGE_SIZE} dialog-subtitle-badge-gram`;
		const label = i18n("Wallet.ChatList.UnreadTransfer");
		label.classList.add("sr-only");
		badge.append(Icon("gram_filled"), label);
		this.dom.subtitleEl.append(badge);
	}
	createPollVotesBadge() {
		if (this.dom.pollVotesBadge) return;
		const badge = this.dom.pollVotesBadge = document.createElement("div");
		badge.className = `dialog-subtitle-badge badge badge-${BADGE_SIZE} poll-vote-badge dialog-subtitle-badge-pollvote`;
		badge.append(Icon("poll"));
		this.dom.subtitleEl.append(badge);
	}
	createBotAppButton() {
		if (this.dom.botAppButton) return;
		const button = this.dom.botAppButton = Button(`dialog-subtitle-badge badge badge-${BADGE_SIZE} btn-color-primary dialog-subtitle-badge-bot-app`, {
			text: "Open",
			noRipple: true,
			asDiv: !Modes.a11y
		});
		const { titleSpan } = this.dom;
		titleSpan.id || (titleSpan.id = createUniqueId());
		button.setAttribute("aria-describedby", titleSpan.id);
		button.dataset.dialogListAction = "true";
		button.addEventListener("click", (e) => {
			cancelEvent(e);
			const peerId = this.dom.listEl.dataset.peerId.toPeerId();
			hotReloadGuard.appImManager.openWebApp({
				botId: peerId.toUserId(),
				main: true,
				peerId
			}).catch(noop);
		});
		this.dom.subtitleEl.append(button);
	}
	setBadgeState(options) {
		const transitionDuration = options.transitionDuration || 0;
		this.setMuted(options.muted, transitionDuration);
		const previous = this.lastBadgeState;
		const botApp = !!options.botApp;
		const wasVisible = {
			unreadBadge: !!previous?.unreadBadge,
			unreadAvatarBadge: !!previous?.unreadAvatarBadge
		};
		const mounted = {
			unreadBadge: !!this.dom.unreadBadge,
			unreadAvatarBadge: !!this.dom.unreadAvatarBadge,
			mentionsBadge: !!this.dom.mentionsBadge,
			reactionsBadge: !!this.dom.reactionsBadge,
			pollVotesBadge: !!this.dom.pollVotesBadge,
			gramBadge: !!this.dom.gramBadge,
			botAppButton: !!this.dom.botAppButton
		};
		const states = [
			["unreadBadge", options.unread],
			["unreadAvatarBadge", options.unreadAvatar],
			["mentionsBadge", options.mentions],
			["reactionsBadge", options.reactions],
			["pollVotesBadge", options.pollVotes],
			["gramBadge", !!options.gram],
			["botAppButton", botApp]
		];
		const leaving = transitionDuration && previous && liteMode.isAvailable("animations") ? states.filter(([key, visible]) => key !== "unreadAvatarBadge" && !visible && previous[key] && this.dom[key]).map(([key]) => key) : [];
		this.dom.listEl.classList.toggle(PINNED_DIALOG_CLASS_NAME, !!options.pinned);
		if (options.pinned) {
			this.createSortableIcon();
			this.createTimePill();
		}
		if (options.unread) this.createUnreadBadge();
		if (options.unreadAvatar) this.createUnreadAvatarBadge();
		if (options.mentions) this.createMentionsBadge();
		if (options.reactions) this.createReactionsBadge();
		if (options.pollVotes) this.createPollVotesBadge();
		if (options.gram) this.createGramBadge();
		if (botApp) this.createBotAppButton();
		const coming = states.filter(([key, visible]) => {
			const badge = this.dom[key];
			return key !== "unreadAvatarBadge" && visible && badge && (!mounted[key] || !badge.parentElement || badge.classList.contains("is-held-in-place"));
		}).map(([key]) => ({
			key,
			badge: this.dom[key]
		}));
		if (leaving.length || this.pendingHolds && coming.length) {
			coming.forEach(({ badge }) => badge.classList.contains("is-held-in-place") || badge.remove());
			this.holdBadgesInPlace(leaving, coming);
		} else for (const { badge } of coming) if (!badge.parentElement && !this.waitingBadges?.has(badge)) this.subtitleRow.append(badge);
		for (const [key, visible] of states) {
			if (!this.dom[key]) continue;
			if (mounted[key] && previous?.[key] === visible) continue;
			this.toggleBadgeByKey(key, visible, mounted[key], !transitionDuration);
		}
		const unreadDirection = (options.unreadCount ?? 0) - (previous?.unreadCount ?? 0);
		const rollUnread = !!transitionDuration && !!previous && !previous.unreadMention === !options.unreadMention;
		const setUnreadText = (key, text) => {
			setRollingText({
				element: this.dom[key],
				text,
				direction: unreadDirection,
				animate: rollUnread && mounted[key] && wasVisible[key]
			});
		};
		if (options.unread && this.dom.unreadBadge) {
			if (options.unreadText !== void 0 && options.unreadText !== previous?.unreadText) {
				setUnreadText("unreadBadge", options.unreadText);
				if (this.dom.unreadAvatarBadge) setUnreadText("unreadAvatarBadge", options.unreadText);
			}
			this.dom.unreadBadge.classList.add("unread");
			this.dom.unreadBadge.classList.toggle("mention", !!options.unreadMention);
		}
		if (options.unreadAvatar && this.dom.unreadAvatarBadge) {
			if (options.unreadAvatarText !== void 0 && options.unreadAvatarText !== previous?.unreadAvatarText) setUnreadText("unreadAvatarBadge", options.unreadAvatarText);
			this.dom.unreadAvatarBadge.classList.add("unread");
			this.dom.unreadAvatarBadge.classList.toggle("mention", !!options.unreadMention);
		}
		this.lastBadgeState = {
			unreadBadge: options.unread,
			unreadAvatarBadge: options.unreadAvatar,
			mentionsBadge: options.mentions,
			reactionsBadge: options.reactions,
			pollVotesBadge: options.pollVotes,
			gramBadge: !!options.gram,
			botAppButton: botApp,
			unreadText: options.unreadText,
			unreadCount: options.unreadCount,
			unreadMention: options.unreadMention,
			unreadAvatarText: options.unreadAvatarText
		};
	}
	/** what the unread badge says - its DOM holds the plain text only while the count stands still */
	get unreadText() {
		return this.lastBadgeState?.unreadText;
	}
	/**
	* Lifts the leaving badges out of the subtitle's flow, each where it stands: the message takes the
	* room they leave as they start going and comes out from under them, as in the mobile apps, rather
	* than widening in one step once they are gone. Their places are read with the other rows' reads,
	* before anything is written (`sequentialDom`) - a whole folder read at once lets go of many badges
	* in one task - and the badges `coming` in their place, or back, go in (or out of their hold) only then
	*/
	holdBadgesInPlace(keys, coming) {
		const row = this.subtitleRow;
		const isStill = ({ key, badge }, shown) => {
			return this.dom[key] === badge && !!this.lastBadgeState?.[key] === shown;
		};
		const waiting = this.waitingBadges ?? (this.waitingBadges = /* @__PURE__ */ new Set());
		coming.forEach(({ badge }) => waiting.add(badge));
		this.pendingHolds = (this.pendingHolds || 0) + 1;
		const leaving = keys.map((key) => ({
			key,
			badge: this.dom[key]
		}));
		let places = [];
		sequentialDom.measure(() => {
			if (!row.isConnected) return;
			const isRTL = langPack_default.getIsRTL();
			const width = row.clientWidth;
			places = leaving.filter((badge) => {
				return isStill(badge, false) && badge.badge.parentElement === row && !!badge.badge.offsetParent;
			}).map(({ badge }) => ({
				badge,
				top: badge.offsetTop,
				inlineEnd: isRTL ? badge.offsetLeft : width - badge.offsetLeft - badge.offsetWidth
			}));
		});
		sequentialDom.mutate(() => {
			--this.pendingHolds;
			for (const { badge, top, inlineEnd } of places) {
				badge.style.setProperty("--held-top", top + "px");
				badge.style.setProperty("--held-inline-end", inlineEnd + "px");
				badge.classList.add("is-held-in-place");
			}
			for (const badge of coming) {
				waiting.delete(badge.badge);
				if (isStill(badge, true)) {
					badge.badge.classList.remove("is-held-in-place");
					if (badge.badge.parentElement !== row) row.append(badge.badge);
				}
			}
		});
	}
	toggleBadgeByKey(key, hasBadge, justCreated, batch) {
		if (this.lastBadgeState) this.lastBadgeState[key] = hasBadge;
		if (hasBadge && !this.waitingBadges?.has(this.dom[key])) this.dom[key].classList.remove("is-held-in-place");
		SetTransition({
			element: this.dom[key],
			className: "is-visible",
			forwards: hasBadge,
			duration: batch ? 0 : 250,
			onTransitionEnd: hasBadge ? void 0 : () => {
				this.dom[key].remove();
				delete this.dom[key];
			},
			useRafs: !justCreated || !isInDOM(this.dom[key]) ? 2 : 0
		});
	}
};
//#endregion
export { getFolderTitleTextColor as a, setPromiseMiddleware as c, findDialogListElement as i, DialogElement as n, isRenderedSubtitleIntact as o, disposeTextHighlight as r, setDialogSubtitle as s, DIALOG_AVATAR_SIZES as t };
