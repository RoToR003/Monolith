//# allFunctionsCalledOnLoad
import { t as findUpClassName } from "./findUpClassName-3V5me58N.js";
import { t as Icon } from "./icon-DbP6Es97.js";
import { W as copy } from "./objectUrlUtils-5x08MNuO.js";
import { E as DialogColors } from "./apiManagerProxy-DmQXvxSF.js";
import { n as rootScope } from "./rootScope-CZS0lmz8.js";
import { c as deepEqual } from "./encryptedStorageLayer-gN9TBXzg.js";
import { a as i18n, u as langPack_default } from "./langPack-BmdJGr44.js";
import { C as createSignal, L as untrack, M as onCleanup, N as onMount, i as For, p as createComponent, s as Show, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { _ as use, c as insert, f as setAttribute, g as template, o as className, s as delegateEvents } from "./web-BPyQozky.js";
import { r as useHotReloadGuard } from "./hotReloadGuard-BUNVkeQ4.js";
import { n as hotReloadGuard } from "./hotReloadGuardProvider-CHEsZRuG.js";
import { o as useAppSettings } from "./liteMode-DeLStZfQ.js";
import { t as classNames } from "./classNames-DxGDjmvw.js";
import { t as IconTsx } from "./iconTsx-B4lOk4A6.js";
import { n as attachClickEvent } from "./clickEvent-COk4YpLP.js";
import { t as Button } from "./button-DpTvniRN.js";
import { F as getUnsafeRandomInt } from "./sticker-5twBOy1Y.js";
import { s as getRichValueWithCaret } from "./inputField-CaCo30N0.js";
import { t as InputFieldTsx } from "./inputFieldTsx-0SbEFdGE.js";
import { t as defineSolidElement } from "./defineSolidElement-DU5LO9SF.js";
import { Et as usePremium, c as createContextMenu, h as filterAsync, i as Row } from "./confirmationPopup-Bz6mK0o-.js";
import { Ft as trimRichText } from "./getChatMigratedTo-ChhMNXuu.js";
import { n as wrapEmojiText } from "./wrapEmojiText-DT39R5Tj.js";
import { _t as deleteFolder, xt as usePremiumFeaturesHidden } from "./appDialogsManager-CXguiKc3.js";
import { i as usePromiseCollector } from "./mediaHeader-CnpQNwOl.js";
import { a as Section, s as appendSectionContent } from "./emailVerification-C8QYZSyu.js";
import { n as unwrapSolidElement, t as mountSolidComponent } from "./wrapSolidComponent-BASCjNJG.js";
import { r as toastNew } from "./toast-B6VD5M7R.js";
import { t as ButtonIcon } from "./buttonIcon-CthJWloV.js";
import { r as copyTextToClipboard } from "./clipboard-DzscV-ca.js";
import { t as ButtonMenuToggle } from "./buttonMenuToggle-1aKRQh1m.js";
import { t as showLimitPopup } from "./limit-j5BxQxwd.js";
import { t as toggleDisability } from "./toggleDisability-2oUcKWqw.js";
import { n as useSuperTab } from "./superTabProvider-LtveyH7W.js";
import { r as attachPickerGrid } from "./useBaseTheme-kxtvTIO1.js";
import { c as FolderTag, l as FolderTagColorDot, r as getFolderTagColor, s as useFolderTagsShown, t as FOLDER_TAG_COLORS_COUNT, u as getFolderTagColorClassName } from "./folderTags-BLsLsYVO.js";
import { t as InputFieldEmoji } from "./inputFieldEmoji-uKBeWGwI.js";
//#region src/components/sidebarLeft/tabs/editFolderInput/index.tsx
var MAX_FOLDER_NAME_LENGTH = 12;
var EditFolderInput = defineSolidElement({
	name: "edit-folder-input",
	component: (props, _, controls) => {
		onCleanup(() => {
			controls.inputField.cleanup();
		});
		return createComponent(InputFieldTsx, {
			InputFieldClass: InputFieldEmoji,
			instanceRef: (value) => void (controls.inputField = value),
			label: "FilterNameHint",
			maxLength: MAX_FOLDER_NAME_LENGTH,
			get value() {
				return props.value ?? "";
			},
			get onRawInput() {
				return props.onInput;
			}
		});
	}
});
var folderTagColorSection_module_default = {
	wrapper: "_wrapper_v2z51_1",
	preview: "_preview_v2z51_5",
	noTag: "_noTag_v2z51_9",
	colors: "_colors_v2z51_17",
	option: "_option_v2z51_23",
	selected: "_selected_v2z51_49",
	circle: "_circle_v2z51_54",
	none: "_none_v2z51_65"
};
//#endregion
//#region src/components/folderTags/folderTagColorSection.tsx
var _tmpl$ = /*#__PURE__*/ template(`<span>`);
var _tmpl$2 = /*#__PURE__*/ template(`<div><div><span>`);
var _tmpl$3 = /*#__PURE__*/ template(`<div>`);
var COLOR_NAMES = {
	red: "ColorRed",
	orange: "ColorOrange",
	violet: "ColorViolet",
	green: "ColorGreen",
	cyan: "ColorCyan",
	blue: "ColorBlue",
	pink: "ColorPink"
};
/** A colour for a new folder while the tags are on - one picked at random, as Android does */
function getNewFolderTagColor() {
	return getUnsafeRandomInt(0, FOLDER_TAG_COLORS_COUNT - 1);
}
/**
* "Folder color in chat list", on the screen that edits a folder: the colours its tag can wear and
* none, with the tag as it will look above them. It is there while the tags are on - and, locked,
* for an account without Premium, which is how such an account learns of them (Desktop, Android).
*/
function FolderTagColorSection(props) {
	const isPremium = usePremium();
	const premiumFeaturesHidden = usePremiumFeaturesHidden();
	const tagsShown = useFolderTagsShown();
	const shown = () => !premiumFeaturesHidden() && (tagsShown() || !isPremium());
	const selected = () => isPremium() ? props.color() : void 0;
	const select = (color) => {
		if (!isPremium()) {
			props.onLocked();
			return;
		}
		props.onChange(color);
	};
	const preview = () => {
		const color = selected();
		const title = props.title();
		if (color !== void 0) return title?.text ? createComponent(FolderTag, {
			get ["class"]() {
				return folderTagColorSection_module_default.preview;
			},
			color,
			title
		}) : void 0;
		const key = color === void 0 && props.color() !== void 0 && !isPremium() ? "FolderTagNoColorPremium" : "FolderTagNoColor";
		return (() => {
			var _el$ = _tmpl$();
			insert(_el$, () => i18n(key));
			createRenderEffect(() => className(_el$, folderTagColorSection_module_default.noTag));
			return _el$;
		})();
	};
	const Colors = () => {
		let list;
		onMount(() => {
			onCleanup(attachPickerGrid(list, "." + folderTagColorSection_module_default.option));
		});
		return (() => {
			var _el$2 = _tmpl$2(), _el$3 = _el$2.firstChild, _el$4 = _el$3.firstChild;
			var _ref$ = list;
			typeof _ref$ === "function" ? use(_ref$, _el$2) : list = _el$2;
			insert(_el$2, createComponent(For, {
				get each() {
					return DialogColors.map((color) => COLOR_NAMES[color]);
				},
				children: (name, color) => (() => {
					var _el$5 = _tmpl$3();
					_el$5.$$click = () => select(color());
					insert(_el$5, createComponent(FolderTagColorDot, {
						get ["class"]() {
							return folderTagColorSection_module_default.circle;
						},
						get color() {
							return color();
						}
					}));
					createRenderEffect((_p$) => {
						var _v$6 = classNames(folderTagColorSection_module_default.option, getFolderTagColorClassName(color()), selected() === color() && folderTagColorSection_module_default.selected), _v$7 = selected() === color(), _v$8 = langPack_default.format(name, true);
						_v$6 !== _p$.e && className(_el$5, _p$.e = _v$6);
						_v$7 !== _p$.t && setAttribute(_el$5, "aria-pressed", _p$.t = _v$7);
						_v$8 !== _p$.a && setAttribute(_el$5, "aria-label", _p$.a = _v$8);
						return _p$;
					}, {
						e: void 0,
						t: void 0,
						a: void 0
					});
					return _el$5;
				})()
			}), _el$3);
			_el$3.$$click = () => select(void 0);
			insert(_el$4, createComponent(IconTsx, { get icon() {
				return isPremium() ? "close" : "premium_lock";
			} }));
			createRenderEffect((_p$) => {
				var _v$ = folderTagColorSection_module_default.colors, _v$2 = classNames(folderTagColorSection_module_default.option, selected() === void 0 && folderTagColorSection_module_default.selected), _v$3 = selected() === void 0, _v$4 = langPack_default.format("FolderTagNoColor", true), _v$5 = classNames(folderTagColorSection_module_default.circle, folderTagColorSection_module_default.none);
				_v$ !== _p$.e && className(_el$2, _p$.e = _v$);
				_v$2 !== _p$.t && className(_el$3, _p$.t = _v$2);
				_v$3 !== _p$.a && setAttribute(_el$3, "aria-pressed", _p$.a = _v$3);
				_v$4 !== _p$.o && setAttribute(_el$3, "aria-label", _p$.o = _v$4);
				_v$5 !== _p$.i && className(_el$4, _p$.i = _v$5);
				return _p$;
			}, {
				e: void 0,
				t: void 0,
				a: void 0,
				o: void 0,
				i: void 0
			});
			return _el$2;
		})();
	};
	return (() => {
		var _el$6 = _tmpl$3();
		insert(_el$6, createComponent(Show, {
			get when() {
				return shown();
			},
			get children() {
				return createComponent(Section, {
					name: "FolderTagColor",
					get nameRight() {
						return preview();
					},
					caption: "FolderTagColorInfo",
					get children() {
						return createComponent(Colors, {});
					}
				});
			}
		}));
		createRenderEffect(() => className(_el$6, folderTagColorSection_module_default.wrapper));
		return _el$6;
	})();
}
delegateEvents(["click"]);
//#endregion
//#region src/components/sidebarLeft/tabs/editFolder.tsx
var EditFolder = () => {
	const [tab] = useSuperTab();
	const promiseCollector = usePromiseCollector();
	const { HotReloadGuard, lottieLoader, showPremiumPopup } = useHotReloadGuard();
	const p = tab.payload;
	const flags = {};
	let animation;
	let filter;
	let originalFilter;
	let type;
	let loadAnimationPromise;
	let tempId = 0;
	let showMoreClicked = {};
	const [tagTitle, setTagTitle] = createSignal();
	const [tagColor, setTagColor] = createSignal();
	const editCheckForChange = () => {
		if (type === "edit") {
			const changed = !deepEqual({
				...originalFilter,
				updatedTime: 0,
				localId: 0
			}, {
				...filter,
				updatedTime: 0,
				localId: 0
			});
			confirmBtn.classList.toggle("hide", !changed);
			menuBtn.classList.toggle("hide", changed);
		}
	};
	const toggleExcludedPeers = () => {
		excludePeerIds.classList.toggle("hide", filter?._ === "dialogFilterChatlist");
	};
	const onCreateOpen = () => {
		tab.title.replaceChildren(i18n("FilterNew"));
		menuBtn.classList.add("hide");
		confirmBtn.classList.remove("hide");
		for (const flag in flags) flags[flag].style.display = "none";
	};
	const onEditOpen = () => {
		const _tempId = ++tempId;
		tab.title.replaceChildren(i18n(type === "create" ? "FilterNew" : "FilterHeaderEdit"));
		if (type === "edit") {
			menuBtn.classList.remove("hide");
			confirmBtn.classList.add("hide");
		}
		const _filter = filter;
		nameInputField.feedProps({ value: _filter.title });
		const pFlags = _filter.pFlags;
		for (const flag in flags) {
			const good = !!pFlags?.[flag];
			flags[flag].style.display = good ? "" : "none";
		}
		const promises = ["includePeerIds", "excludePeerIds"].map(async (key) => {
			let peers = _filter[key];
			if (!peers) return;
			const section = key === "includePeerIds" ? includePeerIds : excludePeerIds;
			const ul = hotReloadGuard.appDialogsManager.createChatList({ ignoreClick: true });
			const hasPeer = async (peerId) => {
				return !!await tab.managers.appMessagesManager.getDialogOnly(peerId) || (peerId.isUser() ? (await tab.managers.appUsersManager.getUser(peerId.toUserId()))._ === "user" : false);
			};
			const filtered = await filterAsync(peers, (peerId) => hasPeer(peerId));
			peers.length = 0;
			peers.push(...filtered);
			peers = peers.slice();
			const renderMore = async (_length) => {
				const peerIds = peers.splice(0, _length);
				const filtered = await filterAsync(peerIds, async (peerId) => {
					return peerId.isUser() ? true : !!await tab.managers.appMessagesManager.getDialogOnly(peerId);
				});
				if (_tempId !== tempId) return;
				const loadPromises = [];
				const containers = filtered.map((peerId) => {
					const dialogElement = hotReloadGuard.appDialogsManager.addDialogNew({
						peerId,
						rippleEnabled: false,
						meAsSaved: true,
						avatarSize: "small",
						loadPromises,
						autonomous: true,
						wrapOptions: { middleware: tab.middlewareHelper.get() }
					});
					dialogElement.container.dialogElement = dialogElement;
					const { dom } = dialogElement;
					dom.lastMessageSpan.parentElement.remove();
					return dom.containerEl;
				});
				await Promise.all(loadPromises);
				if (_tempId !== tempId) return;
				ul.append(...containers);
				if (showMore) {
					if (peers.length) {
						showMore.lastElementChild.replaceWith(i18n("FilterShowMoreChats", [peers.length]));
						showMore.classList.remove("hide");
					} else showMore.remove();
				}
			};
			let showMore;
			if (peers.length && !showMoreClicked[key]) {
				showMore = Button("folder-category-button btn btn-primary btn-transparent hide", { icon: "down" });
				showMore.classList.add("load-more", "rp-overflow");
				attachClickEvent(showMore, () => {
					showMoreClicked[key] = true;
					renderMore(Infinity);
				}, { listenerSetter: tab.listenerSetter });
				showMore.append(i18n("FilterShowMoreChats", [peers.length]));
			}
			return renderMore(showMoreClicked[key] ? Infinity : 4).then(() => {
				if (_tempId !== tempId) return;
				return () => {
					appendSectionContent(section).append(ul);
					if (showMore && peers.length) appendSectionContent(section).append(showMore);
				};
			});
		});
		return Promise.all(promises).then((callbacks) => {
			if (_tempId !== tempId) return;
			toggleExcludedPeers();
			if (tab.container) Array.from(tab.container.querySelectorAll(".chatlist, .load-more")).forEach((el) => el.parentElement.remove());
			callbacks.forEach((callback) => callback?.());
		});
	};
	const setFilter = (_filter, firstTime) => {
		if (firstTime) {
			originalFilter = _filter;
			filter = copy(_filter);
		} else filter = _filter;
		setTagTitle(filter.title);
		setTagColor(getFolderTagColor(filter));
		if (!firstTime) {
			onEditOpen();
			editCheckForChange();
		}
	};
	const setInitFilter = (_filter) => {
		if (_filter === void 0) {
			setFilter({
				_: "dialogFilter",
				id: 0,
				title: {
					_: "textWithEntities",
					text: "",
					entities: []
				},
				pFlags: {},
				pinned_peers: [],
				include_peers: [],
				exclude_peers: [],
				pinnedPeerIds: [],
				includePeerIds: [],
				excludePeerIds: [],
				...untrack(useFolderTagsShown()) ? { color: getNewFolderTagColor() } : {}
			}, true);
			type = "create";
		} else {
			setFilter(_filter, true);
			type = "edit";
		}
	};
	const updateFilter = (_filter) => {
		setFilter(_filter, false);
	};
	tab._onOpenAfterTimeout = () => {
		loadAnimationPromise.then(() => {
			animation.autoplay = true;
			animation.play();
		});
	};
	if (p.initFilter !== void 0) setInitFilter(p.initFilter);
	tab.container.classList.add("edit-folder-container");
	const caption = document.createElement("div");
	caption.classList.add("caption");
	caption.append(i18n("FilterIncludeExcludeInfo"));
	const stickerContainer = document.createElement("div");
	stickerContainer.classList.add("sticker-container");
	tempId = 0;
	showMoreClicked = {};
	const confirmBtn = ButtonIcon("check btn-confirm hide blue", { ariaLabel: "Save" });
	let deleting = false;
	const menuBtn = ButtonMenuToggle({
		listenerSetter: tab.listenerSetter,
		direction: "bottom-left",
		buttonOptions: { ariaLabel: "MultiAccount.More" },
		buttons: [{
			icon: "delete",
			className: "danger",
			text: "FilterMenuDelete",
			onClick: () => {
				if (deleting) return;
				deleteFolder(filter.id).then(() => {
					tab.close();
				}).finally(() => {
					deleting = false;
				});
			}
		}]
	});
	menuBtn.classList.add("hide");
	tab.header.append(confirmBtn, menuBtn);
	const [appSettings] = useAppSettings();
	const hasFoldersSidebar = appSettings.tabsInSidebar;
	const nameInputField = new EditFolderInput();
	nameInputField.HotReloadGuard = HotReloadGuard;
	nameInputField.classList.add("input-wrapper");
	nameInputField.feedProps({ onInput: () => {
		const { value, entities } = getRichValueWithCaret(nameInputField.controls.inputField.input);
		filter.title = {
			_: "textWithEntities",
			...trimRichText(value || "", entities || [])
		};
		setTagTitle(filter.title);
		editCheckForChange();
	} });
	const inputSection = unwrapSolidElement(createComponent(Section, {
		caption: hasFoldersSidebar ? "EditFolder.EmojiAsIconTip" : void 0,
		children: nameInputField
	}));
	const generateList = (className, h2Text, buttons, to, captionKey) => {
		const section = unwrapSolidElement(createComponent(Section, {
			"class": `folder-list ${className}`,
			name: h2Text,
			caption: captionKey,
			noDelimiter: true
		}));
		const categories = appendSectionContent(section);
		categories.classList.add("folder-categories");
		buttons.forEach((o, idx) => {
			const button = Button("folder-category-button btn btn-primary btn-transparent" + (idx === 0 ? " primary" : " disable-hover"), {
				icon: o.icon,
				text: o.text,
				noRipple: o.withRipple ? void 0 : true
			});
			if (o.name) to[o.name] = button;
			categories.append(button);
		});
		return section;
	};
	const includePeerIdsButtons = [
		{
			icon: "add",
			text: "ChatList.Filter.Include.AddChat",
			withRipple: true
		},
		{
			text: "ChatList.Filter.Contacts",
			icon: "newprivate",
			name: "contacts"
		},
		{
			text: "ChatList.Filter.NonContacts",
			icon: "noncontacts",
			name: "non_contacts"
		},
		{
			text: "ChatList.Filter.Groups",
			icon: "group",
			name: "groups"
		},
		{
			text: "ChatList.Filter.Channels",
			icon: "channel",
			name: "broadcasts"
		},
		{
			text: "ChatList.Filter.Bots",
			icon: "bots",
			name: "bots"
		}
	];
	const includePeerIds = generateList("folder-list-included", "FilterInclude", includePeerIdsButtons, flags, "FilterIncludeInfo");
	const excludePeerIdsButtons = [
		{
			icon: "minus",
			text: "FilterRemoveChats",
			withRipple: true
		},
		{
			text: "ChatList.Filter.MutedChats",
			icon: "mute",
			name: "exclude_muted"
		},
		{
			text: "ChatList.Filter.Archive",
			icon: "archive",
			name: "exclude_archived"
		},
		{
			text: "ChatList.Filter.ReadChats",
			icon: "readchats",
			name: "exclude_read"
		}
	];
	const excludePeerIds = generateList("folder-list-excluded", "FilterExclude", excludePeerIdsButtons, flags, "FilterExcludeInfo");
	const tagColorSection = mountSolidComponent(() => createComponent(FolderTagColorSection, {
		title: tagTitle,
		color: tagColor,
		onChange: (color) => {
			if (color === void 0) delete filter.color;
			else filter.color = color;
			setTagColor(color);
			editCheckForChange();
		},
		onLocked: () => showPremiumPopup({ feature: "folder_tags" })
	}), tab.middlewareHelper.get()).element;
	const inviteLinks = generateList("folder-list-links", "InviteLinks", [{
		icon: "add",
		text: "SharedFolder.CreateLink",
		withRipple: true
	}], {}, "SharedFolder.Description");
	tab.scrollable.append(stickerContainer, caption, inputSection, includePeerIds, excludePeerIds, tagColorSection, inviteLinks);
	toggleExcludedPeers();
	const includedFlagsContainer = includePeerIds.querySelector(".folder-categories");
	const excludedFlagsContainer = excludePeerIds.querySelector(".folder-categories");
	const inviteLinksCreate = inviteLinks.querySelector(".btn");
	attachClickEvent(includedFlagsContainer.querySelector(".btn"), () => {
		tab.slider.createTab(hotReloadGuard.tabs.AppIncludedChatsTab).open({
			filter,
			type: "included",
			onSetFilter: (f) => setFilter(f, false)
		});
	}, { listenerSetter: tab.listenerSetter });
	attachClickEvent(excludedFlagsContainer.querySelector(".btn"), () => {
		tab.slider.createTab(hotReloadGuard.tabs.AppIncludedChatsTab).open({
			filter,
			type: "excluded",
			onSetFilter: (f) => setFilter(f, false)
		});
	}, { listenerSetter: tab.listenerSetter });
	const confirmEditing = (closeAfter) => {
		if (nameInputField.controls?.inputField?.input.classList.contains("error") ?? true) return;
		if (!nameInputField.controls?.inputField?.value.trim()) {
			nameInputField.controls?.inputField?.input.classList.add("error");
			return;
		}
		let include = Array.from(includedFlagsContainer.children).slice(1).reduce((acc, el) => acc + +!el.style.display, 0);
		include += filter.include_peers.length;
		if (!include) {
			toastNew({ langPackKey: "EditFolder.Toast.ChooseChat" });
			return;
		}
		confirmBtn.setAttribute("disabled", "true");
		let promise;
		if (!filter.id) promise = tab.managers.filtersStorage.createDialogFilter(filter);
		else {
			if (closeAfter) postponeFilterUpdate = true;
			promise = tab.managers.filtersStorage.updateDialogFilter(filter);
		}
		return promise.then((dialogFilter) => {
			if (closeAfter) tab.close();
			return dialogFilter;
		}).catch((err) => {
			postponeFilterUpdate = false;
			if (postponedFilterUpdate) {
				updateFilter(postponedFilterUpdate);
				postponedFilterUpdate = void 0;
			}
			if (err.type === "DIALOG_FILTERS_TOO_MUCH") showLimitPopup("folders");
			else console.error("updateDialogFilter error:", err);
			throw err;
		}).finally(() => {
			confirmBtn.removeAttribute("disabled");
		});
	};
	attachClickEvent(confirmBtn, () => {
		confirmEditing(true);
	}, { listenerSetter: tab.listenerSetter });
	let postponedFilterUpdate;
	let postponeFilterUpdate = false;
	tab.listenerSetter.add(rootScope)("filter_update", (updatedFilter) => {
		if (filter.id === updatedFilter.id) {
			if (postponeFilterUpdate) postponedFilterUpdate = updatedFilter;
			else updateFilter(updatedFilter);
		}
	});
	const reloadMissingPromises = type === "edit" ? [
		tab.managers.filtersStorage.reloadMissingPeerIds(filter.id, "pinned_peers"),
		tab.managers.filtersStorage.reloadMissingPeerIds(filter.id, "include_peers"),
		tab.managers.filtersStorage.reloadMissingPeerIds(filter.id, "exclude_peers")
	] : [];
	promiseCollector.collect(Promise.all([
		tab.managers.apiManager.getLimit("chatlistInvites"),
		tab.managers.apiManager.getLimit("chatlistInvites", true),
		loadAnimationPromise = p.animationData.then(async (cb) => {
			const player = await cb({
				container: stickerContainer,
				loop: false,
				autoplay: false,
				width: 86,
				height: 86
			});
			animation = player;
			return lottieLoader.waitForFirstFrame(player);
		}),
		...reloadMissingPromises
	]).then(([chatlistInvitesLimit, chatlistInvitesPremiumLimit]) => {
		if (type === "edit") {
			setFilter(originalFilter, true);
			onEditOpen();
		} else {
			setInitFilter();
			onCreateOpen();
		}
		tab.managers.filtersStorage.getExportedInvites(filter.id).catch((err) => {
			if (err.type === "FILTER_NOT_SUPPORTED") return [];
			throw err;
		}).then((chatlistInvites) => {
			const CLASS_NAME = "usernames";
			const content = appendSectionContent(inviteLinks);
			const map = /* @__PURE__ */ new Map();
			const invitesMap = /* @__PURE__ */ new Map();
			const onLinksLengthChange = () => {
				inviteLinksCreate.classList.toggle("hide", map.size >= chatlistInvitesPremiumLimit);
			};
			const onLinkDeletion = (link) => {
				const row = invitesMap.get(link.url);
				if (row) {
					row.dispose();
					row.container.remove();
					invitesMap.delete(link.url);
					map.delete(row.container);
					onLinksLengthChange();
				}
			};
			const updateLink = (row, chatlistInvite) => {
				const title = chatlistInvite.title && chatlistInvite.title !== filter.title.text ? wrapEmojiText(chatlistInvite.title) : chatlistInvite.url.replace(/(.+?):\/\//, "");
				const subtitle = i18n("SharedFolder.Includes", [i18n("Chats", [chatlistInvite.peers.length])]);
				row.title.replaceChildren(title);
				row.subtitle.replaceChildren(subtitle);
			};
			const wrapLink = (chatlistInvite) => {
				let title;
				let subtitle;
				const mounted = mountSolidComponent(() => createComponent(Row, {
					clickable: true,
					"class": `${CLASS_NAME}-username active`,
					get children() {
						return [
							createComponent(Row.Title, { ref(r$) {
								var _ref$ = title;
								typeof _ref$ === "function" ? _ref$(r$) : title = r$;
							} }),
							createComponent(Row.Subtitle, { ref(r$) {
								var _ref$2 = subtitle;
								typeof _ref$2 === "function" ? _ref$2(r$) : subtitle = r$;
							} }),
							createComponent(Row.Media, {
								size: "medium",
								"class": `${CLASS_NAME}-username-icon`,
								get children() {
									return Icon("link");
								}
							})
						];
					}
				}), tab.middlewareHelper.get());
				const row = {
					container: mounted.element,
					title,
					subtitle,
					dispose: mounted.dispose
				};
				updateLink(row, chatlistInvite);
				content.append(row.container);
				map.set(row.container, chatlistInvite);
				invitesMap.set(chatlistInvite.url, row);
				onLinksLengthChange();
			};
			let target;
			createContextMenu({
				buttons: [{
					icon: "copy",
					text: "CopyLink",
					onClick: () => copyTextToClipboard(map.get(target).url)
				}, {
					icon: "delete",
					className: "danger",
					text: "Delete",
					onClick: () => {
						const chatlistInvite = map.get(target);
						tab.managers.filtersStorage.deleteExportedInvite(filter.id, chatlistInvite.url).then(() => {
							onLinkDeletion(chatlistInvite);
						});
					}
				}],
				listenTo: content,
				listenerSetter: tab.listenerSetter,
				findElement: (e) => findUpClassName(e.target, "row"),
				onOpen: (e, _target) => target = _target
			});
			attachClickEvent(inviteLinksCreate, async () => {
				if (map.size >= chatlistInvitesLimit) {
					showLimitPopup("chatlistInvites");
					return;
				}
				if (!filter.title) {
					toastNew({ langPackKey: "SharedFolder.Toast.NeedName" });
					return;
				}
				const pFlags = filter.pFlags;
				if (pFlags) {
					if ([includePeerIdsButtons, excludePeerIdsButtons].some((buttons) => {
						return buttons.some((button) => !!pFlags[button.name]);
					})) {
						toastNew({ langPackKey: "SharedFolder.Toast.NoTypes" });
						return;
					}
				}
				if (filter.excludePeerIds?.length) {
					toastNew({ langPackKey: "SharedFolder.Toast.NoExcluded" });
					return;
				}
				const toggle = toggleDisability([inviteLinksCreate], true);
				try {
					const result = confirmEditing(false);
					if (!(result instanceof Promise)) throw "";
					const f = await result;
					updateFilter(f);
					type = "edit";
					originalFilter = f;
					editCheckForChange();
				} catch (err) {
					toggle();
					return;
				}
				tab.managers.filtersStorage.exportChatlistInvite({
					...filter,
					_: "dialogFilterChatlist",
					pFlags: filter._ === "dialogFilter" ? { has_my_invites: true } : filter.pFlags
				}).then((exportedChatlistInvite) => {
					toggle();
					openChatlistInvite(exportedChatlistInvite.invite).finally(() => {
						wrapLink(exportedChatlistInvite.invite);
					});
				}, (err) => {
					toggle();
					if (err.type === "INVITES_TOO_MUCH" || err.type === "FILTERS_TOO_MUCH" || err.type === "CHATLISTS_TOO_MUCH") {
						showLimitPopup("chatlistInvites");
						return;
					} else if (err.type === "PEERS_LIST_EMPTY" || err.type === "CHAT_ADMIN_REQUIRED") {
						openChatlistInvite();
						return;
					}
					throw err;
				});
			}, { listenerSetter: tab.listenerSetter });
			const openChatlistInvite = (chatlistInvite) => {
				const row = invitesMap.get(chatlistInvite?.url);
				const sharedTab = tab.slider.createTab(hotReloadGuard.tabs.AppSharedFolderTab);
				sharedTab.eventListener.addEventListener("delete", () => {
					onLinkDeletion(chatlistInvite);
				});
				sharedTab.eventListener.addEventListener("edit", (chatlistInvite) => {
					map.set(row.container, chatlistInvite);
					updateLink(row, chatlistInvite);
				});
				return sharedTab.open({
					filter,
					chatlistInvite
				});
			};
			attachClickEvent(content, (e) => {
				const target = findUpClassName(e.target, "row");
				const chatlistInvite = map.get(target);
				if (!chatlistInvite) return;
				openChatlistInvite(chatlistInvite);
			}, { listenerSetter: tab.listenerSetter });
			chatlistInvites.forEach(wrapLink);
		});
	}));
	return null;
};
//#endregion
export { EditFolder as default };
