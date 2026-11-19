//# allFunctionsCalledOnLoad
import "./rootScope-CZS0lmz8.js";
import { a as i18n } from "./langPack-BmdJGr44.js";
import { d as render } from "./web-BPyQozky.js";
import { n as hotReloadGuard } from "./hotReloadGuardProvider-CHEsZRuG.js";
import { Ct as getArchiveContextMenuButtons, wt as StoriesList } from "./appDialogsManager-CXguiKc3.js";
import { i as usePromiseCollector } from "./mediaHeader-CnpQNwOl.js";
import { a as fastSmoothScrollToStart } from "./scrollable-C2-FwBtK.js";
import { t as ButtonMenuToggle } from "./buttonMenuToggle-1aKRQh1m.js";
import { n as useSuperTab } from "./superTabProvider-LtveyH7W.js";
//#region src/components/sidebarLeft/tabs/archivedTab.tsx
var ArchivedTab = () => {
	const [tab] = useSuperTab();
	const promiseCollector = usePromiseCollector();
	const filterId = 1;
	const wasFilterId = hotReloadGuard.appDialogsManager.filterId;
	let disposeStories;
	let autonomousDialogList;
	const renderStories = () => {
		disposeStories = render(() => {
			return StoriesList({
				foldInto: tab.title,
				setScrolledOn: tab.container,
				getScrollable: () => autonomousDialogList.scrollable.container,
				listenWheelOn: tab.content,
				archive: true,
				offsetX: -64,
				resizeCallback: (callback) => {},
				onExpand: () => {
					const container = autonomousDialogList.scrollable.container;
					tab.container.classList.add("scrolled-start");
					fastSmoothScrollToStart(container, "y");
				}
			});
		}, storiesListContainer);
	};
	const appendMenu = () => {
		const buttonMenu = ButtonMenuToggle({
			icon: "more",
			buttonOptions: { ariaLabel: "MultiAccount.More" },
			buttons: getArchiveContextMenuButtons(),
			direction: "bottom-left"
		});
		tab.header.append(buttonMenu);
	};
	tab._onOpenAfterTimeout = () => {
		renderStories();
		hotReloadGuard.appDialogsManager.xds[wasFilterId].clear();
	};
	tab._onClose = () => {
		delete hotReloadGuard.appDialogsManager.xds[filterId];
		tab.scrollable.onAdditionalScroll = void 0;
		hotReloadGuard.appDialogsManager.setFilterIdAndChangeTab(wasFilterId);
	};
	tab._onCloseAfterTimeout = () => {
		disposeStories?.();
		disposeStories = void 0;
		autonomousDialogList.destroy();
		autonomousDialogList = void 0;
	};
	tab.container.id = "chats-archived-container";
	tab.title.replaceChildren(i18n("ArchivedChats"));
	tab.header.classList.add("can-have-forum");
	tab.content.classList.add("can-have-forum");
	appendMenu();
	if (!hotReloadGuard.appDialogsManager.xds[filterId]) {
		const { ul, scrollable } = hotReloadGuard.appDialogsManager.l({
			title: void 0,
			id: filterId,
			localId: 1
		});
		scrollable.append(ul);
	}
	autonomousDialogList = hotReloadGuard.appDialogsManager.xds[filterId];
	const storiesListContainer = document.createElement("div");
	storiesListContainer.classList.add("stories-list");
	tab.header.after(storiesListContainer);
	const scrollable = autonomousDialogList.scrollable;
	tab.scrollable.container.replaceWith(scrollable.container);
	scrollable.attachBorderListeners(tab.container);
	promiseCollector.collect(hotReloadGuard.appDialogsManager.setFilterIdAndChangeTab(filterId).then(() => {}));
	return null;
};
//#endregion
export { ArchivedTab as default };
