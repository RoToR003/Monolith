//# allFunctionsCalledOnLoad
import { a as i18n } from "./langPack-BmdJGr44.js";
import { p as createComponent } from "./solid-9Vxm0VIz.js";
import { r as setButtonLoader } from "./putPreloader-Bxq7N1RV.js";
import { t as Button } from "./button-DpTvniRN.js";
import { t as AppSelectPeers } from "./appSelectPeers-BYpCZNpe.js";
import { a as Section } from "./emailVerification-C8QYZSyu.js";
import { n as unwrapSolidElement } from "./wrapSolidComponent-BASCjNJG.js";
import { n as useSuperTab } from "./superTabProvider-LtveyH7W.js";
import { t as ButtonCorner } from "./buttonCorner-HdHn23eT.js";
//#region src/components/sidebarLeft/tabs/addMembers.tsx
var AddMembersTab = () => {
	const [tab] = useSuperTab();
	const { type, placeholder, takeOut, skippable, selectedPeerIds, selectedExtras, extraCategories, extraCategoriesSectionLangKey, peersSectionLangKey, peerType, channelParticipantsPeerId, peerLoader, exceptSelf, filterPeerTypeBy, limit, limitCallback } = tab.payload;
	tab.container.classList.add("add-members-container");
	const nextBtn = ButtonCorner({
		icon: "arrow_next",
		ariaLabel: "Next"
	});
	tab.content.append(nextBtn);
	tab.scrollable.container.remove();
	nextBtn.addEventListener("click", () => {
		const all = selector.getSelected();
		const peerIds = [];
		const extras = /* @__PURE__ */ new Set();
		for (const sel of all) if (sel.isPeerId()) peerIds.push(sel.toPeerId());
		else extras.add(sel);
		const result = takeOut(peerIds, extras);
		if (skippable && !(result instanceof Promise)) tab.close();
		else if (result instanceof Promise) attachToPromise(result);
		else if (result === void 0) tab.close();
	});
	const isPrivacy = type === "privacy";
	const selector = new AppSelectPeers({
		middleware: tab.middlewareHelper.get(),
		appendTo: tab.content,
		onChange: skippable ? null : (length) => {
			nextBtn.classList.toggle("is-visible", !!length);
		},
		peerType: peerType || [peerLoader ? "custom" : channelParticipantsPeerId ? "channelParticipants" : isPrivacy ? "dialogs" : "contacts"],
		peerId: channelParticipantsPeerId,
		getMoreCustom: peerLoader,
		placeholder,
		sectionNameLangPackKey: peersSectionLangKey,
		exceptSelf: exceptSelf ?? (isPrivacy || !!channelParticipantsPeerId || !!peerLoader),
		filterPeerTypeBy: filterPeerTypeBy ?? (isPrivacy ? ["isAnyGroup", "isUser"] : void 0),
		managers: tab.managers,
		design: isPrivacy ? "round" : "square",
		checkboxSide: isPrivacy ? "right" : "left"
	});
	if (limit) {
		const add = selector.add.bind(selector);
		selector.add = (options) => {
			const selectedPeersCount = [...selector.selected].filter((key) => typeof key !== "string").length;
			if (typeof options.key !== "string" && !selector.selected.has(options.key) && selectedPeersCount >= limit) {
				limitCallback?.();
				return false;
			}
			return add(options);
		};
	}
	if (extraCategories?.length) {
		const categoriesByKey = new Map(extraCategories.map((c) => [c.key, c]));
		const categoryButtons = extraCategories.map((cat) => {
			const button = Button("btn-primary btn-transparent folder-category-button", {
				icon: cat.icon,
				text: cat.text
			});
			button.dataset.peerId = cat.key;
			button.append(selector.checkbox());
			return button;
		});
		const categoriesSection = unwrapSolidElement(createComponent(Section, {
			"class": "folder-categories",
			noDelimiter: true,
			name: extraCategoriesSectionLangKey,
			children: categoryButtons
		}));
		const _add = selector.add.bind(selector);
		selector.add = ({ key, title, scroll, fireOnChange, fallbackIcon }) => {
			const cat = typeof key === "string" ? categoriesByKey.get(key) : void 0;
			return _add({
				key,
				title: cat ? i18n(cat.text) : title,
				scroll,
				fireOnChange,
				fallbackIcon: cat ? cat.icon : fallbackIcon
			});
		};
		selector.scrollable.append(categoriesSection, selector.scrollable.container.lastElementChild);
	}
	const initialPeerIds = selectedPeerIds || [];
	const initialAll = [...selectedExtras ? [...selectedExtras] : [], ...initialPeerIds];
	if (initialAll.length) selector.addInitial(initialAll);
	nextBtn.disabled = false;
	nextBtn.classList.toggle("is-visible", skippable);
	function attachToPromise(promise) {
		const removeLoader = setButtonLoader(nextBtn, "arrow_next");
		promise.then((result) => {
			if (result === false) {
				removeLoader();
				return;
			}
			tab.close();
		}, () => {
			removeLoader();
		});
	}
	tab.payload.attachToPromise = attachToPromise;
	return [];
};
//#endregion
export { AddMembersTab as default };
