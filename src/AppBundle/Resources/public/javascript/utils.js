/**
 * Created by JuanCruz on 4/1/2018.
 */

$(function () {

    window.ContentArena = window.ContentArena || {};

    ContentArena.Utils= {
        addRegionBehaviour( selector ){

            $.ajax({
                url: hosturl + "v1/feed/test",
                type: "GET",
                success: function (response) {

                    response.sort(function(a,b){return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);});

                    $(selector).html("");

                    /**
                     * @param {{ country_code: string }} v
                     */
                    $.each(response, function(k, v){

                        var option = '<option value=' + v.country_code + '>' + v.name + '</option>';

                        $(selector).each(function (key, select) {
                            $(select).append(option);
                        });

                    });

                    $(selector).chosen({ width: "50%"});

                }
            });
        }
    };


});


