/**
 * Created by JuanCruz on 4/1/2018.
 */

$(function () {

    window.ContentArena = window.ContentArena || {};

    //$( "#event-customAmount-selector" )

    $("#add-more-fixtures").on("click", function(){

        var template = $.templates("#custom-fixture-template"),
            salesPackages = $(".custom-fixtures"),
            id = salesPackages.length + 1,
            htmlOutput = template.render({id: id });

        salesPackages.last().after(htmlOutput);
        $("#custom-fixture-date-" + id).datepicker();
    });

    $("#custom-fixture-date-1").datepicker();

});
