//# allFunctionsCalledOnLoad
import { t as noop } from "./noop-H9NNBLfX.js";
import { n as rootScope } from "./rootScope-CZS0lmz8.js";
import { a as i18n } from "./langPack-BmdJGr44.js";
import { C as createSignal, p as createComponent } from "./solid-9Vxm0VIz.js";
import { c as insert, g as template, u as memo } from "./web-BPyQozky.js";
import { n as attachClickEvent } from "./clickEvent-COk4YpLP.js";
import { t as Button } from "./button-DpTvniRN.js";
import { t as InputField } from "./inputField-CaCo30N0.js";
import { r as pickAvatarAndUpload } from "./avatarEdit-Cnvqr5-1.js";
import { dt as wrapPeerTitle, ft as PeerTitle, i as Row, s as CheckboxFieldTsx, t as confirmationPopup } from "./confirmationPopup-Bz6mK0o-.js";
import { U as getPeerId } from "./canPollPeerStories-D3HoBvLX.js";
import { vt as confirmDeleteContacts } from "./appDialogsManager-CXguiKc3.js";
import { i as usePromiseCollector } from "./mediaHeader-CnpQNwOl.js";
import { a as Section } from "./emailVerification-C8QYZSyu.js";
import { r as wrapSolidComponent } from "./wrapSolidComponent-BASCjNJG.js";
import { r as toastNew } from "./toast-B6VD5M7R.js";
import { t as toggleDisability } from "./toggleDisability-2oUcKWqw.js";
import { n as useSuperTab } from "./superTabProvider-LtveyH7W.js";
import { t as formatUserPhone } from "./formatUserPhone-BdRym6k5.js";
import { t as EditPeer } from "./editPeer-DiIQE_5N.js";
import { n as showBirthdayPopup, r as suggestUserBirthday } from "./birthday-n9InLDUb.js";
import { t as renderComponent } from "./renderComponent-eWfIuOhm.js";
import { t as InputFieldEmoji } from "./inputFieldEmoji-uKBeWGwI.js";
//#region src/components/sidebarRight/tabs/editContact.tsx
var _tmpl$ = /*#__PURE__*/ template(`<span dir=ltr>`);
var EditContact = () => {
	const [tab] = useSuperTab();
	const promiseCollector = usePromiseCollector();
	const peerId = tab.payload;
	promiseCollector.collect((async () => {
		const userId = peerId.toUserId();
		tab.container.classList.add("edit-peer-container", "edit-contact-container");
		const [isContact, privacy] = await Promise.all([tab.managers.appUsersManager.isContact(userId), tab.managers.appPrivacyManager.getPrivacy("inputPrivacyKeyPhoneNumber")]);
		const isNew = !isContact;
		tab.title.replaceChildren(i18n(isNew ? "AddContactTitle" : "Edit"));
		let nameInputField;
		let lastNameInputField;
		let noteInputField;
		let editPeer;
		let sharePhoneSignal;
		let canSuggestBirthday = false;
		let photoSectionContainer;
		async function buildPhotoSection() {
			const [user, fullUser] = await Promise.all([tab.managers.appUsersManager.getUser(userId), tab.managers.appProfileManager.getProfile(userId)]);
			const hasPersonal = !!fullUser?.personal_photo;
			const firstName = user.first_name || "";
			const btnSetPhoto = Button("btn-primary btn-transparent", {
				icon: "cameraadd",
				text: hasPersonal ? "UserInfo.UpdatePhotoFor" : "UserInfo.SetPhotoFor",
				textArgs: [firstName]
			});
			attachClickEvent(btnSetPhoto, () => {
				pickAvatarAndUpload({
					managers: tab.managers,
					mode: { userId },
					onUploaded: () => {
						toastNew({
							langPackKey: "UserInfo.PhotoSetToast",
							langPackArguments: [firstName]
						});
						refreshPhotoSection();
					}
				});
			}, { listenerSetter: tab.listenerSetter });
			const btnSuggestPhoto = Button("btn-primary btn-transparent", {
				icon: "edit",
				text: "UserInfo.SuggestPhotoFor",
				textArgs: [firstName]
			});
			attachClickEvent(btnSuggestPhoto, () => {
				pickAvatarAndUpload({
					managers: tab.managers,
					mode: {
						userId,
						suggest: true
					},
					onUploaded: () => {
						toastNew({
							langPackKey: "UserInfo.PhotoSuggestedToast",
							langPackArguments: [firstName]
						});
						refreshPhotoSection();
					}
				});
			}, { listenerSetter: tab.listenerSetter });
			let btnResetPhoto;
			if (hasPersonal) {
				btnResetPhoto = Button("btn-primary btn-transparent danger", {
					icon: "delete",
					text: "UserInfo.RemovePersonalPhoto"
				});
				attachClickEvent(btnResetPhoto, async () => {
					try {
						await confirmationPopup({
							titleLangKey: "UserInfo.ResetCustomPhoto",
							descriptionLangKey: "UserInfo.ResetCustomPhotoDescription",
							button: {
								langKey: "Reset",
								isDanger: true
							}
						});
					} catch {
						return;
					}
					await tab.managers.appProfileManager.uploadContactProfilePhoto({
						userId,
						save: true
					});
					toastNew({ langPackKey: "UserInfo.PhotoResetToast" });
					refreshPhotoSection();
				}, { listenerSetter: tab.listenerSetter });
			}
			return wrapSolidComponent(() => createComponent(Section, {
				caption: "UserInfo.CustomPhotoHelp",
				get children() {
					return [
						btnSetPhoto,
						btnSuggestPhoto,
						btnResetPhoto
					];
				}
			}), tab.middlewareHelper.get());
		}
		async function refreshPhotoSection() {
			const old = photoSectionContainer;
			if (!old?.isConnected) return;
			await tab.managers.appProfileManager.refreshFullPeer(peerId);
			if (!old.isConnected) return;
			const fresh = await buildPhotoSection();
			if (!old.isConnected) return;
			old.replaceWith(fresh);
			photoSectionContainer = fresh;
		}
		{
			const inputFields = [];
			let rowsContainer;
			const inputWrapper = document.createElement("div");
			inputWrapper.classList.add("input-wrapper");
			nameInputField = new InputField({
				label: "FirstName",
				name: "contact-name",
				maxLength: 70,
				required: true
			});
			lastNameInputField = new InputField({
				label: "LastName",
				name: "contact-lastname",
				maxLength: 70
			});
			if (userId) {
				const user = await tab.managers.appUsersManager.getUser(userId);
				if (isNew) {
					nameInputField.setDraftValue(user.first_name);
					lastNameInputField.setDraftValue(user.last_name);
				} else {
					nameInputField.setOriginalValue(user.first_name);
					lastNameInputField.setOriginalValue(user.last_name);
				}
			}
			inputWrapper.append(nameInputField.container, lastNameInputField.container);
			inputFields.push(nameInputField, lastNameInputField);
			if (userId) {
				const fullUser = await tab.managers.appProfileManager.getProfile(userId);
				noteInputField = new InputFieldEmoji({
					label: "ContactNoteRow",
					name: "contact-note",
					maxLength: 128,
					withLinebreaks: true
				});
				tab.middlewareHelper.get().onClean(() => noteInputField.cleanup());
				if (fullUser?.note) noteInputField.setRichOriginalValue(fullUser.note);
				inputFields.push(noteInputField);
				inputWrapper.append(noteInputField.container);
				canSuggestBirthday = !fullUser?.birthday;
			}
			editPeer = new EditPeer({
				peerId,
				inputFields,
				listenerSetter: tab.listenerSetter,
				doNotEditAvatar: true,
				middleware: tab.middlewareHelper.get()
			});
			tab.content.append(editPeer.nextBtn);
			if (peerId) {
				const div = document.createElement("div");
				div.classList.add("avatar-edit");
				div.append(editPeer.avatarElem.node);
				const notificationsSignal = createSignal(false);
				tab.listenerSetter.add(rootScope)("notify_settings", async (update) => {
					if (update.peer._ !== "notifyPeer") return;
					if (getPeerId(update.peer.peer) === peerId) {
						const enabled = !await tab.managers.appNotificationsManager.isMuted(update.notify_settings);
						notificationsSignal[1](enabled);
					}
				});
				const profileNameDiv = document.createElement("div");
				profileNameDiv.classList.add("profile-name");
				profileNameDiv.append(new PeerTitle({ peerId }).element);
				const profileSubtitleDiv = document.createElement("div");
				profileSubtitleDiv.classList.add("profile-subtitle");
				profileSubtitleDiv.append(i18n("EditContact.OriginalName"));
				tab.scrollable.append(div, profileNameDiv, profileSubtitleDiv);
				rowsContainer = document.createElement("div");
				if (!isNew) {
					const enabled = !await tab.managers.appNotificationsManager.isPeerLocalMuted({
						peerId,
						respectType: false
					});
					notificationsSignal[1](enabled);
					renderComponent({
						element: rowsContainer,
						Component: () => [createComponent(Row, { get children() {
							return [
								createComponent(Row.CheckboxFieldToggle, { get children() {
									return createComponent(CheckboxFieldTsx, {
										signal: notificationsSignal,
										toggle: true,
										onChange: () => tab.managers.appMessagesManager.togglePeerMute({ peerId })
									});
								} }),
								createComponent(Row.Title, { get children() {
									return i18n("Notifications");
								} }),
								createComponent(Row.Subtitle, { get children() {
									return i18n(notificationsSignal[0]() ? "Checkbox.Enabled" : "Checkbox.Disabled");
								} })
							];
						} }), canSuggestBirthday && createComponent(Row, {
							clickable: () => {
								showBirthdayPopup({
									suggestForPeer: peerId,
									onSave: (it) => suggestUserBirthday(userId, it)
								});
							},
							get children() {
								return [createComponent(Row.Icon, { icon: "gift_filled" }), createComponent(Row.Title, { get children() {
									return i18n("SuggestBirthdayRow");
								} })];
							}
						})],
						middleware: tab.middlewareHelper.get()
					});
				} else {
					const user = await tab.managers.appUsersManager.getUser(userId);
					renderComponent({
						element: rowsContainer,
						Component: () => createComponent(Row, { get children() {
							return [
								createComponent(Row.Icon, { icon: "phone_filled" }),
								createComponent(Row.Title, { get children() {
									return memo(() => !!user.phone)() ? (() => {
										var _el$ = _tmpl$();
										insert(_el$, () => formatUserPhone(user.phone));
										return _el$;
									})() : i18n("MobileHidden");
								} }),
								createComponent(Row.Subtitle, { get children() {
									return memo(() => !!user.phone)() ? i18n("Phone") : i18n("MobileHiddenExceptionInfo", [new PeerTitle({ peerId }).element]);
								} })
							];
						} }),
						middleware: tab.middlewareHelper.get()
					});
				}
			}
			tab.scrollable.append(wrapSolidComponent(() => createComponent(Section, {
				noDelimiter: true,
				get children() {
					return [inputWrapper, rowsContainer];
				}
			}), tab.middlewareHelper.get()));
		}
		if (!isNew) {
			photoSectionContainer = await buildPhotoSection();
			tab.scrollable.append(photoSectionContainer);
			const btnDelete = Button("btn-primary btn-transparent danger", {
				icon: "delete",
				text: "PeerInfo.DeleteContact"
			});
			attachClickEvent(btnDelete, () => {
				confirmDeleteContacts([peerId]).then(() => {
					const toggle = toggleDisability([btnDelete], true);
					tab.managers.appUsersManager.deleteContacts([userId]).then(() => {
						tab.close();
					}, () => {
						toggle();
					});
				}, noop);
			}, { listenerSetter: tab.listenerSetter });
			tab.scrollable.append(wrapSolidComponent(() => createComponent(Section, { children: btnDelete }), tab.middlewareHelper.get()));
		} else if (privacy.some((privacyRule) => privacyRule._ === "privacyValueDisallowAll") && !privacy.some((privacyRule) => privacyRule._ === "privacyValueAllowUsers" && privacyRule.users.includes(userId))) {
			const peerTitle = await wrapPeerTitle({ peerId });
			sharePhoneSignal = createSignal(true);
			tab.scrollable.append(wrapSolidComponent(() => createComponent(Section, {
				caption: "NewContact.Exception.ShareMyPhoneNumber.Desc",
				captionArgs: [peerTitle],
				get children() {
					return createComponent(Row, { get children() {
						return [createComponent(Row.CheckboxField, { get children() {
							return createComponent(CheckboxFieldTsx, { signal: sharePhoneSignal });
						} }), createComponent(Row.Title, { get children() {
							return i18n("NewContact.Exception.ShareMyPhoneNumber");
						} })];
					} });
				}
			}), tab.middlewareHelper.get()));
		}
		attachClickEvent(editPeer.nextBtn, async () => {
			editPeer.nextBtn.disabled = true;
			try {
				await tab.managers.appUsersManager.addContact(userId, nameInputField.value, lastNameInputField.value, (await tab.managers.appUsersManager.getUser(userId)).phone, sharePhoneSignal?.[0]());
				if (noteInputField.isChanged()) await tab.managers.appProfileManager.updateUserNote(userId, noteInputField.richValue);
			} catch (error) {
				console.error(error);
				toastNew({ langPackKey: "Error.AnError" });
				return;
			} finally {
				editPeer.nextBtn.removeAttribute("disabled");
			}
			tab.close();
		}, { listenerSetter: tab.listenerSetter });
	})());
	return null;
};
//#endregion
export { EditContact as default };
