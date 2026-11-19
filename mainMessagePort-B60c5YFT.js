//# allFunctionsCalledOnLoad
import { p as MOUNT_CLASS_TO } from "./userAgent-ByGXcznk.js";
import { t as superMessagePort_default } from "./superMessagePort-DhrhiTig.js";
//#region src/lib/mainWorker/mainMessagePort.ts
var MTProtoMessagePort = class MTProtoMessagePort extends superMessagePort_default {
	constructor(isMaster = true) {
		super("MTPROTO");
		MTProtoMessagePort.INSTANCE = this;
		if (isMaster) MTProtoMessagePort.MASTER_INSTANCE = this;
		else MTProtoMessagePort.NON_MASTER_INSTANCE = this;
		MOUNT_CLASS_TO && (MOUNT_CLASS_TO.mtprotoMessagePort = this);
	}
	static getInstance() {
		return this.INSTANCE;
	}
	static getMasterInstance() {
		return this.MASTER_INSTANCE;
	}
	static getNonMasterInstance() {
		return this.NON_MASTER_INSTANCE;
	}
};
//#endregion
export { MTProtoMessagePort as t };
