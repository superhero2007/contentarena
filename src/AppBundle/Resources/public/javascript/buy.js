/**
 * Created by JuanCruz on 4/1/2018.
 */


$(function () {

    ContentArena.Api.getSports().done((sports) => {
        ContentArena.Data.FullSports = sports;

        var container = $("#filter-sports")
            .find(".subfilter-container")
            .first();

        ContentArena.Data.TopSports.forEach(function (sport) {
            container.append("<div class=\"sport subfilter\" name=\""+sport.label+"\" id=\"sport-"+sport.value+"\" toggle>"+sport.label+"</div>")
        });

    });

});