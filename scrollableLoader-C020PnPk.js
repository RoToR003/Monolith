//# allFunctionsCalledOnLoad
import { a as safeAssign } from "./idb-BZfkipS3.js";
//#region src/helpers/scrollableLoader.ts
var ScrollableLoader = class {
	constructor(options) {
		this.loading = false;
		this.loaded = false;
		safeAssign(this, options);
		options.scrollable.onScrolledBottom = () => {
			this.load();
		};
	}
	load() {
		if (this.loaded) return Promise.resolve();
		if (this.loading) return this.promise;
		this.loading = true;
		this.promise = this.getPromise().then((done) => {
			this.loading = false;
			this.promise = void 0;
			if (done) {
				this.loaded = true;
				this.scrollable.onScrolledBottom = null;
			} else this.scrollable.checkForTriggers();
		}, () => {
			this.promise = void 0;
			this.loading = false;
		});
	}
};
//#endregion
export { ScrollableLoader as t };
