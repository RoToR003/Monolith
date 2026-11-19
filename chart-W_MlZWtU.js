//# allFunctionsCalledOnLoad
import { u as langPack_default } from "./langPack-BmdJGr44.js";
import { r as getOverlayRoot } from "./appWindow-bo-KtJhy.js";
//#region src/lib/tchart/animator.ts
var easing = (st, ed, per, tween) => {
	return {
		linear: (t, b, c, d) => {
			return c * t / d + b;
		},
		easeInOutQuad: (t, b, c, d) => {
			t /= d * .5;
			if (t < 1) return c * .5 * t * t + b;
			t--;
			return -c / 2 * (t * (t - 2) - 1) + b;
		}
	}[tween](per, st, ed - st, 1);
};
var TAnimator = class {
	constructor(opts) {
		this.queue = {};
		this.queueSize = 0;
		this.step = () => {
			const done = [];
			const cur = +/* @__PURE__ */ new Date();
			let item, time, duration, per, curVal;
			const group = {
				top: false,
				bottom: false
			};
			for (const itemKey in this.queue) {
				item = this.queue[itemKey];
				time = cur;
				duration = item.endDt - item.startDt;
				curVal = item.state[itemKey];
				const delayed = time < item.startDt;
				if (time < item.startDt) time = item.startDt;
				else if (time > item.endDt) time = item.endDt;
				per = duration ? (time - item.startDt) / duration : delayed ? 0 : 1;
				let newVal;
				if (per < 1) {
					if (item.tween === "exp") newVal = curVal + (item.end - curVal) * item.speed;
					else newVal = easing(item.start, item.end, per, item.tween);
				} else newVal = item.end;
				if (newVal !== curVal) {
					item.state[itemKey] = newVal;
					group.top = group.top || item.group.top;
					group.bottom = group.bottom || item.group.bottom;
				} else if (newVal === item.end) done.push(itemKey);
			}
			let j = 0;
			while (j < done.length) {
				this.queue[done[j]].cbEnd && this.queue[done[j]].cbEnd(this.queue[done[j]].state);
				delete this.queue[done[j]];
				j++;
			}
			this.queueSize -= done.length;
			this.composer.render(group);
			if (!this.queueSize) delete this.animFrame;
			else this.animFrame = requestAnimationFrame(this.step);
		};
		this.composer = opts.composer;
		this.state = opts.state;
	}
	add(params) {
		let i = 0;
		const cur = +/* @__PURE__ */ new Date();
		let item, param, delta;
		const queue = this.queue;
		while (i < params.length) {
			param = params[i];
			item = queue[param.prop];
			if (!item) {
				if (param.end === param.state[param.prop]) {
					param.cbEnd && param.cbEnd(param.state);
					i++;
					continue;
				}
				item = { lastStart: 1 };
				queue[param.prop] = item;
				this.queueSize++;
			}
			delta = cur - item.lastStart;
			param.duration *= this.state.speed;
			param.delay *= this.state.speed;
			item.cbEnd = param.cbEnd;
			item.state = param.state;
			item.lastStart = cur;
			item.start = param.state[param.prop];
			item.end = param.end;
			item.startDt = cur + (param.delay || 0);
			item.endDt = item.startDt + (param.duration || 0) - (param.fixed ? 0 : Math.max(param.duration - delta, 0));
			item.tween = param.tween || "easeInOutQuad";
			item.speed = param.speed;
			item.group = param.group;
			i++;
		}
		if (!this.animFrame) this.animFrame = requestAnimationFrame(this.step);
	}
	get(prop) {
		return this.queue[prop];
	}
};
//#endregion
//#region src/lib/tchart/format.ts
var MONTHS = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December"
];
var MONTHS_SHORT = MONTHS.map((month) => month.slice(0, 3));
var WEEK_DAYS = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday"
];
var WEEK_DAYS_SHORT = WEEK_DAYS.map((month) => month.slice(0, 3));
function statsFormatDayHour(value, data) {
	return statsFormatDayHourFull(value, data);
}
var utcDiff;
function statsFormatDayHourFull(value, data) {
	if (utcDiff === void 0) utcDiff = (/* @__PURE__ */ new Date()).getTimezoneOffset() * 6e4;
	return data.getLabelTime(864e5 + +value * 36e5 + utcDiff);
}
function statsFormatDay(value, data) {
	return data.getLabelDate(value, {
		isShort: true,
		displayYear: false
	});
}
function statsFormatMin(value, data) {
	return data.getLabelTime(value);
}
function getLabelDate(value, { isShort, isMonthShort = true, displayWeekDay, displayYear = true, displayHours } = {}) {
	const date = new Date(value);
	const weekDaysArray = isShort ? WEEK_DAYS_SHORT : WEEK_DAYS;
	let string = `${date.getUTCDate()} ${(isMonthShort ? MONTHS_SHORT : MONTHS)[date.getUTCMonth()]}`;
	if (displayWeekDay) string = `${weekDaysArray[date.getUTCDay()]}, ` + string;
	if (displayYear) string += ` ${date.getUTCFullYear()}`;
	if (displayHours) string += `, ${("0" + date.getUTCHours()).slice(-2)}:${("0" + date.getUTCMinutes()).slice(-2)}`;
	return string;
}
function getLabelTime(value) {
	return new Date(value).toString().match(/(\d+:\d+):/)[1];
}
//#endregion
//#region src/lib/tchart/utils.ts
var _Math;
var _Math2;
(_Math = Math).log2 || (_Math.log2 = function(x) {
	return Math.log(x) * Math.LOG2E;
});
(_Math2 = Math).log10 || (_Math2.log10 = function(x) {
	return Math.log(x) * Math.LOG10E;
});
function simplifyData(tp, x, ys, xScale, xShift, visibleCols, xInd1, xInd2, dw) {
	const pointsPerPixel = (xInd2 - xInd1) / dw;
	const optX = [];
	const optYs = [];
	if (pointsPerPixel <= 1) return {
		xInd1,
		xInd2,
		x,
		ys
	};
	else {
		let xInd = 0;
		let xPrev = -999999999;
		const colsLen = visibleCols.length;
		let cnt;
		for (let i = xInd1; i <= xInd2; i++) {
			const tmpX = x[i] * xScale + xShift << 0;
			const notTheSame = tmpX > xPrev;
			if (notTheSame) {
				optX[xInd] = x[i];
				xInd++;
			} else cnt++;
			for (let j = 0; j < colsLen; j++) {
				const visColInd = visibleCols[j];
				optYs[visColInd] = optYs[visColInd] || { y: [] };
				const prevOptY = optYs[visColInd].y[xInd - 1];
				const curY = ys[visColInd].y[i];
				if (prevOptY === void 0) optYs[visColInd].y[xInd - 1] = curY;
				else optYs[visColInd].y[xInd - 1] += curY;
				if (xInd > 1) {
					if (notTheSame) optYs[visColInd].y[xInd - 2] /= cnt;
					if (i === xInd2) optYs[visColInd].y[xInd - 1] /= cnt;
				}
			}
			if (notTheSame) cnt = 1;
			xPrev = tmpX;
		}
		xInd1 = 0;
		xInd2 = xInd - 1;
		return {
			isOptimized: pointsPerPixel > 1,
			xInd1: 0,
			xInd2: xInd - 1,
			x: optX,
			ys: optYs
		};
	}
}
function getElemPagePos($el) {
	const rect = $el.getBoundingClientRect();
	return {
		x: rect.left + (window.pageXOffset || document.documentElement.scrollLeft),
		y: rect.top + (window.pageYOffset || document.documentElement.scrollTop)
	};
}
function getXIndex(x, xc, doNotClip) {
	let i1 = 0;
	let i2 = x.length - 1;
	if (!doNotClip) {
		if (xc < x[i1]) xc = x[i1];
		else if (xc > x[i2]) xc = x[i2];
	}
	while (Math.abs(i1 - i2) > 1) {
		const i = Math.round((i1 + i2) / 2);
		if (xc >= x[i1] && xc <= x[i]) i2 = i;
		else i1 = i;
	}
	return i1 + (xc - x[i1]) / (x[i2] - x[i1]);
}
function triggerEvent(eventName, details) {
	if (typeof window.CustomEvent !== "function") return;
	document.dispatchEvent(new CustomEvent(eventName, { detail: details || null }));
}
function isTouchDevice() {
	const prefixes = " -webkit- -moz- -o- -ms- ".split(" ");
	const mq = (query) => {
		return window.matchMedia(query).matches;
	};
	if ("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch) return true;
	return mq([
		"(",
		prefixes.join("touch-enabled),("),
		"heartz",
		")"
	].join(""));
}
function drawRoundedRect(ctx, dpi, w, h, x, y, r) {
	w *= dpi;
	h *= dpi;
	x *= dpi;
	y *= dpi;
	if (typeof r === "number") r = [
		r,
		r,
		r,
		r
	];
	r[0] *= dpi;
	r[1] *= dpi;
	r[2] *= dpi;
	r[3] *= dpi;
	ctx.beginPath();
	ctx.moveTo(x + r[0], y);
	ctx.lineTo(x + w - r[1], y);
	ctx.quadraticCurveTo(x + w, y, x + w, y + r[1]);
	ctx.lineTo(x + w, y + h - r[2]);
	ctx.quadraticCurveTo(x + w, y + h, x + w - r[2], y + h);
	ctx.lineTo(x + r[3], y + h);
	ctx.quadraticCurveTo(x, y + h, x, y + h - r[3]);
	ctx.lineTo(x, y + r[0]);
	ctx.quadraticCurveTo(x, y, x + r[0], y);
	ctx.closePath();
}
function drawRoundedRect2(ctx, dpi, w, h, x, y, r) {
	w *= dpi;
	h *= dpi;
	x *= dpi;
	y *= dpi;
	r *= dpi;
	if (w < 2 * r) r = w / 2;
	if (h < 2 * r) r = h / 2;
	ctx.beginPath();
	ctx.moveTo(x + r, y);
	ctx.arcTo(x + w, y, x + w, y + h, r);
	ctx.arcTo(x + w, y + h, x, y + h, r);
	ctx.arcTo(x, y + h, x, y, r);
	ctx.arcTo(x, y, x + w, y, r);
	ctx.closePath();
}
function getFormatter(formatterName, data, zoomMorph) {
	const f = (zoomMorph && zoomMorph > .5 && data.details ? data.details : data)[formatterName];
	const map = {
		"statsFormatDayHourFull": (value) => statsFormatDayHourFull(value, data),
		"statsFormatDayHour": (value) => statsFormatDayHour(value, data),
		"statsFormat('week')": (value) => statsFormatDay(value, data),
		"statsFormat('day')": (value) => statsFormatDay(value, data),
		"statsFormat('hour')": (value) => statsFormatMin(value, data),
		"statsFormat('5min')": (value) => statsFormatMin(value, data),
		"statsFormatTooltipValue": yTooltipFormatter,
		"statsTooltipFormat('week')": (value) => data.getLabelDate(value),
		"statsTooltipFormat('day')": (value) => data.getLabelDate(value),
		"statsTooltipFormat('hour')": (value) => data.getLabelTime(value),
		"statsTooltipFormat('5min')": (value) => data.getLabelTime(value),
		"null": (value) => "" + value
	};
	let formatter = map[f] || map["null"];
	if (f === "null") formatter = {
		xRangeFormatter: (value) => data.getLabelDate(value, {
			isShort: false,
			isMonthShort: false
		}),
		yTickFormatter
	}[formatterName] || formatter;
	return formatter;
}
function yTickFormatter(val, step, isFractional) {
	if (val === 0) return "0";
	if (step < 1e3) return "" + Math.floor(val);
	else if (step >= 1e3 && step < 1e6) {
		if (isFractional) return Math.floor(10 * val / 1e3) / 10 + "K";
		else return Math.round(val / 1e3) + "K";
	} else if (isFractional) return Math.floor(10 * val / 1e6) / 10 + "M";
	else return Math.round(val / 1e6) + "M";
}
function yTooltipFormatter(val) {
	if (typeof val !== "number") return typeof val === "string" ? val : "?";
	return statsFormatKMBT(val);
}
function statsFormatKMBT(val, kmbt, precision) {
	if (val === 0) return "0";
	if (kmbt === void 0) kmbt = statsChooseNumKMBT(val);
	const sval = statsFormatFixedKMBT(val, kmbt);
	if (precision === void 0) precision = statsChoosePrecision(sval);
	return sval.toFixed(precision) + kmbt;
}
function statsFormatFixedKMBT(val, kmbt) {
	switch (kmbt) {
		case "K": return val / 1e3;
		case "M": return val / 1e6;
		case "B": return val / 1e9;
		case "T": return val / 0xe8d4a51000;
	}
	return val;
}
function statsChoosePrecision(val) {
	var absVal = Math.abs(val);
	if (absVal > 10) return 0;
	if (absVal >= 1) return Math.abs(absVal - Math.floor(absVal)) < .001 ? 0 : 1;
	return 2;
}
function statsChooseNumKMBT(val) {
	var absVal = Math.abs(val);
	if (absVal >= 0xe8d4a51000) return "T";
	else if (absVal >= 1e9) return "B";
	else if (absVal >= 1e6) return "M";
	else if (absVal >= 2e3) return "K";
	return "";
}
function roundRange(y1, y2, cnt, refRange) {
	if (Math.abs(y2 - y1) < 1) {
		y1 -= y1 / 10;
		y2 += y2 / 10;
	}
	if (refRange) {
		const yd1 = (refRange.yMinOrig - refRange.yMin) / (refRange.yMaxOrig - refRange.yMinOrig);
		const yd2 = (refRange.yMax - refRange.yMaxOrig) / (refRange.yMaxOrig - refRange.yMinOrig);
		return {
			yMin: y1 - (y2 - y1) * yd1,
			yMax: y2 + (y2 - y1) * yd2,
			yMinOrig: y1,
			yMaxOrig: y2
		};
	}
	const calc = (d) => {
		const power = curPower * d;
		const min = Math.floor(y1 / power) * power;
		const max = min + cnt * Math.ceil((y2 - min) * scale / power) * power;
		return {
			good: max <= maxLevel && min >= minLevel,
			yMin: Math.round(min),
			yMax: Math.round(max),
			yMinOrig: y1,
			yMaxOrig: y2
		};
	};
	const scale = 1 / cnt;
	const step = (y2 - y1) * scale;
	let curPower = Math.max(Math.pow(10, Math.floor(Math.log10(step))), 1);
	const minLevel = y1 - step * .5;
	const maxLevel = y2 + step * .5;
	let range;
	let c = 1;
	while (true) {
		range = calc(5);
		if (range.good) break;
		range = calc(2);
		if (range.good) break;
		range = calc(1);
		if (range.good) break;
		curPower *= .1;
		c++;
		if (c > 10) return {
			yMinOrig: y1,
			yMaxOrig: y2,
			yMin: y1,
			yMax: y2
		};
	}
	return range;
}
//#endregion
//#region src/lib/tchart/areas.ts
var TAreas = class {
	constructor(opts) {
		this.opts = opts;
		if (opts.additional.mini) {
			this.$canvas = document.createElement("canvas");
			this.ctx = this.$canvas.getContext("2d", { alpha: true });
		}
	}
	onResize() {
		if (this.opts.additional.mini) {
			var dpi = this.opts.settings.dpi;
			var dims = this.opts.additional.mini ? this.opts.state.dims.mini : this.opts.state.dims.graph;
			this.$canvas.width = dims.w * dpi;
			this.$canvas.height = dims.h * dpi;
			this.cached = "";
		}
	}
	setDarkMode(enabled) {
		this.isDarkMode = enabled;
	}
	render() {
		let i, j, y, o, xScale;
		const opts = this.opts;
		const ys = opts.data.ys;
		const state = opts.state;
		const mini = opts.additional.mini;
		const x1 = mini ? state.xg1 : state.x1;
		const x2 = mini ? state.xg2 : state.x2;
		const settings = opts.settings;
		const pTop = settings[`PADD${mini ? "_MINI_AREA" : ""}`][0];
		const pRight = settings[`PADD${mini ? "_MINI_AREA" : ""}`][1];
		const pBottom = settings[`PADD${mini ? "_MINI_AREA" : ""}`][2];
		const pLeft = settings[`PADD${mini ? "_MINI_AREA" : ""}`][3];
		const x = opts.data.x;
		const dpi = opts.settings.dpi;
		const ctx = mini ? this.ctx : this.opts.ctx;
		const prevY = [];
		const totalPerX = [];
		const overlap = mini ? 0 : 0;
		const dims = mini ? state.dims.mini : state.dims.graph;
		const zoomMorph = state.zoomMorph === void 0 ? 0 : state.zoomMorph;
		let morph = zoomMorph;
		state.zoomMode;
		const ysLen = ys.length;
		if (mini) {
			const hash = [
				dims.w,
				dims.h,
				state.xg1,
				state.xg2,
				this.isDarkMode,
				state.zoomMode,
				zoomMorph
			];
			for (i = 0; i < ysLen; i++) {
				hash.push(state[`om_${i}`]);
				hash.push(state[`f_${i}`]);
			}
			const joinedHash = hash.join(",");
			if (joinedHash === this.cached) {
				this.opts.ctx.drawImage(this.$canvas, dims.l * dpi, dims.t * dpi);
				return;
			}
			this.cached = joinedHash;
		}
		xScale = (dims.w - pRight - pLeft) / (x2 - x1);
		let xInd1 = Math.floor(getXIndex(x, x1 - pLeft / xScale));
		let xInd2 = Math.ceil(getXIndex(x, x2 + pRight / xScale));
		xScale *= dpi;
		const xShift = (pLeft + (mini ? 0 : dims.l)) * dpi - x1 * xScale;
		const hBottom = (dims.h - pBottom + (mini ? 0 : dims.t)) * dpi;
		const visibleCols = [];
		const opacityCols = [];
		let textToCenter = 0;
		let fullyVisibleCount = 0;
		let fullyVisibleInd = 0;
		let hasUnfocusedColumns = false;
		for (i = 0; i < ysLen; i++) {
			o = mini ? state[`om_${i}`] : state[`o_${i}`];
			hasUnfocusedColumns = hasUnfocusedColumns || state[`f_${i}`] < 1;
			if (o < 1 && o > 0) textToCenter = o;
			if (o > 0) {
				visibleCols.push(i);
				opacityCols.push(o);
				if (o === 1 && state[`e_${i}`]) {
					fullyVisibleCount++;
					fullyVisibleInd = visibleCols.length - 1;
				}
			}
		}
		const colsLen = visibleCols.length;
		textToCenter = fullyVisibleCount === 1 ? textToCenter : 1;
		mini ? state["y1m"] : state["y1"];
		mini ? state["y2m"] : state["y2"];
		const optData = simplifyData("line", x, ys, xScale, xShift, visibleCols, xInd1, xInd2, dims.w - pRight - pLeft);
		xInd1 = optData.xInd1;
		xInd2 = optData.xInd2;
		const optX = optData.x;
		const optYs = optData.ys;
		let hasGapsInData = false;
		for (j = xInd1; j <= xInd2; j++) {
			prevY[j] = 0;
			totalPerX[j] = 0;
			for (i = 0; i < colsLen; i++) totalPerX[j] += (optYs[visibleCols[i]].y[j] || 0) * opacityCols[i];
			if (totalPerX[j] === 0) hasGapsInData = true;
		}
		if (hasGapsInData || hasUnfocusedColumns) {
			ctx.fillStyle = this.opts.settings.COLORS.background;
			ctx.fillRect(0, 0, dims.w * dpi, dims.h * dpi);
		}
		let angles, radius, cx, cy;
		if (zoomMorph > 0 && !mini) {
			if (morph === 1) {
				this.savedX1 = x1;
				this.savedX2 = x2;
			}
			let xInd1Real, xInd2Real;
			if (morph < 1) {
				const x1AnimItem = this.opts.animator.get("x1");
				const x2AnimItem = this.opts.animator.get("x2");
				const x1End = x1AnimItem ? x1AnimItem.end : this.opts.state["x1"];
				const x2End = x2AnimItem ? x2AnimItem.end : this.opts.state["x2"];
				xInd1Real = getXIndex(x, this.opts.state.zoomDir === -1 ? this.savedX1 : x1End, true);
				xInd2Real = getXIndex(x, this.opts.state.zoomDir === -1 ? this.savedX2 : x2End, true);
			} else {
				xInd1Real = getXIndex(x, x1, true);
				xInd2Real = getXIndex(x, x2, true);
			}
			xInd2Real--;
			var xInd1RealFloor = Math.floor(xInd1Real);
			var xInd1RealCeil = Math.ceil(xInd1Real);
			var xInd2RealFloor = Math.floor(xInd2Real);
			var xInd2RealCeil = Math.ceil(xInd2Real);
			var totalForAll = 0;
			var totalPerItem = [];
			for (i = 0; i < colsLen; i++) {
				totalPerItem[i] = 0;
				const tmpY = ys[visibleCols[i]].y;
				let tmp;
				for (j = xInd1RealCeil; j <= xInd2RealFloor; j++) {
					tmp = (tmpY[j] || 0) * opacityCols[i];
					totalPerItem[i] += tmp;
					totalForAll += tmp;
				}
				tmp = (xInd1RealCeil - xInd1Real) * (tmpY[xInd1RealFloor] || 0) * opacityCols[i];
				totalPerItem[i] += tmp;
				totalForAll += tmp;
				tmp = (xInd2Real - xInd2RealFloor) * (tmpY[xInd2RealCeil] || 0) * opacityCols[i];
				totalPerItem[i] += tmp;
				totalForAll += tmp;
			}
			const elastic = this.opts.state.zoomDir === 1 ? Math.pow(Math.min(Math.max(morph < .85 ? (morph - .65) / .2 : 1 - (morph - .9) / .15, 0), 1), .8) : this.prevElastic;
			let prevAngle = 2 * Math.PI - Math.PI / (7 - morph) - Math.PI / 8 * elastic;
			const initAngle = prevAngle;
			if (this.opts.state.zoomDir === 1) {
				morph = Math.min(Math.max((morph - .25) / .4, 0), 1);
				this.prevElastic = elastic;
			} else morph = Math.min(Math.max(morph * 2.4 - 1.4, 0), 1);
			angles = [];
			radius = settings.PIE_RADIUS * (zoomMorph < 1 ? 2.31 : 1) * dpi;
			cx = dpi * (dims.w / 2 + dims.l);
			cy = dpi * (dims.h / 2 + dims.t + 2);
			const rLen = 2 * Math.PI * radius / dpi;
			const pointsPerArcLen = 1 / 13;
			for (i = 0; i < colsLen; i++) {
				let percentage = totalPerItem[i] / totalForAll;
				percentage = percentage || 0;
				const len = 2 * Math.PI * percentage;
				let newAngle = prevAngle - len;
				const additionalPoints = Math.round(percentage * rLen * pointsPerArcLen);
				if (i === colsLen - 1) newAngle = initAngle - 2 * Math.PI;
				const overlapAng = Math.PI * 2 * .1 / rLen;
				const yItem = ys[visibleCols[i]];
				angles.push({
					st: prevAngle + overlapAng,
					ed: newAngle - overlapAng,
					mid: prevAngle - len / 2 - overlapAng / 2,
					additionalPoints: Math.max(additionalPoints, 4),
					percentage: percentage === 0 ? 0 : Math.max(Math.round(percentage * 100), 1),
					percentageText: percentage === 0 ? "" : percentage < .01 ? "<1%" : Math.round(percentage * 100) + "%",
					ind: visibleCols[i],
					value: totalPerItem[i],
					label: yItem.label,
					color: this.isDarkMode ? yItem.colors_n[2] : yItem.colors_d[2]
				});
				prevAngle = newAngle;
			}
			state.pieAngles = angles;
		}
		const yScale = dpi * (dims.h - pTop - pBottom + (mini ? 0 : -4));
		const yShift = (dims.h - pBottom + (mini ? 0 : dims.t)) * dpi;
		let colInd = 0;
		for (i = 0; i < ysLen; i++) {
			o = mini ? state[`om_${i}`] : state[`o_${i}`];
			if (o <= 0) continue;
			y = optYs[i].y;
			const k = o * yScale;
			ctx.fillStyle = this.isDarkMode ? ys[i].colors_n[0] : ys[i].colors_d[0];
			ctx.globalAlpha = state[`f_${i}`] * .9 + .1;
			ctx.beginPath();
			if (zoomMorph === 0 || !mini) {
				if (zoomMorph === 0) {
					if (i > 0) {
						ctx.moveTo(optX[xInd2] * xScale + xShift << 0, hBottom - prevY[xInd2] + overlap << 0);
						for (j = xInd2 - 1; j >= xInd1; j--) ctx.lineTo(optX[j] * xScale + xShift << 0, hBottom - prevY[j] + overlap << 0);
					} else {
						ctx.moveTo(optX[xInd2] * xScale + xShift << 0, hBottom << 0);
						ctx.lineTo(optX[xInd1] * xScale + xShift << 0, hBottom << 0);
					}
					if (colInd < colsLen - 1 || hasGapsInData) for (j = xInd1; j <= xInd2; j++) {
						const curH = hBottom - (yShift - (y[j] * k / totalPerX[j] || 0));
						let sy = prevY[j] + curH;
						if (sy > yScale) sy = yScale;
						ctx.lineTo(optX[j] * xScale + xShift << 0, hBottom - sy << 0);
						prevY[j] += curH;
					}
					else {
						ctx.lineTo(optX[xInd1] * xScale + xShift << 0, hBottom - yScale << 0);
						ctx.lineTo(optX[xInd2] * xScale + xShift << 0, hBottom - yScale << 0);
					}
				} else {
					const calcTrans = (fromX, fromY, toAngle, toR) => {
						let sx = 0;
						let sy = 0;
						if (selectionOffset && fullyVisibleCount > 1) {
							sx = Math.cos(angles[colInd].mid) * selectionOffset * 8 * dpi;
							sy = -Math.sin(angles[colInd].mid) * selectionOffset * 8 * dpi;
						}
						if (toR > radius) toR = radius;
						let fromAngle = Math.atan2(cy - fromY, fromX - cx);
						fromAngle = fromAngle < 0 ? Math.PI * 2 + fromAngle : fromAngle;
						const fromR = Math.pow((cy - fromY) * (cy - fromY) + (fromX - cx) * (fromX - cx), .5);
						if (Math.abs(toAngle - fromAngle) > Math.PI * (colsLen === 1 ? 1.5 : 1)) toAngle -= Math.PI * 2;
						if (toAngle < -Math.PI * 2) toAngle -= -Math.PI * 2;
						const ang = fromAngle + morph * (toAngle - fromAngle);
						const r = fromR + morph * (toR - fromR);
						return [cx + Math.cos(ang) * r + sx, cy - Math.sin(ang) * r + sy];
					};
					const additionalSteps = zoomMorph < 1 ? 4 : angles[colInd].additionalPoints;
					let dist;
					let cBot = false, cTop = false, xj;
					var selectionOffset = state[`pieInd_${visibleCols[colInd]}`] || 0;
					if (angles[colInd].percentage === 0) ctx.globalAlpha = 0;
					let res = calcTrans(optX[xInd2] * xScale + xShift, hBottom - prevY[xInd2], angles[0].st, radius);
					ctx.moveTo(res[0], res[1]);
					if (colInd > 0) for (j = xInd2 - 1; j >= xInd1; j--) {
						xj = optX[j] * xScale + xShift;
						if (xj === cx) cBot = true;
						if (xj >= cx) {
							dist = (xj - cx) / (dims.w * dpi / 2);
							if (morph === 0) dist = 0;
							res = calcTrans(xj, hBottom - prevY[j] + overlap, angles[0].st, radius * dist);
						} else {
							if (!cBot) {
								cBot = true;
								const sc = (cx - xj) / (optX[j + 1] * xScale + xShift - xj);
								const sy1 = hBottom - prevY[j] + overlap;
								const sy2 = hBottom - prevY[j + 1] + overlap;
								res = calcTrans(cx, sy1 + sc * (sy2 - sy1), angles[colInd].st, 0);
								ctx.lineTo(res[0], res[1]);
							}
							dist = (cx - xj) / (dims.w * dpi / 2);
							res = calcTrans(xj, hBottom - prevY[j] + overlap, angles[colInd].st, radius * dist);
						}
						ctx.lineTo(res[0], res[1]);
					}
					else {
						res = calcTrans(optX[xInd1] * xScale + xShift, hBottom, angles[0].st, radius);
						ctx.lineTo(res[0], res[1]);
					}
					if (colInd < colsLen - 1) {
						let sy1;
						for (j = 0; j <= additionalSteps; j++) {
							const curH = hBottom - (yShift - (y[xInd1] * k / totalPerX[xInd1] || 0));
							sy1 = hBottom - prevY[xInd1] + overlap;
							const sy2 = hBottom - prevY[xInd1] - curH;
							res = calcTrans(optX[xInd1] * xScale + xShift, sy1 + j / additionalSteps * (sy2 - sy1), angles[colInd].st + j / additionalSteps * (angles[colInd].ed - angles[colInd].st), radius);
							ctx.lineTo(res[0], res[1]);
						}
						for (j = xInd1; j <= xInd2; j++) {
							const curH = hBottom - (yShift - (y[j] * k / totalPerX[j] || 0));
							xj = optX[j] * xScale + xShift;
							if (xj === cx) cTop = true;
							if (xj <= cx) {
								dist = (cx - xj) / (dims.w * dpi / 2);
								var xjprev = xj;
								var syprev = hBottom - prevY[j] - curH;
								res = calcTrans(xj, syprev, angles[colInd].ed, radius * dist);
							} else {
								if (!cTop) {
									cTop = true;
									const sc = (cx - xjprev) / (xj - xjprev);
									sy1 = syprev;
									const sy2 = hBottom - prevY[j] - curH;
									res = calcTrans(cx, sy1 + sc * (sy2 - sy1), angles[colInd].ed, 0);
									ctx.lineTo(res[0], res[1]);
								}
								dist = (xj - cx) / (dims.w * dpi / 2);
								if (morph === 0) dist = 0;
								res = calcTrans(xj, hBottom - prevY[j] - curH, angles[0].st, radius * dist);
							}
							ctx.lineTo(res[0], res[1]);
							prevY[j] += curH;
						}
						if (xj < cx) {
							if (!cTop) {
								res = calcTrans(cx, sy1, angles[colInd].ed, 0);
								ctx.lineTo(res[0], res[1]);
							}
						}
					} else for (j = 0; j <= additionalSteps; j++) {
						res = calcTrans((optX[xInd1] + j / additionalSteps * (optX[xInd2] - optX[xInd1])) * xScale + xShift, 0, angles[colInd].st + j / additionalSteps * (angles[0].st - 2 * Math.PI - angles[colInd].st), radius);
						ctx.lineTo(res[0], res[1]);
					}
				}
			} else {
				const xw = this.opts.data.mainPeriodLen * xScale;
				ctx.moveTo(optX[xInd2] * xScale + xw + xShift, hBottom - prevY[xInd2]);
				if (i > 0) {
					ctx.lineTo(optX[xInd2] * xScale + xShift, hBottom - prevY[xInd2]);
					for (j = xInd2; j >= xInd1 + 1; j--) {
						ctx.lineTo(optX[j] * xScale + xShift, hBottom - (prevY[j] + morph * (prevY[j - 1] - prevY[j])) + overlap);
						ctx.lineTo(optX[j - 1] * xScale + xShift, hBottom - prevY[j - 1] + overlap);
					}
				} else ctx.lineTo(optX[xInd1] * xScale + xShift, hBottom);
				let curHNext;
				if (colInd < colsLen - 1) for (j = xInd1; j <= xInd2 - 1; j++) {
					let curY = yShift - (y[j] * k / totalPerX[j] || 0);
					const curH = hBottom - curY;
					if (j === xInd1) ctx.lineTo(optX[xInd1] * xScale + xShift, hBottom - prevY[xInd1] - curH);
					curY = yShift - (y[j + 1] * k / totalPerX[j + 1] || 0);
					curHNext = hBottom - curY;
					const yTo = prevY[j] + curH;
					const yFrom = prevY[j + 1] + curHNext;
					ctx.lineTo(optX[j + 1] * xScale + xShift, hBottom - (yFrom + morph * (yTo - yFrom)));
					ctx.lineTo(optX[j + 1] * xScale + xShift, hBottom - yFrom);
					if (j === xInd2 - 1) ctx.lineTo(optX[xInd2] * xScale + xw + xShift, hBottom - prevY[xInd2] - curHNext);
					prevY[j] += curH;
				}
				else {
					ctx.lineTo(optX[xInd1] * xScale + xShift << 0, hBottom - yScale << 0);
					ctx.lineTo(optX[xInd2] * xScale + xShift << 0, hBottom - yScale << 0);
				}
				prevY[xInd2] += curHNext;
			}
			ctx.closePath();
			ctx.fill();
			if (!mini && zoomMorph > 0 && angles[colInd].percentageText) {
				const opacity = Math.pow(morph, this.opts.state.zoomDir === 1 ? 4 : 20) * o * (state[`f_${i}`] * .9 + .1);
				let fontSize = Math.max(Math.min(angles[colInd].percentage * 2, 26), 10);
				const rad = settings.PIE_RADIUS;
				let offset = rad * 2 / 3;
				const cosVal = Math.cos(angles[colInd].mid);
				const sinVal = Math.sin(angles[colInd].mid);
				const isOutboard = angles[colInd].percentage < opts.data.pieLabelsPercentages.outboard;
				let sx = 0;
				let sy = 0;
				if (selectionOffset && fullyVisibleCount > 1) {
					sx = cosVal * selectionOffset * 8 * dpi;
					sy = -sinVal * selectionOffset * 8 * dpi;
				}
				ctx.fillStyle = "white";
				ctx.textAlign = "center";
				ctx.globalAlpha = opacity;
				if (angles[colInd].percentage < opts.data.pieLabelsPercentages.hoverOnly) ctx.globalAlpha = selectionOffset * opacity;
				if (isOutboard) {
					fontSize = Math.max(fontSize, 14);
					offset = rad + fontSize / 3 + 13;
					ctx.fillStyle = this.isDarkMode ? ys[i].colors_n[0] : ys[i].colors_d[0];
					ctx.lineWidth = 1;
					ctx.strokeStyle = this.isDarkMode ? ys[i].colors_n[0] : ys[i].colors_d[0];
					const lx1 = cx + sx + cosVal * (rad - 1) * dpi;
					const ly1 = cy + sy - sinVal * (rad - 1) * dpi;
					const lx2 = cx + sx + cosVal * (rad + 6 * (1 - selectionOffset) - 1) * dpi;
					const ly2 = cy + sy - sinVal * (rad + 6 * (1 - selectionOffset) - 1) * dpi;
					ctx.beginPath();
					ctx.moveTo(lx1, ly1);
					ctx.lineTo(lx2, ly2);
					ctx.stroke();
				}
				const dx = cosVal * offset * (fullyVisibleInd === colInd ? textToCenter : 1);
				const tx = cx + sx + dx * dpi + (isOutboard ? fontSize / 4 * angles[colInd].percentageText.length * dx / offset * dpi : 0);
				const ty = cy + sy - sinVal * offset * (fullyVisibleInd === colInd ? textToCenter : 1) * dpi;
				ctx.font = `${opts.settings.FONT.bold} ${fontSize * dpi}px ${opts.settings.FONT.family}`;
				ctx.fillText(angles[colInd].percentageText, tx, ty + fontSize * dpi / 2.9);
				ctx.globalAlpha = 1;
			}
			colInd++;
		}
		ctx.globalAlpha = 1;
		mini && this.opts.ctx.drawImage(this.$canvas, dims.l * dpi, dims.t * dpi);
	}
};
//#endregion
//#region src/lib/tchart/axisX.ts
var TAxisX = class {
	constructor(opts) {
		this.deleteItem = (state) => {
			delete this.items[state.ind];
		};
		this.opts = opts;
		this.ctx = opts.ctx;
		this.items = {};
		this.setAnimation(false);
	}
	onResize() {
		this.setAnimation(false);
	}
	setDarkMode(enabled) {
		this.isDarkMode = enabled;
	}
	setAnimation(enabled) {
		this.noAnimation = !enabled;
	}
	hideItem(ind, k) {
		this.items[ind].tp = 2;
		this.opts.animator.add([{
			prop: `ox_${ind}`,
			state: this.items[ind].state,
			end: 0,
			duration: this.noAnimation ? 0 : 200 * k,
			tween: "linear",
			group: { top: true },
			cbEnd: this.deleteItem
		}]);
	}
	render(opacity) {
		const opts = this.opts;
		const dpi = opts.settings.dpi;
		const x = opts.data.x;
		const state = opts.state;
		const pRight = opts.settings.PADD[1];
		const pLeft = opts.settings.PADD[3];
		const animator = opts.animator;
		x.length;
		const dims = this.opts.state.dims.axisX;
		const dimsDates = this.opts.state.dims.dates;
		const zoomMode = state.zoomMode;
		const zoomMorph = state.zoomMorph === void 0 ? 0 : state.zoomMorph;
		const x1 = Math.floor(getXIndex(x, state.x1));
		const x2 = Math.ceil(getXIndex(x, state.x2));
		let x1End = x1;
		let x2End = x2;
		const isPointHasWidth = opts.graphStyle === "bar" || opts.graphStyle === "step";
		const space = (state.zoomMode && opts.data.details ? opts.data.details.maxXTickLength : opts.data.maxXTickLength) * 9;
		const offsetForBarGraphMain = isPointHasWidth ? this.opts.data.mainPeriodLen : 0;
		const offsetForBarGraphDetail = isPointHasWidth ? this.opts.data.detailPeriodLen : 0;
		const offsetForBarGraph = offsetForBarGraphMain + (offsetForBarGraphDetail - offsetForBarGraphMain) * zoomMorph;
		const offsetForBarGraphScale = offsetForBarGraphMain * (1 - zoomMorph);
		const xStepMain = (dims.w - pRight - pLeft) / Math.round((state.x2 - state.x1 + offsetForBarGraphMain) / this.opts.data.mainPeriodLen);
		const xStepDetail = (dims.w - pRight - pLeft) / Math.round((state.x2 - state.x1 + offsetForBarGraphDetail) / this.opts.data.detailPeriodLen);
		const xStep = xStepMain + (xStepDetail - xStepMain) * zoomMorph;
		let skipEachMain = Math.pow(2, Math.ceil(Math.log2(space / xStepMain)));
		let skipEachDetail = Math.pow(2, Math.ceil(Math.log2(space / xStepDetail)));
		const lxScale = (dims.w - pLeft - pRight) / (state.x2 - state.x1 + offsetForBarGraphScale);
		if (skipEachMain < 1) skipEachMain = 1;
		if (skipEachDetail < 1) skipEachDetail = 1;
		this.ctx.font = `${this.opts.settings.FONT.normal} ${11 * dpi}px ${this.opts.settings.FONT.family}`;
		this.ctx.textAlign = "center";
		this.ctx.fillStyle = this.opts.settings.COLORS.axis.x;
		const changeSpeed = this.prevXStep ? this.prevXStep > xStepMain ? this.prevXStep / xStepMain : xStepMain / this.prevXStep : 1;
		let k = 1 / Math.pow(changeSpeed, 5);
		if (zoomMode && zoomMorph === 1) k /= 2;
		this.prevXStep = xStepMain;
		const x1Start = Math.max(x1 - Math.ceil((pLeft + space * .5) / xStep), 0);
		const x2Start = Math.min(x2 + Math.ceil((pRight + space * .5) / xStep), x.length - 1);
		if (zoomMode) {
			const x1AnimItem = this.opts.animator.get("x1");
			const x2AnimItem = this.opts.animator.get("x2");
			x1End = x1AnimItem ? x1AnimItem.end : this.opts.state["x1"];
			x2End = x2AnimItem ? x2AnimItem.end : this.opts.state["x2"];
			x1End = Math.floor(getXIndex(x, x1End));
			x2End = Math.floor(getXIndex(x, x2End));
		}
		let dtOffset;
		if (zoomMode) {
			const tmp1 = Math.max(x[this.opts.state.detailInd1], this.opts.state.xMainMin);
			const tmp2 = Math.min(x[this.opts.state.detailInd2], this.opts.state.xMainMax);
			dtOffset = Math.round((tmp2 - tmp1) / this.opts.data.mainPeriodLen) + (isPointHasWidth ? 0 : 1);
		}
		for (let i = x1Start; i <= x2Start; i++) {
			let shown = i % skipEachMain === 0;
			let prefix = "m";
			if (zoomMode) {
				if (i < this.opts.state.detailInd1) shown = i % skipEachMain === 0 && zoomMorph < 1;
				else if (i <= this.opts.state.detailInd2) {
					shown = Math.max(i - this.opts.state.detailInd1, 0) % skipEachDetail === 0;
					prefix = "d";
				} else shown = Math.max(i - (this.opts.state.detailInd2 - this.opts.state.detailInd1 + 1 - dtOffset), 0) % skipEachMain === 0 && zoomMorph < 1;
			}
			const id = x[i] + prefix;
			let item = this.items[id];
			if (shown) {
				if (!item) {
					item = {
						tp: 1,
						xi: x[i],
						i,
						state: { ind: id }
					};
					item.state[`ox_${id}`] = 0;
					this.items[id] = item;
					animator.add([{
						prop: `ox_${id}`,
						state: item.state,
						end: 1,
						duration: this.noAnimation ? 0 : 200 * k,
						tween: "linear",
						group: { top: true }
					}]);
				} else if (item.tp === 2) {
					item.tp = 1;
					animator.add([{
						prop: `ox_${id}`,
						state: item.state,
						end: 1,
						duration: this.noAnimation ? 0 : 200 * k,
						tween: "linear",
						group: { top: true }
					}]);
				}
			} else if (item && item.tp === 1) this.hideItem(id, k);
			if (item && item.state[`ox_${id}`] > 0) {
				const xc = (item.xi - state.x1 + offsetForBarGraph / 2) * lxScale + pLeft;
				this.ctx.globalAlpha = item.state[`ox_${id}`] * opacity;
				if (xc + space / 2 >= dims.l && xc - space / 2 <= dims.l + dims.w) {
					const xAligned = (xc + dims.l) * dpi;
					this.ctx.fillText(opts.data.datesShort[i], xAligned, (dims.t + 9) * dpi);
				}
			}
		}
		for (const i in this.items) {
			const item = this.items[i];
			if (item.tp === 1 && (item.xi < state.x1 - pLeft / lxScale || item.xi > state.x2 + pRight / lxScale)) this.hideItem(i, k);
		}
		this.ctx.globalAlpha = 1;
		if (!opts.data.subchart.show) return;
		let datesStr;
		if (zoomMode && zoomMorph === 1) x2End--;
		if (x2End < x1End) x2End = x1End;
		if (opts.data.datesRange[x1End] === opts.data.datesRange[x2End]) datesStr = opts.data.datesRange[x1End];
		else datesStr = opts.data.datesRange[x1End] + " — " + opts.data.datesRange[x2End];
		let fontSize = opts.settings.DATES_FONT_SIZE;
		if (!fontSize) {
			fontSize = 13;
			if (dims.w < 375) fontSize = 11;
		}
		this.ctx.font = `${opts.settings.FONT[opts.settings.DATES_WEIGHT]} ${fontSize * dpi}px ${opts.settings.FONT.family}`;
		const datesSide = state.datesSide ?? opts.settings.DATES_SIDE;
		this.ctx.textAlign = datesSide;
		this.ctx.fillStyle = opts.settings.COLORS.dates;
		this.ctx.fillText(datesStr, (dimsDates.l + (datesSide === "right" ? dimsDates.w : 0)) * dpi, (dimsDates.t + dimsDates.h - 7) * dpi);
	}
};
//#endregion
//#region src/lib/tchart/axisY.ts
var TAxisY = class {
	constructor(opts) {
		this.deleteItem = (state) => {
			delete this.items[state.id];
		};
		this.opts = opts;
		this.ctx = opts.ctx;
		this.uuid = 1;
		this.items = {};
		this.setAnimation(false);
		this.setForceUpdate(false);
	}
	onResize() {
		this.setAnimation(false);
		this.setForceUpdate(false);
	}
	setDarkMode(enabled) {
		this.isDarkMode = enabled;
	}
	setAnimation(enabled) {
		this.noAnimation = !enabled;
	}
	setForceUpdate(enabled) {
		this.forceUpdate = enabled;
	}
	render(opacity) {
		let calcDataLeft, calcDataRight;
		if (this.opts.pairY) {
			calcDataLeft = this.calcAxisData("y1_0", "y2_0");
			calcDataRight = this.calcAxisData("y1_1", "y2_1");
			if (calcDataRight.needAnimation && !calcDataLeft.needAnimation || this.opts.state["o_0"] < 1) this.updateAxisState("y1_1", "y2_1", "numRight", calcDataRight, calcDataLeft, calcDataRight);
			else this.updateAxisState("y1_0", "y2_0", "numLeft", calcDataLeft, calcDataLeft, calcDataRight);
		} else {
			calcDataLeft = this.calcAxisData("y1", "y2");
			this.updateAxisState("y1", "y2", "numLeft", calcDataLeft, calcDataLeft, calcDataLeft);
		}
		this.renderState(opacity);
	}
	calcAxisData(y1Name, y2Name) {
		const state = this.opts.state;
		const pTop = this.opts.settings.PADD[0];
		const pBottom = this.opts.settings.PADD[2];
		Math.floor(this.opts.settings.Y_AXIS_RANGE);
		let withAnimation = false;
		const y1AnimItem = this.opts.animator.get(y1Name);
		const y2AnimItem = this.opts.animator.get(y2Name);
		const y1 = y1AnimItem ? y1AnimItem.end : state[y1Name];
		const y2 = y2AnimItem ? y2AnimItem.end : state[y2Name];
		const yRealStep = Math.round((y2 - y1) / this.opts.settings.Y_AXIS_RANGE);
		const yRealStart = y1;
		const yCurRange = state[y2Name] - state[y1Name];
		const changeSpeedFirst = state[y1Name] > y1 ? state[y1Name] / y1 : y1 / state[y1Name];
		const changeSpeedLast = state[y2Name] > y2 ? state[y2Name] / y2 : y2 / state[y2Name];
		const yEndRange = y2 - y1;
		const yScaleCur = (this.opts.state.dims.axisYLines.h - pTop - pBottom) / yCurRange;
		const yScaleEnd = (this.opts.state.dims.axisYLines.h - pTop - pBottom) / yEndRange;
		if (changeSpeedFirst > 1.05 || changeSpeedLast > 1.05 || this.forceUpdate) withAnimation = true;
		withAnimation = this.items[0] && withAnimation && !this.noAnimation && !this.animationInProgress;
		return {
			needAnimation: withAnimation,
			y1,
			y2,
			yRealStep,
			yRealStart,
			yScaleCur,
			yScaleEnd
		};
	}
	updateAxisState(y1Name, y2Name, numName, baseData, leftData, rightData) {
		const opts = this.opts;
		opts.settings;
		opts.settings.dpi;
		const state = opts.state;
		opts.settings.PADD[0];
		const pBottom = opts.settings.PADD[2];
		opts.settings.PADD[3];
		opts.settings.PADD[1];
		const animator = opts.animator;
		let item;
		const linesCount = Math.floor(opts.settings.Y_AXIS_RANGE);
		let startedAtLeastOne = false;
		const dims = this.opts.state.dims.axisYLines;
		if (baseData.needAnimation) this.animationInProgress = true;
		for (let i = 0; i <= linesCount; ++i) {
			const numReal = baseData.yRealStart + Math.round(baseData.yRealStep * i);
			const numRealLeft = leftData.yRealStart + Math.round(leftData.yRealStep * i);
			const numRealRight = rightData.yRealStart + Math.round(rightData.yRealStep * i);
			const formatter = getFormatter("yTickFormatter", opts.data, state.zoomMorph);
			const numDisplayLeftStr = formatter(numRealLeft, leftData.yRealStep);
			const numDisplayRightStr = formatter(Math.max(numRealRight, 0), rightData.yRealStep, true);
			if (baseData.needAnimation) {
				const oldFrom = dims.t + dims.h - pBottom - (numReal - baseData.y1) * baseData.yScaleEnd;
				const oldTo = dims.t + dims.h - pBottom - (this.items[i][numName] - baseData.y1) * baseData.yScaleEnd;
				const newFrom = dims.t + dims.h - pBottom - (numReal - state[y1Name]) * baseData.yScaleCur;
				const newTo = dims.t + dims.h - pBottom - (numReal - baseData.y1) * baseData.yScaleEnd;
				if (Math.abs(oldTo - newTo) < 1) this.items[i] = {
					numLeft: numRealLeft,
					strLeft: numDisplayLeftStr,
					numRight: numRealRight,
					strRight: numDisplayRightStr,
					y: newTo
				};
				else {
					startedAtLeastOne = true;
					this.uuid++;
					item = {
						animated: true,
						strLeft: this.items[i].strLeft,
						strRight: this.items[i].strRight,
						oProp: `oyt_${this.uuid}`,
						yProp: `yyt_${this.uuid}`,
						state: { id: `t_${this.uuid}` }
					};
					item.state[item.oProp] = 1;
					item.state[item.yProp] = oldFrom;
					this.items[item.state.id] = item;
					animator.add([{
						prop: item.oProp,
						state: item.state,
						end: 0,
						duration: this.noAnimation ? 0 : 200,
						tween: "linear",
						group: { top: true }
					}, {
						prop: item.yProp,
						state: item.state,
						end: oldTo,
						duration: this.noAnimation ? 0 : !this.forceUpdate ? 500 : 333,
						fixed: !this.forceUpdate,
						tween: !this.forceUpdate ? "exp" : null,
						speed: .18,
						group: { top: true },
						cbEnd: this.deleteItem
					}]);
					delete this.items[i];
					this.uuid++;
					item = {
						animated: true,
						strLeft: numDisplayLeftStr,
						strRight: numDisplayRightStr,
						oProp: `oy_${i}`,
						yProp: `yy_${i}`,
						state: {
							id: i,
							numLeft: numRealLeft,
							strLeft: numDisplayLeftStr,
							numRight: numRealRight,
							strRight: numDisplayRightStr
						}
					};
					item.state[item.oProp] = 0;
					item.state[item.yProp] = newFrom;
					this.items[item.state.id] = item;
					const props = [{
						prop: item.oProp,
						state: item.state,
						end: 1,
						duration: this.noAnimation ? 0 : 200,
						tween: "linear",
						group: { top: true }
					}, {
						prop: item.yProp,
						state: item.state,
						end: newTo,
						duration: this.noAnimation ? 0 : !this.forceUpdate ? 500 : 333,
						fixed: !this.forceUpdate,
						tween: !this.forceUpdate ? "exp" : null,
						speed: .18,
						group: { top: true },
						cbEnd: (state) => {
							this.items[state.id] = {
								numLeft: state.numLeft,
								strLeft: state.strLeft,
								numRight: state.numRight,
								strRight: state.strRight,
								y: state[`yy_${state.id}`]
							};
							clearTimeout(this.animationEndTimeout);
							this.animationEndTimeout = window.setTimeout(() => {
								this.animationInProgress = false;
							}, 30);
						}
					}];
					animator.add(props);
				}
			} else if (this.items[i] && this.items[i].animated) {
				this.items[i].numLeft = numRealLeft;
				this.items[i].strLeft = numDisplayLeftStr;
				this.items[i].numRight = numRealRight;
				this.items[i].strRight = numDisplayRightStr;
				this.items[i].state.numLeft = numRealLeft;
				this.items[i].state.strLeft = numDisplayLeftStr;
				this.items[i].state.numRight = numRealRight;
				this.items[i].state.strRight = numDisplayRightStr;
			} else this.items[i] = {
				numLeft: numRealLeft,
				strLeft: numDisplayLeftStr,
				numRight: numRealRight,
				strRight: numDisplayRightStr,
				y: dims.t + dims.h - pBottom - (numReal - baseData.y1) * baseData.yScaleEnd
			};
		}
		if (baseData.needAnimation && !startedAtLeastOne) this.animationInProgress = false;
		this.forceUpdate = false;
	}
	renderState(opacity) {
		const dpi = this.opts.settings.dpi;
		const dimsLeft = this.opts.state.dims.axisYLeft;
		const dimsRight = this.opts.state.dims.axisYRight;
		const dimsLines = this.opts.state.dims.axisYLines;
		const ys = this.opts.data.ys;
		this.ctx.font = `${this.opts.settings.FONT.normal} ${11 * dpi}px ${this.opts.settings.FONT.family}`;
		this.ctx.strokeStyle = this.opts.settings.COLORS.grid;
		this.ctx.lineWidth = 1 * dpi;
		this.ctx.lineCap = "square";
		this.ctx.lineJoin = "square";
		for (const i in this.items) {
			const item = this.items[i];
			let o, y;
			if (item.animated) {
				y = item.state[item.yProp];
				o = item.state[item.oProp];
			} else {
				y = item.y;
				o = 1;
			}
			if (y - 6 >= 0 && y - 16 <= dimsLeft.h) {
				this.ctx.globalAlpha = o * (this.opts.pairY ? this.opts.state["o_0"] : 1) * opacity;
				this.ctx.textAlign = "left";
				if (this.opts.pairY) this.ctx.fillStyle = this.isDarkMode ? ys[0].colors_n[1] : ys[0].colors_d[1];
				else this.ctx.fillStyle = this.opts.settings.COLORS.axis.y;
				this.ctx.fillText(item.strLeft, dimsLeft.l * dpi, (y - 7) * dpi);
				if (this.opts.pairY) {
					this.ctx.globalAlpha = o * this.opts.state["o_1"] * opacity;
					this.ctx.textAlign = "right";
					this.ctx.fillStyle = this.isDarkMode ? ys[1].colors_n[1] : ys[1].colors_d[1];
					this.ctx.fillText(item.strRight, (dimsRight.l + dimsRight.w) * dpi, (y - 7) * dpi);
				}
			}
			y = (y << 0) - .5;
			if (y >= 0 && y <= dimsLeft.h) {
				this.ctx.beginPath();
				this.ctx.globalAlpha = o * opacity;
				this.ctx.moveTo(dimsLines.l * dpi, y * dpi);
				this.ctx.lineTo((dimsLines.l + dimsLines.w) * dpi, y * dpi);
				this.ctx.stroke();
			}
		}
		this.ctx.globalAlpha = 1;
	}
};
//#endregion
//#region src/lib/tchart/bars.ts
var TBars = class {
	constructor(opts) {
		this.opts = opts;
		this.filteredX1 = [];
		this.filteredX2 = [];
		this.filteredJ = [];
		this.prevY = [];
		this.$canvas = document.createElement("canvas");
		this.ctx = this.$canvas.getContext("2d", { alpha: false });
	}
	onResize() {
		const dpi = this.opts.settings.dpi;
		const dims = this.opts.additional.mini ? this.opts.state.dims.mini : this.opts.state.dims.graph;
		this.$canvas.width = dims.w * dpi;
		this.$canvas.height = dims.h * dpi;
		this.cached = "";
	}
	setDarkMode(enabled) {
		this.isDarkMode = enabled;
	}
	render() {
		let i, j, y, o, y1, y2, xScale, yScale, yShift, yFrom;
		const opts = this.opts;
		const ys = opts.data.ys;
		const state = opts.state;
		const mini = opts.additional.mini;
		const x1 = mini ? state.xg1 : state.x1;
		const x2 = mini ? state.xg2 : state.x2;
		const settings = opts.settings;
		this.w;
		this.h;
		const pTop = settings[`PADD${mini ? "_MINI_BAR" : ""}`][0];
		const pRight = settings[`PADD${mini ? "_MINI_BAR" : ""}`][1];
		const pBottom = settings[`PADD${mini ? "_MINI_BAR" : ""}`][2];
		const pLeft = settings[`PADD${mini ? "_MINI_BAR" : ""}`][3];
		const x = opts.data.x;
		const dpi = opts.settings.dpi;
		let xInd1, xInd2;
		const ctx = this.ctx;
		const dims = mini ? state.dims.mini : state.dims.graph;
		const zoom = state.zoomMode;
		const d1 = state.detailInd1;
		const d2 = state.detailInd2;
		const zoomMorph = state.zoomMorph === void 0 ? 0 : state.zoomMorph;
		const filteredX1 = this.filteredX1;
		const filteredX2 = this.filteredX2;
		const filteredJ = this.filteredJ;
		const prevY = this.prevY;
		const ysLength = ys.length;
		const hash = [
			dims.w,
			dims.h,
			mini ? state.xg1 : state.x1,
			mini ? state.xg2 : state.x2,
			this.isDarkMode,
			zoom
		];
		if (!mini) {
			hash.push(state.y1);
			hash.push(state.y2);
		}
		for (i = 0; i < ysLength; i++) {
			hash.push(mini ? state[`om_${i}`] : state[`o_${i}`]);
			hash.push(state[`f_${i}`]);
		}
		const joinedHash = hash.join(",");
		if (joinedHash === this.cached) {
			this.opts.ctx.drawImage(this.$canvas, dims.l * dpi, dims.t * dpi);
			if (mini) return;
		}
		xScale = (dims.w - pRight - pLeft) / (x2 - x1 + this.opts.data.mainPeriodLen * (1 - zoomMorph));
		xInd1 = Math.floor(getXIndex(x, x1 - pLeft / xScale));
		xInd2 = Math.ceil(getXIndex(x, x2 + pRight / xScale));
		if (zoom && zoomMorph === 1) {
			if (xInd1 < this.opts.state.xg1Ind) xInd1 = this.opts.state.xg1Ind;
			if (xInd2 > this.opts.state.xg2Ind) xInd2 = this.opts.state.xg2Ind - 1;
		}
		xScale *= dpi;
		const xShift = pLeft * dpi - x1 * xScale;
		const hBottom = (dims.h - pBottom) * dpi;
		const xwMain = this.opts.data.mainPeriodLen * xScale;
		const xwDetail = this.opts.data.detailPeriodLen * xScale;
		if (joinedHash !== this.cached) {
			ctx.fillStyle = this.opts.settings.COLORS.background;
			ctx.fillRect(0, 0, dims.w * dpi, dims.h * dpi);
			let filteredInd = 0;
			for (j = xInd1; j <= xInd2; j++) {
				let xw;
				if (zoom) {
					if (j >= d1 && j <= d2) xw = xwDetail;
					else xw = xwMain;
				} else xw = xwMain;
				const tmpX1 = Math.round(x[j] * xScale + xShift);
				const tmpX2 = Math.round(x[j] * xScale + xShift + xw);
				if (tmpX2 - tmpX1 > 0) {
					filteredX1[filteredInd] = tmpX1;
					filteredX2[filteredInd] = tmpX2;
					filteredJ[filteredInd] = j;
					prevY[filteredInd] = 0;
					filteredInd++;
				}
			}
			for (i = 0; i < ysLength; i++) {
				o = mini ? state[`om_${i}`] : state[`o_${i}`];
				if (o > 0) {
					y = ys[i].y;
					yFrom = ys[i].yFrom;
					y1 = mini ? state["y1m"] : state["y1"];
					y2 = mini ? state["y2m"] : state["y2"];
					yScale = dpi * (dims.h - pTop - pBottom) / (y2 - y1);
					yShift = (dims.h - pBottom) * dpi + y1 * yScale;
					const k = o * yScale;
					ctx.fillStyle = this.isDarkMode ? ys[i].colors_n[0] : ys[i].colors_d[0];
					ctx.globalAlpha = state[`f_${i}`] * .9 + .1;
					let yVal;
					ctx.beginPath();
					ctx.moveTo(Math.round(x[xInd2] * xScale + xShift + (zoomMorph === 1 ? xwDetail : xwMain)), Math.round(hBottom));
					if (i > 0) for (j = filteredInd - 1; j >= 0; j--) {
						const curY = hBottom - prevY[j];
						ctx.lineTo(filteredX2[j], Math.round(curY));
						ctx.lineTo(filteredX1[j], Math.round(curY));
					}
					else ctx.lineTo(Math.round(x[xInd1] * xScale + xShift), Math.round(hBottom));
					for (j = 0; j < filteredInd; j++) {
						const jInd = filteredJ[j];
						if (zoom) {
							if (jInd >= d1 && jInd <= d2) yVal = yFrom[jInd] + zoomMorph * (y[jInd] - yFrom[jInd]);
							else yVal = y[jInd] + zoomMorph * (y[d1] - y[jInd]);
						} else yVal = y[jInd];
						yVal = yVal || 0;
						const curH = hBottom - (yShift - yVal * k);
						prevY[j] += curH;
						ctx.lineTo(filteredX1[j], Math.round(hBottom - prevY[j]));
						ctx.lineTo(filteredX2[j], Math.round(hBottom - prevY[j]));
					}
					ctx.closePath();
					ctx.fill();
				}
			}
			ctx.globalAlpha = 1;
			this.opts.ctx.drawImage(this.$canvas, dims.l * dpi, dims.t * dpi);
		}
		if (state.barInd > -1 && !mini) {
			this.opts.ctx.fillStyle = this.opts.settings.COLORS.barsSelectionBackground;
			this.opts.ctx.globalAlpha = state.barO;
			this.opts.ctx.fillRect(0, 0, dims.w * dpi, dims.h * dpi);
			let yStart = 0;
			for (i = 0; i < ysLength; i++) {
				o = state[`o_${i}`];
				if (o > 0) {
					y = ys[i].y;
					yFrom = ys[i].yFrom;
					y1 = state["y1"];
					y2 = state["y2"];
					yScale = dpi * (dims.h - pTop - pBottom) / (y2 - y1);
					yShift = (dims.h - pBottom) * dpi + y1 * yScale;
					const k = o * yScale;
					this.opts.ctx.fillStyle = this.isDarkMode ? ys[i].colors_n[0] : ys[i].colors_d[0];
					this.opts.ctx.globalAlpha = state[`f_${i}`] * .9 + .1;
					let yVal, xw;
					if (zoom) {
						if (state.barInd >= d1 && state.barInd <= d2) {
							yVal = yFrom[state.barInd] + zoomMorph * (y[state.barInd] - yFrom[state.barInd]);
							xw = xwDetail;
						} else {
							xw = xwMain;
							yVal = y[state.barInd] + zoomMorph * (y[d1] - y[state.barInd]);
						}
					} else {
						yVal = y[state.barInd];
						xw = xwMain;
					}
					yVal = yVal || 0;
					const yEnd = hBottom - (yShift - yVal * k) + yStart;
					this.opts.ctx.fillRect(Math.round(x[state.barInd] * xScale + xShift), Math.round(hBottom - yStart + dims.t * dpi), Math.max(Math.round(xw), 1), Math.round(yStart) - Math.round(yEnd));
					yStart = yEnd;
				}
			}
			ctx.globalAlpha = 1;
		}
		this.cached = joinedHash;
	}
};
//#endregion
//#region src/lib/tchart/composer.ts
var TComposer = class {
	constructor(opts) {
		this.opts = opts;
		this.$canvas = document.createElement("canvas");
		this.$canvas.className = "tchart--graph-canvas";
		this.ctx = this.$canvas.getContext("2d");
		opts.$parent.appendChild(this.$canvas);
		this.deviceSpeed = void 0;
	}
	onResize() {
		const dpi = this.opts.settings.dpi;
		const dims = this.opts.state.dims.composer;
		this.$canvas.width = dims.w * dpi;
		this.$canvas.height = dims.h * dpi;
		this.render({
			top: true,
			bottom: true
		});
	}
	setDarkMode(enabled) {
		this.isDarkMode = enabled;
		this.onResize();
	}
	render(groups) {
		if (this.deviceSpeed === void 0) {
			const t1 = performance.now();
			const prevX = this.opts.state.x1;
			this.opts.state.x1 = this.opts.state.xMainMin;
			this.renderInner(groups);
			const t2 = performance.now();
			this.opts.state.x1 = prevX;
			this.deviceSpeed = (t2 - t1) / (this.opts.graphStyle === "line" || this.opts.graphStyle === "step" ? 1.5 : 2) / (this.opts.data.x.length * this.opts.data.ys.length);
			this.opts.state.deviceSpeed = this.deviceSpeed;
		}
		this.renderInner(groups);
	}
	renderInner(groups) {
		const dims = this.opts.state.dims;
		const state = this.opts.state;
		const ctx = this.ctx;
		const dpi = this.opts.settings.dpi;
		const settings = this.opts.settings;
		const padd = settings.PADD;
		const zoomMorph = state.zoomMorph === void 0 ? 0 : state.zoomMorph;
		const pieChartAnimating = this.opts.graphStyle === "area" && state.zoomMode && zoomMorph < 1;
		const pieChartAnimated = this.opts.graphStyle === "area" && state.zoomMode && zoomMorph === 1;
		if (this.opts.data.master) this.$canvas.style.opacity = "" + state.masterVisibility;
		if (this.opts.data.slave) {
			this.$canvas.style.opacity = "" + state.slaveVisibility;
			this.opts.chart.$el.style.visibility = state.slaveVisibility > 0 ? "visible" : "hidden";
		}
		if (groups.top) {
			ctx.clearRect(dims.dates.l * dpi, dims.dates.t * dpi, dims.dates.w * dpi, dims.dates.h * dpi);
			if (this.opts.graphStyle === "line" || this.opts.graphStyle === "step" || this.opts.graphStyle === "area" && zoomMorph > 0 || this.opts.data.slave && state.slaveVisibility < 1 || this.opts.data.master && state.masterVisibility < 1) {
				if (pieChartAnimated) ctx.clearRect(dims.graph.l * dpi, (dims.graph.t - 18) * dpi, dims.graph.w * dpi, (dims.graph.h + 30) * dpi);
				else ctx.clearRect(dims.graph.l * dpi, dims.graph.t * dpi, dims.graph.w * dpi, dims.graph.h * dpi);
			}
			if (this.opts.graphStyle === "area" && zoomMorph === 0 || this.opts.graphStyle === "bar") {
				ctx.clearRect(dims.graph.l * dpi, dims.graph.t * dpi, dims.graph.w * dpi, (settings.PADD[0] + 4) * dpi);
				ctx.clearRect(dims.graph.l * dpi, (dims.graph.t + padd[0]) * dpi, padd[3] * dpi, (dims.graph.h - padd[0] - padd[2]) * dpi);
				ctx.clearRect(dims.graph.l * dpi, (dims.graph.t + dims.graph.h - padd[2]) * dpi, dims.graph.w * dpi, padd[2] * dpi);
				ctx.clearRect((dims.graph.l + dims.graph.w - padd[1] - 1) * dpi, (dims.graph.t + padd[0]) * dpi, (padd[1] + 1) * dpi, (dims.graph.h - padd[0] - padd[2]) * dpi);
			}
			if (!pieChartAnimating && !pieChartAnimated) {
				ctx.save();
				ctx.beginPath();
				ctx.rect(dims.graph.l * dpi, dims.graph.t * dpi, dims.graph.w * dpi, dims.graph.h * dpi);
				ctx.clip();
			}
			if (this.opts.data.master && state.masterVisibility < 1) {
				ctx.save();
				const scale = (1 - state.masterVisibility) * 5 + 1;
				ctx.translate(dims.graph.w * state.zoomSpecialOrigin * (1 - scale), 0);
				ctx.scale(scale, 1);
			}
			if (this.opts.data.slave && state.slaveVisibility < 1) {
				ctx.save();
				const scale = state.slaveVisibility;
				ctx.translate(dims.graph.w * state.zoomSpecialOrigin * (1 - scale), 0);
				ctx.scale(scale, 1);
			}
			let opacity = 1;
			if (this.opts.graphStyle === "area" && state.zoomMode) opacity = 1 - zoomMorph;
			if (pieChartAnimating) {
				ctx.save();
				const r = settings.PIE_RADIUS;
				const cw = dims.graph.w + zoomMorph * (r * 2 - dims.graph.w);
				const ch = dims.graph.h - 42 + zoomMorph * (r * 2 - dims.graph.h + 42);
				drawRoundedRect2(ctx, dpi, cw, ch, (dims.graph.w - cw) / 2 + dims.graph.l, (dims.graph.h - 42 - ch) / 2 + dims.graph.t + 23, zoomMorph * r);
				ctx.clip();
			}
			this.opts.chart.graph.render();
			if (pieChartAnimating) ctx.restore();
			if (this.opts.data.master && state.masterVisibility < 1) ctx.restore();
			if (this.opts.data.slave && state.slaveVisibility < 1) ctx.restore();
			this.opts.chart.axisY.render(opacity);
			this.opts.chart.fade.render();
			if (!pieChartAnimating && !pieChartAnimated) ctx.restore();
			this.opts.chart.axisX.render(opacity);
		}
		if (groups.bottom) {
			ctx.clearRect(dims.graph.l * dpi, (dims.handle.t - 1) * dpi, dims.graph.w * dpi, (dims.handle.h + 2) * dpi);
			let subchartShown = this.opts.data.subchart.show;
			const isNotSpecialAndChangedSubchart = !this.opts.data.master && !this.opts.data.slave && this.opts.data.details && this.opts.data.subchart.show !== this.opts.data.details.subchart.show;
			if (isNotSpecialAndChangedSubchart) {
				if (subchartShown) subchartShown = zoomMorph < 1;
				else subchartShown = zoomMorph > 0;
			}
			if (subchartShown) {
				ctx.save();
				drawRoundedRect(ctx, dpi, dims.mini.w, dims.mini.h, dims.mini.l, dims.mini.t, 7);
				ctx.clip();
				this.opts.chart.mini.render();
				ctx.restore();
				this.opts.chart.handle.render();
			}
			if (isNotSpecialAndChangedSubchart) {
				if (zoomMorph > 0 && zoomMorph < 1) {
					ctx.fillStyle = this.opts.settings.COLORS.background;
					ctx.globalAlpha = this.opts.data.subchart.show ? zoomMorph : 1 - zoomMorph;
					ctx.fillRect(dims.graph.l * dpi, (dims.handle.t - 1) * dpi, dims.graph.w * dpi, (dims.handle.h + 2) * dpi);
					ctx.globalAlpha = 1;
				}
			}
		}
	}
};
//#endregion
//#region src/lib/tchart/fade.ts
var TFade = class {
	constructor(opts) {
		this.opts = opts;
		this.ctx = opts.ctx;
		if (this.opts.graphStyle !== "area") {
			this.$fadeTop = document.createElement("canvas");
			this.ctxFadeTop = this.$fadeTop.getContext("2d");
			if (this.opts.graphStyle !== "bar") {
				this.$fadeBottom = document.createElement("canvas");
				this.ctxFadeBottom = this.$fadeBottom.getContext("2d");
			}
		}
	}
	onResize() {
		const dpi = this.opts.settings.dpi;
		const dimsTop = this.opts.state.dims.fadeTop;
		const dimsBottom = this.opts.state.dims.fadeBottom;
		const backgroundRgbJoined = this.opts.settings.COLORS.backgroundRgb.join(", ");
		if (this.opts.graphStyle !== "area") {
			const gradientTop = this.ctxFadeTop.createLinearGradient(0, 0, 0, dimsTop.h * dpi);
			gradientTop.addColorStop(0, `rgba(${backgroundRgbJoined}, 1)`);
			gradientTop.addColorStop(1, `rgba(${backgroundRgbJoined}, 0)`);
			this.$fadeTop.width = dimsTop.w * dpi;
			this.$fadeTop.height = dimsTop.h * dpi;
			this.ctxFadeTop.fillStyle = gradientTop;
			this.ctxFadeTop.fillRect(0, 0, dimsTop.w * dpi, dimsTop.h * dpi);
			if (this.opts.graphStyle !== "bar") {
				const gradientBottom = this.ctxFadeBottom.createLinearGradient(0, 0, 0, dimsBottom.h * dpi);
				gradientBottom.addColorStop(0, `rgba(${backgroundRgbJoined}, 0)`);
				gradientBottom.addColorStop(1, `rgba(${backgroundRgbJoined}, 1)`);
				this.$fadeBottom.width = dimsBottom.w * dpi;
				this.$fadeBottom.height = dimsBottom.h * dpi;
				this.ctxFadeBottom.fillStyle = gradientBottom;
				this.ctxFadeBottom.fillRect(0, 0, dimsBottom.w * dpi, dimsBottom.h * dpi);
			}
		}
	}
	setDarkMode(enabled) {
		this.isDarkMode = enabled;
		this.onResize();
	}
	render() {
		const dpi = this.opts.settings.dpi;
		const dimsTop = this.opts.state.dims.fadeTop;
		const dimsBottom = this.opts.state.dims.fadeBottom;
		this.$fadeTop && this.ctx.drawImage(this.$fadeTop, dimsTop.l * dpi, dimsTop.t * dpi);
		this.$fadeBottom && this.ctx.drawImage(this.$fadeBottom, dimsBottom.l * dpi, dimsBottom.t * dpi);
	}
};
//#endregion
//#region src/lib/tchart/drag.ts
var TDrag = class {
	constructor(opts) {
		this.onDragStart = (e) => {
			this.skipMoveEnd = true;
			clearTimeout(this.pointerTimeout);
			if (this.isTouch) {
				if (e.touches.length > 1) return;
			}
			this.scroll = void 0;
			this.x = this.isTouch ? e.touches[0].pageX : e.pageX;
			this.y = this.isTouch ? e.touches[0].pageY : e.pageY;
			this.dX = 0;
			this.dY = 0;
			this.pageX = this.x;
			this.pageY = this.y;
			delete this.prevDx;
			delete this.prevDy;
			if (this.opts.onDragStart({
				pageX: this.x,
				pageY: this.y,
				isTouch: this.isTouch
			})) return;
			this.skipMoveEnd = false;
		};
		this.onDragMove = (e) => {
			if (this.skipMoveEnd) return;
			if (this.scroll === "v") return;
			const x = this.isTouch ? e.touches[0].pageX : e.pageX;
			const y = this.isTouch ? e.touches[0].pageY : e.pageY;
			this.dX = x - this.x;
			this.dY = y - this.y;
			this.pageX = x;
			this.pageY = y;
			if (this.isTouch) {
				if (this.scroll === "h") !this.opts.noPrevent && e.preventDefault();
				else if (Math.abs(this.dX) > 5 || Math.abs(this.dY) > 5) this.scroll = Math.abs(this.dX) > Math.abs(this.dY) ? "h" : "v";
			}
			if (this.prevDx !== this.dX || this.prevDy !== this.dY) {
				this.opts.onDragMove && this.opts.onDragMove({
					canceled: this.scroll === "v",
					d: this.dX,
					pageX: this.pageX,
					pageY: this.pageY,
					isTouch: this.isTouch
				});
				this.prevDx = this.dX;
				this.prevDy = this.dY;
			}
		};
		this.onDragEnd = (e) => {
			if (this.skipMoveEnd) return;
			this.skipMoveEnd = true;
			this.opts.onDragEnd && this.opts.onDragEnd({
				isTouch: this.isTouch,
				e
			});
		};
		this.opts = opts;
		this.isTouch = isTouchDevice();
		this.skipMoveEnd = true;
		const $global = opts.useElForMove ? opts.$el : window;
		opts.$el.addEventListener(this.isTouch ? "touchstart" : "mousedown", this.onDragStart, { passive: false });
		$global.addEventListener(this.isTouch ? "touchmove" : "mousemove", this.onDragMove, { passive: false });
		$global.addEventListener(this.isTouch ? "touchend" : "mouseup", this.onDragEnd, { passive: false });
	}
};
//#endregion
//#region src/lib/tchart/handle.ts
var THandle = class {
	constructor(opts) {
		this.onMouseLeave = () => {
			this.$canvas.classList.remove("tchart--graph-canvas__handle-pointer");
			this.$canvas.classList.remove("tchart--graph-canvas__handle-grab");
			this.$canvas.classList.remove("tchart--graph-canvas__handle-col-resize");
			delete this.canvasPos;
		};
		this.onMouseMove = (e) => {
			this.canvasPos = this.canvasPos || getElemPagePos(this.$canvas);
			const dx = e.pageX - this.canvasPos.x;
			const dy = e.pageY - this.canvasPos.y;
			const tp = this.getTp(dx - this.opts.settings.PADD[3], dy - (this.opts.state.dims.composer.h - this.opts.settings.MINI_GRAPH_HEIGHT - this.opts.settings.MINI_GRAPH_BOTTOM), false);
			const cursors = {
				"": "",
				"both": this.opts.settings.isIE ? "pointer" : "grab",
				"start": "col-resize",
				"end": "col-resize"
			};
			this.onMouseLeave();
			cursors[tp] && this.$canvas.classList.add("tchart--graph-canvas__handle-" + cursors[tp]);
		};
		this.opts = opts;
		this.ctx = opts.ctx;
		this.isTouch = isTouchDevice();
		this.$canvas = opts.$canvas;
		this.drag = new TDrag({
			$el: this.$canvas,
			onDragStart: (params) => {
				this.canvasPos = getElemPagePos(this.$canvas);
				const dx = params.pageX - this.canvasPos.x;
				const dy = params.pageY - this.canvasPos.y;
				this._x1 = opts.state.x1;
				this._x2 = opts.state.x2;
				this.constrainHandleSize(false);
				this.tp = this.getTp(dx - opts.settings.PADD[3], dy - (this.opts.state.dims.composer.h - opts.settings.MINI_GRAPH_HEIGHT - opts.settings.MINI_GRAPH_BOTTOM), params.isTouch);
				this.firstMove = true;
				return !this.tp;
			},
			onDragMove: (params) => {
				this.onDragMove(params.d);
				this.firstMove = false;
			},
			onDragEnd: (params) => {}
		});
		this.trackMouse(true);
	}
	getTp(x, y, isTouch) {
		const dims = this.opts.state.dims.handle;
		const state = this.opts.state;
		const zoomMode = this.opts.state.zoomMode;
		if (y < 0 || y > dims.h) return "";
		let xw = isTouch ? dims.w * .3 : 10;
		if (isTouch && xw < 14) xw = 14;
		if (isTouch && xw > 30) xw = 30;
		const xl1 = this.prevX1 + (isTouch ? state.x1 === state.xg1 ? -5 : -15 : 0);
		let xl2 = xl1 + xw;
		const xr2 = this.prevX2 + (isTouch ? state.x2 === state.xg2 ? 5 : 15 : 0);
		let xr1 = xr2 - xw;
		if (Math.abs(state.x2 - state.x1 - (zoomMode ? this.opts.data.mainPeriodLen : this.minRange)) < .01) {
			if (state.x2 === state.xg2) xr1 = xr2 + 1;
			if (state.x1 === state.xg1) xl2 = xl1 - 1;
		}
		if (x > xl2 && x < xr1) return "both";
		if (x >= xl1 && x <= xl2) return "start";
		if (x >= xr1 && x <= xr2) return "end";
		return "";
	}
	trackMouse(enabled) {
		if (this.isTouch) return;
		this.$canvas.addEventListener("mousemove", this.onMouseMove);
		this.$canvas.addEventListener("mouseleave", this.onMouseLeave);
	}
	onResize(rect) {
		this.constrainHandleSize(true);
	}
	setDarkMode(enabled) {
		this.isDarkMode = enabled;
	}
	constrainHandleSize(updateHandle) {
		const minRange = 32 / (this.opts.state.dims.handle.w / (this.opts.state.xg2 - this.opts.state.xg1));
		let x1 = this.opts.state.x1;
		let x2 = this.opts.state.x2;
		this.opts.state.xg1;
		const xg2 = this.opts.state.xg2;
		this.minRange = minRange;
		if (x2 - x1 < minRange) {
			x2 = x1 + minRange;
			if (x2 > xg2) {
				x2 = xg2;
				x1 = x2 - minRange;
			}
			updateHandle && this.opts.additional.cb(x1, x2, "constraint");
		}
	}
	onDragMove(d) {
		const dims = this.opts.state.dims.handle;
		const tp = this.tp;
		const state = this.opts.state;
		const per = d / dims.w * (state.xg2 - state.xg1);
		let x1, x2;
		const _x1 = this._x1;
		const _x2 = this._x2;
		if (tp === "both") {
			x1 = _x1 + per;
			x2 = _x2 + per;
			if (x1 < state.xg1) {
				x1 = state.xg1;
				x2 = state.xg1 + _x2 - _x1;
			}
			if (x2 > state.xg2) {
				x1 = state.xg2 - (_x2 - _x1);
				x2 = state.xg2;
			}
		}
		if (tp === "start") {
			x2 = state.x2;
			x1 = Math.min(Math.max(_x1 + per, state.xg1), x2 - this.minRange);
		}
		if (tp === "end") {
			x1 = state.x1;
			x2 = Math.max(Math.min(_x2 + per, state.xg2), x1 + this.minRange);
		}
		if (state.x1 === x1 && state.x2 === x2) return;
		this.opts.additional.cb(x1, x2, tp, this.firstMove);
	}
	render() {
		const dims = this.opts.state.dims.handle;
		const dpi = this.opts.settings.dpi;
		const state = this.opts.state;
		const xScale = 1 / (state.xg2 - state.xg1);
		const x1 = Math.round((state.x1 - state.xg1) * xScale * dims.w);
		const x2 = Math.round((state.x2 - state.xg1) * xScale * dims.w);
		const ctx = this.ctx;
		ctx.fillStyle = this.opts.settings.COLORS.miniMask;
		drawRoundedRect(ctx, dpi, x1 + 4, dims.h - 2, dims.l, dims.t + 1, [
			7,
			0,
			0,
			7
		]);
		ctx.fill();
		drawRoundedRect(ctx, dpi, dims.w - x2 + 4, dims.h - 2, dims.l + x2 - 4, dims.t + 1, [
			0,
			7,
			7,
			0
		]);
		ctx.fill();
		ctx.fillStyle = this.opts.settings.COLORS.miniFrame;
		drawRoundedRect(ctx, dpi, 10, dims.h, dims.l + x1, dims.t, [
			7,
			0,
			0,
			7
		]);
		ctx.fill();
		drawRoundedRect(ctx, dpi, 10, dims.h, dims.l + x2 - 10, dims.t, [
			0,
			7,
			7,
			0
		]);
		ctx.fill();
		ctx.fillRect((dims.l + x1 + 10) * dpi, dims.t * dpi, (x2 - x1 - 20) * dpi, dpi);
		ctx.fillRect((dims.l + x1 + 10) * dpi, (dims.t + dims.h - 1) * dpi, (x2 - x1 - 20) * dpi, dpi);
		ctx.strokeStyle = "#fff";
		this.ctx.lineCap = "round";
		this.ctx.lineJoin = "round";
		this.ctx.lineWidth = 2 * dpi;
		ctx.beginPath();
		ctx.moveTo((dims.l + x1 + 5) * dpi, (dims.t + 17) * dpi);
		ctx.lineTo((dims.l + x1 + 5) * dpi, (dims.t + 25) * dpi);
		ctx.moveTo((dims.l + x2 - 5) * dpi, (dims.t + 17) * dpi);
		ctx.lineTo((dims.l + x2 - 5) * dpi, (dims.t + 25) * dpi);
		ctx.stroke();
		this.prevX1 = x1;
		this.prevX2 = x2;
	}
};
//#endregion
//#region src/lib/tchart/lines.ts
var TLines = class {
	constructor(opts) {
		this.opts = opts;
		this.$canvas = document.createElement("canvas");
		this.ctx = this.$canvas.getContext("2d", { alpha: true });
	}
	onResize() {
		const dpi = this.opts.settings.dpi;
		const dims = this.opts.additional.mini ? this.opts.state.dims.mini : this.opts.state.dims.graph;
		this.$canvas.width = dims.w * dpi;
		this.$canvas.height = dims.h * dpi;
		this.cached = "";
		this.ctx.fillStyle = this.opts.settings.COLORS.background;
		this.ctx.fillRect(0, 0, dims.w * dpi, dims.h * dpi);
	}
	setDarkMode(enabled) {
		this.isDarkMode = enabled;
	}
	render() {
		let i, j, y, o, y1, y2, xScale, yScale, yShift, e, yFrom;
		const opts = this.opts;
		const ys = opts.data.ys;
		const state = opts.state;
		const mini = opts.additional.mini;
		const toCache = mini || opts.data.master && state.masterVisibility < 1 && state.masterVisibility > 0 || opts.data.slave && state.slaveVisibility < 1 && state.slaveVisibility > 0;
		const x1 = mini ? state.xg1 : state.x1;
		const x2 = mini ? state.xg2 : state.x2;
		const settings = opts.settings;
		const pTop = settings[`PADD${mini ? "_MINI" : ""}`][0];
		const pRight = settings[`PADD${mini ? "_MINI" : ""}`][1];
		const pBottom = settings[`PADD${mini ? "_MINI" : ""}`][2];
		const pLeft = settings[`PADD${mini ? "_MINI" : ""}`][3];
		const x = opts.data.x;
		const dpi = opts.settings.dpi;
		let xInd1, xInd2;
		const ctx = toCache ? this.ctx : this.opts.ctx;
		const dims = mini ? state.dims.mini : state.dims.graph;
		const zoom = state.zoomMode;
		const d1 = state.detailInd1;
		const d2 = state.detailInd2;
		const morph = state.zoomMorph === void 0 ? 0 : state.zoomMorph;
		const ysLen = ys.length;
		const isStepMode = opts.graphStyle === "step";
		xScale = (dims.w - pRight - pLeft) / (x2 - x1 + (isStepMode ? this.opts.data.mainPeriodLen * (1 - morph) : 0));
		xInd1 = Math.floor(getXIndex(x, x1 - pLeft / xScale));
		xInd2 = Math.ceil(getXIndex(x, x2 + pRight / xScale));
		xScale *= dpi;
		const xShift = (pLeft + (toCache ? 0 : dims.l)) * dpi - x1 * xScale;
		if (isStepMode && zoom && morph === 1) {
			if (xInd1 < this.opts.state.xg1Ind) xInd1 = this.opts.state.xg1Ind;
			if (xInd2 > this.opts.state.xg2Ind) xInd2 = this.opts.state.xg2Ind - 1;
		}
		let xw;
		const xwMain = this.opts.data.mainPeriodLen * xScale;
		const xwDetail = this.opts.data.detailPeriodLen * xScale;
		if (toCache) {
			const hash = [
				dims.w,
				dims.h,
				mini ? state.xg1 : state.x1,
				mini ? state.xg2 : state.x2,
				this.isDarkMode,
				zoom
			];
			if (!mini) {
				hash.push(state.y1);
				hash.push(state.y2);
			}
			for (i = 0; i < ysLen; i++) {
				hash.push(mini ? state[`om_${i}`] : state[`o_${i}`]);
				hash.push(state[`f_${i}`]);
			}
			const joinedHash = hash.join(",");
			if (joinedHash === this.cached) {
				this.opts.ctx.drawImage(this.$canvas, dims.l * dpi, dims.t * dpi);
				return;
			}
			this.cached = joinedHash;
			ctx.clearRect(0, 0, dims.w * dpi, dims.w * dpi);
		}
		const lineWidth = (opts.additional.mini ? 1 : opts.data.strokeWidth === "auto" ? ysLen > 5 ? 1 : 2 : opts.data.strokeWidth) * dpi;
		const lineWidthShift = lineWidth % 2 === 0 ? 0 : .5;
		ctx.lineWidth = lineWidth;
		ctx.lineCap = opts.additional.mini ? "square" : "round";
		ctx.lineJoin = opts.additional.mini ? "square" : "round";
		for (i = 0; i < ysLen; i++) {
			o = mini ? state[`om_${i}`] : state[`o_${i}`];
			e = state[`e_${i}`];
			if (o <= 0) continue;
			y = ys[i].y;
			yFrom = ys[i].yFrom;
			if (opts.pairY) {
				y1 = mini ? state[`y1m_${i}`] : state[`y1_${i}`];
				y2 = mini ? state[`y2m_${i}`] : state[`y2_${i}`];
			} else if (mini) {
				if (e && o < 1) {
					y1 = state["y1m_show"];
					y2 = state["y2m_show"];
				} else if (!e && o < 1) {
					y1 = state["y1m_hidd"];
					y2 = state["y2m_hidd"];
				} else {
					y1 = state["y1m"];
					y2 = state["y2m"];
				}
			} else {
				y1 = state["y1"];
				y2 = state["y2"];
			}
			yScale = dpi * (dims.h - pTop - pBottom) / (y2 - y1);
			yShift = (dims.h - pBottom + (toCache ? 0 : dims.t)) * dpi + y1 * yScale;
			ctx.beginPath();
			ctx.strokeStyle = this.isDarkMode ? ys[i].colors_n[0] : ys[i].colors_d[0];
			ctx.globalAlpha = o * (state[`f_${i}`] * .9 + .1);
			let yVal;
			let xc;
			let minY = Number.MAX_VALUE;
			let maxY = -Number.MAX_VALUE;
			let prevXc = -Number.MAX_VALUE;
			let prevYc;
			let hasPrev = false;
			let needMove = true;
			for (j = xInd1; j <= xInd2; j++) {
				if (zoom) {
					if (j >= d1 && j <= d2) {
						yVal = yFrom[j] + morph * (y[j] - yFrom[j]);
						xw = xwDetail;
					} else {
						yVal = y[j] + morph * (y[d1] - y[j]);
						xw = xwMain;
					}
				} else {
					yVal = y[j];
					xw = xwMain;
				}
				if (isNaN(yVal)) {
					needMove = true;
					continue;
				}
				xc = x[j] * xScale + xShift << 0;
				const yc = yShift - yVal * yScale << 0;
				if (xc > prevXc || isStepMode && j === d2 + 1) {
					if (hasPrev) {
						if (prevYc === minY) {
							ctx.moveTo(prevXc + lineWidthShift, maxY - lineWidthShift);
							ctx.lineTo(prevXc + lineWidthShift, minY - lineWidthShift);
						} else {
							ctx.moveTo(prevXc + lineWidthShift, minY - lineWidthShift);
							ctx.lineTo(prevXc + lineWidthShift, maxY - lineWidthShift);
							if (prevYc !== maxY) ctx.moveTo(prevXc + lineWidthShift, prevYc - lineWidthShift);
						}
						hasPrev = false;
					}
					if (needMove) {
						ctx.moveTo(xc + lineWidthShift, yc - lineWidthShift);
						needMove = false;
					}
					minY = yc;
					maxY = yc;
					ctx.lineTo(xc + lineWidthShift, yc - lineWidthShift);
					isStepMode && ctx.lineTo((x[j] * xScale + xw + xShift << 0) + lineWidthShift, yc - lineWidthShift);
				} else {
					minY = Math.min(minY, yc);
					maxY = Math.max(maxY, yc);
					hasPrev = true;
				}
				prevXc = xc;
				prevYc = yc;
			}
			if (hasPrev) {
				ctx.moveTo(prevXc + lineWidthShift, minY - lineWidthShift);
				ctx.lineTo(prevXc + lineWidthShift, maxY - lineWidthShift);
			}
			ctx.stroke();
		}
		ctx.globalAlpha = 1;
		toCache && this.opts.ctx.drawImage(this.$canvas, dims.l * dpi, dims.t * dpi);
	}
};
//#endregion
//#region src/lib/tchart/switchers.ts
var TSwitchers = class {
	constructor(opts) {
		this.preventClick = false;
		this.opts = opts;
		this.isTouch = isTouchDevice();
		this.enabled = opts.data.ys.length;
		if (this.enabled === 1 && !opts.data.forceLegend) opts.$parent.style.display = "none";
		this.switchers = opts.data.ys.map((item, ind, arr) => {
			const $div = document.createElement("div");
			$div.className = "tchart--switcher";
			if (ind === 0) $div.classList.add("tchart--switcher__first");
			else if (ind === arr.length - 1) $div.classList.add("tchart--switcher__last");
			if (opts.state[`e_${ind}`]) $div.classList.toggle("tchart--switcher__active");
			else this.enabled--;
			$div.setAttribute("data-label", item.label);
			opts.$parent.appendChild($div);
			const $span = document.createElement("span");
			$span.className = "tchart--switcher-text";
			$span.textContent = item.label;
			$div.appendChild($span);
			if (!this.isTouch) {
				$div.addEventListener("mouseenter", () => {
					if (opts.state[`e_${ind}`]) opts.additional.onEnter(ind);
				});
				$div.addEventListener("mouseleave", () => {
					if (opts.state[`e_${ind}`]) opts.additional.onLeave(ind);
				});
			}
			$div.addEventListener("click", (e) => {
				if (this.preventClick) {
					this.preventClick = false;
					return;
				}
				const isActive = $div.classList.contains("tchart--switcher__active");
				if (isActive && this.enabled === 1) {
					$div.classList.add("tchart--switcher__denied");
					clearTimeout(this.timeout);
					this.timeout = setTimeout(() => {
						$div.classList.remove("tchart--switcher__denied");
					}, 500);
					return;
				}
				if (!this.isTouch) isActive ? opts.additional.onLeave(ind) : opts.additional.onEnter(ind);
				opts.additional.onClick(!isActive, ind);
			});
			let dx, dy;
			let longTapTimer;
			this.drag = new TDrag({
				$el: $div,
				noPrevent: true,
				useElForMove: true,
				onDragStart: (params) => {
					dx = params.pageX;
					dy = params.pageY;
					longTapTimer = setTimeout(() => {
						this.preventClick = true;
						if (!this.isTouch) opts.additional.onEnter(ind);
						opts.additional.onLongTap(ind);
					}, 500);
				},
				onDragMove: (params) => {
					if (Math.abs(dx - params.pageX) > 5 || Math.abs(dy - params.pageY) > 5) clearTimeout(longTapTimer);
				},
				onDragEnd: (params) => {
					clearTimeout(longTapTimer);
				}
			});
			return $div;
		});
		this.updateColors();
	}
	onResize() {}
	updateColors() {
		const ys = this.opts.data.ys;
		for (let i = 0; i < this.switchers.length; i++) this.switchers[i].style.color = this.isDarkMode ? ys[i].colors_n[1] : ys[i].colors_d[1];
	}
	setDarkMode(enabled) {
		this.isDarkMode = enabled;
		this.updateColors();
	}
	render(o) {
		this.enabled = 0;
		for (let i = 0; i < this.switchers.length; i++) if (o[i]) {
			this.enabled++;
			this.switchers[i].classList.add("tchart--switcher__active");
		} else this.switchers[i].classList.remove("tchart--switcher__active");
	}
};
//#endregion
//#region src/lib/tchart/tip.ts
var TTip = class {
	constructor(opts) {
		this.onTipClick = (e) => {
			if (this.prevXInd === void 0) return;
			if (!this.opts.additional.onClick) return;
			if (!this.opts.data.hasDetail) return;
			if (this.opts.state.zoomMode || this.opts.state.zoomModeSpecial) return;
			e.stopPropagation();
			if (this.$tip.classList.contains("tchart--tip__loading")) return;
			const x = this.opts.data.x[this.prevXInd];
			if (!this.opts.data.detailsFunc) {
				this.toggle(false, true);
				this.opts.additional.onClick(true, x);
				return;
			}
			this.$tip.classList.remove("tchart--tip__error");
			this.$tip.classList.add("tchart--tip__loading");
			if (this.cache[x]) {
				this.toggle(false, true);
				this.opts.additional.onClick(true, x, this.cache[x]);
				this.$tip.classList.remove("tchart--tip__loading");
				return;
			}
			this.abortDetailCallbacks();
			const dataPromise = this.opts.data.detailsFunc(x);
			this.detailCallbacks = this.detailCallbacks || [];
			const successDetailCallback = (val) => {
				if (successDetailCallback.cancelled) return;
				this.$tip.classList.remove("tchart--tip__loading");
				if (!val || !val.columns) {
					this.$tip.classList.add("tchart--tip__error");
					return;
				}
				this.toggle(false, true);
				this.opts.additional.onClick(true, x, val);
				this.cache[x] = val;
			};
			const errorDetailCallback = (val) => {
				if (errorDetailCallback.cancelled) return;
				console.log("error:", val);
				this.$tip.classList.remove("tchart--tip__loading");
				this.$tip.classList.add("tchart--tip__error");
			};
			this.detailCallbacks.push(successDetailCallback);
			this.detailCallbacks.push(errorDetailCallback);
			dataPromise.then(successDetailCallback).catch(errorDetailCallback);
		};
		this.onMouseLeave = () => {
			this.$canvas.classList.remove("tchart--graph-canvas__tip-pointer");
			delete this.canvasPos;
		};
		this.onMouseMove = (e) => {
			this.canvasPos = this.canvasPos || getElemPagePos(this.$canvas);
			const dx = e.pageX - this.canvasPos.x;
			const dy = e.pageY - this.canvasPos.y;
			const dims = this.opts.state.dims.tip;
			const tp = this.getTp(dx, dy - dims.t, false);
			this.onMouseLeave();
			tp && this.$canvas.classList.add("tchart--graph-canvas__tip-pointer");
		};
		this.onBodyClick = (e) => {
			if (e.target === this.$canvas) return;
			this.toggle(false);
		};
		this.updateTipScrollClasses = () => {
			if (this.$tipScroller.scrollHeight > this.$tipScroller.offsetHeight) this.$tip.classList.add("tchart--tip__scroll");
			else this.$tip.classList.remove("tchart--tip__scroll");
			if (this.$tipScroller.scrollTop <= 0) this.$tip.classList.remove("tchart--tip__has_less");
			else this.$tip.classList.add("tchart--tip__has_less");
			if (this.$tipScroller.scrollTop >= this.$tipScroller.scrollHeight - this.$tipScroller.offsetHeight) this.$tip.classList.remove("tchart--tip__has_more");
			else this.$tip.classList.add("tchart--tip__has_more");
		};
		this.opts = opts;
		this.shown = false;
		this.isTouch = isTouchDevice();
		this.$canvas = opts.$canvas;
		this.cache = {};
		this.$tip = document.createElement("div");
		this.$tip.className = "tchart--tip";
		opts.$parent.appendChild(this.$tip);
		this.$tipDt = document.createElement("h6");
		this.$tipDt.className = "tchart--tip-header";
		this.$tip.appendChild(this.$tipDt);
		this.$tipDtText = document.createTextNode("");
		this.$tipDt.appendChild(this.$tipDtText);
		this.$tipDtText.nodeValue = ".";
		this.$tipArrow = document.createElement("div");
		this.$tipArrow.className = "tchart--tip-arrow";
		this.$tip.appendChild(this.$tipArrow);
		this.$tipLoader = document.createElement("div");
		this.$tipLoader.className = "tchart--tip-loader";
		this.$tip.appendChild(this.$tipLoader);
		this.$tipScrollerWrapper = document.createElement("div");
		this.$tipScrollerWrapper.className = "tchart--tip-scroller-wrapper";
		this.$tip.appendChild(this.$tipScrollerWrapper);
		this.$tipScroller = document.createElement("div");
		this.$tipScroller.className = "tchart--tip-scroller";
		this.$tipScrollerWrapper.appendChild(this.$tipScroller);
		this.$tipScroller.addEventListener("scroll", this.updateTipScrollClasses);
		this.labels = [];
		opts.data.ys.forEach((item) => {
			this.labels.push(this.addLabel(item));
		});
		if (opts.graphStyle === "bar" && opts.data.ys.length > 1) this.allLabel = this.addLabel({
			label: opts.settings.ALL_LABEL,
			outside: true
		});
		if (opts.graphStyle === "area") this.pieLabel = this.addLabel({
			label: "pie",
			outside: true
		});
		this.tooltipOnHover = this.isTouch ? false : opts.data.tooltipOnHover;
		if (opts.graphStyle !== "bar") {
			this.$line = document.createElement("div");
			this.$line.className = "tchart--line";
			opts.$parent.appendChild(this.$line);
			this.$lineFill = document.createElement("div");
			this.$lineFill.className = "tchart--line-fill";
			this.$line.appendChild(this.$lineFill);
			if (opts.graphStyle !== "area") this.points = opts.data.ys.map(() => {
				const $el = document.createElement("span");
				$el.className = "tchart--line-point";
				this.$line.appendChild($el);
				return $el;
			});
		} else {
			opts.state.barInd = -1;
			opts.state.barO = 0;
		}
		if (!this.tooltipOnHover) {
			this.drag = new TDrag({
				$el: this.$canvas,
				onDragStart: (params) => {
					this.canvasPos = getElemPagePos(this.$canvas);
					this.dx = params.pageX - this.canvasPos.x;
					this.dy = params.pageY - this.canvasPos.y;
					const dims = this.opts.state.dims.tip;
					this.tp = this.getTp(this.dx, this.dy - dims.t, params.isTouch);
					delete this.prevXInd;
					clearTimeout(this.showTimeout);
					this.showTimeout = window.setTimeout(() => {
						this.toggle(!!this.tp);
						this.tp && this.render();
					}, this.isTouch ? 100 : 30);
					getOverlayRoot().removeEventListener("click", this.onBodyClick);
					return !this.tp;
				},
				onDragMove: (params) => {
					if (params.canceled) {
						clearTimeout(this.showTimeout);
						this.toggle(false);
						return;
					}
					this.canvasPos = this.canvasPos || getElemPagePos(this.$canvas);
					this.dx = params.pageX - this.canvasPos.x;
					this.dy = params.pageY - this.canvasPos.y;
					this.render({ isMove: true });
				},
				onDragEnd: () => {
					delete this.canvasPos;
					this.bodyTimeout = window.setTimeout(() => {
						getOverlayRoot().addEventListener("click", this.onBodyClick);
					}, 140);
				}
			});
			this.$tip.addEventListener("click", this.onTipClick);
		} else {
			this.$canvas.addEventListener("mousemove", (e) => {
				this.canvasPos = this.canvasPos || getElemPagePos(this.$canvas);
				this.dx = e.pageX - this.canvasPos.x;
				this.dy = e.pageY - this.canvasPos.y;
				const dims = this.opts.state.dims.tip;
				this.tp = this.getTp(this.dx, this.dy - dims.t, this.isTouch);
				if (this.tp) {
					if (!this.shown) {
						delete this.prevXInd;
						this.toggle(true);
						this.render({});
					} else this.render({ isMove: true });
				} else this.toggle(false);
			});
			this.$canvas.addEventListener("mouseleave", () => {
				delete this.canvasPos;
				this.toggle(false);
			});
			this.$canvas.addEventListener("click", (e) => {
				if (this.shown) this.onTipClick(e);
			});
			this.$tip.style.pointerEvents = "none";
		}
		this.trackMouse(true);
		this.updateColors();
	}
	onResize(rect) {
		const dims = this.opts.state.dims.tip;
		if (this.$line) {
			const dh = this.opts.graphStyle === "area" ? 25 : 16;
			this.$line.style.top = dims.t + "px";
			this.$line.style.height = dims.h + "px";
			this.$lineFill.style.top = dh + "px";
			this.$lineFill.style.bottom = this.opts.settings.PADD[2] + 1 + "px";
		}
		this.render();
	}
	abortDetailCallbacks() {
		if (!this.detailCallbacks) return;
		this.detailCallbacks.forEach((item) => {
			item.cancelled = true;
		});
		delete this.detailCallbacks;
	}
	updateColors() {
		const ys = this.opts.data.ys;
		this.labels.forEach((item, ind) => {
			this.points && (this.points[ind].style.borderColor = this.isDarkMode ? ys[ind].colors_n[0] : ys[ind].colors_d[0]);
			item.$value.style.color = this.isDarkMode ? ys[ind].colors_n[2] : ys[ind].colors_d[2];
		});
		if (this.allLabel) this.allLabel.$value.style.color = "var(--tchart-text-color)";
		if (this.$lineFill) this.$lineFill.style.backgroundColor = this.opts.settings.COLORS.grid;
	}
	setDarkMode(enabled) {
		this.isDarkMode = enabled;
		this.updateColors();
	}
	addLabel(item) {
		const $row = document.createElement("div");
		$row.className = "tchart--tip-row";
		if (item.outside) {
			this.$tip.appendChild($row);
			$row.classList.add("tchart--tip-row__outside");
		} else this.$tipScroller.appendChild($row);
		const $label = document.createElement("span");
		$label.className = "tchart--tip-row-label";
		$row.appendChild($label);
		const $labelText = document.createTextNode("");
		$labelText.nodeValue = item.label;
		$label.appendChild($labelText);
		let $perText;
		let $per;
		if (this.opts.graphStyle === "area") {
			$per = document.createElement("p");
			$per.className = "tchart--tip-row-per";
			$row.appendChild($per);
			$perText = document.createTextNode("");
			$per.appendChild($perText);
		}
		const $value = document.createElement("div");
		$value.className = "tchart--tip-row-value";
		$row.appendChild($value);
		const $valueText = document.createTextNode("");
		$value.appendChild($valueText);
		return {
			$row,
			$value,
			$valueText,
			$label,
			$labelText,
			$per,
			$perText
		};
	}
	getTp(x, y, isTouch) {
		if (this.opts.graphStyle === "area" && this.opts.state.zoomMode) {
			const dims = this.opts.state.dims.graph;
			const cx = dims.w / 2;
			const cy = dims.h / 2;
			return Math.pow((cy - y) * (cy - y) + (x - cx) * (x - cx), .5) <= this.opts.settings.PIE_RADIUS ? "graph" : "";
		} else {
			const dims = this.opts.state.dims.tip;
			if (y < 0 || y > dims.h) return "";
			return "graph";
		}
	}
	trackMouse(enabled, noPropagation) {
		if (this.isTouch) return;
		this.$canvas.addEventListener("mousemove", this.onMouseMove);
		this.$canvas.addEventListener("mouseleave", this.onMouseLeave);
	}
	toggle(enabled, shiftHide) {
		const opts = this.opts;
		const state = opts.state;
		if (enabled && !this.shown) {
			this.$tip.classList.add("tchart--tip__visible");
			if (this.opts.data.hasDetail && !(this.opts.state.zoomMode || this.opts.state.zoomModeSpecial)) this.$tip.classList.add("tchart--tip__has-zoom");
			else this.$tip.classList.remove("tchart--tip__has-zoom");
			this.$tip.classList.remove("tchart--tip__shiftHide");
			this.$line && this.$line.classList.add("tchart--line__visible");
			triggerEvent("chart-hide-tips", { except: this.opts.chart });
		}
		if (!enabled && this.shown) {
			delete this.lastCurPieItemInd;
			if (opts.graphStyle === "area" && state.zoomMode) {
				const animProps = [];
				for (let i = 0; i < state.pieAngles.length; i++) {
					const pieItem = state.pieAngles[i];
					animProps.push({
						prop: `pieInd_${pieItem.ind}`,
						state: opts.state,
						end: 0,
						duration: 350,
						tween: "exp",
						speed: .2,
						group: { top: true }
					});
				}
				opts.animator.add(animProps);
			}
			if (shiftHide) {
				this.$tip.classList.add("tchart--tip__shiftHide");
				this.lastTipTop -= 12;
				this.lastTipLeft = this.lastTipLeft < this.opts.state.dims.tip.w / 2 ? this.lastTipLeft - 12 : this.lastTipLeft + 12;
				this.$tip.style.transform = "translate(" + this.lastTipLeft + "px," + this.lastTipTop + "px)";
				this.$tip.style.webkitTransform = "translate(" + this.lastTipLeft + "px," + this.lastTipTop + "px)";
			}
			this.$tip.classList.remove("tchart--tip__visible");
			this.$line && this.$line.classList.remove("tchart--line__visible");
			this.abortDetailCallbacks();
			this.$tip.classList.remove("tchart--tip__error");
			this.$tip.classList.remove("tchart--tip__loading");
			if (this.opts.graphStyle === "bar") this.opts.animator.add([{
				prop: "barInd",
				state: this.opts.state,
				end: -1,
				duration: 0,
				delay: 150,
				tween: "linear",
				group: { top: true }
			}, {
				prop: "barO",
				state: this.opts.state,
				end: 0,
				duration: 150,
				tween: "exp",
				speed: .3,
				group: { top: true }
			}]);
			getOverlayRoot().removeEventListener("click", this.onBodyClick);
		}
		this.shown = enabled;
	}
	renderPieTooltip(params) {
		const opts = this.opts;
		const state = opts.state;
		const settings = this.opts.settings;
		const pTop = settings.PADD[0];
		const pRight = settings.PADD[1];
		const pBottom = settings.PADD[2];
		const pLeft = settings.PADD[3];
		const dims = state.dims.graph;
		const dimsTip = state.dims.tip;
		const cx = dims.w / 2;
		const cy = dims.h / 2;
		const formatter = getFormatter("yTooltipFormatter", opts.data, state.zoomMorph);
		let ang = Math.atan2(cy - this.dy + dims.t, this.dx - cx);
		ang = ang < 0 ? Math.PI * 2 + ang : ang;
		let curPieItem;
		for (let i = 0; i < state.pieAngles.length; i++) {
			const pieItem = state.pieAngles[i];
			if (ang <= pieItem.st && ang >= pieItem.ed) curPieItem = pieItem;
			if (ang - 2 * Math.PI <= pieItem.st && ang - 2 * Math.PI >= pieItem.ed) curPieItem = pieItem;
		}
		if (this.lastCurPieItemInd !== curPieItem.ind) {
			const animProps = [];
			for (let i = 0; i < state.pieAngles.length; i++) {
				const pieItem = state.pieAngles[i];
				animProps.push({
					prop: `pieInd_${pieItem.ind}`,
					state: opts.state,
					end: pieItem === curPieItem ? 1 : 0,
					duration: 350,
					tween: "exp",
					speed: .2,
					group: { top: true }
				});
			}
			opts.animator.add(animProps);
		}
		this.pieLabel.$row.style.display = "block";
		this.labels.forEach((item) => {
			item.$row.style.display = "none";
		});
		this.pieLabel.$labelText.nodeValue = curPieItem.label;
		this.pieLabel.$valueText.nodeValue = !isNaN(curPieItem.value) ? formatter(curPieItem.value) : "n/a";
		this.pieLabel.$value.style.color = curPieItem.color;
		this.$tip.classList.add("tchart--tip__piemode");
		this.$line && this.$line.classList.add("tchart--line__piemode");
		this.tipH = this.$tip.offsetHeight;
		this.tipW = this.$tip.offsetWidth;
		const tipMarginFromPointer = 20;
		let left = this.dx - this.tipW / 2;
		let top = Math.min(this.dy - tipMarginFromPointer - this.tipH, dimsTip.t + dimsTip.h - this.tipH - pBottom);
		if (top < dimsTip.t + pTop) top = dimsTip.t + pTop;
		left = Math.min(Math.max(left, pLeft / 2), dimsTip.w - this.tipW - pRight / 2);
		this.$tip.style.transform = "translate(" + (left << 0) + "px," + (top << 0) + "px)";
		this.$tip.style.webkitTransform = "translate(" + (left << 0) + "px," + (top << 0) + "px)";
		this.lastCurPieItemInd = curPieItem.ind;
		this.updateTipScrollClasses();
	}
	render(params = {}) {
		if (!this.shown) return;
		const opts = this.opts;
		const state = opts.state;
		const settings = this.opts.settings;
		const pTop = settings.PADD[0];
		const pRight = settings.PADD[1];
		const pBottom = settings.PADD[2];
		const pLeft = settings.PADD[3];
		let $el;
		let y1, y2;
		let itemsVisible = 0;
		const dims = this.opts.state.dims.tip;
		const formatter = getFormatter("yTooltipFormatter", opts.data, state.zoomMorph);
		const zoomMorph = state.zoomMorph === void 0 ? 0 : state.zoomMorph;
		const offsetForBarGraphScale = (opts.graphStyle === "bar" || opts.graphStyle === "step" ? this.opts.data.mainPeriodLen : 0) * (1 - zoomMorph);
		this.abortDetailCallbacks();
		this.$tip.classList.remove("tchart--tip__error");
		this.$tip.classList.remove("tchart--tip__loading");
		if (opts.graphStyle === "area" && state.zoomMode) {
			this.renderPieTooltip(params);
			return;
		} else if (this.pieLabel) this.pieLabel.$row.style.display = "none";
		const constrainedDx = Math.max(Math.min(this.dx, dims.w - 1), 0);
		const x = state.x1 + (state.x2 - state.x1 + offsetForBarGraphScale) * ((constrainedDx - pLeft) / (dims.w - pRight - pLeft));
		const xPos = getXIndex(opts.data.x, x);
		let xInd = opts.graphStyle === "bar" || opts.graphStyle === "step" ? Math.floor(xPos) : Math.round(xPos);
		if (opts.graphStyle !== "bar" && opts.graphStyle !== "step") {
			const cx = (opts.data.x[xInd] - state.x1) / (state.x2 - state.x1 + offsetForBarGraphScale) * (dims.w - pLeft - pRight) + pLeft << 0;
			if (cx < 0) xInd++;
			if (cx > dims.w - 1) xInd--;
		} else if (this.opts.state.zoomMode || this.opts.state.zoomModeSpecial) {
			if (xInd < opts.state.detailInd1) xInd++;
			if (xInd > opts.state.detailInd2) xInd--;
		}
		if (opts.graphStyle === "bar") opts.animator.add([{
			prop: "barInd",
			state: opts.state,
			end: xInd,
			duration: 0,
			tween: "linear",
			group: { top: true }
		}, {
			prop: "barO",
			state: this.opts.state,
			end: 1,
			duration: 150,
			tween: "exp",
			speed: .3,
			group: { top: true }
		}]);
		if (this.prevXInd !== xInd || !params.isMove) {
			this.$tip.classList.remove("tchart--tip__piemode");
			this.$line && this.$line.classList.remove("tchart--line__piemode");
			this.labels.forEach((item, ind) => {
				const display = opts.state[`e_${ind}`] && !isNaN(opts.data.ys[ind].y[xInd]) ? "block" : "none";
				item.$row.style.display = display;
				this.points && (this.points[ind].style.display = display);
				itemsVisible += display === "block" ? 1 : 0;
			});
			this.itemsVisible = itemsVisible;
			if (this.allLabel) this.allLabel.$row.style.display = itemsVisible > 1 ? "block" : "none";
			if (this.itemsVisible) {
				this.$tip.classList.remove("tchart--tip__has_no_items");
				this.$line && this.$line.classList.remove("tchart--line__has_no_items");
			} else {
				this.$tip.classList.add("tchart--tip__has_no_items");
				this.$line && this.$line.classList.add("tchart--line__has_no_items");
			}
			let xw = 0;
			if (opts.graphStyle === "step") {
				if (this.opts.state.zoomMode) xw = opts.data.detailPeriodLen;
				else xw = opts.data.mainPeriodLen;
			}
			const cx = (opts.data.x[xInd] - state.x1 + xw / 2) / (state.x2 - state.x1 + offsetForBarGraphScale) * (dims.w - pLeft - pRight) + pLeft << 0;
			this.$line && (this.$line.style.transform = "translateX(" + cx + "px)");
			this.$line && (this.$line.style.webkitTransform = "translateX(" + cx + "px)");
			this.$tipDtText.nodeValue = opts.data.dates[xInd];
			let sumAll = 0;
			opts.data.ys.forEach((item, ind) => {
				if (opts.state[`e_${ind}`] && !isNaN(item.y[xInd])) {
					this.labels[ind].$valueText.nodeValue = formatter(item.y[xInd]);
					sumAll += item.y[xInd] || 0;
					if (this.points) {
						$el = this.points[ind];
						if (opts.pairY) {
							y1 = state[`y1_${ind}`];
							y2 = state[`y2_${ind}`];
						} else {
							y1 = state["y1"];
							y2 = state["y2"];
						}
						const y = (item.y[xInd] - y1) / (y2 - y1);
						$el.style.transform = "translateY(" + (dims.h - y * (dims.h - pTop - pBottom) - pBottom << 0) + "px)";
						$el.style.webkitTransform = "translateY(" + (dims.h - y * (dims.h - pTop - pBottom) - pBottom << 0) + "px)";
					}
				}
			});
			if (this.allLabel) this.allLabel.$valueText.nodeValue = formatter(sumAll);
			if (!params.isMove) {
				this.maxLabelWidth = 0;
				this.maxValueWidth = 0;
				this.maxPercentageWidth = 0;
				this.maxDateWidth = 0;
				const compStyles = window.getComputedStyle(this.$tip);
				this.rowPaddings = parseInt(compStyles.getPropertyValue("padding-left"), 10) + parseInt(compStyles.getPropertyValue("padding-right"), 10);
			}
			if (opts.graphStyle === "area") this.fillPercentages(xInd, sumAll);
			this.labels.forEach((item, ind) => {
				if (opts.state[`e_${ind}`] && !isNaN(opts.data.ys[ind].y[xInd])) {
					const labelWidth = item.$label.offsetWidth;
					if (labelWidth > this.maxLabelWidth) this.maxLabelWidth = labelWidth;
					const valueWidth = item.$value.offsetWidth;
					if (valueWidth > this.maxValueWidth) this.maxValueWidth = valueWidth;
				}
			});
			let minWidth = this.rowPaddings + this.maxLabelWidth + 20 + this.maxValueWidth;
			minWidth += opts.graphStyle === "area" ? this.maxPercentageWidth : 0;
			const dateWidth = this.rowPaddings + this.$tipDt.offsetWidth + 20;
			if (dateWidth > this.maxDateWidth) this.maxDateWidth = dateWidth;
			minWidth = Math.max(minWidth, this.maxDateWidth);
			this.$tip.style.width = minWidth + "px";
			this.tipH = this.$tip.offsetHeight;
			this.tipW = this.$tip.offsetWidth;
		}
		let pos = this.itemsVisible <= 2 ? "center" : "side";
		const tipMarginFromPointer = 20;
		let left, top;
		if (pos === "center") {
			left = this.dx - this.tipW / 2;
			top = Math.min(this.dy - tipMarginFromPointer - this.tipH, dims.t + dims.h - this.tipH - pBottom);
			if (top < dims.t + pTop) pos = "side";
		}
		if (pos === "side") {
			if (this.dx > dims.w / 2) left = this.dx - this.tipW - tipMarginFromPointer;
			else left = this.dx + tipMarginFromPointer;
			top = Math.min(Math.max(this.dy - this.tipH / 2, dims.t + pTop), dims.t + dims.h - this.tipH - pBottom);
		}
		left = Math.min(Math.max(left, pLeft / 2), dims.w - this.tipW - pRight / 2);
		this.$tip.style.transform = "translate(" + (left << 0) + "px," + (top << 0) + "px)";
		this.$tip.style.webkitTransform = "translate(" + (left << 0) + "px," + (top << 0) + "px)";
		this.lastTipLeft = left << 0;
		this.lastTipTop = top << 0;
		this.prevXInd = xInd;
		this.updateTipScrollClasses();
	}
	fillPercentages(xInd, sumAll) {
		const opts = this.opts;
		const perInt = [];
		let maxLen = 2;
		opts.data.ys.forEach((item, ind) => {
			if (opts.state[`e_${ind}`]) {
				perInt[ind] = Math.max(Math.round(100 * item.y[xInd] / sumAll), 0);
				if (isNaN(item.y[xInd]) || sumAll === 0) perInt[ind] = 0;
				if (perInt[ind] === 100) maxLen = 3;
			}
		});
		opts.data.ys.forEach((item, ind) => {
			if (opts.state[`e_${ind}`]) {
				const percentageWidth = maxLen * 8 + 17;
				const labelTransform = "translateX(calc(" + percentageWidth + "px * var(--reflect)))";
				this.labels[ind].$label.style.transform = labelTransform;
				this.labels[ind].$label.style.webkitTransform = labelTransform;
				this.labels[ind].$perText.nodeValue = perInt[ind] + "%";
				this.labels[ind].$per.style.width = percentageWidth - 7 + "px";
				if (percentageWidth > this.maxPercentageWidth) this.maxPercentageWidth = percentageWidth;
			}
		});
	}
};
//#endregion
//#region src/lib/tchart/chart.ts
var TChart = class TChart {
	static render(opts) {
		const wrapper = document.createElement("div");
		wrapper.className = "tchart--wrapper";
		opts.container.appendChild(wrapper);
		opts.container = wrapper;
		const tChart = new TChart(opts);
		tChart.$wrapper = wrapper;
		return tChart;
	}
	constructor(opts) {
		this.onResize = () => {
			const dpi = Math.min(window.devicePixelRatio || 1, 2);
			if (this.ww === window.innerWidth && dpi === this.settings.dpi) return;
			this.settings.dpi = dpi;
			this.ww = window.innerWidth;
			if (this.data.sideLegend) {
				this.$switchers.classList.remove("tchart--switchers__no-space");
				const graphWidthData = this.getGraphWidth(true);
				if (graphWidthData.hasSpaceForLegend) this.$graph.style.width = graphWidthData.width + "px";
				else {
					this.$switchers.classList.add("tchart--switchers__no-space");
					this.$graph.style.width = graphWidthData.width + "px";
				}
			}
			const rectGraph = this.$graph.getBoundingClientRect();
			const s = this.settings;
			const graphHeight = rectGraph.height - s.DATES_HEIGHT - s.MINI_GRAPH_HEIGHT - s.MINI_GRAPH_TOP - s.MINI_GRAPH_BOTTOM;
			const datesSide = this.state.datesSide = langPack_default.getIsRTL() ? s.DATES_SIDE === "right" ? "left" : "right" : s.DATES_SIDE;
			this.state.dims = {
				composer: {
					w: rectGraph.width,
					h: rectGraph.height,
					l: 0,
					t: 0
				},
				graph: {
					w: rectGraph.width,
					h: graphHeight,
					l: 0,
					t: s.DATES_HEIGHT
				},
				axisYLeft: {
					w: s.Y_LABELS_WIDTH,
					h: graphHeight,
					l: s.PADD[3],
					t: s.DATES_HEIGHT
				},
				axisYRight: {
					w: s.Y_LABELS_WIDTH,
					h: graphHeight,
					l: rectGraph.width - s.PADD[1] - s.Y_LABELS_WIDTH,
					t: s.DATES_HEIGHT
				},
				axisYLines: {
					w: rectGraph.width - s.PADD[1] - s.PADD[3],
					h: graphHeight,
					l: s.PADD[3],
					t: s.DATES_HEIGHT
				},
				fadeTop: {
					w: rectGraph.width,
					h: s.FADE_HEIGHT,
					l: 0,
					t: s.DATES_HEIGHT
				},
				fadeBottom: {
					w: rectGraph.width,
					h: s.FADE_HEIGHT,
					l: 0,
					t: s.DATES_HEIGHT + graphHeight - s.FADE_HEIGHT
				},
				axisX: {
					w: rectGraph.width,
					h: s.X_LABELS_HEIGHT,
					l: 0,
					t: s.DATES_HEIGHT + graphHeight - s.X_LABELS_HEIGHT
				},
				dates: {
					w: s.DATES_WIDTH,
					h: s.DATES_HEIGHT,
					l: datesSide === "right" ? rectGraph.width - s.DATES_WIDTH - s.PADD[1] : s.PADD[1],
					t: 0
				},
				mini: {
					w: rectGraph.width - s.PADD[1] - s.PADD[3],
					h: s.MINI_GRAPH_HEIGHT,
					l: s.PADD[3],
					t: s.DATES_HEIGHT + graphHeight + s.MINI_GRAPH_TOP
				},
				handle: {
					w: rectGraph.width - s.PADD[1] - s.PADD[3],
					h: s.MINI_GRAPH_HEIGHT + 2,
					l: s.PADD[3],
					t: s.DATES_HEIGHT + graphHeight + s.MINI_GRAPH_TOP - 1
				},
				tip: {
					w: rectGraph.width,
					h: graphHeight,
					l: 0,
					t: s.DATES_HEIGHT
				}
			};
			this.graph.onResize();
			this.axisY.onResize();
			this.fade.onResize();
			this.axisX.onResize();
			this.mini.onResize();
			this.handle.onResize();
			this.tip.onResize();
			this.composer.onResize();
		};
		this.onHandleMove = (x1, x2, tp, firstMove) => {
			let isMagnet = this.state.zoomMode;
			this.updateSpeed();
			isMagnet = false;
			if (isMagnet) {
				const periodLen = this.data.mainPeriodLen;
				x1 = Math.round(x1 / periodLen) * periodLen;
				x2 = Math.round(x2 / periodLen) * periodLen;
				x1 = Math.min(Math.max(x1, this.state.xg1), this.state.xg2 - periodLen);
				x2 = Math.min(Math.max(x2, this.state.xg1 + periodLen), this.state.xg2);
				if (x2 <= x1) x2 = x1 + periodLen;
				const x1AnimItem = this.animator.get("x1");
				const x2AnimItem = this.animator.get("x2");
				const x1End = x1AnimItem ? x1AnimItem.end : this.state["x1"];
				const x2End = x2AnimItem ? x2AnimItem.end : this.state["x2"];
				if (x1 === x1End && x2 === x2End) return;
			}
			const props = [];
			const range = this.getYMinMax(x1, x2, false, true);
			this.axisX.setAnimation(isMagnet || tp !== "both");
			this.axisY.setAnimation(true);
			this.axisY.setForceUpdate(false);
			firstMove && triggerEvent("chart-hide-tips", { except: null });
			props.push({
				prop: "x1",
				state: this.state,
				end: x1,
				fixed: true,
				duration: isMagnet ? 250 : 0,
				group: {
					top: true,
					bottom: true
				}
			});
			props.push({
				prop: "x2",
				state: this.state,
				end: x2,
				fixed: true,
				duration: isMagnet ? 250 : 0,
				group: {
					top: true,
					bottom: true
				}
			});
			for (let i = 0; i < this.data.ys.length; i++) {
				if (this.graphStyle === "line" || this.graphStyle === "step") props.push({
					prop: this.pairY ? `y1_${i}` : "y1",
					state: this.state,
					end: this.pairY ? range.min[i] : range.min,
					duration: 500,
					fixed: true,
					tween: "exp",
					speed: .25,
					group: { top: true }
				});
				if (this.graphStyle !== "area") props.push({
					prop: this.pairY ? `y2_${i}` : "y2",
					state: this.state,
					end: this.pairY ? range.max[i] : range.max,
					duration: 500,
					fixed: true,
					tween: "exp",
					speed: .25,
					group: { top: true }
				});
			}
			this.animator.add(props);
		};
		this.onSwitcherEnter = (ind) => {
			clearTimeout(this.switcherLeaveTimeout);
			const props = [];
			for (let i = 0; i < this.data.ys.length; i++) {
				props.push({
					prop: `f_${i}`,
					state: this.state,
					end: ind === i ? 1 : 0,
					duration: 300,
					tween: "exp",
					speed: .15,
					group: {
						top: true,
						bottom: true
					}
				});
				props.push({
					prop: `pieInd_${i}`,
					state: this.state,
					end: ind === i ? 1 : 0,
					duration: 300,
					tween: "exp",
					speed: .15,
					group: {
						top: true,
						bottom: true
					}
				});
			}
			this.animator.add(props);
		};
		this.onSwitcherLeave = (propsind) => {
			clearTimeout(this.switcherLeaveTimeout);
			this.switcherLeaveTimeout = window.setTimeout(() => {
				const props = [];
				for (let i = 0; i < this.data.ys.length; i++) {
					props.push({
						prop: `f_${i}`,
						state: this.state,
						end: 1,
						duration: 300,
						tween: "exp",
						speed: .15,
						group: {
							top: true,
							bottom: true
						}
					});
					props.push({
						prop: `pieInd_${i}`,
						state: this.state,
						end: 0,
						duration: 300,
						tween: "exp",
						speed: .15,
						group: {
							top: true,
							bottom: true
						}
					});
				}
				this.animator.add(props);
			}, 300);
		};
		this.onSwitcherChange = (enabled, ind) => {
			var rangeGraph, rangeMini, i, props = [], isCurrent, e = [], prevE = [];
			var longTap, isAllOffExceptCurrent;
			this.updateSpeed();
			if (typeof enabled !== "boolean") {
				longTap = true;
				ind = enabled;
				isAllOffExceptCurrent = true;
				for (i = 0; i < this.data.ys.length; i++) isAllOffExceptCurrent = isAllOffExceptCurrent && (i === ind ? this.state[`e_${i}`] : !this.state[`e_${i}`]);
			}
			var maxYSize = 0;
			for (i = 0; i < this.data.ys.length; i++) {
				isCurrent = i === ind;
				prevE[i] = this.state[`e_${i}`];
				if (longTap) this.state[`e_${i}`] = isCurrent;
				else if (isCurrent) this.state[`e_${i}`] = !!enabled;
				if (isAllOffExceptCurrent && longTap) this.state[`e_${i}`] = true;
				e[i] = this.state[`e_${i}`];
				if (e[i]) maxYSize = Math.max(maxYSize, this.data.ys[i].y.length);
			}
			var reducedRange = this.reduceGlobalRange({});
			if (reducedRange.isReduced) {
				props.push({
					prop: "x1",
					state: this.state,
					end: reducedRange.x1,
					duration: 333,
					group: {
						top: true,
						bottom: true
					}
				});
				props.push({
					prop: "x2",
					state: this.state,
					end: reducedRange.x2,
					duration: 333,
					group: {
						top: true,
						bottom: true
					}
				});
				props.push({
					prop: "xg1",
					state: this.state,
					end: reducedRange.xg1,
					duration: 333,
					group: {
						top: true,
						bottom: true
					}
				});
				props.push({
					prop: "xg2",
					state: this.state,
					end: reducedRange.xg2,
					duration: 333,
					group: {
						top: true,
						bottom: true
					}
				});
				this.state.xg1Ind = reducedRange.xg1Ind;
				this.state.xg2Ind = reducedRange.xg2Ind;
				rangeGraph = this.getYMinMax(reducedRange.x1, reducedRange.x2, false, true);
				rangeMini = this.getYMinMax(reducedRange.xg1, reducedRange.xg2, true);
			} else {
				rangeGraph = this.getYMinMax(this.state.x1, this.state.x2, false, true);
				rangeMini = this.getYMinMax(this.state.xg1, this.state.xg2, true);
			}
			triggerEvent("chart-hide-tips", { except: null });
			this.axisY.setForceUpdate(true);
			this.axisY.setAnimation(true);
			this.state.activeColumnsCount = 0;
			for (i = 0; i < e.length; i++) {
				e[i] && this.state.activeColumnsCount++;
				if (prevE[i] !== e[i]) {
					props.push({
						prop: `o_${i}`,
						state: this.state,
						end: e[i] ? 1 : 0,
						duration: 300,
						group: { top: true }
					});
					props.push({
						prop: `om_${i}`,
						state: this.state,
						end: e[i] ? 1 : 0,
						duration: this.graphStyle === "line" || this.graphStyle === "step" ? 166 : 300,
						delay: e[i] && this.graphStyle === "line" || this.graphStyle === "step" ? 200 : 0,
						tween: "linear",
						group: { bottom: true }
					});
				}
			}
			for (i = 0; i < (this.pairY ? e.length : 1); i++) {
				if (this.graphStyle === "line" || this.graphStyle === "step") props.push({
					prop: this.pairY ? `y1_${i}` : "y1",
					state: this.state,
					end: this.pairY ? rangeGraph.min[i] : rangeGraph.min,
					duration: this.pairY ? 0 : 333,
					group: { top: true }
				});
				if (this.graphStyle !== "area") props.push({
					prop: this.pairY ? `y2_${i}` : "y2",
					state: this.state,
					end: this.pairY ? rangeGraph.max[i] : rangeGraph.max,
					duration: this.pairY ? 0 : 333,
					group: { top: true }
				});
				if (this.graphStyle === "line" || this.graphStyle === "step") props.push({
					prop: this.pairY ? `y1m_${i}` : "y1m",
					state: this.state,
					end: this.pairY ? rangeMini.min[i] : rangeMini.min,
					duration: this.pairY ? 0 : 316,
					group: { bottom: true }
				});
				if (this.graphStyle !== "area") props.push({
					prop: this.pairY ? `y2m_${i}` : "y2m",
					state: this.state,
					end: this.pairY ? rangeMini.max[i] : rangeMini.max,
					duration: this.pairY ? 0 : 316,
					group: { bottom: true }
				});
			}
			this.state["y1m_hidd"] = this.state.y1m;
			this.state["y2m_hidd"] = this.state.y2m;
			this.state["y1m_show"] = rangeMini.min;
			this.state["y2m_show"] = rangeMini.max;
			this.switchers.render(e);
			this.animator.add(props);
		};
		this.toggleZoom = (enabled, dt, data) => {
			if (enabled) {}
			if (data && this.specialZoomTransition === void 0) {
				if (data.columns.length !== this.data.ys.length + 1) this.specialZoomTransition = true;
				if (!this.specialZoomTransition) data.columns.forEach((item) => {
					const id = item[0];
					const tp = data.types[id];
					const label = data.names[id];
					const ind = this.data.yIds[id];
					if (ind !== void 0) {
						const tpOrig = this.data.ys[ind].tp;
						const labelOrig = this.data.ys[ind].label;
						if (tpOrig !== tp || labelOrig !== label) this.specialZoomTransition = true;
					} else if (id !== "x") this.specialZoomTransition = true;
				});
				if (this.specialZoomTransition === void 0) this.specialZoomTransition = false;
			}
			if (this.specialZoomTransition) {
				this.data.master = true;
				this.$el.classList.add("tchart__master");
				if (!this.slaveChart) {
					const clonedData = JSON.parse(JSON.stringify(data));
					clonedData.yTickFormatter = data.yTickFormatter;
					clonedData.yTooltipFormatter = data.yTooltipFormatter;
					clonedData.xTickFormatter = data.xTickFormatter;
					clonedData.xTooltipFormatter = data.xTooltipFormatter;
					clonedData.xRangeFormatter = data.xRangeFormatter;
					clonedData.sideLegend = this.data.sideLegend;
					clonedData.getLabelDate = this.data.getLabelDate;
					clonedData.getLabelTime = this.data.getLabelTime;
					this.slaveChart = new TChart({
						container: this.opts.container,
						slave: true,
						data: clonedData
					});
					this.slaveChart.setDarkMode(this.darkMode);
				}
			}
			if (data && !data.details) {
				data.details = {
					y: [],
					names: []
				};
				data.columns.forEach((item) => {
					const id = item.shift();
					const tp = data.types[id];
					const label = data.names[id];
					if (tp === "x") data.details.x = item;
					else if (this.specialZoomTransition) {
						data.details.y.push(item);
						data.details.names.push(label);
					} else data.details.y[this.data.yIds[id]] = item;
				});
			}
			if (data) {
				data.subchart = {
					show: data.subchart && data.subchart.show !== void 0 ? data.subchart.show : true,
					defaultZoom: data.subchart && data.subchart.defaultZoom
				};
				data.details.subchart = data.subchart;
				data.details.hidden = data.hidden || [];
			}
			if (this.specialZoomTransition) {
				this.toggleZoomSpecial(enabled, dt, data && data.details);
				return;
			}
			const details = data && data.details;
			var rangeGraph, rangeMini, props = [];
			if (this.state.zoomMode === enabled) return;
			if (enabled) {
				this.state.zoomMode = true;
				this.state.zoomDir = 1;
				this.$h1.classList.add("tchart--header__hidden");
				this.$zoom.classList.add("tchart--zoom__visible");
				this.zoomEnterSpeed = this.updateSpeed();
				if (data) this.data.details = {
					yTickFormatter: data.yTickFormatter,
					yTooltipFormatter: data.yTooltipFormatter,
					xTickFormatter: data.xTickFormatter,
					xTooltipFormatter: data.xTooltipFormatter,
					xRangeFormatter: data.xRangeFormatter,
					subchart: data.subchart,
					hidden: data.hidden || []
				};
				if (!this.hasSavedData) {
					this.data.saved = {};
					this.data.saved.x = this.data.x.slice();
					this.data.saved.dates = this.data.dates.slice();
					this.data.saved.datesShort = this.data.datesShort.slice();
					this.data.saved.datesRange = this.data.datesRange.slice();
					this.data.saved.y = [];
					for (let j = 0; j < this.data.ys.length; j++) this.data.saved.y[j] = this.data.ys[j].y.slice();
					this.hasSavedData = true;
				}
				if (this.data.details && this.data.details.subchart) {
					if (!this.data.details.subchart.show) this.$el.classList.add("tchart__no-subchart");
					else this.$el.classList.remove("tchart__no-subchart");
				}
				this.state.zoomSaved = {
					x1: this.state.x1,
					x2: this.state.x2,
					xg1: this.state.xg1,
					xg2: this.state.xg2,
					xgMin: this.state.xgMin,
					xgMax: this.state.xgMax
				};
				var periodLen = this.data.mainPeriodLen;
				var x1 = dt;
				var x2 = dt + periodLen;
				if (this.data.details) {
					var defaultZoom = this.getDefaultZoom({
						x1,
						x2,
						xg1: details.x[0],
						xg2: details.x[details.x.length - 1],
						default: this.data.details.subchart.defaultZoom
					});
					var x1 = defaultZoom.x1;
					var x2 = defaultZoom.x2;
				}
				var xg1, xg2;
				if (this.graphStyle !== "area") {
					this.data.detailPeriodLen = details.x[1] - details.x[0];
					xg1 = details.x[0];
					xg2 = details.x[details.x.length - 1];
				} else {
					this.data.detailPeriodLen = periodLen;
					var totalRange = this.data.pieZoomRange;
					xg1 = x1 - (totalRange - periodLen) / 2;
					xg2 = xg1 + totalRange;
					x2 = x1 + Math.round(totalRange / 7 / periodLen) * periodLen;
					if (xg1 < this.data.x[0]) {
						xg1 = this.data.x[0];
						xg2 = xg1 + totalRange;
						if (xg2 > this.data.x[this.data.x.length - 1]) xg2 = this.data.x[this.data.x.length - 1] + periodLen;
					} else if (xg2 > this.data.x[this.data.x.length - 1]) {
						xg2 = this.data.x[this.data.x.length - 1] + periodLen;
						xg1 = xg2 - totalRange;
						if (xg1 < this.data.x[0]) xg1 = this.data.x[0];
					}
				}
				xg1 = Math.round(xg1 / periodLen) * periodLen;
				xg2 = Math.round(xg2 / periodLen) * periodLen;
				if (this.graphStyle !== "area") this.insertDetails(xg1, xg2, details);
				this.state.xgMin = xg1;
				this.state.xgMax = xg2;
			} else {
				this.updateSpeed(this.zoomEnterSpeed / (this.graphStyle === "area" ? 2 : 1));
				this.$h1.classList.remove("tchart--header__hidden");
				this.$zoom.classList.remove("tchart--zoom__visible");
				if (this.data.details) {
					if (!this.data.subchart.show) this.$el.classList.add("tchart__no-subchart");
					else this.$el.classList.remove("tchart__no-subchart");
				}
				this.state.zoomDir = -1;
				x1 = this.state.zoomSaved.x1;
				x2 = this.state.zoomSaved.x2;
				xg1 = this.state.zoomSaved.xg1;
				xg2 = this.state.zoomSaved.xg2;
				this.state.xgMin = this.state.zoomSaved.xgMin;
				this.state.xgMax = this.state.zoomSaved.xgMax;
			}
			this.axisY.setForceUpdate(true);
			this.axisY.setAnimation(true);
			this.axisX.setAnimation(true);
			let duration = 450;
			let delayMain = 0;
			let delayZoom = 0;
			if (this.graphStyle === "area") {
				duration = 350;
				if (enabled) delayZoom = duration * .95;
				else delayMain = duration * .95;
			}
			const reducedRange = this.reduceGlobalRange({
				x1,
				x2,
				xg1,
				xg2,
				useSaved: !enabled
			});
			if (reducedRange.isReduced) {
				x1 = reducedRange.x1;
				x2 = reducedRange.x2;
				xg1 = reducedRange.xg1;
				xg2 = reducedRange.xg2;
			}
			this.state.xg1Ind = Math.floor(getXIndex(enabled ? this.data.x : this.data.saved.x, xg1));
			this.state.xg2Ind = Math.ceil(getXIndex(enabled ? this.data.x : this.data.saved.x, xg2));
			rangeGraph = this.getYMinMax(x1, x2, false, true, !enabled);
			rangeMini = this.getYMinMax(xg1, xg2, true, false, !enabled);
			document.body.style.pointerEvents = "none";
			setTimeout(() => {
				if (!enabled) {
					this.state.zoomMode = false;
					if (this.graphStyle !== "area") this.revertDetails();
				}
				document.body.style.pointerEvents = "";
				this.composer.render({
					top: true,
					bottom: true
				});
			}, duration + 20 + (this.graphStyle === "area" ? duration * .9 : 0));
			this.state.zoomMorph = enabled ? 0 : 1;
			props.push({
				prop: "zoomMorph",
				state: this.state,
				end: enabled ? 1 : 0,
				duration,
				delay: delayZoom,
				group: {
					top: true,
					bottom: true
				}
			});
			props.push({
				prop: "x1",
				state: this.state,
				end: x1,
				delay: delayMain,
				duration,
				group: {
					top: true,
					bottom: true
				}
			});
			props.push({
				prop: "x2",
				state: this.state,
				end: x2,
				delay: delayMain,
				duration,
				group: {
					top: true,
					bottom: true
				}
			});
			props.push({
				prop: "xg1",
				state: this.state,
				end: xg1,
				delay: delayMain,
				duration,
				group: {
					top: true,
					bottom: true
				}
			});
			props.push({
				prop: "xg2",
				state: this.state,
				end: xg2,
				delay: delayMain,
				duration,
				group: {
					top: true,
					bottom: true
				}
			});
			for (let i = 0; i < (this.pairY ? this.data.ys.length : 1); i++) {
				if (this.graphStyle === "line" || this.graphStyle === "step") props.push({
					prop: this.pairY ? `y1_${i}` : "y1",
					state: this.state,
					end: this.pairY ? rangeGraph.min[i] : rangeGraph.min,
					delay: delayMain,
					duration,
					group: { top: true }
				});
				if (this.graphStyle !== "area") props.push({
					prop: this.pairY ? `y2_${i}` : "y2",
					state: this.state,
					end: this.pairY ? rangeGraph.max[i] : rangeGraph.max,
					delay: delayMain,
					duration,
					group: { top: true }
				});
				if (this.graphStyle === "line" || this.graphStyle === "step") props.push({
					prop: this.pairY ? `y1m_${i}` : "y1m",
					state: this.state,
					end: this.pairY ? rangeMini.min[i] : rangeMini.min,
					delay: delayMain,
					duration,
					group: { bottom: true }
				});
				if (this.graphStyle !== "area") props.push({
					prop: this.pairY ? `y2m_${i}` : "y2m",
					state: this.state,
					end: this.pairY ? rangeMini.max[i] : rangeMini.max,
					delay: delayMain,
					duration,
					group: { bottom: true }
				});
			}
			this.animator.add(props);
		};
		this.state = {};
		this.state.masterVisibility = 1;
		this.state.slaveVisibility = 0;
		this.specialZoomTransition = void 0;
		const isIEOld = (!!window.ActiveXObject && +/msie\s(\d+)/i.exec(navigator.userAgent)[1] || NaN) < 11;
		const isIE11 = navigator.userAgent.indexOf("Trident/") !== -1 && (navigator.userAgent.indexOf("rv:") !== -1 || navigator.appName.indexOf("Netscape") !== -1);
		const DAY_COLORS = {
			background: "#FFFFFF",
			backgroundRgb: [
				255,
				255,
				255
			],
			text: "#000000",
			dates: "#000",
			grid: "rgba(24, 45, 59, 0.1)",
			axis: {
				x: "rgba(37,37,41,0.5)",
				y: "rgba(37,37,41,0.5)"
			},
			barsSelectionBackground: "rgba(255, 255, 255, 0.5)",
			miniMask: "rgba(226, 238, 249, 0.6)",
			miniFrame: "#C0D1E1"
		};
		const NIGHT_COLORS = {
			background: "#242F3E",
			backgroundRgb: [
				36,
				47,
				62
			],
			text: "#FFFFFF",
			dates: "#fff",
			grid: "rgba(255, 255, 255, 0.1)",
			axis: {
				x: "rgba(163,177,194,0.6)",
				y: "rgba(236,242,248,0.5)"
			},
			barsSelectionBackground: "rgba(36, 47, 62, 0.5)",
			miniMask: "rgba(48, 66, 89, 0.6)",
			miniFrame: "#56626D"
		};
		const darkMode = !!document.documentElement.classList.contains("dark");
		this.settings = {
			isIE: isIEOld || isIE11,
			isEdge: /Edge\/\d./i.test(navigator.userAgent),
			dpi: Math.min(window.devicePixelRatio || 1, 2),
			darkMode,
			ALL_LABEL: "All",
			Y_AXIS_RANGE: 5.3,
			PADD: [
				20,
				16,
				20,
				16
			],
			PADD_MINI: [
				2,
				0,
				2,
				0
			],
			PADD_MINI_BAR: [
				0,
				0,
				0,
				0
			],
			PADD_MINI_AREA: [
				0,
				0,
				0,
				0
			],
			Y_LABELS_WIDTH: 50,
			X_LABELS_HEIGHT: 12,
			DATES_HEIGHT: 18,
			DATES_WIDTH: 300,
			DATES_SIDE: "right",
			DATES_WEIGHT: "bold",
			ZOOM_TEXT: "Zoom Out",
			MINI_GRAPH_HEIGHT: 40,
			MINI_GRAPH_TOP: 14,
			MINI_GRAPH_BOTTOM: 2,
			FADE_HEIGHT: 16,
			PIE_RADIUS: 130,
			FONT: {
				family: "-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif",
				bold: "bold",
				normal: "normal"
			},
			COLORS: darkMode ? NIGHT_COLORS : DAY_COLORS,
			...opts.settings || {}
		};
		this.data = {
			caption: opts.data.title,
			detailsFunc: opts.data.x_on_zoom,
			hasDetail: !!opts.data.x_on_zoom,
			slave: opts.slave,
			yTickFormatter: opts.data.yTickFormatter,
			yTooltipFormatter: opts.data.yTooltipFormatter,
			yMinStep: opts.data.yMinStep,
			xTickFormatter: opts.data.xTickFormatter,
			xTooltipFormatter: opts.data.xTooltipFormatter,
			xRangeFormatter: opts.data.xRangeFormatter,
			strokeWidth: opts.data.strokeWidth || "auto",
			hidden: opts.data.hidden || [],
			tooltipOnHover: !!opts.data.tooltipOnHover,
			forceLegend: opts.data.forceLegend,
			sideLegend: opts.data.sideLegend || false,
			pieZoomRange: opts.data.pieZoomRange || 6048e5,
			pieLabelsPercentages: {
				outboard: opts.data.pieLabelsPercentages && opts.data.pieLabelsPercentages.outboard !== void 0 ? opts.data.pieLabelsPercentages.outboard : 5,
				hoverOnly: opts.data.pieLabelsPercentages && opts.data.pieLabelsPercentages.hoverOnly !== void 0 ? opts.data.pieLabelsPercentages.hoverOnly : 2
			},
			subchart: {
				show: opts.data.subchart && opts.data.subchart.show !== void 0 ? opts.data.subchart.show : true,
				defaultZoom: opts.data.subchart && opts.data.subchart.defaultZoom
			},
			getLabelDate: opts.data.getLabelDate || getLabelDate,
			getLabelTime: opts.data.getLabelTime || getLabelTime
		};
		if (opts.data.y_scaled) this.pairY = true;
		this.graphStyle = "line";
		const settings = this.settings;
		opts.data.columns.forEach((item) => {
			const id = item.shift();
			const tp = opts.data.types[id];
			if (tp === "x") {
				this.data.x = item;
				this.state.xCount = item.length;
				this.state.x1 = item[item.length * .75 << 0];
				this.state.x2 = item[item.length - 1];
				this.state.xg1 = item[0];
				this.state.xg2 = item[item.length - 1];
				this.state.xg1Ind = 0;
				this.state.xg2Ind = item.length - 1;
				this.state.xMainMin = item[0];
				this.state.xMainMax = item[this.state.xg2Ind];
				this.state.xgMin = item[0];
				this.state.xgMax = item[this.state.xg2Ind];
				const defaultZoom = this.getDefaultZoom({
					x1: this.state.x1,
					x2: this.state.x2,
					xg1: this.state.xg1,
					xg2: this.state.xg2,
					default: this.data.subchart.defaultZoom
				});
				this.state.x1 = defaultZoom.x1;
				this.state.x2 = defaultZoom.x2;
				this.data.mainPeriodLen = this.data.x[1] - this.data.x[0];
				this.data.detailPeriodLen = this.data.mainPeriodLen;
				this.data.dates = [];
				this.data.datesShort = [];
				this.data.datesRange = [];
				const xTooltipFormatter = getFormatter("xTooltipFormatter", this.data, 0);
				const xTickFormatter = getFormatter("xTickFormatter", this.data, 0);
				const xRangeFormatter = this.data.subchart.show ? getFormatter("xRangeFormatter", this.data, 0) : void 0;
				let maxXTickLength = 0;
				item.forEach((item, ind) => {
					this.data.dates[ind] = xTooltipFormatter(item, false);
					this.data.datesShort[ind] = xTickFormatter(item, false);
					if (xRangeFormatter) this.data.datesRange[ind] = xRangeFormatter(item, false);
					if (this.data.datesShort[ind].length > maxXTickLength) maxXTickLength = this.data.datesShort[ind].length;
				});
				this.data.maxXTickLength = maxXTickLength;
			} else {
				this.data.ys = this.data.ys || [];
				this.data.yIds = this.data.yIds || {};
				const color = opts.data.colors[id];
				this.data.ys.push({
					colors_d: [
						color,
						color,
						color
					],
					colors_n: [
						color,
						color,
						color
					],
					label: opts.data.names[id],
					y: item,
					tp,
					id
				});
				const yind = this.data.ys.length - 1;
				const isVisible = this.data.hidden.indexOf(id) === -1;
				this.data.yIds[id] = yind;
				this.state[`e_${yind}`] = isVisible;
				this.state[`o_${yind}`] = isVisible ? 1 : 0;
				this.state[`om_${yind}`] = isVisible ? 1 : 0;
				this.state[`pieInd_${yind}`] = 0;
				this.state[`f_${yind}`] = 1;
				this.graphStyle = tp;
			}
		});
		this.state.activeColumnsCount = this.data.ys.length;
		this.updateSpeed();
		if (this.graphStyle === "area") {
			settings.Y_AXIS_RANGE = 4.06;
			this.data.hasDetail = true;
		}
		const reducedRange = this.reduceGlobalRange({});
		if (reducedRange.isReduced) {
			this.state.x1 = reducedRange.x1;
			this.state.x2 = reducedRange.x2;
			this.state.xg1 = reducedRange.xg1;
			this.state.xg2 = reducedRange.xg2;
			this.state.xg1Ind = reducedRange.xg1Ind;
			this.state.xg2Ind = reducedRange.xg2Ind;
		}
		this.createDOM(opts.container);
		window.addEventListener("resize", this.onResize);
		document.addEventListener("darkmode", () => {
			this.setDarkMode(!this.darkMode);
		}, false);
		document.addEventListener("chart-hide-tips", (e) => {
			e.detail.except !== this && this.tip.toggle(false);
		}, false);
		this.opts = opts;
		this.onResize();
		this.darkMode && this.setDarkMode(this.darkMode);
		window.matchMedia("(-webkit-min-device-pixel-ratio: 1), (min-resolution: 96dpi)").addListener(this.onResize);
		window.matchMedia("(-webkit-min-device-pixel-ratio: 1.5), (min-resolution: 144dpi)").addListener(this.onResize);
		window.matchMedia("(-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)").addListener(this.onResize);
		window.matchMedia("(-webkit-min-device-pixel-ratio: 3), (min-resolution: 288dpi)").addListener(this.onResize);
	}
	get darkMode() {
		return this.settings.darkMode;
	}
	reduceGlobalRange(params) {
		let x1 = params.x1 === void 0 ? this.state.x1 : params.x1;
		let x2 = params.x2 === void 0 ? this.state.x2 : params.x2;
		const xg1Orig = params.xg1 === void 0 ? this.state.xg1 : params.xg1;
		const xg2Orig = params.xg2 === void 0 ? this.state.xg2 : params.xg2;
		const x = params.useSaved ? this.data.saved.x : this.data.x;
		const xg1Ind = Math.floor(getXIndex(x, this.state.xgMin));
		const xg2Ind = Math.ceil(getXIndex(x, this.state.xgMax));
		let minXInd = xg2Ind;
		let maxXInd = xg1Ind;
		let shift = this.state.zoomMode ? this.graphStyle === "bar" || this.graphStyle === "step" ? 1 : 2 : 0;
		if (this.graphStyle === "area") shift = 0;
		this.data.ys.forEach((item, ind) => {
			var y = params.useSaved ? this.data.saved.y[ind] : item.y;
			if (this.state[`e_${ind}`]) {
				for (let i = xg1Ind; i <= xg2Ind - shift; ++i) if (y[i] !== void 0) {
					minXInd = Math.min(minXInd, i);
					maxXInd = Math.max(maxXInd, i);
				}
			}
		});
		if (maxXInd + shift === xg2Ind) maxXInd = xg2Ind - Math.max(shift - 1, 0);
		if (minXInd >= maxXInd) return { isReduced: false };
		const xg1 = x[minXInd];
		const xg2 = x[maxXInd];
		if (xg1Orig === xg1 && xg2Orig === xg2) return { isReduced: false };
		if (x2 > xg2) {
			x1 = xg2 - (x2 - x1);
			x2 = xg2;
			if (x1 < xg1) x1 = xg1;
		} else if (x1 < xg1) {
			x2 = xg1 + (x2 - x1);
			x1 = xg1;
			if (x2 > xg2) x2 = xg2;
		}
		return {
			isReduced: true,
			x1,
			x2,
			xg1,
			xg2,
			xg1Ind: minXInd,
			xg2Ind: maxXInd
		};
	}
	getDefaultZoom(params) {
		if (!params.default) return {
			x1: params.x1,
			x2: params.x2
		};
		const res = {};
		res.x1 = params.default[0];
		res.x2 = params.default[1];
		res.x1 = Math.max(res.x1, params.xg1);
		res.x2 = Math.min(res.x2, params.xg2);
		if (res.x1 >= res.x2) {
			res.x1 = params.xg1;
			res.x2 = params.xg2;
		}
		return res;
	}
	updateSpeed(speed) {
		const points = this.state.activeColumnsCount * this.state.xCount * Math.pow((this.state.x2 - this.state.x1) / (this.state.xMainMax - this.state.xMainMin), .5);
		const periods = this.state.deviceSpeed * points / 16.66 << 0;
		let k = Math.max(1 - .25 * periods, 0);
		k = Math.pow(k, .85);
		if (this.state.deviceSpeed === void 0) speed = 1;
		speed = 1;
		this.state.speed = speed === void 0 ? k : speed;
		return this.state.speed;
	}
	getYMinMax(x1, x2, isMini, fitTo, useSaved) {
		if (this.graphStyle === "area") return {
			min: 0,
			max: 102
		};
		const graphAreaWidth = this.state.dims ? this.state.dims.graph.w : this.getGraphWidth(this.data.sideLegend).width;
		let yMin = Number.MAX_VALUE;
		let yMax = -Number.MAX_VALUE;
		const datePerPixel = (x2 - x1) / graphAreaWidth;
		let start = getXIndex(useSaved ? this.data.saved.x : this.data.x, x1 - datePerPixel * this.settings.PADD[3]);
		let end = getXIndex(useSaved ? this.data.saved.x : this.data.x, x2 + datePerPixel * this.settings.PADD[1]);
		const yMinStep = this.data.yMinStep || 1;
		const resMin = [];
		const resMax = [];
		const settings = this.settings;
		const state = this.state;
		let prevRange;
		let yFirst;
		let yLast;
		if (!useSaved && this.state.zoomMode) {
			start = Math.max(start, this.state.detailInd1);
			end = Math.min(end, this.state.detailInd2);
		} else {
			start = Math.max(start, 0);
			end = Math.min(end, this.data.x.length - 1);
		}
		const floorStart = Math.floor(start);
		const ceilStart = Math.ceil(start);
		const floorEnd = Math.floor(end);
		const ceilEnd = Math.ceil(end);
		const proceedMinMax = (yMin, yMax, ind, refRange) => {
			let range;
			if (yMin === Number.MAX_VALUE) {
				if (isMini) {
					if (ind === void 0) {
						yMin = state.y1m;
						yMax = state.y2m;
					} else {
						yMin = state[`y1m_${ind}`];
						yMax = state[`y2m_${ind}`];
					}
				} else if (ind === void 0) {
					yMin = state.y1;
					yMax = state.y2;
				} else {
					yMin = state[`y1_${ind}`];
					yMax = state[`y2_${ind}`];
				}
			} else {
				if (this.graphStyle === "bar") yMin = 0;
				yMin = Math.floor(yMin);
				yMax = Math.ceil(yMax);
				if (fitTo) {
					range = roundRange(yMin, yMax, settings.Y_AXIS_RANGE, refRange);
					yMin = range.yMin;
					yMax = range.yMax;
					if (Math.abs(yMin - yMax) < settings.Y_AXIS_RANGE * yMinStep) yMax = yMin + Math.floor(settings.Y_AXIS_RANGE * yMinStep);
				}
			}
			if (Math.abs(yMin - yMax) < .1) yMax++;
			return {
				min: yMin,
				max: yMax,
				range
			};
		};
		if (this.graphStyle === "line" || this.graphStyle === "step") this.data.ys.forEach((item, ind) => {
			const y = useSaved ? this.data.saved.y[ind] : item.y;
			const startIndex = this.graphStyle === "step" ? floorStart : ceilStart;
			const endIndex = this.graphStyle === "step" ? ceilEnd : floorEnd;
			if (state[`e_${ind}`] || ind === 0 && this.pairY) {
				let v;
				for (let i = startIndex; i <= endIndex; i++) {
					v = y[i];
					if (v === void 0) continue;
					if (v < yMin) yMin = v;
					if (v > yMax) yMax = v;
				}
				if (this.graphStyle === "line") {
					if (y[floorStart] !== void 0 && y[ceilStart] !== void 0) {
						yFirst = y[floorStart] + (start - floorStart) * (y[ceilStart] - y[floorStart]);
						if (yFirst < yMin) yMin = yFirst;
						if (yFirst > yMax) yMax = yFirst;
					}
					if (y[floorEnd] !== void 0 && y[ceilEnd] !== void 0) {
						yLast = y[floorEnd] + (end - floorEnd) * (y[ceilEnd] - y[floorEnd]);
						if (yLast < yMin) yMin = yLast;
						if (yLast > yMax) yMax = yLast;
					}
				}
			}
			if (this.pairY) {
				const tunedY = proceedMinMax(yMin, yMax, ind, prevRange);
				resMin[ind] = tunedY.min;
				resMax[ind] = tunedY.max;
				yMin = Number.MAX_VALUE;
				yMax = -Number.MAX_VALUE;
			}
		});
		if (this.graphStyle === "bar") {
			const visibleCols = [];
			for (let j = 0; j < this.data.ys.length; j++) if (state[`e_${j}`]) visibleCols.push(j);
			const colsLen = visibleCols.length;
			for (let i = floorStart; i <= ceilEnd; i++) {
				let yCur = 0;
				for (let j = 0; j < colsLen; j++) yCur += (useSaved ? this.data.saved.y[visibleCols[j]][i] : this.data.ys[visibleCols[j]].y[i]) || 0;
				if (yCur > yMax) yMax = yCur;
			}
			yMin = 0;
		}
		if (this.pairY) {
			if (isNaN(resMin[0])) resMin[0] = resMin[1];
			if (isNaN(resMin[1])) resMin[1] = resMin[0];
			if (isNaN(resMax[0])) resMax[0] = resMax[1];
			if (isNaN(resMax[1])) resMax[1] = resMax[0];
			return {
				min: resMin,
				max: resMax
			};
		} else {
			const tunedY = proceedMinMax(yMin, yMax);
			return {
				min: tunedY.min,
				max: tunedY.max
			};
		}
	}
	setDarkMode(enabled, colors) {
		this.settings.darkMode = enabled;
		if (colors) this.settings.COLORS = colors;
		this.graph.setDarkMode(enabled);
		this.axisY.setDarkMode(enabled);
		this.fade.setDarkMode(enabled);
		this.axisX.setDarkMode(enabled);
		this.mini.setDarkMode(enabled);
		this.handle.setDarkMode(enabled);
		this.tip.setDarkMode(enabled);
		this.switchers.setDarkMode(enabled);
		this.composer.setDarkMode(enabled);
	}
	getGraphWidth(hasLegend) {
		const rectEl = this.$el.getBoundingClientRect();
		if (hasLegend) {
			const rectLegend = this.$switchers.getBoundingClientRect();
			if (rectEl.width - rectLegend.width >= 500) return {
				hasSpaceForLegend: true,
				width: Math.max(rectEl.width - rectLegend.width, 1)
			};
			else return {
				hasSpaceForLegend: false,
				width: rectEl.width
			};
		} else return { width: rectEl.width };
	}
	createDOM(container) {
		const settings = this.settings;
		this.$el = document.createElement("div");
		this.$el.className = "tchart";
		if (!this.data.subchart.show) this.$el.classList.add("tchart__no-subchart");
		if (this.data.slave) this.$el.classList.add("tchart__slave");
		this.$h1 = document.createElement("h1");
		this.$h1.className = "tchart--header";
		this.$h1.textContent = this.data.caption;
		this.$el.appendChild(this.$h1);
		this.$zoom = document.createElement("div");
		this.$zoom.className = "tchart--zoom";
		this.$el.appendChild(this.$zoom);
		const $zoomIcon = document.createElement("div");
		$zoomIcon.className = "tchart--zoom-icon";
		this.$zoom.appendChild($zoomIcon);
		const $zoomText = document.createElement("span");
		$zoomText.textContent = this.settings.ZOOM_TEXT;
		this.$zoom.appendChild($zoomText);
		this.$zoom.addEventListener("click", () => {
			this.toggleZoom(false);
		});
		this.$graph = document.createElement("div");
		this.$graph.className = "tchart--graph";
		this.$el.appendChild(this.$graph);
		this.$switchers = document.createElement("div");
		this.$switchers.className = "tchart--switchers";
		this.data.sideLegend && this.$switchers.classList.add("tchart--switchers__side-legend");
		this.$el.appendChild(this.$switchers);
		container.appendChild(this.$el);
		const rangeGraph = this.getYMinMax(this.state.x1, this.state.x2, false, true);
		const rangeMini = this.getYMinMax(this.state.xg1, this.state.xg2, true);
		if (this.pairY) for (let i = 0; i < this.data.ys.length; i++) {
			this.state[`y1_${i}`] = rangeGraph.min[i];
			this.state[`y2_${i}`] = rangeGraph.max[i];
			this.state[`y1m_${i}`] = rangeMini.min[i];
			this.state[`y2m_${i}`] = rangeMini.max[i];
		}
		else {
			this.state["y1"] = rangeGraph.min;
			this.state["y2"] = rangeGraph.max;
			this.state["y1m"] = rangeMini.min;
			this.state["y2m"] = rangeMini.max;
		}
		this.composer = new TComposer({
			$parent: this.$graph,
			settings,
			chart: this,
			state: this.state,
			data: this.data,
			graphStyle: this.graphStyle
		});
		this.animator = new TAnimator({
			state: this.state,
			composer: this.composer
		});
		const graphStyle = {
			line: TLines,
			step: TLines,
			bar: TBars,
			area: TAreas
		};
		[
			[
				"graph",
				graphStyle[this.graphStyle],
				this.$graph
			],
			[
				"axisX",
				TAxisX,
				this.$graph
			],
			[
				"fade",
				TFade,
				this.$graph
			],
			[
				"axisY",
				TAxisY,
				this.$graph
			],
			[
				"tip",
				TTip,
				this.$graph,
				{ onClick: this.toggleZoom }
			],
			[
				"mini",
				graphStyle[this.graphStyle],
				this.$graph,
				{ mini: true }
			],
			[
				"handle",
				THandle,
				this.$graph,
				{ cb: this.onHandleMove }
			],
			[
				"switchers",
				TSwitchers,
				this.$switchers,
				{
					onClick: this.onSwitcherChange,
					onLongTap: this.onSwitcherChange,
					onEnter: this.onSwitcherEnter,
					onLeave: this.onSwitcherLeave
				}
			]
		].forEach((obj) => {
			const options = {
				animator: this.animator,
				$canvas: this.composer.$canvas,
				ctx: this.composer.ctx,
				graphStyle: this.graphStyle,
				chart: this,
				pairY: this.pairY,
				state: this.state,
				data: this.data,
				$parent: obj[2],
				settings,
				additional: obj[3] || {}
			};
			this[obj[0]] = new obj[1](options);
			this[obj[0]].id = obj[0];
		});
	}
	toggleSlave(enabled, zoomSpecialOrigin, details, speed) {
		const props = [];
		this.updateSpeed(speed);
		if (this.state.zoomModeSlave === enabled) return;
		this.state.zoomSpecialOrigin = zoomSpecialOrigin;
		if (enabled) {
			this.state.zoomModeSlave = true;
			this.switchers.switchers.forEach((div, ind) => {
				div.classList.add("tchart--switcher__visible");
				div.getElementsByTagName("span")[0].textContent = details.names[ind];
			});
			this.tip.labels.forEach((item, ind) => {
				item.$label.textContent = details.names[ind];
			});
			this.data.x = details.x;
			const e = [];
			for (let i = 0; i < details.y.length; i++) {
				this.data.ys[i].y = details.y[i];
				const isVisible = details.hidden.indexOf(this.data.ys[i].id) === -1;
				this.state[`e_${i}`] = isVisible;
				this.state[`o_${i}`] = isVisible ? 1 : 0;
				this.state[`om_${i}`] = isVisible ? 1 : 0;
				e[i] = isVisible;
			}
			this.switchers.render(e);
			const x1 = this.data.x[0];
			const x2 = this.data.x[this.data.x.length - 1];
			this.data.dates = [];
			this.data.datesShort = [];
			this.data.datesRange = [];
			const xTooltipFormatter = getFormatter("xTooltipFormatter", this.data, 1);
			const xTickFormatter = getFormatter("xTickFormatter", this.data, 1);
			const xRangeFormatter = getFormatter("xRangeFormatter", this.data, 1);
			let maxXTickLength = 0;
			for (let i = 0; i < this.data.x.length; i++) {
				this.data.dates[i] = xTooltipFormatter(this.data.x[i], true);
				this.data.datesShort[i] = xTickFormatter(this.data.x[i], true);
				this.data.datesRange[i] = xRangeFormatter(this.data.x[i], true);
				if (this.data.datesShort[i].length > maxXTickLength) maxXTickLength = this.data.datesShort[i].length;
			}
			this.data.maxXTickLength = maxXTickLength;
			this.data.subchart = details.subchart;
			this.data.hidden = details.hidden;
			const defaultZoom = this.getDefaultZoom({
				x1,
				x2,
				xg1: x1,
				xg2: x2,
				default: this.data.subchart.defaultZoom
			});
			this.state.x1 = defaultZoom.x1;
			this.state.x2 = defaultZoom.x2;
			this.state["xCount"] = this.data.x.length;
			this.state["xg1"] = x1;
			this.state["xg2"] = x2;
			this.state["xg1Ind"] = 0;
			this.state["xg2Ind"] = this.data.x.length - 1;
			this.state["xMainMin"] = x1;
			this.state["xMainMax"] = x2;
			this.state["xgMin"] = x1;
			this.state["xgMax"] = x2;
			const reducedRange = this.reduceGlobalRange({});
			if (reducedRange.isReduced) {
				this.state.x1 = reducedRange.x1;
				this.state.x2 = reducedRange.x2;
				this.state.xg1 = reducedRange.xg1;
				this.state.xg2 = reducedRange.xg2;
				this.state.xg1Ind = reducedRange.xg1Ind;
				this.state.xg2Ind = reducedRange.xg2Ind;
			}
			const rangeGraph = this.getYMinMax(this.state.x1, this.state.x2, false, true);
			const rangeMini = this.getYMinMax(x1, x2, true);
			this.state["y1"] = rangeGraph.min;
			this.state["y2"] = rangeGraph.max;
			this.state["y1m"] = rangeMini.min;
			this.state["y2m"] = rangeMini.max;
		} else this.switchers.switchers.forEach((div) => {
			div.classList.remove("tchart--switcher__visible");
		});
		const durationY = 450;
		setTimeout(() => {
			if (!enabled) this.state.zoomModeSlave = false;
		}, 470);
		this.state.slaveVisibility = enabled ? 0 : 1;
		props.push({
			prop: "slaveVisibility",
			state: this.state,
			end: enabled ? 1 : 0,
			duration: durationY,
			group: {
				top: true,
				bottom: true
			}
		});
		this.animator.add(props);
	}
	toggleZoomSpecial(enabled, dt, details) {
		var props = [];
		if (this.state.zoomModeSpecial === enabled) return;
		var speed = this.updateSpeed();
		if (enabled) {
			var scale = (this.state.x2 - this.state.x1) / (this.state.dims.graph.w - this.settings.PADD[3] - this.settings.PADD[1]);
			var lPaddInDt = this.settings.PADD[3] * scale;
			var rPaddInDt = this.settings.PADD[1] * scale;
			this.state.zoomSpecialOrigin = (dt - this.state.x1 + lPaddInDt) / (this.state.x2 - this.state.x1 + lPaddInDt + rPaddInDt);
			this.state.zoomModeSpecial = true;
			this.$h1.classList.add("tchart--header__hidden");
			this.$zoom.classList.add("tchart--zoom__visible");
			this.switchers.switchers.forEach((div) => {
				div.classList.remove("tchart--switcher__visible");
			});
			this.slaveChart.toggleSlave(true, this.state.zoomSpecialOrigin, details, speed);
		} else {
			this.$h1.classList.remove("tchart--header__hidden");
			this.$zoom.classList.remove("tchart--zoom__visible");
			this.switchers.switchers.forEach((div) => {
				div.classList.add("tchart--switcher__visible");
			});
			this.slaveChart.toggleSlave(false, this.state.zoomSpecialOrigin, null, speed);
		}
		var durationY = 450;
		document.body.style.pointerEvents = "none";
		setTimeout(() => {
			if (!enabled) this.state.zoomModeSpecial = false;
			document.body.style.pointerEvents = "";
		}, durationY + 20);
		this.state.masterVisibility = enabled ? 1 : 0;
		props.push({
			prop: "masterVisibility",
			state: this.state,
			end: enabled ? 0 : 1,
			duration: durationY,
			group: {
				top: true,
				bottom: true
			}
		});
		this.animator.add(props);
	}
	insertDetails(xg1, xg2, details) {
		const startMain = Math.ceil(getXIndex(this.data.x, xg1));
		let endMain = Math.ceil(getXIndex(this.data.x, xg2));
		const startDetail = 0;
		const endDetail = details.x.length - 1;
		if (xg2 > this.data.x[endMain]) endMain++;
		const xl1 = 0;
		const xl2 = startMain;
		const xr1 = endMain - (this.graphStyle === "bar" || this.graphStyle === "step" ? 1 : 0);
		const xr2 = this.data.x.length - 1;
		const newX = [];
		const newDates = [];
		const newDatesShort = [];
		const newDatesRange = [];
		let newInd, y, yFrom, origY, origYDet;
		const newY = [];
		const newYFrom = [];
		for (let i = xl1; i < xl2; i++) {
			newInd = i - xl1;
			newX[newInd] = this.data.x[i];
			newDates[newInd] = this.data.dates[i];
			newDatesShort[newInd] = this.data.datesShort[i];
			newDatesRange[newInd] = this.data.datesRange[i];
		}
		for (let j = 0; j < this.data.ys.length; j++) {
			newY[j] = newY[j] || [];
			y = newY[j];
			origY = this.data.ys[j].y;
			for (let i = xl1; i < xl2; i++) y[i - xl1] = origY[i];
		}
		const ndx = [];
		const fdx = [];
		const cdx = [];
		const xTooltipFormatter = getFormatter("xTooltipFormatter", this.data, 1);
		const xTickFormatter = getFormatter("xTickFormatter", this.data, 1);
		const xRangeFormatter = getFormatter("xRangeFormatter", this.data, 1);
		let maxXTickLength = 0;
		for (let i = startDetail; i <= endDetail; i++) {
			newInd = i - startDetail + xl2;
			newX[newInd] = details.x[i];
			newDates[newInd] = xTooltipFormatter(newX[newInd], true);
			newDatesShort[newInd] = xTickFormatter(newX[newInd], true);
			newDatesRange[newInd] = xRangeFormatter(newX[newInd], true);
			if (newDatesShort[newInd].length > maxXTickLength) maxXTickLength = newDatesShort[newInd].length;
			const dx = getXIndex(this.data.x, newX[newInd]);
			ndx[i] = dx;
			fdx[i] = Math.floor(dx);
			cdx[i] = Math.ceil(dx);
		}
		this.data.details.maxXTickLength = maxXTickLength;
		for (let j = 0; j < this.data.ys.length; j++) {
			newY[j] = newY[j] || [];
			y = newY[j];
			origY = this.data.ys[j].y;
			origYDet = details.y[j];
			newYFrom[j] = newYFrom[j] || [];
			yFrom = newYFrom[j];
			for (let i = startDetail; i <= endDetail; i++) {
				let yInter;
				if (this.graphStyle === "bar") yInter = origY[fdx[i]] || 0;
				else if (this.graphStyle === "step") yInter = origY[fdx[i]];
				else yInter = origY[fdx[i]] + (ndx[i] - fdx[i]) * (origY[cdx[i]] - origY[fdx[i]]);
				const yDet = origYDet[i];
				if (this.graphStyle !== "bar") {
					if (isNaN(yInter) && !isNaN(yDet)) yInter = 0;
				}
				y[i - startDetail + xl2] = yDet;
				yFrom[i - startDetail + xl2] = yInter;
			}
		}
		for (let i = xr1 + 1; i <= xr2; i++) {
			newInd = i - xr1 + endDetail + xl2;
			newX[newInd] = this.data.x[i];
			newDates[newInd] = this.data.dates[i];
			newDatesShort[newInd] = this.data.datesShort[i];
			newDatesRange[newInd] = this.data.datesRange[i];
		}
		for (let j = 0; j < this.data.ys.length; j++) {
			newY[j] = newY[j] || [];
			y = newY[j];
			origY = this.data.ys[j].y;
			for (let i = xr1 + 1; i <= xr2; i++) y[i - xr1 + endDetail + xl2] = origY[i];
		}
		this.state.detailInd1 = xl2;
		this.state.detailInd2 = xl2 + endDetail - startDetail;
		this.data.x = newX;
		this.data.dates = newDates;
		this.data.datesShort = newDatesShort;
		this.data.datesRange = newDatesRange;
		for (let j = 0; j < this.data.ys.length; j++) {
			this.data.ys[j].y = newY[j];
			this.data.ys[j].yFrom = newYFrom[j];
		}
	}
	revertDetails() {
		this.data.x = this.data.saved.x;
		this.data.dates = this.data.saved.dates;
		this.data.datesShort = this.data.saved.datesShort;
		this.data.datesRange = this.data.saved.datesRange;
		for (let i = 0; i < this.data.ys.length; ++i) this.data.ys[i].y = this.data.saved.y[i];
	}
};
//#endregion
export { TChart as default };
