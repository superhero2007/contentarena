/**
 * Created by JuanCruz on 4/1/2018.
 */

$(function () {

    window.ContentArena = window.ContentArena || {};
    ContentArena.Model = ContentArena.Model || {};
    ContentArena.Form = ContentArena.Form || {};
    ContentArena.Test = ContentArena.Test || {};

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
    ContentArena.Content = new ContentArena.Model.Content();

    function addCustomFn( el, placeholder ){
        $(el)
            .off()
            .val("")
            .addClass("custom-input")
            .show()
            .attr("placeholder", placeholder);

        if ( $(el).data('ui-autocomplete') !== undefined ) $(el).autocomplete('destroy');
    }

    function addCustomTemplate( sport, category, tournament){

        if ( sport ) addCustomFn("#event-sport-selector", "Enter sport name");

        if ( ContentArena.Content.eventType === "custom" ) return;

        if ( category ) addCustomFn("#event-category-selector", "Enter Country/Category");
        if ( tournament ) addCustomFn("#event-tournament-selector", "Enter Tournament");
        /*addCustomFn("#event-season-selector", "Enter Season");
        $("#event-schedule-subitems").html("");
        $(".custom-template-item").show();
        $(".custom-template-item").children().show();*/

        ContentArena.Form.addCustomSeason();
    }

    function addSportLayer(){

        var sportSelector = $(".sport-selector"),
            extraSports = sportSelector.length,
            id = "sport-selector-" + (extraSports + 1),
            template = $.templates(
                "<div class=\"step1-event-item\">\n" +
                "   <i class=\"fa fa-cog fa-spin\"></i>\n" +
                "      <input type=\"text\"\n" +
                "          placeholder=\"Sport\"\n" +
                "          id=\"{{:id}}\"\n" +
                "          class=\"content-input sport-selector\"\n" +
                "          required/> " +
                "<button class=\"remove-button\">Remove</button>\n" +
                "</div>"),
            htmlOutput = template.render({id: id });



        if (extraSports===0){
            $(this).parent().after(htmlOutput);
        } else {
            sportSelector.last().parent().after(htmlOutput);
        }

        $("#"+id).parent().find('button').on('click', function () {
            $(this).parent().remove();

            if(sportSelector.length === 0){
                $("#event-tournament-selector, #event-season-selector").show();
                ContentArena.Content.eventType = "database";
            }
        });

        $("#event-category-selector, #event-tournament-selector, #event-season-selector").hide();
        resetSelector(["category", "tournament", "season"]);

        ContentArena.Content.eventType = "custom";

    }

    function addGenericEpisodes( quantity ){
        var template = $.templates("#episode-template"),
            container = $("#content-details-mask"),
            currentQuantity = container.children().length,
            start = 0;

        if ( currentQuantity > quantity ) container.empty();

        if ( currentQuantity < quantity ) start = currentQuantity;

        for( var i = start; i < quantity; i++){
            container.append(template.render({id: i + 1 }));
        }

        $(".episode-availability-date:not(.hasDatepicker)", container ).datepicker();
        console.log("current : " + currentQuantity, "Goal: " + quantity, "Start: " + start);
    }

    function resetSelector(selectors){
        selectors.forEach( (selector) => $("#event-"+selector+"-selector").val("").attr('externalId', null));
    }

    $("#add-sport-layer").on("click", addSportLayer);

    $("#event-customEnd-selector, #event-customStart-selector, #event-availability-selector, #expiration-date, .installment-date").datepicker();

    $('#license-file-selector-hidden').checkFileType({
        allowedExtensions: [ 'pdf', 'doc', 'docx'],
        success: function() {
        },
        error: function() {
            $('<div />').html('File type not allowed. Please upload a .pdf, .doc or .docx file').dialog();
        }
    });

    $('#event-file-selector-hidden').checkFileType({
        allowedExtensions: ['jpg', 'jpeg','png', 'pdf', 'doc', 'docx'],
        success: function() {
            var targetId = "#" + $(this).attr("ref");
            $( targetId ).val($(this).val());
        },
        error: function() {
            var targetId = "#" + $(this).attr("ref");
            $( targetId ).attr("placeholder", "Allowed: .png, .jpg, .pdf, .doc, .docx").val("");
            $(this).val("");
            $('<div />').html('File type not allowed').dialog();
        }
    });

    $('#image-selector-hidden').checkFileType({
        allowedExtensions: ['jpg', 'jpeg','png'],
        success: function() {
            var targetId = "#" + $(this).attr("ref");
            $( targetId ).val($(this).val());
        },
        error: function() {
            var targetId = "#" + $(this).attr("ref");
            $( targetId ).attr("placeholder", "Allowed: .png, .jpg").val("");
            $(this).val("");
            $('<div />').html('File type not allowed').dialog();
        }
    });

    $(document).on("change", ".unselect-others", function(){

        var _this = this;

        $.each($(this).parent().parent().siblings(), function (k, item) {
            var input = $(item).find("input");
            if ( _this !== item ) {
                input.attr("checked", false);
            } else {
            }

        });
    });

    $(document).on("change", ".select-all", function(){

        var _this = this;

        $.each($(this).parent().parent().siblings(), function (k, item) {
            var input = $(item).find("input[type=checkbox]");
            if ( _this === item ) return;

            if ( _this.checked ){
                input.prop("checked", true);
                input.attr("disabled", "disabled");
            } else {
                input.attr("disabled", false);
            }

        });
    });

    $(document).on("change", ".toggler-checkbox", function () {

        var context = $(this).parent().parent().parent().parent();

        $( $(this).attr("hide") + ", .optional", context ).hide().find("input").val("");

        $("input:checked", context).each(function () {
            var selectorShow = $(this).attr("show");

            if (this.checked){
                $(this).parent().parent().parent().append($( selectorShow, context ).show())
            }
        });



    });

    $(document).on("click", ".close-box", function () {
        $( $(this).attr("ref") ).remove();
    });

    $(document).on("change",".unselect-all", function(){
        $.each($(this).parent().parent().siblings(), function (k, item) {
            if ( $(item).hasClass('all-type') ) $(item).find("input").attr("checked", false);
        });
    });

    $(document).on('change', '#content-details-method-mask', function () {
        var el = $("#episodes-quantity"),
            quantity = Number( el.val() );

        if(this.checked){
            if ( quantity !== "" ) addGenericEpisodes(quantity);
            el.on('change', function () {
                var newQuantity = Number(  $(this).val() );
                addGenericEpisodes(newQuantity);
            });

        } else {
            el.off();
        }
    });

    $(document).on('click', ".episode-availability", function(){
        $(this).parent().find('input').each(function(){
            $(this).removeClass("episode-availability-selected");
        });
        $(this).addClass("episode-availability-selected");

    });

    $(document).on('click', "#download-csv-sheet", function() {
        window.location = envhosturl + "bundles/app/data/content-details.csv";
    });

    $('.website').mask("A", {
        translation: {
            "A": { pattern: /[\w/\-.+]/, recursive: true }
        }
    });

});
