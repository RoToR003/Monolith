//# allFunctionsCalledOnLoad
//#region src/lib/pluralPolyfill.ts
var NumberPluralizationFormZero = "zero";
var NumberPluralizationFormOne = "one";
var NumberPluralizationFormTwo = "two";
var NumberPluralizationFormFew = "few";
var NumberPluralizationFormMany = "many";
var NumberPluralizationFormOther = "other";
function numberPluralizationForm(lc, n) {
	switch (lc) {
		case 27764:
			if (n % 10 == 1 && (n % 100 < 11 || n % 100 > 19)) return NumberPluralizationFormOne;
			if (n % 10 >= 2 && n % 10 <= 9 && (n % 100 < 11 || n % 100 > 19)) return NumberPluralizationFormFew;
			break;
		case 27766:
			if (n == 0) return NumberPluralizationFormZero;
			if (n % 10 == 1 && n % 100 != 11) return NumberPluralizationFormOne;
			break;
		case 25465:
			if (n == 2) return NumberPluralizationFormTwo;
			if (n == 3) return NumberPluralizationFormFew;
			if (n == 0) return NumberPluralizationFormZero;
			if (n == 1) return NumberPluralizationFormOne;
			if (n == 6) return NumberPluralizationFormMany;
			break;
		case 25189:
		case 25203:
		case 26738:
		case 29301:
		case 29544:
		case 29554:
		case 30059:
			if (n % 10 == 1 && n % 100 != 11) return NumberPluralizationFormOne;
			if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 12 || n % 100 > 14)) return NumberPluralizationFormFew;
			if (n % 10 == 0 || n % 10 >= 5 && n % 10 <= 9 || n % 100 >= 11 && n % 100 <= 14) return NumberPluralizationFormMany;
			break;
		case 7041896:
			if (n == 0) return NumberPluralizationFormZero;
			if (n == 1) return NumberPluralizationFormOne;
			break;
		case 7563369:
			if (n >= 2 && n <= 10) return NumberPluralizationFormFew;
			if (n >= 0 && n <= 1) return NumberPluralizationFormOne;
			break;
		case 26725:
			if (n == 2) return NumberPluralizationFormTwo;
			if (n == 1) return NumberPluralizationFormOne;
			if (n != 0 && n % 10 == 0) return NumberPluralizationFormMany;
			break;
		case 25459:
		case 29547:
			if (n == 1) return NumberPluralizationFormOne;
			if (n >= 2 && n <= 4) return NumberPluralizationFormFew;
			break;
		case 25202:
			if (n != 0 && n % 1e6 == 0) return NumberPluralizationFormMany;
			if (n % 10 == 1 && n % 100 != 11 && n % 100 != 71 && n % 100 != 91) return NumberPluralizationFormOne;
			if (n % 10 == 2 && n % 100 != 12 && n % 100 != 72 && n % 100 != 92) return NumberPluralizationFormTwo;
			if ((n % 10 >= 3 && n % 10 <= 4 || n % 10 == 9) && (n % 100 < 10 || n % 100 > 19) && (n % 100 < 70 || n % 100 > 79) && (n % 100 < 90 || n % 100 > 99)) return NumberPluralizationFormFew;
			break;
		case 29548:
			if (n % 100 == 2) return NumberPluralizationFormTwo;
			if (n % 100 == 1) return NumberPluralizationFormOne;
			if (n % 100 >= 3 && n % 100 <= 4) return NumberPluralizationFormFew;
			break;
		case 7102823:
			if (n == 0) return NumberPluralizationFormZero;
			if (n >= 0 && n <= 2 && n != 0 && n != 2) return NumberPluralizationFormOne;
			break;
		case 28780:
			if (n == 1) return NumberPluralizationFormOne;
			if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 12 || n % 100 > 14)) return NumberPluralizationFormFew;
			if (n != 1 && n % 10 >= 0 && n % 10 <= 1 || n % 10 >= 5 && n % 10 <= 9 || n % 100 >= 12 && n % 100 <= 14) return NumberPluralizationFormMany;
			break;
		case 26468:
			if (n == 2 || n == 12) return NumberPluralizationFormTwo;
			if (n == 1 || n == 11) return NumberPluralizationFormOne;
			if (n >= 3 && n <= 10 || n >= 13 && n <= 19) return NumberPluralizationFormFew;
			break;
		case 26486:
			if (n % 10 >= 1 && n % 10 <= 2 || n % 20 == 0) return NumberPluralizationFormOne;
			break;
		case 28011:
			if (n % 10 == 1 && n != 11) return NumberPluralizationFormOne;
			break;
		case 28020:
			if (n == 1) return NumberPluralizationFormOne;
			if (n % 100 >= 11 && n % 100 <= 19) return NumberPluralizationFormMany;
			if (n == 0 || n % 100 >= 2 && n % 100 <= 10) return NumberPluralizationFormFew;
			break;
		case 28015:
		case 29295:
			if (n == 1) return NumberPluralizationFormOne;
			if (n == 0 || n != 1 && n % 100 >= 1 && n % 100 <= 19) return NumberPluralizationFormFew;
			break;
		case 26465:
			if (n == 2) return NumberPluralizationFormTwo;
			if (n == 1) return NumberPluralizationFormOne;
			if (n >= 3 && n <= 6) return NumberPluralizationFormFew;
			if (n >= 7 && n <= 10) return NumberPluralizationFormMany;
			break;
		case 26214:
		case 26226:
		case 7037282:
			if (n >= 0 && n <= 2 && n != 2) return NumberPluralizationFormOne;
			break;
		case 26997:
		case 27511:
		case 29541:
		case 7233905:
		case 7564641:
		case 7564649:
		case 7564650:
		case 7564654:
		case 7564659:
			if (n == 2) return NumberPluralizationFormTwo;
			if (n == 1) return NumberPluralizationFormOne;
			break;
		case 24939:
		case 24941:
		case 25192:
		case 26729:
		case 27758:
		case 28007:
		case 29801:
		case 29804:
		case 30561:
		case 6711660:
		case 6780279:
		case 7238511:
			if (n >= 0 && n <= 1) return NumberPluralizationFormOne;
			break;
		case 7633517:
			if (n >= 0 && n <= 1 || n >= 11 && n <= 99) return NumberPluralizationFormOne;
			break;
		case 24934:
		case 25191:
		case 25198:
		case 25441:
		case 25697:
		case 25701:
		case 25718:
		case 25957:
		case 25964:
		case 25966:
		case 25967:
		case 25971:
		case 25972:
		case 25973:
		case 26217:
		case 26223:
		case 26233:
		case 26476:
		case 26485:
		case 26721:
		case 26995:
		case 26996:
		case 27499:
		case 27500:
		case 27507:
		case 27509:
		case 27513:
		case 27746:
		case 27751:
		case 28012:
		case 28014:
		case 28018:
		case 28258:
		case 28260:
		case 28261:
		case 28268:
		case 28270:
		case 28271:
		case 28274:
		case 28281:
		case 28525:
		case 28530:
		case 28531:
		case 28769:
		case 28787:
		case 28788:
		case 29293:
		case 29550:
		case 29551:
		case 29553:
		case 29555:
		case 29556:
		case 29558:
		case 29559:
		case 29793:
		case 29797:
		case 29803:
		case 29806:
		case 29811:
		case 30066:
		case 30309:
		case 30319:
		case 30824:
		case 31349:
		case 6386529:
		case 6386548:
		case 6448493:
		case 6448506:
		case 6451832:
		case 6514535:
		case 6514802:
		case 6515554:
		case 6714738:
		case 6779767:
		case 6840695:
		case 6973295:
		case 6974819:
		case 7037290:
		case 7037799:
		case 7039850:
		case 7041890:
		case 7168371:
		case 7169903:
		case 7233896:
		case 7237224:
		case 7240046:
		case 7364976:
		case 7499622:
		case 7501675:
		case 7561585:
		case 7562600:
		case 7566201:
		case 7567730:
		case 7628143:
		case 7629159:
		case 7763310:
		case 7823717:
		case 7892839:
			if (n == 1) return NumberPluralizationFormOne;
			break;
		case 24946:
			if (n == 2) return NumberPluralizationFormTwo;
			if (n == 1) return NumberPluralizationFormOne;
			if (n == 0) return NumberPluralizationFormZero;
			if (n % 100 >= 3 && n % 100 <= 10) return NumberPluralizationFormFew;
			if (n % 100 >= 11 && n % 100 <= 99) return NumberPluralizationFormMany;
	}
	return NumberPluralizationFormOther;
}
function languageCodehash(code) {
	let lc = 0;
	for (let i = 0; i < code.length; ++i) lc = (lc << 8) + code.charCodeAt(i);
	return lc;
}
var Intl = { PluralRules: class {
	constructor(code) {
		this.select = numberPluralizationForm.bind(null, languageCodehash(code));
	}
} };
//#endregion
export { Intl as default };
