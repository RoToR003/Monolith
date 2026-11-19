//# allFunctionsCalledOnLoad
import { t as base64ToBytes } from "./base64ToBytes-BKoIm5Yd.js";
//#region src/environment/webAuthn.ts
var IS_WEB_AUTHN_SUPPORTED = navigator.credentials && typeof PublicKeyCredential !== "undefined" && "parseCreationOptionsFromJSON" in PublicKeyCredential;
//#endregion
//#region src/lib/appManagers/utils/account/getInputPasskeyResponse.ts
function getInputPasskey(credential) {
	const { response } = credential.toJSON();
	const clientData = atob(response.clientDataJSON);
	let ret;
	if ("attestationObject" in response) ret = {
		_: "inputPasskeyResponseRegister",
		client_data: {
			_: "dataJSON",
			data: clientData
		},
		attestation_data: base64ToBytes(response.attestationObject)
	};
	else ret = {
		_: "inputPasskeyResponseLogin",
		client_data: {
			_: "dataJSON",
			data: clientData
		},
		authenticator_data: base64ToBytes(response.authenticatorData),
		signature: base64ToBytes(response.signature),
		user_handle: atob(response.userHandle)
	};
	return ret;
}
function getInputPasskeyCredential(credential) {
	const response = getInputPasskey(credential);
	const json = credential.toJSON();
	return {
		_: "inputPasskeyCredentialPublicKey",
		id: json.id,
		raw_id: json.rawId,
		response
	};
}
//#endregion
export { IS_WEB_AUTHN_SUPPORTED as n, getInputPasskeyCredential as t };
