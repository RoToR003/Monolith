//# allFunctionsCalledOnLoad
import { p as MOUNT_CLASS_TO } from "./userAgent-ByGXcznk.js";
import { n as fastRaf } from "./schedulers-Cx0-7a1P.js";
import { n as indexOfAndSplice } from "./superMessagePort-DhrhiTig.js";
import { i as onAppWindowChange, n as getAppWindow } from "./appWindow-bo-KtJhy.js";
import { t as idleController } from "./idleController-fYZWT5XB.js";
import { o as useAppSettings } from "./liteMode-DeLStZfQ.js";
import { n as isInDOM } from "./sequentialDom-CRhA0kB2.js";
import { t as forEachReverse } from "./forEachReverse-pJ5a3thw.js";
import { t as safePlay } from "./safePlay-CCrzDSPY.js";
//#region src/components/animationIntersector.ts
/** An animation that runs itself, told by the intersector when to play and when to stand */
var AnimationItemNested = class {
	constructor(options) {
		this.options = options;
		this.autoplay = true;
		this.loop = true;
		this.paused = true;
	}
	remove() {
		this.pause();
		this.options.onDestroy?.();
	}
	play() {
		if (!this.paused) return;
		this.paused = false;
		this.options.onPlay();
	}
	pause() {
		if (this.paused) return;
		this.paused = true;
		this.options.onPause();
	}
};
var NEVER_SHOWN_RECLAIM_TIMEOUT = 6e4;
var AnimationIntersector = class {
	constructor() {
		this.onObserve = (entries) => {
			for (const entry of entries) {
				const target = entry.target;
				const items = this.byElement.get(target);
				if (!items) continue;
				forEachReverse(items, (animation) => {
					if (this.intersectionLockedGroups[animation.group]) return;
					if (entry.isIntersecting) {
						this.visible.add(animation);
						this.checkAnimation(animation, false);
					} else {
						this.visible.delete(animation);
						this.checkAnimation(animation, true);
						const _animation = animation.animation;
						if (animation.type === "lottie" && _animation.paused) _animation.clearCacheWhenSafe();
					}
				});
			}
		};
		this.createObserver();
		this.visible = /* @__PURE__ */ new Set();
		this.overrideIdleGroups = /* @__PURE__ */ new Set();
		this.byGroups = {};
		this.byPlayer = /* @__PURE__ */ new Map();
		this.byElement = /* @__PURE__ */ new Map();
		this.lockedGroups = {};
		this.onlyOnePlayableGroup = "";
		this.intersectionLockedGroups = {};
		this.videosLocked = false;
		this.heldUnder = /* @__PURE__ */ new Map();
		onAppWindowChange(() => {
			this.observer.disconnect();
			this.createObserver();
			for (const group in this.byGroups) for (const item of this.byGroups[group]) this.observer.observe(item.el);
		});
		idleController.addEventListener("change", (idle) => {
			this.checkAnimations2(idle);
		});
	}
	createObserver() {
		const IO = getAppWindow().IntersectionObserver;
		this.observer = new IO(this.onObserve);
	}
	toggleMediaPause(paused) {
		if (paused) {
			if (this.videosLocked) {
				this.videosLocked = false;
				this.checkAnimations2();
			}
		} else {
			this.videosLocked = true;
			this.checkAnimations2();
		}
	}
	toggleVideosUnder(element, paused) {
		this.toggleAnimationsUnder(element, paused, "video");
	}
	toggleAnimationsUnder(element, paused, type) {
		if (!element) return;
		this.byPlayer.forEach((item) => {
			if (type && item.type !== type || !element.contains(item.el)) return;
			this.toggleItemLock(item, paused);
			if (paused) item.animation.pause();
			else this.checkAnimation(item);
		});
	}
	setOverrideIdleGroup(group, override) {
		if (override) this.overrideIdleGroups.add(group);
		else this.overrideIdleGroups.delete(group);
	}
	getAnimations(element) {
		const items = this.byElement.get(element);
		return items ? items.slice() : [];
	}
	removeAnimation(player) {
		const { el, animation } = player;
		if (player.controlled !== true && player.type !== "video") animation.remove();
		const group = this.byGroups[player.group];
		if (group) {
			indexOfAndSplice(group, player);
			if (!group.length) delete this.byGroups[player.group];
		}
		const elementItems = this.byElement.get(el);
		if (elementItems) indexOfAndSplice(elementItems, player);
		if (!elementItems?.length) {
			this.byElement.delete(el);
			this.observer.unobserve(el);
		}
		clearTimeout(player.staleTimer);
		this.visible.delete(player);
		this.byPlayer.delete(animation);
	}
	removeAnimationByPlayer(player) {
		const item = this.byPlayer.get(player);
		if (item) this.removeAnimation(item);
	}
	isVisible(animation) {
		const item = this.byPlayer.get(animation);
		return !!item && this.visible.has(item);
	}
	addAnimation(options) {
		var _this$byGroups;
		const { animation, group = "", observeElement, controlled, liteModeKey, type, locked } = options;
		if (group === "none" || this.byPlayer.has(animation)) return;
		const item = {
			el: observeElement,
			animation,
			group,
			controlled,
			liteModeKey,
			type,
			locked,
			wasInDOM: isInDOM(observeElement)
		};
		if (controlled && typeof controlled !== "boolean") controlled.onClean(() => {
			this.removeAnimationByPlayer(animation);
		});
		if (item.type === "lottie") {
			const [appSettings] = useAppSettings();
			const stickers = appSettings?.stickers;
			if (stickers && !stickers.loop && animation.loop) animation.loop = stickers.loop;
		}
		((_this$byGroups = this.byGroups)[group] ?? (_this$byGroups[group] = [])).push(item);
		let elementItems = this.byElement.get(item.el);
		if (!elementItems) this.byElement.set(item.el, elementItems = []);
		elementItems.push(item);
		this.observer.observe(item.el);
		this.byPlayer.set(animation, item);
	}
	checkAnimations(blurred, group, destroy, imitateIntersection, exceptGroup, exceptUnder) {
		if (group !== void 0 && !this.byGroups[group]) return;
		const groups = group !== void 0 ? [group] : Object.keys(this.byGroups);
		for (const group of groups) {
			if (group === exceptGroup) continue;
			if (imitateIntersection && this.intersectionLockedGroups[group]) continue;
			const animations = this.byGroups[group];
			forEachReverse(animations, (animation) => {
				if (exceptUnder?.contains(animation.el)) return;
				this.checkAnimation(animation, blurred, destroy);
			});
		}
	}
	checkAnimations2(blurred, exceptGroup, exceptUnder) {
		this.checkAnimations(blurred, void 0, void 0, true, exceptGroup, exceptUnder);
	}
	checkAnimation(player, blurred, destroy) {
		const { el, animation, group, locked } = player;
		const inDOM = isInDOM(el);
		if (inDOM) player.wasInDOM = true;
		const canReclaim = player.wasInDOM || player.neverShownExpired;
		if (!inDOM && !canReclaim && player.staleTimer === void 0) player.staleTimer = setTimeout(() => {
			player.staleTimer = void 0;
			player.neverShownExpired = true;
			this.checkAnimation(player);
		}, NEVER_SHOWN_RECLAIM_TIMEOUT);
		if (destroy || !this.lockedGroups[group] && !inDOM && canReclaim) {
			if (player.type === "video") animation.pause();
			if (!player.controlled || destroy) this.removeAnimation(player);
			return;
		}
		if (locked) return;
		if (blurred || this.onlyOnePlayableGroup && this.onlyOnePlayableGroup !== group || player.type === "video" && this.videosLocked || this.isHeld(el)) {
			if (!animation.paused) animation.pause();
		} else if (animation.paused && this.visible.has(player) && animation.autoplay && (!this.onlyOnePlayableGroup || this.onlyOnePlayableGroup === group) && (!idleController.isIdle || this.overrideIdleGroups.has(player.group))) safePlay(animation);
	}
	getOnlyOnePlayableGroup() {
		return this.onlyOnePlayableGroup;
	}
	isHeld(el) {
		if (!this.heldUnder.size) return false;
		for (const root of this.heldUnder.keys()) if (root.contains(el)) return true;
		return false;
	}
	/**
	* Nothing under `root` plays until the returned release, whatever asks it to - the window coming back
	* into focus, a popup closing: `root` stays in the viewport but out of sight (the app under an account's
	* sign-in). What is elsewhere plays as before. Each hold is its own: a root held twice (a sandbox opened
	* over the sign-in) plays again only once both are released, and a release counts once however often it
	* is called.
	*/
	holdUnder(root) {
		const holds = this.heldUnder.get(root) ?? 0;
		this.heldUnder.set(root, holds + 1);
		if (!holds) this.checkAnimationsUnder(root);
		let released = false;
		return () => {
			if (released) return;
			released = true;
			const left = this.heldUnder.get(root) - 1;
			if (left) {
				this.heldUnder.set(root, left);
				return;
			}
			this.heldUnder.delete(root);
			this.checkAnimationsUnder(root);
		};
	}
	checkAnimationsUnder(root) {
		for (const group in this.byGroups) forEachReverse(this.byGroups[group], (player) => {
			if (root.contains(player.el)) this.checkAnimation(player);
		});
	}
	setOnlyOnePlayableGroup(group = "") {
		this.onlyOnePlayableGroup = group;
	}
	lockGroup(group) {
		this.lockedGroups[group] = true;
	}
	unlockGroup(group) {
		delete this.lockedGroups[group];
		this.checkAnimations(void 0, group);
	}
	refreshGroup(group) {
		const animations = this.byGroups[group];
		if (!animations?.length) return;
		animations.forEach((animation) => {
			this.observer.unobserve(animation.el);
		});
		fastRaf(() => {
			animations.forEach((animation) => {
				this.observer.observe(animation.el);
			});
		});
	}
	lockIntersectionGroup(group) {
		this.intersectionLockedGroups[group] = true;
	}
	unlockIntersectionGroup(group) {
		delete this.intersectionLockedGroups[group];
		this.refreshGroup(group);
	}
	/**
	* Whether what plays from the start in `group` (a widget) is to be paused as it is added: the window is idle, or the
	* group is held as it is (its chat kept behind another) — the observer says nothing of either then, and pauses only
	* what plays as they come about
	*/
	isGroupHeld(group) {
		return !!this.intersectionLockedGroups[group] || idleController.isIdle && !this.overrideIdleGroups.has(group);
	}
	toggleIntersectionGroup(group, lock) {
		if (lock) this.lockIntersectionGroup(group);
		else this.unlockIntersectionGroup(group);
	}
	setAutoplay(play, liteModeKey) {
		const [appSettings] = useAppSettings();
		let changed = false;
		this.byPlayer.forEach((animationItem, animation) => {
			if (animationItem.liteModeKey === liteModeKey) {
				changed = true;
				animation.autoplay = play ? animation._autoplay : false;
				animation.loop = play ? appSettings.stickers.loop && animation._loop : false;
				animation.onPlaybackParamsMutated?.();
			}
		});
		return changed;
	}
	setLoop(loop) {
		let changed = false;
		this.byPlayer.forEach((animationItem, animation) => {
			if (animation._loop && animation.loop !== loop && (animationItem.type === "lottie" || animationItem.type === "video")) {
				changed = true;
				animation.loop = loop;
				animation.autoplay = animation._autoplay;
				animation.onPlaybackParamsMutated?.();
			}
		});
		return changed;
	}
	toggleItemLock(animationItem, lock) {
		animationItem.locked = lock;
	}
};
var animationIntersector = new AnimationIntersector();
MOUNT_CLASS_TO && (MOUNT_CLASS_TO.animationIntersector = animationIntersector);
//#endregion
export { animationIntersector as n, AnimationItemNested as t };
