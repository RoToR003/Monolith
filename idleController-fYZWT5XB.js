//# allFunctionsCalledOnLoad
import "./userAgent-ByGXcznk.js";
import { t as IS_TOUCH_SUPPORTED } from "./touchSupport-B2RWO3zD.js";
import { t as EventListenerBase } from "./eventListenerBase-da40Q-0t.js";
import { i as onAppWindowChange, n as getAppWindow } from "./appWindow-bo-KtJhy.js";
//#region src/helpers/idleController.ts
var FOCUS_EVENT_NAME = IS_TOUCH_SUPPORTED ? "touchstart" : "mousemove";
var DO_NOT_IDLE = false;
var IdleController = class extends EventListenerBase {
	constructor() {
		super();
		this.holds = 0;
		this.onBlur = () => {
			this.isIdle = true;
		};
		this.onActive = () => {
			this.isIdle = false;
		};
		this._isIdle = !DO_NOT_IDLE;
		this.focusPromise = Promise.resolve();
		this.focusResolve = () => {};
		this.bindWindow(getAppWindow(), false);
		onAppWindowChange((win) => this.bindWindow(win, true));
		this.addEventListener("change", (idle) => {
			if (idle) this.focusPromise = new Promise((resolve) => {
				this.focusResolve = resolve;
			});
			else this.focusResolve();
		});
	}
	bindWindow(win, isSwitch) {
		const prev = this.boundWindow;
		if (prev) {
			prev.removeEventListener("blur", this.onBlur);
			prev.removeEventListener("focus", this.onActive);
			prev.removeEventListener(FOCUS_EVENT_NAME, this.onActive);
		}
		this.boundWindow = win;
		win.addEventListener("blur", this.onBlur);
		win.addEventListener("focus", this.onActive);
		win.addEventListener(FOCUS_EVENT_NAME, this.onActive, {
			once: true,
			passive: true
		});
		if (isSwitch) this.isIdle = false;
	}
	/**
	* Settles once the user can see the app: the window has the focus, and nothing holds it (holdFocus) -
	* a hold that came while it waited for the focus included.
	*/
	getFocusPromise() {
		if (this.holds) return this.heldPromise.then(() => this.getFocusPromise());
		return this.focusPromise.then(() => this.holds ? this.getFocusPromise() : void 0);
	}
	/**
	* The app is out of the user's sight while the window keeps the focus - an account's sign-in stands over
	* it: what waits for their eyes (a chat's read mark) waits until the returned release. Nothing else of
	* being idle comes with it.
	*/
	holdFocus() {
		if (!this.holds++) this.heldPromise = new Promise((resolve) => this.heldResolve = resolve);
		let released = false;
		return () => {
			if (released) return;
			released = true;
			if (!--this.holds) this.heldResolve();
		};
	}
	get isIdle() {
		return this._isIdle;
	}
	set isIdle(value) {
		if (this._isIdle === value) return;
		if (DO_NOT_IDLE && value) return;
		this._isIdle = value;
		this.dispatchEvent("change", value);
	}
};
var idleController = new IdleController();
//#endregion
export { idleController as t };
