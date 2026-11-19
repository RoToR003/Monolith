//# allFunctionsCalledOnLoad
import { ft as PeerTitle } from "./confirmationPopup-Bz6mK0o-.js";
//#region src/components/buttonMenuPeerText.ts
/**
* The two lines of a menu item that stands for a person (`avatarInfo` gives it the avatar): the name, and under
* it what the item says about them — when they reacted, where it leads. `title` is the name the caller has waited for
* (wrapPeerTitle), when the menu must open with it in place.
*/
function ButtonMenuPeerText(peerId, subtitle, title) {
	const container = document.createElement("span");
	container.classList.add("btn-menu-item-peer");
	title || (title = new PeerTitle({
		peerId,
		dialog: false
	}).element);
	title.classList.add("btn-menu-item-peer-title");
	const subtitleElement = document.createElement("span");
	subtitleElement.classList.add("btn-menu-item-peer-subtitle");
	subtitleElement.append(subtitle);
	container.append(title, subtitleElement);
	return container;
}
//#endregion
export { ButtonMenuPeerText as t };
