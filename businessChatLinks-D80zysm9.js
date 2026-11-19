//# allFunctionsCalledOnLoad
import { g as getPeerActiveUsernames } from "./objectUrlUtils-5x08MNuO.js";
import { t as apiManagerProxy } from "./apiManagerProxy-DmQXvxSF.js";
import { n as rootScope } from "./rootScope-CZS0lmz8.js";
import { a as i18n, p as setDirection } from "./langPack-BmdJGr44.js";
import { C as createSignal, _ as createMemo, b as createResource, i as For, p as createComponent, s as Show } from "./solid-9Vxm0VIz.js";
import { s as useAppConfig } from "./contentSettings-DMhHR-0w.js";
import { u as memo } from "./web-BPyQozky.js";
import { u as wrapRichText } from "./renderer-L80wjxct.js";
import { t as InputField } from "./inputField-CaCo30N0.js";
import { i as Row, t as confirmationPopup } from "./confirmationPopup-Bz6mK0o-.js";
import { C as PrivacyType, S as getPrivacyRulesDetails } from "./getChatMigratedTo-ChhMNXuu.js";
import { i as usePromiseCollector, t as MediaHeader } from "./mediaHeader-CnpQNwOl.js";
import { t as anchorCallback } from "./anchorCallback-BbwAJdBk.js";
import { a as Section } from "./emailVerification-C8QYZSyu.js";
import { r as toastNew } from "./toast-B6VD5M7R.js";
import { r as copyTextToClipboard } from "./clipboard-DzscV-ca.js";
import { n as shareUrlToPeers } from "./shareUrl-BIbwyho4.js";
import { n as useSuperTab } from "./superTabProvider-LtveyH7W.js";
import { t as attachPlainMessageEditor } from "./plainField-DIjPnqVa.js";
import { t as UsernameRow } from "./usernameRow-_ciwjIjr.js";
//#region src/components/sidebarLeft/tabs/businessChatLinks.tsx
/** What the clients take when the app config names no limit (tdesktop's fallback). */
var DEFAULT_LINKS_LIMIT = 100;
/** The name only the owner sees: Android's and iOS's cap on it. */
var BUSINESS_CHAT_LINK_NAME_MAX_LENGTH = 32;
/** The formatting a message typed into a chat carries — no rich-message blocks. */
var MESSAGE_FORMATTING = [
	"bold",
	"italic",
	"underline",
	"strikethrough",
	"monospace",
	"spoiler",
	"quote",
	"link"
];
var stripHttps = (link) => link.replace(/^https:\/\//, "");
var copyLink = (url) => {
	copyTextToClipboard(url);
	toastNew({ langPackKey: "LinkCopied" });
};
var BusinessChatLinksTab = () => {
	const [tab] = useSuperTab();
	const promiseCollector = usePromiseCollector();
	const loadPromise = Promise.resolve(tab.payload.links).catch((err) => {
		console.error("getBusinessChatLinks error:", err);
		toastNew({ langPackKey: "Error.AnError" });
		return [];
	});
	promiseCollector.collect(loadPromise);
	const [links] = createResource(() => loadPromise);
	return [createComponent(MediaHeader, {
		marginBottom: true,
		get children() {
			return [
				createComponent(MediaHeader.Sticker, {
					get animationData() {
						return tab.payload.animationData;
					},
					size: 130,
					restartOnClick: false
				}),
				createComponent(MediaHeader.Title, { get children() {
					return i18n("PremiumBusinessChatLinks");
				} }),
				createComponent(MediaHeader.Subtitle, { get children() {
					return i18n("BusinessLinksInfo");
				} })
			];
		}
	}), createComponent(Show, {
		get when() {
			return links();
		},
		get children() {
			return createComponent(BusinessChatLinksList, { get links() {
				return links();
			} });
		}
	})];
};
/**
* The message a link fills the composer with: a field with the chat input's formatting, in the same
* box as the fact check's. Resolves with nothing when it is cancelled.
*/
async function editLinkMessage(managers, link) {
	const { message_length_max: maxLength } = await managers.apiManager.getConfig();
	const inputField = new InputField({
		placeholder: "BusinessLinksEnter",
		withLinebreaks: true,
		maxLength,
		canHaveFormatting: MESSAGE_FORMATTING
	});
	const editor = attachPlainMessageEditor(inputField.input);
	if (link?.message) inputField.setValueSilently({
		text: link.message,
		entities: link.entities
	});
	try {
		await confirmationPopup({
			titleLangKey: link ? "BusinessLinkEditTitle" : "BusinessLinkNewTitle",
			descriptionLangKey: "BusinessLinksIntro",
			inputField,
			button: { langKey: link ? "Save" : "Create" }
		});
		const { value, entities } = editor.getRichValue(true);
		return {
			message: value,
			entities
		};
	} catch {
		return;
	} finally {
		editor.destroy();
	}
}
/** The name only the owner sees, in Android's rename box. Resolves with nothing when it is cancelled. */
async function editLinkName(link) {
	const inputField = new InputField({
		label: "BusinessLinksNamePlaceholder",
		plainText: true,
		maxLength: BUSINESS_CHAT_LINK_NAME_MAX_LENGTH
	});
	inputField.setValueSilently(link.title || "");
	try {
		await confirmationPopup({
			titleLangKey: "BusinessLinksRenameTitle",
			descriptionLangKey: "BusinessLinksRenameMessage",
			inputField,
			button: { langKey: "Done" }
		});
		return inputField.value.trim();
	} catch {
		return;
	}
}
function BusinessChatLinksList(props) {
	const [tab] = useSuperTab();
	const managers = tab.managers;
	const appConfig = useAppConfig();
	const [links, setLinks] = createSignal(props.links.slice().reverse());
	const [creating, setCreating] = createSignal(false);
	const linksLimit = () => appConfig.business_chat_links_limit || DEFAULT_LINKS_LIMIT;
	const simpleLinksCaption = createSimpleLinksCaption(managers);
	const replaceLink = (link) => {
		setLinks((links) => links.map((item) => item.link === link.link ? link : item));
	};
	const latest = (link) => links().find((item) => item.link === link.link) || link;
	const create = async () => {
		if (creating()) return;
		const message = await editLinkMessage(managers);
		if (!message) return;
		setCreating(true);
		try {
			const link = await managers.appBusinessManager.createBusinessChatLink(message);
			setLinks((links) => [link, ...links]);
			toastNew({ langPackKey: "BusinessLinkSaved" });
		} catch (err) {
			console.error("createBusinessChatLink error:", err);
			toastNew({ langPackKey: "Error.AnError" });
		} finally {
			setCreating(false);
		}
	};
	/**
	* Sends only the part the user changed: the manager puts one link's edits out one at a time and takes
	* the rest from what the edits before left, so a rename does not bring back the message an edit on its
	* way replaces.
	*/
	const edit = async (link, changes, savedLangKey) => {
		try {
			replaceLink(await managers.appBusinessManager.editBusinessChatLink(link.link, changes));
			if (savedLangKey) toastNew({ langPackKey: savedLangKey });
		} catch (err) {
			console.error("editBusinessChatLink error:", err);
			toastNew({ langPackKey: "Error.AnError" });
		}
	};
	const editMessage = async (link) => {
		const message = await editLinkMessage(managers, latest(link));
		if (message) edit(link, message, "BusinessLinkSaved");
	};
	const rename = async (link) => {
		const title = await editLinkName(latest(link));
		if (title !== void 0 && title !== (latest(link).title || "")) edit(link, { title });
	};
	const remove = async (link) => {
		try {
			await confirmationPopup({
				titleLangKey: "BusinessLinksDeleteTitle",
				descriptionLangKey: "BusinessLinksDeleteMessage",
				button: {
					langKey: "Delete",
					isDanger: true
				}
			});
		} catch {
			return;
		}
		try {
			await managers.appBusinessManager.deleteBusinessChatLink(link.link);
			setLinks((links) => links.filter((item) => item.link !== link.link));
			toastNew({ langPackKey: "BusinessLinkDeleted" });
		} catch (err) {
			console.error("deleteBusinessChatLink error:", err);
			toastNew({ langPackKey: "Error.AnError" });
		}
	};
	const menuButtons = (link) => [
		{
			icon: "copy",
			text: "Copy",
			onClick: () => copyLink(link.link)
		},
		{
			icon: "forward",
			text: "Share",
			onClick: () => shareUrlToPeers({ url: link.link })
		},
		{
			icon: "tag_name",
			text: "Rename",
			onClick: () => rename(link)
		},
		{
			icon: "edit",
			text: "Edit",
			onClick: () => editMessage(link)
		},
		{
			icon: "delete",
			text: "Delete",
			danger: true,
			onClick: () => remove(link)
		}
	];
	return createComponent(Section, {
		get caption() {
			return simpleLinksCaption();
		},
		get children() {
			return [createComponent(Show, {
				get when() {
					return links().length < linksLimit();
				},
				get children() {
					return createComponent(Row, {
						clickable: create,
						get disabled() {
							return creating();
						},
						get children() {
							return [createComponent(Row.Icon, { icon: "add" }), createComponent(Row.Title, {
								"class": "primary",
								get children() {
									return i18n("BusinessLinksAdd");
								}
							})];
						}
					});
				}
			}), createComponent(For, {
				get each() {
					return links();
				},
				children: (link) => createComponent(BusinessChatLinkRow, {
					link,
					get menuButtons() {
						return menuButtons(link);
					}
				})
			})];
		}
	});
}
function BusinessChatLinkRow(props) {
	const [tab] = useSuperTab();
	const title = () => {
		if (props.link.title) return props.link.title;
		const span = document.createElement("span");
		setDirection(span);
		span.textContent = stripHttps(props.link.link);
		return span;
	};
	return createComponent(UsernameRow, {
		ref: (element) => element.setAttribute("aria-haspopup", "menu"),
		get contextMenu() {
			return {
				buttons: props.menuButtons,
				middleware: tab.middlewareHelper.get()
			};
		},
		isLink: true,
		get title() {
			return title();
		},
		get titleRight() {
			return memo(() => !!props.link.views)() ? i18n("Clicks", [props.link.views]) : i18n("NoClicks");
		},
		titleRightSecondary: true,
		get subtitle() {
			return wrapRichText(props.link.message, {
				entities: props.link.entities,
				noLinks: true,
				noLinebreaks: true,
				middleware: tab.middlewareHelper.get()
			});
		}
	});
}
/**
* "You can also use a simple link…": the username's link, and the phone's while the number can lead
* anyone to the chat — Android's rule: it is shown to someone, or anyone may find the account by it.
* A click copies either.
*/
function createSimpleLinksCaption(managers) {
	const user = apiManagerProxy.getUser(rootScope.myId.toUserId());
	const username = user && getPeerActiveUsernames(user)[0];
	const [phoneLinkAllowed] = createResource(() => user?.phone ? Promise.all([managers.appPrivacyManager.getPrivacy("inputPrivacyKeyPhoneNumber"), managers.appPrivacyManager.getPrivacy("inputPrivacyKeyAddedByPhone")]).then(([phoneRules, addedByPhoneRules]) => getPrivacyRulesDetails(phoneRules).type !== PrivacyType.Nobody || getPrivacyRulesDetails(addedByPhoneRules).type !== PrivacyType.Contacts, () => false) : false);
	const makeLink = (path) => {
		const a = anchorCallback(() => copyLink("https://t.me/" + path));
		a.textContent = "t.me/" + path;
		a.dir = "ltr";
		return a;
	};
	return createMemo(() => {
		const links = [username && makeLink(username), phoneLinkAllowed() && makeLink("+" + user.phone)].filter(Boolean);
		if (!links.length) return;
		return i18n(links.length > 1 ? "BusinessLinksFooterTwoLinks" : "BusinessLinksFooterOneLink", links);
	});
}
//#endregion
export { BusinessChatLinksTab as default };
