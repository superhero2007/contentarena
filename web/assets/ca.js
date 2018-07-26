webpackJsonp([6],{

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
    getActiveSports: function getActiveSports() {
        var deferred = jQuery.Deferred();
        var _this = this;
        $.ajax({
            url: envhosturl + "search/sports/active",
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

/***/ 4:
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

},[4]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9jYS9jYS5hcGkuY29udGVudC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9jYS9jYS5hcGkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvY2EvY2EuZGF0YS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9jYS9jYS5tb2RlbHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvY2EvY2EudXRpbHMuanMiXSwibmFtZXMiOlsiX19hcGlTdG9yZSIsInRvdXJuYW1lbnRzIiwid2luZG93IiwiQ29udGVudEFyZW5hIiwiQ29udGVudEFwaSIsInNhdmVDb250ZW50QXNEcmFmdCIsImNvbnRlbnQiLCJkZWZlcnJlZCIsImpRdWVyeSIsIkRlZmVycmVkIiwiX3RoaXMiLCIkIiwiYWpheCIsInVybCIsImVudmhvc3R1cmwiLCJ0eXBlIiwiZGF0YSIsIkpTT04iLCJzdHJpbmdpZnkiLCJjb250ZW50VHlwZSIsInN1Y2Nlc3MiLCJyZXNwb25zZSIsInJlc29sdmUiLCJlcnJvciIsInN0YXR1cyIsInJlamVjdCIsInByb21pc2UiLCJzYXZlQ29udGVudEFzSW5hY3RpdmUiLCJzYXZlQ29udGVudEFzQWN0aXZlIiwic2VuZE1lc3NhZ2UiLCJtZXNzYWdlIiwiZ2V0VXNlckluZm8iLCJnZXRDb21wYW55VXNlcnMiLCJ1cGRhdGVDb21wYW55IiwiY29tcGFueSIsInVwZGF0ZVBhc3N3b3JkIiwidXBkYXRlVXNlciIsInVzZXIiLCJnZXRUaHJlYWQiLCJjdXN0b21JZCIsImdldFRocmVhZHMiLCJwbGFjZUJpZCIsImJpZCIsImFjY2VwdEJpZCIsInNpZ25hdHVyZSIsInJlamVjdEJpZCIsInJlbW92ZUJpZCIsInNhdmVUbXBGaWxlIiwiZmlsZXMiLCJGb3JtRGF0YSIsImFwcGVuZCIsInByb2Nlc3NEYXRhIiwiZ2V0QnlDdXN0b21JZCIsImdldERyYWZ0TGlzdGluZ3MiLCJnZXRJbmFjdGl2ZUxpc3RpbmdzIiwiZ2V0QWN0aXZlTGlzdGluZ3MiLCJnZXRFeHBpcmVkTGlzdGluZ3MiLCJyZW1vdmVMaXN0aW5nIiwiZHVwbGljYXRlTGlzdGluZyIsImRlYWN0aXZhdGVMaXN0aW5nIiwiZ2V0Q2xvc2VkRGVhbHMiLCJnZXRBbGxEZWFscyIsImdldFBlbmRpbmdEZWFscyIsImdldFJlamVjdGVkRGVhbHMiLCJnZXRXYXRjaGxpc3RMaXN0aW5ncyIsIkFwaSIsInNvcnRCeUxhYmVsIiwiYSIsImIiLCJuYW1lIiwic29ydEJ5U3BvcnQiLCJzcG9ydCIsInNwb3J0Q2F0ZWdvcnkiLCJwcmVwYXJlTGlzdCIsImxpc3QiLCJjYXRlZ29yeUlkIiwibWFwIiwiaXRlbSIsImNhdGVnb3J5IiwiaWQiLCJleHRlcm5hbElkIiwic29ydCIsImdldENvbnRlbnQiLCJmaWx0ZXIiLCJnZXRKc29uQ29udGVudCIsInNhdmVGaWx0ZXIiLCJnZXRDb3VudHJpZXMiLCJnZXRBY3RpdmVTcG9ydHMiLCJnZXRDb3VudHJpZXNGdWxsIiwiZ2V0VGVycml0b3JpZXMiLCJnZXRSaWdodHMiLCJyaWdodHNQYWNrYWdlIiwiZ3JvdXAiLCJnZXRSaWdodHNQYWNrYWdlIiwiZ2V0U3BvcnRzIiwiaG9zdHVybCIsInNwb3J0cyIsImdldENvbnRlbnREZXRhaWxzIiwiZ2V0UGVuZGluZ0xpc3RpbmdzIiwiZ2V0Q2F0ZWdvcmllcyIsInNwb3J0SWQiLCJjYXRzIiwiZ2V0VG91cm5hbWVudHMiLCJkb25lIiwidG91cm5hbWVudCIsImluZGV4T2YiLCJwdXNoIiwidW5kZWZpbmVkIiwiZ2V0U2Vhc29ucyIsInRvdXJuYW1lbnRJZCIsInNlYXNvbnMiLCJzZWFzb24iLCJpc0FycmF5IiwiZW5kRGF0ZSIsImVuZF9kYXRlIiwic3RhcnREYXRlIiwic3RhcnRfZGF0ZSIsInRvdXJuYW1lbnRfaWQiLCJ5ZWFyIiwicmV2ZXJzZSIsImdldFNjaGVkdWxlIiwic2Vhc29uSWQiLCJzcG9ydF9ldmVudHMiLCJzcG9ydF9ldmVudCIsImZvckVhY2giLCJyb3VuZCIsInRvdXJuYW1lbnRfcm91bmQiLCJudW1iZXIiLCJtYXRjaGVzIiwiTWFwIiwic2V0Iiwic2NoZWR1bGVkIiwidG91cm5hbWVudFJvdW5kIiwiY29tcGV0aXRvcnMiLCJjb21wZXRpdG9yIiwic2VhcmNoQ29tcGV0aXRpb24iLCJyZXF1ZXN0IiwidHJhZGl0aW9uYWwiLCJkYXRhVHlwZSIsIndhdGNobGlzdCIsIkRhdGEiLCJMYW5ndWFnZXMiLCJUb3BTcG9ydHMiLCJGdWxsU3BvcnRzIiwiQ291bnRyaWVzIiwiU2hvcnQiLCJMb25nIiwiTW9kZWwiLCJSaWdodFBhY2thZ2UiLCJyaWdodHMiLCJSaWdodCIsInJpZ2h0SXRlbXMiLCJSaWdodEl0ZW0iLCJpbnB1dHMiLCJTZWxlY3RlZFJpZ2h0IiwicmlnaHQiLCJyaWdodEl0ZW0iLCJTYWxlc1BhY2thZ2UiLCJzYWxlc01ldGhvZCIsImZlZSIsImN1cnJlbmN5IiwidGVycml0b3JpZXMiLCJzZWxlY3RlZFRlcnJpdG9yaWVzIiwiZXhjbHVkZWRUZXJyaXRvcmllcyIsInRlcnJpdG9yeUJpZHMiLCJzZWxsQXNQYWNrYWdlIiwidmFsaWRhdGUiLCJkZXNjcmlwdGlvbiIsImhhc0Vycm9ycyIsIkNvbnRlbnQiLCJzYWxlc1BhY2thZ2VzIiwiaW5zdGFsbG1lbnRzIiwiZ2V0VGl0bGUiLCJjb25zb2xlIiwibG9nIiwidGl0bGUiLCJsZW5ndGgiLCJpbmRleCIsImFycmF5IiwidmFsdWUiLCJ2YWx1ZXMiLCJzcGxpdCIsImpvaW4iLCJ3YXRjaCIsImFyZ3VtZW50cyIsIlV0aWxzIiwiY29udGVudFBhcnNlckZyb21TZXJ2ZXIiLCJwYXJzZWQiLCJleHRyYURhdGEiLCJPYmplY3QiLCJlbnRyaWVzIiwia2V5IiwiQXJyYXkiLCJzZWxlY3RlZFJpZ2h0c0J5U3VwZXJSaWdodCIsInJwIiwic2VsZWN0ZWRSaWdodHMiLCJleGNsdXNpdmUiLCJmaXh0dXJlc0J5U2Vhc29uIiwicyIsImkiLCJmaXh0dXJlcyIsInNwIiwiZXhjbHVkZWRDb3VudHJpZXMiLCJsYWJlbCIsInQiLCJzb3J0U2FsZXNQYWNrYWdlcyIsInN0ZXAiLCJOdW1iZXIiLCJjIiwiaXNBUElBdmFpbGFibGUiLCJGaWxlIiwiRmlsZVJlYWRlciIsIkZpbGVMaXN0IiwiQmxvYiIsImRvY3VtZW50Iiwid3JpdGVsbiIsImFkZE9yZGluYWwiLCJuIiwic3RyIiwidG9TdHJpbmciLCJzbGljZSIsIm9yZCIsImdldEluZGV4IiwiYXJyIiwicHJvcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBSUEsSUFBSUEsYUFBYTtBQUNiQyxpQkFBYztBQURELENBQWpCOztBQUlBQyxPQUFPQyxZQUFQLEdBQXNCRCxPQUFPQyxZQUFQLElBQXVCLEVBQTdDO0FBQ0FBLGFBQWFDLFVBQWIsR0FBMEJELGFBQWFDLFVBQWIsSUFBMEIsRUFBcEQ7O0FBRUFELGFBQWFDLFVBQWIsR0FBeUI7QUFDckJDLHNCQURxQiw4QkFDQUMsT0FEQSxFQUNVO0FBQzNCLFlBQUlDLFdBQVdDLE9BQU9DLFFBQVAsRUFBZjtBQUFBLFlBQ0lDLFFBQVEsSUFEWjs7QUFHQUMsVUFBRUMsSUFBRixDQUFPO0FBQ0hDLGlCQUFLQyxhQUFhLG9CQURmO0FBRUhDLGtCQUFNLE1BRkg7QUFHSEMsa0JBQU1DLEtBQUtDLFNBQUwsQ0FBZVosT0FBZixDQUhIO0FBSUhhLHlCQUFhLGtCQUpWO0FBS0hDLHFCQUFTLGlCQUFVQyxRQUFWLEVBQW9CO0FBQ3pCZCx5QkFBU2UsT0FBVCxDQUFpQkQsUUFBakI7QUFDSCxhQVBFO0FBUUhFLG1CQUFRLGVBQVVQLElBQVYsRUFBZ0JRLE1BQWhCLEVBQXdCO0FBQzVCakIseUJBQVNrQixNQUFULENBQWdCO0FBQ1pULDBCQUFNQSxJ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QVosRUFBZUEsSUFBSXdCLElBQUkvQyxNQUF2QixFQUErQnVCLEdBQS9CLEVBQW9DO0FBQ2hDLGdCQUFHd0IsSUFBSXhCLENBQUosRUFBT3lCLElBQVAsTUFBaUI3QyxLQUFwQixFQUEyQjtBQUN2Qix1QkFBT29CLENBQVA7QUFDSDtBQUNKO0FBQ0QsZUFBTyxDQUFDLENBQVIsQ0FOd0IsQ0FNYjtBQUNkO0FBbkhnQixDQUFyQixDIiwiZmlsZSI6ImNhLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiogQ3JlYXRlZCBieSBKdWFuQ3J1eiBvbiA0LzEvMjAxOC5cclxuKi9cclxuXHJcbmxldCBfX2FwaVN0b3JlID0ge1xyXG4gICAgdG91cm5hbWVudHMgOiB7fVxyXG59O1xyXG5cclxud2luZG93LkNvbnRlbnRBcmVuYSA9IHdpbmRvdy5Db250ZW50QXJlbmEgfHwge307XHJcbkNvbnRlbnRBcmVuYS5Db250ZW50QXBpID0gQ29udGVudEFyZW5hLkNvbnRlbnRBcGl8fCB7fTtcclxuXHJcbkNvbnRlbnRBcmVuYS5Db250ZW50QXBpPSB7XHJcbiAgICBzYXZlQ29udGVudEFzRHJhZnQgKCBjb250ZW50ICkge1xyXG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxyXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XHJcblxyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiY29udGVudC9kcmFmdC9zYXZlXCIsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShjb250ZW50KSxcclxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcclxuICAgIH0sXHJcbiAgICBzYXZlQ29udGVudEFzSW5hY3RpdmUgKCBjb250ZW50ICkge1xyXG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxyXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XHJcblxyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL2xpc3Rpbmcvc2F2ZVwiLFxyXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoY29udGVudCksXHJcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XHJcbiAgICB9LFxyXG4gICAgc2F2ZUNvbnRlbnRBc0FjdGl2ZSAoIGNvbnRlbnQgKSB7XHJcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXHJcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcclxuXHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvbGlzdGluZy9wdWJsaXNoXCIsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShjb250ZW50KSxcclxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcclxuICAgIH0sXHJcbiAgICBzZW5kTWVzc2FnZSAoIG1lc3NhZ2UgKSB7XHJcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXHJcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcclxuXHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvbWVzc2FnZXMvc2VuZFwiLFxyXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkobWVzc2FnZSksXHJcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XHJcbiAgICB9LFxyXG4gICAgZ2V0VXNlckluZm8gKCApIHtcclxuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcclxuICAgICAgICAgICAgX3RoaXMgPSB0aGlzO1xyXG5cclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS91c2VyL2luZm9cIixcclxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XHJcbiAgICB9LFxyXG4gICAgZ2V0Q29tcGFueVVzZXJzICggKSB7XHJcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXHJcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcclxuXHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvY29tcGFueS91c2Vyc1wiLFxyXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcclxuICAgIH0sXHJcbiAgICB1cGRhdGVDb21wYW55ICggY29tcGFueSApIHtcclxuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcclxuICAgICAgICAgICAgX3RoaXMgPSB0aGlzO1xyXG5cclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS9jb21wYW55L3VwZGF0ZVwiLFxyXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoe2NvbXBhbnk6Y29tcGFueX0pLFxyXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xyXG4gICAgfSxcclxuXHJcbiAgICB1cGRhdGVQYXNzd29yZCAoIGRhdGEgKSB7XHJcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXHJcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcclxuXHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvdXNlci9wYXNzd29yZFwiLFxyXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoZGF0YSksXHJcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XHJcbiAgICB9LFxyXG4gICAgdXBkYXRlVXNlciAoIHVzZXIgKSB7XHJcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXHJcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcclxuXHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvdXNlci91cGRhdGVcIixcclxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHt1c2VyOnVzZXJ9KSxcclxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcclxuICAgIH0sXHJcbiAgICBnZXRUaHJlYWQgKCBjdXN0b21JZCApIHtcclxuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcclxuICAgICAgICAgICAgX3RoaXMgPSB0aGlzO1xyXG5cclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS9tZXNzYWdlcy90aHJlYWRcIixcclxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHtjdXN0b21JZDogY3VzdG9tSWR9KSxcclxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcclxuICAgIH0sXHJcbiAgICBnZXRUaHJlYWRzICggICkge1xyXG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxyXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XHJcblxyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL21lc3NhZ2VzL3RocmVhZHNcIixcclxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XHJcbiAgICB9LFxyXG4gICAgcGxhY2VCaWQgKCBiaWQgKSB7XHJcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXHJcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcclxuXHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvYmlkL3BsYWNlXCIsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShiaWQpLFxyXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xyXG4gICAgfSxcclxuICAgIGFjY2VwdEJpZCAoIGJpZCwgc2lnbmF0dXJlICkge1xyXG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxyXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XHJcblxyXG4gICAgICAgIGJpZC5zaWduYXR1cmUgPSBzaWduYXR1cmU7XHJcblxyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL2JpZC9hY2NlcHRcIixcclxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KGJpZCksXHJcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XHJcbiAgICB9LFxyXG4gICAgcmVqZWN0QmlkICggYmlkICkge1xyXG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxyXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XHJcblxyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL2JpZC9yZWplY3RcIixcclxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KGJpZCksXHJcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XHJcbiAgICB9LFxyXG4gICAgcmVtb3ZlQmlkICggYmlkICkge1xyXG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxyXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XHJcblxyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL2JpZC9yZW1vdmVcIixcclxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KGJpZCksXHJcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHNhdmVUbXBGaWxlICggZmlsZXMgKSB7XHJcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXHJcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcclxuXHJcbiAgICAgICAgY29uc3QgZGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xyXG4gICAgICAgIGRhdGEuYXBwZW5kKCdmaWxlJywgZmlsZXNbMF0pO1xyXG5cclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImNvbnRlbnQvc2F2ZS9maWxlXCIsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBkYXRhOiBkYXRhLFxyXG4gICAgICAgICAgICBwcm9jZXNzRGF0YTogZmFsc2UsXHJcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBmYWxzZSxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XHJcbiAgICB9LFxyXG4gICAgZ2V0QnlDdXN0b21JZCAoIGN1c3RvbUlkICkge1xyXG4gICAgICAgIHZhciBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxyXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XHJcblxyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwibGlzdGluZy9kZXRhaWxzXCIsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICBjdXN0b21JZCA6IGN1c3RvbUlkLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcclxuICAgIH0sXHJcblxyXG4gICAgZ2V0RHJhZnRMaXN0aW5ncyAoICkge1xyXG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpO1xyXG5cclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS9saXN0aW5ncy9kcmFmdFwiLFxyXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XHJcbiAgICB9LFxyXG4gICAgZ2V0SW5hY3RpdmVMaXN0aW5ncyAoICkge1xyXG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpO1xyXG5cclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS9saXN0aW5ncy9pbmFjdGl2ZVwiLFxyXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XHJcbiAgICB9LFxyXG4gICAgZ2V0QWN0aXZlTGlzdGluZ3MgKCApIHtcclxuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKTtcclxuXHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvbGlzdGluZ3MvYWN0aXZlXCIsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcclxuICAgIH0sXHJcbiAgICBnZXRFeHBpcmVkTGlzdGluZ3MgKCApIHtcclxuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKTtcclxuXHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvbGlzdGluZ3MvZXhwaXJlZFwiLFxyXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XHJcbiAgICB9LFxyXG4gICAgcmVtb3ZlTGlzdGluZyggY3VzdG9tSWQgKSB7XHJcbiAgICAgICAgdmFyIGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXHJcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcclxuXHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvbGlzdGluZ3MvcmVtb3ZlXCIsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICBjdXN0b21JZCA6IGN1c3RvbUlkLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcclxuICAgIH0sXHJcbiAgICBkdXBsaWNhdGVMaXN0aW5nKCBjdXN0b21JZCApIHtcclxuICAgICAgICB2YXIgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcclxuICAgICAgICAgICAgX3RoaXMgPSB0aGlzO1xyXG5cclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS9saXN0aW5ncy9kdXBsaWNhdGVcIixcclxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgIGN1c3RvbUlkIDogY3VzdG9tSWQsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xyXG4gICAgfSxcclxuICAgIGRlYWN0aXZhdGVMaXN0aW5nKCBjdXN0b21JZCApIHtcclxuICAgICAgICB2YXIgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcclxuICAgICAgICAgICAgX3RoaXMgPSB0aGlzO1xyXG5cclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS9saXN0aW5ncy9kZWFjdGl2YXRlXCIsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICBjdXN0b21JZCA6IGN1c3RvbUlkLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcclxuICAgIH0sXHJcblxyXG4gICAgZ2V0Q2xvc2VkRGVhbHMgKCAgKSB7XHJcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCk7XHJcblxyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL2JpZC9jbG9zZWRcIixcclxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XHJcbiAgICB9LFxyXG4gICAgZ2V0QWxsRGVhbHMgKCAgKSB7XHJcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCk7XHJcblxyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL2JpZC9hbGxcIixcclxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XHJcbiAgICB9LFxyXG4gICAgZ2V0UGVuZGluZ0RlYWxzICggICkge1xyXG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpO1xyXG5cclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS9iaWQvcGVuZGluZ1wiLFxyXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcclxuICAgIH0sXHJcbiAgICBnZXRSZWplY3RlZERlYWxzICggICkge1xyXG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpO1xyXG5cclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS9iaWQvcmVqZWN0ZWRcIixcclxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XHJcbiAgICB9LFxyXG4gICAgZ2V0V2F0Y2hsaXN0TGlzdGluZ3MgKCl7XHJcbiAgICAgICAgdmFyIGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXHJcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcclxuXHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvbGlzdGluZ3Mvd2F0Y2hsaXN0XCIsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcclxuICAgIH0sXHJcblxyXG59O1xyXG5cclxuXHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L2NhL2NhLmFwaS5jb250ZW50LmpzIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgSnVhbkNydXogb24gNC8xLzIwMTguXHJcbiAqL1xyXG5cclxubGV0IF9fYXBpU3RvcmUgPSB7XHJcbiAgICB0b3VybmFtZW50cyA6IHt9XHJcbn07XHJcblxyXG53aW5kb3cuQ29udGVudEFyZW5hID0gd2luZG93LkNvbnRlbnRBcmVuYSB8fCB7fTtcclxuXHJcbkNvbnRlbnRBcmVuYS5BcGk9IHtcclxuICAgIHNvcnRCeUxhYmVsIChhLCBiKSB7XHJcbiAgICAgICAgcmV0dXJuIChhLm5hbWUgPiBiLm5hbWUpID8gMSA6ICgoYi5uYW1lID4gYS5uYW1lKSA/IC0xIDogMClcclxuICAgIH0sXHJcbiAgICBzb3J0QnlTcG9ydCAoYSwgYikge1xyXG5cclxuICAgICAgICBpZiAoYS5zcG9ydC5uYW1lID4gYi5zcG9ydC5uYW1lKSByZXR1cm4gMTtcclxuICAgICAgICBpZiAoYS5zcG9ydC5uYW1lIDwgYi5zcG9ydC5uYW1lKSByZXR1cm4gLTE7XHJcbiAgICAgICAgaWYgKGEuc3BvcnRDYXRlZ29yeS5uYW1lID4gYi5zcG9ydENhdGVnb3J5Lm5hbWUpIHJldHVybiAxO1xyXG4gICAgICAgIGlmIChhLnNwb3J0Q2F0ZWdvcnkubmFtZSA8IGIuc3BvcnRDYXRlZ29yeS5uYW1lKSByZXR1cm4gLTE7XHJcbiAgICAgICAgaWYgKGEubmFtZSA+IGIubmFtZSkgcmV0dXJuIDE7XHJcbiAgICAgICAgaWYgKGEubmFtZSA8IGIubmFtZSkgcmV0dXJuIC0xO1xyXG4gICAgICAgIHJldHVybiAwO1xyXG5cclxuICAgIH0sXHJcbiAgICBwcmVwYXJlTGlzdCAoIGxpc3QsIGNhdGVnb3J5SWQgKSB7XHJcblxyXG4gICAgICAgIGxldCBfdGhpcyA9IHRoaXM7XHJcblxyXG4gICAgICAgIGxpc3QgPSAkLm1hcChsaXN0LCBmdW5jdGlvbiAoaXRlbSkge1xyXG5cclxuICAgICAgICAgICAgLy8gRmlsdGVyIGJ5IGNhdGVnb3J5XHJcbiAgICAgICAgICAgIGlmICggY2F0ZWdvcnlJZCAmJiBpdGVtLmNhdGVnb3J5WydAYXR0cmlidXRlcyddLmlkICE9IGNhdGVnb3J5SWQpIHJldHVybiBudWxsO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHtuYW1lOiBpdGVtWydAYXR0cmlidXRlcyddLm5hbWUsIGV4dGVybmFsSWQ6IGl0ZW1bJ0BhdHRyaWJ1dGVzJ10uaWR9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGxpc3Quc29ydChfdGhpcy5zb3J0QnlMYWJlbCk7XHJcblxyXG4gICAgICAgIHJldHVybiBsaXN0O1xyXG4gICAgfSxcclxuICAgIGdldENvbnRlbnQgKCBmaWx0ZXIpIHtcclxuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKTtcclxuXHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJidXkvc2VhcmNoXCIsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBkYXRhIDogZmlsdGVyLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcclxuICAgIH0sXHJcbiAgICBnZXRKc29uQ29udGVudCAoIGZpbHRlcikge1xyXG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpO1xyXG5cclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImxpc3RpbmdzL21hcmtldHBsYWNlXCIsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBkYXRhIDogZmlsdGVyLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcclxuICAgIH0sXHJcbiAgICBzYXZlRmlsdGVyICggZmlsdGVyKSB7XHJcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCk7XHJcblxyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYnV5L2ZpbHRlci9zYXZlXCIsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBkYXRhIDogZmlsdGVyLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcclxuICAgIH0sXHJcbiAgICBnZXRDb3VudHJpZXMgKCkge1xyXG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpO1xyXG4gICAgICAgIGxldCBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJzZWFyY2gvY291bnRyaWVzL2FsbFwiLFxyXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIEBwYXJhbSB7YXJyYXl9IHJlc3BvbnNlXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgIHJlc3BvbnNlLnNvcnQoX3RoaXMuc29ydEJ5TGFiZWwpO1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xyXG4gICAgfSxcclxuICAgIGdldEFjdGl2ZVNwb3J0cyAoKSB7XHJcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCk7XHJcbiAgICAgICAgbGV0IF90aGlzID0gdGhpcztcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcInNlYXJjaC9zcG9ydHMvYWN0aXZlXCIsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogQHBhcmFtIHthcnJheX0gcmVzcG9uc2VcclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xyXG4gICAgfSxcclxuICAgIGdldENvdW50cmllc0Z1bGwgKCkge1xyXG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpO1xyXG4gICAgICAgIGxldCBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJzZWFyY2gvY291bnRyaWVzL2Z1bGxcIixcclxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBAcGFyYW0ge2FycmF5fSByZXNwb25zZVxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICByZXNwb25zZS5zb3J0KF90aGlzLnNvcnRCeUxhYmVsKTtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcclxuICAgIH0sXHJcbiAgICBnZXRUZXJyaXRvcmllcyAoKSB7XHJcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCk7XHJcbiAgICAgICAgbGV0IF90aGlzID0gdGhpcztcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcInNlYXJjaC90ZXJyaXRvcmllc1wiLFxyXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIEBwYXJhbSB7YXJyYXl9IHJlc3BvbnNlXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgIHJlc3BvbnNlLnNvcnQoX3RoaXMuc29ydEJ5TGFiZWwpO1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xyXG4gICAgfSxcclxuICAgIGdldFJpZ2h0cyAocmlnaHRzUGFja2FnZSwgZ3JvdXApIHtcclxuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKTtcclxuICAgICAgICBsZXQgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwic2VhcmNoL3JpZ2h0c1wiLFxyXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgZGF0YSA6IHtcclxuICAgICAgICAgICAgICAgIHJpZ2h0c1BhY2thZ2U6IHJpZ2h0c1BhY2thZ2UsXHJcbiAgICAgICAgICAgICAgICBncm91cDogZ3JvdXBcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBAcGFyYW0ge2FycmF5fSByZXNwb25zZVxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XHJcbiAgICB9LFxyXG4gICAgZ2V0UmlnaHRzUGFja2FnZSAocmlnaHRzUGFja2FnZSwgZ3JvdXApIHtcclxuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKTtcclxuICAgICAgICBsZXQgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwic2VhcmNoL3JpZ2h0cy1wYWNrYWdlXCIsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBkYXRhIDoge1xyXG4gICAgICAgICAgICAgICAgcmlnaHRzUGFja2FnZTogcmlnaHRzUGFja2FnZSxcclxuICAgICAgICAgICAgICAgIGdyb3VwOiBncm91cFxyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIEBwYXJhbSB7YXJyYXl9IHJlc3BvbnNlXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcclxuICAgIH0sXHJcbiAgICBnZXRTcG9ydHMgKCkge1xyXG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpO1xyXG4gICAgICAgIGxldCBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBob3N0dXJsICsgXCJ2MS9mZWVkL3Nwb3J0c1wiLFxyXG4gICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogQHBhcmFtIHt7c3BvcnQ6b2JqZWN0fX0gcmVzcG9uc2VcclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBzcG9ydHMgPSBfdGhpcy5wcmVwYXJlTGlzdCggcmVzcG9uc2Uuc3BvcnQpO1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShzcG9ydHMpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcclxuICAgIH0sXHJcbiAgICBnZXRDb250ZW50RGV0YWlscyggaWQgKSB7XHJcbiAgICAgICAgdmFyIGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXHJcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcclxuXHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJjb250ZW50L2RldGFpbHMvXCIsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBkYXRhOiB7aWQgOiBpZH0sXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xyXG4gICAgfSxcclxuICAgIGdldFBlbmRpbmdMaXN0aW5ncyggaWQgKSB7XHJcbiAgICAgICAgdmFyIGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXHJcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcclxuXHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJjb250ZW50L3BlbmRpbmctbGlzdGluZ3MvXCIsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBkYXRhOiB7aWQgOiBpZH0sXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xyXG4gICAgfSxcclxuICAgIGdldENhdGVnb3JpZXMgKCBzcG9ydElkICkge1xyXG4gICAgICAgIHZhciBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxyXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXMsXHJcbiAgICAgICAgICAgIGxpc3QgPSBbXSxcclxuICAgICAgICAgICAgY2F0cyA9IFtdO1xyXG5cclxuICAgICAgICBfdGhpcy5nZXRUb3VybmFtZW50cyhzcG9ydElkKS5kb25lKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgIGlmICggISBfX2FwaVN0b3JlLnRvdXJuYW1lbnRzW3Nwb3J0SWRdICkge1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSggW10gKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGlzdCA9ICQubWFwKCBfX2FwaVN0b3JlLnRvdXJuYW1lbnRzW3Nwb3J0SWRdLnRvdXJuYW1lbnQgLCBmdW5jdGlvbiAoaXRlbSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBpZCA9IGl0ZW0uY2F0ZWdvcnlbJ0BhdHRyaWJ1dGVzJ10uaWQ7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCBjYXRzLmluZGV4T2YoaWQpICE9PSAtMSApIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2F0cy5wdXNoKCBpZCApO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLmNhdGVnb3J5O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoX3RoaXMucHJlcGFyZUxpc3QobGlzdCkgKTtcclxuICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XHJcbiAgICB9LFxyXG4gICAgZ2V0VG91cm5hbWVudHMgKCBzcG9ydElkLCBjYXRlZ29yeUlkICkge1xyXG4gICAgICAgIHZhciBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxyXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XHJcblxyXG4gICAgICAgIGlmICggX19hcGlTdG9yZS50b3VybmFtZW50c1tzcG9ydElkXSAhPT0gdW5kZWZpbmVkICl7XHJcbiAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoX3RoaXMucHJlcGFyZUxpc3QoX19hcGlTdG9yZS50b3VybmFtZW50c1tzcG9ydElkXS50b3VybmFtZW50LCBjYXRlZ29yeUlkKSk7XHJcbiAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IGhvc3R1cmwgKyBcInYxL2ZlZWQvdG91cm5hbWVudHNcIixcclxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIGRhdGEgOiB7IGlkIDogc3BvcnRJZCB9LFxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogQHBhcmFtIHt7dG91cm5hbWVudHM6e3RvdXJuYW1lbnQ6QXJyYXl9fX0gcmVzcG9uc2VcclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIEEgY29tbWVudFxyXG4gICAgICAgICAgICAgICAgaWYgKCByZXNwb25zZS50b3VybmFtZW50cyA9PT0gdW5kZWZpbmVkIHx8IHJlc3BvbnNlLnRvdXJuYW1lbnRzLnRvdXJuYW1lbnQgPT09IHVuZGVmaW5lZCApIHtcclxuICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKFtdKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgX19hcGlTdG9yZS50b3VybmFtZW50c1tzcG9ydElkXSA9IHJlc3BvbnNlLnRvdXJuYW1lbnRzO1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShfdGhpcy5wcmVwYXJlTGlzdChyZXNwb25zZS50b3VybmFtZW50cy50b3VybmFtZW50LCBjYXRlZ29yeUlkKSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cyApIHtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xyXG4gICAgfSxcclxuICAgIGdldFNlYXNvbnMgKCB0b3VybmFtZW50SWQgKSB7XHJcbiAgICAgICAgdmFyIGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXHJcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcclxuXHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBob3N0dXJsICsgXCJ2MS9mZWVkL3NlYXNvbnNcIixcclxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIGRhdGEgOiB7IGlkIDogdG91cm5hbWVudElkIH0sXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBAcGFyYW0ge3t0b3VybmFtZW50czp7dG91cm5hbWVudDpBcnJheX19fSByZXNwb25zZVxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGxpc3Q7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCByZXNwb25zZS5zZWFzb25zID09PSB1bmRlZmluZWQgfHwgcmVzcG9uc2Uuc2Vhc29ucy5zZWFzb24gPT09IHVuZGVmaW5lZCApIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoICQuaXNBcnJheShyZXNwb25zZS5zZWFzb25zLnNlYXNvbikgKXtcclxuICAgICAgICAgICAgICAgICAgICBsaXN0ID0gJC5tYXAocmVzcG9uc2Uuc2Vhc29ucy5zZWFzb24sIGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBpdGVtWydAYXR0cmlidXRlcyddLm5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHRlcm5hbElkOiBpdGVtWydAYXR0cmlidXRlcyddLmlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5kRGF0ZTogaXRlbVsnQGF0dHJpYnV0ZXMnXS5lbmRfZGF0ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0RGF0ZTogaXRlbVsnQGF0dHJpYnV0ZXMnXS5zdGFydF9kYXRlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG91cm5hbWVudElkOiBpdGVtWydAYXR0cmlidXRlcyddLnRvdXJuYW1lbnRfaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB5ZWFyOiBpdGVtWydAYXR0cmlidXRlcyddLnllYXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KS5yZXZlcnNlKCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGxpc3QgPSBbe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiByZXNwb25zZS5zZWFzb25zLnNlYXNvblsnQGF0dHJpYnV0ZXMnXS5uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBleHRlcm5hbElkOiByZXNwb25zZS5zZWFzb25zLnNlYXNvblsnQGF0dHJpYnV0ZXMnXS5pZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZW5kRGF0ZTogcmVzcG9uc2Uuc2Vhc29ucy5zZWFzb25bJ0BhdHRyaWJ1dGVzJ10uZW5kX2RhdGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0RGF0ZTogcmVzcG9uc2Uuc2Vhc29ucy5zZWFzb25bJ0BhdHRyaWJ1dGVzJ10uc3RhcnRfZGF0ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG91cm5hbWVudElkOiByZXNwb25zZS5zZWFzb25zLnNlYXNvblsnQGF0dHJpYnV0ZXMnXS50b3VybmFtZW50X2lkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB5ZWFyOiByZXNwb25zZS5zZWFzb25zLnNlYXNvblsnQGF0dHJpYnV0ZXMnXS55ZWFyLFxyXG4gICAgICAgICAgICAgICAgICAgIH1dXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShsaXN0KTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzICkge1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XHJcbiAgICB9LFxyXG4gICAgZ2V0U2NoZWR1bGUgKCBzZWFzb25JZCApIHtcclxuICAgICAgICB2YXIgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcclxuICAgICAgICAgICAgX3RoaXMgPSB0aGlzO1xyXG5cclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IGhvc3R1cmwgKyBcInYxL2ZlZWQvc2NoZWR1bGVzXCIsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBkYXRhIDogeyBpZCA6IHNlYXNvbklkIH0sXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBAcGFyYW0ge3t0b3VybmFtZW50czp7dG91cm5hbWVudDpBcnJheX19fSByZXNwb25zZVxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGxpc3QgPSB7fTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIHJlc3BvbnNlLnNwb3J0X2V2ZW50cyA9PT0gdW5kZWZpbmVkIHx8IHJlc3BvbnNlLnNwb3J0X2V2ZW50cy5zcG9ydF9ldmVudCA9PT0gdW5kZWZpbmVkICkgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgICAgIHJlc3BvbnNlLnNwb3J0X2V2ZW50cy5zcG9ydF9ldmVudC5mb3JFYWNoKCAoaXRlbSkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgcm91bmQgID0gKGl0ZW0udG91cm5hbWVudF9yb3VuZCkgPyBpdGVtLnRvdXJuYW1lbnRfcm91bmRbJ0BhdHRyaWJ1dGVzJ10gOiBudWxsO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXJvdW5kKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBuYW1lID0gKHJvdW5kLm51bWJlcikgPyBcInJvdW5kX1wiICsgcm91bmQubnVtYmVyIDogcm91bmQubmFtZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCAhbGlzdFtuYW1lXSApIGxpc3RbbmFtZV0gPSB7fTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCAhbGlzdFtuYW1lXS5tYXRjaGVzICkgbGlzdFtuYW1lXS5tYXRjaGVzID0gbmV3IE1hcCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsaXN0W25hbWVdLm1hdGNoZXMuc2V0KGl0ZW1bJ0BhdHRyaWJ1dGVzJ10uaWQse1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY2hlZHVsZWQ6IGl0ZW1bJ0BhdHRyaWJ1dGVzJ10uc2NoZWR1bGVkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBleHRlcm5hbElkOiBpdGVtWydAYXR0cmlidXRlcyddLmlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IGl0ZW1bJ0BhdHRyaWJ1dGVzJ10uc3RhdHVzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VybmFtZW50Um91bmQgOiByb3VuZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29tcGV0aXRvcnMgOiAoaXRlbS5jb21wZXRpdG9ycykgPyBpdGVtLmNvbXBldGl0b3JzLmNvbXBldGl0b3IubWFwKCggY29tcGV0aXRvcik9PnsgcmV0dXJuIGNvbXBldGl0b3JbJ0BhdHRyaWJ1dGVzJ10gIH0pICA6IG51bGxcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKGxpc3QpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMgKSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcclxuICAgIH0sXHJcbiAgICBzZWFyY2hDb21wZXRpdGlvbihyZXF1ZXN0KSB7XHJcblxyXG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpO1xyXG4gICAgICAgIGxldCBfdGhpcyA9IHRoaXM7XHJcblxyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArICdzZWFyY2gvdG91cm5hbWVudCcsXHJcbiAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgIFwiY29udGVudFwiOiByZXF1ZXN0XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHRyYWRpdGlvbmFsOiB0cnVlLFxyXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgZGF0YVR5cGU6IFwianNvblwiLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGRhdGEuc29ydChfdGhpcy5zb3J0QnlTcG9ydCk7XHJcblxyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShkYXRhKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzICkge1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XHJcbiAgICB9LFxyXG4gICAgd2F0Y2hsaXN0KCBpZCApIHtcclxuICAgICAgICB2YXIgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcclxuICAgICAgICAgICAgX3RoaXMgPSB0aGlzO1xyXG5cclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcIm15Y29udGVudC93YXRjaGxpc3QvXCIsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBkYXRhOiB7aWQgOiBpZH0sXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuXHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L2NhL2NhLmFwaS5qcyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IEp1YW5DcnV6IG9uIDQvMS8yMDE4LlxyXG4gKi9cclxuXHJcbndpbmRvdy5Db250ZW50QXJlbmEgPSB3aW5kb3cuQ29udGVudEFyZW5hIHx8IHt9O1xyXG5cclxuQ29udGVudEFyZW5hLkRhdGEgPSBDb250ZW50QXJlbmEuRGF0YSB8fCB7fTtcclxuQ29udGVudEFyZW5hLkxhbmd1YWdlcyA9IENvbnRlbnRBcmVuYS5MYW5ndWFnZXMgfHwge307XHJcblxyXG5Db250ZW50QXJlbmEuRGF0YS5Ub3BTcG9ydHMgPSBbXHJcbiAgICB7IG5hbWUgOiBcIlNvY2NlclwiLCBleHRlcm5hbElkOiBcInNyOnNwb3J0OjFcIn0sXHJcbiAgICB7IG5hbWUgOiBcIkJhc2tldGJhbGxcIiwgZXh0ZXJuYWxJZDogXCJzcjpzcG9ydDoyXCJ9LFxyXG4gICAgeyBuYW1lIDogXCJCYXNlYmFsbFwiLCBleHRlcm5hbElkOiBcInNyOnNwb3J0OjNcIn0sXHJcbiAgICB7IG5hbWUgOiBcIlRlbm5pc1wiLCBleHRlcm5hbElkOiBcInNyOnNwb3J0OjVcIn0sXHJcbiAgICB7IG5hbWUgOiBcIkNyaWNrZXRcIiwgZXh0ZXJuYWxJZDogXCJzcjpzcG9ydDoyMVwifSxcclxuICAgIHsgbmFtZSA6IFwiRmllbGQgSG9ja2V5XCIsIGV4dGVybmFsSWQ6IFwic3I6c3BvcnQ6MjRcIn0sXHJcbiAgICB7IG5hbWUgOiBcIlZvbGxleWJhbGxcIiwgZXh0ZXJuYWxJZDogXCJzcjpzcG9ydDoyM1wifSxcclxuICAgIHsgbmFtZSA6IFwiVGFibGUgVGVubmlzXCIsIGV4dGVybmFsSWQ6IFwic3I6c3BvcnQ6MjBcIn0sXHJcbiAgICB7IG5hbWUgOiBcIkdvbGZcIiwgZXh0ZXJuYWxJZDogXCJzcjpzcG9ydDo5XCJ9LFxyXG4gICAgeyBuYW1lIDogXCJBbWVyaWNhbiBGb290YmFsbFwiLCBleHRlcm5hbElkOiBcInNyOnNwb3J0OjE2XCJ9LFxyXG4gICAgeyBuYW1lIDogXCJIYW5kYmFsbFwiLCBleHRlcm5hbElkOiBcInNyOnNwb3J0OjZcIn1cclxuXTtcclxuXHJcbkNvbnRlbnRBcmVuYS5EYXRhLkZ1bGxTcG9ydHMgPSBbXTtcclxuQ29udGVudEFyZW5hLkRhdGEuQ291bnRyaWVzID0gW107XHJcblxyXG5Db250ZW50QXJlbmEuTGFuZ3VhZ2VzLlNob3J0ID0ge1xyXG4gICAgXCJtZHJcIjogXCJNYW5kYXJpblwiLFxyXG4gICAgXCJlc1wiOiBcIlNwYW5pc2hcIixcclxuICAgIFwiZW5cIjogXCJFbmdsaXNoXCIsXHJcbiAgICBcImhpXCI6IFwiSGluZGlcIixcclxuICAgIFwiYXJcIjogXCJBcmFiaWNcIixcclxuICAgIFwicHRcIjogXCJQb3J0dWd1ZXNlXCIsXHJcbiAgICBcImJuXCI6IFwiQmVuZ2FsaVwiLFxyXG4gICAgXCJydVwiOiBcIlJ1c3NpYW5cIixcclxuICAgIFwiamFcIjogXCJKYXBhbmVzZVwiLFxyXG4gICAgXCJqdlwiOiBcIkphdmFuZXNlXCIsXHJcbiAgICBcImRlXCI6IFwiR2VybWFuXCIsXHJcbiAgICBcImFsbFwiIDogXCJTaG93IEFsbFwiXHJcbn07XHJcblxyXG5Db250ZW50QXJlbmEuTGFuZ3VhZ2VzLkxvbmcgPSB7XHJcbiAgICBcImFhXCI6IFwiQWZhclwiLFxyXG4gICAgXCJhZlwiOiBcIkFmcmlrYWFuc1wiLFxyXG4gICAgXCJhaW5cIjogXCJBaW51XCIsXHJcbiAgICBcImFrelwiOiBcIkFsYWJhbWFcIixcclxuICAgIFwic3FcIjogXCJBbGJhbmlhblwiLFxyXG4gICAgXCJhbGVcIjogXCJBbGV1dFwiLFxyXG4gICAgXCJhcnFcIjogXCJBbGdlcmlhbiBBcmFiaWNcIixcclxuICAgIFwiZW5fVVNcIjogXCJBbWVyaWNhbiBFbmdsaXNoXCIsXHJcbiAgICBcImFzZVwiOiBcIkFtZXJpY2FuIFNpZ24gTGFuZ3VhZ2VcIixcclxuICAgIFwiYW1cIjogXCJBbWhhcmljXCIsXHJcbiAgICBcImVneVwiOiBcIkFuY2llbnQgRWd5cHRpYW5cIixcclxuICAgIFwiZ3JjXCI6IFwiQW5jaWVudCBHcmVla1wiLFxyXG4gICAgXCJhclwiOiBcIkFyYWJpY1wiLFxyXG4gICAgXCJhcmNcIjogXCJBcmFtYWljXCIsXHJcbiAgICBcImFycFwiOiBcIkFyYXBhaG9cIixcclxuICAgIFwiYXJ3XCI6IFwiQXJhd2FrXCIsXHJcbiAgICBcImh5XCI6IFwiQXJtZW5pYW5cIixcclxuICAgIFwiYXNcIjogXCJBc3NhbWVzZVwiLFxyXG4gICAgXCJhc2FcIjogXCJBc3VcIixcclxuICAgIFwiZW5fQVVcIjogXCJBdXN0cmFsaWFuIEVuZ2xpc2hcIixcclxuICAgIFwiZGVfQVRcIjogXCJBdXN0cmlhbiBHZXJtYW5cIixcclxuICAgIFwiYXlcIjogXCJBeW1hcmFcIixcclxuICAgIFwiYXpcIjogXCJBemVyYmFpamFuaVwiLFxyXG4gICAgXCJiYW5cIjogXCJCYWxpbmVzZVwiLFxyXG4gICAgXCJldVwiOiBcIkJhc3F1ZVwiLFxyXG4gICAgXCJiYXJcIjogXCJCYXZhcmlhblwiLFxyXG4gICAgXCJiZVwiOiBcIkJlbGFydXNpYW5cIixcclxuICAgIFwiYm5cIjogXCJCZW5nYWxpXCIsXHJcbiAgICBcImJpa1wiOiBcIkJpa29sXCIsXHJcbiAgICBcImJpblwiOiBcIkJpbmlcIixcclxuICAgIFwiYnNcIjogXCJCb3NuaWFuXCIsXHJcbiAgICBcImJyaFwiOiBcIkJyYWh1aVwiLFxyXG4gICAgXCJicmFcIjogXCJCcmFqXCIsXHJcbiAgICBcInB0X0JSXCI6IFwiQnJhemlsaWFuIFBvcnR1Z3Vlc2VcIixcclxuICAgIFwiYnJcIjogXCJCcmV0b25cIixcclxuICAgIFwiZW5fR0JcIjogXCJCcml0aXNoIEVuZ2xpc2hcIixcclxuICAgIFwiYmdcIjogXCJCdWxnYXJpYW5cIixcclxuICAgIFwibXlcIjogXCJCdXJtZXNlXCIsXHJcbiAgICBcImZyY1wiOiBcIkNhanVuIEZyZW5jaFwiLFxyXG4gICAgXCJlbl9DQVwiOiBcIkNhbmFkaWFuIEVuZ2xpc2hcIixcclxuICAgIFwiZnJfQ0FcIjogXCJDYW5hZGlhbiBGcmVuY2hcIixcclxuICAgIFwieXVlXCI6IFwiQ2FudG9uZXNlXCIsXHJcbiAgICBcImNhclwiOiBcIkNhcmliXCIsXHJcbiAgICBcImNhXCI6IFwiQ2F0YWxhblwiLFxyXG4gICAgXCJjYXlcIjogXCJDYXl1Z2FcIixcclxuICAgIFwiY2ViXCI6IFwiQ2VidWFub1wiLFxyXG4gICAgXCJzaHVcIjogXCJDaGFkaWFuIEFyYWJpY1wiLFxyXG4gICAgXCJjZVwiOiBcIkNoZWNoZW5cIixcclxuICAgIFwiY2hyXCI6IFwiQ2hlcm9rZWVcIixcclxuICAgIFwicXVnXCI6IFwiQ2hpbWJvcmF6byBIaWdobGFuZCBRdWljaHVhXCIsXHJcbiAgICBcInpoXCI6IFwiQ2hpbmVzZVwiLFxyXG4gICAgXCJjaG5cIjogXCJDaGlub29rIEphcmdvblwiLFxyXG4gICAgXCJjaHBcIjogXCJDaGlwZXd5YW5cIixcclxuICAgIFwiY2hvXCI6IFwiQ2hvY3Rhd1wiLFxyXG4gICAgXCJjdVwiOiBcIkNodXJjaCBTbGF2aWNcIixcclxuICAgIFwiY3ZcIjogXCJDaHV2YXNoXCIsXHJcbiAgICBcIm53Y1wiOiBcIkNsYXNzaWNhbCBOZXdhcmlcIixcclxuICAgIFwic3ljXCI6IFwiQ2xhc3NpY2FsIFN5cmlhY1wiLFxyXG4gICAgXCJzd2NcIjogXCJDb25nbyBTd2FoaWxpXCIsXHJcbiAgICBcImNvcFwiOiBcIkNvcHRpY1wiLFxyXG4gICAgXCJrd1wiOiBcIkNvcm5pc2hcIixcclxuICAgIFwiY29cIjogXCJDb3JzaWNhblwiLFxyXG4gICAgXCJjclwiOiBcIkNyZWVcIixcclxuICAgIFwibXVzXCI6IFwiQ3JlZWtcIixcclxuICAgIFwiY3JoXCI6IFwiQ3JpbWVhbiBUdXJraXNoXCIsXHJcbiAgICBcImhyXCI6IFwiQ3JvYXRpYW5cIixcclxuICAgIFwiY3NcIjogXCJDemVjaFwiLFxyXG4gICAgXCJkYWtcIjogXCJEYWtvdGFcIixcclxuICAgIFwiZGFcIjogXCJEYW5pc2hcIixcclxuICAgIFwiZGVsXCI6IFwiRGVsYXdhcmVcIixcclxuICAgIFwibmxcIjogXCJEdXRjaFwiLFxyXG4gICAgXCJmcnNcIjogXCJFYXN0ZXJuIEZyaXNpYW5cIixcclxuICAgIFwiYXJ6XCI6IFwiRWd5cHRpYW4gQXJhYmljXCIsXHJcbiAgICBcImVuXCI6IFwiRW5nbGlzaFwiLFxyXG4gICAgXCJlb1wiOiBcIkVzcGVyYW50b1wiLFxyXG4gICAgXCJldFwiOiBcIkVzdG9uaWFuXCIsXHJcbiAgICBcInB0X1BUXCI6IFwiRXVyb3BlYW4gUG9ydHVndWVzZVwiLFxyXG4gICAgXCJlc19FU1wiOiBcIkV1cm9wZWFuIFNwYW5pc2hcIixcclxuICAgIFwiZWVcIjogXCJFd2VcIixcclxuICAgIFwiZmFuXCI6IFwiRmFuZ1wiLFxyXG4gICAgXCJoaWZcIjogXCJGaWppIEhpbmRpXCIsXHJcbiAgICBcImZqXCI6IFwiRmlqaWFuXCIsXHJcbiAgICBcImZpbFwiOiBcIkZpbGlwaW5vXCIsXHJcbiAgICBcImZpXCI6IFwiRmlubmlzaFwiLFxyXG4gICAgXCJubF9CRVwiOiBcIkZsZW1pc2hcIixcclxuICAgIFwiZm9uXCI6IFwiRm9uXCIsXHJcbiAgICBcImZyXCI6IFwiRnJlbmNoXCIsXHJcbiAgICBcImdhYVwiOiBcIkdhXCIsXHJcbiAgICBcImdhblwiOiBcIkdhbiBDaGluZXNlXCIsXHJcbiAgICBcImthXCI6IFwiR2VvcmdpYW5cIixcclxuICAgIFwiZGVcIjogXCJHZXJtYW5cIixcclxuICAgIFwiZ290XCI6IFwiR290aGljXCIsXHJcbiAgICBcImdyYlwiOiBcIkdyZWJvXCIsXHJcbiAgICBcImVsXCI6IFwiR3JlZWtcIixcclxuICAgIFwiZ25cIjogXCJHdWFyYW5pXCIsXHJcbiAgICBcImd1XCI6IFwiR3VqYXJhdGlcIixcclxuICAgIFwiZ3V6XCI6IFwiR3VzaWlcIixcclxuICAgIFwiaGFpXCI6IFwiSGFpZGFcIixcclxuICAgIFwiaHRcIjogXCJIYWl0aWFuXCIsXHJcbiAgICBcImhha1wiOiBcIkhha2thIENoaW5lc2VcIixcclxuICAgIFwiaGFcIjogXCJIYXVzYVwiLFxyXG4gICAgXCJoYXdcIjogXCJIYXdhaWlhblwiLFxyXG4gICAgXCJoZVwiOiBcIkhlYnJld1wiLFxyXG4gICAgXCJoelwiOiBcIkhlcmVyb1wiLFxyXG4gICAgXCJoaVwiOiBcIkhpbmRpXCIsXHJcbiAgICBcImhpdFwiOiBcIkhpdHRpdGVcIixcclxuICAgIFwiaG1uXCI6IFwiSG1vbmdcIixcclxuICAgIFwiaHVcIjogXCJIdW5nYXJpYW5cIixcclxuICAgIFwiaXNcIjogXCJJY2VsYW5kaWNcIixcclxuICAgIFwiaW9cIjogXCJJZG9cIixcclxuICAgIFwiaWdcIjogXCJJZ2JvXCIsXHJcbiAgICBcIml1XCI6IFwiSW51a3RpdHV0XCIsXHJcbiAgICBcImlrXCI6IFwiSW51cGlhcVwiLFxyXG4gICAgXCJnYVwiOiBcIklyaXNoXCIsXHJcbiAgICBcIml0XCI6IFwiSXRhbGlhblwiLFxyXG4gICAgXCJqYW1cIjogXCJKYW1haWNhbiBDcmVvbGUgRW5nbGlzaFwiLFxyXG4gICAgXCJqYVwiOiBcIkphcGFuZXNlXCIsXHJcbiAgICBcImp2XCI6IFwiSmF2YW5lc2VcIixcclxuICAgIFwia2FqXCI6IFwiSmp1XCIsXHJcbiAgICBcImR5b1wiOiBcIkpvbGEtRm9ueWlcIixcclxuICAgIFwieGFsXCI6IFwiS2FsbXlrXCIsXHJcbiAgICBcImthbVwiOiBcIkthbWJhXCIsXHJcbiAgICBcImtibFwiOiBcIkthbmVtYnVcIixcclxuICAgIFwia25cIjogXCJLYW5uYWRhXCIsXHJcbiAgICBcImtyXCI6IFwiS2FudXJpXCIsXHJcbiAgICBcImthYVwiOiBcIkthcmEtS2FscGFrXCIsXHJcbiAgICBcImtyY1wiOiBcIkthcmFjaGF5LUJhbGthclwiLFxyXG4gICAgXCJrcmxcIjogXCJLYXJlbGlhblwiLFxyXG4gICAgXCJrc1wiOiBcIkthc2htaXJpXCIsXHJcbiAgICBcImNzYlwiOiBcIkthc2h1YmlhblwiLFxyXG4gICAgXCJrYXdcIjogXCJLYXdpXCIsXHJcbiAgICBcImtrXCI6IFwiS2F6YWtoXCIsXHJcbiAgICBcImtlblwiOiBcIktlbnlhbmdcIixcclxuICAgIFwia2hhXCI6IFwiS2hhc2lcIixcclxuICAgIFwia21cIjogXCJLaG1lclwiLFxyXG4gICAgXCJraG9cIjogXCJLaG90YW5lc2VcIixcclxuICAgIFwia2h3XCI6IFwiS2hvd2FyXCIsXHJcbiAgICBcImtpXCI6IFwiS2lrdXl1XCIsXHJcbiAgICBcImttYlwiOiBcIktpbWJ1bmR1XCIsXHJcbiAgICBcImtyalwiOiBcIktpbmFyYXktYVwiLFxyXG4gICAgXCJyd1wiOiBcIktpbnlhcndhbmRhXCIsXHJcbiAgICBcImtpdVwiOiBcIktpcm1hbmpraVwiLFxyXG4gICAgXCJ0bGhcIjogXCJLbGluZ29uXCIsXHJcbiAgICBcImJrbVwiOiBcIktvbVwiLFxyXG4gICAgXCJrdlwiOiBcIktvbWlcIixcclxuICAgIFwia29pXCI6IFwiS29taS1QZXJteWFrXCIsXHJcbiAgICBcImtnXCI6IFwiS29uZ29cIixcclxuICAgIFwia29rXCI6IFwiS29ua2FuaVwiLFxyXG4gICAgXCJrb1wiOiBcIktvcmVhblwiLFxyXG4gICAgXCJrZm9cIjogXCJLb3JvXCIsXHJcbiAgICBcImtvc1wiOiBcIktvc3JhZWFuXCIsXHJcbiAgICBcImF2a1wiOiBcIktvdGF2YVwiLFxyXG4gICAgXCJraHFcIjogXCJLb3lyYSBDaGlpbmlcIixcclxuICAgIFwic2VzXCI6IFwiS295cmFib3JvIFNlbm5pXCIsXHJcbiAgICBcImtwZVwiOiBcIktwZWxsZVwiLFxyXG4gICAgXCJrcmlcIjogXCJLcmlvXCIsXHJcbiAgICBcImtqXCI6IFwiS3VhbnlhbWFcIixcclxuICAgIFwia3VtXCI6IFwiS3VteWtcIixcclxuICAgIFwia3VcIjogXCJLdXJkaXNoXCIsXHJcbiAgICBcImtydVwiOiBcIkt1cnVraFwiLFxyXG4gICAgXCJrdXRcIjogXCJLdXRlbmFpXCIsXHJcbiAgICBcIm5tZ1wiOiBcIkt3YXNpb1wiLFxyXG4gICAgXCJreVwiOiBcIkt5cmd5elwiLFxyXG4gICAgXCJxdWNcIjogXCJLXFx1MDJiY2ljaGVcXHUwMmJjXCIsXHJcbiAgICBcImxhZFwiOiBcIkxhZGlub1wiLFxyXG4gICAgXCJsYWhcIjogXCJMYWhuZGFcIixcclxuICAgIFwibGt0XCI6IFwiTGFrb3RhXCIsXHJcbiAgICBcImxhbVwiOiBcIkxhbWJhXCIsXHJcbiAgICBcImxhZ1wiOiBcIkxhbmdpXCIsXHJcbiAgICBcImxvXCI6IFwiTGFvXCIsXHJcbiAgICBcImx0Z1wiOiBcIkxhdGdhbGlhblwiLFxyXG4gICAgXCJsYVwiOiBcIkxhdGluXCIsXHJcbiAgICBcImVzXzQxOVwiOiBcIkxhdGluIEFtZXJpY2FuIFNwYW5pc2hcIixcclxuICAgIFwibHZcIjogXCJMYXR2aWFuXCIsXHJcbiAgICBcImx6elwiOiBcIkxhelwiLFxyXG4gICAgXCJsZXpcIjogXCJMZXpnaGlhblwiLFxyXG4gICAgXCJsaWpcIjogXCJMaWd1cmlhblwiLFxyXG4gICAgXCJsaVwiOiBcIkxpbWJ1cmdpc2hcIixcclxuICAgIFwibG5cIjogXCJMaW5nYWxhXCIsXHJcbiAgICBcImxmblwiOiBcIkxpbmd1YSBGcmFuY2EgTm92YVwiLFxyXG4gICAgXCJsemhcIjogXCJMaXRlcmFyeSBDaGluZXNlXCIsXHJcbiAgICBcImx0XCI6IFwiTGl0aHVhbmlhblwiLFxyXG4gICAgXCJsaXZcIjogXCJMaXZvbmlhblwiLFxyXG4gICAgXCJqYm9cIjogXCJMb2piYW5cIixcclxuICAgIFwibG1vXCI6IFwiTG9tYmFyZFwiLFxyXG4gICAgXCJuZHNcIjogXCJMb3cgR2VybWFuXCIsXHJcbiAgICBcInNsaVwiOiBcIkxvd2VyIFNpbGVzaWFuXCIsXHJcbiAgICBcImRzYlwiOiBcIkxvd2VyIFNvcmJpYW5cIixcclxuICAgIFwibG96XCI6IFwiTG96aVwiLFxyXG4gICAgXCJsdVwiOiBcIkx1YmEtS2F0YW5nYVwiLFxyXG4gICAgXCJsdWFcIjogXCJMdWJhLUx1bHVhXCIsXHJcbiAgICBcImx1aVwiOiBcIkx1aXNlbm9cIixcclxuICAgIFwic21qXCI6IFwiTHVsZSBTYW1pXCIsXHJcbiAgICBcImx1blwiOiBcIkx1bmRhXCIsXHJcbiAgICBcImx1b1wiOiBcIkx1b1wiLFxyXG4gICAgXCJsYlwiOiBcIkx1eGVtYm91cmdpc2hcIixcclxuICAgIFwibHV5XCI6IFwiTHV5aWFcIixcclxuICAgIFwibWRlXCI6IFwiTWFiYVwiLFxyXG4gICAgXCJta1wiOiBcIk1hY2Vkb25pYW5cIixcclxuICAgIFwiam1jXCI6IFwiTWFjaGFtZVwiLFxyXG4gICAgXCJtYWRcIjogXCJNYWR1cmVzZVwiLFxyXG4gICAgXCJtYWZcIjogXCJNYWZhXCIsXHJcbiAgICBcIm1hZ1wiOiBcIk1hZ2FoaVwiLFxyXG4gICAgXCJ2bWZcIjogXCJNYWluLUZyYW5jb25pYW5cIixcclxuICAgIFwibWFpXCI6IFwiTWFpdGhpbGlcIixcclxuICAgIFwibWFrXCI6IFwiTWFrYXNhclwiLFxyXG4gICAgXCJtZ2hcIjogXCJNYWtodXdhLU1lZXR0b1wiLFxyXG4gICAgXCJrZGVcIjogXCJNYWtvbmRlXCIsXHJcbiAgICBcIm1nXCI6IFwiTWFsYWdhc3lcIixcclxuICAgIFwibXNcIjogXCJNYWxheVwiLFxyXG4gICAgXCJtbFwiOiBcIk1hbGF5YWxhbVwiLFxyXG4gICAgXCJtdFwiOiBcIk1hbHRlc2VcIixcclxuICAgIFwibW5jXCI6IFwiTWFuY2h1XCIsXHJcbiAgICBcIm1kclwiOiBcIk1hbmRhcmluXCIsXHJcbiAgICBcIm1hblwiOiBcIk1hbmRpbmdvXCIsXHJcbiAgICBcIm1uaVwiOiBcIk1hbmlwdXJpXCIsXHJcbiAgICBcImd2XCI6IFwiTWFueFwiLFxyXG4gICAgXCJtaVwiOiBcIk1hb3JpXCIsXHJcbiAgICBcImFyblwiOiBcIk1hcHVjaGVcIixcclxuICAgIFwibXJcIjogXCJNYXJhdGhpXCIsXHJcbiAgICBcImNobVwiOiBcIk1hcmlcIixcclxuICAgIFwibWhcIjogXCJNYXJzaGFsbGVzZVwiLFxyXG4gICAgXCJtd3JcIjogXCJNYXJ3YXJpXCIsXHJcbiAgICBcIm1hc1wiOiBcIk1hc2FpXCIsXHJcbiAgICBcIm16blwiOiBcIk1hemFuZGVyYW5pXCIsXHJcbiAgICBcImJ5dlwiOiBcIk1lZHVtYmFcIixcclxuICAgIFwibWVuXCI6IFwiTWVuZGVcIixcclxuICAgIFwibXd2XCI6IFwiTWVudGF3YWlcIixcclxuICAgIFwibWVyXCI6IFwiTWVydVwiLFxyXG4gICAgXCJtZ29cIjogXCJNZXRhXFx1MDJiY1wiLFxyXG4gICAgXCJlc19NWFwiOiBcIk1leGljYW4gU3BhbmlzaFwiLFxyXG4gICAgXCJtaWNcIjogXCJNaWNtYWNcIixcclxuICAgIFwiZHVtXCI6IFwiTWlkZGxlIER1dGNoXCIsXHJcbiAgICBcImVubVwiOiBcIk1pZGRsZSBFbmdsaXNoXCIsXHJcbiAgICBcImZybVwiOiBcIk1pZGRsZSBGcmVuY2hcIixcclxuICAgIFwiZ21oXCI6IFwiTWlkZGxlIEhpZ2ggR2VybWFuXCIsXHJcbiAgICBcIm1nYVwiOiBcIk1pZGRsZSBJcmlzaFwiLFxyXG4gICAgXCJuYW5cIjogXCJNaW4gTmFuIENoaW5lc2VcIixcclxuICAgIFwibWluXCI6IFwiTWluYW5na2FiYXVcIixcclxuICAgIFwieG1mXCI6IFwiTWluZ3JlbGlhblwiLFxyXG4gICAgXCJtd2xcIjogXCJNaXJhbmRlc2VcIixcclxuICAgIFwibHVzXCI6IFwiTWl6b1wiLFxyXG4gICAgXCJhcl8wMDFcIjogXCJNb2Rlcm4gU3RhbmRhcmQgQXJhYmljXCIsXHJcbiAgICBcIm1vaFwiOiBcIk1vaGF3a1wiLFxyXG4gICAgXCJtZGZcIjogXCJNb2tzaGFcIixcclxuICAgIFwicm9fTURcIjogXCJNb2xkYXZpYW5cIixcclxuICAgIFwibG9sXCI6IFwiTW9uZ29cIixcclxuICAgIFwibW5cIjogXCJNb25nb2xpYW5cIixcclxuICAgIFwibWZlXCI6IFwiTW9yaXN5ZW5cIixcclxuICAgIFwiYXJ5XCI6IFwiTW9yb2NjYW4gQXJhYmljXCIsXHJcbiAgICBcIm1vc1wiOiBcIk1vc3NpXCIsXHJcbiAgICBcIm11bFwiOiBcIk11bHRpcGxlIExhbmd1YWdlc1wiLFxyXG4gICAgXCJtdWFcIjogXCJNdW5kYW5nXCIsXHJcbiAgICBcInR0dFwiOiBcIk11c2xpbSBUYXRcIixcclxuICAgIFwibXllXCI6IFwiTXllbmVcIixcclxuICAgIFwibmFxXCI6IFwiTmFtYVwiLFxyXG4gICAgXCJuYVwiOiBcIk5hdXJ1XCIsXHJcbiAgICBcIm52XCI6IFwiTmF2YWpvXCIsXHJcbiAgICBcIm5nXCI6IFwiTmRvbmdhXCIsXHJcbiAgICBcIm5hcFwiOiBcIk5lYXBvbGl0YW5cIixcclxuICAgIFwibmVcIjogXCJOZXBhbGlcIixcclxuICAgIFwibmV3XCI6IFwiTmV3YXJpXCIsXHJcbiAgICBcInNiYVwiOiBcIk5nYW1iYXlcIixcclxuICAgIFwibm5oXCI6IFwiTmdpZW1ib29uXCIsXHJcbiAgICBcImpnb1wiOiBcIk5nb21iYVwiLFxyXG4gICAgXCJ5cmxcIjogXCJOaGVlbmdhdHVcIixcclxuICAgIFwibmlhXCI6IFwiTmlhc1wiLFxyXG4gICAgXCJuaXVcIjogXCJOaXVlYW5cIixcclxuICAgIFwienh4XCI6IFwiTm8gbGluZ3Vpc3RpYyBjb250ZW50XCIsXHJcbiAgICBcIm5vZ1wiOiBcIk5vZ2FpXCIsXHJcbiAgICBcIm5kXCI6IFwiTm9ydGggTmRlYmVsZVwiLFxyXG4gICAgXCJmcnJcIjogXCJOb3J0aGVybiBGcmlzaWFuXCIsXHJcbiAgICBcInNlXCI6IFwiTm9ydGhlcm4gU2FtaVwiLFxyXG4gICAgXCJuc29cIjogXCJOb3J0aGVybiBTb3Rob1wiLFxyXG4gICAgXCJub1wiOiBcIk5vcndlZ2lhblwiLFxyXG4gICAgXCJuYlwiOiBcIk5vcndlZ2lhbiBCb2ttXFx1MDBlNWxcIixcclxuICAgIFwibm5cIjogXCJOb3J3ZWdpYW4gTnlub3Jza1wiLFxyXG4gICAgXCJub3ZcIjogXCJOb3ZpYWxcIixcclxuICAgIFwibnVzXCI6IFwiTnVlclwiLFxyXG4gICAgXCJueW1cIjogXCJOeWFtd2V6aVwiLFxyXG4gICAgXCJueVwiOiBcIk55YW5qYVwiLFxyXG4gICAgXCJueW5cIjogXCJOeWFua29sZVwiLFxyXG4gICAgXCJ0b2dcIjogXCJOeWFzYSBUb25nYVwiLFxyXG4gICAgXCJueW9cIjogXCJOeW9yb1wiLFxyXG4gICAgXCJuemlcIjogXCJOemltYVwiLFxyXG4gICAgXCJucW9cIjogXCJOXFx1MDJiY0tvXCIsXHJcbiAgICBcIm9jXCI6IFwiT2NjaXRhblwiLFxyXG4gICAgXCJvalwiOiBcIk9qaWJ3YVwiLFxyXG4gICAgXCJhbmdcIjogXCJPbGQgRW5nbGlzaFwiLFxyXG4gICAgXCJmcm9cIjogXCJPbGQgRnJlbmNoXCIsXHJcbiAgICBcImdvaFwiOiBcIk9sZCBIaWdoIEdlcm1hblwiLFxyXG4gICAgXCJzZ2FcIjogXCJPbGQgSXJpc2hcIixcclxuICAgIFwibm9uXCI6IFwiT2xkIE5vcnNlXCIsXHJcbiAgICBcInBlb1wiOiBcIk9sZCBQZXJzaWFuXCIsXHJcbiAgICBcInByb1wiOiBcIk9sZCBQcm92ZW5cXHUwMGU3YWxcIixcclxuICAgIFwib3JcIjogXCJPcml5YVwiLFxyXG4gICAgXCJvbVwiOiBcIk9yb21vXCIsXHJcbiAgICBcIm9zYVwiOiBcIk9zYWdlXCIsXHJcbiAgICBcIm9zXCI6IFwiT3NzZXRpY1wiLFxyXG4gICAgXCJvdGFcIjogXCJPdHRvbWFuIFR1cmtpc2hcIixcclxuICAgIFwicGFsXCI6IFwiUGFobGF2aVwiLFxyXG4gICAgXCJwZmxcIjogXCJQYWxhdGluZSBHZXJtYW5cIixcclxuICAgIFwicGF1XCI6IFwiUGFsYXVhblwiLFxyXG4gICAgXCJwaVwiOiBcIlBhbGlcIixcclxuICAgIFwicGRjXCI6IFwiUGVubnN5bHZhbmlhIEdlcm1hblwiLFxyXG4gICAgXCJmYVwiOiBcIlBlcnNpYW5cIixcclxuICAgIFwicGhuXCI6IFwiUGhvZW5pY2lhblwiLFxyXG4gICAgXCJwY2RcIjogXCJQaWNhcmRcIixcclxuICAgIFwicG1zXCI6IFwiUGllZG1vbnRlc2VcIixcclxuICAgIFwicGR0XCI6IFwiUGxhdXRkaWV0c2NoXCIsXHJcbiAgICBcInBvblwiOiBcIlBvaG5wZWlhblwiLFxyXG4gICAgXCJwbFwiOiBcIlBvbGlzaFwiLFxyXG4gICAgXCJwbnRcIjogXCJQb250aWNcIixcclxuICAgIFwicHRcIjogXCJQb3J0dWd1ZXNlXCIsXHJcbiAgICBcInByZ1wiOiBcIlBydXNzaWFuXCIsXHJcbiAgICBcInBhXCI6IFwiUHVuamFiaVwiLFxyXG4gICAgXCJxdVwiOiBcIlF1ZWNodWFcIixcclxuICAgIFwicm9cIjogXCJSb21hbmlhblwiLFxyXG4gICAgXCJybVwiOiBcIlJvbWFuc2hcIixcclxuICAgIFwicm9tXCI6IFwiUm9tYW55XCIsXHJcbiAgICBcInJvb3RcIjogXCJSb290XCIsXHJcbiAgICBcInJ1XCI6IFwiUnVzc2lhblwiLFxyXG4gICAgXCJyd2tcIjogXCJSd2FcIixcclxuICAgIFwic2FoXCI6IFwiU2FraGFcIixcclxuICAgIFwic2FtXCI6IFwiU2FtYXJpdGFuIEFyYW1haWNcIixcclxuICAgIFwic21cIjogXCJTYW1vYW5cIixcclxuICAgIFwic2NvXCI6IFwiU2NvdHNcIixcclxuICAgIFwiZ2RcIjogXCJTY290dGlzaCBHYWVsaWNcIixcclxuICAgIFwic2x5XCI6IFwiU2VsYXlhclwiLFxyXG4gICAgXCJzZWxcIjogXCJTZWxrdXBcIixcclxuICAgIFwic2VoXCI6IFwiU2VuYVwiLFxyXG4gICAgXCJzZWVcIjogXCJTZW5lY2FcIixcclxuICAgIFwic3JcIjogXCJTZXJiaWFuXCIsXHJcbiAgICBcInNoXCI6IFwiU2VyYm8tQ3JvYXRpYW5cIixcclxuICAgIFwic3JyXCI6IFwiU2VyZXJcIixcclxuICAgIFwic2VpXCI6IFwiU2VyaVwiLFxyXG4gICAgXCJrc2JcIjogXCJTaGFtYmFsYVwiLFxyXG4gICAgXCJzaG5cIjogXCJTaGFuXCIsXHJcbiAgICBcInNuXCI6IFwiU2hvbmFcIixcclxuICAgIFwiaWlcIjogXCJTaWNodWFuIFlpXCIsXHJcbiAgICBcInNjblwiOiBcIlNpY2lsaWFuXCIsXHJcbiAgICBcInNpZFwiOiBcIlNpZGFtb1wiLFxyXG4gICAgXCJibGFcIjogXCJTaWtzaWthXCIsXHJcbiAgICBcInN6bFwiOiBcIlNpbGVzaWFuXCIsXHJcbiAgICBcInpoX0hhbnNcIjogXCJTaW1wbGlmaWVkIENoaW5lc2VcIixcclxuICAgIFwic2RcIjogXCJTaW5kaGlcIixcclxuICAgIFwic2lcIjogXCJTaW5oYWxhXCIsXHJcbiAgICBcInNtc1wiOiBcIlNrb2x0IFNhbWlcIixcclxuICAgIFwiZGVuXCI6IFwiU2xhdmVcIixcclxuICAgIFwic2tcIjogXCJTbG92YWtcIixcclxuICAgIFwic2xcIjogXCJTbG92ZW5pYW5cIixcclxuICAgIFwieG9nXCI6IFwiU29nYVwiLFxyXG4gICAgXCJzb2dcIjogXCJTb2dkaWVuXCIsXHJcbiAgICBcInNvXCI6IFwiU29tYWxpXCIsXHJcbiAgICBcInNua1wiOiBcIlNvbmlua2VcIixcclxuICAgIFwiY2tiXCI6IFwiU29yYW5pIEt1cmRpc2hcIixcclxuICAgIFwiYXpiXCI6IFwiU291dGggQXplcmJhaWphbmlcIixcclxuICAgIFwibnJcIjogXCJTb3V0aCBOZGViZWxlXCIsXHJcbiAgICBcImFsdFwiOiBcIlNvdXRoZXJuIEFsdGFpXCIsXHJcbiAgICBcInNtYVwiOiBcIlNvdXRoZXJuIFNhbWlcIixcclxuICAgIFwic3RcIjogXCJTb3V0aGVybiBTb3Rob1wiLFxyXG4gICAgXCJlc1wiOiBcIlNwYW5pc2hcIixcclxuICAgIFwic3JuXCI6IFwiU3JhbmFuIFRvbmdvXCIsXHJcbiAgICBcInpnaFwiOiBcIlN0YW5kYXJkIE1vcm9jY2FuIFRhbWF6aWdodFwiLFxyXG4gICAgXCJzdWtcIjogXCJTdWt1bWFcIixcclxuICAgIFwic3V4XCI6IFwiU3VtZXJpYW5cIixcclxuICAgIFwic3VcIjogXCJTdW5kYW5lc2VcIixcclxuICAgIFwic3VzXCI6IFwiU3VzdVwiLFxyXG4gICAgXCJzd1wiOiBcIlN3YWhpbGlcIixcclxuICAgIFwic3NcIjogXCJTd2F0aVwiLFxyXG4gICAgXCJzdlwiOiBcIlN3ZWRpc2hcIixcclxuICAgIFwiZnJfQ0hcIjogXCJTd2lzcyBGcmVuY2hcIixcclxuICAgIFwiZ3N3XCI6IFwiU3dpc3MgR2VybWFuXCIsXHJcbiAgICBcImRlX0NIXCI6IFwiU3dpc3MgSGlnaCBHZXJtYW5cIixcclxuICAgIFwic3lyXCI6IFwiU3lyaWFjXCIsXHJcbiAgICBcInNoaVwiOiBcIlRhY2hlbGhpdFwiLFxyXG4gICAgXCJ0bFwiOiBcIlRhZ2Fsb2dcIixcclxuICAgIFwidHlcIjogXCJUYWhpdGlhblwiLFxyXG4gICAgXCJkYXZcIjogXCJUYWl0YVwiLFxyXG4gICAgXCJ0Z1wiOiBcIlRhamlrXCIsXHJcbiAgICBcInRseVwiOiBcIlRhbHlzaFwiLFxyXG4gICAgXCJ0bWhcIjogXCJUYW1hc2hla1wiLFxyXG4gICAgXCJ0YVwiOiBcIlRhbWlsXCIsXHJcbiAgICBcInRydlwiOiBcIlRhcm9rb1wiLFxyXG4gICAgXCJ0d3FcIjogXCJUYXNhd2FxXCIsXHJcbiAgICBcInR0XCI6IFwiVGF0YXJcIixcclxuICAgIFwidGVcIjogXCJUZWx1Z3VcIixcclxuICAgIFwidGVyXCI6IFwiVGVyZW5vXCIsXHJcbiAgICBcInRlb1wiOiBcIlRlc29cIixcclxuICAgIFwidGV0XCI6IFwiVGV0dW1cIixcclxuICAgIFwidGhcIjogXCJUaGFpXCIsXHJcbiAgICBcImJvXCI6IFwiVGliZXRhblwiLFxyXG4gICAgXCJ0aWdcIjogXCJUaWdyZVwiLFxyXG4gICAgXCJ0aVwiOiBcIlRpZ3JpbnlhXCIsXHJcbiAgICBcInRlbVwiOiBcIlRpbW5lXCIsXHJcbiAgICBcInRpdlwiOiBcIlRpdlwiLFxyXG4gICAgXCJ0bGlcIjogXCJUbGluZ2l0XCIsXHJcbiAgICBcInRwaVwiOiBcIlRvayBQaXNpblwiLFxyXG4gICAgXCJ0a2xcIjogXCJUb2tlbGF1XCIsXHJcbiAgICBcInRvXCI6IFwiVG9uZ2FuXCIsXHJcbiAgICBcImZpdFwiOiBcIlRvcm5lZGFsZW4gRmlubmlzaFwiLFxyXG4gICAgXCJ6aF9IYW50XCI6IFwiVHJhZGl0aW9uYWwgQ2hpbmVzZVwiLFxyXG4gICAgXCJ0a3JcIjogXCJUc2FraHVyXCIsXHJcbiAgICBcInRzZFwiOiBcIlRzYWtvbmlhblwiLFxyXG4gICAgXCJ0c2lcIjogXCJUc2ltc2hpYW5cIixcclxuICAgIFwidHNcIjogXCJUc29uZ2FcIixcclxuICAgIFwidG5cIjogXCJUc3dhbmFcIixcclxuICAgIFwidGN5XCI6IFwiVHVsdVwiLFxyXG4gICAgXCJ0dW1cIjogXCJUdW1idWthXCIsXHJcbiAgICBcImFlYlwiOiBcIlR1bmlzaWFuIEFyYWJpY1wiLFxyXG4gICAgXCJ0clwiOiBcIlR1cmtpc2hcIixcclxuICAgIFwidGtcIjogXCJUdXJrbWVuXCIsXHJcbiAgICBcInRydVwiOiBcIlR1cm95b1wiLFxyXG4gICAgXCJ0dmxcIjogXCJUdXZhbHVcIixcclxuICAgIFwidHl2XCI6IFwiVHV2aW5pYW5cIixcclxuICAgIFwidHdcIjogXCJUd2lcIixcclxuICAgIFwia2NnXCI6IFwiVHlhcFwiLFxyXG4gICAgXCJ1ZG1cIjogXCJVZG11cnRcIixcclxuICAgIFwidWdhXCI6IFwiVWdhcml0aWNcIixcclxuICAgIFwidWtcIjogXCJVa3JhaW5pYW5cIixcclxuICAgIFwidW1iXCI6IFwiVW1idW5kdVwiLFxyXG4gICAgXCJ1bmRcIjogXCJVbmtub3duIExhbmd1YWdlXCIsXHJcbiAgICBcImhzYlwiOiBcIlVwcGVyIFNvcmJpYW5cIixcclxuICAgIFwidXJcIjogXCJVcmR1XCIsXHJcbiAgICBcInVnXCI6IFwiVXlnaHVyXCIsXHJcbiAgICBcInV6XCI6IFwiVXpiZWtcIixcclxuICAgIFwidmFpXCI6IFwiVmFpXCIsXHJcbiAgICBcInZlXCI6IFwiVmVuZGFcIixcclxuICAgIFwidmVjXCI6IFwiVmVuZXRpYW5cIixcclxuICAgIFwidmVwXCI6IFwiVmVwc1wiLFxyXG4gICAgXCJ2aVwiOiBcIlZpZXRuYW1lc2VcIixcclxuICAgIFwidm9cIjogXCJWb2xhcFxcdTAwZmNrXCIsXHJcbiAgICBcInZyb1wiOiBcIlZcXHUwMGY1cm9cIixcclxuICAgIFwidm90XCI6IFwiVm90aWNcIixcclxuICAgIFwidnVuXCI6IFwiVnVuam9cIixcclxuICAgIFwid2FcIjogXCJXYWxsb29uXCIsXHJcbiAgICBcIndhZVwiOiBcIldhbHNlclwiLFxyXG4gICAgXCJ3YXJcIjogXCJXYXJheVwiLFxyXG4gICAgXCJ3YXNcIjogXCJXYXNob1wiLFxyXG4gICAgXCJndWNcIjogXCJXYXl1dVwiLFxyXG4gICAgXCJjeVwiOiBcIldlbHNoXCIsXHJcbiAgICBcInZsc1wiOiBcIldlc3QgRmxlbWlzaFwiLFxyXG4gICAgXCJmeVwiOiBcIldlc3Rlcm4gRnJpc2lhblwiLFxyXG4gICAgXCJtcmpcIjogXCJXZXN0ZXJuIE1hcmlcIixcclxuICAgIFwid2FsXCI6IFwiV29sYXl0dGFcIixcclxuICAgIFwid29cIjogXCJXb2xvZlwiLFxyXG4gICAgXCJ3dXVcIjogXCJXdSBDaGluZXNlXCIsXHJcbiAgICBcInhoXCI6IFwiWGhvc2FcIixcclxuICAgIFwiaHNuXCI6IFwiWGlhbmcgQ2hpbmVzZVwiLFxyXG4gICAgXCJ5YXZcIjogXCJZYW5nYmVuXCIsXHJcbiAgICBcInlhb1wiOiBcIllhb1wiLFxyXG4gICAgXCJ5YXBcIjogXCJZYXBlc2VcIixcclxuICAgIFwieWJiXCI6IFwiWWVtYmFcIixcclxuICAgIFwieWlcIjogXCJZaWRkaXNoXCIsXHJcbiAgICBcInlvXCI6IFwiWW9ydWJhXCIsXHJcbiAgICBcInphcFwiOiBcIlphcG90ZWNcIixcclxuICAgIFwiZGplXCI6IFwiWmFybWFcIixcclxuICAgIFwienphXCI6IFwiWmF6YVwiLFxyXG4gICAgXCJ6ZWFcIjogXCJaZWVsYW5kaWNcIixcclxuICAgIFwiemVuXCI6IFwiWmVuYWdhXCIsXHJcbiAgICBcInphXCI6IFwiWmh1YW5nXCIsXHJcbiAgICBcImdielwiOiBcIlpvcm9hc3RyaWFuIERhcmlcIixcclxuICAgIFwienVcIjogXCJadWx1XCIsXHJcbiAgICBcInp1blwiOiBcIlp1bmlcIlxyXG59XHJcblxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9jYS9jYS5kYXRhLmpzIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgSnVhbkNydXogb24gNC8xLzIwMTguXHJcbiAqL1xyXG5cclxuJChmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgd2luZG93LkNvbnRlbnRBcmVuYSA9IHdpbmRvdy5Db250ZW50QXJlbmEgfHwge307XHJcblxyXG4gICAgQ29udGVudEFyZW5hLk1vZGVsID0gQ29udGVudEFyZW5hLk1vZGVsIHx8IHt9O1xyXG5cclxuICAgIENvbnRlbnRBcmVuYS5Nb2RlbC5SaWdodFBhY2thZ2UgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIHRoaXMuaWQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5yaWdodHMgPSB7fTtcclxuICAgIH07XHJcblxyXG4gICAgQ29udGVudEFyZW5hLk1vZGVsLlJpZ2h0ID0gZnVuY3Rpb24oKXtcclxuICAgICAgICB0aGlzLmlkID0gbnVsbDtcclxuICAgICAgICB0aGlzLm5hbWUgPSBudWxsO1xyXG4gICAgICAgIHRoaXMucmlnaHRJdGVtcyA9IHt9O1xyXG4gICAgfTtcclxuXHJcbiAgICBDb250ZW50QXJlbmEuTW9kZWwuUmlnaHRJdGVtID0gZnVuY3Rpb24oKXtcclxuICAgICAgICB0aGlzLmlkID0gbnVsbDtcclxuICAgICAgICB0aGlzLm5hbWUgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuaW5wdXRzID0gW107XHJcbiAgICB9O1xyXG5cclxuICAgIENvbnRlbnRBcmVuYS5Nb2RlbC5TZWxlY3RlZFJpZ2h0ID0gZnVuY3Rpb24oKXtcclxuICAgICAgICB0aGlzLnJpZ2h0ID0gbnVsbDtcclxuICAgICAgICB0aGlzLnJpZ2h0SXRlbSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5ncm91cCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5pbnB1dHMgPSBbXTtcclxuICAgIH07XHJcblxyXG4gICAgQ29udGVudEFyZW5hLk1vZGVsLlNhbGVzUGFja2FnZSA9IGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgICAgIHRoaXMuc2FsZXNNZXRob2QgPSAgbnVsbDtcclxuICAgICAgICB0aGlzLmZlZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5jdXJyZW5jeSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5pZCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gbnVsbDtcclxuICAgICAgICB0aGlzLnRlcnJpdG9yaWVzID0gbnVsbDtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkVGVycml0b3JpZXMgPSBbXTtcclxuICAgICAgICB0aGlzLmV4Y2x1ZGVkVGVycml0b3JpZXMgPSBbXTtcclxuICAgICAgICB0aGlzLnRlcnJpdG9yeUJpZHMgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnNlbGxBc1BhY2thZ2UgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgdGhpcy52YWxpZGF0ZSA9ICgpID0+IHtcclxuXHJcbiAgICAgICAgICAgIHZhciBkZXNjcmlwdGlvbiA9IFwiU2FsZXMgUGFja2FnZSBcIiArIHRoaXMuaWQgKyBcIjogXCIsXHJcbiAgICAgICAgICAgICAgICBoYXNFcnJvcnMgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIGlmICggISB0aGlzLmN1cnJlbmN5ICkge1xyXG4gICAgICAgICAgICAgICAgaGFzRXJyb3JzID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uICs9IFwiQ3VycmVuY3kgY2FuJ3QgYmUgZW1wdHkuIFwiO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoICEgdGhpcy5mZWUgKSB7XHJcbiAgICAgICAgICAgICAgICBoYXNFcnJvcnMgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb24gKz0gXCJGZWUgY2FuJ3QgYmUgZW1wdHkuIFwiO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoICEgdGhpcy50ZXJyaXRvcmllcyApIHtcclxuICAgICAgICAgICAgICAgIGhhc0Vycm9ycyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbiArPSBcIlRlcnJpdG9yaWVzIGNhbid0IGJlIGVtcHR5LiBcIjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCAhIHRoaXMuc2FsZXNNZXRob2QgKSB7XHJcbiAgICAgICAgICAgICAgICBoYXNFcnJvcnMgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb24gKz0gXCJTYWxlcyBtZXRob2QgY2FuJ3QgYmUgZW1wdHkuIFwiO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgaGFzRXJyb3JzOiBoYXNFcnJvcnMsXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbiA6IGRlc2NyaXB0aW9uXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICBDb250ZW50QXJlbmEuTW9kZWwuQ29udGVudCA9IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICB0aGlzLnNwb3J0ID0ge307XHJcbiAgICAgICAgdGhpcy5zcG9ydHMgPSBbXTtcclxuICAgICAgICB0aGlzLnRvdXJuYW1lbnQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuY2F0ZWdvcnkgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuc2FsZXNQYWNrYWdlcyA9IHt9O1xyXG4gICAgICAgIHRoaXMuaW5zdGFsbG1lbnRzID0ge307XHJcblxyXG4gICAgICAgIHRoaXMuZ2V0VGl0bGUgPSAoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzKTtcclxuXHJcbiAgICAgICAgICAgIHZhciB0aXRsZSA9IFwiXCI7XHJcblxyXG4gICAgICAgICAgICBpZiAoIHRoaXMuc3BvcnRzLmxlbmd0aCA+IDAgKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3BvcnRzLmZvckVhY2goZnVuY3Rpb24gKHNwb3J0LCBpbmRleCwgYXJyYXkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZSArPSBzcG9ydC52YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIChpbmRleCsxKSAhPSBhcnJheS5sZW5ndGggKSB0aXRsZSArPSBcIiwgXCJcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgaWYgKCB0aGlzLnNwb3J0ICE9PSBudWxsICkgdGl0bGUgKz0gdGhpcy5zcG9ydC52YWx1ZTtcclxuICAgICAgICAgICAgaWYgKCB0aGlzLmNhdGVnb3J5ICE9PSBudWxsICkgdGl0bGUgKz0gXCIgLSBcIiArIHRoaXMuY2F0ZWdvcnkudmFsdWU7XHJcbiAgICAgICAgICAgIGlmICggdGhpcy50b3VybmFtZW50ICE9PSBudWxsICkgdGl0bGUgKz0gXCIgLSBcIiArIHRoaXMudG91cm5hbWVudC52YWx1ZTtcclxuXHJcbiAgICAgICAgICAgIGlmICggdGhpcy5zZWFzb25zICYmIHRoaXMuc2Vhc29ucy5sZW5ndGggPiAwKXtcclxuICAgICAgICAgICAgICAgIHRpdGxlICs9IFwiIFwiICsgdGhpcy5zZWFzb25zLm1hcCggKCBzZWFzb24gKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlcyA9IHNlYXNvbi52YWx1ZS5zcGxpdChcIiBcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlc1t2YWx1ZXMubGVuZ3RoIC0gMV1cclxuICAgICAgICAgICAgICAgIH0pLmpvaW4oXCIgLSBcIik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0aXRsZTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB3YXRjaCh0aGlzLCBcInNwb3J0c1wiLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlVwZGF0aW5nIHNwb3J0c1wiLCBhcmd1bWVudHMpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICB9O1xyXG5cclxufSk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L2NhL2NhLm1vZGVscy5qcyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IEp1YW5DcnV6IG9uIDQvMS8yMDE4LlxyXG4gKi9cclxuXHJcbndpbmRvdy5Db250ZW50QXJlbmEgPSB3aW5kb3cuQ29udGVudEFyZW5hIHx8IHt9O1xyXG5Db250ZW50QXJlbmEuVXRpbHMgPSB7XHJcblxyXG4gICAgY29udGVudFBhcnNlckZyb21TZXJ2ZXIoY29udGVudCkge1xyXG5cclxuICAgICAgICBpZiAoIGNvbnRlbnQucGFyc2VkICkgcmV0dXJuIGNvbnRlbnQ7XHJcblxyXG4gICAgICAgIGxldCBzb3J0ID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgaWYgKCBjb250ZW50LmV4dHJhRGF0YSl7XHJcbiAgICAgICAgICAgIE9iamVjdC5lbnRyaWVzKGNvbnRlbnQuZXh0cmFEYXRhKS5mb3JFYWNoKFxyXG4gICAgICAgICAgICAgICAgKFtrZXksIHZhbHVlXSkgPT4gY29udGVudFtrZXldID0gdmFsdWVcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnRlbnQudG91cm5hbWVudCA9IChjb250ZW50LnRvdXJuYW1lbnQpID8gQXJyYXkuaXNBcnJheShjb250ZW50LnRvdXJuYW1lbnQpPyBjb250ZW50LnRvdXJuYW1lbnQgOiBbY29udGVudC50b3VybmFtZW50XSA6IFtdO1xyXG4gICAgICAgIGNvbnRlbnQuc3BvcnRDYXRlZ29yeSA9IChjb250ZW50LnNwb3J0Q2F0ZWdvcnkpID8gQXJyYXkuaXNBcnJheShjb250ZW50LnNwb3J0Q2F0ZWdvcnkpPyBjb250ZW50LnNwb3J0Q2F0ZWdvcnkgOiBbY29udGVudC5zcG9ydENhdGVnb3J5XSA6IFtdO1xyXG5cclxuICAgICAgICBpZiAoY29udGVudC5zZWxlY3RlZFJpZ2h0c0J5U3VwZXJSaWdodCl7XHJcbiAgICAgICAgICAgIGNvbnRlbnQucmlnaHRzUGFja2FnZS5mb3JFYWNoKCAocnApID0+IHtcclxuICAgICAgICAgICAgICAgIHJwLnNlbGVjdGVkUmlnaHRzID0gY29udGVudC5zZWxlY3RlZFJpZ2h0c0J5U3VwZXJSaWdodFtycC5pZF1bJ2l0ZW1zJ107XHJcbiAgICAgICAgICAgICAgICBycC5leGNsdXNpdmUgPSBjb250ZW50LnNlbGVjdGVkUmlnaHRzQnlTdXBlclJpZ2h0W3JwLmlkXVsnZXhjbHVzaXZlJ107XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGNvbnRlbnQuZml4dHVyZXNCeVNlYXNvbil7XHJcbiAgICAgICAgICAgIGNvbnRlbnQuc2Vhc29ucy5mb3JFYWNoKCAocywgaSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcy5maXh0dXJlcyA9IGNvbnRlbnQuZml4dHVyZXNCeVNlYXNvbltpXVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICggY29udGVudC5zYWxlc1BhY2thZ2VzICkge1xyXG4gICAgICAgICAgICBjb250ZW50LnNhbGVzUGFja2FnZXMuZm9yRWFjaCgoc3ApID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChzcC5zYWxlc01ldGhvZCkgc3Auc2FsZXNNZXRob2QgPSBzcC5zYWxlc01ldGhvZC5uYW1lO1xyXG4gICAgICAgICAgICAgICAgaWYgKHNwLmV4Y2x1ZGVkQ291bnRyaWVzKSBzcC5leGNsdWRlZFRlcnJpdG9yaWVzID0gc3AuZXhjbHVkZWRDb3VudHJpZXMubWFwKHQ9PntyZXR1cm57bGFiZWw6dC5uYW1lLCB2YWx1ZTp0Lm5hbWV9fSlcclxuICAgICAgICAgICAgICAgIGlmIChzcC50ZXJyaXRvcmllcykgc3AudGVycml0b3JpZXMgPSBzcC50ZXJyaXRvcmllcy5tYXAodD0+e3JldHVybntsYWJlbDp0Lm5hbWUsIHZhbHVlOnQubmFtZX19KVxyXG4gICAgICAgICAgICAgICAgaWYgKCFzcC50ZXJyaXRvcmllcykgc29ydCA9IGZhbHNlXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBpZiAoc29ydCkgY29udGVudC5zYWxlc1BhY2thZ2VzLnNvcnQodGhpcy5zb3J0U2FsZXNQYWNrYWdlcykucmV2ZXJzZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb250ZW50LnN0ZXAgPSBOdW1iZXIoY29udGVudC5zdGVwKTtcclxuICAgICAgICBjb250ZW50LnBhcnNlZCA9IHRydWU7XHJcblxyXG4gICAgICAgIHJldHVybiBjb250ZW50O1xyXG4gICAgfSxcclxuXHJcbiAgICBzb3J0U2FsZXNQYWNrYWdlcyAoYSwgYil7XHJcbiAgICAgICAgbGV0IGMgPSAoYSwgYikgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gKGEgPiBiKSA/IDEgOiAoKGIgPiBhKSA/IC0xIDogMClcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiBjKGEudGVycml0b3JpZXMubGVuZ3RoLCBiLnRlcnJpdG9yaWVzLmxlbmd0aCkgfHwgYyhiLm5hbWUsIGEubmFtZSk7XHJcbiAgICB9LFxyXG5cclxuXHJcblxyXG4gICAgaXNBUElBdmFpbGFibGUoKSB7XHJcbiAgICAgICAgLy8gQ2hlY2sgZm9yIHRoZSB2YXJpb3VzIEZpbGUgQVBJIHN1cHBvcnQuXHJcbiAgICAgICAgaWYgKHdpbmRvdy5GaWxlICYmIHdpbmRvdy5GaWxlUmVhZGVyICYmIHdpbmRvdy5GaWxlTGlzdCAmJiB3aW5kb3cuQmxvYikge1xyXG4gICAgICAgICAgICAvLyBHcmVhdCBzdWNjZXNzISBBbGwgdGhlIEZpbGUgQVBJcyBhcmUgc3VwcG9ydGVkLlxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBzb3VyY2U6IEZpbGUgQVBJIGF2YWlsYWJpbGl0eSAtIGh0dHA6Ly9jYW5pdXNlLmNvbS8jZmVhdD1maWxlYXBpXHJcbiAgICAgICAgICAgIC8vIHNvdXJjZTogPG91dHB1dD4gYXZhaWxhYmlsaXR5IC0gaHR0cDovL2h0bWw1ZG9jdG9yLmNvbS90aGUtb3V0cHV0LWVsZW1lbnQvXHJcbiAgICAgICAgICAgIGRvY3VtZW50LndyaXRlbG4oJ1RoZSBIVE1MNSBBUElzIHVzZWQgaW4gdGhpcyBmb3JtIGFyZSBvbmx5IGF2YWlsYWJsZSBpbiB0aGUgZm9sbG93aW5nIGJyb3dzZXJzOjxiciAvPicpO1xyXG4gICAgICAgICAgICAvLyA2LjAgRmlsZSBBUEkgJiAxMy4wIDxvdXRwdXQ+XHJcbiAgICAgICAgICAgIGRvY3VtZW50LndyaXRlbG4oJyAtIEdvb2dsZSBDaHJvbWU6IDEzLjAgb3IgbGF0ZXI8YnIgLz4nKTtcclxuICAgICAgICAgICAgLy8gMy42IEZpbGUgQVBJICYgNi4wIDxvdXRwdXQ+XHJcbiAgICAgICAgICAgIGRvY3VtZW50LndyaXRlbG4oJyAtIE1vemlsbGEgRmlyZWZveDogNi4wIG9yIGxhdGVyPGJyIC8+Jyk7XHJcbiAgICAgICAgICAgIC8vIDEwLjAgRmlsZSBBUEkgJiAxMC4wIDxvdXRwdXQ+XHJcbiAgICAgICAgICAgIGRvY3VtZW50LndyaXRlbG4oJyAtIEludGVybmV0IEV4cGxvcmVyOiBOb3Qgc3VwcG9ydGVkIChwYXJ0aWFsIHN1cHBvcnQgZXhwZWN0ZWQgaW4gMTAuMCk8YnIgLz4nKTtcclxuICAgICAgICAgICAgLy8gPyBGaWxlIEFQSSAmIDUuMSA8b3V0cHV0PlxyXG4gICAgICAgICAgICBkb2N1bWVudC53cml0ZWxuKCcgLSBTYWZhcmk6IE5vdCBzdXBwb3J0ZWQ8YnIgLz4nKTtcclxuICAgICAgICAgICAgLy8gPyBGaWxlIEFQSSAmIDkuMiA8b3V0cHV0PlxyXG4gICAgICAgICAgICBkb2N1bWVudC53cml0ZWxuKCcgLSBPcGVyYTogTm90IHN1cHBvcnRlZCcpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGFkZE9yZGluYWwobikge1xyXG4gICAgICAgIHZhciBzdHIgPSBuLnRvU3RyaW5nKCkuc2xpY2UoLTEpLFxyXG4gICAgICAgICAgICBvcmQgPSAnJztcclxuICAgICAgICBzd2l0Y2ggKHN0cikge1xyXG4gICAgICAgICAgICBjYXNlICcxJzpcclxuICAgICAgICAgICAgICAgIG9yZCA9ICdzdCc7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnMic6XHJcbiAgICAgICAgICAgICAgICBvcmQgPSAnbmQnO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJzMnOlxyXG4gICAgICAgICAgICAgICAgb3JkID0gJ3JkJztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICc0JzpcclxuICAgICAgICAgICAgY2FzZSAnNSc6XHJcbiAgICAgICAgICAgIGNhc2UgJzYnOlxyXG4gICAgICAgICAgICBjYXNlICc3JzpcclxuICAgICAgICAgICAgY2FzZSAnOCc6XHJcbiAgICAgICAgICAgIGNhc2UgJzknOlxyXG4gICAgICAgICAgICBjYXNlICcwJzpcclxuICAgICAgICAgICAgICAgIG9yZCA9ICd0aCc7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG4gKyBvcmQ7XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHZhbHVlXHJcbiAgICAgKiBAcGFyYW0gYXJyXHJcbiAgICAgKiBAcGFyYW0gcHJvcFxyXG4gICAgICogQHJldHVybnMge251bWJlcn1cclxuICAgICAqL1xyXG4gICAgZ2V0SW5kZXggKHZhbHVlLCBhcnIsIHByb3ApIHtcclxuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmKGFycltpXVtwcm9wXSA9PT0gdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAtMTsgLy90byBoYW5kbGUgdGhlIGNhc2Ugd2hlcmUgdGhlIHZhbHVlIGRvZXNuJ3QgZXhpc3RcclxuICAgIH1cclxuXHJcbn07XHJcblxyXG5cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvY2EvY2EudXRpbHMuanMiXSwic291cmNlUm9vdCI6IiJ9