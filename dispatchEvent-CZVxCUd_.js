//# allFunctionsCalledOnLoad
//#region src/helpers/dom/dispatchEvent.ts
var getSimulatedEvent = (name) => new Event(name, {
	bubbles: true,
	cancelable: true
});
function simulateEvent(elem, name) {
	const event = getSimulatedEvent(name);
	elem.dispatchEvent(event);
}
//#endregion
export { simulateEvent as n, getSimulatedEvent as t };
