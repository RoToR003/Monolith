//# allFunctionsCalledOnLoad
import { n as rootScope } from "./rootScope-CZS0lmz8.js";
import { a as i18n } from "./langPack-BmdJGr44.js";
import { C as createSignal, N as onMount, p as createComponent, s as Show, x as createRoot } from "./solid-9Vxm0VIz.js";
import { _ as use, c as insert, g as template } from "./web-BPyQozky.js";
import { r as useHotReloadGuard } from "./hotReloadGuard-BUNVkeQ4.js";
import { n as hotReloadGuard } from "./hotReloadGuardProvider-CHEsZRuG.js";
import { t as getFirstChild } from "./dist-Fd6wPWkH.js";
import { t as Button } from "./buttonTsx-Bwphkm9r.js";
import { i as usePromiseCollector } from "./mediaHeader-CnpQNwOl.js";
import { a as Section } from "./emailVerification-C8QYZSyu.js";
import { t as ButtonMenuToggle } from "./buttonMenuToggle-1aKRQh1m.js";
import { n as useSuperTab } from "./superTabProvider-LtveyH7W.js";
import { a as profileStoriesButtonMenu, r as StoriesProfileList, t as createSharedMediaScrollDateBadge } from "./sharedMediaScrollDateBadge-CcjBOjgJ.js";
//#region src/components/sidebarLeft/tabs/myStories.tsx
var _tmpl$ = /*#__PURE__*/ template(`<div class=search-super>`);
var _tmpl$2 = /*#__PURE__*/ template(`<div class="my-stories-placeholder hide"><div class=sticker-container></div><div class=caption>`);
var MyStories = () => {
	const [tab] = useSuperTab();
	const promiseCollector = usePromiseCollector();
	const { lottieLoader } = useHotReloadGuard();
	const p = tab.payload;
	const isArchive = !!p.isArchive;
	const chatId = p.chatId;
	const initialAlbumId = p.initialAlbumId;
	let stickerContainer;
	let placeholder;
	let storiesContainer;
	let storiesActions;
	let selection;
	let setAlbum;
	let state;
	const showPlaceholder = !(isArchive && !chatId);
	const [archiveCaption, setArchiveCaption] = createSignal(isArchive && !chatId ? "ProfileStoriesArchiveHint" : void 0);
	const openArchive = () => {
		tab.slider.createTab(hotReloadGuard.tabs.AppMyStoriesTab).open({
			...hotReloadGuard.tabs.AppMyStoriesTab.getInitArgs(),
			isArchive: true,
			chatId
		});
	};
	onMount(() => {
		tab.header.classList.add("with-border");
		tab.container.classList.add("chat-folders-container", `${isArchive ? "archive" : "my"}-stories-container`);
		const middleware = tab.middlewareHelper.get();
		let loadPromise;
		const scrollDateBadge = createSharedMediaScrollDateBadge({
			mount: (element) => storiesContainer.querySelector(".stories-album-wrapper").before(element),
			getAnchorTop: () => tab.scrollable.container.getBoundingClientRect().top,
			getItems: () => storiesContainer.querySelectorAll(".stories-album-content .search-super-item[data-timestamp]")
		});
		const onAdditionalScroll = tab.scrollable.onAdditionalScroll;
		const updateScrollDateBadge = () => {
			onAdditionalScroll?.();
			scrollDateBadge.update(true);
		};
		tab.scrollable.onAdditionalScroll = updateScrollDateBadge;
		middleware.onClean(() => {
			if (tab.scrollable.onAdditionalScroll === updateScrollDateBadge) tab.scrollable.onAdditionalScroll = onAdditionalScroll;
			scrollDateBadge.destroy();
		});
		createRoot((dispose) => {
			middleware.onClean(() => {
				storiesActions = void 0;
				selection = void 0;
				dispose();
			});
			const { render: storiesList, actions, selection: selection_, setAlbum: setAlbum_, state: state_ } = StoriesProfileList({
				peerId: chatId?.toPeerId(true) ?? rootScope.myId,
				pinned: !isArchive,
				archive: isArchive,
				initialAlbumId,
				scrollable: tab.scrollable,
				listenerSetter: tab.listenerSetter,
				withSelection: true,
				onCountChange: (length) => {
					if (placeholder) placeholder.classList.toggle("hide", length > 0);
				},
				onReady: () => {
					storiesContainer.append(getFirstChild(storiesList, (v) => v instanceof Element));
				}
			});
			storiesActions = actions;
			selection = selection_;
			setAlbum = setAlbum_;
			tab.setAlbum = setAlbum_;
			state = state_;
			loadPromise = storiesActions.load();
		});
		tab.scrollable.onScrolledBottom = () => {
			storiesActions.load();
		};
		const menuBtn = ButtonMenuToggle({
			listenerSetter: tab.listenerSetter,
			direction: "bottom-left",
			buttonOptions: { ariaLabel: "MultiAccount.More" },
			buttons: [
				...profileStoriesButtonMenu({
					peerId: rootScope.myId,
					isArchive,
					slider: tab.slider,
					verify: () => true,
					onAlbumCreated: (albumId) => setAlbum(albumId),
					canEdit: () => state.canEdit
				}),
				{
					icon: "select",
					text: "Message.Context.Select",
					onClick: () => {
						selection.toggleSelection(true, true);
					},
					verify: () => !!(selection && !selection.isSelecting)
				},
				{
					icon: "select",
					text: "Message.Context.Selection.Clear",
					onClick: () => {
						selection.cancelSelection();
					},
					verify: () => !!selection?.isSelecting
				}
			]
		});
		tab.header.append(menuBtn);
		promiseCollector.collect(Promise.all([
			!isArchive && p.animationData.then(async (cb) => {
				const player = await cb({
					container: stickerContainer,
					loop: false,
					autoplay: false,
					width: 100,
					height: 100,
					middleware
				});
				return lottieLoader.waitForFirstFrame(player);
			}),
			chatId && tab.managers.appChatsManager.isBroadcast(chatId).then((isBroadcast) => {
				setArchiveCaption(isBroadcast ? "ProfileStoriesArchiveChannelHint" : "ProfileStoriesArchiveGroupHint");
			}),
			loadPromise
		]));
	});
	return [
		createComponent(Show, {
			get when() {
				return archiveCaption();
			},
			get children() {
				return createComponent(Section, {
					get caption() {
						return archiveCaption();
					},
					noShadow: true
				});
			}
		}),
		(() => {
			var _el$ = _tmpl$();
			var _ref$ = storiesContainer;
			typeof _ref$ === "function" ? use(_ref$, _el$) : storiesContainer = _el$;
			return _el$;
		})(),
		createComponent(Show, {
			when: showPlaceholder,
			get children() {
				var _el$2 = _tmpl$2(), _el$3 = _el$2.firstChild, _el$4 = _el$3.nextSibling;
				var _ref$2 = placeholder;
				typeof _ref$2 === "function" ? use(_ref$2, _el$2) : placeholder = _el$2;
				var _ref$3 = stickerContainer;
				typeof _ref$3 === "function" ? use(_ref$3, _el$3) : stickerContainer = _el$3;
				insert(_el$4, () => i18n("MyStories.Subtitle"));
				insert(_el$2, createComponent(Button, {
					"class": "btn-primary btn-color-primary btn-control",
					text: "MyStories.ShowArchive",
					onClick: openArchive
				}), null);
				return _el$2;
			}
		})
	];
};
//#endregion
export { MyStories as default };
