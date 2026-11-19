//# allFunctionsCalledOnLoad
import { r as throttleWith } from "./commonStateStorage-CW-poHCa.js";
import { M as onCleanup, _ as createMemo, d as batch, g as createEffect } from "./solid-9Vxm0VIz.js";
import { n as createStore } from "./store-PwRn5fa3.js";
import { t as liteMode } from "./liteMode-DeLStZfQ.js";
import { t as requestRAF } from "./requestRAF-CwdYaVwH.js";
import { t as animateValue } from "./animateValue-C0de6s5K.js";
import { t as subscribeOn } from "./subscribeOn-DnCla7ws.js";
import { M as useIsCleaned } from "./openEditors-7FmA7q_V.js";
import { t as cloneDOMRect } from "./cloneDOMRect-DCQvg4jX.js";
var createSortableList_module_default = { grabbing: "_grabbing_lgpzl_1" };
//#endregion
//#region src/helpers/solid/createSortableList.tsx
var autoScrollThreshold = 60;
var autoScrollSpeedBase = 6;
var createSortableList = (args) => {
	const context = createDragContextValue(args);
	const startDrag = useStartDrag(context);
	watchScrollPosition(context);
	attachGrabbingClassname(context);
	onCleanup(() => {
		context.cancelFinishingAnimation?.();
	});
	const itemRef = (id) => (el) => {
		context.elements.set(id, el);
		onCleanup(() => context.elements.delete(id));
	};
	const dragHandleProps = (id) => ({ onPointerDown: (e) => startDrag(e, id) });
	return {
		isDragging: () => context.dragState.isDragging,
		draggingId: () => context.dragState.id,
		itemRef,
		itemStyle: useItemStyle(context),
		dragHandleProps
	};
};
var createDragContextValue = ({ container, items, getId, onReorder }) => {
	const intialDragState = {
		id: null,
		isDragging: false,
		startIndex: 0,
		overIndex: 0,
		deltaY: 0,
		pointerStartY: 0,
		initialScrollTop: 0,
		currentScrollTop: 0
	};
	const [dragState, setDragState] = createStore(structuredClone(intialDragState));
	const [finishingAnimationState, setFinishingAnimationState] = createStore({
		id: null,
		shift: 0
	});
	const scrollAdjustment = createMemo(() => dragState.currentScrollTop - dragState.initialScrollTop);
	const resetDragState = () => setDragState(intialDragState);
	return {
		container,
		items,
		getId,
		onReorder,
		elements: /* @__PURE__ */ new Map(),
		rects: /* @__PURE__ */ new Map(),
		dragState,
		setDragState,
		resetDragState,
		finishingAnimationState,
		setFinishingAnimationState,
		scrollAdjustment
	};
};
var useFindIndexById = (context) => (id) => {
	const { items, getId } = context;
	return items().findIndex((x) => getId(x) === id);
};
var useGetRectAtIndex = (context) => (index) => {
	const { items, getId, rects } = context;
	if (index < 0 || index >= items().length) return null;
	return rects.get(getId(items()[index]));
};
var useCalculateShift = (context) => {
	const { dragState, scrollAdjustment, items, rects } = context;
	const getRectAtIndex = useGetRectAtIndex(context);
	return (id) => {
		let shift = dragState.deltaY + scrollAdjustment();
		const rect = rects.get(id);
		let firstRect;
		for (let i = 0; i < items().length; i++) {
			const rect = getRectAtIndex(i);
			if (rect) {
				firstRect = rect;
				break;
			}
		}
		let lastRect;
		for (let i = items().length - 1; i >= 0; i--) {
			const rect = getRectAtIndex(i);
			if (rect) {
				lastRect = rect;
				break;
			}
		}
		if (rect && firstRect && lastRect) {
			shift = Math.max(shift, firstRect.top - rect.top);
			shift = Math.min(shift, lastRect.bottom - rect.bottom);
		}
		return shift;
	};
};
var useMeasureElements = (context) => () => {
	const { rects, elements, container, items, getId } = context;
	rects.clear();
	const localContainer = container();
	if (!localContainer) return;
	context.containerRect = cloneDOMRect(localContainer.getBoundingClientRect());
	context.containerScrollHeight = localContainer.scrollHeight;
	for (const item of items()) {
		const id = getId(item);
		const el = elements.get(id);
		if (!el) continue;
		const cloned = cloneDOMRect(el.getBoundingClientRect());
		const { containerRect } = context;
		cloned.top -= containerRect.top;
		cloned.bottom -= containerRect.top;
		cloned.left -= containerRect.left;
		cloned.right -= containerRect.left;
		rects.set(id, cloned);
	}
};
var useUpdateOverIndex = (context) => (y) => {
	const { containerRect, scrollAdjustment, items, getId, setDragState, rects } = context;
	if (!containerRect) return;
	let idx = 0;
	const ids = items().map(getId);
	y += -containerRect.top + scrollAdjustment();
	for (let i = 0; i < ids.length; i++) {
		const id = ids[i];
		const rect = rects.get(id);
		if (rect && y >= rect.top) idx = i;
	}
	setDragState({ overIndex: idx });
};
var useStartDrag = (context) => {
	const { setDragState, container } = context;
	const findIndexById = useFindIndexById(context);
	const measureElements = useMeasureElements(context);
	const handlePointerMove = useHandlePointerMove(context);
	const handlePointerUp = useHandlePointerUp(context, () => removeListeners);
	const dragWindow = () => container().ownerDocument.defaultView || window;
	const setListeners = () => {
		dragWindow().addEventListener("pointermove", handlePointerMove, { passive: false });
		dragWindow().addEventListener("pointerup", handlePointerUp);
		dragWindow().addEventListener("pointercancel", handlePointerUp);
	};
	const removeListeners = () => {
		dragWindow().removeEventListener("pointermove", handlePointerMove);
		dragWindow().removeEventListener("pointerup", handlePointerUp);
		dragWindow().removeEventListener("pointercancel", handlePointerUp);
	};
	onCleanup(() => {
		removeListeners();
	});
	return (e, id) => {
		if (e.button !== 0 && e.pointerType !== "touch") return;
		e.preventDefault();
		context.cancelFinishingAnimation?.();
		requestRAF(() => {
			measureElements();
			const index = findIndexById(id);
			setDragState({
				isDragging: true,
				id,
				deltaY: 0,
				startIndex: index,
				overIndex: index,
				initialScrollTop: container()?.scrollTop,
				currentScrollTop: container()?.scrollTop,
				pointerStartY: e.clientY
			});
			setListeners();
		});
	};
};
var useHandlePointerMove = (context) => {
	const { dragState, setDragState } = context;
	const updateOverIndex = useUpdateOverIndex(context);
	const loopAutoScroll = useLoopAutoScroll(context);
	return throttleWith(requestRAF, (e) => {
		if (!dragState.isDragging) return;
		const y = e.clientY;
		batch(() => {
			setDragState({ deltaY: y - dragState.pointerStartY });
			updateOverIndex(y);
			loopAutoScroll(y);
		});
	}, false);
};
var useHandlePointerUp = (context, getRemoveListeners) => {
	const endDrag = useEndDrag(context);
	return () => {
		const removeListeners = getRemoveListeners();
		endDrag();
		removeListeners();
	};
};
var useStartAutoScroll = (context) => {
	const isCleaned = useIsCleaned();
	const updateOverIndex = useUpdateOverIndex(context);
	return (y) => {
		const { dragState, container, containerRect, containerScrollHeight } = context;
		if (isCleaned() || !dragState.isDragging) return false;
		const localContainer = container();
		if (!localContainer || !containerRect || !containerScrollHeight) return false;
		let speed = 0;
		if (y < containerRect.top + autoScrollThreshold) speed = -6 * (1 - Math.max(0, y - containerRect.top) / autoScrollThreshold);
		else if (y > containerRect.bottom - autoScrollThreshold) speed = autoScrollSpeedBase * (1 - Math.max(0, containerRect.bottom - y) / autoScrollThreshold);
		const scrollTop = localContainer.scrollTop;
		const scrollHeight = containerScrollHeight;
		const clientHeight = containerRect.height;
		speed = Math.max(-scrollTop, Math.min(scrollHeight - scrollTop - clientHeight, speed));
		speed = Math.round(speed);
		if (Math.abs(speed) === 0) return false;
		localContainer.scrollTop = scrollTop + speed;
		updateOverIndex(y);
		return true;
	};
};
var useLoopAutoScroll = (context) => {
	const { dragState } = context;
	const autoScroll = useStartAutoScroll(context);
	let autoScrollRef = {};
	onCleanup(() => {
		autoScrollRef = {};
	});
	return (y) => {
		if (!dragState.isDragging) return;
		autoScrollRef = {};
		const savedRef = autoScrollRef;
		const frame = () => {
			if (autoScrollRef === savedRef && autoScroll(y)) requestRAF(frame);
		};
		requestRAF(frame);
	};
};
var useEndDrag = (context) => {
	const calculateShift = useCalculateShift(context);
	return () => {
		const { dragState, onReorder, items, rects, setFinishingAnimationState, getId, resetDragState } = context;
		if (!dragState.isDragging) return;
		const { startIndex, overIndex, id } = dragState;
		const fromRect = rects.get(getId(items()[startIndex]));
		const toRect = rects.get(getId(items()[overIndex]));
		const moved = toRect && fromRect ? overIndex < startIndex ? toRect.top - fromRect.top : toRect.bottom - fromRect.bottom : 0;
		const shift = calculateShift(id) - moved;
		batch(() => {
			resetDragState();
			onReorder(reorder(items(), startIndex, overIndex));
			if (shift === 0 || !liteMode.isAvailable("motion")) return;
			setFinishingAnimationState({
				id,
				shift
			});
			context.cancelFinishingAnimation = animateValue(shift, 0, 200, (value) => {
				setFinishingAnimationState("shift", value);
			}, { onEnd: () => {
				setFinishingAnimationState({
					id: null,
					shift: 0
				});
			} });
		});
		rects.clear();
	};
};
var watchScrollPosition = (context) => {
	const { container, dragState, setDragState } = context;
	createEffect(() => {
		const localContainer = container();
		if (!localContainer) return;
		subscribeOn(localContainer)("scroll", throttleWith(requestRAF, () => {
			if (!dragState.isDragging) return;
			setDragState({ currentScrollTop: localContainer.scrollTop });
		}, false), { passive: true });
	});
};
var attachGrabbingClassname = (context) => {
	const { dragState } = context;
	createEffect(() => {
		if (!dragState.isDragging) return;
		document.body.classList.add(createSortableList_module_default.grabbing);
		onCleanup(() => {
			document.body.classList.remove(createSortableList_module_default.grabbing);
		});
	});
};
var useItemStyle = (context) => {
	const findIndexById = useFindIndexById(context);
	const getRectAtIndex = useGetRectAtIndex(context);
	const calculateShift = useCalculateShift(context);
	return (id) => {
		const { dragState, finishingAnimationState, rects } = context;
		if (id === finishingAnimationState.id) return {
			"transform": `translateY(${finishingAnimationState.shift}px)`,
			...baseMovingStyle
		};
		if (!dragState.isDragging) return {};
		if (id === dragState.id) return {
			"transform": `translateY(${calculateShift(id)}px)`,
			...baseMovingStyle
		};
		const activeRect = rects.get(dragState.id);
		const prevRect = getRectAtIndex(dragState.startIndex - 1);
		const nextRect = getRectAtIndex(dragState.startIndex + 1);
		if (!activeRect) return {};
		const index = findIndexById(id);
		let shift = 0;
		if (index < dragState.startIndex && index >= dragState.overIndex) shift = activeRect.height + (prevRect ? activeRect.top - prevRect.bottom : 0);
		else if (index > dragState.startIndex && index <= dragState.overIndex) shift = -activeRect.height - (nextRect ? nextRect.top - activeRect.bottom : 0);
		return {
			transform: `translateY(${shift}px)`,
			transition: liteMode.isAvailable("motion") ? "transform 0.2s" : "none"
		};
	};
};
var baseMovingStyle = {
	"position": "relative",
	"transition": "none",
	"z-index": 1
};
var reorder = (list, from, to) => {
	if (from === to) return list;
	const copy = list.slice();
	const [moved] = copy.splice(from, 1);
	copy.splice(to, 0, moved);
	return copy;
};
//#endregion
export { createSortableList as t };
