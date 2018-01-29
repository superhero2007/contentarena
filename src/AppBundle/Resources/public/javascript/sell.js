/**
 * Created by JuanCruz on 4/1/2018.
 */

$(function () {

    var data = {}, regions, countryCodes= [], rounds = {}, current_date = new Date(), eventData = {};

    var selectorCounter = 0,
        mainPackage = null;

    function checkSelectedPackages() {
        $(".select-box-item-container").hide();

        $.each($(".package-selector"), function (i, pack) {

            var id = $(pack).attr("id").split("-")[1];

            if (pack.checked) {
                $(".has-package-" + id).show();
                $("#sell-box-package-" + id).show();
            }
        });

        $.each($(".seller-box-content"), function () {
            if ($(this).children().length == 0) {
                $(this).parent().hide()
            } else {
                if ($(this).children().first().css("display") == 'none') {
                    $(this).parent().hide()
                }
            }
        });

        $("#main-sell-box").show();
        $("#price-sell-box").show();
        $(".package-ready-button").show();
        $("#price-sell-box .select-box-item-container").show();
    }

    function loadRegions(){
        $.ajax({
            url: hosturl + "v1/feed/test",
            type: "GET",
            success: function (response) {
                regions = response
            }
        });
    }

    function addLanguageBehaviour(){

        $.each($(".has-language-trigger"),function(k,el){
            $(el).uls({
                onSelect: function (language) {
                    var languageName = $.uls.data.getAutonym(language);
                    var el = this.$element;
                    el.before("<div title='language' class='selected-language'>"+languageName+", </div>");
                },
                quickList: ['en','fr', 'es']
            });
        });

    }

    function fillTournaments(){
        fillSelector({
            selector : "#event-tournament-selector",
            selection : "#event-tournament-selection",
            parentSelection : "#event-sport-selection",
            endpoint : "v1/feed/tournaments",
            requestType : "POST",
            getSource : function(response){
                var categoryId = $("#event-country-selection").attr('selected-id');

                if ( response.tournaments === undefined || response.tournaments.tournament === undefined ) return false;

                return $.map(response.tournaments.tournament, function (item) {

                    if ( item.category['@attributes'].id != categoryId) return null;

                    return {label: item['@attributes'].name, value: item['@attributes'].id}
                });
            },
            callback : fillSeasons
        })
    }

    function fillSeasons(){
        fillSelector({
            selector : "#event-season-selector",
            selection : "#event-season-selection",
            parentSelection : "#event-tournament-selection",
            endpoint : "v1/feed/seasons",
            requestType : "POST",
            getSource : function(response){

                if ( response.seasons === undefined || response.seasons.season === undefined ) return false;

                return $.map(response.seasons.season, function (item) {
                    return {label: item['@attributes'].name, value: item['@attributes'].id}
                });
            },
            callback : fillSchedule
        })
    }

    function fillSchedule(){
        fillMultipleSelector({
            selector : "#event-schedule-selector",
            selection : "#event-schedule-selection",
            parentSelection : "#event-season-selection",
            endpoint : "v1/feed/schedules",
            requestType : "POST",
            getSource : function(response){

                var tournament = $("#event-tournament-selection").attr("selected-id");

                console.log(response);

                if ( response.sport_events === undefined || response.sport_events.sport_event === undefined ) return false;


                $.each(response.sport_events.sport_event, function (k, item) {

                    var tournament_id = item.tournament['@attributes'].id,
                        round = item.tournament_round['@attributes'].number;

                    if ( rounds[tournament_id] == undefined) rounds[tournament_id] = {};
                    if ( rounds[tournament_id][round] == undefined ) rounds[tournament_id][round] = [];
                    rounds[tournament_id][round].push(item);

                });

                console.log(rounds)

                return $.map(rounds[tournament], function (item, k) {
                    return {label: "Matchday " + k, value: "matchday-"+k}
                });

                /*return $.map(response.sport_events.sport_event, function (item) {

                    var label = "",
                        attrs = item['@attributes'],
                        competitors = item.competitors.competitor;

                    label += new Date(attrs.scheduled).toISOString().split('T')[0];
                    label += " - ";

                    $.each(competitors, function(k, v){
                        label += v['@attributes'].name + " "
                    });

                    return {label: label, value: item['@attributes'].id}
                });*/
            }
        })
    }

    function fillCategories(){
        fillSelector({
            selector : "#event-country-selector",
            selection : "#event-country-selection",
            parentSelection : "#event-sport-selection",
            endpoint : "v1/feed/categories",
            requestType : "POST",
            getSource : function(response){
                if ( response.categories === undefined || response.categories.category === undefined ) return false;
                return $.map(response.categories.category, function (item) {
                    if ( $.inArray(item['@attributes'].country_code, countryCodes) == -1 ) return null;
                    return {label: item['@attributes'].name, value: item['@attributes'].id}
                });
            },
            callback : fillTournaments
        })
    }

    function fillSelector( options ){

        var el = $(options.selector),
            spinner = el.parent().find("i");

        spinner.show();

        el.attr("disabled", "disabled");
        if ( el.data('autocomplete') ) el.autocomplete('destroy').off();

        $.ajax({
            url: hosturl + options.endpoint,
            type: options.requestType || "GET",
            data : { id : $(options.parentSelection).attr('selected-id') },
            success: function (response) {

                var source = options.getSource(response);
                el.attr("disabled", null);
                el.autocomplete({
                    source: source,
                    minLength : 0,
                    select: function( event, ui ) {
                        event.preventDefault();
                        $(options.selection).attr("selected-id", ui.item.value);
                        $(event.target).val(ui.item.label).blur();
                        if ( options.callback ) options.callback.call();
                    }
                }).focus(function(){
                   $(this).autocomplete("search", "");
                });

                spinner.hide();
            }
        });
    }

    function fillMultipleSelector( options ){
        var el = $(options.selector),
            spinner = el.parent().find("i");

        spinner.show();

        el.attr("disabled", "disabled");
        if ( el.data('autocomplete') ) el.autocomplete('destroy').off();

        $.ajax({
            url: hosturl + options.endpoint,
            type: options.requestType || "GET",
            data : { id : $(options.parentSelection).attr('selected-id') },
            success: function (response) {

                var source = options.getSource(response),
                    tournament = $("#event-tournament-selection").attr("selected-id");
                el.attr("disabled", null);
                $('#event-schedule-subitems').parent().show();
                $.each( source, function(k, item){
                    var roundNumber = item.value.replace("matchday-", "");
                    $('#event-schedule-subitems')
                        .append('<div class="step1-event-subitem-title" ref="'+ item.value +'" >'+item.label+'</div><div class="step1-event-subitems-container is-hidden" id="'+ item.value +'" ></div>');

                    $.each( rounds[tournament][roundNumber], function(k, match){

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

                        $('#'+ item.value)
                            .append('<div class="step1-event-subitem-title" ref="'+ item.value +'" id="'+  match['@attributes'].id +'" selId="'+selId+'" >'+label+'</div>');

                        $("[selId="+  selId + "]").data(match);
                    });

                });

                $("#event-schedule-subitems .step1-event-subitem-title").click(function(){

                    var id = $(this).attr("ref");

                    $(this).toggleClass("standard-button-active");

                    if( $(this).hasClass("standard-button-active") ){
                        $('#'+ id).show()
                    } else {
                        $('#'+ id).hide()
                    }
                });

                spinner.hide();
            }
        });
    }

    function validateStepOne(){

        var eventTypeSelector = $(".event-origin-selector.standard-button-active").attr("ref"),
            eventType = eventTypeSelector.split("-")[0],
            hasErrors = false;

        if ( $("#series-events-selector").hasClass("standard-button-active") ) {
            eventTypeSelector += ", .custom-series-event-item";
        }

        eventData = {};
        eventData.eventType = eventType;

        $("." + eventTypeSelector).each(function(k, item){

            var itemSelection = $(item).find(".step1-event-item-content"),
                itemInput = $(item).find(".step1-event-input-content"),
                input = $(item).find("input"),
                id,
                required = itemSelection.attr("required"),
                name;


            if ( itemSelection.length > 0 ){
                id  = itemSelection.attr("selected-id");
                name = (itemSelection.attr("id")) ? itemSelection.attr("id").split("-")[1] : false;

                if ( name && id && eventData[name] == undefined ) eventData[name] = {
                    name : itemSelection.html(),
                    value : (id == "-") ? itemSelection.html() : id
                };

            } else if ( itemInput.length > 0){
                name = (itemInput.attr("id")) ? itemInput.attr("id").split("-")[1] : false;
                id = itemInput.val();
                if ( name && id && eventData[name] == undefined ) eventData[name] = {
                    value : id
                };
            }


            if ( !id && required ){
                $(input).addClass("invalid");
                hasErrors = true;
            }

        });

        if (eventType == 'database' ){

            eventData.matches = {};

            $(".step1-event-subitem-title.standard-button-active").each(function(k,v){
                var matchday = $(v).attr("ref"),
                    matchId = $(v).attr("id");

                if ( matchId == undefined ){
                    if ( eventData.matches[matchday] == undefined ) eventData.matches[matchday] = [];
                } else {
                    eventData.matches[matchday].push($(v).data());
                }
            });

            if ( $.isEmptyObject(eventData.matches) ){
                $("#event-schedule-selector").addClass("invalid");
                hasErrors = true;
            }
        }

        console.log(eventData);

        return !hasErrors;
    }

    function validateStepTwo(){


        var rights = {},
            rightItems = [];

        $("input[type=checkbox]:checked", ".seller-box-content-rights").each(function(k, el){

            var rightId = $(el).attr("right-id"),
                rightItemId = $(el).attr("right-item-id"),
                values = [];

            $(el).parent().next().find("input").each(function(k,v){
                values.push( $(v).val() );
            });

            if ( rights[rightId] == undefined ) rights[rightId] = [];
            rights[rightId].push({
                id : rightItemId,
                values : values
            });

            rightItems.push({
                id : rightItemId,
                values : values,
                right : rightId
            })

        });

        eventData.rights = rights;
        eventData.rightItems = rightItems;
        eventData.packages = [];
        $(".package-selector:checked").each(function(k,v){
            eventData.packages.push($(v).attr("id").split("-")[1] );
        });
        eventData.salesMethod = $("input:checked", "#sales-method-selector").val();
        eventData.fee = {
            amount : $( "#fee-selector").val(),
            currency : $("input:checked", "#fee-currency-selector").val()
        };
        eventData.territories = $("input:checked", "#territories-selector").val();

        console.log(eventData);
    }

    function submitform() {
        var url = hosturl + 'sell/published';

        $('#myform').attr('action', url);

        var data = JSON.stringify(eventData);

        $('<input type="hidden" name="json"/>').val(data).appendTo('#myform');
        $("#myform").submit();
    }

    $(".package-selector").change(function () {

        var id = $(this).attr("id").split("-")[1],
            name = $(this).attr("name").split("-")[1];

        checkSelectedPackages();

        /*if ( selectorCounter == 0 ){
            $(".main-specify").html(name);
        } else {
            $(".main-specify").html("collectively");
        }*/

        if (!this.checked || selectorCounter >= 1) return;

        $.each($(".package-selector"), function (i, pack) {

            var packages = $(pack).data("packages"),
                pack_id = $(pack).attr("id").split("-")[1],
                el = $(this),
                flag = false;

            $.each(packages.parent, function (i, p) {
                if (p.id == id) flag = true;
            });

            if (!flag){
                el.attr("disabled", "disabled");
                if (pack_id != id) el.parent().next().addClass("disabled");
            }

        });

        $("#sell-box").removeClass("is-hidden");

        mainPackage = name;
        selectorCounter++;

    });

    $("#reset-packages").click(function () {
        $.each($(".package-selector"), function (i, pack) {

            pack.checked = false;
            $(pack).attr("disabled", null);
            $(pack).parent().next().removeClass("disabled");
            $("#main-sell-box").hide();
            $(".select-box-item-container").hide();
            $(".sell-items-box").hide();
            $("#price-sell-box").hide();
            $(".package-ready-button").hide();
            selectorCounter = 0;


        });
    });

    $(".event-origin-selector").click(function(){

        var ref = $(this).attr("ref");

        $.each($(".event-origin-selector"), function(k, v){
            $(v).toggleClass("standard-button-active");
        });

        $(".step1-event-item").hide();
        $("." + ref).show();

    });

    $("#single-events-selector").click(function(){
        $(this).addClass("standard-button-active");
        $("#series-events-selector").removeClass("standard-button-active");
        $(".custom-series-event-item").hide();
    });

    $("#series-events-selector").click(function(){
        $(this).addClass("standard-button-active");
        $("#single-events-selector").removeClass("standard-button-active");
        $(".custom-series-event-item").show();
    });

    $(".go-to-rights").click(function(){

        if ( !validateStepOne() ) return;

        $("#step2").show();
        $("#step1").hide();
    });

    $("#submit-listing").click(function(){

        validateStepTwo();
        submitform();
    });

    $(".has-datepicker").datepicker();

    $(".unselect-others").change(function(){

        var _this = this;

        $.each($(this).parent().parent().siblings(), function (k, item) {
            if ( _this != item ) $(item).find("input").attr("checked", false);
        });
    });

    $(".unselect-all").change(function(){

        $.each($(this).parent().parent().siblings(), function (k, item) {
            if ( $(item).hasClass('all-type') ) $(item).find("input").attr("checked", false);
        });
    });

    /**
     * Renders all the tooltips
     */
    $( document ).tooltip();

    /**
     * Fills the sport selector
     */
    $.ajax({
        url: hosturl + "v1/feed/sports",
        type: "GET",
        success: function (response) {
            data.sports = $.map(response.sport, function (item) {
                return {label: item['@attributes'].name, value: item['@attributes'].id}
            });

            data.sports.sort(function(a,b) {return (a.label > b.label) ? 1 : ((b.label > a.label) ? -1 : 0);} );
        }
    });

    $( "#event-sport-selector" ).autocomplete({
        source: [
            { label : "Soccer", value: "sr:sport:1"},
            { label : "Basketball", value: "sr:sport:2"},
            { label : "Baseball", value: "sr:sport:3"},
            { label : "Tennis", value: "sr:sport:5"},
            { label : "Cricket", value: "sr:sport:21"},
            { label : "Field Hockey", value: "sr:sport:24"},
            { label : "Volleyball", value: "sr:sport:23"},
            { label : "Table Tennis", value: "sr:sport:20"},
            { label : "Golf", value: "sr:sport:9"},
            { label : "American Football", value: "sr:sport:16"},
            { label : "Handball", value: "sr:sport:6"},
            { label : "Show All", value: "all"}
        ],
        minLength: 0,
        select: function( event, ui ) {
            event.preventDefault();

            if (ui.item.value == "all"){
                $( "#event-sport-selector" ).autocomplete( "option", "source", data.sports );
                setTimeout(function(){
                    $( "#event-sport-selector" ).autocomplete("search", "");
                }, 500);

                return;
            }

            $("#event-sport-selection").attr("selected-id", ui.item.value);
            $(event.target).val(ui.item.label).blur();
            $( "#event-territory-selector").attr('disabled', null);

        }
    }).focus(function(){
       $(this).autocomplete("search", "");
    });

    /**
     * Fills the territory selector.
     * The value tries to match the country code with the region code.
     * The region code comes from a static JSON file and the country code is used in the Sportradar API
     */
    $( "#event-territory-selector" ).autocomplete({
        source : [
            { label: "Africa", value : 2},
            { label: "Europe", value : 150},
            { label: "America", value : 19},
            { label: "Asia", value : 142},
            { label: "Oceania", value : 9 },
            { label: "World", value : 0 }
        ],
        minLength: 0,
        select: function( event, ui ) {
            event.preventDefault();
            $("#event-territory-selection").attr("selected-id", ui.item.value);
            $(event.target).val(ui.item.label).blur();

            countryCodes = $.map(regions, function(i){
                if ( i["region_code"]== ui.item.value) return i["country_code"]
            });

            fillCategories();

        }
    }).focus(function(){
       $(this).autocomplete("search", "");
    });

    /**
     * Fills the program type selector
     */
    $( "#event-programType-selector" ).autocomplete({
        source : [
            { label: "Magazine", value : 0},
            { label: "Highlight show", value : 1},
            { label: "Preview", value : 2},
            { label: "Talk-show", value : 3},
            { label: "Documentary", value : 4 },
            { label: "Other", value : 5 }
        ],
        minLength: 0,
        select: function( event, ui ) {
            event.preventDefault();
            $("#event-programType-selection").attr("selected-id", ui.item.value);
            $(event.target).val(ui.item.label).blur();
        }
    }).focus(function(){
        $(this).autocomplete("search", "");
    });

    $( "#event-year-selector" ).autocomplete({
        source : [
            { label: current_date.getFullYear(), value : current_date.getFullYear()},
            { label: current_date.getFullYear() + 1, value : current_date.getFullYear() + 1 },
            { label: current_date.getFullYear() + 2, value : current_date.getFullYear() + 2 },
            { label: current_date.getFullYear() + 3, value : current_date.getFullYear() + 3 },
            { label: current_date.getFullYear() + 4, value : current_date.getFullYear() + 4 },
            { label: "to be announced", value : 0 }
        ],
        minLength: 0,
        select: function( event, ui ) {
            event.preventDefault();
            $("#event-year-selection").attr("selected-id", ui.item.value);
            $(event.target).val(ui.item.label).blur();
        }
    }).focus(function(){
       $(this).autocomplete("search", "");
    });

    $( "#event-duration-selector" ).mask('00:00').blur(function() {
        if( $(this).val() != "") {
            $( "#event-duration-selection").attr("selected-id", "-");
        }
    }).keyup(function(e) {
        if (e.keyCode === 13){
            $(this).blur();
        }
    });

    $( "#event-programName-selector").blur(function() {
        if( $(this).val() != "") {
            $( "#event-programName-selection").attr("selected-id", "-");
        }
    }).keyup(function(e) {
        if (e.keyCode === 13){
            $(this).blur();
        }
    });

    $( "#event-programs-selector").blur(function() {
        if( $(this).val() != "") {
            $( "#event-programs-selection").attr("selected-id", "-");
        }
    }).keyup(function(e) {
        if (e.keyCode === 13){
            $(this).blur();
        }
    });

    $("#event-availability-selector").datepicker({
        onSelect : function(date){
            $("#event-availability-selection").attr("selected-id", "-");
        }
    });

    $('#event-file-selector').off().focus(function(e){
        $(this).blur();
        $('#event-file-selector-hidden').trigger("click");
        e.preventDefault();
    });

    $('#event-file-selector-hidden').change(function(){
        $('#event-file-selector').val($(this).val());
    });

    $("input").focus(function(){ $(this).removeClass("invalid")});

    $('#event-website-selector').mask("A", {
        translation: {
            "A": { pattern: /[\w/\-.+]/, recursive: true }
        }
    });

    /**
     * Initialization
     */
    addLanguageBehaviour();
    loadRegions();

    $(".step1-event-item").hide();
    $(".step1-container").show();
    $(".database-event-item").show();

});
