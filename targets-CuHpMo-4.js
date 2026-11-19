//# allFunctionsCalledOnLoad
//#region src/components/wallet/chatCard/targets.ts
var targets = /* @__PURE__ */ new Map();
function registerWalletChatCardTarget(randomId, target) {
	targets.set(randomId, target);
	return () => {
		if (targets.get(randomId) === target) targets.delete(randomId);
	};
}
function getWalletChatCardTarget(randomId) {
	return targets.get(randomId);
}
//#endregion
export { registerWalletChatCardTarget as n, getWalletChatCardTarget as t };
