//# allFunctionsCalledOnLoad
import { n as rootScope } from "./rootScope-CZS0lmz8.js";
import { C as createSignal, N as onMount, i as For, p as createComponent } from "./solid-9Vxm0VIz.js";
import { c as insert, g as template } from "./web-BPyQozky.js";
import { i as Row } from "./confirmationPopup-Bz6mK0o-.js";
import { i as usePromiseCollector } from "./mediaHeader-CnpQNwOl.js";
import { a as Section } from "./emailVerification-C8QYZSyu.js";
import { n as useSuperTab } from "./superTabProvider-LtveyH7W.js";
import { t as RadioFieldTsx } from "./radioFieldTsx-kmtuN4Dv.js";
import { t as ReactionStickerPreview } from "./reactionStickerPreview-1AWURcyU.js";
//#region src/components/sidebarLeft/tabs/quickReaction.tsx
var _tmpl$ = /*#__PURE__*/ template(`<form>`);
var QuickReaction = () => {
	const [tab] = useSuperTab();
	const promiseCollector = usePromiseCollector();
	const [reactions, setReactions] = createSignal([]);
	const [selectedReaction, setSelectedReaction] = createSignal();
	onMount(() => {
		tab.container.classList.add("quick-reaction-container");
	});
	promiseCollector.collect((async () => {
		const [quickReaction, availableReactions] = await Promise.all([rootScope.managers.appReactionsManager.getQuickReaction(), rootScope.managers.appReactionsManager.getAvailableReactions()]);
		setReactions(availableReactions.filter((reaction) => !reaction.pFlags.inactive));
		setSelectedReaction(quickReaction.reaction);
	})());
	return createComponent(Section, { get children() {
		var _el$ = _tmpl$();
		insert(_el$, createComponent(For, {
			get each() {
				return reactions();
			},
			children: (availableReaction) => {
				return createComponent(Row, {
					havePadding: true,
					get children() {
						return [
							createComponent(Row.RadioField, { get children() {
								return createComponent(RadioFieldTsx, {
									alignRight: true,
									"class": "disable-hover",
									get checked() {
										return selectedReaction() === availableReaction.reaction;
									},
									name: "quick-reaction",
									get value() {
										return availableReaction.reaction;
									},
									onChange: (checked) => {
										if (!checked) return;
										setSelectedReaction(availableReaction.reaction);
										rootScope.managers.appReactionsManager.setDefaultReaction({
											_: "reactionEmoji",
											emoticon: availableReaction.reaction
										});
									}
								});
							} }),
							createComponent(Row.Title, {
								"class": "quick-reaction-title",
								get children() {
									return availableReaction.title;
								}
							}),
							createComponent(ReactionStickerPreview, { get sticker() {
								return availableReaction.static_icon;
							} })
						];
					}
				});
			}
		}));
		return _el$;
	} });
};
//#endregion
export { QuickReaction as default };
