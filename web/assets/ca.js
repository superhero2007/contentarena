webpackJsonp([3],{

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
        return a.name > b.name ? 1 : b.name > a.name ? -1 : 0;
    },
    sortBySport: function sortBySport(a, b) {

        if (a.sport.name > b.sport.name) return 1;
        if (a.sport.name < b.sport.name) return -1;
        if (a.sportCategory.name > b.sportCategory.name) return 1;
        if (a.sportCategory.name < b.sportCategory.name) return -1;
        if (a.name > b.name) return 1;
        if (a.name < b.name) return -1;
        return 0;
    },
    prepareList: function prepareList(list, categoryId) {

        var _this = this;

        list = $.map(list, function (item) {

            // Filter by category
            if (categoryId && item.category['@attributes'].id != categoryId) return null;

            return { name: item['@attributes'].name, externalId: item['@attributes'].id };
        });

        list.sort(_this.sortByLabel);

        return list;
    },
    getContent: function getContent(filter) {
        var deferred = jQuery.Deferred();

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
        var deferred = jQuery.Deferred();

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
    getCountries: function getCountries() {
        var deferred = jQuery.Deferred();
        var _this = this;
        $.ajax({
            url: envhosturl + "search/countries/all",
            type: "POST",
            /**
             * @param {array} response
             */
            success: function success(response) {
                response.sort(_this.sortByLabel);
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
    getRights: function getRights(rightsPackage, group) {
        var deferred = jQuery.Deferred();
        var _this = this;
        $.ajax({
            url: envhosturl + "search/rights",
            type: "POST",
            data: {
                rightsPackage: rightsPackage,
                group: group
            },

            /**
             * @param {array} response
             */
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
        var deferred = jQuery.Deferred();
        var _this = this;
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
                            externalId: item['@attributes'].id,
                            endDate: item['@attributes'].end_date,
                            startDate: item['@attributes'].start_date,
                            tournamentId: item['@attributes'].tournament_id,
                            year: item['@attributes'].year
                        };
                    }).reverse();
                } else {
                    list = [{
                        name: response.seasons.season['@attributes'].name,
                        externalId: response.seasons.season['@attributes'].id,
                        endDate: response.seasons.season['@attributes'].end_date,
                        startDate: response.seasons.season['@attributes'].start_date,
                        tournamentId: response.seasons.season['@attributes'].tournament_id,
                        year: response.seasons.season['@attributes'].year
                    }];
                }

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
                        externalId: item['@attributes'].id,
                        status: item['@attributes'].status,
                        tournamentRound: round,
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
        var _this = this;

        $.ajax({
            url: envhosturl + 'search/tournament',
            data: {
                "content": request
            },
            traditional: true,
            type: "POST",
            dataType: "json",
            success: function success(data) {

                data.sort(_this.sortBySport);

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

ContentArena.Data.TopSports = [{ name: "Soccer", externalId: "sr:sport:1" }, { name: "Basketball", externalId: "sr:sport:2" }, { name: "Baseball", externalId: "sr:sport:3" }, { name: "Tennis", externalId: "sr:sport:5" }, { name: "Cricket", externalId: "sr:sport:21" }, { name: "Field Hockey", externalId: "sr:sport:24" }, { name: "Volleyball", externalId: "sr:sport:23" }, { name: "Table Tennis", externalId: "sr:sport:20" }, { name: "Golf", externalId: "sr:sport:9" }, { name: "American Football", externalId: "sr:sport:16" }, { name: "Handball", externalId: "sr:sport:6" }];

ContentArena.Data.FullSports = [];
ContentArena.Data.Countries = [];

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9jYS9jYS5hcGkuY29udGVudC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9jYS9jYS5hcGkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvY2EvY2EuZGF0YS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9jYS9jYS5tb2RlbHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvY2EvY2EudXRpbHMuanMiXSwibmFtZXMiOlsiX19hcGlTdG9yZSIsInRvdXJuYW1lbnRzIiwid2luZG93IiwiQ29udGVudEFyZW5hIiwiQ29udGVudEFwaSIsInNhdmVDb250ZW50QXNEcmFmdCIsImNvbnRlbnQiLCJkZWZlcnJlZCIsImpRdWVyeSIsIkRlZmVycmVkIiwiX3RoaXMiLCIkIiwiYWpheCIsInVybCIsImVudmhvc3R1cmwiLCJ0eXBlIiwiZGF0YSIsIkpTT04iLCJzdHJpbmdpZnkiLCJjb250ZW50VHlwZSIsInN1Y2Nlc3MiLCJyZXNwb25zZSIsInJlc29sdmUiLCJlcnJvciIsInN0YXR1cyIsInJlamVjdCIsInByb21pc2UiLCJBcGkiLCJzb3J0QnlMYWJlbCIsImEiLCJiIiwibmFtZSIsInNvcnRCeVNwb3J0Iiwic3BvcnQiLCJzcG9ydENhdGVnb3J5IiwicHJlcGFyZUxpc3QiLCJsaXN0IiwiY2F0ZWdvcnlJZCIsIm1hcCIsIml0ZW0iLCJjYXRlZ29yeSIsImlkIiwiZXh0ZXJuYWxJZCIsInNvcnQiLCJnZXRDb250ZW50IiwiZmlsdGVyIiwic2F2ZUZpbHRlciIsImdldENvdW50cmllcyIsImdldFJpZ2h0cyIsInJpZ2h0c1BhY2thZ2UiLCJncm91cCIsImdldFNwb3J0cyIsImhvc3R1cmwiLCJzcG9ydHMiLCJnZXRDb250ZW50RGV0YWlscyIsImdldFBlbmRpbmdMaXN0aW5ncyIsImdldENhdGVnb3JpZXMiLCJzcG9ydElkIiwiY2F0cyIsImdldFRvdXJuYW1lbnRzIiwiZG9uZSIsInRvdXJuYW1lbnQiLCJpbmRleE9mIiwicHVzaCIsInVuZGVmaW5lZCIsImdldFNlYXNvbnMiLCJ0b3VybmFtZW50SWQiLCJzZWFzb25zIiwic2Vhc29uIiwiaXNBcnJheSIsImVuZERhdGUiLCJlbmRfZGF0ZSIsInN0YXJ0RGF0ZSIsInN0YXJ0X2RhdGUiLCJ0b3VybmFtZW50X2lkIiwieWVhciIsInJldmVyc2UiLCJnZXRTY2hlZHVsZSIsInNlYXNvbklkIiwiY29uc29sZSIsImxvZyIsInNwb3J0X2V2ZW50cyIsInNwb3J0X2V2ZW50IiwiZm9yRWFjaCIsInJvdW5kIiwidG91cm5hbWVudF9yb3VuZCIsIm51bWJlciIsInNjaGVkdWxlZCIsInRvdXJuYW1lbnRSb3VuZCIsImNvbXBldGl0b3JzIiwiY29tcGV0aXRvciIsInNlYXJjaENvbXBldGl0aW9uIiwicmVxdWVzdCIsInRyYWRpdGlvbmFsIiwiZGF0YVR5cGUiLCJ3YXRjaGxpc3QiLCJEYXRhIiwiTGFuZ3VhZ2VzIiwiVG9wU3BvcnRzIiwiRnVsbFNwb3J0cyIsIkNvdW50cmllcyIsIlNob3J0IiwiTG9uZyIsIk1vZGVsIiwiUmlnaHRQYWNrYWdlIiwicmlnaHRzIiwiRGlzdHJpYnV0aW9uUGFja2FnZSIsInByb2R1Y3Rpb24iLCJ0ZWNobmljYWwiLCJSaWdodCIsInJpZ2h0SXRlbXMiLCJSaWdodEl0ZW0iLCJpbnB1dHMiLCJTZWxlY3RlZFJpZ2h0IiwicmlnaHQiLCJyaWdodEl0ZW0iLCJkaXN0cmlidXRpb25QYWNrYWdlIiwiU2FsZXNQYWNrYWdlIiwic2FsZXNNZXRob2QiLCJmZWUiLCJjdXJyZW5jeSIsInRlcnJpdG9yaWVzIiwic2VsZWN0ZWRUZXJyaXRvcmllcyIsImV4Y2x1ZGVkVGVycml0b3JpZXMiLCJ0ZXJyaXRvcnlCaWRzIiwic2VsbEFzUGFja2FnZSIsInZhbGlkYXRlIiwiZGVzY3JpcHRpb24iLCJoYXNFcnJvcnMiLCJDb250ZW50IiwiZXZlbnRUeXBlIiwic2FsZXNQYWNrYWdlcyIsImluc3RhbGxtZW50cyIsImdldFRpdGxlIiwidGl0bGUiLCJsZW5ndGgiLCJpbmRleCIsImFycmF5IiwidmFsdWUiLCJ2YWx1ZXMiLCJzcGxpdCIsImpvaW4iLCJ3YXRjaCIsImFyZ3VtZW50cyIsIlV0aWxzIiwiYWRkUmVnaW9uQmVoYXZpb3VyIiwic2VsZWN0b3IiLCJodG1sIiwiZWFjaCIsImsiLCJ2Iiwib3B0aW9uIiwiY291bnRyeV9jb2RlIiwia2V5Iiwic2VsZWN0IiwiYXBwZW5kIiwiY2hvc2VuIiwid2lkdGgiLCJhZGRMYW5ndWFnZUJlaGF2aW91ciIsImNoYW5nZSIsImUiLCJvcHQiLCJzZWxlY3RlZCIsInRyaWdnZXIiLCJpc0FQSUF2YWlsYWJsZSIsIkZpbGUiLCJGaWxlUmVhZGVyIiwiRmlsZUxpc3QiLCJCbG9iIiwiZG9jdW1lbnQiLCJ3cml0ZWxuIiwiYWRkT3JkaW5hbCIsIm4iLCJzdHIiLCJ0b1N0cmluZyIsInNsaWNlIiwib3JkIiwiZ2V0SW5kZXgiLCJhcnIiLCJwcm9wIiwiaSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBSUEsSUFBSUEsYUFBYTtBQUNiQyxpQkFBYztBQURELENBQWpCOztBQUlBQyxPQUFPQyxZQUFQLEdBQXNCRCxPQUFPQyxZQUFQLElBQXVCLEVBQTdDO0FBQ0FBLGFBQWFDLFVBQWIsR0FBMEJELGFBQWFDLFVBQWIsSUFBMEIsRUFBcEQ7O0FBRUFELGFBQWFDLFVBQWIsR0FBeUI7QUFDckJDLHNCQURxQiw4QkFDQUMsT0FEQSxFQUNVO0FBQzNCLFlBQUlDLFdBQVdDLE9BQU9DLFFBQVAsRUFBZjtBQUFBLFlBQ0lDLFFBQVEsSUFEWjs7QUFHQUMsVUFBRUMsSUFBRixDQUFPO0FBQ0hDLGlCQUFLQyxhQUFhLG9CQURm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QUFDQSxpQkFBSyxHQUFMO0FBQ0EsaUJBQUssR0FBTDtBQUNBLGlCQUFLLEdBQUw7QUFDQSxpQkFBSyxHQUFMO0FBQ0lBLHNCQUFNLElBQU47QUFDQTtBQWxCUjtBQW9CQSxlQUFPSixJQUFJSSxHQUFYO0FBQ0gsS0E5R2dCOztBQStHakI7Ozs7Ozs7QUFPQUMsWUF0SGlCLG9CQXNIUHZDLEtBdEhPLEVBc0hBd0MsR0F0SEEsRUFzSEtDLElBdEhMLEVBc0hXO0FBQ3hCLGFBQUksSUFBSUMsSUFBSSxDQUFaLEVBQWVBLElBQUlGLElBQUkzQyxNQUF2QixFQUErQjZDLEdBQS9CLEVBQW9DO0FBQ2hDLGdCQUFHRixJQUFJRSxDQUFKLEVBQU9ELElBQVAsTUFBaUJ6QyxLQUFwQixFQUEyQjtBQUN2Qix1QkFBTzBDLENBQVA7QUFDSDtBQUNKO0FBQ0QsZUFBTyxDQUFDLENBQVIsQ0FOd0IsQ0FNYjtBQUNkO0FBN0hnQixDQUFyQixDIiwiZmlsZSI6ImNhLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiogQ3JlYXRlZCBieSBKdWFuQ3J1eiBvbiA0LzEvMjAxOC5cclxuKi9cclxuXHJcbmxldCBfX2FwaVN0b3JlID0ge1xyXG4gICAgdG91cm5hbWVudHMgOiB7fVxyXG59O1xyXG5cclxud2luZG93LkNvbnRlbnRBcmVuYSA9IHdpbmRvdy5Db250ZW50QXJlbmEgfHwge307XHJcbkNvbnRlbnRBcmVuYS5Db250ZW50QXBpID0gQ29udGVudEFyZW5hLkNvbnRlbnRBcGl8fCB7fTtcclxuXHJcbkNvbnRlbnRBcmVuYS5Db250ZW50QXBpPSB7XHJcbiAgICBzYXZlQ29udGVudEFzRHJhZnQgKCBjb250ZW50ICkge1xyXG4gICAgICAgIHZhciBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxyXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XHJcblxyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiY29udGVudC9kcmFmdC9zYXZlXCIsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShjb250ZW50KSxcclxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcclxuICAgIH0sXHJcblxyXG59O1xyXG5cclxuXHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L2NhL2NhLmFwaS5jb250ZW50LmpzIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgSnVhbkNydXogb24gNC8xLzIwMTguXHJcbiAqL1xyXG5cclxubGV0IF9fYXBpU3RvcmUgPSB7XHJcbiAgICB0b3VybmFtZW50cyA6IHt9XHJcbn07XHJcblxyXG53aW5kb3cuQ29udGVudEFyZW5hID0gd2luZG93LkNvbnRlbnRBcmVuYSB8fCB7fTtcclxuXHJcbkNvbnRlbnRBcmVuYS5BcGk9IHtcclxuICAgIHNvcnRCeUxhYmVsIChhLCBiKSB7XHJcbiAgICAgICAgcmV0dXJuIChhLm5hbWUgPiBiLm5hbWUpID8gMSA6ICgoYi5uYW1lID4gYS5uYW1lKSA/IC0xIDogMClcclxuICAgIH0sXHJcbiAgICBzb3J0QnlTcG9ydCAoYSwgYikge1xyXG5cclxuICAgICAgICBpZiAoYS5zcG9ydC5uYW1lID4gYi5zcG9ydC5uYW1lKSByZXR1cm4gMTtcclxuICAgICAgICBpZiAoYS5zcG9ydC5uYW1lIDwgYi5zcG9ydC5uYW1lKSByZXR1cm4gLTE7XHJcbiAgICAgICAgaWYgKGEuc3BvcnRDYXRlZ29yeS5uYW1lID4gYi5zcG9ydENhdGVnb3J5Lm5hbWUpIHJldHVybiAxO1xyXG4gICAgICAgIGlmIChhLnNwb3J0Q2F0ZWdvcnkubmFtZSA8IGIuc3BvcnRDYXRlZ29yeS5uYW1lKSByZXR1cm4gLTE7XHJcbiAgICAgICAgaWYgKGEubmFtZSA+IGIubmFtZSkgcmV0dXJuIDE7XHJcbiAgICAgICAgaWYgKGEubmFtZSA8IGIubmFtZSkgcmV0dXJuIC0xO1xyXG4gICAgICAgIHJldHVybiAwO1xyXG5cclxuICAgIH0sXHJcbiAgICBwcmVwYXJlTGlzdCAoIGxpc3QsIGNhdGVnb3J5SWQgKSB7XHJcblxyXG4gICAgICAgIGxldCBfdGhpcyA9IHRoaXM7XHJcblxyXG4gICAgICAgIGxpc3QgPSAkLm1hcChsaXN0LCBmdW5jdGlvbiAoaXRlbSkge1xyXG5cclxuICAgICAgICAgICAgLy8gRmlsdGVyIGJ5IGNhdGVnb3J5XHJcbiAgICAgICAgICAgIGlmICggY2F0ZWdvcnlJZCAmJiBpdGVtLmNhdGVnb3J5WydAYXR0cmlidXRlcyddLmlkICE9IGNhdGVnb3J5SWQpIHJldHVybiBudWxsO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHtuYW1lOiBpdGVtWydAYXR0cmlidXRlcyddLm5hbWUsIGV4dGVybmFsSWQ6IGl0ZW1bJ0BhdHRyaWJ1dGVzJ10uaWR9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGxpc3Quc29ydChfdGhpcy5zb3J0QnlMYWJlbCk7XHJcblxyXG4gICAgICAgIHJldHVybiBsaXN0O1xyXG4gICAgfSxcclxuICAgIGdldENvbnRlbnQgKCBmaWx0ZXIpIHtcclxuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKTtcclxuXHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJidXkvc2VhcmNoXCIsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBkYXRhIDogZmlsdGVyLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcclxuICAgIH0sXHJcbiAgICBzYXZlRmlsdGVyICggZmlsdGVyKSB7XHJcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCk7XHJcblxyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYnV5L2ZpbHRlci9zYXZlXCIsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBkYXRhIDogZmlsdGVyLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcclxuICAgIH0sXHJcbiAgICBnZXRDb3VudHJpZXMgKCkge1xyXG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpO1xyXG4gICAgICAgIGxldCBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJzZWFyY2gvY291bnRyaWVzL2FsbFwiLFxyXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIEBwYXJhbSB7YXJyYXl9IHJlc3BvbnNlXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgIHJlc3BvbnNlLnNvcnQoX3RoaXMuc29ydEJ5TGFiZWwpO1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xyXG4gICAgfSxcclxuICAgIGdldFJpZ2h0cyAocmlnaHRzUGFja2FnZSwgZ3JvdXApIHtcclxuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKTtcclxuICAgICAgICBsZXQgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwic2VhcmNoL3JpZ2h0c1wiLFxyXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgZGF0YSA6IHtcclxuICAgICAgICAgICAgICAgIHJpZ2h0c1BhY2thZ2U6IHJpZ2h0c1BhY2thZ2UsXHJcbiAgICAgICAgICAgICAgICBncm91cDogZ3JvdXBcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBAcGFyYW0ge2FycmF5fSByZXNwb25zZVxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XHJcbiAgICB9LFxyXG4gICAgZ2V0U3BvcnRzICgpIHtcclxuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKTtcclxuICAgICAgICBsZXQgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogaG9zdHVybCArIFwidjEvZmVlZC9zcG9ydHNcIixcclxuICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIEBwYXJhbSB7e3Nwb3J0Om9iamVjdH19IHJlc3BvbnNlXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgc3BvcnRzID0gX3RoaXMucHJlcGFyZUxpc3QoIHJlc3BvbnNlLnNwb3J0KTtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoc3BvcnRzKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XHJcbiAgICB9LFxyXG4gICAgZ2V0Q29udGVudERldGFpbHMoIGlkICkge1xyXG4gICAgICAgIHZhciBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxyXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XHJcblxyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiY29udGVudC9kZXRhaWxzL1wiLFxyXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgZGF0YToge2lkIDogaWR9LFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcclxuICAgIH0sXHJcbiAgICBnZXRQZW5kaW5nTGlzdGluZ3MoIGlkICkge1xyXG4gICAgICAgIHZhciBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxyXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XHJcblxyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiY29udGVudC9wZW5kaW5nLWxpc3RpbmdzL1wiLFxyXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgZGF0YToge2lkIDogaWR9LFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcclxuICAgIH0sXHJcbiAgICBnZXRDYXRlZ29yaWVzICggc3BvcnRJZCApIHtcclxuICAgICAgICB2YXIgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcclxuICAgICAgICAgICAgX3RoaXMgPSB0aGlzLFxyXG4gICAgICAgICAgICBsaXN0ID0gW10sXHJcbiAgICAgICAgICAgIGNhdHMgPSBbXTtcclxuXHJcbiAgICAgICAgX3RoaXMuZ2V0VG91cm5hbWVudHMoc3BvcnRJZCkuZG9uZShmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoICEgX19hcGlTdG9yZS50b3VybmFtZW50c1tzcG9ydElkXSApIHtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoIFtdICk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxpc3QgPSAkLm1hcCggX19hcGlTdG9yZS50b3VybmFtZW50c1tzcG9ydElkXS50b3VybmFtZW50ICwgZnVuY3Rpb24gKGl0ZW0pIHtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgaWQgPSBpdGVtLmNhdGVnb3J5WydAYXR0cmlidXRlcyddLmlkO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICggY2F0cy5pbmRleE9mKGlkKSAhPT0gLTEgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhdHMucHVzaCggaWQgKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbS5jYXRlZ29yeTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKF90aGlzLnByZXBhcmVMaXN0KGxpc3QpICk7XHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xyXG4gICAgfSxcclxuICAgIGdldFRvdXJuYW1lbnRzICggc3BvcnRJZCwgY2F0ZWdvcnlJZCApIHtcclxuICAgICAgICB2YXIgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcclxuICAgICAgICAgICAgX3RoaXMgPSB0aGlzO1xyXG5cclxuICAgICAgICBpZiAoIF9fYXBpU3RvcmUudG91cm5hbWVudHNbc3BvcnRJZF0gIT09IHVuZGVmaW5lZCApe1xyXG4gICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKF90aGlzLnByZXBhcmVMaXN0KF9fYXBpU3RvcmUudG91cm5hbWVudHNbc3BvcnRJZF0udG91cm5hbWVudCwgY2F0ZWdvcnlJZCkpO1xyXG4gICAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBob3N0dXJsICsgXCJ2MS9mZWVkL3RvdXJuYW1lbnRzXCIsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBkYXRhIDogeyBpZCA6IHNwb3J0SWQgfSxcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIEBwYXJhbSB7e3RvdXJuYW1lbnRzOnt0b3VybmFtZW50OkFycmF5fX19IHJlc3BvbnNlXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBBIGNvbW1lbnRcclxuICAgICAgICAgICAgICAgIGlmICggcmVzcG9uc2UudG91cm5hbWVudHMgPT09IHVuZGVmaW5lZCB8fCByZXNwb25zZS50b3VybmFtZW50cy50b3VybmFtZW50ID09PSB1bmRlZmluZWQgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShbXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIF9fYXBpU3RvcmUudG91cm5hbWVudHNbc3BvcnRJZF0gPSByZXNwb25zZS50b3VybmFtZW50cztcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoX3RoaXMucHJlcGFyZUxpc3QocmVzcG9uc2UudG91cm5hbWVudHMudG91cm5hbWVudCwgY2F0ZWdvcnlJZCkpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMgKSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcclxuICAgIH0sXHJcbiAgICBnZXRTZWFzb25zICggdG91cm5hbWVudElkICkge1xyXG4gICAgICAgIHZhciBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxyXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XHJcblxyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogaG9zdHVybCArIFwidjEvZmVlZC9zZWFzb25zXCIsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBkYXRhIDogeyBpZCA6IHRvdXJuYW1lbnRJZCB9LFxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogQHBhcmFtIHt7dG91cm5hbWVudHM6e3RvdXJuYW1lbnQ6QXJyYXl9fX0gcmVzcG9uc2VcclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBsaXN0O1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICggcmVzcG9uc2Uuc2Vhc29ucyA9PT0gdW5kZWZpbmVkIHx8IHJlc3BvbnNlLnNlYXNvbnMuc2Vhc29uID09PSB1bmRlZmluZWQgKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCAkLmlzQXJyYXkocmVzcG9uc2Uuc2Vhc29ucy5zZWFzb24pICl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGlzdCA9ICQubWFwKHJlc3BvbnNlLnNlYXNvbnMuc2Vhc29uLCBmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogaXRlbVsnQGF0dHJpYnV0ZXMnXS5uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXh0ZXJuYWxJZDogaXRlbVsnQGF0dHJpYnV0ZXMnXS5pZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuZERhdGU6IGl0ZW1bJ0BhdHRyaWJ1dGVzJ10uZW5kX2RhdGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydERhdGU6IGl0ZW1bJ0BhdHRyaWJ1dGVzJ10uc3RhcnRfZGF0ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvdXJuYW1lbnRJZDogaXRlbVsnQGF0dHJpYnV0ZXMnXS50b3VybmFtZW50X2lkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeWVhcjogaXRlbVsnQGF0dHJpYnV0ZXMnXS55ZWFyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSkucmV2ZXJzZSgpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBsaXN0ID0gW3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogcmVzcG9uc2Uuc2Vhc29ucy5zZWFzb25bJ0BhdHRyaWJ1dGVzJ10ubmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXh0ZXJuYWxJZDogcmVzcG9uc2Uuc2Vhc29ucy5zZWFzb25bJ0BhdHRyaWJ1dGVzJ10uaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuZERhdGU6IHJlc3BvbnNlLnNlYXNvbnMuc2Vhc29uWydAYXR0cmlidXRlcyddLmVuZF9kYXRlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFydERhdGU6IHJlc3BvbnNlLnNlYXNvbnMuc2Vhc29uWydAYXR0cmlidXRlcyddLnN0YXJ0X2RhdGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdXJuYW1lbnRJZDogcmVzcG9uc2Uuc2Vhc29ucy5zZWFzb25bJ0BhdHRyaWJ1dGVzJ10udG91cm5hbWVudF9pZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeWVhcjogcmVzcG9uc2Uuc2Vhc29ucy5zZWFzb25bJ0BhdHRyaWJ1dGVzJ10ueWVhcixcclxuICAgICAgICAgICAgICAgICAgICB9XVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUobGlzdCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cyApIHtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xyXG4gICAgfSxcclxuICAgIGdldFNjaGVkdWxlICggc2Vhc29uSWQgKSB7XHJcbiAgICAgICAgdmFyIGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXHJcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcclxuXHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBob3N0dXJsICsgXCJ2MS9mZWVkL3NjaGVkdWxlc1wiLFxyXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgZGF0YSA6IHsgaWQgOiBzZWFzb25JZCB9LFxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogQHBhcmFtIHt7dG91cm5hbWVudHM6e3RvdXJuYW1lbnQ6QXJyYXl9fX0gcmVzcG9uc2VcclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgbGlzdCA9IHt9O1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICggcmVzcG9uc2Uuc3BvcnRfZXZlbnRzID09PSB1bmRlZmluZWQgfHwgcmVzcG9uc2Uuc3BvcnRfZXZlbnRzLnNwb3J0X2V2ZW50ID09PSB1bmRlZmluZWQgKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAgICAgcmVzcG9uc2Uuc3BvcnRfZXZlbnRzLnNwb3J0X2V2ZW50LmZvckVhY2goIChpdGVtKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCByb3VuZCAgPSAoaXRlbS50b3VybmFtZW50X3JvdW5kKSA/IGl0ZW0udG91cm5hbWVudF9yb3VuZFsnQGF0dHJpYnV0ZXMnXSA6IG51bGw7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghcm91bmQpIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5hbWUgPSByb3VuZC5udW1iZXIgfHwgcm91bmQubmFtZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCAhbGlzdFtuYW1lXSApIGxpc3RbbmFtZV0gPSBbXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGlzdFtuYW1lXS5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NoZWR1bGVkOiBpdGVtWydAYXR0cmlidXRlcyddLnNjaGVkdWxlZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXh0ZXJuYWxJZDogaXRlbVsnQGF0dHJpYnV0ZXMnXS5pZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBpdGVtWydAYXR0cmlidXRlcyddLnN0YXR1cyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG91cm5hbWVudFJvdW5kIDogcm91bmQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBldGl0b3JzIDogKGl0ZW0uY29tcGV0aXRvcnMpID8gaXRlbS5jb21wZXRpdG9ycy5jb21wZXRpdG9yLm1hcCgoIGNvbXBldGl0b3IpPT57IHJldHVybiBjb21wZXRpdG9yWydAYXR0cmlidXRlcyddICB9KSAgOiBudWxsXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLypsaXN0LnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWUgOiBcIkFkZCBuZXdcIixcclxuICAgICAgICAgICAgICAgICAgICBleHRlcm5hbF9pZCA6IDBcclxuICAgICAgICAgICAgICAgIH0pOyovXHJcblxyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShsaXN0KTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzICkge1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XHJcbiAgICB9LFxyXG4gICAgc2VhcmNoQ29tcGV0aXRpb24ocmVxdWVzdCkge1xyXG5cclxuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKTtcclxuICAgICAgICBsZXQgX3RoaXMgPSB0aGlzO1xyXG5cclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyAnc2VhcmNoL3RvdXJuYW1lbnQnLFxyXG4gICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICBcImNvbnRlbnRcIjogcmVxdWVzdFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB0cmFkaXRpb25hbDogdHJ1ZSxcclxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIGRhdGFUeXBlOiBcImpzb25cIixcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBkYXRhLnNvcnQoX3RoaXMuc29ydEJ5U3BvcnQpO1xyXG5cclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoZGF0YSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cyApIHtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xyXG4gICAgfSxcclxuICAgIHdhdGNobGlzdCggaWQgKSB7XHJcbiAgICAgICAgdmFyIGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXHJcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcclxuXHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJteWNvbnRlbnQvd2F0Y2hsaXN0L1wiLFxyXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgZGF0YToge2lkIDogaWR9LFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcclxuICAgIH1cclxufTtcclxuXHJcblxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9jYS9jYS5hcGkuanMiLCIvKipcclxuICogQ3JlYXRlZCBieSBKdWFuQ3J1eiBvbiA0LzEvMjAxOC5cclxuICovXHJcblxyXG53aW5kb3cuQ29udGVudEFyZW5hID0gd2luZG93LkNvbnRlbnRBcmVuYSB8fCB7fTtcclxuXHJcbkNvbnRlbnRBcmVuYS5EYXRhID0gQ29udGVudEFyZW5hLkRhdGEgfHwge307XHJcbkNvbnRlbnRBcmVuYS5MYW5ndWFnZXMgPSBDb250ZW50QXJlbmEuTGFuZ3VhZ2VzIHx8IHt9O1xyXG5cclxuQ29udGVudEFyZW5hLkRhdGEuVG9wU3BvcnRzID0gW1xyXG4gICAgeyBuYW1lIDogXCJTb2NjZXJcIiwgZXh0ZXJuYWxJZDogXCJzcjpzcG9ydDoxXCJ9LFxyXG4gICAgeyBuYW1lIDogXCJCYXNrZXRiYWxsXCIsIGV4dGVybmFsSWQ6IFwic3I6c3BvcnQ6MlwifSxcclxuICAgIHsgbmFtZSA6IFwiQmFzZWJhbGxcIiwgZXh0ZXJuYWxJZDogXCJzcjpzcG9ydDozXCJ9LFxyXG4gICAgeyBuYW1lIDogXCJUZW5uaXNcIiwgZXh0ZXJuYWxJZDogXCJzcjpzcG9ydDo1XCJ9LFxyXG4gICAgeyBuYW1lIDogXCJDcmlja2V0XCIsIGV4dGVybmFsSWQ6IFwic3I6c3BvcnQ6MjFcIn0sXHJcbiAgICB7IG5hbWUgOiBcIkZpZWxkIEhvY2tleVwiLCBleHRlcm5hbElkOiBcInNyOnNwb3J0OjI0XCJ9LFxyXG4gICAgeyBuYW1lIDogXCJWb2xsZXliYWxsXCIsIGV4dGVybmFsSWQ6IFwic3I6c3BvcnQ6MjNcIn0sXHJcbiAgICB7IG5hbWUgOiBcIlRhYmxlIFRlbm5pc1wiLCBleHRlcm5hbElkOiBcInNyOnNwb3J0OjIwXCJ9LFxyXG4gICAgeyBuYW1lIDogXCJHb2xmXCIsIGV4dGVybmFsSWQ6IFwic3I6c3BvcnQ6OVwifSxcclxuICAgIHsgbmFtZSA6IFwiQW1lcmljYW4gRm9vdGJhbGxcIiwgZXh0ZXJuYWxJZDogXCJzcjpzcG9ydDoxNlwifSxcclxuICAgIHsgbmFtZSA6IFwiSGFuZGJhbGxcIiwgZXh0ZXJuYWxJZDogXCJzcjpzcG9ydDo2XCJ9XHJcbl07XHJcblxyXG5Db250ZW50QXJlbmEuRGF0YS5GdWxsU3BvcnRzID0gW107XHJcbkNvbnRlbnRBcmVuYS5EYXRhLkNvdW50cmllcyA9IFtdO1xyXG5cclxuQ29udGVudEFyZW5hLkxhbmd1YWdlcy5TaG9ydCA9IHtcclxuICAgIFwibWRyXCI6IFwiTWFuZGFyaW5cIixcclxuICAgIFwiZXNcIjogXCJTcGFuaXNoXCIsXHJcbiAgICBcImVuXCI6IFwiRW5nbGlzaFwiLFxyXG4gICAgXCJoaVwiOiBcIkhpbmRpXCIsXHJcbiAgICBcImFyXCI6IFwiQXJhYmljXCIsXHJcbiAgICBcInB0XCI6IFwiUG9ydHVndWVzZVwiLFxyXG4gICAgXCJiblwiOiBcIkJlbmdhbGlcIixcclxuICAgIFwicnVcIjogXCJSdXNzaWFuXCIsXHJcbiAgICBcImphXCI6IFwiSmFwYW5lc2VcIixcclxuICAgIFwianZcIjogXCJKYXZhbmVzZVwiLFxyXG4gICAgXCJkZVwiOiBcIkdlcm1hblwiLFxyXG4gICAgXCJhbGxcIiA6IFwiU2hvdyBBbGxcIlxyXG59O1xyXG5cclxuQ29udGVudEFyZW5hLkxhbmd1YWdlcy5Mb25nID0ge1xyXG4gICAgXCJhYVwiOiBcIkFmYXJcIixcclxuICAgIFwiYWZcIjogXCJBZnJpa2FhbnNcIixcclxuICAgIFwiYWluXCI6IFwiQWludVwiLFxyXG4gICAgXCJha3pcIjogXCJBbGFiYW1hXCIsXHJcbiAgICBcInNxXCI6IFwiQWxiYW5pYW5cIixcclxuICAgIFwiYWxlXCI6IFwiQWxldXRcIixcclxuICAgIFwiYXJxXCI6IFwiQWxnZXJpYW4gQXJhYmljXCIsXHJcbiAgICBcImVuX1VTXCI6IFwiQW1lcmljYW4gRW5nbGlzaFwiLFxyXG4gICAgXCJhc2VcIjogXCJBbWVyaWNhbiBTaWduIExhbmd1YWdlXCIsXHJcbiAgICBcImFtXCI6IFwiQW1oYXJpY1wiLFxyXG4gICAgXCJlZ3lcIjogXCJBbmNpZW50IEVneXB0aWFuXCIsXHJcbiAgICBcImdyY1wiOiBcIkFuY2llbnQgR3JlZWtcIixcclxuICAgIFwiYXJcIjogXCJBcmFiaWNcIixcclxuICAgIFwiYXJjXCI6IFwiQXJhbWFpY1wiLFxyXG4gICAgXCJhcnBcIjogXCJBcmFwYWhvXCIsXHJcbiAgICBcImFyd1wiOiBcIkFyYXdha1wiLFxyXG4gICAgXCJoeVwiOiBcIkFybWVuaWFuXCIsXHJcbiAgICBcImFzXCI6IFwiQXNzYW1lc2VcIixcclxuICAgIFwiYXNhXCI6IFwiQXN1XCIsXHJcbiAgICBcImVuX0FVXCI6IFwiQXVzdHJhbGlhbiBFbmdsaXNoXCIsXHJcbiAgICBcImRlX0FUXCI6IFwiQXVzdHJpYW4gR2VybWFuXCIsXHJcbiAgICBcImF5XCI6IFwiQXltYXJhXCIsXHJcbiAgICBcImF6XCI6IFwiQXplcmJhaWphbmlcIixcclxuICAgIFwiYmFuXCI6IFwiQmFsaW5lc2VcIixcclxuICAgIFwiZXVcIjogXCJCYXNxdWVcIixcclxuICAgIFwiYmFyXCI6IFwiQmF2YXJpYW5cIixcclxuICAgIFwiYmVcIjogXCJCZWxhcnVzaWFuXCIsXHJcbiAgICBcImJuXCI6IFwiQmVuZ2FsaVwiLFxyXG4gICAgXCJiaWtcIjogXCJCaWtvbFwiLFxyXG4gICAgXCJiaW5cIjogXCJCaW5pXCIsXHJcbiAgICBcImJzXCI6IFwiQm9zbmlhblwiLFxyXG4gICAgXCJicmhcIjogXCJCcmFodWlcIixcclxuICAgIFwiYnJhXCI6IFwiQnJhalwiLFxyXG4gICAgXCJwdF9CUlwiOiBcIkJyYXppbGlhbiBQb3J0dWd1ZXNlXCIsXHJcbiAgICBcImJyXCI6IFwiQnJldG9uXCIsXHJcbiAgICBcImVuX0dCXCI6IFwiQnJpdGlzaCBFbmdsaXNoXCIsXHJcbiAgICBcImJnXCI6IFwiQnVsZ2FyaWFuXCIsXHJcbiAgICBcIm15XCI6IFwiQnVybWVzZVwiLFxyXG4gICAgXCJmcmNcIjogXCJDYWp1biBGcmVuY2hcIixcclxuICAgIFwiZW5fQ0FcIjogXCJDYW5hZGlhbiBFbmdsaXNoXCIsXHJcbiAgICBcImZyX0NBXCI6IFwiQ2FuYWRpYW4gRnJlbmNoXCIsXHJcbiAgICBcInl1ZVwiOiBcIkNhbnRvbmVzZVwiLFxyXG4gICAgXCJjYXJcIjogXCJDYXJpYlwiLFxyXG4gICAgXCJjYVwiOiBcIkNhdGFsYW5cIixcclxuICAgIFwiY2F5XCI6IFwiQ2F5dWdhXCIsXHJcbiAgICBcImNlYlwiOiBcIkNlYnVhbm9cIixcclxuICAgIFwic2h1XCI6IFwiQ2hhZGlhbiBBcmFiaWNcIixcclxuICAgIFwiY2VcIjogXCJDaGVjaGVuXCIsXHJcbiAgICBcImNoclwiOiBcIkNoZXJva2VlXCIsXHJcbiAgICBcInF1Z1wiOiBcIkNoaW1ib3Jhem8gSGlnaGxhbmQgUXVpY2h1YVwiLFxyXG4gICAgXCJ6aFwiOiBcIkNoaW5lc2VcIixcclxuICAgIFwiY2huXCI6IFwiQ2hpbm9vayBKYXJnb25cIixcclxuICAgIFwiY2hwXCI6IFwiQ2hpcGV3eWFuXCIsXHJcbiAgICBcImNob1wiOiBcIkNob2N0YXdcIixcclxuICAgIFwiY3VcIjogXCJDaHVyY2ggU2xhdmljXCIsXHJcbiAgICBcImN2XCI6IFwiQ2h1dmFzaFwiLFxyXG4gICAgXCJud2NcIjogXCJDbGFzc2ljYWwgTmV3YXJpXCIsXHJcbiAgICBcInN5Y1wiOiBcIkNsYXNzaWNhbCBTeXJpYWNcIixcclxuICAgIFwic3djXCI6IFwiQ29uZ28gU3dhaGlsaVwiLFxyXG4gICAgXCJjb3BcIjogXCJDb3B0aWNcIixcclxuICAgIFwia3dcIjogXCJDb3JuaXNoXCIsXHJcbiAgICBcImNvXCI6IFwiQ29yc2ljYW5cIixcclxuICAgIFwiY3JcIjogXCJDcmVlXCIsXHJcbiAgICBcIm11c1wiOiBcIkNyZWVrXCIsXHJcbiAgICBcImNyaFwiOiBcIkNyaW1lYW4gVHVya2lzaFwiLFxyXG4gICAgXCJoclwiOiBcIkNyb2F0aWFuXCIsXHJcbiAgICBcImNzXCI6IFwiQ3plY2hcIixcclxuICAgIFwiZGFrXCI6IFwiRGFrb3RhXCIsXHJcbiAgICBcImRhXCI6IFwiRGFuaXNoXCIsXHJcbiAgICBcImRlbFwiOiBcIkRlbGF3YXJlXCIsXHJcbiAgICBcIm5sXCI6IFwiRHV0Y2hcIixcclxuICAgIFwiZnJzXCI6IFwiRWFzdGVybiBGcmlzaWFuXCIsXHJcbiAgICBcImFyelwiOiBcIkVneXB0aWFuIEFyYWJpY1wiLFxyXG4gICAgXCJlblwiOiBcIkVuZ2xpc2hcIixcclxuICAgIFwiZW9cIjogXCJFc3BlcmFudG9cIixcclxuICAgIFwiZXRcIjogXCJFc3RvbmlhblwiLFxyXG4gICAgXCJwdF9QVFwiOiBcIkV1cm9wZWFuIFBvcnR1Z3Vlc2VcIixcclxuICAgIFwiZXNfRVNcIjogXCJFdXJvcGVhbiBTcGFuaXNoXCIsXHJcbiAgICBcImVlXCI6IFwiRXdlXCIsXHJcbiAgICBcImZhblwiOiBcIkZhbmdcIixcclxuICAgIFwiaGlmXCI6IFwiRmlqaSBIaW5kaVwiLFxyXG4gICAgXCJmalwiOiBcIkZpamlhblwiLFxyXG4gICAgXCJmaWxcIjogXCJGaWxpcGlub1wiLFxyXG4gICAgXCJmaVwiOiBcIkZpbm5pc2hcIixcclxuICAgIFwibmxfQkVcIjogXCJGbGVtaXNoXCIsXHJcbiAgICBcImZvblwiOiBcIkZvblwiLFxyXG4gICAgXCJmclwiOiBcIkZyZW5jaFwiLFxyXG4gICAgXCJnYWFcIjogXCJHYVwiLFxyXG4gICAgXCJnYW5cIjogXCJHYW4gQ2hpbmVzZVwiLFxyXG4gICAgXCJrYVwiOiBcIkdlb3JnaWFuXCIsXHJcbiAgICBcImRlXCI6IFwiR2VybWFuXCIsXHJcbiAgICBcImdvdFwiOiBcIkdvdGhpY1wiLFxyXG4gICAgXCJncmJcIjogXCJHcmVib1wiLFxyXG4gICAgXCJlbFwiOiBcIkdyZWVrXCIsXHJcbiAgICBcImduXCI6IFwiR3VhcmFuaVwiLFxyXG4gICAgXCJndVwiOiBcIkd1amFyYXRpXCIsXHJcbiAgICBcImd1elwiOiBcIkd1c2lpXCIsXHJcbiAgICBcImhhaVwiOiBcIkhhaWRhXCIsXHJcbiAgICBcImh0XCI6IFwiSGFpdGlhblwiLFxyXG4gICAgXCJoYWtcIjogXCJIYWtrYSBDaGluZXNlXCIsXHJcbiAgICBcImhhXCI6IFwiSGF1c2FcIixcclxuICAgIFwiaGF3XCI6IFwiSGF3YWlpYW5cIixcclxuICAgIFwiaGVcIjogXCJIZWJyZXdcIixcclxuICAgIFwiaHpcIjogXCJIZXJlcm9cIixcclxuICAgIFwiaGlcIjogXCJIaW5kaVwiLFxyXG4gICAgXCJoaXRcIjogXCJIaXR0aXRlXCIsXHJcbiAgICBcImhtblwiOiBcIkhtb25nXCIsXHJcbiAgICBcImh1XCI6IFwiSHVuZ2FyaWFuXCIsXHJcbiAgICBcImlzXCI6IFwiSWNlbGFuZGljXCIsXHJcbiAgICBcImlvXCI6IFwiSWRvXCIsXHJcbiAgICBcImlnXCI6IFwiSWdib1wiLFxyXG4gICAgXCJpdVwiOiBcIkludWt0aXR1dFwiLFxyXG4gICAgXCJpa1wiOiBcIkludXBpYXFcIixcclxuICAgIFwiZ2FcIjogXCJJcmlzaFwiLFxyXG4gICAgXCJpdFwiOiBcIkl0YWxpYW5cIixcclxuICAgIFwiamFtXCI6IFwiSmFtYWljYW4gQ3Jlb2xlIEVuZ2xpc2hcIixcclxuICAgIFwiamFcIjogXCJKYXBhbmVzZVwiLFxyXG4gICAgXCJqdlwiOiBcIkphdmFuZXNlXCIsXHJcbiAgICBcImthalwiOiBcIkpqdVwiLFxyXG4gICAgXCJkeW9cIjogXCJKb2xhLUZvbnlpXCIsXHJcbiAgICBcInhhbFwiOiBcIkthbG15a1wiLFxyXG4gICAgXCJrYW1cIjogXCJLYW1iYVwiLFxyXG4gICAgXCJrYmxcIjogXCJLYW5lbWJ1XCIsXHJcbiAgICBcImtuXCI6IFwiS2FubmFkYVwiLFxyXG4gICAgXCJrclwiOiBcIkthbnVyaVwiLFxyXG4gICAgXCJrYWFcIjogXCJLYXJhLUthbHBha1wiLFxyXG4gICAgXCJrcmNcIjogXCJLYXJhY2hheS1CYWxrYXJcIixcclxuICAgIFwia3JsXCI6IFwiS2FyZWxpYW5cIixcclxuICAgIFwia3NcIjogXCJLYXNobWlyaVwiLFxyXG4gICAgXCJjc2JcIjogXCJLYXNodWJpYW5cIixcclxuICAgIFwia2F3XCI6IFwiS2F3aVwiLFxyXG4gICAgXCJra1wiOiBcIkthemFraFwiLFxyXG4gICAgXCJrZW5cIjogXCJLZW55YW5nXCIsXHJcbiAgICBcImtoYVwiOiBcIktoYXNpXCIsXHJcbiAgICBcImttXCI6IFwiS2htZXJcIixcclxuICAgIFwia2hvXCI6IFwiS2hvdGFuZXNlXCIsXHJcbiAgICBcImtod1wiOiBcIktob3dhclwiLFxyXG4gICAgXCJraVwiOiBcIktpa3V5dVwiLFxyXG4gICAgXCJrbWJcIjogXCJLaW1idW5kdVwiLFxyXG4gICAgXCJrcmpcIjogXCJLaW5hcmF5LWFcIixcclxuICAgIFwicndcIjogXCJLaW55YXJ3YW5kYVwiLFxyXG4gICAgXCJraXVcIjogXCJLaXJtYW5qa2lcIixcclxuICAgIFwidGxoXCI6IFwiS2xpbmdvblwiLFxyXG4gICAgXCJia21cIjogXCJLb21cIixcclxuICAgIFwia3ZcIjogXCJLb21pXCIsXHJcbiAgICBcImtvaVwiOiBcIktvbWktUGVybXlha1wiLFxyXG4gICAgXCJrZ1wiOiBcIktvbmdvXCIsXHJcbiAgICBcImtva1wiOiBcIktvbmthbmlcIixcclxuICAgIFwia29cIjogXCJLb3JlYW5cIixcclxuICAgIFwia2ZvXCI6IFwiS29yb1wiLFxyXG4gICAgXCJrb3NcIjogXCJLb3NyYWVhblwiLFxyXG4gICAgXCJhdmtcIjogXCJLb3RhdmFcIixcclxuICAgIFwia2hxXCI6IFwiS295cmEgQ2hpaW5pXCIsXHJcbiAgICBcInNlc1wiOiBcIktveXJhYm9ybyBTZW5uaVwiLFxyXG4gICAgXCJrcGVcIjogXCJLcGVsbGVcIixcclxuICAgIFwia3JpXCI6IFwiS3Jpb1wiLFxyXG4gICAgXCJralwiOiBcIkt1YW55YW1hXCIsXHJcbiAgICBcImt1bVwiOiBcIkt1bXlrXCIsXHJcbiAgICBcImt1XCI6IFwiS3VyZGlzaFwiLFxyXG4gICAgXCJrcnVcIjogXCJLdXJ1a2hcIixcclxuICAgIFwia3V0XCI6IFwiS3V0ZW5haVwiLFxyXG4gICAgXCJubWdcIjogXCJLd2FzaW9cIixcclxuICAgIFwia3lcIjogXCJLeXJneXpcIixcclxuICAgIFwicXVjXCI6IFwiS1xcdTAyYmNpY2hlXFx1MDJiY1wiLFxyXG4gICAgXCJsYWRcIjogXCJMYWRpbm9cIixcclxuICAgIFwibGFoXCI6IFwiTGFobmRhXCIsXHJcbiAgICBcImxrdFwiOiBcIkxha290YVwiLFxyXG4gICAgXCJsYW1cIjogXCJMYW1iYVwiLFxyXG4gICAgXCJsYWdcIjogXCJMYW5naVwiLFxyXG4gICAgXCJsb1wiOiBcIkxhb1wiLFxyXG4gICAgXCJsdGdcIjogXCJMYXRnYWxpYW5cIixcclxuICAgIFwibGFcIjogXCJMYXRpblwiLFxyXG4gICAgXCJlc180MTlcIjogXCJMYXRpbiBBbWVyaWNhbiBTcGFuaXNoXCIsXHJcbiAgICBcImx2XCI6IFwiTGF0dmlhblwiLFxyXG4gICAgXCJsenpcIjogXCJMYXpcIixcclxuICAgIFwibGV6XCI6IFwiTGV6Z2hpYW5cIixcclxuICAgIFwibGlqXCI6IFwiTGlndXJpYW5cIixcclxuICAgIFwibGlcIjogXCJMaW1idXJnaXNoXCIsXHJcbiAgICBcImxuXCI6IFwiTGluZ2FsYVwiLFxyXG4gICAgXCJsZm5cIjogXCJMaW5ndWEgRnJhbmNhIE5vdmFcIixcclxuICAgIFwibHpoXCI6IFwiTGl0ZXJhcnkgQ2hpbmVzZVwiLFxyXG4gICAgXCJsdFwiOiBcIkxpdGh1YW5pYW5cIixcclxuICAgIFwibGl2XCI6IFwiTGl2b25pYW5cIixcclxuICAgIFwiamJvXCI6IFwiTG9qYmFuXCIsXHJcbiAgICBcImxtb1wiOiBcIkxvbWJhcmRcIixcclxuICAgIFwibmRzXCI6IFwiTG93IEdlcm1hblwiLFxyXG4gICAgXCJzbGlcIjogXCJMb3dlciBTaWxlc2lhblwiLFxyXG4gICAgXCJkc2JcIjogXCJMb3dlciBTb3JiaWFuXCIsXHJcbiAgICBcImxvelwiOiBcIkxvemlcIixcclxuICAgIFwibHVcIjogXCJMdWJhLUthdGFuZ2FcIixcclxuICAgIFwibHVhXCI6IFwiTHViYS1MdWx1YVwiLFxyXG4gICAgXCJsdWlcIjogXCJMdWlzZW5vXCIsXHJcbiAgICBcInNtalwiOiBcIkx1bGUgU2FtaVwiLFxyXG4gICAgXCJsdW5cIjogXCJMdW5kYVwiLFxyXG4gICAgXCJsdW9cIjogXCJMdW9cIixcclxuICAgIFwibGJcIjogXCJMdXhlbWJvdXJnaXNoXCIsXHJcbiAgICBcImx1eVwiOiBcIkx1eWlhXCIsXHJcbiAgICBcIm1kZVwiOiBcIk1hYmFcIixcclxuICAgIFwibWtcIjogXCJNYWNlZG9uaWFuXCIsXHJcbiAgICBcImptY1wiOiBcIk1hY2hhbWVcIixcclxuICAgIFwibWFkXCI6IFwiTWFkdXJlc2VcIixcclxuICAgIFwibWFmXCI6IFwiTWFmYVwiLFxyXG4gICAgXCJtYWdcIjogXCJNYWdhaGlcIixcclxuICAgIFwidm1mXCI6IFwiTWFpbi1GcmFuY29uaWFuXCIsXHJcbiAgICBcIm1haVwiOiBcIk1haXRoaWxpXCIsXHJcbiAgICBcIm1ha1wiOiBcIk1ha2FzYXJcIixcclxuICAgIFwibWdoXCI6IFwiTWFraHV3YS1NZWV0dG9cIixcclxuICAgIFwia2RlXCI6IFwiTWFrb25kZVwiLFxyXG4gICAgXCJtZ1wiOiBcIk1hbGFnYXN5XCIsXHJcbiAgICBcIm1zXCI6IFwiTWFsYXlcIixcclxuICAgIFwibWxcIjogXCJNYWxheWFsYW1cIixcclxuICAgIFwibXRcIjogXCJNYWx0ZXNlXCIsXHJcbiAgICBcIm1uY1wiOiBcIk1hbmNodVwiLFxyXG4gICAgXCJtZHJcIjogXCJNYW5kYXJpblwiLFxyXG4gICAgXCJtYW5cIjogXCJNYW5kaW5nb1wiLFxyXG4gICAgXCJtbmlcIjogXCJNYW5pcHVyaVwiLFxyXG4gICAgXCJndlwiOiBcIk1hbnhcIixcclxuICAgIFwibWlcIjogXCJNYW9yaVwiLFxyXG4gICAgXCJhcm5cIjogXCJNYXB1Y2hlXCIsXHJcbiAgICBcIm1yXCI6IFwiTWFyYXRoaVwiLFxyXG4gICAgXCJjaG1cIjogXCJNYXJpXCIsXHJcbiAgICBcIm1oXCI6IFwiTWFyc2hhbGxlc2VcIixcclxuICAgIFwibXdyXCI6IFwiTWFyd2FyaVwiLFxyXG4gICAgXCJtYXNcIjogXCJNYXNhaVwiLFxyXG4gICAgXCJtem5cIjogXCJNYXphbmRlcmFuaVwiLFxyXG4gICAgXCJieXZcIjogXCJNZWR1bWJhXCIsXHJcbiAgICBcIm1lblwiOiBcIk1lbmRlXCIsXHJcbiAgICBcIm13dlwiOiBcIk1lbnRhd2FpXCIsXHJcbiAgICBcIm1lclwiOiBcIk1lcnVcIixcclxuICAgIFwibWdvXCI6IFwiTWV0YVxcdTAyYmNcIixcclxuICAgIFwiZXNfTVhcIjogXCJNZXhpY2FuIFNwYW5pc2hcIixcclxuICAgIFwibWljXCI6IFwiTWljbWFjXCIsXHJcbiAgICBcImR1bVwiOiBcIk1pZGRsZSBEdXRjaFwiLFxyXG4gICAgXCJlbm1cIjogXCJNaWRkbGUgRW5nbGlzaFwiLFxyXG4gICAgXCJmcm1cIjogXCJNaWRkbGUgRnJlbmNoXCIsXHJcbiAgICBcImdtaFwiOiBcIk1pZGRsZSBIaWdoIEdlcm1hblwiLFxyXG4gICAgXCJtZ2FcIjogXCJNaWRkbGUgSXJpc2hcIixcclxuICAgIFwibmFuXCI6IFwiTWluIE5hbiBDaGluZXNlXCIsXHJcbiAgICBcIm1pblwiOiBcIk1pbmFuZ2thYmF1XCIsXHJcbiAgICBcInhtZlwiOiBcIk1pbmdyZWxpYW5cIixcclxuICAgIFwibXdsXCI6IFwiTWlyYW5kZXNlXCIsXHJcbiAgICBcImx1c1wiOiBcIk1pem9cIixcclxuICAgIFwiYXJfMDAxXCI6IFwiTW9kZXJuIFN0YW5kYXJkIEFyYWJpY1wiLFxyXG4gICAgXCJtb2hcIjogXCJNb2hhd2tcIixcclxuICAgIFwibWRmXCI6IFwiTW9rc2hhXCIsXHJcbiAgICBcInJvX01EXCI6IFwiTW9sZGF2aWFuXCIsXHJcbiAgICBcImxvbFwiOiBcIk1vbmdvXCIsXHJcbiAgICBcIm1uXCI6IFwiTW9uZ29saWFuXCIsXHJcbiAgICBcIm1mZVwiOiBcIk1vcmlzeWVuXCIsXHJcbiAgICBcImFyeVwiOiBcIk1vcm9jY2FuIEFyYWJpY1wiLFxyXG4gICAgXCJtb3NcIjogXCJNb3NzaVwiLFxyXG4gICAgXCJtdWxcIjogXCJNdWx0aXBsZSBMYW5ndWFnZXNcIixcclxuICAgIFwibXVhXCI6IFwiTXVuZGFuZ1wiLFxyXG4gICAgXCJ0dHRcIjogXCJNdXNsaW0gVGF0XCIsXHJcbiAgICBcIm15ZVwiOiBcIk15ZW5lXCIsXHJcbiAgICBcIm5hcVwiOiBcIk5hbWFcIixcclxuICAgIFwibmFcIjogXCJOYXVydVwiLFxyXG4gICAgXCJudlwiOiBcIk5hdmFqb1wiLFxyXG4gICAgXCJuZ1wiOiBcIk5kb25nYVwiLFxyXG4gICAgXCJuYXBcIjogXCJOZWFwb2xpdGFuXCIsXHJcbiAgICBcIm5lXCI6IFwiTmVwYWxpXCIsXHJcbiAgICBcIm5ld1wiOiBcIk5ld2FyaVwiLFxyXG4gICAgXCJzYmFcIjogXCJOZ2FtYmF5XCIsXHJcbiAgICBcIm5uaFwiOiBcIk5naWVtYm9vblwiLFxyXG4gICAgXCJqZ29cIjogXCJOZ29tYmFcIixcclxuICAgIFwieXJsXCI6IFwiTmhlZW5nYXR1XCIsXHJcbiAgICBcIm5pYVwiOiBcIk5pYXNcIixcclxuICAgIFwibml1XCI6IFwiTml1ZWFuXCIsXHJcbiAgICBcInp4eFwiOiBcIk5vIGxpbmd1aXN0aWMgY29udGVudFwiLFxyXG4gICAgXCJub2dcIjogXCJOb2dhaVwiLFxyXG4gICAgXCJuZFwiOiBcIk5vcnRoIE5kZWJlbGVcIixcclxuICAgIFwiZnJyXCI6IFwiTm9ydGhlcm4gRnJpc2lhblwiLFxyXG4gICAgXCJzZVwiOiBcIk5vcnRoZXJuIFNhbWlcIixcclxuICAgIFwibnNvXCI6IFwiTm9ydGhlcm4gU290aG9cIixcclxuICAgIFwibm9cIjogXCJOb3J3ZWdpYW5cIixcclxuICAgIFwibmJcIjogXCJOb3J3ZWdpYW4gQm9rbVxcdTAwZTVsXCIsXHJcbiAgICBcIm5uXCI6IFwiTm9yd2VnaWFuIE55bm9yc2tcIixcclxuICAgIFwibm92XCI6IFwiTm92aWFsXCIsXHJcbiAgICBcIm51c1wiOiBcIk51ZXJcIixcclxuICAgIFwibnltXCI6IFwiTnlhbXdlemlcIixcclxuICAgIFwibnlcIjogXCJOeWFuamFcIixcclxuICAgIFwibnluXCI6IFwiTnlhbmtvbGVcIixcclxuICAgIFwidG9nXCI6IFwiTnlhc2EgVG9uZ2FcIixcclxuICAgIFwibnlvXCI6IFwiTnlvcm9cIixcclxuICAgIFwibnppXCI6IFwiTnppbWFcIixcclxuICAgIFwibnFvXCI6IFwiTlxcdTAyYmNLb1wiLFxyXG4gICAgXCJvY1wiOiBcIk9jY2l0YW5cIixcclxuICAgIFwib2pcIjogXCJPamlid2FcIixcclxuICAgIFwiYW5nXCI6IFwiT2xkIEVuZ2xpc2hcIixcclxuICAgIFwiZnJvXCI6IFwiT2xkIEZyZW5jaFwiLFxyXG4gICAgXCJnb2hcIjogXCJPbGQgSGlnaCBHZXJtYW5cIixcclxuICAgIFwic2dhXCI6IFwiT2xkIElyaXNoXCIsXHJcbiAgICBcIm5vblwiOiBcIk9sZCBOb3JzZVwiLFxyXG4gICAgXCJwZW9cIjogXCJPbGQgUGVyc2lhblwiLFxyXG4gICAgXCJwcm9cIjogXCJPbGQgUHJvdmVuXFx1MDBlN2FsXCIsXHJcbiAgICBcIm9yXCI6IFwiT3JpeWFcIixcclxuICAgIFwib21cIjogXCJPcm9tb1wiLFxyXG4gICAgXCJvc2FcIjogXCJPc2FnZVwiLFxyXG4gICAgXCJvc1wiOiBcIk9zc2V0aWNcIixcclxuICAgIFwib3RhXCI6IFwiT3R0b21hbiBUdXJraXNoXCIsXHJcbiAgICBcInBhbFwiOiBcIlBhaGxhdmlcIixcclxuICAgIFwicGZsXCI6IFwiUGFsYXRpbmUgR2VybWFuXCIsXHJcbiAgICBcInBhdVwiOiBcIlBhbGF1YW5cIixcclxuICAgIFwicGlcIjogXCJQYWxpXCIsXHJcbiAgICBcInBkY1wiOiBcIlBlbm5zeWx2YW5pYSBHZXJtYW5cIixcclxuICAgIFwiZmFcIjogXCJQZXJzaWFuXCIsXHJcbiAgICBcInBoblwiOiBcIlBob2VuaWNpYW5cIixcclxuICAgIFwicGNkXCI6IFwiUGljYXJkXCIsXHJcbiAgICBcInBtc1wiOiBcIlBpZWRtb250ZXNlXCIsXHJcbiAgICBcInBkdFwiOiBcIlBsYXV0ZGlldHNjaFwiLFxyXG4gICAgXCJwb25cIjogXCJQb2hucGVpYW5cIixcclxuICAgIFwicGxcIjogXCJQb2xpc2hcIixcclxuICAgIFwicG50XCI6IFwiUG9udGljXCIsXHJcbiAgICBcInB0XCI6IFwiUG9ydHVndWVzZVwiLFxyXG4gICAgXCJwcmdcIjogXCJQcnVzc2lhblwiLFxyXG4gICAgXCJwYVwiOiBcIlB1bmphYmlcIixcclxuICAgIFwicXVcIjogXCJRdWVjaHVhXCIsXHJcbiAgICBcInJvXCI6IFwiUm9tYW5pYW5cIixcclxuICAgIFwicm1cIjogXCJSb21hbnNoXCIsXHJcbiAgICBcInJvbVwiOiBcIlJvbWFueVwiLFxyXG4gICAgXCJyb290XCI6IFwiUm9vdFwiLFxyXG4gICAgXCJydVwiOiBcIlJ1c3NpYW5cIixcclxuICAgIFwicndrXCI6IFwiUndhXCIsXHJcbiAgICBcInNhaFwiOiBcIlNha2hhXCIsXHJcbiAgICBcInNhbVwiOiBcIlNhbWFyaXRhbiBBcmFtYWljXCIsXHJcbiAgICBcInNtXCI6IFwiU2Ftb2FuXCIsXHJcbiAgICBcInNjb1wiOiBcIlNjb3RzXCIsXHJcbiAgICBcImdkXCI6IFwiU2NvdHRpc2ggR2FlbGljXCIsXHJcbiAgICBcInNseVwiOiBcIlNlbGF5YXJcIixcclxuICAgIFwic2VsXCI6IFwiU2Vsa3VwXCIsXHJcbiAgICBcInNlaFwiOiBcIlNlbmFcIixcclxuICAgIFwic2VlXCI6IFwiU2VuZWNhXCIsXHJcbiAgICBcInNyXCI6IFwiU2VyYmlhblwiLFxyXG4gICAgXCJzaFwiOiBcIlNlcmJvLUNyb2F0aWFuXCIsXHJcbiAgICBcInNyclwiOiBcIlNlcmVyXCIsXHJcbiAgICBcInNlaVwiOiBcIlNlcmlcIixcclxuICAgIFwia3NiXCI6IFwiU2hhbWJhbGFcIixcclxuICAgIFwic2huXCI6IFwiU2hhblwiLFxyXG4gICAgXCJzblwiOiBcIlNob25hXCIsXHJcbiAgICBcImlpXCI6IFwiU2ljaHVhbiBZaVwiLFxyXG4gICAgXCJzY25cIjogXCJTaWNpbGlhblwiLFxyXG4gICAgXCJzaWRcIjogXCJTaWRhbW9cIixcclxuICAgIFwiYmxhXCI6IFwiU2lrc2lrYVwiLFxyXG4gICAgXCJzemxcIjogXCJTaWxlc2lhblwiLFxyXG4gICAgXCJ6aF9IYW5zXCI6IFwiU2ltcGxpZmllZCBDaGluZXNlXCIsXHJcbiAgICBcInNkXCI6IFwiU2luZGhpXCIsXHJcbiAgICBcInNpXCI6IFwiU2luaGFsYVwiLFxyXG4gICAgXCJzbXNcIjogXCJTa29sdCBTYW1pXCIsXHJcbiAgICBcImRlblwiOiBcIlNsYXZlXCIsXHJcbiAgICBcInNrXCI6IFwiU2xvdmFrXCIsXHJcbiAgICBcInNsXCI6IFwiU2xvdmVuaWFuXCIsXHJcbiAgICBcInhvZ1wiOiBcIlNvZ2FcIixcclxuICAgIFwic29nXCI6IFwiU29nZGllblwiLFxyXG4gICAgXCJzb1wiOiBcIlNvbWFsaVwiLFxyXG4gICAgXCJzbmtcIjogXCJTb25pbmtlXCIsXHJcbiAgICBcImNrYlwiOiBcIlNvcmFuaSBLdXJkaXNoXCIsXHJcbiAgICBcImF6YlwiOiBcIlNvdXRoIEF6ZXJiYWlqYW5pXCIsXHJcbiAgICBcIm5yXCI6IFwiU291dGggTmRlYmVsZVwiLFxyXG4gICAgXCJhbHRcIjogXCJTb3V0aGVybiBBbHRhaVwiLFxyXG4gICAgXCJzbWFcIjogXCJTb3V0aGVybiBTYW1pXCIsXHJcbiAgICBcInN0XCI6IFwiU291dGhlcm4gU290aG9cIixcclxuICAgIFwiZXNcIjogXCJTcGFuaXNoXCIsXHJcbiAgICBcInNyblwiOiBcIlNyYW5hbiBUb25nb1wiLFxyXG4gICAgXCJ6Z2hcIjogXCJTdGFuZGFyZCBNb3JvY2NhbiBUYW1hemlnaHRcIixcclxuICAgIFwic3VrXCI6IFwiU3VrdW1hXCIsXHJcbiAgICBcInN1eFwiOiBcIlN1bWVyaWFuXCIsXHJcbiAgICBcInN1XCI6IFwiU3VuZGFuZXNlXCIsXHJcbiAgICBcInN1c1wiOiBcIlN1c3VcIixcclxuICAgIFwic3dcIjogXCJTd2FoaWxpXCIsXHJcbiAgICBcInNzXCI6IFwiU3dhdGlcIixcclxuICAgIFwic3ZcIjogXCJTd2VkaXNoXCIsXHJcbiAgICBcImZyX0NIXCI6IFwiU3dpc3MgRnJlbmNoXCIsXHJcbiAgICBcImdzd1wiOiBcIlN3aXNzIEdlcm1hblwiLFxyXG4gICAgXCJkZV9DSFwiOiBcIlN3aXNzIEhpZ2ggR2VybWFuXCIsXHJcbiAgICBcInN5clwiOiBcIlN5cmlhY1wiLFxyXG4gICAgXCJzaGlcIjogXCJUYWNoZWxoaXRcIixcclxuICAgIFwidGxcIjogXCJUYWdhbG9nXCIsXHJcbiAgICBcInR5XCI6IFwiVGFoaXRpYW5cIixcclxuICAgIFwiZGF2XCI6IFwiVGFpdGFcIixcclxuICAgIFwidGdcIjogXCJUYWppa1wiLFxyXG4gICAgXCJ0bHlcIjogXCJUYWx5c2hcIixcclxuICAgIFwidG1oXCI6IFwiVGFtYXNoZWtcIixcclxuICAgIFwidGFcIjogXCJUYW1pbFwiLFxyXG4gICAgXCJ0cnZcIjogXCJUYXJva29cIixcclxuICAgIFwidHdxXCI6IFwiVGFzYXdhcVwiLFxyXG4gICAgXCJ0dFwiOiBcIlRhdGFyXCIsXHJcbiAgICBcInRlXCI6IFwiVGVsdWd1XCIsXHJcbiAgICBcInRlclwiOiBcIlRlcmVub1wiLFxyXG4gICAgXCJ0ZW9cIjogXCJUZXNvXCIsXHJcbiAgICBcInRldFwiOiBcIlRldHVtXCIsXHJcbiAgICBcInRoXCI6IFwiVGhhaVwiLFxyXG4gICAgXCJib1wiOiBcIlRpYmV0YW5cIixcclxuICAgIFwidGlnXCI6IFwiVGlncmVcIixcclxuICAgIFwidGlcIjogXCJUaWdyaW55YVwiLFxyXG4gICAgXCJ0ZW1cIjogXCJUaW1uZVwiLFxyXG4gICAgXCJ0aXZcIjogXCJUaXZcIixcclxuICAgIFwidGxpXCI6IFwiVGxpbmdpdFwiLFxyXG4gICAgXCJ0cGlcIjogXCJUb2sgUGlzaW5cIixcclxuICAgIFwidGtsXCI6IFwiVG9rZWxhdVwiLFxyXG4gICAgXCJ0b1wiOiBcIlRvbmdhblwiLFxyXG4gICAgXCJmaXRcIjogXCJUb3JuZWRhbGVuIEZpbm5pc2hcIixcclxuICAgIFwiemhfSGFudFwiOiBcIlRyYWRpdGlvbmFsIENoaW5lc2VcIixcclxuICAgIFwidGtyXCI6IFwiVHNha2h1clwiLFxyXG4gICAgXCJ0c2RcIjogXCJUc2Frb25pYW5cIixcclxuICAgIFwidHNpXCI6IFwiVHNpbXNoaWFuXCIsXHJcbiAgICBcInRzXCI6IFwiVHNvbmdhXCIsXHJcbiAgICBcInRuXCI6IFwiVHN3YW5hXCIsXHJcbiAgICBcInRjeVwiOiBcIlR1bHVcIixcclxuICAgIFwidHVtXCI6IFwiVHVtYnVrYVwiLFxyXG4gICAgXCJhZWJcIjogXCJUdW5pc2lhbiBBcmFiaWNcIixcclxuICAgIFwidHJcIjogXCJUdXJraXNoXCIsXHJcbiAgICBcInRrXCI6IFwiVHVya21lblwiLFxyXG4gICAgXCJ0cnVcIjogXCJUdXJveW9cIixcclxuICAgIFwidHZsXCI6IFwiVHV2YWx1XCIsXHJcbiAgICBcInR5dlwiOiBcIlR1dmluaWFuXCIsXHJcbiAgICBcInR3XCI6IFwiVHdpXCIsXHJcbiAgICBcImtjZ1wiOiBcIlR5YXBcIixcclxuICAgIFwidWRtXCI6IFwiVWRtdXJ0XCIsXHJcbiAgICBcInVnYVwiOiBcIlVnYXJpdGljXCIsXHJcbiAgICBcInVrXCI6IFwiVWtyYWluaWFuXCIsXHJcbiAgICBcInVtYlwiOiBcIlVtYnVuZHVcIixcclxuICAgIFwidW5kXCI6IFwiVW5rbm93biBMYW5ndWFnZVwiLFxyXG4gICAgXCJoc2JcIjogXCJVcHBlciBTb3JiaWFuXCIsXHJcbiAgICBcInVyXCI6IFwiVXJkdVwiLFxyXG4gICAgXCJ1Z1wiOiBcIlV5Z2h1clwiLFxyXG4gICAgXCJ1elwiOiBcIlV6YmVrXCIsXHJcbiAgICBcInZhaVwiOiBcIlZhaVwiLFxyXG4gICAgXCJ2ZVwiOiBcIlZlbmRhXCIsXHJcbiAgICBcInZlY1wiOiBcIlZlbmV0aWFuXCIsXHJcbiAgICBcInZlcFwiOiBcIlZlcHNcIixcclxuICAgIFwidmlcIjogXCJWaWV0bmFtZXNlXCIsXHJcbiAgICBcInZvXCI6IFwiVm9sYXBcXHUwMGZja1wiLFxyXG4gICAgXCJ2cm9cIjogXCJWXFx1MDBmNXJvXCIsXHJcbiAgICBcInZvdFwiOiBcIlZvdGljXCIsXHJcbiAgICBcInZ1blwiOiBcIlZ1bmpvXCIsXHJcbiAgICBcIndhXCI6IFwiV2FsbG9vblwiLFxyXG4gICAgXCJ3YWVcIjogXCJXYWxzZXJcIixcclxuICAgIFwid2FyXCI6IFwiV2FyYXlcIixcclxuICAgIFwid2FzXCI6IFwiV2FzaG9cIixcclxuICAgIFwiZ3VjXCI6IFwiV2F5dXVcIixcclxuICAgIFwiY3lcIjogXCJXZWxzaFwiLFxyXG4gICAgXCJ2bHNcIjogXCJXZXN0IEZsZW1pc2hcIixcclxuICAgIFwiZnlcIjogXCJXZXN0ZXJuIEZyaXNpYW5cIixcclxuICAgIFwibXJqXCI6IFwiV2VzdGVybiBNYXJpXCIsXHJcbiAgICBcIndhbFwiOiBcIldvbGF5dHRhXCIsXHJcbiAgICBcIndvXCI6IFwiV29sb2ZcIixcclxuICAgIFwid3V1XCI6IFwiV3UgQ2hpbmVzZVwiLFxyXG4gICAgXCJ4aFwiOiBcIlhob3NhXCIsXHJcbiAgICBcImhzblwiOiBcIlhpYW5nIENoaW5lc2VcIixcclxuICAgIFwieWF2XCI6IFwiWWFuZ2JlblwiLFxyXG4gICAgXCJ5YW9cIjogXCJZYW9cIixcclxuICAgIFwieWFwXCI6IFwiWWFwZXNlXCIsXHJcbiAgICBcInliYlwiOiBcIlllbWJhXCIsXHJcbiAgICBcInlpXCI6IFwiWWlkZGlzaFwiLFxyXG4gICAgXCJ5b1wiOiBcIllvcnViYVwiLFxyXG4gICAgXCJ6YXBcIjogXCJaYXBvdGVjXCIsXHJcbiAgICBcImRqZVwiOiBcIlphcm1hXCIsXHJcbiAgICBcInp6YVwiOiBcIlphemFcIixcclxuICAgIFwiemVhXCI6IFwiWmVlbGFuZGljXCIsXHJcbiAgICBcInplblwiOiBcIlplbmFnYVwiLFxyXG4gICAgXCJ6YVwiOiBcIlpodWFuZ1wiLFxyXG4gICAgXCJnYnpcIjogXCJab3JvYXN0cmlhbiBEYXJpXCIsXHJcbiAgICBcInp1XCI6IFwiWnVsdVwiLFxyXG4gICAgXCJ6dW5cIjogXCJadW5pXCJcclxufVxyXG5cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvY2EvY2EuZGF0YS5qcyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IEp1YW5DcnV6IG9uIDQvMS8yMDE4LlxyXG4gKi9cclxuXHJcbiQoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIHdpbmRvdy5Db250ZW50QXJlbmEgPSB3aW5kb3cuQ29udGVudEFyZW5hIHx8IHt9O1xyXG5cclxuICAgIENvbnRlbnRBcmVuYS5Nb2RlbCA9IENvbnRlbnRBcmVuYS5Nb2RlbCB8fCB7fTtcclxuXHJcbiAgICBDb250ZW50QXJlbmEuTW9kZWwuUmlnaHRQYWNrYWdlID0gZnVuY3Rpb24oKXtcclxuICAgICAgICB0aGlzLmlkID0gbnVsbDtcclxuICAgICAgICB0aGlzLm5hbWUgPSBudWxsO1xyXG4gICAgICAgIHRoaXMucmlnaHRzID0ge307XHJcbiAgICB9O1xyXG5cclxuICAgIENvbnRlbnRBcmVuYS5Nb2RlbC5EaXN0cmlidXRpb25QYWNrYWdlID0gZnVuY3Rpb24oKXtcclxuICAgICAgICB0aGlzLmlkID0gbnVsbDtcclxuICAgICAgICB0aGlzLm5hbWUgPSBudWxsO1xyXG4gICAgICAgIHRoaXMucHJvZHVjdGlvbiA9IHt9O1xyXG4gICAgICAgIHRoaXMudGVjaG5pY2FsID0ge307XHJcbiAgICB9O1xyXG5cclxuICAgIENvbnRlbnRBcmVuYS5Nb2RlbC5SaWdodCA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdGhpcy5pZCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gbnVsbDtcclxuICAgICAgICB0aGlzLnJpZ2h0SXRlbXMgPSB7fTtcclxuICAgIH07XHJcblxyXG4gICAgQ29udGVudEFyZW5hLk1vZGVsLlJpZ2h0SXRlbSA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdGhpcy5pZCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gbnVsbDtcclxuICAgICAgICB0aGlzLmlucHV0cyA9IFtdO1xyXG4gICAgfTtcclxuXHJcbiAgICBDb250ZW50QXJlbmEuTW9kZWwuU2VsZWN0ZWRSaWdodCA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdGhpcy5yaWdodCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5yaWdodEl0ZW0gPSBudWxsO1xyXG4gICAgICAgIHRoaXMuZGlzdHJpYnV0aW9uUGFja2FnZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5ncm91cCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5pbnB1dHMgPSBbXTtcclxuICAgIH07XHJcblxyXG4gICAgQ29udGVudEFyZW5hLk1vZGVsLlNhbGVzUGFja2FnZSA9IGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgICAgIHRoaXMuc2FsZXNNZXRob2QgPSAgbnVsbDtcclxuICAgICAgICB0aGlzLmZlZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5jdXJyZW5jeSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5pZCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gbnVsbDtcclxuICAgICAgICB0aGlzLnRlcnJpdG9yaWVzID0gbnVsbDtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkVGVycml0b3JpZXMgPSBbXTtcclxuICAgICAgICB0aGlzLmV4Y2x1ZGVkVGVycml0b3JpZXMgPSBbXTtcclxuICAgICAgICB0aGlzLnRlcnJpdG9yeUJpZHMgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnNlbGxBc1BhY2thZ2UgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgdGhpcy52YWxpZGF0ZSA9ICgpID0+IHtcclxuXHJcbiAgICAgICAgICAgIHZhciBkZXNjcmlwdGlvbiA9IFwiU2FsZXMgUGFja2FnZSBcIiArIHRoaXMuaWQgKyBcIjogXCIsXHJcbiAgICAgICAgICAgICAgICBoYXNFcnJvcnMgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIGlmICggISB0aGlzLmN1cnJlbmN5ICkge1xyXG4gICAgICAgICAgICAgICAgaGFzRXJyb3JzID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uICs9IFwiQ3VycmVuY3kgY2FuJ3QgYmUgZW1wdHkuIFwiO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoICEgdGhpcy5mZWUgKSB7XHJcbiAgICAgICAgICAgICAgICBoYXNFcnJvcnMgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb24gKz0gXCJGZWUgY2FuJ3QgYmUgZW1wdHkuIFwiO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoICEgdGhpcy50ZXJyaXRvcmllcyApIHtcclxuICAgICAgICAgICAgICAgIGhhc0Vycm9ycyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbiArPSBcIlRlcnJpdG9yaWVzIGNhbid0IGJlIGVtcHR5LiBcIjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCAhIHRoaXMuc2FsZXNNZXRob2QgKSB7XHJcbiAgICAgICAgICAgICAgICBoYXNFcnJvcnMgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb24gKz0gXCJTYWxlcyBtZXRob2QgY2FuJ3QgYmUgZW1wdHkuIFwiO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgaGFzRXJyb3JzOiBoYXNFcnJvcnMsXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbiA6IGRlc2NyaXB0aW9uXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICBDb250ZW50QXJlbmEuTW9kZWwuQ29udGVudCA9IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICB0aGlzLnNwb3J0ID0ge307XHJcbiAgICAgICAgdGhpcy5zcG9ydHMgPSBbXTtcclxuICAgICAgICB0aGlzLnRvdXJuYW1lbnQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuY2F0ZWdvcnkgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuZXZlbnRUeXBlID0gXCJkYXRhYmFzZVwiO1xyXG4gICAgICAgIHRoaXMuc2FsZXNQYWNrYWdlcyA9IHt9O1xyXG4gICAgICAgIHRoaXMuaW5zdGFsbG1lbnRzID0ge307XHJcblxyXG4gICAgICAgIHRoaXMuZ2V0VGl0bGUgPSAoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzKTtcclxuXHJcbiAgICAgICAgICAgIHZhciB0aXRsZSA9IFwiXCI7XHJcblxyXG4gICAgICAgICAgICBpZiAoIHRoaXMuc3BvcnRzLmxlbmd0aCA+IDAgKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3BvcnRzLmZvckVhY2goZnVuY3Rpb24gKHNwb3J0LCBpbmRleCwgYXJyYXkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZSArPSBzcG9ydC52YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIChpbmRleCsxKSAhPSBhcnJheS5sZW5ndGggKSB0aXRsZSArPSBcIiwgXCJcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoIHRoaXMuZXZlbnRUeXBlID09PSBcImN1c3RvbVwiICl7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoIHRoaXMuZXZlbnRUeXBlID09PSBcImRhdGFiYXNlXCIgKXtcclxuICAgICAgICAgICAgICAgIGlmICggdGhpcy5zcG9ydCAhPT0gbnVsbCApIHRpdGxlICs9IHRoaXMuc3BvcnQudmFsdWU7XHJcbiAgICAgICAgICAgICAgICBpZiAoIHRoaXMuY2F0ZWdvcnkgIT09IG51bGwgKSB0aXRsZSArPSBcIiAtIFwiICsgdGhpcy5jYXRlZ29yeS52YWx1ZTtcclxuICAgICAgICAgICAgICAgIGlmICggdGhpcy50b3VybmFtZW50ICE9PSBudWxsICkgdGl0bGUgKz0gXCIgLSBcIiArIHRoaXMudG91cm5hbWVudC52YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCB0aGlzLnNlYXNvbnMgJiYgdGhpcy5zZWFzb25zLmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICAgICAgdGl0bGUgKz0gXCIgXCIgKyB0aGlzLnNlYXNvbnMubWFwKCAoIHNlYXNvbiApID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdmFsdWVzID0gc2Vhc29uLnZhbHVlLnNwbGl0KFwiIFwiKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWVzW3ZhbHVlcy5sZW5ndGggLSAxXVxyXG4gICAgICAgICAgICAgICAgfSkuam9pbihcIiAtIFwiKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRpdGxlO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHdhdGNoKHRoaXMsIFwic3BvcnRzXCIsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVXBkYXRpbmcgc3BvcnRzXCIsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHdhdGNoKHRoaXMsIFwiZXZlbnRUeXBlXCIsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVXBkYXRpbmcgZXZlbnRUeXBlXCIsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfTtcclxuXHJcbn0pO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9jYS9jYS5tb2RlbHMuanMiLCIvKipcclxuICogQ3JlYXRlZCBieSBKdWFuQ3J1eiBvbiA0LzEvMjAxOC5cclxuICovXHJcblxyXG53aW5kb3cuQ29udGVudEFyZW5hID0gd2luZG93LkNvbnRlbnRBcmVuYSB8fCB7fTtcclxuXHJcbkNvbnRlbnRBcmVuYS5VdGlscyA9IHtcclxuICAgIGFkZFJlZ2lvbkJlaGF2aW91cihzZWxlY3Rvcikge1xyXG5cclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IGhvc3R1cmwgKyBcInYxL2ZlZWQvdGVzdFwiLFxyXG4gICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuXHJcbiAgICAgICAgICAgICAgICByZXNwb25zZS5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChhLm5hbWUgPiBiLm5hbWUpID8gMSA6ICgoYi5uYW1lID4gYS5uYW1lKSA/IC0xIDogMCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAkKHNlbGVjdG9yKS5odG1sKFwiXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgICAgICogQHBhcmFtIHt7IGNvdW50cnlfY29kZTogc3RyaW5nIH19IHZcclxuICAgICAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICAgICAgJC5lYWNoKHJlc3BvbnNlLCBmdW5jdGlvbiAoaywgdikge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgb3B0aW9uID0gJzxvcHRpb24gdmFsdWU9JyArIHYuY291bnRyeV9jb2RlICsgJz4nICsgdi5uYW1lICsgJzwvb3B0aW9uPic7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQoc2VsZWN0b3IpLmVhY2goZnVuY3Rpb24gKGtleSwgc2VsZWN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoc2VsZWN0KS5hcHBlbmQob3B0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAkKHNlbGVjdG9yKS5jaG9zZW4oe3dpZHRoOiBcIjUwJVwifSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgYWRkTGFuZ3VhZ2VCZWhhdmlvdXIoIHNlbGVjdG9yICl7XHJcblxyXG4gICAgICAgICQoc2VsZWN0b3IpLmVhY2goZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgdmFyIF90aGlzID0gJCh0aGlzKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChfdGhpcy5kYXRhKFwiY2hvc2VuXCIpICE9PSB1bmRlZmluZWQgKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAkLmVhY2goQ29udGVudEFyZW5hLkxhbmd1YWdlcy5TaG9ydCwgZnVuY3Rpb24oaywgdil7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIG9wdGlvbiA9ICc8b3B0aW9uIHZhbHVlPScgKyBrICsgJz4nICsgdiArICc8L29wdGlvbj4nO1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuYXBwZW5kKG9wdGlvbik7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgX3RoaXMuY2hvc2VuKCk7XHJcblxyXG4gICAgICAgICAgICBfdGhpcy5jaG9zZW4oKS5jaGFuZ2UoZnVuY3Rpb24gKGUsIG9wdCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9wdC5zZWxlY3RlZCAmJiBvcHQuc2VsZWN0ZWQgPT09IFwiYWxsXCIpe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5odG1sKFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICQuZWFjaChDb250ZW50QXJlbmEuTGFuZ3VhZ2VzLkxvbmcsIGZ1bmN0aW9uKGssIHYpe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9wdGlvbiA9ICc8b3B0aW9uIHZhbHVlPScgKyBrICsgJz4nICsgdiArICc8L29wdGlvbj4nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5hcHBlbmQob3B0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMudHJpZ2dlcihcImNob3Nlbjp1cGRhdGVkXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBpc0FQSUF2YWlsYWJsZSgpIHtcclxuICAgICAgICAvLyBDaGVjayBmb3IgdGhlIHZhcmlvdXMgRmlsZSBBUEkgc3VwcG9ydC5cclxuICAgICAgICBpZiAod2luZG93LkZpbGUgJiYgd2luZG93LkZpbGVSZWFkZXIgJiYgd2luZG93LkZpbGVMaXN0ICYmIHdpbmRvdy5CbG9iKSB7XHJcbiAgICAgICAgICAgIC8vIEdyZWF0IHN1Y2Nlc3MhIEFsbCB0aGUgRmlsZSBBUElzIGFyZSBzdXBwb3J0ZWQuXHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIHNvdXJjZTogRmlsZSBBUEkgYXZhaWxhYmlsaXR5IC0gaHR0cDovL2Nhbml1c2UuY29tLyNmZWF0PWZpbGVhcGlcclxuICAgICAgICAgICAgLy8gc291cmNlOiA8b3V0cHV0PiBhdmFpbGFiaWxpdHkgLSBodHRwOi8vaHRtbDVkb2N0b3IuY29tL3RoZS1vdXRwdXQtZWxlbWVudC9cclxuICAgICAgICAgICAgZG9jdW1lbnQud3JpdGVsbignVGhlIEhUTUw1IEFQSXMgdXNlZCBpbiB0aGlzIGZvcm0gYXJlIG9ubHkgYXZhaWxhYmxlIGluIHRoZSBmb2xsb3dpbmcgYnJvd3NlcnM6PGJyIC8+Jyk7XHJcbiAgICAgICAgICAgIC8vIDYuMCBGaWxlIEFQSSAmIDEzLjAgPG91dHB1dD5cclxuICAgICAgICAgICAgZG9jdW1lbnQud3JpdGVsbignIC0gR29vZ2xlIENocm9tZTogMTMuMCBvciBsYXRlcjxiciAvPicpO1xyXG4gICAgICAgICAgICAvLyAzLjYgRmlsZSBBUEkgJiA2LjAgPG91dHB1dD5cclxuICAgICAgICAgICAgZG9jdW1lbnQud3JpdGVsbignIC0gTW96aWxsYSBGaXJlZm94OiA2LjAgb3IgbGF0ZXI8YnIgLz4nKTtcclxuICAgICAgICAgICAgLy8gMTAuMCBGaWxlIEFQSSAmIDEwLjAgPG91dHB1dD5cclxuICAgICAgICAgICAgZG9jdW1lbnQud3JpdGVsbignIC0gSW50ZXJuZXQgRXhwbG9yZXI6IE5vdCBzdXBwb3J0ZWQgKHBhcnRpYWwgc3VwcG9ydCBleHBlY3RlZCBpbiAxMC4wKTxiciAvPicpO1xyXG4gICAgICAgICAgICAvLyA/IEZpbGUgQVBJICYgNS4xIDxvdXRwdXQ+XHJcbiAgICAgICAgICAgIGRvY3VtZW50LndyaXRlbG4oJyAtIFNhZmFyaTogTm90IHN1cHBvcnRlZDxiciAvPicpO1xyXG4gICAgICAgICAgICAvLyA/IEZpbGUgQVBJICYgOS4yIDxvdXRwdXQ+XHJcbiAgICAgICAgICAgIGRvY3VtZW50LndyaXRlbG4oJyAtIE9wZXJhOiBOb3Qgc3VwcG9ydGVkJyk7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgYWRkT3JkaW5hbChuKSB7XHJcbiAgICAgICAgdmFyIHN0ciA9IG4udG9TdHJpbmcoKS5zbGljZSgtMSksXHJcbiAgICAgICAgICAgIG9yZCA9ICcnO1xyXG4gICAgICAgIHN3aXRjaCAoc3RyKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJzEnOlxyXG4gICAgICAgICAgICAgICAgb3JkID0gJ3N0JztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICcyJzpcclxuICAgICAgICAgICAgICAgIG9yZCA9ICduZCc7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnMyc6XHJcbiAgICAgICAgICAgICAgICBvcmQgPSAncmQnO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJzQnOlxyXG4gICAgICAgICAgICBjYXNlICc1JzpcclxuICAgICAgICAgICAgY2FzZSAnNic6XHJcbiAgICAgICAgICAgIGNhc2UgJzcnOlxyXG4gICAgICAgICAgICBjYXNlICc4JzpcclxuICAgICAgICAgICAgY2FzZSAnOSc6XHJcbiAgICAgICAgICAgIGNhc2UgJzAnOlxyXG4gICAgICAgICAgICAgICAgb3JkID0gJ3RoJztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbiArIG9yZDtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gdmFsdWVcclxuICAgICAqIEBwYXJhbSBhcnJcclxuICAgICAqIEBwYXJhbSBwcm9wXHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAgICovXHJcbiAgICBnZXRJbmRleCAodmFsdWUsIGFyciwgcHJvcCkge1xyXG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYoYXJyW2ldW3Byb3BdID09PSB2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIC0xOyAvL3RvIGhhbmRsZSB0aGUgY2FzZSB3aGVyZSB0aGUgdmFsdWUgZG9lc24ndCBleGlzdFxyXG4gICAgfVxyXG5cclxufTtcclxuXHJcblxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9jYS9jYS51dGlscy5qcyJdLCJzb3VyY2VSb290IjoiIn0=