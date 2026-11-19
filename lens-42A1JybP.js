//# allFunctionsCalledOnLoad
import { i as gemHull, r as gemAssets } from "./geometry-BSiIZt3R.js";
//#region src/components/wallet/visual/gem/lens.ts
var GemLensSource = class {
	constructor(gem) {
		this.gem = gem;
		this.outline = gemAssets().outline;
		this.on = false;
		this.dirty = false;
	}
	/** What it shows was drawn anew: it goes to the gem with the next update */
	changed() {
		this.dirty = true;
	}
	/**
	* Every frame: `source` seen through the gem that stands at `center` of it, `width` points wide, as much as
	* `strength` (0…1) says. Without a source, or with no strength, the gem shows nothing through it.
	*/
	update(source, center, width, strength, opacity) {
		const gem = this.gem;
		if (!source || strength <= .002) {
			if (this.on) {
				gem.setLens(null);
				this.on = false;
			}
			return;
		}
		if (this.dirty) {
			this.dirty = false;
			gem.setText(source);
		}
		const pose = gem.pose;
		const hull = gemHull(this.outline, pose.yaw, pose.pitch, width / 2 * .96).map((p) => [center[0] + p[0], center[1] + p[1]]);
		gem.setLens({
			hull,
			center,
			strength: Math.min(1, strength),
			spin: pose.yaw,
			textScale: 1,
			textShift: 0,
			opacity
		});
		this.on = true;
	}
};
//#endregion
export { GemLensSource as t };
