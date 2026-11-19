//# allFunctionsCalledOnLoad
import { u as langPack_default } from "./langPack-BmdJGr44.js";
//#region src/helpers/getPollCountryName.ts
function getPollCountryName(iso2) {
	if (iso2?.toUpperCase() === "FT") return "Fragment";
	const country = langPack_default.countriesList.find((item) => item.iso2.toLowerCase() === iso2?.toLowerCase());
	return country ? langPack_default.format(country.default_name, true) : iso2;
}
//#endregion
export { getPollCountryName as t };
