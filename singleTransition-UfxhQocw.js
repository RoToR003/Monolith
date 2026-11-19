//# allFunctionsCalledOnLoad
import { l as IS_SAFARI } from "./userAgent-ByGXcznk.js";
import { y as bytesToDataURL } from "./themeController-2cytOOn0.js";
import { c as convertToUint8Array } from "./cryptoMessagePort-D8QFBtT1.js";
import { t as liteMode } from "./liteMode-DeLStZfQ.js";
import { r as renderImageFromUrlPromise, t as blur } from "./blur-BvAbRYUw.js";
import { t as bytesFromHex } from "./bytesFromHex-DEB8Alee.js";
//#region src/helpers/bytes/getPreviewURLFromBytes.ts
var JPEG_HEADER = bytesFromHex("ffd8ffe000104a46494600010100000100010000ffdb004300281c1e231e19282321232d2b28303c64413c37373c7b585d4964918099968f808c8aa0b4e6c3a0aadaad8a8cc8ffcbdaeef5ffffff9bc1fffffffaffe6fdfff8ffdb0043012b2d2d3c353c76414176f8a58ca5f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8ffc00011080000000003012200021101031101ffc4001f0000010501010101010100000000000000000102030405060708090a0bffc400b5100002010303020403050504040000017d01020300041105122131410613516107227114328191a1082342b1c11552d1f02433627282090a161718191a25262728292a3435363738393a434445464748494a535455565758595a636465666768696a737475767778797a838485868788898a92939495969798999aa2a3a4a5a6a7a8a9aab2b3b4b5b6b7b8b9bac2c3c4c5c6c7c8c9cad2d3d4d5d6d7d8d9dae1e2e3e4e5e6e7e8e9eaf1f2f3f4f5f6f7f8f9faffc4001f0100030101010101010101010000000000000102030405060708090a0bffc400b51100020102040403040705040400010277000102031104052131061241510761711322328108144291a1b1c109233352f0156272d10a162434e125f11718191a262728292a35363738393a434445464748494a535455565758595a636465666768696a737475767778797a82838485868788898a92939495969798999aa2a3a4a5a6a7a8a9aab2b3b4b5b6b7b8b9bac2c3c4c5c6c7c8c9cad2d3d4d5d6d7d8d9dae2e3e4e5e6e7e8e9eaf2f3f4f5f6f7f8f9faffda000c03010002110311003f00");
var JPEG_TAIL = bytesFromHex("ffd9");
function getPreviewBytesFromURL(url) {
	const sliced = url.slice(url.indexOf("base64,") + 7);
	const jpegBytes = [...atob(sliced)].map((char) => char.charCodeAt(0));
	return new Uint8Array(jpegBytes);
}
function getPreviewURLFromBytes(bytes, isSticker = false) {
	let arr;
	if (!isSticker && bytes[0] === 1) {
		arr = new Uint8Array(JPEG_HEADER.concat(Array.from(bytes.slice(3)), JPEG_TAIL));
		arr[164] = bytes[1];
		arr[166] = bytes[2];
	} else arr = convertToUint8Array(bytes);
	let mimeType;
	if (isSticker) mimeType = IS_SAFARI ? "image/png" : "image/webp";
	else mimeType = "image/jpeg";
	return bytesToDataURL(arr, mimeType);
}
//#endregion
//#region src/helpers/getPreviewURLFromThumb.ts
function getPreviewURLFromThumb(photo, thumb, isSticker = false) {
	return getPreviewURLFromBytes(thumb.bytes, isSticker);
}
//#endregion
//#region src/helpers/getImageFromStrippedThumb.ts
function getImageFromStrippedThumb(photo, thumb, useBlur, url = getPreviewURLFromThumb(photo, thumb, false)) {
	let element, loadPromise;
	if (!useBlur) {
		element = new Image();
		loadPromise = renderImageFromUrlPromise(element, url);
	} else {
		const result = blur(url, typeof useBlur === "number" ? useBlur : void 0);
		element = result.canvas;
		loadPromise = result.promise;
	}
	element.classList.add("thumbnail");
	return {
		image: element,
		loadPromise
	};
}
//#endregion
//#region src/components/singleTransition.ts
var $TRANSITION_RAF = Symbol("RAF");
var $TRANSITION_TIMEOUT = Symbol("TIMEOUT");
var SetTransition = (options) => {
	const { element, className, forwards, duration, onTransitionEnd, onTransitionStart, useRafs } = options;
	const classNames = className && className.split(" ");
	const timeout = element[$TRANSITION_TIMEOUT];
	const raf = element[$TRANSITION_RAF];
	if (timeout !== void 0) clearTimeout(+timeout);
	if (raf !== void 0) {
		window.cancelAnimationFrame(+raf);
		if (!useRafs) delete element[$TRANSITION_RAF];
	}
	if (useRafs && liteMode.isAvailable("animations") && duration) {
		element[$TRANSITION_RAF] = "" + window.requestAnimationFrame(() => {
			delete element[$TRANSITION_RAF];
			SetTransition({
				...options,
				useRafs: useRafs - 1
			});
		});
		return;
	}
	if (forwards && className) element.classList.add(...classNames);
	const afterTimeout = () => {
		delete element[$TRANSITION_TIMEOUT];
		if (!forwards && className) element.classList.remove("backwards", ...classNames);
		element.classList.remove("animating");
		onTransitionEnd?.();
	};
	onTransitionStart?.();
	element.classList.toggle("forwards", forwards);
	if (!liteMode.isAvailable("animations") || !duration) {
		element.classList.remove("animating", "backwards");
		afterTimeout();
		return;
	}
	element.classList.add("animating");
	element.classList.toggle("backwards", !forwards);
	element[$TRANSITION_TIMEOUT] = "" + setTimeout(afterTimeout, duration);
};
//#endregion
export { getPreviewURLFromBytes as a, getPreviewBytesFromURL as i, getImageFromStrippedThumb as n, getPreviewURLFromThumb as r, SetTransition as t };
