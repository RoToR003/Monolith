//# allFunctionsCalledOnLoad
import { t as noop } from "./noop-H9NNBLfX.js";
import { t as apiManagerProxy } from "./apiManagerProxy-DmQXvxSF.js";
import { n as rootScope } from "./rootScope-CZS0lmz8.js";
import { C as createSignal, M as onCleanup, _ as createMemo, d as batch } from "./solid-9Vxm0VIz.js";
import { n as getAppWindow } from "./appWindow-bo-KtJhy.js";
import { n as bindManagersToSession } from "./bindManagersToAccount-BL82O9H9.js";
import { $t as absNanos, Xt as readWalletCurrency, Zt as writeWalletCurrency, en as compareNanos } from "./confirmationPopup-Bz6mK0o-.js";
import { a as getGramTransferFailure, o as getUnknownTransferVerdict } from "./transferMessages-BVUO3_q3.js";
import { n as WalletStream, r as normalizeWalletHash, s as waitWalletSendSettled } from "./stream-DZrVqY75.js";
import { n as WalletSession } from "./walletSession-BmKSk61G.js";
import { a as isWalletPendingExpired, s as mergeWalletPending } from "./historyCache-BoU1aOw_.js";
//#region src/components/wallet/store.ts
var POLL_INTERVAL = 5e3;
var HISTORY_REFRESH_INTERVAL = 3e4;
var HISTORY_PAGE = 50;
/** a page of nothing but hidden dust is skipped, but not forever */
var MAX_HIDDEN_PAGES = 20;
/** a transfer read off the stream that the server never lists goes after this */
var STREAM_ROW_LIFETIME = 12e4;
/** how often the chain is asked about a transfer whose outcome is unknown */
var JOURNAL_CHECK_INTERVAL = 15e3;
/** after a failed page of collectibles, the next try waits this long: a scroll asks for one on every frame */
var NFTS_RETRY_DELAY = 3e3;
/** a collectible's transfer reaches the server's list of the wallet's collectibles a moment after its history */
var NFTS_REFRESH_DELAY = 2e3;
function createWalletStore() {
	const session = WalletSession.get();
	const managers = bindManagersToSession(rootScope.managers);
	const [status, setStatus] = createSignal({
		presence: "unknown",
		date: 0
	});
	const [deviceMode, setDeviceMode] = createSignal("unknown");
	const [parked, setParked] = createSignal({ wallets: [] });
	const [rates, setRates] = createSignal();
	const [currency, _setCurrency] = createSignal(readWalletCurrency());
	const [config, setConfig] = createSignal({
		minNanos: "100000000",
		gaslessMinNanos: "100000000",
		gaslessDaily: 5,
		explorerUrl: "https://tonviewer.com",
		usdPerGram: 0
	});
	const [friendlyAddress, setFriendlyAddress] = createSignal();
	const [transactions, setTransactions] = createSignal([]);
	const [pending, setPending] = createSignal([]);
	const [historyLoading, setHistoryLoading] = createSignal(false);
	const [historyEnded, setHistoryEnded] = createSignal(false);
	const [historyError, setHistoryError] = createSignal();
	const [historyLoaded, setHistoryLoaded] = createSignal(false);
	const [streamRows, setStreamRows] = createSignal([]);
	let offset = "";
	let historyDate = 0;
	let disposed = false;
	let historyAddress;
	let walletEpoch = 0;
	let historyRevision = 0;
	const setCurrency = (code) => {
		_setCurrency(code);
		writeWalletCurrency(code);
	};
	const fiatPerGram = createMemo(() => {
		return rates()?.rates[currency()] || 0;
	});
	const isHidden = (transaction) => {
		if (transaction.pFlags.key_change || transaction.nft) return false;
		return compareNanos(absNanos(transaction.amount), config().minNanos) < 0;
	};
	const visibleTransactions = createMemo(() => transactions().filter((transaction) => !isHidden(transaction)));
	const hiddenCount = createMemo(() => transactions().length - visibleTransactions().length);
	const listedHashes = () => new Set(transactions().map((transaction) => normalizeWalletHash(transaction.tx_hash)));
	const shownTransactions = createMemo(() => {
		const list = visibleTransactions(), rows = streamRows();
		if (!rows.length) return list;
		const listed = listedHashes();
		const extra = rows.filter((row) => !listed.has(row.hash) && !isHidden(row.transaction)).map((row) => row.transaction);
		return extra.length ? [...extra, ...list].sort((a, b) => b.date - a.date) : list;
	});
	let wrappers = /* @__PURE__ */ new Map();
	const pendingById = createMemo(() => new Map(pending().map((transfer) => [transfer.id, transfer])));
	const items = createMemo(() => {
		const next = /* @__PURE__ */ new Map();
		const wrap = (item) => {
			const cached = wrappers.get(item.key);
			const value = cached && cached.transaction === item.transaction && cached.pending === item.pending ? cached : item;
			next.set(item.key, value);
			return value;
		};
		const out = pending().map((transfer) => {
			const key = "pending_" + transfer.id;
			const cached = wrappers.get(key);
			const value = cached?.pending ? cached : {
				key,
				get pending() {
					return pendingById().get(transfer.id) || transfer;
				}
			};
			next.set(key, value);
			return value;
		});
		for (const transaction of shownTransactions()) out.push(wrap({
			key: transaction.id,
			transaction
		}));
		wrappers = next;
		return out;
	});
	const applyStatus = async (value) => {
		if (!value?.presence) return;
		const previous = status();
		setStatus(value);
		const state = value.state;
		if (!state) {
			setDeviceMode("unknown");
			return;
		}
		if (historyAddress && historyAddress !== state.address) {
			++walletEpoch;
			batch(() => {
				setTransactions([]);
				setPending([]);
				setHistoryEnded(false);
				setHistoryLoaded(false);
				setHistoryLoading(false);
				setHistoryError(void 0);
				setNfts([]);
				setNftsEnded(false);
				setNftsLoading(false);
				setNftsError(false);
				setNftsHidden(/* @__PURE__ */ new Set());
				setStreamRows([]);
			});
			offset = "";
			nftsOffset = "";
			removedPending.clear();
		}
		historyAddress = state.address;
		startStream(state.address);
		session.getDeviceMode(value).then(setDeviceMode, () => setDeviceMode("unknown"));
		refreshParked(previous.state?.address !== state.address).catch(() => {});
		session.friendlyAddress(state.address).then(setFriendlyAddress, () => setFriendlyAddress(state.address));
		if (!listsRestore) {
			listsRestore = restoreLists(state.address);
			return;
		} else if (!listsRestored) return;
		const loaded = historyLoaded();
		loadLists();
		if (loaded && previous.state && previous.state.balance !== state.balance) refreshHead();
	};
	const loadLists = () => {
		if ((!nftItems().length || nftsError()) && !nftsEnded()) loadMoreNfts();
		if (!historyLoaded()) loadMore();
	};
	let listsRestore, listsRestored = false;
	/**
	* What the manager kept of the wallet's lists and "Sending" rows (lib/wallet/historyCache.ts) shows at once; then
	* the server is asked, as for a window that starts empty
	*/
	const restoreLists = async (address) => {
		const epoch = walletEpoch;
		const cache = await managers.appWalletManager.getHistoryCache(address).catch(() => void 0);
		listsRestored = true;
		if (disposed) return;
		if (!cache || epoch !== walletEpoch) {
			loadLists();
			return;
		}
		const history = cache.history && !historyLoaded() && cache.history;
		const nfts = cache.nfts && !nftItems().length && cache.nfts;
		batch(() => {
			if (history) {
				mergeTransactions(history.items, true);
				offset = history.nextOffset;
				setHistoryEnded(history.ended);
				setHistoryLoaded(true);
			}
			if (nfts) applyNftsPage(nfts.items, nfts.nextOffset, "");
			adoptPending(cache.pending);
		});
		loadLists();
		if (history) refreshHead();
		if (nfts) loadNfts(true);
		if (history && !historyEnded() && !visibleTransactions().length) loadMore();
		if (pending().length) checkPending();
	};
	const refreshStatus = (force) => {
		return managers.appWalletManager.getStatus(force).then((value) => {
			if (!disposed) applyStatus(value);
			return value;
		});
	};
	const refreshDeviceMode = () => {
		return session.getDeviceMode(status()).then((mode) => {
			setDeviceMode(mode);
			return mode;
		});
	};
	/**
	* Keys of other wallets this device still holds (tdesktop's conflict), with what those wallets hold
	*/
	function refreshParked(refresh) {
		return session.getParkedState(status(), refresh).then((value) => {
			if (!disposed) setParked(value);
			return value;
		});
	}
	const sameTransaction = (a, b) => {
		return a.amount === b.amount && a.fee === b.fee && a.date === b.date && a.tx_hash === b.tx_hash && a.comment === b.comment && !!a.pFlags.failed === !!b.pFlags.failed && !!a.pFlags.gasless === !!b.pFlags.gasless && a.peer._ === b.peer._;
	};
	const mergeTransactions = (incoming, _append) => {
		const current = transactions();
		const byId = new Map(current.map((transaction) => [transaction.id, transaction]));
		let changed = false, nftMoved = false;
		for (const transaction of incoming) {
			const existing = byId.get(transaction.id);
			if (existing && sameTransaction(existing, transaction)) continue;
			byId.set(transaction.id, transaction);
			changed = true;
			nftMoved || (nftMoved = !existing && !!transaction.nft);
		}
		if (nftMoved && !_append && historyLoaded()) scheduleNftsRefresh();
		if (!changed) return;
		setHistory([...byId.values()].sort((a, b) => b.date - a.date));
	};
	const setHistory = (list) => {
		batch(() => {
			setTransactions(list);
			if (streamRows().length) {
				const listed = new Set(list.map((transaction) => normalizeWalletHash(transaction.tx_hash)));
				setStreamRows((rows) => {
					const kept = rows.filter((row) => !listed.has(row.hash));
					return kept.length === rows.length ? rows : kept;
				});
			}
		});
	};
	async function loadMore() {
		if (historyLoading() || historyEnded() || status().presence !== "ready") return;
		const epoch = walletEpoch, revision = historyRevision;
		const current = () => !disposed && epoch === walletEpoch && revision === historyRevision;
		setHistoryLoading(true);
		setHistoryError(void 0);
		try {
			let hiddenPages = 0;
			for (;;) {
				const result = await managers.appWalletManager.getTransactions(offset, HISTORY_PAGE);
				if (!current()) return;
				historyDate = Date.now();
				mergeTransactions(result.transactions, true);
				const next = result.next_offset;
				const ended = !next || next === offset || !result.transactions.length;
				offset = next || offset;
				if (ended) {
					setHistoryEnded(true);
					break;
				}
				if (result.transactions.some((transaction) => !isHidden(transaction)) || ++hiddenPages >= MAX_HIDDEN_PAGES) break;
			}
		} catch (err) {
			if (current()) setHistoryError(err.type || "ERROR");
		} finally {
			if (epoch === walletEpoch) {
				setHistoryLoaded(true);
				setHistoryLoading(false);
			}
		}
	}
	async function refreshHead() {
		if (status().presence !== "ready") return;
		const epoch = walletEpoch;
		try {
			const result = await managers.appWalletManager.getTransactions("", HISTORY_PAGE);
			if (disposed || epoch !== walletEpoch) return;
			historyDate = Date.now();
			const known = new Set(transactions().map((transaction) => transaction.id));
			if (known.size && result.transactions.length && !result.transactions.some((transaction) => known.has(transaction.id))) {
				++historyRevision;
				offset = result.next_offset || "";
				batch(() => {
					setHistory(result.transactions.slice().sort((a, b) => b.date - a.date));
					setHistoryEnded(!result.next_offset);
					setHistoryLoaded(true);
				});
				return;
			}
			mergeTransactions(result.transactions, false);
			if (!historyLoaded()) {
				offset = result.next_offset || "";
				setHistoryEnded(!result.next_offset);
				setHistoryLoaded(true);
			}
		} catch (err) {}
	}
	const [nftItems, setNfts] = createSignal([]);
	const [nftsLoading, setNftsLoading] = createSignal(false);
	const [nftsEnded, setNftsEnded] = createSignal(false);
	const [nftsError, setNftsError] = createSignal(false);
	const [nftsHidden, setNftsHidden] = createSignal(/* @__PURE__ */ new Set());
	const nfts = createMemo(() => {
		const hidden = nftsHidden();
		return hidden.size ? nftItems().filter((item) => !hidden.has(item.address)) : nftItems();
	});
	let nftsOffset = "";
	let nftsEpoch = 0;
	let nftsFailedAt = 0;
	let nftsRefreshTimer;
	let nftsRefreshing;
	const sameNft = (a, b) => {
		const url = (item, key) => item[key]?.url;
		return a.name === b.name && a.description === b.description && a.collection_address === b.collection_address && a.extra?.data === b.extra?.data && url(a, "image") === url(b, "image") && url(a, "image_small") === url(b, "image_small") && url(a, "lottie") === url(b, "lottie") && a.attributes?.length === b.attributes?.length;
	};
	const applyNftsPage = (items, next, from) => {
		const known = new Map(nftItems().map((item) => [item.address, item]));
		const page = /* @__PURE__ */ new Map();
		for (const item of items) {
			const old = known.get(item.address);
			page.set(item.address, old && sameNft(old, item) ? old : item);
		}
		const list = from ? [...nftItems(), ...[...page.values()].filter((item) => !known.has(item.address))] : [...page.values()];
		const ended = !next || next === from || !items.length;
		nftsOffset = next || from;
		batch(() => {
			setNfts(list);
			setNftsEnded(ended);
			setNftsError(false);
			if (ended && nftsHidden().size) {
				const listed = new Set(list.map((item) => item.address));
				setNftsHidden((hidden) => new Set([...hidden].filter((address) => listed.has(address))));
			}
		});
	};
	/**
	* A page of the list, from where the last one ended or (`refresh`) from the start: a refresh replaces the
	* list with its first page, as iOS does, so a collectible that came or went shows; it runs quietly, and a
	* page asked for meanwhile waits for it. A failed load keeps the list and is tried again later — on scroll,
	* on the next poll — not more often than every few seconds.
	*/
	async function loadNfts(refresh) {
		if (status().presence !== "ready") return;
		const refreshing = nftsRefreshing === `${walletEpoch}:${nftsEpoch}`;
		if (!refresh && (refreshing || nftsLoading() || nftsEnded() || nftsError() && Date.now() - nftsFailedAt < NFTS_RETRY_DELAY)) return;
		const epoch = walletEpoch, listEpoch = refresh ? ++nftsEpoch : nftsEpoch;
		const current = () => !disposed && epoch === walletEpoch && listEpoch === nftsEpoch;
		const from = refresh ? "" : nftsOffset;
		if (refresh) {
			nftsRefreshing = `${epoch}:${listEpoch}`;
			setNftsLoading(false);
		} else setNftsLoading(true);
		try {
			const result = await managers.appWalletManager.getNfts(from);
			if (!current()) return;
			applyNftsPage(result.items, result.next_offset, from);
		} catch (err) {
			if (!current() || refresh) return;
			nftsFailedAt = Date.now();
			setNftsError(true);
		} finally {
			if (current()) {
				if (refresh) nftsRefreshing = void 0;
				else setNftsLoading(false);
			}
		}
	}
	const loadMoreNfts = () => loadNfts();
	const scheduleNftsRefresh = () => {
		clearTimeout(nftsRefreshTimer);
		nftsRefreshTimer = window.setTimeout(() => !disposed && loadNfts(true), NFTS_REFRESH_DELAY);
	};
	const hideNft = (address, hidden) => {
		setNftsHidden((set) => {
			if (set.has(address) === hidden) return set;
			const next = new Set(set);
			if (hidden) next.add(address);
			else next.delete(address);
			return next;
		});
	};
	const addPending = (transfer) => {
		setPending((list) => [transfer, ...list]);
		managers.appWalletManager.addPendingTransfer(historyAddress, transfer).catch(noop);
		setTimeout(() => checkPending(), sentTransactions.has(transfer.msgHash) ? 0 : 1e3);
	};
	const updatePending = (id, patch) => {
		const nft = patch.failed && pending().find((transfer) => transfer.id === id)?.nft;
		if (nft) hideNft(nft.address, false);
		setPending((list) => list.map((transfer) => transfer.id === id ? {
			...transfer,
			...patch
		} : transfer));
		managers.appWalletManager.updatePendingTransfer(historyAddress, id, patch).catch(noop);
	};
	const removedPending = /* @__PURE__ */ new Set();
	const removePending = (id) => {
		removedPending.add(id);
		setPending((list) => list.filter((transfer) => transfer.id !== id));
		managers.appWalletManager.removePendingTransfer(historyAddress, id).catch(noop);
	};
	/**
	* The manager's rows into this window's: the ones another window (a tab, an earlier window) added, and what any of
	* them learnt of a row since — its receipt, its failure. A collectible on its way leaves the grid, a failed one
	* comes back.
	*/
	const adoptPending = (remote) => {
		const current = pending();
		const next = mergeWalletPending(current, remote || [], removedPending);
		if (next === current) return;
		const before = new Map(current.map((transfer) => [transfer.id, transfer]));
		batch(() => {
			for (const transfer of next) {
				const previous = before.get(transfer.id);
				if (!transfer.nft) continue;
				if (!previous && !transfer.failed) hideNft(transfer.nft.address, true);
				else if (previous && !previous.failed && transfer.failed) hideNft(transfer.nft.address, false);
			}
			setPending(next);
		});
	};
	const syncPending = async (epoch) => {
		const remote = await managers.appWalletManager.getPendingTransfers(historyAddress).catch(() => void 0);
		if (remote && !disposed && epoch === walletEpoch) adoptPending(remote);
	};
	const settledTransfers = /* @__PURE__ */ new Map();
	/**
	* A sent transfer is shown as "Sending" until the server finds the transaction its message made. The receipt
	* is the external message hash, not the transaction hash, so only the server can match them.
	*/
	let checkingPending;
	const checkPending = () => {
		const promise = checkingPending = (checkingPending || Promise.resolve()).then(checkPendingOnce).finally(() => {
			if (checkingPending === promise) checkingPending = void 0;
		});
		return promise;
	};
	const checkPendingOnce = async () => {
		const epoch = walletEpoch;
		if (historyAddress) await syncPending(epoch);
		if (disposed || epoch !== walletEpoch) return;
		const now = Date.now();
		pending().filter((transfer) => isWalletPendingExpired(transfer, now)).forEach((transfer) => removePending(transfer.id));
		const transfers = pending().filter((transfer) => transfer.msgHash && !transfer.failed);
		for (const transfer of transfers) try {
			const sent = sentTransactions.get(transfer.msgHash);
			const result = sent ? { transactions: [sent] } : await managers.appWalletManager.getTransactionsByMsgHash([transfer.msgHash]);
			if (disposed || epoch !== walletEpoch) return;
			const found = result.transactions.filter((transaction) => !transaction.pFlags.incoming && !transaction.pFlags.key_change);
			if (found.length) {
				sentTransactions.delete(transfer.msgHash);
				settledTransfers.set(transfer.id, found[0].id);
				await waitWalletSendSettled(transfer.id);
				if (disposed || epoch !== walletEpoch) return;
				removePending(transfer.id);
				if (transfer.nft && found[0].pFlags.failed) hideNft(transfer.nft.address, false);
				mergeTransactions(found, false);
			}
		} catch (err) {}
		await checkUnknownPending(epoch);
	};
	/**
	* A row with no receipt — its outcome unknown — is settled by the engine's journal, which asks the chain (and
	* frees the engine for the next transfer once it concludes); not on every poll, it costs several requests.
	*/
	let journalCheckedAt = 0;
	const checkUnknownPending = async (epoch) => {
		const unknown = pending().filter((transfer) => !transfer.msgHash && !transfer.failed);
		if (!unknown.length || Date.now() - journalCheckedAt < JOURNAL_CHECK_INTERVAL) return;
		journalCheckedAt = Date.now();
		const snapshot = await session.resolvePendingSend(status()).catch(() => void 0);
		for (const transfer of unknown) {
			if (disposed || epoch !== walletEpoch) return;
			const verdict = getUnknownTransferVerdict(transfer.id, snapshot, transfer.gasless);
			if (verdict === "failed") {
				updatePending(transfer.id, { failed: true });
				if (transfer.draftRandomId) managers.appMessagesManager.failGramTransferDraft(transfer.draftRandomId, getGramTransferFailure(snapshot.phase, transfer.gasless));
			} else if (verdict === "done") {
				await refreshHead();
				await waitWalletSendSettled(transfer.id);
				if (disposed || epoch !== walletEpoch) return;
				removePending(transfer.id);
			}
		}
	};
	let stream, streamAddress;
	const streamTimers = [];
	let streamRefresh;
	const onStreamEvent = (event) => {
		if (disposed) return;
		applyStreamEvent(event);
		if (getAppWindow().document.visibilityState !== "visible") return;
		clearTimeout(streamRefresh);
		streamRefresh = window.setTimeout(() => {
			if (disposed) return;
			refreshStatus(true);
			refreshHead();
		}, 300);
		if (event.type === "transactions") scheduleHistoryRechecks();
	};
	const scheduleHistoryRechecks = () => {
		[3e3, 1e4].forEach((delay) => streamTimers.push(window.setTimeout(() => !disposed && refreshHead(), delay)));
	};
	/**
	* A finalized balance goes to the manager, which every window and the settings read (Android takes only those, iOS
	* a confirmed one too — that can still be rolled back); plain transfers in from finalized traces show until the
	* server lists them; the trace of a message this wallet sent has its "Sending" row looked up now, not on the next
	* poll — settled by the server's answer, as any row is. What a frame cannot vouch for (its comment, who sent it)
	* comes with the server's copy.
	*/
	const applyStreamEvent = (event) => {
		switch (event.type) {
			case "state":
				if (event.finality === "finalized") managers.appWalletManager.applyStreamBalance(streamAddress, event.balance).catch(noop);
				break;
			case "transactions": {
				if (event.incoming.length) addStreamRows(event.traceId, event.incoming);
				const trace = normalizeWalletHash(event.traceId);
				if (event.outgoing && pending().some((transfer) => transfer.msgHash && !transfer.failed && normalizeWalletHash(transfer.msgHash) === trace)) checkPending();
				break;
			}
			case "invalidated": {
				const trace = normalizeWalletHash(event.traceId);
				setStreamRows((rows) => {
					const kept = rows.filter((row) => normalizeWalletHash(row.traceId) !== trace);
					return kept.length === rows.length ? rows : kept;
				});
				break;
			}
		}
	};
	const addStreamRows = (traceId, incoming) => {
		const listed = listedHashes(), known = new Set(streamRows().map((row) => row.hash));
		const fresh = incoming.map((transaction) => ({
			hash: normalizeWalletHash(transaction.tx_hash),
			traceId,
			transaction,
			date: Date.now()
		})).filter((row) => row.hash && !listed.has(row.hash) && !known.has(row.hash));
		if (fresh.length) setStreamRows((rows) => [...fresh, ...rows]);
	};
	const pruneStreamRows = () => {
		const now = Date.now();
		setStreamRows((rows) => {
			const kept = rows.filter((row) => now - row.date < STREAM_ROW_LIFETIME);
			return kept.length === rows.length ? rows : kept;
		});
	};
	const startStream = (address) => {
		if (streamAddress === address) return;
		stream?.stop();
		streamAddress = address;
		stream = new WalletStream(managers, address, onStreamEvent);
		stream.start();
	};
	const onStatus = (value) => {
		if (!disposed) applyStatus(value);
	};
	const sentTransactions = /* @__PURE__ */ new Map();
	const onTransferSent = (sent) => {
		if (sent.transaction) sentTransactions.set(sent.msgHash, sent.transaction);
		if (pending().some((transfer) => transfer.msgHash === sent.msgHash)) {
			checkPending();
			return;
		}
		if (sent.own !== false || !listsRestored) return;
		if (pending().some((transfer) => !transfer.msgHash && !transfer.failed)) {
			journalCheckedAt = 0;
			checkPending();
			refreshHead();
		} else if (sent.transaction) {
			sentTransactions.delete(sent.msgHash);
			mergeTransactions([sent.transaction], false);
		} else {
			refreshHead();
			scheduleHistoryRechecks();
		}
	};
	rootScope.addEventListener("wallet_status", onStatus);
	rootScope.addEventListener("wallet_transfer_sent", onTransferSent);
	const tick = () => {
		if (getAppWindow().document.visibilityState !== "visible") return;
		pruneStreamRows();
		refreshStatus();
		if (Date.now() - historyDate > HISTORY_REFRESH_INTERVAL || pending().length) refreshHead();
		checkPending();
	};
	const interval = window.setInterval(tick, POLL_INTERVAL);
	Promise.resolve(apiManagerProxy.getAppConfig()).then((appConfig) => {
		setConfig({
			minNanos: String(appConfig.wallet_transfer_min_nanos ?? 1e8),
			gaslessMinNanos: String(appConfig.wallet_gasless_min_nanos ?? 1e8),
			gaslessDaily: appConfig.wallet_gasless_daily_transfers ?? 5,
			explorerUrl: appConfig.ton_blockchain_explorer_url || "https://tonviewer.com",
			usdPerGram: appConfig.ton_usd_rate || 0
		});
	});
	managers.appWalletManager.getRates().then(setRates, () => {});
	managers.appWalletManager.getCachedStatus().then((value) => {
		if (value?.presence && value.presence !== "unknown" && !disposed && status().presence === "unknown") applyStatus(value);
	});
	refreshStatus(true);
	const dispose = () => {
		disposed = true;
		clearInterval(interval);
		stream?.stop();
		streamTimers.forEach((timer) => clearTimeout(timer));
		clearTimeout(streamRefresh);
		rootScope.removeEventListener("wallet_status", onStatus);
		rootScope.removeEventListener("wallet_transfer_sent", onTransferSent);
	};
	onCleanup(dispose);
	return {
		session,
		managers,
		/** the window is still up: what a closed one asked for (a prompt over it) is not shown after it */
		isOpen: () => !disposed,
		status,
		deviceMode,
		refreshDeviceMode,
		refreshStatus,
		rates,
		currency,
		setCurrency,
		fiatPerGram,
		config,
		friendlyAddress,
		history: {
			items,
			transactions,
			hiddenCount,
			loading: historyLoading,
			loaded: historyLoaded,
			ended: historyEnded,
			error: historyError,
			loadMore,
			refreshHead
		},
		nfts: {
			items: nfts,
			loading: nftsLoading,
			ended: nftsEnded,
			error: nftsError,
			loadMore: loadMoreNfts,
			remove: (address) => hideNft(address, true)
		},
		parked,
		refreshParked,
		pending: {
			list: pending,
			add: addPending,
			update: updatePending,
			remove: removePending,
			/** the id of the transaction a sent transfer turned out to be, once its receipt was matched */
			settledAs: (id) => settledTransfers.get(id)
		},
		dispose
	};
}
//#endregion
export { createWalletStore as t };
