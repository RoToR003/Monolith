//# allFunctionsCalledOnLoad
import { f as DEBUG } from "./userAgent-ByGXcznk.js";
import { t as App } from "./app-BuFf8z8C.js";
import { t as Icon } from "./icon-DbP6Es97.js";
import { ht as singleInstance } from "./apiManagerProxy-DmQXvxSF.js";
import { n as rootScope } from "./rootScope-CZS0lmz8.js";
import { n as logger } from "./logger-7zf0rNYS.js";
import { a as i18n, u as langPack_default } from "./langPack-BmdJGr44.js";
import { n as bindManagersToSession } from "./bindManagersToAccount-BL82O9H9.js";
import { t as cancelEvent } from "./cancelEvent-Cw8vYZHp.js";
import { t as ListenerSetter } from "./listenerSetter-BER6qAXn.js";
import { n as attachClickEvent } from "./clickEvent-COk4YpLP.js";
import { t as SetTransition } from "./singleTransition-UfxhQocw.js";
import { t as InputField } from "./inputField-CaCo30N0.js";
import { xn as ProgressivePreloader } from "./confirmationPopup-Bz6mK0o-.js";
import { sn as ConnectionStatus } from "./getChatMigratedTo-ChhMNXuu.js";
import { t as ButtonIcon } from "./buttonIcon-CthJWloV.js";
//#region src/components/connectionStatus.ts
var _ConnectionStatusComponent;
var ConnectionStatusComponent = class ConnectionStatusComponent {
	constructor() {
		this.hadConnect = false;
		this.connecting = false;
		this.timedOut = false;
		this.updating = false;
		this.setConnectionStatus = (overrideStatus) => {
			const managers = bindManagersToSession(this.managers);
			Promise.all([rootScope.managers.apiManager.getBaseDcId(), rootScope.managers.rootScope.getConnectionStatus()]).then(([baseDcId, connectionStatus]) => {
				if (!baseDcId) baseDcId = App.baseDcId;
				if (this.setFirstConnectionTimeout) {
					clearTimeout(this.setFirstConnectionTimeout);
					this.setFirstConnectionTimeout = 0;
				}
				const status = connectionStatus["NET-" + baseDcId];
				const online = status && (overrideStatus ?? status.status) === ConnectionStatus.Connected;
				if (this.connecting && online) managers.apiUpdatesManager.forceGetDifference();
				if (online && !this.hadConnect) this.hadConnect = true;
				this.timedOut = status && (overrideStatus ?? status.status) === ConnectionStatus.TimedOut;
				this.connecting = !online;
				this.retryAt = status && status.retryAt;
				DEBUG && this.log("connecting", this.connecting);
				this.setState();
			});
		};
		this.wrapSetStatusText = (...args) => {
			return () => {
				const key = args[0] === "Search" ? void 0 : args[0] === "ConnectionStatus.ReconnectIn" || args[0] === "ConnectionStatus.ReconnectInPlain" ? "ConnectionStatus.Reconnecting" : args[0];
				if (key !== this.announcedKey) {
					this.announcedKey = key;
					this.announcement.replaceChildren(...key ? [i18n(key)] : []);
				}
				return this.inputSearch.setPlaceholder(...args);
			};
		};
		this.setState = () => {
			if (singleInstance.deactivatedReason) return;
			let setText;
			if (this.connecting) {
				if (this.timedOut) setText = this.wrapSetStatusText("Updating");
				else if (this.hadConnect) {
					if (this.retryAt !== void 0) {
						const timerSpan = document.createElement("span");
						const retryAt = this.retryAt;
						const setTime = () => {
							const now = Date.now();
							timerSpan.innerText = "" + Math.max(0, Math.round((retryAt - now) / 1e3));
							if (now > retryAt) clearInterval(interval);
						};
						const interval = setInterval(setTime, 1e3);
						setTime();
						setText = this.wrapSetStatusText("ConnectionStatus.ReconnectInPlain", [timerSpan]);
					} else setText = this.wrapSetStatusText("ConnectionStatus.Reconnecting");
				} else setText = this.wrapSetStatusText("ConnectionStatus.Waiting");
			} else if (this.updating) setText = this.wrapSetStatusText("Updating");
			else setText = this.wrapSetStatusText("Search");
			DEBUG && this.log("setState", this.connecting || this.updating);
			if (this.rAF) window.cancelAnimationFrame(this.rAF);
			this.rAF = window.requestAnimationFrame(() => {
				this.rAF = 0;
				if (this.setStateTimeout) clearTimeout(this.setStateTimeout);
				const wasVisible = this.inputSearch.isLoading();
				const cb = () => {
					setText();
					const isConnecting = this.connecting || this.updating;
					this.inputSearch.toggleLoading(isConnecting);
					this.setStateTimeout = 0;
					DEBUG && this.log("setState: isShown:", isConnecting);
				};
				if (wasVisible) cb();
				else this.setStateTimeout = window.setTimeout(cb, ConnectionStatusComponent.CHANGE_STATE_DELAY);
			});
		};
	}
	construct(managers, chatsContainer, inputSearch) {
		this.managers = managers;
		this.inputSearch = inputSearch;
		this.announcement = document.createElement("span");
		this.announcement.className = "sr-only";
		this.announcement.setAttribute("role", "status");
		chatsContainer.append(this.announcement);
		this.log = logger("CS", void 0, void 0);
		this.inputSearch.setPlaceholder("Search");
		rootScope.addEventListener("connection_status_change", (status) => {
			this.setConnectionStatus();
		});
		rootScope.addEventListener("state_synchronizing", () => {
			this.updating = true;
			DEBUG && this.log("updating", this.updating);
			this.setState();
		});
		rootScope.addEventListener("state_synchronized", () => {
			DEBUG && this.log("state_synchronized");
			this.updating = false;
			DEBUG && this.log("updating", this.updating);
			this.setState();
		});
		rootScope.addEventListener("account_switched", () => {
			this.updating = false;
			this.setConnectionStatus();
		});
		this.setFirstConnectionTimeout = window.setTimeout(this.setConnectionStatus, ConnectionStatusComponent.INITIAL_DELAY);
	}
	getA(langPackKey, callback) {
		const a = document.createElement("a");
		a.classList.add("force-reconnect");
		a.append(i18n(langPackKey));
		attachClickEvent(a, (e) => {
			cancelEvent(e);
			callback();
		});
		return a;
	}
};
_ConnectionStatusComponent = ConnectionStatusComponent;
_ConnectionStatusComponent.CHANGE_STATE_DELAY = 400;
_ConnectionStatusComponent.INITIAL_DELAY = 2e3;
_ConnectionStatusComponent.ANIMATION_DURATION = 250;
//#endregion
//#region src/components/inputSearch.ts
var InputSearch = class {
	constructor(options = {}) {
		this.prevValue = "";
		this.timeout = 0;
		this.setArrowBack = (arrowBack) => {
			if (this.arrowBack === arrowBack) return;
			this.arrowBack = arrowBack;
			this.container.classList.toggle("with-arrow-back", arrowBack);
			if (arrowBack && !this.backBtn) {
				this.backBtn = this.createButtonIcon("arrow_prev", "input-search-icon", "input-search-back");
				this.container.append(this.backBtn);
				attachClickEvent(this.backBtn, this.onBack, {
					listenerSetter: this.listenerSetter,
					cancelMouseDown: true
				});
			}
			this.searchIcon.classList.toggle("hide", arrowBack);
			this.backBtn && this.backBtn.classList.toggle("hide", !arrowBack);
			this.clearBtn.classList.toggle("always-visible", !arrowBack && !!this.alwaysShowClear);
		};
		this.setPlaceholder = (langPackKey, args) => {
			if (this.currentLangPackKey === langPackKey) return;
			this.currentLangPackKey = langPackKey;
			const oldPlaceholder = this.currentPlaceholder;
			if (oldPlaceholder) SetTransition({
				element: oldPlaceholder,
				className: "is-hiding",
				forwards: true,
				duration: ConnectionStatusComponent.ANIMATION_DURATION,
				onTransitionEnd: () => {
					oldPlaceholder.remove();
				}
			});
			this.currentPlaceholder = i18n(langPackKey, args);
			this.currentPlaceholder.classList.add(...["input-search-placeholder", !this.noPlaceholderAnimation && "will-animate"].filter(Boolean));
			this.container.append(this.currentPlaceholder);
			this.input.setAttribute("aria-label", langPack_default.format(langPackKey, true, args));
		};
		this.onInput = () => {
			if (!this.onChange) return;
			const { value, prevValue } = this;
			if (value === prevValue) return;
			this.prevValue = value;
			if (this.verifyDebounce?.(value, prevValue) === false) {
				this.clearTimeout(false);
				this.onChange(value);
				return;
			}
			this.clearTimeout(true);
			this.timeout = window.setTimeout(() => {
				this.onDebounce?.(false);
				this.onChange(value);
			}, this.debounceTime);
		};
		this.onKeyDown = (e) => {
			if (e.key !== "Enter" || !this.onEnter) return;
			const value = this.value;
			if (!value) return;
			this.onEnter(value);
		};
		this.onClearClick = (e) => {
			const isEmpty = this.inputField.isEmpty();
			this.value = "";
			this.onChange?.("");
			this.onClear?.(e, isEmpty);
		};
		this.clearTimeout = (debounceStart) => {
			clearTimeout(this.timeout);
			this.onDebounce?.(debounceStart);
		};
		this.inputField = new InputField({
			plainText: true,
			withBorder: !options.noBorder
		});
		this.listenerSetter = new ListenerSetter();
		this.container = this.inputField.container;
		this.container.classList.remove("input-field");
		this.container.classList.add("input-search");
		if (options.oldStyle) this.container.classList.add("old-style");
		this.onChange = options.onChange;
		this.onClear = options.onClear;
		this.onDebounce = options.onDebounce;
		this.onBack = options.onBack;
		this.onEnter = options.onEnter;
		this.debounceTime = options.debounceTime ?? 300;
		this.verifyDebounce = options.verifyDebounce;
		this.alwaysShowClear = options.alwaysShowClear;
		this.noPlaceholderAnimation = options.noPlaceholderAnimation;
		const input = this.input = this.inputField.input;
		input.classList.add("input-search-input");
		if (!options.noFocusEffect) input.classList.add("with-focus-effect");
		const searchIcon = this.searchIcon = this.createIcon("search", "input-search-icon");
		const clearBtn = this.clearBtn = this.createButtonIcon("close", "input-search-clear");
		clearBtn.setAttribute("aria-label", langPack_default.format("Clear", true));
		this.listenerSetter.add(input)("input", this.onInput);
		this.listenerSetter.add(input)("keydown", this.onKeyDown);
		attachClickEvent(clearBtn, this.onClearClick, {
			listenerSetter: this.listenerSetter,
			cancelMouseDown: true
		});
		if (options.placeholder) {
			input.placeholder = " ";
			this.setPlaceholder(options.placeholder);
		}
		if (options.onFocusChange) {
			this.listenerSetter.add(input)("focusin", () => {
				options.onFocusChange?.(true);
			});
			this.listenerSetter.add(input)("focusout", () => {
				options.onFocusChange?.(false);
			});
		}
		this.container.append(searchIcon, clearBtn);
		this.setArrowBack(options.arrowBack);
	}
	createButtonIcon(icon, ...args) {
		args ?? (args = []);
		args.push("input-search-part", "input-search-button");
		return ButtonIcon(icon + " " + args.join(" "), { noRipple: true });
	}
	createIcon(icon, ...args) {
		return Icon(icon, "input-search-part", ...args);
	}
	isLoading() {
		return this.container.classList.contains("is-connecting");
	}
	toggleLoading(loading) {
		const another = this.arrowBack ? this.clearBtn : this.searchIcon;
		if (!this.statusPreloader) {
			this.statusPreloader = new ProgressivePreloader({ cancelable: false });
			this.statusPreloader.constructContainer({
				color: "transparent",
				bold: true
			});
			this.statusPreloader.construct?.();
			this.statusPreloader.preloader.classList.add("is-visible", "will-animate");
			another.classList.add("will-animate");
		}
		if (loading && !this.statusPreloader.preloader.parentElement) this.container.append(this.statusPreloader.preloader);
		this.statusPreloader.preloader.classList.toggle("is-hiding", !loading);
		another.classList.toggle("is-hiding", loading || another === this.clearBtn && this.inputField.isEmpty());
		SetTransition({
			element: this.container,
			className: "is-connecting",
			forwards: loading,
			duration: ConnectionStatusComponent.ANIMATION_DURATION,
			onTransitionEnd: loading ? void 0 : () => {
				this.statusPreloader.preloader.remove();
			}
		});
	}
	get value() {
		return this.inputField.value;
	}
	set value(value) {
		this.prevValue = value;
		this.clearTimeout(false);
		this.inputField.value = value;
	}
	remove() {
		this.clearTimeout(false);
		this.verifyDebounce = void 0;
		this.listenerSetter.removeAll();
	}
};
//#endregion
export { ConnectionStatusComponent as n, InputSearch as t };
