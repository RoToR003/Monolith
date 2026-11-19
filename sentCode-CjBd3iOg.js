//# allFunctionsCalledOnLoad
//#region src/pages/sentCode.ts
/** Falls back to 5 the way the other clients do when the type carries no length. */
var DEFAULT_CODE_LENGTH = 5;
/** `auth.resendCode` keeps the phone number, which only the tab (not the server) knows. */
function withPhoneNumber(sentCode, phone_number) {
	return Object.assign(sentCode, { phone_number });
}
function getCodeInputKind(type) {
	return type._ === "auth.sentCodeTypeSmsWord" || type._ === "auth.sentCodeTypeSmsPhrase" ? "text" : "digits";
}
function getCodeLength(type) {
	return type.length ?? DEFAULT_CODE_LENGTH;
}
/**
* The word/phrase types carry the start of the secret the SMS holds, so the
* client can reject a typo before spending a server attempt.
*/
function getCodeBeginning(type) {
	return type._ === "auth.sentCodeTypeSmsWord" || type._ === "auth.sentCodeTypeSmsPhrase" ? type.beginning : void 0;
}
/** Whether what the user typed can still grow into the expected word/phrase. */
function beginsOk(value, beginning) {
	if (!beginning) return true;
	const typed = value.trimStart().toLowerCase();
	const expected = beginning.toLowerCase();
	const length = Math.min(typed.length, expected.length);
	if (length <= 0) return true;
	return typed.slice(0, length) === expected.slice(0, length);
}
/**
* The code is sent as `phone_code` everywhere except for a login email, where it
* proves the email instead and travels in `email_verification`.
*/
function isEmailCode(type) {
	return type._ === "auth.sentCodeTypeEmailCode";
}
/**
* The `phone_code_hash` the whole sign-in hangs on is dead, so there is nothing
* left to continue — the flow has to start over from the phone number. Worth
* checking wherever a step other than the code card spends that hash (adding a
* login email can take longer than the code stays valid), because the auth cards
* have no back button to get out of a dead end with.
*/
function isPhoneLoginExpired(err) {
	return err.type === "PHONE_CODE_EXPIRED" || err.type === "PHONE_CODE_EMPTY" || err.type === "PHONE_CODE_INVALID";
}
/** Which card continues the login for the code the server just sent. */
function sentCodeToCardSpec(sentCode) {
	if (sentCode.type._ === "auth.sentCodeTypeSetUpEmailRequired") return {
		name: "emailSetup",
		payload: {
			phone_number: sentCode.phone_number,
			phone_code_hash: sentCode.phone_code_hash
		}
	};
	return {
		name: "authCode",
		payload: sentCode
	};
}
/**
* The label offering the next delivery method once the countdown runs out —
* `next_type` says what `auth.resendCode` will send.
*/
function getResendLangKey(nextType) {
	switch (nextType?._) {
		case "auth.codeTypeSms": return "Login.Code.ResendSms";
		case "auth.codeTypeCall":
		case "auth.codeTypeMissedCall":
		case "auth.codeTypeFlashCall": return "Login.Code.ResendCall";
		case "auth.codeTypeFragmentSms": return "Login.Code.ResendFragment";
		default: return;
	}
}
/** The countdown shown until that method becomes available. */
function getResendPendingLangKey(nextType) {
	return nextType?._ === "auth.codeTypeCall" || nextType?._ === "auth.codeTypeMissedCall" || nextType?._ === "auth.codeTypeFlashCall" ? "Login.Code.CallAvailableIn" : "Login.Code.SmsAvailableIn";
}
/**
* Seconds until the next method is offered: the server's `timeout`, and none at
* all when it names none, the way iOS does it. A code via Fragment is there to
* be picked up the moment it is asked for, so it is offered straight away even
* with a timeout, the way Android does it.
*/
function getResendTimeout(sentCode) {
	if (sentCode.next_type?._ === "auth.codeTypeFragmentSms") return 0;
	return sentCode.timeout || 0;
}
//#endregion
export { getResendLangKey as a, isEmailCode as c, withPhoneNumber as d, getCodeLength as i, isPhoneLoginExpired as l, getCodeBeginning as n, getResendPendingLangKey as o, getCodeInputKind as r, getResendTimeout as s, beginsOk as t, sentCodeToCardSpec as u };
