webpackJsonp([2],{

/***/ "./src/AppBundle/Resources/public/javascript/ca/ca.api.content.js":
/*!************************************************************************!*\
  !*** ./src/AppBundle/Resources/public/javascript/ca/ca.api.content.js ***!
  \************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(jQuery, $) {/**
* Created by JuanCruz on 4/1/2018.
*/

var __apiStore = {
    tournaments: {}
};

window.ContentArena = window.ContentArena || {};
ContentArena.ContentApi = ContentArena.ContentApi || {};

ContentArena.ContentApi = {
    saveContentAsDraft: function saveContentAsDraft(content) {
        var deferred = jQuery.Deferred(),
            _this = this;

        $.ajax({
            url: envhosturl + "content/draft/save",
            type: "POST",
            data: JSON.stringify(content),
            contentType: "application/json",
            success: function success(response) {
                deferred.resolve(response);
            },
            error: function error(data, status) {
                deferred.reject({
                    data: data,
                    status: status
                });
            }
        });

        return deferred.promise();
    }
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js"), __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./src/AppBundle/Resources/public/javascript/ca/ca.api.js":
/*!****************************************************************!*\
  !*** ./src/AppBundle/Resources/public/javascript/ca/ca.api.js ***!
  \****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($, jQuery) {/**
 * Created by JuanCruz on 4/1/2018.
 */

var __apiStore = {
    tournaments: {}
};

window.ContentArena = window.ContentArena || {};

ContentArena.Api = {
    sortByLabel: function sortByLabel(a, b) {
        return a.label > b.label ? 1 : b.label > a.label ? -1 : 0;
    },
    prepareList: function prepareList(list, categoryId) {

        var _this = this;

        list = $.map(list, function (item) {

            // Filter by category
            if (categoryId && item.category['@attributes'].id != categoryId) return null;

            return { name: item['@attributes'].name, external_id: item['@attributes'].id };
        });

        list.sort(_this.sortByLabel);

        return list;
    },
    getContent: function getContent(filter) {
        var deferred = jQuery.Deferred(),
            _this = this;

        $.ajax({
            url: envhosturl + "buy/search",
            type: "POST",
            data: filter,
            success: function success(response) {
                deferred.resolve(response);
            },
            error: function error(data, status) {
                deferred.reject({
                    data: data,
                    status: status
                });
            }
        });

        return deferred.promise();
    },
    saveFilter: function saveFilter(filter) {
        var deferred = jQuery.Deferred(),
            _this = this;

        $.ajax({
            url: envhosturl + "buy/filter/save",
            type: "POST",
            data: filter,
            success: function success(response) {
                deferred.resolve(response);
            },
            error: function error(data, status) {
                deferred.reject({
                    data: data,
                    status: status
                });
            }
        });

        return deferred.promise();
    },
    getSports: function getSports() {
        var deferred = jQuery.Deferred(),
            _this = this;

        $.ajax({
            url: hosturl + "v1/feed/sports",
            type: "GET",
            /**
             * @param {{sport:object}} response
             */
            success: function success(response) {

                var sports = _this.prepareList(response.sport);
                deferred.resolve(sports);
            },
            error: function error(data, status) {
                deferred.reject({
                    data: data,
                    status: status
                });
            }
        });

        return deferred.promise();
    },
    getContentDetails: function getContentDetails(id) {
        var deferred = jQuery.Deferred(),
            _this = this;

        $.ajax({
            url: envhosturl + "content/details/",
            type: "POST",
            data: { id: id },
            success: function success(response) {
                deferred.resolve(response);
            },
            error: function error(data, status) {
                deferred.reject({
                    data: data,
                    status: status
                });
            }
        });

        return deferred.promise();
    },
    getPendingListings: function getPendingListings(id) {
        var deferred = jQuery.Deferred(),
            _this = this;

        $.ajax({
            url: envhosturl + "content/pending-listings/",
            type: "POST",
            data: { id: id },
            success: function success(response) {
                deferred.resolve(response);
            },
            error: function error(data, status) {
                deferred.reject({
                    data: data,
                    status: status
                });
            }
        });

        return deferred.promise();
    },
    getCategories: function getCategories(sportId) {
        var deferred = jQuery.Deferred(),
            _this = this,
            list = [],
            cats = [];

        _this.getTournaments(sportId).done(function () {

            if (!__apiStore.tournaments[sportId]) {
                deferred.resolve([]);
                return;
            }

            list = $.map(__apiStore.tournaments[sportId].tournament, function (item) {

                var id = item.category['@attributes'].id;

                if (cats.indexOf(id) !== -1) {
                    return null;
                } else {
                    cats.push(id);
                    return item.category;
                }
            });

            deferred.resolve(_this.prepareList(list));
        });

        return deferred.promise();
    },
    getTournaments: function getTournaments(sportId, categoryId) {
        var deferred = jQuery.Deferred(),
            _this = this;

        if (__apiStore.tournaments[sportId] !== undefined) {
            deferred.resolve(_this.prepareList(__apiStore.tournaments[sportId].tournament, categoryId));
            return deferred.promise();
        }

        $.ajax({
            url: hosturl + "v1/feed/tournaments",
            type: "POST",
            data: { id: sportId },
            /**
             * @param {{tournaments:{tournament:Array}}} response
             */
            success: function success(response) {

                // A comment
                if (response.tournaments === undefined || response.tournaments.tournament === undefined) {
                    deferred.resolve([]);
                    return;
                }

                __apiStore.tournaments[sportId] = response.tournaments;
                deferred.resolve(_this.prepareList(response.tournaments.tournament, categoryId));
            },
            error: function error(data, status) {
                deferred.reject({
                    data: data,
                    status: status
                });
            }
        });
        return deferred.promise();
    },
    getSearchResultInNewListing: function getSearchResultInNewListing(request, response) {
        var availableTags = [];
        $.ajax({
            url: envhosturl + 'search/tournament',
            data: {
                "content": request.term
            },
            traditional: true,
            type: "POST",
            dataType: "json",
            success: function success(data) {

                data.seasons.map(function (item) {
                    item.type = "Season";
                    item.value = item.name;
                    item.label = item.name + " - " + item.type;
                });

                data.sports.map(function (item) {
                    item.type = "Sport";
                    item.value = item.name;
                    item.label = item.name + " - " + item.type;
                });

                data.sportCategories.map(function (item) {
                    item.type = "Country/Category";
                    item.value = item.name;
                    item.label = item.name + " - " + item.type;
                });

                data.tournaments.map(function (item) {
                    item.type = "Tournament";
                    item.value = item.name;
                    item.label = item.name + " - " + item.type;
                });

                response(data.seasons.concat(data.sports.concat(data.sportCategories.concat(data.tournaments))));
            }
        });
    }
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js"), __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./src/AppBundle/Resources/public/javascript/ca/ca.data.js":
/*!*****************************************************************!*\
  !*** ./src/AppBundle/Resources/public/javascript/ca/ca.data.js ***!
  \*****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

/**
 * Created by JuanCruz on 4/1/2018.
 */

window.ContentArena = window.ContentArena || {};

ContentArena.Data = ContentArena.Data || {};
ContentArena.Languages = ContentArena.Languages || {};

ContentArena.Data.TopSports = [{ name: "Soccer", external_id: "sr:sport:1" }, { name: "Basketball", external_id: "sr:sport:2" }, { name: "Baseball", external_id: "sr:sport:3" }, { name: "Tennis", external_id: "sr:sport:5" }, { name: "Cricket", external_id: "sr:sport:21" }, { name: "Field Hockey", external_id: "sr:sport:24" }, { name: "Volleyball", external_id: "sr:sport:23" }, { name: "Table Tennis", external_id: "sr:sport:20" }, { name: "Golf", external_id: "sr:sport:9" }, { name: "American Football", external_id: "sr:sport:16" }, { name: "Handball", external_id: "sr:sport:6" }];

ContentArena.Data.FullSports = [];

ContentArena.Languages.Short = {
    "mdr": "Mandarin",
    "es": "Spanish",
    "en": "English",
    "hi": "Hindi",
    "ar": "Arabic",
    "pt": "Portuguese",
    "bn": "Bengali",
    "ru": "Russian",
    "ja": "Japanese",
    "jv": "Javanese",
    "de": "German",
    "all": "Show All"
};

ContentArena.Languages.Long = {
    "aa": "Afar",
    "af": "Afrikaans",
    "ain": "Ainu",
    "akz": "Alabama",
    "sq": "Albanian",
    "ale": "Aleut",
    "arq": "Algerian Arabic",
    "en_US": "American English",
    "ase": "American Sign Language",
    "am": "Amharic",
    "egy": "Ancient Egyptian",
    "grc": "Ancient Greek",
    "ar": "Arabic",
    "arc": "Aramaic",
    "arp": "Arapaho",
    "arw": "Arawak",
    "hy": "Armenian",
    "as": "Assamese",
    "asa": "Asu",
    "en_AU": "Australian English",
    "de_AT": "Austrian German",
    "ay": "Aymara",
    "az": "Azerbaijani",
    "ban": "Balinese",
    "eu": "Basque",
    "bar": "Bavarian",
    "be": "Belarusian",
    "bn": "Bengali",
    "bik": "Bikol",
    "bin": "Bini",
    "bs": "Bosnian",
    "brh": "Brahui",
    "bra": "Braj",
    "pt_BR": "Brazilian Portuguese",
    "br": "Breton",
    "en_GB": "British English",
    "bg": "Bulgarian",
    "my": "Burmese",
    "frc": "Cajun French",
    "en_CA": "Canadian English",
    "fr_CA": "Canadian French",
    "yue": "Cantonese",
    "car": "Carib",
    "ca": "Catalan",
    "cay": "Cayuga",
    "ceb": "Cebuano",
    "shu": "Chadian Arabic",
    "ce": "Chechen",
    "chr": "Cherokee",
    "qug": "Chimborazo Highland Quichua",
    "zh": "Chinese",
    "chn": "Chinook Jargon",
    "chp": "Chipewyan",
    "cho": "Choctaw",
    "cu": "Church Slavic",
    "cv": "Chuvash",
    "nwc": "Classical Newari",
    "syc": "Classical Syriac",
    "swc": "Congo Swahili",
    "cop": "Coptic",
    "kw": "Cornish",
    "co": "Corsican",
    "cr": "Cree",
    "mus": "Creek",
    "crh": "Crimean Turkish",
    "hr": "Croatian",
    "cs": "Czech",
    "dak": "Dakota",
    "da": "Danish",
    "del": "Delaware",
    "nl": "Dutch",
    "frs": "Eastern Frisian",
    "arz": "Egyptian Arabic",
    "en": "English",
    "eo": "Esperanto",
    "et": "Estonian",
    "pt_PT": "European Portuguese",
    "es_ES": "European Spanish",
    "ee": "Ewe",
    "fan": "Fang",
    "hif": "Fiji Hindi",
    "fj": "Fijian",
    "fil": "Filipino",
    "fi": "Finnish",
    "nl_BE": "Flemish",
    "fon": "Fon",
    "fr": "French",
    "gaa": "Ga",
    "gan": "Gan Chinese",
    "ka": "Georgian",
    "de": "German",
    "got": "Gothic",
    "grb": "Grebo",
    "el": "Greek",
    "gn": "Guarani",
    "gu": "Gujarati",
    "guz": "Gusii",
    "hai": "Haida",
    "ht": "Haitian",
    "hak": "Hakka Chinese",
    "ha": "Hausa",
    "haw": "Hawaiian",
    "he": "Hebrew",
    "hz": "Herero",
    "hi": "Hindi",
    "hit": "Hittite",
    "hmn": "Hmong",
    "hu": "Hungarian",
    "is": "Icelandic",
    "io": "Ido",
    "ig": "Igbo",
    "iu": "Inuktitut",
    "ik": "Inupiaq",
    "ga": "Irish",
    "it": "Italian",
    "jam": "Jamaican Creole English",
    "ja": "Japanese",
    "jv": "Javanese",
    "kaj": "Jju",
    "dyo": "Jola-Fonyi",
    "xal": "Kalmyk",
    "kam": "Kamba",
    "kbl": "Kanembu",
    "kn": "Kannada",
    "kr": "Kanuri",
    "kaa": "Kara-Kalpak",
    "krc": "Karachay-Balkar",
    "krl": "Karelian",
    "ks": "Kashmiri",
    "csb": "Kashubian",
    "kaw": "Kawi",
    "kk": "Kazakh",
    "ken": "Kenyang",
    "kha": "Khasi",
    "km": "Khmer",
    "kho": "Khotanese",
    "khw": "Khowar",
    "ki": "Kikuyu",
    "kmb": "Kimbundu",
    "krj": "Kinaray-a",
    "rw": "Kinyarwanda",
    "kiu": "Kirmanjki",
    "tlh": "Klingon",
    "bkm": "Kom",
    "kv": "Komi",
    "koi": "Komi-Permyak",
    "kg": "Kongo",
    "kok": "Konkani",
    "ko": "Korean",
    "kfo": "Koro",
    "kos": "Kosraean",
    "avk": "Kotava",
    "khq": "Koyra Chiini",
    "ses": "Koyraboro Senni",
    "kpe": "Kpelle",
    "kri": "Krio",
    "kj": "Kuanyama",
    "kum": "Kumyk",
    "ku": "Kurdish",
    "kru": "Kurukh",
    "kut": "Kutenai",
    "nmg": "Kwasio",
    "ky": "Kyrgyz",
    "quc": "K\u02BCiche\u02BC",
    "lad": "Ladino",
    "lah": "Lahnda",
    "lkt": "Lakota",
    "lam": "Lamba",
    "lag": "Langi",
    "lo": "Lao",
    "ltg": "Latgalian",
    "la": "Latin",
    "es_419": "Latin American Spanish",
    "lv": "Latvian",
    "lzz": "Laz",
    "lez": "Lezghian",
    "lij": "Ligurian",
    "li": "Limburgish",
    "ln": "Lingala",
    "lfn": "Lingua Franca Nova",
    "lzh": "Literary Chinese",
    "lt": "Lithuanian",
    "liv": "Livonian",
    "jbo": "Lojban",
    "lmo": "Lombard",
    "nds": "Low German",
    "sli": "Lower Silesian",
    "dsb": "Lower Sorbian",
    "loz": "Lozi",
    "lu": "Luba-Katanga",
    "lua": "Luba-Lulua",
    "lui": "Luiseno",
    "smj": "Lule Sami",
    "lun": "Lunda",
    "luo": "Luo",
    "lb": "Luxembourgish",
    "luy": "Luyia",
    "mde": "Maba",
    "mk": "Macedonian",
    "jmc": "Machame",
    "mad": "Madurese",
    "maf": "Mafa",
    "mag": "Magahi",
    "vmf": "Main-Franconian",
    "mai": "Maithili",
    "mak": "Makasar",
    "mgh": "Makhuwa-Meetto",
    "kde": "Makonde",
    "mg": "Malagasy",
    "ms": "Malay",
    "ml": "Malayalam",
    "mt": "Maltese",
    "mnc": "Manchu",
    "mdr": "Mandarin",
    "man": "Mandingo",
    "mni": "Manipuri",
    "gv": "Manx",
    "mi": "Maori",
    "arn": "Mapuche",
    "mr": "Marathi",
    "chm": "Mari",
    "mh": "Marshallese",
    "mwr": "Marwari",
    "mas": "Masai",
    "mzn": "Mazanderani",
    "byv": "Medumba",
    "men": "Mende",
    "mwv": "Mentawai",
    "mer": "Meru",
    "mgo": "Meta\u02BC",
    "es_MX": "Mexican Spanish",
    "mic": "Micmac",
    "dum": "Middle Dutch",
    "enm": "Middle English",
    "frm": "Middle French",
    "gmh": "Middle High German",
    "mga": "Middle Irish",
    "nan": "Min Nan Chinese",
    "min": "Minangkabau",
    "xmf": "Mingrelian",
    "mwl": "Mirandese",
    "lus": "Mizo",
    "ar_001": "Modern Standard Arabic",
    "moh": "Mohawk",
    "mdf": "Moksha",
    "ro_MD": "Moldavian",
    "lol": "Mongo",
    "mn": "Mongolian",
    "mfe": "Morisyen",
    "ary": "Moroccan Arabic",
    "mos": "Mossi",
    "mul": "Multiple Languages",
    "mua": "Mundang",
    "ttt": "Muslim Tat",
    "mye": "Myene",
    "naq": "Nama",
    "na": "Nauru",
    "nv": "Navajo",
    "ng": "Ndonga",
    "nap": "Neapolitan",
    "ne": "Nepali",
    "new": "Newari",
    "sba": "Ngambay",
    "nnh": "Ngiemboon",
    "jgo": "Ngomba",
    "yrl": "Nheengatu",
    "nia": "Nias",
    "niu": "Niuean",
    "zxx": "No linguistic content",
    "nog": "Nogai",
    "nd": "North Ndebele",
    "frr": "Northern Frisian",
    "se": "Northern Sami",
    "nso": "Northern Sotho",
    "no": "Norwegian",
    "nb": "Norwegian Bokm\xE5l",
    "nn": "Norwegian Nynorsk",
    "nov": "Novial",
    "nus": "Nuer",
    "nym": "Nyamwezi",
    "ny": "Nyanja",
    "nyn": "Nyankole",
    "tog": "Nyasa Tonga",
    "nyo": "Nyoro",
    "nzi": "Nzima",
    "nqo": "N\u02BCKo",
    "oc": "Occitan",
    "oj": "Ojibwa",
    "ang": "Old English",
    "fro": "Old French",
    "goh": "Old High German",
    "sga": "Old Irish",
    "non": "Old Norse",
    "peo": "Old Persian",
    "pro": "Old Proven\xE7al",
    "or": "Oriya",
    "om": "Oromo",
    "osa": "Osage",
    "os": "Ossetic",
    "ota": "Ottoman Turkish",
    "pal": "Pahlavi",
    "pfl": "Palatine German",
    "pau": "Palauan",
    "pi": "Pali",
    "pdc": "Pennsylvania German",
    "fa": "Persian",
    "phn": "Phoenician",
    "pcd": "Picard",
    "pms": "Piedmontese",
    "pdt": "Plautdietsch",
    "pon": "Pohnpeian",
    "pl": "Polish",
    "pnt": "Pontic",
    "pt": "Portuguese",
    "prg": "Prussian",
    "pa": "Punjabi",
    "qu": "Quechua",
    "ro": "Romanian",
    "rm": "Romansh",
    "rom": "Romany",
    "root": "Root",
    "ru": "Russian",
    "rwk": "Rwa",
    "sah": "Sakha",
    "sam": "Samaritan Aramaic",
    "sm": "Samoan",
    "sco": "Scots",
    "gd": "Scottish Gaelic",
    "sly": "Selayar",
    "sel": "Selkup",
    "seh": "Sena",
    "see": "Seneca",
    "sr": "Serbian",
    "sh": "Serbo-Croatian",
    "srr": "Serer",
    "sei": "Seri",
    "ksb": "Shambala",
    "shn": "Shan",
    "sn": "Shona",
    "ii": "Sichuan Yi",
    "scn": "Sicilian",
    "sid": "Sidamo",
    "bla": "Siksika",
    "szl": "Silesian",
    "zh_Hans": "Simplified Chinese",
    "sd": "Sindhi",
    "si": "Sinhala",
    "sms": "Skolt Sami",
    "den": "Slave",
    "sk": "Slovak",
    "sl": "Slovenian",
    "xog": "Soga",
    "sog": "Sogdien",
    "so": "Somali",
    "snk": "Soninke",
    "ckb": "Sorani Kurdish",
    "azb": "South Azerbaijani",
    "nr": "South Ndebele",
    "alt": "Southern Altai",
    "sma": "Southern Sami",
    "st": "Southern Sotho",
    "es": "Spanish",
    "srn": "Sranan Tongo",
    "zgh": "Standard Moroccan Tamazight",
    "suk": "Sukuma",
    "sux": "Sumerian",
    "su": "Sundanese",
    "sus": "Susu",
    "sw": "Swahili",
    "ss": "Swati",
    "sv": "Swedish",
    "fr_CH": "Swiss French",
    "gsw": "Swiss German",
    "de_CH": "Swiss High German",
    "syr": "Syriac",
    "shi": "Tachelhit",
    "tl": "Tagalog",
    "ty": "Tahitian",
    "dav": "Taita",
    "tg": "Tajik",
    "tly": "Talysh",
    "tmh": "Tamashek",
    "ta": "Tamil",
    "trv": "Taroko",
    "twq": "Tasawaq",
    "tt": "Tatar",
    "te": "Telugu",
    "ter": "Tereno",
    "teo": "Teso",
    "tet": "Tetum",
    "th": "Thai",
    "bo": "Tibetan",
    "tig": "Tigre",
    "ti": "Tigrinya",
    "tem": "Timne",
    "tiv": "Tiv",
    "tli": "Tlingit",
    "tpi": "Tok Pisin",
    "tkl": "Tokelau",
    "to": "Tongan",
    "fit": "Tornedalen Finnish",
    "zh_Hant": "Traditional Chinese",
    "tkr": "Tsakhur",
    "tsd": "Tsakonian",
    "tsi": "Tsimshian",
    "ts": "Tsonga",
    "tn": "Tswana",
    "tcy": "Tulu",
    "tum": "Tumbuka",
    "aeb": "Tunisian Arabic",
    "tr": "Turkish",
    "tk": "Turkmen",
    "tru": "Turoyo",
    "tvl": "Tuvalu",
    "tyv": "Tuvinian",
    "tw": "Twi",
    "kcg": "Tyap",
    "udm": "Udmurt",
    "uga": "Ugaritic",
    "uk": "Ukrainian",
    "umb": "Umbundu",
    "und": "Unknown Language",
    "hsb": "Upper Sorbian",
    "ur": "Urdu",
    "ug": "Uyghur",
    "uz": "Uzbek",
    "vai": "Vai",
    "ve": "Venda",
    "vec": "Venetian",
    "vep": "Veps",
    "vi": "Vietnamese",
    "vo": "Volap\xFCk",
    "vro": "V\xF5ro",
    "vot": "Votic",
    "vun": "Vunjo",
    "wa": "Walloon",
    "wae": "Walser",
    "war": "Waray",
    "was": "Washo",
    "guc": "Wayuu",
    "cy": "Welsh",
    "vls": "West Flemish",
    "fy": "Western Frisian",
    "mrj": "Western Mari",
    "wal": "Wolaytta",
    "wo": "Wolof",
    "wuu": "Wu Chinese",
    "xh": "Xhosa",
    "hsn": "Xiang Chinese",
    "yav": "Yangben",
    "yao": "Yao",
    "yap": "Yapese",
    "ybb": "Yemba",
    "yi": "Yiddish",
    "yo": "Yoruba",
    "zap": "Zapotec",
    "dje": "Zarma",
    "zza": "Zaza",
    "zea": "Zeelandic",
    "zen": "Zenaga",
    "za": "Zhuang",
    "gbz": "Zoroastrian Dari",
    "zu": "Zulu",
    "zun": "Zuni"
};

/***/ }),

/***/ "./src/AppBundle/Resources/public/javascript/ca/ca.models.js":
/*!*******************************************************************!*\
  !*** ./src/AppBundle/Resources/public/javascript/ca/ca.models.js ***!
  \*******************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {/**
 * Created by JuanCruz on 4/1/2018.
 */

$(function () {

    window.ContentArena = window.ContentArena || {};

    ContentArena.Model = ContentArena.Model || {};

    ContentArena.Model.RightPackage = function () {
        this.id = null;
        this.name = null;
        this.rights = {};
    };

    ContentArena.Model.DistributionPackage = function () {
        this.id = null;
        this.name = null;
        this.production = {};
        this.technical = {};
    };

    ContentArena.Model.Right = function () {
        this.id = null;
        this.name = null;
        this.rightItems = {};
    };

    ContentArena.Model.RightItem = function () {
        this.id = null;
        this.name = null;
        this.inputs = [];
    };

    ContentArena.Model.SelectedRight = function () {
        this.right = null;
        this.rightItem = null;
        this.distributionPackage = null;
        this.group = null;
        this.inputs = [];
    };

    ContentArena.Model.SalesPackage = function () {
        var _this = this;

        this.salesMethod = null;
        this.fee = null;
        this.currency = null;
        this.id = null;
        this.name = null;
        this.territories = null;
        this.selectedTerritories = [];
        this.excludedTerritories = [];
        this.territoryBids = false;
        this.sellAsPackage = false;

        this.validate = function () {

            var description = "Sales Package " + _this.id + ": ",
                hasErrors = false;

            if (!_this.currency) {
                hasErrors = true;
                description += "Currency can't be empty. ";
            }

            if (!_this.fee) {
                hasErrors = true;
                description += "Fee can't be empty. ";
            }

            if (!_this.territories) {
                hasErrors = true;
                description += "Territories can't be empty. ";
            }

            if (!_this.salesMethod) {
                hasErrors = true;
                description += "Sales method can't be empty. ";
            }

            return {
                hasErrors: hasErrors,
                description: description
            };
        };
    };

    ContentArena.Model.Content = function () {
        var _this2 = this;

        this.sport = {};
        this.sports = [];
        this.tournament = null;
        this.category = null;
        this.eventType = "database";
        this.salesPackages = {};
        this.installments = {};

        this.getTitle = function () {

            console.log(_this2);

            var title = "";

            if (_this2.sports.length > 0) {
                _this2.sports.forEach(function (sport, index, array) {
                    title += sport.value;
                    if (index + 1 != array.length) title += ", ";
                });
            }

            if (_this2.eventType === "custom") {}

            if (_this2.eventType === "database") {
                if (_this2.sport !== null) title += _this2.sport.value;
                if (_this2.category !== null) title += " - " + _this2.category.value;
                if (_this2.tournament !== null) title += " - " + _this2.tournament.value;
            }

            if (_this2.seasons && _this2.seasons.length > 0) {
                title += " " + _this2.seasons.map(function (season) {
                    var values = season.value.split(" ");
                    return values[values.length - 1];
                }).join(" - ");
            }

            return title;
        };

        watch(this, "sports", function () {
            console.log("Updating sports", arguments);
        });

        watch(this, "eventType", function () {
            console.log("Updating eventType", arguments);
        });
    };
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./src/AppBundle/Resources/public/javascript/ca/ca.utils.js":
/*!******************************************************************!*\
  !*** ./src/AppBundle/Resources/public/javascript/ca/ca.utils.js ***!
  \******************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {/**
 * Created by JuanCruz on 4/1/2018.
 */

window.ContentArena = window.ContentArena || {};

ContentArena.Utils = {
    addRegionBehaviour: function addRegionBehaviour(selector) {

        $.ajax({
            url: hosturl + "v1/feed/test",
            type: "GET",
            success: function success(response) {

                response.sort(function (a, b) {
                    return a.name > b.name ? 1 : b.name > a.name ? -1 : 0;
                });

                $(selector).html("");

                /**
                 * @param {{ country_code: string }} v
                 */
                $.each(response, function (k, v) {

                    var option = '<option value=' + v.country_code + '>' + v.name + '</option>';

                    $(selector).each(function (key, select) {
                        $(select).append(option);
                    });
                });

                $(selector).chosen({ width: "50%" });
            }
        });
    },
    addLanguageBehaviour: function addLanguageBehaviour(selector) {

        $(selector).each(function () {

            var _this = $(this);

            if (_this.data("chosen") !== undefined) return;

            $.each(ContentArena.Languages.Short, function (k, v) {

                var option = '<option value=' + k + '>' + v + '</option>';
                _this.append(option);
            });

            _this.chosen();

            _this.chosen().change(function (e, opt) {
                if (opt.selected && opt.selected === "all") {

                    _this.html("");
                    $.each(ContentArena.Languages.Long, function (k, v) {

                        var option = '<option value=' + k + '>' + v + '</option>';
                        _this.append(option);
                    });

                    _this.trigger("chosen:updated");
                }
            });
        });
    },
    isAPIAvailable: function isAPIAvailable() {
        // Check for the various File API support.
        if (window.File && window.FileReader && window.FileList && window.Blob) {
            // Great success! All the File APIs are supported.
            return true;
        } else {
            // source: File API availability - http://caniuse.com/#feat=fileapi
            // source: <output> availability - http://html5doctor.com/the-output-element/
            document.writeln('The HTML5 APIs used in this form are only available in the following browsers:<br />');
            // 6.0 File API & 13.0 <output>
            document.writeln(' - Google Chrome: 13.0 or later<br />');
            // 3.6 File API & 6.0 <output>
            document.writeln(' - Mozilla Firefox: 6.0 or later<br />');
            // 10.0 File API & 10.0 <output>
            document.writeln(' - Internet Explorer: Not supported (partial support expected in 10.0)<br />');
            // ? File API & 5.1 <output>
            document.writeln(' - Safari: Not supported<br />');
            // ? File API & 9.2 <output>
            document.writeln(' - Opera: Not supported');
            return false;
        }
    },
    addOrdinal: function addOrdinal(n) {
        var str = n.toString().slice(-1),
            ord = '';
        switch (str) {
            case '1':
                ord = 'st';
                break;
            case '2':
                ord = 'nd';
                break;
            case '3':
                ord = 'rd';
                break;
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
            case '0':
                ord = 'th';
                break;
        }
        return n + ord;
    },

    /**
     *
     * @param value
     * @param arr
     * @param prop
     * @returns {number}
     */
    getIndex: function getIndex(value, arr, prop) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i][prop] === value) {
                return i;
            }
        }
        return -1; //to handle the case where the value doesn't exist
    }
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ 2:
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** multi ./src/AppBundle/Resources/public/javascript/ca/ca.api.js ./src/AppBundle/Resources/public/javascript/ca/ca.api.content.js ./src/AppBundle/Resources/public/javascript/ca/ca.data.js ./src/AppBundle/Resources/public/javascript/ca/ca.models.js ./src/AppBundle/Resources/public/javascript/ca/ca.utils.js ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./src/AppBundle/Resources/public/javascript/ca/ca.api.js */"./src/AppBundle/Resources/public/javascript/ca/ca.api.js");
__webpack_require__(/*! ./src/AppBundle/Resources/public/javascript/ca/ca.api.content.js */"./src/AppBundle/Resources/public/javascript/ca/ca.api.content.js");
__webpack_require__(/*! ./src/AppBundle/Resources/public/javascript/ca/ca.data.js */"./src/AppBundle/Resources/public/javascript/ca/ca.data.js");
__webpack_require__(/*! ./src/AppBundle/Resources/public/javascript/ca/ca.models.js */"./src/AppBundle/Resources/public/javascript/ca/ca.models.js");
module.exports = __webpack_require__(/*! ./src/AppBundle/Resources/public/javascript/ca/ca.utils.js */"./src/AppBundle/Resources/public/javascript/ca/ca.utils.js");


