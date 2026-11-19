//# allFunctionsCalledOnLoad
import { a as i18n } from "./langPack-BmdJGr44.js";
import { C as createSignal, _ as createMemo, b as createResource, p as createComponent, s as Show } from "./solid-9Vxm0VIz.js";
import { c as insert, g as template, n as Portal, u as memo } from "./web-BPyQozky.js";
import { t as InputFieldTsx } from "./inputFieldTsx-0SbEFdGE.js";
import { r as GrowHeightReveal } from "./animations-DCmLIda3.js";
import { i as Row, s as CheckboxFieldTsx, t as confirmationPopup } from "./confirmationPopup-Bz6mK0o-.js";
import { i as usePromiseCollector, t as MediaHeader } from "./mediaHeader-CnpQNwOl.js";
import { a as Section } from "./emailVerification-C8QYZSyu.js";
import { r as toastNew } from "./toast-B6VD5M7R.js";
import { n as useSuperTab } from "./superTabProvider-LtveyH7W.js";
import { n as SaveButton, t as useIsConfirmationNeededOnClose } from "./useIsConfirmationNeededOnClose-D8OTEl9F.js";
import { t as MapPreview } from "./mapPreview-DBrifbKc.js";
//#region src/components/sidebarLeft/tabs/businessLocation.tsx
var _tmpl$ = /*#__PURE__*/ template(`<div class=input-wrapper>`);
var MAX_ADDRESS_LENGTH = 96;
var BusinessLocationTab = () => {
	const [tab] = useSuperTab();
	const promiseCollector = usePromiseCollector();
	const loadPromise = Promise.resolve(tab.payload.userFull).then((userFull) => ({ location: userFull?.business_location }));
	promiseCollector.collect(loadPromise);
	const [data] = createResource(() => loadPromise);
	return [createComponent(MediaHeader, {
		marginBottom: true,
		get children() {
			return [
				createComponent(MediaHeader.Sticker, {
					get animationData() {
						return tab.payload.animationData;
					},
					size: 130,
					restartOnClick: false
				}),
				createComponent(MediaHeader.Title, { get children() {
					return i18n("BusinessLocation");
				} }),
				createComponent(MediaHeader.Subtitle, { get children() {
					return i18n("BusinessLocationInfo");
				} })
			];
		}
	}), createComponent(Show, {
		get when() {
			return data();
		},
		get children() {
			return createComponent(BusinessLocationForm, { get location() {
				return data().location;
			} });
		}
	})];
};
var BusinessLocationForm = (props) => {
	const [tab] = useSuperTab();
	const savedAddress = props.location?.address || "";
	const savedGeoPoint = props.location?.geo_point?._ === "geoPoint" ? props.location.geo_point : void 0;
	const [address, setAddress] = createSignal(savedAddress);
	const [geoPoint, setGeoPoint] = createSignal(savedGeoPoint);
	const [saving, setSaving] = createSignal(false);
	const trimmedAddress = () => address().trim();
	const isEmpty = () => !trimmedAddress() && !geoPoint();
	const isTooLong = () => trimmedAddress().length > MAX_ADDRESS_LENGTH;
	const hasChanges = createMemo(() => trimmedAddress() !== savedAddress.trim() || geoPoint() !== savedGeoPoint);
	const canSave = createMemo(() => hasChanges() && !isTooLong() && (isEmpty() || !!trimmedAddress()));
	/**
	* Resolves to whether the location was saved. The header button closes the tab
	* once it is; the "unsaved changes" popup does not, since the slider is already
	* closing the tab — closing it here as well would close the tab beneath it too.
	*/
	const save = async (close) => {
		if (saving()) return false;
		setSaving(true);
		try {
			await tab.managers.appBusinessManager.updateBusinessLocation(isEmpty() ? void 0 : {
				address: trimmedAddress(),
				geoPoint: geoPoint()
			});
			tab.isConfirmationNeededOnClose = void 0;
			if (close) tab.close();
			return true;
		} catch (err) {
			console.error("updateBusinessLocation error:", err);
			toastNew({ langPackKey: "Error.AnError" });
			return false;
		} finally {
			setSaving(false);
		}
	};
	const clear = async () => {
		try {
			await confirmationPopup({
				titleLangKey: "BusinessLocationClear",
				descriptionLangKey: "BusinessLocationClearMessage",
				button: {
					langKey: "Remove",
					isDanger: true
				}
			});
		} catch (err) {
			return;
		}
		setSaving(true);
		try {
			await tab.managers.appBusinessManager.updateBusinessLocation();
			tab.isConfirmationNeededOnClose = void 0;
			tab.close();
		} catch (err) {
			console.error("updateBusinessLocation error:", err);
			toastNew({ langPackKey: "Error.AnError" });
		} finally {
			setSaving(false);
		}
	};
	let mapCheckboxField;
	const toggleMap = (value) => {
		if (value) {
			mapCheckboxField.setValueSilently(false);
			toastNew({ langPackKey: "BusinessLocationMapUnsupported" });
			return;
		}
		setGeoPoint(void 0);
	};
	tab.isConfirmationNeededOnClose = useIsConfirmationNeededOnClose({
		hasChanges: canSave,
		saveAllSettings: async () => {
			if (!await save(false)) throw new Error("BUSINESS_LOCATION_NOT_SAVED");
		},
		descriptionLangKey: "UnsavedChangesDescription.BusinessLocation",
		waitForSave: true
	});
	return [
		createComponent(Portal, {
			get mount() {
				return tab.header;
			},
			get children() {
				return createComponent(SaveButton, {
					get hasChanges() {
						return memo(() => !!canSave())() && !saving();
					},
					onClick: () => save(true)
				});
			}
		}),
		createComponent(Section, { get children() {
			var _el$ = _tmpl$();
			insert(_el$, createComponent(InputFieldTsx, {
				label: "BusinessLocationAddress",
				name: "business-address",
				maxLength: MAX_ADDRESS_LENGTH,
				get value() {
					return address();
				},
				onRawInput: setAddress
			}));
			return _el$;
		} }),
		createComponent(Section, { get children() {
			return [createComponent(Row, { get children() {
				return [createComponent(Row.CheckboxFieldToggle, { get children() {
					return createComponent(CheckboxFieldTsx, {
						get checked() {
							return !!geoPoint();
						},
						toggle: true,
						onChange: toggleMap,
						ref: (checkboxField) => mapCheckboxField = checkboxField
					});
				} }), createComponent(Row.Title, { get children() {
					return i18n("BusinessLocationMap");
				} })];
			} }), createComponent(GrowHeightReveal, {
				get when() {
					return geoPoint();
				},
				appear: false,
				get children() {
					return createComponent(Show, {
						keyed: true,
						get when() {
							return geoPoint();
						},
						children: (geo) => createComponent(MapPreview, { geo })
					});
				}
			})];
		} }),
		createComponent(Show, {
			get when() {
				return props.location;
			},
			get children() {
				return createComponent(Section, { get children() {
					return createComponent(Row, {
						color: "danger",
						clickable: clear,
						get children() {
							return [createComponent(Row.Icon, { icon: "delete" }), createComponent(Row.Title, {
								"class": "danger",
								get children() {
									return i18n("BusinessLocationClear");
								}
							})];
						}
					});
				} });
			}
		})
	];
};
//#endregion
export { BusinessLocationTab as default };
