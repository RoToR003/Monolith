//# allFunctionsCalledOnLoad
//#region src/helpers/string/removeAccents.ts
/**
* The letters an accented one is folded down to, each followed by everything that folds to it. It is
* tdesktop's table as it stands, quirks included (`Ĺ` folds to `a` there), since what is sorted with
* it has to come out in the order tdesktop puts it in. Its combining marks are left out - those are
* dropped before the table is ever looked at.
*/
var FOLDED_TO = {
	"0": "０",
	"1": "１",
	"2": "２",
	"3": "３",
	"4": "４",
	"5": "５",
	"6": "６",
	"7": "７",
	"8": "８",
	"9": "９",
	A: "Ａ",
	B: "Ｂ",
	C: "Ｃ",
	D: "Ｄ",
	E: "Ｅ",
	F: "Ｆ",
	G: "Ｇ",
	H: "Ｈ",
	I: "Ｉ",
	J: "Ｊ",
	K: "Ｋ",
	L: "Ｌ",
	M: "Ｍ",
	N: "Ｎ",
	O: "Ｏ",
	P: "Ｐ",
	Q: "Ｑ",
	R: "Ｒ",
	S: "Ｓ",
	T: "Ｔ",
	U: "Ｕ",
	V: "Ｖ",
	W: "Ｗ",
	X: "Ｘ",
	Y: "Ｙ",
	Z: "Ｚ",
	a: "ÀÁÂÃÄÅàáâãäåĀāĂăĄąĹǍǎǞǟǠǡǢǣǺǻǼǽȀȁȂȃȦȧȺḀḁẚẠạẢảẤấẦầẨẩẪẫẬậẮắẰằẲẳẴẵẶặⱥａ",
	b: "ƀƁƂƃɃɓᵬḂḃḄḅḆḇｂ",
	c: "ÇçĆćĈĉĊċČčƇƈȻȼɕḈḉｃ",
	d: "ðĎďĐđƉƊƋƌȡɖɗᵭḊḋḌḍḎḏḐḑḒḓｄ",
	e: "ÈÉÊËèéêëĒēĔĕĖėĘęĚěƎƏǝȄȅȆȇȨȩɆɇɚɝḔḕḖḗḘḙḚḛḜḝẸẹẺẻẼẽẾếỀềỂểỄễỆệｅ",
	f: "ƑƒᵮḞḟｆ",
	g: "ĜĝĞğĠġĢģƓǤǥǦǧǴǵɠḠḡｇ",
	h: "ĤĥĦħȞȟḢḣḤḥḦḧḨḩḪḫẖⱧⱨｈ",
	i: "ÌÍÎÏìíîïĨĩĪīĬĭĮįİıƗǏǐȈȉȊȋɨḬḭḮḯỈỉỊịｉ",
	j: "ĴĵǰȷɈɉɟʄʝｊ",
	k: "ĶķƘƙǨǩḰḱḲḳḴḵⱩⱪｋ",
	l: "ĺĻļĽľĿŀŁłƚȴȽɫɬɭḶḷḸḹḺḻḼḽⱠⱡⱢｌ",
	m: "ɱḾḿṀṁṂṃｍ",
	n: "ÑñŃńŅņŇňƝƞǸǹȠȵɲɳṄṅṆṇṈṉṊṋｎ",
	o: "ÒÓÔÕÖØòóôõöøŌōŎŏŐőƟƠơǑǒǪǫǬǭǾǿȌȍȎȏȪȫȬȭȮȯȰȱɵṌṍṎṏṐṑṒṓỌọỎỏỐốỒồỔổỖỗỘộỚớỜờỞởỠỡỢợｏ",
	p: "ƤƥṔṕṖṗⱣｐ",
	q: "Ɋɋʠｑ",
	r: "ŔŕŖŗŘřȐȑȒȓɌɍɼɽɾᵲᵳṘṙṚṛṜṝṞṟⱤｒ",
	s: "ßŚśŜŝŞşŠšȘșʂṠṡṢṣṤṥṦṧṨṩẛｓ",
	t: "ÞþŢţŤťŦŧƫƬƭƮȚțȶȾʈᵵṪṫṬṭṮṯṰṱẗⱦｔ",
	u: "ÙÚÛÜùúûüŨũŪūŬŭŮůŰűŲųƯưǓǔǕǖǗǘǙǚǛǜȔȕȖȗɄʉṲṳṴṵṶṷṸṹṺṻỤụỦủỨứỪừỬửỮữỰựｕ",
	v: "ƲʋṼṽṾṿｖ",
	w: "ŴŵẀẁẂẃẄẅẆẇẈẉẘｗ",
	x: "ẊẋẌẍｘ",
	y: "ÝýÿŶŷŸƳƴȲȳɎɏʏẎẏẙỲỳỴỵỶỷỸỹｙ",
	z: "ŹźŻżŽžƵƶƺǮǯȤȥʐʑẐẑẒẓẔẕⱫⱬｚ",
	"е": "ё"
};
var ACCENTS = /* @__PURE__ */ new Map();
for (const to in FOLDED_TO) for (const from of FOLDED_TO[to]) ACCENTS.set(from, to);
/** A diacritic or a variation selector - what tdesktop's `IsDiacritic` drops */
var DIACRITIC_REGEXP = /\p{Mn}/u;
function isDiacritic(ch, code) {
	return DIACRITIC_REGEXP.test(ch) || code === 1652 || code >= 64606 && code <= 64611;
}
/**
* Drops the diacritics from a text and folds the accented letters down to the plain ones, as
* tdesktop does it: one UTF-16 unit at a time, so a surrogate pair goes through as it is (nothing
* outside the BMP is folded there either).
*/
function removeAccents(text) {
	let result = "";
	for (let i = 0, length = text.length; i < length; ++i) {
		const ch = text[i];
		const code = ch.charCodeAt(0);
		if (code < 128) result += ch;
		else if (!isDiacritic(ch, code)) result += ACCENTS.get(ch) ?? ch;
	}
	return result;
}
//#endregion
//#region src/lib/appManagers/utils/users/getUserStatusForSort.ts
/**
* What a user's last-seen status weighs when users are put in order of how recently they were
* seen: the time for an exact one, and a small rank for the approximate ones, which the server
* gives for users who hide theirs - so any exact time comes before any of those.
*/
function getUserStatusForSort(status) {
	if (status) {
		const expires = status._ === "userStatusOnline" ? status.expires : status._ === "userStatusOffline" ? status.was_online : 0;
		if (expires) return expires;
		switch (status._) {
			case "userStatusRecently": return 3;
			case "userStatusLastWeek": return 2;
			case "userStatusLastMonth": return 1;
		}
	}
	return 0;
}
var LETTER_REGEXP = /\p{L}/u;
/**
* The name a user is sorted by, put together the way tdesktop's `UserData::setName` does it: a
* blank first name leaves the last name alone, otherwise it is "first last" (`langFullName`).
*/
function getUserSortName(user) {
	const firstName = user.first_name || "";
	const lastName = user.last_name || "";
	if (!firstName.trim()) return lastName;
	return lastName ? firstName + " " + lastName : firstName;
}
/**
* tdesktop's `TextUtilities::NameSortKey`: the name with its accents folded away, in lower case.
* Keys are compared unit by unit, as `QString::compare` does - never by locale.
*/
function getNameSortKey(name) {
	return removeAccents(name).toLowerCase();
}
/**
* The section a key is listed under, as tdesktop's `ContactsBoxController::applySectionHeaders`
* has it: the key's first letter in upper case, or `#` for a key that does not start with one.
* Like a `QChar` it looks at one UTF-16 unit, so half of a surrogate pair is no letter.
*/
function getNameSortSection(key) {
	const first = key[0];
	if (!first || !LETTER_REGEXP.test(first)) return "#";
	const upper = first.toUpperCase();
	return upper.length === 1 ? upper : first;
}
function compareKeys(a, b) {
	return a < b ? -1 : a > b ? 1 : 0;
}
/**
* Puts contacts in the order a mode lists them in. By name it is tdesktop's order, and every
* contact comes with the section it is listed under - except that the names that do not start
* with a letter are all gathered in one `#` section at the end, the way Android puts its `#` last:
* in tdesktop's order a name starting with a digit comes before the letters and one starting with
* an emoji after all of them, and `#` would head two sections. By last seen the most recent come
* first, and the ones seen equally recently keep their alphabetical order - the list tdesktop
* sorts by presence is the alphabetical one, and its sort is stable.
*/
function sortContacts(peerIds, mode, getUser) {
	const keys = /* @__PURE__ */ new Map();
	for (const peerId of peerIds) {
		const user = getUser(peerId.toUserId());
		keys.set(peerId, getNameSortKey(user ? getUserSortName(user) : ""));
	}
	const byName = peerIds.slice().sort((a, b) => compareKeys(keys.get(a), keys.get(b)));
	if (mode === "name") {
		const lettered = [], sections = [], nonLettered = [];
		for (const peerId of byName) {
			const section = getNameSortSection(keys.get(peerId));
			if (section === "#") nonLettered.push(peerId);
			else {
				lettered.push(peerId);
				sections.push(section);
			}
		}
		return {
			peerIds: lettered.concat(nonLettered),
			sections: sections.concat(nonLettered.map(() => "#"))
		};
	}
	const statuses = /* @__PURE__ */ new Map();
	for (const peerId of peerIds) statuses.set(peerId, getUserStatusForSort(getUser(peerId.toUserId())?.status));
	return { peerIds: byName.sort((a, b) => statuses.get(b) - statuses.get(a)) };
}
//#endregion
export { sortContacts as n, getUserStatusForSort as r, getUserSortName as t };
