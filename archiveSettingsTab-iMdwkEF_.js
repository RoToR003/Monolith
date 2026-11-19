//# allFunctionsCalledOnLoad
import { c as deepEqual } from "./encryptedStorageLayer-gN9TBXzg.js";
import { _ as createMemo, b as createResource, m as createComputed, p as createComponent, s as Show } from "./solid-9Vxm0VIz.js";
import { n as createStore } from "./store-PwRn5fa3.js";
import { c as insert, g as template, n as Portal } from "./web-BPyQozky.js";
import { r as useHotReloadGuard } from "./hotReloadGuard-BUNVkeQ4.js";
import { t as I18nTsx } from "./i18n-CGMFiAW0.js";
import { s as CheckboxFieldTsx } from "./confirmationPopup-Bz6mK0o-.js";
import { yt as setBooleanFlag } from "./getChatMigratedTo-ChhMNXuu.js";
import { Qt as wrapAsyncClickHandler } from "./appDialogsManager-CXguiKc3.js";
import { i as usePromiseCollector } from "./mediaHeader-CnpQNwOl.js";
import { a as Section } from "./emailVerification-C8QYZSyu.js";
import { n as useSuperTab } from "./superTabProvider-LtveyH7W.js";
import { t as HeightTransition } from "./heightTransition-DUH4NxQ7.js";
import { n as SaveButton, t as useIsConfirmationNeededOnClose } from "./useIsConfirmationNeededOnClose-D8OTEl9F.js";
//#region src/components/sidebarLeft/tabs/archiveSettingsTab.tsx
var _tmpl$ = /*#__PURE__*/ template(`<div style=overflow:hidden> `);
function ArchiveSettingsTab() {
	const [tab] = useSuperTab();
	const { Row, rootScope, usePremium } = useHotReloadGuard();
	const promiseCollector = usePromiseCollector();
	const [globalPrivacy] = createResource(() => {
		const promise = rootScope.managers.appPrivacyManager.getGlobalPrivacySettings();
		promiseCollector.collect(promise);
		return promise;
	});
	const isPremium = usePremium();
	const isReady = createMemo(() => globalPrivacy.state === "ready");
	const [store, setStore] = createStore({
		keepArchivedUnmutedChats: false,
		keepArchiveFromFolders: false,
		archiveNonContactChats: false
	});
	let initialValues = {
		keepArchivedUnmutedChats: false,
		keepArchiveFromFolders: false,
		archiveNonContactChats: false
	};
	const hasChanges = createMemo(() => !deepEqual(store, initialValues));
	createComputed(() => {
		if (!isReady()) return;
		initialValues = {
			keepArchivedUnmutedChats: !!globalPrivacy()?.pFlags?.keep_archived_unmuted,
			keepArchiveFromFolders: !!globalPrivacy()?.pFlags?.keep_archived_folders,
			archiveNonContactChats: !!globalPrivacy()?.pFlags?.archive_and_mute_new_noncontact_peers
		};
		setStore(initialValues);
	});
	const saveGlobalSettings = wrapAsyncClickHandler(async () => {
		if (!isReady()) return;
		const settings = structuredClone(globalPrivacy());
		settings.pFlags ?? (settings.pFlags = {});
		setBooleanFlag(settings.pFlags, "keep_archived_unmuted", store.keepArchivedUnmutedChats);
		setBooleanFlag(settings.pFlags, "keep_archived_folders", store.keepArchivedUnmutedChats ? true : store.keepArchiveFromFolders);
		setBooleanFlag(settings.pFlags, "archive_and_mute_new_noncontact_peers", store.archiveNonContactChats);
		await rootScope.managers.appPrivacyManager.setGlobalPrivacySettings(settings);
		tab.close();
	});
	tab.isConfirmationNeededOnClose = useIsConfirmationNeededOnClose({
		hasChanges,
		saveAllSettings: saveGlobalSettings,
		descriptionLangKey: "UnsavedChangesDescription.Archive"
	});
	return [
		createComponent(Portal, {
			get mount() {
				return tab.header;
			},
			get children() {
				return createComponent(SaveButton, {
					get hasChanges() {
						return hasChanges();
					},
					onClick: () => void saveGlobalSettings()
				});
			}
		}),
		createComponent(Section, {
			name: "ArchiveSettings.UnmutedChats.Title",
			caption: "ArchiveSettings.UnmutedChats.Description",
			get children() {
				return createComponent(Row, { get children() {
					return [createComponent(Row.CheckboxFieldToggle, { get children() {
						return createComponent(CheckboxFieldTsx, {
							toggle: true,
							get checked() {
								return store.keepArchivedUnmutedChats;
							},
							onChange: (checked) => setStore("keepArchivedUnmutedChats", checked)
						});
					} }), createComponent(Row.Title, { get children() {
						return createComponent(I18nTsx, { key: "ArchiveSettings.UnmutedChats.Action" });
					} })];
				} });
			}
		}),
		createComponent(Show, {
			get when() {
				return isReady();
			},
			get children() {
				return [" ", createComponent(HeightTransition, { get children() {
					return createComponent(Show, {
						get when() {
							return !store.keepArchivedUnmutedChats;
						},
						get children() {
							var _el$ = _tmpl$();
							_el$.firstChild;
							insert(_el$, createComponent(Section, {
								name: "ArchiveSettings.FolderChats.Title",
								caption: "ArchiveSettings.FolderChats.Description",
								get children() {
									return createComponent(Row, { get children() {
										return [createComponent(Row.CheckboxFieldToggle, { get children() {
											return createComponent(CheckboxFieldTsx, {
												toggle: true,
												get checked() {
													return store.keepArchiveFromFolders;
												},
												onChange: (checked) => setStore("keepArchiveFromFolders", checked)
											});
										} }), createComponent(Row.Title, { get children() {
											return createComponent(I18nTsx, { key: "ArchiveSettings.FolderChats.Action" });
										} })];
									} });
								}
							}), null);
							return _el$;
						}
					});
				} })];
			}
		}),
		createComponent(Show, {
			get when() {
				return isPremium();
			},
			get children() {
				return createComponent(Section, {
					name: "ArchiveSettings.NewChats.Title",
					caption: "ArchiveSettings.NewChats.Description",
					get children() {
						return createComponent(Row, { get children() {
							return [createComponent(Row.CheckboxFieldToggle, { get children() {
								return createComponent(CheckboxFieldTsx, {
									toggle: true,
									get checked() {
										return store.archiveNonContactChats;
									},
									onChange: (checked) => setStore("archiveNonContactChats", checked)
								});
							} }), createComponent(Row.Title, { get children() {
								return createComponent(I18nTsx, { key: "ArchiveSettings.NewChats.Action" });
							} })];
						} });
					}
				});
			}
		})
	];
}
//#endregion
export { ArchiveSettingsTab as default };
