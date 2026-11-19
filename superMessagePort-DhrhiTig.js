//# allFunctionsCalledOnLoad
import { d as ctx, f as DEBUG } from "./userAgent-ByGXcznk.js";
import { c as IS_WORKER, n as logger } from "./logger-7zf0rNYS.js";
import { t as EventListenerBase } from "./eventListenerBase-da40Q-0t.js";
import { t as makeError } from "./makeError-CiXxcKtE.js";
//#region src/config/tabId.ts
var tabId = Date.now() % Math.random() * 1e8 | 0;
//#endregion
//#region src/helpers/array/indexOfAndSplice.ts
function indexOfAndSplice(array, item) {
	const idx = array.indexOf(item);
	return (idx === -1 ? void 0 : array.splice(idx, 1))?.[0];
}
//#endregion
//#region src/lib/superMessagePort.ts
var USE_LOCKS = true;
var STUCK_WATCHDOG_INTERVAL_MS = 2e3;
var STUCK_WARN_FIRST_MS = 5e3;
var STUCK_WARN_PERSIST_MS = 3e4;
function describeTask(task) {
	return {
		id: task?.id,
		type: task?.type,
		invoke: task?.type === "invoke" ? task.payload?.type : void 0
	};
}
function getInvokeTaskName(type, value) {
	const payload = value;
	return {
		taskType: type,
		taskName: payload?.name,
		taskMethod: payload?.method
	};
}
function formatAwaitingName(entry) {
	return [
		entry.taskType,
		entry.taskName,
		entry.taskMethod
	].filter(Boolean).join(":");
}
var SuperMessagePort = class SuperMessagePort extends EventListenerBase {
	constructor(logSuffix) {
		super(false);
		this.logSuffix = logSuffix;
		this.scanStuckAwaiting = () => {
			const now = Date.now();
			for (const id in this.awaiting) {
				const entry = this.awaiting[id];
				const age = now - entry.createdAt;
				if (!entry.warned && age >= STUCK_WARN_FIRST_MS) {
					entry.warned = true;
					this.log.warn(`[STUCK] ${formatAwaitingName(entry)} pending ${age}ms (id=${id})`);
				} else if (entry.warned && age >= STUCK_WARN_PERSIST_MS && age % STUCK_WARN_PERSIST_MS < STUCK_WATCHDOG_INTERVAL_MS) this.log.error(`[STUCK] ${formatAwaitingName(entry)} still pending after ${age}ms (id=${id}) — likely no listener on peer or port not started`);
			}
		};
		this.onMessage = (event) => {
			const task = event.data;
			const source = event.source || event.currentTarget;
			this.processTaskMap[task.type](task, source, event);
		};
		this.processResultTask = (task) => {
			const { taskId, result, error } = task.payload;
			const deferred = this.awaiting[taskId];
			if (!deferred) return;
			this.debug && this.log.debug("done", formatAwaitingName(deferred), result, error);
			"error" in task.payload ? deferred.reject(error) : deferred.resolve(result);
			delete this.awaiting[taskId];
		};
		this.processAckTask = (task) => {
			const payload = task.payload;
			const deferred = this.awaiting[payload.taskId];
			if (!deferred) return;
			const previousResolve = deferred.resolve;
			previousResolve({
				cached: payload.cached,
				result: payload.cached ? "result" in payload ? Promise.resolve(payload.result) : Promise.reject(payload.error) : new Promise((resolve, reject) => {
					deferred.resolve = resolve;
					deferred.reject = reject;
				})
			});
			if (payload.cached) delete this.awaiting[payload.taskId];
		};
		this.processPingTask = (task, source, event) => {
			this.pushTask(this.createTask("pong", void 0), event.source);
		};
		this.processPongTask = (task, source, event) => {
			const pingResolve = this.pingResolves.get(source);
			if (pingResolve) {
				this.pingResolves.delete(source);
				pingResolve();
			}
		};
		this.processCloseTask = (task, source, event) => {
			this.detachPort(source);
		};
		this.processBatchTask = (task, source, event) => {
			const newEvent = {
				data: event.data,
				source: event.source,
				currentTarget: event.currentTarget
			};
			task.payload.forEach((task) => {
				newEvent.data = task;
				this.onMessage(newEvent);
			});
		};
		this.processLockTask = (task, source, event) => {
			const id = task.payload;
			if (this.requestedLocks.has(id)) return;
			this.requestedLocks.set(id, source);
			navigator.locks.request(id, () => {
				this.processCloseTask(void 0, source, void 0);
				this.requestedLocks.delete(id);
			});
		};
		this.processInvokeTask = async (task, source, event) => {
			const id = task.id;
			const innerTask = task.payload;
			let resultTaskPayload;
			let resultTask, ackTask;
			if (!innerTask.void) {
				resultTaskPayload = { taskId: id };
				resultTask = this.createTask("result", resultTaskPayload);
			}
			if (innerTask.withAck) ackTask = this.createTask("ack", {
				taskId: id,
				cached: true
			});
			let isPromise;
			try {
				const listeners = this.listeners[innerTask.type];
				if (!listeners?.size) throw new Error("no listener");
				const listener = listeners.values().next().value;
				let result = this.invokeListenerCallback(innerTask.type, listener, innerTask.payload, source, event);
				if (innerTask.void) return;
				isPromise = result instanceof Promise;
				if (ackTask) {
					const cached = !isPromise;
					ackTask.payload.cached = cached;
					if (cached) ackTask.payload.result = result;
					this.pushTask(ackTask, source);
					if (cached) return;
				}
				if (isPromise) result = await result;
				if (result instanceof SuperMessagePort.TransferableResult) {
					resultTask.transfer = result.transferables;
					result = result.value;
				}
				resultTaskPayload.result = result;
			} catch (error) {
				this.log.error("worker task error:", error, describeTask(task));
				if (innerTask.void) return;
				if (ackTask && ackTask.payload.cached) {
					ackTask.payload.error = error;
					this.pushTask(ackTask, source);
					return;
				}
				resultTaskPayload.error = error;
			}
			this.pushTask(resultTask, source);
		};
		this.listenPorts = [];
		this.sendPorts = [];
		this.pingResolves = /* @__PURE__ */ new Map();
		this.taskId = Math.random();
		this.awaiting = {};
		this.pending = /* @__PURE__ */ new Map();
		this.log = logger("MP" + (logSuffix ? "-" + logSuffix : ""));
		this.debug = DEBUG && false;
		this.heldLocks = /* @__PURE__ */ new Map();
		this.requestedLocks = /* @__PURE__ */ new Map();
		this.processTaskMap = {
			result: this.processResultTask,
			ack: this.processAckTask,
			invoke: this.processInvokeTask,
			ping: this.processPingTask,
			pong: this.processPongTask,
			close: this.processCloseTask,
			lock: this.processLockTask,
			batch: this.processBatchTask
		};
		if (DEBUG) this.stuckWatchdogInterval = ctx.setInterval(this.scanStuckAwaiting, STUCK_WATCHDOG_INTERVAL_MS);
	}
	setOnPortDisconnect(callback) {
		this.onPortDisconnect = callback;
	}
	attachPort(port) {
		this.attachListenPort(port);
		this.attachSendPort(port);
	}
	attachListenPort(port) {
		this.listenPorts.push(port);
		port.addEventListener("message", this.onMessage);
	}
	attachSendPort(port) {
		this.log.warn("attaching send port");
		port.start?.();
		this.sendPorts.push(port);
		if (typeof window !== "undefined" && USE_LOCKS) {
			if ("locks" in navigator) {
				const id = [
					"lock",
					tabId,
					this.logSuffix || "",
					Math.random() * 2147483647 | 0
				].join("-");
				this.log.warn("created lock", id);
				const promise = new Promise((resolve) => this.heldLocks.set(port, {
					resolve,
					id
				})).then(() => this.heldLocks.delete(port));
				navigator.locks.request(id, () => {
					this.resendLockTask(port);
					return promise;
				});
			} else window.addEventListener("pagehide", () => {
				const task = this.createTask("close", void 0);
				this.postMessage(void 0, task);
			});
		}
		this.releasePending();
	}
	resendLockTask(port) {
		const lock = this.heldLocks.get(port);
		if (!lock) return;
		this.pushTask(this.createTask("lock", lock.id), port);
	}
	detachPort(port) {
		this.log.warn("disconnecting port");
		indexOfAndSplice(this.listenPorts, port);
		indexOfAndSplice(this.sendPorts, port);
		port.removeEventListener?.("message", this.onMessage);
		port.close?.();
		this.onPortDisconnect?.(port);
		this.heldLocks.get(port)?.resolve();
		const error = makeError("PORT_DISCONNECTED");
		for (const id in this.awaiting) {
			const task = this.awaiting[id];
			if (task.port === port) {
				task.reject(error);
				delete this.awaiting[id];
			}
		}
	}
	postMessage(port, task) {
		(Array.isArray(port) ? port : port ? [port] : this.sendPorts).forEach((port) => {
			port.postMessage(task, task.transfer);
		});
	}
	async releasePending() {
		if (this.releasingPending) return;
		this.releasingPending = true;
		await Promise.resolve();
		this.debug && this.log.debug("releasing tasks, length:", this.pending.size);
		this.pending.forEach((portTasks, port) => {
			let tasks = portTasks;
			{
				let batchTask;
				tasks = [];
				portTasks.forEach((task) => {
					if (task.transfer) {
						batchTask = void 0;
						tasks.push(task);
					} else {
						if (!batchTask) {
							batchTask = this.createTask("batch", []);
							tasks.push(batchTask);
						}
						batchTask.payload.push(task);
					}
				});
			}
			const ports = port ? [port] : this.sendPorts;
			if (!ports.length) return;
			tasks.forEach((task) => {
				this.sendTask(ports, task);
			});
			this.pending.delete(port);
		});
		this.debug && this.log.debug("released tasks");
		this.releasingPending = false;
	}
	createDataCloneError() {
		return {
			type: "DATA_CLONE_ERROR",
			message: "Message port task payload could not be cloned"
		};
	}
	isDataCloneError(error) {
		return error?.name === "DataCloneError" || error instanceof RangeError;
	}
	sendDataCloneError(port, taskId) {
		const task = this.createTask("result", {
			taskId,
			error: this.createDataCloneError()
		});
		try {
			this.postMessage(port, task);
		} catch (error) {
			this.log.error("postMessage clone-error fallback failed:", error, task.type, task.id);
		}
	}
	rejectUnsentInvoke(task, error) {
		const deferred = this.awaiting[task.id];
		if (!deferred) return;
		delete this.awaiting[task.id];
		deferred.reject(error);
	}
	getTaskDebugName(task) {
		return task.type === "invoke" ? formatAwaitingName(getInvokeTaskName(task.payload.type, task.payload.payload)) : task.type;
	}
	sendTask(ports, task, deliveredElsewhere = false) {
		const failedPorts = [];
		const cloneFailedPorts = [];
		let firstError;
		let sent = false;
		ports.forEach((port) => {
			try {
				this.postMessage(port, task);
				sent = true;
			} catch (error) {
				failedPorts.push(port);
				firstError ?? (firstError = error);
				if (this.isDataCloneError(error)) cloneFailedPorts.push(port);
				else this.log.error("postMessage error:", error, task.type, task.id);
			}
		});
		if (!failedPorts.length) return;
		if (cloneFailedPorts.length) this.log.error("postMessage data clone error:", this.getTaskDebugName(task), task.id);
		if (task.type === "batch") {
			const wasDelivered = deliveredElsewhere || sent;
			task.payload.forEach((innerTask) => {
				this.sendTask(failedPorts, innerTask, wasDelivered);
			});
		} else if (task.type === "result" || task.type === "ack") cloneFailedPorts.forEach((port) => {
			this.sendDataCloneError(port, task.payload.taskId);
		});
		else if (task.type === "invoke" && !task.payload.void && !sent && !deliveredElsewhere) this.rejectUnsentInvoke(task, cloneFailedPorts.length === failedPorts.length ? this.createDataCloneError() : firstError);
	}
	createTask(type, payload, transfer) {
		return {
			type,
			payload,
			id: this.getNextTaskId(),
			transfer
		};
	}
	createInvokeTask(type, payload, withAck, _void, transfer) {
		return this.createTask("invoke", {
			type,
			payload,
			withAck,
			void: _void
		}, transfer);
	}
	pushTask(task, port) {
		let tasks = this.pending.get(port);
		if (!tasks) this.pending.set(port, tasks = []);
		tasks.push(task);
		this.releasePending();
	}
	getNextTaskId() {
		return this.taskId++;
	}
	invokeVoid(type, payload, port, transfer) {
		const task = this.createInvokeTask(type, payload, void 0, true, transfer);
		this.pushTask(task, port);
	}
	invokeVoidAs(type, payload, port, transfer) {
		this.invokeVoid(type, payload, port, transfer);
	}
	invokeAs(type, payload, port, transfer) {
		return this.invoke(type, payload, false, port, transfer);
	}
	invokeExceptSourceAsyncAs(type, payload, source) {
		return this.invokeExceptSourceAsync(type, payload, source);
	}
	invoke(type, payload, withAck, port, transfer, timeout) {
		this.debug && this.log.debug("start", type, payload);
		let task;
		const promise = new Promise((resolve, reject) => {
			task = this.createInvokeTask(type, payload, withAck, void 0, transfer);
			this.awaiting[task.id] = {
				...getInvokeTaskName(type, payload),
				resolve,
				reject,
				port,
				createdAt: Date.now()
			};
			this.pushTask(task, port);
		});
		if (timeout) {
			const deferred = this.awaiting[task.id];
			const timeoutId = setTimeout(() => {
				if (this.awaiting[task.id] !== deferred) return;
				delete this.awaiting[task.id];
				deferred.reject(makeError("TIMEOUT"));
			}, timeout);
			promise.then(() => clearTimeout(timeoutId), () => clearTimeout(timeoutId));
		}
		if (IS_WORKER) {
			const clearLogInterval = () => {
				clearInterval(interval);
			};
			promise.then(clearLogInterval, clearLogInterval);
			const interval = ctx.setInterval(() => {
				this.log.error("task still has no result", describeTask(task), port);
			}, IS_WORKER ? 6e4 : 5e3);
		}
		return promise;
	}
	invokeExceptSource(type, payload, source) {
		const ports = this.sendPorts.slice();
		indexOfAndSplice(ports, source);
		ports.forEach((target) => {
			this.invokeVoid(type, payload, target);
		});
	}
	async invokeExceptSourceAsync(type, payload, source) {
		const ports = this.sendPorts.slice();
		indexOfAndSplice(ports, source);
		await Promise.all(ports.map((target) => this.invoke(type, payload, void 0, target)));
	}
};
(function(_SuperMessagePort) {
	class TransferableResult {
		constructor(value, transferables) {
			this.value = value;
			this.transferables = transferables;
		}
	}
	_SuperMessagePort.TransferableResult = TransferableResult;
})(SuperMessagePort || (SuperMessagePort = {}));
var superMessagePort_default = SuperMessagePort;
//#endregion
export { indexOfAndSplice as n, tabId as r, superMessagePort_default as t };
