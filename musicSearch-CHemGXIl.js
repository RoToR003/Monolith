//# allFunctionsCalledOnLoad
import { t as findUpClassName } from "./findUpClassName-3V5me58N.js";
import { n as rootScope } from "./rootScope-CZS0lmz8.js";
import { a as i18n } from "./langPack-BmdJGr44.js";
import { C as createSignal, L as untrack, M as onCleanup, N as onMount, R as useContext, _ as createMemo, b as createResource, g as createEffect, i as For, j as on, p as createComponent, s as Show, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { c as insert, g as template, o as className, u as memo } from "./web-BPyQozky.js";
import { M as LazyLoadQueue } from "./renderer-L80wjxct.js";
import { t as ListenerSetter } from "./listenerSetter-BER6qAXn.js";
import { t as PreloaderTsx } from "./putPreloader-Bxq7N1RV.js";
import { n as attachClickEvent } from "./clickEvent-COk4YpLP.js";
import { i as createPopup, n as PopupElement, t as PopupContext } from "./indexTsx-v9mB9bAq.js";
import { en as getDocumentInput } from "./getChatMigratedTo-ChhMNXuu.js";
import { a as Section } from "./emailVerification-C8QYZSyu.js";
import { t as SelectorSearch } from "./selectorSearch-TWwbuFOi.js";
import { t as PAYMENT_REJECTED } from "./paidMessagesInterceptor-ypY0gcAs.js";
import { _ as getAudioTitles } from "./audio-BL6xvRqa.js";
import { i as emptyMediaListLoaderFactory, n as wrapDocument } from "./document-D10_LTRP.js";
import { t as createFakeAudioMessage } from "./fakeAudioMessage-o9RwvSE8.js";
var musicSearch_module_default = {
	popup: "_popup_14cus_1",
	body: "_body_14cus_6",
	empty: "_empty_14cus_12",
	loading: "_loading_14cus_13"
};
//#endregion
//#region src/components/popups/musicSearch.tsx
var _tmpl$ = /*#__PURE__*/ template(`<div>`);
var GLOBAL_SEARCH_MIN_LENGTH = 3;
function trackSearchText(doc, fallbackTitle, fallbackPerformer) {
	const titles = getAudioTitles(doc);
	return [titles?.title || fallbackTitle, titles?.performer || fallbackPerformer].filter(Boolean).join(" ").toLowerCase();
}
function showMusicSearchPopup(options) {
	const { chat } = options;
	function Inner() {
		const context = useContext(PopupContext);
		const middleware = untrack(() => context.middlewareHelper).get();
		const managers = untrack(() => context.managers);
		const [query, setQuery] = createSignal("");
		const [globalLoading, setGlobalLoading] = createSignal(false);
		const [globalResults, setGlobalResults] = createSignal([]);
		const [botId, setBotId] = createSignal(null);
		const lazyLoadQueue = new LazyLoadQueue();
		const listenerSetter = new ListenerSetter();
		onCleanup(() => {
			lazyLoadQueue.clear();
			listenerSetter.removeAll();
		});
		const withPayment = async (send) => {
			const confirmedPaymentResult = await chat.input.paidMessageInterceptor.prepareStarsForPayment(1);
			if (confirmedPaymentResult === PAYMENT_REJECTED) return;
			context.hide();
			send({
				...chat.getMessageSendingParams(),
				confirmedPaymentResult
			});
			chat.input.onMessageSent(false, true);
		};
		const [savedMusic] = createResource(async () => {
			return (await managers.appSavedMusicManager.getSavedMusic(rootScope.myId.toUserId(), 0, 50)).documents;
		});
		const sendDocument = (doc) => withPayment((sendingParams) => {
			managers.appMessagesManager.sendOther({
				...sendingParams,
				inputMedia: {
					_: "inputMediaDocument",
					id: getDocumentInput(doc),
					pFlags: {}
				}
			});
		});
		const savedTracks = createMemo(() => {
			const q = query().trim().toLowerCase();
			return (savedMusic() || []).map((doc) => ({
				key: "saved-" + doc.id,
				doc,
				searchText: trackSearchText(doc),
				send: () => sendDocument(doc)
			})).filter((track) => !q || track.searchText.includes(q));
		});
		let runId = 0;
		const runSearch = async (q) => {
			const myRun = ++runId;
			const bid = botId();
			if (!bid || q.length < GLOBAL_SEARCH_MIN_LENGTH) {
				setGlobalResults([]);
				setGlobalLoading(false);
				return;
			}
			setGlobalLoading(true);
			try {
				const botResults = await managers.appInlineBotsManager.getInlineResults(chat.peerId, bid, q, "");
				if (!middleware() || myRun !== runId) return;
				setGlobalResults(botResults.results.filter((r) => {
					return r._ === "botInlineMediaResult" && r.document?.type === "audio";
				}));
			} catch (err) {
				if (!middleware() || myRun !== runId) return;
				setGlobalResults([]);
			} finally {
				if (middleware() && myRun === runId) setGlobalLoading(false);
			}
		};
		const globalTracks = createMemo(() => globalResults().map((item) => {
			const doc = item.document;
			return {
				key: "global-" + item.id,
				doc,
				searchText: trackSearchText(doc, item.title, item.description),
				send: () => sendDocument(doc)
			};
		}));
		const selectorSearch = new SelectorSearch({
			middlewareHelper: untrack(() => context.middlewareHelper),
			multiSelect: false,
			onInput: () => setQuery(selectorSearch.input.value),
			onChipClick: () => {}
		});
		onCleanup(() => selectorSearch.destroy());
		onMount(async () => {
			const { music_search_username } = await managers.apiManager.getAppConfig();
			if (!middleware() || !music_search_username) return;
			try {
				const user = await managers.appUsersManager.resolveUsername(music_search_username);
				if (!middleware() || user._ !== "user" || !user.pFlags.bot) return;
				setBotId(user.id);
				runSearch(query());
			} catch (err) {}
		});
		createEffect(on(query, runSearch, { defer: true }));
		const loading = () => savedMusic.loading || globalLoading();
		const isEmpty = () => !loading() && !savedTracks().length && !globalTracks().length;
		let fakeMid = 0;
		const TrackRow = (props) => {
			const [element] = createResource(async () => {
				const message = await createFakeAudioMessage({
					doc: props.track.doc,
					peerId: rootScope.myId,
					mid: --fakeMid
				});
				const audio = await wrapDocument({
					message,
					middleware,
					fontWeight: 400,
					voiceAsMusic: true,
					clickable: true,
					lazyLoadQueue,
					autoDownloadSize: 0,
					getSize: () => 320
				});
				audio.classList.add("audio-48", "search-super-item");
				audio.listLoaderFactory = emptyMediaListLoaderFactory;
				attachClickEvent(audio, (e) => {
					if (findUpClassName(e.target, "audio-toggle")) return;
					props.track.send();
				}, { listenerSetter });
				return audio;
			});
			return memo(element);
		};
		const TrackSection = (props) => createComponent(Show, {
			get when() {
				return props.tracks.length;
			},
			get children() {
				return createComponent(Section, {
					get name() {
						return props.name;
					},
					get children() {
						return createComponent(For, {
							get each() {
								return props.tracks;
							},
							children: (track) => createComponent(TrackRow, { track })
						});
					}
				});
			}
		});
		return [createComponent(PopupElement.Header, { get children() {
			return [createComponent(PopupElement.CloseButton, {}), createComponent(PopupElement.Title, { title: "SharedMusicTab2" })];
		} }), createComponent(PopupElement.Body, {
			get ["class"]() {
				return musicSearch_module_default.body;
			},
			get children() {
				return createComponent(PopupElement.Scrollable, { get children() {
					return [
						memo(() => selectorSearch.gradient),
						memo(() => selectorSearch.section.container),
						createComponent(Show, {
							get when() {
								return memo(() => !!(loading() && !savedTracks().length))() && !globalTracks().length;
							},
							get children() {
								var _el$ = _tmpl$();
								insert(_el$, createComponent(PreloaderTsx, {}));
								createRenderEffect(() => className(_el$, musicSearch_module_default.loading));
								return _el$;
							}
						}),
						createComponent(Show, {
							get when() {
								return isEmpty();
							},
							get children() {
								var _el$2 = _tmpl$();
								insert(_el$2, () => i18n("Chat.Search.NothingFound"));
								createRenderEffect(() => className(_el$2, musicSearch_module_default.empty));
								return _el$2;
							}
						}),
						createComponent(TrackSection, {
							name: "MusicSearch.Profile",
							get tracks() {
								return savedTracks();
							}
						}),
						createComponent(TrackSection, {
							name: "MusicSearch.Global",
							get tracks() {
								return globalTracks();
							}
						})
					];
				} });
			}
		})];
	}
	createPopup(() => createComponent(PopupElement, {
		get ["class"]() {
			return musicSearch_module_default.popup;
		},
		get children() {
			return createComponent(Inner, {});
		}
	}));
}
//#endregion
export { showMusicSearchPopup as default };
