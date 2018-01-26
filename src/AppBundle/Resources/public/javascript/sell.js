/**
 * Created by JuanCruz on 4/1/2018.
 */

$(function () {

    var data = {}, regions, countryCodes= [], rounds = {};

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
                        $(options.selection).attr("selected-id", ui.item.value).html(ui.item.label);
                        $(event.target).val("").blur();
                        if ( options.callback ) options.callback.call();
                    }
                }).focus(function(){
                    if (this.value == ""){
                        $(this).autocomplete("search", "");
                    }
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
                            attrs = match['@attributes'],
                            competitors = match.competitors.competitor;

                        label += new Date(attrs.scheduled).toISOString().split('T')[0];
                        label += " - ";

                        $.each(competitors, function(k, v){
                            label += v['@attributes'].name + " "
                        });

                        $('#'+ item.value)
                            .append('<div class="step1-event-subitem-title">'+label+'</div><div class="step1-event-subitems-container" id="match-'+  match['@attributes'].id +'" ></div>');
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

    $("#select-event").click(function(){
        $("#step1-event").show();
        $("#step1-non-event").hide();
        $(this).addClass("standard-button-active");
        $("#select-non-event").removeClass("standard-button-active");
    });

    $("#select-non-event").click(function(){
        $("#step1-non-event").show();
        $("#step1-event").hide();
        $(this).addClass("standard-button-active");
        $("#select-event").removeClass("standard-button-active");
    });

    $("#single-events-selector").click(function(){
        $(this).addClass("standard-button-active");
        $("#series-events-selector").removeClass("standard-button-active");
    });

    $("#series-events-selector").click(function(){
        $(this).addClass("standard-button-active");
        $("#single-events-selector").removeClass("standard-button-active");
    });

    $(".go-to-rights").click(function(){
        $("#step2").show();
        $("#step1").hide();
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

    $( document ).tooltip();

    $.ajax({
        url: hosturl + "v1/feed/sports",
        type: "GET",
        success: function (response) {
            data.sports = $.map(response.sport, function (item) {
                return {label: item['@attributes'].name, value: item['@attributes'].id}
            });

            $( "#event-sport-selector" ).autocomplete({
                source: data.sports,
                select: function( event, ui ) {
                    event.preventDefault();
                    $("#event-sport-selection").attr("selected-id", ui.item.value).html(ui.item.label);
                    $(event.target).val("");
                    $( "#event-territory-selector").attr('disabled', null);

                }
            });
        }
    });

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
            $("#event-territory-selection").attr("selected-id", ui.item.value).html(ui.item.label);
            $(event.target).val("").blur();

            countryCodes = $.map(regions, function(i){
                if ( i["region_code"]== ui.item.value) return i["country_code"]
            });

            fillCategories();

        }
    }).focus(function(){
        if (this.value == ""){
            $(this).autocomplete("search", "");
        }
    });

    addLanguageBehaviour();
    loadRegions();


});
