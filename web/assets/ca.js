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
    getSeasons: function getSeasons(tournamentId) {
        var deferred = jQuery.Deferred(),
            _this = this;

        $.ajax({
            url: hosturl + "v1/feed/seasons",
            type: "POST",
            data: { id: tournamentId },
            /**
             * @param {{tournaments:{tournament:Array}}} response
             */
            success: function success(response) {

                var list;

                if (response.seasons === undefined || response.seasons.season === undefined) return false;

                if ($.isArray(response.seasons.season)) {
                    list = $.map(response.seasons.season, function (item) {
                        return {
                            name: item['@attributes'].name,
                            external_id: item['@attributes'].id,
                            end_date: item['@attributes'].end_date,
                            start_date: item['@attributes'].start_date,
                            tournament_id: item['@attributes'].tournament_id,
                            year: item['@attributes'].year
                        };
                    }).reverse();
                } else {
                    list = [{
                        name: response.seasons.season['@attributes'].name,
                        external_id: response.seasons.season['@attributes'].id,
                        end_date: response.seasons.season['@attributes'].end_date,
                        start_date: response.seasons.season['@attributes'].start_date,
                        tournament_id: response.seasons.season['@attributes'].tournament_id,
                        year: response.seasons.season['@attributes'].year
                    }];
                }

                /* list.push({
                     name : "Add new",
                     external_id : 0
                 });*/

                deferred.resolve(list);
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
    getSchedule: function getSchedule(seasonId) {
        var deferred = jQuery.Deferred(),
            _this = this;

        $.ajax({
            url: hosturl + "v1/feed/schedules",
            type: "POST",
            data: { id: seasonId },
            /**
             * @param {{tournaments:{tournament:Array}}} response
             */
            success: function success(response) {

                console.log(response);

                var list = {};

                if (response.sport_events === undefined || response.sport_events.sport_event === undefined) return false;

                response.sport_events.sport_event.forEach(function (item) {

                    var round = item.tournament_round ? item.tournament_round['@attributes'] : null;

                    if (!round) return;

                    var name = round.number || round.name;

                    if (!list[name]) list[name] = [];

                    list[name].push({
                        scheduled: item['@attributes'].scheduled,
                        external_id: item['@attributes'].id,
                        status: item['@attributes'].status,
                        tournament_round: round,
                        competitors: item.competitors ? item.competitors.competitor.map(function (competitor) {
                            return competitor['@attributes'];
                        }) : null
                    });
                });

                /*list.push({
                    name : "Add new",
                    external_id : 0
                });*/

                deferred.resolve(list);
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
    searchCompetition: function searchCompetition(request) {

        var deferred = jQuery.Deferred();

        $.ajax({
            url: envhosturl + 'search/tournament',
            data: {
                "content": request
            },
            traditional: true,
            type: "POST",
            dataType: "json",
            success: function success(data) {
                deferred.resolve(data);
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
    watchlist: function watchlist(id) {
        var deferred = jQuery.Deferred(),
            _this = this;

        $.ajax({
            url: envhosturl + "mycontent/watchlist/",
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9jYS9jYS5hcGkuY29udGVudC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9jYS9jYS5hcGkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvY2EvY2EuZGF0YS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9jYS9jYS5tb2RlbHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvY2EvY2EudXRpbHMuanMiXSwibmFtZXMiOlsiX19hcGlTdG9yZSIsInRvdXJuYW1lbnRzIiwid2luZG93IiwiQ29udGVudEFyZW5hIiwiQ29udGVudEFwaSIsInNhdmVDb250ZW50QXNEcmFmdCIsImNvbnRlbnQiLCJkZWZlcnJlZCIsImpRdWVyeSIsIkRlZmVycmVkIiwiX3RoaXMiLCIkIiwiYWpheCIsInVybCIsImVudmhvc3R1cmwiLCJ0eXBlIiwiZGF0YSIsIkpTT04iLCJzdHJpbmdpZnkiLCJjb250ZW50VHlwZSIsInN1Y2Nlc3MiLCJyZXNwb25zZSIsInJlc29sdmUiLCJlcnJvciIsInN0YXR1cyIsInJlamVjdCIsInByb21pc2UiLCJBcGkiLCJzb3J0QnlMYWJlbCIsImEiLCJiIiwibGFiZWwiLCJwcmVwYXJlTGlzdCIsImxpc3QiLCJjYXRlZ29yeUlkIiwibWFwIiwiaXRlbSIsImNhdGVnb3J5IiwiaWQiLCJuYW1lIiwiZXh0ZXJuYWxfaWQiLCJzb3J0IiwiZ2V0Q29udGVudCIsImZpbHRlciIsInNhdmVGaWx0ZXIiLCJnZXRTcG9ydHMiLCJob3N0dXJsIiwic3BvcnRzIiwic3BvcnQiLCJnZXRDb250ZW50RGV0YWlscyIsImdldFBlbmRpbmdMaXN0aW5ncyIsImdldENhdGVnb3JpZXMiLCJzcG9ydElkIiwiY2F0cyIsImdldFRvdXJuYW1lbnRzIiwiZG9uZSIsInRvdXJuYW1lbnQiLCJpbmRleE9mIiwicHVzaCIsInVuZGVmaW5lZCIsImdldFNlYXNvbnMiLCJ0b3VybmFtZW50SWQiLCJzZWFzb25zIiwic2Vhc29uIiwiaXNBcnJheSIsImVuZF9kYXRlIiwic3RhcnRfZGF0ZSIsInRvdXJuYW1lbnRfaWQiLCJ5ZWFyIiwicmV2ZXJzZSIsImdldFNjaGVkdWxlIiwic2Vhc29uSWQiLCJjb25zb2xlIiwibG9nIiwic3BvcnRfZXZlbnRzIiwic3BvcnRfZXZlbnQiLCJmb3JFYWNoIiwicm91bmQiLCJ0b3VybmFtZW50X3JvdW5kIiwibnVtYmVyIiwic2NoZWR1bGVkIiwiY29tcGV0aXRvcnMiLCJjb21wZXRpdG9yIiwic2VhcmNoQ29tcGV0aXRpb24iLCJyZXF1ZXN0IiwidHJhZGl0aW9uYWwiLCJkYXRhVHlwZSIsIndhdGNobGlzdCIsIkRhdGEiLCJMYW5ndWFnZXMiLCJUb3BTcG9ydHMiLCJGdWxsU3BvcnRzIiwiU2hvcnQiLCJMb25nIiwiTW9kZWwiLCJSaWdodFBhY2thZ2UiLCJyaWdodHMiLCJEaXN0cmlidXRpb25QYWNrYWdlIiwicHJvZHVjdGlvbiIsInRlY2huaWNhbCIsIlJpZ2h0IiwicmlnaHRJdGVtcyIsIlJpZ2h0SXRlbSIsImlucHV0cyIsIlNlbGVjdGVkUmlnaHQiLCJyaWdodCIsInJpZ2h0SXRlbSIsImRpc3RyaWJ1dGlvblBhY2thZ2UiLCJncm91cCIsIlNhbGVzUGFja2FnZSIsInNhbGVzTWV0aG9kIiwiZmVlIiwiY3VycmVuY3kiLCJ0ZXJyaXRvcmllcyIsInNlbGVjdGVkVGVycml0b3JpZXMiLCJleGNsdWRlZFRlcnJpdG9yaWVzIiwidGVycml0b3J5QmlkcyIsInNlbGxBc1BhY2thZ2UiLCJ2YWxpZGF0ZSIsImRlc2NyaXB0aW9uIiwiaGFzRXJyb3JzIiwiQ29udGVudCIsImV2ZW50VHlwZSIsInNhbGVzUGFja2FnZXMiLCJpbnN0YWxsbWVudHMiLCJnZXRUaXRsZSIsInRpdGxlIiwibGVuZ3RoIiwiaW5kZXgiLCJhcnJheSIsInZhbHVlIiwidmFsdWVzIiwic3BsaXQiLCJqb2luIiwid2F0Y2giLCJhcmd1bWVudHMiLCJVdGlscyIsImFkZFJlZ2lvbkJlaGF2aW91ciIsInNlbGVjdG9yIiwiaHRtbCIsImVhY2giLCJrIiwidiIsIm9wdGlvbiIsImNvdW50cnlfY29kZSIsImtleSIsInNlbGVjdCIsImFwcGVuZCIsImNob3NlbiIsIndpZHRoIiwiYWRkTGFuZ3VhZ2VCZWhhdmlvdXIiLCJjaGFuZ2UiLCJlIiwib3B0Iiwic2VsZWN0ZWQiLCJ0cmlnZ2VyIiwiaXNBUElBdmFpbGFibGUiLCJGaWxlIiwiRmlsZVJlYWRlciIsIkZpbGVMaXN0IiwiQmxvYiIsImRvY3VtZW50Iiwid3JpdGVsbiIsImFkZE9yZGluYWwiLCJuIiwic3RyIiwidG9TdHJpbmciLCJzbGljZSIsIm9yZCIsImdldEluZGV4IiwiYXJyIiwicHJvcCIsImkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztBQUlBLElBQUlBLGFBQWE7QUFDYkMsaUJBQWM7QUFERCxDQUFqQjs7QUFJQUMsT0FBT0MsWUFBUCxHQUFzQkQsT0FBT0MsWUFBUCxJQUF1QixFQUE3QztBQUNBQSxhQUFhQyxVQUFiLEdBQTBCRCxhQUFhQyxVQUFiLElBQTBCLEVBQXBEOztBQUVBRCxhQUFhQyxVQUFiLEdBQXlCO0FBQ3JCQyxzQkFEcUIsOEJBQ0FDLE9BREEsRUFDVTtBQUMzQixZQUFJQyxXQUFXQyxPQUFPQyxRQUFQLEVBQWY7QUFBQSxZQUNJQyxRQUFRLElBRFo7O0FBR0FDLFVBQUVDLElBQUYsQ0FBTztBQUNIQyxpQkFBS0MsYUFBYSxvQkFEZjtBQUVIQyxrQkFBTSxNQUZIO0FBR0hDLGtCQUFNQyxLQUFLQyxTQUFMLENBQWVaLE9BQWYsQ0FISDtBQUlIYSx5QkFBYSxrQkFKVjtBQUtIQyxxQkFBUyxpQkFBVUMsUUFBVixFQUFvQjtBQUN6QmQseUJB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QixDQUFWO0FBQUEsWUFDSUMsTUFBTSxFQURWO0FBRUEsZ0JBQVFILEdBQVI7QUFDSSxpQkFBSyxHQUFMO0FBQ0lHLHNCQUFNLElBQU47QUFDQTtBQUNKLGlCQUFLLEdBQUw7QUFDSUEsc0JBQU0sSUFBTjtBQUNBO0FBQ0osaUJBQUssR0FBTDtBQUNJQSxzQkFBTSxJQUFOO0FBQ0E7QUFDSixpQkFBSyxHQUFMO0FBQ0EsaUJBQUssR0FBTDtBQUNBLGlCQUFLLEdBQUw7QUFDQSxpQkFBSyxHQUFMO0FBQ0EsaUJBQUssR0FBTDtBQUNBLGlCQUFLLEdBQUw7QUFDQSxpQkFBSyxHQUFMO0FBQ0lBLHNCQUFNLElBQU47QUFDQTtBQWxCUjtBQW9CQSxlQUFPSixJQUFJSSxHQUFYO0FBQ0gsS0E5R2dCOztBQStHakI7Ozs7Ozs7QUFPQUMsWUF0SGlCLG9CQXNIUHZDLEtBdEhPLEVBc0hBd0MsR0F0SEEsRUFzSEtDLElBdEhMLEVBc0hXO0FBQ3hCLGFBQUksSUFBSUMsSUFBSSxDQUFaLEVBQWVBLElBQUlGLElBQUkzQyxNQUF2QixFQUErQjZDLEdBQS9CLEVBQW9DO0FBQ2hDLGdCQUFHRixJQUFJRSxDQUFKLEVBQU9ELElBQVAsTUFBaUJ6QyxLQUFwQixFQUEyQjtBQUN2Qix1QkFBTzBDLENBQVA7QUFDSDtBQUNKO0FBQ0QsZUFBTyxDQUFDLENBQVIsQ0FOd0IsQ0FNYjtBQUNkO0FBN0hnQixDQUFyQixDIiwiZmlsZSI6ImNhLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiogQ3JlYXRlZCBieSBKdWFuQ3J1eiBvbiA0LzEvMjAxOC5cclxuKi9cclxuXHJcbmxldCBfX2FwaVN0b3JlID0ge1xyXG4gICAgdG91cm5hbWVudHMgOiB7fVxyXG59O1xyXG5cclxud2luZG93LkNvbnRlbnRBcmVuYSA9IHdpbmRvdy5Db250ZW50QXJlbmEgfHwge307XHJcbkNvbnRlbnRBcmVuYS5Db250ZW50QXBpID0gQ29udGVudEFyZW5hLkNvbnRlbnRBcGl8fCB7fTtcclxuXHJcbkNvbnRlbnRBcmVuYS5Db250ZW50QXBpPSB7XHJcbiAgICBzYXZlQ29udGVudEFzRHJhZnQgKCBjb250ZW50ICkge1xyXG4gICAgICAgIHZhciBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxyXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XHJcblxyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiY29udGVudC9kcmFmdC9zYXZlXCIsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShjb250ZW50KSxcclxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcclxuICAgIH0sXHJcblxyXG59O1xyXG5cclxuXHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L2NhL2NhLmFwaS5jb250ZW50LmpzIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgSnVhbkNydXogb24gNC8xLzIwMTguXHJcbiAqL1xyXG5cclxubGV0IF9fYXBpU3RvcmUgPSB7XHJcbiAgICB0b3VybmFtZW50cyA6IHt9XHJcbn07XHJcblxyXG53aW5kb3cuQ29udGVudEFyZW5hID0gd2luZG93LkNvbnRlbnRBcmVuYSB8fCB7fTtcclxuXHJcbkNvbnRlbnRBcmVuYS5BcGk9IHtcclxuICAgIHNvcnRCeUxhYmVsIChhLCBiKSB7XHJcbiAgICAgICAgcmV0dXJuIChhLmxhYmVsID4gYi5sYWJlbCkgPyAxIDogKChiLmxhYmVsID4gYS5sYWJlbCkgPyAtMSA6IDApXHJcbiAgICB9LFxyXG5cclxuICAgIHByZXBhcmVMaXN0ICggbGlzdCwgY2F0ZWdvcnlJZCApIHtcclxuXHJcbiAgICAgICAgbGV0IF90aGlzID0gdGhpcztcclxuXHJcbiAgICAgICAgbGlzdCA9ICQubWFwKGxpc3QsIGZ1bmN0aW9uIChpdGVtKSB7XHJcblxyXG4gICAgICAgICAgICAvLyBGaWx0ZXIgYnkgY2F0ZWdvcnlcclxuICAgICAgICAgICAgaWYgKCBjYXRlZ29yeUlkICYmIGl0ZW0uY2F0ZWdvcnlbJ0BhdHRyaWJ1dGVzJ10uaWQgIT0gY2F0ZWdvcnlJZCkgcmV0dXJuIG51bGw7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4ge25hbWU6IGl0ZW1bJ0BhdHRyaWJ1dGVzJ10ubmFtZSwgZXh0ZXJuYWxfaWQ6IGl0ZW1bJ0BhdHRyaWJ1dGVzJ10uaWR9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGxpc3Quc29ydChfdGhpcy5zb3J0QnlMYWJlbCk7XHJcblxyXG4gICAgICAgIHJldHVybiBsaXN0O1xyXG4gICAgfSxcclxuXHJcbiAgICBnZXRDb250ZW50ICggZmlsdGVyKSB7XHJcbiAgICAgICAgdmFyIGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXHJcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcclxuXHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJidXkvc2VhcmNoXCIsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBkYXRhIDogZmlsdGVyLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcclxuICAgIH0sXHJcblxyXG4gICAgc2F2ZUZpbHRlciAoIGZpbHRlcikge1xyXG4gICAgICAgIHZhciBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxyXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XHJcblxyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYnV5L2ZpbHRlci9zYXZlXCIsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBkYXRhIDogZmlsdGVyLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcclxuICAgIH0sXHJcblxyXG4gICAgZ2V0U3BvcnRzICgpIHtcclxuICAgICAgICB2YXIgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcclxuICAgICAgICAgICAgX3RoaXMgPSB0aGlzO1xyXG5cclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IGhvc3R1cmwgKyBcInYxL2ZlZWQvc3BvcnRzXCIsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBAcGFyYW0ge3tzcG9ydDpvYmplY3R9fSByZXNwb25zZVxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHNwb3J0cyA9IF90aGlzLnByZXBhcmVMaXN0KCByZXNwb25zZS5zcG9ydCk7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHNwb3J0cyk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBnZXRDb250ZW50RGV0YWlscyggaWQgKSB7XHJcbiAgICAgICAgdmFyIGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXHJcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcclxuXHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJjb250ZW50L2RldGFpbHMvXCIsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBkYXRhOiB7aWQgOiBpZH0sXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBnZXRQZW5kaW5nTGlzdGluZ3MoIGlkICkge1xyXG4gICAgICAgIHZhciBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxyXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XHJcblxyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiY29udGVudC9wZW5kaW5nLWxpc3RpbmdzL1wiLFxyXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgZGF0YToge2lkIDogaWR9LFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcclxuICAgIH0sXHJcblxyXG4gICAgZ2V0Q2F0ZWdvcmllcyAoIHNwb3J0SWQgKSB7XHJcbiAgICAgICAgdmFyIGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXHJcbiAgICAgICAgICAgIF90aGlzID0gdGhpcyxcclxuICAgICAgICAgICAgbGlzdCA9IFtdLFxyXG4gICAgICAgICAgICBjYXRzID0gW107XHJcblxyXG4gICAgICAgIF90aGlzLmdldFRvdXJuYW1lbnRzKHNwb3J0SWQpLmRvbmUoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgaWYgKCAhIF9fYXBpU3RvcmUudG91cm5hbWVudHNbc3BvcnRJZF0gKSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKCBbXSApO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsaXN0ID0gJC5tYXAoIF9fYXBpU3RvcmUudG91cm5hbWVudHNbc3BvcnRJZF0udG91cm5hbWVudCAsIGZ1bmN0aW9uIChpdGVtKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGlkID0gaXRlbS5jYXRlZ29yeVsnQGF0dHJpYnV0ZXMnXS5pZDtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIGNhdHMuaW5kZXhPZihpZCkgIT09IC0xICkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXRzLnB1c2goIGlkICk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0uY2F0ZWdvcnk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShfdGhpcy5wcmVwYXJlTGlzdChsaXN0KSApO1xyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcclxuICAgIH0sXHJcblxyXG4gICAgZ2V0VG91cm5hbWVudHMgKCBzcG9ydElkLCBjYXRlZ29yeUlkICkge1xyXG4gICAgICAgIHZhciBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxyXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XHJcblxyXG4gICAgICAgIGlmICggX19hcGlTdG9yZS50b3VybmFtZW50c1tzcG9ydElkXSAhPT0gdW5kZWZpbmVkICl7XHJcbiAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoX3RoaXMucHJlcGFyZUxpc3QoX19hcGlTdG9yZS50b3VybmFtZW50c1tzcG9ydElkXS50b3VybmFtZW50LCBjYXRlZ29yeUlkKSk7XHJcbiAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IGhvc3R1cmwgKyBcInYxL2ZlZWQvdG91cm5hbWVudHNcIixcclxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIGRhdGEgOiB7IGlkIDogc3BvcnRJZCB9LFxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogQHBhcmFtIHt7dG91cm5hbWVudHM6e3RvdXJuYW1lbnQ6QXJyYXl9fX0gcmVzcG9uc2VcclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIEEgY29tbWVudFxyXG4gICAgICAgICAgICAgICAgaWYgKCByZXNwb25zZS50b3VybmFtZW50cyA9PT0gdW5kZWZpbmVkIHx8IHJlc3BvbnNlLnRvdXJuYW1lbnRzLnRvdXJuYW1lbnQgPT09IHVuZGVmaW5lZCApIHtcclxuICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKFtdKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgX19hcGlTdG9yZS50b3VybmFtZW50c1tzcG9ydElkXSA9IHJlc3BvbnNlLnRvdXJuYW1lbnRzO1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShfdGhpcy5wcmVwYXJlTGlzdChyZXNwb25zZS50b3VybmFtZW50cy50b3VybmFtZW50LCBjYXRlZ29yeUlkKSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cyApIHtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBnZXRTZWFzb25zICggdG91cm5hbWVudElkICkge1xyXG4gICAgICAgIHZhciBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxyXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XHJcblxyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogaG9zdHVybCArIFwidjEvZmVlZC9zZWFzb25zXCIsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBkYXRhIDogeyBpZCA6IHRvdXJuYW1lbnRJZCB9LFxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogQHBhcmFtIHt7dG91cm5hbWVudHM6e3RvdXJuYW1lbnQ6QXJyYXl9fX0gcmVzcG9uc2VcclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBsaXN0O1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICggcmVzcG9uc2Uuc2Vhc29ucyA9PT0gdW5kZWZpbmVkIHx8IHJlc3BvbnNlLnNlYXNvbnMuc2Vhc29uID09PSB1bmRlZmluZWQgKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCAkLmlzQXJyYXkocmVzcG9uc2Uuc2Vhc29ucy5zZWFzb24pICl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGlzdCA9ICQubWFwKHJlc3BvbnNlLnNlYXNvbnMuc2Vhc29uLCBmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogaXRlbVsnQGF0dHJpYnV0ZXMnXS5uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXh0ZXJuYWxfaWQ6IGl0ZW1bJ0BhdHRyaWJ1dGVzJ10uaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmRfZGF0ZTogaXRlbVsnQGF0dHJpYnV0ZXMnXS5lbmRfZGF0ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0X2RhdGU6IGl0ZW1bJ0BhdHRyaWJ1dGVzJ10uc3RhcnRfZGF0ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvdXJuYW1lbnRfaWQ6IGl0ZW1bJ0BhdHRyaWJ1dGVzJ10udG91cm5hbWVudF9pZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHllYXI6IGl0ZW1bJ0BhdHRyaWJ1dGVzJ10ueWVhcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pLnJldmVyc2UoKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGlzdCA9IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHJlc3BvbnNlLnNlYXNvbnMuc2Vhc29uWydAYXR0cmlidXRlcyddLm5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGV4dGVybmFsX2lkOiByZXNwb25zZS5zZWFzb25zLnNlYXNvblsnQGF0dHJpYnV0ZXMnXS5pZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZW5kX2RhdGU6IHJlc3BvbnNlLnNlYXNvbnMuc2Vhc29uWydAYXR0cmlidXRlcyddLmVuZF9kYXRlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFydF9kYXRlOiByZXNwb25zZS5zZWFzb25zLnNlYXNvblsnQGF0dHJpYnV0ZXMnXS5zdGFydF9kYXRlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VybmFtZW50X2lkOiByZXNwb25zZS5zZWFzb25zLnNlYXNvblsnQGF0dHJpYnV0ZXMnXS50b3VybmFtZW50X2lkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB5ZWFyOiByZXNwb25zZS5zZWFzb25zLnNlYXNvblsnQGF0dHJpYnV0ZXMnXS55ZWFyLFxyXG4gICAgICAgICAgICAgICAgICAgIH1dXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAvKiBsaXN0LnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWUgOiBcIkFkZCBuZXdcIixcclxuICAgICAgICAgICAgICAgICAgICBleHRlcm5hbF9pZCA6IDBcclxuICAgICAgICAgICAgICAgIH0pOyovXHJcblxyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShsaXN0KTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzICkge1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIGdldFNjaGVkdWxlICggc2Vhc29uSWQgKSB7XHJcbiAgICAgICAgdmFyIGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXHJcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcclxuXHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBob3N0dXJsICsgXCJ2MS9mZWVkL3NjaGVkdWxlc1wiLFxyXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgZGF0YSA6IHsgaWQgOiBzZWFzb25JZCB9LFxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogQHBhcmFtIHt7dG91cm5hbWVudHM6e3RvdXJuYW1lbnQ6QXJyYXl9fX0gcmVzcG9uc2VcclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgbGlzdCA9IHt9O1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICggcmVzcG9uc2Uuc3BvcnRfZXZlbnRzID09PSB1bmRlZmluZWQgfHwgcmVzcG9uc2Uuc3BvcnRfZXZlbnRzLnNwb3J0X2V2ZW50ID09PSB1bmRlZmluZWQgKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAgICAgcmVzcG9uc2Uuc3BvcnRfZXZlbnRzLnNwb3J0X2V2ZW50LmZvckVhY2goIChpdGVtKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCByb3VuZCAgPSAoaXRlbS50b3VybmFtZW50X3JvdW5kKSA/IGl0ZW0udG91cm5hbWVudF9yb3VuZFsnQGF0dHJpYnV0ZXMnXSA6IG51bGw7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghcm91bmQpIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5hbWUgPSByb3VuZC5udW1iZXIgfHwgcm91bmQubmFtZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCAhbGlzdFtuYW1lXSApIGxpc3RbbmFtZV0gPSBbXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGlzdFtuYW1lXS5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NoZWR1bGVkOiBpdGVtWydAYXR0cmlidXRlcyddLnNjaGVkdWxlZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXh0ZXJuYWxfaWQ6IGl0ZW1bJ0BhdHRyaWJ1dGVzJ10uaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1czogaXRlbVsnQGF0dHJpYnV0ZXMnXS5zdGF0dXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdXJuYW1lbnRfcm91bmQgOiByb3VuZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29tcGV0aXRvcnMgOiAoaXRlbS5jb21wZXRpdG9ycykgPyBpdGVtLmNvbXBldGl0b3JzLmNvbXBldGl0b3IubWFwKCggY29tcGV0aXRvcik9PnsgcmV0dXJuIGNvbXBldGl0b3JbJ0BhdHRyaWJ1dGVzJ10gIH0pICA6IG51bGxcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAvKmxpc3QucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZSA6IFwiQWRkIG5ld1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGV4dGVybmFsX2lkIDogMFxyXG4gICAgICAgICAgICAgICAgfSk7Ki9cclxuXHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKGxpc3QpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMgKSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcclxuICAgIH0sXHJcblxyXG4gICAgc2VhcmNoQ29tcGV0aXRpb24ocmVxdWVzdCkge1xyXG5cclxuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKTtcclxuXHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgJ3NlYXJjaC90b3VybmFtZW50JyxcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgXCJjb250ZW50XCI6IHJlcXVlc3RcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdHJhZGl0aW9uYWw6IHRydWUsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBkYXRhVHlwZTogXCJqc29uXCIsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKGRhdGEpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMgKSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcclxuICAgIH0sXHJcblxyXG4gICAgd2F0Y2hsaXN0KCBpZCApIHtcclxuICAgICAgICB2YXIgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcclxuICAgICAgICAgICAgX3RoaXMgPSB0aGlzO1xyXG5cclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcIm15Y29udGVudC93YXRjaGxpc3QvXCIsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBkYXRhOiB7aWQgOiBpZH0sXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuXHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L2NhL2NhLmFwaS5qcyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IEp1YW5DcnV6IG9uIDQvMS8yMDE4LlxyXG4gKi9cclxuXHJcbndpbmRvdy5Db250ZW50QXJlbmEgPSB3aW5kb3cuQ29udGVudEFyZW5hIHx8IHt9O1xyXG5cclxuQ29udGVudEFyZW5hLkRhdGEgPSBDb250ZW50QXJlbmEuRGF0YSB8fCB7fTtcclxuQ29udGVudEFyZW5hLkxhbmd1YWdlcyA9IENvbnRlbnRBcmVuYS5MYW5ndWFnZXMgfHwge307XHJcblxyXG5Db250ZW50QXJlbmEuRGF0YS5Ub3BTcG9ydHMgPSBbXHJcbiAgICB7IG5hbWUgOiBcIlNvY2NlclwiLCBleHRlcm5hbF9pZDogXCJzcjpzcG9ydDoxXCJ9LFxyXG4gICAgeyBuYW1lIDogXCJCYXNrZXRiYWxsXCIsIGV4dGVybmFsX2lkOiBcInNyOnNwb3J0OjJcIn0sXHJcbiAgICB7IG5hbWUgOiBcIkJhc2ViYWxsXCIsIGV4dGVybmFsX2lkOiBcInNyOnNwb3J0OjNcIn0sXHJcbiAgICB7IG5hbWUgOiBcIlRlbm5pc1wiLCBleHRlcm5hbF9pZDogXCJzcjpzcG9ydDo1XCJ9LFxyXG4gICAgeyBuYW1lIDogXCJDcmlja2V0XCIsIGV4dGVybmFsX2lkOiBcInNyOnNwb3J0OjIxXCJ9LFxyXG4gICAgeyBuYW1lIDogXCJGaWVsZCBIb2NrZXlcIiwgZXh0ZXJuYWxfaWQ6IFwic3I6c3BvcnQ6MjRcIn0sXHJcbiAgICB7IG5hbWUgOiBcIlZvbGxleWJhbGxcIiwgZXh0ZXJuYWxfaWQ6IFwic3I6c3BvcnQ6MjNcIn0sXHJcbiAgICB7IG5hbWUgOiBcIlRhYmxlIFRlbm5pc1wiLCBleHRlcm5hbF9pZDogXCJzcjpzcG9ydDoyMFwifSxcclxuICAgIHsgbmFtZSA6IFwiR29sZlwiLCBleHRlcm5hbF9pZDogXCJzcjpzcG9ydDo5XCJ9LFxyXG4gICAgeyBuYW1lIDogXCJBbWVyaWNhbiBGb290YmFsbFwiLCBleHRlcm5hbF9pZDogXCJzcjpzcG9ydDoxNlwifSxcclxuICAgIHsgbmFtZSA6IFwiSGFuZGJhbGxcIiwgZXh0ZXJuYWxfaWQ6IFwic3I6c3BvcnQ6NlwifVxyXG5dO1xyXG5cclxuQ29udGVudEFyZW5hLkRhdGEuRnVsbFNwb3J0cyA9IFtdO1xyXG5cclxuQ29udGVudEFyZW5hLkxhbmd1YWdlcy5TaG9ydCA9IHtcclxuICAgIFwibWRyXCI6IFwiTWFuZGFyaW5cIixcclxuICAgIFwiZXNcIjogXCJTcGFuaXNoXCIsXHJcbiAgICBcImVuXCI6IFwiRW5nbGlzaFwiLFxyXG4gICAgXCJoaVwiOiBcIkhpbmRpXCIsXHJcbiAgICBcImFyXCI6IFwiQXJhYmljXCIsXHJcbiAgICBcInB0XCI6IFwiUG9ydHVndWVzZVwiLFxyXG4gICAgXCJiblwiOiBcIkJlbmdhbGlcIixcclxuICAgIFwicnVcIjogXCJSdXNzaWFuXCIsXHJcbiAgICBcImphXCI6IFwiSmFwYW5lc2VcIixcclxuICAgIFwianZcIjogXCJKYXZhbmVzZVwiLFxyXG4gICAgXCJkZVwiOiBcIkdlcm1hblwiLFxyXG4gICAgXCJhbGxcIiA6IFwiU2hvdyBBbGxcIlxyXG59O1xyXG5cclxuQ29udGVudEFyZW5hLkxhbmd1YWdlcy5Mb25nID0ge1xyXG4gICAgXCJhYVwiOiBcIkFmYXJcIixcclxuICAgIFwiYWZcIjogXCJBZnJpa2FhbnNcIixcclxuICAgIFwiYWluXCI6IFwiQWludVwiLFxyXG4gICAgXCJha3pcIjogXCJBbGFiYW1hXCIsXHJcbiAgICBcInNxXCI6IFwiQWxiYW5pYW5cIixcclxuICAgIFwiYWxlXCI6IFwiQWxldXRcIixcclxuICAgIFwiYXJxXCI6IFwiQWxnZXJpYW4gQXJhYmljXCIsXHJcbiAgICBcImVuX1VTXCI6IFwiQW1lcmljYW4gRW5nbGlzaFwiLFxyXG4gICAgXCJhc2VcIjogXCJBbWVyaWNhbiBTaWduIExhbmd1YWdlXCIsXHJcbiAgICBcImFtXCI6IFwiQW1oYXJpY1wiLFxyXG4gICAgXCJlZ3lcIjogXCJBbmNpZW50IEVneXB0aWFuXCIsXHJcbiAgICBcImdyY1wiOiBcIkFuY2llbnQgR3JlZWtcIixcclxuICAgIFwiYXJcIjogXCJBcmFiaWNcIixcclxuICAgIFwiYXJjXCI6IFwiQXJhbWFpY1wiLFxyXG4gICAgXCJhcnBcIjogXCJBcmFwYWhvXCIsXHJcbiAgICBcImFyd1wiOiBcIkFyYXdha1wiLFxyXG4gICAgXCJoeVwiOiBcIkFybWVuaWFuXCIsXHJcbiAgICBcImFzXCI6IFwiQXNzYW1lc2VcIixcclxuICAgIFwiYXNhXCI6IFwiQXN1XCIsXHJcbiAgICBcImVuX0FVXCI6IFwiQXVzdHJhbGlhbiBFbmdsaXNoXCIsXHJcbiAgICBcImRlX0FUXCI6IFwiQXVzdHJpYW4gR2VybWFuXCIsXHJcbiAgICBcImF5XCI6IFwiQXltYXJhXCIsXHJcbiAgICBcImF6XCI6IFwiQXplcmJhaWphbmlcIixcclxuICAgIFwiYmFuXCI6IFwiQmFsaW5lc2VcIixcclxuICAgIFwiZXVcIjogXCJCYXNxdWVcIixcclxuICAgIFwiYmFyXCI6IFwiQmF2YXJpYW5cIixcclxuICAgIFwiYmVcIjogXCJCZWxhcnVzaWFuXCIsXHJcbiAgICBcImJuXCI6IFwiQmVuZ2FsaVwiLFxyXG4gICAgXCJiaWtcIjogXCJCaWtvbFwiLFxyXG4gICAgXCJiaW5cIjogXCJCaW5pXCIsXHJcbiAgICBcImJzXCI6IFwiQm9zbmlhblwiLFxyXG4gICAgXCJicmhcIjogXCJCcmFodWlcIixcclxuICAgIFwiYnJhXCI6IFwiQnJhalwiLFxyXG4gICAgXCJwdF9CUlwiOiBcIkJyYXppbGlhbiBQb3J0dWd1ZXNlXCIsXHJcbiAgICBcImJyXCI6IFwiQnJldG9uXCIsXHJcbiAgICBcImVuX0dCXCI6IFwiQnJpdGlzaCBFbmdsaXNoXCIsXHJcbiAgICBcImJnXCI6IFwiQnVsZ2FyaWFuXCIsXHJcbiAgICBcIm15XCI6IFwiQnVybWVzZVwiLFxyXG4gICAgXCJmcmNcIjogXCJDYWp1biBGcmVuY2hcIixcclxuICAgIFwiZW5fQ0FcIjogXCJDYW5hZGlhbiBFbmdsaXNoXCIsXHJcbiAgICBcImZyX0NBXCI6IFwiQ2FuYWRpYW4gRnJlbmNoXCIsXHJcbiAgICBcInl1ZVwiOiBcIkNhbnRvbmVzZVwiLFxyXG4gICAgXCJjYXJcIjogXCJDYXJpYlwiLFxyXG4gICAgXCJjYVwiOiBcIkNhdGFsYW5cIixcclxuICAgIFwiY2F5XCI6IFwiQ2F5dWdhXCIsXHJcbiAgICBcImNlYlwiOiBcIkNlYnVhbm9cIixcclxuICAgIFwic2h1XCI6IFwiQ2hhZGlhbiBBcmFiaWNcIixcclxuICAgIFwiY2VcIjogXCJDaGVjaGVuXCIsXHJcbiAgICBcImNoclwiOiBcIkNoZXJva2VlXCIsXHJcbiAgICBcInF1Z1wiOiBcIkNoaW1ib3Jhem8gSGlnaGxhbmQgUXVpY2h1YVwiLFxyXG4gICAgXCJ6aFwiOiBcIkNoaW5lc2VcIixcclxuICAgIFwiY2huXCI6IFwiQ2hpbm9vayBKYXJnb25cIixcclxuICAgIFwiY2hwXCI6IFwiQ2hpcGV3eWFuXCIsXHJcbiAgICBcImNob1wiOiBcIkNob2N0YXdcIixcclxuICAgIFwiY3VcIjogXCJDaHVyY2ggU2xhdmljXCIsXHJcbiAgICBcImN2XCI6IFwiQ2h1dmFzaFwiLFxyXG4gICAgXCJud2NcIjogXCJDbGFzc2ljYWwgTmV3YXJpXCIsXHJcbiAgICBcInN5Y1wiOiBcIkNsYXNzaWNhbCBTeXJpYWNcIixcclxuICAgIFwic3djXCI6IFwiQ29uZ28gU3dhaGlsaVwiLFxyXG4gICAgXCJjb3BcIjogXCJDb3B0aWNcIixcclxuICAgIFwia3dcIjogXCJDb3JuaXNoXCIsXHJcbiAgICBcImNvXCI6IFwiQ29yc2ljYW5cIixcclxuICAgIFwiY3JcIjogXCJDcmVlXCIsXHJcbiAgICBcIm11c1wiOiBcIkNyZWVrXCIsXHJcbiAgICBcImNyaFwiOiBcIkNyaW1lYW4gVHVya2lzaFwiLFxyXG4gICAgXCJoclwiOiBcIkNyb2F0aWFuXCIsXHJcbiAgICBcImNzXCI6IFwiQ3plY2hcIixcclxuICAgIFwiZGFrXCI6IFwiRGFrb3RhXCIsXHJcbiAgICBcImRhXCI6IFwiRGFuaXNoXCIsXHJcbiAgICBcImRlbFwiOiBcIkRlbGF3YXJlXCIsXHJcbiAgICBcIm5sXCI6IFwiRHV0Y2hcIixcclxuICAgIFwiZnJzXCI6IFwiRWFzdGVybiBGcmlzaWFuXCIsXHJcbiAgICBcImFyelwiOiBcIkVneXB0aWFuIEFyYWJpY1wiLFxyXG4gICAgXCJlblwiOiBcIkVuZ2xpc2hcIixcclxuICAgIFwiZW9cIjogXCJFc3BlcmFudG9cIixcclxuICAgIFwiZXRcIjogXCJFc3RvbmlhblwiLFxyXG4gICAgXCJwdF9QVFwiOiBcIkV1cm9wZWFuIFBvcnR1Z3Vlc2VcIixcclxuICAgIFwiZXNfRVNcIjogXCJFdXJvcGVhbiBTcGFuaXNoXCIsXHJcbiAgICBcImVlXCI6IFwiRXdlXCIsXHJcbiAgICBcImZhblwiOiBcIkZhbmdcIixcclxuICAgIFwiaGlmXCI6IFwiRmlqaSBIaW5kaVwiLFxyXG4gICAgXCJmalwiOiBcIkZpamlhblwiLFxyXG4gICAgXCJmaWxcIjogXCJGaWxpcGlub1wiLFxyXG4gICAgXCJmaVwiOiBcIkZpbm5pc2hcIixcclxuICAgIFwibmxfQkVcIjogXCJGbGVtaXNoXCIsXHJcbiAgICBcImZvblwiOiBcIkZvblwiLFxyXG4gICAgXCJmclwiOiBcIkZyZW5jaFwiLFxyXG4gICAgXCJnYWFcIjogXCJHYVwiLFxyXG4gICAgXCJnYW5cIjogXCJHYW4gQ2hpbmVzZVwiLFxyXG4gICAgXCJrYVwiOiBcIkdlb3JnaWFuXCIsXHJcbiAgICBcImRlXCI6IFwiR2VybWFuXCIsXHJcbiAgICBcImdvdFwiOiBcIkdvdGhpY1wiLFxyXG4gICAgXCJncmJcIjogXCJHcmVib1wiLFxyXG4gICAgXCJlbFwiOiBcIkdyZWVrXCIsXHJcbiAgICBcImduXCI6IFwiR3VhcmFuaVwiLFxyXG4gICAgXCJndVwiOiBcIkd1amFyYXRpXCIsXHJcbiAgICBcImd1elwiOiBcIkd1c2lpXCIsXHJcbiAgICBcImhhaVwiOiBcIkhhaWRhXCIsXHJcbiAgICBcImh0XCI6IFwiSGFpdGlhblwiLFxyXG4gICAgXCJoYWtcIjogXCJIYWtrYSBDaGluZXNlXCIsXHJcbiAgICBcImhhXCI6IFwiSGF1c2FcIixcclxuICAgIFwiaGF3XCI6IFwiSGF3YWlpYW5cIixcclxuICAgIFwiaGVcIjogXCJIZWJyZXdcIixcclxuICAgIFwiaHpcIjogXCJIZXJlcm9cIixcclxuICAgIFwiaGlcIjogXCJIaW5kaVwiLFxyXG4gICAgXCJoaXRcIjogXCJIaXR0aXRlXCIsXHJcbiAgICBcImhtblwiOiBcIkhtb25nXCIsXHJcbiAgICBcImh1XCI6IFwiSHVuZ2FyaWFuXCIsXHJcbiAgICBcImlzXCI6IFwiSWNlbGFuZGljXCIsXHJcbiAgICBcImlvXCI6IFwiSWRvXCIsXHJcbiAgICBcImlnXCI6IFwiSWdib1wiLFxyXG4gICAgXCJpdVwiOiBcIkludWt0aXR1dFwiLFxyXG4gICAgXCJpa1wiOiBcIkludXBpYXFcIixcclxuICAgIFwiZ2FcIjogXCJJcmlzaFwiLFxyXG4gICAgXCJpdFwiOiBcIkl0YWxpYW5cIixcclxuICAgIFwiamFtXCI6IFwiSmFtYWljYW4gQ3Jlb2xlIEVuZ2xpc2hcIixcclxuICAgIFwiamFcIjogXCJKYXBhbmVzZVwiLFxyXG4gICAgXCJqdlwiOiBcIkphdmFuZXNlXCIsXHJcbiAgICBcImthalwiOiBcIkpqdVwiLFxyXG4gICAgXCJkeW9cIjogXCJKb2xhLUZvbnlpXCIsXHJcbiAgICBcInhhbFwiOiBcIkthbG15a1wiLFxyXG4gICAgXCJrYW1cIjogXCJLYW1iYVwiLFxyXG4gICAgXCJrYmxcIjogXCJLYW5lbWJ1XCIsXHJcbiAgICBcImtuXCI6IFwiS2FubmFkYVwiLFxyXG4gICAgXCJrclwiOiBcIkthbnVyaVwiLFxyXG4gICAgXCJrYWFcIjogXCJLYXJhLUthbHBha1wiLFxyXG4gICAgXCJrcmNcIjogXCJLYXJhY2hheS1CYWxrYXJcIixcclxuICAgIFwia3JsXCI6IFwiS2FyZWxpYW5cIixcclxuICAgIFwia3NcIjogXCJLYXNobWlyaVwiLFxyXG4gICAgXCJjc2JcIjogXCJLYXNodWJpYW5cIixcclxuICAgIFwia2F3XCI6IFwiS2F3aVwiLFxyXG4gICAgXCJra1wiOiBcIkthemFraFwiLFxyXG4gICAgXCJrZW5cIjogXCJLZW55YW5nXCIsXHJcbiAgICBcImtoYVwiOiBcIktoYXNpXCIsXHJcbiAgICBcImttXCI6IFwiS2htZXJcIixcclxuICAgIFwia2hvXCI6IFwiS2hvdGFuZXNlXCIsXHJcbiAgICBcImtod1wiOiBcIktob3dhclwiLFxyXG4gICAgXCJraVwiOiBcIktpa3V5dVwiLFxyXG4gICAgXCJrbWJcIjogXCJLaW1idW5kdVwiLFxyXG4gICAgXCJrcmpcIjogXCJLaW5hcmF5LWFcIixcclxuICAgIFwicndcIjogXCJLaW55YXJ3YW5kYVwiLFxyXG4gICAgXCJraXVcIjogXCJLaXJtYW5qa2lcIixcclxuICAgIFwidGxoXCI6IFwiS2xpbmdvblwiLFxyXG4gICAgXCJia21cIjogXCJLb21cIixcclxuICAgIFwia3ZcIjogXCJLb21pXCIsXHJcbiAgICBcImtvaVwiOiBcIktvbWktUGVybXlha1wiLFxyXG4gICAgXCJrZ1wiOiBcIktvbmdvXCIsXHJcbiAgICBcImtva1wiOiBcIktvbmthbmlcIixcclxuICAgIFwia29cIjogXCJLb3JlYW5cIixcclxuICAgIFwia2ZvXCI6IFwiS29yb1wiLFxyXG4gICAgXCJrb3NcIjogXCJLb3NyYWVhblwiLFxyXG4gICAgXCJhdmtcIjogXCJLb3RhdmFcIixcclxuICAgIFwia2hxXCI6IFwiS295cmEgQ2hpaW5pXCIsXHJcbiAgICBcInNlc1wiOiBcIktveXJhYm9ybyBTZW5uaVwiLFxyXG4gICAgXCJrcGVcIjogXCJLcGVsbGVcIixcclxuICAgIFwia3JpXCI6IFwiS3Jpb1wiLFxyXG4gICAgXCJralwiOiBcIkt1YW55YW1hXCIsXHJcbiAgICBcImt1bVwiOiBcIkt1bXlrXCIsXHJcbiAgICBcImt1XCI6IFwiS3VyZGlzaFwiLFxyXG4gICAgXCJrcnVcIjogXCJLdXJ1a2hcIixcclxuICAgIFwia3V0XCI6IFwiS3V0ZW5haVwiLFxyXG4gICAgXCJubWdcIjogXCJLd2FzaW9cIixcclxuICAgIFwia3lcIjogXCJLeXJneXpcIixcclxuICAgIFwicXVjXCI6IFwiS1xcdTAyYmNpY2hlXFx1MDJiY1wiLFxyXG4gICAgXCJsYWRcIjogXCJMYWRpbm9cIixcclxuICAgIFwibGFoXCI6IFwiTGFobmRhXCIsXHJcbiAgICBcImxrdFwiOiBcIkxha290YVwiLFxyXG4gICAgXCJsYW1cIjogXCJMYW1iYVwiLFxyXG4gICAgXCJsYWdcIjogXCJMYW5naVwiLFxyXG4gICAgXCJsb1wiOiBcIkxhb1wiLFxyXG4gICAgXCJsdGdcIjogXCJMYXRnYWxpYW5cIixcclxuICAgIFwibGFcIjogXCJMYXRpblwiLFxyXG4gICAgXCJlc180MTlcIjogXCJMYXRpbiBBbWVyaWNhbiBTcGFuaXNoXCIsXHJcbiAgICBcImx2XCI6IFwiTGF0dmlhblwiLFxyXG4gICAgXCJsenpcIjogXCJMYXpcIixcclxuICAgIFwibGV6XCI6IFwiTGV6Z2hpYW5cIixcclxuICAgIFwibGlqXCI6IFwiTGlndXJpYW5cIixcclxuICAgIFwibGlcIjogXCJMaW1idXJnaXNoXCIsXHJcbiAgICBcImxuXCI6IFwiTGluZ2FsYVwiLFxyXG4gICAgXCJsZm5cIjogXCJMaW5ndWEgRnJhbmNhIE5vdmFcIixcclxuICAgIFwibHpoXCI6IFwiTGl0ZXJhcnkgQ2hpbmVzZVwiLFxyXG4gICAgXCJsdFwiOiBcIkxpdGh1YW5pYW5cIixcclxuICAgIFwibGl2XCI6IFwiTGl2b25pYW5cIixcclxuICAgIFwiamJvXCI6IFwiTG9qYmFuXCIsXHJcbiAgICBcImxtb1wiOiBcIkxvbWJhcmRcIixcclxuICAgIFwibmRzXCI6IFwiTG93IEdlcm1hblwiLFxyXG4gICAgXCJzbGlcIjogXCJMb3dlciBTaWxlc2lhblwiLFxyXG4gICAgXCJkc2JcIjogXCJMb3dlciBTb3JiaWFuXCIsXHJcbiAgICBcImxvelwiOiBcIkxvemlcIixcclxuICAgIFwibHVcIjogXCJMdWJhLUthdGFuZ2FcIixcclxuICAgIFwibHVhXCI6IFwiTHViYS1MdWx1YVwiLFxyXG4gICAgXCJsdWlcIjogXCJMdWlzZW5vXCIsXHJcbiAgICBcInNtalwiOiBcIkx1bGUgU2FtaVwiLFxyXG4gICAgXCJsdW5cIjogXCJMdW5kYVwiLFxyXG4gICAgXCJsdW9cIjogXCJMdW9cIixcclxuICAgIFwibGJcIjogXCJMdXhlbWJvdXJnaXNoXCIsXHJcbiAgICBcImx1eVwiOiBcIkx1eWlhXCIsXHJcbiAgICBcIm1kZVwiOiBcIk1hYmFcIixcclxuICAgIFwibWtcIjogXCJNYWNlZG9uaWFuXCIsXHJcbiAgICBcImptY1wiOiBcIk1hY2hhbWVcIixcclxuICAgIFwibWFkXCI6IFwiTWFkdXJlc2VcIixcclxuICAgIFwibWFmXCI6IFwiTWFmYVwiLFxyXG4gICAgXCJtYWdcIjogXCJNYWdhaGlcIixcclxuICAgIFwidm1mXCI6IFwiTWFpbi1GcmFuY29uaWFuXCIsXHJcbiAgICBcIm1haVwiOiBcIk1haXRoaWxpXCIsXHJcbiAgICBcIm1ha1wiOiBcIk1ha2FzYXJcIixcclxuICAgIFwibWdoXCI6IFwiTWFraHV3YS1NZWV0dG9cIixcclxuICAgIFwia2RlXCI6IFwiTWFrb25kZVwiLFxyXG4gICAgXCJtZ1wiOiBcIk1hbGFnYXN5XCIsXHJcbiAgICBcIm1zXCI6IFwiTWFsYXlcIixcclxuICAgIFwibWxcIjogXCJNYWxheWFsYW1cIixcclxuICAgIFwibXRcIjogXCJNYWx0ZXNlXCIsXHJcbiAgICBcIm1uY1wiOiBcIk1hbmNodVwiLFxyXG4gICAgXCJtZHJcIjogXCJNYW5kYXJpblwiLFxyXG4gICAgXCJtYW5cIjogXCJNYW5kaW5nb1wiLFxyXG4gICAgXCJtbmlcIjogXCJNYW5pcHVyaVwiLFxyXG4gICAgXCJndlwiOiBcIk1hbnhcIixcclxuICAgIFwibWlcIjogXCJNYW9yaVwiLFxyXG4gICAgXCJhcm5cIjogXCJNYXB1Y2hlXCIsXHJcbiAgICBcIm1yXCI6IFwiTWFyYXRoaVwiLFxyXG4gICAgXCJjaG1cIjogXCJNYXJpXCIsXHJcbiAgICBcIm1oXCI6IFwiTWFyc2hhbGxlc2VcIixcclxuICAgIFwibXdyXCI6IFwiTWFyd2FyaVwiLFxyXG4gICAgXCJtYXNcIjogXCJNYXNhaVwiLFxyXG4gICAgXCJtem5cIjogXCJNYXphbmRlcmFuaVwiLFxyXG4gICAgXCJieXZcIjogXCJNZWR1bWJhXCIsXHJcbiAgICBcIm1lblwiOiBcIk1lbmRlXCIsXHJcbiAgICBcIm13dlwiOiBcIk1lbnRhd2FpXCIsXHJcbiAgICBcIm1lclwiOiBcIk1lcnVcIixcclxuICAgIFwibWdvXCI6IFwiTWV0YVxcdTAyYmNcIixcclxuICAgIFwiZXNfTVhcIjogXCJNZXhpY2FuIFNwYW5pc2hcIixcclxuICAgIFwibWljXCI6IFwiTWljbWFjXCIsXHJcbiAgICBcImR1bVwiOiBcIk1pZGRsZSBEdXRjaFwiLFxyXG4gICAgXCJlbm1cIjogXCJNaWRkbGUgRW5nbGlzaFwiLFxyXG4gICAgXCJmcm1cIjogXCJNaWRkbGUgRnJlbmNoXCIsXHJcbiAgICBcImdtaFwiOiBcIk1pZGRsZSBIaWdoIEdlcm1hblwiLFxyXG4gICAgXCJtZ2FcIjogXCJNaWRkbGUgSXJpc2hcIixcclxuICAgIFwibmFuXCI6IFwiTWluIE5hbiBDaGluZXNlXCIsXHJcbiAgICBcIm1pblwiOiBcIk1pbmFuZ2thYmF1XCIsXHJcbiAgICBcInhtZlwiOiBcIk1pbmdyZWxpYW5cIixcclxuICAgIFwibXdsXCI6IFwiTWlyYW5kZXNlXCIsXHJcbiAgICBcImx1c1wiOiBcIk1pem9cIixcclxuICAgIFwiYXJfMDAxXCI6IFwiTW9kZXJuIFN0YW5kYXJkIEFyYWJpY1wiLFxyXG4gICAgXCJtb2hcIjogXCJNb2hhd2tcIixcclxuICAgIFwibWRmXCI6IFwiTW9rc2hhXCIsXHJcbiAgICBcInJvX01EXCI6IFwiTW9sZGF2aWFuXCIsXHJcbiAgICBcImxvbFwiOiBcIk1vbmdvXCIsXHJcbiAgICBcIm1uXCI6IFwiTW9uZ29saWFuXCIsXHJcbiAgICBcIm1mZVwiOiBcIk1vcmlzeWVuXCIsXHJcbiAgICBcImFyeVwiOiBcIk1vcm9jY2FuIEFyYWJpY1wiLFxyXG4gICAgXCJtb3NcIjogXCJNb3NzaVwiLFxyXG4gICAgXCJtdWxcIjogXCJNdWx0aXBsZSBMYW5ndWFnZXNcIixcclxuICAgIFwibXVhXCI6IFwiTXVuZGFuZ1wiLFxyXG4gICAgXCJ0dHRcIjogXCJNdXNsaW0gVGF0XCIsXHJcbiAgICBcIm15ZVwiOiBcIk15ZW5lXCIsXHJcbiAgICBcIm5hcVwiOiBcIk5hbWFcIixcclxuICAgIFwibmFcIjogXCJOYXVydVwiLFxyXG4gICAgXCJudlwiOiBcIk5hdmFqb1wiLFxyXG4gICAgXCJuZ1wiOiBcIk5kb25nYVwiLFxyXG4gICAgXCJuYXBcIjogXCJOZWFwb2xpdGFuXCIsXHJcbiAgICBcIm5lXCI6IFwiTmVwYWxpXCIsXHJcbiAgICBcIm5ld1wiOiBcIk5ld2FyaVwiLFxyXG4gICAgXCJzYmFcIjogXCJOZ2FtYmF5XCIsXHJcbiAgICBcIm5uaFwiOiBcIk5naWVtYm9vblwiLFxyXG4gICAgXCJqZ29cIjogXCJOZ29tYmFcIixcclxuICAgIFwieXJsXCI6IFwiTmhlZW5nYXR1XCIsXHJcbiAgICBcIm5pYVwiOiBcIk5pYXNcIixcclxuICAgIFwibml1XCI6IFwiTml1ZWFuXCIsXHJcbiAgICBcInp4eFwiOiBcIk5vIGxpbmd1aXN0aWMgY29udGVudFwiLFxyXG4gICAgXCJub2dcIjogXCJOb2dhaVwiLFxyXG4gICAgXCJuZFwiOiBcIk5vcnRoIE5kZWJlbGVcIixcclxuICAgIFwiZnJyXCI6IFwiTm9ydGhlcm4gRnJpc2lhblwiLFxyXG4gICAgXCJzZVwiOiBcIk5vcnRoZXJuIFNhbWlcIixcclxuICAgIFwibnNvXCI6IFwiTm9ydGhlcm4gU290aG9cIixcclxuICAgIFwibm9cIjogXCJOb3J3ZWdpYW5cIixcclxuICAgIFwibmJcIjogXCJOb3J3ZWdpYW4gQm9rbVxcdTAwZTVsXCIsXHJcbiAgICBcIm5uXCI6IFwiTm9yd2VnaWFuIE55bm9yc2tcIixcclxuICAgIFwibm92XCI6IFwiTm92aWFsXCIsXHJcbiAgICBcIm51c1wiOiBcIk51ZXJcIixcclxuICAgIFwibnltXCI6IFwiTnlhbXdlemlcIixcclxuICAgIFwibnlcIjogXCJOeWFuamFcIixcclxuICAgIFwibnluXCI6IFwiTnlhbmtvbGVcIixcclxuICAgIFwidG9nXCI6IFwiTnlhc2EgVG9uZ2FcIixcclxuICAgIFwibnlvXCI6IFwiTnlvcm9cIixcclxuICAgIFwibnppXCI6IFwiTnppbWFcIixcclxuICAgIFwibnFvXCI6IFwiTlxcdTAyYmNLb1wiLFxyXG4gICAgXCJvY1wiOiBcIk9jY2l0YW5cIixcclxuICAgIFwib2pcIjogXCJPamlid2FcIixcclxuICAgIFwiYW5nXCI6IFwiT2xkIEVuZ2xpc2hcIixcclxuICAgIFwiZnJvXCI6IFwiT2xkIEZyZW5jaFwiLFxyXG4gICAgXCJnb2hcIjogXCJPbGQgSGlnaCBHZXJtYW5cIixcclxuICAgIFwic2dhXCI6IFwiT2xkIElyaXNoXCIsXHJcbiAgICBcIm5vblwiOiBcIk9sZCBOb3JzZVwiLFxyXG4gICAgXCJwZW9cIjogXCJPbGQgUGVyc2lhblwiLFxyXG4gICAgXCJwcm9cIjogXCJPbGQgUHJvdmVuXFx1MDBlN2FsXCIsXHJcbiAgICBcIm9yXCI6IFwiT3JpeWFcIixcclxuICAgIFwib21cIjogXCJPcm9tb1wiLFxyXG4gICAgXCJvc2FcIjogXCJPc2FnZVwiLFxyXG4gICAgXCJvc1wiOiBcIk9zc2V0aWNcIixcclxuICAgIFwib3RhXCI6IFwiT3R0b21hbiBUdXJraXNoXCIsXHJcbiAgICBcInBhbFwiOiBcIlBhaGxhdmlcIixcclxuICAgIFwicGZsXCI6IFwiUGFsYXRpbmUgR2VybWFuXCIsXHJcbiAgICBcInBhdVwiOiBcIlBhbGF1YW5cIixcclxuICAgIFwicGlcIjogXCJQYWxpXCIsXHJcbiAgICBcInBkY1wiOiBcIlBlbm5zeWx2YW5pYSBHZXJtYW5cIixcclxuICAgIFwiZmFcIjogXCJQZXJzaWFuXCIsXHJcbiAgICBcInBoblwiOiBcIlBob2VuaWNpYW5cIixcclxuICAgIFwicGNkXCI6IFwiUGljYXJkXCIsXHJcbiAgICBcInBtc1wiOiBcIlBpZWRtb250ZXNlXCIsXHJcbiAgICBcInBkdFwiOiBcIlBsYXV0ZGlldHNjaFwiLFxyXG4gICAgXCJwb25cIjogXCJQb2hucGVpYW5cIixcclxuICAgIFwicGxcIjogXCJQb2xpc2hcIixcclxuICAgIFwicG50XCI6IFwiUG9udGljXCIsXHJcbiAgICBcInB0XCI6IFwiUG9ydHVndWVzZVwiLFxyXG4gICAgXCJwcmdcIjogXCJQcnVzc2lhblwiLFxyXG4gICAgXCJwYVwiOiBcIlB1bmphYmlcIixcclxuICAgIFwicXVcIjogXCJRdWVjaHVhXCIsXHJcbiAgICBcInJvXCI6IFwiUm9tYW5pYW5cIixcclxuICAgIFwicm1cIjogXCJSb21hbnNoXCIsXHJcbiAgICBcInJvbVwiOiBcIlJvbWFueVwiLFxyXG4gICAgXCJyb290XCI6IFwiUm9vdFwiLFxyXG4gICAgXCJydVwiOiBcIlJ1c3NpYW5cIixcclxuICAgIFwicndrXCI6IFwiUndhXCIsXHJcbiAgICBcInNhaFwiOiBcIlNha2hhXCIsXHJcbiAgICBcInNhbVwiOiBcIlNhbWFyaXRhbiBBcmFtYWljXCIsXHJcbiAgICBcInNtXCI6IFwiU2Ftb2FuXCIsXHJcbiAgICBcInNjb1wiOiBcIlNjb3RzXCIsXHJcbiAgICBcImdkXCI6IFwiU2NvdHRpc2ggR2FlbGljXCIsXHJcbiAgICBcInNseVwiOiBcIlNlbGF5YXJcIixcclxuICAgIFwic2VsXCI6IFwiU2Vsa3VwXCIsXHJcbiAgICBcInNlaFwiOiBcIlNlbmFcIixcclxuICAgIFwic2VlXCI6IFwiU2VuZWNhXCIsXHJcbiAgICBcInNyXCI6IFwiU2VyYmlhblwiLFxyXG4gICAgXCJzaFwiOiBcIlNlcmJvLUNyb2F0aWFuXCIsXHJcbiAgICBcInNyclwiOiBcIlNlcmVyXCIsXHJcbiAgICBcInNlaVwiOiBcIlNlcmlcIixcclxuICAgIFwia3NiXCI6IFwiU2hhbWJhbGFcIixcclxuICAgIFwic2huXCI6IFwiU2hhblwiLFxyXG4gICAgXCJzblwiOiBcIlNob25hXCIsXHJcbiAgICBcImlpXCI6IFwiU2ljaHVhbiBZaVwiLFxyXG4gICAgXCJzY25cIjogXCJTaWNpbGlhblwiLFxyXG4gICAgXCJzaWRcIjogXCJTaWRhbW9cIixcclxuICAgIFwiYmxhXCI6IFwiU2lrc2lrYVwiLFxyXG4gICAgXCJzemxcIjogXCJTaWxlc2lhblwiLFxyXG4gICAgXCJ6aF9IYW5zXCI6IFwiU2ltcGxpZmllZCBDaGluZXNlXCIsXHJcbiAgICBcInNkXCI6IFwiU2luZGhpXCIsXHJcbiAgICBcInNpXCI6IFwiU2luaGFsYVwiLFxyXG4gICAgXCJzbXNcIjogXCJTa29sdCBTYW1pXCIsXHJcbiAgICBcImRlblwiOiBcIlNsYXZlXCIsXHJcbiAgICBcInNrXCI6IFwiU2xvdmFrXCIsXHJcbiAgICBcInNsXCI6IFwiU2xvdmVuaWFuXCIsXHJcbiAgICBcInhvZ1wiOiBcIlNvZ2FcIixcclxuICAgIFwic29nXCI6IFwiU29nZGllblwiLFxyXG4gICAgXCJzb1wiOiBcIlNvbWFsaVwiLFxyXG4gICAgXCJzbmtcIjogXCJTb25pbmtlXCIsXHJcbiAgICBcImNrYlwiOiBcIlNvcmFuaSBLdXJkaXNoXCIsXHJcbiAgICBcImF6YlwiOiBcIlNvdXRoIEF6ZXJiYWlqYW5pXCIsXHJcbiAgICBcIm5yXCI6IFwiU291dGggTmRlYmVsZVwiLFxyXG4gICAgXCJhbHRcIjogXCJTb3V0aGVybiBBbHRhaVwiLFxyXG4gICAgXCJzbWFcIjogXCJTb3V0aGVybiBTYW1pXCIsXHJcbiAgICBcInN0XCI6IFwiU291dGhlcm4gU290aG9cIixcclxuICAgIFwiZXNcIjogXCJTcGFuaXNoXCIsXHJcbiAgICBcInNyblwiOiBcIlNyYW5hbiBUb25nb1wiLFxyXG4gICAgXCJ6Z2hcIjogXCJTdGFuZGFyZCBNb3JvY2NhbiBUYW1hemlnaHRcIixcclxuICAgIFwic3VrXCI6IFwiU3VrdW1hXCIsXHJcbiAgICBcInN1eFwiOiBcIlN1bWVyaWFuXCIsXHJcbiAgICBcInN1XCI6IFwiU3VuZGFuZXNlXCIsXHJcbiAgICBcInN1c1wiOiBcIlN1c3VcIixcclxuICAgIFwic3dcIjogXCJTd2FoaWxpXCIsXHJcbiAgICBcInNzXCI6IFwiU3dhdGlcIixcclxuICAgIFwic3ZcIjogXCJTd2VkaXNoXCIsXHJcbiAgICBcImZyX0NIXCI6IFwiU3dpc3MgRnJlbmNoXCIsXHJcbiAgICBcImdzd1wiOiBcIlN3aXNzIEdlcm1hblwiLFxyXG4gICAgXCJkZV9DSFwiOiBcIlN3aXNzIEhpZ2ggR2VybWFuXCIsXHJcbiAgICBcInN5clwiOiBcIlN5cmlhY1wiLFxyXG4gICAgXCJzaGlcIjogXCJUYWNoZWxoaXRcIixcclxuICAgIFwidGxcIjogXCJUYWdhbG9nXCIsXHJcbiAgICBcInR5XCI6IFwiVGFoaXRpYW5cIixcclxuICAgIFwiZGF2XCI6IFwiVGFpdGFcIixcclxuICAgIFwidGdcIjogXCJUYWppa1wiLFxyXG4gICAgXCJ0bHlcIjogXCJUYWx5c2hcIixcclxuICAgIFwidG1oXCI6IFwiVGFtYXNoZWtcIixcclxuICAgIFwidGFcIjogXCJUYW1pbFwiLFxyXG4gICAgXCJ0cnZcIjogXCJUYXJva29cIixcclxuICAgIFwidHdxXCI6IFwiVGFzYXdhcVwiLFxyXG4gICAgXCJ0dFwiOiBcIlRhdGFyXCIsXHJcbiAgICBcInRlXCI6IFwiVGVsdWd1XCIsXHJcbiAgICBcInRlclwiOiBcIlRlcmVub1wiLFxyXG4gICAgXCJ0ZW9cIjogXCJUZXNvXCIsXHJcbiAgICBcInRldFwiOiBcIlRldHVtXCIsXHJcbiAgICBcInRoXCI6IFwiVGhhaVwiLFxyXG4gICAgXCJib1wiOiBcIlRpYmV0YW5cIixcclxuICAgIFwidGlnXCI6IFwiVGlncmVcIixcclxuICAgIFwidGlcIjogXCJUaWdyaW55YVwiLFxyXG4gICAgXCJ0ZW1cIjogXCJUaW1uZVwiLFxyXG4gICAgXCJ0aXZcIjogXCJUaXZcIixcclxuICAgIFwidGxpXCI6IFwiVGxpbmdpdFwiLFxyXG4gICAgXCJ0cGlcIjogXCJUb2sgUGlzaW5cIixcclxuICAgIFwidGtsXCI6IFwiVG9rZWxhdVwiLFxyXG4gICAgXCJ0b1wiOiBcIlRvbmdhblwiLFxyXG4gICAgXCJmaXRcIjogXCJUb3JuZWRhbGVuIEZpbm5pc2hcIixcclxuICAgIFwiemhfSGFudFwiOiBcIlRyYWRpdGlvbmFsIENoaW5lc2VcIixcclxuICAgIFwidGtyXCI6IFwiVHNha2h1clwiLFxyXG4gICAgXCJ0c2RcIjogXCJUc2Frb25pYW5cIixcclxuICAgIFwidHNpXCI6IFwiVHNpbXNoaWFuXCIsXHJcbiAgICBcInRzXCI6IFwiVHNvbmdhXCIsXHJcbiAgICBcInRuXCI6IFwiVHN3YW5hXCIsXHJcbiAgICBcInRjeVwiOiBcIlR1bHVcIixcclxuICAgIFwidHVtXCI6IFwiVHVtYnVrYVwiLFxyXG4gICAgXCJhZWJcIjogXCJUdW5pc2lhbiBBcmFiaWNcIixcclxuICAgIFwidHJcIjogXCJUdXJraXNoXCIsXHJcbiAgICBcInRrXCI6IFwiVHVya21lblwiLFxyXG4gICAgXCJ0cnVcIjogXCJUdXJveW9cIixcclxuICAgIFwidHZsXCI6IFwiVHV2YWx1XCIsXHJcbiAgICBcInR5dlwiOiBcIlR1dmluaWFuXCIsXHJcbiAgICBcInR3XCI6IFwiVHdpXCIsXHJcbiAgICBcImtjZ1wiOiBcIlR5YXBcIixcclxuICAgIFwidWRtXCI6IFwiVWRtdXJ0XCIsXHJcbiAgICBcInVnYVwiOiBcIlVnYXJpdGljXCIsXHJcbiAgICBcInVrXCI6IFwiVWtyYWluaWFuXCIsXHJcbiAgICBcInVtYlwiOiBcIlVtYnVuZHVcIixcclxuICAgIFwidW5kXCI6IFwiVW5rbm93biBMYW5ndWFnZVwiLFxyXG4gICAgXCJoc2JcIjogXCJVcHBlciBTb3JiaWFuXCIsXHJcbiAgICBcInVyXCI6IFwiVXJkdVwiLFxyXG4gICAgXCJ1Z1wiOiBcIlV5Z2h1clwiLFxyXG4gICAgXCJ1elwiOiBcIlV6YmVrXCIsXHJcbiAgICBcInZhaVwiOiBcIlZhaVwiLFxyXG4gICAgXCJ2ZVwiOiBcIlZlbmRhXCIsXHJcbiAgICBcInZlY1wiOiBcIlZlbmV0aWFuXCIsXHJcbiAgICBcInZlcFwiOiBcIlZlcHNcIixcclxuICAgIFwidmlcIjogXCJWaWV0bmFtZXNlXCIsXHJcbiAgICBcInZvXCI6IFwiVm9sYXBcXHUwMGZja1wiLFxyXG4gICAgXCJ2cm9cIjogXCJWXFx1MDBmNXJvXCIsXHJcbiAgICBcInZvdFwiOiBcIlZvdGljXCIsXHJcbiAgICBcInZ1blwiOiBcIlZ1bmpvXCIsXHJcbiAgICBcIndhXCI6IFwiV2FsbG9vblwiLFxyXG4gICAgXCJ3YWVcIjogXCJXYWxzZXJcIixcclxuICAgIFwid2FyXCI6IFwiV2FyYXlcIixcclxuICAgIFwid2FzXCI6IFwiV2FzaG9cIixcclxuICAgIFwiZ3VjXCI6IFwiV2F5dXVcIixcclxuICAgIFwiY3lcIjogXCJXZWxzaFwiLFxyXG4gICAgXCJ2bHNcIjogXCJXZXN0IEZsZW1pc2hcIixcclxuICAgIFwiZnlcIjogXCJXZXN0ZXJuIEZyaXNpYW5cIixcclxuICAgIFwibXJqXCI6IFwiV2VzdGVybiBNYXJpXCIsXHJcbiAgICBcIndhbFwiOiBcIldvbGF5dHRhXCIsXHJcbiAgICBcIndvXCI6IFwiV29sb2ZcIixcclxuICAgIFwid3V1XCI6IFwiV3UgQ2hpbmVzZVwiLFxyXG4gICAgXCJ4aFwiOiBcIlhob3NhXCIsXHJcbiAgICBcImhzblwiOiBcIlhpYW5nIENoaW5lc2VcIixcclxuICAgIFwieWF2XCI6IFwiWWFuZ2JlblwiLFxyXG4gICAgXCJ5YW9cIjogXCJZYW9cIixcclxuICAgIFwieWFwXCI6IFwiWWFwZXNlXCIsXHJcbiAgICBcInliYlwiOiBcIlllbWJhXCIsXHJcbiAgICBcInlpXCI6IFwiWWlkZGlzaFwiLFxyXG4gICAgXCJ5b1wiOiBcIllvcnViYVwiLFxyXG4gICAgXCJ6YXBcIjogXCJaYXBvdGVjXCIsXHJcbiAgICBcImRqZVwiOiBcIlphcm1hXCIsXHJcbiAgICBcInp6YVwiOiBcIlphemFcIixcclxuICAgIFwiemVhXCI6IFwiWmVlbGFuZGljXCIsXHJcbiAgICBcInplblwiOiBcIlplbmFnYVwiLFxyXG4gICAgXCJ6YVwiOiBcIlpodWFuZ1wiLFxyXG4gICAgXCJnYnpcIjogXCJab3JvYXN0cmlhbiBEYXJpXCIsXHJcbiAgICBcInp1XCI6IFwiWnVsdVwiLFxyXG4gICAgXCJ6dW5cIjogXCJadW5pXCJcclxufVxyXG5cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvY2EvY2EuZGF0YS5qcyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IEp1YW5DcnV6IG9uIDQvMS8yMDE4LlxyXG4gKi9cclxuXHJcbiQoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIHdpbmRvdy5Db250ZW50QXJlbmEgPSB3aW5kb3cuQ29udGVudEFyZW5hIHx8IHt9O1xyXG5cclxuICAgIENvbnRlbnRBcmVuYS5Nb2RlbCA9IENvbnRlbnRBcmVuYS5Nb2RlbCB8fCB7fTtcclxuXHJcbiAgICBDb250ZW50QXJlbmEuTW9kZWwuUmlnaHRQYWNrYWdlID0gZnVuY3Rpb24oKXtcclxuICAgICAgICB0aGlzLmlkID0gbnVsbDtcclxuICAgICAgICB0aGlzLm5hbWUgPSBudWxsO1xyXG4gICAgICAgIHRoaXMucmlnaHRzID0ge307XHJcbiAgICB9O1xyXG5cclxuICAgIENvbnRlbnRBcmVuYS5Nb2RlbC5EaXN0cmlidXRpb25QYWNrYWdlID0gZnVuY3Rpb24oKXtcclxuICAgICAgICB0aGlzLmlkID0gbnVsbDtcclxuICAgICAgICB0aGlzLm5hbWUgPSBudWxsO1xyXG4gICAgICAgIHRoaXMucHJvZHVjdGlvbiA9IHt9O1xyXG4gICAgICAgIHRoaXMudGVjaG5pY2FsID0ge307XHJcbiAgICB9O1xyXG5cclxuICAgIENvbnRlbnRBcmVuYS5Nb2RlbC5SaWdodCA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdGhpcy5pZCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gbnVsbDtcclxuICAgICAgICB0aGlzLnJpZ2h0SXRlbXMgPSB7fTtcclxuICAgIH07XHJcblxyXG4gICAgQ29udGVudEFyZW5hLk1vZGVsLlJpZ2h0SXRlbSA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdGhpcy5pZCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gbnVsbDtcclxuICAgICAgICB0aGlzLmlucHV0cyA9IFtdO1xyXG4gICAgfTtcclxuXHJcbiAgICBDb250ZW50QXJlbmEuTW9kZWwuU2VsZWN0ZWRSaWdodCA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdGhpcy5yaWdodCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5yaWdodEl0ZW0gPSBudWxsO1xyXG4gICAgICAgIHRoaXMuZGlzdHJpYnV0aW9uUGFja2FnZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5ncm91cCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5pbnB1dHMgPSBbXTtcclxuICAgIH07XHJcblxyXG4gICAgQ29udGVudEFyZW5hLk1vZGVsLlNhbGVzUGFja2FnZSA9IGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgICAgIHRoaXMuc2FsZXNNZXRob2QgPSAgbnVsbDtcclxuICAgICAgICB0aGlzLmZlZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5jdXJyZW5jeSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5pZCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gbnVsbDtcclxuICAgICAgICB0aGlzLnRlcnJpdG9yaWVzID0gbnVsbDtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkVGVycml0b3JpZXMgPSBbXTtcclxuICAgICAgICB0aGlzLmV4Y2x1ZGVkVGVycml0b3JpZXMgPSBbXTtcclxuICAgICAgICB0aGlzLnRlcnJpdG9yeUJpZHMgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnNlbGxBc1BhY2thZ2UgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgdGhpcy52YWxpZGF0ZSA9ICgpID0+IHtcclxuXHJcbiAgICAgICAgICAgIHZhciBkZXNjcmlwdGlvbiA9IFwiU2FsZXMgUGFja2FnZSBcIiArIHRoaXMuaWQgKyBcIjogXCIsXHJcbiAgICAgICAgICAgICAgICBoYXNFcnJvcnMgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIGlmICggISB0aGlzLmN1cnJlbmN5ICkge1xyXG4gICAgICAgICAgICAgICAgaGFzRXJyb3JzID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uICs9IFwiQ3VycmVuY3kgY2FuJ3QgYmUgZW1wdHkuIFwiO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoICEgdGhpcy5mZWUgKSB7XHJcbiAgICAgICAgICAgICAgICBoYXNFcnJvcnMgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb24gKz0gXCJGZWUgY2FuJ3QgYmUgZW1wdHkuIFwiO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoICEgdGhpcy50ZXJyaXRvcmllcyApIHtcclxuICAgICAgICAgICAgICAgIGhhc0Vycm9ycyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbiArPSBcIlRlcnJpdG9yaWVzIGNhbid0IGJlIGVtcHR5LiBcIjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCAhIHRoaXMuc2FsZXNNZXRob2QgKSB7XHJcbiAgICAgICAgICAgICAgICBoYXNFcnJvcnMgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb24gKz0gXCJTYWxlcyBtZXRob2QgY2FuJ3QgYmUgZW1wdHkuIFwiO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgaGFzRXJyb3JzOiBoYXNFcnJvcnMsXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbiA6IGRlc2NyaXB0aW9uXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICBDb250ZW50QXJlbmEuTW9kZWwuQ29udGVudCA9IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICB0aGlzLnNwb3J0ID0ge307XHJcbiAgICAgICAgdGhpcy5zcG9ydHMgPSBbXTtcclxuICAgICAgICB0aGlzLnRvdXJuYW1lbnQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuY2F0ZWdvcnkgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuZXZlbnRUeXBlID0gXCJkYXRhYmFzZVwiO1xyXG4gICAgICAgIHRoaXMuc2FsZXNQYWNrYWdlcyA9IHt9O1xyXG4gICAgICAgIHRoaXMuaW5zdGFsbG1lbnRzID0ge307XHJcblxyXG4gICAgICAgIHRoaXMuZ2V0VGl0bGUgPSAoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzKTtcclxuXHJcbiAgICAgICAgICAgIHZhciB0aXRsZSA9IFwiXCI7XHJcblxyXG4gICAgICAgICAgICBpZiAoIHRoaXMuc3BvcnRzLmxlbmd0aCA+IDAgKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3BvcnRzLmZvckVhY2goZnVuY3Rpb24gKHNwb3J0LCBpbmRleCwgYXJyYXkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZSArPSBzcG9ydC52YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIChpbmRleCsxKSAhPSBhcnJheS5sZW5ndGggKSB0aXRsZSArPSBcIiwgXCJcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoIHRoaXMuZXZlbnRUeXBlID09PSBcImN1c3RvbVwiICl7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoIHRoaXMuZXZlbnRUeXBlID09PSBcImRhdGFiYXNlXCIgKXtcclxuICAgICAgICAgICAgICAgIGlmICggdGhpcy5zcG9ydCAhPT0gbnVsbCApIHRpdGxlICs9IHRoaXMuc3BvcnQudmFsdWU7XHJcbiAgICAgICAgICAgICAgICBpZiAoIHRoaXMuY2F0ZWdvcnkgIT09IG51bGwgKSB0aXRsZSArPSBcIiAtIFwiICsgdGhpcy5jYXRlZ29yeS52YWx1ZTtcclxuICAgICAgICAgICAgICAgIGlmICggdGhpcy50b3VybmFtZW50ICE9PSBudWxsICkgdGl0bGUgKz0gXCIgLSBcIiArIHRoaXMudG91cm5hbWVudC52YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCB0aGlzLnNlYXNvbnMgJiYgdGhpcy5zZWFzb25zLmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICAgICAgdGl0bGUgKz0gXCIgXCIgKyB0aGlzLnNlYXNvbnMubWFwKCAoIHNlYXNvbiApID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdmFsdWVzID0gc2Vhc29uLnZhbHVlLnNwbGl0KFwiIFwiKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWVzW3ZhbHVlcy5sZW5ndGggLSAxXVxyXG4gICAgICAgICAgICAgICAgfSkuam9pbihcIiAtIFwiKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRpdGxlO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHdhdGNoKHRoaXMsIFwic3BvcnRzXCIsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVXBkYXRpbmcgc3BvcnRzXCIsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHdhdGNoKHRoaXMsIFwiZXZlbnRUeXBlXCIsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVXBkYXRpbmcgZXZlbnRUeXBlXCIsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfTtcclxuXHJcbn0pO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9jYS9jYS5tb2RlbHMuanMiLCIvKipcclxuICogQ3JlYXRlZCBieSBKdWFuQ3J1eiBvbiA0LzEvMjAxOC5cclxuICovXHJcblxyXG53aW5kb3cuQ29udGVudEFyZW5hID0gd2luZG93LkNvbnRlbnRBcmVuYSB8fCB7fTtcclxuXHJcbkNvbnRlbnRBcmVuYS5VdGlscyA9IHtcclxuICAgIGFkZFJlZ2lvbkJlaGF2aW91cihzZWxlY3Rvcikge1xyXG5cclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IGhvc3R1cmwgKyBcInYxL2ZlZWQvdGVzdFwiLFxyXG4gICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuXHJcbiAgICAgICAgICAgICAgICByZXNwb25zZS5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChhLm5hbWUgPiBiLm5hbWUpID8gMSA6ICgoYi5uYW1lID4gYS5uYW1lKSA/IC0xIDogMCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAkKHNlbGVjdG9yKS5odG1sKFwiXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgICAgICogQHBhcmFtIHt7IGNvdW50cnlfY29kZTogc3RyaW5nIH19IHZcclxuICAgICAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICAgICAgJC5lYWNoKHJlc3BvbnNlLCBmdW5jdGlvbiAoaywgdikge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgb3B0aW9uID0gJzxvcHRpb24gdmFsdWU9JyArIHYuY291bnRyeV9jb2RlICsgJz4nICsgdi5uYW1lICsgJzwvb3B0aW9uPic7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQoc2VsZWN0b3IpLmVhY2goZnVuY3Rpb24gKGtleSwgc2VsZWN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoc2VsZWN0KS5hcHBlbmQob3B0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAkKHNlbGVjdG9yKS5jaG9zZW4oe3dpZHRoOiBcIjUwJVwifSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgYWRkTGFuZ3VhZ2VCZWhhdmlvdXIoIHNlbGVjdG9yICl7XHJcblxyXG4gICAgICAgICQoc2VsZWN0b3IpLmVhY2goZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgdmFyIF90aGlzID0gJCh0aGlzKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChfdGhpcy5kYXRhKFwiY2hvc2VuXCIpICE9PSB1bmRlZmluZWQgKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAkLmVhY2goQ29udGVudEFyZW5hLkxhbmd1YWdlcy5TaG9ydCwgZnVuY3Rpb24oaywgdil7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIG9wdGlvbiA9ICc8b3B0aW9uIHZhbHVlPScgKyBrICsgJz4nICsgdiArICc8L29wdGlvbj4nO1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuYXBwZW5kKG9wdGlvbik7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgX3RoaXMuY2hvc2VuKCk7XHJcblxyXG4gICAgICAgICAgICBfdGhpcy5jaG9zZW4oKS5jaGFuZ2UoZnVuY3Rpb24gKGUsIG9wdCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9wdC5zZWxlY3RlZCAmJiBvcHQuc2VsZWN0ZWQgPT09IFwiYWxsXCIpe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5odG1sKFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICQuZWFjaChDb250ZW50QXJlbmEuTGFuZ3VhZ2VzLkxvbmcsIGZ1bmN0aW9uKGssIHYpe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9wdGlvbiA9ICc8b3B0aW9uIHZhbHVlPScgKyBrICsgJz4nICsgdiArICc8L29wdGlvbj4nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5hcHBlbmQob3B0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMudHJpZ2dlcihcImNob3Nlbjp1cGRhdGVkXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBpc0FQSUF2YWlsYWJsZSgpIHtcclxuICAgICAgICAvLyBDaGVjayBmb3IgdGhlIHZhcmlvdXMgRmlsZSBBUEkgc3VwcG9ydC5cclxuICAgICAgICBpZiAod2luZG93LkZpbGUgJiYgd2luZG93LkZpbGVSZWFkZXIgJiYgd2luZG93LkZpbGVMaXN0ICYmIHdpbmRvdy5CbG9iKSB7XHJcbiAgICAgICAgICAgIC8vIEdyZWF0IHN1Y2Nlc3MhIEFsbCB0aGUgRmlsZSBBUElzIGFyZSBzdXBwb3J0ZWQuXHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIHNvdXJjZTogRmlsZSBBUEkgYXZhaWxhYmlsaXR5IC0gaHR0cDovL2Nhbml1c2UuY29tLyNmZWF0PWZpbGVhcGlcclxuICAgICAgICAgICAgLy8gc291cmNlOiA8b3V0cHV0PiBhdmFpbGFiaWxpdHkgLSBodHRwOi8vaHRtbDVkb2N0b3IuY29tL3RoZS1vdXRwdXQtZWxlbWVudC9cclxuICAgICAgICAgICAgZG9jdW1lbnQud3JpdGVsbignVGhlIEhUTUw1IEFQSXMgdXNlZCBpbiB0aGlzIGZvcm0gYXJlIG9ubHkgYXZhaWxhYmxlIGluIHRoZSBmb2xsb3dpbmcgYnJvd3NlcnM6PGJyIC8+Jyk7XHJcbiAgICAgICAgICAgIC8vIDYuMCBGaWxlIEFQSSAmIDEzLjAgPG91dHB1dD5cclxuICAgICAgICAgICAgZG9jdW1lbnQud3JpdGVsbignIC0gR29vZ2xlIENocm9tZTogMTMuMCBvciBsYXRlcjxiciAvPicpO1xyXG4gICAgICAgICAgICAvLyAzLjYgRmlsZSBBUEkgJiA2LjAgPG91dHB1dD5cclxuICAgICAgICAgICAgZG9jdW1lbnQud3JpdGVsbignIC0gTW96aWxsYSBGaXJlZm94OiA2LjAgb3IgbGF0ZXI8YnIgLz4nKTtcclxuICAgICAgICAgICAgLy8gMTAuMCBGaWxlIEFQSSAmIDEwLjAgPG91dHB1dD5cclxuICAgICAgICAgICAgZG9jdW1lbnQud3JpdGVsbignIC0gSW50ZXJuZXQgRXhwbG9yZXI6IE5vdCBzdXBwb3J0ZWQgKHBhcnRpYWwgc3VwcG9ydCBleHBlY3RlZCBpbiAxMC4wKTxiciAvPicpO1xyXG4gICAgICAgICAgICAvLyA/IEZpbGUgQVBJICYgNS4xIDxvdXRwdXQ+XHJcbiAgICAgICAgICAgIGRvY3VtZW50LndyaXRlbG4oJyAtIFNhZmFyaTogTm90IHN1cHBvcnRlZDxiciAvPicpO1xyXG4gICAgICAgICAgICAvLyA/IEZpbGUgQVBJICYgOS4yIDxvdXRwdXQ+XHJcbiAgICAgICAgICAgIGRvY3VtZW50LndyaXRlbG4oJyAtIE9wZXJhOiBOb3Qgc3VwcG9ydGVkJyk7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgYWRkT3JkaW5hbChuKSB7XHJcbiAgICAgICAgdmFyIHN0ciA9IG4udG9TdHJpbmcoKS5zbGljZSgtMSksXHJcbiAgICAgICAgICAgIG9yZCA9ICcnO1xyXG4gICAgICAgIHN3aXRjaCAoc3RyKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJzEnOlxyXG4gICAgICAgICAgICAgICAgb3JkID0gJ3N0JztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICcyJzpcclxuICAgICAgICAgICAgICAgIG9yZCA9ICduZCc7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnMyc6XHJcbiAgICAgICAgICAgICAgICBvcmQgPSAncmQnO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJzQnOlxyXG4gICAgICAgICAgICBjYXNlICc1JzpcclxuICAgICAgICAgICAgY2FzZSAnNic6XHJcbiAgICAgICAgICAgIGNhc2UgJzcnOlxyXG4gICAgICAgICAgICBjYXNlICc4JzpcclxuICAgICAgICAgICAgY2FzZSAnOSc6XHJcbiAgICAgICAgICAgIGNhc2UgJzAnOlxyXG4gICAgICAgICAgICAgICAgb3JkID0gJ3RoJztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbiArIG9yZDtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gdmFsdWVcclxuICAgICAqIEBwYXJhbSBhcnJcclxuICAgICAqIEBwYXJhbSBwcm9wXHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAgICovXHJcbiAgICBnZXRJbmRleCAodmFsdWUsIGFyciwgcHJvcCkge1xyXG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYoYXJyW2ldW3Byb3BdID09PSB2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIC0xOyAvL3RvIGhhbmRsZSB0aGUgY2FzZSB3aGVyZSB0aGUgdmFsdWUgZG9lc24ndCBleGlzdFxyXG4gICAgfVxyXG5cclxufTtcclxuXHJcblxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9jYS9jYS51dGlscy5qcyJdLCJzb3VyY2VSb290IjoiIn0=