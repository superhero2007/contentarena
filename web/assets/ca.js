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
    },
    saveContentAsInactive: function saveContentAsInactive(content) {
        var deferred = jQuery.Deferred(),
            _this = this;

        $.ajax({
            url: envhosturl + "api/listing/save",
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
    saveContentAsActive: function saveContentAsActive(content) {
        var deferred = jQuery.Deferred(),
            _this = this;

        $.ajax({
            url: envhosturl + "api/listing/publish",
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
    sendMessage: function sendMessage(message) {
        var deferred = jQuery.Deferred(),
            _this = this;

        $.ajax({
            url: envhosturl + "api/messages/send",
            type: "POST",
            data: JSON.stringify(message),
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
    getUserInfo: function getUserInfo() {
        var deferred = jQuery.Deferred(),
            _this = this;

        $.ajax({
            url: envhosturl + "api/user/info",
            type: "POST",
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
    getCompanyUsers: function getCompanyUsers() {
        var deferred = jQuery.Deferred(),
            _this = this;

        $.ajax({
            url: envhosturl + "api/company/users",
            type: "POST",
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
    updateCompany: function updateCompany(company) {
        var deferred = jQuery.Deferred(),
            _this = this;

        $.ajax({
            url: envhosturl + "api/company/update",
            type: "POST",
            data: JSON.stringify({ company: company }),
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
    updatePassword: function updatePassword(data) {
        var deferred = jQuery.Deferred(),
            _this = this;

        $.ajax({
            url: envhosturl + "api/user/password",
            type: "POST",
            data: JSON.stringify(data),
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
    updateUser: function updateUser(user) {
        var deferred = jQuery.Deferred(),
            _this = this;

        $.ajax({
            url: envhosturl + "api/user/update",
            type: "POST",
            data: JSON.stringify({ user: user }),
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
    getThread: function getThread(customId) {
        var deferred = jQuery.Deferred(),
            _this = this;

        $.ajax({
            url: envhosturl + "api/messages/thread",
            type: "POST",
            data: JSON.stringify({ customId: customId }),
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
    getThreads: function getThreads() {
        var deferred = jQuery.Deferred(),
            _this = this;

        $.ajax({
            url: envhosturl + "api/messages/threads",
            type: "POST",
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
    placeBid: function placeBid(bid) {
        var deferred = jQuery.Deferred(),
            _this = this;

        $.ajax({
            url: envhosturl + "api/bid/place",
            type: "POST",
            data: JSON.stringify(bid),
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
    acceptBid: function acceptBid(bid, signature) {
        var deferred = jQuery.Deferred(),
            _this = this;

        bid.signature = signature;

        $.ajax({
            url: envhosturl + "api/bid/accept",
            type: "POST",
            data: JSON.stringify(bid),
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
    rejectBid: function rejectBid(bid) {
        var deferred = jQuery.Deferred(),
            _this = this;

        $.ajax({
            url: envhosturl + "api/bid/reject",
            type: "POST",
            data: JSON.stringify(bid),
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
    removeBid: function removeBid(bid) {
        var deferred = jQuery.Deferred(),
            _this = this;

        $.ajax({
            url: envhosturl + "api/bid/remove",
            type: "POST",
            data: JSON.stringify(bid),
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
    saveTmpFile: function saveTmpFile(files) {
        var deferred = jQuery.Deferred(),
            _this = this;

        var data = new FormData();
        data.append('file', files[0]);

        $.ajax({
            url: envhosturl + "content/save/file",
            type: "POST",
            data: data,
            processData: false,
            contentType: false,
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
    },
    getDraftListings: function getDraftListings() {
        var deferred = jQuery.Deferred();

        $.ajax({
            url: envhosturl + "api/listings/draft",
            type: "POST",
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
    getInactiveListings: function getInactiveListings() {
        var deferred = jQuery.Deferred();

        $.ajax({
            url: envhosturl + "api/listings/inactive",
            type: "POST",
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
    getActiveListings: function getActiveListings() {
        var deferred = jQuery.Deferred();

        $.ajax({
            url: envhosturl + "api/listings/active",
            type: "POST",
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
    getExpiredListings: function getExpiredListings() {
        var deferred = jQuery.Deferred();

        $.ajax({
            url: envhosturl + "api/listings/expired",
            type: "POST",
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
    removeListing: function removeListing(customId) {
        var deferred = jQuery.Deferred(),
            _this = this;

        $.ajax({
            url: envhosturl + "api/listings/remove",
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
    },
    duplicateListing: function duplicateListing(customId) {
        var deferred = jQuery.Deferred(),
            _this = this;

        $.ajax({
            url: envhosturl + "api/listings/duplicate",
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
    },
    deactivateListing: function deactivateListing(customId) {
        var deferred = jQuery.Deferred(),
            _this = this;

        $.ajax({
            url: envhosturl + "api/listings/deactivate",
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
    },
    getClosedDeals: function getClosedDeals() {
        var deferred = jQuery.Deferred();

        $.ajax({
            url: envhosturl + "api/bid/closed",
            type: "POST",
            data: {},
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
    getAllDeals: function getAllDeals() {
        var deferred = jQuery.Deferred();

        $.ajax({
            url: envhosturl + "api/bid/all",
            type: "POST",
            data: {},
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
    getPendingDeals: function getPendingDeals() {
        var deferred = jQuery.Deferred();

        $.ajax({
            url: envhosturl + "api/bid/pending",
            type: "POST",
            data: {},
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
    getRejectedDeals: function getRejectedDeals() {
        var deferred = jQuery.Deferred();

        $.ajax({
            url: envhosturl + "api/bid/rejected",
            type: "POST",
            data: {},
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
    getWatchlistListings: function getWatchlistListings() {
        var deferred = jQuery.Deferred(),
            _this = this;

        $.ajax({
            url: envhosturl + "api/listings/watchlist",
            type: "POST",
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
    getJsonContent: function getJsonContent(filter) {
        var deferred = jQuery.Deferred();

        $.ajax({
            url: envhosturl + "listings/marketplace",
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
            url: envhosturl + "api/search/countries/all",
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
    getActiveSports: function getActiveSports() {
        var deferred = jQuery.Deferred();
        var _this = this;
        $.ajax({
            url: envhosturl + "api/search/sports/active",
            type: "POST",
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
    getCountriesFull: function getCountriesFull() {
        var deferred = jQuery.Deferred();
        var _this = this;
        $.ajax({
            url: envhosturl + "api/search/countries/full",
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
            url: envhosturl + "api/search/territories",
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
            url: envhosturl + "api/search/rights",
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
            url: envhosturl + "api/search/rights-package",
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
            url: externalApiUrl + "v1/feed/sports",
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
            url: externalApiUrl + "v1/feed/tournaments",
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
            url: externalApiUrl + "v1/feed/seasons",
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
            url: externalApiUrl + "v1/feed/schedules",
            type: "POST",
            data: { id: seasonId },
            /**
             * @param {{tournaments:{tournament:Array}}} response
             */
            success: function success(response) {

                var list = {};

                if (response.sport_events === undefined || response.sport_events.sport_event === undefined) return false;

                response.sport_events.sport_event.forEach(function (item) {

                    var round = item.tournament_round ? item.tournament_round['@attributes'] : null;

                    if (!round) return;

                    var name = round.number ? "round_" + round.number : round.name;

                    if (!list[name]) list[name] = {};

                    if (!list[name].matches) list[name].matches = new Map();

                    list[name].matches.set(item['@attributes'].id, {
                        scheduled: item['@attributes'].scheduled,
                        externalId: item['@attributes'].id,
                        status: item['@attributes'].status,
                        tournamentRound: round,
                        competitors: item.competitors ? item.competitors.competitor.map(function (competitor) {
                            return competitor['@attributes'];
                        }) : null
                    });
                });

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
            url: envhosturl + 'api/search/tournament',
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
            url: envhosturl + "api/watchlist/add",
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

/***/ "./src/AppBundle/Resources/public/javascript/ca/ca.utils.js":
/*!******************************************************************!*\
  !*** ./src/AppBundle/Resources/public/javascript/ca/ca.utils.js ***!
  \******************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

/**
 * Created by JuanCruz on 4/1/2018.
 */

window.ContentArena = window.ContentArena || {};
ContentArena.Utils = {
    contentParserFromServer: function contentParserFromServer(content) {

        if (content.parsed) return content;

        var sort = true;

        if (content.extraData) {
            Object.entries(content.extraData).forEach(function (_ref) {
                var _ref2 = _slicedToArray(_ref, 2),
                    key = _ref2[0],
                    value = _ref2[1];

                return content[key] = value;
            });
        }

        content.tournament = content.tournament ? Array.isArray(content.tournament) ? content.tournament : [content.tournament] : [];
        content.sportCategory = content.sportCategory ? Array.isArray(content.sportCategory) ? content.sportCategory : [content.sportCategory] : [];

        if (content.selectedRightsBySuperRight) {
            content.rightsPackage.forEach(function (rp) {
                rp.selectedRights = content.selectedRightsBySuperRight[rp.id]['items'];
                rp.exclusive = content.selectedRightsBySuperRight[rp.id]['exclusive'];
            });
        }

        if (content.fixturesBySeason) {
            content.seasons.forEach(function (s, i) {
                s.fixtures = content.fixturesBySeason[i];
            });
        }

        if (content.salesPackages) {
            content.salesPackages.forEach(function (sp) {
                if (sp.salesMethod) sp.salesMethod = sp.salesMethod.name;
                if (sp.excludedCountries) sp.excludedTerritories = sp.excludedCountries.map(function (t) {
                    return { label: t.name, value: t.name };
                });
                if (sp.territories) sp.territories = sp.territories.map(function (t) {
                    return { label: t.name, value: t.name };
                });
                if (!sp.territories) sort = false;
            });
            if (sort) content.salesPackages.sort(this.sortSalesPackages).reverse();
        }
        content.step = Number(content.step);
        content.parsed = true;

        return content;
    },
    sortSalesPackages: function sortSalesPackages(a, b) {
        var c = function c(a, b) {
            return a > b ? 1 : b > a ? -1 : 0;
        };
        return c(a.territories.length, b.territories.length) || c(b.name, a.name);
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

/***/ }),

/***/ 1:
/*!************************************************************************************************************************************************************************************************************************************************************!*\
  !*** multi ./src/AppBundle/Resources/public/javascript/ca/ca.api.js ./src/AppBundle/Resources/public/javascript/ca/ca.api.content.js ./src/AppBundle/Resources/public/javascript/ca/ca.data.js ./src/AppBundle/Resources/public/javascript/ca/ca.utils.js ***!
  \************************************************************************************************************************************************************************************************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./src/AppBundle/Resources/public/javascript/ca/ca.api.js */"./src/AppBundle/Resources/public/javascript/ca/ca.api.js");
__webpack_require__(/*! ./src/AppBundle/Resources/public/javascript/ca/ca.api.content.js */"./src/AppBundle/Resources/public/javascript/ca/ca.api.content.js");
__webpack_require__(/*! ./src/AppBundle/Resources/public/javascript/ca/ca.data.js */"./src/AppBundle/Resources/public/javascript/ca/ca.data.js");
module.exports = __webpack_require__(/*! ./src/AppBundle/Resources/public/javascript/ca/ca.utils.js */"./src/AppBundle/Resources/public/javascript/ca/ca.utils.js");


/***/ })

},[1]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9jYS9jYS5hcGkuY29udGVudC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9jYS9jYS5hcGkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvY2EvY2EuZGF0YS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9jYS9jYS51dGlscy5qcyJdLCJuYW1lcyI6WyJfX2FwaVN0b3JlIiwidG91cm5hbWVudHMiLCJ3aW5kb3ciLCJDb250ZW50QXJlbmEiLCJDb250ZW50QXBpIiwic2F2ZUNvbnRlbnRBc0RyYWZ0IiwiY29udGVudCIsImRlZmVycmVkIiwialF1ZXJ5IiwiRGVmZXJyZWQiLCJfdGhpcyIsIiQiLCJhamF4IiwidXJsIiwiZW52aG9zdHVybCIsInR5cGUiLCJkYXRhIiwiSlNPTiIsInN0cmluZ2lmeSIsImNvbnRlbnRUeXBlIiwic3VjY2VzcyIsInJlc3BvbnNlIiwicmVzb2x2ZSIsImVycm9yIiwic3RhdHVzIiwicmVqZWN0IiwicHJvbWlzZSIsInNhdmVDb250ZW50QXNJbmFjdGl2ZSIsInNhdmVDb250ZW50QXNBY3RpdmUiLCJzZW5kTWVzc2FnZSIsIm1lc3NhZ2UiLCJnZXRVc2VySW5mbyIsImdldENvbXBhbnlVc2VycyIsInVwZGF0ZUNvbXBhbnkiLCJjb21wYW55IiwidXBkYXRlUGFzc3dvcmQiLCJ1cGRhdGVVc2VyIiwidXNlciIsImdldFRocmVhZCIsImN1c3RvbUlkIiwiZ2V0VGhyZWFkcyIsInBsYWNlQmlkIiwiYmlkIiwiYWNjZXB0QmlkIiwic2lnbmF0dXJlIiwicmVqZWN0QmlkIiwicmVtb3ZlQmlkIiwic2F2ZVRtcEZpbGUiLCJmaWxlcyIsIkZvcm1EYXRhIiwiYXBwZW5kIiwicHJvY2Vzc0RhdGEiLCJnZXRCeUN1c3RvbUlkIiwiZ2V0RHJhZnRMaXN0aW5ncyIsImdldEluYWN0aXZlTGlzdGluZ3MiLCJnZXRBY3RpdmVMaXN0aW5ncyIsImdldEV4cGlyZWRMaXN0aW5ncyIsInJlbW92ZUxpc3RpbmciLCJkdXBsaWNhdGVMaXN0aW5nIiwiZGVhY3RpdmF0ZUxpc3RpbmciLCJnZXRDbG9zZWREZWFscyIsImdldEFsbERlYWxzIiwiZ2V0UGVuZGluZ0RlYWxzIiwiZ2V0UmVqZWN0ZWREZWFscyIsImdldFdhdGNobGlzdExpc3RpbmdzIiwiQXBpIiwic29ydEJ5TGFiZWwiLCJhIiwiYiIsIm5hbWUiLCJzb3J0QnlTcG9ydCIsInNwb3J0Iiwic3BvcnRDYXRlZ29yeSIsInByZXBhcmVMaXN0IiwibGlzdCIsImNhdGVnb3J5SWQiLCJtYXAiLCJpdGVtIiwiY2F0ZWdvcnkiLCJpZCIsImV4dGVybmFsSWQiLCJzb3J0IiwiZ2V0Q29udGVudCIsImZpbHRlciIsImdldEpzb25Db250ZW50Iiwic2F2ZUZpbHRlciIsImdldENvdW50cmllcyIsImdldEFjdGl2ZVNwb3J0cyIsImdldENvdW50cmllc0Z1bGwiLCJnZXRUZXJyaXRvcmllcyIsImdldFJpZ2h0cyIsInJpZ2h0c1BhY2thZ2UiLCJncm91cCIsImdldFJpZ2h0c1BhY2thZ2UiLCJnZXRTcG9ydHMiLCJleHRlcm5hbEFwaVVybCIsInNwb3J0cyIsImdldENvbnRlbnREZXRhaWxzIiwiZ2V0UGVuZGluZ0xpc3RpbmdzIiwiZ2V0Q2F0ZWdvcmllcyIsInNwb3J0SWQiLCJjYXRzIiwiZ2V0VG91cm5hbWVudHMiLCJkb25lIiwidG91cm5hbWVudCIsImluZGV4T2YiLCJwdXNoIiwidW5kZWZpbmVkIiwiZ2V0U2Vhc29ucyIsInRvdXJuYW1lbnRJZCIsInNlYXNvbnMiLCJzZWFzb24iLCJpc0FycmF5IiwiZW5kRGF0ZSIsImVuZF9kYXRlIiwic3RhcnREYXRlIiwic3RhcnRfZGF0ZSIsInRvdXJuYW1lbnRfaWQiLCJ5ZWFyIiwicmV2ZXJzZSIsImdldFNjaGVkdWxlIiwic2Vhc29uSWQiLCJzcG9ydF9ldmVudHMiLCJzcG9ydF9ldmVudCIsImZvckVhY2giLCJyb3VuZCIsInRvdXJuYW1lbnRfcm91bmQiLCJudW1iZXIiLCJtYXRjaGVzIiwiTWFwIiwic2V0Iiwic2NoZWR1bGVkIiwidG91cm5hbWVudFJvdW5kIiwiY29tcGV0aXRvcnMiLCJjb21wZXRpdG9yIiwic2VhcmNoQ29tcGV0aXRpb24iLCJyZXF1ZXN0IiwidHJhZGl0aW9uYWwiLCJkYXRhVHlwZSIsIndhdGNobGlzdCIsIkRhdGEiLCJMYW5ndWFnZXMiLCJUb3BTcG9ydHMiLCJGdWxsU3BvcnRzIiwiQ291bnRyaWVzIiwiU2hvcnQiLCJMb25nIiwiVXRpbHMiLCJjb250ZW50UGFyc2VyRnJvbVNlcnZlciIsInBhcnNlZCIsImV4dHJhRGF0YSIsIk9iamVjdCIsImVudHJpZXMiLCJrZXkiLCJ2YWx1ZSIsIkFycmF5Iiwic2VsZWN0ZWRSaWdodHNCeVN1cGVyUmlnaHQiLCJycCIsInNlbGVjdGVkUmlnaHRzIiwiZXhjbHVzaXZlIiwiZml4dHVyZXNCeVNlYXNvbiIsInMiLCJpIiwiZml4dHVyZXMiLCJzYWxlc1BhY2thZ2VzIiwic3AiLCJzYWxlc01ldGhvZCIsImV4Y2x1ZGVkQ291bnRyaWVzIiwiZXhjbHVkZWRUZXJyaXRvcmllcyIsImxhYmVsIiwidCIsInRlcnJpdG9yaWVzIiwic29ydFNhbGVzUGFja2FnZXMiLCJzdGVwIiwiTnVtYmVyIiwiYyIsImxlbmd0aCIsImlzQVBJQXZhaWxhYmxlIiwiRmlsZSIsIkZpbGVSZWFkZXIiLCJGaWxlTGlzdCIsIkJsb2IiLCJkb2N1bWVudCIsIndyaXRlbG4iLCJhZGRPcmRpbmFsIiwibiIsInN0ciIsInRvU3RyaW5nIiwic2xpY2UiLCJvcmQiLCJnZXRJbmRleCIsImFyciIsInByb3AiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztBQUlBLElBQUlBLGFBQWE7QUFDYkMsaUJBQWM7QUFERCxDQUFqQjs7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RSxRQUFGLEdBQWFDLEtBQWIsQ0FBbUIsQ0FBQyxDQUFwQixDQUFWO0FBQUEsWUFDSUMsTUFBTSxFQURWO0FBRUEsZ0JBQVFILEdBQVI7QUFDSSxpQkFBSyxHQUFMO0FBQ0lHLHNCQUFNLElBQU47QUFDQTtBQUNKLGlCQUFLLEdBQUw7QUFDSUEsc0JBQU0sSUFBTjtBQUNBO0FBQ0osaUJBQUssR0FBTDtBQUNJQSxzQkFBTSxJQUFOO0FBQ0E7QUFDSixpQkFBSyxHQUFMO0FBQ0EsaUJBQUssR0FBTDtBQUNBLGlCQUFLLEdBQUw7QUFDQSxpQkFBSyxHQUFMO0FBQ0EsaUJBQUssR0FBTDtBQUNBLGlCQUFLLEdBQUw7QUFDQSxpQkFBSyxHQUFMO0FBQ0lBLHNCQUFNLElBQU47QUFDQTtBQWxCUjtBQW9CQSxlQUFPSixJQUFJSSxHQUFYO0FBQ0gsS0FwR2dCOztBQXFHakI7Ozs7Ozs7QUFPQUMsWUE1R2lCLG9CQTRHUHBDLEtBNUdPLEVBNEdBcUMsR0E1R0EsRUE0R0tDLElBNUdMLEVBNEdXO0FBQ3hCLGFBQUksSUFBSTlCLElBQUksQ0FBWixFQUFlQSxJQUFJNkIsSUFBSWYsTUFBdkIsRUFBK0JkLEdBQS9CLEVBQW9DO0FBQ2hDLGdCQUFHNkIsSUFBSTdCLENBQUosRUFBTzhCLElBQVAsTUFBaUJ0QyxLQUFwQixFQUEyQjtBQUN2Qix1QkFBT1EsQ0FBUDtBQUNIO0FBQ0o7QUFDRCxlQUFPLENBQUMsQ0FBUixDQU53QixDQU1iO0FBQ2Q7QUFuSGdCLENBQXJCLEMiLCJmaWxlIjoiY2EuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiogQ3JlYXRlZCBieSBKdWFuQ3J1eiBvbiA0LzEvMjAxOC5cbiovXG5cbmxldCBfX2FwaVN0b3JlID0ge1xuICAgIHRvdXJuYW1lbnRzIDoge31cbn07XG5cbndpbmRvdy5Db250ZW50QXJlbmEgPSB3aW5kb3cuQ29udGVudEFyZW5hIHx8IHt9O1xuQ29udGVudEFyZW5hLkNvbnRlbnRBcGkgPSBDb250ZW50QXJlbmEuQ29udGVudEFwaXx8IHt9O1xuXG5Db250ZW50QXJlbmEuQ29udGVudEFwaT0ge1xuICAgIHNhdmVDb250ZW50QXNEcmFmdCAoIGNvbnRlbnQgKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxuICAgICAgICAgICAgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImNvbnRlbnQvZHJhZnQvc2F2ZVwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShjb250ZW50KSxcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICBzYXZlQ29udGVudEFzSW5hY3RpdmUgKCBjb250ZW50ICkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvbGlzdGluZy9zYXZlXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KGNvbnRlbnQpLFxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIHNhdmVDb250ZW50QXNBY3RpdmUgKCBjb250ZW50ICkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvbGlzdGluZy9wdWJsaXNoXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KGNvbnRlbnQpLFxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIHNlbmRNZXNzYWdlICggbWVzc2FnZSApIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL21lc3NhZ2VzL3NlbmRcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkobWVzc2FnZSksXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgZ2V0VXNlckluZm8gKCApIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL3VzZXIvaW5mb1wiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgZ2V0Q29tcGFueVVzZXJzICggKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxuICAgICAgICAgICAgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS9jb21wYW55L3VzZXJzXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICB1cGRhdGVDb21wYW55ICggY29tcGFueSApIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL2NvbXBhbnkvdXBkYXRlXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHtjb21wYW55OmNvbXBhbnl9KSxcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcblxuICAgIHVwZGF0ZVBhc3N3b3JkICggZGF0YSApIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL3VzZXIvcGFzc3dvcmRcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoZGF0YSksXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgdXBkYXRlVXNlciAoIHVzZXIgKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxuICAgICAgICAgICAgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS91c2VyL3VwZGF0ZVwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7dXNlcjp1c2VyfSksXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgZ2V0VGhyZWFkICggY3VzdG9tSWQgKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxuICAgICAgICAgICAgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS9tZXNzYWdlcy90aHJlYWRcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoe2N1c3RvbUlkOiBjdXN0b21JZH0pLFxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIGdldFRocmVhZHMgKCAgKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxuICAgICAgICAgICAgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS9tZXNzYWdlcy90aHJlYWRzXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICBwbGFjZUJpZCAoIGJpZCApIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL2JpZC9wbGFjZVwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShiaWQpLFxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIGFjY2VwdEJpZCAoIGJpZCwgc2lnbmF0dXJlICkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcblxuICAgICAgICBiaWQuc2lnbmF0dXJlID0gc2lnbmF0dXJlO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS9iaWQvYWNjZXB0XCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KGJpZCksXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgcmVqZWN0QmlkICggYmlkICkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvYmlkL3JlamVjdFwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShiaWQpLFxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIHJlbW92ZUJpZCAoIGJpZCApIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL2JpZC9yZW1vdmVcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoYmlkKSxcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcblxuICAgIHNhdmVUbXBGaWxlICggZmlsZXMgKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxuICAgICAgICAgICAgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgIGNvbnN0IGRhdGEgPSBuZXcgRm9ybURhdGEoKTtcbiAgICAgICAgZGF0YS5hcHBlbmQoJ2ZpbGUnLCBmaWxlc1swXSk7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiY29udGVudC9zYXZlL2ZpbGVcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgIHByb2Nlc3NEYXRhOiBmYWxzZSxcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBmYWxzZSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICBnZXRCeUN1c3RvbUlkICggY3VzdG9tSWQgKSB7XG4gICAgICAgIHZhciBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxuICAgICAgICAgICAgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImxpc3RpbmcvZGV0YWlsc1wiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgY3VzdG9tSWQgOiBjdXN0b21JZCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG5cbiAgICBnZXREcmFmdExpc3RpbmdzICggKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS9saXN0aW5ncy9kcmFmdFwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgZ2V0SW5hY3RpdmVMaXN0aW5ncyAoICkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKTtcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvbGlzdGluZ3MvaW5hY3RpdmVcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIGdldEFjdGl2ZUxpc3RpbmdzICggKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS9saXN0aW5ncy9hY3RpdmVcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIGdldEV4cGlyZWRMaXN0aW5ncyAoICkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKTtcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvbGlzdGluZ3MvZXhwaXJlZFwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgcmVtb3ZlTGlzdGluZyggY3VzdG9tSWQgKSB7XG4gICAgICAgIHZhciBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxuICAgICAgICAgICAgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS9saXN0aW5ncy9yZW1vdmVcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIGN1c3RvbUlkIDogY3VzdG9tSWQsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIGR1cGxpY2F0ZUxpc3RpbmcoIGN1c3RvbUlkICkge1xuICAgICAgICB2YXIgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvbGlzdGluZ3MvZHVwbGljYXRlXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBjdXN0b21JZCA6IGN1c3RvbUlkLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICBkZWFjdGl2YXRlTGlzdGluZyggY3VzdG9tSWQgKSB7XG4gICAgICAgIHZhciBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxuICAgICAgICAgICAgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS9saXN0aW5ncy9kZWFjdGl2YXRlXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBjdXN0b21JZCA6IGN1c3RvbUlkLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcblxuICAgIGdldENsb3NlZERlYWxzICggICkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKTtcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvYmlkL2Nsb3NlZFwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIGdldEFsbERlYWxzICggICkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKTtcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvYmlkL2FsbFwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIGdldFBlbmRpbmdEZWFscyAoICApIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCk7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL2JpZC9wZW5kaW5nXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgZ2V0UmVqZWN0ZWREZWFscyAoICApIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCk7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL2JpZC9yZWplY3RlZFwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIGdldFdhdGNobGlzdExpc3RpbmdzICgpe1xuICAgICAgICB2YXIgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvbGlzdGluZ3Mvd2F0Y2hsaXN0XCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcblxufTtcblxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9jYS9jYS5hcGkuY29udGVudC5qcyIsIi8qKlxuICogQ3JlYXRlZCBieSBKdWFuQ3J1eiBvbiA0LzEvMjAxOC5cbiAqL1xuXG5sZXQgX19hcGlTdG9yZSA9IHtcbiAgICB0b3VybmFtZW50cyA6IHt9XG59O1xuXG53aW5kb3cuQ29udGVudEFyZW5hID0gd2luZG93LkNvbnRlbnRBcmVuYSB8fCB7fTtcblxuQ29udGVudEFyZW5hLkFwaT0ge1xuICAgIHNvcnRCeUxhYmVsIChhLCBiKSB7XG4gICAgICAgIHJldHVybiAoYS5uYW1lID4gYi5uYW1lKSA/IDEgOiAoKGIubmFtZSA+IGEubmFtZSkgPyAtMSA6IDApXG4gICAgfSxcbiAgICBzb3J0QnlTcG9ydCAoYSwgYikge1xuXG4gICAgICAgIGlmIChhLnNwb3J0Lm5hbWUgPiBiLnNwb3J0Lm5hbWUpIHJldHVybiAxO1xuICAgICAgICBpZiAoYS5zcG9ydC5uYW1lIDwgYi5zcG9ydC5uYW1lKSByZXR1cm4gLTE7XG4gICAgICAgIGlmIChhLnNwb3J0Q2F0ZWdvcnkubmFtZSA+IGIuc3BvcnRDYXRlZ29yeS5uYW1lKSByZXR1cm4gMTtcbiAgICAgICAgaWYgKGEuc3BvcnRDYXRlZ29yeS5uYW1lIDwgYi5zcG9ydENhdGVnb3J5Lm5hbWUpIHJldHVybiAtMTtcbiAgICAgICAgaWYgKGEubmFtZSA+IGIubmFtZSkgcmV0dXJuIDE7XG4gICAgICAgIGlmIChhLm5hbWUgPCBiLm5hbWUpIHJldHVybiAtMTtcbiAgICAgICAgcmV0dXJuIDA7XG5cbiAgICB9LFxuICAgIHByZXBhcmVMaXN0ICggbGlzdCwgY2F0ZWdvcnlJZCApIHtcblxuICAgICAgICBsZXQgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgIGxpc3QgPSAkLm1hcChsaXN0LCBmdW5jdGlvbiAoaXRlbSkge1xuXG4gICAgICAgICAgICAvLyBGaWx0ZXIgYnkgY2F0ZWdvcnlcbiAgICAgICAgICAgIGlmICggY2F0ZWdvcnlJZCAmJiBpdGVtLmNhdGVnb3J5WydAYXR0cmlidXRlcyddLmlkICE9IGNhdGVnb3J5SWQpIHJldHVybiBudWxsO1xuXG4gICAgICAgICAgICByZXR1cm4ge25hbWU6IGl0ZW1bJ0BhdHRyaWJ1dGVzJ10ubmFtZSwgZXh0ZXJuYWxJZDogaXRlbVsnQGF0dHJpYnV0ZXMnXS5pZH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGlzdC5zb3J0KF90aGlzLnNvcnRCeUxhYmVsKTtcblxuICAgICAgICByZXR1cm4gbGlzdDtcbiAgICB9LFxuICAgIGdldENvbnRlbnQgKCBmaWx0ZXIpIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCk7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYnV5L3NlYXJjaFwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhIDogZmlsdGVyLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIGdldEpzb25Db250ZW50ICggZmlsdGVyKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImxpc3RpbmdzL21hcmtldHBsYWNlXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGEgOiBmaWx0ZXIsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgc2F2ZUZpbHRlciAoIGZpbHRlcikge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKTtcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJidXkvZmlsdGVyL3NhdmVcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YSA6IGZpbHRlcixcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICBnZXRDb3VudHJpZXMgKCkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKTtcbiAgICAgICAgbGV0IF90aGlzID0gdGhpcztcbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL3NlYXJjaC9jb3VudHJpZXMvYWxsXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQHBhcmFtIHthcnJheX0gcmVzcG9uc2VcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2Uuc29ydChfdGhpcy5zb3J0QnlMYWJlbCk7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIGdldEFjdGl2ZVNwb3J0cyAoKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpO1xuICAgICAgICBsZXQgX3RoaXMgPSB0aGlzO1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvc2VhcmNoL3Nwb3J0cy9hY3RpdmVcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBAcGFyYW0ge2FycmF5fSByZXNwb25zZVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgZ2V0Q291bnRyaWVzRnVsbCAoKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpO1xuICAgICAgICBsZXQgX3RoaXMgPSB0aGlzO1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvc2VhcmNoL2NvdW50cmllcy9mdWxsXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQHBhcmFtIHthcnJheX0gcmVzcG9uc2VcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2Uuc29ydChfdGhpcy5zb3J0QnlMYWJlbCk7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIGdldFRlcnJpdG9yaWVzICgpIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCk7XG4gICAgICAgIGxldCBfdGhpcyA9IHRoaXM7XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS9zZWFyY2gvdGVycml0b3JpZXNcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBAcGFyYW0ge2FycmF5fSByZXNwb25zZVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZS5zb3J0KF90aGlzLnNvcnRCeUxhYmVsKTtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgZ2V0UmlnaHRzIChyaWdodHNQYWNrYWdlLCBncm91cCkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKTtcbiAgICAgICAgbGV0IF90aGlzID0gdGhpcztcbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL3NlYXJjaC9yaWdodHNcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YSA6IHtcbiAgICAgICAgICAgICAgICByaWdodHNQYWNrYWdlOiByaWdodHNQYWNrYWdlLFxuICAgICAgICAgICAgICAgIGdyb3VwOiBncm91cFxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBAcGFyYW0ge2FycmF5fSByZXNwb25zZVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgZ2V0UmlnaHRzUGFja2FnZSAocmlnaHRzUGFja2FnZSwgZ3JvdXApIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCk7XG4gICAgICAgIGxldCBfdGhpcyA9IHRoaXM7XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS9zZWFyY2gvcmlnaHRzLXBhY2thZ2VcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YSA6IHtcbiAgICAgICAgICAgICAgICByaWdodHNQYWNrYWdlOiByaWdodHNQYWNrYWdlLFxuICAgICAgICAgICAgICAgIGdyb3VwOiBncm91cFxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBAcGFyYW0ge2FycmF5fSByZXNwb25zZVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgZ2V0U3BvcnRzICgpIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCk7XG4gICAgICAgIGxldCBfdGhpcyA9IHRoaXM7XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGV4dGVybmFsQXBpVXJsICsgXCJ2MS9mZWVkL3Nwb3J0c1wiLFxuICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQHBhcmFtIHt7c3BvcnQ6b2JqZWN0fX0gcmVzcG9uc2VcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgc3BvcnRzID0gX3RoaXMucHJlcGFyZUxpc3QoIHJlc3BvbnNlLnNwb3J0KTtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHNwb3J0cyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIGdldENvbnRlbnREZXRhaWxzKCBpZCApIHtcbiAgICAgICAgdmFyIGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiY29udGVudC9kZXRhaWxzL1wiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhOiB7aWQgOiBpZH0sXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgZ2V0UGVuZGluZ0xpc3RpbmdzKCBpZCApIHtcbiAgICAgICAgdmFyIGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiY29udGVudC9wZW5kaW5nLWxpc3RpbmdzL1wiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhOiB7aWQgOiBpZH0sXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgZ2V0Q2F0ZWdvcmllcyAoIHNwb3J0SWQgKSB7XG4gICAgICAgIHZhciBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxuICAgICAgICAgICAgX3RoaXMgPSB0aGlzLFxuICAgICAgICAgICAgbGlzdCA9IFtdLFxuICAgICAgICAgICAgY2F0cyA9IFtdO1xuXG4gICAgICAgIF90aGlzLmdldFRvdXJuYW1lbnRzKHNwb3J0SWQpLmRvbmUoZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICBpZiAoICEgX19hcGlTdG9yZS50b3VybmFtZW50c1tzcG9ydElkXSApIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKCBbXSApO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGlzdCA9ICQubWFwKCBfX2FwaVN0b3JlLnRvdXJuYW1lbnRzW3Nwb3J0SWRdLnRvdXJuYW1lbnQgLCBmdW5jdGlvbiAoaXRlbSkge1xuXG4gICAgICAgICAgICAgICAgbGV0IGlkID0gaXRlbS5jYXRlZ29yeVsnQGF0dHJpYnV0ZXMnXS5pZDtcblxuICAgICAgICAgICAgICAgIGlmICggY2F0cy5pbmRleE9mKGlkKSAhPT0gLTEgKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNhdHMucHVzaCggaWQgKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0uY2F0ZWdvcnk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoX3RoaXMucHJlcGFyZUxpc3QobGlzdCkgKTtcbiAgICAgICAgfSk7XG5cblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgZ2V0VG91cm5hbWVudHMgKCBzcG9ydElkLCBjYXRlZ29yeUlkICkge1xuICAgICAgICB2YXIgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcblxuICAgICAgICBpZiAoIF9fYXBpU3RvcmUudG91cm5hbWVudHNbc3BvcnRJZF0gIT09IHVuZGVmaW5lZCApe1xuICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShfdGhpcy5wcmVwYXJlTGlzdChfX2FwaVN0b3JlLnRvdXJuYW1lbnRzW3Nwb3J0SWRdLnRvdXJuYW1lbnQsIGNhdGVnb3J5SWQpKTtcbiAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgICAgIH1cblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBleHRlcm5hbEFwaVVybCArIFwidjEvZmVlZC90b3VybmFtZW50c1wiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhIDogeyBpZCA6IHNwb3J0SWQgfSxcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQHBhcmFtIHt7dG91cm5hbWVudHM6e3RvdXJuYW1lbnQ6QXJyYXl9fX0gcmVzcG9uc2VcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG5cbiAgICAgICAgICAgICAgICAvLyBBIGNvbW1lbnRcbiAgICAgICAgICAgICAgICBpZiAoIHJlc3BvbnNlLnRvdXJuYW1lbnRzID09PSB1bmRlZmluZWQgfHwgcmVzcG9uc2UudG91cm5hbWVudHMudG91cm5hbWVudCA9PT0gdW5kZWZpbmVkICkge1xuICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKFtdKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIF9fYXBpU3RvcmUudG91cm5hbWVudHNbc3BvcnRJZF0gPSByZXNwb25zZS50b3VybmFtZW50cztcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKF90aGlzLnByZXBhcmVMaXN0KHJlc3BvbnNlLnRvdXJuYW1lbnRzLnRvdXJuYW1lbnQsIGNhdGVnb3J5SWQpKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMgKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICBnZXRTZWFzb25zICggdG91cm5hbWVudElkICkge1xuICAgICAgICB2YXIgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBleHRlcm5hbEFwaVVybCArIFwidjEvZmVlZC9zZWFzb25zXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGEgOiB7IGlkIDogdG91cm5hbWVudElkIH0sXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEBwYXJhbSB7e3RvdXJuYW1lbnRzOnt0b3VybmFtZW50OkFycmF5fX19IHJlc3BvbnNlXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuXG4gICAgICAgICAgICAgICAgdmFyIGxpc3Q7XG5cbiAgICAgICAgICAgICAgICBpZiAoIHJlc3BvbnNlLnNlYXNvbnMgPT09IHVuZGVmaW5lZCB8fCByZXNwb25zZS5zZWFzb25zLnNlYXNvbiA9PT0gdW5kZWZpbmVkICkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgaWYgKCAkLmlzQXJyYXkocmVzcG9uc2Uuc2Vhc29ucy5zZWFzb24pICl7XG4gICAgICAgICAgICAgICAgICAgIGxpc3QgPSAkLm1hcChyZXNwb25zZS5zZWFzb25zLnNlYXNvbiwgZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogaXRlbVsnQGF0dHJpYnV0ZXMnXS5uYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4dGVybmFsSWQ6IGl0ZW1bJ0BhdHRyaWJ1dGVzJ10uaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5kRGF0ZTogaXRlbVsnQGF0dHJpYnV0ZXMnXS5lbmRfZGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydERhdGU6IGl0ZW1bJ0BhdHRyaWJ1dGVzJ10uc3RhcnRfZGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3VybmFtZW50SWQ6IGl0ZW1bJ0BhdHRyaWJ1dGVzJ10udG91cm5hbWVudF9pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB5ZWFyOiBpdGVtWydAYXR0cmlidXRlcyddLnllYXIsXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pLnJldmVyc2UoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBsaXN0ID0gW3tcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHJlc3BvbnNlLnNlYXNvbnMuc2Vhc29uWydAYXR0cmlidXRlcyddLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBleHRlcm5hbElkOiByZXNwb25zZS5zZWFzb25zLnNlYXNvblsnQGF0dHJpYnV0ZXMnXS5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuZERhdGU6IHJlc3BvbnNlLnNlYXNvbnMuc2Vhc29uWydAYXR0cmlidXRlcyddLmVuZF9kYXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnREYXRlOiByZXNwb25zZS5zZWFzb25zLnNlYXNvblsnQGF0dHJpYnV0ZXMnXS5zdGFydF9kYXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgdG91cm5hbWVudElkOiByZXNwb25zZS5zZWFzb25zLnNlYXNvblsnQGF0dHJpYnV0ZXMnXS50b3VybmFtZW50X2lkLFxuICAgICAgICAgICAgICAgICAgICAgICAgeWVhcjogcmVzcG9uc2Uuc2Vhc29ucy5zZWFzb25bJ0BhdHRyaWJ1dGVzJ10ueWVhcixcbiAgICAgICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKGxpc3QpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cyApIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIGdldFNjaGVkdWxlICggc2Vhc29uSWQgKSB7XG4gICAgICAgIHZhciBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxuICAgICAgICAgICAgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGV4dGVybmFsQXBpVXJsICsgXCJ2MS9mZWVkL3NjaGVkdWxlc1wiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhIDogeyBpZCA6IHNlYXNvbklkIH0sXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEBwYXJhbSB7e3RvdXJuYW1lbnRzOnt0b3VybmFtZW50OkFycmF5fX19IHJlc3BvbnNlXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuXG4gICAgICAgICAgICAgICAgbGV0IGxpc3QgPSB7fTtcblxuICAgICAgICAgICAgICAgIGlmICggcmVzcG9uc2Uuc3BvcnRfZXZlbnRzID09PSB1bmRlZmluZWQgfHwgcmVzcG9uc2Uuc3BvcnRfZXZlbnRzLnNwb3J0X2V2ZW50ID09PSB1bmRlZmluZWQgKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICByZXNwb25zZS5zcG9ydF9ldmVudHMuc3BvcnRfZXZlbnQuZm9yRWFjaCggKGl0ZW0pID0+IHtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgcm91bmQgID0gKGl0ZW0udG91cm5hbWVudF9yb3VuZCkgPyBpdGVtLnRvdXJuYW1lbnRfcm91bmRbJ0BhdHRyaWJ1dGVzJ10gOiBudWxsO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICghcm91bmQpIHJldHVybjtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgbmFtZSA9IChyb3VuZC5udW1iZXIpID8gXCJyb3VuZF9cIiArIHJvdW5kLm51bWJlciA6IHJvdW5kLm5hbWU7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCAhbGlzdFtuYW1lXSApIGxpc3RbbmFtZV0gPSB7fTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoICFsaXN0W25hbWVdLm1hdGNoZXMgKSBsaXN0W25hbWVdLm1hdGNoZXMgPSBuZXcgTWFwKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgbGlzdFtuYW1lXS5tYXRjaGVzLnNldChpdGVtWydAYXR0cmlidXRlcyddLmlkLHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjaGVkdWxlZDogaXRlbVsnQGF0dHJpYnV0ZXMnXS5zY2hlZHVsZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBleHRlcm5hbElkOiBpdGVtWydAYXR0cmlidXRlcyddLmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBpdGVtWydAYXR0cmlidXRlcyddLnN0YXR1cyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdXJuYW1lbnRSb3VuZCA6IHJvdW5kLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29tcGV0aXRvcnMgOiAoaXRlbS5jb21wZXRpdG9ycykgPyBpdGVtLmNvbXBldGl0b3JzLmNvbXBldGl0b3IubWFwKCggY29tcGV0aXRvcik9PnsgcmV0dXJuIGNvbXBldGl0b3JbJ0BhdHRyaWJ1dGVzJ10gIH0pICA6IG51bGxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUobGlzdCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzICkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgc2VhcmNoQ29tcGV0aXRpb24ocmVxdWVzdCkge1xuXG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpO1xuICAgICAgICBsZXQgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyAnYXBpL3NlYXJjaC90b3VybmFtZW50JyxcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBcImNvbnRlbnRcIjogcmVxdWVzdFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRyYWRpdGlvbmFsOiB0cnVlLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhVHlwZTogXCJqc29uXCIsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xuXG4gICAgICAgICAgICAgICAgZGF0YS5zb3J0KF90aGlzLnNvcnRCeVNwb3J0KTtcblxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoZGF0YSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzICkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgd2F0Y2hsaXN0KCBpZCApIHtcbiAgICAgICAgdmFyIGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL3dhdGNobGlzdC9hZGRcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YToge2lkIDogaWR9LFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9XG59O1xuXG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L2NhL2NhLmFwaS5qcyIsIi8qKlxuICogQ3JlYXRlZCBieSBKdWFuQ3J1eiBvbiA0LzEvMjAxOC5cbiAqL1xuXG53aW5kb3cuQ29udGVudEFyZW5hID0gd2luZG93LkNvbnRlbnRBcmVuYSB8fCB7fTtcblxuQ29udGVudEFyZW5hLkRhdGEgPSBDb250ZW50QXJlbmEuRGF0YSB8fCB7fTtcbkNvbnRlbnRBcmVuYS5MYW5ndWFnZXMgPSBDb250ZW50QXJlbmEuTGFuZ3VhZ2VzIHx8IHt9O1xuXG5Db250ZW50QXJlbmEuRGF0YS5Ub3BTcG9ydHMgPSBbXG4gICAgeyBuYW1lIDogXCJTb2NjZXJcIiwgZXh0ZXJuYWxJZDogXCJzcjpzcG9ydDoxXCJ9LFxuICAgIHsgbmFtZSA6IFwiQmFza2V0YmFsbFwiLCBleHRlcm5hbElkOiBcInNyOnNwb3J0OjJcIn0sXG4gICAgeyBuYW1lIDogXCJCYXNlYmFsbFwiLCBleHRlcm5hbElkOiBcInNyOnNwb3J0OjNcIn0sXG4gICAgeyBuYW1lIDogXCJUZW5uaXNcIiwgZXh0ZXJuYWxJZDogXCJzcjpzcG9ydDo1XCJ9LFxuICAgIHsgbmFtZSA6IFwiQ3JpY2tldFwiLCBleHRlcm5hbElkOiBcInNyOnNwb3J0OjIxXCJ9LFxuICAgIHsgbmFtZSA6IFwiRmllbGQgSG9ja2V5XCIsIGV4dGVybmFsSWQ6IFwic3I6c3BvcnQ6MjRcIn0sXG4gICAgeyBuYW1lIDogXCJWb2xsZXliYWxsXCIsIGV4dGVybmFsSWQ6IFwic3I6c3BvcnQ6MjNcIn0sXG4gICAgeyBuYW1lIDogXCJUYWJsZSBUZW5uaXNcIiwgZXh0ZXJuYWxJZDogXCJzcjpzcG9ydDoyMFwifSxcbiAgICB7IG5hbWUgOiBcIkdvbGZcIiwgZXh0ZXJuYWxJZDogXCJzcjpzcG9ydDo5XCJ9LFxuICAgIHsgbmFtZSA6IFwiQW1lcmljYW4gRm9vdGJhbGxcIiwgZXh0ZXJuYWxJZDogXCJzcjpzcG9ydDoxNlwifSxcbiAgICB7IG5hbWUgOiBcIkhhbmRiYWxsXCIsIGV4dGVybmFsSWQ6IFwic3I6c3BvcnQ6NlwifVxuXTtcblxuQ29udGVudEFyZW5hLkRhdGEuRnVsbFNwb3J0cyA9IFtdO1xuQ29udGVudEFyZW5hLkRhdGEuQ291bnRyaWVzID0gW107XG5cbkNvbnRlbnRBcmVuYS5MYW5ndWFnZXMuU2hvcnQgPSB7XG4gICAgXCJtZHJcIjogXCJNYW5kYXJpblwiLFxuICAgIFwiZXNcIjogXCJTcGFuaXNoXCIsXG4gICAgXCJlblwiOiBcIkVuZ2xpc2hcIixcbiAgICBcImhpXCI6IFwiSGluZGlcIixcbiAgICBcImFyXCI6IFwiQXJhYmljXCIsXG4gICAgXCJwdFwiOiBcIlBvcnR1Z3Vlc2VcIixcbiAgICBcImJuXCI6IFwiQmVuZ2FsaVwiLFxuICAgIFwicnVcIjogXCJSdXNzaWFuXCIsXG4gICAgXCJqYVwiOiBcIkphcGFuZXNlXCIsXG4gICAgXCJqdlwiOiBcIkphdmFuZXNlXCIsXG4gICAgXCJkZVwiOiBcIkdlcm1hblwiLFxuICAgIFwiYWxsXCIgOiBcIlNob3cgQWxsXCJcbn07XG5cbkNvbnRlbnRBcmVuYS5MYW5ndWFnZXMuTG9uZyA9IHtcbiAgICBcImFhXCI6IFwiQWZhclwiLFxuICAgIFwiYWZcIjogXCJBZnJpa2FhbnNcIixcbiAgICBcImFpblwiOiBcIkFpbnVcIixcbiAgICBcImFrelwiOiBcIkFsYWJhbWFcIixcbiAgICBcInNxXCI6IFwiQWxiYW5pYW5cIixcbiAgICBcImFsZVwiOiBcIkFsZXV0XCIsXG4gICAgXCJhcnFcIjogXCJBbGdlcmlhbiBBcmFiaWNcIixcbiAgICBcImVuX1VTXCI6IFwiQW1lcmljYW4gRW5nbGlzaFwiLFxuICAgIFwiYXNlXCI6IFwiQW1lcmljYW4gU2lnbiBMYW5ndWFnZVwiLFxuICAgIFwiYW1cIjogXCJBbWhhcmljXCIsXG4gICAgXCJlZ3lcIjogXCJBbmNpZW50IEVneXB0aWFuXCIsXG4gICAgXCJncmNcIjogXCJBbmNpZW50IEdyZWVrXCIsXG4gICAgXCJhclwiOiBcIkFyYWJpY1wiLFxuICAgIFwiYXJjXCI6IFwiQXJhbWFpY1wiLFxuICAgIFwiYXJwXCI6IFwiQXJhcGFob1wiLFxuICAgIFwiYXJ3XCI6IFwiQXJhd2FrXCIsXG4gICAgXCJoeVwiOiBcIkFybWVuaWFuXCIsXG4gICAgXCJhc1wiOiBcIkFzc2FtZXNlXCIsXG4gICAgXCJhc2FcIjogXCJBc3VcIixcbiAgICBcImVuX0FVXCI6IFwiQXVzdHJhbGlhbiBFbmdsaXNoXCIsXG4gICAgXCJkZV9BVFwiOiBcIkF1c3RyaWFuIEdlcm1hblwiLFxuICAgIFwiYXlcIjogXCJBeW1hcmFcIixcbiAgICBcImF6XCI6IFwiQXplcmJhaWphbmlcIixcbiAgICBcImJhblwiOiBcIkJhbGluZXNlXCIsXG4gICAgXCJldVwiOiBcIkJhc3F1ZVwiLFxuICAgIFwiYmFyXCI6IFwiQmF2YXJpYW5cIixcbiAgICBcImJlXCI6IFwiQmVsYXJ1c2lhblwiLFxuICAgIFwiYm5cIjogXCJCZW5nYWxpXCIsXG4gICAgXCJiaWtcIjogXCJCaWtvbFwiLFxuICAgIFwiYmluXCI6IFwiQmluaVwiLFxuICAgIFwiYnNcIjogXCJCb3NuaWFuXCIsXG4gICAgXCJicmhcIjogXCJCcmFodWlcIixcbiAgICBcImJyYVwiOiBcIkJyYWpcIixcbiAgICBcInB0X0JSXCI6IFwiQnJhemlsaWFuIFBvcnR1Z3Vlc2VcIixcbiAgICBcImJyXCI6IFwiQnJldG9uXCIsXG4gICAgXCJlbl9HQlwiOiBcIkJyaXRpc2ggRW5nbGlzaFwiLFxuICAgIFwiYmdcIjogXCJCdWxnYXJpYW5cIixcbiAgICBcIm15XCI6IFwiQnVybWVzZVwiLFxuICAgIFwiZnJjXCI6IFwiQ2FqdW4gRnJlbmNoXCIsXG4gICAgXCJlbl9DQVwiOiBcIkNhbmFkaWFuIEVuZ2xpc2hcIixcbiAgICBcImZyX0NBXCI6IFwiQ2FuYWRpYW4gRnJlbmNoXCIsXG4gICAgXCJ5dWVcIjogXCJDYW50b25lc2VcIixcbiAgICBcImNhclwiOiBcIkNhcmliXCIsXG4gICAgXCJjYVwiOiBcIkNhdGFsYW5cIixcbiAgICBcImNheVwiOiBcIkNheXVnYVwiLFxuICAgIFwiY2ViXCI6IFwiQ2VidWFub1wiLFxuICAgIFwic2h1XCI6IFwiQ2hhZGlhbiBBcmFiaWNcIixcbiAgICBcImNlXCI6IFwiQ2hlY2hlblwiLFxuICAgIFwiY2hyXCI6IFwiQ2hlcm9rZWVcIixcbiAgICBcInF1Z1wiOiBcIkNoaW1ib3Jhem8gSGlnaGxhbmQgUXVpY2h1YVwiLFxuICAgIFwiemhcIjogXCJDaGluZXNlXCIsXG4gICAgXCJjaG5cIjogXCJDaGlub29rIEphcmdvblwiLFxuICAgIFwiY2hwXCI6IFwiQ2hpcGV3eWFuXCIsXG4gICAgXCJjaG9cIjogXCJDaG9jdGF3XCIsXG4gICAgXCJjdVwiOiBcIkNodXJjaCBTbGF2aWNcIixcbiAgICBcImN2XCI6IFwiQ2h1dmFzaFwiLFxuICAgIFwibndjXCI6IFwiQ2xhc3NpY2FsIE5ld2FyaVwiLFxuICAgIFwic3ljXCI6IFwiQ2xhc3NpY2FsIFN5cmlhY1wiLFxuICAgIFwic3djXCI6IFwiQ29uZ28gU3dhaGlsaVwiLFxuICAgIFwiY29wXCI6IFwiQ29wdGljXCIsXG4gICAgXCJrd1wiOiBcIkNvcm5pc2hcIixcbiAgICBcImNvXCI6IFwiQ29yc2ljYW5cIixcbiAgICBcImNyXCI6IFwiQ3JlZVwiLFxuICAgIFwibXVzXCI6IFwiQ3JlZWtcIixcbiAgICBcImNyaFwiOiBcIkNyaW1lYW4gVHVya2lzaFwiLFxuICAgIFwiaHJcIjogXCJDcm9hdGlhblwiLFxuICAgIFwiY3NcIjogXCJDemVjaFwiLFxuICAgIFwiZGFrXCI6IFwiRGFrb3RhXCIsXG4gICAgXCJkYVwiOiBcIkRhbmlzaFwiLFxuICAgIFwiZGVsXCI6IFwiRGVsYXdhcmVcIixcbiAgICBcIm5sXCI6IFwiRHV0Y2hcIixcbiAgICBcImZyc1wiOiBcIkVhc3Rlcm4gRnJpc2lhblwiLFxuICAgIFwiYXJ6XCI6IFwiRWd5cHRpYW4gQXJhYmljXCIsXG4gICAgXCJlblwiOiBcIkVuZ2xpc2hcIixcbiAgICBcImVvXCI6IFwiRXNwZXJhbnRvXCIsXG4gICAgXCJldFwiOiBcIkVzdG9uaWFuXCIsXG4gICAgXCJwdF9QVFwiOiBcIkV1cm9wZWFuIFBvcnR1Z3Vlc2VcIixcbiAgICBcImVzX0VTXCI6IFwiRXVyb3BlYW4gU3BhbmlzaFwiLFxuICAgIFwiZWVcIjogXCJFd2VcIixcbiAgICBcImZhblwiOiBcIkZhbmdcIixcbiAgICBcImhpZlwiOiBcIkZpamkgSGluZGlcIixcbiAgICBcImZqXCI6IFwiRmlqaWFuXCIsXG4gICAgXCJmaWxcIjogXCJGaWxpcGlub1wiLFxuICAgIFwiZmlcIjogXCJGaW5uaXNoXCIsXG4gICAgXCJubF9CRVwiOiBcIkZsZW1pc2hcIixcbiAgICBcImZvblwiOiBcIkZvblwiLFxuICAgIFwiZnJcIjogXCJGcmVuY2hcIixcbiAgICBcImdhYVwiOiBcIkdhXCIsXG4gICAgXCJnYW5cIjogXCJHYW4gQ2hpbmVzZVwiLFxuICAgIFwia2FcIjogXCJHZW9yZ2lhblwiLFxuICAgIFwiZGVcIjogXCJHZXJtYW5cIixcbiAgICBcImdvdFwiOiBcIkdvdGhpY1wiLFxuICAgIFwiZ3JiXCI6IFwiR3JlYm9cIixcbiAgICBcImVsXCI6IFwiR3JlZWtcIixcbiAgICBcImduXCI6IFwiR3VhcmFuaVwiLFxuICAgIFwiZ3VcIjogXCJHdWphcmF0aVwiLFxuICAgIFwiZ3V6XCI6IFwiR3VzaWlcIixcbiAgICBcImhhaVwiOiBcIkhhaWRhXCIsXG4gICAgXCJodFwiOiBcIkhhaXRpYW5cIixcbiAgICBcImhha1wiOiBcIkhha2thIENoaW5lc2VcIixcbiAgICBcImhhXCI6IFwiSGF1c2FcIixcbiAgICBcImhhd1wiOiBcIkhhd2FpaWFuXCIsXG4gICAgXCJoZVwiOiBcIkhlYnJld1wiLFxuICAgIFwiaHpcIjogXCJIZXJlcm9cIixcbiAgICBcImhpXCI6IFwiSGluZGlcIixcbiAgICBcImhpdFwiOiBcIkhpdHRpdGVcIixcbiAgICBcImhtblwiOiBcIkhtb25nXCIsXG4gICAgXCJodVwiOiBcIkh1bmdhcmlhblwiLFxuICAgIFwiaXNcIjogXCJJY2VsYW5kaWNcIixcbiAgICBcImlvXCI6IFwiSWRvXCIsXG4gICAgXCJpZ1wiOiBcIklnYm9cIixcbiAgICBcIml1XCI6IFwiSW51a3RpdHV0XCIsXG4gICAgXCJpa1wiOiBcIkludXBpYXFcIixcbiAgICBcImdhXCI6IFwiSXJpc2hcIixcbiAgICBcIml0XCI6IFwiSXRhbGlhblwiLFxuICAgIFwiamFtXCI6IFwiSmFtYWljYW4gQ3Jlb2xlIEVuZ2xpc2hcIixcbiAgICBcImphXCI6IFwiSmFwYW5lc2VcIixcbiAgICBcImp2XCI6IFwiSmF2YW5lc2VcIixcbiAgICBcImthalwiOiBcIkpqdVwiLFxuICAgIFwiZHlvXCI6IFwiSm9sYS1Gb255aVwiLFxuICAgIFwieGFsXCI6IFwiS2FsbXlrXCIsXG4gICAgXCJrYW1cIjogXCJLYW1iYVwiLFxuICAgIFwia2JsXCI6IFwiS2FuZW1idVwiLFxuICAgIFwia25cIjogXCJLYW5uYWRhXCIsXG4gICAgXCJrclwiOiBcIkthbnVyaVwiLFxuICAgIFwia2FhXCI6IFwiS2FyYS1LYWxwYWtcIixcbiAgICBcImtyY1wiOiBcIkthcmFjaGF5LUJhbGthclwiLFxuICAgIFwia3JsXCI6IFwiS2FyZWxpYW5cIixcbiAgICBcImtzXCI6IFwiS2FzaG1pcmlcIixcbiAgICBcImNzYlwiOiBcIkthc2h1YmlhblwiLFxuICAgIFwia2F3XCI6IFwiS2F3aVwiLFxuICAgIFwia2tcIjogXCJLYXpha2hcIixcbiAgICBcImtlblwiOiBcIktlbnlhbmdcIixcbiAgICBcImtoYVwiOiBcIktoYXNpXCIsXG4gICAgXCJrbVwiOiBcIktobWVyXCIsXG4gICAgXCJraG9cIjogXCJLaG90YW5lc2VcIixcbiAgICBcImtod1wiOiBcIktob3dhclwiLFxuICAgIFwia2lcIjogXCJLaWt1eXVcIixcbiAgICBcImttYlwiOiBcIktpbWJ1bmR1XCIsXG4gICAgXCJrcmpcIjogXCJLaW5hcmF5LWFcIixcbiAgICBcInJ3XCI6IFwiS2lueWFyd2FuZGFcIixcbiAgICBcImtpdVwiOiBcIktpcm1hbmpraVwiLFxuICAgIFwidGxoXCI6IFwiS2xpbmdvblwiLFxuICAgIFwiYmttXCI6IFwiS29tXCIsXG4gICAgXCJrdlwiOiBcIktvbWlcIixcbiAgICBcImtvaVwiOiBcIktvbWktUGVybXlha1wiLFxuICAgIFwia2dcIjogXCJLb25nb1wiLFxuICAgIFwia29rXCI6IFwiS29ua2FuaVwiLFxuICAgIFwia29cIjogXCJLb3JlYW5cIixcbiAgICBcImtmb1wiOiBcIktvcm9cIixcbiAgICBcImtvc1wiOiBcIktvc3JhZWFuXCIsXG4gICAgXCJhdmtcIjogXCJLb3RhdmFcIixcbiAgICBcImtocVwiOiBcIktveXJhIENoaWluaVwiLFxuICAgIFwic2VzXCI6IFwiS295cmFib3JvIFNlbm5pXCIsXG4gICAgXCJrcGVcIjogXCJLcGVsbGVcIixcbiAgICBcImtyaVwiOiBcIktyaW9cIixcbiAgICBcImtqXCI6IFwiS3VhbnlhbWFcIixcbiAgICBcImt1bVwiOiBcIkt1bXlrXCIsXG4gICAgXCJrdVwiOiBcIkt1cmRpc2hcIixcbiAgICBcImtydVwiOiBcIkt1cnVraFwiLFxuICAgIFwia3V0XCI6IFwiS3V0ZW5haVwiLFxuICAgIFwibm1nXCI6IFwiS3dhc2lvXCIsXG4gICAgXCJreVwiOiBcIkt5cmd5elwiLFxuICAgIFwicXVjXCI6IFwiS1xcdTAyYmNpY2hlXFx1MDJiY1wiLFxuICAgIFwibGFkXCI6IFwiTGFkaW5vXCIsXG4gICAgXCJsYWhcIjogXCJMYWhuZGFcIixcbiAgICBcImxrdFwiOiBcIkxha290YVwiLFxuICAgIFwibGFtXCI6IFwiTGFtYmFcIixcbiAgICBcImxhZ1wiOiBcIkxhbmdpXCIsXG4gICAgXCJsb1wiOiBcIkxhb1wiLFxuICAgIFwibHRnXCI6IFwiTGF0Z2FsaWFuXCIsXG4gICAgXCJsYVwiOiBcIkxhdGluXCIsXG4gICAgXCJlc180MTlcIjogXCJMYXRpbiBBbWVyaWNhbiBTcGFuaXNoXCIsXG4gICAgXCJsdlwiOiBcIkxhdHZpYW5cIixcbiAgICBcImx6elwiOiBcIkxhelwiLFxuICAgIFwibGV6XCI6IFwiTGV6Z2hpYW5cIixcbiAgICBcImxpalwiOiBcIkxpZ3VyaWFuXCIsXG4gICAgXCJsaVwiOiBcIkxpbWJ1cmdpc2hcIixcbiAgICBcImxuXCI6IFwiTGluZ2FsYVwiLFxuICAgIFwibGZuXCI6IFwiTGluZ3VhIEZyYW5jYSBOb3ZhXCIsXG4gICAgXCJsemhcIjogXCJMaXRlcmFyeSBDaGluZXNlXCIsXG4gICAgXCJsdFwiOiBcIkxpdGh1YW5pYW5cIixcbiAgICBcImxpdlwiOiBcIkxpdm9uaWFuXCIsXG4gICAgXCJqYm9cIjogXCJMb2piYW5cIixcbiAgICBcImxtb1wiOiBcIkxvbWJhcmRcIixcbiAgICBcIm5kc1wiOiBcIkxvdyBHZXJtYW5cIixcbiAgICBcInNsaVwiOiBcIkxvd2VyIFNpbGVzaWFuXCIsXG4gICAgXCJkc2JcIjogXCJMb3dlciBTb3JiaWFuXCIsXG4gICAgXCJsb3pcIjogXCJMb3ppXCIsXG4gICAgXCJsdVwiOiBcIkx1YmEtS2F0YW5nYVwiLFxuICAgIFwibHVhXCI6IFwiTHViYS1MdWx1YVwiLFxuICAgIFwibHVpXCI6IFwiTHVpc2Vub1wiLFxuICAgIFwic21qXCI6IFwiTHVsZSBTYW1pXCIsXG4gICAgXCJsdW5cIjogXCJMdW5kYVwiLFxuICAgIFwibHVvXCI6IFwiTHVvXCIsXG4gICAgXCJsYlwiOiBcIkx1eGVtYm91cmdpc2hcIixcbiAgICBcImx1eVwiOiBcIkx1eWlhXCIsXG4gICAgXCJtZGVcIjogXCJNYWJhXCIsXG4gICAgXCJta1wiOiBcIk1hY2Vkb25pYW5cIixcbiAgICBcImptY1wiOiBcIk1hY2hhbWVcIixcbiAgICBcIm1hZFwiOiBcIk1hZHVyZXNlXCIsXG4gICAgXCJtYWZcIjogXCJNYWZhXCIsXG4gICAgXCJtYWdcIjogXCJNYWdhaGlcIixcbiAgICBcInZtZlwiOiBcIk1haW4tRnJhbmNvbmlhblwiLFxuICAgIFwibWFpXCI6IFwiTWFpdGhpbGlcIixcbiAgICBcIm1ha1wiOiBcIk1ha2FzYXJcIixcbiAgICBcIm1naFwiOiBcIk1ha2h1d2EtTWVldHRvXCIsXG4gICAgXCJrZGVcIjogXCJNYWtvbmRlXCIsXG4gICAgXCJtZ1wiOiBcIk1hbGFnYXN5XCIsXG4gICAgXCJtc1wiOiBcIk1hbGF5XCIsXG4gICAgXCJtbFwiOiBcIk1hbGF5YWxhbVwiLFxuICAgIFwibXRcIjogXCJNYWx0ZXNlXCIsXG4gICAgXCJtbmNcIjogXCJNYW5jaHVcIixcbiAgICBcIm1kclwiOiBcIk1hbmRhcmluXCIsXG4gICAgXCJtYW5cIjogXCJNYW5kaW5nb1wiLFxuICAgIFwibW5pXCI6IFwiTWFuaXB1cmlcIixcbiAgICBcImd2XCI6IFwiTWFueFwiLFxuICAgIFwibWlcIjogXCJNYW9yaVwiLFxuICAgIFwiYXJuXCI6IFwiTWFwdWNoZVwiLFxuICAgIFwibXJcIjogXCJNYXJhdGhpXCIsXG4gICAgXCJjaG1cIjogXCJNYXJpXCIsXG4gICAgXCJtaFwiOiBcIk1hcnNoYWxsZXNlXCIsXG4gICAgXCJtd3JcIjogXCJNYXJ3YXJpXCIsXG4gICAgXCJtYXNcIjogXCJNYXNhaVwiLFxuICAgIFwibXpuXCI6IFwiTWF6YW5kZXJhbmlcIixcbiAgICBcImJ5dlwiOiBcIk1lZHVtYmFcIixcbiAgICBcIm1lblwiOiBcIk1lbmRlXCIsXG4gICAgXCJtd3ZcIjogXCJNZW50YXdhaVwiLFxuICAgIFwibWVyXCI6IFwiTWVydVwiLFxuICAgIFwibWdvXCI6IFwiTWV0YVxcdTAyYmNcIixcbiAgICBcImVzX01YXCI6IFwiTWV4aWNhbiBTcGFuaXNoXCIsXG4gICAgXCJtaWNcIjogXCJNaWNtYWNcIixcbiAgICBcImR1bVwiOiBcIk1pZGRsZSBEdXRjaFwiLFxuICAgIFwiZW5tXCI6IFwiTWlkZGxlIEVuZ2xpc2hcIixcbiAgICBcImZybVwiOiBcIk1pZGRsZSBGcmVuY2hcIixcbiAgICBcImdtaFwiOiBcIk1pZGRsZSBIaWdoIEdlcm1hblwiLFxuICAgIFwibWdhXCI6IFwiTWlkZGxlIElyaXNoXCIsXG4gICAgXCJuYW5cIjogXCJNaW4gTmFuIENoaW5lc2VcIixcbiAgICBcIm1pblwiOiBcIk1pbmFuZ2thYmF1XCIsXG4gICAgXCJ4bWZcIjogXCJNaW5ncmVsaWFuXCIsXG4gICAgXCJtd2xcIjogXCJNaXJhbmRlc2VcIixcbiAgICBcImx1c1wiOiBcIk1pem9cIixcbiAgICBcImFyXzAwMVwiOiBcIk1vZGVybiBTdGFuZGFyZCBBcmFiaWNcIixcbiAgICBcIm1vaFwiOiBcIk1vaGF3a1wiLFxuICAgIFwibWRmXCI6IFwiTW9rc2hhXCIsXG4gICAgXCJyb19NRFwiOiBcIk1vbGRhdmlhblwiLFxuICAgIFwibG9sXCI6IFwiTW9uZ29cIixcbiAgICBcIm1uXCI6IFwiTW9uZ29saWFuXCIsXG4gICAgXCJtZmVcIjogXCJNb3Jpc3llblwiLFxuICAgIFwiYXJ5XCI6IFwiTW9yb2NjYW4gQXJhYmljXCIsXG4gICAgXCJtb3NcIjogXCJNb3NzaVwiLFxuICAgIFwibXVsXCI6IFwiTXVsdGlwbGUgTGFuZ3VhZ2VzXCIsXG4gICAgXCJtdWFcIjogXCJNdW5kYW5nXCIsXG4gICAgXCJ0dHRcIjogXCJNdXNsaW0gVGF0XCIsXG4gICAgXCJteWVcIjogXCJNeWVuZVwiLFxuICAgIFwibmFxXCI6IFwiTmFtYVwiLFxuICAgIFwibmFcIjogXCJOYXVydVwiLFxuICAgIFwibnZcIjogXCJOYXZham9cIixcbiAgICBcIm5nXCI6IFwiTmRvbmdhXCIsXG4gICAgXCJuYXBcIjogXCJOZWFwb2xpdGFuXCIsXG4gICAgXCJuZVwiOiBcIk5lcGFsaVwiLFxuICAgIFwibmV3XCI6IFwiTmV3YXJpXCIsXG4gICAgXCJzYmFcIjogXCJOZ2FtYmF5XCIsXG4gICAgXCJubmhcIjogXCJOZ2llbWJvb25cIixcbiAgICBcImpnb1wiOiBcIk5nb21iYVwiLFxuICAgIFwieXJsXCI6IFwiTmhlZW5nYXR1XCIsXG4gICAgXCJuaWFcIjogXCJOaWFzXCIsXG4gICAgXCJuaXVcIjogXCJOaXVlYW5cIixcbiAgICBcInp4eFwiOiBcIk5vIGxpbmd1aXN0aWMgY29udGVudFwiLFxuICAgIFwibm9nXCI6IFwiTm9nYWlcIixcbiAgICBcIm5kXCI6IFwiTm9ydGggTmRlYmVsZVwiLFxuICAgIFwiZnJyXCI6IFwiTm9ydGhlcm4gRnJpc2lhblwiLFxuICAgIFwic2VcIjogXCJOb3J0aGVybiBTYW1pXCIsXG4gICAgXCJuc29cIjogXCJOb3J0aGVybiBTb3Rob1wiLFxuICAgIFwibm9cIjogXCJOb3J3ZWdpYW5cIixcbiAgICBcIm5iXCI6IFwiTm9yd2VnaWFuIEJva21cXHUwMGU1bFwiLFxuICAgIFwibm5cIjogXCJOb3J3ZWdpYW4gTnlub3Jza1wiLFxuICAgIFwibm92XCI6IFwiTm92aWFsXCIsXG4gICAgXCJudXNcIjogXCJOdWVyXCIsXG4gICAgXCJueW1cIjogXCJOeWFtd2V6aVwiLFxuICAgIFwibnlcIjogXCJOeWFuamFcIixcbiAgICBcIm55blwiOiBcIk55YW5rb2xlXCIsXG4gICAgXCJ0b2dcIjogXCJOeWFzYSBUb25nYVwiLFxuICAgIFwibnlvXCI6IFwiTnlvcm9cIixcbiAgICBcIm56aVwiOiBcIk56aW1hXCIsXG4gICAgXCJucW9cIjogXCJOXFx1MDJiY0tvXCIsXG4gICAgXCJvY1wiOiBcIk9jY2l0YW5cIixcbiAgICBcIm9qXCI6IFwiT2ppYndhXCIsXG4gICAgXCJhbmdcIjogXCJPbGQgRW5nbGlzaFwiLFxuICAgIFwiZnJvXCI6IFwiT2xkIEZyZW5jaFwiLFxuICAgIFwiZ29oXCI6IFwiT2xkIEhpZ2ggR2VybWFuXCIsXG4gICAgXCJzZ2FcIjogXCJPbGQgSXJpc2hcIixcbiAgICBcIm5vblwiOiBcIk9sZCBOb3JzZVwiLFxuICAgIFwicGVvXCI6IFwiT2xkIFBlcnNpYW5cIixcbiAgICBcInByb1wiOiBcIk9sZCBQcm92ZW5cXHUwMGU3YWxcIixcbiAgICBcIm9yXCI6IFwiT3JpeWFcIixcbiAgICBcIm9tXCI6IFwiT3JvbW9cIixcbiAgICBcIm9zYVwiOiBcIk9zYWdlXCIsXG4gICAgXCJvc1wiOiBcIk9zc2V0aWNcIixcbiAgICBcIm90YVwiOiBcIk90dG9tYW4gVHVya2lzaFwiLFxuICAgIFwicGFsXCI6IFwiUGFobGF2aVwiLFxuICAgIFwicGZsXCI6IFwiUGFsYXRpbmUgR2VybWFuXCIsXG4gICAgXCJwYXVcIjogXCJQYWxhdWFuXCIsXG4gICAgXCJwaVwiOiBcIlBhbGlcIixcbiAgICBcInBkY1wiOiBcIlBlbm5zeWx2YW5pYSBHZXJtYW5cIixcbiAgICBcImZhXCI6IFwiUGVyc2lhblwiLFxuICAgIFwicGhuXCI6IFwiUGhvZW5pY2lhblwiLFxuICAgIFwicGNkXCI6IFwiUGljYXJkXCIsXG4gICAgXCJwbXNcIjogXCJQaWVkbW9udGVzZVwiLFxuICAgIFwicGR0XCI6IFwiUGxhdXRkaWV0c2NoXCIsXG4gICAgXCJwb25cIjogXCJQb2hucGVpYW5cIixcbiAgICBcInBsXCI6IFwiUG9saXNoXCIsXG4gICAgXCJwbnRcIjogXCJQb250aWNcIixcbiAgICBcInB0XCI6IFwiUG9ydHVndWVzZVwiLFxuICAgIFwicHJnXCI6IFwiUHJ1c3NpYW5cIixcbiAgICBcInBhXCI6IFwiUHVuamFiaVwiLFxuICAgIFwicXVcIjogXCJRdWVjaHVhXCIsXG4gICAgXCJyb1wiOiBcIlJvbWFuaWFuXCIsXG4gICAgXCJybVwiOiBcIlJvbWFuc2hcIixcbiAgICBcInJvbVwiOiBcIlJvbWFueVwiLFxuICAgIFwicm9vdFwiOiBcIlJvb3RcIixcbiAgICBcInJ1XCI6IFwiUnVzc2lhblwiLFxuICAgIFwicndrXCI6IFwiUndhXCIsXG4gICAgXCJzYWhcIjogXCJTYWtoYVwiLFxuICAgIFwic2FtXCI6IFwiU2FtYXJpdGFuIEFyYW1haWNcIixcbiAgICBcInNtXCI6IFwiU2Ftb2FuXCIsXG4gICAgXCJzY29cIjogXCJTY290c1wiLFxuICAgIFwiZ2RcIjogXCJTY290dGlzaCBHYWVsaWNcIixcbiAgICBcInNseVwiOiBcIlNlbGF5YXJcIixcbiAgICBcInNlbFwiOiBcIlNlbGt1cFwiLFxuICAgIFwic2VoXCI6IFwiU2VuYVwiLFxuICAgIFwic2VlXCI6IFwiU2VuZWNhXCIsXG4gICAgXCJzclwiOiBcIlNlcmJpYW5cIixcbiAgICBcInNoXCI6IFwiU2VyYm8tQ3JvYXRpYW5cIixcbiAgICBcInNyclwiOiBcIlNlcmVyXCIsXG4gICAgXCJzZWlcIjogXCJTZXJpXCIsXG4gICAgXCJrc2JcIjogXCJTaGFtYmFsYVwiLFxuICAgIFwic2huXCI6IFwiU2hhblwiLFxuICAgIFwic25cIjogXCJTaG9uYVwiLFxuICAgIFwiaWlcIjogXCJTaWNodWFuIFlpXCIsXG4gICAgXCJzY25cIjogXCJTaWNpbGlhblwiLFxuICAgIFwic2lkXCI6IFwiU2lkYW1vXCIsXG4gICAgXCJibGFcIjogXCJTaWtzaWthXCIsXG4gICAgXCJzemxcIjogXCJTaWxlc2lhblwiLFxuICAgIFwiemhfSGFuc1wiOiBcIlNpbXBsaWZpZWQgQ2hpbmVzZVwiLFxuICAgIFwic2RcIjogXCJTaW5kaGlcIixcbiAgICBcInNpXCI6IFwiU2luaGFsYVwiLFxuICAgIFwic21zXCI6IFwiU2tvbHQgU2FtaVwiLFxuICAgIFwiZGVuXCI6IFwiU2xhdmVcIixcbiAgICBcInNrXCI6IFwiU2xvdmFrXCIsXG4gICAgXCJzbFwiOiBcIlNsb3ZlbmlhblwiLFxuICAgIFwieG9nXCI6IFwiU29nYVwiLFxuICAgIFwic29nXCI6IFwiU29nZGllblwiLFxuICAgIFwic29cIjogXCJTb21hbGlcIixcbiAgICBcInNua1wiOiBcIlNvbmlua2VcIixcbiAgICBcImNrYlwiOiBcIlNvcmFuaSBLdXJkaXNoXCIsXG4gICAgXCJhemJcIjogXCJTb3V0aCBBemVyYmFpamFuaVwiLFxuICAgIFwibnJcIjogXCJTb3V0aCBOZGViZWxlXCIsXG4gICAgXCJhbHRcIjogXCJTb3V0aGVybiBBbHRhaVwiLFxuICAgIFwic21hXCI6IFwiU291dGhlcm4gU2FtaVwiLFxuICAgIFwic3RcIjogXCJTb3V0aGVybiBTb3Rob1wiLFxuICAgIFwiZXNcIjogXCJTcGFuaXNoXCIsXG4gICAgXCJzcm5cIjogXCJTcmFuYW4gVG9uZ29cIixcbiAgICBcInpnaFwiOiBcIlN0YW5kYXJkIE1vcm9jY2FuIFRhbWF6aWdodFwiLFxuICAgIFwic3VrXCI6IFwiU3VrdW1hXCIsXG4gICAgXCJzdXhcIjogXCJTdW1lcmlhblwiLFxuICAgIFwic3VcIjogXCJTdW5kYW5lc2VcIixcbiAgICBcInN1c1wiOiBcIlN1c3VcIixcbiAgICBcInN3XCI6IFwiU3dhaGlsaVwiLFxuICAgIFwic3NcIjogXCJTd2F0aVwiLFxuICAgIFwic3ZcIjogXCJTd2VkaXNoXCIsXG4gICAgXCJmcl9DSFwiOiBcIlN3aXNzIEZyZW5jaFwiLFxuICAgIFwiZ3N3XCI6IFwiU3dpc3MgR2VybWFuXCIsXG4gICAgXCJkZV9DSFwiOiBcIlN3aXNzIEhpZ2ggR2VybWFuXCIsXG4gICAgXCJzeXJcIjogXCJTeXJpYWNcIixcbiAgICBcInNoaVwiOiBcIlRhY2hlbGhpdFwiLFxuICAgIFwidGxcIjogXCJUYWdhbG9nXCIsXG4gICAgXCJ0eVwiOiBcIlRhaGl0aWFuXCIsXG4gICAgXCJkYXZcIjogXCJUYWl0YVwiLFxuICAgIFwidGdcIjogXCJUYWppa1wiLFxuICAgIFwidGx5XCI6IFwiVGFseXNoXCIsXG4gICAgXCJ0bWhcIjogXCJUYW1hc2hla1wiLFxuICAgIFwidGFcIjogXCJUYW1pbFwiLFxuICAgIFwidHJ2XCI6IFwiVGFyb2tvXCIsXG4gICAgXCJ0d3FcIjogXCJUYXNhd2FxXCIsXG4gICAgXCJ0dFwiOiBcIlRhdGFyXCIsXG4gICAgXCJ0ZVwiOiBcIlRlbHVndVwiLFxuICAgIFwidGVyXCI6IFwiVGVyZW5vXCIsXG4gICAgXCJ0ZW9cIjogXCJUZXNvXCIsXG4gICAgXCJ0ZXRcIjogXCJUZXR1bVwiLFxuICAgIFwidGhcIjogXCJUaGFpXCIsXG4gICAgXCJib1wiOiBcIlRpYmV0YW5cIixcbiAgICBcInRpZ1wiOiBcIlRpZ3JlXCIsXG4gICAgXCJ0aVwiOiBcIlRpZ3JpbnlhXCIsXG4gICAgXCJ0ZW1cIjogXCJUaW1uZVwiLFxuICAgIFwidGl2XCI6IFwiVGl2XCIsXG4gICAgXCJ0bGlcIjogXCJUbGluZ2l0XCIsXG4gICAgXCJ0cGlcIjogXCJUb2sgUGlzaW5cIixcbiAgICBcInRrbFwiOiBcIlRva2VsYXVcIixcbiAgICBcInRvXCI6IFwiVG9uZ2FuXCIsXG4gICAgXCJmaXRcIjogXCJUb3JuZWRhbGVuIEZpbm5pc2hcIixcbiAgICBcInpoX0hhbnRcIjogXCJUcmFkaXRpb25hbCBDaGluZXNlXCIsXG4gICAgXCJ0a3JcIjogXCJUc2FraHVyXCIsXG4gICAgXCJ0c2RcIjogXCJUc2Frb25pYW5cIixcbiAgICBcInRzaVwiOiBcIlRzaW1zaGlhblwiLFxuICAgIFwidHNcIjogXCJUc29uZ2FcIixcbiAgICBcInRuXCI6IFwiVHN3YW5hXCIsXG4gICAgXCJ0Y3lcIjogXCJUdWx1XCIsXG4gICAgXCJ0dW1cIjogXCJUdW1idWthXCIsXG4gICAgXCJhZWJcIjogXCJUdW5pc2lhbiBBcmFiaWNcIixcbiAgICBcInRyXCI6IFwiVHVya2lzaFwiLFxuICAgIFwidGtcIjogXCJUdXJrbWVuXCIsXG4gICAgXCJ0cnVcIjogXCJUdXJveW9cIixcbiAgICBcInR2bFwiOiBcIlR1dmFsdVwiLFxuICAgIFwidHl2XCI6IFwiVHV2aW5pYW5cIixcbiAgICBcInR3XCI6IFwiVHdpXCIsXG4gICAgXCJrY2dcIjogXCJUeWFwXCIsXG4gICAgXCJ1ZG1cIjogXCJVZG11cnRcIixcbiAgICBcInVnYVwiOiBcIlVnYXJpdGljXCIsXG4gICAgXCJ1a1wiOiBcIlVrcmFpbmlhblwiLFxuICAgIFwidW1iXCI6IFwiVW1idW5kdVwiLFxuICAgIFwidW5kXCI6IFwiVW5rbm93biBMYW5ndWFnZVwiLFxuICAgIFwiaHNiXCI6IFwiVXBwZXIgU29yYmlhblwiLFxuICAgIFwidXJcIjogXCJVcmR1XCIsXG4gICAgXCJ1Z1wiOiBcIlV5Z2h1clwiLFxuICAgIFwidXpcIjogXCJVemJla1wiLFxuICAgIFwidmFpXCI6IFwiVmFpXCIsXG4gICAgXCJ2ZVwiOiBcIlZlbmRhXCIsXG4gICAgXCJ2ZWNcIjogXCJWZW5ldGlhblwiLFxuICAgIFwidmVwXCI6IFwiVmVwc1wiLFxuICAgIFwidmlcIjogXCJWaWV0bmFtZXNlXCIsXG4gICAgXCJ2b1wiOiBcIlZvbGFwXFx1MDBmY2tcIixcbiAgICBcInZyb1wiOiBcIlZcXHUwMGY1cm9cIixcbiAgICBcInZvdFwiOiBcIlZvdGljXCIsXG4gICAgXCJ2dW5cIjogXCJWdW5qb1wiLFxuICAgIFwid2FcIjogXCJXYWxsb29uXCIsXG4gICAgXCJ3YWVcIjogXCJXYWxzZXJcIixcbiAgICBcIndhclwiOiBcIldhcmF5XCIsXG4gICAgXCJ3YXNcIjogXCJXYXNob1wiLFxuICAgIFwiZ3VjXCI6IFwiV2F5dXVcIixcbiAgICBcImN5XCI6IFwiV2Vsc2hcIixcbiAgICBcInZsc1wiOiBcIldlc3QgRmxlbWlzaFwiLFxuICAgIFwiZnlcIjogXCJXZXN0ZXJuIEZyaXNpYW5cIixcbiAgICBcIm1yalwiOiBcIldlc3Rlcm4gTWFyaVwiLFxuICAgIFwid2FsXCI6IFwiV29sYXl0dGFcIixcbiAgICBcIndvXCI6IFwiV29sb2ZcIixcbiAgICBcInd1dVwiOiBcIld1IENoaW5lc2VcIixcbiAgICBcInhoXCI6IFwiWGhvc2FcIixcbiAgICBcImhzblwiOiBcIlhpYW5nIENoaW5lc2VcIixcbiAgICBcInlhdlwiOiBcIllhbmdiZW5cIixcbiAgICBcInlhb1wiOiBcIllhb1wiLFxuICAgIFwieWFwXCI6IFwiWWFwZXNlXCIsXG4gICAgXCJ5YmJcIjogXCJZZW1iYVwiLFxuICAgIFwieWlcIjogXCJZaWRkaXNoXCIsXG4gICAgXCJ5b1wiOiBcIllvcnViYVwiLFxuICAgIFwiemFwXCI6IFwiWmFwb3RlY1wiLFxuICAgIFwiZGplXCI6IFwiWmFybWFcIixcbiAgICBcInp6YVwiOiBcIlphemFcIixcbiAgICBcInplYVwiOiBcIlplZWxhbmRpY1wiLFxuICAgIFwiemVuXCI6IFwiWmVuYWdhXCIsXG4gICAgXCJ6YVwiOiBcIlpodWFuZ1wiLFxuICAgIFwiZ2J6XCI6IFwiWm9yb2FzdHJpYW4gRGFyaVwiLFxuICAgIFwienVcIjogXCJadWx1XCIsXG4gICAgXCJ6dW5cIjogXCJadW5pXCJcbn1cblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvY2EvY2EuZGF0YS5qcyIsIi8qKlxuICogQ3JlYXRlZCBieSBKdWFuQ3J1eiBvbiA0LzEvMjAxOC5cbiAqL1xuXG53aW5kb3cuQ29udGVudEFyZW5hID0gd2luZG93LkNvbnRlbnRBcmVuYSB8fCB7fTtcbkNvbnRlbnRBcmVuYS5VdGlscyA9IHtcblxuICAgIGNvbnRlbnRQYXJzZXJGcm9tU2VydmVyKGNvbnRlbnQpIHtcblxuICAgICAgICBpZiAoIGNvbnRlbnQucGFyc2VkICkgcmV0dXJuIGNvbnRlbnQ7XG5cbiAgICAgICAgbGV0IHNvcnQgPSB0cnVlO1xuXG4gICAgICAgIGlmICggY29udGVudC5leHRyYURhdGEpe1xuICAgICAgICAgICAgT2JqZWN0LmVudHJpZXMoY29udGVudC5leHRyYURhdGEpLmZvckVhY2goXG4gICAgICAgICAgICAgICAgKFtrZXksIHZhbHVlXSkgPT4gY29udGVudFtrZXldID0gdmFsdWVcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBjb250ZW50LnRvdXJuYW1lbnQgPSAoY29udGVudC50b3VybmFtZW50KSA/IEFycmF5LmlzQXJyYXkoY29udGVudC50b3VybmFtZW50KT8gY29udGVudC50b3VybmFtZW50IDogW2NvbnRlbnQudG91cm5hbWVudF0gOiBbXTtcbiAgICAgICAgY29udGVudC5zcG9ydENhdGVnb3J5ID0gKGNvbnRlbnQuc3BvcnRDYXRlZ29yeSkgPyBBcnJheS5pc0FycmF5KGNvbnRlbnQuc3BvcnRDYXRlZ29yeSk/IGNvbnRlbnQuc3BvcnRDYXRlZ29yeSA6IFtjb250ZW50LnNwb3J0Q2F0ZWdvcnldIDogW107XG5cbiAgICAgICAgaWYgKGNvbnRlbnQuc2VsZWN0ZWRSaWdodHNCeVN1cGVyUmlnaHQpe1xuICAgICAgICAgICAgY29udGVudC5yaWdodHNQYWNrYWdlLmZvckVhY2goIChycCkgPT4ge1xuICAgICAgICAgICAgICAgIHJwLnNlbGVjdGVkUmlnaHRzID0gY29udGVudC5zZWxlY3RlZFJpZ2h0c0J5U3VwZXJSaWdodFtycC5pZF1bJ2l0ZW1zJ107XG4gICAgICAgICAgICAgICAgcnAuZXhjbHVzaXZlID0gY29udGVudC5zZWxlY3RlZFJpZ2h0c0J5U3VwZXJSaWdodFtycC5pZF1bJ2V4Y2x1c2l2ZSddO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29udGVudC5maXh0dXJlc0J5U2Vhc29uKXtcbiAgICAgICAgICAgIGNvbnRlbnQuc2Vhc29ucy5mb3JFYWNoKCAocywgaSkgPT4ge1xuICAgICAgICAgICAgICAgIHMuZml4dHVyZXMgPSBjb250ZW50LmZpeHR1cmVzQnlTZWFzb25baV1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCBjb250ZW50LnNhbGVzUGFja2FnZXMgKSB7XG4gICAgICAgICAgICBjb250ZW50LnNhbGVzUGFja2FnZXMuZm9yRWFjaCgoc3ApID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoc3Auc2FsZXNNZXRob2QpIHNwLnNhbGVzTWV0aG9kID0gc3Auc2FsZXNNZXRob2QubmFtZTtcbiAgICAgICAgICAgICAgICBpZiAoc3AuZXhjbHVkZWRDb3VudHJpZXMpIHNwLmV4Y2x1ZGVkVGVycml0b3JpZXMgPSBzcC5leGNsdWRlZENvdW50cmllcy5tYXAodD0+e3JldHVybntsYWJlbDp0Lm5hbWUsIHZhbHVlOnQubmFtZX19KVxuICAgICAgICAgICAgICAgIGlmIChzcC50ZXJyaXRvcmllcykgc3AudGVycml0b3JpZXMgPSBzcC50ZXJyaXRvcmllcy5tYXAodD0+e3JldHVybntsYWJlbDp0Lm5hbWUsIHZhbHVlOnQubmFtZX19KVxuICAgICAgICAgICAgICAgIGlmICghc3AudGVycml0b3JpZXMpIHNvcnQgPSBmYWxzZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoc29ydCkgY29udGVudC5zYWxlc1BhY2thZ2VzLnNvcnQodGhpcy5zb3J0U2FsZXNQYWNrYWdlcykucmV2ZXJzZSgpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnRlbnQuc3RlcCA9IE51bWJlcihjb250ZW50LnN0ZXApO1xuICAgICAgICBjb250ZW50LnBhcnNlZCA9IHRydWU7XG5cbiAgICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSxcblxuICAgIHNvcnRTYWxlc1BhY2thZ2VzIChhLCBiKXtcbiAgICAgICAgbGV0IGMgPSAoYSwgYikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIChhID4gYikgPyAxIDogKChiID4gYSkgPyAtMSA6IDApXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBjKGEudGVycml0b3JpZXMubGVuZ3RoLCBiLnRlcnJpdG9yaWVzLmxlbmd0aCkgfHwgYyhiLm5hbWUsIGEubmFtZSk7XG4gICAgfSxcblxuXG5cbiAgICBpc0FQSUF2YWlsYWJsZSgpIHtcbiAgICAgICAgLy8gQ2hlY2sgZm9yIHRoZSB2YXJpb3VzIEZpbGUgQVBJIHN1cHBvcnQuXG4gICAgICAgIGlmICh3aW5kb3cuRmlsZSAmJiB3aW5kb3cuRmlsZVJlYWRlciAmJiB3aW5kb3cuRmlsZUxpc3QgJiYgd2luZG93LkJsb2IpIHtcbiAgICAgICAgICAgIC8vIEdyZWF0IHN1Y2Nlc3MhIEFsbCB0aGUgRmlsZSBBUElzIGFyZSBzdXBwb3J0ZWQuXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIHNvdXJjZTogRmlsZSBBUEkgYXZhaWxhYmlsaXR5IC0gaHR0cDovL2Nhbml1c2UuY29tLyNmZWF0PWZpbGVhcGlcbiAgICAgICAgICAgIC8vIHNvdXJjZTogPG91dHB1dD4gYXZhaWxhYmlsaXR5IC0gaHR0cDovL2h0bWw1ZG9jdG9yLmNvbS90aGUtb3V0cHV0LWVsZW1lbnQvXG4gICAgICAgICAgICBkb2N1bWVudC53cml0ZWxuKCdUaGUgSFRNTDUgQVBJcyB1c2VkIGluIHRoaXMgZm9ybSBhcmUgb25seSBhdmFpbGFibGUgaW4gdGhlIGZvbGxvd2luZyBicm93c2Vyczo8YnIgLz4nKTtcbiAgICAgICAgICAgIC8vIDYuMCBGaWxlIEFQSSAmIDEzLjAgPG91dHB1dD5cbiAgICAgICAgICAgIGRvY3VtZW50LndyaXRlbG4oJyAtIEdvb2dsZSBDaHJvbWU6IDEzLjAgb3IgbGF0ZXI8YnIgLz4nKTtcbiAgICAgICAgICAgIC8vIDMuNiBGaWxlIEFQSSAmIDYuMCA8b3V0cHV0PlxuICAgICAgICAgICAgZG9jdW1lbnQud3JpdGVsbignIC0gTW96aWxsYSBGaXJlZm94OiA2LjAgb3IgbGF0ZXI8YnIgLz4nKTtcbiAgICAgICAgICAgIC8vIDEwLjAgRmlsZSBBUEkgJiAxMC4wIDxvdXRwdXQ+XG4gICAgICAgICAgICBkb2N1bWVudC53cml0ZWxuKCcgLSBJbnRlcm5ldCBFeHBsb3JlcjogTm90IHN1cHBvcnRlZCAocGFydGlhbCBzdXBwb3J0IGV4cGVjdGVkIGluIDEwLjApPGJyIC8+Jyk7XG4gICAgICAgICAgICAvLyA/IEZpbGUgQVBJICYgNS4xIDxvdXRwdXQ+XG4gICAgICAgICAgICBkb2N1bWVudC53cml0ZWxuKCcgLSBTYWZhcmk6IE5vdCBzdXBwb3J0ZWQ8YnIgLz4nKTtcbiAgICAgICAgICAgIC8vID8gRmlsZSBBUEkgJiA5LjIgPG91dHB1dD5cbiAgICAgICAgICAgIGRvY3VtZW50LndyaXRlbG4oJyAtIE9wZXJhOiBOb3Qgc3VwcG9ydGVkJyk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGFkZE9yZGluYWwobikge1xuICAgICAgICB2YXIgc3RyID0gbi50b1N0cmluZygpLnNsaWNlKC0xKSxcbiAgICAgICAgICAgIG9yZCA9ICcnO1xuICAgICAgICBzd2l0Y2ggKHN0cikge1xuICAgICAgICAgICAgY2FzZSAnMSc6XG4gICAgICAgICAgICAgICAgb3JkID0gJ3N0JztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJzInOlxuICAgICAgICAgICAgICAgIG9yZCA9ICduZCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICczJzpcbiAgICAgICAgICAgICAgICBvcmQgPSAncmQnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnNCc6XG4gICAgICAgICAgICBjYXNlICc1JzpcbiAgICAgICAgICAgIGNhc2UgJzYnOlxuICAgICAgICAgICAgY2FzZSAnNyc6XG4gICAgICAgICAgICBjYXNlICc4JzpcbiAgICAgICAgICAgIGNhc2UgJzknOlxuICAgICAgICAgICAgY2FzZSAnMCc6XG4gICAgICAgICAgICAgICAgb3JkID0gJ3RoJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbiArIG9yZDtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHZhbHVlXG4gICAgICogQHBhcmFtIGFyclxuICAgICAqIEBwYXJhbSBwcm9wXG4gICAgICogQHJldHVybnMge251bWJlcn1cbiAgICAgKi9cbiAgICBnZXRJbmRleCAodmFsdWUsIGFyciwgcHJvcCkge1xuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZihhcnJbaV1bcHJvcF0gPT09IHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIC0xOyAvL3RvIGhhbmRsZSB0aGUgY2FzZSB3aGVyZSB0aGUgdmFsdWUgZG9lc24ndCBleGlzdFxuICAgIH1cblxufTtcblxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9jYS9jYS51dGlscy5qcyJdLCJzb3VyY2VSb290IjoiIn0=