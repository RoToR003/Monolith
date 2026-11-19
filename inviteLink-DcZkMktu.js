//# allFunctionsCalledOnLoad
import { p as setDirection } from "./langPack-BmdJGr44.js";
import { t as ripple } from "./ripple-D7hcIc_t.js";
import { n as attachClickEvent } from "./clickEvent-COk4YpLP.js";
import { t as Button } from "./button-DpTvniRN.js";
import { H as wrapPlainText } from "./canPollPeerStories-D3HoBvLX.js";
import { r as toastNew } from "./toast-B6VD5M7R.js";
import { t as ButtonIcon } from "./buttonIcon-CthJWloV.js";
import { r as copyTextToClipboard } from "./clipboard-DzscV-ca.js";
import { t as ButtonMenuToggle } from "./buttonMenuToggle-1aKRQh1m.js";
import { t as MiddleEllipsisElement } from "./middleEllipsis-BLGR6PDz.js";
import { n as shareUrlToPeers } from "./shareUrl-BIbwyho4.js";
//#region src/components/sidebarLeft/tabs/inviteLink.ts
var InviteLink = class {
	constructor({ buttons, button, onButtonClick, listenerSetter, url, noRightButton, onClick, class: className }) {
		this.copyLink = (url = this.url) => {
			copyTextToClipboard(url);
			toastNew({ langPackKey: "LinkCopied" });
		};
		this.shareLink = (url = this.url) => {
			shareUrlToPeers({
				url,
				openAfter: true
			});
		};
		this.onButtonClick = onButtonClick;
		const linkContainer = this.container = document.createElement("div");
		linkContainer.classList.add("invite-link-container");
		if (className) linkContainer.classList.add(...className.split(" ").filter(Boolean));
		const link = document.createElement("div");
		link.classList.add("invite-link", "rp-overflow");
		const text = this.textElement = document.createElement("div");
		text.classList.add("invite-link-text");
		let rightButton;
		if (buttons) rightButton = ButtonMenuToggle({
			buttons,
			direction: "bottom-left",
			buttonOptions: {
				noRipple: true,
				ariaLabel: "MultiAccount.More"
			},
			listenerSetter
		});
		else if (!noRightButton) {
			rightButton = ButtonIcon("copy", {
				noRipple: true,
				ariaLabel: "CopyLink"
			});
			attachClickEvent(rightButton, () => this.copyLink(), { listenerSetter });
		}
		if (rightButton) rightButton.classList.add("invite-link-menu");
		if (!button && button !== false) {
			button = Button("", { text: "ShareLink" });
			this.buttonText = button.lastElementChild;
			attachClickEvent(button, () => {
				if (this.onButtonClick) this.onButtonClick();
				else this.shareLink();
			}, { listenerSetter });
		}
		const buttonElements = button ? Array.isArray(button) ? button : [button] : [];
		buttonElements.forEach((element) => {
			element.className = "btn-primary btn-color-primary invite-link-button";
		});
		this.button = buttonElements[0];
		let buttonsElement;
		if (buttonElements.length > 1) {
			buttonsElement = document.createElement("div");
			buttonsElement.classList.add("invite-link-buttons");
			buttonsElement.append(...buttonElements);
		} else buttonsElement = buttonElements[0];
		if (url) this.setUrl(url);
		ripple(link);
		link.append(...[text, rightButton].filter(Boolean));
		linkContainer.append(link, buttonsElement || "");
		attachClickEvent(link, onClick || (() => this.copyLink()), { listenerSetter });
	}
	setUrl(url) {
		let s = url;
		if (s.includes("//")) s = url.split("//").slice(1).join("//");
		const element = MiddleEllipsisElement.create();
		setDirection(element);
		element.textContent = wrapPlainText(s);
		this.textElement.replaceChildren(element);
		this.url = url;
	}
};
//#endregion
export { InviteLink as t };
