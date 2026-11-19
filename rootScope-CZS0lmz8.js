//# allFunctionsCalledOnLoad
import { n as __exportAll } from "./rolldown-runtime-CwcJO0Gh.js";
import { p as MOUNT_CLASS_TO } from "./userAgent-ByGXcznk.js";
import { t as EventListenerBase } from "./eventListenerBase-da40Q-0t.js";
import { t as MTProtoMessagePort } from "./mainMessagePort-B60c5YFT.js";
//#region src/lib/appManagers/constants.ts
var REPLIES_PEER_ID = 1271266957;
var VERIFICATION_CODES_BOT_ID = 489e3;
var HIDDEN_PEER_ID = 2666e3;
var SERVICE_PEER_ID = 777e3;
var MUTE_UNTIL = 2147483647;
var BANNED_RIGHTS_UNTIL_FOREVER = 2147483647;
var MAX_FILE_SAVE_SIZE = 20971520;
var TOPIC_COLORS = [
	7322096,
	16766590,
	13338331,
	9367192,
	16749490,
	16478047
];
var ATTACH_MENU_BOT_ICON_NAME = "default_static";
var MESSAGE_ID_OFFSET = 4294967296;
var EPHEMERAL_MESSAGE_ID_OFFSET = MESSAGE_ID_OFFSET * 2;
var EPHEMERAL_MESSAGE_ID_LIMIT = MESSAGE_ID_OFFSET * 3;
var GENERAL_TOPIC_ID = 4294967297;
var T_ME_PREFIXES = /* @__PURE__ */ new Set([
	"web",
	"k",
	"z",
	"a"
]);
var SEND_WHEN_ONLINE_TIMESTAMP = 2147483646;
var SERVER_IMAGE_MIME_TYPES = /* @__PURE__ */ new Set([
	"image/jpeg",
	"image/png",
	"image/bmp",
	"image/gif"
]);
var SEND_PAID_WITH_STARS_DELAY = 5e3;
var PEER_FULL_TTL = 18e4;
var WIDGET_POLL_MAX_PERIOD = 3600;
var REAL_FOLDERS = /* @__PURE__ */ new Set([0, 1]);
var START_LOCAL_ID = Math.max(...Array.from(REAL_FOLDERS)) + 1;
//#endregion
//#region src/lib/rootScope.ts
var rootScope_exports = /* @__PURE__ */ __exportAll({
	RootScope: () => RootScope,
	default: () => rootScope
});
var RootScope = class extends EventListenerBase {
	constructor() {
		super();
		this.myId = 0;
		this.connectionStatus = {};
		this.premium = false;
		this.addEventListener("user_auth", ({ id }) => {
			this.myId = id.toPeerId();
		});
		this.addEventListener("premium_toggle_private", ({ isNew, isPremium }) => {
			this.premium = isPremium;
			if (!isNew) this.dispatchEventSingle("premium_toggle", isPremium);
		});
		this.addEventListener("connection_status_change", (status) => {
			this.connectionStatus[status.name] = status;
		});
		this.dispatchEvent = (e, ...args) => {
			super.dispatchEvent(e, ...args);
			(async () => {
				const accountNumber = this.managers ? await this.managers.apiManager.getAccountNumber() : void 0;
				MTProtoMessagePort.getInstance().invokeVoid("event", {
					name: e,
					args,
					accountNumber
				});
			})();
		};
	}
	getConnectionStatus() {
		return this.connectionStatus;
	}
	getPremium() {
		return this.premium;
	}
	getMyId() {
		return this.myId;
	}
	dispatchEventSingle(name, ...args) {
		super.dispatchEvent(name, ...args);
	}
	/**
	* About what belongs to an account the tab may no longer show (a call's): this tab hears it at once, the
	* other tabs as that account's - `dispatchEvent` would name the account the tab shows.
	*/
	dispatchEventOfAccount(accountNumber, name, ...args) {
		super.dispatchEvent(name, ...args);
		MTProtoMessagePort.getInstance().invokeVoid("event", {
			name,
			args,
			accountNumber
		});
	}
};
var rootScope = new RootScope();
MOUNT_CLASS_TO.rootScope = rootScope;
//#endregion
export { VERIFICATION_CODES_BOT_ID as C, T_ME_PREFIXES as S, SEND_WHEN_ONLINE_TIMESTAMP as _, BANNED_RIGHTS_UNTIL_FOREVER as a, START_LOCAL_ID as b, GENERAL_TOPIC_ID as c, MESSAGE_ID_OFFSET as d, MUTE_UNTIL as f, SEND_PAID_WITH_STARS_DELAY as g, REPLIES_PEER_ID as h, ATTACH_MENU_BOT_ICON_NAME as i, HIDDEN_PEER_ID as l, REAL_FOLDERS as m, rootScope as n, EPHEMERAL_MESSAGE_ID_LIMIT as o, PEER_FULL_TTL as p, rootScope_exports as r, EPHEMERAL_MESSAGE_ID_OFFSET as s, RootScope as t, MAX_FILE_SAVE_SIZE as u, SERVER_IMAGE_MIME_TYPES as v, WIDGET_POLL_MAX_PERIOD as w, TOPIC_COLORS as x, SERVICE_PEER_ID as y };
