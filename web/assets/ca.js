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

            if (_this2.sport !== null) title += _this2.sport.value;
            if (_this2.category !== null) title += " - " + _this2.category.value;
            if (_this2.tournament !== null) title += " - " + _this2.tournament.value;

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

},[1]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9jYS9jYS5hcGkuY29udGVudC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9jYS9jYS5hcGkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvY2EvY2EuZGF0YS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9jYS9jYS5tb2RlbHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvY2EvY2EudXRpbHMuanMiXSwibmFtZXMiOlsiX19hcGlTdG9yZSIsInRvdXJuYW1lbnRzIiwid2luZG93IiwiQ29udGVudEFyZW5hIiwiQ29udGVudEFwaSIsInNhdmVDb250ZW50QXNEcmFmdCIsImNvbnRlbnQiLCJkZWZlcnJlZCIsImpRdWVyeSIsIkRlZmVycmVkIiwiX3RoaXMiLCIkIiwiYWpheCIsInVybCIsImVudmhvc3R1cmwiLCJ0eXBlIiwiZGF0YSIsIkpTT04iLCJzdHJpbmdpZnkiLCJjb250ZW50VHlwZSIsInN1Y2Nlc3MiLCJyZXNwb25zZSIsInJlc29sdmUiLCJlcnJvciIsInN0YXR1cyIsInJlamVjdCIsInByb21pc2UiLCJzYXZlQ29udGVudEFzSW5hY3RpdmUiLCJzYXZlQ29udGVudEFzQWN0aXZlIiwic2VuZE1lc3NhZ2UiLCJtZXNzYWdlIiwiZ2V0VXNlckluZm8iLCJnZXRDb21wYW55VXNlcnMiLCJ1cGRhdGVDb21wYW55IiwiY29tcGFueSIsInVwZGF0ZVBhc3N3b3JkIiwidXBkYXRlVXNlciIsInVzZXIiLCJnZXRUaHJlYWQiLCJjdXN0b21JZCIsImdldFRocmVhZHMiLCJwbGFjZUJpZCIsImJpZCIsImFjY2VwdEJpZCIsInNpZ25hdHVyZSIsInJlamVjdEJpZCIsInJlbW92ZUJpZCIsInNhdmVUbXBGaWxlIiwiZmlsZXMiLCJGb3JtRGF0YSIsImFwcGVuZCIsInByb2Nlc3NEYXRhIiwiZ2V0QnlDdXN0b21JZCIsImdldERyYWZ0TGlzdGluZ3MiLCJnZXRJbmFjdGl2ZUxpc3RpbmdzIiwiZ2V0QWN0aXZlTGlzdGluZ3MiLCJnZXRFeHBpcmVkTGlzdGluZ3MiLCJyZW1vdmVMaXN0aW5nIiwiZHVwbGljYXRlTGlzdGluZyIsImRlYWN0aXZhdGVMaXN0aW5nIiwiZ2V0Q2xvc2VkRGVhbHMiLCJnZXRBbGxEZWFscyIsImdldFBlbmRpbmdEZWFscyIsImdldFJlamVjdGVkRGVhbHMiLCJnZXRXYXRjaGxpc3RMaXN0aW5ncyIsIkFwaSIsInNvcnRCeUxhYmVsIiwiYSIsImIiLCJuYW1lIiwic29ydEJ5U3BvcnQiLCJzcG9ydCIsInNwb3J0Q2F0ZWdvcnkiLCJwcmVwYXJlTGlzdCIsImxpc3QiLCJjYXRlZ29yeUlkIiwibWFwIiwiaXRlbSIsImNhdGVnb3J5IiwiaWQiLCJleHRlcm5hbElkIiwic29ydCIsImdldENvbnRlbnQiLCJmaWx0ZXIiLCJnZXRKc29uQ29udGVudCIsInNhdmVGaWx0ZXIiLCJnZXRDb3VudHJpZXMiLCJnZXRBY3RpdmVTcG9ydHMiLCJnZXRDb3VudHJpZXNGdWxsIiwiZ2V0VGVycml0b3JpZXMiLCJnZXRSaWdodHMiLCJyaWdodHNQYWNrYWdlIiwiZ3JvdXAiLCJnZXRSaWdodHNQYWNrYWdlIiwiZ2V0U3BvcnRzIiwiZXh0ZXJuYWxBcGlVcmwiLCJzcG9ydHMiLCJnZXRDb250ZW50RGV0YWlscyIsImdldFBlbmRpbmdMaXN0aW5ncyIsImdldENhdGVnb3JpZXMiLCJzcG9ydElkIiwiY2F0cyIsImdldFRvdXJuYW1lbnRzIiwiZG9uZSIsInRvdXJuYW1lbnQiLCJpbmRleE9mIiwicHVzaCIsInVuZGVmaW5lZCIsImdldFNlYXNvbnMiLCJ0b3VybmFtZW50SWQiLCJzZWFzb25zIiwic2Vhc29uIiwiaXNBcnJheSIsImVuZERhdGUiLCJlbmRfZGF0ZSIsInN0YXJ0RGF0ZSIsInN0YXJ0X2RhdGUiLCJ0b3VybmFtZW50X2lkIiwieWVhciIsInJldmVyc2UiLCJnZXRTY2hlZHVsZSIsInNlYXNvbklkIiwic3BvcnRfZXZlbnRzIiwic3BvcnRfZXZlbnQiLCJmb3JFYWNoIiwicm91bmQiLCJ0b3VybmFtZW50X3JvdW5kIiwibnVtYmVyIiwibWF0Y2hlcyIsIk1hcCIsInNldCIsInNjaGVkdWxlZCIsInRvdXJuYW1lbnRSb3VuZCIsImNvbXBldGl0b3JzIiwiY29tcGV0aXRvciIsInNlYXJjaENvbXBldGl0aW9uIiwicmVxdWVzdCIsInRyYWRpdGlvbmFsIiwiZGF0YVR5cGUiLCJ3YXRjaGxpc3QiLCJEYXRhIiwiTGFuZ3VhZ2VzIiwiVG9wU3BvcnRzIiwiRnVsbFNwb3J0cyIsIkNvdW50cmllcyIsIlNob3J0IiwiTG9uZyIsIk1vZGVsIiwiUmlnaHRQYWNrYWdlIiwicmlnaHRzIiwiUmlnaHQiLCJyaWdodEl0ZW1zIiwiUmlnaHRJdGVtIiwiaW5wdXRzIiwiU2VsZWN0ZWRSaWdodCIsInJpZ2h0IiwicmlnaHRJdGVtIiwiU2FsZXNQYWNrYWdlIiwic2FsZXNNZXRob2QiLCJmZWUiLCJjdXJyZW5jeSIsInRlcnJpdG9yaWVzIiwic2VsZWN0ZWRUZXJyaXRvcmllcyIsImV4Y2x1ZGVkVGVycml0b3JpZXMiLCJ0ZXJyaXRvcnlCaWRzIiwic2VsbEFzUGFja2FnZSIsInZhbGlkYXRlIiwiZGVzY3JpcHRpb24iLCJoYXNFcnJvcnMiLCJDb250ZW50Iiwic2FsZXNQYWNrYWdlcyIsImluc3RhbGxtZW50cyIsImdldFRpdGxlIiwiY29uc29sZSIsImxvZyIsInRpdGxlIiwibGVuZ3RoIiwiaW5kZXgiLCJhcnJheSIsInZhbHVlIiwidmFsdWVzIiwic3BsaXQiLCJqb2luIiwid2F0Y2giLCJhcmd1bWVudHMiLCJVdGlscyIsImNvbnRlbnRQYXJzZXJGcm9tU2VydmVyIiwicGFyc2VkIiwiZXh0cmFEYXRhIiwiT2JqZWN0IiwiZW50cmllcyIsImtleSIsIkFycmF5Iiwic2VsZWN0ZWRSaWdodHNCeVN1cGVyUmlnaHQiLCJycCIsInNlbGVjdGVkUmlnaHRzIiwiZXhjbHVzaXZlIiwiZml4dHVyZXNCeVNlYXNvbiIsInMiLCJpIiwiZml4dHVyZXMiLCJzcCIsImV4Y2x1ZGVkQ291bnRyaWVzIiwibGFiZWwiLCJ0Iiwic29ydFNhbGVzUGFja2FnZXMiLCJzdGVwIiwiTnVtYmVyIiwiYyIsImlzQVBJQXZhaWxhYmxlIiwiRmlsZSIsIkZpbGVSZWFkZXIiLCJGaWxlTGlzdCIsIkJsb2IiLCJkb2N1bWVudCIsIndyaXRlbG4iLCJhZGRPcmRpbmFsIiwibiIsInN0ciIsInRvU3RyaW5nIiwic2xpY2UiLCJvcmQiLCJnZXRJbmRleCIsImFyciIsInByb3AiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztBQUlBLElBQUlBLGFBQWE7QUFDYkMsaUJBQWM7QUFERCxDQUFqQjs7QUFJQUMsT0FBT0MsWUFBUCxHQUFzQkQsT0FBT0MsWUFBUCxJQUF1QixFQUE3QztBQUNBQSxhQUFhQyxVQUFiLEdBQTBCRCxhQUFhQyxVQUFiLElBQTBCLEVBQXBEOztBQUVBRCxhQUFhQyxVQUFiLEdBQXlCO0FBQ3JCQyxzQkFEcUIsOEJBQ0FDLE9BREEsRUFDVTtBQUMzQixZQUFJQyxXQUFXQyxPQUFPQyxRQUFQLEVBQWY7QUFBQSxZQUNJQyxRQUFRLElBRFo7O0FBR0FDLFVBQUVDLElBQUYsQ0FBTztBQUNIQyxpQkFBS0MsYUFBYSxvQkFEZjtBQUVIQyxrQkFBTSxNQUZIO0FBR0hDLGtCQUFNQyxLQUFLQyxTQUFMLENBQWVaLE9BQWYsQ0FISDtBQUlIYSx5QkFBYSxrQkFKVjtBQUtIQyxxQkFBUyxpQkFBVUMsUUFBVixFQUFvQjtBQUN6QmQseUJBQVNlLE9BQVQsQ0FBaUJELFFBQWpCO0FBQ0gsYUFQRTtBQVFIRSxtQkFBUSxlQUFVUCxJQUFWLEVBQWdCUSxNQUFoQixFQUF3QjtBQUM1QmpCLHlCQUFTa0IsTUFBVCxDQUFnQjtBQUNaVCww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QTRHVztBQUN4QixhQUFJLElBQUl6QixJQUFJLENBQVosRUFBZUEsSUFBSXdCLElBQUkvQyxNQUF2QixFQUErQnVCLEdBQS9CLEVBQW9DO0FBQ2hDLGdCQUFHd0IsSUFBSXhCLENBQUosRUFBT3lCLElBQVAsTUFBaUI3QyxLQUFwQixFQUEyQjtBQUN2Qix1QkFBT29CLENBQVA7QUFDSDtBQUNKO0FBQ0QsZUFBTyxDQUFDLENBQVIsQ0FOd0IsQ0FNYjtBQUNkO0FBbkhnQixDQUFyQixDIiwiZmlsZSI6ImNhLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4qIENyZWF0ZWQgYnkgSnVhbkNydXogb24gNC8xLzIwMTguXG4qL1xuXG5sZXQgX19hcGlTdG9yZSA9IHtcbiAgICB0b3VybmFtZW50cyA6IHt9XG59O1xuXG53aW5kb3cuQ29udGVudEFyZW5hID0gd2luZG93LkNvbnRlbnRBcmVuYSB8fCB7fTtcbkNvbnRlbnRBcmVuYS5Db250ZW50QXBpID0gQ29udGVudEFyZW5hLkNvbnRlbnRBcGl8fCB7fTtcblxuQ29udGVudEFyZW5hLkNvbnRlbnRBcGk9IHtcbiAgICBzYXZlQ29udGVudEFzRHJhZnQgKCBjb250ZW50ICkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJjb250ZW50L2RyYWZ0L3NhdmVcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoY29udGVudCksXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgc2F2ZUNvbnRlbnRBc0luYWN0aXZlICggY29udGVudCApIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL2xpc3Rpbmcvc2F2ZVwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShjb250ZW50KSxcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICBzYXZlQ29udGVudEFzQWN0aXZlICggY29udGVudCApIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL2xpc3RpbmcvcHVibGlzaFwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShjb250ZW50KSxcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICBzZW5kTWVzc2FnZSAoIG1lc3NhZ2UgKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxuICAgICAgICAgICAgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS9tZXNzYWdlcy9zZW5kXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KG1lc3NhZ2UpLFxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIGdldFVzZXJJbmZvICggKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxuICAgICAgICAgICAgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS91c2VyL2luZm9cIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIGdldENvbXBhbnlVc2VycyAoICkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvY29tcGFueS91c2Vyc1wiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgdXBkYXRlQ29tcGFueSAoIGNvbXBhbnkgKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxuICAgICAgICAgICAgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS9jb21wYW55L3VwZGF0ZVwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7Y29tcGFueTpjb21wYW55fSksXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG5cbiAgICB1cGRhdGVQYXNzd29yZCAoIGRhdGEgKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxuICAgICAgICAgICAgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS91c2VyL3Bhc3N3b3JkXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KGRhdGEpLFxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIHVwZGF0ZVVzZXIgKCB1c2VyICkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvdXNlci91cGRhdGVcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoe3VzZXI6dXNlcn0pLFxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIGdldFRocmVhZCAoIGN1c3RvbUlkICkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvbWVzc2FnZXMvdGhyZWFkXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHtjdXN0b21JZDogY3VzdG9tSWR9KSxcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICBnZXRUaHJlYWRzICggICkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvbWVzc2FnZXMvdGhyZWFkc1wiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgcGxhY2VCaWQgKCBiaWQgKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxuICAgICAgICAgICAgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS9iaWQvcGxhY2VcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoYmlkKSxcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICBhY2NlcHRCaWQgKCBiaWQsIHNpZ25hdHVyZSApIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgYmlkLnNpZ25hdHVyZSA9IHNpZ25hdHVyZTtcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvYmlkL2FjY2VwdFwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShiaWQpLFxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIHJlamVjdEJpZCAoIGJpZCApIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL2JpZC9yZWplY3RcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoYmlkKSxcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICByZW1vdmVCaWQgKCBiaWQgKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxuICAgICAgICAgICAgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS9iaWQvcmVtb3ZlXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KGJpZCksXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG5cbiAgICBzYXZlVG1wRmlsZSAoIGZpbGVzICkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcblxuICAgICAgICBjb25zdCBkYXRhID0gbmV3IEZvcm1EYXRhKCk7XG4gICAgICAgIGRhdGEuYXBwZW5kKCdmaWxlJywgZmlsZXNbMF0pO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImNvbnRlbnQvc2F2ZS9maWxlXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICBwcm9jZXNzRGF0YTogZmFsc2UsXG4gICAgICAgICAgICBjb250ZW50VHlwZTogZmFsc2UsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgZ2V0QnlDdXN0b21JZCAoIGN1c3RvbUlkICkge1xuICAgICAgICB2YXIgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJsaXN0aW5nL2RldGFpbHNcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIGN1c3RvbUlkIDogY3VzdG9tSWQsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuXG4gICAgZ2V0RHJhZnRMaXN0aW5ncyAoICkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKTtcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvbGlzdGluZ3MvZHJhZnRcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIGdldEluYWN0aXZlTGlzdGluZ3MgKCApIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCk7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL2xpc3RpbmdzL2luYWN0aXZlXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICBnZXRBY3RpdmVMaXN0aW5ncyAoICkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKTtcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvbGlzdGluZ3MvYWN0aXZlXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICBnZXRFeHBpcmVkTGlzdGluZ3MgKCApIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCk7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL2xpc3RpbmdzL2V4cGlyZWRcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIHJlbW92ZUxpc3RpbmcoIGN1c3RvbUlkICkge1xuICAgICAgICB2YXIgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvbGlzdGluZ3MvcmVtb3ZlXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBjdXN0b21JZCA6IGN1c3RvbUlkLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICBkdXBsaWNhdGVMaXN0aW5nKCBjdXN0b21JZCApIHtcbiAgICAgICAgdmFyIGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL2xpc3RpbmdzL2R1cGxpY2F0ZVwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgY3VzdG9tSWQgOiBjdXN0b21JZCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgZGVhY3RpdmF0ZUxpc3RpbmcoIGN1c3RvbUlkICkge1xuICAgICAgICB2YXIgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvbGlzdGluZ3MvZGVhY3RpdmF0ZVwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgY3VzdG9tSWQgOiBjdXN0b21JZCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG5cbiAgICBnZXRDbG9zZWREZWFscyAoICApIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCk7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL2JpZC9jbG9zZWRcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICBnZXRBbGxEZWFscyAoICApIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCk7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL2JpZC9hbGxcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICBnZXRQZW5kaW5nRGVhbHMgKCAgKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS9iaWQvcGVuZGluZ1wiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIGdldFJlamVjdGVkRGVhbHMgKCAgKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS9iaWQvcmVqZWN0ZWRcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICBnZXRXYXRjaGxpc3RMaXN0aW5ncyAoKXtcbiAgICAgICAgdmFyIGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL2xpc3RpbmdzL3dhdGNobGlzdFwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG5cbn07XG5cblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvY2EvY2EuYXBpLmNvbnRlbnQuanMiLCIvKipcbiAqIENyZWF0ZWQgYnkgSnVhbkNydXogb24gNC8xLzIwMTguXG4gKi9cblxubGV0IF9fYXBpU3RvcmUgPSB7XG4gICAgdG91cm5hbWVudHMgOiB7fVxufTtcblxud2luZG93LkNvbnRlbnRBcmVuYSA9IHdpbmRvdy5Db250ZW50QXJlbmEgfHwge307XG5cbkNvbnRlbnRBcmVuYS5BcGk9IHtcbiAgICBzb3J0QnlMYWJlbCAoYSwgYikge1xuICAgICAgICByZXR1cm4gKGEubmFtZSA+IGIubmFtZSkgPyAxIDogKChiLm5hbWUgPiBhLm5hbWUpID8gLTEgOiAwKVxuICAgIH0sXG4gICAgc29ydEJ5U3BvcnQgKGEsIGIpIHtcblxuICAgICAgICBpZiAoYS5zcG9ydC5uYW1lID4gYi5zcG9ydC5uYW1lKSByZXR1cm4gMTtcbiAgICAgICAgaWYgKGEuc3BvcnQubmFtZSA8IGIuc3BvcnQubmFtZSkgcmV0dXJuIC0xO1xuICAgICAgICBpZiAoYS5zcG9ydENhdGVnb3J5Lm5hbWUgPiBiLnNwb3J0Q2F0ZWdvcnkubmFtZSkgcmV0dXJuIDE7XG4gICAgICAgIGlmIChhLnNwb3J0Q2F0ZWdvcnkubmFtZSA8IGIuc3BvcnRDYXRlZ29yeS5uYW1lKSByZXR1cm4gLTE7XG4gICAgICAgIGlmIChhLm5hbWUgPiBiLm5hbWUpIHJldHVybiAxO1xuICAgICAgICBpZiAoYS5uYW1lIDwgYi5uYW1lKSByZXR1cm4gLTE7XG4gICAgICAgIHJldHVybiAwO1xuXG4gICAgfSxcbiAgICBwcmVwYXJlTGlzdCAoIGxpc3QsIGNhdGVnb3J5SWQgKSB7XG5cbiAgICAgICAgbGV0IF90aGlzID0gdGhpcztcblxuICAgICAgICBsaXN0ID0gJC5tYXAobGlzdCwgZnVuY3Rpb24gKGl0ZW0pIHtcblxuICAgICAgICAgICAgLy8gRmlsdGVyIGJ5IGNhdGVnb3J5XG4gICAgICAgICAgICBpZiAoIGNhdGVnb3J5SWQgJiYgaXRlbS5jYXRlZ29yeVsnQGF0dHJpYnV0ZXMnXS5pZCAhPSBjYXRlZ29yeUlkKSByZXR1cm4gbnVsbDtcblxuICAgICAgICAgICAgcmV0dXJuIHtuYW1lOiBpdGVtWydAYXR0cmlidXRlcyddLm5hbWUsIGV4dGVybmFsSWQ6IGl0ZW1bJ0BhdHRyaWJ1dGVzJ10uaWR9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGxpc3Quc29ydChfdGhpcy5zb3J0QnlMYWJlbCk7XG5cbiAgICAgICAgcmV0dXJuIGxpc3Q7XG4gICAgfSxcbiAgICBnZXRDb250ZW50ICggZmlsdGVyKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImJ1eS9zZWFyY2hcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YSA6IGZpbHRlcixcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICBnZXRKc29uQ29udGVudCAoIGZpbHRlcikge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKTtcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJsaXN0aW5ncy9tYXJrZXRwbGFjZVwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhIDogZmlsdGVyLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIHNhdmVGaWx0ZXIgKCBmaWx0ZXIpIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCk7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYnV5L2ZpbHRlci9zYXZlXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGEgOiBmaWx0ZXIsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgZ2V0Q291bnRyaWVzICgpIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCk7XG4gICAgICAgIGxldCBfdGhpcyA9IHRoaXM7XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS9zZWFyY2gvY291bnRyaWVzL2FsbFwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEBwYXJhbSB7YXJyYXl9IHJlc3BvbnNlXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlLnNvcnQoX3RoaXMuc29ydEJ5TGFiZWwpO1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICBnZXRBY3RpdmVTcG9ydHMgKCkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKTtcbiAgICAgICAgbGV0IF90aGlzID0gdGhpcztcbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL3NlYXJjaC9zcG9ydHMvYWN0aXZlXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQHBhcmFtIHthcnJheX0gcmVzcG9uc2VcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIGdldENvdW50cmllc0Z1bGwgKCkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKTtcbiAgICAgICAgbGV0IF90aGlzID0gdGhpcztcbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL3NlYXJjaC9jb3VudHJpZXMvZnVsbFwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEBwYXJhbSB7YXJyYXl9IHJlc3BvbnNlXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlLnNvcnQoX3RoaXMuc29ydEJ5TGFiZWwpO1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICBnZXRUZXJyaXRvcmllcyAoKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpO1xuICAgICAgICBsZXQgX3RoaXMgPSB0aGlzO1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvc2VhcmNoL3RlcnJpdG9yaWVzXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQHBhcmFtIHthcnJheX0gcmVzcG9uc2VcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2Uuc29ydChfdGhpcy5zb3J0QnlMYWJlbCk7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIGdldFJpZ2h0cyAocmlnaHRzUGFja2FnZSwgZ3JvdXApIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCk7XG4gICAgICAgIGxldCBfdGhpcyA9IHRoaXM7XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS9zZWFyY2gvcmlnaHRzXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGEgOiB7XG4gICAgICAgICAgICAgICAgcmlnaHRzUGFja2FnZTogcmlnaHRzUGFja2FnZSxcbiAgICAgICAgICAgICAgICBncm91cDogZ3JvdXBcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQHBhcmFtIHthcnJheX0gcmVzcG9uc2VcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIGdldFJpZ2h0c1BhY2thZ2UgKHJpZ2h0c1BhY2thZ2UsIGdyb3VwKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpO1xuICAgICAgICBsZXQgX3RoaXMgPSB0aGlzO1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvc2VhcmNoL3JpZ2h0cy1wYWNrYWdlXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGEgOiB7XG4gICAgICAgICAgICAgICAgcmlnaHRzUGFja2FnZTogcmlnaHRzUGFja2FnZSxcbiAgICAgICAgICAgICAgICBncm91cDogZ3JvdXBcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQHBhcmFtIHthcnJheX0gcmVzcG9uc2VcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIGdldFNwb3J0cyAoKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpO1xuICAgICAgICBsZXQgX3RoaXMgPSB0aGlzO1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBleHRlcm5hbEFwaVVybCArIFwidjEvZmVlZC9zcG9ydHNcIixcbiAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEBwYXJhbSB7e3Nwb3J0Om9iamVjdH19IHJlc3BvbnNlXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuXG4gICAgICAgICAgICAgICAgdmFyIHNwb3J0cyA9IF90aGlzLnByZXBhcmVMaXN0KCByZXNwb25zZS5zcG9ydCk7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShzcG9ydHMpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICBnZXRDb250ZW50RGV0YWlscyggaWQgKSB7XG4gICAgICAgIHZhciBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxuICAgICAgICAgICAgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImNvbnRlbnQvZGV0YWlscy9cIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YToge2lkIDogaWR9LFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIGdldFBlbmRpbmdMaXN0aW5ncyggaWQgKSB7XG4gICAgICAgIHZhciBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxuICAgICAgICAgICAgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImNvbnRlbnQvcGVuZGluZy1saXN0aW5ncy9cIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YToge2lkIDogaWR9LFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIGdldENhdGVnb3JpZXMgKCBzcG9ydElkICkge1xuICAgICAgICB2YXIgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcbiAgICAgICAgICAgIF90aGlzID0gdGhpcyxcbiAgICAgICAgICAgIGxpc3QgPSBbXSxcbiAgICAgICAgICAgIGNhdHMgPSBbXTtcblxuICAgICAgICBfdGhpcy5nZXRUb3VybmFtZW50cyhzcG9ydElkKS5kb25lKGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgaWYgKCAhIF9fYXBpU3RvcmUudG91cm5hbWVudHNbc3BvcnRJZF0gKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSggW10gKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxpc3QgPSAkLm1hcCggX19hcGlTdG9yZS50b3VybmFtZW50c1tzcG9ydElkXS50b3VybmFtZW50ICwgZnVuY3Rpb24gKGl0ZW0pIHtcblxuICAgICAgICAgICAgICAgIGxldCBpZCA9IGl0ZW0uY2F0ZWdvcnlbJ0BhdHRyaWJ1dGVzJ10uaWQ7XG5cbiAgICAgICAgICAgICAgICBpZiAoIGNhdHMuaW5kZXhPZihpZCkgIT09IC0xICkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjYXRzLnB1c2goIGlkICk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLmNhdGVnb3J5O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKF90aGlzLnByZXBhcmVMaXN0KGxpc3QpICk7XG4gICAgICAgIH0pO1xuXG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIGdldFRvdXJuYW1lbnRzICggc3BvcnRJZCwgY2F0ZWdvcnlJZCApIHtcbiAgICAgICAgdmFyIGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgaWYgKCBfX2FwaVN0b3JlLnRvdXJuYW1lbnRzW3Nwb3J0SWRdICE9PSB1bmRlZmluZWQgKXtcbiAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoX3RoaXMucHJlcGFyZUxpc3QoX19hcGlTdG9yZS50b3VybmFtZW50c1tzcG9ydElkXS50b3VybmFtZW50LCBjYXRlZ29yeUlkKSk7XG4gICAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZXh0ZXJuYWxBcGlVcmwgKyBcInYxL2ZlZWQvdG91cm5hbWVudHNcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YSA6IHsgaWQgOiBzcG9ydElkIH0sXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEBwYXJhbSB7e3RvdXJuYW1lbnRzOnt0b3VybmFtZW50OkFycmF5fX19IHJlc3BvbnNlXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuXG4gICAgICAgICAgICAgICAgLy8gQSBjb21tZW50XG4gICAgICAgICAgICAgICAgaWYgKCByZXNwb25zZS50b3VybmFtZW50cyA9PT0gdW5kZWZpbmVkIHx8IHJlc3BvbnNlLnRvdXJuYW1lbnRzLnRvdXJuYW1lbnQgPT09IHVuZGVmaW5lZCApIHtcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShbXSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBfX2FwaVN0b3JlLnRvdXJuYW1lbnRzW3Nwb3J0SWRdID0gcmVzcG9uc2UudG91cm5hbWVudHM7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShfdGhpcy5wcmVwYXJlTGlzdChyZXNwb25zZS50b3VybmFtZW50cy50b3VybmFtZW50LCBjYXRlZ29yeUlkKSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzICkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgZ2V0U2Vhc29ucyAoIHRvdXJuYW1lbnRJZCApIHtcbiAgICAgICAgdmFyIGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZXh0ZXJuYWxBcGlVcmwgKyBcInYxL2ZlZWQvc2Vhc29uc1wiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhIDogeyBpZCA6IHRvdXJuYW1lbnRJZCB9LFxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBAcGFyYW0ge3t0b3VybmFtZW50czp7dG91cm5hbWVudDpBcnJheX19fSByZXNwb25zZVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcblxuICAgICAgICAgICAgICAgIHZhciBsaXN0O1xuXG4gICAgICAgICAgICAgICAgaWYgKCByZXNwb25zZS5zZWFzb25zID09PSB1bmRlZmluZWQgfHwgcmVzcG9uc2Uuc2Vhc29ucy5zZWFzb24gPT09IHVuZGVmaW5lZCApIHJldHVybiBmYWxzZTtcblxuICAgICAgICAgICAgICAgIGlmICggJC5pc0FycmF5KHJlc3BvbnNlLnNlYXNvbnMuc2Vhc29uKSApe1xuICAgICAgICAgICAgICAgICAgICBsaXN0ID0gJC5tYXAocmVzcG9uc2Uuc2Vhc29ucy5zZWFzb24sIGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IGl0ZW1bJ0BhdHRyaWJ1dGVzJ10ubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHRlcm5hbElkOiBpdGVtWydAYXR0cmlidXRlcyddLmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuZERhdGU6IGl0ZW1bJ0BhdHRyaWJ1dGVzJ10uZW5kX2RhdGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnREYXRlOiBpdGVtWydAYXR0cmlidXRlcyddLnN0YXJ0X2RhdGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG91cm5hbWVudElkOiBpdGVtWydAYXR0cmlidXRlcyddLnRvdXJuYW1lbnRfaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeWVhcjogaXRlbVsnQGF0dHJpYnV0ZXMnXS55ZWFyLFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KS5yZXZlcnNlKCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbGlzdCA9IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiByZXNwb25zZS5zZWFzb25zLnNlYXNvblsnQGF0dHJpYnV0ZXMnXS5uYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgZXh0ZXJuYWxJZDogcmVzcG9uc2Uuc2Vhc29ucy5zZWFzb25bJ0BhdHRyaWJ1dGVzJ10uaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBlbmREYXRlOiByZXNwb25zZS5zZWFzb25zLnNlYXNvblsnQGF0dHJpYnV0ZXMnXS5lbmRfZGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0RGF0ZTogcmVzcG9uc2Uuc2Vhc29ucy5zZWFzb25bJ0BhdHRyaWJ1dGVzJ10uc3RhcnRfZGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdXJuYW1lbnRJZDogcmVzcG9uc2Uuc2Vhc29ucy5zZWFzb25bJ0BhdHRyaWJ1dGVzJ10udG91cm5hbWVudF9pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHllYXI6IHJlc3BvbnNlLnNlYXNvbnMuc2Vhc29uWydAYXR0cmlidXRlcyddLnllYXIsXG4gICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShsaXN0KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMgKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICBnZXRTY2hlZHVsZSAoIHNlYXNvbklkICkge1xuICAgICAgICB2YXIgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBleHRlcm5hbEFwaVVybCArIFwidjEvZmVlZC9zY2hlZHVsZXNcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YSA6IHsgaWQgOiBzZWFzb25JZCB9LFxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBAcGFyYW0ge3t0b3VybmFtZW50czp7dG91cm5hbWVudDpBcnJheX19fSByZXNwb25zZVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcblxuICAgICAgICAgICAgICAgIGxldCBsaXN0ID0ge307XG5cbiAgICAgICAgICAgICAgICBpZiAoIHJlc3BvbnNlLnNwb3J0X2V2ZW50cyA9PT0gdW5kZWZpbmVkIHx8IHJlc3BvbnNlLnNwb3J0X2V2ZW50cy5zcG9ydF9ldmVudCA9PT0gdW5kZWZpbmVkICkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgcmVzcG9uc2Uuc3BvcnRfZXZlbnRzLnNwb3J0X2V2ZW50LmZvckVhY2goIChpdGVtKSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IHJvdW5kICA9IChpdGVtLnRvdXJuYW1lbnRfcm91bmQpID8gaXRlbS50b3VybmFtZW50X3JvdW5kWydAYXR0cmlidXRlcyddIDogbnVsbDtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoIXJvdW5kKSByZXR1cm47XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IG5hbWUgPSAocm91bmQubnVtYmVyKSA/IFwicm91bmRfXCIgKyByb3VuZC5udW1iZXIgOiByb3VuZC5uYW1lO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICggIWxpc3RbbmFtZV0gKSBsaXN0W25hbWVdID0ge307XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCAhbGlzdFtuYW1lXS5tYXRjaGVzICkgbGlzdFtuYW1lXS5tYXRjaGVzID0gbmV3IE1hcCgpO1xuXG4gICAgICAgICAgICAgICAgICAgIGxpc3RbbmFtZV0ubWF0Y2hlcy5zZXQoaXRlbVsnQGF0dHJpYnV0ZXMnXS5pZCx7XG4gICAgICAgICAgICAgICAgICAgICAgICBzY2hlZHVsZWQ6IGl0ZW1bJ0BhdHRyaWJ1dGVzJ10uc2NoZWR1bGVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgZXh0ZXJuYWxJZDogaXRlbVsnQGF0dHJpYnV0ZXMnXS5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1czogaXRlbVsnQGF0dHJpYnV0ZXMnXS5zdGF0dXMsXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VybmFtZW50Um91bmQgOiByb3VuZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBldGl0b3JzIDogKGl0ZW0uY29tcGV0aXRvcnMpID8gaXRlbS5jb21wZXRpdG9ycy5jb21wZXRpdG9yLm1hcCgoIGNvbXBldGl0b3IpPT57IHJldHVybiBjb21wZXRpdG9yWydAYXR0cmlidXRlcyddICB9KSAgOiBudWxsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKGxpc3QpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cyApIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIHNlYXJjaENvbXBldGl0aW9uKHJlcXVlc3QpIHtcblxuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKTtcbiAgICAgICAgbGV0IF90aGlzID0gdGhpcztcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgJ2FwaS9zZWFyY2gvdG91cm5hbWVudCcsXG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgXCJjb250ZW50XCI6IHJlcXVlc3RcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0cmFkaXRpb25hbDogdHJ1ZSxcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YVR5cGU6IFwianNvblwiLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcblxuICAgICAgICAgICAgICAgIGRhdGEuc29ydChfdGhpcy5zb3J0QnlTcG9ydCk7XG5cbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKGRhdGEpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cyApIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIHdhdGNobGlzdCggaWQgKSB7XG4gICAgICAgIHZhciBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxuICAgICAgICAgICAgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS93YXRjaGxpc3QvYWRkXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGE6IHtpZCA6IGlkfSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfVxufTtcblxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9jYS9jYS5hcGkuanMiLCIvKipcbiAqIENyZWF0ZWQgYnkgSnVhbkNydXogb24gNC8xLzIwMTguXG4gKi9cblxud2luZG93LkNvbnRlbnRBcmVuYSA9IHdpbmRvdy5Db250ZW50QXJlbmEgfHwge307XG5cbkNvbnRlbnRBcmVuYS5EYXRhID0gQ29udGVudEFyZW5hLkRhdGEgfHwge307XG5Db250ZW50QXJlbmEuTGFuZ3VhZ2VzID0gQ29udGVudEFyZW5hLkxhbmd1YWdlcyB8fCB7fTtcblxuQ29udGVudEFyZW5hLkRhdGEuVG9wU3BvcnRzID0gW1xuICAgIHsgbmFtZSA6IFwiU29jY2VyXCIsIGV4dGVybmFsSWQ6IFwic3I6c3BvcnQ6MVwifSxcbiAgICB7IG5hbWUgOiBcIkJhc2tldGJhbGxcIiwgZXh0ZXJuYWxJZDogXCJzcjpzcG9ydDoyXCJ9LFxuICAgIHsgbmFtZSA6IFwiQmFzZWJhbGxcIiwgZXh0ZXJuYWxJZDogXCJzcjpzcG9ydDozXCJ9LFxuICAgIHsgbmFtZSA6IFwiVGVubmlzXCIsIGV4dGVybmFsSWQ6IFwic3I6c3BvcnQ6NVwifSxcbiAgICB7IG5hbWUgOiBcIkNyaWNrZXRcIiwgZXh0ZXJuYWxJZDogXCJzcjpzcG9ydDoyMVwifSxcbiAgICB7IG5hbWUgOiBcIkZpZWxkIEhvY2tleVwiLCBleHRlcm5hbElkOiBcInNyOnNwb3J0OjI0XCJ9LFxuICAgIHsgbmFtZSA6IFwiVm9sbGV5YmFsbFwiLCBleHRlcm5hbElkOiBcInNyOnNwb3J0OjIzXCJ9LFxuICAgIHsgbmFtZSA6IFwiVGFibGUgVGVubmlzXCIsIGV4dGVybmFsSWQ6IFwic3I6c3BvcnQ6MjBcIn0sXG4gICAgeyBuYW1lIDogXCJHb2xmXCIsIGV4dGVybmFsSWQ6IFwic3I6c3BvcnQ6OVwifSxcbiAgICB7IG5hbWUgOiBcIkFtZXJpY2FuIEZvb3RiYWxsXCIsIGV4dGVybmFsSWQ6IFwic3I6c3BvcnQ6MTZcIn0sXG4gICAgeyBuYW1lIDogXCJIYW5kYmFsbFwiLCBleHRlcm5hbElkOiBcInNyOnNwb3J0OjZcIn1cbl07XG5cbkNvbnRlbnRBcmVuYS5EYXRhLkZ1bGxTcG9ydHMgPSBbXTtcbkNvbnRlbnRBcmVuYS5EYXRhLkNvdW50cmllcyA9IFtdO1xuXG5Db250ZW50QXJlbmEuTGFuZ3VhZ2VzLlNob3J0ID0ge1xuICAgIFwibWRyXCI6IFwiTWFuZGFyaW5cIixcbiAgICBcImVzXCI6IFwiU3BhbmlzaFwiLFxuICAgIFwiZW5cIjogXCJFbmdsaXNoXCIsXG4gICAgXCJoaVwiOiBcIkhpbmRpXCIsXG4gICAgXCJhclwiOiBcIkFyYWJpY1wiLFxuICAgIFwicHRcIjogXCJQb3J0dWd1ZXNlXCIsXG4gICAgXCJiblwiOiBcIkJlbmdhbGlcIixcbiAgICBcInJ1XCI6IFwiUnVzc2lhblwiLFxuICAgIFwiamFcIjogXCJKYXBhbmVzZVwiLFxuICAgIFwianZcIjogXCJKYXZhbmVzZVwiLFxuICAgIFwiZGVcIjogXCJHZXJtYW5cIixcbiAgICBcImFsbFwiIDogXCJTaG93IEFsbFwiXG59O1xuXG5Db250ZW50QXJlbmEuTGFuZ3VhZ2VzLkxvbmcgPSB7XG4gICAgXCJhYVwiOiBcIkFmYXJcIixcbiAgICBcImFmXCI6IFwiQWZyaWthYW5zXCIsXG4gICAgXCJhaW5cIjogXCJBaW51XCIsXG4gICAgXCJha3pcIjogXCJBbGFiYW1hXCIsXG4gICAgXCJzcVwiOiBcIkFsYmFuaWFuXCIsXG4gICAgXCJhbGVcIjogXCJBbGV1dFwiLFxuICAgIFwiYXJxXCI6IFwiQWxnZXJpYW4gQXJhYmljXCIsXG4gICAgXCJlbl9VU1wiOiBcIkFtZXJpY2FuIEVuZ2xpc2hcIixcbiAgICBcImFzZVwiOiBcIkFtZXJpY2FuIFNpZ24gTGFuZ3VhZ2VcIixcbiAgICBcImFtXCI6IFwiQW1oYXJpY1wiLFxuICAgIFwiZWd5XCI6IFwiQW5jaWVudCBFZ3lwdGlhblwiLFxuICAgIFwiZ3JjXCI6IFwiQW5jaWVudCBHcmVla1wiLFxuICAgIFwiYXJcIjogXCJBcmFiaWNcIixcbiAgICBcImFyY1wiOiBcIkFyYW1haWNcIixcbiAgICBcImFycFwiOiBcIkFyYXBhaG9cIixcbiAgICBcImFyd1wiOiBcIkFyYXdha1wiLFxuICAgIFwiaHlcIjogXCJBcm1lbmlhblwiLFxuICAgIFwiYXNcIjogXCJBc3NhbWVzZVwiLFxuICAgIFwiYXNhXCI6IFwiQXN1XCIsXG4gICAgXCJlbl9BVVwiOiBcIkF1c3RyYWxpYW4gRW5nbGlzaFwiLFxuICAgIFwiZGVfQVRcIjogXCJBdXN0cmlhbiBHZXJtYW5cIixcbiAgICBcImF5XCI6IFwiQXltYXJhXCIsXG4gICAgXCJhelwiOiBcIkF6ZXJiYWlqYW5pXCIsXG4gICAgXCJiYW5cIjogXCJCYWxpbmVzZVwiLFxuICAgIFwiZXVcIjogXCJCYXNxdWVcIixcbiAgICBcImJhclwiOiBcIkJhdmFyaWFuXCIsXG4gICAgXCJiZVwiOiBcIkJlbGFydXNpYW5cIixcbiAgICBcImJuXCI6IFwiQmVuZ2FsaVwiLFxuICAgIFwiYmlrXCI6IFwiQmlrb2xcIixcbiAgICBcImJpblwiOiBcIkJpbmlcIixcbiAgICBcImJzXCI6IFwiQm9zbmlhblwiLFxuICAgIFwiYnJoXCI6IFwiQnJhaHVpXCIsXG4gICAgXCJicmFcIjogXCJCcmFqXCIsXG4gICAgXCJwdF9CUlwiOiBcIkJyYXppbGlhbiBQb3J0dWd1ZXNlXCIsXG4gICAgXCJiclwiOiBcIkJyZXRvblwiLFxuICAgIFwiZW5fR0JcIjogXCJCcml0aXNoIEVuZ2xpc2hcIixcbiAgICBcImJnXCI6IFwiQnVsZ2FyaWFuXCIsXG4gICAgXCJteVwiOiBcIkJ1cm1lc2VcIixcbiAgICBcImZyY1wiOiBcIkNhanVuIEZyZW5jaFwiLFxuICAgIFwiZW5fQ0FcIjogXCJDYW5hZGlhbiBFbmdsaXNoXCIsXG4gICAgXCJmcl9DQVwiOiBcIkNhbmFkaWFuIEZyZW5jaFwiLFxuICAgIFwieXVlXCI6IFwiQ2FudG9uZXNlXCIsXG4gICAgXCJjYXJcIjogXCJDYXJpYlwiLFxuICAgIFwiY2FcIjogXCJDYXRhbGFuXCIsXG4gICAgXCJjYXlcIjogXCJDYXl1Z2FcIixcbiAgICBcImNlYlwiOiBcIkNlYnVhbm9cIixcbiAgICBcInNodVwiOiBcIkNoYWRpYW4gQXJhYmljXCIsXG4gICAgXCJjZVwiOiBcIkNoZWNoZW5cIixcbiAgICBcImNoclwiOiBcIkNoZXJva2VlXCIsXG4gICAgXCJxdWdcIjogXCJDaGltYm9yYXpvIEhpZ2hsYW5kIFF1aWNodWFcIixcbiAgICBcInpoXCI6IFwiQ2hpbmVzZVwiLFxuICAgIFwiY2huXCI6IFwiQ2hpbm9vayBKYXJnb25cIixcbiAgICBcImNocFwiOiBcIkNoaXBld3lhblwiLFxuICAgIFwiY2hvXCI6IFwiQ2hvY3Rhd1wiLFxuICAgIFwiY3VcIjogXCJDaHVyY2ggU2xhdmljXCIsXG4gICAgXCJjdlwiOiBcIkNodXZhc2hcIixcbiAgICBcIm53Y1wiOiBcIkNsYXNzaWNhbCBOZXdhcmlcIixcbiAgICBcInN5Y1wiOiBcIkNsYXNzaWNhbCBTeXJpYWNcIixcbiAgICBcInN3Y1wiOiBcIkNvbmdvIFN3YWhpbGlcIixcbiAgICBcImNvcFwiOiBcIkNvcHRpY1wiLFxuICAgIFwia3dcIjogXCJDb3JuaXNoXCIsXG4gICAgXCJjb1wiOiBcIkNvcnNpY2FuXCIsXG4gICAgXCJjclwiOiBcIkNyZWVcIixcbiAgICBcIm11c1wiOiBcIkNyZWVrXCIsXG4gICAgXCJjcmhcIjogXCJDcmltZWFuIFR1cmtpc2hcIixcbiAgICBcImhyXCI6IFwiQ3JvYXRpYW5cIixcbiAgICBcImNzXCI6IFwiQ3plY2hcIixcbiAgICBcImRha1wiOiBcIkRha290YVwiLFxuICAgIFwiZGFcIjogXCJEYW5pc2hcIixcbiAgICBcImRlbFwiOiBcIkRlbGF3YXJlXCIsXG4gICAgXCJubFwiOiBcIkR1dGNoXCIsXG4gICAgXCJmcnNcIjogXCJFYXN0ZXJuIEZyaXNpYW5cIixcbiAgICBcImFyelwiOiBcIkVneXB0aWFuIEFyYWJpY1wiLFxuICAgIFwiZW5cIjogXCJFbmdsaXNoXCIsXG4gICAgXCJlb1wiOiBcIkVzcGVyYW50b1wiLFxuICAgIFwiZXRcIjogXCJFc3RvbmlhblwiLFxuICAgIFwicHRfUFRcIjogXCJFdXJvcGVhbiBQb3J0dWd1ZXNlXCIsXG4gICAgXCJlc19FU1wiOiBcIkV1cm9wZWFuIFNwYW5pc2hcIixcbiAgICBcImVlXCI6IFwiRXdlXCIsXG4gICAgXCJmYW5cIjogXCJGYW5nXCIsXG4gICAgXCJoaWZcIjogXCJGaWppIEhpbmRpXCIsXG4gICAgXCJmalwiOiBcIkZpamlhblwiLFxuICAgIFwiZmlsXCI6IFwiRmlsaXBpbm9cIixcbiAgICBcImZpXCI6IFwiRmlubmlzaFwiLFxuICAgIFwibmxfQkVcIjogXCJGbGVtaXNoXCIsXG4gICAgXCJmb25cIjogXCJGb25cIixcbiAgICBcImZyXCI6IFwiRnJlbmNoXCIsXG4gICAgXCJnYWFcIjogXCJHYVwiLFxuICAgIFwiZ2FuXCI6IFwiR2FuIENoaW5lc2VcIixcbiAgICBcImthXCI6IFwiR2VvcmdpYW5cIixcbiAgICBcImRlXCI6IFwiR2VybWFuXCIsXG4gICAgXCJnb3RcIjogXCJHb3RoaWNcIixcbiAgICBcImdyYlwiOiBcIkdyZWJvXCIsXG4gICAgXCJlbFwiOiBcIkdyZWVrXCIsXG4gICAgXCJnblwiOiBcIkd1YXJhbmlcIixcbiAgICBcImd1XCI6IFwiR3VqYXJhdGlcIixcbiAgICBcImd1elwiOiBcIkd1c2lpXCIsXG4gICAgXCJoYWlcIjogXCJIYWlkYVwiLFxuICAgIFwiaHRcIjogXCJIYWl0aWFuXCIsXG4gICAgXCJoYWtcIjogXCJIYWtrYSBDaGluZXNlXCIsXG4gICAgXCJoYVwiOiBcIkhhdXNhXCIsXG4gICAgXCJoYXdcIjogXCJIYXdhaWlhblwiLFxuICAgIFwiaGVcIjogXCJIZWJyZXdcIixcbiAgICBcImh6XCI6IFwiSGVyZXJvXCIsXG4gICAgXCJoaVwiOiBcIkhpbmRpXCIsXG4gICAgXCJoaXRcIjogXCJIaXR0aXRlXCIsXG4gICAgXCJobW5cIjogXCJIbW9uZ1wiLFxuICAgIFwiaHVcIjogXCJIdW5nYXJpYW5cIixcbiAgICBcImlzXCI6IFwiSWNlbGFuZGljXCIsXG4gICAgXCJpb1wiOiBcIklkb1wiLFxuICAgIFwiaWdcIjogXCJJZ2JvXCIsXG4gICAgXCJpdVwiOiBcIkludWt0aXR1dFwiLFxuICAgIFwiaWtcIjogXCJJbnVwaWFxXCIsXG4gICAgXCJnYVwiOiBcIklyaXNoXCIsXG4gICAgXCJpdFwiOiBcIkl0YWxpYW5cIixcbiAgICBcImphbVwiOiBcIkphbWFpY2FuIENyZW9sZSBFbmdsaXNoXCIsXG4gICAgXCJqYVwiOiBcIkphcGFuZXNlXCIsXG4gICAgXCJqdlwiOiBcIkphdmFuZXNlXCIsXG4gICAgXCJrYWpcIjogXCJKanVcIixcbiAgICBcImR5b1wiOiBcIkpvbGEtRm9ueWlcIixcbiAgICBcInhhbFwiOiBcIkthbG15a1wiLFxuICAgIFwia2FtXCI6IFwiS2FtYmFcIixcbiAgICBcImtibFwiOiBcIkthbmVtYnVcIixcbiAgICBcImtuXCI6IFwiS2FubmFkYVwiLFxuICAgIFwia3JcIjogXCJLYW51cmlcIixcbiAgICBcImthYVwiOiBcIkthcmEtS2FscGFrXCIsXG4gICAgXCJrcmNcIjogXCJLYXJhY2hheS1CYWxrYXJcIixcbiAgICBcImtybFwiOiBcIkthcmVsaWFuXCIsXG4gICAgXCJrc1wiOiBcIkthc2htaXJpXCIsXG4gICAgXCJjc2JcIjogXCJLYXNodWJpYW5cIixcbiAgICBcImthd1wiOiBcIkthd2lcIixcbiAgICBcImtrXCI6IFwiS2F6YWtoXCIsXG4gICAgXCJrZW5cIjogXCJLZW55YW5nXCIsXG4gICAgXCJraGFcIjogXCJLaGFzaVwiLFxuICAgIFwia21cIjogXCJLaG1lclwiLFxuICAgIFwia2hvXCI6IFwiS2hvdGFuZXNlXCIsXG4gICAgXCJraHdcIjogXCJLaG93YXJcIixcbiAgICBcImtpXCI6IFwiS2lrdXl1XCIsXG4gICAgXCJrbWJcIjogXCJLaW1idW5kdVwiLFxuICAgIFwia3JqXCI6IFwiS2luYXJheS1hXCIsXG4gICAgXCJyd1wiOiBcIktpbnlhcndhbmRhXCIsXG4gICAgXCJraXVcIjogXCJLaXJtYW5qa2lcIixcbiAgICBcInRsaFwiOiBcIktsaW5nb25cIixcbiAgICBcImJrbVwiOiBcIktvbVwiLFxuICAgIFwia3ZcIjogXCJLb21pXCIsXG4gICAgXCJrb2lcIjogXCJLb21pLVBlcm15YWtcIixcbiAgICBcImtnXCI6IFwiS29uZ29cIixcbiAgICBcImtva1wiOiBcIktvbmthbmlcIixcbiAgICBcImtvXCI6IFwiS29yZWFuXCIsXG4gICAgXCJrZm9cIjogXCJLb3JvXCIsXG4gICAgXCJrb3NcIjogXCJLb3NyYWVhblwiLFxuICAgIFwiYXZrXCI6IFwiS290YXZhXCIsXG4gICAgXCJraHFcIjogXCJLb3lyYSBDaGlpbmlcIixcbiAgICBcInNlc1wiOiBcIktveXJhYm9ybyBTZW5uaVwiLFxuICAgIFwia3BlXCI6IFwiS3BlbGxlXCIsXG4gICAgXCJrcmlcIjogXCJLcmlvXCIsXG4gICAgXCJralwiOiBcIkt1YW55YW1hXCIsXG4gICAgXCJrdW1cIjogXCJLdW15a1wiLFxuICAgIFwia3VcIjogXCJLdXJkaXNoXCIsXG4gICAgXCJrcnVcIjogXCJLdXJ1a2hcIixcbiAgICBcImt1dFwiOiBcIkt1dGVuYWlcIixcbiAgICBcIm5tZ1wiOiBcIkt3YXNpb1wiLFxuICAgIFwia3lcIjogXCJLeXJneXpcIixcbiAgICBcInF1Y1wiOiBcIktcXHUwMmJjaWNoZVxcdTAyYmNcIixcbiAgICBcImxhZFwiOiBcIkxhZGlub1wiLFxuICAgIFwibGFoXCI6IFwiTGFobmRhXCIsXG4gICAgXCJsa3RcIjogXCJMYWtvdGFcIixcbiAgICBcImxhbVwiOiBcIkxhbWJhXCIsXG4gICAgXCJsYWdcIjogXCJMYW5naVwiLFxuICAgIFwibG9cIjogXCJMYW9cIixcbiAgICBcImx0Z1wiOiBcIkxhdGdhbGlhblwiLFxuICAgIFwibGFcIjogXCJMYXRpblwiLFxuICAgIFwiZXNfNDE5XCI6IFwiTGF0aW4gQW1lcmljYW4gU3BhbmlzaFwiLFxuICAgIFwibHZcIjogXCJMYXR2aWFuXCIsXG4gICAgXCJsenpcIjogXCJMYXpcIixcbiAgICBcImxlelwiOiBcIkxlemdoaWFuXCIsXG4gICAgXCJsaWpcIjogXCJMaWd1cmlhblwiLFxuICAgIFwibGlcIjogXCJMaW1idXJnaXNoXCIsXG4gICAgXCJsblwiOiBcIkxpbmdhbGFcIixcbiAgICBcImxmblwiOiBcIkxpbmd1YSBGcmFuY2EgTm92YVwiLFxuICAgIFwibHpoXCI6IFwiTGl0ZXJhcnkgQ2hpbmVzZVwiLFxuICAgIFwibHRcIjogXCJMaXRodWFuaWFuXCIsXG4gICAgXCJsaXZcIjogXCJMaXZvbmlhblwiLFxuICAgIFwiamJvXCI6IFwiTG9qYmFuXCIsXG4gICAgXCJsbW9cIjogXCJMb21iYXJkXCIsXG4gICAgXCJuZHNcIjogXCJMb3cgR2VybWFuXCIsXG4gICAgXCJzbGlcIjogXCJMb3dlciBTaWxlc2lhblwiLFxuICAgIFwiZHNiXCI6IFwiTG93ZXIgU29yYmlhblwiLFxuICAgIFwibG96XCI6IFwiTG96aVwiLFxuICAgIFwibHVcIjogXCJMdWJhLUthdGFuZ2FcIixcbiAgICBcImx1YVwiOiBcIkx1YmEtTHVsdWFcIixcbiAgICBcImx1aVwiOiBcIkx1aXNlbm9cIixcbiAgICBcInNtalwiOiBcIkx1bGUgU2FtaVwiLFxuICAgIFwibHVuXCI6IFwiTHVuZGFcIixcbiAgICBcImx1b1wiOiBcIkx1b1wiLFxuICAgIFwibGJcIjogXCJMdXhlbWJvdXJnaXNoXCIsXG4gICAgXCJsdXlcIjogXCJMdXlpYVwiLFxuICAgIFwibWRlXCI6IFwiTWFiYVwiLFxuICAgIFwibWtcIjogXCJNYWNlZG9uaWFuXCIsXG4gICAgXCJqbWNcIjogXCJNYWNoYW1lXCIsXG4gICAgXCJtYWRcIjogXCJNYWR1cmVzZVwiLFxuICAgIFwibWFmXCI6IFwiTWFmYVwiLFxuICAgIFwibWFnXCI6IFwiTWFnYWhpXCIsXG4gICAgXCJ2bWZcIjogXCJNYWluLUZyYW5jb25pYW5cIixcbiAgICBcIm1haVwiOiBcIk1haXRoaWxpXCIsXG4gICAgXCJtYWtcIjogXCJNYWthc2FyXCIsXG4gICAgXCJtZ2hcIjogXCJNYWtodXdhLU1lZXR0b1wiLFxuICAgIFwia2RlXCI6IFwiTWFrb25kZVwiLFxuICAgIFwibWdcIjogXCJNYWxhZ2FzeVwiLFxuICAgIFwibXNcIjogXCJNYWxheVwiLFxuICAgIFwibWxcIjogXCJNYWxheWFsYW1cIixcbiAgICBcIm10XCI6IFwiTWFsdGVzZVwiLFxuICAgIFwibW5jXCI6IFwiTWFuY2h1XCIsXG4gICAgXCJtZHJcIjogXCJNYW5kYXJpblwiLFxuICAgIFwibWFuXCI6IFwiTWFuZGluZ29cIixcbiAgICBcIm1uaVwiOiBcIk1hbmlwdXJpXCIsXG4gICAgXCJndlwiOiBcIk1hbnhcIixcbiAgICBcIm1pXCI6IFwiTWFvcmlcIixcbiAgICBcImFyblwiOiBcIk1hcHVjaGVcIixcbiAgICBcIm1yXCI6IFwiTWFyYXRoaVwiLFxuICAgIFwiY2htXCI6IFwiTWFyaVwiLFxuICAgIFwibWhcIjogXCJNYXJzaGFsbGVzZVwiLFxuICAgIFwibXdyXCI6IFwiTWFyd2FyaVwiLFxuICAgIFwibWFzXCI6IFwiTWFzYWlcIixcbiAgICBcIm16blwiOiBcIk1hemFuZGVyYW5pXCIsXG4gICAgXCJieXZcIjogXCJNZWR1bWJhXCIsXG4gICAgXCJtZW5cIjogXCJNZW5kZVwiLFxuICAgIFwibXd2XCI6IFwiTWVudGF3YWlcIixcbiAgICBcIm1lclwiOiBcIk1lcnVcIixcbiAgICBcIm1nb1wiOiBcIk1ldGFcXHUwMmJjXCIsXG4gICAgXCJlc19NWFwiOiBcIk1leGljYW4gU3BhbmlzaFwiLFxuICAgIFwibWljXCI6IFwiTWljbWFjXCIsXG4gICAgXCJkdW1cIjogXCJNaWRkbGUgRHV0Y2hcIixcbiAgICBcImVubVwiOiBcIk1pZGRsZSBFbmdsaXNoXCIsXG4gICAgXCJmcm1cIjogXCJNaWRkbGUgRnJlbmNoXCIsXG4gICAgXCJnbWhcIjogXCJNaWRkbGUgSGlnaCBHZXJtYW5cIixcbiAgICBcIm1nYVwiOiBcIk1pZGRsZSBJcmlzaFwiLFxuICAgIFwibmFuXCI6IFwiTWluIE5hbiBDaGluZXNlXCIsXG4gICAgXCJtaW5cIjogXCJNaW5hbmdrYWJhdVwiLFxuICAgIFwieG1mXCI6IFwiTWluZ3JlbGlhblwiLFxuICAgIFwibXdsXCI6IFwiTWlyYW5kZXNlXCIsXG4gICAgXCJsdXNcIjogXCJNaXpvXCIsXG4gICAgXCJhcl8wMDFcIjogXCJNb2Rlcm4gU3RhbmRhcmQgQXJhYmljXCIsXG4gICAgXCJtb2hcIjogXCJNb2hhd2tcIixcbiAgICBcIm1kZlwiOiBcIk1va3NoYVwiLFxuICAgIFwicm9fTURcIjogXCJNb2xkYXZpYW5cIixcbiAgICBcImxvbFwiOiBcIk1vbmdvXCIsXG4gICAgXCJtblwiOiBcIk1vbmdvbGlhblwiLFxuICAgIFwibWZlXCI6IFwiTW9yaXN5ZW5cIixcbiAgICBcImFyeVwiOiBcIk1vcm9jY2FuIEFyYWJpY1wiLFxuICAgIFwibW9zXCI6IFwiTW9zc2lcIixcbiAgICBcIm11bFwiOiBcIk11bHRpcGxlIExhbmd1YWdlc1wiLFxuICAgIFwibXVhXCI6IFwiTXVuZGFuZ1wiLFxuICAgIFwidHR0XCI6IFwiTXVzbGltIFRhdFwiLFxuICAgIFwibXllXCI6IFwiTXllbmVcIixcbiAgICBcIm5hcVwiOiBcIk5hbWFcIixcbiAgICBcIm5hXCI6IFwiTmF1cnVcIixcbiAgICBcIm52XCI6IFwiTmF2YWpvXCIsXG4gICAgXCJuZ1wiOiBcIk5kb25nYVwiLFxuICAgIFwibmFwXCI6IFwiTmVhcG9saXRhblwiLFxuICAgIFwibmVcIjogXCJOZXBhbGlcIixcbiAgICBcIm5ld1wiOiBcIk5ld2FyaVwiLFxuICAgIFwic2JhXCI6IFwiTmdhbWJheVwiLFxuICAgIFwibm5oXCI6IFwiTmdpZW1ib29uXCIsXG4gICAgXCJqZ29cIjogXCJOZ29tYmFcIixcbiAgICBcInlybFwiOiBcIk5oZWVuZ2F0dVwiLFxuICAgIFwibmlhXCI6IFwiTmlhc1wiLFxuICAgIFwibml1XCI6IFwiTml1ZWFuXCIsXG4gICAgXCJ6eHhcIjogXCJObyBsaW5ndWlzdGljIGNvbnRlbnRcIixcbiAgICBcIm5vZ1wiOiBcIk5vZ2FpXCIsXG4gICAgXCJuZFwiOiBcIk5vcnRoIE5kZWJlbGVcIixcbiAgICBcImZyclwiOiBcIk5vcnRoZXJuIEZyaXNpYW5cIixcbiAgICBcInNlXCI6IFwiTm9ydGhlcm4gU2FtaVwiLFxuICAgIFwibnNvXCI6IFwiTm9ydGhlcm4gU290aG9cIixcbiAgICBcIm5vXCI6IFwiTm9yd2VnaWFuXCIsXG4gICAgXCJuYlwiOiBcIk5vcndlZ2lhbiBCb2ttXFx1MDBlNWxcIixcbiAgICBcIm5uXCI6IFwiTm9yd2VnaWFuIE55bm9yc2tcIixcbiAgICBcIm5vdlwiOiBcIk5vdmlhbFwiLFxuICAgIFwibnVzXCI6IFwiTnVlclwiLFxuICAgIFwibnltXCI6IFwiTnlhbXdlemlcIixcbiAgICBcIm55XCI6IFwiTnlhbmphXCIsXG4gICAgXCJueW5cIjogXCJOeWFua29sZVwiLFxuICAgIFwidG9nXCI6IFwiTnlhc2EgVG9uZ2FcIixcbiAgICBcIm55b1wiOiBcIk55b3JvXCIsXG4gICAgXCJuemlcIjogXCJOemltYVwiLFxuICAgIFwibnFvXCI6IFwiTlxcdTAyYmNLb1wiLFxuICAgIFwib2NcIjogXCJPY2NpdGFuXCIsXG4gICAgXCJvalwiOiBcIk9qaWJ3YVwiLFxuICAgIFwiYW5nXCI6IFwiT2xkIEVuZ2xpc2hcIixcbiAgICBcImZyb1wiOiBcIk9sZCBGcmVuY2hcIixcbiAgICBcImdvaFwiOiBcIk9sZCBIaWdoIEdlcm1hblwiLFxuICAgIFwic2dhXCI6IFwiT2xkIElyaXNoXCIsXG4gICAgXCJub25cIjogXCJPbGQgTm9yc2VcIixcbiAgICBcInBlb1wiOiBcIk9sZCBQZXJzaWFuXCIsXG4gICAgXCJwcm9cIjogXCJPbGQgUHJvdmVuXFx1MDBlN2FsXCIsXG4gICAgXCJvclwiOiBcIk9yaXlhXCIsXG4gICAgXCJvbVwiOiBcIk9yb21vXCIsXG4gICAgXCJvc2FcIjogXCJPc2FnZVwiLFxuICAgIFwib3NcIjogXCJPc3NldGljXCIsXG4gICAgXCJvdGFcIjogXCJPdHRvbWFuIFR1cmtpc2hcIixcbiAgICBcInBhbFwiOiBcIlBhaGxhdmlcIixcbiAgICBcInBmbFwiOiBcIlBhbGF0aW5lIEdlcm1hblwiLFxuICAgIFwicGF1XCI6IFwiUGFsYXVhblwiLFxuICAgIFwicGlcIjogXCJQYWxpXCIsXG4gICAgXCJwZGNcIjogXCJQZW5uc3lsdmFuaWEgR2VybWFuXCIsXG4gICAgXCJmYVwiOiBcIlBlcnNpYW5cIixcbiAgICBcInBoblwiOiBcIlBob2VuaWNpYW5cIixcbiAgICBcInBjZFwiOiBcIlBpY2FyZFwiLFxuICAgIFwicG1zXCI6IFwiUGllZG1vbnRlc2VcIixcbiAgICBcInBkdFwiOiBcIlBsYXV0ZGlldHNjaFwiLFxuICAgIFwicG9uXCI6IFwiUG9obnBlaWFuXCIsXG4gICAgXCJwbFwiOiBcIlBvbGlzaFwiLFxuICAgIFwicG50XCI6IFwiUG9udGljXCIsXG4gICAgXCJwdFwiOiBcIlBvcnR1Z3Vlc2VcIixcbiAgICBcInByZ1wiOiBcIlBydXNzaWFuXCIsXG4gICAgXCJwYVwiOiBcIlB1bmphYmlcIixcbiAgICBcInF1XCI6IFwiUXVlY2h1YVwiLFxuICAgIFwicm9cIjogXCJSb21hbmlhblwiLFxuICAgIFwicm1cIjogXCJSb21hbnNoXCIsXG4gICAgXCJyb21cIjogXCJSb21hbnlcIixcbiAgICBcInJvb3RcIjogXCJSb290XCIsXG4gICAgXCJydVwiOiBcIlJ1c3NpYW5cIixcbiAgICBcInJ3a1wiOiBcIlJ3YVwiLFxuICAgIFwic2FoXCI6IFwiU2FraGFcIixcbiAgICBcInNhbVwiOiBcIlNhbWFyaXRhbiBBcmFtYWljXCIsXG4gICAgXCJzbVwiOiBcIlNhbW9hblwiLFxuICAgIFwic2NvXCI6IFwiU2NvdHNcIixcbiAgICBcImdkXCI6IFwiU2NvdHRpc2ggR2FlbGljXCIsXG4gICAgXCJzbHlcIjogXCJTZWxheWFyXCIsXG4gICAgXCJzZWxcIjogXCJTZWxrdXBcIixcbiAgICBcInNlaFwiOiBcIlNlbmFcIixcbiAgICBcInNlZVwiOiBcIlNlbmVjYVwiLFxuICAgIFwic3JcIjogXCJTZXJiaWFuXCIsXG4gICAgXCJzaFwiOiBcIlNlcmJvLUNyb2F0aWFuXCIsXG4gICAgXCJzcnJcIjogXCJTZXJlclwiLFxuICAgIFwic2VpXCI6IFwiU2VyaVwiLFxuICAgIFwia3NiXCI6IFwiU2hhbWJhbGFcIixcbiAgICBcInNoblwiOiBcIlNoYW5cIixcbiAgICBcInNuXCI6IFwiU2hvbmFcIixcbiAgICBcImlpXCI6IFwiU2ljaHVhbiBZaVwiLFxuICAgIFwic2NuXCI6IFwiU2ljaWxpYW5cIixcbiAgICBcInNpZFwiOiBcIlNpZGFtb1wiLFxuICAgIFwiYmxhXCI6IFwiU2lrc2lrYVwiLFxuICAgIFwic3psXCI6IFwiU2lsZXNpYW5cIixcbiAgICBcInpoX0hhbnNcIjogXCJTaW1wbGlmaWVkIENoaW5lc2VcIixcbiAgICBcInNkXCI6IFwiU2luZGhpXCIsXG4gICAgXCJzaVwiOiBcIlNpbmhhbGFcIixcbiAgICBcInNtc1wiOiBcIlNrb2x0IFNhbWlcIixcbiAgICBcImRlblwiOiBcIlNsYXZlXCIsXG4gICAgXCJza1wiOiBcIlNsb3Zha1wiLFxuICAgIFwic2xcIjogXCJTbG92ZW5pYW5cIixcbiAgICBcInhvZ1wiOiBcIlNvZ2FcIixcbiAgICBcInNvZ1wiOiBcIlNvZ2RpZW5cIixcbiAgICBcInNvXCI6IFwiU29tYWxpXCIsXG4gICAgXCJzbmtcIjogXCJTb25pbmtlXCIsXG4gICAgXCJja2JcIjogXCJTb3JhbmkgS3VyZGlzaFwiLFxuICAgIFwiYXpiXCI6IFwiU291dGggQXplcmJhaWphbmlcIixcbiAgICBcIm5yXCI6IFwiU291dGggTmRlYmVsZVwiLFxuICAgIFwiYWx0XCI6IFwiU291dGhlcm4gQWx0YWlcIixcbiAgICBcInNtYVwiOiBcIlNvdXRoZXJuIFNhbWlcIixcbiAgICBcInN0XCI6IFwiU291dGhlcm4gU290aG9cIixcbiAgICBcImVzXCI6IFwiU3BhbmlzaFwiLFxuICAgIFwic3JuXCI6IFwiU3JhbmFuIFRvbmdvXCIsXG4gICAgXCJ6Z2hcIjogXCJTdGFuZGFyZCBNb3JvY2NhbiBUYW1hemlnaHRcIixcbiAgICBcInN1a1wiOiBcIlN1a3VtYVwiLFxuICAgIFwic3V4XCI6IFwiU3VtZXJpYW5cIixcbiAgICBcInN1XCI6IFwiU3VuZGFuZXNlXCIsXG4gICAgXCJzdXNcIjogXCJTdXN1XCIsXG4gICAgXCJzd1wiOiBcIlN3YWhpbGlcIixcbiAgICBcInNzXCI6IFwiU3dhdGlcIixcbiAgICBcInN2XCI6IFwiU3dlZGlzaFwiLFxuICAgIFwiZnJfQ0hcIjogXCJTd2lzcyBGcmVuY2hcIixcbiAgICBcImdzd1wiOiBcIlN3aXNzIEdlcm1hblwiLFxuICAgIFwiZGVfQ0hcIjogXCJTd2lzcyBIaWdoIEdlcm1hblwiLFxuICAgIFwic3lyXCI6IFwiU3lyaWFjXCIsXG4gICAgXCJzaGlcIjogXCJUYWNoZWxoaXRcIixcbiAgICBcInRsXCI6IFwiVGFnYWxvZ1wiLFxuICAgIFwidHlcIjogXCJUYWhpdGlhblwiLFxuICAgIFwiZGF2XCI6IFwiVGFpdGFcIixcbiAgICBcInRnXCI6IFwiVGFqaWtcIixcbiAgICBcInRseVwiOiBcIlRhbHlzaFwiLFxuICAgIFwidG1oXCI6IFwiVGFtYXNoZWtcIixcbiAgICBcInRhXCI6IFwiVGFtaWxcIixcbiAgICBcInRydlwiOiBcIlRhcm9rb1wiLFxuICAgIFwidHdxXCI6IFwiVGFzYXdhcVwiLFxuICAgIFwidHRcIjogXCJUYXRhclwiLFxuICAgIFwidGVcIjogXCJUZWx1Z3VcIixcbiAgICBcInRlclwiOiBcIlRlcmVub1wiLFxuICAgIFwidGVvXCI6IFwiVGVzb1wiLFxuICAgIFwidGV0XCI6IFwiVGV0dW1cIixcbiAgICBcInRoXCI6IFwiVGhhaVwiLFxuICAgIFwiYm9cIjogXCJUaWJldGFuXCIsXG4gICAgXCJ0aWdcIjogXCJUaWdyZVwiLFxuICAgIFwidGlcIjogXCJUaWdyaW55YVwiLFxuICAgIFwidGVtXCI6IFwiVGltbmVcIixcbiAgICBcInRpdlwiOiBcIlRpdlwiLFxuICAgIFwidGxpXCI6IFwiVGxpbmdpdFwiLFxuICAgIFwidHBpXCI6IFwiVG9rIFBpc2luXCIsXG4gICAgXCJ0a2xcIjogXCJUb2tlbGF1XCIsXG4gICAgXCJ0b1wiOiBcIlRvbmdhblwiLFxuICAgIFwiZml0XCI6IFwiVG9ybmVkYWxlbiBGaW5uaXNoXCIsXG4gICAgXCJ6aF9IYW50XCI6IFwiVHJhZGl0aW9uYWwgQ2hpbmVzZVwiLFxuICAgIFwidGtyXCI6IFwiVHNha2h1clwiLFxuICAgIFwidHNkXCI6IFwiVHNha29uaWFuXCIsXG4gICAgXCJ0c2lcIjogXCJUc2ltc2hpYW5cIixcbiAgICBcInRzXCI6IFwiVHNvbmdhXCIsXG4gICAgXCJ0blwiOiBcIlRzd2FuYVwiLFxuICAgIFwidGN5XCI6IFwiVHVsdVwiLFxuICAgIFwidHVtXCI6IFwiVHVtYnVrYVwiLFxuICAgIFwiYWViXCI6IFwiVHVuaXNpYW4gQXJhYmljXCIsXG4gICAgXCJ0clwiOiBcIlR1cmtpc2hcIixcbiAgICBcInRrXCI6IFwiVHVya21lblwiLFxuICAgIFwidHJ1XCI6IFwiVHVyb3lvXCIsXG4gICAgXCJ0dmxcIjogXCJUdXZhbHVcIixcbiAgICBcInR5dlwiOiBcIlR1dmluaWFuXCIsXG4gICAgXCJ0d1wiOiBcIlR3aVwiLFxuICAgIFwia2NnXCI6IFwiVHlhcFwiLFxuICAgIFwidWRtXCI6IFwiVWRtdXJ0XCIsXG4gICAgXCJ1Z2FcIjogXCJVZ2FyaXRpY1wiLFxuICAgIFwidWtcIjogXCJVa3JhaW5pYW5cIixcbiAgICBcInVtYlwiOiBcIlVtYnVuZHVcIixcbiAgICBcInVuZFwiOiBcIlVua25vd24gTGFuZ3VhZ2VcIixcbiAgICBcImhzYlwiOiBcIlVwcGVyIFNvcmJpYW5cIixcbiAgICBcInVyXCI6IFwiVXJkdVwiLFxuICAgIFwidWdcIjogXCJVeWdodXJcIixcbiAgICBcInV6XCI6IFwiVXpiZWtcIixcbiAgICBcInZhaVwiOiBcIlZhaVwiLFxuICAgIFwidmVcIjogXCJWZW5kYVwiLFxuICAgIFwidmVjXCI6IFwiVmVuZXRpYW5cIixcbiAgICBcInZlcFwiOiBcIlZlcHNcIixcbiAgICBcInZpXCI6IFwiVmlldG5hbWVzZVwiLFxuICAgIFwidm9cIjogXCJWb2xhcFxcdTAwZmNrXCIsXG4gICAgXCJ2cm9cIjogXCJWXFx1MDBmNXJvXCIsXG4gICAgXCJ2b3RcIjogXCJWb3RpY1wiLFxuICAgIFwidnVuXCI6IFwiVnVuam9cIixcbiAgICBcIndhXCI6IFwiV2FsbG9vblwiLFxuICAgIFwid2FlXCI6IFwiV2Fsc2VyXCIsXG4gICAgXCJ3YXJcIjogXCJXYXJheVwiLFxuICAgIFwid2FzXCI6IFwiV2FzaG9cIixcbiAgICBcImd1Y1wiOiBcIldheXV1XCIsXG4gICAgXCJjeVwiOiBcIldlbHNoXCIsXG4gICAgXCJ2bHNcIjogXCJXZXN0IEZsZW1pc2hcIixcbiAgICBcImZ5XCI6IFwiV2VzdGVybiBGcmlzaWFuXCIsXG4gICAgXCJtcmpcIjogXCJXZXN0ZXJuIE1hcmlcIixcbiAgICBcIndhbFwiOiBcIldvbGF5dHRhXCIsXG4gICAgXCJ3b1wiOiBcIldvbG9mXCIsXG4gICAgXCJ3dXVcIjogXCJXdSBDaGluZXNlXCIsXG4gICAgXCJ4aFwiOiBcIlhob3NhXCIsXG4gICAgXCJoc25cIjogXCJYaWFuZyBDaGluZXNlXCIsXG4gICAgXCJ5YXZcIjogXCJZYW5nYmVuXCIsXG4gICAgXCJ5YW9cIjogXCJZYW9cIixcbiAgICBcInlhcFwiOiBcIllhcGVzZVwiLFxuICAgIFwieWJiXCI6IFwiWWVtYmFcIixcbiAgICBcInlpXCI6IFwiWWlkZGlzaFwiLFxuICAgIFwieW9cIjogXCJZb3J1YmFcIixcbiAgICBcInphcFwiOiBcIlphcG90ZWNcIixcbiAgICBcImRqZVwiOiBcIlphcm1hXCIsXG4gICAgXCJ6emFcIjogXCJaYXphXCIsXG4gICAgXCJ6ZWFcIjogXCJaZWVsYW5kaWNcIixcbiAgICBcInplblwiOiBcIlplbmFnYVwiLFxuICAgIFwiemFcIjogXCJaaHVhbmdcIixcbiAgICBcImdielwiOiBcIlpvcm9hc3RyaWFuIERhcmlcIixcbiAgICBcInp1XCI6IFwiWnVsdVwiLFxuICAgIFwienVuXCI6IFwiWnVuaVwiXG59XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L2NhL2NhLmRhdGEuanMiLCIvKipcbiAqIENyZWF0ZWQgYnkgSnVhbkNydXogb24gNC8xLzIwMTguXG4gKi9cblxuJChmdW5jdGlvbiAoKSB7XG5cbiAgICB3aW5kb3cuQ29udGVudEFyZW5hID0gd2luZG93LkNvbnRlbnRBcmVuYSB8fCB7fTtcblxuICAgIENvbnRlbnRBcmVuYS5Nb2RlbCA9IENvbnRlbnRBcmVuYS5Nb2RlbCB8fCB7fTtcblxuICAgIENvbnRlbnRBcmVuYS5Nb2RlbC5SaWdodFBhY2thZ2UgPSBmdW5jdGlvbigpe1xuICAgICAgICB0aGlzLmlkID0gbnVsbDtcbiAgICAgICAgdGhpcy5uYW1lID0gbnVsbDtcbiAgICAgICAgdGhpcy5yaWdodHMgPSB7fTtcbiAgICB9O1xuXG4gICAgQ29udGVudEFyZW5hLk1vZGVsLlJpZ2h0ID0gZnVuY3Rpb24oKXtcbiAgICAgICAgdGhpcy5pZCA9IG51bGw7XG4gICAgICAgIHRoaXMubmFtZSA9IG51bGw7XG4gICAgICAgIHRoaXMucmlnaHRJdGVtcyA9IHt9O1xuICAgIH07XG5cbiAgICBDb250ZW50QXJlbmEuTW9kZWwuUmlnaHRJdGVtID0gZnVuY3Rpb24oKXtcbiAgICAgICAgdGhpcy5pZCA9IG51bGw7XG4gICAgICAgIHRoaXMubmFtZSA9IG51bGw7XG4gICAgICAgIHRoaXMuaW5wdXRzID0gW107XG4gICAgfTtcblxuICAgIENvbnRlbnRBcmVuYS5Nb2RlbC5TZWxlY3RlZFJpZ2h0ID0gZnVuY3Rpb24oKXtcbiAgICAgICAgdGhpcy5yaWdodCA9IG51bGw7XG4gICAgICAgIHRoaXMucmlnaHRJdGVtID0gbnVsbDtcbiAgICAgICAgdGhpcy5ncm91cCA9IG51bGw7XG4gICAgICAgIHRoaXMuaW5wdXRzID0gW107XG4gICAgfTtcblxuICAgIENvbnRlbnRBcmVuYS5Nb2RlbC5TYWxlc1BhY2thZ2UgPSBmdW5jdGlvbigpe1xuXG4gICAgICAgIHRoaXMuc2FsZXNNZXRob2QgPSAgbnVsbDtcbiAgICAgICAgdGhpcy5mZWUgPSBudWxsO1xuICAgICAgICB0aGlzLmN1cnJlbmN5ID0gbnVsbDtcbiAgICAgICAgdGhpcy5pZCA9IG51bGw7XG4gICAgICAgIHRoaXMubmFtZSA9IG51bGw7XG4gICAgICAgIHRoaXMudGVycml0b3JpZXMgPSBudWxsO1xuICAgICAgICB0aGlzLnNlbGVjdGVkVGVycml0b3JpZXMgPSBbXTtcbiAgICAgICAgdGhpcy5leGNsdWRlZFRlcnJpdG9yaWVzID0gW107XG4gICAgICAgIHRoaXMudGVycml0b3J5QmlkcyA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNlbGxBc1BhY2thZ2UgPSBmYWxzZTtcblxuICAgICAgICB0aGlzLnZhbGlkYXRlID0gKCkgPT4ge1xuXG4gICAgICAgICAgICB2YXIgZGVzY3JpcHRpb24gPSBcIlNhbGVzIFBhY2thZ2UgXCIgKyB0aGlzLmlkICsgXCI6IFwiLFxuICAgICAgICAgICAgICAgIGhhc0Vycm9ycyA9IGZhbHNlO1xuXG4gICAgICAgICAgICBpZiAoICEgdGhpcy5jdXJyZW5jeSApIHtcbiAgICAgICAgICAgICAgICBoYXNFcnJvcnMgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uICs9IFwiQ3VycmVuY3kgY2FuJ3QgYmUgZW1wdHkuIFwiO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoICEgdGhpcy5mZWUgKSB7XG4gICAgICAgICAgICAgICAgaGFzRXJyb3JzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbiArPSBcIkZlZSBjYW4ndCBiZSBlbXB0eS4gXCI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICggISB0aGlzLnRlcnJpdG9yaWVzICkge1xuICAgICAgICAgICAgICAgIGhhc0Vycm9ycyA9IHRydWU7XG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb24gKz0gXCJUZXJyaXRvcmllcyBjYW4ndCBiZSBlbXB0eS4gXCI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICggISB0aGlzLnNhbGVzTWV0aG9kICkge1xuICAgICAgICAgICAgICAgIGhhc0Vycm9ycyA9IHRydWU7XG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb24gKz0gXCJTYWxlcyBtZXRob2QgY2FuJ3QgYmUgZW1wdHkuIFwiO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGhhc0Vycm9yczogaGFzRXJyb3JzLFxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uIDogZGVzY3JpcHRpb25cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIENvbnRlbnRBcmVuYS5Nb2RlbC5Db250ZW50ID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdGhpcy5zcG9ydCA9IHt9O1xuICAgICAgICB0aGlzLnNwb3J0cyA9IFtdO1xuICAgICAgICB0aGlzLnRvdXJuYW1lbnQgPSBudWxsO1xuICAgICAgICB0aGlzLmNhdGVnb3J5ID0gbnVsbDtcbiAgICAgICAgdGhpcy5zYWxlc1BhY2thZ2VzID0ge307XG4gICAgICAgIHRoaXMuaW5zdGFsbG1lbnRzID0ge307XG5cbiAgICAgICAgdGhpcy5nZXRUaXRsZSA9ICgpID0+IHtcblxuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcyk7XG5cbiAgICAgICAgICAgIHZhciB0aXRsZSA9IFwiXCI7XG5cbiAgICAgICAgICAgIGlmICggdGhpcy5zcG9ydHMubGVuZ3RoID4gMCApe1xuICAgICAgICAgICAgICAgIHRoaXMuc3BvcnRzLmZvckVhY2goZnVuY3Rpb24gKHNwb3J0LCBpbmRleCwgYXJyYXkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGUgKz0gc3BvcnQudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIGlmICggKGluZGV4KzEpICE9IGFycmF5Lmxlbmd0aCApIHRpdGxlICs9IFwiLCBcIlxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIGlmICggdGhpcy5zcG9ydCAhPT0gbnVsbCApIHRpdGxlICs9IHRoaXMuc3BvcnQudmFsdWU7XG4gICAgICAgICAgICBpZiAoIHRoaXMuY2F0ZWdvcnkgIT09IG51bGwgKSB0aXRsZSArPSBcIiAtIFwiICsgdGhpcy5jYXRlZ29yeS52YWx1ZTtcbiAgICAgICAgICAgIGlmICggdGhpcy50b3VybmFtZW50ICE9PSBudWxsICkgdGl0bGUgKz0gXCIgLSBcIiArIHRoaXMudG91cm5hbWVudC52YWx1ZTtcblxuICAgICAgICAgICAgaWYgKCB0aGlzLnNlYXNvbnMgJiYgdGhpcy5zZWFzb25zLmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgICAgIHRpdGxlICs9IFwiIFwiICsgdGhpcy5zZWFzb25zLm1hcCggKCBzZWFzb24gKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB2YWx1ZXMgPSBzZWFzb24udmFsdWUuc3BsaXQoXCIgXCIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWVzW3ZhbHVlcy5sZW5ndGggLSAxXVxuICAgICAgICAgICAgICAgIH0pLmpvaW4oXCIgLSBcIik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0aXRsZTtcbiAgICAgICAgfTtcblxuICAgICAgICB3YXRjaCh0aGlzLCBcInNwb3J0c1wiLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJVcGRhdGluZyBzcG9ydHNcIiwgYXJndW1lbnRzKTtcbiAgICAgICAgfSk7XG5cblxuICAgIH07XG5cbn0pO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvY2EvY2EubW9kZWxzLmpzIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IEp1YW5DcnV6IG9uIDQvMS8yMDE4LlxuICovXG5cbndpbmRvdy5Db250ZW50QXJlbmEgPSB3aW5kb3cuQ29udGVudEFyZW5hIHx8IHt9O1xuQ29udGVudEFyZW5hLlV0aWxzID0ge1xuXG4gICAgY29udGVudFBhcnNlckZyb21TZXJ2ZXIoY29udGVudCkge1xuXG4gICAgICAgIGlmICggY29udGVudC5wYXJzZWQgKSByZXR1cm4gY29udGVudDtcblxuICAgICAgICBsZXQgc29ydCA9IHRydWU7XG5cbiAgICAgICAgaWYgKCBjb250ZW50LmV4dHJhRGF0YSl7XG4gICAgICAgICAgICBPYmplY3QuZW50cmllcyhjb250ZW50LmV4dHJhRGF0YSkuZm9yRWFjaChcbiAgICAgICAgICAgICAgICAoW2tleSwgdmFsdWVdKSA9PiBjb250ZW50W2tleV0gPSB2YWx1ZVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnRlbnQudG91cm5hbWVudCA9IChjb250ZW50LnRvdXJuYW1lbnQpID8gQXJyYXkuaXNBcnJheShjb250ZW50LnRvdXJuYW1lbnQpPyBjb250ZW50LnRvdXJuYW1lbnQgOiBbY29udGVudC50b3VybmFtZW50XSA6IFtdO1xuICAgICAgICBjb250ZW50LnNwb3J0Q2F0ZWdvcnkgPSAoY29udGVudC5zcG9ydENhdGVnb3J5KSA/IEFycmF5LmlzQXJyYXkoY29udGVudC5zcG9ydENhdGVnb3J5KT8gY29udGVudC5zcG9ydENhdGVnb3J5IDogW2NvbnRlbnQuc3BvcnRDYXRlZ29yeV0gOiBbXTtcblxuICAgICAgICBpZiAoY29udGVudC5zZWxlY3RlZFJpZ2h0c0J5U3VwZXJSaWdodCl7XG4gICAgICAgICAgICBjb250ZW50LnJpZ2h0c1BhY2thZ2UuZm9yRWFjaCggKHJwKSA9PiB7XG4gICAgICAgICAgICAgICAgcnAuc2VsZWN0ZWRSaWdodHMgPSBjb250ZW50LnNlbGVjdGVkUmlnaHRzQnlTdXBlclJpZ2h0W3JwLmlkXVsnaXRlbXMnXTtcbiAgICAgICAgICAgICAgICBycC5leGNsdXNpdmUgPSBjb250ZW50LnNlbGVjdGVkUmlnaHRzQnlTdXBlclJpZ2h0W3JwLmlkXVsnZXhjbHVzaXZlJ107XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb250ZW50LmZpeHR1cmVzQnlTZWFzb24pe1xuICAgICAgICAgICAgY29udGVudC5zZWFzb25zLmZvckVhY2goIChzLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgcy5maXh0dXJlcyA9IGNvbnRlbnQuZml4dHVyZXNCeVNlYXNvbltpXVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIGNvbnRlbnQuc2FsZXNQYWNrYWdlcyApIHtcbiAgICAgICAgICAgIGNvbnRlbnQuc2FsZXNQYWNrYWdlcy5mb3JFYWNoKChzcCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChzcC5zYWxlc01ldGhvZCkgc3Auc2FsZXNNZXRob2QgPSBzcC5zYWxlc01ldGhvZC5uYW1lO1xuICAgICAgICAgICAgICAgIGlmIChzcC5leGNsdWRlZENvdW50cmllcykgc3AuZXhjbHVkZWRUZXJyaXRvcmllcyA9IHNwLmV4Y2x1ZGVkQ291bnRyaWVzLm1hcCh0PT57cmV0dXJue2xhYmVsOnQubmFtZSwgdmFsdWU6dC5uYW1lfX0pXG4gICAgICAgICAgICAgICAgaWYgKHNwLnRlcnJpdG9yaWVzKSBzcC50ZXJyaXRvcmllcyA9IHNwLnRlcnJpdG9yaWVzLm1hcCh0PT57cmV0dXJue2xhYmVsOnQubmFtZSwgdmFsdWU6dC5uYW1lfX0pXG4gICAgICAgICAgICAgICAgaWYgKCFzcC50ZXJyaXRvcmllcykgc29ydCA9IGZhbHNlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChzb3J0KSBjb250ZW50LnNhbGVzUGFja2FnZXMuc29ydCh0aGlzLnNvcnRTYWxlc1BhY2thZ2VzKS5yZXZlcnNlKCk7XG4gICAgICAgIH1cbiAgICAgICAgY29udGVudC5zdGVwID0gTnVtYmVyKGNvbnRlbnQuc3RlcCk7XG4gICAgICAgIGNvbnRlbnQucGFyc2VkID0gdHJ1ZTtcblxuICAgICAgICByZXR1cm4gY29udGVudDtcbiAgICB9LFxuXG4gICAgc29ydFNhbGVzUGFja2FnZXMgKGEsIGIpe1xuICAgICAgICBsZXQgYyA9IChhLCBiKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gKGEgPiBiKSA/IDEgOiAoKGIgPiBhKSA/IC0xIDogMClcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGMoYS50ZXJyaXRvcmllcy5sZW5ndGgsIGIudGVycml0b3JpZXMubGVuZ3RoKSB8fCBjKGIubmFtZSwgYS5uYW1lKTtcbiAgICB9LFxuXG5cblxuICAgIGlzQVBJQXZhaWxhYmxlKCkge1xuICAgICAgICAvLyBDaGVjayBmb3IgdGhlIHZhcmlvdXMgRmlsZSBBUEkgc3VwcG9ydC5cbiAgICAgICAgaWYgKHdpbmRvdy5GaWxlICYmIHdpbmRvdy5GaWxlUmVhZGVyICYmIHdpbmRvdy5GaWxlTGlzdCAmJiB3aW5kb3cuQmxvYikge1xuICAgICAgICAgICAgLy8gR3JlYXQgc3VjY2VzcyEgQWxsIHRoZSBGaWxlIEFQSXMgYXJlIHN1cHBvcnRlZC5cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gc291cmNlOiBGaWxlIEFQSSBhdmFpbGFiaWxpdHkgLSBodHRwOi8vY2FuaXVzZS5jb20vI2ZlYXQ9ZmlsZWFwaVxuICAgICAgICAgICAgLy8gc291cmNlOiA8b3V0cHV0PiBhdmFpbGFiaWxpdHkgLSBodHRwOi8vaHRtbDVkb2N0b3IuY29tL3RoZS1vdXRwdXQtZWxlbWVudC9cbiAgICAgICAgICAgIGRvY3VtZW50LndyaXRlbG4oJ1RoZSBIVE1MNSBBUElzIHVzZWQgaW4gdGhpcyBmb3JtIGFyZSBvbmx5IGF2YWlsYWJsZSBpbiB0aGUgZm9sbG93aW5nIGJyb3dzZXJzOjxiciAvPicpO1xuICAgICAgICAgICAgLy8gNi4wIEZpbGUgQVBJICYgMTMuMCA8b3V0cHV0PlxuICAgICAgICAgICAgZG9jdW1lbnQud3JpdGVsbignIC0gR29vZ2xlIENocm9tZTogMTMuMCBvciBsYXRlcjxiciAvPicpO1xuICAgICAgICAgICAgLy8gMy42IEZpbGUgQVBJICYgNi4wIDxvdXRwdXQ+XG4gICAgICAgICAgICBkb2N1bWVudC53cml0ZWxuKCcgLSBNb3ppbGxhIEZpcmVmb3g6IDYuMCBvciBsYXRlcjxiciAvPicpO1xuICAgICAgICAgICAgLy8gMTAuMCBGaWxlIEFQSSAmIDEwLjAgPG91dHB1dD5cbiAgICAgICAgICAgIGRvY3VtZW50LndyaXRlbG4oJyAtIEludGVybmV0IEV4cGxvcmVyOiBOb3Qgc3VwcG9ydGVkIChwYXJ0aWFsIHN1cHBvcnQgZXhwZWN0ZWQgaW4gMTAuMCk8YnIgLz4nKTtcbiAgICAgICAgICAgIC8vID8gRmlsZSBBUEkgJiA1LjEgPG91dHB1dD5cbiAgICAgICAgICAgIGRvY3VtZW50LndyaXRlbG4oJyAtIFNhZmFyaTogTm90IHN1cHBvcnRlZDxiciAvPicpO1xuICAgICAgICAgICAgLy8gPyBGaWxlIEFQSSAmIDkuMiA8b3V0cHV0PlxuICAgICAgICAgICAgZG9jdW1lbnQud3JpdGVsbignIC0gT3BlcmE6IE5vdCBzdXBwb3J0ZWQnKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgYWRkT3JkaW5hbChuKSB7XG4gICAgICAgIHZhciBzdHIgPSBuLnRvU3RyaW5nKCkuc2xpY2UoLTEpLFxuICAgICAgICAgICAgb3JkID0gJyc7XG4gICAgICAgIHN3aXRjaCAoc3RyKSB7XG4gICAgICAgICAgICBjYXNlICcxJzpcbiAgICAgICAgICAgICAgICBvcmQgPSAnc3QnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnMic6XG4gICAgICAgICAgICAgICAgb3JkID0gJ25kJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJzMnOlxuICAgICAgICAgICAgICAgIG9yZCA9ICdyZCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICc0JzpcbiAgICAgICAgICAgIGNhc2UgJzUnOlxuICAgICAgICAgICAgY2FzZSAnNic6XG4gICAgICAgICAgICBjYXNlICc3JzpcbiAgICAgICAgICAgIGNhc2UgJzgnOlxuICAgICAgICAgICAgY2FzZSAnOSc6XG4gICAgICAgICAgICBjYXNlICcwJzpcbiAgICAgICAgICAgICAgICBvcmQgPSAndGgnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuICsgb3JkO1xuICAgIH0sXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gdmFsdWVcbiAgICAgKiBAcGFyYW0gYXJyXG4gICAgICogQHBhcmFtIHByb3BcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgICAqL1xuICAgIGdldEluZGV4ICh2YWx1ZSwgYXJyLCBwcm9wKSB7XG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmKGFycltpXVtwcm9wXSA9PT0gdmFsdWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gLTE7IC8vdG8gaGFuZGxlIHRoZSBjYXNlIHdoZXJlIHRoZSB2YWx1ZSBkb2Vzbid0IGV4aXN0XG4gICAgfVxuXG59O1xuXG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L2NhL2NhLnV0aWxzLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==