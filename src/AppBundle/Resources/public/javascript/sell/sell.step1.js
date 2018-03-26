/**
 * Created by JuanCruz on 4/1/2018.
 */

$(function () {

    window.ContentArena = window.ContentArena || {};
    ContentArena.Form = ContentArena.Form || {};

    ContentArena.Form.addCustomSeason = function( id, containerSelector ){
        var container = $(containerSelector || "#event-schedule-subitems"),
            seasonNumber = $(".custom-season-container", container).length + 1,
            source = $("#event-season-selector").autocomplete( "option", "source" ),
            hasSeason = source.length > 0,
            labels = (hasSeason) ? source[0].label.split(" ") : [],
            seasonYear = (hasSeason) ? labels.pop() : new Date().getFullYear() ,
            startYear = (hasSeason) ? ( seasonYear.search("/") !== -1 ) ? Number(seasonYear.split("/")[0]) + seasonNumber : Number(seasonYear) + seasonNumber : seasonYear ,
            endYear = (hasSeason) ? ( seasonYear.search("/") !== -1 ) ? Number(seasonYear.split("/")[1]) + seasonNumber : null : seasonYear ,
            seasonName = (hasSeason) ? labels.join(" ") : "",
            template = $.templates("#season-template"),
            seasonData = {
                id : seasonNumber,
                name : seasonName,
                startYear: startYear,
                endYear: endYear
            },
            seasonElement = $(template.render(seasonData));

        container.append( seasonElement );

        $(".remove-season", seasonElement ).on("click", function () {
            seasonElement.remove();
        });
    };
});
