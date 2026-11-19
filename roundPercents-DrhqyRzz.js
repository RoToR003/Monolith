//# allFunctionsCalledOnLoad
import { A as mergeProps, p as createComponent } from "./solid-9Vxm0VIz.js";
import { Zt as MediaTsx } from "./appDialogsManager-CXguiKc3.js";
import { n as wrapVideo } from "./video-ByfiTxvV.js";
//#region src/components/wrappers/videoTsx.tsx
function VideoTsx(props) {
	return createComponent(MediaTsx, mergeProps(props, {
		itemKey: "doc",
		loader: wrapVideo
	}));
}
//#endregion
//#region src/components/chat/bubbleParts/pollMessageContent/roundPercents.ts
function roundPercents(percents) {
	const base = percents.map(Math.floor);
	const remainders = percents.map((p, i) => ({
		index: i,
		remainder: p - base[i]
	}));
	const diff = 100 - base.reduce((a, b) => a + b, 0);
	remainders.sort((a, b) => {
		if (a.remainder === b.remainder) return base[b.index] - base[a.index];
		return b.remainder - a.remainder;
	});
	const mxI = Math.min(diff, remainders.length);
	for (let i = 0; i < mxI; i++) base[remainders[i].index]++;
	return base;
}
var getRoundedPercentsFromResults = (pollResults) => {
	const results = pollResults?.results;
	if (!results) return [];
	const totalVotes = results.reduce((acc, r) => acc + (r.voters ?? 0), 0);
	if (!totalVotes) return new Array(results.length).fill(0);
	return roundPercents(results.map((r) => totalVotes ? (r.voters ?? 0) / totalVotes * 100 : 0));
};
//#endregion
export { VideoTsx as n, getRoundedPercentsFromResults as t };
