/**
 * Created by JuanCruz on 4/1/2018.
 */

$(function () {

    window.ContentArena = window.ContentArena || {};
    ContentArena.Form = ContentArena.Form || {};

    ContentArena.Form.addCustomSeason = function( id, containerSelector ){
        var template = $.templates("#season-template"),
            fixtureTemplate = $.templates("#custom-fixture-template"),
            container = $(containerSelector || "#event-schedule-subitems"),
            seasonData = {
                id : $(".custom-season-container", container).length + 1,
                startYear: new Date().getFullYear(),
                endYear: new Date().getFullYear() + 1,
            },
            seasonElement = $(template.render(seasonData)) ;

        container.append( seasonElement );

        $(".remove-season", seasonElement ).on("click", function () {
            seasonElement.remove();
        });

        $(".add-fixture", seasonElement ).on("click", function () {
            var fixtureContainer = $(".custom-fixtures", seasonElement),
                fixture = $(fixtureTemplate.render({
                    id : fixtureContainer.children().length + 1,
                    seasonId: seasonData.id
                }) );

            fixtureContainer.append( fixture );

            $(".fixture-date", fixture ).datepicker();

        });

        $(".fixture-date").datepicker();
    };


});
