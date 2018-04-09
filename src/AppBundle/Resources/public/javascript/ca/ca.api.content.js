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
        var deferred = jQuery.Deferred(),
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

};


