//# allFunctionsCalledOnLoad
import { t as doubleRaf } from "./schedulers-Cx0-7a1P.js";
import { t as Icon } from "./icon-DbP6Es97.js";
import { n as rootScope } from "./rootScope-CZS0lmz8.js";
import { a as i18n, r as _i18n } from "./langPack-BmdJGr44.js";
import { t as clamp } from "./clamp-9UaNhw6N.js";
import { n as hotReloadGuard } from "./hotReloadGuardProvider-CHEsZRuG.js";
import { t as liteMode } from "./liteMode-DeLStZfQ.js";
import { n as animateSingle } from "./animation-Dd3Xpw_9.js";
import { r as showPeerPopup } from "./confirmationPopup-Bz6mK0o-.js";
import { n as easeInOutSineApply } from "./easeInOutSine-Dxgh7RmF.js";
import { t as RangeSelector } from "./rangeSelector-Bspn3Z0a.js";
//#region src/components/limit.ts
var LimitLine = class {
	constructor(options) {
		this.setHintActive = () => {
			this.hint.classList.add("active");
		};
		let container;
		let hint;
		if (options.hint) {
			container = document.createElement("div");
			container.classList.add("limit-line-container");
			hint = this.hint = document.createElement("div");
			hint.classList.add("limit-line-hint", "is-locked");
			const i = Icon(options.hint.icon, "limit-line-hint-icon");
			hint.append(i);
			if (options.hint.content) hint.append(options.hint.content);
			this.hintNoStartEnd = options.hint.noStartEnd;
			container.append(hint);
		}
		const limit = options.slider ? this.constructSlider(options) : this.constructLine(options, container);
		this.container = container || limit;
		if (container) {
			if (limit) container.append(limit);
		}
	}
	constructLine(options, container) {
		const limit = this.line = document.createElement("div");
		limit.classList.add("limit-line");
		if (!container) limit.classList.add("is-alone");
		const left = this.left = document.createElement("div");
		left.classList.add("limit-line-part", "limit-line-empty");
		const right = this.right = document.createElement("div");
		right.classList.add("limit-line-part", "limit-line-filled");
		if (options.progress) {
			right.classList.add("limit-line-absolute");
			if (options.progress !== true) this.setProgressElements(options.progress);
		}
		if (options.limitPremium !== void 0) {
			if (options.limitFree === void 0) _i18n(left, "LimitFree");
			else left.append(i18n("LimitFree"), "" + options.limitFree);
			if (options.color !== void 0) right.style.setProperty("--limit-background", options.color);
			limit.append(right);
			right.append(i18n("LimitPremium"), "" + options.limitPremium);
		}
		limit.append(left, right);
		return limit;
	}
	constructSlider(options) {
		const range = new RangeSelector({
			step: 1e-4,
			min: 0,
			max: 1,
			useProperty: true,
			offsetAxisValue: 30
		}, options.sliderValue ?? 0);
		range.setListeners();
		range.setHandlers({ onScrub: options.slider });
		range.container.classList.add("limit-line-slider");
		return this.line = range.container;
	}
	setProgressElements(progress) {
		this.left.replaceChildren(progress.from1, progress.to1);
		this.right.replaceChildren(progress.from2, progress.to2);
	}
	setProgress(progress, hintContent, elements) {
		const lastProgress = this.lastProgress;
		if (this.hint) {
			this.hint.classList.remove("is-locked");
			if (hintContent) this.hint.replaceChildren(this.hint.firstElementChild, hintContent);
		}
		const set = (value) => {
			this.container.style.setProperty("--limit-progress", value * 100 + "%");
			if (this.hint) {
				const t = .1;
				if (this.hintNoStartEnd) this.hint.style.setProperty("--limit-progress", clamp(value, t, .9) * 100 + "%");
				else {
					this.hint.classList.toggle("is-start", value <= t);
					this.hint.classList.toggle("is-end", value >= .9);
				}
			}
		};
		if (lastProgress !== void 0 && liteMode.isAvailable("motion")) {
			const duration = 200;
			const startTime = Date.now();
			const toAdd = progress - this.lastProgress;
			animateSingle(() => {
				const v = (Date.now() - startTime) / duration;
				const value = lastProgress + easeInOutSineApply(toAdd * v, 1);
				set(value);
				return v < 1;
			}, this.container);
		} else set(progress);
		if (elements) this.setProgressElements(elements);
		this.lastProgress = progress;
	}
	_setHintActive() {
		if (liteMode.isAvailable("motion")) doubleRaf().then(this.setHintActive);
		else this.setHintActive();
	}
};
//#endregion
//#region src/components/popups/limit.ts
var PIN_LIMIT = {
	title: "LimitReached",
	description: "LimitReachedPinDialogs",
	descriptionPremium: "LimitReachedPinDialogsPremium",
	descriptionLocked: "LimitReachedPinDialogsLocked",
	icon: "limit_pin_filled"
};
var a = {
	pin: PIN_LIMIT,
	folderPin: PIN_LIMIT,
	folders: {
		title: "LimitReached",
		description: "LimitReachedFolders",
		descriptionPremium: "LimitReachedFoldersPremium",
		descriptionLocked: "LimitReachedFoldersLocked",
		icon: "limit_folders"
	},
	folderPeers: {
		title: "LimitReached",
		description: "LimitReachedChatInFolders",
		descriptionPremium: "LimitReachedChatInFoldersPremium",
		descriptionLocked: "LimitReachedChatInFoldersLocked",
		icon: "limit_folders"
	},
	chatlistInvites: {
		title: "LimitReached",
		description: "LimitReachedSharedFolderInvites",
		descriptionPremium: "LimitReachedSharedFolderInvitesPremium",
		descriptionLocked: "LimitReachedSharedFolderInvitesLocked",
		icon: "limit_link"
	},
	savedPin: PIN_LIMIT,
	channels: {
		title: "LimitReached",
		description: "LimitReachedCommunities",
		descriptionPremium: "LimitReachedCommunitiesPremium",
		descriptionLocked: "LimitReachedCommunitiesLocked",
		icon: "limit_chat_filled"
	}
};
async function showLimitPopup(type, popupRef) {
	const feature = "double_limits";
	const [appConfig, limit, limitPremium] = await Promise.all([rootScope.managers.apiManager.getAppConfig(), ...[false, true].map((v) => rootScope.managers.apiManager.getLimit(type, v))]);
	const isPremium = appConfig.premium_purchase_blocked ? void 0 : rootScope.premium;
	const strings = a[type];
	const buttons = isPremium === void 0 ? [{
		langKey: "LimitReached.Ok",
		isCancel: true
	}] : isPremium ? [{
		langKey: "OK",
		isCancel: true
	}] : [{
		langKey: "IncreaseLimit",
		callback: () => {
			hotReloadGuard.showPremiumPopup({ feature });
		},
		iconRight: "premium_double_filled"
	}, {
		langKey: "Cancel",
		isCancel: true
	}];
	const limitLine = new LimitLine({
		limitPremium,
		hint: {
			icon: strings.icon,
			content: "" + (isPremium ? limitPremium : limit)
		}
	});
	if (isPremium !== void 0) limitLine.setProgress(isPremium ? 1 : .5);
	else limitLine.container.querySelector(".limit-line")?.remove();
	const body = popupRef ? document.createElement("div") : void 0;
	body?.classList.add("popup-body");
	let onCloseAfterTimeout;
	const handle = showPeerPopup("popup-limit", {
		buttons,
		descriptionLangKey: isPremium === void 0 ? strings.descriptionLocked : isPremium ? strings.descriptionPremium : strings.description,
		descriptionLangArgs: isPremium ? [limitPremium] : [limit, limitPremium],
		titleLangKey: strings.title,
		contentBefore: limitLine.container,
		content: body,
		deferShow: !!popupRef,
		onCloseAfterTimeout: () => onCloseAfterTimeout?.()
	});
	limitLine._setHintActive();
	popupRef?.({
		body,
		buttons,
		show: handle.show,
		hide: handle.hide,
		onCloseAfterTimeout: (callback) => onCloseAfterTimeout = callback
	});
}
//#endregion
export { LimitLine as n, showLimitPopup as t };
