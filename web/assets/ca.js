webpackJsonp([5],{

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
    },
    getByCustomId: function getByCustomId(customId) {
        var deferred = jQuery.Deferred(),
            _this = this;

        $.ajax({
            url: envhosturl + "listing/details",
            type: "POST",
            data: {
                customId: customId
            },
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
    getCountriesFull: function getCountriesFull() {
        var deferred = jQuery.Deferred();
        var _this = this;
        $.ajax({
            url: envhosturl + "search/countries/full",
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
    getTerritories: function getTerritories() {
        var deferred = jQuery.Deferred();
        var _this = this;
        $.ajax({
            url: envhosturl + "search/territories",
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
    getRightsPackage: function getRightsPackage(rightsPackage, group) {
        var deferred = jQuery.Deferred();
        var _this = this;
        $.ajax({
            url: envhosturl + "search/rights-package",
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

/***/ 3:
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

},[3]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9jYS9jYS5hcGkuY29udGVudC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9jYS9jYS5hcGkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvY2EvY2EuZGF0YS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9jYS9jYS5tb2RlbHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvY2EvY2EudXRpbHMuanMiXSwibmFtZXMiOlsiX19hcGlTdG9yZSIsInRvdXJuYW1lbnRzIiwid2luZG93IiwiQ29udGVudEFyZW5hIiwiQ29udGVudEFwaSIsInNhdmVDb250ZW50QXNEcmFmdCIsImNvbnRlbnQiLCJkZWZlcnJlZCIsImpRdWVyeSIsIkRlZmVycmVkIiwiX3RoaXMiLCIkIiwiYWpheCIsInVybCIsImVudmhvc3R1cmwiLCJ0eXBlIiwiZGF0YSIsIkpTT04iLCJzdHJpbmdpZnkiLCJjb250ZW50VHlwZSIsInN1Y2Nlc3MiLCJyZXNwb25zZSIsInJlc29sdmUiLCJlcnJvciIsInN0YXR1cyIsInJlamVjdCIsInByb21pc2UiLCJnZXRCeUN1c3RvbUlkIiwiY3VzdG9tSWQiLCJBcGkiLCJzb3J0QnlMYWJlbCIsImEiLCJiIiwibmFtZSIsInNvcnRCeVNwb3J0Iiwic3BvcnQiLCJzcG9ydENhdGVnb3J5IiwicHJlcGFyZUxpc3QiLCJsaXN0IiwiY2F0ZWdvcnlJZCIsIm1hcCIsIml0ZW0iLCJjYXRlZ29yeSIsImlkIiwiZXh0ZXJuYWxJZCIsInNvcnQiLCJnZXRDb250ZW50IiwiZmlsdGVyIiwic2F2ZUZpbHRlciIsImdldENvdW50cmllcyIsImdldENvdW50cmllc0Z1bGwiLCJnZXRUZXJyaXRvcmllcyIsImdldFJpZ2h0cyIsInJpZ2h0c1BhY2thZ2UiLCJncm91cCIsImdldFJpZ2h0c1BhY2thZ2UiLCJnZXRTcG9ydHMiLCJob3N0dXJsIiwic3BvcnRzIiwiZ2V0Q29udGVudERldGFpbHMiLCJnZXRQZW5kaW5nTGlzdGluZ3MiLCJnZXRDYXRlZ29yaWVzIiwic3BvcnRJZCIsImNhdHMiLCJnZXRUb3VybmFtZW50cyIsImRvbmUiLCJ0b3VybmFtZW50IiwiaW5kZXhPZiIsInB1c2giLCJ1bmRlZmluZWQiLCJnZXRTZWFzb25zIiwidG91cm5hbWVudElkIiwic2Vhc29ucyIsInNlYXNvbiIsImlzQXJyYXkiLCJlbmREYXRlIiwiZW5kX2RhdGUiLCJzdGFydERhdGUiLCJzdGFydF9kYXRlIiwidG91cm5hbWVudF9pZCIsInllYXIiLCJyZXZlcnNlIiwiZ2V0U2NoZWR1bGUiLCJzZWFzb25JZCIsImNvbnNvbGUiLCJsb2ciLCJzcG9ydF9ldmVudHMiLCJzcG9ydF9ldmVudCIsImZvckVhY2giLCJyb3VuZCIsInRvdXJuYW1lbnRfcm91bmQiLCJudW1iZXIiLCJzY2hlZHVsZWQiLCJ0b3VybmFtZW50Um91bmQiLCJjb21wZXRpdG9ycyIsImNvbXBldGl0b3IiLCJzZWFyY2hDb21wZXRpdGlvbiIsInJlcXVlc3QiLCJ0cmFkaXRpb25hbCIsImRhdGFUeXBlIiwid2F0Y2hsaXN0IiwiRGF0YSIsIkxhbmd1YWdlcyIsIlRvcFNwb3J0cyIsIkZ1bGxTcG9ydHMiLCJDb3VudHJpZXMiLCJTaG9ydCIsIkxvbmciLCJNb2RlbCIsIlJpZ2h0UGFja2FnZSIsInJpZ2h0cyIsIkRpc3RyaWJ1dGlvblBhY2thZ2UiLCJwcm9kdWN0aW9uIiwidGVjaG5pY2FsIiwiUmlnaHQiLCJyaWdodEl0ZW1zIiwiUmlnaHRJdGVtIiwiaW5wdXRzIiwiU2VsZWN0ZWRSaWdodCIsInJpZ2h0IiwicmlnaHRJdGVtIiwiZGlzdHJpYnV0aW9uUGFja2FnZSIsIlNhbGVzUGFja2FnZSIsInNhbGVzTWV0aG9kIiwiZmVlIiwiY3VycmVuY3kiLCJ0ZXJyaXRvcmllcyIsInNlbGVjdGVkVGVycml0b3JpZXMiLCJleGNsdWRlZFRlcnJpdG9yaWVzIiwidGVycml0b3J5QmlkcyIsInNlbGxBc1BhY2thZ2UiLCJ2YWxpZGF0ZSIsImRlc2NyaXB0aW9uIiwiaGFzRXJyb3JzIiwiQ29udGVudCIsImV2ZW50VHlwZSIsInNhbGVzUGFja2FnZXMiLCJpbnN0YWxsbWVudHMiLCJnZXRUaXRsZSIsInRpdGxlIiwibGVuZ3RoIiwiaW5kZXgiLCJhcnJheSIsInZhbHVlIiwidmFsdWVzIiwic3BsaXQiLCJqb2luIiwid2F0Y2giLCJhcmd1bWVudHMiLCJVdGlscyIsImFkZFJlZ2lvbkJlaGF2aW91ciIsInNlbGVjdG9yIiwiaHRtbCIsImVhY2giLCJrIiwidiIsIm9wdGlvbiIsImNvdW50cnlfY29kZSIsImtleSIsInNlbGVjdCIsImFwcGVuZCIsImNob3NlbiIsIndpZHRoIiwiYWRkTGFuZ3VhZ2VCZWhhdmlvdXIiLCJjaGFuZ2UiLCJlIiwib3B0Iiwic2VsZWN0ZWQiLCJ0cmlnZ2VyIiwiaXNBUElBdmFpbGFibGUiLCJGaWxlIiwiRmlsZVJlYWRlciIsIkZpbGVMaXN0IiwiQmxvYiIsImRvY3VtZW50Iiwid3JpdGVsbiIsImFkZE9yZGluYWwiLCJuIiwic3RyIiwidG9TdHJpbmciLCJzbGljZSIsIm9yZCIsImdldEluZGV4IiwiYXJyIiwicHJvcCIsImkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztBQUlBLElBQUlBLGFBQWE7QUFDYkMsaUJBQWM7QUFERCxDQUFqQjs7QUFJQUMsT0FBT0MsWUFBUCxHQUFzQkQsT0FBT0MsWUFBUCxJQUF1QixFQUE3QztBQUNBQSxhQUFhQyxVQUFiLEdBQTBCRCxhQUFhQyxVQUFiLElBQTBCLEVBQXBEOztBQUVBRCxhQUFhQyxVQUFiLEdBQXlCO0FBQ3JCQyxzQkFEcUIsOEJBQ0FDLE9BREEsRUFDVTtBQUMzQixZQUFJQyxXQUFXQyxP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QU0sSUFBTjtBQUNBO0FBQ0osaUJBQUssR0FBTDtBQUNBLGlCQUFLLEdBQUw7QUFDQSxpQkFBSyxHQUFMO0FBQ0EsaUJBQUssR0FBTDtBQUNBLGlCQUFLLEdBQUw7QUFDQSxpQkFBSyxHQUFMO0FBQ0EsaUJBQUssR0FBTDtBQUNJQSxzQkFBTSxJQUFOO0FBQ0E7QUFsQlI7QUFvQkEsZUFBT0osSUFBSUksR0FBWDtBQUNILEtBOUdnQjs7QUErR2pCOzs7Ozs7O0FBT0FDLFlBdEhpQixvQkFzSFB2QyxLQXRITyxFQXNIQXdDLEdBdEhBLEVBc0hLQyxJQXRITCxFQXNIVztBQUN4QixhQUFJLElBQUlDLElBQUksQ0FBWixFQUFlQSxJQUFJRixJQUFJM0MsTUFBdkIsRUFBK0I2QyxHQUEvQixFQUFvQztBQUNoQyxnQkFBR0YsSUFBSUUsQ0FBSixFQUFPRCxJQUFQLE1BQWlCekMsS0FBcEIsRUFBMkI7QUFDdkIsdUJBQU8wQyxDQUFQO0FBQ0g7QUFDSjtBQUNELGVBQU8sQ0FBQyxDQUFSLENBTndCLENBTWI7QUFDZDtBQTdIZ0IsQ0FBckIsQyIsImZpbGUiOiJjYS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4qIENyZWF0ZWQgYnkgSnVhbkNydXogb24gNC8xLzIwMTguXHJcbiovXHJcblxyXG5sZXQgX19hcGlTdG9yZSA9IHtcclxuICAgIHRvdXJuYW1lbnRzIDoge31cclxufTtcclxuXHJcbndpbmRvdy5Db250ZW50QXJlbmEgPSB3aW5kb3cuQ29udGVudEFyZW5hIHx8IHt9O1xyXG5Db250ZW50QXJlbmEuQ29udGVudEFwaSA9IENvbnRlbnRBcmVuYS5Db250ZW50QXBpfHwge307XHJcblxyXG5Db250ZW50QXJlbmEuQ29udGVudEFwaT0ge1xyXG4gICAgc2F2ZUNvbnRlbnRBc0RyYWZ0ICggY29udGVudCApIHtcclxuICAgICAgICB2YXIgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcclxuICAgICAgICAgICAgX3RoaXMgPSB0aGlzO1xyXG5cclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImNvbnRlbnQvZHJhZnQvc2F2ZVwiLFxyXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoY29udGVudCksXHJcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XHJcbiAgICB9LFxyXG4gICAgZ2V0QnlDdXN0b21JZCAoIGN1c3RvbUlkICkge1xyXG4gICAgICAgIHZhciBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxyXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XHJcblxyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwibGlzdGluZy9kZXRhaWxzXCIsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICBjdXN0b21JZCA6IGN1c3RvbUlkLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcclxuICAgIH0sXHJcblxyXG59O1xyXG5cclxuXHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L2NhL2NhLmFwaS5jb250ZW50LmpzIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgSnVhbkNydXogb24gNC8xLzIwMTguXHJcbiAqL1xyXG5cclxubGV0IF9fYXBpU3RvcmUgPSB7XHJcbiAgICB0b3VybmFtZW50cyA6IHt9XHJcbn07XHJcblxyXG53aW5kb3cuQ29udGVudEFyZW5hID0gd2luZG93LkNvbnRlbnRBcmVuYSB8fCB7fTtcclxuXHJcbkNvbnRlbnRBcmVuYS5BcGk9IHtcclxuICAgIHNvcnRCeUxhYmVsIChhLCBiKSB7XHJcbiAgICAgICAgcmV0dXJuIChhLm5hbWUgPiBiLm5hbWUpID8gMSA6ICgoYi5uYW1lID4gYS5uYW1lKSA/IC0xIDogMClcclxuICAgIH0sXHJcbiAgICBzb3J0QnlTcG9ydCAoYSwgYikge1xyXG5cclxuICAgICAgICBpZiAoYS5zcG9ydC5uYW1lID4gYi5zcG9ydC5uYW1lKSByZXR1cm4gMTtcclxuICAgICAgICBpZiAoYS5zcG9ydC5uYW1lIDwgYi5zcG9ydC5uYW1lKSByZXR1cm4gLTE7XHJcbiAgICAgICAgaWYgKGEuc3BvcnRDYXRlZ29yeS5uYW1lID4gYi5zcG9ydENhdGVnb3J5Lm5hbWUpIHJldHVybiAxO1xyXG4gICAgICAgIGlmIChhLnNwb3J0Q2F0ZWdvcnkubmFtZSA8IGIuc3BvcnRDYXRlZ29yeS5uYW1lKSByZXR1cm4gLTE7XHJcbiAgICAgICAgaWYgKGEubmFtZSA+IGIubmFtZSkgcmV0dXJuIDE7XHJcbiAgICAgICAgaWYgKGEubmFtZSA8IGIubmFtZSkgcmV0dXJuIC0xO1xyXG4gICAgICAgIHJldHVybiAwO1xyXG5cclxuICAgIH0sXHJcbiAgICBwcmVwYXJlTGlzdCAoIGxpc3QsIGNhdGVnb3J5SWQgKSB7XHJcblxyXG4gICAgICAgIGxldCBfdGhpcyA9IHRoaXM7XHJcblxyXG4gICAgICAgIGxpc3QgPSAkLm1hcChsaXN0LCBmdW5jdGlvbiAoaXRlbSkge1xyXG5cclxuICAgICAgICAgICAgLy8gRmlsdGVyIGJ5IGNhdGVnb3J5XHJcbiAgICAgICAgICAgIGlmICggY2F0ZWdvcnlJZCAmJiBpdGVtLmNhdGVnb3J5WydAYXR0cmlidXRlcyddLmlkICE9IGNhdGVnb3J5SWQpIHJldHVybiBudWxsO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHtuYW1lOiBpdGVtWydAYXR0cmlidXRlcyddLm5hbWUsIGV4dGVybmFsSWQ6IGl0ZW1bJ0BhdHRyaWJ1dGVzJ10uaWR9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGxpc3Quc29ydChfdGhpcy5zb3J0QnlMYWJlbCk7XHJcblxyXG4gICAgICAgIHJldHVybiBsaXN0O1xyXG4gICAgfSxcclxuICAgIGdldENvbnRlbnQgKCBmaWx0ZXIpIHtcclxuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKTtcclxuXHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJidXkvc2VhcmNoXCIsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBkYXRhIDogZmlsdGVyLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcclxuICAgIH0sXHJcbiAgICBzYXZlRmlsdGVyICggZmlsdGVyKSB7XHJcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCk7XHJcblxyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYnV5L2ZpbHRlci9zYXZlXCIsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBkYXRhIDogZmlsdGVyLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcclxuICAgIH0sXHJcbiAgICBnZXRDb3VudHJpZXMgKCkge1xyXG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpO1xyXG4gICAgICAgIGxldCBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJzZWFyY2gvY291bnRyaWVzL2FsbFwiLFxyXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIEBwYXJhbSB7YXJyYXl9IHJlc3BvbnNlXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgIHJlc3BvbnNlLnNvcnQoX3RoaXMuc29ydEJ5TGFiZWwpO1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xyXG4gICAgfSxcclxuICAgIGdldENvdW50cmllc0Z1bGwgKCkge1xyXG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpO1xyXG4gICAgICAgIGxldCBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJzZWFyY2gvY291bnRyaWVzL2Z1bGxcIixcclxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBAcGFyYW0ge2FycmF5fSByZXNwb25zZVxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICByZXNwb25zZS5zb3J0KF90aGlzLnNvcnRCeUxhYmVsKTtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcclxuICAgIH0sXHJcbiAgICBnZXRUZXJyaXRvcmllcyAoKSB7XHJcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCk7XHJcbiAgICAgICAgbGV0IF90aGlzID0gdGhpcztcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcInNlYXJjaC90ZXJyaXRvcmllc1wiLFxyXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIEBwYXJhbSB7YXJyYXl9IHJlc3BvbnNlXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgIHJlc3BvbnNlLnNvcnQoX3RoaXMuc29ydEJ5TGFiZWwpO1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xyXG4gICAgfSxcclxuICAgIGdldFJpZ2h0cyAocmlnaHRzUGFja2FnZSwgZ3JvdXApIHtcclxuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKTtcclxuICAgICAgICBsZXQgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwic2VhcmNoL3JpZ2h0c1wiLFxyXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgZGF0YSA6IHtcclxuICAgICAgICAgICAgICAgIHJpZ2h0c1BhY2thZ2U6IHJpZ2h0c1BhY2thZ2UsXHJcbiAgICAgICAgICAgICAgICBncm91cDogZ3JvdXBcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBAcGFyYW0ge2FycmF5fSByZXNwb25zZVxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XHJcbiAgICB9LFxyXG4gICAgZ2V0UmlnaHRzUGFja2FnZSAocmlnaHRzUGFja2FnZSwgZ3JvdXApIHtcclxuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKTtcclxuICAgICAgICBsZXQgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwic2VhcmNoL3JpZ2h0cy1wYWNrYWdlXCIsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBkYXRhIDoge1xyXG4gICAgICAgICAgICAgICAgcmlnaHRzUGFja2FnZTogcmlnaHRzUGFja2FnZSxcclxuICAgICAgICAgICAgICAgIGdyb3VwOiBncm91cFxyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIEBwYXJhbSB7YXJyYXl9IHJlc3BvbnNlXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcclxuICAgIH0sXHJcbiAgICBnZXRTcG9ydHMgKCkge1xyXG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpO1xyXG4gICAgICAgIGxldCBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBob3N0dXJsICsgXCJ2MS9mZWVkL3Nwb3J0c1wiLFxyXG4gICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogQHBhcmFtIHt7c3BvcnQ6b2JqZWN0fX0gcmVzcG9uc2VcclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBzcG9ydHMgPSBfdGhpcy5wcmVwYXJlTGlzdCggcmVzcG9uc2Uuc3BvcnQpO1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShzcG9ydHMpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcclxuICAgIH0sXHJcbiAgICBnZXRDb250ZW50RGV0YWlscyggaWQgKSB7XHJcbiAgICAgICAgdmFyIGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXHJcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcclxuXHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJjb250ZW50L2RldGFpbHMvXCIsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBkYXRhOiB7aWQgOiBpZH0sXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xyXG4gICAgfSxcclxuICAgIGdldFBlbmRpbmdMaXN0aW5ncyggaWQgKSB7XHJcbiAgICAgICAgdmFyIGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXHJcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcclxuXHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJjb250ZW50L3BlbmRpbmctbGlzdGluZ3MvXCIsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBkYXRhOiB7aWQgOiBpZH0sXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xyXG4gICAgfSxcclxuICAgIGdldENhdGVnb3JpZXMgKCBzcG9ydElkICkge1xyXG4gICAgICAgIHZhciBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxyXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXMsXHJcbiAgICAgICAgICAgIGxpc3QgPSBbXSxcclxuICAgICAgICAgICAgY2F0cyA9IFtdO1xyXG5cclxuICAgICAgICBfdGhpcy5nZXRUb3VybmFtZW50cyhzcG9ydElkKS5kb25lKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgIGlmICggISBfX2FwaVN0b3JlLnRvdXJuYW1lbnRzW3Nwb3J0SWRdICkge1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSggW10gKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGlzdCA9ICQubWFwKCBfX2FwaVN0b3JlLnRvdXJuYW1lbnRzW3Nwb3J0SWRdLnRvdXJuYW1lbnQgLCBmdW5jdGlvbiAoaXRlbSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBpZCA9IGl0ZW0uY2F0ZWdvcnlbJ0BhdHRyaWJ1dGVzJ10uaWQ7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCBjYXRzLmluZGV4T2YoaWQpICE9PSAtMSApIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2F0cy5wdXNoKCBpZCApO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLmNhdGVnb3J5O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoX3RoaXMucHJlcGFyZUxpc3QobGlzdCkgKTtcclxuICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XHJcbiAgICB9LFxyXG4gICAgZ2V0VG91cm5hbWVudHMgKCBzcG9ydElkLCBjYXRlZ29yeUlkICkge1xyXG4gICAgICAgIHZhciBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxyXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XHJcblxyXG4gICAgICAgIGlmICggX19hcGlTdG9yZS50b3VybmFtZW50c1tzcG9ydElkXSAhPT0gdW5kZWZpbmVkICl7XHJcbiAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoX3RoaXMucHJlcGFyZUxpc3QoX19hcGlTdG9yZS50b3VybmFtZW50c1tzcG9ydElkXS50b3VybmFtZW50LCBjYXRlZ29yeUlkKSk7XHJcbiAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IGhvc3R1cmwgKyBcInYxL2ZlZWQvdG91cm5hbWVudHNcIixcclxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIGRhdGEgOiB7IGlkIDogc3BvcnRJZCB9LFxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogQHBhcmFtIHt7dG91cm5hbWVudHM6e3RvdXJuYW1lbnQ6QXJyYXl9fX0gcmVzcG9uc2VcclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIEEgY29tbWVudFxyXG4gICAgICAgICAgICAgICAgaWYgKCByZXNwb25zZS50b3VybmFtZW50cyA9PT0gdW5kZWZpbmVkIHx8IHJlc3BvbnNlLnRvdXJuYW1lbnRzLnRvdXJuYW1lbnQgPT09IHVuZGVmaW5lZCApIHtcclxuICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKFtdKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgX19hcGlTdG9yZS50b3VybmFtZW50c1tzcG9ydElkXSA9IHJlc3BvbnNlLnRvdXJuYW1lbnRzO1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShfdGhpcy5wcmVwYXJlTGlzdChyZXNwb25zZS50b3VybmFtZW50cy50b3VybmFtZW50LCBjYXRlZ29yeUlkKSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cyApIHtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xyXG4gICAgfSxcclxuICAgIGdldFNlYXNvbnMgKCB0b3VybmFtZW50SWQgKSB7XHJcbiAgICAgICAgdmFyIGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXHJcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcclxuXHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBob3N0dXJsICsgXCJ2MS9mZWVkL3NlYXNvbnNcIixcclxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIGRhdGEgOiB7IGlkIDogdG91cm5hbWVudElkIH0sXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBAcGFyYW0ge3t0b3VybmFtZW50czp7dG91cm5hbWVudDpBcnJheX19fSByZXNwb25zZVxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGxpc3Q7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCByZXNwb25zZS5zZWFzb25zID09PSB1bmRlZmluZWQgfHwgcmVzcG9uc2Uuc2Vhc29ucy5zZWFzb24gPT09IHVuZGVmaW5lZCApIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoICQuaXNBcnJheShyZXNwb25zZS5zZWFzb25zLnNlYXNvbikgKXtcclxuICAgICAgICAgICAgICAgICAgICBsaXN0ID0gJC5tYXAocmVzcG9uc2Uuc2Vhc29ucy5zZWFzb24sIGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBpdGVtWydAYXR0cmlidXRlcyddLm5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHRlcm5hbElkOiBpdGVtWydAYXR0cmlidXRlcyddLmlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5kRGF0ZTogaXRlbVsnQGF0dHJpYnV0ZXMnXS5lbmRfZGF0ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0RGF0ZTogaXRlbVsnQGF0dHJpYnV0ZXMnXS5zdGFydF9kYXRlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG91cm5hbWVudElkOiBpdGVtWydAYXR0cmlidXRlcyddLnRvdXJuYW1lbnRfaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB5ZWFyOiBpdGVtWydAYXR0cmlidXRlcyddLnllYXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KS5yZXZlcnNlKCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGxpc3QgPSBbe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiByZXNwb25zZS5zZWFzb25zLnNlYXNvblsnQGF0dHJpYnV0ZXMnXS5uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBleHRlcm5hbElkOiByZXNwb25zZS5zZWFzb25zLnNlYXNvblsnQGF0dHJpYnV0ZXMnXS5pZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZW5kRGF0ZTogcmVzcG9uc2Uuc2Vhc29ucy5zZWFzb25bJ0BhdHRyaWJ1dGVzJ10uZW5kX2RhdGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0RGF0ZTogcmVzcG9uc2Uuc2Vhc29ucy5zZWFzb25bJ0BhdHRyaWJ1dGVzJ10uc3RhcnRfZGF0ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG91cm5hbWVudElkOiByZXNwb25zZS5zZWFzb25zLnNlYXNvblsnQGF0dHJpYnV0ZXMnXS50b3VybmFtZW50X2lkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB5ZWFyOiByZXNwb25zZS5zZWFzb25zLnNlYXNvblsnQGF0dHJpYnV0ZXMnXS55ZWFyLFxyXG4gICAgICAgICAgICAgICAgICAgIH1dXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShsaXN0KTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzICkge1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XHJcbiAgICB9LFxyXG4gICAgZ2V0U2NoZWR1bGUgKCBzZWFzb25JZCApIHtcclxuICAgICAgICB2YXIgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcclxuICAgICAgICAgICAgX3RoaXMgPSB0aGlzO1xyXG5cclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IGhvc3R1cmwgKyBcInYxL2ZlZWQvc2NoZWR1bGVzXCIsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBkYXRhIDogeyBpZCA6IHNlYXNvbklkIH0sXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBAcGFyYW0ge3t0b3VybmFtZW50czp7dG91cm5hbWVudDpBcnJheX19fSByZXNwb25zZVxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBsaXN0ID0ge307XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCByZXNwb25zZS5zcG9ydF9ldmVudHMgPT09IHVuZGVmaW5lZCB8fCByZXNwb25zZS5zcG9ydF9ldmVudHMuc3BvcnRfZXZlbnQgPT09IHVuZGVmaW5lZCApIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXNwb25zZS5zcG9ydF9ldmVudHMuc3BvcnRfZXZlbnQuZm9yRWFjaCggKGl0ZW0pID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJvdW5kICA9IChpdGVtLnRvdXJuYW1lbnRfcm91bmQpID8gaXRlbS50b3VybmFtZW50X3JvdW5kWydAYXR0cmlidXRlcyddIDogbnVsbDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFyb3VuZCkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgbmFtZSA9IHJvdW5kLm51bWJlciB8fCByb3VuZC5uYW1lO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoICFsaXN0W25hbWVdICkgbGlzdFtuYW1lXSA9IFtdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsaXN0W25hbWVdLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY2hlZHVsZWQ6IGl0ZW1bJ0BhdHRyaWJ1dGVzJ10uc2NoZWR1bGVkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBleHRlcm5hbElkOiBpdGVtWydAYXR0cmlidXRlcyddLmlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IGl0ZW1bJ0BhdHRyaWJ1dGVzJ10uc3RhdHVzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VybmFtZW50Um91bmQgOiByb3VuZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29tcGV0aXRvcnMgOiAoaXRlbS5jb21wZXRpdG9ycykgPyBpdGVtLmNvbXBldGl0b3JzLmNvbXBldGl0b3IubWFwKCggY29tcGV0aXRvcik9PnsgcmV0dXJuIGNvbXBldGl0b3JbJ0BhdHRyaWJ1dGVzJ10gIH0pICA6IG51bGxcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAvKmxpc3QucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZSA6IFwiQWRkIG5ld1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGV4dGVybmFsX2lkIDogMFxyXG4gICAgICAgICAgICAgICAgfSk7Ki9cclxuXHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKGxpc3QpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMgKSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcclxuICAgIH0sXHJcbiAgICBzZWFyY2hDb21wZXRpdGlvbihyZXF1ZXN0KSB7XHJcblxyXG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpO1xyXG4gICAgICAgIGxldCBfdGhpcyA9IHRoaXM7XHJcblxyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArICdzZWFyY2gvdG91cm5hbWVudCcsXHJcbiAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgIFwiY29udGVudFwiOiByZXF1ZXN0XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHRyYWRpdGlvbmFsOiB0cnVlLFxyXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgZGF0YVR5cGU6IFwianNvblwiLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGRhdGEuc29ydChfdGhpcy5zb3J0QnlTcG9ydCk7XHJcblxyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShkYXRhKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzICkge1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XHJcbiAgICB9LFxyXG4gICAgd2F0Y2hsaXN0KCBpZCApIHtcclxuICAgICAgICB2YXIgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcclxuICAgICAgICAgICAgX3RoaXMgPSB0aGlzO1xyXG5cclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcIm15Y29udGVudC93YXRjaGxpc3QvXCIsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBkYXRhOiB7aWQgOiBpZH0sXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuXHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L2NhL2NhLmFwaS5qcyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IEp1YW5DcnV6IG9uIDQvMS8yMDE4LlxyXG4gKi9cclxuXHJcbndpbmRvdy5Db250ZW50QXJlbmEgPSB3aW5kb3cuQ29udGVudEFyZW5hIHx8IHt9O1xyXG5cclxuQ29udGVudEFyZW5hLkRhdGEgPSBDb250ZW50QXJlbmEuRGF0YSB8fCB7fTtcclxuQ29udGVudEFyZW5hLkxhbmd1YWdlcyA9IENvbnRlbnRBcmVuYS5MYW5ndWFnZXMgfHwge307XHJcblxyXG5Db250ZW50QXJlbmEuRGF0YS5Ub3BTcG9ydHMgPSBbXHJcbiAgICB7IG5hbWUgOiBcIlNvY2NlclwiLCBleHRlcm5hbElkOiBcInNyOnNwb3J0OjFcIn0sXHJcbiAgICB7IG5hbWUgOiBcIkJhc2tldGJhbGxcIiwgZXh0ZXJuYWxJZDogXCJzcjpzcG9ydDoyXCJ9LFxyXG4gICAgeyBuYW1lIDogXCJCYXNlYmFsbFwiLCBleHRlcm5hbElkOiBcInNyOnNwb3J0OjNcIn0sXHJcbiAgICB7IG5hbWUgOiBcIlRlbm5pc1wiLCBleHRlcm5hbElkOiBcInNyOnNwb3J0OjVcIn0sXHJcbiAgICB7IG5hbWUgOiBcIkNyaWNrZXRcIiwgZXh0ZXJuYWxJZDogXCJzcjpzcG9ydDoyMVwifSxcclxuICAgIHsgbmFtZSA6IFwiRmllbGQgSG9ja2V5XCIsIGV4dGVybmFsSWQ6IFwic3I6c3BvcnQ6MjRcIn0sXHJcbiAgICB7IG5hbWUgOiBcIlZvbGxleWJhbGxcIiwgZXh0ZXJuYWxJZDogXCJzcjpzcG9ydDoyM1wifSxcclxuICAgIHsgbmFtZSA6IFwiVGFibGUgVGVubmlzXCIsIGV4dGVybmFsSWQ6IFwic3I6c3BvcnQ6MjBcIn0sXHJcbiAgICB7IG5hbWUgOiBcIkdvbGZcIiwgZXh0ZXJuYWxJZDogXCJzcjpzcG9ydDo5XCJ9LFxyXG4gICAgeyBuYW1lIDogXCJBbWVyaWNhbiBGb290YmFsbFwiLCBleHRlcm5hbElkOiBcInNyOnNwb3J0OjE2XCJ9LFxyXG4gICAgeyBuYW1lIDogXCJIYW5kYmFsbFwiLCBleHRlcm5hbElkOiBcInNyOnNwb3J0OjZcIn1cclxuXTtcclxuXHJcbkNvbnRlbnRBcmVuYS5EYXRhLkZ1bGxTcG9ydHMgPSBbXTtcclxuQ29udGVudEFyZW5hLkRhdGEuQ291bnRyaWVzID0gW107XHJcblxyXG5Db250ZW50QXJlbmEuTGFuZ3VhZ2VzLlNob3J0ID0ge1xyXG4gICAgXCJtZHJcIjogXCJNYW5kYXJpblwiLFxyXG4gICAgXCJlc1wiOiBcIlNwYW5pc2hcIixcclxuICAgIFwiZW5cIjogXCJFbmdsaXNoXCIsXHJcbiAgICBcImhpXCI6IFwiSGluZGlcIixcclxuICAgIFwiYXJcIjogXCJBcmFiaWNcIixcclxuICAgIFwicHRcIjogXCJQb3J0dWd1ZXNlXCIsXHJcbiAgICBcImJuXCI6IFwiQmVuZ2FsaVwiLFxyXG4gICAgXCJydVwiOiBcIlJ1c3NpYW5cIixcclxuICAgIFwiamFcIjogXCJKYXBhbmVzZVwiLFxyXG4gICAgXCJqdlwiOiBcIkphdmFuZXNlXCIsXHJcbiAgICBcImRlXCI6IFwiR2VybWFuXCIsXHJcbiAgICBcImFsbFwiIDogXCJTaG93IEFsbFwiXHJcbn07XHJcblxyXG5Db250ZW50QXJlbmEuTGFuZ3VhZ2VzLkxvbmcgPSB7XHJcbiAgICBcImFhXCI6IFwiQWZhclwiLFxyXG4gICAgXCJhZlwiOiBcIkFmcmlrYWFuc1wiLFxyXG4gICAgXCJhaW5cIjogXCJBaW51XCIsXHJcbiAgICBcImFrelwiOiBcIkFsYWJhbWFcIixcclxuICAgIFwic3FcIjogXCJBbGJhbmlhblwiLFxyXG4gICAgXCJhbGVcIjogXCJBbGV1dFwiLFxyXG4gICAgXCJhcnFcIjogXCJBbGdlcmlhbiBBcmFiaWNcIixcclxuICAgIFwiZW5fVVNcIjogXCJBbWVyaWNhbiBFbmdsaXNoXCIsXHJcbiAgICBcImFzZVwiOiBcIkFtZXJpY2FuIFNpZ24gTGFuZ3VhZ2VcIixcclxuICAgIFwiYW1cIjogXCJBbWhhcmljXCIsXHJcbiAgICBcImVneVwiOiBcIkFuY2llbnQgRWd5cHRpYW5cIixcclxuICAgIFwiZ3JjXCI6IFwiQW5jaWVudCBHcmVla1wiLFxyXG4gICAgXCJhclwiOiBcIkFyYWJpY1wiLFxyXG4gICAgXCJhcmNcIjogXCJBcmFtYWljXCIsXHJcbiAgICBcImFycFwiOiBcIkFyYXBhaG9cIixcclxuICAgIFwiYXJ3XCI6IFwiQXJhd2FrXCIsXHJcbiAgICBcImh5XCI6IFwiQXJtZW5pYW5cIixcclxuICAgIFwiYXNcIjogXCJBc3NhbWVzZVwiLFxyXG4gICAgXCJhc2FcIjogXCJBc3VcIixcclxuICAgIFwiZW5fQVVcIjogXCJBdXN0cmFsaWFuIEVuZ2xpc2hcIixcclxuICAgIFwiZGVfQVRcIjogXCJBdXN0cmlhbiBHZXJtYW5cIixcclxuICAgIFwiYXlcIjogXCJBeW1hcmFcIixcclxuICAgIFwiYXpcIjogXCJBemVyYmFpamFuaVwiLFxyXG4gICAgXCJiYW5cIjogXCJCYWxpbmVzZVwiLFxyXG4gICAgXCJldVwiOiBcIkJhc3F1ZVwiLFxyXG4gICAgXCJiYXJcIjogXCJCYXZhcmlhblwiLFxyXG4gICAgXCJiZVwiOiBcIkJlbGFydXNpYW5cIixcclxuICAgIFwiYm5cIjogXCJCZW5nYWxpXCIsXHJcbiAgICBcImJpa1wiOiBcIkJpa29sXCIsXHJcbiAgICBcImJpblwiOiBcIkJpbmlcIixcclxuICAgIFwiYnNcIjogXCJCb3NuaWFuXCIsXHJcbiAgICBcImJyaFwiOiBcIkJyYWh1aVwiLFxyXG4gICAgXCJicmFcIjogXCJCcmFqXCIsXHJcbiAgICBcInB0X0JSXCI6IFwiQnJhemlsaWFuIFBvcnR1Z3Vlc2VcIixcclxuICAgIFwiYnJcIjogXCJCcmV0b25cIixcclxuICAgIFwiZW5fR0JcIjogXCJCcml0aXNoIEVuZ2xpc2hcIixcclxuICAgIFwiYmdcIjogXCJCdWxnYXJpYW5cIixcclxuICAgIFwibXlcIjogXCJCdXJtZXNlXCIsXHJcbiAgICBcImZyY1wiOiBcIkNhanVuIEZyZW5jaFwiLFxyXG4gICAgXCJlbl9DQVwiOiBcIkNhbmFkaWFuIEVuZ2xpc2hcIixcclxuICAgIFwiZnJfQ0FcIjogXCJDYW5hZGlhbiBGcmVuY2hcIixcclxuICAgIFwieXVlXCI6IFwiQ2FudG9uZXNlXCIsXHJcbiAgICBcImNhclwiOiBcIkNhcmliXCIsXHJcbiAgICBcImNhXCI6IFwiQ2F0YWxhblwiLFxyXG4gICAgXCJjYXlcIjogXCJDYXl1Z2FcIixcclxuICAgIFwiY2ViXCI6IFwiQ2VidWFub1wiLFxyXG4gICAgXCJzaHVcIjogXCJDaGFkaWFuIEFyYWJpY1wiLFxyXG4gICAgXCJjZVwiOiBcIkNoZWNoZW5cIixcclxuICAgIFwiY2hyXCI6IFwiQ2hlcm9rZWVcIixcclxuICAgIFwicXVnXCI6IFwiQ2hpbWJvcmF6byBIaWdobGFuZCBRdWljaHVhXCIsXHJcbiAgICBcInpoXCI6IFwiQ2hpbmVzZVwiLFxyXG4gICAgXCJjaG5cIjogXCJDaGlub29rIEphcmdvblwiLFxyXG4gICAgXCJjaHBcIjogXCJDaGlwZXd5YW5cIixcclxuICAgIFwiY2hvXCI6IFwiQ2hvY3Rhd1wiLFxyXG4gICAgXCJjdVwiOiBcIkNodXJjaCBTbGF2aWNcIixcclxuICAgIFwiY3ZcIjogXCJDaHV2YXNoXCIsXHJcbiAgICBcIm53Y1wiOiBcIkNsYXNzaWNhbCBOZXdhcmlcIixcclxuICAgIFwic3ljXCI6IFwiQ2xhc3NpY2FsIFN5cmlhY1wiLFxyXG4gICAgXCJzd2NcIjogXCJDb25nbyBTd2FoaWxpXCIsXHJcbiAgICBcImNvcFwiOiBcIkNvcHRpY1wiLFxyXG4gICAgXCJrd1wiOiBcIkNvcm5pc2hcIixcclxuICAgIFwiY29cIjogXCJDb3JzaWNhblwiLFxyXG4gICAgXCJjclwiOiBcIkNyZWVcIixcclxuICAgIFwibXVzXCI6IFwiQ3JlZWtcIixcclxuICAgIFwiY3JoXCI6IFwiQ3JpbWVhbiBUdXJraXNoXCIsXHJcbiAgICBcImhyXCI6IFwiQ3JvYXRpYW5cIixcclxuICAgIFwiY3NcIjogXCJDemVjaFwiLFxyXG4gICAgXCJkYWtcIjogXCJEYWtvdGFcIixcclxuICAgIFwiZGFcIjogXCJEYW5pc2hcIixcclxuICAgIFwiZGVsXCI6IFwiRGVsYXdhcmVcIixcclxuICAgIFwibmxcIjogXCJEdXRjaFwiLFxyXG4gICAgXCJmcnNcIjogXCJFYXN0ZXJuIEZyaXNpYW5cIixcclxuICAgIFwiYXJ6XCI6IFwiRWd5cHRpYW4gQXJhYmljXCIsXHJcbiAgICBcImVuXCI6IFwiRW5nbGlzaFwiLFxyXG4gICAgXCJlb1wiOiBcIkVzcGVyYW50b1wiLFxyXG4gICAgXCJldFwiOiBcIkVzdG9uaWFuXCIsXHJcbiAgICBcInB0X1BUXCI6IFwiRXVyb3BlYW4gUG9ydHVndWVzZVwiLFxyXG4gICAgXCJlc19FU1wiOiBcIkV1cm9wZWFuIFNwYW5pc2hcIixcclxuICAgIFwiZWVcIjogXCJFd2VcIixcclxuICAgIFwiZmFuXCI6IFwiRmFuZ1wiLFxyXG4gICAgXCJoaWZcIjogXCJGaWppIEhpbmRpXCIsXHJcbiAgICBcImZqXCI6IFwiRmlqaWFuXCIsXHJcbiAgICBcImZpbFwiOiBcIkZpbGlwaW5vXCIsXHJcbiAgICBcImZpXCI6IFwiRmlubmlzaFwiLFxyXG4gICAgXCJubF9CRVwiOiBcIkZsZW1pc2hcIixcclxuICAgIFwiZm9uXCI6IFwiRm9uXCIsXHJcbiAgICBcImZyXCI6IFwiRnJlbmNoXCIsXHJcbiAgICBcImdhYVwiOiBcIkdhXCIsXHJcbiAgICBcImdhblwiOiBcIkdhbiBDaGluZXNlXCIsXHJcbiAgICBcImthXCI6IFwiR2VvcmdpYW5cIixcclxuICAgIFwiZGVcIjogXCJHZXJtYW5cIixcclxuICAgIFwiZ290XCI6IFwiR290aGljXCIsXHJcbiAgICBcImdyYlwiOiBcIkdyZWJvXCIsXHJcbiAgICBcImVsXCI6IFwiR3JlZWtcIixcclxuICAgIFwiZ25cIjogXCJHdWFyYW5pXCIsXHJcbiAgICBcImd1XCI6IFwiR3VqYXJhdGlcIixcclxuICAgIFwiZ3V6XCI6IFwiR3VzaWlcIixcclxuICAgIFwiaGFpXCI6IFwiSGFpZGFcIixcclxuICAgIFwiaHRcIjogXCJIYWl0aWFuXCIsXHJcbiAgICBcImhha1wiOiBcIkhha2thIENoaW5lc2VcIixcclxuICAgIFwiaGFcIjogXCJIYXVzYVwiLFxyXG4gICAgXCJoYXdcIjogXCJIYXdhaWlhblwiLFxyXG4gICAgXCJoZVwiOiBcIkhlYnJld1wiLFxyXG4gICAgXCJoelwiOiBcIkhlcmVyb1wiLFxyXG4gICAgXCJoaVwiOiBcIkhpbmRpXCIsXHJcbiAgICBcImhpdFwiOiBcIkhpdHRpdGVcIixcclxuICAgIFwiaG1uXCI6IFwiSG1vbmdcIixcclxuICAgIFwiaHVcIjogXCJIdW5nYXJpYW5cIixcclxuICAgIFwiaXNcIjogXCJJY2VsYW5kaWNcIixcclxuICAgIFwiaW9cIjogXCJJZG9cIixcclxuICAgIFwiaWdcIjogXCJJZ2JvXCIsXHJcbiAgICBcIml1XCI6IFwiSW51a3RpdHV0XCIsXHJcbiAgICBcImlrXCI6IFwiSW51cGlhcVwiLFxyXG4gICAgXCJnYVwiOiBcIklyaXNoXCIsXHJcbiAgICBcIml0XCI6IFwiSXRhbGlhblwiLFxyXG4gICAgXCJqYW1cIjogXCJKYW1haWNhbiBDcmVvbGUgRW5nbGlzaFwiLFxyXG4gICAgXCJqYVwiOiBcIkphcGFuZXNlXCIsXHJcbiAgICBcImp2XCI6IFwiSmF2YW5lc2VcIixcclxuICAgIFwia2FqXCI6IFwiSmp1XCIsXHJcbiAgICBcImR5b1wiOiBcIkpvbGEtRm9ueWlcIixcclxuICAgIFwieGFsXCI6IFwiS2FsbXlrXCIsXHJcbiAgICBcImthbVwiOiBcIkthbWJhXCIsXHJcbiAgICBcImtibFwiOiBcIkthbmVtYnVcIixcclxuICAgIFwia25cIjogXCJLYW5uYWRhXCIsXHJcbiAgICBcImtyXCI6IFwiS2FudXJpXCIsXHJcbiAgICBcImthYVwiOiBcIkthcmEtS2FscGFrXCIsXHJcbiAgICBcImtyY1wiOiBcIkthcmFjaGF5LUJhbGthclwiLFxyXG4gICAgXCJrcmxcIjogXCJLYXJlbGlhblwiLFxyXG4gICAgXCJrc1wiOiBcIkthc2htaXJpXCIsXHJcbiAgICBcImNzYlwiOiBcIkthc2h1YmlhblwiLFxyXG4gICAgXCJrYXdcIjogXCJLYXdpXCIsXHJcbiAgICBcImtrXCI6IFwiS2F6YWtoXCIsXHJcbiAgICBcImtlblwiOiBcIktlbnlhbmdcIixcclxuICAgIFwia2hhXCI6IFwiS2hhc2lcIixcclxuICAgIFwia21cIjogXCJLaG1lclwiLFxyXG4gICAgXCJraG9cIjogXCJLaG90YW5lc2VcIixcclxuICAgIFwia2h3XCI6IFwiS2hvd2FyXCIsXHJcbiAgICBcImtpXCI6IFwiS2lrdXl1XCIsXHJcbiAgICBcImttYlwiOiBcIktpbWJ1bmR1XCIsXHJcbiAgICBcImtyalwiOiBcIktpbmFyYXktYVwiLFxyXG4gICAgXCJyd1wiOiBcIktpbnlhcndhbmRhXCIsXHJcbiAgICBcImtpdVwiOiBcIktpcm1hbmpraVwiLFxyXG4gICAgXCJ0bGhcIjogXCJLbGluZ29uXCIsXHJcbiAgICBcImJrbVwiOiBcIktvbVwiLFxyXG4gICAgXCJrdlwiOiBcIktvbWlcIixcclxuICAgIFwia29pXCI6IFwiS29taS1QZXJteWFrXCIsXHJcbiAgICBcImtnXCI6IFwiS29uZ29cIixcclxuICAgIFwia29rXCI6IFwiS29ua2FuaVwiLFxyXG4gICAgXCJrb1wiOiBcIktvcmVhblwiLFxyXG4gICAgXCJrZm9cIjogXCJLb3JvXCIsXHJcbiAgICBcImtvc1wiOiBcIktvc3JhZWFuXCIsXHJcbiAgICBcImF2a1wiOiBcIktvdGF2YVwiLFxyXG4gICAgXCJraHFcIjogXCJLb3lyYSBDaGlpbmlcIixcclxuICAgIFwic2VzXCI6IFwiS295cmFib3JvIFNlbm5pXCIsXHJcbiAgICBcImtwZVwiOiBcIktwZWxsZVwiLFxyXG4gICAgXCJrcmlcIjogXCJLcmlvXCIsXHJcbiAgICBcImtqXCI6IFwiS3VhbnlhbWFcIixcclxuICAgIFwia3VtXCI6IFwiS3VteWtcIixcclxuICAgIFwia3VcIjogXCJLdXJkaXNoXCIsXHJcbiAgICBcImtydVwiOiBcIkt1cnVraFwiLFxyXG4gICAgXCJrdXRcIjogXCJLdXRlbmFpXCIsXHJcbiAgICBcIm5tZ1wiOiBcIkt3YXNpb1wiLFxyXG4gICAgXCJreVwiOiBcIkt5cmd5elwiLFxyXG4gICAgXCJxdWNcIjogXCJLXFx1MDJiY2ljaGVcXHUwMmJjXCIsXHJcbiAgICBcImxhZFwiOiBcIkxhZGlub1wiLFxyXG4gICAgXCJsYWhcIjogXCJMYWhuZGFcIixcclxuICAgIFwibGt0XCI6IFwiTGFrb3RhXCIsXHJcbiAgICBcImxhbVwiOiBcIkxhbWJhXCIsXHJcbiAgICBcImxhZ1wiOiBcIkxhbmdpXCIsXHJcbiAgICBcImxvXCI6IFwiTGFvXCIsXHJcbiAgICBcImx0Z1wiOiBcIkxhdGdhbGlhblwiLFxyXG4gICAgXCJsYVwiOiBcIkxhdGluXCIsXHJcbiAgICBcImVzXzQxOVwiOiBcIkxhdGluIEFtZXJpY2FuIFNwYW5pc2hcIixcclxuICAgIFwibHZcIjogXCJMYXR2aWFuXCIsXHJcbiAgICBcImx6elwiOiBcIkxhelwiLFxyXG4gICAgXCJsZXpcIjogXCJMZXpnaGlhblwiLFxyXG4gICAgXCJsaWpcIjogXCJMaWd1cmlhblwiLFxyXG4gICAgXCJsaVwiOiBcIkxpbWJ1cmdpc2hcIixcclxuICAgIFwibG5cIjogXCJMaW5nYWxhXCIsXHJcbiAgICBcImxmblwiOiBcIkxpbmd1YSBGcmFuY2EgTm92YVwiLFxyXG4gICAgXCJsemhcIjogXCJMaXRlcmFyeSBDaGluZXNlXCIsXHJcbiAgICBcImx0XCI6IFwiTGl0aHVhbmlhblwiLFxyXG4gICAgXCJsaXZcIjogXCJMaXZvbmlhblwiLFxyXG4gICAgXCJqYm9cIjogXCJMb2piYW5cIixcclxuICAgIFwibG1vXCI6IFwiTG9tYmFyZFwiLFxyXG4gICAgXCJuZHNcIjogXCJMb3cgR2VybWFuXCIsXHJcbiAgICBcInNsaVwiOiBcIkxvd2VyIFNpbGVzaWFuXCIsXHJcbiAgICBcImRzYlwiOiBcIkxvd2VyIFNvcmJpYW5cIixcclxuICAgIFwibG96XCI6IFwiTG96aVwiLFxyXG4gICAgXCJsdVwiOiBcIkx1YmEtS2F0YW5nYVwiLFxyXG4gICAgXCJsdWFcIjogXCJMdWJhLUx1bHVhXCIsXHJcbiAgICBcImx1aVwiOiBcIkx1aXNlbm9cIixcclxuICAgIFwic21qXCI6IFwiTHVsZSBTYW1pXCIsXHJcbiAgICBcImx1blwiOiBcIkx1bmRhXCIsXHJcbiAgICBcImx1b1wiOiBcIkx1b1wiLFxyXG4gICAgXCJsYlwiOiBcIkx1eGVtYm91cmdpc2hcIixcclxuICAgIFwibHV5XCI6IFwiTHV5aWFcIixcclxuICAgIFwibWRlXCI6IFwiTWFiYVwiLFxyXG4gICAgXCJta1wiOiBcIk1hY2Vkb25pYW5cIixcclxuICAgIFwiam1jXCI6IFwiTWFjaGFtZVwiLFxyXG4gICAgXCJtYWRcIjogXCJNYWR1cmVzZVwiLFxyXG4gICAgXCJtYWZcIjogXCJNYWZhXCIsXHJcbiAgICBcIm1hZ1wiOiBcIk1hZ2FoaVwiLFxyXG4gICAgXCJ2bWZcIjogXCJNYWluLUZyYW5jb25pYW5cIixcclxuICAgIFwibWFpXCI6IFwiTWFpdGhpbGlcIixcclxuICAgIFwibWFrXCI6IFwiTWFrYXNhclwiLFxyXG4gICAgXCJtZ2hcIjogXCJNYWtodXdhLU1lZXR0b1wiLFxyXG4gICAgXCJrZGVcIjogXCJNYWtvbmRlXCIsXHJcbiAgICBcIm1nXCI6IFwiTWFsYWdhc3lcIixcclxuICAgIFwibXNcIjogXCJNYWxheVwiLFxyXG4gICAgXCJtbFwiOiBcIk1hbGF5YWxhbVwiLFxyXG4gICAgXCJtdFwiOiBcIk1hbHRlc2VcIixcclxuICAgIFwibW5jXCI6IFwiTWFuY2h1XCIsXHJcbiAgICBcIm1kclwiOiBcIk1hbmRhcmluXCIsXHJcbiAgICBcIm1hblwiOiBcIk1hbmRpbmdvXCIsXHJcbiAgICBcIm1uaVwiOiBcIk1hbmlwdXJpXCIsXHJcbiAgICBcImd2XCI6IFwiTWFueFwiLFxyXG4gICAgXCJtaVwiOiBcIk1hb3JpXCIsXHJcbiAgICBcImFyblwiOiBcIk1hcHVjaGVcIixcclxuICAgIFwibXJcIjogXCJNYXJhdGhpXCIsXHJcbiAgICBcImNobVwiOiBcIk1hcmlcIixcclxuICAgIFwibWhcIjogXCJNYXJzaGFsbGVzZVwiLFxyXG4gICAgXCJtd3JcIjogXCJNYXJ3YXJpXCIsXHJcbiAgICBcIm1hc1wiOiBcIk1hc2FpXCIsXHJcbiAgICBcIm16blwiOiBcIk1hemFuZGVyYW5pXCIsXHJcbiAgICBcImJ5dlwiOiBcIk1lZHVtYmFcIixcclxuICAgIFwibWVuXCI6IFwiTWVuZGVcIixcclxuICAgIFwibXd2XCI6IFwiTWVudGF3YWlcIixcclxuICAgIFwibWVyXCI6IFwiTWVydVwiLFxyXG4gICAgXCJtZ29cIjogXCJNZXRhXFx1MDJiY1wiLFxyXG4gICAgXCJlc19NWFwiOiBcIk1leGljYW4gU3BhbmlzaFwiLFxyXG4gICAgXCJtaWNcIjogXCJNaWNtYWNcIixcclxuICAgIFwiZHVtXCI6IFwiTWlkZGxlIER1dGNoXCIsXHJcbiAgICBcImVubVwiOiBcIk1pZGRsZSBFbmdsaXNoXCIsXHJcbiAgICBcImZybVwiOiBcIk1pZGRsZSBGcmVuY2hcIixcclxuICAgIFwiZ21oXCI6IFwiTWlkZGxlIEhpZ2ggR2VybWFuXCIsXHJcbiAgICBcIm1nYVwiOiBcIk1pZGRsZSBJcmlzaFwiLFxyXG4gICAgXCJuYW5cIjogXCJNaW4gTmFuIENoaW5lc2VcIixcclxuICAgIFwibWluXCI6IFwiTWluYW5na2FiYXVcIixcclxuICAgIFwieG1mXCI6IFwiTWluZ3JlbGlhblwiLFxyXG4gICAgXCJtd2xcIjogXCJNaXJhbmRlc2VcIixcclxuICAgIFwibHVzXCI6IFwiTWl6b1wiLFxyXG4gICAgXCJhcl8wMDFcIjogXCJNb2Rlcm4gU3RhbmRhcmQgQXJhYmljXCIsXHJcbiAgICBcIm1vaFwiOiBcIk1vaGF3a1wiLFxyXG4gICAgXCJtZGZcIjogXCJNb2tzaGFcIixcclxuICAgIFwicm9fTURcIjogXCJNb2xkYXZpYW5cIixcclxuICAgIFwibG9sXCI6IFwiTW9uZ29cIixcclxuICAgIFwibW5cIjogXCJNb25nb2xpYW5cIixcclxuICAgIFwibWZlXCI6IFwiTW9yaXN5ZW5cIixcclxuICAgIFwiYXJ5XCI6IFwiTW9yb2NjYW4gQXJhYmljXCIsXHJcbiAgICBcIm1vc1wiOiBcIk1vc3NpXCIsXHJcbiAgICBcIm11bFwiOiBcIk11bHRpcGxlIExhbmd1YWdlc1wiLFxyXG4gICAgXCJtdWFcIjogXCJNdW5kYW5nXCIsXHJcbiAgICBcInR0dFwiOiBcIk11c2xpbSBUYXRcIixcclxuICAgIFwibXllXCI6IFwiTXllbmVcIixcclxuICAgIFwibmFxXCI6IFwiTmFtYVwiLFxyXG4gICAgXCJuYVwiOiBcIk5hdXJ1XCIsXHJcbiAgICBcIm52XCI6IFwiTmF2YWpvXCIsXHJcbiAgICBcIm5nXCI6IFwiTmRvbmdhXCIsXHJcbiAgICBcIm5hcFwiOiBcIk5lYXBvbGl0YW5cIixcclxuICAgIFwibmVcIjogXCJOZXBhbGlcIixcclxuICAgIFwibmV3XCI6IFwiTmV3YXJpXCIsXHJcbiAgICBcInNiYVwiOiBcIk5nYW1iYXlcIixcclxuICAgIFwibm5oXCI6IFwiTmdpZW1ib29uXCIsXHJcbiAgICBcImpnb1wiOiBcIk5nb21iYVwiLFxyXG4gICAgXCJ5cmxcIjogXCJOaGVlbmdhdHVcIixcclxuICAgIFwibmlhXCI6IFwiTmlhc1wiLFxyXG4gICAgXCJuaXVcIjogXCJOaXVlYW5cIixcclxuICAgIFwienh4XCI6IFwiTm8gbGluZ3Vpc3RpYyBjb250ZW50XCIsXHJcbiAgICBcIm5vZ1wiOiBcIk5vZ2FpXCIsXHJcbiAgICBcIm5kXCI6IFwiTm9ydGggTmRlYmVsZVwiLFxyXG4gICAgXCJmcnJcIjogXCJOb3J0aGVybiBGcmlzaWFuXCIsXHJcbiAgICBcInNlXCI6IFwiTm9ydGhlcm4gU2FtaVwiLFxyXG4gICAgXCJuc29cIjogXCJOb3J0aGVybiBTb3Rob1wiLFxyXG4gICAgXCJub1wiOiBcIk5vcndlZ2lhblwiLFxyXG4gICAgXCJuYlwiOiBcIk5vcndlZ2lhbiBCb2ttXFx1MDBlNWxcIixcclxuICAgIFwibm5cIjogXCJOb3J3ZWdpYW4gTnlub3Jza1wiLFxyXG4gICAgXCJub3ZcIjogXCJOb3ZpYWxcIixcclxuICAgIFwibnVzXCI6IFwiTnVlclwiLFxyXG4gICAgXCJueW1cIjogXCJOeWFtd2V6aVwiLFxyXG4gICAgXCJueVwiOiBcIk55YW5qYVwiLFxyXG4gICAgXCJueW5cIjogXCJOeWFua29sZVwiLFxyXG4gICAgXCJ0b2dcIjogXCJOeWFzYSBUb25nYVwiLFxyXG4gICAgXCJueW9cIjogXCJOeW9yb1wiLFxyXG4gICAgXCJuemlcIjogXCJOemltYVwiLFxyXG4gICAgXCJucW9cIjogXCJOXFx1MDJiY0tvXCIsXHJcbiAgICBcIm9jXCI6IFwiT2NjaXRhblwiLFxyXG4gICAgXCJvalwiOiBcIk9qaWJ3YVwiLFxyXG4gICAgXCJhbmdcIjogXCJPbGQgRW5nbGlzaFwiLFxyXG4gICAgXCJmcm9cIjogXCJPbGQgRnJlbmNoXCIsXHJcbiAgICBcImdvaFwiOiBcIk9sZCBIaWdoIEdlcm1hblwiLFxyXG4gICAgXCJzZ2FcIjogXCJPbGQgSXJpc2hcIixcclxuICAgIFwibm9uXCI6IFwiT2xkIE5vcnNlXCIsXHJcbiAgICBcInBlb1wiOiBcIk9sZCBQZXJzaWFuXCIsXHJcbiAgICBcInByb1wiOiBcIk9sZCBQcm92ZW5cXHUwMGU3YWxcIixcclxuICAgIFwib3JcIjogXCJPcml5YVwiLFxyXG4gICAgXCJvbVwiOiBcIk9yb21vXCIsXHJcbiAgICBcIm9zYVwiOiBcIk9zYWdlXCIsXHJcbiAgICBcIm9zXCI6IFwiT3NzZXRpY1wiLFxyXG4gICAgXCJvdGFcIjogXCJPdHRvbWFuIFR1cmtpc2hcIixcclxuICAgIFwicGFsXCI6IFwiUGFobGF2aVwiLFxyXG4gICAgXCJwZmxcIjogXCJQYWxhdGluZSBHZXJtYW5cIixcclxuICAgIFwicGF1XCI6IFwiUGFsYXVhblwiLFxyXG4gICAgXCJwaVwiOiBcIlBhbGlcIixcclxuICAgIFwicGRjXCI6IFwiUGVubnN5bHZhbmlhIEdlcm1hblwiLFxyXG4gICAgXCJmYVwiOiBcIlBlcnNpYW5cIixcclxuICAgIFwicGhuXCI6IFwiUGhvZW5pY2lhblwiLFxyXG4gICAgXCJwY2RcIjogXCJQaWNhcmRcIixcclxuICAgIFwicG1zXCI6IFwiUGllZG1vbnRlc2VcIixcclxuICAgIFwicGR0XCI6IFwiUGxhdXRkaWV0c2NoXCIsXHJcbiAgICBcInBvblwiOiBcIlBvaG5wZWlhblwiLFxyXG4gICAgXCJwbFwiOiBcIlBvbGlzaFwiLFxyXG4gICAgXCJwbnRcIjogXCJQb250aWNcIixcclxuICAgIFwicHRcIjogXCJQb3J0dWd1ZXNlXCIsXHJcbiAgICBcInByZ1wiOiBcIlBydXNzaWFuXCIsXHJcbiAgICBcInBhXCI6IFwiUHVuamFiaVwiLFxyXG4gICAgXCJxdVwiOiBcIlF1ZWNodWFcIixcclxuICAgIFwicm9cIjogXCJSb21hbmlhblwiLFxyXG4gICAgXCJybVwiOiBcIlJvbWFuc2hcIixcclxuICAgIFwicm9tXCI6IFwiUm9tYW55XCIsXHJcbiAgICBcInJvb3RcIjogXCJSb290XCIsXHJcbiAgICBcInJ1XCI6IFwiUnVzc2lhblwiLFxyXG4gICAgXCJyd2tcIjogXCJSd2FcIixcclxuICAgIFwic2FoXCI6IFwiU2FraGFcIixcclxuICAgIFwic2FtXCI6IFwiU2FtYXJpdGFuIEFyYW1haWNcIixcclxuICAgIFwic21cIjogXCJTYW1vYW5cIixcclxuICAgIFwic2NvXCI6IFwiU2NvdHNcIixcclxuICAgIFwiZ2RcIjogXCJTY290dGlzaCBHYWVsaWNcIixcclxuICAgIFwic2x5XCI6IFwiU2VsYXlhclwiLFxyXG4gICAgXCJzZWxcIjogXCJTZWxrdXBcIixcclxuICAgIFwic2VoXCI6IFwiU2VuYVwiLFxyXG4gICAgXCJzZWVcIjogXCJTZW5lY2FcIixcclxuICAgIFwic3JcIjogXCJTZXJiaWFuXCIsXHJcbiAgICBcInNoXCI6IFwiU2VyYm8tQ3JvYXRpYW5cIixcclxuICAgIFwic3JyXCI6IFwiU2VyZXJcIixcclxuICAgIFwic2VpXCI6IFwiU2VyaVwiLFxyXG4gICAgXCJrc2JcIjogXCJTaGFtYmFsYVwiLFxyXG4gICAgXCJzaG5cIjogXCJTaGFuXCIsXHJcbiAgICBcInNuXCI6IFwiU2hvbmFcIixcclxuICAgIFwiaWlcIjogXCJTaWNodWFuIFlpXCIsXHJcbiAgICBcInNjblwiOiBcIlNpY2lsaWFuXCIsXHJcbiAgICBcInNpZFwiOiBcIlNpZGFtb1wiLFxyXG4gICAgXCJibGFcIjogXCJTaWtzaWthXCIsXHJcbiAgICBcInN6bFwiOiBcIlNpbGVzaWFuXCIsXHJcbiAgICBcInpoX0hhbnNcIjogXCJTaW1wbGlmaWVkIENoaW5lc2VcIixcclxuICAgIFwic2RcIjogXCJTaW5kaGlcIixcclxuICAgIFwic2lcIjogXCJTaW5oYWxhXCIsXHJcbiAgICBcInNtc1wiOiBcIlNrb2x0IFNhbWlcIixcclxuICAgIFwiZGVuXCI6IFwiU2xhdmVcIixcclxuICAgIFwic2tcIjogXCJTbG92YWtcIixcclxuICAgIFwic2xcIjogXCJTbG92ZW5pYW5cIixcclxuICAgIFwieG9nXCI6IFwiU29nYVwiLFxyXG4gICAgXCJzb2dcIjogXCJTb2dkaWVuXCIsXHJcbiAgICBcInNvXCI6IFwiU29tYWxpXCIsXHJcbiAgICBcInNua1wiOiBcIlNvbmlua2VcIixcclxuICAgIFwiY2tiXCI6IFwiU29yYW5pIEt1cmRpc2hcIixcclxuICAgIFwiYXpiXCI6IFwiU291dGggQXplcmJhaWphbmlcIixcclxuICAgIFwibnJcIjogXCJTb3V0aCBOZGViZWxlXCIsXHJcbiAgICBcImFsdFwiOiBcIlNvdXRoZXJuIEFsdGFpXCIsXHJcbiAgICBcInNtYVwiOiBcIlNvdXRoZXJuIFNhbWlcIixcclxuICAgIFwic3RcIjogXCJTb3V0aGVybiBTb3Rob1wiLFxyXG4gICAgXCJlc1wiOiBcIlNwYW5pc2hcIixcclxuICAgIFwic3JuXCI6IFwiU3JhbmFuIFRvbmdvXCIsXHJcbiAgICBcInpnaFwiOiBcIlN0YW5kYXJkIE1vcm9jY2FuIFRhbWF6aWdodFwiLFxyXG4gICAgXCJzdWtcIjogXCJTdWt1bWFcIixcclxuICAgIFwic3V4XCI6IFwiU3VtZXJpYW5cIixcclxuICAgIFwic3VcIjogXCJTdW5kYW5lc2VcIixcclxuICAgIFwic3VzXCI6IFwiU3VzdVwiLFxyXG4gICAgXCJzd1wiOiBcIlN3YWhpbGlcIixcclxuICAgIFwic3NcIjogXCJTd2F0aVwiLFxyXG4gICAgXCJzdlwiOiBcIlN3ZWRpc2hcIixcclxuICAgIFwiZnJfQ0hcIjogXCJTd2lzcyBGcmVuY2hcIixcclxuICAgIFwiZ3N3XCI6IFwiU3dpc3MgR2VybWFuXCIsXHJcbiAgICBcImRlX0NIXCI6IFwiU3dpc3MgSGlnaCBHZXJtYW5cIixcclxuICAgIFwic3lyXCI6IFwiU3lyaWFjXCIsXHJcbiAgICBcInNoaVwiOiBcIlRhY2hlbGhpdFwiLFxyXG4gICAgXCJ0bFwiOiBcIlRhZ2Fsb2dcIixcclxuICAgIFwidHlcIjogXCJUYWhpdGlhblwiLFxyXG4gICAgXCJkYXZcIjogXCJUYWl0YVwiLFxyXG4gICAgXCJ0Z1wiOiBcIlRhamlrXCIsXHJcbiAgICBcInRseVwiOiBcIlRhbHlzaFwiLFxyXG4gICAgXCJ0bWhcIjogXCJUYW1hc2hla1wiLFxyXG4gICAgXCJ0YVwiOiBcIlRhbWlsXCIsXHJcbiAgICBcInRydlwiOiBcIlRhcm9rb1wiLFxyXG4gICAgXCJ0d3FcIjogXCJUYXNhd2FxXCIsXHJcbiAgICBcInR0XCI6IFwiVGF0YXJcIixcclxuICAgIFwidGVcIjogXCJUZWx1Z3VcIixcclxuICAgIFwidGVyXCI6IFwiVGVyZW5vXCIsXHJcbiAgICBcInRlb1wiOiBcIlRlc29cIixcclxuICAgIFwidGV0XCI6IFwiVGV0dW1cIixcclxuICAgIFwidGhcIjogXCJUaGFpXCIsXHJcbiAgICBcImJvXCI6IFwiVGliZXRhblwiLFxyXG4gICAgXCJ0aWdcIjogXCJUaWdyZVwiLFxyXG4gICAgXCJ0aVwiOiBcIlRpZ3JpbnlhXCIsXHJcbiAgICBcInRlbVwiOiBcIlRpbW5lXCIsXHJcbiAgICBcInRpdlwiOiBcIlRpdlwiLFxyXG4gICAgXCJ0bGlcIjogXCJUbGluZ2l0XCIsXHJcbiAgICBcInRwaVwiOiBcIlRvayBQaXNpblwiLFxyXG4gICAgXCJ0a2xcIjogXCJUb2tlbGF1XCIsXHJcbiAgICBcInRvXCI6IFwiVG9uZ2FuXCIsXHJcbiAgICBcImZpdFwiOiBcIlRvcm5lZGFsZW4gRmlubmlzaFwiLFxyXG4gICAgXCJ6aF9IYW50XCI6IFwiVHJhZGl0aW9uYWwgQ2hpbmVzZVwiLFxyXG4gICAgXCJ0a3JcIjogXCJUc2FraHVyXCIsXHJcbiAgICBcInRzZFwiOiBcIlRzYWtvbmlhblwiLFxyXG4gICAgXCJ0c2lcIjogXCJUc2ltc2hpYW5cIixcclxuICAgIFwidHNcIjogXCJUc29uZ2FcIixcclxuICAgIFwidG5cIjogXCJUc3dhbmFcIixcclxuICAgIFwidGN5XCI6IFwiVHVsdVwiLFxyXG4gICAgXCJ0dW1cIjogXCJUdW1idWthXCIsXHJcbiAgICBcImFlYlwiOiBcIlR1bmlzaWFuIEFyYWJpY1wiLFxyXG4gICAgXCJ0clwiOiBcIlR1cmtpc2hcIixcclxuICAgIFwidGtcIjogXCJUdXJrbWVuXCIsXHJcbiAgICBcInRydVwiOiBcIlR1cm95b1wiLFxyXG4gICAgXCJ0dmxcIjogXCJUdXZhbHVcIixcclxuICAgIFwidHl2XCI6IFwiVHV2aW5pYW5cIixcclxuICAgIFwidHdcIjogXCJUd2lcIixcclxuICAgIFwia2NnXCI6IFwiVHlhcFwiLFxyXG4gICAgXCJ1ZG1cIjogXCJVZG11cnRcIixcclxuICAgIFwidWdhXCI6IFwiVWdhcml0aWNcIixcclxuICAgIFwidWtcIjogXCJVa3JhaW5pYW5cIixcclxuICAgIFwidW1iXCI6IFwiVW1idW5kdVwiLFxyXG4gICAgXCJ1bmRcIjogXCJVbmtub3duIExhbmd1YWdlXCIsXHJcbiAgICBcImhzYlwiOiBcIlVwcGVyIFNvcmJpYW5cIixcclxuICAgIFwidXJcIjogXCJVcmR1XCIsXHJcbiAgICBcInVnXCI6IFwiVXlnaHVyXCIsXHJcbiAgICBcInV6XCI6IFwiVXpiZWtcIixcclxuICAgIFwidmFpXCI6IFwiVmFpXCIsXHJcbiAgICBcInZlXCI6IFwiVmVuZGFcIixcclxuICAgIFwidmVjXCI6IFwiVmVuZXRpYW5cIixcclxuICAgIFwidmVwXCI6IFwiVmVwc1wiLFxyXG4gICAgXCJ2aVwiOiBcIlZpZXRuYW1lc2VcIixcclxuICAgIFwidm9cIjogXCJWb2xhcFxcdTAwZmNrXCIsXHJcbiAgICBcInZyb1wiOiBcIlZcXHUwMGY1cm9cIixcclxuICAgIFwidm90XCI6IFwiVm90aWNcIixcclxuICAgIFwidnVuXCI6IFwiVnVuam9cIixcclxuICAgIFwid2FcIjogXCJXYWxsb29uXCIsXHJcbiAgICBcIndhZVwiOiBcIldhbHNlclwiLFxyXG4gICAgXCJ3YXJcIjogXCJXYXJheVwiLFxyXG4gICAgXCJ3YXNcIjogXCJXYXNob1wiLFxyXG4gICAgXCJndWNcIjogXCJXYXl1dVwiLFxyXG4gICAgXCJjeVwiOiBcIldlbHNoXCIsXHJcbiAgICBcInZsc1wiOiBcIldlc3QgRmxlbWlzaFwiLFxyXG4gICAgXCJmeVwiOiBcIldlc3Rlcm4gRnJpc2lhblwiLFxyXG4gICAgXCJtcmpcIjogXCJXZXN0ZXJuIE1hcmlcIixcclxuICAgIFwid2FsXCI6IFwiV29sYXl0dGFcIixcclxuICAgIFwid29cIjogXCJXb2xvZlwiLFxyXG4gICAgXCJ3dXVcIjogXCJXdSBDaGluZXNlXCIsXHJcbiAgICBcInhoXCI6IFwiWGhvc2FcIixcclxuICAgIFwiaHNuXCI6IFwiWGlhbmcgQ2hpbmVzZVwiLFxyXG4gICAgXCJ5YXZcIjogXCJZYW5nYmVuXCIsXHJcbiAgICBcInlhb1wiOiBcIllhb1wiLFxyXG4gICAgXCJ5YXBcIjogXCJZYXBlc2VcIixcclxuICAgIFwieWJiXCI6IFwiWWVtYmFcIixcclxuICAgIFwieWlcIjogXCJZaWRkaXNoXCIsXHJcbiAgICBcInlvXCI6IFwiWW9ydWJhXCIsXHJcbiAgICBcInphcFwiOiBcIlphcG90ZWNcIixcclxuICAgIFwiZGplXCI6IFwiWmFybWFcIixcclxuICAgIFwienphXCI6IFwiWmF6YVwiLFxyXG4gICAgXCJ6ZWFcIjogXCJaZWVsYW5kaWNcIixcclxuICAgIFwiemVuXCI6IFwiWmVuYWdhXCIsXHJcbiAgICBcInphXCI6IFwiWmh1YW5nXCIsXHJcbiAgICBcImdielwiOiBcIlpvcm9hc3RyaWFuIERhcmlcIixcclxuICAgIFwienVcIjogXCJadWx1XCIsXHJcbiAgICBcInp1blwiOiBcIlp1bmlcIlxyXG59XHJcblxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9jYS9jYS5kYXRhLmpzIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgSnVhbkNydXogb24gNC8xLzIwMTguXHJcbiAqL1xyXG5cclxuJChmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgd2luZG93LkNvbnRlbnRBcmVuYSA9IHdpbmRvdy5Db250ZW50QXJlbmEgfHwge307XHJcblxyXG4gICAgQ29udGVudEFyZW5hLk1vZGVsID0gQ29udGVudEFyZW5hLk1vZGVsIHx8IHt9O1xyXG5cclxuICAgIENvbnRlbnRBcmVuYS5Nb2RlbC5SaWdodFBhY2thZ2UgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIHRoaXMuaWQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5yaWdodHMgPSB7fTtcclxuICAgIH07XHJcblxyXG4gICAgQ29udGVudEFyZW5hLk1vZGVsLkRpc3RyaWJ1dGlvblBhY2thZ2UgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIHRoaXMuaWQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5wcm9kdWN0aW9uID0ge307XHJcbiAgICAgICAgdGhpcy50ZWNobmljYWwgPSB7fTtcclxuICAgIH07XHJcblxyXG4gICAgQ29udGVudEFyZW5hLk1vZGVsLlJpZ2h0ID0gZnVuY3Rpb24oKXtcclxuICAgICAgICB0aGlzLmlkID0gbnVsbDtcclxuICAgICAgICB0aGlzLm5hbWUgPSBudWxsO1xyXG4gICAgICAgIHRoaXMucmlnaHRJdGVtcyA9IHt9O1xyXG4gICAgfTtcclxuXHJcbiAgICBDb250ZW50QXJlbmEuTW9kZWwuUmlnaHRJdGVtID0gZnVuY3Rpb24oKXtcclxuICAgICAgICB0aGlzLmlkID0gbnVsbDtcclxuICAgICAgICB0aGlzLm5hbWUgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuaW5wdXRzID0gW107XHJcbiAgICB9O1xyXG5cclxuICAgIENvbnRlbnRBcmVuYS5Nb2RlbC5TZWxlY3RlZFJpZ2h0ID0gZnVuY3Rpb24oKXtcclxuICAgICAgICB0aGlzLnJpZ2h0ID0gbnVsbDtcclxuICAgICAgICB0aGlzLnJpZ2h0SXRlbSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5kaXN0cmlidXRpb25QYWNrYWdlID0gbnVsbDtcclxuICAgICAgICB0aGlzLmdyb3VwID0gbnVsbDtcclxuICAgICAgICB0aGlzLmlucHV0cyA9IFtdO1xyXG4gICAgfTtcclxuXHJcbiAgICBDb250ZW50QXJlbmEuTW9kZWwuU2FsZXNQYWNrYWdlID0gZnVuY3Rpb24oKXtcclxuXHJcbiAgICAgICAgdGhpcy5zYWxlc01ldGhvZCA9ICBudWxsO1xyXG4gICAgICAgIHRoaXMuZmVlID0gbnVsbDtcclxuICAgICAgICB0aGlzLmN1cnJlbmN5ID0gbnVsbDtcclxuICAgICAgICB0aGlzLmlkID0gbnVsbDtcclxuICAgICAgICB0aGlzLm5hbWUgPSBudWxsO1xyXG4gICAgICAgIHRoaXMudGVycml0b3JpZXMgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRUZXJyaXRvcmllcyA9IFtdO1xyXG4gICAgICAgIHRoaXMuZXhjbHVkZWRUZXJyaXRvcmllcyA9IFtdO1xyXG4gICAgICAgIHRoaXMudGVycml0b3J5QmlkcyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc2VsbEFzUGFja2FnZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICB0aGlzLnZhbGlkYXRlID0gKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgdmFyIGRlc2NyaXB0aW9uID0gXCJTYWxlcyBQYWNrYWdlIFwiICsgdGhpcy5pZCArIFwiOiBcIixcclxuICAgICAgICAgICAgICAgIGhhc0Vycm9ycyA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgaWYgKCAhIHRoaXMuY3VycmVuY3kgKSB7XHJcbiAgICAgICAgICAgICAgICBoYXNFcnJvcnMgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb24gKz0gXCJDdXJyZW5jeSBjYW4ndCBiZSBlbXB0eS4gXCI7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICggISB0aGlzLmZlZSApIHtcclxuICAgICAgICAgICAgICAgIGhhc0Vycm9ycyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbiArPSBcIkZlZSBjYW4ndCBiZSBlbXB0eS4gXCI7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICggISB0aGlzLnRlcnJpdG9yaWVzICkge1xyXG4gICAgICAgICAgICAgICAgaGFzRXJyb3JzID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uICs9IFwiVGVycml0b3JpZXMgY2FuJ3QgYmUgZW1wdHkuIFwiO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoICEgdGhpcy5zYWxlc01ldGhvZCApIHtcclxuICAgICAgICAgICAgICAgIGhhc0Vycm9ycyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbiArPSBcIlNhbGVzIG1ldGhvZCBjYW4ndCBiZSBlbXB0eS4gXCI7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBoYXNFcnJvcnM6IGhhc0Vycm9ycyxcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uIDogZGVzY3JpcHRpb25cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9O1xyXG5cclxuICAgIENvbnRlbnRBcmVuYS5Nb2RlbC5Db250ZW50ID0gZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIHRoaXMuc3BvcnQgPSB7fTtcclxuICAgICAgICB0aGlzLnNwb3J0cyA9IFtdO1xyXG4gICAgICAgIHRoaXMudG91cm5hbWVudCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5jYXRlZ29yeSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5ldmVudFR5cGUgPSBcImRhdGFiYXNlXCI7XHJcbiAgICAgICAgdGhpcy5zYWxlc1BhY2thZ2VzID0ge307XHJcbiAgICAgICAgdGhpcy5pbnN0YWxsbWVudHMgPSB7fTtcclxuXHJcbiAgICAgICAgdGhpcy5nZXRUaXRsZSA9ICgpID0+IHtcclxuXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHRpdGxlID0gXCJcIjtcclxuXHJcbiAgICAgICAgICAgIGlmICggdGhpcy5zcG9ydHMubGVuZ3RoID4gMCApe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zcG9ydHMuZm9yRWFjaChmdW5jdGlvbiAoc3BvcnQsIGluZGV4LCBhcnJheSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlICs9IHNwb3J0LnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICggKGluZGV4KzEpICE9IGFycmF5Lmxlbmd0aCApIHRpdGxlICs9IFwiLCBcIlxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICggdGhpcy5ldmVudFR5cGUgPT09IFwiY3VzdG9tXCIgKXtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICggdGhpcy5ldmVudFR5cGUgPT09IFwiZGF0YWJhc2VcIiApe1xyXG4gICAgICAgICAgICAgICAgaWYgKCB0aGlzLnNwb3J0ICE9PSBudWxsICkgdGl0bGUgKz0gdGhpcy5zcG9ydC52YWx1ZTtcclxuICAgICAgICAgICAgICAgIGlmICggdGhpcy5jYXRlZ29yeSAhPT0gbnVsbCApIHRpdGxlICs9IFwiIC0gXCIgKyB0aGlzLmNhdGVnb3J5LnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgaWYgKCB0aGlzLnRvdXJuYW1lbnQgIT09IG51bGwgKSB0aXRsZSArPSBcIiAtIFwiICsgdGhpcy50b3VybmFtZW50LnZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoIHRoaXMuc2Vhc29ucyAmJiB0aGlzLnNlYXNvbnMubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgICAgICB0aXRsZSArPSBcIiBcIiArIHRoaXMuc2Vhc29ucy5tYXAoICggc2Vhc29uICkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB2YWx1ZXMgPSBzZWFzb24udmFsdWUuc3BsaXQoXCIgXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZXNbdmFsdWVzLmxlbmd0aCAtIDFdXHJcbiAgICAgICAgICAgICAgICB9KS5qb2luKFwiIC0gXCIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdGl0bGU7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgd2F0Y2godGhpcywgXCJzcG9ydHNcIiwgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJVcGRhdGluZyBzcG9ydHNcIiwgYXJndW1lbnRzKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgd2F0Y2godGhpcywgXCJldmVudFR5cGVcIiwgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJVcGRhdGluZyBldmVudFR5cGVcIiwgYXJndW1lbnRzKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9O1xyXG5cclxufSk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L2NhL2NhLm1vZGVscy5qcyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IEp1YW5DcnV6IG9uIDQvMS8yMDE4LlxyXG4gKi9cclxuXHJcbndpbmRvdy5Db250ZW50QXJlbmEgPSB3aW5kb3cuQ29udGVudEFyZW5hIHx8IHt9O1xyXG5cclxuQ29udGVudEFyZW5hLlV0aWxzID0ge1xyXG4gICAgYWRkUmVnaW9uQmVoYXZpb3VyKHNlbGVjdG9yKSB7XHJcblxyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogaG9zdHVybCArIFwidjEvZmVlZC90ZXN0XCIsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG5cclxuICAgICAgICAgICAgICAgIHJlc3BvbnNlLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKGEubmFtZSA+IGIubmFtZSkgPyAxIDogKChiLm5hbWUgPiBhLm5hbWUpID8gLTEgOiAwKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICQoc2VsZWN0b3IpLmh0bWwoXCJcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAgICAgKiBAcGFyYW0ge3sgY291bnRyeV9jb2RlOiBzdHJpbmcgfX0gdlxyXG4gICAgICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgICAgICAkLmVhY2gocmVzcG9uc2UsIGZ1bmN0aW9uIChrLCB2KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBvcHRpb24gPSAnPG9wdGlvbiB2YWx1ZT0nICsgdi5jb3VudHJ5X2NvZGUgKyAnPicgKyB2Lm5hbWUgKyAnPC9vcHRpb24+JztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJChzZWxlY3RvcikuZWFjaChmdW5jdGlvbiAoa2V5LCBzZWxlY3QpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChzZWxlY3QpLmFwcGVuZChvcHRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICQoc2VsZWN0b3IpLmNob3Nlbih7d2lkdGg6IFwiNTAlXCJ9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBhZGRMYW5ndWFnZUJlaGF2aW91ciggc2VsZWN0b3IgKXtcclxuXHJcbiAgICAgICAgJChzZWxlY3RvcikuZWFjaChmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSAkKHRoaXMpO1xyXG5cclxuICAgICAgICAgICAgaWYgKF90aGlzLmRhdGEoXCJjaG9zZW5cIikgIT09IHVuZGVmaW5lZCApIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICQuZWFjaChDb250ZW50QXJlbmEuTGFuZ3VhZ2VzLlNob3J0LCBmdW5jdGlvbihrLCB2KXtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgb3B0aW9uID0gJzxvcHRpb24gdmFsdWU9JyArIGsgKyAnPicgKyB2ICsgJzwvb3B0aW9uPic7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5hcHBlbmQob3B0aW9uKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBfdGhpcy5jaG9zZW4oKTtcclxuXHJcbiAgICAgICAgICAgIF90aGlzLmNob3NlbigpLmNoYW5nZShmdW5jdGlvbiAoZSwgb3B0KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAob3B0LnNlbGVjdGVkICYmIG9wdC5zZWxlY3RlZCA9PT0gXCJhbGxcIil7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmh0bWwoXCJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgJC5lYWNoKENvbnRlbnRBcmVuYS5MYW5ndWFnZXMuTG9uZywgZnVuY3Rpb24oaywgdil7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgb3B0aW9uID0gJzxvcHRpb24gdmFsdWU9JyArIGsgKyAnPicgKyB2ICsgJzwvb3B0aW9uPic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmFwcGVuZChvcHRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy50cmlnZ2VyKFwiY2hvc2VuOnVwZGF0ZWRcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuICAgIGlzQVBJQXZhaWxhYmxlKCkge1xyXG4gICAgICAgIC8vIENoZWNrIGZvciB0aGUgdmFyaW91cyBGaWxlIEFQSSBzdXBwb3J0LlxyXG4gICAgICAgIGlmICh3aW5kb3cuRmlsZSAmJiB3aW5kb3cuRmlsZVJlYWRlciAmJiB3aW5kb3cuRmlsZUxpc3QgJiYgd2luZG93LkJsb2IpIHtcclxuICAgICAgICAgICAgLy8gR3JlYXQgc3VjY2VzcyEgQWxsIHRoZSBGaWxlIEFQSXMgYXJlIHN1cHBvcnRlZC5cclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gc291cmNlOiBGaWxlIEFQSSBhdmFpbGFiaWxpdHkgLSBodHRwOi8vY2FuaXVzZS5jb20vI2ZlYXQ9ZmlsZWFwaVxyXG4gICAgICAgICAgICAvLyBzb3VyY2U6IDxvdXRwdXQ+IGF2YWlsYWJpbGl0eSAtIGh0dHA6Ly9odG1sNWRvY3Rvci5jb20vdGhlLW91dHB1dC1lbGVtZW50L1xyXG4gICAgICAgICAgICBkb2N1bWVudC53cml0ZWxuKCdUaGUgSFRNTDUgQVBJcyB1c2VkIGluIHRoaXMgZm9ybSBhcmUgb25seSBhdmFpbGFibGUgaW4gdGhlIGZvbGxvd2luZyBicm93c2Vyczo8YnIgLz4nKTtcclxuICAgICAgICAgICAgLy8gNi4wIEZpbGUgQVBJICYgMTMuMCA8b3V0cHV0PlxyXG4gICAgICAgICAgICBkb2N1bWVudC53cml0ZWxuKCcgLSBHb29nbGUgQ2hyb21lOiAxMy4wIG9yIGxhdGVyPGJyIC8+Jyk7XHJcbiAgICAgICAgICAgIC8vIDMuNiBGaWxlIEFQSSAmIDYuMCA8b3V0cHV0PlxyXG4gICAgICAgICAgICBkb2N1bWVudC53cml0ZWxuKCcgLSBNb3ppbGxhIEZpcmVmb3g6IDYuMCBvciBsYXRlcjxiciAvPicpO1xyXG4gICAgICAgICAgICAvLyAxMC4wIEZpbGUgQVBJICYgMTAuMCA8b3V0cHV0PlxyXG4gICAgICAgICAgICBkb2N1bWVudC53cml0ZWxuKCcgLSBJbnRlcm5ldCBFeHBsb3JlcjogTm90IHN1cHBvcnRlZCAocGFydGlhbCBzdXBwb3J0IGV4cGVjdGVkIGluIDEwLjApPGJyIC8+Jyk7XHJcbiAgICAgICAgICAgIC8vID8gRmlsZSBBUEkgJiA1LjEgPG91dHB1dD5cclxuICAgICAgICAgICAgZG9jdW1lbnQud3JpdGVsbignIC0gU2FmYXJpOiBOb3Qgc3VwcG9ydGVkPGJyIC8+Jyk7XHJcbiAgICAgICAgICAgIC8vID8gRmlsZSBBUEkgJiA5LjIgPG91dHB1dD5cclxuICAgICAgICAgICAgZG9jdW1lbnQud3JpdGVsbignIC0gT3BlcmE6IE5vdCBzdXBwb3J0ZWQnKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBhZGRPcmRpbmFsKG4pIHtcclxuICAgICAgICB2YXIgc3RyID0gbi50b1N0cmluZygpLnNsaWNlKC0xKSxcclxuICAgICAgICAgICAgb3JkID0gJyc7XHJcbiAgICAgICAgc3dpdGNoIChzdHIpIHtcclxuICAgICAgICAgICAgY2FzZSAnMSc6XHJcbiAgICAgICAgICAgICAgICBvcmQgPSAnc3QnO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJzInOlxyXG4gICAgICAgICAgICAgICAgb3JkID0gJ25kJztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICczJzpcclxuICAgICAgICAgICAgICAgIG9yZCA9ICdyZCc7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnNCc6XHJcbiAgICAgICAgICAgIGNhc2UgJzUnOlxyXG4gICAgICAgICAgICBjYXNlICc2JzpcclxuICAgICAgICAgICAgY2FzZSAnNyc6XHJcbiAgICAgICAgICAgIGNhc2UgJzgnOlxyXG4gICAgICAgICAgICBjYXNlICc5JzpcclxuICAgICAgICAgICAgY2FzZSAnMCc6XHJcbiAgICAgICAgICAgICAgICBvcmQgPSAndGgnO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuICsgb3JkO1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB2YWx1ZVxyXG4gICAgICogQHBhcmFtIGFyclxyXG4gICAgICogQHBhcmFtIHByb3BcclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAgICAgKi9cclxuICAgIGdldEluZGV4ICh2YWx1ZSwgYXJyLCBwcm9wKSB7XHJcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZihhcnJbaV1bcHJvcF0gPT09IHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gLTE7IC8vdG8gaGFuZGxlIHRoZSBjYXNlIHdoZXJlIHRoZSB2YWx1ZSBkb2Vzbid0IGV4aXN0XHJcbiAgICB9XHJcblxyXG59O1xyXG5cclxuXHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L2NhL2NhLnV0aWxzLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==