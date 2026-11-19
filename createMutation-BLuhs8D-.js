//# allFunctionsCalledOnLoad
import { t as noop } from "./noop-H9NNBLfX.js";
import { C as createSignal, _ as createMemo } from "./solid-9Vxm0VIz.js";
//#region src/helpers/solid/createMutation.ts
function createMutation(mutationFn, options = {}) {
	const [status, setStatus] = createSignal("idle");
	const [data, setData] = createSignal(void 0);
	const [error, setError] = createSignal(void 0);
	const isPending = createMemo(() => status() === "pending");
	const isSuccess = createMemo(() => status() === "success");
	const isError = createMemo(() => status() === "error");
	const isIdle = createMemo(() => status() === "idle");
	const reset = () => {
		setStatus("idle");
		setData(void 0);
		setError(void 0);
	};
	const mutateAsync = async (variables) => {
		setStatus("pending");
		setData(void 0);
		setError(void 0);
		try {
			await options.onMutate?.(variables);
			const result = await mutationFn(variables);
			setData(() => result);
			setStatus("success");
			await options.onSuccess?.(result, variables);
			await options.onSettled?.(result, void 0, variables);
			return result;
		} catch (err) {
			const typedError = err;
			setError(() => typedError);
			setStatus("error");
			await options.onError?.(typedError, variables);
			await options.onSettled?.(void 0, typedError, variables);
			throw err;
		}
	};
	const mutate = (variables) => {
		mutateAsync(variables).catch(noop);
	};
	return {
		mutate,
		mutateAsync,
		reset,
		data,
		error,
		status,
		isPending,
		isSuccess,
		isError,
		isIdle
	};
}
//#endregion
export { createMutation as t };
