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


    function fillSports(selector, topSports, fullSports, callback) {

        var el = $(selector), fullSportsLoaded;

        el.autocomplete({
            source: topSports,
            minLength: 0,
            delay: 500,
            search: function (event) {
                if (!fullSportsLoaded && $(event.target).val() !== "") {
                    $(event.target).autocomplete("option", "source", fullSports);
                }
                fullSportsLoaded = true;
            },
            select: function (event, ui) {

                var target = $(event.target),
                    value = ui.item.value;

                event.preventDefault();

                if (value === "all") {
                    target.autocomplete("option", "source", fullSports);
                    setTimeout(function () {
                        target.autocomplete("search", "");
                    }, 500);
                    return;
                }

                if (value === "new") {
                    addCustomTemplate(true, true, true);
                    return;
                }

                target
                    .val(ui.item.label)
                    .attr("externalId", value)
                    .trigger('blur');

                if (callback) callback.apply(this, arguments);

            }
        }).focus(function () {
            $(this).autocomplete("search", "");
        });
    }

});