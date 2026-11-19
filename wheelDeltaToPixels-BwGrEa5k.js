//# allFunctionsCalledOnLoad
import { a as i18n } from "./langPack-BmdJGr44.js";
import { C as createSignal, L as untrack, M as onCleanup, N as onMount, R as useContext, p as createComponent } from "./solid-9Vxm0VIz.js";
import { _ as use, c as insert, g as template, u as memo } from "./web-BPyQozky.js";
import { t as ListenerSetter } from "./listenerSetter-BER6qAXn.js";
import { n as attachClickEvent } from "./clickEvent-COk4YpLP.js";
import { i as createPopup, n as PopupElement, t as PopupContext } from "./indexTsx-v9mB9bAq.js";
import { t as InputField } from "./inputField-CaCo30N0.js";
import { r as toastNew } from "./toast-B6VD5M7R.js";
import { i as formatPhoneNumber, t as TelInputField } from "./telInputField-CGJ5qn0G.js";
import { t as EditPeer } from "./editPeer-DiIQE_5N.js";
//#region src/components/popups/createContact.tsx
var _tmpl$ = /*#__PURE__*/ template(`<button class="btn-primary btn-color-primary">`);
var _tmpl$2 = /*#__PURE__*/ template(`<div class=name-fields>`);
function showCreateContactPopup(prefill) {
	function Inner() {
		const context = useContext(PopupContext);
		const middleware = untrack(() => context.middlewareHelper).get();
		const managers = untrack(() => context.managers);
		const listenerSetter = new ListenerSetter();
		const nameInputField = new InputField({
			label: "FirstName",
			name: "create-contact-name",
			maxLength: 70,
			required: true
		});
		nameInputField.container.classList.add("input-field-name");
		const lastNameInputField = new InputField({
			label: "LastName",
			name: "create-contact-lastname",
			maxLength: 70
		});
		const telInputField = new TelInputField({ required: true });
		telInputField.validate = () => {
			return !!telInputField.value.match(/\d/);
		};
		const inputFields = [
			nameInputField,
			lastNameInputField,
			telInputField
		];
		let editPeer;
		let confirmBtn;
		const [avatarNode, setAvatarNode] = createSignal();
		const onInput = () => {
			const name = nameInputField.value + " " + lastNameInputField.value;
			editPeer.avatarElem.render({ peerTitle: name });
		};
		listenerSetter.add(nameInputField.input)("input", onInput);
		listenerSetter.add(lastNameInputField.input)("input", onInput);
		const onConfirm = () => {
			const promise = managers.appUsersManager.importContact(nameInputField.value, lastNameInputField.value, telInputField.value);
			promise.then(() => {
				context.hide();
			}, (err) => {
				if (err.type === "NO_USER") {
					toastNew({ langPackKey: "Contacts.PhoneNumber.NotRegistred" });
					editPeer.disabled = false;
				}
			});
			editPeer.lockWithPromise(promise);
		};
		onCleanup(() => {
			listenerSetter.removeAll();
		});
		onMount(() => {
			editPeer = new EditPeer({
				inputFields,
				listenerSetter,
				doNotEditAvatar: true,
				nextBtn: confirmBtn,
				avatarSize: 100,
				middleware
			});
			setAvatarNode(editPeer.avatarElem.node);
			attachClickEvent(confirmBtn, onConfirm, { listenerSetter });
			context.setBtnConfirmOnEnter(confirmBtn);
			if (prefill) {
				nameInputField.value = prefill.firstName || "";
				lastNameInputField.value = prefill.lastName || "";
				if (prefill.phone) {
					telInputField.value = prefill.phone;
					return;
				}
			}
			managers.appUsersManager.getSelf().then((user) => {
				if (!middleware()) return;
				const formatted = formatPhoneNumber(user.phone);
				if (formatted.code) telInputField.value = "+" + formatted.code.country_code;
			});
		});
		return [
			createComponent(PopupElement.Header, { get children() {
				return [
					createComponent(PopupElement.CloseButton, {}),
					createComponent(PopupElement.Title, { title: "AddContactTitle" }),
					(() => {
						var _el$ = _tmpl$();
						var _ref$ = confirmBtn;
						typeof _ref$ === "function" ? use(_ref$, _el$) : confirmBtn = _el$;
						insert(_el$, () => i18n("Add"));
						return _el$;
					})()
				];
			} }),
			(() => {
				var _el$2 = _tmpl$2();
				insert(_el$2, () => nameInputField.container, null);
				insert(_el$2, () => lastNameInputField.container, null);
				insert(_el$2, avatarNode, null);
				return _el$2;
			})(),
			memo(() => telInputField.container)
		];
	}
	createPopup(() => createComponent(PopupElement, {
		"class": "popup-create-contact",
		closable: false,
		old: true,
		get children() {
			return createComponent(Inner, {});
		}
	}));
}
//#endregion
//#region src/helpers/dom/wheelDeltaToPixels.ts
/**
* A wheel's delta in pixels. A mouse that scrolls by lines or by pages reports those (`deltaMode`
* 1 and 2): a line is counted as 16px, and a page as the scrolled element's own size.
*/
function wheelDeltaToPixels(delta, deltaMode, pageSize) {
	return delta * (deltaMode === 1 ? 16 : deltaMode === 2 ? pageSize : 1);
}
//#endregion
export { showCreateContactPopup as n, wheelDeltaToPixels as t };
