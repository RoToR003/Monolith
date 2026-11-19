//# allFunctionsCalledOnLoad
import { a as i18n } from "./langPack-BmdJGr44.js";
import { t as bytesToHex } from "./bytesToHex-BQHuRHPP.js";
import { i as canonicalTonAddress } from "./transferMessages-BVUO3_q3.js";
import { t as WalletVault } from "./vault-Cq0wL05g.js";
import { a as isRecordSigningFor } from "./rotation-CL3-t-0h.js";
//#region src/lib/wallet/logoutLoss.ts
/**
* `current` is the device's key, `parked` the others; only records whose secret is still on the device. The status
* is the server's word on the account's wallet, if it is known.
*/
function getWalletLoss(current, parked, status) {
	const loss = {
		unbacked: 0,
		parked: 0,
		rotating: 0,
		unknown: false
	};
	const state = status?.presence === "ready" ? status.state : void 0;
	const servedAddress = state ? canonicalTonAddress(state.address) : "";
	const known = !!servedAddress;
	const servedKey = known ? bytesToHex(state.public_key) : "";
	const backed = known && !!state.pFlags.backup_enabled;
	const seen = /* @__PURE__ */ new Set();
	for (const record of [current, ...parked]) {
		if (!record || seen.has(record.recordId)) continue;
		seen.add(record.recordId);
		if (record.pendingRotation) ++loss.rotating;
		const sameWallet = known && canonicalTonAddress(record.address) === servedAddress;
		const active = known ? sameWallet && isRecordSigningFor(record, servedKey) : record === current;
		const obsolete = sameWallet && !active && !!record.signingKey;
		if (known ? !sameWallet : !active) ++loss.parked;
		else if (!known) loss.unknown = true;
		else if (!obsolete && (!backed || record.rotatedSinceBackup)) ++loss.unbacked;
	}
	return loss;
}
/** The paragraphs that say it, in tdesktop's order; none when nothing is lost */
function getWalletLossWarnings(loss) {
	const out = [];
	if (loss.unbacked) out.push(["Wallet.Logout.Local", [loss.unbacked]]);
	if (loss.parked) out.push(["Wallet.Logout.Parked", [loss.parked]]);
	if (loss.rotating) out.push(["Wallet.Logout.Rotating", [loss.rotating]]);
	if (loss.unknown) out.push(["Wallet.Logout.Unknown"]);
	return out;
}
/**
* Reads what the vault of `userId` holds. A vault that cannot be read may hold keys all the same: then the loss is
* unknown. `getStatus` is asked only when there is something to lose.
*/
async function readWalletLoss(userId, getStatus, options = {}) {
	const vault = new WalletVault(userId);
	let current, parked;
	try {
		const [stored, storedParked] = await Promise.all([vault.getCustody(), vault.getParkedCustody()]);
		const withSecret = async (record) => {
			if (!record || !await vault.hasSecret(record.secretRef)) return;
			if (record.pendingRotation && !await vault.hasSecret(record.pendingRotation.secretRef)) return {
				...record,
				pendingRotation: void 0
			};
			return record;
		};
		current = await withSecret(stored);
		parked = options.currentOnly ? [] : (await Promise.all(storedParked.map(withSecret))).filter(Boolean);
	} catch (err) {
		return {
			unbacked: 0,
			parked: 0,
			rotating: 0,
			unknown: true
		};
	}
	if (!current && !parked.length) return getWalletLoss(void 0, []);
	const status = await getStatus().catch(() => void 0);
	return getWalletLoss(current, parked, status);
}
/**
* A question's text with what it would destroy of the wallet keys after it, as the logout confirmation says it;
* nothing when nothing is lost
*/
function describeWalletLoss(base, loss) {
	const warnings = getWalletLossWarnings(loss);
	if (!warnings.length) return;
	const description = document.createDocumentFragment();
	description.append(i18n(base));
	warnings.forEach(([key, args]) => description.append("\n\n", i18n(key, args)));
	return description;
}
//#endregion
export { describeWalletLoss, readWalletLoss };
