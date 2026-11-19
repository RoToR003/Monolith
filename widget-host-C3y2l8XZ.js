//# allFunctionsCalledOnLoad
import { n as __exportAll, t as __commonJSMin } from "./rolldown-runtime-CwcJO0Gh.js";
import { t as _defineProperty } from "./defineProperty-_J0dqq22.js";
import { t as _virtual_sandbox_bundle_default } from "./_virtual_sandbox-bundle-Cx0JRIXr.js";
import { openEngineChannel } from "./engine-client-CTcFsvrw.js";
import { IframeRenderer } from "./iframe-renderer-BXXFMzxx.js";
import { a as SAB_SIZE, c as PROFILE_CSS$1, l as PROFILE_IMAGES, n as LIMIT_DEFAULTS, s as resolvePolicy, t as EVENT_TYPES, u as PROFILE_TABLES } from "./protocol-C2byfLMO.js";
import { C as viewerUser, S as toWidgetTheme, _ as checkWidgetData, a as SAFE_AREA_ENV_VARIABLES, b as requestRefusal, c as VIEWER_FIELD_RULES, d as checkChatType, f as checkContentSafeArea, g as checkViewer, h as checkStorageCommit, i as RequestGate, l as allowedInPreview, m as checkRequestAnswer, n as HapticGate, o as STORAGE_QUOTA_BYTES, p as checkLocale, r as PRIVILEGED_METHODS, u as checkBridgeCall, w as walletFailure, y as requestFailure } from "./sdk-policy-J1ymCNEZ.js";
import { n as emscripten_module_default, prepareInlineVM, t as createGlue } from "./inline-engine-B3BQc13q.js";
import { ShadowDomRenderer, n as paintLimitMessage, t as checkPaintLimit } from "./shadow-renderer-_et1p-EL.js";
//#region src/vendor/widget-sandbox/src/host/message-guards.ts
/** Shape checks for messages crossing the worker and renderer boundaries; anything else is dropped. */
function isTypedMessage(value) {
	return typeof value === "object" && value !== null && !Array.isArray(value) && typeof value.type === "string";
}
function finiteNumber(value) {
	return typeof value === "number" && Number.isFinite(value) ? value : void 0;
}
//#endregion
//#region \0virtual:frame-bundle
var _virtual_frame_bundle_default = "\"use strict\";(()=>{var Dy=Object.create;var na=Object.defineProperty;var Fy=Object.getOwnPropertyDescriptor;var zy=Object.getOwnPropertyNames;var By=Object.getPrototypeOf,Qy=Object.prototype.hasOwnProperty;var mi=(e,t,n)=>()=>{if(n)throw n[0];try{return e&&(t=e(e=0)),t}catch(r){throw n=[r],r}};var Nr=(e,t)=>()=>{try{return t||e((t={exports:{}}).exports,t),t.exports}catch(n){throw t=0,n}},I=(e,t)=>{for(var n in t)na(e,n,{get:t[n],enumerable:!0})},Hy=(e,t,n,r)=>{if(t&&typeof t==\"object\"||typeof t==\"function\")for(let i of zy(t))!Qy.call(e,i)&&i!==n&&na(e,i,{get:()=>t[i],enumerable:!(r=Fy(t,i))||r.enumerable});return e};var Wy=(e,t,n)=>(n=e!=null?Dy(By(e)):{},Hy(t||!e||!e.__esModule?na(n,\"default\",{value:e,enumerable:!0}):n,e));var rr,ra,co,ir,hi,uo=mi(()=>{rr={JS_EVAL_TYPE_GLOBAL:0,JS_EVAL_TYPE_MODULE:1,JS_EVAL_TYPE_DIRECT:2,JS_EVAL_TYPE_INDIRECT:3,JS_EVAL_TYPE_MASK:3,JS_EVAL_FLAG_STRICT:8,JS_EVAL_FLAG_STRIP:16,JS_EVAL_FLAG_COMPILE_ONLY:32,JS_EVAL_FLAG_BACKTRACE_BARRIER:64},ra={BaseObjects:1,Date:2,Eval:4,StringNormalize:8,RegExp:16,RegExpCompiler:32,JSON:64,Proxy:128,MapSet:256,TypedArrays:512,Promise:1024,BigInt:2048,BigFloat:4096,BigDecimal:8192,OperatorOverloading:16384,BignumExt:32768},co={Pending:0,Fulfilled:1,Rejected:2},ir={JS_GPN_STRING_MASK:1,JS_GPN_SYMBOL_MASK:2,JS_GPN_PRIVATE_MASK:4,JS_GPN_ENUM_ONLY:16,JS_GPN_SET_ENUM:32,QTS_GPN_NUMBER_MASK:64,QTS_STANDARD_COMPLIANT_NUMBER:128},hi={IsStrictlyEqual:0,IsSameValue:1,IsSameValueZero:2}});function or(...e){ua&&console.log(\"quickjs-emscripten:\",...e)}function*Yp(e){return yield e}function Vy(e){return Yp(da(e))}function Op(e,t){return(...n)=>{let r=t.call(e,pa,...n);return da(r)}}function jy(e,t){let n=t.call(e,pa);return da(n)}function da(e){function t(n){return n.done?n.value:n.value instanceof Promise?n.value.then(r=>t(e.next(r)),r=>t(e.throw(r))):t(e.next(n.value))}return t(e.next())}function ia(e,t){let n;try{e.dispose()}catch(r){n=r}if(t&&n)throw Object.assign(t,{message:`${t.message}\n Then, failed to dispose scope: ${n.message}`,disposeError:n}),t;if(t||n)throw t||n}function Xp(e){let t=e?Array.from(e):[];function n(){return t.forEach(i=>i.alive?i.dispose():void 0)}function r(){return t.some(i=>i.alive)}return Object.defineProperty(t,la,{configurable:!0,enumerable:!1,value:n}),Object.defineProperty(t,\"dispose\",{configurable:!0,enumerable:!1,value:n}),Object.defineProperty(t,\"alive\",{configurable:!0,enumerable:!1,get:r}),t}function mo(e){return!!(e&&(typeof e==\"object\"||typeof e==\"function\")&&\"alive\"in e&&typeof e.alive==\"boolean\"&&\"dispose\"in e&&typeof e.dispose==\"function\")}function qy(e){if(!e)return 0;let t=0;for(let[n,r]of Object.entries(e)){if(!(n in ra))throw new jp(n);r&&(t|=ra[n])}return t}function Jy(e){if(typeof e==\"number\")return e;if(e===void 0)return 0;let{type:t,strict:n,strip:r,compileOnly:i,backtraceBarrier:o}=e,s=0;return t===\"global\"&&(s|=rr.JS_EVAL_TYPE_GLOBAL),t===\"module\"&&(s|=rr.JS_EVAL_TYPE_MODULE),n&&(s|=rr.JS_EVAL_FLAG_STRICT),r&&(s|=rr.JS_EVAL_FLAG_STRIP),i&&(s|=rr.JS_EVAL_FLAG_COMPILE_ONLY),o&&(s|=rr.JS_EVAL_FLAG_BACKTRACE_BARRIER),s}function Yy(e){if(typeof e==\"number\")return e;if(e===void 0)return 0;let{strings:t,symbols:n,quickjsPrivate:r,onlyEnumerable:i,numbers:o,numbersAsStrings:s}=e,l=0;return t&&(l|=ir.JS_GPN_STRING_MASK),n&&(l|=ir.JS_GPN_SYMBOL_MASK),r&&(l|=ir.JS_GPN_PRIVATE_MASK),i&&(l|=ir.JS_GPN_ENUM_ONLY),o&&(l|=ir.QTS_GPN_NUMBER_MASK),s&&(l|=ir.QTS_STANDARD_COMPLIANT_NUMBER),l}function Ky(...e){let t=[];for(let n of e)n!==void 0&&(t=t.concat(n));return t}function oa(e){return e>>8}function ha(e,t){t.interruptHandler&&e.setInterruptHandler(t.interruptHandler),t.maxStackSizeBytes!==void 0&&e.setMaxStackSize(t.maxStackSizeBytes),t.memoryLimitBytes!==void 0&&e.setMemoryLimit(t.memoryLimitBytes)}function ga(e,t){t.moduleLoader&&e.setModuleLoader(t.moduleLoader),t.shouldInterrupt&&e.setInterruptHandler(t.shouldInterrupt),t.memoryLimitBytes!==void 0&&e.setMemoryLimit(t.memoryLimitBytes),t.maxStackSizeBytes!==void 0&&e.setMaxStackSize(t.maxStackSizeBytes)}var Uy,Gy,ua,Qp,sa,Hp,aa,Wp,Up,Gp,Vp,ho,jp,$p,qp,Jp,On,pa,Gt,la,Dp,ze,In,ca,Rt,fa,ed,td,sr,nd,rd,$y,Xy,Fp,zp,fo,Zy,Bp,eb,id,od,tb,ma,ya,ba=mi(()=>{uo();uo();Uy=Object.defineProperty,Gy=(e,t)=>{for(var n in t)Uy(e,n,{get:t[n],enumerable:!0})},ua=!1;Qp={};Gy(Qp,{QuickJSAsyncifyError:()=>Up,QuickJSAsyncifySuspended:()=>Gp,QuickJSEmptyGetOwnPropertyNames:()=>qp,QuickJSEmscriptenModuleError:()=>ho,QuickJSHostRefInvalid:()=>On,QuickJSHostRefRangeExceeded:()=>Jp,QuickJSMemoryLeakDetected:()=>Vp,QuickJSNotImplemented:()=>Wp,QuickJSPromisePending:()=>$p,QuickJSUnknownIntrinsic:()=>jp,QuickJSUnwrapError:()=>sa,QuickJSUseAfterFree:()=>aa,QuickJSWrongOwner:()=>Hp});sa=class extends Error{constructor(e,t){let n=typeof e==\"object\"&&e&&\"message\"in e?String(e.message):String(e);super(n),this.cause=e,this.context=t,this.name=\"QuickJSUnwrapError\"}},Hp=class extends Error{constructor(){super(...arguments),this.name=\"QuickJSWrongOwner\"}},aa=class extends Error{constructor(){super(...arguments),this.name=\"QuickJSUseAfterFree\"}},Wp=class extends Error{constructor(){super(...arguments),this.name=\"QuickJSNotImplemented\"}},Up=class extends Error{constructor(){super(...arguments),this.name=\"QuickJSAsyncifyError\"}},Gp=class extends Error{constructor(){super(...arguments),this.name=\"QuickJSAsyncifySuspended\"}},Vp=class extends Error{constructor(){super(...arguments),this.name=\"QuickJSMemoryLeakDetected\"}},ho=class extends Error{constructor(){super(...arguments),this.name=\"QuickJSEmscriptenModuleError\"}},jp=class extends TypeError{constructor(){super(...arguments),this.name=\"QuickJSUnknownIntrinsic\"}},$p=class extends Error{constructor(){super(...arguments),this.name=\"QuickJSPromisePending\"}},qp=class extends Error{constructor(){super(...arguments),this.name=\"QuickJSEmptyGetOwnPropertyNames\"}},Jp=class extends Error{constructor(){super(...arguments),this.name=\"QuickJSHostRefRangeExceeded\"}},On=class extends Error{constructor(){super(...arguments),this.name=\"QuickJSHostRefInvalid\"}};pa=Yp;pa.of=Vy;Gt=class{[Symbol.dispose](){return this.dispose()}},la=Symbol.dispose??Symbol.for(\"Symbol.dispose\"),Dp=Gt.prototype;Dp[la]||(Dp[la]=function(){return this.dispose()});ze=class Kp extends Gt{constructor(t,n,r,i){super(),this._value=t,this.copier=n,this.disposer=r,this._owner=i,this._alive=!0,this._constructorStack=ua?new Error(\"Lifetime constructed\").stack:void 0}get alive(){return this._alive}get value(){return this.assertAlive(),this._value}get owner(){return this._owner}get dupable(){return!!this.copier}dup(){if(this.assertAlive(),!this.copier)throw new Error(\"Non-dupable lifetime\");return new Kp(this.copier(this._value),this.copier,this.disposer,this._owner)}consume(t){this.assertAlive();let n=t(this);return this.dispose(),n}map(t){return this.assertAlive(),t(this)}tap(t){return t(this),this}dispose(){this.assertAlive(),this.disposer&&this.disposer(this._value),this._alive=!1}assertAlive(){if(!this.alive)throw this._constructorStack?new aa(`Lifetime not alive\n${this._constructorStack}\nLifetime used`):new aa(\"Lifetime not alive\")}},In=class extends ze{constructor(e,t){super(e,void 0,void 0,t)}get dupable(){return!0}dup(){return this}dispose(){}},ca=class extends ze{constructor(e,t,n,r){super(e,t,n,r)}dispose(){this._alive=!1}};Rt=class po extends Gt{constructor(){super(...arguments),this._disposables=new ze(new Set),this.manage=t=>(this._disposables.value.add(t),t)}static withScope(t){let n=new po,r;try{return t(n)}catch(i){throw r=i,i}finally{ia(n,r)}}static withScopeMaybeAsync(t,n){return jy(void 0,function*(r){let i=new po,o;try{return yield*r.of(n.call(t,r,i))}catch(s){throw o=s,s}finally{ia(i,o)}})}static async withScopeAsync(t){let n=new po,r;try{return await t(n)}catch(i){throw r=i,i}finally{ia(n,r)}}get alive(){return this._disposables.alive}dispose(){let t=Array.from(this._disposables.value.values()).reverse();for(let n of t)n.alive&&n.dispose();this._disposables.dispose()}};fa=class Zp extends Gt{static success(t){return new ed(t)}static fail(t,n){return new td(t,n)}static is(t){return t instanceof Zp}},ed=class extends fa{constructor(e){super(),this.value=e}get alive(){return mo(this.value)?this.value.alive:!0}dispose(){mo(this.value)&&this.value.dispose()}unwrap(){return this.value}unwrapOr(e){return this.value}},td=class extends fa{constructor(e,t){super(),this.error=e,this.onUnwrap=t}get alive(){return mo(this.error)?this.error.alive:!0}dispose(){mo(this.error)&&this.error.dispose()}unwrap(){throw this.onUnwrap(this),this.error}unwrapOr(e){return e}},sr=fa,nd=class extends Gt{constructor(e){super(),this.resolve=t=>{this.resolveHandle.alive&&(this.context.unwrapResult(this.context.callFunction(this.resolveHandle,this.context.undefined,t||this.context.undefined)).dispose(),this.disposeResolvers(),this.onSettled())},this.reject=t=>{this.rejectHandle.alive&&(this.context.unwrapResult(this.context.callFunction(this.rejectHandle,this.context.undefined,t||this.context.undefined)).dispose(),this.disposeResolvers(),this.onSettled())},this.dispose=()=>{this.handle.alive&&this.handle.dispose(),this.disposeResolvers()},this.context=e.context,this.owner=e.context.runtime,this.handle=e.promiseHandle,this.settled=new Promise(t=>{this.onSettled=t}),this.resolveHandle=e.resolveHandle,this.rejectHandle=e.rejectHandle}get alive(){return this.handle.alive||this.resolveHandle.alive||this.rejectHandle.alive}disposeResolvers(){this.resolveHandle.alive&&this.resolveHandle.dispose(),this.rejectHandle.alive&&this.rejectHandle.dispose()}},rd=class{constructor(e){this.module=e}toPointerArray(e){let t=new Int32Array(e.map(i=>i.value)),n=t.length*t.BYTES_PER_ELEMENT,r=this.module._malloc(n);return new Uint8Array(this.module.HEAPU8.buffer,r,n).set(new Uint8Array(t.buffer)),new ze(r,void 0,i=>this.module._free(i))}newTypedArray(e,t){let n=new e(new Array(t).fill(0)),r=n.length*n.BYTES_PER_ELEMENT,i=this.module._malloc(r),o=new e(this.module.HEAPU8.buffer,i,t);return o.set(n),new ze({typedArray:o,ptr:i},void 0,s=>this.module._free(s.ptr))}newMutablePointerArray(e){return this.newTypedArray(Int32Array,e)}newHeapCharPointer(e){let t=this.module.lengthBytesUTF8(e),n=t+1,r=this.module._malloc(n);return this.module.stringToUTF8(e,r,n),new ze({ptr:r,strlen:t},void 0,i=>this.module._free(i.ptr))}newHeapBufferPointer(e){let t=e.byteLength,n=this.module._malloc(t);return this.module.HEAPU8.set(e,n),new ze({pointer:n,numBytes:t},void 0,r=>this.module._free(r.pointer))}consumeHeapCharPointer(e){let t=this.module.UTF8ToString(e);return this.module._free(e),t}},$y=Object.freeze({BaseObjects:!0,Date:!0,Eval:!0,StringNormalize:!0,RegExp:!0,JSON:!0,Proxy:!0,MapSet:!0,TypedArrays:!0,Promise:!0});Xy=class extends Gt{constructor(e,t){super(),this.handle=e,this.context=t,this._isDone=!1,this.owner=t.runtime}[Symbol.iterator](){return this}next(e){if(!this.alive||this._isDone)return{done:!0,value:void 0};let t=this._next??(this._next=this.context.getProp(this.handle,\"next\"));return this.callIteratorMethod(t,e)}return(e){if(!this.alive)return{done:!0,value:void 0};let t=this.context.getProp(this.handle,\"return\");if(t===this.context.undefined&&e===void 0)return this.dispose(),{done:!0,value:void 0};let n=this.callIteratorMethod(t,e);return t.dispose(),this.dispose(),n}throw(e){if(!this.alive)return{done:!0,value:void 0};let t=e instanceof ze?e:this.context.newError(e),n=this.context.getProp(this.handle,\"throw\"),r=this.callIteratorMethod(n,e);return t.alive&&t.dispose(),n.dispose(),this.dispose(),r}get alive(){return this.handle.alive}dispose(){this._isDone=!0,this.handle.dispose(),this._next?.dispose()}callIteratorMethod(e,t){let n=t?this.context.callFunction(e,this.handle,t):this.context.callFunction(e,this.handle);if(n.error)return this.dispose(),{value:n};let r=this.context.getProp(n.value,\"done\").consume(o=>this.context.dump(o)),i=this.context.getProp(n.value,\"value\");return n.value.dispose(),r&&this.dispose(),{value:sr.success(i),done:r}}},Fp=-2147483648,zp=2147483647,fo=0;Zy=class{constructor(){this.nextId=Fp,this.freelist=[],this.groups=new Map}put(e){let t=this.allocateId(),n=oa(t),r=this.groups.get(n);return r||(r=new Map,this.groups.set(n,r)),r.set(t,e),t}get(e){if(e===fo)throw new On(\"no host reference id defined\");let t=oa(e),n=this.groups.get(t);if(!n)throw new On(`host reference id ${e} is not defined`);let r=n.get(e);if(!r)throw new On(`host reference id ${e} is not defined`);return r}delete(e){if(e===fo)throw new On(\"no host reference id defined\");let t=oa(e),n=this.groups.get(t);if(!n)throw new On(`host reference id ${e} is not defined`);n.delete(e),n.size===0&&this.groups.delete(t),this.freelist.push(e)}allocateId(){if(this.freelist.length>0)return this.freelist.shift();if(this.nextId===fo&&this.nextId++,this.nextId>zp)throw new Jp(`HostRefMap: too many host refs created without disposing. Max simultaneous host refs: ${zp-Fp}`);return this.nextId++}},Bp=class extends Gt{constructor(e,t,n){if(n===fo)throw new On(\"cannot create HostRef with undefined id\");super(),this.runtime=e,this.handle=t,this.id=n}get alive(){return this.handle.alive}dispose(){this.handle.dispose()}get value(){return this.runtime.hostRefs.get(this.id)}},eb=class extends rd{constructor(e){super(e.module),this.scope=new Rt,this.copyJSValue=t=>this.ffi.QTS_DupValuePointer(this.ctx.value,t),this.freeJSValue=t=>{this.ffi.QTS_FreeValuePointer(this.ctx.value,t)},e.ownedLifetimes?.forEach(t=>this.scope.manage(t)),this.owner=e.owner,this.module=e.module,this.ffi=e.ffi,this.rt=e.rt,this.ctx=this.scope.manage(e.ctx)}get alive(){return this.scope.alive}dispose(){return this.scope.dispose()}[Symbol.dispose](){return this.dispose()}manage(e){return this.scope.manage(e)}consumeJSCharPointer(e){let t=this.module.UTF8ToString(e);return this.ffi.QTS_FreeCString(this.ctx.value,e),t}heapValueHandle(e,t){let n=t?r=>{t(),this.freeJSValue(r)}:this.freeJSValue;return new ze(e,this.copyJSValue,n,this.owner)}staticHeapValueHandle(e){return this.manage(this.heapValueHandle(e)),new In(e,this.owner)}},id=class extends Gt{constructor(e){super(),this._undefined=void 0,this._null=void 0,this._false=void 0,this._true=void 0,this._global=void 0,this._BigInt=void 0,this._Symbol=void 0,this._SymbolIterator=void 0,this._SymbolAsyncIterator=void 0,this.cToHostCallbacks={callFunction:(t,n,r,i,o)=>{if(t!==this.ctx.value)throw new Error(\"QuickJSContext instance received C -> JS call with mismatched ctx\");let s=this.getFunction(o);return Rt.withScopeMaybeAsync(this,function*(l,c){let p=c.manage(new ca(n,this.memory.copyJSValue,this.memory.freeJSValue,this.runtime)),f=new Array(r);for(let m=0;m<r;m++){let g=this.ffi.QTS_ArgvGetJSValueConstPointer(i,m);f[m]=c.manage(new ca(g,this.memory.copyJSValue,this.memory.freeJSValue,this.runtime))}try{let m=yield*l(s.apply(p,f));if(m){if(\"error\"in m&&m.error)throw this.runtime.debugLog(\"throw error\",m.error),m.error;let g=c.manage(m instanceof ze?m:m.value);return this.ffi.QTS_DupValuePointer(this.ctx.value,g.value)}return 0}catch(m){return this.errorToHandle(m).consume(g=>this.ffi.QTS_Throw(this.ctx.value,g.value))}})}},this.runtime=e.runtime,this.module=e.module,this.ffi=e.ffi,this.rt=e.rt,this.ctx=e.ctx,this.memory=new eb({...e,owner:this.runtime}),e.callbacks.setContextCallbacks(this.ctx.value,this.cToHostCallbacks),this.dump=this.dump.bind(this),this.getString=this.getString.bind(this),this.getNumber=this.getNumber.bind(this),this.resolvePromise=this.resolvePromise.bind(this),this.uint32Out=this.memory.manage(this.memory.newTypedArray(Uint32Array,1))}get alive(){return this.memory.alive}dispose(){this.memory.dispose()}get undefined(){if(this._undefined)return this._undefined;let e=this.ffi.QTS_GetUndefined();return this._undefined=new In(e)}get null(){if(this._null)return this._null;let e=this.ffi.QTS_GetNull();return this._null=new In(e)}get true(){if(this._true)return this._true;let e=this.ffi.QTS_GetTrue();return this._true=new In(e)}get false(){if(this._false)return this._false;let e=this.ffi.QTS_GetFalse();return this._false=new In(e)}get global(){if(this._global)return this._global;let e=this.ffi.QTS_GetGlobalObject(this.ctx.value);return this._global=this.memory.staticHeapValueHandle(e),this._global}newNumber(e){return this.memory.heapValueHandle(this.ffi.QTS_NewFloat64(this.ctx.value,e))}newString(e){let t=this.memory.newHeapCharPointer(e).consume(n=>this.ffi.QTS_NewString(this.ctx.value,n.value.ptr));return this.memory.heapValueHandle(t)}newUniqueSymbol(e){let t=(typeof e==\"symbol\"?e.description:e)??\"\",n=this.memory.newHeapCharPointer(t).consume(r=>this.ffi.QTS_NewSymbol(this.ctx.value,r.value.ptr,0));return this.memory.heapValueHandle(n)}newSymbolFor(e){let t=(typeof e==\"symbol\"?e.description:e)??\"\",n=this.memory.newHeapCharPointer(t).consume(r=>this.ffi.QTS_NewSymbol(this.ctx.value,r.value.ptr,1));return this.memory.heapValueHandle(n)}getWellKnownSymbol(e){return this._Symbol??(this._Symbol=this.memory.manage(this.getProp(this.global,\"Symbol\"))),this.getProp(this._Symbol,e)}newBigInt(e){if(!this._BigInt){let r=this.getProp(this.global,\"BigInt\");this.memory.manage(r),this._BigInt=new In(r.value,this.runtime)}let t=this._BigInt,n=String(e);return this.newString(n).consume(r=>this.unwrapResult(this.callFunction(t,this.undefined,r)))}newObject(e){e&&this.runtime.assertOwned(e);let t=e?this.ffi.QTS_NewObjectProto(this.ctx.value,e.value):this.ffi.QTS_NewObject(this.ctx.value);return this.memory.heapValueHandle(t)}newArray(){let e=this.ffi.QTS_NewArray(this.ctx.value);return this.memory.heapValueHandle(e)}newArrayBuffer(e){let t=new Uint8Array(e),n=this.memory.newHeapBufferPointer(t),r=this.ffi.QTS_NewArrayBuffer(this.ctx.value,n.value.pointer,t.length);return this.memory.heapValueHandle(r)}newPromise(e){let t=Rt.withScope(n=>{let r=n.manage(this.memory.newMutablePointerArray(2)),i=this.ffi.QTS_NewPromiseCapability(this.ctx.value,r.value.ptr),o=this.memory.heapValueHandle(i),[s,l]=Array.from(r.value.typedArray).map(c=>this.memory.heapValueHandle(c));return new nd({context:this,promiseHandle:o,resolveHandle:s,rejectHandle:l})});return e&&typeof e==\"function\"&&(e=new Promise(e)),e&&Promise.resolve(e).then(t.resolve,n=>n instanceof ze?t.reject(n):this.newError(n).consume(t.reject)),t}newFunction(e,t){let n=typeof e==\"function\"?e:t;if(!n)throw new TypeError(\"Expected a function\");return this.newFunctionWithOptions({name:typeof e==\"string\"?e:void 0,length:n.length,isConstructor:!1,fn:n})}newConstructorFunction(e,t){let n=typeof e==\"function\"?e:t;if(!n)throw new TypeError(\"Expected a function\");return this.newFunctionWithOptions({name:typeof e==\"string\"?e:void 0,length:n.length,isConstructor:!0,fn:n})}newFunctionWithOptions(e){let{name:t,length:n,isConstructor:r,fn:i}=e,o=this.runtime.hostRefs.put(i);try{return this.memory.heapValueHandle(this.ffi.QTS_NewFunction(this.ctx.value,t??\"\",n,r,o))}catch(s){throw this.runtime.hostRefs.delete(o),s}}newError(e){let t=this.memory.heapValueHandle(this.ffi.QTS_NewError(this.ctx.value));return e&&typeof e==\"object\"?(e.name!==void 0&&this.newString(e.name).consume(n=>this.setProp(t,\"name\",n)),e.message!==void 0&&this.newString(e.message).consume(n=>this.setProp(t,\"message\",n))):typeof e==\"string\"?this.newString(e).consume(n=>this.setProp(t,\"message\",n)):e!==void 0&&this.newString(String(e)).consume(n=>this.setProp(t,\"message\",n)),t}newHostRef(e){let t=this.runtime.hostRefs.put(e);try{let n=this.memory.heapValueHandle(this.ffi.QTS_NewHostRef(this.ctx.value,t));return new Bp(this.runtime,n,t)}catch(n){throw this.runtime.hostRefs.delete(t),n}}toHostRef(e){let t=this.ffi.QTS_GetHostRefId(e.value);if(t!==0)return this.runtime.hostRefs.get(t),new Bp(this.runtime,e.dup(),t)}unwrapHostRef(e){let t=this.ffi.QTS_GetHostRefId(e.value);if(t===0)throw new On(\"handle is not a HostRef\");return this.runtime.hostRefs.get(t)}typeof(e){return this.runtime.assertOwned(e),this.memory.consumeHeapCharPointer(this.ffi.QTS_Typeof(this.ctx.value,e.value))}getNumber(e){return this.runtime.assertOwned(e),this.ffi.QTS_GetFloat64(this.ctx.value,e.value)}getString(e){return this.runtime.assertOwned(e),this.memory.consumeJSCharPointer(this.ffi.QTS_GetString(this.ctx.value,e.value))}getSymbol(e){this.runtime.assertOwned(e);let t=this.memory.consumeJSCharPointer(this.ffi.QTS_GetSymbolDescriptionOrKey(this.ctx.value,e.value));return this.ffi.QTS_IsGlobalSymbol(this.ctx.value,e.value)?Symbol.for(t):Symbol(t)}getBigInt(e){this.runtime.assertOwned(e);let t=this.getString(e);return BigInt(t)}getArrayBuffer(e){this.runtime.assertOwned(e);let t=this.ffi.QTS_GetArrayBufferLength(this.ctx.value,e.value),n=this.ffi.QTS_GetArrayBuffer(this.ctx.value,e.value);if(!n)throw new Error(\"Couldn't allocate memory to get ArrayBuffer\");return new ze(this.module.HEAPU8.subarray(n,n+t),void 0,()=>this.module._free(n))}getPromiseState(e){this.runtime.assertOwned(e);let t=this.ffi.QTS_PromiseState(this.ctx.value,e.value);if(t<0)return{type:\"fulfilled\",value:e,notAPromise:!0};if(t===co.Pending)return{type:\"pending\",get error(){return new $p(\"Cannot unwrap a pending promise\")}};let n=this.ffi.QTS_PromiseResult(this.ctx.value,e.value),r=this.memory.heapValueHandle(n);if(t===co.Fulfilled)return{type:\"fulfilled\",value:r};if(t===co.Rejected)return{type:\"rejected\",error:r};throw r.dispose(),new Error(`Unknown JSPromiseStateEnum: ${t}`)}resolvePromise(e){this.runtime.assertOwned(e);let t=Rt.withScope(n=>{let r=n.manage(this.getProp(this.global,\"Promise\")),i=n.manage(this.getProp(r,\"resolve\"));return this.callFunction(i,r,e)});return t.error?Promise.resolve(t):new Promise(n=>{Rt.withScope(r=>{let i=r.manage(this.newFunction(\"resolve\",c=>{n(this.success(c&&c.dup()))})),o=r.manage(this.newFunction(\"reject\",c=>{n(this.fail(c&&c.dup()))})),s=r.manage(t.value),l=r.manage(this.getProp(s,\"then\"));this.callFunction(l,s,i,o).unwrap().dispose()})})}isEqual(e,t,n=hi.IsStrictlyEqual){if(e===t)return!0;this.runtime.assertOwned(e),this.runtime.assertOwned(t);let r=this.ffi.QTS_IsEqual(this.ctx.value,e.value,t.value,n);if(r===-1)throw new Wp(\"WASM variant does not expose equality\");return!!r}eq(e,t){return this.isEqual(e,t,hi.IsStrictlyEqual)}sameValue(e,t){return this.isEqual(e,t,hi.IsSameValue)}sameValueZero(e,t){return this.isEqual(e,t,hi.IsSameValueZero)}getProp(e,t){this.runtime.assertOwned(e);let n;return typeof t==\"number\"&&t>=0?n=this.ffi.QTS_GetPropNumber(this.ctx.value,e.value,t):n=this.borrowPropertyKey(t).consume(r=>this.ffi.QTS_GetProp(this.ctx.value,e.value,r.value)),this.memory.heapValueHandle(n)}getLength(e){if(this.runtime.assertOwned(e),!(this.ffi.QTS_GetLength(this.ctx.value,this.uint32Out.value.ptr,e.value)<0))return this.uint32Out.value.typedArray[0]}getOwnPropertyNames(e,t={strings:!0,numbersAsStrings:!0}){this.runtime.assertOwned(e),e.value;let n=Yy(t);if(n===0)throw new qp(\"No options set, will return an empty array\");return Rt.withScope(r=>{let i=r.manage(this.memory.newMutablePointerArray(1)),o=this.ffi.QTS_GetOwnPropertyNames(this.ctx.value,i.value.ptr,this.uint32Out.value.ptr,e.value,n);if(o)return this.fail(this.memory.heapValueHandle(o));let s=this.uint32Out.value.typedArray[0],l=i.value.typedArray[0],c=new Uint32Array(this.module.HEAP8.buffer,l,s),p=Array.from(c).map(f=>this.memory.heapValueHandle(f));return this.ffi.QTS_FreeVoidPointer(this.ctx.value,l),this.success(Xp(p))})}getIterator(e){let t=this._SymbolIterator??(this._SymbolIterator=this.memory.manage(this.getWellKnownSymbol(\"iterator\")));return Rt.withScope(n=>{let r=n.manage(this.getProp(e,t)),i=this.callFunction(r,e);return i.error?i:this.success(new Xy(i.value,this))})}setProp(e,t,n){this.runtime.assertOwned(e),this.borrowPropertyKey(t).consume(r=>this.ffi.QTS_SetProp(this.ctx.value,e.value,r.value,n.value))}defineProp(e,t,n){this.runtime.assertOwned(e),Rt.withScope(r=>{let i=r.manage(this.borrowPropertyKey(t)),o=n.value||this.undefined,s=!!n.configurable,l=!!n.enumerable,c=!!n.value,p=n.get?r.manage(this.newFunction(n.get.name,n.get)):this.undefined,f=n.set?r.manage(this.newFunction(n.set.name,n.set)):this.undefined;this.ffi.QTS_DefineProp(this.ctx.value,e.value,i.value,o.value,p.value,f.value,s,l,c)})}callFunction(e,t,...n){this.runtime.assertOwned(e);let r,i=n[0];i===void 0||Array.isArray(i)?r=i??[]:r=n;let o=this.memory.toPointerArray(r).consume(l=>this.ffi.QTS_Call(this.ctx.value,e.value,t.value,r.length,l.value)),s=this.ffi.QTS_ResolveException(this.ctx.value,o);return s?(this.ffi.QTS_FreeValuePointer(this.ctx.value,o),this.fail(this.memory.heapValueHandle(s))):this.success(this.memory.heapValueHandle(o))}callMethod(e,t,n=[]){return this.getProp(e,t).consume(r=>this.callFunction(r,e,n))}evalCode(e,t=\"eval.js\",n){let r=n===void 0?1:0,i=Jy(n),o=this.memory.newHeapCharPointer(e).consume(l=>this.ffi.QTS_Eval(this.ctx.value,l.value.ptr,l.value.strlen,t,r,i)),s=this.ffi.QTS_ResolveException(this.ctx.value,o);return s?(this.ffi.QTS_FreeValuePointer(this.ctx.value,o),this.fail(this.memory.heapValueHandle(s))):this.success(this.memory.heapValueHandle(o))}throw(e){return this.errorToHandle(e).consume(t=>this.ffi.QTS_Throw(this.ctx.value,t.value))}borrowPropertyKey(e){return typeof e==\"number\"?this.newNumber(e):typeof e==\"string\"?this.newString(e):new In(e.value,this.runtime)}getMemory(e){if(e===this.rt.value)return this.memory;throw new Error(\"Private API. Cannot get memory from a different runtime\")}dump(e){this.runtime.assertOwned(e);let t=this.typeof(e);if(t===\"string\")return this.getString(e);if(t===\"number\")return this.getNumber(e);if(t===\"bigint\")return this.getBigInt(e);if(t===\"undefined\")return;if(t===\"symbol\")return this.getSymbol(e);let n=this.getPromiseState(e);if(n.type===\"fulfilled\"&&!n.notAPromise)return e.dispose(),{type:n.type,value:n.value.consume(this.dump)};if(n.type===\"pending\")return e.dispose(),{type:n.type};if(n.type===\"rejected\")return e.dispose(),{type:n.type,error:n.error.consume(this.dump)};let r=this.memory.consumeJSCharPointer(this.ffi.QTS_Dump(this.ctx.value,e.value));try{return JSON.parse(r)}catch{return r}}unwrapResult(e){if(e.error){let t=\"context\"in e.error?e.error.context:this,n=e.error.consume(r=>this.dump(r));if(n&&typeof n==\"object\"&&typeof n.message==\"string\"){let{message:r,name:i,stack:o,...s}=n,l=new sa(n,t);typeof i==\"string\"&&(l.name=n.name),l.message=r;let c=l.stack;throw typeof o==\"string\"&&(l.stack=`${i}: ${r}\n${n.stack}Host: ${c}`),Object.assign(l,s),l}throw new sa(n)}return e.value}[Symbol.for(\"nodejs.util.inspect.custom\")](){return this.alive?`${this.constructor.name} { ctx: ${this.ctx.value} rt: ${this.rt.value} }`:`${this.constructor.name} { disposed }`}getFunction(e){let t=this.runtime.hostRefs.get(e);if(typeof t!=\"function\")throw new Error(`Host reference ${e} is not a function`);return t}errorToHandle(e){return e instanceof ze?e:this.newError(e)}encodeBinaryJSON(e){let t=this.ffi.QTS_bjson_encode(this.ctx.value,e.value);return this.memory.heapValueHandle(t)}decodeBinaryJSON(e){let t=this.ffi.QTS_bjson_decode(this.ctx.value,e.value);return this.memory.heapValueHandle(t)}success(e){return sr.success(e)}fail(e){return sr.fail(e,t=>this.unwrapResult(t))}},od=class extends Gt{constructor(e){super(),this.scope=new Rt,this.contextMap=new Map,this.hostRefs=new Zy,this._debugMode=!1,this.cToHostCallbacks={freeHostRef:(t,n)=>{if(t!==this.rt.value)throw new Error(\"Runtime pointer mismatch\");this.hostRefs.delete(n)},shouldInterrupt:t=>{if(t!==this.rt.value)throw new Error(\"QuickJSContext instance received C -> JS interrupt with mismatched rt\");let n=this.interruptHandler;if(!n)throw new Error(\"QuickJSContext had no interrupt handler\");return n(this)?1:0},loadModuleSource:Op(this,function*(t,n,r,i){let o=this.moduleLoader;if(!o)throw new Error(\"Runtime has no module loader\");if(n!==this.rt.value)throw new Error(\"Runtime pointer mismatch\");let s=this.contextMap.get(r)??this.newContext({contextPointer:r});try{let l=yield*t(o(i,s));if(typeof l==\"object\"&&\"error\"in l&&l.error)throw this.debugLog(\"cToHostLoadModule: loader returned error\",l.error),l.error;let c=typeof l==\"string\"?l:\"value\"in l?l.value:l;return this.memory.newHeapCharPointer(c).value.ptr}catch(l){return this.debugLog(\"cToHostLoadModule: caught error\",l),s.throw(l),0}}),normalizeModule:Op(this,function*(t,n,r,i,o){let s=this.moduleNormalizer;if(!s)throw new Error(\"Runtime has no module normalizer\");if(n!==this.rt.value)throw new Error(\"Runtime pointer mismatch\");let l=this.contextMap.get(r)??this.newContext({contextPointer:r});try{let c=yield*t(s(i,o,l));if(typeof c==\"object\"&&\"error\"in c&&c.error)throw this.debugLog(\"cToHostNormalizeModule: normalizer returned error\",c.error),c.error;let p=typeof c==\"string\"?c:c.value;return l.getMemory(this.rt.value).newHeapCharPointer(p).value.ptr}catch(c){return this.debugLog(\"normalizeModule: caught error\",c),l.throw(c),0}})},e.ownedLifetimes?.forEach(t=>this.scope.manage(t)),this.module=e.module,this.memory=new rd(this.module),this.ffi=e.ffi,this.rt=e.rt,this.callbacks=e.callbacks,this.scope.manage(this.rt),this.callbacks.setRuntimeCallbacks(this.rt.value,this.cToHostCallbacks),this.executePendingJobs=this.executePendingJobs.bind(this),ua&&this.setDebugMode(!0)}get alive(){return this.scope.alive}dispose(){return this.scope.dispose()}newContext(e={}){let t=qy(e.intrinsics),n=new ze(e.contextPointer||this.ffi.QTS_NewContext(this.rt.value,t),void 0,i=>{this.contextMap.delete(i),this.callbacks.deleteContext(i),this.ffi.QTS_FreeContext(i)}),r=new id({module:this.module,ctx:n,ffi:this.ffi,rt:this.rt,ownedLifetimes:e.ownedLifetimes,runtime:this,callbacks:this.callbacks});return this.contextMap.set(n.value,r),r}setModuleLoader(e,t){this.moduleLoader=e,this.moduleNormalizer=t,this.ffi.QTS_RuntimeEnableModuleLoader(this.rt.value,this.moduleNormalizer?1:0)}removeModuleLoader(){this.moduleLoader=void 0,this.ffi.QTS_RuntimeDisableModuleLoader(this.rt.value)}hasPendingJob(){return!!this.ffi.QTS_IsJobPending(this.rt.value)}setInterruptHandler(e){let t=this.interruptHandler;this.interruptHandler=e,t||this.ffi.QTS_RuntimeEnableInterruptHandler(this.rt.value)}removeInterruptHandler(){this.interruptHandler&&(this.ffi.QTS_RuntimeDisableInterruptHandler(this.rt.value),this.interruptHandler=void 0)}executePendingJobs(e=-1){let t=this.memory.newMutablePointerArray(1),n=this.ffi.QTS_ExecutePendingJob(this.rt.value,e??-1,t.value.ptr),r=t.value.typedArray[0];if(t.dispose(),r===0)return this.ffi.QTS_FreeValuePointerRuntime(this.rt.value,n),sr.success(0);let i=this.contextMap.get(r)??this.newContext({contextPointer:r}),o=i.getMemory(this.rt.value).heapValueHandle(n);if(i.typeof(o)===\"number\"){let s=i.getNumber(o);return o.dispose(),sr.success(s)}else{let s=Object.assign(o,{context:i});return sr.fail(s,l=>i.unwrapResult(l))}}setMemoryLimit(e){if(e<0&&e!==-1)throw new Error(\"Cannot set memory limit to negative number. To unset, pass -1\");this.ffi.QTS_RuntimeSetMemoryLimit(this.rt.value,e)}computeMemoryUsage(){let e=this.getSystemContext().getMemory(this.rt.value);return e.heapValueHandle(this.ffi.QTS_RuntimeComputeMemoryUsage(this.rt.value,e.ctx.value))}dumpMemoryUsage(){return this.memory.consumeHeapCharPointer(this.ffi.QTS_RuntimeDumpMemoryUsage(this.rt.value))}setMaxStackSize(e){if(e<0)throw new Error(\"Cannot set memory limit to negative number. To unset, pass 0.\");this.ffi.QTS_RuntimeSetMaxStackSize(this.rt.value,e)}assertOwned(e){if(e.owner&&e.owner.rt!==this.rt)throw new Hp(`Handle is not owned by this runtime: ${e.owner.rt.value} != ${this.rt.value}`)}setDebugMode(e){this._debugMode=e,this.ffi.DEBUG&&this.rt.alive&&this.ffi.QTS_SetDebugLogEnabled(this.rt.value,e?1:0)}isDebugMode(){return this._debugMode}debugLog(...e){this._debugMode&&console.log(\"quickjs-emscripten:\",...e)}[Symbol.for(\"nodejs.util.inspect.custom\")](){return this.alive?`${this.constructor.name} { rt: ${this.rt.value} }`:`${this.constructor.name} { disposed }`}getSystemContext(){return this.context||(this.context=this.scope.manage(this.newContext())),this.context}},tb=class{constructor(e){this.freeHostRef=e.freeHostRef,this.callFunction=e.callFunction,this.shouldInterrupt=e.shouldInterrupt,this.loadModuleSource=e.loadModuleSource,this.normalizeModule=e.normalizeModule}},ma=class{constructor(e){this.contextCallbacks=new Map,this.runtimeCallbacks=new Map,this.suspendedCount=0,this.cToHostCallbacks=new tb({freeHostRef:(t,n,r)=>{let i=this.runtimeCallbacks.get(n);if(!i)throw new Error(`QuickJSRuntime(rt = ${n}) not found when trying to free HostRef(id = ${r})`);i.freeHostRef(n,r)},callFunction:(t,n,r,i,o,s)=>this.handleAsyncify(t,()=>{try{let l=this.contextCallbacks.get(n);if(!l)throw new Error(`QuickJSContext(ctx = ${n}) not found for C function call \"${s}\"`);return l.callFunction(n,r,i,o,s)}catch(l){return console.error(\"[C to host error: returning null]\",l),0}}),shouldInterrupt:(t,n)=>this.handleAsyncify(t,()=>{try{let r=this.runtimeCallbacks.get(n);if(!r)throw new Error(`QuickJSRuntime(rt = ${n}) not found for C interrupt`);return r.shouldInterrupt(n)}catch(r){return console.error(\"[C to host interrupt: returning error]\",r),1}}),loadModuleSource:(t,n,r,i)=>this.handleAsyncify(t,()=>{try{let o=this.runtimeCallbacks.get(n);if(!o)throw new Error(`QuickJSRuntime(rt = ${n}) not found for C module loader`);let s=o.loadModuleSource;if(!s)throw new Error(`QuickJSRuntime(rt = ${n}) does not support module loading`);return s(n,r,i)}catch(o){return console.error(\"[C to host module loader error: returning null]\",o),0}}),normalizeModule:(t,n,r,i,o)=>this.handleAsyncify(t,()=>{try{let s=this.runtimeCallbacks.get(n);if(!s)throw new Error(`QuickJSRuntime(rt = ${n}) not found for C module loader`);let l=s.normalizeModule;if(!l)throw new Error(`QuickJSRuntime(rt = ${n}) does not support module loading`);return l(n,r,i,o)}catch(s){return console.error(\"[C to host module loader error: returning null]\",s),0}})}),this.module=e,this.module.callbacks=this.cToHostCallbacks}setRuntimeCallbacks(e,t){this.runtimeCallbacks.set(e,t)}deleteRuntime(e){this.runtimeCallbacks.delete(e)}setContextCallbacks(e,t){this.contextCallbacks.set(e,t)}deleteContext(e){this.contextCallbacks.delete(e)}handleAsyncify(e,t){if(e)return e.handleSleep(r=>{try{let i=t();if(!(i instanceof Promise)){or(\"asyncify.handleSleep: not suspending:\",i),r(i);return}if(this.suspended)throw new Up(`Already suspended at: ${this.suspended.stack}\nAttempted to suspend at:`);this.suspended=new Gp(`(${this.suspendedCount++})`),or(\"asyncify.handleSleep: suspending:\",this.suspended),i.then(o=>{this.suspended=void 0,or(\"asyncify.handleSleep: resolved:\",o),r(o)},o=>{or(\"asyncify.handleSleep: rejected:\",o),console.error(\"QuickJS: cannot handle error in suspended function\",o),this.suspended=void 0})}catch(i){throw or(\"asyncify.handleSleep: error:\",i),this.suspended=void 0,i}});let n=t();if(n instanceof Promise)throw new Error(\"Promise return value not supported in non-asyncify context.\");return n}};ya=class{constructor(e,t){this.module=e,this.ffi=t,this.callbacks=new ma(e)}newRuntime(e={}){let t=new ze(this.ffi.QTS_NewRuntime(),void 0,r=>{this.ffi.QTS_FreeRuntime(r),this.callbacks.deleteRuntime(r)}),n=new od({module:this.module,callbacks:this.callbacks,ffi:this.ffi,rt:t});return ha(n,e),e.moduleLoader&&n.setModuleLoader(e.moduleLoader),n}newContext(e={}){let t=this.newRuntime(),n=t.newContext({...e,ownedLifetimes:Ky(t,e.ownedLifetimes)});return t.context=n,n}evalCode(e,t={}){return Rt.withScope(n=>{let r=n.manage(this.newContext());ga(r.runtime,t);let i=r.evalCode(e,\"eval.js\");if(t.memoryLimitBytes!==void 0&&r.runtime.setMemoryLimit(-1),i.error)throw r.dump(n.manage(i.error));return r.dump(n.manage(i.value))})}getWasmMemory(){let e=this.module.quickjsEmscriptenInit?.(()=>{})?.getWasmMemory?.();if(!e)throw new Error(\"Variant does not support getting WebAssembly.Memory\");return e}getFFI(){return this.ffi}}});var sd={};I(sd,{QuickJSModuleCallbacks:()=>ma,QuickJSWASMModule:()=>ya,applyBaseRuntimeOptions:()=>ha,applyModuleEvalRuntimeOptions:()=>ga});var ad=mi(()=>{ba()});var ud={};I(ud,{QuickJSFFI:()=>rb});var rb,pd=mi(()=>{\"use strict\";rb=class{constructor(e){this.module=e,this.DEBUG=!1,this.QTS_Throw=this.module.cwrap(\"QTS_Throw\",\"number\",[\"number\",\"number\"]),this.QTS_NewError=this.module.cwrap(\"QTS_NewError\",\"number\",[\"number\"]),this.QTS_RuntimeSetMemoryLimit=this.module.cwrap(\"QTS_RuntimeSetMemoryLimit\",null,[\"number\",\"number\"]),this.QTS_RuntimeComputeMemoryUsage=this.module.cwrap(\"QTS_RuntimeComputeMemoryUsage\",\"number\",[\"number\",\"number\"]),this.QTS_RuntimeDumpMemoryUsage=this.module.cwrap(\"QTS_RuntimeDumpMemoryUsage\",\"number\",[\"number\"]),this.QTS_RecoverableLeakCheck=this.module.cwrap(\"QTS_RecoverableLeakCheck\",\"number\",[]),this.QTS_BuildIsSanitizeLeak=this.module.cwrap(\"QTS_BuildIsSanitizeLeak\",\"number\",[]),this.QTS_RuntimeSetMaxStackSize=this.module.cwrap(\"QTS_RuntimeSetMaxStackSize\",null,[\"number\",\"number\"]),this.QTS_GetUndefined=this.module.cwrap(\"QTS_GetUndefined\",\"number\",[]),this.QTS_GetNull=this.module.cwrap(\"QTS_GetNull\",\"number\",[]),this.QTS_GetFalse=this.module.cwrap(\"QTS_GetFalse\",\"number\",[]),this.QTS_GetTrue=this.module.cwrap(\"QTS_GetTrue\",\"number\",[]),this.QTS_NewHostRef=this.module.cwrap(\"QTS_NewHostRef\",\"number\",[\"number\",\"number\"]),this.QTS_GetHostRefId=this.module.cwrap(\"QTS_GetHostRefId\",\"number\",[\"number\"]),this.QTS_NewRuntime=this.module.cwrap(\"QTS_NewRuntime\",\"number\",[]),this.QTS_FreeRuntime=this.module.cwrap(\"QTS_FreeRuntime\",null,[\"number\"]),this.QTS_NewContext=this.module.cwrap(\"QTS_NewContext\",\"number\",[\"number\",\"number\"]),this.QTS_FreeContext=this.module.cwrap(\"QTS_FreeContext\",null,[\"number\"]),this.QTS_FreeValuePointer=this.module.cwrap(\"QTS_FreeValuePointer\",null,[\"number\",\"number\"]),this.QTS_FreeValuePointerRuntime=this.module.cwrap(\"QTS_FreeValuePointerRuntime\",null,[\"number\",\"number\"]),this.QTS_FreeVoidPointer=this.module.cwrap(\"QTS_FreeVoidPointer\",null,[\"number\",\"number\"]),this.QTS_FreeCString=this.module.cwrap(\"QTS_FreeCString\",null,[\"number\",\"number\"]),this.QTS_DupValuePointer=this.module.cwrap(\"QTS_DupValuePointer\",\"number\",[\"number\",\"number\"]),this.QTS_NewObject=this.module.cwrap(\"QTS_NewObject\",\"number\",[\"number\"]),this.QTS_NewObjectProto=this.module.cwrap(\"QTS_NewObjectProto\",\"number\",[\"number\",\"number\"]),this.QTS_NewArray=this.module.cwrap(\"QTS_NewArray\",\"number\",[\"number\"]),this.QTS_NewArrayBuffer=this.module.cwrap(\"QTS_NewArrayBuffer\",\"number\",[\"number\",\"number\",\"number\"]),this.QTS_NewFloat64=this.module.cwrap(\"QTS_NewFloat64\",\"number\",[\"number\",\"number\"]),this.QTS_GetFloat64=this.module.cwrap(\"QTS_GetFloat64\",\"number\",[\"number\",\"number\"]),this.QTS_NewString=this.module.cwrap(\"QTS_NewString\",\"number\",[\"number\",\"number\"]),this.QTS_GetString=this.module.cwrap(\"QTS_GetString\",\"number\",[\"number\",\"number\"]),this.QTS_GetArrayBuffer=this.module.cwrap(\"QTS_GetArrayBuffer\",\"number\",[\"number\",\"number\"]),this.QTS_GetArrayBufferLength=this.module.cwrap(\"QTS_GetArrayBufferLength\",\"number\",[\"number\",\"number\"]),this.QTS_NewSymbol=this.module.cwrap(\"QTS_NewSymbol\",\"number\",[\"number\",\"number\",\"number\"]),this.QTS_GetSymbolDescriptionOrKey=this.module.cwrap(\"QTS_GetSymbolDescriptionOrKey\",\"number\",[\"number\",\"number\"]),this.QTS_IsGlobalSymbol=this.module.cwrap(\"QTS_IsGlobalSymbol\",\"number\",[\"number\",\"number\"]),this.QTS_IsJobPending=this.module.cwrap(\"QTS_IsJobPending\",\"number\",[\"number\"]),this.QTS_ExecutePendingJob=this.module.cwrap(\"QTS_ExecutePendingJob\",\"number\",[\"number\",\"number\",\"number\"]),this.QTS_GetProp=this.module.cwrap(\"QTS_GetProp\",\"number\",[\"number\",\"number\",\"number\"]),this.QTS_GetPropNumber=this.module.cwrap(\"QTS_GetPropNumber\",\"number\",[\"number\",\"number\",\"number\"]),this.QTS_SetProp=this.module.cwrap(\"QTS_SetProp\",null,[\"number\",\"number\",\"number\",\"number\"]),this.QTS_DefineProp=this.module.cwrap(\"QTS_DefineProp\",null,[\"number\",\"number\",\"number\",\"number\",\"number\",\"number\",\"boolean\",\"boolean\",\"boolean\"]),this.QTS_GetOwnPropertyNames=this.module.cwrap(\"QTS_GetOwnPropertyNames\",\"number\",[\"number\",\"number\",\"number\",\"number\",\"number\"]),this.QTS_Call=this.module.cwrap(\"QTS_Call\",\"number\",[\"number\",\"number\",\"number\",\"number\",\"number\"]),this.QTS_ResolveException=this.module.cwrap(\"QTS_ResolveException\",\"number\",[\"number\",\"number\"]),this.QTS_Dump=this.module.cwrap(\"QTS_Dump\",\"number\",[\"number\",\"number\"]),this.QTS_Eval=this.module.cwrap(\"QTS_Eval\",\"number\",[\"number\",\"number\",\"number\",\"string\",\"number\",\"number\"]),this.QTS_GetModuleNamespace=this.module.cwrap(\"QTS_GetModuleNamespace\",\"number\",[\"number\",\"number\"]),this.QTS_Typeof=this.module.cwrap(\"QTS_Typeof\",\"number\",[\"number\",\"number\"]),this.QTS_GetLength=this.module.cwrap(\"QTS_GetLength\",\"number\",[\"number\",\"number\",\"number\"]),this.QTS_IsEqual=this.module.cwrap(\"QTS_IsEqual\",\"number\",[\"number\",\"number\",\"number\",\"number\"]),this.QTS_GetGlobalObject=this.module.cwrap(\"QTS_GetGlobalObject\",\"number\",[\"number\"]),this.QTS_NewPromiseCapability=this.module.cwrap(\"QTS_NewPromiseCapability\",\"number\",[\"number\",\"number\"]),this.QTS_PromiseState=this.module.cwrap(\"QTS_PromiseState\",\"number\",[\"number\",\"number\"]),this.QTS_PromiseResult=this.module.cwrap(\"QTS_PromiseResult\",\"number\",[\"number\",\"number\"]),this.QTS_TestStringArg=this.module.cwrap(\"QTS_TestStringArg\",null,[\"string\"]),this.QTS_GetDebugLogEnabled=this.module.cwrap(\"QTS_GetDebugLogEnabled\",\"number\",[\"number\"]),this.QTS_SetDebugLogEnabled=this.module.cwrap(\"QTS_SetDebugLogEnabled\",null,[\"number\",\"number\"]),this.QTS_BuildIsDebug=this.module.cwrap(\"QTS_BuildIsDebug\",\"number\",[]),this.QTS_BuildIsAsyncify=this.module.cwrap(\"QTS_BuildIsAsyncify\",\"number\",[]),this.QTS_NewFunction=this.module.cwrap(\"QTS_NewFunction\",\"number\",[\"number\",\"string\",\"number\",\"boolean\",\"number\"]),this.QTS_ArgvGetJSValueConstPointer=this.module.cwrap(\"QTS_ArgvGetJSValueConstPointer\",\"number\",[\"number\",\"number\"]),this.QTS_RuntimeEnableInterruptHandler=this.module.cwrap(\"QTS_RuntimeEnableInterruptHandler\",null,[\"number\"]),this.QTS_RuntimeDisableInterruptHandler=this.module.cwrap(\"QTS_RuntimeDisableInterruptHandler\",null,[\"number\"]),this.QTS_RuntimeEnableModuleLoader=this.module.cwrap(\"QTS_RuntimeEnableModuleLoader\",null,[\"number\",\"number\"]),this.QTS_RuntimeDisableModuleLoader=this.module.cwrap(\"QTS_RuntimeDisableModuleLoader\",null,[\"number\"]),this.QTS_bjson_encode=this.module.cwrap(\"QTS_bjson_encode\",\"number\",[\"number\",\"number\"]),this.QTS_bjson_decode=this.module.cwrap(\"QTS_bjson_decode\",\"number\",[\"number\",\"number\"])}}});var fd={};I(fd,{default:()=>ob});async function ib(e={}){var t=e,n=!!globalThis.window,r=!!globalThis.WorkerGlobalScope;function i(y){y={log:y||function(){}};for(let v of i.Qa)v(y);return t.quickJSEmscriptenExtensions=y}i.Qa=[],t.quickjsEmscriptenInit=i,i.Qa.push(y=>{y.getWasmMemory=function(){return Ge}});var o=\"./this.program\",s=dd.url,l=\"\",c,p;if(n||r){try{l=new URL(\".\",s).href}catch{}r&&(p=y=>{var v=new XMLHttpRequest;return v.open(\"GET\",y,!1),v.responseType=\"arraybuffer\",v.send(null),new Uint8Array(v.response)}),c=async y=>{if(y=await fetch(y,{credentials:\"same-origin\"}),y.ok)return y.arrayBuffer();throw Error(y.status+\" : \"+y.url)}}var f=console.log.bind(console),m=console.error.bind(console),g=!1,S;function x(){if(!X?.buffer?.resizable){var y=Ge.buffer;t.HEAP8=X=new Int8Array(y),t.HEAPU8=Ye=new Uint8Array(y),Se=new Int32Array(y),xe=new Uint32Array(y),Zt=new BigInt64Array(y)}}function L(){var y=t.preRun;for(y&&(typeof y==\"function\"&&(y=[y]),Z.push(...y)),y=Z;y.length>0;)y.shift()(t)}function Q(){var y=t.postRun;for(y&&(typeof y==\"function\"&&(y=[y]),G.push(...y)),y=G;y.length>0;)y.shift()(t)}function R(y){throw t.onAbort?.(y),y=`Aborted(${y})`,m(y),g=!0,new WebAssembly.RuntimeError(y+\". Build with -sASSERTIONS for more info.\")}var H;async function F(y){try{var v=await c(y);return new Uint8Array(v)}catch{}if(p)y=p(y);else throw\"both async and sync fetching of the wasm failed\";return y}async function W(y,v){try{var P=await F(y);return await WebAssembly.instantiate(P,v)}catch(w){m(`failed to asynchronously prepare wasm: ${w}`),R(w)}}async function ce(y){var v=H;try{var P=fetch(v,{credentials:\"same-origin\"});return await WebAssembly.instantiateStreaming(P,y)}catch(w){m(`wasm streaming compile failed: ${w}`),m(\"falling back to ArrayBuffer instantiation\")}return W(v,y)}class J{name=\"ExitStatus\";constructor(v){this.message=`Program terminated with exit(${v})`,this.status=v}}var X,G=[],Z=[],ue=!0,Ge,Ce=new TextDecoder,Je=(y,v,P,w)=>{if(P=v+P,w)return P;for(;y[v]&&!(v>=P);)++v;return v},Ye,Ke=(y,v,P)=>y?Ce.decode(Ye.subarray(y,Je(Ye,y,v,P))):\"\",Xe=0,Ve=[0,31,60,91,121,152,182,213,244,274,305,335],Tt=[0,31,59,90,120,151,181,212,243,273,304,334],Se,je={},mt=y=>{if(!(y instanceof J||y==\"unwind\"))throw y},Wt=y=>{throw S=y,ue||Xe>0||(t.onExit?.(y),g=!0),new J(y)},Et=(y,v,P)=>{var w=Ye;if(!(P>0))return 0;var Y=v;P=v+P-1;for(var V=0;V<y.length;++V){var pe=y.codePointAt(V);if(pe<=127){if(v>=P)break;w[v++]=pe}else if(pe<=2047){if(v+1>=P)break;w[v++]=192|pe>>6,w[v++]=128|pe&63}else if(pe<=65535){if(v+2>=P)break;w[v++]=224|pe>>12,w[v++]=128|pe>>6&63,w[v++]=128|pe&63}else{if(v+3>=P)break;w[v++]=240|pe>>18,w[v++]=128|pe>>12&63,w[v++]=128|pe>>6&63,w[v++]=128|pe&63,V++}}return w[v]=0,v-Y},xe,Zt,lt={},Ze=()=>{if(!en){var y={USER:\"web_user\",LOGNAME:\"web_user\",PATH:\"/\",PWD:\"/\",HOME:\"/home/web_user\",LANG:(globalThis.navigator?.language??\"C\").replace(\"-\",\"_\")+\".UTF-8\",_:o},v;for(v in lt)lt[v]===void 0?delete y[v]:y[v]=lt[v];var P=[];for(v in y)P.push(`${v}=${y[v]}`);en=P}return en},en,ht=y=>{for(var v=0,P=0;P<y.length;++P){var w=y.charCodeAt(P);w<=127?v++:w<=2047?v+=2:w>=55296&&w<=57343?(v+=4,++P):v+=3}return v},En=[null,[],[]],Ut=(y,v,P,w)=>{var Y={string:K=>{var ee=0;if(K!=null&&K!==0){ee=ht(K)+1;var he=Vn(ee);Et(K,he,ee),ee=he}return ee},array:K=>{var ee=Vn(K.length);return X.set(K,ee),ee}};y=t[\"_\"+y];var V=[],pe=0;if(w)for(var we=0;we<w.length;we++){var se=Y[P[we]];se?(pe||=Ae(),V[we]=se(w[we])):V[we]=w[we]}return P=y(...V),P=(function(K){return pe&&wr(pe),v===\"string\"?Ke(K):v===\"boolean\"?!!K:K})(P)};t.wasmMemory?Ge=t.wasmMemory:Ge=new WebAssembly.Memory({initial:(t.INITIAL_MEMORY||16777216)/65536,maximum:32768}),x(),t.noExitRuntime&&(ue=t.noExitRuntime),t.print&&(f=t.print),t.printErr&&(m=t.printErr),t.thisProgram&&(o=t.thisProgram);var Ct=t.preInit;if(Ct)for(typeof Ct==\"function\"&&(t.preInit=Ct=[Ct]);Ct.length>0;)Ct.shift()();t.cwrap=(y,v,P,w)=>{var Y=!P||P.every(V=>V===\"number\"||V===\"boolean\");return v!==\"string\"&&Y&&!w?t[\"_\"+y]:(...V)=>Ut(y,v,P,V)},t.UTF8ToString=Ke,t.stringToUTF8=(y,v,P)=>Et(y,v,P),t.lengthBytesUTF8=ht;var Gn,wr,Vn,Ae,kr={b:(y,v,P,w)=>R(`Assertion failed: ${Ke(y)}, at: `+[v?Ke(v):\"unknown filename\",P,w?Ke(w):\"unknown function\"]),r:()=>R(\"\"),l:()=>{ue=!1,Xe=0},m:function(y,v){if(y=y<-9007199254740992||y>9007199254740992?NaN:Number(y),y=new Date(y*1e3),isNaN(y.getTime()))return 1;Se[v>>2]=y.getSeconds(),Se[v+4>>2]=y.getMinutes(),Se[v+8>>2]=y.getHours(),Se[v+12>>2]=y.getDate(),Se[v+16>>2]=y.getMonth(),Se[v+20>>2]=y.getFullYear()-1900,Se[v+24>>2]=y.getDay();var P=y.getFullYear();Se[v+28>>2]=(P%4!==0||P%100===0&&P%400!==0?Tt:Ve)[y.getMonth()]+y.getDate()-1|0,Se[v+36>>2]=-(y.getTimezoneOffset()*60),P=new Date(y.getFullYear(),6,1).getTimezoneOffset();var w=new Date(y.getFullYear(),0,1).getTimezoneOffset();return Se[v+32>>2]=(P!=w&&y.getTimezoneOffset()==Math.min(w,P))|0,0},j:(y,v)=>{if(je[y]&&(clearTimeout(je[y].id),delete je[y]),!v)return 0;var P=setTimeout(()=>{delete je[y];var w=[y,performance.now()],Y=Gn;if(!g)try{Y(...w)}catch(V){mt(V)}finally{if(!(ue||Xe>0))try{S=w=S,Wt(w)}catch(V){mt(V)}}},v);return je[y]={id:P,Ra:v},0},n:(y,v,P,w)=>{var Y=new Date().getFullYear(),V=new Date(Y,0,1).getTimezoneOffset();Y=new Date(Y,6,1).getTimezoneOffset(),xe[y>>2]=Math.max(V,Y)*60,Se[v>>2]=+(V!=Y),v=pe=>{var we=Math.abs(pe);return`UTC${pe>=0?\"-\":\"+\"}${String(Math.floor(we/60)).padStart(2,\"0\")}${String(we%60).padStart(2,\"0\")}`},y=v(V),v=v(Y),Y<V?(Et(y,P,17),Et(v,w,17)):(Et(y,w,17),Et(v,P,17))},q:function(y,v,P){return y>=0&&y<=3?(Zt[P>>3]=BigInt(Math.round((y===0?Date.now():performance.now())*1e6)),0):28},p:()=>Date.now(),k:y=>{var v=Ye.length;if(y>>>=0,y>2147483648)return!1;for(var P=1;P<=4;P*=2){var w=v*(1+.2/P);w=Math.min(w,y+100663296);e:{w=(Math.min(2147483648,Math.ceil(Math.max(y,w)/65536)*65536)-Ge.buffer.byteLength+65535)/65536|0;try{Ge.grow(w),x();var Y=1;break e}catch{}Y=void 0}if(Y)return!0}return!1},e:(y,v)=>{var P=0,w=0,Y;for(Y of Ze()){var V=v+P;xe[y+w>>2]=V,P+=Et(Y,V,1/0)+1,w+=4}return 0},f:(y,v)=>{var P=Ze();xe[y>>2]=P.length,y=0;for(var w of P)y+=ht(w)+1;return xe[v>>2]=y,0},d:()=>52,o:function(){return 70},c:(y,v,P,w)=>{for(var Y=0,V=0;V<P;V++){var pe=xe[v>>2],we=xe[v+4>>2];v+=8;for(var se=0;se<we;se++){var K=y,ee=Ye[pe+se],he=En[K];ee&&ee!==10?he.push(ee):(K=K===1?f:m,ee=Je(he,0),ee=Ce.decode(he.buffer?he.subarray(0,ee):new Uint8Array(he.slice(0,ee))),K(ee),he.length=0)}Y+=we}return xe[w>>2]=Y,0},a:Ge,s:Wt,t:function(y,v,P,w,Y){return t.callbacks.callFunction(void 0,y,v,P,w,Y)},i:function(y){return t.callbacks.shouldInterrupt(void 0,y)},h:function(y,v,P){return P=Ke(P),t.callbacks.loadModuleSource(void 0,y,v,P)},g:function(y,v,P,w){return P=Ke(P),w=Ke(w),t.callbacks.normalizeModule(void 0,y,v,P,w)},u:function(y,v){t.callbacks.freeHostRef(void 0,y,v)}},gt;return gt=await(async function(){function y(w){return w=gt=w.exports,t._malloc=w.w,t._QTS_Throw=w.x,t._QTS_NewError=w.y,t._QTS_RuntimeSetMemoryLimit=w.z,t._QTS_RuntimeComputeMemoryUsage=w.A,t._QTS_RuntimeDumpMemoryUsage=w.B,t._QTS_RecoverableLeakCheck=w.C,t._QTS_BuildIsSanitizeLeak=w.D,t._QTS_RuntimeSetMaxStackSize=w.E,t._QTS_GetUndefined=w.F,t._QTS_GetNull=w.G,t._QTS_GetFalse=w.H,t._QTS_GetTrue=w.I,t._QTS_NewHostRef=w.J,t._QTS_GetHostRefId=w.K,t._QTS_NewRuntime=w.L,t._QTS_FreeRuntime=w.M,t._free=w.N,t._QTS_NewContext=w.O,t._QTS_FreeContext=w.P,t._QTS_FreeValuePointer=w.Q,t._QTS_FreeValuePointerRuntime=w.R,t._QTS_FreeVoidPointer=w.S,t._QTS_FreeCString=w.T,t._QTS_DupValuePointer=w.U,t._QTS_NewObject=w.V,t._QTS_NewObjectProto=w.W,t._QTS_NewArray=w.X,t._QTS_NewArrayBuffer=w.Y,t._QTS_NewFloat64=w.Z,t._QTS_GetFloat64=w._,t._QTS_NewString=w.$,t._QTS_GetString=w.aa,t._QTS_GetArrayBuffer=w.ba,t._QTS_GetArrayBufferLength=w.ca,t._QTS_NewSymbol=w.da,t._QTS_GetSymbolDescriptionOrKey=w.ea,t._QTS_IsGlobalSymbol=w.fa,t._QTS_IsJobPending=w.ga,t._QTS_ExecutePendingJob=w.ha,t._QTS_GetProp=w.ia,t._QTS_GetPropNumber=w.ja,t._QTS_SetProp=w.ka,t._QTS_DefineProp=w.la,t._QTS_GetOwnPropertyNames=w.ma,t._QTS_Call=w.na,t._QTS_ResolveException=w.oa,t._QTS_Dump=w.pa,t._QTS_Eval=w.qa,t._QTS_GetModuleNamespace=w.ra,t._QTS_Typeof=w.sa,t._QTS_GetLength=w.ta,t._QTS_IsEqual=w.ua,t._QTS_GetGlobalObject=w.va,t._QTS_NewPromiseCapability=w.wa,t._QTS_PromiseState=w.xa,t._QTS_PromiseResult=w.ya,t._QTS_TestStringArg=w.za,t._QTS_GetDebugLogEnabled=w.Aa,t._QTS_SetDebugLogEnabled=w.Ba,t._QTS_BuildIsDebug=w.Ca,t._QTS_BuildIsAsyncify=w.Da,t._QTS_NewFunction=w.Ea,t._QTS_ArgvGetJSValueConstPointer=w.Fa,t._QTS_RuntimeEnableInterruptHandler=w.Ga,t._QTS_RuntimeDisableInterruptHandler=w.Ha,t._QTS_RuntimeEnableModuleLoader=w.Ia,t._QTS_RuntimeDisableModuleLoader=w.Ja,t._QTS_bjson_encode=w.Ka,t._QTS_bjson_decode=w.La,Gn=w.Ma,wr=w.Na,Vn=w.Oa,Ae=w.Pa,gt}var v={a:kr},P=t.instantiateWasm;return P?new Promise(w=>{P(v,Y=>w(y(Y)))}):(H??=t.locateFile?t.locateFile?t.locateFile(\"emscripten-module.wasm\",l):l+\"emscripten-module.wasm\":new URL(\"emscripten-module.wasm\",dd.url).href,(function(w){return y(w.instance)})(await ce(v)))})(),await(async function(){L();var y=t.setStatus;y&&(y(\"Running...\"),await new Promise(v=>setTimeout(v,1)),setTimeout(y,1,\"\")),g||(gt.v(),t.onRuntimeInitialized?.(),Q())})(),t}var dd,ob,md=mi(()=>{dd={};ob=ib});var jf=Nr(Ka=>{var Vf=\"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/\".split(\"\");Ka.encode=function(e){if(0<=e&&e<Vf.length)return Vf[e];throw new TypeError(\"Must be between 0 and 63: \"+e)};Ka.decode=function(e){var t=65,n=90,r=97,i=122,o=48,s=57,l=43,c=47,p=26,f=52;return t<=e&&e<=n?e-t:r<=e&&e<=i?e-r+p:o<=e&&e<=s?e-o+f:e==l?62:e==c?63:-1}});var Kf=Nr(Za=>{var $f=jf(),Xa=5,qf=1<<Xa,Jf=qf-1,Yf=qf;function Mx(e){return e<0?(-e<<1)+1:(e<<1)+0}function Nx(e){var t=(e&1)===1,n=e>>1;return t?-n:n}Za.encode=function(t){var n=\"\",r,i=Mx(t);do r=i&Jf,i>>>=Xa,i>0&&(r|=Yf),n+=$f.encode(r);while(i>0);return n};Za.decode=function(t,n,r){var i=t.length,o=0,s=0,l,c;do{if(n>=i)throw new Error(\"Expected more digits in base 64 VLQ value.\");if(c=$f.decode(t.charCodeAt(n++)),c===-1)throw new Error(\"Invalid base64 digit: \"+t.charAt(n-1));l=!!(c&Yf),c&=Jf,o=o+(c<<s),s+=Xa}while(l);r.value=Nx(o),r.rest=n}});var Zo=Nr(Me=>{function Ix(e,t,n){if(t in e)return e[t];if(arguments.length===3)return n;throw new Error('\"'+t+'\" is a required argument.')}Me.getArg=Ix;var Xf=/^(?:([\\w+\\-.]+):)?\\/\\/(?:(\\w+:\\w+)@)?([\\w.-]*)(?::(\\d+))?(.*)$/,Ox=/^data:.+\\,.+$/;function Li(e){var t=e.match(Xf);return t?{scheme:t[1],auth:t[2],host:t[3],port:t[4],path:t[5]}:null}Me.urlParse=Li;function Vr(e){var t=\"\";return e.scheme&&(t+=e.scheme+\":\"),t+=\"//\",e.auth&&(t+=e.auth+\"@\"),e.host&&(t+=e.host),e.port&&(t+=\":\"+e.port),e.path&&(t+=e.path),t}Me.urlGenerate=Vr;var Dx=32;function Fx(e){var t=[];return function(n){for(var r=0;r<t.length;r++)if(t[r].input===n){var i=t[0];return t[0]=t[r],t[r]=i,t[0].result}var o=e(n);return t.unshift({input:n,result:o}),t.length>Dx&&t.pop(),o}}var el=Fx(function(t){var n=t,r=Li(t);if(r){if(!r.path)return t;n=r.path}for(var i=Me.isAbsolute(n),o=[],s=0,l=0;;)if(s=l,l=n.indexOf(\"/\",s),l===-1){o.push(n.slice(s));break}else for(o.push(n.slice(s,l));l<n.length&&n[l]===\"/\";)l++;for(var c,p=0,l=o.length-1;l>=0;l--)c=o[l],c===\".\"?o.splice(l,1):c===\"..\"?p++:p>0&&(c===\"\"?(o.splice(l+1,p),p=0):(o.splice(l,2),p--));return n=o.join(\"/\"),n===\"\"&&(n=i?\"/\":\".\"),r?(r.path=n,Vr(r)):n});Me.normalize=el;function Zf(e,t){e===\"\"&&(e=\".\"),t===\"\"&&(t=\".\");var n=Li(t),r=Li(e);if(r&&(e=r.path||\"/\"),n&&!n.scheme)return r&&(n.scheme=r.scheme),Vr(n);if(n||t.match(Ox))return t;if(r&&!r.host&&!r.path)return r.host=t,Vr(r);var i=t.charAt(0)===\"/\"?t:el(e.replace(/\\/+$/,\"\")+\"/\"+t);return r?(r.path=i,Vr(r)):i}Me.join=Zf;Me.isAbsolute=function(e){return e.charAt(0)===\"/\"||Xf.test(e)};function zx(e,t){e===\"\"&&(e=\".\"),e=e.replace(/\\/$/,\"\");for(var n=0;t.indexOf(e+\"/\")!==0;){var r=e.lastIndexOf(\"/\");if(r<0||(e=e.slice(0,r),e.match(/^([^\\/]+:\\/)?\\/*$/)))return t;++n}return Array(n+1).join(\"../\")+t.substr(e.length+1)}Me.relative=zx;var em=(function(){var e=Object.create(null);return!(\"__proto__\"in e)})();function tm(e){return e}function Bx(e){return nm(e)?\"$\"+e:e}Me.toSetString=em?tm:Bx;function Qx(e){return nm(e)?e.slice(1):e}Me.fromSetString=em?tm:Qx;function nm(e){if(!e)return!1;var t=e.length;if(t<9||e.charCodeAt(t-1)!==95||e.charCodeAt(t-2)!==95||e.charCodeAt(t-3)!==111||e.charCodeAt(t-4)!==116||e.charCodeAt(t-5)!==111||e.charCodeAt(t-6)!==114||e.charCodeAt(t-7)!==112||e.charCodeAt(t-8)!==95||e.charCodeAt(t-9)!==95)return!1;for(var n=t-10;n>=0;n--)if(e.charCodeAt(n)!==36)return!1;return!0}function Hx(e,t,n){var r=hn(e.source,t.source);return r!==0||(r=e.originalLine-t.originalLine,r!==0)||(r=e.originalColumn-t.originalColumn,r!==0||n)||(r=e.generatedColumn-t.generatedColumn,r!==0)||(r=e.generatedLine-t.generatedLine,r!==0)?r:hn(e.name,t.name)}Me.compareByOriginalPositions=Hx;function Wx(e,t,n){var r;return r=e.originalLine-t.originalLine,r!==0||(r=e.originalColumn-t.originalColumn,r!==0||n)||(r=e.generatedColumn-t.generatedColumn,r!==0)||(r=e.generatedLine-t.generatedLine,r!==0)?r:hn(e.name,t.name)}Me.compareByOriginalPositionsNoSource=Wx;function Ux(e,t,n){var r=e.generatedLine-t.generatedLine;return r!==0||(r=e.generatedColumn-t.generatedColumn,r!==0||n)||(r=hn(e.source,t.source),r!==0)||(r=e.originalLine-t.originalLine,r!==0)||(r=e.originalColumn-t.originalColumn,r!==0)?r:hn(e.name,t.name)}Me.compareByGeneratedPositionsDeflated=Ux;function Gx(e,t,n){var r=e.generatedColumn-t.generatedColumn;return r!==0||n||(r=hn(e.source,t.source),r!==0)||(r=e.originalLine-t.originalLine,r!==0)||(r=e.originalColumn-t.originalColumn,r!==0)?r:hn(e.name,t.name)}Me.compareByGeneratedPositionsDeflatedNoLine=Gx;function hn(e,t){return e===t?0:e===null?1:t===null?-1:e>t?1:-1}function Vx(e,t){var n=e.generatedLine-t.generatedLine;return n!==0||(n=e.generatedColumn-t.generatedColumn,n!==0)||(n=hn(e.source,t.source),n!==0)||(n=e.originalLine-t.originalLine,n!==0)||(n=e.originalColumn-t.originalColumn,n!==0)?n:hn(e.name,t.name)}Me.compareByGeneratedPositionsInflated=Vx;function jx(e){return JSON.parse(e.replace(/^\\)]}'[^\\n]*\\n/,\"\"))}Me.parseSourceMapInput=jx;function $x(e,t,n){if(t=t||\"\",e&&(e[e.length-1]!==\"/\"&&t[0]!==\"/\"&&(e+=\"/\"),t=e+t),n){var r=Li(n);if(!r)throw new Error(\"sourceMapURL could not be parsed\");if(r.path){var i=r.path.lastIndexOf(\"/\");i>=0&&(r.path=r.path.substring(0,i+1))}t=Zf(Vr(r),t)}return el(t)}Me.computeSourceURL=$x});var im=Nr(rm=>{var tl=Zo(),nl=Object.prototype.hasOwnProperty,fr=typeof Map<\"u\";function gn(){this._array=[],this._set=fr?new Map:Object.create(null)}gn.fromArray=function(t,n){for(var r=new gn,i=0,o=t.length;i<o;i++)r.add(t[i],n);return r};gn.prototype.size=function(){return fr?this._set.size:Object.getOwnPropertyNames(this._set).length};gn.prototype.add=function(t,n){var r=fr?t:tl.toSetString(t),i=fr?this.has(t):nl.call(this._set,r),o=this._array.length;(!i||n)&&this._array.push(t),i||(fr?this._set.set(t,o):this._set[r]=o)};gn.prototype.has=function(t){if(fr)return this._set.has(t);var n=tl.toSetString(t);return nl.call(this._set,n)};gn.prototype.indexOf=function(t){if(fr){var n=this._set.get(t);if(n>=0)return n}else{var r=tl.toSetString(t);if(nl.call(this._set,r))return this._set[r]}throw new Error('\"'+t+'\" is not in the set.')};gn.prototype.at=function(t){if(t>=0&&t<this._array.length)return this._array[t];throw new Error(\"No element indexed by \"+t)};gn.prototype.toArray=function(){return this._array.slice()};rm.ArraySet=gn});var am=Nr(sm=>{var om=Zo();function qx(e,t){var n=e.generatedLine,r=t.generatedLine,i=e.generatedColumn,o=t.generatedColumn;return r>n||r==n&&o>=i||om.compareByGeneratedPositionsInflated(e,t)<=0}function es(){this._array=[],this._sorted=!0,this._last={generatedLine:-1,generatedColumn:0}}es.prototype.unsortedForEach=function(t,n){this._array.forEach(t,n)};es.prototype.add=function(t){qx(this._last,t)?(this._last=t,this._array.push(t)):(this._sorted=!1,this._array.push(t))};es.prototype.toArray=function(){return this._sorted||(this._array.sort(om.compareByGeneratedPositionsInflated),this._sorted=!0),this._array};sm.MappingList=es});var cm=Nr(lm=>{var Pi=Kf(),Te=Zo(),ts=im().ArraySet,Jx=am().MappingList;function kt(e){e||(e={}),this._file=Te.getArg(e,\"file\",null),this._sourceRoot=Te.getArg(e,\"sourceRoot\",null),this._skipValidation=Te.getArg(e,\"skipValidation\",!1),this._ignoreInvalidMapping=Te.getArg(e,\"ignoreInvalidMapping\",!1),this._sources=new ts,this._names=new ts,this._mappings=new Jx,this._sourcesContents=null}kt.prototype._version=3;kt.fromSourceMap=function(t,n){var r=t.sourceRoot,i=new kt(Object.assign(n||{},{file:t.file,sourceRoot:r}));return t.eachMapping(function(o){var s={generated:{line:o.generatedLine,column:o.generatedColumn}};o.source!=null&&(s.source=o.source,r!=null&&(s.source=Te.relative(r,s.source)),s.original={line:o.originalLine,column:o.originalColumn},o.name!=null&&(s.name=o.name)),i.addMapping(s)}),t.sources.forEach(function(o){var s=o;r!==null&&(s=Te.relative(r,o)),i._sources.has(s)||i._sources.add(s);var l=t.sourceContentFor(o);l!=null&&i.setSourceContent(o,l)}),i};kt.prototype.addMapping=function(t){var n=Te.getArg(t,\"generated\"),r=Te.getArg(t,\"original\",null),i=Te.getArg(t,\"source\",null),o=Te.getArg(t,\"name\",null);!this._skipValidation&&this._validateMapping(n,r,i,o)===!1||(i!=null&&(i=String(i),this._sources.has(i)||this._sources.add(i)),o!=null&&(o=String(o),this._names.has(o)||this._names.add(o)),this._mappings.add({generatedLine:n.line,generatedColumn:n.column,originalLine:r!=null&&r.line,originalColumn:r!=null&&r.column,source:i,name:o}))};kt.prototype.setSourceContent=function(t,n){var r=t;this._sourceRoot!=null&&(r=Te.relative(this._sourceRoot,r)),n!=null?(this._sourcesContents||(this._sourcesContents=Object.create(null)),this._sourcesContents[Te.toSetString(r)]=n):this._sourcesContents&&(delete this._sourcesContents[Te.toSetString(r)],Object.keys(this._sourcesContents).length===0&&(this._sourcesContents=null))};kt.prototype.applySourceMap=function(t,n,r){var i=n;if(n==null){if(t.file==null)throw new Error(`SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, or the source map's \"file\" property. Both were omitted.`);i=t.file}var o=this._sourceRoot;o!=null&&(i=Te.relative(o,i));var s=new ts,l=new ts;this._mappings.unsortedForEach(function(c){if(c.source===i&&c.originalLine!=null){var p=t.originalPositionFor({line:c.originalLine,column:c.originalColumn});p.source!=null&&(c.source=p.source,r!=null&&(c.source=Te.join(r,c.source)),o!=null&&(c.source=Te.relative(o,c.source)),c.originalLine=p.line,c.originalColumn=p.column,p.name!=null&&(c.name=p.name))}var f=c.source;f!=null&&!s.has(f)&&s.add(f);var m=c.name;m!=null&&!l.has(m)&&l.add(m)},this),this._sources=s,this._names=l,t.sources.forEach(function(c){var p=t.sourceContentFor(c);p!=null&&(r!=null&&(c=Te.join(r,c)),o!=null&&(c=Te.relative(o,c)),this.setSourceContent(c,p))},this)};kt.prototype._validateMapping=function(t,n,r,i){if(n&&typeof n.line!=\"number\"&&typeof n.column!=\"number\"){var o=\"original.line and original.column are not numbers -- you probably meant to omit the original mapping entirely and only map the generated position. If so, pass null for the original mapping instead of an object with empty or null values.\";if(this._ignoreInvalidMapping)return typeof console<\"u\"&&console.warn&&console.warn(o),!1;throw new Error(o)}if(!(t&&\"line\"in t&&\"column\"in t&&t.line>0&&t.column>=0&&!n&&!r&&!i)){if(t&&\"line\"in t&&\"column\"in t&&n&&\"line\"in n&&\"column\"in n&&t.line>0&&t.column>=0&&n.line>0&&n.column>=0&&r)return;var o=\"Invalid mapping: \"+JSON.stringify({generated:t,source:r,original:n,name:i});if(this._ignoreInvalidMapping)return typeof console<\"u\"&&console.warn&&console.warn(o),!1;throw new Error(o)}};kt.prototype._serializeMappings=function(){for(var t=0,n=1,r=0,i=0,o=0,s=0,l=\"\",c,p,f,m,g=this._mappings.toArray(),S=0,x=g.length;S<x;S++){if(p=g[S],c=\"\",p.generatedLine!==n){t=0;var L=p.generatedLine-n;c+=L===1?\";\":\";\".repeat(L),n=p.generatedLine}else if(S>0){if(!Te.compareByGeneratedPositionsInflated(p,g[S-1]))continue;c+=\",\"}c+=Pi.encode(p.generatedColumn-t),t=p.generatedColumn,p.source!=null&&(m=this._sources.indexOf(p.source),c+=Pi.encode(m-s),s=m,c+=Pi.encode(p.originalLine-1-i),i=p.originalLine-1,c+=Pi.encode(p.originalColumn-r),r=p.originalColumn,p.name!=null&&(f=this._names.indexOf(p.name),c+=Pi.encode(f-o),o=f)),l+=c}return l};kt.prototype._generateSourcesContent=function(t,n){return t.map(function(r){if(!this._sourcesContents)return null;n!=null&&(r=Te.relative(n,r));var i=Te.toSetString(r);return Object.prototype.hasOwnProperty.call(this._sourcesContents,i)?this._sourcesContents[i]:null},this)};kt.prototype.toJSON=function(){var t={version:this._version,sources:this._sources.toArray(),names:this._names.toArray(),mappings:this._serializeMappings()};return this._file!=null&&(t.file=this._file),this._sourceRoot!=null&&(t.sourceRoot=this._sourceRoot),this._sourcesContents&&(t.sourcesContent=this._generateSourcesContent(t.sources,t.sourceRoot)),t};kt.prototype.toString=function(){return JSON.stringify(this.toJSON())};lm.SourceMapGenerator=kt});ba();uo();async function ld(e){let t=go(await e),[n,r,{QuickJSWASMModule:i}]=await Promise.all([t.importModuleLoader().then(go),t.importFFI(),Promise.resolve().then(()=>(ad(),sd)).then(go)]),o=await n();o.type=\"sync\";let s=new r(o);return new i(o,s)}function go(e){return e&&\"default\"in e&&e.default?e.default&&\"default\"in e.default&&e.default.default?e.default.default:e.default:e}function cd(e,t){return{...e,async importModuleLoader(){let n=go(await e.importModuleLoader());return async function(){let r=t.emscriptenModule?{...t.emscriptenModule}:{},i=t.log??((...m)=>or(\"newVariant moduleLoader:\",...m)),o=(m,g)=>(i(...m,g),g),s=m=>typeof m==\"function\"?m():m;(t.wasmLocation||t.wasmSourceMapLocation||t.locateFile)&&(r.locateFile=(m,g)=>{let S={fileName:m,relativeTo:g};if(m.endsWith(\".wasm\")&&t.wasmLocation!==void 0)return o([\"locateFile .wasm: provide wasmLocation\",S],t.wasmLocation);if(m.endsWith(\".map\")){if(t.wasmSourceMapLocation!==void 0)return o([\"locateFile .map: provide wasmSourceMapLocation\",S],t.wasmSourceMapLocation);if(t.wasmLocation&&!t.locateFile)return o([\"locateFile .map: infer from wasmLocation\",S],t.wasmLocation+\".map\")}return t.locateFile?o([\"locateFile: use provided fn\",S],t.locateFile(m,g)):o([\"locateFile: unhandled, passthrough\",S],m)}),t.wasmBinary&&(r.wasmBinary=await s(t.wasmBinary)),t.wasmMemory&&(r.wasmMemory=await s(t.wasmMemory));let l=t.wasmModule,c;l&&(r.instantiateWasm=async(m,g)=>{c??(c=Promise.resolve(s(l)));let S=await c;if(!S)throw new ho(`options.wasmModule returned ${String(S)}`);let x=await WebAssembly.instantiate(S,m);return g(x),x.exports}),r.monitorRunDependencies=m=>{i(\"monitorRunDependencies:\",m)},r.quickjsEmscriptenInit=()=>nb(i);let p=n(r),f=r.quickjsEmscriptenInit?.(i);if(l&&f?.receiveWasmOffsetConverter&&!f.existingWasmOffsetConverter){let m=await s(t.wasmBinary)??new ArrayBuffer(0);c??(c=Promise.resolve(s(l)));let g=await c;if(!g)throw new ho(`options.wasmModule returned ${String(g)}`);f.receiveWasmOffsetConverter(m,g)}if(f?.receiveSourceMapJSON){let m=await s(t.wasmSourceMapData);typeof m==\"string\"?f.receiveSourceMapJSON(JSON.parse(m)):m?f.receiveSourceMapJSON(m):f.receiveSourceMapJSON({version:3,names:[],sources:[],mappings:\"\"})}return p}}}}function nb(e){let t=\"mock called, emscripten module may not be initialized yet\";return{mock:!0,removeRunDependency(n){e(`${t}: removeRunDependency called:`,n)},receiveSourceMapJSON(n){e(`${t}: receiveSourceMapJSON called:`,n)},WasmOffsetConverter:void 0,receiveWasmOffsetConverter(n,r){e(`${t}: receiveWasmOffsetConverter called:`,n,r)}}}var sb={type:\"sync\",importFFI:()=>Promise.resolve().then(()=>(pd(),ud)).then(e=>e.QuickJSFFI),importModuleLoader:()=>Promise.resolve().then(()=>(md(),fd)).then(e=>e.default)},hd=sb;var gd=\"\";var ab=new Set([\"timer\",\"frame\",\"viewport\",\"resize\",\"theme\",\"bridge\"]),yd=128,bd=1e3;function xd(e,t){return e>yd?\"count\":t>bd?\"time\":null}function xa(e,t){return e===\"count\"?`Layout query limit exceeded: more than ${yd} layout queries in one ${t} task`:`Layout query limit exceeded: host queries blocked the renderer for more than ${bd} ms in one ${t} task`}var lb=.025,cb=.002;function wd(e,t){return e*lb+t*cb}var Ir=class{constructor(t){this.cfg=t;this.bucketMs=Math.max(1,t.cpuQuotaWindowMs/10);for(let n=0;n<10;n++)this.buckets.push({start:-1/0,ms:0})}cfg;bucketMs;buckets=[];debtMs=0;settled=-1/0;throttledSince=-1;lastThrottleAt=-1;slot(t){let n=this.buckets[(t%10+10)%10],r=t*this.bucketMs;return n.start!==r&&(n.start=r,n.ms=0),n}windowAt(t){let n=(t-10+1)*this.bucketMs,r=0;for(let i of this.buckets)i.start>=n&&(r+=i.ms);return r}settle(t){let n=Math.floor(t/this.bucketMs);if(this.debtMs>0){let r=Math.min(n,this.settled+20);for(let i=this.settled+1;i<=r&&this.debtMs>0;i++){let o=Math.min(this.debtMs,this.cfg.cpuQuotaMs-this.windowAt(i));o>0&&(this.slot(i).ms+=o,this.debtMs-=o)}r<n&&(this.debtMs=0)}n>this.settled&&(this.settled=n)}record(t,n,r){this.settle(r);let i=Math.floor(r/this.bucketMs),o=this.slot(i);if(!(n>0))return;let s=Math.min(n,Math.max(0,this.cfg.cpuQuotaMs-this.windowAt(i)-this.debtMs));o.ms+=s,this.debtMs=Math.min(this.cfg.cpuQuotaMs,this.debtMs+n-s)}used(t){return this.settle(t),this.windowAt(Math.floor(t/this.bucketMs))+this.debtMs}decide(t,n){let r=this.cfg.cpuQuotaMs-this.used(n);if(ab.has(t)&&r<=0){(this.throttledSince<0||n-this.lastThrottleAt>this.cfg.cpuQuotaWindowMs)&&(this.throttledSince=n),this.lastThrottleAt=n;let i=(Math.floor(n/this.bucketMs)-10+1)*this.bucketMs,o=1/0;for(let l of this.buckets)l.ms>0&&l.start>=i&&l.start<o&&(o=l.start);let s=o===1/0?n+this.bucketMs:o+this.cfg.cpuQuotaWindowMs;return s<=n&&(s=n+this.bucketMs),{run:!1,retryAt:s}}return{run:!0,sliceMs:this.cfg.cpuLimitMs}}throttledFor(t){return this.throttledSince<0||t-this.lastThrottleAt>this.cfg.cpuQuotaWindowMs?0:t-this.throttledSince}shouldKill(t){return this.cfg.cpuKillAfterMs>0&&this.throttledFor(t)>=this.cfg.cpuKillAfterMs}};var ub={elements:{html:\"keep\",head:\"keep\",body:\"keep\",div:\"keep\",span:\"keep\",p:\"keep\",a:\"keep\",b:\"keep\",i:\"keep\",u:\"keep\",s:\"keep\",em:\"keep\",strong:\"keep\",small:\"keep\",sub:\"keep\",sup:\"keep\",mark:\"keep\",code:\"keep\",pre:\"keep\",kbd:\"keep\",samp:\"keep\",var:\"keep\",abbr:\"keep\",cite:\"keep\",q:\"keep\",blockquote:\"keep\",del:\"keep\",ins:\"keep\",dfn:\"keep\",time:\"keep\",data:\"keep\",address:\"keep\",br:\"keep\",hr:\"keep\",wbr:\"keep\",h1:\"keep\",h2:\"keep\",h3:\"keep\",h4:\"keep\",h5:\"keep\",h6:\"keep\",header:\"keep\",footer:\"keep\",main:\"keep\",nav:\"keep\",section:\"keep\",article:\"keep\",aside:\"keep\",hgroup:\"keep\",search:\"keep\",ul:\"keep\",ol:\"keep\",li:\"keep\",dl:\"keep\",dt:\"keep\",dd:\"keep\",menu:\"keep\",table:\"keep\",thead:\"keep\",tbody:\"keep\",tfoot:\"keep\",tr:\"keep\",td:\"keep\",th:\"keep\",caption:\"keep\",colgroup:\"keep\",col:\"keep\",button:\"keep\",details:\"keep\",summary:\"keep\",figure:\"keep\",figcaption:\"keep\",picture:\"keep\",img:\"keep\",canvas:\"keep\",ruby:\"span\",rt:\"span\",rp:\"span\",bdi:\"span\",bdo:\"span\",font:\"span\",big:\"span\",tt:\"span\",strike:\"span\",nobr:\"span\",label:\"span\",legend:\"span\",output:\"span\",center:\"div\",form:\"div\",dialog:\"div\",input:\"drop\",select:\"drop\",option:\"drop\",optgroup:\"drop\",textarea:\"drop\",datalist:\"drop\",fieldset:\"drop\",progress:\"drop\",meter:\"drop\",script:\"drop\",iframe:\"drop\",frame:\"drop\",frameset:\"drop\",object:\"drop\",embed:\"drop\",link:\"drop\",meta:\"drop\",base:\"drop\",portal:\"drop\",noscript:\"drop\",set:\"drop\",title:\"drop\",template:\"drop\",applet:\"drop\",param:\"drop\",noembed:\"drop\",noframes:\"drop\",plaintext:\"drop\",xmp:\"drop\",listing:\"drop\",slot:\"drop\",track:\"drop\",area:\"drop\",map:\"drop\",math:\"drop\",metadata:\"drop\",fencedframe:\"drop\",audio:\"drop\",video:\"drop\",source:\"drop\"},unknown:\"span\",attributes:[\"class\",\"id\",\"title\",\"lang\",\"dir\",\"hidden\",\"role\",\"colspan\",\"rowspan\",\"span\",\"width\",\"height\",\"alt\",\"open\",\"start\",\"reversed\",\"datetime\",\"value\",\"type\",\"disabled\"],attributePrefixes:[\"data-\",\"aria-\"]},pb={elements:[\"svg\",\"g\",\"path\",\"rect\",\"circle\",\"ellipse\",\"line\",\"polyline\",\"polygon\",\"text\",\"tspan\",\"defs\",\"symbol\",\"use\",\"linearGradient\",\"radialGradient\",\"stop\",\"title\",\"desc\",\"a\"],attributes:[\"class\",\"id\",\"lang\",\"role\",\"viewBox\",\"preserveAspectRatio\",\"x\",\"y\",\"x1\",\"y1\",\"x2\",\"y2\",\"cx\",\"cy\",\"r\",\"rx\",\"ry\",\"d\",\"points\",\"dx\",\"dy\",\"rotate\",\"transform\",\"width\",\"height\",\"fill\",\"fill-opacity\",\"fill-rule\",\"stroke\",\"stroke-width\",\"stroke-opacity\",\"stroke-linecap\",\"stroke-linejoin\",\"stroke-dasharray\",\"stroke-dashoffset\",\"stroke-miterlimit\",\"opacity\",\"color\",\"display\",\"visibility\",\"overflow\",\"text-anchor\",\"dominant-baseline\",\"alignment-baseline\",\"baseline-shift\",\"font-family\",\"font-size\",\"font-weight\",\"font-style\",\"letter-spacing\",\"word-spacing\",\"text-decoration\",\"gradientUnits\",\"gradientTransform\",\"spreadMethod\",\"fx\",\"fy\",\"fr\",\"offset\",\"stop-color\",\"stop-opacity\",\"pointer-events\",\"shape-rendering\",\"text-rendering\",\"vector-effect\",\"paint-order\",\"cursor\",\"pathLength\",\"version\",\"xml:space\",\"xml:lang\"]},gi=[\"image/png\",\"image/jpeg\",\"image/jpg\",\"image/gif\",\"image/webp\"],wa=[\"click\",\"pointerdown\",\"pointerup\",\"pointermove\",\"pointerenter\",\"pointerleave\",\"pointerover\",\"pointerout\",\"pointercancel\",\"dblclick\",\"contextmenu\",\"mousedown\",\"mouseup\",\"mousemove\",\"mouseenter\",\"mouseleave\",\"mouseover\",\"mouseout\",\"load\",\"error\",\"toggle\",\"animationstart\",\"animationend\",\"animationiteration\",\"transitionend\"],db=[\"setPointerCapture\",\"releasePointerCapture\",\"scrollTo\",\"scrollBy\",\"observeResize\",\"unobserveResize\"],fb=[\"scrollTop\",\"scrollLeft\"],mb={methods:[\"save\",\"restore\",\"scale\",\"rotate\",\"translate\",\"transform\",\"setTransform\",\"resetTransform\",\"clearRect\",\"fillRect\",\"strokeRect\",\"beginPath\",\"closePath\",\"moveTo\",\"lineTo\",\"bezierCurveTo\",\"quadraticCurveTo\",\"arc\",\"arcTo\",\"ellipse\",\"rect\",\"roundRect\",\"fill\",\"stroke\",\"clip\",\"fillText\",\"strokeText\",\"setLineDash\",\"drawImage\",\"reset\"],properties:[\"fillStyle\",\"strokeStyle\",\"lineWidth\",\"lineCap\",\"lineJoin\",\"miterLimit\",\"lineDashOffset\",\"font\",\"textAlign\",\"textBaseline\",\"direction\",\"globalAlpha\",\"imageSmoothingEnabled\",\"imageSmoothingQuality\"],gradients:[\"linear\",\"radial\"],queries:[\"isPointInPath\",\"isPointInStroke\",\"getTransform\",\"getLineDash\",\"measureText\"]},ka={properties:[\"display\",\"flex\",\"flex-direction\",\"flex-wrap\",\"flex-flow\",\"flex-grow\",\"flex-shrink\",\"flex-basis\",\"justify-content\",\"align-items\",\"align-self\",\"align-content\",\"order\",\"place-items\",\"place-content\",\"place-self\",\"justify-items\",\"justify-self\",\"gap\",\"row-gap\",\"column-gap\",\"grid-gap\",\"grid-row-gap\",\"grid-column-gap\",\"grid\",\"grid-template\",\"grid-template-columns\",\"grid-template-rows\",\"grid-template-areas\",\"grid-column\",\"grid-column-start\",\"grid-column-end\",\"grid-row\",\"grid-row-start\",\"grid-row-end\",\"grid-area\",\"grid-auto-flow\",\"grid-auto-columns\",\"grid-auto-rows\",\"width\",\"height\",\"min-width\",\"min-height\",\"max-width\",\"max-height\",\"margin\",\"margin-top\",\"margin-right\",\"margin-bottom\",\"margin-left\",\"padding\",\"padding-top\",\"padding-right\",\"padding-bottom\",\"padding-left\",\"border\",\"border-width\",\"border-style\",\"border-color\",\"border-top\",\"border-right\",\"border-bottom\",\"border-left\",\"border-top-width\",\"border-right-width\",\"border-bottom-width\",\"border-left-width\",\"border-top-style\",\"border-right-style\",\"border-bottom-style\",\"border-left-style\",\"border-top-color\",\"border-right-color\",\"border-bottom-color\",\"border-left-color\",\"border-radius\",\"border-top-left-radius\",\"border-top-right-radius\",\"border-bottom-right-radius\",\"border-bottom-left-radius\",\"border-collapse\",\"border-spacing\",\"table-layout\",\"caption-side\",\"empty-cells\",\"box-sizing\",\"aspect-ratio\",\"outline\",\"outline-width\",\"outline-style\",\"outline-color\",\"outline-offset\",\"box-shadow\",\"float\",\"clear\",\"object-fit\",\"object-position\",\"position\",\"top\",\"right\",\"bottom\",\"left\",\"inset\",\"z-index\",\"overflow\",\"overflow-x\",\"overflow-y\",\"visibility\",\"opacity\",\"color\",\"background\",\"background-color\",\"background-image\",\"background-size\",\"background-position\",\"background-position-x\",\"background-position-y\",\"background-repeat\",\"background-origin\",\"background-clip\",\"color-scheme\",\"font\",\"font-family\",\"font-size\",\"font-weight\",\"font-style\",\"line-height\",\"font-variant-numeric\",\"font-feature-settings\",\"text-align\",\"text-indent\",\"text-decoration\",\"text-decoration-line\",\"text-decoration-color\",\"text-decoration-style\",\"text-decoration-thickness\",\"text-underline-offset\",\"text-transform\",\"letter-spacing\",\"word-spacing\",\"white-space\",\"white-space-collapse\",\"text-wrap-mode\",\"overflow-wrap\",\"word-wrap\",\"word-break\",\"text-overflow\",\"vertical-align\",\"list-style\",\"list-style-type\",\"list-style-position\",\"direction\",\"unicode-bidi\",\"transform\",\"transform-origin\",\"transform-box\",\"translate\",\"rotate\",\"scale\",\"filter\",\"backdrop-filter\",\"-webkit-backdrop-filter\",\"pointer-events\",\"touch-action\",\"cursor\",\"content\",\"counter-reset\",\"counter-increment\",\"quotes\",\"transition\",\"transition-property\",\"transition-duration\",\"transition-timing-function\",\"transition-delay\",\"animation\",\"animation-name\",\"animation-duration\",\"animation-timing-function\",\"animation-delay\",\"animation-iteration-count\",\"animation-direction\",\"animation-fill-mode\",\"animation-play-state\",\"fill\",\"fill-opacity\",\"fill-rule\",\"stroke\",\"stroke-width\",\"stroke-opacity\",\"stroke-linecap\",\"stroke-linejoin\",\"stroke-dasharray\",\"stroke-dashoffset\",\"stroke-miterlimit\",\"stop-color\",\"stop-opacity\",\"text-anchor\",\"dominant-baseline\",\"paint-order\",\"vector-effect\",\"shape-rendering\",\"cx\",\"cy\",\"r\",\"rx\",\"ry\",\"all\",\"appearance\",\"-webkit-appearance\",\"will-change\",\"text-rendering\",\"-webkit-font-smoothing\",\"-moz-osx-font-smoothing\",\"-webkit-tap-highlight-color\",\"user-select\",\"-webkit-user-select\"],functions:[\"var\",\"calc\",\"min\",\"max\",\"clamp\",\"rgb\",\"rgba\",\"hsl\",\"hsla\",\"light-dark\",\"linear-gradient\",\"repeating-linear-gradient\",\"radial-gradient\",\"repeating-radial-gradient\",\"conic-gradient\",\"repeating-conic-gradient\",\"translate\",\"translatex\",\"translatey\",\"rotate\",\"scale\",\"scalex\",\"scaley\",\"skew\",\"skewx\",\"skewy\",\"matrix\",\"blur\",\"brightness\",\"drop-shadow\",\"cubic-bezier\",\"steps\",\"linear\",\"attr\",\"counter\",\"counters\",\"minmax\",\"repeat\",\"fit-content\",\"env\",\"url\"],units:[\"px\",\"em\",\"rem\",\"ch\",\"ex\",\"pt\",\"pc\",\"cm\",\"mm\",\"in\",\"q\",\"vw\",\"svw\",\"lvw\",\"dvw\",\"vi\",\"svi\",\"lvi\",\"dvi\",\"vmin\",\"svmin\",\"lvmin\",\"dvmin\",\"vmax\",\"svmax\",\"lvmax\",\"dvmax\",\"deg\",\"rad\",\"grad\",\"turn\",\"s\",\"ms\",\"fr\"],values:{display:[\"block\",\"inline\",\"inline-block\",\"none\",\"flex\",\"inline-flex\",\"grid\",\"inline-grid\",\"table\",\"inline-table\",\"table-row\",\"table-cell\",\"table-caption\",\"table-row-group\",\"table-header-group\",\"table-footer-group\",\"table-column\",\"table-column-group\"],position:[\"static\",\"relative\",\"absolute\",\"fixed\"],\"user-select\":[\"none\",\"text\",\"auto\"],\"-webkit-user-select\":[\"none\",\"text\",\"auto\"]},rewrite:{position:{sticky:\"relative\",\"-webkit-sticky\":\"relative\"},overflow:{auto:\"hidden\",scroll:\"hidden\",overlay:\"hidden\"}},filterFunctions:[\"blur\",\"brightness\",\"drop-shadow\"],transform3d:[\"matrix3d\",\"translate3d\",\"translatez\",\"scale3d\",\"scalez\",\"rotate3d\",\"rotatex\",\"rotatey\",\"rotatez\",\"perspective\"],fonts:{generic:[\"system-ui\",\"sans-serif\",\"serif\",\"monospace\",\"ui-sans-serif\",\"ui-serif\",\"ui-monospace\",\"ui-rounded\"],fallback:{\"ui-sans-serif\":\"sans-serif\",\"ui-serif\":\"serif\",\"ui-monospace\":\"monospace\",\"ui-rounded\":\"sans-serif\"},aliases:{\"-apple-system\":\"system-ui\",blinkmacsystemfont:\"system-ui\"},default:\"system-ui\"},pseudoClasses:[\"hover\",\"active\",\"root\",\"lang\",\"first-child\",\"last-child\",\"only-child\",\"nth-child\",\"nth-last-child\",\"nth-of-type\",\"nth-last-of-type\",\"first-of-type\",\"last-of-type\",\"only-of-type\",\"empty\",\"is\",\"where\",\"not\",\"before\",\"after\"],pseudoElements:[\"before\",\"after\"],pseudoRewrite:{disabled:\"[disabled]\",enabled:\":not([disabled])\"},atRules:[\"media\",\"supports\",\"keyframes\",\"-webkit-keyframes\"],mediaTypes:[\"all\",\"screen\"],mediaFeatures:[\"width\",\"min-width\",\"max-width\",\"aspect-ratio\",\"min-aspect-ratio\",\"max-aspect-ratio\",\"orientation\",\"prefers-color-scheme\",\"prefers-reduced-motion\"]},yo=\"@layer tw-ua{:where(html){color:var(--tg-theme-text-color);font:var(--tg-text-font-size,15px)/var(--tg-text-line-height,1.35) system-ui,sans-serif;-webkit-text-size-adjust:none;text-size-adjust:none;overflow-wrap:break-word;-webkit-user-select:none;user-select:none;-webkit-touch-callout:none}:where(body){margin:var(--tg-text-padding,8px 12px);padding:0;padding-bottom:var(--tg-content-safe-area-inset-bottom,0px)}:where(h1,h2,h3,h4,h5,h6){margin:.75em 0 .35em;font-weight:600;line-height:1.25}:where(h1){font-size:1.6em}:where(h2){font-size:1.35em}:where(h3){font-size:1.2em}:where(h4){font-size:1.07em}:where(h5){font-size:1em}:where(h6){font-size:.87em}:where(p,ul,ol,menu,dl,pre,blockquote,figure,table){margin:.6em 0}:where(ul,ol,menu){padding:0 0 0 1.5em;padding-inline-start:1.5em;padding-inline-end:0}:where(ul,menu){list-style-type:disc}:where(ol){list-style-type:decimal}:where(li ul,li menu){list-style-type:circle}:where(li ul,li ol,li menu,li dl){margin:0}:where(dt){font-weight:600}:where(dd){margin:0 0 0 1.5em;margin-inline-start:1.5em;margin-inline-end:0}:where(table){border-collapse:collapse;border-spacing:0}:where(caption){padding:0 0 .3em;color:var(--tg-theme-hint-color);font-size:.87em;text-align:left;text-align:start}:where(th,td){padding:.3em .6em;border-bottom:1px solid var(--tg-theme-section-separator-color);text-align:left;text-align:start;vertical-align:top}:where(th){font-weight:600}:where(th:last-child,td:last-child){padding-right:0;padding-inline-end:0;padding-inline-start:.6em}:where(th:first-child,td:first-child){padding-left:0;padding-inline-start:0;padding-inline-end:.6em}:where(hr){height:0;margin:.6em 0;border:0;border-top:1px solid var(--tg-theme-section-separator-color)}:where(pre,code,kbd,samp){font-family:ui-monospace,monospace;font-size:.9em}:where(pre code,pre kbd,pre samp){font-size:1em}:where(pre){padding:.5em .7em;border-radius:6px;background:rgba(128,128,128,.12);white-space:pre-wrap}:where(blockquote){padding:0 0 0 .75em;padding-inline-start:.75em;padding-inline-end:0;border-left:3px solid var(--tg-theme-accent-text-color);border-inline-start:3px solid var(--tg-theme-accent-text-color);border-inline-end:0}:where(figcaption){margin:.3em 0 0;color:var(--tg-theme-hint-color);font-size:.87em}:where(img){max-width:100%}:where(a[href]){color:var(--tg-theme-link-color);text-decoration:none}:where(b,strong){font-weight:600}:where(i,em,cite,dfn,var){font-style:italic}:where(small){font-size:.85em}:where(sub,sup){position:relative;font-size:.75em;line-height:0;vertical-align:baseline}:where(sup){top:-.5em}:where(sub){bottom:-.25em}:where(mark){background:rgba(255,204,0,.4);color:inherit}:where(body>:first-child){margin-top:0}:where(body>:last-child){margin-bottom:0}:where(button){appearance:none;-webkit-appearance:none;margin:0;border:0;border-radius:var(--tg-button-radius,8px);padding:var(--tg-button-padding,8px 14px);min-height:var(--tg-button-height,auto);font:var(--tg-button-font,500 14px/1.2 system-ui,sans-serif);background:var(--tg-button-bg,rgba(51,144,236,.12));color:var(--tg-button-text,inherit);cursor:pointer;-webkit-tap-highlight-color:transparent}:where(button:not([disabled])):active{opacity:var(--tg-button-pressed-opacity,.7)}:where(button[disabled]){opacity:var(--tg-button-disabled-opacity,.5);cursor:default}}\",bo={html:ub,svg:pb,images:gi,events:wa,methods:db,properties:fb,canvas:mb,css:ka,uaStylesheet:yo};var yi=1,kd=4*1024*1024,xo=wa;function Sd(e){return e===\"compat\"?\"compat\":\"strict\"}var Sa={memoryLimitBytes:8*1024*1024,cpuLimitMs:500,cpuQuotaMs:300,cpuQuotaWindowMs:1e3,cpuKillAfterMs:0,mainThreadQuotaMs:100,maxTimers:64},vd=864e5,wo=65536,ko=16*1024*1024/wo,fA=16*1024*1024,va=16,bi=0,Td=1,Ed=2;var Ea=[\"bg_color\",\"text_color\",\"hint_color\",\"link_color\",\"button_color\",\"button_text_color\",\"secondary_bg_color\",\"accent_text_color\",\"subtitle_text_color\",\"destructive_text_color\",\"section_bg_color\",\"section_header_text_color\",\"section_separator_color\",\"header_bg_color\",\"bottom_bar_bg_color\"];function hb(e){let t={};if(typeof e!=\"object\"||e===null||Array.isArray(e))return t;for(let n of Ea){let r=e[n];typeof r==\"string\"&&/^#[0-9a-fA-F]{6}$/.test(r)&&(t[n]=r.toLowerCase())}return t}var gb={light:{bg_color:\"#ffffff\",text_color:\"#000000\",hint_color:\"#707579\",link_color:\"#3390ec\",button_color:\"#3390ec\",button_text_color:\"#ffffff\",secondary_bg_color:\"#f4f4f5\",accent_text_color:\"#3390ec\",subtitle_text_color:\"#707579\",destructive_text_color:\"#e53935\",section_bg_color:\"#ffffff\",section_header_text_color:\"#3390ec\",section_separator_color:\"#e7e7e7\",header_bg_color:\"#ffffff\",bottom_bar_bg_color:\"#ffffff\"},dark:{bg_color:\"#212121\",text_color:\"#ffffff\",hint_color:\"#aaaaaa\",link_color:\"#8774e1\",button_color:\"#8774e1\",button_text_color:\"#ffffff\",secondary_bg_color:\"#181818\",accent_text_color:\"#8774e1\",subtitle_text_color:\"#aaaaaa\",destructive_text_color:\"#ff595a\",section_bg_color:\"#212121\",section_header_text_color:\"#8774e1\",section_separator_color:\"#3d3d3d\",header_bg_color:\"#212121\",bottom_bar_bg_color:\"#212121\"}};function yb(e,t){return{...gb[t],...hb(e)}}var bb={fontSize:\"15px\",lineHeight:\"1.35\",padding:\"8px 12px\"},Ta=/^(0|[0-9]{1,4}(\\.[0-9]{1,3})?(px|em|rem))$/,Cd=/^#[0-9a-fA-F]{6}$/,xb=new Set([\"system-ui\",\"sans-serif\",\"serif\",\"monospace\",\"ui-sans-serif\",\"ui-serif\",\"ui-monospace\",\"ui-rounded\"]),wb=/^(?:(normal|italic) )?(?:(normal|bold|[1-9]00) )?[0-9]{1,3}(?:\\.[0-9]{1,2})?(?:px|em|rem)(?:\\/[0-9]{1,3}(?:\\.[0-9]{1,2})?(?:px|em|rem)?)? ([a-z-]+(?:, ?[a-z-]+)*)$/;function Ad(e){let t=typeof e==\"number\"?String(e):typeof e==\"string\"?e:\"\";return/^(0(\\.[0-9]{1,3})?|1(\\.0{1,3})?|\\.[0-9]{1,3})$/.test(t)?t:null}var Ld=e=>typeof e==\"string\"&&/^\\S+( \\S+){0,3}$/.test(e)&&e.split(\" \").every(t=>Ta.test(t))?e:null;function _d(e,t,n,r,i){let o;if(typeof e==\"number\")o=e;else if(typeof e==\"string\"&&new RegExp(`^[0-9]{1,2}(\\\\.[0-9]{1,${r}})?${i}$`).test(e))o=parseFloat(e);else return null;if(!Number.isFinite(o)||o<t||o>n)return null;let s=10**r;return String(Math.round(o*s)/s)+i}var Pd=[[\"bg\",\"--tg-button-bg\",e=>typeof e==\"string\"&&Cd.test(e)?e.toLowerCase():null],[\"text\",\"--tg-button-text\",e=>typeof e==\"string\"&&Cd.test(e)?e.toLowerCase():null],[\"radius\",\"--tg-button-radius\",e=>typeof e==\"string\"&&Ta.test(e)?e:null],[\"font\",\"--tg-button-font\",e=>{let t=typeof e==\"string\"?wb.exec(e):null;return t&&t[3].split(\",\").every(n=>xb.has(n.trim()))?e:null}],[\"padding\",\"--tg-button-padding\",Ld],[\"height\",\"--tg-button-height\",e=>typeof e==\"string\"&&Ta.test(e)?e:null],[\"pressedOpacity\",\"--tg-button-pressed-opacity\",Ad],[\"disabledOpacity\",\"--tg-button-disabled-opacity\",Ad]],Rd=[[\"fontSize\",\"--tg-text-font-size\",e=>_d(e,8,64,2,\"px\")],[\"lineHeight\",\"--tg-text-line-height\",e=>_d(e,1,3,3,\"\")],[\"padding\",\"--tg-text-padding\",Ld]],kb=[\"top\",\"right\",\"bottom\",\"left\",\"cornerLeft\",\"cornerRight\"],Sb=64,vb=200,Tb=Object.freeze({top:0,right:0,bottom:0,left:0,cornerLeft:0,cornerRight:0});function Eb(e){let t=typeof e==\"object\"&&e!==null?e:{},n={...Tb};for(let r of kb){let i=t[r],o=r.startsWith(\"corner\")?vb:Sb;typeof i==\"number\"&&Number.isFinite(i)&&i>=0&&i<=o&&(n[r]=Math.round(i*100)/100)}return n}var Md=[[\"top\",\"--tg-content-safe-area-inset-top\"],[\"right\",\"--tg-content-safe-area-inset-right\"],[\"bottom\",\"--tg-content-safe-area-inset-bottom\"],[\"left\",\"--tg-content-safe-area-inset-left\"],[\"cornerLeft\",\"--tg-content-safe-area-corner-left\"],[\"cornerRight\",\"--tg-content-safe-area-corner-right\"]],xi=Object.freeze({\"safe-area-inset-top\":\"--tg-content-safe-area-inset-top\",\"safe-area-inset-right\":\"--tg-content-safe-area-inset-right\",\"safe-area-inset-bottom\":\"--tg-content-safe-area-inset-bottom\",\"safe-area-inset-left\":\"--tg-content-safe-area-inset-left\"});function Ca(e){let t=Eb(e),n={};for(let[r,i]of Md)n[i]=t[r]+\"px\";return n}var Aa=[...Ea.map(e=>\"--tg-theme-\"+e.replace(/_/g,\"-\")),\"--tg-color-scheme\",...Pd.map(([,e])=>e),...Rd.map(([,e])=>e),...Md.map(([,e])=>e)];function Nd(e){let t=typeof e==\"object\"&&e!==null?e:{},n=t.colorScheme===\"dark\"?\"dark\":\"light\",r=yb(t.params,n),i={};for(let l of Ea)i[\"--tg-theme-\"+l.replace(/_/g,\"-\")]=r[l];i[\"--tg-color-scheme\"]=n;let o=typeof t.button==\"object\"&&t.button!==null?t.button:{};for(let[l,c,p]of Pd){let f=p(o[l]);f!==null&&(i[c]=f)}let s=typeof t.text==\"object\"&&t.text!==null?t.text:{};for(let[l,c,p]of Rd)i[c]=p(s[l])??bb[l];return i}function Id(e){let t=typeof e.locale==\"string\"||Array.isArray(e.locale)?e.locale:void 0,n=e.opts&&typeof e.opts==\"object\"?e.opts:void 0,r=i=>{try{return i(t)}catch{return i(void 0)}};switch(e.kind){case\"number\":return r(i=>new Intl.NumberFormat(i,n).format(Number(e.value)));case\"numberParts\":return JSON.stringify(r(i=>new Intl.NumberFormat(i,n).formatToParts(Number(e.value))));case\"numberOptions\":return JSON.stringify(r(i=>new Intl.NumberFormat(i,n).resolvedOptions()));case\"date\":return r(i=>new Intl.DateTimeFormat(i,n).format(new Date(Number(e.value))));case\"dateMethod\":{let i=new Date(Number(e.value));return r(o=>e.method===\"toLocaleDateString\"?i.toLocaleDateString(o,n):e.method===\"toLocaleTimeString\"?i.toLocaleTimeString(o,n):i.toLocaleString(o,n))}case\"dateParts\":return JSON.stringify(r(i=>new Intl.DateTimeFormat(i,n).formatToParts(new Date(Number(e.value)))));case\"dateOptions\":return JSON.stringify(r(i=>new Intl.DateTimeFormat(i,n).resolvedOptions()));case\"plural\":return r(i=>new Intl.PluralRules(i,n).select(Number(e.value)));case\"relative\":return r(i=>new Intl.RelativeTimeFormat(i,n).format(Number(e.value),e.unit));case\"list\":return r(i=>new Intl.ListFormat(i,n).format(e.value.map(String)));case\"compare\":return String(r(i=>new Intl.Collator(i,n).compare(String(e.a),String(e.b))));case\"upper\":return r(i=>String(e.value).toLocaleUpperCase(i));case\"lower\":return r(i=>String(e.value).toLocaleLowerCase(i));default:return\"\"}}function Od(e,t){return{*call(n,r,i){return t.callFunction(n,r,...i)},*eval(n,r,i){return t.evalCode(n,r,{type:i})},*jobs(){let n=e.executePendingJobs();return n.error?{error:n.error}:{value:n.value}}}}var Or=null;function So(e){if(Or===e)return 0;let t=performance.now();return Or&&(Or.lostAt=t),Or=e,e.lostAt?t-e.lostAt:0}function Ab(e,t,n){let r=t,i=s=>{let l=r.ctx.value,c=r.ffi.QTS_ResolveException(l,s);return c?(r.ffi.QTS_FreeValuePointer(l,s),r.fail(r.memory.heapValueHandle(c))):r.success(r.memory.heapValueHandle(s))};function*o(s,l){let c=n.run(s,l);return typeof c==\"number\"?c:yield c}return{*call(s,l,c){let p=r.memory.toPointerArray(c);try{return i(yield*o(\"_QTS_Call\",[r.ctx.value,s.value,l.value,c.length,p.value]))}finally{p.dispose()}},*eval(s,l,c){let p=r.memory.newHeapCharPointer(s),f=r.memory.newHeapCharPointer(l);try{return i(yield*o(\"_QTS_Eval\",[r.ctx.value,p.value.ptr,p.value.strlen,f.value.ptr,0,c===\"module\"?1:0]))}finally{p.dispose(),f.dispose()}},*jobs(){let s=e,l=s.memory.newMutablePointerArray(1),c,p;try{c=yield*o(\"_QTS_ExecutePendingJob\",[s.rt.value,-1,l.value.ptr]),p=l.value.typedArray[0]}finally{l.dispose()}if(p===0)return s.ffi.QTS_FreeValuePointerRuntime(s.rt.value,c),{value:0};let f=r.memory.heapValueHandle(c);if(t.typeof(f)===\"number\"){let m=t.getNumber(f);return f.dispose(),{value:m}}return{error:f}}}}var Dd=3e3,_b=15e3,_a=4e3,Lb=2,Fd=e=>new Ir({cpuLimitMs:e.cpuLimitMs,cpuQuotaMs:e.mainThreadQuotaMs??Sa.mainThreadQuotaMs,cpuQuotaWindowMs:e.cpuQuotaWindowMs,cpuKillAfterMs:0}),Pb=2,Rb=24*4096+64,Mb=new Set([\"webAnimations\",\"noInPlaceText\",\"noAttrFast\",\"noCanvasRect\"]),zd=e=>({...e,features:(e.features??[]).filter(t=>Mb.has(t))}),Nb=new TextDecoder,Ib=\"(function(g){for(const n of ['__host','__hostBinary','__hostCanvas','__hostOps','__twDispatch'])if(!delete g[n])throw new Error(n);})(globalThis);\",Bd=e=>Math.floor(e/.1)*.1;function Qd(e){let t=k=>{if(n===\"sab\")return e.post(k);let E=performance.now();e.post(k);let C=performance.now()-E;x+=C,F+=C},n=\"sab\",r,i,o,s=null,l=1,c,p=0,f,m,g=!1,S=!1,x=0,L=0,Q=0,R=0,H=0,F=0,W=0,ce={lostAt:0},J=k=>{W+=k,x+=k},X=0,G=null,Z=0,ue=0,Ge=\"boot\",Ce,Je,Ye=0,Ke=-1/0,Xe={},Ve=null,Tt,Se=!1,je=[],mt=[];function Wt(k){Se?mt.push(k):k()}function Et(k,E){let C=(N,$)=>{J(So(ce));let re;try{re=$!==void 0?k.throw($):k.next(N)}catch(ie){return se(\"sandbox glue error: \"+ie.message),E()}if(re.done)return E();re.value.then(ie=>C(ie),ie=>C(void 0,ie??new Error(\"rejected\")))};So(ce),C()}let xe=!0,Zt=!1,lt=[],Ze=null,en=1/0,ht=0;function En(k,E){if(k===\"frame\"){let C=lt.find(N=>N.kind===\"frame\");if(C){C.arg=E;return}}else if(k===\"timer\"&&lt.some(C=>C.kind===\"timer\"&&C.arg===E))return;lt.push({kind:k,arg:E})}function Ut(k){Ze&&k>=en||(Ze&&clearTimeout(Ze),en=k,Ze=setTimeout(Ct,Math.max(0,k-performance.now())))}function Ct(){Ze=null,en=1/0,ht=0,Gn(lt.splice(0))}function Gn(k){for(let E=0;E<k.length;E++){if(g)return;if(Se){mt.push(()=>Gn(k.slice(E)));return}if(!De(k[E].kind,k[E].arg)){lt.unshift(...k.slice(E));return}}}function wr(k){y.delete(k),Wt(()=>{if(!xe){En(\"timer\",k),ht||(ht=performance.now()+1e3),Ut(ht);return}De(\"timer\",k)})}function Vn(k){xe!==k&&(xe=k,De(\"visibility\",{visible:k}),xe&&(Zt&&(Zt=!1,t({type:\"raf\"})),lt.length&&Ct()))}let Ae={jsMs:0,tasks:0,memoryBytes:0,ops:0,queries:0,queryMs:0,queryCacheHits:0,missedMutations:0,throttledTasks:0,cpuWindowMs:0},kr=0,gt=0,y=new Map,v=!1;function P(k,E){let C=performance.now()-k;x+=C,Ae.queries++,Ae.queryMs+=C,H+=C,L+=E??C,Q++,G=xd(Q,L),G&&(x=-1/0)}function w(k){if(G)return'{\"error\":\"query budget exceeded\"}';let E=performance.now(),C=e.query(k);return P(E),Ve=C.binary?new Uint8Array(C.binary):null,C.json}function Y(k){let E;try{E=JSON.parse(k)}catch{return'{\"error\":\"bad query\"}'}if(G)return'{\"error\":\"query budget exceeded\"}';let C=performance.now();Atomics.store(f,bi,1),t({type:\"query\",query:E});let N=Atomics.wait(f,bi,1,Dd);if(P(C),N===\"timed-out\")return Atomics.store(f,bi,0),'{\"error\":\"timeout\"}';let $=Atomics.load(f,Td),re=Atomics.load(f,Ed),ie=Nb.decode(m.slice(0,$));return Ve=re>0?m.slice($,$+re):null,Atomics.store(f,bi,0),ie}function V(k){let E=s;if(!E)return'{\"error\":\"dead\"}';let C=E.takeAnswer();if(C){let ie=C.value;return P(Z,ie?.hostMs??0),So(ce),Ve=ie?.binary?new Uint8Array(ie.binary):null,ie?ie.json:'{\"error\":\"timeout\"}'}let N;try{N=JSON.parse(k)}catch{return'{\"error\":\"bad query\"}'}if(G)return'{\"error\":\"query budget exceeded\"}';if(!E.canWait())return'{\"error\":\"no layout here\"}';Z=performance.now();let $=()=>{},re=Promise.race([e.ask(N),new Promise(ie=>{let _t=setTimeout(()=>ie(void 0),Dd);$=()=>clearTimeout(_t)})]).finally(()=>$());E.wait(re)}function pe(k,E){switch(k){case\"ops\":{let C;try{C=JSON.parse(E)}catch{return}if(Array.isArray(C)){Ae.ops+=C.length;let N=0;for(let $ of C)$&&$.op===\"canvas\"&&Array.isArray($.cmds)&&(N+=$.cmds.length);R+=wd(C.length,N)}t({type:\"ops\",ops:C});return}case\"query\":return n===\"sab\"?Y(E):n===\"worker\"?V(E):w(E);case\"now\":return Bd(performance.now());case\"timer\":{let[C,N]=JSON.parse(E);if(typeof C!=\"number\")return;let $=y.get(C);if($!==void 0)clearTimeout($);else if(y.size>=c.maxTimers){v||(v=!0,t({type:\"diag\",kind:\"timer-limit-enforced\",detail:`glue refused a timer beyond maxTimers=${c.maxTimers}; the shim did not stop it`}));return}let re=Math.min(Math.max(Number(N)||0,0),vd);xe||(re=Math.max(re,1e3+re/10)),y.set(C,setTimeout(()=>wr(C),re));return}case\"clearTimer\":{let C=Number(E),N=y.get(C);N!==void 0&&(clearTimeout(N),y.delete(C));return}case\"raf\":if(!xe){Zt=!0;return}t({type:\"raf\"});return;case\"log\":{let C=E.indexOf(\":\");t({type:\"log\",level:E.slice(0,C),text:E.slice(C+1,C+1+_a)});return}case\"diag\":{let C=E.indexOf(\":\");t({type:\"diag\",kind:E.slice(0,C).slice(0,64),detail:E.slice(C+1,C+1+_a)});return}case\"listen\":try{t({type:\"listen\",types:JSON.parse(E),since:performance.timeOrigin+X})}catch{}return;case\"pd\":try{t({type:\"pd\",keys:JSON.parse(E)})}catch{}return;case\"anim\":if(E.length>kd||!c.features?.includes(\"webAnimations\"))return;try{t({type:\"anim\",anims:JSON.parse(E),now:performance.now()})}catch{}return;case\"bridge\":try{let[C,N]=JSON.parse(E);t(sn?{type:\"bridge\",method:String(C).slice(0,64),args:N,gesture:sn}:{type:\"bridge\",method:String(C).slice(0,64),args:N})}catch{}return;case\"storage\":if(E.length>Rb){t({type:\"diag\",kind:\"storage-rejected\",detail:`commit of ${E.length} characters`});return}try{t({type:\"storage\",commit:JSON.parse(E)})}catch{}return;case\"intl\":try{return Id(JSON.parse(E))}catch{return\"\"}case\"parse\":return e.parseHTML?.(E)??\"\";case\"random\":{let C=Math.min(Math.max(Number(E)|0,0),65536);return JSON.stringify(Array.from(crypto.getRandomValues(new Uint8Array(C))))}case\"stat\":{try{let C=JSON.parse(E);Ae.queryCacheHits=Number(C.cacheHits)||0,Ae.missedMutations=Number(C.missed)||0}catch{}return}}}function we(){g=!0,x=-1/0;for(let k of y.values())clearTimeout(k);y.clear(),lt.length=0,mt.length=0,Ze&&(clearTimeout(Ze),Ze=null)}function se(k){g||(we(),t({type:\"dead\",reason:k}))}function K(){g||we(),r=i=Tt=o=s=null,Or===ce&&(Or=null),At=null,je.length=mt.length=0}function ee(k){let E;try{let C=i.dump(k);E=C&&typeof C==\"object\"?`${C.name??\"Error\"}: ${C.message??\"\"}${C.stack?`\n`+C.stack:\"\"}`:String(C)}catch{E=\"unknown error\"}return k.dispose(),E}function he(k,E){let C=ee(k);if(S&&G)return se(`${xa(G,Ge)} (${E})`);if(S)return se(`CPU limit exceeded: more than ${ue.toFixed(0)} ms of continuous execution (${E})`);if(/out of memory/i.test(C))return se(`Memory limit exceeded (${c.memoryLimitBytes>>20} MB)`);t({type:\"log\",level:\"error\",text:`Uncaught ${C}`.slice(0,_a)})}function*Cn(){for(let k=0;k<100&&!g;k++){let E=yield*o.jobs();if(g)return;if(E.error){he(E.error,\"promise job\");continue}if(E.value===0)break}}function*An(k,E){let C=i.newString(k),N=i.newString(E),$;try{$=yield*o.call(Tt,i.undefined,[C,N])}finally{i&&(C.dispose(),N.dispose())}if(!i)return null;if($.error)return he($.error,k),null;let re=i.typeof($.value)===\"string\"?i.getString($.value):null;return $.value.dispose(),re}function*ni(){for(let k=0;k<20&&!g;k++){if(yield*Cn(),g)return;let E=yield*An(\"endTick\",\"\");if(g)return;if(E!==\"1\"&&!r.hasPendingJob())break}}function*jn(k,E,C){let N=yield*o.eval(k,E,C);return i?N.error?(he(N.error,E),!1):(N.value.dispose(),!0):!1}function*$n(){for(let k=0;k<1e3&&!g;k++){let E=yield*An(\"nextScript\",\"\");if(!E||g)break;let C=JSON.parse(E),N=!0;if(qn(),C.src!==void 0?(N=!1,t({type:\"diag\",kind:\"script-skipped\",detail:`external script not available: ${String(C.src).slice(0,200)}`})):C.code!==void 0&&(yield*jn(C.code,`inline-script-${C.id}.js`,C.type)),g||(yield*ni(),g))return;yield*An(\"scriptDone\",JSON.stringify([C.id,N])),yield*ni()}}function qn(){S=!1;let k=performance.now();if(n!==\"inline\"&&n!==\"worker\"){x=k+ue;return}let E=k-X-H-F-W-Ye;x=k+Math.max(0,ue-E)}function Sr(k,E,C,N,$=0){if(g)return N?.();Se=!0,sn=$,Ge=k,ue=E*l,Ye=0,L=0,Q=0,R=0,H=0,F=0,W=0,G=null;let re=X=performance.now(),ie=Ae.queryMs;qn(),Et((function*(){try{yield*C(),g||(yield*ni()),g||(yield*$n()),!g&&G&&se(xa(G,k))}catch(_t){se(\"sandbox glue error: \"+_t.message)}})(),()=>{for(Se=!1,sn=0,i&&tn(k,re,ie),N?.();mt.length&&!Se&&!g;)mt.shift()()})}function tn(k,E,C){Ae.tasks++;let N=performance.now(),$=N-E-(Ae.queryMs-C)-Ye-F-W;if(Ae.jsMs+=$,(n===\"inline\"||n===\"worker\")&&k===\"boot\"||(Ce.record(k,$/l+F,N),Je.record(k,L+R,N)),Ae.cpuWindowMs=Ce.used(N),N-gt>1e3&&!g){gt=N;try{let re=r.computeMemoryUsage();Ae.memoryBytes=i.dump(re).memory_used_size??0,re.dispose()}catch{}}N-kr>200&&(kr=N,t({type:\"stats\",stats:{...Ae}}))}function De(k,E,C=0){if(g)return!0;let N=performance.now(),$=Ce.decide(k,N),re=Je.decide(k,N);if(!$.run||!re.run){if(Ce.shouldKill(N))return se(`CPU quota: throttled for ${(Ce.throttledFor(N)/1e3).toFixed(1)} s (${c.cpuQuotaMs} ms per ${c.cpuQuotaWindowMs} ms, cpuKillAfterMs=${c.cpuKillAfterMs})`),!0;if(En(k,E),Ae.throttledTasks++,Xe[k]=(Xe[k]??0)+1,N-Ke>=1e3){Ke=N;let ie=Object.entries(Xe).map(([Ie,yt])=>`${yt} ${Ie}${yt===1?\"\":\"s\"}`);for(let Ie of Object.keys(Xe))delete Xe[Ie];let _t=$.run?`${Je.used(N).toFixed(0)} ms of the ${c.mainThreadQuotaMs??Sa.mainThreadQuotaMs} ms per ${c.cpuQuotaWindowMs} ms main-thread budget used by layout queries and ops`:`${Ce.used(N).toFixed(0)} ms of the ${c.cpuQuotaMs} ms per ${c.cpuQuotaWindowMs} ms budget used`;t({type:\"diag\",kind:\"cpu-throttled\",detail:`deferred ${ie.join(\", \")}: ${_t}`})}return Ut(Math.max($.run?0:$.retryAt,re.run?0:re.retryAt)),!1}return Sr(k,$.sliceMs,()=>An(k,JSON.stringify(E)),void 0,C),!0}let vr=()=>performance.now()>x?(S=!0,!0):!1,_n=(k,E)=>{let C=pe(i.getString(k),E?i.getString(E):\"\");return typeof C==\"string\"?i.newString(C):typeof C==\"number\"?i.newNumber(C):i.undefined},Jn=()=>{if(!Ve)return i.null;let k=Ve.buffer.slice(Ve.byteOffset,Ve.byteOffset+Ve.byteLength);return Ve=null,i.newArrayBuffer(k)};async function nn(k,E){c=zd(k.config),xe=c.visible!==!1,Ce=new Ir(c),Je=Fd(c),n=E?\"inline\":k.type===\"init\"&&k.transport||\"sab\",n===\"sab\"&&(f=new Int32Array(k.sab,0,va/4),m=new Uint8Array(k.sab,va)),p=c.memoryLimitBytes;let C=new WebAssembly.Memory({initial:ko,maximum:ko+Math.ceil(c.memoryLimitBytes/wo)}),N=k.type===\"init\"?k.wasmBinary:void 0,re=await ld(cd(hd,{...E?{wasmModule:()=>E.wasmModule}:N?{wasmModule:()=>WebAssembly.compile(N)}:{wasmLocation:gd},wasmMemory:C}));if(g)throw new Error(\"stopped\");r=re.newRuntime(),r.setMemoryLimit(c.memoryLimitBytes),r.setMaxStackSize(1024*1024),r.setInterruptHandler(vr),i=r.newContext(),o=Od(r,i);let ie=i.newFunction(\"__host\",_n);i.setProp(i.global,\"__host\",ie),ie.dispose();let _t=i.newFunction(\"__hostBinary\",Jn);i.setProp(i.global,\"__hostBinary\",_t),_t.dispose();let Ie=0;return Sr(\"boot\",c.cpuLimitMs,function*(){let yt=performance.now();ue=Math.max(c.cpuLimitMs,_b),x=performance.now()+ue;let Pn=yield*jn(k.sandboxBundle,\"sandbox-bundle.js\",\"global\");if(Ye=performance.now()-yt,g)return;if(!Pn)return se(\"sandbox bundle failed to load\");let an=i.getProp(i.global,\"__twDispatch\");if(i.typeof(an)!==\"function\")return an.dispose(),se(\"sandbox bundle failed to initialise\");if(Tt=an,E&&!(yield*jn(E.seedScript,\"seed.js\",\"global\"))||!(yield*jn(Ib,\"hide-host.js\",\"global\")))return se(\"sandbox bundle failed to load\");Ie=performance.now()-yt,t({type:\"diag\",kind:\"boot\",detail:`sandbox bundle eval ${Ie.toFixed(0)} ms; wasm memory ${(C.buffer.byteLength/1048576).toFixed(1)} MB, cap ${((ko*wo+c.memoryLimitBytes)/1048576).toFixed(0)} MB${re.getWasmMemory()===C?\"\":\" (module ignored the provided Memory)\"}`})}),g||t({type:\"warmed\",bootMs:Ie}),{QuickJS:re,rt:r,vm:i,dispatch:Tt,memory:C}}async function rn(k,E,C){let N=await nn(k,{wasmModule:E,seedScript:C});if(g)throw new Error(\"the sandbox bundle did not load\");return N}function Yn(k,E){g||({rt:r,vm:i,dispatch:Tt}=k,s=k.suspender??null,l=s?.kind===\"asyncify\"?Pb:1,n=s?\"worker\":\"inline\",o=s?Ab(r,i,s):Od(r,i),s&&(s.onResume=()=>J(So(ce))),p=k.memoryLimitBytes,k.bindHost(_n,Jn),r.setInterruptHandler(vr),on(E))}function on(k){if(g)return;c=zd({...k.config,memoryLimitBytes:Math.min(k.config.memoryLimitBytes,p)}),xe=c.visible!==!1,Ce=new Ir(c),Je=Fd(c),r.setMemoryLimit(c.memoryLimitBytes);let E=n===\"inline\"||n===\"worker\"?c.cpuLimitMs*Lb:c.cpuLimitMs;Sr(\"boot\",E,()=>An(\"boot\",JSON.stringify({html:k.html,config:c})),()=>{Sr(\"boot\",E,()=>An(\"loaded\",\"\"),()=>{g||t({type:\"loaded\"}),t({type:\"stats\",stats:{...Ae}}),Ln=!0;for(let C of je.splice(0))Wt(()=>ri(C))})})}let Ln=!1,sn=0;function ri(k){if(!g)switch(k.type){case\"event\":De(\"event\",k.ev,typeof k.gesture==\"number\"?k.gesture:0);return;case\"frame\":if(!xe){Zt=!0;return}De(\"frame\",Bd(k.time));return;case\"viewport\":De(\"viewport\",k.viewport);return;case\"resize\":De(\"resize\",k.entries);return;case\"theme\":De(\"theme\",{theme:k.theme,themeParams:k.themeParams});return;case\"safeArea\":De(\"safeArea\",k.inset);return;case\"visibility\":Vn(!!k.visible);return;case\"bridge\":De(\"bridge\",k.event);return}}let At=null,ii=k=>se(\"failed to start sandbox: \"+k.message);function Bs(k){if(k.type===\"stop\"){K();return}g&&(k.type===\"init\"||k.type===\"warm\"||k.type===\"start\")||(k.type===\"init\"?(At=nn(k),At.then(()=>on(k)).catch(ii)):k.type===\"warm\"?(At=nn(k),At.catch(ii)):k.type===\"start\"?(At??Promise.reject(new Error(\"start before warm\"))).then(()=>on(k)).catch(ii):Ln?Wt(()=>ri(k)):je.push(k))}return{receive:Bs,warmForSnapshot:rn,adopt:Yn,destroy:K,kill:se}}var Hd=\"http://www.w3.org/2000/svg\";var Ob=/<noscript/i,Db=null;function Fb(){return Db??=new DOMParser().parseFromString(\"\",\"text/html\")}function vo(e){let t=[];for(let n of Array.from(e.attributes))t.push(n.name,n.value);return t}function To(e){let t=[];for(let n=e.firstChild;n;n=n.nextSibling)if(n.nodeType===3)t.push(n.data);else if(n.nodeType===8)t.push([0,n.data]);else if(n.nodeType===1){let r=n,i=r.localName,o=r.namespaceURI===Hd;t.push([i,o?1:0,vo(r),To(i===\"template\"&&!o?r.content:r)])}return t}function Wd(e){let t;try{t=JSON.parse(e)}catch{return\"\"}if(typeof t?.html!=\"string\"||t.html.length>16384||Ob.test(t.html))return\"\";if(typeof t.context==\"string\"){let s=Fb(),l;try{l=t.svg===!0?s.createElementNS(Hd,t.context):s.createElement(t.context)}catch{return\"\"}return l.innerHTML=t.html,JSON.stringify(To(l instanceof HTMLTemplateElement?l.content:l))}let n=new DOMParser().parseFromString(t.html,\"text/html\"),r=n.documentElement,i=n.head,o=n.body;return!r||!i||o?.localName!==\"body\"?\"\":JSON.stringify([vo(r),vo(i),To(i),vo(o),To(o)])}var zb=Object.freeze({x:!1,y:!1,hold:!1});function Ud(e,t=!1){let n=t;for(let r of e){let i=r.trim().toLowerCase();if(!(i===\"\"||i===\"auto\"||i===\"manipulation\")){if(i===\"none\")return{x:!0,y:!1,hold:!0};/\\bpan-(x|left|right)\\b/.test(i)||(n=!0)}}return{x:n,y:!1,hold:!1}}var Eo=class{press=null;lastTap=null;down(t,n,r,i,o=\"touch\",s=0){let l=o!==\"mouse\"&&n<20,c=this.lastTap;this.lastTap=null;let p=c!==null&&t-c.t<=300&&Math.hypot(n-c.x,r-c.y)<=40,f={t0:t,x0:n,y0:r,claim:l?zb:i,pointer:o,edge:l,second:p,locked:!1,owner:\"pending\",gesture:\"press\"};return this.press=f,o===\"mouse\"&&s===2?f.claim.hold?this.decide(f,\"widget\",\"menu-click\",void 0,\"contextmenu\"):this.decide(f,\"bubble\",\"menu-click\",\"menu\"):this.verdict(f)}move(t,n,r){let i=this.press;if(!i)return null;let o=this.holdFirst(i,t);if(o)return o;let s=n-i.x0,l=r-i.y0;if(i.locked||Math.hypot(s,l)<=10)return this.verdict(i);i.locked=!0;let c=Math.abs(s)>Math.abs(l);if(i.owner===\"widget\"&&i.gesture===\"hold\")return c?this.verdict(i):this.decide(i,\"bubble\",\"drag-y\",\"scroll\");if(i.owner!==\"pending\")return this.verdict(i);let p=c?\"drag-x\":\"drag-y\";return i.pointer===\"mouse\"||c&&i.claim.x?this.decide(i,\"widget\",p):this.decide(i,\"bubble\",p,c?i.edge?\"back\":\"swipe\":\"scroll\")}tick(t){let n=this.press;return n?this.holdFirst(n,t)??this.verdict(n):null}up(t,n,r){let i=this.press;if(!i)return null;let o=this.move(t,n,r);return this.press=null,i.owner!==\"pending\"?o.cancel||o.event?o:this.verdict(i):i.second?this.decide(i,\"widget\",\"double-tap\",void 0,\"dblclick\"):(this.lastTap={t,x:i.x0,y:i.y0},this.decide(i,\"widget\",\"tap\"))}cancel(){this.press=null,this.lastTap=null}holdDeadline(){let t=this.press;return t&&t.owner===\"pending\"&&t.pointer!==\"mouse\"?t.t0+500:null}holdFirst(t,n){return t.owner!==\"pending\"||t.pointer===\"mouse\"||n-t.t0<500?null:t.claim.hold?this.decide(t,\"widget\",\"hold\",void 0,\"contextmenu\"):this.decide(t,\"bubble\",\"hold\",\"menu\")}decide(t,n,r,i,o){t.owner=n,t.gesture=r,t.action=i;let s=this.verdict(t);return s.cancel=n===\"bubble\",o&&(s.event=o),s}verdict(t){let n={owner:t.owner,gesture:t.gesture,cancel:!1};return t.action&&(n.action=t.action),t.edge&&(n.edge=!0),n}};var wi=e=>(e??\"\").trim().toLowerCase(),Co=e=>{let t=wi(e);return t===\"\"||t===\"none\"};function Gd(e){let t=[],n=0,r=0;for(let i=0;i<e.length;i++){let o=e[i];o===\"(\"?n++:o===\")\"?n=Math.max(0,n-1):o===\",\"&&n===0&&(t.push(e.slice(r,i)),r=i+1)}return t.push(e.slice(r)),t.map(i=>i.trim()).filter(Boolean)}var Bb=/^[+-]?(\\d+\\.?\\d*|\\.\\d+)(e[+-]?\\d+)?[a-z%]*$/i,Qb=/^(calc|min|max|clamp)$/i;function Hb(e){let t=[],n=0;for(;n<e.length;){if(/\\s/.test(e[n])){n++;continue}let r=n;for(;r<e.length&&!/[\\s(]/.test(e[r]);)r++;let i=e.slice(n,r);if(e[r]===\"(\"){let o=0,s=r;for(;s<e.length;s++)if(e[s]===\"(\")o++;else if(e[s]===\")\"&&--o===0){s++;break}Qb.test(i)&&t.push(NaN),n=s;continue}Bb.test(i)&&t.push(parseFloat(i)),n=r}return t}function Vd(e){let t=Hb(e);return t.length>=3&&!(t[2]<=0)}function _o(e){return Co(e)?!1:Gd(e).some(Vd)}function jd(e){if(Co(e))return\"none\";let t=Gd(e).filter(n=>!Vd(n));return t.length?t.join(\", \"):\"none\"}function Wb(e){if(typeof e==\"number\")return e<1;let t=wi(e);return t?(t.endsWith(\"%\")?parseFloat(t)/100:parseFloat(t))<1:!1}function Lo(e){return wi(e)===\"none\"}function $d(e,t=!1){let n=wi(e.display);if(n===\"none\"||!t&&n===\"contents\")return null;if(t){let s=wi(e.content);if(s===\"\"||s===\"none\"||s===\"normal\")return null}let r=!Co(e.backdropFilter),i=!t&&(e.button===\"disabled\"||e.button===\"pressed\");return{heavy:r||!Co(e.filter)||!i&&Wb(e.opacity)||_o(e.boxShadow),backdrop:r}}function Ub(e){return e.replace(/[A-Z]/g,t=>\"-\"+t.toLowerCase()).toLowerCase().replace(/^-(webkit|moz|ms|o)-/,\"\")}var Gb=new Set([\"offset\",\"computedoffset\",\"easing\",\"composite\"]);function Po(e){let t=!1,n=!1,r=!1,i=!1,o=!1,s=!1;for(let l of e){let c=typeof l.computedOffset==\"number\"?l.computedOffset:typeof l.offset==\"number\"?l.offset:null;for(let p of Object.keys(l)){if(Gb.has(p.toLowerCase()))continue;let f=Ub(p);if(f===\"backdrop-filter\")t=n=!0;else if(f===\"filter\"||f===\"opacity\")t=!0;else if(f===\"box-shadow\"){r=!0;let m=l[p];(typeof m!=\"string\"||_o(m))&&(i=!0),c===0&&(o=!0),c===1&&(s=!0)}}}return r&&(i||!o||!s)&&(t=!0),t?{heavy:t,backdrop:n}:null}var Ao=class{boxes=new Map;heavyBoxes=0;backdropBoxes=0;stopped=null;peakHeavy=0;peakBackdrop=0;get heavy(){return this.heavyBoxes}get backdrop(){return this.backdropBoxes}contribution(t){if(!t||!t.paint)return{heavy:!1,backdrop:!1};let n=t.paint.heavy,r=t.paint.backdrop;if(t.anims)for(let i of t.anims.values())n=!0,i.backdrop&&(r=!0);return{heavy:n,backdrop:r}}update(t,n){let r=this.boxes.get(t),i=this.contribution(r);r||(r={paint:null,anims:null}),n(r);let o=this.contribution(r);this.heavyBoxes+=Number(o.heavy)-Number(i.heavy),this.backdropBoxes+=Number(o.backdrop)-Number(i.backdrop),r.paint||r.anims?this.boxes.set(t,r):this.boxes.delete(t),this.heavyBoxes>this.peakHeavy&&(this.peakHeavy=this.heavyBoxes),this.backdropBoxes>this.peakBackdrop&&(this.peakBackdrop=this.backdropBoxes)}setBox(t,n){!n&&!this.boxes.has(t)||this.update(t,r=>{r.paint=n?{heavy:n.heavy,backdrop:n.backdrop}:null})}removeBox(t){this.boxes.has(t)&&this.update(t,n=>{n.paint=null,n.anims=null})}startAnimation(t,n,r){this.update(t,i=>{i.anims??=new Map;let o=i.anims.get(n);o?(o.n++,o.backdrop||=r.backdrop):i.anims.set(n,{n:1,backdrop:r.backdrop})})}endAnimation(t,n){let r=this.boxes.get(t)?.anims?.get(n);r&&this.update(t,i=>{--r.n>0||(i.anims.delete(n),i.anims.size||(i.anims=null))})}animating(t,n){return!!this.boxes.get(t)?.anims?.has(n)}check(){return this.stopped?this.stopped:(this.heavyBoxes>16?this.stopped={code:\"paint-limit\",count:this.heavyBoxes}:this.backdropBoxes>2&&(this.stopped={code:\"backdrop-limit\",count:this.backdropBoxes}),this.stopped)}};var Jd=e=>1e5+50*e;function Ro(e){return/grid|\\b(?:var|attr|env)\\(|^\\s*(?:inherit|revert-layer)\\s*$/i.test(e)}function Mo(e){return/\\b(?:var|attr|env)\\(|^\\s*(?:inherit|revert-layer)\\s*$/i.test(e)}function Pa(e,t){return!/^\\s*(?:none\\s*(?:,\\s*none\\s*)*)?$/i.test(e)||/\\b(?:var|attr|env)\\(/i.test(t)}var Vb=new Set([\"root\",\"scope\",\"empty\",\"first-child\",\"last-child\",\"only-child\",\"first-of-type\",\"last-of-type\",\"only-of-type\",\"nth-child\",\"nth-last-child\",\"nth-of-type\",\"nth-last-of-type\",\"defined\",\"not\"]),jb=new Set([\"is\",\"where\",\"has\",\"matches\",\"any\",\"-webkit-any\",\"-moz-any\"]),$b=new Set([\"before\",\"after\",\"first-line\",\"first-letter\"]),qb=/^\\[\\s*(?:[\\w*-]*\\|)?(?:style|open|data-tw-[\\w-]*)\\s*(?:[~|^$*]?=|\\])/i,Jb=/[\\w-]/;function Yd(e,t){let n=e[t],r=t+1;for(;r<e.length&&e[r]!==n;)r+=e[r]===\"\\\\\"?2:1;return Math.min(r+1,e.length)}function qd(e,t){let n=e[t],r=n===\"[\"?\"]\":\")\",i=0;for(let o=t;o<e.length;){let s=e[o];if(s===\"\\\\\"){o+=2;continue}if(s==='\"'||s===\"'\"){o=Yd(e,o);continue}if(s===n)i++;else if(s===r&&--i===0)return o+1;o++}return e.length}function La(e){let t=\"\",n=!1;for(let r=0;r<e.length;){let i=e[r];if(i===\"\\\\\"){t+=e.slice(r,r+2),r+=2;continue}if(i==='\"'||i===\"'\"){let p=Yd(e,r);t+=e.slice(r,p),r=p;continue}if(i===\"[\"){let p=qd(e,r),f=e.slice(r,p);qb.test(f)?(t+=\":is(*)\",n=!0):t+=f,r=p;continue}if(i!==\":\"){t+=i,r++;continue}let o=e[r+1]===\":\",s=r+(o?2:1);for(;s<e.length&&(Jb.test(e[s])||e[s]===\"\\\\\");)s+=e[s]===\"\\\\\"?2:1;let l=e.slice(r+(o?2:1),s).toLowerCase(),c=null;if(e[s]===\"(\"){let p=qd(e,s);c=e.slice(s+1,p-1),s=p}if(o||$b.has(l))t+=\":is(*)\";else if(jb.has(l)&&c!==null){let p=La(c);t+=\":\"+l+\"(\"+p.out+\")\",n||=p.dynamic}else Vb.has(l)&&(c===null||!La(c).dynamic)?t+=e.slice(r,s):(t+=\":is(*)\",n=!0);r=s}return{out:t,dynamic:n}}function Kd(e){return La(e).out}var No=class{scripted=new Map;cssIds=new WeakMap;cssById=new Map;cssSeq=0;startTimes=new Map},ki=e=>\"transitionProperty\"in e,Ra=e=>\"animationName\"in e,Yb=new Set([\"offset\",\"easing\",\"composite\",\"computedOffset\"]);function Zd(e,t,n,r){let{cssIds:i,cssById:o}=e,s=[],l=new Map;for(let c of t.getAnimations({subtree:n})){let p=Ra(c),f=ki(c);if(!p&&!f||c.currentTime===null)continue;let m=i.get(c);m===void 0&&(m=++e.cssSeq,i.set(c,m),o.set(m,new WeakRef(c)));let g=c.effect?.target??null,S=g?r(g):0;if(!S)continue;let x=c.effect.getTiming(),L=l.get(S)??0;l.set(S,L+1),s.push({kind:p?\"animation\":\"transition\",id:S,name:p?c.animationName:c.transitionProperty,index:L,origin:m,currentTime:c.currentTime,playbackRate:c.playbackRate,paused:c.playState===\"paused\",duration:typeof x.duration==\"number\"?x.duration:0,delay:x.delay,iterations:x.iterations===1/0?null:x.iterations,direction:x.direction,fill:x.fill,easing:x.easing})}return s}var Kb=e=>e.startsWith(\"--\")?e:e===\"float\"?\"cssFloat\":e.replace(/^-(webkit|moz|ms)-/,\"$1-\").replace(/-([a-z])/g,(t,n)=>n.toUpperCase());function Xd(e){let t=e?.ownerDocument?.defaultView;return t&&t!==window?performance.timeOrigin-t.performance.timeOrigin:0}function ef(e,t,n,r){let{scripted:i,cssById:o}=e,s=performance.now()-Number(t);for(let l of n){if(\"css\"in l){let x=o.get(l.css.origin)?.deref();if(!x||x.effect?.target!==r(l.target))continue;try{l.cancelled?x.cancel():(x.playbackRate=l.playbackRate,l.holdTime!==null?(x.pause(),x.currentTime=l.holdTime):x.startTime=l.startTime+s+Xd(r(l.target)))}catch{}continue}let c=i.get(l.aid);if(e.startTimes.delete(l.aid),\"remove\"in l){c&&(c.cancel(),i.delete(l.aid));continue}let p=r(l.target);if(!(p instanceof Element)){c&&(c.cancel(),i.delete(l.aid));continue}let f=l.keyframes.map(x=>{let L={};for(let Q of Object.keys(x.values)){let R=Kb(Q);Yb.has(R)||(L[R]=x.values[Q])}return L.offset=x.offset,L.easing=x.easing,x.composite&&(L.composite=x.composite),L}),m=l.timing,g={duration:m.duration,delay:m.delay,endDelay:m.endDelay,iterations:m.iterations===null?1/0:m.iterations,iterationStart:m.iterationStart,direction:m.direction,fill:m.fill,easing:m.easing},S=c;try{let x=S?.effect;!S||!x||x.target!==p?(S&&S.cancel(),S=new Animation(new KeyframeEffect(p,f,{composite:l.composite,iterationComposite:l.iterationComposite,...g}),p.ownerDocument.timeline),i.set(l.aid,S)):(x.setKeyframes(f),x.updateTiming(g),x.composite=l.composite,\"iterationComposite\"in x&&(x.iterationComposite=l.iterationComposite)),S.playbackRate=l.playbackRate,l.holdTime!==null?(S.pause(),S.currentTime=l.holdTime):(S.startTime=l.startTime+s+Xd(p),e.startTimes.set(l.aid,S.startTime))}catch{try{S?.cancel()}catch{}i.delete(l.aid)}}}var ar=\"--tw-touch-action\",Xb=new Set([\"pan-y\",\"pan-up\",\"pan-down\"]);function Ma(e){let t=e.trim().toLowerCase().split(/\\s+/).filter(Boolean);return t.length===0||t.length===1&&[\"auto\",\"manipulation\",\"inherit\",\"initial\",\"unset\",\"revert\",\"revert-layer\",\"pan-y\"].includes(t[0])?e:t.length===1&&t[0]===\"none\"?\"pan-y\":t.includes(\"pan-y\")?e:[...t.filter(n=>!Xb.has(n)),\"pan-y\"].join(\" \")}var ex=\"http://www.w3.org/2000/svg\",qe=e=>(t,...n)=>e.apply(t,n),Mt=(e,t)=>{let n=Object.getOwnPropertyDescriptor(e,t).get;return r=>n.call(r)},Oo=(e,t)=>{let n=Object.getOwnPropertyDescriptor(e,t).set;return(r,i)=>n.call(r,i)},un=qe(Document.prototype.createElement),tx=qe(Document.prototype.createElementNS),tf=qe(Document.prototype.createTextNode),Na=qe(Element.prototype.setAttribute),Ia=qe(Element.prototype.getAttribute),nx=qe(Element.prototype.removeAttribute),rx=qe(Element.prototype.closest),ix=qe(Element.prototype.getBoundingClientRect),ox=qe(Element.prototype.getClientRects),Vt=qe(Node.prototype.insertBefore),Dr=qe(Node.prototype.removeChild),Pe=Mt(Node.prototype,\"parentNode\"),jt=Mt(Node.prototype,\"firstChild\"),Fr=Mt(Node.prototype,\"nextSibling\"),nf=Mt(Element.prototype,\"localName\"),lr=Oo(Node.prototype,\"textContent\"),sx=Mt(Node.prototype,\"textContent\"),Io=Oo(CharacterData.prototype,\"data\"),ax=Mt(HTMLElement.prototype,\"style\"),lx=Mt(SVGElement.prototype,\"style\"),pn=e=>e instanceof SVGElement?lx(e):ax(e),Oa=Mt(HTMLStyleElement.prototype,\"sheet\"),Si=Mt(Node.prototype,\"isConnected\"),zr=qe(Element.prototype.matches),rf=qe(Element.prototype.getAnimations),cx=new Set([\"script\",\"iframe\",\"frame\",\"frameset\",\"object\",\"embed\",\"link\",\"meta\",\"base\",\"portal\",\"noscript\",\"set\",\"template\",\"audio\",\"video\",\"source\",\"track\",\"input\",\"select\",\"option\",\"optgroup\",\"textarea\",\"datalist\",\"fieldset\",\"progress\",\"meter\",\"form\",\"dialog\"]),ux=new Set([\"srcdoc\",\"srcset\",\"action\",\"formaction\",\"ping\",\"background\",\"nonce\",\"target\",\"http-equiv\"]),px=Oo(Element.prototype,\"scrollTop\"),dx=Oo(Element.prototype,\"scrollLeft\"),of=(e,t)=>{let n=t?.x??0,r=t?.y??0,i=t?.scale??1;if(i!==1){let o=(e.x-n)/i,s=(e.y-r)/i,l=e.width/i,c=e.height/i;return{x:o,y:s,width:l,height:c,top:s,left:o,right:o+l,bottom:s+c}}return{x:e.x-n,y:e.y-r,width:e.width,height:e.height,top:e.top-r,left:e.left-n,right:e.right-n,bottom:e.bottom-r}},Da=e=>e?{a:e.a,b:e.b,c:e.c,d:e.d,e:e.e,f:e.f}:null,sf=new Set([\"click\",\"load\",\"error\",\"toggle\"]),fx=new Set([\"pointermove\",\"mousemove\"]),af=[...xo],mx=new Set([\"dblclick\",\"contextmenu\"]),hx=new Set([\"mousedown\",\"mouseup\",\"mousemove\",\"click\"]),lf=[\"pointerenter\",\"pointerleave\",\"mouseenter\",\"mouseleave\"],cf=[\"animationstart\",\"animationend\",\"animationcancel\",\"transitionstart\",\"transitionend\",\"transitioncancel\"],uf=[\"pointerover\",\"pointerout\",\"pointerdown\",\"pointerup\",\"pointercancel\",\"toggle\"],pf=()=>{},df=[\"keydown\",\"keyup\",\"keypress\",\"beforeinput\",\"input\",\"contextmenu\",\"mousedown\",\"focusin\",\"submit\",\"selectstart\"];function gx(e){let t=atob(e),n=new Uint8ClampedArray(t.length);for(let r=0;r<t.length;r++)n[r]=t.charCodeAt(r);return n}var ff=new Map;function mf(e){let t=ff.get(e);return t||(t=new Image,t.src=e,ff.set(e,t)),t.complete&&t.naturalWidth?t:void 0}function hf(e){let t=e.doc,n=e.root,r=n instanceof Document?qe(Document.prototype.elementFromPoint):qe(ShadowRoot.prototype.elementFromPoint),i=()=>{},o=(a,u=[])=>i(a,u),s=a=>o({type:\"violation\",detail:a}),l,c,p,f=new Map,m=new WeakMap,g=new No;function S(a,u){f.set(a,u),m.set(u,a)}let x=new WeakMap,L=new Set([\"style\",\"title\",\"textarea\",\"option\",\"script\"]),Q=\"@layer tw-text{tw-text,tw-emoji{all:unset!important;direction:inherit!important;unicode-bidi:normal!important;pointer-events:none!important}tw-text{display:inline!important}tw-emoji{display:inline-block!important;width:1em!important;height:1em!important;vertical-align:-.15em!important;line-height:1!important;text-indent:100%!important;white-space:nowrap!important;overflow:hidden!important;color:transparent!important;text-shadow:none!important;background-position:center!important;background-size:contain!important;background-repeat:no-repeat!important}tw-text::before,tw-text::after,tw-emoji::before,tw-emoji::after{content:none!important}tw-emoji::first-letter,tw-emoji::first-line{all:unset!important}}\",R=1024,H=2048,F=0,W=R,ce=0;function J(a,u){if(!a||!e.emoji)return;let d=performance.now();W=Math.min(R,W+(d-ce)*H/1e3),ce=d;let h=Math.floor(u===void 0?W:Math.min(W,R-F+u)),b=e.emoji(a,h+1);return b&&b.length-1<=h?b:void 0}function X(a){W-=a.length-1}let G=a=>a.nodeType===3,Z=a=>!!a&&a.nodeType===1&&a.namespaceURI===\"http://www.w3.org/1999/xhtml\"&&!L.has(nf(a));function ue(a){let u=G(a)?x.get(a):void 0;return u?.active?u.wrapper:a}function Ge(a,u){let d=Pe(u);d?(Vt(d,a,u),Dr(d,u)):Dr(u,a)}function Ce(a){let u=x.get(a);if(!u)return;let{wrapper:d}=u,h=u.active?Pe(d):Pe(a);if(!Z(h)){u.active&&Ge(a,d),u.active=!1,Io(a,u.data);return}u.active||(Vt(h,d,a),Vt(d,a,jt(d)),u.active=!0),Io(a,u.lead)}function Je(a,u){let d=x.get(a),h=J(u,d?.extra??0);if(!h){d&&(d.active&&Ge(a,d.wrapper),F-=d.extra,x.delete(a)),Io(a,u);return}if(X(h),!d){let b=un(t,\"tw-text\");x.set(a,d={data:u,lead:\"\",wrapper:b,parts:[],extra:0,active:!1})}for(let b of d.parts)Dr(d.wrapper,b);F+=h.length-1-d.extra,d.extra=h.length-1,d.data=u,d.lead=typeof h[0]==\"string\"?h[0]:\"\",d.parts=(d.lead?h.slice(1):h).map(b=>{if(typeof b==\"string\")return tf(t,b);let T=un(t,\"tw-emoji\");return T.style.cssText=`background-image:url(\"${b.src.replace(/[\"\\\\\\n]/g,\"\")}\")!important`,lr(T,b.emoji),mf(b.src),T});for(let b of d.parts)Vt(d.wrapper,b,null);Ce(a)}function Ye(a){let u=m.get(a);if(u!==void 0){if(f.delete(u),m.delete(a),ht.delete(u),a instanceof Element){Zn.unobserve(a),oi.delete(a),Pn.delete(a),er.delete(a),tr.delete(a),pi.delete(a);for(let h of Mn.get(a)??[])no.delete(h);Mn.delete(a)}a instanceof HTMLCanvasElement&&(Ve-=Xe.get(a)??0,Xe.delete(a));let d=G(a)?x.get(a):void 0;d&&(F-=d.extra,x.delete(a)),a instanceof HTMLStyleElement&&Er.delete(a)&&(li=Lr=!0,Ar())}for(let d=jt(a);d;d=Fr(d))Ye(d)}let Ke=4096*4096,Xe=new Map,Ve=0;function Tt(a,u,d){let h=Ve-(Xe.get(a)??0);return h+u*d<=Ke?(Xe.set(a,u*d),Ve=h+u*d,!0):(s(`canvas ${u}\\xD7${d}: a widget's canvases hold at most ${Ke} pixels together`),!1)}function Se(a,u,d){if(!(a instanceof HTMLCanvasElement)||u!==\"width\"&&u!==\"height\")return!0;let h=/^[\\t\\n\\f\\r ]*\\+?(\\d+)/.exec(d??\"\"),b=h?Number(h[1]):u===\"width\"?300:150;return Tt(a,u===\"width\"?b:a.width,u===\"height\"?b:a.height)}function je(a){for(let u=a;u;u=Pe(u)){let d=m.get(u);if(d!==void 0)return d}return 0}function mt(a,u,d){let h=u.toLowerCase();if(h.startsWith(\"on\")||ux.has(h))return s(`attribute ${u}`);a instanceof HTMLCanvasElement&&(h===\"width\"||h===\"height\")&&Ia(a,h)===d||Se(a,h,d)&&(Na(a,u,d),h===\"style\"&&Wt(pn(a)))}function Wt(a){let u=a.getPropertyValue(\"touch-action\");if(!u)return;let d=a.getPropertyPriority(\"touch-action\");a.setProperty(ar,u,d);let h=Ma(u);h!==u&&a.setProperty(\"touch-action\",h,d)}function Et(a){let u=a.getPropertyValue(ar).trim(),d=h=>h.trim().toLowerCase().split(/\\s+/).sort().join(\" \");return u&&d(a.touchAction)===d(Ma(u))?u:a.touchAction}function xe(a,u=!1){if(!(a instanceof HTMLStyleElement)||!/touch-action/i.test(a.textContent??\"\"))return;let d=Oa(a);if(!d)return;let h=b=>{for(let T=0;T<b.length;T++){let A=b[T];A.style&&!(u&&A.style.getPropertyValue(ar))&&Wt(A.style),A.cssRules&&h(A.cssRules)}};h(d.cssRules)}function Zt(a){switch(a.op){case\"el\":{let d=a.tag.toLowerCase();if(cx.has(d))return s(`element <${a.tag}>`);let h;if(a.adopt&&(Pr=!0),a.adopt===\"html\"?h=l:a.adopt===\"head\"?h=c:a.adopt===\"body\"?h=p:h=a.ns===\"svg\"?tx(t,ex,a.tag):un(t,a.tag),d===\"img\"&&!a.adopt)for(let b of[\"load\",\"error\"])h.addEventListener(b,C);S(a.id,h),h instanceof HTMLCanvasElement&&!Tt(h,300,150)&&(h.width=0,h.height=0);for(let[b,T]of a.attrs)mt(h,b,T);Ie&&an(h);return}case\"text\":{let d=tf(t,\"\");return S(a.id,d),Je(d,a.data)}case\"comment\":return}let u=f.get(a.id);if(u)switch((u===l||u===p||a.op===\"css\"||(a.op===\"ins\"||a.op===\"rm\")&&u instanceof HTMLStyleElement)&&(Pr=!0),a.op){case\"attr\":{let d=Ie&&a.name.toLowerCase()===\"style\";d&&Xi(u),mt(u,a.name,a.value),u===l&&a.name.toLowerCase()===\"style\"&&io(),d&&an(u);return}case\"rattr\":{if(!Se(u,a.name.toLowerCase(),null))return;let d=Ie&&a.name.toLowerCase()===\"style\";d&&Xi(u),nx(u,a.name),u===l&&a.name.toLowerCase()===\"style\"&&io(),d&&an(u);return}case\"data\":return G(u)?Je(u,a.data):Io(u,a.data);case\"ins\":{if(u===l||u===c||u===p)return;let d=ue(u);if(a.parent===0){let A=Pe(d);A&&Dr(A,d);return}let h=f.get(a.parent);if(!h)return;let b=a.before===null?void 0:f.get(a.before),T=b?ue(b):null;Vt(h,d,T&&Pe(T)===h?T:null),G(u)&&Ce(u),xe(u);return}case\"rm\":{if(u===l||u===c||u===p)return;let d=ue(u),h=Pe(d);h&&Dr(h,d),Ye(u);return}case\"style\":{if(u===l&&Aa.includes(a.name))return;let d=pn(u),h=Ie&&py.test(a.name);h&&Xi(u),a.name===\"touch-action\"&&d.removeProperty(ar),a.value===\"\"?d.removeProperty(a.name):d.setProperty(a.name,a.value,a.important?\"important\":\"\"),a.name===\"touch-action\"&&Wt(d),h&&an(u);return}case\"css\":nf(u)===\"style\"&&(lr(u,a.text),xe(u));return;case\"prop\":return lt(u,a.name,a.value);case\"call\":return en(u,a.method,a.args);case\"canvas\":u instanceof HTMLCanvasElement&&kr(a.id,u,a.cmds);return}}function lt(a,u,d){switch(u){case\"scrollTop\":return px(a,d);case\"scrollLeft\":return dx(a,d)}}let Ze={scrollTo:(a,u)=>Element.prototype.scrollTo.call(a,u[0],u[1]),scrollBy:(a,u)=>Element.prototype.scrollBy.call(a,u[0],u[1]),setPointerCapture:(a,u)=>{if(Mr.has(u[0]))try{Element.prototype.setPointerCapture.call(a,u[0])}catch{}},releasePointerCapture:(a,u)=>{try{Element.prototype.releasePointerCapture.call(a,u[0])}catch{}},observeResize:a=>{oi.add(a),Zn.observe(a)},unobserveResize:a=>{oi.delete(a),Zn.unobserve(a)}};function en(a,u,d){let h=Object.prototype.hasOwnProperty.call(Ze,u)?Ze[u]:null;h&&h(a,d)}let ht=new Map;function En(a,u){let d=ht.get(a);if(!d){let h=HTMLCanvasElement.prototype.getContext.call(u,\"2d\");if(!h)return null;d={ctx:h,objects:new Map,paths:new Map},ht.set(a,d)}return d}function Ut(a,u){if(u&&typeof u==\"object\"&&!Array.isArray(u)){if(\"g\"in u)return a.objects.get(u.g)??void 0;if(\"p\"in u)return a.paths.get(u.p)??void 0;if(\"n\"in u)return f.get(u.n);if(\"b64\"in u)try{return new ImageData(gx(u.b64),u.w,u.h)}catch{return}}return u}let Ct=/[\\u0590-\\u08FF\\uFB1D-\\uFDFF\\uFE70-\\uFEFF\\u200F\\u202B\\u202E\\u2067\\u{10800}-\\u{10FFF}\\u{1E800}-\\u{1EFFF}]/u,Gn=a=>parseFloat(/([\\d.]+)px/.exec(a)?.[1]??\"10\"),wr=a=>a.globalCompositeOperation===\"source-over\"&&(a.filter??\"none\")===\"none\"&&!((a.shadowBlur||a.shadowOffsetX||a.shadowOffsetY)&&!/, 0\\)$/.test(a.shadowColor));function Vn(a,u){let d=a.textBaseline;if(d===\"alphabetic\")return u;let h=a.measureText(\"H\").actualBoundingBoxAscent;a.textBaseline=\"alphabetic\";let b=a.measureText(\"H\").actualBoundingBoxAscent;return a.textBaseline=d,u-h+b}function Ae(a,u,d){let[h,b,T,A]=d,O=Ct.test(String(h))?void 0:J(String(h));if(!O||!wr(a)||a.direction===\"rtl\"||a.direction===\"inherit\"&&getComputedStyle(a.canvas).direction===\"rtl\")return!1;let M=Gn(a.font),z=Vn(a,T)-.35*M-M/2;if(!Number.isFinite(z))return!1;X(O);let ae=O.map(tt=>a.measureText(typeof tt==\"string\"?tt:tt.emoji).width),ge=ae.reduce((tt,ea)=>tt+ea,0),Fe=A!==void 0&&ge>A?Math.max(A,0)/ge:1,Zs=a.textAlign,lo=b-(Zs===\"center\"?ge*Fe/2:Zs===\"right\"||Zs===\"end\"?ge*Fe:0);return a.save(),a.textAlign=\"left\",a.imageSmoothingEnabled=!0,O.forEach((tt,ea)=>{let ta=ae[ea]*Fe,Ip=typeof tt==\"string\"?void 0:mf(tt.src);Ip?a.drawImage(Ip,lo+(ta-M*Fe)/2,z,M*Fe,M):Fe!==1?a[u](typeof tt==\"string\"?tt:tt.emoji,lo,T,ta):a[u](typeof tt==\"string\"?tt:tt.emoji,lo,T),lo+=ta}),a.restore(),!0}function kr(a,u,d){let h=En(a,u);if(!h)return;let b=h.ctx;for(let T of d)try{let[A,O,...M]=T;switch(A){case\"c\":{let z=M.map(ae=>Ut(h,ae));if(z.includes(void 0)||(O===\"fillText\"||O===\"strokeText\")&&Ae(b,O,z))break;b[O](...z);break}case\"s\":b[O]=Ut(h,M[0]);break;case\"r\":if(!Tt(u,O,M[0])){u.width=u.width;break}u.width=O,u.height=M[0];break;case\"g\":{let[z,...ae]=M,ge=null;if(z===\"linear\")ge=b.createLinearGradient(...ae);else if(z===\"radial\")ge=b.createRadialGradient(...ae);else if(z===\"conic\")ge=b.createConicGradient(...ae);else if(z===\"pattern\"){let Fe=Ut(h,ae[0]);Fe&&(ge=b.createPattern(Fe,ae[1]??\"repeat\"))}h.objects.set(O,ge);break}case\"gs\":h.objects.get(O)?.addColorStop(M[0],M[1]);break;case\"pn\":h.paths.set(O,typeof M[0]==\"string\"?new Path2D(M[0]):new Path2D);break;case\"pc\":{let z=h.paths.get(O),[ae,...ge]=M;z&&z[ae](...ge.map(Fe=>Ut(h,Fe)));break}}}catch{}}let gt=null;function y(a){let u=\"id\"in a?f.get(a.id):null;if(\"id\"in a&&!(u instanceof Element))return{result:{error:\"no such element\"}};switch(a.q){case\"rect\":return{result:of(ix(u),e.origin())};case\"rects\":{let d=e.origin();return{result:Array.from(ox(u),h=>of(h,d))}}case\"box\":{let d=T=>Mt(Element.prototype,T)(u),h=u instanceof HTMLElement,b=T=>h?Mt(HTMLElement.prototype,T)(u):0;return{result:{offsetWidth:b(\"offsetWidth\"),offsetHeight:b(\"offsetHeight\"),offsetTop:b(\"offsetTop\"),offsetLeft:b(\"offsetLeft\"),offsetParent:h?je(b(\"offsetParent\")):0,clientWidth:d(\"clientWidth\"),clientHeight:d(\"clientHeight\"),clientTop:d(\"clientTop\"),clientLeft:d(\"clientLeft\"),scrollWidth:d(\"scrollWidth\"),scrollHeight:d(\"scrollHeight\"),scrollTop:d(\"scrollTop\"),scrollLeft:d(\"scrollLeft\")}}}case\"cs\":{let d=getComputedStyle(u,a.pseudo??null),h=()=>Et(d);if(a.prop)return{result:a.prop===\"touch-action\"?h():d.getPropertyValue(a.prop)};let b={};for(let T=0;T<d.length;T++)d[T]!==ar&&(b[d[T]]=d.getPropertyValue(d[T]));return b[\"touch-action\"]=h(),{result:b}}case\"svg\":{try{let d=a.args??[];switch(a.method){case\"getBBox\":{let h=u.getBBox();return{result:{x:h.x,y:h.y,width:h.width,height:h.height}}}case\"getCTM\":return{result:Da(u[a.method]())};case\"getScreenCTM\":{let h=Da(u.getScreenCTM()),b=e.origin();if(h&&b){let T=b.scale??1;h.e=(h.e-b.x)/T,h.f=(h.f-b.y)/T,T!==1&&(h.a/=T,h.b/=T,h.c/=T,h.d/=T)}return{result:h}}case\"getPointAtLength\":{let h=u.getPointAtLength(d[0]??0);return{result:{x:h.x,y:h.y}}}case\"getComputedTextLength\":case\"getTotalLength\":case\"getNumberOfChars\":return{result:u[a.method]()};case\"getSubStringLength\":return{result:u.getSubStringLength(d[0]??0,d[1]??0)}}}catch(d){return{result:{error:String(d)}}}return{result:{error:\"unsupported\"}}}case\"measureText\":{gt??=HTMLCanvasElement.prototype.getContext.call(un(t,\"canvas\"),\"2d\"),gt.font=\"10px sans-serif\",gt.font=a.font;let d=gt.measureText(a.text);return{result:{width:d.width,actualBoundingBoxLeft:d.actualBoundingBoxLeft,actualBoundingBoxRight:d.actualBoundingBoxRight,actualBoundingBoxAscent:d.actualBoundingBoxAscent,actualBoundingBoxDescent:d.actualBoundingBoxDescent,fontBoundingBoxAscent:d.fontBoundingBoxAscent,fontBoundingBoxDescent:d.fontBoundingBoxDescent}}}case\"imageData\":{let d=En(a.id,u);if(!d)return{result:{error:\"no context\"}};let h=d.ctx.getImageData(a.x,a.y,a.w,a.h),b=h.data.buffer.slice(0);return{result:{width:h.width,height:h.height},binary:b}}case\"canvasCall\":{let d=En(a.id,u);if(!d)return{result:{error:\"no context\"}};let h=(a.args??[]).map(b=>Ut(d,b));try{switch(a.method){case\"isPointInPath\":case\"isPointInStroke\":return{result:d.ctx[a.method](...h)};case\"getTransform\":return{result:Da(d.ctx.getTransform())};case\"getLineDash\":return{result:d.ctx.getLineDash()};case\"toDataURL\":return{result:HTMLCanvasElement.prototype.toDataURL.call(u,...h)}}}catch(b){return{result:{error:String(b)}}}return{result:{error:\"unsupported\"}}}case\"elementFromPoint\":{let d=e.origin(),h=d?.scale??1;return{result:je(r(n,a.x*h+(d?.x??0),a.y*h+(d?.y??0)))}}case\"validity\":{let d=u.validity;if(!d)return{result:{valid:!0,message:\"\"}};let h={message:u.validationMessage};for(let b of[\"valid\",\"valueMissing\",\"typeMismatch\",\"patternMismatch\",\"tooLong\",\"tooShort\",\"rangeUnderflow\",\"rangeOverflow\",\"stepMismatch\",\"badInput\",\"customError\"])h[b]=d[b];return{result:h}}case\"matchMedia\":return{result:{matches:e.matchMedia(a.query)}};case\"viewport\":return{result:e.viewport()};case\"anims\":return{result:{list:Zd(g,u,a.subtree===!0,je)}}}}let v=new Set,P=new Set([\"animationstart\",\"animationiteration\",\"animationend\",\"animationcancel\",\"transitionrun\",\"transitionstart\",\"transitionend\",\"transitioncancel\"]),w=1e3,Y=64,V=[],pe=()=>performance.timeOrigin+performance.now(),we=new Set,se=new Map,K=0,ee=0,he=!1,Cn=new Map,An=16,ni=new Set([\"pointerup\",\"pointercancel\",\"pointerout\",\"pointerleave\",\"lostpointercapture\",\"click\",\"auxclick\"]),jn=a=>\"clientX\"in a,$n=a=>\"pointerId\"in a;function qn(a,u){let d={type:a.type,targetId:u},h=a.target;if(jn(a)){let b=e.origin();d.clientX=a.clientX,d.clientY=a.clientY,d.offsetX=a.offsetX,d.offsetY=a.offsetY,d.pageX=a.pageX,d.pageY=a.pageY,d.movementX=a.movementX,d.movementY=a.movementY;let T=$n(a)?\"p\"+a.pointerId:\"m\",A=Cn.get(T);if(A&&!a.movementX&&!a.movementY&&a.type.endsWith(\"move\")){let O=a.screenX!==A[0]||a.screenY!==A[1];d.movementX=O?a.screenX-A[0]:a.clientX-A[2],d.movementY=O?a.screenY-A[1]:a.clientY-A[3]}if(Cn.delete(T),$n(a)&&a.pointerType===\"touch\"&&ni.has(a.type)||(Cn.set(T,[a.screenX,a.screenY,a.clientX,a.clientY]),Cn.size>An&&Cn.delete(Cn.keys().next().value)),b){let O=b.scale??1;d.clientX=(d.clientX-b.x)/O,d.clientY=(d.clientY-b.y)/O,d.pageX=d.clientX,d.pageY=d.clientY,O!==1&&(d.movementX/=O,d.movementY/=O)}d.button=a.button,d.buttons=a.buttons,d.detail=a.detail,a.relatedTarget&&(d.relatedId=je(a.relatedTarget))}if($n(a)&&(d.pointerId=a.pointerId,d.pointerType=a.pointerType,d.isPrimary=a.isPrimary,d.pressure=a.pressure),jn(a)){let b=a;d.modifiers=(b.altKey?1:0)|(b.ctrlKey?2:0)|(b.metaKey?4:0)|(b.shiftKey?8:0)}if(h instanceof HTMLImageElement&&a.type===\"load\"&&(d.naturalWidth=h.naturalWidth,d.naturalHeight=h.naturalHeight),\"animationName\"in a){let b=a;d.animationName=b.animationName,d.elapsedTime=b.elapsedTime,d.pseudoElement=b.pseudoElement}if(\"propertyName\"in a){let b=a;d.propertyName=b.propertyName,d.elapsedTime=b.elapsedTime,d.pseudoElement=b.pseudoElement}return h instanceof HTMLDetailsElement&&a.type===\"toggle\"&&(d.open=h.open),d}function Sr(a,u){let d=[];for(let h=a??l;h&&h instanceof Element;h=h===l?null:Pe(h)){let b=getComputedStyle(h);d.push(b.getPropertyValue(ar).trim()||b.touchAction)}return Ud(d,we.has(`${u}:pointerdown`)||we.has(`${u}:touchstart`))}let tn=new Eo,De=null,vr=!1,_n=-1,Jn=null,nn=0,rn=-1,Yn=!1,on=null,Ln=!1,sn=!1;function ri(a){let u=a.clientX??0,d=a.clientY??0;return{x:vr?l.clientWidth-u:u,y:d}}function At(){nn&&(clearTimeout(nn),nn=0)}function ii(){At();let a=tn.holdDeadline();a!==null&&(nn=setTimeout(()=>{if(nn=0,he)return;let u=tn.tick(Math.max(oe.performance.now(),a));u&&Jn&&k(u,Jn)},Math.max(0,a-oe.performance.now())+1))}function Bs(a,u,d,h){let b=a.type;if(b===\"pointerdown\"){if(!a.isPrimary)return null;Yn=!1,on=null;let A=Sr(u,d);o({type:\"gesture\",wants:A.y,x:A.x,y:A.y,hold:A.hold});let O=De?.touch&&a.button!==2?\"touch\":a.pointerType===\"mouse\"?\"mouse\":a.pointerType===\"pen\"?\"pen\":\"touch\";Ln=sn=O===\"touch\"&&a.pointerType===\"mouse\",Ln&&(h.pointerType=\"touch\");let M=ri(h);_n=a.pointerId,Jn=h;let z=tn.down(a.timeStamp,M.x,M.y,A,O,a.button);return ii(),z}if(a.pointerId!==_n)return null;let T=ri(h);return Ln&&(h.pointerType=\"touch\"),Jn=h,b===\"pointermove\"?tn.move(a.timeStamp,T.x,T.y):(At(),_n=-1,Ln=!1,b===\"pointerup\"?tn.up(a.timeStamp,T.x,T.y):(tn.cancel(),null))}function k(a,u){a.event===\"contextmenu\"?E({...u,type:\"contextmenu\"},!0):a.event===\"dblclick\"&&(on={...u,type:\"dblclick\",detail:2}),!(!a.cancel||!De||u.pointerId===void 0)&&(E({...u,type:\"pointercancel\",button:-1,buttons:0},!0),rn=u.pointerId,Mr.delete(u.pointerId),At(),_n=-1,Ln=sn=!1,tn.cancel(),o({type:\"bubble\",action:a.action??\"menu\",gesture:a.gesture,x:u.clientX??0,y:u.clientY??0,edge:a.edge===!0}))}function E(a,u){if(!(!sf.has(a.type)&&!v.has(a.type))){if(fx.has(a.type)){let d=a.type+\":\"+(a.pointerId??0),h=se.get(d);h&&(a.movementX=(a.movementX??0)+(h.movementX??0),a.movementY=(a.movementY??0)+(h.movementY??0)),se.set(d,a),K||(K=oe.requestAnimationFrame(_t));return}if(se.size){for(let d of se.values())o({type:\"event\",ev:d,trusted:!1});se.clear()}o({type:\"event\",ev:a,trusted:u})}}function C(a){n.contains(a.currentTarget)||N(a)}function N(a){let u=a.type,d=a.target instanceof Node?a.target:null,h=d instanceof Element?d:null;if(u===\"click\"&&h&&rx(h,\"a, area\")&&a.preventDefault(),u===\"click\"&&a.detail===0&&a.isTrusted){a.preventDefault();return}if(he)return;let b=d===n||d===null?m.get(l)??0:je(d);if(!b||(we.size&&a.cancelable&&we.has(`${b}:${u}`)&&a.preventDefault(),mx.has(u)))return;let T=null,A=null;if($n(a)&&(u===\"pointerdown\"||u===\"pointermove\"||u===\"pointerup\"||u===\"pointercancel\")){if((u===\"pointerup\"||u===\"pointercancel\")&&a.isPrimary&&a.isTrusted&&o({type:\"release\"}),a.pointerId===rn&&u!==\"pointerdown\"){(u===\"pointerup\"||u===\"pointercancel\")&&(rn=-1,Yn=u===\"pointerup\");return}if(u===\"pointerdown\"&&a.pointerId===rn&&(rn=-1),(u===\"pointerdown\"?!a.isPrimary:a.pointerId!==_n)&&!v.has(u))return;if(A=qn(a,b),T=Bs(a,h,b,A),T?.cancel&&De&&u===\"pointerup\"){k(T,A),rn=-1,Yn=!0;return}u===\"pointerup\"&&De?.touch&&T&&(T.gesture===\"drag-x\"||T.gesture===\"drag-y\"||T.gesture===\"hold\")&&(Yn=!0)}else if(hx.has(u)&&(rn!==-1||Yn&&u!==\"mousemove\"))return;let O=u===\"pointerdown\"?$n(a)&&Pp(a):(u===\"mousedown\"||u===\"mouseup\")&&ao,M=a.isTrusted&&!O&&(so||u!==\"pointerup\"&&u!==\"mouseup\");if(A)E(A,M);else if(sf.has(u)||v.has(u)){let z=qn(a,b);u===\"click\"&&sn&&z.pointerType===\"mouse\"&&(z.pointerType=\"touch\",sn=!1),E(z,M)}else if(P.has(u)){let z=pe();V.length>=Y&&(V=V.filter(ae=>z-ae.at<w)),V.length>=Y&&V.shift(),V.push({ev:qn(a,b),at:z})}if(T&&A&&k(T,A),u===\"click\"&&on){let z=on;on=null,E({...qn(a,b),type:\"dblclick\",detail:2,pointerId:z.pointerId,pointerType:z.pointerType},a.isTrusted)}}let $=\"\",re=\"\";function ie(){nr();let a=e.viewport(),u={type:\"size\",width:l.clientWidth,height:e.docHeight(),...a},d=JSON.stringify(u);d!==$&&($=d,o(u));let h=a.innerWidth+\"x\"+a.innerHeight;h!==re&&(re=h,Ar()),Hs&&Si(l)&&(Hs=!1,bt())}function _t(){K=0;for(let a of se.values())o({type:\"event\",ev:a,trusted:!1});se.clear()}let Ie=!1,yt=null,Pn=new Map;function an(a){Pn.delete(a);let u=pn(a);(u.getPropertyPriority(\"animation-play-state\")===\"important\"||u.getPropertyPriority(\"all\")===\"important\"&&u.getPropertyValue(\"animation-play-state\")!==\"\")&&(Pn.set(a,{value:u.getPropertyValue(\"animation-play-state\"),priority:u.getPropertyPriority(\"animation-play-state\")}),u.setProperty(\"animation-play-state\",\"paused\",\"important\"),lp(a))}function Xi(a){let u=Pn.get(a);u&&(Pn.delete(a),pn(a).setProperty(\"animation-play-state\",u.value,u.priority),lp(a))}let py=/^((-webkit-)?animation(-play-state)?|all)$/i;function lp(a){et.styleAttr&&xt(a,!0)}let Tr=new Set,Kn=new Set,Xn=new Map;function dy(a){for(let[d]of Xn)d.playState===\"idle\"&&Xn.delete(d);let u=a.startTime;if(!(a.playState!==\"running\"||typeof u!=\"number\")){try{a.pause()}catch{return}Xn.set(a,u)}}function cp(){for(let a of Kn)a.playState===\"idle\"&&Kn.delete(a);for(let a of up())if(!(!ki(a)||a.playState!==\"running\")){try{a.pause()}catch{continue}Kn.add(a)}}let up=()=>{try{return n.getAnimations?.()??[]}catch{return[]}};function pp(){for(let a of Tr)g.scripted.has(a)||Tr.delete(a);for(let[a,u]of g.scripted)if(u.playState===\"running\"){try{u.pause()}catch{continue}Tr.add(a)}}function fy(a){if(a!==Ie){if(Ie=a,a){yt=un(t,\"style\"),lr(yt,\"@layer tw-hidden{*,*::before,*::after{animation-play-state:paused!important}}\"),Vt(c,yt,jt(c));for(let u of f.values())u instanceof Element&&an(u);pp(),cp();return}for(let u of[...Pn.keys()])Xi(u);if(yt){try{Dr(c,yt)}catch{}yt=null}if(!he){for(let u of Tr){let d=g.scripted.get(u),h=g.startTimes.get(u);if(d&&h!==void 0&&d.playState===\"paused\")try{d.startTime=h}catch{}}for(let u of Kn)if(u.playState===\"paused\")try{u.play()}catch{}for(let[u,d]of Xn)if(u.playState===\"paused\")try{u.startTime=d}catch{}}Tr.clear(),Kn.clear(),Xn.clear(),bt()}}let oe=window;function dp(a){ee=0,o({type:\"frame\",time:a+oe.performance.timeOrigin-performance.timeOrigin})}function fp(a){let u=[];for(let d of a){let h=m.get(d.target);h!==void 0&&u.push({id:h,width:d.contentRect.width,height:d.contentRect.height})}u.length&&o({type:\"resize\",entries:u})}let oi=new Set,Zn=new ResizeObserver(fp),Lt=!0,mp=!1,Qs=\"\",ye=new Ao,er=new Set,tr=new Set,si=!0,$e=0,Hs=!1,Pt=!1,et={siblings:!1,structural:!1,hover:!1,active:!1,styleAttr:!1},my=/^--|opacity|filter|box-shadow|^display$|^all$/i,hp=/--|\\\\|(?:opacity|filter|box-shadow|display|all)\\s*:/i,ai=new WeakSet,Rn=\"\",li=!0,Er=new Set,gp=new WeakMap,Cr=new Map,Ws=new WeakMap,yp=new WeakSet,ci=1,ui=2,hy=a=>a.getPropertyValue(\"backdrop-filter\")||a.getPropertyValue(\"-webkit-backdrop-filter\");function bt(){$e||!Lt||Pt||he||($e=oe.requestAnimationFrame(wy))}function xt(a,u=!1){if(!Lt||Pt||!(a instanceof Element))return;let d=u&&(et.siblings||et.structural)?Pe(a):null;er.add(d instanceof Element&&m.has(d)?d:a),bt()}function Ar(){!Lt||Pt||(si=!0,bt())}let bp=null;function gy(a){if(a.op===\"data\"){let h=f.get(a.id);bp=h?ue(h):null;return}if(a.op!==\"rm\"&&a.op!==\"ins\")return;let u=f.get(a.id);if(!u||u===l||u===c||u===p)return;let d=Pe(ue(u));d&&(u instanceof Element&&Zi(u),(et.siblings||et.structural)&&xt(d))}function yy(a){switch(a.op){case\"el\":{let u=f.get(a.id);if(u instanceof HTMLStyleElement&&Er.add(u),u instanceof Element)for(let[d,h]of a.attrs)d.toLowerCase()===\"style\"&&hp.test(h)&&ai.add(u);a.adopt&&xt(u);return}case\"style\":{if(!et.styleAttr&&!my.test(a.name))return;let u=f.get(a.id);u instanceof Element&&ai.add(u),xt(u,!0);return}case\"attr\":case\"rattr\":{let u=f.get(a.id);if(!(u instanceof Element))return;if(u instanceof HTMLStyleElement){li=!0,Ar();return}if(a.name.toLowerCase()===\"style\"){let d=ai.has(u),h=a.op===\"attr\"&&hp.test(a.value);if(h?ai.add(u):ai.delete(u),!d&&!h&&!et.styleAttr)return}xt(u,!0);return}case\"ins\":{if(a.parent===0)return;let u=f.get(a.id);u instanceof Element?xt(u,!0):u&&(et.structural||et.siblings&&ue(u)!==u)&&xt(Pe(ue(u)),!0);return}case\"data\":{let u=f.get(a.id),d=u?ue(u):null;d&&(et.structural||et.siblings&&d!==bp)&&xt(Pe(d),!0);return}case\"css\":li=!0,Ar();return}}function by(){let a=li;for(let T of Er){let A=Si(T);gp.get(T)!==A&&(gp.set(T,A),a=!0)}if(!a)return;li=!1,si=!0;let u={siblings:!1,structural:!1,hover:!1,active:!1,styleAttr:!1},d=[],h=T=>{let A=T.replace(/\"(?:[^\"\\\\]|\\\\.)*\"|'(?:[^'\\\\]|\\\\.)*'/g,'\"\"').replace(/\\[[^\\]]*\\]/g,\"[]\");if(/[+~]/.test(A.replace(/:nth-[a-z-]+\\([^)]*\\)/gi,\"\"))&&(u.siblings=!0),/:(nth-|first-child|last-child|only-child|first-of-type|last-of-type|only-of-type|empty)/i.test(A)&&(u.structural=!0),/:hover/i.test(A)&&(u.hover=!0),(/:active/i.test(A)||/\\[\\s*data-tw-active\\b/i.test(T))&&(u.active=!0),/\\[\\s*style\\b/i.test(T)&&(u.styleAttr=!0),!/::?(before|after)\\b/i.test(A))return;let O=0,M=0,z=[];for(let ae=0;ae<=T.length;ae++){let ge=T[ae];ge===\"(\"?O++:ge===\")\"?O--:(ge===\",\"&&O===0||ge===void 0)&&(z.push(T.slice(M,ae)),M=ae+1)}for(let ae of z)/::?(before|after)\\b/i.test(ae)&&d.push(ae.replace(/(^|[\\s>+~(,])::?(before|after)\\b/gi,\"$1*\").replace(/::?(before|after)\\b/gi,\"\").trim()||\"*\")},b=T=>{for(let A=0;A<T.length;A++){let O=T[A];typeof O.selectorText==\"string\"&&h(O.selectorText),O.cssRules&&b(O.cssRules)}};for(let T of Er){let A=Oa(T);if(A)try{b(A.cssRules)}catch{}}if(et=u,Rn=d.join(\",\"),Rn)try{zr(l,Rn)}catch{Rn=\"*\"}}function Zi(a){let u=m.get(a);u!==void 0&&(ye.removeBox(u*4),ye.removeBox(u*4+ci),ye.removeBox(u*4+ui));for(let d=jt(a);d;d=Fr(d))d instanceof Element&&Zi(d)}function xp(a){if(a instanceof HTMLButtonElement)return Ia(a,\"disabled\")!==null?\"disabled\":(n instanceof ShadowRoot?di.includes(a):zr(a,\":active\"))?\"pressed\":void 0}function Us(a,u,d,h){return $d({display:u,content:d?a.content:void 0,boxShadow:a.boxShadow,filter:a.filter,backdropFilter:hy(a),opacity:a.opacity,button:h?xp(h):void 0},d)}function eo(a,u,d){let h=getComputedStyle(a,d);ye.setBox(u,Us(h,h.display,!0))}function Gs(a,u){let d=m.get(a);if(d===void 0)return;if(u)return Zi(a);let h=getComputedStyle(a),b=h.display;if(Lo(b))return Zi(a);let T=d*4;ye.setBox(T,Us(h,b,!1,a)),Rn&&zr(a,Rn)?(eo(a,T+ci,\"::before\"),eo(a,T+ui,\"::after\")):(ye.setBox(T+ci,null),ye.setBox(T+ui,null));for(let A=jt(a);A;A=Fr(A))A instanceof Element&&Gs(A,!1)}function Vs(a,u){if(!(a instanceof Element))return!1;let d=u.get(a);return d!==void 0||(d=Lo(getComputedStyle(a).display)||a!==l&&Vs(Pe(a),u),u.set(a,d)),d}function wp(a){for(let u=a===l?null:Pe(a);u instanceof Element;u=u===l?null:Pe(u))if(er.has(u))return!0;return!1}function xy(){for(let[a,u]of Cr)g.scripted.has(a)||(ye.endAnimation(u,\"w:\"+a),Cr.delete(a));for(let[a,u]of g.scripted){yp.has(u)||(yp.add(u),u.addEventListener(\"finish\",bt),u.addEventListener(\"cancel\",bt));let d=\"w:\"+a,h=-1,b=null,T=!1,A=u.effect,O=u.playState===\"running\"&&A?.target?m.get(A.target):void 0;if(O!==void 0){if(b=Ws.get(u),b===void 0){let z=[];try{z=A.getKeyframes()}catch{}b=Po(z),Ws.set(u,b),T=!0}b&&(h=O*4)}let M=Cr.get(a);if(M!==void 0&&(M!==h||!ye.animating(M,d))){ye.endAnimation(M,d),Cr.delete(a);let z=f.get(Math.floor(M/4));z instanceof Element&&(tr.add(z),bt())}b&&T&&M===h&&ye.animating(h,d)&&(ye.endAnimation(h,d),ye.startAnimation(h,d,b)),b&&h>=0&&!ye.animating(h,d)&&(ye.startAnimation(h,d,b),Cr.set(a,h))}}function wy(){if($e=0,!Lt||Pt||he||!l||!m.has(l))return;if(!Si(l)){Hs=!0;return}if(by(),si)si=!1,er.clear(),tr.clear(),Gs(l,!1);else{let u=new Map;for(let d of er)!m.has(d)||!Si(d)||wp(d)||Gs(d,d!==l&&Vs(Pe(d),u));for(let d of tr){let h=m.get(d);if(h===void 0||er.has(d)||!Si(d)||wp(d)||Vs(d,u))continue;let b=getComputedStyle(d);ye.setBox(h*4,Us(b,b.display,!1,d)),Rn&&zr(d,Rn)&&(eo(d,h*4+ci,\"::before\"),eo(d,h*4+ui,\"::after\"))}er.clear(),tr.clear()}if((g.scripted.size||Cr.size)&&xy(),mp){let u=ye.heavy+\":\"+ye.backdrop;u!==Qs&&(Qs=u,o({type:\"paint\",heavy:ye.heavy,backdrop:ye.backdrop}))}let a=ye.check();a&&Sy(a)}function kp(a){if(!Lt||Pt||he)return;let u=a.target,d=u instanceof Element?m.get(u):void 0;if(d===void 0)return;let h=a,b=h.pseudoElement||\"\",T=b===\"\"?0:b===\"::before\"?ci:b===\"::after\"?ui:-1;if(T<0)return;let A=d*4+T,O=a.type.startsWith(\"transition\"),M=O?\"t:\"+h.propertyName:\"a:\"+h.animationName;if(a.type===\"animationstart\"||a.type===\"transitionstart\"){let z=ky(u,O,O?h.propertyName:h.animationName,b);if(!z)return;ye.startAnimation(A,M,z)}else{if(!ye.animating(A,M))return;ye.endAnimation(A,M),tr.add(u)}bt()}function ky(a,u,d,h){for(let b of rf(a,h?{subtree:!0}:void 0)){if(u?!ki(b)||b.transitionProperty!==d:!Ra(b)||b.animationName!==d)continue;let T=b.effect;if(!(!T||T.target!==a||(T.pseudoElement??\"\")!==h))try{return Po(T.getKeyframes())}catch{break}}return u?Po([{offset:0,[d]:null},{offset:1,[d]:null}]):null}function Sp(a){if(!Lt||Pt||he)return;let u=a.type;if(u===\"toggle\")return xt(a.target,!0);if(u===\"pointerover\"||u===\"pointerout\"){if(!et.hover)return;let d=$s(a.target),h=$s(a.relatedTarget),b=new Set(d),T=new Set(h);for(let A of d)T.has(A)||xt(A,!0);for(let A of h)b.has(A)||xt(A,!0);return}js($s(a.target))}function js(a){if(!(!Lt||Pt||he))for(let u of a)et.active?xt(u,!0):(tr.add(u),bt())}function $s(a){let u=[];for(let d=a instanceof Element?a:null;d instanceof Element;d=d===l?null:Pe(d))m.has(d)&&u.push(d);return u}function Sy(a){Pt=!0,$e&&(oe.cancelAnimationFrame($e),$e=0),Ty(),o({type:\"limit\",code:a.code,count:a.count})}let vy=\"@layer tw-no-effects{*,::before,::after{filter:none!important;-webkit-backdrop-filter:none!important;backdrop-filter:none!important;transition:none!important}:not(button[disabled]),::before,::after{opacity:1!important}::before,::after{box-shadow:none!important}}\";function Ty(){try{for(let h of rf(l,{subtree:!0}))try{ki(h)?h.cancel():h.pause()}catch{}}catch{}let a=[],u=h=>{if(!m.has(h))return;let b=getComputedStyle(h);if(Lo(b.display))return;let T=pn(h);parseFloat(b.opacity)===0&&a.push([T,\"visibility\",\"hidden\"]),_o(b.boxShadow)&&a.push([T,\"box-shadow\",jd(b.boxShadow)]);for(let A of[\"filter\",\"backdrop-filter\",\"-webkit-backdrop-filter\",\"opacity\"])T.getPropertyValue(A)&&!(A===\"opacity\"&&xp(h)===\"disabled\")&&a.push([T,A,\"\"]);for(let A=jt(h);A;A=Fr(A))A instanceof Element&&u(A)};u(l);let d=un(t,\"style\");lr(d,vy),Vt(c,d,jt(c));for(let[h,b,T]of a)T?h.setProperty(b,T,\"important\"):h.removeProperty(b);nr(!0)}let _r=!1,ln=!1,Lr=!0,to=\"\",qs=!1,pi=new Set,no=new Map,Mn=new Map,vp=new WeakMap,Tp=a=>pi.has(a)||Mn.has(a)||to!==\"\"&&zr(a,to);function ro(a){let u=pn(a);Ro(u.getPropertyValue(\"display\"))||Mo(u.getPropertyValue(\"all\"))||qs&&Pa(u.getPropertyValue(\"animation-name\"),u.getPropertyValue(\"animation\"))?pi.add(a):pi.delete(a)}function Ep(a,u){let d=no.get(a);if(!(d===u||!d&&!u)){if(d){let h=Mn.get(d);h?.delete(a),h?.size||Mn.delete(d),no.delete(a)}if(u){no.set(a,u);let h=Mn.get(u);h||Mn.set(u,h=new Set),h.add(a)}ln=!0}}function Ey(a){switch(a.op){case\"el\":{let u=f.get(a.id);if(!(u instanceof Element))return;u instanceof HTMLStyleElement&&(Er.add(u),Lr=!0),a.attrs.some(([d])=>d.toLowerCase()===\"style\")&&ro(u),a.adopt&&(ln=!0);return}case\"ins\":case\"rm\":case\"data\":ln=!0;return;case\"attr\":case\"rattr\":{let u=f.get(a.id);if(!(u instanceof Element))return;a.name.toLowerCase()===\"style\"&&ro(u),ln=!0;return}case\"style\":{let u=f.get(a.id);if(!(u instanceof Element)||!/^(?:display|all|animation(?:-name)?)$/i.test(a.name))return;ro(u),ln=!0;return}case\"css\":Lr=ln=!0;return}}function Cy(a){let u=sx(a)??\"\",d=vp.get(a);if(d&&d.text===u)return d;let h={text:u,grids:[],animated:[],keyframes:!1},b=A=>{for(let O=0;O<A.length;O++){let M=A[O];if(M.style){let z=Ro(M.style.getPropertyValue(\"display\"))||Mo(M.style.getPropertyValue(\"all\"));typeof M.selectorText==\"string\"?z?h.grids.push(M.selectorText):Pa(M.style.getPropertyValue(\"animation-name\"),M.style.getPropertyValue(\"animation\"))&&h.animated.push(M.selectorText):z&&typeof M.keyText==\"string\"&&(h.keyframes=!0)}M.cssRules&&b(M.cssRules)}},T=null;try{let A=new CSSStyleSheet;A.replaceSync(u),T=A.cssRules}catch{try{T=Oa(a)?.cssRules??null}catch{}}if(!T)return u.trim()&&h.grids.push(\"*\"),h;try{b(T)}catch{h.grids.push(\"*\")}return vp.set(a,h),h}function Ay(){Lr=!1;let a=[],u=[],d=!1;for(let h of Er){let b=Cy(h);a.push(...b.grids),u.push(...b.animated),d||=b.keyframes}if(d!==qs){qs=d;for(let h of f.values())h instanceof Element&&Ia(h,\"style\")!==null&&ro(h)}to=(d?a.concat(u):a).map(h=>{let b=Kd(h);try{return zr(l,b),b}catch{return\"*\"}}).join(\",\")}function nr(a=!1){if(!l||!a&&(!ln||_r)||(ln=!1,Lr&&Ay(),!to&&!pi.size&&!Mn.size))return;let u=[],d=0,h=(M,z)=>{let ae=m.has(M);if(ae&&(d++,u[z]=(u[z]??0)+1),!(M instanceof Element))return;let ge=ae&&z<63&&Tp(M)?z+1:z;for(let Fe=jt(M);Fe;Fe=Fr(Fe))h(Fe,ge)};h(l,0);let b=Jd(d),T=0,A=0;for(let M=0;M<u.length&&(T+=(u[M]??0)*2**M,!(T>b));M++)A=M;if(T<=b)return;let O=(M,z)=>{let ae=m.has(M)&&Tp(M);if(ae&&z>=A)return pn(M).setProperty(\"display\",\"none\",\"important\");for(let ge=jt(M);ge;ge=Fr(ge))ge instanceof Element&&O(ge,ae?z+1:z)};O(l,0),!_r&&(_r=!0,o({type:\"limit\",code:\"layout-limit\",count:Math.min(T,Number.MAX_SAFE_INTEGER)}))}function _y(a){switch(a.type){case\"ops\":if(Pt||_r)break;for(let u of a.ops){if((u.op===\"prop\"||u.op===\"call\"||u.op===\"canvas\")&&nr(),_r)break;try{Lt&&gy(u),Zt(u)}catch(d){s(\"op failed: \"+String(d))}if(Lt)try{yy(u)}catch{}try{Ey(u)}catch{ln=Lr=!0}}nr(),Ks(),e.deferSize||ie(),Ie&&cp();break;case\"query\":{let u;nr();try{u=y(a.query)}catch(d){u={result:{error:String(d)}}}o({type:\"result\",qid:a.qid,result:u.result,binary:u.binary},u.binary?[u.binary]:[]);break}case\"listen\":{v=new Set(a.types);let u=pe(),d=a.since??1/0,h=V.filter(b=>u-b.at<w);V=h.filter(({ev:b})=>!v.has(b.type));for(let b of h)v.has(b.ev.type)&&b.at>=d&&o({type:\"event\",ev:b.ev,trusted:!0});break}case\"preventDefault\":we=new Set(a.keys);break;case\"anim\":{if(Pt||_r)break;let u=[];for(let d of a.anims){if(!(\"css\"in d))continue;let h=g.cssById.get(d.css.origin)?.deref();h&&(Kn.delete(h),Xn.delete(h),Ie&&!d.cancelled&&u.push(h))}try{ef(g,a.now,a.anims,d=>f.get(d))}catch(d){s(\"anim failed: \"+String(d))}for(let d of a.anims)if(\"remove\"in d)Ep(d.aid,null);else if(\"keyframes\"in d){let h=f.get(d.target),b=d.keyframes.some(T=>Ro(T.values.display??\"\")||Mo(T.values.all??\"\"));Ep(d.aid,b&&h instanceof Element?h:null)}if(nr(),Ie){pp();for(let d of u)dy(d)}Ws=new WeakMap,bt();break}case\"requestFrame\":if(he||Pt||ee)break;ee=oe.requestAnimationFrame(dp);break;case\"frozen\":My(String(a.reason),!!a.fatal);break;case\"visibility\":fy(!a.visible);break;case\"arbitrate\":vr=a.rtl===!0,De=a.bubble===!0?{touch:a.touch===!0,rtl:vr}:null;break;case\"theme\":Js=Nd(a.theme),io(),e.frameColorScheme?.(Js[\"--tg-color-scheme\"]===\"dark\"?\"dark\":\"light\"),Pr=!0,Ks(),Ar();break;case\"safeArea\":Cp=Ca(a.inset),io(),Ar();break;case\"policy\":{let u=a.policy!==\"compat\";mp=a.paintReports===!0,Qs=\"\",u&&!Lt&&(si=!0),Lt=u,!u&&$e&&(oe.cancelAnimationFrame($e),$e=0),bt();break}}}let Js={},Cp=Ca(null);function io(){if(!l)return;let a=pn(l);for(let u of Aa){let d=Js[u]??Cp[u];d===void 0?a.removeProperty(u):a.setProperty(u,d,\"important\")}}let Pr=!0,Ap=[],_p=[\"background-color\",\"background-image\",\"background-position\",\"background-size\",\"background-repeat\",\"background-origin\",\"background-clip\"],Ly=a=>a===\"transparent\"||/^rgba\\(\\s*0,\\s*0,\\s*0,\\s*0\\s*\\)$/.test(a);function Ys(){let a=e.canvas;if(!a||!Pr||!l||!p)return;Pr=!1;let u=getComputedStyle(l),d=u.backgroundImage!==\"none\"||!Ly(u.backgroundColor)?u:getComputedStyle(p),h=_p.map(T=>d.getPropertyValue(T));if(h.every((T,A)=>T===Ap[A]))return;Ap=h;let b=pn(a);_p.forEach((T,A)=>b.setProperty(T,h[A]))}let cn=0;function Ks(){if(!e.deferSize)return Ys();cn||!Pr||!e.canvas||(cn=oe.requestAnimationFrame(()=>{cn=0,Ys()}))}function Py(){ie(),Ys()}function Ry(a){let u=a instanceof Element?a:a instanceof Node?a.parentElement:null;for(;u;){let d=getComputedStyle(u),h=d.userSelect||d.webkitUserSelect;if(h&&h!==\"auto\")return h!==\"none\";if(u===l)return!1;u=u.parentElement}return!1}function My(a,u){if(he)return;he=!0,ee&&(oe.cancelAnimationFrame(ee),ee=0),K&&(oe.cancelAnimationFrame(K),K=0),se.clear();for(let h of up())try{h.pause()}catch{}Tr.clear(),Kn.clear(),Xn.clear(),Na(l,\"data-tw-frozen\",u?\"fatal\":\"paused\");let d=un(t,\"style\");if(lr(d,\"[data-tw-frozen]{pointer-events:none}[data-tw-frozen=fatal]{filter:grayscale(.3)}[data-tw-badge]{position:fixed;right:6px;bottom:6px;z-index:2147483647;font:11px/1.3 system-ui,sans-serif;color:#fff;background:rgba(60,60,60,.75);padding:2px 7px;border-radius:9px;pointer-events:none;user-select:none}\"),Vt(c,d,null),a){let h=un(t,\"div\");Na(h,\"data-tw-badge\",u?\"fatal\":\"paused\"),lr(h,a),Vt(p,h,null)}nr(!0)}let Rr=[],oo=null;function Lp(a){if(a.type===\"mousedown\"||a.type===\"selectstart\"){a.cancelable&&!Ry(a.target)&&a.preventDefault();return}if(a.type===\"focusin\"){let u=a.target;(u instanceof HTMLElement||u instanceof SVGElement)&&(u instanceof SVGElement?SVGElement.prototype.blur:HTMLElement.prototype.blur).call(u);return}a.cancelable&&a.preventDefault()}let di=[],Mr=new Set,so=!1,fi=new Set,ao=!1,Pp=a=>a.pointerType===\"touch\"||a.pointerType===\"pen\";function Rp(a){if(a.isTrusted){let u=a.pointerId;Mr.add(u),Pp(a)&&fi.add(u),so=!0,ao=fi.has(u)}if(a.button===0){Xs();for(let u=a.target instanceof Element?a.target:null;u&&!(!(u instanceof Element)||(u.setAttribute(\"data-tw-active\",\"\"),di.push(u),u===l));u=Pe(u));js(di)}}function Xs(){let a=di;for(let u of a)u.removeAttribute(\"data-tw-active\");di=[],js(a)}function Mp(a){if(!a.isTrusted||a.button===-1)return;let u=a.pointerId;so=Mr.has(u),ao=fi.has(u)}function Nn(a){let u=a.pointerId;so=Mr.delete(u),fi.delete(u),ao=!1,Xs()}function Ny(a){i=a,{html:l,head:c,body:p}=e.roots();let u=un(t,\"style\");lr(u,(n instanceof ShadowRoot?yo.replace(/:active/g,\"[data-tw-active]\"):yo)+(e.emoji?Q:\"\")),Vt(c,u,jt(c)),n.addEventListener(\"pointerdown\",Rp,!0),n.addEventListener(\"pointermove\",Mp,!0);for(let d of df)n.addEventListener(d,Lp,{capture:!0,passive:!1});for(let d of af)n.addEventListener(d,N,{capture:!0,passive:!1});if(n instanceof ShadowRoot)for(let d of lf)n.host.addEventListener(d,pf,!0);for(let d of[\"auxclick\",\"dragstart\",\"dblclick\"])n.addEventListener(d,h=>h.preventDefault(),!0);for(let d of cf)n.addEventListener(d,kp,!0);for(let d of uf)n.addEventListener(d,Sp,!0);oe=l.ownerDocument.defaultView??window,oe.addEventListener(\"pointerup\",Nn,!0),oe.addEventListener(\"pointercancel\",Nn,!0),Np(),ie()}function Np(){let a=oe.ResizeObserver;Rr=[new a(ie),new a(ie)],Rr[0].observe(l),Rr[1].observe(p);let u=e.onViewportResize(ie),d=e.onColorSchemeChange(()=>o({type:\"media\"}));oo=()=>{u(),d()}}function Iy(){for(let h of n.querySelectorAll(\"style\"))xe(h,!0);let a=l?.ownerDocument.defaultView;if(!a||a===oe)return;let u=oe;oe=a,u.removeEventListener(\"pointerup\",Nn,!0),u.removeEventListener(\"pointercancel\",Nn,!0),oe.addEventListener(\"pointerup\",Nn,!0),oe.addEventListener(\"pointercancel\",Nn,!0),ee&&(u.cancelAnimationFrame(ee),ee=oe.requestAnimationFrame(dp)),K&&(u.cancelAnimationFrame(K),K=oe.requestAnimationFrame(_t)),cn&&(u.cancelAnimationFrame(cn),cn=0,Ks()),$e&&(u.cancelAnimationFrame($e),$e=0,bt());let d=u.performance.timeOrigin-oe.performance.timeOrigin;for(let[h,b]of g.scripted){let T=b.effect?.target?.ownerDocument.timeline;if(!T||b.timeline===T)continue;let A=b.currentTime,O=b.playState===\"running\";try{b.timeline=T,O&&A!==null&&(b.currentTime=A)}catch{}let M=g.startTimes.get(h);M!==void 0&&g.startTimes.set(h,typeof b.startTime==\"number\"?b.startTime:M+d)}Zn.disconnect(),Zn=new oe.ResizeObserver(fp);for(let h of oi)Zn.observe(h);for(let h of Rr)h.disconnect();oo?.(),Np(),ie()}function Oy(){for(let a of af)n.removeEventListener(a,N,{capture:!0});for(let a of df)n.removeEventListener(a,Lp,{capture:!0});if(n.removeEventListener(\"pointerdown\",Rp,!0),n.removeEventListener(\"pointermove\",Mp,!0),oe?.removeEventListener(\"pointerup\",Nn,!0),oe?.removeEventListener(\"pointercancel\",Nn,!0),Xs(),Mr.clear(),fi.clear(),n instanceof ShadowRoot)for(let a of lf)n.host.removeEventListener(a,pf,!0);for(let a of cf)n.removeEventListener(a,kp,!0);for(let a of uf)n.removeEventListener(a,Sp,!0);$e&&(oe.cancelAnimationFrame($e),$e=0);for(let a of Rr)a.disconnect();Rr=[],oo?.(),oo=null,Zn.disconnect(),oi.clear(),ee&&(oe.cancelAnimationFrame(ee),ee=0),K&&(oe.cancelAnimationFrame(K),K=0),cn&&(oe.cancelAnimationFrame(cn),cn=0),At(),i=()=>{}}return{init:Ny,onMessage:_y,flushSize:Py,rebind:Iy,destroy:Oy}}function gf(e){return Math.ceil(e.documentElement.getBoundingClientRect().height)}function yx(e){let t=null;return n=>{t||(t=e.createElement(\"style\"),e.head.appendChild(t)),t.textContent=`@layer tw-ua{:where(html){color-scheme:${n}}}`}}function yf(e=document,t=!1){return{doc:e,root:e,roots:()=>({html:e.documentElement,head:e.head,body:e.body}),origin:()=>null,viewport:()=>({innerWidth:window.innerWidth,innerHeight:window.innerHeight,dpr:window.devicePixelRatio}),docHeight:()=>gf(e),matchMedia:n=>matchMedia(n).matches,onViewportResize:n=>(window.addEventListener(\"resize\",n),()=>window.removeEventListener(\"resize\",n)),onColorSchemeChange:n=>{let r=matchMedia(\"(prefers-color-scheme: dark)\");return r.addEventListener(\"change\",n),()=>r.removeEventListener(\"change\",n)},...t?{frameColorScheme:yx(e)}:{}}}var cr=e=>e.trim().split(/\\s+/),$t=bo,Do=e=>Object.entries($t.html.elements).filter(([,t])=>t===e).map(([t])=>t),Fo=new Set(cr(`\n  script iframe frame frameset object embed link meta base portal noscript set title template applet param\n  noembed noframes plaintext xmp listing slot track area map math metadata fencedframe audio video source\n`)),bf=new Set(Do(\"keep\").filter(e=>!Fo.has(e))),Fa=new Map([...Do(\"span\").map(e=>[e,\"span\"]),...Do(\"div\").map(e=>[e,\"div\"])]),zo=new Set([...Fo,...Do(\"drop\")]),xf=new Map($t.svg.elements.map(e=>[e.toLowerCase(),e])),za=new Set($t.html.attributes),wf=$t.svg.attributes,Ba=new Set(wf.map(e=>e.toLowerCase())),GA=new Set([...za,...Ba]),kf=new Map(wf.filter(e=>e!==e.toLowerCase()).map(e=>[e.toLowerCase(),e])),Sf=new Set(cr(`\n  href xlink:href src srcset poster action formaction background ping data cite codebase manifest longdesc\n  usemap profile icon archive classid lowsrc dynsrc srcdoc imagesrcset imagesizes attributionsrc\n`)),vf=new Set(cr(`\n  fill stroke filter mask clip-path marker marker-start marker-mid marker-end cursor color flood-color\n  lighting-color stop-color\n`)),Tf=new Set([\"from\",\"to\",\"by\",\"values\"]),Ef=new Set(cr(`\n  xmlns xmlns:xlink target rel download autofocus nonce is loading decoding crossorigin referrerpolicy\n  integrity fetchpriority charset http-equiv content async defer\n`)),bx={scrollTop:{type:\"number\",tags:null},scrollLeft:{type:\"number\",tags:null}},Cf=(e,t)=>Object.fromEntries(Object.entries(e).filter(([n])=>t.includes(n))),Qa=Cf(bx,$t.properties),xx={scrollIntoView:4,setPointerCapture:1,releasePointerCapture:1,scrollTo:2,scrollBy:2,observeResize:0,unobserveResize:0},Ha=Cf(xx,$t.methods),Af=new Set($t.canvas.methods),_f=new Set($t.canvas.properties),Wa=new Set(cr(`\n  putImageData globalCompositeOperation shadowBlur shadowColor shadowOffsetX shadowOffsetY filter\n  letterSpacing wordSpacing fontKerning fontStretch fontVariantCaps textRendering\n`)),Lf=new Set($t.canvas.gradients),Pf=new Set(cr(`\n  moveTo lineTo bezierCurveTo quadraticCurveTo arc arcTo ellipse rect roundRect closePath addPath\n`)),Rf=new Set(cr(`\n  getBBox getComputedTextLength getTotalLength getPointAtLength getCTM getScreenCTM getSubStringLength\n  getNumberOfChars\n`)),Mf=new Set($t.canvas.queries.filter(e=>e!==\"measureText\"));function ve(e){return e>=48&&e<=57}function rt(e){return ve(e)||e>=65&&e<=70||e>=97&&e<=102}function Qo(e){return e>=65&&e<=90}function wx(e){return e>=97&&e<=122}function kx(e){return Qo(e)||wx(e)}function Sx(e){return e>=128}function Bo(e){return kx(e)||Sx(e)||e===95}function Ho(e){return Bo(e)||ve(e)||e===45}function vx(e){return e>=0&&e<=8||e===11||e>=14&&e<=31||e===127}function vi(e){return e===10||e===13||e===12}function qt(e){return vi(e)||e===32||e===9}function nt(e,t){return!(e!==92||vi(t)||t===0)}function Br(e,t,n){return e===45?Bo(t)||t===45||nt(t,n):Bo(e)?!0:e===92?nt(e,t):!1}function Wo(e,t,n){return e===43||e===45?ve(t)?2:t===46&&ve(n)?3:0:e===46?ve(t)?2:0:ve(e)?1:0}function Uo(e){return e===65279||e===65534?1:0}var Ua=new Array(128),Tx=128,Ti=130,Ga=131,Go=132,Va=133;for(let e=0;e<Ua.length;e++)Ua[e]=qt(e)&&Ti||ve(e)&&Ga||Bo(e)&&Go||vx(e)&&Va||e||Tx;function Vo(e){return e<128?Ua[e]:Go}function Qr(e,t){return t<e.length?e.charCodeAt(t):0}function jo(e,t,n){return n===13&&Qr(e,t+1)===10?2:1}function dn(e,t,n){let r=e.charCodeAt(t);return Qo(r)&&(r=r|32),r===n}function fn(e,t,n,r){if(n-t!==r.length||t<0||n>e.length)return!1;for(let i=t;i<n;i++){let o=r.charCodeAt(i-t),s=e.charCodeAt(i);if(Qo(s)&&(s=s|32),s!==o)return!1}return!0}function Nf(e,t){for(;t>=0&&qt(e.charCodeAt(t));t--);return t+1}function Ei(e,t){for(;t<e.length&&qt(e.charCodeAt(t));t++);return t}function ja(e,t){for(;t<e.length&&ve(e.charCodeAt(t));t++);return t}function mn(e,t){if(t+=2,rt(Qr(e,t-1))){for(let r=Math.min(e.length,t+5);t<r&&rt(Qr(e,t));t++);let n=Qr(e,t);qt(n)&&(t+=jo(e,t,n))}return t}function Ci(e,t){for(;t<e.length;t++){let n=e.charCodeAt(t);if(!Ho(n)){if(nt(n,Qr(e,t+1))){t=mn(e,t)-1;continue}break}}return t}function ur(e,t){let n=e.charCodeAt(t);if((n===43||n===45)&&(n=e.charCodeAt(t+=1)),ve(n)&&(t=ja(e,t+1),n=e.charCodeAt(t)),n===46&&ve(e.charCodeAt(t+1))&&(t+=2,t=ja(e,t)),dn(e,t,101)){let r=0;n=e.charCodeAt(t+1),(n===45||n===43)&&(r=1,n=e.charCodeAt(t+2)),ve(n)&&(t=ja(e,t+1+r+1))}return t}function $o(e,t){for(;t<e.length;t++){let n=e.charCodeAt(t);if(n===41){t++;break}nt(n,Qr(e,t+1))&&(t=mn(e,t))}return t}function qo(e){if(e.length===1&&!rt(e.charCodeAt(0)))return e[0];let t=parseInt(e,16);return(t===0||t>=55296&&t<=57343||t>1114111)&&(t=65533),String.fromCodePoint(t)}var Hr=[\"EOF-token\",\"ident-token\",\"function-token\",\"at-keyword-token\",\"hash-token\",\"string-token\",\"bad-string-token\",\"url-token\",\"bad-url-token\",\"delim-token\",\"number-token\",\"percentage-token\",\"dimension-token\",\"whitespace-token\",\"CDO-token\",\"CDC-token\",\"colon-token\",\"semicolon-token\",\"comma-token\",\"[-token\",\"]-token\",\"(-token\",\")-token\",\"{-token\",\"}-token\",\"comment-token\"];function Wr(e=null,t){return e===null||e.length<t?new Uint32Array(Math.max(t+1024,16384)):e}var If=10,Ex=12,Of=13;function Df(e){let t=e.source,n=t.length,r=t.length>0?Uo(t.charCodeAt(0)):0,i=Wr(e.lines,n),o=Wr(e.columns,n),s=e.startLine,l=e.startColumn;for(let c=r;c<n;c++){let p=t.charCodeAt(c);i[c]=s,o[c]=l++,(p===If||p===Of||p===Ex)&&(p===Of&&c+1<n&&t.charCodeAt(c+1)===If&&(c++,i[c]=s,o[c]=l),s++,l=1)}i[n]=s,o[n]=l,e.lines=i,e.columns=o,e.computed=!0}var Jo=class{constructor(t,n,r,i){this.setSource(t,n,r,i),this.lines=null,this.columns=null}setSource(t=\"\",n=0,r=1,i=1){this.source=t,this.startOffset=n,this.startLine=r,this.startColumn=i,this.computed=!1}getLocation(t,n){return this.computed||Df(this),{source:n,offset:this.startOffset+t,line:this.lines[t],column:this.columns[t]}}getLocationRange(t,n,r){return this.computed||Df(this),{source:r,start:{offset:this.startOffset+t,line:this.lines[t],column:this.columns[t]},end:{offset:this.startOffset+n,line:this.lines[n],column:this.columns[n]}}}};var Nt=16777215,It=24,Ai=1,Ko=2,Dn=new Uint8Array(32);Dn[2]=22;Dn[21]=22;Dn[19]=20;Dn[23]=24;var Ot=new Uint8Array(32);Ot[2]=Ai;Ot[21]=Ai;Ot[19]=Ai;Ot[23]=Ai;Ot[22]=Ko;Ot[20]=Ko;Ot[24]=Ko;function Ff(e,t,n){return e<t?t:e>n?n:e}var Yo=class{constructor(t,n){this.setSource(t,n)}reset(){this.eof=!1,this.tokenIndex=-1,this.tokenType=0,this.tokenStart=this.firstCharOffset,this.tokenEnd=this.firstCharOffset}setSource(t=\"\",n=()=>{}){t=String(t||\"\");let r=t.length,i=Wr(this.offsetAndType,t.length+1),o=Wr(this.balance,t.length+1),s=0,l=-1,c=0,p=t.length;this.offsetAndType=null,this.balance=null,o.fill(0),n(t,(f,m,g)=>{let S=s++;if(i[S]=f<<It|g,l===-1&&(l=m),o[S]=p,f===c){let x=o[p];o[p]=S,p=x,c=Dn[i[x]>>It]}else this.isBlockOpenerTokenType(f)&&(p=S,c=Dn[f])}),i[s]=0<<It|r,o[s]=s;for(let f=0;f<s;f++){let m=o[f];if(m<=f){let g=o[m];g!==f&&(o[f]=g)}else m>s&&(o[f]=s)}this.source=t,this.firstCharOffset=l===-1?0:l,this.tokenCount=s,this.offsetAndType=i,this.balance=o,this.reset(),this.next()}lookupType(t){return t+=this.tokenIndex,t<this.tokenCount?this.offsetAndType[t]>>It:0}lookupTypeNonSC(t){for(let n=this.tokenIndex;n<this.tokenCount;n++){let r=this.offsetAndType[n]>>It;if(r!==13&&r!==25&&t--===0)return r}return 0}lookupOffset(t){return t+=this.tokenIndex,t<this.tokenCount?this.offsetAndType[t-1]&Nt:this.source.length}lookupOffsetNonSC(t){for(let n=this.tokenIndex;n<this.tokenCount;n++){let r=this.offsetAndType[n]>>It;if(r!==13&&r!==25&&t--===0)return n-this.tokenIndex}return 0}lookupValue(t,n){return t+=this.tokenIndex,t<this.tokenCount?fn(this.source,this.offsetAndType[t-1]&Nt,this.offsetAndType[t]&Nt,n):!1}getTokenStart(t){return t===this.tokenIndex?this.tokenStart:t>0?t<this.tokenCount?this.offsetAndType[t-1]&Nt:this.offsetAndType[this.tokenCount]&Nt:this.firstCharOffset}getTokenEnd(t){return t===this.tokenIndex?this.tokenEnd:this.offsetAndType[Ff(t,0,this.tokenCount)]&Nt}getTokenType(t){return t===this.tokenIndex?this.tokenType:this.offsetAndType[Ff(t,0,this.tokenCount)]>>It}substrToCursor(t){return this.source.substring(t,this.tokenStart)}isBlockOpenerTokenType(t){return Ot[t]===Ai}isBlockCloserTokenType(t){return Ot[t]===Ko}getBlockTokenPairIndex(t){let n=this.getTokenType(t);if(Ot[n]===1){let r=this.balance[t],i=this.getTokenType(r);return Dn[n]===i?r:-1}else if(Ot[n]===2){let r=this.balance[t],i=this.getTokenType(r);return Dn[i]===n?r:-1}return-1}isBalanceEdge(t){return this.balance[this.tokenIndex]<t}isDelim(t,n){return n?this.lookupType(n)===9&&this.source.charCodeAt(this.lookupOffset(n))===t:this.tokenType===9&&this.source.charCodeAt(this.tokenStart)===t}skip(t){let n=this.tokenIndex+t;n<this.tokenCount?(this.tokenIndex=n,this.tokenStart=this.offsetAndType[n-1]&Nt,n=this.offsetAndType[n],this.tokenType=n>>It,this.tokenEnd=n&Nt):(this.tokenIndex=this.tokenCount,this.next())}next(){let t=this.tokenIndex+1;t<this.tokenCount?(this.tokenIndex=t,this.tokenStart=this.tokenEnd,t=this.offsetAndType[t],this.tokenType=t>>It,this.tokenEnd=t&Nt):(this.eof=!0,this.tokenIndex=this.tokenCount,this.tokenType=0,this.tokenStart=this.tokenEnd=this.source.length)}skipSC(){for(;this.tokenType===13||this.tokenType===25;)this.next()}skipUntilBalanced(t,n){let r=t,i=0,o=0;e:for(;r<this.tokenCount;r++){if(i=this.balance[r],i<t)break e;switch(o=r>0?this.offsetAndType[r-1]&Nt:this.firstCharOffset,n(this.source.charCodeAt(o))){case 1:break e;case 2:r++;break e;default:this.isBlockOpenerTokenType(this.offsetAndType[r]>>It)&&(r=i)}}this.skip(r-this.tokenIndex)}forEachToken(t){for(let n=0,r=this.firstCharOffset;n<this.tokenCount;n++){let i=r,o=this.offsetAndType[n],s=o&Nt,l=o>>It;r=s,t(l,i,s,n)}}dump(){let t=new Array(this.tokenCount);return this.forEachToken((n,r,i,o)=>{t[o]={idx:o,type:Hr[n],chunk:this.source.substring(r,i),balance:this.balance[o]}}),t}};function Fn(e,t){function n(m){return m<l?e.charCodeAt(m):0}function r(){if(p=ur(e,p),Br(n(p),n(p+1),n(p+2))){f=12,p=Ci(e,p);return}if(n(p)===37){f=11,p++;return}f=10}function i(){let m=p;if(p=Ci(e,p),fn(e,m,p,\"url\")&&n(p)===40){if(p=Ei(e,p+1),n(p)===34||n(p)===39){f=2,p=m+4;return}s();return}if(n(p)===40){f=2,p++;return}f=1}function o(m){for(m||(m=n(p++)),f=5;p<e.length;p++){let g=e.charCodeAt(p);switch(Vo(g)){case m:p++;return;case Ti:if(vi(g)){p+=jo(e,p,g),f=6;return}break;case 92:if(p===e.length-1)break;let S=n(p+1);vi(S)?p+=jo(e,p+1,S):nt(g,S)&&(p=mn(e,p)-1);break}}}function s(){for(f=7,p=Ei(e,p);p<e.length;p++){let m=e.charCodeAt(p);switch(Vo(m)){case 41:p++;return;case Ti:if(p=Ei(e,p),n(p)===41||p>=e.length){p<e.length&&p++;return}p=$o(e,p),f=8;return;case 34:case 39:case 40:case Va:p=$o(e,p),f=8;return;case 92:if(nt(m,n(p+1))){p=mn(e,p)-1;break}p=$o(e,p),f=8;return}}}e=String(e||\"\");let l=e.length,c=Uo(n(0)),p=c,f;for(;p<l;){let m=e.charCodeAt(p);switch(Vo(m)){case Ti:f=13,p=Ei(e,p+1);break;case 34:o();break;case 35:Ho(n(p+1))||nt(n(p+1),n(p+2))?(f=4,p=Ci(e,p+1)):(f=9,p++);break;case 39:o();break;case 40:f=21,p++;break;case 41:f=22,p++;break;case 43:Wo(m,n(p+1),n(p+2))?r():(f=9,p++);break;case 44:f=18,p++;break;case 45:Wo(m,n(p+1),n(p+2))?r():n(p+1)===45&&n(p+2)===62?(f=15,p=p+3):Br(m,n(p+1),n(p+2))?i():(f=9,p++);break;case 46:Wo(m,n(p+1),n(p+2))?r():(f=9,p++);break;case 47:n(p+1)===42?(f=25,p=e.indexOf(\"*/\",p+2),p=p===-1?e.length:p+2):(f=9,p++);break;case 58:f=16,p++;break;case 59:f=17,p++;break;case 60:n(p+1)===33&&n(p+2)===45&&n(p+3)===45?(f=14,p=p+4):(f=9,p++);break;case 64:Br(n(p+1),n(p+2),n(p+3))?(f=3,p=Ci(e,p+1)):(f=9,p++);break;case 91:f=19,p++;break;case 92:nt(m,n(p+1))?i():(f=9,p++);break;case 93:f=20,p++;break;case 123:f=23,p++;break;case 125:f=24,p++;break;case Ga:r();break;case Go:i();break;default:f=9,p++}t(f,c,c=p)}}var Ur=null,ke=class e{static createItem(t){return{prev:null,next:null,data:t}}constructor(){this.head=null,this.tail=null,this.cursor=null}createItem(t){return e.createItem(t)}allocateCursor(t,n){let r;return Ur!==null?(r=Ur,Ur=Ur.cursor,r.prev=t,r.next=n,r.cursor=this.cursor):r={prev:t,next:n,cursor:this.cursor},this.cursor=r,r}releaseCursor(){let{cursor:t}=this;this.cursor=t.cursor,t.prev=null,t.next=null,t.cursor=Ur,Ur=t}updateCursors(t,n,r,i){let{cursor:o}=this;for(;o!==null;)o.prev===t&&(o.prev=n),o.next===r&&(o.next=i),o=o.cursor}*[Symbol.iterator](){for(let t=this.head;t!==null;t=t.next)yield t.data}get size(){let t=0;for(let n=this.head;n!==null;n=n.next)t++;return t}get isEmpty(){return this.head===null}get first(){return this.head&&this.head.data}get last(){return this.tail&&this.tail.data}fromArray(t){let n=null;this.head=null;for(let r of t){let i=e.createItem(r);n!==null?n.next=i:this.head=i,i.prev=n,n=i}return this.tail=n,this}toArray(){return[...this]}toJSON(){return[...this]}forEach(t,n=this){let r=this.allocateCursor(null,this.head);for(;r.next!==null;){let i=r.next;r.next=i.next,t.call(n,i.data,i,this)}this.releaseCursor()}forEachRight(t,n=this){let r=this.allocateCursor(this.tail,null);for(;r.prev!==null;){let i=r.prev;r.prev=i.prev,t.call(n,i.data,i,this)}this.releaseCursor()}reduce(t,n,r=this){let i=this.allocateCursor(null,this.head),o=n,s;for(;i.next!==null;)s=i.next,i.next=s.next,o=t.call(r,o,s.data,s,this);return this.releaseCursor(),o}reduceRight(t,n,r=this){let i=this.allocateCursor(this.tail,null),o=n,s;for(;i.prev!==null;)s=i.prev,i.prev=s.prev,o=t.call(r,o,s.data,s,this);return this.releaseCursor(),o}some(t,n=this){for(let r=this.head;r!==null;r=r.next)if(t.call(n,r.data,r,this))return!0;return!1}map(t,n=this){let r=new e;for(let i=this.head;i!==null;i=i.next)r.appendData(t.call(n,i.data,i,this));return r}filter(t,n=this){let r=new e;for(let i=this.head;i!==null;i=i.next)t.call(n,i.data,i,this)&&r.appendData(i.data);return r}nextUntil(t,n,r=this){if(t===null)return;let i=this.allocateCursor(null,t);for(;i.next!==null;){let o=i.next;if(i.next=o.next,n.call(r,o.data,o,this))break}this.releaseCursor()}prevUntil(t,n,r=this){if(t===null)return;let i=this.allocateCursor(t,null);for(;i.prev!==null;){let o=i.prev;if(i.prev=o.prev,n.call(r,o.data,o,this))break}this.releaseCursor()}clear(){this.head=null,this.tail=null}copy(){let t=new e;for(let n of this)t.appendData(n);return t}prepend(t){return this.updateCursors(null,t,this.head,t),this.head!==null?(this.head.prev=t,t.next=this.head):this.tail=t,this.head=t,this}prependData(t){return this.prepend(e.createItem(t))}append(t){return this.insert(t)}appendData(t){return this.insert(e.createItem(t))}insert(t,n=null){if(n!==null)if(this.updateCursors(n.prev,t,n,t),n.prev===null){if(this.head!==n)throw new Error(\"before doesn't belong to list\");this.head=t,n.prev=t,t.next=n,this.updateCursors(null,t)}else n.prev.next=t,t.prev=n.prev,n.prev=t,t.next=n;else this.updateCursors(this.tail,t,null,t),this.tail!==null?(this.tail.next=t,t.prev=this.tail):this.head=t,this.tail=t;return this}insertData(t,n){return this.insert(e.createItem(t),n)}remove(t){if(this.updateCursors(t,t.prev,t,t.next),t.prev!==null)t.prev.next=t.next;else{if(this.head!==t)throw new Error(\"item doesn't belong to list\");this.head=t.next}if(t.next!==null)t.next.prev=t.prev;else{if(this.tail!==t)throw new Error(\"item doesn't belong to list\");this.tail=t.prev}return t.prev=null,t.next=null,t}push(t){this.insert(e.createItem(t))}pop(){return this.tail!==null?this.remove(this.tail):null}unshift(t){this.prepend(e.createItem(t))}shift(){return this.head!==null?this.remove(this.head):null}prependList(t){return this.insertList(t,this.head)}appendList(t){return this.insertList(t)}insertList(t,n){return t.head===null?this:(n!=null?(this.updateCursors(n.prev,t.tail,n,t.head),n.prev!==null?(n.prev.next=t.head,t.head.prev=n.prev):this.head=t.head,n.prev=t.tail,t.tail.next=n):(this.updateCursors(this.tail,t.tail,null,t.head),this.tail!==null?(this.tail.next=t.head,t.head.prev=this.tail):this.head=t.head,this.tail=t.tail),t.head=null,t.tail=null,this)}replace(t,n){\"head\"in n?this.insertList(n,t):this.insert(n,t),this.remove(t)}};function dr(e,t){let n=Object.create(SyntaxError.prototype),r=new Error;return Object.assign(n,{name:e,message:t,get stack(){return(r.stack||\"\").replace(/^(.+\\n){1,3}/,`${e}: ${t}\n`)}})}var $a=100,zf=60,Bf=\"    \";function Qf({source:e,line:t,column:n,baseLine:r,baseColumn:i},o){function s(x,L){return p.slice(x,L).map((Q,R)=>String(x+R+1).padStart(g)+\" |\"+Q).join(`\n`)}let l=`\n`.repeat(Math.max(r-1,0)),c=\" \".repeat(Math.max(i-1,0)),p=(l+c+e).split(/\\r\\n?|\\n|\\f/),f=Math.max(1,t-o)-1,m=Math.min(t+o,p.length+1),g=Math.max(4,String(m).length)+1,S=0;n+=(Bf.length-1)*(p[t-1].substr(0,n-1).match(/\\t/g)||[]).length,n>$a&&(S=n-zf+3,n=zf-2);for(let x=f;x<=m;x++)x>=0&&x<p.length&&(p[x]=p[x].replace(/\\t/g,Bf),p[x]=(S>0&&p[x].length>S?\"\\u2026\":\"\")+p[x].substr(S,$a-2)+(p[x].length>S+$a-1?\"\\u2026\":\"\"));return[s(f,t),new Array(n+g+2).join(\"-\")+\"^\",s(t,m)].filter(Boolean).join(`\n`).replace(/^(\\s+\\d+\\s+\\|\\n)+/,\"\").replace(/\\n(\\s+\\d+\\s+\\|)+$/,\"\")}function qa(e,t,n,r,i,o=1,s=1){return Object.assign(dr(\"SyntaxError\",e),{source:t,offset:n,line:r,column:i,sourceFragment(c){return Qf({source:t,line:r,column:i,baseLine:o,baseColumn:s},isNaN(c)?0:c)},get formattedMessage(){return`Parse error: ${e}\n`+Qf({source:t,line:r,column:i,baseLine:o,baseColumn:s},2)}})}function Hf(e){let t=this.createList(),n=!1,r={recognizer:e};for(;!this.eof;){switch(this.tokenType){case 25:this.next();continue;case 13:n=!0,this.next();continue}let i=e.getNode.call(this,r);if(i===void 0)break;n&&(e.onWhiteSpace&&e.onWhiteSpace.call(this,i,t,r),n=!1),t.push(i)}return n&&e.onWhiteSpace&&e.onWhiteSpace.call(this,null,t,r),t}var Gr=()=>{},Cx=33,Ax=35,Ja=59,Wf=123,Uf=0,_x={createList(){return[]},createSingleNodeList(e){return[e]},getFirstListNode(e){return e&&e[0]||null},getLastListNode(e){return e&&e.length>0?e[e.length-1]:null}},Lx={createList(){return new ke},createSingleNodeList(e){return new ke().appendData(e)},getFirstListNode(e){return e&&e.first},getLastListNode(e){return e&&e.last}};function Px(e){return function(){return this[e]()}}function Ya(e){let t=Object.create(null);for(let n of Object.keys(e)){let r=e[n],i=r.parse||r;i&&(t[n]=i)}return t}function Rx(e){let t={context:Object.create(null),features:Object.assign(Object.create(null),e.features),scope:Object.assign(Object.create(null),e.scope),atrule:Ya(e.atrule),pseudo:Ya(e.pseudo),node:Ya(e.node)};for(let[n,r]of Object.entries(e.parseContext))switch(typeof r){case\"function\":t.context[n]=r;break;case\"string\":t.context[n]=Px(r);break}return{config:t,...t,...t.node}}function Gf(e){let t=\"\",n=\"<unknown>\",r=!1,i=Gr,o=!1,s=new Jo,l=Object.assign(new Yo,Rx(e||{}),{parseAtrulePrelude:!0,parseRulePrelude:!0,parseValue:!0,parseCustomProperty:!1,readSequence:Hf,consumeUntilBalanceEnd:()=>0,consumeUntilLeftCurlyBracket(f){return f===Wf?1:0},consumeUntilLeftCurlyBracketOrSemicolon(f){return f===Wf||f===Ja?1:0},consumeUntilExclamationMarkOrSemicolon(f){return f===Cx||f===Ja?1:0},consumeUntilSemicolonIncluded(f){return f===Ja?2:0},createList:Gr,createSingleNodeList:Gr,getFirstListNode:Gr,getLastListNode:Gr,parseWithFallback(f,m){let g=this.tokenIndex;try{return f.call(this)}catch(S){if(o)throw S;this.skip(g-this.tokenIndex);let x=m.call(this);return o=!0,i(S,x),o=!1,x}},lookupNonWSType(f){let m;do if(m=this.lookupType(f++),m!==13&&m!==25)return m;while(m!==Uf);return Uf},charCodeAt(f){return f>=0&&f<t.length?t.charCodeAt(f):0},substring(f,m){return t.substring(f,m)},substrToCursor(f){return this.source.substring(f,this.tokenStart)},cmpChar(f,m){return dn(t,f,m)},cmpStr(f,m,g){return fn(t,f,m,g)},consume(f){let m=this.tokenStart;return this.eat(f),this.substrToCursor(m)},consumeFunctionName(){let f=t.substring(this.tokenStart,this.tokenEnd-1);return this.eat(2),f},consumeNumber(f){let m=t.substring(this.tokenStart,ur(t,this.tokenStart));return this.eat(f),m},eat(f){if(this.tokenType!==f){let m=Hr[f].slice(0,-6).replace(/-/g,\" \").replace(/^./,x=>x.toUpperCase()),g=`${/[[\\](){}]/.test(m)?`\"${m}\"`:m} is expected`,S=this.tokenStart;switch(f){case 1:this.tokenType===2||this.tokenType===7?(S=this.tokenEnd-1,g=\"Identifier is expected but function found\"):g=\"Identifier is expected\";break;case 4:this.isDelim(Ax)&&(this.next(),S++,g=\"Name is expected\");break;case 11:this.tokenType===10&&(S=this.tokenEnd,g=\"Percent sign is expected\");break}this.error(g,S)}this.next()},eatIdent(f){(this.tokenType!==1||this.lookupValue(0,f)===!1)&&this.error(`Identifier \"${f}\" is expected`),this.next()},eatDelim(f){this.isDelim(f)||this.error(`Delim \"${String.fromCharCode(f)}\" is expected`),this.next()},getLocation(f,m){return r?s.getLocationRange(f,m,n):null},getLocationFromList(f){if(r){let m=this.getFirstListNode(f),g=this.getLastListNode(f);return s.getLocationRange(m!==null?m.loc.start.offset-s.startOffset:this.tokenStart,g!==null?g.loc.end.offset-s.startOffset:this.tokenStart,n)}return null},error(f,m){let g=typeof m<\"u\"&&m<t.length?s.getLocation(m):this.eof?s.getLocation(Nf(t,t.length-1)):s.getLocation(this.tokenStart);throw new qa(f||\"Unexpected input\",t,g.offset,g.line,g.column,s.startLine,s.startColumn)}}),c=()=>({filename:n,source:t,tokenCount:l.tokenCount,getTokenType:f=>l.getTokenType(f),getTokenTypeName:f=>Hr[l.getTokenType(f)],getTokenStart:f=>l.getTokenStart(f),getTokenEnd:f=>l.getTokenEnd(f),getTokenValue:f=>l.source.substring(l.getTokenStart(f),l.getTokenEnd(f)),substring:(f,m)=>l.source.substring(f,m),balance:l.balance.subarray(0,l.tokenCount+1),isBlockOpenerTokenType:l.isBlockOpenerTokenType,isBlockCloserTokenType:l.isBlockCloserTokenType,getBlockTokenPairIndex:f=>l.getBlockTokenPairIndex(f),getLocation:f=>s.getLocation(f,n),getRangeLocation:(f,m)=>s.getLocationRange(f,m,n)});return Object.assign(function(f,m){t=f,m=m||{},l.setSource(t,Fn),s.setSource(t,m.offset,m.line,m.column),n=m.filename||\"<unknown>\",r=!!m.positions,i=typeof m.onParseError==\"function\"?m.onParseError:Gr,o=!1,l.parseAtrulePrelude=\"parseAtrulePrelude\"in m?!!m.parseAtrulePrelude:!0,l.parseRulePrelude=\"parseRulePrelude\"in m?!!m.parseRulePrelude:!0,l.parseValue=\"parseValue\"in m?!!m.parseValue:!0,l.parseCustomProperty=\"parseCustomProperty\"in m?!!m.parseCustomProperty:!1;let{context:g=\"default\",list:S=!0,onComment:x,onToken:L}=m;if(!(g in l.context))throw new Error(\"Unknown context `\"+g+\"`\");Object.assign(l,S?Lx:_x),Array.isArray(L)?l.forEachToken((R,H,F)=>{L.push({type:R,start:H,end:F})}):typeof L==\"function\"&&l.forEachToken(L.bind(c())),typeof x==\"function\"&&l.forEachToken((R,H,F)=>{if(R===25){let W=l.getLocation(H,F),ce=fn(t,F-2,F,\"*/\")?t.slice(H+2,F-2):t.slice(H+2,F);x(ce,W)}});let Q=l.context[g].call(l,m);return l.eof||l.error(),Q},{SyntaxError:qa,config:l.config})}var pm=Wy(cm(),1),um=new Set([\"Atrule\",\"Selector\",\"Declaration\"]);function dm(e){let t=new pm.SourceMapGenerator,n={line:1,column:0},r={line:0,column:0},i={line:1,column:0},o={generated:i},s=1,l=0,c=!1,p=e.node;e.node=function(g){if(g.loc&&g.loc.start&&um.has(g.type)){let S=g.loc.start.line,x=g.loc.start.column-1;(r.line!==S||r.column!==x)&&(r.line=S,r.column=x,n.line=s,n.column=l,c&&(c=!1,(n.line!==i.line||n.column!==i.column)&&t.addMapping(o)),c=!0,t.addMapping({source:g.loc.source,original:r,generated:n}))}p.call(this,g),c&&um.has(g.type)&&(i.line=s,i.column=l)};let f=e.emit;e.emit=function(g,S,x){for(let L=0;L<g.length;L++)g.charCodeAt(L)===10?(s++,l=0):l++;f(g,S,x)};let m=e.result;return e.result=function(){return c&&t.addMapping(o),{css:m(),map:t}},e}var ns={};I(ns,{safe:()=>il,spec:()=>Zx});var Yx=43,Kx=45,rl=(e,t)=>(e===9&&(e=t),typeof e==\"string\"&&(e=Math.min(e.charCodeAt(0),128)<<6),e<<1),fm=[[1,1],[1,2],[1,7],[1,8],[1,\"-\"],[1,10],[1,11],[1,12],[1,15],[1,21],[3,1],[3,2],[3,7],[3,8],[3,\"-\"],[3,10],[3,11],[3,12],[3,15],[4,1],[4,2],[4,7],[4,8],[4,\"-\"],[4,10],[4,11],[4,12],[4,15],[12,1],[12,2],[12,7],[12,8],[12,\"-\"],[12,10],[12,11],[12,12],[12,15],[\"#\",1],[\"#\",2],[\"#\",7],[\"#\",8],[\"#\",\"-\"],[\"#\",10],[\"#\",11],[\"#\",12],[\"#\",15],[\"-\",1],[\"-\",2],[\"-\",7],[\"-\",8],[\"-\",\"-\"],[\"-\",10],[\"-\",11],[\"-\",12],[\"-\",15],[10,1],[10,2],[10,7],[10,8],[10,10],[10,11],[10,12],[10,\"%\"],[10,15],[\"@\",1],[\"@\",2],[\"@\",7],[\"@\",8],[\"@\",\"-\"],[\"@\",15],[\".\",10],[\".\",11],[\".\",12],[\"+\",10],[\"+\",11],[\"+\",12],[\"/\",\"*\"]],Xx=fm.concat([[1,4],[12,4],[4,4],[3,21],[3,5],[3,16],[11,11],[11,12],[11,2],[11,\"-\"],[22,1],[22,2],[22,11],[22,12],[22,4],[22,\"-\"]]);function mm(e){let t=new Set(e.map(([n,r])=>rl(n)<<16|rl(r)));return function(n,r,i){let o=rl(r,i),s=i.charCodeAt(0),l=s===Kx&&r!==1&&r!==2&&r!==15||s===Yx?t.has((n&65534)<<16|s<<7):t.has((n&65534)<<16|o);return o|l}}var Zx=mm(fm),il=mm(Xx);var ew=92;function tw(e,t){if(typeof t==\"function\"){let n=null;e.children.forEach(r=>{n!==null&&t.call(this,n),this.node(r),n=r});return}e.children.forEach(this.node,this)}function hm(e){let t=new Map;for(let[n,r]of Object.entries(e.node))typeof(r.generate||r)==\"function\"&&t.set(n,r.generate||r);return function(n,r){let i=\"\",o=0,s={node(c){if(t.has(c.type))t.get(c.type).call(l,c);else throw new Error(\"Unknown node type: \"+c.type)},tokenBefore:il,token(c,p,f){o=this.tokenBefore(o,c,p),!f&&o&1&&this.emit(\" \",13,!0),this.emit(p,c,!1),c===9&&p.charCodeAt(0)===ew&&this.emit(`\n`,13,!0)},emit(c){i+=c},result(){return i}};r&&(typeof r.decorator==\"function\"&&(s=r.decorator(s)),r.sourceMap&&(s=dm(s)),r.mode in ns&&(s.tokenBefore=ns[r.mode]));let l={node:c=>s.node(c),children:tw,token:(c,p)=>s.token(c,p),tokenize:c=>Fn(c,(p,f,m)=>{s.token(p,c.slice(f,m),f!==0)})};return s.node(n),s.result()}}function gm(e){return{fromPlainObject(t){return e(t,{enter(n){n.children&&!(n.children instanceof ke)&&(n.children=new ke().fromArray(n.children))}}),t},toPlainObject(t){return e(t,{leave(n){n.children&&n.children instanceof ke&&(n.children=n.children.toArray())}}),t}}}var{hasOwnProperty:ol}=Object.prototype,Ri=function(){};function ym(e){return typeof e==\"function\"?e:Ri}function bm(e,t){return function(n,r,i){n.type===t&&e.call(this,n,r,i)}}function nw(e,t){let n=t.structure,r=[];for(let i in n){if(ol.call(n,i)===!1)continue;let o=n[i],s={name:i,type:!1,nullable:!1};Array.isArray(o)||(o=[o]);for(let l of o)l===null?s.nullable=!0:typeof l==\"string\"?s.type=\"node\":Array.isArray(l)&&(s.type=\"list\");s.type&&r.push(s)}return r.length?{context:t.walkContext,fields:r}:null}function rw(e){let t={};for(let n in e.node)if(ol.call(e.node,n)){let r=e.node[n];if(!r.structure)throw new Error(\"Missed `structure` field in `\"+n+\"` node type definition\");t[n]=nw(n,r)}return t}function xm(e,t){let n=e.fields.slice(),r=e.context,i=typeof r==\"string\";return t&&n.reverse(),function(o,s,l,c){let p;i&&(p=s[r],s[r]=o);for(let f of n){let m=o[f.name];if(!f.nullable||m){if(f.type===\"list\"){if(t?m.reduceRight(c,!1):m.reduce(c,!1))return!0}else if(l(m))return!0}}i&&(s[r]=p)}}function wm({StyleSheet:e,Atrule:t,Rule:n,Block:r,DeclarationList:i}){return{Atrule:{StyleSheet:e,Atrule:t,Rule:n,Block:r},Rule:{StyleSheet:e,Atrule:t,Rule:n,Block:r},Declaration:{StyleSheet:e,Atrule:t,Rule:n,Block:r,DeclarationList:i}}}function km(e){let t=rw(e),n={},r={},i=Symbol(\"break-walk\"),o=Symbol(\"skip-node\");for(let p in t)ol.call(t,p)&&t[p]!==null&&(n[p]=xm(t[p],!1),r[p]=xm(t[p],!0));let s=wm(n),l=wm(r),c=function(p,f){function m(R,H,F){let W=g.call(Q,R,H,F);return W===i?!0:W===o?!1:!!(x.hasOwnProperty(R.type)&&x[R.type](R,Q,m,L)||S.call(Q,R,H,F)===i)}let g=Ri,S=Ri,x=n,L=(R,H,F,W)=>R||m(H,F,W),Q={break:i,skip:o,root:p,stylesheet:null,atrule:null,atrulePrelude:null,rule:null,selector:null,block:null,declaration:null,function:null};if(typeof f==\"function\")g=f;else if(f&&(g=ym(f.enter),S=ym(f.leave),f.reverse&&(x=r),f.visit)){if(s.hasOwnProperty(f.visit))x=f.reverse?l[f.visit]:s[f.visit];else if(!t.hasOwnProperty(f.visit))throw new Error(\"Bad value `\"+f.visit+\"` for `visit` option (should be: \"+Object.keys(t).sort().join(\", \")+\")\");g=bm(g,f.visit),S=bm(S,f.visit)}if(g===Ri&&S===Ri)throw new Error(\"Neither `enter` nor `leave` walker handler is set or both aren't a function\");m(p)};return c.break=i,c.skip=o,c.find=function(p,f){let m=null;return c(p,function(g,S,x){if(f.call(this,g,S,x))return m=g,i}),m},c.findLast=function(p,f){let m=null;return c(p,{reverse:!0,enter(g,S,x){if(f.call(this,g,S,x))return m=g,i}}),m},c.findAll=function(p,f){let m=[];return c(p,function(g,S,x){f.call(this,g,S,x)&&m.push(g)}),m},c}function iw(e){return e}function ow(e){let{min:t,max:n,comma:r}=e;return t===0&&n===0?r?\"#?\":\"*\":t===0&&n===1?\"?\":t===1&&n===0?r?\"#\":\"+\":t===1&&n===1?\"\":(r?\"#\":\"\")+(t===n?\"{\"+t+\"}\":\"{\"+t+\",\"+(n!==0?n:\"\")+\"}\")}function sw(e){if(e.type===\"Range\")return\" [\"+(e.min===null?\"-\\u221E\":e.min)+\",\"+(e.max===null?\"\\u221E\":e.max)+\"]\";throw new Error(\"Unknown node type `\"+e.type+\"`\")}function aw(e,t,n,r){let i=e.combinator===\" \"||r?e.combinator:\" \"+e.combinator+\" \",o=e.terms.map(s=>rs(s,t,n,r)).join(i);return e.explicit||n?(r||o[0]===\",\"?\"[\":\"[ \")+o+(r?\"]\":\" ]\"):o}function rs(e,t,n,r){let i;switch(e.type){case\"Group\":i=aw(e,t,n,r)+(e.disallowEmpty?\"!\":\"\");break;case\"Multiplier\":return rs(e.term,t,n,r)+t(ow(e),e);case\"Boolean\":i=\"<boolean-expr[\"+rs(e.term,t,n,r)+\"]>\";break;case\"Type\":i=\"<\"+e.name+(e.opts?t(sw(e.opts),e.opts):\"\")+\">\";break;case\"Property\":i=\"<'\"+e.name+\"'>\";break;case\"Keyword\":i=e.name;break;case\"AtKeyword\":i=\"@\"+e.name;break;case\"Function\":i=e.name+\"(\";break;case\"String\":case\"Token\":i=e.value;break;case\"Comma\":i=\",\";break;default:throw new Error(\"Unknown node type `\"+e.type+\"`\")}return t(i,e)}function jr(e,t){let n=iw,r=!1,i=!1;return typeof t==\"function\"?n=t:t&&(r=!!t.forceBraces,i=!!t.compact,typeof t.decorate==\"function\"&&(n=t.decorate)),rs(e,n,r,i)}var Sm={offset:0,line:1,column:1};function lw(e,t){let n=e.tokens,r=e.longestMatch,i=r<n.length&&n[r].node||null,o=i!==t?i:null,s=0,l=0,c=0,p=\"\",f,m;for(let g=0;g<n.length;g++){let S=n[g].value;g===r&&(l=S.length,s=p.length),o!==null&&n[g].node===o&&(g<=r?c++:c=0),p+=S}return r===n.length||c>1?(f=is(o||t,\"end\")||Mi(Sm,p),m=Mi(f)):(f=is(o,\"start\")||Mi(is(t,\"start\")||Sm,p.slice(0,s)),m=is(o,\"end\")||Mi(f,p.substr(s,l))),{css:p,mismatchOffset:s,mismatchLength:l,start:f,end:m}}function is(e,t){let n=e&&e.loc&&e.loc[t];return n?\"line\"in n?Mi(n):n:null}function Mi({offset:e,line:t,column:n},r){let i={offset:e,line:t,column:n};if(r){let o=r.split(/\\n|\\r\\n?|\\f/);i.offset+=r.length,i.line+=o.length-1,i.column=o.length===1?i.column+r.length:o.pop().length+1}return i}var $r=function(e,t){let n=dr(\"SyntaxReferenceError\",e+(t?\" `\"+t+\"`\":\"\"));return n.reference=t,n},vm=function(e,t,n,r){let i=dr(\"SyntaxMatchError\",e),{css:o,mismatchOffset:s,mismatchLength:l,start:c,end:p}=lw(r,n);return i.rawMessage=e,i.syntax=t?jr(t):\"<generic>\",i.css=o,i.mismatchOffset=s,i.mismatchLength=l,i.message=e+`\n  syntax: `+i.syntax+`\n   value: `+(o||\"<empty string>\")+`\n  --------`+new Array(i.mismatchOffset+1).join(\"-\")+\"^\",Object.assign(i,c),i.loc={source:n&&n.loc&&n.loc.source||\"<unknown>\",start:c,end:p},i};var os=new Map,qr=new Map,ss=45,as=cw,sl=uw;function ls(e,t){return t=t||0,e.length-t>=2&&e.charCodeAt(t)===ss&&e.charCodeAt(t+1)===ss}function Tm(e,t){if(t=t||0,e.length-t>=3&&e.charCodeAt(t)===ss&&e.charCodeAt(t+1)!==ss){let n=e.indexOf(\"-\",t+2);if(n!==-1)return e.substring(t,n+1)}return\"\"}function cw(e){if(os.has(e))return os.get(e);let t=e.toLowerCase(),n=os.get(t);if(n===void 0){let r=ls(t,0),i=r?\"\":Tm(t,0);n=Object.freeze({basename:t.substr(i.length),name:t,prefix:i,vendor:i,custom:r})}return os.set(e,n),n}function uw(e){if(qr.has(e))return qr.get(e);let t=e,n=e[0];n===\"/\"?n=e[1]===\"/\"?\"//\":\"/\":n!==\"_\"&&n!==\"*\"&&n!==\"$\"&&n!==\"#\"&&n!==\"+\"&&n!==\"&\"&&(n=\"\");let r=ls(t,n.length);if(!r&&(t=t.toLowerCase(),qr.has(t))){let l=qr.get(t);return qr.set(e,l),l}let i=r?\"\":Tm(t,n.length),o=t.substr(0,n.length+i.length),s=Object.freeze({basename:t.substr(o.length),name:t.substr(n.length),hack:n,vendor:i,prefix:o,custom:r});return qr.set(e,s),s}var Jr=[\"initial\",\"inherit\",\"unset\",\"revert\",\"revert-layer\"];var Ii=43,Jt=45,al=110,Yr=!0,dw=!1;function cl(e,t){return e!==null&&e.type===9&&e.value.charCodeAt(0)===t}function Ni(e,t,n){for(;e!==null&&(e.type===13||e.type===25);)e=n(++t);return t}function zn(e,t,n,r){if(!e)return 0;let i=e.value.charCodeAt(t);if(i===Ii||i===Jt){if(n)return 0;t++}for(;t<e.value.length;t++)if(!ve(e.value.charCodeAt(t)))return 0;return r+1}function ll(e,t,n){let r=!1,i=Ni(e,t,n);if(e=n(i),e===null)return t;if(e.type!==10)if(cl(e,Ii)||cl(e,Jt)){if(r=!0,i=Ni(n(++i),i,n),e=n(i),e===null||e.type!==10)return 0}else return t;if(!r){let o=e.value.charCodeAt(0);if(o!==Ii&&o!==Jt)return 0}return zn(e,r?0:1,r,i)}function ul(e,t){let n=0;if(!e)return 0;if(e.type===10)return zn(e,0,dw,n);if(e.type===1&&e.value.charCodeAt(0)===Jt){if(!dn(e.value,1,al))return 0;switch(e.value.length){case 2:return ll(t(++n),n,t);case 3:return e.value.charCodeAt(2)!==Jt?0:(n=Ni(t(++n),n,t),e=t(n),zn(e,0,Yr,n));default:return e.value.charCodeAt(2)!==Jt?0:zn(e,3,Yr,n)}}else if(e.type===1||cl(e,Ii)&&t(n+1).type===1){if(e.type!==1&&(e=t(++n)),e===null||!dn(e.value,0,al))return 0;switch(e.value.length){case 1:return ll(t(++n),n,t);case 2:return e.value.charCodeAt(1)!==Jt?0:(n=Ni(t(++n),n,t),e=t(n),zn(e,0,Yr,n));default:return e.value.charCodeAt(1)!==Jt?0:zn(e,2,Yr,n)}}else if(e.type===12){let r=e.value.charCodeAt(0),i=r===Ii||r===Jt?1:0,o=i;for(;o<e.value.length&&ve(e.value.charCodeAt(o));o++);return o===i||!dn(e.value,o,al)?0:o+1===e.value.length?ll(t(++n),n,t):e.value.charCodeAt(o+1)!==Jt?0:o+2===e.value.length?(n=Ni(t(++n),n,t),e=t(n),zn(e,0,Yr,n)):zn(e,o+2,Yr,n)}return 0}var fw=43,Em=45,Cm=63,mw=117;function pl(e,t){return e!==null&&e.type===9&&e.value.charCodeAt(0)===t}function hw(e,t){return e.value.charCodeAt(0)===t}function Oi(e,t,n){let r=0;for(let i=t;i<e.value.length;i++){let o=e.value.charCodeAt(i);if(o===Em&&n&&r!==0)return Oi(e,t+r+1,!1),6;if(!rt(o)||++r>6)return 0}return r}function cs(e,t,n){if(!e)return 0;for(;pl(n(t),Cm);){if(++e>6)return 0;t++}return t}function dl(e,t){let n=0;if(e===null||e.type!==1||!dn(e.value,0,mw)||(e=t(++n),e===null))return 0;if(pl(e,fw))return e=t(++n),e===null?0:e.type===1?cs(Oi(e,0,!0),++n,t):pl(e,Cm)?cs(1,++n,t):0;if(e.type===10){let r=Oi(e,1,!0);return r===0?0:(e=t(++n),e===null?n:e.type===12||e.type===10?!hw(e,Em)||!Oi(e,1,!1)?0:n+1:cs(r,n,t))}return e.type===12?cs(Oi(e,1,!0),++n,t):0}var fl=[\"calc(\",\"-moz-calc(\",\"-webkit-calc(\"],ml=[\"min(\",\"max(\",\"clamp(\"],hl=[\"round(\",\"mod(\",\"rem(\"],gw=[\"sin(\",\"cos(\",\"tan(\"],yw=[\"asin(\",\"acos(\",\"atan(\",\"atan2(\"],bw=[\"pow(\",\"sqrt(\",\"log(\",\"exp(\",\"sign(\"],gl=[\"hypot(\"],yl=[\"abs(\"],Am=[...fl,...ml,...hl,...gw,...bw,...gl,...yl],xw=[...fl,...ml,...hl,...gl,...yl],yn=[...fl,...ml,...hl,...yw,...gl,...yl],bl=new Map([[2,22],[21,22],[19,20],[23,24]]);function Ft(e,t){return t<e.length?e.charCodeAt(t):0}function _m(e,t){return fn(e,0,e.length,t)}function Lm(e,t){for(let n=0;n<t.length;n++)if(_m(e,t[n]))return!0;return!1}function Pm(e,t){return t!==e.length-2?!1:Ft(e,t)===92&&ve(Ft(e,t+1))}function us(e,t,n){if(e&&e.type===\"Range\"){let r=Number(n!==void 0&&n!==t.length?t.substr(0,n):t);if(isNaN(r)||e.min!==null&&r<e.min&&typeof e.min!=\"string\"||e.max!==null&&r>e.max&&typeof e.max!=\"string\")return!0}return!1}function ww(e,t){let n=0,r=[],i=0;e:do{switch(e.type){case 24:case 22:case 20:if(e.type!==n)break e;if(n=r.pop(),r.length===0){i++;break e}break;case 2:case 21:case 19:case 23:r.push(n),n=bl.get(e.type);break}i++}while(e=t(i));return i}function St(e,t){return function(n,r,i){return n===null?0:n.type===2&&Lm(n.value,t)?ww(n,r):e(n,r,i)}}function me(e){return function(t){return t===null||t.type!==e?0:1}}function kw(e){if(e===null||e.type!==1)return 0;let t=e.value.toLowerCase();return Lm(t,Jr)||_m(t,\"default\")?0:1}function Rm(e){return e===null||e.type!==1||Ft(e.value,0)!==45||Ft(e.value,1)!==45?0:1}function Sw(e){return!Rm(e)||e.value===\"--\"?0:1}function vw(e){if(e===null||e.type!==4)return 0;let t=e.value.length;if(t!==4&&t!==5&&t!==7&&t!==9)return 0;for(let n=1;n<t;n++)if(!rt(Ft(e.value,n)))return 0;return 1}function Tw(e){return e===null||e.type!==4||!Br(Ft(e.value,1),Ft(e.value,2),Ft(e.value,3))?0:1}function Ew(e,t){if(!e)return 0;let n=0,r=[],i=0;e:do{switch(e.type){case 6:case 8:break e;case 24:case 22:case 20:if(e.type!==n)break e;n=r.pop();break;case 17:if(n===0)break e;break;case 9:if(n===0&&e.value===\"!\")break e;break;case 2:case 21:case 19:case 23:r.push(n),n=bl.get(e.type);break}i++}while(e=t(i));return i}function Cw(e,t){if(!e)return 0;let n=0,r=[],i=0;e:do{switch(e.type){case 6:case 8:break e;case 24:case 22:case 20:if(e.type!==n)break e;n=r.pop();break;case 2:case 21:case 19:case 23:r.push(n),n=bl.get(e.type);break}i++}while(e=t(i));return i}function bn(e){return e&&(e=new Set(e)),function(t,n,r){if(t===null||t.type!==12)return 0;let i=ur(t.value,0);if(e!==null){let o=t.value.indexOf(\"\\\\\",i),s=o===-1||!Pm(t.value,o)?t.value.substr(i):t.value.substring(i,o);if(e.has(s.toLowerCase())===!1)return 0}return us(r,t.value,i)?0:1}}function Aw(e,t,n){return e===null||e.type!==11||us(n,e.value,e.value.length-1)?0:1}function Mm(e){return typeof e!=\"function\"&&(e=function(){return 0}),function(t,n,r){return t!==null&&t.type===10&&Number(t.value)===0?1:e(t,n,r)}}function _w(e,t,n){if(e===null)return 0;let r=ur(e.value,0);return!(r===e.value.length)&&!Pm(e.value,r)||us(n,e.value,r)?0:1}function Lw(e,t,n){if(e===null||e.type!==10)return 0;let r=Ft(e.value,0)===43||Ft(e.value,0)===45?1:0;for(;r<e.value.length;r++)if(!ve(Ft(e.value,r)))return 0;return us(n,e.value,r)?0:1}var Pw={\"ident-token\":me(1),\"function-token\":me(2),\"at-keyword-token\":me(3),\"hash-token\":me(4),\"string-token\":me(5),\"bad-string-token\":me(6),\"url-token\":me(7),\"bad-url-token\":me(8),\"delim-token\":me(9),\"number-token\":me(10),\"percentage-token\":me(11),\"dimension-token\":me(12),\"whitespace-token\":me(13),\"CDO-token\":me(14),\"CDC-token\":me(15),\"colon-token\":me(16),\"semicolon-token\":me(17),\"comma-token\":me(18),\"[-token\":me(19),\"]-token\":me(20),\"(-token\":me(21),\")-token\":me(22),\"{-token\":me(23),\"}-token\":me(24)},Rw={string:me(5),ident:me(1),percentage:St(Aw,xw),zero:Mm(),number:St(_w,Am),integer:St(Lw,Am),\"custom-ident\":kw,\"dashed-ident\":Rm,\"custom-property-name\":Sw,\"hex-color\":vw,\"id-selector\":Tw,\"an-plus-b\":ul,urange:dl,\"declaration-value\":Ew,\"any-value\":Cw},Mw=[\"length\",\"angle\",\"time\",\"frequency\",\"resolution\",\"flex\",\"decibel\",\"semitones\"];function Nw(e){let{angle:t,decibel:n,frequency:r,flex:i,length:o,resolution:s,semitones:l,time:c}=e||{};return{dimension:St(bn(null),yn),angle:St(bn(t),yn),decibel:St(bn(n),yn),frequency:St(bn(r),yn),flex:St(bn(i),yn),length:St(Mm(bn(o)),yn),resolution:St(bn(s),yn),semitones:St(bn(l),yn),time:St(bn(c),yn)}}function Iw(e){let t=new Set;for(let n of Mw)if(Array.isArray(e[n]))for(let r of e[n])t.add(r.toLowerCase());return function(r){return r===null?0:r.type===9&&r.value===\"%\"||r.type===1&&t.has(r.value.toLowerCase())?1:0}}function Nm(e){return{...Pw,...Rw,...Nw(e),\"attr-unit\":Iw(e)}}var ps={};I(ps,{angle:()=>Dw,decibel:()=>Hw,flex:()=>Qw,frequency:()=>zw,length:()=>Ow,resolution:()=>Bw,semitones:()=>Ww,time:()=>Fw});var Ow=[\"cm\",\"mm\",\"q\",\"in\",\"pt\",\"pc\",\"px\",\"em\",\"rem\",\"ex\",\"rex\",\"cap\",\"rcap\",\"ch\",\"rch\",\"ic\",\"ric\",\"lh\",\"rlh\",\"vw\",\"svw\",\"lvw\",\"dvw\",\"vh\",\"svh\",\"lvh\",\"dvh\",\"vi\",\"svi\",\"lvi\",\"dvi\",\"vb\",\"svb\",\"lvb\",\"dvb\",\"vmin\",\"svmin\",\"lvmin\",\"dvmin\",\"vmax\",\"svmax\",\"lvmax\",\"dvmax\",\"cqw\",\"cqh\",\"cqi\",\"cqb\",\"cqmin\",\"cqmax\"],Dw=[\"deg\",\"grad\",\"rad\",\"turn\"],Fw=[\"s\",\"ms\"],zw=[\"hz\",\"khz\"],Bw=[\"dpi\",\"dpcm\",\"dppx\",\"x\"],Qw=[\"fr\"],Hw=[\"db\"],Ww=[\"st\"];function Im(e,t,n){return Object.assign(dr(\"SyntaxError\",e),{input:t,offset:n,rawMessage:e,message:e+`\n  `+t+`\n--`+new Array((n||t.length)+1).join(\"-\")+\"^\"})}var Uw=9,Gw=10,Vw=12,jw=13,$w=32,Om=new Uint8Array(128).map((e,t)=>/[a-zA-Z0-9\\-]/.test(String.fromCharCode(t))?1:0),ds=class{constructor(t){this.str=t,this.pos=0}charCodeAt(t){return t<this.str.length?this.str.charCodeAt(t):0}charCode(){return this.charCodeAt(this.pos)}isNameCharCode(t=this.charCode()){return t<128&&Om[t]===1}nextCharCode(){return this.charCodeAt(this.pos+1)}nextNonWsCode(t){return this.charCodeAt(this.findWsEnd(t))}skipWs(){this.pos=this.findWsEnd(this.pos)}findWsEnd(t){for(;t<this.str.length;t++){let n=this.str.charCodeAt(t);if(n!==jw&&n!==Gw&&n!==Vw&&n!==$w&&n!==Uw)break}return t}substringToPos(t){return this.str.substring(this.pos,this.pos=t)}eat(t){this.charCode()!==t&&this.error(\"Expect `\"+String.fromCharCode(t)+\"`\"),this.pos++}peek(){return this.pos<this.str.length?this.str.charAt(this.pos++):\"\"}error(t){throw new Im(t,this.str,this.pos)}scanSpaces(){return this.substringToPos(this.findWsEnd(this.pos))}scanWord(){let t=this.pos;for(;t<this.str.length;t++){let n=this.str.charCodeAt(t);if(n>=128||Om[n]===0)break}return this.pos===t&&this.error(\"Expect a keyword\"),this.substringToPos(t)}scanNumber(){let t=this.pos;for(;t<this.str.length;t++){let n=this.str.charCodeAt(t);if(n<48||n>57)break}return this.pos===t&&this.error(\"Expect a number\"),this.substringToPos(t)}scanString(){let t=this.str.indexOf(\"'\",this.pos+1);return t===-1&&(this.pos=this.str.length,this.error(\"Expect an apostrophe\")),this.substringToPos(t+1)}};var qw=9,Jw=10,Yw=12,Kw=13,Xw=32,Wm=33,Sl=35,Dm=38,fs=39,Um=40,Gm=41,Vm=42,vl=43,Tl=44,Fm=45,El=60,wl=62,ms=63,Zw=64,Di=91,Kr=93,hs=123,zm=124,kl=125,Bm=8734,Qm={\" \":1,\"&&\":2,\"||\":3,\"|\":4};function Hm(e){let t=null,n=null;return e.eat(hs),e.skipWs(),t=e.scanNumber(e),e.skipWs(),e.charCode()===Tl?(e.pos++,e.skipWs(),e.charCode()!==kl&&(n=e.scanNumber(e),e.skipWs())):n=t,e.eat(kl),{min:Number(t),max:n?Number(n):0}}function ek(e){let t=null,n=!1;switch(e.charCode()){case Vm:e.pos++,t={min:0,max:0};break;case vl:e.pos++,t={min:1,max:0};break;case ms:e.pos++,t={min:0,max:1};break;case Sl:e.pos++,n=!0,e.charCode()===hs?t=Hm(e):e.charCode()===ms?(e.pos++,t={min:0,max:0}):t={min:1,max:0};break;case hs:t=Hm(e);break;default:return null}return{type:\"Multiplier\",comma:n,min:t.min,max:t.max,term:null}}function xn(e,t){let n=ek(e);return n!==null?(n.term=t,e.charCode()===Sl&&e.charCodeAt(e.pos-1)===vl||e.charCode()===ms&&e.charCodeAt(e.pos-1)===kl?xn(e,n):n):t}function xl(e){let t=e.peek();return t===\"\"?null:xn(e,{type:\"Token\",value:t})}function tk(e){let t;return e.eat(El),e.eat(fs),t=e.scanWord(),e.eat(fs),e.eat(wl),xn(e,{type:\"Property\",name:t})}function nk(e){let t=null,n=null,r=1;return e.eat(Di),e.charCode()===Fm&&(e.peek(),r=-1),r==-1&&e.charCode()===Bm?e.peek():(t=r*Number(e.scanNumber(e)),e.isNameCharCode()&&(t+=e.scanWord())),e.skipWs(),e.eat(Tl),e.skipWs(),e.charCode()===Bm?e.peek():(r=1,e.charCode()===Fm&&(e.peek(),r=-1),n=r*Number(e.scanNumber(e)),e.isNameCharCode()&&(n+=e.scanWord())),e.eat(Kr),{type:\"Range\",min:t,max:n}}function rk(e){let t,n=null;if(e.eat(El),t=e.scanWord(),t===\"boolean-expr\"){e.eat(Di);let r=gs(e,Kr);return e.eat(Kr),e.eat(wl),xn(e,{type:\"Boolean\",term:r.terms.length===1?r.terms[0]:r})}return e.charCode()===Um&&e.nextCharCode()===Gm&&(e.pos+=2,t+=\"()\"),e.charCodeAt(e.findWsEnd(e.pos))===Di&&(e.skipWs(),n=nk(e)),e.eat(wl),xn(e,{type:\"Type\",name:t,opts:n})}function ik(e){let t=e.scanWord();return e.charCode()===Um?(e.pos++,{type:\"Function\",name:t}):xn(e,{type:\"Keyword\",name:t})}function ok(e,t){function n(i,o){return{type:\"Group\",terms:i,combinator:o,disallowEmpty:!1,explicit:!1}}let r;for(t=Object.keys(t).sort((i,o)=>Qm[i]-Qm[o]);t.length>0;){r=t.shift();let i=0,o=0;for(;i<e.length;i++){let s=e[i];s.type===\"Combinator\"&&(s.value===r?(o===-1&&(o=i-1),e.splice(i,1),i--):(o!==-1&&i-o>1&&(e.splice(o,i-o,n(e.slice(o,i),r)),i=o+1),o=-1))}o!==-1&&t.length&&e.splice(o,i-o,n(e.slice(o,i),r))}return r}function gs(e,t=-1){let n=Object.create(null),r=[],i=null,o=e.pos,s=!1;for(;e.charCode()!==t;){let l=s?gs(e,Gm):ak(e);if(!l)break;if(l.type!==\"Spaces\"){if(s){if(l.terms.length===0){s=!1;continue}if(l.combinator===\" \"){for(;l.terms.length>1;)n[\" \"]=!0,r.push({type:\"Combinator\",value:\" \"},l.terms.shift());l=l.terms[0]}}l.type===\"Combinator\"?((i===null||i.type===\"Combinator\")&&(e.pos=o,e.error(\"Unexpected combinator\")),n[l.value]=!0):i!==null&&i.type!==\"Combinator\"&&(n[\" \"]=!0,r.push({type:\"Combinator\",value:\" \"})),r.push(l),i=l,o=e.pos,s=l.type===\"Function\"}}return i!==null&&i.type===\"Combinator\"&&(e.pos-=o,e.error(\"Unexpected combinator\")),{type:\"Group\",terms:r,combinator:ok(r,n)||\" \",disallowEmpty:!1,explicit:!1}}function sk(e){let t;return e.eat(Di),t=gs(e,Kr),e.eat(Kr),t.explicit=!0,e.charCode()===Wm&&(e.pos++,t.disallowEmpty=!0),t}function ak(e){let t=e.charCode();switch(t){case Kr:break;case Di:return xn(e,sk(e));case El:return e.nextCharCode()===fs?tk(e):rk(e);case zm:return{type:\"Combinator\",value:e.substringToPos(e.pos+(e.nextCharCode()===zm?2:1))};case Dm:return e.pos++,e.eat(Dm),{type:\"Combinator\",value:\"&&\"};case Tl:return e.pos++,{type:\"Comma\"};case fs:return xn(e,{type:\"String\",value:e.scanString()});case Xw:case qw:case Jw:case Kw:case Yw:return{type:\"Spaces\",value:e.scanSpaces()};case Zw:return t=e.nextCharCode(),e.isNameCharCode(t)?(e.pos++,{type:\"AtKeyword\",name:e.scanWord()}):xl(e);case Vm:case vl:case ms:case Sl:case Wm:break;case hs:if(t=e.nextCharCode(),t<48||t>57)return xl(e);break;default:return e.isNameCharCode(t)?ik(e):xl(e)}}function Fi(e){let t=new ds(e),n=gs(t);return t.pos!==e.length&&t.error(\"Unexpected input\"),n.terms.length===1&&n.terms[0].type===\"Group\"?n.terms[0]:n}var zi=function(){};function jm(e){return typeof e==\"function\"?e:zi}function Cl(e,t,n){function r(s){switch(i.call(n,s),s.type){case\"Group\":s.terms.forEach(r);break;case\"Multiplier\":case\"Boolean\":r(s.term);break;case\"Type\":case\"Property\":case\"Keyword\":case\"AtKeyword\":case\"Function\":case\"String\":case\"Token\":case\"Comma\":break;default:throw new Error(\"Unknown type: \"+s.type)}o.call(n,s)}let i=zi,o=zi;if(typeof t==\"function\"?i=t:t&&(i=jm(t.enter),o=jm(t.leave)),i===zi&&o===zi)throw new Error(\"Neither `enter` nor `leave` walker handler is set or both aren't a function\");r(e,n)}var ck={decorator(e){let t=[],n=null;return{...e,node(r){let i=n;n=r,e.node.call(this,r),n=i},emit(r,i,o){t.push({type:i,value:r,node:o?null:n})},result(){return t}}}};function uk(e){let t=[];return Fn(e,(n,r,i)=>t.push({type:n,value:e.slice(r,i),node:null})),t}function $m(e,t){return typeof e==\"string\"?uk(e):t.generate(e,ck)}var ne={type:\"Match\"},le={type:\"Mismatch\"},ys={type:\"DisallowEmpty\"},pk=40,dk=41;function He(e,t,n){return t===ne&&n===le||e===ne&&t===ne&&n===ne?e:(e.type===\"If\"&&e.else===le&&t===ne&&(t=e.then,e=e.match),{type:\"If\",match:e,then:t,else:n})}function Jm(e){return e.length>2&&e.charCodeAt(e.length-2)===pk&&e.charCodeAt(e.length-1)===dk}function qm(e){return e.type===\"Keyword\"||e.type===\"AtKeyword\"||e.type===\"Function\"||e.type===\"Type\"&&Jm(e.name)}function Bn(e,t=\" \",n=!1){return{type:\"Group\",terms:e,combinator:t,disallowEmpty:!1,explicit:n}}function Bi(e,t,n=new Set){if(!n.has(e))switch(n.add(e),e.type){case\"If\":e.match=Bi(e.match,t,n),e.then=Bi(e.then,t,n),e.else=Bi(e.else,t,n);break;case\"Type\":return t[e.name]||e}return e}function Al(e,t,n){switch(e){case\" \":{let r=ne;for(let i=t.length-1;i>=0;i--){let o=t[i];r=He(o,r,le)}return r}case\"|\":{let r=le,i=null;for(let o=t.length-1;o>=0;o--){let s=t[o];if(qm(s)&&(i===null&&o>0&&qm(t[o-1])&&(i=Object.create(null),r=He({type:\"Enum\",map:i},ne,r)),i!==null)){let l=(Jm(s.name)?s.name.slice(0,-1):s.name).toLowerCase();if(!(l in i)){i[l]=s;continue}}i=null,r=He(s,ne,r)}return r}case\"&&\":{if(t.length>5)return{type:\"MatchOnce\",terms:t,all:!0};let r=le;for(let i=t.length-1;i>=0;i--){let o=t[i],s;t.length>1?s=Al(e,t.filter(function(l){return l!==o}),!1):s=ne,r=He(o,s,r)}return r}case\"||\":{if(t.length>5)return{type:\"MatchOnce\",terms:t,all:!1};let r=n?ne:le;for(let i=t.length-1;i>=0;i--){let o=t[i],s;t.length>1?s=Al(e,t.filter(function(l){return l!==o}),!0):s=ne,r=He(o,s,r)}return r}}}function fk(e){let t=ne,n=Xr(e.term);if(e.max===0)n=He(n,ys,le),t=He(n,null,le),t.then=He(ne,ne,t),e.comma&&(t.then.else=He({type:\"Comma\",syntax:e},t,le));else for(let r=e.min||1;r<=e.max;r++)e.comma&&t!==ne&&(t=He({type:\"Comma\",syntax:e},t,le)),t=He(n,He(ne,ne,t),le);if(e.min===0)t=He(ne,ne,t);else for(let r=0;r<e.min-1;r++)e.comma&&t!==ne&&(t=He({type:\"Comma\",syntax:e},t,le)),t=He(n,t,le);return t}function Xr(e){if(typeof e==\"function\")return{type:\"Generic\",fn:e};switch(e.type){case\"Group\":{let t=Al(e.combinator,e.terms.map(Xr),!1);return e.disallowEmpty&&(t=He(t,ys,le)),t}case\"Multiplier\":return fk(e);case\"Boolean\":{let t=Xr(e.term),n=Xr(Bn([Bn([{type:\"Keyword\",name:\"not\"},{type:\"Type\",name:\"!boolean-group\"}]),Bn([{type:\"Type\",name:\"!boolean-group\"},Bn([{type:\"Multiplier\",comma:!1,min:0,max:0,term:Bn([{type:\"Keyword\",name:\"and\"},{type:\"Type\",name:\"!boolean-group\"}])},{type:\"Multiplier\",comma:!1,min:0,max:0,term:Bn([{type:\"Keyword\",name:\"or\"},{type:\"Type\",name:\"!boolean-group\"}])}],\"|\")])],\"|\")),r=Xr(Bn([{type:\"Type\",name:\"!term\"},Bn([{type:\"Token\",value:\"(\"},{type:\"Type\",name:\"!self\"},{type:\"Token\",value:\")\"}]),{type:\"Type\",name:\"general-enclosed\"}],\"|\"));return Bi(r,{\"!term\":t,\"!self\":n}),Bi(n,{\"!boolean-group\":r}),n}case\"Type\":case\"Property\":return{type:e.type,name:e.name,syntax:e};case\"Keyword\":return{type:e.type,name:e.name.toLowerCase(),syntax:e};case\"AtKeyword\":return{type:e.type,name:\"@\"+e.name.toLowerCase(),syntax:e};case\"Function\":return{type:e.type,name:e.name.toLowerCase()+\"(\",syntax:e};case\"String\":return e.value.length===3?{type:\"Token\",value:e.value.charAt(1),syntax:e}:{type:e.type,value:e.value.substr(1,e.value.length-2).replace(/\\\\'/g,\"'\"),syntax:e};case\"Token\":return{type:e.type,value:e.value,syntax:e};case\"Comma\":return{type:e.type,syntax:e};default:throw new Error(\"Unknown node type:\",e.type)}}function Qi(e,t){return typeof e==\"string\"&&(e=Fi(e)),{type:\"MatchGraph\",match:Xr(e),syntax:t||null,source:e}}var{hasOwnProperty:Ym}=Object.prototype,mk=0,hk=1,Ll=2,th=3,Km=\"Match\",gk=\"Mismatch\",yk=\"Maximum iteration number exceeded (please fill an issue on https://github.com/csstree/csstree/issues)\",Xm=15e3,bk=0;function xk(e){let t=null,n=null,r=e;for(;r!==null;)n=r.prev,r.prev=t,t=r,r=n;return t}function _l(e,t){if(e.length!==t.length)return!1;for(let n=0;n<e.length;n++){let r=t.charCodeAt(n),i=e.charCodeAt(n);if(i>=65&&i<=90&&(i=i|32),i!==r)return!1}return!0}function wk(e){return e.type!==9?!1:e.value!==\"?\"}function Zm(e){return e===null?!0:e.type===18||e.type===2||e.type===21||e.type===19||e.type===23||wk(e)}function eh(e){return e===null?!0:e.type===22||e.type===20||e.type===24||e.type===9&&e.value===\"/\"}function kk(e,t,n){function r(){do H++,R=H<e.length?e[H]:null;while(R!==null&&(R.type===13||R.type===25))}function i(ce){let J=H+ce;return J<e.length?e[J]:null}function o(ce,J){return{nextState:ce,matchStack:W,syntaxStack:m,thenStack:g,tokenIndex:H,prev:J}}function s(ce){g={nextState:ce,matchStack:W,syntaxStack:m,prev:g}}function l(ce){S=o(ce,S)}function c(){W={type:hk,syntax:t.syntax,token:R,prev:W},r(),x=null,H>F&&(F=H)}function p(){m={syntax:t.syntax,opts:t.syntax.opts||m!==null&&m.opts||null,prev:m},W={type:Ll,syntax:t.syntax,token:W.token,prev:W}}function f(){W.type===Ll?W=W.prev:W={type:th,syntax:m.syntax,token:W.token,prev:W},m=m.prev}let m=null,g=null,S=null,x=null,L=0,Q=null,R=null,H=-1,F=0,W={type:mk,syntax:null,token:null,prev:null};for(r();Q===null&&++L<Xm;)switch(t.type){case\"Match\":if(g===null){if(R!==null&&(H!==e.length-1||R.value!==\"\\\\0\"&&R.value!==\"\\\\9\")){t=le;break}Q=Km;break}if(t=g.nextState,t===ys)if(g.matchStack===W){t=le;break}else t=ne;for(;g.syntaxStack!==m;)f();g=g.prev;break;case\"Mismatch\":if(x!==null&&x!==!1)(S===null||H>S.tokenIndex)&&(S=x,x=!1);else if(S===null){Q=gk;break}t=S.nextState,g=S.thenStack,m=S.syntaxStack,W=S.matchStack,H=S.tokenIndex,R=H<e.length?e[H]:null,S=S.prev;break;case\"MatchGraph\":t=t.match;break;case\"If\":t.else!==le&&l(t.else),t.then!==ne&&s(t.then),t=t.match;break;case\"MatchOnce\":t={type:\"MatchOnceBuffer\",syntax:t,index:0,mask:0};break;case\"MatchOnceBuffer\":{let X=t.syntax.terms;if(t.index===X.length){if(t.mask===0||t.syntax.all){t=le;break}t=ne;break}if(t.mask===(1<<X.length)-1){t=ne;break}for(;t.index<X.length;t.index++){let G=1<<t.index;if((t.mask&G)===0){l(t),s({type:\"AddMatchOnce\",syntax:t.syntax,mask:t.mask|G}),t=X[t.index++];break}}break}case\"AddMatchOnce\":t={type:\"MatchOnceBuffer\",syntax:t.syntax,index:0,mask:t.mask};break;case\"Enum\":if(R!==null){let X=R.value.toLowerCase();if(X.indexOf(\"\\\\\")!==-1&&(X=X.replace(/\\\\[09].*$/,\"\")),Ym.call(t.map,X)){t=t.map[X];break}}t=le;break;case\"Generic\":{let X=m!==null?m.opts:null,G=H+Math.floor(t.fn(R,i,X));if(!isNaN(G)&&G>H){for(;H<G;)c();t=ne}else t=le;break}case\"Type\":case\"Property\":{let X=t.type===\"Type\"?\"types\":\"properties\",G=Ym.call(n,X)?n[X][t.name]:null;if(!G||!G.match)throw new Error(\"Bad syntax reference: \"+(t.type===\"Type\"?\"<\"+t.name+\">\":\"<'\"+t.name+\"'>\"));if(x!==!1&&R!==null&&t.type===\"Type\"&&(t.name===\"custom-ident\"&&R.type===1||t.name===\"length\"&&R.value===\"0\")){x===null&&(x=o(t,S)),t=le;break}p(),t=G.matchRef||G.match;break}case\"Keyword\":{let X=t.name;if(R!==null){let G=R.value;if(G.indexOf(\"\\\\\")!==-1&&(G=G.replace(/\\\\[09].*$/,\"\")),_l(G,X)){c(),t=ne;break}}t=le;break}case\"AtKeyword\":case\"Function\":if(R!==null&&_l(R.value,t.name)){c(),t=ne;break}t=le;break;case\"Token\":if(R!==null&&R.value===t.value){c(),t=ne;break}t=le;break;case\"Comma\":R!==null&&R.type===18?Zm(W.token)?t=le:(c(),t=eh(R)?le:ne):t=Zm(W.token)||eh(R)?ne:le;break;case\"String\":let ce=\"\",J=H;for(;J<e.length&&ce.length<t.value.length;J++)ce+=e[J].value;if(_l(ce,t.value)){for(;H<J;)c();t=ne}else t=le;break;default:throw new Error(\"Unknown node type: \"+t.type)}switch(bk+=L,Q){case null:console.warn(\"[csstree-match] BREAK after \"+Xm+\" iterations\"),Q=yk,W=null;break;case Km:for(;m!==null;)f();break;default:W=null}return{tokens:e,reason:Q,iterations:L,match:W,longestMatch:F}}function Pl(e,t,n){let r=kk(e,t,n||{});if(r.match===null)return r;let i=r.match,o=r.match={syntax:t.syntax||null,match:[]},s=[o];for(i=xk(i).prev;i!==null;){switch(i.type){case Ll:o.match.push(o={syntax:i.syntax,match:[]}),s.push(o);break;case th:s.pop(),o=s[s.length-1];break;default:o.match.push({syntax:i.syntax||null,token:i.token.value,node:i.token.node})}i=i.prev}return r}var Ml={};I(Ml,{getTrace:()=>nh,isKeyword:()=>Tk,isProperty:()=>vk,isType:()=>Sk});function nh(e){function t(i){return i===null?!1:i.type===\"Type\"||i.type===\"Property\"||i.type===\"Keyword\"}function n(i){if(Array.isArray(i.match)){for(let o=0;o<i.match.length;o++)if(n(i.match[o]))return t(i.syntax)&&r.unshift(i.syntax),!0}else if(i.node===e)return r=t(i.syntax)?[i.syntax]:[],!0;return!1}let r=null;return this.matched!==null&&n(this.matched),r}function Sk(e,t){return Rl(this,e,n=>n.type===\"Type\"&&n.name===t)}function vk(e,t){return Rl(this,e,n=>n.type===\"Property\"&&n.name===t)}function Tk(e){return Rl(this,e,t=>t.type===\"Keyword\")}function Rl(e,t,n){let r=nh.call(e,t);return r===null?!1:r.some(n)}function rh(e){return\"node\"in e?e.node:rh(e.match[0])}function ih(e){return\"node\"in e?e.node:ih(e.match[e.match.length-1])}function Nl(e,t,n,r,i){function o(l){if(l.syntax!==null&&l.syntax.type===r&&l.syntax.name===i){let c=rh(l),p=ih(l);e.syntax.walk(t,function(f,m,g){if(f===c){let S=new ke;do{if(S.appendData(m.data),m.data===p)break;m=m.next}while(m!==null);s.push({parent:g,nodes:S})}})}Array.isArray(l.match)&&l.match.forEach(o)}let s=[];return n.matched!==null&&o(n.matched),s}var{hasOwnProperty:Hi}=Object.prototype;function Il(e){return typeof e==\"number\"&&isFinite(e)&&Math.floor(e)===e&&e>=0}function oh(e){return!!e&&Il(e.offset)&&Il(e.line)&&Il(e.column)}function Ek(e,t){return function(r,i){if(!r||r.constructor!==Object)return i(r,\"Type of node should be an Object\");for(let o in r){let s=!0;if(Hi.call(r,o)!==!1){if(o===\"type\")r.type!==e&&i(r,\"Wrong node type `\"+r.type+\"`, expected `\"+e+\"`\");else if(o===\"loc\"){if(r.loc===null)continue;if(r.loc&&r.loc.constructor===Object)if(typeof r.loc.source!=\"string\")o+=\".source\";else if(!oh(r.loc.start))o+=\".start\";else if(!oh(r.loc.end))o+=\".end\";else continue;s=!1}else if(t.hasOwnProperty(o)){s=!1;for(let l=0;!s&&l<t[o].length;l++){let c=t[o][l];switch(c){case String:s=typeof r[o]==\"string\";break;case Boolean:s=typeof r[o]==\"boolean\";break;case null:s=r[o]===null;break;default:typeof c==\"string\"?s=r[o]&&r[o].type===c:Array.isArray(c)&&(s=r[o]instanceof ke)}}}else i(r,\"Unknown field `\"+o+\"` for \"+e+\" node type\");s||i(r,\"Bad value for `\"+e+\".\"+o+\"`\")}}for(let o in t)Hi.call(t,o)&&Hi.call(r,o)===!1&&i(r,\"Field `\"+e+\".\"+o+\"` is missed\")}}function sh(e,t){let n=[];for(let r=0;r<e.length;r++){let i=e[r];if(i===String||i===Boolean)n.push(i.name.toLowerCase());else if(i===null)n.push(\"null\");else if(typeof i==\"string\")n.push(i);else if(Array.isArray(i))n.push(\"List<\"+(sh(i,t)||\"any\")+\">\");else throw new Error(\"Wrong value `\"+i+\"` in `\"+t+\"` structure definition\")}return n.join(\" | \")}function Ck(e,t){let n=t.structure,r={type:String,loc:!0},i={type:'\"'+e+'\"'};for(let o in n){if(Hi.call(n,o)===!1)continue;let s=r[o]=Array.isArray(n[o])?n[o].slice():[n[o]];i[o]=sh(s,e+\".\"+o)}return{docs:i,check:Ek(e,r)}}function ah(e){let t={};if(e.node){for(let n in e.node)if(Hi.call(e.node,n)){let r=e.node[n];if(r.structure)t[n]=Ck(n,r);else throw new Error(\"Missed `structure` field in `\"+n+\"` node type definition\")}}return t}function Ol(e,t,n){let r={};for(let i in e)e[i].syntax&&(r[i]=n?e[i].syntax:jr(e[i].syntax,{compact:t}));return r}function Ak(e,t,n){let r={};for(let[i,o]of Object.entries(e))r[i]={prelude:o.prelude&&(n?o.prelude.syntax:jr(o.prelude.syntax,{compact:t})),descriptors:o.descriptors&&Ol(o.descriptors,t,n)};return r}function _k(e){for(let t=0;t<e.length;t++)if(e[t].value.toLowerCase()===\"var(\")return!0;return!1}function Lk(e){let t=e.terms[0];return e.explicit===!1&&e.terms.length===1&&t.type===\"Multiplier\"&&t.comma===!0}function zt(e,t,n){return{matched:e,iterations:n,error:t,...Ml}}function Zr(e,t,n,r){let i=$m(n,e.syntax),o;return _k(i)?zt(null,new Error(\"Matching for a tree with var() is not supported\")):(r&&(o=Pl(i,e.cssWideKeywordsSyntax,e)),(!r||!o.match)&&(o=Pl(i,t.match,e),!o.match)?zt(null,new vm(o.reason,t.syntax,n,o),o.iterations):zt(o.match,null,o.iterations))}var Wi=class{constructor(t,n,r){if(this.cssWideKeywords=Jr,this.syntax=n,this.generic=!1,this.units={...ps},this.atrules=Object.create(null),this.properties=Object.create(null),this.types=Object.create(null),this.structure=r||ah(t),t){if(t.cssWideKeywords&&(this.cssWideKeywords=t.cssWideKeywords),t.units)for(let i of Object.keys(ps))Array.isArray(t.units[i])&&(this.units[i]=t.units[i]);if(t.types)for(let[i,o]of Object.entries(t.types))this.addType_(i,o);if(t.generic){this.generic=!0;for(let[i,o]of Object.entries(Nm(this.units)))this.addType_(i,o)}if(t.atrules)for(let[i,o]of Object.entries(t.atrules))this.addAtrule_(i,o);if(t.properties)for(let[i,o]of Object.entries(t.properties))this.addProperty_(i,o)}this.cssWideKeywordsSyntax=Qi(this.cssWideKeywords.join(\" |  \"))}checkStructure(t){function n(o,s){i.push({node:o,message:s})}let r=this.structure,i=[];return this.syntax.walk(t,function(o){r.hasOwnProperty(o.type)?r[o.type].check(o,n):n(o,\"Unknown node type `\"+o.type+\"`\")}),i.length?i:!1}createDescriptor(t,n,r,i=null){let o={type:n,name:r},s={type:n,name:r,parent:i,serializable:typeof t==\"string\"||t&&typeof t.type==\"string\",syntax:null,match:null,matchRef:null};return typeof t==\"function\"?s.match=Qi(t,o):(typeof t==\"string\"?Object.defineProperty(s,\"syntax\",{get(){return Object.defineProperty(s,\"syntax\",{value:Fi(t)}),s.syntax}}):s.syntax=t,Object.defineProperty(s,\"match\",{get(){return Object.defineProperty(s,\"match\",{value:Qi(s.syntax,o)}),s.match}}),n===\"Property\"&&Object.defineProperty(s,\"matchRef\",{get(){let l=s.syntax,c=Lk(l)?Qi({...l,terms:[l.terms[0].term]},o):null;return Object.defineProperty(s,\"matchRef\",{value:c}),c}})),s}addAtrule_(t,n){n&&(this.atrules[t]={type:\"Atrule\",name:t,prelude:n.prelude?this.createDescriptor(n.prelude,\"AtrulePrelude\",t):null,descriptors:n.descriptors?Object.keys(n.descriptors).reduce((r,i)=>(r[i]=this.createDescriptor(n.descriptors[i],\"AtruleDescriptor\",i,t),r),Object.create(null)):null})}addProperty_(t,n){n&&(this.properties[t]=this.createDescriptor(n,\"Property\",t))}addType_(t,n){n&&(this.types[t]=this.createDescriptor(n,\"Type\",t))}checkAtruleName(t){if(!this.getAtrule(t))return new $r(\"Unknown at-rule\",\"@\"+t)}checkAtrulePrelude(t,n){let r=this.checkAtruleName(t);if(r)return r;let i=this.getAtrule(t);if(!i.prelude&&n)return new SyntaxError(\"At-rule `@\"+t+\"` should not contain a prelude\");if(i.prelude&&!n&&!Zr(this,i.prelude,\"\",!1).matched)return new SyntaxError(\"At-rule `@\"+t+\"` should contain a prelude\")}checkAtruleDescriptorName(t,n){let r=this.checkAtruleName(t);if(r)return r;let i=this.getAtrule(t),o=as(n);if(!i.descriptors)return new SyntaxError(\"At-rule `@\"+t+\"` has no known descriptors\");if(!i.descriptors[o.name]&&!i.descriptors[o.basename])return new $r(\"Unknown at-rule descriptor\",n)}checkPropertyName(t){if(!this.getProperty(t))return new $r(\"Unknown property\",t)}matchAtrulePrelude(t,n){let r=this.checkAtrulePrelude(t,n);if(r)return zt(null,r);let i=this.getAtrule(t);return i.prelude?Zr(this,i.prelude,n||\"\",!1):zt(null,null)}matchAtruleDescriptor(t,n,r){let i=this.checkAtruleDescriptorName(t,n);if(i)return zt(null,i);let o=this.getAtrule(t),s=as(n);return Zr(this,o.descriptors[s.name]||o.descriptors[s.basename],r,!1)}matchDeclaration(t){return t.type!==\"Declaration\"?zt(null,new Error(\"Not a Declaration node\")):this.matchProperty(t.property,t.value)}matchProperty(t,n){if(sl(t).custom)return zt(null,new Error(\"Lexer matching doesn't applicable for custom properties\"));let r=this.checkPropertyName(t);return r?zt(null,r):Zr(this,this.getProperty(t),n,!0)}matchType(t,n){let r=this.getType(t);return r?Zr(this,r,n,!1):zt(null,new $r(\"Unknown type\",t))}match(t,n){return typeof t!=\"string\"&&(!t||!t.type)?zt(null,new $r(\"Bad syntax\")):((typeof t==\"string\"||!t.match)&&(t=this.createDescriptor(t,\"Type\",\"anonymous\")),Zr(this,t,n,!1))}findValueFragments(t,n,r,i){return Nl(this,n,this.matchProperty(t,n),r,i)}findDeclarationValueFragments(t,n,r){return Nl(this,t.value,this.matchDeclaration(t),n,r)}findAllFragments(t,n,r){let i=[];return this.syntax.walk(t,{visit:\"Declaration\",enter:o=>{i.push.apply(i,this.findDeclarationValueFragments(o,n,r))}}),i}getAtrule(t,n=!0){let r=as(t);return(r.vendor&&n?this.atrules[r.name]||this.atrules[r.basename]:this.atrules[r.name])||null}getAtrulePrelude(t,n=!0){let r=this.getAtrule(t,n);return r&&r.prelude||null}getAtruleDescriptor(t,n){return this.atrules.hasOwnProperty(t)&&this.atrules.declarators&&this.atrules[t].declarators[n]||null}getProperty(t,n=!0){let r=sl(t);return(r.vendor&&n?this.properties[r.name]||this.properties[r.basename]:this.properties[r.name])||null}getType(t){return hasOwnProperty.call(this.types,t)?this.types[t]:null}validate(){function t(c,p){return p?`<${c}>`:`<'${c}'>`}function n(c,p,f,m){if(f.has(p))return f.get(p);f.set(p,!1),m.syntax!==null&&Cl(m.syntax,function(g){if(g.type!==\"Type\"&&g.type!==\"Property\")return;let S=g.type===\"Type\"?c.types:c.properties,x=g.type===\"Type\"?i:o;hasOwnProperty.call(S,g.name)?n(c,g.name,x,S[g.name])&&(r.push(`${t(p,f===i)} used broken syntax definition ${t(g.name,g.type===\"Type\")}`),f.set(p,!0)):(r.push(`${t(p,f===i)} used missed syntax definition ${t(g.name,g.type===\"Type\")}`),f.set(p,!0))},this)}let r=[],i=new Map,o=new Map;for(let c in this.types)n(this,c,i,this.types[c]);for(let c in this.properties)n(this,c,o,this.properties[c]);let s=[...i.keys()].filter(c=>i.get(c)),l=[...o.keys()].filter(c=>o.get(c));return s.length||l.length?{errors:r,types:s,properties:l}:null}dump(t,n){return{generic:this.generic,cssWideKeywords:this.cssWideKeywords,units:this.units,types:Ol(this.types,!n,t),properties:Ol(this.properties,!n,t),atrules:Ak(this.atrules,!n,t)}}toString(){return JSON.stringify(this.dump())}};function Dl(e,t){return typeof t==\"string\"&&/^\\s*\\|/.test(t)?typeof e==\"string\"?e+t:t.replace(/^\\s*\\|\\s*/,\"\"):t||null}function Pk(e,t){let n=Object.create(null);for(let r of Object.keys(e))t.includes(r)&&(n[r]=e[r]);return n}function Fl(e,t,n){let r={...e};for(let[i,o]of Object.entries(t))r[i]={...r[i],...n?Pk(o,n):o};return r}function Ui(e,t){let n={...e};for(let[r,i]of Object.entries(t))switch(r){case\"generic\":n[r]=!!i;break;case\"cssWideKeywords\":n[r]=e[r]?[...e[r],...i]:i||[];break;case\"units\":n[r]={...e[r]};for(let[o,s]of Object.entries(i))n[r][o]=Array.isArray(s)?s:[];break;case\"atrules\":n[r]={...e[r]};for(let[o,s]of Object.entries(i)){let l=n[r][o]||{},c=n[r][o]={prelude:l.prelude||null,descriptors:{...l.descriptors}};if(s){c.prelude=s.prelude?Dl(c.prelude,s.prelude):c.prelude||null;for(let[p,f]of Object.entries(s.descriptors||{}))c.descriptors[p]=f?Dl(c.descriptors[p],f):null;Object.keys(c.descriptors).length||(c.descriptors=null)}}break;case\"types\":case\"properties\":n[r]={...e[r]};for(let[o,s]of Object.entries(i))n[r][o]=Dl(n[r][o],s);break;case\"parseContext\":n[r]={...e[r],...i};break;case\"scope\":case\"features\":n[r]=Fl(e[r],i);break;case\"atrule\":case\"pseudo\":n[r]=Fl(e[r],i,[\"parse\"]);break;case\"node\":n[r]=Fl(e[r],i,[\"name\",\"structure\",\"parse\",\"generate\",\"walkContext\"]);break}return n}function lh(e){let t=Gf(e),n=km(e),r=hm(e),{fromPlainObject:i,toPlainObject:o}=gm(n),s={lexer:null,createLexer:l=>new Wi(l,s,s.lexer.structure),tokenize:Fn,parse:t,generate:r,walk:n,find:n.find,findLast:n.findLast,findAll:n.findAll,fromPlainObject:i,toPlainObject:o,fork(l){let c=Ui({},e);return lh(typeof l==\"function\"?l(c):Ui(c,l))}};return s.lexer=new Wi({generic:e.generic,cssWideKeywords:e.cssWideKeywords,units:e.units,types:e.types,atrules:e.atrules,properties:e.properties,node:e.node},s),s}var ch=e=>lh(Ui({},e));var uh={generic:!0,cssWideKeywords:[\"initial\",\"inherit\",\"unset\",\"revert\",\"revert-layer\"],units:{angle:[\"deg\",\"grad\",\"rad\",\"turn\"],decibel:[\"db\"],flex:[\"fr\"],frequency:[\"hz\",\"khz\"],length:[\"cm\",\"mm\",\"q\",\"in\",\"pt\",\"pc\",\"px\",\"em\",\"rem\",\"ex\",\"rex\",\"cap\",\"rcap\",\"ch\",\"rch\",\"ic\",\"ric\",\"lh\",\"rlh\",\"vw\",\"svw\",\"lvw\",\"dvw\",\"vh\",\"svh\",\"lvh\",\"dvh\",\"vi\",\"svi\",\"lvi\",\"dvi\",\"vb\",\"svb\",\"lvb\",\"dvb\",\"vmin\",\"svmin\",\"lvmin\",\"dvmin\",\"vmax\",\"svmax\",\"lvmax\",\"dvmax\",\"cqw\",\"cqh\",\"cqi\",\"cqb\",\"cqmin\",\"cqmax\"],resolution:[\"dpi\",\"dpcm\",\"dppx\",\"x\"],semitones:[\"st\"],time:[\"s\",\"ms\"]},types:{\"abs()\":\"abs( <calc-sum> )\",\"absolute-size\":\"xx-small|x-small|small|medium|large|x-large|xx-large|xxx-large\",\"acos()\":\"acos( <calc-sum> )\",\"alpha-value\":\"<number>|<percentage>\",\"an+b\":\"odd|even|<integer>|<n-dimension>|'+'? \\u2020 n|-n|<ndashdigit-dimension>|'+'? \\u2020 <ndashdigit-ident>|<dashndashdigit-ident>|<n-dimension> <signed-integer>|'+'? \\u2020 n <signed-integer>|-n <signed-integer>|<ndash-dimension> <signless-integer>|'+'? \\u2020 n- <signless-integer>|-n- <signless-integer>|<n-dimension> ['+'|'-'] <signless-integer>|'+'? \\u2020 n ['+'|'-'] <signless-integer>|-n ['+'|'-'] <signless-integer>\",\"anchor()\":\"anchor( <anchor-name>?&&<anchor-side> , <length-percentage>? )\",\"anchor-name\":\"<dashed-ident>\",\"anchor-side\":\"inside|outside|top|left|right|bottom|start|end|self-start|self-end|<percentage>|center\",\"anchor-size\":\"width|height|block|inline|self-block|self-inline\",\"anchor-size()\":\"anchor-size( [<anchor-name>||<anchor-size>]? , <length-percentage>? )\",\"angle-percentage\":\"<angle>|<percentage>\",\"angular-color-hint\":\"<angle-percentage>|<zero>\",\"angular-color-stop\":\"<color> <color-stop-angle>?\",\"angular-color-stop-list\":\"<angular-color-stop> , [<angular-color-hint>? , <angular-color-stop>]#?\",\"animateable-feature\":\"scroll-position|contents|<custom-ident>\",\"animation-action\":\"none|play|play-once|play-forwards|play-backwards|pause|reset|replay\",\"asin()\":\"asin( <calc-sum> )\",\"atan()\":\"atan( <calc-sum> )\",\"atan2()\":\"atan2( <calc-sum> , <calc-sum> )\",attachment:\"scroll|fixed|local\",\"attr()\":\"attr( <attr-name> <attr-type>? , <declaration-value>? )\",\"attr-matcher\":\"['~'|'|'|'^'|'$'|'*']? '='\",\"attr-modifier\":\"i|s\",\"attr-type\":\"type( <syntax> )|raw-string|number|<attr-unit>\",\"attribute-selector\":\"'[' <wq-name> ']'|'[' <wq-name> <attr-matcher> [<string-token>|<ident-token>] <attr-modifier>? ']'\",\"auto-repeat\":\"repeat( [auto-fill|auto-fit] , [<line-names>? <fixed-size>]+ <line-names>? )\",\"auto-track-list\":\"[<line-names>? [<fixed-size>|<fixed-repeat>]]* <line-names>? <auto-repeat> [<line-names>? [<fixed-size>|<fixed-repeat>]]* <line-names>?\",axis:\"block|inline|x|y\",\"baseline-position\":\"[first|last]? baseline\",\"basic-shape\":\"<inset()>|<xywh()>|<rect()>|<circle()>|<ellipse()>|<polygon()>|<path()>\",\"basic-shape-rect\":\"<inset()>|<rect()>|<xywh()>\",\"bg-clip\":\"<visual-box>|border-area|text\",\"bg-image\":\"<image>|none\",\"bg-layer\":\"<bg-image>||<bg-position> [/ <bg-size>]?||<repeat-style>||<attachment>||<visual-box>||<visual-box>\",\"bg-position\":\"[[left|center|right|top|bottom|<length-percentage>]|[left|center|right|<length-percentage>] [top|center|bottom|<length-percentage>]|[center|[left|right] <length-percentage>?]&&[center|[top|bottom] <length-percentage>?]]\",\"bg-size\":\"[<length-percentage [0,\\u221E]>|auto]{1,2}|cover|contain\",\"blend-mode\":\"normal|multiply|screen|overlay|darken|lighten|color-dodge|color-burn|hard-light|soft-light|difference|exclusion|hue|saturation|color|luminosity\",\"blur()\":\"blur( <length>? )\",\"brightness()\":\"brightness( [<number>|<percentage>]? )\",\"calc()\":\"calc( <calc-sum> )\",\"calc-constant\":\"e|pi|infinity|-infinity|NaN\",\"calc-product\":\"<calc-value> ['*' <calc-value>|'/' <number>]*\",\"calc-size()\":\"calc-size( <calc-size-basis> , <calc-sum> )\",\"calc-size-basis\":\"<intrinsic-size-keyword>|<calc-size()>|any|<calc-sum>\",\"calc-sum\":\"<calc-product> [['+'|'-'] <calc-product>]*\",\"calc-value\":\"<number>|<dimension>|<percentage>|<calc-constant>|( <calc-sum> )\",\"cf-final-image\":\"<image>|<color>\",\"cf-mixing-image\":\"<percentage>?&&<image>\",\"circle()\":\"circle( <radial-size>? [at <position>]? )\",\"clamp()\":\"clamp( <calc-sum>#{3} )\",\"class-selector\":\"'.' <ident-token>\",\"clip-source\":\"<url>\",color:\"<color-base>|currentColor|<system-color>|<device-cmyk()>|<light-dark()>|<-non-standard-color>\",\"color()\":\"color( <colorspace-params> [/ [<alpha-value>|none]]? )\",\"color-base\":\"<hex-color>|<color-function>|<named-color>|<color-mix()>|transparent\",\"color-function\":\"<rgb()>|<rgba()>|<hsl()>|<hsla()>|<hwb()>|<lab()>|<lch()>|<oklab()>|<oklch()>|<color()>\",\"color-interpolation-method\":\"in [<rectangular-color-space>|<polar-color-space> <hue-interpolation-method>?|<custom-color-space>]\",\"color-mix()\":\"color-mix( <color-interpolation-method> , [<color>&&<percentage [0,100]>?]#{2} )\",\"color-stop\":\"<color-stop-length>|<color-stop-angle>\",\"color-stop-angle\":\"[<angle-percentage>|<zero>]{1,2}\",\"color-stop-length\":\"<length-percentage>{1,2}\",\"color-stop-list\":\"<linear-color-stop> , [<linear-color-hint>? , <linear-color-stop>]#?\",\"colorspace-params\":\"[<predefined-rgb-params>|<xyz-params>]\",combinator:\"'>'|'+'|'~'|['|' '|']\",\"common-lig-values\":\"[common-ligatures|no-common-ligatures]\",\"compat-auto\":\"searchfield|textarea|checkbox|radio|menulist|listbox|meter|progress-bar|button\",\"compat-special\":\"textfield|menulist-button\",\"complex-selector\":\"<complex-selector-unit> [<combinator>? <complex-selector-unit>]*\",\"complex-selector-list\":\"<complex-selector>#\",\"composite-style\":\"clear|copy|source-over|source-in|source-out|source-atop|destination-over|destination-in|destination-out|destination-atop|xor\",\"compositing-operator\":\"add|subtract|intersect|exclude\",\"compound-selector\":\"[<type-selector>? <subclass-selector>*]!\",\"compound-selector-list\":\"<compound-selector>#\",\"conic-gradient()\":\"conic-gradient( [<conic-gradient-syntax>] )\",\"conic-gradient-syntax\":\"[[[from [<angle>|<zero>]]? [at <position>]?]||<color-interpolation-method>]? , <angular-color-stop-list>\",\"container-condition\":\"not <query-in-parens>|<query-in-parens> [[and <query-in-parens>]*|[or <query-in-parens>]*]\",\"container-name\":\"<custom-ident>\",\"container-query\":\"not <query-in-parens>|<query-in-parens> [[and <query-in-parens>]*|[or <query-in-parens>]*]\",\"content-distribution\":\"space-between|space-around|space-evenly|stretch\",\"content-list\":\"[<string>|contents|<image>|<counter>|<quote>|<target>|<leader()>|<attr()>]+\",\"content-position\":\"center|start|end|flex-start|flex-end\",\"content-replacement\":\"<image>\",\"contextual-alt-values\":\"[contextual|no-contextual]\",\"contrast()\":\"contrast( [<number>|<percentage>]? )\",\"coord-box\":\"content-box|padding-box|border-box|fill-box|stroke-box|view-box\",\"corner-shape-value\":\"round|scoop|bevel|notch|square|squircle|<superellipse()>\",\"cos()\":\"cos( <calc-sum> )\",counter:\"<counter()>|<counters()>\",\"counter()\":\"counter( <counter-name> , <counter-style>? )\",\"counter-name\":\"<custom-ident>\",\"counter-style\":\"<counter-style-name>|symbols( )\",\"counter-style-name\":\"<custom-ident>\",\"counters()\":\"counters( <counter-name> , <string> , <counter-style>? )\",\"cross-fade()\":\"cross-fade( <cf-mixing-image> , <cf-final-image>? )\",\"cubic-bezier()\":\"cubic-bezier( [<number [0,1]> , <number>]#{2} )\",\"cubic-bezier-easing-function\":\"ease|ease-in|ease-out|ease-in-out|cubic-bezier( <number [0,1]> , <number> , <number [0,1]> , <number> )\",\"cursor-predefined\":\"auto|default|none|context-menu|help|pointer|progress|wait|cell|crosshair|text|vertical-text|alias|copy|move|no-drop|not-allowed|e-resize|n-resize|ne-resize|nw-resize|s-resize|se-resize|sw-resize|w-resize|ew-resize|ns-resize|nesw-resize|nwse-resize|col-resize|row-resize|all-scroll|zoom-in|zoom-out|grab|grabbing\",\"custom-color-space\":\"<dashed-ident>\",\"custom-params\":\"<dashed-ident> [<number>|<percentage>|none]+\",dasharray:\"[[<length-percentage>|<number>]+]#\",\"dashndashdigit-ident\":\"<ident-token>\",\"deprecated-system-color\":\"ActiveBorder|ActiveCaption|AppWorkspace|Background|ButtonHighlight|ButtonShadow|CaptionText|InactiveBorder|InactiveCaption|InactiveCaptionText|InfoBackground|InfoText|Menu|MenuText|Scrollbar|ThreeDDarkShadow|ThreeDFace|ThreeDHighlight|ThreeDLightShadow|ThreeDShadow|Window|WindowFrame|WindowText\",\"discretionary-lig-values\":\"[discretionary-ligatures|no-discretionary-ligatures]\",\"display-box\":\"contents|none\",\"display-inside\":\"flow|flow-root|table|flex|grid|ruby\",\"display-internal\":\"table-row-group|table-header-group|table-footer-group|table-row|table-cell|table-column-group|table-column|table-caption|ruby-base|ruby-text|ruby-base-container|ruby-text-container\",\"display-legacy\":\"inline-block|inline-list-item|inline-table|inline-flex|inline-grid\",\"display-listitem\":\"<display-outside>?&&[flow|flow-root]?&&list-item\",\"display-outside\":\"block|inline|run-in\",\"drop-shadow()\":\"drop-shadow( [<color>?&&<length>{2,3}] )\",\"dynamic-range-limit-mix()\":\"dynamic-range-limit-mix( [<'dynamic-range-limit'>&&<percentage [0,100]>]#{2,} )\",\"easing-function\":\"<linear-easing-function>|<cubic-bezier-easing-function>|<step-easing-function>\",\"east-asian-variant-values\":\"[jis78|jis83|jis90|jis04|simplified|traditional]\",\"east-asian-width-values\":\"[full-width|proportional-width]\",\"element()\":\"element( <custom-ident> , [first|start|last|first-except]? )|element( <id-selector> )\",\"ellipse()\":\"ellipse( <radial-size>? [at <position>]? )\",\"env()\":\"env( <custom-ident> , <declaration-value>? )\",\"exp()\":\"exp( <calc-sum> )\",\"explicit-track-list\":\"[<line-names>? <track-size>]+ <line-names>?\",\"family-name\":\"<string>|<custom-ident>+\",\"feature-tag-value\":\"<string> [<integer>|on|off]?\",\"feature-type\":\"@stylistic|@historical-forms|@styleset|@character-variant|@swash|@ornaments|@annotation\",\"feature-value-block\":\"<feature-type> '{' <feature-value-declaration-list> '}'\",\"feature-value-block-list\":\"<feature-value-block>+\",\"feature-value-declaration\":\"<custom-ident> : <integer>+ ;\",\"feature-value-declaration-list\":\"<feature-value-declaration>\",\"feature-value-name\":\"<custom-ident>\",\"filter-function\":\"<blur()>|<brightness()>|<contrast()>|<drop-shadow()>|<grayscale()>|<hue-rotate()>|<invert()>|<opacity()>|<saturate()>|<sepia()>\",\"filter-value-list\":\"[<filter-function>|<url>]+\",\"final-bg-layer\":\"<bg-image>||<bg-position> [/ <bg-size>]?||<repeat-style>||<attachment>||<visual-box>||<visual-box>||<'background-color'>\",\"fit-content()\":\"fit-content( <length-percentage [0,\\u221E]> )\",\"fixed-breadth\":\"<length-percentage>\",\"fixed-repeat\":\"repeat( [<integer [1,\\u221E]>] , [<line-names>? <fixed-size>]+ <line-names>? )\",\"fixed-size\":\"<fixed-breadth>|minmax( <fixed-breadth> , <track-breadth> )|minmax( <inflexible-breadth> , <fixed-breadth> )\",\"font-stretch-absolute\":\"normal|ultra-condensed|extra-condensed|condensed|semi-condensed|semi-expanded|expanded|extra-expanded|ultra-expanded|<percentage>\",\"font-variant-css2\":\"normal|small-caps\",\"font-weight-absolute\":\"normal|bold|<number [1,1000]>\",\"font-width-css3\":\"normal|ultra-condensed|extra-condensed|condensed|semi-condensed|semi-expanded|expanded|extra-expanded|ultra-expanded\",\"form-control-identifier\":\"select\",\"frequency-percentage\":\"<frequency>|<percentage>\",\"generic-complete\":\"serif|sans-serif|system-ui|cursive|fantasy|math|monospace\",\"general-enclosed\":\"[<function-token> <any-value>? )]|[( <any-value>? )]\",\"generic-family\":\"<generic-script-specific>|<generic-complete>|<generic-incomplete>|<-non-standard-generic-family>\",\"generic-incomplete\":\"ui-serif|ui-sans-serif|ui-monospace|ui-rounded\",\"geometry-box\":\"<shape-box>|fill-box|stroke-box|view-box\",gradient:\"<linear-gradient()>|<repeating-linear-gradient()>|<radial-gradient()>|<repeating-radial-gradient()>|<conic-gradient()>|<repeating-conic-gradient()>|<-legacy-gradient>\",\"grayscale()\":\"grayscale( [<number>|<percentage>]? )\",\"grid-line\":\"auto|<custom-ident>|[<integer>&&<custom-ident>?]|[span&&[<integer>||<custom-ident>]]\",\"historical-lig-values\":\"[historical-ligatures|no-historical-ligatures]\",\"hsl()\":\"hsl( <hue> , <percentage> , <percentage> , <alpha-value>? )|hsl( [<hue>|none] [<percentage>|<number>|none] [<percentage>|<number>|none] [/ [<alpha-value>|none]]? )\",\"hsla()\":\"hsla( <hue> , <percentage> , <percentage> , <alpha-value>? )|hsla( [<hue>|none] [<percentage>|<number>|none] [<percentage>|<number>|none] [/ [<alpha-value>|none]]? )\",hue:\"<number>|<angle>\",\"hue-interpolation-method\":\"[shorter|longer|increasing|decreasing] hue\",\"hue-rotate()\":\"hue-rotate( [<angle>|<zero>]? )\",\"hwb()\":\"hwb( [<hue>|none] [<percentage>|<number>|none] [<percentage>|<number>|none] [/ [<alpha-value>|none]]? )\",\"hypot()\":\"hypot( <calc-sum># )\",image:\"<url>|<image()>|<image-set()>|<element()>|<paint()>|<cross-fade()>|<gradient>\",\"image()\":\"image( <image-tags>? [<image-src>? , <color>?]! )\",\"image-set()\":\"image-set( <image-set-option># )\",\"image-set-option\":\"[<image>|<string>] [<resolution>||type( <string> )]\",\"image-src\":\"<url>|<string>\",\"image-tags\":\"ltr|rtl\",\"inflexible-breadth\":\"<length-percentage>|min-content|max-content|auto\",\"inset()\":\"inset( <length-percentage>{1,4} [round <'border-radius'>]? )\",\"invert()\":\"invert( [<number>|<percentage>]? )\",\"keyframe-block\":\"<keyframe-selector># { <declaration-list> }\",\"keyframe-selector\":\"from|to|<percentage [0,100]>|<timeline-range-name> <percentage>\",\"keyframes-name\":\"<custom-ident>|<string>\",\"lab()\":\"lab( [<percentage>|<number>|none] [<percentage>|<number>|none] [<percentage>|<number>|none] [/ [<alpha-value>|none]]? )\",\"layer()\":\"layer( <layer-name> )\",\"layer-name\":\"<ident> ['.' <ident>]*\",\"lch()\":\"lch( [<percentage>|<number>|none] [<percentage>|<number>|none] [<hue>|none] [/ [<alpha-value>|none]]? )\",\"leader()\":\"leader( <leader-type> )\",\"leader-type\":\"dotted|solid|space|<string>\",\"length-percentage\":\"<length>|<percentage>\",\"light-dark()\":\"light-dark( <color> , <color> )\",\"line-name-list\":\"[<line-names>|<name-repeat>]+\",\"line-names\":\"'[' <custom-ident>* ']'\",\"line-style\":\"none|hidden|dotted|dashed|solid|double|groove|ridge|inset|outset\",\"line-width\":\"<length>|thin|medium|thick\",\"linear()\":\"linear( [<number>&&<percentage>{0,2}]# )\",\"linear-color-hint\":\"<length-percentage>\",\"linear-color-stop\":\"<color> <color-stop-length>?\",\"linear-easing-function\":\"linear|<linear()>\",\"linear-gradient()\":\"linear-gradient( [<linear-gradient-syntax>] )\",\"linear-gradient-syntax\":\"[[<angle>|<zero>|to <side-or-corner>]||<color-interpolation-method>]? , <color-stop-list>\",\"log()\":\"log( <calc-sum> , <calc-sum>? )\",\"mask-layer\":\"<mask-reference>||<position> [/ <bg-size>]?||<repeat-style>||<geometry-box>||[<geometry-box>|no-clip]||<compositing-operator>||<masking-mode>\",\"mask-position\":\"[<length-percentage>|left|center|right] [<length-percentage>|top|center|bottom]?\",\"mask-reference\":\"none|<image>|<mask-source>\",\"mask-source\":\"<url>\",\"masking-mode\":\"alpha|luminance|match-source\",\"matrix()\":\"matrix( <number>#{6} )\",\"matrix3d()\":\"matrix3d( <number>#{16} )\",\"max()\":\"max( <calc-sum># )\",\"media-and\":\"<media-in-parens> [and <media-in-parens>]+\",\"media-condition\":\"<media-not>|<media-and>|<media-or>|<media-in-parens>\",\"media-condition-without-or\":\"<media-not>|<media-and>|<media-in-parens>\",\"media-feature\":\"( [<mf-plain>|<mf-boolean>|<mf-range>] )\",\"media-in-parens\":\"( <media-condition> )|<media-feature>|<general-enclosed>\",\"media-not\":\"not <media-in-parens>\",\"media-or\":\"<media-in-parens> [or <media-in-parens>]+\",\"media-query\":\"<media-condition>|[not|only]? <media-type> [and <media-condition-without-or>]?\",\"media-query-list\":\"<media-query>#\",\"media-type\":\"<ident>\",\"mf-boolean\":\"<mf-name>\",\"mf-name\":\"<ident>\",\"mf-plain\":\"<mf-name> : <mf-value>\",\"mf-range\":\"<mf-name> ['<'|'>']? '='? <mf-value>|<mf-value> ['<'|'>']? '='? <mf-name>|<mf-value> '<' '='? <mf-name> '<' '='? <mf-value>|<mf-value> '>' '='? <mf-name> '>' '='? <mf-value>\",\"mf-value\":\"<number>|<dimension>|<ident>|<ratio>\",\"min()\":\"min( <calc-sum># )\",\"minmax()\":\"minmax( [<length-percentage>|min-content|max-content|auto] , [<length-percentage>|<flex>|min-content|max-content|auto] )\",\"mod()\":\"mod( <calc-sum> , <calc-sum> )\",\"n-dimension\":\"<dimension-token>\",\"name-repeat\":\"repeat( [<integer [1,\\u221E]>|auto-fill] , <line-names>+ )\",\"named-color\":\"aliceblue|antiquewhite|aqua|aquamarine|azure|beige|bisque|black|blanchedalmond|blue|blueviolet|brown|burlywood|cadetblue|chartreuse|chocolate|coral|cornflowerblue|cornsilk|crimson|cyan|darkblue|darkcyan|darkgoldenrod|darkgray|darkgreen|darkgrey|darkkhaki|darkmagenta|darkolivegreen|darkorange|darkorchid|darkred|darksalmon|darkseagreen|darkslateblue|darkslategray|darkslategrey|darkturquoise|darkviolet|deeppink|deepskyblue|dimgray|dimgrey|dodgerblue|firebrick|floralwhite|forestgreen|fuchsia|gainsboro|ghostwhite|gold|goldenrod|gray|green|greenyellow|grey|honeydew|hotpink|indianred|indigo|ivory|khaki|lavender|lavenderblush|lawngreen|lemonchiffon|lightblue|lightcoral|lightcyan|lightgoldenrodyellow|lightgray|lightgreen|lightgrey|lightpink|lightsalmon|lightseagreen|lightskyblue|lightslategray|lightslategrey|lightsteelblue|lightyellow|lime|limegreen|linen|magenta|maroon|mediumaquamarine|mediumblue|mediumorchid|mediumpurple|mediumseagreen|mediumslateblue|mediumspringgreen|mediumturquoise|mediumvioletred|midnightblue|mintcream|mistyrose|moccasin|navajowhite|navy|oldlace|olive|olivedrab|orange|orangered|orchid|palegoldenrod|palegreen|paleturquoise|palevioletred|papayawhip|peachpuff|peru|pink|plum|powderblue|purple|rebeccapurple|red|rosybrown|royalblue|saddlebrown|salmon|sandybrown|seagreen|seashell|sienna|silver|skyblue|slateblue|slategray|slategrey|snow|springgreen|steelblue|tan|teal|thistle|tomato|turquoise|violet|wheat|white|whitesmoke|yellow|yellowgreen\",\"namespace-prefix\":\"<ident>\",\"ndash-dimension\":\"<dimension-token>\",\"ndashdigit-dimension\":\"<dimension-token>\",\"ndashdigit-ident\":\"<ident-token>\",\"ns-prefix\":\"[<ident-token>|'*']? '|'\",\"number-percentage\":\"<number>|<percentage>\",\"numeric-figure-values\":\"[lining-nums|oldstyle-nums]\",\"numeric-fraction-values\":\"[diagonal-fractions|stacked-fractions]\",\"numeric-spacing-values\":\"[proportional-nums|tabular-nums]\",\"offset-path\":\"<ray()>|<url>|<basic-shape>\",\"oklab()\":\"oklab( [<percentage>|<number>|none] [<percentage>|<number>|none] [<percentage>|<number>|none] [/ [<alpha-value>|none]]? )\",\"oklch()\":\"oklch( [<percentage>|<number>|none] [<percentage>|<number>|none] [<hue>|none] [/ [<alpha-value>|none]]? )\",\"opacity()\":\"opacity( [<number>|<percentage>]? )\",\"opacity-value\":\"<number>|<percentage>\",\"outline-line-style\":\"none|dotted|dashed|solid|double|groove|ridge|inset|outset\",\"outline-radius\":\"<length>|<percentage>\",\"overflow-position\":\"unsafe|safe\",\"page-body\":\"<declaration>? [; <page-body>]?|<page-margin-box> <page-body>\",\"page-margin-box\":\"<page-margin-box-type> '{' <declaration-list> '}'\",\"page-margin-box-type\":\"@top-left-corner|@top-left|@top-center|@top-right|@top-right-corner|@bottom-left-corner|@bottom-left|@bottom-center|@bottom-right|@bottom-right-corner|@left-top|@left-middle|@left-bottom|@right-top|@right-middle|@right-bottom\",\"page-selector\":\"<pseudo-page>+|<ident> <pseudo-page>*\",\"page-selector-list\":\"[<page-selector>#]?\",\"page-size\":\"A5|A4|A3|B5|B4|JIS-B5|JIS-B4|letter|legal|ledger\",paint:\"none|<color>|<url> [none|<color>]?|context-fill|context-stroke\",\"paint()\":\"paint( <ident> , <declaration-value>? )\",\"paint-box\":\"<visual-box>|fill-box|stroke-box\",\"palette-identifier\":\"<dashed-ident>\",\"palette-mix()\":\"palette-mix( <color-interpolation-method> , [[normal|light|dark|<palette-identifier>|<palette-mix()>]&&<percentage [0,100]>?]#{2} )\",\"path()\":\"path( <'fill-rule'>? , <string> )\",\"perspective()\":\"perspective( [<length [0,\\u221E]>|none] )\",\"polar-color-space\":\"hsl|hwb|lch|oklch\",\"polygon()\":\"polygon( <'fill-rule'>? , [<length-percentage> <length-percentage>]# )\",position:\"[[left|center|right]||[top|center|bottom]|[left|center|right|<length-percentage>] [top|center|bottom|<length-percentage>]?|[[left|right] <length-percentage>]&&[[top|bottom] <length-percentage>]]\",\"position-area\":\"[[left|center|right|span-left|span-right|x-start|x-end|span-x-start|span-x-end|x-self-start|x-self-end|span-x-self-start|span-x-self-end|span-all]||[top|center|bottom|span-top|span-bottom|y-start|y-end|span-y-start|span-y-end|y-self-start|y-self-end|span-y-self-start|span-y-self-end|span-all]|[block-start|center|block-end|span-block-start|span-block-end|span-all]||[inline-start|center|inline-end|span-inline-start|span-inline-end|span-all]|[self-block-start|center|self-block-end|span-self-block-start|span-self-block-end|span-all]||[self-inline-start|center|self-inline-end|span-self-inline-start|span-self-inline-end|span-all]|[start|center|end|span-start|span-end|span-all]{1,2}|[self-start|center|self-end|span-self-start|span-self-end|span-all]{1,2}]\",\"pow()\":\"pow( <calc-sum> , <calc-sum> )\",\"predefined-rgb\":\"srgb|srgb-linear|display-p3|display-p3-linear|a98-rgb|prophoto-rgb|rec2020\",\"predefined-rgb-params\":\"<predefined-rgb> [<number>|<percentage>|none]{3}\",\"pseudo-class-selector\":\"':' <ident-token>|':' <function-token> <any-value> ')'\",\"pseudo-element-selector\":\"':' <pseudo-class-selector>|<legacy-pseudo-element-selector>\",\"pseudo-page\":\": [left|right|first|blank]\",\"query-in-parens\":\"( <container-condition> )|( <size-feature> )|style( <style-query> )|<general-enclosed>\",quote:\"open-quote|close-quote|no-open-quote|no-close-quote\",\"radial-extent\":\"closest-corner|closest-side|farthest-corner|farthest-side\",\"radial-gradient()\":\"radial-gradient( [<radial-gradient-syntax>] )\",\"radial-gradient-syntax\":\"[[[<radial-shape>||<radial-size>]? [at <position>]?]||<color-interpolation-method>]? , <color-stop-list>\",\"radial-shape\":\"circle|ellipse\",\"radial-size\":\"<radial-extent>|<length [0,\\u221E]>|<length-percentage [0,\\u221E]>{2}\",ratio:\"<number [0,\\u221E]> [/ <number [0,\\u221E]>]?\",\"ray()\":\"ray( <angle>&&<ray-size>?&&contain?&&[at <position>]? )\",\"ray-size\":\"closest-side|closest-corner|farthest-side|farthest-corner|sides\",\"rect()\":\"rect( [<length-percentage>|auto]{4} [round <'border-radius'>]? )\",\"rectangular-color-space\":\"srgb|srgb-linear|display-p3|display-p3-linear|a98-rgb|prophoto-rgb|rec2020|lab|oklab|xyz|xyz-d50|xyz-d65\",\"relative-selector\":\"<combinator>? <complex-selector>\",\"relative-selector-list\":\"<relative-selector>#\",\"relative-size\":\"larger|smaller\",\"rem()\":\"rem( <calc-sum> , <calc-sum> )\",\"repeat-style\":\"repeat-x|repeat-y|[repeat|space|round|no-repeat]{1,2}\",\"repeating-conic-gradient()\":\"repeating-conic-gradient( [<conic-gradient-syntax>] )\",\"repeating-linear-gradient()\":\"repeating-linear-gradient( [<linear-gradient-syntax>] )\",\"repeating-radial-gradient()\":\"repeating-radial-gradient( [<radial-gradient-syntax>] )\",\"reversed-counter-name\":\"reversed( <counter-name> )\",\"rgb()\":\"rgb( <percentage>#{3} , <alpha-value>? )|rgb( <number>#{3} , <alpha-value>? )|rgb( [<number>|<percentage>|none]{3} [/ [<alpha-value>|none]]? )\",\"rgba()\":\"rgba( <percentage>#{3} , <alpha-value>? )|rgba( <number>#{3} , <alpha-value>? )|rgba( [<number>|<percentage>|none]{3} [/ [<alpha-value>|none]]? )\",\"rotate()\":\"rotate( [<angle>|<zero>] )\",\"rotate3d()\":\"rotate3d( <number> , <number> , <number> , [<angle>|<zero>] )\",\"rotateX()\":\"rotateX( [<angle>|<zero>] )\",\"rotateY()\":\"rotateY( [<angle>|<zero>] )\",\"rotateZ()\":\"rotateZ( [<angle>|<zero>] )\",\"round()\":\"round( <rounding-strategy>? , <calc-sum> , <calc-sum> )\",\"rounding-strategy\":\"nearest|up|down|to-zero\",\"saturate()\":\"saturate( [<number>|<percentage>]? )\",\"scale()\":\"scale( [<number>|<percentage>]#{1,2} )\",\"scale3d()\":\"scale3d( [<number>|<percentage>]#{3} )\",\"scaleX()\":\"scaleX( [<number>|<percentage>] )\",\"scaleY()\":\"scaleY( [<number>|<percentage>] )\",\"scaleZ()\":\"scaleZ( [<number>|<percentage>] )\",\"scope-end\":\"<forgiving-selector-list>\",\"scope-start\":\"<forgiving-selector-list>\",\"scroll()\":\"scroll( [<scroller>||<axis>]? )\",scroller:\"root|nearest|self\",\"scroll-state-feature\":\"<media-query-list>\",\"scroll-state-in-parens\":\"( <scroll-state-query> )|( <scroll-state-feature> )|<general-enclosed>\",\"scroll-state-query\":\"not <scroll-state-in-parens>|<scroll-state-in-parens> [[and <scroll-state-in-parens>]*|[or <scroll-state-in-parens>]*]|<scroll-state-feature>\",\"selector-list\":\"<complex-selector-list>\",\"self-position\":\"center|start|end|self-start|self-end|flex-start|flex-end\",\"sepia()\":\"sepia( [<number>|<percentage>]? )\",shadow:\"inset?&&<length>{2,4}&&<color>?\",\"shadow-t\":\"[<length>{2,3}&&<color>?]\",shape:\"rect( <top> , <right> , <bottom> , <left> )|rect( <top> <right> <bottom> <left> )\",\"shape-box\":\"<visual-box>|margin-box\",\"side-or-corner\":\"[left|right]||[top|bottom]\",\"sign()\":\"sign( <calc-sum> )\",\"signed-integer\":\"<number-token>\",\"signless-integer\":\"<number-token>\",\"sin()\":\"sin( <calc-sum> )\",\"single-animation\":\"<'animation-duration'>||<easing-function>||<'animation-delay'>||<single-animation-iteration-count>||<single-animation-direction>||<single-animation-fill-mode>||<single-animation-play-state>||[none|<keyframes-name>]||<single-animation-timeline>\",\"single-animation-composition\":\"replace|add|accumulate\",\"single-animation-direction\":\"normal|reverse|alternate|alternate-reverse\",\"single-animation-fill-mode\":\"none|forwards|backwards|both\",\"single-animation-iteration-count\":\"infinite|<number>\",\"single-animation-play-state\":\"running|paused\",\"single-animation-timeline\":\"auto|none|<dashed-ident>|<scroll()>|<view()>\",\"single-transition\":\"[none|<single-transition-property>]||<time>||<easing-function>||<time>||<transition-behavior-value>\",\"single-transition-property\":\"all|<custom-ident>\",size:\"closest-side|farthest-side|closest-corner|farthest-corner|<length>|<length-percentage>{2}\",\"size-feature\":\"<mf-plain>|<mf-boolean>|<mf-range>\",\"skew()\":\"skew( [<angle>|<zero>] , [<angle>|<zero>]? )\",\"skewX()\":\"skewX( [<angle>|<zero>] )\",\"skewY()\":\"skewY( [<angle>|<zero>] )\",\"sqrt()\":\"sqrt( <calc-sum> )\",\"step-position\":\"jump-start|jump-end|jump-none|jump-both|start|end\",\"step-easing-function\":\"step-start|step-end|<steps()>\",\"steps()\":\"steps( <integer> , <step-position>? )\",\"style-feature\":\"<declaration>\",\"style-in-parens\":\"( <style-condition> )|( <style-feature> )|<general-enclosed>\",\"style-query\":\"<style-condition>|<style-feature>\",\"subclass-selector\":\"<id-selector>|<class-selector>|<attribute-selector>|<pseudo-class-selector>\",\"superellipse()\":\"superellipse( [<number>|infinity|-infinity] )\",\"supports-condition\":\"not <supports-in-parens>|<supports-in-parens> [and <supports-in-parens>]*|<supports-in-parens> [or <supports-in-parens>]*\",\"supports-decl\":\"( <declaration> )\",\"supports-feature\":\"<supports-decl>|<supports-selector-fn>\",\"supports-in-parens\":\"( <supports-condition> )|<supports-feature>|<general-enclosed>\",\"supports-selector-fn\":\"selector( <complex-selector> )\",symbol:\"<string>|<image>|<custom-ident>\",\"symbols()\":\"symbols( <symbols-type>? [<string>|<image>]+ )\",\"symbols-type\":\"cyclic|numeric|alphabetic|symbolic|fixed\",\"system-color\":\"AccentColor|AccentColorText|ActiveText|ButtonBorder|ButtonFace|ButtonText|Canvas|CanvasText|Field|FieldText|GrayText|Highlight|HighlightText|LinkText|Mark|MarkText|SelectedItem|SelectedItemText|VisitedText\",\"system-family-name\":\"caption|icon|menu|message-box|small-caption|status-bar\",\"tan()\":\"tan( <calc-sum> )\",target:\"<target-counter()>|<target-counters()>|<target-text()>\",\"target-counter()\":\"target-counter( [<string>|<url>] , <custom-ident> , <counter-style>? )\",\"target-counters()\":\"target-counters( [<string>|<url>] , <custom-ident> , <string> , <counter-style>? )\",\"target-text()\":\"target-text( [<string>|<url>] , [content|before|after|first-letter]? )\",\"text-edge\":\"[text|cap|ex|ideographic|ideographic-ink] [text|alphabetic|ideographic|ideographic-ink]?\",\"time-percentage\":\"<time>|<percentage>\",\"timeline-range-name\":\"cover|contain|entry|exit|entry-crossing|exit-crossing\",\"track-breadth\":\"<length-percentage>|<flex>|min-content|max-content|auto\",\"track-list\":\"[<line-names>? [<track-size>|<track-repeat>]]+ <line-names>?\",\"track-repeat\":\"repeat( [<integer [1,\\u221E]>] , [<line-names>? <track-size>]+ <line-names>? )\",\"track-size\":\"<track-breadth>|minmax( <inflexible-breadth> , <track-breadth> )|fit-content( <length-percentage> )\",\"transform-function\":\"<matrix()>|<translate()>|<translateX()>|<translateY()>|<scale()>|<scaleX()>|<scaleY()>|<rotate()>|<skew()>|<skewX()>|<skewY()>|<matrix3d()>|<translate3d()>|<translateZ()>|<scale3d()>|<scaleZ()>|<rotate3d()>|<rotateX()>|<rotateY()>|<rotateZ()>|<perspective()>\",\"transform-list\":\"<transform-function>+\",\"transition-behavior-value\":\"normal|allow-discrete\",\"translate()\":\"translate( <length-percentage> , <length-percentage>? )\",\"translate3d()\":\"translate3d( <length-percentage> , <length-percentage> , <length> )\",\"translateX()\":\"translateX( <length-percentage> )\",\"translateY()\":\"translateY( <length-percentage> )\",\"translateZ()\":\"translateZ( <length> )\",\"try-size\":\"most-width|most-height|most-block-size|most-inline-size\",\"try-tactic\":\"flip-block||flip-inline||flip-start\",\"type-or-unit\":\"string|color|url|integer|number|length|angle|time|frequency|cap|ch|em|ex|ic|lh|rlh|rem|vb|vi|vw|vh|vmin|vmax|mm|Q|cm|in|pt|pc|px|deg|grad|rad|turn|ms|s|Hz|kHz|%\",\"type-selector\":\"<wq-name>|<ns-prefix>? '*'\",\"var()\":\"var( <custom-property-name> , <declaration-value>? )\",\"view()\":\"view( [<axis>||<'view-timeline-inset'>]? )\",\"viewport-length\":\"auto|<length-percentage>\",\"visual-box\":\"content-box|padding-box|border-box\",\"wq-name\":\"<ns-prefix>? <ident-token>\",\"xywh()\":\"xywh( <length-percentage>{2} <length-percentage [0,\\u221E]>{2} [round <'border-radius'>]? )\",xyz:\"xyz|xyz-d50|xyz-d65\",\"xyz-params\":\"<xyz-space> [<number>|<percentage>|none]{3}\",\"-legacy-gradient\":\"<-webkit-gradient()>|<-legacy-linear-gradient>|<-legacy-repeating-linear-gradient>|<-legacy-radial-gradient>|<-legacy-repeating-radial-gradient>\",\"-legacy-linear-gradient\":\"-moz-linear-gradient( <-legacy-linear-gradient-arguments> )|-webkit-linear-gradient( <-legacy-linear-gradient-arguments> )|-o-linear-gradient( <-legacy-linear-gradient-arguments> )\",\"-legacy-repeating-linear-gradient\":\"-moz-repeating-linear-gradient( <-legacy-linear-gradient-arguments> )|-webkit-repeating-linear-gradient( <-legacy-linear-gradient-arguments> )|-o-repeating-linear-gradient( <-legacy-linear-gradient-arguments> )\",\"-legacy-linear-gradient-arguments\":\"[<angle>|<side-or-corner>]? , <color-stop-list>\",\"-legacy-radial-gradient\":\"-moz-radial-gradient( <-legacy-radial-gradient-arguments> )|-webkit-radial-gradient( <-legacy-radial-gradient-arguments> )|-o-radial-gradient( <-legacy-radial-gradient-arguments> )\",\"-legacy-repeating-radial-gradient\":\"-moz-repeating-radial-gradient( <-legacy-radial-gradient-arguments> )|-webkit-repeating-radial-gradient( <-legacy-radial-gradient-arguments> )|-o-repeating-radial-gradient( <-legacy-radial-gradient-arguments> )\",\"-legacy-radial-gradient-arguments\":\"[<position> ,]? [[[<-legacy-radial-gradient-shape>||<-legacy-radial-gradient-size>]|[<length>|<percentage>]{2}] ,]? <color-stop-list>\",\"-legacy-radial-gradient-size\":\"closest-side|closest-corner|farthest-side|farthest-corner|contain|cover\",\"-legacy-radial-gradient-shape\":\"circle|ellipse\",\"-non-standard-font\":\"-apple-system-body|-apple-system-headline|-apple-system-subheadline|-apple-system-caption1|-apple-system-caption2|-apple-system-footnote|-apple-system-short-body|-apple-system-short-headline|-apple-system-short-subheadline|-apple-system-short-caption1|-apple-system-short-footnote|-apple-system-tall-body\",\"-non-standard-color\":\"-moz-ButtonDefault|-moz-ButtonHoverFace|-moz-ButtonHoverText|-moz-CellHighlight|-moz-CellHighlightText|-moz-Combobox|-moz-ComboboxText|-moz-Dialog|-moz-DialogText|-moz-dragtargetzone|-moz-EvenTreeRow|-moz-Field|-moz-FieldText|-moz-html-CellHighlight|-moz-html-CellHighlightText|-moz-mac-accentdarkestshadow|-moz-mac-accentdarkshadow|-moz-mac-accentface|-moz-mac-accentlightesthighlight|-moz-mac-accentlightshadow|-moz-mac-accentregularhighlight|-moz-mac-accentregularshadow|-moz-mac-chrome-active|-moz-mac-chrome-inactive|-moz-mac-focusring|-moz-mac-menuselect|-moz-mac-menushadow|-moz-mac-menutextselect|-moz-MenuHover|-moz-MenuHoverText|-moz-MenuBarText|-moz-MenuBarHoverText|-moz-nativehyperlinktext|-moz-OddTreeRow|-moz-win-communicationstext|-moz-win-mediatext|-moz-activehyperlinktext|-moz-default-background-color|-moz-default-color|-moz-hyperlinktext|-moz-visitedhyperlinktext|-webkit-activelink|-webkit-focus-ring-color|-webkit-link|-webkit-text\",\"-non-standard-image-rendering\":\"optimize-contrast|-moz-crisp-edges|-o-crisp-edges|-webkit-optimize-contrast\",\"-non-standard-overflow\":\"overlay|-moz-scrollbars-none|-moz-scrollbars-horizontal|-moz-scrollbars-vertical|-moz-hidden-unscrollable\",\"-non-standard-size\":\"intrinsic|min-intrinsic|-webkit-fill-available|-webkit-fit-content|-webkit-min-content|-webkit-max-content|-moz-available|-moz-fit-content|-moz-min-content|-moz-max-content\",\"-webkit-gradient()\":\"-webkit-gradient( <-webkit-gradient-type> , <-webkit-gradient-point> [, <-webkit-gradient-point>|, <-webkit-gradient-radius> , <-webkit-gradient-point>] [, <-webkit-gradient-radius>]? [, <-webkit-gradient-color-stop>]* )\",\"-webkit-gradient-color-stop\":\"from( <color> )|color-stop( [<number-zero-one>|<percentage>] , <color> )|to( <color> )\",\"-webkit-gradient-point\":\"[left|center|right|<length-percentage>] [top|center|bottom|<length-percentage>]\",\"-webkit-gradient-radius\":\"<length>|<percentage>\",\"-webkit-gradient-type\":\"linear|radial\",\"-webkit-mask-box-repeat\":\"repeat|stretch|round\",\"-ms-filter-function-list\":\"<-ms-filter-function>+\",\"-ms-filter-function\":\"<-ms-filter-function-progid>|<-ms-filter-function-legacy>\",\"-ms-filter-function-progid\":\"'progid:' [<ident-token> '.']* [<ident-token>|<function-token> <any-value>? )]\",\"-ms-filter-function-legacy\":\"<ident-token>|<function-token> <any-value>? )\",age:\"child|young|old\",\"attr-name\":\"<wq-name>\",\"attr-fallback\":\"<any-value>\",autospace:\"no-autospace|[ideograph-alpha||ideograph-numeric||punctuation]||[insert|replace]\",bottom:\"<length>|auto\",\"generic-voice\":\"[<age>? <gender> <integer>?]\",gender:\"male|female|neutral\",\"generic-script-specific\":\"generic( kai )|generic( fangsong )|generic( nastaliq )\",\"-non-standard-generic-family\":\"-apple-system|BlinkMacSystemFont\",\"intrinsic-size-keyword\":\"min-content|max-content|fit-content\",left:\"<length>|auto\",\"device-cmyk()\":\"<legacy-device-cmyk-syntax>|<modern-device-cmyk-syntax>\",\"legacy-device-cmyk-syntax\":\"device-cmyk( <number>#{4} )\",\"modern-device-cmyk-syntax\":\"device-cmyk( <cmyk-component>{4} [/ [<alpha-value>|none]]? )\",\"cmyk-component\":\"<number>|<percentage>|none\",\"color-space\":\"<rectangular-color-space>|<polar-color-space>|<custom-color-space>\",right:\"<length>|auto\",\"forgiving-selector-list\":\"<complex-real-selector-list>\",\"forgiving-relative-selector-list\":\"<relative-real-selector-list>\",\"complex-real-selector-list\":\"<complex-real-selector>#\",\"simple-selector-list\":\"<simple-selector>#\",\"relative-real-selector-list\":\"<relative-real-selector>#\",\"complex-selector-unit\":\"[<compound-selector>? <pseudo-compound-selector>*]!\",\"complex-real-selector\":\"<compound-selector> [<combinator>? <compound-selector>]*\",\"relative-real-selector\":\"<combinator>? <complex-real-selector>\",\"pseudo-compound-selector\":\"<pseudo-element-selector> <pseudo-class-selector>*\",\"simple-selector\":\"<type-selector>|<subclass-selector>\",\"legacy-pseudo-element-selector\":\"':' [before|after|first-line|first-letter]\",\"svg-length\":\"<percentage>|<length>|<number>\",\"svg-writing-mode\":\"lr-tb|rl-tb|tb-rl|lr|rl|tb\",top:\"<length>|auto\",x:\"<number>\",y:\"<number>\",declaration:\"<ident-token> : <declaration-value>? ['!' important]?\",\"declaration-list\":\"[<declaration>? ';']* <declaration>?\",url:\"url( <string> <url-modifier>* )|<url-token>\",\"url-modifier\":\"<ident>|<function-token> <any-value> )\",\"number-zero-one\":\"<number [0,1]>\",\"number-one-or-greater\":\"<number [1,\\u221E]>\",\"xyz-space\":\"xyz|xyz-d50|xyz-d65\",\"style-condition\":\"not <style-in-parens>|<style-in-parens> [[and <style-in-parens>]*|[or <style-in-parens>]*]\",\"-non-standard-display\":\"-ms-inline-flexbox|-ms-grid|-ms-inline-grid|-webkit-flex|-webkit-inline-flex|-webkit-box|-webkit-inline-box|-moz-inline-stack|-moz-box|-moz-inline-box\",\"inset-area\":\"[[left|center|right|span-left|span-right|x-start|x-end|span-x-start|span-x-end|x-self-start|x-self-end|span-x-self-start|span-x-self-end|span-all]||[top|center|bottom|span-top|span-bottom|y-start|y-end|span-y-start|span-y-end|y-self-start|y-self-end|span-y-self-start|span-y-self-end|span-all]|[block-start|center|block-end|span-block-start|span-block-end|span-all]||[inline-start|center|inline-end|span-inline-start|span-inline-end|span-all]|[self-block-start|self-block-end|span-self-block-start|span-self-block-end|span-all]||[self-inline-start|self-inline-end|span-self-inline-start|span-self-inline-end|span-all]|[start|center|end|span-start|span-end|span-all]{1,2}|[self-start|center|self-end|span-self-start|span-self-end|span-all]{1,2}]\",syntax:\"'*'|<syntax-component> [<syntax-combinator> <syntax-component>]*|<syntax-string>\",\"syntax-component\":\"<syntax-single-component> <syntax-multiplier>?|'<' transform-list '>'\",\"syntax-single-component\":\"'<' <syntax-type-name> '>'|<ident>\",\"syntax-type-name\":\"angle|color|custom-ident|image|integer|length|length-percentage|number|percentage|resolution|string|time|url|transform-function\",\"syntax-combinator\":\"'|'\",\"syntax-multiplier\":\"'#'|'+'\",\"syntax-string\":\"<string>\"},properties:{\"--*\":\"<declaration-value>\",\"-ms-accelerator\":\"false|true\",\"-ms-block-progression\":\"tb|rl|bt|lr\",\"-ms-content-zoom-chaining\":\"none|chained\",\"-ms-content-zoom-limit\":\"<'-ms-content-zoom-limit-min'> <'-ms-content-zoom-limit-max'>\",\"-ms-content-zoom-limit-max\":\"<percentage>\",\"-ms-content-zoom-limit-min\":\"<percentage>\",\"-ms-content-zoom-snap\":\"<'-ms-content-zoom-snap-type'>||<'-ms-content-zoom-snap-points'>\",\"-ms-content-zoom-snap-points\":\"snapInterval( <percentage> , <percentage> )|snapList( <percentage># )\",\"-ms-content-zoom-snap-type\":\"none|proximity|mandatory\",\"-ms-content-zooming\":\"none|zoom\",\"-ms-filter\":\"<string>\",\"-ms-flow-from\":\"[none|<custom-ident>]#\",\"-ms-flow-into\":\"[none|<custom-ident>]#\",\"-ms-grid-columns\":\"none|<track-list>|<auto-track-list>\",\"-ms-grid-rows\":\"none|<track-list>|<auto-track-list>\",\"-ms-high-contrast-adjust\":\"auto|none\",\"-ms-hyphenate-limit-chars\":\"auto|<integer>{1,3}\",\"-ms-hyphenate-limit-lines\":\"no-limit|<integer>\",\"-ms-hyphenate-limit-zone\":\"<percentage>|<length>\",\"-ms-ime-align\":\"auto|after\",\"-ms-overflow-style\":\"auto|none|scrollbar|-ms-autohiding-scrollbar\",\"-ms-scroll-chaining\":\"chained|none\",\"-ms-scroll-limit\":\"<'-ms-scroll-limit-x-min'> <'-ms-scroll-limit-y-min'> <'-ms-scroll-limit-x-max'> <'-ms-scroll-limit-y-max'>\",\"-ms-scroll-limit-x-max\":\"auto|<length>\",\"-ms-scroll-limit-x-min\":\"<length>\",\"-ms-scroll-limit-y-max\":\"auto|<length>\",\"-ms-scroll-limit-y-min\":\"<length>\",\"-ms-scroll-rails\":\"none|railed\",\"-ms-scroll-snap-points-x\":\"snapInterval( <length-percentage> , <length-percentage> )|snapList( <length-percentage># )\",\"-ms-scroll-snap-points-y\":\"snapInterval( <length-percentage> , <length-percentage> )|snapList( <length-percentage># )\",\"-ms-scroll-snap-type\":\"none|proximity|mandatory\",\"-ms-scroll-snap-x\":\"<'-ms-scroll-snap-type'> <'-ms-scroll-snap-points-x'>\",\"-ms-scroll-snap-y\":\"<'-ms-scroll-snap-type'> <'-ms-scroll-snap-points-y'>\",\"-ms-scroll-translation\":\"none|vertical-to-horizontal\",\"-ms-scrollbar-3dlight-color\":\"<color>\",\"-ms-scrollbar-arrow-color\":\"<color>\",\"-ms-scrollbar-base-color\":\"<color>\",\"-ms-scrollbar-darkshadow-color\":\"<color>\",\"-ms-scrollbar-face-color\":\"<color>\",\"-ms-scrollbar-highlight-color\":\"<color>\",\"-ms-scrollbar-shadow-color\":\"<color>\",\"-ms-scrollbar-track-color\":\"<color>\",\"-ms-text-autospace\":\"none|ideograph-alpha|ideograph-numeric|ideograph-parenthesis|ideograph-space\",\"-ms-touch-select\":\"grippers|none\",\"-ms-user-select\":\"none|element|text\",\"-ms-wrap-flow\":\"auto|both|start|end|maximum|clear\",\"-ms-wrap-margin\":\"<length>\",\"-ms-wrap-through\":\"wrap|none\",\"-moz-appearance\":\"none|button|button-arrow-down|button-arrow-next|button-arrow-previous|button-arrow-up|button-bevel|button-focus|caret|checkbox|checkbox-container|checkbox-label|checkmenuitem|dualbutton|groupbox|listbox|listitem|menuarrow|menubar|menucheckbox|menuimage|menuitem|menuitemtext|menulist|menulist-button|menulist-text|menulist-textfield|menupopup|menuradio|menuseparator|meterbar|meterchunk|progressbar|progressbar-vertical|progresschunk|progresschunk-vertical|radio|radio-container|radio-label|radiomenuitem|range|range-thumb|resizer|resizerpanel|scale-horizontal|scalethumbend|scalethumb-horizontal|scalethumbstart|scalethumbtick|scalethumb-vertical|scale-vertical|scrollbarbutton-down|scrollbarbutton-left|scrollbarbutton-right|scrollbarbutton-up|scrollbarthumb-horizontal|scrollbarthumb-vertical|scrollbartrack-horizontal|scrollbartrack-vertical|searchfield|separator|sheet|spinner|spinner-downbutton|spinner-textfield|spinner-upbutton|splitter|statusbar|statusbarpanel|tab|tabpanel|tabpanels|tab-scroll-arrow-back|tab-scroll-arrow-forward|textfield|textfield-multiline|toolbar|toolbarbutton|toolbarbutton-dropdown|toolbargripper|toolbox|tooltip|treeheader|treeheadercell|treeheadersortarrow|treeitem|treeline|treetwisty|treetwistyopen|treeview|-moz-mac-unified-toolbar|-moz-win-borderless-glass|-moz-win-browsertabbar-toolbox|-moz-win-communicationstext|-moz-win-communications-toolbox|-moz-win-exclude-glass|-moz-win-glass|-moz-win-mediatext|-moz-win-media-toolbox|-moz-window-button-box|-moz-window-button-box-maximized|-moz-window-button-close|-moz-window-button-maximize|-moz-window-button-minimize|-moz-window-button-restore|-moz-window-frame-bottom|-moz-window-frame-left|-moz-window-frame-right|-moz-window-titlebar|-moz-window-titlebar-maximized\",\"-moz-binding\":\"<url>|none\",\"-moz-border-bottom-colors\":\"<color>+|none\",\"-moz-border-left-colors\":\"<color>+|none\",\"-moz-border-right-colors\":\"<color>+|none\",\"-moz-border-top-colors\":\"<color>+|none\",\"-moz-context-properties\":\"none|[fill|fill-opacity|stroke|stroke-opacity]#\",\"-moz-float-edge\":\"border-box|content-box|margin-box|padding-box\",\"-moz-force-broken-image-icon\":\"0|1\",\"-moz-orient\":\"inline|block|horizontal|vertical\",\"-moz-outline-radius\":\"<outline-radius>{1,4} [/ <outline-radius>{1,4}]?\",\"-moz-outline-radius-bottomleft\":\"<outline-radius>\",\"-moz-outline-radius-bottomright\":\"<outline-radius>\",\"-moz-outline-radius-topleft\":\"<outline-radius>\",\"-moz-outline-radius-topright\":\"<outline-radius>\",\"-moz-stack-sizing\":\"ignore|stretch-to-fit\",\"-moz-text-blink\":\"none|blink\",\"-moz-user-focus\":\"ignore|normal|select-after|select-before|select-menu|select-same|select-all|none\",\"-moz-user-input\":\"auto|none|enabled|disabled\",\"-moz-user-modify\":\"read-only|read-write|write-only\",\"-moz-window-dragging\":\"drag|no-drag\",\"-moz-window-shadow\":\"default|menu|tooltip|sheet|none\",\"-webkit-appearance\":\"none|button|button-bevel|caps-lock-indicator|caret|checkbox|default-button|inner-spin-button|listbox|listitem|media-controls-background|media-controls-fullscreen-background|media-current-time-display|media-enter-fullscreen-button|media-exit-fullscreen-button|media-fullscreen-button|media-mute-button|media-overlay-play-button|media-play-button|media-seek-back-button|media-seek-forward-button|media-slider|media-sliderthumb|media-time-remaining-display|media-toggle-closed-captions-button|media-volume-slider|media-volume-slider-container|media-volume-sliderthumb|menulist|menulist-button|menulist-text|menulist-textfield|meter|progress-bar|progress-bar-value|push-button|radio|scrollbarbutton-down|scrollbarbutton-left|scrollbarbutton-right|scrollbarbutton-up|scrollbargripper-horizontal|scrollbargripper-vertical|scrollbarthumb-horizontal|scrollbarthumb-vertical|scrollbartrack-horizontal|scrollbartrack-vertical|searchfield|searchfield-cancel-button|searchfield-decoration|searchfield-results-button|searchfield-results-decoration|slider-horizontal|slider-vertical|sliderthumb-horizontal|sliderthumb-vertical|square-button|textarea|textfield|-apple-pay-button\",\"-webkit-border-before\":\"<'border-width'>||<'border-style'>||<color>\",\"-webkit-border-before-color\":\"<color>\",\"-webkit-border-before-style\":\"<'border-style'>\",\"-webkit-border-before-width\":\"<'border-width'>\",\"-webkit-box-reflect\":\"[above|below|right|left]? <length>? <image>?\",\"-webkit-line-clamp\":\"none|<integer>\",\"-webkit-mask\":\"[<mask-reference>||<position> [/ <bg-size>]?||<repeat-style>||[<visual-box>|border|padding|content|text]||[<visual-box>|border|padding|content]]#\",\"-webkit-mask-attachment\":\"<attachment>#\",\"-webkit-mask-clip\":\"[<coord-box>|no-clip|border|padding|content|text]#\",\"-webkit-mask-composite\":\"<composite-style>#\",\"-webkit-mask-image\":\"<mask-reference>#\",\"-webkit-mask-origin\":\"[<coord-box>|border|padding|content]#\",\"-webkit-mask-position\":\"<position>#\",\"-webkit-mask-position-x\":\"[<length-percentage>|left|center|right]#\",\"-webkit-mask-position-y\":\"[<length-percentage>|top|center|bottom]#\",\"-webkit-mask-repeat\":\"<repeat-style>#\",\"-webkit-mask-repeat-x\":\"repeat|no-repeat|space|round\",\"-webkit-mask-repeat-y\":\"repeat|no-repeat|space|round\",\"-webkit-mask-size\":\"<bg-size>#\",\"-webkit-overflow-scrolling\":\"auto|touch\",\"-webkit-tap-highlight-color\":\"<color>\",\"-webkit-text-fill-color\":\"<color>\",\"-webkit-text-stroke\":\"<length>||<color>\",\"-webkit-text-stroke-color\":\"<color>\",\"-webkit-text-stroke-width\":\"<length>\",\"-webkit-touch-callout\":\"default|none\",\"-webkit-user-modify\":\"read-only|read-write|read-write-plaintext-only\",\"-webkit-user-select\":\"auto|none|text|all\",\"accent-color\":\"auto|<color>\",\"align-content\":\"normal|<baseline-position>|<content-distribution>|<overflow-position>? <content-position>\",\"align-items\":\"normal|stretch|<baseline-position>|[<overflow-position>? <self-position>]|anchor-center\",\"align-self\":\"auto|normal|stretch|<baseline-position>|<overflow-position>? <self-position>|anchor-center\",\"align-tracks\":\"[normal|<baseline-position>|<content-distribution>|<overflow-position>? <content-position>]#\",\"alignment-baseline\":\"auto|baseline|before-edge|text-before-edge|middle|central|after-edge|text-after-edge|ideographic|alphabetic|hanging|mathematical\",all:\"initial|inherit|unset|revert|revert-layer\",\"anchor-name\":\"none|<dashed-ident>#\",\"anchor-scope\":\"none|all|<dashed-ident>#\",animation:\"<single-animation>#\",\"animation-composition\":\"<single-animation-composition>#\",\"animation-delay\":\"<time>#\",\"animation-direction\":\"<single-animation-direction>#\",\"animation-duration\":\"[auto|<time [0s,\\u221E]>]#\",\"animation-fill-mode\":\"<single-animation-fill-mode>#\",\"animation-iteration-count\":\"<single-animation-iteration-count>#\",\"animation-name\":\"[none|<keyframes-name>]#\",\"animation-play-state\":\"<single-animation-play-state>#\",\"animation-range\":\"[<'animation-range-start'> <'animation-range-end'>?]#\",\"animation-range-end\":\"[normal|<length-percentage>|<timeline-range-name> <length-percentage>?]#\",\"animation-range-start\":\"[normal|<length-percentage>|<timeline-range-name> <length-percentage>?]#\",\"animation-timeline\":\"<single-animation-timeline>#\",\"animation-timing-function\":\"<easing-function>#\",\"animation-trigger\":\"[none|[<dashed-ident> <animation-action>+]+]#\",appearance:\"none|auto|<compat-auto>|<compat-special>\",\"aspect-ratio\":\"auto||<ratio>\",\"backdrop-filter\":\"none|<filter-value-list>\",\"backface-visibility\":\"visible|hidden\",background:\"<bg-layer>#? , <final-bg-layer>\",\"background-attachment\":\"<attachment>#\",\"background-blend-mode\":\"<blend-mode>#\",\"background-clip\":\"<bg-clip>#\",\"background-color\":\"<color>\",\"background-image\":\"<bg-image>#\",\"background-origin\":\"<visual-box>#\",\"background-position\":\"<bg-position>#\",\"background-position-x\":\"[center|[[left|right|x-start|x-end]? <length-percentage>?]!]#\",\"background-position-y\":\"[center|[[top|bottom|y-start|y-end]? <length-percentage>?]!]#\",\"background-repeat\":\"<repeat-style>#\",\"background-size\":\"<bg-size>#\",\"baseline-shift\":\"baseline|sub|super|<svg-length>\",\"baseline-source\":\"auto|first|last\",\"block-size\":\"<'width'>\",border:\"<line-width>||<line-style>||<color>\",\"border-block\":\"<'border-block-start'>\",\"border-block-color\":\"<'border-top-color'>{1,2}\",\"border-block-end\":\"<'border-top-width'>||<'border-top-style'>||<color>\",\"border-block-end-color\":\"<'border-top-color'>\",\"border-block-end-style\":\"<'border-top-style'>\",\"border-block-end-width\":\"<'border-top-width'>\",\"border-block-start\":\"<'border-top-width'>||<'border-top-style'>||<color>\",\"border-block-start-color\":\"<'border-top-color'>\",\"border-block-start-style\":\"<'border-top-style'>\",\"border-block-start-width\":\"<'border-top-width'>\",\"border-block-style\":\"<'border-top-style'>{1,2}\",\"border-block-width\":\"<'border-top-width'>{1,2}\",\"border-bottom\":\"<line-width>||<line-style>||<color>\",\"border-bottom-color\":\"<'border-top-color'>\",\"border-bottom-left-radius\":\"<length-percentage [0,\\u221E]>{1,2}\",\"border-bottom-right-radius\":\"<length-percentage [0,\\u221E]>{1,2}\",\"border-bottom-style\":\"<line-style>\",\"border-bottom-width\":\"<line-width>\",\"border-collapse\":\"separate|collapse\",\"border-color\":\"<color>{1,4}\",\"border-end-end-radius\":\"<'border-top-left-radius'>\",\"border-end-start-radius\":\"<'border-top-left-radius'>\",\"border-image\":\"<'border-image-source'>||<'border-image-slice'> [/ <'border-image-width'>|/ <'border-image-width'>? / <'border-image-outset'>]?||<'border-image-repeat'>\",\"border-image-outset\":\"[<length [0,\\u221E]>|<number [0,\\u221E]>]{1,4}\",\"border-image-repeat\":\"[stretch|repeat|round|space]{1,2}\",\"border-image-slice\":\"[<number [0,\\u221E]>|<percentage [0,\\u221E]>]{1,4}&&fill?\",\"border-image-source\":\"none|<image>\",\"border-image-width\":\"[<length-percentage [0,\\u221E]>|<number [0,\\u221E]>|auto]{1,4}\",\"border-inline\":\"<'border-block-start'>\",\"border-inline-color\":\"<'border-top-color'>{1,2}\",\"border-inline-end\":\"<'border-top-width'>||<'border-top-style'>||<color>\",\"border-inline-end-color\":\"<'border-top-color'>\",\"border-inline-end-style\":\"<'border-top-style'>\",\"border-inline-end-width\":\"<'border-top-width'>\",\"border-inline-start\":\"<'border-top-width'>||<'border-top-style'>||<color>\",\"border-inline-start-color\":\"<'border-top-color'>\",\"border-inline-start-style\":\"<'border-top-style'>\",\"border-inline-start-width\":\"<'border-top-width'>\",\"border-inline-style\":\"<'border-top-style'>{1,2}\",\"border-inline-width\":\"<'border-top-width'>{1,2}\",\"border-left\":\"<line-width>||<line-style>||<color>\",\"border-left-color\":\"<color>\",\"border-left-style\":\"<line-style>\",\"border-left-width\":\"<line-width>\",\"border-radius\":\"<length-percentage [0,\\u221E]>{1,4} [/ <length-percentage [0,\\u221E]>{1,4}]?\",\"border-right\":\"<line-width>||<line-style>||<color>\",\"border-right-color\":\"<color>\",\"border-right-style\":\"<line-style>\",\"border-right-width\":\"<line-width>\",\"border-spacing\":\"<length>{1,2}\",\"border-start-end-radius\":\"<'border-top-left-radius'>\",\"border-start-start-radius\":\"<'border-top-left-radius'>\",\"border-style\":\"<line-style>{1,4}\",\"border-top\":\"<line-width>||<line-style>||<color>\",\"border-top-color\":\"<color>\",\"border-top-left-radius\":\"<length-percentage [0,\\u221E]>{1,2}\",\"border-top-right-radius\":\"<length-percentage [0,\\u221E]>{1,2}\",\"border-top-style\":\"<line-style>\",\"border-top-width\":\"<line-width>\",\"border-width\":\"<line-width>{1,4}\",bottom:\"auto|<length-percentage>|<anchor()>|<anchor-size()>\",\"box-align\":\"start|center|end|baseline|stretch\",\"box-decoration-break\":\"slice|clone\",\"box-direction\":\"normal|reverse|inherit\",\"box-flex\":\"<number>\",\"box-flex-group\":\"<integer>\",\"box-lines\":\"single|multiple\",\"box-ordinal-group\":\"<integer>\",\"box-orient\":\"horizontal|vertical|inline-axis|block-axis|inherit\",\"box-pack\":\"start|center|end|justify\",\"box-shadow\":\"none|<shadow>#\",\"box-sizing\":\"content-box|border-box\",\"break-after\":\"auto|avoid|always|all|avoid-page|page|left|right|recto|verso|avoid-column|column|avoid-region|region\",\"break-before\":\"auto|avoid|always|all|avoid-page|page|left|right|recto|verso|avoid-column|column|avoid-region|region\",\"break-inside\":\"auto|avoid|avoid-page|avoid-column|avoid-region\",\"caption-side\":\"top|bottom\",caret:\"<'caret-color'>||<'caret-animation'>||<'caret-shape'>\",\"caret-animation\":\"auto|manual\",\"caret-color\":\"auto|<color>\",\"caret-shape\":\"auto|bar|block|underscore\",clear:\"none|left|right|both|inline-start|inline-end\",clip:\"<shape>|auto\",\"clip-path\":\"<clip-source>|[<basic-shape>||<geometry-box>]|none\",\"clip-rule\":\"nonzero|evenodd\",color:\"<color>\",\"color-interpolation-filters\":\"auto|sRGB|linearRGB\",\"color-scheme\":\"normal|[light|dark|<custom-ident>]+&&only?\",\"column-count\":\"<integer>|auto\",\"column-fill\":\"auto|balance\",\"column-gap\":\"normal|<length-percentage>\",\"column-height\":\"auto|<length [0,\\u221E]>\",\"column-rule\":\"<'column-rule-width'>||<'column-rule-style'>||<'column-rule-color'>\",\"column-rule-color\":\"<color>\",\"column-rule-style\":\"<'border-style'>\",\"column-rule-width\":\"<'border-width'>\",\"column-span\":\"none|all\",\"column-width\":\"auto|<length [0,\\u221E]>\",\"column-wrap\":\"auto|nowrap|wrap\",columns:\"[<'column-width'>||<'column-count'>] [/ <'column-height'>]?\",contain:\"none|strict|content|[[size||inline-size]||layout||style||paint]\",\"contain-intrinsic-block-size\":\"auto? [none|<length>]\",\"contain-intrinsic-height\":\"auto? [none|<length>]\",\"contain-intrinsic-inline-size\":\"auto? [none|<length>]\",\"contain-intrinsic-size\":\"[auto? [none|<length>]]{1,2}\",\"contain-intrinsic-width\":\"auto? [none|<length>]\",container:\"<'container-name'> [/ <'container-type'>]?\",\"container-name\":\"none|<custom-ident>+\",\"container-type\":\"normal||[size|inline-size]\",content:\"normal|none|[<content-replacement>|<content-list>] [/ [<string>|<counter>|<attr()>]+]?\",\"content-visibility\":\"visible|auto|hidden\",\"corner-block-end-shape\":\"<corner-shape-value>{1,2}\",\"corner-block-start-shape\":\"<corner-shape-value>{1,2}\",\"corner-bottom-shape\":\"<corner-shape-value>{1,2}\",\"corner-bottom-left-shape\":\"<corner-shape-value>\",\"corner-bottom-right-shape\":\"<corner-shape-value>\",\"corner-end-end-shape\":\"<corner-shape-value>\",\"corner-end-start-shape\":\"<corner-shape-value>\",\"corner-inline-end-shape\":\"<corner-shape-value>{1,2}\",\"corner-inline-start-shape\":\"<corner-shape-value>{1,2}\",\"corner-left-shape\":\"<corner-shape-value>{1,2}\",\"corner-right-shape\":\"<corner-shape-value>{1,2}\",\"corner-shape\":\"<corner-shape-value>{1,4}\",\"corner-start-start-shape\":\"<corner-shape-value>\",\"corner-start-end-shape\":\"<corner-shape-value>\",\"corner-top-shape\":\"<corner-shape-value>{1,2}\",\"corner-top-left-shape\":\"<corner-shape-value>\",\"corner-top-right-shape\":\"<corner-shape-value>\",\"counter-increment\":\"[<counter-name> <integer>?]+|none\",\"counter-reset\":\"[<counter-name> <integer>?|<reversed-counter-name> <integer>?]+|none\",\"counter-set\":\"[<counter-name> <integer>?]+|none\",cursor:\"[[<url> [<x> <y>]? ,]* [auto|default|none|context-menu|help|pointer|progress|wait|cell|crosshair|text|vertical-text|alias|copy|move|no-drop|not-allowed|e-resize|n-resize|ne-resize|nw-resize|s-resize|se-resize|sw-resize|w-resize|ew-resize|ns-resize|nesw-resize|nwse-resize|col-resize|row-resize|all-scroll|zoom-in|zoom-out|grab|grabbing|hand|-webkit-grab|-webkit-grabbing|-webkit-zoom-in|-webkit-zoom-out|-moz-grab|-moz-grabbing|-moz-zoom-in|-moz-zoom-out]]\",cx:\"<length>|<percentage>\",cy:\"<length>|<percentage>\",d:\"none|path( <string> )\",direction:\"ltr|rtl\",display:\"[<display-outside>||<display-inside>]|<display-listitem>|<display-internal>|<display-box>|<display-legacy>|<-non-standard-display>\",\"dominant-baseline\":\"auto|use-script|no-change|reset-size|ideographic|alphabetic|hanging|mathematical|central|middle|text-after-edge|text-before-edge\",\"dynamic-range-limit\":\"standard|no-limit|constrained|<dynamic-range-limit-mix()>\",\"empty-cells\":\"show|hide\",\"field-sizing\":\"content|fixed\",fill:\"<paint>\",\"fill-opacity\":\"<number-zero-one>|<percentage>\",\"fill-rule\":\"nonzero|evenodd\",filter:\"none|<filter-value-list>|<-ms-filter-function-list>\",flex:\"none|[<'flex-grow'> <'flex-shrink'>?||<'flex-basis'>]\",\"flex-basis\":\"content|<'width'>\",\"flex-direction\":\"row|row-reverse|column|column-reverse\",\"flex-flow\":\"<'flex-direction'>||<'flex-wrap'>\",\"flex-grow\":\"<number>\",\"flex-shrink\":\"<number>\",\"flex-wrap\":\"nowrap|wrap|wrap-reverse\",float:\"left|right|none|inline-start|inline-end\",\"flood-color\":\"<color>\",\"flood-opacity\":\"<'opacity'>\",font:\"[[<'font-style'>||<font-variant-css2>||<'font-weight'>||<font-width-css3>]? <'font-size'> [/ <'line-height'>]? <'font-family'>#]|<system-family-name>|<-non-standard-font>\",\"font-family\":\"[<family-name>|<generic-family>]#\",\"font-feature-settings\":\"normal|<feature-tag-value>#\",\"font-kerning\":\"auto|normal|none\",\"font-language-override\":\"normal|<string>\",\"font-optical-sizing\":\"auto|none\",\"font-palette\":\"normal|light|dark|<palette-identifier>|<palette-mix()>\",\"font-size\":\"<absolute-size>|<relative-size>|<length-percentage [0,\\u221E]>|math\",\"font-size-adjust\":\"none|[ex-height|cap-height|ch-width|ic-width|ic-height]? [from-font|<number>]\",\"font-smooth\":\"auto|never|always|<absolute-size>|<length>\",\"font-stretch\":\"<font-stretch-absolute>\",\"font-style\":\"normal|italic|oblique <angle>?\",\"font-synthesis\":\"none|[weight||style||small-caps||position]\",\"font-synthesis-position\":\"auto|none\",\"font-synthesis-small-caps\":\"auto|none\",\"font-synthesis-style\":\"auto|none\",\"font-synthesis-weight\":\"auto|none\",\"font-variant\":\"normal|none|[<common-lig-values>||<discretionary-lig-values>||<historical-lig-values>||<contextual-alt-values>||stylistic( <feature-value-name> )||historical-forms||styleset( <feature-value-name># )||character-variant( <feature-value-name># )||swash( <feature-value-name> )||ornaments( <feature-value-name> )||annotation( <feature-value-name> )||[small-caps|all-small-caps|petite-caps|all-petite-caps|unicase|titling-caps]||<numeric-figure-values>||<numeric-spacing-values>||<numeric-fraction-values>||ordinal||slashed-zero||<east-asian-variant-values>||<east-asian-width-values>||ruby]\",\"font-variant-alternates\":\"normal|[stylistic( <feature-value-name> )||historical-forms||styleset( <feature-value-name># )||character-variant( <feature-value-name># )||swash( <feature-value-name> )||ornaments( <feature-value-name> )||annotation( <feature-value-name> )]\",\"font-variant-caps\":\"normal|small-caps|all-small-caps|petite-caps|all-petite-caps|unicase|titling-caps\",\"font-variant-east-asian\":\"normal|[<east-asian-variant-values>||<east-asian-width-values>||ruby]\",\"font-variant-emoji\":\"normal|text|emoji|unicode\",\"font-variant-ligatures\":\"normal|none|[<common-lig-values>||<discretionary-lig-values>||<historical-lig-values>||<contextual-alt-values>]\",\"font-variant-numeric\":\"normal|[<numeric-figure-values>||<numeric-spacing-values>||<numeric-fraction-values>||ordinal||slashed-zero]\",\"font-variant-position\":\"normal|sub|super\",\"font-variation-settings\":\"normal|[<string> <number>]#\",\"font-weight\":\"<font-weight-absolute>|bolder|lighter\",\"font-width\":\"normal|<percentage [0,\\u221E]>|ultra-condensed|extra-condensed|condensed|semi-condensed|semi-expanded|expanded|extra-expanded|ultra-expanded\",\"forced-color-adjust\":\"auto|none|preserve-parent-color\",gap:\"<'row-gap'> <'column-gap'>?\",grid:\"<'grid-template'>|<'grid-template-rows'> / [auto-flow&&dense?] <'grid-auto-columns'>?|[auto-flow&&dense?] <'grid-auto-rows'>? / <'grid-template-columns'>\",\"grid-area\":\"<grid-line> [/ <grid-line>]{0,3}\",\"grid-auto-columns\":\"<track-size>+\",\"grid-auto-flow\":\"[row|column]||dense\",\"grid-auto-rows\":\"<track-size>+\",\"grid-column\":\"<grid-line> [/ <grid-line>]?\",\"grid-column-end\":\"<grid-line>\",\"grid-column-gap\":\"<length-percentage>\",\"grid-column-start\":\"<grid-line>\",\"grid-gap\":\"<'grid-row-gap'> <'grid-column-gap'>?\",\"grid-row\":\"<grid-line> [/ <grid-line>]?\",\"grid-row-end\":\"<grid-line>\",\"grid-row-gap\":\"<length-percentage>\",\"grid-row-start\":\"<grid-line>\",\"grid-template\":\"none|[<'grid-template-rows'> / <'grid-template-columns'>]|[<line-names>? <string> <track-size>? <line-names>?]+ [/ <explicit-track-list>]?\",\"grid-template-areas\":\"none|<string>+\",\"grid-template-columns\":\"none|<track-list>|<auto-track-list>|subgrid <line-name-list>?\",\"grid-template-rows\":\"none|<track-list>|<auto-track-list>|subgrid <line-name-list>?\",\"hanging-punctuation\":\"none|[first||[force-end|allow-end]||last]\",height:\"auto|<length-percentage [0,\\u221E]>|min-content|max-content|fit-content|fit-content( <length-percentage [0,\\u221E]> )|<calc-size()>|<anchor-size()>|stretch|<-non-standard-size>\",\"hyphenate-character\":\"auto|<string>\",\"hyphenate-limit-chars\":\"[auto|<integer>]{1,3}\",hyphens:\"none|manual|auto\",\"image-orientation\":\"from-image|<angle>|[<angle>? flip]\",\"image-rendering\":\"auto|crisp-edges|pixelated|smooth|optimizeSpeed|optimizeQuality|<-non-standard-image-rendering>\",\"image-resolution\":\"[from-image||<resolution>]&&snap?\",\"ime-mode\":\"auto|normal|active|inactive|disabled\",\"initial-letter\":\"normal|[<number> <integer>?]\",\"initial-letter-align\":\"[auto|alphabetic|hanging|ideographic]\",\"inline-size\":\"<'width'>\",inset:\"<'top'>{1,4}\",\"inset-block\":\"<'top'>{1,2}\",\"inset-block-end\":\"<'top'>\",\"inset-block-start\":\"<'top'>\",\"inset-inline\":\"<'top'>{1,2}\",\"inset-inline-end\":\"<'top'>\",\"inset-inline-start\":\"<'top'>\",\"interpolate-size\":\"numeric-only|allow-keywords\",isolation:\"auto|isolate\",interactivity:\"auto|inert\",\"interest-delay\":\"<'interest-delay-start'>{1,2}\",\"interest-delay-end\":\"normal|<time>\",\"interest-delay-start\":\"normal|<time>\",\"justify-content\":\"normal|<content-distribution>|<overflow-position>? [<content-position>|left|right]\",\"justify-items\":\"normal|stretch|<baseline-position>|<overflow-position>? [<self-position>|left|right]|legacy|legacy&&[left|right|center]|anchor-center\",\"justify-self\":\"auto|normal|stretch|<baseline-position>|<overflow-position>? [<self-position>|left|right]|anchor-center\",\"justify-tracks\":\"[normal|<content-distribution>|<overflow-position>? [<content-position>|left|right]]#\",left:\"auto|<length-percentage>|<anchor()>|<anchor-size()>\",\"letter-spacing\":\"normal|<length-percentage>\",\"lighting-color\":\"<color>\",\"line-break\":\"auto|loose|normal|strict|anywhere\",\"line-clamp\":\"none|<integer>\",\"line-height\":\"normal|<number>|<length>|<percentage>\",\"line-height-step\":\"<length>\",\"list-style\":\"<'list-style-type'>||<'list-style-position'>||<'list-style-image'>\",\"list-style-image\":\"<image>|none\",\"list-style-position\":\"inside|outside\",\"list-style-type\":\"<counter-style>|<string>|none\",margin:\"<'margin-top'>{1,4}\",\"margin-block\":\"<'margin-top'>{1,2}\",\"margin-block-end\":\"<'margin-top'>\",\"margin-block-start\":\"<'margin-top'>\",\"margin-bottom\":\"<length-percentage>|auto|<anchor-size()>\",\"margin-inline\":\"<'margin-top'>{1,2}\",\"margin-inline-end\":\"<'margin-top'>\",\"margin-inline-start\":\"<'margin-top'>\",\"margin-left\":\"<length-percentage>|auto|<anchor-size()>\",\"margin-right\":\"<length-percentage>|auto|<anchor-size()>\",\"margin-top\":\"<length-percentage>|auto|<anchor-size()>\",\"margin-trim\":\"none|in-flow|all\",marker:\"none|<url>\",\"marker-end\":\"none|<url>\",\"marker-mid\":\"none|<url>\",\"marker-start\":\"none|<url>\",mask:\"<mask-layer>#\",\"mask-border\":\"<'mask-border-source'>||<'mask-border-slice'> [/ <'mask-border-width'>? [/ <'mask-border-outset'>]?]?||<'mask-border-repeat'>||<'mask-border-mode'>\",\"mask-border-mode\":\"luminance|alpha\",\"mask-border-outset\":\"[<length>|<number>]{1,4}\",\"mask-border-repeat\":\"[stretch|repeat|round|space]{1,2}\",\"mask-border-slice\":\"<number-percentage>{1,4} fill?\",\"mask-border-source\":\"none|<image>\",\"mask-border-width\":\"[<length-percentage>|<number>|auto]{1,4}\",\"mask-clip\":\"[<coord-box>|no-clip]#\",\"mask-composite\":\"<compositing-operator>#\",\"mask-image\":\"<mask-reference>#\",\"mask-mode\":\"<masking-mode>#\",\"mask-origin\":\"<coord-box>#\",\"mask-position\":\"<position>#\",\"mask-repeat\":\"<repeat-style>#\",\"mask-size\":\"<bg-size>#\",\"mask-type\":\"luminance|alpha\",\"masonry-auto-flow\":\"[pack|next]||[definite-first|ordered]\",\"math-depth\":\"auto-add|add( <integer> )|<integer>\",\"math-shift\":\"normal|compact\",\"math-style\":\"normal|compact\",\"max-block-size\":\"<'max-width'>\",\"max-height\":\"none|<length-percentage [0,\\u221E]>|min-content|max-content|fit-content|fit-content( <length-percentage [0,\\u221E]> )|<calc-size()>|<anchor-size()>|stretch|<-non-standard-size>\",\"max-inline-size\":\"<'max-width'>\",\"max-lines\":\"none|<integer>\",\"max-width\":\"none|<length-percentage [0,\\u221E]>|min-content|max-content|fit-content|fit-content( <length-percentage [0,\\u221E]> )|<calc-size()>|<anchor-size()>|stretch|<-non-standard-size>\",\"min-block-size\":\"<'min-width'>\",\"min-height\":\"auto|<length-percentage [0,\\u221E]>|min-content|max-content|fit-content|fit-content( <length-percentage [0,\\u221E]> )|<calc-size()>|<anchor-size()>|stretch|<-non-standard-size>\",\"min-inline-size\":\"<'min-width'>\",\"min-width\":\"auto|<length-percentage [0,\\u221E]>|min-content|max-content|fit-content|fit-content( <length-percentage [0,\\u221E]> )|<calc-size()>|<anchor-size()>|stretch|<-non-standard-size>\",\"mix-blend-mode\":\"<blend-mode>|plus-darker|plus-lighter\",\"object-fit\":\"fill|contain|cover|none|scale-down\",\"object-position\":\"<position>\",\"object-view-box\":\"none|<basic-shape-rect>\",offset:\"[<'offset-position'>? [<'offset-path'> [<'offset-distance'>||<'offset-rotate'>]?]?]! [/ <'offset-anchor'>]?\",\"offset-anchor\":\"auto|<position>\",\"offset-distance\":\"<length-percentage>\",\"offset-path\":\"none|<offset-path>||<coord-box>\",\"offset-position\":\"normal|auto|<position>\",\"offset-rotate\":\"[auto|reverse]||<angle>\",opacity:\"<opacity-value>\",order:\"<integer>\",orphans:\"<integer>\",outline:\"<'outline-width'>||<'outline-style'>||<'outline-color'>\",\"outline-color\":\"auto|<color>\",\"outline-offset\":\"<length>\",\"outline-style\":\"auto|<outline-line-style>\",\"outline-width\":\"<line-width>\",overflow:\"[visible|hidden|clip|scroll|auto]{1,2}|<-non-standard-overflow>\",\"overflow-anchor\":\"auto|none\",\"overflow-block\":\"visible|hidden|clip|scroll|auto|<-non-standard-overflow>\",\"overflow-clip-box\":\"padding-box|content-box\",\"overflow-clip-margin\":\"<visual-box>||<length [0,\\u221E]>\",\"overflow-inline\":\"visible|hidden|clip|scroll|auto|<-non-standard-overflow>\",\"overflow-wrap\":\"normal|break-word|anywhere\",\"overflow-x\":\"visible|hidden|clip|scroll|auto|<-non-standard-overflow>\",\"overflow-y\":\"visible|hidden|clip|scroll|auto|<-non-standard-overflow>\",overlay:\"none|auto\",\"overscroll-behavior\":\"[contain|none|auto]{1,2}\",\"overscroll-behavior-block\":\"contain|none|auto\",\"overscroll-behavior-inline\":\"contain|none|auto\",\"overscroll-behavior-x\":\"contain|none|auto\",\"overscroll-behavior-y\":\"contain|none|auto\",padding:\"<'padding-top'>{1,4}\",\"padding-block\":\"<'padding-top'>{1,2}\",\"padding-block-end\":\"<'padding-top'>\",\"padding-block-start\":\"<'padding-top'>\",\"padding-bottom\":\"<length-percentage [0,\\u221E]>\",\"padding-inline\":\"<'padding-top'>{1,2}\",\"padding-inline-end\":\"<'padding-top'>\",\"padding-inline-start\":\"<'padding-top'>\",\"padding-left\":\"<length-percentage [0,\\u221E]>\",\"padding-right\":\"<length-percentage [0,\\u221E]>\",\"padding-top\":\"<length-percentage [0,\\u221E]>\",page:\"auto|<custom-ident>\",\"page-break-after\":\"auto|always|avoid|left|right|recto|verso\",\"page-break-before\":\"auto|always|avoid|left|right|recto|verso\",\"page-break-inside\":\"auto|avoid\",\"paint-order\":\"normal|[fill||stroke||markers]\",perspective:\"none|<length>\",\"perspective-origin\":\"<position>\",\"place-content\":\"<'align-content'> <'justify-content'>?\",\"place-items\":\"<'align-items'> <'justify-items'>?\",\"place-self\":\"<'align-self'> <'justify-self'>?\",\"pointer-events\":\"auto|none|visiblePainted|visibleFill|visibleStroke|visible|painted|fill|stroke|all|inherit\",position:\"static|relative|absolute|sticky|fixed|-webkit-sticky\",\"position-anchor\":\"auto|none|<anchor-name>\",\"position-area\":\"none|<position-area>\",\"position-try\":\"<'position-try-order'>? <'position-try-fallbacks'>\",\"position-try-fallbacks\":\"none|[[<dashed-ident>||<try-tactic>]|<'position-area'>]#\",\"position-try-order\":\"normal|<try-size>\",\"position-visibility\":\"always|[anchors-valid||anchors-visible||no-overflow]\",\"print-color-adjust\":\"economy|exact\",quotes:\"none|auto|[<string> <string>]+\",r:\"<length>|<percentage>\",\"reading-flow\":\"normal|source-order|flex-visual|flex-flow|grid-rows|grid-columns|grid-order\",\"reading-order\":\"<integer>\",resize:\"none|both|horizontal|vertical|block|inline\",right:\"auto|<length-percentage>|<anchor()>|<anchor-size()>\",rotate:\"none|<angle>|[x|y|z|<number>{3}]&&<angle>\",\"row-gap\":\"normal|<length-percentage>\",\"ruby-align\":\"start|center|space-between|space-around\",\"ruby-merge\":\"separate|collapse|auto\",\"ruby-overhang\":\"auto|none\",\"ruby-position\":\"[alternate||[over|under]]|inter-character\",rx:\"<length>|<percentage>\",ry:\"<length>|<percentage>\",scale:\"none|[<number>|<percentage>]{1,3}\",\"scroll-behavior\":\"auto|smooth\",\"scroll-initial-target\":\"none|nearest\",\"scroll-margin\":\"<length>{1,4}\",\"scroll-margin-block\":\"<length>{1,2}\",\"scroll-margin-block-end\":\"<length>\",\"scroll-margin-block-start\":\"<length>\",\"scroll-margin-bottom\":\"<length>\",\"scroll-margin-inline\":\"<length>{1,2}\",\"scroll-margin-inline-end\":\"<length>\",\"scroll-margin-inline-start\":\"<length>\",\"scroll-margin-left\":\"<length>\",\"scroll-margin-right\":\"<length>\",\"scroll-margin-top\":\"<length>\",\"scroll-marker-group\":\"none|before|after\",\"scroll-padding\":\"[auto|<length-percentage>]{1,4}\",\"scroll-padding-block\":\"[auto|<length-percentage>]{1,2}\",\"scroll-padding-block-end\":\"auto|<length-percentage>\",\"scroll-padding-block-start\":\"auto|<length-percentage>\",\"scroll-padding-bottom\":\"auto|<length-percentage>\",\"scroll-padding-inline\":\"[auto|<length-percentage>]{1,2}\",\"scroll-padding-inline-end\":\"auto|<length-percentage>\",\"scroll-padding-inline-start\":\"auto|<length-percentage>\",\"scroll-padding-left\":\"auto|<length-percentage>\",\"scroll-padding-right\":\"auto|<length-percentage>\",\"scroll-padding-top\":\"auto|<length-percentage>\",\"scroll-snap-align\":\"[none|start|end|center]{1,2}\",\"scroll-snap-coordinate\":\"none|<position>#\",\"scroll-snap-destination\":\"<position>\",\"scroll-snap-points-x\":\"none|repeat( <length-percentage> )\",\"scroll-snap-points-y\":\"none|repeat( <length-percentage> )\",\"scroll-snap-stop\":\"normal|always\",\"scroll-snap-type\":\"none|[x|y|block|inline|both] [mandatory|proximity]?\",\"scroll-snap-type-x\":\"none|mandatory|proximity\",\"scroll-snap-type-y\":\"none|mandatory|proximity\",\"scroll-target-group\":\"none|auto\",\"scroll-timeline\":\"[<'scroll-timeline-name'> <'scroll-timeline-axis'>?]#\",\"scroll-timeline-axis\":\"[block|inline|x|y]#\",\"scroll-timeline-name\":\"[none|<dashed-ident>]#\",\"scrollbar-color\":\"auto|<color>{2}\",\"scrollbar-gutter\":\"auto|stable&&both-edges?\",\"scrollbar-width\":\"auto|thin|none\",\"shape-image-threshold\":\"<opacity-value>\",\"shape-margin\":\"<length-percentage>\",\"shape-outside\":\"none|[<shape-box>||<basic-shape>]|<image>\",\"shape-rendering\":\"auto|optimizeSpeed|crispEdges|geometricPrecision\",\"speak-as\":\"normal|spell-out||digits||[literal-punctuation|no-punctuation]\",\"stop-color\":\"<'color'>\",\"stop-opacity\":\"<'opacity'>\",stroke:\"<paint>\",\"stroke-color\":\"<color>\",\"stroke-dasharray\":\"none|[<svg-length>+]#\",\"stroke-dashoffset\":\"<svg-length>\",\"stroke-linecap\":\"butt|round|square\",\"stroke-linejoin\":\"miter|round|bevel\",\"stroke-miterlimit\":\"<number-one-or-greater>\",\"stroke-opacity\":\"<'opacity'>\",\"stroke-width\":\"<svg-length>\",\"tab-size\":\"<integer>|<length>\",\"table-layout\":\"auto|fixed\",\"text-align\":\"start|end|left|right|center|justify|match-parent\",\"text-align-last\":\"auto|start|end|left|right|center|justify\",\"text-anchor\":\"start|middle|end\",\"text-autospace\":\"normal|<autospace>|auto\",\"text-box\":\"normal|<'text-box-trim'>||<'text-box-edge'>\",\"text-box-edge\":\"auto|<text-edge>\",\"text-box-trim\":\"none|trim-start|trim-end|trim-both\",\"text-combine-upright\":\"none|all|[digits <integer>?]\",\"text-decoration\":\"<'text-decoration-line'>||<'text-decoration-style'>||<'text-decoration-color'>||<'text-decoration-thickness'>\",\"text-decoration-color\":\"<color>\",\"text-decoration-inset\":\"<length>{1,2}|auto\",\"text-decoration-line\":\"none|[underline||overline||line-through||blink]|spelling-error|grammar-error\",\"text-decoration-skip\":\"none|[objects||[spaces|[leading-spaces||trailing-spaces]]||edges||box-decoration]\",\"text-decoration-skip-ink\":\"auto|all|none\",\"text-decoration-style\":\"solid|double|dotted|dashed|wavy\",\"text-decoration-thickness\":\"auto|from-font|<length>|<percentage>\",\"text-emphasis\":\"<'text-emphasis-style'>||<'text-emphasis-color'>\",\"text-emphasis-color\":\"<color>\",\"text-emphasis-position\":\"auto|[over|under]&&[right|left]?\",\"text-emphasis-style\":\"none|[[filled|open]||[dot|circle|double-circle|triangle|sesame]]|<string>\",\"text-indent\":\"<length-percentage>&&hanging?&&each-line?\",\"text-justify\":\"auto|inter-character|inter-word|none\",\"text-orientation\":\"mixed|upright|sideways\",\"text-overflow\":\"[clip|ellipsis|<string>]{1,2}\",\"text-rendering\":\"auto|optimizeSpeed|optimizeLegibility|geometricPrecision\",\"text-shadow\":\"none|<shadow-t>#\",\"text-size-adjust\":\"none|auto|<percentage>\",\"text-spacing-trim\":\"space-all|normal|space-first|trim-start\",\"text-transform\":\"none|[capitalize|uppercase|lowercase]||full-width||full-size-kana|math-auto\",\"text-underline-offset\":\"auto|<length>|<percentage>\",\"text-underline-position\":\"auto|from-font|[under||[left|right]]\",\"text-wrap\":\"<'text-wrap-mode'>||<'text-wrap-style'>\",\"text-wrap-mode\":\"wrap|nowrap\",\"text-wrap-style\":\"auto|balance|stable|pretty\",\"timeline-scope\":\"none|<dashed-ident>#\",\"timeline-trigger\":\"none|[<'timeline-trigger-name'> <'timeline-trigger-source'> <'timeline-trigger-range'> ['/' <'timeline-trigger-exit-range'>]?]#\",\"timeline-trigger-name\":\"none|<dashed-ident>#\",\"timeline-trigger-exit-range\":\"[<'timeline-trigger-exit-range-start'> <'timeline-trigger-exit-range-end'>?]#\",\"timeline-trigger-exit-range-end\":\"[auto|normal|<length-percentage>|<timeline-range-name> <length-percentage>?]#\",\"timeline-trigger-exit-range-start\":\"[auto|normal|<length-percentage>|<timeline-range-name> <length-percentage>?]#\",\"timeline-trigger-range\":\"[<'timeline-trigger-range-start'> <'timeline-trigger-range-end'>?]#\",\"timeline-trigger-range-end\":\"[normal|<length-percentage>|<timeline-range-name> <length-percentage>?]#\",\"timeline-trigger-range-start\":\"[normal|<length-percentage>|<timeline-range-name> <length-percentage>?]#\",\"timeline-trigger-source\":\"<single-animation-timeline>#\",top:\"auto|<length-percentage>|<anchor()>|<anchor-size()>\",\"touch-action\":\"auto|none|[[pan-x|pan-left|pan-right]||[pan-y|pan-up|pan-down]||pinch-zoom]|manipulation\",transform:\"none|<transform-list>\",\"transform-box\":\"content-box|border-box|fill-box|stroke-box|view-box\",\"transform-origin\":\"[<length-percentage>|left|center|right|top|bottom]|[[<length-percentage>|left|center|right]&&[<length-percentage>|top|center|bottom]] <length>?\",\"transform-style\":\"flat|preserve-3d\",transition:\"<single-transition>#\",\"transition-behavior\":\"<transition-behavior-value>#\",\"transition-delay\":\"<time>#\",\"transition-duration\":\"<time>#\",\"transition-property\":\"none|<single-transition-property>#\",\"transition-timing-function\":\"<easing-function>#\",translate:\"none|<length-percentage> [<length-percentage> <length>?]?\",\"trigger-scope\":\"none|all|<dashed-ident>#\",\"unicode-bidi\":\"normal|embed|isolate|bidi-override|isolate-override|plaintext|-moz-isolate|-moz-isolate-override|-moz-plaintext|-webkit-isolate|-webkit-isolate-override|-webkit-plaintext\",\"user-select\":\"auto|text|none|all\",\"vector-effect\":\"none|non-scaling-stroke|non-scaling-size|non-rotation|fixed-position\",\"vertical-align\":\"baseline|sub|super|text-top|text-bottom|middle|top|bottom|<percentage>|<length>\",\"view-timeline\":\"[<'view-timeline-name'> [<'view-timeline-axis'>||<'view-timeline-inset'>]?]#\",\"view-timeline-axis\":\"[block|inline|x|y]#\",\"view-timeline-inset\":\"[[auto|<length-percentage>]{1,2}]#\",\"view-timeline-name\":\"[none|<dashed-ident>]#\",\"view-transition-class\":\"none|<custom-ident>+\",\"view-transition-name\":\"none|<custom-ident>|match-element\",visibility:\"visible|hidden|collapse\",\"white-space\":\"normal|pre|pre-wrap|pre-line|<'white-space-collapse'>||<'text-wrap-mode'>\",\"white-space-collapse\":\"collapse|preserve|preserve-breaks|preserve-spaces|break-spaces\",widows:\"<integer>\",width:\"auto|<length-percentage [0,\\u221E]>|min-content|max-content|fit-content|fit-content( <length-percentage [0,\\u221E]> )|<calc-size()>|<anchor-size()>|stretch|<-non-standard-size>\",\"will-change\":\"auto|<animateable-feature>#\",\"word-break\":\"normal|break-all|keep-all|break-word|auto-phrase\",\"word-spacing\":\"normal|<length>\",\"word-wrap\":\"normal|break-word\",\"writing-mode\":\"horizontal-tb|vertical-rl|vertical-lr|sideways-rl|sideways-lr|<svg-writing-mode>\",x:\"<length>|<percentage>\",y:\"<length>|<percentage>\",\"z-index\":\"auto|<integer>\",zoom:\"normal|reset|<number [0,\\u221E]>||<percentage [0,\\u221E]>\",\"-moz-background-clip\":\"padding|border\",\"-moz-border-radius-bottomleft\":\"<'border-bottom-left-radius'>\",\"-moz-border-radius-bottomright\":\"<'border-bottom-right-radius'>\",\"-moz-border-radius-topleft\":\"<'border-top-left-radius'>\",\"-moz-border-radius-topright\":\"<'border-bottom-right-radius'>\",\"-moz-control-character-visibility\":\"visible|hidden\",\"-moz-osx-font-smoothing\":\"auto|grayscale\",\"-moz-user-select\":\"none|text|all|-moz-none\",\"-ms-flex-align\":\"start|end|center|baseline|stretch\",\"-ms-flex-item-align\":\"auto|start|end|center|baseline|stretch\",\"-ms-flex-line-pack\":\"start|end|center|justify|distribute|stretch\",\"-ms-flex-negative\":\"<'flex-shrink'>\",\"-ms-flex-pack\":\"start|end|center|justify|distribute\",\"-ms-flex-order\":\"<integer>\",\"-ms-flex-positive\":\"<'flex-grow'>\",\"-ms-flex-preferred-size\":\"<'flex-basis'>\",\"-ms-interpolation-mode\":\"nearest-neighbor|bicubic\",\"-ms-grid-column-align\":\"start|end|center|stretch\",\"-ms-grid-row-align\":\"start|end|center|stretch\",\"-ms-hyphenate-limit-last\":\"none|always|column|page|spread\",\"-webkit-background-clip\":\"[<visual-box>|border|padding|content|text]#\",\"-webkit-column-break-after\":\"always|auto|avoid\",\"-webkit-column-break-before\":\"always|auto|avoid\",\"-webkit-column-break-inside\":\"always|auto|avoid\",\"-webkit-font-smoothing\":\"auto|none|antialiased|subpixel-antialiased\",\"-webkit-mask-box-image\":\"[<url>|<gradient>|none] [<length-percentage>{4} <-webkit-mask-box-repeat>{2}]?\",\"-webkit-print-color-adjust\":\"economy|exact\",\"-webkit-text-security\":\"none|circle|disc|square\",\"-webkit-user-drag\":\"none|element|auto\",behavior:\"<url>+\",cue:\"<'cue-before'> <'cue-after'>?\",\"cue-after\":\"<url> <decibel>?|none\",\"cue-before\":\"<url> <decibel>?|none\",\"glyph-orientation-horizontal\":\"<angle>\",\"glyph-orientation-vertical\":\"<angle>\",kerning:\"auto|<svg-length>\",pause:\"<'pause-before'> <'pause-after'>?\",\"pause-after\":\"<time>|none|x-weak|weak|medium|strong|x-strong\",\"pause-before\":\"<time>|none|x-weak|weak|medium|strong|x-strong\",\"position-try-options\":\"<'position-try-fallbacks'>\",rest:\"<'rest-before'> <'rest-after'>?\",\"rest-after\":\"<time>|none|x-weak|weak|medium|strong|x-strong\",\"rest-before\":\"<time>|none|x-weak|weak|medium|strong|x-strong\",speak:\"auto|never|always\",\"voice-balance\":\"<number>|left|center|right|leftwards|rightwards\",\"voice-duration\":\"auto|<time>\",\"voice-family\":\"[[<family-name>|<generic-voice>] ,]* [<family-name>|<generic-voice>]|preserve\",\"voice-pitch\":\"<frequency>&&absolute|[[x-low|low|medium|high|x-high]||[<frequency>|<semitones>|<percentage>]]\",\"voice-range\":\"<frequency>&&absolute|[[x-low|low|medium|high|x-high]||[<frequency>|<semitones>|<percentage>]]\",\"voice-rate\":\"[normal|x-slow|slow|medium|fast|x-fast]||<percentage>\",\"voice-stress\":\"normal|strong|moderate|none|reduced\",\"voice-volume\":\"silent|[[x-soft|soft|medium|loud|x-loud]||<decibel>]\",\"white-space-trim\":\"none|discard-before||discard-after||discard-inner\"},atrules:{charset:{prelude:\"<string>\",descriptors:null},\"counter-style\":{prelude:\"<counter-style-name>\",descriptors:{\"additive-symbols\":\"[<integer [0,\\u221E]>&&<symbol>]#\",fallback:\"<counter-style-name>\",negative:\"<symbol> <symbol>?\",pad:\"<integer [0,\\u221E]>&&<symbol>\",prefix:\"<symbol>\",range:\"[[<integer>|infinite]{2}]#|auto\",\"speak-as\":\"auto|bullets|numbers|words|spell-out|<counter-style-name>\",suffix:\"<symbol>\",symbols:\"<symbol>+\",system:\"cyclic|numeric|alphabetic|symbolic|additive|[fixed <integer>?]|[extends <counter-style-name>]\"}},container:{prelude:\"[<container-name>]? <container-condition>\",descriptors:null},document:{prelude:\"[<url>|url-prefix( <string> )|domain( <string> )|media-document( <string> )|regexp( <string> )]#\",descriptors:null},\"font-face\":{prelude:null,descriptors:{\"ascent-override\":\"normal|<percentage>\",\"descent-override\":\"normal|<percentage>\",\"font-display\":\"auto|block|swap|fallback|optional\",\"font-family\":\"<family-name>\",\"font-feature-settings\":\"normal|<feature-tag-value>#\",\"font-stretch\":\"<font-stretch-absolute>{1,2}\",\"font-style\":\"normal|italic|oblique <angle>{0,2}\",\"font-variation-settings\":\"normal|[<string> <number>]#\",\"font-weight\":\"<font-weight-absolute>{1,2}\",\"line-gap-override\":\"normal|<percentage>\",\"size-adjust\":\"<percentage>\",src:\"[<url> [format( <string># )]?|local( <family-name> )]#\",\"unicode-range\":\"<urange>#\"}},\"font-feature-values\":{prelude:\"<family-name>#\",descriptors:null},\"font-palette-values\":{prelude:\"<dashed-ident>\",descriptors:{\"base-palette\":\"light|dark|<integer [0,\\u221E]>\",\"font-family\":\"<family-name>#\",\"override-colors\":\"[<integer [0,\\u221E]> <color>]#\"}},import:{prelude:\"[<string>|<url>] [layer|layer( <layer-name> )]? [supports( [<supports-condition>|<declaration>] )]? <media-query-list>?\",descriptors:null},keyframes:{prelude:\"<keyframes-name>\",descriptors:null},layer:{prelude:\"[<layer-name>#|<layer-name>?]\",descriptors:null},media:{prelude:\"<media-query-list>\",descriptors:null},namespace:{prelude:\"<namespace-prefix>? [<string>|<url>]\",descriptors:null},page:{prelude:\"<page-selector-list>\",descriptors:{bleed:\"auto|<length>\",marks:\"none|[crop||cross]\",\"page-orientation\":\"upright|rotate-left|rotate-right\",size:\"<length [0,\\u221E]>{1,2}|auto|[<page-size>||[portrait|landscape]]\"}},\"position-try\":{prelude:\"<dashed-ident>\",descriptors:{top:\"<'top'>\",left:\"<'left'>\",bottom:\"<'bottom'>\",right:\"<'right'>\",\"inset-block-start\":\"<'inset-block-start'>\",\"inset-block-end\":\"<'inset-block-end'>\",\"inset-inline-start\":\"<'inset-inline-start'>\",\"inset-inline-end\":\"<'inset-inline-end'>\",\"inset-block\":\"<'inset-block'>\",\"inset-inline\":\"<'inset-inline'>\",inset:\"<'inset'>\",\"margin-top\":\"<'margin-top'>\",\"margin-left\":\"<'margin-left'>\",\"margin-bottom\":\"<'margin-bottom'>\",\"margin-right\":\"<'margin-right'>\",\"margin-block-start\":\"<'margin-block-start'>\",\"margin-block-end\":\"<'margin-block-end'>\",\"margin-inline-start\":\"<'margin-inline-start'>\",\"margin-inline-end\":\"<'margin-inline-end'>\",margin:\"<'margin'>\",\"margin-block\":\"<'margin-block'>\",\"margin-inline\":\"<'margin-inline'>\",width:\"<'width'>\",height:\"<'height'>\",\"min-width\":\"<'min-width'>\",\"min-height\":\"<'min-height'>\",\"max-width\":\"<'max-width'>\",\"max-height\":\"<'max-height'>\",\"block-size\":\"<'block-size'>\",\"inline-size\":\"<'inline-size'>\",\"min-block-size\":\"<'min-block-size'>\",\"min-inline-size\":\"<'min-inline-size'>\",\"max-block-size\":\"<'max-block-size'>\",\"max-inline-size\":\"<'max-inline-size'>\",\"align-self\":\"<'align-self'>|anchor-center\",\"justify-self\":\"<'justify-self'>|anchor-center\"}},property:{prelude:\"<custom-property-name>\",descriptors:{inherits:\"true|false\",\"initial-value\":\"<declaration-value>?\",syntax:\"<string>\"}},scope:{prelude:\"[( <scope-start> )]? [to ( <scope-end> )]?\",descriptors:null},\"starting-style\":{prelude:null,descriptors:null},supports:{prelude:\"<supports-condition>\",descriptors:null},\"view-transition\":{prelude:null,descriptors:{navigation:\"auto|none\",types:\"none|<custom-ident>+\"}},\"font-features-values\":{prelude:\"[<string>|<custom-ident>]+\",descriptors:{\"font-display\":\"auto|block|swap|fallback|optional\"}}}};var Vi={};I(Vi,{AnPlusB:()=>Ql,Atrule:()=>Wl,AtrulePrelude:()=>Gl,AttributeSelector:()=>$l,Block:()=>Jl,Brackets:()=>Kl,CDC:()=>Zl,CDO:()=>tc,ClassSelector:()=>rc,Combinator:()=>oc,Comment:()=>ac,Condition:()=>cc,Declaration:()=>pc,DeclarationList:()=>mc,Dimension:()=>gc,Feature:()=>bc,FeatureFunction:()=>wc,FeatureRange:()=>vc,Function:()=>Ec,GeneralEnclosed:()=>Ac,Hash:()=>Lc,IdSelector:()=>Nc,Identifier:()=>Rc,Layer:()=>Oc,LayerList:()=>Fc,MediaQuery:()=>Bc,MediaQueryList:()=>Hc,NestingSelector:()=>Uc,Nth:()=>Vc,Number:()=>$c,Operator:()=>Jc,Parentheses:()=>Kc,Percentage:()=>Zc,PseudoClassSelector:()=>tu,PseudoElementSelector:()=>ru,Ratio:()=>ou,Raw:()=>au,Rule:()=>cu,Scope:()=>pu,Selector:()=>fu,SelectorList:()=>hu,String:()=>bu,StyleSheet:()=>wu,SupportsDeclaration:()=>Su,TypeSelector:()=>Eu,UnicodeRange:()=>_u,Url:()=>Ru,Value:()=>Nu,WhiteSpace:()=>Ou});var Ql={};I(Ql,{generate:()=>Ik,name:()=>Mk,parse:()=>Bl,structure:()=>Nk});var Yt=43,pt=45,bs=110,mr=!0,Rk=!1;function xs(e,t){let n=this.tokenStart+e,r=this.charCodeAt(n);for((r===Yt||r===pt)&&(t&&this.error(\"Number sign is not allowed\"),n++);n<this.tokenEnd;n++)ve(this.charCodeAt(n))||this.error(\"Integer is expected\",n)}function ei(e){return xs.call(this,0,e)}function Qn(e,t){if(!this.cmpChar(this.tokenStart+e,t)){let n=\"\";switch(t){case bs:n=\"N is expected\";break;case pt:n=\"HyphenMinus is expected\";break}this.error(n,this.tokenStart+e)}}function zl(){let e=0,t=0,n=this.tokenType;for(;n===13||n===25;)n=this.lookupType(++e);if(n!==10)if(this.isDelim(Yt,e)||this.isDelim(pt,e)){t=this.isDelim(Yt,e)?Yt:pt;do n=this.lookupType(++e);while(n===13||n===25);n!==10&&(this.skip(e),ei.call(this,mr))}else return null;return e>0&&this.skip(e),t===0&&(n=this.charCodeAt(this.tokenStart),n!==Yt&&n!==pt&&this.error(\"Number sign is expected\")),ei.call(this,t!==0),t===pt?\"-\"+this.consume(10):this.consume(10)}var Mk=\"AnPlusB\",Nk={a:[String,null],b:[String,null]};function Bl(){let e=this.tokenStart,t=null,n=null;if(this.tokenType===10)ei.call(this,Rk),n=this.consume(10);else if(this.tokenType===1&&this.cmpChar(this.tokenStart,pt))switch(t=\"-1\",Qn.call(this,1,bs),this.tokenEnd-this.tokenStart){case 2:this.next(),n=zl.call(this);break;case 3:Qn.call(this,2,pt),this.next(),this.skipSC(),ei.call(this,mr),n=\"-\"+this.consume(10);break;default:Qn.call(this,2,pt),xs.call(this,3,mr),this.next(),n=this.substrToCursor(e+2)}else if(this.tokenType===1||this.isDelim(Yt)&&this.lookupType(1)===1){let r=0;switch(t=\"1\",this.isDelim(Yt)&&(r=1,this.next()),Qn.call(this,0,bs),this.tokenEnd-this.tokenStart){case 1:this.next(),n=zl.call(this);break;case 2:Qn.call(this,1,pt),this.next(),this.skipSC(),ei.call(this,mr),n=\"-\"+this.consume(10);break;default:Qn.call(this,1,pt),xs.call(this,2,mr),this.next(),n=this.substrToCursor(e+r+1)}}else if(this.tokenType===12){let r=this.charCodeAt(this.tokenStart),i=r===Yt||r===pt,o=this.tokenStart+i;for(;o<this.tokenEnd&&ve(this.charCodeAt(o));o++);o===this.tokenStart+i&&this.error(\"Integer is expected\",this.tokenStart+i),Qn.call(this,o-this.tokenStart,bs),t=this.substring(e,o),o+1===this.tokenEnd?(this.next(),n=zl.call(this)):(Qn.call(this,o-this.tokenStart+1,pt),o+2===this.tokenEnd?(this.next(),this.skipSC(),ei.call(this,mr),n=\"-\"+this.consume(10)):(xs.call(this,o-this.tokenStart+2,mr),this.next(),n=this.substrToCursor(o+1)))}else this.error();return t!==null&&t.charCodeAt(0)===Yt&&(t=t.substr(1)),n!==null&&n.charCodeAt(0)===Yt&&(n=n.substr(1)),{type:\"AnPlusB\",loc:this.getLocation(e,this.tokenStart),a:t,b:n}}function Ik(e){if(e.a){let t=e.a===\"+1\"&&\"n\"||e.a===\"1\"&&\"n\"||e.a===\"-1\"&&\"-n\"||e.a+\"n\";if(e.b){let n=e.b[0]===\"-\"||e.b[0]===\"+\"?e.b:\"+\"+e.b;this.tokenize(t+n)}else this.tokenize(t)}else this.tokenize(e.b)}var Wl={};I(Wl,{generate:()=>Bk,name:()=>Dk,parse:()=>Hl,structure:()=>zk,walkContext:()=>Fk});function ph(){return this.Raw(this.consumeUntilLeftCurlyBracketOrSemicolon,!0)}function Ok(){for(let e=1,t;t=this.lookupType(e);e++){if(t===24)return!0;if(t===23||t===3)return!1}return!1}var Dk=\"Atrule\",Fk=\"atrule\",zk={name:String,prelude:[\"AtrulePrelude\",\"Raw\",null],block:[\"Block\",null]};function Hl(e=!1){let t=this.tokenStart,n,r,i=null,o=null;switch(this.eat(3),n=this.substrToCursor(t+1),r=n.toLowerCase(),this.skipSC(),this.eof===!1&&this.tokenType!==23&&this.tokenType!==17&&(this.parseAtrulePrelude?i=this.parseWithFallback(this.AtrulePrelude.bind(this,n,e),ph):i=ph.call(this,this.tokenIndex),this.skipSC()),this.tokenType){case 17:this.next();break;case 23:hasOwnProperty.call(this.atrule,r)&&typeof this.atrule[r].block==\"function\"?o=this.atrule[r].block.call(this,e):o=this.Block(Ok.call(this));break}return{type:\"Atrule\",loc:this.getLocation(t,this.tokenStart),name:n,prelude:i,block:o}}function Bk(e){this.token(3,\"@\"+e.name),e.prelude!==null&&this.node(e.prelude),e.block?this.node(e.block):this.token(17,\";\")}var Gl={};I(Gl,{generate:()=>Uk,name:()=>Qk,parse:()=>Ul,structure:()=>Wk,walkContext:()=>Hk});var Qk=\"AtrulePrelude\",Hk=\"atrulePrelude\",Wk={children:[[]]};function Ul(e){let t=null;return e!==null&&(e=e.toLowerCase()),this.skipSC(),hasOwnProperty.call(this.atrule,e)&&typeof this.atrule[e].prelude==\"function\"?t=this.atrule[e].prelude.call(this):t=this.readSequence(this.scope.AtrulePrelude),this.skipSC(),this.eof!==!0&&this.tokenType!==23&&this.tokenType!==17&&this.error(\"Semicolon or block is expected\"),{type:\"AtrulePrelude\",loc:this.getLocationFromList(t),children:t}}function Uk(e){this.children(e)}var $l={};I($l,{generate:()=>Kk,name:()=>Jk,parse:()=>jl,structure:()=>Yk});var Gk=36,dh=42,ws=61,Vk=94,Vl=124,jk=126;function $k(){this.eof&&this.error(\"Unexpected end of input\");let e=this.tokenStart,t=!1;return this.isDelim(dh)?(t=!0,this.next()):this.isDelim(Vl)||this.eat(1),this.isDelim(Vl)?this.charCodeAt(this.tokenStart+1)!==ws?(this.next(),this.eat(1)):t&&this.error(\"Identifier is expected\",this.tokenEnd):t&&this.error(\"Vertical line is expected\"),{type:\"Identifier\",loc:this.getLocation(e,this.tokenStart),name:this.substrToCursor(e)}}function qk(){let e=this.tokenStart,t=this.charCodeAt(e);return t!==ws&&t!==jk&&t!==Vk&&t!==Gk&&t!==dh&&t!==Vl&&this.error(\"Attribute selector (=, ~=, ^=, $=, *=, |=) is expected\"),this.next(),t!==ws&&(this.isDelim(ws)||this.error(\"Equal sign is expected\"),this.next()),this.substrToCursor(e)}var Jk=\"AttributeSelector\",Yk={name:\"Identifier\",matcher:[String,null],value:[\"String\",\"Identifier\",null],flags:[String,null]};function jl(){let e=this.tokenStart,t,n=null,r=null,i=null;return this.eat(19),this.skipSC(),t=$k.call(this),this.skipSC(),this.tokenType!==20&&(this.tokenType!==1&&(n=qk.call(this),this.skipSC(),r=this.tokenType===5?this.String():this.Identifier(),this.skipSC()),this.tokenType===1&&(i=this.consume(1),this.skipSC())),this.eat(20),{type:\"AttributeSelector\",loc:this.getLocation(e,this.tokenStart),name:t,matcher:n,value:r,flags:i}}function Kk(e){this.token(9,\"[\"),this.node(e.name),e.matcher!==null&&(this.tokenize(e.matcher),this.node(e.value)),e.flags!==null&&this.token(1,e.flags),this.token(9,\"]\")}var Jl={};I(Jl,{generate:()=>rS,name:()=>eS,parse:()=>ql,structure:()=>nS,walkContext:()=>tS});var Xk=38;function hh(){return this.Raw(null,!0)}function fh(){return this.parseWithFallback(this.Rule,hh)}function mh(){return this.Raw(this.consumeUntilSemicolonIncluded,!0)}function Zk(){if(this.tokenType===17)return mh.call(this,this.tokenIndex);let e=this.parseWithFallback(this.Declaration,mh);return this.tokenType===17&&this.next(),e}var eS=\"Block\",tS=\"block\",nS={children:[[\"Atrule\",\"Rule\",\"Declaration\"]]};function ql(e){let t=e?Zk:fh,n=this.tokenStart,r=this.createList();this.eat(23);e:for(;!this.eof;)switch(this.tokenType){case 24:break e;case 13:case 25:this.next();break;case 3:r.push(this.parseWithFallback(this.Atrule.bind(this,e),hh));break;default:e&&this.isDelim(Xk)?r.push(fh.call(this)):r.push(t.call(this))}return this.eof||this.eat(24),{type:\"Block\",loc:this.getLocation(n,this.tokenStart),children:r}}function rS(e){this.token(23,\"{\"),this.children(e,t=>{t.type===\"Declaration\"&&this.token(17,\";\")}),this.token(24,\"}\")}var Kl={};I(Kl,{generate:()=>sS,name:()=>iS,parse:()=>Yl,structure:()=>oS});var iS=\"Brackets\",oS={children:[[]]};function Yl(e,t){let n=this.tokenStart,r=null;return this.eat(19),r=e.call(this,t),this.eof||this.eat(20),{type:\"Brackets\",loc:this.getLocation(n,this.tokenStart),children:r}}function sS(e){this.token(9,\"[\"),this.children(e),this.token(9,\"]\")}var Zl={};I(Zl,{generate:()=>cS,name:()=>aS,parse:()=>Xl,structure:()=>lS});var aS=\"CDC\",lS=[];function Xl(){let e=this.tokenStart;return this.eat(15),{type:\"CDC\",loc:this.getLocation(e,this.tokenStart)}}function cS(){this.token(15,\"-->\")}var tc={};I(tc,{generate:()=>dS,name:()=>uS,parse:()=>ec,structure:()=>pS});var uS=\"CDO\",pS=[];function ec(){let e=this.tokenStart;return this.eat(14),{type:\"CDO\",loc:this.getLocation(e,this.tokenStart)}}function dS(){this.token(14,\"<!--\")}var rc={};I(rc,{generate:()=>gS,name:()=>mS,parse:()=>nc,structure:()=>hS});var fS=46,mS=\"ClassSelector\",hS={name:String};function nc(){return this.eatDelim(fS),{type:\"ClassSelector\",loc:this.getLocation(this.tokenStart-1,this.tokenEnd),name:this.consume(1)}}function gS(e){this.token(9,\".\"),this.token(1,e.name)}var oc={};I(oc,{generate:()=>SS,name:()=>wS,parse:()=>ic,structure:()=>kS});var yS=43,gh=47,bS=62,xS=126,wS=\"Combinator\",kS={name:String};function ic(){let e=this.tokenStart,t;switch(this.tokenType){case 13:t=\" \";break;case 9:switch(this.charCodeAt(this.tokenStart)){case bS:case yS:case xS:this.next();break;case gh:this.next(),this.eatIdent(\"deep\"),this.eatDelim(gh);break;default:this.error(\"Combinator is expected\")}t=this.substrToCursor(e);break}return{type:\"Combinator\",loc:this.getLocation(e,this.tokenStart),name:t}}function SS(e){this.tokenize(e.name)}var ac={};I(ac,{generate:()=>AS,name:()=>ES,parse:()=>sc,structure:()=>CS});var vS=42,TS=47,ES=\"Comment\",CS={value:String};function sc(){let e=this.tokenStart,t=this.tokenEnd;return this.eat(25),t-e+2>=2&&this.charCodeAt(t-2)===vS&&this.charCodeAt(t-1)===TS&&(t-=2),{type:\"Comment\",loc:this.getLocation(e,this.tokenStart),value:this.substring(e+2,t)}}function AS(e){this.token(25,\"/*\"+e.value+\"*/\")}var cc={};I(cc,{generate:()=>MS,name:()=>LS,parse:()=>lc,structure:()=>PS});var _S=new Set([16,22,0]),LS=\"Condition\",PS={kind:String,children:[[\"Identifier\",\"Feature\",\"FeatureFunction\",\"FeatureRange\",\"SupportsDeclaration\"]]};function yh(e){return this.lookupTypeNonSC(1)===1&&_S.has(this.lookupTypeNonSC(2))?this.Feature(e):this.FeatureRange(e)}var RS={media:yh,container:yh,supports(){return this.SupportsDeclaration()}};function lc(e=\"media\"){let t=this.createList();e:for(;!this.eof;)switch(this.tokenType){case 25:case 13:this.next();continue;case 1:t.push(this.Identifier());break;case 21:{let n=this.parseWithFallback(()=>RS[e].call(this,e),()=>null);n||(n=this.parseWithFallback(()=>{this.eat(21);let r=this.Condition(e);return this.eat(22),r},()=>this.GeneralEnclosed(e))),t.push(n);break}case 2:{let n=this.parseWithFallback(()=>this.FeatureFunction(e),()=>null);n||(n=this.GeneralEnclosed(e)),t.push(n);break}default:break e}return t.isEmpty&&this.error(\"Condition is expected\"),{type:\"Condition\",loc:this.getLocationFromList(t),kind:e,children:t}}function MS(e){e.children.forEach(t=>{t.type===\"Condition\"?(this.token(21,\"(\"),this.node(t),this.token(22,\")\")):this.node(t)})}var pc={};I(pc,{generate:()=>GS,name:()=>HS,parse:()=>uc,structure:()=>US,walkContext:()=>WS});var xh=33,NS=35,IS=36,OS=38,DS=42,FS=43,bh=47;function zS(){return this.Raw(this.consumeUntilExclamationMarkOrSemicolon,!0)}function BS(){return this.Raw(this.consumeUntilExclamationMarkOrSemicolon,!1)}function QS(){let e=this.tokenIndex,t=this.Value();return t.type!==\"Raw\"&&this.eof===!1&&this.tokenType!==17&&this.isDelim(xh)===!1&&this.isBalanceEdge(e)===!1&&this.error(),t}var HS=\"Declaration\",WS=\"declaration\",US={important:[Boolean,String],property:String,value:[\"Value\",\"Raw\"]};function uc(){let e=this.tokenStart,t=this.tokenIndex,n=VS.call(this),r=ls(n),i=r?this.parseCustomProperty:this.parseValue,o=r?BS:zS,s=!1,l;this.skipSC(),this.eat(16);let c=this.tokenIndex;if(r||this.skipSC(),i?l=this.parseWithFallback(QS,o):l=o.call(this,this.tokenIndex),r&&l.type===\"Value\"&&l.children.isEmpty){for(let p=c-this.tokenIndex;p<=0;p++)if(this.lookupType(p)===13){l.children.appendData({type:\"WhiteSpace\",loc:null,value:\" \"});break}}return this.isDelim(xh)&&(s=jS.call(this),this.skipSC()),this.eof===!1&&this.tokenType!==17&&this.isBalanceEdge(t)===!1&&this.error(),{type:\"Declaration\",loc:this.getLocation(e,this.tokenStart),important:s,property:n,value:l}}function GS(e){this.token(1,e.property),this.token(16,\":\"),this.node(e.value),e.important&&(this.token(9,\"!\"),this.token(1,e.important===!0?\"important\":e.important))}function VS(){let e=this.tokenStart;if(this.tokenType===9)switch(this.charCodeAt(this.tokenStart)){case DS:case IS:case FS:case NS:case OS:this.next();break;case bh:this.next(),this.isDelim(bh)&&this.next();break}return this.tokenType===4?this.eat(4):this.eat(1),this.substrToCursor(e)}function jS(){this.eat(9),this.skipSC();let e=this.consume(1);return e===\"important\"?!0:e}var mc={};I(mc,{generate:()=>YS,name:()=>qS,parse:()=>fc,structure:()=>JS});var $S=38;function dc(){return this.Raw(this.consumeUntilSemicolonIncluded,!0)}var qS=\"DeclarationList\",JS={children:[[\"Declaration\",\"Atrule\",\"Rule\"]]};function fc(){let e=this.createList();for(;!this.eof;)switch(this.tokenType){case 13:case 25:case 17:this.next();break;case 3:e.push(this.parseWithFallback(this.Atrule.bind(this,!0),dc));break;default:this.isDelim($S)?e.push(this.parseWithFallback(this.Rule,dc)):e.push(this.parseWithFallback(this.Declaration,dc))}return{type:\"DeclarationList\",loc:this.getLocationFromList(e),children:e}}function YS(e){this.children(e,t=>{t.type===\"Declaration\"&&this.token(17,\";\")})}var gc={};I(gc,{generate:()=>ZS,name:()=>KS,parse:()=>hc,structure:()=>XS});var KS=\"Dimension\",XS={value:String,unit:String};function hc(){let e=this.tokenStart,t=this.consumeNumber(12);return{type:\"Dimension\",loc:this.getLocation(e,this.tokenStart),value:t,unit:this.substring(e+t.length,this.tokenStart)}}function ZS(e){this.token(12,e.value+e.unit)}var bc={};I(bc,{generate:()=>rv,name:()=>tv,parse:()=>yc,structure:()=>nv});var ev=47,tv=\"Feature\",nv={kind:String,name:String,value:[\"Identifier\",\"Number\",\"Dimension\",\"Ratio\",\"Function\",null]};function yc(e){let t=this.tokenStart,n,r=null;if(this.eat(21),this.skipSC(),n=this.consume(1),this.skipSC(),this.tokenType!==22){switch(this.eat(16),this.skipSC(),this.tokenType){case 10:this.lookupNonWSType(1)===9?r=this.Ratio():r=this.Number();break;case 12:r=this.Dimension();break;case 1:r=this.Identifier();break;case 2:r=this.parseWithFallback(()=>{let i=this.Function(this.readSequence,this.scope.Value);return this.skipSC(),this.isDelim(ev)&&this.error(),i},()=>this.Ratio());break;default:this.error(\"Number, dimension, ratio or identifier is expected\")}this.skipSC()}return this.eof||this.eat(22),{type:\"Feature\",loc:this.getLocation(t,this.tokenStart),kind:e,name:n,value:r}}function rv(e){this.token(21,\"(\"),this.token(1,e.name),e.value!==null&&(this.token(16,\":\"),this.node(e.value)),this.token(22,\")\")}var wc={};I(wc,{generate:()=>av,name:()=>iv,parse:()=>xc,structure:()=>ov});var iv=\"FeatureFunction\",ov={kind:String,feature:String,value:[\"Declaration\",\"Selector\"]};function sv(e,t){let r=(this.features[e]||{})[t];return typeof r!=\"function\"&&this.error(`Unknown feature ${t}()`),r}function xc(e=\"unknown\"){let t=this.tokenStart,n=this.consumeFunctionName(),r=sv.call(this,e,n.toLowerCase());this.skipSC();let i=this.parseWithFallback(()=>{let o=this.tokenIndex,s=r.call(this);return this.eof===!1&&this.isBalanceEdge(o)===!1&&this.error(),s},()=>this.Raw(null,!1));return this.eof||this.eat(22),{type:\"FeatureFunction\",loc:this.getLocation(t,this.tokenStart),kind:e,feature:n,value:i}}function av(e){this.token(2,e.feature+\"(\"),this.node(e.value),this.token(22,\")\")}var vc={};I(vc,{generate:()=>dv,name:()=>uv,parse:()=>Sc,structure:()=>pv});var wh=47,lv=60,kh=61,cv=62,uv=\"FeatureRange\",pv={kind:String,left:[\"Identifier\",\"Number\",\"Dimension\",\"Ratio\",\"Function\"],leftComparison:String,middle:[\"Identifier\",\"Number\",\"Dimension\",\"Ratio\",\"Function\"],rightComparison:[String,null],right:[\"Identifier\",\"Number\",\"Dimension\",\"Ratio\",\"Function\",null]};function kc(){switch(this.skipSC(),this.tokenType){case 10:return this.isDelim(wh,this.lookupOffsetNonSC(1))?this.Ratio():this.Number();case 12:return this.Dimension();case 1:return this.Identifier();case 2:return this.parseWithFallback(()=>{let e=this.Function(this.readSequence,this.scope.Value);return this.skipSC(),this.isDelim(wh)&&this.error(),e},()=>this.Ratio());default:this.error(\"Number, dimension, ratio or identifier is expected\")}}function Sh(e){if(this.skipSC(),this.isDelim(lv)||this.isDelim(cv)){let t=this.source[this.tokenStart];return this.next(),this.isDelim(kh)?(this.next(),t+\"=\"):t}if(this.isDelim(kh))return\"=\";this.error(`Expected ${e?'\":\", ':\"\"}\"<\", \">\", \"=\" or \")\"`)}function Sc(e=\"unknown\"){let t=this.tokenStart;this.skipSC(),this.eat(21);let n=kc.call(this),r=Sh.call(this,n.type===\"Identifier\"),i=kc.call(this),o=null,s=null;return this.lookupNonWSType(0)!==22&&(o=Sh.call(this),s=kc.call(this)),this.skipSC(),this.eat(22),{type:\"FeatureRange\",loc:this.getLocation(t,this.tokenStart),kind:e,left:n,leftComparison:r,middle:i,rightComparison:o,right:s}}function dv(e){this.token(21,\"(\"),this.node(e.left),this.tokenize(e.leftComparison),this.node(e.middle),e.right&&(this.tokenize(e.rightComparison),this.node(e.right)),this.token(22,\")\")}var Ec={};I(Ec,{generate:()=>gv,name:()=>fv,parse:()=>Tc,structure:()=>hv,walkContext:()=>mv});var fv=\"Function\",mv=\"function\",hv={name:String,children:[[]]};function Tc(e,t){let n=this.tokenStart,r=this.consumeFunctionName(),i=r.toLowerCase(),o;return o=t.hasOwnProperty(i)?t[i].call(this,t):e.call(this,t),this.eof||this.eat(22),{type:\"Function\",loc:this.getLocation(n,this.tokenStart),name:r,children:o}}function gv(e){this.token(2,e.name+\"(\"),this.children(e),this.token(22,\")\")}var Ac={};I(Ac,{generate:()=>xv,name:()=>yv,parse:()=>Cc,structure:()=>bv});var yv=\"GeneralEnclosed\",bv={kind:String,function:[String,null],children:[[]]};function Cc(e){let t=this.tokenStart,n=null;this.tokenType===2?n=this.consumeFunctionName():this.eat(21);let r=this.parseWithFallback(()=>{let i=this.tokenIndex,o=this.readSequence(this.scope.Value);return this.eof===!1&&this.isBalanceEdge(i)===!1&&this.error(),o},()=>this.createSingleNodeList(this.Raw(null,!1)));return this.eof||this.eat(22),{type:\"GeneralEnclosed\",loc:this.getLocation(t,this.tokenStart),kind:e,function:n,children:r}}function xv(e){e.function?this.token(2,e.function+\"(\"):this.token(21,\"(\"),this.children(e),this.token(22,\")\")}var Lc={};I(Lc,{generate:()=>vv,name:()=>kv,parse:()=>_c,structure:()=>Sv,xxx:()=>wv});var wv=\"XXX\",kv=\"Hash\",Sv={value:String};function _c(){let e=this.tokenStart;return this.eat(4),{type:\"Hash\",loc:this.getLocation(e,this.tokenStart),value:this.substrToCursor(e+1)}}function vv(e){this.token(4,\"#\"+e.value)}var Rc={};I(Rc,{generate:()=>Cv,name:()=>Tv,parse:()=>Pc,structure:()=>Ev});var Tv=\"Identifier\",Ev={name:String};function Pc(){return{type:\"Identifier\",loc:this.getLocation(this.tokenStart,this.tokenEnd),name:this.consume(1)}}function Cv(e){this.token(1,e.name)}var Nc={};I(Nc,{generate:()=>Lv,name:()=>Av,parse:()=>Mc,structure:()=>_v});var Av=\"IdSelector\",_v={name:String};function Mc(){let e=this.tokenStart;return this.eat(4),{type:\"IdSelector\",loc:this.getLocation(e,this.tokenStart),name:this.substrToCursor(e+1)}}function Lv(e){this.token(9,\"#\"+e.name)}var Oc={};I(Oc,{generate:()=>Nv,name:()=>Rv,parse:()=>Ic,structure:()=>Mv});var Pv=46,Rv=\"Layer\",Mv={name:String};function Ic(){let e=this.tokenStart,t=this.consume(1);for(;this.isDelim(Pv);)this.eat(9),t+=\".\"+this.consume(1);return{type:\"Layer\",loc:this.getLocation(e,this.tokenStart),name:t}}function Nv(e){this.tokenize(e.name)}var Fc={};I(Fc,{generate:()=>Dv,name:()=>Iv,parse:()=>Dc,structure:()=>Ov});var Iv=\"LayerList\",Ov={children:[[\"Layer\"]]};function Dc(){let e=this.createList();for(this.skipSC();!this.eof&&(e.push(this.Layer()),this.lookupTypeNonSC(0)===18);)this.skipSC(),this.next(),this.skipSC();return{type:\"LayerList\",loc:this.getLocationFromList(e),children:e}}function Dv(e){this.children(e,()=>this.token(18,\",\"))}var Bc={};I(Bc,{generate:()=>Bv,name:()=>Fv,parse:()=>zc,structure:()=>zv});var Fv=\"MediaQuery\",zv={modifier:[String,null],mediaType:[String,null],condition:[\"Condition\",null]};function zc(){let e=this.tokenStart,t=null,n=null,r=null;if(this.skipSC(),this.tokenType===1&&this.lookupTypeNonSC(1)!==21){let i=this.consume(1),o=i.toLowerCase();switch(o===\"not\"||o===\"only\"?(this.skipSC(),t=o,n=this.consume(1)):n=i,this.lookupTypeNonSC(0)){case 1:{this.skipSC(),this.eatIdent(\"and\"),r=this.Condition(\"media\");break}case 23:case 17:case 18:case 0:break;default:this.error(\"Identifier or parenthesis is expected\")}}else switch(this.tokenType){case 1:case 21:case 2:{r=this.Condition(\"media\");break}case 23:case 17:case 0:break;default:this.error(\"Identifier or parenthesis is expected\")}return{type:\"MediaQuery\",loc:this.getLocation(e,this.tokenStart),modifier:t,mediaType:n,condition:r}}function Bv(e){e.mediaType?(e.modifier&&this.token(1,e.modifier),this.token(1,e.mediaType),e.condition&&(this.token(1,\"and\"),this.node(e.condition))):e.condition&&this.node(e.condition)}var Hc={};I(Hc,{generate:()=>Wv,name:()=>Qv,parse:()=>Qc,structure:()=>Hv});var Qv=\"MediaQueryList\",Hv={children:[[\"MediaQuery\"]]};function Qc(){let e=this.createList();for(this.skipSC();!this.eof&&(e.push(this.MediaQuery()),this.tokenType===18);)this.next();return{type:\"MediaQueryList\",loc:this.getLocationFromList(e),children:e}}function Wv(e){this.children(e,()=>this.token(18,\",\"))}var Uc={};I(Uc,{generate:()=>jv,name:()=>Gv,parse:()=>Wc,structure:()=>Vv});var Uv=38,Gv=\"NestingSelector\",Vv={};function Wc(){let e=this.tokenStart;return this.eatDelim(Uv),{type:\"NestingSelector\",loc:this.getLocation(e,this.tokenStart)}}function jv(){this.token(9,\"&\")}var Vc={};I(Vc,{generate:()=>Jv,name:()=>$v,parse:()=>Gc,structure:()=>qv});var $v=\"Nth\",qv={nth:[\"AnPlusB\",\"Identifier\"],selector:[\"SelectorList\",null]};function Gc(){this.skipSC();let e=this.tokenStart,t=e,n=null,r;return this.lookupValue(0,\"odd\")||this.lookupValue(0,\"even\")?r=this.Identifier():r=this.AnPlusB(),t=this.tokenStart,this.skipSC(),this.lookupValue(0,\"of\")&&(this.next(),n=this.SelectorList(),t=this.tokenStart),{type:\"Nth\",loc:this.getLocation(e,t),nth:r,selector:n}}function Jv(e){this.node(e.nth),e.selector!==null&&(this.token(1,\"of\"),this.node(e.selector))}var $c={};I($c,{generate:()=>Xv,name:()=>Yv,parse:()=>jc,structure:()=>Kv});var Yv=\"Number\",Kv={value:String};function jc(){return{type:\"Number\",loc:this.getLocation(this.tokenStart,this.tokenEnd),value:this.consume(10)}}function Xv(e){this.token(10,e.value)}var Jc={};I(Jc,{generate:()=>t0,name:()=>Zv,parse:()=>qc,structure:()=>e0});var Zv=\"Operator\",e0={value:String};function qc(){let e=this.tokenStart;return this.next(),{type:\"Operator\",loc:this.getLocation(e,this.tokenStart),value:this.substrToCursor(e)}}function t0(e){this.tokenize(e.value)}var Kc={};I(Kc,{generate:()=>i0,name:()=>n0,parse:()=>Yc,structure:()=>r0});var n0=\"Parentheses\",r0={children:[[]]};function Yc(e,t){let n=this.tokenStart,r=null;return this.eat(21),r=e.call(this,t),this.eof||this.eat(22),{type:\"Parentheses\",loc:this.getLocation(n,this.tokenStart),children:r}}function i0(e){this.token(21,\"(\"),this.children(e),this.token(22,\")\")}var Zc={};I(Zc,{generate:()=>a0,name:()=>o0,parse:()=>Xc,structure:()=>s0});var o0=\"Percentage\",s0={value:String};function Xc(){return{type:\"Percentage\",loc:this.getLocation(this.tokenStart,this.tokenEnd),value:this.consumeNumber(11)}}function a0(e){this.token(11,e.value+\"%\")}var tu={};I(tu,{generate:()=>p0,name:()=>l0,parse:()=>eu,structure:()=>u0,walkContext:()=>c0});var l0=\"PseudoClassSelector\",c0=\"function\",u0={name:String,children:[[\"Raw\"],null]};function eu(){let e=this.tokenStart,t=null,n,r;return this.eat(16),this.tokenType===2?(n=this.consumeFunctionName(),r=n.toLowerCase(),this.lookupNonWSType(0)==22?t=this.createList():hasOwnProperty.call(this.pseudo,r)?(this.skipSC(),t=this.pseudo[r].call(this),this.skipSC()):(t=this.createList(),t.push(this.Raw(null,!1))),this.eat(22)):n=this.consume(1),{type:\"PseudoClassSelector\",loc:this.getLocation(e,this.tokenStart),name:n,children:t}}function p0(e){this.token(16,\":\"),e.children===null?this.token(1,e.name):(this.token(2,e.name+\"(\"),this.children(e),this.token(22,\")\"))}var ru={};I(ru,{generate:()=>h0,name:()=>d0,parse:()=>nu,structure:()=>m0,walkContext:()=>f0});var d0=\"PseudoElementSelector\",f0=\"function\",m0={name:String,children:[[\"Raw\"],null]};function nu(){let e=this.tokenStart,t=null,n,r;return this.eat(16),this.eat(16),this.tokenType===2?(n=this.consumeFunctionName(),r=n.toLowerCase(),this.lookupNonWSType(0)==22?t=this.createList():hasOwnProperty.call(this.pseudo,r)?(this.skipSC(),t=this.pseudo[r].call(this),this.skipSC()):(t=this.createList(),t.push(this.Raw(null,!1))),this.eat(22)):n=this.consume(1),{type:\"PseudoElementSelector\",loc:this.getLocation(e,this.tokenStart),name:n,children:t}}function h0(e){this.token(16,\":\"),this.token(16,\":\"),e.children===null?this.token(1,e.name):(this.token(2,e.name+\"(\"),this.children(e),this.token(22,\")\"))}var ou={};I(ou,{generate:()=>b0,name:()=>g0,parse:()=>iu,structure:()=>y0});var vh=47;function Th(){switch(this.skipSC(),this.tokenType){case 10:return this.Number();case 2:return this.Function(this.readSequence,this.scope.Value);default:this.error(\"Number of function is expected\")}}var g0=\"Ratio\",y0={left:[\"Number\",\"Function\"],right:[\"Number\",\"Function\",null]};function iu(){let e=this.tokenStart,t=Th.call(this),n=null;return this.skipSC(),this.isDelim(vh)&&(this.eatDelim(vh),n=Th.call(this)),{type:\"Ratio\",loc:this.getLocation(e,this.tokenStart),left:t,right:n}}function b0(e){this.node(e.left),this.token(9,\"/\"),e.right?this.node(e.right):this.node(10,1)}var au={};I(au,{generate:()=>S0,name:()=>w0,parse:()=>su,structure:()=>k0});function x0(){return this.tokenIndex>0&&this.lookupType(-1)===13?this.tokenIndex>1?this.getTokenStart(this.tokenIndex-1):this.firstCharOffset:this.tokenStart}var w0=\"Raw\",k0={value:String};function su(e,t){let n=this.getTokenStart(this.tokenIndex),r;return this.skipUntilBalanced(this.tokenIndex,e||this.consumeUntilBalanceEnd),t&&this.tokenStart>n?r=x0.call(this):r=this.tokenStart,{type:\"Raw\",loc:this.getLocation(n,r),value:this.substring(n,r)}}function S0(e){this.tokenize(e.value)}var cu={};I(cu,{generate:()=>A0,name:()=>T0,parse:()=>lu,structure:()=>C0,walkContext:()=>E0});function Eh(){return this.Raw(this.consumeUntilLeftCurlyBracket,!0)}function v0(){let e=this.SelectorList();return e.type!==\"Raw\"&&this.eof===!1&&this.tokenType!==23&&this.error(),e}var T0=\"Rule\",E0=\"rule\",C0={prelude:[\"SelectorList\",\"Raw\"],block:[\"Block\"]};function lu(){let e=this.tokenIndex,t=this.tokenStart,n,r;return this.parseRulePrelude?n=this.parseWithFallback(v0,Eh):n=Eh.call(this,e),r=this.Block(!0),{type:\"Rule\",loc:this.getLocation(t,this.tokenStart),prelude:n,block:r}}function A0(e){this.node(e.prelude),this.node(e.block)}var pu={};I(pu,{generate:()=>P0,name:()=>_0,parse:()=>uu,structure:()=>L0});var _0=\"Scope\",L0={root:[\"SelectorList\",\"Raw\",null],limit:[\"SelectorList\",\"Raw\",null]};function uu(){let e=null,t=null;this.skipSC();let n=this.tokenStart;return this.tokenType===21&&(this.next(),this.skipSC(),e=this.parseWithFallback(this.SelectorList,()=>this.Raw(!1,!0)),this.skipSC(),this.eat(22)),this.lookupNonWSType(0)===1&&(this.skipSC(),this.eatIdent(\"to\"),this.skipSC(),this.eat(21),this.skipSC(),t=this.parseWithFallback(this.SelectorList,()=>this.Raw(!1,!0)),this.skipSC(),this.eat(22)),{type:\"Scope\",loc:this.getLocation(n,this.tokenStart),root:e,limit:t}}function P0(e){e.root&&(this.token(21,\"(\"),this.node(e.root),this.token(22,\")\")),e.limit&&(this.token(1,\"to\"),this.token(21,\"(\"),this.node(e.limit),this.token(22,\")\"))}var fu={};I(fu,{generate:()=>N0,name:()=>R0,parse:()=>du,structure:()=>M0});var R0=\"Selector\",M0={children:[[\"TypeSelector\",\"IdSelector\",\"ClassSelector\",\"AttributeSelector\",\"PseudoClassSelector\",\"PseudoElementSelector\",\"Combinator\"]]};function du(){let e=this.readSequence(this.scope.Selector);return this.getFirstListNode(e)===null&&this.error(\"Selector is expected\"),{type:\"Selector\",loc:this.getLocationFromList(e),children:e}}function N0(e){this.children(e)}var hu={};I(hu,{generate:()=>F0,name:()=>I0,parse:()=>mu,structure:()=>D0,walkContext:()=>O0});var I0=\"SelectorList\",O0=\"selector\",D0={children:[[\"Selector\",\"Raw\"]]};function mu(){let e=this.createList();for(;!this.eof;){if(e.push(this.Selector()),this.tokenType===18){this.next();continue}break}return{type:\"SelectorList\",loc:this.getLocationFromList(e),children:e}}function F0(e){this.children(e,()=>this.token(18,\",\"))}var bu={};I(bu,{generate:()=>Q0,name:()=>z0,parse:()=>yu,structure:()=>B0});var gu=92,Ch=34,Ah=39;function ks(e){let t=e.length,n=e.charCodeAt(0),r=n===Ch||n===Ah?1:0,i=r===1&&t>1&&e.charCodeAt(t-1)===n?t-2:t-1,o=\"\";for(let s=r;s<=i;s++){let l=e.charCodeAt(s);if(l===gu){if(s===i){s!==t-1&&(o=e.substr(s+1));break}if(l=e.charCodeAt(++s),nt(gu,l)){let c=s-1,p=mn(e,c);s=p-1,o+=qo(e.substring(c+1,p))}else l===13&&e.charCodeAt(s+1)===10&&s++}else o+=e[s]}return o}function _h(e,t){let n=t?\"'\":'\"',r=t?Ah:Ch,i=\"\",o=!1;for(let s=0;s<e.length;s++){let l=e.charCodeAt(s);if(l===0){i+=\"\\uFFFD\";continue}if(l<=31||l===127){i+=\"\\\\\"+l.toString(16),o=!0;continue}l===r||l===gu?(i+=\"\\\\\"+e.charAt(s),o=!1):(o&&(rt(l)||qt(l))&&(i+=\" \"),i+=e.charAt(s),o=!1)}return n+i+n}var z0=\"String\",B0={value:String};function yu(){return{type:\"String\",loc:this.getLocation(this.tokenStart,this.tokenEnd),value:ks(this.consume(5))}}function Q0(e){this.token(5,_h(e.value))}var wu={};I(wu,{generate:()=>V0,name:()=>W0,parse:()=>xu,structure:()=>G0,walkContext:()=>U0});var H0=33;function Ph(){return this.Raw(null,!1)}var W0=\"StyleSheet\",U0=\"stylesheet\",G0={children:[[\"Comment\",\"CDO\",\"CDC\",\"Atrule\",\"Rule\",\"Raw\"]]};function xu(){let e=this.tokenStart,t=this.createList(),n;for(;!this.eof;){switch(this.tokenType){case 13:this.next();continue;case 25:if(this.charCodeAt(this.tokenStart+2)!==H0){this.next();continue}n=this.Comment();break;case 14:n=this.CDO();break;case 15:n=this.CDC();break;case 3:n=this.parseWithFallback(this.Atrule,Ph);break;default:n=this.parseWithFallback(this.Rule,Ph)}t.push(n)}return{type:\"StyleSheet\",loc:this.getLocation(e,this.tokenStart),children:t}}function V0(e){this.children(e)}var Su={};I(Su,{generate:()=>q0,name:()=>j0,parse:()=>ku,structure:()=>$0});var j0=\"SupportsDeclaration\",$0={declaration:\"Declaration\"};function ku(){let e=this.tokenStart;this.eat(21),this.skipSC();let t=this.Declaration();return this.eof||this.eat(22),{type:\"SupportsDeclaration\",loc:this.getLocation(e,this.tokenStart),declaration:t}}function q0(e){this.token(21,\"(\"),this.node(e.declaration),this.token(22,\")\")}var Eu={};I(Eu,{generate:()=>X0,name:()=>Y0,parse:()=>Tu,structure:()=>K0});var J0=42,Rh=124;function vu(){this.tokenType!==1&&this.isDelim(J0)===!1&&this.error(\"Identifier or asterisk is expected\"),this.next()}var Y0=\"TypeSelector\",K0={name:String};function Tu(){let e=this.tokenStart;return this.isDelim(Rh)?(this.next(),vu.call(this)):(vu.call(this),this.isDelim(Rh)&&(this.next(),vu.call(this))),{type:\"TypeSelector\",loc:this.getLocation(e,this.tokenStart),name:this.substrToCursor(e)}}function X0(e){this.tokenize(e.name)}var _u={};I(_u,{generate:()=>rT,name:()=>tT,parse:()=>Au,structure:()=>nT});var Mh=43,Nh=45,Cu=63;function Gi(e,t){let n=0;for(let r=this.tokenStart+e;r<this.tokenEnd;r++){let i=this.charCodeAt(r);if(i===Nh&&t&&n!==0)return Gi.call(this,e+n+1,!1),-1;rt(i)||this.error(t&&n!==0?\"Hyphen minus\"+(n<6?\" or hex digit\":\"\")+\" is expected\":n<6?\"Hex digit is expected\":\"Unexpected input\",r),++n>6&&this.error(\"Too many hex digits\",r)}return this.next(),n}function Ss(e){let t=0;for(;this.isDelim(Cu);)++t>e&&this.error(\"Too many question marks\"),this.next()}function Z0(e){this.charCodeAt(this.tokenStart)!==e&&this.error((e===Mh?\"Plus sign\":\"Hyphen minus\")+\" is expected\")}function eT(){let e=0;switch(this.tokenType){case 10:if(e=Gi.call(this,1,!0),this.isDelim(Cu)){Ss.call(this,6-e);break}if(this.tokenType===12||this.tokenType===10){Z0.call(this,Nh),Gi.call(this,1,!1);break}break;case 12:e=Gi.call(this,1,!0),e>0&&Ss.call(this,6-e);break;default:if(this.eatDelim(Mh),this.tokenType===1){e=Gi.call(this,0,!0),e>0&&Ss.call(this,6-e);break}if(this.isDelim(Cu)){this.next(),Ss.call(this,5);break}this.error(\"Hex digit or question mark is expected\")}}var tT=\"UnicodeRange\",nT={value:String};function Au(){let e=this.tokenStart;return this.eatIdent(\"u\"),eT.call(this),{type:\"UnicodeRange\",loc:this.getLocation(e,this.tokenStart),value:this.substrToCursor(e)}}function rT(e){this.tokenize(e.value)}var Ru={};I(Ru,{generate:()=>uT,name:()=>lT,parse:()=>Pu,structure:()=>cT});var iT=32,Lu=92,oT=34,sT=39,aT=40,Ih=41;function Oh(e){let t=e.length,n=4,r=e.charCodeAt(t-1)===Ih?t-2:t-1,i=\"\";for(;n<r&&qt(e.charCodeAt(n));)n++;for(;n<r&&qt(e.charCodeAt(r));)r--;for(let o=n;o<=r;o++){let s=e.charCodeAt(o);if(s===Lu){if(o===r){o!==t-1&&(i=e.substr(o+1));break}if(s=e.charCodeAt(++o),nt(Lu,s)){let l=o-1,c=mn(e,l);o=c-1,i+=qo(e.substring(l+1,c))}else s===13&&e.charCodeAt(o+1)===10&&o++}else i+=e[o]}return i}function Dh(e){let t=\"\",n=!1;for(let r=0;r<e.length;r++){let i=e.charCodeAt(r);if(i===0){t+=\"\\uFFFD\";continue}if(i<=31||i===127){t+=\"\\\\\"+i.toString(16),n=!0;continue}i===iT||i===Lu||i===oT||i===sT||i===aT||i===Ih?(t+=\"\\\\\"+e.charAt(r),n=!1):(n&&rt(i)&&(t+=\" \"),t+=e.charAt(r),n=!1)}return\"url(\"+t+\")\"}var lT=\"Url\",cT={value:String};function Pu(){let e=this.tokenStart,t;switch(this.tokenType){case 7:t=Oh(this.consume(7));break;case 2:this.cmpStr(this.tokenStart,this.tokenEnd,\"url(\")||this.error(\"Function name must be `url`\"),this.eat(2),this.skipSC(),t=ks(this.consume(5)),this.skipSC(),this.eof||this.eat(22);break;default:this.error(\"Url or Function is expected\")}return{type:\"Url\",loc:this.getLocation(e,this.tokenStart),value:t}}function uT(e){this.token(7,Dh(e.value))}var Nu={};I(Nu,{generate:()=>fT,name:()=>pT,parse:()=>Mu,structure:()=>dT});var pT=\"Value\",dT={children:[[]]};function Mu(){let e=this.tokenStart,t=this.readSequence(this.scope.Value);return{type:\"Value\",loc:this.getLocation(e,this.tokenStart),children:t}}function fT(e){this.children(e)}var Ou={};I(Ou,{generate:()=>yT,name:()=>hT,parse:()=>Iu,structure:()=>gT});var mT=Object.freeze({type:\"WhiteSpace\",loc:null,value:\" \"}),hT=\"WhiteSpace\",gT={value:String};function Iu(){return this.eat(13),mT}function yT(e){this.token(13,e.value)}var zh={generic:!0,cssWideKeywords:Jr,...uh,node:Vi};var Du={};I(Du,{AtrulePrelude:()=>Qh,Selector:()=>Wh,Value:()=>jh});var bT=35,xT=42,Bh=43,wT=45,kT=47,ST=117;function ji(e){switch(this.tokenType){case 4:return this.Hash();case 18:return this.Operator();case 21:return this.Parentheses(this.readSequence,e.recognizer);case 19:return this.Brackets(this.readSequence,e.recognizer);case 5:return this.String();case 12:return this.Dimension();case 11:return this.Percentage();case 10:return this.Number();case 2:return this.cmpStr(this.tokenStart,this.tokenEnd,\"url(\")?this.Url():this.Function(this.readSequence,e.recognizer);case 7:return this.Url();case 1:return this.cmpChar(this.tokenStart,ST)&&this.cmpChar(this.tokenStart+1,Bh)?this.UnicodeRange():this.Identifier();case 9:{let t=this.charCodeAt(this.tokenStart);if(t===kT||t===xT||t===Bh||t===wT)return this.Operator();t===bT&&this.error(\"Hex or identifier is expected\",this.tokenStart+1);break}}}var Qh={getNode:ji};var vT=35,TT=38,ET=42,CT=43,AT=47,Hh=46,_T=62,LT=124,PT=126;function RT(e,t){t.last!==null&&t.last.type!==\"Combinator\"&&e!==null&&e.type!==\"Combinator\"&&t.push({type:\"Combinator\",loc:null,name:\" \"})}function MT(){switch(this.tokenType){case 19:return this.AttributeSelector();case 4:return this.IdSelector();case 16:return this.lookupType(1)===16?this.PseudoElementSelector():this.PseudoClassSelector();case 1:return this.TypeSelector();case 10:case 11:return this.Percentage();case 12:this.charCodeAt(this.tokenStart)===Hh&&this.error(\"Identifier is expected\",this.tokenStart+1);break;case 9:{switch(this.charCodeAt(this.tokenStart)){case CT:case _T:case PT:case AT:return this.Combinator();case Hh:return this.ClassSelector();case ET:case LT:return this.TypeSelector();case vT:return this.IdSelector();case TT:return this.NestingSelector()}break}}}var Wh={onWhiteSpace:RT,getNode:MT};function Uh(){return this.createSingleNodeList(this.Raw(null,!1))}function Gh(){let e=this.createList();if(this.skipSC(),e.push(this.Identifier()),this.skipSC(),this.tokenType===18){e.push(this.Operator());let t=this.tokenIndex,n=this.parseCustomProperty?this.Value(null):this.Raw(this.consumeUntilExclamationMarkOrSemicolon,!1);if(n.type===\"Value\"&&n.children.isEmpty){for(let r=t-this.tokenIndex;r<=0;r++)if(this.lookupType(r)===13){n.children.appendData({type:\"WhiteSpace\",loc:null,value:\" \"});break}}e.push(n)}return e}function Vh(e){return e!==null&&e.type===\"Operator\"&&(e.value[e.value.length-1]===\"-\"||e.value[e.value.length-1]===\"+\")}var jh={getNode:ji,onWhiteSpace(e,t){Vh(e)&&(e.value=\" \"+e.value),Vh(t.last)&&(t.last.value+=\" \")},expression:Uh,var:Gh};var NT=new Set([\"none\",\"and\",\"not\",\"or\"]),$h={parse:{prelude(){let e=this.createList();if(this.tokenType===1){let t=this.substring(this.tokenStart,this.tokenEnd);NT.has(t.toLowerCase())||e.push(this.Identifier())}return e.push(this.Condition(\"container\")),e},block(e=!1){return this.Block(e)}}};var qh={parse:{prelude:null,block(){return this.Block(!0)}}};function Fu(e,t){return this.parseWithFallback(()=>{try{return e.call(this)}finally{this.skipSC(),this.lookupNonWSType(0)!==22&&this.error()}},t||(()=>this.Raw(null,!0)))}var Jh={layer(){this.skipSC();let e=this.createList(),t=Fu.call(this,this.Layer);return(t.type!==\"Raw\"||t.value!==\"\")&&e.push(t),e},supports(){this.skipSC();let e=this.createList(),t=Fu.call(this,this.Declaration,()=>Fu.call(this,()=>this.Condition(\"supports\")));return(t.type!==\"Raw\"||t.value!==\"\")&&e.push(t),e}},Yh={parse:{prelude(){let e=this.createList();switch(this.tokenType){case 5:e.push(this.String());break;case 7:case 2:e.push(this.Url());break;default:this.error(\"String or url() is expected\")}return this.skipSC(),this.tokenType===1&&this.cmpStr(this.tokenStart,this.tokenEnd,\"layer\")?e.push(this.Identifier()):this.tokenType===2&&this.cmpStr(this.tokenStart,this.tokenEnd,\"layer(\")&&e.push(this.Function(null,Jh)),this.skipSC(),this.tokenType===2&&this.cmpStr(this.tokenStart,this.tokenEnd,\"supports(\")&&e.push(this.Function(null,Jh)),(this.lookupNonWSType(0)===1||this.lookupNonWSType(0)===21)&&e.push(this.MediaQueryList()),e},block:null}};var Kh={parse:{prelude(){return this.createSingleNodeList(this.LayerList())},block(){return this.Block(!1)}}};var Xh={parse:{prelude(){return this.createSingleNodeList(this.MediaQueryList())},block(e=!1){return this.Block(e)}}};var Zh={parse:{prelude(){return this.createSingleNodeList(this.SelectorList())},block(){return this.Block(!0)}}};var eg={parse:{prelude(){return this.createSingleNodeList(this.SelectorList())},block(){return this.Block(!0)}}};var tg={parse:{prelude(){return this.createSingleNodeList(this.Scope())},block(e=!1){return this.Block(e)}}};var ng={parse:{prelude:null,block(e=!1){return this.Block(e)}}};var rg={parse:{prelude(){return this.createSingleNodeList(this.Condition(\"supports\"))},block(e=!1){return this.Block(e)}}};var ig={container:$h,\"font-face\":qh,import:Yh,layer:Kh,media:Xh,nest:Zh,page:eg,scope:tg,\"starting-style\":ng,supports:rg};function og(){let e=this.createList();this.skipSC();e:for(;!this.eof;){switch(this.tokenType){case 1:e.push(this.Identifier());break;case 5:e.push(this.String());break;case 18:e.push(this.Operator());break;case 22:break e;default:this.error(\"Identifier, string or comma is expected\")}this.skipSC()}return e}var hr={parse(){return this.createSingleNodeList(this.SelectorList())}},zu={parse(){return this.createSingleNodeList(this.Selector())}},IT={parse(){return this.createSingleNodeList(this.Identifier())}},OT={parse:og},vs={parse(){return this.createSingleNodeList(this.Nth())}},sg={dir:IT,has:hr,lang:OT,matches:hr,is:hr,\"-moz-any\":hr,\"-webkit-any\":hr,where:hr,not:hr,\"nth-child\":vs,\"nth-last-child\":vs,\"nth-last-of-type\":vs,\"nth-of-type\":vs,slotted:zu,host:zu,\"host-context\":zu};var Bu={};I(Bu,{AnPlusB:()=>Bl,Atrule:()=>Hl,AtrulePrelude:()=>Ul,AttributeSelector:()=>jl,Block:()=>ql,Brackets:()=>Yl,CDC:()=>Xl,CDO:()=>ec,ClassSelector:()=>nc,Combinator:()=>ic,Comment:()=>sc,Condition:()=>lc,Declaration:()=>uc,DeclarationList:()=>fc,Dimension:()=>hc,Feature:()=>yc,FeatureFunction:()=>xc,FeatureRange:()=>Sc,Function:()=>Tc,GeneralEnclosed:()=>Cc,Hash:()=>_c,IdSelector:()=>Mc,Identifier:()=>Pc,Layer:()=>Ic,LayerList:()=>Dc,MediaQuery:()=>zc,MediaQueryList:()=>Qc,NestingSelector:()=>Wc,Nth:()=>Gc,Number:()=>jc,Operator:()=>qc,Parentheses:()=>Yc,Percentage:()=>Xc,PseudoClassSelector:()=>eu,PseudoElementSelector:()=>nu,Ratio:()=>iu,Raw:()=>su,Rule:()=>lu,Scope:()=>uu,Selector:()=>du,SelectorList:()=>mu,String:()=>yu,StyleSheet:()=>xu,SupportsDeclaration:()=>ku,TypeSelector:()=>Tu,UnicodeRange:()=>Au,Url:()=>Pu,Value:()=>Mu,WhiteSpace:()=>Iu});var ag={parseContext:{default:\"StyleSheet\",stylesheet:\"StyleSheet\",atrule:\"Atrule\",atrulePrelude(e){return this.AtrulePrelude(e.atrule?String(e.atrule):null)},mediaQueryList:\"MediaQueryList\",mediaQuery:\"MediaQuery\",condition(e){return this.Condition(e.kind)},rule:\"Rule\",selectorList:\"SelectorList\",selector:\"Selector\",block(){return this.Block(!0)},declarationList:\"DeclarationList\",declaration:\"Declaration\",value:\"Value\"},features:{supports:{selector(){return this.Selector()}},container:{style(){return this.Declaration()}}},scope:Du,atrule:ig,pseudo:sg,node:Bu};var lg={node:Vi};var cg=ch({...zh,...ag,...lg});var{tokenize:OR,parse:Ts,generate:Bt,lexer:DR,createLexer:FR,walk:Le,find:Es,findLast:zR,findAll:BR,toPlainObject:QR,fromPlainObject:HR,fork:WR}=cg;var ug=new Set(gi),FT=new Set;function pg(e){return e.replace(/[\\t\\n\\r]/g,\"\").replace(/^[\\u0000- ]+|[\\u0000- ]+$/g,\"\")}function zT(e){let t=/^data:([^,;]*)(?:;[^,]*)?,/i.exec(e);return t?t[1].trim().toLowerCase():null}var BT=1024*1024,QT=\"data:image/png;base64,\",Qu=64*1024,HT=3072;function WT(e){let t=e.indexOf(\"#\"),n=t<0?e:e.slice(0,t),r=n.indexOf(\",\"),i=r>=0&&/;[\\t\\n\\f\\r ]*base64$/i.test(n.slice(0,r).replace(/[\\t\\n\\f\\r ]+$/,\"\")),o=r<0?\"\":n.slice(r+1),s=i?0:-1,l=0,c=\"\",p=!1,f=!1,m,g=(S,x)=>{if(f||S>=l&&p)return!1;if(s>=0){let Q=Math.floor(S/3)*3,R=Math.min(Math.ceil(Math.max(x,Q+HT)/3)*4,o.length);if(R>s&&(s=/[%\\t\\n\\f\\r ]/.test(o.slice(s,R))?-1:R),s>=0){try{c=atob(o.slice(Q/3*4,R))}catch{return f=!0,!1}return l=Q,p=R===o.length,x<=l+c.length}}m??=UT(o,i);let L=m(x);return L===null?(f=!0,!1):(l=0,c=L,p=L.length<x,!p)};return{has:(S,x)=>S>=l&&x<=l+c.length||g(S,x),at:S=>c.charCodeAt(S-l)}}function UT(e,t){let n=\"\",r=0,i=\"\",o=!1;return s=>{for(;!o&&n.length<s&&r<e.length;){let l=e.slice(r,r+Math.max(4096,n.length)),c=r+l.length>=e.length;c||(l=l.slice(0,l.length-GT(l))),r+=l.length;let p=VT(l);if(!t){n+=p;continue}let f=i+p.replace(/[\\t\\n\\f\\r ]/g,\"\");i=c?\"\":f.slice(f.length-f.length%4),f=f.slice(0,f.length-i.length);try{n+=atob(f)}catch{o=!0}}return o?null:n}}function GT(e){let t=e.length,n=e.charCodeAt(t-1);return n===37||n>=55296&&n<=56319?1:t>1&&e.charCodeAt(t-2)===37&&/[0-9a-f]/i.test(e[t-1])?2:0}function VT(e){return/[^\\x00-\\x7f]/.test(e)&&(e=unescape(encodeURIComponent(e.replace(/[\\ud800-\\udbff][\\udc00-\\udfff]|[\\ud800-\\udfff]/g,t=>t.length===2?t:\"\\uFFFD\")))),e.includes(\"%\")?unescape(/%u/i.test(e)?e.replace(/%u/gi,\"%25u\"):e):e}function jT(e){let{has:t,at:n}=WT(e),r=l=>n(l)<<8|n(l+1),i=l=>n(l)|n(l+1)<<8,o=l=>n(l)|n(l+1)<<8|n(l+2)<<16,s=(l,c)=>{if(!t(l,l+c.length))return!1;for(let p=0;p<c.length;p++)if(n(l+p)!==c.charCodeAt(p))return!1;return!0};if(s(0,`\\x89PNG\\r\n\n`)&&s(12,\"IHDR\")&&t(0,24))return[r(16)*65536+r(18),r(20)*65536+r(22)];if((s(0,\"GIF87a\")||s(0,\"GIF89a\"))&&t(0,13)){let l=[i(6),i(8)],c=0;for(let p=13+(n(10)&128?3<<(n(10)&7)+1:0),f=0;p<Qu&&f<256;f++){if(!t(p,p+2))return null;if(n(p)===44)return t(p,p+9)?[Math.max(l[0],i(p+1)+i(p+5)),Math.max(l[1],i(p+3)+i(p+7))]:null;if(n(p)!==33)return null;for(p+=2;;){if(p>=Qu||++c>4096||!t(p,p+1))return null;let m=n(p);if(p+=1+m,m===0)break}}return null}if(s(0,\"RIFF\")&&s(8,\"WEBP\"))return s(12,\"VP8X\")&&t(0,30)?[1+o(24),1+o(27)]:s(12,\"VP8L\")&&t(0,25)&&n(20)===47?[1+(n(21)|(n(22)&63)<<8),1+(n(22)>>6|n(23)<<2|(n(24)&15)<<10)]:s(12,\"VP8 \")&&t(0,30)?[(n(26)|n(27)<<8)&16383,(n(28)|n(29)<<8)&16383]:null;if(s(0,\"\\xFF\\xD8\")&&t(0,4))for(let l=2,c=0;l+9<=Qu&&c<1024;c++){if(!t(l,l+4)||n(l)!==255)return null;let p=n(l+1);if(p===255){l++;continue}if(p===1||p>=208&&p<=216){l+=2;continue}if(p>=192&&p<=207&&p!==196&&p!==200&&p!==204)return t(l,l+9)?[r(l+7),r(l+5)]:null;if(p===217||p===218)return null;l+=2+r(l+2)}return null}var Hu=null;function Hn(e,t){let n=pg(String(e));if(n.startsWith(\"#\"))return/^#[^\\s\"'()\\\\<>]*$/.test(n)?n:null;if(t===\"fragment-only\")return null;if(/^data:/i.test(n)){let r=zT(n);if(r===null||t!==\"image\"||!ug.has(r))return null;if(Hu?.url===n)return Hu.checked;let i=jT(n),o=i?i[0]*i[1]<=BT?n:null:QT;return Hu={url:n,checked:o},o}return/^blob:/i.test(n)&&FT.has(n)?n:null}function dg(e){return pg(String(e)).startsWith(\"#\")}var fg=\"data:image/svg+xml,\"+encodeURIComponent('<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"48\" height=\"48\" viewBox=\"0 0 48 48\"><rect width=\"48\" height=\"48\" fill=\"#8882\"/><path d=\"M8 36l10-12 8 9 6-7 8 10z\" fill=\"#8886\"/><circle cx=\"33\" cy=\"15\" r=\"4\" fill=\"#8886\"/></svg>');var Qt=ka,$T=new Set(Qt.properties),gg=new Set(Qt.functions),yg=new Set(Qt.units),qT=new Set(Qt.filterFunctions),JT=new Set(Qt.transform3d),bg=new Set(Qt.fonts.generic),xg=new Set([...Qt.pseudoClasses,...Object.keys(Qt.pseudoRewrite)]),wg=new Set(Qt.pseudoElements),YT=Qt.values,mg=Qt.rewrite,kg=new Set([\"inherit\",\"initial\",\"unset\",\"revert\",\"revert-layer\"]),KT=new Set([\"xx-small\",\"x-small\",\"small\",\"medium\",\"large\",\"x-large\",\"xx-large\",\"xxx-large\",\"smaller\",\"larger\"]),XT=new Set([\"overflow\",\"overflow-x\",\"overflow-y\"]),ZT=new RegExp(\"^(?:#|data:(?:\"+gi.map(e=>e.replace(/[+.]/g,\"\\\\$&\")).join(\"|\")+\")[;,])\",\"i\");function Wu(e){let t=e.toLowerCase();return t.startsWith(\"--\")||$T.has(t)}var Sg=e=>gg.has(e.toLowerCase()),vg=e=>yg.has(e.toLowerCase()),Tg=e=>xg.has(e.toLowerCase()),Eg=e=>wg.has(e.toLowerCase()),Cg=e=>bg.has(e.toLowerCase()),Cs=/[a-zA-Z_\\-\\u0080-￿\\\\]/,eE=/[\\w\\-\\u0080-￿\\\\]/;function tE(e){let t=0,n=()=>{let i=t;for(;t<e.length&&eE.test(e[t]);)t+=e[t]===\"\\\\\"?2:1;return e.slice(i,t)},r=i=>{let o=[];for(;t<e.length;){let s=e[t];if(/\\s/.test(s)){t++;continue}if(i&&s===i)return t++,o;if(s===\")\"||s===\"]\"||s===\"}\"||s===\";\"||s===\"{\")return null;if(s==='\"'||s===\"'\"){let c=\"\";for(t++;t<e.length&&e[t]!==s;)e[t]===\"\\\\\"&&t++,c+=e[t++]??\"\";if(t>=e.length)return null;t++,o.push({t:\"str\",v:c});continue}if(s===\"#\"){t++,n(),o.push({t:\"hash\"});continue}let l=/^[+-]?(?:\\d+\\.?\\d*|\\.\\d+)(?:[eE][+-]?\\d+)?/.exec(e.slice(t));if(l&&!(s===\"-\"&&Cs.test(e[t+1]??\"\")&&!/\\d/.test(e[t+1]))){t+=l[0].length,e[t]===\"%\"?(t++,o.push({t:\"pct\"})):t<e.length&&Cs.test(e[t])&&!(e[t]===\"-\"&&!Cs.test(e[t+1]??\"\"))?o.push({t:\"dim\",unit:n()}):o.push({t:\"num\"});continue}if(Cs.test(s)&&!(s===\"-\"&&/\\d/.test(e[t+1]??\"\"))){let c=n();if(!c)return null;if(e[t]===\"(\"){if(t++,c.toLowerCase()===\"url\"){let f=t,m=e.indexOf(\")\",t);if(m<0)return null;t=m+1,o.push({t:\"url\",v:e.slice(f,m).trim().replace(/^(['\"])(.*)\\1$/,\"$2\")});continue}let p=r(\")\");if(!p)return null;o.push({t:\"func\",v:c.toLowerCase(),args:p});continue}o.push({t:\"ident\",v:c});continue}if(s===\"!\")return null;o.push({t:\"delim\",v:s}),t++}return i?null:o};return r(null)}function*As(e){for(let t of e)yield t,t.t===\"func\"&&(yield*As(t.args))}var nE=e=>[...As(e)].some(t=>t.t===\"func\"&&(t.v===\"var\"||t.v===\"env\"||t.v===\"attr\"));function rE(e){let t=[[]];for(let n of e)n.t===\"delim\"&&n.v===\",\"?t.push([]):t[t.length-1].push(n);return t}function hg(e){for(let t of rE(e)){if(t.length===0)return!1;if(t.some(r=>r.t===\"func\"))continue;if(t.length!==1||t[0].t!==\"ident\")return!1;let n=t[0].v.toLowerCase();if(!bg.has(n)&&!kg.has(n))return!1}return!0}function Uu(e,t){for(let n=0;n<e.length;n++){if(!t(e[n]).size)continue;let r=n+1;return r<e.length&&t(e[r]).slash&&(r+=2),r}return-1}function iE(e){return{size:e.t===\"dim\"||e.t===\"pct\"||e.t===\"ident\"&&KT.has(e.v.toLowerCase())||e.t===\"func\"&&[\"calc\",\"min\",\"max\",\"clamp\"].includes(e.v),slash:e.t===\"delim\"&&e.v===\"/\"}}var oE=e=>e[0]?.t===\"ident\"&&Object.prototype.hasOwnProperty.call(xi,e[0].v)&&(e.length===1||e[1].t===\"delim\"&&e[1].v===\",\");function sE(e){for(let t of As(e))if(t.t===\"func\"&&(!gg.has(t.v)||t.v===\"env\"&&!oE(t.args))||t.t===\"dim\"&&!yg.has(t.unit.toLowerCase())||t.t===\"url\"&&!ZT.test(t.v))return!1;return!0}function aE(e,t){let n=String(e).trim().toLowerCase(),r=String(t).trim();if(!n||!r||!Wu(n))return!1;let i=tE(r);if(!i||!i.length||!sE(i))return!1;if(n.startsWith(\"--\"))return!0;let o=i.filter(p=>p.t===\"ident\").map(p=>p.v.toLowerCase());if(i.length===1&&o.length===1&&kg.has(o[0]))return!0;let s=nE(i),l=YT[n];if(l&&!s&&!(i.length===1&&o.length===1&&l.includes(o[0])))return!1;let c=XT.has(n)?\"overflow\":n;if(mg[c]&&o.some(p=>Object.prototype.hasOwnProperty.call(mg[c],p))||n===\"background-clip\"&&o.includes(\"text\")||n===\"transform\"&&[...As(i)].some(p=>p.t===\"func\"&&JT.has(p.v))||n===\"rotate\"&&(o.some(p=>p===\"x\"||p===\"y\"||p===\"z\")||i.filter(p=>p.t===\"num\").length>1)||(n===\"translate\"||n===\"scale\")&&i.filter(p=>p.t!==\"delim\").length>2||(n===\"filter\"||n===\"backdrop-filter\"||n===\"-webkit-backdrop-filter\")&&i.some(p=>p.t===\"func\"&&!qT.has(p.v)&&p.v!==\"var\"||p.t===\"url\")||n===\"font-family\"&&!s&&!hg(i))return!1;if(n===\"font\"&&!s){let p=Uu(i,iE);if(p>=0&&!hg(i.slice(p)))return!1}return!0}function lE(e){let t=String(e).trim();if(!t||t.includes(\"&\")||/[{};]/.test(t))return!1;let n=/(::?)(-?[a-zA-Z][\\w-]*)/g;for(let r;r=n.exec(t.replace(/\"[^\"]*\"|'[^']*'|\\[[^\\]]*\\]/g,\"\"));)if(!(r[1]===\"::\"?wg.has(r[2].toLowerCase()):xg.has(r[2].toLowerCase())))return!1;return!0}function Ag(e){let t=String(e),n=0,r=()=>{for(;n<t.length&&/\\s/.test(t[n]);)n++},i=p=>(r(),t.slice(n,n+p.length).toLowerCase()===p&&!/[\\w-]/.test(t[n+p.length]??\"\")?(n+=p.length,!0):!1),o=()=>{let p=1,f=n,m=\"\";for(;n<t.length;n++){let g=t[n];if(m){g===\"\\\\\"?n++:g===m&&(m=\"\");continue}if(g==='\"'||g===\"'\")m=g;else if(g===\"(\")p++;else if(g===\")\"&&--p===0)return n++,t.slice(f,n-1)}return null},s=()=>{if(r(),t.slice(n,n+9).toLowerCase()===\"selector(\"){n+=9;let L=o();return L===null?null:lE(L)}let p=/^[a-zA-Z-]+\\(/.exec(t.slice(n));if(p)return n+=p[0].length,o()===null?null:!1;if(t[n]!==\"(\")return null;n++;let f=n,m=l();if(r(),m!==null&&t[n]===\")\")return n++,m;n=f;let g=o();if(g===null)return null;let S=g.indexOf(\":\");if(S<=0)return!1;let x=g.slice(0,S).trim();return/^-{0,2}[a-zA-Z_][\\w-]*$/.test(x)?aE(x,g.slice(S+1)):!1},l=()=>{if(i(\"not\")){let f=s();return f===null?null:!f}let p=s();if(p===null)return null;for(;;)if(i(\"and\")){let f=s();if(f===null)return null;p=p&&f}else if(i(\"or\")){let f=s();if(f===null)return null;p=p||f}else return p},c=l();return r(),c===!0&&n===t.length}var Wn={colorScheme:\"light\"},Fg=new Set([\"value\",\"placeholder\",\"alt\",\"label\",\"title\"]);function $u(e){return Fg.has(e)||e.startsWith(\"data-\")||e.startsWith(\"aria-\")}var cE=[...Fg];function Ps(e){let t=\"\";for(let n=0;n<e.length;){let r=e.charCodeAt(n);if(r===92){n+=2;continue}if(r!==34&&r!==39){n++;continue}let i=n+1;for(;i<e.length&&e.charCodeAt(i)!==r;)e.charCodeAt(i)===92&&i+1<e.length&&i++,t+=e[i],i++;n=i+1}return t}var _g=\"(min-width: 0px)\",Gu=\"(min-width: 99999px)\",at=bo.css,uE=new Set(at.atRules),pE=new Set([\"import\",\"namespace\",\"font-face\"]),dE=new Set(at.mediaTypes),fE=new Set(at.mediaFeatures),zg=at.values,Bg=at.rewrite,mE=new Set(at.filterFunctions),Qg=new Set(at.transform3d),hE=at.fonts.fallback,Lg=at.fonts.aliases,Pg=at.pseudoRewrite,qu=new Set([\"inherit\",\"initial\",\"unset\",\"revert\",\"revert-layer\"]),gE=new Set([\"xx-small\",\"x-small\",\"small\",\"medium\",\"large\",\"x-large\",\"xx-large\",\"xxx-large\",\"smaller\",\"larger\"]),yE=e=>e.type===\"Function\"&&Hg.has(e.name.toLowerCase()),Hg=new Set([\"var\",\"env\",\"attr\"]),_s=new Set([\"image-set\",\"-webkit-image-set\",\"image\",\"src\",\"cross-fade\",\"-webkit-cross-fade\"]),Wg=new Set([\"var\",\"env\",\"attr\"]),Ug=new Set([\"behavior\",\"-moz-binding\"]),bE=/^[\\w\\s\\-.,:()<>=%/*+!#]*$/,xE={parseCustomProperty:!0,positions:!1};function wE(e){return e.replace(/\\u0000/g,\"\\uFFFD\")}function Gg(e,t,n,r,i){if(e.type===\"Raw\")return e.value.trim()===\"\"?!0:(n(\"css-dropped\",`${r}: unparsable value`),!1);let o=!0,s=[],l={enter(c,p,f){if(o){if(c.type===\"Function\"&&c.name.toLowerCase()===\"light-dark\"&&f){let m=[[]];c.children.forEach(x=>x.type===\"Operator\"&&x.value===\",\"?m.push([]):m[m.length-1].push(x));let g=m[i.colorScheme===\"dark\"?1:0]??m[0],S=new ke;for(let x of g)S.appendData(x);return Le({type:\"Value\",children:S},l),f.replace(p,S),Le.skip}if(c.type===\"Function\"&&c.name.toLowerCase()===\"env\"&&f){if(s.some(g=>_s.has(g))){o=!1,n(\"css-dropped\",`${r}: env() inside a URL-taking function`);return}let m=kE(c);if(m===null){o=!1,n(\"profile\",`${r}: ${Rg(c)}`);return}if(m!==\"var\"){n(\"profile\",`${r}: ${Rg(c)} \\u2192 its fallback`);let g=new ke().fromArray(m);return Le({type:\"Value\",children:g},l),f.replace(p,g),Le.skip}}switch(c.type){case\"Raw\":o=!1,n(\"css-dropped\",`${r}: unparsable value`);break;case\"Dimension\":if(!vg(c.unit)){o=!1,n(\"profile\",`${r}: unit ${Ht(c.unit)}`);break}if(i.scope===\"shadow\"){let m=jg[c.unit.toLowerCase()];m&&(c.unit=m)}break;case\"Url\":{let m=Hn(c.value,t);m===null?(o=!1,n(\"url-blocked\",`${r}: url(${Ht(c.value)})`)):c.value=m;break}case\"Function\":{let m=c.name.toLowerCase();if(m===\"url\")o=!1,n(\"url-blocked\",`${r}: url() with modifiers`);else if(!Sg(m))o=!1,n(\"profile\",`${r}: ${Ht(m)}()`);else if(s.some(g=>_s.has(g))&&Wg.has(m))o=!1,n(\"css-dropped\",`${r}: ${m}() inside a URL-taking function`);else if(m===\"attr\"&&i.strict){let g=c.children.first,S=g?.type===\"Identifier\"?g.name.toLowerCase():\"\";$u(S)||(o=!1,n(\"css-dropped\",`${r}: attr(${Ht(S)}) reads an attribute outside the text budget`))}s.push(m);break}case\"String\":if(s.some(m=>_s.has(m))){let m=Hn(c.value,\"image\");m===null?(o=!1,n(\"url-blocked\",`${r}: \"${Ht(c.value)}\" in ${s[s.length-1]}()`)):c.value=m}break}}},leave(c){c.type===\"Function\"&&s.pop()}};return Le(e,l),o}function kE(e){let t=e.children.toArray(),n=t[0]?.type===\"Identifier\"?t[0].name:null;if(n===null||t.length>1&&!(t[1].type===\"Operator\"&&t[1].value===\",\"))return null;let r=t.slice(2);return Object.prototype.hasOwnProperty.call(xi,n)?(e.name=\"var\",t[0].name=xi[n],\"var\"):r.length?r:null}function Rg(e){let t=e.children.first;return`env(${Ht(t?.type===\"Identifier\"?t.name:\"\")})`}function Ht(e){if(e.length<=80)return e;let t=e.charCodeAt(79);return e.slice(0,t>=55296&&t<=56319?79:80)+\"\\u2026\"}function Ju(e,t,n){let r=e.property.toLowerCase();if(Ug.has(r))return!1;if(!Wu(r))return t(\"profile\",`property ${Ht(r)}`),!1;if(r===\"color-scheme\"){let i=Bt(e.value).toLowerCase();/\\blight\\b/.test(i)&&/\\bdark\\b/.test(i)&&(e.value=Ts(n.colorScheme,{context:\"value\"}))}return Vg.has(r)&&!SE(r,e,t)?!1:Gg(e.value,\"image\",t,r,n)&&TE(r,e,t,n)}var Vg=new Set([\"filter\",\"backdrop-filter\",\"-webkit-backdrop-filter\"]);function SE(e,t,n){if(t.value.type!==\"Value\")return!0;let r=t.value.children.toArray(),i=r.filter(o=>o.type===\"Url\"||o.type===\"Function\"&&!mE.has(o.name.toLowerCase())&&!Hg.has(o.name.toLowerCase())?(n(\"profile\",`${e}: ${o.type===\"Url\"?\"url()\":o.name.toLowerCase()+\"()\"}`),!1):!0);return i.length===0?!1:(i.length!==r.length&&(t.value.children=Vu(i)),!0)}var wn=e=>e?.type===\"Identifier\"?e.name.toLowerCase():null,Vu=e=>new ke().fromArray(e),vE=()=>({type:\"Operator\",value:\",\"});function TE(e,t,n,r){if(e.startsWith(\"--\")||t.value.type!==\"Value\")return!0;let i=t.value.children.toArray(),o=i.some(m=>Es(m,yE)!==null),s=i.length===1?wn(i[0]):null;if(s&&qu.has(s))return!0;let l=m=>(n(\"profile\",`${e}: ${Ht(m)}`),!1),c=zg[e],p=e===\"overflow\"||e===\"overflow-x\"||e===\"overflow-y\",f=p&&r.nativeScrolling?void 0:Bg[p?\"overflow\":e];if(f)for(let m of i){let g=wn(m);g&&Object.prototype.hasOwnProperty.call(f,g)&&(n(\"profile\",`${e}: ${g} \\u2192 ${f[g]}`),m.name=f[g])}if(c&&!o){let m=i.length===1?wn(i[0]):null;if(!m||!c.includes(m))return l(Bt(t.value))}switch(e){case\"background-clip\":if(i.some(m=>wn(m)===\"text\"))return l(\"text\");break;case\"transform\":if(Es(t.value,m=>m.type===\"Function\"&&Qg.has(m.name.toLowerCase())))return l(\"3D function\");break;case\"rotate\":if(i.some(m=>[\"x\",\"y\",\"z\"].includes(wn(m)??\"\"))||i.filter(m=>m.type===\"Number\").length>1)return l(\"3D rotation\");break;case\"translate\":case\"scale\":if(i.filter(m=>m.type!==\"Operator\").length>2)return l(\"3D\");break;case\"font-family\":t.value.children=Vu(Mg(i,n));break;case\"font\":{let m=Uu(i,EE);m>0&&m<i.length&&(t.value.children=Vu([...i.slice(0,m),...Mg(i.slice(m),n)]));break}}return!0}function EE(e){return{size:e.type===\"Dimension\"||e.type===\"Percentage\"||e.type===\"Identifier\"&&gE.has(e.name.toLowerCase())||e.type===\"Function\"&&[\"calc\",\"min\",\"max\",\"clamp\"].includes(e.name.toLowerCase()),slash:e.type===\"Operator\"&&e.value===\"/\"}}function Mg(e,t){let n=[[]];for(let s of e)s.type===\"Operator\"&&s.value===\",\"?n.push([]):n[n.length-1].push(s);let r=[],i=new Set;for(let s of n){if(s.length===0)continue;if(s.some(p=>p.type===\"Function\")){r.push(s);continue}let l=s.length===1?wn(s[0]):null,c=l&&Object.prototype.hasOwnProperty.call(Lg,l)?Lg[l]:null;if(c){t(\"profile\",`font-family: ${l} \\u2192 ${c}`),i.has(c)||r.push([{type:\"Identifier\",name:c}]),i.add(c);continue}if(l&&(Cg(l)||qu.has(l))){if(i.has(l))continue;r.push(s),i.add(l);continue}t(\"profile\",`font-family: ${Ht(s.map(p=>p.type===\"String\"?JSON.stringify(p.value):Bt(p)).join(\" \"))}`)}let o=[];return r.forEach((s,l)=>{o.push(s);let c=s.length===1?wn(s[0]):null,p=c?hE[c]:void 0;p&&!r.slice(l+1).some(f=>f.length===1&&wn(f[0])===p)&&!o.some(f=>f.length===1&&wn(f[0])===p)&&o.push([{type:\"Identifier\",name:p}])}),o.length===0&&o.push([{type:\"Identifier\",name:at.fonts.default}]),o.flatMap((s,l)=>l?[vE(),...s]:s)}function Yu(e,t,n){try{let r=Yi(`${e}:${t}`,\"declaration\");return r.type!==\"Declaration\"||!Ju(r,n,Wn)?null:Bt(r.value)}catch{return null}}var jg={vw:\"cqw\",svw:\"cqw\",lvw:\"cqw\",dvw:\"cqw\",vh:\"cqh\",svh:\"cqh\",lvh:\"cqh\",dvh:\"cqh\",vmin:\"cqmin\",svmin:\"cqmin\",lvmin:\"cqmin\",dvmin:\"cqmin\",vmax:\"cqmax\",svmax:\"cqmax\",lvmax:\"cqmax\",dvmax:\"cqmax\",vi:\"cqi\",svi:\"cqi\",lvi:\"cqi\",dvi:\"cqi\",vb:\"cqb\",svb:\"cqb\",lvb:\"cqb\",dvb:\"cqb\"},CE=/^\\(\\s*(?:(?:min-|max-)?(?:width|height|aspect-ratio)\\s*:\\s*[^()]+|orientation\\s*:\\s*(?:portrait|landscape)\\s*|[^()]*\\b(?:width|height)\\b[^()]*[<>][^()]*)\\)$/i;function AE(e){let t=[];for(let n of e.split(\",\")){if(n=n.trim().replace(/^only\\s+/i,\"\"),!n)return null;let r=/^(screen|all)\\b\\s*(?:and\\b)?\\s*/i.exec(n);if(r&&(n=n.slice(r[0].length).trim()),!n){t.push(\"(min-width: 0px)\");continue}let i=n.split(/\\s+and\\s+/i);for(let o of i)if(!CE.test(o.trim()))return null;t.push(i.map(o=>o.trim()).join(\" and \"))}return\"tw \"+t.join(\" or \")}function _E(e,t){let n=new ke;return e.children.forEach(r=>{let i=null;Le(r,{enter(o,s,l){if(!i){if(o.type===\"NestingSelector\")i=\"&\";else if(o.type===\"PseudoElementSelector\"&&!Eg(o.name))i=\"::\"+o.name;else if(o.type===\"PseudoClassSelector\"){let c=o.name.toLowerCase(),p=Object.prototype.hasOwnProperty.call(Pg,c)?Pg[c]:null;if(p&&l){let f=Ts(p,{context:\"selector\"});l.replace(s,f.children)}else Tg(c)||(i=\":\"+c)}}}}),i?t(\"profile\",`selector ${Ht(i)}`):n.appendData(r)}),e.children=n,!n.isEmpty}var Ng={root:\"data-tw-root\",active:\"data-tw-active\"};function LE(e){let t=new ke;return e.children.forEach(n=>{Le(n,{enter(r,i,o){if(r.type!==\"PseudoClassSelector\"||r.children||!o)return;let s=r.name.toLowerCase();if(!Object.prototype.hasOwnProperty.call(Ng,s))return;let l={type:\"AttributeSelector\",name:{type:\"Identifier\",name:Ng[s]},matcher:null,value:null,flags:null};o.replace(i,ke.createItem(l))}}),t.appendData(n)}),e.children=t,!t.isEmpty}function $g(e){let t=e.toLowerCase(),n=[];for(let r=0;/\\([^()]*\\)/.test(t)&&r<64;r++)t=t.replace(/\\(([^()]*)\\)/g,(i,o)=>{let s=o.trim();if(s===\"\"||s===\"\"||/^(?:not\\s+)?\\u0001(?:\\s+(?:and|or)\\s+\\u0001)*$/.test(s))return\"  \";let l=s.indexOf(\":\");return l>=0?n.push(s.slice(0,l).trim()):/[<>=]/.test(s)?n.push(...s.match(/[a-z][a-z-]*/g)??[]):n.push(s),\"  \"});if(/[()]/.test(t))return!1;for(let r of n)if(!fE.has(r))return!1;for(let r of t.match(/[a-z][a-z-]*/g)??[])if(![\"and\",\"or\",\"not\",\"only\"].includes(r)&&!dE.has(r))return!1;return!0}function Ku(e,t){return $g(e)?e.replace(/\\(\\s*prefers-color-scheme\\s*:\\s*(dark|light)\\s*\\)/gi,(n,r)=>r.toLowerCase()===t.colorScheme?_g:Gu).replace(/\\(\\s*prefers-reduced-motion\\s*(?::\\s*(reduce|no-preference)\\s*)?\\)/gi,(n,r)=>(r??\"reduce\").toLowerCase()===\"reduce\"==!!t.reducedMotion?_g:Gu):Gu}function ju(e){let t=[];return e.forEach(n=>{if(n.type===\"Atrule\"&&n.name.toLowerCase()===\"supports\"){n.block&&n.prelude&&Ag(Bt(n.prelude))&&t.push(...ju(n.block.children).toArray());return}(n.type===\"Atrule\"||n.type===\"Rule\")&&n.block&&(n.block.children=ju(n.block.children)),t.push(n)}),new ke().fromArray(t)}function Ig(e){return!!e&&Es(e,t=>t.type===\"Raw\")!==null}function PE(e){let t=!0;return Le(e,n=>{n.type===\"Raw\"&&!bE.test(n.value)&&(t=!1)}),t}function qg(e,t,n){let r=[],i=0;e.type===\"StyleSheet\"&&(e.children=ju(e.children)),Le(e,{enter(o,s,l){if((o.type===\"Atrule\"||o.type===\"Rule\")&&i>0&&l)return t(\"profile\",\"nested rule\"),l.remove(s),Le.skip;if(o.type===\"Atrule\"){let c=o.name.toLowerCase();if(!uE.has(c))return t(pE.has(c)?\"css-dropped\":\"profile\",`@${c}`),l.remove(s),Le.skip;if(c===\"media\"&&o.prelude){let p=Bt(o.prelude);if(!$g(p))return t(\"profile\",`@media ${Ht(p)}`),l.remove(s),Le.skip;if(/prefers-(?:color-scheme|reduced-motion)/i.test(p)&&(p=Ku(p,n),o.prelude={type:\"Raw\",value:p}),n.scope===\"shadow\"){let f=AE(p);f&&(o.name=\"container\",o.prelude={type:\"Raw\",value:f})}}if(o.prelude&&Ig(o.prelude)&&!PE(o.prelude))return t(\"css-dropped\",`@${c}: unparsable prelude`),l.remove(s),Le.skip;r.push(c)}else if(o.type===\"Rule\"){if(Ig(o.prelude))return t(\"css-dropped\",\"rule with unparsable selector\"),l.remove(s),Le.skip;let c=/keyframes$/.test(r[r.length-1]??\"\");if(!c&&o.prelude.type===\"SelectorList\"&&!_E(o.prelude,t))return l.remove(s),Le.skip;if(n.scope===\"shadow\"&&o.prelude.type===\"SelectorList\"&&!LE(o.prelude))return t(\"css-dropped\",\"rule: shadow-host selector\"),l.remove(s),Le.skip;c||i++,r.push(c?\"keyframe\":\"rule\")}else{if(o.type===\"Declaration\")return Ju(o,t,n)||l.remove(s),Le.skip;if(o.type===\"Raw\")return i>0&&o.value.includes(\"{\")&&t(\"profile\",\"nested rule\"),l&&l.remove(s),Le.skip}},leave(o){o.type===\"Atrule\"?r.pop():o.type===\"Rule\"&&r.pop()===\"rule\"&&i--}})}function Yi(e,t){return Ts(wE(e),{...xE,context:t})}var RE=32,ME=262144,$i=new Map;function Jg(e,t,n=Wn){let r=`${n.colorScheme}${n.scope??\"\"}${n.strict?1:0}${n.reducedMotion?1:0}${n.nativeScrolling?1:0}${e}`,i=$i.get(r);if(!i){let o=[];i={out:NE(e,(s,l)=>o.push([s,l]),n),diags:o},e.length<ME&&($i.size>=RE&&$i.delete($i.keys().next().value),$i.set(r,i))}for(let[o,s]of i.diags)t(o,s);return i.out}function NE(e,t,n){try{let r=Yi(e,\"stylesheet\");return qg(r,t,n),Bt(r)}catch(r){return t(\"css-dropped\",\"stylesheet: \"+r.message),\"\"}}function Yg(e,t,n=Wn){try{let r=Yi(e,\"declarationList\");return qg(r,t,n),Bt(r)}catch(r){return t(\"css-dropped\",\"style attribute: \"+r.message),\"\"}}var Kg=/^-{0,2}[a-zA-Z_][\\w-]*$/,IE=256,vt=1,Kt=2,yr=3,br=4,kn=5,Sn=6,ti=7,Ls=8,xr=(...e)=>e.reduce((t,n)=>t|1<<n,0),Xt=[];Xt[0]=0;Xt[vt]=xr(vt,Kt,br,kn,Sn,yr);Xt[Kt]=0;Xt[yr]=xr(vt,Kt,br,kn,Sn,yr);Xt[br]=xr(vt,Kt,br,kn,Sn);Xt[kn]=xr(kn,Sn,Kt);Xt[Sn]=xr(vt,Kt,br,kn,Sn,yr);Xt[ti]=0;Xt[Ls]=xr(vt,Kt,kn,Sn,yr);var OE=xr(vt,yr,Sn,kn,Ls),Og=new Set(at.functions.filter(e=>!Wg.has(e)&&!_s.has(e)&&e!==\"url\"&&e!==\"light-dark\"&&!Qg.has(e))),Dg=new Set(at.units.filter(e=>!Object.prototype.hasOwnProperty.call(jg,e))),DE={},Xg=new Map;for(let e of at.properties){if(Ug.has(e)||Vg.has(e)||e===\"color-scheme\"||e===\"font\"||e===\"font-family\")continue;let t=e===\"overflow\"||e===\"overflow-x\"||e===\"overflow-y\";Xg.set(e,{keywords:zg[e],rewrite:Bg[t?\"overflow\":e],kind:e===\"rotate\"?\"rotate\":e===\"translate\"||e===\"scale\"?\"translate\":e===\"background-clip\"?\"clip\":void 0})}var qi=1,Ji=2,gr=4,dt=new Uint8Array(128);for(let e=48;e<=57;e++)dt[e]=qi|gr;for(let e=65;e<=90;e++)dt[e]=dt[e+32]=Ji|gr;dt[45]=gr;var FE=!0;function zE(e,t){let n=t.length;if(n===0||n>IE)return;let r=Xg.get(e),i=r===void 0&&e.charCodeAt(0)===45&&e.charCodeAt(1)===45&&Kg.test(e);if(i&&(r=DE),r===void 0)return;let o,s=0,l=0,c=0,p=0,f=0,m=0,g=\"\",S=-1,x=r.rewrite!==void 0||r.kind===\"clip\"||r.kind===\"rotate\",L=0;for(;L<n;){let Q=L,R=t.charCodeAt(L),H=R<128?dt[R]:0,F,W=!1;if(R===32){L++;continue}if(H&qi||R===46||R===45){let J=t.charCodeAt(L+1),X=J<128?dt[J]:0,G=(H|X)&qi;if(!G&&R===45&&J===46){let Z=t.charCodeAt(L+2);G=Z<128?dt[Z]&qi:0}if(R===46&&!(X&qi)&&(G=0),G){W=R===45,W&&L++;let Z=t.charCodeAt(L);for(;Z>=48&&Z<=57;)Z=t.charCodeAt(++L);if(Z===46){let Ce=t.charCodeAt(L+1);if(Ce>=48&&Ce<=57){L++;do Z=t.charCodeAt(++L);while(Z>=48&&Z<=57)}}let ue=t.charCodeAt(L+1);if((Z===101||Z===69)&&(ue>=48&&ue<=57||(ue===45||ue===43)&&t.charCodeAt(L+2)>=48&&t.charCodeAt(L+2)<=57))return;let Ge=Z<128?dt[Z]:0;if(Z===37)L++,F=kn;else if(Ge&Ji||Z===45&&((ue<128?dt[ue]:0)&Ji||ue===45)){let Ce=L;do Z=t.charCodeAt(++L);while(Z<128&&dt[Z]&gr);let Je=t.slice(Ce,L);if(!Dg.has(Je)&&!Dg.has(Je.toLowerCase()))return;F=Sn}else F=br}else if(R===45&&(X&Ji||J===45)){let Z=J;do Z=t.charCodeAt(++L);while(Z<128&&dt[Z]&gr);F=vt}else return}else if(H&Ji){let J=R;do J=t.charCodeAt(++L);while(J<128&&dt[J]&gr);F=vt}else if(R===35){let J=R;do J=t.charCodeAt(++L);while(J<128&&dt[J]&gr);if(L===Q+1)return;F=yr}else if(R===44){if(L++,s===0||s===Kt||s===ti)return;F=ti}else if(R===41){if(L++,c===0||s===ti)return;c--,F=Ls}else return;if(F===vt&&L<n&&t.charCodeAt(L)===40){let J=t.slice(Q,L);if(!Og.has(J)&&!Og.has(J.toLowerCase()))return;L++,F=Kt}if(c===0&&F!==Ls&&(p++,F!==ti&&f++,F===br&&m++,F===vt&&(S=Q,x&&(g=t.slice(Q,L).toLowerCase(),r.rewrite&&Object.prototype.hasOwnProperty.call(r.rewrite,g)||r.kind===\"clip\"&&g===\"text\"||r.kind===\"rotate\"&&(g===\"x\"||g===\"y\"||g===\"z\")))))return;F===Kt&&c++;let ce=(W?OE>>s:Xt[s]>>F)&1;o===void 0?Q-l!==ce&&(o=t.slice(0,l)+(ce?\" \":\"\")+t.slice(Q,L)):o+=(ce?\" \":\"\")+t.slice(Q,L),s=F,l=L}if(!(s===0||c!==0||s===ti)){if(o===void 0&&l!==n&&(o=t.slice(0,l)),!i){let Q=p===1&&s===vt;if(Q&&!x&&(g=t.slice(S,l).toLowerCase()),!(Q&&qu.has(g))&&(r.keywords&&!(Q&&r.keywords.includes(g))||r.kind===\"rotate\"&&m>1||r.kind===\"translate\"&&f>2))return}return o??t}}function Rs(e,t,n,r=Wn){if(FE){let i=zE(e,t);if(i!==void 0)return{name:e,value:i}}return BE(e,t,n,r)}function BE(e,t,n,r=Wn){if(!Kg.test(e))return null;if(t===\"\")return{name:e,value:\"\"};try{let i=Yi(`${e}:${t}`,\"declaration\");return i.type!==\"Declaration\"||!Ju(i,n,r)?null:{name:e,value:Bt(i.value)}}catch{return null}}function Xu(e,t,n=\"value\",r=Wn){try{let i=Yi(e,\"value\");return Gg(i,\"image\",t,n,r)?Bt(i):null}catch{return null}}var Zg=5e4,ey=32*1024,QE=2*1024*1024,rp=8192,ty=1024,HE=48*1024;function Ms(e){let t=0,n=!1;for(let r=0;r<e.length;r++){let i=e.charCodeAt(r);i>=11904&&i<=42191||i>=44032&&i<=55295||i>=63744||i>=55296&&i<=56319?(n&&t++,n=!1,t++,i>=55296&&i<=56319&&r+1<e.length&&e.charCodeAt(r+1)>=56320&&e.charCodeAt(r+1)<=57343&&r++):i<=32||i===45||i===63||i===47||i===8203?(n&&t++,n=!1):n=!0}return n&&t++,Math.max(t,Math.ceil(e.length/1024))}var WE=256;function Ns(e){if(e.length>WE)return!0;for(let t=0;t<e.length;t++){let n=e.charCodeAt(t);if(n>=1424&&n<8192||n>=11904&&n<=55295||n>=63744&&n<=65519)return!0}return!1}function Zu(e){let t=0;for(let n=0;n<e.length;n++)e.charCodeAt(n)>=1424&&t++;return t}var UE=new Set([\"offset\",\"easing\",\"composite\",\"computed-offset\"]),ep=Symbol(\"out of profile\"),GE=8*1024,VE=1e4,jE=2e3,$E=4e3,qE=400,JE=32,YE=64,KE=2048*2048,ny=4*1024*1024,XE=2e5,ZE=5e5,eC=1024,tC=2**31,nC=0,rC=/^[a-zA-Z_][\\w.:\\-]*$/,iC=/^[a-zA-Z][\\w.\\-]*$/,oC=new Set(xo),sC=new Set([\"animate\",\"animateTransform\",\"animateMotion\"]),aC=new Set([\"use\",\"linearGradient\",\"radialGradient\",\"pattern\",\"filter\",\"textPath\",\"mpath\",\"feImage\"]);function ry(e){return e===\"strict\"?{maxText:ey,maxCanvasString:ey,maxAttr:GE,maxOps:VE,maxCanvasCmds:$E,maxNodes:jE,maxCssRules:qE,maxKeyframes:JE,maxLiveAnims:YE,maxCanvasPixels:KE,complexTextBudget:rp,textBudget:HE,stop:!0}:{maxText:QE,maxCanvasString:ny,maxAttr:ny,maxOps:XE,maxCanvasCmds:ZE,maxNodes:0,maxCssRules:0,maxKeyframes:0,maxLiveAnims:eC,maxCanvasPixels:0,complexTextBudget:0,textBudget:0,stop:!1}}function lC(e){let t=0,n=0,r=[],i=0;for(let o=0;o<e.length;o++){let s=e.charCodeAt(o);if(s===34||s===39)for(o++;o<e.length&&e.charCodeAt(o)!==s;o++)e.charCodeAt(o)===92&&o++;else if(s===92)o++;else if(s===47&&e.charCodeAt(o+1)===42){let l=e.indexOf(\"*/\",o+2);o=l<0?e.length:l+1}else if(s===123){let l=e.slice(i,o).trim().toLowerCase(),c=r[r.length-1],p;c===\"kf\"?p=\"frame\":/^@(-webkit-)?keyframes\\b/.test(l)?p=\"kf\":l.startsWith(\"@\")?p=\"at\":p=\"rule\",p===\"kf\"?n++:p===\"rule\"&&t++,r.push(p),i=o+1}else s===125?(r.pop(),i=o+1):s===59&&(i=o+1)}return{rules:t,keyframes:n}}function vn(e){return typeof e==\"object\"&&e!==null&&!Array.isArray(e)}function We(e){return typeof e==\"number\"&&Number.isInteger(e)&&e>yi&&e<tC}function Un(e,t){return typeof e==\"string\"&&e.length<=t}function Ue(e){return typeof e==\"number\"&&Number.isFinite(e)}var Os=class{nodes=new Map;adopted={html:!1,head:!1,body:!1};dirtyStyles=new Set;complexText=0;totalText=0;cssRules=0;cssKeyframes=0;canvasSizes=new Map;canvasPixels=0;batchCanvasCmds=new Map;stopReason=null;churnTokens=rp;churnAt=null;clock=()=>Date.now()/1e3;setClock(t){this.clock=t}loading=!0;markLoaded(){this.loading=!1}takeChurn(t){if(this.loading)return!0;let n=this.clock();return this.churnAt!==null&&(this.churnTokens=Math.min(rp,this.churnTokens+Math.max(0,n-this.churnAt)*ty)),this.churnAt=n,this.churnTokens<t?!1:(this.churnTokens-=t,!0)}overChurn(){return this.diag(\"text-churn\",`text changes over ${ty} units per second`),!1}policyName=\"compat\";limits=ry(\"compat\");get policy(){return this.policyName}get stopped(){return this.stopReason}stop(t){return this.limits.stop&&this.stopReason===null&&(this.stopReason=t,this.diag(\"limit\",t)),!1}tooLongText(t){return this.stop(`Text limit exceeded: a text value of ${t} characters (max ${this.limits.maxText})`)}tooLongAttr(t){return this.stop(`Attribute limit exceeded: a value of ${t} characters (max ${this.limits.maxAttr})`)}checkTotals(){return this.limits.maxNodes&&this.nodes.size-1>this.limits.maxNodes?this.stop(`Node limit exceeded: ${this.nodes.size-1} nodes in the document (max ${this.limits.maxNodes})`):this.limits.textBudget&&this.totalText>this.limits.textBudget?this.stop(`Text limit exceeded: the document's text is over ${this.limits.textBudget} characters`):this.limits.maxCssRules&&this.cssRules>this.limits.maxCssRules?this.stop(`CSS limit exceeded: ${this.cssRules} rules in the document's stylesheets (max ${this.limits.maxCssRules})`):this.limits.maxKeyframes&&this.cssKeyframes>this.limits.maxKeyframes?this.stop(`CSS limit exceeded: ${this.cssKeyframes} @keyframes in the document's stylesheets (max ${this.limits.maxKeyframes})`):!0}sizeCanvas(t,n,r){let i=this.canvasSizes.get(t),o=this.canvasPixels-(i?i[0]*i[1]:0)+n*r;return this.limits.maxCanvasPixels&&!(o<=this.limits.maxCanvasPixels)?this.stop(`Canvas limit exceeded: canvases of ${o} pixels together (max ${this.limits.maxCanvasPixels})`):(this.canvasSizes.set(t,[n,r]),this.canvasPixels=o,!0)}sizeCanvasAttr(t,n,r){let i=n.toLowerCase();if(t.tag!==\"canvas\"||t.ns!==\"html\"||i!==\"width\"&&i!==\"height\")return!0;let o=/^[\\t\\n\\f\\r ]*\\+?(\\d+)/.exec(r??\"\"),s=i===\"width\"?300:150,l=o&&Number(o[1])<=2147483647?Number(o[1]):s,[c,p]=this.canvasSizes.get(t.id)??[300,150];return this.sizeCanvas(t.id,i===\"width\"?l:c,i===\"height\"?l:p)}setPolicy(t){this.policyName=t===\"compat\"?\"compat\":\"strict\",this.limits=ry(this.policyName),this.env={...this.env,strict:this.policyName===\"strict\"}}out=[];diag;env;constructor(t,n=Wn){this.diag=t,this.env={...n},this.nodes.set(yi,{id:yi,kind:\"doc\",tag:\"\",ns:\"html\",rendered:!1,isStyle:!1,adopted:!1,parent:null,children:[],data:\"\",attached:!1})}get nodeCount(){return this.nodes.size}setTheme(t){this.env={...this.env,colorScheme:t};let n=[];for(let r of this.nodes.values())r.kind===\"el\"&&r.isStyle&&r.rendered&&n.push({op:\"css\",id:r.id,text:this.styleText(r)});return this.checkTotals()?n:[]}styleText(t){let n=t.children.map(i=>this.nodes.get(i)?.data??\"\").join(\"\"),r=Jg(n,this.diag,this.env);if(this.budgeted&&!this.updateTextSlot(t,\"sheet\",Ps(r)))return this.releaseTextSlot(t,\"sheet\"),\"\";if(this.limits.maxCssRules||this.limits.maxKeyframes){let{rules:i,keyframes:o}=lC(r);this.cssRules+=i-(t.cssRules??0),this.cssKeyframes+=o-(t.cssKeyframes??0),t.cssRules=i,t.cssKeyframes=o}return r}get budgeted(){return this.limits.textBudget>0||this.limits.complexTextBudget>0}attrText(t,n){return this.budgeted?t===\"style\"?Ps(n):$u(t)?n:null:null}rewriteMediaQuery(t){return Ku(t,this.env)}isCanvas(t){if(!We(t))return!1;let n=this.nodes.get(t);return!!n&&n.kind===\"el\"&&n.tag===\"canvas\"}nodeLookup=null;setNodeLookup(t){this.nodeLookup=t}get cssEnv(){return this.env}get diagnostics(){return this.diag}canvasCommands(t){if(!Array.isArray(t)||this.stopReason!==null)return[];if(t.length>this.limits.maxCanvasCmds)return this.tooManyCanvasCmds(t.length),[];let n=[];for(let r of t){let i=this.canvasCmd(r);if(this.stopReason!==null)return[];i!==ep&&(i?n.push(i):this.diag(\"protocol-violation\",\"rejected canvas cmd \"+np(r)))}return n}renderedElement(t){if(!We(t))return null;if(this.nodeLookup){let r=this.nodeLookup(t);return r?{id:t,kind:\"el\",tag:r,ns:\"html\",rendered:!0,isStyle:!1,adopted:!1,parent:null,children:[],data:\"\",attached:!0}:null}let n=this.nodes.get(t);return n&&n.kind===\"el\"&&n.rendered?n:null}processOps(t){if(this.out=[],this.batchCanvasCmds.clear(),this.stopReason!==null)return[];if(Array.isArray(t)&&t.length>this.limits.maxOps&&this.limits.stop)return this.stop(`Ops limit exceeded: ${t.length} operations in one batch (max ${this.limits.maxOps})`),[];if(!Array.isArray(t)||t.length>this.limits.maxOps)return this.diag(\"protocol-violation\",\"ops batch is not an array or too large\"),[];for(let r of t){try{if(!vn(r)||!this.applyOp(r)){if(this.stopReason!==null)break;this.diag(\"protocol-violation\",\"rejected op \"+np(r))}}catch(i){this.diag(\"protocol-violation\",\"validator error: \"+i.message)}if(this.stopReason!==null)break}for(let r of this.dirtyStyles){if(this.stopReason!==null)break;let i=this.nodes.get(r);i&&this.out.push({op:\"css\",id:r,text:this.styleText(i)})}this.dirtyStyles.clear(),this.stopReason===null&&this.checkTotals();let n=this.out;return this.out=[],this.stopReason!==null?[]:n}applyOp(t){switch(t.op){case\"el\":return this.opEl(t);case\"text\":case\"comment\":return this.opCharData(t);case\"attr\":return this.opAttr(t);case\"rattr\":return this.opRemoveAttr(t);case\"data\":return this.opData(t);case\"ins\":return this.opInsert(t);case\"rm\":return this.opRemove(t);case\"style\":return this.opStyle(t);case\"prop\":return this.opProp(t);case\"call\":return this.opCall(t);case\"canvas\":return this.opCanvas(t);default:return!1}}newNode(t,n){if(this.nodes.has(t)||this.nodes.size>=Zg)return null;let r={id:t,kind:\"el\",tag:\"\",ns:\"html\",rendered:!0,isStyle:!1,adopted:!1,parent:null,children:[],data:\"\",attached:!1,...n};return this.nodes.set(t,r),r}opEl(t){let{id:n,tag:r,ns:i,attrs:o}=t;if(!We(n)||!Un(r,64)||!iC.test(r)||i!==void 0&&i!==\"svg\"||o!==void 0&&!vn(o))return!1;let s=r.toLowerCase(),l,c=[],p=s===\"style\";i===\"svg\"?(p?l=\"style\":zo.has(s)&&s!==\"title\"?l=null:l=xf.get(s)??null,l===null&&!zo.has(s)&&this.diag(\"tag-dropped\",`<svg:${r}>`)):zo.has(s)?(l=null,Fo.has(s)?s!==\"script\"&&s!==\"title\"&&s!==\"meta\"&&this.diag(\"tag-dropped\",`<${s}>`):this.diag(\"profile\",`<${s}> dropped`)):Fa.has(s)?(l=Fa.get(s),c=[[\"data-tg-tag\",s]],this.diag(\"profile\",`<${s}> rendered as <${l}>`)):p||bf.has(s)?l=s:(l=\"span\",c=[[\"data-tg-tag\",s]],this.diag(\"tag-replaced\",`<${s}> rendered as <span>`));let f;i!==\"svg\"&&(s===\"html\"||s===\"head\"||s===\"body\")&&(this.adopted[s]?(l=\"div\",c=[[\"data-tg-tag\",s]]):(this.adopted[s]=!0,f=s));let m=this.newNode(n,{kind:\"el\",tag:l??\"\",ns:i===\"svg\"?\"svg\":\"html\",rendered:l!==null,isStyle:p,adopted:f!==void 0});if(!m)return!1;if(l===null)return!0;let g=[...c];if(l===\"canvas\"&&m.ns===\"html\"&&!this.sizeCanvas(n,300,150))return!1;if(o){for(let[S,x]of Object.entries(o))if(typeof x==\"string\"){if(x.length>this.limits.maxAttr){if(this.limits.stop)return this.tooLongAttr(x.length);continue}if(!this.sizeCanvasAttr(m,S,x))return!1;for(let L of this.sanitizeAttr(m,S,x)){let Q=this.attrText(L[0],L[1]);(Q===null||this.updateTextSlot(m,\"attr:\"+L[0],Q))&&g.push(L)}}}return this.out.push({op:\"el\",id:n,tag:l,...m.ns===\"svg\"?{ns:\"svg\"}:{},attrs:g,...f?{adopt:f}:{}}),!0}opCharData(t){let{id:n,data:r}=t;if(!We(n)||typeof r!=\"string\")return!1;if(r.length>this.limits.maxText)return this.tooLongText(r.length);if(this.nodes.has(n)||this.nodes.size>=Zg)return!1;let i=t.op===\"text\"?\"text\":\"comment\",o=i===\"text\"?Zu(r):0;return o&&this.limits.complexTextBudget&&this.complexText+o>this.limits.complexTextBudget?(this.diag(\"text-budget\",`document complex-script text over ${this.limits.complexTextBudget} units`),!1):this.limits.textBudget&&Ns(r)&&!this.takeChurn(Ms(r))?this.overChurn():this.newNode(n,{kind:i,data:r,rendered:i===\"text\",complex:o})?(this.complexText+=o,this.totalText+=r.length,i===\"text\"&&this.out.push({op:\"text\",id:n,data:r}),!0):!1}opData(t){let{id:n,data:r}=t;if(!We(n)||typeof r!=\"string\")return!1;if(r.length>this.limits.maxText)return this.tooLongText(r.length);let i=this.nodes.get(n);if(!i||i.kind===\"el\"||i.kind===\"doc\")return!1;let o=r.length-i.data.length,s=i.kind===\"text\"?Zu(r):0,l=s-(i.complex??0);if(l>0&&this.limits.complexTextBudget&&this.complexText+l>this.limits.complexTextBudget)return this.diag(\"text-budget\",`document complex-script text over ${this.limits.complexTextBudget} units`),!1;if(this.limits.textBudget&&Ns(r)&&!this.takeChurn(Ms(r)))return this.overChurn();this.complexText+=l,this.totalText+=o,i.complex=s,i.data=r;let c=i.parent!==null?this.nodes.get(i.parent):null;return c?.isStyle?this.dirtyStyles.add(c.id):i.rendered&&this.out.push({op:\"data\",id:n,data:r}),!0}opInsert(t){let{parent:n,id:r,before:i}=t;if(!We(r)||!(We(n)||n===yi)||i!==null&&!We(i))return!1;let o=this.nodes.get(r),s=this.nodes.get(n);if(!o||!s||s.kind===\"text\"||s.kind===\"comment\")return!1;for(let m=s;m;m=m.parent!==null?this.nodes.get(m.parent):void 0)if(m===o)return!1;let l=null;if(i!==null&&(l=this.nodes.get(i)??null,!l||l.parent!==s.id||l===o))return!1;if(this.unlink(o),o.parent=s.id,l?s.children.splice(s.children.indexOf(l.id),0,r):s.children.push(r),s.isStyle&&this.dirtyStyles.add(s.id),!(o.rendered&&!o.adopted&&s.rendered&&!s.isStyle&&s.kind===\"el\"))return s.isStyle&&o.rendered&&o.kind!==\"el\"?(this.out.push({op:\"rm\",id:r}),o.rendered=!1):o.attached&&this.out.push({op:\"ins\",parent:nC,id:r,before:null}),o.attached=!1,!0;let p=null,f=s.children.indexOf(r);for(let m=f+1;m<s.children.length;m++){let g=this.nodes.get(s.children[m]);if(g&&g.attached){p=g.id;break}}return this.out.push({op:\"ins\",parent:s.id,id:r,before:p}),o.attached=!0,!0}unlink(t){if(t.parent===null)return;let n=this.nodes.get(t.parent);if(n){let r=n.children.indexOf(t.id);r>=0&&n.children.splice(r,1),n.isStyle&&this.dirtyStyles.add(n.id)}t.parent=null}opRemove(t){let{id:n}=t;if(!We(n))return!1;let r=this.nodes.get(n);if(!r)return!1;if(r.adopted){for(let o of[...r.children])this.opRemove({id:o});return!0}this.unlink(r),r.rendered&&this.out.push({op:\"rm\",id:n});let i=[r];for(;i.length;){let o=i.pop();this.complexText-=o.complex??0,this.totalText-=o.data.length,this.cssRules-=o.cssRules??0,this.cssKeyframes-=o.cssKeyframes??0;let s=this.canvasSizes.get(o.id);s&&(this.canvasPixels-=s[0]*s[1],this.canvasSizes.delete(o.id));for(let l of o.textSlots?.values()??[])this.totalText-=l.length,this.complexText-=l.complex;this.nodes.delete(o.id),this.dirtyStyles.delete(o.id);for(let l of o.children){let c=this.nodes.get(l);c&&(c.rendered&&!c.attached&&this.out.push({op:\"rm\",id:c.id}),i.push(c))}}return!0}opAttr(t){let{id:n,name:r,value:i}=t;if(!We(n)||!Un(r,128)||typeof i!=\"string\")return!1;if(i.length>this.limits.maxAttr)return this.tooLongAttr(i.length);let o=this.nodes.get(n);if(!o||o.kind!==\"el\")return!1;if(!o.rendered)return!0;if(!this.sizeCanvasAttr(o,r,i))return!1;let s=this.sanitizeAttr(o,r,i);if(s.length===0){let l=this.canonAttrName(o,r);return l&&(this.releaseTextSlot(o,\"attr:\"+l),this.out.push({op:\"rattr\",id:n,name:l})),!0}for(let[l,c]of s){let p=this.attrText(l,c);if(p!==null&&!this.updateTextSlot(o,\"attr:\"+l,p))return!1;this.out.push({op:\"attr\",id:n,name:l,value:c})}return!0}opRemoveAttr(t){let{id:n,name:r}=t;if(!We(n)||!Un(r,128))return!1;let i=this.nodes.get(n);if(!i||i.kind!==\"el\")return!1;if(!i.rendered)return!0;let o=this.canonAttrName(i,r);return o?this.sizeCanvasAttr(i,o,null)?(this.releaseTextSlot(i,\"attr:\"+o),this.out.push({op:\"rattr\",id:n,name:o}),i.tag===\"a\"&&(o===\"href\"||o===\"xlink:href\")&&this.out.push({op:\"rattr\",id:n,name:\"data-tg-link\"}),!0):!1:!0}canonAttrName(t,n){if(!rC.test(n))return null;let r=n.toLowerCase();return r.startsWith(\"on\")?null:t.ns===\"svg\"?r===\"xlink:href\"?\"href\":kf.get(r)??r:r}sanitizeAttr(t,n,r){let i=this.canonAttrName(t,n);if(i===null)return[];let o=i.toLowerCase(),s=t.tag;if(o===\"style\")return[[\"style\",Yg(r,this.diag,this.env)]];if(Sf.has(o))return this.sanitizeUrlAttr(t,i,o,r);if(o.startsWith(\"data-tg-\"))return[];if(o.startsWith(\"data-\")||o.startsWith(\"aria-\"))return[[o,r]];if(Ef.has(o))return[];if(!(t.ns===\"svg\"?Ba:za).has(o))return this.diag(\"attr-dropped\",`${s}[${o}]`),[];if(t.ns===\"svg\"){if(sC.has(s)){if(o===\"attributename\"&&/href|src/i.test(r))return[];if(Tf.has(o)){let l=[];for(let c of r.split(\";\")){let p=Xu(c,this.diag,`${s}[${o}]`,this.env);if(p===null)return[];l.push(p)}return[[i,l.join(\";\")]]}}if(vf.has(o)){let l=Xu(r,this.diag,`${s}[${o}]`,this.env);return l===null?[]:[[i,l]]}if(o===\"font-family\"){let l=Rs(\"font-family\",r,this.diag,this.env);return l&&l.value?[[i,l.value]]:[]}}return[[i,r]]}sanitizeUrlAttr(t,n,r,i){let o=t.tag,s=()=>(this.diag(\"url-blocked\",`${o}[${r}]=${sy(i,80)}`),[]),l=r===\"href\"||r===\"xlink:href\";if(o===\"a\"&&l){if(dg(i)){let c=Hn(i,\"fragment-only\");return c?[[n,c]]:[[n,\"#\"]]}return[[n,\"#\"],[\"data-tg-link\",\"\"]]}if(t.ns===\"svg\"){if(!l)return s();if(o===\"image\"){let c=Hn(i,\"image\");return c&&!c.startsWith(\"#\")?[[n,c]]:s()}if(aC.has(o)){let c=Hn(i,o===\"feImage\"?\"image\":\"fragment-only\");return c?[[n,c]]:s()}return s()}if(r===\"src\"){if(o===\"img\"||o===\"input\"){let c=Hn(i,\"image\");return c&&!c.startsWith(\"#\")?[[\"src\",c]]:(s(),o===\"img\"?[[\"src\",fg],[\"data-tg-placeholder\",\"\"]]:[])}return s()}return r===\"usemap\"?[]:s()}opStyle(t){let{id:n,name:r,value:i,important:o}=t;if(!We(n)||!Un(r,128)||typeof i!=\"string\")return!1;if(i.length>this.limits.maxAttr)return this.tooLongAttr(i.length);let s=this.nodes.get(n);if(!s||s.kind!==\"el\")return!1;if(!s.rendered)return!0;if(!/^-{0,2}[a-zA-Z_][\\w-]*$/.test(r))return!1;let l=Rs(r,i,this.diag,this.env),c=l?l.value:\"\";return this.budgeted&&!this.updateTextSlot(s,\"style:\"+r,Ps(c))&&(this.releaseTextSlot(s,\"style:\"+r),c=\"\"),this.out.push({op:\"style\",id:n,name:r,value:c,important:o===!0}),!0}opProp(t){let{id:n,name:r,value:i}=t;if(!We(n)||typeof r!=\"string\")return!1;let o=Object.prototype.hasOwnProperty.call(Qa,r)?Qa[r]:null,s=this.nodes.get(n);return!o||!s||s.kind!==\"el\"||typeof i!==o.type?!1:typeof i==\"string\"&&i.length>this.limits.maxText?this.tooLongText(i.length):typeof i==\"number\"&&!Number.isFinite(i)?!1:!s.rendered||o.tags&&!o.tags.has(s.tag)?!0:typeof i==\"string\"&&!this.updateTextSlot(s,\"prop:\"+r,i)?!1:(this.out.push({op:\"prop\",id:n,name:r,value:i}),!0)}updateTextSlot(t,n,r){if(!this.limits.textBudget&&!this.limits.complexTextBudget)return!0;if(r.length>this.limits.maxText)return this.tooLongText(r.length);let i=t.textSlots?.get(n),o=r.length-(i?.length??0),s=Zu(r),l=s-(i?.complex??0);return l>0&&this.limits.complexTextBudget&&this.complexText+l>this.limits.complexTextBudget?(this.diag(\"text-budget\",`document complex-script text over ${this.limits.complexTextBudget} units`),!1):this.limits.textBudget&&Ns(r)&&!this.takeChurn(Ms(r))?this.overChurn():(this.totalText+=o,this.complexText+=l,r.length?(t.textSlots??=new Map).set(n,{length:r.length,complex:s}):t.textSlots?.delete(n),!0)}releaseTextSlot(t,n){let r=t.textSlots?.get(n);r&&(this.totalText-=r.length,this.complexText-=r.complex,t.textSlots.delete(n))}opCall(t){let{id:n,method:r,args:i}=t;if(!We(n)||typeof r!=\"string\"||!Object.prototype.hasOwnProperty.call(Ha,r))return!1;let o=this.nodes.get(n);if(!o||o.kind!==\"el\")return!1;if(!o.rendered)return!0;if(r===\"scrollIntoView\"&&(i===void 0||Array.isArray(i)&&i.length===0))return this.out.push({op:\"call\",id:n,method:r,args:[0,3,0,0]}),!0;let s=Ha[r],l=[];if(s>0){if(!Array.isArray(i))return!1;for(let c=0;c<s;c++){if(!Ue(i[c]))return!1;l.push(i[c])}}return r===\"scrollIntoView\"&&l.some((c,p)=>!Number.isInteger(c)||c<0||c>[3,3,2,1][p])?!1:(this.out.push({op:\"call\",id:n,method:r,args:l}),!0)}opCanvas(t){let{id:n,cmds:r}=t;if(!We(n)||!Array.isArray(r))return!1;let i=(this.batchCanvasCmds.get(n)??0)+r.length;if(i>this.limits.maxCanvasCmds)return this.tooManyCanvasCmds(i);this.batchCanvasCmds.set(n,i);let o=this.nodes.get(n);if(!o||o.kind!==\"el\"||o.tag!==\"canvas\")return!1;let s=[];for(let l of r){let c=this.canvasCmd(l);if(this.stopReason!==null)return!1;if(c!==ep){if(c&&c[0]===\"r\"&&!this.sizeCanvas(n,Math.trunc(Number(c[1])),Math.trunc(Number(c[2]))))return!1;c?c[0]===\"c\"&&(c[1]===\"fillText\"||c[1]===\"strokeText\")&&typeof c[2]==\"string\"&&this.limits.textBudget&&Ns(c[2])&&!this.takeChurn(Ms(c[2]))?this.overChurn():s.push(c):this.diag(\"protocol-violation\",\"rejected canvas cmd \"+np(l))}}return s.length&&this.out.push({op:\"canvas\",id:n,cmds:s}),!0}tooManyCanvasCmds(t){return this.stop(`Canvas limit exceeded: ${t} commands in one send (max ${this.limits.maxCanvasCmds})`)}canvasArg(t){if(t===null||typeof t==\"boolean\")return t;if(typeof t==\"number\")return Number.isFinite(t)?t:void 0;if(typeof t==\"string\")return t.length<=this.limits.maxCanvasString?t:(this.tooLongText(t.length),void 0);if(Array.isArray(t))return t.length<=4096&&t.every(Ue)?t:void 0;if(vn(t)){if(Ue(t.g)&&Number.isInteger(t.g))return{g:t.g};if(Ue(t.p)&&Number.isInteger(t.p))return{p:t.p};if(We(t.n)){let n=this.renderedElement(t.n);return n&&(n.tag===\"canvas\"||n.tag===\"img\"||n.tag===\"image\")?{n:n.id}:void 0}if(Ue(t.w)&&Ue(t.h)&&typeof t.b64==\"string\")return{w:t.w,h:t.h,b64:t.b64}}}canvasArgs(t){let n=[];for(let r of t){let i=this.canvasArg(r);if(i===void 0)return null;n.push(i)}return n}outOfProfile(t){return this.diag(\"profile\",`canvas ${t}`),ep}canvasCmd(t){if(!Array.isArray(t)||t.length<2||t.length>16)return null;let[n,r,...i]=t;switch(n){case\"c\":{if(typeof r==\"string\"&&Wa.has(r))return this.outOfProfile(r);if(typeof r!=\"string\"||!Af.has(r))return null;let o=this.canvasArgs(i);return o?[\"c\",r,...o]:null}case\"s\":{if(typeof r==\"string\"&&Wa.has(r))return this.outOfProfile(r);if(typeof r!=\"string\"||!_f.has(r)||i.length!==1)return null;let o=this.canvasArg(i[0]);return o===void 0||Array.isArray(o)||r===\"font\"&&(typeof o!=\"string\"||(o=Yu(\"font\",o,this.diag),o===null))?null:[\"s\",r,o]}case\"r\":return Ue(r)&&Ue(i[0])&&r>=0&&i[0]>=0&&r<=16384&&i[0]<=16384?[\"r\",r,i[0]]:null;case\"g\":{if(!Ue(r)||typeof i[0]!=\"string\"||![\"linear\",\"radial\",\"conic\",\"pattern\"].includes(i[0]))return null;if(!Lf.has(i[0]))return this.diag(\"profile\",`canvas ${i[0]}`),[\"g\",r,\"linear\",0,0,0,0];let o=this.canvasArgs(i.slice(1));return o?[\"g\",r,i[0],...o]:null}case\"gs\":return Ue(r)&&Ue(i[0])&&typeof i[1]==\"string\"&&i[1].length<256?[\"gs\",r,i[0],i[1]]:null;case\"pn\":return typeof i[0]==\"string\"&&i[0].length>this.limits.maxText?this.tooLongText(i[0].length)||null:Ue(r)&&(i[0]===null||Un(i[0],this.limits.maxText))?[\"pn\",r,i[0]]:null;case\"pc\":{if(!Ue(r)||typeof i[0]!=\"string\"||!Pf.has(i[0]))return null;let o=this.canvasArgs(i.slice(1));return o?[\"pc\",r,i[0],...o]:null}default:return null}}validateQuery(t){if(!vn(t))return null;let n=()=>this.renderedElement(t.id);switch(t.q){case\"rect\":case\"rects\":case\"box\":case\"validity\":return n()?{q:t.q,id:t.id}:null;case\"cs\":{if(!n())return null;let r=typeof t.pseudo==\"string\"&&/^::?[a-z-]{1,32}$/.test(t.pseudo)?t.pseudo:void 0,i=typeof t.prop==\"string\"&&(/^--[\\w-]{1,128}$/.test(t.prop)||/^-?[a-z][a-z-]{0,63}$/.test(t.prop))?t.prop:void 0;return{q:\"cs\",id:t.id,...r?{pseudo:r}:{},...i?{prop:i}:{}}}case\"svg\":{if(!n()||typeof t.method!=\"string\"||!Rf.has(t.method))return null;let r=Array.isArray(t.args)&&t.args.length<=4&&t.args.every(Ue)?t.args:[];return{q:\"svg\",id:t.id,method:t.method,args:r}}case\"measureText\":{if(!Un(t.font,512)||!Un(t.text,1e5))return null;let r=Yu(\"font\",t.font,()=>{});return r===null?null:{q:\"measureText\",font:r,text:t.text}}case\"imageData\":return null;case\"canvasCall\":{let r=n();if(!r||r.tag!==\"canvas\"||typeof t.method!=\"string\"||!Mf.has(t.method))return null;let i=Array.isArray(t.args)?this.canvasArgs(t.args.slice(0,8)):[];return i?{q:\"canvasCall\",id:r.id,method:t.method,args:i}:null}case\"elementFromPoint\":return Ue(t.x)&&Ue(t.y)?{q:\"elementFromPoint\",x:t.x,y:t.y}:null;case\"matchMedia\":return Un(t.query,1024)?{q:\"matchMedia\",query:t.query}:null;case\"viewport\":return{q:\"viewport\"};case\"anims\":return n()?{q:\"anims\",id:t.id,subtree:t.subtree===!0}:null;default:return null}}liveAnims=new Set;validateAnim(t){if(!Array.isArray(t)||t.length>cC)return this.diag(\"protocol-violation\",\"anim batch is not an array or too large\"),[];let n=this.liveAnims,r=[],i=o=>{n.delete(o)&&r.push({aid:o,remove:!0})};for(let o of t){if(!vn(o)||!Number.isInteger(o.aid)||o.aid<1||o.aid>2147483647){this.diag(\"protocol-violation\",\"rejected anim record\");continue}let s=o.aid;if(o.remove===!0){i(s);continue}if(o.css!==void 0){let x=o.css;if(!(this.renderedElement(o.target)&&vn(x)&&(x.kind===\"animation\"||x.kind===\"transition\")&&typeof x.name==\"string\"&&/^[\\w-]{1,128}$/.test(x.name)&&ft(x.origin,1e15)&&(o.startTime===null||ft(o.startTime,1e15))&&(o.holdTime===null||ft(o.holdTime,1e12))&&ft(o.playbackRate,1e3)&&typeof o.cancelled==\"boolean\")){this.diag(\"protocol-violation\",\"rejected css anim record\");continue}r.push({aid:s,target:o.target,css:{kind:x.kind,name:x.name,origin:x.origin},startTime:o.startTime,holdTime:o.holdTime,playbackRate:o.playbackRate,cancelled:o.cancelled});continue}let l=this.renderedElement(o.target),c=o.timing;if(!(!!l&&Array.isArray(o.keyframes)&&o.keyframes.length<=uC&&vn(c)&&ft(c.duration,tp)&&c.duration>=0&&ft(c.delay,tp)&&ft(c.endDelay,tp)&&(c.iterations===null||ft(c.iterations,1e9)&&c.iterations>=0)&&ft(c.iterationStart,1e9)&&c.iterationStart>=0&&dC.has(c.direction)&&fC.has(c.fill)&&oy(c.easing)!==null&&iy.has(o.composite)&&mC.has(o.iterationComposite)&&(o.startTime===null||ft(o.startTime,1e15))&&(o.holdTime===null||ft(o.holdTime,1e12))&&(o.startTime!==null||o.holdTime!==null)&&ft(o.playbackRate,1e3))){l&&this.diag(\"protocol-violation\",\"rejected anim record\"),i(s);continue}let f=c,m=[],g=0,S=!1;for(let x of o.keyframes){if(!vn(x)||!ft(x.offset,1)||x.offset<g||x.offset>1||oy(x.easing)===null||!(x.composite===null||iy.has(x.composite))||!vn(x.values)){S=!0;break}g=x.offset;let L=Object.keys(x.values);if(L.length>pC){S=!0;break}let Q={};for(let R of L){let H=x.values[R];if(typeof H!=\"string\"||H.length>4096||!/^(?:--[\\w-]{1,128}|-?[a-z][a-z-]{0,63})$/.test(R)||/^(?:-webkit-)?(?:animation|transition)(?:-|$)/.test(R)||UE.has(R))continue;let F=Rs(R,H,this.diag,this.env);F&&F.value!==\"\"&&(Q[R]=F.value)}m.push({offset:x.offset,easing:x.easing,composite:x.composite,values:Q})}if(S){this.diag(\"protocol-violation\",\"rejected anim keyframes\"),i(s);continue}if(!n.has(s)&&n.size>=this.limits.maxLiveAnims){this.diag(\"animation-limit\",\"more than \"+this.limits.maxLiveAnims+\" live script animations\");continue}n.add(s),r.push({aid:s,target:o.target,keyframes:m,timing:{duration:f.duration,delay:f.delay,endDelay:f.endDelay,iterations:f.iterations,iterationStart:f.iterationStart,direction:f.direction,fill:f.fill,easing:f.easing},composite:o.composite,iterationComposite:o.iterationComposite,startTime:o.startTime,holdTime:o.holdTime,playbackRate:o.playbackRate})}return r}validateListen(t){return Array.isArray(t)?t.filter(n=>typeof n==\"string\"&&(oC.has(n)||n===\"scroll\"&&this.cssEnv.nativeScrolling===!0)):[]}validatePreventDefault(t){return Array.isArray(t)?t.filter(n=>typeof n==\"string\"&&/^\\d{1,10}:[a-z]{1,20}(?::[\\w ]{1,20})?$/.test(n)).slice(0,256):[]}},cC=4096,uC=64,pC=64,tp=864e5,dC=new Set([\"normal\",\"reverse\",\"alternate\",\"alternate-reverse\"]),fC=new Set([\"none\",\"forwards\",\"backwards\",\"both\"]),iy=new Set([\"replace\",\"add\",\"accumulate\"]),mC=new Set([\"replace\",\"accumulate\"]),Is=\"[+-]?(?:\\\\d+\\\\.?\\\\d*|\\\\.\\\\d+)(?:[eE][+-]?\\\\d+)?\",hC=new RegExp(\"^(?:linear|ease|ease-in|ease-out|ease-in-out|step-start|step-end|cubic-bezier\\\\(\\\\s*\"+Is+\"\\\\s*,\\\\s*\"+Is+\"\\\\s*,\\\\s*\"+Is+\"\\\\s*,\\\\s*\"+Is+\"\\\\s*\\\\)|steps\\\\(\\\\s*\\\\d{1,6}\\\\s*(?:,\\\\s*(?:start|end|jump-start|jump-end|jump-both|jump-none)\\\\s*)?\\\\)|linear\\\\([0-9eE.%,\\\\s+-]{1,8192}\\\\))$\");function oy(e){return typeof e==\"string\"&&e.length<=8192&&hC.test(e)&&e.split(\",\").length<=257?e:null}function ft(e,t){return typeof e==\"number\"&&Number.isFinite(e)&&Math.abs(e)<=t}function sy(e,t){if(e.length<=t)return e;let n=e.charCodeAt(t-1);return e.slice(0,n>=55296&&n<=56319?t-1:t)+\"\\u2026\"}function np(e){try{return sy(JSON.stringify(e),160)}catch{return\"[unserializable]\"}}var ay=new Set([\"click\",\"dblclick\",\"mousedown\",\"mouseup\",\"pointerdown\",\"pointerup\"]);var gC=e=>Number(e.detail)>0;function yC(e){let t=String(e.type??\"\");return ay.has(t)?t===\"click\"||t===\"dblclick\"?gC(e):!0:!1}var Ds=class{n=0;pressOpen=!1;lastType=\"\";gestureFor(t){let n=String(t.type??\"\");if(!ay.has(n))return 0;let r=!1;return n===\"mousedown\"?r=this.lastType===\"pointerdown\":n===\"pointerup\"||n===\"mouseup\"?r=this.pressOpen:n===\"click\"?r=this.pressOpen:n===\"dblclick\"&&(r=this.lastType===\"click\"),!r&&!yC(t)?(this.pressOpen=!1,this.lastType=\"\",0):(r||this.n++,this.pressOpen=n!==\"click\"&&n!==\"dblclick\",this.lastType=n,this.n)}pressBegan(){this.pressOpen=!1,this.lastType=\"\"}};function ip(e){return typeof e==\"number\"&&Number.isFinite(e)?e:void 0}document.currentScript?.remove();var Tn=hf(yf(document,!0)),op=new Ds,Ne=null,uy=!1,sp=null,Fs=null,zs=(e,t=[])=>sp?.postMessage(e,t),ap=e=>zs({type:\"tw-engine\",msg:e,nodes:Ne?.nodeCount??0}),bC=e=>{switch(e.type){case\"ops\":{if(!Ne)return;let t=Ne.processOps(e.ops);if(Ne.stopped)return Ki.kill(Ne.stopped);t.length&&Tn.onMessage({type:\"ops\",ops:t});return}case\"listen\":Ne&&Tn.onMessage({type:\"listen\",types:Ne.validateListen(e.types),since:ip(e.since)});return;case\"pd\":Ne&&Tn.onMessage({type:\"preventDefault\",keys:Ne.validatePreventDefault(e.keys)});return;case\"anim\":{if(!Ne)return;let t=Ne.validateAnim(e.anims),n=ip(e.now);t.length&&n!==void 0&&Tn.onMessage({type:\"anim\",now:n,anims:t});return}case\"raf\":Tn.onMessage({type:\"requestFrame\"});return;case\"query\":return;case\"loaded\":Ne?.markLoaded(),ap(e);return;default:ap(e)}},xC=e=>{let t=null;try{t=Ne?.validateQuery(JSON.parse(e))??null}catch{}if(!t)return{json:'{\"error\":\"invalid query\"}'};t.q===\"matchMedia\"&&(t.query=Ne.rewriteMediaQuery(t.query)),Fs=null,Tn.onMessage({type:\"query\",qid:0,query:t});let n=Fs;return Fs=null,n?{json:JSON.stringify(n.result??null),binary:n.binary}:{json:'{\"error\":\"no answer\"}'}},Ki=Qd({post:bC,query:xC,parseHTML:Wd});function wC(e,t){switch(e.type){case\"result\":Fs=e;return;case\"event\":{if(uy)return;e.ev?.type===\"pointerdown\"&&op.pressBegan();let n=e.trusted===!0?op.gestureFor(e.ev):0;n&&zs({type:\"tw-gesture\",gesture:n}),Ki.receive(n?{type:\"event\",ev:e.ev,gesture:n}:{type:\"event\",ev:e.ev});return}case\"gesture\":op.pressBegan(),zs(e,t);return;case\"frame\":Ki.receive({type:\"frame\",time:e.time});return;case\"resize\":Ki.receive({type:\"resize\",entries:e.entries});return;default:zs(e,t)}}function kC(e){if(e?.type===\"tw-engine\"){let t=e.msg;if(t.type===\"init\"||t.type===\"warm\")uy=t.config.isPreview===!0,Ne=new Os((n,r)=>ap({type:\"diag\",kind:n,detail:r}),{colorScheme:t.config.theme,scope:\"document\"}),Ne.setPolicy(Sd(t.config.policy));else if(t.type===\"theme\"&&Ne){let n=Ne.setTheme(t.theme);n.length&&Tn.onMessage({type:\"ops\",ops:n})}Ki.receive(t);return}Tn.onMessage(e)}var ly=new MessageChannel,cy=()=>{sp=ly.port1,Tn.init(wC),sp.onmessage=e=>kC(e.data),window.parent.postMessage({type:\"tw-renderer-ready\"},\"*\",[ly.port2])};document.readyState===\"loading\"?document.addEventListener(\"DOMContentLoaded\",cy,{once:!0}):cy();})();\n";
//#endregion
//#region src/vendor/widget-sandbox/src/host/frame-renderer.ts
var FrameEngineRenderer = class extends IframeRenderer {
	/** `url`: the engine frame document served from another site instead of srcdoc. */
	constructor(container, theme, url) {
		super(container, theme, {
			js: _virtual_frame_bundle_default,
			wasm: true,
			url
		});
		_defineProperty(
			this,
			/** Engine → host messages, plus the frame validator's node count for stats. */
			"onEngine",
			null
		);
		_defineProperty(
			this,
			/** The frame numbered a trusted press (it does what WidgetHost does with a renderer event, in its own thread). */
			"onGesture",
			null
		);
	}
	receive(data) {
		if (data?.type === "tw-engine") this.onEngine?.(data.msg, Number(data.nodes) || 0);
		else if (data?.type === "tw-gesture") {
			if (Number.isInteger(data.gesture) && data.gesture > 0) this.onGesture?.(data.gesture);
		} else super.receive(data);
	}
	/** Host → engine message (what a worker would get through postMessage). */
	sendEngine(msg, transfer = []) {
		this.post({
			type: "tw-engine",
			msg
		}, transfer);
	}
};
//#endregion
//#region src/vendor/widget-sandbox/src/host/html-tree.ts
var SVG_NS = "http://www.w3.org/2000/svg";
/**
* DOMParser parses with scripting off, where a <noscript> holds markup: in the head a <script> in it comes out after it
* (the shim would run it) and other markup goes on into the body, shown. A browser with scripting on, and parse5, keep
* its content as text: HTML with one is left to the shim's parse5.
*/
var NOSCRIPT = /<noscript/i;
var inert = null;
/** An inert document to parse fragments in (an element's innerHTML there runs the fragment algorithm with it as context). */
function inertDocument() {
	return inert ?? (inert = new DOMParser().parseFromString("", "text/html"));
}
function attrsOf(el) {
	const out = [];
	for (const a of Array.from(el.attributes)) out.push(a.name, a.value);
	return out;
}
function childrenOf(parent) {
	const out = [];
	for (let c = parent.firstChild; c; c = c.nextSibling) if (c.nodeType === 3) out.push(c.data);
	else if (c.nodeType === 8) out.push([0, c.data]);
	else if (c.nodeType === 1) {
		const el = c;
		const name = el.localName;
		const svg = el.namespaceURI === SVG_NS;
		out.push([
			name,
			svg ? 1 : 0,
			attrsOf(el),
			childrenOf(name === "template" && !svg ? el.content : el)
		]);
	}
	return out;
}
/**
* The glue's `parse` host call: `{html}` is a whole document, `{html, context, svg}` a fragment for innerHTML on a
* `context` element (in the SVG namespace when `svg`). Returns the tree as JSON, or '' (the shim parses itself).
*/
function parseHtmlTree(arg) {
	let req;
	try {
		req = JSON.parse(arg);
	} catch {
		return "";
	}
	if (typeof req?.html !== "string" || req.html.length > 16384 || NOSCRIPT.test(req.html)) return "";
	if (typeof req.context === "string") {
		const doc = inertDocument();
		let ctx;
		try {
			ctx = req.svg === true ? doc.createElementNS(SVG_NS, req.context) : doc.createElement(req.context);
		} catch {
			return "";
		}
		ctx.innerHTML = req.html;
		return JSON.stringify(childrenOf(ctx instanceof HTMLTemplateElement ? ctx.content : ctx));
	}
	const doc = new DOMParser().parseFromString(req.html, "text/html");
	const html = doc.documentElement, head = doc.head, body = doc.body;
	if (!html || !head || body?.localName !== "body") return "";
	return JSON.stringify([
		attrsOf(html),
		attrsOf(head),
		childrenOf(head),
		attrsOf(body),
		childrenOf(body)
	]);
}
//#endregion
//#region src/vendor/widget-sandbox/src/host/user-activation.ts
/** Pointer presses only: widgets get no keyboard (docs/decisions.md, "Profile v1"), so no key is a gesture. */
var TYPES = /* @__PURE__ */ new Set([
	"click",
	"dblclick",
	"mousedown",
	"mouseup",
	"pointerdown",
	"pointerup"
]);
/** A click made by a pointer has a click count; a click a key press activates has `detail` 0. */
var pointerClick = (ev) => Number(ev.detail) > 0;
/** A pointer press or release, or a click with a click count. Keys never count. */
function isUserActivation(ev) {
	const type = String(ev.type ?? "");
	if (!TYPES.has(type)) return false;
	return type === "click" || type === "dblclick" ? pointerClick(ev) : true;
}
/**
* One physical pointer press (pointerdown … click / dblclick) is one gesture.
* A click without a click count (`detail` 0: what Enter or Space on a focused
* control produces) is a gesture only as the end of a press already open.
*/
var GestureCounter = class {
	constructor() {
		_defineProperty(this, "n", 0);
		_defineProperty(this, "pressOpen", false);
		_defineProperty(this, "lastType", "");
	}
	/** The gesture number for this event, 0 when it is not a user activation. */
	gestureFor(ev) {
		const type = String(ev.type ?? "");
		if (!TYPES.has(type)) return 0;
		let continues = false;
		if (type === "mousedown") continues = this.lastType === "pointerdown";
		else if (type === "pointerup" || type === "mouseup") continues = this.pressOpen;
		else if (type === "click") continues = this.pressOpen;
		else if (type === "dblclick") continues = this.lastType === "click";
		if (!continues && !isUserActivation(ev)) {
			this.pressOpen = false;
			this.lastType = "";
			return 0;
		}
		if (!continues) this.n++;
		this.pressOpen = type !== "click" && type !== "dblclick";
		this.lastType = type;
		return this.n;
	}
	/**
	* A primary press began: the renderer's `gesture` claim, sent for every one, whether the widget listens or not, and
	* before the press's own events. What follows is a new gesture, not the end of an open one: a finger's pointerdown is
	* not `trusted` (it may become the chat's scroll), so without this its release continued a press that had ended
	* without a click (a drag), whose gesture was spent.
	*/
	pressBegan() {
		this.pressOpen = false;
		this.lastType = "";
	}
};
/** Host side: gestures handed to the worker, and the last one a privileged call consumed. */
var HostActivationGate = class {
	constructor() {
		_defineProperty(this, "issued", /* @__PURE__ */ new Map());
		_defineProperty(this, "consumed", 0);
	}
	issue(gesture, now) {
		this.issued.set(gesture, now);
		if (this.issued.size > 64) for (const k of [...this.issued.keys()].slice(0, this.issued.size - 64)) this.issued.delete(k);
	}
	/** True once per issued gesture, while the widget is visible and the gesture is recent. */
	accept(gesture, now, visible) {
		if (!this.available(gesture, now, visible)) return false;
		this.consumed = gesture;
		return true;
	}
	/** What `accept` would say, without consuming the gesture (a request consumes it only when it goes out as a press's). */
	available(gesture, now, visible) {
		const n = typeof gesture === "number" && Number.isInteger(gesture) ? gesture : 0;
		const at = this.issued.get(n);
		return visible && n > this.consumed && at !== void 0 && now - at <= 5e3;
	}
};
//#endregion
//#region src/vendor/widget-sandbox/src/host/allowlist.ts
var words = (s) => s.trim().split(/\s+/);
var P = PROFILE_TABLES;
var elementsWith = (action) => Object.entries(P.html.elements).filter(([, a]) => a === action).map(([t]) => t);
/**
* Elements that are never rendered, together with their whole subtree, whatever
* the profile says. (`style` is not here: it is handled separately through the
* CSS sanitizer.) `audio`/`video`/`source`/`track` are dropped on purpose: a chat
* bubble has no use for media playback, and `data:` media would hand the
* platform's codec stack to the widget (and autoplay / battery).
*/
var SECURITY_DROPPED_TAGS = new Set(words(`
  script iframe frame frameset object embed link meta base portal noscript set title template applet param
  noembed noframes plaintext xmp listing slot track area map math metadata fencedframe audio video source
`));
/** HTML elements rendered as-is. */
var HTML_TAGS = new Set(elementsWith("keep").filter((t) => !SECURITY_DROPPED_TAGS.has(t)));
/** HTML elements outside the profile that keep their content: rendered as this element, with `data-tg-tag` naming the original. */
var REPLACED_TAGS = new Map([...elementsWith("span").map((t) => [t, "span"]), ...elementsWith("div").map((t) => [t, "div"])]);
/** Elements dropped with their subtree: the security list and the profile's (form controls). */
var DROPPED_TAGS = /* @__PURE__ */ new Set([...SECURITY_DROPPED_TAGS, ...elementsWith("drop")]);
/** Canonical (case-sensitive) names of allowed SVG elements, keyed by lowercase. */
var SVG_TAGS = new Map(P.svg.elements.map((t) => [t.toLowerCase(), t]));
/** HTML attributes allowed on any element (lowercase); `data-*`, `aria-*` and `style` are handled apart. */
var HTML_ATTRS = new Set(P.html.attributes);
/** SVG attributes (lowercase keys of the canonical names). */
var SVG_ATTRS = P.svg.attributes;
var SVG_ALLOWED_ATTRS = new Set(SVG_ATTRS.map((a) => a.toLowerCase()));
[...HTML_ATTRS, ...SVG_ALLOWED_ATTRS];
/** lowercase → canonical case for SVG attributes (HTML-parser style adjustment). */
var SVG_ATTR_CASE = new Map(SVG_ATTRS.filter((a) => a !== a.toLowerCase()).map((a) => [a.toLowerCase(), a]));
/**
* Every attribute that can carry a URL. None of these is ever passed through
* unchecked; unlisted (tag, attr) combinations are dropped. See validator.ts.
*/
var URL_ATTRS = new Set(words(`
  href xlink:href src srcset poster action formaction background ping data cite codebase manifest longdesc
  usemap profile icon archive classid lowsrc dynsrc srcdoc imagesrcset imagesizes attributionsrc
`));
/** Attributes whose value is CSS and may contain url(): parsed by the CSS sanitizer. */
var CSS_VALUE_ATTRS = new Set(words(`
  fill stroke filter mask clip-path marker marker-start marker-mid marker-end cursor color flood-color
  lighting-color stop-color
`));
/** Attribute names an SVG animation element may target. URL-like ones are excluded. */
var ANIMATION_VALUE_ATTRS = /* @__PURE__ */ new Set([
	"from",
	"to",
	"by",
	"values"
]);
/** Attributes dropped silently (noise, not worth a diagnostic). */
var SILENT_DROP_ATTRS = new Set(words(`
  xmlns xmlns:xlink target rel download autofocus nonce is loading decoding crossorigin referrerpolicy
  integrity fetchpriority charset http-equiv content async defer
`));
/** Properties settable through the `prop` op, with the tags they apply to (null = any): the profile's. */
var ALL_PROPS = {
	scrollTop: {
		type: "number",
		tags: null
	},
	scrollLeft: {
		type: "number",
		tags: null
	}
};
var inProfile = (all, names) => Object.fromEntries(Object.entries(all).filter(([k]) => names.includes(k)));
var PROPS = inProfile(ALL_PROPS, P.properties);
var METHODS = inProfile({
	scrollIntoView: 4,
	setPointerCapture: 1,
	releasePointerCapture: 1,
	scrollTo: 2,
	scrollBy: 2,
	observeResize: 0,
	unobserveResize: 0
}, P.methods);
/** Canvas 2D: methods that may be replayed (the profile's). Nothing here takes a URL. */
var CANVAS_METHODS = new Set(P.canvas.methods);
/** Canvas 2D: settable properties (the profile's). */
var CANVAS_PROPS = new Set(P.canvas.properties);
/** Canvas 2D calls and properties the shim may send that are outside the profile: dropped with a `profile` diagnostic, not a protocol violation. */
var CANVAS_OUT_OF_PROFILE = new Set(words(`
  putImageData globalCompositeOperation shadowBlur shadowColor shadowOffsetX shadowOffsetY filter
  letterSpacing wordSpacing fontKerning fontStretch fontVariantCaps textRendering
`));
/** Gradient kinds in the profile; a conic gradient or a pattern becomes a gradient that paints nothing. */
var CANVAS_GRADIENTS = new Set(P.canvas.gradients);
var CANVAS_PATH_METHODS = new Set(words(`
  moveTo lineTo bezierCurveTo quadraticCurveTo arc arcTo ellipse rect roundRect closePath addPath
`));
var SVG_QUERY_METHODS = new Set(words(`
  getBBox getComputedTextLength getTotalLength getPointAtLength getCTM getScreenCTM getSubStringLength
  getNumberOfChars
`));
var CANVAS_QUERY_METHODS = new Set(P.canvas.queries.filter((m) => m !== "measureText"));
//#endregion
//#region node_modules/.pnpm/css-tree@3.2.1/node_modules/css-tree/lib/tokenizer/char-code-definitions.js
var EOF = 0;
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
var CATEGORY = new Array(128);
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
var MIN_SIZE = 16384;
function adoptBuffer(buffer = null, size) {
	if (buffer === null || buffer.length < size) return new Uint32Array(Math.max(size + 1024, MIN_SIZE));
	return buffer;
}
//#endregion
//#region node_modules/.pnpm/css-tree@3.2.1/node_modules/css-tree/lib/tokenizer/OffsetToLocation.js
var N$4 = 10;
var F$2 = 12;
var R$2 = 13;
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
var OFFSET_MASK = 16777215;
var TYPE_SHIFT = 24;
var BLOCK_OPEN_TOKEN = 1;
var BLOCK_CLOSE_TOKEN = 2;
var balancePair$1 = /* @__PURE__ */ new Uint8Array(32);
balancePair$1[2] = 22;
balancePair$1[21] = 22;
balancePair$1[19] = 20;
balancePair$1[23] = 24;
var blockTokens = /* @__PURE__ */ new Uint8Array(32);
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
		offsetAndType[tokenCount] = 0 << TYPE_SHIFT | sourceLength;
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
			return balancePair$1[this.getTokenType(pairIndex)] === type ? pairIndex : -1;
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
var releasedCursors = null;
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
var MAX_LINE_LENGTH = 100;
var OFFSET_CORRECTION = 60;
var TAB_REPLACEMENT = "    ";
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
var NOOP = () => {};
var EXCLAMATIONMARK$3 = 33;
var NUMBERSIGN$4 = 35;
var SEMICOLON = 59;
var LEFTCURLYBRACKET$1 = 123;
var NULL = 0;
var arrayMethods = {
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
var listMethods = {
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
var trackNodes = /* @__PURE__ */ new Set([
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
var PLUSSIGN$9 = 43;
var HYPHENMINUS$6 = 45;
var code = (type, value) => {
	if (type === 9) type = value;
	if (typeof type === "string") type = Math.min(type.charCodeAt(0), 128) << 6;
	return type << 1;
};
var specPairs = [
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
var safePairs = specPairs.concat([
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
var spec = createMap(specPairs);
var safe = createMap(safePairs);
//#endregion
//#region node_modules/.pnpm/css-tree@3.2.1/node_modules/css-tree/lib/generator/create.js
var REVERSESOLIDUS = 92;
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
var { hasOwnProperty: hasOwnProperty$3 } = Object.prototype;
var noop$2 = function() {};
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
var defaultLoc = {
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
var SyntaxReferenceError = function(type, referenceName) {
	const error = createCustomError("SyntaxReferenceError", type + (referenceName ? " `" + referenceName + "`" : ""));
	error.reference = referenceName;
	return error;
};
var SyntaxMatchError = function(message, syntax, node, matchResult) {
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
var keywords = /* @__PURE__ */ new Map();
var properties = /* @__PURE__ */ new Map();
var HYPHENMINUS$5 = 45;
var keyword = getKeywordDescriptor;
var property = getPropertyDescriptor;
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
var cssWideKeywords = [
	"initial",
	"inherit",
	"unset",
	"revert",
	"revert-layer"
];
//#endregion
//#region node_modules/.pnpm/css-tree@3.2.1/node_modules/css-tree/lib/lexer/generic-an-plus-b.js
var PLUSSIGN$8 = 43;
var HYPHENMINUS$4 = 45;
var N$3 = 110;
var DISALLOW_SIGN$1 = true;
var ALLOW_SIGN$1 = false;
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
var PLUSSIGN$7 = 43;
var HYPHENMINUS$3 = 45;
var QUESTIONMARK$2 = 63;
var U$1 = 117;
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
var calcFunctionNames = [
	"calc(",
	"-moz-calc(",
	"-webkit-calc("
];
var comparisonFunctionNames = [
	"min(",
	"max(",
	"clamp("
];
var steppedValueFunctionNames = [
	"round(",
	"mod(",
	"rem("
];
var trigNumberFunctionNames = [
	"sin(",
	"cos(",
	"tan("
];
var trigAngleFunctionNames = [
	"asin(",
	"acos(",
	"atan(",
	"atan2("
];
var otherNumberFunctionNames = [
	"pow(",
	"sqrt(",
	"log(",
	"exp(",
	"sign("
];
var expNumberDimensionPercentageFunctionNames = ["hypot("];
var signFunctionNames = ["abs("];
var numberFunctionNames = [
	...calcFunctionNames,
	...comparisonFunctionNames,
	...steppedValueFunctionNames,
	...trigNumberFunctionNames,
	...otherNumberFunctionNames,
	...expNumberDimensionPercentageFunctionNames,
	...signFunctionNames
];
var percentageFunctionNames = [
	...calcFunctionNames,
	...comparisonFunctionNames,
	...steppedValueFunctionNames,
	...expNumberDimensionPercentageFunctionNames,
	...signFunctionNames
];
var dimensionFunctionNames = [
	...calcFunctionNames,
	...comparisonFunctionNames,
	...steppedValueFunctionNames,
	...trigAngleFunctionNames,
	...expNumberDimensionPercentageFunctionNames,
	...signFunctionNames
];
var balancePair = /* @__PURE__ */ new Map([
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
var tokenTypes = {
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
var productionTypes = {
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
var unitGroups = [
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
var length = [
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
var angle = [
	"deg",
	"grad",
	"rad",
	"turn"
];
var time = ["s", "ms"];
var frequency = ["hz", "khz"];
var resolution = [
	"dpi",
	"dpcm",
	"dppx",
	"x"
];
var flex = ["fr"];
var decibel = ["db"];
var semitones = ["st"];
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
var TAB$1 = 9;
var N$2 = 10;
var F$1 = 12;
var R$1 = 13;
var SPACE$3 = 32;
var NAME_CHAR = (/* @__PURE__ */ new Uint8Array(128)).map((_, idx) => /[a-zA-Z0-9\-]/.test(String.fromCharCode(idx)) ? 1 : 0);
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
var TAB = 9;
var N$1 = 10;
var F = 12;
var R = 13;
var SPACE$2 = 32;
var EXCLAMATIONMARK$2 = 33;
var NUMBERSIGN$3 = 35;
var AMPERSAND$5 = 38;
var APOSTROPHE$2 = 39;
var LEFTPARENTHESIS$2 = 40;
var RIGHTPARENTHESIS$2 = 41;
var ASTERISK$6 = 42;
var PLUSSIGN$6 = 43;
var COMMA = 44;
var HYPERMINUS = 45;
var LESSTHANSIGN$1 = 60;
var GREATERTHANSIGN$3 = 62;
var QUESTIONMARK$1 = 63;
var COMMERCIALAT = 64;
var LEFTSQUAREBRACKET = 91;
var RIGHTSQUAREBRACKET = 93;
var LEFTCURLYBRACKET = 123;
var VERTICALLINE$3 = 124;
var RIGHTCURLYBRACKET = 125;
var INFINITY = 8734;
var COMBINATOR_PRECEDENCE = {
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
var noop = function() {};
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
var astToTokens = { decorator(handlers) {
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
var MATCH = { type: "Match" };
var MISMATCH = { type: "Mismatch" };
var DISALLOW_EMPTY = { type: "DisallowEmpty" };
var LEFTPARENTHESIS$1 = 40;
var RIGHTPARENTHESIS$1 = 41;
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
var { hasOwnProperty: hasOwnProperty$2 } = Object.prototype;
var STUB = 0;
var TOKEN = 1;
var OPEN_SYNTAX = 2;
var CLOSE_SYNTAX = 3;
var EXIT_REASON_MATCH = "Match";
var EXIT_REASON_MISMATCH = "Mismatch";
var EXIT_REASON_ITERATION_LIMIT = "Maximum iteration number exceeded (please fill an issue on https://github.com/csstree/csstree/issues)";
var ITERATION_LIMIT = 15e3;
var totalIterationCount = 0;
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
var { hasOwnProperty: hasOwnProperty$1 } = Object.prototype;
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
var PLUSSIGN$5 = 43;
var HYPHENMINUS$2 = 45;
var N = 110;
var DISALLOW_SIGN = true;
var ALLOW_SIGN = false;
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
var name$48 = "AnPlusB";
var structure$48 = {
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
var name$47 = "Atrule";
var walkContext$9 = "atrule";
var structure$47 = {
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
var name$46 = "AtrulePrelude";
var walkContext$8 = "atrulePrelude";
var structure$46 = { children: [[]] };
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
var DOLLARSIGN$1 = 36;
var ASTERISK$5 = 42;
var EQUALSSIGN$1 = 61;
var CIRCUMFLEXACCENT = 94;
var VERTICALLINE$2 = 124;
var TILDE$2 = 126;
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
var name$45 = "AttributeSelector";
var structure$45 = {
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
var AMPERSAND$4 = 38;
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
var name$44 = "Block";
var walkContext$7 = "block";
var structure$44 = { children: [[
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
var name$43 = "Brackets";
var structure$43 = { children: [[]] };
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
var structure$42 = [];
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
var structure$41 = [];
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
var FULLSTOP$2 = 46;
var name$40 = "ClassSelector";
var structure$40 = { name: String };
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
var PLUSSIGN$4 = 43;
var SOLIDUS$7 = 47;
var GREATERTHANSIGN$2 = 62;
var TILDE$1 = 126;
var name$39 = "Combinator";
var structure$39 = { name: String };
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
var ASTERISK$4 = 42;
var SOLIDUS$6 = 47;
var name$38 = "Comment";
var structure$38 = { value: String };
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
var likelyFeatureToken = /* @__PURE__ */ new Set([
	16,
	22,
	0
]);
var name$37 = "Condition";
var structure$37 = {
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
var parentheses = {
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
var EXCLAMATIONMARK$1 = 33;
var NUMBERSIGN$2 = 35;
var DOLLARSIGN = 36;
var AMPERSAND$3 = 38;
var ASTERISK$3 = 42;
var PLUSSIGN$3 = 43;
var SOLIDUS$5 = 47;
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
var name$36 = "Declaration";
var walkContext$6 = "declaration";
var structure$36 = {
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
var AMPERSAND$2 = 38;
function consumeRaw$2() {
	return this.Raw(this.consumeUntilSemicolonIncluded, true);
}
var name$35 = "DeclarationList";
var structure$35 = { children: [[
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
var name$34 = "Dimension";
var structure$34 = {
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
var SOLIDUS$4 = 47;
var name$33 = "Feature";
var structure$33 = {
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
var name$32 = "FeatureFunction";
var structure$32 = {
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
var SOLIDUS$3 = 47;
var LESSTHANSIGN = 60;
var EQUALSSIGN = 61;
var GREATERTHANSIGN$1 = 62;
var name$31 = "FeatureRange";
var structure$31 = {
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
var name$30 = "Function";
var walkContext$5 = "function";
var structure$30 = {
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
var name$29 = "GeneralEnclosed";
var structure$29 = {
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
var name$28 = "Hash";
var structure$28 = { value: String };
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
var name$27 = "Identifier";
var structure$27 = { name: String };
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
var name$26 = "IdSelector";
var structure$26 = { name: String };
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
var FULLSTOP$1 = 46;
var name$25 = "Layer";
var structure$25 = { name: String };
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
var name$24 = "LayerList";
var structure$24 = { children: [["Layer"]] };
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
var name$23 = "MediaQuery";
var structure$23 = {
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
var name$22 = "MediaQueryList";
var structure$22 = { children: [["MediaQuery"]] };
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
var AMPERSAND$1 = 38;
var name$21 = "NestingSelector";
var structure$21 = {};
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
var structure$20 = {
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
var name$19 = "Number";
var structure$19 = { value: String };
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
var name$18 = "Operator";
var structure$18 = { value: String };
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
var name$17 = "Parentheses";
var structure$17 = { children: [[]] };
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
var name$16 = "Percentage";
var structure$16 = { value: String };
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
var name$15 = "PseudoClassSelector";
var walkContext$4 = "function";
var structure$15 = {
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
var name$14 = "PseudoElementSelector";
var walkContext$3 = "function";
var structure$14 = {
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
var SOLIDUS$2 = 47;
function consumeTerm() {
	this.skipSC();
	switch (this.tokenType) {
		case 10: return this.Number();
		case 2: return this.Function(this.readSequence, this.scope.Value);
		default: this.error("Number of function is expected");
	}
}
var name$13 = "Ratio";
var structure$13 = {
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
var structure$12 = { value: String };
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
var name$11 = "Rule";
var walkContext$2 = "rule";
var structure$11 = {
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
var name$10 = "Scope";
var structure$10 = {
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
var name$9 = "Selector";
var structure$9 = { children: [[
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
var name$8 = "SelectorList";
var walkContext$1 = "selector";
var structure$8 = { children: [["Selector", "Raw"]] };
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
var REVERSE_SOLIDUS$1 = 92;
var QUOTATION_MARK$1 = 34;
var APOSTROPHE$1 = 39;
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
var name$7 = "String";
var structure$7 = { value: String };
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
var EXCLAMATIONMARK = 33;
function consumeRaw() {
	return this.Raw(null, false);
}
var name$6 = "StyleSheet";
var walkContext = "stylesheet";
var structure$6 = { children: [[
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
var name$5 = "SupportsDeclaration";
var structure$5 = { declaration: "Declaration" };
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
var ASTERISK$2 = 42;
var VERTICALLINE$1 = 124;
function eatIdentifierOrAsterisk() {
	if (this.tokenType !== 1 && this.isDelim(ASTERISK$2) === false) this.error("Identifier or asterisk is expected");
	this.next();
}
var name$4 = "TypeSelector";
var structure$4 = { name: String };
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
var PLUSSIGN$2 = 43;
var HYPHENMINUS$1 = 45;
var QUESTIONMARK = 63;
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
var name$3 = "UnicodeRange";
var structure$3 = { value: String };
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
var SPACE$1 = 32;
var REVERSE_SOLIDUS = 92;
var QUOTATION_MARK = 34;
var APOSTROPHE = 39;
var LEFTPARENTHESIS = 40;
var RIGHTPARENTHESIS = 41;
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
var structure$2 = { value: String };
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
var name$1 = "Value";
var structure$1 = { children: [[]] };
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
var SPACE = Object.freeze({
	type: "WhiteSpace",
	loc: null,
	value: " "
});
var name = "WhiteSpace";
var structure = { value: String };
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
var NUMBERSIGN$1 = 35;
var ASTERISK$1 = 42;
var PLUSSIGN$1 = 43;
var HYPHENMINUS = 45;
var SOLIDUS$1 = 47;
var U = 117;
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
var NUMBERSIGN = 35;
var AMPERSAND = 38;
var ASTERISK = 42;
var PLUSSIGN = 43;
var SOLIDUS = 47;
var FULLSTOP = 46;
var GREATERTHANSIGN = 62;
var VERTICALLINE = 124;
var TILDE = 126;
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
var nonContainerNameKeywords = /* @__PURE__ */ new Set([
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
var parseFunctions = {
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
var selectorList = { parse() {
	return this.createSingleNodeList(this.SelectorList());
} };
var selector = { parse() {
	return this.createSingleNodeList(this.Selector());
} };
var identList = { parse() {
	return this.createSingleNodeList(this.Identifier());
} };
var langList = { parse: parseLanguageRangeList };
var nth = { parse() {
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
var { tokenize: tokenize$1, parse: parse$1, generate, lexer, createLexer, walk, find, findLast, findAll, toPlainObject, fromPlainObject, fork } = create_default({
	...lexer_default,
	...parser_default,
	...walker_default
});
//#endregion
//#region src/vendor/widget-sandbox/src/host/url-policy.ts
/** The profile's image types (PNG, JPEG, GIF, WebP: the decoder runs in the app process; SVG, AVIF, BMP and ICO are out). */
var IMAGE_MIME = new Set(PROFILE_IMAGES);
/** blob: URLs created by the host itself. Nothing else may use the blob: scheme. */
var hostBlobUrls = /* @__PURE__ */ new Set();
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
var BROKEN_IMAGE = "data:image/png;base64,";
/**
* How far into an image what gives its size is looked for: a JPEG's frame header past the segments before it, a GIF's
* first image descriptor past its extensions. A widget's document is at most 32 KB, an image in it smaller still, and
* one a script makes carries no camera's metadata.
*/
var HEADER_SCAN_BYTES = 65536;
/** The least of a plain base64 body decoded at once (4096 characters), from where a read leaves the last window. */
var BLOCK_BYTES = 3072;
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
var lastImage = null;
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
var PLACEHOLDER_IMAGE = "data:image/svg+xml," + encodeURIComponent("<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"48\" height=\"48\" viewBox=\"0 0 48 48\"><rect width=\"48\" height=\"48\" fill=\"#8882\"/><path d=\"M8 36l10-12 8 9 6-7 8 10z\" fill=\"#8886\"/><circle cx=\"33\" cy=\"15\" r=\"4\" fill=\"#8886\"/></svg>");
//#endregion
//#region src/vendor/widget-sandbox/src/shared/css-supports.ts
var CSS = PROFILE_CSS$1;
var PROPERTIES = new Set(CSS.properties);
var FUNCTIONS = new Set(CSS.functions);
var UNITS = new Set(CSS.units);
var FILTER_FUNCTIONS$1 = new Set(CSS.filterFunctions);
var TRANSFORM_3D$1 = new Set(CSS.transform3d);
var GENERIC_FONTS = new Set(CSS.fonts.generic);
var PSEUDO_CLASSES = /* @__PURE__ */ new Set([...CSS.pseudoClasses, ...Object.keys(CSS.pseudoRewrite)]);
var PSEUDO_ELEMENTS = new Set(CSS.pseudoElements);
var VALUES = CSS.values;
var REWRITE = CSS.rewrite;
var GLOBAL_KEYWORDS$1 = /* @__PURE__ */ new Set([
	"inherit",
	"initial",
	"unset",
	"revert",
	"revert-layer"
]);
var FONT_SIZE_KEYWORDS$1 = /* @__PURE__ */ new Set([
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
var OVERFLOW = /* @__PURE__ */ new Set([
	"overflow",
	"overflow-x",
	"overflow-y"
]);
var IMAGE_URL = new RegExp("^(?:#|data:(?:" + PROFILE_IMAGES.map((m) => m.replace(/[+.]/g, "\\$&")).join("|") + ")[;,])", "i");
function cssPropertyInProfile(name) {
	const p = name.toLowerCase();
	return p.startsWith("--") || PROPERTIES.has(p);
}
var cssFunctionInProfile = (name) => FUNCTIONS.has(name.toLowerCase());
var cssUnitInProfile = (unit) => UNITS.has(unit.toLowerCase());
var cssPseudoClassInProfile = (name) => PSEUDO_CLASSES.has(name.toLowerCase());
var cssPseudoElementInProfile = (name) => PSEUDO_ELEMENTS.has(name.toLowerCase());
var isGenericFont = (name) => GENERIC_FONTS.has(name.toLowerCase());
var IDENT_START = /[a-zA-Z_\-\u0080-￿\\]/;
var IDENT_CHAR = /[\w\-\u0080-￿\\]/;
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
var hasVar = (toks) => [...deep(toks)].some((t) => t.t === "func" && (t.v === "var" || t.v === "env" || t.v === "attr"));
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
var envSupported = (args) => args[0]?.t === "ident" && Object.prototype.hasOwnProperty.call(SAFE_AREA_ENV_VARIABLES, args[0].v) && (args.length === 1 || args[1].t === "delim" && args[1].v === ",");
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
var DEFAULT_ENV = { colorScheme: "light" };
var VISIBLE_TEXT_ATTRS = /* @__PURE__ */ new Set([
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
var ALWAYS = "(min-width: 0px)";
var NEVER = "(min-width: 99999px)";
var PROFILE_CSS = PROFILE_TABLES.css;
var ALLOWED_ATRULES = new Set(PROFILE_CSS.atRules);
/** At-rules dropped for security (a URL, a font parser), whatever the profile says. */
var SECURITY_ATRULES = /* @__PURE__ */ new Set([
	"import",
	"namespace",
	"font-face"
]);
var MEDIA_TYPES = new Set(PROFILE_CSS.mediaTypes);
var MEDIA_FEATURES = new Set(PROFILE_CSS.mediaFeatures);
var VALUE_SETS = PROFILE_CSS.values;
var REWRITES = PROFILE_CSS.rewrite;
var FILTER_FUNCTIONS = new Set(PROFILE_CSS.filterFunctions);
var TRANSFORM_3D = new Set(PROFILE_CSS.transform3d);
var FONT_FALLBACK = PROFILE_CSS.fonts.fallback;
var FONT_ALIASES = PROFILE_CSS.fonts.aliases;
var PSEUDO_REWRITE = PROFILE_CSS.pseudoRewrite;
var GLOBAL_KEYWORDS = /* @__PURE__ */ new Set([
	"inherit",
	"initial",
	"unset",
	"revert",
	"revert-layer"
]);
var FONT_SIZE_KEYWORDS = /* @__PURE__ */ new Set([
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
var SUBSTITUTED = (n) => n.type === "Function" && SUBSTITUTION_NAMES.has(n.name.toLowerCase());
var SUBSTITUTION_NAMES = /* @__PURE__ */ new Set([
	"var",
	"env",
	"attr"
]);
/** Functions whose string arguments are interpreted as URLs. */
var URL_FUNCTIONS = /* @__PURE__ */ new Set([
	"image-set",
	"-webkit-image-set",
	"image",
	"src",
	"cross-fade",
	"-webkit-cross-fade"
]);
var SUBSTITUTION_FUNCTIONS = /* @__PURE__ */ new Set([
	"var",
	"env",
	"attr"
]);
var FORBIDDEN_PROPERTIES = /* @__PURE__ */ new Set(["behavior", "-moz-binding"]);
/** Secondary check for at-rule preludes css-tree left unparsed (new syntax). */
var SAFE_RAW_PRELUDE = /^[\w\s\-.,:()<>=%/*+!#]*$/;
var PARSE_OPTS = {
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
var FILTER_PROPERTIES = /* @__PURE__ */ new Set([
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
var ident = (n) => n?.type === "Identifier" ? n.name.toLowerCase() : null;
var listOf = (nodes) => new List().fromArray(nodes);
var comma = () => ({
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
var CONTAINER_UNITS = {
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
var SIZE_FEATURE = /^\(\s*(?:(?:min-|max-)?(?:width|height|aspect-ratio)\s*:\s*[^()]+|orientation\s*:\s*(?:portrait|landscape)\s*|[^()]*\b(?:width|height)\b[^()]*[<>][^()]*)\)$/i;
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
var SCOPED_PSEUDO = {
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
var SHEET_CACHE_SIZE = 32;
var SHEET_CACHE_MAX_TEXT = 262144;
var sheetCache = /* @__PURE__ */ new Map();
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
var PROPERTY_NAME = /^-{0,2}[a-zA-Z_][\w-]*$/;
var FAST_MAX = 256;
var T_IDENT = 1;
var T_FUNC = 2;
var T_HASH = 3;
var T_NUM = 4;
var T_PCT = 5;
var T_DIM = 6;
var T_COMMA = 7;
var T_CLOSE = 8;
/**
* css-tree's generator between two tokens: `SPACE_BEFORE[prev]` has bit `next` set when it emits a space (the pairs of
* tokenBefore.safe among these token types; prev 0 is the start). A number, percentage or dimension that starts with
* `-` is looked up as the delim `-` instead (`MINUS_SPACE`).
*/
var bits = (...ts) => ts.reduce((m, t) => m | 1 << t, 0);
var SPACE_BEFORE = [];
SPACE_BEFORE[0] = 0;
SPACE_BEFORE[T_IDENT] = bits(T_IDENT, T_FUNC, T_NUM, T_PCT, T_DIM, T_HASH);
SPACE_BEFORE[T_FUNC] = 0;
SPACE_BEFORE[T_HASH] = bits(T_IDENT, T_FUNC, T_NUM, T_PCT, T_DIM, T_HASH);
SPACE_BEFORE[T_NUM] = bits(T_IDENT, T_FUNC, T_NUM, T_PCT, T_DIM);
SPACE_BEFORE[T_PCT] = bits(T_PCT, T_DIM, T_FUNC);
SPACE_BEFORE[T_DIM] = bits(T_IDENT, T_FUNC, T_NUM, T_PCT, T_DIM, T_HASH);
SPACE_BEFORE[T_COMMA] = 0;
SPACE_BEFORE[T_CLOSE] = bits(T_IDENT, T_FUNC, T_PCT, T_DIM, T_HASH);
var MINUS_SPACE = bits(T_IDENT, T_HASH, T_DIM, T_PCT, T_CLOSE);
/**
* The profile's functions less those that substitute, pick a branch or take a URL (the full path rewrites or checks
* them), and never a 3D transform function (the full path drops them).
*/
var FAST_FUNCTIONS = new Set(PROFILE_CSS.functions.filter((f) => !SUBSTITUTION_FUNCTIONS.has(f) && !URL_FUNCTIONS.has(f) && f !== "url" && f !== "light-dark" && !TRANSFORM_3D.has(f)));
/** The profile's units less the viewport units (the shadow scope makes them container units). */
var FAST_UNITS = new Set(PROFILE_CSS.units.filter((u) => !Object.prototype.hasOwnProperty.call(CONTAINER_UNITS, u)));
var FAST_CUSTOM = {};
/** The profile's properties the fast path takes (lowercase, as written), with their rules; the others always go the full path. */
var FAST_PROPS = /* @__PURE__ */ new Map();
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
var C_DIGIT = 1;
var C_LETTER = 2;
var C_NAME = 4;
var CHAR = /* @__PURE__ */ new Uint8Array(128);
for (let c = 48; c <= 57; c++) CHAR[c] = 5;
for (let c = 65; c <= 90; c++) CHAR[c] = CHAR[c + 32] = 6;
CHAR[45] = C_NAME;
var fastPathOn = true;
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
	if (fastPathOn) {
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
var MAX_NODES = 5e4;
/** Text nodes, string properties and Path2D data; a chat widget has no use for more, and every byte is copied through the renderer. */
var MAX_TEXT = 32768;
var COMPAT_MAX_TEXT = 2097152;
/**
* Per-document budget of complex-script text (UTF-16 units at or above U+0590:
* Hebrew, Arabic, Indic, Thai, CJK, emoji, …) in text nodes. Shaping and line
* breaking such text is what makes a renderer slow, so a widget gets this much
* of it in its whole document, counted on create, data change and removal.
*/
var COMPLEX_TEXT_BUDGET = 8192;
var COMPLEX_CHURN_PER_SECOND = 1024;
var TEXT_BUDGET = 49152;
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
var SMALL_TEXT = 256;
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
var KEYFRAME_MEMBERS = /* @__PURE__ */ new Set([
	"offset",
	"easing",
	"composite",
	"computed-offset"
]);
var OUT_OF_PROFILE = Symbol("out of profile");
/** An attribute (or inline style) value: the largest `data:` image a 4 KB message can carry fits. */
var MAX_ATTR = 8192;
var MAX_OPS_PER_BATCH = 1e4;
/**
* Nodes in the document (elements, text, comments; detached ones the widget keeps included), compared once a batch is
* applied: twice the corpora's largest widget (962). Below the 8 MB heap on every host since the shim hands a long flush
* over in parts, so the author sees this reason everywhere, not a memory stop that comes at 2000 nodes on a 64-bit host
* and 4000 on a 32-bit one.
*/
var MAX_DOCUMENT_NODES = 2e3;
/**
* Canvas commands in one `canvas` op (one canvas, one task): outside the projected 3D showcase no widget draws more than
* 237, and the main-thread window (2 µs a command) already holds 4000 a frame to ~13 fps on every client the stress kit
* measured (9 510 to ~5 fps); the 3D showcase's meshes stay under 2000 a frame.
*/
var MAX_CANVAS_CMDS = 4e3;
var MAX_CSS_RULES = 400;
var MAX_KEYFRAMES = 32;
var MAX_LIVE_ANIMS = 64;
/**
* A widget's canvases together, in bitmap pixels (16 MB as RGBA): a canvas over a whole bubble at 3× is ~2.3 M, the
* corpora's largest 0.4 M. compat has none here; the renderer holds every widget to 4096 × 4096 (its own backstop).
*/
var MAX_CANVAS_PIXELS = 4194304;
var COMPAT_MAX_ATTR = 4194304;
var COMPAT_MAX_OPS_PER_BATCH = 2e5;
var COMPAT_MAX_CANVAS_CMDS = 5e5;
var COMPAT_MAX_LIVE_ANIMS = 1024;
var MAX_ID = 2 ** 31;
/** Renderer-side parent id meaning "detached, but keep the node". */
var LIMBO = 0;
var ATTR_NAME = /^[a-zA-Z_][\w.:\-]*$/;
var TAG_NAME = /^[a-zA-Z][\w.\-]*$/;
var EVENT_TYPE_SET = new Set(EVENT_TYPES);
var SVG_ANIMATION_TAGS = /* @__PURE__ */ new Set([
	"animate",
	"animateTransform",
	"animateMotion"
]);
var SVG_HREF_FRAGMENT_TAGS = /* @__PURE__ */ new Set([
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
var MAX_ANIM_RECORDS = 4096;
var MAX_ANIM_KEYFRAMES = 64;
var MAX_ANIM_VALUES = 64;
var MAX_ANIM_TIME = 864e5;
var ANIM_DIRECTIONS = /* @__PURE__ */ new Set([
	"normal",
	"reverse",
	"alternate",
	"alternate-reverse"
]);
var ANIM_FILLS = /* @__PURE__ */ new Set([
	"none",
	"forwards",
	"backwards",
	"both"
]);
var ANIM_COMPOSITES = /* @__PURE__ */ new Set([
	"replace",
	"add",
	"accumulate"
]);
var ANIM_ITERATION_COMPOSITES = /* @__PURE__ */ new Set(["replace", "accumulate"]);
var ANIM_NUMBER = "[+-]?(?:\\d+\\.?\\d*|\\.\\d+)(?:[eE][+-]?\\d+)?";
var ANIM_EASING = new RegExp("^(?:linear|ease|ease-in|ease-out|ease-in-out|step-start|step-end|cubic-bezier\\(\\s*" + ANIM_NUMBER + "\\s*,\\s*" + ANIM_NUMBER + "\\s*,\\s*" + ANIM_NUMBER + "\\s*,\\s*" + ANIM_NUMBER + "\\s*\\)|steps\\(\\s*\\d{1,6}\\s*(?:,\\s*(?:start|end|jump-start|jump-end|jump-both|jump-none)\\s*)?\\)|linear\\([0-9eE.%,\\s+-]{1,8192}\\))$");
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
//#region src/vendor/widget-sandbox/src/host/widget-host.ts
/** `sab` where the page can share memory with its workers (cross-origin isolated), `frame` everywhere else. */
function defaultSyncTransport() {
	return typeof SharedArrayBuffer === "function" && globalThis.crossOriginIsolated === true ? "sab" : "frame";
}
var wasmBytes = null;
function frameWasm() {
	wasmBytes ?? (wasmBytes = fetch(emscripten_module_default).then((r) => r.arrayBuffer()));
	wasmBytes.catch(() => {
		wasmBytes = null;
	});
	return wasmBytes.then((bytes) => bytes.slice(0));
}
/** The shared bubble height bounds of v0.1.0 (docs/integration.md, "Bubble sizing"); the same on every client. */
var MIN_HEIGHT = 50;
var MAX_HEIGHT = 600;
var encoder = new TextEncoder();
var BUBBLE_ACTIONS = /* @__PURE__ */ new Set([
	"menu",
	"swipe",
	"scroll",
	"back"
]);
var REQUEST_REFUSED = {
	disabled: "the server allows no requests for this message (no can_query: a widget sent without allow_queries, or a forwarded copy of one sent without fwd_allow_queries)",
	busy: "a request is already in flight",
	"no-activation": "it needs a tap on the visible widget, one request per tap; this message allows no background requests (no background_query)",
	"rate-limited": "background requests at most once per 5 s",
	"no-wallet": "the client has no wallet for this user (no WidgetContext.wallet)"
};
/** Where a wallet call's refusal differs from a request's. */
var WALLET_REFUSED = {
	"no-activation": "it needs a tap on the visible widget, or the answer to a call made by a tap within 10 s; one call each",
	busy: "a request or a wallet call is already in flight"
};
var GESTURES = /* @__PURE__ */ new Set([
	"press",
	"tap",
	"double-tap",
	"hold",
	"drag-x",
	"drag-y",
	"menu-click"
]);
var WidgetHost = class {
	/** The product renderer's frame; null for other renderers (Playwright suites look inside it). */
	get iframe() {
		return this.element instanceof HTMLIFrameElement ? this.element : null;
	}
	/** The edge of the bubble that stays put when the widget's height changes: the widget's latest `setResizeAnchor`, `top` until then. */
	get resizeAnchor() {
		return this.anchor;
	}
	/** Whether the widget watches its shared `public_data` (its latest `watchPublicData` / `unwatchPublicData`), false until then. */
	get watchesPublicData() {
		return this.watching;
	}
	/** What the client draws over the widget as the widget sees it (checked: `contentSafeArea`, `setContentSafeArea`). */
	get contentSafeArea() {
		return { ...this.safeArea };
	}
	constructor(container, html, opts) {
		_defineProperty(this, "opts", void 0);
		_defineProperty(
			this,
			/** The renderer's element in the bubble (an iframe for the product renderer, a canvas for Blitz). */
			"element",
			void 0
		);
		_defineProperty(this, "worker", null);
		_defineProperty(this, "renderer", void 0);
		_defineProperty(this, "validator", void 0);
		_defineProperty(
			this,
			/** `frame`: the renderer frame that also runs the engine. */
			"frameEngine",
			null
		);
		_defineProperty(
			this,
			/** `inline`: the engine in this page. */
			"glue",
			null
		);
		_defineProperty(
			this,
			/** `worker`: this widget's line to the page's engine worker. */
			"channel",
			null
		);
		_defineProperty(
			this,
			/** `worker`: the first task's ops have all come (`loaded`). */
			"loaded",
			false
		);
		_defineProperty(
			this,
			/** `inline`: the renderer's answer to the query being asked. */
			"captured",
			null
		);
		_defineProperty(this, "capturing", false);
		_defineProperty(this, "syncTransport", void 0);
		_defineProperty(
			this,
			/** `sab` only. */
			"sab",
			null
		);
		_defineProperty(this, "header", null);
		_defineProperty(this, "payload", null);
		_defineProperty(this, "qid", 0);
		_defineProperty(this, "pendingQuery", 0);
		_defineProperty(this, "destroyed", false);
		_defineProperty(this, "dead", false);
		_defineProperty(this, "viewport", void 0);
		_defineProperty(this, "theme", void 0);
		_defineProperty(this, "widgetTheme", void 0);
		_defineProperty(this, "safeArea", void 0);
		_defineProperty(this, "visible", void 0);
		_defineProperty(this, "policy", void 0);
		_defineProperty(this, "gestures", new GestureCounter());
		_defineProperty(this, "activation", new HostActivationGate());
		_defineProperty(this, "blockedBridgeReported", 0);
		_defineProperty(this, "rejectedBridgeReported", 0);
		_defineProperty(this, "rejectedStorageReported", 0);
		_defineProperty(this, "haptics", new HapticGate());
		_defineProperty(this, "anchor", "top");
		_defineProperty(this, "watching", false);
		_defineProperty(this, "context", void 0);
		_defineProperty(this, "previewBlockedReported", 0);
		_defineProperty(this, "requests", new RequestGate());
		_defineProperty(
			this,
			/** A background request the widget made off screen: it goes to the client when the widget appears (`setVisible`). */
			"heldRequest",
			null
		);
		_defineProperty(this, "blockedRequestsReported", 0);
		this.opts = opts;
		const diag = (kind, detail) => opts.onDiag?.(kind, detail);
		this.widgetTheme = toWidgetTheme(opts.theme);
		this.theme = this.widgetTheme.colorScheme;
		this.safeArea = checkContentSafeArea(opts.contentSafeArea);
		this.visible = opts.visible ?? true;
		this.syncTransport = opts.syncTransport ?? defaultSyncTransport();
		const preview = opts.context?.preview === true;
		const canQuery = opts.context?.canQuery === true && !preview;
		this.context = {
			isCopy: opts.context?.isCopy === true && !preview,
			canQuery,
			backgroundQuery: opts.context?.backgroundQuery === true && !preview,
			wallet: opts.context?.wallet === true && canQuery,
			preview
		};
		if (this.syncTransport === "frame") {
			this.frameEngine = new FrameEngineRenderer(container, this.theme, opts.frameUrl);
			this.frameEngine.onEngine = (msg, nodes) => {
				if (isTypedMessage(msg)) this.onWorker(msg, nodes);
			};
			this.frameEngine.onGesture = (gesture) => this.activation.issue(gesture, performance.now());
		}
		const rendererFactory = this.syncTransport === "inline" || this.syncTransport === "worker" ? ShadowDomRenderer.factory : opts.rendererFactory ?? IframeRenderer.factory;
		this.renderer = this.frameEngine ?? rendererFactory(container, this.theme);
		this.element = this.renderer.element;
		this.validator = new Validator(diag, {
			colorScheme: this.theme,
			scope: this.renderer.cssScope ?? "document"
		});
		this.policy = resolvePolicy(opts.policy);
		this.validator.setPolicy(this.policy);
		this.renderer.onMessage = (msg) => {
			if (isTypedMessage(msg)) this.onRenderer(msg);
		};
		this.renderer.onDiag = diag;
		this.renderer.load();
		this.toRenderer({
			type: "theme",
			theme: this.widgetTheme
		});
		this.toRenderer({
			type: "safeArea",
			inset: this.safeArea
		});
		this.toRenderer({
			type: "policy",
			policy: this.policy
		});
		if (!this.visible) this.toRenderer({
			type: "visibility",
			visible: false
		});
		if (opts.bubbleGestures && !preview) this.setBubbleGestures(opts.bubbleGestures);
		this.viewport ?? (this.viewport = {
			innerWidth: this.element.clientWidth || 400,
			innerHeight: this.element.clientHeight || 300,
			dpr: window.devicePixelRatio
		});
		const config = {
			memoryLimitBytes: opts.memoryLimitBytes ?? LIMIT_DEFAULTS.memoryLimitBytes,
			cpuLimitMs: opts.cpuLimitMs ?? LIMIT_DEFAULTS.cpuLimitMs,
			cpuQuotaMs: opts.cpuQuotaMs ?? LIMIT_DEFAULTS.cpuQuotaMs,
			cpuQuotaWindowMs: opts.cpuQuotaWindowMs ?? LIMIT_DEFAULTS.cpuQuotaWindowMs,
			cpuKillAfterMs: opts.cpuKillAfterMs ?? LIMIT_DEFAULTS.cpuKillAfterMs,
			mainThreadQuotaMs: opts.mainThreadQuotaMs ?? LIMIT_DEFAULTS.mainThreadQuotaMs,
			maxTimers: opts.maxTimers ?? LIMIT_DEFAULTS.maxTimers,
			visible: opts.visible ?? true,
			policy: this.policy,
			features: opts.features ?? [],
			viewport: this.viewport,
			theme: this.theme,
			themeParams: this.widgetTheme.params,
			locale: checkLocale(opts.locale) ?? "en-US",
			contentSafeArea: this.safeArea,
			profile: 1,
			storage: preview ? {} : this.preload(opts.storage),
			...this.checkData(opts.data),
			isCopy: this.context.isCopy,
			canQuery: this.context.canQuery,
			isPreview: preview,
			chatType: preview || this.context.isCopy ? null : checkChatType(opts.context?.chatType),
			viewer: this.context.canQuery ? this.checkViewer(opts.context?.viewer) : null,
			wallet: this.context.wallet
		};
		if (this.syncTransport === "worker") {
			this.channel = openEngineChannel((msg) => this.onEngine(msg), opts.engineSlot);
			this.channel.send({
				type: "start",
				html,
				config
			});
			return;
		}
		if (this.syncTransport === "inline") {
			const glue = this.glue = createGlue({
				post: (msg) => this.onWorker(msg),
				query: (query) => this.inlineQuery(query),
				parseHTML: parseHtmlTree
			});
			const adopt = (vm) => {
				this.opts.inlineVM = void 0;
				if (this.destroyed || this.dead) return;
				for (const msg of vm.pending) this.onWorker(msg);
				glue.adopt(vm, {
					type: "start",
					html,
					config
				});
				this.renderer.flushSize?.();
			};
			if (opts.inlineVM) adopt(opts.inlineVM);
			else prepareInlineVM(config.memoryLimitBytes).then(adopt, (e) => this.die("failed to start the engine: " + e.message));
			return;
		}
		if (this.frameEngine) {
			frameWasm().then((wasmBinary) => {
				if (this.destroyed || this.dead) return;
				this.frameEngine?.sendEngine({
					type: "init",
					html,
					transport: "frame",
					wasmBinary,
					config,
					sandboxBundle: _virtual_sandbox_bundle_default
				}, [wasmBinary]);
			}, (e) => this.die("failed to load the engine: " + e.message));
			return;
		}
		let pooled = null;
		if (opts.workerPool) {
			pooled = opts.workerPool.take();
			this.worker = pooled.worker;
			this.sab = pooled.sab;
		} else {
			this.worker = new Worker(new URL(
				/* @vite-ignore */
				"/Monolith/worker-Bd-7oOvN.js",
				"" + import.meta.url
			), { type: "module" });
			this.sab = new SharedArrayBuffer(SAB_SIZE);
		}
		this.header = new Int32Array(this.sab, 0, 4);
		this.payload = new Uint8Array(this.sab, 16);
		this.worker.onmessage = (e) => {
			if (isTypedMessage(e.data)) this.onWorker(e.data);
		};
		this.worker.onerror = (e) => this.die("worker error: " + e.message);
		if (pooled) for (const m of pooled.pending.splice(0)) this.onWorker(m);
		if (opts.workerPool) this.toWorker({
			type: "start",
			html,
			config
		});
		else this.toWorker({
			type: "init",
			html,
			sab: this.sab,
			config,
			sandboxBundle: _virtual_sandbox_bundle_default
		});
	}
	setTheme(theme) {
		this.widgetTheme = toWidgetTheme(theme);
		this.theme = this.widgetTheme.colorScheme;
		this.renderer.setTheme(this.theme);
		this.toRenderer({
			type: "theme",
			theme: this.widgetTheme
		});
		if (!this.channel) {
			const ops = this.validator.setTheme(this.theme);
			if (ops.length) this.toRenderer({
				type: "ops",
				ops
			});
		}
		this.toWorker({
			type: "theme",
			theme: this.theme,
			themeParams: this.widgetTheme.params
		});
	}
	/**
	* What the client draws over the widget changed with the bubble's layout (docs/sdk-v1.md §2.17, §5.12): a caption
	* added or removed by an edit, an "edited" mark that widens the time. The renderer gets the root variables and the
	* widget `contentSafeAreaInset` and `contentSafeAreaChanged`, from the same call; never per frame.
	*/
	setContentSafeArea(area) {
		this.safeArea = checkContentSafeArea(area);
		this.toRenderer({
			type: "safeArea",
			inset: this.safeArea
		});
		this.toWorker({
			type: "safeArea",
			inset: this.safeArea
		});
	}
	/** Turns the renderer's bubble on or off (`WidgetHostOptions.bubbleGestures`); a preview takes no input at all. */
	setBubbleGestures(mode) {
		if (this.context.preview) return;
		const o = typeof mode === "object" ? mode : {};
		this.toRenderer({
			type: "arbitrate",
			bubble: mode !== false,
			touch: o.touch === true,
			rtl: o.rtl === true
		});
	}
	/**
	* The bot's data changed (`updateMessageWidgetData`, or a new `public_data` from polling the shared object): the
	* full state of both strings. The widget gets `chatDataChanged` / `publicDataChanged` for each that differs; a copy
	* keeps no `chatData`, only its `publicData` changes.
	*/
	setData(data) {
		this.toWorker({
			type: "bridge",
			event: {
				type: "data",
				...this.checkData(data)
			}
		});
	}
	/** The viewer as the widget sees it; a field that breaks its rule is left out and reported (`data-rejected`). */
	checkViewer(viewer) {
		const v = checkViewer(viewerUser(viewer));
		for (const field of v.rejected) this.opts.onDiag?.("data-rejected", `viewer.${field}: ${VIEWER_FIELD_RULES[field]}; the widget does not see it`);
		return v.viewer;
	}
	checkData(data) {
		const d = checkWidgetData(data, this.context.isCopy);
		if (d.rejected.length) this.opts.onDiag?.("data-rejected", `${d.rejected.join(" and ")}: not text of at most 1024 bytes (UTF-8, no NUL); the widget sees null`);
		return {
			chatData: d.chatData,
			publicData: d.publicData
		};
	}
	/**
	* docs/sdk-v1.md §2.14: a press unlocks one request, background ones only where the context allows them; one in
	* flight. The gate decides first; one made off screen waits here for the widget to appear (`held`); a client
	* without `onRequest` refuses at delivery, as the native hosts do.
	*/
	request(id, data, wallet, gesture) {
		const now = performance.now();
		const pressed = this.policy === "compat" || this.activation.available(gesture, now, this.visible);
		const c = this.context;
		const verdict = this.requests.decide(now, {
			gesture: pressed,
			visible: this.visible,
			canQuery: c.canQuery,
			backgroundQuery: c.backgroundQuery,
			withWallet: wallet,
			wallet: c.wallet
		});
		if (requestRefusal(verdict)) {
			const why = wallet && verdict === "no-activation" ? "a request for the wallet needs a tap on the visible widget, one request per tap" : REQUEST_REFUSED[verdict] ?? verdict;
			return this.refuseRequest(id, verdict, `request refused (${verdict}): ${why}`);
		}
		if (verdict === "foreground" && this.policy === "strict") this.activation.accept(gesture, now, this.visible);
		if (verdict === "held") this.heldRequest = {
			id,
			data
		};
		else this.deliverRequest(id, data, wallet);
	}
	/**
	* docs/sdk-v1.md §2.18: a wallet call goes out on a press or on the grant (the answer to a call made by a press,
	* within 10 s), never in the background; one call in flight with the requests.
	*/
	walletCall(id, call, gesture) {
		const now = performance.now();
		const pressed = this.policy === "compat" || this.activation.available(gesture, now, this.visible);
		const verdict = this.requests.decideWallet(now, {
			gesture: pressed,
			visible: this.visible,
			canQuery: this.context.canQuery,
			wallet: this.context.wallet
		});
		if (requestRefusal(verdict)) return this.refuseRequest(id, verdict, `wallet.${call.method} refused (${verdict}): ${WALLET_REFUSED[verdict] ?? REQUEST_REFUSED[verdict] ?? verdict}`);
		if (verdict === "foreground" && this.policy === "strict") this.activation.accept(gesture, now, this.visible);
		const onWallet = this.opts.onWallet;
		if (!onWallet) {
			this.requests.finish();
			return this.refuseRequest(id, "unsupported", `wallet.${call.method} refused: the client handles no wallet calls (WidgetHostOptions.onWallet)`);
		}
		this.settle(id, new Promise((resolve) => resolve(onWallet(call))), walletFailure);
	}
	answerRequest(id, event) {
		this.toWorker({
			type: "bridge",
			event: {
				type: "answer",
				id,
				...event
			}
		});
	}
	refuseRequest(id, reason, detail) {
		if (this.blockedRequestsReported < 20) {
			this.blockedRequestsReported++;
			this.opts.onDiag?.("request-blocked", detail);
		}
		this.answerRequest(id, {
			error: (reason === "unsupported" ? null : requestRefusal(reason)) ?? "NOT_ALLOWED",
			reason
		});
	}
	/** A request the gate let through, to the client; its answer or failure frees the gate. */
	deliverRequest(id, data, wallet = false) {
		const onRequest = this.opts.onRequest;
		if (!onRequest) {
			this.requests.finish();
			return this.refuseRequest(id, "unsupported", "request refused: the client handles no requests (WidgetHostOptions.onRequest)");
		}
		this.settle(id, new Promise((resolve) => resolve(onRequest(wallet ? {
			data,
			wallet: true
		} : { data }))), requestFailure);
	}
	/** The client's outcome of a request or a wallet call into the widget; it frees the gate, and an answer brings the grant when the call had a press or the grant. */
	settle(id, outcome, failure) {
		outcome.then((a) => {
			const checked = checkRequestAnswer(a);
			if (!checked) {
				this.requests.finish();
				this.opts.onDiag?.("answer-rejected", "the answer's result is not text of at most 1024 bytes (UTF-8, no NUL); the widget gets INVALID_ANSWER");
				return this.answerRequest(id, { error: "INVALID_ANSWER" });
			}
			this.requests.finish(performance.now());
			this.answerRequest(id, { result: checked.result });
		}, (reason) => {
			this.requests.finish();
			this.answerRequest(id, { error: failure(reason) });
		});
	}
	/** The widget stopped (dead or destroyed): a held request never reaches the client. */
	dropHeldRequest() {
		if (!this.heldRequest) return;
		this.heldRequest = null;
		this.requests.finish();
	}
	preload(storage) {
		if (storage === void 0) return {};
		const checked = checkStorageCommit(storage);
		if (checked === null) this.opts.onDiag?.("storage-rejected", `the preload is not { local, session } objects of strings within ${STORAGE_QUOTA_BYTES} bytes each; the widget starts with empty storage`);
		return checked ?? {};
	}
	/**
	* The host knows whether the bubble is on screen; the sandbox does not.
	* Hidden: no animation frames, timers at 1 Hz, `document.hidden` /
	* `visibilitychange` inside the widget. Visible again: deferred timers fire,
	* one frame is requested if the widget asked for one meanwhile.
	*/
	setVisible(visible) {
		if (this.visible === visible) return;
		this.visible = visible;
		if (visible && this.requests.show(performance.now()) && this.heldRequest) {
			const { id, data } = this.heldRequest;
			this.heldRequest = null;
			this.deliverRequest(id, data);
		}
		this.toWorker({
			type: "visibility",
			visible
		});
		this.toRenderer({
			type: "visibility",
			visible
		});
	}
	/**
	* tweb: drops the engine and keeps the last picture, without a badge and without input. The widget comes back as a
	* new host (on the `inline` and `worker` transports a picture costs no engine memory at all).
	*/
	suspend() {
		if (this.destroyed || this.dead) return;
		this.frameEngine?.sendEngine({ type: "stop" });
		this.dead = true;
		this.dropHeldRequest();
		this.worker?.terminate();
		this.glue?.destroy();
		this.channel?.close();
		this.answerQuery({ error: "dead" });
		this.toRenderer({
			type: "frozen",
			reason: "",
			fatal: false
		});
	}
	/** tweb: the widget's element moved into another window (Document Picture-in-Picture). */
	rebind() {
		if (!this.destroyed) this.renderer.rebind?.();
	}
	destroy() {
		if (this.destroyed) return;
		this.destroyed = true;
		this.dropHeldRequest();
		this.worker?.terminate();
		this.glue?.destroy();
		this.channel?.close();
		this.renderer.destroy();
	}
	toWorker(msg) {
		if (this.destroyed) return;
		if (this.glue) this.glue.receive(msg);
		else if (this.channel) this.channel.send({
			type: "input",
			msg
		});
		else if (this.frameEngine) this.frameEngine.sendEngine(msg);
		else this.worker?.postMessage(msg);
	}
	toRenderer(msg) {
		if (!this.destroyed) this.renderer.send(msg);
	}
	die(reason) {
		if (this.dead) return;
		this.dead = true;
		this.opts.onDead?.(reason);
		this.frameEngine?.sendEngine({ type: "stop" });
		this.worker?.terminate();
		this.glue?.destroy();
		this.channel?.close();
		this.dropHeldRequest();
		this.answerQuery({ error: "dead" });
		this.toRenderer({
			type: "frozen",
			reason: this.opts.stoppedLabel ?? "Widget stopped",
			fatal: true
		});
	}
	/** `nodes`: the `frame` engine's own validator count (the host's validator sees no ops then). */
	onWorker(msg, nodes) {
		switch (msg.type) {
			case "ops": {
				const ops = this.validator.processOps(msg.ops);
				if (this.validator.stopped) return this.die(this.validator.stopped);
				if (ops.length) this.toRenderer({
					type: "ops",
					ops
				});
				break;
			}
			case "query": {
				const query = this.validator.validateQuery(msg.query);
				if (!query) {
					this.answerQuery({ error: "invalid query" });
					break;
				}
				if (query.q === "matchMedia") query.query = this.validator.rewriteMediaQuery(query.query);
				this.pendingQuery = ++this.qid;
				this.toRenderer({
					type: "query",
					qid: this.pendingQuery,
					query
				});
				break;
			}
			case "listen":
				this.toRenderer({
					type: "listen",
					types: this.validator.validateListen(msg.types),
					since: finiteNumber(msg.since)
				});
				break;
			case "pd":
				this.toRenderer({
					type: "preventDefault",
					keys: this.validator.validatePreventDefault(msg.keys)
				});
				break;
			case "anim": {
				const anims = this.validator.validateAnim(msg.anims);
				const now = finiteNumber(msg.now);
				if (anims.length && now !== void 0) this.toRenderer({
					type: "anim",
					now,
					anims
				});
				break;
			}
			case "raf":
				this.toRenderer({ type: "requestFrame" });
				break;
			case "log": {
				const text = String(msg.text);
				this.opts.onLog?.(String(msg.level), text);
				if (msg.level === "error" && text.startsWith("Uncaught ")) this.opts.onError?.(text);
				break;
			}
			case "diag":
				this.opts.onDiag?.(String(msg.kind), String(msg.detail));
				break;
			case "bridge": {
				const method = String(msg.method).slice(0, 64);
				const action = checkBridgeCall(method, msg.args);
				if (!action) {
					if (this.rejectedBridgeReported < 20) {
						this.rejectedBridgeReported++;
						this.opts.onDiag?.("bridge-rejected", `${method}: unknown method or malformed arguments`);
					}
					break;
				}
				if (this.context.preview && !allowedInPreview(method)) {
					if (this.previewBlockedReported < 20) {
						this.previewBlockedReported++;
						this.opts.onDiag?.("preview-blocked", `${method} ignored: a preview (an inline result not sent yet) takes no actions`);
					}
					if (action.kind === "request" || action.kind === "wallet") this.toWorker({
						type: "bridge",
						event: {
							type: "answer",
							id: action.id,
							error: "NOT_ALLOWED",
							reason: "preview"
						}
					});
					break;
				}
				if (action.kind === "setResizeAnchor") {
					this.anchor = action.edge;
					break;
				}
				if (action.kind === "watchPublicData") {
					if (action.on !== this.watching) {
						this.watching = action.on;
						this.opts.onWatchPublicData?.(action.on);
					}
					break;
				}
				if (action.kind === "request") {
					this.request(action.id, action.data, action.wallet === true, msg.gesture);
					break;
				}
				if (action.kind === "wallet") {
					this.walletCall(action.id, action.call, msg.gesture);
					break;
				}
				if (this.policy === "strict" && PRIVILEGED_METHODS.has(method) && !this.activation.accept(msg.gesture, performance.now(), this.visible)) {
					if (this.blockedBridgeReported < 20) {
						this.blockedBridgeReported++;
						this.opts.onDiag?.("activation-blocked", `${method} ignored: it needs a tap on the visible widget and runs in that tap's handler, one call per tap`);
					}
					break;
				}
				if (action.kind === "haptic") {
					const d = this.haptics.decide(performance.now(), this.visible);
					if (d === "report") this.opts.onDiag?.("haptic-limit", this.visible ? "haptics over 5 per burst or 10 per second, or outside a touch after a 1 s series, are dropped" : "haptics of a hidden widget are dropped");
					if (d !== "play") break;
				}
				if (action.kind === "copyText") {
					this.opts.onCopyText?.(action.text);
					break;
				}
				this.opts.onAction?.(action);
				this.opts.onBridge?.(method, msg.args);
				break;
			}
			case "storage": {
				if (this.context.preview) break;
				const commit = checkStorageCommit(msg.commit);
				if (!commit || !commit.local && !commit.session) {
					if (this.rejectedStorageReported < 20) {
						this.rejectedStorageReported++;
						this.opts.onDiag?.("storage-rejected", `a storage commit that is not { local?, session? } objects of strings within ${STORAGE_QUOTA_BYTES} bytes each; the client keeps the previous content`);
					}
					break;
				}
				if (commit.local) this.opts.onStorageCommit?.("local", commit.local);
				if (commit.session) this.opts.onStorageCommit?.("session", commit.session);
				break;
			}
			case "warmed": break;
			case "loaded":
				this.loaded = true;
				this.validator.markLoaded();
				this.opts.onLoaded?.();
				break;
			case "stats":
				if (typeof msg.stats !== "object" || msg.stats === null) break;
				this.opts.onStats?.({
					...msg.stats,
					nodes: nodes ?? this.validator.nodeCount
				});
				break;
			case "dead": this.die(msg.reason);
		}
	}
	/** `worker`: what the engine worker says for this widget, validated there. */
	onEngine(msg) {
		if (this.destroyed) return;
		switch (msg.type) {
			case "render":
				this.toRenderer(msg.msg);
				if (!this.loaded && msg.msg.type === "ops") this.renderer.flushSize?.();
				break;
			case "host":
				this.onWorker(msg.msg, msg.nodes);
				break;
			case "query": {
				const t0 = performance.now();
				const answer = this.askRenderer(msg.query);
				this.channel?.send({
					type: "answer",
					qid: msg.qid,
					json: answer.json,
					binary: answer.binary,
					hostMs: performance.now() - t0
				}, answer.binary ? [answer.binary] : []);
				break;
			}
			case "lost": this.die(msg.reason);
		}
	}
	/** `inline`: a layout query, validated and answered by the renderer in this call. */
	inlineQuery(queryJson) {
		let query = null;
		try {
			query = this.validator.validateQuery(JSON.parse(queryJson));
		} catch {}
		if (!query) return { json: "{\"error\":\"invalid query\"}" };
		if (query.q === "matchMedia") query.query = this.validator.rewriteMediaQuery(query.query);
		return this.askRenderer(query);
	}
	/** A validated query, answered by a renderer that answers in the call (Shadow DOM). */
	askRenderer(query) {
		const undo = query.q === "elementFromPoint" ? this.opts.hitTestable?.(query.x, query.y) : void 0;
		try {
			return this.answerInCall(query);
		} finally {
			undo?.();
		}
	}
	answerInCall(query) {
		this.captured = null;
		this.capturing = true;
		try {
			this.toRenderer({
				type: "query",
				qid: 0,
				query
			});
		} finally {
			this.capturing = false;
		}
		const answer = this.captured;
		this.captured = null;
		return answer ? {
			json: JSON.stringify(answer.result ?? null),
			binary: answer.binary
		} : { json: "{\"error\":\"no answer\"}" };
	}
	/** Write a query answer into the shared buffer and wake the blocked worker. */
	answerQuery(result, binary) {
		const payload = this.payload;
		if (!this.header || !payload || Atomics.load(this.header, 0) !== 1) return;
		let json = encoder.encode(JSON.stringify(result ?? null));
		let bin = binary ? new Uint8Array(binary) : null;
		if (json.length + (bin?.length ?? 0) > payload.length) {
			json = encoder.encode("{\"error\":\"result too large\"}");
			bin = null;
		}
		payload.set(json, 0);
		if (bin) payload.set(bin, json.length);
		Atomics.store(this.header, 1, json.length);
		Atomics.store(this.header, 2, bin ? bin.length : 0);
		Atomics.store(this.header, 0, 2);
		Atomics.notify(this.header, 0);
		this.pendingQuery = 0;
	}
	onRenderer(msg) {
		switch (msg.type) {
			case "event": {
				if (this.context.preview) break;
				if (msg.ev?.type === "pointerdown") this.gestures.pressBegan();
				const gesture = msg.trusted === true ? this.gestures.gestureFor(msg.ev) : 0;
				if (gesture) this.activation.issue(gesture, performance.now());
				this.toWorker(gesture ? {
					type: "event",
					ev: msg.ev,
					gesture
				} : {
					type: "event",
					ev: msg.ev
				});
				break;
			}
			case "result":
				if (this.capturing) this.captured = msg;
				else if (msg.qid === this.pendingQuery) this.answerQuery(msg.result, msg.binary);
				break;
			case "size": {
				const h = finiteNumber(msg.height), iw = finiteNumber(msg.innerWidth), ih = finiteNumber(msg.innerHeight), dpr = finiteNumber(msg.dpr);
				if (h === void 0 || iw === void 0 || ih === void 0 || dpr === void 0) break;
				const height = Math.min(Math.max(h, MIN_HEIGHT), MAX_HEIGHT);
				if (this.element.style.height !== height + "px") this.opts.onBeforeResize?.(height, this.anchor);
				this.element.style.height = height + "px";
				this.opts.onResize?.(height, this.anchor);
				const vp = {
					innerWidth: iw,
					innerHeight: ih,
					dpr
				};
				if (JSON.stringify(vp) !== JSON.stringify(this.viewport)) {
					this.viewport = vp;
					this.toWorker({
						type: "viewport",
						viewport: vp
					});
				}
				break;
			}
			case "resize":
				this.toWorker({
					type: "resize",
					entries: msg.entries
				});
				break;
			case "frame": {
				const time = finiteNumber(msg.time);
				if (time !== void 0) this.toWorker({
					type: "frame",
					time
				});
				break;
			}
			case "gesture":
				this.haptics.press(performance.now());
				this.gestures.pressBegan();
				if (this.context.preview) break;
				this.opts.onGestureClaim?.({
					x: msg.x === true,
					y: false,
					hold: msg.hold === true
				});
				break;
			case "release":
				this.haptics.release(performance.now());
				this.opts.onRelease?.();
				break;
			case "bubble": {
				if (this.context.preview) break;
				const x = finiteNumber(msg.x), y = finiteNumber(msg.y);
				if (!BUBBLE_ACTIONS.has(msg.action) || !GESTURES.has(msg.gesture) || x === void 0 || y === void 0) break;
				this.opts.onBubbleGesture?.({
					action: msg.action,
					gesture: msg.gesture,
					x,
					y,
					edge: msg.edge === true
				});
				break;
			}
			case "media":
				this.toWorker({
					type: "theme",
					theme: this.theme,
					themeParams: this.widgetTheme.params
				});
				break;
			case "limit": {
				const limit = checkPaintLimit(msg.code, msg.count);
				if (!limit) {
					this.opts.onDiag?.("renderer-violation", "a limit report with an unknown code or no count");
					break;
				}
				if (this.policy === "compat" && limit.code !== "layout-limit" || this.dead) break;
				const reason = paintLimitMessage(limit.code, limit.count);
				this.opts.onDiag?.(limit.code, reason);
				this.die(reason);
				break;
			}
			case "violation": this.opts.onDiag?.("renderer-violation", String(msg.detail).slice(0, 4e3));
		}
	}
};
//#endregion
export { WidgetHost, defaultSyncTransport };
