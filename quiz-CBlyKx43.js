//# allFunctionsCalledOnLoad
import { a as i18n } from "./langPack-BmdJGr44.js";
import { C as createSignal, M as onCleanup, _ as createMemo, p as createComponent, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { c as insert, g as template, o as className } from "./web-BPyQozky.js";
import { n as PopupElement } from "./indexTsx-v9mB9bAq.js";
import { t as MediaHeader } from "./mediaHeader-CnpQNwOl.js";
import { p as useWallet } from "./stream-DZrVqY75.js";
import { t as wallet_module_default } from "./wallet.module-3nQsE2jy.js";
import { t as WalletHeader } from "./parts-D2eDZtIN.js";
import { t as backupQuizIndexes } from "./rotation-CL3-t-0h.js";
import { i as guardWalletBackupDisable, n as createWalletBackupFlow, t as confirmWalletBackupDisableDone } from "./rotation-BVnFgKfO.js";
import { n as normalizeWalletWord, t as WalletWordFields } from "./wordFields-DESG870k.js";
//#region src/components/wallet/screens/quiz.tsx
var _tmpl$ = /*#__PURE__*/ template(`<div>`);
/**
* "Test Time" (iOS: the import screen's verify mode): before the backup goes away, three words of the phrase just
* written down are asked back — of an update's new phrase one of each half's keys. Wrong ones turn red, the first of
* them shakes and takes the focus; right ones lead to the last question, "Disable Backup?".
*/
function WalletQuizScreen(props) {
	const wallet = useWallet();
	const words = props.params.words;
	const rotation = props.params.mode === "rotation";
	const flow = props.params.flow ?? createWalletBackupFlow(wallet);
	const indexes = backupQuizIndexes(words.length, rotation);
	const numbers = indexes.map((index) => index + 1);
	const [answers, setAnswers] = createSignal(indexes.map(() => ""));
	const [mismatched, setMismatched] = createSignal(/* @__PURE__ */ new Set());
	const [wordlist, setWordlist] = createSignal(/* @__PURE__ */ new Set());
	const [asking, setAsking] = createSignal(false);
	let fields;
	wallet.store.session.getEngine().then((engine) => engine.mnemonicWordlist()).then((list) => setWordlist(new Set(list)));
	guardWalletBackupDisable(wallet, flow, () => !flow.rotationSent);
	const autofocus = window.setTimeout(() => fields?.focus(0), 450);
	onCleanup(() => {
		clearTimeout(autofocus);
		words.fill("");
		if (rotation) wallet.store.session.abandonRotation();
		flow.end();
	});
	const filled = createMemo(() => answers().every((word) => !!word));
	const setWord = (index, word) => {
		setAnswers((list) => list.map((item, i) => i === index ? word : item));
		if (mismatched().has(index)) {
			const next = new Set(mismatched());
			next.delete(index);
			setMismatched(next);
		}
	};
	const onWords = (index, list) => {
		list.slice(0, indexes.length - index).forEach((word, offset) => setWord(index + offset, word));
	};
	const submit = async () => {
		if (asking() || !filled()) return;
		const wrong = [];
		indexes.forEach((wordIndex, i) => {
			if (normalizeWalletWord(answers()[i]) !== words[wordIndex]) wrong.push(i);
		});
		setMismatched(new Set(wrong));
		if (wrong.length) {
			fields?.focus(wrong[0]);
			fields?.shake(wrong[0]);
			return;
		}
		setAsking(true);
		fields?.blur();
		try {
			await confirmWalletBackupDisableDone(wallet, flow, rotation);
		} finally {
			setAsking(false);
		}
	};
	return [
		createComponent(WalletHeader, {
			title: "WalletTestPhrase",
			back: true
		}),
		(() => {
			var _el$ = _tmpl$();
			insert(_el$, createComponent(MediaHeader, { get children() {
				return [createComponent(MediaHeader.Sticker, {
					name: "WalletWordCheck",
					size: 100,
					restartOnClick: false
				}), createComponent(MediaHeader.Subtitle, { get children() {
					return i18n("WalletTestPhraseInfo", numbers.map(String));
				} })];
			} }), null);
			insert(_el$, createComponent(WalletWordFields, {
				numbers,
				words: answers,
				setWord,
				wordlist,
				mismatched,
				get disabled() {
					return asking();
				},
				onWords,
				onSubmit: submit,
				canSubmit: filled,
				ref: (handle) => fields = handle
			}), null);
			createRenderEffect(() => className(_el$, wallet_module_default.body));
			return _el$;
		})(),
		createComponent(PopupElement.Footer, { get children() {
			return createComponent(PopupElement.FooterButton, {
				langKey: "WalletContinue",
				get disabled() {
					return !filled() || asking();
				},
				callback: () => {
					submit();
					return false;
				}
			});
		} })
	];
}
//#endregion
export { WalletQuizScreen as default };
