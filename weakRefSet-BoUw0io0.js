//# allFunctionsCalledOnLoad
//#region src/helpers/weakRefSet.ts
var WeakRefSet = class extends Set {
	/** Register `value` and return the ref to pass back to `delete` when the owner does clean up. */
	track(value) {
		const ref = new WeakRef(value);
		this.add(ref);
		return ref;
	}
	/** Call back for every member still alive, forgetting the ones that are not. */
	forEachLive(callback) {
		for (const ref of this) {
			const value = ref.deref();
			if (!value) {
				this.delete(ref);
				continue;
			}
			callback(value);
		}
	}
};
//#endregion
export { WeakRefSet as t };
