//# allFunctionsCalledOnLoad
//#region src/helpers/tooltipController.ts
var TooltipController = class {
	constructor() {
		this.closeCallbacks = /* @__PURE__ */ new Set();
	}
	register(close) {
		this.closeCallbacks.add(close);
		return () => this.closeCallbacks.delete(close);
	}
	closeAll() {
		[...this.closeCallbacks].forEach((close) => close());
	}
};
var tooltipController = new TooltipController();
//#endregion
export { tooltipController as t };
