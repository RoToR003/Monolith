//# allFunctionsCalledOnLoad
import { h as Modes } from "./userAgent-ByGXcznk.js";
import { W as copy } from "./objectUrlUtils-5x08MNuO.js";
import { m as getAbbreviation } from "./apiManagerProxy-DmQXvxSF.js";
import { c as GENERAL_TOPIC_ID, x as TOPIC_COLORS } from "./rootScope-CZS0lmz8.js";
import { c as deepEqual } from "./encryptedStorageLayer-gN9TBXzg.js";
import { a as i18n, u as langPack_default } from "./langPack-BmdJGr44.js";
import { C as createSignal, p as createComponent } from "./solid-9Vxm0VIz.js";
import { r as useHotReloadGuard } from "./hotReloadGuard-BUNVkeQ4.js";
import { a as makeMediaSize } from "./mediaSizes-C1MTaleW.js";
import { n as attachClickEvent } from "./clickEvent-COk4YpLP.js";
import { t as InputField } from "./inputField-CaCo30N0.js";
import { W as wrapTopicIcon, i as Row, s as CheckboxFieldTsx } from "./confirmationPopup-Bz6mK0o-.js";
import { i as usePromiseCollector } from "./mediaHeader-CnpQNwOl.js";
import { a as Section } from "./emailVerification-C8QYZSyu.js";
import { r as wrapSolidComponent } from "./wrapSolidComponent-BASCjNJG.js";
import { t as ButtonIcon } from "./buttonIcon-CthJWloV.js";
import { t as toggleDisability } from "./toggleDisability-2oUcKWqw.js";
import { n as useSuperTab } from "./superTabProvider-LtveyH7W.js";
import { a as EmojiTab } from "./emoticonsDropdown-Cb_qGCUN.js";
//#region src/components/sidebarRight/tabs/editTopic.tsx
var size = 64;
var mediaSize = makeMediaSize(size, size);
var EditTopic = () => {
	const [tab] = useSuperTab();
	const promiseCollector = usePromiseCollector();
	const { appImManager, appSidebarLeft } = useHotReloadGuard();
	const { peerId, threadId } = tab.payload;
	let colorIndex = 0;
	let topic;
	let originalTopic;
	let iconDiv;
	let emojiElement;
	let confirmBtn;
	let nameInputField;
	const validate = () => {
		let isChanged = nameInputField.isValidToChange();
		if (!isChanged && originalTopic) isChanged = topic.icon_emoji_id !== originalTopic.icon_emoji_id;
		confirmBtn.classList.toggle("hide", !isChanged);
	};
	const s = () => {
		if (topic?.icon_color) colorIndex = TOPIC_COLORS.indexOf(topic.icon_color);
		return setIcon(topic?.icon_emoji_id, void 0, true);
	};
	const setIcon = async (iconEmojiId, appendTo = iconDiv, force) => {
		const title = nameInputField.value;
		const isMainIcon = appendTo === iconDiv;
		if (isMainIcon) {
			const newTopic = {
				id: topic?.id,
				icon_color: TOPIC_COLORS[colorIndex],
				title: getAbbreviation(title, true).text || "A",
				icon_emoji_id: iconEmojiId
			};
			const oldTopic = topic;
			topic = newTopic;
			if (force || !oldTopic || oldTopic.icon_color !== newTopic.icon_color || oldTopic.title !== newTopic.title) setIcon(void 0, emojiElement);
			if (deepEqual(oldTopic, newTopic) && !force) return;
			validate();
		}
		const el = await wrapTopicIcon({
			topic: isMainIcon ? topic : {
				...topic,
				icon_emoji_id: void 0
			},
			customEmojiSize: mediaSize,
			middleware: tab.middlewareHelper.get()
		});
		const span = document.createElement("div");
		span.classList.add("edit-topic-icon");
		span.append(el);
		const oldEl = appendTo.lastElementChild;
		appendTo.append(span);
		const applyFadeAnimation = (el, fadeIn) => {
			const animation = el.animate([{
				opacity: "0",
				transform: "scale(0.8)"
			}, {
				opacity: "1",
				transform: "scale(1)"
			}], {
				duration: 200,
				iterations: 1,
				easing: "ease-in-out",
				fill: "forwards",
				direction: fadeIn ? "normal" : "reverse"
			});
			return new Promise((resolve) => {
				animation.addEventListener("finish", () => {
					resolve();
				}, { once: true });
			});
		};
		if (oldEl) applyFadeAnimation(oldEl, false).then(() => oldEl.remove());
		applyFadeAnimation(span, true);
	};
	promiseCollector.collect((async () => {
		colorIndex = 0;
		const isGeneral = threadId === GENERAL_TOPIC_ID;
		tab.container.classList.add("edit-topic-container");
		if (threadId) topic = originalTopic = copy(await tab.managers.dialogsStorage.getForumTopic(peerId, threadId));
		{
			iconDiv = document.createElement("div");
			iconDiv.classList.add("edit-topic-icon-container");
			if (!threadId) {
				iconDiv.setAttribute("role", "button");
				if (Modes.a11y) iconDiv.tabIndex = 0;
				iconDiv.setAttribute("aria-label", langPack_default.format("AccDescr.ChangeTopicColor", true));
			}
			!threadId && attachClickEvent(iconDiv, () => {
				if (topic.icon_emoji_id) return;
				colorIndex = (colorIndex + 1) % TOPIC_COLORS.length;
				setIcon();
			}, { listenerSetter: tab.listenerSetter });
			if (threadId) iconDiv.classList.add("disable-hover");
			const inputWrapper = document.createElement("div");
			inputWrapper.classList.add("input-wrapper");
			nameInputField = new InputField({
				label: "ForumTopic.Name.Placeholder",
				withLinebreaks: false,
				name: "topic-name",
				maxLength: 70,
				required: true
			});
			if (topic) nameInputField.setOriginalValue(topic.title, true);
			confirmBtn = ButtonIcon("check btn-confirm blue hide", {
				noRipple: true,
				ariaLabel: "Save"
			});
			tab.header.append(confirmBtn);
			attachClickEvent(confirmBtn, () => {
				const toggle = toggleDisability([confirmBtn], true);
				if (threadId) tab.managers.appMessagesManager.editForumTopic({
					peerId,
					topicId: threadId,
					title: nameInputField.value,
					iconEmojiId: topic.icon_emoji_id || 0
				}).then(() => {
					tab.close();
				}).catch((err) => {
					console.error("edit topic error", err);
					toggle();
				});
				else tab.managers.appMessagesManager.createForumTopic({
					peerId,
					iconColor: TOPIC_COLORS[colorIndex],
					iconEmojiId: topic.icon_emoji_id,
					title: nameInputField.value
				}).then((threadId) => {
					tab.close();
					appImManager.setInnerPeer({
						peerId,
						threadId
					});
				}).catch((err) => {
					console.error("create topic error", err);
					toggle();
				});
			}, { listenerSetter: tab.listenerSetter });
			tab.listenerSetter.add(nameInputField.input)("input", () => {
				validate();
				setIcon(topic?.icon_emoji_id);
			});
			inputWrapper.append(nameInputField.container);
			tab.scrollable.append(wrapSolidComponent(() => createComponent(Section, {
				name: isGeneral ? "CreateGeneralTopicTitle" : "CreateTopicTitle",
				get children() {
					return [iconDiv, inputWrapper];
				}
			}), tab.middlewareHelper.get()));
		}
		const promises = [];
		if (!isGeneral) {
			let sectionContent;
			const section = wrapSolidComponent(() => createComponent(Section, {
				"class": "edit-topic-emoticons-container",
				contentProps: { ref: (element) => sectionContent = element }
			}), tab.middlewareHelper.get());
			const emojiTab = new EmojiTab({
				managers: tab.managers,
				isStandalone: true,
				noRegularEmoji: true,
				mainSets: () => {
					return tab.managers.appStickersManager.getLocalStickerSet("inputStickerSetEmojiDefaultTopicIcons").then((messagesStickerSet) => messagesStickerSet.documents.map((doc) => doc.id));
				},
				onClick: (emoji) => {
					emojiTab.setActive(!emoji.docId ? {
						emoji: void 0,
						docId: void 0
					} : emoji);
					setIcon(emoji.docId);
				}
			});
			emojiTab.getContainerSize = () => ({
				width: appSidebarLeft.rect.width,
				height: 400
			});
			tab.middlewareHelper.onDestroy(() => {
				emojiTab.destroy();
			});
			emojiTab.container.classList.remove("tabs-tab");
			emojiElement = document.createElement("span");
			emojiElement.classList.add("super-emoji-topic-icon");
			const promise = emojiTab.init().then(async () => {
				const category = emojiTab.getCustomCategory();
				const iconEmojiId = topic?.icon_emoji_id;
				emojiTab.addEmojiToCategory({
					category,
					element: emojiElement,
					batch: false,
					prepend: true,
					active: !iconEmojiId
				});
				if (iconEmojiId) emojiTab.setActive({
					docId: iconEmojiId,
					emoji: ""
				});
			});
			promises.push(promise);
			sectionContent.replaceWith(emojiTab.container);
			tab.scrollable.append(section);
		} else {
			const hiddenSignal = createSignal(!topic.pFlags.hidden);
			const [busy, setBusy] = createSignal(false);
			const section = wrapSolidComponent(() => createComponent(Section, {
				caption: "EditTopicHideInfo",
				get children() {
					return createComponent(Row, {
						get disabled() {
							return busy();
						},
						get children() {
							return [createComponent(Row.CheckboxFieldToggle, { get children() {
								return createComponent(CheckboxFieldTsx, {
									get disabled() {
										return busy();
									},
									signal: hiddenSignal,
									toggle: true,
									onChange: (checked) => {
										const promise = tab.managers.appMessagesManager.editForumTopic({
											peerId,
											topicId: threadId,
											hidden: !checked
										});
										setBusy(true);
										promise.finally(() => setBusy(false));
									}
								});
							} }), createComponent(Row.Title, { get children() {
								return i18n("EditTopicHide");
							} })];
						}
					});
				}
			}), tab.middlewareHelper.get());
			tab.scrollable.append(section);
		}
		await Promise.all(promises);
		await s();
	})());
	return null;
};
//#endregion
export { EditTopic as default };
