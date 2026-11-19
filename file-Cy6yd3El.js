//# allFunctionsCalledOnLoad
import { r as _i18n, u as langPack_default } from "./langPack-BmdJGr44.js";
import { o as useAppSettings } from "./liteMode-DeLStZfQ.js";
import { t as RangeSelector } from "./rangeSelector-Bspn3Z0a.js";
import { t as formatBytes } from "./formatBytes-HLLlT7Mr.js";
import { l as debounce } from "./pickKeys-Ckq7_h-r.js";
import { n as autoDownloadTab, t as autoDownloadPeerTypeSection } from "./peerTypeSection-BbKdA5qo.js";
//#region src/components/sidebarLeft/tabs/autoDownload/file.tsx
var RangeSettingSelector = class {
	constructor(name, step, initialValue, minValue, maxValue, writeValue = true) {
		const BASE_CLASS = "range-setting-selector";
		this.container = document.createElement("div");
		this.container.classList.add(BASE_CLASS);
		const details = document.createElement("div");
		details.classList.add(BASE_CLASS + "-details");
		const nameDiv = document.createElement("div");
		nameDiv.classList.add(BASE_CLASS + "-name");
		_i18n(nameDiv, name);
		const valueDiv = this.valueContainer = document.createElement("div");
		valueDiv.classList.add(BASE_CLASS + "-value");
		if (writeValue) valueDiv.innerHTML = "" + initialValue;
		details.append(nameDiv, valueDiv);
		this.range = new RangeSelector({
			step,
			min: minValue,
			max: maxValue
		}, initialValue);
		this.range.setListeners();
		this.range.setHandlers({ onScrub: (value) => {
			this.onChange?.(value);
			if (writeValue) valueDiv.innerText = "" + value;
		} });
		this.container.append(details, this.range.container);
	}
};
var file_default = autoDownloadTab((tab) => {
	const [appSettings, setAppSettings] = useAppSettings();
	const debouncedSave = debounce((sizeMax) => {
		setAppSettings("autoDownloadNew", "file_size_max", sizeMax);
	}, 200, false, true);
	const MIN = 524288;
	const MAX_RANGE = 20447232;
	const sizeMax = appSettings.autoDownloadNew.file_size_max;
	const value = Math.sqrt(Math.sqrt((sizeMax - MIN) / MAX_RANGE));
	const upTo = new langPack_default.IntlElement({
		key: "AutodownloadSizeLimitUpTo",
		args: [formatBytes(sizeMax)]
	});
	const range = new RangeSettingSelector("AutoDownloadMaxFileSize", .01, value, 0, 1, false);
	range.onChange = (value) => {
		const sizeMax = value ** 4 * MAX_RANGE + MIN | 0;
		upTo.compareAndUpdate({ args: [formatBytes(sizeMax)] });
		debouncedSave(sizeMax);
	};
	range.valueContainer.append(upTo.element);
	tab.scrollable.append(autoDownloadPeerTypeSection("file", "AutoDownloadFilesTitle", tab.middlewareHelper.get(), range.container));
});
//#endregion
export { file_default as default };
