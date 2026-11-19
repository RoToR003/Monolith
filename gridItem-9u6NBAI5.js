//# allFunctionsCalledOnLoad
import { h as Modes } from "./userAgent-ByGXcznk.js";
import { t as Icon } from "./icon-DbP6Es97.js";
import { u as langPack_default } from "./langPack-BmdJGr44.js";
import { g as createEffect } from "./solid-9Vxm0VIz.js";
import { t as buttonKeyDown } from "./buttonKeyDown-CqZzefS3.js";
import { L as formatFullSentTime } from "./index-B7axFZql.js";
import { Gt as getPeerTitle } from "./confirmationPopup-Bz6mK0o-.js";
import { y as getStoryPrivacyType } from "./getChatMigratedTo-ChhMNXuu.js";
import { t as formatNumber } from "./formatNumber-B_dJh0pa.js";
import { r as wrapStoryMedia } from "./preview-B0twIh_m.js";
//#region src/components/stories/privacyIcons.ts
/** The glyph each audience of a story is shown with: in the viewer's header, on a profile's tiles */
var STORY_PRIVACY_ICONS = {
	close: "star_filled",
	contacts: "newprivate_filled",
	public: "newchannel_filled",
	selected: "newgroup_filled"
};
/** What the audiences a tile marks are called, for whoever cannot see the glyph */
var STORY_PRIVACY_TITLES = {
	close: "StoryPrivacyOptionCloseFriends",
	contacts: "Contacts",
	selected: "StoryPrivacyOptionSelectedContacts"
};
//#endregion
//#region src/components/stories/gridItem.tsx
/**
* A story in a grid of them — a profile's, a search's: its picture, which opens the story. Stories of different
* peers say whose each one is (`withAuthor`); one's own say, as on iOS and Android, how many have seen them and
* who can (`own`), and which are pinned to the top (`pinned`)
*/
function wrapStoryGridItem(props) {
	const label = () => `${langPack_default.format("OpenStory", true)}, ${formatFullSentTime(props.storyItem.date).textContent}`;
	const wrapped = wrapStoryMedia({
		peerId: props.peerId,
		storyItem: props.storyItem,
		forPreview: true,
		noAspecter: true,
		containerProps: {
			"data-mid": props.storyItem.id,
			"data-peer-id": props.peerId,
			"data-timestamp": props.storyItem.date,
			"class": "grid-item search-super-item",
			"role": "button",
			"tabindex": Modes.a11y ? 0 : void 0,
			"aria-label": label(),
			"onKeyDown": buttonKeyDown,
			"onClick": props.onClick
		},
		childrenClassName: "grid-item-media",
		noPlayButton: true
	});
	let author, badges;
	const setLabel = () => {
		wrapped.container.setAttribute("aria-label", [
			author,
			label(),
			badges
		].filter(Boolean).join(", "));
	};
	if (props.withAuthor) getPeerTitle({
		peerId: props.peerId,
		plainText: true
	}).then((title) => {
		author = title;
		setLabel();
	});
	if (props.own || props.pinned) attachStoryGridBadges(wrapped.div, props.storyItem, props.own, props.pinned, (text) => {
		badges = text;
		setLabel();
	});
	return wrapped;
}
/**
* The badges go on the tile itself: a video's own element is not on it until it plays. The corner says what sets a
* story apart — being pinned to the top, or else who can see it; the bottom how many have seen it, in the pill a
* video's duration has elsewhere. Only whoever posted a story is ever sent its views and its audience.
*/
function attachStoryGridBadges(tile, story, own = () => false, pinned = () => false, onLabel) {
	let cornerIcon, cornerIconName;
	let views, viewsCount;
	let text = "";
	createEffect(() => {
		let iconName, audience;
		if (pinned()) iconName = "pin2_filled";
		else if (own() && story._ === "storyItem") {
			const privacyType = getStoryPrivacyType(story);
			if (privacyType && privacyType !== "public") {
				iconName = STORY_PRIVACY_ICONS[privacyType];
				audience = langPack_default.format(STORY_PRIVACY_TITLES[privacyType], true);
			}
		}
		if (cornerIconName !== iconName) {
			cornerIcon?.remove();
			cornerIcon = iconName && Icon(iconName, "grid-item-corner-icon", ...iconName === "pin2_filled" ? ["is-pin"] : []);
			cornerIconName = iconName;
			if (cornerIcon) tile.append(cornerIcon);
		}
		const viewsNumber = own() && story.views?.views_count;
		if (viewsNumber) {
			if (!views) {
				views = document.createElement("span");
				views.classList.add("video-time", "grid-item-views");
				views.setAttribute("aria-hidden", "true");
				views.append(Icon("eye1_filled", "grid-item-views-icon"), viewsCount = document.createElement("span"));
				tile.append(views);
			}
			viewsCount.textContent = formatNumber(viewsNumber, 1);
		} else if (views) {
			views.remove();
			views = void 0;
		}
		const newText = [viewsNumber && langPack_default.format("Views", true, [viewsNumber]), audience].filter(Boolean).join(", ");
		if (newText !== text) onLabel(text = newText);
	});
}
//#endregion
export { STORY_PRIVACY_ICONS as n, wrapStoryGridItem as t };
