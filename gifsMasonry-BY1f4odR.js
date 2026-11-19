//# allFunctionsCalledOnLoad
import { t as doubleRaf } from "./schedulers-Cx0-7a1P.js";
import { t as noop } from "./noop-H9NNBLfX.js";
import { n as rootScope } from "./rootScope-CZS0lmz8.js";
import { n as deferredPromise } from "./cancellablePromise-bof--dnO.js";
import { F as VisibilityIntersector, N as LazyLoadQueueIntersector, P as findAndSpliceAll } from "./renderer-L80wjxct.js";
import { t as getMiddleware } from "./middleware-D6HuIqPm.js";
import { n as wrapVideo } from "./video-ByfiTxvV.js";
import { t as positionElementByIndex } from "./positionElementByIndex-D7kiTyx2.js";
//#region src/components/lazyLoadQueueRepeat2.ts
var LazyLoadQueueRepeat2 = class extends LazyLoadQueueIntersector {
	constructor(parallelLimit, onVisibilityChange) {
		super(parallelLimit);
		this.onVisibilityChange = onVisibilityChange;
		this.intersector = new VisibilityIntersector((item) => {
			const { target, visible } = item;
			const spliced = findAndSpliceAll(this.queue, (i) => i.div === target);
			if (visible && spliced.length) spliced.forEach((item) => {
				this.queue.unshift(item);
			});
			this.onVisibilityChange && this.onVisibilityChange(item);
			this.setProcessQueueTimeout();
		});
	}
	observe(el) {
		super.observe(el);
	}
};
//#endregion
//#region src/components/gifsMasonry.ts
var GifsMasonry = class {
	constructor(element, group, scrollable, attach = true) {
		this.element = element;
		this.group = group;
		this.scrollable = scrollable;
		this.scrollPromise = Promise.resolve();
		this.timeout = 0;
		this.onScroll = () => {
			if (this.timeout) clearTimeout(this.timeout);
			else this.scrollPromise = deferredPromise();
			this.timeout = window.setTimeout(() => {
				this.timeout = 0;
				this.scrollPromise.resolve();
			}, 150);
		};
		this.processInvisibleDiv = (div) => {
			return this.scrollPromise.then(async () => {
				if (this.lazyLoadQueue.intersector.isVisible(div)) return;
				const thumb = div.querySelector("img, canvas");
				if (thumb) {
					thumb.classList.remove("hide");
					await doubleRaf();
				}
				if (this.lazyLoadQueue.intersector.isVisible(div)) return;
				div.middlewareHelper.clean();
			});
		};
		this.managers = rootScope.managers;
		this.middlewareHelper = getMiddleware();
		this.map = /* @__PURE__ */ new Map();
		this.lazyLoadQueue = new LazyLoadQueueRepeat2(void 0, ({ target, visible }) => {
			if (visible) this.processVisibleDiv(target);
			else this.processInvisibleDiv(target);
		});
		if (attach) this.attach();
	}
	attach() {
		this.scrollable.container.addEventListener("scroll", this.onScroll);
	}
	detach() {
		this.clear();
		this.scrollable.container.removeEventListener("scroll", this.onScroll);
		this.middlewareHelper.destroy();
	}
	clear() {
		this.lazyLoadQueue.clear();
	}
	processVisibleDiv(div) {
		if (div.querySelector("video")) return;
		const load = () => {
			const docId = div.dataset.docId;
			return Promise.all([this.managers.appDocsManager.getDoc(docId), this.scrollPromise]).then(async ([doc]) => {
				if (!this.lazyLoadQueue.intersector.isVisible(div)) {
					this.processInvisibleDiv(div);
					return;
				}
				div.middlewareHelper.clean();
				const middleware = div.middlewareHelper.get().create().get();
				const res = await wrapVideo({
					doc,
					container: div,
					lazyLoadQueue: null,
					group: this.group,
					noInfo: true,
					noPreview: true,
					middleware
				});
				const promise = res.loadPromise;
				promise.finally(() => {
					middleware.onDestroy(() => {
						res.video?.remove();
					});
					if (!middleware() || !this.lazyLoadQueue.intersector.isVisible(div)) {
						this.processInvisibleDiv(div);
						return;
					}
					const thumb = div.querySelector("img, canvas");
					thumb && thumb.classList.add("hide");
				});
				return promise;
			});
		};
		this.lazyLoadQueue.push({
			div,
			load
		});
	}
	addBatch(docs) {
		docs.forEach((doc) => this.add(doc));
	}
	update(docs) {
		for (const [docId] of this.map) if (!docs.some((doc) => doc.id === docId)) this.delete(docId);
		this.addBatch(docs);
		for (let i = 0, length = docs.length; i < length; ++i) {
			const element = this.map.get(docs[i].id);
			positionElementByIndex(element, this.element, i);
		}
	}
	add(doc, appendTo = this.element) {
		if (this.map.has(doc.id)) return;
		const div = document.createElement("div");
		div.classList.add("gif", "grid-item");
		div.dataset.docId = "" + doc.id;
		div.middlewareHelper = this.middlewareHelper.get().create();
		this.map.set(doc.id, div);
		appendTo.append(div);
		this.lazyLoadQueue.observe({
			div,
			load: noop
		});
		wrapVideo({
			doc,
			container: div,
			lazyLoadQueue: null,
			noInfo: true,
			onlyPreview: true,
			middleware: div.middlewareHelper.get()
		});
	}
	delete(docId) {
		const div = this.map.get(docId);
		if (div) {
			div.remove();
			div.middlewareHelper.destroy();
			this.map.delete(docId);
		}
	}
};
//#endregion
export { GifsMasonry as t };
