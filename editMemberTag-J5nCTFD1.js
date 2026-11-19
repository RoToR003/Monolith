//# allFunctionsCalledOnLoad
import { n as rootScope } from "./rootScope-CZS0lmz8.js";
import { p as createComponent } from "./solid-9Vxm0VIz.js";
import { n as bindManagersToSession } from "./bindManagersToAccount-BL82O9H9.js";
import { t as I18nTsx } from "./i18n-CGMFiAW0.js";
import { i as createPopup, n as PopupElement } from "./indexTsx-v9mB9bAq.js";
import { dt as cleanMemberTag, ft as getMemberTagRole } from "./getChatMigratedTo-ChhMNXuu.js";
import { a as Section } from "./emailVerification-C8QYZSyu.js";
import { r as toastNew } from "./toast-B6VD5M7R.js";
import { t as PeerTitleTsx } from "./peerTitleTsx-DcpEYRoE.js";
import { r as MemberTagFieldPreview, t as createMemberTagInputField } from "./memberTagField-DOg7B-ka.js";
var editMemberTag_module_default = {
	popup: "_popup_ctz63_1",
	preview: "_preview_ctz63_5"
};
//#endregion
//#region src/components/popups/editMemberTag.tsx
/**
* "Edit tag" (desktop's EditCustomRankBox): the author's message with the tag on it, the field with
* what the tag is for, and Save. An empty field saved removes the tag. Nothing changes before the
* server has it
*/
async function showEditMemberTagPopup(options) {
	const { chatId, peerId } = options;
	const managers = bindManagersToSession(rootScope.managers);
	let { rank, role } = options;
	if (!role) {
		const participant = await managers.appProfileManager.getParticipant(chatId, peerId).catch(() => void 0);
		role = getMemberTagRole(participant);
		rank ?? (rank = participant && participant.rank);
	}
	const isSelf = peerId === rootScope.myId;
	createPopup(() => {
		const inputField = createMemberTagInputField({
			role,
			value: rank
		});
		const save = async () => {
			const value = cleanMemberTag(inputField.value);
			if (value === (rank || "")) return;
			try {
				await managers.appChatsManager.editParticipantRank(chatId, peerId, value);
			} catch (err) {
				console.error("editChatParticipantRank failed", err);
				toastNew({ langPackKey: "Error.AnError" });
				return false;
			}
			options.onSaved?.(value);
		};
		return createComponent(PopupElement, {
			get ["class"]() {
				return editMemberTag_module_default.popup;
			},
			managers,
			closable: true,
			initialFocus: () => inputField.input,
			get children() {
				return [
					createComponent(PopupElement.Header, { get children() {
						return [createComponent(PopupElement.CloseButton, {}), createComponent(PopupElement.Title, { title: "MemberTag.EditTitle" })];
					} }),
					createComponent(PopupElement.Body, { get children() {
						return [createComponent(MemberTagFieldPreview, {
							get ["class"]() {
								return editMemberTag_module_default.preview;
							},
							get chatPeerId() {
								return chatId.toPeerId(true);
							},
							peerId,
							role,
							inputField
						}), createComponent(Section, {
							get caption() {
								return isSelf ? createComponent(I18nTsx, { key: "MemberTag.AboutSelf" }) : createComponent(I18nTsx, {
									key: "MemberTag.About",
									get args() {
										return createComponent(PeerTitleTsx, {
											peerId,
											onlyFirstName: true
										});
									}
								});
							},
							get children() {
								return inputField.container;
							}
						})];
					} }),
					createComponent(PopupElement.Footer, { get children() {
						return createComponent(PopupElement.FooterButton, {
							confirm: true,
							langKey: "Save",
							callback: save
						});
					} })
				];
			}
		});
	});
}
//#endregion
export { showEditMemberTagPopup as default };
