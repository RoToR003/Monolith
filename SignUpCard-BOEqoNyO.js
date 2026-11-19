//# allFunctionsCalledOnLoad
import { a as blurActiveElement } from "./appNavigationController-Ct0fx8yF.js";
import { a as i18n } from "./langPack-BmdJGr44.js";
import { C as createSignal, N as onMount, p as createComponent } from "./solid-9Vxm0VIz.js";
import { g as template, u as memo } from "./web-BPyQozky.js";
import { t as Button } from "./buttonTsx-Bwphkm9r.js";
import { t as InputField } from "./inputField-CaCo30N0.js";
import { t as AvatarEdit } from "./avatarEdit-Cnvqr5-1.js";
import { n as wrapEmojiText } from "./wrapEmojiText-DT39R5Tj.js";
import { t as MediaHeader } from "./mediaHeader-CnpQNwOl.js";
import { n as useAuthFlow, t as authFlow_module_default } from "./mountAuthFlow-D-_L6zCe.js";
import { t as AuthCard } from "./AuthCard-CS3Ku-Aa.js";
//#region src/pages/cards/SignUpCard.tsx
var _tmpl$ = /*#__PURE__*/ template(`<svg xmlns=http://www.w3.org/2000/svg class=preloader-circular viewBox="25 25 50 50"><circle class=preloader-path cx=50 cy=50 r=20 fill=none stroke-miterlimit=10>`);
/**
* Card variant of `pageSignUp`. Avatar uploader (canvas + camera-add icon)
* and two name inputs. The card title doubles as a live preview of the
* entered full name.
*/
function SignUpCard(props) {
	const { managers, toIm, isLeaving } = useAuthFlow();
	const [submitting, setSubmitting] = createSignal(false);
	const [signUpKey, setSignUpKey] = createSignal("StartMessaging");
	let uploadAvatar;
	const avatarEdit = new AvatarEdit((payload) => {
		uploadAvatar = payload;
	}, {
		managers,
		isAlive: () => !isLeaving()
	});
	const nameInputField = new InputField({
		label: "FirstName",
		maxLength: 70
	});
	const lastNameInputField = new InputField({
		label: "LastName",
		maxLength: 64
	});
	const [titleContent, setTitleContent] = createSignal(i18n("YourName"));
	function handleNameInput() {
		const name = nameInputField.value || "";
		const lastName = lastNameInputField.value || "";
		const fullName = name || lastName ? (name + " " + lastName).trim() : "";
		setTitleContent(fullName ? wrapEmojiText(fullName) : i18n("YourName"));
	}
	nameInputField.input.addEventListener("input", handleNameInput);
	lastNameInputField.input.addEventListener("input", handleNameInput);
	async function sendAvatar() {
		if (!uploadAvatar) return;
		const [file, video] = await Promise.all([uploadAvatar.file(), uploadAvatar.video?.()]);
		await managers.appProfileManager.uploadProfilePhoto({
			file,
			video,
			videoStartTs: uploadAvatar.videoStartTs
		});
	}
	function onSubmit() {
		if (nameInputField.input.classList.contains("error") || lastNameInputField.input.classList.contains("error")) return;
		if (!nameInputField.value.length) {
			nameInputField.input.classList.add("error");
			return;
		}
		setSubmitting(true);
		const name = nameInputField.value.trim();
		const lastName = lastNameInputField.value.trim();
		const params = {
			phone_number: props.spec.payload.phone_number,
			phone_code_hash: props.spec.payload.phone_code_hash,
			first_name: name,
			last_name: lastName
		};
		setSignUpKey("PleaseWait");
		managers.appAccountManager.signUp(params).then(async (response) => {
			switch (response._) {
				case "auth.authorization":
					await managers.apiManager.setUser(response.user);
					sendAvatar().finally(() => {
						toIm();
					});
					break;
				default:
					setSignUpKey(response._);
					setSubmitting(false);
			}
		}).catch((err) => {
			setSubmitting(false);
			switch (err.type) {
				default: setSignUpKey(err.type);
			}
		});
	}
	onMount(() => {
		managers.appStateManager.pushToState("authState", {
			_: "authStateSignUp",
			authCode: props.spec.payload
		});
		blurActiveElement();
	});
	return createComponent(AuthCard, {
		get ["class"]() {
			return authFlow_module_default.pageSignUp;
		},
		get header() {
			return createComponent(MediaHeader, { get children() {
				return [
					createComponent(MediaHeader.Sticker, {
						get element() {
							return avatarEdit.container;
						},
						size: 120
					}),
					createComponent(MediaHeader.Title, {
						tag: "h1",
						get children() {
							return titleContent();
						}
					}),
					createComponent(MediaHeader.Subtitle, { get children() {
						return i18n("Login.Register.Subtitle");
					} })
				];
			} });
		},
		get children() {
			return [
				memo(() => nameInputField.container),
				memo(() => lastNameInputField.container),
				createComponent(Button, {
					"class": "btn-primary btn-color-primary",
					get disabled() {
						return submitting();
					},
					onClick: onSubmit,
					get children() {
						return [memo(() => i18n(signUpKey())), memo(() => memo(() => !!submitting())() && _tmpl$())];
					}
				})
			];
		}
	});
}
//#endregion
export { SignUpCard as default };
