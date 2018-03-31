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

    var rounds = {};

    function split( val ) {
        return val.split( /,\s*/ );
    }

    function extractLast( term ) {
        return split( term ).pop();
    }

    function fillSports(selector, topSports, fullSports, callback){

        var el = $(selector), fullSportsLoaded;

        el.autocomplete({
            source: topSports,
            minLength: 0,
            delay: 500,
            search : function(event){
                if ( !fullSportsLoaded && $(event.target).val() !== "") {
                    $(event.target).autocomplete("option", "source", fullSports);
                }
                fullSportsLoaded = true;
            },
            select: function( event, ui ) {

                var target = $(event.target),
                    value = ui.item.value;

                event.preventDefault();

                if (value === "all"){
                    target.autocomplete( "option", "source", fullSports );
                    setTimeout(function(){
                        target.autocomplete("search", "");
                    }, 500);
                    return;
                }

                if (value === "new"){
                    addCustomTemplate(true, true, true);
                    return;
                }

                target
                    .val(ui.item.label)
                    .attr("externalId", value)
                    .trigger('blur');

                if ( callback ) callback.apply(this, arguments);

            }
        }).focus(function(){
            $(this).autocomplete("search", "");
        });
    }

    function fillCategories(){

        var el = $("#event-category-selector"),
            sportId = $("#event-sport-selector").attr("externalId"),
            spinner = el.parent().find("i");

        spinner.show();
        el.attr("disabled", "disabled");
        if ( el.data('autocomplete') ) el.autocomplete('destroy').off();

        ContentArena.Api.getCategories(sportId).done(function ( categories ) {
            el.attr("disabled", null);

            if ( categories.length === 0 ){
                addCustomTemplate( false, true, true );
                spinner.hide();
                return;
            }

            el.show();
            el.autocomplete({
                source: categories,
                minLength : 0,
                select: function( event, ui ) {

                    event.preventDefault();
                    if ( ui.item.value === "new" ){
                        addCustomTemplate( false, true, true );
                        return;
                    }

                    $(event.target).val(ui.item.label).attr("externalId", ui.item.value).blur();
                    fillTournaments(true);
                    $.each(["#event-tournament-selector", "#event-season-selector"], function(k, id){
                        $(id).val("").removeClass("custom-input");
                    });
                    $("#event-schedule-subitems").html("");
                    $(".custom-template-item").hide();
                }
            }).focus(function(){
                $(this).autocomplete("search", "");
            });

            spinner.hide();
        });

    }

    function fillTournaments(silent){

        var sportId = $("#event-sport-selector").attr('externalId'),
            categoryId = $("#event-category-selector").attr('externalId'),
            el = $("#event-tournament-selector"),
            spinner = el.parent().find("i");

        spinner.show();

        el.attr("disabled", "disabled");
        if ( el.data('autocomplete') ) el.autocomplete('destroy').off();

        ContentArena.Api.getTournaments( sportId, categoryId ).done(( tournaments ) => {

            if ( sportId === "sr:sport:5"){

                tournaments = tournaments.filter(function(tournament){
                    return (tournament.label.search("Double") === -1);
                });

                tournaments = tournaments.map(function (tournament) {
                    tournament.label = tournament.label.replace(" Singles", "");
                    return tournament;
                });
            }

            if ( !silent ) fillCategories();

            el.attr("disabled", null);

            if ( tournaments.length === 0 ){
                addCustomTemplate( false, true, true );
                spinner.hide();
                return;
            }

            el.autocomplete({
                source: function(request, response) {
                    var results = $.ui.autocomplete.filter(tournaments, request.term);

                    response(results.slice(0, 300));
                },
                minLength : 0,
                select: function( event, ui ) {
                    event.preventDefault();

                    if ( ui.item.value === "new" ){
                        addCustomTemplate( false, false, true );
                        return;
                    }

                    $(event.target).val(ui.item.label).attr("externalId", ui.item.value).blur();
                    fillSeasons();
                    $("#event-season-selector").val("").removeClass("custom-input");
                    $("#event-schedule-subitems").html("");
                    $(".custom-template-item").children().hide();
                }
            }).focus(function(){
                $(this).autocomplete("search", "");
            });

            spinner.hide();
        });
    }

    function fillSeasons(){
        var options = {
            selector : "#event-season-selector",
            parentSelection : "#event-tournament-selector",
            endpoint : "v1/feed/seasons",
            requestType : "POST",
            /**
             *
             * @param {{ seasons: { season: object}}} response
             * @returns {*}
             */
            getSource : function(response){

                var list;

                if ( response.seasons === undefined || response.seasons.season === undefined ) return false;

                if ( $.isArray(response.seasons.season) ){
                    list = $.map(response.seasons.season, function (item) {
                        return {label: item['@attributes'].name, value: item['@attributes'].id}
                    }).reverse();
                } else {
                    list = [{label: response.seasons.season['@attributes'].name, value: response.seasons.season['@attributes'].id}]
                }

                list.push({
                    label : "Add new",
                    value : "new"
                });

                return list;

            }
        };

        var el = $(options.selector),
            spinner = el.parent().find("i"),
            source;

        spinner.show();

        el.attr("disabled", "disabled");
        if ( el.data('autocomplete') ) el.autocomplete('destroy').off();

        $.ajax({
            url: hosturl + options.endpoint,
            type: options.requestType || "GET",
            data : { id : $(options.parentSelection).attr('externalId') },
            success: function (response) {

                source = options.getSource(response);
                el.attr("disabled", null);
                el.autocomplete({
                    source: source,
                    minLength : 0,
                    select: function( event, ui ) {

                        // Prevent autocomplete plugin default action
                        event.preventDefault();

                        var id,
                            selected = ui.item.value;

                        // Add new functionality
                        if ( selected === "new" ){
                            //addCustomTemplate( false, false, false );
                            ContentArena.Form.addCustomSeason();
                            return;
                        }

                        $(".custom-template-item").hide();

                        id = selected.replace(/\:/g, '-');
                        source = $.grep(source, function (el) {
                            return el.value !== ui.item.value;
                        });


                        $('#event-schedule-subitems')
                            .append('<div class="step1-event-subitem-title standard-button-active season"  mainref="'+ id +'">'+ui.item.label+'</div><div class="step1-event-subitems-container"><div class="step1-event-subitem-title" ref="'+ id +'" >Fixture</div><div class="step1-event-subitems-container is-hidden" id="'+ id +'" ><i class="fa fa-cog fa-spin pos-rel"></i></div></div>');

                        $("[ref="+id+"]").on( "click", function(){

                            var selector = $("#"+id);
                            $(this).toggleClass("standard-button-active");
                            selector.toggle();
                            selector.find("i").show();
                        });

                        $("[mainref="+id+"]").on( "click", function(){
                            $(this).next().remove();
                            $(this).remove();
                            source.unshift({
                                label : ui.item.label,
                                value : ui.item.value
                            });
                        });

                        $( event.target ).autocomplete( "option", "source", source);

                        fillSchedule(id);
                    }
                }).focus(function(){
                    $(this).autocomplete("search", "");
                });

                spinner.hide();
            }
        });
    }

    function fillSchedule( id ){
        $.ajax({
            url: hosturl + "v1/feed/schedules",
            type: "POST",
            data : { id : id.replace(/\-/g, ':') },
            /**
             *
             * @param {{sport_events: {sport_event:{tournament_round:object}}}} response
             */
            success: function (response) {

                var source = [],
                    selector = $('#' + id);

                if ( response.sport_events && response.sport_events.sport_event ){
                    $.each(response.sport_events.sport_event, function (k, item) {

                        var season_id = id,
                            round = item.tournament_round['@attributes'].number || item.tournament_round['@attributes'].type;

                        if ( rounds[season_id] === undefined) rounds[season_id] = {};
                        if ( rounds[season_id][round] === undefined ) rounds[season_id][round] = [];
                        rounds[season_id][round].push(item);

                    });

                    source = $.map(rounds[id], function (item, k) {

                        if ( k === 'undefined' ) k = "";
                        return {label: "Matchday " + k, value: "matchday-"+k}
                    });
                }

                $.each( source, function(k, item){
                    var roundNumber = item.value.replace("matchday-", "");
                    $('#' + id)
                        .append('<div class="step1-event-subitem-title matchday-subitem" ref="'+id + '-' +  item.value +'" >'+item.label+'</div><div class="step1-event-subitems-container is-hidden" id="'+ id + '-' +item.value +'" ></div>');

                    /**
                     * @param {{competitors:{competitor}}} match
                     */
                    $.each( rounds[id][roundNumber], function(k, match){

                        var label = "",
                            selId,
                            attrs = match['@attributes'],
                            competitors = match.competitors.competitor;

                        label += new Date(attrs.scheduled).toISOString().split('T')[0];
                        label += " - ";

                        $.each(competitors, function(k, v){
                            label += v['@attributes'].name + " "
                        });

                        selId = "match-" + match['@attributes'].id.split(":")[2];

                        $('#'+ id + '-' + item.value)
                            .append('<div class="step1-event-subitem-title" ref="'+ id + '-' + item.value +'" id="'+  match['@attributes'].id +'" selId="'+selId+'" >'+label+'</div>');

                        $("[selId="+  selId + "]").data(match);
                    });

                });

                selector.append('<div class="step1-event-subitem-title matchday-subitem-showall" >Show All</div>');
                selector.find("i").remove();

                $(".matchday-subitem:nth-child(n+18)", "#"+ id).hide();

                $(".matchday-subitem-showall", "#"+ id).click(function () {
                    $(".matchday-subitem:nth-child(n+18)", "#"+ id).show();
                    $(this).remove();
                });

                $("#"+id + " .step1-event-subitem-title").click(function(){

                    var subItemId = $(this).attr("ref");

                    $(this).toggleClass("standard-button-active");

                    if ( $(this).attr("id") !== undefined ) return false;

                    if( $(this).hasClass("standard-button-active") ){
                        $('#'+ subItemId).show()
                    } else {
                        $('#'+ subItemId).hide()
                    }
                });

            }
        });
    }

    function htmlIdToApiId( id){
        return id.replace(/\-/g, ':');
    }

    function validateStepOne(){

        var season = $(".season"),
            sports = [],
            website = $("#event-website-selector"),
            hasErrors = false;

        $( ".step1-event-item" ).each(function(k, item){

            var itemInput = $(item).find(".content-input:not('.sport-selector')"),
                required = itemInput.is(":visible") && itemInput.attr("required"),
                name = (itemInput.attr("id")) ? itemInput.attr("id").split("-")[1] : false,
                value,
                externalId;

            if ( itemInput.length > 0){
                externalId = itemInput.attr("externalId");
                value = itemInput.val();

                if ( value ){
                    ContentArena.Content[name] = ContentArena.Content[name] || {};
                    ContentArena.Content[name].value = value;
                    if ( externalId ) ContentArena.Content[name].externalId = externalId;
                } else {
                    ContentArena.Content[name] = null;
                }
            }

            if ( !value && required ){
                $(itemInput).addClass("invalid");
                hasErrors = true;
            }

        });

        if ( website.val() !== "" ){
            ContentArena.Content.website = website.val().split(",");
        }

        if ( ContentArena.Content.eventType === "custom"){
            $(".sport-selector").each( function(){
                sports.push({
                    value : $(this).val(),
                    externalId : $(this).attr("externalId")
                })
            });

            sports.push(ContentArena.Content.sport);
            ContentArena.Content.sports = sports;
        }

        if (ContentArena.Content.eventType === 'database' ){

            // SEASON
            if ( season.length > 0 ){
                ContentArena.Content.seasons = [];
                season.each(function(){
                    ContentArena.Content.seasons.push({
                        value : $(this).html(),
                        externalId : htmlIdToApiId($(this).attr("mainref"))
                    });
                });
            }

            ContentArena.Content.matches = {};

            $(".step1-event-subitem-title.standard-button-active").each(function(k,v){
                var matchday = $(v).attr("ref"),
                    matchId = $(v).attr("id");

                if ( matchId === undefined ){
                    if ( ContentArena.Content.matches[matchday] === undefined ) ContentArena.Content.matches[matchday] = [];
                } else {
                    ContentArena.Content.matches[matchday].push($(v).data());
                }
            });
        }

        $("#event-title").html( ContentArena.Content.getTitle() );

        return !hasErrors;
    }

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
        fillSports( "#"+id, ContentArena.Data.TopSports, ContentArena.Data.FullSports);

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

    function onSelectAutocompleteTag(event, ui ){
        var terms = split( this.value );
        // remove the current input
        terms.pop();
        // add the selected item
        if ( terms.indexOf(ui.item.label) === -1 ) terms.push( ui.item.label );
        // add placeholder to get the comma-and-space at the end
        terms.push( "" );
        this.value = terms.join( ", " );

        $(event.target).blur();

        return false;
    }

    function resetSelector(selectors){
        selectors.forEach( (selector) => $("#event-"+selector+"-selector").val("").attr('externalId', null));
    }

    $("#add-sport-layer").on("click", addSportLayer);

    $(".go-to-rights").on("click", function(){

        if ( !validateStepOne() ) return;

        $("#step2").show();
        $("#step1").hide();

        window.onbeforeunload = confirmExit;
        function confirmExit() {
            console.log("leaving page");
            return "You have attempted to leave this page. Are you sure?";
        }
    });

    $("#event-customEnd-selector, #event-customStart-selector, #event-availability-selector, #expiration-date, .installment-date").datepicker();

    $('.file-selector').off().focus(function(e){
        var targetId = "#" + $(this).attr("ref");
        $(this).blur();
        $( targetId ).trigger("click");
        e.preventDefault();
    });

    $('#event-website-selector').mask("A", {
        translation: {
            "A": { pattern: /[\w/\-.+]/, recursive: true }
        }
    });

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

    /**
     * Fills the sport selector
     */
    ContentArena.Api.getSports().done( (sports ) => {
        ContentArena.Data.FullSports = sports;
        fillSports( "#event-sport-selector", ContentArena.Data.TopSports, ContentArena.Data.FullSports, function( event, ui){
            ContentArena.Content.sport = {
                value : ui.item.label,
                externalId :ui.item.value
            };

            if ( ContentArena.Content.eventType === "custom") return;

            $("#event-schedule-subitems").html("");

            resetSelector(["category", "tournament", "season"]);
            fillTournaments();
        });
    });

    /**
     * Fills company users tagging tool
     */
    $.ajax({
        url: envhosturl + "v1/feed/company",
        type: "GET",

        success: function (response) {
            /**
             * @param {{email:string}} item
             */
            var source = $.map(response, function (item) {
                return {label: item.email, value: item.id}
            });

            $(  "#tag-members" ).autocomplete({
                source: function( request, response ) {
                    // delegate back to autocomplete, but extract the last term
                    response( $.ui.autocomplete.filter(
                        source, extractLast( request.term ) ) );
                },
                minLength: 0,
                select: onSelectAutocompleteTag
            }).focus(function(){
                $(this).autocomplete("search", "");
            });
        }
    });

    $(".package-ready-button").hide();
    $(".custom-template-item").hide();
    $(".step1-container").show();

    ContentArena.Test.validateStepOne = validateStepOne;

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

});
