//# allFunctionsCalledOnLoad
import { h as Modes } from "./userAgent-ByGXcznk.js";
import { n as getAppWindow } from "./appWindow-bo-KtJhy.js";
import { a as isLastInputPointer, t as FOCUS_TRAP_ATTACHED_ATTRIBUTE } from "./focusTrap-CKEkJXZv.js";
//#region src/helpers/clipboard.ts
function getClipboardContext(appWindow = getAppWindow()) {
	return {
		ClipboardItemConstructor: appWindow.ClipboardItem,
		clipboard: appWindow.navigator.clipboard
	};
}
function canWriteClipboardItem(mimeType, appWindow = getAppWindow()) {
	const { ClipboardItemConstructor, clipboard } = getClipboardContext(appWindow);
	return !!(ClipboardItemConstructor && clipboard?.write && (!ClipboardItemConstructor.supports || ClipboardItemConstructor.supports(mimeType)));
}
function writeClipboardItem(data, appWindow = getAppWindow()) {
	const { ClipboardItemConstructor, clipboard } = getClipboardContext(appWindow);
	if (!ClipboardItemConstructor || !clipboard?.write) throw new Error("Clipboard item writing is not supported");
	return clipboard.write([new ClipboardItemConstructor(data)]);
}
function fallbackCopyTextToClipboard(text, html, options, appWindow = getAppWindow()) {
	const { document } = appWindow;
	const textArea = document.createElement("textarea");
	textArea.value = text;
	textArea.setAttribute(FOCUS_TRAP_ATTACHED_ATTRIBUTE, "");
	if (html) textArea.addEventListener("copy", (e) => {
		if (!e.clipboardData) return;
		e.clipboardData.setData("text/plain", text);
		e.clipboardData.setData("text/html", html);
		e.preventDefault();
	});
	textArea.style.top = "0";
	textArea.style.left = "0";
	textArea.style.position = "fixed";
	const focused = Modes.a11y ? document.activeElement : void 0;
	document.body.appendChild(textArea);
	textArea.focus();
	textArea.select();
	try {
		document.execCommand("copy");
		appWindow.getSelection().removeAllRanges();
	} catch (err) {
		console.error("unable to copy", err);
		if (options?.rethrow) throw err;
	} finally {
		document.body.removeChild(textArea);
		if (focused?.isConnected && (!document.activeElement || document.activeElement === document.body)) focused.focus({
			preventScroll: true,
			...isLastInputPointer() && { focusVisible: false }
		});
	}
}
async function copyTextToClipboard(text, html, options) {
	const appWindow = getAppWindow();
	const BlobConstructor = appWindow.Blob;
	if (!appWindow.navigator.clipboard) {
		fallbackCopyTextToClipboard(text, void 0, options, appWindow);
		return;
	}
	try {
		if (!html) {
			await appWindow.navigator.clipboard.writeText(text);
			return;
		}
		await writeClipboardItem({
			"text/plain": new BlobConstructor([text], { type: "text/plain" }),
			"text/html": new BlobConstructor([html], { type: "text/html" })
		}, appWindow);
	} catch (err) {
		console.error("clipboard error", err);
		fallbackCopyTextToClipboard(text, html, options, appWindow);
	}
}
/**
* Copies a text that is still to come (one the worker answers with). Safari writes only within the click that asks
* for it, and an answer from the worker comes after it, so the write starts at once with the text promised; where a
* ClipboardItem cannot be written, or its write is refused, the text is written once it comes
* (`copyTextToClipboard`, down to `execCommand`). Rejects when it is not copied.
*/
function copyPendingTextToClipboard(text) {
	const appWindow = getAppWindow();
	const copyOnceCome = () => text.then((text) => copyTextToClipboard(text, void 0, { rethrow: true }));
	if (!canWriteClipboardItem("text/plain", appWindow)) return copyOnceCome();
	const BlobConstructor = appWindow.Blob;
	let written;
	try {
		written = writeClipboardItem({ "text/plain": text.then((text) => new BlobConstructor([text], { type: "text/plain" })) }, appWindow);
	} catch (err) {
		written = Promise.reject(err);
	}
	return written.catch((err) => {
		console.error("clipboard error", err);
		return copyOnceCome();
	});
}
//#endregion
export { writeClipboardItem as i, copyPendingTextToClipboard as n, copyTextToClipboard as r, canWriteClipboardItem as t };
