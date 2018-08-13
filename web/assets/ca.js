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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9jYS9jYS5hcGkuY29udGVudC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9jYS9jYS5hcGkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvY2EvY2EuZGF0YS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9jYS9jYS5tb2RlbHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvY2EvY2EudXRpbHMuanMiXSwibmFtZXMiOlsiX19hcGlTdG9yZSIsInRvdXJuYW1lbnRzIiwid2luZG93IiwiQ29udGVudEFyZW5hIiwiQ29udGVudEFwaSIsInNhdmVDb250ZW50QXNEcmFmdCIsImNvbnRlbnQiLCJkZWZlcnJlZCIsImpRdWVyeSIsIkRlZmVycmVkIiwiX3RoaXMiLCIkIiwiYWpheCIsInVybCIsImVudmhvc3R1cmwiLCJ0eXBlIiwiZGF0YSIsIkpTT04iLCJzdHJpbmdpZnkiLCJjb250ZW50VHlwZSIsInN1Y2Nlc3MiLCJyZXNwb25zZSIsInJlc29sdmUiLCJlcnJvciIsInN0YXR1cyIsInJlamVjdCIsInByb21pc2UiLCJzYXZlQ29udGVudEFzSW5hY3RpdmUiLCJzYXZlQ29udGVudEFzQWN0aXZlIiwic2VuZE1lc3NhZ2UiLCJtZXNzYWdlIiwiZ2V0VXNlckluZm8iLCJnZXRDb21wYW55VXNlcnMiLCJ1cGRhdGVDb21wYW55IiwiY29tcGFueSIsInVwZGF0ZVBhc3N3b3JkIiwidXBkYXRlVXNlciIsInVzZXIiLCJnZXRUaHJlYWQiLCJjdXN0b21JZCIsImdldFRocmVhZHMiLCJwbGFjZUJpZCIsImJpZCIsImFjY2VwdEJpZCIsInNpZ25hdHVyZSIsInJlamVjdEJpZCIsInJlbW92ZUJpZCIsInNhdmVUbXBGaWxlIiwiZmlsZXMiLCJGb3JtRGF0YSIsImFwcGVuZCIsInByb2Nlc3NEYXRhIiwiZ2V0QnlDdXN0b21JZCIsImdldERyYWZ0TGlzdGluZ3MiLCJnZXRJbmFjdGl2ZUxpc3RpbmdzIiwiZ2V0QWN0aXZlTGlzdGluZ3MiLCJnZXRFeHBpcmVkTGlzdGluZ3MiLCJyZW1vdmVMaXN0aW5nIiwiZHVwbGljYXRlTGlzdGluZyIsImRlYWN0aXZhdGVMaXN0aW5nIiwiZ2V0Q2xvc2VkRGVhbHMiLCJnZXRBbGxEZWFscyIsImdldFBlbmRpbmdEZWFscyIsImdldFJlamVjdGVkRGVhbHMiLCJnZXRXYXRjaGxpc3RMaXN0aW5ncyIsIkFwaSIsInNvcnRCeUxhYmVsIiwiYSIsImIiLCJuYW1lIiwic29ydEJ5U3BvcnQiLCJzcG9ydCIsInNwb3J0Q2F0ZWdvcnkiLCJwcmVwYXJlTGlzdCIsImxpc3QiLCJjYXRlZ29yeUlkIiwibWFwIiwiaXRlbSIsImNhdGVnb3J5IiwiaWQiLCJleHRlcm5hbElkIiwic29ydCIsImdldENvbnRlbnQiLCJmaWx0ZXIiLCJnZXRKc29uQ29udGVudCIsInNhdmVGaWx0ZXIiLCJnZXRDb3VudHJpZXMiLCJnZXRBY3RpdmVTcG9ydHMiLCJnZXRDb3VudHJpZXNGdWxsIiwiZ2V0VGVycml0b3JpZXMiLCJnZXRSaWdodHMiLCJyaWdodHNQYWNrYWdlIiwiZ3JvdXAiLCJnZXRSaWdodHNQYWNrYWdlIiwiZ2V0U3BvcnRzIiwiaG9zdHVybCIsInNwb3J0cyIsImdldENvbnRlbnREZXRhaWxzIiwiZ2V0UGVuZGluZ0xpc3RpbmdzIiwiZ2V0Q2F0ZWdvcmllcyIsInNwb3J0SWQiLCJjYXRzIiwiZ2V0VG91cm5hbWVudHMiLCJkb25lIiwidG91cm5hbWVudCIsImluZGV4T2YiLCJwdXNoIiwidW5kZWZpbmVkIiwiZ2V0U2Vhc29ucyIsInRvdXJuYW1lbnRJZCIsInNlYXNvbnMiLCJzZWFzb24iLCJpc0FycmF5IiwiZW5kRGF0ZSIsImVuZF9kYXRlIiwic3RhcnREYXRlIiwic3RhcnRfZGF0ZSIsInRvdXJuYW1lbnRfaWQiLCJ5ZWFyIiwicmV2ZXJzZSIsImdldFNjaGVkdWxlIiwic2Vhc29uSWQiLCJzcG9ydF9ldmVudHMiLCJzcG9ydF9ldmVudCIsImZvckVhY2giLCJyb3VuZCIsInRvdXJuYW1lbnRfcm91bmQiLCJudW1iZXIiLCJtYXRjaGVzIiwiTWFwIiwic2V0Iiwic2NoZWR1bGVkIiwidG91cm5hbWVudFJvdW5kIiwiY29tcGV0aXRvcnMiLCJjb21wZXRpdG9yIiwic2VhcmNoQ29tcGV0aXRpb24iLCJyZXF1ZXN0IiwidHJhZGl0aW9uYWwiLCJkYXRhVHlwZSIsIndhdGNobGlzdCIsIkRhdGEiLCJMYW5ndWFnZXMiLCJUb3BTcG9ydHMiLCJGdWxsU3BvcnRzIiwiQ291bnRyaWVzIiwiU2hvcnQiLCJMb25nIiwiTW9kZWwiLCJSaWdodFBhY2thZ2UiLCJyaWdodHMiLCJSaWdodCIsInJpZ2h0SXRlbXMiLCJSaWdodEl0ZW0iLCJpbnB1dHMiLCJTZWxlY3RlZFJpZ2h0IiwicmlnaHQiLCJyaWdodEl0ZW0iLCJTYWxlc1BhY2thZ2UiLCJzYWxlc01ldGhvZCIsImZlZSIsImN1cnJlbmN5IiwidGVycml0b3JpZXMiLCJzZWxlY3RlZFRlcnJpdG9yaWVzIiwiZXhjbHVkZWRUZXJyaXRvcmllcyIsInRlcnJpdG9yeUJpZHMiLCJzZWxsQXNQYWNrYWdlIiwidmFsaWRhdGUiLCJkZXNjcmlwdGlvbiIsImhhc0Vycm9ycyIsIkNvbnRlbnQiLCJzYWxlc1BhY2thZ2VzIiwiaW5zdGFsbG1lbnRzIiwiZ2V0VGl0bGUiLCJjb25zb2xlIiwibG9nIiwidGl0bGUiLCJsZW5ndGgiLCJpbmRleCIsImFycmF5IiwidmFsdWUiLCJ2YWx1ZXMiLCJzcGxpdCIsImpvaW4iLCJ3YXRjaCIsImFyZ3VtZW50cyIsIlV0aWxzIiwiY29udGVudFBhcnNlckZyb21TZXJ2ZXIiLCJwYXJzZWQiLCJleHRyYURhdGEiLCJPYmplY3QiLCJlbnRyaWVzIiwia2V5IiwiQXJyYXkiLCJzZWxlY3RlZFJpZ2h0c0J5U3VwZXJSaWdodCIsInJwIiwic2VsZWN0ZWRSaWdodHMiLCJleGNsdXNpdmUiLCJmaXh0dXJlc0J5U2Vhc29uIiwicyIsImkiLCJmaXh0dXJlcyIsInNwIiwiZXhjbHVkZWRDb3VudHJpZXMiLCJsYWJlbCIsInQiLCJzb3J0U2FsZXNQYWNrYWdlcyIsInN0ZXAiLCJOdW1iZXIiLCJjIiwiaXNBUElBdmFpbGFibGUiLCJGaWxlIiwiRmlsZVJlYWRlciIsIkZpbGVMaXN0IiwiQmxvYiIsImRvY3VtZW50Iiwid3JpdGVsbiIsImFkZE9yZGluYWwiLCJuIiwic3RyIiwidG9TdHJpbmciLCJzbGljZSIsIm9yZCIsImdldEluZGV4IiwiYXJyIiwicHJvcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBSUEsSUFBSUEsYUFBYTtBQUNiQyxpQkFBYztBQURELENBQWpCOztBQUlBQyxPQUFPQyxZQUFQLEdBQXNCRCxPQUFPQyxZQUFQLElBQXVCLEVBQTdDO0FBQ0FBLGFBQWFDLFVBQWIsR0FBMEJELGFBQWFDLFVBQWIsSUFBMEIsRUFBcEQ7O0FBRUFELGFBQWFDLFVBQWIsR0FBeUI7QUFDckJDLHNCQURxQiw4QkFDQUMsT0FEQSxFQUNVO0FBQzNCLFlBQUlDLFdBQVdDLE9BQU9DLFFBQVAsRUFBZjtBQUFBLFlBQ0lDLFFBQVEsSUFEWjs7QUFHQUMsVUFBRUMsSUFBRixDQUFPO0FBQ0hDLGlCQUFLQyxhQUFhLG9CQURmO0FBRUhDLGtCQUFNLE1BRkg7QUFHSEMsa0JBQU1DLEtBQUtDLFNBQUwsQ0FBZVosT0FBZixDQUhIO0FBSUhhLHlCQUFhLGtCQUpWO0FBS0hDLHFCQUFTLGlCQUFVQyxRQUFWLEVBQW9CO0FBQ3pCZCx5QkFBU2UsT0FBVCxDQUFpQkQsUUFBakI7QUFDSCxhQVBFO0FBUUhFLG1CQUFRLGVBQVVQLElBQVYsRUFBZ0JRLE1BQWhCLEVBQXdCO0FBQzVCakIseUJBQVNrQixNQUFULENBQWdCO0FBQ1pULDBCQUFNQSxJ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ekIsSUFBSSxDQUFaLEVBQWVBLElBQUl3QixJQUFJL0MsTUFBdkIsRUFBK0J1QixHQUEvQixFQUFvQztBQUNoQyxnQkFBR3dCLElBQUl4QixDQUFKLEVBQU95QixJQUFQLE1BQWlCN0MsS0FBcEIsRUFBMkI7QUFDdkIsdUJBQU9vQixDQUFQO0FBQ0g7QUFDSjtBQUNELGVBQU8sQ0FBQyxDQUFSLENBTndCLENBTWI7QUFDZDtBQW5IZ0IsQ0FBckIsQyIsImZpbGUiOiJjYS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuKiBDcmVhdGVkIGJ5IEp1YW5DcnV6IG9uIDQvMS8yMDE4LlxuKi9cblxubGV0IF9fYXBpU3RvcmUgPSB7XG4gICAgdG91cm5hbWVudHMgOiB7fVxufTtcblxud2luZG93LkNvbnRlbnRBcmVuYSA9IHdpbmRvdy5Db250ZW50QXJlbmEgfHwge307XG5Db250ZW50QXJlbmEuQ29udGVudEFwaSA9IENvbnRlbnRBcmVuYS5Db250ZW50QXBpfHwge307XG5cbkNvbnRlbnRBcmVuYS5Db250ZW50QXBpPSB7XG4gICAgc2F2ZUNvbnRlbnRBc0RyYWZ0ICggY29udGVudCApIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiY29udGVudC9kcmFmdC9zYXZlXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KGNvbnRlbnQpLFxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIHNhdmVDb250ZW50QXNJbmFjdGl2ZSAoIGNvbnRlbnQgKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxuICAgICAgICAgICAgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS9saXN0aW5nL3NhdmVcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoY29udGVudCksXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgc2F2ZUNvbnRlbnRBc0FjdGl2ZSAoIGNvbnRlbnQgKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxuICAgICAgICAgICAgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS9saXN0aW5nL3B1Ymxpc2hcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoY29udGVudCksXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgc2VuZE1lc3NhZ2UgKCBtZXNzYWdlICkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvbWVzc2FnZXMvc2VuZFwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShtZXNzYWdlKSxcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICBnZXRVc2VySW5mbyAoICkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvdXNlci9pbmZvXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICBnZXRDb21wYW55VXNlcnMgKCApIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL2NvbXBhbnkvdXNlcnNcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIHVwZGF0ZUNvbXBhbnkgKCBjb21wYW55ICkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvY29tcGFueS91cGRhdGVcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoe2NvbXBhbnk6Y29tcGFueX0pLFxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuXG4gICAgdXBkYXRlUGFzc3dvcmQgKCBkYXRhICkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvdXNlci9wYXNzd29yZFwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShkYXRhKSxcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICB1cGRhdGVVc2VyICggdXNlciApIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL3VzZXIvdXBkYXRlXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHt1c2VyOnVzZXJ9KSxcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICBnZXRUaHJlYWQgKCBjdXN0b21JZCApIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL21lc3NhZ2VzL3RocmVhZFwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7Y3VzdG9tSWQ6IGN1c3RvbUlkfSksXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgZ2V0VGhyZWFkcyAoICApIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL21lc3NhZ2VzL3RocmVhZHNcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIHBsYWNlQmlkICggYmlkICkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvYmlkL3BsYWNlXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KGJpZCksXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgYWNjZXB0QmlkICggYmlkLCBzaWduYXR1cmUgKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxuICAgICAgICAgICAgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgIGJpZC5zaWduYXR1cmUgPSBzaWduYXR1cmU7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL2JpZC9hY2NlcHRcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoYmlkKSxcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICByZWplY3RCaWQgKCBiaWQgKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxuICAgICAgICAgICAgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS9iaWQvcmVqZWN0XCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KGJpZCksXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgcmVtb3ZlQmlkICggYmlkICkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvYmlkL3JlbW92ZVwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShiaWQpLFxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuXG4gICAgc2F2ZVRtcEZpbGUgKCBmaWxlcyApIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgY29uc3QgZGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuICAgICAgICBkYXRhLmFwcGVuZCgnZmlsZScsIGZpbGVzWzBdKTtcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJjb250ZW50L3NhdmUvZmlsZVwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgcHJvY2Vzc0RhdGE6IGZhbHNlLFxuICAgICAgICAgICAgY29udGVudFR5cGU6IGZhbHNlLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIGdldEJ5Q3VzdG9tSWQgKCBjdXN0b21JZCApIHtcbiAgICAgICAgdmFyIGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwibGlzdGluZy9kZXRhaWxzXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBjdXN0b21JZCA6IGN1c3RvbUlkLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcblxuICAgIGdldERyYWZ0TGlzdGluZ3MgKCApIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCk7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL2xpc3RpbmdzL2RyYWZ0XCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICBnZXRJbmFjdGl2ZUxpc3RpbmdzICggKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS9saXN0aW5ncy9pbmFjdGl2ZVwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgZ2V0QWN0aXZlTGlzdGluZ3MgKCApIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCk7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL2xpc3RpbmdzL2FjdGl2ZVwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgZ2V0RXhwaXJlZExpc3RpbmdzICggKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS9saXN0aW5ncy9leHBpcmVkXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICByZW1vdmVMaXN0aW5nKCBjdXN0b21JZCApIHtcbiAgICAgICAgdmFyIGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL2xpc3RpbmdzL3JlbW92ZVwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgY3VzdG9tSWQgOiBjdXN0b21JZCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgZHVwbGljYXRlTGlzdGluZyggY3VzdG9tSWQgKSB7XG4gICAgICAgIHZhciBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxuICAgICAgICAgICAgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS9saXN0aW5ncy9kdXBsaWNhdGVcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIGN1c3RvbUlkIDogY3VzdG9tSWQsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIGRlYWN0aXZhdGVMaXN0aW5nKCBjdXN0b21JZCApIHtcbiAgICAgICAgdmFyIGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL2xpc3RpbmdzL2RlYWN0aXZhdGVcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIGN1c3RvbUlkIDogY3VzdG9tSWQsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuXG4gICAgZ2V0Q2xvc2VkRGVhbHMgKCAgKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS9iaWQvY2xvc2VkXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgZ2V0QWxsRGVhbHMgKCAgKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS9iaWQvYWxsXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgZ2V0UGVuZGluZ0RlYWxzICggICkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKTtcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvYmlkL3BlbmRpbmdcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICBnZXRSZWplY3RlZERlYWxzICggICkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKTtcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvYmlkL3JlamVjdGVkXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgZ2V0V2F0Y2hsaXN0TGlzdGluZ3MgKCl7XG4gICAgICAgIHZhciBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxuICAgICAgICAgICAgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS9saXN0aW5ncy93YXRjaGxpc3RcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuXG59O1xuXG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L2NhL2NhLmFwaS5jb250ZW50LmpzIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IEp1YW5DcnV6IG9uIDQvMS8yMDE4LlxuICovXG5cbmxldCBfX2FwaVN0b3JlID0ge1xuICAgIHRvdXJuYW1lbnRzIDoge31cbn07XG5cbndpbmRvdy5Db250ZW50QXJlbmEgPSB3aW5kb3cuQ29udGVudEFyZW5hIHx8IHt9O1xuXG5Db250ZW50QXJlbmEuQXBpPSB7XG4gICAgc29ydEJ5TGFiZWwgKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIChhLm5hbWUgPiBiLm5hbWUpID8gMSA6ICgoYi5uYW1lID4gYS5uYW1lKSA/IC0xIDogMClcbiAgICB9LFxuICAgIHNvcnRCeVNwb3J0IChhLCBiKSB7XG5cbiAgICAgICAgaWYgKGEuc3BvcnQubmFtZSA+IGIuc3BvcnQubmFtZSkgcmV0dXJuIDE7XG4gICAgICAgIGlmIChhLnNwb3J0Lm5hbWUgPCBiLnNwb3J0Lm5hbWUpIHJldHVybiAtMTtcbiAgICAgICAgaWYgKGEuc3BvcnRDYXRlZ29yeS5uYW1lID4gYi5zcG9ydENhdGVnb3J5Lm5hbWUpIHJldHVybiAxO1xuICAgICAgICBpZiAoYS5zcG9ydENhdGVnb3J5Lm5hbWUgPCBiLnNwb3J0Q2F0ZWdvcnkubmFtZSkgcmV0dXJuIC0xO1xuICAgICAgICBpZiAoYS5uYW1lID4gYi5uYW1lKSByZXR1cm4gMTtcbiAgICAgICAgaWYgKGEubmFtZSA8IGIubmFtZSkgcmV0dXJuIC0xO1xuICAgICAgICByZXR1cm4gMDtcblxuICAgIH0sXG4gICAgcHJlcGFyZUxpc3QgKCBsaXN0LCBjYXRlZ29yeUlkICkge1xuXG4gICAgICAgIGxldCBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgbGlzdCA9ICQubWFwKGxpc3QsIGZ1bmN0aW9uIChpdGVtKSB7XG5cbiAgICAgICAgICAgIC8vIEZpbHRlciBieSBjYXRlZ29yeVxuICAgICAgICAgICAgaWYgKCBjYXRlZ29yeUlkICYmIGl0ZW0uY2F0ZWdvcnlbJ0BhdHRyaWJ1dGVzJ10uaWQgIT0gY2F0ZWdvcnlJZCkgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgICAgIHJldHVybiB7bmFtZTogaXRlbVsnQGF0dHJpYnV0ZXMnXS5uYW1lLCBleHRlcm5hbElkOiBpdGVtWydAYXR0cmlidXRlcyddLmlkfVxuICAgICAgICB9KTtcblxuICAgICAgICBsaXN0LnNvcnQoX3RoaXMuc29ydEJ5TGFiZWwpO1xuXG4gICAgICAgIHJldHVybiBsaXN0O1xuICAgIH0sXG4gICAgZ2V0Q29udGVudCAoIGZpbHRlcikge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKTtcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJidXkvc2VhcmNoXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGEgOiBmaWx0ZXIsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgZ2V0SnNvbkNvbnRlbnQgKCBmaWx0ZXIpIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCk7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwibGlzdGluZ3MvbWFya2V0cGxhY2VcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YSA6IGZpbHRlcixcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICBzYXZlRmlsdGVyICggZmlsdGVyKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImJ1eS9maWx0ZXIvc2F2ZVwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhIDogZmlsdGVyLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIGdldENvdW50cmllcyAoKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpO1xuICAgICAgICBsZXQgX3RoaXMgPSB0aGlzO1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJzZWFyY2gvY291bnRyaWVzL2FsbFwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEBwYXJhbSB7YXJyYXl9IHJlc3BvbnNlXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlLnNvcnQoX3RoaXMuc29ydEJ5TGFiZWwpO1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICBnZXRBY3RpdmVTcG9ydHMgKCkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKTtcbiAgICAgICAgbGV0IF90aGlzID0gdGhpcztcbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwic2VhcmNoL3Nwb3J0cy9hY3RpdmVcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBAcGFyYW0ge2FycmF5fSByZXNwb25zZVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgZ2V0Q291bnRyaWVzRnVsbCAoKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpO1xuICAgICAgICBsZXQgX3RoaXMgPSB0aGlzO1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJzZWFyY2gvY291bnRyaWVzL2Z1bGxcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBAcGFyYW0ge2FycmF5fSByZXNwb25zZVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZS5zb3J0KF90aGlzLnNvcnRCeUxhYmVsKTtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgZ2V0VGVycml0b3JpZXMgKCkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKTtcbiAgICAgICAgbGV0IF90aGlzID0gdGhpcztcbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwic2VhcmNoL3RlcnJpdG9yaWVzXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQHBhcmFtIHthcnJheX0gcmVzcG9uc2VcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2Uuc29ydChfdGhpcy5zb3J0QnlMYWJlbCk7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIGdldFJpZ2h0cyAocmlnaHRzUGFja2FnZSwgZ3JvdXApIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCk7XG4gICAgICAgIGxldCBfdGhpcyA9IHRoaXM7XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcInNlYXJjaC9yaWdodHNcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YSA6IHtcbiAgICAgICAgICAgICAgICByaWdodHNQYWNrYWdlOiByaWdodHNQYWNrYWdlLFxuICAgICAgICAgICAgICAgIGdyb3VwOiBncm91cFxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBAcGFyYW0ge2FycmF5fSByZXNwb25zZVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgZ2V0UmlnaHRzUGFja2FnZSAocmlnaHRzUGFja2FnZSwgZ3JvdXApIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCk7XG4gICAgICAgIGxldCBfdGhpcyA9IHRoaXM7XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcInNlYXJjaC9yaWdodHMtcGFja2FnZVwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhIDoge1xuICAgICAgICAgICAgICAgIHJpZ2h0c1BhY2thZ2U6IHJpZ2h0c1BhY2thZ2UsXG4gICAgICAgICAgICAgICAgZ3JvdXA6IGdyb3VwXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEBwYXJhbSB7YXJyYXl9IHJlc3BvbnNlXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICBnZXRTcG9ydHMgKCkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKTtcbiAgICAgICAgbGV0IF90aGlzID0gdGhpcztcbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogaG9zdHVybCArIFwidjEvZmVlZC9zcG9ydHNcIixcbiAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEBwYXJhbSB7e3Nwb3J0Om9iamVjdH19IHJlc3BvbnNlXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuXG4gICAgICAgICAgICAgICAgdmFyIHNwb3J0cyA9IF90aGlzLnByZXBhcmVMaXN0KCByZXNwb25zZS5zcG9ydCk7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShzcG9ydHMpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICBnZXRDb250ZW50RGV0YWlscyggaWQgKSB7XG4gICAgICAgIHZhciBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxuICAgICAgICAgICAgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImNvbnRlbnQvZGV0YWlscy9cIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YToge2lkIDogaWR9LFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIGdldFBlbmRpbmdMaXN0aW5ncyggaWQgKSB7XG4gICAgICAgIHZhciBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxuICAgICAgICAgICAgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImNvbnRlbnQvcGVuZGluZy1saXN0aW5ncy9cIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YToge2lkIDogaWR9LFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIGdldENhdGVnb3JpZXMgKCBzcG9ydElkICkge1xuICAgICAgICB2YXIgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcbiAgICAgICAgICAgIF90aGlzID0gdGhpcyxcbiAgICAgICAgICAgIGxpc3QgPSBbXSxcbiAgICAgICAgICAgIGNhdHMgPSBbXTtcblxuICAgICAgICBfdGhpcy5nZXRUb3VybmFtZW50cyhzcG9ydElkKS5kb25lKGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgaWYgKCAhIF9fYXBpU3RvcmUudG91cm5hbWVudHNbc3BvcnRJZF0gKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSggW10gKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxpc3QgPSAkLm1hcCggX19hcGlTdG9yZS50b3VybmFtZW50c1tzcG9ydElkXS50b3VybmFtZW50ICwgZnVuY3Rpb24gKGl0ZW0pIHtcblxuICAgICAgICAgICAgICAgIGxldCBpZCA9IGl0ZW0uY2F0ZWdvcnlbJ0BhdHRyaWJ1dGVzJ10uaWQ7XG5cbiAgICAgICAgICAgICAgICBpZiAoIGNhdHMuaW5kZXhPZihpZCkgIT09IC0xICkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjYXRzLnB1c2goIGlkICk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLmNhdGVnb3J5O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKF90aGlzLnByZXBhcmVMaXN0KGxpc3QpICk7XG4gICAgICAgIH0pO1xuXG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIGdldFRvdXJuYW1lbnRzICggc3BvcnRJZCwgY2F0ZWdvcnlJZCApIHtcbiAgICAgICAgdmFyIGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgaWYgKCBfX2FwaVN0b3JlLnRvdXJuYW1lbnRzW3Nwb3J0SWRdICE9PSB1bmRlZmluZWQgKXtcbiAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoX3RoaXMucHJlcGFyZUxpc3QoX19hcGlTdG9yZS50b3VybmFtZW50c1tzcG9ydElkXS50b3VybmFtZW50LCBjYXRlZ29yeUlkKSk7XG4gICAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogaG9zdHVybCArIFwidjEvZmVlZC90b3VybmFtZW50c1wiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhIDogeyBpZCA6IHNwb3J0SWQgfSxcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQHBhcmFtIHt7dG91cm5hbWVudHM6e3RvdXJuYW1lbnQ6QXJyYXl9fX0gcmVzcG9uc2VcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG5cbiAgICAgICAgICAgICAgICAvLyBBIGNvbW1lbnRcbiAgICAgICAgICAgICAgICBpZiAoIHJlc3BvbnNlLnRvdXJuYW1lbnRzID09PSB1bmRlZmluZWQgfHwgcmVzcG9uc2UudG91cm5hbWVudHMudG91cm5hbWVudCA9PT0gdW5kZWZpbmVkICkge1xuICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKFtdKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIF9fYXBpU3RvcmUudG91cm5hbWVudHNbc3BvcnRJZF0gPSByZXNwb25zZS50b3VybmFtZW50cztcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKF90aGlzLnByZXBhcmVMaXN0KHJlc3BvbnNlLnRvdXJuYW1lbnRzLnRvdXJuYW1lbnQsIGNhdGVnb3J5SWQpKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMgKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICBnZXRTZWFzb25zICggdG91cm5hbWVudElkICkge1xuICAgICAgICB2YXIgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBob3N0dXJsICsgXCJ2MS9mZWVkL3NlYXNvbnNcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YSA6IHsgaWQgOiB0b3VybmFtZW50SWQgfSxcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQHBhcmFtIHt7dG91cm5hbWVudHM6e3RvdXJuYW1lbnQ6QXJyYXl9fX0gcmVzcG9uc2VcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgbGlzdDtcblxuICAgICAgICAgICAgICAgIGlmICggcmVzcG9uc2Uuc2Vhc29ucyA9PT0gdW5kZWZpbmVkIHx8IHJlc3BvbnNlLnNlYXNvbnMuc2Vhc29uID09PSB1bmRlZmluZWQgKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICBpZiAoICQuaXNBcnJheShyZXNwb25zZS5zZWFzb25zLnNlYXNvbikgKXtcbiAgICAgICAgICAgICAgICAgICAgbGlzdCA9ICQubWFwKHJlc3BvbnNlLnNlYXNvbnMuc2Vhc29uLCBmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBpdGVtWydAYXR0cmlidXRlcyddLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXh0ZXJuYWxJZDogaXRlbVsnQGF0dHJpYnV0ZXMnXS5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmREYXRlOiBpdGVtWydAYXR0cmlidXRlcyddLmVuZF9kYXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0RGF0ZTogaXRlbVsnQGF0dHJpYnV0ZXMnXS5zdGFydF9kYXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvdXJuYW1lbnRJZDogaXRlbVsnQGF0dHJpYnV0ZXMnXS50b3VybmFtZW50X2lkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHllYXI6IGl0ZW1bJ0BhdHRyaWJ1dGVzJ10ueWVhcixcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSkucmV2ZXJzZSgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGxpc3QgPSBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogcmVzcG9uc2Uuc2Vhc29ucy5zZWFzb25bJ0BhdHRyaWJ1dGVzJ10ubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGV4dGVybmFsSWQ6IHJlc3BvbnNlLnNlYXNvbnMuc2Vhc29uWydAYXR0cmlidXRlcyddLmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgZW5kRGF0ZTogcmVzcG9uc2Uuc2Vhc29ucy5zZWFzb25bJ0BhdHRyaWJ1dGVzJ10uZW5kX2RhdGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFydERhdGU6IHJlc3BvbnNlLnNlYXNvbnMuc2Vhc29uWydAYXR0cmlidXRlcyddLnN0YXJ0X2RhdGUsXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VybmFtZW50SWQ6IHJlc3BvbnNlLnNlYXNvbnMuc2Vhc29uWydAYXR0cmlidXRlcyddLnRvdXJuYW1lbnRfaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICB5ZWFyOiByZXNwb25zZS5zZWFzb25zLnNlYXNvblsnQGF0dHJpYnV0ZXMnXS55ZWFyLFxuICAgICAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUobGlzdCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzICkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgZ2V0U2NoZWR1bGUgKCBzZWFzb25JZCApIHtcbiAgICAgICAgdmFyIGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogaG9zdHVybCArIFwidjEvZmVlZC9zY2hlZHVsZXNcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YSA6IHsgaWQgOiBzZWFzb25JZCB9LFxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBAcGFyYW0ge3t0b3VybmFtZW50czp7dG91cm5hbWVudDpBcnJheX19fSByZXNwb25zZVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcblxuICAgICAgICAgICAgICAgIGxldCBsaXN0ID0ge307XG5cbiAgICAgICAgICAgICAgICBpZiAoIHJlc3BvbnNlLnNwb3J0X2V2ZW50cyA9PT0gdW5kZWZpbmVkIHx8IHJlc3BvbnNlLnNwb3J0X2V2ZW50cy5zcG9ydF9ldmVudCA9PT0gdW5kZWZpbmVkICkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgcmVzcG9uc2Uuc3BvcnRfZXZlbnRzLnNwb3J0X2V2ZW50LmZvckVhY2goIChpdGVtKSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IHJvdW5kICA9IChpdGVtLnRvdXJuYW1lbnRfcm91bmQpID8gaXRlbS50b3VybmFtZW50X3JvdW5kWydAYXR0cmlidXRlcyddIDogbnVsbDtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoIXJvdW5kKSByZXR1cm47XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IG5hbWUgPSAocm91bmQubnVtYmVyKSA/IFwicm91bmRfXCIgKyByb3VuZC5udW1iZXIgOiByb3VuZC5uYW1lO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICggIWxpc3RbbmFtZV0gKSBsaXN0W25hbWVdID0ge307XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCAhbGlzdFtuYW1lXS5tYXRjaGVzICkgbGlzdFtuYW1lXS5tYXRjaGVzID0gbmV3IE1hcCgpO1xuXG4gICAgICAgICAgICAgICAgICAgIGxpc3RbbmFtZV0ubWF0Y2hlcy5zZXQoaXRlbVsnQGF0dHJpYnV0ZXMnXS5pZCx7XG4gICAgICAgICAgICAgICAgICAgICAgICBzY2hlZHVsZWQ6IGl0ZW1bJ0BhdHRyaWJ1dGVzJ10uc2NoZWR1bGVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgZXh0ZXJuYWxJZDogaXRlbVsnQGF0dHJpYnV0ZXMnXS5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1czogaXRlbVsnQGF0dHJpYnV0ZXMnXS5zdGF0dXMsXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VybmFtZW50Um91bmQgOiByb3VuZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBldGl0b3JzIDogKGl0ZW0uY29tcGV0aXRvcnMpID8gaXRlbS5jb21wZXRpdG9ycy5jb21wZXRpdG9yLm1hcCgoIGNvbXBldGl0b3IpPT57IHJldHVybiBjb21wZXRpdG9yWydAYXR0cmlidXRlcyddICB9KSAgOiBudWxsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKGxpc3QpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cyApIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIHNlYXJjaENvbXBldGl0aW9uKHJlcXVlc3QpIHtcblxuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKTtcbiAgICAgICAgbGV0IF90aGlzID0gdGhpcztcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgJ3NlYXJjaC90b3VybmFtZW50JyxcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBcImNvbnRlbnRcIjogcmVxdWVzdFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRyYWRpdGlvbmFsOiB0cnVlLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhVHlwZTogXCJqc29uXCIsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xuXG4gICAgICAgICAgICAgICAgZGF0YS5zb3J0KF90aGlzLnNvcnRCeVNwb3J0KTtcblxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoZGF0YSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzICkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgd2F0Y2hsaXN0KCBpZCApIHtcbiAgICAgICAgdmFyIGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL3dhdGNobGlzdC9hZGRcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YToge2lkIDogaWR9LFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9XG59O1xuXG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L2NhL2NhLmFwaS5qcyIsIi8qKlxuICogQ3JlYXRlZCBieSBKdWFuQ3J1eiBvbiA0LzEvMjAxOC5cbiAqL1xuXG53aW5kb3cuQ29udGVudEFyZW5hID0gd2luZG93LkNvbnRlbnRBcmVuYSB8fCB7fTtcblxuQ29udGVudEFyZW5hLkRhdGEgPSBDb250ZW50QXJlbmEuRGF0YSB8fCB7fTtcbkNvbnRlbnRBcmVuYS5MYW5ndWFnZXMgPSBDb250ZW50QXJlbmEuTGFuZ3VhZ2VzIHx8IHt9O1xuXG5Db250ZW50QXJlbmEuRGF0YS5Ub3BTcG9ydHMgPSBbXG4gICAgeyBuYW1lIDogXCJTb2NjZXJcIiwgZXh0ZXJuYWxJZDogXCJzcjpzcG9ydDoxXCJ9LFxuICAgIHsgbmFtZSA6IFwiQmFza2V0YmFsbFwiLCBleHRlcm5hbElkOiBcInNyOnNwb3J0OjJcIn0sXG4gICAgeyBuYW1lIDogXCJCYXNlYmFsbFwiLCBleHRlcm5hbElkOiBcInNyOnNwb3J0OjNcIn0sXG4gICAgeyBuYW1lIDogXCJUZW5uaXNcIiwgZXh0ZXJuYWxJZDogXCJzcjpzcG9ydDo1XCJ9LFxuICAgIHsgbmFtZSA6IFwiQ3JpY2tldFwiLCBleHRlcm5hbElkOiBcInNyOnNwb3J0OjIxXCJ9LFxuICAgIHsgbmFtZSA6IFwiRmllbGQgSG9ja2V5XCIsIGV4dGVybmFsSWQ6IFwic3I6c3BvcnQ6MjRcIn0sXG4gICAgeyBuYW1lIDogXCJWb2xsZXliYWxsXCIsIGV4dGVybmFsSWQ6IFwic3I6c3BvcnQ6MjNcIn0sXG4gICAgeyBuYW1lIDogXCJUYWJsZSBUZW5uaXNcIiwgZXh0ZXJuYWxJZDogXCJzcjpzcG9ydDoyMFwifSxcbiAgICB7IG5hbWUgOiBcIkdvbGZcIiwgZXh0ZXJuYWxJZDogXCJzcjpzcG9ydDo5XCJ9LFxuICAgIHsgbmFtZSA6IFwiQW1lcmljYW4gRm9vdGJhbGxcIiwgZXh0ZXJuYWxJZDogXCJzcjpzcG9ydDoxNlwifSxcbiAgICB7IG5hbWUgOiBcIkhhbmRiYWxsXCIsIGV4dGVybmFsSWQ6IFwic3I6c3BvcnQ6NlwifVxuXTtcblxuQ29udGVudEFyZW5hLkRhdGEuRnVsbFNwb3J0cyA9IFtdO1xuQ29udGVudEFyZW5hLkRhdGEuQ291bnRyaWVzID0gW107XG5cbkNvbnRlbnRBcmVuYS5MYW5ndWFnZXMuU2hvcnQgPSB7XG4gICAgXCJtZHJcIjogXCJNYW5kYXJpblwiLFxuICAgIFwiZXNcIjogXCJTcGFuaXNoXCIsXG4gICAgXCJlblwiOiBcIkVuZ2xpc2hcIixcbiAgICBcImhpXCI6IFwiSGluZGlcIixcbiAgICBcImFyXCI6IFwiQXJhYmljXCIsXG4gICAgXCJwdFwiOiBcIlBvcnR1Z3Vlc2VcIixcbiAgICBcImJuXCI6IFwiQmVuZ2FsaVwiLFxuICAgIFwicnVcIjogXCJSdXNzaWFuXCIsXG4gICAgXCJqYVwiOiBcIkphcGFuZXNlXCIsXG4gICAgXCJqdlwiOiBcIkphdmFuZXNlXCIsXG4gICAgXCJkZVwiOiBcIkdlcm1hblwiLFxuICAgIFwiYWxsXCIgOiBcIlNob3cgQWxsXCJcbn07XG5cbkNvbnRlbnRBcmVuYS5MYW5ndWFnZXMuTG9uZyA9IHtcbiAgICBcImFhXCI6IFwiQWZhclwiLFxuICAgIFwiYWZcIjogXCJBZnJpa2FhbnNcIixcbiAgICBcImFpblwiOiBcIkFpbnVcIixcbiAgICBcImFrelwiOiBcIkFsYWJhbWFcIixcbiAgICBcInNxXCI6IFwiQWxiYW5pYW5cIixcbiAgICBcImFsZVwiOiBcIkFsZXV0XCIsXG4gICAgXCJhcnFcIjogXCJBbGdlcmlhbiBBcmFiaWNcIixcbiAgICBcImVuX1VTXCI6IFwiQW1lcmljYW4gRW5nbGlzaFwiLFxuICAgIFwiYXNlXCI6IFwiQW1lcmljYW4gU2lnbiBMYW5ndWFnZVwiLFxuICAgIFwiYW1cIjogXCJBbWhhcmljXCIsXG4gICAgXCJlZ3lcIjogXCJBbmNpZW50IEVneXB0aWFuXCIsXG4gICAgXCJncmNcIjogXCJBbmNpZW50IEdyZWVrXCIsXG4gICAgXCJhclwiOiBcIkFyYWJpY1wiLFxuICAgIFwiYXJjXCI6IFwiQXJhbWFpY1wiLFxuICAgIFwiYXJwXCI6IFwiQXJhcGFob1wiLFxuICAgIFwiYXJ3XCI6IFwiQXJhd2FrXCIsXG4gICAgXCJoeVwiOiBcIkFybWVuaWFuXCIsXG4gICAgXCJhc1wiOiBcIkFzc2FtZXNlXCIsXG4gICAgXCJhc2FcIjogXCJBc3VcIixcbiAgICBcImVuX0FVXCI6IFwiQXVzdHJhbGlhbiBFbmdsaXNoXCIsXG4gICAgXCJkZV9BVFwiOiBcIkF1c3RyaWFuIEdlcm1hblwiLFxuICAgIFwiYXlcIjogXCJBeW1hcmFcIixcbiAgICBcImF6XCI6IFwiQXplcmJhaWphbmlcIixcbiAgICBcImJhblwiOiBcIkJhbGluZXNlXCIsXG4gICAgXCJldVwiOiBcIkJhc3F1ZVwiLFxuICAgIFwiYmFyXCI6IFwiQmF2YXJpYW5cIixcbiAgICBcImJlXCI6IFwiQmVsYXJ1c2lhblwiLFxuICAgIFwiYm5cIjogXCJCZW5nYWxpXCIsXG4gICAgXCJiaWtcIjogXCJCaWtvbFwiLFxuICAgIFwiYmluXCI6IFwiQmluaVwiLFxuICAgIFwiYnNcIjogXCJCb3NuaWFuXCIsXG4gICAgXCJicmhcIjogXCJCcmFodWlcIixcbiAgICBcImJyYVwiOiBcIkJyYWpcIixcbiAgICBcInB0X0JSXCI6IFwiQnJhemlsaWFuIFBvcnR1Z3Vlc2VcIixcbiAgICBcImJyXCI6IFwiQnJldG9uXCIsXG4gICAgXCJlbl9HQlwiOiBcIkJyaXRpc2ggRW5nbGlzaFwiLFxuICAgIFwiYmdcIjogXCJCdWxnYXJpYW5cIixcbiAgICBcIm15XCI6IFwiQnVybWVzZVwiLFxuICAgIFwiZnJjXCI6IFwiQ2FqdW4gRnJlbmNoXCIsXG4gICAgXCJlbl9DQVwiOiBcIkNhbmFkaWFuIEVuZ2xpc2hcIixcbiAgICBcImZyX0NBXCI6IFwiQ2FuYWRpYW4gRnJlbmNoXCIsXG4gICAgXCJ5dWVcIjogXCJDYW50b25lc2VcIixcbiAgICBcImNhclwiOiBcIkNhcmliXCIsXG4gICAgXCJjYVwiOiBcIkNhdGFsYW5cIixcbiAgICBcImNheVwiOiBcIkNheXVnYVwiLFxuICAgIFwiY2ViXCI6IFwiQ2VidWFub1wiLFxuICAgIFwic2h1XCI6IFwiQ2hhZGlhbiBBcmFiaWNcIixcbiAgICBcImNlXCI6IFwiQ2hlY2hlblwiLFxuICAgIFwiY2hyXCI6IFwiQ2hlcm9rZWVcIixcbiAgICBcInF1Z1wiOiBcIkNoaW1ib3Jhem8gSGlnaGxhbmQgUXVpY2h1YVwiLFxuICAgIFwiemhcIjogXCJDaGluZXNlXCIsXG4gICAgXCJjaG5cIjogXCJDaGlub29rIEphcmdvblwiLFxuICAgIFwiY2hwXCI6IFwiQ2hpcGV3eWFuXCIsXG4gICAgXCJjaG9cIjogXCJDaG9jdGF3XCIsXG4gICAgXCJjdVwiOiBcIkNodXJjaCBTbGF2aWNcIixcbiAgICBcImN2XCI6IFwiQ2h1dmFzaFwiLFxuICAgIFwibndjXCI6IFwiQ2xhc3NpY2FsIE5ld2FyaVwiLFxuICAgIFwic3ljXCI6IFwiQ2xhc3NpY2FsIFN5cmlhY1wiLFxuICAgIFwic3djXCI6IFwiQ29uZ28gU3dhaGlsaVwiLFxuICAgIFwiY29wXCI6IFwiQ29wdGljXCIsXG4gICAgXCJrd1wiOiBcIkNvcm5pc2hcIixcbiAgICBcImNvXCI6IFwiQ29yc2ljYW5cIixcbiAgICBcImNyXCI6IFwiQ3JlZVwiLFxuICAgIFwibXVzXCI6IFwiQ3JlZWtcIixcbiAgICBcImNyaFwiOiBcIkNyaW1lYW4gVHVya2lzaFwiLFxuICAgIFwiaHJcIjogXCJDcm9hdGlhblwiLFxuICAgIFwiY3NcIjogXCJDemVjaFwiLFxuICAgIFwiZGFrXCI6IFwiRGFrb3RhXCIsXG4gICAgXCJkYVwiOiBcIkRhbmlzaFwiLFxuICAgIFwiZGVsXCI6IFwiRGVsYXdhcmVcIixcbiAgICBcIm5sXCI6IFwiRHV0Y2hcIixcbiAgICBcImZyc1wiOiBcIkVhc3Rlcm4gRnJpc2lhblwiLFxuICAgIFwiYXJ6XCI6IFwiRWd5cHRpYW4gQXJhYmljXCIsXG4gICAgXCJlblwiOiBcIkVuZ2xpc2hcIixcbiAgICBcImVvXCI6IFwiRXNwZXJhbnRvXCIsXG4gICAgXCJldFwiOiBcIkVzdG9uaWFuXCIsXG4gICAgXCJwdF9QVFwiOiBcIkV1cm9wZWFuIFBvcnR1Z3Vlc2VcIixcbiAgICBcImVzX0VTXCI6IFwiRXVyb3BlYW4gU3BhbmlzaFwiLFxuICAgIFwiZWVcIjogXCJFd2VcIixcbiAgICBcImZhblwiOiBcIkZhbmdcIixcbiAgICBcImhpZlwiOiBcIkZpamkgSGluZGlcIixcbiAgICBcImZqXCI6IFwiRmlqaWFuXCIsXG4gICAgXCJmaWxcIjogXCJGaWxpcGlub1wiLFxuICAgIFwiZmlcIjogXCJGaW5uaXNoXCIsXG4gICAgXCJubF9CRVwiOiBcIkZsZW1pc2hcIixcbiAgICBcImZvblwiOiBcIkZvblwiLFxuICAgIFwiZnJcIjogXCJGcmVuY2hcIixcbiAgICBcImdhYVwiOiBcIkdhXCIsXG4gICAgXCJnYW5cIjogXCJHYW4gQ2hpbmVzZVwiLFxuICAgIFwia2FcIjogXCJHZW9yZ2lhblwiLFxuICAgIFwiZGVcIjogXCJHZXJtYW5cIixcbiAgICBcImdvdFwiOiBcIkdvdGhpY1wiLFxuICAgIFwiZ3JiXCI6IFwiR3JlYm9cIixcbiAgICBcImVsXCI6IFwiR3JlZWtcIixcbiAgICBcImduXCI6IFwiR3VhcmFuaVwiLFxuICAgIFwiZ3VcIjogXCJHdWphcmF0aVwiLFxuICAgIFwiZ3V6XCI6IFwiR3VzaWlcIixcbiAgICBcImhhaVwiOiBcIkhhaWRhXCIsXG4gICAgXCJodFwiOiBcIkhhaXRpYW5cIixcbiAgICBcImhha1wiOiBcIkhha2thIENoaW5lc2VcIixcbiAgICBcImhhXCI6IFwiSGF1c2FcIixcbiAgICBcImhhd1wiOiBcIkhhd2FpaWFuXCIsXG4gICAgXCJoZVwiOiBcIkhlYnJld1wiLFxuICAgIFwiaHpcIjogXCJIZXJlcm9cIixcbiAgICBcImhpXCI6IFwiSGluZGlcIixcbiAgICBcImhpdFwiOiBcIkhpdHRpdGVcIixcbiAgICBcImhtblwiOiBcIkhtb25nXCIsXG4gICAgXCJodVwiOiBcIkh1bmdhcmlhblwiLFxuICAgIFwiaXNcIjogXCJJY2VsYW5kaWNcIixcbiAgICBcImlvXCI6IFwiSWRvXCIsXG4gICAgXCJpZ1wiOiBcIklnYm9cIixcbiAgICBcIml1XCI6IFwiSW51a3RpdHV0XCIsXG4gICAgXCJpa1wiOiBcIkludXBpYXFcIixcbiAgICBcImdhXCI6IFwiSXJpc2hcIixcbiAgICBcIml0XCI6IFwiSXRhbGlhblwiLFxuICAgIFwiamFtXCI6IFwiSmFtYWljYW4gQ3Jlb2xlIEVuZ2xpc2hcIixcbiAgICBcImphXCI6IFwiSmFwYW5lc2VcIixcbiAgICBcImp2XCI6IFwiSmF2YW5lc2VcIixcbiAgICBcImthalwiOiBcIkpqdVwiLFxuICAgIFwiZHlvXCI6IFwiSm9sYS1Gb255aVwiLFxuICAgIFwieGFsXCI6IFwiS2FsbXlrXCIsXG4gICAgXCJrYW1cIjogXCJLYW1iYVwiLFxuICAgIFwia2JsXCI6IFwiS2FuZW1idVwiLFxuICAgIFwia25cIjogXCJLYW5uYWRhXCIsXG4gICAgXCJrclwiOiBcIkthbnVyaVwiLFxuICAgIFwia2FhXCI6IFwiS2FyYS1LYWxwYWtcIixcbiAgICBcImtyY1wiOiBcIkthcmFjaGF5LUJhbGthclwiLFxuICAgIFwia3JsXCI6IFwiS2FyZWxpYW5cIixcbiAgICBcImtzXCI6IFwiS2FzaG1pcmlcIixcbiAgICBcImNzYlwiOiBcIkthc2h1YmlhblwiLFxuICAgIFwia2F3XCI6IFwiS2F3aVwiLFxuICAgIFwia2tcIjogXCJLYXpha2hcIixcbiAgICBcImtlblwiOiBcIktlbnlhbmdcIixcbiAgICBcImtoYVwiOiBcIktoYXNpXCIsXG4gICAgXCJrbVwiOiBcIktobWVyXCIsXG4gICAgXCJraG9cIjogXCJLaG90YW5lc2VcIixcbiAgICBcImtod1wiOiBcIktob3dhclwiLFxuICAgIFwia2lcIjogXCJLaWt1eXVcIixcbiAgICBcImttYlwiOiBcIktpbWJ1bmR1XCIsXG4gICAgXCJrcmpcIjogXCJLaW5hcmF5LWFcIixcbiAgICBcInJ3XCI6IFwiS2lueWFyd2FuZGFcIixcbiAgICBcImtpdVwiOiBcIktpcm1hbmpraVwiLFxuICAgIFwidGxoXCI6IFwiS2xpbmdvblwiLFxuICAgIFwiYmttXCI6IFwiS29tXCIsXG4gICAgXCJrdlwiOiBcIktvbWlcIixcbiAgICBcImtvaVwiOiBcIktvbWktUGVybXlha1wiLFxuICAgIFwia2dcIjogXCJLb25nb1wiLFxuICAgIFwia29rXCI6IFwiS29ua2FuaVwiLFxuICAgIFwia29cIjogXCJLb3JlYW5cIixcbiAgICBcImtmb1wiOiBcIktvcm9cIixcbiAgICBcImtvc1wiOiBcIktvc3JhZWFuXCIsXG4gICAgXCJhdmtcIjogXCJLb3RhdmFcIixcbiAgICBcImtocVwiOiBcIktveXJhIENoaWluaVwiLFxuICAgIFwic2VzXCI6IFwiS295cmFib3JvIFNlbm5pXCIsXG4gICAgXCJrcGVcIjogXCJLcGVsbGVcIixcbiAgICBcImtyaVwiOiBcIktyaW9cIixcbiAgICBcImtqXCI6IFwiS3VhbnlhbWFcIixcbiAgICBcImt1bVwiOiBcIkt1bXlrXCIsXG4gICAgXCJrdVwiOiBcIkt1cmRpc2hcIixcbiAgICBcImtydVwiOiBcIkt1cnVraFwiLFxuICAgIFwia3V0XCI6IFwiS3V0ZW5haVwiLFxuICAgIFwibm1nXCI6IFwiS3dhc2lvXCIsXG4gICAgXCJreVwiOiBcIkt5cmd5elwiLFxuICAgIFwicXVjXCI6IFwiS1xcdTAyYmNpY2hlXFx1MDJiY1wiLFxuICAgIFwibGFkXCI6IFwiTGFkaW5vXCIsXG4gICAgXCJsYWhcIjogXCJMYWhuZGFcIixcbiAgICBcImxrdFwiOiBcIkxha290YVwiLFxuICAgIFwibGFtXCI6IFwiTGFtYmFcIixcbiAgICBcImxhZ1wiOiBcIkxhbmdpXCIsXG4gICAgXCJsb1wiOiBcIkxhb1wiLFxuICAgIFwibHRnXCI6IFwiTGF0Z2FsaWFuXCIsXG4gICAgXCJsYVwiOiBcIkxhdGluXCIsXG4gICAgXCJlc180MTlcIjogXCJMYXRpbiBBbWVyaWNhbiBTcGFuaXNoXCIsXG4gICAgXCJsdlwiOiBcIkxhdHZpYW5cIixcbiAgICBcImx6elwiOiBcIkxhelwiLFxuICAgIFwibGV6XCI6IFwiTGV6Z2hpYW5cIixcbiAgICBcImxpalwiOiBcIkxpZ3VyaWFuXCIsXG4gICAgXCJsaVwiOiBcIkxpbWJ1cmdpc2hcIixcbiAgICBcImxuXCI6IFwiTGluZ2FsYVwiLFxuICAgIFwibGZuXCI6IFwiTGluZ3VhIEZyYW5jYSBOb3ZhXCIsXG4gICAgXCJsemhcIjogXCJMaXRlcmFyeSBDaGluZXNlXCIsXG4gICAgXCJsdFwiOiBcIkxpdGh1YW5pYW5cIixcbiAgICBcImxpdlwiOiBcIkxpdm9uaWFuXCIsXG4gICAgXCJqYm9cIjogXCJMb2piYW5cIixcbiAgICBcImxtb1wiOiBcIkxvbWJhcmRcIixcbiAgICBcIm5kc1wiOiBcIkxvdyBHZXJtYW5cIixcbiAgICBcInNsaVwiOiBcIkxvd2VyIFNpbGVzaWFuXCIsXG4gICAgXCJkc2JcIjogXCJMb3dlciBTb3JiaWFuXCIsXG4gICAgXCJsb3pcIjogXCJMb3ppXCIsXG4gICAgXCJsdVwiOiBcIkx1YmEtS2F0YW5nYVwiLFxuICAgIFwibHVhXCI6IFwiTHViYS1MdWx1YVwiLFxuICAgIFwibHVpXCI6IFwiTHVpc2Vub1wiLFxuICAgIFwic21qXCI6IFwiTHVsZSBTYW1pXCIsXG4gICAgXCJsdW5cIjogXCJMdW5kYVwiLFxuICAgIFwibHVvXCI6IFwiTHVvXCIsXG4gICAgXCJsYlwiOiBcIkx1eGVtYm91cmdpc2hcIixcbiAgICBcImx1eVwiOiBcIkx1eWlhXCIsXG4gICAgXCJtZGVcIjogXCJNYWJhXCIsXG4gICAgXCJta1wiOiBcIk1hY2Vkb25pYW5cIixcbiAgICBcImptY1wiOiBcIk1hY2hhbWVcIixcbiAgICBcIm1hZFwiOiBcIk1hZHVyZXNlXCIsXG4gICAgXCJtYWZcIjogXCJNYWZhXCIsXG4gICAgXCJtYWdcIjogXCJNYWdhaGlcIixcbiAgICBcInZtZlwiOiBcIk1haW4tRnJhbmNvbmlhblwiLFxuICAgIFwibWFpXCI6IFwiTWFpdGhpbGlcIixcbiAgICBcIm1ha1wiOiBcIk1ha2FzYXJcIixcbiAgICBcIm1naFwiOiBcIk1ha2h1d2EtTWVldHRvXCIsXG4gICAgXCJrZGVcIjogXCJNYWtvbmRlXCIsXG4gICAgXCJtZ1wiOiBcIk1hbGFnYXN5XCIsXG4gICAgXCJtc1wiOiBcIk1hbGF5XCIsXG4gICAgXCJtbFwiOiBcIk1hbGF5YWxhbVwiLFxuICAgIFwibXRcIjogXCJNYWx0ZXNlXCIsXG4gICAgXCJtbmNcIjogXCJNYW5jaHVcIixcbiAgICBcIm1kclwiOiBcIk1hbmRhcmluXCIsXG4gICAgXCJtYW5cIjogXCJNYW5kaW5nb1wiLFxuICAgIFwibW5pXCI6IFwiTWFuaXB1cmlcIixcbiAgICBcImd2XCI6IFwiTWFueFwiLFxuICAgIFwibWlcIjogXCJNYW9yaVwiLFxuICAgIFwiYXJuXCI6IFwiTWFwdWNoZVwiLFxuICAgIFwibXJcIjogXCJNYXJhdGhpXCIsXG4gICAgXCJjaG1cIjogXCJNYXJpXCIsXG4gICAgXCJtaFwiOiBcIk1hcnNoYWxsZXNlXCIsXG4gICAgXCJtd3JcIjogXCJNYXJ3YXJpXCIsXG4gICAgXCJtYXNcIjogXCJNYXNhaVwiLFxuICAgIFwibXpuXCI6IFwiTWF6YW5kZXJhbmlcIixcbiAgICBcImJ5dlwiOiBcIk1lZHVtYmFcIixcbiAgICBcIm1lblwiOiBcIk1lbmRlXCIsXG4gICAgXCJtd3ZcIjogXCJNZW50YXdhaVwiLFxuICAgIFwibWVyXCI6IFwiTWVydVwiLFxuICAgIFwibWdvXCI6IFwiTWV0YVxcdTAyYmNcIixcbiAgICBcImVzX01YXCI6IFwiTWV4aWNhbiBTcGFuaXNoXCIsXG4gICAgXCJtaWNcIjogXCJNaWNtYWNcIixcbiAgICBcImR1bVwiOiBcIk1pZGRsZSBEdXRjaFwiLFxuICAgIFwiZW5tXCI6IFwiTWlkZGxlIEVuZ2xpc2hcIixcbiAgICBcImZybVwiOiBcIk1pZGRsZSBGcmVuY2hcIixcbiAgICBcImdtaFwiOiBcIk1pZGRsZSBIaWdoIEdlcm1hblwiLFxuICAgIFwibWdhXCI6IFwiTWlkZGxlIElyaXNoXCIsXG4gICAgXCJuYW5cIjogXCJNaW4gTmFuIENoaW5lc2VcIixcbiAgICBcIm1pblwiOiBcIk1pbmFuZ2thYmF1XCIsXG4gICAgXCJ4bWZcIjogXCJNaW5ncmVsaWFuXCIsXG4gICAgXCJtd2xcIjogXCJNaXJhbmRlc2VcIixcbiAgICBcImx1c1wiOiBcIk1pem9cIixcbiAgICBcImFyXzAwMVwiOiBcIk1vZGVybiBTdGFuZGFyZCBBcmFiaWNcIixcbiAgICBcIm1vaFwiOiBcIk1vaGF3a1wiLFxuICAgIFwibWRmXCI6IFwiTW9rc2hhXCIsXG4gICAgXCJyb19NRFwiOiBcIk1vbGRhdmlhblwiLFxuICAgIFwibG9sXCI6IFwiTW9uZ29cIixcbiAgICBcIm1uXCI6IFwiTW9uZ29saWFuXCIsXG4gICAgXCJtZmVcIjogXCJNb3Jpc3llblwiLFxuICAgIFwiYXJ5XCI6IFwiTW9yb2NjYW4gQXJhYmljXCIsXG4gICAgXCJtb3NcIjogXCJNb3NzaVwiLFxuICAgIFwibXVsXCI6IFwiTXVsdGlwbGUgTGFuZ3VhZ2VzXCIsXG4gICAgXCJtdWFcIjogXCJNdW5kYW5nXCIsXG4gICAgXCJ0dHRcIjogXCJNdXNsaW0gVGF0XCIsXG4gICAgXCJteWVcIjogXCJNeWVuZVwiLFxuICAgIFwibmFxXCI6IFwiTmFtYVwiLFxuICAgIFwibmFcIjogXCJOYXVydVwiLFxuICAgIFwibnZcIjogXCJOYXZham9cIixcbiAgICBcIm5nXCI6IFwiTmRvbmdhXCIsXG4gICAgXCJuYXBcIjogXCJOZWFwb2xpdGFuXCIsXG4gICAgXCJuZVwiOiBcIk5lcGFsaVwiLFxuICAgIFwibmV3XCI6IFwiTmV3YXJpXCIsXG4gICAgXCJzYmFcIjogXCJOZ2FtYmF5XCIsXG4gICAgXCJubmhcIjogXCJOZ2llbWJvb25cIixcbiAgICBcImpnb1wiOiBcIk5nb21iYVwiLFxuICAgIFwieXJsXCI6IFwiTmhlZW5nYXR1XCIsXG4gICAgXCJuaWFcIjogXCJOaWFzXCIsXG4gICAgXCJuaXVcIjogXCJOaXVlYW5cIixcbiAgICBcInp4eFwiOiBcIk5vIGxpbmd1aXN0aWMgY29udGVudFwiLFxuICAgIFwibm9nXCI6IFwiTm9nYWlcIixcbiAgICBcIm5kXCI6IFwiTm9ydGggTmRlYmVsZVwiLFxuICAgIFwiZnJyXCI6IFwiTm9ydGhlcm4gRnJpc2lhblwiLFxuICAgIFwic2VcIjogXCJOb3J0aGVybiBTYW1pXCIsXG4gICAgXCJuc29cIjogXCJOb3J0aGVybiBTb3Rob1wiLFxuICAgIFwibm9cIjogXCJOb3J3ZWdpYW5cIixcbiAgICBcIm5iXCI6IFwiTm9yd2VnaWFuIEJva21cXHUwMGU1bFwiLFxuICAgIFwibm5cIjogXCJOb3J3ZWdpYW4gTnlub3Jza1wiLFxuICAgIFwibm92XCI6IFwiTm92aWFsXCIsXG4gICAgXCJudXNcIjogXCJOdWVyXCIsXG4gICAgXCJueW1cIjogXCJOeWFtd2V6aVwiLFxuICAgIFwibnlcIjogXCJOeWFuamFcIixcbiAgICBcIm55blwiOiBcIk55YW5rb2xlXCIsXG4gICAgXCJ0b2dcIjogXCJOeWFzYSBUb25nYVwiLFxuICAgIFwibnlvXCI6IFwiTnlvcm9cIixcbiAgICBcIm56aVwiOiBcIk56aW1hXCIsXG4gICAgXCJucW9cIjogXCJOXFx1MDJiY0tvXCIsXG4gICAgXCJvY1wiOiBcIk9jY2l0YW5cIixcbiAgICBcIm9qXCI6IFwiT2ppYndhXCIsXG4gICAgXCJhbmdcIjogXCJPbGQgRW5nbGlzaFwiLFxuICAgIFwiZnJvXCI6IFwiT2xkIEZyZW5jaFwiLFxuICAgIFwiZ29oXCI6IFwiT2xkIEhpZ2ggR2VybWFuXCIsXG4gICAgXCJzZ2FcIjogXCJPbGQgSXJpc2hcIixcbiAgICBcIm5vblwiOiBcIk9sZCBOb3JzZVwiLFxuICAgIFwicGVvXCI6IFwiT2xkIFBlcnNpYW5cIixcbiAgICBcInByb1wiOiBcIk9sZCBQcm92ZW5cXHUwMGU3YWxcIixcbiAgICBcIm9yXCI6IFwiT3JpeWFcIixcbiAgICBcIm9tXCI6IFwiT3JvbW9cIixcbiAgICBcIm9zYVwiOiBcIk9zYWdlXCIsXG4gICAgXCJvc1wiOiBcIk9zc2V0aWNcIixcbiAgICBcIm90YVwiOiBcIk90dG9tYW4gVHVya2lzaFwiLFxuICAgIFwicGFsXCI6IFwiUGFobGF2aVwiLFxuICAgIFwicGZsXCI6IFwiUGFsYXRpbmUgR2VybWFuXCIsXG4gICAgXCJwYXVcIjogXCJQYWxhdWFuXCIsXG4gICAgXCJwaVwiOiBcIlBhbGlcIixcbiAgICBcInBkY1wiOiBcIlBlbm5zeWx2YW5pYSBHZXJtYW5cIixcbiAgICBcImZhXCI6IFwiUGVyc2lhblwiLFxuICAgIFwicGhuXCI6IFwiUGhvZW5pY2lhblwiLFxuICAgIFwicGNkXCI6IFwiUGljYXJkXCIsXG4gICAgXCJwbXNcIjogXCJQaWVkbW9udGVzZVwiLFxuICAgIFwicGR0XCI6IFwiUGxhdXRkaWV0c2NoXCIsXG4gICAgXCJwb25cIjogXCJQb2hucGVpYW5cIixcbiAgICBcInBsXCI6IFwiUG9saXNoXCIsXG4gICAgXCJwbnRcIjogXCJQb250aWNcIixcbiAgICBcInB0XCI6IFwiUG9ydHVndWVzZVwiLFxuICAgIFwicHJnXCI6IFwiUHJ1c3NpYW5cIixcbiAgICBcInBhXCI6IFwiUHVuamFiaVwiLFxuICAgIFwicXVcIjogXCJRdWVjaHVhXCIsXG4gICAgXCJyb1wiOiBcIlJvbWFuaWFuXCIsXG4gICAgXCJybVwiOiBcIlJvbWFuc2hcIixcbiAgICBcInJvbVwiOiBcIlJvbWFueVwiLFxuICAgIFwicm9vdFwiOiBcIlJvb3RcIixcbiAgICBcInJ1XCI6IFwiUnVzc2lhblwiLFxuICAgIFwicndrXCI6IFwiUndhXCIsXG4gICAgXCJzYWhcIjogXCJTYWtoYVwiLFxuICAgIFwic2FtXCI6IFwiU2FtYXJpdGFuIEFyYW1haWNcIixcbiAgICBcInNtXCI6IFwiU2Ftb2FuXCIsXG4gICAgXCJzY29cIjogXCJTY290c1wiLFxuICAgIFwiZ2RcIjogXCJTY290dGlzaCBHYWVsaWNcIixcbiAgICBcInNseVwiOiBcIlNlbGF5YXJcIixcbiAgICBcInNlbFwiOiBcIlNlbGt1cFwiLFxuICAgIFwic2VoXCI6IFwiU2VuYVwiLFxuICAgIFwic2VlXCI6IFwiU2VuZWNhXCIsXG4gICAgXCJzclwiOiBcIlNlcmJpYW5cIixcbiAgICBcInNoXCI6IFwiU2VyYm8tQ3JvYXRpYW5cIixcbiAgICBcInNyclwiOiBcIlNlcmVyXCIsXG4gICAgXCJzZWlcIjogXCJTZXJpXCIsXG4gICAgXCJrc2JcIjogXCJTaGFtYmFsYVwiLFxuICAgIFwic2huXCI6IFwiU2hhblwiLFxuICAgIFwic25cIjogXCJTaG9uYVwiLFxuICAgIFwiaWlcIjogXCJTaWNodWFuIFlpXCIsXG4gICAgXCJzY25cIjogXCJTaWNpbGlhblwiLFxuICAgIFwic2lkXCI6IFwiU2lkYW1vXCIsXG4gICAgXCJibGFcIjogXCJTaWtzaWthXCIsXG4gICAgXCJzemxcIjogXCJTaWxlc2lhblwiLFxuICAgIFwiemhfSGFuc1wiOiBcIlNpbXBsaWZpZWQgQ2hpbmVzZVwiLFxuICAgIFwic2RcIjogXCJTaW5kaGlcIixcbiAgICBcInNpXCI6IFwiU2luaGFsYVwiLFxuICAgIFwic21zXCI6IFwiU2tvbHQgU2FtaVwiLFxuICAgIFwiZGVuXCI6IFwiU2xhdmVcIixcbiAgICBcInNrXCI6IFwiU2xvdmFrXCIsXG4gICAgXCJzbFwiOiBcIlNsb3ZlbmlhblwiLFxuICAgIFwieG9nXCI6IFwiU29nYVwiLFxuICAgIFwic29nXCI6IFwiU29nZGllblwiLFxuICAgIFwic29cIjogXCJTb21hbGlcIixcbiAgICBcInNua1wiOiBcIlNvbmlua2VcIixcbiAgICBcImNrYlwiOiBcIlNvcmFuaSBLdXJkaXNoXCIsXG4gICAgXCJhemJcIjogXCJTb3V0aCBBemVyYmFpamFuaVwiLFxuICAgIFwibnJcIjogXCJTb3V0aCBOZGViZWxlXCIsXG4gICAgXCJhbHRcIjogXCJTb3V0aGVybiBBbHRhaVwiLFxuICAgIFwic21hXCI6IFwiU291dGhlcm4gU2FtaVwiLFxuICAgIFwic3RcIjogXCJTb3V0aGVybiBTb3Rob1wiLFxuICAgIFwiZXNcIjogXCJTcGFuaXNoXCIsXG4gICAgXCJzcm5cIjogXCJTcmFuYW4gVG9uZ29cIixcbiAgICBcInpnaFwiOiBcIlN0YW5kYXJkIE1vcm9jY2FuIFRhbWF6aWdodFwiLFxuICAgIFwic3VrXCI6IFwiU3VrdW1hXCIsXG4gICAgXCJzdXhcIjogXCJTdW1lcmlhblwiLFxuICAgIFwic3VcIjogXCJTdW5kYW5lc2VcIixcbiAgICBcInN1c1wiOiBcIlN1c3VcIixcbiAgICBcInN3XCI6IFwiU3dhaGlsaVwiLFxuICAgIFwic3NcIjogXCJTd2F0aVwiLFxuICAgIFwic3ZcIjogXCJTd2VkaXNoXCIsXG4gICAgXCJmcl9DSFwiOiBcIlN3aXNzIEZyZW5jaFwiLFxuICAgIFwiZ3N3XCI6IFwiU3dpc3MgR2VybWFuXCIsXG4gICAgXCJkZV9DSFwiOiBcIlN3aXNzIEhpZ2ggR2VybWFuXCIsXG4gICAgXCJzeXJcIjogXCJTeXJpYWNcIixcbiAgICBcInNoaVwiOiBcIlRhY2hlbGhpdFwiLFxuICAgIFwidGxcIjogXCJUYWdhbG9nXCIsXG4gICAgXCJ0eVwiOiBcIlRhaGl0aWFuXCIsXG4gICAgXCJkYXZcIjogXCJUYWl0YVwiLFxuICAgIFwidGdcIjogXCJUYWppa1wiLFxuICAgIFwidGx5XCI6IFwiVGFseXNoXCIsXG4gICAgXCJ0bWhcIjogXCJUYW1hc2hla1wiLFxuICAgIFwidGFcIjogXCJUYW1pbFwiLFxuICAgIFwidHJ2XCI6IFwiVGFyb2tvXCIsXG4gICAgXCJ0d3FcIjogXCJUYXNhd2FxXCIsXG4gICAgXCJ0dFwiOiBcIlRhdGFyXCIsXG4gICAgXCJ0ZVwiOiBcIlRlbHVndVwiLFxuICAgIFwidGVyXCI6IFwiVGVyZW5vXCIsXG4gICAgXCJ0ZW9cIjogXCJUZXNvXCIsXG4gICAgXCJ0ZXRcIjogXCJUZXR1bVwiLFxuICAgIFwidGhcIjogXCJUaGFpXCIsXG4gICAgXCJib1wiOiBcIlRpYmV0YW5cIixcbiAgICBcInRpZ1wiOiBcIlRpZ3JlXCIsXG4gICAgXCJ0aVwiOiBcIlRpZ3JpbnlhXCIsXG4gICAgXCJ0ZW1cIjogXCJUaW1uZVwiLFxuICAgIFwidGl2XCI6IFwiVGl2XCIsXG4gICAgXCJ0bGlcIjogXCJUbGluZ2l0XCIsXG4gICAgXCJ0cGlcIjogXCJUb2sgUGlzaW5cIixcbiAgICBcInRrbFwiOiBcIlRva2VsYXVcIixcbiAgICBcInRvXCI6IFwiVG9uZ2FuXCIsXG4gICAgXCJmaXRcIjogXCJUb3JuZWRhbGVuIEZpbm5pc2hcIixcbiAgICBcInpoX0hhbnRcIjogXCJUcmFkaXRpb25hbCBDaGluZXNlXCIsXG4gICAgXCJ0a3JcIjogXCJUc2FraHVyXCIsXG4gICAgXCJ0c2RcIjogXCJUc2Frb25pYW5cIixcbiAgICBcInRzaVwiOiBcIlRzaW1zaGlhblwiLFxuICAgIFwidHNcIjogXCJUc29uZ2FcIixcbiAgICBcInRuXCI6IFwiVHN3YW5hXCIsXG4gICAgXCJ0Y3lcIjogXCJUdWx1XCIsXG4gICAgXCJ0dW1cIjogXCJUdW1idWthXCIsXG4gICAgXCJhZWJcIjogXCJUdW5pc2lhbiBBcmFiaWNcIixcbiAgICBcInRyXCI6IFwiVHVya2lzaFwiLFxuICAgIFwidGtcIjogXCJUdXJrbWVuXCIsXG4gICAgXCJ0cnVcIjogXCJUdXJveW9cIixcbiAgICBcInR2bFwiOiBcIlR1dmFsdVwiLFxuICAgIFwidHl2XCI6IFwiVHV2aW5pYW5cIixcbiAgICBcInR3XCI6IFwiVHdpXCIsXG4gICAgXCJrY2dcIjogXCJUeWFwXCIsXG4gICAgXCJ1ZG1cIjogXCJVZG11cnRcIixcbiAgICBcInVnYVwiOiBcIlVnYXJpdGljXCIsXG4gICAgXCJ1a1wiOiBcIlVrcmFpbmlhblwiLFxuICAgIFwidW1iXCI6IFwiVW1idW5kdVwiLFxuICAgIFwidW5kXCI6IFwiVW5rbm93biBMYW5ndWFnZVwiLFxuICAgIFwiaHNiXCI6IFwiVXBwZXIgU29yYmlhblwiLFxuICAgIFwidXJcIjogXCJVcmR1XCIsXG4gICAgXCJ1Z1wiOiBcIlV5Z2h1clwiLFxuICAgIFwidXpcIjogXCJVemJla1wiLFxuICAgIFwidmFpXCI6IFwiVmFpXCIsXG4gICAgXCJ2ZVwiOiBcIlZlbmRhXCIsXG4gICAgXCJ2ZWNcIjogXCJWZW5ldGlhblwiLFxuICAgIFwidmVwXCI6IFwiVmVwc1wiLFxuICAgIFwidmlcIjogXCJWaWV0bmFtZXNlXCIsXG4gICAgXCJ2b1wiOiBcIlZvbGFwXFx1MDBmY2tcIixcbiAgICBcInZyb1wiOiBcIlZcXHUwMGY1cm9cIixcbiAgICBcInZvdFwiOiBcIlZvdGljXCIsXG4gICAgXCJ2dW5cIjogXCJWdW5qb1wiLFxuICAgIFwid2FcIjogXCJXYWxsb29uXCIsXG4gICAgXCJ3YWVcIjogXCJXYWxzZXJcIixcbiAgICBcIndhclwiOiBcIldhcmF5XCIsXG4gICAgXCJ3YXNcIjogXCJXYXNob1wiLFxuICAgIFwiZ3VjXCI6IFwiV2F5dXVcIixcbiAgICBcImN5XCI6IFwiV2Vsc2hcIixcbiAgICBcInZsc1wiOiBcIldlc3QgRmxlbWlzaFwiLFxuICAgIFwiZnlcIjogXCJXZXN0ZXJuIEZyaXNpYW5cIixcbiAgICBcIm1yalwiOiBcIldlc3Rlcm4gTWFyaVwiLFxuICAgIFwid2FsXCI6IFwiV29sYXl0dGFcIixcbiAgICBcIndvXCI6IFwiV29sb2ZcIixcbiAgICBcInd1dVwiOiBcIld1IENoaW5lc2VcIixcbiAgICBcInhoXCI6IFwiWGhvc2FcIixcbiAgICBcImhzblwiOiBcIlhpYW5nIENoaW5lc2VcIixcbiAgICBcInlhdlwiOiBcIllhbmdiZW5cIixcbiAgICBcInlhb1wiOiBcIllhb1wiLFxuICAgIFwieWFwXCI6IFwiWWFwZXNlXCIsXG4gICAgXCJ5YmJcIjogXCJZZW1iYVwiLFxuICAgIFwieWlcIjogXCJZaWRkaXNoXCIsXG4gICAgXCJ5b1wiOiBcIllvcnViYVwiLFxuICAgIFwiemFwXCI6IFwiWmFwb3RlY1wiLFxuICAgIFwiZGplXCI6IFwiWmFybWFcIixcbiAgICBcInp6YVwiOiBcIlphemFcIixcbiAgICBcInplYVwiOiBcIlplZWxhbmRpY1wiLFxuICAgIFwiemVuXCI6IFwiWmVuYWdhXCIsXG4gICAgXCJ6YVwiOiBcIlpodWFuZ1wiLFxuICAgIFwiZ2J6XCI6IFwiWm9yb2FzdHJpYW4gRGFyaVwiLFxuICAgIFwienVcIjogXCJadWx1XCIsXG4gICAgXCJ6dW5cIjogXCJadW5pXCJcbn1cblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvY2EvY2EuZGF0YS5qcyIsIi8qKlxuICogQ3JlYXRlZCBieSBKdWFuQ3J1eiBvbiA0LzEvMjAxOC5cbiAqL1xuXG4kKGZ1bmN0aW9uICgpIHtcblxuICAgIHdpbmRvdy5Db250ZW50QXJlbmEgPSB3aW5kb3cuQ29udGVudEFyZW5hIHx8IHt9O1xuXG4gICAgQ29udGVudEFyZW5hLk1vZGVsID0gQ29udGVudEFyZW5hLk1vZGVsIHx8IHt9O1xuXG4gICAgQ29udGVudEFyZW5hLk1vZGVsLlJpZ2h0UGFja2FnZSA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIHRoaXMuaWQgPSBudWxsO1xuICAgICAgICB0aGlzLm5hbWUgPSBudWxsO1xuICAgICAgICB0aGlzLnJpZ2h0cyA9IHt9O1xuICAgIH07XG5cbiAgICBDb250ZW50QXJlbmEuTW9kZWwuUmlnaHQgPSBmdW5jdGlvbigpe1xuICAgICAgICB0aGlzLmlkID0gbnVsbDtcbiAgICAgICAgdGhpcy5uYW1lID0gbnVsbDtcbiAgICAgICAgdGhpcy5yaWdodEl0ZW1zID0ge307XG4gICAgfTtcblxuICAgIENvbnRlbnRBcmVuYS5Nb2RlbC5SaWdodEl0ZW0gPSBmdW5jdGlvbigpe1xuICAgICAgICB0aGlzLmlkID0gbnVsbDtcbiAgICAgICAgdGhpcy5uYW1lID0gbnVsbDtcbiAgICAgICAgdGhpcy5pbnB1dHMgPSBbXTtcbiAgICB9O1xuXG4gICAgQ29udGVudEFyZW5hLk1vZGVsLlNlbGVjdGVkUmlnaHQgPSBmdW5jdGlvbigpe1xuICAgICAgICB0aGlzLnJpZ2h0ID0gbnVsbDtcbiAgICAgICAgdGhpcy5yaWdodEl0ZW0gPSBudWxsO1xuICAgICAgICB0aGlzLmdyb3VwID0gbnVsbDtcbiAgICAgICAgdGhpcy5pbnB1dHMgPSBbXTtcbiAgICB9O1xuXG4gICAgQ29udGVudEFyZW5hLk1vZGVsLlNhbGVzUGFja2FnZSA9IGZ1bmN0aW9uKCl7XG5cbiAgICAgICAgdGhpcy5zYWxlc01ldGhvZCA9ICBudWxsO1xuICAgICAgICB0aGlzLmZlZSA9IG51bGw7XG4gICAgICAgIHRoaXMuY3VycmVuY3kgPSBudWxsO1xuICAgICAgICB0aGlzLmlkID0gbnVsbDtcbiAgICAgICAgdGhpcy5uYW1lID0gbnVsbDtcbiAgICAgICAgdGhpcy50ZXJyaXRvcmllcyA9IG51bGw7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRUZXJyaXRvcmllcyA9IFtdO1xuICAgICAgICB0aGlzLmV4Y2x1ZGVkVGVycml0b3JpZXMgPSBbXTtcbiAgICAgICAgdGhpcy50ZXJyaXRvcnlCaWRzID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2VsbEFzUGFja2FnZSA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMudmFsaWRhdGUgPSAoKSA9PiB7XG5cbiAgICAgICAgICAgIHZhciBkZXNjcmlwdGlvbiA9IFwiU2FsZXMgUGFja2FnZSBcIiArIHRoaXMuaWQgKyBcIjogXCIsXG4gICAgICAgICAgICAgICAgaGFzRXJyb3JzID0gZmFsc2U7XG5cbiAgICAgICAgICAgIGlmICggISB0aGlzLmN1cnJlbmN5ICkge1xuICAgICAgICAgICAgICAgIGhhc0Vycm9ycyA9IHRydWU7XG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb24gKz0gXCJDdXJyZW5jeSBjYW4ndCBiZSBlbXB0eS4gXCI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICggISB0aGlzLmZlZSApIHtcbiAgICAgICAgICAgICAgICBoYXNFcnJvcnMgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uICs9IFwiRmVlIGNhbid0IGJlIGVtcHR5LiBcIjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCAhIHRoaXMudGVycml0b3JpZXMgKSB7XG4gICAgICAgICAgICAgICAgaGFzRXJyb3JzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbiArPSBcIlRlcnJpdG9yaWVzIGNhbid0IGJlIGVtcHR5LiBcIjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCAhIHRoaXMuc2FsZXNNZXRob2QgKSB7XG4gICAgICAgICAgICAgICAgaGFzRXJyb3JzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbiArPSBcIlNhbGVzIG1ldGhvZCBjYW4ndCBiZSBlbXB0eS4gXCI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgaGFzRXJyb3JzOiBoYXNFcnJvcnMsXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb24gOiBkZXNjcmlwdGlvblxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgQ29udGVudEFyZW5hLk1vZGVsLkNvbnRlbnQgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICB0aGlzLnNwb3J0ID0ge307XG4gICAgICAgIHRoaXMuc3BvcnRzID0gW107XG4gICAgICAgIHRoaXMudG91cm5hbWVudCA9IG51bGw7XG4gICAgICAgIHRoaXMuY2F0ZWdvcnkgPSBudWxsO1xuICAgICAgICB0aGlzLnNhbGVzUGFja2FnZXMgPSB7fTtcbiAgICAgICAgdGhpcy5pbnN0YWxsbWVudHMgPSB7fTtcblxuICAgICAgICB0aGlzLmdldFRpdGxlID0gKCkgPT4ge1xuXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzKTtcblxuICAgICAgICAgICAgdmFyIHRpdGxlID0gXCJcIjtcblxuICAgICAgICAgICAgaWYgKCB0aGlzLnNwb3J0cy5sZW5ndGggPiAwICl7XG4gICAgICAgICAgICAgICAgdGhpcy5zcG9ydHMuZm9yRWFjaChmdW5jdGlvbiAoc3BvcnQsIGluZGV4LCBhcnJheSkge1xuICAgICAgICAgICAgICAgICAgICB0aXRsZSArPSBzcG9ydC52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCAoaW5kZXgrMSkgIT0gYXJyYXkubGVuZ3RoICkgdGl0bGUgKz0gXCIsIFwiXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgaWYgKCB0aGlzLnNwb3J0ICE9PSBudWxsICkgdGl0bGUgKz0gdGhpcy5zcG9ydC52YWx1ZTtcbiAgICAgICAgICAgIGlmICggdGhpcy5jYXRlZ29yeSAhPT0gbnVsbCApIHRpdGxlICs9IFwiIC0gXCIgKyB0aGlzLmNhdGVnb3J5LnZhbHVlO1xuICAgICAgICAgICAgaWYgKCB0aGlzLnRvdXJuYW1lbnQgIT09IG51bGwgKSB0aXRsZSArPSBcIiAtIFwiICsgdGhpcy50b3VybmFtZW50LnZhbHVlO1xuXG4gICAgICAgICAgICBpZiAoIHRoaXMuc2Vhc29ucyAmJiB0aGlzLnNlYXNvbnMubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICAgICAgdGl0bGUgKz0gXCIgXCIgKyB0aGlzLnNlYXNvbnMubWFwKCAoIHNlYXNvbiApID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlcyA9IHNlYXNvbi52YWx1ZS5zcGxpdChcIiBcIik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZXNbdmFsdWVzLmxlbmd0aCAtIDFdXG4gICAgICAgICAgICAgICAgfSkuam9pbihcIiAtIFwiKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRpdGxlO1xuICAgICAgICB9O1xuXG4gICAgICAgIHdhdGNoKHRoaXMsIFwic3BvcnRzXCIsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlVwZGF0aW5nIHNwb3J0c1wiLCBhcmd1bWVudHMpO1xuICAgICAgICB9KTtcblxuXG4gICAgfTtcblxufSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9jYS9jYS5tb2RlbHMuanMiLCIvKipcbiAqIENyZWF0ZWQgYnkgSnVhbkNydXogb24gNC8xLzIwMTguXG4gKi9cblxud2luZG93LkNvbnRlbnRBcmVuYSA9IHdpbmRvdy5Db250ZW50QXJlbmEgfHwge307XG5Db250ZW50QXJlbmEuVXRpbHMgPSB7XG5cbiAgICBjb250ZW50UGFyc2VyRnJvbVNlcnZlcihjb250ZW50KSB7XG5cbiAgICAgICAgaWYgKCBjb250ZW50LnBhcnNlZCApIHJldHVybiBjb250ZW50O1xuXG4gICAgICAgIGxldCBzb3J0ID0gdHJ1ZTtcblxuICAgICAgICBpZiAoIGNvbnRlbnQuZXh0cmFEYXRhKXtcbiAgICAgICAgICAgIE9iamVjdC5lbnRyaWVzKGNvbnRlbnQuZXh0cmFEYXRhKS5mb3JFYWNoKFxuICAgICAgICAgICAgICAgIChba2V5LCB2YWx1ZV0pID0+IGNvbnRlbnRba2V5XSA9IHZhbHVlXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgY29udGVudC50b3VybmFtZW50ID0gKGNvbnRlbnQudG91cm5hbWVudCkgPyBBcnJheS5pc0FycmF5KGNvbnRlbnQudG91cm5hbWVudCk/IGNvbnRlbnQudG91cm5hbWVudCA6IFtjb250ZW50LnRvdXJuYW1lbnRdIDogW107XG4gICAgICAgIGNvbnRlbnQuc3BvcnRDYXRlZ29yeSA9IChjb250ZW50LnNwb3J0Q2F0ZWdvcnkpID8gQXJyYXkuaXNBcnJheShjb250ZW50LnNwb3J0Q2F0ZWdvcnkpPyBjb250ZW50LnNwb3J0Q2F0ZWdvcnkgOiBbY29udGVudC5zcG9ydENhdGVnb3J5XSA6IFtdO1xuXG4gICAgICAgIGlmIChjb250ZW50LnNlbGVjdGVkUmlnaHRzQnlTdXBlclJpZ2h0KXtcbiAgICAgICAgICAgIGNvbnRlbnQucmlnaHRzUGFja2FnZS5mb3JFYWNoKCAocnApID0+IHtcbiAgICAgICAgICAgICAgICBycC5zZWxlY3RlZFJpZ2h0cyA9IGNvbnRlbnQuc2VsZWN0ZWRSaWdodHNCeVN1cGVyUmlnaHRbcnAuaWRdWydpdGVtcyddO1xuICAgICAgICAgICAgICAgIHJwLmV4Y2x1c2l2ZSA9IGNvbnRlbnQuc2VsZWN0ZWRSaWdodHNCeVN1cGVyUmlnaHRbcnAuaWRdWydleGNsdXNpdmUnXTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbnRlbnQuZml4dHVyZXNCeVNlYXNvbil7XG4gICAgICAgICAgICBjb250ZW50LnNlYXNvbnMuZm9yRWFjaCggKHMsIGkpID0+IHtcbiAgICAgICAgICAgICAgICBzLmZpeHR1cmVzID0gY29udGVudC5maXh0dXJlc0J5U2Vhc29uW2ldXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggY29udGVudC5zYWxlc1BhY2thZ2VzICkge1xuICAgICAgICAgICAgY29udGVudC5zYWxlc1BhY2thZ2VzLmZvckVhY2goKHNwKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHNwLnNhbGVzTWV0aG9kKSBzcC5zYWxlc01ldGhvZCA9IHNwLnNhbGVzTWV0aG9kLm5hbWU7XG4gICAgICAgICAgICAgICAgaWYgKHNwLmV4Y2x1ZGVkQ291bnRyaWVzKSBzcC5leGNsdWRlZFRlcnJpdG9yaWVzID0gc3AuZXhjbHVkZWRDb3VudHJpZXMubWFwKHQ9PntyZXR1cm57bGFiZWw6dC5uYW1lLCB2YWx1ZTp0Lm5hbWV9fSlcbiAgICAgICAgICAgICAgICBpZiAoc3AudGVycml0b3JpZXMpIHNwLnRlcnJpdG9yaWVzID0gc3AudGVycml0b3JpZXMubWFwKHQ9PntyZXR1cm57bGFiZWw6dC5uYW1lLCB2YWx1ZTp0Lm5hbWV9fSlcbiAgICAgICAgICAgICAgICBpZiAoIXNwLnRlcnJpdG9yaWVzKSBzb3J0ID0gZmFsc2VcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKHNvcnQpIGNvbnRlbnQuc2FsZXNQYWNrYWdlcy5zb3J0KHRoaXMuc29ydFNhbGVzUGFja2FnZXMpLnJldmVyc2UoKTtcbiAgICAgICAgfVxuICAgICAgICBjb250ZW50LnN0ZXAgPSBOdW1iZXIoY29udGVudC5zdGVwKTtcbiAgICAgICAgY29udGVudC5wYXJzZWQgPSB0cnVlO1xuXG4gICAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0sXG5cbiAgICBzb3J0U2FsZXNQYWNrYWdlcyAoYSwgYil7XG4gICAgICAgIGxldCBjID0gKGEsIGIpID0+IHtcbiAgICAgICAgICAgIHJldHVybiAoYSA+IGIpID8gMSA6ICgoYiA+IGEpID8gLTEgOiAwKVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gYyhhLnRlcnJpdG9yaWVzLmxlbmd0aCwgYi50ZXJyaXRvcmllcy5sZW5ndGgpIHx8IGMoYi5uYW1lLCBhLm5hbWUpO1xuICAgIH0sXG5cblxuXG4gICAgaXNBUElBdmFpbGFibGUoKSB7XG4gICAgICAgIC8vIENoZWNrIGZvciB0aGUgdmFyaW91cyBGaWxlIEFQSSBzdXBwb3J0LlxuICAgICAgICBpZiAod2luZG93LkZpbGUgJiYgd2luZG93LkZpbGVSZWFkZXIgJiYgd2luZG93LkZpbGVMaXN0ICYmIHdpbmRvdy5CbG9iKSB7XG4gICAgICAgICAgICAvLyBHcmVhdCBzdWNjZXNzISBBbGwgdGhlIEZpbGUgQVBJcyBhcmUgc3VwcG9ydGVkLlxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBzb3VyY2U6IEZpbGUgQVBJIGF2YWlsYWJpbGl0eSAtIGh0dHA6Ly9jYW5pdXNlLmNvbS8jZmVhdD1maWxlYXBpXG4gICAgICAgICAgICAvLyBzb3VyY2U6IDxvdXRwdXQ+IGF2YWlsYWJpbGl0eSAtIGh0dHA6Ly9odG1sNWRvY3Rvci5jb20vdGhlLW91dHB1dC1lbGVtZW50L1xuICAgICAgICAgICAgZG9jdW1lbnQud3JpdGVsbignVGhlIEhUTUw1IEFQSXMgdXNlZCBpbiB0aGlzIGZvcm0gYXJlIG9ubHkgYXZhaWxhYmxlIGluIHRoZSBmb2xsb3dpbmcgYnJvd3NlcnM6PGJyIC8+Jyk7XG4gICAgICAgICAgICAvLyA2LjAgRmlsZSBBUEkgJiAxMy4wIDxvdXRwdXQ+XG4gICAgICAgICAgICBkb2N1bWVudC53cml0ZWxuKCcgLSBHb29nbGUgQ2hyb21lOiAxMy4wIG9yIGxhdGVyPGJyIC8+Jyk7XG4gICAgICAgICAgICAvLyAzLjYgRmlsZSBBUEkgJiA2LjAgPG91dHB1dD5cbiAgICAgICAgICAgIGRvY3VtZW50LndyaXRlbG4oJyAtIE1vemlsbGEgRmlyZWZveDogNi4wIG9yIGxhdGVyPGJyIC8+Jyk7XG4gICAgICAgICAgICAvLyAxMC4wIEZpbGUgQVBJICYgMTAuMCA8b3V0cHV0PlxuICAgICAgICAgICAgZG9jdW1lbnQud3JpdGVsbignIC0gSW50ZXJuZXQgRXhwbG9yZXI6IE5vdCBzdXBwb3J0ZWQgKHBhcnRpYWwgc3VwcG9ydCBleHBlY3RlZCBpbiAxMC4wKTxiciAvPicpO1xuICAgICAgICAgICAgLy8gPyBGaWxlIEFQSSAmIDUuMSA8b3V0cHV0PlxuICAgICAgICAgICAgZG9jdW1lbnQud3JpdGVsbignIC0gU2FmYXJpOiBOb3Qgc3VwcG9ydGVkPGJyIC8+Jyk7XG4gICAgICAgICAgICAvLyA/IEZpbGUgQVBJICYgOS4yIDxvdXRwdXQ+XG4gICAgICAgICAgICBkb2N1bWVudC53cml0ZWxuKCcgLSBPcGVyYTogTm90IHN1cHBvcnRlZCcpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBhZGRPcmRpbmFsKG4pIHtcbiAgICAgICAgdmFyIHN0ciA9IG4udG9TdHJpbmcoKS5zbGljZSgtMSksXG4gICAgICAgICAgICBvcmQgPSAnJztcbiAgICAgICAgc3dpdGNoIChzdHIpIHtcbiAgICAgICAgICAgIGNhc2UgJzEnOlxuICAgICAgICAgICAgICAgIG9yZCA9ICdzdCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICcyJzpcbiAgICAgICAgICAgICAgICBvcmQgPSAnbmQnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnMyc6XG4gICAgICAgICAgICAgICAgb3JkID0gJ3JkJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJzQnOlxuICAgICAgICAgICAgY2FzZSAnNSc6XG4gICAgICAgICAgICBjYXNlICc2JzpcbiAgICAgICAgICAgIGNhc2UgJzcnOlxuICAgICAgICAgICAgY2FzZSAnOCc6XG4gICAgICAgICAgICBjYXNlICc5JzpcbiAgICAgICAgICAgIGNhc2UgJzAnOlxuICAgICAgICAgICAgICAgIG9yZCA9ICd0aCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG4gKyBvcmQ7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB2YWx1ZVxuICAgICAqIEBwYXJhbSBhcnJcbiAgICAgKiBAcGFyYW0gcHJvcFxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAgICovXG4gICAgZ2V0SW5kZXggKHZhbHVlLCBhcnIsIHByb3ApIHtcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYoYXJyW2ldW3Byb3BdID09PSB2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiAtMTsgLy90byBoYW5kbGUgdGhlIGNhc2Ugd2hlcmUgdGhlIHZhbHVlIGRvZXNuJ3QgZXhpc3RcbiAgICB9XG5cbn07XG5cblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvY2EvY2EudXRpbHMuanMiXSwic291cmNlUm9vdCI6IiJ9