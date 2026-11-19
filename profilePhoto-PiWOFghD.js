//# allFunctionsCalledOnLoad
import { n as rootScope } from "./rootScope-CZS0lmz8.js";
import { a as i18n } from "./langPack-BmdJGr44.js";
import { p as createComponent } from "./solid-9Vxm0VIz.js";
import { t as getMiddleware } from "./middleware-D6HuIqPm.js";
import { r as pickAvatarAndUpload } from "./avatarEdit-Cnvqr5-1.js";
import { M as avatarNew, P as wrapPhotoToAvatar, i as Row, t as confirmationPopup, xn as ProgressivePreloader } from "./confirmationPopup-Bz6mK0o-.js";
import { a as Section } from "./emailVerification-C8QYZSyu.js";
import { r as wrapSolidComponent } from "./wrapSolidComponent-BASCjNJG.js";
import { t as privacyTab } from "./privacyTab-CLQUZDNg.js";
import { t as PrivacySection } from "./privacySection-B6r4C4NK.js";
//#region src/components/sidebarLeft/tabs/privacy/profilePhoto.tsx
var caption = "PrivacySettingsController.ProfilePhoto.CustomHelp";
function buildFallbackSection(tab) {
	let avatarMiddleware;
	let uploadPreloader;
	let uploadProgress;
	let fallbackTitle;
	let removeMedia;
	let removeRow;
	const renderRemoveAvatar = (fallback) => {
		avatarMiddleware?.destroy();
		removeMedia.replaceChildren();
		if (!fallback) return;
		avatarMiddleware = getMiddleware();
		const avatar = avatarNew({
			middleware: avatarMiddleware.get(),
			size: 36,
			isDialog: false
		});
		removeMedia.appendChild(avatar.node);
		wrapPhotoToAvatar(avatar, {
			...fallback,
			video_sizes: void 0
		}, 36);
	};
	const refreshFallback = async () => {
		if (uploadProgress) return;
		const fallback = (await tab.managers.appProfileManager.getProfile(rootScope.myId.toUserId()))?.fallback_photo;
		const hasFallback = !!fallback;
		removeRow.classList.toggle("hide", !hasFallback);
		fallbackTitle.replaceChildren(i18n(hasFallback ? "PrivacySettingsController.UpdatePublicPhoto" : "PrivacySettingsController.SetPublicPhoto"));
		renderRemoveAvatar(hasFallback ? fallback : void 0);
	};
	const endUploadProgress = () => {
		uploadProgress = void 0;
		removeRow.classList.remove("is-uploading");
		uploadPreloader?.detach();
		refreshFallback();
	};
	const showUploadProgress = (progress) => {
		uploadProgress = progress;
		removeRow.classList.remove("hide");
		removeRow.classList.add("is-uploading");
		uploadPreloader ?? (uploadPreloader = new ProgressivePreloader({
			isUpload: true,
			cancelable: false
		}));
		uploadPreloader.attach(removeMedia, true, progress);
		progress.catch(() => {
			if (uploadProgress === progress) endUploadProgress();
		});
	};
	const onSetFallbackClick = () => {
		pickAvatarAndUpload({
			managers: tab.managers,
			mode: "fallback",
			onUploadStart: (progress) => showUploadProgress(progress),
			onUploaded: () => endUploadProgress()
		});
	};
	const onRemoveFallbackClick = async () => {
		try {
			await confirmationPopup({
				titleLangKey: "PrivacySettingsController.RemovePublicPhotoConfirmTitle",
				descriptionLangKey: "PrivacySettingsController.RemovePublicPhotoConfirmDescription",
				button: {
					langKey: "Remove",
					isDanger: true
				}
			});
		} catch {
			return;
		}
		await tab.managers.appProfileManager.clearFallbackProfilePhoto();
		refreshFallback();
	};
	const onRemoveRowClick = () => {
		if (uploadProgress) {
			uploadProgress.cancel();
			return;
		}
		onRemoveFallbackClick();
	};
	const middleware = tab.middlewareHelper.get();
	const section = wrapSolidComponent(() => createComponent(Section, {
		name: "PrivacySettingsController.PublicPhoto",
		caption: "PrivacySettingsController.PublicPhoto.Help",
		get children() {
			return [createComponent(Row, {
				clickable: onSetFallbackClick,
				get children() {
					return [createComponent(Row.Icon, { icon: "cameraadd" }), createComponent(Row.Title, {
						ref(r$) {
							var _ref$ = fallbackTitle;
							typeof _ref$ === "function" ? _ref$(r$) : fallbackTitle = r$;
						},
						get children() {
							return i18n("PrivacySettingsController.SetPublicPhoto");
						}
					})];
				}
			}), createComponent(Row, {
				ref: (element) => removeRow = element,
				clickable: onRemoveRowClick,
				"class": "danger privacy-public-photo-remove",
				get children() {
					return [createComponent(Row.Title, { get children() {
						return i18n("PrivacySettingsController.RemovePublicPhoto");
					} }), createComponent(Row.Media, {
						ref(r$) {
							var _ref$2 = removeMedia;
							typeof _ref$2 === "function" ? _ref$2(r$) : removeMedia = r$;
						},
						size: "medium"
					})];
				}
			})];
		}
	}), middleware);
	tab.scrollable.append(section);
	refreshFallback();
	tab.listenerSetter.add(rootScope)("user_full_update", (userId) => {
		if (userId === rootScope.myId.toUserId()) refreshFallback();
	});
}
var profilePhoto_default = privacyTab("privacy-profile-photo", (tab) => {
	new PrivacySection({
		tab,
		title: "PrivacyProfilePhotoTitle",
		inputKey: "inputPrivacyKeyProfilePhoto",
		captions: [
			caption,
			caption,
			caption
		],
		exceptionTexts: ["PrivacySettingsController.NeverShare", "PrivacySettingsController.AlwaysShare"],
		appendTo: tab.scrollable,
		managers: tab.managers
	});
	buildFallbackSection(tab);
});
//#endregion
export { profilePhoto_default as default };
