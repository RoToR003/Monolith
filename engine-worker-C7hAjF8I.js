//#region \0rolldown/runtime.js
var __defProp$1 = Object.defineProperty;
var __commonJSMin = (cb, mod) => () => (mod || (cb((mod = { exports: {} }).exports, mod), cb = null), mod.exports);
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp$1(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp$1(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
//#endregion
//#region src/vendor/widget-sandbox-quickjs/dist/emscripten-module.wasm?url
var emscripten_module_default = "/Monolith/emscripten-module-U2H1D7yK.wasm";
//#endregion
//#region src/vendor/widget-sandbox-quickjs/dist/emscripten-module.asyncify.wasm?url
var emscripten_module_asyncify_default = "/Monolith/emscripten-module.asyncify-O0cNAH4e.wasm";
//#endregion
//#region node_modules/.pnpm/@jitl+quickjs-ffi-types@0.32.0/node_modules/@jitl/quickjs-ffi-types/dist/index.mjs
var EvalFlags = {
	JS_EVAL_TYPE_GLOBAL: 0,
	JS_EVAL_TYPE_MODULE: 1,
	JS_EVAL_TYPE_DIRECT: 2,
	JS_EVAL_TYPE_INDIRECT: 3,
	JS_EVAL_TYPE_MASK: 3,
	JS_EVAL_FLAG_STRICT: 8,
	JS_EVAL_FLAG_STRIP: 16,
	JS_EVAL_FLAG_COMPILE_ONLY: 32,
	JS_EVAL_FLAG_BACKTRACE_BARRIER: 64
};
var IntrinsicsFlags = {
	BaseObjects: 1,
	Date: 2,
	Eval: 4,
	StringNormalize: 8,
	RegExp: 16,
	RegExpCompiler: 32,
	JSON: 64,
	Proxy: 128,
	MapSet: 256,
	TypedArrays: 512,
	Promise: 1024,
	BigInt: 2048,
	BigFloat: 4096,
	BigDecimal: 8192,
	OperatorOverloading: 16384,
	BignumExt: 32768
};
var JSPromiseStateEnum = {
	Pending: 0,
	Fulfilled: 1,
	Rejected: 2
};
var GetOwnPropertyNamesFlags = {
	JS_GPN_STRING_MASK: 1,
	JS_GPN_SYMBOL_MASK: 2,
	JS_GPN_PRIVATE_MASK: 4,
	JS_GPN_ENUM_ONLY: 16,
	JS_GPN_SET_ENUM: 32,
	QTS_GPN_NUMBER_MASK: 64,
	QTS_STANDARD_COMPLIANT_NUMBER: 128
};
var IsEqualOp = {
	IsStrictlyEqual: 0,
	IsSameValue: 1,
	IsSameValueZero: 2
};
//#endregion
//#region node_modules/.pnpm/quickjs-emscripten-core@0.32.0/node_modules/quickjs-emscripten-core/dist/chunk-V2S4ZYJR.mjs
var __defProp = Object.defineProperty;
var __export = (target, all) => {
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: !0
	});
};
var QTS_DEBUG = !1;
__export({}, {
	QuickJSAsyncifyError: () => QuickJSAsyncifyError,
	QuickJSAsyncifySuspended: () => QuickJSAsyncifySuspended,
	QuickJSEmptyGetOwnPropertyNames: () => QuickJSEmptyGetOwnPropertyNames,
	QuickJSEmscriptenModuleError: () => QuickJSEmscriptenModuleError,
	QuickJSHostRefInvalid: () => QuickJSHostRefInvalid,
	QuickJSHostRefRangeExceeded: () => QuickJSHostRefRangeExceeded,
	QuickJSMemoryLeakDetected: () => QuickJSMemoryLeakDetected,
	QuickJSNotImplemented: () => QuickJSNotImplemented,
	QuickJSPromisePending: () => QuickJSPromisePending,
	QuickJSUnknownIntrinsic: () => QuickJSUnknownIntrinsic,
	QuickJSUnwrapError: () => QuickJSUnwrapError,
	QuickJSUseAfterFree: () => QuickJSUseAfterFree,
	QuickJSWrongOwner: () => QuickJSWrongOwner
});
var QuickJSUnwrapError = class extends Error {
	constructor(cause, context) {
		let message = typeof cause == "object" && cause && "message" in cause ? String(cause.message) : String(cause);
		super(message);
		this.cause = cause;
		this.context = context;
		this.name = "QuickJSUnwrapError";
	}
};
var QuickJSWrongOwner = class extends Error {
	constructor() {
		super(...arguments);
		this.name = "QuickJSWrongOwner";
	}
};
var QuickJSUseAfterFree = class extends Error {
	constructor() {
		super(...arguments);
		this.name = "QuickJSUseAfterFree";
	}
};
var QuickJSNotImplemented = class extends Error {
	constructor() {
		super(...arguments);
		this.name = "QuickJSNotImplemented";
	}
};
var QuickJSAsyncifyError = class extends Error {
	constructor() {
		super(...arguments);
		this.name = "QuickJSAsyncifyError";
	}
};
var QuickJSAsyncifySuspended = class extends Error {
	constructor() {
		super(...arguments);
		this.name = "QuickJSAsyncifySuspended";
	}
};
var QuickJSMemoryLeakDetected = class extends Error {
	constructor() {
		super(...arguments);
		this.name = "QuickJSMemoryLeakDetected";
	}
};
var QuickJSEmscriptenModuleError = class extends Error {
	constructor() {
		super(...arguments);
		this.name = "QuickJSEmscriptenModuleError";
	}
};
var QuickJSUnknownIntrinsic = class extends TypeError {
	constructor() {
		super(...arguments);
		this.name = "QuickJSUnknownIntrinsic";
	}
};
var QuickJSPromisePending = class extends Error {
	constructor() {
		super(...arguments);
		this.name = "QuickJSPromisePending";
	}
};
var QuickJSEmptyGetOwnPropertyNames = class extends Error {
	constructor() {
		super(...arguments);
		this.name = "QuickJSEmptyGetOwnPropertyNames";
	}
};
var QuickJSHostRefRangeExceeded = class extends Error {
	constructor() {
		super(...arguments);
		this.name = "QuickJSHostRefRangeExceeded";
	}
};
var QuickJSHostRefInvalid = class extends Error {
	constructor() {
		super(...arguments);
		this.name = "QuickJSHostRefInvalid";
	}
};
function* awaitYield(value) {
	return yield value;
}
function awaitYieldOf(generator) {
	return awaitYield(awaitEachYieldedPromise(generator));
}
var AwaitYield = awaitYield;
AwaitYield.of = awaitYieldOf;
function maybeAsyncFn(that, fn) {
	return (...args) => {
		return awaitEachYieldedPromise(fn.call(that, AwaitYield, ...args));
	};
}
function maybeAsync(that, startGenerator) {
	return awaitEachYieldedPromise(startGenerator.call(that, AwaitYield));
}
function awaitEachYieldedPromise(gen) {
	function handleNextStep(step) {
		return step.done ? step.value : step.value instanceof Promise ? step.value.then((value) => handleNextStep(gen.next(value)), (error) => handleNextStep(gen.throw(error))) : handleNextStep(gen.next(step.value));
	}
	return handleNextStep(gen.next());
}
var UsingDisposable = class {
	[Symbol.dispose]() {
		return this.dispose();
	}
};
var SymbolDispose = Symbol.dispose ?? Symbol.for("Symbol.dispose");
var prototypeAsAny = UsingDisposable.prototype;
prototypeAsAny[SymbolDispose] || (prototypeAsAny[SymbolDispose] = function() {
	return this.dispose();
});
var Lifetime = class _Lifetime extends UsingDisposable {
	constructor(_value, copier, disposer, _owner) {
		super();
		this._value = _value;
		this.copier = copier;
		this.disposer = disposer;
		this._owner = _owner;
		this._alive = !0;
		this._constructorStack = QTS_DEBUG ? (/* @__PURE__ */ new Error("Lifetime constructed")).stack : void 0;
	}
	get alive() {
		return this._alive;
	}
	get value() {
		return this.assertAlive(), this._value;
	}
	get owner() {
		return this._owner;
	}
	get dupable() {
		return !!this.copier;
	}
	dup() {
		if (this.assertAlive(), !this.copier) throw new Error("Non-dupable lifetime");
		return new _Lifetime(this.copier(this._value), this.copier, this.disposer, this._owner);
	}
	consume(map) {
		this.assertAlive();
		let result = map(this);
		return this.dispose(), result;
	}
	map(map) {
		return this.assertAlive(), map(this);
	}
	tap(fn) {
		return fn(this), this;
	}
	dispose() {
		this.assertAlive(), this.disposer && this.disposer(this._value), this._alive = !1;
	}
	assertAlive() {
		if (!this.alive) throw this._constructorStack ? new QuickJSUseAfterFree(`Lifetime not alive
${this._constructorStack}
Lifetime used`) : new QuickJSUseAfterFree("Lifetime not alive");
	}
};
var StaticLifetime = class extends Lifetime {
	constructor(value, owner) {
		super(value, void 0, void 0, owner);
	}
	get dupable() {
		return !0;
	}
	dup() {
		return this;
	}
	dispose() {}
};
var WeakLifetime = class extends Lifetime {
	constructor(value, copier, disposer, owner) {
		super(value, copier, disposer, owner);
	}
	dispose() {
		this._alive = !1;
	}
};
function scopeFinally(scope, blockError) {
	let disposeError;
	try {
		scope.dispose();
	} catch (error) {
		disposeError = error;
	}
	if (blockError && disposeError) throw Object.assign(blockError, {
		message: `${blockError.message}
 Then, failed to dispose scope: ${disposeError.message}`,
		disposeError
	}), blockError;
	if (blockError || disposeError) throw blockError || disposeError;
}
var Scope = class _Scope extends UsingDisposable {
	constructor() {
		super(...arguments);
		this._disposables = new Lifetime(/* @__PURE__ */ new Set());
		this.manage = (lifetime) => (this._disposables.value.add(lifetime), lifetime);
	}
	static withScope(block) {
		let scope = new _Scope(), blockError;
		try {
			return block(scope);
		} catch (error) {
			throw blockError = error, error;
		} finally {
			scopeFinally(scope, blockError);
		}
	}
	static withScopeMaybeAsync(_this, block) {
		return maybeAsync(void 0, function* (awaited) {
			let scope = new _Scope(), blockError;
			try {
				return yield* awaited.of(block.call(_this, awaited, scope));
			} catch (error) {
				throw blockError = error, error;
			} finally {
				scopeFinally(scope, blockError);
			}
		});
	}
	static async withScopeAsync(block) {
		let scope = new _Scope(), blockError;
		try {
			return await block(scope);
		} catch (error) {
			throw blockError = error, error;
		} finally {
			scopeFinally(scope, blockError);
		}
	}
	get alive() {
		return this._disposables.alive;
	}
	dispose() {
		let lifetimes = Array.from(this._disposables.value.values()).reverse();
		for (let lifetime of lifetimes) lifetime.alive && lifetime.dispose();
		this._disposables.dispose();
	}
};
function createDisposableArray(items) {
	let array = items ? Array.from(items) : [];
	function disposeAlive() {
		return array.forEach((disposable) => disposable.alive ? disposable.dispose() : void 0);
	}
	function someIsAlive() {
		return array.some((disposable) => disposable.alive);
	}
	return Object.defineProperty(array, SymbolDispose, {
		configurable: !0,
		enumerable: !1,
		value: disposeAlive
	}), Object.defineProperty(array, "dispose", {
		configurable: !0,
		enumerable: !1,
		value: disposeAlive
	}), Object.defineProperty(array, "alive", {
		configurable: !0,
		enumerable: !1,
		get: someIsAlive
	}), array;
}
function isDisposable(value) {
	return !!(value && (typeof value == "object" || typeof value == "function") && "alive" in value && typeof value.alive == "boolean" && "dispose" in value && typeof value.dispose == "function");
}
var AbstractDisposableResult = class _AbstractDisposableResult extends UsingDisposable {
	static success(value) {
		return new DisposableSuccess(value);
	}
	static fail(error, onUnwrap) {
		return new DisposableFail(error, onUnwrap);
	}
	static is(result) {
		return result instanceof _AbstractDisposableResult;
	}
};
var DisposableSuccess = class extends AbstractDisposableResult {
	constructor(value) {
		super();
		this.value = value;
	}
	get alive() {
		return isDisposable(this.value) ? this.value.alive : !0;
	}
	dispose() {
		isDisposable(this.value) && this.value.dispose();
	}
	unwrap() {
		return this.value;
	}
	unwrapOr(_fallback) {
		return this.value;
	}
};
var DisposableFail = class extends AbstractDisposableResult {
	constructor(error, onUnwrap) {
		super();
		this.error = error;
		this.onUnwrap = onUnwrap;
	}
	get alive() {
		return isDisposable(this.error) ? this.error.alive : !0;
	}
	dispose() {
		isDisposable(this.error) && this.error.dispose();
	}
	unwrap() {
		throw this.onUnwrap(this), this.error;
	}
	unwrapOr(fallback) {
		return fallback;
	}
};
var DisposableResult = AbstractDisposableResult;
var QuickJSDeferredPromise = class extends UsingDisposable {
	constructor(args) {
		super();
		this.resolve = (value) => {
			this.resolveHandle.alive && (this.context.unwrapResult(this.context.callFunction(this.resolveHandle, this.context.undefined, value || this.context.undefined)).dispose(), this.disposeResolvers(), this.onSettled());
		};
		this.reject = (value) => {
			this.rejectHandle.alive && (this.context.unwrapResult(this.context.callFunction(this.rejectHandle, this.context.undefined, value || this.context.undefined)).dispose(), this.disposeResolvers(), this.onSettled());
		};
		this.dispose = () => {
			this.handle.alive && this.handle.dispose(), this.disposeResolvers();
		};
		this.context = args.context, this.owner = args.context.runtime, this.handle = args.promiseHandle, this.settled = new Promise((resolve) => {
			this.onSettled = resolve;
		}), this.resolveHandle = args.resolveHandle, this.rejectHandle = args.rejectHandle;
	}
	get alive() {
		return this.handle.alive || this.resolveHandle.alive || this.rejectHandle.alive;
	}
	disposeResolvers() {
		this.resolveHandle.alive && this.resolveHandle.dispose(), this.rejectHandle.alive && this.rejectHandle.dispose();
	}
};
var ModuleMemory = class {
	constructor(module) {
		this.module = module;
	}
	toPointerArray(handleArray) {
		let typedArray = new Int32Array(handleArray.map((handle) => handle.value)), numBytes = typedArray.length * typedArray.BYTES_PER_ELEMENT, ptr = this.module._malloc(numBytes);
		return new Uint8Array(this.module.HEAPU8.buffer, ptr, numBytes).set(new Uint8Array(typedArray.buffer)), new Lifetime(ptr, void 0, (ptr2) => this.module._free(ptr2));
	}
	newTypedArray(kind, length) {
		let zeros = new kind(new Array(length).fill(0)), numBytes = zeros.length * zeros.BYTES_PER_ELEMENT, ptr = this.module._malloc(numBytes), typedArray = new kind(this.module.HEAPU8.buffer, ptr, length);
		return typedArray.set(zeros), new Lifetime({
			typedArray,
			ptr
		}, void 0, (value) => this.module._free(value.ptr));
	}
	newMutablePointerArray(length) {
		return this.newTypedArray(Int32Array, length);
	}
	newHeapCharPointer(string) {
		let strlen = this.module.lengthBytesUTF8(string), dataBytes = strlen + 1, ptr = this.module._malloc(dataBytes);
		return this.module.stringToUTF8(string, ptr, dataBytes), new Lifetime({
			ptr,
			strlen
		}, void 0, (value) => this.module._free(value.ptr));
	}
	newHeapBufferPointer(buffer) {
		let numBytes = buffer.byteLength, ptr = this.module._malloc(numBytes);
		return this.module.HEAPU8.set(buffer, ptr), new Lifetime({
			pointer: ptr,
			numBytes
		}, void 0, (value) => this.module._free(value.pointer));
	}
	consumeHeapCharPointer(ptr) {
		let str = this.module.UTF8ToString(ptr);
		return this.module._free(ptr), str;
	}
};
Object.freeze({
	BaseObjects: !0,
	Date: !0,
	Eval: !0,
	StringNormalize: !0,
	RegExp: !0,
	JSON: !0,
	Proxy: !0,
	MapSet: !0,
	TypedArrays: !0,
	Promise: !0
});
function intrinsicsToFlags(intrinsics) {
	if (!intrinsics) return 0;
	let result = 0;
	for (let [maybeIntrinsicName, enabled] of Object.entries(intrinsics)) {
		if (!(maybeIntrinsicName in IntrinsicsFlags)) throw new QuickJSUnknownIntrinsic(maybeIntrinsicName);
		enabled && (result |= IntrinsicsFlags[maybeIntrinsicName]);
	}
	return result;
}
function evalOptionsToFlags(evalOptions) {
	if (typeof evalOptions == "number") return evalOptions;
	if (evalOptions === void 0) return 0;
	let { type, strict, strip, compileOnly, backtraceBarrier } = evalOptions, flags = 0;
	return type === "global" && (flags |= EvalFlags.JS_EVAL_TYPE_GLOBAL), type === "module" && (flags |= EvalFlags.JS_EVAL_TYPE_MODULE), strict && (flags |= EvalFlags.JS_EVAL_FLAG_STRICT), strip && (flags |= EvalFlags.JS_EVAL_FLAG_STRIP), compileOnly && (flags |= EvalFlags.JS_EVAL_FLAG_COMPILE_ONLY), backtraceBarrier && (flags |= EvalFlags.JS_EVAL_FLAG_BACKTRACE_BARRIER), flags;
}
function getOwnPropertyNamesOptionsToFlags(options) {
	if (typeof options == "number") return options;
	if (options === void 0) return 0;
	let { strings: includeStrings, symbols: includeSymbols, quickjsPrivate: includePrivate, onlyEnumerable, numbers: includeNumbers, numbersAsStrings } = options, flags = 0;
	return includeStrings && (flags |= GetOwnPropertyNamesFlags.JS_GPN_STRING_MASK), includeSymbols && (flags |= GetOwnPropertyNamesFlags.JS_GPN_SYMBOL_MASK), includePrivate && (flags |= GetOwnPropertyNamesFlags.JS_GPN_PRIVATE_MASK), onlyEnumerable && (flags |= GetOwnPropertyNamesFlags.JS_GPN_ENUM_ONLY), includeNumbers && (flags |= GetOwnPropertyNamesFlags.QTS_GPN_NUMBER_MASK), numbersAsStrings && (flags |= GetOwnPropertyNamesFlags.QTS_STANDARD_COMPLIANT_NUMBER), flags;
}
function concat(...values) {
	let result = [];
	for (let value of values) value !== void 0 && (result = result.concat(value));
	return result;
}
var QuickJSIterator = class extends UsingDisposable {
	constructor(handle, context) {
		super();
		this.handle = handle;
		this.context = context;
		this._isDone = !1;
		this.owner = context.runtime;
	}
	[Symbol.iterator]() {
		return this;
	}
	next(value) {
		if (!this.alive || this._isDone) return {
			done: !0,
			value: void 0
		};
		let nextMethod = this._next ?? (this._next = this.context.getProp(this.handle, "next"));
		return this.callIteratorMethod(nextMethod, value);
	}
	return(value) {
		if (!this.alive) return {
			done: !0,
			value: void 0
		};
		let returnMethod = this.context.getProp(this.handle, "return");
		if (returnMethod === this.context.undefined && value === void 0) return this.dispose(), {
			done: !0,
			value: void 0
		};
		let result = this.callIteratorMethod(returnMethod, value);
		return returnMethod.dispose(), this.dispose(), result;
	}
	throw(e) {
		if (!this.alive) return {
			done: !0,
			value: void 0
		};
		let errorHandle = e instanceof Lifetime ? e : this.context.newError(e), throwMethod = this.context.getProp(this.handle, "throw"), result = this.callIteratorMethod(throwMethod, e);
		return errorHandle.alive && errorHandle.dispose(), throwMethod.dispose(), this.dispose(), result;
	}
	get alive() {
		return this.handle.alive;
	}
	dispose() {
		this._isDone = !0, this.handle.dispose(), this._next?.dispose();
	}
	callIteratorMethod(method, input) {
		let callResult = input ? this.context.callFunction(method, this.handle, input) : this.context.callFunction(method, this.handle);
		if (callResult.error) return this.dispose(), { value: callResult };
		let done = this.context.getProp(callResult.value, "done").consume((v) => this.context.dump(v)), value = this.context.getProp(callResult.value, "value");
		return callResult.value.dispose(), done && this.dispose(), {
			value: DisposableResult.success(value),
			done
		};
	}
};
var INT32_MIN = -2147483648;
var INT32_MAX = 2147483647;
var INVALID_HOST_REF_ID = 0;
function getGroupId(id) {
	return id >> 8;
}
var HostRefMap = class {
	constructor() {
		this.nextId = INT32_MIN;
		this.freelist = [];
		this.groups = /* @__PURE__ */ new Map();
	}
	put(value) {
		let id = this.allocateId(), groupId = getGroupId(id), group = this.groups.get(groupId);
		return group || (group = /* @__PURE__ */ new Map(), this.groups.set(groupId, group)), group.set(id, value), id;
	}
	get(id) {
		if (id === INVALID_HOST_REF_ID) throw new QuickJSHostRefInvalid("no host reference id defined");
		let groupId = getGroupId(id), group = this.groups.get(groupId);
		if (!group) throw new QuickJSHostRefInvalid(`host reference id ${id} is not defined`);
		let value = group.get(id);
		if (!value) throw new QuickJSHostRefInvalid(`host reference id ${id} is not defined`);
		return value;
	}
	delete(id) {
		if (id === INVALID_HOST_REF_ID) throw new QuickJSHostRefInvalid("no host reference id defined");
		let groupId = getGroupId(id), group = this.groups.get(groupId);
		if (!group) throw new QuickJSHostRefInvalid(`host reference id ${id} is not defined`);
		group.delete(id), group.size === 0 && this.groups.delete(groupId), this.freelist.push(id);
	}
	allocateId() {
		if (this.freelist.length > 0) return this.freelist.shift();
		if (this.nextId === INVALID_HOST_REF_ID && this.nextId++, this.nextId > INT32_MAX) throw new QuickJSHostRefRangeExceeded(`HostRefMap: too many host refs created without disposing. Max simultaneous host refs: ${INT32_MAX - INT32_MIN}`);
		return this.nextId++;
	}
};
var HostRef = class extends UsingDisposable {
	constructor(runtime, handle, id) {
		if (id === INVALID_HOST_REF_ID) throw new QuickJSHostRefInvalid("cannot create HostRef with undefined id");
		super();
		this.runtime = runtime;
		this.handle = handle;
		this.id = id;
	}
	get alive() {
		return this.handle.alive;
	}
	dispose() {
		this.handle.dispose();
	}
	get value() {
		return this.runtime.hostRefs.get(this.id);
	}
};
var ContextMemory = class extends ModuleMemory {
	constructor(args) {
		super(args.module);
		this.scope = new Scope();
		this.copyJSValue = (ptr) => this.ffi.QTS_DupValuePointer(this.ctx.value, ptr);
		this.freeJSValue = (ptr) => {
			this.ffi.QTS_FreeValuePointer(this.ctx.value, ptr);
		};
		args.ownedLifetimes?.forEach((lifetime) => this.scope.manage(lifetime)), this.owner = args.owner, this.module = args.module, this.ffi = args.ffi, this.rt = args.rt, this.ctx = this.scope.manage(args.ctx);
	}
	get alive() {
		return this.scope.alive;
	}
	dispose() {
		return this.scope.dispose();
	}
	[Symbol.dispose]() {
		return this.dispose();
	}
	manage(lifetime) {
		return this.scope.manage(lifetime);
	}
	consumeJSCharPointer(ptr) {
		let str = this.module.UTF8ToString(ptr);
		return this.ffi.QTS_FreeCString(this.ctx.value, ptr), str;
	}
	heapValueHandle(ptr, extraDispose) {
		let dispose = extraDispose ? (val) => {
			extraDispose(), this.freeJSValue(val);
		} : this.freeJSValue;
		return new Lifetime(ptr, this.copyJSValue, dispose, this.owner);
	}
	staticHeapValueHandle(ptr) {
		return this.manage(this.heapValueHandle(ptr)), new StaticLifetime(ptr, this.owner);
	}
};
var QuickJSContext = class extends UsingDisposable {
	constructor(args) {
		super();
		this._undefined = void 0;
		this._null = void 0;
		this._false = void 0;
		this._true = void 0;
		this._global = void 0;
		this._BigInt = void 0;
		this._Symbol = void 0;
		this._SymbolIterator = void 0;
		this._SymbolAsyncIterator = void 0;
		this.cToHostCallbacks = { callFunction: (ctx, this_ptr, argc, argv, fn_id) => {
			if (ctx !== this.ctx.value) throw new Error("QuickJSContext instance received C -> JS call with mismatched ctx");
			let fn = this.getFunction(fn_id);
			return Scope.withScopeMaybeAsync(this, function* (awaited, scope) {
				let thisHandle = scope.manage(new WeakLifetime(this_ptr, this.memory.copyJSValue, this.memory.freeJSValue, this.runtime)), argHandles = new Array(argc);
				for (let i = 0; i < argc; i++) {
					let ptr = this.ffi.QTS_ArgvGetJSValueConstPointer(argv, i);
					argHandles[i] = scope.manage(new WeakLifetime(ptr, this.memory.copyJSValue, this.memory.freeJSValue, this.runtime));
				}
				try {
					let result = yield* awaited(fn.apply(thisHandle, argHandles));
					if (result) {
						if ("error" in result && result.error) throw this.runtime.debugLog("throw error", result.error), result.error;
						let handle = scope.manage(result instanceof Lifetime ? result : result.value);
						return this.ffi.QTS_DupValuePointer(this.ctx.value, handle.value);
					}
					return 0;
				} catch (error) {
					return this.errorToHandle(error).consume((errorHandle) => this.ffi.QTS_Throw(this.ctx.value, errorHandle.value));
				}
			});
		} };
		this.runtime = args.runtime, this.module = args.module, this.ffi = args.ffi, this.rt = args.rt, this.ctx = args.ctx, this.memory = new ContextMemory({
			...args,
			owner: this.runtime
		}), args.callbacks.setContextCallbacks(this.ctx.value, this.cToHostCallbacks), this.dump = this.dump.bind(this), this.getString = this.getString.bind(this), this.getNumber = this.getNumber.bind(this), this.resolvePromise = this.resolvePromise.bind(this), this.uint32Out = this.memory.manage(this.memory.newTypedArray(Uint32Array, 1));
	}
	get alive() {
		return this.memory.alive;
	}
	dispose() {
		this.memory.dispose();
	}
	get undefined() {
		if (this._undefined) return this._undefined;
		let ptr = this.ffi.QTS_GetUndefined();
		return this._undefined = new StaticLifetime(ptr);
	}
	get null() {
		if (this._null) return this._null;
		let ptr = this.ffi.QTS_GetNull();
		return this._null = new StaticLifetime(ptr);
	}
	get true() {
		if (this._true) return this._true;
		let ptr = this.ffi.QTS_GetTrue();
		return this._true = new StaticLifetime(ptr);
	}
	get false() {
		if (this._false) return this._false;
		let ptr = this.ffi.QTS_GetFalse();
		return this._false = new StaticLifetime(ptr);
	}
	get global() {
		if (this._global) return this._global;
		let ptr = this.ffi.QTS_GetGlobalObject(this.ctx.value);
		return this._global = this.memory.staticHeapValueHandle(ptr), this._global;
	}
	newNumber(num) {
		return this.memory.heapValueHandle(this.ffi.QTS_NewFloat64(this.ctx.value, num));
	}
	newString(str) {
		let ptr = this.memory.newHeapCharPointer(str).consume((charHandle) => this.ffi.QTS_NewString(this.ctx.value, charHandle.value.ptr));
		return this.memory.heapValueHandle(ptr);
	}
	newUniqueSymbol(description) {
		let key = (typeof description == "symbol" ? description.description : description) ?? "", ptr = this.memory.newHeapCharPointer(key).consume((charHandle) => this.ffi.QTS_NewSymbol(this.ctx.value, charHandle.value.ptr, 0));
		return this.memory.heapValueHandle(ptr);
	}
	newSymbolFor(key) {
		let description = (typeof key == "symbol" ? key.description : key) ?? "", ptr = this.memory.newHeapCharPointer(description).consume((charHandle) => this.ffi.QTS_NewSymbol(this.ctx.value, charHandle.value.ptr, 1));
		return this.memory.heapValueHandle(ptr);
	}
	getWellKnownSymbol(name) {
		return this._Symbol ?? (this._Symbol = this.memory.manage(this.getProp(this.global, "Symbol"))), this.getProp(this._Symbol, name);
	}
	newBigInt(num) {
		if (!this._BigInt) {
			let bigIntHandle2 = this.getProp(this.global, "BigInt");
			this.memory.manage(bigIntHandle2), this._BigInt = new StaticLifetime(bigIntHandle2.value, this.runtime);
		}
		let bigIntHandle = this._BigInt, asString = String(num);
		return this.newString(asString).consume((handle) => this.unwrapResult(this.callFunction(bigIntHandle, this.undefined, handle)));
	}
	newObject(prototype) {
		prototype && this.runtime.assertOwned(prototype);
		let ptr = prototype ? this.ffi.QTS_NewObjectProto(this.ctx.value, prototype.value) : this.ffi.QTS_NewObject(this.ctx.value);
		return this.memory.heapValueHandle(ptr);
	}
	newArray() {
		let ptr = this.ffi.QTS_NewArray(this.ctx.value);
		return this.memory.heapValueHandle(ptr);
	}
	newArrayBuffer(buffer) {
		let array = new Uint8Array(buffer), handle = this.memory.newHeapBufferPointer(array), ptr = this.ffi.QTS_NewArrayBuffer(this.ctx.value, handle.value.pointer, array.length);
		return this.memory.heapValueHandle(ptr);
	}
	newPromise(value) {
		let deferredPromise = Scope.withScope((scope) => {
			let mutablePointerArray = scope.manage(this.memory.newMutablePointerArray(2)), promisePtr = this.ffi.QTS_NewPromiseCapability(this.ctx.value, mutablePointerArray.value.ptr), promiseHandle = this.memory.heapValueHandle(promisePtr), [resolveHandle, rejectHandle] = Array.from(mutablePointerArray.value.typedArray).map((jsvaluePtr) => this.memory.heapValueHandle(jsvaluePtr));
			return new QuickJSDeferredPromise({
				context: this,
				promiseHandle,
				resolveHandle,
				rejectHandle
			});
		});
		return value && typeof value == "function" && (value = new Promise(value)), value && Promise.resolve(value).then(deferredPromise.resolve, (error) => error instanceof Lifetime ? deferredPromise.reject(error) : this.newError(error).consume(deferredPromise.reject)), deferredPromise;
	}
	newFunction(nameOrFn, maybeFn) {
		let fn = typeof nameOrFn == "function" ? nameOrFn : maybeFn;
		if (!fn) throw new TypeError("Expected a function");
		return this.newFunctionWithOptions({
			name: typeof nameOrFn == "string" ? nameOrFn : void 0,
			length: fn.length,
			isConstructor: !1,
			fn
		});
	}
	newConstructorFunction(nameOrFn, maybeFn) {
		let fn = typeof nameOrFn == "function" ? nameOrFn : maybeFn;
		if (!fn) throw new TypeError("Expected a function");
		return this.newFunctionWithOptions({
			name: typeof nameOrFn == "string" ? nameOrFn : void 0,
			length: fn.length,
			isConstructor: !0,
			fn
		});
	}
	newFunctionWithOptions(args) {
		let { name, length, isConstructor, fn } = args, refId = this.runtime.hostRefs.put(fn);
		try {
			return this.memory.heapValueHandle(this.ffi.QTS_NewFunction(this.ctx.value, name ?? "", length, isConstructor, refId));
		} catch (error) {
			throw this.runtime.hostRefs.delete(refId), error;
		}
	}
	newError(error) {
		let errorHandle = this.memory.heapValueHandle(this.ffi.QTS_NewError(this.ctx.value));
		return error && typeof error == "object" ? (error.name !== void 0 && this.newString(error.name).consume((handle) => this.setProp(errorHandle, "name", handle)), error.message !== void 0 && this.newString(error.message).consume((handle) => this.setProp(errorHandle, "message", handle))) : typeof error == "string" ? this.newString(error).consume((handle) => this.setProp(errorHandle, "message", handle)) : error !== void 0 && this.newString(String(error)).consume((handle) => this.setProp(errorHandle, "message", handle)), errorHandle;
	}
	newHostRef(value) {
		let id = this.runtime.hostRefs.put(value);
		try {
			let handle = this.memory.heapValueHandle(this.ffi.QTS_NewHostRef(this.ctx.value, id));
			return new HostRef(this.runtime, handle, id);
		} catch (error) {
			throw this.runtime.hostRefs.delete(id), error;
		}
	}
	toHostRef(handle) {
		let id = this.ffi.QTS_GetHostRefId(handle.value);
		if (id !== 0) return this.runtime.hostRefs.get(id), new HostRef(this.runtime, handle.dup(), id);
	}
	unwrapHostRef(handle) {
		let id = this.ffi.QTS_GetHostRefId(handle.value);
		if (id === 0) throw new QuickJSHostRefInvalid("handle is not a HostRef");
		return this.runtime.hostRefs.get(id);
	}
	typeof(handle) {
		return this.runtime.assertOwned(handle), this.memory.consumeHeapCharPointer(this.ffi.QTS_Typeof(this.ctx.value, handle.value));
	}
	getNumber(handle) {
		return this.runtime.assertOwned(handle), this.ffi.QTS_GetFloat64(this.ctx.value, handle.value);
	}
	getString(handle) {
		return this.runtime.assertOwned(handle), this.memory.consumeJSCharPointer(this.ffi.QTS_GetString(this.ctx.value, handle.value));
	}
	getSymbol(handle) {
		this.runtime.assertOwned(handle);
		let key = this.memory.consumeJSCharPointer(this.ffi.QTS_GetSymbolDescriptionOrKey(this.ctx.value, handle.value));
		return this.ffi.QTS_IsGlobalSymbol(this.ctx.value, handle.value) ? Symbol.for(key) : Symbol(key);
	}
	getBigInt(handle) {
		this.runtime.assertOwned(handle);
		let asString = this.getString(handle);
		return BigInt(asString);
	}
	getArrayBuffer(handle) {
		this.runtime.assertOwned(handle);
		let len = this.ffi.QTS_GetArrayBufferLength(this.ctx.value, handle.value), ptr = this.ffi.QTS_GetArrayBuffer(this.ctx.value, handle.value);
		if (!ptr) throw new Error("Couldn't allocate memory to get ArrayBuffer");
		return new Lifetime(this.module.HEAPU8.subarray(ptr, ptr + len), void 0, () => this.module._free(ptr));
	}
	getPromiseState(handle) {
		this.runtime.assertOwned(handle);
		let state = this.ffi.QTS_PromiseState(this.ctx.value, handle.value);
		if (state < 0) return {
			type: "fulfilled",
			value: handle,
			notAPromise: !0
		};
		if (state === JSPromiseStateEnum.Pending) return {
			type: "pending",
			get error() {
				return new QuickJSPromisePending("Cannot unwrap a pending promise");
			}
		};
		let ptr = this.ffi.QTS_PromiseResult(this.ctx.value, handle.value), result = this.memory.heapValueHandle(ptr);
		if (state === JSPromiseStateEnum.Fulfilled) return {
			type: "fulfilled",
			value: result
		};
		if (state === JSPromiseStateEnum.Rejected) return {
			type: "rejected",
			error: result
		};
		throw result.dispose(), /* @__PURE__ */ new Error(`Unknown JSPromiseStateEnum: ${state}`);
	}
	resolvePromise(promiseLikeHandle) {
		this.runtime.assertOwned(promiseLikeHandle);
		let vmResolveResult = Scope.withScope((scope) => {
			let vmPromise = scope.manage(this.getProp(this.global, "Promise")), vmPromiseResolve = scope.manage(this.getProp(vmPromise, "resolve"));
			return this.callFunction(vmPromiseResolve, vmPromise, promiseLikeHandle);
		});
		return vmResolveResult.error ? Promise.resolve(vmResolveResult) : new Promise((resolve) => {
			Scope.withScope((scope) => {
				let resolveHandle = scope.manage(this.newFunction("resolve", (value) => {
					resolve(this.success(value && value.dup()));
				})), rejectHandle = scope.manage(this.newFunction("reject", (error) => {
					resolve(this.fail(error && error.dup()));
				})), promiseHandle = scope.manage(vmResolveResult.value), promiseThenHandle = scope.manage(this.getProp(promiseHandle, "then"));
				this.callFunction(promiseThenHandle, promiseHandle, resolveHandle, rejectHandle).unwrap().dispose();
			});
		});
	}
	isEqual(a, b, equalityType = IsEqualOp.IsStrictlyEqual) {
		if (a === b) return !0;
		this.runtime.assertOwned(a), this.runtime.assertOwned(b);
		let result = this.ffi.QTS_IsEqual(this.ctx.value, a.value, b.value, equalityType);
		if (result === -1) throw new QuickJSNotImplemented("WASM variant does not expose equality");
		return !!result;
	}
	eq(handle, other) {
		return this.isEqual(handle, other, IsEqualOp.IsStrictlyEqual);
	}
	sameValue(handle, other) {
		return this.isEqual(handle, other, IsEqualOp.IsSameValue);
	}
	sameValueZero(handle, other) {
		return this.isEqual(handle, other, IsEqualOp.IsSameValueZero);
	}
	getProp(handle, key) {
		this.runtime.assertOwned(handle);
		let ptr;
		return typeof key == "number" && key >= 0 ? ptr = this.ffi.QTS_GetPropNumber(this.ctx.value, handle.value, key) : ptr = this.borrowPropertyKey(key).consume((quickJSKey) => this.ffi.QTS_GetProp(this.ctx.value, handle.value, quickJSKey.value)), this.memory.heapValueHandle(ptr);
	}
	getLength(handle) {
		if (this.runtime.assertOwned(handle), !(this.ffi.QTS_GetLength(this.ctx.value, this.uint32Out.value.ptr, handle.value) < 0)) return this.uint32Out.value.typedArray[0];
	}
	getOwnPropertyNames(handle, options = {
		strings: !0,
		numbersAsStrings: !0
	}) {
		this.runtime.assertOwned(handle), handle.value;
		let flags = getOwnPropertyNamesOptionsToFlags(options);
		if (flags === 0) throw new QuickJSEmptyGetOwnPropertyNames("No options set, will return an empty array");
		return Scope.withScope((scope) => {
			let outPtr = scope.manage(this.memory.newMutablePointerArray(1)), errorPtr = this.ffi.QTS_GetOwnPropertyNames(this.ctx.value, outPtr.value.ptr, this.uint32Out.value.ptr, handle.value, flags);
			if (errorPtr) return this.fail(this.memory.heapValueHandle(errorPtr));
			let len = this.uint32Out.value.typedArray[0], ptr = outPtr.value.typedArray[0], pointerArray = new Uint32Array(this.module.HEAP8.buffer, ptr, len), handles = Array.from(pointerArray).map((ptr2) => this.memory.heapValueHandle(ptr2));
			return this.ffi.QTS_FreeVoidPointer(this.ctx.value, ptr), this.success(createDisposableArray(handles));
		});
	}
	getIterator(iterableHandle) {
		let SymbolIterator = this._SymbolIterator ?? (this._SymbolIterator = this.memory.manage(this.getWellKnownSymbol("iterator")));
		return Scope.withScope((scope) => {
			let methodHandle = scope.manage(this.getProp(iterableHandle, SymbolIterator)), iteratorCallResult = this.callFunction(methodHandle, iterableHandle);
			return iteratorCallResult.error ? iteratorCallResult : this.success(new QuickJSIterator(iteratorCallResult.value, this));
		});
	}
	setProp(handle, key, value) {
		this.runtime.assertOwned(handle), this.borrowPropertyKey(key).consume((quickJSKey) => this.ffi.QTS_SetProp(this.ctx.value, handle.value, quickJSKey.value, value.value));
	}
	defineProp(handle, key, descriptor) {
		this.runtime.assertOwned(handle), Scope.withScope((scope) => {
			let quickJSKey = scope.manage(this.borrowPropertyKey(key)), value = descriptor.value || this.undefined, configurable = !!descriptor.configurable, enumerable = !!descriptor.enumerable, hasValue = !!descriptor.value, get = descriptor.get ? scope.manage(this.newFunction(descriptor.get.name, descriptor.get)) : this.undefined, set = descriptor.set ? scope.manage(this.newFunction(descriptor.set.name, descriptor.set)) : this.undefined;
			this.ffi.QTS_DefineProp(this.ctx.value, handle.value, quickJSKey.value, value.value, get.value, set.value, configurable, enumerable, hasValue);
		});
	}
	callFunction(func, thisVal, ...restArgs) {
		this.runtime.assertOwned(func);
		let args, firstArg = restArgs[0];
		firstArg === void 0 || Array.isArray(firstArg) ? args = firstArg ?? [] : args = restArgs;
		let resultPtr = this.memory.toPointerArray(args).consume((argsArrayPtr) => this.ffi.QTS_Call(this.ctx.value, func.value, thisVal.value, args.length, argsArrayPtr.value)), errorPtr = this.ffi.QTS_ResolveException(this.ctx.value, resultPtr);
		return errorPtr ? (this.ffi.QTS_FreeValuePointer(this.ctx.value, resultPtr), this.fail(this.memory.heapValueHandle(errorPtr))) : this.success(this.memory.heapValueHandle(resultPtr));
	}
	callMethod(thisHandle, key, args = []) {
		return this.getProp(thisHandle, key).consume((func) => this.callFunction(func, thisHandle, args));
	}
	evalCode(code, filename = "eval.js", options) {
		let detectModule = options === void 0 ? 1 : 0, flags = evalOptionsToFlags(options), resultPtr = this.memory.newHeapCharPointer(code).consume((charHandle) => this.ffi.QTS_Eval(this.ctx.value, charHandle.value.ptr, charHandle.value.strlen, filename, detectModule, flags)), errorPtr = this.ffi.QTS_ResolveException(this.ctx.value, resultPtr);
		return errorPtr ? (this.ffi.QTS_FreeValuePointer(this.ctx.value, resultPtr), this.fail(this.memory.heapValueHandle(errorPtr))) : this.success(this.memory.heapValueHandle(resultPtr));
	}
	throw(error) {
		return this.errorToHandle(error).consume((handle) => this.ffi.QTS_Throw(this.ctx.value, handle.value));
	}
	borrowPropertyKey(key) {
		return typeof key == "number" ? this.newNumber(key) : typeof key == "string" ? this.newString(key) : new StaticLifetime(key.value, this.runtime);
	}
	getMemory(rt) {
		if (rt === this.rt.value) return this.memory;
		throw new Error("Private API. Cannot get memory from a different runtime");
	}
	dump(handle) {
		this.runtime.assertOwned(handle);
		let type = this.typeof(handle);
		if (type === "string") return this.getString(handle);
		if (type === "number") return this.getNumber(handle);
		if (type === "bigint") return this.getBigInt(handle);
		if (type === "undefined") return;
		if (type === "symbol") return this.getSymbol(handle);
		let asPromiseState = this.getPromiseState(handle);
		if (asPromiseState.type === "fulfilled" && !asPromiseState.notAPromise) return handle.dispose(), {
			type: asPromiseState.type,
			value: asPromiseState.value.consume(this.dump)
		};
		if (asPromiseState.type === "pending") return handle.dispose(), { type: asPromiseState.type };
		if (asPromiseState.type === "rejected") return handle.dispose(), {
			type: asPromiseState.type,
			error: asPromiseState.error.consume(this.dump)
		};
		let str = this.memory.consumeJSCharPointer(this.ffi.QTS_Dump(this.ctx.value, handle.value));
		try {
			return JSON.parse(str);
		} catch {
			return str;
		}
	}
	unwrapResult(result) {
		if (result.error) {
			let context = "context" in result.error ? result.error.context : this, cause = result.error.consume((error) => this.dump(error));
			if (cause && typeof cause == "object" && typeof cause.message == "string") {
				let { message, name, stack, ...rest } = cause, exception = new QuickJSUnwrapError(cause, context);
				typeof name == "string" && (exception.name = cause.name), exception.message = message;
				let hostStack = exception.stack;
				throw typeof stack == "string" && (exception.stack = `${name}: ${message}
${cause.stack}Host: ${hostStack}`), Object.assign(exception, rest), exception;
			}
			throw new QuickJSUnwrapError(cause);
		}
		return result.value;
	}
	[Symbol.for("nodejs.util.inspect.custom")]() {
		return this.alive ? `${this.constructor.name} { ctx: ${this.ctx.value} rt: ${this.rt.value} }` : `${this.constructor.name} { disposed }`;
	}
	getFunction(fn_id) {
		let fn = this.runtime.hostRefs.get(fn_id);
		if (typeof fn != "function") throw new Error(`Host reference ${fn_id} is not a function`);
		return fn;
	}
	errorToHandle(error) {
		return error instanceof Lifetime ? error : this.newError(error);
	}
	encodeBinaryJSON(handle) {
		let ptr = this.ffi.QTS_bjson_encode(this.ctx.value, handle.value);
		return this.memory.heapValueHandle(ptr);
	}
	decodeBinaryJSON(handle) {
		let ptr = this.ffi.QTS_bjson_decode(this.ctx.value, handle.value);
		return this.memory.heapValueHandle(ptr);
	}
	success(value) {
		return DisposableResult.success(value);
	}
	fail(error) {
		return DisposableResult.fail(error, (error2) => this.unwrapResult(error2));
	}
};
var QuickJSRuntime = class extends UsingDisposable {
	constructor(args) {
		super();
		this.scope = new Scope();
		this.contextMap = /* @__PURE__ */ new Map();
		this.hostRefs = new HostRefMap();
		this._debugMode = !1;
		this.cToHostCallbacks = {
			freeHostRef: (rt, host_ref_id) => {
				if (rt !== this.rt.value) throw new Error("Runtime pointer mismatch");
				this.hostRefs.delete(host_ref_id);
			},
			shouldInterrupt: (rt) => {
				if (rt !== this.rt.value) throw new Error("QuickJSContext instance received C -> JS interrupt with mismatched rt");
				let fn = this.interruptHandler;
				if (!fn) throw new Error("QuickJSContext had no interrupt handler");
				return fn(this) ? 1 : 0;
			},
			loadModuleSource: maybeAsyncFn(this, function* (awaited, rt, ctx, moduleName) {
				let moduleLoader = this.moduleLoader;
				if (!moduleLoader) throw new Error("Runtime has no module loader");
				if (rt !== this.rt.value) throw new Error("Runtime pointer mismatch");
				let context = this.contextMap.get(ctx) ?? this.newContext({ contextPointer: ctx });
				try {
					let result = yield* awaited(moduleLoader(moduleName, context));
					if (typeof result == "object" && "error" in result && result.error) throw this.debugLog("cToHostLoadModule: loader returned error", result.error), result.error;
					let moduleSource = typeof result == "string" ? result : "value" in result ? result.value : result;
					return this.memory.newHeapCharPointer(moduleSource).value.ptr;
				} catch (error) {
					return this.debugLog("cToHostLoadModule: caught error", error), context.throw(error), 0;
				}
			}),
			normalizeModule: maybeAsyncFn(this, function* (awaited, rt, ctx, baseModuleName, moduleNameRequest) {
				let moduleNormalizer = this.moduleNormalizer;
				if (!moduleNormalizer) throw new Error("Runtime has no module normalizer");
				if (rt !== this.rt.value) throw new Error("Runtime pointer mismatch");
				let context = this.contextMap.get(ctx) ?? this.newContext({ contextPointer: ctx });
				try {
					let result = yield* awaited(moduleNormalizer(baseModuleName, moduleNameRequest, context));
					if (typeof result == "object" && "error" in result && result.error) throw this.debugLog("cToHostNormalizeModule: normalizer returned error", result.error), result.error;
					let name = typeof result == "string" ? result : result.value;
					return context.getMemory(this.rt.value).newHeapCharPointer(name).value.ptr;
				} catch (error) {
					return this.debugLog("normalizeModule: caught error", error), context.throw(error), 0;
				}
			})
		};
		args.ownedLifetimes?.forEach((lifetime) => this.scope.manage(lifetime)), this.module = args.module, this.memory = new ModuleMemory(this.module), this.ffi = args.ffi, this.rt = args.rt, this.callbacks = args.callbacks, this.scope.manage(this.rt), this.callbacks.setRuntimeCallbacks(this.rt.value, this.cToHostCallbacks), this.executePendingJobs = this.executePendingJobs.bind(this);
	}
	get alive() {
		return this.scope.alive;
	}
	dispose() {
		return this.scope.dispose();
	}
	newContext(options = {}) {
		let intrinsics = intrinsicsToFlags(options.intrinsics), ctx = new Lifetime(options.contextPointer || this.ffi.QTS_NewContext(this.rt.value, intrinsics), void 0, (ctx_ptr) => {
			this.contextMap.delete(ctx_ptr), this.callbacks.deleteContext(ctx_ptr), this.ffi.QTS_FreeContext(ctx_ptr);
		}), context = new QuickJSContext({
			module: this.module,
			ctx,
			ffi: this.ffi,
			rt: this.rt,
			ownedLifetimes: options.ownedLifetimes,
			runtime: this,
			callbacks: this.callbacks
		});
		return this.contextMap.set(ctx.value, context), context;
	}
	setModuleLoader(moduleLoader, moduleNormalizer) {
		this.moduleLoader = moduleLoader, this.moduleNormalizer = moduleNormalizer, this.ffi.QTS_RuntimeEnableModuleLoader(this.rt.value, this.moduleNormalizer ? 1 : 0);
	}
	removeModuleLoader() {
		this.moduleLoader = void 0, this.ffi.QTS_RuntimeDisableModuleLoader(this.rt.value);
	}
	hasPendingJob() {
		return !!this.ffi.QTS_IsJobPending(this.rt.value);
	}
	setInterruptHandler(cb) {
		let prevInterruptHandler = this.interruptHandler;
		this.interruptHandler = cb, prevInterruptHandler || this.ffi.QTS_RuntimeEnableInterruptHandler(this.rt.value);
	}
	removeInterruptHandler() {
		this.interruptHandler && (this.ffi.QTS_RuntimeDisableInterruptHandler(this.rt.value), this.interruptHandler = void 0);
	}
	executePendingJobs(maxJobsToExecute = -1) {
		let ctxPtrOut = this.memory.newMutablePointerArray(1), valuePtr = this.ffi.QTS_ExecutePendingJob(this.rt.value, maxJobsToExecute ?? -1, ctxPtrOut.value.ptr), ctxPtr = ctxPtrOut.value.typedArray[0];
		if (ctxPtrOut.dispose(), ctxPtr === 0) return this.ffi.QTS_FreeValuePointerRuntime(this.rt.value, valuePtr), DisposableResult.success(0);
		let context = this.contextMap.get(ctxPtr) ?? this.newContext({ contextPointer: ctxPtr }), resultValue = context.getMemory(this.rt.value).heapValueHandle(valuePtr);
		if (context.typeof(resultValue) === "number") {
			let executedJobs = context.getNumber(resultValue);
			return resultValue.dispose(), DisposableResult.success(executedJobs);
		} else {
			let error = Object.assign(resultValue, { context });
			return DisposableResult.fail(error, (error2) => context.unwrapResult(error2));
		}
	}
	setMemoryLimit(limitBytes) {
		if (limitBytes < 0 && limitBytes !== -1) throw new Error("Cannot set memory limit to negative number. To unset, pass -1");
		this.ffi.QTS_RuntimeSetMemoryLimit(this.rt.value, limitBytes);
	}
	computeMemoryUsage() {
		let serviceContextMemory = this.getSystemContext().getMemory(this.rt.value);
		return serviceContextMemory.heapValueHandle(this.ffi.QTS_RuntimeComputeMemoryUsage(this.rt.value, serviceContextMemory.ctx.value));
	}
	dumpMemoryUsage() {
		return this.memory.consumeHeapCharPointer(this.ffi.QTS_RuntimeDumpMemoryUsage(this.rt.value));
	}
	setMaxStackSize(stackSize) {
		if (stackSize < 0) throw new Error("Cannot set memory limit to negative number. To unset, pass 0.");
		this.ffi.QTS_RuntimeSetMaxStackSize(this.rt.value, stackSize);
	}
	assertOwned(handle) {
		if (handle.owner && handle.owner.rt !== this.rt) throw new QuickJSWrongOwner(`Handle is not owned by this runtime: ${handle.owner.rt.value} != ${this.rt.value}`);
	}
	setDebugMode(enabled) {
		this._debugMode = enabled, this.ffi.DEBUG && this.rt.alive && this.ffi.QTS_SetDebugLogEnabled(this.rt.value, enabled ? 1 : 0);
	}
	isDebugMode() {
		return this._debugMode;
	}
	debugLog(...msg) {
		this._debugMode && console.log("quickjs-emscripten:", ...msg);
	}
	[Symbol.for("nodejs.util.inspect.custom")]() {
		return this.alive ? `${this.constructor.name} { rt: ${this.rt.value} }` : `${this.constructor.name} { disposed }`;
	}
	getSystemContext() {
		return this.context || (this.context = this.scope.manage(this.newContext())), this.context;
	}
};
var QuickJSEmscriptenModuleCallbacks = class {
	constructor(args) {
		this.freeHostRef = args.freeHostRef, this.callFunction = args.callFunction, this.shouldInterrupt = args.shouldInterrupt, this.loadModuleSource = args.loadModuleSource, this.normalizeModule = args.normalizeModule;
	}
};
var QuickJSModuleCallbacks = class {
	constructor(module) {
		this.contextCallbacks = /* @__PURE__ */ new Map();
		this.runtimeCallbacks = /* @__PURE__ */ new Map();
		this.suspendedCount = 0;
		this.cToHostCallbacks = new QuickJSEmscriptenModuleCallbacks({
			freeHostRef: (_asyncify, rt, host_ref_id) => {
				let runtimeCallbacks = this.runtimeCallbacks.get(rt);
				if (!runtimeCallbacks) throw new Error(`QuickJSRuntime(rt = ${rt}) not found when trying to free HostRef(id = ${host_ref_id})`);
				runtimeCallbacks.freeHostRef(rt, host_ref_id);
			},
			callFunction: (asyncify, ctx, this_ptr, argc, argv, fn_id) => this.handleAsyncify(asyncify, () => {
				try {
					let vm = this.contextCallbacks.get(ctx);
					if (!vm) throw new Error(`QuickJSContext(ctx = ${ctx}) not found for C function call "${fn_id}"`);
					return vm.callFunction(ctx, this_ptr, argc, argv, fn_id);
				} catch (error) {
					return console.error("[C to host error: returning null]", error), 0;
				}
			}),
			shouldInterrupt: (asyncify, rt) => this.handleAsyncify(asyncify, () => {
				try {
					let vm = this.runtimeCallbacks.get(rt);
					if (!vm) throw new Error(`QuickJSRuntime(rt = ${rt}) not found for C interrupt`);
					return vm.shouldInterrupt(rt);
				} catch (error) {
					return console.error("[C to host interrupt: returning error]", error), 1;
				}
			}),
			loadModuleSource: (asyncify, rt, ctx, moduleName) => this.handleAsyncify(asyncify, () => {
				try {
					let runtimeCallbacks = this.runtimeCallbacks.get(rt);
					if (!runtimeCallbacks) throw new Error(`QuickJSRuntime(rt = ${rt}) not found for C module loader`);
					let loadModule = runtimeCallbacks.loadModuleSource;
					if (!loadModule) throw new Error(`QuickJSRuntime(rt = ${rt}) does not support module loading`);
					return loadModule(rt, ctx, moduleName);
				} catch (error) {
					return console.error("[C to host module loader error: returning null]", error), 0;
				}
			}),
			normalizeModule: (asyncify, rt, ctx, moduleBaseName, moduleName) => this.handleAsyncify(asyncify, () => {
				try {
					let runtimeCallbacks = this.runtimeCallbacks.get(rt);
					if (!runtimeCallbacks) throw new Error(`QuickJSRuntime(rt = ${rt}) not found for C module loader`);
					let normalizeModule = runtimeCallbacks.normalizeModule;
					if (!normalizeModule) throw new Error(`QuickJSRuntime(rt = ${rt}) does not support module loading`);
					return normalizeModule(rt, ctx, moduleBaseName, moduleName);
				} catch (error) {
					return console.error("[C to host module loader error: returning null]", error), 0;
				}
			})
		});
		this.module = module, this.module.callbacks = this.cToHostCallbacks;
	}
	setRuntimeCallbacks(rt, callbacks) {
		this.runtimeCallbacks.set(rt, callbacks);
	}
	deleteRuntime(rt) {
		this.runtimeCallbacks.delete(rt);
	}
	setContextCallbacks(ctx, callbacks) {
		this.contextCallbacks.set(ctx, callbacks);
	}
	deleteContext(ctx) {
		this.contextCallbacks.delete(ctx);
	}
	handleAsyncify(asyncify, fn) {
		if (asyncify) return asyncify.handleSleep((done) => {
			try {
				let result = fn();
				if (!(result instanceof Promise)) {
					done(result);
					return;
				}
				if (this.suspended) throw new QuickJSAsyncifyError(`Already suspended at: ${this.suspended.stack}
Attempted to suspend at:`);
				this.suspended = new QuickJSAsyncifySuspended(`(${this.suspendedCount++})`), this.suspended, result.then((resolvedResult) => {
					this.suspended = void 0, done(resolvedResult);
				}, (error) => {
					console.error("QuickJS: cannot handle error in suspended function", error), this.suspended = void 0;
				});
			} catch (error) {
				throw this.suspended = void 0, error;
			}
		});
		let value = fn();
		if (value instanceof Promise) throw new Error("Promise return value not supported in non-asyncify context.");
		return value;
	}
};
function applyBaseRuntimeOptions(runtime, options) {
	options.interruptHandler && runtime.setInterruptHandler(options.interruptHandler), options.maxStackSizeBytes !== void 0 && runtime.setMaxStackSize(options.maxStackSizeBytes), options.memoryLimitBytes !== void 0 && runtime.setMemoryLimit(options.memoryLimitBytes);
}
function applyModuleEvalRuntimeOptions(runtime, options) {
	options.moduleLoader && runtime.setModuleLoader(options.moduleLoader), options.shouldInterrupt && runtime.setInterruptHandler(options.shouldInterrupt), options.memoryLimitBytes !== void 0 && runtime.setMemoryLimit(options.memoryLimitBytes), options.maxStackSizeBytes !== void 0 && runtime.setMaxStackSize(options.maxStackSizeBytes);
}
var QuickJSWASMModule = class {
	constructor(module, ffi) {
		this.module = module, this.ffi = ffi, this.callbacks = new QuickJSModuleCallbacks(module);
	}
	newRuntime(options = {}) {
		let rt = new Lifetime(this.ffi.QTS_NewRuntime(), void 0, (rt_ptr) => {
			this.ffi.QTS_FreeRuntime(rt_ptr), this.callbacks.deleteRuntime(rt_ptr);
		}), runtime = new QuickJSRuntime({
			module: this.module,
			callbacks: this.callbacks,
			ffi: this.ffi,
			rt
		});
		return applyBaseRuntimeOptions(runtime, options), options.moduleLoader && runtime.setModuleLoader(options.moduleLoader), runtime;
	}
	newContext(options = {}) {
		let runtime = this.newRuntime(), context = runtime.newContext({
			...options,
			ownedLifetimes: concat(runtime, options.ownedLifetimes)
		});
		return runtime.context = context, context;
	}
	evalCode(code, options = {}) {
		return Scope.withScope((scope) => {
			let vm = scope.manage(this.newContext());
			applyModuleEvalRuntimeOptions(vm.runtime, options);
			let result = vm.evalCode(code, "eval.js");
			if (options.memoryLimitBytes !== void 0 && vm.runtime.setMemoryLimit(-1), result.error) throw vm.dump(scope.manage(result.error));
			return vm.dump(scope.manage(result.value));
		});
	}
	getWasmMemory() {
		let memory = this.module.quickjsEmscriptenInit?.(() => {})?.getWasmMemory?.();
		if (!memory) throw new Error("Variant does not support getting WebAssembly.Memory");
		return memory;
	}
	getFFI() {
		return this.ffi;
	}
};
//#endregion
//#region node_modules/.pnpm/quickjs-emscripten-core@0.32.0/node_modules/quickjs-emscripten-core/dist/index.mjs
async function newQuickJSWASMModuleFromVariant(variantOrPromise) {
	let variant = smartUnwrap(await variantOrPromise), [wasmModuleLoader, QuickJSFFI, { QuickJSWASMModule: QuickJSWASMModule2 }] = await Promise.all([
		variant.importModuleLoader().then(smartUnwrap),
		variant.importFFI(),
		import("./module-ES6BEMUI-DO9cpg9p.js").then(smartUnwrap)
	]), wasmModule = await wasmModuleLoader();
	wasmModule.type = "sync";
	return new QuickJSWASMModule2(wasmModule, new QuickJSFFI(wasmModule));
}
function smartUnwrap(val) {
	return val && "default" in val && val.default ? val.default && "default" in val.default && val.default.default ? val.default.default : val.default : val;
}
function newVariant(baseVariant, options) {
	return {
		...baseVariant,
		async importModuleLoader() {
			let moduleLoader = smartUnwrap(await baseVariant.importModuleLoader());
			return async function() {
				let moduleLoaderArg = options.emscriptenModule ? { ...options.emscriptenModule } : {}, log = options.log ?? ((...args) => ([...args], void 0)), tapValue = (message, val) => (log(...message, val), val), force = (val) => typeof val == "function" ? val() : val;
				(options.wasmLocation || options.wasmSourceMapLocation || options.locateFile) && (moduleLoaderArg.locateFile = (fileName, relativeTo) => {
					let args = {
						fileName,
						relativeTo
					};
					if (fileName.endsWith(".wasm") && options.wasmLocation !== void 0) return tapValue(["locateFile .wasm: provide wasmLocation", args], options.wasmLocation);
					if (fileName.endsWith(".map")) {
						if (options.wasmSourceMapLocation !== void 0) return tapValue(["locateFile .map: provide wasmSourceMapLocation", args], options.wasmSourceMapLocation);
						if (options.wasmLocation && !options.locateFile) return tapValue(["locateFile .map: infer from wasmLocation", args], options.wasmLocation + ".map");
					}
					return options.locateFile ? tapValue(["locateFile: use provided fn", args], options.locateFile(fileName, relativeTo)) : tapValue(["locateFile: unhandled, passthrough", args], fileName);
				}), options.wasmBinary && (moduleLoaderArg.wasmBinary = await force(options.wasmBinary)), options.wasmMemory && (moduleLoaderArg.wasmMemory = await force(options.wasmMemory));
				let optionsWasmModule = options.wasmModule, modulePromise;
				optionsWasmModule && (moduleLoaderArg.instantiateWasm = async (imports, onSuccess) => {
					modulePromise ?? (modulePromise = Promise.resolve(force(optionsWasmModule)));
					let wasmModule = await modulePromise;
					if (!wasmModule) throw new QuickJSEmscriptenModuleError(`options.wasmModule returned ${String(wasmModule)}`);
					let instance = await WebAssembly.instantiate(wasmModule, imports);
					return onSuccess(instance), instance.exports;
				}), moduleLoaderArg.monitorRunDependencies = (left) => {
					log("monitorRunDependencies:", left);
				}, moduleLoaderArg.quickjsEmscriptenInit = () => newMockExtensions(log);
				let resultPromise = moduleLoader(moduleLoaderArg), extensions = moduleLoaderArg.quickjsEmscriptenInit?.(log);
				if (optionsWasmModule && extensions?.receiveWasmOffsetConverter && !extensions.existingWasmOffsetConverter) {
					let wasmBinary = await force(options.wasmBinary) ?? /* @__PURE__ */ new ArrayBuffer(0);
					modulePromise ?? (modulePromise = Promise.resolve(force(optionsWasmModule)));
					let wasmModule = await modulePromise;
					if (!wasmModule) throw new QuickJSEmscriptenModuleError(`options.wasmModule returned ${String(wasmModule)}`);
					extensions.receiveWasmOffsetConverter(wasmBinary, wasmModule);
				}
				if (extensions?.receiveSourceMapJSON) {
					let loadedSourceMapData = await force(options.wasmSourceMapData);
					typeof loadedSourceMapData == "string" ? extensions.receiveSourceMapJSON(JSON.parse(loadedSourceMapData)) : loadedSourceMapData ? extensions.receiveSourceMapJSON(loadedSourceMapData) : extensions.receiveSourceMapJSON({
						version: 3,
						names: [],
						sources: [],
						mappings: ""
					});
				}
				return resultPromise;
			};
		}
	};
}
function newMockExtensions(log) {
	let mockMessage = "mock called, emscripten module may not be initialized yet";
	return {
		mock: !0,
		removeRunDependency(name) {
			log(`${mockMessage}: removeRunDependency called:`, name);
		},
		receiveSourceMapJSON(data) {
			log(`${mockMessage}: receiveSourceMapJSON called:`, data);
		},
		WasmOffsetConverter: void 0,
		receiveWasmOffsetConverter(bytes, mod) {
			log(`${mockMessage}: receiveWasmOffsetConverter called:`, bytes, mod);
		}
	};
}
//#endregion
//#region src/vendor/widget-sandbox-quickjs/dist/index.mjs
var src_default = {
	type: "sync",
	importFFI: () => import("./ffi-DSW_HiY2.js").then((mod) => mod.QuickJSFFI),
	importModuleLoader: () => import("./emscripten-module.browser-c790_fVj.js").then((mod) => mod.default)
};
//#endregion
//#region \0@oxc-project+runtime@0.153.0/helpers/esm/typeof.js
function _typeof(o) {
	"@babel/helpers - typeof";
	return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
		return typeof o;
	} : function(o) {
		return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
	}, _typeof(o);
}
//#endregion
//#region \0@oxc-project+runtime@0.153.0/helpers/esm/toPrimitive.js
function toPrimitive(t, r) {
	if ("object" != _typeof(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
//#endregion
//#region \0@oxc-project+runtime@0.153.0/helpers/esm/toPropertyKey.js
function toPropertyKey(t) {
	var i = toPrimitive(t, "string");
	return "symbol" == _typeof(i) ? i : i + "";
}
//#endregion
//#region \0@oxc-project+runtime@0.153.0/helpers/esm/defineProperty.js
function _defineProperty(e, r, t) {
	return (r = toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
/** Kinds that may be postponed. `boot`, `event` and `visibility` always run. */
const DEFERRABLE = /* @__PURE__ */ new Set([
	"timer",
	"frame",
	"viewport",
	"resize",
	"theme",
	"bridge"
]);
/** What a task's layout queries may block the host in all: the hang guard behind the count. */
const QUERY_BUDGET_MS = 1e3;
/**
* Whether a task with `queries` answered layout queries that blocked the host `queryMs` in all is past its limit, and
* which: the host answers queries synchronously, so a forced-layout loop would hold the renderer hostage without ever
* burning widget CPU; past either the task is interrupted and killed. The count stops the same widget on every device
* (the time of a query does not: a cold first layout on a slow phone takes over 100 ms); their time also counts toward
* the main-thread window, which slows the widget down instead.
*/
function queryLimitHit(queries, queryMs) {
	if (queries > 128) return "count";
	if (queryMs > 1e3) return "time";
	return null;
}
/** The reason a task stopped by `queryLimitHit` is killed with. */
function queryLimitReason(hit, kind) {
	return hit === "count" ? `Layout query limit exceeded: more than 128 layout queries in one ${kind} task` : `Layout query limit exceeded: host queries blocked the renderer for more than ${QUERY_BUDGET_MS} ms in one ${kind} task`;
}
/** Modelled main-thread cost of one op the glue forwards to the validator, and of one canvas command in it. */
const OP_COST_MS = .025;
const CANVAS_COMMAND_COST_MS = .002;
/** What a batch of `ops` ops with `canvasCommands` canvas commands costs the host's main thread: deterministic, from what the widget sent. */
function opsCostMs(ops, canvasCommands) {
	return ops * OP_COST_MS + canvasCommands * CANVAS_COMMAND_COST_MS;
}
var CpuBudget = class {
	constructor(cfg) {
		_defineProperty(this, "cfg", void 0);
		_defineProperty(this, "bucketMs", void 0);
		_defineProperty(this, "buckets", []);
		_defineProperty(
			this,
			/** Time spent past the quota, not in the window yet: at most one quota. */
			"debtMs",
			0
		);
		_defineProperty(
			this,
			/** The last bucket the debt was settled at. */
			"settled",
			-Infinity
		);
		_defineProperty(this, "throttledSince", -1);
		_defineProperty(this, "lastThrottleAt", -1);
		this.cfg = cfg;
		this.bucketMs = Math.max(1, cfg.cpuQuotaWindowMs / 10);
		for (let i = 0; i < 10; i++) this.buckets.push({
			start: -Infinity,
			ms: 0
		});
	}
	/** Bucket `b`'s slot, emptied when it still holds an older bucket. */
	slot(b) {
		const slot = this.buckets[(b % 10 + 10) % 10];
		const start = b * this.bucketMs;
		if (slot.start !== start) {
			slot.start = start;
			slot.ms = 0;
		}
		return slot;
	}
	/** Time in the window that ends with bucket `b` (the ten bucket slots cover exactly one window). */
	windowAt(b) {
		const oldest = (b - 10 + 1) * this.bucketMs;
		let sum = 0;
		for (const s of this.buckets) if (s.start >= oldest) sum += s.ms;
		return sum;
	}
	/** Moves the debt into the window, bucket by bucket since the last call, as the buckets that filled it leave. */
	settle(now) {
		const cur = Math.floor(now / this.bucketMs);
		if (this.debtMs > 0) {
			const last = Math.min(cur, this.settled + 20);
			for (let b = this.settled + 1; b <= last && this.debtMs > 0; b++) {
				const pay = Math.min(this.debtMs, this.cfg.cpuQuotaMs - this.windowAt(b));
				if (pay > 0) {
					this.slot(b).ms += pay;
					this.debtMs -= pay;
				}
			}
			if (last < cur) this.debtMs = 0;
		}
		if (cur > this.settled) this.settled = cur;
	}
	/** Account `cpuMs` of widget JS time for a task that ended at `now`: into the window up to the quota, the rest is the debt. */
	record(_kind, cpuMs, now) {
		this.settle(now);
		const b = Math.floor(now / this.bucketMs);
		const slot = this.slot(b);
		if (!(cpuMs > 0)) return;
		const into = Math.min(cpuMs, Math.max(0, this.cfg.cpuQuotaMs - this.windowAt(b) - this.debtMs));
		slot.ms += into;
		this.debtMs = Math.min(this.cfg.cpuQuotaMs, this.debtMs + cpuMs - into);
	}
	/** JS time charged now: the window ending now plus the debt. */
	used(now) {
		this.settle(now);
		return this.windowAt(Math.floor(now / this.bucketMs)) + this.debtMs;
	}
	/** Before a task: run it with the whole slice for the interrupt handler, or retry at `retryAt`. */
	decide(kind, now) {
		const remaining = this.cfg.cpuQuotaMs - this.used(now);
		if (DEFERRABLE.has(kind) && remaining <= 0) {
			if (this.throttledSince < 0 || now - this.lastThrottleAt > this.cfg.cpuQuotaWindowMs) this.throttledSince = now;
			this.lastThrottleAt = now;
			const oldestBusy = (Math.floor(now / this.bucketMs) - 10 + 1) * this.bucketMs;
			let oldest = Infinity;
			for (const s of this.buckets) if (s.ms > 0 && s.start >= oldestBusy && s.start < oldest) oldest = s.start;
			let retryAt = oldest === Infinity ? now + this.bucketMs : oldest + this.cfg.cpuQuotaWindowMs;
			if (retryAt <= now) retryAt = now + this.bucketMs;
			return {
				run: false,
				retryAt
			};
		}
		return {
			run: true,
			sliceMs: this.cfg.cpuLimitMs
		};
	}
	/** Length of the current uninterrupted throttling stretch (0 when not throttled). */
	throttledFor(now) {
		if (this.throttledSince < 0 || now - this.lastThrottleAt > this.cfg.cpuQuotaWindowMs) return 0;
		return now - this.throttledSince;
	}
	/** `cpuKillAfterMs` (0 = never): kill the runtime once throttling has lasted this long. */
	shouldKill(now) {
		return this.cfg.cpuKillAfterMs > 0 && this.throttledFor(now) >= this.cfg.cpuKillAfterMs;
	}
};
//#endregion
//#region src/vendor/widget-sandbox/src/shared/profile-tables.ts
const PROFILE_HTML = {
	"elements": {
		"html": "keep",
		"head": "keep",
		"body": "keep",
		"div": "keep",
		"span": "keep",
		"p": "keep",
		"a": "keep",
		"b": "keep",
		"i": "keep",
		"u": "keep",
		"s": "keep",
		"em": "keep",
		"strong": "keep",
		"small": "keep",
		"sub": "keep",
		"sup": "keep",
		"mark": "keep",
		"code": "keep",
		"pre": "keep",
		"kbd": "keep",
		"samp": "keep",
		"var": "keep",
		"abbr": "keep",
		"cite": "keep",
		"q": "keep",
		"blockquote": "keep",
		"del": "keep",
		"ins": "keep",
		"dfn": "keep",
		"time": "keep",
		"data": "keep",
		"address": "keep",
		"br": "keep",
		"hr": "keep",
		"wbr": "keep",
		"h1": "keep",
		"h2": "keep",
		"h3": "keep",
		"h4": "keep",
		"h5": "keep",
		"h6": "keep",
		"header": "keep",
		"footer": "keep",
		"main": "keep",
		"nav": "keep",
		"section": "keep",
		"article": "keep",
		"aside": "keep",
		"hgroup": "keep",
		"search": "keep",
		"ul": "keep",
		"ol": "keep",
		"li": "keep",
		"dl": "keep",
		"dt": "keep",
		"dd": "keep",
		"menu": "keep",
		"table": "keep",
		"thead": "keep",
		"tbody": "keep",
		"tfoot": "keep",
		"tr": "keep",
		"td": "keep",
		"th": "keep",
		"caption": "keep",
		"colgroup": "keep",
		"col": "keep",
		"button": "keep",
		"details": "keep",
		"summary": "keep",
		"figure": "keep",
		"figcaption": "keep",
		"picture": "keep",
		"img": "keep",
		"canvas": "keep",
		"ruby": "span",
		"rt": "span",
		"rp": "span",
		"bdi": "span",
		"bdo": "span",
		"font": "span",
		"big": "span",
		"tt": "span",
		"strike": "span",
		"nobr": "span",
		"label": "span",
		"legend": "span",
		"output": "span",
		"center": "div",
		"form": "div",
		"dialog": "div",
		"input": "drop",
		"select": "drop",
		"option": "drop",
		"optgroup": "drop",
		"textarea": "drop",
		"datalist": "drop",
		"fieldset": "drop",
		"progress": "drop",
		"meter": "drop",
		"script": "drop",
		"iframe": "drop",
		"frame": "drop",
		"frameset": "drop",
		"object": "drop",
		"embed": "drop",
		"link": "drop",
		"meta": "drop",
		"base": "drop",
		"portal": "drop",
		"noscript": "drop",
		"set": "drop",
		"title": "drop",
		"template": "drop",
		"applet": "drop",
		"param": "drop",
		"noembed": "drop",
		"noframes": "drop",
		"plaintext": "drop",
		"xmp": "drop",
		"listing": "drop",
		"slot": "drop",
		"track": "drop",
		"area": "drop",
		"map": "drop",
		"math": "drop",
		"metadata": "drop",
		"fencedframe": "drop",
		"audio": "drop",
		"video": "drop",
		"source": "drop"
	},
	"unknown": "span",
	"attributes": [
		"class",
		"id",
		"title",
		"lang",
		"dir",
		"hidden",
		"role",
		"colspan",
		"rowspan",
		"span",
		"width",
		"height",
		"alt",
		"open",
		"start",
		"reversed",
		"datetime",
		"value",
		"type",
		"disabled"
	],
	"attributePrefixes": ["data-", "aria-"]
};
const PROFILE_SVG = {
	"elements": [
		"svg",
		"g",
		"path",
		"rect",
		"circle",
		"ellipse",
		"line",
		"polyline",
		"polygon",
		"text",
		"tspan",
		"defs",
		"symbol",
		"use",
		"linearGradient",
		"radialGradient",
		"stop",
		"title",
		"desc",
		"a"
	],
	"attributes": [
		"class",
		"id",
		"lang",
		"role",
		"viewBox",
		"preserveAspectRatio",
		"x",
		"y",
		"x1",
		"y1",
		"x2",
		"y2",
		"cx",
		"cy",
		"r",
		"rx",
		"ry",
		"d",
		"points",
		"dx",
		"dy",
		"rotate",
		"transform",
		"width",
		"height",
		"fill",
		"fill-opacity",
		"fill-rule",
		"stroke",
		"stroke-width",
		"stroke-opacity",
		"stroke-linecap",
		"stroke-linejoin",
		"stroke-dasharray",
		"stroke-dashoffset",
		"stroke-miterlimit",
		"opacity",
		"color",
		"display",
		"visibility",
		"overflow",
		"text-anchor",
		"dominant-baseline",
		"alignment-baseline",
		"baseline-shift",
		"font-family",
		"font-size",
		"font-weight",
		"font-style",
		"letter-spacing",
		"word-spacing",
		"text-decoration",
		"gradientUnits",
		"gradientTransform",
		"spreadMethod",
		"fx",
		"fy",
		"fr",
		"offset",
		"stop-color",
		"stop-opacity",
		"pointer-events",
		"shape-rendering",
		"text-rendering",
		"vector-effect",
		"paint-order",
		"cursor",
		"pathLength",
		"version",
		"xml:space",
		"xml:lang"
	]
};
const PROFILE_IMAGES = [
	"image/png",
	"image/jpeg",
	"image/jpg",
	"image/gif",
	"image/webp"
];
const PROFILE_EVENTS = [
	"click",
	"pointerdown",
	"pointerup",
	"pointermove",
	"pointerenter",
	"pointerleave",
	"pointerover",
	"pointerout",
	"pointercancel",
	"dblclick",
	"contextmenu",
	"mousedown",
	"mouseup",
	"mousemove",
	"mouseenter",
	"mouseleave",
	"mouseover",
	"mouseout",
	"load",
	"error",
	"toggle",
	"animationstart",
	"animationend",
	"animationiteration",
	"transitionend"
];
const PROFILE_METHODS = [
	"setPointerCapture",
	"releasePointerCapture",
	"scrollTo",
	"scrollBy",
	"observeResize",
	"unobserveResize"
];
const PROFILE_PROPERTIES = ["scrollTop", "scrollLeft"];
const PROFILE_CANVAS = {
	"methods": [
		"save",
		"restore",
		"scale",
		"rotate",
		"translate",
		"transform",
		"setTransform",
		"resetTransform",
		"clearRect",
		"fillRect",
		"strokeRect",
		"beginPath",
		"closePath",
		"moveTo",
		"lineTo",
		"bezierCurveTo",
		"quadraticCurveTo",
		"arc",
		"arcTo",
		"ellipse",
		"rect",
		"roundRect",
		"fill",
		"stroke",
		"clip",
		"fillText",
		"strokeText",
		"setLineDash",
		"drawImage",
		"reset"
	],
	"properties": [
		"fillStyle",
		"strokeStyle",
		"lineWidth",
		"lineCap",
		"lineJoin",
		"miterLimit",
		"lineDashOffset",
		"font",
		"textAlign",
		"textBaseline",
		"direction",
		"globalAlpha",
		"imageSmoothingEnabled",
		"imageSmoothingQuality"
	],
	"gradients": ["linear", "radial"],
	"queries": [
		"isPointInPath",
		"isPointInStroke",
		"getTransform",
		"getLineDash",
		"measureText"
	]
};
const PROFILE_CSS$1 = {
	"properties": [
		"display",
		"flex",
		"flex-direction",
		"flex-wrap",
		"flex-flow",
		"flex-grow",
		"flex-shrink",
		"flex-basis",
		"justify-content",
		"align-items",
		"align-self",
		"align-content",
		"order",
		"place-items",
		"place-content",
		"place-self",
		"justify-items",
		"justify-self",
		"gap",
		"row-gap",
		"column-gap",
		"grid-gap",
		"grid-row-gap",
		"grid-column-gap",
		"grid",
		"grid-template",
		"grid-template-columns",
		"grid-template-rows",
		"grid-template-areas",
		"grid-column",
		"grid-column-start",
		"grid-column-end",
		"grid-row",
		"grid-row-start",
		"grid-row-end",
		"grid-area",
		"grid-auto-flow",
		"grid-auto-columns",
		"grid-auto-rows",
		"width",
		"height",
		"min-width",
		"min-height",
		"max-width",
		"max-height",
		"margin",
		"margin-top",
		"margin-right",
		"margin-bottom",
		"margin-left",
		"padding",
		"padding-top",
		"padding-right",
		"padding-bottom",
		"padding-left",
		"border",
		"border-width",
		"border-style",
		"border-color",
		"border-top",
		"border-right",
		"border-bottom",
		"border-left",
		"border-top-width",
		"border-right-width",
		"border-bottom-width",
		"border-left-width",
		"border-top-style",
		"border-right-style",
		"border-bottom-style",
		"border-left-style",
		"border-top-color",
		"border-right-color",
		"border-bottom-color",
		"border-left-color",
		"border-radius",
		"border-top-left-radius",
		"border-top-right-radius",
		"border-bottom-right-radius",
		"border-bottom-left-radius",
		"border-collapse",
		"border-spacing",
		"table-layout",
		"caption-side",
		"empty-cells",
		"box-sizing",
		"aspect-ratio",
		"outline",
		"outline-width",
		"outline-style",
		"outline-color",
		"outline-offset",
		"box-shadow",
		"float",
		"clear",
		"object-fit",
		"object-position",
		"position",
		"top",
		"right",
		"bottom",
		"left",
		"inset",
		"z-index",
		"overflow",
		"overflow-x",
		"overflow-y",
		"visibility",
		"opacity",
		"color",
		"background",
		"background-color",
		"background-image",
		"background-size",
		"background-position",
		"background-position-x",
		"background-position-y",
		"background-repeat",
		"background-origin",
		"background-clip",
		"color-scheme",
		"font",
		"font-family",
		"font-size",
		"font-weight",
		"font-style",
		"line-height",
		"font-variant-numeric",
		"font-feature-settings",
		"text-align",
		"text-indent",
		"text-decoration",
		"text-decoration-line",
		"text-decoration-color",
		"text-decoration-style",
		"text-decoration-thickness",
		"text-underline-offset",
		"text-transform",
		"letter-spacing",
		"word-spacing",
		"white-space",
		"white-space-collapse",
		"text-wrap-mode",
		"overflow-wrap",
		"word-wrap",
		"word-break",
		"text-overflow",
		"vertical-align",
		"list-style",
		"list-style-type",
		"list-style-position",
		"direction",
		"unicode-bidi",
		"transform",
		"transform-origin",
		"transform-box",
		"translate",
		"rotate",
		"scale",
		"filter",
		"backdrop-filter",
		"-webkit-backdrop-filter",
		"pointer-events",
		"touch-action",
		"cursor",
		"content",
		"counter-reset",
		"counter-increment",
		"quotes",
		"transition",
		"transition-property",
		"transition-duration",
		"transition-timing-function",
		"transition-delay",
		"animation",
		"animation-name",
		"animation-duration",
		"animation-timing-function",
		"animation-delay",
		"animation-iteration-count",
		"animation-direction",
		"animation-fill-mode",
		"animation-play-state",
		"fill",
		"fill-opacity",
		"fill-rule",
		"stroke",
		"stroke-width",
		"stroke-opacity",
		"stroke-linecap",
		"stroke-linejoin",
		"stroke-dasharray",
		"stroke-dashoffset",
		"stroke-miterlimit",
		"stop-color",
		"stop-opacity",
		"text-anchor",
		"dominant-baseline",
		"paint-order",
		"vector-effect",
		"shape-rendering",
		"cx",
		"cy",
		"r",
		"rx",
		"ry",
		"all",
		"appearance",
		"-webkit-appearance",
		"will-change",
		"text-rendering",
		"-webkit-font-smoothing",
		"-moz-osx-font-smoothing",
		"-webkit-tap-highlight-color",
		"user-select",
		"-webkit-user-select"
	],
	"functions": [
		"var",
		"calc",
		"min",
		"max",
		"clamp",
		"rgb",
		"rgba",
		"hsl",
		"hsla",
		"light-dark",
		"linear-gradient",
		"repeating-linear-gradient",
		"radial-gradient",
		"repeating-radial-gradient",
		"conic-gradient",
		"repeating-conic-gradient",
		"translate",
		"translatex",
		"translatey",
		"rotate",
		"scale",
		"scalex",
		"scaley",
		"skew",
		"skewx",
		"skewy",
		"matrix",
		"blur",
		"brightness",
		"drop-shadow",
		"cubic-bezier",
		"steps",
		"linear",
		"attr",
		"counter",
		"counters",
		"minmax",
		"repeat",
		"fit-content",
		"env",
		"url"
	],
	"units": [
		"px",
		"em",
		"rem",
		"ch",
		"ex",
		"pt",
		"pc",
		"cm",
		"mm",
		"in",
		"q",
		"vw",
		"svw",
		"lvw",
		"dvw",
		"vi",
		"svi",
		"lvi",
		"dvi",
		"vmin",
		"svmin",
		"lvmin",
		"dvmin",
		"vmax",
		"svmax",
		"lvmax",
		"dvmax",
		"deg",
		"rad",
		"grad",
		"turn",
		"s",
		"ms",
		"fr"
	],
	"values": {
		"display": [
			"block",
			"inline",
			"inline-block",
			"none",
			"flex",
			"inline-flex",
			"grid",
			"inline-grid",
			"table",
			"inline-table",
			"table-row",
			"table-cell",
			"table-caption",
			"table-row-group",
			"table-header-group",
			"table-footer-group",
			"table-column",
			"table-column-group"
		],
		"position": [
			"static",
			"relative",
			"absolute",
			"fixed"
		],
		"user-select": [
			"none",
			"text",
			"auto"
		],
		"-webkit-user-select": [
			"none",
			"text",
			"auto"
		]
	},
	"rewrite": {
		"position": {
			"sticky": "relative",
			"-webkit-sticky": "relative"
		},
		"overflow": {
			"auto": "hidden",
			"scroll": "hidden",
			"overlay": "hidden"
		}
	},
	"filterFunctions": [
		"blur",
		"brightness",
		"drop-shadow"
	],
	"transform3d": [
		"matrix3d",
		"translate3d",
		"translatez",
		"scale3d",
		"scalez",
		"rotate3d",
		"rotatex",
		"rotatey",
		"rotatez",
		"perspective"
	],
	"fonts": {
		"generic": [
			"system-ui",
			"sans-serif",
			"serif",
			"monospace",
			"ui-sans-serif",
			"ui-serif",
			"ui-monospace",
			"ui-rounded"
		],
		"fallback": {
			"ui-sans-serif": "sans-serif",
			"ui-serif": "serif",
			"ui-monospace": "monospace",
			"ui-rounded": "sans-serif"
		},
		"aliases": {
			"-apple-system": "system-ui",
			"blinkmacsystemfont": "system-ui"
		},
		"default": "system-ui"
	},
	"pseudoClasses": [
		"hover",
		"active",
		"root",
		"lang",
		"first-child",
		"last-child",
		"only-child",
		"nth-child",
		"nth-last-child",
		"nth-of-type",
		"nth-last-of-type",
		"first-of-type",
		"last-of-type",
		"only-of-type",
		"empty",
		"is",
		"where",
		"not",
		"before",
		"after"
	],
	"pseudoElements": ["before", "after"],
	"pseudoRewrite": {
		"disabled": "[disabled]",
		"enabled": ":not([disabled])"
	},
	"atRules": [
		"media",
		"supports",
		"keyframes",
		"-webkit-keyframes"
	],
	"mediaTypes": ["all", "screen"],
	"mediaFeatures": [
		"width",
		"min-width",
		"max-width",
		"aspect-ratio",
		"min-aspect-ratio",
		"max-aspect-ratio",
		"orientation",
		"prefers-color-scheme",
		"prefers-reduced-motion"
	]
};
/** All of them (a bundle that imports one table alone gets only that one). */
const PROFILE_TABLES = {
	html: PROFILE_HTML,
	svg: PROFILE_SVG,
	images: PROFILE_IMAGES,
	events: PROFILE_EVENTS,
	methods: PROFILE_METHODS,
	properties: PROFILE_PROPERTIES,
	canvas: PROFILE_CANVAS,
	css: PROFILE_CSS$1,
	uaStylesheet: "@layer tw-ua{:where(html){color:var(--tg-theme-text-color);font:var(--tg-text-font-size,15px)/var(--tg-text-line-height,1.35) system-ui,sans-serif;-webkit-text-size-adjust:none;text-size-adjust:none;overflow-wrap:break-word;-webkit-user-select:none;user-select:none;-webkit-touch-callout:none}:where(body){margin:var(--tg-text-padding,8px 12px);padding:0;padding-bottom:var(--tg-content-safe-area-inset-bottom,0px)}:where(h1,h2,h3,h4,h5,h6){margin:.75em 0 .35em;font-weight:600;line-height:1.25}:where(h1){font-size:1.6em}:where(h2){font-size:1.35em}:where(h3){font-size:1.2em}:where(h4){font-size:1.07em}:where(h5){font-size:1em}:where(h6){font-size:.87em}:where(p,ul,ol,menu,dl,pre,blockquote,figure,table){margin:.6em 0}:where(ul,ol,menu){padding:0 0 0 1.5em;padding-inline-start:1.5em;padding-inline-end:0}:where(ul,menu){list-style-type:disc}:where(ol){list-style-type:decimal}:where(li ul,li menu){list-style-type:circle}:where(li ul,li ol,li menu,li dl){margin:0}:where(dt){font-weight:600}:where(dd){margin:0 0 0 1.5em;margin-inline-start:1.5em;margin-inline-end:0}:where(table){border-collapse:collapse;border-spacing:0}:where(caption){padding:0 0 .3em;color:var(--tg-theme-hint-color);font-size:.87em;text-align:left;text-align:start}:where(th,td){padding:.3em .6em;border-bottom:1px solid var(--tg-theme-section-separator-color);text-align:left;text-align:start;vertical-align:top}:where(th){font-weight:600}:where(th:last-child,td:last-child){padding-right:0;padding-inline-end:0;padding-inline-start:.6em}:where(th:first-child,td:first-child){padding-left:0;padding-inline-start:0;padding-inline-end:.6em}:where(hr){height:0;margin:.6em 0;border:0;border-top:1px solid var(--tg-theme-section-separator-color)}:where(pre,code,kbd,samp){font-family:ui-monospace,monospace;font-size:.9em}:where(pre code,pre kbd,pre samp){font-size:1em}:where(pre){padding:.5em .7em;border-radius:6px;background:rgba(128,128,128,.12);white-space:pre-wrap}:where(blockquote){padding:0 0 0 .75em;padding-inline-start:.75em;padding-inline-end:0;border-left:3px solid var(--tg-theme-accent-text-color);border-inline-start:3px solid var(--tg-theme-accent-text-color);border-inline-end:0}:where(figcaption){margin:.3em 0 0;color:var(--tg-theme-hint-color);font-size:.87em}:where(img){max-width:100%}:where(a[href]){color:var(--tg-theme-link-color);text-decoration:none}:where(b,strong){font-weight:600}:where(i,em,cite,dfn,var){font-style:italic}:where(small){font-size:.85em}:where(sub,sup){position:relative;font-size:.75em;line-height:0;vertical-align:baseline}:where(sup){top:-.5em}:where(sub){bottom:-.25em}:where(mark){background:rgba(255,204,0,.4);color:inherit}:where(body>:first-child){margin-top:0}:where(body>:last-child){margin-bottom:0}:where(button){appearance:none;-webkit-appearance:none;margin:0;border:0;border-radius:var(--tg-button-radius,8px);padding:var(--tg-button-padding,8px 14px);min-height:var(--tg-button-height,auto);font:var(--tg-button-font,500 14px/1.2 system-ui,sans-serif);background:var(--tg-button-bg,rgba(51,144,236,.12));color:var(--tg-button-text,inherit);cursor:pointer;-webkit-tap-highlight-color:transparent}:where(button:not([disabled])):active{opacity:var(--tg-button-pressed-opacity,.7)}:where(button[disabled]){opacity:var(--tg-button-disabled-opacity,.5);cursor:default}}"
};
/**
* Event types the renderer delivers to the widget: the widget profile's (no keyboard, focus, touch, wheel or scroll).
* `dblclick` and `contextmenu` come from the renderer itself, only for a double tap or a hold the widget claims with
* `touch-action: none` (gesture-policy.ts); the engine's own never reach the widget. Everything else is ignored.
*/
const EVENT_TYPES = PROFILE_EVENTS;
/** Fail-closed policy parsing shared by every TS host: a typo or a missing value is `strict`. */
function resolvePolicy(policy) {
	return policy === "compat" ? "compat" : "strict";
}
/** Defaults shared by every host (the native configs repeat them; docs/decisions.md, "Strict limits from the start"). */
const LIMIT_DEFAULTS = {
	memoryLimitBytes: 8388608,
	cpuLimitMs: 500,
	cpuQuotaMs: 300,
	cpuQuotaWindowMs: 1e3,
	cpuKillAfterMs: 0,
	/** The host's main-thread work for the widget per `cpuQuotaWindowMs`: layout queries and the modelled cost of its ops. */
	mainThreadQuotaMs: 100,
	maxTimers: 64
};
/** Timer delays are clamped to this on every platform (24 h, like Telegram). */
const MAX_TIMER_DELAY_MS = 864e5;
/**
* Web only: the QuickJS wasm module imports its memory, and the glue hands it one
* whose `maximum` is INITIAL + memoryLimitBytes. INITIAL mirrors the variant's
* INITIAL_MEMORY (16 MB: static data, C stack and dlmalloc's first arena); the
* runtime's heap may grow memoryLimitBytes beyond it. See src/host/worker.ts.
*/
const WASM_PAGE_BYTES = 65536;
const THEME_KEYS = [
	"bg_color",
	"text_color",
	"hint_color",
	"link_color",
	"button_color",
	"button_text_color",
	"secondary_bg_color",
	"accent_text_color",
	"subtitle_text_color",
	"destructive_text_color",
	"section_bg_color",
	"section_header_text_color",
	"section_separator_color",
	"header_bg_color",
	"bottom_bar_bg_color"
];
const LENGTH = /^(0|[0-9]{1,4}(\.[0-9]{1,3})?(px|em|rem))$/;
const COLOR = /^#[0-9a-fA-F]{6}$/;
const GENERIC = /* @__PURE__ */ new Set([
	"system-ui",
	"sans-serif",
	"serif",
	"monospace",
	"ui-sans-serif",
	"ui-serif",
	"ui-monospace",
	"ui-rounded"
]);
const FONT = /^(?:(normal|italic) )?(?:(normal|bold|[1-9]00) )?[0-9]{1,3}(?:\.[0-9]{1,2})?(?:px|em|rem)(?:\/[0-9]{1,3}(?:\.[0-9]{1,2})?(?:px|em|rem)?)? ([a-z-]+(?:, ?[a-z-]+)*)$/;
function opacity(v) {
	const s = typeof v === "number" ? String(v) : typeof v === "string" ? v : "";
	return /^(0(\.[0-9]{1,3})?|1(\.0{1,3})?|\.[0-9]{1,3})$/.test(s) ? s : null;
}
const padding = (v) => typeof v === "string" && /^\S+( \S+){0,3}$/.test(v) && v.split(" ").every((p) => LENGTH.test(p)) ? v : null;
/** A number in [min, max] with at most `decimals` decimals, as a number or its plain decimal string (+ `unit`); shortest form. */
function bounded(v, min, max, decimals, unit) {
	let n;
	if (typeof v === "number") n = v;
	else if (typeof v === "string" && new RegExp(`^[0-9]{1,2}(\\.[0-9]{1,${decimals}})?${unit}$`).test(v)) n = parseFloat(v);
	else return null;
	if (!Number.isFinite(n) || n < min || n > max) return null;
	const f = 10 ** decimals;
	return String(Math.round(n * f) / f) + unit;
}
const BUTTON_VARS = [
	[
		"bg",
		"--tg-button-bg",
		(v) => typeof v === "string" && COLOR.test(v) ? v.toLowerCase() : null
	],
	[
		"text",
		"--tg-button-text",
		(v) => typeof v === "string" && COLOR.test(v) ? v.toLowerCase() : null
	],
	[
		"radius",
		"--tg-button-radius",
		(v) => typeof v === "string" && LENGTH.test(v) ? v : null
	],
	[
		"font",
		"--tg-button-font",
		(v) => {
			const m = typeof v === "string" ? FONT.exec(v) : null;
			return m && m[3].split(",").every((f) => GENERIC.has(f.trim())) ? v : null;
		}
	],
	[
		"padding",
		"--tg-button-padding",
		padding
	],
	[
		"height",
		"--tg-button-height",
		(v) => typeof v === "string" && LENGTH.test(v) ? v : null
	],
	[
		"pressedOpacity",
		"--tg-button-pressed-opacity",
		opacity
	],
	[
		"disabledOpacity",
		"--tg-button-disabled-opacity",
		opacity
	]
];
/** Text tokens: font size 8–64 px (a number or `"15px"`), line height 1–3 (unitless), padding as the button's. */
const TEXT_VARS = [
	[
		"fontSize",
		"--tg-text-font-size",
		(v) => bounded(v, 8, 64, 2, "px")
	],
	[
		"lineHeight",
		"--tg-text-line-height",
		(v) => bounded(v, 1, 3, 3, "")
	],
	[
		"padding",
		"--tg-text-padding",
		padding
	]
];
Object.freeze({
	top: 0,
	right: 0,
	bottom: 0,
	left: 0,
	cornerLeft: 0,
	cornerRight: 0
});
/** The root variables of the content safe area, by field. */
const SAFE_AREA_VARS = [
	["top", "--tg-content-safe-area-inset-top"],
	["right", "--tg-content-safe-area-inset-right"],
	["bottom", "--tg-content-safe-area-inset-bottom"],
	["left", "--tg-content-safe-area-inset-left"],
	["cornerLeft", "--tg-content-safe-area-corner-left"],
	["cornerRight", "--tg-content-safe-area-corner-right"]
];
/**
* The `env()` names the validator rewrites to the root variable the renderer sets (docs/sdk-v1.md §2.17):
* `env(safe-area-inset-bottom, 8px)` → `var(--tg-content-safe-area-inset-bottom, 8px)`. Exact names, as in CSS.
*/
const SAFE_AREA_ENV_VARIABLES = Object.freeze({
	"safe-area-inset-top": "--tg-content-safe-area-inset-top",
	"safe-area-inset-right": "--tg-content-safe-area-inset-right",
	"safe-area-inset-bottom": "--tg-content-safe-area-inset-bottom",
	"safe-area-inset-left": "--tg-content-safe-area-inset-left"
});
[
	...THEME_KEYS.map((k) => "--tg-theme-" + k.replace(/_/g, "-")),
	...BUTTON_VARS.map(([, name]) => name),
	...TEXT_VARS.map(([, name]) => name),
	...SAFE_AREA_VARS.map(([, name]) => name)
];
//#endregion
//#region src/vendor/widget-sandbox/src/shared/intl.ts
function formatIntl(req) {
	const locale = typeof req.locale === "string" || Array.isArray(req.locale) ? req.locale : void 0;
	const opts = req.opts && typeof req.opts === "object" ? req.opts : void 0;
	const tryLocale = (f) => {
		try {
			return f(locale);
		} catch {
			return f(void 0);
		}
	};
	switch (req.kind) {
		case "number": return tryLocale((l) => new Intl.NumberFormat(l, opts).format(Number(req.value)));
		case "numberParts": return JSON.stringify(tryLocale((l) => new Intl.NumberFormat(l, opts).formatToParts(Number(req.value))));
		case "numberOptions": return JSON.stringify(tryLocale((l) => new Intl.NumberFormat(l, opts).resolvedOptions()));
		case "date": return tryLocale((l) => new Intl.DateTimeFormat(l, opts).format(new Date(Number(req.value))));
		case "dateMethod": {
			const d = new Date(Number(req.value));
			return tryLocale((l) => req.method === "toLocaleDateString" ? d.toLocaleDateString(l, opts) : req.method === "toLocaleTimeString" ? d.toLocaleTimeString(l, opts) : d.toLocaleString(l, opts));
		}
		case "dateParts": return JSON.stringify(tryLocale((l) => new Intl.DateTimeFormat(l, opts).formatToParts(new Date(Number(req.value)))));
		case "dateOptions": return JSON.stringify(tryLocale((l) => new Intl.DateTimeFormat(l, opts).resolvedOptions()));
		case "plural": return tryLocale((l) => new Intl.PluralRules(l, opts).select(Number(req.value)));
		case "relative": return tryLocale((l) => new Intl.RelativeTimeFormat(l, opts).format(Number(req.value), req.unit));
		case "list": return tryLocale((l) => new Intl.ListFormat(l, opts).format(req.value.map(String)));
		case "compare": return String(tryLocale((l) => new Intl.Collator(l, opts).compare(String(req.a), String(req.b))));
		case "upper": return tryLocale((l) => String(req.value).toLocaleUpperCase(l));
		case "lower": return tryLocale((l) => String(req.value).toLocaleLowerCase(l));
		default: return "";
	}
}
//#endregion
//#region src/vendor/widget-sandbox/src/host/glue.ts
function syncEntries(rt, vm) {
	return {
		*call(fn, thisVal, args) {
			return vm.callFunction(fn, thisVal, ...args);
		},
		*eval(code, filename, type) {
			return vm.evalCode(code, filename, { type });
		},
		*jobs() {
			const r = rt.executePendingJobs();
			return r.error ? { error: r.error } : { value: r.value };
		}
	};
}
let threadHolder = null;
/** The thread is `turn`'s now: how long others had it since it last did (0 when nobody took it meanwhile). */
function takeThread(turn) {
	if (threadHolder === turn) return 0;
	const now = performance.now();
	if (threadHolder) threadHolder.lostAt = now;
	threadHolder = turn;
	return turn.lostAt ? now - turn.lostAt : 0;
}
/** What quickjs-emscripten-core's callFunction / evalCode / executePendingJobs do, through exports that can wait. */
function waitingEntries(rt, vm, suspender) {
	const c = vm;
	const result = (ptr) => {
		const ctx = c.ctx.value;
		const errorPtr = c.ffi.QTS_ResolveException(ctx, ptr);
		if (errorPtr) {
			c.ffi.QTS_FreeValuePointer(ctx, ptr);
			return c.fail(c.memory.heapValueHandle(errorPtr));
		}
		return c.success(c.memory.heapValueHandle(ptr));
	};
	function* run(name, args) {
		const r = suspender.run(name, args);
		if (typeof r === "number") return r;
		return yield r;
	}
	return {
		*call(fn, thisVal, args) {
			const argv = c.memory.toPointerArray(args);
			try {
				return result(yield* run("_QTS_Call", [
					c.ctx.value,
					fn.value,
					thisVal.value,
					args.length,
					argv.value
				]));
			} finally {
				argv.dispose();
			}
		},
		*eval(code, filename, type) {
			const codeH = c.memory.newHeapCharPointer(code);
			const nameH = c.memory.newHeapCharPointer(filename);
			try {
				return result(yield* run("_QTS_Eval", [
					c.ctx.value,
					codeH.value.ptr,
					codeH.value.strlen,
					nameH.value.ptr,
					0,
					type === "module" ? 1 : 0
				]));
			} finally {
				codeH.dispose();
				nameH.dispose();
			}
		},
		*jobs() {
			const r = rt;
			const out = r.memory.newMutablePointerArray(1);
			let ptr, ctxPtr;
			try {
				ptr = yield* run("_QTS_ExecutePendingJob", [
					r.rt.value,
					-1,
					out.value.ptr
				]);
				ctxPtr = out.value.typedArray[0];
			} finally {
				out.dispose();
			}
			if (ctxPtr === 0) {
				r.ffi.QTS_FreeValuePointerRuntime(r.rt.value, ptr);
				return { value: 0 };
			}
			const handle = c.memory.heapValueHandle(ptr);
			if (vm.typeof(handle) === "number") {
				const n = vm.getNumber(handle);
				handle.dispose();
				return { value: n };
			}
			return { error: handle };
		}
	};
}
const QUERY_TIMEOUT_MS = 3e3;
/**
* Evaluating the sandbox bundle (our code, before any widget code exists) takes ~0.4 s in a worker and ~1 s on a page's
* main thread (the `frame` transport in Firefox and WebKit) on a slow machine, and several times that under load.
*/
const BUNDLE_BOOT_BUDGET_MS = 15e3;
const MAX_LOG = 4e3;
/**
* `inline`, `worker`: a widget's first tasks (its parse, its scripts, `load`) may run this many times the slice: one
* slice covers a whole task there (`resetDeadline`), where a worker of its own gives each script a fresh one. The
* limit is the native engines'; QuickJS as wasm on a page's thread runs 2–3 times slower than in a worker in WebKit,
* and a dozen widgets starting at once once took a showcase widget's first task past 500 ms there. Later tasks keep it.
*/
const SHARED_BOOT_SLICE_FACTOR = 2;
/** The main-thread window (`mainThreadQuotaMs`): layout queries and the cost of the ops, apart from the JS quota. */
const newMainBudget = (c) => new CpuBudget({
	cpuLimitMs: c.cpuLimitMs,
	cpuQuotaMs: c.mainThreadQuotaMs ?? LIMIT_DEFAULTS.mainThreadQuotaMs,
	cpuQuotaWindowMs: c.cpuQuotaWindowMs,
	cpuKillAfterMs: 0
});
/**
* `worker` on the asyncify build (engines without JSPI: Firefox): the same work takes ~1.8 times as long (measured on
* the sandbox bundle and the showcase), so a task gets twice the slice and half its time counts toward the quota: a
* widget may do as much there as elsewhere. It runs in the engine worker, never on the page's thread.
*/
const ASYNCIFY_SLOWDOWN = 2;
/** Two full areas of the quota at 12 JSON characters per byte (`\uXXXX` escapes plus the quotes, colon and comma of tiny pairs): a longer commit cannot be within the quota. */
const MAX_STORAGE_COMMIT_CHARS = 98368;
/** The features this runtime implements; the rest of what a host asks for is dropped (Swift: `runtimeFeatures`). */
const WEB_FEATURES = /* @__PURE__ */ new Set([
	"webAnimations",
	"noInPlaceText",
	"noAttrFast",
	"noCanvasRect"
]);
const withWebFeatures = (c) => ({
	...c,
	features: (c.features ?? []).filter((f) => WEB_FEATURES.has(f))
});
const decoder = new TextDecoder();
const HIDE_HOST_GLOBALS = "(function(g){for(const n of ['__host','__hostBinary','__hostCanvas','__hostOps','__twDispatch'])if(!delete g[n])throw new Error(n);})(globalThis);";
/** Widget clocks tick in 100 µs steps (a worker's own performance.now() can be finer in a cross-origin-isolated page), so they cannot time cache or pool effects of other widgets. */
const coarseNowMs = (ms) => Math.floor(ms / .1) * .1;
function createGlue(env) {
	/**
	* `frame`, `inline`, `worker`: the host handles a message in the call (validates ops; `frame`, `inline`: applies
	* them, lays the page out). That is not the widget's code running: like a layout query, it moves the task's
	* deadline and counts toward the quota only. (On a page's thread it once took a WebKit widget past its 500 ms while
	* twenty others were being laid out.)
	*/
	const post = (msg) => {
		if (transport === "sab") return env.post(msg);
		const t0 = performance.now();
		env.post(msg);
		const dt = performance.now() - t0;
		deadline += dt;
		taskHostMs += dt;
	};
	let transport = "sab";
	let rt;
	let vm;
	let qjs;
	/** `worker`: the instance's host calls can wait. */
	let suspender = null;
	/** How much slower than the plain build this instance runs (ASYNCIFY_SLOWDOWN for the asyncify one). */
	let slowdown = 1;
	let config;
	/** The memory limit the wasm Memory was sized for in `warm`; `start` cannot exceed it. */
	let warmedMemoryLimitBytes = 0;
	let header;
	let payload;
	let dead = false;
	let interrupted = false;
	let deadline = 0;
	/** Host time this task's layout queries took, and how many it asked (docs/decisions.md, Runtime limits). */
	let taskQueryMs = 0;
	let taskQueries = 0;
	/** Modelled main-thread cost of the ops this task sent (cpu-budget.ts `opsCostMs`). */
	let taskOpsCostMs = 0;
	/** Wall time this task waited for its layout queries (`worker`: the page's answer, other widgets' tasks meanwhile). */
	let taskWaitMs = 0;
	/** `frame`, `inline`, `worker`: time this task spent in the host handling what it posted. */
	let taskHostMs = 0;
	/** tweb: `worker`: wall time other widgets had the engine's thread while this task waited to go on (`takeThread`). */
	let taskOthersMs = 0;
	const turn = { lostAt: 0 };
	const othersTurn = (ms) => {
		taskOthersMs += ms;
		deadline += ms;
	};
	let taskStartedAt = 0;
	let queryLimitHit$1 = null;
	/** `worker`: when the waiting query was asked. */
	let askedAt = 0;
	/** Slice given to the running task (for the kill message); the boot task gets cpuLimitMs. */
	let currentSliceMs = 0;
	let currentKind = "boot";
	let budget;
	/** The main-thread window: what the widget's tasks cost the host's main thread (`newMainBudget`). */
	let mainBudget;
	/** JS time of the current task that is ours, not the widget's (evaluating the sandbox bundle). */
	let excludeMs = 0;
	let lastThrottleDiag = -Infinity;
	const throttledSinceDiag = {};
	let lastBinary = null;
	let twDispatch;
	/** A task is running (`worker`: or waiting for a host call's answer); what comes meanwhile waits in `afterTask`. */
	let busy = false;
	const queue = [];
	/** What came during a task (inputs the renderer in this thread reported, timers, `worker`: messages), in order. */
	const afterTask = [];
	/** Runs `fn` now, or after the running task. */
	function exclusive(fn) {
		if (busy) afterTask.push(fn);
		else fn();
	}
	/** Runs a task's steps: at once while no host call waits (every transport but `worker`), else across the waits. */
	function drive(steps, done) {
		const next = (value, error) => {
			othersTurn(takeThread(turn));
			let r;
			try {
				r = error !== void 0 ? steps.throw(error) : steps.next(value);
			} catch (e) {
				kill("sandbox glue error: " + e.message);
				return done();
			}
			if (r.done) return done();
			r.value.then((v) => next(v), (e) => next(void 0, e ?? /* @__PURE__ */ new Error("rejected")));
		};
		takeThread(turn);
		next();
	}
	let visible = true;
	let frameWanted = false;
	const deferred = [];
	let wakeTimer = null;
	let wakeAt = Infinity;
	/** Next 1 Hz boundary at which hidden timers fire (0 = none scheduled). */
	let hiddenTickAt = 0;
	function defer(kind, arg) {
		if (kind === "frame") {
			const f = deferred.find((d) => d.kind === "frame");
			if (f) {
				f.arg = arg;
				return;
			}
		} else if (kind === "timer" && deferred.some((d) => d.kind === "timer" && d.arg === arg)) return;
		deferred.push({
			kind,
			arg
		});
	}
	function scheduleWake(at) {
		if (wakeTimer && at >= wakeAt) return;
		if (wakeTimer) clearTimeout(wakeTimer);
		wakeAt = at;
		wakeTimer = setTimeout(wake, Math.max(0, at - performance.now()));
	}
	function wake() {
		wakeTimer = null;
		wakeAt = Infinity;
		hiddenTickAt = 0;
		runDeferred(deferred.splice(0));
	}
	/** Runs deferred tasks in order; stops (and re-queues the rest) if one is deferred again. */
	function runDeferred(items) {
		for (let i = 0; i < items.length; i++) {
			if (dead) return;
			if (busy) {
				afterTask.push(() => runDeferred(items.slice(i)));
				return;
			}
			if (!dispatch(items[i].kind, items[i].arg)) {
				deferred.unshift(...items.slice(i));
				return;
			}
		}
	}
	function onTimerFired(id) {
		timers.delete(id);
		exclusive(() => {
			if (!visible) {
				defer("timer", id);
				if (!hiddenTickAt) hiddenTickAt = performance.now() + 1e3;
				scheduleWake(hiddenTickAt);
				return;
			}
			dispatch("timer", id);
		});
	}
	function setVisible(v) {
		if (visible === v) return;
		visible = v;
		dispatch("visibility", { visible: v });
		if (visible) {
			if (frameWanted) {
				frameWanted = false;
				post({ type: "raf" });
			}
			if (deferred.length) wake();
		}
	}
	const stats = {
		jsMs: 0,
		tasks: 0,
		memoryBytes: 0,
		ops: 0,
		queries: 0,
		queryMs: 0,
		queryCacheHits: 0,
		missedMutations: 0,
		throttledTasks: 0,
		cpuWindowMs: 0
	};
	let lastStatsPost = 0;
	let lastMemCheck = 0;
	const timers = /* @__PURE__ */ new Map();
	let timerLimitReported = false;
	/**
	* The time a query blocked is not widget CPU time; what it cost the host counts toward the task's query budget
	* (`hostMs`: the renderer's own time when the answer comes from another thread, else all of it).
	*/
	function queryDone(t0, hostMs) {
		const dt = performance.now() - t0;
		deadline += dt;
		stats.queries++;
		stats.queryMs += dt;
		taskWaitMs += dt;
		taskQueryMs += hostMs ?? dt;
		taskQueries++;
		queryLimitHit$1 = queryLimitHit(taskQueries, taskQueryMs);
		if (queryLimitHit$1) deadline = -Infinity;
	}
	/** `frame`, `inline`: the renderer is in this thread; it validates the query and answers it right away. */
	function frameQuery(queryJson) {
		if (queryLimitHit$1) return "{\"error\":\"query budget exceeded\"}";
		const t0 = performance.now();
		const r = env.query(queryJson);
		queryDone(t0);
		lastBinary = r.binary ? new Uint8Array(r.binary) : null;
		return r.json;
	}
	/** `sab`: blocks this thread until the host has written the renderer's answer into the SAB. */
	function syncQuery(queryJson) {
		let query;
		try {
			query = JSON.parse(queryJson);
		} catch {
			return "{\"error\":\"bad query\"}";
		}
		if (queryLimitHit$1) return "{\"error\":\"query budget exceeded\"}";
		const t0 = performance.now();
		Atomics.store(header, 0, 1);
		post({
			type: "query",
			query
		});
		const res = Atomics.wait(header, 0, 1, QUERY_TIMEOUT_MS);
		queryDone(t0);
		if (res === "timed-out") {
			Atomics.store(header, 0, 0);
			return "{\"error\":\"timeout\"}";
		}
		const jsonLen = Atomics.load(header, 1);
		const binLen = Atomics.load(header, 2);
		const json = decoder.decode(payload.slice(0, jsonLen));
		lastBinary = binLen > 0 ? payload.slice(jsonLen, jsonLen + binLen) : null;
		Atomics.store(header, 0, 0);
		return json;
	}
	/**
	* `worker`: the page's renderer answers. The widget's code waits for it without knowing: this host call returns
	* nothing now and is made again with the answer (suspend.ts). A page that does not answer in QUERY_TIMEOUT_MS gets
	* the widget the same error as a SAB that times out.
	*/
	function waitQuery(queryJson) {
		const s = suspender;
		if (!s) return "{\"error\":\"dead\"}";
		const settled = s.takeAnswer();
		if (settled) {
			const answer = settled.value;
			queryDone(askedAt, answer?.hostMs ?? 0);
			takeThread(turn);
			lastBinary = answer?.binary ? new Uint8Array(answer.binary) : null;
			return answer ? answer.json : "{\"error\":\"timeout\"}";
		}
		let query;
		try {
			query = JSON.parse(queryJson);
		} catch {
			return "{\"error\":\"bad query\"}";
		}
		if (queryLimitHit$1) return "{\"error\":\"query budget exceeded\"}";
		if (!s.canWait()) return "{\"error\":\"no layout here\"}";
		askedAt = performance.now();
		let clear = () => {};
		const answer = Promise.race([env.ask(query), new Promise((resolve) => {
			const timer = setTimeout(() => resolve(void 0), QUERY_TIMEOUT_MS);
			clear = () => clearTimeout(timer);
		})]).finally(() => clear());
		s.wait(answer);
	}
	function hostCall(kind, arg) {
		switch (kind) {
			case "ops": {
				let ops;
				try {
					ops = JSON.parse(arg);
				} catch {
					return;
				}
				if (Array.isArray(ops)) {
					stats.ops += ops.length;
					let commands = 0;
					for (const op of ops) if (op && op.op === "canvas" && Array.isArray(op.cmds)) commands += op.cmds.length;
					taskOpsCostMs += opsCostMs(ops.length, commands);
				}
				post({
					type: "ops",
					ops
				});
				return;
			}
			case "query": return transport === "sab" ? syncQuery(arg) : transport === "worker" ? waitQuery(arg) : frameQuery(arg);
			case "now": return coarseNowMs(performance.now());
			case "timer": {
				const [id, delay] = JSON.parse(arg);
				if (typeof id !== "number") return;
				const replaced = timers.get(id);
				if (replaced !== void 0) clearTimeout(replaced);
				else if (timers.size >= config.maxTimers) {
					if (!timerLimitReported) {
						timerLimitReported = true;
						post({
							type: "diag",
							kind: "timer-limit-enforced",
							detail: `glue refused a timer beyond maxTimers=${config.maxTimers}; the shim did not stop it`
						});
					}
					return;
				}
				let ms = Math.min(Math.max(Number(delay) || 0, 0), MAX_TIMER_DELAY_MS);
				if (!visible) ms = Math.max(ms, 1e3 + ms / 10);
				timers.set(id, setTimeout(() => onTimerFired(id), ms));
				return;
			}
			case "clearTimer": {
				const id = Number(arg);
				const t = timers.get(id);
				if (t !== void 0) {
					clearTimeout(t);
					timers.delete(id);
				}
				return;
			}
			case "raf":
				if (!visible) {
					frameWanted = true;
					return;
				}
				post({ type: "raf" });
				return;
			case "log": {
				const i = arg.indexOf(":");
				post({
					type: "log",
					level: arg.slice(0, i),
					text: arg.slice(i + 1, i + 1 + MAX_LOG)
				});
				return;
			}
			case "diag": {
				const i = arg.indexOf(":");
				post({
					type: "diag",
					kind: arg.slice(0, i).slice(0, 64),
					detail: arg.slice(i + 1, i + 1 + MAX_LOG)
				});
				return;
			}
			case "listen":
				try {
					post({
						type: "listen",
						types: JSON.parse(arg),
						since: performance.timeOrigin + taskStartedAt
					});
				} catch {}
				return;
			case "pd":
				try {
					post({
						type: "pd",
						keys: JSON.parse(arg)
					});
				} catch {}
				return;
			case "anim":
				if (arg.length > 4194304 || !config.features?.includes("webAnimations")) return;
				try {
					post({
						type: "anim",
						anims: JSON.parse(arg),
						now: performance.now()
					});
				} catch {}
				return;
			case "bridge":
				try {
					const [method, args] = JSON.parse(arg);
					post(activeGesture ? {
						type: "bridge",
						method: String(method).slice(0, 64),
						args,
						gesture: activeGesture
					} : {
						type: "bridge",
						method: String(method).slice(0, 64),
						args
					});
				} catch {}
				return;
			case "storage":
				if (arg.length > MAX_STORAGE_COMMIT_CHARS) {
					post({
						type: "diag",
						kind: "storage-rejected",
						detail: `commit of ${arg.length} characters`
					});
					return;
				}
				try {
					post({
						type: "storage",
						commit: JSON.parse(arg)
					});
				} catch {}
				return;
			case "intl": try {
				return formatIntl(JSON.parse(arg));
			} catch {
				return "";
			}
			case "parse": return env.parseHTML?.(arg) ?? "";
			case "random": {
				const n = Math.min(Math.max(Number(arg) | 0, 0), 65536);
				return JSON.stringify(Array.from(crypto.getRandomValues(new Uint8Array(n))));
			}
			case "stat":
				try {
					const s = JSON.parse(arg);
					stats.queryCacheHits = Number(s.cacheHits) || 0;
					stats.missedMutations = Number(s.missed) || 0;
				} catch {}
				return;
		}
	}
	/** No more tasks: timers and deferred work go. */
	function stop() {
		dead = true;
		deadline = -Infinity;
		for (const t of timers.values()) clearTimeout(t);
		timers.clear();
		deferred.length = 0;
		afterTask.length = 0;
		if (wakeTimer) {
			clearTimeout(wakeTimer);
			wakeTimer = null;
		}
	}
	function kill(reason) {
		if (dead) return;
		stop();
		post({
			type: "dead",
			reason
		});
	}
	function destroy() {
		if (!dead) stop();
		rt = vm = twDispatch = qjs = suspender = null;
		if (threadHolder === turn) threadHolder = null;
		warming = null;
		queue.length = afterTask.length = 0;
	}
	function describeError(err) {
		let text;
		try {
			const e = vm.dump(err);
			text = e && typeof e === "object" ? `${e.name ?? "Error"}: ${e.message ?? ""}${e.stack ? "\n" + e.stack : ""}` : String(e);
		} catch {
			text = "unknown error";
		}
		err.dispose();
		return text;
	}
	function handleError(err, where) {
		const text = describeError(err);
		if (interrupted && queryLimitHit$1) return kill(`${queryLimitReason(queryLimitHit$1, currentKind)} (${where})`);
		if (interrupted) return kill(`CPU limit exceeded: more than ${currentSliceMs.toFixed(0)} ms of continuous execution (${where})`);
		if (/out of memory/i.test(text)) return kill(`Memory limit exceeded (${config.memoryLimitBytes >> 20} MB)`);
		post({
			type: "log",
			level: "error",
			text: `Uncaught ${text}`.slice(0, MAX_LOG)
		});
	}
	function* drainJobs() {
		for (let i = 0; i < 100 && !dead; i++) {
			const r = yield* qjs.jobs();
			if (dead) return;
			if (r.error) {
				handleError(r.error, "promise job");
				continue;
			}
			if (r.value === 0) break;
		}
	}
	function* callTw(kind, arg) {
		const k = vm.newString(kind);
		const a = vm.newString(arg);
		let r;
		try {
			r = yield* qjs.call(twDispatch, vm.undefined, [k, a]);
		} finally {
			if (vm) {
				k.dispose();
				a.dispose();
			}
		}
		if (!vm) return null;
		if (r.error) {
			handleError(r.error, kind);
			return null;
		}
		const out = vm.typeof(r.value) === "string" ? vm.getString(r.value) : null;
		r.value.dispose();
		return out;
	}
	/** End of a task: microtasks, flush mutations, observers; repeat until quiescent. */
	function* settle() {
		for (let i = 0; i < 20 && !dead; i++) {
			yield* drainJobs();
			if (dead) return;
			const more = yield* callTw("endTick", "");
			if (dead) return;
			if (more !== "1" && !rt.hasPendingJob()) break;
		}
	}
	function* evalScript(code, filename, type) {
		const r = yield* qjs.eval(code, filename, type);
		if (!vm) return false;
		if (r.error) {
			handleError(r.error, filename);
			return false;
		}
		r.value.dispose();
		return true;
	}
	/** Run scripts queued by the shim (initial inline scripts, later dynamically inserted ones). */
	function* pumpScripts() {
		for (let i = 0; i < 1e3 && !dead; i++) {
			const next = yield* callTw("nextScript", "");
			if (!next || dead) break;
			const s = JSON.parse(next);
			let ok = true;
			resetDeadline();
			if (s.src !== void 0) {
				ok = false;
				post({
					type: "diag",
					kind: "script-skipped",
					detail: `external script not available: ${String(s.src).slice(0, 200)}`
				});
			} else if (s.code !== void 0) yield* evalScript(s.code, `inline-script-${s.id}.js`, s.type);
			if (dead) return;
			yield* settle();
			if (dead) return;
			yield* callTw("scriptDone", JSON.stringify([s.id, ok]));
			yield* settle();
		}
	}
	function resetDeadline() {
		interrupted = false;
		const now = performance.now();
		if (transport !== "inline" && transport !== "worker") {
			deadline = now + currentSliceMs;
			return;
		}
		const spent = now - taskStartedAt - taskWaitMs - taskHostMs - taskOthersMs - excludeMs;
		deadline = now + Math.max(0, currentSliceMs - spent);
	}
	/**
	* One task of `kind` with `sliceMs` of continuous execution; its JS time is recorded against the quota. `gesture`:
	* the host's number for the trusted press an event task runs for (bridge calls carry it). `then` runs once it is
	* done (`worker`: maybe later), before what came meanwhile.
	*/
	function task(kind, sliceMs, body, then, gesture = 0) {
		if (dead) return then?.();
		busy = true;
		activeGesture = gesture;
		currentKind = kind;
		currentSliceMs = sliceMs * slowdown;
		excludeMs = 0;
		taskQueryMs = 0;
		taskQueries = 0;
		taskOpsCostMs = 0;
		taskWaitMs = 0;
		taskHostMs = 0;
		taskOthersMs = 0;
		queryLimitHit$1 = null;
		const t0 = taskStartedAt = performance.now();
		const q0 = stats.queryMs;
		resetDeadline();
		drive((function* () {
			try {
				yield* body();
				if (!dead) yield* settle();
				if (!dead) yield* pumpScripts();
				if (!dead && queryLimitHit$1) kill(queryLimitReason(queryLimitHit$1, kind));
			} catch (e) {
				kill("sandbox glue error: " + e.message);
			}
		})(), () => {
			busy = false;
			activeGesture = 0;
			if (vm) finishTask(kind, t0, q0);
			then?.();
			while (afterTask.length && !busy && !dead) afterTask.shift()();
		});
	}
	function finishTask(kind, t0, q0) {
		stats.tasks++;
		const now = performance.now();
		const cpuMs = now - t0 - (stats.queryMs - q0) - excludeMs - taskHostMs - taskOthersMs;
		stats.jsMs += cpuMs;
		if (!((transport === "inline" || transport === "worker") && kind === "boot")) {
			budget.record(kind, cpuMs / slowdown + taskHostMs, now);
			mainBudget.record(kind, taskQueryMs + taskOpsCostMs, now);
		}
		stats.cpuWindowMs = budget.used(now);
		if (now - lastMemCheck > 1e3 && !dead) {
			lastMemCheck = now;
			try {
				const h = rt.computeMemoryUsage();
				stats.memoryBytes = vm.dump(h).memory_used_size ?? 0;
				h.dispose();
			} catch {}
		}
		if (now - lastStatsPost > 200) {
			lastStatsPost = now;
			post({
				type: "stats",
				stats: { ...stats }
			});
		}
	}
	/**
	* Runs one task for an input (event, timer, frame, …) if the CPU quota allows,
	* otherwise defers it (returns false). Events and visibility always run.
	* Called only between tasks (`exclusive`).
	*/
	function dispatch(kind, arg, gesture = 0) {
		if (dead) return true;
		const now = performance.now();
		const js = budget.decide(kind, now);
		const main = mainBudget.decide(kind, now);
		if (!js.run || !main.run) {
			if (budget.shouldKill(now)) {
				kill(`CPU quota: throttled for ${(budget.throttledFor(now) / 1e3).toFixed(1)} s (${config.cpuQuotaMs} ms per ${config.cpuQuotaWindowMs} ms, cpuKillAfterMs=${config.cpuKillAfterMs})`);
				return true;
			}
			defer(kind, arg);
			stats.throttledTasks++;
			throttledSinceDiag[kind] = (throttledSinceDiag[kind] ?? 0) + 1;
			if (now - lastThrottleDiag >= 1e3) {
				lastThrottleDiag = now;
				const parts = Object.entries(throttledSinceDiag).map(([k, n]) => `${n} ${k}${n === 1 ? "" : "s"}`);
				for (const k of Object.keys(throttledSinceDiag)) delete throttledSinceDiag[k];
				const window = js.run ? `${mainBudget.used(now).toFixed(0)} ms of the ${config.mainThreadQuotaMs ?? LIMIT_DEFAULTS.mainThreadQuotaMs} ms per ${config.cpuQuotaWindowMs} ms main-thread budget used by layout queries and ops` : `${budget.used(now).toFixed(0)} ms of the ${config.cpuQuotaMs} ms per ${config.cpuQuotaWindowMs} ms budget used`;
				post({
					type: "diag",
					kind: "cpu-throttled",
					detail: `deferred ${parts.join(", ")}: ${window}`
				});
			}
			scheduleWake(Math.max(js.run ? 0 : js.retryAt, main.run ? 0 : main.retryAt));
			return false;
		}
		task(kind, js.sliceMs, () => callTw(kind, JSON.stringify(arg)), void 0, gesture);
		return true;
	}
	/**
	* Phase 1 (pool `warm`, or the first half of `init`): the QuickJS runtime, the
	* host functions and the sandbox bundle. `config` is provisional here (the
	* pool's limits); the widget and its real config come with `start`.
	*/
	const interruptHandler = () => {
		if (performance.now() > deadline) {
			interrupted = true;
			return true;
		}
		return false;
	};
	const hostFunction = (kindH, argH) => {
		const r = hostCall(vm.getString(kindH), argH ? vm.getString(argH) : "");
		if (typeof r === "string") return vm.newString(r);
		if (typeof r === "number") return vm.newNumber(r);
		return vm.undefined;
	};
	const hostBinaryFunction = () => {
		if (!lastBinary) return vm.null;
		const copy = lastBinary.buffer.slice(lastBinary.byteOffset, lastBinary.byteOffset + lastBinary.byteLength);
		lastBinary = null;
		return vm.newArrayBuffer(copy);
	};
	async function warm(msg, snapshot) {
		config = withWebFeatures(msg.config);
		visible = config.visible !== false;
		budget = new CpuBudget(config);
		mainBudget = newMainBudget(config);
		transport = snapshot ? "inline" : msg.type === "init" && msg.transport || "sab";
		if (transport === "sab") {
			header = new Int32Array(msg.sab, 0, 4);
			payload = new Uint8Array(msg.sab, 16);
		}
		warmedMemoryLimitBytes = config.memoryLimitBytes;
		const wasmMemory = new WebAssembly.Memory({
			initial: 256,
			maximum: 256 + Math.ceil(config.memoryLimitBytes / WASM_PAGE_BYTES)
		});
		const wasmBinary = msg.type === "init" ? msg.wasmBinary : void 0;
		const QuickJS = await newQuickJSWASMModuleFromVariant(newVariant(src_default, {
			...snapshot ? { wasmModule: () => snapshot.wasmModule } : wasmBinary ? { wasmModule: () => WebAssembly.compile(wasmBinary) } : { wasmLocation: emscripten_module_default },
			wasmMemory
		}));
		if (dead) throw new Error("stopped");
		rt = QuickJS.newRuntime();
		rt.setMemoryLimit(config.memoryLimitBytes);
		rt.setMaxStackSize(1048576);
		rt.setInterruptHandler(interruptHandler);
		vm = rt.newContext();
		qjs = syncEntries(rt, vm);
		const hostFn = vm.newFunction("__host", hostFunction);
		vm.setProp(vm.global, "__host", hostFn);
		hostFn.dispose();
		const binFn = vm.newFunction("__hostBinary", hostBinaryFunction);
		vm.setProp(vm.global, "__hostBinary", binFn);
		binFn.dispose();
		let bootMs = 0;
		task("boot", config.cpuLimitMs, function* () {
			const t0 = performance.now();
			currentSliceMs = Math.max(config.cpuLimitMs, BUNDLE_BOOT_BUDGET_MS);
			deadline = performance.now() + currentSliceMs;
			const loaded = yield* evalScript(msg.sandboxBundle, "sandbox-bundle.js", "global");
			excludeMs = performance.now() - t0;
			if (dead) return;
			if (!loaded) return kill("sandbox bundle failed to load");
			const fn = vm.getProp(vm.global, "__twDispatch");
			if (vm.typeof(fn) !== "function") {
				fn.dispose();
				return kill("sandbox bundle failed to initialise");
			}
			twDispatch = fn;
			if (snapshot && !(yield* evalScript(snapshot.seedScript, "seed.js", "global"))) return kill("sandbox bundle failed to load");
			if (!(yield* evalScript(HIDE_HOST_GLOBALS, "hide-host.js", "global"))) return kill("sandbox bundle failed to load");
			bootMs = performance.now() - t0;
			post({
				type: "diag",
				kind: "boot",
				detail: `sandbox bundle eval ${bootMs.toFixed(0)} ms; wasm memory ${(wasmMemory.buffer.byteLength / 1048576).toFixed(1)} MB, cap ${((256 * WASM_PAGE_BYTES + config.memoryLimitBytes) / 1048576).toFixed(0)} MB${QuickJS.getWasmMemory() === wasmMemory ? "" : " (module ignored the provided Memory)"}`
			});
		});
		if (!dead) post({
			type: "warmed",
			bootMs
		});
		return {
			QuickJS,
			rt,
			vm,
			dispatch: twDispatch,
			memory: wasmMemory
		};
	}
	async function warmForSnapshot(msg, wasmModule, seedScript) {
		const warmed = await warm(msg, {
			wasmModule,
			seedScript
		});
		if (dead) throw new Error("the sandbox bundle did not load");
		return warmed;
	}
	function adopt(restored, msg) {
		if (dead) return;
		({rt, vm, dispatch: twDispatch} = restored);
		suspender = restored.suspender ?? null;
		slowdown = suspender?.kind === "asyncify" ? ASYNCIFY_SLOWDOWN : 1;
		transport = suspender ? "worker" : "inline";
		qjs = suspender ? waitingEntries(rt, vm, suspender) : syncEntries(rt, vm);
		if (suspender) suspender.onResume = () => othersTurn(takeThread(turn));
		warmedMemoryLimitBytes = restored.memoryLimitBytes;
		restored.bindHost(hostFunction, hostBinaryFunction);
		rt.setInterruptHandler(interruptHandler);
		start(msg);
	}
	/** Phase 2 (pool `start`, or the second half of `init`): the widget's HTML and its real config into the warmed VM. */
	function start(msg) {
		if (dead) return;
		config = withWebFeatures({
			...msg.config,
			memoryLimitBytes: Math.min(msg.config.memoryLimitBytes, warmedMemoryLimitBytes)
		});
		visible = config.visible !== false;
		budget = new CpuBudget(config);
		mainBudget = newMainBudget(config);
		rt.setMemoryLimit(config.memoryLimitBytes);
		const bootSliceMs = transport === "inline" || transport === "worker" ? config.cpuLimitMs * SHARED_BOOT_SLICE_FACTOR : config.cpuLimitMs;
		task("boot", bootSliceMs, () => callTw("boot", JSON.stringify({
			html: msg.html,
			config
		})), () => {
			task("boot", bootSliceMs, () => callTw("loaded", ""), () => {
				if (!dead) post({ type: "loaded" });
				post({
					type: "stats",
					stats: { ...stats }
				});
				ready = true;
				for (const m of queue.splice(0)) exclusive(() => handle(m));
			});
		});
	}
	let ready = false;
	let activeGesture = 0;
	function handle(msg) {
		if (dead) return;
		switch (msg.type) {
			case "event":
				dispatch("event", msg.ev, typeof msg.gesture === "number" ? msg.gesture : 0);
				return;
			case "frame":
				if (!visible) {
					frameWanted = true;
					return;
				}
				dispatch("frame", coarseNowMs(msg.time));
				return;
			case "viewport":
				dispatch("viewport", msg.viewport);
				return;
			case "resize":
				dispatch("resize", msg.entries);
				return;
			case "theme":
				dispatch("theme", {
					theme: msg.theme,
					themeParams: msg.themeParams
				});
				return;
			case "safeArea":
				dispatch("safeArea", msg.inset);
				return;
			case "visibility":
				setVisible(!!msg.visible);
				return;
			case "bridge":
				dispatch("bridge", msg.event);
				return;
		}
	}
	let warming = null;
	const fail = (err) => kill("failed to start sandbox: " + err.message);
	function onMessage(msg) {
		if (msg.type === "stop") {
			destroy();
			return;
		}
		if (dead && (msg.type === "init" || msg.type === "warm" || msg.type === "start")) return;
		if (msg.type === "init") {
			warming = warm(msg);
			warming.then(() => start(msg)).catch(fail);
		} else if (msg.type === "warm") {
			warming = warm(msg);
			warming.catch(fail);
		} else if (msg.type === "start") (warming ?? Promise.reject(/* @__PURE__ */ new Error("start before warm"))).then(() => start(msg)).catch(fail);
		else if (!ready) queue.push(msg);
		else exclusive(() => handle(msg));
	}
	return {
		receive: onMessage,
		warmForSnapshot,
		adopt,
		destroy,
		kill
	};
}
//#endregion
//#region node_modules/.pnpm/parse5@8.0.1/node_modules/parse5/dist/common/unicode.js
const UNDEFINED_CODE_POINTS = /* @__PURE__ */ new Set([
	65534,
	65535,
	131070,
	131071,
	196606,
	196607,
	262142,
	262143,
	327678,
	327679,
	393214,
	393215,
	458750,
	458751,
	524286,
	524287,
	589822,
	589823,
	655358,
	655359,
	720894,
	720895,
	786430,
	786431,
	851966,
	851967,
	917502,
	917503,
	983038,
	983039,
	1048574,
	1048575,
	1114110,
	1114111
]);
var CODE_POINTS;
(function(CODE_POINTS) {
	CODE_POINTS[CODE_POINTS["EOF"] = -1] = "EOF";
	CODE_POINTS[CODE_POINTS["NULL"] = 0] = "NULL";
	CODE_POINTS[CODE_POINTS["TABULATION"] = 9] = "TABULATION";
	CODE_POINTS[CODE_POINTS["CARRIAGE_RETURN"] = 13] = "CARRIAGE_RETURN";
	CODE_POINTS[CODE_POINTS["LINE_FEED"] = 10] = "LINE_FEED";
	CODE_POINTS[CODE_POINTS["FORM_FEED"] = 12] = "FORM_FEED";
	CODE_POINTS[CODE_POINTS["SPACE"] = 32] = "SPACE";
	CODE_POINTS[CODE_POINTS["EXCLAMATION_MARK"] = 33] = "EXCLAMATION_MARK";
	CODE_POINTS[CODE_POINTS["QUOTATION_MARK"] = 34] = "QUOTATION_MARK";
	CODE_POINTS[CODE_POINTS["AMPERSAND"] = 38] = "AMPERSAND";
	CODE_POINTS[CODE_POINTS["APOSTROPHE"] = 39] = "APOSTROPHE";
	CODE_POINTS[CODE_POINTS["HYPHEN_MINUS"] = 45] = "HYPHEN_MINUS";
	CODE_POINTS[CODE_POINTS["SOLIDUS"] = 47] = "SOLIDUS";
	CODE_POINTS[CODE_POINTS["DIGIT_0"] = 48] = "DIGIT_0";
	CODE_POINTS[CODE_POINTS["DIGIT_9"] = 57] = "DIGIT_9";
	CODE_POINTS[CODE_POINTS["SEMICOLON"] = 59] = "SEMICOLON";
	CODE_POINTS[CODE_POINTS["LESS_THAN_SIGN"] = 60] = "LESS_THAN_SIGN";
	CODE_POINTS[CODE_POINTS["EQUALS_SIGN"] = 61] = "EQUALS_SIGN";
	CODE_POINTS[CODE_POINTS["GREATER_THAN_SIGN"] = 62] = "GREATER_THAN_SIGN";
	CODE_POINTS[CODE_POINTS["QUESTION_MARK"] = 63] = "QUESTION_MARK";
	CODE_POINTS[CODE_POINTS["LATIN_CAPITAL_A"] = 65] = "LATIN_CAPITAL_A";
	CODE_POINTS[CODE_POINTS["LATIN_CAPITAL_Z"] = 90] = "LATIN_CAPITAL_Z";
	CODE_POINTS[CODE_POINTS["RIGHT_SQUARE_BRACKET"] = 93] = "RIGHT_SQUARE_BRACKET";
	CODE_POINTS[CODE_POINTS["GRAVE_ACCENT"] = 96] = "GRAVE_ACCENT";
	CODE_POINTS[CODE_POINTS["LATIN_SMALL_A"] = 97] = "LATIN_SMALL_A";
	CODE_POINTS[CODE_POINTS["LATIN_SMALL_Z"] = 122] = "LATIN_SMALL_Z";
})(CODE_POINTS || (CODE_POINTS = {}));
const SEQUENCES = {
	DASH_DASH: "--",
	CDATA_START: "[CDATA[",
	DOCTYPE: "doctype",
	SCRIPT: "script",
	PUBLIC: "public",
	SYSTEM: "system"
};
function isSurrogate(cp) {
	return cp >= 55296 && cp <= 57343;
}
function isSurrogatePair(cp) {
	return cp >= 56320 && cp <= 57343;
}
function getSurrogatePairCodePoint(cp1, cp2) {
	return (cp1 - 55296) * 1024 + 9216 + cp2;
}
function isControlCodePoint(cp) {
	return cp !== 32 && cp !== 10 && cp !== 13 && cp !== 9 && cp !== 12 && cp >= 1 && cp <= 31 || cp >= 127 && cp <= 159;
}
function isUndefinedCodePoint(cp) {
	return cp >= 64976 && cp <= 65007 || UNDEFINED_CODE_POINTS.has(cp);
}
//#endregion
//#region node_modules/.pnpm/parse5@8.0.1/node_modules/parse5/dist/common/error-codes.js
var ERR;
(function(ERR) {
	ERR["controlCharacterInInputStream"] = "control-character-in-input-stream";
	ERR["noncharacterInInputStream"] = "noncharacter-in-input-stream";
	ERR["surrogateInInputStream"] = "surrogate-in-input-stream";
	ERR["nonVoidHtmlElementStartTagWithTrailingSolidus"] = "non-void-html-element-start-tag-with-trailing-solidus";
	ERR["endTagWithAttributes"] = "end-tag-with-attributes";
	ERR["endTagWithTrailingSolidus"] = "end-tag-with-trailing-solidus";
	ERR["unexpectedSolidusInTag"] = "unexpected-solidus-in-tag";
	ERR["unexpectedNullCharacter"] = "unexpected-null-character";
	ERR["unexpectedQuestionMarkInsteadOfTagName"] = "unexpected-question-mark-instead-of-tag-name";
	ERR["invalidFirstCharacterOfTagName"] = "invalid-first-character-of-tag-name";
	ERR["unexpectedEqualsSignBeforeAttributeName"] = "unexpected-equals-sign-before-attribute-name";
	ERR["missingEndTagName"] = "missing-end-tag-name";
	ERR["unexpectedCharacterInAttributeName"] = "unexpected-character-in-attribute-name";
	ERR["unknownNamedCharacterReference"] = "unknown-named-character-reference";
	ERR["missingSemicolonAfterCharacterReference"] = "missing-semicolon-after-character-reference";
	ERR["unexpectedCharacterAfterDoctypeSystemIdentifier"] = "unexpected-character-after-doctype-system-identifier";
	ERR["unexpectedCharacterInUnquotedAttributeValue"] = "unexpected-character-in-unquoted-attribute-value";
	ERR["eofBeforeTagName"] = "eof-before-tag-name";
	ERR["eofInTag"] = "eof-in-tag";
	ERR["missingAttributeValue"] = "missing-attribute-value";
	ERR["missingWhitespaceBetweenAttributes"] = "missing-whitespace-between-attributes";
	ERR["missingWhitespaceAfterDoctypePublicKeyword"] = "missing-whitespace-after-doctype-public-keyword";
	ERR["missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers"] = "missing-whitespace-between-doctype-public-and-system-identifiers";
	ERR["missingWhitespaceAfterDoctypeSystemKeyword"] = "missing-whitespace-after-doctype-system-keyword";
	ERR["missingQuoteBeforeDoctypePublicIdentifier"] = "missing-quote-before-doctype-public-identifier";
	ERR["missingQuoteBeforeDoctypeSystemIdentifier"] = "missing-quote-before-doctype-system-identifier";
	ERR["missingDoctypePublicIdentifier"] = "missing-doctype-public-identifier";
	ERR["missingDoctypeSystemIdentifier"] = "missing-doctype-system-identifier";
	ERR["abruptDoctypePublicIdentifier"] = "abrupt-doctype-public-identifier";
	ERR["abruptDoctypeSystemIdentifier"] = "abrupt-doctype-system-identifier";
	ERR["cdataInHtmlContent"] = "cdata-in-html-content";
	ERR["incorrectlyOpenedComment"] = "incorrectly-opened-comment";
	ERR["eofInScriptHtmlCommentLikeText"] = "eof-in-script-html-comment-like-text";
	ERR["eofInDoctype"] = "eof-in-doctype";
	ERR["nestedComment"] = "nested-comment";
	ERR["abruptClosingOfEmptyComment"] = "abrupt-closing-of-empty-comment";
	ERR["eofInComment"] = "eof-in-comment";
	ERR["incorrectlyClosedComment"] = "incorrectly-closed-comment";
	ERR["eofInCdata"] = "eof-in-cdata";
	ERR["absenceOfDigitsInNumericCharacterReference"] = "absence-of-digits-in-numeric-character-reference";
	ERR["nullCharacterReference"] = "null-character-reference";
	ERR["surrogateCharacterReference"] = "surrogate-character-reference";
	ERR["characterReferenceOutsideUnicodeRange"] = "character-reference-outside-unicode-range";
	ERR["controlCharacterReference"] = "control-character-reference";
	ERR["noncharacterCharacterReference"] = "noncharacter-character-reference";
	ERR["missingWhitespaceBeforeDoctypeName"] = "missing-whitespace-before-doctype-name";
	ERR["missingDoctypeName"] = "missing-doctype-name";
	ERR["invalidCharacterSequenceAfterDoctypeName"] = "invalid-character-sequence-after-doctype-name";
	ERR["duplicateAttribute"] = "duplicate-attribute";
	ERR["nonConformingDoctype"] = "non-conforming-doctype";
	ERR["missingDoctype"] = "missing-doctype";
	ERR["misplacedDoctype"] = "misplaced-doctype";
	ERR["endTagWithoutMatchingOpenElement"] = "end-tag-without-matching-open-element";
	ERR["closingOfElementWithOpenChildElements"] = "closing-of-element-with-open-child-elements";
	ERR["disallowedContentInNoscriptInHead"] = "disallowed-content-in-noscript-in-head";
	ERR["openElementsLeftAfterEof"] = "open-elements-left-after-eof";
	ERR["abandonedHeadElementChild"] = "abandoned-head-element-child";
	ERR["misplacedStartTagForHeadElement"] = "misplaced-start-tag-for-head-element";
	ERR["nestedNoscriptInHead"] = "nested-noscript-in-head";
	ERR["eofInElementThatCanContainOnlyText"] = "eof-in-element-that-can-contain-only-text";
})(ERR || (ERR = {}));
//#endregion
//#region node_modules/.pnpm/parse5@8.0.1/node_modules/parse5/dist/tokenizer/preprocessor.js
const DEFAULT_BUFFER_WATERLINE = 65536;
var Preprocessor = class {
	constructor(handler) {
		this.handler = handler;
		this.html = "";
		this.pos = -1;
		this.lastGapPos = -2;
		this.gapStack = [];
		this.skipNextNewLine = false;
		this.lastChunkWritten = false;
		this.endOfChunkHit = false;
		this.bufferWaterline = DEFAULT_BUFFER_WATERLINE;
		this.isEol = false;
		this.lineStartPos = 0;
		this.droppedBufferSize = 0;
		this.line = 1;
		this.lastErrOffset = -1;
	}
	/** The column on the current line. If we just saw a gap (eg. a surrogate pair), return the index before. */
	get col() {
		return this.pos - this.lineStartPos + Number(this.lastGapPos !== this.pos);
	}
	get offset() {
		return this.droppedBufferSize + this.pos;
	}
	getError(code, cpOffset) {
		const { line, col, offset } = this;
		const startCol = col + cpOffset;
		const startOffset = offset + cpOffset;
		return {
			code,
			startLine: line,
			endLine: line,
			startCol,
			endCol: startCol,
			startOffset,
			endOffset: startOffset
		};
	}
	_err(code) {
		if (this.handler.onParseError && this.lastErrOffset !== this.offset) {
			this.lastErrOffset = this.offset;
			this.handler.onParseError(this.getError(code, 0));
		}
	}
	_addGap() {
		this.gapStack.push(this.lastGapPos);
		this.lastGapPos = this.pos;
	}
	_processSurrogate(cp) {
		if (this.pos !== this.html.length - 1) {
			const nextCp = this.html.charCodeAt(this.pos + 1);
			if (isSurrogatePair(nextCp)) {
				this.pos++;
				this._addGap();
				return getSurrogatePairCodePoint(cp, nextCp);
			}
		} else if (!this.lastChunkWritten) {
			this.endOfChunkHit = true;
			return CODE_POINTS.EOF;
		}
		this._err(ERR.surrogateInInputStream);
		return cp;
	}
	willDropParsedChunk() {
		return this.pos > this.bufferWaterline;
	}
	dropParsedChunk() {
		if (this.willDropParsedChunk()) {
			this.html = this.html.substring(this.pos);
			this.lineStartPos -= this.pos;
			this.droppedBufferSize += this.pos;
			this.pos = 0;
			this.lastGapPos = -2;
			this.gapStack.length = 0;
		}
	}
	write(chunk, isLastChunk) {
		if (this.html.length > 0) this.html += chunk;
		else this.html = chunk;
		this.endOfChunkHit = false;
		this.lastChunkWritten = isLastChunk;
	}
	insertHtmlAtCurrentPos(chunk) {
		this.html = this.html.substring(0, this.pos + 1) + chunk + this.html.substring(this.pos + 1);
		this.endOfChunkHit = false;
	}
	startsWith(pattern, caseSensitive) {
		if (this.pos + pattern.length > this.html.length) {
			this.endOfChunkHit = !this.lastChunkWritten;
			return false;
		}
		if (caseSensitive) return this.html.startsWith(pattern, this.pos);
		for (let i = 0; i < pattern.length; i++) if ((this.html.charCodeAt(this.pos + i) | 32) !== pattern.charCodeAt(i)) return false;
		return true;
	}
	peek(offset) {
		const pos = this.pos + offset;
		if (pos >= this.html.length) {
			this.endOfChunkHit = !this.lastChunkWritten;
			return CODE_POINTS.EOF;
		}
		const code = this.html.charCodeAt(pos);
		return code === CODE_POINTS.CARRIAGE_RETURN ? CODE_POINTS.LINE_FEED : code;
	}
	advance() {
		this.pos++;
		if (this.isEol) {
			this.isEol = false;
			this.line++;
			this.lineStartPos = this.pos;
		}
		if (this.pos >= this.html.length) {
			this.endOfChunkHit = !this.lastChunkWritten;
			return CODE_POINTS.EOF;
		}
		let cp = this.html.charCodeAt(this.pos);
		if (cp === CODE_POINTS.CARRIAGE_RETURN) {
			this.isEol = true;
			this.skipNextNewLine = true;
			return CODE_POINTS.LINE_FEED;
		}
		if (cp === CODE_POINTS.LINE_FEED) {
			this.isEol = true;
			if (this.skipNextNewLine) {
				this.line--;
				this.skipNextNewLine = false;
				this._addGap();
				return this.advance();
			}
		}
		this.skipNextNewLine = false;
		if (isSurrogate(cp)) cp = this._processSurrogate(cp);
		if (!(this.handler.onParseError === null || cp > 31 && cp < 127 || cp === CODE_POINTS.LINE_FEED || cp === CODE_POINTS.CARRIAGE_RETURN || cp > 159 && cp < 64976)) this._checkForProblematicCharacters(cp);
		return cp;
	}
	_checkForProblematicCharacters(cp) {
		if (isControlCodePoint(cp)) this._err(ERR.controlCharacterInInputStream);
		else if (isUndefinedCodePoint(cp)) this._err(ERR.noncharacterInInputStream);
	}
	retreat(count) {
		this.pos -= count;
		while (this.pos < this.lastGapPos) {
			this.lastGapPos = this.gapStack.pop();
			this.pos--;
		}
		this.isEol = false;
	}
};
//#endregion
//#region node_modules/.pnpm/parse5@8.0.1/node_modules/parse5/dist/common/token.js
var TokenType;
(function(TokenType) {
	TokenType[TokenType["CHARACTER"] = 0] = "CHARACTER";
	TokenType[TokenType["NULL_CHARACTER"] = 1] = "NULL_CHARACTER";
	TokenType[TokenType["WHITESPACE_CHARACTER"] = 2] = "WHITESPACE_CHARACTER";
	TokenType[TokenType["START_TAG"] = 3] = "START_TAG";
	TokenType[TokenType["END_TAG"] = 4] = "END_TAG";
	TokenType[TokenType["COMMENT"] = 5] = "COMMENT";
	TokenType[TokenType["DOCTYPE"] = 6] = "DOCTYPE";
	TokenType[TokenType["EOF"] = 7] = "EOF";
	TokenType[TokenType["HIBERNATION"] = 8] = "HIBERNATION";
})(TokenType || (TokenType = {}));
function getTokenAttr(token, attrName) {
	for (let i = token.attrs.length - 1; i >= 0; i--) if (token.attrs[i].name === attrName) return token.attrs[i].value;
	return null;
}
//#endregion
//#region node_modules/.pnpm/entities@8.0.0/node_modules/entities/dist/decode-codepoint.js
const decodeMap = /* @__PURE__ */ new Map([
	[0, 65533],
	[128, 8364],
	[130, 8218],
	[131, 402],
	[132, 8222],
	[133, 8230],
	[134, 8224],
	[135, 8225],
	[136, 710],
	[137, 8240],
	[138, 352],
	[139, 8249],
	[140, 338],
	[142, 381],
	[145, 8216],
	[146, 8217],
	[147, 8220],
	[148, 8221],
	[149, 8226],
	[150, 8211],
	[151, 8212],
	[152, 732],
	[153, 8482],
	[154, 353],
	[155, 8250],
	[156, 339],
	[158, 382],
	[159, 376]
]);
/**
* Replace the given code point with a replacement character if it is a
* surrogate or is outside the valid range. Otherwise return the code
* point unchanged.
* @param codePoint Unicode code point to convert.
*/
function replaceCodePoint(codePoint) {
	if (codePoint >= 55296 && codePoint <= 57343 || codePoint > 1114111) return 65533;
	return decodeMap.get(codePoint) ?? codePoint;
}
//#endregion
//#region node_modules/.pnpm/entities@8.0.0/node_modules/entities/dist/internal/decode-shared.js
/**
* Shared base64 decode helper for generated decode data.
* Assumes global atob is available.
* @param input Input string to encode or decode.
*/
function decodeBase64(input) {
	const binary = atob(input);
	const evenLength = binary.length & -2;
	const out = new Uint16Array(evenLength / 2);
	for (let index = 0, outIndex = 0; index < evenLength; index += 2) {
		const lo = binary.charCodeAt(index);
		const hi = binary.charCodeAt(index + 1);
		out[outIndex++] = lo | hi << 8;
	}
	return out;
}
//#endregion
//#region node_modules/.pnpm/entities@8.0.0/node_modules/entities/dist/generated/decode-data-html.js
/** Packed HTML decode trie data. */
const htmlDecodeTree = /* #__PURE__ */ decodeBase64("QR08ALkAAgH6AYsDNQR2BO0EPgXZBQEGLAbdBxMISQrvCmQLfQurDKQNLw4fD4YPpA+6D/IPAAAAAAAAAAAAAAAAKhBMEY8TmxUWF2EYLBkxGuAa3RsJHDscWR8YIC8jSCSIJcMl6ie3Ku8rEC0CLjoupS7kLgAIRU1hYmNmZ2xtbm9wcnN0dVQAWgBeAGUAaQBzAHcAfgCBAIQAhwCSAJoAoACsALMAbABpAGcAO4DGAMZAUAA7gCYAJkBjAHUAdABlADuAwQDBQHIiZXZlAAJhAAFpeW0AcgByAGMAO4DCAMJAEGRyAADgNdgE3XIAYQB2AGUAO4DAAMBA8CFoYZFj4SFjcgBhZAAAoFMqAAFncIsAjgBvAG4ABGFmAADgNdg43fAlbHlGdW5jdGlvbgCgYSBpAG4AZwA7gMUAxUAAAWNzpACoAHIAAOA12Jzc6SFnbgCgVCJpAGwAZABlADuAwwDDQG0AbAA7gMQAxEAABGFjZWZvcnN1xQDYANoA7QDxAPYA+QD8AAABY3LJAM8AayNzbGFzaAAAoBYidgHTANUAAKDnKmUAZAAAoAYjeQARZIABY3J0AOAA5QDrAGEidXNlAACgNSLuI291bGxpcwCgLCFhAJJjcgAA4DXYBd1wAGYAAOA12Dnd5SF2ZdhiYwDyAOoAbSJwZXEAAKBOIgAHSE9hY2RlZmhpbG9yc3UXARoBHwE6AVIBVQFiAWQBZgGCAakB6QHtAfIBYwB5ACdkUABZADuAqQCpQIABY3B5ACUBKAE1AfUhdGUGYWmg0iJ0KGFsRGlmZmVyZW50aWFsRAAAoEUhbCJleXMAAKAtIQACYWVpb0EBRAFKAU0B8iFvbgxhZABpAGwAO4DHAMdAcgBjAAhhbiJpbnQAAKAwIm8AdAAKYQABZG5ZAV0BaSJsbGEAuGB0I2VyRG90ALdg8gA5AWkAp2NyImNsZQAAAkRNUFRwAXQBeQF9AW8AdAAAoJkiaSJudXMAAKCWIuwhdXMAoJUiaSJtZXMAAKCXIm8AAAFjc4cBlAFrKndpc2VDb250b3VySW50ZWdyYWwAAKAyImUjQ3VybHkAAAFEUZwBpAFvJXVibGVRdW90ZQAAoB0gdSJvdGUAAKAZIAACbG5wdbABtgHNAdgBbwBuAGWgNyIAoHQqgAFnaXQAvAHBAcUB8iJ1ZW50AKBhIm4AdAAAoC8i7yV1ckludGVncmFsAKAuIgABZnLRAdMBAKACIe8iZHVjdACgECJuLnRlckNsb2Nrd2lzZUNvbnRvdXJJbnRlZ3JhbAAAoDMi7yFzcwCgLypjAHIAAOA12J7ccABDoNMiYQBwAACgTSKABURKU1phY2VmaW9zAAsCEgIVAhgCGwIsAjQCOQI9AnMCfwNvoEUh9CJyYWhkAKARKWMAeQACZGMAeQAFZGMAeQAPZIABZ3JzACECJQIoAuchZXIAoCEgcgAAoKEhaAB2AACg5CoAAWF5MAIzAvIhb24OYRRkbAB0oAciYQCUY3IAAOA12AfdAAFhZkECawIAAWNtRQJnAvIjaXRpY2FsAAJBREdUUAJUAl8CYwJjInV0ZQC0YG8AdAFZAloC2WJiJGxlQWN1dGUA3WJyImF2ZQBgYGkibGRlANxi7yFuZACgxCJmJWVyZW50aWFsRAAAoEYhcAR9AgAAAAAAAIECjgIAABoDZgAA4DXYO91EoagAhQKJAm8AdAAAoNwgcSJ1YWwAAKBQIuIhbGUAA0NETFJVVpkCqAK1Au8C/wIRA28AbgB0AG8AdQByAEkAbgB0AGUAZwByAGEA7ADEAW8AdAKvAgAAAACwAqhgbiNBcnJvdwAAoNMhAAFlb7kC0AJmAHQAgAFBUlQAwQLGAs0CciJyb3cAAKDQIekkZ2h0QXJyb3cAoNQhZQDlACsCbgBnAAABTFLWAugC5SFmdAABQVLcAuECciJyb3cAAKD4J+kkZ2h0QXJyb3cAoPon6SRnaHRBcnJvdwCg+SdpImdodAAAAUFU9gL7AnIicm93AACg0iFlAGUAAKCoInAAQQIGAwAAAAALA3Iicm93AACg0SFvJHduQXJyb3cAAKDVIWUlcnRpY2FsQmFyAACgJSJuAAADQUJMUlRhJAM2AzoDWgNxA3oDciJyb3cAAKGTIUJVLAMwA2EAcgAAoBMpcCNBcnJvdwAAoPUhciJldmUAEWPlIWZ00gJDAwAASwMAAFIDaSVnaHRWZWN0b3IAAKBQKWUkZVZlY3RvcgAAoF4p5SJjdG9yQqC9IWEAcgAAoFYpaSJnaHQA1AFiAwAAaQNlJGVWZWN0b3IAAKBfKeUiY3RvckKgwSFhAHIAAKBXKWUAZQBBoKQiciJyb3cAAKCnIXIAcgBvAPcAtAIAAWN0gwOHA3IAAOA12J/c8iFvaxBhAAhOVGFjZGZnbG1vcHFzdHV4owOlA6kDsAO/A8IDxgPNA9ID8gP9AwEEFAQeBCAEJQRHAEphSAA7gNAA0EBjAHUAdABlADuAyQDJQIABYWl5ALYDuQO+A/Ihb24aYXIAYwA7gMoAykAtZG8AdAAWYXIAAOA12AjdcgBhAHYAZQA7gMgAyEDlIm1lbnQAoAgiAAFhcNYD2QNjAHIAEmF0AHkAUwLhAwAAAADpA20lYWxsU3F1YXJlAACg+yVlJ3J5U21hbGxTcXVhcmUAAKCrJQABZ3D2A/kDbwBuABhhZgAA4DXYPN3zImlsb26VY3UAAAFhaQYEDgRsAFSgdSppImxkZQAAoEIi7CNpYnJpdW0AoMwhAAFjaRgEGwRyAACgMCFtAACgcyphAJdjbQBsADuAywDLQAABaXApBC0E8yF0cwCgAyLvJG5lbnRpYWxFAKBHIYACY2Zpb3MAPQQ/BEMEXQRyBHkAJGRyAADgNdgJ3WwibGVkAFMCTAQAAAAAVARtJWFsbFNxdWFyZQAAoPwlZSdyeVNtYWxsU3F1YXJlAACgqiVwA2UEAABpBAAAAABtBGYAAOA12D3dwSFsbACgACLyI2llcnRyZgCgMSFjAPIAcQQABkpUYWJjZGZnb3JzdIgEiwSOBJMElwSkBKcEqwStBLIE5QTqBGMAeQADZDuAPgA+QO0hbWFkoJMD3GNyImV2ZQAeYYABZWl5AJ0EoASjBOQhaWwiYXIAYwAcYRNkbwB0ACBhcgAA4DXYCt0AoNkicABmAADgNdg+3eUiYXRlcgADRUZHTFNUvwTIBM8E1QTZBOAEcSJ1YWwATKBlIuUhc3MAoNsidSRsbEVxdWFsAACgZyJyI2VhdGVyAACgoirlIXNzAKB3IuwkYW50RXF1YWwAoH4qaSJsZGUAAKBzImMAcgAA4DXYotwAoGsiAARBYWNmaW9zdfkE/QQFBQgFCwUTBSIFKwVSIkRjeQAqZAABY3QBBQQFZQBrAMdiXmDpIXJjJGFyAACgDCFsJWJlcnRTcGFjZQAAoAsh8AEYBQAAGwVmAACgDSHpJXpvbnRhbExpbmUAoAAlAAFjdCYFKAXyABIF8iFvayZhbQBwAEQBMQU5BW8AdwBuAEgAdQBtAPAAAAFxInVhbAAAoE8iAAdFSk9hY2RmZ21ub3N0dVMFVgVZBVwFYwVtBXAFcwV6BZAFtgXFBckFzQVjAHkAFWTsIWlnMmFjAHkAAWRjAHUAdABlADuAzQDNQAABaXlnBWwFcgBjADuAzgDOQBhkbwB0ADBhcgAAoBEhcgBhAHYAZQA7gMwAzEAAoREhYXB/BYsFAAFjZ4MFhQVyACphaSNuYXJ5SQAAoEghbABpAGUA8wD6AvQBlQUAAKUFZaAsIgABZ3KaBZ4F8iFhbACgKyLzI2VjdGlvbgCgwiJpI3NpYmxlAAABQ1SsBbEFbyJtbWEAAKBjIGkibWVzAACgYiCAAWdwdAC8Bb8FwwVvAG4ALmFmAADgNdhA3WEAmWNjAHIAAKAQIWkibGRlAChh6wHSBQAA1QVjAHkABmRsADuAzwDPQIACY2Zvc3UA4QXpBe0F8gX9BQABaXnlBegFcgBjADRhGWRyAADgNdgN3XAAZgAA4DXYQd3jAfcFAAD7BXIAAOA12KXc8iFjeQhk6yFjeQRkgANISmFjZm9zAAwGDwYSBhUGHQYhBiYGYwB5ACVkYwB5AAxk8CFwYZpjAAFleRkGHAbkIWlsNmEaZHIAAOA12A7dcABmAADgNdhC3WMAcgAA4DXYptyABUpUYWNlZmxtb3N0AD0GQAZDBl4GawZkB2gHcAd0B80H2gdjAHkACWQ7gDwAPECAAmNtbnByAEwGTwZSBlUGWwb1IXRlOWHiIWRhm2NnAACg6ifsI2FjZXRyZgCgEiFyAACgniGAAWFleQBkBmcGagbyIW9uPWHkIWlsO2EbZAABZnNvBjQHdAAABUFDREZSVFVWYXKABp4GpAbGBssG3AYDByEHwQIqBwABbnKEBowGZyVsZUJyYWNrZXQAAKDoJ/Ihb3cAoZAhQlKTBpcGYQByAACg5CHpJGdodEFycm93AKDGIWUjaWxpbmcAAKAII28A9QGqBgAAsgZiJWxlQnJhY2tldAAAoOYnbgDUAbcGAAC+BmUkZVZlY3RvcgAAoGEp5SJjdG9yQqDDIWEAcgAAoFkpbCJvb3IAAKAKI2kiZ2h0AAABQVbSBtcGciJyb3cAAKCUIeUiY3RvcgCgTikAAWVy4AbwBmUAAKGjIkFW5gbrBnIicm93AACgpCHlImN0b3IAoFopaSNhbmdsZQBCorIi+wYAAAAA/wZhAHIAAKDPKXEidWFsAACgtCJwAIABRFRWAAoHEQcYB+8kd25WZWN0b3IAoFEpZSRlVmVjdG9yAACgYCnlImN0b3JCoL8hYQByAACgWCnlImN0b3JCoLwhYQByAACgUilpAGcAaAB0AGEAcgByAG8A9wDMAnMAAANFRkdMU1Q/B0cHTgdUB1gHXwfxJXVhbEdyZWF0ZXIAoNoidSRsbEVxdWFsAACgZiJyI2VhdGVyAACgdiLlIXNzAKChKuwkYW50RXF1YWwAoH0qaSJsZGUAAKByInIAAOA12A/dZaDYIuYjdGFycm93AKDaIWkiZG90AD9hgAFucHcAege1B7kHZwAAAkxSbHKCB5QHmwerB+UhZnQAAUFSiAeNB3Iicm93AACg9SfpJGdodEFycm93AKD3J+kkZ2h0QXJyb3cAoPYn5SFmdAABYXLcAqEHaQBnAGgAdABhAHIAcgBvAPcA5wJpAGcAaAB0AGEAcgByAG8A9wDuAmYAAOA12EPdZQByAAABTFK/B8YHZSRmdEFycm93AACgmSHpJGdodEFycm93AKCYIYABY2h0ANMH1QfXB/IAWgYAoLAh8iFva0FhAKBqIgAEYWNlZmlvc3XpB+wH7gf/BwMICQgOCBEIcAAAoAUpeQAcZAABZGzyB/kHaSR1bVNwYWNlAACgXyBsI2ludHJmAACgMyFyAADgNdgQ3e4jdXNQbHVzAKATInAAZgAA4DXYRN1jAPIA/gecY4AESmFjZWZvc3R1ACEIJAgoCDUIgQiFCDsKQApHCmMAeQAKZGMidXRlAENhgAFhZXkALggxCDQI8iFvbkdh5CFpbEVhHWSAAWdzdwA7CGEIfQjhInRpdmWAAU1UVgBECEwIWQhlJWRpdW1TcGFjZQAAoAsgaABpAAABY25SCFMIawBTAHAAYQBjAOUASwhlAHIAeQBUAGgAaQDuAFQI9CFlZAABR0xnCHUIcgBlAGEAdABlAHIARwByAGUAYQB0AGUA8gDrBGUAcwBzAEwAZQBzAPMA2wdMImluZQAKYHIAAOA12BHdAAJCbnB0jAiRCJkInAhyImVhawAAoGAgwiZyZWFraW5nU3BhY2WgYGYAAKAVIUOq7CqzCMIIzQgAAOcIGwkAAAAAAAAtCQAAbwkAAIcJAACdCcAJGQoAADQKAAFvdbYIvAjuI2dydWVudACgYiJwIkNhcAAAoG0ibyh1YmxlVmVydGljYWxCYXIAAKAmIoABbHF4ANII1wjhCOUibWVudACgCSL1IWFsVKBgImkibGRlAADgQiI4A2kic3RzAACgBCJyI2VhdGVyAACjbyJFRkdMU1T1CPoIAgkJCQ0JFQlxInVhbAAAoHEidSRsbEVxdWFsAADgZyI4A3IjZWF0ZXIAAOBrIjgD5SFzcwCgeSLsJGFudEVxdWFsAOB+KjgDaSJsZGUAAKB1IvUhbXBEASAJJwnvI3duSHVtcADgTiI4A3EidWFsAADgTyI4A2UAAAFmczEJRgn0JFRyaWFuZ2xlQqLqIj0JAAAAAEIJYQByAADgzyk4A3EidWFsAACg7CJzAICibiJFR0xTVABRCVYJXAlhCWkJcSJ1YWwAAKBwInIjZWF0ZXIAAKB4IuUhc3MA4GoiOAPsJGFudEVxdWFsAOB9KjgDaSJsZGUAAKB0IuUic3RlZAABR0x1CX8J8iZlYXRlckdyZWF0ZXIA4KIqOAPlI3NzTGVzcwDgoSo4A/IjZWNlZGVzAKGAIkVTjwmVCXEidWFsAADgryo4A+wkYW50RXF1YWwAoOAiAAFlaaAJqQl2JmVyc2VFbGVtZW50AACgDCLnJWh0VHJpYW5nbGVCousitgkAAAAAuwlhAHIAAODQKTgDcSJ1YWwAAKDtIgABcXXDCeAJdSNhcmVTdQAAAWJwywnVCfMhZXRF4I8iOANxInVhbAAAoOIi5SJyc2V0ReCQIjgDcSJ1YWwAAKDjIoABYmNwAOYJ8AkNCvMhZXRF4IIi0iBxInVhbAAAoIgi4yJlZWRzgKGBIkVTVAD6CQAKBwpxInVhbAAA4LAqOAPsJGFudEVxdWFsAKDhImkibGRlAADgfyI4A+UicnNldEXggyLSIHEidWFsAACgiSJpImxkZQCAoUEiRUZUACIKJwouCnEidWFsAACgRCJ1JGxsRXF1YWwAAKBHImkibGRlAACgSSJlJXJ0aWNhbEJhcgAAoCQiYwByAADgNdip3GkAbABkAGUAO4DRANFAnWMAB0VhY2RmZ21vcHJzdHV2XgphCmgKcgp2CnoKgQqRCpYKqwqtCrsKyArNCuwhaWdSYWMAdQB0AGUAO4DTANNAAAFpeWwKcQpyAGMAO4DUANRAHmRiImxhYwBQYXIAAOA12BLdcgBhAHYAZQA7gNIA0kCAAWFlaQCHCooKjQpjAHIATGFnAGEAqWNjInJvbgCfY3AAZgAA4DXYRt3lI25DdXJseQABRFGeCqYKbyV1YmxlUXVvdGUAAKAcIHUib3RlAACgGCAAoFQqAAFjbLEKtQpyAADgNdiq3GEAcwBoADuA2ADYQGkAbAHACsUKZABlADuA1QDVQGUAcwAAoDcqbQBsADuA1gDWQGUAcgAAAUJQ0wrmCgABYXLXCtoKcgAAoD4gYQBjAAABZWvgCuIKAKDeI2UAdAAAoLQjYSVyZW50aGVzaXMAAKDcI4AEYWNmaGlsb3JzAP0KAwsFCwkLCwsMCxELIwtaC3IjdGlhbEQAAKACInkAH2RyAADgNdgT3WkApmOgY/Ujc01pbnVzsWAAAWlwFQsgC24AYwBhAHIAZQBwAGwAYQBuAOUACgVmAACgGSGAobsqZWlvACoLRQtJC+MiZWRlc4CheiJFU1QANAs5C0ALcSJ1YWwAAKCvKuwkYW50RXF1YWwAoHwiaSJsZGUAAKB+Im0AZQAAoDMgAAFkcE0LUQv1IWN0AKAPIm8jcnRpb24AYaA3ImwAAKAdIgABY2leC2ILcgAA4DXYq9yoYwACVWZvc2oLbwtzC3cLTwBUADuAIgAiQHIAAOA12BTdcABmAACgGiFjAHIAAOA12KzcAAZCRWFjZWZoaW9yc3WPC5MLlwupC7YL2AvbC90LhQyTDJoMowzhIXJyAKAQKUcAO4CuAK5AgAFjbnIAnQugC6ML9SF0ZVRhZwAAoOsncgB0oKAhbAAAoBYpgAFhZXkArwuyC7UL8iFvblhh5CFpbFZhIGR2oBwhZSJyc2UAAAFFVb8LzwsAAWxxwwvIC+UibWVudACgCyL1JGlsaWJyaXVtAKDLIXAmRXF1aWxpYnJpdW0AAKBvKXIAAKAcIW8AoWPnIWh0AARBQ0RGVFVWYewLCgwQDDIMNwxeDHwM9gIAAW5y8Av4C2clbGVCcmFja2V0AACg6SfyIW93AKGSIUJM/wsDDGEAcgAAoOUhZSRmdEFycm93AACgxCFlI2lsaW5nAACgCSNvAPUBFgwAAB4MYiVsZUJyYWNrZXQAAKDnJ24A1AEjDAAAKgxlJGVWZWN0b3IAAKBdKeUiY3RvckKgwiFhAHIAAKBVKWwib29yAACgCyMAAWVyOwxLDGUAAKGiIkFWQQxGDHIicm93AACgpiHlImN0b3IAoFspaSNhbmdsZQBCorMiVgwAAAAAWgxhAHIAAKDQKXEidWFsAACgtSJwAIABRFRWAGUMbAxzDO8kd25WZWN0b3IAoE8pZSRlVmVjdG9yAACgXCnlImN0b3JCoL4hYQByAACgVCnlImN0b3JCoMAhYQByAACgUykAAXB1iQyMDGYAAKAdIe4kZEltcGxpZXMAoHAp6SRnaHRhcnJvdwCg2yEAAWNongyhDHIAAKAbIQCgsSHsJGVEZWxheWVkAKD0KYAGSE9hY2ZoaW1vcXN0dQC/DMgMzAzQDOIM5gwKDQ0NFA0ZDU8NVA1YDQABQ2PDDMYMyCFjeSlkeQAoZEYiVGN5ACxkYyJ1dGUAWmEAorwqYWVpedgM2wzeDOEM8iFvbmBh5CFpbF5hcgBjAFxhIWRyAADgNdgW3e8hcnQAAkRMUlXvDPYM/QwEDW8kd25BcnJvdwAAoJMhZSRmdEFycm93AACgkCHpJGdodEFycm93AKCSIXAjQXJyb3cAAKCRIechbWGjY+EkbGxDaXJjbGUAoBgicABmAADgNdhK3XICHw0AAAAAIg10AACgGiLhIXJlgKGhJUlTVQAqDTINSg3uJXRlcnNlY3Rpb24AoJMidQAAAWJwNw1ADfMhZXRFoI8icSJ1YWwAAKCRIuUicnNldEWgkCJxInVhbAAAoJIibiJpb24AAKCUImMAcgAA4DXYrtxhAHIAAKDGIgACYmNtcF8Nag2ODZANc6DQImUAdABFoNAicSJ1YWwAAKCGIgABY2huDYkNZSJlZHMAgKF7IkVTVAB4DX0NhA1xInVhbAAAoLAq7CRhbnRFcXVhbACgfSJpImxkZQAAoH8iVABoAGEA9ADHCwCgESIAodEiZXOVDZ8NciJzZXQARaCDInEidWFsAACghyJlAHQAAKDRIoAFSFJTYWNmaGlvcnMAtQ27Db8NyA3ODdsN3w3+DRgOHQ4jDk8AUgBOADuA3gDeQMEhREUAoCIhAAFIY8MNxg1jAHkAC2R5ACZkAAFidcwNzQ0JYKRjgAFhZXkA1A3XDdoN8iFvbmRh5CFpbGJhImRyAADgNdgX3QABZWnjDe4N8gHoDQAA7Q3lImZvcmUAoDQiYQCYYwABY27yDfkNayNTcGFjZQAA4F8gCiDTInBhY2UAoAkg7CFkZYChPCJFRlQABw4MDhMOcSJ1YWwAAKBDInUkbGxFcXVhbAAAoEUiaSJsZGUAAKBIInAAZgAA4DXYS93pI3BsZURvdACg2yAAAWN0Jw4rDnIAAOA12K/c8iFva2Zh4QpFDlYOYA5qDgAAbg5yDgAAAAAAAAAAAAB5DnwOqA6zDgAADg8RDxYPGg8AAWNySA5ODnUAdABlADuA2gDaQHIAb6CfIeMhaXIAoEkpcgDjAVsOAABdDnkADmR2AGUAbGEAAWl5Yw5oDnIAYwA7gNsA20AjZGIibGFjAHBhcgAA4DXYGN1yAGEAdgBlADuA2QDZQOEhY3JqYQABZGl/Dp8OZQByAAABQlCFDpcOAAFhcokOiw5yAF9gYQBjAAABZWuRDpMOAKDfI2UAdAAAoLUjYSVyZW50aGVzaXMAAKDdI28AbgBQoMMi7CF1cwCgjiIAAWdwqw6uDm8AbgByYWYAAOA12EzdAARBREVUYWRwc78O0g7ZDuEOBQPqDvMOBw9yInJvdwDCoZEhyA4AAMwOYQByAACgEilvJHduQXJyb3cAAKDFIW8kd25BcnJvdwAAoJUhcSV1aWxpYnJpdW0AAKBuKWUAZQBBoKUiciJyb3cAAKClIW8AdwBuAGEAcgByAG8A9wAQA2UAcgAAAUxS+Q4AD2UkZnRBcnJvdwAAoJYh6SRnaHRBcnJvdwCglyFpAGyg0gNvAG4ApWPpIW5nbmFjAHIAAOA12LDcaSJsZGUAaGFtAGwAO4DcANxAgAREYmNkZWZvc3YALQ8xDzUPNw89D3IPdg97D4AP4SFzaACgqyJhAHIAAKDrKnkAEmThIXNobKCpIgCg5ioAAWVyQQ9DDwCgwSKAAWJ0eQBJD00Paw9hAHIAAKAWIGmgFiDjIWFsAAJCTFNUWA9cD18PZg9hAHIAAKAjIukhbmV8YGUkcGFyYXRvcgAAoFgnaSJsZGUAAKBAItQkaGluU3BhY2UAoAogcgAA4DXYGd1wAGYAAOA12E3dYwByAADgNdix3GQiYXNoAACgqiKAAmNlZm9zAI4PkQ+VD5kPng/pIXJjdGHkIWdlAKDAInIAAOA12BrdcABmAADgNdhO3WMAcgAA4DXYstwAAmZpb3OqD64Prw+0D3IAAOA12BvdnmNwAGYAAOA12E/dYwByAADgNdiz3IAEQUlVYWNmb3N1AMgPyw/OD9EP2A/gD+QP6Q/uD2MAeQAvZGMAeQAHZGMAeQAuZGMAdQB0AGUAO4DdAN1AAAFpedwP3w9yAGMAdmErZHIAAOA12BzdcABmAADgNdhQ3WMAcgAA4DXYtNxtAGwAeGEABEhhY2RlZm9z/g8BEAUQDRAQEB0QIBAkEGMAeQAWZGMidXRlAHlhAAFheQkQDBDyIW9ufWEXZG8AdAB7YfIBFRAAABwQbwBXAGkAZAB0AOgAVAhhAJZjcgAAoCghcABmAACgJCFjAHIAAOA12LXc4QtCEEkQTRAAAGcQbRByEAAAAAAAAAAAeRCKEJcQ8hD9EAAAGxEhETIROREAAD4RYwB1AHQAZQA7gOEA4UByImV2ZQADYYCiPiJFZGl1eQBWEFkQWxBgEGUQAOA+IjMDAKA/InIAYwA7gOIA4kB0AGUAO4C0ALRAMGRsAGkAZwA7gOYA5kByoGEgAOA12B7dcgBhAHYAZQA7gOAA4EAAAWVwfBCGEAABZnCAEIQQ8yF5bQCgNSHoAIMQaABhALFjAAFhcI0QWwAAAWNskRCTEHIAAWFnAACgPypkApwQAAAAALEQAKInImFkc3ajEKcQqRCuEG4AZAAAoFUqAKBcKmwib3BlAACgWCoAoFoqAKMgImVsbXJzersQvRDAEN0Q5RDtEACgpCllAACgICJzAGQAYaAhImEEzhDQENIQ1BDWENgQ2hDcEACgqCkAoKkpAKCqKQCgqykAoKwpAKCtKQCgrikAoK8pdAB2oB8iYgBkoL4iAKCdKQABcHTpEOwQaAAAoCIixWDhIXJyAKB8IwABZ3D1EPgQbwBuAAVhZgAA4DXYUt0Ao0giRWFlaW9wBxEJEQ0RDxESERQRAKBwKuMhaXIAoG8qAKBKImQAAKBLInMAJ2DyIW94ZaBIIvEADhFpAG4AZwA7gOUA5UCAAWN0eQAmESoRKxFyAADgNdi23CpgbQBwAGWgSCLxAPgBaQBsAGQAZQA7gOMA40BtAGwAO4DkAORAAAFjaUERRxFvAG4AaQBuAPQA6AFuAHQAAKARKgAITmFiY2RlZmlrbG5vcHJzdWQRaBGXEZ8RpxGrEdIR1hErEjASexKKEn0RThNbE3oTbwB0AACg7SoAAWNybBGJEWsAAAJjZXBzdBF4EX0RghHvIW5nAKBMInAjc2lsb24A9mNyImltZQAAoDUgaQBtAGWgPSJxAACgzSJ2AY0RkRFlAGUAAKC9ImUAZABnoAUjZQAAoAUjcgBrAHSgtSPiIXJrAKC2IwABb3mjEaYRbgDnAHcRMWTxIXVvAKAeIIACY21wcnQAtBG5Eb4RwRHFEeEhdXPloDUi5ABwInR5dgAAoLApcwDpAH0RbgBvAPUA6gCAAWFodwDLEcwRzhGyYwCgNiHlIWVuAKBsInIAAOA12B/dZwCAA2Nvc3R1dncA4xHyEQUSEhIhEiYSKRKAAWFpdQDpEesR7xHwAKMFcgBjAACg7yVwAACgwyKAAWRwdAD4EfwRABJvAHQAAKAAKuwhdXMAoAEqaSJtZXMAAKACKnECCxIAAAAADxLjIXVwAKAGKmEAcgAAoAUm8iNpYW5nbGUAAWR1GhIeEu8hd24AoL0lcAAAoLMlcCJsdXMAAKAEKmUA5QBCD+UAkg9hInJvdwAAoA0pgAFha28ANhJoEncSAAFjbjoSZRJrAIABbHN0AEESRxJNEm8jemVuZ2UAAKDrKXEAdQBhAHIA5QBcBPIjaWFuZ2xlgKG0JWRscgBYElwSYBLvIXduAKC+JeUhZnQAoMIlaSJnaHQAAKC4JWsAAKAjJLEBbRIAAHUSsgFxEgAAcxIAoJIlAKCRJTQAAKCTJWMAawAAoIglAAFlb38ShxJx4D0A5SD1IWl2AOBhIuUgdAAAoBAjAAJwdHd4kRKVEpsSnxJmAADgNdhT3XSgpSJvAG0AAKClIvQhaWUAoMgiAAZESFVWYmRobXB0dXayEsES0RLgEvcS+xIKExoTHxMjEygTNxMAAkxSbHK5ErsSvRK/EgCgVyUAoFQlAKBWJQCgUyUAolAlRFVkdckSyxLNEs8SAKBmJQCgaSUAoGQlAKBnJQACTFJsctgS2hLcEt4SAKBdJQCgWiUAoFwlAKBZJQCjUSVITFJobHLrEu0S7xLxEvMS9RIAoGwlAKBjJQCgYCUAoGslAKBiJQCgXyVvAHgAAKDJKQACTFJscgITBBMGEwgTAKBVJQCgUiUAoBAlAKAMJQCiACVEVWR1EhMUExYTGBMAoGUlAKBoJQCgLCUAoDQlaSJudXMAAKCfIuwhdXMAoJ4iaSJtZXMAAKCgIgACTFJsci8TMRMzEzUTAKBbJQCgWCUAoBglAKAUJQCjAiVITFJobHJCE0QTRhNIE0oTTBMAoGolAKBhJQCgXiUAoDwlAKAkJQCgHCUAAWV2UhNVE3YA5QD5AGIAYQByADuApgCmQAACY2Vpb2ITZhNqE24TcgAA4DXYt9xtAGkAAKBPIG0A5aA9IogRbAAAoVwAYmh0E3YTAKDFKfMhdWIAoMgnbAF+E4QTbABloCIgdAAAoCIgcAAAoU4iRWWJE4sTAKCuKvGgTyI8BeEMqRMAAN8TABQDFB8UAAAjFDQUAAAAAIUUAAAAAI0UAAAAANcU4xT3FPsUAACIFQAAlhWAAWNwcgCuE7ET1RP1IXRlB2GAoikiYWJjZHMAuxO/E8QTzhPSE24AZAAAoEQqciJjdXAAAKBJKgABYXXIE8sTcAAAoEsqcAAAoEcqbwB0AACgQCoA4CkiAP4AAWVv2RPcE3QAAKBBIO4ABAUAAmFlaXXlE+8T9RP4E/AB6hMAAO0TcwAAoE0qbwBuAA1hZABpAGwAO4DnAOdAcgBjAAlhcABzAHOgTCptAACgUCpvAHQAC2GAAWRtbgAIFA0UEhRpAGwAO4C4ALhAcCJ0eXYAAKCyKXQAAIGiADtlGBQZFKJAcgBkAG8A9ABiAXIAAOA12CDdgAFjZWkAKBQqFDIUeQBHZGMAawBtoBMn4SFyawCgEyfHY3IAAKPLJUVjZWZtcz8UQRRHFHcUfBSAFACgwykAocYCZWxGFEkUcQAAoFciZQBhAlAUAAAAAGAUciJyb3cAAAFsclYUWhTlIWZ0AKC6IWkiZ2h0AACguyGAAlJTYWNkAGgUaRRrFG8UcxSuYACgyCRzAHQAAKCbIukhcmMAoJoi4SFzaACgnSJuImludAAAoBAqaQBkAACg7yrjIWlyAKDCKfUhYnN1oGMmaQB0AACgYybsApMUmhS2FAAAwxRvAG4AZaA6APGgVCKrAG0CnxQAAAAAoxRhAHSgLABAYAChASJmbKcUqRTuABMNZQAAAW14rhSyFOUhbnQAoAEiZQDzANIB5wG6FAAAwBRkoEUibwB0AACgbSpuAPQAzAGAAWZyeQDIFMsUzhQA4DXYVN1vAOQA1wEAgakAO3MeAdMUcgAAoBchAAFhb9oU3hRyAHIAAKC1IXMAcwAAoBcnAAFjdeYU6hRyAADgNdi43AABYnDuFPIUZaDPKgCg0SploNAqAKDSKuQhb3QAoO8igANkZWxwcnZ3AAYVEBUbFSEVRBVlFYQV4SFycgABbHIMFQ4VAKA4KQCgNSlwAhYVAAAAABkVcgAAoN4iYwAAoN8i4SFycnCgtiEAoD0pgKIqImJjZG9zACsVMBU6FT4VQRVyImNhcAAAoEgqAAFhdTQVNxVwAACgRipwAACgSipvAHQAAKCNInIAAKBFKgDgKiIA/gACYWxydksVURVuFXMVcgByAG2gtyEAoDwpeQCAAWV2dwBYFWUVaRVxAHACXxUAAAAAYxVyAGUA4wAXFXUA4wAZFWUAZQAAoM4iZSJkZ2UAAKDPImUAbgA7gKQApEBlI2Fycm93AAABbHJ7FX8V5SFmdACgtiFpImdodAAAoLchZQDkAG0VAAFjaYsVkRVvAG4AaQBuAPQAkwFuAHQAAKAxImwiY3R5AACgLSOACUFIYWJjZGVmaGlqbG9yc3R1d3oAuBW7Fb8V1RXgFegV+RUKFhUWHxZUFlcWZRbFFtsW7xb7FgUXChdyAPIAtAJhAHIAAKBlKQACZ2xyc8YVyhXOFdAV5yFlcgCgICDlIXRoAKA4IfIA9QxoAHagECAAoKMiawHZFd4VYSJyb3cAAKAPKWEA4wBfAgABYXnkFecV8iFvbg9hNGQAoUYhYW/tFfQVAAFnciEC8RVyAACgyiF0InNlcQAAoHcqgAFnbG0A/xUCFgUWO4CwALBAdABhALRjcCJ0eXYAAKCxKQABaXIOFhIW8yFodACgfykA4DXYId1hAHIAAAFschsWHRYAoMMhAKDCIYACYWVnc3YAKBauAjYWOhY+Fm0AAKHEIm9zLhY0Fm4AZABzoMQi9SFpdACgZiZhIm1tYQDdY2kAbgAAoPIiAKH3AGlvQxZRFmQAZQAAgfcAO29KFksW90BuI3RpbWVzAACgxyJuAPgAUBZjAHkAUmRjAG8CXhYAAAAAYhZyAG4AAKAeI28AcAAAoA0jgAJscHR1dwBuFnEWdRaSFp4W7CFhciRgZgAA4DXYVd0AotkCZW1wc30WhBaJFo0WcQBkoFAibwB0AACgUSJpIm51cwAAoDgi7CF1cwCgFCLxInVhcmUAoKEiYgBsAGUAYgBhAHIAdwBlAGQAZwDlANcAbgCAAWFkaAClFqoWtBZyAHIAbwD3APUMbwB3AG4AYQByAHIAbwB3APMA8xVhI3Jwb29uAAABbHK8FsAWZQBmAPQAHBZpAGcAaAD0AB4WYgHJFs8WawBhAHIAbwD3AJILbwLUFgAAAADYFnIAbgAAoB8jbwBwAACgDCOAAWNvdADhFukW7BYAAXJ55RboFgDgNdi53FVkbAAAoPYp8iFvaxFhAAFkcvMW9xZvAHQAAKDxImkA5qC/JVsSAAFhaP8WAhdyAPIANQNhAPIA1wvhIm5nbGUAoKYpAAFjaQ4XEBd5AF9k5yJyYXJyAKD/JwAJRGFjZGVmZ2xtbm9wcXJzdHV4MRc4F0YXWxcyBF4XaRd5F40XrBe0F78X2RcVGCEYLRg1GEAYAAFEbzUXgRZvAPQA+BUAAWNzPBdCF3UAdABlADuA6QDpQPQhZXIAoG4qAAJhaW95TRdQF1YXWhfyIW9uG2FyAGOgViI7gOoA6kDsIW9uAKBVIk1kbwB0ABdhAAFEcmIXZhdvAHQAAKBSIgDgNdgi3XKhmipuF3QXYQB2AGUAO4DoAOhAZKCWKm8AdAAAoJgqgKGZKmlscwCAF4UXhxfuInRlcnMAoOcjAKATIWSglSpvAHQAAKCXKoABYXBzAJMXlheiF2MAcgATYXQAeQBzogUinxcAAAAAoRdlAHQAAKAFInAAMaADIDMBqRerFwCgBCAAoAUgAAFnc7AXsRdLYXAAAKACIAABZ3C4F7sXbwBuABlhZgAA4DXYVt2AAWFscwDFF8sXzxdyAHOg1SJsAACg4yl1AHMAAKBxKmkAAKG1A2x21RfYF28AbgC1Y/VjAAJjc3V24BfoF/0XEBgAAWlv5BdWF3IAYwAAoFYiaQLuFwAAAADwF+0ADQThIW50AAFnbPUX+Rd0AHIAAKCWKuUhc3MAoJUqgAFhZWkAAxgGGAoYbABzAD1gcwB0AACgXyJ2AESgYSJEAACgeCrwImFyc2wAoOUpAAFEYRkYHRhvAHQAAKBTInIAcgAAoHEpgAFjZGkAJxgqGO0XcgAAoC8hbwD0AIwCAAFhaDEYMhi3YzuA8ADwQAABbXI5GD0YbAA7gOsA60BvAACgrCCAAWNpcABGGEgYSxhsACFgcwD0ACwEAAFlb08YVxhjAHQAYQB0AGkAbwDuABoEbgBlAG4AdABpAGEAbADlADME4Ql1GAAAgRgAAIMYiBgAAAAAoRilGAAAqhgAALsYvhjRGAAA1xgnGWwAbABpAG4AZwBkAG8AdABzAGUA8QBlF3kARGRtImFsZQAAoEAmgAFpbHIAjRiRGJ0Y7CFpZwCgA/tpApcYAAAAAJoYZwAAoAD7aQBnAACgBPsA4DXYI93sIWlnAKAB++whaWcA4GYAagCAAWFsdACvGLIYthh0AACgbSZpAGcAAKAC+24AcwAAoLElbwBmAJJh8AHCGAAAxhhmAADgNdhX3QABYWvJGMwYbADsAGsEdqDUIgCg2SphI3J0aW50AACgDSoAAWFv2hgiGQABY3PeGB8ZsQPnGP0YBRkSGRUZAAAdGbID7xjyGPQY9xj5GAAA+xg7gL0AvUAAoFMhO4C8ALxAAKBVIQCgWSEAoFshswEBGQAAAxkAoFQhAKBWIbQCCxkOGQAAAAAQGTuAvgC+QACgVyEAoFwhNQAAoFghtgEZGQAAGxkAoFohAKBdITgAAKBeIWwAAKBEIHcAbgAAoCIjYwByAADgNdi73IAIRWFiY2RlZmdpamxub3JzdHYARhlKGVoZXhlmGWkZkhmWGZkZnRmgGa0ZxhnLGc8Z4BkjGmygZyIAoIwqgAFjbXAAUBlTGVgZ9SF0ZfVhbQBhAOSgswM6FgCghipyImV2ZQAfYQABaXliGWUZcgBjAB1hM2RvAHQAIWGAoWUibHFzAMYEcBl6GfGhZSLOBAAAdhlsAGEAbgD0AN8EgKF+KmNkbACBGYQZjBljAACgqSpvAHQAb6CAKmyggioAoIQqZeDbIgD+cwAAoJQqcgAA4DXYJN3noGsirATtIWVsAKA3IWMAeQBTZIChdyJFYWoApxmpGasZAKCSKgCgpSoAoKQqAAJFYWVztBm2Gb0ZwhkAoGkicABwoIoq8iFveACgiipxoIgq8aCIKrUZaQBtAACg5yJwAGYAAOA12FjdYQB2AOUAYwIAAWNp0xnWGXIAAKAKIW0AAKFzImVs3BneGQCgjioAoJAqAIM+ADtjZGxxco0E6xn0GfgZ/BkBGgABY2nvGfEZAKCnKnIAAKB6Km8AdAAAoNci0CFhcgCglSl1ImVzdAAAoHwqgAJhZGVscwAKGvQZFhrVBCAa8AEPGgAAFBpwAHIAbwD4AFkZcgAAoHgpcQAAAWxxxAQbGmwAZQBzAPMASRlpAO0A5AQAAWVuJxouGnIjdG5lcXEAAOBpIgD+xQAsGgAFQWFiY2Vma29zeUAaQxpmGmoabRqDGocalhrCGtMacgDyAMwCAAJpbG1yShpOGlAaVBpyAHMA8ABxD2YAvWBpAGwA9AASBQABZHJYGlsaYwB5AEpkAKGUIWN3YBpkGmkAcgAAoEgpAKCtIWEAcgAAoA8h6SFyYyVhgAFhbHIAcxp7Gn8a8iF0c3WgZSZpAHQAAKBlJuwhaXAAoCYg4yFvbgCguSJyAADgNdgl3XMAAAFld4wakRphInJvdwAAoCUpYSJyb3cAAKAmKYACYW1vcHIAnxqjGqcauhq+GnIAcgAAoP8h9CFodACgOyJrAAABbHKsGrMaZSRmdGFycm93AACgqSHpJGdodGFycm93AKCqIWYAAOA12Fnd4iFhcgCgFSCAAWNsdADIGswa0BpyAADgNdi93GEAcwDoAGka8iFvaydhAAFicNca2xr1IWxsAKBDIOghZW4AoBAg4Qr2GgAA/RoAAAgbExsaGwAAIRs7GwAAAAA+G2IbmRuVG6sbAACyG80b0htjAHUAdABlADuA7QDtQAChYyBpeQEbBhtyAGMAO4DuAO5AOGQAAWN4CxsNG3kANWRjAGwAO4ChAKFAAAFmcssCFhsA4DXYJt1yAGEAdgBlADuA7ADsQIChSCFpbm8AJxsyGzYbAAFpbisbLxtuAHQAAKAMKnQAAKAtIuYhaW4AoNwpdABhAACgKSHsIWlnM2GAAWFvcABDG1sbXhuAAWNndABJG0sbWRtyACthgAFlbHAAcQVRG1UbaQBuAOUAyAVhAHIA9AByBWgAMWFmAACgtyJlAGQAtWEAoggiY2ZvdGkbbRt1G3kb4SFyZQCgBSFpAG4AdKAeImkAZQAAoN0pZABvAPQAWxsAoisiY2VscIEbhRuPG5QbYQBsAACguiIAAWdyiRuNG2UAcgDzACMQ4wCCG2EicmhrAACgFyryIW9kAKA8KgACY2dwdJ8boRukG6gbeQBRZG8AbgAvYWYAAOA12FrdYQC5Y3UAZQBzAHQAO4C/AL9AAAFjabUbuRtyAADgNdi+3G4AAKIIIkVkc3bCG8QbyBvQAwCg+SJvAHQAAKD1Inag9CIAoPMiaaBiIOwhZGUpYesB1hsAANkbYwB5AFZkbAA7gO8A70AAA2NmbW9zdeYb7hvyG/Ub+hsFHAABaXnqG+0bcgBjADVhOWRyAADgNdgn3eEhdGg3YnAAZgAA4DXYW93jAf8bAAADHHIAAOA12L/c8iFjeVhk6yFjeVRkAARhY2ZnaGpvcxUcGhwiHCYcKhwtHDAcNRzwIXBhdqC6A/BjAAFleR4cIRzkIWlsN2E6ZHIAAOA12CjdciJlZW4AOGFjAHkARWRjAHkAXGRwAGYAAOA12FzdYwByAADgNdjA3IALQUJFSGFiY2RlZmdoamxtbm9wcnN0dXYAXhxtHHEcdRx5HN8cBx0dHTwd3B3tHfEdAR4EHh0eLB5FHrwewx7hHgkfPR9LH4ABYXJ0AGQcZxxpHHIA8gBvB/IAxQLhIWlsAKAbKeEhcnIAoA4pZ6BmIgCgiyphAHIAAKBiKWMJjRwAAJAcAACVHAAAAAAAAAAAAACZHJwcAACmHKgcrRwAANIc9SF0ZTph7SJwdHl2AKC0KXIAYQDuAFoG4iFkYbtjZwAAoegnZGyhHKMcAKCRKeUAiwYAoIUqdQBvADuAqwCrQHIAgKOQIWJmaGxwc3QAuhy/HMIcxBzHHMoczhxmoOQhcwAAoB8pcwAAoB0p6wCyGnAAAKCrIWwAAKA5KWkAbQAAoHMpbAAAoKIhAKGrKmFl1hzaHGkAbAAAoBkpc6CtKgDgrSoA/oABYWJyAOUc6RztHHIAcgAAoAwpcgBrAACgcicAAWFr8Rz4HGMAAAFla/Yc9xx7YFtgAAFlc/wc/hwAoIspbAAAAWR1Ax0FHQCgjykAoI0pAAJhZXV5Dh0RHRodHB3yIW9uPmEAAWRpFR0YHWkAbAA8YewAowbiAPccO2QAAmNxcnMkHScdLB05HWEAAKA2KXUAbwDyoBwgqhEAAWR1MB00HeghYXIAoGcpcyJoYXIAAKBLKWgAAKCyIQCiZCJmZ3FzRB1FB5Qdnh10AIACYWhscnQATh1WHWUdbB2NHXIicm93AHSgkCFhAOkAzxxhI3Jwb29uAAABZHVeHWId7yF3bgCgvSFwAACgvCHlJGZ0YXJyb3dzAKDHIWkiZ2h0AIABYWhzAHUdex2DHXIicm93APOglCGdBmEAcgBwAG8AbwBuAPMAzgtxAHUAaQBnAGEAcgByAG8A9wBlGugkcmVldGltZXMAoMsi8aFkIk0HAACaHWwAYQBuAPQAXgcAon0qY2Rnc6YdqR2xHbcdYwAAoKgqbwB0AG+gfypyoIEqAKCDKmXg2iIA/nMAAKCTKoACYWRlZ3MAwB3GHcod1h3ZHXAAcAByAG8A+ACmHG8AdAAAoNYicQAAAWdxzx3SHXQA8gBGB2cAdADyAHQcdADyAFMHaQDtAGMHgAFpbHIA4h3mHeod8yFodACgfClvAG8A8gDKBgDgNdgp3UWgdiIAoJEqYQH1Hf4dcgAAAWR1YB35HWygvCEAoGopbABrAACghCVjAHkAWWQAomoiYWNodAweDx4VHhkecgDyAGsdbwByAG4AZQDyAGAW4SFyZACgaylyAGkAAKD6JQABaW8hHiQe5CFvdEBh9SFzdGGgsCPjIWhlAKCwIwACRWFlczMeNR48HkEeAKBoInAAcKCJKvIhb3gAoIkqcaCHKvGghyo0HmkAbQAAoOYiAARhYm5vcHR3elIeXB5fHoUelh6mHqsetB4AAW5yVh5ZHmcAAKDsJ3IAAKD9IXIA6wCwBmcAgAFsbXIAZh52Hnse5SFmdAABYXKIB2weaQBnAGgAdABhAHIAcgBvAPcAkwfhInBzdG8AoPwnaQBnAGgAdABhAHIAcgBvAPcAmgdwI2Fycm93AAABbHKNHpEeZQBmAPQAxhxpImdodAAAoKwhgAFhZmwAnB6fHqIecgAAoIUpAOA12F3ddQBzAACgLSppIm1lcwAAoDQqYQGvHrMecwB0AACgFyLhAIoOZaHKJbkeRhLuIWdlAKDKJWEAcgBsoCgAdAAAoJMpgAJhY2htdADMHs8e1R7bHt0ecgDyAJ0GbwByAG4AZQDyANYWYQByAGSgyyEAoG0pAKAOIHIAaQAAoL8iAANhY2hpcXTrHu8e1QfzHv0eBh/xIXVvAKA5IHIAAOA12MHcbQDloXIi+h4AAPweAKCNKgCgjyoAAWJ19xwBH28AcqAYIACgGiDyIW9rQmEAhDwAO2NkaGlscXJCBhcfxh0gHyQfKB8sHzEfAAFjaRsfHR8AoKYqcgAAoHkqcgBlAOUAkx3tIWVzAKDJIuEhcnIAoHYpdSJlc3QAAKB7KgABUGk1HzkfYQByAACglillocMlAgdfEnIAAAFkdUIfRx9zImhhcgAAoEop6CFhcgCgZikAAWVuTx9WH3IjdG5lcXEAAOBoIgD+xQBUHwAHRGFjZGVmaGlsbm9wc3VuH3Ifoh+rH68ftx+7H74f5h/uH/MfBwj/HwsgxCFvdACgOiIAAmNscHJ5H30fiR+eH3IAO4CvAK9AAAFldIEfgx8AoEImZaAgJ3MAZQAAoCAnc6CmIXQAbwCAoaYhZGx1AJQfmB+cH28AdwDuAHkDZQBmAPQA6gbwAOkO6yFlcgCgriUAAW95ph+qH+0hbWEAoCkqPGThIXNoAKAUIOElc3VyZWRhbmdsZQCgISJyAADgNdgq3W8AAKAnIYABY2RuAMQfyR/bH3IAbwA7gLUAtUBhoiMi0B8AANMf1x9zAPQAKxFpAHIAAKDwKm8AdAA7gLcAt0B1AHMA4qESIh4TAADjH3WgOCIAoCoqYwHqH+0fcAAAoNsq8gB+GnAAbAB1APMACAgAAWRw9x/7H+UhbHMAoKciZgAA4DXYXt0AAWN0AyAHIHIAAOA12MLc8CFvcwCgPiJsobwDECAVIPQiaW1hcACguCJhAPAAEyAADEdMUlZhYmNkZWZnaGlqbG1vcHJzdHV2dzwgRyBmIG0geSCqILgg2iDeIBEhFSEyIUMhTSFQIZwhnyHSIQAiIyKLIrEivyIUIwABZ3RAIEMgAODZIjgD9uBrItIgBwmAAWVsdABNIF8gYiBmAHQAAAFhclMgWCByInJvdwAAoM0h6SRnaHRhcnJvdwCgziEA4NgiOAP24Goi0iBfCekkZ2h0YXJyb3cAoM8hAAFEZHEgdSDhIXNoAKCvIuEhc2gAoK4igAJiY25wdACCIIYgiSCNIKIgbABhAACgByL1IXRlRGFnAADgICLSIACiSSJFaW9wlSCYIJwgniAA4HAqOANkAADgSyI4A3MASWFyAG8A+AAyCnUAcgBhoG4mbADzoG4mmwjzAa8gAACzIHAAO4CgAKBAbQBwAOXgTiI4AyoJgAJhZW91eQDBIMogzSDWINkg8AHGIAAAyCAAoEMqbwBuAEhh5CFpbEZhbgBnAGSgRyJvAHQAAOBtKjgDcAAAoEIqPWThIXNoAKATIACjYCJBYWRxc3jpIO0g+SD+IAIhDCFyAHIAAKDXIXIAAAFocvIg9SBrAACgJClvoJch9wAGD28AdAAA4FAiOAN1AGkA9gC7CAABZWkGIQohYQByAACgKCntAN8I6SFzdPOgBCLlCHIAAOA12CvdAAJFZXN0/wgcISshLiHxoXEiIiEAABMJ8aFxIgAJAAAnIWwAYQBuAPQAEwlpAO0AGQlyoG8iAKBvIoABQWFwADghOyE/IXIA8gBeIHIAcgAAoK4hYQByAACg8ipzogsiSiEAAAAAxwtkoPwiAKD6ImMAeQBaZIADQUVhZGVzdABcIV8hYiFmIWkhkyGWIXIA8gBXIADgZiI4A3IAcgAAoJohcgAAoCUggKFwImZxcwBwIYQhjiF0AAABYXJ1IXohcgByAG8A9wBlIWkAZwBoAHQAYQByAHIAbwD3AD4h8aFwImAhAACKIWwAYQBuAPQAZwlz4H0qOAMAoG4iaQDtAG0JcqBuImkA5aDqIkUJaQDkADoKAAFwdKMhpyFmAADgNdhf3YCBrAA7aW4AriGvIcchrEBuAIChCSJFZHYAtyG6Ib8hAOD5IjgDbwB0AADg9SI4A+EB1gjEIcYhAKD3IgCg9iJpAHagDCLhAagJzyHRIQCg/iIAoP0igAFhb3IA2CHsIfEhcgCAoSYiYXN0AOAh5SHpIWwAbABlAOwAywhsAADg/SrlIADgAiI4A2wiaW50AACgFCrjoYAi9yEAAPohdQDlAJsJY+CvKjgDZaCAIvEAkwkAAkFhaXQHIgoiFyIeInIA8gBsIHIAcgAAoZshY3cRIhQiAOAzKTgDAOCdITgDZyRodGFycm93AACgmyFyAGkA5aDrIr4JgANjaGltcHF1AC8iPCJHIpwhTSJQIloigKGBImNlcgA2Iv0JOSJ1AOUABgoA4DXYw9zvIXJ0bQKdIQAAAABEImEAcgDhAOEhbQBloEEi8aBEIiYKYQDyAMsIcwB1AAABYnBWIlgi5QDUCeUA3wmAAWJjcABgInMieCKAoYQiRWVzAGci7glqIgDgxSo4A2UAdABl4IIi0iBxAPGgiCJoImMAZaCBIvEA/gmAoYUiRWVzAH8iFgqCIgDgxio4A2UAdABl4IMi0iBxAPGgiSKAIgACZ2lscpIilCKaIpwi7AAMCWwAZABlADuA8QDxQOcAWwlpI2FuZ2xlAAABbHKkIqoi5SFmdGWg6iLxAEUJaSJnaHQAZaDrIvEAvgltoL0DAKEjAGVzuCK8InIAbwAAoBYhcAAAoAcggARESGFkZ2lscnMAziLSItYi2iLeIugi7SICIw8j4SFzaACgrSLhIXJyAKAEKXAAAOBNItIg4SFzaACgrCIAAWV04iLlIgDgZSLSIADgPgDSIG4iZmluAACg3imAAUFldADzIvci+iJyAHIAAKACKQDgZCLSIHLgPADSIGkAZQAA4LQi0iAAAUF0BiMKI3IAcgAAoAMp8iFpZQDgtSLSIGkAbQAA4Dwi0iCAAUFhbgAaIx4jKiNyAHIAAKDWIXIAAAFociMjJiNrAACgIylvoJYh9wD/DuUhYXIAoCcpUxJqFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVCMAAF4jaSN/I4IjjSOeI8AUAAAAAKYjwCMAANoj3yMAAO8jHiQvJD8kRCQAAWNzVyNsFHUAdABlADuA8wDzQAABaXlhI2cjcgBjoJoiO4D0APRAPmSAAmFiaW9zAHEjdCN3I3EBeiNzAOgAdhTsIWFjUWF2AACgOCrvIWxkAKC8KewhaWdTYQABY3KFI4kjaQByAACgvykA4DXYLN1vA5QjAAAAAJYjAACcI24A22JhAHYAZQA7gPIA8kAAoMEpAAFibaEjjAphAHIAAKC1KQACYWNpdKwjryO6I70jcgDyAFkUAAFpcrMjtiNyAACgvinvIXNzAKC7KW4A5QDZCgCgwCmAAWFlaQDFI8gjyyNjAHIATWFnAGEAyWOAAWNkbgDRI9Qj1iPyIW9uv2MAoLYpdQDzAHgBcABmAADgNdhg3YABYWVsAOQj5yPrI3IAAKC3KXIAcAAAoLkpdQDzAHwBAKMoImFkaW9zdvkj/CMPJBMkFiQbJHIA8gBeFIChXSplZm0AAyQJJAwkcgBvoDQhZgAAoDQhO4CqAKpAO4C6ALpA5yFvZgCgtiJyAACgVipsIm9wZQAAoFcqAKBbKoABY2xvACMkJSQrJPIACCRhAHMAaAA7gPgA+EBsAACgmCJpAGwBMyQ4JGQAZQA7gPUA9UBlAHMAYaCXInMAAKA2Km0AbAA7gPYA9kDiIWFyAKA9I+EKXiQAAHokAAB8JJQkAACYJKkkAAAAALUkEQsAAPAkAAAAAAQleiUAAIMlcgCAoSUiYXN0AGUkbyQBCwCBtgA7bGokayS2QGwAZQDsABgDaQJ1JAAAAAB4JG0AAKDzKgCg/Sp5AD9kcgCAAmNpbXB0AIUkiCSLJJkSjyRuAHQAJWBvAGQALmBpAGwAAKAwIOUhbmsAoDEgcgAA4DXYLd2AAWltbwCdJKAkpCR2oMYD1WNtAGEA9AD+B24AZQAAoA4m9KHAA64kAAC0JGMjaGZvcmsAAKDUItZjAAFhdbgkxCRuAAABY2u9JMIkawBooA8hAKAOIfYAaRpzAACkKwBhYmNkZW1zdNMkIRPXJNsk4STjJOck6yTjIWlyAKAjKmkAcgAAoCIqAAFvdYsW3yQAoCUqAKByKm4AO4CxALFAaQBtAACgJip3AG8AAKAnKoABaXB1APUk+iT+JO4idGludACgFSpmAADgNdhh3W4AZAA7gKMAo0CApHoiRWFjZWlub3N1ABMlFSUYJRslTCVRJVklSSV1JQCgsypwAACgtyp1AOUAPwtjoK8qgKJ6ImFjZW5zACclLSU0JTYlSSVwAHAAcgBvAPgAFyV1AHIAbAB5AGUA8QA/C/EAOAuAAWFlcwA8JUElRSXwInByb3gAoLkqcQBxAACgtSppAG0AAKDoImkA7QBEC20AZQDzoDIgIguAAUVhcwBDJVclRSXwAEAlgAFkZnAATwtfJXElgAFhbHMAZSVpJW0l7CFhcgCgLiPpIW5lAKASI/UhcmYAoBMjdKAdIu8AWQvyIWVsAKCwIgABY2l9JYElcgAA4DXYxdzIY24iY3NwAACgCCAAA2Zpb3BzdZElKxuVJZolnyWkJXIAAOA12C7dcABmAADgNdhi3XIiaW1lAACgVyBjAHIAAOA12MbcgAFhZW8AqiW6JcAldAAAAWVpryW2JXIAbgBpAG8AbgDzABkFbgB0AACgFipzAHQAZaA/APEACRj0AG0LgApBQkhhYmNkZWZoaWxtbm9wcnN0dXgA4yXyJfYl+iVpJpAmpia9JtUm5ib4JlonaCdxJ3UnnietJ7EnyCfiJ+cngAFhcnQA6SXsJe4lcgDyAJkM8gD6AuEhaWwAoBwpYQByAPIA3BVhAHIAAKBkKYADY2RlbnFydAAGJhAmEyYYJiYmKyZaJgABZXUKJg0mAOA9IjEDdABlAFVhaQDjACAN7SJwdHl2AKCzKWcAgKHpJ2RlbAAgJiImJCYAoJIpAKClKeUA9wt1AG8AO4C7ALtAcgAApZIhYWJjZmhscHN0dz0mQCZFJkcmSiZMJk4mUSZVJlgmcAAAoHUpZqDlIXMAAKAgKQCgMylzAACgHinrALka8ACVHmwAAKBFKWkAbQAAoHQpbAAAoKMhAKCdIQABYWleJmImaQBsAACgGilvAG6gNiJhAGwA8wB2C4ABYWJyAG8mciZ2JnIA8gAvEnIAawAAoHMnAAFha3omgSZjAAABZWt/JoAmfWBdYAABZXOFJocmAKCMKWwAAAFkdYwmjiYAoI4pAKCQKQACYWV1eZcmmiajJqUm8iFvbllhAAFkaZ4moSZpAGwAV2HsAA8M4gCAJkBkAAJjbHFzrSawJrUmuiZhAACgNylkImhhcgAAoGkpdQBvAPKgHSCjAWgAAKCzIYABYWNnAMMm0iaUC2wAgKEcIWlwcwDLJs4migxuAOUAoAxhAHIA9ADaC3QAAKCtJYABaWxyANsm3ybjJvMhaHQAoH0pbwBvAPIANgwA4DXYL90AAWFv6ib1JnIAAAFkde8m8SYAoMEhbKDAIQCgbCl2oMED8WOAAWducwD+Jk4nUCdoAHQAAANhaGxyc3QKJxInISc1Jz0nRydyInJvdwB0oJIhYQDpAFYmYSNycG9vbgAAAWR1GiceJ28AdwDuAPAmcAAAoMAh5SFmdAABYWgnJy0ncgByAG8AdwDzAAkMYQByAHAAbwBvAG4A8wATBGklZ2h0YXJyb3dzAACgySFxAHUAaQBnAGEAcgByAG8A9wBZJugkcmVldGltZXMAoMwiZwDaYmkAbgBnAGQAbwB0AHMAZQDxABwYgAFhaG0AYCdjJ2YncgDyAAkMYQDyABMEAKAPIG8idXN0AGGgsSPjIWhlAKCxI+0haWQAoO4qAAJhYnB0fCeGJ4knmScAAW5ygCeDJ2cAAKDtJ3IAAKD+IXIA6wAcDIABYWZsAI8nkieVJ3IAAKCGKQDgNdhj3XUAcwAAoC4qaSJtZXMAAKA1KgABYXCiJ6gncgBnoCkAdAAAoJQp7yJsaW50AKASKmEAcgDyADwnAAJhY2hxuCe8J6EMwCfxIXVvAKA6IHIAAOA12MfcAAFidYAmxCdvAPKgGSCoAYABaGlyAM4n0ifWJ3IAZQDlAE0n7SFlcwCgyiJpAIChuSVlZmwAXAxjEt4n9CFyaQCgzinsInVoYXIAoGgpAKAeIWENBSgJKA0oSyhVKIYoAACLKLAoAAAAAOMo5ygAABApJCkxKW0pcSmHKaYpAACYKgAAAACxKmMidXRlAFthcQB1AO8ABR+ApHsiRWFjZWlucHN5ABwoHignKCooLygyKEEoRihJKACgtCrwASMoAAAlKACguCpvAG4AYWF1AOUAgw1koLAqaQBsAF9hcgBjAF1hgAFFYXMAOCg6KD0oAKC2KnAAAKC6KmkAbQAAoOki7yJsaW50AKATKmkA7QCIDUFkbwB0AGKixSKRFgAAAABTKACgZiqAA0FhY21zdHgAYChkKG8ocyh1KHkogihyAHIAAKDYIXIAAAFocmkoayjrAJAab6CYIfcAzAd0ADuApwCnQGkAO2D3IWFyAKApKW0AAAFpbn4ozQBuAHUA8wDOAHQAAKA2J3IA7+A12DDdIxkAAmFjb3mRKJUonSisKHIAcAAAoG8mAAFoeZkonChjAHkASWRIZHIAdABtAqUoAAAAAKgoaQDkAFsPYQByAGEA7ABsJDuArQCtQAABZ22zKLsobQBhAAChwwNmdroouijCY4CjPCJkZWdsbnByAMgozCjPKNMo1yjaKN4obwB0AACgairxoEMiCw5FoJ4qAKCgKkWgnSoAoJ8qZQAAoEYi7CF1cwCgJCrhIXJyAKByKWEAcgDyAPwMAAJhZWl07Sj8KAEpCCkAAWxz8Sj4KGwAcwBlAHQAbQDpAH8oaABwAACgMyrwImFyc2wAoOQpAAFkbFoPBSllAACgIyNloKoqc6CsKgDgrCoA/oABZmxwABUpGCkfKfQhY3lMZGKgLwBhoMQpcgAAoD8jZgAA4DXYZN1hAAABZHIoKRcDZQBzAHWgYCZpAHQAAKBgJoABY3N1ADYpRilhKQABYXU6KUApcABzoJMiAOCTIgD+cABzoJQiAOCUIgD+dQAAAWJwSylWKQChjyJlcz4NUCllAHQAZaCPIvEAPw0AoZAiZXNIDVspZQB0AGWgkCLxAEkNAKGhJWFmZilbBHIAZQFrKVwEAKChJWEAcgDyAAMNAAJjZW10dyl7KX8pgilyAADgNdjI3HQAbQDuAM4AaQDsAAYpYQByAOYAVw0AAWFyiimOKXIA5qAGJhESAAFhbpIpoylpImdodAAAAWVwmSmgKXAAcwBpAGwAbwDuANkXaADpAKAkcwCvYIACYmNtbnAArin8KY4NJSooKgCkgiJFZGVtbnByc7wpvinCKcgpzCnUKdgp3CkAoMUqbwB0AACgvSpkoIYibwB0AACgwyr1IWx0AKDBKgABRWXQKdIpAKDLKgCgiiLsIXVzAKC/KuEhcnIAoHkpgAFlaXUA4inxKfQpdAAAoYIiZW7oKewpcQDxoIYivSllAHEA8aCKItEpbQAAoMcqAAFicPgp+ikAoNUqAKDTKmMAgKJ7ImFjZW5zAAcqDSoUKhYqRihwAHAAcgBvAPgAIyh1AHIAbAB5AGUA8QCDDfEAfA2AAWFlcwAcKiIqPShwAHAAcgBvAPgAPChxAPEAOShnAACgaiYApoMiMTIzRWRlaGxtbnBzPCo/KkIqRSpHKlIqWCpjKmcqaypzKncqO4C5ALlAO4CyALJAO4CzALNAAKDGKgABb3NLKk4qdAAAoL4qdQBiAACg2CpkoIcibwB0AACgxCpzAAABb3VdKmAqbAAAoMknYgAAoNcq4SFycgCgeyn1IWx0AKDCKgABRWVvKnEqAKDMKgCgiyLsIXVzAKDAKoABZWl1AH0qjCqPKnQAAKGDImVugyqHKnEA8aCHIkYqZQBxAPGgiyJwKm0AAKDIKgABYnCTKpUqAKDUKgCg1iqAAUFhbgCdKqEqrCpyAHIAAKDZIXIAAAFocqYqqCrrAJUab6CZIfcAxQf3IWFyAKAqKWwAaQBnADuA3wDfQOELzyrZKtwq6SrsKvEqAAD1KjQrAAAAAAAAAAAAAEwrbCsAAHErvSsAAAAAAADRK3IC1CoAAAAA2CrnIWV0AKAWI8RjcgDrAOUKgAFhZXkA4SrkKucq8iFvbmVh5CFpbGNhQmRvAPQAIg5sInJlYwAAoBUjcgAA4DXYMd0AAmVpa2/7KhIrKCsuK/IBACsAAAkrZQAAATRm6g0EK28AcgDlAOsNYQBzorgDECsAAAAAEit5AG0A0WMAAWNuFislK2sAAAFhcxsrIStwAHAAcgBvAPgAFw5pAG0AAKA8InMA8AD9DQABYXMsKyEr8AAXDnIAbgA7gP4A/kDsATgrOyswG2QA5QBnAmUAcwCAgdcAO2JkAEMrRCtJK9dAYaCgInIAAKAxKgCgMCqAAWVwcwBRK1MraSvhAAkh4qKkIlsrXysAAAAAYytvAHQAAKA2I2kAcgAAoPEqb+A12GXdcgBrAACg2irhAHgociJpbWUAAKA0IIABYWlwAHYreSu3K2QA5QC+DYADYWRlbXBzdACFK6MrmiunK6wrsCuzK24iZ2xlAACitSVkbHFykCuUK5ornCvvIXduAKC/JeUhZnRloMMl8QACBwCgXCJpImdodABloLkl8QBdDG8AdAAAoOwlaSJudXMAAKA6KuwhdXMAoDkqYgAAoM0p6SFtZQCgOyrlInppdW0AoOIjgAFjaHQAwivKK80rAAFyecYrySsA4DXYydxGZGMAeQBbZPIhb2tnYQABaW/UK9creAD0ANERaCJlYWQAAAFsct4r5ytlAGYAdABhAHIAcgBvAPcAXQbpJGdodGFycm93AKCgIQAJQUhhYmNkZmdobG1vcHJzdHV3CiwNLBEsHSwnLDEsQCxLLFIsYix6LIQsjyzLLOgs7Sz/LAotcgDyAAkDYQByAACgYykAAWNyFSwbLHUAdABlADuA+gD6QPIACQ1yAOMBIywAACUseQBeZHYAZQBtYQABaXkrLDAscgBjADuA+wD7QENkgAFhYmgANyw6LD0scgDyANEO7CFhY3FhYQDyAOAOAAFpckQsSCzzIWh0AKB+KQDgNdgy3XIAYQB2AGUAO4D5APlAYQFWLF8scgAAAWxyWixcLACgvyEAoL4hbABrAACggCUAAWN0Zix2LG8CbCwAAAAAcyxyAG4AZaAcI3IAAKAcI28AcAAAoA8jcgBpAACg+CUAAWFsfiyBLGMAcgBrYTuAqACoQAABZ3CILIssbwBuAHNhZgAA4DXYZt0AA2FkaGxzdZksniynLLgsuyzFLHIAcgBvAPcACQ1vAHcAbgBhAHIAcgBvAPcA2A5hI3Jwb29uAAABbHKvLLMsZQBmAPQAWyxpAGcAaAD0AF0sdQDzAKYOaQAAocUDaGzBLMIs0mNvAG4AxWPwI2Fycm93cwCgyCGAAWNpdADRLOEs5CxvAtcsAAAAAN4scgBuAGWgHSNyAACgHSNvAHAAAKAOI24AZwBvYXIAaQAAoPklYwByAADgNdjK3IABZGlyAPMs9yz6LG8AdAAAoPAi7CFkZWlhaQBmoLUlAKC0JQABYW0DLQYtcgDyAMosbAA7gPwA/EDhIm5nbGUAoKcpgAdBQkRhY2RlZmxub3Byc3oAJy0qLTAtNC2bLZ0toS2/LcMtxy3TLdgt3C3gLfwtcgDyABADYQByAHag6CoAoOkqYQBzAOgA/gIAAW5yOC08LechcnQAoJwpgANla25wcnN0AJkpSC1NLVQtXi1iLYItYQBwAHAA4QAaHG8AdABoAGkAbgDnAKEXgAFoaXIAoSmzJFotbwBwAPQAdCVooJUh7wD4JgABaXVmLWotZwBtAOEAuygAAWJwbi14LXMjZXRuZXEAceCKIgD+AODLKgD+cyNldG5lcQBx4IsiAP4A4MwqAP4AAWhyhi2KLWUAdADhABIraSNhbmdsZQAAAWxyki2WLeUhZnQAoLIiaSJnaHQAAKCzInkAMmThIXNoAKCiIoABZWxyAKcttC24LWKiKCKuLQAAAACyLWEAcgAAoLsicQAAoFoi7CFpcACg7iIAAWJ0vC1eD2EA8gBfD3IAAOA12DPddAByAOkAlS1zAHUAAAFicM0t0C0A4IIi0iAA4IMi0iBwAGYAAOA12GfdcgBvAPAAWQt0AHIA6QCaLQABY3XkLegtcgAA4DXYy9wAAWJw7C30LW4AAAFFZXUt8S0A4IoiAP5uAAABRWV/LfktAOCLIgD+6SJnemFnAKCaKYADY2Vmb3BycwANLhAuJS4pLiMuLi40LukhcmN1YQABZGkULiEuAAFiZxguHC5hAHIAAKBfKmUAcaAnIgCgWSLlIXJwAKAYIXIAAOA12DTdcABmAADgNdho3WWgQCJhAHQA6ABqD2MAcgAA4DXYzNzjCuQRUC4AAFQuAABYLmIuAAAAAGMubS5wLnQuAAAAAIguki4AAJouJxIqEnQAcgDpAB0ScgAA4DXYNd0AAUFhWy5eLnIA8gDnAnIA8gCTB75jAAFBYWYuaS5yAPIA4AJyAPIAjAdhAPAAeh5pAHMAAKD7IoABZHB0APgReS6DLgABZmx9LoAuAOA12GnddQDzAP8RaQBtAOUABBIAAUFhiy6OLnIA8gDuAnIA8gCaBwABY3GVLgoScgAA4DXYzdwAAXB0nS6hLmwAdQDzACUScgDpACASAARhY2VmaW9zdbEuvC7ELsguzC7PLtQu2S5jAAABdXm2LrsudABlADuA/QD9QE9kAAFpecAuwy5yAGMAd2FLZG4AO4ClAKVAcgAA4DXYNt1jAHkAV2RwAGYAAOA12GrdYwByAADgNdjO3AABY23dLt8ueQBOZGwAO4D/AP9AAAVhY2RlZmhpb3N38y73Lv8uAi8MLxAvEy8YLx0vIi9jInV0ZQB6YQABYXn7Lv4u8iFvbn5hN2RvAHQAfGEAAWV0Bi8KL3QAcgDmAB8QYQC2Y3IAAOA12DfdYwB5ADZk5yJyYXJyAKDdIXAAZgAA4DXYa91jAHIAAOA12M/cAAFqbiYvKC8AoA0gagAAoAwg");
//#endregion
//#region node_modules/.pnpm/entities@8.0.0/node_modules/entities/dist/internal/bin-trie-flags.js
/**
* Bit flags & masks for the binary trie encoding used for entity decoding.
*
* Bit layout (16 bits total):
* 15..14 VALUE_LENGTH   (+1 encoding; 0 => no value)
* 13     FLAG13.        If valueLength>0: semicolon required flag (implicit ';').
*                       If valueLength==0: compact run flag.
* 12..7  BRANCH_LENGTH  Branch length (0 => single branch in 6..0 if jumpOffset==char) OR run length (when compact run)
* 6..0   JUMP_TABLE     Jump offset (jump table) OR single-branch char code OR first run char
*/
var BinTrieFlags;
(function(BinTrieFlags) {
	BinTrieFlags[BinTrieFlags["VALUE_LENGTH"] = 49152] = "VALUE_LENGTH";
	BinTrieFlags[BinTrieFlags["FLAG13"] = 8192] = "FLAG13";
	BinTrieFlags[BinTrieFlags["BRANCH_LENGTH"] = 8064] = "BRANCH_LENGTH";
	BinTrieFlags[BinTrieFlags["JUMP_TABLE"] = 127] = "JUMP_TABLE";
})(BinTrieFlags || (BinTrieFlags = {}));
//#endregion
//#region node_modules/.pnpm/entities@8.0.0/node_modules/entities/dist/decode.js
var CharCodes;
(function(CharCodes) {
	CharCodes[CharCodes["NUM"] = 35] = "NUM";
	CharCodes[CharCodes["SEMI"] = 59] = "SEMI";
	CharCodes[CharCodes["EQUALS"] = 61] = "EQUALS";
	CharCodes[CharCodes["ZERO"] = 48] = "ZERO";
	CharCodes[CharCodes["NINE"] = 57] = "NINE";
	CharCodes[CharCodes["LOWER_A"] = 97] = "LOWER_A";
	CharCodes[CharCodes["LOWER_F"] = 102] = "LOWER_F";
	CharCodes[CharCodes["LOWER_X"] = 120] = "LOWER_X";
	CharCodes[CharCodes["LOWER_Z"] = 122] = "LOWER_Z";
	CharCodes[CharCodes["UPPER_A"] = 65] = "UPPER_A";
	CharCodes[CharCodes["UPPER_F"] = 70] = "UPPER_F";
	CharCodes[CharCodes["UPPER_Z"] = 90] = "UPPER_Z";
})(CharCodes || (CharCodes = {}));
/** Bit that needs to be set to convert an upper case ASCII character to lower case */
const TO_LOWER_BIT = 32;
function isNumber(code) {
	return code >= CharCodes.ZERO && code <= CharCodes.NINE;
}
function isHexadecimalCharacter(code) {
	return code >= CharCodes.UPPER_A && code <= CharCodes.UPPER_F || code >= CharCodes.LOWER_A && code <= CharCodes.LOWER_F;
}
function isAsciiAlphaNumeric$1(code) {
	return code >= CharCodes.UPPER_A && code <= CharCodes.UPPER_Z || code >= CharCodes.LOWER_A && code <= CharCodes.LOWER_Z || isNumber(code);
}
/**
* Checks if the given character is a valid end character for an entity in an attribute.
*
* Attribute values that aren't terminated properly aren't parsed, and shouldn't lead to a parser error.
* See the example in https://html.spec.whatwg.org/multipage/parsing.html#named-character-reference-state
* @param code Code point to decode.
*/
function isEntityInAttributeInvalidEnd(code) {
	return code === CharCodes.EQUALS || isAsciiAlphaNumeric$1(code);
}
var EntityDecoderState;
(function(EntityDecoderState) {
	EntityDecoderState[EntityDecoderState["EntityStart"] = 0] = "EntityStart";
	EntityDecoderState[EntityDecoderState["NumericStart"] = 1] = "NumericStart";
	EntityDecoderState[EntityDecoderState["NumericDecimal"] = 2] = "NumericDecimal";
	EntityDecoderState[EntityDecoderState["NumericHex"] = 3] = "NumericHex";
	EntityDecoderState[EntityDecoderState["NamedEntity"] = 4] = "NamedEntity";
})(EntityDecoderState || (EntityDecoderState = {}));
/**
* Decoding mode for named entities.
*/
var DecodingMode;
(function(DecodingMode) {
	/** Entities in text nodes that can end with any character. */
	DecodingMode[DecodingMode["Legacy"] = 0] = "Legacy";
	/** Only allow entities terminated with a semicolon. */
	DecodingMode[DecodingMode["Strict"] = 1] = "Strict";
	/** Entities in attributes have limitations on ending characters. */
	DecodingMode[DecodingMode["Attribute"] = 2] = "Attribute";
})(DecodingMode || (DecodingMode = {}));
/**
* Token decoder with support of writing partial entities.
*/
var EntityDecoder = class {
	constructor(decodeTree, emitCodePoint, errors) {
		_defineProperty(this, "decodeTree", void 0);
		_defineProperty(this, "emitCodePoint", void 0);
		_defineProperty(this, "errors", void 0);
		_defineProperty(
			this,
			/** The current state of the decoder. */
			"state",
			EntityDecoderState.EntityStart
		);
		_defineProperty(
			this,
			/** Characters that were consumed while parsing an entity. */
			"consumed",
			1
		);
		_defineProperty(
			this,
			/**
			* The result of the entity.
			*
			* Either the result index of a numeric entity, or the codepoint of a
			* numeric entity.
			*/
			"result",
			0
		);
		_defineProperty(
			this,
			/** The current index in the decode tree. */
			"treeIndex",
			0
		);
		_defineProperty(
			this,
			/** The number of characters that were consumed in excess. */
			"excess",
			1
		);
		_defineProperty(
			this,
			/** The mode in which the decoder is operating. */
			"decodeMode",
			DecodingMode.Strict
		);
		_defineProperty(
			this,
			/** The number of characters that have been consumed in the current run. */
			"runConsumed",
			0
		);
		this.decodeTree = decodeTree;
		this.emitCodePoint = emitCodePoint;
		this.errors = errors;
	}
	/**
	* Resets the instance to make it reusable.
	* @param decodeMode Entity decoding mode to use.
	*/
	startEntity(decodeMode) {
		this.decodeMode = decodeMode;
		this.state = EntityDecoderState.EntityStart;
		this.result = 0;
		this.treeIndex = 0;
		this.excess = 1;
		this.consumed = 1;
		this.runConsumed = 0;
	}
	/**
	* Write an entity to the decoder. This can be called multiple times with partial entities.
	* If the entity is incomplete, the decoder will return -1.
	*
	* Mirrors the implementation of `getDecoder`, but with the ability to stop decoding if the
	* entity is incomplete, and resume when the next string is written.
	* @param input The string containing the entity (or a continuation of the entity).
	* @param offset The offset at which the entity begins. Should be 0 if this is not the first call.
	* @returns The number of characters that were consumed, or -1 if the entity is incomplete.
	*/
	write(input, offset) {
		switch (this.state) {
			case EntityDecoderState.EntityStart:
				if (input.charCodeAt(offset) === CharCodes.NUM) {
					this.state = EntityDecoderState.NumericStart;
					this.consumed += 1;
					return this.stateNumericStart(input, offset + 1);
				}
				this.state = EntityDecoderState.NamedEntity;
				return this.stateNamedEntity(input, offset);
			case EntityDecoderState.NumericStart: return this.stateNumericStart(input, offset);
			case EntityDecoderState.NumericDecimal: return this.stateNumericDecimal(input, offset);
			case EntityDecoderState.NumericHex: return this.stateNumericHex(input, offset);
			case EntityDecoderState.NamedEntity: return this.stateNamedEntity(input, offset);
		}
	}
	/**
	* Switches between the numeric decimal and hexadecimal states.
	*
	* Equivalent to the `Numeric character reference state` in the HTML spec.
	* @param input The string containing the entity (or a continuation of the entity).
	* @param offset The current offset.
	* @returns The number of characters that were consumed, or -1 if the entity is incomplete.
	*/
	stateNumericStart(input, offset) {
		if (offset >= input.length) return -1;
		if ((input.charCodeAt(offset) | TO_LOWER_BIT) === CharCodes.LOWER_X) {
			this.state = EntityDecoderState.NumericHex;
			this.consumed += 1;
			return this.stateNumericHex(input, offset + 1);
		}
		this.state = EntityDecoderState.NumericDecimal;
		return this.stateNumericDecimal(input, offset);
	}
	/**
	* Parses a hexadecimal numeric entity.
	*
	* Equivalent to the `Hexademical character reference state` in the HTML spec.
	* @param input The string containing the entity (or a continuation of the entity).
	* @param offset The current offset.
	* @returns The number of characters that were consumed, or -1 if the entity is incomplete.
	*/
	stateNumericHex(input, offset) {
		while (offset < input.length) {
			const char = input.charCodeAt(offset);
			if (isNumber(char) || isHexadecimalCharacter(char)) {
				const digit = char <= CharCodes.NINE ? char - CharCodes.ZERO : (char | TO_LOWER_BIT) - CharCodes.LOWER_A + 10;
				this.result = this.result * 16 + digit;
				this.consumed++;
				offset++;
			} else return this.emitNumericEntity(char, 3);
		}
		return -1;
	}
	/**
	* Parses a decimal numeric entity.
	*
	* Equivalent to the `Decimal character reference state` in the HTML spec.
	* @param input The string containing the entity (or a continuation of the entity).
	* @param offset The current offset.
	* @returns The number of characters that were consumed, or -1 if the entity is incomplete.
	*/
	stateNumericDecimal(input, offset) {
		while (offset < input.length) {
			const char = input.charCodeAt(offset);
			if (isNumber(char)) {
				this.result = this.result * 10 + (char - CharCodes.ZERO);
				this.consumed++;
				offset++;
			} else return this.emitNumericEntity(char, 2);
		}
		return -1;
	}
	/**
	* Validate and emit a numeric entity.
	*
	* Implements the logic from the `Hexademical character reference start
	* state` and `Numeric character reference end state` in the HTML spec.
	* @param lastCp The last code point of the entity. Used to see if the
	*               entity was terminated with a semicolon.
	* @param expectedLength The minimum number of characters that should be
	*                       consumed. Used to validate that at least one digit
	*                       was consumed.
	* @returns The number of characters that were consumed.
	*/
	emitNumericEntity(lastCp, expectedLength) {
		if (this.consumed <= expectedLength) {
			this.errors?.absenceOfDigitsInNumericCharacterReference(this.consumed);
			return 0;
		}
		if (lastCp === CharCodes.SEMI) this.consumed += 1;
		else if (this.decodeMode === DecodingMode.Strict) return 0;
		this.emitCodePoint(replaceCodePoint(this.result), this.consumed);
		if (this.errors) {
			if (lastCp !== CharCodes.SEMI) this.errors.missingSemicolonAfterCharacterReference();
			this.errors.validateNumericCharacterReference(this.result);
		}
		return this.consumed;
	}
	/**
	* Parses a named entity.
	*
	* Equivalent to the `Named character reference state` in the HTML spec.
	* @param input The string containing the entity (or a continuation of the entity).
	* @param offset The current offset.
	* @returns The number of characters that were consumed, or -1 if the entity is incomplete.
	*/
	stateNamedEntity(input, offset) {
		const { decodeTree } = this;
		let current = decodeTree[this.treeIndex];
		let valueLength = (current & BinTrieFlags.VALUE_LENGTH) >> 14;
		while (offset < input.length) {
			if (valueLength === 0 && (current & BinTrieFlags.FLAG13) !== 0) {
				const runLength = (current & BinTrieFlags.BRANCH_LENGTH) >> 7;
				if (this.runConsumed === 0) {
					const firstChar = current & BinTrieFlags.JUMP_TABLE;
					if (input.charCodeAt(offset) !== firstChar) return this.result === 0 ? 0 : this.emitNotTerminatedNamedEntity();
					offset++;
					this.excess++;
					this.runConsumed++;
				}
				while (this.runConsumed < runLength) {
					if (offset >= input.length) return -1;
					const charIndexInPacked = this.runConsumed - 1;
					const packedWord = decodeTree[this.treeIndex + 1 + (charIndexInPacked >> 1)];
					const expectedChar = charIndexInPacked % 2 === 0 ? packedWord & 255 : packedWord >> 8 & 255;
					if (input.charCodeAt(offset) !== expectedChar) {
						this.runConsumed = 0;
						return this.result === 0 ? 0 : this.emitNotTerminatedNamedEntity();
					}
					offset++;
					this.excess++;
					this.runConsumed++;
				}
				this.runConsumed = 0;
				this.treeIndex += 1 + (runLength >> 1);
				current = decodeTree[this.treeIndex];
				valueLength = (current & BinTrieFlags.VALUE_LENGTH) >> 14;
			}
			if (offset >= input.length) break;
			const char = input.charCodeAt(offset);
			if (char === CharCodes.SEMI && valueLength !== 0 && (current & BinTrieFlags.FLAG13) !== 0) return this.emitNamedEntityData(this.treeIndex, valueLength, this.consumed + this.excess);
			this.treeIndex = determineBranch(decodeTree, current, this.treeIndex + Math.max(1, valueLength), char);
			if (this.treeIndex < 0) return this.result === 0 || this.decodeMode === DecodingMode.Attribute && (valueLength === 0 || isEntityInAttributeInvalidEnd(char)) ? 0 : this.emitNotTerminatedNamedEntity();
			current = decodeTree[this.treeIndex];
			valueLength = (current & BinTrieFlags.VALUE_LENGTH) >> 14;
			if (valueLength !== 0) {
				if (char === CharCodes.SEMI) return this.emitNamedEntityData(this.treeIndex, valueLength, this.consumed + this.excess);
				if (this.decodeMode !== DecodingMode.Strict && (current & BinTrieFlags.FLAG13) === 0) {
					this.result = this.treeIndex;
					this.consumed += this.excess;
					this.excess = 0;
				}
			}
			offset++;
			this.excess++;
		}
		return -1;
	}
	/**
	* Emit a named entity that was not terminated with a semicolon.
	* @returns The number of characters consumed.
	*/
	emitNotTerminatedNamedEntity() {
		const { result, decodeTree } = this;
		const valueLength = (decodeTree[result] & BinTrieFlags.VALUE_LENGTH) >> 14;
		this.emitNamedEntityData(result, valueLength, this.consumed);
		this.errors?.missingSemicolonAfterCharacterReference();
		return this.consumed;
	}
	/**
	* Emit a named entity.
	* @param result The index of the entity in the decode tree.
	* @param valueLength The number of bytes in the entity.
	* @param consumed The number of characters consumed.
	* @returns The number of characters consumed.
	*/
	emitNamedEntityData(result, valueLength, consumed) {
		const { decodeTree } = this;
		this.emitCodePoint(valueLength === 1 ? decodeTree[result] & ~(BinTrieFlags.VALUE_LENGTH | BinTrieFlags.FLAG13) : decodeTree[result + 1], consumed);
		if (valueLength === 3) this.emitCodePoint(decodeTree[result + 2], consumed);
		return consumed;
	}
	/**
	* Signal to the parser that the end of the input was reached.
	*
	* Remaining data will be emitted and relevant errors will be produced.
	* @returns The number of characters consumed.
	*/
	end() {
		switch (this.state) {
			case EntityDecoderState.NamedEntity: return this.result !== 0 && (this.decodeMode !== DecodingMode.Attribute || this.result === this.treeIndex) ? this.emitNotTerminatedNamedEntity() : 0;
			case EntityDecoderState.NumericDecimal: return this.emitNumericEntity(0, 2);
			case EntityDecoderState.NumericHex: return this.emitNumericEntity(0, 3);
			case EntityDecoderState.NumericStart:
				this.errors?.absenceOfDigitsInNumericCharacterReference(this.consumed);
				return 0;
			case EntityDecoderState.EntityStart: return 0;
		}
	}
};
/**
* Determines the branch of the current node that is taken given the current
* character. This function is used to traverse the trie.
* @param decodeTree The trie.
* @param current The current node.
* @param nodeIndex Index immediately after the current node header.
* @param char The current character.
* @returns The index of the next node, or -1 if no branch is taken.
*/
function determineBranch(decodeTree, current, nodeIndex, char) {
	const branchCount = (current & BinTrieFlags.BRANCH_LENGTH) >> 7;
	const jumpOffset = current & BinTrieFlags.JUMP_TABLE;
	if (branchCount === 0) return jumpOffset !== 0 && char === jumpOffset ? nodeIndex : -1;
	if (jumpOffset) {
		const value = char - jumpOffset;
		return value < 0 || value >= branchCount ? -1 : decodeTree[nodeIndex + value] - 1;
	}
	const packedKeySlots = branchCount + 1 >> 1;
	let lo = 0;
	let hi = branchCount - 1;
	while (lo <= hi) {
		const mid = lo + hi >>> 1;
		const midKey = decodeTree[nodeIndex + (mid >> 1)] >> (mid & 1) * 8 & 255;
		if (midKey < char) lo = mid + 1;
		else if (midKey > char) hi = mid - 1;
		else return decodeTree[nodeIndex + packedKeySlots + mid];
	}
	return -1;
}
//#endregion
//#region node_modules/.pnpm/parse5@8.0.1/node_modules/parse5/dist/common/html.js
/** All valid namespaces in HTML. */
var NS;
(function(NS) {
	NS["HTML"] = "http://www.w3.org/1999/xhtml";
	NS["MATHML"] = "http://www.w3.org/1998/Math/MathML";
	NS["SVG"] = "http://www.w3.org/2000/svg";
	NS["XLINK"] = "http://www.w3.org/1999/xlink";
	NS["XML"] = "http://www.w3.org/XML/1998/namespace";
	NS["XMLNS"] = "http://www.w3.org/2000/xmlns/";
})(NS || (NS = {}));
var ATTRS;
(function(ATTRS) {
	ATTRS["TYPE"] = "type";
	ATTRS["ACTION"] = "action";
	ATTRS["ENCODING"] = "encoding";
	ATTRS["PROMPT"] = "prompt";
	ATTRS["NAME"] = "name";
	ATTRS["COLOR"] = "color";
	ATTRS["FACE"] = "face";
	ATTRS["SIZE"] = "size";
})(ATTRS || (ATTRS = {}));
/**
* The mode of the document.
*
* @see {@link https://dom.spec.whatwg.org/#concept-document-limited-quirks}
*/
var DOCUMENT_MODE;
(function(DOCUMENT_MODE) {
	DOCUMENT_MODE["NO_QUIRKS"] = "no-quirks";
	DOCUMENT_MODE["QUIRKS"] = "quirks";
	DOCUMENT_MODE["LIMITED_QUIRKS"] = "limited-quirks";
})(DOCUMENT_MODE || (DOCUMENT_MODE = {}));
var TAG_NAMES;
(function(TAG_NAMES) {
	TAG_NAMES["A"] = "a";
	TAG_NAMES["ADDRESS"] = "address";
	TAG_NAMES["ANNOTATION_XML"] = "annotation-xml";
	TAG_NAMES["APPLET"] = "applet";
	TAG_NAMES["AREA"] = "area";
	TAG_NAMES["ARTICLE"] = "article";
	TAG_NAMES["ASIDE"] = "aside";
	TAG_NAMES["B"] = "b";
	TAG_NAMES["BASE"] = "base";
	TAG_NAMES["BASEFONT"] = "basefont";
	TAG_NAMES["BGSOUND"] = "bgsound";
	TAG_NAMES["BIG"] = "big";
	TAG_NAMES["BLOCKQUOTE"] = "blockquote";
	TAG_NAMES["BODY"] = "body";
	TAG_NAMES["BR"] = "br";
	TAG_NAMES["BUTTON"] = "button";
	TAG_NAMES["CAPTION"] = "caption";
	TAG_NAMES["CENTER"] = "center";
	TAG_NAMES["CODE"] = "code";
	TAG_NAMES["COL"] = "col";
	TAG_NAMES["COLGROUP"] = "colgroup";
	TAG_NAMES["DD"] = "dd";
	TAG_NAMES["DESC"] = "desc";
	TAG_NAMES["DETAILS"] = "details";
	TAG_NAMES["DIALOG"] = "dialog";
	TAG_NAMES["DIR"] = "dir";
	TAG_NAMES["DIV"] = "div";
	TAG_NAMES["DL"] = "dl";
	TAG_NAMES["DT"] = "dt";
	TAG_NAMES["EM"] = "em";
	TAG_NAMES["EMBED"] = "embed";
	TAG_NAMES["FIELDSET"] = "fieldset";
	TAG_NAMES["FIGCAPTION"] = "figcaption";
	TAG_NAMES["FIGURE"] = "figure";
	TAG_NAMES["FONT"] = "font";
	TAG_NAMES["FOOTER"] = "footer";
	TAG_NAMES["FOREIGN_OBJECT"] = "foreignObject";
	TAG_NAMES["FORM"] = "form";
	TAG_NAMES["FRAME"] = "frame";
	TAG_NAMES["FRAMESET"] = "frameset";
	TAG_NAMES["H1"] = "h1";
	TAG_NAMES["H2"] = "h2";
	TAG_NAMES["H3"] = "h3";
	TAG_NAMES["H4"] = "h4";
	TAG_NAMES["H5"] = "h5";
	TAG_NAMES["H6"] = "h6";
	TAG_NAMES["HEAD"] = "head";
	TAG_NAMES["HEADER"] = "header";
	TAG_NAMES["HGROUP"] = "hgroup";
	TAG_NAMES["HR"] = "hr";
	TAG_NAMES["HTML"] = "html";
	TAG_NAMES["I"] = "i";
	TAG_NAMES["IMG"] = "img";
	TAG_NAMES["IMAGE"] = "image";
	TAG_NAMES["INPUT"] = "input";
	TAG_NAMES["IFRAME"] = "iframe";
	TAG_NAMES["KEYGEN"] = "keygen";
	TAG_NAMES["LABEL"] = "label";
	TAG_NAMES["LI"] = "li";
	TAG_NAMES["LINK"] = "link";
	TAG_NAMES["LISTING"] = "listing";
	TAG_NAMES["MAIN"] = "main";
	TAG_NAMES["MALIGNMARK"] = "malignmark";
	TAG_NAMES["MARQUEE"] = "marquee";
	TAG_NAMES["MATH"] = "math";
	TAG_NAMES["MENU"] = "menu";
	TAG_NAMES["META"] = "meta";
	TAG_NAMES["MGLYPH"] = "mglyph";
	TAG_NAMES["MI"] = "mi";
	TAG_NAMES["MO"] = "mo";
	TAG_NAMES["MN"] = "mn";
	TAG_NAMES["MS"] = "ms";
	TAG_NAMES["MTEXT"] = "mtext";
	TAG_NAMES["NAV"] = "nav";
	TAG_NAMES["NOBR"] = "nobr";
	TAG_NAMES["NOFRAMES"] = "noframes";
	TAG_NAMES["NOEMBED"] = "noembed";
	TAG_NAMES["NOSCRIPT"] = "noscript";
	TAG_NAMES["OBJECT"] = "object";
	TAG_NAMES["OL"] = "ol";
	TAG_NAMES["OPTGROUP"] = "optgroup";
	TAG_NAMES["OPTION"] = "option";
	TAG_NAMES["P"] = "p";
	TAG_NAMES["PARAM"] = "param";
	TAG_NAMES["PLAINTEXT"] = "plaintext";
	TAG_NAMES["PRE"] = "pre";
	TAG_NAMES["RB"] = "rb";
	TAG_NAMES["RP"] = "rp";
	TAG_NAMES["RT"] = "rt";
	TAG_NAMES["RTC"] = "rtc";
	TAG_NAMES["RUBY"] = "ruby";
	TAG_NAMES["S"] = "s";
	TAG_NAMES["SCRIPT"] = "script";
	TAG_NAMES["SEARCH"] = "search";
	TAG_NAMES["SECTION"] = "section";
	TAG_NAMES["SELECT"] = "select";
	TAG_NAMES["SOURCE"] = "source";
	TAG_NAMES["SMALL"] = "small";
	TAG_NAMES["SPAN"] = "span";
	TAG_NAMES["STRIKE"] = "strike";
	TAG_NAMES["STRONG"] = "strong";
	TAG_NAMES["STYLE"] = "style";
	TAG_NAMES["SUB"] = "sub";
	TAG_NAMES["SUMMARY"] = "summary";
	TAG_NAMES["SUP"] = "sup";
	TAG_NAMES["TABLE"] = "table";
	TAG_NAMES["TBODY"] = "tbody";
	TAG_NAMES["TEMPLATE"] = "template";
	TAG_NAMES["TEXTAREA"] = "textarea";
	TAG_NAMES["TFOOT"] = "tfoot";
	TAG_NAMES["TD"] = "td";
	TAG_NAMES["TH"] = "th";
	TAG_NAMES["THEAD"] = "thead";
	TAG_NAMES["TITLE"] = "title";
	TAG_NAMES["TR"] = "tr";
	TAG_NAMES["TRACK"] = "track";
	TAG_NAMES["TT"] = "tt";
	TAG_NAMES["U"] = "u";
	TAG_NAMES["UL"] = "ul";
	TAG_NAMES["SVG"] = "svg";
	TAG_NAMES["VAR"] = "var";
	TAG_NAMES["WBR"] = "wbr";
	TAG_NAMES["XMP"] = "xmp";
})(TAG_NAMES || (TAG_NAMES = {}));
/**
* Tag IDs are numeric IDs for known tag names.
*
* We use tag IDs to improve the performance of tag name comparisons.
*/
var TAG_ID;
(function(TAG_ID) {
	TAG_ID[TAG_ID["UNKNOWN"] = 0] = "UNKNOWN";
	TAG_ID[TAG_ID["A"] = 1] = "A";
	TAG_ID[TAG_ID["ADDRESS"] = 2] = "ADDRESS";
	TAG_ID[TAG_ID["ANNOTATION_XML"] = 3] = "ANNOTATION_XML";
	TAG_ID[TAG_ID["APPLET"] = 4] = "APPLET";
	TAG_ID[TAG_ID["AREA"] = 5] = "AREA";
	TAG_ID[TAG_ID["ARTICLE"] = 6] = "ARTICLE";
	TAG_ID[TAG_ID["ASIDE"] = 7] = "ASIDE";
	TAG_ID[TAG_ID["B"] = 8] = "B";
	TAG_ID[TAG_ID["BASE"] = 9] = "BASE";
	TAG_ID[TAG_ID["BASEFONT"] = 10] = "BASEFONT";
	TAG_ID[TAG_ID["BGSOUND"] = 11] = "BGSOUND";
	TAG_ID[TAG_ID["BIG"] = 12] = "BIG";
	TAG_ID[TAG_ID["BLOCKQUOTE"] = 13] = "BLOCKQUOTE";
	TAG_ID[TAG_ID["BODY"] = 14] = "BODY";
	TAG_ID[TAG_ID["BR"] = 15] = "BR";
	TAG_ID[TAG_ID["BUTTON"] = 16] = "BUTTON";
	TAG_ID[TAG_ID["CAPTION"] = 17] = "CAPTION";
	TAG_ID[TAG_ID["CENTER"] = 18] = "CENTER";
	TAG_ID[TAG_ID["CODE"] = 19] = "CODE";
	TAG_ID[TAG_ID["COL"] = 20] = "COL";
	TAG_ID[TAG_ID["COLGROUP"] = 21] = "COLGROUP";
	TAG_ID[TAG_ID["DD"] = 22] = "DD";
	TAG_ID[TAG_ID["DESC"] = 23] = "DESC";
	TAG_ID[TAG_ID["DETAILS"] = 24] = "DETAILS";
	TAG_ID[TAG_ID["DIALOG"] = 25] = "DIALOG";
	TAG_ID[TAG_ID["DIR"] = 26] = "DIR";
	TAG_ID[TAG_ID["DIV"] = 27] = "DIV";
	TAG_ID[TAG_ID["DL"] = 28] = "DL";
	TAG_ID[TAG_ID["DT"] = 29] = "DT";
	TAG_ID[TAG_ID["EM"] = 30] = "EM";
	TAG_ID[TAG_ID["EMBED"] = 31] = "EMBED";
	TAG_ID[TAG_ID["FIELDSET"] = 32] = "FIELDSET";
	TAG_ID[TAG_ID["FIGCAPTION"] = 33] = "FIGCAPTION";
	TAG_ID[TAG_ID["FIGURE"] = 34] = "FIGURE";
	TAG_ID[TAG_ID["FONT"] = 35] = "FONT";
	TAG_ID[TAG_ID["FOOTER"] = 36] = "FOOTER";
	TAG_ID[TAG_ID["FOREIGN_OBJECT"] = 37] = "FOREIGN_OBJECT";
	TAG_ID[TAG_ID["FORM"] = 38] = "FORM";
	TAG_ID[TAG_ID["FRAME"] = 39] = "FRAME";
	TAG_ID[TAG_ID["FRAMESET"] = 40] = "FRAMESET";
	TAG_ID[TAG_ID["H1"] = 41] = "H1";
	TAG_ID[TAG_ID["H2"] = 42] = "H2";
	TAG_ID[TAG_ID["H3"] = 43] = "H3";
	TAG_ID[TAG_ID["H4"] = 44] = "H4";
	TAG_ID[TAG_ID["H5"] = 45] = "H5";
	TAG_ID[TAG_ID["H6"] = 46] = "H6";
	TAG_ID[TAG_ID["HEAD"] = 47] = "HEAD";
	TAG_ID[TAG_ID["HEADER"] = 48] = "HEADER";
	TAG_ID[TAG_ID["HGROUP"] = 49] = "HGROUP";
	TAG_ID[TAG_ID["HR"] = 50] = "HR";
	TAG_ID[TAG_ID["HTML"] = 51] = "HTML";
	TAG_ID[TAG_ID["I"] = 52] = "I";
	TAG_ID[TAG_ID["IMG"] = 53] = "IMG";
	TAG_ID[TAG_ID["IMAGE"] = 54] = "IMAGE";
	TAG_ID[TAG_ID["INPUT"] = 55] = "INPUT";
	TAG_ID[TAG_ID["IFRAME"] = 56] = "IFRAME";
	TAG_ID[TAG_ID["KEYGEN"] = 57] = "KEYGEN";
	TAG_ID[TAG_ID["LABEL"] = 58] = "LABEL";
	TAG_ID[TAG_ID["LI"] = 59] = "LI";
	TAG_ID[TAG_ID["LINK"] = 60] = "LINK";
	TAG_ID[TAG_ID["LISTING"] = 61] = "LISTING";
	TAG_ID[TAG_ID["MAIN"] = 62] = "MAIN";
	TAG_ID[TAG_ID["MALIGNMARK"] = 63] = "MALIGNMARK";
	TAG_ID[TAG_ID["MARQUEE"] = 64] = "MARQUEE";
	TAG_ID[TAG_ID["MATH"] = 65] = "MATH";
	TAG_ID[TAG_ID["MENU"] = 66] = "MENU";
	TAG_ID[TAG_ID["META"] = 67] = "META";
	TAG_ID[TAG_ID["MGLYPH"] = 68] = "MGLYPH";
	TAG_ID[TAG_ID["MI"] = 69] = "MI";
	TAG_ID[TAG_ID["MO"] = 70] = "MO";
	TAG_ID[TAG_ID["MN"] = 71] = "MN";
	TAG_ID[TAG_ID["MS"] = 72] = "MS";
	TAG_ID[TAG_ID["MTEXT"] = 73] = "MTEXT";
	TAG_ID[TAG_ID["NAV"] = 74] = "NAV";
	TAG_ID[TAG_ID["NOBR"] = 75] = "NOBR";
	TAG_ID[TAG_ID["NOFRAMES"] = 76] = "NOFRAMES";
	TAG_ID[TAG_ID["NOEMBED"] = 77] = "NOEMBED";
	TAG_ID[TAG_ID["NOSCRIPT"] = 78] = "NOSCRIPT";
	TAG_ID[TAG_ID["OBJECT"] = 79] = "OBJECT";
	TAG_ID[TAG_ID["OL"] = 80] = "OL";
	TAG_ID[TAG_ID["OPTGROUP"] = 81] = "OPTGROUP";
	TAG_ID[TAG_ID["OPTION"] = 82] = "OPTION";
	TAG_ID[TAG_ID["P"] = 83] = "P";
	TAG_ID[TAG_ID["PARAM"] = 84] = "PARAM";
	TAG_ID[TAG_ID["PLAINTEXT"] = 85] = "PLAINTEXT";
	TAG_ID[TAG_ID["PRE"] = 86] = "PRE";
	TAG_ID[TAG_ID["RB"] = 87] = "RB";
	TAG_ID[TAG_ID["RP"] = 88] = "RP";
	TAG_ID[TAG_ID["RT"] = 89] = "RT";
	TAG_ID[TAG_ID["RTC"] = 90] = "RTC";
	TAG_ID[TAG_ID["RUBY"] = 91] = "RUBY";
	TAG_ID[TAG_ID["S"] = 92] = "S";
	TAG_ID[TAG_ID["SCRIPT"] = 93] = "SCRIPT";
	TAG_ID[TAG_ID["SEARCH"] = 94] = "SEARCH";
	TAG_ID[TAG_ID["SECTION"] = 95] = "SECTION";
	TAG_ID[TAG_ID["SELECT"] = 96] = "SELECT";
	TAG_ID[TAG_ID["SOURCE"] = 97] = "SOURCE";
	TAG_ID[TAG_ID["SMALL"] = 98] = "SMALL";
	TAG_ID[TAG_ID["SPAN"] = 99] = "SPAN";
	TAG_ID[TAG_ID["STRIKE"] = 100] = "STRIKE";
	TAG_ID[TAG_ID["STRONG"] = 101] = "STRONG";
	TAG_ID[TAG_ID["STYLE"] = 102] = "STYLE";
	TAG_ID[TAG_ID["SUB"] = 103] = "SUB";
	TAG_ID[TAG_ID["SUMMARY"] = 104] = "SUMMARY";
	TAG_ID[TAG_ID["SUP"] = 105] = "SUP";
	TAG_ID[TAG_ID["TABLE"] = 106] = "TABLE";
	TAG_ID[TAG_ID["TBODY"] = 107] = "TBODY";
	TAG_ID[TAG_ID["TEMPLATE"] = 108] = "TEMPLATE";
	TAG_ID[TAG_ID["TEXTAREA"] = 109] = "TEXTAREA";
	TAG_ID[TAG_ID["TFOOT"] = 110] = "TFOOT";
	TAG_ID[TAG_ID["TD"] = 111] = "TD";
	TAG_ID[TAG_ID["TH"] = 112] = "TH";
	TAG_ID[TAG_ID["THEAD"] = 113] = "THEAD";
	TAG_ID[TAG_ID["TITLE"] = 114] = "TITLE";
	TAG_ID[TAG_ID["TR"] = 115] = "TR";
	TAG_ID[TAG_ID["TRACK"] = 116] = "TRACK";
	TAG_ID[TAG_ID["TT"] = 117] = "TT";
	TAG_ID[TAG_ID["U"] = 118] = "U";
	TAG_ID[TAG_ID["UL"] = 119] = "UL";
	TAG_ID[TAG_ID["SVG"] = 120] = "SVG";
	TAG_ID[TAG_ID["VAR"] = 121] = "VAR";
	TAG_ID[TAG_ID["WBR"] = 122] = "WBR";
	TAG_ID[TAG_ID["XMP"] = 123] = "XMP";
})(TAG_ID || (TAG_ID = {}));
const TAG_NAME_TO_ID = /* @__PURE__ */ new Map([
	[TAG_NAMES.A, TAG_ID.A],
	[TAG_NAMES.ADDRESS, TAG_ID.ADDRESS],
	[TAG_NAMES.ANNOTATION_XML, TAG_ID.ANNOTATION_XML],
	[TAG_NAMES.APPLET, TAG_ID.APPLET],
	[TAG_NAMES.AREA, TAG_ID.AREA],
	[TAG_NAMES.ARTICLE, TAG_ID.ARTICLE],
	[TAG_NAMES.ASIDE, TAG_ID.ASIDE],
	[TAG_NAMES.B, TAG_ID.B],
	[TAG_NAMES.BASE, TAG_ID.BASE],
	[TAG_NAMES.BASEFONT, TAG_ID.BASEFONT],
	[TAG_NAMES.BGSOUND, TAG_ID.BGSOUND],
	[TAG_NAMES.BIG, TAG_ID.BIG],
	[TAG_NAMES.BLOCKQUOTE, TAG_ID.BLOCKQUOTE],
	[TAG_NAMES.BODY, TAG_ID.BODY],
	[TAG_NAMES.BR, TAG_ID.BR],
	[TAG_NAMES.BUTTON, TAG_ID.BUTTON],
	[TAG_NAMES.CAPTION, TAG_ID.CAPTION],
	[TAG_NAMES.CENTER, TAG_ID.CENTER],
	[TAG_NAMES.CODE, TAG_ID.CODE],
	[TAG_NAMES.COL, TAG_ID.COL],
	[TAG_NAMES.COLGROUP, TAG_ID.COLGROUP],
	[TAG_NAMES.DD, TAG_ID.DD],
	[TAG_NAMES.DESC, TAG_ID.DESC],
	[TAG_NAMES.DETAILS, TAG_ID.DETAILS],
	[TAG_NAMES.DIALOG, TAG_ID.DIALOG],
	[TAG_NAMES.DIR, TAG_ID.DIR],
	[TAG_NAMES.DIV, TAG_ID.DIV],
	[TAG_NAMES.DL, TAG_ID.DL],
	[TAG_NAMES.DT, TAG_ID.DT],
	[TAG_NAMES.EM, TAG_ID.EM],
	[TAG_NAMES.EMBED, TAG_ID.EMBED],
	[TAG_NAMES.FIELDSET, TAG_ID.FIELDSET],
	[TAG_NAMES.FIGCAPTION, TAG_ID.FIGCAPTION],
	[TAG_NAMES.FIGURE, TAG_ID.FIGURE],
	[TAG_NAMES.FONT, TAG_ID.FONT],
	[TAG_NAMES.FOOTER, TAG_ID.FOOTER],
	[TAG_NAMES.FOREIGN_OBJECT, TAG_ID.FOREIGN_OBJECT],
	[TAG_NAMES.FORM, TAG_ID.FORM],
	[TAG_NAMES.FRAME, TAG_ID.FRAME],
	[TAG_NAMES.FRAMESET, TAG_ID.FRAMESET],
	[TAG_NAMES.H1, TAG_ID.H1],
	[TAG_NAMES.H2, TAG_ID.H2],
	[TAG_NAMES.H3, TAG_ID.H3],
	[TAG_NAMES.H4, TAG_ID.H4],
	[TAG_NAMES.H5, TAG_ID.H5],
	[TAG_NAMES.H6, TAG_ID.H6],
	[TAG_NAMES.HEAD, TAG_ID.HEAD],
	[TAG_NAMES.HEADER, TAG_ID.HEADER],
	[TAG_NAMES.HGROUP, TAG_ID.HGROUP],
	[TAG_NAMES.HR, TAG_ID.HR],
	[TAG_NAMES.HTML, TAG_ID.HTML],
	[TAG_NAMES.I, TAG_ID.I],
	[TAG_NAMES.IMG, TAG_ID.IMG],
	[TAG_NAMES.IMAGE, TAG_ID.IMAGE],
	[TAG_NAMES.INPUT, TAG_ID.INPUT],
	[TAG_NAMES.IFRAME, TAG_ID.IFRAME],
	[TAG_NAMES.KEYGEN, TAG_ID.KEYGEN],
	[TAG_NAMES.LABEL, TAG_ID.LABEL],
	[TAG_NAMES.LI, TAG_ID.LI],
	[TAG_NAMES.LINK, TAG_ID.LINK],
	[TAG_NAMES.LISTING, TAG_ID.LISTING],
	[TAG_NAMES.MAIN, TAG_ID.MAIN],
	[TAG_NAMES.MALIGNMARK, TAG_ID.MALIGNMARK],
	[TAG_NAMES.MARQUEE, TAG_ID.MARQUEE],
	[TAG_NAMES.MATH, TAG_ID.MATH],
	[TAG_NAMES.MENU, TAG_ID.MENU],
	[TAG_NAMES.META, TAG_ID.META],
	[TAG_NAMES.MGLYPH, TAG_ID.MGLYPH],
	[TAG_NAMES.MI, TAG_ID.MI],
	[TAG_NAMES.MO, TAG_ID.MO],
	[TAG_NAMES.MN, TAG_ID.MN],
	[TAG_NAMES.MS, TAG_ID.MS],
	[TAG_NAMES.MTEXT, TAG_ID.MTEXT],
	[TAG_NAMES.NAV, TAG_ID.NAV],
	[TAG_NAMES.NOBR, TAG_ID.NOBR],
	[TAG_NAMES.NOFRAMES, TAG_ID.NOFRAMES],
	[TAG_NAMES.NOEMBED, TAG_ID.NOEMBED],
	[TAG_NAMES.NOSCRIPT, TAG_ID.NOSCRIPT],
	[TAG_NAMES.OBJECT, TAG_ID.OBJECT],
	[TAG_NAMES.OL, TAG_ID.OL],
	[TAG_NAMES.OPTGROUP, TAG_ID.OPTGROUP],
	[TAG_NAMES.OPTION, TAG_ID.OPTION],
	[TAG_NAMES.P, TAG_ID.P],
	[TAG_NAMES.PARAM, TAG_ID.PARAM],
	[TAG_NAMES.PLAINTEXT, TAG_ID.PLAINTEXT],
	[TAG_NAMES.PRE, TAG_ID.PRE],
	[TAG_NAMES.RB, TAG_ID.RB],
	[TAG_NAMES.RP, TAG_ID.RP],
	[TAG_NAMES.RT, TAG_ID.RT],
	[TAG_NAMES.RTC, TAG_ID.RTC],
	[TAG_NAMES.RUBY, TAG_ID.RUBY],
	[TAG_NAMES.S, TAG_ID.S],
	[TAG_NAMES.SCRIPT, TAG_ID.SCRIPT],
	[TAG_NAMES.SEARCH, TAG_ID.SEARCH],
	[TAG_NAMES.SECTION, TAG_ID.SECTION],
	[TAG_NAMES.SELECT, TAG_ID.SELECT],
	[TAG_NAMES.SOURCE, TAG_ID.SOURCE],
	[TAG_NAMES.SMALL, TAG_ID.SMALL],
	[TAG_NAMES.SPAN, TAG_ID.SPAN],
	[TAG_NAMES.STRIKE, TAG_ID.STRIKE],
	[TAG_NAMES.STRONG, TAG_ID.STRONG],
	[TAG_NAMES.STYLE, TAG_ID.STYLE],
	[TAG_NAMES.SUB, TAG_ID.SUB],
	[TAG_NAMES.SUMMARY, TAG_ID.SUMMARY],
	[TAG_NAMES.SUP, TAG_ID.SUP],
	[TAG_NAMES.TABLE, TAG_ID.TABLE],
	[TAG_NAMES.TBODY, TAG_ID.TBODY],
	[TAG_NAMES.TEMPLATE, TAG_ID.TEMPLATE],
	[TAG_NAMES.TEXTAREA, TAG_ID.TEXTAREA],
	[TAG_NAMES.TFOOT, TAG_ID.TFOOT],
	[TAG_NAMES.TD, TAG_ID.TD],
	[TAG_NAMES.TH, TAG_ID.TH],
	[TAG_NAMES.THEAD, TAG_ID.THEAD],
	[TAG_NAMES.TITLE, TAG_ID.TITLE],
	[TAG_NAMES.TR, TAG_ID.TR],
	[TAG_NAMES.TRACK, TAG_ID.TRACK],
	[TAG_NAMES.TT, TAG_ID.TT],
	[TAG_NAMES.U, TAG_ID.U],
	[TAG_NAMES.UL, TAG_ID.UL],
	[TAG_NAMES.SVG, TAG_ID.SVG],
	[TAG_NAMES.VAR, TAG_ID.VAR],
	[TAG_NAMES.WBR, TAG_ID.WBR],
	[TAG_NAMES.XMP, TAG_ID.XMP]
]);
function getTagID(tagName) {
	var _a;
	return (_a = TAG_NAME_TO_ID.get(tagName)) !== null && _a !== void 0 ? _a : TAG_ID.UNKNOWN;
}
const $ = TAG_ID;
const SPECIAL_ELEMENTS = {
	[NS.HTML]: /* @__PURE__ */ new Set([
		$.ADDRESS,
		$.APPLET,
		$.AREA,
		$.ARTICLE,
		$.ASIDE,
		$.BASE,
		$.BASEFONT,
		$.BGSOUND,
		$.BLOCKQUOTE,
		$.BODY,
		$.BR,
		$.BUTTON,
		$.CAPTION,
		$.CENTER,
		$.COL,
		$.COLGROUP,
		$.DD,
		$.DETAILS,
		$.DIR,
		$.DIV,
		$.DL,
		$.DT,
		$.EMBED,
		$.FIELDSET,
		$.FIGCAPTION,
		$.FIGURE,
		$.FOOTER,
		$.FORM,
		$.FRAME,
		$.FRAMESET,
		$.H1,
		$.H2,
		$.H3,
		$.H4,
		$.H5,
		$.H6,
		$.HEAD,
		$.HEADER,
		$.HGROUP,
		$.HR,
		$.HTML,
		$.IFRAME,
		$.IMG,
		$.INPUT,
		$.LI,
		$.LINK,
		$.LISTING,
		$.MAIN,
		$.MARQUEE,
		$.MENU,
		$.META,
		$.NAV,
		$.NOEMBED,
		$.NOFRAMES,
		$.NOSCRIPT,
		$.OBJECT,
		$.OL,
		$.P,
		$.PARAM,
		$.PLAINTEXT,
		$.PRE,
		$.SCRIPT,
		$.SECTION,
		$.SELECT,
		$.SOURCE,
		$.STYLE,
		$.SUMMARY,
		$.TABLE,
		$.TBODY,
		$.TD,
		$.TEMPLATE,
		$.TEXTAREA,
		$.TFOOT,
		$.TH,
		$.THEAD,
		$.TITLE,
		$.TR,
		$.TRACK,
		$.UL,
		$.WBR,
		$.XMP
	]),
	[NS.MATHML]: /* @__PURE__ */ new Set([
		$.MI,
		$.MO,
		$.MN,
		$.MS,
		$.MTEXT,
		$.ANNOTATION_XML
	]),
	[NS.SVG]: /* @__PURE__ */ new Set([
		$.TITLE,
		$.FOREIGN_OBJECT,
		$.DESC
	]),
	[NS.XLINK]: /* @__PURE__ */ new Set(),
	[NS.XML]: /* @__PURE__ */ new Set(),
	[NS.XMLNS]: /* @__PURE__ */ new Set()
};
const NUMBERED_HEADERS = /* @__PURE__ */ new Set([
	$.H1,
	$.H2,
	$.H3,
	$.H4,
	$.H5,
	$.H6
]);
TAG_NAMES.STYLE, TAG_NAMES.SCRIPT, TAG_NAMES.XMP, TAG_NAMES.IFRAME, TAG_NAMES.NOEMBED, TAG_NAMES.NOFRAMES, TAG_NAMES.PLAINTEXT;
//#endregion
//#region node_modules/.pnpm/parse5@8.0.1/node_modules/parse5/dist/tokenizer/index.js
var State;
(function(State) {
	State[State["DATA"] = 0] = "DATA";
	State[State["RCDATA"] = 1] = "RCDATA";
	State[State["RAWTEXT"] = 2] = "RAWTEXT";
	State[State["SCRIPT_DATA"] = 3] = "SCRIPT_DATA";
	State[State["PLAINTEXT"] = 4] = "PLAINTEXT";
	State[State["TAG_OPEN"] = 5] = "TAG_OPEN";
	State[State["END_TAG_OPEN"] = 6] = "END_TAG_OPEN";
	State[State["TAG_NAME"] = 7] = "TAG_NAME";
	State[State["RCDATA_LESS_THAN_SIGN"] = 8] = "RCDATA_LESS_THAN_SIGN";
	State[State["RCDATA_END_TAG_OPEN"] = 9] = "RCDATA_END_TAG_OPEN";
	State[State["RCDATA_END_TAG_NAME"] = 10] = "RCDATA_END_TAG_NAME";
	State[State["RAWTEXT_LESS_THAN_SIGN"] = 11] = "RAWTEXT_LESS_THAN_SIGN";
	State[State["RAWTEXT_END_TAG_OPEN"] = 12] = "RAWTEXT_END_TAG_OPEN";
	State[State["RAWTEXT_END_TAG_NAME"] = 13] = "RAWTEXT_END_TAG_NAME";
	State[State["SCRIPT_DATA_LESS_THAN_SIGN"] = 14] = "SCRIPT_DATA_LESS_THAN_SIGN";
	State[State["SCRIPT_DATA_END_TAG_OPEN"] = 15] = "SCRIPT_DATA_END_TAG_OPEN";
	State[State["SCRIPT_DATA_END_TAG_NAME"] = 16] = "SCRIPT_DATA_END_TAG_NAME";
	State[State["SCRIPT_DATA_ESCAPE_START"] = 17] = "SCRIPT_DATA_ESCAPE_START";
	State[State["SCRIPT_DATA_ESCAPE_START_DASH"] = 18] = "SCRIPT_DATA_ESCAPE_START_DASH";
	State[State["SCRIPT_DATA_ESCAPED"] = 19] = "SCRIPT_DATA_ESCAPED";
	State[State["SCRIPT_DATA_ESCAPED_DASH"] = 20] = "SCRIPT_DATA_ESCAPED_DASH";
	State[State["SCRIPT_DATA_ESCAPED_DASH_DASH"] = 21] = "SCRIPT_DATA_ESCAPED_DASH_DASH";
	State[State["SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN"] = 22] = "SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN";
	State[State["SCRIPT_DATA_ESCAPED_END_TAG_OPEN"] = 23] = "SCRIPT_DATA_ESCAPED_END_TAG_OPEN";
	State[State["SCRIPT_DATA_ESCAPED_END_TAG_NAME"] = 24] = "SCRIPT_DATA_ESCAPED_END_TAG_NAME";
	State[State["SCRIPT_DATA_DOUBLE_ESCAPE_START"] = 25] = "SCRIPT_DATA_DOUBLE_ESCAPE_START";
	State[State["SCRIPT_DATA_DOUBLE_ESCAPED"] = 26] = "SCRIPT_DATA_DOUBLE_ESCAPED";
	State[State["SCRIPT_DATA_DOUBLE_ESCAPED_DASH"] = 27] = "SCRIPT_DATA_DOUBLE_ESCAPED_DASH";
	State[State["SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH"] = 28] = "SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH";
	State[State["SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN"] = 29] = "SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN";
	State[State["SCRIPT_DATA_DOUBLE_ESCAPE_END"] = 30] = "SCRIPT_DATA_DOUBLE_ESCAPE_END";
	State[State["BEFORE_ATTRIBUTE_NAME"] = 31] = "BEFORE_ATTRIBUTE_NAME";
	State[State["ATTRIBUTE_NAME"] = 32] = "ATTRIBUTE_NAME";
	State[State["AFTER_ATTRIBUTE_NAME"] = 33] = "AFTER_ATTRIBUTE_NAME";
	State[State["BEFORE_ATTRIBUTE_VALUE"] = 34] = "BEFORE_ATTRIBUTE_VALUE";
	State[State["ATTRIBUTE_VALUE_DOUBLE_QUOTED"] = 35] = "ATTRIBUTE_VALUE_DOUBLE_QUOTED";
	State[State["ATTRIBUTE_VALUE_SINGLE_QUOTED"] = 36] = "ATTRIBUTE_VALUE_SINGLE_QUOTED";
	State[State["ATTRIBUTE_VALUE_UNQUOTED"] = 37] = "ATTRIBUTE_VALUE_UNQUOTED";
	State[State["AFTER_ATTRIBUTE_VALUE_QUOTED"] = 38] = "AFTER_ATTRIBUTE_VALUE_QUOTED";
	State[State["SELF_CLOSING_START_TAG"] = 39] = "SELF_CLOSING_START_TAG";
	State[State["BOGUS_COMMENT"] = 40] = "BOGUS_COMMENT";
	State[State["MARKUP_DECLARATION_OPEN"] = 41] = "MARKUP_DECLARATION_OPEN";
	State[State["COMMENT_START"] = 42] = "COMMENT_START";
	State[State["COMMENT_START_DASH"] = 43] = "COMMENT_START_DASH";
	State[State["COMMENT"] = 44] = "COMMENT";
	State[State["COMMENT_LESS_THAN_SIGN"] = 45] = "COMMENT_LESS_THAN_SIGN";
	State[State["COMMENT_LESS_THAN_SIGN_BANG"] = 46] = "COMMENT_LESS_THAN_SIGN_BANG";
	State[State["COMMENT_LESS_THAN_SIGN_BANG_DASH"] = 47] = "COMMENT_LESS_THAN_SIGN_BANG_DASH";
	State[State["COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH"] = 48] = "COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH";
	State[State["COMMENT_END_DASH"] = 49] = "COMMENT_END_DASH";
	State[State["COMMENT_END"] = 50] = "COMMENT_END";
	State[State["COMMENT_END_BANG"] = 51] = "COMMENT_END_BANG";
	State[State["DOCTYPE"] = 52] = "DOCTYPE";
	State[State["BEFORE_DOCTYPE_NAME"] = 53] = "BEFORE_DOCTYPE_NAME";
	State[State["DOCTYPE_NAME"] = 54] = "DOCTYPE_NAME";
	State[State["AFTER_DOCTYPE_NAME"] = 55] = "AFTER_DOCTYPE_NAME";
	State[State["AFTER_DOCTYPE_PUBLIC_KEYWORD"] = 56] = "AFTER_DOCTYPE_PUBLIC_KEYWORD";
	State[State["BEFORE_DOCTYPE_PUBLIC_IDENTIFIER"] = 57] = "BEFORE_DOCTYPE_PUBLIC_IDENTIFIER";
	State[State["DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED"] = 58] = "DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED";
	State[State["DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED"] = 59] = "DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED";
	State[State["AFTER_DOCTYPE_PUBLIC_IDENTIFIER"] = 60] = "AFTER_DOCTYPE_PUBLIC_IDENTIFIER";
	State[State["BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS"] = 61] = "BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS";
	State[State["AFTER_DOCTYPE_SYSTEM_KEYWORD"] = 62] = "AFTER_DOCTYPE_SYSTEM_KEYWORD";
	State[State["BEFORE_DOCTYPE_SYSTEM_IDENTIFIER"] = 63] = "BEFORE_DOCTYPE_SYSTEM_IDENTIFIER";
	State[State["DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED"] = 64] = "DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED";
	State[State["DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED"] = 65] = "DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED";
	State[State["AFTER_DOCTYPE_SYSTEM_IDENTIFIER"] = 66] = "AFTER_DOCTYPE_SYSTEM_IDENTIFIER";
	State[State["BOGUS_DOCTYPE"] = 67] = "BOGUS_DOCTYPE";
	State[State["CDATA_SECTION"] = 68] = "CDATA_SECTION";
	State[State["CDATA_SECTION_BRACKET"] = 69] = "CDATA_SECTION_BRACKET";
	State[State["CDATA_SECTION_END"] = 70] = "CDATA_SECTION_END";
	State[State["CHARACTER_REFERENCE"] = 71] = "CHARACTER_REFERENCE";
	State[State["AMBIGUOUS_AMPERSAND"] = 72] = "AMBIGUOUS_AMPERSAND";
})(State || (State = {}));
const TokenizerMode = {
	DATA: State.DATA,
	RCDATA: State.RCDATA,
	RAWTEXT: State.RAWTEXT,
	SCRIPT_DATA: State.SCRIPT_DATA,
	PLAINTEXT: State.PLAINTEXT,
	CDATA_SECTION: State.CDATA_SECTION
};
function isAsciiDigit(cp) {
	return cp >= CODE_POINTS.DIGIT_0 && cp <= CODE_POINTS.DIGIT_9;
}
function isAsciiUpper(cp) {
	return cp >= CODE_POINTS.LATIN_CAPITAL_A && cp <= CODE_POINTS.LATIN_CAPITAL_Z;
}
function isAsciiLower(cp) {
	return cp >= CODE_POINTS.LATIN_SMALL_A && cp <= CODE_POINTS.LATIN_SMALL_Z;
}
function isAsciiLetter(cp) {
	return isAsciiLower(cp) || isAsciiUpper(cp);
}
function isAsciiAlphaNumeric(cp) {
	return isAsciiLetter(cp) || isAsciiDigit(cp);
}
function toAsciiLower(cp) {
	return cp + 32;
}
function isWhitespace(cp) {
	return cp === CODE_POINTS.SPACE || cp === CODE_POINTS.LINE_FEED || cp === CODE_POINTS.TABULATION || cp === CODE_POINTS.FORM_FEED;
}
function isScriptDataDoubleEscapeSequenceEnd(cp) {
	return isWhitespace(cp) || cp === CODE_POINTS.SOLIDUS || cp === CODE_POINTS.GREATER_THAN_SIGN;
}
function getErrorForNumericCharacterReference(code) {
	if (code === CODE_POINTS.NULL) return ERR.nullCharacterReference;
	else if (code > 1114111) return ERR.characterReferenceOutsideUnicodeRange;
	else if (isSurrogate(code)) return ERR.surrogateCharacterReference;
	else if (isUndefinedCodePoint(code)) return ERR.noncharacterCharacterReference;
	else if (isControlCodePoint(code) || code === CODE_POINTS.CARRIAGE_RETURN) return ERR.controlCharacterReference;
	return null;
}
var Tokenizer = class {
	constructor(options, handler) {
		this.options = options;
		this.handler = handler;
		this.paused = false;
		/** Ensures that the parsing loop isn't run multiple times at once. */
		this.inLoop = false;
		/**
		* Indicates that the current adjusted node exists, is not an element in the HTML namespace,
		* and that it is not an integration point for either MathML or HTML.
		*
		* @see {@link https://html.spec.whatwg.org/multipage/parsing.html#tree-construction}
		*/
		this.inForeignNode = false;
		this.lastStartTagName = "";
		this.active = false;
		this.state = State.DATA;
		this.returnState = State.DATA;
		this.entityStartPos = 0;
		this.consumedAfterSnapshot = -1;
		this.currentCharacterToken = null;
		this.currentToken = null;
		this.currentAttr = {
			name: "",
			value: ""
		};
		this.preprocessor = new Preprocessor(handler);
		this.currentLocation = this.getCurrentLocation(-1);
		this.entityDecoder = new EntityDecoder(htmlDecodeTree, (cp, consumed) => {
			this.preprocessor.pos = this.entityStartPos + consumed - 1;
			this._flushCodePointConsumedAsCharacterReference(cp);
		}, handler.onParseError ? {
			missingSemicolonAfterCharacterReference: () => {
				this._err(ERR.missingSemicolonAfterCharacterReference, 1);
			},
			absenceOfDigitsInNumericCharacterReference: (consumed) => {
				this._err(ERR.absenceOfDigitsInNumericCharacterReference, this.entityStartPos - this.preprocessor.pos + consumed);
			},
			validateNumericCharacterReference: (code) => {
				const error = getErrorForNumericCharacterReference(code);
				if (error) this._err(error, 1);
			}
		} : void 0);
	}
	_err(code, cpOffset = 0) {
		var _a, _b;
		(_b = (_a = this.handler).onParseError) === null || _b === void 0 || _b.call(_a, this.preprocessor.getError(code, cpOffset));
	}
	getCurrentLocation(offset) {
		if (!this.options.sourceCodeLocationInfo) return null;
		return {
			startLine: this.preprocessor.line,
			startCol: this.preprocessor.col - offset,
			startOffset: this.preprocessor.offset - offset,
			endLine: -1,
			endCol: -1,
			endOffset: -1
		};
	}
	_runParsingLoop() {
		if (this.inLoop) return;
		this.inLoop = true;
		while (this.active && !this.paused) {
			this.consumedAfterSnapshot = 0;
			const cp = this._consume();
			if (!this._ensureHibernation()) this._callState(cp);
		}
		this.inLoop = false;
	}
	pause() {
		this.paused = true;
	}
	resume(writeCallback) {
		if (!this.paused) throw new Error("Parser was already resumed");
		this.paused = false;
		if (this.inLoop) return;
		this._runParsingLoop();
		if (!this.paused) writeCallback === null || writeCallback === void 0 || writeCallback();
	}
	write(chunk, isLastChunk, writeCallback) {
		this.active = true;
		this.preprocessor.write(chunk, isLastChunk);
		this._runParsingLoop();
		if (!this.paused) writeCallback === null || writeCallback === void 0 || writeCallback();
	}
	insertHtmlAtCurrentPos(chunk) {
		this.active = true;
		this.preprocessor.insertHtmlAtCurrentPos(chunk);
		this._runParsingLoop();
	}
	_ensureHibernation() {
		if (this.preprocessor.endOfChunkHit) {
			this.preprocessor.retreat(this.consumedAfterSnapshot);
			this.consumedAfterSnapshot = 0;
			this.active = false;
			return true;
		}
		return false;
	}
	_consume() {
		this.consumedAfterSnapshot++;
		return this.preprocessor.advance();
	}
	_advanceBy(count) {
		this.consumedAfterSnapshot += count;
		for (let i = 0; i < count; i++) this.preprocessor.advance();
	}
	_consumeSequenceIfMatch(pattern, caseSensitive) {
		if (this.preprocessor.startsWith(pattern, caseSensitive)) {
			this._advanceBy(pattern.length - 1);
			return true;
		}
		return false;
	}
	_createStartTagToken() {
		this.currentToken = {
			type: TokenType.START_TAG,
			tagName: "",
			tagID: TAG_ID.UNKNOWN,
			selfClosing: false,
			ackSelfClosing: false,
			attrs: [],
			location: this.getCurrentLocation(1)
		};
	}
	_createEndTagToken() {
		this.currentToken = {
			type: TokenType.END_TAG,
			tagName: "",
			tagID: TAG_ID.UNKNOWN,
			selfClosing: false,
			ackSelfClosing: false,
			attrs: [],
			location: this.getCurrentLocation(2)
		};
	}
	_createCommentToken(offset) {
		this.currentToken = {
			type: TokenType.COMMENT,
			data: "",
			location: this.getCurrentLocation(offset)
		};
	}
	_createDoctypeToken(initialName) {
		this.currentToken = {
			type: TokenType.DOCTYPE,
			name: initialName,
			forceQuirks: false,
			publicId: null,
			systemId: null,
			location: this.currentLocation
		};
	}
	_createCharacterToken(type, chars) {
		this.currentCharacterToken = {
			type,
			chars,
			location: this.currentLocation
		};
	}
	_createAttr(attrNameFirstCh) {
		this.currentAttr = {
			name: attrNameFirstCh,
			value: ""
		};
		this.currentLocation = this.getCurrentLocation(0);
	}
	_leaveAttrName() {
		var _a;
		var _b;
		const token = this.currentToken;
		if (getTokenAttr(token, this.currentAttr.name) === null) {
			token.attrs.push(this.currentAttr);
			if (token.location && this.currentLocation) {
				const attrLocations = (_a = (_b = token.location).attrs) !== null && _a !== void 0 ? _a : _b.attrs = Object.create(null);
				attrLocations[this.currentAttr.name] = this.currentLocation;
				this._leaveAttrValue();
			}
		} else this._err(ERR.duplicateAttribute);
	}
	_leaveAttrValue() {
		if (this.currentLocation) {
			this.currentLocation.endLine = this.preprocessor.line;
			this.currentLocation.endCol = this.preprocessor.col;
			this.currentLocation.endOffset = this.preprocessor.offset;
		}
	}
	prepareToken(ct) {
		this._emitCurrentCharacterToken(ct.location);
		this.currentToken = null;
		if (ct.location) {
			ct.location.endLine = this.preprocessor.line;
			ct.location.endCol = this.preprocessor.col + 1;
			ct.location.endOffset = this.preprocessor.offset + 1;
		}
		this.currentLocation = this.getCurrentLocation(-1);
	}
	emitCurrentTagToken() {
		const ct = this.currentToken;
		this.prepareToken(ct);
		ct.tagID = getTagID(ct.tagName);
		if (ct.type === TokenType.START_TAG) {
			this.lastStartTagName = ct.tagName;
			this.handler.onStartTag(ct);
		} else {
			if (ct.attrs.length > 0) this._err(ERR.endTagWithAttributes);
			if (ct.selfClosing) this._err(ERR.endTagWithTrailingSolidus);
			this.handler.onEndTag(ct);
		}
		this.preprocessor.dropParsedChunk();
	}
	emitCurrentComment(ct) {
		this.prepareToken(ct);
		this.handler.onComment(ct);
		this.preprocessor.dropParsedChunk();
	}
	emitCurrentDoctype(ct) {
		this.prepareToken(ct);
		this.handler.onDoctype(ct);
		this.preprocessor.dropParsedChunk();
	}
	_emitCurrentCharacterToken(nextLocation) {
		if (this.currentCharacterToken) {
			if (nextLocation && this.currentCharacterToken.location) {
				this.currentCharacterToken.location.endLine = nextLocation.startLine;
				this.currentCharacterToken.location.endCol = nextLocation.startCol;
				this.currentCharacterToken.location.endOffset = nextLocation.startOffset;
			}
			switch (this.currentCharacterToken.type) {
				case TokenType.CHARACTER:
					this.handler.onCharacter(this.currentCharacterToken);
					break;
				case TokenType.NULL_CHARACTER:
					this.handler.onNullCharacter(this.currentCharacterToken);
					break;
				case TokenType.WHITESPACE_CHARACTER: this.handler.onWhitespaceCharacter(this.currentCharacterToken);
			}
			this.currentCharacterToken = null;
		}
	}
	_emitEOFToken() {
		const location = this.getCurrentLocation(0);
		if (location) {
			location.endLine = location.startLine;
			location.endCol = location.startCol;
			location.endOffset = location.startOffset;
		}
		this._emitCurrentCharacterToken(location);
		this.handler.onEof({
			type: TokenType.EOF,
			location
		});
		this.active = false;
	}
	_appendCharToCurrentCharacterToken(type, ch) {
		if (this.currentCharacterToken) {
			if (this.currentCharacterToken.type === type) {
				this.currentCharacterToken.chars += ch;
				return;
			} else {
				this.currentLocation = this.getCurrentLocation(0);
				this._emitCurrentCharacterToken(this.currentLocation);
				this.preprocessor.dropParsedChunk();
			}
		}
		this._createCharacterToken(type, ch);
	}
	_emitCodePoint(cp) {
		const type = isWhitespace(cp) ? TokenType.WHITESPACE_CHARACTER : cp === CODE_POINTS.NULL ? TokenType.NULL_CHARACTER : TokenType.CHARACTER;
		this._appendCharToCurrentCharacterToken(type, cp < 65536 ? String.fromCharCode(cp) : String.fromCodePoint(cp));
	}
	_emitChars(ch) {
		this._appendCharToCurrentCharacterToken(TokenType.CHARACTER, ch);
	}
	_startCharacterReference() {
		this.returnState = this.state;
		this.state = State.CHARACTER_REFERENCE;
		this.entityStartPos = this.preprocessor.pos;
		this.entityDecoder.startEntity(this._isCharacterReferenceInAttribute() ? DecodingMode.Attribute : DecodingMode.Legacy);
	}
	_isCharacterReferenceInAttribute() {
		return this.returnState === State.ATTRIBUTE_VALUE_DOUBLE_QUOTED || this.returnState === State.ATTRIBUTE_VALUE_SINGLE_QUOTED || this.returnState === State.ATTRIBUTE_VALUE_UNQUOTED;
	}
	_flushCodePointConsumedAsCharacterReference(cp) {
		if (this._isCharacterReferenceInAttribute()) this.currentAttr.value += String.fromCodePoint(cp);
		else this._emitCodePoint(cp);
	}
	_callState(cp) {
		switch (this.state) {
			case State.DATA:
				this._stateData(cp);
				break;
			case State.RCDATA:
				this._stateRcdata(cp);
				break;
			case State.RAWTEXT:
				this._stateRawtext(cp);
				break;
			case State.SCRIPT_DATA:
				this._stateScriptData(cp);
				break;
			case State.PLAINTEXT:
				this._statePlaintext(cp);
				break;
			case State.TAG_OPEN:
				this._stateTagOpen(cp);
				break;
			case State.END_TAG_OPEN:
				this._stateEndTagOpen(cp);
				break;
			case State.TAG_NAME:
				this._stateTagName(cp);
				break;
			case State.RCDATA_LESS_THAN_SIGN:
				this._stateRcdataLessThanSign(cp);
				break;
			case State.RCDATA_END_TAG_OPEN:
				this._stateRcdataEndTagOpen(cp);
				break;
			case State.RCDATA_END_TAG_NAME:
				this._stateRcdataEndTagName(cp);
				break;
			case State.RAWTEXT_LESS_THAN_SIGN:
				this._stateRawtextLessThanSign(cp);
				break;
			case State.RAWTEXT_END_TAG_OPEN:
				this._stateRawtextEndTagOpen(cp);
				break;
			case State.RAWTEXT_END_TAG_NAME:
				this._stateRawtextEndTagName(cp);
				break;
			case State.SCRIPT_DATA_LESS_THAN_SIGN:
				this._stateScriptDataLessThanSign(cp);
				break;
			case State.SCRIPT_DATA_END_TAG_OPEN:
				this._stateScriptDataEndTagOpen(cp);
				break;
			case State.SCRIPT_DATA_END_TAG_NAME:
				this._stateScriptDataEndTagName(cp);
				break;
			case State.SCRIPT_DATA_ESCAPE_START:
				this._stateScriptDataEscapeStart(cp);
				break;
			case State.SCRIPT_DATA_ESCAPE_START_DASH:
				this._stateScriptDataEscapeStartDash(cp);
				break;
			case State.SCRIPT_DATA_ESCAPED:
				this._stateScriptDataEscaped(cp);
				break;
			case State.SCRIPT_DATA_ESCAPED_DASH:
				this._stateScriptDataEscapedDash(cp);
				break;
			case State.SCRIPT_DATA_ESCAPED_DASH_DASH:
				this._stateScriptDataEscapedDashDash(cp);
				break;
			case State.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN:
				this._stateScriptDataEscapedLessThanSign(cp);
				break;
			case State.SCRIPT_DATA_ESCAPED_END_TAG_OPEN:
				this._stateScriptDataEscapedEndTagOpen(cp);
				break;
			case State.SCRIPT_DATA_ESCAPED_END_TAG_NAME:
				this._stateScriptDataEscapedEndTagName(cp);
				break;
			case State.SCRIPT_DATA_DOUBLE_ESCAPE_START:
				this._stateScriptDataDoubleEscapeStart(cp);
				break;
			case State.SCRIPT_DATA_DOUBLE_ESCAPED:
				this._stateScriptDataDoubleEscaped(cp);
				break;
			case State.SCRIPT_DATA_DOUBLE_ESCAPED_DASH:
				this._stateScriptDataDoubleEscapedDash(cp);
				break;
			case State.SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH:
				this._stateScriptDataDoubleEscapedDashDash(cp);
				break;
			case State.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN:
				this._stateScriptDataDoubleEscapedLessThanSign(cp);
				break;
			case State.SCRIPT_DATA_DOUBLE_ESCAPE_END:
				this._stateScriptDataDoubleEscapeEnd(cp);
				break;
			case State.BEFORE_ATTRIBUTE_NAME:
				this._stateBeforeAttributeName(cp);
				break;
			case State.ATTRIBUTE_NAME:
				this._stateAttributeName(cp);
				break;
			case State.AFTER_ATTRIBUTE_NAME:
				this._stateAfterAttributeName(cp);
				break;
			case State.BEFORE_ATTRIBUTE_VALUE:
				this._stateBeforeAttributeValue(cp);
				break;
			case State.ATTRIBUTE_VALUE_DOUBLE_QUOTED:
				this._stateAttributeValueDoubleQuoted(cp);
				break;
			case State.ATTRIBUTE_VALUE_SINGLE_QUOTED:
				this._stateAttributeValueSingleQuoted(cp);
				break;
			case State.ATTRIBUTE_VALUE_UNQUOTED:
				this._stateAttributeValueUnquoted(cp);
				break;
			case State.AFTER_ATTRIBUTE_VALUE_QUOTED:
				this._stateAfterAttributeValueQuoted(cp);
				break;
			case State.SELF_CLOSING_START_TAG:
				this._stateSelfClosingStartTag(cp);
				break;
			case State.BOGUS_COMMENT:
				this._stateBogusComment(cp);
				break;
			case State.MARKUP_DECLARATION_OPEN:
				this._stateMarkupDeclarationOpen(cp);
				break;
			case State.COMMENT_START:
				this._stateCommentStart(cp);
				break;
			case State.COMMENT_START_DASH:
				this._stateCommentStartDash(cp);
				break;
			case State.COMMENT:
				this._stateComment(cp);
				break;
			case State.COMMENT_LESS_THAN_SIGN:
				this._stateCommentLessThanSign(cp);
				break;
			case State.COMMENT_LESS_THAN_SIGN_BANG:
				this._stateCommentLessThanSignBang(cp);
				break;
			case State.COMMENT_LESS_THAN_SIGN_BANG_DASH:
				this._stateCommentLessThanSignBangDash(cp);
				break;
			case State.COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH:
				this._stateCommentLessThanSignBangDashDash(cp);
				break;
			case State.COMMENT_END_DASH:
				this._stateCommentEndDash(cp);
				break;
			case State.COMMENT_END:
				this._stateCommentEnd(cp);
				break;
			case State.COMMENT_END_BANG:
				this._stateCommentEndBang(cp);
				break;
			case State.DOCTYPE:
				this._stateDoctype(cp);
				break;
			case State.BEFORE_DOCTYPE_NAME:
				this._stateBeforeDoctypeName(cp);
				break;
			case State.DOCTYPE_NAME:
				this._stateDoctypeName(cp);
				break;
			case State.AFTER_DOCTYPE_NAME:
				this._stateAfterDoctypeName(cp);
				break;
			case State.AFTER_DOCTYPE_PUBLIC_KEYWORD:
				this._stateAfterDoctypePublicKeyword(cp);
				break;
			case State.BEFORE_DOCTYPE_PUBLIC_IDENTIFIER:
				this._stateBeforeDoctypePublicIdentifier(cp);
				break;
			case State.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED:
				this._stateDoctypePublicIdentifierDoubleQuoted(cp);
				break;
			case State.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED:
				this._stateDoctypePublicIdentifierSingleQuoted(cp);
				break;
			case State.AFTER_DOCTYPE_PUBLIC_IDENTIFIER:
				this._stateAfterDoctypePublicIdentifier(cp);
				break;
			case State.BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS:
				this._stateBetweenDoctypePublicAndSystemIdentifiers(cp);
				break;
			case State.AFTER_DOCTYPE_SYSTEM_KEYWORD:
				this._stateAfterDoctypeSystemKeyword(cp);
				break;
			case State.BEFORE_DOCTYPE_SYSTEM_IDENTIFIER:
				this._stateBeforeDoctypeSystemIdentifier(cp);
				break;
			case State.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED:
				this._stateDoctypeSystemIdentifierDoubleQuoted(cp);
				break;
			case State.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED:
				this._stateDoctypeSystemIdentifierSingleQuoted(cp);
				break;
			case State.AFTER_DOCTYPE_SYSTEM_IDENTIFIER:
				this._stateAfterDoctypeSystemIdentifier(cp);
				break;
			case State.BOGUS_DOCTYPE:
				this._stateBogusDoctype(cp);
				break;
			case State.CDATA_SECTION:
				this._stateCdataSection(cp);
				break;
			case State.CDATA_SECTION_BRACKET:
				this._stateCdataSectionBracket(cp);
				break;
			case State.CDATA_SECTION_END:
				this._stateCdataSectionEnd(cp);
				break;
			case State.CHARACTER_REFERENCE:
				this._stateCharacterReference();
				break;
			case State.AMBIGUOUS_AMPERSAND:
				this._stateAmbiguousAmpersand(cp);
				break;
			default: throw new Error("Unknown state");
		}
	}
	_stateData(cp) {
		switch (cp) {
			case CODE_POINTS.LESS_THAN_SIGN:
				this.state = State.TAG_OPEN;
				break;
			case CODE_POINTS.AMPERSAND:
				this._startCharacterReference();
				break;
			case CODE_POINTS.NULL:
				this._err(ERR.unexpectedNullCharacter);
				this._emitCodePoint(cp);
				break;
			case CODE_POINTS.EOF:
				this._emitEOFToken();
				break;
			default: this._emitCodePoint(cp);
		}
	}
	_stateRcdata(cp) {
		switch (cp) {
			case CODE_POINTS.AMPERSAND:
				this._startCharacterReference();
				break;
			case CODE_POINTS.LESS_THAN_SIGN:
				this.state = State.RCDATA_LESS_THAN_SIGN;
				break;
			case CODE_POINTS.NULL:
				this._err(ERR.unexpectedNullCharacter);
				this._emitChars("�");
				break;
			case CODE_POINTS.EOF:
				this._emitEOFToken();
				break;
			default: this._emitCodePoint(cp);
		}
	}
	_stateRawtext(cp) {
		switch (cp) {
			case CODE_POINTS.LESS_THAN_SIGN:
				this.state = State.RAWTEXT_LESS_THAN_SIGN;
				break;
			case CODE_POINTS.NULL:
				this._err(ERR.unexpectedNullCharacter);
				this._emitChars("�");
				break;
			case CODE_POINTS.EOF:
				this._emitEOFToken();
				break;
			default: this._emitCodePoint(cp);
		}
	}
	_stateScriptData(cp) {
		switch (cp) {
			case CODE_POINTS.LESS_THAN_SIGN:
				this.state = State.SCRIPT_DATA_LESS_THAN_SIGN;
				break;
			case CODE_POINTS.NULL:
				this._err(ERR.unexpectedNullCharacter);
				this._emitChars("�");
				break;
			case CODE_POINTS.EOF:
				this._emitEOFToken();
				break;
			default: this._emitCodePoint(cp);
		}
	}
	_statePlaintext(cp) {
		switch (cp) {
			case CODE_POINTS.NULL:
				this._err(ERR.unexpectedNullCharacter);
				this._emitChars("�");
				break;
			case CODE_POINTS.EOF:
				this._emitEOFToken();
				break;
			default: this._emitCodePoint(cp);
		}
	}
	_stateTagOpen(cp) {
		if (isAsciiLetter(cp)) {
			this._createStartTagToken();
			this.state = State.TAG_NAME;
			this._stateTagName(cp);
		} else switch (cp) {
			case CODE_POINTS.EXCLAMATION_MARK:
				this.state = State.MARKUP_DECLARATION_OPEN;
				break;
			case CODE_POINTS.SOLIDUS:
				this.state = State.END_TAG_OPEN;
				break;
			case CODE_POINTS.QUESTION_MARK:
				this._err(ERR.unexpectedQuestionMarkInsteadOfTagName);
				this._createCommentToken(1);
				this.state = State.BOGUS_COMMENT;
				this._stateBogusComment(cp);
				break;
			case CODE_POINTS.EOF:
				this._err(ERR.eofBeforeTagName);
				this._emitChars("<");
				this._emitEOFToken();
				break;
			default:
				this._err(ERR.invalidFirstCharacterOfTagName);
				this._emitChars("<");
				this.state = State.DATA;
				this._stateData(cp);
		}
	}
	_stateEndTagOpen(cp) {
		if (isAsciiLetter(cp)) {
			this._createEndTagToken();
			this.state = State.TAG_NAME;
			this._stateTagName(cp);
		} else switch (cp) {
			case CODE_POINTS.GREATER_THAN_SIGN:
				this._err(ERR.missingEndTagName);
				this.state = State.DATA;
				break;
			case CODE_POINTS.EOF:
				this._err(ERR.eofBeforeTagName);
				this._emitChars("</");
				this._emitEOFToken();
				break;
			default:
				this._err(ERR.invalidFirstCharacterOfTagName);
				this._createCommentToken(2);
				this.state = State.BOGUS_COMMENT;
				this._stateBogusComment(cp);
		}
	}
	_stateTagName(cp) {
		const token = this.currentToken;
		switch (cp) {
			case CODE_POINTS.SPACE:
			case CODE_POINTS.LINE_FEED:
			case CODE_POINTS.TABULATION:
			case CODE_POINTS.FORM_FEED:
				this.state = State.BEFORE_ATTRIBUTE_NAME;
				break;
			case CODE_POINTS.SOLIDUS:
				this.state = State.SELF_CLOSING_START_TAG;
				break;
			case CODE_POINTS.GREATER_THAN_SIGN:
				this.state = State.DATA;
				this.emitCurrentTagToken();
				break;
			case CODE_POINTS.NULL:
				this._err(ERR.unexpectedNullCharacter);
				token.tagName += "�";
				break;
			case CODE_POINTS.EOF:
				this._err(ERR.eofInTag);
				this._emitEOFToken();
				break;
			default: token.tagName += String.fromCodePoint(isAsciiUpper(cp) ? toAsciiLower(cp) : cp);
		}
	}
	_stateRcdataLessThanSign(cp) {
		if (cp === CODE_POINTS.SOLIDUS) this.state = State.RCDATA_END_TAG_OPEN;
		else {
			this._emitChars("<");
			this.state = State.RCDATA;
			this._stateRcdata(cp);
		}
	}
	_stateRcdataEndTagOpen(cp) {
		if (isAsciiLetter(cp)) {
			this.state = State.RCDATA_END_TAG_NAME;
			this._stateRcdataEndTagName(cp);
		} else {
			this._emitChars("</");
			this.state = State.RCDATA;
			this._stateRcdata(cp);
		}
	}
	handleSpecialEndTag(_cp) {
		if (!this.preprocessor.startsWith(this.lastStartTagName, false)) return !this._ensureHibernation();
		this._createEndTagToken();
		const token = this.currentToken;
		token.tagName = this.lastStartTagName;
		switch (this.preprocessor.peek(this.lastStartTagName.length)) {
			case CODE_POINTS.SPACE:
			case CODE_POINTS.LINE_FEED:
			case CODE_POINTS.TABULATION:
			case CODE_POINTS.FORM_FEED:
				this._advanceBy(this.lastStartTagName.length);
				this.state = State.BEFORE_ATTRIBUTE_NAME;
				return false;
			case CODE_POINTS.SOLIDUS:
				this._advanceBy(this.lastStartTagName.length);
				this.state = State.SELF_CLOSING_START_TAG;
				return false;
			case CODE_POINTS.GREATER_THAN_SIGN:
				this._advanceBy(this.lastStartTagName.length);
				this.emitCurrentTagToken();
				this.state = State.DATA;
				return false;
			default: return !this._ensureHibernation();
		}
	}
	_stateRcdataEndTagName(cp) {
		if (this.handleSpecialEndTag(cp)) {
			this._emitChars("</");
			this.state = State.RCDATA;
			this._stateRcdata(cp);
		}
	}
	_stateRawtextLessThanSign(cp) {
		if (cp === CODE_POINTS.SOLIDUS) this.state = State.RAWTEXT_END_TAG_OPEN;
		else {
			this._emitChars("<");
			this.state = State.RAWTEXT;
			this._stateRawtext(cp);
		}
	}
	_stateRawtextEndTagOpen(cp) {
		if (isAsciiLetter(cp)) {
			this.state = State.RAWTEXT_END_TAG_NAME;
			this._stateRawtextEndTagName(cp);
		} else {
			this._emitChars("</");
			this.state = State.RAWTEXT;
			this._stateRawtext(cp);
		}
	}
	_stateRawtextEndTagName(cp) {
		if (this.handleSpecialEndTag(cp)) {
			this._emitChars("</");
			this.state = State.RAWTEXT;
			this._stateRawtext(cp);
		}
	}
	_stateScriptDataLessThanSign(cp) {
		switch (cp) {
			case CODE_POINTS.SOLIDUS:
				this.state = State.SCRIPT_DATA_END_TAG_OPEN;
				break;
			case CODE_POINTS.EXCLAMATION_MARK:
				this.state = State.SCRIPT_DATA_ESCAPE_START;
				this._emitChars("<!");
				break;
			default:
				this._emitChars("<");
				this.state = State.SCRIPT_DATA;
				this._stateScriptData(cp);
		}
	}
	_stateScriptDataEndTagOpen(cp) {
		if (isAsciiLetter(cp)) {
			this.state = State.SCRIPT_DATA_END_TAG_NAME;
			this._stateScriptDataEndTagName(cp);
		} else {
			this._emitChars("</");
			this.state = State.SCRIPT_DATA;
			this._stateScriptData(cp);
		}
	}
	_stateScriptDataEndTagName(cp) {
		if (this.handleSpecialEndTag(cp)) {
			this._emitChars("</");
			this.state = State.SCRIPT_DATA;
			this._stateScriptData(cp);
		}
	}
	_stateScriptDataEscapeStart(cp) {
		if (cp === CODE_POINTS.HYPHEN_MINUS) {
			this.state = State.SCRIPT_DATA_ESCAPE_START_DASH;
			this._emitChars("-");
		} else {
			this.state = State.SCRIPT_DATA;
			this._stateScriptData(cp);
		}
	}
	_stateScriptDataEscapeStartDash(cp) {
		if (cp === CODE_POINTS.HYPHEN_MINUS) {
			this.state = State.SCRIPT_DATA_ESCAPED_DASH_DASH;
			this._emitChars("-");
		} else {
			this.state = State.SCRIPT_DATA;
			this._stateScriptData(cp);
		}
	}
	_stateScriptDataEscaped(cp) {
		switch (cp) {
			case CODE_POINTS.HYPHEN_MINUS:
				this.state = State.SCRIPT_DATA_ESCAPED_DASH;
				this._emitChars("-");
				break;
			case CODE_POINTS.LESS_THAN_SIGN:
				this.state = State.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN;
				break;
			case CODE_POINTS.NULL:
				this._err(ERR.unexpectedNullCharacter);
				this._emitChars("�");
				break;
			case CODE_POINTS.EOF:
				this._err(ERR.eofInScriptHtmlCommentLikeText);
				this._emitEOFToken();
				break;
			default: this._emitCodePoint(cp);
		}
	}
	_stateScriptDataEscapedDash(cp) {
		switch (cp) {
			case CODE_POINTS.HYPHEN_MINUS:
				this.state = State.SCRIPT_DATA_ESCAPED_DASH_DASH;
				this._emitChars("-");
				break;
			case CODE_POINTS.LESS_THAN_SIGN:
				this.state = State.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN;
				break;
			case CODE_POINTS.NULL:
				this._err(ERR.unexpectedNullCharacter);
				this.state = State.SCRIPT_DATA_ESCAPED;
				this._emitChars("�");
				break;
			case CODE_POINTS.EOF:
				this._err(ERR.eofInScriptHtmlCommentLikeText);
				this._emitEOFToken();
				break;
			default:
				this.state = State.SCRIPT_DATA_ESCAPED;
				this._emitCodePoint(cp);
		}
	}
	_stateScriptDataEscapedDashDash(cp) {
		switch (cp) {
			case CODE_POINTS.HYPHEN_MINUS:
				this._emitChars("-");
				break;
			case CODE_POINTS.LESS_THAN_SIGN:
				this.state = State.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN;
				break;
			case CODE_POINTS.GREATER_THAN_SIGN:
				this.state = State.SCRIPT_DATA;
				this._emitChars(">");
				break;
			case CODE_POINTS.NULL:
				this._err(ERR.unexpectedNullCharacter);
				this.state = State.SCRIPT_DATA_ESCAPED;
				this._emitChars("�");
				break;
			case CODE_POINTS.EOF:
				this._err(ERR.eofInScriptHtmlCommentLikeText);
				this._emitEOFToken();
				break;
			default:
				this.state = State.SCRIPT_DATA_ESCAPED;
				this._emitCodePoint(cp);
		}
	}
	_stateScriptDataEscapedLessThanSign(cp) {
		if (cp === CODE_POINTS.SOLIDUS) this.state = State.SCRIPT_DATA_ESCAPED_END_TAG_OPEN;
		else if (isAsciiLetter(cp)) {
			this._emitChars("<");
			this.state = State.SCRIPT_DATA_DOUBLE_ESCAPE_START;
			this._stateScriptDataDoubleEscapeStart(cp);
		} else {
			this._emitChars("<");
			this.state = State.SCRIPT_DATA_ESCAPED;
			this._stateScriptDataEscaped(cp);
		}
	}
	_stateScriptDataEscapedEndTagOpen(cp) {
		if (isAsciiLetter(cp)) {
			this.state = State.SCRIPT_DATA_ESCAPED_END_TAG_NAME;
			this._stateScriptDataEscapedEndTagName(cp);
		} else {
			this._emitChars("</");
			this.state = State.SCRIPT_DATA_ESCAPED;
			this._stateScriptDataEscaped(cp);
		}
	}
	_stateScriptDataEscapedEndTagName(cp) {
		if (this.handleSpecialEndTag(cp)) {
			this._emitChars("</");
			this.state = State.SCRIPT_DATA_ESCAPED;
			this._stateScriptDataEscaped(cp);
		}
	}
	_stateScriptDataDoubleEscapeStart(cp) {
		if (this.preprocessor.startsWith(SEQUENCES.SCRIPT, false) && isScriptDataDoubleEscapeSequenceEnd(this.preprocessor.peek(SEQUENCES.SCRIPT.length))) {
			this._emitCodePoint(cp);
			for (let i = 0; i < SEQUENCES.SCRIPT.length; i++) this._emitCodePoint(this._consume());
			this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED;
		} else if (!this._ensureHibernation()) {
			this.state = State.SCRIPT_DATA_ESCAPED;
			this._stateScriptDataEscaped(cp);
		}
	}
	_stateScriptDataDoubleEscaped(cp) {
		switch (cp) {
			case CODE_POINTS.HYPHEN_MINUS:
				this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED_DASH;
				this._emitChars("-");
				break;
			case CODE_POINTS.LESS_THAN_SIGN:
				this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN;
				this._emitChars("<");
				break;
			case CODE_POINTS.NULL:
				this._err(ERR.unexpectedNullCharacter);
				this._emitChars("�");
				break;
			case CODE_POINTS.EOF:
				this._err(ERR.eofInScriptHtmlCommentLikeText);
				this._emitEOFToken();
				break;
			default: this._emitCodePoint(cp);
		}
	}
	_stateScriptDataDoubleEscapedDash(cp) {
		switch (cp) {
			case CODE_POINTS.HYPHEN_MINUS:
				this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH;
				this._emitChars("-");
				break;
			case CODE_POINTS.LESS_THAN_SIGN:
				this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN;
				this._emitChars("<");
				break;
			case CODE_POINTS.NULL:
				this._err(ERR.unexpectedNullCharacter);
				this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED;
				this._emitChars("�");
				break;
			case CODE_POINTS.EOF:
				this._err(ERR.eofInScriptHtmlCommentLikeText);
				this._emitEOFToken();
				break;
			default:
				this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED;
				this._emitCodePoint(cp);
		}
	}
	_stateScriptDataDoubleEscapedDashDash(cp) {
		switch (cp) {
			case CODE_POINTS.HYPHEN_MINUS:
				this._emitChars("-");
				break;
			case CODE_POINTS.LESS_THAN_SIGN:
				this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN;
				this._emitChars("<");
				break;
			case CODE_POINTS.GREATER_THAN_SIGN:
				this.state = State.SCRIPT_DATA;
				this._emitChars(">");
				break;
			case CODE_POINTS.NULL:
				this._err(ERR.unexpectedNullCharacter);
				this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED;
				this._emitChars("�");
				break;
			case CODE_POINTS.EOF:
				this._err(ERR.eofInScriptHtmlCommentLikeText);
				this._emitEOFToken();
				break;
			default:
				this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED;
				this._emitCodePoint(cp);
		}
	}
	_stateScriptDataDoubleEscapedLessThanSign(cp) {
		if (cp === CODE_POINTS.SOLIDUS) {
			this.state = State.SCRIPT_DATA_DOUBLE_ESCAPE_END;
			this._emitChars("/");
		} else {
			this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED;
			this._stateScriptDataDoubleEscaped(cp);
		}
	}
	_stateScriptDataDoubleEscapeEnd(cp) {
		if (this.preprocessor.startsWith(SEQUENCES.SCRIPT, false) && isScriptDataDoubleEscapeSequenceEnd(this.preprocessor.peek(SEQUENCES.SCRIPT.length))) {
			this._emitCodePoint(cp);
			for (let i = 0; i < SEQUENCES.SCRIPT.length; i++) this._emitCodePoint(this._consume());
			this.state = State.SCRIPT_DATA_ESCAPED;
		} else if (!this._ensureHibernation()) {
			this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED;
			this._stateScriptDataDoubleEscaped(cp);
		}
	}
	_stateBeforeAttributeName(cp) {
		switch (cp) {
			case CODE_POINTS.SPACE:
			case CODE_POINTS.LINE_FEED:
			case CODE_POINTS.TABULATION:
			case CODE_POINTS.FORM_FEED: break;
			case CODE_POINTS.SOLIDUS:
			case CODE_POINTS.GREATER_THAN_SIGN:
			case CODE_POINTS.EOF:
				this.state = State.AFTER_ATTRIBUTE_NAME;
				this._stateAfterAttributeName(cp);
				break;
			case CODE_POINTS.EQUALS_SIGN:
				this._err(ERR.unexpectedEqualsSignBeforeAttributeName);
				this._createAttr("=");
				this.state = State.ATTRIBUTE_NAME;
				break;
			default:
				this._createAttr("");
				this.state = State.ATTRIBUTE_NAME;
				this._stateAttributeName(cp);
		}
	}
	_stateAttributeName(cp) {
		switch (cp) {
			case CODE_POINTS.SPACE:
			case CODE_POINTS.LINE_FEED:
			case CODE_POINTS.TABULATION:
			case CODE_POINTS.FORM_FEED:
			case CODE_POINTS.SOLIDUS:
			case CODE_POINTS.GREATER_THAN_SIGN:
			case CODE_POINTS.EOF:
				this._leaveAttrName();
				this.state = State.AFTER_ATTRIBUTE_NAME;
				this._stateAfterAttributeName(cp);
				break;
			case CODE_POINTS.EQUALS_SIGN:
				this._leaveAttrName();
				this.state = State.BEFORE_ATTRIBUTE_VALUE;
				break;
			case CODE_POINTS.QUOTATION_MARK:
			case CODE_POINTS.APOSTROPHE:
			case CODE_POINTS.LESS_THAN_SIGN:
				this._err(ERR.unexpectedCharacterInAttributeName);
				this.currentAttr.name += String.fromCodePoint(cp);
				break;
			case CODE_POINTS.NULL:
				this._err(ERR.unexpectedNullCharacter);
				this.currentAttr.name += "�";
				break;
			default: this.currentAttr.name += String.fromCodePoint(isAsciiUpper(cp) ? toAsciiLower(cp) : cp);
		}
	}
	_stateAfterAttributeName(cp) {
		switch (cp) {
			case CODE_POINTS.SPACE:
			case CODE_POINTS.LINE_FEED:
			case CODE_POINTS.TABULATION:
			case CODE_POINTS.FORM_FEED: break;
			case CODE_POINTS.SOLIDUS:
				this.state = State.SELF_CLOSING_START_TAG;
				break;
			case CODE_POINTS.EQUALS_SIGN:
				this.state = State.BEFORE_ATTRIBUTE_VALUE;
				break;
			case CODE_POINTS.GREATER_THAN_SIGN:
				this.state = State.DATA;
				this.emitCurrentTagToken();
				break;
			case CODE_POINTS.EOF:
				this._err(ERR.eofInTag);
				this._emitEOFToken();
				break;
			default:
				this._createAttr("");
				this.state = State.ATTRIBUTE_NAME;
				this._stateAttributeName(cp);
		}
	}
	_stateBeforeAttributeValue(cp) {
		switch (cp) {
			case CODE_POINTS.SPACE:
			case CODE_POINTS.LINE_FEED:
			case CODE_POINTS.TABULATION:
			case CODE_POINTS.FORM_FEED: break;
			case CODE_POINTS.QUOTATION_MARK:
				this.state = State.ATTRIBUTE_VALUE_DOUBLE_QUOTED;
				break;
			case CODE_POINTS.APOSTROPHE:
				this.state = State.ATTRIBUTE_VALUE_SINGLE_QUOTED;
				break;
			case CODE_POINTS.GREATER_THAN_SIGN:
				this._err(ERR.missingAttributeValue);
				this.state = State.DATA;
				this.emitCurrentTagToken();
				break;
			default:
				this.state = State.ATTRIBUTE_VALUE_UNQUOTED;
				this._stateAttributeValueUnquoted(cp);
		}
	}
	_stateAttributeValueDoubleQuoted(cp) {
		switch (cp) {
			case CODE_POINTS.QUOTATION_MARK:
				this.state = State.AFTER_ATTRIBUTE_VALUE_QUOTED;
				break;
			case CODE_POINTS.AMPERSAND:
				this._startCharacterReference();
				break;
			case CODE_POINTS.NULL:
				this._err(ERR.unexpectedNullCharacter);
				this.currentAttr.value += "�";
				break;
			case CODE_POINTS.EOF:
				this._err(ERR.eofInTag);
				this._emitEOFToken();
				break;
			default: this.currentAttr.value += String.fromCodePoint(cp);
		}
	}
	_stateAttributeValueSingleQuoted(cp) {
		switch (cp) {
			case CODE_POINTS.APOSTROPHE:
				this.state = State.AFTER_ATTRIBUTE_VALUE_QUOTED;
				break;
			case CODE_POINTS.AMPERSAND:
				this._startCharacterReference();
				break;
			case CODE_POINTS.NULL:
				this._err(ERR.unexpectedNullCharacter);
				this.currentAttr.value += "�";
				break;
			case CODE_POINTS.EOF:
				this._err(ERR.eofInTag);
				this._emitEOFToken();
				break;
			default: this.currentAttr.value += String.fromCodePoint(cp);
		}
	}
	_stateAttributeValueUnquoted(cp) {
		switch (cp) {
			case CODE_POINTS.SPACE:
			case CODE_POINTS.LINE_FEED:
			case CODE_POINTS.TABULATION:
			case CODE_POINTS.FORM_FEED:
				this._leaveAttrValue();
				this.state = State.BEFORE_ATTRIBUTE_NAME;
				break;
			case CODE_POINTS.AMPERSAND:
				this._startCharacterReference();
				break;
			case CODE_POINTS.GREATER_THAN_SIGN:
				this._leaveAttrValue();
				this.state = State.DATA;
				this.emitCurrentTagToken();
				break;
			case CODE_POINTS.NULL:
				this._err(ERR.unexpectedNullCharacter);
				this.currentAttr.value += "�";
				break;
			case CODE_POINTS.QUOTATION_MARK:
			case CODE_POINTS.APOSTROPHE:
			case CODE_POINTS.LESS_THAN_SIGN:
			case CODE_POINTS.EQUALS_SIGN:
			case CODE_POINTS.GRAVE_ACCENT:
				this._err(ERR.unexpectedCharacterInUnquotedAttributeValue);
				this.currentAttr.value += String.fromCodePoint(cp);
				break;
			case CODE_POINTS.EOF:
				this._err(ERR.eofInTag);
				this._emitEOFToken();
				break;
			default: this.currentAttr.value += String.fromCodePoint(cp);
		}
	}
	_stateAfterAttributeValueQuoted(cp) {
		switch (cp) {
			case CODE_POINTS.SPACE:
			case CODE_POINTS.LINE_FEED:
			case CODE_POINTS.TABULATION:
			case CODE_POINTS.FORM_FEED:
				this._leaveAttrValue();
				this.state = State.BEFORE_ATTRIBUTE_NAME;
				break;
			case CODE_POINTS.SOLIDUS:
				this._leaveAttrValue();
				this.state = State.SELF_CLOSING_START_TAG;
				break;
			case CODE_POINTS.GREATER_THAN_SIGN:
				this._leaveAttrValue();
				this.state = State.DATA;
				this.emitCurrentTagToken();
				break;
			case CODE_POINTS.EOF:
				this._err(ERR.eofInTag);
				this._emitEOFToken();
				break;
			default:
				this._err(ERR.missingWhitespaceBetweenAttributes);
				this.state = State.BEFORE_ATTRIBUTE_NAME;
				this._stateBeforeAttributeName(cp);
		}
	}
	_stateSelfClosingStartTag(cp) {
		switch (cp) {
			case CODE_POINTS.GREATER_THAN_SIGN: {
				const token = this.currentToken;
				token.selfClosing = true;
				this.state = State.DATA;
				this.emitCurrentTagToken();
				break;
			}
			case CODE_POINTS.EOF:
				this._err(ERR.eofInTag);
				this._emitEOFToken();
				break;
			default:
				this._err(ERR.unexpectedSolidusInTag);
				this.state = State.BEFORE_ATTRIBUTE_NAME;
				this._stateBeforeAttributeName(cp);
		}
	}
	_stateBogusComment(cp) {
		const token = this.currentToken;
		switch (cp) {
			case CODE_POINTS.GREATER_THAN_SIGN:
				this.state = State.DATA;
				this.emitCurrentComment(token);
				break;
			case CODE_POINTS.EOF:
				this.emitCurrentComment(token);
				this._emitEOFToken();
				break;
			case CODE_POINTS.NULL:
				this._err(ERR.unexpectedNullCharacter);
				token.data += "�";
				break;
			default: token.data += String.fromCodePoint(cp);
		}
	}
	_stateMarkupDeclarationOpen(cp) {
		if (this._consumeSequenceIfMatch(SEQUENCES.DASH_DASH, true)) {
			this._createCommentToken(SEQUENCES.DASH_DASH.length + 1);
			this.state = State.COMMENT_START;
		} else if (this._consumeSequenceIfMatch(SEQUENCES.DOCTYPE, false)) {
			this.currentLocation = this.getCurrentLocation(SEQUENCES.DOCTYPE.length + 1);
			this.state = State.DOCTYPE;
		} else if (this._consumeSequenceIfMatch(SEQUENCES.CDATA_START, true)) {
			if (this.inForeignNode) this.state = State.CDATA_SECTION;
			else {
				this._err(ERR.cdataInHtmlContent);
				this._createCommentToken(SEQUENCES.CDATA_START.length + 1);
				this.currentToken.data = "[CDATA[";
				this.state = State.BOGUS_COMMENT;
			}
		} else if (!this._ensureHibernation()) {
			this._err(ERR.incorrectlyOpenedComment);
			this._createCommentToken(2);
			this.state = State.BOGUS_COMMENT;
			this._stateBogusComment(cp);
		}
	}
	_stateCommentStart(cp) {
		switch (cp) {
			case CODE_POINTS.HYPHEN_MINUS:
				this.state = State.COMMENT_START_DASH;
				break;
			case CODE_POINTS.GREATER_THAN_SIGN: {
				this._err(ERR.abruptClosingOfEmptyComment);
				this.state = State.DATA;
				const token = this.currentToken;
				this.emitCurrentComment(token);
				break;
			}
			default:
				this.state = State.COMMENT;
				this._stateComment(cp);
		}
	}
	_stateCommentStartDash(cp) {
		const token = this.currentToken;
		switch (cp) {
			case CODE_POINTS.HYPHEN_MINUS:
				this.state = State.COMMENT_END;
				break;
			case CODE_POINTS.GREATER_THAN_SIGN:
				this._err(ERR.abruptClosingOfEmptyComment);
				this.state = State.DATA;
				this.emitCurrentComment(token);
				break;
			case CODE_POINTS.EOF:
				this._err(ERR.eofInComment);
				this.emitCurrentComment(token);
				this._emitEOFToken();
				break;
			default:
				token.data += "-";
				this.state = State.COMMENT;
				this._stateComment(cp);
		}
	}
	_stateComment(cp) {
		const token = this.currentToken;
		switch (cp) {
			case CODE_POINTS.HYPHEN_MINUS:
				this.state = State.COMMENT_END_DASH;
				break;
			case CODE_POINTS.LESS_THAN_SIGN:
				token.data += "<";
				this.state = State.COMMENT_LESS_THAN_SIGN;
				break;
			case CODE_POINTS.NULL:
				this._err(ERR.unexpectedNullCharacter);
				token.data += "�";
				break;
			case CODE_POINTS.EOF:
				this._err(ERR.eofInComment);
				this.emitCurrentComment(token);
				this._emitEOFToken();
				break;
			default: token.data += String.fromCodePoint(cp);
		}
	}
	_stateCommentLessThanSign(cp) {
		const token = this.currentToken;
		switch (cp) {
			case CODE_POINTS.EXCLAMATION_MARK:
				token.data += "!";
				this.state = State.COMMENT_LESS_THAN_SIGN_BANG;
				break;
			case CODE_POINTS.LESS_THAN_SIGN:
				token.data += "<";
				break;
			default:
				this.state = State.COMMENT;
				this._stateComment(cp);
		}
	}
	_stateCommentLessThanSignBang(cp) {
		if (cp === CODE_POINTS.HYPHEN_MINUS) this.state = State.COMMENT_LESS_THAN_SIGN_BANG_DASH;
		else {
			this.state = State.COMMENT;
			this._stateComment(cp);
		}
	}
	_stateCommentLessThanSignBangDash(cp) {
		if (cp === CODE_POINTS.HYPHEN_MINUS) this.state = State.COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH;
		else {
			this.state = State.COMMENT_END_DASH;
			this._stateCommentEndDash(cp);
		}
	}
	_stateCommentLessThanSignBangDashDash(cp) {
		if (cp !== CODE_POINTS.GREATER_THAN_SIGN && cp !== CODE_POINTS.EOF) this._err(ERR.nestedComment);
		this.state = State.COMMENT_END;
		this._stateCommentEnd(cp);
	}
	_stateCommentEndDash(cp) {
		const token = this.currentToken;
		switch (cp) {
			case CODE_POINTS.HYPHEN_MINUS:
				this.state = State.COMMENT_END;
				break;
			case CODE_POINTS.EOF:
				this._err(ERR.eofInComment);
				this.emitCurrentComment(token);
				this._emitEOFToken();
				break;
			default:
				token.data += "-";
				this.state = State.COMMENT;
				this._stateComment(cp);
		}
	}
	_stateCommentEnd(cp) {
		const token = this.currentToken;
		switch (cp) {
			case CODE_POINTS.GREATER_THAN_SIGN:
				this.state = State.DATA;
				this.emitCurrentComment(token);
				break;
			case CODE_POINTS.EXCLAMATION_MARK:
				this.state = State.COMMENT_END_BANG;
				break;
			case CODE_POINTS.HYPHEN_MINUS:
				token.data += "-";
				break;
			case CODE_POINTS.EOF:
				this._err(ERR.eofInComment);
				this.emitCurrentComment(token);
				this._emitEOFToken();
				break;
			default:
				token.data += "--";
				this.state = State.COMMENT;
				this._stateComment(cp);
		}
	}
	_stateCommentEndBang(cp) {
		const token = this.currentToken;
		switch (cp) {
			case CODE_POINTS.HYPHEN_MINUS:
				token.data += "--!";
				this.state = State.COMMENT_END_DASH;
				break;
			case CODE_POINTS.GREATER_THAN_SIGN:
				this._err(ERR.incorrectlyClosedComment);
				this.state = State.DATA;
				this.emitCurrentComment(token);
				break;
			case CODE_POINTS.EOF:
				this._err(ERR.eofInComment);
				this.emitCurrentComment(token);
				this._emitEOFToken();
				break;
			default:
				token.data += "--!";
				this.state = State.COMMENT;
				this._stateComment(cp);
		}
	}
	_stateDoctype(cp) {
		switch (cp) {
			case CODE_POINTS.SPACE:
			case CODE_POINTS.LINE_FEED:
			case CODE_POINTS.TABULATION:
			case CODE_POINTS.FORM_FEED:
				this.state = State.BEFORE_DOCTYPE_NAME;
				break;
			case CODE_POINTS.GREATER_THAN_SIGN:
				this.state = State.BEFORE_DOCTYPE_NAME;
				this._stateBeforeDoctypeName(cp);
				break;
			case CODE_POINTS.EOF: {
				this._err(ERR.eofInDoctype);
				this._createDoctypeToken(null);
				const token = this.currentToken;
				token.forceQuirks = true;
				this.emitCurrentDoctype(token);
				this._emitEOFToken();
				break;
			}
			default:
				this._err(ERR.missingWhitespaceBeforeDoctypeName);
				this.state = State.BEFORE_DOCTYPE_NAME;
				this._stateBeforeDoctypeName(cp);
		}
	}
	_stateBeforeDoctypeName(cp) {
		if (isAsciiUpper(cp)) {
			this._createDoctypeToken(String.fromCharCode(toAsciiLower(cp)));
			this.state = State.DOCTYPE_NAME;
		} else switch (cp) {
			case CODE_POINTS.SPACE:
			case CODE_POINTS.LINE_FEED:
			case CODE_POINTS.TABULATION:
			case CODE_POINTS.FORM_FEED: break;
			case CODE_POINTS.NULL:
				this._err(ERR.unexpectedNullCharacter);
				this._createDoctypeToken("�");
				this.state = State.DOCTYPE_NAME;
				break;
			case CODE_POINTS.GREATER_THAN_SIGN: {
				this._err(ERR.missingDoctypeName);
				this._createDoctypeToken(null);
				const token = this.currentToken;
				token.forceQuirks = true;
				this.emitCurrentDoctype(token);
				this.state = State.DATA;
				break;
			}
			case CODE_POINTS.EOF: {
				this._err(ERR.eofInDoctype);
				this._createDoctypeToken(null);
				const token = this.currentToken;
				token.forceQuirks = true;
				this.emitCurrentDoctype(token);
				this._emitEOFToken();
				break;
			}
			default:
				this._createDoctypeToken(String.fromCodePoint(cp));
				this.state = State.DOCTYPE_NAME;
		}
	}
	_stateDoctypeName(cp) {
		const token = this.currentToken;
		switch (cp) {
			case CODE_POINTS.SPACE:
			case CODE_POINTS.LINE_FEED:
			case CODE_POINTS.TABULATION:
			case CODE_POINTS.FORM_FEED:
				this.state = State.AFTER_DOCTYPE_NAME;
				break;
			case CODE_POINTS.GREATER_THAN_SIGN:
				this.state = State.DATA;
				this.emitCurrentDoctype(token);
				break;
			case CODE_POINTS.NULL:
				this._err(ERR.unexpectedNullCharacter);
				token.name += "�";
				break;
			case CODE_POINTS.EOF:
				this._err(ERR.eofInDoctype);
				token.forceQuirks = true;
				this.emitCurrentDoctype(token);
				this._emitEOFToken();
				break;
			default: token.name += String.fromCodePoint(isAsciiUpper(cp) ? toAsciiLower(cp) : cp);
		}
	}
	_stateAfterDoctypeName(cp) {
		const token = this.currentToken;
		switch (cp) {
			case CODE_POINTS.SPACE:
			case CODE_POINTS.LINE_FEED:
			case CODE_POINTS.TABULATION:
			case CODE_POINTS.FORM_FEED: break;
			case CODE_POINTS.GREATER_THAN_SIGN:
				this.state = State.DATA;
				this.emitCurrentDoctype(token);
				break;
			case CODE_POINTS.EOF:
				this._err(ERR.eofInDoctype);
				token.forceQuirks = true;
				this.emitCurrentDoctype(token);
				this._emitEOFToken();
				break;
			default: if (this._consumeSequenceIfMatch(SEQUENCES.PUBLIC, false)) this.state = State.AFTER_DOCTYPE_PUBLIC_KEYWORD;
			else if (this._consumeSequenceIfMatch(SEQUENCES.SYSTEM, false)) this.state = State.AFTER_DOCTYPE_SYSTEM_KEYWORD;
			else if (!this._ensureHibernation()) {
				this._err(ERR.invalidCharacterSequenceAfterDoctypeName);
				token.forceQuirks = true;
				this.state = State.BOGUS_DOCTYPE;
				this._stateBogusDoctype(cp);
			}
		}
	}
	_stateAfterDoctypePublicKeyword(cp) {
		const token = this.currentToken;
		switch (cp) {
			case CODE_POINTS.SPACE:
			case CODE_POINTS.LINE_FEED:
			case CODE_POINTS.TABULATION:
			case CODE_POINTS.FORM_FEED:
				this.state = State.BEFORE_DOCTYPE_PUBLIC_IDENTIFIER;
				break;
			case CODE_POINTS.QUOTATION_MARK:
				this._err(ERR.missingWhitespaceAfterDoctypePublicKeyword);
				token.publicId = "";
				this.state = State.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED;
				break;
			case CODE_POINTS.APOSTROPHE:
				this._err(ERR.missingWhitespaceAfterDoctypePublicKeyword);
				token.publicId = "";
				this.state = State.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED;
				break;
			case CODE_POINTS.GREATER_THAN_SIGN:
				this._err(ERR.missingDoctypePublicIdentifier);
				token.forceQuirks = true;
				this.state = State.DATA;
				this.emitCurrentDoctype(token);
				break;
			case CODE_POINTS.EOF:
				this._err(ERR.eofInDoctype);
				token.forceQuirks = true;
				this.emitCurrentDoctype(token);
				this._emitEOFToken();
				break;
			default:
				this._err(ERR.missingQuoteBeforeDoctypePublicIdentifier);
				token.forceQuirks = true;
				this.state = State.BOGUS_DOCTYPE;
				this._stateBogusDoctype(cp);
		}
	}
	_stateBeforeDoctypePublicIdentifier(cp) {
		const token = this.currentToken;
		switch (cp) {
			case CODE_POINTS.SPACE:
			case CODE_POINTS.LINE_FEED:
			case CODE_POINTS.TABULATION:
			case CODE_POINTS.FORM_FEED: break;
			case CODE_POINTS.QUOTATION_MARK:
				token.publicId = "";
				this.state = State.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED;
				break;
			case CODE_POINTS.APOSTROPHE:
				token.publicId = "";
				this.state = State.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED;
				break;
			case CODE_POINTS.GREATER_THAN_SIGN:
				this._err(ERR.missingDoctypePublicIdentifier);
				token.forceQuirks = true;
				this.state = State.DATA;
				this.emitCurrentDoctype(token);
				break;
			case CODE_POINTS.EOF:
				this._err(ERR.eofInDoctype);
				token.forceQuirks = true;
				this.emitCurrentDoctype(token);
				this._emitEOFToken();
				break;
			default:
				this._err(ERR.missingQuoteBeforeDoctypePublicIdentifier);
				token.forceQuirks = true;
				this.state = State.BOGUS_DOCTYPE;
				this._stateBogusDoctype(cp);
		}
	}
	_stateDoctypePublicIdentifierDoubleQuoted(cp) {
		const token = this.currentToken;
		switch (cp) {
			case CODE_POINTS.QUOTATION_MARK:
				this.state = State.AFTER_DOCTYPE_PUBLIC_IDENTIFIER;
				break;
			case CODE_POINTS.NULL:
				this._err(ERR.unexpectedNullCharacter);
				token.publicId += "�";
				break;
			case CODE_POINTS.GREATER_THAN_SIGN:
				this._err(ERR.abruptDoctypePublicIdentifier);
				token.forceQuirks = true;
				this.emitCurrentDoctype(token);
				this.state = State.DATA;
				break;
			case CODE_POINTS.EOF:
				this._err(ERR.eofInDoctype);
				token.forceQuirks = true;
				this.emitCurrentDoctype(token);
				this._emitEOFToken();
				break;
			default: token.publicId += String.fromCodePoint(cp);
		}
	}
	_stateDoctypePublicIdentifierSingleQuoted(cp) {
		const token = this.currentToken;
		switch (cp) {
			case CODE_POINTS.APOSTROPHE:
				this.state = State.AFTER_DOCTYPE_PUBLIC_IDENTIFIER;
				break;
			case CODE_POINTS.NULL:
				this._err(ERR.unexpectedNullCharacter);
				token.publicId += "�";
				break;
			case CODE_POINTS.GREATER_THAN_SIGN:
				this._err(ERR.abruptDoctypePublicIdentifier);
				token.forceQuirks = true;
				this.emitCurrentDoctype(token);
				this.state = State.DATA;
				break;
			case CODE_POINTS.EOF:
				this._err(ERR.eofInDoctype);
				token.forceQuirks = true;
				this.emitCurrentDoctype(token);
				this._emitEOFToken();
				break;
			default: token.publicId += String.fromCodePoint(cp);
		}
	}
	_stateAfterDoctypePublicIdentifier(cp) {
		const token = this.currentToken;
		switch (cp) {
			case CODE_POINTS.SPACE:
			case CODE_POINTS.LINE_FEED:
			case CODE_POINTS.TABULATION:
			case CODE_POINTS.FORM_FEED:
				this.state = State.BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS;
				break;
			case CODE_POINTS.GREATER_THAN_SIGN:
				this.state = State.DATA;
				this.emitCurrentDoctype(token);
				break;
			case CODE_POINTS.QUOTATION_MARK:
				this._err(ERR.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers);
				token.systemId = "";
				this.state = State.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
				break;
			case CODE_POINTS.APOSTROPHE:
				this._err(ERR.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers);
				token.systemId = "";
				this.state = State.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
				break;
			case CODE_POINTS.EOF:
				this._err(ERR.eofInDoctype);
				token.forceQuirks = true;
				this.emitCurrentDoctype(token);
				this._emitEOFToken();
				break;
			default:
				this._err(ERR.missingQuoteBeforeDoctypeSystemIdentifier);
				token.forceQuirks = true;
				this.state = State.BOGUS_DOCTYPE;
				this._stateBogusDoctype(cp);
		}
	}
	_stateBetweenDoctypePublicAndSystemIdentifiers(cp) {
		const token = this.currentToken;
		switch (cp) {
			case CODE_POINTS.SPACE:
			case CODE_POINTS.LINE_FEED:
			case CODE_POINTS.TABULATION:
			case CODE_POINTS.FORM_FEED: break;
			case CODE_POINTS.GREATER_THAN_SIGN:
				this.emitCurrentDoctype(token);
				this.state = State.DATA;
				break;
			case CODE_POINTS.QUOTATION_MARK:
				token.systemId = "";
				this.state = State.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
				break;
			case CODE_POINTS.APOSTROPHE:
				token.systemId = "";
				this.state = State.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
				break;
			case CODE_POINTS.EOF:
				this._err(ERR.eofInDoctype);
				token.forceQuirks = true;
				this.emitCurrentDoctype(token);
				this._emitEOFToken();
				break;
			default:
				this._err(ERR.missingQuoteBeforeDoctypeSystemIdentifier);
				token.forceQuirks = true;
				this.state = State.BOGUS_DOCTYPE;
				this._stateBogusDoctype(cp);
		}
	}
	_stateAfterDoctypeSystemKeyword(cp) {
		const token = this.currentToken;
		switch (cp) {
			case CODE_POINTS.SPACE:
			case CODE_POINTS.LINE_FEED:
			case CODE_POINTS.TABULATION:
			case CODE_POINTS.FORM_FEED:
				this.state = State.BEFORE_DOCTYPE_SYSTEM_IDENTIFIER;
				break;
			case CODE_POINTS.QUOTATION_MARK:
				this._err(ERR.missingWhitespaceAfterDoctypeSystemKeyword);
				token.systemId = "";
				this.state = State.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
				break;
			case CODE_POINTS.APOSTROPHE:
				this._err(ERR.missingWhitespaceAfterDoctypeSystemKeyword);
				token.systemId = "";
				this.state = State.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
				break;
			case CODE_POINTS.GREATER_THAN_SIGN:
				this._err(ERR.missingDoctypeSystemIdentifier);
				token.forceQuirks = true;
				this.state = State.DATA;
				this.emitCurrentDoctype(token);
				break;
			case CODE_POINTS.EOF:
				this._err(ERR.eofInDoctype);
				token.forceQuirks = true;
				this.emitCurrentDoctype(token);
				this._emitEOFToken();
				break;
			default:
				this._err(ERR.missingQuoteBeforeDoctypeSystemIdentifier);
				token.forceQuirks = true;
				this.state = State.BOGUS_DOCTYPE;
				this._stateBogusDoctype(cp);
		}
	}
	_stateBeforeDoctypeSystemIdentifier(cp) {
		const token = this.currentToken;
		switch (cp) {
			case CODE_POINTS.SPACE:
			case CODE_POINTS.LINE_FEED:
			case CODE_POINTS.TABULATION:
			case CODE_POINTS.FORM_FEED: break;
			case CODE_POINTS.QUOTATION_MARK:
				token.systemId = "";
				this.state = State.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
				break;
			case CODE_POINTS.APOSTROPHE:
				token.systemId = "";
				this.state = State.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
				break;
			case CODE_POINTS.GREATER_THAN_SIGN:
				this._err(ERR.missingDoctypeSystemIdentifier);
				token.forceQuirks = true;
				this.state = State.DATA;
				this.emitCurrentDoctype(token);
				break;
			case CODE_POINTS.EOF:
				this._err(ERR.eofInDoctype);
				token.forceQuirks = true;
				this.emitCurrentDoctype(token);
				this._emitEOFToken();
				break;
			default:
				this._err(ERR.missingQuoteBeforeDoctypeSystemIdentifier);
				token.forceQuirks = true;
				this.state = State.BOGUS_DOCTYPE;
				this._stateBogusDoctype(cp);
		}
	}
	_stateDoctypeSystemIdentifierDoubleQuoted(cp) {
		const token = this.currentToken;
		switch (cp) {
			case CODE_POINTS.QUOTATION_MARK:
				this.state = State.AFTER_DOCTYPE_SYSTEM_IDENTIFIER;
				break;
			case CODE_POINTS.NULL:
				this._err(ERR.unexpectedNullCharacter);
				token.systemId += "�";
				break;
			case CODE_POINTS.GREATER_THAN_SIGN:
				this._err(ERR.abruptDoctypeSystemIdentifier);
				token.forceQuirks = true;
				this.emitCurrentDoctype(token);
				this.state = State.DATA;
				break;
			case CODE_POINTS.EOF:
				this._err(ERR.eofInDoctype);
				token.forceQuirks = true;
				this.emitCurrentDoctype(token);
				this._emitEOFToken();
				break;
			default: token.systemId += String.fromCodePoint(cp);
		}
	}
	_stateDoctypeSystemIdentifierSingleQuoted(cp) {
		const token = this.currentToken;
		switch (cp) {
			case CODE_POINTS.APOSTROPHE:
				this.state = State.AFTER_DOCTYPE_SYSTEM_IDENTIFIER;
				break;
			case CODE_POINTS.NULL:
				this._err(ERR.unexpectedNullCharacter);
				token.systemId += "�";
				break;
			case CODE_POINTS.GREATER_THAN_SIGN:
				this._err(ERR.abruptDoctypeSystemIdentifier);
				token.forceQuirks = true;
				this.emitCurrentDoctype(token);
				this.state = State.DATA;
				break;
			case CODE_POINTS.EOF:
				this._err(ERR.eofInDoctype);
				token.forceQuirks = true;
				this.emitCurrentDoctype(token);
				this._emitEOFToken();
				break;
			default: token.systemId += String.fromCodePoint(cp);
		}
	}
	_stateAfterDoctypeSystemIdentifier(cp) {
		const token = this.currentToken;
		switch (cp) {
			case CODE_POINTS.SPACE:
			case CODE_POINTS.LINE_FEED:
			case CODE_POINTS.TABULATION:
			case CODE_POINTS.FORM_FEED: break;
			case CODE_POINTS.GREATER_THAN_SIGN:
				this.emitCurrentDoctype(token);
				this.state = State.DATA;
				break;
			case CODE_POINTS.EOF:
				this._err(ERR.eofInDoctype);
				token.forceQuirks = true;
				this.emitCurrentDoctype(token);
				this._emitEOFToken();
				break;
			default:
				this._err(ERR.unexpectedCharacterAfterDoctypeSystemIdentifier);
				this.state = State.BOGUS_DOCTYPE;
				this._stateBogusDoctype(cp);
		}
	}
	_stateBogusDoctype(cp) {
		const token = this.currentToken;
		switch (cp) {
			case CODE_POINTS.GREATER_THAN_SIGN:
				this.emitCurrentDoctype(token);
				this.state = State.DATA;
				break;
			case CODE_POINTS.NULL:
				this._err(ERR.unexpectedNullCharacter);
				break;
			case CODE_POINTS.EOF:
				this.emitCurrentDoctype(token);
				this._emitEOFToken();
		}
	}
	_stateCdataSection(cp) {
		switch (cp) {
			case CODE_POINTS.RIGHT_SQUARE_BRACKET:
				this.state = State.CDATA_SECTION_BRACKET;
				break;
			case CODE_POINTS.EOF:
				this._err(ERR.eofInCdata);
				this._emitEOFToken();
				break;
			default: this._emitCodePoint(cp);
		}
	}
	_stateCdataSectionBracket(cp) {
		if (cp === CODE_POINTS.RIGHT_SQUARE_BRACKET) this.state = State.CDATA_SECTION_END;
		else {
			this._emitChars("]");
			this.state = State.CDATA_SECTION;
			this._stateCdataSection(cp);
		}
	}
	_stateCdataSectionEnd(cp) {
		switch (cp) {
			case CODE_POINTS.GREATER_THAN_SIGN:
				this.state = State.DATA;
				break;
			case CODE_POINTS.RIGHT_SQUARE_BRACKET:
				this._emitChars("]");
				break;
			default:
				this._emitChars("]]");
				this.state = State.CDATA_SECTION;
				this._stateCdataSection(cp);
		}
	}
	_stateCharacterReference() {
		let length = this.entityDecoder.write(this.preprocessor.html, this.preprocessor.pos);
		if (length < 0) {
			if (this.preprocessor.lastChunkWritten) length = this.entityDecoder.end();
			else {
				this.active = false;
				this.preprocessor.pos = this.preprocessor.html.length - 1;
				this.consumedAfterSnapshot = 0;
				this.preprocessor.endOfChunkHit = true;
				return;
			}
		}
		if (length === 0) {
			this.preprocessor.pos = this.entityStartPos;
			this._flushCodePointConsumedAsCharacterReference(CODE_POINTS.AMPERSAND);
			this.state = !this._isCharacterReferenceInAttribute() && isAsciiAlphaNumeric(this.preprocessor.peek(1)) ? State.AMBIGUOUS_AMPERSAND : this.returnState;
		} else this.state = this.returnState;
	}
	_stateAmbiguousAmpersand(cp) {
		if (isAsciiAlphaNumeric(cp)) this._flushCodePointConsumedAsCharacterReference(cp);
		else {
			if (cp === CODE_POINTS.SEMICOLON) this._err(ERR.unknownNamedCharacterReference);
			this.state = this.returnState;
			this._callState(cp);
		}
	}
};
//#endregion
//#region node_modules/.pnpm/parse5@8.0.1/node_modules/parse5/dist/parser/open-element-stack.js
const IMPLICIT_END_TAG_REQUIRED = /* @__PURE__ */ new Set([
	TAG_ID.DD,
	TAG_ID.DT,
	TAG_ID.LI,
	TAG_ID.OPTGROUP,
	TAG_ID.OPTION,
	TAG_ID.P,
	TAG_ID.RB,
	TAG_ID.RP,
	TAG_ID.RT,
	TAG_ID.RTC
]);
const IMPLICIT_END_TAG_REQUIRED_THOROUGHLY = /* @__PURE__ */ new Set([
	...IMPLICIT_END_TAG_REQUIRED,
	TAG_ID.CAPTION,
	TAG_ID.COLGROUP,
	TAG_ID.TBODY,
	TAG_ID.TD,
	TAG_ID.TFOOT,
	TAG_ID.TH,
	TAG_ID.THEAD,
	TAG_ID.TR
]);
const SCOPING_ELEMENTS_HTML = /* @__PURE__ */ new Set([
	TAG_ID.APPLET,
	TAG_ID.CAPTION,
	TAG_ID.HTML,
	TAG_ID.MARQUEE,
	TAG_ID.OBJECT,
	TAG_ID.TABLE,
	TAG_ID.TD,
	TAG_ID.TEMPLATE,
	TAG_ID.TH
]);
const SCOPING_ELEMENTS_HTML_LIST = /* @__PURE__ */ new Set([
	...SCOPING_ELEMENTS_HTML,
	TAG_ID.OL,
	TAG_ID.UL
]);
const SCOPING_ELEMENTS_HTML_BUTTON = /* @__PURE__ */ new Set([...SCOPING_ELEMENTS_HTML, TAG_ID.BUTTON]);
const SCOPING_ELEMENTS_MATHML = /* @__PURE__ */ new Set([
	TAG_ID.ANNOTATION_XML,
	TAG_ID.MI,
	TAG_ID.MN,
	TAG_ID.MO,
	TAG_ID.MS,
	TAG_ID.MTEXT
]);
const SCOPING_ELEMENTS_SVG = /* @__PURE__ */ new Set([
	TAG_ID.DESC,
	TAG_ID.FOREIGN_OBJECT,
	TAG_ID.TITLE
]);
const TABLE_ROW_CONTEXT = /* @__PURE__ */ new Set([
	TAG_ID.TR,
	TAG_ID.TEMPLATE,
	TAG_ID.HTML
]);
const TABLE_BODY_CONTEXT = /* @__PURE__ */ new Set([
	TAG_ID.TBODY,
	TAG_ID.TFOOT,
	TAG_ID.THEAD,
	TAG_ID.TEMPLATE,
	TAG_ID.HTML
]);
const TABLE_CONTEXT = /* @__PURE__ */ new Set([
	TAG_ID.TABLE,
	TAG_ID.TEMPLATE,
	TAG_ID.HTML
]);
const TABLE_CELLS = /* @__PURE__ */ new Set([TAG_ID.TD, TAG_ID.TH]);
var OpenElementStack = class {
	get currentTmplContentOrNode() {
		return this._isInTemplate() ? this.treeAdapter.getTemplateContent(this.current) : this.current;
	}
	constructor(document, treeAdapter, handler) {
		this.treeAdapter = treeAdapter;
		this.handler = handler;
		this.items = [];
		this.tagIDs = [];
		this.stackTop = -1;
		this.tmplCount = 0;
		this.currentTagId = TAG_ID.UNKNOWN;
		this.current = document;
	}
	_indexOf(element) {
		return this.items.lastIndexOf(element, this.stackTop);
	}
	_isInTemplate() {
		return this.currentTagId === TAG_ID.TEMPLATE && this.treeAdapter.getNamespaceURI(this.current) === NS.HTML;
	}
	_updateCurrentElement() {
		this.current = this.items[this.stackTop];
		this.currentTagId = this.tagIDs[this.stackTop];
	}
	push(element, tagID) {
		this.stackTop++;
		this.items[this.stackTop] = element;
		this.current = element;
		this.tagIDs[this.stackTop] = tagID;
		this.currentTagId = tagID;
		if (this._isInTemplate()) this.tmplCount++;
		this.handler.onItemPush(element, tagID, true);
	}
	pop() {
		const popped = this.current;
		if (this.tmplCount > 0 && this._isInTemplate()) this.tmplCount--;
		this.stackTop--;
		this._updateCurrentElement();
		this.handler.onItemPop(popped, true);
	}
	replace(oldElement, newElement) {
		const idx = this._indexOf(oldElement);
		this.items[idx] = newElement;
		if (idx === this.stackTop) this.current = newElement;
	}
	insertAfter(referenceElement, newElement, newElementID) {
		const insertionIdx = this._indexOf(referenceElement) + 1;
		this.items.splice(insertionIdx, 0, newElement);
		this.tagIDs.splice(insertionIdx, 0, newElementID);
		this.stackTop++;
		if (insertionIdx === this.stackTop) this._updateCurrentElement();
		if (this.current && this.currentTagId !== void 0) this.handler.onItemPush(this.current, this.currentTagId, insertionIdx === this.stackTop);
	}
	popUntilTagNamePopped(tagName) {
		let targetIdx = this.stackTop + 1;
		do
			targetIdx = this.tagIDs.lastIndexOf(tagName, targetIdx - 1);
		while (targetIdx > 0 && this.treeAdapter.getNamespaceURI(this.items[targetIdx]) !== NS.HTML);
		this.shortenToLength(Math.max(targetIdx, 0));
	}
	shortenToLength(idx) {
		while (this.stackTop >= idx) {
			const popped = this.current;
			if (this.tmplCount > 0 && this._isInTemplate()) this.tmplCount -= 1;
			this.stackTop--;
			this._updateCurrentElement();
			this.handler.onItemPop(popped, this.stackTop < idx);
		}
	}
	popUntilElementPopped(element) {
		const idx = this._indexOf(element);
		this.shortenToLength(Math.max(idx, 0));
	}
	popUntilPopped(tagNames, targetNS) {
		const idx = this._indexOfTagNames(tagNames, targetNS);
		this.shortenToLength(Math.max(idx, 0));
	}
	popUntilNumberedHeaderPopped() {
		this.popUntilPopped(NUMBERED_HEADERS, NS.HTML);
	}
	popUntilTableCellPopped() {
		this.popUntilPopped(TABLE_CELLS, NS.HTML);
	}
	popAllUpToHtmlElement() {
		this.tmplCount = 0;
		this.shortenToLength(1);
	}
	_indexOfTagNames(tagNames, namespace) {
		for (let i = this.stackTop; i >= 0; i--) if (tagNames.has(this.tagIDs[i]) && this.treeAdapter.getNamespaceURI(this.items[i]) === namespace) return i;
		return -1;
	}
	clearBackTo(tagNames, targetNS) {
		const idx = this._indexOfTagNames(tagNames, targetNS);
		this.shortenToLength(idx + 1);
	}
	clearBackToTableContext() {
		this.clearBackTo(TABLE_CONTEXT, NS.HTML);
	}
	clearBackToTableBodyContext() {
		this.clearBackTo(TABLE_BODY_CONTEXT, NS.HTML);
	}
	clearBackToTableRowContext() {
		this.clearBackTo(TABLE_ROW_CONTEXT, NS.HTML);
	}
	remove(element) {
		const idx = this._indexOf(element);
		if (idx >= 0) {
			if (idx === this.stackTop) this.pop();
			else {
				this.items.splice(idx, 1);
				this.tagIDs.splice(idx, 1);
				this.stackTop--;
				this._updateCurrentElement();
				this.handler.onItemPop(element, false);
			}
		}
	}
	tryPeekProperlyNestedBodyElement() {
		return this.stackTop >= 1 && this.tagIDs[1] === TAG_ID.BODY ? this.items[1] : null;
	}
	contains(element) {
		return this._indexOf(element) > -1;
	}
	getCommonAncestor(element) {
		const elementIdx = this._indexOf(element) - 1;
		return elementIdx >= 0 ? this.items[elementIdx] : null;
	}
	isRootHtmlElementCurrent() {
		return this.stackTop === 0 && this.tagIDs[0] === TAG_ID.HTML;
	}
	hasInDynamicScope(tagName, htmlScope) {
		for (let i = this.stackTop; i >= 0; i--) {
			const tn = this.tagIDs[i];
			switch (this.treeAdapter.getNamespaceURI(this.items[i])) {
				case NS.HTML:
					if (tn === tagName) return true;
					if (htmlScope.has(tn)) return false;
					break;
				case NS.SVG:
					if (SCOPING_ELEMENTS_SVG.has(tn)) return false;
					break;
				case NS.MATHML: if (SCOPING_ELEMENTS_MATHML.has(tn)) return false;
			}
		}
		return true;
	}
	hasInScope(tagName) {
		return this.hasInDynamicScope(tagName, SCOPING_ELEMENTS_HTML);
	}
	hasInListItemScope(tagName) {
		return this.hasInDynamicScope(tagName, SCOPING_ELEMENTS_HTML_LIST);
	}
	hasInButtonScope(tagName) {
		return this.hasInDynamicScope(tagName, SCOPING_ELEMENTS_HTML_BUTTON);
	}
	hasNumberedHeaderInScope() {
		for (let i = this.stackTop; i >= 0; i--) {
			const tn = this.tagIDs[i];
			switch (this.treeAdapter.getNamespaceURI(this.items[i])) {
				case NS.HTML:
					if (NUMBERED_HEADERS.has(tn)) return true;
					if (SCOPING_ELEMENTS_HTML.has(tn)) return false;
					break;
				case NS.SVG:
					if (SCOPING_ELEMENTS_SVG.has(tn)) return false;
					break;
				case NS.MATHML: if (SCOPING_ELEMENTS_MATHML.has(tn)) return false;
			}
		}
		return true;
	}
	hasInTableScope(tagName) {
		for (let i = this.stackTop; i >= 0; i--) {
			if (this.treeAdapter.getNamespaceURI(this.items[i]) !== NS.HTML) continue;
			switch (this.tagIDs[i]) {
				case tagName: return true;
				case TAG_ID.TABLE:
				case TAG_ID.HTML: return false;
			}
		}
		return true;
	}
	hasTableBodyContextInTableScope() {
		for (let i = this.stackTop; i >= 0; i--) {
			if (this.treeAdapter.getNamespaceURI(this.items[i]) !== NS.HTML) continue;
			switch (this.tagIDs[i]) {
				case TAG_ID.TBODY:
				case TAG_ID.THEAD:
				case TAG_ID.TFOOT: return true;
				case TAG_ID.TABLE:
				case TAG_ID.HTML: return false;
			}
		}
		return true;
	}
	hasInSelectScope(tagName) {
		for (let i = this.stackTop; i >= 0; i--) {
			if (this.treeAdapter.getNamespaceURI(this.items[i]) !== NS.HTML) continue;
			switch (this.tagIDs[i]) {
				case tagName: return true;
				case TAG_ID.OPTION:
				case TAG_ID.OPTGROUP: break;
				default: return false;
			}
		}
		return true;
	}
	generateImpliedEndTags() {
		while (this.currentTagId !== void 0 && IMPLICIT_END_TAG_REQUIRED.has(this.currentTagId)) this.pop();
	}
	generateImpliedEndTagsThoroughly() {
		while (this.currentTagId !== void 0 && IMPLICIT_END_TAG_REQUIRED_THOROUGHLY.has(this.currentTagId)) this.pop();
	}
	generateImpliedEndTagsWithExclusion(exclusionId) {
		while (this.currentTagId !== void 0 && this.currentTagId !== exclusionId && IMPLICIT_END_TAG_REQUIRED_THOROUGHLY.has(this.currentTagId)) this.pop();
	}
};
//#endregion
//#region node_modules/.pnpm/parse5@8.0.1/node_modules/parse5/dist/parser/formatting-element-list.js
const NOAH_ARK_CAPACITY = 3;
var EntryType;
(function(EntryType) {
	EntryType[EntryType["Marker"] = 0] = "Marker";
	EntryType[EntryType["Element"] = 1] = "Element";
})(EntryType || (EntryType = {}));
const MARKER = { type: EntryType.Marker };
var FormattingElementList = class {
	constructor(treeAdapter) {
		this.treeAdapter = treeAdapter;
		this.entries = [];
		this.bookmark = null;
	}
	_getNoahArkConditionCandidates(newElement, neAttrs) {
		const candidates = [];
		const neAttrsLength = neAttrs.length;
		const neTagName = this.treeAdapter.getTagName(newElement);
		const neNamespaceURI = this.treeAdapter.getNamespaceURI(newElement);
		for (let i = 0; i < this.entries.length; i++) {
			const entry = this.entries[i];
			if (entry.type === EntryType.Marker) break;
			const { element } = entry;
			if (this.treeAdapter.getTagName(element) === neTagName && this.treeAdapter.getNamespaceURI(element) === neNamespaceURI) {
				const elementAttrs = this.treeAdapter.getAttrList(element);
				if (elementAttrs.length === neAttrsLength) candidates.push({
					idx: i,
					attrs: elementAttrs
				});
			}
		}
		return candidates;
	}
	_ensureNoahArkCondition(newElement) {
		if (this.entries.length < NOAH_ARK_CAPACITY) return;
		const neAttrs = this.treeAdapter.getAttrList(newElement);
		const candidates = this._getNoahArkConditionCandidates(newElement, neAttrs);
		if (candidates.length < NOAH_ARK_CAPACITY) return;
		const neAttrsMap = new Map(neAttrs.map((neAttr) => [neAttr.name, neAttr.value]));
		let validCandidates = 0;
		for (let i = 0; i < candidates.length; i++) {
			const candidate = candidates[i];
			if (candidate.attrs.every((cAttr) => neAttrsMap.get(cAttr.name) === cAttr.value)) {
				validCandidates += 1;
				if (validCandidates >= NOAH_ARK_CAPACITY) this.entries.splice(candidate.idx, 1);
			}
		}
	}
	insertMarker() {
		this.entries.unshift(MARKER);
	}
	pushElement(element, token) {
		this._ensureNoahArkCondition(element);
		this.entries.unshift({
			type: EntryType.Element,
			element,
			token
		});
	}
	insertElementAfterBookmark(element, token) {
		const bookmarkIdx = this.entries.indexOf(this.bookmark);
		this.entries.splice(bookmarkIdx, 0, {
			type: EntryType.Element,
			element,
			token
		});
	}
	removeEntry(entry) {
		const entryIndex = this.entries.indexOf(entry);
		if (entryIndex !== -1) this.entries.splice(entryIndex, 1);
	}
	/**
	* Clears the list of formatting elements up to the last marker.
	*
	* @see https://html.spec.whatwg.org/multipage/parsing.html#clear-the-list-of-active-formatting-elements-up-to-the-last-marker
	*/
	clearToLastMarker() {
		const markerIdx = this.entries.indexOf(MARKER);
		if (markerIdx === -1) this.entries.length = 0;
		else this.entries.splice(0, markerIdx + 1);
	}
	getElementEntryInScopeWithTagName(tagName) {
		const entry = this.entries.find((entry) => entry.type === EntryType.Marker || this.treeAdapter.getTagName(entry.element) === tagName);
		return entry && entry.type === EntryType.Element ? entry : null;
	}
	getElementEntry(element) {
		return this.entries.find((entry) => entry.type === EntryType.Element && entry.element === element);
	}
};
//#endregion
//#region node_modules/.pnpm/parse5@8.0.1/node_modules/parse5/dist/tree-adapters/default.js
const defaultTreeAdapter = {
	createDocument() {
		return {
			nodeName: "#document",
			mode: DOCUMENT_MODE.NO_QUIRKS,
			childNodes: []
		};
	},
	createDocumentFragment() {
		return {
			nodeName: "#document-fragment",
			childNodes: []
		};
	},
	createElement(tagName, namespaceURI, attrs) {
		return {
			nodeName: tagName,
			tagName,
			attrs,
			namespaceURI,
			childNodes: [],
			parentNode: null
		};
	},
	createCommentNode(data) {
		return {
			nodeName: "#comment",
			data,
			parentNode: null
		};
	},
	createTextNode(value) {
		return {
			nodeName: "#text",
			value,
			parentNode: null
		};
	},
	appendChild(parentNode, newNode) {
		parentNode.childNodes.push(newNode);
		newNode.parentNode = parentNode;
	},
	insertBefore(parentNode, newNode, referenceNode) {
		const insertionIdx = parentNode.childNodes.indexOf(referenceNode);
		parentNode.childNodes.splice(insertionIdx, 0, newNode);
		newNode.parentNode = parentNode;
	},
	setTemplateContent(templateElement, contentElement) {
		templateElement.content = contentElement;
	},
	getTemplateContent(templateElement) {
		return templateElement.content;
	},
	setDocumentType(document, name, publicId, systemId) {
		const doctypeNode = document.childNodes.find((node) => node.nodeName === "#documentType");
		if (doctypeNode) {
			doctypeNode.name = name;
			doctypeNode.publicId = publicId;
			doctypeNode.systemId = systemId;
		} else {
			const node = {
				nodeName: "#documentType",
				name,
				publicId,
				systemId,
				parentNode: null
			};
			defaultTreeAdapter.appendChild(document, node);
		}
	},
	setDocumentMode(document, mode) {
		document.mode = mode;
	},
	getDocumentMode(document) {
		return document.mode;
	},
	detachNode(node) {
		if (node.parentNode) {
			const idx = node.parentNode.childNodes.indexOf(node);
			node.parentNode.childNodes.splice(idx, 1);
			node.parentNode = null;
		}
	},
	insertText(parentNode, text) {
		if (parentNode.childNodes.length > 0) {
			const prevNode = parentNode.childNodes[parentNode.childNodes.length - 1];
			if (defaultTreeAdapter.isTextNode(prevNode)) {
				prevNode.value += text;
				return;
			}
		}
		defaultTreeAdapter.appendChild(parentNode, defaultTreeAdapter.createTextNode(text));
	},
	insertTextBefore(parentNode, text, referenceNode) {
		const prevNode = parentNode.childNodes[parentNode.childNodes.indexOf(referenceNode) - 1];
		if (prevNode && defaultTreeAdapter.isTextNode(prevNode)) prevNode.value += text;
		else defaultTreeAdapter.insertBefore(parentNode, defaultTreeAdapter.createTextNode(text), referenceNode);
	},
	adoptAttributes(recipient, attrs) {
		const recipientAttrsMap = new Set(recipient.attrs.map((attr) => attr.name));
		for (let j = 0; j < attrs.length; j++) if (!recipientAttrsMap.has(attrs[j].name)) recipient.attrs.push(attrs[j]);
	},
	getFirstChild(node) {
		return node.childNodes[0];
	},
	getChildNodes(node) {
		return node.childNodes;
	},
	getParentNode(node) {
		return node.parentNode;
	},
	getAttrList(element) {
		return element.attrs;
	},
	getTagName(element) {
		return element.tagName;
	},
	getNamespaceURI(element) {
		return element.namespaceURI;
	},
	getTextNodeContent(textNode) {
		return textNode.value;
	},
	getCommentNodeContent(commentNode) {
		return commentNode.data;
	},
	getDocumentTypeNodeName(doctypeNode) {
		return doctypeNode.name;
	},
	getDocumentTypeNodePublicId(doctypeNode) {
		return doctypeNode.publicId;
	},
	getDocumentTypeNodeSystemId(doctypeNode) {
		return doctypeNode.systemId;
	},
	isTextNode(node) {
		return node.nodeName === "#text";
	},
	isCommentNode(node) {
		return node.nodeName === "#comment";
	},
	isDocumentTypeNode(node) {
		return node.nodeName === "#documentType";
	},
	isElementNode(node) {
		return Object.prototype.hasOwnProperty.call(node, "tagName");
	},
	setNodeSourceCodeLocation(node, location) {
		node.sourceCodeLocation = location;
	},
	getNodeSourceCodeLocation(node) {
		return node.sourceCodeLocation;
	},
	updateNodeSourceCodeLocation(node, endLocation) {
		node.sourceCodeLocation = {
			...node.sourceCodeLocation,
			...endLocation
		};
	}
};
//#endregion
//#region node_modules/.pnpm/parse5@8.0.1/node_modules/parse5/dist/common/doctype.js
const VALID_DOCTYPE_NAME = "html";
const VALID_SYSTEM_ID = "about:legacy-compat";
const QUIRKS_MODE_SYSTEM_ID = "http://www.ibm.com/data/dtd/v11/ibmxhtml1-transitional.dtd";
const QUIRKS_MODE_PUBLIC_ID_PREFIXES = [
	"+//silmaril//dtd html pro v0r11 19970101//",
	"-//as//dtd html 3.0 aswedit + extensions//",
	"-//advasoft ltd//dtd html 3.0 aswedit + extensions//",
	"-//ietf//dtd html 2.0 level 1//",
	"-//ietf//dtd html 2.0 level 2//",
	"-//ietf//dtd html 2.0 strict level 1//",
	"-//ietf//dtd html 2.0 strict level 2//",
	"-//ietf//dtd html 2.0 strict//",
	"-//ietf//dtd html 2.0//",
	"-//ietf//dtd html 2.1e//",
	"-//ietf//dtd html 3.0//",
	"-//ietf//dtd html 3.2 final//",
	"-//ietf//dtd html 3.2//",
	"-//ietf//dtd html 3//",
	"-//ietf//dtd html level 0//",
	"-//ietf//dtd html level 1//",
	"-//ietf//dtd html level 2//",
	"-//ietf//dtd html level 3//",
	"-//ietf//dtd html strict level 0//",
	"-//ietf//dtd html strict level 1//",
	"-//ietf//dtd html strict level 2//",
	"-//ietf//dtd html strict level 3//",
	"-//ietf//dtd html strict//",
	"-//ietf//dtd html//",
	"-//metrius//dtd metrius presentational//",
	"-//microsoft//dtd internet explorer 2.0 html strict//",
	"-//microsoft//dtd internet explorer 2.0 html//",
	"-//microsoft//dtd internet explorer 2.0 tables//",
	"-//microsoft//dtd internet explorer 3.0 html strict//",
	"-//microsoft//dtd internet explorer 3.0 html//",
	"-//microsoft//dtd internet explorer 3.0 tables//",
	"-//netscape comm. corp.//dtd html//",
	"-//netscape comm. corp.//dtd strict html//",
	"-//o'reilly and associates//dtd html 2.0//",
	"-//o'reilly and associates//dtd html extended 1.0//",
	"-//o'reilly and associates//dtd html extended relaxed 1.0//",
	"-//sq//dtd html 2.0 hotmetal + extensions//",
	"-//softquad software//dtd hotmetal pro 6.0::19990601::extensions to html 4.0//",
	"-//softquad//dtd hotmetal pro 4.0::19971010::extensions to html 4.0//",
	"-//spyglass//dtd html 2.0 extended//",
	"-//sun microsystems corp.//dtd hotjava html//",
	"-//sun microsystems corp.//dtd hotjava strict html//",
	"-//w3c//dtd html 3 1995-03-24//",
	"-//w3c//dtd html 3.2 draft//",
	"-//w3c//dtd html 3.2 final//",
	"-//w3c//dtd html 3.2//",
	"-//w3c//dtd html 3.2s draft//",
	"-//w3c//dtd html 4.0 frameset//",
	"-//w3c//dtd html 4.0 transitional//",
	"-//w3c//dtd html experimental 19960712//",
	"-//w3c//dtd html experimental 970421//",
	"-//w3c//dtd w3 html//",
	"-//w3o//dtd w3 html 3.0//",
	"-//webtechs//dtd mozilla html 2.0//",
	"-//webtechs//dtd mozilla html//"
];
const QUIRKS_MODE_NO_SYSTEM_ID_PUBLIC_ID_PREFIXES = [
	...QUIRKS_MODE_PUBLIC_ID_PREFIXES,
	"-//w3c//dtd html 4.01 frameset//",
	"-//w3c//dtd html 4.01 transitional//"
];
const QUIRKS_MODE_PUBLIC_IDS = /* @__PURE__ */ new Set([
	"-//w3o//dtd w3 html strict 3.0//en//",
	"-/w3c/dtd html 4.0 transitional/en",
	"html"
]);
const LIMITED_QUIRKS_PUBLIC_ID_PREFIXES = ["-//w3c//dtd xhtml 1.0 frameset//", "-//w3c//dtd xhtml 1.0 transitional//"];
const LIMITED_QUIRKS_WITH_SYSTEM_ID_PUBLIC_ID_PREFIXES = [
	...LIMITED_QUIRKS_PUBLIC_ID_PREFIXES,
	"-//w3c//dtd html 4.01 frameset//",
	"-//w3c//dtd html 4.01 transitional//"
];
function hasPrefix(publicId, prefixes) {
	return prefixes.some((prefix) => publicId.startsWith(prefix));
}
function isConforming(token) {
	return token.name === VALID_DOCTYPE_NAME && token.publicId === null && (token.systemId === null || token.systemId === VALID_SYSTEM_ID);
}
function getDocumentMode(token) {
	if (token.name !== VALID_DOCTYPE_NAME) return DOCUMENT_MODE.QUIRKS;
	const { systemId } = token;
	if (systemId && systemId.toLowerCase() === QUIRKS_MODE_SYSTEM_ID) return DOCUMENT_MODE.QUIRKS;
	let { publicId } = token;
	if (publicId !== null) {
		publicId = publicId.toLowerCase();
		if (QUIRKS_MODE_PUBLIC_IDS.has(publicId)) return DOCUMENT_MODE.QUIRKS;
		let prefixes = systemId === null ? QUIRKS_MODE_NO_SYSTEM_ID_PUBLIC_ID_PREFIXES : QUIRKS_MODE_PUBLIC_ID_PREFIXES;
		if (hasPrefix(publicId, prefixes)) return DOCUMENT_MODE.QUIRKS;
		prefixes = systemId === null ? LIMITED_QUIRKS_PUBLIC_ID_PREFIXES : LIMITED_QUIRKS_WITH_SYSTEM_ID_PUBLIC_ID_PREFIXES;
		if (hasPrefix(publicId, prefixes)) return DOCUMENT_MODE.LIMITED_QUIRKS;
	}
	return DOCUMENT_MODE.NO_QUIRKS;
}
//#endregion
//#region node_modules/.pnpm/parse5@8.0.1/node_modules/parse5/dist/common/foreign-content.js
const MIME_TYPES = {
	TEXT_HTML: "text/html",
	APPLICATION_XML: "application/xhtml+xml"
};
const DEFINITION_URL_ATTR = "definitionurl";
const ADJUSTED_DEFINITION_URL_ATTR = "definitionURL";
const SVG_ATTRS_ADJUSTMENT_MAP = new Map([
	"attributeName",
	"attributeType",
	"baseFrequency",
	"baseProfile",
	"calcMode",
	"clipPathUnits",
	"diffuseConstant",
	"edgeMode",
	"filterUnits",
	"glyphRef",
	"gradientTransform",
	"gradientUnits",
	"kernelMatrix",
	"kernelUnitLength",
	"keyPoints",
	"keySplines",
	"keyTimes",
	"lengthAdjust",
	"limitingConeAngle",
	"markerHeight",
	"markerUnits",
	"markerWidth",
	"maskContentUnits",
	"maskUnits",
	"numOctaves",
	"pathLength",
	"patternContentUnits",
	"patternTransform",
	"patternUnits",
	"pointsAtX",
	"pointsAtY",
	"pointsAtZ",
	"preserveAlpha",
	"preserveAspectRatio",
	"primitiveUnits",
	"refX",
	"refY",
	"repeatCount",
	"repeatDur",
	"requiredExtensions",
	"requiredFeatures",
	"specularConstant",
	"specularExponent",
	"spreadMethod",
	"startOffset",
	"stdDeviation",
	"stitchTiles",
	"surfaceScale",
	"systemLanguage",
	"tableValues",
	"targetX",
	"targetY",
	"textLength",
	"viewBox",
	"viewTarget",
	"xChannelSelector",
	"yChannelSelector",
	"zoomAndPan"
].map((attr) => [attr.toLowerCase(), attr]));
const XML_ATTRS_ADJUSTMENT_MAP = /* @__PURE__ */ new Map([
	["xlink:actuate", {
		prefix: "xlink",
		name: "actuate",
		namespace: NS.XLINK
	}],
	["xlink:arcrole", {
		prefix: "xlink",
		name: "arcrole",
		namespace: NS.XLINK
	}],
	["xlink:href", {
		prefix: "xlink",
		name: "href",
		namespace: NS.XLINK
	}],
	["xlink:role", {
		prefix: "xlink",
		name: "role",
		namespace: NS.XLINK
	}],
	["xlink:show", {
		prefix: "xlink",
		name: "show",
		namespace: NS.XLINK
	}],
	["xlink:title", {
		prefix: "xlink",
		name: "title",
		namespace: NS.XLINK
	}],
	["xlink:type", {
		prefix: "xlink",
		name: "type",
		namespace: NS.XLINK
	}],
	["xml:lang", {
		prefix: "xml",
		name: "lang",
		namespace: NS.XML
	}],
	["xml:space", {
		prefix: "xml",
		name: "space",
		namespace: NS.XML
	}],
	["xmlns", {
		prefix: "",
		name: "xmlns",
		namespace: NS.XMLNS
	}],
	["xmlns:xlink", {
		prefix: "xmlns",
		name: "xlink",
		namespace: NS.XMLNS
	}]
]);
const SVG_TAG_NAMES_ADJUSTMENT_MAP = new Map([
	"altGlyph",
	"altGlyphDef",
	"altGlyphItem",
	"animateColor",
	"animateMotion",
	"animateTransform",
	"clipPath",
	"feBlend",
	"feColorMatrix",
	"feComponentTransfer",
	"feComposite",
	"feConvolveMatrix",
	"feDiffuseLighting",
	"feDisplacementMap",
	"feDistantLight",
	"feFlood",
	"feFuncA",
	"feFuncB",
	"feFuncG",
	"feFuncR",
	"feGaussianBlur",
	"feImage",
	"feMerge",
	"feMergeNode",
	"feMorphology",
	"feOffset",
	"fePointLight",
	"feSpecularLighting",
	"feSpotLight",
	"feTile",
	"feTurbulence",
	"foreignObject",
	"glyphRef",
	"linearGradient",
	"radialGradient",
	"textPath"
].map((tn) => [tn.toLowerCase(), tn]));
const EXITS_FOREIGN_CONTENT = /* @__PURE__ */ new Set([
	TAG_ID.B,
	TAG_ID.BIG,
	TAG_ID.BLOCKQUOTE,
	TAG_ID.BODY,
	TAG_ID.BR,
	TAG_ID.CENTER,
	TAG_ID.CODE,
	TAG_ID.DD,
	TAG_ID.DIV,
	TAG_ID.DL,
	TAG_ID.DT,
	TAG_ID.EM,
	TAG_ID.EMBED,
	TAG_ID.H1,
	TAG_ID.H2,
	TAG_ID.H3,
	TAG_ID.H4,
	TAG_ID.H5,
	TAG_ID.H6,
	TAG_ID.HEAD,
	TAG_ID.HR,
	TAG_ID.I,
	TAG_ID.IMG,
	TAG_ID.LI,
	TAG_ID.LISTING,
	TAG_ID.MENU,
	TAG_ID.META,
	TAG_ID.NOBR,
	TAG_ID.OL,
	TAG_ID.P,
	TAG_ID.PRE,
	TAG_ID.RUBY,
	TAG_ID.S,
	TAG_ID.SMALL,
	TAG_ID.SPAN,
	TAG_ID.STRONG,
	TAG_ID.STRIKE,
	TAG_ID.SUB,
	TAG_ID.SUP,
	TAG_ID.TABLE,
	TAG_ID.TT,
	TAG_ID.U,
	TAG_ID.UL,
	TAG_ID.VAR
]);
function causesExit(startTagToken) {
	const tn = startTagToken.tagID;
	return tn === TAG_ID.FONT && startTagToken.attrs.some(({ name }) => name === ATTRS.COLOR || name === ATTRS.SIZE || name === ATTRS.FACE) || EXITS_FOREIGN_CONTENT.has(tn);
}
function adjustTokenMathMLAttrs(token) {
	for (let i = 0; i < token.attrs.length; i++) if (token.attrs[i].name === DEFINITION_URL_ATTR) {
		token.attrs[i].name = ADJUSTED_DEFINITION_URL_ATTR;
		break;
	}
}
function adjustTokenSVGAttrs(token) {
	for (let i = 0; i < token.attrs.length; i++) {
		const adjustedAttrName = SVG_ATTRS_ADJUSTMENT_MAP.get(token.attrs[i].name);
		if (adjustedAttrName != null) token.attrs[i].name = adjustedAttrName;
	}
}
function adjustTokenXMLAttrs(token) {
	for (let i = 0; i < token.attrs.length; i++) {
		const adjustedAttrEntry = XML_ATTRS_ADJUSTMENT_MAP.get(token.attrs[i].name);
		if (adjustedAttrEntry) {
			token.attrs[i].prefix = adjustedAttrEntry.prefix;
			token.attrs[i].name = adjustedAttrEntry.name;
			token.attrs[i].namespace = adjustedAttrEntry.namespace;
		}
	}
}
function adjustTokenSVGTagName(token) {
	const adjustedTagName = SVG_TAG_NAMES_ADJUSTMENT_MAP.get(token.tagName);
	if (adjustedTagName != null) {
		token.tagName = adjustedTagName;
		token.tagID = getTagID(token.tagName);
	}
}
function isMathMLTextIntegrationPoint(tn, ns) {
	return ns === NS.MATHML && (tn === TAG_ID.MI || tn === TAG_ID.MO || tn === TAG_ID.MN || tn === TAG_ID.MS || tn === TAG_ID.MTEXT);
}
function isHtmlIntegrationPoint(tn, ns, attrs) {
	if (ns === NS.MATHML && tn === TAG_ID.ANNOTATION_XML) {
		for (let i = 0; i < attrs.length; i++) if (attrs[i].name === ATTRS.ENCODING) {
			const value = attrs[i].value.toLowerCase();
			return value === MIME_TYPES.TEXT_HTML || value === MIME_TYPES.APPLICATION_XML;
		}
	}
	return ns === NS.SVG && (tn === TAG_ID.FOREIGN_OBJECT || tn === TAG_ID.DESC || tn === TAG_ID.TITLE);
}
function isIntegrationPoint(tn, ns, attrs, foreignNS) {
	return (!foreignNS || foreignNS === NS.HTML) && isHtmlIntegrationPoint(tn, ns, attrs) || (!foreignNS || foreignNS === NS.MATHML) && isMathMLTextIntegrationPoint(tn, ns);
}
//#endregion
//#region node_modules/.pnpm/parse5@8.0.1/node_modules/parse5/dist/parser/index.js
const HIDDEN_INPUT_TYPE = "hidden";
const AA_OUTER_LOOP_ITER = 8;
const AA_INNER_LOOP_ITER = 3;
var InsertionMode;
(function(InsertionMode) {
	InsertionMode[InsertionMode["INITIAL"] = 0] = "INITIAL";
	InsertionMode[InsertionMode["BEFORE_HTML"] = 1] = "BEFORE_HTML";
	InsertionMode[InsertionMode["BEFORE_HEAD"] = 2] = "BEFORE_HEAD";
	InsertionMode[InsertionMode["IN_HEAD"] = 3] = "IN_HEAD";
	InsertionMode[InsertionMode["IN_HEAD_NO_SCRIPT"] = 4] = "IN_HEAD_NO_SCRIPT";
	InsertionMode[InsertionMode["AFTER_HEAD"] = 5] = "AFTER_HEAD";
	InsertionMode[InsertionMode["IN_BODY"] = 6] = "IN_BODY";
	InsertionMode[InsertionMode["TEXT"] = 7] = "TEXT";
	InsertionMode[InsertionMode["IN_TABLE"] = 8] = "IN_TABLE";
	InsertionMode[InsertionMode["IN_TABLE_TEXT"] = 9] = "IN_TABLE_TEXT";
	InsertionMode[InsertionMode["IN_CAPTION"] = 10] = "IN_CAPTION";
	InsertionMode[InsertionMode["IN_COLUMN_GROUP"] = 11] = "IN_COLUMN_GROUP";
	InsertionMode[InsertionMode["IN_TABLE_BODY"] = 12] = "IN_TABLE_BODY";
	InsertionMode[InsertionMode["IN_ROW"] = 13] = "IN_ROW";
	InsertionMode[InsertionMode["IN_CELL"] = 14] = "IN_CELL";
	InsertionMode[InsertionMode["IN_SELECT"] = 15] = "IN_SELECT";
	InsertionMode[InsertionMode["IN_SELECT_IN_TABLE"] = 16] = "IN_SELECT_IN_TABLE";
	InsertionMode[InsertionMode["IN_TEMPLATE"] = 17] = "IN_TEMPLATE";
	InsertionMode[InsertionMode["AFTER_BODY"] = 18] = "AFTER_BODY";
	InsertionMode[InsertionMode["IN_FRAMESET"] = 19] = "IN_FRAMESET";
	InsertionMode[InsertionMode["AFTER_FRAMESET"] = 20] = "AFTER_FRAMESET";
	InsertionMode[InsertionMode["AFTER_AFTER_BODY"] = 21] = "AFTER_AFTER_BODY";
	InsertionMode[InsertionMode["AFTER_AFTER_FRAMESET"] = 22] = "AFTER_AFTER_FRAMESET";
})(InsertionMode || (InsertionMode = {}));
const BASE_LOC = {
	startLine: -1,
	startCol: -1,
	startOffset: -1,
	endLine: -1,
	endCol: -1,
	endOffset: -1
};
const TABLE_STRUCTURE_TAGS = /* @__PURE__ */ new Set([
	TAG_ID.TABLE,
	TAG_ID.TBODY,
	TAG_ID.TFOOT,
	TAG_ID.THEAD,
	TAG_ID.TR
]);
const defaultParserOptions = {
	scriptingEnabled: true,
	sourceCodeLocationInfo: false,
	treeAdapter: defaultTreeAdapter,
	onParseError: null
};
var Parser = class {
	constructor(options, document, fragmentContext = null, scriptHandler = null) {
		this.fragmentContext = fragmentContext;
		this.scriptHandler = scriptHandler;
		this.currentToken = null;
		this.stopped = false;
		/** @internal */
		this.insertionMode = InsertionMode.INITIAL;
		/** @internal */
		this.originalInsertionMode = InsertionMode.INITIAL;
		/** @internal */
		this.headElement = null;
		/** @internal */
		this.formElement = null;
		/** Indicates that the current node is not an element in the HTML namespace */
		this.currentNotInHTML = false;
		/**
		* The template insertion mode stack is maintained from the left.
		* Ie. the topmost element will always have index 0.
		*
		* @internal
		*/
		this.tmplInsertionModeStack = [];
		/** @internal */
		this.pendingCharacterTokens = [];
		/** @internal */
		this.hasNonWhitespacePendingCharacterToken = false;
		/** @internal */
		this.framesetOk = true;
		/** @internal */
		this.skipNextNewLine = false;
		/** @internal */
		this.fosterParentingEnabled = false;
		this.options = {
			...defaultParserOptions,
			...options
		};
		this.treeAdapter = this.options.treeAdapter;
		this.onParseError = this.options.onParseError;
		if (this.onParseError) this.options.sourceCodeLocationInfo = true;
		this.document = document !== null && document !== void 0 ? document : this.treeAdapter.createDocument();
		this.tokenizer = new Tokenizer(this.options, this);
		this.activeFormattingElements = new FormattingElementList(this.treeAdapter);
		this.fragmentContextID = fragmentContext ? getTagID(this.treeAdapter.getTagName(fragmentContext)) : TAG_ID.UNKNOWN;
		this._setContextModes(fragmentContext !== null && fragmentContext !== void 0 ? fragmentContext : this.document, this.fragmentContextID);
		this.openElements = new OpenElementStack(this.document, this.treeAdapter, this);
	}
	static parse(html, options) {
		const parser = new this(options);
		parser.tokenizer.write(html, true);
		return parser.document;
	}
	static getFragmentParser(fragmentContext, options) {
		const opts = {
			...defaultParserOptions,
			...options
		};
		fragmentContext !== null && fragmentContext !== void 0 || (fragmentContext = opts.treeAdapter.createElement(TAG_NAMES.TEMPLATE, NS.HTML, []));
		const documentMock = opts.treeAdapter.createElement("documentmock", NS.HTML, []);
		const parser = new this(opts, documentMock, fragmentContext);
		if (parser.fragmentContextID === TAG_ID.TEMPLATE) parser.tmplInsertionModeStack.unshift(InsertionMode.IN_TEMPLATE);
		parser._initTokenizerForFragmentParsing();
		parser._insertFakeRootElement();
		parser._resetInsertionMode();
		parser._findFormInFragmentContext();
		return parser;
	}
	getFragment() {
		const rootElement = this.treeAdapter.getFirstChild(this.document);
		const fragment = this.treeAdapter.createDocumentFragment();
		this._adoptNodes(rootElement, fragment);
		return fragment;
	}
	/** @internal */
	_err(token, code, beforeToken) {
		var _a;
		if (!this.onParseError) return;
		const loc = (_a = token.location) !== null && _a !== void 0 ? _a : BASE_LOC;
		const err = {
			code,
			startLine: loc.startLine,
			startCol: loc.startCol,
			startOffset: loc.startOffset,
			endLine: beforeToken ? loc.startLine : loc.endLine,
			endCol: beforeToken ? loc.startCol : loc.endCol,
			endOffset: beforeToken ? loc.startOffset : loc.endOffset
		};
		this.onParseError(err);
	}
	/** @internal */
	onItemPush(node, tid, isTop) {
		var _a, _b;
		(_b = (_a = this.treeAdapter).onItemPush) === null || _b === void 0 || _b.call(_a, node);
		if (isTop && this.openElements.stackTop > 0) this._setContextModes(node, tid);
	}
	/** @internal */
	onItemPop(node, isTop) {
		var _a, _b;
		if (this.options.sourceCodeLocationInfo) this._setEndLocation(node, this.currentToken);
		(_b = (_a = this.treeAdapter).onItemPop) === null || _b === void 0 || _b.call(_a, node, this.openElements.current);
		if (isTop) {
			let current;
			let currentTagId;
			if (this.openElements.stackTop === 0 && this.fragmentContext) {
				current = this.fragmentContext;
				currentTagId = this.fragmentContextID;
			} else ({current, currentTagId} = this.openElements);
			this._setContextModes(current, currentTagId);
		}
	}
	_setContextModes(current, tid) {
		const isHTML = current === this.document || current && this.treeAdapter.getNamespaceURI(current) === NS.HTML;
		this.currentNotInHTML = !isHTML;
		this.tokenizer.inForeignNode = !isHTML && current !== void 0 && tid !== void 0 && !this._isIntegrationPoint(tid, current);
	}
	/** @protected */
	_switchToTextParsing(currentToken, nextTokenizerState) {
		this._insertElement(currentToken, NS.HTML);
		this.tokenizer.state = nextTokenizerState;
		this.originalInsertionMode = this.insertionMode;
		this.insertionMode = InsertionMode.TEXT;
	}
	switchToPlaintextParsing() {
		this.insertionMode = InsertionMode.TEXT;
		this.originalInsertionMode = InsertionMode.IN_BODY;
		this.tokenizer.state = TokenizerMode.PLAINTEXT;
	}
	/** @protected */
	_getAdjustedCurrentElement() {
		return this.openElements.stackTop === 0 && this.fragmentContext ? this.fragmentContext : this.openElements.current;
	}
	/** @protected */
	_findFormInFragmentContext() {
		let node = this.fragmentContext;
		while (node) {
			if (this.treeAdapter.getTagName(node) === TAG_NAMES.FORM) {
				this.formElement = node;
				break;
			}
			node = this.treeAdapter.getParentNode(node);
		}
	}
	_initTokenizerForFragmentParsing() {
		if (!this.fragmentContext || this.treeAdapter.getNamespaceURI(this.fragmentContext) !== NS.HTML) return;
		switch (this.fragmentContextID) {
			case TAG_ID.TITLE:
			case TAG_ID.TEXTAREA:
				this.tokenizer.state = TokenizerMode.RCDATA;
				break;
			case TAG_ID.STYLE:
			case TAG_ID.XMP:
			case TAG_ID.IFRAME:
			case TAG_ID.NOEMBED:
			case TAG_ID.NOFRAMES:
			case TAG_ID.NOSCRIPT:
				this.tokenizer.state = TokenizerMode.RAWTEXT;
				break;
			case TAG_ID.SCRIPT:
				this.tokenizer.state = TokenizerMode.SCRIPT_DATA;
				break;
			case TAG_ID.PLAINTEXT: this.tokenizer.state = TokenizerMode.PLAINTEXT;
		}
	}
	/** @protected */
	_setDocumentType(token) {
		const name = token.name || "";
		const publicId = token.publicId || "";
		const systemId = token.systemId || "";
		this.treeAdapter.setDocumentType(this.document, name, publicId, systemId);
		if (token.location) {
			const docTypeNode = this.treeAdapter.getChildNodes(this.document).find((node) => this.treeAdapter.isDocumentTypeNode(node));
			if (docTypeNode) this.treeAdapter.setNodeSourceCodeLocation(docTypeNode, token.location);
		}
	}
	/** @protected */
	_attachElementToTree(element, location) {
		if (this.options.sourceCodeLocationInfo) {
			const loc = location && {
				...location,
				startTag: location
			};
			this.treeAdapter.setNodeSourceCodeLocation(element, loc);
		}
		if (this._shouldFosterParentOnInsertion()) this._fosterParentElement(element);
		else {
			const parent = this.openElements.currentTmplContentOrNode;
			this.treeAdapter.appendChild(parent !== null && parent !== void 0 ? parent : this.document, element);
		}
	}
	/**
	* For self-closing tags. Add an element to the tree, but skip adding it
	* to the stack.
	*/
	/** @protected */
	_appendElement(token, namespaceURI) {
		const element = this.treeAdapter.createElement(token.tagName, namespaceURI, token.attrs);
		this._attachElementToTree(element, token.location);
	}
	/** @protected */
	_insertElement(token, namespaceURI) {
		const element = this.treeAdapter.createElement(token.tagName, namespaceURI, token.attrs);
		this._attachElementToTree(element, token.location);
		this.openElements.push(element, token.tagID);
	}
	/** @protected */
	_insertFakeElement(tagName, tagID) {
		const element = this.treeAdapter.createElement(tagName, NS.HTML, []);
		this._attachElementToTree(element, null);
		this.openElements.push(element, tagID);
	}
	/** @protected */
	_insertTemplate(token) {
		const tmpl = this.treeAdapter.createElement(token.tagName, NS.HTML, token.attrs);
		const content = this.treeAdapter.createDocumentFragment();
		this.treeAdapter.setTemplateContent(tmpl, content);
		this._attachElementToTree(tmpl, token.location);
		this.openElements.push(tmpl, token.tagID);
		if (this.options.sourceCodeLocationInfo) this.treeAdapter.setNodeSourceCodeLocation(content, null);
	}
	/** @protected */
	_insertFakeRootElement() {
		const element = this.treeAdapter.createElement(TAG_NAMES.HTML, NS.HTML, []);
		if (this.options.sourceCodeLocationInfo) this.treeAdapter.setNodeSourceCodeLocation(element, null);
		this.treeAdapter.appendChild(this.openElements.current, element);
		this.openElements.push(element, TAG_ID.HTML);
	}
	/** @protected */
	_appendCommentNode(token, parent) {
		const commentNode = this.treeAdapter.createCommentNode(token.data);
		this.treeAdapter.appendChild(parent, commentNode);
		if (this.options.sourceCodeLocationInfo) this.treeAdapter.setNodeSourceCodeLocation(commentNode, token.location);
	}
	/** @protected */
	_insertCharacters(token) {
		let parent;
		let beforeElement;
		if (this._shouldFosterParentOnInsertion()) {
			({parent, beforeElement} = this._findFosterParentingLocation());
			if (beforeElement) this.treeAdapter.insertTextBefore(parent, token.chars, beforeElement);
			else this.treeAdapter.insertText(parent, token.chars);
		} else {
			parent = this.openElements.currentTmplContentOrNode;
			this.treeAdapter.insertText(parent, token.chars);
		}
		if (!token.location) return;
		const siblings = this.treeAdapter.getChildNodes(parent);
		const textNode = siblings[(beforeElement ? siblings.lastIndexOf(beforeElement) : siblings.length) - 1];
		if (this.treeAdapter.getNodeSourceCodeLocation(textNode)) {
			const { endLine, endCol, endOffset } = token.location;
			this.treeAdapter.updateNodeSourceCodeLocation(textNode, {
				endLine,
				endCol,
				endOffset
			});
		} else if (this.options.sourceCodeLocationInfo) this.treeAdapter.setNodeSourceCodeLocation(textNode, token.location);
	}
	/** @protected */
	_adoptNodes(donor, recipient) {
		for (let child = this.treeAdapter.getFirstChild(donor); child; child = this.treeAdapter.getFirstChild(donor)) {
			this.treeAdapter.detachNode(child);
			this.treeAdapter.appendChild(recipient, child);
		}
	}
	/** @protected */
	_setEndLocation(element, closingToken) {
		if (this.treeAdapter.getNodeSourceCodeLocation(element) && closingToken.location) {
			const ctLoc = closingToken.location;
			const tn = this.treeAdapter.getTagName(element);
			const endLoc = closingToken.type === TokenType.END_TAG && tn === closingToken.tagName ? {
				endTag: { ...ctLoc },
				endLine: ctLoc.endLine,
				endCol: ctLoc.endCol,
				endOffset: ctLoc.endOffset
			} : {
				endLine: ctLoc.startLine,
				endCol: ctLoc.startCol,
				endOffset: ctLoc.startOffset
			};
			this.treeAdapter.updateNodeSourceCodeLocation(element, endLoc);
		}
	}
	shouldProcessStartTagTokenInForeignContent(token) {
		if (!this.currentNotInHTML) return false;
		let current;
		let currentTagId;
		if (this.openElements.stackTop === 0 && this.fragmentContext) {
			current = this.fragmentContext;
			currentTagId = this.fragmentContextID;
		} else ({current, currentTagId} = this.openElements);
		if (token.tagID === TAG_ID.SVG && this.treeAdapter.getTagName(current) === TAG_NAMES.ANNOTATION_XML && this.treeAdapter.getNamespaceURI(current) === NS.MATHML) return false;
		return this.tokenizer.inForeignNode || (token.tagID === TAG_ID.MGLYPH || token.tagID === TAG_ID.MALIGNMARK) && currentTagId !== void 0 && !this._isIntegrationPoint(currentTagId, current, NS.HTML);
	}
	/** @protected */
	_processToken(token) {
		switch (token.type) {
			case TokenType.CHARACTER:
				this.onCharacter(token);
				break;
			case TokenType.NULL_CHARACTER:
				this.onNullCharacter(token);
				break;
			case TokenType.COMMENT:
				this.onComment(token);
				break;
			case TokenType.DOCTYPE:
				this.onDoctype(token);
				break;
			case TokenType.START_TAG:
				this._processStartTag(token);
				break;
			case TokenType.END_TAG:
				this.onEndTag(token);
				break;
			case TokenType.EOF:
				this.onEof(token);
				break;
			case TokenType.WHITESPACE_CHARACTER: this.onWhitespaceCharacter(token);
		}
	}
	/** @protected */
	_isIntegrationPoint(tid, element, foreignNS) {
		return isIntegrationPoint(tid, this.treeAdapter.getNamespaceURI(element), this.treeAdapter.getAttrList(element), foreignNS);
	}
	/** @protected */
	_reconstructActiveFormattingElements() {
		const listLength = this.activeFormattingElements.entries.length;
		if (listLength) {
			const endIndex = this.activeFormattingElements.entries.findIndex((entry) => entry.type === EntryType.Marker || this.openElements.contains(entry.element));
			const unopenIdx = endIndex === -1 ? listLength - 1 : endIndex - 1;
			for (let i = unopenIdx; i >= 0; i--) {
				const entry = this.activeFormattingElements.entries[i];
				this._insertElement(entry.token, this.treeAdapter.getNamespaceURI(entry.element));
				entry.element = this.openElements.current;
			}
		}
	}
	/** @protected */
	_closeTableCell() {
		this.openElements.generateImpliedEndTags();
		this.openElements.popUntilTableCellPopped();
		this.activeFormattingElements.clearToLastMarker();
		this.insertionMode = InsertionMode.IN_ROW;
	}
	/** @protected */
	_closePElement() {
		this.openElements.generateImpliedEndTagsWithExclusion(TAG_ID.P);
		this.openElements.popUntilTagNamePopped(TAG_ID.P);
	}
	/** @protected */
	_resetInsertionMode() {
		for (let i = this.openElements.stackTop; i >= 0; i--) switch (i === 0 && this.fragmentContext ? this.fragmentContextID : this.openElements.tagIDs[i]) {
			case TAG_ID.TR:
				this.insertionMode = InsertionMode.IN_ROW;
				return;
			case TAG_ID.TBODY:
			case TAG_ID.THEAD:
			case TAG_ID.TFOOT:
				this.insertionMode = InsertionMode.IN_TABLE_BODY;
				return;
			case TAG_ID.CAPTION:
				this.insertionMode = InsertionMode.IN_CAPTION;
				return;
			case TAG_ID.COLGROUP:
				this.insertionMode = InsertionMode.IN_COLUMN_GROUP;
				return;
			case TAG_ID.TABLE:
				this.insertionMode = InsertionMode.IN_TABLE;
				return;
			case TAG_ID.BODY:
				this.insertionMode = InsertionMode.IN_BODY;
				return;
			case TAG_ID.FRAMESET:
				this.insertionMode = InsertionMode.IN_FRAMESET;
				return;
			case TAG_ID.SELECT:
				this._resetInsertionModeForSelect(i);
				return;
			case TAG_ID.TEMPLATE:
				this.insertionMode = this.tmplInsertionModeStack[0];
				return;
			case TAG_ID.HTML:
				this.insertionMode = this.headElement ? InsertionMode.AFTER_HEAD : InsertionMode.BEFORE_HEAD;
				return;
			case TAG_ID.TD:
			case TAG_ID.TH:
				if (i > 0) {
					this.insertionMode = InsertionMode.IN_CELL;
					return;
				}
				break;
			case TAG_ID.HEAD: if (i > 0) {
				this.insertionMode = InsertionMode.IN_HEAD;
				return;
			}
		}
		this.insertionMode = InsertionMode.IN_BODY;
	}
	/** @protected */
	_resetInsertionModeForSelect(selectIdx) {
		if (selectIdx > 0) for (let i = selectIdx - 1; i > 0; i--) {
			const tn = this.openElements.tagIDs[i];
			if (tn === TAG_ID.TEMPLATE) break;
			else if (tn === TAG_ID.TABLE) {
				this.insertionMode = InsertionMode.IN_SELECT_IN_TABLE;
				return;
			}
		}
		this.insertionMode = InsertionMode.IN_SELECT;
	}
	/** @protected */
	_isElementCausesFosterParenting(tn) {
		return TABLE_STRUCTURE_TAGS.has(tn);
	}
	/** @protected */
	_shouldFosterParentOnInsertion() {
		return this.fosterParentingEnabled && this.openElements.currentTagId !== void 0 && this._isElementCausesFosterParenting(this.openElements.currentTagId);
	}
	/** @protected */
	_findFosterParentingLocation() {
		for (let i = this.openElements.stackTop; i >= 0; i--) {
			const openElement = this.openElements.items[i];
			switch (this.openElements.tagIDs[i]) {
				case TAG_ID.TEMPLATE:
					if (this.treeAdapter.getNamespaceURI(openElement) === NS.HTML) return {
						parent: this.treeAdapter.getTemplateContent(openElement),
						beforeElement: null
					};
					break;
				case TAG_ID.TABLE: {
					const parent = this.treeAdapter.getParentNode(openElement);
					if (parent) return {
						parent,
						beforeElement: openElement
					};
					return {
						parent: this.openElements.items[i - 1],
						beforeElement: null
					};
				}
			}
		}
		return {
			parent: this.openElements.items[0],
			beforeElement: null
		};
	}
	/** @protected */
	_fosterParentElement(element) {
		const location = this._findFosterParentingLocation();
		if (location.beforeElement) this.treeAdapter.insertBefore(location.parent, element, location.beforeElement);
		else this.treeAdapter.appendChild(location.parent, element);
	}
	/** @protected */
	_isSpecialElement(element, id) {
		const ns = this.treeAdapter.getNamespaceURI(element);
		return SPECIAL_ELEMENTS[ns].has(id);
	}
	/** @internal */
	onCharacter(token) {
		this.skipNextNewLine = false;
		if (this.tokenizer.inForeignNode) {
			characterInForeignContent(this, token);
			return;
		}
		switch (this.insertionMode) {
			case InsertionMode.INITIAL:
				tokenInInitialMode(this, token);
				break;
			case InsertionMode.BEFORE_HTML:
				tokenBeforeHtml(this, token);
				break;
			case InsertionMode.BEFORE_HEAD:
				tokenBeforeHead(this, token);
				break;
			case InsertionMode.IN_HEAD:
				tokenInHead(this, token);
				break;
			case InsertionMode.IN_HEAD_NO_SCRIPT:
				tokenInHeadNoScript(this, token);
				break;
			case InsertionMode.AFTER_HEAD:
				tokenAfterHead(this, token);
				break;
			case InsertionMode.IN_BODY:
			case InsertionMode.IN_CAPTION:
			case InsertionMode.IN_CELL:
			case InsertionMode.IN_TEMPLATE:
				characterInBody(this, token);
				break;
			case InsertionMode.TEXT:
			case InsertionMode.IN_SELECT:
			case InsertionMode.IN_SELECT_IN_TABLE:
				this._insertCharacters(token);
				break;
			case InsertionMode.IN_TABLE:
			case InsertionMode.IN_TABLE_BODY:
			case InsertionMode.IN_ROW:
				characterInTable(this, token);
				break;
			case InsertionMode.IN_TABLE_TEXT:
				characterInTableText(this, token);
				break;
			case InsertionMode.IN_COLUMN_GROUP:
				tokenInColumnGroup(this, token);
				break;
			case InsertionMode.AFTER_BODY:
				tokenAfterBody(this, token);
				break;
			case InsertionMode.AFTER_AFTER_BODY: tokenAfterAfterBody(this, token);
		}
	}
	/** @internal */
	onNullCharacter(token) {
		this.skipNextNewLine = false;
		if (this.tokenizer.inForeignNode) {
			nullCharacterInForeignContent(this, token);
			return;
		}
		switch (this.insertionMode) {
			case InsertionMode.INITIAL:
				tokenInInitialMode(this, token);
				break;
			case InsertionMode.BEFORE_HTML:
				tokenBeforeHtml(this, token);
				break;
			case InsertionMode.BEFORE_HEAD:
				tokenBeforeHead(this, token);
				break;
			case InsertionMode.IN_HEAD:
				tokenInHead(this, token);
				break;
			case InsertionMode.IN_HEAD_NO_SCRIPT:
				tokenInHeadNoScript(this, token);
				break;
			case InsertionMode.AFTER_HEAD:
				tokenAfterHead(this, token);
				break;
			case InsertionMode.TEXT:
				this._insertCharacters(token);
				break;
			case InsertionMode.IN_TABLE:
			case InsertionMode.IN_TABLE_BODY:
			case InsertionMode.IN_ROW:
				characterInTable(this, token);
				break;
			case InsertionMode.IN_COLUMN_GROUP:
				tokenInColumnGroup(this, token);
				break;
			case InsertionMode.AFTER_BODY:
				tokenAfterBody(this, token);
				break;
			case InsertionMode.AFTER_AFTER_BODY: tokenAfterAfterBody(this, token);
		}
	}
	/** @internal */
	onComment(token) {
		this.skipNextNewLine = false;
		if (this.currentNotInHTML) {
			appendComment(this, token);
			return;
		}
		switch (this.insertionMode) {
			case InsertionMode.INITIAL:
			case InsertionMode.BEFORE_HTML:
			case InsertionMode.BEFORE_HEAD:
			case InsertionMode.IN_HEAD:
			case InsertionMode.IN_HEAD_NO_SCRIPT:
			case InsertionMode.AFTER_HEAD:
			case InsertionMode.IN_BODY:
			case InsertionMode.IN_TABLE:
			case InsertionMode.IN_CAPTION:
			case InsertionMode.IN_COLUMN_GROUP:
			case InsertionMode.IN_TABLE_BODY:
			case InsertionMode.IN_ROW:
			case InsertionMode.IN_CELL:
			case InsertionMode.IN_SELECT:
			case InsertionMode.IN_SELECT_IN_TABLE:
			case InsertionMode.IN_TEMPLATE:
			case InsertionMode.IN_FRAMESET:
			case InsertionMode.AFTER_FRAMESET:
				appendComment(this, token);
				break;
			case InsertionMode.IN_TABLE_TEXT:
				tokenInTableText(this, token);
				break;
			case InsertionMode.AFTER_BODY:
				appendCommentToRootHtmlElement(this, token);
				break;
			case InsertionMode.AFTER_AFTER_BODY:
			case InsertionMode.AFTER_AFTER_FRAMESET: appendCommentToDocument(this, token);
		}
	}
	/** @internal */
	onDoctype(token) {
		this.skipNextNewLine = false;
		switch (this.insertionMode) {
			case InsertionMode.INITIAL:
				doctypeInInitialMode(this, token);
				break;
			case InsertionMode.BEFORE_HEAD:
			case InsertionMode.IN_HEAD:
			case InsertionMode.IN_HEAD_NO_SCRIPT:
			case InsertionMode.AFTER_HEAD:
				this._err(token, ERR.misplacedDoctype);
				break;
			case InsertionMode.IN_TABLE_TEXT: tokenInTableText(this, token);
		}
	}
	/** @internal */
	onStartTag(token) {
		this.skipNextNewLine = false;
		this.currentToken = token;
		this._processStartTag(token);
		if (token.selfClosing && !token.ackSelfClosing) this._err(token, ERR.nonVoidHtmlElementStartTagWithTrailingSolidus);
	}
	/**
	* Processes a given start tag.
	*
	* `onStartTag` checks if a self-closing tag was recognized. When a token
	* is moved inbetween multiple insertion modes, this check for self-closing
	* could lead to false positives. To avoid this, `_processStartTag` is used
	* for nested calls.
	*
	* @param token The token to process.
	* @protected
	*/
	_processStartTag(token) {
		if (this.shouldProcessStartTagTokenInForeignContent(token)) startTagInForeignContent(this, token);
		else this._startTagOutsideForeignContent(token);
	}
	/** @protected */
	_startTagOutsideForeignContent(token) {
		switch (this.insertionMode) {
			case InsertionMode.INITIAL:
				tokenInInitialMode(this, token);
				break;
			case InsertionMode.BEFORE_HTML:
				startTagBeforeHtml(this, token);
				break;
			case InsertionMode.BEFORE_HEAD:
				startTagBeforeHead(this, token);
				break;
			case InsertionMode.IN_HEAD:
				startTagInHead(this, token);
				break;
			case InsertionMode.IN_HEAD_NO_SCRIPT:
				startTagInHeadNoScript(this, token);
				break;
			case InsertionMode.AFTER_HEAD:
				startTagAfterHead(this, token);
				break;
			case InsertionMode.IN_BODY:
				startTagInBody(this, token);
				break;
			case InsertionMode.IN_TABLE:
				startTagInTable(this, token);
				break;
			case InsertionMode.IN_TABLE_TEXT:
				tokenInTableText(this, token);
				break;
			case InsertionMode.IN_CAPTION:
				startTagInCaption(this, token);
				break;
			case InsertionMode.IN_COLUMN_GROUP:
				startTagInColumnGroup(this, token);
				break;
			case InsertionMode.IN_TABLE_BODY:
				startTagInTableBody(this, token);
				break;
			case InsertionMode.IN_ROW:
				startTagInRow(this, token);
				break;
			case InsertionMode.IN_CELL:
				startTagInCell(this, token);
				break;
			case InsertionMode.IN_SELECT:
				startTagInSelect(this, token);
				break;
			case InsertionMode.IN_SELECT_IN_TABLE:
				startTagInSelectInTable(this, token);
				break;
			case InsertionMode.IN_TEMPLATE:
				startTagInTemplate(this, token);
				break;
			case InsertionMode.AFTER_BODY:
				startTagAfterBody(this, token);
				break;
			case InsertionMode.IN_FRAMESET:
				startTagInFrameset(this, token);
				break;
			case InsertionMode.AFTER_FRAMESET:
				startTagAfterFrameset(this, token);
				break;
			case InsertionMode.AFTER_AFTER_BODY:
				startTagAfterAfterBody(this, token);
				break;
			case InsertionMode.AFTER_AFTER_FRAMESET: startTagAfterAfterFrameset(this, token);
		}
	}
	/** @internal */
	onEndTag(token) {
		this.skipNextNewLine = false;
		this.currentToken = token;
		if (this.currentNotInHTML) endTagInForeignContent(this, token);
		else this._endTagOutsideForeignContent(token);
	}
	/** @protected */
	_endTagOutsideForeignContent(token) {
		switch (this.insertionMode) {
			case InsertionMode.INITIAL:
				tokenInInitialMode(this, token);
				break;
			case InsertionMode.BEFORE_HTML:
				endTagBeforeHtml(this, token);
				break;
			case InsertionMode.BEFORE_HEAD:
				endTagBeforeHead(this, token);
				break;
			case InsertionMode.IN_HEAD:
				endTagInHead(this, token);
				break;
			case InsertionMode.IN_HEAD_NO_SCRIPT:
				endTagInHeadNoScript(this, token);
				break;
			case InsertionMode.AFTER_HEAD:
				endTagAfterHead(this, token);
				break;
			case InsertionMode.IN_BODY:
				endTagInBody(this, token);
				break;
			case InsertionMode.TEXT:
				endTagInText(this, token);
				break;
			case InsertionMode.IN_TABLE:
				endTagInTable(this, token);
				break;
			case InsertionMode.IN_TABLE_TEXT:
				tokenInTableText(this, token);
				break;
			case InsertionMode.IN_CAPTION:
				endTagInCaption(this, token);
				break;
			case InsertionMode.IN_COLUMN_GROUP:
				endTagInColumnGroup(this, token);
				break;
			case InsertionMode.IN_TABLE_BODY:
				endTagInTableBody(this, token);
				break;
			case InsertionMode.IN_ROW:
				endTagInRow(this, token);
				break;
			case InsertionMode.IN_CELL:
				endTagInCell(this, token);
				break;
			case InsertionMode.IN_SELECT:
				endTagInSelect(this, token);
				break;
			case InsertionMode.IN_SELECT_IN_TABLE:
				endTagInSelectInTable(this, token);
				break;
			case InsertionMode.IN_TEMPLATE:
				endTagInTemplate(this, token);
				break;
			case InsertionMode.AFTER_BODY:
				endTagAfterBody(this, token);
				break;
			case InsertionMode.IN_FRAMESET:
				endTagInFrameset(this, token);
				break;
			case InsertionMode.AFTER_FRAMESET:
				endTagAfterFrameset(this, token);
				break;
			case InsertionMode.AFTER_AFTER_BODY: tokenAfterAfterBody(this, token);
		}
	}
	/** @internal */
	onEof(token) {
		switch (this.insertionMode) {
			case InsertionMode.INITIAL:
				tokenInInitialMode(this, token);
				break;
			case InsertionMode.BEFORE_HTML:
				tokenBeforeHtml(this, token);
				break;
			case InsertionMode.BEFORE_HEAD:
				tokenBeforeHead(this, token);
				break;
			case InsertionMode.IN_HEAD:
				tokenInHead(this, token);
				break;
			case InsertionMode.IN_HEAD_NO_SCRIPT:
				tokenInHeadNoScript(this, token);
				break;
			case InsertionMode.AFTER_HEAD:
				tokenAfterHead(this, token);
				break;
			case InsertionMode.IN_BODY:
			case InsertionMode.IN_TABLE:
			case InsertionMode.IN_CAPTION:
			case InsertionMode.IN_COLUMN_GROUP:
			case InsertionMode.IN_TABLE_BODY:
			case InsertionMode.IN_ROW:
			case InsertionMode.IN_CELL:
			case InsertionMode.IN_SELECT:
			case InsertionMode.IN_SELECT_IN_TABLE:
				eofInBody(this, token);
				break;
			case InsertionMode.TEXT:
				eofInText(this, token);
				break;
			case InsertionMode.IN_TABLE_TEXT:
				tokenInTableText(this, token);
				break;
			case InsertionMode.IN_TEMPLATE:
				eofInTemplate(this, token);
				break;
			case InsertionMode.AFTER_BODY:
			case InsertionMode.IN_FRAMESET:
			case InsertionMode.AFTER_FRAMESET:
			case InsertionMode.AFTER_AFTER_BODY:
			case InsertionMode.AFTER_AFTER_FRAMESET: stopParsing(this, token);
		}
	}
	/** @internal */
	onWhitespaceCharacter(token) {
		if (this.skipNextNewLine) {
			this.skipNextNewLine = false;
			if (token.chars.charCodeAt(0) === CODE_POINTS.LINE_FEED) {
				if (token.chars.length === 1) return;
				token.chars = token.chars.substr(1);
			}
		}
		if (this.tokenizer.inForeignNode) {
			this._insertCharacters(token);
			return;
		}
		switch (this.insertionMode) {
			case InsertionMode.IN_HEAD:
			case InsertionMode.IN_HEAD_NO_SCRIPT:
			case InsertionMode.AFTER_HEAD:
			case InsertionMode.TEXT:
			case InsertionMode.IN_COLUMN_GROUP:
			case InsertionMode.IN_SELECT:
			case InsertionMode.IN_SELECT_IN_TABLE:
			case InsertionMode.IN_FRAMESET:
			case InsertionMode.AFTER_FRAMESET:
				this._insertCharacters(token);
				break;
			case InsertionMode.IN_BODY:
			case InsertionMode.IN_CAPTION:
			case InsertionMode.IN_CELL:
			case InsertionMode.IN_TEMPLATE:
			case InsertionMode.AFTER_BODY:
			case InsertionMode.AFTER_AFTER_BODY:
			case InsertionMode.AFTER_AFTER_FRAMESET:
				whitespaceCharacterInBody(this, token);
				break;
			case InsertionMode.IN_TABLE:
			case InsertionMode.IN_TABLE_BODY:
			case InsertionMode.IN_ROW:
				characterInTable(this, token);
				break;
			case InsertionMode.IN_TABLE_TEXT: whitespaceCharacterInTableText(this, token);
		}
	}
};
function aaObtainFormattingElementEntry(p, token) {
	let formattingElementEntry = p.activeFormattingElements.getElementEntryInScopeWithTagName(token.tagName);
	if (formattingElementEntry) {
		if (!p.openElements.contains(formattingElementEntry.element)) {
			p.activeFormattingElements.removeEntry(formattingElementEntry);
			formattingElementEntry = null;
		} else if (!p.openElements.hasInScope(token.tagID)) formattingElementEntry = null;
	} else genericEndTagInBody(p, token);
	return formattingElementEntry;
}
function aaObtainFurthestBlock(p, formattingElementEntry) {
	let furthestBlock = null;
	let idx = p.openElements.stackTop;
	for (; idx >= 0; idx--) {
		const element = p.openElements.items[idx];
		if (element === formattingElementEntry.element) break;
		if (p._isSpecialElement(element, p.openElements.tagIDs[idx])) furthestBlock = element;
	}
	if (!furthestBlock) {
		p.openElements.shortenToLength(Math.max(idx, 0));
		p.activeFormattingElements.removeEntry(formattingElementEntry);
	}
	return furthestBlock;
}
function aaInnerLoop(p, furthestBlock, formattingElement) {
	let lastElement = furthestBlock;
	let nextElement = p.openElements.getCommonAncestor(furthestBlock);
	for (let i = 0, element = nextElement; element !== formattingElement; i++, element = nextElement) {
		nextElement = p.openElements.getCommonAncestor(element);
		const elementEntry = p.activeFormattingElements.getElementEntry(element);
		const counterOverflow = elementEntry && i >= AA_INNER_LOOP_ITER;
		if (!elementEntry || counterOverflow) {
			if (counterOverflow) p.activeFormattingElements.removeEntry(elementEntry);
			p.openElements.remove(element);
		} else {
			element = aaRecreateElementFromEntry(p, elementEntry);
			if (lastElement === furthestBlock) p.activeFormattingElements.bookmark = elementEntry;
			p.treeAdapter.detachNode(lastElement);
			p.treeAdapter.appendChild(element, lastElement);
			lastElement = element;
		}
	}
	return lastElement;
}
function aaRecreateElementFromEntry(p, elementEntry) {
	const ns = p.treeAdapter.getNamespaceURI(elementEntry.element);
	const newElement = p.treeAdapter.createElement(elementEntry.token.tagName, ns, elementEntry.token.attrs);
	p.openElements.replace(elementEntry.element, newElement);
	elementEntry.element = newElement;
	return newElement;
}
function aaInsertLastNodeInCommonAncestor(p, commonAncestor, lastElement) {
	const tid = getTagID(p.treeAdapter.getTagName(commonAncestor));
	if (p._isElementCausesFosterParenting(tid)) p._fosterParentElement(lastElement);
	else {
		const ns = p.treeAdapter.getNamespaceURI(commonAncestor);
		if (tid === TAG_ID.TEMPLATE && ns === NS.HTML) commonAncestor = p.treeAdapter.getTemplateContent(commonAncestor);
		p.treeAdapter.appendChild(commonAncestor, lastElement);
	}
}
function aaReplaceFormattingElement(p, furthestBlock, formattingElementEntry) {
	const ns = p.treeAdapter.getNamespaceURI(formattingElementEntry.element);
	const { token } = formattingElementEntry;
	const newElement = p.treeAdapter.createElement(token.tagName, ns, token.attrs);
	p._adoptNodes(furthestBlock, newElement);
	p.treeAdapter.appendChild(furthestBlock, newElement);
	p.activeFormattingElements.insertElementAfterBookmark(newElement, token);
	p.activeFormattingElements.removeEntry(formattingElementEntry);
	p.openElements.remove(formattingElementEntry.element);
	p.openElements.insertAfter(furthestBlock, newElement, token.tagID);
}
function callAdoptionAgency(p, token) {
	for (let i = 0; i < AA_OUTER_LOOP_ITER; i++) {
		const formattingElementEntry = aaObtainFormattingElementEntry(p, token);
		if (!formattingElementEntry) break;
		const furthestBlock = aaObtainFurthestBlock(p, formattingElementEntry);
		if (!furthestBlock) break;
		p.activeFormattingElements.bookmark = formattingElementEntry;
		const lastElement = aaInnerLoop(p, furthestBlock, formattingElementEntry.element);
		const commonAncestor = p.openElements.getCommonAncestor(formattingElementEntry.element);
		p.treeAdapter.detachNode(lastElement);
		if (commonAncestor) aaInsertLastNodeInCommonAncestor(p, commonAncestor, lastElement);
		aaReplaceFormattingElement(p, furthestBlock, formattingElementEntry);
	}
}
function appendComment(p, token) {
	p._appendCommentNode(token, p.openElements.currentTmplContentOrNode);
}
function appendCommentToRootHtmlElement(p, token) {
	p._appendCommentNode(token, p.openElements.items[0]);
}
function appendCommentToDocument(p, token) {
	p._appendCommentNode(token, p.document);
}
function stopParsing(p, token) {
	p.stopped = true;
	if (token.location) {
		const target = p.fragmentContext ? 0 : 2;
		for (let i = p.openElements.stackTop; i >= target; i--) p._setEndLocation(p.openElements.items[i], token);
		if (!p.fragmentContext && p.openElements.stackTop >= 0) {
			const htmlElement = p.openElements.items[0];
			const htmlLocation = p.treeAdapter.getNodeSourceCodeLocation(htmlElement);
			if (htmlLocation && !htmlLocation.endTag) {
				p._setEndLocation(htmlElement, token);
				if (p.openElements.stackTop >= 1) {
					const bodyElement = p.openElements.items[1];
					const bodyLocation = p.treeAdapter.getNodeSourceCodeLocation(bodyElement);
					if (bodyLocation && !bodyLocation.endTag) p._setEndLocation(bodyElement, token);
				}
			}
		}
	}
}
function doctypeInInitialMode(p, token) {
	p._setDocumentType(token);
	const mode = token.forceQuirks ? DOCUMENT_MODE.QUIRKS : getDocumentMode(token);
	if (!isConforming(token)) p._err(token, ERR.nonConformingDoctype);
	p.treeAdapter.setDocumentMode(p.document, mode);
	p.insertionMode = InsertionMode.BEFORE_HTML;
}
function tokenInInitialMode(p, token) {
	p._err(token, ERR.missingDoctype, true);
	p.treeAdapter.setDocumentMode(p.document, DOCUMENT_MODE.QUIRKS);
	p.insertionMode = InsertionMode.BEFORE_HTML;
	p._processToken(token);
}
function startTagBeforeHtml(p, token) {
	if (token.tagID === TAG_ID.HTML) {
		p._insertElement(token, NS.HTML);
		p.insertionMode = InsertionMode.BEFORE_HEAD;
	} else tokenBeforeHtml(p, token);
}
function endTagBeforeHtml(p, token) {
	const tn = token.tagID;
	if (tn === TAG_ID.HTML || tn === TAG_ID.HEAD || tn === TAG_ID.BODY || tn === TAG_ID.BR) tokenBeforeHtml(p, token);
}
function tokenBeforeHtml(p, token) {
	p._insertFakeRootElement();
	p.insertionMode = InsertionMode.BEFORE_HEAD;
	p._processToken(token);
}
function startTagBeforeHead(p, token) {
	switch (token.tagID) {
		case TAG_ID.HTML:
			startTagInBody(p, token);
			break;
		case TAG_ID.HEAD:
			p._insertElement(token, NS.HTML);
			p.headElement = p.openElements.current;
			p.insertionMode = InsertionMode.IN_HEAD;
			break;
		default: tokenBeforeHead(p, token);
	}
}
function endTagBeforeHead(p, token) {
	const tn = token.tagID;
	if (tn === TAG_ID.HEAD || tn === TAG_ID.BODY || tn === TAG_ID.HTML || tn === TAG_ID.BR) tokenBeforeHead(p, token);
	else p._err(token, ERR.endTagWithoutMatchingOpenElement);
}
function tokenBeforeHead(p, token) {
	p._insertFakeElement(TAG_NAMES.HEAD, TAG_ID.HEAD);
	p.headElement = p.openElements.current;
	p.insertionMode = InsertionMode.IN_HEAD;
	p._processToken(token);
}
function startTagInHead(p, token) {
	switch (token.tagID) {
		case TAG_ID.HTML:
			startTagInBody(p, token);
			break;
		case TAG_ID.BASE:
		case TAG_ID.BASEFONT:
		case TAG_ID.BGSOUND:
		case TAG_ID.LINK:
		case TAG_ID.META:
			p._appendElement(token, NS.HTML);
			token.ackSelfClosing = true;
			break;
		case TAG_ID.TITLE:
			p._switchToTextParsing(token, TokenizerMode.RCDATA);
			break;
		case TAG_ID.NOSCRIPT:
			if (p.options.scriptingEnabled) p._switchToTextParsing(token, TokenizerMode.RAWTEXT);
			else {
				p._insertElement(token, NS.HTML);
				p.insertionMode = InsertionMode.IN_HEAD_NO_SCRIPT;
			}
			break;
		case TAG_ID.NOFRAMES:
		case TAG_ID.STYLE:
			p._switchToTextParsing(token, TokenizerMode.RAWTEXT);
			break;
		case TAG_ID.SCRIPT:
			p._switchToTextParsing(token, TokenizerMode.SCRIPT_DATA);
			break;
		case TAG_ID.TEMPLATE:
			p._insertTemplate(token);
			p.activeFormattingElements.insertMarker();
			p.framesetOk = false;
			p.insertionMode = InsertionMode.IN_TEMPLATE;
			p.tmplInsertionModeStack.unshift(InsertionMode.IN_TEMPLATE);
			break;
		case TAG_ID.HEAD:
			p._err(token, ERR.misplacedStartTagForHeadElement);
			break;
		default: tokenInHead(p, token);
	}
}
function endTagInHead(p, token) {
	switch (token.tagID) {
		case TAG_ID.HEAD:
			p.openElements.pop();
			p.insertionMode = InsertionMode.AFTER_HEAD;
			break;
		case TAG_ID.BODY:
		case TAG_ID.BR:
		case TAG_ID.HTML:
			tokenInHead(p, token);
			break;
		case TAG_ID.TEMPLATE:
			templateEndTagInHead(p, token);
			break;
		default: p._err(token, ERR.endTagWithoutMatchingOpenElement);
	}
}
function templateEndTagInHead(p, token) {
	if (p.openElements.tmplCount > 0) {
		p.openElements.generateImpliedEndTagsThoroughly();
		if (p.openElements.currentTagId !== TAG_ID.TEMPLATE) p._err(token, ERR.closingOfElementWithOpenChildElements);
		p.openElements.popUntilTagNamePopped(TAG_ID.TEMPLATE);
		p.activeFormattingElements.clearToLastMarker();
		p.tmplInsertionModeStack.shift();
		p._resetInsertionMode();
	} else p._err(token, ERR.endTagWithoutMatchingOpenElement);
}
function tokenInHead(p, token) {
	p.openElements.pop();
	p.insertionMode = InsertionMode.AFTER_HEAD;
	p._processToken(token);
}
function startTagInHeadNoScript(p, token) {
	switch (token.tagID) {
		case TAG_ID.HTML:
			startTagInBody(p, token);
			break;
		case TAG_ID.BASEFONT:
		case TAG_ID.BGSOUND:
		case TAG_ID.HEAD:
		case TAG_ID.LINK:
		case TAG_ID.META:
		case TAG_ID.NOFRAMES:
		case TAG_ID.STYLE:
			startTagInHead(p, token);
			break;
		case TAG_ID.NOSCRIPT:
			p._err(token, ERR.nestedNoscriptInHead);
			break;
		default: tokenInHeadNoScript(p, token);
	}
}
function endTagInHeadNoScript(p, token) {
	switch (token.tagID) {
		case TAG_ID.NOSCRIPT:
			p.openElements.pop();
			p.insertionMode = InsertionMode.IN_HEAD;
			break;
		case TAG_ID.BR:
			tokenInHeadNoScript(p, token);
			break;
		default: p._err(token, ERR.endTagWithoutMatchingOpenElement);
	}
}
function tokenInHeadNoScript(p, token) {
	const errCode = token.type === TokenType.EOF ? ERR.openElementsLeftAfterEof : ERR.disallowedContentInNoscriptInHead;
	p._err(token, errCode);
	p.openElements.pop();
	p.insertionMode = InsertionMode.IN_HEAD;
	p._processToken(token);
}
function startTagAfterHead(p, token) {
	switch (token.tagID) {
		case TAG_ID.HTML:
			startTagInBody(p, token);
			break;
		case TAG_ID.BODY:
			p._insertElement(token, NS.HTML);
			p.framesetOk = false;
			p.insertionMode = InsertionMode.IN_BODY;
			break;
		case TAG_ID.FRAMESET:
			p._insertElement(token, NS.HTML);
			p.insertionMode = InsertionMode.IN_FRAMESET;
			break;
		case TAG_ID.BASE:
		case TAG_ID.BASEFONT:
		case TAG_ID.BGSOUND:
		case TAG_ID.LINK:
		case TAG_ID.META:
		case TAG_ID.NOFRAMES:
		case TAG_ID.SCRIPT:
		case TAG_ID.STYLE:
		case TAG_ID.TEMPLATE:
		case TAG_ID.TITLE:
			p._err(token, ERR.abandonedHeadElementChild);
			p.openElements.push(p.headElement, TAG_ID.HEAD);
			startTagInHead(p, token);
			p.openElements.remove(p.headElement);
			break;
		case TAG_ID.HEAD:
			p._err(token, ERR.misplacedStartTagForHeadElement);
			break;
		default: tokenAfterHead(p, token);
	}
}
function endTagAfterHead(p, token) {
	switch (token.tagID) {
		case TAG_ID.BODY:
		case TAG_ID.HTML:
		case TAG_ID.BR:
			tokenAfterHead(p, token);
			break;
		case TAG_ID.TEMPLATE:
			templateEndTagInHead(p, token);
			break;
		default: p._err(token, ERR.endTagWithoutMatchingOpenElement);
	}
}
function tokenAfterHead(p, token) {
	p._insertFakeElement(TAG_NAMES.BODY, TAG_ID.BODY);
	p.insertionMode = InsertionMode.IN_BODY;
	modeInBody(p, token);
}
function modeInBody(p, token) {
	switch (token.type) {
		case TokenType.CHARACTER:
			characterInBody(p, token);
			break;
		case TokenType.WHITESPACE_CHARACTER:
			whitespaceCharacterInBody(p, token);
			break;
		case TokenType.COMMENT:
			appendComment(p, token);
			break;
		case TokenType.START_TAG:
			startTagInBody(p, token);
			break;
		case TokenType.END_TAG:
			endTagInBody(p, token);
			break;
		case TokenType.EOF: eofInBody(p, token);
	}
}
function whitespaceCharacterInBody(p, token) {
	p._reconstructActiveFormattingElements();
	p._insertCharacters(token);
}
function characterInBody(p, token) {
	p._reconstructActiveFormattingElements();
	p._insertCharacters(token);
	p.framesetOk = false;
}
function htmlStartTagInBody(p, token) {
	if (p.openElements.tmplCount === 0) p.treeAdapter.adoptAttributes(p.openElements.items[0], token.attrs);
}
function bodyStartTagInBody(p, token) {
	const bodyElement = p.openElements.tryPeekProperlyNestedBodyElement();
	if (bodyElement && p.openElements.tmplCount === 0) {
		p.framesetOk = false;
		p.treeAdapter.adoptAttributes(bodyElement, token.attrs);
	}
}
function framesetStartTagInBody(p, token) {
	const bodyElement = p.openElements.tryPeekProperlyNestedBodyElement();
	if (p.framesetOk && bodyElement) {
		p.treeAdapter.detachNode(bodyElement);
		p.openElements.popAllUpToHtmlElement();
		p._insertElement(token, NS.HTML);
		p.insertionMode = InsertionMode.IN_FRAMESET;
	}
}
function addressStartTagInBody(p, token) {
	if (p.openElements.hasInButtonScope(TAG_ID.P)) p._closePElement();
	p._insertElement(token, NS.HTML);
}
function numberedHeaderStartTagInBody(p, token) {
	if (p.openElements.hasInButtonScope(TAG_ID.P)) p._closePElement();
	if (p.openElements.currentTagId !== void 0 && NUMBERED_HEADERS.has(p.openElements.currentTagId)) p.openElements.pop();
	p._insertElement(token, NS.HTML);
}
function preStartTagInBody(p, token) {
	if (p.openElements.hasInButtonScope(TAG_ID.P)) p._closePElement();
	p._insertElement(token, NS.HTML);
	p.skipNextNewLine = true;
	p.framesetOk = false;
}
function formStartTagInBody(p, token) {
	const inTemplate = p.openElements.tmplCount > 0;
	if (!p.formElement || inTemplate) {
		if (p.openElements.hasInButtonScope(TAG_ID.P)) p._closePElement();
		p._insertElement(token, NS.HTML);
		if (!inTemplate) p.formElement = p.openElements.current;
	}
}
function listItemStartTagInBody(p, token) {
	p.framesetOk = false;
	const tn = token.tagID;
	for (let i = p.openElements.stackTop; i >= 0; i--) {
		const elementId = p.openElements.tagIDs[i];
		if (tn === TAG_ID.LI && elementId === TAG_ID.LI || (tn === TAG_ID.DD || tn === TAG_ID.DT) && (elementId === TAG_ID.DD || elementId === TAG_ID.DT)) {
			p.openElements.generateImpliedEndTagsWithExclusion(elementId);
			p.openElements.popUntilTagNamePopped(elementId);
			break;
		}
		if (elementId !== TAG_ID.ADDRESS && elementId !== TAG_ID.DIV && elementId !== TAG_ID.P && p._isSpecialElement(p.openElements.items[i], elementId)) break;
	}
	if (p.openElements.hasInButtonScope(TAG_ID.P)) p._closePElement();
	p._insertElement(token, NS.HTML);
}
function plaintextStartTagInBody(p, token) {
	if (p.openElements.hasInButtonScope(TAG_ID.P)) p._closePElement();
	p._insertElement(token, NS.HTML);
	p.tokenizer.state = TokenizerMode.PLAINTEXT;
}
function buttonStartTagInBody(p, token) {
	if (p.openElements.hasInScope(TAG_ID.BUTTON)) {
		p.openElements.generateImpliedEndTags();
		p.openElements.popUntilTagNamePopped(TAG_ID.BUTTON);
	}
	p._reconstructActiveFormattingElements();
	p._insertElement(token, NS.HTML);
	p.framesetOk = false;
}
function aStartTagInBody(p, token) {
	const activeElementEntry = p.activeFormattingElements.getElementEntryInScopeWithTagName(TAG_NAMES.A);
	if (activeElementEntry) {
		callAdoptionAgency(p, token);
		p.openElements.remove(activeElementEntry.element);
		p.activeFormattingElements.removeEntry(activeElementEntry);
	}
	p._reconstructActiveFormattingElements();
	p._insertElement(token, NS.HTML);
	p.activeFormattingElements.pushElement(p.openElements.current, token);
}
function bStartTagInBody(p, token) {
	p._reconstructActiveFormattingElements();
	p._insertElement(token, NS.HTML);
	p.activeFormattingElements.pushElement(p.openElements.current, token);
}
function nobrStartTagInBody(p, token) {
	p._reconstructActiveFormattingElements();
	if (p.openElements.hasInScope(TAG_ID.NOBR)) {
		callAdoptionAgency(p, token);
		p._reconstructActiveFormattingElements();
	}
	p._insertElement(token, NS.HTML);
	p.activeFormattingElements.pushElement(p.openElements.current, token);
}
function appletStartTagInBody(p, token) {
	p._reconstructActiveFormattingElements();
	p._insertElement(token, NS.HTML);
	p.activeFormattingElements.insertMarker();
	p.framesetOk = false;
}
function tableStartTagInBody(p, token) {
	if (p.treeAdapter.getDocumentMode(p.document) !== DOCUMENT_MODE.QUIRKS && p.openElements.hasInButtonScope(TAG_ID.P)) p._closePElement();
	p._insertElement(token, NS.HTML);
	p.framesetOk = false;
	p.insertionMode = InsertionMode.IN_TABLE;
}
function areaStartTagInBody(p, token) {
	p._reconstructActiveFormattingElements();
	p._appendElement(token, NS.HTML);
	p.framesetOk = false;
	token.ackSelfClosing = true;
}
function isHiddenInput(token) {
	const inputType = getTokenAttr(token, ATTRS.TYPE);
	return inputType != null && inputType.toLowerCase() === HIDDEN_INPUT_TYPE;
}
function inputStartTagInBody(p, token) {
	p._reconstructActiveFormattingElements();
	p._appendElement(token, NS.HTML);
	if (!isHiddenInput(token)) p.framesetOk = false;
	token.ackSelfClosing = true;
}
function paramStartTagInBody(p, token) {
	p._appendElement(token, NS.HTML);
	token.ackSelfClosing = true;
}
function hrStartTagInBody(p, token) {
	if (p.openElements.hasInButtonScope(TAG_ID.P)) p._closePElement();
	p._appendElement(token, NS.HTML);
	p.framesetOk = false;
	token.ackSelfClosing = true;
}
function imageStartTagInBody(p, token) {
	token.tagName = TAG_NAMES.IMG;
	token.tagID = TAG_ID.IMG;
	areaStartTagInBody(p, token);
}
function textareaStartTagInBody(p, token) {
	p._insertElement(token, NS.HTML);
	p.skipNextNewLine = true;
	p.tokenizer.state = TokenizerMode.RCDATA;
	p.originalInsertionMode = p.insertionMode;
	p.framesetOk = false;
	p.insertionMode = InsertionMode.TEXT;
}
function xmpStartTagInBody(p, token) {
	if (p.openElements.hasInButtonScope(TAG_ID.P)) p._closePElement();
	p._reconstructActiveFormattingElements();
	p.framesetOk = false;
	p._switchToTextParsing(token, TokenizerMode.RAWTEXT);
}
function iframeStartTagInBody(p, token) {
	p.framesetOk = false;
	p._switchToTextParsing(token, TokenizerMode.RAWTEXT);
}
function rawTextStartTagInBody(p, token) {
	p._switchToTextParsing(token, TokenizerMode.RAWTEXT);
}
function selectStartTagInBody(p, token) {
	p._reconstructActiveFormattingElements();
	p._insertElement(token, NS.HTML);
	p.framesetOk = false;
	p.insertionMode = p.insertionMode === InsertionMode.IN_TABLE || p.insertionMode === InsertionMode.IN_CAPTION || p.insertionMode === InsertionMode.IN_TABLE_BODY || p.insertionMode === InsertionMode.IN_ROW || p.insertionMode === InsertionMode.IN_CELL ? InsertionMode.IN_SELECT_IN_TABLE : InsertionMode.IN_SELECT;
}
function optgroupStartTagInBody(p, token) {
	if (p.openElements.currentTagId === TAG_ID.OPTION) p.openElements.pop();
	p._reconstructActiveFormattingElements();
	p._insertElement(token, NS.HTML);
}
function rbStartTagInBody(p, token) {
	if (p.openElements.hasInScope(TAG_ID.RUBY)) p.openElements.generateImpliedEndTags();
	p._insertElement(token, NS.HTML);
}
function rtStartTagInBody(p, token) {
	if (p.openElements.hasInScope(TAG_ID.RUBY)) p.openElements.generateImpliedEndTagsWithExclusion(TAG_ID.RTC);
	p._insertElement(token, NS.HTML);
}
function mathStartTagInBody(p, token) {
	p._reconstructActiveFormattingElements();
	adjustTokenMathMLAttrs(token);
	adjustTokenXMLAttrs(token);
	if (token.selfClosing) p._appendElement(token, NS.MATHML);
	else p._insertElement(token, NS.MATHML);
	token.ackSelfClosing = true;
}
function svgStartTagInBody(p, token) {
	p._reconstructActiveFormattingElements();
	adjustTokenSVGAttrs(token);
	adjustTokenXMLAttrs(token);
	if (token.selfClosing) p._appendElement(token, NS.SVG);
	else p._insertElement(token, NS.SVG);
	token.ackSelfClosing = true;
}
function genericStartTagInBody(p, token) {
	p._reconstructActiveFormattingElements();
	p._insertElement(token, NS.HTML);
}
function startTagInBody(p, token) {
	switch (token.tagID) {
		case TAG_ID.I:
		case TAG_ID.S:
		case TAG_ID.B:
		case TAG_ID.U:
		case TAG_ID.EM:
		case TAG_ID.TT:
		case TAG_ID.BIG:
		case TAG_ID.CODE:
		case TAG_ID.FONT:
		case TAG_ID.SMALL:
		case TAG_ID.STRIKE:
		case TAG_ID.STRONG:
			bStartTagInBody(p, token);
			break;
		case TAG_ID.A:
			aStartTagInBody(p, token);
			break;
		case TAG_ID.H1:
		case TAG_ID.H2:
		case TAG_ID.H3:
		case TAG_ID.H4:
		case TAG_ID.H5:
		case TAG_ID.H6:
			numberedHeaderStartTagInBody(p, token);
			break;
		case TAG_ID.P:
		case TAG_ID.DL:
		case TAG_ID.OL:
		case TAG_ID.UL:
		case TAG_ID.DIV:
		case TAG_ID.DIR:
		case TAG_ID.NAV:
		case TAG_ID.MAIN:
		case TAG_ID.MENU:
		case TAG_ID.ASIDE:
		case TAG_ID.CENTER:
		case TAG_ID.FIGURE:
		case TAG_ID.FOOTER:
		case TAG_ID.HEADER:
		case TAG_ID.HGROUP:
		case TAG_ID.DIALOG:
		case TAG_ID.DETAILS:
		case TAG_ID.ADDRESS:
		case TAG_ID.ARTICLE:
		case TAG_ID.SEARCH:
		case TAG_ID.SECTION:
		case TAG_ID.SUMMARY:
		case TAG_ID.FIELDSET:
		case TAG_ID.BLOCKQUOTE:
		case TAG_ID.FIGCAPTION:
			addressStartTagInBody(p, token);
			break;
		case TAG_ID.LI:
		case TAG_ID.DD:
		case TAG_ID.DT:
			listItemStartTagInBody(p, token);
			break;
		case TAG_ID.BR:
		case TAG_ID.IMG:
		case TAG_ID.WBR:
		case TAG_ID.AREA:
		case TAG_ID.EMBED:
		case TAG_ID.KEYGEN:
			areaStartTagInBody(p, token);
			break;
		case TAG_ID.HR:
			hrStartTagInBody(p, token);
			break;
		case TAG_ID.RB:
		case TAG_ID.RTC:
			rbStartTagInBody(p, token);
			break;
		case TAG_ID.RT:
		case TAG_ID.RP:
			rtStartTagInBody(p, token);
			break;
		case TAG_ID.PRE:
		case TAG_ID.LISTING:
			preStartTagInBody(p, token);
			break;
		case TAG_ID.XMP:
			xmpStartTagInBody(p, token);
			break;
		case TAG_ID.SVG:
			svgStartTagInBody(p, token);
			break;
		case TAG_ID.HTML:
			htmlStartTagInBody(p, token);
			break;
		case TAG_ID.BASE:
		case TAG_ID.LINK:
		case TAG_ID.META:
		case TAG_ID.STYLE:
		case TAG_ID.TITLE:
		case TAG_ID.SCRIPT:
		case TAG_ID.BGSOUND:
		case TAG_ID.BASEFONT:
		case TAG_ID.TEMPLATE:
			startTagInHead(p, token);
			break;
		case TAG_ID.BODY:
			bodyStartTagInBody(p, token);
			break;
		case TAG_ID.FORM:
			formStartTagInBody(p, token);
			break;
		case TAG_ID.NOBR:
			nobrStartTagInBody(p, token);
			break;
		case TAG_ID.MATH:
			mathStartTagInBody(p, token);
			break;
		case TAG_ID.TABLE:
			tableStartTagInBody(p, token);
			break;
		case TAG_ID.INPUT:
			inputStartTagInBody(p, token);
			break;
		case TAG_ID.PARAM:
		case TAG_ID.TRACK:
		case TAG_ID.SOURCE:
			paramStartTagInBody(p, token);
			break;
		case TAG_ID.IMAGE:
			imageStartTagInBody(p, token);
			break;
		case TAG_ID.BUTTON:
			buttonStartTagInBody(p, token);
			break;
		case TAG_ID.APPLET:
		case TAG_ID.OBJECT:
		case TAG_ID.MARQUEE:
			appletStartTagInBody(p, token);
			break;
		case TAG_ID.IFRAME:
			iframeStartTagInBody(p, token);
			break;
		case TAG_ID.SELECT:
			selectStartTagInBody(p, token);
			break;
		case TAG_ID.OPTION:
		case TAG_ID.OPTGROUP:
			optgroupStartTagInBody(p, token);
			break;
		case TAG_ID.NOEMBED:
		case TAG_ID.NOFRAMES:
			rawTextStartTagInBody(p, token);
			break;
		case TAG_ID.FRAMESET:
			framesetStartTagInBody(p, token);
			break;
		case TAG_ID.TEXTAREA:
			textareaStartTagInBody(p, token);
			break;
		case TAG_ID.NOSCRIPT:
			if (p.options.scriptingEnabled) rawTextStartTagInBody(p, token);
			else genericStartTagInBody(p, token);
			break;
		case TAG_ID.PLAINTEXT:
			plaintextStartTagInBody(p, token);
			break;
		case TAG_ID.COL:
		case TAG_ID.TH:
		case TAG_ID.TD:
		case TAG_ID.TR:
		case TAG_ID.HEAD:
		case TAG_ID.FRAME:
		case TAG_ID.TBODY:
		case TAG_ID.TFOOT:
		case TAG_ID.THEAD:
		case TAG_ID.CAPTION:
		case TAG_ID.COLGROUP: break;
		default: genericStartTagInBody(p, token);
	}
}
function bodyEndTagInBody(p, token) {
	if (p.openElements.hasInScope(TAG_ID.BODY)) {
		p.insertionMode = InsertionMode.AFTER_BODY;
		if (p.options.sourceCodeLocationInfo) {
			const bodyElement = p.openElements.tryPeekProperlyNestedBodyElement();
			if (bodyElement) p._setEndLocation(bodyElement, token);
		}
	}
}
function htmlEndTagInBody(p, token) {
	if (p.openElements.hasInScope(TAG_ID.BODY)) {
		p.insertionMode = InsertionMode.AFTER_BODY;
		endTagAfterBody(p, token);
	}
}
function addressEndTagInBody(p, token) {
	const tn = token.tagID;
	if (p.openElements.hasInScope(tn)) {
		p.openElements.generateImpliedEndTags();
		p.openElements.popUntilTagNamePopped(tn);
	}
}
function formEndTagInBody(p) {
	const inTemplate = p.openElements.tmplCount > 0;
	const { formElement } = p;
	if (!inTemplate) p.formElement = null;
	if ((formElement || inTemplate) && p.openElements.hasInScope(TAG_ID.FORM)) {
		p.openElements.generateImpliedEndTags();
		if (inTemplate) p.openElements.popUntilTagNamePopped(TAG_ID.FORM);
		else if (formElement) p.openElements.remove(formElement);
	}
}
function pEndTagInBody(p) {
	if (!p.openElements.hasInButtonScope(TAG_ID.P)) p._insertFakeElement(TAG_NAMES.P, TAG_ID.P);
	p._closePElement();
}
function liEndTagInBody(p) {
	if (p.openElements.hasInListItemScope(TAG_ID.LI)) {
		p.openElements.generateImpliedEndTagsWithExclusion(TAG_ID.LI);
		p.openElements.popUntilTagNamePopped(TAG_ID.LI);
	}
}
function ddEndTagInBody(p, token) {
	const tn = token.tagID;
	if (p.openElements.hasInScope(tn)) {
		p.openElements.generateImpliedEndTagsWithExclusion(tn);
		p.openElements.popUntilTagNamePopped(tn);
	}
}
function numberedHeaderEndTagInBody(p) {
	if (p.openElements.hasNumberedHeaderInScope()) {
		p.openElements.generateImpliedEndTags();
		p.openElements.popUntilNumberedHeaderPopped();
	}
}
function appletEndTagInBody(p, token) {
	const tn = token.tagID;
	if (p.openElements.hasInScope(tn)) {
		p.openElements.generateImpliedEndTags();
		p.openElements.popUntilTagNamePopped(tn);
		p.activeFormattingElements.clearToLastMarker();
	}
}
function brEndTagInBody(p) {
	p._reconstructActiveFormattingElements();
	p._insertFakeElement(TAG_NAMES.BR, TAG_ID.BR);
	p.openElements.pop();
	p.framesetOk = false;
}
function genericEndTagInBody(p, token) {
	const tn = token.tagName;
	const tid = token.tagID;
	for (let i = p.openElements.stackTop; i > 0; i--) {
		const element = p.openElements.items[i];
		const elementId = p.openElements.tagIDs[i];
		if (tid === elementId && (tid !== TAG_ID.UNKNOWN || p.treeAdapter.getTagName(element) === tn)) {
			p.openElements.generateImpliedEndTagsWithExclusion(tid);
			if (p.openElements.stackTop >= i) p.openElements.shortenToLength(i);
			break;
		}
		if (p._isSpecialElement(element, elementId)) break;
	}
}
function endTagInBody(p, token) {
	switch (token.tagID) {
		case TAG_ID.A:
		case TAG_ID.B:
		case TAG_ID.I:
		case TAG_ID.S:
		case TAG_ID.U:
		case TAG_ID.EM:
		case TAG_ID.TT:
		case TAG_ID.BIG:
		case TAG_ID.CODE:
		case TAG_ID.FONT:
		case TAG_ID.NOBR:
		case TAG_ID.SMALL:
		case TAG_ID.STRIKE:
		case TAG_ID.STRONG:
			callAdoptionAgency(p, token);
			break;
		case TAG_ID.P:
			pEndTagInBody(p);
			break;
		case TAG_ID.DL:
		case TAG_ID.UL:
		case TAG_ID.OL:
		case TAG_ID.DIR:
		case TAG_ID.DIV:
		case TAG_ID.NAV:
		case TAG_ID.PRE:
		case TAG_ID.MAIN:
		case TAG_ID.MENU:
		case TAG_ID.ASIDE:
		case TAG_ID.BUTTON:
		case TAG_ID.CENTER:
		case TAG_ID.FIGURE:
		case TAG_ID.FOOTER:
		case TAG_ID.HEADER:
		case TAG_ID.HGROUP:
		case TAG_ID.DIALOG:
		case TAG_ID.ADDRESS:
		case TAG_ID.ARTICLE:
		case TAG_ID.DETAILS:
		case TAG_ID.SEARCH:
		case TAG_ID.SECTION:
		case TAG_ID.SUMMARY:
		case TAG_ID.LISTING:
		case TAG_ID.FIELDSET:
		case TAG_ID.BLOCKQUOTE:
		case TAG_ID.FIGCAPTION:
			addressEndTagInBody(p, token);
			break;
		case TAG_ID.LI:
			liEndTagInBody(p);
			break;
		case TAG_ID.DD:
		case TAG_ID.DT:
			ddEndTagInBody(p, token);
			break;
		case TAG_ID.H1:
		case TAG_ID.H2:
		case TAG_ID.H3:
		case TAG_ID.H4:
		case TAG_ID.H5:
		case TAG_ID.H6:
			numberedHeaderEndTagInBody(p);
			break;
		case TAG_ID.BR:
			brEndTagInBody(p);
			break;
		case TAG_ID.BODY:
			bodyEndTagInBody(p, token);
			break;
		case TAG_ID.HTML:
			htmlEndTagInBody(p, token);
			break;
		case TAG_ID.FORM:
			formEndTagInBody(p);
			break;
		case TAG_ID.APPLET:
		case TAG_ID.OBJECT:
		case TAG_ID.MARQUEE:
			appletEndTagInBody(p, token);
			break;
		case TAG_ID.TEMPLATE:
			templateEndTagInHead(p, token);
			break;
		default: genericEndTagInBody(p, token);
	}
}
function eofInBody(p, token) {
	if (p.tmplInsertionModeStack.length > 0) eofInTemplate(p, token);
	else stopParsing(p, token);
}
function endTagInText(p, token) {
	var _a;
	if (token.tagID === TAG_ID.SCRIPT) (_a = p.scriptHandler) === null || _a === void 0 || _a.call(p, p.openElements.current);
	p.openElements.pop();
	p.insertionMode = p.originalInsertionMode;
}
function eofInText(p, token) {
	p._err(token, ERR.eofInElementThatCanContainOnlyText);
	p.openElements.pop();
	p.insertionMode = p.originalInsertionMode;
	p.onEof(token);
}
function characterInTable(p, token) {
	if (p.openElements.currentTagId !== void 0 && TABLE_STRUCTURE_TAGS.has(p.openElements.currentTagId)) {
		p.pendingCharacterTokens.length = 0;
		p.hasNonWhitespacePendingCharacterToken = false;
		p.originalInsertionMode = p.insertionMode;
		p.insertionMode = InsertionMode.IN_TABLE_TEXT;
		switch (token.type) {
			case TokenType.CHARACTER:
				characterInTableText(p, token);
				break;
			case TokenType.WHITESPACE_CHARACTER: whitespaceCharacterInTableText(p, token);
		}
	} else tokenInTable(p, token);
}
function captionStartTagInTable(p, token) {
	p.openElements.clearBackToTableContext();
	p.activeFormattingElements.insertMarker();
	p._insertElement(token, NS.HTML);
	p.insertionMode = InsertionMode.IN_CAPTION;
}
function colgroupStartTagInTable(p, token) {
	p.openElements.clearBackToTableContext();
	p._insertElement(token, NS.HTML);
	p.insertionMode = InsertionMode.IN_COLUMN_GROUP;
}
function colStartTagInTable(p, token) {
	p.openElements.clearBackToTableContext();
	p._insertFakeElement(TAG_NAMES.COLGROUP, TAG_ID.COLGROUP);
	p.insertionMode = InsertionMode.IN_COLUMN_GROUP;
	startTagInColumnGroup(p, token);
}
function tbodyStartTagInTable(p, token) {
	p.openElements.clearBackToTableContext();
	p._insertElement(token, NS.HTML);
	p.insertionMode = InsertionMode.IN_TABLE_BODY;
}
function tdStartTagInTable(p, token) {
	p.openElements.clearBackToTableContext();
	p._insertFakeElement(TAG_NAMES.TBODY, TAG_ID.TBODY);
	p.insertionMode = InsertionMode.IN_TABLE_BODY;
	startTagInTableBody(p, token);
}
function tableStartTagInTable(p, token) {
	if (p.openElements.hasInTableScope(TAG_ID.TABLE)) {
		p.openElements.popUntilTagNamePopped(TAG_ID.TABLE);
		p._resetInsertionMode();
		p._processStartTag(token);
	}
}
function inputStartTagInTable(p, token) {
	if (isHiddenInput(token)) p._appendElement(token, NS.HTML);
	else tokenInTable(p, token);
	token.ackSelfClosing = true;
}
function formStartTagInTable(p, token) {
	if (!p.formElement && p.openElements.tmplCount === 0) {
		p._insertElement(token, NS.HTML);
		p.formElement = p.openElements.current;
		p.openElements.pop();
	}
}
function startTagInTable(p, token) {
	switch (token.tagID) {
		case TAG_ID.TD:
		case TAG_ID.TH:
		case TAG_ID.TR:
			tdStartTagInTable(p, token);
			break;
		case TAG_ID.STYLE:
		case TAG_ID.SCRIPT:
		case TAG_ID.TEMPLATE:
			startTagInHead(p, token);
			break;
		case TAG_ID.COL:
			colStartTagInTable(p, token);
			break;
		case TAG_ID.FORM:
			formStartTagInTable(p, token);
			break;
		case TAG_ID.TABLE:
			tableStartTagInTable(p, token);
			break;
		case TAG_ID.TBODY:
		case TAG_ID.TFOOT:
		case TAG_ID.THEAD:
			tbodyStartTagInTable(p, token);
			break;
		case TAG_ID.INPUT:
			inputStartTagInTable(p, token);
			break;
		case TAG_ID.CAPTION:
			captionStartTagInTable(p, token);
			break;
		case TAG_ID.COLGROUP:
			colgroupStartTagInTable(p, token);
			break;
		default: tokenInTable(p, token);
	}
}
function endTagInTable(p, token) {
	switch (token.tagID) {
		case TAG_ID.TABLE:
			if (p.openElements.hasInTableScope(TAG_ID.TABLE)) {
				p.openElements.popUntilTagNamePopped(TAG_ID.TABLE);
				p._resetInsertionMode();
			}
			break;
		case TAG_ID.TEMPLATE:
			templateEndTagInHead(p, token);
			break;
		case TAG_ID.BODY:
		case TAG_ID.CAPTION:
		case TAG_ID.COL:
		case TAG_ID.COLGROUP:
		case TAG_ID.HTML:
		case TAG_ID.TBODY:
		case TAG_ID.TD:
		case TAG_ID.TFOOT:
		case TAG_ID.TH:
		case TAG_ID.THEAD:
		case TAG_ID.TR: break;
		default: tokenInTable(p, token);
	}
}
function tokenInTable(p, token) {
	const savedFosterParentingState = p.fosterParentingEnabled;
	p.fosterParentingEnabled = true;
	modeInBody(p, token);
	p.fosterParentingEnabled = savedFosterParentingState;
}
function whitespaceCharacterInTableText(p, token) {
	p.pendingCharacterTokens.push(token);
}
function characterInTableText(p, token) {
	p.pendingCharacterTokens.push(token);
	p.hasNonWhitespacePendingCharacterToken = true;
}
function tokenInTableText(p, token) {
	let i = 0;
	if (p.hasNonWhitespacePendingCharacterToken) for (; i < p.pendingCharacterTokens.length; i++) tokenInTable(p, p.pendingCharacterTokens[i]);
	else for (; i < p.pendingCharacterTokens.length; i++) p._insertCharacters(p.pendingCharacterTokens[i]);
	p.insertionMode = p.originalInsertionMode;
	p._processToken(token);
}
const TABLE_VOID_ELEMENTS = /* @__PURE__ */ new Set([
	TAG_ID.CAPTION,
	TAG_ID.COL,
	TAG_ID.COLGROUP,
	TAG_ID.TBODY,
	TAG_ID.TD,
	TAG_ID.TFOOT,
	TAG_ID.TH,
	TAG_ID.THEAD,
	TAG_ID.TR
]);
function startTagInCaption(p, token) {
	const tn = token.tagID;
	if (TABLE_VOID_ELEMENTS.has(tn)) {
		if (p.openElements.hasInTableScope(TAG_ID.CAPTION)) {
			p.openElements.generateImpliedEndTags();
			p.openElements.popUntilTagNamePopped(TAG_ID.CAPTION);
			p.activeFormattingElements.clearToLastMarker();
			p.insertionMode = InsertionMode.IN_TABLE;
			startTagInTable(p, token);
		}
	} else startTagInBody(p, token);
}
function endTagInCaption(p, token) {
	const tn = token.tagID;
	switch (tn) {
		case TAG_ID.CAPTION:
		case TAG_ID.TABLE:
			if (p.openElements.hasInTableScope(TAG_ID.CAPTION)) {
				p.openElements.generateImpliedEndTags();
				p.openElements.popUntilTagNamePopped(TAG_ID.CAPTION);
				p.activeFormattingElements.clearToLastMarker();
				p.insertionMode = InsertionMode.IN_TABLE;
				if (tn === TAG_ID.TABLE) endTagInTable(p, token);
			}
			break;
		case TAG_ID.BODY:
		case TAG_ID.COL:
		case TAG_ID.COLGROUP:
		case TAG_ID.HTML:
		case TAG_ID.TBODY:
		case TAG_ID.TD:
		case TAG_ID.TFOOT:
		case TAG_ID.TH:
		case TAG_ID.THEAD:
		case TAG_ID.TR: break;
		default: endTagInBody(p, token);
	}
}
function startTagInColumnGroup(p, token) {
	switch (token.tagID) {
		case TAG_ID.HTML:
			startTagInBody(p, token);
			break;
		case TAG_ID.COL:
			p._appendElement(token, NS.HTML);
			token.ackSelfClosing = true;
			break;
		case TAG_ID.TEMPLATE:
			startTagInHead(p, token);
			break;
		default: tokenInColumnGroup(p, token);
	}
}
function endTagInColumnGroup(p, token) {
	switch (token.tagID) {
		case TAG_ID.COLGROUP:
			if (p.openElements.currentTagId === TAG_ID.COLGROUP) {
				p.openElements.pop();
				p.insertionMode = InsertionMode.IN_TABLE;
			}
			break;
		case TAG_ID.TEMPLATE:
			templateEndTagInHead(p, token);
			break;
		case TAG_ID.COL: break;
		default: tokenInColumnGroup(p, token);
	}
}
function tokenInColumnGroup(p, token) {
	if (p.openElements.currentTagId === TAG_ID.COLGROUP) {
		p.openElements.pop();
		p.insertionMode = InsertionMode.IN_TABLE;
		p._processToken(token);
	}
}
function startTagInTableBody(p, token) {
	switch (token.tagID) {
		case TAG_ID.TR:
			p.openElements.clearBackToTableBodyContext();
			p._insertElement(token, NS.HTML);
			p.insertionMode = InsertionMode.IN_ROW;
			break;
		case TAG_ID.TH:
		case TAG_ID.TD:
			p.openElements.clearBackToTableBodyContext();
			p._insertFakeElement(TAG_NAMES.TR, TAG_ID.TR);
			p.insertionMode = InsertionMode.IN_ROW;
			startTagInRow(p, token);
			break;
		case TAG_ID.CAPTION:
		case TAG_ID.COL:
		case TAG_ID.COLGROUP:
		case TAG_ID.TBODY:
		case TAG_ID.TFOOT:
		case TAG_ID.THEAD:
			if (p.openElements.hasTableBodyContextInTableScope()) {
				p.openElements.clearBackToTableBodyContext();
				p.openElements.pop();
				p.insertionMode = InsertionMode.IN_TABLE;
				startTagInTable(p, token);
			}
			break;
		default: startTagInTable(p, token);
	}
}
function endTagInTableBody(p, token) {
	const tn = token.tagID;
	switch (token.tagID) {
		case TAG_ID.TBODY:
		case TAG_ID.TFOOT:
		case TAG_ID.THEAD:
			if (p.openElements.hasInTableScope(tn)) {
				p.openElements.clearBackToTableBodyContext();
				p.openElements.pop();
				p.insertionMode = InsertionMode.IN_TABLE;
			}
			break;
		case TAG_ID.TABLE:
			if (p.openElements.hasTableBodyContextInTableScope()) {
				p.openElements.clearBackToTableBodyContext();
				p.openElements.pop();
				p.insertionMode = InsertionMode.IN_TABLE;
				endTagInTable(p, token);
			}
			break;
		case TAG_ID.BODY:
		case TAG_ID.CAPTION:
		case TAG_ID.COL:
		case TAG_ID.COLGROUP:
		case TAG_ID.HTML:
		case TAG_ID.TD:
		case TAG_ID.TH:
		case TAG_ID.TR: break;
		default: endTagInTable(p, token);
	}
}
function startTagInRow(p, token) {
	switch (token.tagID) {
		case TAG_ID.TH:
		case TAG_ID.TD:
			p.openElements.clearBackToTableRowContext();
			p._insertElement(token, NS.HTML);
			p.insertionMode = InsertionMode.IN_CELL;
			p.activeFormattingElements.insertMarker();
			break;
		case TAG_ID.CAPTION:
		case TAG_ID.COL:
		case TAG_ID.COLGROUP:
		case TAG_ID.TBODY:
		case TAG_ID.TFOOT:
		case TAG_ID.THEAD:
		case TAG_ID.TR:
			if (p.openElements.hasInTableScope(TAG_ID.TR)) {
				p.openElements.clearBackToTableRowContext();
				p.openElements.pop();
				p.insertionMode = InsertionMode.IN_TABLE_BODY;
				startTagInTableBody(p, token);
			}
			break;
		default: startTagInTable(p, token);
	}
}
function endTagInRow(p, token) {
	switch (token.tagID) {
		case TAG_ID.TR:
			if (p.openElements.hasInTableScope(TAG_ID.TR)) {
				p.openElements.clearBackToTableRowContext();
				p.openElements.pop();
				p.insertionMode = InsertionMode.IN_TABLE_BODY;
			}
			break;
		case TAG_ID.TABLE:
			if (p.openElements.hasInTableScope(TAG_ID.TR)) {
				p.openElements.clearBackToTableRowContext();
				p.openElements.pop();
				p.insertionMode = InsertionMode.IN_TABLE_BODY;
				endTagInTableBody(p, token);
			}
			break;
		case TAG_ID.TBODY:
		case TAG_ID.TFOOT:
		case TAG_ID.THEAD:
			if (p.openElements.hasInTableScope(token.tagID) || p.openElements.hasInTableScope(TAG_ID.TR)) {
				p.openElements.clearBackToTableRowContext();
				p.openElements.pop();
				p.insertionMode = InsertionMode.IN_TABLE_BODY;
				endTagInTableBody(p, token);
			}
			break;
		case TAG_ID.BODY:
		case TAG_ID.CAPTION:
		case TAG_ID.COL:
		case TAG_ID.COLGROUP:
		case TAG_ID.HTML:
		case TAG_ID.TD:
		case TAG_ID.TH: break;
		default: endTagInTable(p, token);
	}
}
function startTagInCell(p, token) {
	const tn = token.tagID;
	if (TABLE_VOID_ELEMENTS.has(tn)) {
		if (p.openElements.hasInTableScope(TAG_ID.TD) || p.openElements.hasInTableScope(TAG_ID.TH)) {
			p._closeTableCell();
			startTagInRow(p, token);
		}
	} else startTagInBody(p, token);
}
function endTagInCell(p, token) {
	const tn = token.tagID;
	switch (tn) {
		case TAG_ID.TD:
		case TAG_ID.TH:
			if (p.openElements.hasInTableScope(tn)) {
				p.openElements.generateImpliedEndTags();
				p.openElements.popUntilTagNamePopped(tn);
				p.activeFormattingElements.clearToLastMarker();
				p.insertionMode = InsertionMode.IN_ROW;
			}
			break;
		case TAG_ID.TABLE:
		case TAG_ID.TBODY:
		case TAG_ID.TFOOT:
		case TAG_ID.THEAD:
		case TAG_ID.TR:
			if (p.openElements.hasInTableScope(tn)) {
				p._closeTableCell();
				endTagInRow(p, token);
			}
			break;
		case TAG_ID.BODY:
		case TAG_ID.CAPTION:
		case TAG_ID.COL:
		case TAG_ID.COLGROUP:
		case TAG_ID.HTML: break;
		default: endTagInBody(p, token);
	}
}
function startTagInSelect(p, token) {
	switch (token.tagID) {
		case TAG_ID.HTML:
			startTagInBody(p, token);
			break;
		case TAG_ID.OPTION:
			if (p.openElements.currentTagId === TAG_ID.OPTION) p.openElements.pop();
			p._insertElement(token, NS.HTML);
			break;
		case TAG_ID.OPTGROUP:
			if (p.openElements.currentTagId === TAG_ID.OPTION) p.openElements.pop();
			if (p.openElements.currentTagId === TAG_ID.OPTGROUP) p.openElements.pop();
			p._insertElement(token, NS.HTML);
			break;
		case TAG_ID.HR:
			if (p.openElements.currentTagId === TAG_ID.OPTION) p.openElements.pop();
			if (p.openElements.currentTagId === TAG_ID.OPTGROUP) p.openElements.pop();
			p._appendElement(token, NS.HTML);
			token.ackSelfClosing = true;
			break;
		case TAG_ID.INPUT:
		case TAG_ID.KEYGEN:
		case TAG_ID.TEXTAREA:
		case TAG_ID.SELECT:
			if (p.openElements.hasInSelectScope(TAG_ID.SELECT)) {
				p.openElements.popUntilTagNamePopped(TAG_ID.SELECT);
				p._resetInsertionMode();
				if (token.tagID !== TAG_ID.SELECT) p._processStartTag(token);
			}
			break;
		case TAG_ID.SCRIPT:
		case TAG_ID.TEMPLATE: startTagInHead(p, token);
	}
}
function endTagInSelect(p, token) {
	switch (token.tagID) {
		case TAG_ID.OPTGROUP:
			if (p.openElements.stackTop > 0 && p.openElements.currentTagId === TAG_ID.OPTION && p.openElements.tagIDs[p.openElements.stackTop - 1] === TAG_ID.OPTGROUP) p.openElements.pop();
			if (p.openElements.currentTagId === TAG_ID.OPTGROUP) p.openElements.pop();
			break;
		case TAG_ID.OPTION:
			if (p.openElements.currentTagId === TAG_ID.OPTION) p.openElements.pop();
			break;
		case TAG_ID.SELECT:
			if (p.openElements.hasInSelectScope(TAG_ID.SELECT)) {
				p.openElements.popUntilTagNamePopped(TAG_ID.SELECT);
				p._resetInsertionMode();
			}
			break;
		case TAG_ID.TEMPLATE: templateEndTagInHead(p, token);
	}
}
function startTagInSelectInTable(p, token) {
	const tn = token.tagID;
	if (tn === TAG_ID.CAPTION || tn === TAG_ID.TABLE || tn === TAG_ID.TBODY || tn === TAG_ID.TFOOT || tn === TAG_ID.THEAD || tn === TAG_ID.TR || tn === TAG_ID.TD || tn === TAG_ID.TH) {
		p.openElements.popUntilTagNamePopped(TAG_ID.SELECT);
		p._resetInsertionMode();
		p._processStartTag(token);
	} else startTagInSelect(p, token);
}
function endTagInSelectInTable(p, token) {
	const tn = token.tagID;
	if (tn === TAG_ID.CAPTION || tn === TAG_ID.TABLE || tn === TAG_ID.TBODY || tn === TAG_ID.TFOOT || tn === TAG_ID.THEAD || tn === TAG_ID.TR || tn === TAG_ID.TD || tn === TAG_ID.TH) {
		if (p.openElements.hasInTableScope(tn)) {
			p.openElements.popUntilTagNamePopped(TAG_ID.SELECT);
			p._resetInsertionMode();
			p.onEndTag(token);
		}
	} else endTagInSelect(p, token);
}
function startTagInTemplate(p, token) {
	switch (token.tagID) {
		case TAG_ID.BASE:
		case TAG_ID.BASEFONT:
		case TAG_ID.BGSOUND:
		case TAG_ID.LINK:
		case TAG_ID.META:
		case TAG_ID.NOFRAMES:
		case TAG_ID.SCRIPT:
		case TAG_ID.STYLE:
		case TAG_ID.TEMPLATE:
		case TAG_ID.TITLE:
			startTagInHead(p, token);
			break;
		case TAG_ID.CAPTION:
		case TAG_ID.COLGROUP:
		case TAG_ID.TBODY:
		case TAG_ID.TFOOT:
		case TAG_ID.THEAD:
			p.tmplInsertionModeStack[0] = InsertionMode.IN_TABLE;
			p.insertionMode = InsertionMode.IN_TABLE;
			startTagInTable(p, token);
			break;
		case TAG_ID.COL:
			p.tmplInsertionModeStack[0] = InsertionMode.IN_COLUMN_GROUP;
			p.insertionMode = InsertionMode.IN_COLUMN_GROUP;
			startTagInColumnGroup(p, token);
			break;
		case TAG_ID.TR:
			p.tmplInsertionModeStack[0] = InsertionMode.IN_TABLE_BODY;
			p.insertionMode = InsertionMode.IN_TABLE_BODY;
			startTagInTableBody(p, token);
			break;
		case TAG_ID.TD:
		case TAG_ID.TH:
			p.tmplInsertionModeStack[0] = InsertionMode.IN_ROW;
			p.insertionMode = InsertionMode.IN_ROW;
			startTagInRow(p, token);
			break;
		default:
			p.tmplInsertionModeStack[0] = InsertionMode.IN_BODY;
			p.insertionMode = InsertionMode.IN_BODY;
			startTagInBody(p, token);
	}
}
function endTagInTemplate(p, token) {
	if (token.tagID === TAG_ID.TEMPLATE) templateEndTagInHead(p, token);
}
function eofInTemplate(p, token) {
	if (p.openElements.tmplCount > 0) {
		p.openElements.popUntilTagNamePopped(TAG_ID.TEMPLATE);
		p.activeFormattingElements.clearToLastMarker();
		p.tmplInsertionModeStack.shift();
		p._resetInsertionMode();
		p.onEof(token);
	} else stopParsing(p, token);
}
function startTagAfterBody(p, token) {
	if (token.tagID === TAG_ID.HTML) startTagInBody(p, token);
	else tokenAfterBody(p, token);
}
function endTagAfterBody(p, token) {
	var _a;
	if (token.tagID === TAG_ID.HTML) {
		if (!p.fragmentContext) p.insertionMode = InsertionMode.AFTER_AFTER_BODY;
		if (p.options.sourceCodeLocationInfo && p.openElements.tagIDs[0] === TAG_ID.HTML) {
			p._setEndLocation(p.openElements.items[0], token);
			const bodyElement = p.openElements.items[1];
			if (bodyElement && !((_a = p.treeAdapter.getNodeSourceCodeLocation(bodyElement)) === null || _a === void 0 ? void 0 : _a.endTag)) p._setEndLocation(bodyElement, token);
		}
	} else tokenAfterBody(p, token);
}
function tokenAfterBody(p, token) {
	p.insertionMode = InsertionMode.IN_BODY;
	modeInBody(p, token);
}
function startTagInFrameset(p, token) {
	switch (token.tagID) {
		case TAG_ID.HTML:
			startTagInBody(p, token);
			break;
		case TAG_ID.FRAMESET:
			p._insertElement(token, NS.HTML);
			break;
		case TAG_ID.FRAME:
			p._appendElement(token, NS.HTML);
			token.ackSelfClosing = true;
			break;
		case TAG_ID.NOFRAMES: startTagInHead(p, token);
	}
}
function endTagInFrameset(p, token) {
	if (token.tagID === TAG_ID.FRAMESET && !p.openElements.isRootHtmlElementCurrent()) {
		p.openElements.pop();
		if (!p.fragmentContext && p.openElements.currentTagId !== TAG_ID.FRAMESET) p.insertionMode = InsertionMode.AFTER_FRAMESET;
	}
}
function startTagAfterFrameset(p, token) {
	switch (token.tagID) {
		case TAG_ID.HTML:
			startTagInBody(p, token);
			break;
		case TAG_ID.NOFRAMES: startTagInHead(p, token);
	}
}
function endTagAfterFrameset(p, token) {
	if (token.tagID === TAG_ID.HTML) p.insertionMode = InsertionMode.AFTER_AFTER_FRAMESET;
}
function startTagAfterAfterBody(p, token) {
	if (token.tagID === TAG_ID.HTML) startTagInBody(p, token);
	else tokenAfterAfterBody(p, token);
}
function tokenAfterAfterBody(p, token) {
	p.insertionMode = InsertionMode.IN_BODY;
	modeInBody(p, token);
}
function startTagAfterAfterFrameset(p, token) {
	switch (token.tagID) {
		case TAG_ID.HTML:
			startTagInBody(p, token);
			break;
		case TAG_ID.NOFRAMES: startTagInHead(p, token);
	}
}
function nullCharacterInForeignContent(p, token) {
	token.chars = "�";
	p._insertCharacters(token);
}
function characterInForeignContent(p, token) {
	p._insertCharacters(token);
	p.framesetOk = false;
}
function popUntilHtmlOrIntegrationPoint(p) {
	while (p.treeAdapter.getNamespaceURI(p.openElements.current) !== NS.HTML && p.openElements.currentTagId !== void 0 && !p._isIntegrationPoint(p.openElements.currentTagId, p.openElements.current)) p.openElements.pop();
}
function startTagInForeignContent(p, token) {
	if (causesExit(token)) {
		popUntilHtmlOrIntegrationPoint(p);
		p._startTagOutsideForeignContent(token);
	} else {
		const current = p._getAdjustedCurrentElement();
		const currentNs = p.treeAdapter.getNamespaceURI(current);
		if (currentNs === NS.MATHML) adjustTokenMathMLAttrs(token);
		else if (currentNs === NS.SVG) {
			adjustTokenSVGTagName(token);
			adjustTokenSVGAttrs(token);
		}
		adjustTokenXMLAttrs(token);
		if (token.selfClosing) p._appendElement(token, currentNs);
		else p._insertElement(token, currentNs);
		token.ackSelfClosing = true;
	}
}
function endTagInForeignContent(p, token) {
	if (token.tagID === TAG_ID.P || token.tagID === TAG_ID.BR) {
		popUntilHtmlOrIntegrationPoint(p);
		p._endTagOutsideForeignContent(token);
		return;
	}
	for (let i = p.openElements.stackTop; i > 0; i--) {
		const element = p.openElements.items[i];
		if (p.treeAdapter.getNamespaceURI(element) === NS.HTML) {
			p._endTagOutsideForeignContent(token);
			break;
		}
		const tagName = p.treeAdapter.getTagName(element);
		if (tagName.toLowerCase() === token.tagName) {
			token.tagName = tagName;
			p.openElements.shortenToLength(i);
			break;
		}
	}
}
TAG_NAMES.AREA, TAG_NAMES.BASE, TAG_NAMES.BASEFONT, TAG_NAMES.BGSOUND, TAG_NAMES.BR, TAG_NAMES.COL, TAG_NAMES.EMBED, TAG_NAMES.FRAME, TAG_NAMES.HR, TAG_NAMES.IMG, TAG_NAMES.INPUT, TAG_NAMES.KEYGEN, TAG_NAMES.LINK, TAG_NAMES.META, TAG_NAMES.PARAM, TAG_NAMES.SOURCE, TAG_NAMES.TRACK, TAG_NAMES.WBR;
//#endregion
//#region node_modules/.pnpm/parse5@8.0.1/node_modules/parse5/dist/index.js
/**
* Parses an HTML string.
*
* @param html Input HTML string.
* @param options Parsing options.
* @returns Document
*
* @example
*
* ```js
* const parse5 = require('parse5');
*
* const document = parse5.parse('<!DOCTYPE html><html><head></head><body>Hi there!</body></html>');
*
* console.log(document.childNodes[1].tagName); //> 'html'
*```
*/
function parse$52(html, options) {
	return Parser.parse(html, options);
}
function parseFragment(fragmentContext, html, options) {
	if (typeof fragmentContext === "string") {
		options = html;
		html = fragmentContext;
		fragmentContext = null;
	}
	const parser = Parser.getFragmentParser(fragmentContext, options);
	parser.tokenizer.write(html, true);
	return parser.getFragment();
}
//#endregion
//#region src/vendor/widget-sandbox/src/host/html-tree-parse5.ts
const SVG_NS = "http://www.w3.org/2000/svg";
const HTML_NS = "http://www.w3.org/1999/xhtml";
function attrsOf(attrs) {
	const out = [];
	for (const a of attrs ?? []) out.push(a.prefix ? `${a.prefix}:${a.name}` : a.name, a.value);
	return out;
}
function childrenOf(node) {
	const out = [];
	for (const c of node.childNodes ?? []) if (c.nodeName === "#text") out.push(c.value);
	else if (c.nodeName === "#comment") out.push([0, c.data]);
	else if (c.tagName) out.push([
		c.tagName,
		c.namespaceURI === SVG_NS ? 1 : 0,
		attrsOf(c.attrs),
		childrenOf(c.tagName === "template" && c.content ? c.content : c)
	]);
	return out;
}
/** html-tree.ts `parseHtmlTree`, with parse5: `{html}` a document, `{html, context, svg}` a fragment; '' leaves it to the shim. */
function parseHtmlTreeParse5(arg) {
	let req;
	try {
		req = JSON.parse(arg);
	} catch {
		return "";
	}
	if (typeof req?.html !== "string" || req.html.length > 16384) return "";
	if (typeof req.context === "string") {
		const context = {
			nodeName: req.context,
			tagName: req.context,
			attrs: [],
			namespaceURI: req.svg === true ? SVG_NS : HTML_NS,
			childNodes: [],
			parentNode: null
		};
		return JSON.stringify(childrenOf(parseFragment(context, req.html)));
	}
	const root = parse$52(req.html).childNodes.find((n) => n.tagName === "html");
	const head = root?.childNodes.find((n) => n.tagName === "head");
	const body = root?.childNodes.find((n) => n.tagName === "body");
	if (!head || !body) return "";
	return JSON.stringify([
		attrsOf(root.attrs),
		attrsOf(head.attrs),
		childrenOf(head),
		attrsOf(body.attrs),
		childrenOf(body)
	]);
}
//#endregion
//#region src/vendor/widget-sandbox/src/host/inline-snapshot.ts
/** The copy works in 4 KiB chunks: a chunk the snapshot left zero is never written, so a copy commits none of it. */
const CHUNK = 4096;
/** The largest free block the snapshot zeroes at once (a larger one is zeroed piece by piece). */
const MAX_ZEROED_BLOCK = 262144;
/** xoshiro128**, seeded from `__host('random')` on the first call in each copy; captured before the host globals go. */
const SEED_SCRIPT = `(function (host, parse, imul, define) {
  let a = 0, b = 0, c = 0, d = 0, seeded = false;
  const word = (x, i) => (x[i] | x[i + 1] << 8 | x[i + 2] << 16 | x[i + 3] << 24) >>> 0;
  const rotl = (x, k) => (x << k) | (x >>> (32 - k));
  function next() {
    const r = imul(rotl(imul(b, 5), 7), 9) >>> 0, t = b << 9;
    c ^= a; d ^= b; b ^= c; a ^= d; c ^= t; d = rotl(d, 11);
    return r;
  }
  const random = { random() {
    if (!seeded) {
      const x = parse(host('random', '16'));
      a = word(x, 0); b = word(x, 4); c = word(x, 8); d = word(x, 12);
      if (!(a | b | c | d)) a = 1;
      seeded = true;
    }
    return ((next() >>> 5) * 67108864 + (next() >>> 6)) / 9007199254740992;
  } }.random;
  define(Math, 'random', { value: random, writable: true, enumerable: false, configurable: true });
})(globalThis.__host, JSON.parse, Math.imul, Object.defineProperty);`;
/** Gives dlmalloc's free blocks back as zeros (the bundle's parse leaves megabytes of garbage in them), so that the snapshot holds only what lives. */
function zeroFreeBlocks(module, memory) {
	const top = highestNonZero(new Uint8Array(memory.buffer));
	const taken = [];
	for (let size = MAX_ZEROED_BLOCK; size >= 16; size >>= 1) for (;;) {
		const p = module._malloc(size);
		if (!p) break;
		if (p + size >= top - 64) {
			module._free(p);
			break;
		}
		new Uint8Array(memory.buffer).fill(0, p, p + size);
		taken.push(p);
	}
	for (const p of taken) module._free(p);
}
function highestNonZero(bytes) {
	let top = bytes.length;
	while (top > 0 && bytes[top - 1] === 0) top--;
	return top;
}
/** Offsets of the chunks below `top` that hold anything. */
function dirtyChunks(bytes, top = highestNonZero(bytes)) {
	const offsets = [];
	const words = new Uint32Array(bytes.buffer, 0, bytes.byteLength >> 2);
	for (let off = 0; off < top; off += CHUNK) for (let i = off >> 2, end = Math.min(off + CHUNK, top + 3) >> 2; i < end; i++) if (words[i]) {
		offsets.push(off);
		break;
	}
	return offsets;
}
/** The pages a copy's Memory may grow to: the memory limit above the initial pages, never below the snapshot's own. */
function copyMaximum(snapshot, memoryLimitBytes) {
	return Math.max(snapshot.pages, 256 + Math.ceil(memoryLimitBytes / WASM_PAGE_BYTES));
}
async function instantiate(module, pages, maximum) {
	const memory = new WebAssembly.Memory({
		initial: pages,
		maximum
	});
	return {
		memory,
		QuickJS: await newQuickJSWASMModuleFromVariant(newVariant(src_default, {
			wasmModule: () => module,
			wasmMemory: memory
		}))
	};
}
/** Warms a VM on the compiled QuickJS and takes its snapshot (the page or a worker: the memory comes out the same). */
async function takeSnapshot(module, sandboxBundle) {
	const pending = [];
	let failure = "";
	const glue = createGlue({ post: (msg) => {
		if (msg.type === "warmed" || msg.type === "stats" || msg.type === "diag" && msg.kind === "boot") return;
		if (msg.type === "dead") failure = msg.reason;
		else pending.push(msg);
	} });
	const config = {
		...LIMIT_DEFAULTS,
		visible: true,
		viewport: {
			innerWidth: 400,
			innerHeight: 300,
			dpr: 1
		},
		theme: "light"
	};
	const warmed = await glue.warmForSnapshot({
		type: "warm",
		config,
		sandboxBundle
	}, module, SEED_SCRIPT).catch((e) => {
		throw new Error(failure || e.message);
	});
	zeroFreeBlocks(warmed.QuickJS.module, warmed.memory);
	const bytes = new Uint8Array(warmed.memory.buffer);
	const offsets = dirtyChunks(bytes);
	const runs = [];
	for (const off of offsets) if (runs.length && runs[runs.length - 2] + runs[runs.length - 1] === off) runs[runs.length - 1] += CHUNK;
	else runs.push(off, CHUNK);
	const data = new Uint8Array(offsets.length * CHUNK);
	for (let i = 0, at = 0; i < runs.length; at += runs[i + 1], i += 2) data.set(bytes.subarray(runs[i], runs[i] + runs[i + 1]), at);
	const pages = warmed.memory.buffer.byteLength / WASM_PAGE_BYTES;
	const fresh = await Promise.all([0, 1].map(() => instantiate(module, pages, pages).then(({ memory }) => dirtyChunks(new Uint8Array(memory.buffer)))));
	if (fresh[0].join() !== fresh[1].join()) throw new Error("fresh QuickJS instances differ");
	const kept = new Set(offsets);
	const snapshot = {
		pages,
		runs: Int32Array.from(runs),
		data,
		clear: Int32Array.from(fresh[0].filter((off) => !kept.has(off))),
		rt: warmed.rt.rt.value,
		ctx: warmed.vm.ctx.value,
		dispatch: warmed.dispatch.value,
		hostRefsNext: warmed.rt.hostRefs.nextId,
		pending
	};
	glue.destroy();
	return snapshot;
}
/**
* Writes the snapshot into a fresh instance's Memory and wraps the runtime and the context it holds (a copy makes no
* new ones). `suspender`: the instance's host calls can wait (suspend.ts, the `worker` transport).
*/
function restoreVM(QuickJS, memory, snapshot, memoryLimitBytes, suspender) {
	const view = new Uint8Array(memory.buffer);
	const { runs, data, clear } = snapshot;
	for (let i = 0; i < clear.length; i++) view.fill(0, clear[i], clear[i] + CHUNK);
	for (let i = 0, at = 0; i < runs.length; at += runs[i + 1], i += 2) view.set(data.subarray(at, at + runs[i + 1]), runs[i]);
	const q = QuickJS;
	const rt = new QuickJSRuntime({
		module: q.module,
		callbacks: q.callbacks,
		ffi: q.ffi,
		rt: new Lifetime(snapshot.rt, void 0, (ptr) => {
			q.ffi.QTS_FreeRuntime(ptr);
			q.callbacks.deleteRuntime(ptr);
		})
	});
	const vm = rt.newContext({ contextPointer: snapshot.ctx });
	return {
		rt,
		vm,
		dispatch: vm.memory.heapValueHandle(snapshot.dispatch),
		memoryLimitBytes,
		pending: snapshot.pending,
		memory,
		suspender,
		bindHost(host, binary) {
			const refs = rt.hostRefs;
			refs.put(host);
			refs.put(binary);
			if (refs.nextId !== snapshot.hostRefsNext) throw new Error("the copy registered its host functions under other ids than the snapshot");
		}
	};
}
//#endregion
//#region src/vendor/widget-sandbox/src/host/message-guards.ts
function finiteNumber(value) {
	return typeof value === "number" && Number.isFinite(value) ? value : void 0;
}
//#endregion
//#region src/vendor/widget-sandbox/src/host/suspend-kind.ts
const W$1 = globalThis.WebAssembly;
/** JSPI where the engine has it (Chromium, Safari), the asyncify build elsewhere (Firefox) or when `prefer`red. */
function suspendKind(prefer = "auto") {
	return prefer !== "asyncify" && typeof W$1?.Suspending === "function" && typeof W$1.promising === "function" ? "jspi" : "asyncify";
}
//#endregion
//#region src/vendor/widget-sandbox/src/host/suspend.ts
const W = WebAssembly;
/**
* Room for what an asyncify unwind saves: the wasm locals of every frame from the export down to the host call (the
* C stack itself stays where it is). A recursion deeper than this cannot wait; its call fails and the widget dies.
*/
const ASYNCIFY_DATA_BYTES = 524288;
const ASYNCIFY_UNWINDING = 1;
const ASYNCIFY_REWINDING = 2;
var Suspender = class {
	constructor(kind, memory) {
		_defineProperty(this, "kind", void 0);
		_defineProperty(this, "memory", void 0);
		_defineProperty(
			this,
			/** Inside `run`: a host function may wait. */
			"running",
			false
		);
		_defineProperty(this, "pending", null);
		_defineProperty(this, "answer", null);
		_defineProperty(
			this,
			/** asyncify: the instance's exports, the buffer the stack unwinds into, the call to make again. */
			"exports",
			null
		);
		_defineProperty(this, "data", 0);
		_defineProperty(this, "unwound", null);
		_defineProperty(this, "resume", 0);
		_defineProperty(this, "promisingFns", /* @__PURE__ */ new Map());
		_defineProperty(
			this,
			/** Set once the instance exists: frees the value the first call of a waiting host call returned. */
			"release",
			() => {}
		);
		_defineProperty(
			this,
			/** Set by the glue: called right before the VM's code goes on after a wait, in the same job or the one before. */
			"onResume",
			() => {}
		);
		_defineProperty(this, "module", null);
		this.kind = kind;
		this.memory = memory;
	}
	/** Whether a host function called now can wait: inside `run`, with no wait pending (not in `vm.dump()`, say). */
	canWait() {
		return this.running && !this.pending;
	}
	/** From a host function: answer this call with what `answer` settles to. False where nothing can wait. */
	wait(answer) {
		if (!this.canWait()) return false;
		this.pending = answer;
		return true;
	}
	/** In the call made again after a wait: what the promise settled to (`error` when it was rejected). */
	takeAnswer() {
		const answer = this.answer;
		this.answer = null;
		return answer;
	}
	/** Calls an export that runs code in the VM: its result, or a promise of it when a host call waited. */
	run(name, args) {
		const fn = this.module[name];
		if (this.kind === "jspi") {
			let promising = this.promisingFns.get(name);
			if (!promising) this.promisingFns.set(name, promising = W.promising(fn));
			this.running = true;
			const result = promising(...args);
			const ran = () => {
				this.running = false;
			};
			result.then(ran, ran);
			return result;
		}
		const ex = this.exports;
		this.running = true;
		let result;
		try {
			result = fn(...args);
		} catch (e) {
			this.running = false;
			throw e;
		}
		if (ex.asyncify_get_state() !== ASYNCIFY_UNWINDING) {
			this.running = false;
			return result;
		}
		ex.asyncify_stop_unwind();
		return this.rewind(fn, args);
	}
	async rewind(fn, args) {
		const ex = this.exports;
		try {
			for (;;) {
				const unwound = this.unwound;
				this.unwound = null;
				this.resume = await unwound;
				this.onResume();
				ex.asyncify_start_rewind(this.data);
				const result = fn(...args);
				if (ex.asyncify_get_state() !== ASYNCIFY_UNWINDING) return result;
				ex.asyncify_stop_unwind();
			}
		} finally {
			this.running = false;
		}
	}
	/** Wraps the import QuickJS calls host functions through. */
	wrapHostCall(call) {
		const again = (self, args, settled) => {
			this.answer = settled;
			return call.apply(self, args);
		};
		const settle = (self, args, pending) => pending.then((value) => again(self, args, { value }), (error) => again(self, args, { error: error ?? /* @__PURE__ */ new Error("rejected") }));
		const suspender = this;
		if (this.kind === "jspi") return new W.Suspending(function(...args) {
			const result = call.apply(this, args);
			const pending = suspender.pending;
			if (!pending) return result;
			suspender.pending = null;
			suspender.release(args[0], result);
			const resumed = settle(this, args, pending);
			const onResume = () => suspender.onResume();
			resumed.then(onResume, onResume);
			return resumed;
		});
		return function(...args) {
			const ex = suspender.exports;
			if (ex.asyncify_get_state() === ASYNCIFY_REWINDING) {
				ex.asyncify_stop_rewind();
				const result = suspender.resume;
				suspender.resume = 0;
				return result;
			}
			const result = call.apply(this, args);
			const pending = suspender.pending;
			if (!pending) return result;
			suspender.pending = null;
			suspender.release(args[0], result);
			suspender.unwound = settle(this, args, pending);
			if (!suspender.data) suspender.data = suspender.module._malloc(ASYNCIFY_DATA_BYTES);
			if (!suspender.data) throw new Error("out of memory");
			const view = new Int32Array(suspender.memory.buffer);
			view[suspender.data >> 2] = suspender.data + 8;
			view[suspender.data + 4 >> 2] = suspender.data + ASYNCIFY_DATA_BYTES;
			ex.asyncify_start_unwind(suspender.data);
			return 0;
		};
	}
	attach(exports) {
		if (this.kind === "asyncify") {
			if (typeof exports.asyncify_get_state !== "function") throw new Error("the QuickJS build is not asyncified");
			this.exports = exports;
		}
	}
};
/** The emscripten import QuickJS calls host functions through (its name is minified: found by what it does). */
function findHostCallImport(imports) {
	for (const [moduleName, entries] of Object.entries(imports)) for (const [name, value] of Object.entries(entries)) if (typeof value === "function" && String(value).includes("callbacks.callFunction")) return [moduleName, name];
	throw new Error("the QuickJS host call import was not found");
}
/** A fresh instance of `module` in a Memory of `pages` (growing to `maximum`), its host calls able to wait. */
async function instantiateSuspendable(module, kind, pages, maximum) {
	const memory = new WebAssembly.Memory({
		initial: pages,
		maximum
	});
	const suspender = new Suspender(kind, memory);
	const QuickJS = await newQuickJSWASMModuleFromVariant(newVariant(src_default, {
		wasmMemory: memory,
		emscriptenModule: { instantiateWasm: async (imports, onSuccess) => {
			const [moduleName, name] = findHostCallImport(imports);
			const entries = imports[moduleName];
			entries[name] = suspender.wrapHostCall(entries[name]);
			const instance = await WebAssembly.instantiate(module, imports);
			suspender.attach(instance.exports);
			onSuccess(instance);
			return instance.exports;
		} }
	}));
	const q = QuickJS;
	suspender.module = q.module;
	suspender.release = (ctx, ptr) => {
		if (ptr) q.ffi.QTS_FreeValuePointer(ctx, ptr);
	};
	return {
		memory,
		QuickJS,
		suspender
	};
}
//#endregion
//#region src/vendor/widget-sandbox/src/host/allowlist.ts
const words = (s) => s.trim().split(/\s+/);
const P = PROFILE_TABLES;
const elementsWith = (action) => Object.entries(P.html.elements).filter(([, a]) => a === action).map(([t]) => t);
/**
* Elements that are never rendered, together with their whole subtree, whatever
* the profile says. (`style` is not here: it is handled separately through the
* CSS sanitizer.) `audio`/`video`/`source`/`track` are dropped on purpose: a chat
* bubble has no use for media playback, and `data:` media would hand the
* platform's codec stack to the widget (and autoplay / battery).
*/
const SECURITY_DROPPED_TAGS = new Set(words(`
  script iframe frame frameset object embed link meta base portal noscript set title template applet param
  noembed noframes plaintext xmp listing slot track area map math metadata fencedframe audio video source
`));
/** HTML elements rendered as-is. */
const HTML_TAGS = new Set(elementsWith("keep").filter((t) => !SECURITY_DROPPED_TAGS.has(t)));
/** HTML elements outside the profile that keep their content: rendered as this element, with `data-tg-tag` naming the original. */
const REPLACED_TAGS = new Map([...elementsWith("span").map((t) => [t, "span"]), ...elementsWith("div").map((t) => [t, "div"])]);
/** Elements dropped with their subtree: the security list and the profile's (form controls). */
const DROPPED_TAGS = /* @__PURE__ */ new Set([...SECURITY_DROPPED_TAGS, ...elementsWith("drop")]);
/** Canonical (case-sensitive) names of allowed SVG elements, keyed by lowercase. */
const SVG_TAGS = new Map(P.svg.elements.map((t) => [t.toLowerCase(), t]));
/** HTML attributes allowed on any element (lowercase); `data-*`, `aria-*` and `style` are handled apart. */
const HTML_ATTRS = new Set(P.html.attributes);
/** SVG attributes (lowercase keys of the canonical names). */
const SVG_ATTRS = P.svg.attributes;
const SVG_ALLOWED_ATTRS = new Set(SVG_ATTRS.map((a) => a.toLowerCase()));
[...HTML_ATTRS, ...SVG_ALLOWED_ATTRS];
/** lowercase → canonical case for SVG attributes (HTML-parser style adjustment). */
const SVG_ATTR_CASE = new Map(SVG_ATTRS.filter((a) => a !== a.toLowerCase()).map((a) => [a.toLowerCase(), a]));
/**
* Every attribute that can carry a URL. None of these is ever passed through
* unchecked; unlisted (tag, attr) combinations are dropped. See validator.ts.
*/
const URL_ATTRS = new Set(words(`
  href xlink:href src srcset poster action formaction background ping data cite codebase manifest longdesc
  usemap profile icon archive classid lowsrc dynsrc srcdoc imagesrcset imagesizes attributionsrc
`));
/** Attributes whose value is CSS and may contain url(): parsed by the CSS sanitizer. */
const CSS_VALUE_ATTRS = new Set(words(`
  fill stroke filter mask clip-path marker marker-start marker-mid marker-end cursor color flood-color
  lighting-color stop-color
`));
/** Attribute names an SVG animation element may target. URL-like ones are excluded. */
const ANIMATION_VALUE_ATTRS = /* @__PURE__ */ new Set([
	"from",
	"to",
	"by",
	"values"
]);
/** Attributes dropped silently (noise, not worth a diagnostic). */
const SILENT_DROP_ATTRS = new Set(words(`
  xmlns xmlns:xlink target rel download autofocus nonce is loading decoding crossorigin referrerpolicy
  integrity fetchpriority charset http-equiv content async defer
`));
/** Properties settable through the `prop` op, with the tags they apply to (null = any): the profile's. */
const ALL_PROPS = {
	scrollTop: {
		type: "number",
		tags: null
	},
	scrollLeft: {
		type: "number",
		tags: null
	}
};
const inProfile = (all, names) => Object.fromEntries(Object.entries(all).filter(([k]) => names.includes(k)));
const PROPS = inProfile(ALL_PROPS, P.properties);
const METHODS = inProfile({
	scrollIntoView: 4,
	setPointerCapture: 1,
	releasePointerCapture: 1,
	scrollTo: 2,
	scrollBy: 2,
	observeResize: 0,
	unobserveResize: 0
}, P.methods);
/** Canvas 2D: methods that may be replayed (the profile's). Nothing here takes a URL. */
const CANVAS_METHODS = new Set(P.canvas.methods);
/** Canvas 2D: settable properties (the profile's). */
const CANVAS_PROPS = new Set(P.canvas.properties);
/** Canvas 2D calls and properties the shim may send that are outside the profile: dropped with a `profile` diagnostic, not a protocol violation. */
const CANVAS_OUT_OF_PROFILE = new Set(words(`
  putImageData globalCompositeOperation shadowBlur shadowColor shadowOffsetX shadowOffsetY filter
  letterSpacing wordSpacing fontKerning fontStretch fontVariantCaps textRendering
`));
/** Gradient kinds in the profile; a conic gradient or a pattern becomes a gradient that paints nothing. */
const CANVAS_GRADIENTS = new Set(P.canvas.gradients);
const CANVAS_PATH_METHODS = new Set(words(`
  moveTo lineTo bezierCurveTo quadraticCurveTo arc arcTo ellipse rect roundRect closePath addPath
`));
const SVG_QUERY_METHODS = new Set(words(`
  getBBox getComputedTextLength getTotalLength getPointAtLength getCTM getScreenCTM getSubStringLength
  getNumberOfChars
`));
const CANVAS_QUERY_METHODS = new Set(P.canvas.queries.filter((m) => m !== "measureText"));
//#endregion
//#region node_modules/.pnpm/css-tree@3.2.1/node_modules/css-tree/lib/tokenizer/char-code-definitions.js
const EOF = 0;
function isDigit(code) {
	return code >= 48 && code <= 57;
}
function isHexDigit(code) {
	return isDigit(code) || code >= 65 && code <= 70 || code >= 97 && code <= 102;
}
function isUppercaseLetter(code) {
	return code >= 65 && code <= 90;
}
function isLowercaseLetter(code) {
	return code >= 97 && code <= 122;
}
function isLetter(code) {
	return isUppercaseLetter(code) || isLowercaseLetter(code);
}
function isNonAscii(code) {
	return code >= 128;
}
function isNameStart(code) {
	return isLetter(code) || isNonAscii(code) || code === 95;
}
function isName(code) {
	return isNameStart(code) || isDigit(code) || code === 45;
}
function isNonPrintable(code) {
	return code >= 0 && code <= 8 || code === 11 || code >= 14 && code <= 31 || code === 127;
}
function isNewline(code) {
	return code === 10 || code === 13 || code === 12;
}
function isWhiteSpace(code) {
	return isNewline(code) || code === 32 || code === 9;
}
function isValidEscape(first, second) {
	if (first !== 92) return false;
	if (isNewline(second) || second === EOF) return false;
	return true;
}
function isIdentifierStart(first, second, third) {
	if (first === 45) return isNameStart(second) || second === 45 || isValidEscape(second, third);
	if (isNameStart(first)) return true;
	if (first === 92) return isValidEscape(first, second);
	return false;
}
function isNumberStart(first, second, third) {
	if (first === 43 || first === 45) {
		if (isDigit(second)) return 2;
		return second === 46 && isDigit(third) ? 3 : 0;
	}
	if (first === 46) return isDigit(second) ? 2 : 0;
	if (isDigit(first)) return 1;
	return 0;
}
function isBOM(code) {
	if (code === 65279) return 1;
	if (code === 65534) return 1;
	return 0;
}
const CATEGORY = new Array(128);
for (let i = 0; i < CATEGORY.length; i++) CATEGORY[i] = isWhiteSpace(i) && 130 || isDigit(i) && 131 || isNameStart(i) && 132 || isNonPrintable(i) && 133 || i || 128;
function charCodeCategory(code) {
	return code < 128 ? CATEGORY[code] : 132;
}
//#endregion
//#region node_modules/.pnpm/css-tree@3.2.1/node_modules/css-tree/lib/tokenizer/utils.js
function getCharCode(source, offset) {
	return offset < source.length ? source.charCodeAt(offset) : 0;
}
function getNewlineLength(source, offset, code) {
	if (code === 13 && getCharCode(source, offset + 1) === 10) return 2;
	return 1;
}
function cmpChar(testStr, offset, referenceCode) {
	let code = testStr.charCodeAt(offset);
	if (isUppercaseLetter(code)) code = code | 32;
	return code === referenceCode;
}
function cmpStr(testStr, start, end, referenceStr) {
	if (end - start !== referenceStr.length) return false;
	if (start < 0 || end > testStr.length) return false;
	for (let i = start; i < end; i++) {
		const referenceCode = referenceStr.charCodeAt(i - start);
		let testCode = testStr.charCodeAt(i);
		if (isUppercaseLetter(testCode)) testCode = testCode | 32;
		if (testCode !== referenceCode) return false;
	}
	return true;
}
function findWhiteSpaceStart(source, offset) {
	for (; offset >= 0; offset--) if (!isWhiteSpace(source.charCodeAt(offset))) break;
	return offset + 1;
}
function findWhiteSpaceEnd(source, offset) {
	for (; offset < source.length; offset++) if (!isWhiteSpace(source.charCodeAt(offset))) break;
	return offset;
}
function findDecimalNumberEnd(source, offset) {
	for (; offset < source.length; offset++) if (!isDigit(source.charCodeAt(offset))) break;
	return offset;
}
function consumeEscaped(source, offset) {
	offset += 2;
	if (isHexDigit(getCharCode(source, offset - 1))) {
		for (const maxOffset = Math.min(source.length, offset + 5); offset < maxOffset; offset++) if (!isHexDigit(getCharCode(source, offset))) break;
		const code = getCharCode(source, offset);
		if (isWhiteSpace(code)) offset += getNewlineLength(source, offset, code);
	}
	return offset;
}
function consumeName(source, offset) {
	for (; offset < source.length; offset++) {
		const code = source.charCodeAt(offset);
		if (isName(code)) continue;
		if (isValidEscape(code, getCharCode(source, offset + 1))) {
			offset = consumeEscaped(source, offset) - 1;
			continue;
		}
		break;
	}
	return offset;
}
function consumeNumber(source, offset) {
	let code = source.charCodeAt(offset);
	if (code === 43 || code === 45) code = source.charCodeAt(offset += 1);
	if (isDigit(code)) {
		offset = findDecimalNumberEnd(source, offset + 1);
		code = source.charCodeAt(offset);
	}
	if (code === 46 && isDigit(source.charCodeAt(offset + 1))) {
		offset += 2;
		offset = findDecimalNumberEnd(source, offset);
	}
	if (cmpChar(source, offset, 101)) {
		let sign = 0;
		code = source.charCodeAt(offset + 1);
		if (code === 45 || code === 43) {
			sign = 1;
			code = source.charCodeAt(offset + 2);
		}
		if (isDigit(code)) offset = findDecimalNumberEnd(source, offset + 1 + sign + 1);
	}
	return offset;
}
function consumeBadUrlRemnants(source, offset) {
	for (; offset < source.length; offset++) {
		const code = source.charCodeAt(offset);
		if (code === 41) {
			offset++;
			break;
		}
		if (isValidEscape(code, getCharCode(source, offset + 1))) offset = consumeEscaped(source, offset);
	}
	return offset;
}
function decodeEscaped(escaped) {
	if (escaped.length === 1 && !isHexDigit(escaped.charCodeAt(0))) return escaped[0];
	let code = parseInt(escaped, 16);
	if (code === 0 || code >= 55296 && code <= 57343 || code > 1114111) code = 65533;
	return String.fromCodePoint(code);
}
//#endregion
//#region node_modules/.pnpm/css-tree@3.2.1/node_modules/css-tree/lib/tokenizer/names.js
var names_default = [
	"EOF-token",
	"ident-token",
	"function-token",
	"at-keyword-token",
	"hash-token",
	"string-token",
	"bad-string-token",
	"url-token",
	"bad-url-token",
	"delim-token",
	"number-token",
	"percentage-token",
	"dimension-token",
	"whitespace-token",
	"CDO-token",
	"CDC-token",
	"colon-token",
	"semicolon-token",
	"comma-token",
	"[-token",
	"]-token",
	"(-token",
	")-token",
	"{-token",
	"}-token",
	"comment-token"
];
//#endregion
//#region node_modules/.pnpm/css-tree@3.2.1/node_modules/css-tree/lib/tokenizer/adopt-buffer.js
const MIN_SIZE = 16384;
function adoptBuffer(buffer = null, size) {
	if (buffer === null || buffer.length < size) return new Uint32Array(Math.max(size + 1024, MIN_SIZE));
	return buffer;
}
//#endregion
//#region node_modules/.pnpm/css-tree@3.2.1/node_modules/css-tree/lib/tokenizer/OffsetToLocation.js
const N$4 = 10;
const F$2 = 12;
const R$2 = 13;
function computeLinesAndColumns(host) {
	const source = host.source;
	const sourceLength = source.length;
	const startOffset = source.length > 0 ? isBOM(source.charCodeAt(0)) : 0;
	const lines = adoptBuffer(host.lines, sourceLength);
	const columns = adoptBuffer(host.columns, sourceLength);
	let line = host.startLine;
	let column = host.startColumn;
	for (let i = startOffset; i < sourceLength; i++) {
		const code = source.charCodeAt(i);
		lines[i] = line;
		columns[i] = column++;
		if (code === N$4 || code === R$2 || code === F$2) {
			if (code === R$2 && i + 1 < sourceLength && source.charCodeAt(i + 1) === N$4) {
				i++;
				lines[i] = line;
				columns[i] = column;
			}
			line++;
			column = 1;
		}
	}
	lines[sourceLength] = line;
	columns[sourceLength] = column;
	host.lines = lines;
	host.columns = columns;
	host.computed = true;
}
var OffsetToLocation = class {
	constructor(source, startOffset, startLine, startColumn) {
		this.setSource(source, startOffset, startLine, startColumn);
		this.lines = null;
		this.columns = null;
	}
	setSource(source = "", startOffset = 0, startLine = 1, startColumn = 1) {
		this.source = source;
		this.startOffset = startOffset;
		this.startLine = startLine;
		this.startColumn = startColumn;
		this.computed = false;
	}
	getLocation(offset, filename) {
		if (!this.computed) computeLinesAndColumns(this);
		return {
			source: filename,
			offset: this.startOffset + offset,
			line: this.lines[offset],
			column: this.columns[offset]
		};
	}
	getLocationRange(start, end, filename) {
		if (!this.computed) computeLinesAndColumns(this);
		return {
			source: filename,
			start: {
				offset: this.startOffset + start,
				line: this.lines[start],
				column: this.columns[start]
			},
			end: {
				offset: this.startOffset + end,
				line: this.lines[end],
				column: this.columns[end]
			}
		};
	}
};
//#endregion
//#region node_modules/.pnpm/css-tree@3.2.1/node_modules/css-tree/lib/tokenizer/TokenStream.js
const OFFSET_MASK = 16777215;
const TYPE_SHIFT = 24;
const BLOCK_OPEN_TOKEN = 1;
const BLOCK_CLOSE_TOKEN = 2;
const balancePair$1 = /* @__PURE__ */ new Uint8Array(32);
balancePair$1[2] = 22;
balancePair$1[21] = 22;
balancePair$1[19] = 20;
balancePair$1[23] = 24;
const blockTokens = /* @__PURE__ */ new Uint8Array(32);
blockTokens[2] = BLOCK_OPEN_TOKEN;
blockTokens[21] = BLOCK_OPEN_TOKEN;
blockTokens[19] = BLOCK_OPEN_TOKEN;
blockTokens[23] = BLOCK_OPEN_TOKEN;
blockTokens[22] = BLOCK_CLOSE_TOKEN;
blockTokens[20] = BLOCK_CLOSE_TOKEN;
blockTokens[24] = BLOCK_CLOSE_TOKEN;
function boundIndex(index, min, max) {
	return index < min ? min : index > max ? max : index;
}
var TokenStream = class {
	constructor(source, tokenize) {
		this.setSource(source, tokenize);
	}
	reset() {
		this.eof = false;
		this.tokenIndex = -1;
		this.tokenType = 0;
		this.tokenStart = this.firstCharOffset;
		this.tokenEnd = this.firstCharOffset;
	}
	setSource(source = "", tokenize = () => {}) {
		source = String(source || "");
		const sourceLength = source.length;
		const offsetAndType = adoptBuffer(this.offsetAndType, source.length + 1);
		const balance = adoptBuffer(this.balance, source.length + 1);
		let tokenCount = 0;
		let firstCharOffset = -1;
		let balanceCloseType = 0;
		let balanceStart = source.length;
		this.offsetAndType = null;
		this.balance = null;
		balance.fill(0);
		tokenize(source, (type, start, end) => {
			const index = tokenCount++;
			offsetAndType[index] = type << TYPE_SHIFT | end;
			if (firstCharOffset === -1) firstCharOffset = start;
			balance[index] = balanceStart;
			if (type === balanceCloseType) {
				const prevBalanceStart = balance[balanceStart];
				balance[balanceStart] = index;
				balanceStart = prevBalanceStart;
				balanceCloseType = balancePair$1[offsetAndType[prevBalanceStart] >> TYPE_SHIFT];
			} else if (this.isBlockOpenerTokenType(type)) {
				balanceStart = index;
				balanceCloseType = balancePair$1[type];
			}
		});
		offsetAndType[tokenCount] = 0 | sourceLength;
		balance[tokenCount] = tokenCount;
		for (let i = 0; i < tokenCount; i++) {
			const balanceStart = balance[i];
			if (balanceStart <= i) {
				const balanceEnd = balance[balanceStart];
				if (balanceEnd !== i) balance[i] = balanceEnd;
			} else if (balanceStart > tokenCount) balance[i] = tokenCount;
		}
		this.source = source;
		this.firstCharOffset = firstCharOffset === -1 ? 0 : firstCharOffset;
		this.tokenCount = tokenCount;
		this.offsetAndType = offsetAndType;
		this.balance = balance;
		this.reset();
		this.next();
	}
	lookupType(offset) {
		offset += this.tokenIndex;
		if (offset < this.tokenCount) return this.offsetAndType[offset] >> TYPE_SHIFT;
		return 0;
	}
	lookupTypeNonSC(idx) {
		for (let offset = this.tokenIndex; offset < this.tokenCount; offset++) {
			const tokenType = this.offsetAndType[offset] >> TYPE_SHIFT;
			if (tokenType !== 13 && tokenType !== 25) {
				if (idx-- === 0) return tokenType;
			}
		}
		return 0;
	}
	lookupOffset(offset) {
		offset += this.tokenIndex;
		if (offset < this.tokenCount) return this.offsetAndType[offset - 1] & OFFSET_MASK;
		return this.source.length;
	}
	lookupOffsetNonSC(idx) {
		for (let offset = this.tokenIndex; offset < this.tokenCount; offset++) {
			const tokenType = this.offsetAndType[offset] >> TYPE_SHIFT;
			if (tokenType !== 13 && tokenType !== 25) {
				if (idx-- === 0) return offset - this.tokenIndex;
			}
		}
		return 0;
	}
	lookupValue(offset, referenceStr) {
		offset += this.tokenIndex;
		if (offset < this.tokenCount) return cmpStr(this.source, this.offsetAndType[offset - 1] & OFFSET_MASK, this.offsetAndType[offset] & OFFSET_MASK, referenceStr);
		return false;
	}
	getTokenStart(tokenIndex) {
		if (tokenIndex === this.tokenIndex) return this.tokenStart;
		if (tokenIndex > 0) return tokenIndex < this.tokenCount ? this.offsetAndType[tokenIndex - 1] & OFFSET_MASK : this.offsetAndType[this.tokenCount] & OFFSET_MASK;
		return this.firstCharOffset;
	}
	getTokenEnd(tokenIndex) {
		if (tokenIndex === this.tokenIndex) return this.tokenEnd;
		return this.offsetAndType[boundIndex(tokenIndex, 0, this.tokenCount)] & OFFSET_MASK;
	}
	getTokenType(tokenIndex) {
		if (tokenIndex === this.tokenIndex) return this.tokenType;
		return this.offsetAndType[boundIndex(tokenIndex, 0, this.tokenCount)] >> TYPE_SHIFT;
	}
	substrToCursor(start) {
		return this.source.substring(start, this.tokenStart);
	}
	isBlockOpenerTokenType(tokenType) {
		return blockTokens[tokenType] === BLOCK_OPEN_TOKEN;
	}
	isBlockCloserTokenType(tokenType) {
		return blockTokens[tokenType] === BLOCK_CLOSE_TOKEN;
	}
	getBlockTokenPairIndex(tokenIndex) {
		const type = this.getTokenType(tokenIndex);
		if (blockTokens[type] === 1) {
			const pairIndex = this.balance[tokenIndex];
			const closeType = this.getTokenType(pairIndex);
			return balancePair$1[type] === closeType ? pairIndex : -1;
		} else if (blockTokens[type] === 2) {
			const pairIndex = this.balance[tokenIndex];
			const openType = this.getTokenType(pairIndex);
			return balancePair$1[openType] === type ? pairIndex : -1;
		}
		return -1;
	}
	isBalanceEdge(tokenIndex) {
		return this.balance[this.tokenIndex] < tokenIndex;
	}
	isDelim(code, offset) {
		if (offset) return this.lookupType(offset) === 9 && this.source.charCodeAt(this.lookupOffset(offset)) === code;
		return this.tokenType === 9 && this.source.charCodeAt(this.tokenStart) === code;
	}
	skip(tokenCount) {
		let next = this.tokenIndex + tokenCount;
		if (next < this.tokenCount) {
			this.tokenIndex = next;
			this.tokenStart = this.offsetAndType[next - 1] & OFFSET_MASK;
			next = this.offsetAndType[next];
			this.tokenType = next >> TYPE_SHIFT;
			this.tokenEnd = next & OFFSET_MASK;
		} else {
			this.tokenIndex = this.tokenCount;
			this.next();
		}
	}
	next() {
		let next = this.tokenIndex + 1;
		if (next < this.tokenCount) {
			this.tokenIndex = next;
			this.tokenStart = this.tokenEnd;
			next = this.offsetAndType[next];
			this.tokenType = next >> TYPE_SHIFT;
			this.tokenEnd = next & OFFSET_MASK;
		} else {
			this.eof = true;
			this.tokenIndex = this.tokenCount;
			this.tokenType = 0;
			this.tokenStart = this.tokenEnd = this.source.length;
		}
	}
	skipSC() {
		while (this.tokenType === 13 || this.tokenType === 25) this.next();
	}
	skipUntilBalanced(startToken, stopConsume) {
		let cursor = startToken;
		let balanceEnd = 0;
		let offset = 0;
		loop: for (; cursor < this.tokenCount; cursor++) {
			balanceEnd = this.balance[cursor];
			if (balanceEnd < startToken) break loop;
			offset = cursor > 0 ? this.offsetAndType[cursor - 1] & OFFSET_MASK : this.firstCharOffset;
			switch (stopConsume(this.source.charCodeAt(offset))) {
				case 1: break loop;
				case 2:
					cursor++;
					break loop;
				default: if (this.isBlockOpenerTokenType(this.offsetAndType[cursor] >> TYPE_SHIFT)) cursor = balanceEnd;
			}
		}
		this.skip(cursor - this.tokenIndex);
	}
	forEachToken(fn) {
		for (let i = 0, offset = this.firstCharOffset; i < this.tokenCount; i++) {
			const start = offset;
			const item = this.offsetAndType[i];
			const end = item & OFFSET_MASK;
			const type = item >> TYPE_SHIFT;
			offset = end;
			fn(type, start, end, i);
		}
	}
	dump() {
		const tokens = new Array(this.tokenCount);
		this.forEachToken((type, start, end, index) => {
			tokens[index] = {
				idx: index,
				type: names_default[type],
				chunk: this.source.substring(start, end),
				balance: this.balance[index]
			};
		});
		return tokens;
	}
};
//#endregion
//#region node_modules/.pnpm/css-tree@3.2.1/node_modules/css-tree/lib/tokenizer/index.js
function tokenize$2(source, onToken) {
	function getCharCode(offset) {
		return offset < sourceLength ? source.charCodeAt(offset) : 0;
	}
	function consumeNumericToken() {
		offset = consumeNumber(source, offset);
		if (isIdentifierStart(getCharCode(offset), getCharCode(offset + 1), getCharCode(offset + 2))) {
			type = 12;
			offset = consumeName(source, offset);
			return;
		}
		if (getCharCode(offset) === 37) {
			type = 11;
			offset++;
			return;
		}
		type = 10;
	}
	function consumeIdentLikeToken() {
		const nameStartOffset = offset;
		offset = consumeName(source, offset);
		if (cmpStr(source, nameStartOffset, offset, "url") && getCharCode(offset) === 40) {
			offset = findWhiteSpaceEnd(source, offset + 1);
			if (getCharCode(offset) === 34 || getCharCode(offset) === 39) {
				type = 2;
				offset = nameStartOffset + 4;
				return;
			}
			consumeUrlToken();
			return;
		}
		if (getCharCode(offset) === 40) {
			type = 2;
			offset++;
			return;
		}
		type = 1;
	}
	function consumeStringToken(endingCodePoint) {
		if (!endingCodePoint) endingCodePoint = getCharCode(offset++);
		type = 5;
		for (; offset < source.length; offset++) {
			const code = source.charCodeAt(offset);
			switch (charCodeCategory(code)) {
				case endingCodePoint:
					offset++;
					return;
				case 130:
					if (isNewline(code)) {
						offset += getNewlineLength(source, offset, code);
						type = 6;
						return;
					}
					break;
				case 92:
					if (offset === source.length - 1) break;
					const nextCode = getCharCode(offset + 1);
					if (isNewline(nextCode)) offset += getNewlineLength(source, offset + 1, nextCode);
					else if (isValidEscape(code, nextCode)) offset = consumeEscaped(source, offset) - 1;
			}
		}
	}
	function consumeUrlToken() {
		type = 7;
		offset = findWhiteSpaceEnd(source, offset);
		for (; offset < source.length; offset++) {
			const code = source.charCodeAt(offset);
			switch (charCodeCategory(code)) {
				case 41:
					offset++;
					return;
				case 130:
					offset = findWhiteSpaceEnd(source, offset);
					if (getCharCode(offset) === 41 || offset >= source.length) {
						if (offset < source.length) offset++;
						return;
					}
					offset = consumeBadUrlRemnants(source, offset);
					type = 8;
					return;
				case 34:
				case 39:
				case 40:
				case 133:
					offset = consumeBadUrlRemnants(source, offset);
					type = 8;
					return;
				case 92:
					if (isValidEscape(code, getCharCode(offset + 1))) {
						offset = consumeEscaped(source, offset) - 1;
						break;
					}
					offset = consumeBadUrlRemnants(source, offset);
					type = 8;
					return;
			}
		}
	}
	source = String(source || "");
	const sourceLength = source.length;
	let start = isBOM(getCharCode(0));
	let offset = start;
	let type;
	while (offset < sourceLength) {
		const code = source.charCodeAt(offset);
		switch (charCodeCategory(code)) {
			case 130:
				type = 13;
				offset = findWhiteSpaceEnd(source, offset + 1);
				break;
			case 34:
				consumeStringToken();
				break;
			case 35:
				if (isName(getCharCode(offset + 1)) || isValidEscape(getCharCode(offset + 1), getCharCode(offset + 2))) {
					type = 4;
					offset = consumeName(source, offset + 1);
				} else {
					type = 9;
					offset++;
				}
				break;
			case 39:
				consumeStringToken();
				break;
			case 40:
				type = 21;
				offset++;
				break;
			case 41:
				type = 22;
				offset++;
				break;
			case 43:
				if (isNumberStart(code, getCharCode(offset + 1), getCharCode(offset + 2))) consumeNumericToken();
				else {
					type = 9;
					offset++;
				}
				break;
			case 44:
				type = 18;
				offset++;
				break;
			case 45:
				if (isNumberStart(code, getCharCode(offset + 1), getCharCode(offset + 2))) consumeNumericToken();
				else if (getCharCode(offset + 1) === 45 && getCharCode(offset + 2) === 62) {
					type = 15;
					offset = offset + 3;
				} else if (isIdentifierStart(code, getCharCode(offset + 1), getCharCode(offset + 2))) consumeIdentLikeToken();
				else {
					type = 9;
					offset++;
				}
				break;
			case 46:
				if (isNumberStart(code, getCharCode(offset + 1), getCharCode(offset + 2))) consumeNumericToken();
				else {
					type = 9;
					offset++;
				}
				break;
			case 47:
				if (getCharCode(offset + 1) === 42) {
					type = 25;
					offset = source.indexOf("*/", offset + 2);
					offset = offset === -1 ? source.length : offset + 2;
				} else {
					type = 9;
					offset++;
				}
				break;
			case 58:
				type = 16;
				offset++;
				break;
			case 59:
				type = 17;
				offset++;
				break;
			case 60:
				if (getCharCode(offset + 1) === 33 && getCharCode(offset + 2) === 45 && getCharCode(offset + 3) === 45) {
					type = 14;
					offset = offset + 4;
				} else {
					type = 9;
					offset++;
				}
				break;
			case 64:
				if (isIdentifierStart(getCharCode(offset + 1), getCharCode(offset + 2), getCharCode(offset + 3))) {
					type = 3;
					offset = consumeName(source, offset + 1);
				} else {
					type = 9;
					offset++;
				}
				break;
			case 91:
				type = 19;
				offset++;
				break;
			case 92:
				if (isValidEscape(code, getCharCode(offset + 1))) consumeIdentLikeToken();
				else {
					type = 9;
					offset++;
				}
				break;
			case 93:
				type = 20;
				offset++;
				break;
			case 123:
				type = 23;
				offset++;
				break;
			case 125:
				type = 24;
				offset++;
				break;
			case 131:
				consumeNumericToken();
				break;
			case 132:
				consumeIdentLikeToken();
				break;
			default:
				type = 9;
				offset++;
		}
		onToken(type, start, start = offset);
	}
}
//#endregion
//#region node_modules/.pnpm/css-tree@3.2.1/node_modules/css-tree/lib/utils/List.js
let releasedCursors = null;
var List = class List {
	static createItem(data) {
		return {
			prev: null,
			next: null,
			data
		};
	}
	constructor() {
		this.head = null;
		this.tail = null;
		this.cursor = null;
	}
	createItem(data) {
		return List.createItem(data);
	}
	allocateCursor(prev, next) {
		let cursor;
		if (releasedCursors !== null) {
			cursor = releasedCursors;
			releasedCursors = releasedCursors.cursor;
			cursor.prev = prev;
			cursor.next = next;
			cursor.cursor = this.cursor;
		} else cursor = {
			prev,
			next,
			cursor: this.cursor
		};
		this.cursor = cursor;
		return cursor;
	}
	releaseCursor() {
		const { cursor } = this;
		this.cursor = cursor.cursor;
		cursor.prev = null;
		cursor.next = null;
		cursor.cursor = releasedCursors;
		releasedCursors = cursor;
	}
	updateCursors(prevOld, prevNew, nextOld, nextNew) {
		let { cursor } = this;
		while (cursor !== null) {
			if (cursor.prev === prevOld) cursor.prev = prevNew;
			if (cursor.next === nextOld) cursor.next = nextNew;
			cursor = cursor.cursor;
		}
	}
	*[Symbol.iterator]() {
		for (let cursor = this.head; cursor !== null; cursor = cursor.next) yield cursor.data;
	}
	get size() {
		let size = 0;
		for (let cursor = this.head; cursor !== null; cursor = cursor.next) size++;
		return size;
	}
	get isEmpty() {
		return this.head === null;
	}
	get first() {
		return this.head && this.head.data;
	}
	get last() {
		return this.tail && this.tail.data;
	}
	fromArray(array) {
		let cursor = null;
		this.head = null;
		for (let data of array) {
			const item = List.createItem(data);
			if (cursor !== null) cursor.next = item;
			else this.head = item;
			item.prev = cursor;
			cursor = item;
		}
		this.tail = cursor;
		return this;
	}
	toArray() {
		return [...this];
	}
	toJSON() {
		return [...this];
	}
	forEach(fn, thisArg = this) {
		const cursor = this.allocateCursor(null, this.head);
		while (cursor.next !== null) {
			const item = cursor.next;
			cursor.next = item.next;
			fn.call(thisArg, item.data, item, this);
		}
		this.releaseCursor();
	}
	forEachRight(fn, thisArg = this) {
		const cursor = this.allocateCursor(this.tail, null);
		while (cursor.prev !== null) {
			const item = cursor.prev;
			cursor.prev = item.prev;
			fn.call(thisArg, item.data, item, this);
		}
		this.releaseCursor();
	}
	reduce(fn, initialValue, thisArg = this) {
		let cursor = this.allocateCursor(null, this.head);
		let acc = initialValue;
		let item;
		while (cursor.next !== null) {
			item = cursor.next;
			cursor.next = item.next;
			acc = fn.call(thisArg, acc, item.data, item, this);
		}
		this.releaseCursor();
		return acc;
	}
	reduceRight(fn, initialValue, thisArg = this) {
		let cursor = this.allocateCursor(this.tail, null);
		let acc = initialValue;
		let item;
		while (cursor.prev !== null) {
			item = cursor.prev;
			cursor.prev = item.prev;
			acc = fn.call(thisArg, acc, item.data, item, this);
		}
		this.releaseCursor();
		return acc;
	}
	some(fn, thisArg = this) {
		for (let cursor = this.head; cursor !== null; cursor = cursor.next) if (fn.call(thisArg, cursor.data, cursor, this)) return true;
		return false;
	}
	map(fn, thisArg = this) {
		const result = new List();
		for (let cursor = this.head; cursor !== null; cursor = cursor.next) result.appendData(fn.call(thisArg, cursor.data, cursor, this));
		return result;
	}
	filter(fn, thisArg = this) {
		const result = new List();
		for (let cursor = this.head; cursor !== null; cursor = cursor.next) if (fn.call(thisArg, cursor.data, cursor, this)) result.appendData(cursor.data);
		return result;
	}
	nextUntil(start, fn, thisArg = this) {
		if (start === null) return;
		const cursor = this.allocateCursor(null, start);
		while (cursor.next !== null) {
			const item = cursor.next;
			cursor.next = item.next;
			if (fn.call(thisArg, item.data, item, this)) break;
		}
		this.releaseCursor();
	}
	prevUntil(start, fn, thisArg = this) {
		if (start === null) return;
		const cursor = this.allocateCursor(start, null);
		while (cursor.prev !== null) {
			const item = cursor.prev;
			cursor.prev = item.prev;
			if (fn.call(thisArg, item.data, item, this)) break;
		}
		this.releaseCursor();
	}
	clear() {
		this.head = null;
		this.tail = null;
	}
	copy() {
		const result = new List();
		for (let data of this) result.appendData(data);
		return result;
	}
	prepend(item) {
		this.updateCursors(null, item, this.head, item);
		if (this.head !== null) {
			this.head.prev = item;
			item.next = this.head;
		} else this.tail = item;
		this.head = item;
		return this;
	}
	prependData(data) {
		return this.prepend(List.createItem(data));
	}
	append(item) {
		return this.insert(item);
	}
	appendData(data) {
		return this.insert(List.createItem(data));
	}
	insert(item, before = null) {
		if (before !== null) {
			this.updateCursors(before.prev, item, before, item);
			if (before.prev === null) {
				if (this.head !== before) throw new Error("before doesn't belong to list");
				this.head = item;
				before.prev = item;
				item.next = before;
				this.updateCursors(null, item);
			} else {
				before.prev.next = item;
				item.prev = before.prev;
				before.prev = item;
				item.next = before;
			}
		} else {
			this.updateCursors(this.tail, item, null, item);
			if (this.tail !== null) {
				this.tail.next = item;
				item.prev = this.tail;
			} else this.head = item;
			this.tail = item;
		}
		return this;
	}
	insertData(data, before) {
		return this.insert(List.createItem(data), before);
	}
	remove(item) {
		this.updateCursors(item, item.prev, item, item.next);
		if (item.prev !== null) item.prev.next = item.next;
		else {
			if (this.head !== item) throw new Error("item doesn't belong to list");
			this.head = item.next;
		}
		if (item.next !== null) item.next.prev = item.prev;
		else {
			if (this.tail !== item) throw new Error("item doesn't belong to list");
			this.tail = item.prev;
		}
		item.prev = null;
		item.next = null;
		return item;
	}
	push(data) {
		this.insert(List.createItem(data));
	}
	pop() {
		return this.tail !== null ? this.remove(this.tail) : null;
	}
	unshift(data) {
		this.prepend(List.createItem(data));
	}
	shift() {
		return this.head !== null ? this.remove(this.head) : null;
	}
	prependList(list) {
		return this.insertList(list, this.head);
	}
	appendList(list) {
		return this.insertList(list);
	}
	insertList(list, before) {
		if (list.head === null) return this;
		if (before !== void 0 && before !== null) {
			this.updateCursors(before.prev, list.tail, before, list.head);
			if (before.prev !== null) {
				before.prev.next = list.head;
				list.head.prev = before.prev;
			} else this.head = list.head;
			before.prev = list.tail;
			list.tail.next = before;
		} else {
			this.updateCursors(this.tail, list.tail, null, list.head);
			if (this.tail !== null) {
				this.tail.next = list.head;
				list.head.prev = this.tail;
			} else this.head = list.head;
			this.tail = list.tail;
		}
		list.head = null;
		list.tail = null;
		return this;
	}
	replace(oldItem, newItemOrList) {
		if ("head" in newItemOrList) this.insertList(newItemOrList, oldItem);
		else this.insert(newItemOrList, oldItem);
		this.remove(oldItem);
	}
};
//#endregion
//#region node_modules/.pnpm/css-tree@3.2.1/node_modules/css-tree/lib/utils/create-custom-error.js
function createCustomError(name, message) {
	const error = Object.create(SyntaxError.prototype);
	const errorStack = /* @__PURE__ */ new Error();
	return Object.assign(error, {
		name,
		message,
		get stack() {
			return (errorStack.stack || "").replace(/^(.+\n){1,3}/, `${name}: ${message}\n`);
		}
	});
}
//#endregion
//#region node_modules/.pnpm/css-tree@3.2.1/node_modules/css-tree/lib/parser/SyntaxError.js
const MAX_LINE_LENGTH = 100;
const OFFSET_CORRECTION = 60;
const TAB_REPLACEMENT = "    ";
function sourceFragment({ source, line, column, baseLine, baseColumn }, extraLines) {
	function processLines(start, end) {
		return lines.slice(start, end).map((line, idx) => String(start + idx + 1).padStart(maxNumLength) + " |" + line).join("\n");
	}
	const lines = ("\n".repeat(Math.max(baseLine - 1, 0)) + " ".repeat(Math.max(baseColumn - 1, 0)) + source).split(/\r\n?|\n|\f/);
	const startLine = Math.max(1, line - extraLines) - 1;
	const endLine = Math.min(line + extraLines, lines.length + 1);
	const maxNumLength = Math.max(4, String(endLine).length) + 1;
	let cutLeft = 0;
	column += 3 * (lines[line - 1].substr(0, column - 1).match(/\t/g) || []).length;
	if (column > MAX_LINE_LENGTH) {
		cutLeft = column - OFFSET_CORRECTION + 3;
		column = 58;
	}
	for (let i = startLine; i <= endLine; i++) if (i >= 0 && i < lines.length) {
		lines[i] = lines[i].replace(/\t/g, TAB_REPLACEMENT);
		lines[i] = (cutLeft > 0 && lines[i].length > cutLeft ? "…" : "") + lines[i].substr(cutLeft, 98) + (lines[i].length > cutLeft + MAX_LINE_LENGTH - 1 ? "…" : "");
	}
	return [
		processLines(startLine, line),
		new Array(column + maxNumLength + 2).join("-") + "^",
		processLines(line, endLine)
	].filter(Boolean).join("\n").replace(/^(\s+\d+\s+\|\n)+/, "").replace(/\n(\s+\d+\s+\|)+$/, "");
}
function SyntaxError$2(message, source, offset, line, column, baseLine = 1, baseColumn = 1) {
	return Object.assign(createCustomError("SyntaxError", message), {
		source,
		offset,
		line,
		column,
		sourceFragment(extraLines) {
			return sourceFragment({
				source,
				line,
				column,
				baseLine,
				baseColumn
			}, isNaN(extraLines) ? 0 : extraLines);
		},
		get formattedMessage() {
			return `Parse error: ${message}\n` + sourceFragment({
				source,
				line,
				column,
				baseLine,
				baseColumn
			}, 2);
		}
	});
}
//#endregion
//#region node_modules/.pnpm/css-tree@3.2.1/node_modules/css-tree/lib/parser/sequence.js
function readSequence(recognizer) {
	const children = this.createList();
	let space = false;
	const context = { recognizer };
	while (!this.eof) {
		switch (this.tokenType) {
			case 25:
				this.next();
				continue;
			case 13:
				space = true;
				this.next();
				continue;
		}
		let child = recognizer.getNode.call(this, context);
		if (child === void 0) break;
		if (space) {
			if (recognizer.onWhiteSpace) recognizer.onWhiteSpace.call(this, child, children, context);
			space = false;
		}
		children.push(child);
	}
	if (space && recognizer.onWhiteSpace) recognizer.onWhiteSpace.call(this, null, children, context);
	return children;
}
//#endregion
//#region node_modules/.pnpm/css-tree@3.2.1/node_modules/css-tree/lib/parser/create.js
const NOOP = () => {};
const EXCLAMATIONMARK$3 = 33;
const NUMBERSIGN$4 = 35;
const SEMICOLON = 59;
const LEFTCURLYBRACKET$1 = 123;
const NULL = 0;
const arrayMethods = {
	createList() {
		return [];
	},
	createSingleNodeList(node) {
		return [node];
	},
	getFirstListNode(list) {
		return list && list[0] || null;
	},
	getLastListNode(list) {
		return list && list.length > 0 ? list[list.length - 1] : null;
	}
};
const listMethods = {
	createList() {
		return new List();
	},
	createSingleNodeList(node) {
		return new List().appendData(node);
	},
	getFirstListNode(list) {
		return list && list.first;
	},
	getLastListNode(list) {
		return list && list.last;
	}
};
function createParseContext(name) {
	return function() {
		return this[name]();
	};
}
function fetchParseValues(dict) {
	const result = Object.create(null);
	for (const name of Object.keys(dict)) {
		const item = dict[name];
		const fn = item.parse || item;
		if (fn) result[name] = fn;
	}
	return result;
}
function processConfig(config) {
	const parseConfig = {
		context: Object.create(null),
		features: Object.assign(Object.create(null), config.features),
		scope: Object.assign(Object.create(null), config.scope),
		atrule: fetchParseValues(config.atrule),
		pseudo: fetchParseValues(config.pseudo),
		node: fetchParseValues(config.node)
	};
	for (const [name, context] of Object.entries(config.parseContext)) switch (typeof context) {
		case "function":
			parseConfig.context[name] = context;
			break;
		case "string": parseConfig.context[name] = createParseContext(context);
	}
	return {
		config: parseConfig,
		...parseConfig,
		...parseConfig.node
	};
}
function createParser(config) {
	let source = "";
	let filename = "<unknown>";
	let needPositions = false;
	let onParseError = NOOP;
	let onParseErrorThrow = false;
	const locationMap = new OffsetToLocation();
	const parser = Object.assign(new TokenStream(), processConfig(config || {}), {
		parseAtrulePrelude: true,
		parseRulePrelude: true,
		parseValue: true,
		parseCustomProperty: false,
		readSequence,
		consumeUntilBalanceEnd: () => 0,
		consumeUntilLeftCurlyBracket(code) {
			return code === LEFTCURLYBRACKET$1 ? 1 : 0;
		},
		consumeUntilLeftCurlyBracketOrSemicolon(code) {
			return code === LEFTCURLYBRACKET$1 || code === SEMICOLON ? 1 : 0;
		},
		consumeUntilExclamationMarkOrSemicolon(code) {
			return code === EXCLAMATIONMARK$3 || code === SEMICOLON ? 1 : 0;
		},
		consumeUntilSemicolonIncluded(code) {
			return code === SEMICOLON ? 2 : 0;
		},
		createList: NOOP,
		createSingleNodeList: NOOP,
		getFirstListNode: NOOP,
		getLastListNode: NOOP,
		parseWithFallback(consumer, fallback) {
			const startIndex = this.tokenIndex;
			try {
				return consumer.call(this);
			} catch (e) {
				if (onParseErrorThrow) throw e;
				this.skip(startIndex - this.tokenIndex);
				const fallbackNode = fallback.call(this);
				onParseErrorThrow = true;
				onParseError(e, fallbackNode);
				onParseErrorThrow = false;
				return fallbackNode;
			}
		},
		lookupNonWSType(offset) {
			let type;
			do {
				type = this.lookupType(offset++);
				if (type !== 13 && type !== 25) return type;
			} while (type !== NULL);
			return NULL;
		},
		charCodeAt(offset) {
			return offset >= 0 && offset < source.length ? source.charCodeAt(offset) : 0;
		},
		substring(offsetStart, offsetEnd) {
			return source.substring(offsetStart, offsetEnd);
		},
		substrToCursor(start) {
			return this.source.substring(start, this.tokenStart);
		},
		cmpChar(offset, charCode) {
			return cmpChar(source, offset, charCode);
		},
		cmpStr(offsetStart, offsetEnd, str) {
			return cmpStr(source, offsetStart, offsetEnd, str);
		},
		consume(tokenType) {
			const start = this.tokenStart;
			this.eat(tokenType);
			return this.substrToCursor(start);
		},
		consumeFunctionName() {
			const name = source.substring(this.tokenStart, this.tokenEnd - 1);
			this.eat(2);
			return name;
		},
		consumeNumber(type) {
			const number = source.substring(this.tokenStart, consumeNumber(source, this.tokenStart));
			this.eat(type);
			return number;
		},
		eat(tokenType) {
			if (this.tokenType !== tokenType) {
				const tokenName = names_default[tokenType].slice(0, -6).replace(/-/g, " ").replace(/^./, (m) => m.toUpperCase());
				let message = `${/[[\](){}]/.test(tokenName) ? `"${tokenName}"` : tokenName} is expected`;
				let offset = this.tokenStart;
				switch (tokenType) {
					case 1:
						if (this.tokenType === 2 || this.tokenType === 7) {
							offset = this.tokenEnd - 1;
							message = "Identifier is expected but function found";
						} else message = "Identifier is expected";
						break;
					case 4:
						if (this.isDelim(NUMBERSIGN$4)) {
							this.next();
							offset++;
							message = "Name is expected";
						}
						break;
					case 11: if (this.tokenType === 10) {
						offset = this.tokenEnd;
						message = "Percent sign is expected";
					}
				}
				this.error(message, offset);
			}
			this.next();
		},
		eatIdent(name) {
			if (this.tokenType !== 1 || this.lookupValue(0, name) === false) this.error(`Identifier "${name}" is expected`);
			this.next();
		},
		eatDelim(code) {
			if (!this.isDelim(code)) this.error(`Delim "${String.fromCharCode(code)}" is expected`);
			this.next();
		},
		getLocation(start, end) {
			if (needPositions) return locationMap.getLocationRange(start, end, filename);
			return null;
		},
		getLocationFromList(list) {
			if (needPositions) {
				const head = this.getFirstListNode(list);
				const tail = this.getLastListNode(list);
				return locationMap.getLocationRange(head !== null ? head.loc.start.offset - locationMap.startOffset : this.tokenStart, tail !== null ? tail.loc.end.offset - locationMap.startOffset : this.tokenStart, filename);
			}
			return null;
		},
		error(message, offset) {
			const location = typeof offset !== "undefined" && offset < source.length ? locationMap.getLocation(offset) : this.eof ? locationMap.getLocation(findWhiteSpaceStart(source, source.length - 1)) : locationMap.getLocation(this.tokenStart);
			throw new SyntaxError$2(message || "Unexpected input", source, location.offset, location.line, location.column, locationMap.startLine, locationMap.startColumn);
		}
	});
	const createTokenIterateAPI = () => ({
		filename,
		source,
		tokenCount: parser.tokenCount,
		getTokenType: (index) => parser.getTokenType(index),
		getTokenTypeName: (index) => names_default[parser.getTokenType(index)],
		getTokenStart: (index) => parser.getTokenStart(index),
		getTokenEnd: (index) => parser.getTokenEnd(index),
		getTokenValue: (index) => parser.source.substring(parser.getTokenStart(index), parser.getTokenEnd(index)),
		substring: (start, end) => parser.source.substring(start, end),
		balance: parser.balance.subarray(0, parser.tokenCount + 1),
		isBlockOpenerTokenType: parser.isBlockOpenerTokenType,
		isBlockCloserTokenType: parser.isBlockCloserTokenType,
		getBlockTokenPairIndex: (index) => parser.getBlockTokenPairIndex(index),
		getLocation: (offset) => locationMap.getLocation(offset, filename),
		getRangeLocation: (start, end) => locationMap.getLocationRange(start, end, filename)
	});
	const parse = function(source_, options) {
		source = source_;
		options = options || {};
		parser.setSource(source, tokenize$2);
		locationMap.setSource(source, options.offset, options.line, options.column);
		filename = options.filename || "<unknown>";
		needPositions = Boolean(options.positions);
		onParseError = typeof options.onParseError === "function" ? options.onParseError : NOOP;
		onParseErrorThrow = false;
		parser.parseAtrulePrelude = "parseAtrulePrelude" in options ? Boolean(options.parseAtrulePrelude) : true;
		parser.parseRulePrelude = "parseRulePrelude" in options ? Boolean(options.parseRulePrelude) : true;
		parser.parseValue = "parseValue" in options ? Boolean(options.parseValue) : true;
		parser.parseCustomProperty = "parseCustomProperty" in options ? Boolean(options.parseCustomProperty) : false;
		const { context = "default", list = true, onComment, onToken } = options;
		if (context in parser.context === false) throw new Error("Unknown context `" + context + "`");
		Object.assign(parser, list ? listMethods : arrayMethods);
		if (Array.isArray(onToken)) parser.forEachToken((type, start, end) => {
			onToken.push({
				type,
				start,
				end
			});
		});
		else if (typeof onToken === "function") parser.forEachToken(onToken.bind(createTokenIterateAPI()));
		if (typeof onComment === "function") parser.forEachToken((type, start, end) => {
			if (type === 25) {
				const loc = parser.getLocation(start, end);
				const value = cmpStr(source, end - 2, end, "*/") ? source.slice(start + 2, end - 2) : source.slice(start + 2, end);
				onComment(value, loc);
			}
		});
		const ast = parser.context[context].call(parser, options);
		if (!parser.eof) parser.error();
		return ast;
	};
	return Object.assign(parse, {
		SyntaxError: SyntaxError$2,
		config: parser.config
	});
}
//#endregion
//#region node_modules/.pnpm/source-map-js@1.2.2/node_modules/source-map-js/lib/base64.js
var require_base64 = /* @__PURE__ */ __commonJSMin(((exports) => {
	var intToCharMap = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
	/**
	* Encode an integer in the range of 0 to 63 to a single base 64 digit.
	*/
	exports.encode = function(number) {
		if (0 <= number && number < intToCharMap.length) return intToCharMap[number];
		throw new TypeError("Must be between 0 and 63: " + number);
	};
	/**
	* Decode a single base 64 character code digit to an integer. Returns -1 on
	* failure.
	*/
	exports.decode = function(charCode) {
		var bigA = 65;
		var bigZ = 90;
		var littleA = 97;
		var littleZ = 122;
		var zero = 48;
		var nine = 57;
		var plus = 43;
		var slash = 47;
		var littleOffset = 26;
		var numberOffset = 52;
		if (bigA <= charCode && charCode <= bigZ) return charCode - bigA;
		if (littleA <= charCode && charCode <= littleZ) return charCode - littleA + littleOffset;
		if (zero <= charCode && charCode <= nine) return charCode - zero + numberOffset;
		if (charCode == plus) return 62;
		if (charCode == slash) return 63;
		return -1;
	};
}));
//#endregion
//#region node_modules/.pnpm/source-map-js@1.2.2/node_modules/source-map-js/lib/base64-vlq.js
var require_base64_vlq = /* @__PURE__ */ __commonJSMin(((exports) => {
	var base64 = require_base64();
	var VLQ_BASE_SHIFT = 5;
	var VLQ_BASE = 1 << VLQ_BASE_SHIFT;
	var VLQ_BASE_MASK = VLQ_BASE - 1;
	var VLQ_CONTINUATION_BIT = VLQ_BASE;
	/**
	* Converts from a two-complement value to a value where the sign bit is
	* placed in the least significant bit.  For example, as decimals:
	*   1 becomes 2 (10 binary), -1 becomes 3 (11 binary)
	*   2 becomes 4 (100 binary), -2 becomes 5 (101 binary)
	*/
	function toVLQSigned(aValue) {
		return aValue < 0 ? (-aValue << 1) + 1 : (aValue << 1) + 0;
	}
	/**
	* Converts to a two-complement value from a value where the sign bit is
	* placed in the least significant bit.  For example, as decimals:
	*   2 (10 binary) becomes 1, 3 (11 binary) becomes -1
	*   4 (100 binary) becomes 2, 5 (101 binary) becomes -2
	*/
	function fromVLQSigned(aValue) {
		var isNegative = (aValue & 1) === 1;
		var shifted = aValue >> 1;
		return isNegative ? -shifted : shifted;
	}
	/**
	* Returns the base 64 VLQ encoded value.
	*/
	exports.encode = function base64VLQ_encode(aValue) {
		var encoded = "";
		var digit;
		var vlq = toVLQSigned(aValue);
		do {
			digit = vlq & VLQ_BASE_MASK;
			vlq >>>= VLQ_BASE_SHIFT;
			if (vlq > 0) digit |= VLQ_CONTINUATION_BIT;
			encoded += base64.encode(digit);
		} while (vlq > 0);
		return encoded;
	};
	/**
	* Decodes the next base 64 VLQ value from the given string and returns the
	* value and the rest of the string via the out parameter.
	*/
	exports.decode = function base64VLQ_decode(aStr, aIndex, aOutParam) {
		var strLen = aStr.length;
		var result = 0;
		var shift = 0;
		var continuation, digit;
		do {
			if (aIndex >= strLen) throw new Error("Expected more digits in base 64 VLQ value.");
			digit = base64.decode(aStr.charCodeAt(aIndex++));
			if (digit === -1) throw new Error("Invalid base64 digit: " + aStr.charAt(aIndex - 1));
			continuation = !!(digit & VLQ_CONTINUATION_BIT);
			digit &= VLQ_BASE_MASK;
			result = result + (digit << shift);
			shift += VLQ_BASE_SHIFT;
		} while (continuation);
		aOutParam.value = fromVLQSigned(result);
		aOutParam.rest = aIndex;
	};
}));
//#endregion
//#region node_modules/.pnpm/source-map-js@1.2.2/node_modules/source-map-js/lib/util.js
var require_util = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* This is a helper function for getting values from parameter/options
	* objects.
	*
	* @param args The object we are extracting values from
	* @param name The name of the property we are getting.
	* @param defaultValue An optional value to return if the property is missing
	* from the object. If this is not specified and the property is missing, an
	* error will be thrown.
	*/
	function getArg(aArgs, aName, aDefaultValue) {
		if (aName in aArgs) return aArgs[aName];
		else if (arguments.length === 3) return aDefaultValue;
		else throw new Error("\"" + aName + "\" is a required argument.");
	}
	exports.getArg = getArg;
	var urlRegexp = /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.-]*)(?::(\d+))?(.*)$/;
	var dataUrlRegexp = /^data:.+\,.+$/;
	function urlParse(aUrl) {
		var match = aUrl.match(urlRegexp);
		if (!match) return null;
		return {
			scheme: match[1],
			auth: match[2],
			host: match[3],
			port: match[4],
			path: match[5]
		};
	}
	exports.urlParse = urlParse;
	function urlGenerate(aParsedUrl) {
		var url = "";
		if (aParsedUrl.scheme) url += aParsedUrl.scheme + ":";
		url += "//";
		if (aParsedUrl.auth) url += aParsedUrl.auth + "@";
		if (aParsedUrl.host) url += aParsedUrl.host;
		if (aParsedUrl.port) url += ":" + aParsedUrl.port;
		if (aParsedUrl.path) url += aParsedUrl.path;
		return url;
	}
	exports.urlGenerate = urlGenerate;
	var MAX_CACHED_INPUTS = 32;
	/**
	* Takes some function `f(input) -> result` and returns a memoized version of
	* `f`.
	*
	* We keep at most `MAX_CACHED_INPUTS` memoized results of `f` alive. The
	* memoization is a dumb-simple, linear least-recently-used cache.
	*/
	function lruMemoize(f) {
		var cache = [];
		return function(input) {
			for (var i = 0; i < cache.length; i++) if (cache[i].input === input) {
				var temp = cache[0];
				cache[0] = cache[i];
				cache[i] = temp;
				return cache[0].result;
			}
			var result = f(input);
			cache.unshift({
				input,
				result
			});
			if (cache.length > MAX_CACHED_INPUTS) cache.pop();
			return result;
		};
	}
	/**
	* Normalizes a path, or the path portion of a URL:
	*
	* - Replaces consecutive slashes with one slash.
	* - Removes unnecessary '.' parts.
	* - Removes unnecessary '<dir>/..' parts.
	*
	* Based on code in the Node.js 'path' core module.
	*
	* @param aPath The path or url to normalize.
	*/
	var normalize = lruMemoize(function normalize(aPath) {
		var path = aPath;
		var url = urlParse(aPath);
		if (url) {
			if (!url.path) return aPath;
			path = url.path;
		}
		var isAbsolute = exports.isAbsolute(path);
		var parts = [];
		var start = 0;
		var i = 0;
		while (true) {
			start = i;
			i = path.indexOf("/", start);
			if (i === -1) {
				parts.push(path.slice(start));
				break;
			} else {
				parts.push(path.slice(start, i));
				while (i < path.length && path[i] === "/") i++;
			}
		}
		for (var part, up = 0, i = parts.length - 1; i >= 0; i--) {
			part = parts[i];
			if (part === ".") parts.splice(i, 1);
			else if (part === "..") up++;
			else if (up > 0) {
				if (part === "") {
					parts.splice(i + 1, up);
					up = 0;
				} else {
					parts.splice(i, 2);
					up--;
				}
			}
		}
		path = parts.join("/");
		if (path === "") path = isAbsolute ? "/" : ".";
		if (url) {
			url.path = path;
			return urlGenerate(url);
		}
		return path;
	});
	exports.normalize = normalize;
	/**
	* Joins two paths/URLs.
	*
	* @param aRoot The root path or URL.
	* @param aPath The path or URL to be joined with the root.
	*
	* - If aPath is a URL or a data URI, aPath is returned, unless aPath is a
	*   scheme-relative URL: Then the scheme of aRoot, if any, is prepended
	*   first.
	* - Otherwise aPath is a path. If aRoot is a URL, then its path portion
	*   is updated with the result and aRoot is returned. Otherwise the result
	*   is returned.
	*   - If aPath is absolute, the result is aPath.
	*   - Otherwise the two paths are joined with a slash.
	* - Joining for example 'http://' and 'www.example.com' is also supported.
	*/
	function join(aRoot, aPath) {
		if (aRoot === "") aRoot = ".";
		if (aPath === "") aPath = ".";
		var aPathUrl = urlParse(aPath);
		var aRootUrl = urlParse(aRoot);
		if (aRootUrl) aRoot = aRootUrl.path || "/";
		if (aPathUrl && !aPathUrl.scheme) {
			if (aRootUrl) aPathUrl.scheme = aRootUrl.scheme;
			return urlGenerate(aPathUrl);
		}
		if (aPathUrl || aPath.match(dataUrlRegexp)) return aPath;
		if (aRootUrl && !aRootUrl.host && !aRootUrl.path) {
			aRootUrl.host = aPath;
			return urlGenerate(aRootUrl);
		}
		var joined = aPath.charAt(0) === "/" ? aPath : normalize(aRoot.replace(/\/+$/, "") + "/" + aPath);
		if (aRootUrl) {
			aRootUrl.path = joined;
			return urlGenerate(aRootUrl);
		}
		return joined;
	}
	exports.join = join;
	exports.isAbsolute = function(aPath) {
		return aPath.charAt(0) === "/" || urlRegexp.test(aPath);
	};
	/**
	* Make a path relative to a URL or another path.
	*
	* @param aRoot The root path or URL.
	* @param aPath The path or URL to be made relative to aRoot.
	*/
	function relative(aRoot, aPath) {
		if (aRoot === "") aRoot = ".";
		aRoot = aRoot.replace(/\/$/, "");
		var level = 0;
		while (aPath.indexOf(aRoot + "/") !== 0) {
			var index = aRoot.lastIndexOf("/");
			if (index < 0) return aPath;
			aRoot = aRoot.slice(0, index);
			if (aRoot.match(/^([^\/]+:\/)?\/*$/)) return aPath;
			++level;
		}
		return Array(level + 1).join("../") + aPath.substr(aRoot.length + 1);
	}
	exports.relative = relative;
	var supportsNullProto = function() {
		return !("__proto__" in Object.create(null));
	}();
	function identity(s) {
		return s;
	}
	/**
	* Because behavior goes wacky when you set `__proto__` on objects, we
	* have to prefix all the strings in our set with an arbitrary character.
	*
	* See https://github.com/mozilla/source-map/pull/31 and
	* https://github.com/mozilla/source-map/issues/30
	*
	* @param String aStr
	*/
	function toSetString(aStr) {
		if (isProtoString(aStr)) return "$" + aStr;
		return aStr;
	}
	exports.toSetString = supportsNullProto ? identity : toSetString;
	function fromSetString(aStr) {
		if (isProtoString(aStr)) return aStr.slice(1);
		return aStr;
	}
	exports.fromSetString = supportsNullProto ? identity : fromSetString;
	function isProtoString(s) {
		if (!s) return false;
		var length = s.length;
		if (length < 9) return false;
		if (s.charCodeAt(length - 1) !== 95 || s.charCodeAt(length - 2) !== 95 || s.charCodeAt(length - 3) !== 111 || s.charCodeAt(length - 4) !== 116 || s.charCodeAt(length - 5) !== 111 || s.charCodeAt(length - 6) !== 114 || s.charCodeAt(length - 7) !== 112 || s.charCodeAt(length - 8) !== 95 || s.charCodeAt(length - 9) !== 95) return false;
		for (var i = length - 10; i >= 0; i--) if (s.charCodeAt(i) !== 36) return false;
		return true;
	}
	/**
	* Comparator between two mappings where the original positions are compared.
	*
	* Optionally pass in `true` as `onlyCompareGenerated` to consider two
	* mappings with the same original source/line/column, but different generated
	* line and column the same. Useful when searching for a mapping with a
	* stubbed out mapping.
	*/
	function compareByOriginalPositions(mappingA, mappingB, onlyCompareOriginal) {
		var cmp = strcmp(mappingA.source, mappingB.source);
		if (cmp !== 0) return cmp;
		cmp = mappingA.originalLine - mappingB.originalLine;
		if (cmp !== 0) return cmp;
		cmp = mappingA.originalColumn - mappingB.originalColumn;
		if (cmp !== 0 || onlyCompareOriginal) return cmp;
		cmp = mappingA.generatedColumn - mappingB.generatedColumn;
		if (cmp !== 0) return cmp;
		cmp = mappingA.generatedLine - mappingB.generatedLine;
		if (cmp !== 0) return cmp;
		return strcmp(mappingA.name, mappingB.name);
	}
	exports.compareByOriginalPositions = compareByOriginalPositions;
	function compareByOriginalPositionsNoSource(mappingA, mappingB, onlyCompareOriginal) {
		var cmp = mappingA.originalLine - mappingB.originalLine;
		if (cmp !== 0) return cmp;
		cmp = mappingA.originalColumn - mappingB.originalColumn;
		if (cmp !== 0 || onlyCompareOriginal) return cmp;
		cmp = mappingA.generatedColumn - mappingB.generatedColumn;
		if (cmp !== 0) return cmp;
		cmp = mappingA.generatedLine - mappingB.generatedLine;
		if (cmp !== 0) return cmp;
		return strcmp(mappingA.name, mappingB.name);
	}
	exports.compareByOriginalPositionsNoSource = compareByOriginalPositionsNoSource;
	/**
	* Comparator between two mappings with deflated source and name indices where
	* the generated positions are compared.
	*
	* Optionally pass in `true` as `onlyCompareGenerated` to consider two
	* mappings with the same generated line and column, but different
	* source/name/original line and column the same. Useful when searching for a
	* mapping with a stubbed out mapping.
	*/
	function compareByGeneratedPositionsDeflated(mappingA, mappingB, onlyCompareGenerated) {
		var cmp = mappingA.generatedLine - mappingB.generatedLine;
		if (cmp !== 0) return cmp;
		cmp = mappingA.generatedColumn - mappingB.generatedColumn;
		if (cmp !== 0 || onlyCompareGenerated) return cmp;
		cmp = strcmp(mappingA.source, mappingB.source);
		if (cmp !== 0) return cmp;
		cmp = mappingA.originalLine - mappingB.originalLine;
		if (cmp !== 0) return cmp;
		cmp = mappingA.originalColumn - mappingB.originalColumn;
		if (cmp !== 0) return cmp;
		return strcmp(mappingA.name, mappingB.name);
	}
	exports.compareByGeneratedPositionsDeflated = compareByGeneratedPositionsDeflated;
	function compareByGeneratedPositionsDeflatedNoLine(mappingA, mappingB, onlyCompareGenerated) {
		var cmp = mappingA.generatedColumn - mappingB.generatedColumn;
		if (cmp !== 0 || onlyCompareGenerated) return cmp;
		cmp = strcmp(mappingA.source, mappingB.source);
		if (cmp !== 0) return cmp;
		cmp = mappingA.originalLine - mappingB.originalLine;
		if (cmp !== 0) return cmp;
		cmp = mappingA.originalColumn - mappingB.originalColumn;
		if (cmp !== 0) return cmp;
		return strcmp(mappingA.name, mappingB.name);
	}
	exports.compareByGeneratedPositionsDeflatedNoLine = compareByGeneratedPositionsDeflatedNoLine;
	function strcmp(aStr1, aStr2) {
		if (aStr1 === aStr2) return 0;
		if (aStr1 === null) return 1;
		if (aStr2 === null) return -1;
		if (aStr1 > aStr2) return 1;
		return -1;
	}
	/**
	* Comparator between two mappings with inflated source and name strings where
	* the generated positions are compared.
	*/
	function compareByGeneratedPositionsInflated(mappingA, mappingB) {
		var cmp = mappingA.generatedLine - mappingB.generatedLine;
		if (cmp !== 0) return cmp;
		cmp = mappingA.generatedColumn - mappingB.generatedColumn;
		if (cmp !== 0) return cmp;
		cmp = strcmp(mappingA.source, mappingB.source);
		if (cmp !== 0) return cmp;
		cmp = mappingA.originalLine - mappingB.originalLine;
		if (cmp !== 0) return cmp;
		cmp = mappingA.originalColumn - mappingB.originalColumn;
		if (cmp !== 0) return cmp;
		return strcmp(mappingA.name, mappingB.name);
	}
	exports.compareByGeneratedPositionsInflated = compareByGeneratedPositionsInflated;
	/**
	* Strip any JSON XSSI avoidance prefix from the string (as documented
	* in the source maps specification), and then parse the string as
	* JSON.
	*/
	function parseSourceMapInput(str) {
		return JSON.parse(str.replace(/^\)]}'[^\n]*\n/, ""));
	}
	exports.parseSourceMapInput = parseSourceMapInput;
	/**
	* Compute the URL of a source given the the source root, the source's
	* URL, and the source map's URL.
	*/
	function computeSourceURL(sourceRoot, sourceURL, sourceMapURL) {
		sourceURL = sourceURL || "";
		if (sourceRoot) {
			if (sourceRoot[sourceRoot.length - 1] !== "/" && sourceURL[0] !== "/") sourceRoot += "/";
			sourceURL = sourceRoot + sourceURL;
		}
		if (sourceMapURL) {
			var parsed = urlParse(sourceMapURL);
			if (!parsed) throw new Error("sourceMapURL could not be parsed");
			if (parsed.path) {
				var index = parsed.path.lastIndexOf("/");
				if (index >= 0) parsed.path = parsed.path.substring(0, index + 1);
			}
			sourceURL = join(urlGenerate(parsed), sourceURL);
		}
		return normalize(sourceURL);
	}
	exports.computeSourceURL = computeSourceURL;
}));
//#endregion
//#region node_modules/.pnpm/source-map-js@1.2.2/node_modules/source-map-js/lib/array-set.js
var require_array_set = /* @__PURE__ */ __commonJSMin(((exports) => {
	var util = require_util();
	var has = Object.prototype.hasOwnProperty;
	var hasNativeMap = typeof Map !== "undefined";
	/**
	* A data structure which is a combination of an array and a set. Adding a new
	* member is O(1), testing for membership is O(1), and finding the index of an
	* element is O(1). Removing elements from the set is not supported. Only
	* strings are supported for membership.
	*/
	function ArraySet() {
		this._array = [];
		this._set = hasNativeMap ? /* @__PURE__ */ new Map() : Object.create(null);
	}
	/**
	* Static method for creating ArraySet instances from an existing array.
	*/
	ArraySet.fromArray = function ArraySet_fromArray(aArray, aAllowDuplicates) {
		var set = new ArraySet();
		for (var i = 0, len = aArray.length; i < len; i++) set.add(aArray[i], aAllowDuplicates);
		return set;
	};
	/**
	* Return how many unique items are in this ArraySet. If duplicates have been
	* added, than those do not count towards the size.
	*
	* @returns Number
	*/
	ArraySet.prototype.size = function ArraySet_size() {
		return hasNativeMap ? this._set.size : Object.getOwnPropertyNames(this._set).length;
	};
	/**
	* Add the given string to this set.
	*
	* @param String aStr
	*/
	ArraySet.prototype.add = function ArraySet_add(aStr, aAllowDuplicates) {
		var sStr = hasNativeMap ? aStr : util.toSetString(aStr);
		var isDuplicate = hasNativeMap ? this.has(aStr) : has.call(this._set, sStr);
		var idx = this._array.length;
		if (!isDuplicate || aAllowDuplicates) this._array.push(aStr);
		if (!isDuplicate) {
			if (hasNativeMap) this._set.set(aStr, idx);
			else this._set[sStr] = idx;
		}
	};
	/**
	* Is the given string a member of this set?
	*
	* @param String aStr
	*/
	ArraySet.prototype.has = function ArraySet_has(aStr) {
		if (hasNativeMap) return this._set.has(aStr);
		else {
			var sStr = util.toSetString(aStr);
			return has.call(this._set, sStr);
		}
	};
	/**
	* What is the index of the given string in the array?
	*
	* @param String aStr
	*/
	ArraySet.prototype.indexOf = function ArraySet_indexOf(aStr) {
		if (hasNativeMap) {
			var idx = this._set.get(aStr);
			if (idx >= 0) return idx;
		} else {
			var sStr = util.toSetString(aStr);
			if (has.call(this._set, sStr)) return this._set[sStr];
		}
		throw new Error("\"" + aStr + "\" is not in the set.");
	};
	/**
	* What is the element at the given index?
	*
	* @param Number aIdx
	*/
	ArraySet.prototype.at = function ArraySet_at(aIdx) {
		if (aIdx >= 0 && aIdx < this._array.length) return this._array[aIdx];
		throw new Error("No element indexed by " + aIdx);
	};
	/**
	* Returns the array representation of this set (which has the proper indices
	* indicated by indexOf). Note that this is a copy of the internal array used
	* for storing the members so that no one can mess with internal state.
	*/
	ArraySet.prototype.toArray = function ArraySet_toArray() {
		return this._array.slice();
	};
	exports.ArraySet = ArraySet;
}));
//#endregion
//#region node_modules/.pnpm/source-map-js@1.2.2/node_modules/source-map-js/lib/mapping-list.js
var require_mapping_list = /* @__PURE__ */ __commonJSMin(((exports) => {
	var util = require_util();
	/**
	* Determine whether mappingB is after mappingA with respect to generated
	* position.
	*/
	function generatedPositionAfter(mappingA, mappingB) {
		var lineA = mappingA.generatedLine;
		var lineB = mappingB.generatedLine;
		var columnA = mappingA.generatedColumn;
		var columnB = mappingB.generatedColumn;
		return lineB > lineA || lineB == lineA && columnB >= columnA || util.compareByGeneratedPositionsInflated(mappingA, mappingB) <= 0;
	}
	/**
	* A data structure to provide a sorted view of accumulated mappings in a
	* performance conscious manner. It trades a neglibable overhead in general
	* case for a large speedup in case of mappings being added in order.
	*/
	function MappingList() {
		this._array = [];
		this._sorted = true;
		this._last = {
			generatedLine: -1,
			generatedColumn: 0
		};
	}
	/**
	* Iterate through internal items. This method takes the same arguments that
	* `Array.prototype.forEach` takes.
	*
	* NOTE: The order of the mappings is NOT guaranteed.
	*/
	MappingList.prototype.unsortedForEach = function MappingList_forEach(aCallback, aThisArg) {
		this._array.forEach(aCallback, aThisArg);
	};
	/**
	* Add the given source mapping.
	*
	* @param Object aMapping
	*/
	MappingList.prototype.add = function MappingList_add(aMapping) {
		if (generatedPositionAfter(this._last, aMapping)) {
			this._last = aMapping;
			this._array.push(aMapping);
		} else {
			this._sorted = false;
			this._array.push(aMapping);
		}
	};
	/**
	* Returns the flat, sorted array of mappings. The mappings are sorted by
	* generated position.
	*
	* WARNING: This method returns internal data without copying, for
	* performance. The return value must NOT be mutated, and should be treated as
	* an immutable borrow. If you want to take ownership, you must make your own
	* copy.
	*/
	MappingList.prototype.toArray = function MappingList_toArray() {
		if (!this._sorted) {
			this._array.sort(util.compareByGeneratedPositionsInflated);
			this._sorted = true;
		}
		return this._array;
	};
	exports.MappingList = MappingList;
}));
//#endregion
//#region node_modules/.pnpm/css-tree@3.2.1/node_modules/css-tree/lib/generator/sourceMap.js
var import_source_map_generator = (/* @__PURE__ */ __commonJSMin(((exports) => {
	var base64VLQ = require_base64_vlq();
	var util = require_util();
	var ArraySet = require_array_set().ArraySet;
	var MappingList = require_mapping_list().MappingList;
	/**
	* An instance of the SourceMapGenerator represents a source map which is
	* being built incrementally. You may pass an object with the following
	* properties:
	*
	*   - file: The filename of the generated source.
	*   - sourceRoot: A root for all relative URLs in this source map.
	*/
	function SourceMapGenerator(aArgs) {
		if (!aArgs) aArgs = {};
		this._file = util.getArg(aArgs, "file", null);
		this._sourceRoot = util.getArg(aArgs, "sourceRoot", null);
		this._skipValidation = util.getArg(aArgs, "skipValidation", false);
		this._ignoreInvalidMapping = util.getArg(aArgs, "ignoreInvalidMapping", false);
		this._sources = new ArraySet();
		this._names = new ArraySet();
		this._mappings = new MappingList();
		this._sourcesContents = null;
	}
	SourceMapGenerator.prototype._version = 3;
	/**
	* Creates a new SourceMapGenerator based on a SourceMapConsumer
	*
	* @param aSourceMapConsumer The SourceMap.
	*/
	SourceMapGenerator.fromSourceMap = function SourceMapGenerator_fromSourceMap(aSourceMapConsumer, generatorOps) {
		var sourceRoot = aSourceMapConsumer.sourceRoot;
		var generator = new SourceMapGenerator(Object.assign(generatorOps || {}, {
			file: aSourceMapConsumer.file,
			sourceRoot
		}));
		aSourceMapConsumer.eachMapping(function(mapping) {
			var newMapping = { generated: {
				line: mapping.generatedLine,
				column: mapping.generatedColumn
			} };
			if (mapping.source != null) {
				newMapping.source = mapping.source;
				if (sourceRoot != null) newMapping.source = util.relative(sourceRoot, newMapping.source);
				newMapping.original = {
					line: mapping.originalLine,
					column: mapping.originalColumn
				};
				if (mapping.name != null) newMapping.name = mapping.name;
			}
			generator.addMapping(newMapping);
		});
		aSourceMapConsumer.sources.forEach(function(sourceFile) {
			var sourceRelative = sourceFile;
			if (sourceRoot !== null) sourceRelative = util.relative(sourceRoot, sourceFile);
			if (!generator._sources.has(sourceRelative)) generator._sources.add(sourceRelative);
			var content = aSourceMapConsumer.sourceContentFor(sourceFile);
			if (content != null) generator.setSourceContent(sourceFile, content);
		});
		return generator;
	};
	/**
	* Add a single mapping from original source line and column to the generated
	* source's line and column for this source map being created. The mapping
	* object should have the following properties:
	*
	*   - generated: An object with the generated line and column positions.
	*   - original: An object with the original line and column positions.
	*   - source: The original source file (relative to the sourceRoot).
	*   - name: An optional original token name for this mapping.
	*/
	SourceMapGenerator.prototype.addMapping = function SourceMapGenerator_addMapping(aArgs) {
		var generated = util.getArg(aArgs, "generated");
		var original = util.getArg(aArgs, "original", null);
		var source = util.getArg(aArgs, "source", null);
		var name = util.getArg(aArgs, "name", null);
		if (!this._skipValidation) {
			if (this._validateMapping(generated, original, source, name) === false) return;
		}
		if (source != null) {
			source = String(source);
			if (!this._sources.has(source)) this._sources.add(source);
		}
		if (name != null) {
			name = String(name);
			if (!this._names.has(name)) this._names.add(name);
		}
		this._mappings.add({
			generatedLine: generated.line,
			generatedColumn: generated.column,
			originalLine: original != null && original.line,
			originalColumn: original != null && original.column,
			source,
			name
		});
	};
	/**
	* Set the source content for a source file.
	*/
	SourceMapGenerator.prototype.setSourceContent = function SourceMapGenerator_setSourceContent(aSourceFile, aSourceContent) {
		var source = aSourceFile;
		if (this._sourceRoot != null) source = util.relative(this._sourceRoot, source);
		if (aSourceContent != null) {
			if (!this._sourcesContents) this._sourcesContents = Object.create(null);
			this._sourcesContents[util.toSetString(source)] = aSourceContent;
		} else if (this._sourcesContents) {
			delete this._sourcesContents[util.toSetString(source)];
			if (Object.keys(this._sourcesContents).length === 0) this._sourcesContents = null;
		}
	};
	/**
	* Applies the mappings of a sub-source-map for a specific source file to the
	* source map being generated. Each mapping to the supplied source file is
	* rewritten using the supplied source map. Note: The resolution for the
	* resulting mappings is the minimium of this map and the supplied map.
	*
	* @param aSourceMapConsumer The source map to be applied.
	* @param aSourceFile Optional. The filename of the source file.
	*        If omitted, SourceMapConsumer's file property will be used.
	* @param aSourceMapPath Optional. The dirname of the path to the source map
	*        to be applied. If relative, it is relative to the SourceMapConsumer.
	*        This parameter is needed when the two source maps aren't in the same
	*        directory, and the source map to be applied contains relative source
	*        paths. If so, those relative source paths need to be rewritten
	*        relative to the SourceMapGenerator.
	*/
	SourceMapGenerator.prototype.applySourceMap = function SourceMapGenerator_applySourceMap(aSourceMapConsumer, aSourceFile, aSourceMapPath) {
		var sourceFile = aSourceFile;
		if (aSourceFile == null) {
			if (aSourceMapConsumer.file == null) throw new Error("SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, or the source map's \"file\" property. Both were omitted.");
			sourceFile = aSourceMapConsumer.file;
		}
		var sourceRoot = this._sourceRoot;
		if (sourceRoot != null) sourceFile = util.relative(sourceRoot, sourceFile);
		var newSources = new ArraySet();
		var newNames = new ArraySet();
		this._mappings.unsortedForEach(function(mapping) {
			if (mapping.source === sourceFile && mapping.originalLine != null) {
				var original = aSourceMapConsumer.originalPositionFor({
					line: mapping.originalLine,
					column: mapping.originalColumn
				});
				if (original.source != null) {
					mapping.source = original.source;
					if (aSourceMapPath != null) mapping.source = util.join(aSourceMapPath, mapping.source);
					if (sourceRoot != null) mapping.source = util.relative(sourceRoot, mapping.source);
					mapping.originalLine = original.line;
					mapping.originalColumn = original.column;
					if (original.name != null) mapping.name = original.name;
				}
			}
			var source = mapping.source;
			if (source != null && !newSources.has(source)) newSources.add(source);
			var name = mapping.name;
			if (name != null && !newNames.has(name)) newNames.add(name);
		}, this);
		this._sources = newSources;
		this._names = newNames;
		aSourceMapConsumer.sources.forEach(function(sourceFile) {
			var content = aSourceMapConsumer.sourceContentFor(sourceFile);
			if (content != null) {
				if (aSourceMapPath != null) sourceFile = util.join(aSourceMapPath, sourceFile);
				if (sourceRoot != null) sourceFile = util.relative(sourceRoot, sourceFile);
				this.setSourceContent(sourceFile, content);
			}
		}, this);
	};
	/**
	* A mapping can have one of the three levels of data:
	*
	*   1. Just the generated position.
	*   2. The Generated position, original position, and original source.
	*   3. Generated and original position, original source, as well as a name
	*      token.
	*
	* To maintain consistency, we validate that any new mapping being added falls
	* in to one of these categories.
	*/
	SourceMapGenerator.prototype._validateMapping = function SourceMapGenerator_validateMapping(aGenerated, aOriginal, aSource, aName) {
		if (aOriginal && typeof aOriginal.line !== "number" && typeof aOriginal.column !== "number") {
			var message = "original.line and original.column are not numbers -- you probably meant to omit the original mapping entirely and only map the generated position. If so, pass null for the original mapping instead of an object with empty or null values.";
			if (this._ignoreInvalidMapping) {
				if (typeof console !== "undefined" && console.warn) console.warn(message);
				return false;
			} else throw new Error(message);
		}
		if (aGenerated && "line" in aGenerated && "column" in aGenerated && aGenerated.line > 0 && aGenerated.column >= 0 && !aOriginal && !aSource && !aName) return;
		else if (aGenerated && "line" in aGenerated && "column" in aGenerated && aOriginal && "line" in aOriginal && "column" in aOriginal && aGenerated.line > 0 && aGenerated.column >= 0 && aOriginal.line > 0 && aOriginal.column >= 0 && aSource) return;
		else {
			var message = "Invalid mapping: " + JSON.stringify({
				generated: aGenerated,
				source: aSource,
				original: aOriginal,
				name: aName
			});
			if (this._ignoreInvalidMapping) {
				if (typeof console !== "undefined" && console.warn) console.warn(message);
				return false;
			} else throw new Error(message);
		}
	};
	/**
	* Serialize the accumulated mappings in to the stream of base 64 VLQs
	* specified by the source map format.
	*/
	SourceMapGenerator.prototype._serializeMappings = function SourceMapGenerator_serializeMappings() {
		var previousGeneratedColumn = 0;
		var previousGeneratedLine = 1;
		var previousOriginalColumn = 0;
		var previousOriginalLine = 0;
		var previousName = 0;
		var previousSource = 0;
		var result = "";
		var next;
		var mapping;
		var nameIdx;
		var sourceIdx;
		var mappings = this._mappings.toArray();
		for (var i = 0, len = mappings.length; i < len; i++) {
			mapping = mappings[i];
			next = "";
			if (mapping.generatedLine !== previousGeneratedLine) {
				previousGeneratedColumn = 0;
				var lineDelta = mapping.generatedLine - previousGeneratedLine;
				next += lineDelta === 1 ? ";" : ";".repeat(lineDelta);
				previousGeneratedLine = mapping.generatedLine;
			} else if (i > 0) {
				if (!util.compareByGeneratedPositionsInflated(mapping, mappings[i - 1])) continue;
				next += ",";
			}
			next += base64VLQ.encode(mapping.generatedColumn - previousGeneratedColumn);
			previousGeneratedColumn = mapping.generatedColumn;
			if (mapping.source != null) {
				sourceIdx = this._sources.indexOf(mapping.source);
				next += base64VLQ.encode(sourceIdx - previousSource);
				previousSource = sourceIdx;
				next += base64VLQ.encode(mapping.originalLine - 1 - previousOriginalLine);
				previousOriginalLine = mapping.originalLine - 1;
				next += base64VLQ.encode(mapping.originalColumn - previousOriginalColumn);
				previousOriginalColumn = mapping.originalColumn;
				if (mapping.name != null) {
					nameIdx = this._names.indexOf(mapping.name);
					next += base64VLQ.encode(nameIdx - previousName);
					previousName = nameIdx;
				}
			}
			result += next;
		}
		return result;
	};
	SourceMapGenerator.prototype._generateSourcesContent = function SourceMapGenerator_generateSourcesContent(aSources, aSourceRoot) {
		return aSources.map(function(source) {
			if (!this._sourcesContents) return null;
			if (aSourceRoot != null) source = util.relative(aSourceRoot, source);
			var key = util.toSetString(source);
			return Object.prototype.hasOwnProperty.call(this._sourcesContents, key) ? this._sourcesContents[key] : null;
		}, this);
	};
	/**
	* Externalize the source map.
	*/
	SourceMapGenerator.prototype.toJSON = function SourceMapGenerator_toJSON() {
		var map = {
			version: this._version,
			sources: this._sources.toArray(),
			names: this._names.toArray(),
			mappings: this._serializeMappings()
		};
		if (this._file != null) map.file = this._file;
		if (this._sourceRoot != null) map.sourceRoot = this._sourceRoot;
		if (this._sourcesContents) map.sourcesContent = this._generateSourcesContent(map.sources, map.sourceRoot);
		return map;
	};
	/**
	* Render the source map being generated to a string.
	*/
	SourceMapGenerator.prototype.toString = function SourceMapGenerator_toString() {
		return JSON.stringify(this.toJSON());
	};
	exports.SourceMapGenerator = SourceMapGenerator;
})))();
const trackNodes = /* @__PURE__ */ new Set([
	"Atrule",
	"Selector",
	"Declaration"
]);
function generateSourceMap(handlers) {
	const map = new import_source_map_generator.SourceMapGenerator();
	const generated = {
		line: 1,
		column: 0
	};
	const original = {
		line: 0,
		column: 0
	};
	const activatedGenerated = {
		line: 1,
		column: 0
	};
	const activatedMapping = { generated: activatedGenerated };
	let line = 1;
	let column = 0;
	let sourceMappingActive = false;
	const origHandlersNode = handlers.node;
	handlers.node = function(node) {
		if (node.loc && node.loc.start && trackNodes.has(node.type)) {
			const nodeLine = node.loc.start.line;
			const nodeColumn = node.loc.start.column - 1;
			if (original.line !== nodeLine || original.column !== nodeColumn) {
				original.line = nodeLine;
				original.column = nodeColumn;
				generated.line = line;
				generated.column = column;
				if (sourceMappingActive) {
					sourceMappingActive = false;
					if (generated.line !== activatedGenerated.line || generated.column !== activatedGenerated.column) map.addMapping(activatedMapping);
				}
				sourceMappingActive = true;
				map.addMapping({
					source: node.loc.source,
					original,
					generated
				});
			}
		}
		origHandlersNode.call(this, node);
		if (sourceMappingActive && trackNodes.has(node.type)) {
			activatedGenerated.line = line;
			activatedGenerated.column = column;
		}
	};
	const origHandlersEmit = handlers.emit;
	handlers.emit = function(value, type, auto) {
		for (let i = 0; i < value.length; i++) if (value.charCodeAt(i) === 10) {
			line++;
			column = 0;
		} else column++;
		origHandlersEmit(value, type, auto);
	};
	const origHandlersResult = handlers.result;
	handlers.result = function() {
		if (sourceMappingActive) map.addMapping(activatedMapping);
		return {
			css: origHandlersResult(),
			map
		};
	};
	return handlers;
}
//#endregion
//#region node_modules/.pnpm/css-tree@3.2.1/node_modules/css-tree/lib/generator/token-before.js
var token_before_exports = /* @__PURE__ */ __exportAll({
	safe: () => safe,
	spec: () => spec
});
const PLUSSIGN$9 = 43;
const HYPHENMINUS$6 = 45;
const code = (type, value) => {
	if (type === 9) type = value;
	if (typeof type === "string") type = Math.min(type.charCodeAt(0), 128) << 6;
	return type << 1;
};
const specPairs = [
	[1, 1],
	[1, 2],
	[1, 7],
	[1, 8],
	[1, "-"],
	[1, 10],
	[1, 11],
	[1, 12],
	[1, 15],
	[1, 21],
	[3, 1],
	[3, 2],
	[3, 7],
	[3, 8],
	[3, "-"],
	[3, 10],
	[3, 11],
	[3, 12],
	[3, 15],
	[4, 1],
	[4, 2],
	[4, 7],
	[4, 8],
	[4, "-"],
	[4, 10],
	[4, 11],
	[4, 12],
	[4, 15],
	[12, 1],
	[12, 2],
	[12, 7],
	[12, 8],
	[12, "-"],
	[12, 10],
	[12, 11],
	[12, 12],
	[12, 15],
	["#", 1],
	["#", 2],
	["#", 7],
	["#", 8],
	["#", "-"],
	["#", 10],
	["#", 11],
	["#", 12],
	["#", 15],
	["-", 1],
	["-", 2],
	["-", 7],
	["-", 8],
	["-", "-"],
	["-", 10],
	["-", 11],
	["-", 12],
	["-", 15],
	[10, 1],
	[10, 2],
	[10, 7],
	[10, 8],
	[10, 10],
	[10, 11],
	[10, 12],
	[10, "%"],
	[10, 15],
	["@", 1],
	["@", 2],
	["@", 7],
	["@", 8],
	["@", "-"],
	["@", 15],
	[".", 10],
	[".", 11],
	[".", 12],
	["+", 10],
	["+", 11],
	["+", 12],
	["/", "*"]
];
const safePairs = specPairs.concat([
	[1, 4],
	[12, 4],
	[4, 4],
	[3, 21],
	[3, 5],
	[3, 16],
	[11, 11],
	[11, 12],
	[11, 2],
	[11, "-"],
	[22, 1],
	[22, 2],
	[22, 11],
	[22, 12],
	[22, 4],
	[22, "-"]
]);
function createMap(pairs) {
	const isWhiteSpaceRequired = new Set(pairs.map(([prev, next]) => code(prev) << 16 | code(next)));
	return function(prevCode, type, value) {
		const nextCode = code(type, value);
		const nextCharCode = value.charCodeAt(0);
		return nextCode | (nextCharCode === HYPHENMINUS$6 && type !== 1 && type !== 2 && type !== 15 || nextCharCode === PLUSSIGN$9 ? isWhiteSpaceRequired.has((prevCode & 65534) << 16 | nextCharCode << 7) : isWhiteSpaceRequired.has((prevCode & 65534) << 16 | nextCode));
	};
}
const spec = createMap(specPairs);
const safe = createMap(safePairs);
//#endregion
//#region node_modules/.pnpm/css-tree@3.2.1/node_modules/css-tree/lib/generator/create.js
const REVERSESOLIDUS = 92;
function processChildren(node, delimeter) {
	if (typeof delimeter === "function") {
		let prev = null;
		node.children.forEach((node) => {
			if (prev !== null) delimeter.call(this, prev);
			this.node(node);
			prev = node;
		});
		return;
	}
	node.children.forEach(this.node, this);
}
function createGenerator(config) {
	const types = /* @__PURE__ */ new Map();
	for (let [name, item] of Object.entries(config.node)) if (typeof (item.generate || item) === "function") types.set(name, item.generate || item);
	return function(node, options) {
		let buffer = "";
		let prevCode = 0;
		let handlers = {
			node(node) {
				if (types.has(node.type)) types.get(node.type).call(publicApi, node);
				else throw new Error("Unknown node type: " + node.type);
			},
			tokenBefore: safe,
			token(type, value, suppressAutoWhiteSpace) {
				prevCode = this.tokenBefore(prevCode, type, value);
				if (!suppressAutoWhiteSpace && prevCode & 1) this.emit(" ", 13, true);
				this.emit(value, type, false);
				if (type === 9 && value.charCodeAt(0) === REVERSESOLIDUS) this.emit("\n", 13, true);
			},
			emit(value) {
				buffer += value;
			},
			result() {
				return buffer;
			}
		};
		if (options) {
			if (typeof options.decorator === "function") handlers = options.decorator(handlers);
			if (options.sourceMap) handlers = generateSourceMap(handlers);
			if (options.mode in token_before_exports) handlers.tokenBefore = token_before_exports[options.mode];
		}
		const publicApi = {
			node: (node) => handlers.node(node),
			children: processChildren,
			token: (type, value) => handlers.token(type, value),
			tokenize: (raw) => tokenize$2(raw, (type, start, end) => {
				handlers.token(type, raw.slice(start, end), start !== 0);
			})
		};
		handlers.node(node);
		return handlers.result();
	};
}
//#endregion
//#region node_modules/.pnpm/css-tree@3.2.1/node_modules/css-tree/lib/convertor/create.js
function createConvertor(walk) {
	return {
		fromPlainObject(ast) {
			walk(ast, { enter(node) {
				if (node.children && node.children instanceof List === false) node.children = new List().fromArray(node.children);
			} });
			return ast;
		},
		toPlainObject(ast) {
			walk(ast, { leave(node) {
				if (node.children && node.children instanceof List) node.children = node.children.toArray();
			} });
			return ast;
		}
	};
}
//#endregion
//#region node_modules/.pnpm/css-tree@3.2.1/node_modules/css-tree/lib/walker/create.js
const { hasOwnProperty: hasOwnProperty$3 } = Object.prototype;
const noop$2 = function() {};
function ensureFunction$1(value) {
	return typeof value === "function" ? value : noop$2;
}
function invokeForType(fn, type) {
	return function(node, item, list) {
		if (node.type === type) fn.call(this, node, item, list);
	};
}
function getWalkersFromStructure(name, nodeType) {
	const structure = nodeType.structure;
	const walkers = [];
	for (const key in structure) {
		if (hasOwnProperty$3.call(structure, key) === false) continue;
		let fieldTypes = structure[key];
		const walker = {
			name: key,
			type: false,
			nullable: false
		};
		if (!Array.isArray(fieldTypes)) fieldTypes = [fieldTypes];
		for (const fieldType of fieldTypes) if (fieldType === null) walker.nullable = true;
		else if (typeof fieldType === "string") walker.type = "node";
		else if (Array.isArray(fieldType)) walker.type = "list";
		if (walker.type) walkers.push(walker);
	}
	if (walkers.length) return {
		context: nodeType.walkContext,
		fields: walkers
	};
	return null;
}
function getTypesFromConfig(config) {
	const types = {};
	for (const name in config.node) if (hasOwnProperty$3.call(config.node, name)) {
		const nodeType = config.node[name];
		if (!nodeType.structure) throw new Error("Missed `structure` field in `" + name + "` node type definition");
		types[name] = getWalkersFromStructure(name, nodeType);
	}
	return types;
}
function createTypeIterator(config, reverse) {
	const fields = config.fields.slice();
	const contextName = config.context;
	const useContext = typeof contextName === "string";
	if (reverse) fields.reverse();
	return function(node, context, walk, walkReducer) {
		let prevContextValue;
		if (useContext) {
			prevContextValue = context[contextName];
			context[contextName] = node;
		}
		for (const field of fields) {
			const ref = node[field.name];
			if (!field.nullable || ref) {
				if (field.type === "list") {
					if (reverse ? ref.reduceRight(walkReducer, false) : ref.reduce(walkReducer, false)) return true;
				} else if (walk(ref)) return true;
			}
		}
		if (useContext) context[contextName] = prevContextValue;
	};
}
function createFastTraveralMap({ StyleSheet, Atrule, Rule, Block, DeclarationList }) {
	return {
		Atrule: {
			StyleSheet,
			Atrule,
			Rule,
			Block
		},
		Rule: {
			StyleSheet,
			Atrule,
			Rule,
			Block
		},
		Declaration: {
			StyleSheet,
			Atrule,
			Rule,
			Block,
			DeclarationList
		}
	};
}
function createWalker(config) {
	const types = getTypesFromConfig(config);
	const iteratorsNatural = {};
	const iteratorsReverse = {};
	const breakWalk = Symbol("break-walk");
	const skipNode = Symbol("skip-node");
	for (const name in types) if (hasOwnProperty$3.call(types, name) && types[name] !== null) {
		iteratorsNatural[name] = createTypeIterator(types[name], false);
		iteratorsReverse[name] = createTypeIterator(types[name], true);
	}
	const fastTraversalIteratorsNatural = createFastTraveralMap(iteratorsNatural);
	const fastTraversalIteratorsReverse = createFastTraveralMap(iteratorsReverse);
	const walk = function(root, options) {
		function walkNode(node, item, list) {
			const enterRet = enter.call(context, node, item, list);
			if (enterRet === breakWalk) return true;
			if (enterRet === skipNode) return false;
			if (iterators.hasOwnProperty(node.type)) {
				if (iterators[node.type](node, context, walkNode, walkReducer)) return true;
			}
			if (leave.call(context, node, item, list) === breakWalk) return true;
			return false;
		}
		let enter = noop$2;
		let leave = noop$2;
		let iterators = iteratorsNatural;
		let walkReducer = (ret, data, item, list) => ret || walkNode(data, item, list);
		const context = {
			break: breakWalk,
			skip: skipNode,
			root,
			stylesheet: null,
			atrule: null,
			atrulePrelude: null,
			rule: null,
			selector: null,
			block: null,
			declaration: null,
			function: null
		};
		if (typeof options === "function") enter = options;
		else if (options) {
			enter = ensureFunction$1(options.enter);
			leave = ensureFunction$1(options.leave);
			if (options.reverse) iterators = iteratorsReverse;
			if (options.visit) {
				if (fastTraversalIteratorsNatural.hasOwnProperty(options.visit)) iterators = options.reverse ? fastTraversalIteratorsReverse[options.visit] : fastTraversalIteratorsNatural[options.visit];
				else if (!types.hasOwnProperty(options.visit)) throw new Error("Bad value `" + options.visit + "` for `visit` option (should be: " + Object.keys(types).sort().join(", ") + ")");
				enter = invokeForType(enter, options.visit);
				leave = invokeForType(leave, options.visit);
			}
		}
		if (enter === noop$2 && leave === noop$2) throw new Error("Neither `enter` nor `leave` walker handler is set or both aren't a function");
		walkNode(root);
	};
	walk.break = breakWalk;
	walk.skip = skipNode;
	walk.find = function(ast, fn) {
		let found = null;
		walk(ast, function(node, item, list) {
			if (fn.call(this, node, item, list)) {
				found = node;
				return breakWalk;
			}
		});
		return found;
	};
	walk.findLast = function(ast, fn) {
		let found = null;
		walk(ast, {
			reverse: true,
			enter(node, item, list) {
				if (fn.call(this, node, item, list)) {
					found = node;
					return breakWalk;
				}
			}
		});
		return found;
	};
	walk.findAll = function(ast, fn) {
		const found = [];
		walk(ast, function(node, item, list) {
			if (fn.call(this, node, item, list)) found.push(node);
		});
		return found;
	};
	return walk;
}
//#endregion
//#region node_modules/.pnpm/css-tree@3.2.1/node_modules/css-tree/lib/definition-syntax/generate.js
function noop$1(value) {
	return value;
}
function generateMultiplier(multiplier) {
	const { min, max, comma } = multiplier;
	if (min === 0 && max === 0) return comma ? "#?" : "*";
	if (min === 0 && max === 1) return "?";
	if (min === 1 && max === 0) return comma ? "#" : "+";
	if (min === 1 && max === 1) return "";
	return (comma ? "#" : "") + (min === max ? "{" + min + "}" : "{" + min + "," + (max !== 0 ? max : "") + "}");
}
function generateTypeOpts(node) {
	switch (node.type) {
		case "Range": return " [" + (node.min === null ? "-∞" : node.min) + "," + (node.max === null ? "∞" : node.max) + "]";
		default: throw new Error("Unknown node type `" + node.type + "`");
	}
}
function generateSequence(node, decorate, forceBraces, compact) {
	const combinator = node.combinator === " " || compact ? node.combinator : " " + node.combinator + " ";
	const result = node.terms.map((term) => internalGenerate(term, decorate, forceBraces, compact)).join(combinator);
	if (node.explicit || forceBraces) return (compact || result[0] === "," ? "[" : "[ ") + result + (compact ? "]" : " ]");
	return result;
}
function internalGenerate(node, decorate, forceBraces, compact) {
	let result;
	switch (node.type) {
		case "Group":
			result = generateSequence(node, decorate, forceBraces, compact) + (node.disallowEmpty ? "!" : "");
			break;
		case "Multiplier": return internalGenerate(node.term, decorate, forceBraces, compact) + decorate(generateMultiplier(node), node);
		case "Boolean":
			result = "<boolean-expr[" + internalGenerate(node.term, decorate, forceBraces, compact) + "]>";
			break;
		case "Type":
			result = "<" + node.name + (node.opts ? decorate(generateTypeOpts(node.opts), node.opts) : "") + ">";
			break;
		case "Property":
			result = "<'" + node.name + "'>";
			break;
		case "Keyword":
			result = node.name;
			break;
		case "AtKeyword":
			result = "@" + node.name;
			break;
		case "Function":
			result = node.name + "(";
			break;
		case "String":
		case "Token":
			result = node.value;
			break;
		case "Comma":
			result = ",";
			break;
		default: throw new Error("Unknown node type `" + node.type + "`");
	}
	return decorate(result, node);
}
function generate$50(node, options) {
	let decorate = noop$1;
	let forceBraces = false;
	let compact = false;
	if (typeof options === "function") decorate = options;
	else if (options) {
		forceBraces = Boolean(options.forceBraces);
		compact = Boolean(options.compact);
		if (typeof options.decorate === "function") decorate = options.decorate;
	}
	return internalGenerate(node, decorate, forceBraces, compact);
}
//#endregion
//#region node_modules/.pnpm/css-tree@3.2.1/node_modules/css-tree/lib/lexer/error.js
const defaultLoc = {
	offset: 0,
	line: 1,
	column: 1
};
function locateMismatch(matchResult, node) {
	const tokens = matchResult.tokens;
	const longestMatch = matchResult.longestMatch;
	const mismatchNode = longestMatch < tokens.length ? tokens[longestMatch].node || null : null;
	const badNode = mismatchNode !== node ? mismatchNode : null;
	let mismatchOffset = 0;
	let mismatchLength = 0;
	let entries = 0;
	let css = "";
	let start;
	let end;
	for (let i = 0; i < tokens.length; i++) {
		const token = tokens[i].value;
		if (i === longestMatch) {
			mismatchLength = token.length;
			mismatchOffset = css.length;
		}
		if (badNode !== null && tokens[i].node === badNode) {
			if (i <= longestMatch) entries++;
			else entries = 0;
		}
		css += token;
	}
	if (longestMatch === tokens.length || entries > 1) {
		start = fromLoc(badNode || node, "end") || buildLoc(defaultLoc, css);
		end = buildLoc(start);
	} else {
		start = fromLoc(badNode, "start") || buildLoc(fromLoc(node, "start") || defaultLoc, css.slice(0, mismatchOffset));
		end = fromLoc(badNode, "end") || buildLoc(start, css.substr(mismatchOffset, mismatchLength));
	}
	return {
		css,
		mismatchOffset,
		mismatchLength,
		start,
		end
	};
}
function fromLoc(node, point) {
	const value = node && node.loc && node.loc[point];
	if (value) return "line" in value ? buildLoc(value) : value;
	return null;
}
function buildLoc({ offset, line, column }, extra) {
	const loc = {
		offset,
		line,
		column
	};
	if (extra) {
		const lines = extra.split(/\n|\r\n?|\f/);
		loc.offset += extra.length;
		loc.line += lines.length - 1;
		loc.column = lines.length === 1 ? loc.column + extra.length : lines.pop().length + 1;
	}
	return loc;
}
const SyntaxReferenceError = function(type, referenceName) {
	const error = createCustomError("SyntaxReferenceError", type + (referenceName ? " `" + referenceName + "`" : ""));
	error.reference = referenceName;
	return error;
};
const SyntaxMatchError = function(message, syntax, node, matchResult) {
	const error = createCustomError("SyntaxMatchError", message);
	const { css, mismatchOffset, mismatchLength, start, end } = locateMismatch(matchResult, node);
	error.rawMessage = message;
	error.syntax = syntax ? generate$50(syntax) : "<generic>";
	error.css = css;
	error.mismatchOffset = mismatchOffset;
	error.mismatchLength = mismatchLength;
	error.message = message + "\n  syntax: " + error.syntax + "\n   value: " + (css || "<empty string>") + "\n  --------" + new Array(error.mismatchOffset + 1).join("-") + "^";
	Object.assign(error, start);
	error.loc = {
		source: node && node.loc && node.loc.source || "<unknown>",
		start,
		end
	};
	return error;
};
//#endregion
//#region node_modules/.pnpm/css-tree@3.2.1/node_modules/css-tree/lib/utils/names.js
const keywords = /* @__PURE__ */ new Map();
const properties = /* @__PURE__ */ new Map();
const HYPHENMINUS$5 = 45;
const keyword = getKeywordDescriptor;
const property = getPropertyDescriptor;
function isCustomProperty(str, offset) {
	offset = offset || 0;
	return str.length - offset >= 2 && str.charCodeAt(offset) === HYPHENMINUS$5 && str.charCodeAt(offset + 1) === HYPHENMINUS$5;
}
function getVendorPrefix(str, offset) {
	offset = offset || 0;
	if (str.length - offset >= 3) {
		if (str.charCodeAt(offset) === HYPHENMINUS$5 && str.charCodeAt(offset + 1) !== HYPHENMINUS$5) {
			const secondDashIndex = str.indexOf("-", offset + 2);
			if (secondDashIndex !== -1) return str.substring(offset, secondDashIndex + 1);
		}
	}
	return "";
}
function getKeywordDescriptor(keyword) {
	if (keywords.has(keyword)) return keywords.get(keyword);
	const name = keyword.toLowerCase();
	let descriptor = keywords.get(name);
	if (descriptor === void 0) {
		const custom = isCustomProperty(name, 0);
		const vendor = !custom ? getVendorPrefix(name, 0) : "";
		descriptor = Object.freeze({
			basename: name.substr(vendor.length),
			name,
			prefix: vendor,
			vendor,
			custom
		});
	}
	keywords.set(keyword, descriptor);
	return descriptor;
}
function getPropertyDescriptor(property) {
	if (properties.has(property)) return properties.get(property);
	let name = property;
	let hack = property[0];
	if (hack === "/") hack = property[1] === "/" ? "//" : "/";
	else if (hack !== "_" && hack !== "*" && hack !== "$" && hack !== "#" && hack !== "+" && hack !== "&") hack = "";
	const custom = isCustomProperty(name, hack.length);
	if (!custom) {
		name = name.toLowerCase();
		if (properties.has(name)) {
			const descriptor = properties.get(name);
			properties.set(property, descriptor);
			return descriptor;
		}
	}
	const vendor = !custom ? getVendorPrefix(name, hack.length) : "";
	const prefix = name.substr(0, hack.length + vendor.length);
	const descriptor = Object.freeze({
		basename: name.substr(prefix.length),
		name: name.substr(hack.length),
		hack,
		vendor,
		prefix,
		custom
	});
	properties.set(property, descriptor);
	return descriptor;
}
//#endregion
//#region node_modules/.pnpm/css-tree@3.2.1/node_modules/css-tree/lib/lexer/generic-const.js
const cssWideKeywords = [
	"initial",
	"inherit",
	"unset",
	"revert",
	"revert-layer"
];
//#endregion
//#region node_modules/.pnpm/css-tree@3.2.1/node_modules/css-tree/lib/lexer/generic-an-plus-b.js
const PLUSSIGN$8 = 43;
const HYPHENMINUS$4 = 45;
const N$3 = 110;
const DISALLOW_SIGN$1 = true;
const ALLOW_SIGN$1 = false;
function isDelim$1(token, code) {
	return token !== null && token.type === 9 && token.value.charCodeAt(0) === code;
}
function skipSC(token, offset, getNextToken) {
	while (token !== null && (token.type === 13 || token.type === 25)) token = getNextToken(++offset);
	return offset;
}
function checkInteger$1(token, valueOffset, disallowSign, offset) {
	if (!token) return 0;
	const code = token.value.charCodeAt(valueOffset);
	if (code === PLUSSIGN$8 || code === HYPHENMINUS$4) {
		if (disallowSign) return 0;
		valueOffset++;
	}
	for (; valueOffset < token.value.length; valueOffset++) if (!isDigit(token.value.charCodeAt(valueOffset))) return 0;
	return offset + 1;
}
function consumeB$1(token, offset_, getNextToken) {
	let sign = false;
	let offset = skipSC(token, offset_, getNextToken);
	token = getNextToken(offset);
	if (token === null) return offset_;
	if (token.type !== 10) {
		if (isDelim$1(token, PLUSSIGN$8) || isDelim$1(token, HYPHENMINUS$4)) {
			sign = true;
			offset = skipSC(getNextToken(++offset), offset, getNextToken);
			token = getNextToken(offset);
			if (token === null || token.type !== 10) return 0;
		} else return offset_;
	}
	if (!sign) {
		const code = token.value.charCodeAt(0);
		if (code !== PLUSSIGN$8 && code !== HYPHENMINUS$4) return 0;
	}
	return checkInteger$1(token, sign ? 0 : 1, sign, offset);
}
function anPlusB(token, getNextToken) {
	let offset = 0;
	if (!token) return 0;
	if (token.type === 10) return checkInteger$1(token, 0, ALLOW_SIGN$1, offset);
	else if (token.type === 1 && token.value.charCodeAt(0) === HYPHENMINUS$4) {
		if (!cmpChar(token.value, 1, N$3)) return 0;
		switch (token.value.length) {
			case 2: return consumeB$1(getNextToken(++offset), offset, getNextToken);
			case 3:
				if (token.value.charCodeAt(2) !== HYPHENMINUS$4) return 0;
				offset = skipSC(getNextToken(++offset), offset, getNextToken);
				token = getNextToken(offset);
				return checkInteger$1(token, 0, DISALLOW_SIGN$1, offset);
			default:
				if (token.value.charCodeAt(2) !== HYPHENMINUS$4) return 0;
				return checkInteger$1(token, 3, DISALLOW_SIGN$1, offset);
		}
	} else if (token.type === 1 || isDelim$1(token, PLUSSIGN$8) && getNextToken(offset + 1).type === 1) {
		if (token.type !== 1) token = getNextToken(++offset);
		if (token === null || !cmpChar(token.value, 0, N$3)) return 0;
		switch (token.value.length) {
			case 1: return consumeB$1(getNextToken(++offset), offset, getNextToken);
			case 2:
				if (token.value.charCodeAt(1) !== HYPHENMINUS$4) return 0;
				offset = skipSC(getNextToken(++offset), offset, getNextToken);
				token = getNextToken(offset);
				return checkInteger$1(token, 0, DISALLOW_SIGN$1, offset);
			default:
				if (token.value.charCodeAt(1) !== HYPHENMINUS$4) return 0;
				return checkInteger$1(token, 2, DISALLOW_SIGN$1, offset);
		}
	} else if (token.type === 12) {
		let code = token.value.charCodeAt(0);
		let sign = code === PLUSSIGN$8 || code === HYPHENMINUS$4 ? 1 : 0;
		let i = sign;
		for (; i < token.value.length; i++) if (!isDigit(token.value.charCodeAt(i))) break;
		if (i === sign) return 0;
		if (!cmpChar(token.value, i, N$3)) return 0;
		if (i + 1 === token.value.length) return consumeB$1(getNextToken(++offset), offset, getNextToken);
		else {
			if (token.value.charCodeAt(i + 1) !== HYPHENMINUS$4) return 0;
			if (i + 2 === token.value.length) {
				offset = skipSC(getNextToken(++offset), offset, getNextToken);
				token = getNextToken(offset);
				return checkInteger$1(token, 0, DISALLOW_SIGN$1, offset);
			} else return checkInteger$1(token, i + 2, DISALLOW_SIGN$1, offset);
		}
	}
	return 0;
}
//#endregion
//#region node_modules/.pnpm/css-tree@3.2.1/node_modules/css-tree/lib/lexer/generic-urange.js
const PLUSSIGN$7 = 43;
const HYPHENMINUS$3 = 45;
const QUESTIONMARK$2 = 63;
const U$1 = 117;
function isDelim(token, code) {
	return token !== null && token.type === 9 && token.value.charCodeAt(0) === code;
}
function startsWith$1(token, code) {
	return token.value.charCodeAt(0) === code;
}
function hexSequence(token, offset, allowDash) {
	let hexlen = 0;
	for (let pos = offset; pos < token.value.length; pos++) {
		const code = token.value.charCodeAt(pos);
		if (code === HYPHENMINUS$3 && allowDash && hexlen !== 0) {
			hexSequence(token, offset + hexlen + 1, false);
			return 6;
		}
		if (!isHexDigit(code)) return 0;
		if (++hexlen > 6) return 0;
	}
	return hexlen;
}
function withQuestionMarkSequence(consumed, length, getNextToken) {
	if (!consumed) return 0;
	while (isDelim(getNextToken(length), QUESTIONMARK$2)) {
		if (++consumed > 6) return 0;
		length++;
	}
	return length;
}
function urange(token, getNextToken) {
	let length = 0;
	if (token === null || token.type !== 1 || !cmpChar(token.value, 0, U$1)) return 0;
	token = getNextToken(++length);
	if (token === null) return 0;
	if (isDelim(token, PLUSSIGN$7)) {
		token = getNextToken(++length);
		if (token === null) return 0;
		if (token.type === 1) return withQuestionMarkSequence(hexSequence(token, 0, true), ++length, getNextToken);
		if (isDelim(token, QUESTIONMARK$2)) return withQuestionMarkSequence(1, ++length, getNextToken);
		return 0;
	}
	if (token.type === 10) {
		const consumedHexLength = hexSequence(token, 1, true);
		if (consumedHexLength === 0) return 0;
		token = getNextToken(++length);
		if (token === null) return length;
		if (token.type === 12 || token.type === 10) {
			if (!startsWith$1(token, HYPHENMINUS$3) || !hexSequence(token, 1, false)) return 0;
			return length + 1;
		}
		return withQuestionMarkSequence(consumedHexLength, length, getNextToken);
	}
	if (token.type === 12) return withQuestionMarkSequence(hexSequence(token, 1, true), ++length, getNextToken);
	return 0;
}
//#endregion
//#region node_modules/.pnpm/css-tree@3.2.1/node_modules/css-tree/lib/lexer/generic.js
const calcFunctionNames = [
	"calc(",
	"-moz-calc(",
	"-webkit-calc("
];
const comparisonFunctionNames = [
	"min(",
	"max(",
	"clamp("
];
const steppedValueFunctionNames = [
	"round(",
	"mod(",
	"rem("
];
const trigNumberFunctionNames = [
	"sin(",
	"cos(",
	"tan("
];
const trigAngleFunctionNames = [
	"asin(",
	"acos(",
	"atan(",
	"atan2("
];
const otherNumberFunctionNames = [
	"pow(",
	"sqrt(",
	"log(",
	"exp(",
	"sign("
];
const expNumberDimensionPercentageFunctionNames = ["hypot("];
const signFunctionNames = ["abs("];
const numberFunctionNames = [
	...calcFunctionNames,
	...comparisonFunctionNames,
	...steppedValueFunctionNames,
	...trigNumberFunctionNames,
	...otherNumberFunctionNames,
	...expNumberDimensionPercentageFunctionNames,
	...signFunctionNames
];
const percentageFunctionNames = [
	...calcFunctionNames,
	...comparisonFunctionNames,
	...steppedValueFunctionNames,
	...expNumberDimensionPercentageFunctionNames,
	...signFunctionNames
];
const dimensionFunctionNames = [
	...calcFunctionNames,
	...comparisonFunctionNames,
	...steppedValueFunctionNames,
	...trigAngleFunctionNames,
	...expNumberDimensionPercentageFunctionNames,
	...signFunctionNames
];
const balancePair = /* @__PURE__ */ new Map([
	[2, 22],
	[21, 22],
	[19, 20],
	[23, 24]
]);
function charCodeAt(str, index) {
	return index < str.length ? str.charCodeAt(index) : 0;
}
function eqStr(actual, expected) {
	return cmpStr(actual, 0, actual.length, expected);
}
function eqStrAny(actual, expected) {
	for (let i = 0; i < expected.length; i++) if (eqStr(actual, expected[i])) return true;
	return false;
}
function isPostfixIeHack(str, offset) {
	if (offset !== str.length - 2) return false;
	return charCodeAt(str, offset) === 92 && isDigit(charCodeAt(str, offset + 1));
}
function outOfRange(opts, value, numEnd) {
	if (opts && opts.type === "Range") {
		const num = Number(numEnd !== void 0 && numEnd !== value.length ? value.substr(0, numEnd) : value);
		if (isNaN(num)) return true;
		if (opts.min !== null && num < opts.min && typeof opts.min !== "string") return true;
		if (opts.max !== null && num > opts.max && typeof opts.max !== "string") return true;
	}
	return false;
}
function consumeFunction(token, getNextToken) {
	let balanceCloseType = 0;
	let balanceStash = [];
	let length = 0;
	scan: do {
		switch (token.type) {
			case 24:
			case 22:
			case 20:
				if (token.type !== balanceCloseType) break scan;
				balanceCloseType = balanceStash.pop();
				if (balanceStash.length === 0) {
					length++;
					break scan;
				}
				break;
			case 2:
			case 21:
			case 19:
			case 23:
				balanceStash.push(balanceCloseType);
				balanceCloseType = balancePair.get(token.type);
		}
		length++;
	} while (token = getNextToken(length));
	return length;
}
function math(next, functionNames) {
	return function(token, getNextToken, opts) {
		if (token === null) return 0;
		if (token.type === 2 && eqStrAny(token.value, functionNames)) return consumeFunction(token, getNextToken);
		return next(token, getNextToken, opts);
	};
}
function tokenType(expectedTokenType) {
	return function(token) {
		if (token === null || token.type !== expectedTokenType) return 0;
		return 1;
	};
}
function customIdent(token) {
	if (token === null || token.type !== 1) return 0;
	const name = token.value.toLowerCase();
	if (eqStrAny(name, cssWideKeywords)) return 0;
	if (eqStr(name, "default")) return 0;
	return 1;
}
function dashedIdent(token) {
	if (token === null || token.type !== 1) return 0;
	if (charCodeAt(token.value, 0) !== 45 || charCodeAt(token.value, 1) !== 45) return 0;
	return 1;
}
function customPropertyName(token) {
	if (!dashedIdent(token)) return 0;
	if (token.value === "--") return 0;
	return 1;
}
function hexColor(token) {
	if (token === null || token.type !== 4) return 0;
	const length = token.value.length;
	if (length !== 4 && length !== 5 && length !== 7 && length !== 9) return 0;
	for (let i = 1; i < length; i++) if (!isHexDigit(charCodeAt(token.value, i))) return 0;
	return 1;
}
function idSelector(token) {
	if (token === null || token.type !== 4) return 0;
	if (!isIdentifierStart(charCodeAt(token.value, 1), charCodeAt(token.value, 2), charCodeAt(token.value, 3))) return 0;
	return 1;
}
function declarationValue(token, getNextToken) {
	if (!token) return 0;
	let balanceCloseType = 0;
	let balanceStash = [];
	let length = 0;
	scan: do {
		switch (token.type) {
			case 6:
			case 8: break scan;
			case 24:
			case 22:
			case 20:
				if (token.type !== balanceCloseType) break scan;
				balanceCloseType = balanceStash.pop();
				break;
			case 17:
				if (balanceCloseType === 0) break scan;
				break;
			case 9:
				if (balanceCloseType === 0 && token.value === "!") break scan;
				break;
			case 2:
			case 21:
			case 19:
			case 23:
				balanceStash.push(balanceCloseType);
				balanceCloseType = balancePair.get(token.type);
		}
		length++;
	} while (token = getNextToken(length));
	return length;
}
function anyValue(token, getNextToken) {
	if (!token) return 0;
	let balanceCloseType = 0;
	let balanceStash = [];
	let length = 0;
	scan: do {
		switch (token.type) {
			case 6:
			case 8: break scan;
			case 24:
			case 22:
			case 20:
				if (token.type !== balanceCloseType) break scan;
				balanceCloseType = balanceStash.pop();
				break;
			case 2:
			case 21:
			case 19:
			case 23:
				balanceStash.push(balanceCloseType);
				balanceCloseType = balancePair.get(token.type);
		}
		length++;
	} while (token = getNextToken(length));
	return length;
}
function dimension(type) {
	if (type) type = new Set(type);
	return function(token, getNextToken, opts) {
		if (token === null || token.type !== 12) return 0;
		const numberEnd = consumeNumber(token.value, 0);
		if (type !== null) {
			const reverseSolidusOffset = token.value.indexOf("\\", numberEnd);
			const unit = reverseSolidusOffset === -1 || !isPostfixIeHack(token.value, reverseSolidusOffset) ? token.value.substr(numberEnd) : token.value.substring(numberEnd, reverseSolidusOffset);
			if (type.has(unit.toLowerCase()) === false) return 0;
		}
		if (outOfRange(opts, token.value, numberEnd)) return 0;
		return 1;
	};
}
function percentage(token, getNextToken, opts) {
	if (token === null || token.type !== 11) return 0;
	if (outOfRange(opts, token.value, token.value.length - 1)) return 0;
	return 1;
}
function zero(next) {
	if (typeof next !== "function") next = function() {
		return 0;
	};
	return function(token, getNextToken, opts) {
		if (token !== null && token.type === 10) {
			if (Number(token.value) === 0) return 1;
		}
		return next(token, getNextToken, opts);
	};
}
function number(token, getNextToken, opts) {
	if (token === null) return 0;
	const numberEnd = consumeNumber(token.value, 0);
	if (!(numberEnd === token.value.length) && !isPostfixIeHack(token.value, numberEnd)) return 0;
	if (outOfRange(opts, token.value, numberEnd)) return 0;
	return 1;
}
function integer(token, getNextToken, opts) {
	if (token === null || token.type !== 10) return 0;
	let i = charCodeAt(token.value, 0) === 43 || charCodeAt(token.value, 0) === 45 ? 1 : 0;
	for (; i < token.value.length; i++) if (!isDigit(charCodeAt(token.value, i))) return 0;
	if (outOfRange(opts, token.value, i)) return 0;
	return 1;
}
const tokenTypes = {
	"ident-token": tokenType(1),
	"function-token": tokenType(2),
	"at-keyword-token": tokenType(3),
	"hash-token": tokenType(4),
	"string-token": tokenType(5),
	"bad-string-token": tokenType(6),
	"url-token": tokenType(7),
	"bad-url-token": tokenType(8),
	"delim-token": tokenType(9),
	"number-token": tokenType(10),
	"percentage-token": tokenType(11),
	"dimension-token": tokenType(12),
	"whitespace-token": tokenType(13),
	"CDO-token": tokenType(14),
	"CDC-token": tokenType(15),
	"colon-token": tokenType(16),
	"semicolon-token": tokenType(17),
	"comma-token": tokenType(18),
	"[-token": tokenType(19),
	"]-token": tokenType(20),
	"(-token": tokenType(21),
	")-token": tokenType(22),
	"{-token": tokenType(23),
	"}-token": tokenType(24)
};
const productionTypes = {
	"string": tokenType(5),
	"ident": tokenType(1),
	"percentage": math(percentage, percentageFunctionNames),
	"zero": zero(),
	"number": math(number, numberFunctionNames),
	"integer": math(integer, numberFunctionNames),
	"custom-ident": customIdent,
	"dashed-ident": dashedIdent,
	"custom-property-name": customPropertyName,
	"hex-color": hexColor,
	"id-selector": idSelector,
	"an-plus-b": anPlusB,
	"urange": urange,
	"declaration-value": declarationValue,
	"any-value": anyValue
};
const unitGroups = [
	"length",
	"angle",
	"time",
	"frequency",
	"resolution",
	"flex",
	"decibel",
	"semitones"
];
function createDemensionTypes(units) {
	const { angle, decibel, frequency, flex, length, resolution, semitones, time } = units || {};
	return {
		"dimension": math(dimension(null), dimensionFunctionNames),
		"angle": math(dimension(angle), dimensionFunctionNames),
		"decibel": math(dimension(decibel), dimensionFunctionNames),
		"frequency": math(dimension(frequency), dimensionFunctionNames),
		"flex": math(dimension(flex), dimensionFunctionNames),
		"length": math(zero(dimension(length)), dimensionFunctionNames),
		"resolution": math(dimension(resolution), dimensionFunctionNames),
		"semitones": math(dimension(semitones), dimensionFunctionNames),
		"time": math(dimension(time), dimensionFunctionNames)
	};
}
function createAttrUnit(units) {
	const unitSet = /* @__PURE__ */ new Set();
	for (const group of unitGroups) if (Array.isArray(units[group])) for (const unit of units[group]) unitSet.add(unit.toLowerCase());
	return function attrUnit(token) {
		if (token === null) return 0;
		if (token.type === 9 && token.value === "%") return 1;
		if (token.type === 1 && unitSet.has(token.value.toLowerCase())) return 1;
		return 0;
	};
}
function createGenericTypes(units) {
	return {
		...tokenTypes,
		...productionTypes,
		...createDemensionTypes(units),
		"attr-unit": createAttrUnit(units)
	};
}
//#endregion
//#region node_modules/.pnpm/css-tree@3.2.1/node_modules/css-tree/lib/lexer/units.js
var units_exports = /* @__PURE__ */ __exportAll({
	angle: () => angle,
	decibel: () => decibel,
	flex: () => flex,
	frequency: () => frequency,
	length: () => length,
	resolution: () => resolution,
	semitones: () => semitones,
	time: () => time
});
const length = [
	"cm",
	"mm",
	"q",
	"in",
	"pt",
	"pc",
	"px",
	"em",
	"rem",
	"ex",
	"rex",
	"cap",
	"rcap",
	"ch",
	"rch",
	"ic",
	"ric",
	"lh",
	"rlh",
	"vw",
	"svw",
	"lvw",
	"dvw",
	"vh",
	"svh",
	"lvh",
	"dvh",
	"vi",
	"svi",
	"lvi",
	"dvi",
	"vb",
	"svb",
	"lvb",
	"dvb",
	"vmin",
	"svmin",
	"lvmin",
	"dvmin",
	"vmax",
	"svmax",
	"lvmax",
	"dvmax",
	"cqw",
	"cqh",
	"cqi",
	"cqb",
	"cqmin",
	"cqmax"
];
const angle = [
	"deg",
	"grad",
	"rad",
	"turn"
];
const time = ["s", "ms"];
const frequency = ["hz", "khz"];
const resolution = [
	"dpi",
	"dpcm",
	"dppx",
	"x"
];
const flex = ["fr"];
const decibel = ["db"];
const semitones = ["st"];
//#endregion
//#region node_modules/.pnpm/css-tree@3.2.1/node_modules/css-tree/lib/definition-syntax/SyntaxError.js
function SyntaxError$1(message, input, offset) {
	return Object.assign(createCustomError("SyntaxError", message), {
		input,
		offset,
		rawMessage: message,
		message: message + "\n  " + input + "\n--" + new Array((offset || input.length) + 1).join("-") + "^"
	});
}
//#endregion
//#region node_modules/.pnpm/css-tree@3.2.1/node_modules/css-tree/lib/definition-syntax/scanner.js
const TAB$1 = 9;
const N$2 = 10;
const F$1 = 12;
const R$1 = 13;
const SPACE$3 = 32;
const NAME_CHAR = (/* @__PURE__ */ new Uint8Array(128)).map((_, idx) => /[a-zA-Z0-9\-]/.test(String.fromCharCode(idx)) ? 1 : 0);
var Scanner = class {
	constructor(str) {
		this.str = str;
		this.pos = 0;
	}
	charCodeAt(pos) {
		return pos < this.str.length ? this.str.charCodeAt(pos) : 0;
	}
	charCode() {
		return this.charCodeAt(this.pos);
	}
	isNameCharCode(code = this.charCode()) {
		return code < 128 && NAME_CHAR[code] === 1;
	}
	nextCharCode() {
		return this.charCodeAt(this.pos + 1);
	}
	nextNonWsCode(pos) {
		return this.charCodeAt(this.findWsEnd(pos));
	}
	skipWs() {
		this.pos = this.findWsEnd(this.pos);
	}
	findWsEnd(pos) {
		for (; pos < this.str.length; pos++) {
			const code = this.str.charCodeAt(pos);
			if (code !== R$1 && code !== N$2 && code !== F$1 && code !== SPACE$3 && code !== TAB$1) break;
		}
		return pos;
	}
	substringToPos(end) {
		return this.str.substring(this.pos, this.pos = end);
	}
	eat(code) {
		if (this.charCode() !== code) this.error("Expect `" + String.fromCharCode(code) + "`");
		this.pos++;
	}
	peek() {
		return this.pos < this.str.length ? this.str.charAt(this.pos++) : "";
	}
	error(message) {
		throw new SyntaxError$1(message, this.str, this.pos);
	}
	scanSpaces() {
		return this.substringToPos(this.findWsEnd(this.pos));
	}
	scanWord() {
		let end = this.pos;
		for (; end < this.str.length; end++) {
			const code = this.str.charCodeAt(end);
			if (code >= 128 || NAME_CHAR[code] === 0) break;
		}
		if (this.pos === end) this.error("Expect a keyword");
		return this.substringToPos(end);
	}
	scanNumber() {
		let end = this.pos;
		for (; end < this.str.length; end++) {
			const code = this.str.charCodeAt(end);
			if (code < 48 || code > 57) break;
		}
		if (this.pos === end) this.error("Expect a number");
		return this.substringToPos(end);
	}
	scanString() {
		const end = this.str.indexOf("'", this.pos + 1);
		if (end === -1) {
			this.pos = this.str.length;
			this.error("Expect an apostrophe");
		}
		return this.substringToPos(end + 1);
	}
};
//#endregion
//#region node_modules/.pnpm/css-tree@3.2.1/node_modules/css-tree/lib/definition-syntax/parse.js
const TAB = 9;
const N$1 = 10;
const F = 12;
const R = 13;
const SPACE$2 = 32;
const EXCLAMATIONMARK$2 = 33;
const NUMBERSIGN$3 = 35;
const AMPERSAND$5 = 38;
const APOSTROPHE$2 = 39;
const LEFTPARENTHESIS$2 = 40;
const RIGHTPARENTHESIS$2 = 41;
const ASTERISK$6 = 42;
const PLUSSIGN$6 = 43;
const COMMA = 44;
const HYPERMINUS = 45;
const LESSTHANSIGN$1 = 60;
const GREATERTHANSIGN$3 = 62;
const QUESTIONMARK$1 = 63;
const COMMERCIALAT = 64;
const LEFTSQUAREBRACKET = 91;
const RIGHTSQUAREBRACKET = 93;
const LEFTCURLYBRACKET = 123;
const VERTICALLINE$3 = 124;
const RIGHTCURLYBRACKET = 125;
const INFINITY = 8734;
const COMBINATOR_PRECEDENCE = {
	" ": 1,
	"&&": 2,
	"||": 3,
	"|": 4
};
function readMultiplierRange(scanner) {
	let min = null;
	let max = null;
	scanner.eat(LEFTCURLYBRACKET);
	scanner.skipWs();
	min = scanner.scanNumber(scanner);
	scanner.skipWs();
	if (scanner.charCode() === COMMA) {
		scanner.pos++;
		scanner.skipWs();
		if (scanner.charCode() !== RIGHTCURLYBRACKET) {
			max = scanner.scanNumber(scanner);
			scanner.skipWs();
		}
	} else max = min;
	scanner.eat(RIGHTCURLYBRACKET);
	return {
		min: Number(min),
		max: max ? Number(max) : 0
	};
}
function readMultiplier(scanner) {
	let range = null;
	let comma = false;
	switch (scanner.charCode()) {
		case ASTERISK$6:
			scanner.pos++;
			range = {
				min: 0,
				max: 0
			};
			break;
		case PLUSSIGN$6:
			scanner.pos++;
			range = {
				min: 1,
				max: 0
			};
			break;
		case QUESTIONMARK$1:
			scanner.pos++;
			range = {
				min: 0,
				max: 1
			};
			break;
		case NUMBERSIGN$3:
			scanner.pos++;
			comma = true;
			if (scanner.charCode() === LEFTCURLYBRACKET) range = readMultiplierRange(scanner);
			else if (scanner.charCode() === QUESTIONMARK$1) {
				scanner.pos++;
				range = {
					min: 0,
					max: 0
				};
			} else range = {
				min: 1,
				max: 0
			};
			break;
		case LEFTCURLYBRACKET:
			range = readMultiplierRange(scanner);
			break;
		default: return null;
	}
	return {
		type: "Multiplier",
		comma,
		min: range.min,
		max: range.max,
		term: null
	};
}
function maybeMultiplied(scanner, node) {
	const multiplier = readMultiplier(scanner);
	if (multiplier !== null) {
		multiplier.term = node;
		if (scanner.charCode() === NUMBERSIGN$3 && scanner.charCodeAt(scanner.pos - 1) === PLUSSIGN$6) return maybeMultiplied(scanner, multiplier);
		if (scanner.charCode() === QUESTIONMARK$1 && scanner.charCodeAt(scanner.pos - 1) === RIGHTCURLYBRACKET) return maybeMultiplied(scanner, multiplier);
		return multiplier;
	}
	return node;
}
function maybeToken(scanner) {
	const ch = scanner.peek();
	if (ch === "") return null;
	return maybeMultiplied(scanner, {
		type: "Token",
		value: ch
	});
}
function readProperty$1(scanner) {
	let name;
	scanner.eat(LESSTHANSIGN$1);
	scanner.eat(APOSTROPHE$2);
	name = scanner.scanWord();
	scanner.eat(APOSTROPHE$2);
	scanner.eat(GREATERTHANSIGN$3);
	return maybeMultiplied(scanner, {
		type: "Property",
		name
	});
}
function readTypeRange(scanner) {
	let min = null;
	let max = null;
	let sign = 1;
	scanner.eat(LEFTSQUAREBRACKET);
	if (scanner.charCode() === HYPERMINUS) {
		scanner.peek();
		sign = -1;
	}
	if (sign == -1 && scanner.charCode() === INFINITY) scanner.peek();
	else {
		min = sign * Number(scanner.scanNumber(scanner));
		if (scanner.isNameCharCode()) min += scanner.scanWord();
	}
	scanner.skipWs();
	scanner.eat(COMMA);
	scanner.skipWs();
	if (scanner.charCode() === INFINITY) scanner.peek();
	else {
		sign = 1;
		if (scanner.charCode() === HYPERMINUS) {
			scanner.peek();
			sign = -1;
		}
		max = sign * Number(scanner.scanNumber(scanner));
		if (scanner.isNameCharCode()) max += scanner.scanWord();
	}
	scanner.eat(RIGHTSQUAREBRACKET);
	return {
		type: "Range",
		min,
		max
	};
}
function readType(scanner) {
	let name;
	let opts = null;
	scanner.eat(LESSTHANSIGN$1);
	name = scanner.scanWord();
	if (name === "boolean-expr") {
		scanner.eat(LEFTSQUAREBRACKET);
		const implicitGroup = readImplicitGroup(scanner, RIGHTSQUAREBRACKET);
		scanner.eat(RIGHTSQUAREBRACKET);
		scanner.eat(GREATERTHANSIGN$3);
		return maybeMultiplied(scanner, {
			type: "Boolean",
			term: implicitGroup.terms.length === 1 ? implicitGroup.terms[0] : implicitGroup
		});
	}
	if (scanner.charCode() === LEFTPARENTHESIS$2 && scanner.nextCharCode() === RIGHTPARENTHESIS$2) {
		scanner.pos += 2;
		name += "()";
	}
	if (scanner.charCodeAt(scanner.findWsEnd(scanner.pos)) === LEFTSQUAREBRACKET) {
		scanner.skipWs();
		opts = readTypeRange(scanner);
	}
	scanner.eat(GREATERTHANSIGN$3);
	return maybeMultiplied(scanner, {
		type: "Type",
		name,
		opts
	});
}
function readKeywordOrFunction(scanner) {
	const name = scanner.scanWord();
	if (scanner.charCode() === LEFTPARENTHESIS$2) {
		scanner.pos++;
		return {
			type: "Function",
			name
		};
	}
	return maybeMultiplied(scanner, {
		type: "Keyword",
		name
	});
}
function regroupTerms(terms, combinators) {
	function createGroup(terms, combinator) {
		return {
			type: "Group",
			terms,
			combinator,
			disallowEmpty: false,
			explicit: false
		};
	}
	let combinator;
	combinators = Object.keys(combinators).sort((a, b) => COMBINATOR_PRECEDENCE[a] - COMBINATOR_PRECEDENCE[b]);
	while (combinators.length > 0) {
		combinator = combinators.shift();
		let i = 0;
		let subgroupStart = 0;
		for (; i < terms.length; i++) {
			const term = terms[i];
			if (term.type === "Combinator") {
				if (term.value === combinator) {
					if (subgroupStart === -1) subgroupStart = i - 1;
					terms.splice(i, 1);
					i--;
				} else {
					if (subgroupStart !== -1 && i - subgroupStart > 1) {
						terms.splice(subgroupStart, i - subgroupStart, createGroup(terms.slice(subgroupStart, i), combinator));
						i = subgroupStart + 1;
					}
					subgroupStart = -1;
				}
			}
		}
		if (subgroupStart !== -1 && combinators.length) terms.splice(subgroupStart, i - subgroupStart, createGroup(terms.slice(subgroupStart, i), combinator));
	}
	return combinator;
}
function readImplicitGroup(scanner, stopCharCode = -1) {
	const combinators = Object.create(null);
	const terms = [];
	let prevToken = null;
	let prevTokenPos = scanner.pos;
	let prevTokenIsFunction = false;
	while (scanner.charCode() !== stopCharCode) {
		let token = prevTokenIsFunction ? readImplicitGroup(scanner, RIGHTPARENTHESIS$2) : peek(scanner);
		if (!token) break;
		if (token.type === "Spaces") continue;
		if (prevTokenIsFunction) {
			if (token.terms.length === 0) {
				prevTokenIsFunction = false;
				continue;
			}
			if (token.combinator === " ") {
				while (token.terms.length > 1) {
					combinators[" "] = true;
					terms.push({
						type: "Combinator",
						value: " "
					}, token.terms.shift());
				}
				token = token.terms[0];
			}
		}
		if (token.type === "Combinator") {
			if (prevToken === null || prevToken.type === "Combinator") {
				scanner.pos = prevTokenPos;
				scanner.error("Unexpected combinator");
			}
			combinators[token.value] = true;
		} else if (prevToken !== null && prevToken.type !== "Combinator") {
			combinators[" "] = true;
			terms.push({
				type: "Combinator",
				value: " "
			});
		}
		terms.push(token);
		prevToken = token;
		prevTokenPos = scanner.pos;
		prevTokenIsFunction = token.type === "Function";
	}
	if (prevToken !== null && prevToken.type === "Combinator") {
		scanner.pos -= prevTokenPos;
		scanner.error("Unexpected combinator");
	}
	return {
		type: "Group",
		terms,
		combinator: regroupTerms(terms, combinators) || " ",
		disallowEmpty: false,
		explicit: false
	};
}
function readGroup(scanner) {
	let result;
	scanner.eat(LEFTSQUAREBRACKET);
	result = readImplicitGroup(scanner, RIGHTSQUAREBRACKET);
	scanner.eat(RIGHTSQUAREBRACKET);
	result.explicit = true;
	if (scanner.charCode() === EXCLAMATIONMARK$2) {
		scanner.pos++;
		result.disallowEmpty = true;
	}
	return result;
}
function peek(scanner) {
	let code = scanner.charCode();
	switch (code) {
		case RIGHTSQUAREBRACKET: break;
		case LEFTSQUAREBRACKET: return maybeMultiplied(scanner, readGroup(scanner));
		case LESSTHANSIGN$1: return scanner.nextCharCode() === APOSTROPHE$2 ? readProperty$1(scanner) : readType(scanner);
		case VERTICALLINE$3: return {
			type: "Combinator",
			value: scanner.substringToPos(scanner.pos + (scanner.nextCharCode() === VERTICALLINE$3 ? 2 : 1))
		};
		case AMPERSAND$5:
			scanner.pos++;
			scanner.eat(AMPERSAND$5);
			return {
				type: "Combinator",
				value: "&&"
			};
		case COMMA:
			scanner.pos++;
			return { type: "Comma" };
		case APOSTROPHE$2: return maybeMultiplied(scanner, {
			type: "String",
			value: scanner.scanString()
		});
		case SPACE$2:
		case TAB:
		case N$1:
		case R:
		case F: return {
			type: "Spaces",
			value: scanner.scanSpaces()
		};
		case COMMERCIALAT:
			code = scanner.nextCharCode();
			if (scanner.isNameCharCode(code)) {
				scanner.pos++;
				return {
					type: "AtKeyword",
					name: scanner.scanWord()
				};
			}
			return maybeToken(scanner);
		case ASTERISK$6:
		case PLUSSIGN$6:
		case QUESTIONMARK$1:
		case NUMBERSIGN$3:
		case EXCLAMATIONMARK$2: break;
		case LEFTCURLYBRACKET:
			code = scanner.nextCharCode();
			if (code < 48 || code > 57) return maybeToken(scanner);
			break;
		default:
			if (scanner.isNameCharCode(code)) return readKeywordOrFunction(scanner);
			return maybeToken(scanner);
	}
}
function parse$51(source) {
	const scanner = new Scanner(source);
	const result = readImplicitGroup(scanner);
	if (scanner.pos !== source.length) scanner.error("Unexpected input");
	if (result.terms.length === 1 && result.terms[0].type === "Group") return result.terms[0];
	return result;
}
//#endregion
//#region node_modules/.pnpm/css-tree@3.2.1/node_modules/css-tree/lib/definition-syntax/walk.js
const noop = function() {};
function ensureFunction(value) {
	return typeof value === "function" ? value : noop;
}
function walk$1(node, options, context) {
	function walk(node) {
		enter.call(context, node);
		switch (node.type) {
			case "Group":
				node.terms.forEach(walk);
				break;
			case "Multiplier":
			case "Boolean":
				walk(node.term);
				break;
			case "Type":
			case "Property":
			case "Keyword":
			case "AtKeyword":
			case "Function":
			case "String":
			case "Token":
			case "Comma": break;
			default: throw new Error("Unknown type: " + node.type);
		}
		leave.call(context, node);
	}
	let enter = noop;
	let leave = noop;
	if (typeof options === "function") enter = options;
	else if (options) {
		enter = ensureFunction(options.enter);
		leave = ensureFunction(options.leave);
	}
	if (enter === noop && leave === noop) throw new Error("Neither `enter` nor `leave` walker handler is set or both aren't a function");
	walk(node, context);
}
//#endregion
//#region node_modules/.pnpm/css-tree@3.2.1/node_modules/css-tree/lib/lexer/prepare-tokens.js
const astToTokens = { decorator(handlers) {
	const tokens = [];
	let curNode = null;
	return {
		...handlers,
		node(node) {
			const tmp = curNode;
			curNode = node;
			handlers.node.call(this, node);
			curNode = tmp;
		},
		emit(value, type, auto) {
			tokens.push({
				type,
				value,
				node: auto ? null : curNode
			});
		},
		result() {
			return tokens;
		}
	};
} };
function stringToTokens(str) {
	const tokens = [];
	tokenize$2(str, (type, start, end) => tokens.push({
		type,
		value: str.slice(start, end),
		node: null
	}));
	return tokens;
}
function prepare_tokens_default(value, syntax) {
	if (typeof value === "string") return stringToTokens(value);
	return syntax.generate(value, astToTokens);
}
//#endregion
//#region node_modules/.pnpm/css-tree@3.2.1/node_modules/css-tree/lib/lexer/match-graph.js
const MATCH = { type: "Match" };
const MISMATCH = { type: "Mismatch" };
const DISALLOW_EMPTY = { type: "DisallowEmpty" };
const LEFTPARENTHESIS$1 = 40;
const RIGHTPARENTHESIS$1 = 41;
function createCondition(match, thenBranch, elseBranch) {
	if (thenBranch === MATCH && elseBranch === MISMATCH) return match;
	if (match === MATCH && thenBranch === MATCH && elseBranch === MATCH) return match;
	if (match.type === "If" && match.else === MISMATCH && thenBranch === MATCH) {
		thenBranch = match.then;
		match = match.match;
	}
	return {
		type: "If",
		match,
		then: thenBranch,
		else: elseBranch
	};
}
function isFunctionType(name) {
	return name.length > 2 && name.charCodeAt(name.length - 2) === LEFTPARENTHESIS$1 && name.charCodeAt(name.length - 1) === RIGHTPARENTHESIS$1;
}
function isEnumCapatible(term) {
	return term.type === "Keyword" || term.type === "AtKeyword" || term.type === "Function" || term.type === "Type" && isFunctionType(term.name);
}
function groupNode(terms, combinator = " ", explicit = false) {
	return {
		type: "Group",
		terms,
		combinator,
		disallowEmpty: false,
		explicit
	};
}
function replaceTypeInGraph(node, replacements, visited = /* @__PURE__ */ new Set()) {
	if (!visited.has(node)) {
		visited.add(node);
		switch (node.type) {
			case "If":
				node.match = replaceTypeInGraph(node.match, replacements, visited);
				node.then = replaceTypeInGraph(node.then, replacements, visited);
				node.else = replaceTypeInGraph(node.else, replacements, visited);
				break;
			case "Type": return replacements[node.name] || node;
		}
	}
	return node;
}
function buildGroupMatchGraph(combinator, terms, atLeastOneTermMatched) {
	switch (combinator) {
		case " ": {
			let result = MATCH;
			for (let i = terms.length - 1; i >= 0; i--) {
				const term = terms[i];
				result = createCondition(term, result, MISMATCH);
			}
			return result;
		}
		case "|": {
			let result = MISMATCH;
			let map = null;
			for (let i = terms.length - 1; i >= 0; i--) {
				let term = terms[i];
				if (isEnumCapatible(term)) {
					if (map === null && i > 0 && isEnumCapatible(terms[i - 1])) {
						map = Object.create(null);
						result = createCondition({
							type: "Enum",
							map
						}, MATCH, result);
					}
					if (map !== null) {
						const key = (isFunctionType(term.name) ? term.name.slice(0, -1) : term.name).toLowerCase();
						if (key in map === false) {
							map[key] = term;
							continue;
						}
					}
				}
				map = null;
				result = createCondition(term, MATCH, result);
			}
			return result;
		}
		case "&&": {
			if (terms.length > 5) return {
				type: "MatchOnce",
				terms,
				all: true
			};
			let result = MISMATCH;
			for (let i = terms.length - 1; i >= 0; i--) {
				const term = terms[i];
				let thenClause;
				if (terms.length > 1) thenClause = buildGroupMatchGraph(combinator, terms.filter(function(newGroupTerm) {
					return newGroupTerm !== term;
				}), false);
				else thenClause = MATCH;
				result = createCondition(term, thenClause, result);
			}
			return result;
		}
		case "||": {
			if (terms.length > 5) return {
				type: "MatchOnce",
				terms,
				all: false
			};
			let result = atLeastOneTermMatched ? MATCH : MISMATCH;
			for (let i = terms.length - 1; i >= 0; i--) {
				const term = terms[i];
				let thenClause;
				if (terms.length > 1) thenClause = buildGroupMatchGraph(combinator, terms.filter(function(newGroupTerm) {
					return newGroupTerm !== term;
				}), true);
				else thenClause = MATCH;
				result = createCondition(term, thenClause, result);
			}
			return result;
		}
	}
}
function buildMultiplierMatchGraph(node) {
	let result = MATCH;
	let matchTerm = buildMatchGraphInternal(node.term);
	if (node.max === 0) {
		matchTerm = createCondition(matchTerm, DISALLOW_EMPTY, MISMATCH);
		result = createCondition(matchTerm, null, MISMATCH);
		result.then = createCondition(MATCH, MATCH, result);
		if (node.comma) result.then.else = createCondition({
			type: "Comma",
			syntax: node
		}, result, MISMATCH);
	} else for (let i = node.min || 1; i <= node.max; i++) {
		if (node.comma && result !== MATCH) result = createCondition({
			type: "Comma",
			syntax: node
		}, result, MISMATCH);
		result = createCondition(matchTerm, createCondition(MATCH, MATCH, result), MISMATCH);
	}
	if (node.min === 0) result = createCondition(MATCH, MATCH, result);
	else for (let i = 0; i < node.min - 1; i++) {
		if (node.comma && result !== MATCH) result = createCondition({
			type: "Comma",
			syntax: node
		}, result, MISMATCH);
		result = createCondition(matchTerm, result, MISMATCH);
	}
	return result;
}
function buildMatchGraphInternal(node) {
	if (typeof node === "function") return {
		type: "Generic",
		fn: node
	};
	switch (node.type) {
		case "Group": {
			let result = buildGroupMatchGraph(node.combinator, node.terms.map(buildMatchGraphInternal), false);
			if (node.disallowEmpty) result = createCondition(result, DISALLOW_EMPTY, MISMATCH);
			return result;
		}
		case "Multiplier": return buildMultiplierMatchGraph(node);
		case "Boolean": {
			const term = buildMatchGraphInternal(node.term);
			const matchNode = buildMatchGraphInternal(groupNode([groupNode([{
				type: "Keyword",
				name: "not"
			}, {
				type: "Type",
				name: "!boolean-group"
			}]), groupNode([{
				type: "Type",
				name: "!boolean-group"
			}, groupNode([{
				type: "Multiplier",
				comma: false,
				min: 0,
				max: 0,
				term: groupNode([{
					type: "Keyword",
					name: "and"
				}, {
					type: "Type",
					name: "!boolean-group"
				}])
			}, {
				type: "Multiplier",
				comma: false,
				min: 0,
				max: 0,
				term: groupNode([{
					type: "Keyword",
					name: "or"
				}, {
					type: "Type",
					name: "!boolean-group"
				}])
			}], "|")])], "|"));
			const booleanGroup = buildMatchGraphInternal(groupNode([
				{
					type: "Type",
					name: "!term"
				},
				groupNode([
					{
						type: "Token",
						value: "("
					},
					{
						type: "Type",
						name: "!self"
					},
					{
						type: "Token",
						value: ")"
					}
				]),
				{
					type: "Type",
					name: "general-enclosed"
				}
			], "|"));
			replaceTypeInGraph(booleanGroup, {
				"!term": term,
				"!self": matchNode
			});
			replaceTypeInGraph(matchNode, { "!boolean-group": booleanGroup });
			return matchNode;
		}
		case "Type":
		case "Property": return {
			type: node.type,
			name: node.name,
			syntax: node
		};
		case "Keyword": return {
			type: node.type,
			name: node.name.toLowerCase(),
			syntax: node
		};
		case "AtKeyword": return {
			type: node.type,
			name: "@" + node.name.toLowerCase(),
			syntax: node
		};
		case "Function": return {
			type: node.type,
			name: node.name.toLowerCase() + "(",
			syntax: node
		};
		case "String":
			if (node.value.length === 3) return {
				type: "Token",
				value: node.value.charAt(1),
				syntax: node
			};
			return {
				type: node.type,
				value: node.value.substr(1, node.value.length - 2).replace(/\\'/g, "'"),
				syntax: node
			};
		case "Token": return {
			type: node.type,
			value: node.value,
			syntax: node
		};
		case "Comma": return {
			type: node.type,
			syntax: node
		};
		default: throw new Error("Unknown node type:", node.type);
	}
}
function buildMatchGraph(syntaxTree, ref) {
	if (typeof syntaxTree === "string") syntaxTree = parse$51(syntaxTree);
	return {
		type: "MatchGraph",
		match: buildMatchGraphInternal(syntaxTree),
		syntax: ref || null,
		source: syntaxTree
	};
}
//#endregion
//#region node_modules/.pnpm/css-tree@3.2.1/node_modules/css-tree/lib/lexer/match.js
const { hasOwnProperty: hasOwnProperty$2 } = Object.prototype;
const STUB = 0;
const TOKEN = 1;
const OPEN_SYNTAX = 2;
const CLOSE_SYNTAX = 3;
const EXIT_REASON_MATCH = "Match";
const EXIT_REASON_MISMATCH = "Mismatch";
const EXIT_REASON_ITERATION_LIMIT = "Maximum iteration number exceeded (please fill an issue on https://github.com/csstree/csstree/issues)";
const ITERATION_LIMIT = 15e3;
let totalIterationCount = 0;
function reverseList(list) {
	let prev = null;
	let next = null;
	let item = list;
	while (item !== null) {
		next = item.prev;
		item.prev = prev;
		prev = item;
		item = next;
	}
	return prev;
}
function areStringsEqualCaseInsensitive(testStr, referenceStr) {
	if (testStr.length !== referenceStr.length) return false;
	for (let i = 0; i < testStr.length; i++) {
		const referenceCode = referenceStr.charCodeAt(i);
		let testCode = testStr.charCodeAt(i);
		if (testCode >= 65 && testCode <= 90) testCode = testCode | 32;
		if (testCode !== referenceCode) return false;
	}
	return true;
}
function isContextEdgeDelim(token) {
	if (token.type !== 9) return false;
	return token.value !== "?";
}
function isCommaContextStart(token) {
	if (token === null) return true;
	return token.type === 18 || token.type === 2 || token.type === 21 || token.type === 19 || token.type === 23 || isContextEdgeDelim(token);
}
function isCommaContextEnd(token) {
	if (token === null) return true;
	return token.type === 22 || token.type === 20 || token.type === 24 || token.type === 9 && token.value === "/";
}
function internalMatch(tokens, state, syntaxes) {
	function moveToNextToken() {
		do {
			tokenIndex++;
			token = tokenIndex < tokens.length ? tokens[tokenIndex] : null;
		} while (token !== null && (token.type === 13 || token.type === 25));
	}
	function getNextToken(offset) {
		const nextIndex = tokenIndex + offset;
		return nextIndex < tokens.length ? tokens[nextIndex] : null;
	}
	function stateSnapshotFromSyntax(nextState, prev) {
		return {
			nextState,
			matchStack,
			syntaxStack,
			thenStack,
			tokenIndex,
			prev
		};
	}
	function pushThenStack(nextState) {
		thenStack = {
			nextState,
			matchStack,
			syntaxStack,
			prev: thenStack
		};
	}
	function pushElseStack(nextState) {
		elseStack = stateSnapshotFromSyntax(nextState, elseStack);
	}
	function addTokenToMatch() {
		matchStack = {
			type: TOKEN,
			syntax: state.syntax,
			token,
			prev: matchStack
		};
		moveToNextToken();
		syntaxStash = null;
		if (tokenIndex > longestMatch) longestMatch = tokenIndex;
	}
	function openSyntax() {
		syntaxStack = {
			syntax: state.syntax,
			opts: state.syntax.opts || syntaxStack !== null && syntaxStack.opts || null,
			prev: syntaxStack
		};
		matchStack = {
			type: OPEN_SYNTAX,
			syntax: state.syntax,
			token: matchStack.token,
			prev: matchStack
		};
	}
	function closeSyntax() {
		if (matchStack.type === OPEN_SYNTAX) matchStack = matchStack.prev;
		else matchStack = {
			type: CLOSE_SYNTAX,
			syntax: syntaxStack.syntax,
			token: matchStack.token,
			prev: matchStack
		};
		syntaxStack = syntaxStack.prev;
	}
	let syntaxStack = null;
	let thenStack = null;
	let elseStack = null;
	let syntaxStash = null;
	let iterationCount = 0;
	let exitReason = null;
	let token = null;
	let tokenIndex = -1;
	let longestMatch = 0;
	let matchStack = {
		type: STUB,
		syntax: null,
		token: null,
		prev: null
	};
	moveToNextToken();
	while (exitReason === null && ++iterationCount < ITERATION_LIMIT) switch (state.type) {
		case "Match":
			if (thenStack === null) {
				if (token !== null) {
					if (tokenIndex !== tokens.length - 1 || token.value !== "\\0" && token.value !== "\\9") {
						state = MISMATCH;
						break;
					}
				}
				exitReason = EXIT_REASON_MATCH;
				break;
			}
			state = thenStack.nextState;
			if (state === DISALLOW_EMPTY) {
				if (thenStack.matchStack === matchStack) {
					state = MISMATCH;
					break;
				} else state = MATCH;
			}
			while (thenStack.syntaxStack !== syntaxStack) closeSyntax();
			thenStack = thenStack.prev;
			break;
		case "Mismatch":
			if (syntaxStash !== null && syntaxStash !== false) {
				if (elseStack === null || tokenIndex > elseStack.tokenIndex) {
					elseStack = syntaxStash;
					syntaxStash = false;
				}
			} else if (elseStack === null) {
				exitReason = EXIT_REASON_MISMATCH;
				break;
			}
			state = elseStack.nextState;
			thenStack = elseStack.thenStack;
			syntaxStack = elseStack.syntaxStack;
			matchStack = elseStack.matchStack;
			tokenIndex = elseStack.tokenIndex;
			token = tokenIndex < tokens.length ? tokens[tokenIndex] : null;
			elseStack = elseStack.prev;
			break;
		case "MatchGraph":
			state = state.match;
			break;
		case "If":
			if (state.else !== MISMATCH) pushElseStack(state.else);
			if (state.then !== MATCH) pushThenStack(state.then);
			state = state.match;
			break;
		case "MatchOnce":
			state = {
				type: "MatchOnceBuffer",
				syntax: state,
				index: 0,
				mask: 0
			};
			break;
		case "MatchOnceBuffer": {
			const terms = state.syntax.terms;
			if (state.index === terms.length) {
				if (state.mask === 0 || state.syntax.all) {
					state = MISMATCH;
					break;
				}
				state = MATCH;
				break;
			}
			if (state.mask === (1 << terms.length) - 1) {
				state = MATCH;
				break;
			}
			for (; state.index < terms.length; state.index++) {
				const matchFlag = 1 << state.index;
				if ((state.mask & matchFlag) === 0) {
					pushElseStack(state);
					pushThenStack({
						type: "AddMatchOnce",
						syntax: state.syntax,
						mask: state.mask | matchFlag
					});
					state = terms[state.index++];
					break;
				}
			}
			break;
		}
		case "AddMatchOnce":
			state = {
				type: "MatchOnceBuffer",
				syntax: state.syntax,
				index: 0,
				mask: state.mask
			};
			break;
		case "Enum":
			if (token !== null) {
				let name = token.value.toLowerCase();
				if (name.indexOf("\\") !== -1) name = name.replace(/\\[09].*$/, "");
				if (hasOwnProperty$2.call(state.map, name)) {
					state = state.map[name];
					break;
				}
			}
			state = MISMATCH;
			break;
		case "Generic": {
			const opts = syntaxStack !== null ? syntaxStack.opts : null;
			const lastTokenIndex = tokenIndex + Math.floor(state.fn(token, getNextToken, opts));
			if (!isNaN(lastTokenIndex) && lastTokenIndex > tokenIndex) {
				while (tokenIndex < lastTokenIndex) addTokenToMatch();
				state = MATCH;
			} else state = MISMATCH;
			break;
		}
		case "Type":
		case "Property": {
			const syntaxDict = state.type === "Type" ? "types" : "properties";
			const dictSyntax = hasOwnProperty$2.call(syntaxes, syntaxDict) ? syntaxes[syntaxDict][state.name] : null;
			if (!dictSyntax || !dictSyntax.match) throw new Error("Bad syntax reference: " + (state.type === "Type" ? "<" + state.name + ">" : "<'" + state.name + "'>"));
			if (syntaxStash !== false && token !== null && state.type === "Type") {
				if (state.name === "custom-ident" && token.type === 1 || state.name === "length" && token.value === "0") {
					if (syntaxStash === null) syntaxStash = stateSnapshotFromSyntax(state, elseStack);
					state = MISMATCH;
					break;
				}
			}
			openSyntax();
			state = dictSyntax.matchRef || dictSyntax.match;
			break;
		}
		case "Keyword": {
			const name = state.name;
			if (token !== null) {
				let keywordName = token.value;
				if (keywordName.indexOf("\\") !== -1) keywordName = keywordName.replace(/\\[09].*$/, "");
				if (areStringsEqualCaseInsensitive(keywordName, name)) {
					addTokenToMatch();
					state = MATCH;
					break;
				}
			}
			state = MISMATCH;
			break;
		}
		case "AtKeyword":
		case "Function":
			if (token !== null && areStringsEqualCaseInsensitive(token.value, state.name)) {
				addTokenToMatch();
				state = MATCH;
				break;
			}
			state = MISMATCH;
			break;
		case "Token":
			if (token !== null && token.value === state.value) {
				addTokenToMatch();
				state = MATCH;
				break;
			}
			state = MISMATCH;
			break;
		case "Comma":
			if (token !== null && token.type === 18) {
				if (isCommaContextStart(matchStack.token)) state = MISMATCH;
				else {
					addTokenToMatch();
					state = isCommaContextEnd(token) ? MISMATCH : MATCH;
				}
			} else state = isCommaContextStart(matchStack.token) || isCommaContextEnd(token) ? MATCH : MISMATCH;
			break;
		case "String":
			let string = "";
			let lastTokenIndex = tokenIndex;
			for (; lastTokenIndex < tokens.length && string.length < state.value.length; lastTokenIndex++) string += tokens[lastTokenIndex].value;
			if (areStringsEqualCaseInsensitive(string, state.value)) {
				while (tokenIndex < lastTokenIndex) addTokenToMatch();
				state = MATCH;
			} else state = MISMATCH;
			break;
		default: throw new Error("Unknown node type: " + state.type);
	}
	totalIterationCount += iterationCount;
	switch (exitReason) {
		case null:
			console.warn("[csstree-match] BREAK after 15000 iterations");
			exitReason = EXIT_REASON_ITERATION_LIMIT;
			matchStack = null;
			break;
		case EXIT_REASON_MATCH:
			while (syntaxStack !== null) closeSyntax();
			break;
		default: matchStack = null;
	}
	return {
		tokens,
		reason: exitReason,
		iterations: iterationCount,
		match: matchStack,
		longestMatch
	};
}
function matchAsTree(tokens, matchGraph, syntaxes) {
	const matchResult = internalMatch(tokens, matchGraph, syntaxes || {});
	if (matchResult.match === null) return matchResult;
	let item = matchResult.match;
	let host = matchResult.match = {
		syntax: matchGraph.syntax || null,
		match: []
	};
	const hostStack = [host];
	item = reverseList(item).prev;
	while (item !== null) {
		switch (item.type) {
			case OPEN_SYNTAX:
				host.match.push(host = {
					syntax: item.syntax,
					match: []
				});
				hostStack.push(host);
				break;
			case CLOSE_SYNTAX:
				hostStack.pop();
				host = hostStack[hostStack.length - 1];
				break;
			default: host.match.push({
				syntax: item.syntax || null,
				token: item.token.value,
				node: item.token.node
			});
		}
		item = item.prev;
	}
	return matchResult;
}
//#endregion
//#region node_modules/.pnpm/css-tree@3.2.1/node_modules/css-tree/lib/lexer/trace.js
var trace_exports = /* @__PURE__ */ __exportAll({
	getTrace: () => getTrace,
	isKeyword: () => isKeyword,
	isProperty: () => isProperty,
	isType: () => isType
});
function getTrace(node) {
	function shouldPutToTrace(syntax) {
		if (syntax === null) return false;
		return syntax.type === "Type" || syntax.type === "Property" || syntax.type === "Keyword";
	}
	function hasMatch(matchNode) {
		if (Array.isArray(matchNode.match)) {
			for (let i = 0; i < matchNode.match.length; i++) if (hasMatch(matchNode.match[i])) {
				if (shouldPutToTrace(matchNode.syntax)) result.unshift(matchNode.syntax);
				return true;
			}
		} else if (matchNode.node === node) {
			result = shouldPutToTrace(matchNode.syntax) ? [matchNode.syntax] : [];
			return true;
		}
		return false;
	}
	let result = null;
	if (this.matched !== null) hasMatch(this.matched);
	return result;
}
function isType(node, type) {
	return testNode(this, node, (match) => match.type === "Type" && match.name === type);
}
function isProperty(node, property) {
	return testNode(this, node, (match) => match.type === "Property" && match.name === property);
}
function isKeyword(node) {
	return testNode(this, node, (match) => match.type === "Keyword");
}
function testNode(match, node, fn) {
	const trace = getTrace.call(match, node);
	if (trace === null) return false;
	return trace.some(fn);
}
//#endregion
//#region node_modules/.pnpm/css-tree@3.2.1/node_modules/css-tree/lib/lexer/search.js
function getFirstMatchNode(matchNode) {
	if ("node" in matchNode) return matchNode.node;
	return getFirstMatchNode(matchNode.match[0]);
}
function getLastMatchNode(matchNode) {
	if ("node" in matchNode) return matchNode.node;
	return getLastMatchNode(matchNode.match[matchNode.match.length - 1]);
}
function matchFragments(lexer, ast, match, type, name) {
	function findFragments(matchNode) {
		if (matchNode.syntax !== null && matchNode.syntax.type === type && matchNode.syntax.name === name) {
			const start = getFirstMatchNode(matchNode);
			const end = getLastMatchNode(matchNode);
			lexer.syntax.walk(ast, function(node, item, list) {
				if (node === start) {
					const nodes = new List();
					do {
						nodes.appendData(item.data);
						if (item.data === end) break;
						item = item.next;
					} while (item !== null);
					fragments.push({
						parent: list,
						nodes
					});
				}
			});
		}
		if (Array.isArray(matchNode.match)) matchNode.match.forEach(findFragments);
	}
	const fragments = [];
	if (match.matched !== null) findFragments(match.matched);
	return fragments;
}
//#endregion
//#region node_modules/.pnpm/css-tree@3.2.1/node_modules/css-tree/lib/lexer/structure.js
const { hasOwnProperty: hasOwnProperty$1 } = Object.prototype;
function isValidNumber(value) {
	return typeof value === "number" && isFinite(value) && Math.floor(value) === value && value >= 0;
}
function isValidLocation(loc) {
	return Boolean(loc) && isValidNumber(loc.offset) && isValidNumber(loc.line) && isValidNumber(loc.column);
}
function createNodeStructureChecker(type, fields) {
	return function checkNode(node, warn) {
		if (!node || node.constructor !== Object) return warn(node, "Type of node should be an Object");
		for (let key in node) {
			let valid = true;
			if (hasOwnProperty$1.call(node, key) === false) continue;
			if (key === "type") {
				if (node.type !== type) warn(node, "Wrong node type `" + node.type + "`, expected `" + type + "`");
			} else if (key === "loc") {
				if (node.loc === null) continue;
				else if (node.loc && node.loc.constructor === Object) {
					if (typeof node.loc.source !== "string") key += ".source";
					else if (!isValidLocation(node.loc.start)) key += ".start";
					else if (!isValidLocation(node.loc.end)) key += ".end";
					else continue;
				}
				valid = false;
			} else if (fields.hasOwnProperty(key)) {
				valid = false;
				for (let i = 0; !valid && i < fields[key].length; i++) {
					const fieldType = fields[key][i];
					switch (fieldType) {
						case String:
							valid = typeof node[key] === "string";
							break;
						case Boolean:
							valid = typeof node[key] === "boolean";
							break;
						case null:
							valid = node[key] === null;
							break;
						default: if (typeof fieldType === "string") valid = node[key] && node[key].type === fieldType;
						else if (Array.isArray(fieldType)) valid = node[key] instanceof List;
					}
				}
			} else warn(node, "Unknown field `" + key + "` for " + type + " node type");
			if (!valid) warn(node, "Bad value for `" + type + "." + key + "`");
		}
		for (const key in fields) if (hasOwnProperty$1.call(fields, key) && hasOwnProperty$1.call(node, key) === false) warn(node, "Field `" + type + "." + key + "` is missed");
	};
}
function genTypesList(fieldTypes, path) {
	const docsTypes = [];
	for (let i = 0; i < fieldTypes.length; i++) {
		const fieldType = fieldTypes[i];
		if (fieldType === String || fieldType === Boolean) docsTypes.push(fieldType.name.toLowerCase());
		else if (fieldType === null) docsTypes.push("null");
		else if (typeof fieldType === "string") docsTypes.push(fieldType);
		else if (Array.isArray(fieldType)) docsTypes.push("List<" + (genTypesList(fieldType, path) || "any") + ">");
		else throw new Error("Wrong value `" + fieldType + "` in `" + path + "` structure definition");
	}
	return docsTypes.join(" | ");
}
function processStructure(name, nodeType) {
	const structure = nodeType.structure;
	const fields = {
		type: String,
		loc: true
	};
	const docs = { type: "\"" + name + "\"" };
	for (const key in structure) {
		if (hasOwnProperty$1.call(structure, key) === false) continue;
		docs[key] = genTypesList(fields[key] = Array.isArray(structure[key]) ? structure[key].slice() : [structure[key]], name + "." + key);
	}
	return {
		docs,
		check: createNodeStructureChecker(name, fields)
	};
}
function getStructureFromConfig(config) {
	const structure = {};
	if (config.node) {
		for (const name in config.node) if (hasOwnProperty$1.call(config.node, name)) {
			const nodeType = config.node[name];
			if (nodeType.structure) structure[name] = processStructure(name, nodeType);
			else throw new Error("Missed `structure` field in `" + name + "` node type definition");
		}
	}
	return structure;
}
//#endregion
//#region node_modules/.pnpm/css-tree@3.2.1/node_modules/css-tree/lib/lexer/Lexer.js
function dumpMapSyntax(map, compact, syntaxAsAst) {
	const result = {};
	for (const name in map) if (map[name].syntax) result[name] = syntaxAsAst ? map[name].syntax : generate$50(map[name].syntax, { compact });
	return result;
}
function dumpAtruleMapSyntax(map, compact, syntaxAsAst) {
	const result = {};
	for (const [name, atrule] of Object.entries(map)) result[name] = {
		prelude: atrule.prelude && (syntaxAsAst ? atrule.prelude.syntax : generate$50(atrule.prelude.syntax, { compact })),
		descriptors: atrule.descriptors && dumpMapSyntax(atrule.descriptors, compact, syntaxAsAst)
	};
	return result;
}
function valueHasVar(tokens) {
	for (let i = 0; i < tokens.length; i++) if (tokens[i].value.toLowerCase() === "var(") return true;
	return false;
}
function syntaxHasTopLevelCommaMultiplier(syntax) {
	const singleTerm = syntax.terms[0];
	return syntax.explicit === false && syntax.terms.length === 1 && singleTerm.type === "Multiplier" && singleTerm.comma === true;
}
function buildMatchResult(matched, error, iterations) {
	return {
		matched,
		iterations,
		error,
		...trace_exports
	};
}
function matchSyntax(lexer, syntax, value, useCssWideKeywords) {
	const tokens = prepare_tokens_default(value, lexer.syntax);
	let result;
	if (valueHasVar(tokens)) return buildMatchResult(null, /* @__PURE__ */ new Error("Matching for a tree with var() is not supported"));
	if (useCssWideKeywords) result = matchAsTree(tokens, lexer.cssWideKeywordsSyntax, lexer);
	if (!useCssWideKeywords || !result.match) {
		result = matchAsTree(tokens, syntax.match, lexer);
		if (!result.match) return buildMatchResult(null, new SyntaxMatchError(result.reason, syntax.syntax, value, result), result.iterations);
	}
	return buildMatchResult(result.match, null, result.iterations);
}
var Lexer = class {
	constructor(config, syntax, structure) {
		this.cssWideKeywords = cssWideKeywords;
		this.syntax = syntax;
		this.generic = false;
		this.units = { ...units_exports };
		this.atrules = Object.create(null);
		this.properties = Object.create(null);
		this.types = Object.create(null);
		this.structure = structure || getStructureFromConfig(config);
		if (config) {
			if (config.cssWideKeywords) this.cssWideKeywords = config.cssWideKeywords;
			if (config.units) {
				for (const group of Object.keys(units_exports)) if (Array.isArray(config.units[group])) this.units[group] = config.units[group];
			}
			if (config.types) for (const [name, type] of Object.entries(config.types)) this.addType_(name, type);
			if (config.generic) {
				this.generic = true;
				for (const [name, value] of Object.entries(createGenericTypes(this.units))) this.addType_(name, value);
			}
			if (config.atrules) for (const [name, atrule] of Object.entries(config.atrules)) this.addAtrule_(name, atrule);
			if (config.properties) for (const [name, property] of Object.entries(config.properties)) this.addProperty_(name, property);
		}
		this.cssWideKeywordsSyntax = buildMatchGraph(this.cssWideKeywords.join(" |  "));
	}
	checkStructure(ast) {
		function collectWarning(node, message) {
			warns.push({
				node,
				message
			});
		}
		const structure = this.structure;
		const warns = [];
		this.syntax.walk(ast, function(node) {
			if (structure.hasOwnProperty(node.type)) structure[node.type].check(node, collectWarning);
			else collectWarning(node, "Unknown node type `" + node.type + "`");
		});
		return warns.length ? warns : false;
	}
	createDescriptor(syntax, type, name, parent = null) {
		const ref = {
			type,
			name
		};
		const descriptor = {
			type,
			name,
			parent,
			serializable: typeof syntax === "string" || syntax && typeof syntax.type === "string",
			syntax: null,
			match: null,
			matchRef: null
		};
		if (typeof syntax === "function") descriptor.match = buildMatchGraph(syntax, ref);
		else {
			if (typeof syntax === "string") Object.defineProperty(descriptor, "syntax", { get() {
				Object.defineProperty(descriptor, "syntax", { value: parse$51(syntax) });
				return descriptor.syntax;
			} });
			else descriptor.syntax = syntax;
			Object.defineProperty(descriptor, "match", { get() {
				Object.defineProperty(descriptor, "match", { value: buildMatchGraph(descriptor.syntax, ref) });
				return descriptor.match;
			} });
			if (type === "Property") Object.defineProperty(descriptor, "matchRef", { get() {
				const syntax = descriptor.syntax;
				const value = syntaxHasTopLevelCommaMultiplier(syntax) ? buildMatchGraph({
					...syntax,
					terms: [syntax.terms[0].term]
				}, ref) : null;
				Object.defineProperty(descriptor, "matchRef", { value });
				return value;
			} });
		}
		return descriptor;
	}
	addAtrule_(name, syntax) {
		if (!syntax) return;
		this.atrules[name] = {
			type: "Atrule",
			name,
			prelude: syntax.prelude ? this.createDescriptor(syntax.prelude, "AtrulePrelude", name) : null,
			descriptors: syntax.descriptors ? Object.keys(syntax.descriptors).reduce((map, descName) => {
				map[descName] = this.createDescriptor(syntax.descriptors[descName], "AtruleDescriptor", descName, name);
				return map;
			}, Object.create(null)) : null
		};
	}
	addProperty_(name, syntax) {
		if (!syntax) return;
		this.properties[name] = this.createDescriptor(syntax, "Property", name);
	}
	addType_(name, syntax) {
		if (!syntax) return;
		this.types[name] = this.createDescriptor(syntax, "Type", name);
	}
	checkAtruleName(atruleName) {
		if (!this.getAtrule(atruleName)) return new SyntaxReferenceError("Unknown at-rule", "@" + atruleName);
	}
	checkAtrulePrelude(atruleName, prelude) {
		const error = this.checkAtruleName(atruleName);
		if (error) return error;
		const atrule = this.getAtrule(atruleName);
		if (!atrule.prelude && prelude) return /* @__PURE__ */ new SyntaxError("At-rule `@" + atruleName + "` should not contain a prelude");
		if (atrule.prelude && !prelude) {
			if (!matchSyntax(this, atrule.prelude, "", false).matched) return /* @__PURE__ */ new SyntaxError("At-rule `@" + atruleName + "` should contain a prelude");
		}
	}
	checkAtruleDescriptorName(atruleName, descriptorName) {
		const error = this.checkAtruleName(atruleName);
		if (error) return error;
		const atrule = this.getAtrule(atruleName);
		const descriptor = keyword(descriptorName);
		if (!atrule.descriptors) return /* @__PURE__ */ new SyntaxError("At-rule `@" + atruleName + "` has no known descriptors");
		if (!atrule.descriptors[descriptor.name] && !atrule.descriptors[descriptor.basename]) return new SyntaxReferenceError("Unknown at-rule descriptor", descriptorName);
	}
	checkPropertyName(propertyName) {
		if (!this.getProperty(propertyName)) return new SyntaxReferenceError("Unknown property", propertyName);
	}
	matchAtrulePrelude(atruleName, prelude) {
		const error = this.checkAtrulePrelude(atruleName, prelude);
		if (error) return buildMatchResult(null, error);
		const atrule = this.getAtrule(atruleName);
		if (!atrule.prelude) return buildMatchResult(null, null);
		return matchSyntax(this, atrule.prelude, prelude || "", false);
	}
	matchAtruleDescriptor(atruleName, descriptorName, value) {
		const error = this.checkAtruleDescriptorName(atruleName, descriptorName);
		if (error) return buildMatchResult(null, error);
		const atrule = this.getAtrule(atruleName);
		const descriptor = keyword(descriptorName);
		return matchSyntax(this, atrule.descriptors[descriptor.name] || atrule.descriptors[descriptor.basename], value, false);
	}
	matchDeclaration(node) {
		if (node.type !== "Declaration") return buildMatchResult(null, /* @__PURE__ */ new Error("Not a Declaration node"));
		return this.matchProperty(node.property, node.value);
	}
	matchProperty(propertyName, value) {
		if (property(propertyName).custom) return buildMatchResult(null, /* @__PURE__ */ new Error("Lexer matching doesn't applicable for custom properties"));
		const error = this.checkPropertyName(propertyName);
		if (error) return buildMatchResult(null, error);
		return matchSyntax(this, this.getProperty(propertyName), value, true);
	}
	matchType(typeName, value) {
		const typeSyntax = this.getType(typeName);
		if (!typeSyntax) return buildMatchResult(null, new SyntaxReferenceError("Unknown type", typeName));
		return matchSyntax(this, typeSyntax, value, false);
	}
	match(syntax, value) {
		if (typeof syntax !== "string" && (!syntax || !syntax.type)) return buildMatchResult(null, new SyntaxReferenceError("Bad syntax"));
		if (typeof syntax === "string" || !syntax.match) syntax = this.createDescriptor(syntax, "Type", "anonymous");
		return matchSyntax(this, syntax, value, false);
	}
	findValueFragments(propertyName, value, type, name) {
		return matchFragments(this, value, this.matchProperty(propertyName, value), type, name);
	}
	findDeclarationValueFragments(declaration, type, name) {
		return matchFragments(this, declaration.value, this.matchDeclaration(declaration), type, name);
	}
	findAllFragments(ast, type, name) {
		const result = [];
		this.syntax.walk(ast, {
			visit: "Declaration",
			enter: (declaration) => {
				result.push.apply(result, this.findDeclarationValueFragments(declaration, type, name));
			}
		});
		return result;
	}
	getAtrule(atruleName, fallbackBasename = true) {
		const atrule = keyword(atruleName);
		return (atrule.vendor && fallbackBasename ? this.atrules[atrule.name] || this.atrules[atrule.basename] : this.atrules[atrule.name]) || null;
	}
	getAtrulePrelude(atruleName, fallbackBasename = true) {
		const atrule = this.getAtrule(atruleName, fallbackBasename);
		return atrule && atrule.prelude || null;
	}
	getAtruleDescriptor(atruleName, name) {
		return this.atrules.hasOwnProperty(atruleName) && this.atrules.declarators ? this.atrules[atruleName].declarators[name] || null : null;
	}
	getProperty(propertyName, fallbackBasename = true) {
		const property$1 = property(propertyName);
		return (property$1.vendor && fallbackBasename ? this.properties[property$1.name] || this.properties[property$1.basename] : this.properties[property$1.name]) || null;
	}
	getType(name) {
		return hasOwnProperty.call(this.types, name) ? this.types[name] : null;
	}
	validate() {
		function syntaxRef(name, isType) {
			return isType ? `<${name}>` : `<'${name}'>`;
		}
		function validate(syntax, name, broken, descriptor) {
			if (broken.has(name)) return broken.get(name);
			broken.set(name, false);
			if (descriptor.syntax !== null) walk$1(descriptor.syntax, function(node) {
				if (node.type !== "Type" && node.type !== "Property") return;
				const map = node.type === "Type" ? syntax.types : syntax.properties;
				const brokenMap = node.type === "Type" ? brokenTypes : brokenProperties;
				if (!hasOwnProperty.call(map, node.name)) {
					errors.push(`${syntaxRef(name, broken === brokenTypes)} used missed syntax definition ${syntaxRef(node.name, node.type === "Type")}`);
					broken.set(name, true);
				} else if (validate(syntax, node.name, brokenMap, map[node.name])) {
					errors.push(`${syntaxRef(name, broken === brokenTypes)} used broken syntax definition ${syntaxRef(node.name, node.type === "Type")}`);
					broken.set(name, true);
				}
			}, this);
		}
		const errors = [];
		let brokenTypes = /* @__PURE__ */ new Map();
		let brokenProperties = /* @__PURE__ */ new Map();
		for (const key in this.types) validate(this, key, brokenTypes, this.types[key]);
		for (const key in this.properties) validate(this, key, brokenProperties, this.properties[key]);
		const brokenTypesArray = [...brokenTypes.keys()].filter((name) => brokenTypes.get(name));
		const brokenPropertiesArray = [...brokenProperties.keys()].filter((name) => brokenProperties.get(name));
		if (brokenTypesArray.length || brokenPropertiesArray.length) return {
			errors,
			types: brokenTypesArray,
			properties: brokenPropertiesArray
		};
		return null;
	}
	dump(syntaxAsAst, pretty) {
		return {
			generic: this.generic,
			cssWideKeywords: this.cssWideKeywords,
			units: this.units,
			types: dumpMapSyntax(this.types, !pretty, syntaxAsAst),
			properties: dumpMapSyntax(this.properties, !pretty, syntaxAsAst),
			atrules: dumpAtruleMapSyntax(this.atrules, !pretty, syntaxAsAst)
		};
	}
	toString() {
		return JSON.stringify(this.dump());
	}
};
//#endregion
//#region node_modules/.pnpm/css-tree@3.2.1/node_modules/css-tree/lib/syntax/config/mix.js
function appendOrSet(a, b) {
	if (typeof b === "string" && /^\s*\|/.test(b)) return typeof a === "string" ? a + b : b.replace(/^\s*\|\s*/, "");
	return b || null;
}
function extractProps(obj, props) {
	const result = Object.create(null);
	for (const prop of Object.keys(obj)) if (props.includes(prop)) result[prop] = obj[prop];
	return result;
}
function mergeDicts(base, ext, fields) {
	const result = { ...base };
	for (const [key, props] of Object.entries(ext)) result[key] = {
		...result[key],
		...fields ? extractProps(props, fields) : props
	};
	return result;
}
function mix(dest, src) {
	const result = { ...dest };
	for (const [prop, value] of Object.entries(src)) switch (prop) {
		case "generic":
			result[prop] = Boolean(value);
			break;
		case "cssWideKeywords":
			result[prop] = dest[prop] ? [...dest[prop], ...value] : value || [];
			break;
		case "units":
			result[prop] = { ...dest[prop] };
			for (const [name, patch] of Object.entries(value)) result[prop][name] = Array.isArray(patch) ? patch : [];
			break;
		case "atrules":
			result[prop] = { ...dest[prop] };
			for (const [name, atrule] of Object.entries(value)) {
				const exists = result[prop][name] || {};
				const current = result[prop][name] = {
					prelude: exists.prelude || null,
					descriptors: { ...exists.descriptors }
				};
				if (!atrule) continue;
				current.prelude = atrule.prelude ? appendOrSet(current.prelude, atrule.prelude) : current.prelude || null;
				for (const [descriptorName, descriptorValue] of Object.entries(atrule.descriptors || {})) current.descriptors[descriptorName] = descriptorValue ? appendOrSet(current.descriptors[descriptorName], descriptorValue) : null;
				if (!Object.keys(current.descriptors).length) current.descriptors = null;
			}
			break;
		case "types":
		case "properties":
			result[prop] = { ...dest[prop] };
			for (const [name, syntax] of Object.entries(value)) result[prop][name] = appendOrSet(result[prop][name], syntax);
			break;
		case "parseContext":
			result[prop] = {
				...dest[prop],
				...value
			};
			break;
		case "scope":
		case "features":
			result[prop] = mergeDicts(dest[prop], value);
			break;
		case "atrule":
		case "pseudo":
			result[prop] = mergeDicts(dest[prop], value, ["parse"]);
			break;
		case "node": result[prop] = mergeDicts(dest[prop], value, [
			"name",
			"structure",
			"parse",
			"generate",
			"walkContext"
		]);
	}
	return result;
}
//#endregion
//#region node_modules/.pnpm/css-tree@3.2.1/node_modules/css-tree/lib/syntax/create.js
function createSyntax(config) {
	const parse = createParser(config);
	const walk = createWalker(config);
	const generate = createGenerator(config);
	const { fromPlainObject, toPlainObject } = createConvertor(walk);
	const syntax = {
		lexer: null,
		createLexer: (config) => new Lexer(config, syntax, syntax.lexer.structure),
		tokenize: tokenize$2,
		parse,
		generate,
		walk,
		find: walk.find,
		findLast: walk.findLast,
		findAll: walk.findAll,
		fromPlainObject,
		toPlainObject,
		fork(extension) {
			const base = mix({}, config);
			return createSyntax(typeof extension === "function" ? extension(base) : mix(base, extension));
		}
	};
	syntax.lexer = new Lexer({
		generic: config.generic,
		cssWideKeywords: config.cssWideKeywords,
		units: config.units,
		types: config.types,
		atrules: config.atrules,
		properties: config.properties,
		node: config.node
	}, syntax);
	return syntax;
}
var create_default = (config) => createSyntax(mix({}, config));
//#endregion
//#region node_modules/.pnpm/css-tree@3.2.1/node_modules/css-tree/dist/data.js
var data_default = {
	"generic": true,
	"cssWideKeywords": [
		"initial",
		"inherit",
		"unset",
		"revert",
		"revert-layer"
	],
	"units": {
		"angle": [
			"deg",
			"grad",
			"rad",
			"turn"
		],
		"decibel": ["db"],
		"flex": ["fr"],
		"frequency": ["hz", "khz"],
		"length": [
			"cm",
			"mm",
			"q",
			"in",
			"pt",
			"pc",
			"px",
			"em",
			"rem",
			"ex",
			"rex",
			"cap",
			"rcap",
			"ch",
			"rch",
			"ic",
			"ric",
			"lh",
			"rlh",
			"vw",
			"svw",
			"lvw",
			"dvw",
			"vh",
			"svh",
			"lvh",
			"dvh",
			"vi",
			"svi",
			"lvi",
			"dvi",
			"vb",
			"svb",
			"lvb",
			"dvb",
			"vmin",
			"svmin",
			"lvmin",
			"dvmin",
			"vmax",
			"svmax",
			"lvmax",
			"dvmax",
			"cqw",
			"cqh",
			"cqi",
			"cqb",
			"cqmin",
			"cqmax"
		],
		"resolution": [
			"dpi",
			"dpcm",
			"dppx",
			"x"
		],
		"semitones": ["st"],
		"time": ["s", "ms"]
	},
	"types": {
		"abs()": "abs( <calc-sum> )",
		"absolute-size": "xx-small|x-small|small|medium|large|x-large|xx-large|xxx-large",
		"acos()": "acos( <calc-sum> )",
		"alpha-value": "<number>|<percentage>",
		"an+b": "odd|even|<integer>|<n-dimension>|'+'? † n|-n|<ndashdigit-dimension>|'+'? † <ndashdigit-ident>|<dashndashdigit-ident>|<n-dimension> <signed-integer>|'+'? † n <signed-integer>|-n <signed-integer>|<ndash-dimension> <signless-integer>|'+'? † n- <signless-integer>|-n- <signless-integer>|<n-dimension> ['+'|'-'] <signless-integer>|'+'? † n ['+'|'-'] <signless-integer>|-n ['+'|'-'] <signless-integer>",
		"anchor()": "anchor( <anchor-name>?&&<anchor-side> , <length-percentage>? )",
		"anchor-name": "<dashed-ident>",
		"anchor-side": "inside|outside|top|left|right|bottom|start|end|self-start|self-end|<percentage>|center",
		"anchor-size": "width|height|block|inline|self-block|self-inline",
		"anchor-size()": "anchor-size( [<anchor-name>||<anchor-size>]? , <length-percentage>? )",
		"angle-percentage": "<angle>|<percentage>",
		"angular-color-hint": "<angle-percentage>|<zero>",
		"angular-color-stop": "<color> <color-stop-angle>?",
		"angular-color-stop-list": "<angular-color-stop> , [<angular-color-hint>? , <angular-color-stop>]#?",
		"animateable-feature": "scroll-position|contents|<custom-ident>",
		"animation-action": "none|play|play-once|play-forwards|play-backwards|pause|reset|replay",
		"asin()": "asin( <calc-sum> )",
		"atan()": "atan( <calc-sum> )",
		"atan2()": "atan2( <calc-sum> , <calc-sum> )",
		"attachment": "scroll|fixed|local",
		"attr()": "attr( <attr-name> <attr-type>? , <declaration-value>? )",
		"attr-matcher": "['~'|'|'|'^'|'$'|'*']? '='",
		"attr-modifier": "i|s",
		"attr-type": "type( <syntax> )|raw-string|number|<attr-unit>",
		"attribute-selector": "'[' <wq-name> ']'|'[' <wq-name> <attr-matcher> [<string-token>|<ident-token>] <attr-modifier>? ']'",
		"auto-repeat": "repeat( [auto-fill|auto-fit] , [<line-names>? <fixed-size>]+ <line-names>? )",
		"auto-track-list": "[<line-names>? [<fixed-size>|<fixed-repeat>]]* <line-names>? <auto-repeat> [<line-names>? [<fixed-size>|<fixed-repeat>]]* <line-names>?",
		"axis": "block|inline|x|y",
		"baseline-position": "[first|last]? baseline",
		"basic-shape": "<inset()>|<xywh()>|<rect()>|<circle()>|<ellipse()>|<polygon()>|<path()>",
		"basic-shape-rect": "<inset()>|<rect()>|<xywh()>",
		"bg-clip": "<visual-box>|border-area|text",
		"bg-image": "<image>|none",
		"bg-layer": "<bg-image>||<bg-position> [/ <bg-size>]?||<repeat-style>||<attachment>||<visual-box>||<visual-box>",
		"bg-position": "[[left|center|right|top|bottom|<length-percentage>]|[left|center|right|<length-percentage>] [top|center|bottom|<length-percentage>]|[center|[left|right] <length-percentage>?]&&[center|[top|bottom] <length-percentage>?]]",
		"bg-size": "[<length-percentage [0,∞]>|auto]{1,2}|cover|contain",
		"blend-mode": "normal|multiply|screen|overlay|darken|lighten|color-dodge|color-burn|hard-light|soft-light|difference|exclusion|hue|saturation|color|luminosity",
		"blur()": "blur( <length>? )",
		"brightness()": "brightness( [<number>|<percentage>]? )",
		"calc()": "calc( <calc-sum> )",
		"calc-constant": "e|pi|infinity|-infinity|NaN",
		"calc-product": "<calc-value> ['*' <calc-value>|'/' <number>]*",
		"calc-size()": "calc-size( <calc-size-basis> , <calc-sum> )",
		"calc-size-basis": "<intrinsic-size-keyword>|<calc-size()>|any|<calc-sum>",
		"calc-sum": "<calc-product> [['+'|'-'] <calc-product>]*",
		"calc-value": "<number>|<dimension>|<percentage>|<calc-constant>|( <calc-sum> )",
		"cf-final-image": "<image>|<color>",
		"cf-mixing-image": "<percentage>?&&<image>",
		"circle()": "circle( <radial-size>? [at <position>]? )",
		"clamp()": "clamp( <calc-sum>#{3} )",
		"class-selector": "'.' <ident-token>",
		"clip-source": "<url>",
		"color": "<color-base>|currentColor|<system-color>|<device-cmyk()>|<light-dark()>|<-non-standard-color>",
		"color()": "color( <colorspace-params> [/ [<alpha-value>|none]]? )",
		"color-base": "<hex-color>|<color-function>|<named-color>|<color-mix()>|transparent",
		"color-function": "<rgb()>|<rgba()>|<hsl()>|<hsla()>|<hwb()>|<lab()>|<lch()>|<oklab()>|<oklch()>|<color()>",
		"color-interpolation-method": "in [<rectangular-color-space>|<polar-color-space> <hue-interpolation-method>?|<custom-color-space>]",
		"color-mix()": "color-mix( <color-interpolation-method> , [<color>&&<percentage [0,100]>?]#{2} )",
		"color-stop": "<color-stop-length>|<color-stop-angle>",
		"color-stop-angle": "[<angle-percentage>|<zero>]{1,2}",
		"color-stop-length": "<length-percentage>{1,2}",
		"color-stop-list": "<linear-color-stop> , [<linear-color-hint>? , <linear-color-stop>]#?",
		"colorspace-params": "[<predefined-rgb-params>|<xyz-params>]",
		"combinator": "'>'|'+'|'~'|['|' '|']",
		"common-lig-values": "[common-ligatures|no-common-ligatures]",
		"compat-auto": "searchfield|textarea|checkbox|radio|menulist|listbox|meter|progress-bar|button",
		"compat-special": "textfield|menulist-button",
		"complex-selector": "<complex-selector-unit> [<combinator>? <complex-selector-unit>]*",
		"complex-selector-list": "<complex-selector>#",
		"composite-style": "clear|copy|source-over|source-in|source-out|source-atop|destination-over|destination-in|destination-out|destination-atop|xor",
		"compositing-operator": "add|subtract|intersect|exclude",
		"compound-selector": "[<type-selector>? <subclass-selector>*]!",
		"compound-selector-list": "<compound-selector>#",
		"conic-gradient()": "conic-gradient( [<conic-gradient-syntax>] )",
		"conic-gradient-syntax": "[[[from [<angle>|<zero>]]? [at <position>]?]||<color-interpolation-method>]? , <angular-color-stop-list>",
		"container-condition": "not <query-in-parens>|<query-in-parens> [[and <query-in-parens>]*|[or <query-in-parens>]*]",
		"container-name": "<custom-ident>",
		"container-query": "not <query-in-parens>|<query-in-parens> [[and <query-in-parens>]*|[or <query-in-parens>]*]",
		"content-distribution": "space-between|space-around|space-evenly|stretch",
		"content-list": "[<string>|contents|<image>|<counter>|<quote>|<target>|<leader()>|<attr()>]+",
		"content-position": "center|start|end|flex-start|flex-end",
		"content-replacement": "<image>",
		"contextual-alt-values": "[contextual|no-contextual]",
		"contrast()": "contrast( [<number>|<percentage>]? )",
		"coord-box": "content-box|padding-box|border-box|fill-box|stroke-box|view-box",
		"corner-shape-value": "round|scoop|bevel|notch|square|squircle|<superellipse()>",
		"cos()": "cos( <calc-sum> )",
		"counter": "<counter()>|<counters()>",
		"counter()": "counter( <counter-name> , <counter-style>? )",
		"counter-name": "<custom-ident>",
		"counter-style": "<counter-style-name>|symbols( )",
		"counter-style-name": "<custom-ident>",
		"counters()": "counters( <counter-name> , <string> , <counter-style>? )",
		"cross-fade()": "cross-fade( <cf-mixing-image> , <cf-final-image>? )",
		"cubic-bezier()": "cubic-bezier( [<number [0,1]> , <number>]#{2} )",
		"cubic-bezier-easing-function": "ease|ease-in|ease-out|ease-in-out|cubic-bezier( <number [0,1]> , <number> , <number [0,1]> , <number> )",
		"cursor-predefined": "auto|default|none|context-menu|help|pointer|progress|wait|cell|crosshair|text|vertical-text|alias|copy|move|no-drop|not-allowed|e-resize|n-resize|ne-resize|nw-resize|s-resize|se-resize|sw-resize|w-resize|ew-resize|ns-resize|nesw-resize|nwse-resize|col-resize|row-resize|all-scroll|zoom-in|zoom-out|grab|grabbing",
		"custom-color-space": "<dashed-ident>",
		"custom-params": "<dashed-ident> [<number>|<percentage>|none]+",
		"dasharray": "[[<length-percentage>|<number>]+]#",
		"dashndashdigit-ident": "<ident-token>",
		"deprecated-system-color": "ActiveBorder|ActiveCaption|AppWorkspace|Background|ButtonHighlight|ButtonShadow|CaptionText|InactiveBorder|InactiveCaption|InactiveCaptionText|InfoBackground|InfoText|Menu|MenuText|Scrollbar|ThreeDDarkShadow|ThreeDFace|ThreeDHighlight|ThreeDLightShadow|ThreeDShadow|Window|WindowFrame|WindowText",
		"discretionary-lig-values": "[discretionary-ligatures|no-discretionary-ligatures]",
		"display-box": "contents|none",
		"display-inside": "flow|flow-root|table|flex|grid|ruby",
		"display-internal": "table-row-group|table-header-group|table-footer-group|table-row|table-cell|table-column-group|table-column|table-caption|ruby-base|ruby-text|ruby-base-container|ruby-text-container",
		"display-legacy": "inline-block|inline-list-item|inline-table|inline-flex|inline-grid",
		"display-listitem": "<display-outside>?&&[flow|flow-root]?&&list-item",
		"display-outside": "block|inline|run-in",
		"drop-shadow()": "drop-shadow( [<color>?&&<length>{2,3}] )",
		"dynamic-range-limit-mix()": "dynamic-range-limit-mix( [<'dynamic-range-limit'>&&<percentage [0,100]>]#{2,} )",
		"easing-function": "<linear-easing-function>|<cubic-bezier-easing-function>|<step-easing-function>",
		"east-asian-variant-values": "[jis78|jis83|jis90|jis04|simplified|traditional]",
		"east-asian-width-values": "[full-width|proportional-width]",
		"element()": "element( <custom-ident> , [first|start|last|first-except]? )|element( <id-selector> )",
		"ellipse()": "ellipse( <radial-size>? [at <position>]? )",
		"env()": "env( <custom-ident> , <declaration-value>? )",
		"exp()": "exp( <calc-sum> )",
		"explicit-track-list": "[<line-names>? <track-size>]+ <line-names>?",
		"family-name": "<string>|<custom-ident>+",
		"feature-tag-value": "<string> [<integer>|on|off]?",
		"feature-type": "@stylistic|@historical-forms|@styleset|@character-variant|@swash|@ornaments|@annotation",
		"feature-value-block": "<feature-type> '{' <feature-value-declaration-list> '}'",
		"feature-value-block-list": "<feature-value-block>+",
		"feature-value-declaration": "<custom-ident> : <integer>+ ;",
		"feature-value-declaration-list": "<feature-value-declaration>",
		"feature-value-name": "<custom-ident>",
		"filter-function": "<blur()>|<brightness()>|<contrast()>|<drop-shadow()>|<grayscale()>|<hue-rotate()>|<invert()>|<opacity()>|<saturate()>|<sepia()>",
		"filter-value-list": "[<filter-function>|<url>]+",
		"final-bg-layer": "<bg-image>||<bg-position> [/ <bg-size>]?||<repeat-style>||<attachment>||<visual-box>||<visual-box>||<'background-color'>",
		"fit-content()": "fit-content( <length-percentage [0,∞]> )",
		"fixed-breadth": "<length-percentage>",
		"fixed-repeat": "repeat( [<integer [1,∞]>] , [<line-names>? <fixed-size>]+ <line-names>? )",
		"fixed-size": "<fixed-breadth>|minmax( <fixed-breadth> , <track-breadth> )|minmax( <inflexible-breadth> , <fixed-breadth> )",
		"font-stretch-absolute": "normal|ultra-condensed|extra-condensed|condensed|semi-condensed|semi-expanded|expanded|extra-expanded|ultra-expanded|<percentage>",
		"font-variant-css2": "normal|small-caps",
		"font-weight-absolute": "normal|bold|<number [1,1000]>",
		"font-width-css3": "normal|ultra-condensed|extra-condensed|condensed|semi-condensed|semi-expanded|expanded|extra-expanded|ultra-expanded",
		"form-control-identifier": "select",
		"frequency-percentage": "<frequency>|<percentage>",
		"generic-complete": "serif|sans-serif|system-ui|cursive|fantasy|math|monospace",
		"general-enclosed": "[<function-token> <any-value>? )]|[( <any-value>? )]",
		"generic-family": "<generic-script-specific>|<generic-complete>|<generic-incomplete>|<-non-standard-generic-family>",
		"generic-incomplete": "ui-serif|ui-sans-serif|ui-monospace|ui-rounded",
		"geometry-box": "<shape-box>|fill-box|stroke-box|view-box",
		"gradient": "<linear-gradient()>|<repeating-linear-gradient()>|<radial-gradient()>|<repeating-radial-gradient()>|<conic-gradient()>|<repeating-conic-gradient()>|<-legacy-gradient>",
		"grayscale()": "grayscale( [<number>|<percentage>]? )",
		"grid-line": "auto|<custom-ident>|[<integer>&&<custom-ident>?]|[span&&[<integer>||<custom-ident>]]",
		"historical-lig-values": "[historical-ligatures|no-historical-ligatures]",
		"hsl()": "hsl( <hue> , <percentage> , <percentage> , <alpha-value>? )|hsl( [<hue>|none] [<percentage>|<number>|none] [<percentage>|<number>|none] [/ [<alpha-value>|none]]? )",
		"hsla()": "hsla( <hue> , <percentage> , <percentage> , <alpha-value>? )|hsla( [<hue>|none] [<percentage>|<number>|none] [<percentage>|<number>|none] [/ [<alpha-value>|none]]? )",
		"hue": "<number>|<angle>",
		"hue-interpolation-method": "[shorter|longer|increasing|decreasing] hue",
		"hue-rotate()": "hue-rotate( [<angle>|<zero>]? )",
		"hwb()": "hwb( [<hue>|none] [<percentage>|<number>|none] [<percentage>|<number>|none] [/ [<alpha-value>|none]]? )",
		"hypot()": "hypot( <calc-sum># )",
		"image": "<url>|<image()>|<image-set()>|<element()>|<paint()>|<cross-fade()>|<gradient>",
		"image()": "image( <image-tags>? [<image-src>? , <color>?]! )",
		"image-set()": "image-set( <image-set-option># )",
		"image-set-option": "[<image>|<string>] [<resolution>||type( <string> )]",
		"image-src": "<url>|<string>",
		"image-tags": "ltr|rtl",
		"inflexible-breadth": "<length-percentage>|min-content|max-content|auto",
		"inset()": "inset( <length-percentage>{1,4} [round <'border-radius'>]? )",
		"invert()": "invert( [<number>|<percentage>]? )",
		"keyframe-block": "<keyframe-selector># { <declaration-list> }",
		"keyframe-selector": "from|to|<percentage [0,100]>|<timeline-range-name> <percentage>",
		"keyframes-name": "<custom-ident>|<string>",
		"lab()": "lab( [<percentage>|<number>|none] [<percentage>|<number>|none] [<percentage>|<number>|none] [/ [<alpha-value>|none]]? )",
		"layer()": "layer( <layer-name> )",
		"layer-name": "<ident> ['.' <ident>]*",
		"lch()": "lch( [<percentage>|<number>|none] [<percentage>|<number>|none] [<hue>|none] [/ [<alpha-value>|none]]? )",
		"leader()": "leader( <leader-type> )",
		"leader-type": "dotted|solid|space|<string>",
		"length-percentage": "<length>|<percentage>",
		"light-dark()": "light-dark( <color> , <color> )",
		"line-name-list": "[<line-names>|<name-repeat>]+",
		"line-names": "'[' <custom-ident>* ']'",
		"line-style": "none|hidden|dotted|dashed|solid|double|groove|ridge|inset|outset",
		"line-width": "<length>|thin|medium|thick",
		"linear()": "linear( [<number>&&<percentage>{0,2}]# )",
		"linear-color-hint": "<length-percentage>",
		"linear-color-stop": "<color> <color-stop-length>?",
		"linear-easing-function": "linear|<linear()>",
		"linear-gradient()": "linear-gradient( [<linear-gradient-syntax>] )",
		"linear-gradient-syntax": "[[<angle>|<zero>|to <side-or-corner>]||<color-interpolation-method>]? , <color-stop-list>",
		"log()": "log( <calc-sum> , <calc-sum>? )",
		"mask-layer": "<mask-reference>||<position> [/ <bg-size>]?||<repeat-style>||<geometry-box>||[<geometry-box>|no-clip]||<compositing-operator>||<masking-mode>",
		"mask-position": "[<length-percentage>|left|center|right] [<length-percentage>|top|center|bottom]?",
		"mask-reference": "none|<image>|<mask-source>",
		"mask-source": "<url>",
		"masking-mode": "alpha|luminance|match-source",
		"matrix()": "matrix( <number>#{6} )",
		"matrix3d()": "matrix3d( <number>#{16} )",
		"max()": "max( <calc-sum># )",
		"media-and": "<media-in-parens> [and <media-in-parens>]+",
		"media-condition": "<media-not>|<media-and>|<media-or>|<media-in-parens>",
		"media-condition-without-or": "<media-not>|<media-and>|<media-in-parens>",
		"media-feature": "( [<mf-plain>|<mf-boolean>|<mf-range>] )",
		"media-in-parens": "( <media-condition> )|<media-feature>|<general-enclosed>",
		"media-not": "not <media-in-parens>",
		"media-or": "<media-in-parens> [or <media-in-parens>]+",
		"media-query": "<media-condition>|[not|only]? <media-type> [and <media-condition-without-or>]?",
		"media-query-list": "<media-query>#",
		"media-type": "<ident>",
		"mf-boolean": "<mf-name>",
		"mf-name": "<ident>",
		"mf-plain": "<mf-name> : <mf-value>",
		"mf-range": "<mf-name> ['<'|'>']? '='? <mf-value>|<mf-value> ['<'|'>']? '='? <mf-name>|<mf-value> '<' '='? <mf-name> '<' '='? <mf-value>|<mf-value> '>' '='? <mf-name> '>' '='? <mf-value>",
		"mf-value": "<number>|<dimension>|<ident>|<ratio>",
		"min()": "min( <calc-sum># )",
		"minmax()": "minmax( [<length-percentage>|min-content|max-content|auto] , [<length-percentage>|<flex>|min-content|max-content|auto] )",
		"mod()": "mod( <calc-sum> , <calc-sum> )",
		"n-dimension": "<dimension-token>",
		"name-repeat": "repeat( [<integer [1,∞]>|auto-fill] , <line-names>+ )",
		"named-color": "aliceblue|antiquewhite|aqua|aquamarine|azure|beige|bisque|black|blanchedalmond|blue|blueviolet|brown|burlywood|cadetblue|chartreuse|chocolate|coral|cornflowerblue|cornsilk|crimson|cyan|darkblue|darkcyan|darkgoldenrod|darkgray|darkgreen|darkgrey|darkkhaki|darkmagenta|darkolivegreen|darkorange|darkorchid|darkred|darksalmon|darkseagreen|darkslateblue|darkslategray|darkslategrey|darkturquoise|darkviolet|deeppink|deepskyblue|dimgray|dimgrey|dodgerblue|firebrick|floralwhite|forestgreen|fuchsia|gainsboro|ghostwhite|gold|goldenrod|gray|green|greenyellow|grey|honeydew|hotpink|indianred|indigo|ivory|khaki|lavender|lavenderblush|lawngreen|lemonchiffon|lightblue|lightcoral|lightcyan|lightgoldenrodyellow|lightgray|lightgreen|lightgrey|lightpink|lightsalmon|lightseagreen|lightskyblue|lightslategray|lightslategrey|lightsteelblue|lightyellow|lime|limegreen|linen|magenta|maroon|mediumaquamarine|mediumblue|mediumorchid|mediumpurple|mediumseagreen|mediumslateblue|mediumspringgreen|mediumturquoise|mediumvioletred|midnightblue|mintcream|mistyrose|moccasin|navajowhite|navy|oldlace|olive|olivedrab|orange|orangered|orchid|palegoldenrod|palegreen|paleturquoise|palevioletred|papayawhip|peachpuff|peru|pink|plum|powderblue|purple|rebeccapurple|red|rosybrown|royalblue|saddlebrown|salmon|sandybrown|seagreen|seashell|sienna|silver|skyblue|slateblue|slategray|slategrey|snow|springgreen|steelblue|tan|teal|thistle|tomato|turquoise|violet|wheat|white|whitesmoke|yellow|yellowgreen",
		"namespace-prefix": "<ident>",
		"ndash-dimension": "<dimension-token>",
		"ndashdigit-dimension": "<dimension-token>",
		"ndashdigit-ident": "<ident-token>",
		"ns-prefix": "[<ident-token>|'*']? '|'",
		"number-percentage": "<number>|<percentage>",
		"numeric-figure-values": "[lining-nums|oldstyle-nums]",
		"numeric-fraction-values": "[diagonal-fractions|stacked-fractions]",
		"numeric-spacing-values": "[proportional-nums|tabular-nums]",
		"offset-path": "<ray()>|<url>|<basic-shape>",
		"oklab()": "oklab( [<percentage>|<number>|none] [<percentage>|<number>|none] [<percentage>|<number>|none] [/ [<alpha-value>|none]]? )",
		"oklch()": "oklch( [<percentage>|<number>|none] [<percentage>|<number>|none] [<hue>|none] [/ [<alpha-value>|none]]? )",
		"opacity()": "opacity( [<number>|<percentage>]? )",
		"opacity-value": "<number>|<percentage>",
		"outline-line-style": "none|dotted|dashed|solid|double|groove|ridge|inset|outset",
		"outline-radius": "<length>|<percentage>",
		"overflow-position": "unsafe|safe",
		"page-body": "<declaration>? [; <page-body>]?|<page-margin-box> <page-body>",
		"page-margin-box": "<page-margin-box-type> '{' <declaration-list> '}'",
		"page-margin-box-type": "@top-left-corner|@top-left|@top-center|@top-right|@top-right-corner|@bottom-left-corner|@bottom-left|@bottom-center|@bottom-right|@bottom-right-corner|@left-top|@left-middle|@left-bottom|@right-top|@right-middle|@right-bottom",
		"page-selector": "<pseudo-page>+|<ident> <pseudo-page>*",
		"page-selector-list": "[<page-selector>#]?",
		"page-size": "A5|A4|A3|B5|B4|JIS-B5|JIS-B4|letter|legal|ledger",
		"paint": "none|<color>|<url> [none|<color>]?|context-fill|context-stroke",
		"paint()": "paint( <ident> , <declaration-value>? )",
		"paint-box": "<visual-box>|fill-box|stroke-box",
		"palette-identifier": "<dashed-ident>",
		"palette-mix()": "palette-mix( <color-interpolation-method> , [[normal|light|dark|<palette-identifier>|<palette-mix()>]&&<percentage [0,100]>?]#{2} )",
		"path()": "path( <'fill-rule'>? , <string> )",
		"perspective()": "perspective( [<length [0,∞]>|none] )",
		"polar-color-space": "hsl|hwb|lch|oklch",
		"polygon()": "polygon( <'fill-rule'>? , [<length-percentage> <length-percentage>]# )",
		"position": "[[left|center|right]||[top|center|bottom]|[left|center|right|<length-percentage>] [top|center|bottom|<length-percentage>]?|[[left|right] <length-percentage>]&&[[top|bottom] <length-percentage>]]",
		"position-area": "[[left|center|right|span-left|span-right|x-start|x-end|span-x-start|span-x-end|x-self-start|x-self-end|span-x-self-start|span-x-self-end|span-all]||[top|center|bottom|span-top|span-bottom|y-start|y-end|span-y-start|span-y-end|y-self-start|y-self-end|span-y-self-start|span-y-self-end|span-all]|[block-start|center|block-end|span-block-start|span-block-end|span-all]||[inline-start|center|inline-end|span-inline-start|span-inline-end|span-all]|[self-block-start|center|self-block-end|span-self-block-start|span-self-block-end|span-all]||[self-inline-start|center|self-inline-end|span-self-inline-start|span-self-inline-end|span-all]|[start|center|end|span-start|span-end|span-all]{1,2}|[self-start|center|self-end|span-self-start|span-self-end|span-all]{1,2}]",
		"pow()": "pow( <calc-sum> , <calc-sum> )",
		"predefined-rgb": "srgb|srgb-linear|display-p3|display-p3-linear|a98-rgb|prophoto-rgb|rec2020",
		"predefined-rgb-params": "<predefined-rgb> [<number>|<percentage>|none]{3}",
		"pseudo-class-selector": "':' <ident-token>|':' <function-token> <any-value> ')'",
		"pseudo-element-selector": "':' <pseudo-class-selector>|<legacy-pseudo-element-selector>",
		"pseudo-page": ": [left|right|first|blank]",
		"query-in-parens": "( <container-condition> )|( <size-feature> )|style( <style-query> )|<general-enclosed>",
		"quote": "open-quote|close-quote|no-open-quote|no-close-quote",
		"radial-extent": "closest-corner|closest-side|farthest-corner|farthest-side",
		"radial-gradient()": "radial-gradient( [<radial-gradient-syntax>] )",
		"radial-gradient-syntax": "[[[<radial-shape>||<radial-size>]? [at <position>]?]||<color-interpolation-method>]? , <color-stop-list>",
		"radial-shape": "circle|ellipse",
		"radial-size": "<radial-extent>|<length [0,∞]>|<length-percentage [0,∞]>{2}",
		"ratio": "<number [0,∞]> [/ <number [0,∞]>]?",
		"ray()": "ray( <angle>&&<ray-size>?&&contain?&&[at <position>]? )",
		"ray-size": "closest-side|closest-corner|farthest-side|farthest-corner|sides",
		"rect()": "rect( [<length-percentage>|auto]{4} [round <'border-radius'>]? )",
		"rectangular-color-space": "srgb|srgb-linear|display-p3|display-p3-linear|a98-rgb|prophoto-rgb|rec2020|lab|oklab|xyz|xyz-d50|xyz-d65",
		"relative-selector": "<combinator>? <complex-selector>",
		"relative-selector-list": "<relative-selector>#",
		"relative-size": "larger|smaller",
		"rem()": "rem( <calc-sum> , <calc-sum> )",
		"repeat-style": "repeat-x|repeat-y|[repeat|space|round|no-repeat]{1,2}",
		"repeating-conic-gradient()": "repeating-conic-gradient( [<conic-gradient-syntax>] )",
		"repeating-linear-gradient()": "repeating-linear-gradient( [<linear-gradient-syntax>] )",
		"repeating-radial-gradient()": "repeating-radial-gradient( [<radial-gradient-syntax>] )",
		"reversed-counter-name": "reversed( <counter-name> )",
		"rgb()": "rgb( <percentage>#{3} , <alpha-value>? )|rgb( <number>#{3} , <alpha-value>? )|rgb( [<number>|<percentage>|none]{3} [/ [<alpha-value>|none]]? )",
		"rgba()": "rgba( <percentage>#{3} , <alpha-value>? )|rgba( <number>#{3} , <alpha-value>? )|rgba( [<number>|<percentage>|none]{3} [/ [<alpha-value>|none]]? )",
		"rotate()": "rotate( [<angle>|<zero>] )",
		"rotate3d()": "rotate3d( <number> , <number> , <number> , [<angle>|<zero>] )",
		"rotateX()": "rotateX( [<angle>|<zero>] )",
		"rotateY()": "rotateY( [<angle>|<zero>] )",
		"rotateZ()": "rotateZ( [<angle>|<zero>] )",
		"round()": "round( <rounding-strategy>? , <calc-sum> , <calc-sum> )",
		"rounding-strategy": "nearest|up|down|to-zero",
		"saturate()": "saturate( [<number>|<percentage>]? )",
		"scale()": "scale( [<number>|<percentage>]#{1,2} )",
		"scale3d()": "scale3d( [<number>|<percentage>]#{3} )",
		"scaleX()": "scaleX( [<number>|<percentage>] )",
		"scaleY()": "scaleY( [<number>|<percentage>] )",
		"scaleZ()": "scaleZ( [<number>|<percentage>] )",
		"scope-end": "<forgiving-selector-list>",
		"scope-start": "<forgiving-selector-list>",
		"scroll()": "scroll( [<scroller>||<axis>]? )",
		"scroller": "root|nearest|self",
		"scroll-state-feature": "<media-query-list>",
		"scroll-state-in-parens": "( <scroll-state-query> )|( <scroll-state-feature> )|<general-enclosed>",
		"scroll-state-query": "not <scroll-state-in-parens>|<scroll-state-in-parens> [[and <scroll-state-in-parens>]*|[or <scroll-state-in-parens>]*]|<scroll-state-feature>",
		"selector-list": "<complex-selector-list>",
		"self-position": "center|start|end|self-start|self-end|flex-start|flex-end",
		"sepia()": "sepia( [<number>|<percentage>]? )",
		"shadow": "inset?&&<length>{2,4}&&<color>?",
		"shadow-t": "[<length>{2,3}&&<color>?]",
		"shape": "rect( <top> , <right> , <bottom> , <left> )|rect( <top> <right> <bottom> <left> )",
		"shape-box": "<visual-box>|margin-box",
		"side-or-corner": "[left|right]||[top|bottom]",
		"sign()": "sign( <calc-sum> )",
		"signed-integer": "<number-token>",
		"signless-integer": "<number-token>",
		"sin()": "sin( <calc-sum> )",
		"single-animation": "<'animation-duration'>||<easing-function>||<'animation-delay'>||<single-animation-iteration-count>||<single-animation-direction>||<single-animation-fill-mode>||<single-animation-play-state>||[none|<keyframes-name>]||<single-animation-timeline>",
		"single-animation-composition": "replace|add|accumulate",
		"single-animation-direction": "normal|reverse|alternate|alternate-reverse",
		"single-animation-fill-mode": "none|forwards|backwards|both",
		"single-animation-iteration-count": "infinite|<number>",
		"single-animation-play-state": "running|paused",
		"single-animation-timeline": "auto|none|<dashed-ident>|<scroll()>|<view()>",
		"single-transition": "[none|<single-transition-property>]||<time>||<easing-function>||<time>||<transition-behavior-value>",
		"single-transition-property": "all|<custom-ident>",
		"size": "closest-side|farthest-side|closest-corner|farthest-corner|<length>|<length-percentage>{2}",
		"size-feature": "<mf-plain>|<mf-boolean>|<mf-range>",
		"skew()": "skew( [<angle>|<zero>] , [<angle>|<zero>]? )",
		"skewX()": "skewX( [<angle>|<zero>] )",
		"skewY()": "skewY( [<angle>|<zero>] )",
		"sqrt()": "sqrt( <calc-sum> )",
		"step-position": "jump-start|jump-end|jump-none|jump-both|start|end",
		"step-easing-function": "step-start|step-end|<steps()>",
		"steps()": "steps( <integer> , <step-position>? )",
		"style-feature": "<declaration>",
		"style-in-parens": "( <style-condition> )|( <style-feature> )|<general-enclosed>",
		"style-query": "<style-condition>|<style-feature>",
		"subclass-selector": "<id-selector>|<class-selector>|<attribute-selector>|<pseudo-class-selector>",
		"superellipse()": "superellipse( [<number>|infinity|-infinity] )",
		"supports-condition": "not <supports-in-parens>|<supports-in-parens> [and <supports-in-parens>]*|<supports-in-parens> [or <supports-in-parens>]*",
		"supports-decl": "( <declaration> )",
		"supports-feature": "<supports-decl>|<supports-selector-fn>",
		"supports-in-parens": "( <supports-condition> )|<supports-feature>|<general-enclosed>",
		"supports-selector-fn": "selector( <complex-selector> )",
		"symbol": "<string>|<image>|<custom-ident>",
		"symbols()": "symbols( <symbols-type>? [<string>|<image>]+ )",
		"symbols-type": "cyclic|numeric|alphabetic|symbolic|fixed",
		"system-color": "AccentColor|AccentColorText|ActiveText|ButtonBorder|ButtonFace|ButtonText|Canvas|CanvasText|Field|FieldText|GrayText|Highlight|HighlightText|LinkText|Mark|MarkText|SelectedItem|SelectedItemText|VisitedText",
		"system-family-name": "caption|icon|menu|message-box|small-caption|status-bar",
		"tan()": "tan( <calc-sum> )",
		"target": "<target-counter()>|<target-counters()>|<target-text()>",
		"target-counter()": "target-counter( [<string>|<url>] , <custom-ident> , <counter-style>? )",
		"target-counters()": "target-counters( [<string>|<url>] , <custom-ident> , <string> , <counter-style>? )",
		"target-text()": "target-text( [<string>|<url>] , [content|before|after|first-letter]? )",
		"text-edge": "[text|cap|ex|ideographic|ideographic-ink] [text|alphabetic|ideographic|ideographic-ink]?",
		"time-percentage": "<time>|<percentage>",
		"timeline-range-name": "cover|contain|entry|exit|entry-crossing|exit-crossing",
		"track-breadth": "<length-percentage>|<flex>|min-content|max-content|auto",
		"track-list": "[<line-names>? [<track-size>|<track-repeat>]]+ <line-names>?",
		"track-repeat": "repeat( [<integer [1,∞]>] , [<line-names>? <track-size>]+ <line-names>? )",
		"track-size": "<track-breadth>|minmax( <inflexible-breadth> , <track-breadth> )|fit-content( <length-percentage> )",
		"transform-function": "<matrix()>|<translate()>|<translateX()>|<translateY()>|<scale()>|<scaleX()>|<scaleY()>|<rotate()>|<skew()>|<skewX()>|<skewY()>|<matrix3d()>|<translate3d()>|<translateZ()>|<scale3d()>|<scaleZ()>|<rotate3d()>|<rotateX()>|<rotateY()>|<rotateZ()>|<perspective()>",
		"transform-list": "<transform-function>+",
		"transition-behavior-value": "normal|allow-discrete",
		"translate()": "translate( <length-percentage> , <length-percentage>? )",
		"translate3d()": "translate3d( <length-percentage> , <length-percentage> , <length> )",
		"translateX()": "translateX( <length-percentage> )",
		"translateY()": "translateY( <length-percentage> )",
		"translateZ()": "translateZ( <length> )",
		"try-size": "most-width|most-height|most-block-size|most-inline-size",
		"try-tactic": "flip-block||flip-inline||flip-start",
		"type-or-unit": "string|color|url|integer|number|length|angle|time|frequency|cap|ch|em|ex|ic|lh|rlh|rem|vb|vi|vw|vh|vmin|vmax|mm|Q|cm|in|pt|pc|px|deg|grad|rad|turn|ms|s|Hz|kHz|%",
		"type-selector": "<wq-name>|<ns-prefix>? '*'",
		"var()": "var( <custom-property-name> , <declaration-value>? )",
		"view()": "view( [<axis>||<'view-timeline-inset'>]? )",
		"viewport-length": "auto|<length-percentage>",
		"visual-box": "content-box|padding-box|border-box",
		"wq-name": "<ns-prefix>? <ident-token>",
		"xywh()": "xywh( <length-percentage>{2} <length-percentage [0,∞]>{2} [round <'border-radius'>]? )",
		"xyz": "xyz|xyz-d50|xyz-d65",
		"xyz-params": "<xyz-space> [<number>|<percentage>|none]{3}",
		"-legacy-gradient": "<-webkit-gradient()>|<-legacy-linear-gradient>|<-legacy-repeating-linear-gradient>|<-legacy-radial-gradient>|<-legacy-repeating-radial-gradient>",
		"-legacy-linear-gradient": "-moz-linear-gradient( <-legacy-linear-gradient-arguments> )|-webkit-linear-gradient( <-legacy-linear-gradient-arguments> )|-o-linear-gradient( <-legacy-linear-gradient-arguments> )",
		"-legacy-repeating-linear-gradient": "-moz-repeating-linear-gradient( <-legacy-linear-gradient-arguments> )|-webkit-repeating-linear-gradient( <-legacy-linear-gradient-arguments> )|-o-repeating-linear-gradient( <-legacy-linear-gradient-arguments> )",
		"-legacy-linear-gradient-arguments": "[<angle>|<side-or-corner>]? , <color-stop-list>",
		"-legacy-radial-gradient": "-moz-radial-gradient( <-legacy-radial-gradient-arguments> )|-webkit-radial-gradient( <-legacy-radial-gradient-arguments> )|-o-radial-gradient( <-legacy-radial-gradient-arguments> )",
		"-legacy-repeating-radial-gradient": "-moz-repeating-radial-gradient( <-legacy-radial-gradient-arguments> )|-webkit-repeating-radial-gradient( <-legacy-radial-gradient-arguments> )|-o-repeating-radial-gradient( <-legacy-radial-gradient-arguments> )",
		"-legacy-radial-gradient-arguments": "[<position> ,]? [[[<-legacy-radial-gradient-shape>||<-legacy-radial-gradient-size>]|[<length>|<percentage>]{2}] ,]? <color-stop-list>",
		"-legacy-radial-gradient-size": "closest-side|closest-corner|farthest-side|farthest-corner|contain|cover",
		"-legacy-radial-gradient-shape": "circle|ellipse",
		"-non-standard-font": "-apple-system-body|-apple-system-headline|-apple-system-subheadline|-apple-system-caption1|-apple-system-caption2|-apple-system-footnote|-apple-system-short-body|-apple-system-short-headline|-apple-system-short-subheadline|-apple-system-short-caption1|-apple-system-short-footnote|-apple-system-tall-body",
		"-non-standard-color": "-moz-ButtonDefault|-moz-ButtonHoverFace|-moz-ButtonHoverText|-moz-CellHighlight|-moz-CellHighlightText|-moz-Combobox|-moz-ComboboxText|-moz-Dialog|-moz-DialogText|-moz-dragtargetzone|-moz-EvenTreeRow|-moz-Field|-moz-FieldText|-moz-html-CellHighlight|-moz-html-CellHighlightText|-moz-mac-accentdarkestshadow|-moz-mac-accentdarkshadow|-moz-mac-accentface|-moz-mac-accentlightesthighlight|-moz-mac-accentlightshadow|-moz-mac-accentregularhighlight|-moz-mac-accentregularshadow|-moz-mac-chrome-active|-moz-mac-chrome-inactive|-moz-mac-focusring|-moz-mac-menuselect|-moz-mac-menushadow|-moz-mac-menutextselect|-moz-MenuHover|-moz-MenuHoverText|-moz-MenuBarText|-moz-MenuBarHoverText|-moz-nativehyperlinktext|-moz-OddTreeRow|-moz-win-communicationstext|-moz-win-mediatext|-moz-activehyperlinktext|-moz-default-background-color|-moz-default-color|-moz-hyperlinktext|-moz-visitedhyperlinktext|-webkit-activelink|-webkit-focus-ring-color|-webkit-link|-webkit-text",
		"-non-standard-image-rendering": "optimize-contrast|-moz-crisp-edges|-o-crisp-edges|-webkit-optimize-contrast",
		"-non-standard-overflow": "overlay|-moz-scrollbars-none|-moz-scrollbars-horizontal|-moz-scrollbars-vertical|-moz-hidden-unscrollable",
		"-non-standard-size": "intrinsic|min-intrinsic|-webkit-fill-available|-webkit-fit-content|-webkit-min-content|-webkit-max-content|-moz-available|-moz-fit-content|-moz-min-content|-moz-max-content",
		"-webkit-gradient()": "-webkit-gradient( <-webkit-gradient-type> , <-webkit-gradient-point> [, <-webkit-gradient-point>|, <-webkit-gradient-radius> , <-webkit-gradient-point>] [, <-webkit-gradient-radius>]? [, <-webkit-gradient-color-stop>]* )",
		"-webkit-gradient-color-stop": "from( <color> )|color-stop( [<number-zero-one>|<percentage>] , <color> )|to( <color> )",
		"-webkit-gradient-point": "[left|center|right|<length-percentage>] [top|center|bottom|<length-percentage>]",
		"-webkit-gradient-radius": "<length>|<percentage>",
		"-webkit-gradient-type": "linear|radial",
		"-webkit-mask-box-repeat": "repeat|stretch|round",
		"-ms-filter-function-list": "<-ms-filter-function>+",
		"-ms-filter-function": "<-ms-filter-function-progid>|<-ms-filter-function-legacy>",
		"-ms-filter-function-progid": "'progid:' [<ident-token> '.']* [<ident-token>|<function-token> <any-value>? )]",
		"-ms-filter-function-legacy": "<ident-token>|<function-token> <any-value>? )",
		"age": "child|young|old",
		"attr-name": "<wq-name>",
		"attr-fallback": "<any-value>",
		"autospace": "no-autospace|[ideograph-alpha||ideograph-numeric||punctuation]||[insert|replace]",
		"bottom": "<length>|auto",
		"generic-voice": "[<age>? <gender> <integer>?]",
		"gender": "male|female|neutral",
		"generic-script-specific": "generic( kai )|generic( fangsong )|generic( nastaliq )",
		"-non-standard-generic-family": "-apple-system|BlinkMacSystemFont",
		"intrinsic-size-keyword": "min-content|max-content|fit-content",
		"left": "<length>|auto",
		"device-cmyk()": "<legacy-device-cmyk-syntax>|<modern-device-cmyk-syntax>",
		"legacy-device-cmyk-syntax": "device-cmyk( <number>#{4} )",
		"modern-device-cmyk-syntax": "device-cmyk( <cmyk-component>{4} [/ [<alpha-value>|none]]? )",
		"cmyk-component": "<number>|<percentage>|none",
		"color-space": "<rectangular-color-space>|<polar-color-space>|<custom-color-space>",
		"right": "<length>|auto",
		"forgiving-selector-list": "<complex-real-selector-list>",
		"forgiving-relative-selector-list": "<relative-real-selector-list>",
		"complex-real-selector-list": "<complex-real-selector>#",
		"simple-selector-list": "<simple-selector>#",
		"relative-real-selector-list": "<relative-real-selector>#",
		"complex-selector-unit": "[<compound-selector>? <pseudo-compound-selector>*]!",
		"complex-real-selector": "<compound-selector> [<combinator>? <compound-selector>]*",
		"relative-real-selector": "<combinator>? <complex-real-selector>",
		"pseudo-compound-selector": "<pseudo-element-selector> <pseudo-class-selector>*",
		"simple-selector": "<type-selector>|<subclass-selector>",
		"legacy-pseudo-element-selector": "':' [before|after|first-line|first-letter]",
		"svg-length": "<percentage>|<length>|<number>",
		"svg-writing-mode": "lr-tb|rl-tb|tb-rl|lr|rl|tb",
		"top": "<length>|auto",
		"x": "<number>",
		"y": "<number>",
		"declaration": "<ident-token> : <declaration-value>? ['!' important]?",
		"declaration-list": "[<declaration>? ';']* <declaration>?",
		"url": "url( <string> <url-modifier>* )|<url-token>",
		"url-modifier": "<ident>|<function-token> <any-value> )",
		"number-zero-one": "<number [0,1]>",
		"number-one-or-greater": "<number [1,∞]>",
		"xyz-space": "xyz|xyz-d50|xyz-d65",
		"style-condition": "not <style-in-parens>|<style-in-parens> [[and <style-in-parens>]*|[or <style-in-parens>]*]",
		"-non-standard-display": "-ms-inline-flexbox|-ms-grid|-ms-inline-grid|-webkit-flex|-webkit-inline-flex|-webkit-box|-webkit-inline-box|-moz-inline-stack|-moz-box|-moz-inline-box",
		"inset-area": "[[left|center|right|span-left|span-right|x-start|x-end|span-x-start|span-x-end|x-self-start|x-self-end|span-x-self-start|span-x-self-end|span-all]||[top|center|bottom|span-top|span-bottom|y-start|y-end|span-y-start|span-y-end|y-self-start|y-self-end|span-y-self-start|span-y-self-end|span-all]|[block-start|center|block-end|span-block-start|span-block-end|span-all]||[inline-start|center|inline-end|span-inline-start|span-inline-end|span-all]|[self-block-start|self-block-end|span-self-block-start|span-self-block-end|span-all]||[self-inline-start|self-inline-end|span-self-inline-start|span-self-inline-end|span-all]|[start|center|end|span-start|span-end|span-all]{1,2}|[self-start|center|self-end|span-self-start|span-self-end|span-all]{1,2}]",
		"syntax": "'*'|<syntax-component> [<syntax-combinator> <syntax-component>]*|<syntax-string>",
		"syntax-component": "<syntax-single-component> <syntax-multiplier>?|'<' transform-list '>'",
		"syntax-single-component": "'<' <syntax-type-name> '>'|<ident>",
		"syntax-type-name": "angle|color|custom-ident|image|integer|length|length-percentage|number|percentage|resolution|string|time|url|transform-function",
		"syntax-combinator": "'|'",
		"syntax-multiplier": "'#'|'+'",
		"syntax-string": "<string>"
	},
	"properties": {
		"--*": "<declaration-value>",
		"-ms-accelerator": "false|true",
		"-ms-block-progression": "tb|rl|bt|lr",
		"-ms-content-zoom-chaining": "none|chained",
		"-ms-content-zoom-limit": "<'-ms-content-zoom-limit-min'> <'-ms-content-zoom-limit-max'>",
		"-ms-content-zoom-limit-max": "<percentage>",
		"-ms-content-zoom-limit-min": "<percentage>",
		"-ms-content-zoom-snap": "<'-ms-content-zoom-snap-type'>||<'-ms-content-zoom-snap-points'>",
		"-ms-content-zoom-snap-points": "snapInterval( <percentage> , <percentage> )|snapList( <percentage># )",
		"-ms-content-zoom-snap-type": "none|proximity|mandatory",
		"-ms-content-zooming": "none|zoom",
		"-ms-filter": "<string>",
		"-ms-flow-from": "[none|<custom-ident>]#",
		"-ms-flow-into": "[none|<custom-ident>]#",
		"-ms-grid-columns": "none|<track-list>|<auto-track-list>",
		"-ms-grid-rows": "none|<track-list>|<auto-track-list>",
		"-ms-high-contrast-adjust": "auto|none",
		"-ms-hyphenate-limit-chars": "auto|<integer>{1,3}",
		"-ms-hyphenate-limit-lines": "no-limit|<integer>",
		"-ms-hyphenate-limit-zone": "<percentage>|<length>",
		"-ms-ime-align": "auto|after",
		"-ms-overflow-style": "auto|none|scrollbar|-ms-autohiding-scrollbar",
		"-ms-scroll-chaining": "chained|none",
		"-ms-scroll-limit": "<'-ms-scroll-limit-x-min'> <'-ms-scroll-limit-y-min'> <'-ms-scroll-limit-x-max'> <'-ms-scroll-limit-y-max'>",
		"-ms-scroll-limit-x-max": "auto|<length>",
		"-ms-scroll-limit-x-min": "<length>",
		"-ms-scroll-limit-y-max": "auto|<length>",
		"-ms-scroll-limit-y-min": "<length>",
		"-ms-scroll-rails": "none|railed",
		"-ms-scroll-snap-points-x": "snapInterval( <length-percentage> , <length-percentage> )|snapList( <length-percentage># )",
		"-ms-scroll-snap-points-y": "snapInterval( <length-percentage> , <length-percentage> )|snapList( <length-percentage># )",
		"-ms-scroll-snap-type": "none|proximity|mandatory",
		"-ms-scroll-snap-x": "<'-ms-scroll-snap-type'> <'-ms-scroll-snap-points-x'>",
		"-ms-scroll-snap-y": "<'-ms-scroll-snap-type'> <'-ms-scroll-snap-points-y'>",
		"-ms-scroll-translation": "none|vertical-to-horizontal",
		"-ms-scrollbar-3dlight-color": "<color>",
		"-ms-scrollbar-arrow-color": "<color>",
		"-ms-scrollbar-base-color": "<color>",
		"-ms-scrollbar-darkshadow-color": "<color>",
		"-ms-scrollbar-face-color": "<color>",
		"-ms-scrollbar-highlight-color": "<color>",
		"-ms-scrollbar-shadow-color": "<color>",
		"-ms-scrollbar-track-color": "<color>",
		"-ms-text-autospace": "none|ideograph-alpha|ideograph-numeric|ideograph-parenthesis|ideograph-space",
		"-ms-touch-select": "grippers|none",
		"-ms-user-select": "none|element|text",
		"-ms-wrap-flow": "auto|both|start|end|maximum|clear",
		"-ms-wrap-margin": "<length>",
		"-ms-wrap-through": "wrap|none",
		"-moz-appearance": "none|button|button-arrow-down|button-arrow-next|button-arrow-previous|button-arrow-up|button-bevel|button-focus|caret|checkbox|checkbox-container|checkbox-label|checkmenuitem|dualbutton|groupbox|listbox|listitem|menuarrow|menubar|menucheckbox|menuimage|menuitem|menuitemtext|menulist|menulist-button|menulist-text|menulist-textfield|menupopup|menuradio|menuseparator|meterbar|meterchunk|progressbar|progressbar-vertical|progresschunk|progresschunk-vertical|radio|radio-container|radio-label|radiomenuitem|range|range-thumb|resizer|resizerpanel|scale-horizontal|scalethumbend|scalethumb-horizontal|scalethumbstart|scalethumbtick|scalethumb-vertical|scale-vertical|scrollbarbutton-down|scrollbarbutton-left|scrollbarbutton-right|scrollbarbutton-up|scrollbarthumb-horizontal|scrollbarthumb-vertical|scrollbartrack-horizontal|scrollbartrack-vertical|searchfield|separator|sheet|spinner|spinner-downbutton|spinner-textfield|spinner-upbutton|splitter|statusbar|statusbarpanel|tab|tabpanel|tabpanels|tab-scroll-arrow-back|tab-scroll-arrow-forward|textfield|textfield-multiline|toolbar|toolbarbutton|toolbarbutton-dropdown|toolbargripper|toolbox|tooltip|treeheader|treeheadercell|treeheadersortarrow|treeitem|treeline|treetwisty|treetwistyopen|treeview|-moz-mac-unified-toolbar|-moz-win-borderless-glass|-moz-win-browsertabbar-toolbox|-moz-win-communicationstext|-moz-win-communications-toolbox|-moz-win-exclude-glass|-moz-win-glass|-moz-win-mediatext|-moz-win-media-toolbox|-moz-window-button-box|-moz-window-button-box-maximized|-moz-window-button-close|-moz-window-button-maximize|-moz-window-button-minimize|-moz-window-button-restore|-moz-window-frame-bottom|-moz-window-frame-left|-moz-window-frame-right|-moz-window-titlebar|-moz-window-titlebar-maximized",
		"-moz-binding": "<url>|none",
		"-moz-border-bottom-colors": "<color>+|none",
		"-moz-border-left-colors": "<color>+|none",
		"-moz-border-right-colors": "<color>+|none",
		"-moz-border-top-colors": "<color>+|none",
		"-moz-context-properties": "none|[fill|fill-opacity|stroke|stroke-opacity]#",
		"-moz-float-edge": "border-box|content-box|margin-box|padding-box",
		"-moz-force-broken-image-icon": "0|1",
		"-moz-orient": "inline|block|horizontal|vertical",
		"-moz-outline-radius": "<outline-radius>{1,4} [/ <outline-radius>{1,4}]?",
		"-moz-outline-radius-bottomleft": "<outline-radius>",
		"-moz-outline-radius-bottomright": "<outline-radius>",
		"-moz-outline-radius-topleft": "<outline-radius>",
		"-moz-outline-radius-topright": "<outline-radius>",
		"-moz-stack-sizing": "ignore|stretch-to-fit",
		"-moz-text-blink": "none|blink",
		"-moz-user-focus": "ignore|normal|select-after|select-before|select-menu|select-same|select-all|none",
		"-moz-user-input": "auto|none|enabled|disabled",
		"-moz-user-modify": "read-only|read-write|write-only",
		"-moz-window-dragging": "drag|no-drag",
		"-moz-window-shadow": "default|menu|tooltip|sheet|none",
		"-webkit-appearance": "none|button|button-bevel|caps-lock-indicator|caret|checkbox|default-button|inner-spin-button|listbox|listitem|media-controls-background|media-controls-fullscreen-background|media-current-time-display|media-enter-fullscreen-button|media-exit-fullscreen-button|media-fullscreen-button|media-mute-button|media-overlay-play-button|media-play-button|media-seek-back-button|media-seek-forward-button|media-slider|media-sliderthumb|media-time-remaining-display|media-toggle-closed-captions-button|media-volume-slider|media-volume-slider-container|media-volume-sliderthumb|menulist|menulist-button|menulist-text|menulist-textfield|meter|progress-bar|progress-bar-value|push-button|radio|scrollbarbutton-down|scrollbarbutton-left|scrollbarbutton-right|scrollbarbutton-up|scrollbargripper-horizontal|scrollbargripper-vertical|scrollbarthumb-horizontal|scrollbarthumb-vertical|scrollbartrack-horizontal|scrollbartrack-vertical|searchfield|searchfield-cancel-button|searchfield-decoration|searchfield-results-button|searchfield-results-decoration|slider-horizontal|slider-vertical|sliderthumb-horizontal|sliderthumb-vertical|square-button|textarea|textfield|-apple-pay-button",
		"-webkit-border-before": "<'border-width'>||<'border-style'>||<color>",
		"-webkit-border-before-color": "<color>",
		"-webkit-border-before-style": "<'border-style'>",
		"-webkit-border-before-width": "<'border-width'>",
		"-webkit-box-reflect": "[above|below|right|left]? <length>? <image>?",
		"-webkit-line-clamp": "none|<integer>",
		"-webkit-mask": "[<mask-reference>||<position> [/ <bg-size>]?||<repeat-style>||[<visual-box>|border|padding|content|text]||[<visual-box>|border|padding|content]]#",
		"-webkit-mask-attachment": "<attachment>#",
		"-webkit-mask-clip": "[<coord-box>|no-clip|border|padding|content|text]#",
		"-webkit-mask-composite": "<composite-style>#",
		"-webkit-mask-image": "<mask-reference>#",
		"-webkit-mask-origin": "[<coord-box>|border|padding|content]#",
		"-webkit-mask-position": "<position>#",
		"-webkit-mask-position-x": "[<length-percentage>|left|center|right]#",
		"-webkit-mask-position-y": "[<length-percentage>|top|center|bottom]#",
		"-webkit-mask-repeat": "<repeat-style>#",
		"-webkit-mask-repeat-x": "repeat|no-repeat|space|round",
		"-webkit-mask-repeat-y": "repeat|no-repeat|space|round",
		"-webkit-mask-size": "<bg-size>#",
		"-webkit-overflow-scrolling": "auto|touch",
		"-webkit-tap-highlight-color": "<color>",
		"-webkit-text-fill-color": "<color>",
		"-webkit-text-stroke": "<length>||<color>",
		"-webkit-text-stroke-color": "<color>",
		"-webkit-text-stroke-width": "<length>",
		"-webkit-touch-callout": "default|none",
		"-webkit-user-modify": "read-only|read-write|read-write-plaintext-only",
		"-webkit-user-select": "auto|none|text|all",
		"accent-color": "auto|<color>",
		"align-content": "normal|<baseline-position>|<content-distribution>|<overflow-position>? <content-position>",
		"align-items": "normal|stretch|<baseline-position>|[<overflow-position>? <self-position>]|anchor-center",
		"align-self": "auto|normal|stretch|<baseline-position>|<overflow-position>? <self-position>|anchor-center",
		"align-tracks": "[normal|<baseline-position>|<content-distribution>|<overflow-position>? <content-position>]#",
		"alignment-baseline": "auto|baseline|before-edge|text-before-edge|middle|central|after-edge|text-after-edge|ideographic|alphabetic|hanging|mathematical",
		"all": "initial|inherit|unset|revert|revert-layer",
		"anchor-name": "none|<dashed-ident>#",
		"anchor-scope": "none|all|<dashed-ident>#",
		"animation": "<single-animation>#",
		"animation-composition": "<single-animation-composition>#",
		"animation-delay": "<time>#",
		"animation-direction": "<single-animation-direction>#",
		"animation-duration": "[auto|<time [0s,∞]>]#",
		"animation-fill-mode": "<single-animation-fill-mode>#",
		"animation-iteration-count": "<single-animation-iteration-count>#",
		"animation-name": "[none|<keyframes-name>]#",
		"animation-play-state": "<single-animation-play-state>#",
		"animation-range": "[<'animation-range-start'> <'animation-range-end'>?]#",
		"animation-range-end": "[normal|<length-percentage>|<timeline-range-name> <length-percentage>?]#",
		"animation-range-start": "[normal|<length-percentage>|<timeline-range-name> <length-percentage>?]#",
		"animation-timeline": "<single-animation-timeline>#",
		"animation-timing-function": "<easing-function>#",
		"animation-trigger": "[none|[<dashed-ident> <animation-action>+]+]#",
		"appearance": "none|auto|<compat-auto>|<compat-special>",
		"aspect-ratio": "auto||<ratio>",
		"backdrop-filter": "none|<filter-value-list>",
		"backface-visibility": "visible|hidden",
		"background": "<bg-layer>#? , <final-bg-layer>",
		"background-attachment": "<attachment>#",
		"background-blend-mode": "<blend-mode>#",
		"background-clip": "<bg-clip>#",
		"background-color": "<color>",
		"background-image": "<bg-image>#",
		"background-origin": "<visual-box>#",
		"background-position": "<bg-position>#",
		"background-position-x": "[center|[[left|right|x-start|x-end]? <length-percentage>?]!]#",
		"background-position-y": "[center|[[top|bottom|y-start|y-end]? <length-percentage>?]!]#",
		"background-repeat": "<repeat-style>#",
		"background-size": "<bg-size>#",
		"baseline-shift": "baseline|sub|super|<svg-length>",
		"baseline-source": "auto|first|last",
		"block-size": "<'width'>",
		"border": "<line-width>||<line-style>||<color>",
		"border-block": "<'border-block-start'>",
		"border-block-color": "<'border-top-color'>{1,2}",
		"border-block-end": "<'border-top-width'>||<'border-top-style'>||<color>",
		"border-block-end-color": "<'border-top-color'>",
		"border-block-end-style": "<'border-top-style'>",
		"border-block-end-width": "<'border-top-width'>",
		"border-block-start": "<'border-top-width'>||<'border-top-style'>||<color>",
		"border-block-start-color": "<'border-top-color'>",
		"border-block-start-style": "<'border-top-style'>",
		"border-block-start-width": "<'border-top-width'>",
		"border-block-style": "<'border-top-style'>{1,2}",
		"border-block-width": "<'border-top-width'>{1,2}",
		"border-bottom": "<line-width>||<line-style>||<color>",
		"border-bottom-color": "<'border-top-color'>",
		"border-bottom-left-radius": "<length-percentage [0,∞]>{1,2}",
		"border-bottom-right-radius": "<length-percentage [0,∞]>{1,2}",
		"border-bottom-style": "<line-style>",
		"border-bottom-width": "<line-width>",
		"border-collapse": "separate|collapse",
		"border-color": "<color>{1,4}",
		"border-end-end-radius": "<'border-top-left-radius'>",
		"border-end-start-radius": "<'border-top-left-radius'>",
		"border-image": "<'border-image-source'>||<'border-image-slice'> [/ <'border-image-width'>|/ <'border-image-width'>? / <'border-image-outset'>]?||<'border-image-repeat'>",
		"border-image-outset": "[<length [0,∞]>|<number [0,∞]>]{1,4}",
		"border-image-repeat": "[stretch|repeat|round|space]{1,2}",
		"border-image-slice": "[<number [0,∞]>|<percentage [0,∞]>]{1,4}&&fill?",
		"border-image-source": "none|<image>",
		"border-image-width": "[<length-percentage [0,∞]>|<number [0,∞]>|auto]{1,4}",
		"border-inline": "<'border-block-start'>",
		"border-inline-color": "<'border-top-color'>{1,2}",
		"border-inline-end": "<'border-top-width'>||<'border-top-style'>||<color>",
		"border-inline-end-color": "<'border-top-color'>",
		"border-inline-end-style": "<'border-top-style'>",
		"border-inline-end-width": "<'border-top-width'>",
		"border-inline-start": "<'border-top-width'>||<'border-top-style'>||<color>",
		"border-inline-start-color": "<'border-top-color'>",
		"border-inline-start-style": "<'border-top-style'>",
		"border-inline-start-width": "<'border-top-width'>",
		"border-inline-style": "<'border-top-style'>{1,2}",
		"border-inline-width": "<'border-top-width'>{1,2}",
		"border-left": "<line-width>||<line-style>||<color>",
		"border-left-color": "<color>",
		"border-left-style": "<line-style>",
		"border-left-width": "<line-width>",
		"border-radius": "<length-percentage [0,∞]>{1,4} [/ <length-percentage [0,∞]>{1,4}]?",
		"border-right": "<line-width>||<line-style>||<color>",
		"border-right-color": "<color>",
		"border-right-style": "<line-style>",
		"border-right-width": "<line-width>",
		"border-spacing": "<length>{1,2}",
		"border-start-end-radius": "<'border-top-left-radius'>",
		"border-start-start-radius": "<'border-top-left-radius'>",
		"border-style": "<line-style>{1,4}",
		"border-top": "<line-width>||<line-style>||<color>",
		"border-top-color": "<color>",
		"border-top-left-radius": "<length-percentage [0,∞]>{1,2}",
		"border-top-right-radius": "<length-percentage [0,∞]>{1,2}",
		"border-top-style": "<line-style>",
		"border-top-width": "<line-width>",
		"border-width": "<line-width>{1,4}",
		"bottom": "auto|<length-percentage>|<anchor()>|<anchor-size()>",
		"box-align": "start|center|end|baseline|stretch",
		"box-decoration-break": "slice|clone",
		"box-direction": "normal|reverse|inherit",
		"box-flex": "<number>",
		"box-flex-group": "<integer>",
		"box-lines": "single|multiple",
		"box-ordinal-group": "<integer>",
		"box-orient": "horizontal|vertical|inline-axis|block-axis|inherit",
		"box-pack": "start|center|end|justify",
		"box-shadow": "none|<shadow>#",
		"box-sizing": "content-box|border-box",
		"break-after": "auto|avoid|always|all|avoid-page|page|left|right|recto|verso|avoid-column|column|avoid-region|region",
		"break-before": "auto|avoid|always|all|avoid-page|page|left|right|recto|verso|avoid-column|column|avoid-region|region",
		"break-inside": "auto|avoid|avoid-page|avoid-column|avoid-region",
		"caption-side": "top|bottom",
		"caret": "<'caret-color'>||<'caret-animation'>||<'caret-shape'>",
		"caret-animation": "auto|manual",
		"caret-color": "auto|<color>",
		"caret-shape": "auto|bar|block|underscore",
		"clear": "none|left|right|both|inline-start|inline-end",
		"clip": "<shape>|auto",
		"clip-path": "<clip-source>|[<basic-shape>||<geometry-box>]|none",
		"clip-rule": "nonzero|evenodd",
		"color": "<color>",
		"color-interpolation-filters": "auto|sRGB|linearRGB",
		"color-scheme": "normal|[light|dark|<custom-ident>]+&&only?",
		"column-count": "<integer>|auto",
		"column-fill": "auto|balance",
		"column-gap": "normal|<length-percentage>",
		"column-height": "auto|<length [0,∞]>",
		"column-rule": "<'column-rule-width'>||<'column-rule-style'>||<'column-rule-color'>",
		"column-rule-color": "<color>",
		"column-rule-style": "<'border-style'>",
		"column-rule-width": "<'border-width'>",
		"column-span": "none|all",
		"column-width": "auto|<length [0,∞]>",
		"column-wrap": "auto|nowrap|wrap",
		"columns": "[<'column-width'>||<'column-count'>] [/ <'column-height'>]?",
		"contain": "none|strict|content|[[size||inline-size]||layout||style||paint]",
		"contain-intrinsic-block-size": "auto? [none|<length>]",
		"contain-intrinsic-height": "auto? [none|<length>]",
		"contain-intrinsic-inline-size": "auto? [none|<length>]",
		"contain-intrinsic-size": "[auto? [none|<length>]]{1,2}",
		"contain-intrinsic-width": "auto? [none|<length>]",
		"container": "<'container-name'> [/ <'container-type'>]?",
		"container-name": "none|<custom-ident>+",
		"container-type": "normal||[size|inline-size]",
		"content": "normal|none|[<content-replacement>|<content-list>] [/ [<string>|<counter>|<attr()>]+]?",
		"content-visibility": "visible|auto|hidden",
		"corner-block-end-shape": "<corner-shape-value>{1,2}",
		"corner-block-start-shape": "<corner-shape-value>{1,2}",
		"corner-bottom-shape": "<corner-shape-value>{1,2}",
		"corner-bottom-left-shape": "<corner-shape-value>",
		"corner-bottom-right-shape": "<corner-shape-value>",
		"corner-end-end-shape": "<corner-shape-value>",
		"corner-end-start-shape": "<corner-shape-value>",
		"corner-inline-end-shape": "<corner-shape-value>{1,2}",
		"corner-inline-start-shape": "<corner-shape-value>{1,2}",
		"corner-left-shape": "<corner-shape-value>{1,2}",
		"corner-right-shape": "<corner-shape-value>{1,2}",
		"corner-shape": "<corner-shape-value>{1,4}",
		"corner-start-start-shape": "<corner-shape-value>",
		"corner-start-end-shape": "<corner-shape-value>",
		"corner-top-shape": "<corner-shape-value>{1,2}",
		"corner-top-left-shape": "<corner-shape-value>",
		"corner-top-right-shape": "<corner-shape-value>",
		"counter-increment": "[<counter-name> <integer>?]+|none",
		"counter-reset": "[<counter-name> <integer>?|<reversed-counter-name> <integer>?]+|none",
		"counter-set": "[<counter-name> <integer>?]+|none",
		"cursor": "[[<url> [<x> <y>]? ,]* [auto|default|none|context-menu|help|pointer|progress|wait|cell|crosshair|text|vertical-text|alias|copy|move|no-drop|not-allowed|e-resize|n-resize|ne-resize|nw-resize|s-resize|se-resize|sw-resize|w-resize|ew-resize|ns-resize|nesw-resize|nwse-resize|col-resize|row-resize|all-scroll|zoom-in|zoom-out|grab|grabbing|hand|-webkit-grab|-webkit-grabbing|-webkit-zoom-in|-webkit-zoom-out|-moz-grab|-moz-grabbing|-moz-zoom-in|-moz-zoom-out]]",
		"cx": "<length>|<percentage>",
		"cy": "<length>|<percentage>",
		"d": "none|path( <string> )",
		"direction": "ltr|rtl",
		"display": "[<display-outside>||<display-inside>]|<display-listitem>|<display-internal>|<display-box>|<display-legacy>|<-non-standard-display>",
		"dominant-baseline": "auto|use-script|no-change|reset-size|ideographic|alphabetic|hanging|mathematical|central|middle|text-after-edge|text-before-edge",
		"dynamic-range-limit": "standard|no-limit|constrained|<dynamic-range-limit-mix()>",
		"empty-cells": "show|hide",
		"field-sizing": "content|fixed",
		"fill": "<paint>",
		"fill-opacity": "<number-zero-one>|<percentage>",
		"fill-rule": "nonzero|evenodd",
		"filter": "none|<filter-value-list>|<-ms-filter-function-list>",
		"flex": "none|[<'flex-grow'> <'flex-shrink'>?||<'flex-basis'>]",
		"flex-basis": "content|<'width'>",
		"flex-direction": "row|row-reverse|column|column-reverse",
		"flex-flow": "<'flex-direction'>||<'flex-wrap'>",
		"flex-grow": "<number>",
		"flex-shrink": "<number>",
		"flex-wrap": "nowrap|wrap|wrap-reverse",
		"float": "left|right|none|inline-start|inline-end",
		"flood-color": "<color>",
		"flood-opacity": "<'opacity'>",
		"font": "[[<'font-style'>||<font-variant-css2>||<'font-weight'>||<font-width-css3>]? <'font-size'> [/ <'line-height'>]? <'font-family'>#]|<system-family-name>|<-non-standard-font>",
		"font-family": "[<family-name>|<generic-family>]#",
		"font-feature-settings": "normal|<feature-tag-value>#",
		"font-kerning": "auto|normal|none",
		"font-language-override": "normal|<string>",
		"font-optical-sizing": "auto|none",
		"font-palette": "normal|light|dark|<palette-identifier>|<palette-mix()>",
		"font-size": "<absolute-size>|<relative-size>|<length-percentage [0,∞]>|math",
		"font-size-adjust": "none|[ex-height|cap-height|ch-width|ic-width|ic-height]? [from-font|<number>]",
		"font-smooth": "auto|never|always|<absolute-size>|<length>",
		"font-stretch": "<font-stretch-absolute>",
		"font-style": "normal|italic|oblique <angle>?",
		"font-synthesis": "none|[weight||style||small-caps||position]",
		"font-synthesis-position": "auto|none",
		"font-synthesis-small-caps": "auto|none",
		"font-synthesis-style": "auto|none",
		"font-synthesis-weight": "auto|none",
		"font-variant": "normal|none|[<common-lig-values>||<discretionary-lig-values>||<historical-lig-values>||<contextual-alt-values>||stylistic( <feature-value-name> )||historical-forms||styleset( <feature-value-name># )||character-variant( <feature-value-name># )||swash( <feature-value-name> )||ornaments( <feature-value-name> )||annotation( <feature-value-name> )||[small-caps|all-small-caps|petite-caps|all-petite-caps|unicase|titling-caps]||<numeric-figure-values>||<numeric-spacing-values>||<numeric-fraction-values>||ordinal||slashed-zero||<east-asian-variant-values>||<east-asian-width-values>||ruby]",
		"font-variant-alternates": "normal|[stylistic( <feature-value-name> )||historical-forms||styleset( <feature-value-name># )||character-variant( <feature-value-name># )||swash( <feature-value-name> )||ornaments( <feature-value-name> )||annotation( <feature-value-name> )]",
		"font-variant-caps": "normal|small-caps|all-small-caps|petite-caps|all-petite-caps|unicase|titling-caps",
		"font-variant-east-asian": "normal|[<east-asian-variant-values>||<east-asian-width-values>||ruby]",
		"font-variant-emoji": "normal|text|emoji|unicode",
		"font-variant-ligatures": "normal|none|[<common-lig-values>||<discretionary-lig-values>||<historical-lig-values>||<contextual-alt-values>]",
		"font-variant-numeric": "normal|[<numeric-figure-values>||<numeric-spacing-values>||<numeric-fraction-values>||ordinal||slashed-zero]",
		"font-variant-position": "normal|sub|super",
		"font-variation-settings": "normal|[<string> <number>]#",
		"font-weight": "<font-weight-absolute>|bolder|lighter",
		"font-width": "normal|<percentage [0,∞]>|ultra-condensed|extra-condensed|condensed|semi-condensed|semi-expanded|expanded|extra-expanded|ultra-expanded",
		"forced-color-adjust": "auto|none|preserve-parent-color",
		"gap": "<'row-gap'> <'column-gap'>?",
		"grid": "<'grid-template'>|<'grid-template-rows'> / [auto-flow&&dense?] <'grid-auto-columns'>?|[auto-flow&&dense?] <'grid-auto-rows'>? / <'grid-template-columns'>",
		"grid-area": "<grid-line> [/ <grid-line>]{0,3}",
		"grid-auto-columns": "<track-size>+",
		"grid-auto-flow": "[row|column]||dense",
		"grid-auto-rows": "<track-size>+",
		"grid-column": "<grid-line> [/ <grid-line>]?",
		"grid-column-end": "<grid-line>",
		"grid-column-gap": "<length-percentage>",
		"grid-column-start": "<grid-line>",
		"grid-gap": "<'grid-row-gap'> <'grid-column-gap'>?",
		"grid-row": "<grid-line> [/ <grid-line>]?",
		"grid-row-end": "<grid-line>",
		"grid-row-gap": "<length-percentage>",
		"grid-row-start": "<grid-line>",
		"grid-template": "none|[<'grid-template-rows'> / <'grid-template-columns'>]|[<line-names>? <string> <track-size>? <line-names>?]+ [/ <explicit-track-list>]?",
		"grid-template-areas": "none|<string>+",
		"grid-template-columns": "none|<track-list>|<auto-track-list>|subgrid <line-name-list>?",
		"grid-template-rows": "none|<track-list>|<auto-track-list>|subgrid <line-name-list>?",
		"hanging-punctuation": "none|[first||[force-end|allow-end]||last]",
		"height": "auto|<length-percentage [0,∞]>|min-content|max-content|fit-content|fit-content( <length-percentage [0,∞]> )|<calc-size()>|<anchor-size()>|stretch|<-non-standard-size>",
		"hyphenate-character": "auto|<string>",
		"hyphenate-limit-chars": "[auto|<integer>]{1,3}",
		"hyphens": "none|manual|auto",
		"image-orientation": "from-image|<angle>|[<angle>? flip]",
		"image-rendering": "auto|crisp-edges|pixelated|smooth|optimizeSpeed|optimizeQuality|<-non-standard-image-rendering>",
		"image-resolution": "[from-image||<resolution>]&&snap?",
		"ime-mode": "auto|normal|active|inactive|disabled",
		"initial-letter": "normal|[<number> <integer>?]",
		"initial-letter-align": "[auto|alphabetic|hanging|ideographic]",
		"inline-size": "<'width'>",
		"inset": "<'top'>{1,4}",
		"inset-block": "<'top'>{1,2}",
		"inset-block-end": "<'top'>",
		"inset-block-start": "<'top'>",
		"inset-inline": "<'top'>{1,2}",
		"inset-inline-end": "<'top'>",
		"inset-inline-start": "<'top'>",
		"interpolate-size": "numeric-only|allow-keywords",
		"isolation": "auto|isolate",
		"interactivity": "auto|inert",
		"interest-delay": "<'interest-delay-start'>{1,2}",
		"interest-delay-end": "normal|<time>",
		"interest-delay-start": "normal|<time>",
		"justify-content": "normal|<content-distribution>|<overflow-position>? [<content-position>|left|right]",
		"justify-items": "normal|stretch|<baseline-position>|<overflow-position>? [<self-position>|left|right]|legacy|legacy&&[left|right|center]|anchor-center",
		"justify-self": "auto|normal|stretch|<baseline-position>|<overflow-position>? [<self-position>|left|right]|anchor-center",
		"justify-tracks": "[normal|<content-distribution>|<overflow-position>? [<content-position>|left|right]]#",
		"left": "auto|<length-percentage>|<anchor()>|<anchor-size()>",
		"letter-spacing": "normal|<length-percentage>",
		"lighting-color": "<color>",
		"line-break": "auto|loose|normal|strict|anywhere",
		"line-clamp": "none|<integer>",
		"line-height": "normal|<number>|<length>|<percentage>",
		"line-height-step": "<length>",
		"list-style": "<'list-style-type'>||<'list-style-position'>||<'list-style-image'>",
		"list-style-image": "<image>|none",
		"list-style-position": "inside|outside",
		"list-style-type": "<counter-style>|<string>|none",
		"margin": "<'margin-top'>{1,4}",
		"margin-block": "<'margin-top'>{1,2}",
		"margin-block-end": "<'margin-top'>",
		"margin-block-start": "<'margin-top'>",
		"margin-bottom": "<length-percentage>|auto|<anchor-size()>",
		"margin-inline": "<'margin-top'>{1,2}",
		"margin-inline-end": "<'margin-top'>",
		"margin-inline-start": "<'margin-top'>",
		"margin-left": "<length-percentage>|auto|<anchor-size()>",
		"margin-right": "<length-percentage>|auto|<anchor-size()>",
		"margin-top": "<length-percentage>|auto|<anchor-size()>",
		"margin-trim": "none|in-flow|all",
		"marker": "none|<url>",
		"marker-end": "none|<url>",
		"marker-mid": "none|<url>",
		"marker-start": "none|<url>",
		"mask": "<mask-layer>#",
		"mask-border": "<'mask-border-source'>||<'mask-border-slice'> [/ <'mask-border-width'>? [/ <'mask-border-outset'>]?]?||<'mask-border-repeat'>||<'mask-border-mode'>",
		"mask-border-mode": "luminance|alpha",
		"mask-border-outset": "[<length>|<number>]{1,4}",
		"mask-border-repeat": "[stretch|repeat|round|space]{1,2}",
		"mask-border-slice": "<number-percentage>{1,4} fill?",
		"mask-border-source": "none|<image>",
		"mask-border-width": "[<length-percentage>|<number>|auto]{1,4}",
		"mask-clip": "[<coord-box>|no-clip]#",
		"mask-composite": "<compositing-operator>#",
		"mask-image": "<mask-reference>#",
		"mask-mode": "<masking-mode>#",
		"mask-origin": "<coord-box>#",
		"mask-position": "<position>#",
		"mask-repeat": "<repeat-style>#",
		"mask-size": "<bg-size>#",
		"mask-type": "luminance|alpha",
		"masonry-auto-flow": "[pack|next]||[definite-first|ordered]",
		"math-depth": "auto-add|add( <integer> )|<integer>",
		"math-shift": "normal|compact",
		"math-style": "normal|compact",
		"max-block-size": "<'max-width'>",
		"max-height": "none|<length-percentage [0,∞]>|min-content|max-content|fit-content|fit-content( <length-percentage [0,∞]> )|<calc-size()>|<anchor-size()>|stretch|<-non-standard-size>",
		"max-inline-size": "<'max-width'>",
		"max-lines": "none|<integer>",
		"max-width": "none|<length-percentage [0,∞]>|min-content|max-content|fit-content|fit-content( <length-percentage [0,∞]> )|<calc-size()>|<anchor-size()>|stretch|<-non-standard-size>",
		"min-block-size": "<'min-width'>",
		"min-height": "auto|<length-percentage [0,∞]>|min-content|max-content|fit-content|fit-content( <length-percentage [0,∞]> )|<calc-size()>|<anchor-size()>|stretch|<-non-standard-size>",
		"min-inline-size": "<'min-width'>",
		"min-width": "auto|<length-percentage [0,∞]>|min-content|max-content|fit-content|fit-content( <length-percentage [0,∞]> )|<calc-size()>|<anchor-size()>|stretch|<-non-standard-size>",
		"mix-blend-mode": "<blend-mode>|plus-darker|plus-lighter",
		"object-fit": "fill|contain|cover|none|scale-down",
		"object-position": "<position>",
		"object-view-box": "none|<basic-shape-rect>",
		"offset": "[<'offset-position'>? [<'offset-path'> [<'offset-distance'>||<'offset-rotate'>]?]?]! [/ <'offset-anchor'>]?",
		"offset-anchor": "auto|<position>",
		"offset-distance": "<length-percentage>",
		"offset-path": "none|<offset-path>||<coord-box>",
		"offset-position": "normal|auto|<position>",
		"offset-rotate": "[auto|reverse]||<angle>",
		"opacity": "<opacity-value>",
		"order": "<integer>",
		"orphans": "<integer>",
		"outline": "<'outline-width'>||<'outline-style'>||<'outline-color'>",
		"outline-color": "auto|<color>",
		"outline-offset": "<length>",
		"outline-style": "auto|<outline-line-style>",
		"outline-width": "<line-width>",
		"overflow": "[visible|hidden|clip|scroll|auto]{1,2}|<-non-standard-overflow>",
		"overflow-anchor": "auto|none",
		"overflow-block": "visible|hidden|clip|scroll|auto|<-non-standard-overflow>",
		"overflow-clip-box": "padding-box|content-box",
		"overflow-clip-margin": "<visual-box>||<length [0,∞]>",
		"overflow-inline": "visible|hidden|clip|scroll|auto|<-non-standard-overflow>",
		"overflow-wrap": "normal|break-word|anywhere",
		"overflow-x": "visible|hidden|clip|scroll|auto|<-non-standard-overflow>",
		"overflow-y": "visible|hidden|clip|scroll|auto|<-non-standard-overflow>",
		"overlay": "none|auto",
		"overscroll-behavior": "[contain|none|auto]{1,2}",
		"overscroll-behavior-block": "contain|none|auto",
		"overscroll-behavior-inline": "contain|none|auto",
		"overscroll-behavior-x": "contain|none|auto",
		"overscroll-behavior-y": "contain|none|auto",
		"padding": "<'padding-top'>{1,4}",
		"padding-block": "<'padding-top'>{1,2}",
		"padding-block-end": "<'padding-top'>",
		"padding-block-start": "<'padding-top'>",
		"padding-bottom": "<length-percentage [0,∞]>",
		"padding-inline": "<'padding-top'>{1,2}",
		"padding-inline-end": "<'padding-top'>",
		"padding-inline-start": "<'padding-top'>",
		"padding-left": "<length-percentage [0,∞]>",
		"padding-right": "<length-percentage [0,∞]>",
		"padding-top": "<length-percentage [0,∞]>",
		"page": "auto|<custom-ident>",
		"page-break-after": "auto|always|avoid|left|right|recto|verso",
		"page-break-before": "auto|always|avoid|left|right|recto|verso",
		"page-break-inside": "auto|avoid",
		"paint-order": "normal|[fill||stroke||markers]",
		"perspective": "none|<length>",
		"perspective-origin": "<position>",
		"place-content": "<'align-content'> <'justify-content'>?",
		"place-items": "<'align-items'> <'justify-items'>?",
		"place-self": "<'align-self'> <'justify-self'>?",
		"pointer-events": "auto|none|visiblePainted|visibleFill|visibleStroke|visible|painted|fill|stroke|all|inherit",
		"position": "static|relative|absolute|sticky|fixed|-webkit-sticky",
		"position-anchor": "auto|none|<anchor-name>",
		"position-area": "none|<position-area>",
		"position-try": "<'position-try-order'>? <'position-try-fallbacks'>",
		"position-try-fallbacks": "none|[[<dashed-ident>||<try-tactic>]|<'position-area'>]#",
		"position-try-order": "normal|<try-size>",
		"position-visibility": "always|[anchors-valid||anchors-visible||no-overflow]",
		"print-color-adjust": "economy|exact",
		"quotes": "none|auto|[<string> <string>]+",
		"r": "<length>|<percentage>",
		"reading-flow": "normal|source-order|flex-visual|flex-flow|grid-rows|grid-columns|grid-order",
		"reading-order": "<integer>",
		"resize": "none|both|horizontal|vertical|block|inline",
		"right": "auto|<length-percentage>|<anchor()>|<anchor-size()>",
		"rotate": "none|<angle>|[x|y|z|<number>{3}]&&<angle>",
		"row-gap": "normal|<length-percentage>",
		"ruby-align": "start|center|space-between|space-around",
		"ruby-merge": "separate|collapse|auto",
		"ruby-overhang": "auto|none",
		"ruby-position": "[alternate||[over|under]]|inter-character",
		"rx": "<length>|<percentage>",
		"ry": "<length>|<percentage>",
		"scale": "none|[<number>|<percentage>]{1,3}",
		"scroll-behavior": "auto|smooth",
		"scroll-initial-target": "none|nearest",
		"scroll-margin": "<length>{1,4}",
		"scroll-margin-block": "<length>{1,2}",
		"scroll-margin-block-end": "<length>",
		"scroll-margin-block-start": "<length>",
		"scroll-margin-bottom": "<length>",
		"scroll-margin-inline": "<length>{1,2}",
		"scroll-margin-inline-end": "<length>",
		"scroll-margin-inline-start": "<length>",
		"scroll-margin-left": "<length>",
		"scroll-margin-right": "<length>",
		"scroll-margin-top": "<length>",
		"scroll-marker-group": "none|before|after",
		"scroll-padding": "[auto|<length-percentage>]{1,4}",
		"scroll-padding-block": "[auto|<length-percentage>]{1,2}",
		"scroll-padding-block-end": "auto|<length-percentage>",
		"scroll-padding-block-start": "auto|<length-percentage>",
		"scroll-padding-bottom": "auto|<length-percentage>",
		"scroll-padding-inline": "[auto|<length-percentage>]{1,2}",
		"scroll-padding-inline-end": "auto|<length-percentage>",
		"scroll-padding-inline-start": "auto|<length-percentage>",
		"scroll-padding-left": "auto|<length-percentage>",
		"scroll-padding-right": "auto|<length-percentage>",
		"scroll-padding-top": "auto|<length-percentage>",
		"scroll-snap-align": "[none|start|end|center]{1,2}",
		"scroll-snap-coordinate": "none|<position>#",
		"scroll-snap-destination": "<position>",
		"scroll-snap-points-x": "none|repeat( <length-percentage> )",
		"scroll-snap-points-y": "none|repeat( <length-percentage> )",
		"scroll-snap-stop": "normal|always",
		"scroll-snap-type": "none|[x|y|block|inline|both] [mandatory|proximity]?",
		"scroll-snap-type-x": "none|mandatory|proximity",
		"scroll-snap-type-y": "none|mandatory|proximity",
		"scroll-target-group": "none|auto",
		"scroll-timeline": "[<'scroll-timeline-name'> <'scroll-timeline-axis'>?]#",
		"scroll-timeline-axis": "[block|inline|x|y]#",
		"scroll-timeline-name": "[none|<dashed-ident>]#",
		"scrollbar-color": "auto|<color>{2}",
		"scrollbar-gutter": "auto|stable&&both-edges?",
		"scrollbar-width": "auto|thin|none",
		"shape-image-threshold": "<opacity-value>",
		"shape-margin": "<length-percentage>",
		"shape-outside": "none|[<shape-box>||<basic-shape>]|<image>",
		"shape-rendering": "auto|optimizeSpeed|crispEdges|geometricPrecision",
		"speak-as": "normal|spell-out||digits||[literal-punctuation|no-punctuation]",
		"stop-color": "<'color'>",
		"stop-opacity": "<'opacity'>",
		"stroke": "<paint>",
		"stroke-color": "<color>",
		"stroke-dasharray": "none|[<svg-length>+]#",
		"stroke-dashoffset": "<svg-length>",
		"stroke-linecap": "butt|round|square",
		"stroke-linejoin": "miter|round|bevel",
		"stroke-miterlimit": "<number-one-or-greater>",
		"stroke-opacity": "<'opacity'>",
		"stroke-width": "<svg-length>",
		"tab-size": "<integer>|<length>",
		"table-layout": "auto|fixed",
		"text-align": "start|end|left|right|center|justify|match-parent",
		"text-align-last": "auto|start|end|left|right|center|justify",
		"text-anchor": "start|middle|end",
		"text-autospace": "normal|<autospace>|auto",
		"text-box": "normal|<'text-box-trim'>||<'text-box-edge'>",
		"text-box-edge": "auto|<text-edge>",
		"text-box-trim": "none|trim-start|trim-end|trim-both",
		"text-combine-upright": "none|all|[digits <integer>?]",
		"text-decoration": "<'text-decoration-line'>||<'text-decoration-style'>||<'text-decoration-color'>||<'text-decoration-thickness'>",
		"text-decoration-color": "<color>",
		"text-decoration-inset": "<length>{1,2}|auto",
		"text-decoration-line": "none|[underline||overline||line-through||blink]|spelling-error|grammar-error",
		"text-decoration-skip": "none|[objects||[spaces|[leading-spaces||trailing-spaces]]||edges||box-decoration]",
		"text-decoration-skip-ink": "auto|all|none",
		"text-decoration-style": "solid|double|dotted|dashed|wavy",
		"text-decoration-thickness": "auto|from-font|<length>|<percentage>",
		"text-emphasis": "<'text-emphasis-style'>||<'text-emphasis-color'>",
		"text-emphasis-color": "<color>",
		"text-emphasis-position": "auto|[over|under]&&[right|left]?",
		"text-emphasis-style": "none|[[filled|open]||[dot|circle|double-circle|triangle|sesame]]|<string>",
		"text-indent": "<length-percentage>&&hanging?&&each-line?",
		"text-justify": "auto|inter-character|inter-word|none",
		"text-orientation": "mixed|upright|sideways",
		"text-overflow": "[clip|ellipsis|<string>]{1,2}",
		"text-rendering": "auto|optimizeSpeed|optimizeLegibility|geometricPrecision",
		"text-shadow": "none|<shadow-t>#",
		"text-size-adjust": "none|auto|<percentage>",
		"text-spacing-trim": "space-all|normal|space-first|trim-start",
		"text-transform": "none|[capitalize|uppercase|lowercase]||full-width||full-size-kana|math-auto",
		"text-underline-offset": "auto|<length>|<percentage>",
		"text-underline-position": "auto|from-font|[under||[left|right]]",
		"text-wrap": "<'text-wrap-mode'>||<'text-wrap-style'>",
		"text-wrap-mode": "wrap|nowrap",
		"text-wrap-style": "auto|balance|stable|pretty",
		"timeline-scope": "none|<dashed-ident>#",
		"timeline-trigger": "none|[<'timeline-trigger-name'> <'timeline-trigger-source'> <'timeline-trigger-range'> ['/' <'timeline-trigger-exit-range'>]?]#",
		"timeline-trigger-name": "none|<dashed-ident>#",
		"timeline-trigger-exit-range": "[<'timeline-trigger-exit-range-start'> <'timeline-trigger-exit-range-end'>?]#",
		"timeline-trigger-exit-range-end": "[auto|normal|<length-percentage>|<timeline-range-name> <length-percentage>?]#",
		"timeline-trigger-exit-range-start": "[auto|normal|<length-percentage>|<timeline-range-name> <length-percentage>?]#",
		"timeline-trigger-range": "[<'timeline-trigger-range-start'> <'timeline-trigger-range-end'>?]#",
		"timeline-trigger-range-end": "[normal|<length-percentage>|<timeline-range-name> <length-percentage>?]#",
		"timeline-trigger-range-start": "[normal|<length-percentage>|<timeline-range-name> <length-percentage>?]#",
		"timeline-trigger-source": "<single-animation-timeline>#",
		"top": "auto|<length-percentage>|<anchor()>|<anchor-size()>",
		"touch-action": "auto|none|[[pan-x|pan-left|pan-right]||[pan-y|pan-up|pan-down]||pinch-zoom]|manipulation",
		"transform": "none|<transform-list>",
		"transform-box": "content-box|border-box|fill-box|stroke-box|view-box",
		"transform-origin": "[<length-percentage>|left|center|right|top|bottom]|[[<length-percentage>|left|center|right]&&[<length-percentage>|top|center|bottom]] <length>?",
		"transform-style": "flat|preserve-3d",
		"transition": "<single-transition>#",
		"transition-behavior": "<transition-behavior-value>#",
		"transition-delay": "<time>#",
		"transition-duration": "<time>#",
		"transition-property": "none|<single-transition-property>#",
		"transition-timing-function": "<easing-function>#",
		"translate": "none|<length-percentage> [<length-percentage> <length>?]?",
		"trigger-scope": "none|all|<dashed-ident>#",
		"unicode-bidi": "normal|embed|isolate|bidi-override|isolate-override|plaintext|-moz-isolate|-moz-isolate-override|-moz-plaintext|-webkit-isolate|-webkit-isolate-override|-webkit-plaintext",
		"user-select": "auto|text|none|all",
		"vector-effect": "none|non-scaling-stroke|non-scaling-size|non-rotation|fixed-position",
		"vertical-align": "baseline|sub|super|text-top|text-bottom|middle|top|bottom|<percentage>|<length>",
		"view-timeline": "[<'view-timeline-name'> [<'view-timeline-axis'>||<'view-timeline-inset'>]?]#",
		"view-timeline-axis": "[block|inline|x|y]#",
		"view-timeline-inset": "[[auto|<length-percentage>]{1,2}]#",
		"view-timeline-name": "[none|<dashed-ident>]#",
		"view-transition-class": "none|<custom-ident>+",
		"view-transition-name": "none|<custom-ident>|match-element",
		"visibility": "visible|hidden|collapse",
		"white-space": "normal|pre|pre-wrap|pre-line|<'white-space-collapse'>||<'text-wrap-mode'>",
		"white-space-collapse": "collapse|preserve|preserve-breaks|preserve-spaces|break-spaces",
		"widows": "<integer>",
		"width": "auto|<length-percentage [0,∞]>|min-content|max-content|fit-content|fit-content( <length-percentage [0,∞]> )|<calc-size()>|<anchor-size()>|stretch|<-non-standard-size>",
		"will-change": "auto|<animateable-feature>#",
		"word-break": "normal|break-all|keep-all|break-word|auto-phrase",
		"word-spacing": "normal|<length>",
		"word-wrap": "normal|break-word",
		"writing-mode": "horizontal-tb|vertical-rl|vertical-lr|sideways-rl|sideways-lr|<svg-writing-mode>",
		"x": "<length>|<percentage>",
		"y": "<length>|<percentage>",
		"z-index": "auto|<integer>",
		"zoom": "normal|reset|<number [0,∞]>||<percentage [0,∞]>",
		"-moz-background-clip": "padding|border",
		"-moz-border-radius-bottomleft": "<'border-bottom-left-radius'>",
		"-moz-border-radius-bottomright": "<'border-bottom-right-radius'>",
		"-moz-border-radius-topleft": "<'border-top-left-radius'>",
		"-moz-border-radius-topright": "<'border-bottom-right-radius'>",
		"-moz-control-character-visibility": "visible|hidden",
		"-moz-osx-font-smoothing": "auto|grayscale",
		"-moz-user-select": "none|text|all|-moz-none",
		"-ms-flex-align": "start|end|center|baseline|stretch",
		"-ms-flex-item-align": "auto|start|end|center|baseline|stretch",
		"-ms-flex-line-pack": "start|end|center|justify|distribute|stretch",
		"-ms-flex-negative": "<'flex-shrink'>",
		"-ms-flex-pack": "start|end|center|justify|distribute",
		"-ms-flex-order": "<integer>",
		"-ms-flex-positive": "<'flex-grow'>",
		"-ms-flex-preferred-size": "<'flex-basis'>",
		"-ms-interpolation-mode": "nearest-neighbor|bicubic",
		"-ms-grid-column-align": "start|end|center|stretch",
		"-ms-grid-row-align": "start|end|center|stretch",
		"-ms-hyphenate-limit-last": "none|always|column|page|spread",
		"-webkit-background-clip": "[<visual-box>|border|padding|content|text]#",
		"-webkit-column-break-after": "always|auto|avoid",
		"-webkit-column-break-before": "always|auto|avoid",
		"-webkit-column-break-inside": "always|auto|avoid",
		"-webkit-font-smoothing": "auto|none|antialiased|subpixel-antialiased",
		"-webkit-mask-box-image": "[<url>|<gradient>|none] [<length-percentage>{4} <-webkit-mask-box-repeat>{2}]?",
		"-webkit-print-color-adjust": "economy|exact",
		"-webkit-text-security": "none|circle|disc|square",
		"-webkit-user-drag": "none|element|auto",
		"behavior": "<url>+",
		"cue": "<'cue-before'> <'cue-after'>?",
		"cue-after": "<url> <decibel>?|none",
		"cue-before": "<url> <decibel>?|none",
		"glyph-orientation-horizontal": "<angle>",
		"glyph-orientation-vertical": "<angle>",
		"kerning": "auto|<svg-length>",
		"pause": "<'pause-before'> <'pause-after'>?",
		"pause-after": "<time>|none|x-weak|weak|medium|strong|x-strong",
		"pause-before": "<time>|none|x-weak|weak|medium|strong|x-strong",
		"position-try-options": "<'position-try-fallbacks'>",
		"rest": "<'rest-before'> <'rest-after'>?",
		"rest-after": "<time>|none|x-weak|weak|medium|strong|x-strong",
		"rest-before": "<time>|none|x-weak|weak|medium|strong|x-strong",
		"speak": "auto|never|always",
		"voice-balance": "<number>|left|center|right|leftwards|rightwards",
		"voice-duration": "auto|<time>",
		"voice-family": "[[<family-name>|<generic-voice>] ,]* [<family-name>|<generic-voice>]|preserve",
		"voice-pitch": "<frequency>&&absolute|[[x-low|low|medium|high|x-high]||[<frequency>|<semitones>|<percentage>]]",
		"voice-range": "<frequency>&&absolute|[[x-low|low|medium|high|x-high]||[<frequency>|<semitones>|<percentage>]]",
		"voice-rate": "[normal|x-slow|slow|medium|fast|x-fast]||<percentage>",
		"voice-stress": "normal|strong|moderate|none|reduced",
		"voice-volume": "silent|[[x-soft|soft|medium|loud|x-loud]||<decibel>]",
		"white-space-trim": "none|discard-before||discard-after||discard-inner"
	},
	"atrules": {
		"charset": {
			"prelude": "<string>",
			"descriptors": null
		},
		"counter-style": {
			"prelude": "<counter-style-name>",
			"descriptors": {
				"additive-symbols": "[<integer [0,∞]>&&<symbol>]#",
				"fallback": "<counter-style-name>",
				"negative": "<symbol> <symbol>?",
				"pad": "<integer [0,∞]>&&<symbol>",
				"prefix": "<symbol>",
				"range": "[[<integer>|infinite]{2}]#|auto",
				"speak-as": "auto|bullets|numbers|words|spell-out|<counter-style-name>",
				"suffix": "<symbol>",
				"symbols": "<symbol>+",
				"system": "cyclic|numeric|alphabetic|symbolic|additive|[fixed <integer>?]|[extends <counter-style-name>]"
			}
		},
		"container": {
			"prelude": "[<container-name>]? <container-condition>",
			"descriptors": null
		},
		"document": {
			"prelude": "[<url>|url-prefix( <string> )|domain( <string> )|media-document( <string> )|regexp( <string> )]#",
			"descriptors": null
		},
		"font-face": {
			"prelude": null,
			"descriptors": {
				"ascent-override": "normal|<percentage>",
				"descent-override": "normal|<percentage>",
				"font-display": "auto|block|swap|fallback|optional",
				"font-family": "<family-name>",
				"font-feature-settings": "normal|<feature-tag-value>#",
				"font-stretch": "<font-stretch-absolute>{1,2}",
				"font-style": "normal|italic|oblique <angle>{0,2}",
				"font-variation-settings": "normal|[<string> <number>]#",
				"font-weight": "<font-weight-absolute>{1,2}",
				"line-gap-override": "normal|<percentage>",
				"size-adjust": "<percentage>",
				"src": "[<url> [format( <string># )]?|local( <family-name> )]#",
				"unicode-range": "<urange>#"
			}
		},
		"font-feature-values": {
			"prelude": "<family-name>#",
			"descriptors": null
		},
		"font-palette-values": {
			"prelude": "<dashed-ident>",
			"descriptors": {
				"base-palette": "light|dark|<integer [0,∞]>",
				"font-family": "<family-name>#",
				"override-colors": "[<integer [0,∞]> <color>]#"
			}
		},
		"import": {
			"prelude": "[<string>|<url>] [layer|layer( <layer-name> )]? [supports( [<supports-condition>|<declaration>] )]? <media-query-list>?",
			"descriptors": null
		},
		"keyframes": {
			"prelude": "<keyframes-name>",
			"descriptors": null
		},
		"layer": {
			"prelude": "[<layer-name>#|<layer-name>?]",
			"descriptors": null
		},
		"media": {
			"prelude": "<media-query-list>",
			"descriptors": null
		},
		"namespace": {
			"prelude": "<namespace-prefix>? [<string>|<url>]",
			"descriptors": null
		},
		"page": {
			"prelude": "<page-selector-list>",
			"descriptors": {
				"bleed": "auto|<length>",
				"marks": "none|[crop||cross]",
				"page-orientation": "upright|rotate-left|rotate-right",
				"size": "<length [0,∞]>{1,2}|auto|[<page-size>||[portrait|landscape]]"
			}
		},
		"position-try": {
			"prelude": "<dashed-ident>",
			"descriptors": {
				"top": "<'top'>",
				"left": "<'left'>",
				"bottom": "<'bottom'>",
				"right": "<'right'>",
				"inset-block-start": "<'inset-block-start'>",
				"inset-block-end": "<'inset-block-end'>",
				"inset-inline-start": "<'inset-inline-start'>",
				"inset-inline-end": "<'inset-inline-end'>",
				"inset-block": "<'inset-block'>",
				"inset-inline": "<'inset-inline'>",
				"inset": "<'inset'>",
				"margin-top": "<'margin-top'>",
				"margin-left": "<'margin-left'>",
				"margin-bottom": "<'margin-bottom'>",
				"margin-right": "<'margin-right'>",
				"margin-block-start": "<'margin-block-start'>",
				"margin-block-end": "<'margin-block-end'>",
				"margin-inline-start": "<'margin-inline-start'>",
				"margin-inline-end": "<'margin-inline-end'>",
				"margin": "<'margin'>",
				"margin-block": "<'margin-block'>",
				"margin-inline": "<'margin-inline'>",
				"width": "<'width'>",
				"height": "<'height'>",
				"min-width": "<'min-width'>",
				"min-height": "<'min-height'>",
				"max-width": "<'max-width'>",
				"max-height": "<'max-height'>",
				"block-size": "<'block-size'>",
				"inline-size": "<'inline-size'>",
				"min-block-size": "<'min-block-size'>",
				"min-inline-size": "<'min-inline-size'>",
				"max-block-size": "<'max-block-size'>",
				"max-inline-size": "<'max-inline-size'>",
				"align-self": "<'align-self'>|anchor-center",
				"justify-self": "<'justify-self'>|anchor-center"
			}
		},
		"property": {
			"prelude": "<custom-property-name>",
			"descriptors": {
				"inherits": "true|false",
				"initial-value": "<declaration-value>?",
				"syntax": "<string>"
			}
		},
		"scope": {
			"prelude": "[( <scope-start> )]? [to ( <scope-end> )]?",
			"descriptors": null
		},
		"starting-style": {
			"prelude": null,
			"descriptors": null
		},
		"supports": {
			"prelude": "<supports-condition>",
			"descriptors": null
		},
		"view-transition": {
			"prelude": null,
			"descriptors": {
				"navigation": "auto|none",
				"types": "none|<custom-ident>+"
			}
		},
		"font-features-values": {
			"prelude": "[<string>|<custom-ident>]+",
			"descriptors": { "font-display": "auto|block|swap|fallback|optional" }
		}
	}
};
//#endregion
//#region node_modules/.pnpm/css-tree@3.2.1/node_modules/css-tree/lib/syntax/node/AnPlusB.js
var AnPlusB_exports = /* @__PURE__ */ __exportAll({
	generate: () => generate$49,
	name: () => name$48,
	parse: () => parse$50,
	structure: () => structure$48
});
const PLUSSIGN$5 = 43;
const HYPHENMINUS$2 = 45;
const N = 110;
const DISALLOW_SIGN = true;
const ALLOW_SIGN = false;
function checkInteger(offset, disallowSign) {
	let pos = this.tokenStart + offset;
	const code = this.charCodeAt(pos);
	if (code === PLUSSIGN$5 || code === HYPHENMINUS$2) {
		if (disallowSign) this.error("Number sign is not allowed");
		pos++;
	}
	for (; pos < this.tokenEnd; pos++) if (!isDigit(this.charCodeAt(pos))) this.error("Integer is expected", pos);
}
function checkTokenIsInteger(disallowSign) {
	return checkInteger.call(this, 0, disallowSign);
}
function expectCharCode(offset, code) {
	if (!this.cmpChar(this.tokenStart + offset, code)) {
		let msg = "";
		switch (code) {
			case N:
				msg = "N is expected";
				break;
			case HYPHENMINUS$2: msg = "HyphenMinus is expected";
		}
		this.error(msg, this.tokenStart + offset);
	}
}
function consumeB() {
	let offset = 0;
	let sign = 0;
	let type = this.tokenType;
	while (type === 13 || type === 25) type = this.lookupType(++offset);
	if (type !== 10) {
		if (this.isDelim(PLUSSIGN$5, offset) || this.isDelim(HYPHENMINUS$2, offset)) {
			sign = this.isDelim(PLUSSIGN$5, offset) ? PLUSSIGN$5 : HYPHENMINUS$2;
			do
				type = this.lookupType(++offset);
			while (type === 13 || type === 25);
			if (type !== 10) {
				this.skip(offset);
				checkTokenIsInteger.call(this, DISALLOW_SIGN);
			}
		} else return null;
	}
	if (offset > 0) this.skip(offset);
	if (sign === 0) {
		type = this.charCodeAt(this.tokenStart);
		if (type !== PLUSSIGN$5 && type !== HYPHENMINUS$2) this.error("Number sign is expected");
	}
	checkTokenIsInteger.call(this, sign !== 0);
	return sign === HYPHENMINUS$2 ? "-" + this.consume(10) : this.consume(10);
}
const name$48 = "AnPlusB";
const structure$48 = {
	a: [String, null],
	b: [String, null]
};
function parse$50() {
	const start = this.tokenStart;
	let a = null;
	let b = null;
	if (this.tokenType === 10) {
		checkTokenIsInteger.call(this, ALLOW_SIGN);
		b = this.consume(10);
	} else if (this.tokenType === 1 && this.cmpChar(this.tokenStart, HYPHENMINUS$2)) {
		a = "-1";
		expectCharCode.call(this, 1, N);
		switch (this.tokenEnd - this.tokenStart) {
			case 2:
				this.next();
				b = consumeB.call(this);
				break;
			case 3:
				expectCharCode.call(this, 2, HYPHENMINUS$2);
				this.next();
				this.skipSC();
				checkTokenIsInteger.call(this, DISALLOW_SIGN);
				b = "-" + this.consume(10);
				break;
			default:
				expectCharCode.call(this, 2, HYPHENMINUS$2);
				checkInteger.call(this, 3, DISALLOW_SIGN);
				this.next();
				b = this.substrToCursor(start + 2);
		}
	} else if (this.tokenType === 1 || this.isDelim(PLUSSIGN$5) && this.lookupType(1) === 1) {
		let sign = 0;
		a = "1";
		if (this.isDelim(PLUSSIGN$5)) {
			sign = 1;
			this.next();
		}
		expectCharCode.call(this, 0, N);
		switch (this.tokenEnd - this.tokenStart) {
			case 1:
				this.next();
				b = consumeB.call(this);
				break;
			case 2:
				expectCharCode.call(this, 1, HYPHENMINUS$2);
				this.next();
				this.skipSC();
				checkTokenIsInteger.call(this, DISALLOW_SIGN);
				b = "-" + this.consume(10);
				break;
			default:
				expectCharCode.call(this, 1, HYPHENMINUS$2);
				checkInteger.call(this, 2, DISALLOW_SIGN);
				this.next();
				b = this.substrToCursor(start + sign + 1);
		}
	} else if (this.tokenType === 12) {
		const code = this.charCodeAt(this.tokenStart);
		const sign = code === PLUSSIGN$5 || code === HYPHENMINUS$2;
		let i = this.tokenStart + sign;
		for (; i < this.tokenEnd; i++) if (!isDigit(this.charCodeAt(i))) break;
		if (i === this.tokenStart + sign) this.error("Integer is expected", this.tokenStart + sign);
		expectCharCode.call(this, i - this.tokenStart, N);
		a = this.substring(start, i);
		if (i + 1 === this.tokenEnd) {
			this.next();
			b = consumeB.call(this);
		} else {
			expectCharCode.call(this, i - this.tokenStart + 1, HYPHENMINUS$2);
			if (i + 2 === this.tokenEnd) {
				this.next();
				this.skipSC();
				checkTokenIsInteger.call(this, DISALLOW_SIGN);
				b = "-" + this.consume(10);
			} else {
				checkInteger.call(this, i - this.tokenStart + 2, DISALLOW_SIGN);
				this.next();
				b = this.substrToCursor(i + 1);
			}
		}
	} else this.error();
	if (a !== null && a.charCodeAt(0) === PLUSSIGN$5) a = a.substr(1);
	if (b !== null && b.charCodeAt(0) === PLUSSIGN$5) b = b.substr(1);
	return {
		type: "AnPlusB",
		loc: this.getLocation(start, this.tokenStart),
		a,
		b
	};
}
function generate$49(node) {
	if (node.a) {
		const a = node.a === "+1" && "n" || node.a === "1" && "n" || node.a === "-1" && "-n" || node.a + "n";
		if (node.b) {
			const b = node.b[0] === "-" || node.b[0] === "+" ? node.b : "+" + node.b;
			this.tokenize(a + b);
		} else this.tokenize(a);
	} else this.tokenize(node.b);
}
//#endregion
//#region node_modules/.pnpm/css-tree@3.2.1/node_modules/css-tree/lib/syntax/node/Atrule.js
var Atrule_exports = /* @__PURE__ */ __exportAll({
	generate: () => generate$48,
	name: () => name$47,
	parse: () => parse$49,
	structure: () => structure$47,
	walkContext: () => walkContext$9
});
function consumeRaw$4() {
	return this.Raw(this.consumeUntilLeftCurlyBracketOrSemicolon, true);
}
function isDeclarationBlockAtrule() {
	for (let offset = 1, type; type = this.lookupType(offset); offset++) {
		if (type === 24) return true;
		if (type === 23 || type === 3) return false;
	}
	return false;
}
const name$47 = "Atrule";
const walkContext$9 = "atrule";
const structure$47 = {
	name: String,
	prelude: [
		"AtrulePrelude",
		"Raw",
		null
	],
	block: ["Block", null]
};
function parse$49(isDeclaration = false) {
	const start = this.tokenStart;
	let name;
	let nameLowerCase;
	let prelude = null;
	let block = null;
	this.eat(3);
	name = this.substrToCursor(start + 1);
	nameLowerCase = name.toLowerCase();
	this.skipSC();
	if (this.eof === false && this.tokenType !== 23 && this.tokenType !== 17) {
		if (this.parseAtrulePrelude) prelude = this.parseWithFallback(this.AtrulePrelude.bind(this, name, isDeclaration), consumeRaw$4);
		else prelude = consumeRaw$4.call(this, this.tokenIndex);
		this.skipSC();
	}
	switch (this.tokenType) {
		case 17:
			this.next();
			break;
		case 23: if (hasOwnProperty.call(this.atrule, nameLowerCase) && typeof this.atrule[nameLowerCase].block === "function") block = this.atrule[nameLowerCase].block.call(this, isDeclaration);
		else block = this.Block(isDeclarationBlockAtrule.call(this));
	}
	return {
		type: "Atrule",
		loc: this.getLocation(start, this.tokenStart),
		name,
		prelude,
		block
	};
}
function generate$48(node) {
	this.token(3, "@" + node.name);
	if (node.prelude !== null) this.node(node.prelude);
	if (node.block) this.node(node.block);
	else this.token(17, ";");
}
//#endregion
//#region node_modules/.pnpm/css-tree@3.2.1/node_modules/css-tree/lib/syntax/node/AtrulePrelude.js
var AtrulePrelude_exports = /* @__PURE__ */ __exportAll({
	generate: () => generate$47,
	name: () => name$46,
	parse: () => parse$48,
	structure: () => structure$46,
	walkContext: () => walkContext$8
});
const name$46 = "AtrulePrelude";
const walkContext$8 = "atrulePrelude";
const structure$46 = { children: [[]] };
function parse$48(name) {
	let children = null;
	if (name !== null) name = name.toLowerCase();
	this.skipSC();
	if (hasOwnProperty.call(this.atrule, name) && typeof this.atrule[name].prelude === "function") children = this.atrule[name].prelude.call(this);
	else children = this.readSequence(this.scope.AtrulePrelude);
	this.skipSC();
	if (this.eof !== true && this.tokenType !== 23 && this.tokenType !== 17) this.error("Semicolon or block is expected");
	return {
		type: "AtrulePrelude",
		loc: this.getLocationFromList(children),
		children
	};
}
function generate$47(node) {
	this.children(node);
}
//#endregion
//#region node_modules/.pnpm/css-tree@3.2.1/node_modules/css-tree/lib/syntax/node/AttributeSelector.js
var AttributeSelector_exports = /* @__PURE__ */ __exportAll({
	generate: () => generate$46,
	name: () => name$45,
	parse: () => parse$47,
	structure: () => structure$45
});
const DOLLARSIGN$1 = 36;
const ASTERISK$5 = 42;
const EQUALSSIGN$1 = 61;
const CIRCUMFLEXACCENT = 94;
const VERTICALLINE$2 = 124;
const TILDE$2 = 126;
function getAttributeName() {
	if (this.eof) this.error("Unexpected end of input");
	const start = this.tokenStart;
	let expectIdent = false;
	if (this.isDelim(ASTERISK$5)) {
		expectIdent = true;
		this.next();
	} else if (!this.isDelim(VERTICALLINE$2)) this.eat(1);
	if (this.isDelim(VERTICALLINE$2)) {
		if (this.charCodeAt(this.tokenStart + 1) !== EQUALSSIGN$1) {
			this.next();
			this.eat(1);
		} else if (expectIdent) this.error("Identifier is expected", this.tokenEnd);
	} else if (expectIdent) this.error("Vertical line is expected");
	return {
		type: "Identifier",
		loc: this.getLocation(start, this.tokenStart),
		name: this.substrToCursor(start)
	};
}
function getOperator() {
	const start = this.tokenStart;
	const code = this.charCodeAt(start);
	if (code !== EQUALSSIGN$1 && code !== TILDE$2 && code !== CIRCUMFLEXACCENT && code !== DOLLARSIGN$1 && code !== ASTERISK$5 && code !== VERTICALLINE$2) this.error("Attribute selector (=, ~=, ^=, $=, *=, |=) is expected");
	this.next();
	if (code !== EQUALSSIGN$1) {
		if (!this.isDelim(EQUALSSIGN$1)) this.error("Equal sign is expected");
		this.next();
	}
	return this.substrToCursor(start);
}
const name$45 = "AttributeSelector";
const structure$45 = {
	name: "Identifier",
	matcher: [String, null],
	value: [
		"String",
		"Identifier",
		null
	],
	flags: [String, null]
};
function parse$47() {
	const start = this.tokenStart;
	let name;
	let matcher = null;
	let value = null;
	let flags = null;
	this.eat(19);
	this.skipSC();
	name = getAttributeName.call(this);
	this.skipSC();
	if (this.tokenType !== 20) {
		if (this.tokenType !== 1) {
			matcher = getOperator.call(this);
			this.skipSC();
			value = this.tokenType === 5 ? this.String() : this.Identifier();
			this.skipSC();
		}
		if (this.tokenType === 1) {
			flags = this.consume(1);
			this.skipSC();
		}
	}
	this.eat(20);
	return {
		type: "AttributeSelector",
		loc: this.getLocation(start, this.tokenStart),
		name,
		matcher,
		value,
		flags
	};
}
function generate$46(node) {
	this.token(9, "[");
	this.node(node.name);
	if (node.matcher !== null) {
		this.tokenize(node.matcher);
		this.node(node.value);
	}
	if (node.flags !== null) this.token(1, node.flags);
	this.token(9, "]");
}
//#endregion
//#region node_modules/.pnpm/css-tree@3.2.1/node_modules/css-tree/lib/syntax/node/Block.js
var Block_exports = /* @__PURE__ */ __exportAll({
	generate: () => generate$45,
	name: () => name$44,
	parse: () => parse$46,
	structure: () => structure$44,
	walkContext: () => walkContext$7
});
const AMPERSAND$4 = 38;
function consumeRaw$3() {
	return this.Raw(null, true);
}
function consumeRule() {
	return this.parseWithFallback(this.Rule, consumeRaw$3);
}
function consumeRawDeclaration() {
	return this.Raw(this.consumeUntilSemicolonIncluded, true);
}
function consumeDeclaration() {
	if (this.tokenType === 17) return consumeRawDeclaration.call(this, this.tokenIndex);
	const node = this.parseWithFallback(this.Declaration, consumeRawDeclaration);
	if (this.tokenType === 17) this.next();
	return node;
}
const name$44 = "Block";
const walkContext$7 = "block";
const structure$44 = { children: [[
	"Atrule",
	"Rule",
	"Declaration"
]] };
function parse$46(isStyleBlock) {
	const consumer = isStyleBlock ? consumeDeclaration : consumeRule;
	const start = this.tokenStart;
	let children = this.createList();
	this.eat(23);
	scan: while (!this.eof) switch (this.tokenType) {
		case 24: break scan;
		case 13:
		case 25:
			this.next();
			break;
		case 3:
			children.push(this.parseWithFallback(this.Atrule.bind(this, isStyleBlock), consumeRaw$3));
			break;
		default: if (isStyleBlock && this.isDelim(AMPERSAND$4)) children.push(consumeRule.call(this));
		else children.push(consumer.call(this));
	}
	if (!this.eof) this.eat(24);
	return {
		type: "Block",
		loc: this.getLocation(start, this.tokenStart),
		children
	};
}
function generate$45(node) {
	this.token(23, "{");
	this.children(node, (prev) => {
		if (prev.type === "Declaration") this.token(17, ";");
	});
	this.token(24, "}");
}
//#endregion
//#region node_modules/.pnpm/css-tree@3.2.1/node_modules/css-tree/lib/syntax/node/Brackets.js
var Brackets_exports = /* @__PURE__ */ __exportAll({
	generate: () => generate$44,
	name: () => name$43,
	parse: () => parse$45,
	structure: () => structure$43
});
const name$43 = "Brackets";
const structure$43 = { children: [[]] };
function parse$45(readSequence, recognizer) {
	const start = this.tokenStart;
	let children = null;
	this.eat(19);
	children = readSequence.call(this, recognizer);
	if (!this.eof) this.eat(20);
	return {
		type: "Brackets",
		loc: this.getLocation(start, this.tokenStart),
		children
	};
}
function generate$44(node) {
	this.token(9, "[");
	this.children(node);
	this.token(9, "]");
}
//#endregion
//#region node_modules/.pnpm/css-tree@3.2.1/node_modules/css-tree/lib/syntax/node/CDC.js
var CDC_exports = /* @__PURE__ */ __exportAll({
	generate: () => generate$43,
	name: () => "CDC",
	parse: () => parse$44,
	structure: () => structure$42
});
const structure$42 = [];
function parse$44() {
	const start = this.tokenStart;
	this.eat(15);
	return {
		type: "CDC",
		loc: this.getLocation(start, this.tokenStart)
	};
}
function generate$43() {
	this.token(15, "-->");
}
//#endregion
//#region node_modules/.pnpm/css-tree@3.2.1/node_modules/css-tree/lib/syntax/node/CDO.js
var CDO_exports = /* @__PURE__ */ __exportAll({
	generate: () => generate$42,
	name: () => "CDO",
	parse: () => parse$43,
	structure: () => structure$41
});
const structure$41 = [];
function parse$43() {
	const start = this.tokenStart;
	this.eat(14);
	return {
		type: "CDO",
		loc: this.getLocation(start, this.tokenStart)
	};
}
function generate$42() {
	this.token(14, "<!--");
}
//#endregion
//#region node_modules/.pnpm/css-tree@3.2.1/node_modules/css-tree/lib/syntax/node/ClassSelector.js
var ClassSelector_exports = /* @__PURE__ */ __exportAll({
	generate: () => generate$41,
	name: () => name$40,
	parse: () => parse$42,
	structure: () => structure$40
});
const FULLSTOP$2 = 46;
const name$40 = "ClassSelector";
const structure$40 = { name: String };
function parse$42() {
	this.eatDelim(FULLSTOP$2);
	return {
		type: "ClassSelector",
		loc: this.getLocation(this.tokenStart - 1, this.tokenEnd),
		name: this.consume(1)
	};
}
function generate$41(node) {
	this.token(9, ".");
	this.token(1, node.name);
}
//#endregion
//#region node_modules/.pnpm/css-tree@3.2.1/node_modules/css-tree/lib/syntax/node/Combinator.js
var Combinator_exports = /* @__PURE__ */ __exportAll({
	generate: () => generate$40,
	name: () => name$39,
	parse: () => parse$41,
	structure: () => structure$39
});
const PLUSSIGN$4 = 43;
const SOLIDUS$7 = 47;
const GREATERTHANSIGN$2 = 62;
const TILDE$1 = 126;
const name$39 = "Combinator";
const structure$39 = { name: String };
function parse$41() {
	const start = this.tokenStart;
	let name;
	switch (this.tokenType) {
		case 13:
			name = " ";
			break;
		case 9:
			switch (this.charCodeAt(this.tokenStart)) {
				case GREATERTHANSIGN$2:
				case PLUSSIGN$4:
				case TILDE$1:
					this.next();
					break;
				case SOLIDUS$7:
					this.next();
					this.eatIdent("deep");
					this.eatDelim(SOLIDUS$7);
					break;
				default: this.error("Combinator is expected");
			}
			name = this.substrToCursor(start);
	}
	return {
		type: "Combinator",
		loc: this.getLocation(start, this.tokenStart),
		name
	};
}
function generate$40(node) {
	this.tokenize(node.name);
}
//#endregion
//#region node_modules/.pnpm/css-tree@3.2.1/node_modules/css-tree/lib/syntax/node/Comment.js
var Comment_exports = /* @__PURE__ */ __exportAll({
	generate: () => generate$39,
	name: () => name$38,
	parse: () => parse$40,
	structure: () => structure$38
});
const ASTERISK$4 = 42;
const SOLIDUS$6 = 47;
const name$38 = "Comment";
const structure$38 = { value: String };
function parse$40() {
	const start = this.tokenStart;
	let end = this.tokenEnd;
	this.eat(25);
	if (end - start + 2 >= 2 && this.charCodeAt(end - 2) === ASTERISK$4 && this.charCodeAt(end - 1) === SOLIDUS$6) end -= 2;
	return {
		type: "Comment",
		loc: this.getLocation(start, this.tokenStart),
		value: this.substring(start + 2, end)
	};
}
function generate$39(node) {
	this.token(25, "/*" + node.value + "*/");
}
//#endregion
//#region node_modules/.pnpm/css-tree@3.2.1/node_modules/css-tree/lib/syntax/node/Condition.js
var Condition_exports = /* @__PURE__ */ __exportAll({
	generate: () => generate$38,
	name: () => name$37,
	parse: () => parse$39,
	structure: () => structure$37
});
const likelyFeatureToken = /* @__PURE__ */ new Set([
	16,
	22,
	0
]);
const name$37 = "Condition";
const structure$37 = {
	kind: String,
	children: [[
		"Identifier",
		"Feature",
		"FeatureFunction",
		"FeatureRange",
		"SupportsDeclaration"
	]]
};
function featureOrRange(kind) {
	if (this.lookupTypeNonSC(1) === 1 && likelyFeatureToken.has(this.lookupTypeNonSC(2))) return this.Feature(kind);
	return this.FeatureRange(kind);
}
const parentheses = {
	media: featureOrRange,
	container: featureOrRange,
	supports() {
		return this.SupportsDeclaration();
	}
};
function parse$39(kind = "media") {
	const children = this.createList();
	scan: while (!this.eof) switch (this.tokenType) {
		case 25:
		case 13:
			this.next();
			continue;
		case 1:
			children.push(this.Identifier());
			break;
		case 21: {
			let term = this.parseWithFallback(() => parentheses[kind].call(this, kind), () => null);
			if (!term) term = this.parseWithFallback(() => {
				this.eat(21);
				const res = this.Condition(kind);
				this.eat(22);
				return res;
			}, () => {
				return this.GeneralEnclosed(kind);
			});
			children.push(term);
			break;
		}
		case 2: {
			let term = this.parseWithFallback(() => this.FeatureFunction(kind), () => null);
			if (!term) term = this.GeneralEnclosed(kind);
			children.push(term);
			break;
		}
		default: break scan;
	}
	if (children.isEmpty) this.error("Condition is expected");
	return {
		type: "Condition",
		loc: this.getLocationFromList(children),
		kind,
		children
	};
}
function generate$38(node) {
	node.children.forEach((child) => {
		if (child.type === "Condition") {
			this.token(21, "(");
			this.node(child);
			this.token(22, ")");
		} else this.node(child);
	});
}
//#endregion
//#region node_modules/.pnpm/css-tree@3.2.1/node_modules/css-tree/lib/syntax/node/Declaration.js
var Declaration_exports = /* @__PURE__ */ __exportAll({
	generate: () => generate$37,
	name: () => name$36,
	parse: () => parse$38,
	structure: () => structure$36,
	walkContext: () => walkContext$6
});
const EXCLAMATIONMARK$1 = 33;
const NUMBERSIGN$2 = 35;
const DOLLARSIGN = 36;
const AMPERSAND$3 = 38;
const ASTERISK$3 = 42;
const PLUSSIGN$3 = 43;
const SOLIDUS$5 = 47;
function consumeValueRaw() {
	return this.Raw(this.consumeUntilExclamationMarkOrSemicolon, true);
}
function consumeCustomPropertyRaw() {
	return this.Raw(this.consumeUntilExclamationMarkOrSemicolon, false);
}
function consumeValue() {
	const startValueToken = this.tokenIndex;
	const value = this.Value();
	if (value.type !== "Raw" && this.eof === false && this.tokenType !== 17 && this.isDelim(EXCLAMATIONMARK$1) === false && this.isBalanceEdge(startValueToken) === false) this.error();
	return value;
}
const name$36 = "Declaration";
const walkContext$6 = "declaration";
const structure$36 = {
	important: [Boolean, String],
	property: String,
	value: ["Value", "Raw"]
};
function parse$38() {
	const start = this.tokenStart;
	const startToken = this.tokenIndex;
	const property = readProperty.call(this);
	const customProperty = isCustomProperty(property);
	const parseValue = customProperty ? this.parseCustomProperty : this.parseValue;
	const consumeRaw = customProperty ? consumeCustomPropertyRaw : consumeValueRaw;
	let important = false;
	let value;
	this.skipSC();
	this.eat(16);
	const valueStart = this.tokenIndex;
	if (!customProperty) this.skipSC();
	if (parseValue) value = this.parseWithFallback(consumeValue, consumeRaw);
	else value = consumeRaw.call(this, this.tokenIndex);
	if (customProperty && value.type === "Value" && value.children.isEmpty) {
		for (let offset = valueStart - this.tokenIndex; offset <= 0; offset++) if (this.lookupType(offset) === 13) {
			value.children.appendData({
				type: "WhiteSpace",
				loc: null,
				value: " "
			});
			break;
		}
	}
	if (this.isDelim(EXCLAMATIONMARK$1)) {
		important = getImportant.call(this);
		this.skipSC();
	}
	if (this.eof === false && this.tokenType !== 17 && this.isBalanceEdge(startToken) === false) this.error();
	return {
		type: "Declaration",
		loc: this.getLocation(start, this.tokenStart),
		important,
		property,
		value
	};
}
function generate$37(node) {
	this.token(1, node.property);
	this.token(16, ":");
	this.node(node.value);
	if (node.important) {
		this.token(9, "!");
		this.token(1, node.important === true ? "important" : node.important);
	}
}
function readProperty() {
	const start = this.tokenStart;
	if (this.tokenType === 9) switch (this.charCodeAt(this.tokenStart)) {
		case ASTERISK$3:
		case DOLLARSIGN:
		case PLUSSIGN$3:
		case NUMBERSIGN$2:
		case AMPERSAND$3:
			this.next();
			break;
		case SOLIDUS$5:
			this.next();
			if (this.isDelim(SOLIDUS$5)) this.next();
	}
	if (this.tokenType === 4) this.eat(4);
	else this.eat(1);
	return this.substrToCursor(start);
}
function getImportant() {
	this.eat(9);
	this.skipSC();
	const important = this.consume(1);
	return important === "important" ? true : important;
}
//#endregion
//#region node_modules/.pnpm/css-tree@3.2.1/node_modules/css-tree/lib/syntax/node/DeclarationList.js
var DeclarationList_exports = /* @__PURE__ */ __exportAll({
	generate: () => generate$36,
	name: () => name$35,
	parse: () => parse$37,
	structure: () => structure$35
});
const AMPERSAND$2 = 38;
function consumeRaw$2() {
	return this.Raw(this.consumeUntilSemicolonIncluded, true);
}
const name$35 = "DeclarationList";
const structure$35 = { children: [[
	"Declaration",
	"Atrule",
	"Rule"
]] };
function parse$37() {
	const children = this.createList();
	scan: while (!this.eof) switch (this.tokenType) {
		case 13:
		case 25:
		case 17:
			this.next();
			break;
		case 3:
			children.push(this.parseWithFallback(this.Atrule.bind(this, true), consumeRaw$2));
			break;
		default: if (this.isDelim(AMPERSAND$2)) children.push(this.parseWithFallback(this.Rule, consumeRaw$2));
		else children.push(this.parseWithFallback(this.Declaration, consumeRaw$2));
	}
	return {
		type: "DeclarationList",
		loc: this.getLocationFromList(children),
		children
	};
}
function generate$36(node) {
	this.children(node, (prev) => {
		if (prev.type === "Declaration") this.token(17, ";");
	});
}
//#endregion
//#region node_modules/.pnpm/css-tree@3.2.1/node_modules/css-tree/lib/syntax/node/Dimension.js
var Dimension_exports = /* @__PURE__ */ __exportAll({
	generate: () => generate$35,
	name: () => name$34,
	parse: () => parse$36,
	structure: () => structure$34
});
const name$34 = "Dimension";
const structure$34 = {
	value: String,
	unit: String
};
function parse$36() {
	const start = this.tokenStart;
	const value = this.consumeNumber(12);
	return {
		type: "Dimension",
		loc: this.getLocation(start, this.tokenStart),
		value,
		unit: this.substring(start + value.length, this.tokenStart)
	};
}
function generate$35(node) {
	this.token(12, node.value + node.unit);
}
//#endregion
//#region node_modules/.pnpm/css-tree@3.2.1/node_modules/css-tree/lib/syntax/node/Feature.js
var Feature_exports = /* @__PURE__ */ __exportAll({
	generate: () => generate$34,
	name: () => name$33,
	parse: () => parse$35,
	structure: () => structure$33
});
const SOLIDUS$4 = 47;
const name$33 = "Feature";
const structure$33 = {
	kind: String,
	name: String,
	value: [
		"Identifier",
		"Number",
		"Dimension",
		"Ratio",
		"Function",
		null
	]
};
function parse$35(kind) {
	const start = this.tokenStart;
	let name;
	let value = null;
	this.eat(21);
	this.skipSC();
	name = this.consume(1);
	this.skipSC();
	if (this.tokenType !== 22) {
		this.eat(16);
		this.skipSC();
		switch (this.tokenType) {
			case 10:
				if (this.lookupNonWSType(1) === 9) value = this.Ratio();
				else value = this.Number();
				break;
			case 12:
				value = this.Dimension();
				break;
			case 1:
				value = this.Identifier();
				break;
			case 2:
				value = this.parseWithFallback(() => {
					const res = this.Function(this.readSequence, this.scope.Value);
					this.skipSC();
					if (this.isDelim(SOLIDUS$4)) this.error();
					return res;
				}, () => {
					return this.Ratio();
				});
				break;
			default: this.error("Number, dimension, ratio or identifier is expected");
		}
		this.skipSC();
	}
	if (!this.eof) this.eat(22);
	return {
		type: "Feature",
		loc: this.getLocation(start, this.tokenStart),
		kind,
		name,
		value
	};
}
function generate$34(node) {
	this.token(21, "(");
	this.token(1, node.name);
	if (node.value !== null) {
		this.token(16, ":");
		this.node(node.value);
	}
	this.token(22, ")");
}
//#endregion
//#region node_modules/.pnpm/css-tree@3.2.1/node_modules/css-tree/lib/syntax/node/FeatureFunction.js
var FeatureFunction_exports = /* @__PURE__ */ __exportAll({
	generate: () => generate$33,
	name: () => name$32,
	parse: () => parse$34,
	structure: () => structure$32
});
const name$32 = "FeatureFunction";
const structure$32 = {
	kind: String,
	feature: String,
	value: ["Declaration", "Selector"]
};
function getFeatureParser(kind, name) {
	const parser = (this.features[kind] || {})[name];
	if (typeof parser !== "function") this.error(`Unknown feature ${name}()`);
	return parser;
}
function parse$34(kind = "unknown") {
	const start = this.tokenStart;
	const functionName = this.consumeFunctionName();
	const valueParser = getFeatureParser.call(this, kind, functionName.toLowerCase());
	this.skipSC();
	const value = this.parseWithFallback(() => {
		const startValueToken = this.tokenIndex;
		const value = valueParser.call(this);
		if (this.eof === false && this.isBalanceEdge(startValueToken) === false) this.error();
		return value;
	}, () => this.Raw(null, false));
	if (!this.eof) this.eat(22);
	return {
		type: "FeatureFunction",
		loc: this.getLocation(start, this.tokenStart),
		kind,
		feature: functionName,
		value
	};
}
function generate$33(node) {
	this.token(2, node.feature + "(");
	this.node(node.value);
	this.token(22, ")");
}
//#endregion
//#region node_modules/.pnpm/css-tree@3.2.1/node_modules/css-tree/lib/syntax/node/FeatureRange.js
var FeatureRange_exports = /* @__PURE__ */ __exportAll({
	generate: () => generate$32,
	name: () => name$31,
	parse: () => parse$33,
	structure: () => structure$31
});
const SOLIDUS$3 = 47;
const LESSTHANSIGN = 60;
const EQUALSSIGN = 61;
const GREATERTHANSIGN$1 = 62;
const name$31 = "FeatureRange";
const structure$31 = {
	kind: String,
	left: [
		"Identifier",
		"Number",
		"Dimension",
		"Ratio",
		"Function"
	],
	leftComparison: String,
	middle: [
		"Identifier",
		"Number",
		"Dimension",
		"Ratio",
		"Function"
	],
	rightComparison: [String, null],
	right: [
		"Identifier",
		"Number",
		"Dimension",
		"Ratio",
		"Function",
		null
	]
};
function readTerm() {
	this.skipSC();
	switch (this.tokenType) {
		case 10: if (this.isDelim(SOLIDUS$3, this.lookupOffsetNonSC(1))) return this.Ratio();
		else return this.Number();
		case 12: return this.Dimension();
		case 1: return this.Identifier();
		case 2: return this.parseWithFallback(() => {
			const res = this.Function(this.readSequence, this.scope.Value);
			this.skipSC();
			if (this.isDelim(SOLIDUS$3)) this.error();
			return res;
		}, () => {
			return this.Ratio();
		});
		default: this.error("Number, dimension, ratio or identifier is expected");
	}
}
function readComparison(expectColon) {
	this.skipSC();
	if (this.isDelim(LESSTHANSIGN) || this.isDelim(GREATERTHANSIGN$1)) {
		const value = this.source[this.tokenStart];
		this.next();
		if (this.isDelim(EQUALSSIGN)) {
			this.next();
			return value + "=";
		}
		return value;
	}
	if (this.isDelim(EQUALSSIGN)) return "=";
	this.error(`Expected ${expectColon ? "\":\", " : ""}"<", ">", "=" or ")"`);
}
function parse$33(kind = "unknown") {
	const start = this.tokenStart;
	this.skipSC();
	this.eat(21);
	const left = readTerm.call(this);
	const leftComparison = readComparison.call(this, left.type === "Identifier");
	const middle = readTerm.call(this);
	let rightComparison = null;
	let right = null;
	if (this.lookupNonWSType(0) !== 22) {
		rightComparison = readComparison.call(this);
		right = readTerm.call(this);
	}
	this.skipSC();
	this.eat(22);
	return {
		type: "FeatureRange",
		loc: this.getLocation(start, this.tokenStart),
		kind,
		left,
		leftComparison,
		middle,
		rightComparison,
		right
	};
}
function generate$32(node) {
	this.token(21, "(");
	this.node(node.left);
	this.tokenize(node.leftComparison);
	this.node(node.middle);
	if (node.right) {
		this.tokenize(node.rightComparison);
		this.node(node.right);
	}
	this.token(22, ")");
}
//#endregion
//#region node_modules/.pnpm/css-tree@3.2.1/node_modules/css-tree/lib/syntax/node/Function.js
var Function_exports = /* @__PURE__ */ __exportAll({
	generate: () => generate$31,
	name: () => name$30,
	parse: () => parse$32,
	structure: () => structure$30,
	walkContext: () => walkContext$5
});
const name$30 = "Function";
const walkContext$5 = "function";
const structure$30 = {
	name: String,
	children: [[]]
};
function parse$32(readSequence, recognizer) {
	const start = this.tokenStart;
	const name = this.consumeFunctionName();
	const nameLowerCase = name.toLowerCase();
	let children;
	children = recognizer.hasOwnProperty(nameLowerCase) ? recognizer[nameLowerCase].call(this, recognizer) : readSequence.call(this, recognizer);
	if (!this.eof) this.eat(22);
	return {
		type: "Function",
		loc: this.getLocation(start, this.tokenStart),
		name,
		children
	};
}
function generate$31(node) {
	this.token(2, node.name + "(");
	this.children(node);
	this.token(22, ")");
}
//#endregion
//#region node_modules/.pnpm/css-tree@3.2.1/node_modules/css-tree/lib/syntax/node/GeneralEnclosed.js
var GeneralEnclosed_exports = /* @__PURE__ */ __exportAll({
	generate: () => generate$30,
	name: () => name$29,
	parse: () => parse$31,
	structure: () => structure$29
});
const name$29 = "GeneralEnclosed";
const structure$29 = {
	kind: String,
	function: [String, null],
	children: [[]]
};
function parse$31(kind) {
	const start = this.tokenStart;
	let functionName = null;
	if (this.tokenType === 2) functionName = this.consumeFunctionName();
	else this.eat(21);
	const children = this.parseWithFallback(() => {
		const startValueToken = this.tokenIndex;
		const children = this.readSequence(this.scope.Value);
		if (this.eof === false && this.isBalanceEdge(startValueToken) === false) this.error();
		return children;
	}, () => this.createSingleNodeList(this.Raw(null, false)));
	if (!this.eof) this.eat(22);
	return {
		type: "GeneralEnclosed",
		loc: this.getLocation(start, this.tokenStart),
		kind,
		function: functionName,
		children
	};
}
function generate$30(node) {
	if (node.function) this.token(2, node.function + "(");
	else this.token(21, "(");
	this.children(node);
	this.token(22, ")");
}
//#endregion
//#region node_modules/.pnpm/css-tree@3.2.1/node_modules/css-tree/lib/syntax/node/Hash.js
var Hash_exports = /* @__PURE__ */ __exportAll({
	generate: () => generate$29,
	name: () => name$28,
	parse: () => parse$30,
	structure: () => structure$28,
	xxx: () => "XXX"
});
const name$28 = "Hash";
const structure$28 = { value: String };
function parse$30() {
	const start = this.tokenStart;
	this.eat(4);
	return {
		type: "Hash",
		loc: this.getLocation(start, this.tokenStart),
		value: this.substrToCursor(start + 1)
	};
}
function generate$29(node) {
	this.token(4, "#" + node.value);
}
//#endregion
//#region node_modules/.pnpm/css-tree@3.2.1/node_modules/css-tree/lib/syntax/node/Identifier.js
var Identifier_exports = /* @__PURE__ */ __exportAll({
	generate: () => generate$28,
	name: () => name$27,
	parse: () => parse$29,
	structure: () => structure$27
});
const name$27 = "Identifier";
const structure$27 = { name: String };
function parse$29() {
	return {
		type: "Identifier",
		loc: this.getLocation(this.tokenStart, this.tokenEnd),
		name: this.consume(1)
	};
}
function generate$28(node) {
	this.token(1, node.name);
}
//#endregion
//#region node_modules/.pnpm/css-tree@3.2.1/node_modules/css-tree/lib/syntax/node/IdSelector.js
var IdSelector_exports = /* @__PURE__ */ __exportAll({
	generate: () => generate$27,
	name: () => name$26,
	parse: () => parse$28,
	structure: () => structure$26
});
const name$26 = "IdSelector";
const structure$26 = { name: String };
function parse$28() {
	const start = this.tokenStart;
	this.eat(4);
	return {
		type: "IdSelector",
		loc: this.getLocation(start, this.tokenStart),
		name: this.substrToCursor(start + 1)
	};
}
function generate$27(node) {
	this.token(9, "#" + node.name);
}
//#endregion
//#region node_modules/.pnpm/css-tree@3.2.1/node_modules/css-tree/lib/syntax/node/Layer.js
var Layer_exports = /* @__PURE__ */ __exportAll({
	generate: () => generate$26,
	name: () => name$25,
	parse: () => parse$27,
	structure: () => structure$25
});
const FULLSTOP$1 = 46;
const name$25 = "Layer";
const structure$25 = { name: String };
function parse$27() {
	let tokenStart = this.tokenStart;
	let name = this.consume(1);
	while (this.isDelim(FULLSTOP$1)) {
		this.eat(9);
		name += "." + this.consume(1);
	}
	return {
		type: "Layer",
		loc: this.getLocation(tokenStart, this.tokenStart),
		name
	};
}
function generate$26(node) {
	this.tokenize(node.name);
}
//#endregion
//#region node_modules/.pnpm/css-tree@3.2.1/node_modules/css-tree/lib/syntax/node/LayerList.js
var LayerList_exports = /* @__PURE__ */ __exportAll({
	generate: () => generate$25,
	name: () => name$24,
	parse: () => parse$26,
	structure: () => structure$24
});
const name$24 = "LayerList";
const structure$24 = { children: [["Layer"]] };
function parse$26() {
	const children = this.createList();
	this.skipSC();
	while (!this.eof) {
		children.push(this.Layer());
		if (this.lookupTypeNonSC(0) !== 18) break;
		this.skipSC();
		this.next();
		this.skipSC();
	}
	return {
		type: "LayerList",
		loc: this.getLocationFromList(children),
		children
	};
}
function generate$25(node) {
	this.children(node, () => this.token(18, ","));
}
//#endregion
//#region node_modules/.pnpm/css-tree@3.2.1/node_modules/css-tree/lib/syntax/node/MediaQuery.js
var MediaQuery_exports = /* @__PURE__ */ __exportAll({
	generate: () => generate$24,
	name: () => name$23,
	parse: () => parse$25,
	structure: () => structure$23
});
const name$23 = "MediaQuery";
const structure$23 = {
	modifier: [String, null],
	mediaType: [String, null],
	condition: ["Condition", null]
};
function parse$25() {
	const start = this.tokenStart;
	let modifier = null;
	let mediaType = null;
	let condition = null;
	this.skipSC();
	if (this.tokenType === 1 && this.lookupTypeNonSC(1) !== 21) {
		const ident = this.consume(1);
		const identLowerCase = ident.toLowerCase();
		if (identLowerCase === "not" || identLowerCase === "only") {
			this.skipSC();
			modifier = identLowerCase;
			mediaType = this.consume(1);
		} else mediaType = ident;
		switch (this.lookupTypeNonSC(0)) {
			case 1:
				this.skipSC();
				this.eatIdent("and");
				condition = this.Condition("media");
				break;
			case 23:
			case 17:
			case 18:
			case 0: break;
			default: this.error("Identifier or parenthesis is expected");
		}
	} else switch (this.tokenType) {
		case 1:
		case 21:
		case 2:
			condition = this.Condition("media");
			break;
		case 23:
		case 17:
		case 0: break;
		default: this.error("Identifier or parenthesis is expected");
	}
	return {
		type: "MediaQuery",
		loc: this.getLocation(start, this.tokenStart),
		modifier,
		mediaType,
		condition
	};
}
function generate$24(node) {
	if (node.mediaType) {
		if (node.modifier) this.token(1, node.modifier);
		this.token(1, node.mediaType);
		if (node.condition) {
			this.token(1, "and");
			this.node(node.condition);
		}
	} else if (node.condition) this.node(node.condition);
}
//#endregion
//#region node_modules/.pnpm/css-tree@3.2.1/node_modules/css-tree/lib/syntax/node/MediaQueryList.js
var MediaQueryList_exports = /* @__PURE__ */ __exportAll({
	generate: () => generate$23,
	name: () => name$22,
	parse: () => parse$24,
	structure: () => structure$22
});
const name$22 = "MediaQueryList";
const structure$22 = { children: [["MediaQuery"]] };
function parse$24() {
	const children = this.createList();
	this.skipSC();
	while (!this.eof) {
		children.push(this.MediaQuery());
		if (this.tokenType !== 18) break;
		this.next();
	}
	return {
		type: "MediaQueryList",
		loc: this.getLocationFromList(children),
		children
	};
}
function generate$23(node) {
	this.children(node, () => this.token(18, ","));
}
//#endregion
//#region node_modules/.pnpm/css-tree@3.2.1/node_modules/css-tree/lib/syntax/node/NestingSelector.js
var NestingSelector_exports = /* @__PURE__ */ __exportAll({
	generate: () => generate$22,
	name: () => name$21,
	parse: () => parse$23,
	structure: () => structure$21
});
const AMPERSAND$1 = 38;
const name$21 = "NestingSelector";
const structure$21 = {};
function parse$23() {
	const start = this.tokenStart;
	this.eatDelim(AMPERSAND$1);
	return {
		type: "NestingSelector",
		loc: this.getLocation(start, this.tokenStart)
	};
}
function generate$22() {
	this.token(9, "&");
}
//#endregion
//#region node_modules/.pnpm/css-tree@3.2.1/node_modules/css-tree/lib/syntax/node/Nth.js
var Nth_exports = /* @__PURE__ */ __exportAll({
	generate: () => generate$21,
	name: () => "Nth",
	parse: () => parse$22,
	structure: () => structure$20
});
const structure$20 = {
	nth: ["AnPlusB", "Identifier"],
	selector: ["SelectorList", null]
};
function parse$22() {
	this.skipSC();
	const start = this.tokenStart;
	let end = start;
	let selector = null;
	let nth;
	if (this.lookupValue(0, "odd") || this.lookupValue(0, "even")) nth = this.Identifier();
	else nth = this.AnPlusB();
	end = this.tokenStart;
	this.skipSC();
	if (this.lookupValue(0, "of")) {
		this.next();
		selector = this.SelectorList();
		end = this.tokenStart;
	}
	return {
		type: "Nth",
		loc: this.getLocation(start, end),
		nth,
		selector
	};
}
function generate$21(node) {
	this.node(node.nth);
	if (node.selector !== null) {
		this.token(1, "of");
		this.node(node.selector);
	}
}
//#endregion
//#region node_modules/.pnpm/css-tree@3.2.1/node_modules/css-tree/lib/syntax/node/Number.js
var Number_exports = /* @__PURE__ */ __exportAll({
	generate: () => generate$20,
	name: () => name$19,
	parse: () => parse$21,
	structure: () => structure$19
});
const name$19 = "Number";
const structure$19 = { value: String };
function parse$21() {
	return {
		type: "Number",
		loc: this.getLocation(this.tokenStart, this.tokenEnd),
		value: this.consume(10)
	};
}
function generate$20(node) {
	this.token(10, node.value);
}
//#endregion
//#region node_modules/.pnpm/css-tree@3.2.1/node_modules/css-tree/lib/syntax/node/Operator.js
var Operator_exports = /* @__PURE__ */ __exportAll({
	generate: () => generate$19,
	name: () => name$18,
	parse: () => parse$20,
	structure: () => structure$18
});
const name$18 = "Operator";
const structure$18 = { value: String };
function parse$20() {
	const start = this.tokenStart;
	this.next();
	return {
		type: "Operator",
		loc: this.getLocation(start, this.tokenStart),
		value: this.substrToCursor(start)
	};
}
function generate$19(node) {
	this.tokenize(node.value);
}
//#endregion
//#region node_modules/.pnpm/css-tree@3.2.1/node_modules/css-tree/lib/syntax/node/Parentheses.js
var Parentheses_exports = /* @__PURE__ */ __exportAll({
	generate: () => generate$18,
	name: () => name$17,
	parse: () => parse$19,
	structure: () => structure$17
});
const name$17 = "Parentheses";
const structure$17 = { children: [[]] };
function parse$19(readSequence, recognizer) {
	const start = this.tokenStart;
	let children = null;
	this.eat(21);
	children = readSequence.call(this, recognizer);
	if (!this.eof) this.eat(22);
	return {
		type: "Parentheses",
		loc: this.getLocation(start, this.tokenStart),
		children
	};
}
function generate$18(node) {
	this.token(21, "(");
	this.children(node);
	this.token(22, ")");
}
//#endregion
//#region node_modules/.pnpm/css-tree@3.2.1/node_modules/css-tree/lib/syntax/node/Percentage.js
var Percentage_exports = /* @__PURE__ */ __exportAll({
	generate: () => generate$17,
	name: () => name$16,
	parse: () => parse$18,
	structure: () => structure$16
});
const name$16 = "Percentage";
const structure$16 = { value: String };
function parse$18() {
	return {
		type: "Percentage",
		loc: this.getLocation(this.tokenStart, this.tokenEnd),
		value: this.consumeNumber(11)
	};
}
function generate$17(node) {
	this.token(11, node.value + "%");
}
//#endregion
//#region node_modules/.pnpm/css-tree@3.2.1/node_modules/css-tree/lib/syntax/node/PseudoClassSelector.js
var PseudoClassSelector_exports = /* @__PURE__ */ __exportAll({
	generate: () => generate$16,
	name: () => name$15,
	parse: () => parse$17,
	structure: () => structure$15,
	walkContext: () => walkContext$4
});
const name$15 = "PseudoClassSelector";
const walkContext$4 = "function";
const structure$15 = {
	name: String,
	children: [["Raw"], null]
};
function parse$17() {
	const start = this.tokenStart;
	let children = null;
	let name;
	let nameLowerCase;
	this.eat(16);
	if (this.tokenType === 2) {
		name = this.consumeFunctionName();
		nameLowerCase = name.toLowerCase();
		if (this.lookupNonWSType(0) == 22) children = this.createList();
		else if (hasOwnProperty.call(this.pseudo, nameLowerCase)) {
			this.skipSC();
			children = this.pseudo[nameLowerCase].call(this);
			this.skipSC();
		} else {
			children = this.createList();
			children.push(this.Raw(null, false));
		}
		this.eat(22);
	} else name = this.consume(1);
	return {
		type: "PseudoClassSelector",
		loc: this.getLocation(start, this.tokenStart),
		name,
		children
	};
}
function generate$16(node) {
	this.token(16, ":");
	if (node.children === null) this.token(1, node.name);
	else {
		this.token(2, node.name + "(");
		this.children(node);
		this.token(22, ")");
	}
}
//#endregion
//#region node_modules/.pnpm/css-tree@3.2.1/node_modules/css-tree/lib/syntax/node/PseudoElementSelector.js
var PseudoElementSelector_exports = /* @__PURE__ */ __exportAll({
	generate: () => generate$15,
	name: () => name$14,
	parse: () => parse$16,
	structure: () => structure$14,
	walkContext: () => walkContext$3
});
const name$14 = "PseudoElementSelector";
const walkContext$3 = "function";
const structure$14 = {
	name: String,
	children: [["Raw"], null]
};
function parse$16() {
	const start = this.tokenStart;
	let children = null;
	let name;
	let nameLowerCase;
	this.eat(16);
	this.eat(16);
	if (this.tokenType === 2) {
		name = this.consumeFunctionName();
		nameLowerCase = name.toLowerCase();
		if (this.lookupNonWSType(0) == 22) children = this.createList();
		else if (hasOwnProperty.call(this.pseudo, nameLowerCase)) {
			this.skipSC();
			children = this.pseudo[nameLowerCase].call(this);
			this.skipSC();
		} else {
			children = this.createList();
			children.push(this.Raw(null, false));
		}
		this.eat(22);
	} else name = this.consume(1);
	return {
		type: "PseudoElementSelector",
		loc: this.getLocation(start, this.tokenStart),
		name,
		children
	};
}
function generate$15(node) {
	this.token(16, ":");
	this.token(16, ":");
	if (node.children === null) this.token(1, node.name);
	else {
		this.token(2, node.name + "(");
		this.children(node);
		this.token(22, ")");
	}
}
//#endregion
//#region node_modules/.pnpm/css-tree@3.2.1/node_modules/css-tree/lib/syntax/node/Ratio.js
var Ratio_exports = /* @__PURE__ */ __exportAll({
	generate: () => generate$14,
	name: () => name$13,
	parse: () => parse$15,
	structure: () => structure$13
});
const SOLIDUS$2 = 47;
function consumeTerm() {
	this.skipSC();
	switch (this.tokenType) {
		case 10: return this.Number();
		case 2: return this.Function(this.readSequence, this.scope.Value);
		default: this.error("Number of function is expected");
	}
}
const name$13 = "Ratio";
const structure$13 = {
	left: ["Number", "Function"],
	right: [
		"Number",
		"Function",
		null
	]
};
function parse$15() {
	const start = this.tokenStart;
	const left = consumeTerm.call(this);
	let right = null;
	this.skipSC();
	if (this.isDelim(SOLIDUS$2)) {
		this.eatDelim(SOLIDUS$2);
		right = consumeTerm.call(this);
	}
	return {
		type: "Ratio",
		loc: this.getLocation(start, this.tokenStart),
		left,
		right
	};
}
function generate$14(node) {
	this.node(node.left);
	this.token(9, "/");
	if (node.right) this.node(node.right);
	else this.node(10, 1);
}
//#endregion
//#region node_modules/.pnpm/css-tree@3.2.1/node_modules/css-tree/lib/syntax/node/Raw.js
var Raw_exports = /* @__PURE__ */ __exportAll({
	generate: () => generate$13,
	name: () => "Raw",
	parse: () => parse$14,
	structure: () => structure$12
});
function getOffsetExcludeWS() {
	if (this.tokenIndex > 0) {
		if (this.lookupType(-1) === 13) return this.tokenIndex > 1 ? this.getTokenStart(this.tokenIndex - 1) : this.firstCharOffset;
	}
	return this.tokenStart;
}
const structure$12 = { value: String };
function parse$14(consumeUntil, excludeWhiteSpace) {
	const startOffset = this.getTokenStart(this.tokenIndex);
	let endOffset;
	this.skipUntilBalanced(this.tokenIndex, consumeUntil || this.consumeUntilBalanceEnd);
	if (excludeWhiteSpace && this.tokenStart > startOffset) endOffset = getOffsetExcludeWS.call(this);
	else endOffset = this.tokenStart;
	return {
		type: "Raw",
		loc: this.getLocation(startOffset, endOffset),
		value: this.substring(startOffset, endOffset)
	};
}
function generate$13(node) {
	this.tokenize(node.value);
}
//#endregion
//#region node_modules/.pnpm/css-tree@3.2.1/node_modules/css-tree/lib/syntax/node/Rule.js
var Rule_exports = /* @__PURE__ */ __exportAll({
	generate: () => generate$12,
	name: () => name$11,
	parse: () => parse$13,
	structure: () => structure$11,
	walkContext: () => walkContext$2
});
function consumeRaw$1() {
	return this.Raw(this.consumeUntilLeftCurlyBracket, true);
}
function consumePrelude() {
	const prelude = this.SelectorList();
	if (prelude.type !== "Raw" && this.eof === false && this.tokenType !== 23) this.error();
	return prelude;
}
const name$11 = "Rule";
const walkContext$2 = "rule";
const structure$11 = {
	prelude: ["SelectorList", "Raw"],
	block: ["Block"]
};
function parse$13() {
	const startToken = this.tokenIndex;
	const startOffset = this.tokenStart;
	let prelude;
	let block;
	if (this.parseRulePrelude) prelude = this.parseWithFallback(consumePrelude, consumeRaw$1);
	else prelude = consumeRaw$1.call(this, startToken);
	block = this.Block(true);
	return {
		type: "Rule",
		loc: this.getLocation(startOffset, this.tokenStart),
		prelude,
		block
	};
}
function generate$12(node) {
	this.node(node.prelude);
	this.node(node.block);
}
//#endregion
//#region node_modules/.pnpm/css-tree@3.2.1/node_modules/css-tree/lib/syntax/node/Scope.js
var Scope_exports = /* @__PURE__ */ __exportAll({
	generate: () => generate$11,
	name: () => name$10,
	parse: () => parse$12,
	structure: () => structure$10
});
const name$10 = "Scope";
const structure$10 = {
	root: [
		"SelectorList",
		"Raw",
		null
	],
	limit: [
		"SelectorList",
		"Raw",
		null
	]
};
function parse$12() {
	let root = null;
	let limit = null;
	this.skipSC();
	const startOffset = this.tokenStart;
	if (this.tokenType === 21) {
		this.next();
		this.skipSC();
		root = this.parseWithFallback(this.SelectorList, () => this.Raw(false, true));
		this.skipSC();
		this.eat(22);
	}
	if (this.lookupNonWSType(0) === 1) {
		this.skipSC();
		this.eatIdent("to");
		this.skipSC();
		this.eat(21);
		this.skipSC();
		limit = this.parseWithFallback(this.SelectorList, () => this.Raw(false, true));
		this.skipSC();
		this.eat(22);
	}
	return {
		type: "Scope",
		loc: this.getLocation(startOffset, this.tokenStart),
		root,
		limit
	};
}
function generate$11(node) {
	if (node.root) {
		this.token(21, "(");
		this.node(node.root);
		this.token(22, ")");
	}
	if (node.limit) {
		this.token(1, "to");
		this.token(21, "(");
		this.node(node.limit);
		this.token(22, ")");
	}
}
//#endregion
//#region node_modules/.pnpm/css-tree@3.2.1/node_modules/css-tree/lib/syntax/node/Selector.js
var Selector_exports = /* @__PURE__ */ __exportAll({
	generate: () => generate$10,
	name: () => name$9,
	parse: () => parse$11,
	structure: () => structure$9
});
const name$9 = "Selector";
const structure$9 = { children: [[
	"TypeSelector",
	"IdSelector",
	"ClassSelector",
	"AttributeSelector",
	"PseudoClassSelector",
	"PseudoElementSelector",
	"Combinator"
]] };
function parse$11() {
	const children = this.readSequence(this.scope.Selector);
	if (this.getFirstListNode(children) === null) this.error("Selector is expected");
	return {
		type: "Selector",
		loc: this.getLocationFromList(children),
		children
	};
}
function generate$10(node) {
	this.children(node);
}
//#endregion
//#region node_modules/.pnpm/css-tree@3.2.1/node_modules/css-tree/lib/syntax/node/SelectorList.js
var SelectorList_exports = /* @__PURE__ */ __exportAll({
	generate: () => generate$9,
	name: () => name$8,
	parse: () => parse$10,
	structure: () => structure$8,
	walkContext: () => walkContext$1
});
const name$8 = "SelectorList";
const walkContext$1 = "selector";
const structure$8 = { children: [["Selector", "Raw"]] };
function parse$10() {
	const children = this.createList();
	while (!this.eof) {
		children.push(this.Selector());
		if (this.tokenType === 18) {
			this.next();
			continue;
		}
		break;
	}
	return {
		type: "SelectorList",
		loc: this.getLocationFromList(children),
		children
	};
}
function generate$9(node) {
	this.children(node, () => this.token(18, ","));
}
//#endregion
//#region node_modules/.pnpm/css-tree@3.2.1/node_modules/css-tree/lib/utils/string.js
const REVERSE_SOLIDUS$1 = 92;
const QUOTATION_MARK$1 = 34;
const APOSTROPHE$1 = 39;
function decode$1(str) {
	const len = str.length;
	const firstChar = str.charCodeAt(0);
	const start = firstChar === QUOTATION_MARK$1 || firstChar === APOSTROPHE$1 ? 1 : 0;
	const end = start === 1 && len > 1 && str.charCodeAt(len - 1) === firstChar ? len - 2 : len - 1;
	let decoded = "";
	for (let i = start; i <= end; i++) {
		let code = str.charCodeAt(i);
		if (code === REVERSE_SOLIDUS$1) {
			if (i === end) {
				if (i !== len - 1) decoded = str.substr(i + 1);
				break;
			}
			code = str.charCodeAt(++i);
			if (isValidEscape(REVERSE_SOLIDUS$1, code)) {
				const escapeStart = i - 1;
				const escapeEnd = consumeEscaped(str, escapeStart);
				i = escapeEnd - 1;
				decoded += decodeEscaped(str.substring(escapeStart + 1, escapeEnd));
			} else if (code === 13 && str.charCodeAt(i + 1) === 10) i++;
		} else decoded += str[i];
	}
	return decoded;
}
function encode$1(str, apostrophe) {
	const quote = apostrophe ? "'" : "\"";
	const quoteCode = apostrophe ? APOSTROPHE$1 : QUOTATION_MARK$1;
	let encoded = "";
	let wsBeforeHexIsNeeded = false;
	for (let i = 0; i < str.length; i++) {
		const code = str.charCodeAt(i);
		if (code === 0) {
			encoded += "�";
			continue;
		}
		if (code <= 31 || code === 127) {
			encoded += "\\" + code.toString(16);
			wsBeforeHexIsNeeded = true;
			continue;
		}
		if (code === quoteCode || code === REVERSE_SOLIDUS$1) {
			encoded += "\\" + str.charAt(i);
			wsBeforeHexIsNeeded = false;
		} else {
			if (wsBeforeHexIsNeeded && (isHexDigit(code) || isWhiteSpace(code))) encoded += " ";
			encoded += str.charAt(i);
			wsBeforeHexIsNeeded = false;
		}
	}
	return quote + encoded + quote;
}
//#endregion
//#region node_modules/.pnpm/css-tree@3.2.1/node_modules/css-tree/lib/syntax/node/String.js
var String_exports = /* @__PURE__ */ __exportAll({
	generate: () => generate$8,
	name: () => name$7,
	parse: () => parse$9,
	structure: () => structure$7
});
const name$7 = "String";
const structure$7 = { value: String };
function parse$9() {
	return {
		type: "String",
		loc: this.getLocation(this.tokenStart, this.tokenEnd),
		value: decode$1(this.consume(5))
	};
}
function generate$8(node) {
	this.token(5, encode$1(node.value));
}
//#endregion
//#region node_modules/.pnpm/css-tree@3.2.1/node_modules/css-tree/lib/syntax/node/StyleSheet.js
var StyleSheet_exports = /* @__PURE__ */ __exportAll({
	generate: () => generate$7,
	name: () => name$6,
	parse: () => parse$8,
	structure: () => structure$6,
	walkContext: () => walkContext
});
const EXCLAMATIONMARK = 33;
function consumeRaw() {
	return this.Raw(null, false);
}
const name$6 = "StyleSheet";
const walkContext = "stylesheet";
const structure$6 = { children: [[
	"Comment",
	"CDO",
	"CDC",
	"Atrule",
	"Rule",
	"Raw"
]] };
function parse$8() {
	const start = this.tokenStart;
	const children = this.createList();
	let child;
	scan: while (!this.eof) {
		switch (this.tokenType) {
			case 13:
				this.next();
				continue;
			case 25:
				if (this.charCodeAt(this.tokenStart + 2) !== EXCLAMATIONMARK) {
					this.next();
					continue;
				}
				child = this.Comment();
				break;
			case 14:
				child = this.CDO();
				break;
			case 15:
				child = this.CDC();
				break;
			case 3:
				child = this.parseWithFallback(this.Atrule, consumeRaw);
				break;
			default: child = this.parseWithFallback(this.Rule, consumeRaw);
		}
		children.push(child);
	}
	return {
		type: "StyleSheet",
		loc: this.getLocation(start, this.tokenStart),
		children
	};
}
function generate$7(node) {
	this.children(node);
}
//#endregion
//#region node_modules/.pnpm/css-tree@3.2.1/node_modules/css-tree/lib/syntax/node/SupportsDeclaration.js
var SupportsDeclaration_exports = /* @__PURE__ */ __exportAll({
	generate: () => generate$6,
	name: () => name$5,
	parse: () => parse$7,
	structure: () => structure$5
});
const name$5 = "SupportsDeclaration";
const structure$5 = { declaration: "Declaration" };
function parse$7() {
	const start = this.tokenStart;
	this.eat(21);
	this.skipSC();
	const declaration = this.Declaration();
	if (!this.eof) this.eat(22);
	return {
		type: "SupportsDeclaration",
		loc: this.getLocation(start, this.tokenStart),
		declaration
	};
}
function generate$6(node) {
	this.token(21, "(");
	this.node(node.declaration);
	this.token(22, ")");
}
//#endregion
//#region node_modules/.pnpm/css-tree@3.2.1/node_modules/css-tree/lib/syntax/node/TypeSelector.js
var TypeSelector_exports = /* @__PURE__ */ __exportAll({
	generate: () => generate$5,
	name: () => name$4,
	parse: () => parse$6,
	structure: () => structure$4
});
const ASTERISK$2 = 42;
const VERTICALLINE$1 = 124;
function eatIdentifierOrAsterisk() {
	if (this.tokenType !== 1 && this.isDelim(ASTERISK$2) === false) this.error("Identifier or asterisk is expected");
	this.next();
}
const name$4 = "TypeSelector";
const structure$4 = { name: String };
function parse$6() {
	const start = this.tokenStart;
	if (this.isDelim(VERTICALLINE$1)) {
		this.next();
		eatIdentifierOrAsterisk.call(this);
	} else {
		eatIdentifierOrAsterisk.call(this);
		if (this.isDelim(VERTICALLINE$1)) {
			this.next();
			eatIdentifierOrAsterisk.call(this);
		}
	}
	return {
		type: "TypeSelector",
		loc: this.getLocation(start, this.tokenStart),
		name: this.substrToCursor(start)
	};
}
function generate$5(node) {
	this.tokenize(node.name);
}
//#endregion
//#region node_modules/.pnpm/css-tree@3.2.1/node_modules/css-tree/lib/syntax/node/UnicodeRange.js
var UnicodeRange_exports = /* @__PURE__ */ __exportAll({
	generate: () => generate$4,
	name: () => name$3,
	parse: () => parse$5,
	structure: () => structure$3
});
const PLUSSIGN$2 = 43;
const HYPHENMINUS$1 = 45;
const QUESTIONMARK = 63;
function eatHexSequence(offset, allowDash) {
	let len = 0;
	for (let pos = this.tokenStart + offset; pos < this.tokenEnd; pos++) {
		const code = this.charCodeAt(pos);
		if (code === HYPHENMINUS$1 && allowDash && len !== 0) {
			eatHexSequence.call(this, offset + len + 1, false);
			return -1;
		}
		if (!isHexDigit(code)) this.error(allowDash && len !== 0 ? "Hyphen minus" + (len < 6 ? " or hex digit" : "") + " is expected" : len < 6 ? "Hex digit is expected" : "Unexpected input", pos);
		if (++len > 6) this.error("Too many hex digits", pos);
	}
	this.next();
	return len;
}
function eatQuestionMarkSequence(max) {
	let count = 0;
	while (this.isDelim(QUESTIONMARK)) {
		if (++count > max) this.error("Too many question marks");
		this.next();
	}
}
function startsWith(code) {
	if (this.charCodeAt(this.tokenStart) !== code) this.error((code === PLUSSIGN$2 ? "Plus sign" : "Hyphen minus") + " is expected");
}
function scanUnicodeRange() {
	let hexLength = 0;
	switch (this.tokenType) {
		case 10:
			hexLength = eatHexSequence.call(this, 1, true);
			if (this.isDelim(QUESTIONMARK)) {
				eatQuestionMarkSequence.call(this, 6 - hexLength);
				break;
			}
			if (this.tokenType === 12 || this.tokenType === 10) {
				startsWith.call(this, HYPHENMINUS$1);
				eatHexSequence.call(this, 1, false);
				break;
			}
			break;
		case 12:
			hexLength = eatHexSequence.call(this, 1, true);
			if (hexLength > 0) eatQuestionMarkSequence.call(this, 6 - hexLength);
			break;
		default:
			this.eatDelim(PLUSSIGN$2);
			if (this.tokenType === 1) {
				hexLength = eatHexSequence.call(this, 0, true);
				if (hexLength > 0) eatQuestionMarkSequence.call(this, 6 - hexLength);
				break;
			}
			if (this.isDelim(QUESTIONMARK)) {
				this.next();
				eatQuestionMarkSequence.call(this, 5);
				break;
			}
			this.error("Hex digit or question mark is expected");
	}
}
const name$3 = "UnicodeRange";
const structure$3 = { value: String };
function parse$5() {
	const start = this.tokenStart;
	this.eatIdent("u");
	scanUnicodeRange.call(this);
	return {
		type: "UnicodeRange",
		loc: this.getLocation(start, this.tokenStart),
		value: this.substrToCursor(start)
	};
}
function generate$4(node) {
	this.tokenize(node.value);
}
//#endregion
//#region node_modules/.pnpm/css-tree@3.2.1/node_modules/css-tree/lib/utils/url.js
const SPACE$1 = 32;
const REVERSE_SOLIDUS = 92;
const QUOTATION_MARK = 34;
const APOSTROPHE = 39;
const LEFTPARENTHESIS = 40;
const RIGHTPARENTHESIS = 41;
function decode(str) {
	const len = str.length;
	let start = 4;
	let end = str.charCodeAt(len - 1) === RIGHTPARENTHESIS ? len - 2 : len - 1;
	let decoded = "";
	while (start < end && isWhiteSpace(str.charCodeAt(start))) start++;
	while (start < end && isWhiteSpace(str.charCodeAt(end))) end--;
	for (let i = start; i <= end; i++) {
		let code = str.charCodeAt(i);
		if (code === REVERSE_SOLIDUS) {
			if (i === end) {
				if (i !== len - 1) decoded = str.substr(i + 1);
				break;
			}
			code = str.charCodeAt(++i);
			if (isValidEscape(REVERSE_SOLIDUS, code)) {
				const escapeStart = i - 1;
				const escapeEnd = consumeEscaped(str, escapeStart);
				i = escapeEnd - 1;
				decoded += decodeEscaped(str.substring(escapeStart + 1, escapeEnd));
			} else if (code === 13 && str.charCodeAt(i + 1) === 10) i++;
		} else decoded += str[i];
	}
	return decoded;
}
function encode(str) {
	let encoded = "";
	let wsBeforeHexIsNeeded = false;
	for (let i = 0; i < str.length; i++) {
		const code = str.charCodeAt(i);
		if (code === 0) {
			encoded += "�";
			continue;
		}
		if (code <= 31 || code === 127) {
			encoded += "\\" + code.toString(16);
			wsBeforeHexIsNeeded = true;
			continue;
		}
		if (code === SPACE$1 || code === REVERSE_SOLIDUS || code === QUOTATION_MARK || code === APOSTROPHE || code === LEFTPARENTHESIS || code === RIGHTPARENTHESIS) {
			encoded += "\\" + str.charAt(i);
			wsBeforeHexIsNeeded = false;
		} else {
			if (wsBeforeHexIsNeeded && isHexDigit(code)) encoded += " ";
			encoded += str.charAt(i);
			wsBeforeHexIsNeeded = false;
		}
	}
	return "url(" + encoded + ")";
}
//#endregion
//#region node_modules/.pnpm/css-tree@3.2.1/node_modules/css-tree/lib/syntax/node/Url.js
var Url_exports = /* @__PURE__ */ __exportAll({
	generate: () => generate$3,
	name: () => "Url",
	parse: () => parse$4,
	structure: () => structure$2
});
const structure$2 = { value: String };
function parse$4() {
	const start = this.tokenStart;
	let value;
	switch (this.tokenType) {
		case 7:
			value = decode(this.consume(7));
			break;
		case 2:
			if (!this.cmpStr(this.tokenStart, this.tokenEnd, "url(")) this.error("Function name must be `url`");
			this.eat(2);
			this.skipSC();
			value = decode$1(this.consume(5));
			this.skipSC();
			if (!this.eof) this.eat(22);
			break;
		default: this.error("Url or Function is expected");
	}
	return {
		type: "Url",
		loc: this.getLocation(start, this.tokenStart),
		value
	};
}
function generate$3(node) {
	this.token(7, encode(node.value));
}
//#endregion
//#region node_modules/.pnpm/css-tree@3.2.1/node_modules/css-tree/lib/syntax/node/Value.js
var Value_exports = /* @__PURE__ */ __exportAll({
	generate: () => generate$2,
	name: () => name$1,
	parse: () => parse$3,
	structure: () => structure$1
});
const name$1 = "Value";
const structure$1 = { children: [[]] };
function parse$3() {
	const start = this.tokenStart;
	const children = this.readSequence(this.scope.Value);
	return {
		type: "Value",
		loc: this.getLocation(start, this.tokenStart),
		children
	};
}
function generate$2(node) {
	this.children(node);
}
//#endregion
//#region node_modules/.pnpm/css-tree@3.2.1/node_modules/css-tree/lib/syntax/node/WhiteSpace.js
var WhiteSpace_exports = /* @__PURE__ */ __exportAll({
	generate: () => generate$1,
	name: () => name,
	parse: () => parse$2,
	structure: () => structure
});
const SPACE = Object.freeze({
	type: "WhiteSpace",
	loc: null,
	value: " "
});
const name = "WhiteSpace";
const structure = { value: String };
function parse$2() {
	this.eat(13);
	return SPACE;
}
function generate$1(node) {
	this.token(13, node.value);
}
//#endregion
//#region node_modules/.pnpm/css-tree@3.2.1/node_modules/css-tree/lib/syntax/node/index.js
var node_exports = /* @__PURE__ */ __exportAll({
	AnPlusB: () => AnPlusB_exports,
	Atrule: () => Atrule_exports,
	AtrulePrelude: () => AtrulePrelude_exports,
	AttributeSelector: () => AttributeSelector_exports,
	Block: () => Block_exports,
	Brackets: () => Brackets_exports,
	CDC: () => CDC_exports,
	CDO: () => CDO_exports,
	ClassSelector: () => ClassSelector_exports,
	Combinator: () => Combinator_exports,
	Comment: () => Comment_exports,
	Condition: () => Condition_exports,
	Declaration: () => Declaration_exports,
	DeclarationList: () => DeclarationList_exports,
	Dimension: () => Dimension_exports,
	Feature: () => Feature_exports,
	FeatureFunction: () => FeatureFunction_exports,
	FeatureRange: () => FeatureRange_exports,
	Function: () => Function_exports,
	GeneralEnclosed: () => GeneralEnclosed_exports,
	Hash: () => Hash_exports,
	IdSelector: () => IdSelector_exports,
	Identifier: () => Identifier_exports,
	Layer: () => Layer_exports,
	LayerList: () => LayerList_exports,
	MediaQuery: () => MediaQuery_exports,
	MediaQueryList: () => MediaQueryList_exports,
	NestingSelector: () => NestingSelector_exports,
	Nth: () => Nth_exports,
	Number: () => Number_exports,
	Operator: () => Operator_exports,
	Parentheses: () => Parentheses_exports,
	Percentage: () => Percentage_exports,
	PseudoClassSelector: () => PseudoClassSelector_exports,
	PseudoElementSelector: () => PseudoElementSelector_exports,
	Ratio: () => Ratio_exports,
	Raw: () => Raw_exports,
	Rule: () => Rule_exports,
	Scope: () => Scope_exports,
	Selector: () => Selector_exports,
	SelectorList: () => SelectorList_exports,
	String: () => String_exports,
	StyleSheet: () => StyleSheet_exports,
	SupportsDeclaration: () => SupportsDeclaration_exports,
	TypeSelector: () => TypeSelector_exports,
	UnicodeRange: () => UnicodeRange_exports,
	Url: () => Url_exports,
	Value: () => Value_exports,
	WhiteSpace: () => WhiteSpace_exports
});
//#endregion
//#region node_modules/.pnpm/css-tree@3.2.1/node_modules/css-tree/lib/syntax/config/lexer.js
var lexer_default = {
	generic: true,
	cssWideKeywords,
	...data_default,
	node: node_exports
};
//#endregion
//#region node_modules/.pnpm/css-tree@3.2.1/node_modules/css-tree/lib/syntax/scope/default.js
const NUMBERSIGN$1 = 35;
const ASTERISK$1 = 42;
const PLUSSIGN$1 = 43;
const HYPHENMINUS = 45;
const SOLIDUS$1 = 47;
const U = 117;
function defaultRecognizer(context) {
	switch (this.tokenType) {
		case 4: return this.Hash();
		case 18: return this.Operator();
		case 21: return this.Parentheses(this.readSequence, context.recognizer);
		case 19: return this.Brackets(this.readSequence, context.recognizer);
		case 5: return this.String();
		case 12: return this.Dimension();
		case 11: return this.Percentage();
		case 10: return this.Number();
		case 2: return this.cmpStr(this.tokenStart, this.tokenEnd, "url(") ? this.Url() : this.Function(this.readSequence, context.recognizer);
		case 7: return this.Url();
		case 1: if (this.cmpChar(this.tokenStart, U) && this.cmpChar(this.tokenStart + 1, PLUSSIGN$1)) return this.UnicodeRange();
		else return this.Identifier();
		case 9: {
			const code = this.charCodeAt(this.tokenStart);
			if (code === SOLIDUS$1 || code === ASTERISK$1 || code === PLUSSIGN$1 || code === HYPHENMINUS) return this.Operator();
			if (code === NUMBERSIGN$1) this.error("Hex or identifier is expected", this.tokenStart + 1);
			break;
		}
	}
}
//#endregion
//#region node_modules/.pnpm/css-tree@3.2.1/node_modules/css-tree/lib/syntax/scope/atrulePrelude.js
var atrulePrelude_default = { getNode: defaultRecognizer };
//#endregion
//#region node_modules/.pnpm/css-tree@3.2.1/node_modules/css-tree/lib/syntax/scope/selector.js
const NUMBERSIGN = 35;
const AMPERSAND = 38;
const ASTERISK = 42;
const PLUSSIGN = 43;
const SOLIDUS = 47;
const FULLSTOP = 46;
const GREATERTHANSIGN = 62;
const VERTICALLINE = 124;
const TILDE = 126;
function onWhiteSpace(next, children) {
	if (children.last !== null && children.last.type !== "Combinator" && next !== null && next.type !== "Combinator") children.push({
		type: "Combinator",
		loc: null,
		name: " "
	});
}
function getNode() {
	switch (this.tokenType) {
		case 19: return this.AttributeSelector();
		case 4: return this.IdSelector();
		case 16: if (this.lookupType(1) === 16) return this.PseudoElementSelector();
		else return this.PseudoClassSelector();
		case 1: return this.TypeSelector();
		case 10:
		case 11: return this.Percentage();
		case 12:
			if (this.charCodeAt(this.tokenStart) === FULLSTOP) this.error("Identifier is expected", this.tokenStart + 1);
			break;
		case 9: switch (this.charCodeAt(this.tokenStart)) {
			case PLUSSIGN:
			case GREATERTHANSIGN:
			case TILDE:
			case SOLIDUS: return this.Combinator();
			case FULLSTOP: return this.ClassSelector();
			case ASTERISK:
			case VERTICALLINE: return this.TypeSelector();
			case NUMBERSIGN: return this.IdSelector();
			case AMPERSAND: return this.NestingSelector();
		}
	}
}
var selector_default = {
	onWhiteSpace,
	getNode
};
//#endregion
//#region node_modules/.pnpm/css-tree@3.2.1/node_modules/css-tree/lib/syntax/function/expression.js
function expression_default() {
	return this.createSingleNodeList(this.Raw(null, false));
}
//#endregion
//#region node_modules/.pnpm/css-tree@3.2.1/node_modules/css-tree/lib/syntax/function/var.js
function var_default() {
	const children = this.createList();
	this.skipSC();
	children.push(this.Identifier());
	this.skipSC();
	if (this.tokenType === 18) {
		children.push(this.Operator());
		const startIndex = this.tokenIndex;
		const value = this.parseCustomProperty ? this.Value(null) : this.Raw(this.consumeUntilExclamationMarkOrSemicolon, false);
		if (value.type === "Value" && value.children.isEmpty) {
			for (let offset = startIndex - this.tokenIndex; offset <= 0; offset++) if (this.lookupType(offset) === 13) {
				value.children.appendData({
					type: "WhiteSpace",
					loc: null,
					value: " "
				});
				break;
			}
		}
		children.push(value);
	}
	return children;
}
//#endregion
//#region node_modules/.pnpm/css-tree@3.2.1/node_modules/css-tree/lib/syntax/scope/value.js
function isPlusMinusOperator(node) {
	return node !== null && node.type === "Operator" && (node.value[node.value.length - 1] === "-" || node.value[node.value.length - 1] === "+");
}
var value_default = {
	getNode: defaultRecognizer,
	onWhiteSpace(next, children) {
		if (isPlusMinusOperator(next)) next.value = " " + next.value;
		if (isPlusMinusOperator(children.last)) children.last.value += " ";
	},
	"expression": expression_default,
	"var": var_default
};
//#endregion
//#region node_modules/.pnpm/css-tree@3.2.1/node_modules/css-tree/lib/syntax/scope/index.js
var scope_exports = /* @__PURE__ */ __exportAll({
	AtrulePrelude: () => atrulePrelude_default,
	Selector: () => selector_default,
	Value: () => value_default
});
//#endregion
//#region node_modules/.pnpm/css-tree@3.2.1/node_modules/css-tree/lib/syntax/atrule/container.js
const nonContainerNameKeywords = /* @__PURE__ */ new Set([
	"none",
	"and",
	"not",
	"or"
]);
var container_default = { parse: {
	prelude() {
		const children = this.createList();
		if (this.tokenType === 1) {
			const name = this.substring(this.tokenStart, this.tokenEnd);
			if (!nonContainerNameKeywords.has(name.toLowerCase())) children.push(this.Identifier());
		}
		children.push(this.Condition("container"));
		return children;
	},
	block(nested = false) {
		return this.Block(nested);
	}
} };
//#endregion
//#region node_modules/.pnpm/css-tree@3.2.1/node_modules/css-tree/lib/syntax/atrule/font-face.js
var font_face_default = { parse: {
	prelude: null,
	block() {
		return this.Block(true);
	}
} };
//#endregion
//#region node_modules/.pnpm/css-tree@3.2.1/node_modules/css-tree/lib/syntax/atrule/import.js
function parseWithFallback(parse, fallback) {
	return this.parseWithFallback(() => {
		try {
			return parse.call(this);
		} finally {
			this.skipSC();
			if (this.lookupNonWSType(0) !== 22) this.error();
		}
	}, fallback || (() => this.Raw(null, true)));
}
const parseFunctions = {
	layer() {
		this.skipSC();
		const children = this.createList();
		const node = parseWithFallback.call(this, this.Layer);
		if (node.type !== "Raw" || node.value !== "") children.push(node);
		return children;
	},
	supports() {
		this.skipSC();
		const children = this.createList();
		const node = parseWithFallback.call(this, this.Declaration, () => parseWithFallback.call(this, () => this.Condition("supports")));
		if (node.type !== "Raw" || node.value !== "") children.push(node);
		return children;
	}
};
//#endregion
//#region node_modules/.pnpm/css-tree@3.2.1/node_modules/css-tree/lib/syntax/atrule/index.js
var atrule_default = {
	container: container_default,
	"font-face": font_face_default,
	import: { parse: {
		prelude() {
			const children = this.createList();
			switch (this.tokenType) {
				case 5:
					children.push(this.String());
					break;
				case 7:
				case 2:
					children.push(this.Url());
					break;
				default: this.error("String or url() is expected");
			}
			this.skipSC();
			if (this.tokenType === 1 && this.cmpStr(this.tokenStart, this.tokenEnd, "layer")) children.push(this.Identifier());
			else if (this.tokenType === 2 && this.cmpStr(this.tokenStart, this.tokenEnd, "layer(")) children.push(this.Function(null, parseFunctions));
			this.skipSC();
			if (this.tokenType === 2 && this.cmpStr(this.tokenStart, this.tokenEnd, "supports(")) children.push(this.Function(null, parseFunctions));
			if (this.lookupNonWSType(0) === 1 || this.lookupNonWSType(0) === 21) children.push(this.MediaQueryList());
			return children;
		},
		block: null
	} },
	layer: { parse: {
		prelude() {
			return this.createSingleNodeList(this.LayerList());
		},
		block() {
			return this.Block(false);
		}
	} },
	media: { parse: {
		prelude() {
			return this.createSingleNodeList(this.MediaQueryList());
		},
		block(nested = false) {
			return this.Block(nested);
		}
	} },
	nest: { parse: {
		prelude() {
			return this.createSingleNodeList(this.SelectorList());
		},
		block() {
			return this.Block(true);
		}
	} },
	page: { parse: {
		prelude() {
			return this.createSingleNodeList(this.SelectorList());
		},
		block() {
			return this.Block(true);
		}
	} },
	scope: { parse: {
		prelude() {
			return this.createSingleNodeList(this.Scope());
		},
		block(nested = false) {
			return this.Block(nested);
		}
	} },
	"starting-style": { parse: {
		prelude: null,
		block(nested = false) {
			return this.Block(nested);
		}
	} },
	supports: { parse: {
		prelude() {
			return this.createSingleNodeList(this.Condition("supports"));
		},
		block(nested = false) {
			return this.Block(nested);
		}
	} }
};
//#endregion
//#region node_modules/.pnpm/css-tree@3.2.1/node_modules/css-tree/lib/syntax/pseudo/lang.js
function parseLanguageRangeList() {
	const children = this.createList();
	this.skipSC();
	loop: while (!this.eof) {
		switch (this.tokenType) {
			case 1:
				children.push(this.Identifier());
				break;
			case 5:
				children.push(this.String());
				break;
			case 18:
				children.push(this.Operator());
				break;
			case 22: break loop;
			default: this.error("Identifier, string or comma is expected");
		}
		this.skipSC();
	}
	return children;
}
//#endregion
//#region node_modules/.pnpm/css-tree@3.2.1/node_modules/css-tree/lib/syntax/pseudo/index.js
const selectorList = { parse() {
	return this.createSingleNodeList(this.SelectorList());
} };
const selector = { parse() {
	return this.createSingleNodeList(this.Selector());
} };
const identList = { parse() {
	return this.createSingleNodeList(this.Identifier());
} };
const langList = { parse: parseLanguageRangeList };
const nth = { parse() {
	return this.createSingleNodeList(this.Nth());
} };
//#endregion
//#region node_modules/.pnpm/css-tree@3.2.1/node_modules/css-tree/lib/syntax/config/parser.js
var parser_default = {
	parseContext: {
		default: "StyleSheet",
		stylesheet: "StyleSheet",
		atrule: "Atrule",
		atrulePrelude(options) {
			return this.AtrulePrelude(options.atrule ? String(options.atrule) : null);
		},
		mediaQueryList: "MediaQueryList",
		mediaQuery: "MediaQuery",
		condition(options) {
			return this.Condition(options.kind);
		},
		rule: "Rule",
		selectorList: "SelectorList",
		selector: "Selector",
		block() {
			return this.Block(true);
		},
		declarationList: "DeclarationList",
		declaration: "Declaration",
		value: "Value"
	},
	features: {
		supports: { selector() {
			return this.Selector();
		} },
		container: { style() {
			return this.Declaration();
		} }
	},
	scope: scope_exports,
	atrule: atrule_default,
	pseudo: {
		"dir": identList,
		"has": selectorList,
		"lang": langList,
		"matches": selectorList,
		"is": selectorList,
		"-moz-any": selectorList,
		"-webkit-any": selectorList,
		"where": selectorList,
		"not": selectorList,
		"nth-child": nth,
		"nth-last-child": nth,
		"nth-last-of-type": nth,
		"nth-of-type": nth,
		"slotted": selector,
		"host": selector,
		"host-context": selector
	},
	node: /* @__PURE__ */ __exportAll({
		AnPlusB: () => parse$50,
		Atrule: () => parse$49,
		AtrulePrelude: () => parse$48,
		AttributeSelector: () => parse$47,
		Block: () => parse$46,
		Brackets: () => parse$45,
		CDC: () => parse$44,
		CDO: () => parse$43,
		ClassSelector: () => parse$42,
		Combinator: () => parse$41,
		Comment: () => parse$40,
		Condition: () => parse$39,
		Declaration: () => parse$38,
		DeclarationList: () => parse$37,
		Dimension: () => parse$36,
		Feature: () => parse$35,
		FeatureFunction: () => parse$34,
		FeatureRange: () => parse$33,
		Function: () => parse$32,
		GeneralEnclosed: () => parse$31,
		Hash: () => parse$30,
		IdSelector: () => parse$28,
		Identifier: () => parse$29,
		Layer: () => parse$27,
		LayerList: () => parse$26,
		MediaQuery: () => parse$25,
		MediaQueryList: () => parse$24,
		NestingSelector: () => parse$23,
		Nth: () => parse$22,
		Number: () => parse$21,
		Operator: () => parse$20,
		Parentheses: () => parse$19,
		Percentage: () => parse$18,
		PseudoClassSelector: () => parse$17,
		PseudoElementSelector: () => parse$16,
		Ratio: () => parse$15,
		Raw: () => parse$14,
		Rule: () => parse$13,
		Scope: () => parse$12,
		Selector: () => parse$11,
		SelectorList: () => parse$10,
		String: () => parse$9,
		StyleSheet: () => parse$8,
		SupportsDeclaration: () => parse$7,
		TypeSelector: () => parse$6,
		UnicodeRange: () => parse$5,
		Url: () => parse$4,
		Value: () => parse$3,
		WhiteSpace: () => parse$2
	})
};
//#endregion
//#region node_modules/.pnpm/css-tree@3.2.1/node_modules/css-tree/lib/syntax/config/walker.js
var walker_default = { node: node_exports };
//#endregion
//#region node_modules/.pnpm/css-tree@3.2.1/node_modules/css-tree/lib/index.js
const { tokenize: tokenize$1, parse: parse$1, generate, lexer, createLexer, walk, find, findLast, findAll, toPlainObject, fromPlainObject, fork } = create_default({
	...lexer_default,
	...parser_default,
	...walker_default
});
//#endregion
//#region src/vendor/widget-sandbox/src/host/url-policy.ts
/** The profile's image types (PNG, JPEG, GIF, WebP: the decoder runs in the app process; SVG, AVIF, BMP and ICO are out). */
const IMAGE_MIME = new Set(PROFILE_IMAGES);
/** blob: URLs created by the host itself. Nothing else may use the blob: scheme. */
const hostBlobUrls = /* @__PURE__ */ new Set();
/**
* Strip the characters the URL parser ignores (ASCII tab/newline anywhere,
* C0 control + space at the ends) so that "ja\nvascript:" style tricks and
* leading whitespace cannot disguise a scheme.
*/
function normalize(raw) {
	return raw.replace(/[\t\n\r]/g, "").replace(/^[\u0000- ]+|[\u0000- ]+$/g, "");
}
function dataMime(url) {
	const m = /^data:([^,;]*)(?:;[^,]*)?,/i.exec(url);
	return m ? m[1].trim().toLowerCase() : null;
}
/** An image no decoder takes: it fires `error` and has no size, as a broken one does. */
const BROKEN_IMAGE = "data:image/png;base64,";
/**
* How far into an image what gives its size is looked for: a JPEG's frame header past the segments before it, a GIF's
* first image descriptor past its extensions. A widget's document is at most 32 KB, an image in it smaller still, and
* one a script makes carries no camera's metadata.
*/
const HEADER_SCAN_BYTES = 65536;
/** The least of a plain base64 body decoded at once (4096 characters), from where a read leaves the last window. */
const BLOCK_BYTES = 3072;
/**
* A data: URL's body as fetch decodes it (percent-decoding, then forgiving base64), read without a copy: a read inside
* the bytes decoded last costs a comparison, and those are decoded again only where a read leaves them. A plain base64
* body (the usual one: no escapes, no white space) is decoded by windows, byte i lying in the four characters of group
* i / 3, from where the read starts and at least BLOCK_BYTES on, and is only checked to be plain up to them; any other is
* decoded once from its start, as far as the reads go (`bodyDecoder`). So a scan stepping through the bytes decodes each
* about once, one skipping far decodes where it lands, and none decodes much past HEADER_SCAN_BYTES, however long the URL.
*/
function dataBytes(url) {
	const hash = url.indexOf("#");
	const data = hash < 0 ? url : url.slice(0, hash);
	const comma = data.indexOf(",");
	const base64 = comma >= 0 && /;[\t\n\f\r ]*base64$/i.test(data.slice(0, comma).replace(/[\t\n\f\r ]+$/, ""));
	const body = comma < 0 ? "" : data.slice(comma + 1);
	let plain = base64 ? 0 : -1;
	let start = 0, text = "", toEnd = false;
	let failed = false;
	let decoder;
	/** Decodes the bytes from…to where the last ones do not hold them: whether the body has them. */
	const load = (from, to) => {
		if (failed || from >= start && toEnd) return false;
		if (plain >= 0) {
			const first = Math.floor(from / 3) * 3;
			const end = Math.min(Math.ceil(Math.max(to, first + BLOCK_BYTES) / 3) * 4, body.length);
			if (end > plain) plain = /[%\t\n\f\r ]/.test(body.slice(plain, end)) ? -1 : end;
			if (plain >= 0) {
				try {
					text = atob(body.slice(first / 3 * 4, end));
				} catch {
					failed = true;
					return false;
				}
				start = first;
				toEnd = end === body.length;
				return to <= start + text.length;
			}
		}
		decoder ?? (decoder = bodyDecoder(body, base64));
		const decoded = decoder(to);
		if (decoded === null) {
			failed = true;
			return false;
		}
		start = 0;
		text = decoded;
		toEnd = decoded.length < to;
		return !toEnd;
	};
	return {
		has: (from, to) => from >= start && to <= start + text.length || load(from, to),
		at: (i) => text.charCodeAt(i - start)
	};
}
/**
* Decodes a data: URL's body from its start (percent-decoding, then forgiving base64 if `base64`) part by part, with
* the engine's own string functions, into a binary string it keeps: `upTo(n)` gives it with at least the first n bytes
* if the body has them, null if the body is no base64.
*/
function bodyDecoder(body, base64) {
	let decoded = "", read = 0, carry = "", failed = false;
	return (n) => {
		while (!failed && decoded.length < n && read < body.length) {
			let part = body.slice(read, read + Math.max(4096, decoded.length));
			const last = read + part.length >= body.length;
			if (!last) part = part.slice(0, part.length - cutTail(part));
			read += part.length;
			const text = percentDecode(part);
			if (!base64) {
				decoded += text;
				continue;
			}
			let b64 = carry + text.replace(/[\t\n\f\r ]/g, "");
			carry = last ? "" : b64.slice(b64.length - b64.length % 4);
			b64 = b64.slice(0, b64.length - carry.length);
			try {
				decoded += atob(b64);
			} catch {
				failed = true;
			}
		}
		return failed ? null : decoded;
	};
}
/** How many characters at the end of `part` start what the next part completes: `%`, `%X`, a high surrogate. */
function cutTail(part) {
	const n = part.length, last = part.charCodeAt(n - 1);
	if (last === 37 || last >= 55296 && last <= 56319) return 1;
	return n > 1 && part.charCodeAt(n - 2) === 37 && /[0-9a-f]/i.test(part[n - 1]) ? 2 : 0;
}
/** Percent-decoding as the URL standard does it, into a binary string (one character a byte). */
function percentDecode(text) {
	if (/[^\x00-\x7f]/.test(text)) text = unescape(encodeURIComponent(text.replace(/[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff]/g, (c) => c.length === 2 ? c : "�")));
	if (!text.includes("%")) return text;
	return unescape(/%u/i.test(text) ? text.replace(/%u/gi, "%25u") : text);
}
/**
* The size a decoder would give a data: image, by its signature (the browser sniffs it: the declared type does not
* pick the decoder), or null for none of the profile's formats — BMP, ICO or AVIF bytes behind an image/png type
* could reach decoders the profile keeps out.
*/
function dataImageSize(url) {
	const { has, at } = dataBytes(url);
	const u16be = (i) => at(i) << 8 | at(i + 1);
	const le16 = (i) => at(i) | at(i + 1) << 8;
	const u24le = (i) => at(i) | at(i + 1) << 8 | at(i + 2) << 16;
	/** Whether the bytes at i are those of `magic`. */
	const is = (i, magic) => {
		if (!has(i, i + magic.length)) return false;
		for (let k = 0; k < magic.length; k++) if (at(i + k) !== magic.charCodeAt(k)) return false;
		return true;
	};
	if (is(0, "PNG\r\n\n") && is(12, "IHDR") && has(0, 24)) return [u16be(16) * 65536 + u16be(18), u16be(20) * 65536 + u16be(22)];
	if ((is(0, "GIF87a") || is(0, "GIF89a")) && has(0, 13)) {
		const screen = [le16(6), le16(8)];
		let blocks = 0;
		for (let i = 13 + (at(10) & 128 ? 3 << (at(10) & 7) + 1 : 0), extensions = 0; i < HEADER_SCAN_BYTES && extensions < 256; extensions++) {
			if (!has(i, i + 2)) return null;
			if (at(i) === 44) return has(i, i + 9) ? [Math.max(screen[0], le16(i + 1) + le16(i + 5)), Math.max(screen[1], le16(i + 3) + le16(i + 7))] : null;
			if (at(i) !== 33) return null;
			for (i += 2;;) {
				if (i >= HEADER_SCAN_BYTES || ++blocks > 4096 || !has(i, i + 1)) return null;
				const n = at(i);
				i += 1 + n;
				if (n === 0) break;
			}
		}
		return null;
	}
	if (is(0, "RIFF") && is(8, "WEBP")) {
		if (is(12, "VP8X") && has(0, 30)) return [1 + u24le(24), 1 + u24le(27)];
		if (is(12, "VP8L") && has(0, 25) && at(20) === 47) return [1 + (at(21) | (at(22) & 63) << 8), 1 + (at(22) >> 6 | at(23) << 2 | (at(24) & 15) << 10)];
		if (is(12, "VP8 ") && has(0, 30)) return [(at(26) | at(27) << 8) & 16383, (at(28) | at(29) << 8) & 16383];
		return null;
	}
	if (is(0, "ÿØ") && has(0, 4)) for (let i = 2, steps = 0; i + 9 <= HEADER_SCAN_BYTES && steps < 1024; steps++) {
		if (!has(i, i + 4) || at(i) !== 255) return null;
		const marker = at(i + 1);
		if (marker === 255) {
			i++;
			continue;
		}
		if (marker === 1 || marker >= 208 && marker <= 216) {
			i += 2;
			continue;
		}
		if (marker >= 192 && marker <= 207 && marker !== 196 && marker !== 200 && marker !== 204) return has(i, i + 9) ? [u16be(i + 7), u16be(i + 5)] : null;
		if (marker === 217 || marker === 218) return null;
		i += 2 + u16be(i + 2);
	}
	return null;
}
/** The last data: image checked, and the answer: elements in a row often show one image (a list's icon). */
let lastImage = null;
/**
* Returns the URL to use (normalized) if it is allowed for `kind`, else null.
* Fragments are returned as-is. No relative URLs: there is nothing to resolve against.
*/
function checkUrl(raw, kind) {
	const url = normalize(String(raw));
	if (url.startsWith("#")) return /^#[^\s"'()\\<>]*$/.test(url) ? url : null;
	if (kind === "fragment-only") return null;
	if (/^data:/i.test(url)) {
		const mime = dataMime(url);
		if (mime === null) return null;
		if (kind !== "image" || !IMAGE_MIME.has(mime)) return null;
		if (lastImage?.url === url) return lastImage.checked;
		const size = dataImageSize(url);
		const checked = !size ? BROKEN_IMAGE : size[0] * size[1] <= 1048576 ? url : null;
		lastImage = {
			url,
			checked
		};
		return checked;
	}
	if (/^blob:/i.test(url)) return hostBlobUrls.has(url) ? url : null;
	return null;
}
function isFragment(raw) {
	return normalize(String(raw)).startsWith("#");
}
/** 1×1 transparent placeholder used where an external image was stripped. */
const PLACEHOLDER_IMAGE = "data:image/svg+xml," + encodeURIComponent("<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"48\" height=\"48\" viewBox=\"0 0 48 48\"><rect width=\"48\" height=\"48\" fill=\"#8882\"/><path d=\"M8 36l10-12 8 9 6-7 8 10z\" fill=\"#8886\"/><circle cx=\"33\" cy=\"15\" r=\"4\" fill=\"#8886\"/></svg>");
//#endregion
//#region src/vendor/widget-sandbox/src/shared/css-supports.ts
const CSS = PROFILE_CSS$1;
const PROPERTIES = new Set(CSS.properties);
const FUNCTIONS = new Set(CSS.functions);
const UNITS = new Set(CSS.units);
const FILTER_FUNCTIONS$1 = new Set(CSS.filterFunctions);
const TRANSFORM_3D$1 = new Set(CSS.transform3d);
const GENERIC_FONTS = new Set(CSS.fonts.generic);
const PSEUDO_CLASSES = /* @__PURE__ */ new Set([...CSS.pseudoClasses, ...Object.keys(CSS.pseudoRewrite)]);
const PSEUDO_ELEMENTS = new Set(CSS.pseudoElements);
const VALUES = CSS.values;
const REWRITE = CSS.rewrite;
const GLOBAL_KEYWORDS$1 = /* @__PURE__ */ new Set([
	"inherit",
	"initial",
	"unset",
	"revert",
	"revert-layer"
]);
const FONT_SIZE_KEYWORDS$1 = /* @__PURE__ */ new Set([
	"xx-small",
	"x-small",
	"small",
	"medium",
	"large",
	"x-large",
	"xx-large",
	"xxx-large",
	"smaller",
	"larger"
]);
const OVERFLOW = /* @__PURE__ */ new Set([
	"overflow",
	"overflow-x",
	"overflow-y"
]);
const IMAGE_URL = new RegExp("^(?:#|data:(?:" + PROFILE_IMAGES.map((m) => m.replace(/[+.]/g, "\\$&")).join("|") + ")[;,])", "i");
function cssPropertyInProfile(name) {
	const p = name.toLowerCase();
	return p.startsWith("--") || PROPERTIES.has(p);
}
const cssFunctionInProfile = (name) => FUNCTIONS.has(name.toLowerCase());
const cssUnitInProfile = (unit) => UNITS.has(unit.toLowerCase());
const cssPseudoClassInProfile = (name) => PSEUDO_CLASSES.has(name.toLowerCase());
const cssPseudoElementInProfile = (name) => PSEUDO_ELEMENTS.has(name.toLowerCase());
const isGenericFont = (name) => GENERIC_FONTS.has(name.toLowerCase());
const IDENT_START = /[a-zA-Z_\-\u0080-￿\\]/;
const IDENT_CHAR = /[\w\-\u0080-￿\\]/;
function tokenize(s) {
	let i = 0;
	const readIdent = () => {
		const a = i;
		while (i < s.length && IDENT_CHAR.test(s[i])) i += s[i] === "\\" ? 2 : 1;
		return s.slice(a, i);
	};
	const list = (close) => {
		const out = [];
		while (i < s.length) {
			const c = s[i];
			if (/\s/.test(c)) {
				i++;
				continue;
			}
			if (close && c === close) {
				i++;
				return out;
			}
			if (c === ")" || c === "]" || c === "}" || c === ";" || c === "{") return null;
			if (c === "\"" || c === "'") {
				let v = "";
				i++;
				while (i < s.length && s[i] !== c) {
					if (s[i] === "\\") i++;
					v += s[i++] ?? "";
				}
				if (i >= s.length) return null;
				i++;
				out.push({
					t: "str",
					v
				});
				continue;
			}
			if (c === "#") {
				i++;
				readIdent();
				out.push({ t: "hash" });
				continue;
			}
			const num = /^[+-]?(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?/.exec(s.slice(i));
			if (num && !(c === "-" && IDENT_START.test(s[i + 1] ?? "") && !/\d/.test(s[i + 1]))) {
				i += num[0].length;
				if (s[i] === "%") {
					i++;
					out.push({ t: "pct" });
				} else if (i < s.length && IDENT_START.test(s[i]) && !(s[i] === "-" && !IDENT_START.test(s[i + 1] ?? ""))) out.push({
					t: "dim",
					unit: readIdent()
				});
				else out.push({ t: "num" });
				continue;
			}
			if (IDENT_START.test(c) && !(c === "-" && /\d/.test(s[i + 1] ?? ""))) {
				const v = readIdent();
				if (!v) return null;
				if (s[i] === "(") {
					i++;
					if (v.toLowerCase() === "url") {
						const a = i;
						const end = s.indexOf(")", i);
						if (end < 0) return null;
						i = end + 1;
						out.push({
							t: "url",
							v: s.slice(a, end).trim().replace(/^(['"])(.*)\1$/, "$2")
						});
						continue;
					}
					const args = list(")");
					if (!args) return null;
					out.push({
						t: "func",
						v: v.toLowerCase(),
						args
					});
					continue;
				}
				out.push({
					t: "ident",
					v
				});
				continue;
			}
			if (c === "!") return null;
			out.push({
				t: "delim",
				v: c
			});
			i++;
		}
		return close ? null : out;
	};
	return list(null);
}
function* deep(toks) {
	for (const t of toks) {
		yield t;
		if (t.t === "func") yield* deep(t.args);
	}
}
const hasVar = (toks) => [...deep(toks)].some((t) => t.t === "func" && (t.v === "var" || t.v === "env" || t.v === "attr"));
/** Commas at the top level split a list (font families, filter is space-separated). */
function splitCommas(toks) {
	const out = [[]];
	for (const t of toks) if (t.t === "delim" && t.v === ",") out.push([]);
	else out[out.length - 1].push(t);
	return out;
}
/** Is this font-family list kept as written (generic families, keywords, var())? */
function familiesSupported(toks) {
	for (const group of splitCommas(toks)) {
		if (group.length === 0) return false;
		if (group.some((t) => t.t === "func")) continue;
		if (group.length !== 1 || group[0].t !== "ident") return false;
		const name = group[0].v.toLowerCase();
		if (!GENERIC_FONTS.has(name) && !GLOBAL_KEYWORDS$1.has(name)) return false;
	}
	return true;
}
/** The family part of a `font` shorthand: everything after the size (and `/ line-height`), or null when there is none. */
function fontShorthandFamilyStart(items, kind) {
	for (let i = 0; i < items.length; i++) {
		if (!kind(items[i]).size) continue;
		let j = i + 1;
		if (j < items.length && kind(items[j]).slash) j += 2;
		return j;
	}
	return -1;
}
function tokKind(t) {
	return {
		size: t.t === "dim" || t.t === "pct" || t.t === "ident" && FONT_SIZE_KEYWORDS$1.has(t.v.toLowerCase()) || t.t === "func" && [
			"calc",
			"min",
			"max",
			"clamp"
		].includes(t.v),
		slash: t.t === "delim" && t.v === "/"
	};
}
/** `env(<safe-area-inset-*>[, fallback])`: the validator's rewrite keeps its meaning; another name is replaced or dropped. */
const envSupported = (args) => args[0]?.t === "ident" && Object.prototype.hasOwnProperty.call(SAFE_AREA_ENV_VARIABLES, args[0].v) && (args.length === 1 || args[1].t === "delim" && args[1].v === ",");
function valueTokensSupported(toks) {
	for (const t of deep(toks)) {
		if (t.t === "func" && (!FUNCTIONS.has(t.v) || t.v === "env" && !envSupported(t.args))) return false;
		if (t.t === "dim" && !UNITS.has(t.unit.toLowerCase())) return false;
		if (t.t === "url" && !IMAGE_URL.test(t.v)) return false;
	}
	return true;
}
/** `CSS.supports(property, value)`: would the validator keep `property: value` as written? */
function supportsDeclaration(property, value) {
	const prop = String(property).trim().toLowerCase();
	const text = String(value).trim();
	if (!prop || !text) return false;
	if (!cssPropertyInProfile(prop)) return false;
	const toks = tokenize(text);
	if (!toks || !toks.length) return false;
	if (!valueTokensSupported(toks)) return false;
	if (prop.startsWith("--")) return true;
	const idents = toks.filter((t) => t.t === "ident").map((t) => t.v.toLowerCase());
	if (toks.length === 1 && idents.length === 1 && GLOBAL_KEYWORDS$1.has(idents[0])) return true;
	const varUsed = hasVar(toks);
	const allowed = VALUES[prop];
	if (allowed && !varUsed && !(toks.length === 1 && idents.length === 1 && allowed.includes(idents[0]))) return false;
	const rewriteKey = OVERFLOW.has(prop) ? "overflow" : prop;
	if (REWRITE[rewriteKey] && idents.some((v) => Object.prototype.hasOwnProperty.call(REWRITE[rewriteKey], v))) return false;
	if (prop === "background-clip" && idents.includes("text")) return false;
	if (prop === "transform" && [...deep(toks)].some((t) => t.t === "func" && TRANSFORM_3D$1.has(t.v))) return false;
	if (prop === "rotate" && (idents.some((v) => v === "x" || v === "y" || v === "z") || toks.filter((t) => t.t === "num").length > 1) || (prop === "translate" || prop === "scale") && toks.filter((t) => t.t !== "delim").length > 2) return false;
	if ((prop === "filter" || prop === "backdrop-filter" || prop === "-webkit-backdrop-filter") && toks.some((t) => t.t === "func" && !FILTER_FUNCTIONS$1.has(t.v) && t.v !== "var" || t.t === "url")) return false;
	if (prop === "font-family" && !varUsed && !familiesSupported(toks)) return false;
	if (prop === "font" && !varUsed) {
		const start = fontShorthandFamilyStart(toks, tokKind);
		if (start >= 0 && !familiesSupported(toks.slice(start))) return false;
	}
	return true;
}
/** `CSS.supports('selector(…)')`: every pseudo-class and pseudo-element in the profile, no nesting selector. */
function supportsSelector(selector) {
	const s = String(selector).trim();
	if (!s || s.includes("&") || /[{};]/.test(s)) return false;
	const re = /(::?)(-?[a-zA-Z][\w-]*)/g;
	for (let m; m = re.exec(s.replace(/"[^"]*"|'[^']*'|\[[^\]]*\]/g, ""));) if (!(m[1] === "::" ? PSEUDO_ELEMENTS.has(m[2].toLowerCase()) : PSEUDO_CLASSES.has(m[2].toLowerCase()))) return false;
	return true;
}
/**
* A `@supports` condition / `CSS.supports(conditionText)`: `not`, `and`, `or`,
* parentheses, `(property: value)`, `selector(…)`. Anything else (font-tech(),
* font-format(), unknown functions, general enclosed) is false.
*/
function supportsCondition(text) {
	const s = String(text);
	let i = 0;
	const ws = () => {
		while (i < s.length && /\s/.test(s[i])) i++;
	};
	const word = (w) => {
		ws();
		if (s.slice(i, i + w.length).toLowerCase() === w && !/[\w-]/.test(s[i + w.length] ?? "")) {
			i += w.length;
			return true;
		}
		return false;
	};
	/** The text up to the parenthesis that closes the one just consumed. */
	const balanced = () => {
		let depth = 1;
		const a = i;
		let q = "";
		for (; i < s.length; i++) {
			const c = s[i];
			if (q) {
				if (c === "\\") i++;
				else if (c === q) q = "";
				continue;
			}
			if (c === "\"" || c === "'") q = c;
			else if (c === "(") depth++;
			else if (c === ")" && --depth === 0) {
				i++;
				return s.slice(a, i - 1);
			}
		}
		return null;
	};
	const inParens = () => {
		ws();
		if (s.slice(i, i + 9).toLowerCase() === "selector(") {
			i += 9;
			const b = balanced();
			return b === null ? null : supportsSelector(b);
		}
		const fn = /^[a-zA-Z-]+\(/.exec(s.slice(i));
		if (fn) {
			i += fn[0].length;
			return balanced() === null ? null : false;
		}
		if (s[i] !== "(") return null;
		i++;
		const save = i;
		const nested = condition();
		ws();
		if (nested !== null && s[i] === ")") {
			i++;
			return nested;
		}
		i = save;
		const b = balanced();
		if (b === null) return null;
		const colon = b.indexOf(":");
		if (colon <= 0) return false;
		const prop = b.slice(0, colon).trim();
		if (!/^-{0,2}[a-zA-Z_][\w-]*$/.test(prop)) return false;
		return supportsDeclaration(prop, b.slice(colon + 1));
	};
	const condition = () => {
		if (word("not")) {
			const v = inParens();
			return v === null ? null : !v;
		}
		let v = inParens();
		if (v === null) return null;
		for (;;) if (word("and")) {
			const r = inParens();
			if (r === null) return null;
			v = v && r;
		} else if (word("or")) {
			const r = inParens();
			if (r === null) return null;
			v = v || r;
		} else return v;
	};
	const v = condition();
	ws();
	return v === true && i === s.length;
}
//#endregion
//#region src/vendor/widget-sandbox/src/host/css-sanitizer.ts
const DEFAULT_ENV = { colorScheme: "light" };
const VISIBLE_TEXT_ATTRS = /* @__PURE__ */ new Set([
	"value",
	"placeholder",
	"alt",
	"label",
	"title"
]);
/**
* Attributes whose values count against the strict text budgets: the ones a
* renderer draws as text, plus `data-*` and `aria-*`, which `attr()` may read.
*/
function isTextAttr(name) {
	return VISIBLE_TEXT_ATTRS.has(name) || name.startsWith("data-") || name.startsWith("aria-");
}
[...VISIBLE_TEXT_ATTRS];
/**
* The contents of the string tokens in sanitized CSS: what `content`, `quotes`,
* `list-style` or a custom property substituted into them can draw. The input is
* this sanitizer's output, so escapes are already decoded except `\"` and `\\`.
* NativeValidator.cssStringText is the same loop over UTF-16 units.
*/
function cssStringText(css) {
	let out = "";
	for (let i = 0; i < css.length;) {
		const c = css.charCodeAt(i);
		if (c === 92) {
			i += 2;
			continue;
		}
		if (c !== 34 && c !== 39) {
			i++;
			continue;
		}
		let j = i + 1;
		while (j < css.length && css.charCodeAt(j) !== c) {
			if (css.charCodeAt(j) === 92 && j + 1 < css.length) j++;
			out += css[j];
			j++;
		}
		i = j + 1;
	}
	return out;
}
const ALWAYS = "(min-width: 0px)";
const NEVER = "(min-width: 99999px)";
const PROFILE_CSS = PROFILE_TABLES.css;
const ALLOWED_ATRULES = new Set(PROFILE_CSS.atRules);
/** At-rules dropped for security (a URL, a font parser), whatever the profile says. */
const SECURITY_ATRULES = /* @__PURE__ */ new Set([
	"import",
	"namespace",
	"font-face"
]);
const MEDIA_TYPES = new Set(PROFILE_CSS.mediaTypes);
const MEDIA_FEATURES = new Set(PROFILE_CSS.mediaFeatures);
const VALUE_SETS = PROFILE_CSS.values;
const REWRITES = PROFILE_CSS.rewrite;
const FILTER_FUNCTIONS = new Set(PROFILE_CSS.filterFunctions);
const TRANSFORM_3D = new Set(PROFILE_CSS.transform3d);
const FONT_FALLBACK = PROFILE_CSS.fonts.fallback;
const FONT_ALIASES = PROFILE_CSS.fonts.aliases;
const PSEUDO_REWRITE = PROFILE_CSS.pseudoRewrite;
const GLOBAL_KEYWORDS = /* @__PURE__ */ new Set([
	"inherit",
	"initial",
	"unset",
	"revert",
	"revert-layer"
]);
const FONT_SIZE_KEYWORDS = /* @__PURE__ */ new Set([
	"xx-small",
	"x-small",
	"small",
	"medium",
	"large",
	"x-large",
	"xx-large",
	"xxx-large",
	"smaller",
	"larger"
]);
const SUBSTITUTED = (n) => n.type === "Function" && SUBSTITUTION_NAMES.has(n.name.toLowerCase());
const SUBSTITUTION_NAMES = /* @__PURE__ */ new Set([
	"var",
	"env",
	"attr"
]);
/** Functions whose string arguments are interpreted as URLs. */
const URL_FUNCTIONS = /* @__PURE__ */ new Set([
	"image-set",
	"-webkit-image-set",
	"image",
	"src",
	"cross-fade",
	"-webkit-cross-fade"
]);
const SUBSTITUTION_FUNCTIONS = /* @__PURE__ */ new Set([
	"var",
	"env",
	"attr"
]);
const FORBIDDEN_PROPERTIES = /* @__PURE__ */ new Set(["behavior", "-moz-binding"]);
/** Secondary check for at-rule preludes css-tree left unparsed (new syntax). */
const SAFE_RAW_PRELUDE = /^[\w\s\-.,:()<>=%/*+!#]*$/;
const PARSE_OPTS = {
	parseCustomProperty: true,
	positions: false
};
function stripUnicodeControls(s) {
	return s.replace(/\u0000/g, "�");
}
/**
* Check one declaration value in place. Returns false if the declaration must be dropped.
* `urlKind` is always 'image' today (the only URL-taking context left in CSS).
*/
function valueIsSafe(value, urlKind, diag, where, env) {
	if (value.type === "Raw") {
		if (value.value.trim() === "") return true;
		diag("css-dropped", `${where}: unparsable value`);
		return false;
	}
	let ok = true;
	const fnStack = [];
	const visitor = {
		enter(node, item, list) {
			if (!ok) return;
			if (node.type === "Function" && node.name.toLowerCase() === "light-dark" && list) {
				const parts = [[]];
				node.children.forEach((c) => c.type === "Operator" && c.value === "," ? parts.push([]) : parts[parts.length - 1].push(c));
				const chosen = parts[env.colorScheme === "dark" ? 1 : 0] ?? parts[0];
				const repl = new List();
				for (const c of chosen) repl.appendData(c);
				walk({
					type: "Value",
					children: repl
				}, visitor);
				list.replace(item, repl);
				return walk.skip;
			}
			if (node.type === "Function" && node.name.toLowerCase() === "env" && list) {
				if (fnStack.some((f) => URL_FUNCTIONS.has(f))) {
					ok = false;
					diag("css-dropped", `${where}: env() inside a URL-taking function`);
					return;
				}
				const env = resolveEnv(node);
				if (env === null) {
					ok = false;
					diag("profile", `${where}: ${envLabel(node)}`);
					return;
				}
				if (env !== "var") {
					diag("profile", `${where}: ${envLabel(node)} → its fallback`);
					const repl = new List().fromArray(env);
					walk({
						type: "Value",
						children: repl
					}, visitor);
					list.replace(item, repl);
					return walk.skip;
				}
			}
			switch (node.type) {
				case "Raw":
					ok = false;
					diag("css-dropped", `${where}: unparsable value`);
					break;
				case "Dimension":
					if (!cssUnitInProfile(node.unit)) {
						ok = false;
						diag("profile", `${where}: unit ${truncate(node.unit)}`);
						break;
					}
					if (env.scope === "shadow") {
						const unit = CONTAINER_UNITS[node.unit.toLowerCase()];
						if (unit) node.unit = unit;
					}
					break;
				case "Url": {
					const checked = checkUrl(node.value, urlKind);
					if (checked === null) {
						ok = false;
						diag("url-blocked", `${where}: url(${truncate(node.value)})`);
					} else node.value = checked;
					break;
				}
				case "Function": {
					const name = node.name.toLowerCase();
					if (name === "url") {
						ok = false;
						diag("url-blocked", `${where}: url() with modifiers`);
					} else if (!cssFunctionInProfile(name)) {
						ok = false;
						diag("profile", `${where}: ${truncate(name)}()`);
					} else if (fnStack.some((f) => URL_FUNCTIONS.has(f)) && SUBSTITUTION_FUNCTIONS.has(name)) {
						ok = false;
						diag("css-dropped", `${where}: ${name}() inside a URL-taking function`);
					} else if (name === "attr" && env.strict) {
						const first = node.children.first;
						const attr = first?.type === "Identifier" ? first.name.toLowerCase() : "";
						if (!isTextAttr(attr)) {
							ok = false;
							diag("css-dropped", `${where}: attr(${truncate(attr)}) reads an attribute outside the text budget`);
						}
					}
					fnStack.push(name);
					break;
				}
				case "String": if (fnStack.some((f) => URL_FUNCTIONS.has(f))) {
					const checked = checkUrl(node.value, "image");
					if (checked === null) {
						ok = false;
						diag("url-blocked", `${where}: "${truncate(node.value)}" in ${fnStack[fnStack.length - 1]}()`);
					} else node.value = checked;
				}
			}
		},
		leave(node) {
			if (node.type === "Function") fnStack.pop();
		}
	};
	walk(value, visitor);
	return ok;
}
/**
* `env()` (docs/sdk-v1.md §2.17). The engine's own values belong to the document (in the shadow renderer, to the chat
* page) and come from the view's system insets, so none reaches the renderer: `env(safe-area-inset-bottom[, fb])` is
* renamed in place to `var(--tg-content-safe-area-inset-bottom[, fb])`, the root variable the renderer sets ('var');
* any other name gives the nodes of its fallback; null drops the declaration (no fallback, or not `env(<name>[, …])`).
*/
function resolveEnv(node) {
	const args = node.children.toArray();
	const name = args[0]?.type === "Identifier" ? args[0].name : null;
	if (name === null || args.length > 1 && !(args[1].type === "Operator" && args[1].value === ",")) return null;
	const fallback = args.slice(2);
	if (Object.prototype.hasOwnProperty.call(SAFE_AREA_ENV_VARIABLES, name)) {
		node.name = "var";
		args[0].name = SAFE_AREA_ENV_VARIABLES[name];
		return "var";
	}
	return fallback.length ? fallback : null;
}
function envLabel(node) {
	const first = node.children.first;
	return `env(${truncate(first?.type === "Identifier" ? first.name : "")})`;
}
function truncate(s) {
	if (s.length <= 80) return s;
	const last = s.charCodeAt(79);
	return s.slice(0, last >= 55296 && last <= 56319 ? 79 : 80) + "…";
}
function declarationIsSafe(decl, diag, env) {
	const prop = decl.property.toLowerCase();
	if (FORBIDDEN_PROPERTIES.has(prop)) return false;
	if (!cssPropertyInProfile(prop)) {
		diag("profile", `property ${truncate(prop)}`);
		return false;
	}
	if (prop === "color-scheme") {
		const t = generate(decl.value).toLowerCase();
		if (/\blight\b/.test(t) && /\bdark\b/.test(t)) decl.value = parse$1(env.colorScheme, { context: "value" });
	}
	if (FILTER_PROPERTIES.has(prop) && !pruneFilterList(prop, decl, diag)) return false;
	return valueIsSafe(decl.value, "image", diag, prop, env) && valueInProfile(prop, decl, diag, env);
}
const FILTER_PROPERTIES = /* @__PURE__ */ new Set([
	"filter",
	"backdrop-filter",
	"-webkit-backdrop-filter"
]);
/** `filter: blur(2px) grayscale(1)` → `filter: blur(2px)`; false when nothing is left. */
function pruneFilterList(prop, decl, diag) {
	if (decl.value.type !== "Value") return true;
	const items = decl.value.children.toArray();
	const kept = items.filter((n) => {
		if (n.type === "Url" || n.type === "Function" && !FILTER_FUNCTIONS.has(n.name.toLowerCase()) && !SUBSTITUTION_NAMES.has(n.name.toLowerCase())) {
			diag("profile", `${prop}: ${n.type === "Url" ? "url()" : n.name.toLowerCase() + "()"}`);
			return false;
		}
		return true;
	});
	if (kept.length === 0) return false;
	if (kept.length !== items.length) decl.value.children = listOf(kept);
	return true;
}
const ident = (n) => n?.type === "Identifier" ? n.name.toLowerCase() : null;
const listOf = (nodes) => new List().fromArray(nodes);
const comma = () => ({
	type: "Operator",
	value: ","
});
/**
* The profile's rules for one declaration's value (after the security checks):
* false drops the declaration; rewrites happen in place. A value with var(),
* env() or attr() is judged only by what is visible here (the substituted text
* is checked where it is declared, as a custom property).
*/
function valueInProfile(prop, decl, diag, env) {
	if (prop.startsWith("--") || decl.value.type !== "Value") return true;
	const items = decl.value.children.toArray();
	const substituted = items.some((n) => find(n, SUBSTITUTED) !== null);
	const only = items.length === 1 ? ident(items[0]) : null;
	if (only && GLOBAL_KEYWORDS.has(only)) return true;
	const drop = (why) => {
		diag("profile", `${prop}: ${truncate(why)}`);
		return false;
	};
	const allowed = VALUE_SETS[prop];
	const overflow = prop === "overflow" || prop === "overflow-x" || prop === "overflow-y";
	const rewrite = overflow && env.nativeScrolling ? void 0 : REWRITES[overflow ? "overflow" : prop];
	if (rewrite) for (const n of items) {
		const v = ident(n);
		if (v && Object.prototype.hasOwnProperty.call(rewrite, v)) {
			diag("profile", `${prop}: ${v} → ${rewrite[v]}`);
			n.name = rewrite[v];
		}
	}
	if (allowed && !substituted) {
		const v = items.length === 1 ? ident(items[0]) : null;
		if (!v || !allowed.includes(v)) return drop(generate(decl.value));
	}
	switch (prop) {
		case "background-clip":
			if (items.some((n) => ident(n) === "text")) return drop("text");
			break;
		case "transform":
			if (find(decl.value, (n) => n.type === "Function" && TRANSFORM_3D.has(n.name.toLowerCase()))) return drop("3D function");
			break;
		case "rotate":
			if (items.some((n) => [
				"x",
				"y",
				"z"
			].includes(ident(n) ?? "")) || items.filter((n) => n.type === "Number").length > 1) return drop("3D rotation");
			break;
		case "translate":
		case "scale":
			if (items.filter((n) => n.type !== "Operator").length > 2) return drop("3D");
			break;
		case "font-family":
			decl.value.children = listOf(genericFamilies(items, diag));
			break;
		case "font": {
			const start = fontShorthandFamilyStart(items, fontTokenKind);
			if (start > 0 && start < items.length) decl.value.children = listOf([...items.slice(0, start), ...genericFamilies(items.slice(start), diag)]);
			break;
		}
	}
	return true;
}
function fontTokenKind(n) {
	return {
		size: n.type === "Dimension" || n.type === "Percentage" || n.type === "Identifier" && FONT_SIZE_KEYWORDS.has(n.name.toLowerCase()) || n.type === "Function" && [
			"calc",
			"min",
			"max",
			"clamp"
		].includes(n.name.toLowerCase()),
		slash: n.type === "Operator" && n.value === "/"
	};
}
/**
* A font-family list reduced to the profile's generic families (D3b): the
* vendor names of the system UI font (`-apple-system`, `BlinkMacSystemFont`)
* become `system-ui`, other named families are removed, `ui-monospace` & co.
* get their basic generic after them (only WebKit resolves them), an empty
* list becomes `system-ui`.
*/
function genericFamilies(items, diag) {
	const groups = [[]];
	for (const n of items) if (n.type === "Operator" && n.value === ",") groups.push([]);
	else groups[groups.length - 1].push(n);
	const kept = [];
	const names = /* @__PURE__ */ new Set();
	for (const g of groups) {
		if (g.length === 0) continue;
		if (g.some((n) => n.type === "Function")) {
			kept.push(g);
			continue;
		}
		const name = g.length === 1 ? ident(g[0]) : null;
		const alias = name && Object.prototype.hasOwnProperty.call(FONT_ALIASES, name) ? FONT_ALIASES[name] : null;
		if (alias) {
			diag("profile", `font-family: ${name} → ${alias}`);
			if (!names.has(alias)) kept.push([{
				type: "Identifier",
				name: alias
			}]);
			names.add(alias);
			continue;
		}
		if (name && (isGenericFont(name) || GLOBAL_KEYWORDS.has(name))) {
			if (names.has(name)) continue;
			kept.push(g);
			names.add(name);
			continue;
		}
		diag("profile", `font-family: ${truncate(g.map((n) => n.type === "String" ? JSON.stringify(n.value) : generate(n)).join(" "))}`);
	}
	const out = [];
	kept.forEach((g, i) => {
		out.push(g);
		const name = g.length === 1 ? ident(g[0]) : null;
		const fallback = name ? FONT_FALLBACK[name] : void 0;
		if (fallback && !kept.slice(i + 1).some((h) => h.length === 1 && ident(h[0]) === fallback) && !out.some((h) => h.length === 1 && ident(h[0]) === fallback)) out.push([{
			type: "Identifier",
			name: fallback
		}]);
	});
	if (out.length === 0) out.push([{
		type: "Identifier",
		name: PROFILE_CSS.fonts.default
	}]);
	return out.flatMap((g, i) => i ? [comma(), ...g] : g);
}
/** A font-family list or `font` shorthand outside a stylesheet (SVG `font-family`, canvas `font`, measureText): the same reduction. */
function sanitizeFontValue(prop, value, diag) {
	try {
		const ast = parse(`${prop}:${value}`, "declaration");
		if (ast.type !== "Declaration" || !declarationIsSafe(ast, diag, DEFAULT_ENV)) return null;
		return generate(ast.value);
	} catch {
		return null;
	}
}
/** Shadow scope: viewport units resolve against the bubble (`container-type: inline-size` on the host; the block axis falls back to the small viewport). */
const CONTAINER_UNITS = {
	vw: "cqw",
	svw: "cqw",
	lvw: "cqw",
	dvw: "cqw",
	vh: "cqh",
	svh: "cqh",
	lvh: "cqh",
	dvh: "cqh",
	vmin: "cqmin",
	svmin: "cqmin",
	lvmin: "cqmin",
	dvmin: "cqmin",
	vmax: "cqmax",
	svmax: "cqmax",
	lvmax: "cqmax",
	dvmax: "cqmax",
	vi: "cqi",
	svi: "cqi",
	lvi: "cqi",
	dvi: "cqi",
	vb: "cqb",
	svb: "cqb",
	lvb: "cqb",
	dvb: "cqb"
};
const SIZE_FEATURE = /^\(\s*(?:(?:min-|max-)?(?:width|height|aspect-ratio)\s*:\s*[^()]+|orientation\s*:\s*(?:portrait|landscape)\s*|[^()]*\b(?:width|height)\b[^()]*[<>][^()]*)\)$/i;
/**
* Shadow scope: a media query list that only asks about the viewport's size
* (what the iframe's viewport was: the bubble) as a container query on the
* bubble, e.g. `screen and (max-width: 480px), (orientation: portrait)` →
* `tw (max-width: 480px) or (orientation: portrait)`. Null when it asks
* anything else (hover, pointer, print, resolution…): left as a media query.
*/
function mediaToContainer(text) {
	const out = [];
	for (let q of text.split(",")) {
		q = q.trim().replace(/^only\s+/i, "");
		if (!q) return null;
		const type = /^(screen|all)\b\s*(?:and\b)?\s*/i.exec(q);
		if (type) q = q.slice(type[0].length).trim();
		if (!q) {
			out.push("(min-width: 0px)");
			continue;
		}
		const features = q.split(/\s+and\s+/i);
		for (const f of features) if (!SIZE_FEATURE.test(f.trim())) return null;
		out.push(features.map((f) => f.trim()).join(" and "));
	}
	return "tw " + out.join(" or ");
}
/**
* The profile's selectors: a selector with a pseudo-class or pseudo-element
* outside the profile (`:focus`, `:has()`, `::marker`, `:host`, `:scope`, …) or
* a nesting selector never matches, so it is dropped from its list; `:disabled`
* and `:enabled` become `[disabled]` and `:not([disabled])` (the `<button>`
* state, the only form state left). Returns false when nothing is left.
*/
function profileSelectorList(prelude, diag) {
	const keep = new List();
	prelude.children.forEach((sel) => {
		let bad = null;
		walk(sel, { enter(node, item, list) {
			if (bad) return;
			if (node.type === "NestingSelector") bad = "&";
			else if (node.type === "PseudoElementSelector" && !cssPseudoElementInProfile(node.name)) bad = "::" + node.name;
			else if (node.type === "PseudoClassSelector") {
				const name = node.name.toLowerCase();
				const replacement = Object.prototype.hasOwnProperty.call(PSEUDO_REWRITE, name) ? PSEUDO_REWRITE[name] : null;
				if (replacement && list) {
					const parsed = parse$1(replacement, { context: "selector" });
					list.replace(item, parsed.children);
				} else if (!cssPseudoClassInProfile(name)) bad = ":" + name;
			}
		} });
		if (bad) diag("profile", `selector ${truncate(bad)}`);
		else keep.appendData(sel);
	});
	prelude.children = keep;
	return !keep.isEmpty;
}
/** The renderer's attribute a shadow-scope pseudo-class becomes. */
const SCOPED_PSEUDO = {
	root: "data-tw-root",
	active: "data-tw-active"
};
/**
* Shadow scope: `:root` → the renderer's `[data-tw-root]` (the host-reaching selectors are outside the profile on
* every renderer), `:active` → `[data-tw-active]`.
*/
function scopeSelectorList(prelude) {
	const keep = new List();
	prelude.children.forEach((sel) => {
		walk(sel, { enter(node, item, list) {
			if (node.type !== "PseudoClassSelector" || node.children || !list) return;
			const name = node.name.toLowerCase();
			if (!Object.prototype.hasOwnProperty.call(SCOPED_PSEUDO, name)) return;
			const attr = {
				type: "AttributeSelector",
				name: {
					type: "Identifier",
					name: SCOPED_PSEUDO[name]
				},
				matcher: null,
				value: null,
				flags: null
			};
			list.replace(item, List.createItem(attr));
		} });
		keep.appendData(sel);
	});
	prelude.children = keep;
	return !keep.isEmpty;
}
/**
* Does a media query list ask only what the profile answers: the media types
* `all` and `screen`, the bubble's width and orientation, and the two
* preferences the client answers? (No height: the bubble's height comes from
* the content; no hover, pointer, print, resolution…)
*/
function mediaInProfile(text) {
	let s = text.toLowerCase();
	const features = [];
	for (let guard = 0; /\([^()]*\)/.test(s) && guard < 64; guard++) s = s.replace(/\(([^()]*)\)/g, (_, inner) => {
		const t = inner.trim();
		if (t === "" || t === "" || /^(?:not\s+)?\u0001(?:\s+(?:and|or)\s+\u0001)*$/.test(t)) return "  ";
		const colon = t.indexOf(":");
		if (colon >= 0) features.push(t.slice(0, colon).trim());
		else if (/[<>=]/.test(t)) features.push(...t.match(/[a-z][a-z-]*/g) ?? []);
		else features.push(t);
		return "  ";
	});
	if (/[()]/.test(s)) return false;
	for (const f of features) if (!MEDIA_FEATURES.has(f)) return false;
	for (const word of s.match(/[a-z][a-z-]*/g) ?? []) if (![
		"and",
		"or",
		"not",
		"only"
	].includes(word) && !MEDIA_TYPES.has(word)) return false;
	return true;
}
/**
* Evaluate the preferences in a media query list against the client's answers
* (the chat theme, the OS reduced-motion setting); a query outside the profile
* never matches.
*/
function rewriteMediaQuery(text, env) {
	if (!mediaInProfile(text)) return NEVER;
	return text.replace(/\(\s*prefers-color-scheme\s*:\s*(dark|light)\s*\)/gi, (_, v) => v.toLowerCase() === env.colorScheme ? ALWAYS : NEVER).replace(/\(\s*prefers-reduced-motion\s*(?::\s*(reduce|no-preference)\s*)?\)/gi, (_, v) => (v ?? "reduce").toLowerCase() === "reduce" === !!env.reducedMotion ? ALWAYS : NEVER);
}
/**
* `@supports` decided from the profile (D23): a block whose condition holds is
* unwrapped, the others are dropped, before anything reaches the renderer.
*/
function resolveSupports(list) {
	const out = [];
	list.forEach((node) => {
		if (node.type === "Atrule" && node.name.toLowerCase() === "supports") {
			if (node.block && node.prelude && supportsCondition(generate(node.prelude))) out.push(...resolveSupports(node.block.children).toArray());
			return;
		}
		if ((node.type === "Atrule" || node.type === "Rule") && node.block) node.block.children = resolveSupports(node.block.children);
		out.push(node);
	});
	return new List().fromArray(out);
}
function hasRaw(node) {
	return !!node && find(node, (n) => n.type === "Raw") !== null;
}
function rawIsSafe(node) {
	let ok = true;
	walk(node, (n) => {
		if (n.type === "Raw" && !SAFE_RAW_PRELUDE.test(n.value)) ok = false;
	});
	return ok;
}
function sanitizeTree(ast, diag, env) {
	const atruleStack = [];
	/** Rules entered (outside @keyframes): a rule or at-rule inside one is nested CSS, outside the profile. */
	let ruleDepth = 0;
	if (ast.type === "StyleSheet") ast.children = resolveSupports(ast.children);
	walk(ast, {
		enter(node, item, list) {
			if ((node.type === "Atrule" || node.type === "Rule") && ruleDepth > 0 && list) {
				diag("profile", "nested rule");
				list.remove(item);
				return walk.skip;
			}
			if (node.type === "Atrule") {
				const name = node.name.toLowerCase();
				if (!ALLOWED_ATRULES.has(name)) {
					diag(SECURITY_ATRULES.has(name) ? "css-dropped" : "profile", `@${name}`);
					list.remove(item);
					return walk.skip;
				}
				if (name === "media" && node.prelude) {
					let text = generate(node.prelude);
					if (!mediaInProfile(text)) {
						diag("profile", `@media ${truncate(text)}`);
						list.remove(item);
						return walk.skip;
					}
					if (/prefers-(?:color-scheme|reduced-motion)/i.test(text)) {
						text = rewriteMediaQuery(text, env);
						node.prelude = {
							type: "Raw",
							value: text
						};
					}
					if (env.scope === "shadow") {
						const container = mediaToContainer(text);
						if (container) {
							node.name = "container";
							node.prelude = {
								type: "Raw",
								value: container
							};
						}
					}
				}
				if (node.prelude && hasRaw(node.prelude) && !rawIsSafe(node.prelude)) {
					diag("css-dropped", `@${name}: unparsable prelude`);
					list.remove(item);
					return walk.skip;
				}
				atruleStack.push(name);
			} else if (node.type === "Rule") {
				if (hasRaw(node.prelude)) {
					diag("css-dropped", "rule with unparsable selector");
					list.remove(item);
					return walk.skip;
				}
				const inKeyframes = /keyframes$/.test(atruleStack[atruleStack.length - 1] ?? "");
				if (!inKeyframes && node.prelude.type === "SelectorList" && !profileSelectorList(node.prelude, diag)) {
					list.remove(item);
					return walk.skip;
				}
				if (env.scope === "shadow" && node.prelude.type === "SelectorList" && !scopeSelectorList(node.prelude)) {
					diag("css-dropped", "rule: shadow-host selector");
					list.remove(item);
					return walk.skip;
				}
				if (!inKeyframes) ruleDepth++;
				atruleStack.push(inKeyframes ? "keyframe" : "rule");
			} else if (node.type === "Declaration") {
				if (!declarationIsSafe(node, diag, env)) list.remove(item);
				return walk.skip;
			} else if (node.type === "Raw") {
				if (ruleDepth > 0 && node.value.includes("{")) diag("profile", "nested rule");
				if (list) list.remove(item);
				return walk.skip;
			}
		},
		leave(node) {
			if (node.type === "Atrule") atruleStack.pop();
			else if (node.type === "Rule" && atruleStack.pop() === "rule") ruleDepth--;
		}
	});
}
function parse(css, context) {
	return parse$1(stripUnicodeControls(css), {
		...PARSE_OPTS,
		context
	});
}
/** Sanitize the text of a <style> element. */
const SHEET_CACHE_SIZE = 32;
const SHEET_CACHE_MAX_TEXT = 262144;
const sheetCache = /* @__PURE__ */ new Map();
function sanitizeStylesheet(css, diag, env = DEFAULT_ENV) {
	const key = `${env.colorScheme}\u0001${env.scope ?? ""}\u0001${env.strict ? 1 : 0}${env.reducedMotion ? 1 : 0}${env.nativeScrolling ? 1 : 0}\u0001${css}`;
	let hit = sheetCache.get(key);
	if (!hit) {
		const diags = [];
		hit = {
			out: sanitizeStylesheetUncached(css, (k, d) => diags.push([k, d]), env),
			diags
		};
		if (css.length < SHEET_CACHE_MAX_TEXT) {
			if (sheetCache.size >= SHEET_CACHE_SIZE) sheetCache.delete(sheetCache.keys().next().value);
			sheetCache.set(key, hit);
		}
	}
	for (const [k, d] of hit.diags) diag(k, d);
	return hit.out;
}
function sanitizeStylesheetUncached(css, diag, env) {
	try {
		const ast = parse(css, "stylesheet");
		sanitizeTree(ast, diag, env);
		return generate(ast);
	} catch (e) {
		diag("css-dropped", "stylesheet: " + e.message);
		return "";
	}
}
/** Sanitize the value of a style="" attribute. */
function sanitizeStyleAttribute(css, diag, env = DEFAULT_ENV) {
	try {
		const ast = parse(css, "declarationList");
		sanitizeTree(ast, diag, env);
		return generate(ast);
	} catch (e) {
		diag("css-dropped", "style attribute: " + e.message);
		return "";
	}
}
const PROPERTY_NAME = /^-{0,2}[a-zA-Z_][\w-]*$/;
const FAST_MAX = 256;
const T_IDENT = 1;
const T_FUNC = 2;
const T_HASH = 3;
const T_NUM = 4;
const T_PCT = 5;
const T_DIM = 6;
const T_COMMA = 7;
const T_CLOSE = 8;
/**
* css-tree's generator between two tokens: `SPACE_BEFORE[prev]` has bit `next` set when it emits a space (the pairs of
* tokenBefore.safe among these token types; prev 0 is the start). A number, percentage or dimension that starts with
* `-` is looked up as the delim `-` instead (`MINUS_SPACE`).
*/
const bits = (...ts) => ts.reduce((m, t) => m | 1 << t, 0);
const SPACE_BEFORE = [];
SPACE_BEFORE[0] = 0;
SPACE_BEFORE[T_IDENT] = bits(T_IDENT, T_FUNC, T_NUM, T_PCT, T_DIM, T_HASH);
SPACE_BEFORE[T_FUNC] = 0;
SPACE_BEFORE[T_HASH] = bits(T_IDENT, T_FUNC, T_NUM, T_PCT, T_DIM, T_HASH);
SPACE_BEFORE[T_NUM] = bits(T_IDENT, T_FUNC, T_NUM, T_PCT, T_DIM);
SPACE_BEFORE[T_PCT] = bits(T_PCT, T_DIM, T_FUNC);
SPACE_BEFORE[T_DIM] = bits(T_IDENT, T_FUNC, T_NUM, T_PCT, T_DIM, T_HASH);
SPACE_BEFORE[T_COMMA] = 0;
SPACE_BEFORE[T_CLOSE] = bits(T_IDENT, T_FUNC, T_PCT, T_DIM, T_HASH);
const MINUS_SPACE = bits(T_IDENT, T_HASH, T_DIM, T_PCT, T_CLOSE);
/**
* The profile's functions less those that substitute, pick a branch or take a URL (the full path rewrites or checks
* them), and never a 3D transform function (the full path drops them).
*/
const FAST_FUNCTIONS = new Set(PROFILE_CSS.functions.filter((f) => !SUBSTITUTION_FUNCTIONS.has(f) && !URL_FUNCTIONS.has(f) && f !== "url" && f !== "light-dark" && !TRANSFORM_3D.has(f)));
/** The profile's units less the viewport units (the shadow scope makes them container units). */
const FAST_UNITS = new Set(PROFILE_CSS.units.filter((u) => !Object.prototype.hasOwnProperty.call(CONTAINER_UNITS, u)));
const FAST_CUSTOM = {};
/** The profile's properties the fast path takes (lowercase, as written), with their rules; the others always go the full path. */
const FAST_PROPS = /* @__PURE__ */ new Map();
for (const prop of PROFILE_CSS.properties) {
	if (FORBIDDEN_PROPERTIES.has(prop) || FILTER_PROPERTIES.has(prop) || prop === "color-scheme" || prop === "font" || prop === "font-family") continue;
	const overflow = prop === "overflow" || prop === "overflow-x" || prop === "overflow-y";
	FAST_PROPS.set(prop, {
		keywords: VALUE_SETS[prop],
		rewrite: REWRITES[overflow ? "overflow" : prop],
		kind: prop === "rotate" ? "rotate" : prop === "translate" || prop === "scale" ? "translate" : prop === "background-clip" ? "clip" : void 0
	});
}
/**
* Character classes of the fast alphabet, read as `c < 128 ? CHAR[c] : 0` (charCodeAt past the end is NaN: class 0).
* C_NAME: the ident code points it has, a letter, a digit or `-` (`_`, escapes and non-ASCII are outside it).
*/
const C_DIGIT = 1;
const C_LETTER = 2;
const C_NAME = 4;
const CHAR = /* @__PURE__ */ new Uint8Array(128);
for (let c = 48; c <= 57; c++) CHAR[c] = 5;
for (let c = 65; c <= 90; c++) CHAR[c] = CHAR[c + 32] = 6;
CHAR[45] = C_NAME;
/**
* The fast path of `sanitizeStyleProperty` (see above): the clean value of a simple declaration, exactly as the full
* path would return it with no diagnostic, or undefined when the full path has to decide (an empty value included).
*/
function fastStyleValue(name, value) {
	const n = value.length;
	if (n === 0 || n > FAST_MAX) return void 0;
	let rule = FAST_PROPS.get(name);
	const custom = rule === void 0 && name.charCodeAt(0) === 45 && name.charCodeAt(1) === 45 && PROPERTY_NAME.test(name);
	if (custom) rule = FAST_CUSTOM;
	if (rule === void 0) return void 0;
	/** The output when the input is not css-tree's serialisation already; undefined while it is (then the input is returned). */
	let out;
	let prev = 0;
	let prevEnd = 0;
	let depth = 0;
	let topItems = 0, topNonComma = 0, topNumbers = 0;
	/** The last top-level ident (the value's only item when `single`), lowercased when the rule reads it. */
	let lastTopIdent = "";
	let lastTopStart = -1;
	const readsIdents = rule.rewrite !== void 0 || rule.kind === "clip" || rule.kind === "rotate";
	let i = 0;
	while (i < n) {
		const start = i;
		const c = value.charCodeAt(i);
		const k = c < 128 ? CHAR[c] : 0;
		let type;
		let minus = false;
		if (c === 32) {
			i++;
			continue;
		}
		if (k & C_DIGIT || c === 46 || c === 45) {
			const c1 = value.charCodeAt(i + 1);
			const k1 = c1 < 128 ? CHAR[c1] : 0;
			let numeric = (k | k1) & C_DIGIT;
			if (!numeric && c === 45 && c1 === 46) {
				const c2 = value.charCodeAt(i + 2);
				numeric = c2 < 128 ? CHAR[c2] & C_DIGIT : 0;
			}
			if (c === 46 && !(k1 & C_DIGIT)) numeric = 0;
			if (numeric) {
				minus = c === 45;
				if (minus) i++;
				let d = value.charCodeAt(i);
				while (d >= 48 && d <= 57) d = value.charCodeAt(++i);
				if (d === 46) {
					const d1 = value.charCodeAt(i + 1);
					if (d1 >= 48 && d1 <= 57) {
						i++;
						do
							d = value.charCodeAt(++i);
						while (d >= 48 && d <= 57);
					}
				}
				const u1 = value.charCodeAt(i + 1);
				if (d === 101 || d === 69) {
					if (u1 >= 48 && u1 <= 57 || (u1 === 45 || u1 === 43) && value.charCodeAt(i + 2) >= 48 && value.charCodeAt(i + 2) <= 57) return void 0;
				}
				const ku = d < 128 ? CHAR[d] : 0;
				if (d === 37) {
					i++;
					type = T_PCT;
				} else if (ku & C_LETTER || d === 45 && ((u1 < 128 ? CHAR[u1] : 0) & C_LETTER || u1 === 45)) {
					const unitStart = i;
					do
						d = value.charCodeAt(++i);
					while (d < 128 && CHAR[d] & C_NAME);
					const unit = value.slice(unitStart, i);
					if (!FAST_UNITS.has(unit) && !FAST_UNITS.has(unit.toLowerCase())) return void 0;
					type = T_DIM;
				} else type = T_NUM;
			} else if (c === 45 && (k1 & C_LETTER || c1 === 45)) {
				let d = c1;
				do
					d = value.charCodeAt(++i);
				while (d < 128 && CHAR[d] & C_NAME);
				type = T_IDENT;
			} else return void 0;
		} else if (k & C_LETTER) {
			let d = c;
			do
				d = value.charCodeAt(++i);
			while (d < 128 && CHAR[d] & C_NAME);
			type = T_IDENT;
		} else if (c === 35) {
			let d = c;
			do
				d = value.charCodeAt(++i);
			while (d < 128 && CHAR[d] & C_NAME);
			if (i === start + 1) return void 0;
			type = T_HASH;
		} else if (c === 44) {
			i++;
			if (prev === 0 || prev === T_FUNC || prev === T_COMMA) return void 0;
			type = T_COMMA;
		} else if (c === 41) {
			i++;
			if (depth === 0 || prev === T_COMMA) return void 0;
			depth--;
			type = T_CLOSE;
		} else return void 0;
		if (type === T_IDENT && i < n && value.charCodeAt(i) === 40) {
			const fn = value.slice(start, i);
			if (!FAST_FUNCTIONS.has(fn) && !FAST_FUNCTIONS.has(fn.toLowerCase())) return void 0;
			i++;
			type = T_FUNC;
		}
		if (depth === 0 && type !== T_CLOSE) {
			topItems++;
			if (type !== T_COMMA) topNonComma++;
			if (type === T_NUM) topNumbers++;
			if (type === T_IDENT) {
				lastTopStart = start;
				if (readsIdents) {
					lastTopIdent = value.slice(start, i).toLowerCase();
					if (rule.rewrite && Object.prototype.hasOwnProperty.call(rule.rewrite, lastTopIdent)) return void 0;
					if (rule.kind === "clip" && lastTopIdent === "text") return void 0;
					if (rule.kind === "rotate" && (lastTopIdent === "x" || lastTopIdent === "y" || lastTopIdent === "z")) return void 0;
				}
			}
		}
		if (type === T_FUNC) depth++;
		const space = (minus ? MINUS_SPACE >> prev : SPACE_BEFORE[prev] >> type) & 1;
		if (out === void 0) {
			if (start - prevEnd !== space) out = value.slice(0, prevEnd) + (space ? " " : "") + value.slice(start, i);
		} else out += (space ? " " : "") + value.slice(start, i);
		prev = type;
		prevEnd = i;
	}
	if (prev === 0 || depth !== 0 || prev === T_COMMA) return void 0;
	if (out === void 0 && prevEnd !== n) out = value.slice(0, prevEnd);
	if (!custom) {
		const single = topItems === 1 && prev === T_IDENT;
		if (single && !readsIdents) lastTopIdent = value.slice(lastTopStart, prevEnd).toLowerCase();
		if (!(single && GLOBAL_KEYWORDS.has(lastTopIdent))) {
			if (rule.keywords && !(single && rule.keywords.includes(lastTopIdent))) return void 0;
			if (rule.kind === "rotate" && topNumbers > 1) return void 0;
			if (rule.kind === "translate" && topNonComma > 2) return void 0;
		}
	}
	return out ?? value;
}
/** Sanitize a single property set via CSSOM. Returns null if it must be dropped. */
function sanitizeStyleProperty(name, value, diag, env = DEFAULT_ENV) {
	{
		const fast = fastStyleValue(name, value);
		if (fast !== void 0) return {
			name,
			value: fast
		};
	}
	return sanitizeStylePropertyFull(name, value, diag, env);
}
/** `sanitizeStyleProperty` through css-tree alone (the reference of the fast path). */
function sanitizeStylePropertyFull(name, value, diag, env = DEFAULT_ENV) {
	if (!PROPERTY_NAME.test(name)) return null;
	if (value === "") return {
		name,
		value: ""
	};
	try {
		const ast = parse(`${name}:${value}`, "declaration");
		if (ast.type !== "Declaration" || !declarationIsSafe(ast, diag, env)) return null;
		return {
			name,
			value: generate(ast.value)
		};
	} catch {
		return null;
	}
}
/**
* Sanitize a free-standing CSS value, e.g. an SVG presentation attribute
* (fill="url(#g)") or a canvas `filter`. Returns null if it must be dropped.
*/
function sanitizeCssValue(value, diag, where = "value", env = DEFAULT_ENV) {
	try {
		const ast = parse(value, "value");
		if (!valueIsSafe(ast, "image", diag, where, env)) return null;
		return generate(ast);
	} catch {
		return null;
	}
}
//#endregion
//#region src/vendor/widget-sandbox/src/host/validator.ts
const MAX_NODES = 5e4;
/** Text nodes, string properties and Path2D data; a chat widget has no use for more, and every byte is copied through the renderer. */
const MAX_TEXT = 32768;
const COMPAT_MAX_TEXT = 2097152;
/**
* Per-document budget of complex-script text (UTF-16 units at or above U+0590:
* Hebrew, Arabic, Indic, Thai, CJK, emoji, …) in text nodes. Shaping and line
* breaking such text is what makes a renderer slow, so a widget gets this much
* of it in its whole document, counted on create, data change and removal.
*/
const COMPLEX_TEXT_BUDGET = 8192;
const COMPLEX_CHURN_PER_SECOND = 1024;
const TEXT_BUDGET = 49152;
function textWork(text) {
	let count = 0;
	let run = false;
	for (let i = 0; i < text.length; i++) {
		const c = text.charCodeAt(i);
		if (c >= 11904 && c <= 42191 || c >= 44032 && c <= 55295 || c >= 63744 || c >= 55296 && c <= 56319) {
			if (run) count++;
			run = false;
			count++;
			if (c >= 55296 && c <= 56319 && i + 1 < text.length && text.charCodeAt(i + 1) >= 56320 && text.charCodeAt(i + 1) <= 57343) i++;
		} else if (c <= 32 || c === 45 || c === 63 || c === 47 || c === 8203) {
			if (run) count++;
			run = false;
		} else run = true;
	}
	if (run) count++;
	return Math.max(count, Math.ceil(text.length / 1024));
}
const SMALL_TEXT = 256;
function chargesChurn(text) {
	if (text.length > SMALL_TEXT) return true;
	for (let i = 0; i < text.length; i++) {
		const c = text.charCodeAt(i);
		if (c >= 1424 && c < 8192 || c >= 11904 && c <= 55295 || c >= 63744 && c <= 65519) return true;
	}
	return false;
}
function complexUnits(text) {
	let n = 0;
	for (let i = 0; i < text.length; i++) if (text.charCodeAt(i) >= 1424) n++;
	return n;
}
const KEYFRAME_MEMBERS = /* @__PURE__ */ new Set([
	"offset",
	"easing",
	"composite",
	"computed-offset"
]);
const OUT_OF_PROFILE = Symbol("out of profile");
/** An attribute (or inline style) value: the largest `data:` image a 4 KB message can carry fits. */
const MAX_ATTR = 8192;
const MAX_OPS_PER_BATCH = 1e4;
/**
* Nodes in the document (elements, text, comments; detached ones the widget keeps included), compared once a batch is
* applied: twice the corpora's largest widget (962). Below the 8 MB heap on every host since the shim hands a long flush
* over in parts, so the author sees this reason everywhere, not a memory stop that comes at 2000 nodes on a 64-bit host
* and 4000 on a 32-bit one.
*/
const MAX_DOCUMENT_NODES = 2e3;
/**
* Canvas commands in one `canvas` op (one canvas, one task): outside the projected 3D showcase no widget draws more than
* 237, and the main-thread window (2 µs a command) already holds 4000 a frame to ~13 fps on every client the stress kit
* measured (9 510 to ~5 fps); the 3D showcase's meshes stay under 2000 a frame.
*/
const MAX_CANVAS_CMDS = 4e3;
const MAX_CSS_RULES = 400;
const MAX_KEYFRAMES = 32;
const MAX_LIVE_ANIMS = 64;
/**
* A widget's canvases together, in bitmap pixels (16 MB as RGBA): a canvas over a whole bubble at 3× is ~2.3 M, the
* corpora's largest 0.4 M. compat has none here; the renderer holds every widget to 4096 × 4096 (its own backstop).
*/
const MAX_CANVAS_PIXELS = 4194304;
const COMPAT_MAX_ATTR = 4194304;
const COMPAT_MAX_OPS_PER_BATCH = 2e5;
const COMPAT_MAX_CANVAS_CMDS = 5e5;
const COMPAT_MAX_LIVE_ANIMS = 1024;
const MAX_ID = 2 ** 31;
/** Renderer-side parent id meaning "detached, but keep the node". */
const LIMBO = 0;
const ATTR_NAME = /^[a-zA-Z_][\w.:\-]*$/;
const TAG_NAME = /^[a-zA-Z][\w.\-]*$/;
const EVENT_TYPE_SET = new Set(EVENT_TYPES);
const SVG_ANIMATION_TAGS = /* @__PURE__ */ new Set([
	"animate",
	"animateTransform",
	"animateMotion"
]);
const SVG_HREF_FRAGMENT_TAGS = /* @__PURE__ */ new Set([
	"use",
	"linearGradient",
	"radialGradient",
	"pattern",
	"filter",
	"textPath",
	"mpath",
	"feImage"
]);
/**
* `stop`: a counted cap stops the widget (strict) instead of dropping the op with a diagnostic (compat);
* `maxCssRules` / `maxKeyframes` 0 = no cap.
*/
function policyLimits(policy) {
	return policy === "strict" ? {
		maxText: MAX_TEXT,
		maxCanvasString: MAX_TEXT,
		maxAttr: MAX_ATTR,
		maxOps: MAX_OPS_PER_BATCH,
		maxCanvasCmds: MAX_CANVAS_CMDS,
		maxNodes: MAX_DOCUMENT_NODES,
		maxCssRules: MAX_CSS_RULES,
		maxKeyframes: MAX_KEYFRAMES,
		maxLiveAnims: MAX_LIVE_ANIMS,
		maxCanvasPixels: MAX_CANVAS_PIXELS,
		complexTextBudget: COMPLEX_TEXT_BUDGET,
		textBudget: TEXT_BUDGET,
		stop: true
	} : {
		maxText: COMPAT_MAX_TEXT,
		maxCanvasString: COMPAT_MAX_ATTR,
		maxAttr: COMPAT_MAX_ATTR,
		maxOps: COMPAT_MAX_OPS_PER_BATCH,
		maxCanvasCmds: COMPAT_MAX_CANVAS_CMDS,
		maxNodes: 0,
		maxCssRules: 0,
		maxKeyframes: 0,
		maxLiveAnims: COMPAT_MAX_LIVE_ANIMS,
		maxCanvasPixels: 0,
		complexTextBudget: 0,
		textBudget: 0,
		stop: false
	};
}
/**
* Style rules and `@keyframes` blocks in a sanitized stylesheet: a rule inside `@media` / `@supports` / `@container` /
* `@layer` counts, the keyframe selectors inside `@keyframes` do not.
*/
function countCssRules(css) {
	let rules = 0;
	let keyframes = 0;
	const stack = [];
	let prelude = 0;
	for (let i = 0; i < css.length; i++) {
		const c = css.charCodeAt(i);
		if (c === 34 || c === 39) {
			for (i++; i < css.length && css.charCodeAt(i) !== c; i++) if (css.charCodeAt(i) === 92) i++;
		} else if (c === 92) i++;
		else if (c === 47 && css.charCodeAt(i + 1) === 42) {
			const end = css.indexOf("*/", i + 2);
			i = end < 0 ? css.length : end + 1;
		} else if (c === 123) {
			const head = css.slice(prelude, i).trim().toLowerCase();
			const top = stack[stack.length - 1];
			let kind;
			if (top === "kf") kind = "frame";
			else if (/^@(-webkit-)?keyframes\b/.test(head)) kind = "kf";
			else if (head.startsWith("@")) kind = "at";
			else kind = "rule";
			if (kind === "kf") keyframes++;
			else if (kind === "rule") rules++;
			stack.push(kind);
			prelude = i + 1;
		} else if (c === 125) {
			stack.pop();
			prelude = i + 1;
		} else if (c === 59) prelude = i + 1;
	}
	return {
		rules,
		keyframes
	};
}
function isObj(v) {
	return typeof v === "object" && v !== null && !Array.isArray(v);
}
function isId(v) {
	return typeof v === "number" && Number.isInteger(v) && v > 1 && v < MAX_ID;
}
function isStr(v, max) {
	return typeof v === "string" && v.length <= max;
}
function isNum(v) {
	return typeof v === "number" && Number.isFinite(v);
}
var Validator = class {
	setClock(clock) {
		this.clock = clock;
	}
	/** The host's word that the loading tasks are over (their ops are in): from now on text changes are rate-limited. */
	markLoaded() {
		this.loading = false;
	}
	takeChurn(words) {
		if (this.loading) return true;
		const now = this.clock();
		if (this.churnAt !== null) this.churnTokens = Math.min(COMPLEX_TEXT_BUDGET, this.churnTokens + Math.max(0, now - this.churnAt) * COMPLEX_CHURN_PER_SECOND);
		this.churnAt = now;
		if (this.churnTokens < words) return false;
		this.churnTokens -= words;
		return true;
	}
	overChurn() {
		this.diag("text-churn", `text changes over ${COMPLEX_CHURN_PER_SECOND} units per second`);
		return false;
	}
	get policy() {
		return this.policyName;
	}
	/**
	* Set once a counted cap was passed under strict: the reason the host stops the widget with (`die`), as it does for
	* memory or CPU. From then on every batch is refused whole, so the renderer keeps the last render that fit.
	*/
	get stopped() {
		return this.stopReason;
	}
	/** A cap passed: strict stops the widget (diagnostic `limit`, the host acts on it); compat only rejects the op. */
	stop(reason) {
		if (!this.limits.stop) return false;
		if (this.stopReason === null) {
			this.stopReason = reason;
			this.diag("limit", reason);
		}
		return false;
	}
	tooLongText(length) {
		return this.stop(`Text limit exceeded: a text value of ${length} characters (max ${this.limits.maxText})`);
	}
	tooLongAttr(length) {
		return this.stop(`Attribute limit exceeded: a value of ${length} characters (max ${this.limits.maxAttr})`);
	}
	/**
	* The document's counted totals (its text, CSS rules, `@keyframes`) after a whole batch, not op by op: a subtree
	* replaced in one task (`innerHTML`, `replaceChildren`) or two sheets rewritten in one task pass through a sum of the
	* old and the new that the document never holds. False when a total is over its cap (the widget stops).
	*/
	checkTotals() {
		if (this.limits.maxNodes && this.nodes.size - 1 > this.limits.maxNodes) return this.stop(`Node limit exceeded: ${this.nodes.size - 1} nodes in the document (max ${this.limits.maxNodes})`);
		if (this.limits.textBudget && this.totalText > this.limits.textBudget) return this.stop(`Text limit exceeded: the document's text is over ${this.limits.textBudget} characters`);
		if (this.limits.maxCssRules && this.cssRules > this.limits.maxCssRules) return this.stop(`CSS limit exceeded: ${this.cssRules} rules in the document's stylesheets (max ${this.limits.maxCssRules})`);
		if (this.limits.maxKeyframes && this.cssKeyframes > this.limits.maxKeyframes) return this.stop(`CSS limit exceeded: ${this.cssKeyframes} @keyframes in the document's stylesheets (max ${this.limits.maxKeyframes})`);
		return true;
	}
	/**
	* Canvas `id` takes the bitmap `w` × `h` (an attribute, its removal, the shim's `r` command, a new canvas's 300 × 150);
	* false when the widget's canvases would hold more pixels together than strict allows (the widget stops).
	*/
	sizeCanvas(id, w, h) {
		const old = this.canvasSizes.get(id);
		const total = this.canvasPixels - (old ? old[0] * old[1] : 0) + w * h;
		if (this.limits.maxCanvasPixels && !(total <= this.limits.maxCanvasPixels)) return this.stop(`Canvas limit exceeded: canvases of ${total} pixels together (max ${this.limits.maxCanvasPixels})`);
		this.canvasSizes.set(id, [w, h]);
		this.canvasPixels = total;
		return true;
	}
	/** A canvas's `width` or `height` attribute set to `value` (null: removed), by HTML's rules for non-negative integers. */
	sizeCanvasAttr(node, name, value) {
		const lower = name.toLowerCase();
		if (node.tag !== "canvas" || node.ns !== "html" || lower !== "width" && lower !== "height") return true;
		const parsed = /^[\t\n\f\r ]*\+?(\d+)/.exec(value ?? "");
		const fallback = lower === "width" ? 300 : 150;
		const n = parsed && Number(parsed[1]) <= 2147483647 ? Number(parsed[1]) : fallback;
		const [w, h] = this.canvasSizes.get(node.id) ?? [300, 150];
		return this.sizeCanvas(node.id, lower === "width" ? n : w, lower === "height" ? n : h);
	}
	setPolicy(policy) {
		this.policyName = policy === "compat" ? "compat" : "strict";
		this.limits = policyLimits(this.policyName);
		this.env = {
			...this.env,
			strict: this.policyName === "strict"
		};
	}
	constructor(diag, env = DEFAULT_ENV) {
		_defineProperty(this, "nodes", /* @__PURE__ */ new Map());
		_defineProperty(this, "adopted", {
			html: false,
			head: false,
			body: false
		});
		_defineProperty(this, "dirtyStyles", /* @__PURE__ */ new Set());
		_defineProperty(this, "complexText", 0);
		_defineProperty(this, "totalText", 0);
		_defineProperty(this, "cssRules", 0);
		_defineProperty(this, "cssKeyframes", 0);
		_defineProperty(
			this,
			/** Each canvas's bitmap size (width, height), and their pixels together: the strict cap is on the sum. */
			"canvasSizes",
			/* @__PURE__ */ new Map()
		);
		_defineProperty(this, "canvasPixels", 0);
		_defineProperty(
			this,
			/**
			* tweb: each canvas's commands in this batch so far: the cap is on one canvas's commands in a send, and tweb's shim
			* sends them as several ops when canvases read each other (canvas.ts `seal`).
			*/
			"batchCanvasCmds",
			/* @__PURE__ */ new Map()
		);
		_defineProperty(this, "stopReason", null);
		_defineProperty(this, "churnTokens", COMPLEX_TEXT_BUDGET);
		_defineProperty(this, "churnAt", null);
		_defineProperty(this, "clock", () => Date.now() / 1e3);
		_defineProperty(
			this,
			/**
			* Until the host says the widget has loaded (`markLoaded`), inserted text is not charged to the churn bucket: building
			* the document in the loading tasks, in any number of batches, is bounded by the document's caps alone, so a load never
			* drops text they allow (a 48 K document of paragraphs lost them past ~45 K, silently, on every host).
			*/
			"loading",
			true
		);
		_defineProperty(this, "policyName", "compat");
		_defineProperty(this, "limits", policyLimits("compat"));
		_defineProperty(this, "out", []);
		_defineProperty(this, "diag", void 0);
		_defineProperty(this, "env", void 0);
		_defineProperty(
			this,
			/**
			* A native host that keeps the node model itself (Swift `NativeValidator`) answers
			* "which rendered element is `id`" for the checks still done here (queries,
			* Web Animations): the tag, or null.
			*/
			"nodeLookup",
			null
		);
		_defineProperty(this, "liveAnims", /* @__PURE__ */ new Set());
		this.diag = diag;
		this.env = { ...env };
		this.nodes.set(1, {
			id: 1,
			kind: "doc",
			tag: "",
			ns: "html",
			rendered: false,
			isStyle: false,
			adopted: false,
			parent: null,
			children: [],
			data: "",
			attached: false
		});
	}
	get nodeCount() {
		return this.nodes.size;
	}
	/** The host theme changed: re-evaluate every stylesheet against it. */
	setTheme(colorScheme) {
		this.env = {
			...this.env,
			colorScheme
		};
		const out = [];
		for (const n of this.nodes.values()) if (n.kind === "el" && n.isStyle && n.rendered) out.push({
			op: "css",
			id: n.id,
			text: this.styleText(n)
		});
		return this.checkTotals() ? out : [];
	}
	styleText(style) {
		const text = sanitizeStylesheet(style.children.map((c) => this.nodes.get(c)?.data ?? "").join(""), this.diag, this.env);
		if (this.budgeted && !this.updateTextSlot(style, "sheet", cssStringText(text))) {
			this.releaseTextSlot(style, "sheet");
			return "";
		}
		if (this.limits.maxCssRules || this.limits.maxKeyframes) {
			const { rules, keyframes } = countCssRules(text);
			this.cssRules += rules - (style.cssRules ?? 0);
			this.cssKeyframes += keyframes - (style.cssKeyframes ?? 0);
			style.cssRules = rules;
			style.cssKeyframes = keyframes;
		}
		return text;
	}
	get budgeted() {
		return this.limits.textBudget > 0 || this.limits.complexTextBudget > 0;
	}
	/** The text an attribute value can put on screen under the strict budgets, or null if none. */
	attrText(name, value) {
		if (!this.budgeted) return null;
		if (name === "style") return cssStringText(value);
		return isTextAttr(name) ? value : null;
	}
	/** Media query strings from matchMedia(): prefers-color-scheme is answered from the host theme. */
	rewriteMediaQuery(query) {
		return rewriteMediaQuery(query, this.env);
	}
	/** Would a `canvas` op for `id` be accepted (a known `<canvas>` element)? Native hosts check this before validating canvas words themselves. */
	isCanvas(id) {
		if (!isId(id)) return false;
		const n = this.nodes.get(id);
		return !!n && n.kind === "el" && n.tag === "canvas";
	}
	setNodeLookup(lookup) {
		this.nodeLookup = lookup;
	}
	get cssEnv() {
		return this.env;
	}
	get diagnostics() {
		return this.diag;
	}
	/** Validated canvas commands, with the same diagnostics as a `canvas` op. */
	canvasCommands(cmds) {
		if (!Array.isArray(cmds) || this.stopReason !== null) return [];
		if (cmds.length > this.limits.maxCanvasCmds) {
			this.tooManyCanvasCmds(cmds.length);
			return [];
		}
		const out = [];
		for (const cmd of cmds) {
			const clean = this.canvasCmd(cmd);
			if (this.stopReason !== null) return [];
			if (clean === OUT_OF_PROFILE) continue;
			if (clean) out.push(clean);
			else this.diag("protocol-violation", "rejected canvas cmd " + safeJson(cmd));
		}
		return out;
	}
	/** Does `id` name an element the renderer knows about? (Used to validate queries.) */
	renderedElement(id) {
		if (!isId(id)) return null;
		if (this.nodeLookup) {
			const tag = this.nodeLookup(id);
			return tag ? {
				id,
				kind: "el",
				tag,
				ns: "html",
				rendered: true,
				isStyle: false,
				adopted: false,
				parent: null,
				children: [],
				data: "",
				attached: true
			} : null;
		}
		const n = this.nodes.get(id);
		return n && n.kind === "el" && n.rendered ? n : null;
	}
	processOps(batch) {
		this.out = [];
		this.batchCanvasCmds.clear();
		if (this.stopReason !== null) return [];
		if (Array.isArray(batch) && batch.length > this.limits.maxOps && this.limits.stop) {
			this.stop(`Ops limit exceeded: ${batch.length} operations in one batch (max ${this.limits.maxOps})`);
			return [];
		}
		if (!Array.isArray(batch) || batch.length > this.limits.maxOps) {
			this.diag("protocol-violation", "ops batch is not an array or too large");
			return [];
		}
		for (const op of batch) {
			try {
				if (!isObj(op) || !this.applyOp(op)) {
					if (this.stopReason !== null) break;
					this.diag("protocol-violation", "rejected op " + safeJson(op));
				}
			} catch (e) {
				this.diag("protocol-violation", "validator error: " + e.message);
			}
			if (this.stopReason !== null) break;
		}
		for (const id of this.dirtyStyles) {
			if (this.stopReason !== null) break;
			const style = this.nodes.get(id);
			if (style) this.out.push({
				op: "css",
				id,
				text: this.styleText(style)
			});
		}
		this.dirtyStyles.clear();
		if (this.stopReason === null) this.checkTotals();
		const out = this.out;
		this.out = [];
		return this.stopReason !== null ? [] : out;
	}
	applyOp(op) {
		switch (op.op) {
			case "el": return this.opEl(op);
			case "text":
			case "comment": return this.opCharData(op);
			case "attr": return this.opAttr(op);
			case "rattr": return this.opRemoveAttr(op);
			case "data": return this.opData(op);
			case "ins": return this.opInsert(op);
			case "rm": return this.opRemove(op);
			case "style": return this.opStyle(op);
			case "prop": return this.opProp(op);
			case "call": return this.opCall(op);
			case "canvas": return this.opCanvas(op);
			default: return false;
		}
	}
	newNode(id, partial) {
		if (this.nodes.has(id) || this.nodes.size >= MAX_NODES) return null;
		const n = {
			id,
			kind: "el",
			tag: "",
			ns: "html",
			rendered: true,
			isStyle: false,
			adopted: false,
			parent: null,
			children: [],
			data: "",
			attached: false,
			...partial
		};
		this.nodes.set(id, n);
		return n;
	}
	opEl(op) {
		const { id, tag, ns, attrs } = op;
		if (!isId(id) || !isStr(tag, 64) || !TAG_NAME.test(tag)) return false;
		if (ns !== void 0 && ns !== "svg") return false;
		if (attrs !== void 0 && !isObj(attrs)) return false;
		const lower = tag.toLowerCase();
		let outTag;
		let extra = [];
		const isStyle = lower === "style";
		if (ns === "svg") {
			if (isStyle) outTag = "style";
			else if (DROPPED_TAGS.has(lower) && lower !== "title") outTag = null;
			else outTag = SVG_TAGS.get(lower) ?? null;
			if (outTag === null && !DROPPED_TAGS.has(lower)) this.diag("tag-dropped", `<svg:${tag}>`);
		} else if (DROPPED_TAGS.has(lower)) {
			outTag = null;
			if (!SECURITY_DROPPED_TAGS.has(lower)) this.diag("profile", `<${lower}> dropped`);
			else if (lower !== "script" && lower !== "title" && lower !== "meta") this.diag("tag-dropped", `<${lower}>`);
		} else if (REPLACED_TAGS.has(lower)) {
			outTag = REPLACED_TAGS.get(lower);
			extra = [["data-tg-tag", lower]];
			this.diag("profile", `<${lower}> rendered as <${outTag}>`);
		} else if (isStyle || HTML_TAGS.has(lower)) outTag = lower;
		else {
			outTag = "span";
			extra = [["data-tg-tag", lower]];
			this.diag("tag-replaced", `<${lower}> rendered as <span>`);
		}
		let adopt;
		if (ns !== "svg" && (lower === "html" || lower === "head" || lower === "body")) {
			if (this.adopted[lower]) {
				outTag = "div";
				extra = [["data-tg-tag", lower]];
			} else {
				this.adopted[lower] = true;
				adopt = lower;
			}
		}
		const node = this.newNode(id, {
			kind: "el",
			tag: outTag ?? "",
			ns: ns === "svg" ? "svg" : "html",
			rendered: outTag !== null,
			isStyle,
			adopted: adopt !== void 0
		});
		if (!node) return false;
		if (outTag === null) return true;
		const outAttrs = [...extra];
		if (outTag === "canvas" && node.ns === "html" && !this.sizeCanvas(id, 300, 150)) return false;
		if (attrs) for (const [name, value] of Object.entries(attrs)) {
			if (typeof value !== "string") continue;
			if (value.length > this.limits.maxAttr) {
				if (this.limits.stop) return this.tooLongAttr(value.length);
				continue;
			}
			if (!this.sizeCanvasAttr(node, name, value)) return false;
			for (const pair of this.sanitizeAttr(node, name, value)) {
				const text = this.attrText(pair[0], pair[1]);
				if (text === null || this.updateTextSlot(node, "attr:" + pair[0], text)) outAttrs.push(pair);
			}
		}
		this.out.push({
			op: "el",
			id,
			tag: outTag,
			...node.ns === "svg" ? { ns: "svg" } : {},
			attrs: outAttrs,
			...adopt ? { adopt } : {}
		});
		return true;
	}
	opCharData(op) {
		const { id, data } = op;
		if (!isId(id) || typeof data !== "string") return false;
		if (data.length > this.limits.maxText) return this.tooLongText(data.length);
		if (this.nodes.has(id) || this.nodes.size >= MAX_NODES) return false;
		const kind = op.op === "text" ? "text" : "comment";
		const complex = kind === "text" ? complexUnits(data) : 0;
		if (complex && this.limits.complexTextBudget && this.complexText + complex > this.limits.complexTextBudget) {
			this.diag("text-budget", `document complex-script text over ${this.limits.complexTextBudget} units`);
			return false;
		}
		if (this.limits.textBudget && chargesChurn(data) && !this.takeChurn(textWork(data))) return this.overChurn();
		if (!this.newNode(id, {
			kind,
			data,
			rendered: kind === "text",
			complex
		})) return false;
		this.complexText += complex;
		this.totalText += data.length;
		if (kind === "text") this.out.push({
			op: "text",
			id,
			data
		});
		return true;
	}
	opData(op) {
		const { id, data } = op;
		if (!isId(id) || typeof data !== "string") return false;
		if (data.length > this.limits.maxText) return this.tooLongText(data.length);
		const node = this.nodes.get(id);
		if (!node || node.kind === "el" || node.kind === "doc") return false;
		const textGrowth = data.length - node.data.length;
		const complex = node.kind === "text" ? complexUnits(data) : 0;
		const growth = complex - (node.complex ?? 0);
		if (growth > 0 && this.limits.complexTextBudget && this.complexText + growth > this.limits.complexTextBudget) {
			this.diag("text-budget", `document complex-script text over ${this.limits.complexTextBudget} units`);
			return false;
		}
		if (this.limits.textBudget && chargesChurn(data) && !this.takeChurn(textWork(data))) return this.overChurn();
		this.complexText += growth;
		this.totalText += textGrowth;
		node.complex = complex;
		node.data = data;
		const parent = node.parent !== null ? this.nodes.get(node.parent) : null;
		if (parent?.isStyle) this.dirtyStyles.add(parent.id);
		else if (node.rendered) this.out.push({
			op: "data",
			id,
			data
		});
		return true;
	}
	opInsert(op) {
		const { parent, id, before } = op;
		if (!isId(id) || !(isId(parent) || parent === 1)) return false;
		if (before !== null && !isId(before)) return false;
		const node = this.nodes.get(id);
		const p = this.nodes.get(parent);
		if (!node || !p || p.kind === "text" || p.kind === "comment") return false;
		for (let a = p; a; a = a.parent !== null ? this.nodes.get(a.parent) : void 0) if (a === node) return false;
		let ref = null;
		if (before !== null) {
			ref = this.nodes.get(before) ?? null;
			if (!ref || ref.parent !== p.id || ref === node) return false;
		}
		this.unlink(node);
		node.parent = p.id;
		if (ref) p.children.splice(p.children.indexOf(ref.id), 0, id);
		else p.children.push(id);
		if (p.isStyle) this.dirtyStyles.add(p.id);
		if (!(node.rendered && !node.adopted && p.rendered && !p.isStyle && p.kind === "el")) {
			if (p.isStyle && node.rendered && node.kind !== "el") {
				this.out.push({
					op: "rm",
					id
				});
				node.rendered = false;
			} else if (node.attached) this.out.push({
				op: "ins",
				parent: LIMBO,
				id,
				before: null
			});
			node.attached = false;
			return true;
		}
		let refId = null;
		const idx = p.children.indexOf(id);
		for (let i = idx + 1; i < p.children.length; i++) {
			const sib = this.nodes.get(p.children[i]);
			if (sib && sib.attached) {
				refId = sib.id;
				break;
			}
		}
		this.out.push({
			op: "ins",
			parent: p.id,
			id,
			before: refId
		});
		node.attached = true;
		return true;
	}
	unlink(node) {
		if (node.parent === null) return;
		const old = this.nodes.get(node.parent);
		if (old) {
			const i = old.children.indexOf(node.id);
			if (i >= 0) old.children.splice(i, 1);
			if (old.isStyle) this.dirtyStyles.add(old.id);
		}
		node.parent = null;
	}
	opRemove(op) {
		const { id } = op;
		if (!isId(id)) return false;
		const node = this.nodes.get(id);
		if (!node) return false;
		if (node.adopted) {
			for (const c of [...node.children]) this.opRemove({ id: c });
			return true;
		}
		this.unlink(node);
		if (node.rendered) this.out.push({
			op: "rm",
			id
		});
		const stack = [node];
		while (stack.length) {
			const n = stack.pop();
			this.complexText -= n.complex ?? 0;
			this.totalText -= n.data.length;
			this.cssRules -= n.cssRules ?? 0;
			this.cssKeyframes -= n.cssKeyframes ?? 0;
			const size = this.canvasSizes.get(n.id);
			if (size) {
				this.canvasPixels -= size[0] * size[1];
				this.canvasSizes.delete(n.id);
			}
			for (const charge of n.textSlots?.values() ?? []) {
				this.totalText -= charge.length;
				this.complexText -= charge.complex;
			}
			this.nodes.delete(n.id);
			this.dirtyStyles.delete(n.id);
			for (const c of n.children) {
				const child = this.nodes.get(c);
				if (child) {
					if (child.rendered && !child.attached) this.out.push({
						op: "rm",
						id: child.id
					});
					stack.push(child);
				}
			}
		}
		return true;
	}
	opAttr(op) {
		const { id, name, value } = op;
		if (!isId(id) || !isStr(name, 128) || typeof value !== "string") return false;
		if (value.length > this.limits.maxAttr) return this.tooLongAttr(value.length);
		const node = this.nodes.get(id);
		if (!node || node.kind !== "el") return false;
		if (!node.rendered) return true;
		if (!this.sizeCanvasAttr(node, name, value)) return false;
		const pairs = this.sanitizeAttr(node, name, value);
		if (pairs.length === 0) {
			const canon = this.canonAttrName(node, name);
			if (canon) {
				this.releaseTextSlot(node, "attr:" + canon);
				this.out.push({
					op: "rattr",
					id,
					name: canon
				});
			}
			return true;
		}
		for (const [n, v] of pairs) {
			const text = this.attrText(n, v);
			if (text !== null && !this.updateTextSlot(node, "attr:" + n, text)) return false;
			this.out.push({
				op: "attr",
				id,
				name: n,
				value: v
			});
		}
		return true;
	}
	opRemoveAttr(op) {
		const { id, name } = op;
		if (!isId(id) || !isStr(name, 128)) return false;
		const node = this.nodes.get(id);
		if (!node || node.kind !== "el") return false;
		if (!node.rendered) return true;
		const canon = this.canonAttrName(node, name);
		if (!canon) return true;
		if (!this.sizeCanvasAttr(node, canon, null)) return false;
		this.releaseTextSlot(node, "attr:" + canon);
		this.out.push({
			op: "rattr",
			id,
			name: canon
		});
		if (node.tag === "a" && (canon === "href" || canon === "xlink:href")) this.out.push({
			op: "rattr",
			id,
			name: "data-tg-link"
		});
		return true;
	}
	canonAttrName(node, name) {
		if (!ATTR_NAME.test(name)) return null;
		const lower = name.toLowerCase();
		if (lower.startsWith("on")) return null;
		if (node.ns === "svg") return lower === "xlink:href" ? "href" : SVG_ATTR_CASE.get(lower) ?? lower;
		return lower;
	}
	/**
	* The attribute gate. Returns the attribute(s) to set in the renderer:
	* usually one, none if the attribute is dropped.
	*/
	sanitizeAttr(node, rawName, value) {
		const name = this.canonAttrName(node, rawName);
		if (name === null) return [];
		const lower = name.toLowerCase();
		const tag = node.tag;
		if (lower === "style") return [["style", sanitizeStyleAttribute(value, this.diag, this.env)]];
		if (URL_ATTRS.has(lower)) return this.sanitizeUrlAttr(node, name, lower, value);
		if (lower.startsWith("data-tg-")) return [];
		if (lower.startsWith("data-") || lower.startsWith("aria-")) return [[lower, value]];
		if (SILENT_DROP_ATTRS.has(lower)) return [];
		if (!(node.ns === "svg" ? SVG_ALLOWED_ATTRS : HTML_ATTRS).has(lower)) {
			this.diag("attr-dropped", `${tag}[${lower}]`);
			return [];
		}
		if (node.ns === "svg") {
			if (SVG_ANIMATION_TAGS.has(tag)) {
				if (lower === "attributename" && /href|src/i.test(value)) return [];
				if (ANIMATION_VALUE_ATTRS.has(lower)) {
					const parts = [];
					for (const part of value.split(";")) {
						const clean = sanitizeCssValue(part, this.diag, `${tag}[${lower}]`, this.env);
						if (clean === null) return [];
						parts.push(clean);
					}
					return [[name, parts.join(";")]];
				}
			}
			if (CSS_VALUE_ATTRS.has(lower)) {
				const clean = sanitizeCssValue(value, this.diag, `${tag}[${lower}]`, this.env);
				return clean === null ? [] : [[name, clean]];
			}
			if (lower === "font-family") {
				const clean = sanitizeStyleProperty("font-family", value, this.diag, this.env);
				return clean && clean.value ? [[name, clean.value]] : [];
			}
		}
		return [[name, value]];
	}
	sanitizeUrlAttr(node, name, lower, value) {
		const tag = node.tag;
		const block = () => {
			this.diag("url-blocked", `${tag}[${lower}]=${clip(value, 80)}`);
			return [];
		};
		const isHref = lower === "href" || lower === "xlink:href";
		if (tag === "a" && isHref) {
			if (isFragment(value)) {
				const frag = checkUrl(value, "fragment-only");
				return frag ? [[name, frag]] : [[name, "#"]];
			}
			return [[name, "#"], ["data-tg-link", ""]];
		}
		if (node.ns === "svg") {
			if (!isHref) return block();
			if (tag === "image") {
				const url = checkUrl(value, "image");
				return url && !url.startsWith("#") ? [[name, url]] : block();
			}
			if (SVG_HREF_FRAGMENT_TAGS.has(tag)) {
				const url = checkUrl(value, tag === "feImage" ? "image" : "fragment-only");
				return url ? [[name, url]] : block();
			}
			return block();
		}
		if (lower === "src") {
			if (tag === "img" || tag === "input") {
				const url = checkUrl(value, "image");
				if (url && !url.startsWith("#")) return [["src", url]];
				block();
				return tag === "img" ? [["src", PLACEHOLDER_IMAGE], ["data-tg-placeholder", ""]] : [];
			}
			return block();
		}
		if (lower === "usemap") return [];
		return block();
	}
	opStyle(op) {
		const { id, name, value, important } = op;
		if (!isId(id) || !isStr(name, 128) || typeof value !== "string") return false;
		if (value.length > this.limits.maxAttr) return this.tooLongAttr(value.length);
		const node = this.nodes.get(id);
		if (!node || node.kind !== "el") return false;
		if (!node.rendered) return true;
		if (!/^-{0,2}[a-zA-Z_][\w-]*$/.test(name)) return false;
		const clean = sanitizeStyleProperty(name, value, this.diag, this.env);
		let out = clean ? clean.value : "";
		if (this.budgeted && !this.updateTextSlot(node, "style:" + name, cssStringText(out))) {
			this.releaseTextSlot(node, "style:" + name);
			out = "";
		}
		this.out.push({
			op: "style",
			id,
			name,
			value: out,
			important: important === true
		});
		return true;
	}
	opProp(op) {
		const { id, name, value } = op;
		if (!isId(id) || typeof name !== "string") return false;
		const spec = Object.prototype.hasOwnProperty.call(PROPS, name) ? PROPS[name] : null;
		const node = this.nodes.get(id);
		if (!spec || !node || node.kind !== "el") return false;
		if (typeof value !== spec.type) return false;
		if (typeof value === "string" && value.length > this.limits.maxText) return this.tooLongText(value.length);
		if (typeof value === "number" && !Number.isFinite(value)) return false;
		if (!node.rendered || spec.tags && !spec.tags.has(node.tag)) return true;
		if (typeof value === "string" && !this.updateTextSlot(node, "prop:" + name, value)) return false;
		this.out.push({
			op: "prop",
			id,
			name,
			value
		});
		return true;
	}
	updateTextSlot(node, key, text) {
		if (!this.limits.textBudget && !this.limits.complexTextBudget) return true;
		if (text.length > this.limits.maxText) return this.tooLongText(text.length);
		const previous = node.textSlots?.get(key);
		const lengthDelta = text.length - (previous?.length ?? 0);
		const complex = complexUnits(text);
		const complexDelta = complex - (previous?.complex ?? 0);
		if (complexDelta > 0 && this.limits.complexTextBudget && this.complexText + complexDelta > this.limits.complexTextBudget) {
			this.diag("text-budget", `document complex-script text over ${this.limits.complexTextBudget} units`);
			return false;
		}
		if (this.limits.textBudget && chargesChurn(text) && !this.takeChurn(textWork(text))) return this.overChurn();
		this.totalText += lengthDelta;
		this.complexText += complexDelta;
		if (text.length) (node.textSlots ?? (node.textSlots = /* @__PURE__ */ new Map())).set(key, {
			length: text.length,
			complex
		});
		else node.textSlots?.delete(key);
		return true;
	}
	releaseTextSlot(node, key) {
		const charge = node.textSlots?.get(key);
		if (!charge) return;
		this.totalText -= charge.length;
		this.complexText -= charge.complex;
		node.textSlots.delete(key);
	}
	opCall(op) {
		const { id, method, args } = op;
		if (!isId(id) || typeof method !== "string") return false;
		if (!Object.prototype.hasOwnProperty.call(METHODS, method)) return false;
		const node = this.nodes.get(id);
		if (!node || node.kind !== "el") return false;
		if (!node.rendered) return true;
		if (method === "scrollIntoView" && (args === void 0 || Array.isArray(args) && args.length === 0)) {
			this.out.push({
				op: "call",
				id,
				method,
				args: [
					0,
					3,
					0,
					0
				]
			});
			return true;
		}
		const n = METHODS[method];
		const out = [];
		if (n > 0) {
			if (!Array.isArray(args)) return false;
			for (let i = 0; i < n; i++) {
				if (!isNum(args[i])) return false;
				out.push(args[i]);
			}
		}
		if (method === "scrollIntoView" && out.some((value, index) => !Number.isInteger(value) || value < 0 || value > [
			3,
			3,
			2,
			1
		][index])) return false;
		this.out.push({
			op: "call",
			id,
			method,
			args: out
		});
		return true;
	}
	opCanvas(op) {
		const { id, cmds } = op;
		if (!isId(id) || !Array.isArray(cmds)) return false;
		const sent = (this.batchCanvasCmds.get(id) ?? 0) + cmds.length;
		if (sent > this.limits.maxCanvasCmds) return this.tooManyCanvasCmds(sent);
		this.batchCanvasCmds.set(id, sent);
		const node = this.nodes.get(id);
		if (!node || node.kind !== "el" || node.tag !== "canvas") return false;
		const out = [];
		for (const cmd of cmds) {
			const clean = this.canvasCmd(cmd);
			if (this.stopReason !== null) return false;
			if (clean === OUT_OF_PROFILE) continue;
			if (clean && clean[0] === "r" && !this.sizeCanvas(id, Math.trunc(Number(clean[1])), Math.trunc(Number(clean[2])))) return false;
			if (clean) {
				if (clean[0] === "c" && (clean[1] === "fillText" || clean[1] === "strokeText") && typeof clean[2] === "string" && this.limits.textBudget && chargesChurn(clean[2]) && !this.takeChurn(textWork(clean[2]))) this.overChurn();
				else out.push(clean);
			} else this.diag("protocol-violation", "rejected canvas cmd " + safeJson(cmd));
		}
		if (out.length) this.out.push({
			op: "canvas",
			id,
			cmds: out
		});
		return true;
	}
	tooManyCanvasCmds(count) {
		return this.stop(`Canvas limit exceeded: ${count} commands in one send (max ${this.limits.maxCanvasCmds})`);
	}
	/** A canvas argument: finite number, short string, boolean, null, flat number array, or object ref. */
	canvasArg(v) {
		if (v === null || typeof v === "boolean") return v;
		if (typeof v === "number") return Number.isFinite(v) ? v : void 0;
		if (typeof v === "string") return v.length <= this.limits.maxCanvasString ? v : (this.tooLongText(v.length), void 0);
		if (Array.isArray(v)) return v.length <= 4096 && v.every(isNum) ? v : void 0;
		if (isObj(v)) {
			if (isNum(v.g) && Number.isInteger(v.g)) return { g: v.g };
			if (isNum(v.p) && Number.isInteger(v.p)) return { p: v.p };
			if (isId(v.n)) {
				const n = this.renderedElement(v.n);
				return n && (n.tag === "canvas" || n.tag === "img" || n.tag === "image") ? { n: n.id } : void 0;
			}
			if (isNum(v.w) && isNum(v.h) && typeof v.b64 === "string") return {
				w: v.w,
				h: v.h,
				b64: v.b64
			};
		}
	}
	canvasArgs(list) {
		const out = [];
		for (const a of list) {
			const c = this.canvasArg(a);
			if (c === void 0) return null;
			out.push(c);
		}
		return out;
	}
	/** A canvas call or property outside the profile: dropped with a `profile` diagnostic (once per name and canvas op). */
	outOfProfile(name) {
		this.diag("profile", `canvas ${name}`);
		return OUT_OF_PROFILE;
	}
	canvasCmd(cmd) {
		if (!Array.isArray(cmd) || cmd.length < 2 || cmd.length > 16) return null;
		const [kind, name, ...rest] = cmd;
		switch (kind) {
			case "c": {
				if (typeof name === "string" && CANVAS_OUT_OF_PROFILE.has(name)) return this.outOfProfile(name);
				if (typeof name !== "string" || !CANVAS_METHODS.has(name)) return null;
				const args = this.canvasArgs(rest);
				return args ? [
					"c",
					name,
					...args
				] : null;
			}
			case "s": {
				if (typeof name === "string" && CANVAS_OUT_OF_PROFILE.has(name)) return this.outOfProfile(name);
				if (typeof name !== "string" || !CANVAS_PROPS.has(name) || rest.length !== 1) return null;
				let v = this.canvasArg(rest[0]);
				if (v === void 0 || Array.isArray(v)) return null;
				if (name === "font") {
					if (typeof v !== "string") return null;
					v = sanitizeFontValue("font", v, this.diag);
					if (v === null) return null;
				}
				return [
					"s",
					name,
					v
				];
			}
			case "r": return isNum(name) && isNum(rest[0]) && name >= 0 && rest[0] >= 0 && name <= 16384 && rest[0] <= 16384 ? [
				"r",
				name,
				rest[0]
			] : null;
			case "g": {
				if (!isNum(name) || typeof rest[0] !== "string" || ![
					"linear",
					"radial",
					"conic",
					"pattern"
				].includes(rest[0])) return null;
				if (!CANVAS_GRADIENTS.has(rest[0])) {
					this.diag("profile", `canvas ${rest[0]}`);
					return [
						"g",
						name,
						"linear",
						0,
						0,
						0,
						0
					];
				}
				const args = this.canvasArgs(rest.slice(1));
				return args ? [
					"g",
					name,
					rest[0],
					...args
				] : null;
			}
			case "gs": return isNum(name) && isNum(rest[0]) && typeof rest[1] === "string" && rest[1].length < 256 ? [
				"gs",
				name,
				rest[0],
				rest[1]
			] : null;
			case "pn":
				if (typeof rest[0] === "string" && rest[0].length > this.limits.maxText) return this.tooLongText(rest[0].length) || null;
				return isNum(name) && (rest[0] === null || isStr(rest[0], this.limits.maxText)) ? [
					"pn",
					name,
					rest[0]
				] : null;
			case "pc": {
				if (!isNum(name) || typeof rest[0] !== "string" || !CANVAS_PATH_METHODS.has(rest[0])) return null;
				const args = this.canvasArgs(rest.slice(1));
				return args ? [
					"pc",
					name,
					rest[0],
					...args
				] : null;
			}
			default: return null;
		}
	}
	/** Validate a sync query. Returns a clean copy, or null to answer with an error. */
	validateQuery(q) {
		if (!isObj(q)) return null;
		const el = () => this.renderedElement(q.id);
		switch (q.q) {
			case "rect":
			case "rects":
			case "box":
			case "validity": return el() ? {
				q: q.q,
				id: q.id
			} : null;
			case "cs": {
				if (!el()) return null;
				const pseudo = typeof q.pseudo === "string" && /^::?[a-z-]{1,32}$/.test(q.pseudo) ? q.pseudo : void 0;
				const prop = typeof q.prop === "string" && (/^--[\w-]{1,128}$/.test(q.prop) || /^-?[a-z][a-z-]{0,63}$/.test(q.prop)) ? q.prop : void 0;
				return {
					q: "cs",
					id: q.id,
					...pseudo ? { pseudo } : {},
					...prop ? { prop } : {}
				};
			}
			case "svg": {
				if (!el() || typeof q.method !== "string" || !SVG_QUERY_METHODS.has(q.method)) return null;
				const args = Array.isArray(q.args) && q.args.length <= 4 && q.args.every(isNum) ? q.args : [];
				return {
					q: "svg",
					id: q.id,
					method: q.method,
					args
				};
			}
			case "measureText": {
				if (!isStr(q.font, 512) || !isStr(q.text, 1e5)) return null;
				const font = sanitizeFontValue("font", q.font, () => {});
				return font === null ? null : {
					q: "measureText",
					font,
					text: q.text
				};
			}
			case "imageData": return null;
			case "canvasCall": {
				const n = el();
				if (!n || n.tag !== "canvas" || typeof q.method !== "string" || !CANVAS_QUERY_METHODS.has(q.method)) return null;
				const args = Array.isArray(q.args) ? this.canvasArgs(q.args.slice(0, 8)) : [];
				return args ? {
					q: "canvasCall",
					id: n.id,
					method: q.method,
					args
				} : null;
			}
			case "elementFromPoint": return isNum(q.x) && isNum(q.y) ? {
				q: "elementFromPoint",
				x: q.x,
				y: q.y
			} : null;
			case "matchMedia": return isStr(q.query, 1024) ? {
				q: "matchMedia",
				query: q.query
			} : null;
			case "viewport": return { q: "viewport" };
			case "anims": return el() ? {
				q: "anims",
				id: q.id,
				subtree: q.subtree === true
			} : null;
			default: return null;
		}
	}
	validateAnim(list) {
		if (!Array.isArray(list) || list.length > MAX_ANIM_RECORDS) {
			this.diag("protocol-violation", "anim batch is not an array or too large");
			return [];
		}
		const live = this.liveAnims;
		const out = [];
		const drop = (aid) => {
			if (live.delete(aid)) out.push({
				aid,
				remove: true
			});
		};
		for (const a of list) {
			if (!isObj(a) || !Number.isInteger(a.aid) || a.aid < 1 || a.aid > 2147483647) {
				this.diag("protocol-violation", "rejected anim record");
				continue;
			}
			const aid = a.aid;
			if (a.remove === true) {
				drop(aid);
				continue;
			}
			if (a.css !== void 0) {
				const c = a.css;
				if (!(this.renderedElement(a.target) && isObj(c) && (c.kind === "animation" || c.kind === "transition") && typeof c.name === "string" && /^[\w-]{1,128}$/.test(c.name) && finiteWithin(c.origin, 0x38d7ea4c68000) && (a.startTime === null || finiteWithin(a.startTime, 0x38d7ea4c68000)) && (a.holdTime === null || finiteWithin(a.holdTime, 0xe8d4a51000)) && finiteWithin(a.playbackRate, 1e3) && typeof a.cancelled === "boolean")) {
					this.diag("protocol-violation", "rejected css anim record");
					continue;
				}
				out.push({
					aid,
					target: a.target,
					css: {
						kind: c.kind,
						name: c.name,
						origin: c.origin
					},
					startTime: a.startTime,
					holdTime: a.holdTime,
					playbackRate: a.playbackRate,
					cancelled: a.cancelled
				});
				continue;
			}
			const target = this.renderedElement(a.target);
			const t = a.timing;
			if (!(!!target && Array.isArray(a.keyframes) && a.keyframes.length <= MAX_ANIM_KEYFRAMES && isObj(t) && finiteWithin(t.duration, MAX_ANIM_TIME) && t.duration >= 0 && finiteWithin(t.delay, MAX_ANIM_TIME) && finiteWithin(t.endDelay, MAX_ANIM_TIME) && (t.iterations === null || finiteWithin(t.iterations, 1e9) && t.iterations >= 0) && finiteWithin(t.iterationStart, 1e9) && t.iterationStart >= 0 && ANIM_DIRECTIONS.has(t.direction) && ANIM_FILLS.has(t.fill) && animEasing(t.easing) !== null && ANIM_COMPOSITES.has(a.composite) && ANIM_ITERATION_COMPOSITES.has(a.iterationComposite) && (a.startTime === null || finiteWithin(a.startTime, 0x38d7ea4c68000)) && (a.holdTime === null || finiteWithin(a.holdTime, 0xe8d4a51000)) && (a.startTime !== null || a.holdTime !== null) && finiteWithin(a.playbackRate, 1e3))) {
				if (target) this.diag("protocol-violation", "rejected anim record");
				drop(aid);
				continue;
			}
			const timing = t;
			const frames = [];
			let last = 0;
			let bad = false;
			for (const f of a.keyframes) {
				if (!isObj(f) || !finiteWithin(f.offset, 1) || f.offset < last || f.offset > 1 || animEasing(f.easing) === null || !(f.composite === null || ANIM_COMPOSITES.has(f.composite)) || !isObj(f.values)) {
					bad = true;
					break;
				}
				last = f.offset;
				const names = Object.keys(f.values);
				if (names.length > MAX_ANIM_VALUES) {
					bad = true;
					break;
				}
				const values = {};
				for (const name of names) {
					const value = f.values[name];
					if (typeof value !== "string" || value.length > 4096 || !/^(?:--[\w-]{1,128}|-?[a-z][a-z-]{0,63})$/.test(name) || /^(?:-webkit-)?(?:animation|transition)(?:-|$)/.test(name)) continue;
					if (KEYFRAME_MEMBERS.has(name)) continue;
					const clean = sanitizeStyleProperty(name, value, this.diag, this.env);
					if (clean && clean.value !== "") values[name] = clean.value;
				}
				frames.push({
					offset: f.offset,
					easing: f.easing,
					composite: f.composite,
					values
				});
			}
			if (bad) {
				this.diag("protocol-violation", "rejected anim keyframes");
				drop(aid);
				continue;
			}
			if (!live.has(aid) && live.size >= this.limits.maxLiveAnims) {
				this.diag("animation-limit", "more than " + this.limits.maxLiveAnims + " live script animations");
				continue;
			}
			live.add(aid);
			out.push({
				aid,
				target: a.target,
				keyframes: frames,
				timing: {
					duration: timing.duration,
					delay: timing.delay,
					endDelay: timing.endDelay,
					iterations: timing.iterations,
					iterationStart: timing.iterationStart,
					direction: timing.direction,
					fill: timing.fill,
					easing: timing.easing
				},
				composite: a.composite,
				iterationComposite: a.iterationComposite,
				startTime: a.startTime,
				holdTime: a.holdTime,
				playbackRate: a.playbackRate
			});
		}
		return out;
	}
	/** Event types the sandbox wants forwarded. */
	validateListen(types) {
		if (!Array.isArray(types)) return [];
		return types.filter((t) => typeof t === "string" && (EVENT_TYPE_SET.has(t) || t === "scroll" && this.cssEnv.nativeScrolling === true));
	}
	/** "Learned preventDefault" keys: `${nodeId}:${eventType}`. */
	validatePreventDefault(keys) {
		if (!Array.isArray(keys)) return [];
		return keys.filter((k) => typeof k === "string" && /^\d{1,10}:[a-z]{1,20}(?::[\w ]{1,20})?$/.test(k)).slice(0, 256);
	}
};
const MAX_ANIM_RECORDS = 4096;
const MAX_ANIM_KEYFRAMES = 64;
const MAX_ANIM_VALUES = 64;
const MAX_ANIM_TIME = 864e5;
const ANIM_DIRECTIONS = /* @__PURE__ */ new Set([
	"normal",
	"reverse",
	"alternate",
	"alternate-reverse"
]);
const ANIM_FILLS = /* @__PURE__ */ new Set([
	"none",
	"forwards",
	"backwards",
	"both"
]);
const ANIM_COMPOSITES = /* @__PURE__ */ new Set([
	"replace",
	"add",
	"accumulate"
]);
const ANIM_ITERATION_COMPOSITES = /* @__PURE__ */ new Set(["replace", "accumulate"]);
const ANIM_NUMBER = "[+-]?(?:\\d+\\.?\\d*|\\.\\d+)(?:[eE][+-]?\\d+)?";
const ANIM_EASING = new RegExp("^(?:linear|ease|ease-in|ease-out|ease-in-out|step-start|step-end|cubic-bezier\\(\\s*" + ANIM_NUMBER + "\\s*,\\s*" + ANIM_NUMBER + "\\s*,\\s*" + ANIM_NUMBER + "\\s*,\\s*" + ANIM_NUMBER + "\\s*\\)|steps\\(\\s*\\d{1,6}\\s*(?:,\\s*(?:start|end|jump-start|jump-end|jump-both|jump-none)\\s*)?\\)|linear\\([0-9eE.%,\\s+-]{1,8192}\\))$");
function animEasing(e) {
	return typeof e === "string" && e.length <= 8192 && ANIM_EASING.test(e) && e.split(",").length <= 257 ? e : null;
}
function finiteWithin(n, max) {
	return typeof n === "number" && Number.isFinite(n) && Math.abs(n) <= max;
}
/** At most `n` UTF-16 units plus an ellipsis, never ending on half a surrogate pair (JSONText.truncated in Swift). */
function clip(s, n) {
	if (s.length <= n) return s;
	const last = s.charCodeAt(n - 1);
	return s.slice(0, last >= 55296 && last <= 56319 ? n - 1 : n) + "…";
}
function safeJson(v) {
	try {
		return clip(JSON.stringify(v), 160);
	} catch {
		return "[unserializable]";
	}
}
//#endregion
//#region src/vendor/widget-sandbox/src/host/engine-worker.ts
const widgets = /* @__PURE__ */ new Map();
let engine = null;
/** The page's clock minus this worker's: frame times come in the page's. */
let clockOffset = 0;
const toPage = (msg, transfer = []) => self.postMessage(msg, transfer);
async function compile(url) {
	try {
		return await WebAssembly.compileStreaming(fetch(url));
	} catch {
		return await WebAssembly.compile(await (await fetch(url)).arrayBuffer());
	}
}
async function boot(sandboxBundle, kind, shared) {
	const t0 = performance.now();
	if (shared && shared.kind === kind) {
		const { module, snapshot } = shared;
		toPage({
			type: "ready",
			kind: shared.kind,
			bootMs: Math.round(performance.now() - t0)
		});
		return {
			module,
			snapshot,
			kind: shared.kind
		};
	}
	const module = await compile(kind === "jspi" ? emscripten_module_default : emscripten_module_asyncify_default);
	const snapshot = await takeSnapshot(module, sandboxBundle);
	toPage({
		type: "ready",
		kind,
		bootMs: Math.round(performance.now() - t0)
	});
	return {
		module,
		snapshot,
		kind
	};
}
function start(id, html, config) {
	const validator = new Validator((kind, detail) => toHost({
		type: "diag",
		kind,
		detail
	}), {
		colorScheme: config.theme,
		scope: "shadow"
	});
	validator.setPolicy(resolvePolicy(config.policy));
	const render = (msg) => toPage({
		type: "render",
		id,
		msg
	});
	const toHost = (msg) => toPage({
		type: "host",
		id,
		msg,
		nodes: validator.nodeCount
	});
	const post = (msg) => {
		switch (msg.type) {
			case "ops": {
				const ops = validator.processOps(msg.ops);
				if (validator.stopped) return widget.glue.kill(validator.stopped);
				if (ops.length) render({
					type: "ops",
					ops
				});
				return;
			}
			case "listen":
				render({
					type: "listen",
					types: validator.validateListen(msg.types),
					since: finiteNumber(msg.since)
				});
				return;
			case "pd":
				render({
					type: "preventDefault",
					keys: validator.validatePreventDefault(msg.keys)
				});
				return;
			case "anim": {
				const anims = validator.validateAnim(msg.anims);
				const now = finiteNumber(msg.now);
				if (anims.length && now !== void 0) render({
					type: "anim",
					now,
					anims
				});
				return;
			}
			case "raf":
				render({ type: "requestFrame" });
				return;
			case "query": return;
			case "loaded":
				validator.markLoaded();
				toHost(msg);
				return;
			default: toHost(msg);
		}
	};
	const widget = {
		validator,
		asks: /* @__PURE__ */ new Map(),
		qid: 0,
		glue: createGlue({
			post,
			ask: (raw) => {
				const query = validator.validateQuery(raw);
				if (!query) return Promise.resolve({
					json: "{\"error\":\"invalid query\"}",
					hostMs: 0
				});
				if (query.q === "matchMedia") query.query = validator.rewriteMediaQuery(query.query);
				const qid = ++widget.qid;
				toPage({
					type: "query",
					id,
					qid,
					query
				});
				return new Promise((resolve) => widget.asks.set(qid, resolve));
			},
			parseHTML: parseHtmlTreeParse5
		})
	};
	widgets.set(id, widget);
	(engine ?? Promise.reject(/* @__PURE__ */ new Error("the engine was not booted"))).then(async ({ module, snapshot, kind }) => {
		const { memory, QuickJS, suspender } = await instantiateSuspendable(module, kind, snapshot.pages, copyMaximum(snapshot, config.memoryLimitBytes));
		if (widgets.get(id) !== widget) return;
		const vm = restoreVM(QuickJS, memory, snapshot, config.memoryLimitBytes, suspender);
		for (const msg of vm.pending) post(msg);
		widget.glue.adopt(vm, {
			type: "start",
			html,
			config
		});
	}).catch((e) => {
		if (widgets.get(id) === widget) toHost({
			type: "dead",
			reason: "failed to start the engine: " + e.message
		});
	});
}
function stop(id) {
	const widget = widgets.get(id);
	if (!widget) return;
	widgets.delete(id);
	widget.glue.destroy();
	for (const resolve of widget.asks.values()) resolve({
		json: "{\"error\":\"dead\"}",
		hostMs: 0
	});
	widget.asks.clear();
}
function onMessage(e) {
	const msg = e.data;
	switch (msg.type) {
		case "boot":
			clockOffset = msg.timeOrigin - performance.timeOrigin;
			engine ?? (engine = boot(msg.sandboxBundle, suspendKind(msg.suspend), msg.shared));
			engine.catch((err) => toPage({
				type: "failed",
				error: err.message
			}));
			return;
		case "share":
			engine?.then(({ module, snapshot, kind }) => toPage({
				type: "shared",
				kind,
				module,
				snapshot
			}), () => {});
			return;
		case "start":
			start(msg.id, msg.html, msg.config);
			return;
		case "answer": {
			const widget = widgets.get(msg.id);
			const resolve = widget?.asks.get(msg.qid);
			if (!resolve) return;
			widget.asks.delete(msg.qid);
			resolve({
				json: msg.json,
				binary: msg.binary,
				hostMs: Number(msg.hostMs) || 0
			});
			return;
		}
		case "input": {
			const input = msg.msg;
			if (input.type === "stop") return stop(msg.id);
			const widget = widgets.get(msg.id);
			if (!widget) return;
			if (input.type === "theme") {
				const ops = widget.validator.setTheme(input.theme);
				if (ops.length) toPage({
					type: "render",
					id: msg.id,
					msg: {
						type: "ops",
						ops
					}
				});
			}
			widget.glue.receive(input.type === "frame" ? {
				type: "frame",
				time: input.time + clockOffset
			} : input);
		}
	}
}
const BOOTED = Symbol.for("widget-sandbox.engine-worker");
if (!globalThis[BOOTED]) {
	globalThis[BOOTED] = true;
	self.onmessage = onMessage;
}
//#endregion
export { applyModuleEvalRuntimeOptions as a, applyBaseRuntimeOptions as i, QuickJSModuleCallbacks as n, QuickJSWASMModule as r, _defineProperty as t };
