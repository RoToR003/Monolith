//# allFunctionsCalledOnLoad
//#region src/helpers/hotModule.ts
var effectRegistry = /* @__PURE__ */ new Set();
/**
* The setup a module did on its previous evaluation, undone before this one sets up its own. Vite makes a new hot
* context for every evaluation of a module and keeps `data` across them — and a module that runs again only because
* a boundary above it re-imports it gets no dispose call, so the context's identity is what tells.
*/
function effectsOf(hot) {
	var _hot$data;
	const token = latestEvaluation(hot);
	const effects = (_hot$data = hot.data).effects ?? (_hot$data.effects = {
		token,
		hot,
		cleanups: []
	});
	effectRegistry.add(effects);
	effects.hot = hot;
	if (effects.token !== token) {
		effects.cleanups.splice(0).forEach((cleanup) => cleanup());
		effects.token = token;
	}
	hot.prune?.(() => {
		effects.cleanups.splice(0).forEach((cleanup) => cleanup());
		effectRegistry.delete(effects);
	});
	return effects.cleanups;
}
function latestEvaluation(hot) {
	const { hmrClient, ownerPath } = hot;
	return hmrClient?.ctxToListenersMap?.get(ownerPath) ?? hot;
}
/**
* Something a module sets up at its top level — an interval, a subscription — whose cleanup runs when a hot update
* runs the module again, so the new evaluation's setup replaces the old one instead of running beside it.
*/
function hotEffect(hot, setup) {
	const cleanups = hot?.data ? effectsOf(hot) : void 0;
	const cleanup = setup();
	cleanups?.push(cleanup);
}
function hotListen(hot, target, name, callback) {
	hotEffect(hot, () => {
		target.addEventListener(name, callback);
		return () => target.removeEventListener(name, callback);
	});
}
//#endregion
export { hotListen as n, hotEffect as t };
