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
		import("./module-ES6BEMUI-n1ghukr4.js").then(smartUnwrap)
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
	importModuleLoader: () => import("./emscripten-module.browser-DVQaGMRG.js").then((mod) => mod.default)
};
//#endregion
//#region src/vendor/widget-sandbox-quickjs/dist/emscripten-module.wasm?url
var emscripten_module_default = "/Monolith/emscripten-module-U2H1D7yK.wasm";
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
Object.freeze({
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
//#region src/vendor/widget-sandbox/src/host/worker.ts
const BOOTED = Symbol.for("widget-sandbox.worker");
if (!globalThis[BOOTED]) {
	globalThis[BOOTED] = true;
	const glue = createGlue({ post: (msg) => self.postMessage(msg) });
	self.onmessage = (e) => glue.receive(e.data);
}
//#endregion
export { applyModuleEvalRuntimeOptions as a, applyBaseRuntimeOptions as i, QuickJSModuleCallbacks as n, QuickJSWASMModule as r, _defineProperty as t };
