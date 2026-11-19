//# allFunctionsCalledOnLoad
import { n as fastRaf } from "./schedulers-Cx0-7a1P.js";
import { t as noop } from "./noop-H9NNBLfX.js";
import { t as withTimeout } from "./withTimeout-BtnqUkyh.js";
import { t as lottieLoader } from "./lottieLoader-B3FXw0K7.js";
import { t as forgetFailedRequest } from "./forgetFailedRequest-BItMIRL8.js";
import { n as CodeInputFieldCompat } from "./codeInputField-CuXF8PSB.js";
//#region src/components/monkeys/tracking.ts
var IDLE_ASSET = "TwoFactorSetupMonkeyIdle";
var TRACKING_ASSET = "TwoFactorSetupMonkeyTracking";
/** How long a card waits for its monkey before it opens without it (a slow link, a failed fetch): */
var PRELOAD_WAIT_MS = 1e3;
var loaded;
/**
* Loads what the monkey is drawn from - its two animations, and what a page's first sticker otherwise starts after its
* card has opened (lottieLoader.loadLottieEngine) - so that the card opens with it drawn. Started on the card before it (the number), as soon as one is typed; whatever opens the code card waits for
* it. Resolves once loaded, or after PRELOAD_WAIT_MS, and never rejects; a failed load is tried again by the next call.
*/
function preloadTrackingMonkey() {
	loaded ?? (loaded = forgetFailedRequest(Promise.all([
		lottieLoader.loadLottieEngine(),
		lottieLoader.loadAnimationFromURLManually(IDLE_ASSET),
		lottieLoader.loadAnimationFromURLManually(TRACKING_ASSET)
	]).then(noop), () => loaded, () => loaded = void 0));
	return withTimeout(loaded, PRELOAD_WAIT_MS).catch(noop);
}
var TrackingMonkey = class {
	constructor(inputField, size) {
		this.inputField = inputField;
		this.size = size;
		this.max = 45;
		this.needFrame = 0;
		this.container = document.createElement("div");
		this.container.classList.add("media-sticker-wrapper");
		const input = inputField.input;
		input.addEventListener("blur", () => {
			this.playAnimation(0);
		});
		if (inputField instanceof CodeInputFieldCompat) {
			input.addEventListener("focus", () => {
				this.playAnimation(1);
			});
			input.addEventListener("input", (e) => {
				fastRaf(() => {
					const frac = (1 + inputField.value.length) / inputField.options.length;
					this.playAnimation(frac * this.max);
				});
			});
		} else input.addEventListener("input", (e) => {
			this.playAnimation(inputField.value.length);
		});
	}
	playAnimation(length) {
		if (!this.animation) return;
		length = Math.min(length, 30);
		let frame;
		if (length) {
			frame = Math.round(Math.min(this.max, length) * (165 / this.max) + 11.33);
			if (this.idleAnimation) {
				this.idleAnimation.stop(true);
				this.idleAnimation.canvas[0].style.display = "none";
			}
			this.animation.canvas[0].style.display = "";
		} else frame = 0;
		const direction = this.needFrame > frame ? -1 : 1;
		this.animation.setDirection(direction);
		if (this.needFrame !== 0 && frame === 0) this.animation.setSpeed(7);
		this.needFrame = frame;
		this.animation.play();
	}
	load() {
		if (this.loadPromise) return this.loadPromise;
		return this.loadPromise = Promise.all([lottieLoader.loadAnimationAsAsset({
			container: this.container,
			loop: true,
			autoplay: true,
			width: this.size,
			height: this.size
		}, IDLE_ASSET).then((animation) => {
			this.idleAnimation = animation;
			if (!this.inputField.value.length) animation.play();
			return lottieLoader.waitForFirstFrame(animation);
		}), lottieLoader.loadAnimationAsAsset({
			container: this.container,
			loop: false,
			autoplay: false,
			width: this.size,
			height: this.size
		}, TRACKING_ASSET).then((_animation) => {
			this.animation = _animation;
			if (!this.inputField.value.length) this.animation.canvas[0].style.display = "none";
			this.animation.addEventListener("enterFrame", (currentFrame) => {
				if (this.animation.direction === 1 && currentFrame >= this.needFrame || this.animation.direction === -1 && currentFrame <= this.needFrame) {
					this.animation.setSpeed(1);
					this.animation.pause();
				}
				if (currentFrame === 0 && this.needFrame === 0) {
					if (this.idleAnimation) {
						this.idleAnimation.canvas[0].style.display = "";
						this.idleAnimation.play();
						this.animation.canvas[0].style.display = "none";
					}
				}
			});
			return lottieLoader.waitForFirstFrame(_animation);
		})]);
	}
	remove() {
		if (this.animation) this.animation.remove();
		if (this.idleAnimation) this.idleAnimation.remove();
	}
};
//#endregion
export { preloadTrackingMonkey as n, TrackingMonkey as t };
