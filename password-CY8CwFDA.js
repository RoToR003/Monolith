//# allFunctionsCalledOnLoad
import { t as noop } from "./noop-H9NNBLfX.js";
import { t as lottieLoader } from "./lottieLoader-B3FXw0K7.js";
//#region src/components/monkeys/password.ts
var ASSET = "TwoFactorSetupMonkeyPeek";
/** What the password card's monkey is drawn from, fetched on the card before it (the code), as the card opens */
function preloadPasswordMonkey() {
	lottieLoader.loadAnimationFromURLManually(ASSET).catch(noop);
}
var PasswordMonkey = class {
	constructor(passwordInputField, size) {
		this.passwordInputField = passwordInputField;
		this.size = size;
		this.needFrame = 0;
		this.container = document.createElement("div");
		this.container.classList.add("media-sticker-wrapper");
	}
	load() {
		if (this.loadPromise) return this.loadPromise;
		return this.loadPromise = lottieLoader.loadAnimationAsAsset({
			container: this.container,
			loop: false,
			autoplay: false,
			width: this.size,
			height: this.size,
			noCache: true
		}, ASSET).then((_animation) => {
			this.animation = _animation;
			this.animation.addEventListener("enterFrame", (currentFrame) => {
				if (this.animation.direction === 1 && currentFrame >= this.needFrame || this.animation.direction === -1 && currentFrame <= this.needFrame) {
					this.animation.setSpeed(1);
					this.animation.pause();
				}
			});
			this.passwordInputField.helpers.onVisibilityClickAdditional = () => {
				if (this.passwordInputField.helpers.passwordVisible) {
					this.animation.setDirection(1);
					this.animation.curFrame = 0;
					this.needFrame = 16;
					this.animation.play();
				} else {
					this.animation.setDirection(-1);
					this.animation.curFrame = 16;
					this.needFrame = 0;
					this.animation.play();
				}
			};
			return lottieLoader.waitForFirstFrame(_animation);
		});
	}
	remove() {
		if (this.animation) this.animation.remove();
	}
};
//#endregion
export { preloadPasswordMonkey as n, PasswordMonkey as t };
