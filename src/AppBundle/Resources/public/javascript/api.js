/**
 * Created by JuanCruz on 4/1/2018.
 */

$(function () {

    let __apiStore = {
        tournaments : {}
    };

    window.ContentArena = window.ContentArena || {};

    ContentArena.Api= {
        sortByLabel (a, b) {
            return (a.label > b.label) ? 1 : ((b.label > a.label) ? -1 : 0)
        },

        prepareList ( list, categoryId ) {

            let _this = this;

            list = $.map(list, function (item) {

                // Filter by category
                if ( categoryId && item.category['@attributes'].id != categoryId) return null;

                return {label: item['@attributes'].name, value: item['@attributes'].id}
            });

            list.sort(_this.sortByLabel);
            list.push({
                label : "Add new",
                value : "new"
            });

            return list;
        },

        getContent ( filter) {
            var deferred = jQuery.Deferred(),
                _this = this;

            $.ajax({
                url: envhosturl + "buy/search",
                type: "POST",
                data : filter,
                success: function (response) {
                    deferred.resolve(response);
                },
                error : function (data, status) {
                    deferred.reject({
                        data: data,
                        status: status
                    });
                }
            });

            return deferred.promise();
        },

        saveFilter ( filter) {
            var deferred = jQuery.Deferred(),
                _this = this;

            $.ajax({
                url: envhosturl + "buy/filter/save",
                type: "POST",
                data : filter,
                success: function (response) {
                    deferred.resolve(response);
                },
                error : function (data, status) {
                    deferred.reject({
                        data: data,
                        status: status
                    });
                }
            });

            return deferred.promise();
        },

        getSports () {
            var deferred = jQuery.Deferred(),
                _this = this;

            $.ajax({
                url: hosturl + "v1/feed/sports",
                type: "GET",
                /**
                 * @param {{sport:object}} response
                 */
                success: function (response) {

                    var sports = _this.prepareList( response.sport);
                    deferred.resolve(sports);
                },
                error : function (data, status) {
                    deferred.reject({
                        data: data,
                        status: status
                    });
                }
            });

            return deferred.promise();
        },

        getContentData( info) {
            var deferred = jQuery.Deferred(),
                _this = this;

            $.ajax({
                url: envhosturl + "sell/content/data",
                type: "POST",
                data:info,
                success: function (response) {
                    deferred.resolve(response);
                },
                error : function (data, status) {
                    deferred.reject({
                        data: data,
                        status: status
                    });
                }
            });

            return deferred.promise();
        },

        getActiveListings( ) {
            var deferred = jQuery.Deferred(),
                _this = this;

            $.ajax({
                url: envhosturl + "sell/active/listings",
                type: "POST",
                data: {id:1},
                success: function (response) {
                    deferred.resolve(response);
                },
                error : function (data, status) {
                    deferred.reject({
                        data: data,
                        status: status
                    });
                }
            });

            return deferred.promise();
        },

        getCategories ( sportId ) {
            var deferred = jQuery.Deferred(),
                _this = this,
                list = [],
                cats = [];

            _this.getTournaments(sportId).done(function () {

                if ( ! __apiStore.tournaments[sportId] ) {
                    deferred.resolve( [] );
                    return;
                }

                list = $.map( __apiStore.tournaments[sportId].tournament , function (item) {

                    let id = item.category['@attributes'].id;

                    if ( cats.indexOf(id) !== -1 ) {
                        return null;
                    } else {
                        cats.push( id );
                        return item.category;
                    }
                });

                deferred.resolve(_this.prepareList(list) );
            });


            return deferred.promise();
        },

        getTournaments ( sportId, categoryId ) {
            var deferred = jQuery.Deferred(),
                _this = this;

            if ( __apiStore.tournaments[sportId] !== undefined ){
                deferred.resolve(_this.prepareList(__apiStore.tournaments[sportId].tournament, categoryId));
                return deferred.promise();
            }

            $.ajax({
                url: hosturl + "v1/feed/tournaments",
                type: "POST",
                data : { id : sportId },
                /**
                 * @param {{tournaments:{tournament:Array}}} response
                 */
                success: function (response) {

                    // A comment
                    if ( response.tournaments === undefined || response.tournaments.tournament === undefined ) {
                        deferred.resolve([]);
                        return;
                    }

                    __apiStore.tournaments[sportId] = response.tournaments;
                    deferred.resolve(_this.prepareList(response.tournaments.tournament, categoryId));
                },
                error : function (data, status ) {
                    deferred.reject({
                        data: data,
                        status: status
                    });
                }
            });

            return deferred.promise();
        }

    };


});


