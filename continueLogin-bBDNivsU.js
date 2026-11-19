//# allFunctionsCalledOnLoad
import { r as toastNew } from "./toast-B6VD5M7R.js";
import { d as withPhoneNumber, u as sentCodeToCardSpec } from "./sentCode-CjBd3iOg.js";
//#region src/pages/continueLogin.ts
async function continueLogin(answer, flow) {
	if (answer._ !== "auth.sentCodeSuccess") {
		const sentCode = withPhoneNumber(answer, flow.phone_number);
		(flow.onSentCode ?? ((code) => flow.navigate(sentCodeToCardSpec(code))))(sentCode);
		return;
	}
	const { authorization } = answer;
	if (authorization._ === "auth.authorization") {
		await flow.managers.apiManager.setUser(authorization.user);
		await flow.toIm();
		return;
	}
	if (flow.phone_code_hash) {
		flow.navigate({
			name: "signUp",
			payload: {
				phone_number: flow.phone_number,
				phone_code_hash: flow.phone_code_hash
			}
		});
		return;
	}
	console.error("auth: sign-up required, but no phone_code_hash to sign up with", answer);
	toastNew({ langPackKey: "Error.AnError" });
	flow.navigate({ name: "signIn" });
}
//#endregion
export { continueLogin as t };