/***/ })

},[2]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9jYS9jYS5hcGkuY29udGVudC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9jYS9jYS5hcGkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvY2EvY2EuZGF0YS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9jYS9jYS5tb2RlbHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvY2EvY2EudXRpbHMuanMiXSwibmFtZXMiOlsiX19hcGlTdG9yZSIsInRvdXJuYW1lbnRzIiwid2luZG93IiwiQ29udGVudEFyZW5hIiwiQ29udGVudEFwaSIsInNhdmVDb250ZW50QXNEcmFmdCIsImNvbnRlbnQiLCJkZWZlcnJlZCIsImpRdWVyeSIsIkRlZmVycmVkIiwiX3RoaXMiLCIkIiwiYWpheCIsInVybCIsImVudmhvc3R1cmwiLCJ0eXBlIiwiZGF0YSIsIkpTT04iLCJzdHJpbmdpZnkiLCJjb250ZW50VHlwZSIsInN1Y2Nlc3MiLCJyZXNwb25zZSIsInJlc29sdmUiLCJlcnJvciIsInN0YXR1cyIsInJlamVjdCIsInByb21pc2UiLCJBcGkiLCJzb3J0QnlMYWJlbCIsImEiLCJiIiwibGFiZWwiLCJwcmVwYXJlTGlzdCIsImxpc3QiLCJjYXRlZ29yeUlkIiwibWFwIiwiaXRlbSIsImNhdGVnb3J5IiwiaWQiLCJuYW1lIiwiZXh0ZXJuYWxfaWQiLCJzb3J0IiwiZ2V0Q29udGVudCIsImZpbHRlciIsInNhdmVGaWx0ZXIiLCJnZXRTcG9ydHMiLCJob3N0dXJsIiwic3BvcnRzIiwic3BvcnQiLCJnZXRDb250ZW50RGV0YWlscyIsImdldFBlbmRpbmdMaXN0aW5ncyIsImdldENhdGVnb3JpZXMiLCJzcG9ydElkIiwiY2F0cyIsImdldFRvdXJuYW1lbnRzIiwiZG9uZSIsInRvdXJuYW1lbnQiLCJpbmRleE9mIiwicHVzaCIsInVuZGVmaW5lZCIsImdldFNlYXJjaFJlc3VsdEluTmV3TGlzdGluZyIsInJlcXVlc3QiLCJhdmFpbGFibGVUYWdzIiwidGVybSIsInRyYWRpdGlvbmFsIiwiZGF0YVR5cGUiLCJzZWFzb25zIiwidmFsdWUiLCJzcG9ydENhdGVnb3JpZXMiLCJjb25jYXQiLCJEYXRhIiwiTGFuZ3VhZ2VzIiwiVG9wU3BvcnRzIiwiRnVsbFNwb3J0cyIsIlNob3J0IiwiTG9uZyIsIk1vZGVsIiwiUmlnaHRQYWNrYWdlIiwicmlnaHRzIiwiRGlzdHJpYnV0aW9uUGFja2FnZSIsInByb2R1Y3Rpb24iLCJ0ZWNobmljYWwiLCJSaWdodCIsInJpZ2h0SXRlbXMiLCJSaWdodEl0ZW0iLCJpbnB1dHMiLCJTZWxlY3RlZFJpZ2h0IiwicmlnaHQiLCJyaWdodEl0ZW0iLCJkaXN0cmlidXRpb25QYWNrYWdlIiwiZ3JvdXAiLCJTYWxlc1BhY2thZ2UiLCJzYWxlc01ldGhvZCIsImZlZSIsImN1cnJlbmN5IiwidGVycml0b3JpZXMiLCJzZWxlY3RlZFRlcnJpdG9yaWVzIiwiZXhjbHVkZWRUZXJyaXRvcmllcyIsInRlcnJpdG9yeUJpZHMiLCJzZWxsQXNQYWNrYWdlIiwidmFsaWRhdGUiLCJkZXNjcmlwdGlvbiIsImhhc0Vycm9ycyIsIkNvbnRlbnQiLCJldmVudFR5cGUiLCJzYWxlc1BhY2thZ2VzIiwiaW5zdGFsbG1lbnRzIiwiZ2V0VGl0bGUiLCJjb25zb2xlIiwibG9nIiwidGl0bGUiLCJsZW5ndGgiLCJmb3JFYWNoIiwiaW5kZXgiLCJhcnJheSIsInNlYXNvbiIsInZhbHVlcyIsInNwbGl0Iiwiam9pbiIsIndhdGNoIiwiYXJndW1lbnRzIiwiVXRpbHMiLCJhZGRSZWdpb25CZWhhdmlvdXIiLCJzZWxlY3RvciIsImh0bWwiLCJlYWNoIiwiayIsInYiLCJvcHRpb24iLCJjb3VudHJ5X2NvZGUiLCJrZXkiLCJzZWxlY3QiLCJhcHBlbmQiLCJjaG9zZW4iLCJ3aWR0aCIsImFkZExhbmd1YWdlQmVoYXZpb3VyIiwiY2hhbmdlIiwiZSIsIm9wdCIsInNlbGVjdGVkIiwidHJpZ2dlciIsImlzQVBJQXZhaWxhYmxlIiwiRmlsZSIsIkZpbGVSZWFkZXIiLCJGaWxlTGlzdCIsIkJsb2IiLCJkb2N1bWVudCIsIndyaXRlbG4iLCJhZGRPcmRpbmFsIiwibiIsInN0ciIsInRvU3RyaW5nIiwic2xpY2UiLCJvcmQiLCJnZXRJbmRleCIsImFyciIsInByb3AiLCJpIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFJQSxJQUFJQSxhQUFhO0FBQ2JDLGlCQUFjO0FBREQsQ0FBakI7O0FBSUFDLE9BQU9DLFlBQVAsR0FBc0JELE9BQU9DLFlBQVAsSUFBdUIsRUFBN0M7QUFDQUEsYUFBYUMsVUFBYixHQUEwQkQsYUFBYUMsVUFBYixJQUEwQixFQUFwRDs7QUFFQUQsYUFBYUMsVUFBYixHQUF5QjtBQUNyQkMsc0JBRHFCLDhCQUNBQyxPQURBLEVBQ1U7QUFDM0IsWUFBSUMsV0FBV0MsT0FBT0MsUUFBUCxFQUFmO0FBQUEsWUFDSUMsUUFBUSxJQURaOztBQUdBQyxVQUFFQyxJQUFGLENBQU87QUFDSEMsaUJBQUtDLGFBQWEsb0JBRGY7QUFFSEMsa0JBQU0sTUFGSDtBQUdIQyxrQkFBTUMsS0FBS0MsU0FBTCxDQUFlWixPQUFmLENBSEg7QUFJSGEseUJBQWEsa0JBSlY7QUFLSEMscUJBQVMsaUJBQVVDLFFBQVYsRUFBb0I7QUFDekJkLHlCQUFTZSxPQUFULENBQWlCRCxRQUFqQjtBQUNILGFBUEU7QUFRSEUsbUJBQVEsZUFBVVAsSUFBVixFQUFnQlEsTUFBaEIsRUFBd0I7QUFDNUJqQix5QkFBU2tCLE1BQVQsQ0FBZ0I7QUFDWlQsMEJBQU1BLElBRE07QUFFWlEsNEJBQVFBO0FBRkksaUJBQWhCO0FBSUg7QUFiRSxTQUFQOztBQWdCQSxlQUFPakIsU0FB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VCxDQUFpQixnQ0FBakI7QUFDQTtBQUNBRCxxQkFBU0MsT0FBVCxDQUFpQix5QkFBakI7QUFDQSxtQkFBTyxLQUFQO0FBQ0g7QUFDSixLQXJGZ0I7QUFzRmpCQyxjQXRGaUIsc0JBc0ZOQyxDQXRGTSxFQXNGSDtBQUNWLFlBQUlDLE1BQU1ELEVBQUVFLFFBQUYsR0FBYUMsS0FBYixDQUFtQixDQUFDLENBQXBCLENBQVY7QUFBQSxZQUNJQyxNQUFNLEVBRFY7QUFFQSxnQkFBUUgsR0FBUjtBQUNJLGlCQUFLLEdBQUw7QUFDSUcsc0JBQU0sSUFBTjtBQUNBO0FBQ0osaUJBQUssR0FBTDtBQUNJQSxzQkFBTSxJQUFOO0FBQ0E7QUFDSixpQkFBSyxHQUFMO0FBQ0lBLHNCQUFNLElBQU47QUFDQTtBQUNKLGlCQUFLLEdBQUw7QUFDQSxpQkFBSyxHQUFMO0FBQ0EsaUJBQUssR0FBTDtBQUNBLGlCQUFLLEdBQUw7QUFDQSxpQkFBSyxHQUFMO0FBQ0EsaUJBQUssR0FBTDtBQUNBLGlCQUFLLEdBQUw7QUFDSUEsc0JBQU0sSUFBTjtBQUNBO0FBbEJSO0FBb0JBLGVBQU9KLElBQUlJLEdBQVg7QUFDSCxLQTlHZ0I7O0FBK0dqQjs7Ozs7OztBQU9BQyxZQXRIaUIsb0JBc0hQdkYsS0F0SE8sRUFzSEF3RixHQXRIQSxFQXNIS0MsSUF0SEwsRUFzSFc7QUFDeEIsYUFBSSxJQUFJQyxJQUFJLENBQVosRUFBZUEsSUFBSUYsSUFBSTVDLE1BQXZCLEVBQStCOEMsR0FBL0IsRUFBb0M7QUFDaEMsZ0JBQUdGLElBQUlFLENBQUosRUFBT0QsSUFBUCxNQUFpQnpGLEtBQXBCLEVBQTJCO0FBQ3ZCLHVCQUFPMEYsQ0FBUDtBQUNIO0FBQ0o7QUFDRCxlQUFPLENBQUMsQ0FBUixDQU53QixDQU1iO0FBQ2Q7QUE3SGdCLENBQXJCLEMiLCJmaWxlIjoiY2EuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuKiBDcmVhdGVkIGJ5IEp1YW5DcnV6IG9uIDQvMS8yMDE4LlxyXG4qL1xyXG5cclxubGV0IF9fYXBpU3RvcmUgPSB7XHJcbiAgICB0b3VybmFtZW50cyA6IHt9XHJcbn07XHJcblxyXG53aW5kb3cuQ29udGVudEFyZW5hID0gd2luZG93LkNvbnRlbnRBcmVuYSB8fCB7fTtcclxuQ29udGVudEFyZW5hLkNvbnRlbnRBcGkgPSBDb250ZW50QXJlbmEuQ29udGVudEFwaXx8IHt9O1xyXG5cclxuQ29udGVudEFyZW5hLkNvbnRlbnRBcGk9IHtcclxuICAgIHNhdmVDb250ZW50QXNEcmFmdCAoIGNvbnRlbnQgKSB7XHJcbiAgICAgICAgdmFyIGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXHJcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcclxuXHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJjb250ZW50L2RyYWZ0L3NhdmVcIixcclxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KGNvbnRlbnQpLFxyXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xyXG4gICAgfSxcclxuXHJcbn07XHJcblxyXG5cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvY2EvY2EuYXBpLmNvbnRlbnQuanMiLCIvKipcclxuICogQ3JlYXRlZCBieSBKdWFuQ3J1eiBvbiA0LzEvMjAxOC5cclxuICovXHJcblxyXG5sZXQgX19hcGlTdG9yZSA9IHtcclxuICAgIHRvdXJuYW1lbnRzIDoge31cclxufTtcclxuXHJcbndpbmRvdy5Db250ZW50QXJlbmEgPSB3aW5kb3cuQ29udGVudEFyZW5hIHx8IHt9O1xyXG5cclxuQ29udGVudEFyZW5hLkFwaT0ge1xyXG4gICAgc29ydEJ5TGFiZWwgKGEsIGIpIHtcclxuICAgICAgICByZXR1cm4gKGEubGFiZWwgPiBiLmxhYmVsKSA/IDEgOiAoKGIubGFiZWwgPiBhLmxhYmVsKSA/IC0xIDogMClcclxuICAgIH0sXHJcblxyXG4gICAgcHJlcGFyZUxpc3QgKCBsaXN0LCBjYXRlZ29yeUlkICkge1xyXG5cclxuICAgICAgICBsZXQgX3RoaXMgPSB0aGlzO1xyXG5cclxuICAgICAgICBsaXN0ID0gJC5tYXAobGlzdCwgZnVuY3Rpb24gKGl0ZW0pIHtcclxuXHJcbiAgICAgICAgICAgIC8vIEZpbHRlciBieSBjYXRlZ29yeVxyXG4gICAgICAgICAgICBpZiAoIGNhdGVnb3J5SWQgJiYgaXRlbS5jYXRlZ29yeVsnQGF0dHJpYnV0ZXMnXS5pZCAhPSBjYXRlZ29yeUlkKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB7bmFtZTogaXRlbVsnQGF0dHJpYnV0ZXMnXS5uYW1lLCBleHRlcm5hbF9pZDogaXRlbVsnQGF0dHJpYnV0ZXMnXS5pZH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbGlzdC5zb3J0KF90aGlzLnNvcnRCeUxhYmVsKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGxpc3Q7XHJcbiAgICB9LFxyXG5cclxuICAgIGdldENvbnRlbnQgKCBmaWx0ZXIpIHtcclxuICAgICAgICB2YXIgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcclxuICAgICAgICAgICAgX3RoaXMgPSB0aGlzO1xyXG5cclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImJ1eS9zZWFyY2hcIixcclxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIGRhdGEgOiBmaWx0ZXIsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBzYXZlRmlsdGVyICggZmlsdGVyKSB7XHJcbiAgICAgICAgdmFyIGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXHJcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcclxuXHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJidXkvZmlsdGVyL3NhdmVcIixcclxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIGRhdGEgOiBmaWx0ZXIsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBnZXRTcG9ydHMgKCkge1xyXG4gICAgICAgIHZhciBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxyXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XHJcblxyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogaG9zdHVybCArIFwidjEvZmVlZC9zcG9ydHNcIixcclxuICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIEBwYXJhbSB7e3Nwb3J0Om9iamVjdH19IHJlc3BvbnNlXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgc3BvcnRzID0gX3RoaXMucHJlcGFyZUxpc3QoIHJlc3BvbnNlLnNwb3J0KTtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoc3BvcnRzKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIGdldENvbnRlbnREZXRhaWxzKCBpZCApIHtcclxuICAgICAgICB2YXIgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcclxuICAgICAgICAgICAgX3RoaXMgPSB0aGlzO1xyXG5cclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImNvbnRlbnQvZGV0YWlscy9cIixcclxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIGRhdGE6IHtpZCA6IGlkfSxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIGdldFBlbmRpbmdMaXN0aW5ncyggaWQgKSB7XHJcbiAgICAgICAgdmFyIGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXHJcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcclxuXHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJjb250ZW50L3BlbmRpbmctbGlzdGluZ3MvXCIsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBkYXRhOiB7aWQgOiBpZH0sXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBnZXRDYXRlZ29yaWVzICggc3BvcnRJZCApIHtcclxuICAgICAgICB2YXIgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcclxuICAgICAgICAgICAgX3RoaXMgPSB0aGlzLFxyXG4gICAgICAgICAgICBsaXN0ID0gW10sXHJcbiAgICAgICAgICAgIGNhdHMgPSBbXTtcclxuXHJcbiAgICAgICAgX3RoaXMuZ2V0VG91cm5hbWVudHMoc3BvcnRJZCkuZG9uZShmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoICEgX19hcGlTdG9yZS50b3VybmFtZW50c1tzcG9ydElkXSApIHtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoIFtdICk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxpc3QgPSAkLm1hcCggX19hcGlTdG9yZS50b3VybmFtZW50c1tzcG9ydElkXS50b3VybmFtZW50ICwgZnVuY3Rpb24gKGl0ZW0pIHtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgaWQgPSBpdGVtLmNhdGVnb3J5WydAYXR0cmlidXRlcyddLmlkO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICggY2F0cy5pbmRleE9mKGlkKSAhPT0gLTEgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhdHMucHVzaCggaWQgKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbS5jYXRlZ29yeTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKF90aGlzLnByZXBhcmVMaXN0KGxpc3QpICk7XHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBnZXRUb3VybmFtZW50cyAoIHNwb3J0SWQsIGNhdGVnb3J5SWQgKSB7XHJcbiAgICAgICAgdmFyIGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXHJcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcclxuXHJcbiAgICAgICAgaWYgKCBfX2FwaVN0b3JlLnRvdXJuYW1lbnRzW3Nwb3J0SWRdICE9PSB1bmRlZmluZWQgKXtcclxuICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShfdGhpcy5wcmVwYXJlTGlzdChfX2FwaVN0b3JlLnRvdXJuYW1lbnRzW3Nwb3J0SWRdLnRvdXJuYW1lbnQsIGNhdGVnb3J5SWQpKTtcclxuICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogaG9zdHVybCArIFwidjEvZmVlZC90b3VybmFtZW50c1wiLFxyXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgZGF0YSA6IHsgaWQgOiBzcG9ydElkIH0sXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBAcGFyYW0ge3t0b3VybmFtZW50czp7dG91cm5hbWVudDpBcnJheX19fSByZXNwb25zZVxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gQSBjb21tZW50XHJcbiAgICAgICAgICAgICAgICBpZiAoIHJlc3BvbnNlLnRvdXJuYW1lbnRzID09PSB1bmRlZmluZWQgfHwgcmVzcG9uc2UudG91cm5hbWVudHMudG91cm5hbWVudCA9PT0gdW5kZWZpbmVkICkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoW10pO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBfX2FwaVN0b3JlLnRvdXJuYW1lbnRzW3Nwb3J0SWRdID0gcmVzcG9uc2UudG91cm5hbWVudHM7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKF90aGlzLnByZXBhcmVMaXN0KHJlc3BvbnNlLnRvdXJuYW1lbnRzLnRvdXJuYW1lbnQsIGNhdGVnb3J5SWQpKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzICkge1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIGdldFNlYXJjaFJlc3VsdEluTmV3TGlzdGluZyhyZXF1ZXN0LCByZXNwb25zZSkge1xyXG4gICAgICAgIHZhciBhdmFpbGFibGVUYWdzID0gW107XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgJ3NlYXJjaC90b3VybmFtZW50JyxcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgXCJjb250ZW50XCI6IHJlcXVlc3QudGVybVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB0cmFkaXRpb25hbDogdHJ1ZSxcclxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIGRhdGFUeXBlOiBcImpzb25cIixcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBkYXRhLnNlYXNvbnMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS50eXBlID0gXCJTZWFzb25cIjtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLnZhbHVlID0gaXRlbS5uYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0ubGFiZWwgPSBpdGVtLm5hbWUgKyBcIiAtIFwiICsgaXRlbS50eXBlO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgZGF0YS5zcG9ydHMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS50eXBlID0gXCJTcG9ydFwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0udmFsdWUgPSBpdGVtLm5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5sYWJlbCA9IGl0ZW0ubmFtZSArIFwiIC0gXCIgKyBpdGVtLnR5cGU7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBkYXRhLnNwb3J0Q2F0ZWdvcmllcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLnR5cGUgPSBcIkNvdW50cnkvQ2F0ZWdvcnlcIjtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLnZhbHVlID0gaXRlbS5uYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0ubGFiZWwgPSBpdGVtLm5hbWUgKyBcIiAtIFwiICsgaXRlbS50eXBlO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgZGF0YS50b3VybmFtZW50cy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLnR5cGUgPSBcIlRvdXJuYW1lbnRcIjtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLnZhbHVlID0gaXRlbS5uYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0ubGFiZWwgPSBpdGVtLm5hbWUgKyBcIiAtIFwiICsgaXRlbS50eXBlO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgcmVzcG9uc2UoZGF0YS5zZWFzb25zLmNvbmNhdChkYXRhLnNwb3J0cy5jb25jYXQoZGF0YS5zcG9ydENhdGVnb3JpZXMuY29uY2F0KGRhdGEudG91cm5hbWVudHMpKSkpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59O1xyXG5cclxuXHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L2NhL2NhLmFwaS5qcyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IEp1YW5DcnV6IG9uIDQvMS8yMDE4LlxyXG4gKi9cclxuXHJcbndpbmRvdy5Db250ZW50QXJlbmEgPSB3aW5kb3cuQ29udGVudEFyZW5hIHx8IHt9O1xyXG5cclxuQ29udGVudEFyZW5hLkRhdGEgPSBDb250ZW50QXJlbmEuRGF0YSB8fCB7fTtcclxuQ29udGVudEFyZW5hLkxhbmd1YWdlcyA9IENvbnRlbnRBcmVuYS5MYW5ndWFnZXMgfHwge307XHJcblxyXG5Db250ZW50QXJlbmEuRGF0YS5Ub3BTcG9ydHMgPSBbXHJcbiAgICB7IG5hbWUgOiBcIlNvY2NlclwiLCBleHRlcm5hbF9pZDogXCJzcjpzcG9ydDoxXCJ9LFxyXG4gICAgeyBuYW1lIDogXCJCYXNrZXRiYWxsXCIsIGV4dGVybmFsX2lkOiBcInNyOnNwb3J0OjJcIn0sXHJcbiAgICB7IG5hbWUgOiBcIkJhc2ViYWxsXCIsIGV4dGVybmFsX2lkOiBcInNyOnNwb3J0OjNcIn0sXHJcbiAgICB7IG5hbWUgOiBcIlRlbm5pc1wiLCBleHRlcm5hbF9pZDogXCJzcjpzcG9ydDo1XCJ9LFxyXG4gICAgeyBuYW1lIDogXCJDcmlja2V0XCIsIGV4dGVybmFsX2lkOiBcInNyOnNwb3J0OjIxXCJ9LFxyXG4gICAgeyBuYW1lIDogXCJGaWVsZCBIb2NrZXlcIiwgZXh0ZXJuYWxfaWQ6IFwic3I6c3BvcnQ6MjRcIn0sXHJcbiAgICB7IG5hbWUgOiBcIlZvbGxleWJhbGxcIiwgZXh0ZXJuYWxfaWQ6IFwic3I6c3BvcnQ6MjNcIn0sXHJcbiAgICB7IG5hbWUgOiBcIlRhYmxlIFRlbm5pc1wiLCBleHRlcm5hbF9pZDogXCJzcjpzcG9ydDoyMFwifSxcclxuICAgIHsgbmFtZSA6IFwiR29sZlwiLCBleHRlcm5hbF9pZDogXCJzcjpzcG9ydDo5XCJ9LFxyXG4gICAgeyBuYW1lIDogXCJBbWVyaWNhbiBGb290YmFsbFwiLCBleHRlcm5hbF9pZDogXCJzcjpzcG9ydDoxNlwifSxcclxuICAgIHsgbmFtZSA6IFwiSGFuZGJhbGxcIiwgZXh0ZXJuYWxfaWQ6IFwic3I6c3BvcnQ6NlwifSxcclxuXTtcclxuXHJcbkNvbnRlbnRBcmVuYS5EYXRhLkZ1bGxTcG9ydHMgPSBbXTtcclxuXHJcbkNvbnRlbnRBcmVuYS5MYW5ndWFnZXMuU2hvcnQgPSB7XHJcbiAgICBcIm1kclwiOiBcIk1hbmRhcmluXCIsXHJcbiAgICBcImVzXCI6IFwiU3BhbmlzaFwiLFxyXG4gICAgXCJlblwiOiBcIkVuZ2xpc2hcIixcclxuICAgIFwiaGlcIjogXCJIaW5kaVwiLFxyXG4gICAgXCJhclwiOiBcIkFyYWJpY1wiLFxyXG4gICAgXCJwdFwiOiBcIlBvcnR1Z3Vlc2VcIixcclxuICAgIFwiYm5cIjogXCJCZW5nYWxpXCIsXHJcbiAgICBcInJ1XCI6IFwiUnVzc2lhblwiLFxyXG4gICAgXCJqYVwiOiBcIkphcGFuZXNlXCIsXHJcbiAgICBcImp2XCI6IFwiSmF2YW5lc2VcIixcclxuICAgIFwiZGVcIjogXCJHZXJtYW5cIixcclxuICAgIFwiYWxsXCIgOiBcIlNob3cgQWxsXCJcclxufTtcclxuXHJcbkNvbnRlbnRBcmVuYS5MYW5ndWFnZXMuTG9uZyA9IHtcclxuICAgIFwiYWFcIjogXCJBZmFyXCIsXHJcbiAgICBcImFmXCI6IFwiQWZyaWthYW5zXCIsXHJcbiAgICBcImFpblwiOiBcIkFpbnVcIixcclxuICAgIFwiYWt6XCI6IFwiQWxhYmFtYVwiLFxyXG4gICAgXCJzcVwiOiBcIkFsYmFuaWFuXCIsXHJcbiAgICBcImFsZVwiOiBcIkFsZXV0XCIsXHJcbiAgICBcImFycVwiOiBcIkFsZ2VyaWFuIEFyYWJpY1wiLFxyXG4gICAgXCJlbl9VU1wiOiBcIkFtZXJpY2FuIEVuZ2xpc2hcIixcclxuICAgIFwiYXNlXCI6IFwiQW1lcmljYW4gU2lnbiBMYW5ndWFnZVwiLFxyXG4gICAgXCJhbVwiOiBcIkFtaGFyaWNcIixcclxuICAgIFwiZWd5XCI6IFwiQW5jaWVudCBFZ3lwdGlhblwiLFxyXG4gICAgXCJncmNcIjogXCJBbmNpZW50IEdyZWVrXCIsXHJcbiAgICBcImFyXCI6IFwiQXJhYmljXCIsXHJcbiAgICBcImFyY1wiOiBcIkFyYW1haWNcIixcclxuICAgIFwiYXJwXCI6IFwiQXJhcGFob1wiLFxyXG4gICAgXCJhcndcIjogXCJBcmF3YWtcIixcclxuICAgIFwiaHlcIjogXCJBcm1lbmlhblwiLFxyXG4gICAgXCJhc1wiOiBcIkFzc2FtZXNlXCIsXHJcbiAgICBcImFzYVwiOiBcIkFzdVwiLFxyXG4gICAgXCJlbl9BVVwiOiBcIkF1c3RyYWxpYW4gRW5nbGlzaFwiLFxyXG4gICAgXCJkZV9BVFwiOiBcIkF1c3RyaWFuIEdlcm1hblwiLFxyXG4gICAgXCJheVwiOiBcIkF5bWFyYVwiLFxyXG4gICAgXCJhelwiOiBcIkF6ZXJiYWlqYW5pXCIsXHJcbiAgICBcImJhblwiOiBcIkJhbGluZXNlXCIsXHJcbiAgICBcImV1XCI6IFwiQmFzcXVlXCIsXHJcbiAgICBcImJhclwiOiBcIkJhdmFyaWFuXCIsXHJcbiAgICBcImJlXCI6IFwiQmVsYXJ1c2lhblwiLFxyXG4gICAgXCJiblwiOiBcIkJlbmdhbGlcIixcclxuICAgIFwiYmlrXCI6IFwiQmlrb2xcIixcclxuICAgIFwiYmluXCI6IFwiQmluaVwiLFxyXG4gICAgXCJic1wiOiBcIkJvc25pYW5cIixcclxuICAgIFwiYnJoXCI6IFwiQnJhaHVpXCIsXHJcbiAgICBcImJyYVwiOiBcIkJyYWpcIixcclxuICAgIFwicHRfQlJcIjogXCJCcmF6aWxpYW4gUG9ydHVndWVzZVwiLFxyXG4gICAgXCJiclwiOiBcIkJyZXRvblwiLFxyXG4gICAgXCJlbl9HQlwiOiBcIkJyaXRpc2ggRW5nbGlzaFwiLFxyXG4gICAgXCJiZ1wiOiBcIkJ1bGdhcmlhblwiLFxyXG4gICAgXCJteVwiOiBcIkJ1cm1lc2VcIixcclxuICAgIFwiZnJjXCI6IFwiQ2FqdW4gRnJlbmNoXCIsXHJcbiAgICBcImVuX0NBXCI6IFwiQ2FuYWRpYW4gRW5nbGlzaFwiLFxyXG4gICAgXCJmcl9DQVwiOiBcIkNhbmFkaWFuIEZyZW5jaFwiLFxyXG4gICAgXCJ5dWVcIjogXCJDYW50b25lc2VcIixcclxuICAgIFwiY2FyXCI6IFwiQ2FyaWJcIixcclxuICAgIFwiY2FcIjogXCJDYXRhbGFuXCIsXHJcbiAgICBcImNheVwiOiBcIkNheXVnYVwiLFxyXG4gICAgXCJjZWJcIjogXCJDZWJ1YW5vXCIsXHJcbiAgICBcInNodVwiOiBcIkNoYWRpYW4gQXJhYmljXCIsXHJcbiAgICBcImNlXCI6IFwiQ2hlY2hlblwiLFxyXG4gICAgXCJjaHJcIjogXCJDaGVyb2tlZVwiLFxyXG4gICAgXCJxdWdcIjogXCJDaGltYm9yYXpvIEhpZ2hsYW5kIFF1aWNodWFcIixcclxuICAgIFwiemhcIjogXCJDaGluZXNlXCIsXHJcbiAgICBcImNoblwiOiBcIkNoaW5vb2sgSmFyZ29uXCIsXHJcbiAgICBcImNocFwiOiBcIkNoaXBld3lhblwiLFxyXG4gICAgXCJjaG9cIjogXCJDaG9jdGF3XCIsXHJcbiAgICBcImN1XCI6IFwiQ2h1cmNoIFNsYXZpY1wiLFxyXG4gICAgXCJjdlwiOiBcIkNodXZhc2hcIixcclxuICAgIFwibndjXCI6IFwiQ2xhc3NpY2FsIE5ld2FyaVwiLFxyXG4gICAgXCJzeWNcIjogXCJDbGFzc2ljYWwgU3lyaWFjXCIsXHJcbiAgICBcInN3Y1wiOiBcIkNvbmdvIFN3YWhpbGlcIixcclxuICAgIFwiY29wXCI6IFwiQ29wdGljXCIsXHJcbiAgICBcImt3XCI6IFwiQ29ybmlzaFwiLFxyXG4gICAgXCJjb1wiOiBcIkNvcnNpY2FuXCIsXHJcbiAgICBcImNyXCI6IFwiQ3JlZVwiLFxyXG4gICAgXCJtdXNcIjogXCJDcmVla1wiLFxyXG4gICAgXCJjcmhcIjogXCJDcmltZWFuIFR1cmtpc2hcIixcclxuICAgIFwiaHJcIjogXCJDcm9hdGlhblwiLFxyXG4gICAgXCJjc1wiOiBcIkN6ZWNoXCIsXHJcbiAgICBcImRha1wiOiBcIkRha290YVwiLFxyXG4gICAgXCJkYVwiOiBcIkRhbmlzaFwiLFxyXG4gICAgXCJkZWxcIjogXCJEZWxhd2FyZVwiLFxyXG4gICAgXCJubFwiOiBcIkR1dGNoXCIsXHJcbiAgICBcImZyc1wiOiBcIkVhc3Rlcm4gRnJpc2lhblwiLFxyXG4gICAgXCJhcnpcIjogXCJFZ3lwdGlhbiBBcmFiaWNcIixcclxuICAgIFwiZW5cIjogXCJFbmdsaXNoXCIsXHJcbiAgICBcImVvXCI6IFwiRXNwZXJhbnRvXCIsXHJcbiAgICBcImV0XCI6IFwiRXN0b25pYW5cIixcclxuICAgIFwicHRfUFRcIjogXCJFdXJvcGVhbiBQb3J0dWd1ZXNlXCIsXHJcbiAgICBcImVzX0VTXCI6IFwiRXVyb3BlYW4gU3BhbmlzaFwiLFxyXG4gICAgXCJlZVwiOiBcIkV3ZVwiLFxyXG4gICAgXCJmYW5cIjogXCJGYW5nXCIsXHJcbiAgICBcImhpZlwiOiBcIkZpamkgSGluZGlcIixcclxuICAgIFwiZmpcIjogXCJGaWppYW5cIixcclxuICAgIFwiZmlsXCI6IFwiRmlsaXBpbm9cIixcclxuICAgIFwiZmlcIjogXCJGaW5uaXNoXCIsXHJcbiAgICBcIm5sX0JFXCI6IFwiRmxlbWlzaFwiLFxyXG4gICAgXCJmb25cIjogXCJGb25cIixcclxuICAgIFwiZnJcIjogXCJGcmVuY2hcIixcclxuICAgIFwiZ2FhXCI6IFwiR2FcIixcclxuICAgIFwiZ2FuXCI6IFwiR2FuIENoaW5lc2VcIixcclxuICAgIFwia2FcIjogXCJHZW9yZ2lhblwiLFxyXG4gICAgXCJkZVwiOiBcIkdlcm1hblwiLFxyXG4gICAgXCJnb3RcIjogXCJHb3RoaWNcIixcclxuICAgIFwiZ3JiXCI6IFwiR3JlYm9cIixcclxuICAgIFwiZWxcIjogXCJHcmVla1wiLFxyXG4gICAgXCJnblwiOiBcIkd1YXJhbmlcIixcclxuICAgIFwiZ3VcIjogXCJHdWphcmF0aVwiLFxyXG4gICAgXCJndXpcIjogXCJHdXNpaVwiLFxyXG4gICAgXCJoYWlcIjogXCJIYWlkYVwiLFxyXG4gICAgXCJodFwiOiBcIkhhaXRpYW5cIixcclxuICAgIFwiaGFrXCI6IFwiSGFra2EgQ2hpbmVzZVwiLFxyXG4gICAgXCJoYVwiOiBcIkhhdXNhXCIsXHJcbiAgICBcImhhd1wiOiBcIkhhd2FpaWFuXCIsXHJcbiAgICBcImhlXCI6IFwiSGVicmV3XCIsXHJcbiAgICBcImh6XCI6IFwiSGVyZXJvXCIsXHJcbiAgICBcImhpXCI6IFwiSGluZGlcIixcclxuICAgIFwiaGl0XCI6IFwiSGl0dGl0ZVwiLFxyXG4gICAgXCJobW5cIjogXCJIbW9uZ1wiLFxyXG4gICAgXCJodVwiOiBcIkh1bmdhcmlhblwiLFxyXG4gICAgXCJpc1wiOiBcIkljZWxhbmRpY1wiLFxyXG4gICAgXCJpb1wiOiBcIklkb1wiLFxyXG4gICAgXCJpZ1wiOiBcIklnYm9cIixcclxuICAgIFwiaXVcIjogXCJJbnVrdGl0dXRcIixcclxuICAgIFwiaWtcIjogXCJJbnVwaWFxXCIsXHJcbiAgICBcImdhXCI6IFwiSXJpc2hcIixcclxuICAgIFwiaXRcIjogXCJJdGFsaWFuXCIsXHJcbiAgICBcImphbVwiOiBcIkphbWFpY2FuIENyZW9sZSBFbmdsaXNoXCIsXHJcbiAgICBcImphXCI6IFwiSmFwYW5lc2VcIixcclxuICAgIFwianZcIjogXCJKYXZhbmVzZVwiLFxyXG4gICAgXCJrYWpcIjogXCJKanVcIixcclxuICAgIFwiZHlvXCI6IFwiSm9sYS1Gb255aVwiLFxyXG4gICAgXCJ4YWxcIjogXCJLYWxteWtcIixcclxuICAgIFwia2FtXCI6IFwiS2FtYmFcIixcclxuICAgIFwia2JsXCI6IFwiS2FuZW1idVwiLFxyXG4gICAgXCJrblwiOiBcIkthbm5hZGFcIixcclxuICAgIFwia3JcIjogXCJLYW51cmlcIixcclxuICAgIFwia2FhXCI6IFwiS2FyYS1LYWxwYWtcIixcclxuICAgIFwia3JjXCI6IFwiS2FyYWNoYXktQmFsa2FyXCIsXHJcbiAgICBcImtybFwiOiBcIkthcmVsaWFuXCIsXHJcbiAgICBcImtzXCI6IFwiS2FzaG1pcmlcIixcclxuICAgIFwiY3NiXCI6IFwiS2FzaHViaWFuXCIsXHJcbiAgICBcImthd1wiOiBcIkthd2lcIixcclxuICAgIFwia2tcIjogXCJLYXpha2hcIixcclxuICAgIFwia2VuXCI6IFwiS2VueWFuZ1wiLFxyXG4gICAgXCJraGFcIjogXCJLaGFzaVwiLFxyXG4gICAgXCJrbVwiOiBcIktobWVyXCIsXHJcbiAgICBcImtob1wiOiBcIktob3RhbmVzZVwiLFxyXG4gICAgXCJraHdcIjogXCJLaG93YXJcIixcclxuICAgIFwia2lcIjogXCJLaWt1eXVcIixcclxuICAgIFwia21iXCI6IFwiS2ltYnVuZHVcIixcclxuICAgIFwia3JqXCI6IFwiS2luYXJheS1hXCIsXHJcbiAgICBcInJ3XCI6IFwiS2lueWFyd2FuZGFcIixcclxuICAgIFwia2l1XCI6IFwiS2lybWFuamtpXCIsXHJcbiAgICBcInRsaFwiOiBcIktsaW5nb25cIixcclxuICAgIFwiYmttXCI6IFwiS29tXCIsXHJcbiAgICBcImt2XCI6IFwiS29taVwiLFxyXG4gICAgXCJrb2lcIjogXCJLb21pLVBlcm15YWtcIixcclxuICAgIFwia2dcIjogXCJLb25nb1wiLFxyXG4gICAgXCJrb2tcIjogXCJLb25rYW5pXCIsXHJcbiAgICBcImtvXCI6IFwiS29yZWFuXCIsXHJcbiAgICBcImtmb1wiOiBcIktvcm9cIixcclxuICAgIFwia29zXCI6IFwiS29zcmFlYW5cIixcclxuICAgIFwiYXZrXCI6IFwiS290YXZhXCIsXHJcbiAgICBcImtocVwiOiBcIktveXJhIENoaWluaVwiLFxyXG4gICAgXCJzZXNcIjogXCJLb3lyYWJvcm8gU2VubmlcIixcclxuICAgIFwia3BlXCI6IFwiS3BlbGxlXCIsXHJcbiAgICBcImtyaVwiOiBcIktyaW9cIixcclxuICAgIFwia2pcIjogXCJLdWFueWFtYVwiLFxyXG4gICAgXCJrdW1cIjogXCJLdW15a1wiLFxyXG4gICAgXCJrdVwiOiBcIkt1cmRpc2hcIixcclxuICAgIFwia3J1XCI6IFwiS3VydWtoXCIsXHJcbiAgICBcImt1dFwiOiBcIkt1dGVuYWlcIixcclxuICAgIFwibm1nXCI6IFwiS3dhc2lvXCIsXHJcbiAgICBcImt5XCI6IFwiS3lyZ3l6XCIsXHJcbiAgICBcInF1Y1wiOiBcIktcXHUwMmJjaWNoZVxcdTAyYmNcIixcclxuICAgIFwibGFkXCI6IFwiTGFkaW5vXCIsXHJcbiAgICBcImxhaFwiOiBcIkxhaG5kYVwiLFxyXG4gICAgXCJsa3RcIjogXCJMYWtvdGFcIixcclxuICAgIFwibGFtXCI6IFwiTGFtYmFcIixcclxuICAgIFwibGFnXCI6IFwiTGFuZ2lcIixcclxuICAgIFwibG9cIjogXCJMYW9cIixcclxuICAgIFwibHRnXCI6IFwiTGF0Z2FsaWFuXCIsXHJcbiAgICBcImxhXCI6IFwiTGF0aW5cIixcclxuICAgIFwiZXNfNDE5XCI6IFwiTGF0aW4gQW1lcmljYW4gU3BhbmlzaFwiLFxyXG4gICAgXCJsdlwiOiBcIkxhdHZpYW5cIixcclxuICAgIFwibHp6XCI6IFwiTGF6XCIsXHJcbiAgICBcImxlelwiOiBcIkxlemdoaWFuXCIsXHJcbiAgICBcImxpalwiOiBcIkxpZ3VyaWFuXCIsXHJcbiAgICBcImxpXCI6IFwiTGltYnVyZ2lzaFwiLFxyXG4gICAgXCJsblwiOiBcIkxpbmdhbGFcIixcclxuICAgIFwibGZuXCI6IFwiTGluZ3VhIEZyYW5jYSBOb3ZhXCIsXHJcbiAgICBcImx6aFwiOiBcIkxpdGVyYXJ5IENoaW5lc2VcIixcclxuICAgIFwibHRcIjogXCJMaXRodWFuaWFuXCIsXHJcbiAgICBcImxpdlwiOiBcIkxpdm9uaWFuXCIsXHJcbiAgICBcImpib1wiOiBcIkxvamJhblwiLFxyXG4gICAgXCJsbW9cIjogXCJMb21iYXJkXCIsXHJcbiAgICBcIm5kc1wiOiBcIkxvdyBHZXJtYW5cIixcclxuICAgIFwic2xpXCI6IFwiTG93ZXIgU2lsZXNpYW5cIixcclxuICAgIFwiZHNiXCI6IFwiTG93ZXIgU29yYmlhblwiLFxyXG4gICAgXCJsb3pcIjogXCJMb3ppXCIsXHJcbiAgICBcImx1XCI6IFwiTHViYS1LYXRhbmdhXCIsXHJcbiAgICBcImx1YVwiOiBcIkx1YmEtTHVsdWFcIixcclxuICAgIFwibHVpXCI6IFwiTHVpc2Vub1wiLFxyXG4gICAgXCJzbWpcIjogXCJMdWxlIFNhbWlcIixcclxuICAgIFwibHVuXCI6IFwiTHVuZGFcIixcclxuICAgIFwibHVvXCI6IFwiTHVvXCIsXHJcbiAgICBcImxiXCI6IFwiTHV4ZW1ib3VyZ2lzaFwiLFxyXG4gICAgXCJsdXlcIjogXCJMdXlpYVwiLFxyXG4gICAgXCJtZGVcIjogXCJNYWJhXCIsXHJcbiAgICBcIm1rXCI6IFwiTWFjZWRvbmlhblwiLFxyXG4gICAgXCJqbWNcIjogXCJNYWNoYW1lXCIsXHJcbiAgICBcIm1hZFwiOiBcIk1hZHVyZXNlXCIsXHJcbiAgICBcIm1hZlwiOiBcIk1hZmFcIixcclxuICAgIFwibWFnXCI6IFwiTWFnYWhpXCIsXHJcbiAgICBcInZtZlwiOiBcIk1haW4tRnJhbmNvbmlhblwiLFxyXG4gICAgXCJtYWlcIjogXCJNYWl0aGlsaVwiLFxyXG4gICAgXCJtYWtcIjogXCJNYWthc2FyXCIsXHJcbiAgICBcIm1naFwiOiBcIk1ha2h1d2EtTWVldHRvXCIsXHJcbiAgICBcImtkZVwiOiBcIk1ha29uZGVcIixcclxuICAgIFwibWdcIjogXCJNYWxhZ2FzeVwiLFxyXG4gICAgXCJtc1wiOiBcIk1hbGF5XCIsXHJcbiAgICBcIm1sXCI6IFwiTWFsYXlhbGFtXCIsXHJcbiAgICBcIm10XCI6IFwiTWFsdGVzZVwiLFxyXG4gICAgXCJtbmNcIjogXCJNYW5jaHVcIixcclxuICAgIFwibWRyXCI6IFwiTWFuZGFyaW5cIixcclxuICAgIFwibWFuXCI6IFwiTWFuZGluZ29cIixcclxuICAgIFwibW5pXCI6IFwiTWFuaXB1cmlcIixcclxuICAgIFwiZ3ZcIjogXCJNYW54XCIsXHJcbiAgICBcIm1pXCI6IFwiTWFvcmlcIixcclxuICAgIFwiYXJuXCI6IFwiTWFwdWNoZVwiLFxyXG4gICAgXCJtclwiOiBcIk1hcmF0aGlcIixcclxuICAgIFwiY2htXCI6IFwiTWFyaVwiLFxyXG4gICAgXCJtaFwiOiBcIk1hcnNoYWxsZXNlXCIsXHJcbiAgICBcIm13clwiOiBcIk1hcndhcmlcIixcclxuICAgIFwibWFzXCI6IFwiTWFzYWlcIixcclxuICAgIFwibXpuXCI6IFwiTWF6YW5kZXJhbmlcIixcclxuICAgIFwiYnl2XCI6IFwiTWVkdW1iYVwiLFxyXG4gICAgXCJtZW5cIjogXCJNZW5kZVwiLFxyXG4gICAgXCJtd3ZcIjogXCJNZW50YXdhaVwiLFxyXG4gICAgXCJtZXJcIjogXCJNZXJ1XCIsXHJcbiAgICBcIm1nb1wiOiBcIk1ldGFcXHUwMmJjXCIsXHJcbiAgICBcImVzX01YXCI6IFwiTWV4aWNhbiBTcGFuaXNoXCIsXHJcbiAgICBcIm1pY1wiOiBcIk1pY21hY1wiLFxyXG4gICAgXCJkdW1cIjogXCJNaWRkbGUgRHV0Y2hcIixcclxuICAgIFwiZW5tXCI6IFwiTWlkZGxlIEVuZ2xpc2hcIixcclxuICAgIFwiZnJtXCI6IFwiTWlkZGxlIEZyZW5jaFwiLFxyXG4gICAgXCJnbWhcIjogXCJNaWRkbGUgSGlnaCBHZXJtYW5cIixcclxuICAgIFwibWdhXCI6IFwiTWlkZGxlIElyaXNoXCIsXHJcbiAgICBcIm5hblwiOiBcIk1pbiBOYW4gQ2hpbmVzZVwiLFxyXG4gICAgXCJtaW5cIjogXCJNaW5hbmdrYWJhdVwiLFxyXG4gICAgXCJ4bWZcIjogXCJNaW5ncmVsaWFuXCIsXHJcbiAgICBcIm13bFwiOiBcIk1pcmFuZGVzZVwiLFxyXG4gICAgXCJsdXNcIjogXCJNaXpvXCIsXHJcbiAgICBcImFyXzAwMVwiOiBcIk1vZGVybiBTdGFuZGFyZCBBcmFiaWNcIixcclxuICAgIFwibW9oXCI6IFwiTW9oYXdrXCIsXHJcbiAgICBcIm1kZlwiOiBcIk1va3NoYVwiLFxyXG4gICAgXCJyb19NRFwiOiBcIk1vbGRhdmlhblwiLFxyXG4gICAgXCJsb2xcIjogXCJNb25nb1wiLFxyXG4gICAgXCJtblwiOiBcIk1vbmdvbGlhblwiLFxyXG4gICAgXCJtZmVcIjogXCJNb3Jpc3llblwiLFxyXG4gICAgXCJhcnlcIjogXCJNb3JvY2NhbiBBcmFiaWNcIixcclxuICAgIFwibW9zXCI6IFwiTW9zc2lcIixcclxuICAgIFwibXVsXCI6IFwiTXVsdGlwbGUgTGFuZ3VhZ2VzXCIsXHJcbiAgICBcIm11YVwiOiBcIk11bmRhbmdcIixcclxuICAgIFwidHR0XCI6IFwiTXVzbGltIFRhdFwiLFxyXG4gICAgXCJteWVcIjogXCJNeWVuZVwiLFxyXG4gICAgXCJuYXFcIjogXCJOYW1hXCIsXHJcbiAgICBcIm5hXCI6IFwiTmF1cnVcIixcclxuICAgIFwibnZcIjogXCJOYXZham9cIixcclxuICAgIFwibmdcIjogXCJOZG9uZ2FcIixcclxuICAgIFwibmFwXCI6IFwiTmVhcG9saXRhblwiLFxyXG4gICAgXCJuZVwiOiBcIk5lcGFsaVwiLFxyXG4gICAgXCJuZXdcIjogXCJOZXdhcmlcIixcclxuICAgIFwic2JhXCI6IFwiTmdhbWJheVwiLFxyXG4gICAgXCJubmhcIjogXCJOZ2llbWJvb25cIixcclxuICAgIFwiamdvXCI6IFwiTmdvbWJhXCIsXHJcbiAgICBcInlybFwiOiBcIk5oZWVuZ2F0dVwiLFxyXG4gICAgXCJuaWFcIjogXCJOaWFzXCIsXHJcbiAgICBcIm5pdVwiOiBcIk5pdWVhblwiLFxyXG4gICAgXCJ6eHhcIjogXCJObyBsaW5ndWlzdGljIGNvbnRlbnRcIixcclxuICAgIFwibm9nXCI6IFwiTm9nYWlcIixcclxuICAgIFwibmRcIjogXCJOb3J0aCBOZGViZWxlXCIsXHJcbiAgICBcImZyclwiOiBcIk5vcnRoZXJuIEZyaXNpYW5cIixcclxuICAgIFwic2VcIjogXCJOb3J0aGVybiBTYW1pXCIsXHJcbiAgICBcIm5zb1wiOiBcIk5vcnRoZXJuIFNvdGhvXCIsXHJcbiAgICBcIm5vXCI6IFwiTm9yd2VnaWFuXCIsXHJcbiAgICBcIm5iXCI6IFwiTm9yd2VnaWFuIEJva21cXHUwMGU1bFwiLFxyXG4gICAgXCJublwiOiBcIk5vcndlZ2lhbiBOeW5vcnNrXCIsXHJcbiAgICBcIm5vdlwiOiBcIk5vdmlhbFwiLFxyXG4gICAgXCJudXNcIjogXCJOdWVyXCIsXHJcbiAgICBcIm55bVwiOiBcIk55YW13ZXppXCIsXHJcbiAgICBcIm55XCI6IFwiTnlhbmphXCIsXHJcbiAgICBcIm55blwiOiBcIk55YW5rb2xlXCIsXHJcbiAgICBcInRvZ1wiOiBcIk55YXNhIFRvbmdhXCIsXHJcbiAgICBcIm55b1wiOiBcIk55b3JvXCIsXHJcbiAgICBcIm56aVwiOiBcIk56aW1hXCIsXHJcbiAgICBcIm5xb1wiOiBcIk5cXHUwMmJjS29cIixcclxuICAgIFwib2NcIjogXCJPY2NpdGFuXCIsXHJcbiAgICBcIm9qXCI6IFwiT2ppYndhXCIsXHJcbiAgICBcImFuZ1wiOiBcIk9sZCBFbmdsaXNoXCIsXHJcbiAgICBcImZyb1wiOiBcIk9sZCBGcmVuY2hcIixcclxuICAgIFwiZ29oXCI6IFwiT2xkIEhpZ2ggR2VybWFuXCIsXHJcbiAgICBcInNnYVwiOiBcIk9sZCBJcmlzaFwiLFxyXG4gICAgXCJub25cIjogXCJPbGQgTm9yc2VcIixcclxuICAgIFwicGVvXCI6IFwiT2xkIFBlcnNpYW5cIixcclxuICAgIFwicHJvXCI6IFwiT2xkIFByb3ZlblxcdTAwZTdhbFwiLFxyXG4gICAgXCJvclwiOiBcIk9yaXlhXCIsXHJcbiAgICBcIm9tXCI6IFwiT3JvbW9cIixcclxuICAgIFwib3NhXCI6IFwiT3NhZ2VcIixcclxuICAgIFwib3NcIjogXCJPc3NldGljXCIsXHJcbiAgICBcIm90YVwiOiBcIk90dG9tYW4gVHVya2lzaFwiLFxyXG4gICAgXCJwYWxcIjogXCJQYWhsYXZpXCIsXHJcbiAgICBcInBmbFwiOiBcIlBhbGF0aW5lIEdlcm1hblwiLFxyXG4gICAgXCJwYXVcIjogXCJQYWxhdWFuXCIsXHJcbiAgICBcInBpXCI6IFwiUGFsaVwiLFxyXG4gICAgXCJwZGNcIjogXCJQZW5uc3lsdmFuaWEgR2VybWFuXCIsXHJcbiAgICBcImZhXCI6IFwiUGVyc2lhblwiLFxyXG4gICAgXCJwaG5cIjogXCJQaG9lbmljaWFuXCIsXHJcbiAgICBcInBjZFwiOiBcIlBpY2FyZFwiLFxyXG4gICAgXCJwbXNcIjogXCJQaWVkbW9udGVzZVwiLFxyXG4gICAgXCJwZHRcIjogXCJQbGF1dGRpZXRzY2hcIixcclxuICAgIFwicG9uXCI6IFwiUG9obnBlaWFuXCIsXHJcbiAgICBcInBsXCI6IFwiUG9saXNoXCIsXHJcbiAgICBcInBudFwiOiBcIlBvbnRpY1wiLFxyXG4gICAgXCJwdFwiOiBcIlBvcnR1Z3Vlc2VcIixcclxuICAgIFwicHJnXCI6IFwiUHJ1c3NpYW5cIixcclxuICAgIFwicGFcIjogXCJQdW5qYWJpXCIsXHJcbiAgICBcInF1XCI6IFwiUXVlY2h1YVwiLFxyXG4gICAgXCJyb1wiOiBcIlJvbWFuaWFuXCIsXHJcbiAgICBcInJtXCI6IFwiUm9tYW5zaFwiLFxyXG4gICAgXCJyb21cIjogXCJSb21hbnlcIixcclxuICAgIFwicm9vdFwiOiBcIlJvb3RcIixcclxuICAgIFwicnVcIjogXCJSdXNzaWFuXCIsXHJcbiAgICBcInJ3a1wiOiBcIlJ3YVwiLFxyXG4gICAgXCJzYWhcIjogXCJTYWtoYVwiLFxyXG4gICAgXCJzYW1cIjogXCJTYW1hcml0YW4gQXJhbWFpY1wiLFxyXG4gICAgXCJzbVwiOiBcIlNhbW9hblwiLFxyXG4gICAgXCJzY29cIjogXCJTY290c1wiLFxyXG4gICAgXCJnZFwiOiBcIlNjb3R0aXNoIEdhZWxpY1wiLFxyXG4gICAgXCJzbHlcIjogXCJTZWxheWFyXCIsXHJcbiAgICBcInNlbFwiOiBcIlNlbGt1cFwiLFxyXG4gICAgXCJzZWhcIjogXCJTZW5hXCIsXHJcbiAgICBcInNlZVwiOiBcIlNlbmVjYVwiLFxyXG4gICAgXCJzclwiOiBcIlNlcmJpYW5cIixcclxuICAgIFwic2hcIjogXCJTZXJiby1Dcm9hdGlhblwiLFxyXG4gICAgXCJzcnJcIjogXCJTZXJlclwiLFxyXG4gICAgXCJzZWlcIjogXCJTZXJpXCIsXHJcbiAgICBcImtzYlwiOiBcIlNoYW1iYWxhXCIsXHJcbiAgICBcInNoblwiOiBcIlNoYW5cIixcclxuICAgIFwic25cIjogXCJTaG9uYVwiLFxyXG4gICAgXCJpaVwiOiBcIlNpY2h1YW4gWWlcIixcclxuICAgIFwic2NuXCI6IFwiU2ljaWxpYW5cIixcclxuICAgIFwic2lkXCI6IFwiU2lkYW1vXCIsXHJcbiAgICBcImJsYVwiOiBcIlNpa3Npa2FcIixcclxuICAgIFwic3psXCI6IFwiU2lsZXNpYW5cIixcclxuICAgIFwiemhfSGFuc1wiOiBcIlNpbXBsaWZpZWQgQ2hpbmVzZVwiLFxyXG4gICAgXCJzZFwiOiBcIlNpbmRoaVwiLFxyXG4gICAgXCJzaVwiOiBcIlNpbmhhbGFcIixcclxuICAgIFwic21zXCI6IFwiU2tvbHQgU2FtaVwiLFxyXG4gICAgXCJkZW5cIjogXCJTbGF2ZVwiLFxyXG4gICAgXCJza1wiOiBcIlNsb3Zha1wiLFxyXG4gICAgXCJzbFwiOiBcIlNsb3ZlbmlhblwiLFxyXG4gICAgXCJ4b2dcIjogXCJTb2dhXCIsXHJcbiAgICBcInNvZ1wiOiBcIlNvZ2RpZW5cIixcclxuICAgIFwic29cIjogXCJTb21hbGlcIixcclxuICAgIFwic25rXCI6IFwiU29uaW5rZVwiLFxyXG4gICAgXCJja2JcIjogXCJTb3JhbmkgS3VyZGlzaFwiLFxyXG4gICAgXCJhemJcIjogXCJTb3V0aCBBemVyYmFpamFuaVwiLFxyXG4gICAgXCJuclwiOiBcIlNvdXRoIE5kZWJlbGVcIixcclxuICAgIFwiYWx0XCI6IFwiU291dGhlcm4gQWx0YWlcIixcclxuICAgIFwic21hXCI6IFwiU291dGhlcm4gU2FtaVwiLFxyXG4gICAgXCJzdFwiOiBcIlNvdXRoZXJuIFNvdGhvXCIsXHJcbiAgICBcImVzXCI6IFwiU3BhbmlzaFwiLFxyXG4gICAgXCJzcm5cIjogXCJTcmFuYW4gVG9uZ29cIixcclxuICAgIFwiemdoXCI6IFwiU3RhbmRhcmQgTW9yb2NjYW4gVGFtYXppZ2h0XCIsXHJcbiAgICBcInN1a1wiOiBcIlN1a3VtYVwiLFxyXG4gICAgXCJzdXhcIjogXCJTdW1lcmlhblwiLFxyXG4gICAgXCJzdVwiOiBcIlN1bmRhbmVzZVwiLFxyXG4gICAgXCJzdXNcIjogXCJTdXN1XCIsXHJcbiAgICBcInN3XCI6IFwiU3dhaGlsaVwiLFxyXG4gICAgXCJzc1wiOiBcIlN3YXRpXCIsXHJcbiAgICBcInN2XCI6IFwiU3dlZGlzaFwiLFxyXG4gICAgXCJmcl9DSFwiOiBcIlN3aXNzIEZyZW5jaFwiLFxyXG4gICAgXCJnc3dcIjogXCJTd2lzcyBHZXJtYW5cIixcclxuICAgIFwiZGVfQ0hcIjogXCJTd2lzcyBIaWdoIEdlcm1hblwiLFxyXG4gICAgXCJzeXJcIjogXCJTeXJpYWNcIixcclxuICAgIFwic2hpXCI6IFwiVGFjaGVsaGl0XCIsXHJcbiAgICBcInRsXCI6IFwiVGFnYWxvZ1wiLFxyXG4gICAgXCJ0eVwiOiBcIlRhaGl0aWFuXCIsXHJcbiAgICBcImRhdlwiOiBcIlRhaXRhXCIsXHJcbiAgICBcInRnXCI6IFwiVGFqaWtcIixcclxuICAgIFwidGx5XCI6IFwiVGFseXNoXCIsXHJcbiAgICBcInRtaFwiOiBcIlRhbWFzaGVrXCIsXHJcbiAgICBcInRhXCI6IFwiVGFtaWxcIixcclxuICAgIFwidHJ2XCI6IFwiVGFyb2tvXCIsXHJcbiAgICBcInR3cVwiOiBcIlRhc2F3YXFcIixcclxuICAgIFwidHRcIjogXCJUYXRhclwiLFxyXG4gICAgXCJ0ZVwiOiBcIlRlbHVndVwiLFxyXG4gICAgXCJ0ZXJcIjogXCJUZXJlbm9cIixcclxuICAgIFwidGVvXCI6IFwiVGVzb1wiLFxyXG4gICAgXCJ0ZXRcIjogXCJUZXR1bVwiLFxyXG4gICAgXCJ0aFwiOiBcIlRoYWlcIixcclxuICAgIFwiYm9cIjogXCJUaWJldGFuXCIsXHJcbiAgICBcInRpZ1wiOiBcIlRpZ3JlXCIsXHJcbiAgICBcInRpXCI6IFwiVGlncmlueWFcIixcclxuICAgIFwidGVtXCI6IFwiVGltbmVcIixcclxuICAgIFwidGl2XCI6IFwiVGl2XCIsXHJcbiAgICBcInRsaVwiOiBcIlRsaW5naXRcIixcclxuICAgIFwidHBpXCI6IFwiVG9rIFBpc2luXCIsXHJcbiAgICBcInRrbFwiOiBcIlRva2VsYXVcIixcclxuICAgIFwidG9cIjogXCJUb25nYW5cIixcclxuICAgIFwiZml0XCI6IFwiVG9ybmVkYWxlbiBGaW5uaXNoXCIsXHJcbiAgICBcInpoX0hhbnRcIjogXCJUcmFkaXRpb25hbCBDaGluZXNlXCIsXHJcbiAgICBcInRrclwiOiBcIlRzYWtodXJcIixcclxuICAgIFwidHNkXCI6IFwiVHNha29uaWFuXCIsXHJcbiAgICBcInRzaVwiOiBcIlRzaW1zaGlhblwiLFxyXG4gICAgXCJ0c1wiOiBcIlRzb25nYVwiLFxyXG4gICAgXCJ0blwiOiBcIlRzd2FuYVwiLFxyXG4gICAgXCJ0Y3lcIjogXCJUdWx1XCIsXHJcbiAgICBcInR1bVwiOiBcIlR1bWJ1a2FcIixcclxuICAgIFwiYWViXCI6IFwiVHVuaXNpYW4gQXJhYmljXCIsXHJcbiAgICBcInRyXCI6IFwiVHVya2lzaFwiLFxyXG4gICAgXCJ0a1wiOiBcIlR1cmttZW5cIixcclxuICAgIFwidHJ1XCI6IFwiVHVyb3lvXCIsXHJcbiAgICBcInR2bFwiOiBcIlR1dmFsdVwiLFxyXG4gICAgXCJ0eXZcIjogXCJUdXZpbmlhblwiLFxyXG4gICAgXCJ0d1wiOiBcIlR3aVwiLFxyXG4gICAgXCJrY2dcIjogXCJUeWFwXCIsXHJcbiAgICBcInVkbVwiOiBcIlVkbXVydFwiLFxyXG4gICAgXCJ1Z2FcIjogXCJVZ2FyaXRpY1wiLFxyXG4gICAgXCJ1a1wiOiBcIlVrcmFpbmlhblwiLFxyXG4gICAgXCJ1bWJcIjogXCJVbWJ1bmR1XCIsXHJcbiAgICBcInVuZFwiOiBcIlVua25vd24gTGFuZ3VhZ2VcIixcclxuICAgIFwiaHNiXCI6IFwiVXBwZXIgU29yYmlhblwiLFxyXG4gICAgXCJ1clwiOiBcIlVyZHVcIixcclxuICAgIFwidWdcIjogXCJVeWdodXJcIixcclxuICAgIFwidXpcIjogXCJVemJla1wiLFxyXG4gICAgXCJ2YWlcIjogXCJWYWlcIixcclxuICAgIFwidmVcIjogXCJWZW5kYVwiLFxyXG4gICAgXCJ2ZWNcIjogXCJWZW5ldGlhblwiLFxyXG4gICAgXCJ2ZXBcIjogXCJWZXBzXCIsXHJcbiAgICBcInZpXCI6IFwiVmlldG5hbWVzZVwiLFxyXG4gICAgXCJ2b1wiOiBcIlZvbGFwXFx1MDBmY2tcIixcclxuICAgIFwidnJvXCI6IFwiVlxcdTAwZjVyb1wiLFxyXG4gICAgXCJ2b3RcIjogXCJWb3RpY1wiLFxyXG4gICAgXCJ2dW5cIjogXCJWdW5qb1wiLFxyXG4gICAgXCJ3YVwiOiBcIldhbGxvb25cIixcclxuICAgIFwid2FlXCI6IFwiV2Fsc2VyXCIsXHJcbiAgICBcIndhclwiOiBcIldhcmF5XCIsXHJcbiAgICBcIndhc1wiOiBcIldhc2hvXCIsXHJcbiAgICBcImd1Y1wiOiBcIldheXV1XCIsXHJcbiAgICBcImN5XCI6IFwiV2Vsc2hcIixcclxuICAgIFwidmxzXCI6IFwiV2VzdCBGbGVtaXNoXCIsXHJcbiAgICBcImZ5XCI6IFwiV2VzdGVybiBGcmlzaWFuXCIsXHJcbiAgICBcIm1yalwiOiBcIldlc3Rlcm4gTWFyaVwiLFxyXG4gICAgXCJ3YWxcIjogXCJXb2xheXR0YVwiLFxyXG4gICAgXCJ3b1wiOiBcIldvbG9mXCIsXHJcbiAgICBcInd1dVwiOiBcIld1IENoaW5lc2VcIixcclxuICAgIFwieGhcIjogXCJYaG9zYVwiLFxyXG4gICAgXCJoc25cIjogXCJYaWFuZyBDaGluZXNlXCIsXHJcbiAgICBcInlhdlwiOiBcIllhbmdiZW5cIixcclxuICAgIFwieWFvXCI6IFwiWWFvXCIsXHJcbiAgICBcInlhcFwiOiBcIllhcGVzZVwiLFxyXG4gICAgXCJ5YmJcIjogXCJZZW1iYVwiLFxyXG4gICAgXCJ5aVwiOiBcIllpZGRpc2hcIixcclxuICAgIFwieW9cIjogXCJZb3J1YmFcIixcclxuICAgIFwiemFwXCI6IFwiWmFwb3RlY1wiLFxyXG4gICAgXCJkamVcIjogXCJaYXJtYVwiLFxyXG4gICAgXCJ6emFcIjogXCJaYXphXCIsXHJcbiAgICBcInplYVwiOiBcIlplZWxhbmRpY1wiLFxyXG4gICAgXCJ6ZW5cIjogXCJaZW5hZ2FcIixcclxuICAgIFwiemFcIjogXCJaaHVhbmdcIixcclxuICAgIFwiZ2J6XCI6IFwiWm9yb2FzdHJpYW4gRGFyaVwiLFxyXG4gICAgXCJ6dVwiOiBcIlp1bHVcIixcclxuICAgIFwienVuXCI6IFwiWnVuaVwiXHJcbn1cclxuXHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L2NhL2NhLmRhdGEuanMiLCIvKipcclxuICogQ3JlYXRlZCBieSBKdWFuQ3J1eiBvbiA0LzEvMjAxOC5cclxuICovXHJcblxyXG4kKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICB3aW5kb3cuQ29udGVudEFyZW5hID0gd2luZG93LkNvbnRlbnRBcmVuYSB8fCB7fTtcclxuXHJcbiAgICBDb250ZW50QXJlbmEuTW9kZWwgPSBDb250ZW50QXJlbmEuTW9kZWwgfHwge307XHJcblxyXG4gICAgQ29udGVudEFyZW5hLk1vZGVsLlJpZ2h0UGFja2FnZSA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdGhpcy5pZCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gbnVsbDtcclxuICAgICAgICB0aGlzLnJpZ2h0cyA9IHt9O1xyXG4gICAgfTtcclxuXHJcbiAgICBDb250ZW50QXJlbmEuTW9kZWwuRGlzdHJpYnV0aW9uUGFja2FnZSA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdGhpcy5pZCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gbnVsbDtcclxuICAgICAgICB0aGlzLnByb2R1Y3Rpb24gPSB7fTtcclxuICAgICAgICB0aGlzLnRlY2huaWNhbCA9IHt9O1xyXG4gICAgfTtcclxuXHJcbiAgICBDb250ZW50QXJlbmEuTW9kZWwuUmlnaHQgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIHRoaXMuaWQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5yaWdodEl0ZW1zID0ge307XHJcbiAgICB9O1xyXG5cclxuICAgIENvbnRlbnRBcmVuYS5Nb2RlbC5SaWdodEl0ZW0gPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIHRoaXMuaWQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5pbnB1dHMgPSBbXTtcclxuICAgIH07XHJcblxyXG4gICAgQ29udGVudEFyZW5hLk1vZGVsLlNlbGVjdGVkUmlnaHQgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIHRoaXMucmlnaHQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMucmlnaHRJdGVtID0gbnVsbDtcclxuICAgICAgICB0aGlzLmRpc3RyaWJ1dGlvblBhY2thZ2UgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuZ3JvdXAgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuaW5wdXRzID0gW107XHJcbiAgICB9O1xyXG5cclxuICAgIENvbnRlbnRBcmVuYS5Nb2RlbC5TYWxlc1BhY2thZ2UgPSBmdW5jdGlvbigpe1xyXG5cclxuICAgICAgICB0aGlzLnNhbGVzTWV0aG9kID0gIG51bGw7XHJcbiAgICAgICAgdGhpcy5mZWUgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuY3VycmVuY3kgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuaWQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy50ZXJyaXRvcmllcyA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZFRlcnJpdG9yaWVzID0gW107XHJcbiAgICAgICAgdGhpcy5leGNsdWRlZFRlcnJpdG9yaWVzID0gW107XHJcbiAgICAgICAgdGhpcy50ZXJyaXRvcnlCaWRzID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zZWxsQXNQYWNrYWdlID0gZmFsc2U7XHJcblxyXG4gICAgICAgIHRoaXMudmFsaWRhdGUgPSAoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICB2YXIgZGVzY3JpcHRpb24gPSBcIlNhbGVzIFBhY2thZ2UgXCIgKyB0aGlzLmlkICsgXCI6IFwiLFxyXG4gICAgICAgICAgICAgICAgaGFzRXJyb3JzID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICBpZiAoICEgdGhpcy5jdXJyZW5jeSApIHtcclxuICAgICAgICAgICAgICAgIGhhc0Vycm9ycyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbiArPSBcIkN1cnJlbmN5IGNhbid0IGJlIGVtcHR5LiBcIjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCAhIHRoaXMuZmVlICkge1xyXG4gICAgICAgICAgICAgICAgaGFzRXJyb3JzID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uICs9IFwiRmVlIGNhbid0IGJlIGVtcHR5LiBcIjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCAhIHRoaXMudGVycml0b3JpZXMgKSB7XHJcbiAgICAgICAgICAgICAgICBoYXNFcnJvcnMgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb24gKz0gXCJUZXJyaXRvcmllcyBjYW4ndCBiZSBlbXB0eS4gXCI7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICggISB0aGlzLnNhbGVzTWV0aG9kICkge1xyXG4gICAgICAgICAgICAgICAgaGFzRXJyb3JzID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uICs9IFwiU2FsZXMgbWV0aG9kIGNhbid0IGJlIGVtcHR5LiBcIjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIGhhc0Vycm9yczogaGFzRXJyb3JzLFxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb24gOiBkZXNjcmlwdGlvblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH07XHJcblxyXG4gICAgQ29udGVudEFyZW5hLk1vZGVsLkNvbnRlbnQgPSBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgdGhpcy5zcG9ydCA9IHt9O1xyXG4gICAgICAgIHRoaXMuc3BvcnRzID0gW107XHJcbiAgICAgICAgdGhpcy50b3VybmFtZW50ID0gbnVsbDtcclxuICAgICAgICB0aGlzLmNhdGVnb3J5ID0gbnVsbDtcclxuICAgICAgICB0aGlzLmV2ZW50VHlwZSA9IFwiZGF0YWJhc2VcIjtcclxuICAgICAgICB0aGlzLnNhbGVzUGFja2FnZXMgPSB7fTtcclxuICAgICAgICB0aGlzLmluc3RhbGxtZW50cyA9IHt9O1xyXG5cclxuICAgICAgICB0aGlzLmdldFRpdGxlID0gKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcyk7XHJcblxyXG4gICAgICAgICAgICB2YXIgdGl0bGUgPSBcIlwiO1xyXG5cclxuICAgICAgICAgICAgaWYgKCB0aGlzLnNwb3J0cy5sZW5ndGggPiAwICl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNwb3J0cy5mb3JFYWNoKGZ1bmN0aW9uIChzcG9ydCwgaW5kZXgsIGFycmF5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGUgKz0gc3BvcnQudmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCAoaW5kZXgrMSkgIT0gYXJyYXkubGVuZ3RoICkgdGl0bGUgKz0gXCIsIFwiXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCB0aGlzLmV2ZW50VHlwZSA9PT0gXCJjdXN0b21cIiApe1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCB0aGlzLmV2ZW50VHlwZSA9PT0gXCJkYXRhYmFzZVwiICl7XHJcbiAgICAgICAgICAgICAgICBpZiAoIHRoaXMuc3BvcnQgIT09IG51bGwgKSB0aXRsZSArPSB0aGlzLnNwb3J0LnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgaWYgKCB0aGlzLmNhdGVnb3J5ICE9PSBudWxsICkgdGl0bGUgKz0gXCIgLSBcIiArIHRoaXMuY2F0ZWdvcnkudmFsdWU7XHJcbiAgICAgICAgICAgICAgICBpZiAoIHRoaXMudG91cm5hbWVudCAhPT0gbnVsbCApIHRpdGxlICs9IFwiIC0gXCIgKyB0aGlzLnRvdXJuYW1lbnQudmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICggdGhpcy5zZWFzb25zICYmIHRoaXMuc2Vhc29ucy5sZW5ndGggPiAwKXtcclxuICAgICAgICAgICAgICAgIHRpdGxlICs9IFwiIFwiICsgdGhpcy5zZWFzb25zLm1hcCggKCBzZWFzb24gKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlcyA9IHNlYXNvbi52YWx1ZS5zcGxpdChcIiBcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlc1t2YWx1ZXMubGVuZ3RoIC0gMV1cclxuICAgICAgICAgICAgICAgIH0pLmpvaW4oXCIgLSBcIik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0aXRsZTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB3YXRjaCh0aGlzLCBcInNwb3J0c1wiLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlVwZGF0aW5nIHNwb3J0c1wiLCBhcmd1bWVudHMpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB3YXRjaCh0aGlzLCBcImV2ZW50VHlwZVwiLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlVwZGF0aW5nIGV2ZW50VHlwZVwiLCBhcmd1bWVudHMpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH07XHJcblxyXG59KTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvY2EvY2EubW9kZWxzLmpzIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgSnVhbkNydXogb24gNC8xLzIwMTguXHJcbiAqL1xyXG5cclxud2luZG93LkNvbnRlbnRBcmVuYSA9IHdpbmRvdy5Db250ZW50QXJlbmEgfHwge307XHJcblxyXG5Db250ZW50QXJlbmEuVXRpbHMgPSB7XHJcbiAgICBhZGRSZWdpb25CZWhhdmlvdXIoc2VsZWN0b3IpIHtcclxuXHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBob3N0dXJsICsgXCJ2MS9mZWVkL3Rlc3RcIixcclxuICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgcmVzcG9uc2Uuc29ydChmdW5jdGlvbiAoYSwgYikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoYS5uYW1lID4gYi5uYW1lKSA/IDEgOiAoKGIubmFtZSA+IGEubmFtZSkgPyAtMSA6IDApO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgJChzZWxlY3RvcikuaHRtbChcIlwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICAgICAqIEBwYXJhbSB7eyBjb3VudHJ5X2NvZGU6IHN0cmluZyB9fSB2XHJcbiAgICAgICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgICAgICQuZWFjaChyZXNwb25zZSwgZnVuY3Rpb24gKGssIHYpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG9wdGlvbiA9ICc8b3B0aW9uIHZhbHVlPScgKyB2LmNvdW50cnlfY29kZSArICc+JyArIHYubmFtZSArICc8L29wdGlvbj4nO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKHNlbGVjdG9yKS5lYWNoKGZ1bmN0aW9uIChrZXksIHNlbGVjdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHNlbGVjdCkuYXBwZW5kKG9wdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgJChzZWxlY3RvcikuY2hvc2VuKHt3aWR0aDogXCI1MCVcIn0pO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIGFkZExhbmd1YWdlQmVoYXZpb3VyKCBzZWxlY3RvciApe1xyXG5cclxuICAgICAgICAkKHNlbGVjdG9yKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9ICQodGhpcyk7XHJcblxyXG4gICAgICAgICAgICBpZiAoX3RoaXMuZGF0YShcImNob3NlblwiKSAhPT0gdW5kZWZpbmVkICkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgJC5lYWNoKENvbnRlbnRBcmVuYS5MYW5ndWFnZXMuU2hvcnQsIGZ1bmN0aW9uKGssIHYpe1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBvcHRpb24gPSAnPG9wdGlvbiB2YWx1ZT0nICsgayArICc+JyArIHYgKyAnPC9vcHRpb24+JztcclxuICAgICAgICAgICAgICAgIF90aGlzLmFwcGVuZChvcHRpb24pO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIF90aGlzLmNob3NlbigpO1xyXG5cclxuICAgICAgICAgICAgX3RoaXMuY2hvc2VuKCkuY2hhbmdlKGZ1bmN0aW9uIChlLCBvcHQpIHtcclxuICAgICAgICAgICAgICAgIGlmIChvcHQuc2VsZWN0ZWQgJiYgb3B0LnNlbGVjdGVkID09PSBcImFsbFwiKXtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuaHRtbChcIlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAkLmVhY2goQ29udGVudEFyZW5hLkxhbmd1YWdlcy5Mb25nLCBmdW5jdGlvbihrLCB2KXtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvcHRpb24gPSAnPG9wdGlvbiB2YWx1ZT0nICsgayArICc+JyArIHYgKyAnPC9vcHRpb24+JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuYXBwZW5kKG9wdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLnRyaWdnZXIoXCJjaG9zZW46dXBkYXRlZFwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgaXNBUElBdmFpbGFibGUoKSB7XHJcbiAgICAgICAgLy8gQ2hlY2sgZm9yIHRoZSB2YXJpb3VzIEZpbGUgQVBJIHN1cHBvcnQuXHJcbiAgICAgICAgaWYgKHdpbmRvdy5GaWxlICYmIHdpbmRvdy5GaWxlUmVhZGVyICYmIHdpbmRvdy5GaWxlTGlzdCAmJiB3aW5kb3cuQmxvYikge1xyXG4gICAgICAgICAgICAvLyBHcmVhdCBzdWNjZXNzISBBbGwgdGhlIEZpbGUgQVBJcyBhcmUgc3VwcG9ydGVkLlxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBzb3VyY2U6IEZpbGUgQVBJIGF2YWlsYWJpbGl0eSAtIGh0dHA6Ly9jYW5pdXNlLmNvbS8jZmVhdD1maWxlYXBpXHJcbiAgICAgICAgICAgIC8vIHNvdXJjZTogPG91dHB1dD4gYXZhaWxhYmlsaXR5IC0gaHR0cDovL2h0bWw1ZG9jdG9yLmNvbS90aGUtb3V0cHV0LWVsZW1lbnQvXHJcbiAgICAgICAgICAgIGRvY3VtZW50LndyaXRlbG4oJ1RoZSBIVE1MNSBBUElzIHVzZWQgaW4gdGhpcyBmb3JtIGFyZSBvbmx5IGF2YWlsYWJsZSBpbiB0aGUgZm9sbG93aW5nIGJyb3dzZXJzOjxiciAvPicpO1xyXG4gICAgICAgICAgICAvLyA2LjAgRmlsZSBBUEkgJiAxMy4wIDxvdXRwdXQ+XHJcbiAgICAgICAgICAgIGRvY3VtZW50LndyaXRlbG4oJyAtIEdvb2dsZSBDaHJvbWU6IDEzLjAgb3IgbGF0ZXI8YnIgLz4nKTtcclxuICAgICAgICAgICAgLy8gMy42IEZpbGUgQVBJICYgNi4wIDxvdXRwdXQ+XHJcbiAgICAgICAgICAgIGRvY3VtZW50LndyaXRlbG4oJyAtIE1vemlsbGEgRmlyZWZveDogNi4wIG9yIGxhdGVyPGJyIC8+Jyk7XHJcbiAgICAgICAgICAgIC8vIDEwLjAgRmlsZSBBUEkgJiAxMC4wIDxvdXRwdXQ+XHJcbiAgICAgICAgICAgIGRvY3VtZW50LndyaXRlbG4oJyAtIEludGVybmV0IEV4cGxvcmVyOiBOb3Qgc3VwcG9ydGVkIChwYXJ0aWFsIHN1cHBvcnQgZXhwZWN0ZWQgaW4gMTAuMCk8YnIgLz4nKTtcclxuICAgICAgICAgICAgLy8gPyBGaWxlIEFQSSAmIDUuMSA8b3V0cHV0PlxyXG4gICAgICAgICAgICBkb2N1bWVudC53cml0ZWxuKCcgLSBTYWZhcmk6IE5vdCBzdXBwb3J0ZWQ8YnIgLz4nKTtcclxuICAgICAgICAgICAgLy8gPyBGaWxlIEFQSSAmIDkuMiA8b3V0cHV0PlxyXG4gICAgICAgICAgICBkb2N1bWVudC53cml0ZWxuKCcgLSBPcGVyYTogTm90IHN1cHBvcnRlZCcpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGFkZE9yZGluYWwobikge1xyXG4gICAgICAgIHZhciBzdHIgPSBuLnRvU3RyaW5nKCkuc2xpY2UoLTEpLFxyXG4gICAgICAgICAgICBvcmQgPSAnJztcclxuICAgICAgICBzd2l0Y2ggKHN0cikge1xyXG4gICAgICAgICAgICBjYXNlICcxJzpcclxuICAgICAgICAgICAgICAgIG9yZCA9ICdzdCc7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnMic6XHJcbiAgICAgICAgICAgICAgICBvcmQgPSAnbmQnO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJzMnOlxyXG4gICAgICAgICAgICAgICAgb3JkID0gJ3JkJztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICc0JzpcclxuICAgICAgICAgICAgY2FzZSAnNSc6XHJcbiAgICAgICAgICAgIGNhc2UgJzYnOlxyXG4gICAgICAgICAgICBjYXNlICc3JzpcclxuICAgICAgICAgICAgY2FzZSAnOCc6XHJcbiAgICAgICAgICAgIGNhc2UgJzknOlxyXG4gICAgICAgICAgICBjYXNlICcwJzpcclxuICAgICAgICAgICAgICAgIG9yZCA9ICd0aCc7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG4gKyBvcmQ7XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHZhbHVlXHJcbiAgICAgKiBAcGFyYW0gYXJyXHJcbiAgICAgKiBAcGFyYW0gcHJvcFxyXG4gICAgICogQHJldHVybnMge251bWJlcn1cclxuICAgICAqL1xyXG4gICAgZ2V0SW5kZXggKHZhbHVlLCBhcnIsIHByb3ApIHtcclxuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmKGFycltpXVtwcm9wXSA9PT0gdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAtMTsgLy90byBoYW5kbGUgdGhlIGNhc2Ugd2hlcmUgdGhlIHZhbHVlIGRvZXNuJ3QgZXhpc3RcclxuICAgIH1cclxuXHJcbn07XHJcblxyXG5cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvY2EvY2EudXRpbHMuanMiXSwic291cmNlUm9vdCI6IiJ9