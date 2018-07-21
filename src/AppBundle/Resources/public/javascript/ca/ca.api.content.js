/**
* Created by JuanCruz on 4/1/2018.
*/

let __apiStore = {
    tournaments : {}
};

window.ContentArena = window.ContentArena || {};
ContentArena.ContentApi = ContentArena.ContentApi|| {};

ContentArena.ContentApi= {
    saveContentAsDraft ( content ) {
        let deferred = jQuery.Deferred(),
            _this = this;

        $.ajax({
            url: envhosturl + "content/draft/save",
            type: "POST",
            data: JSON.stringify(content),
            contentType: "application/json",
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
    saveContentAsInactive ( content ) {
        let deferred = jQuery.Deferred(),
            _this = this;

        $.ajax({
            url: envhosturl + "api/listing/save",
            type: "POST",
            data: JSON.stringify(content),
            contentType: "application/json",
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
    saveContentAsActive ( content ) {
        let deferred = jQuery.Deferred(),
            _this = this;

        $.ajax({
            url: envhosturl + "api/listing/publish",
            type: "POST",
            data: JSON.stringify(content),
            contentType: "application/json",
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
    placeBid ( bid ) {
        let deferred = jQuery.Deferred(),
            _this = this;

        $.ajax({
            url: envhosturl + "api/bid/place",
            type: "POST",
            data: JSON.stringify(bid),
            contentType: "application/json",
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
    saveTmpFile ( files ) {
        let deferred = jQuery.Deferred(),
            _this = this;

        const data = new FormData();
        data.append('file', files[0]);

        $.ajax({
            url: envhosturl + "content/save/file",
            type: "POST",
            data: data,
            processData: false,
            contentType: false,
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
    getByCustomId ( customId ) {
        var deferred = jQuery.Deferred(),
            _this = this;

        $.ajax({
            url: envhosturl + "listing/details",
            type: "POST",
            data: {
                customId : customId,
            },
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

    getDraftListings ( ) {
        let deferred = jQuery.Deferred();

        $.ajax({
            url: envhosturl + "api/listings/draft",
            type: "POST",
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
    getInactiveListings ( ) {
        let deferred = jQuery.Deferred();

        $.ajax({
            url: envhosturl + "api/listings/inactive",
            type: "POST",
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
    getActiveListings ( ) {
        let deferred = jQuery.Deferred();

        $.ajax({
            url: envhosturl + "api/listings/active",
            type: "POST",
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
    getExpiredListings ( ) {
        let deferred = jQuery.Deferred();

        $.ajax({
            url: envhosturl + "api/listings/expired",
            type: "POST",
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
    removeListing( customId ) {
        var deferred = jQuery.Deferred(),
            _this = this;

        $.ajax({
            url: envhosturl + "api/listings/remove",
            type: "POST",
            data: {
                customId : customId,
            },
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
    duplicateListing( customId ) {
        var deferred = jQuery.Deferred(),
            _this = this;

        $.ajax({
            url: envhosturl + "api/listings/duplicate",
            type: "POST",
            data: {
                customId : customId,
            },
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
    deactivateListing( customId ) {
        var deferred = jQuery.Deferred(),
            _this = this;

        $.ajax({
            url: envhosturl + "api/listings/deactivate",
            type: "POST",
            data: {
                customId : customId,
            },
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

    getClosedDeals (  ) {
        let deferred = jQuery.Deferred();

        $.ajax({
            url: envhosturl + "api/bid/closed",
            type: "POST",
            data: {
            },
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
    getAllDeals (  ) {
        let deferred = jQuery.Deferred();

        $.ajax({
            url: envhosturl + "api/bid/all",
            type: "POST",
            data: {
            },
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
    getPendingDeals (  ) {
        let deferred = jQuery.Deferred();

        $.ajax({
            url: envhosturl + "api/bid/pending",
            type: "POST",
            data: {
            },
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
    getRejectedDeals (  ) {
        let deferred = jQuery.Deferred();

        $.ajax({
            url: envhosturl + "api/bid/rejected",
            type: "POST",
            data: {
            },
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
    getWatchlistListings (){
        var deferred = jQuery.Deferred(),
            _this = this;

        $.ajax({
            url: envhosturl + "api/listings/watchlist",
            type: "POST",
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

};


