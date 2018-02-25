/**
 * Created by JuanCruz on 4/1/2018.
 */

$(function () {

    window.ContentArena = window.ContentArena || {};

    var Content = function() {

        this.sport = {};
        this.eventType = "database";

        watch(this, "sport", function(){
            console.log("Updating sport", arguments);
        });

        watch(this, "eventType", function(){
            console.log("Updating eventType", arguments);
        });

    };

    ContentArena.Content = new Content();

    var data = {},
        selectorCounter = 0,
        mainPackage = null,
        countryList = [],
        rounds = {},
        eventData = new Content(),
        yearArray = Array(2022 - 1950 + 1).fill().map(function(item, index) { return {value : 1950 + index, label : 1950 + index }});

    yearArray .push({label: "To be announced", value : 0 });
    yearArray.reverse();

    function split( val ) {
        return val.split( /,\s*/ );
    }

    function extractLast( term ) {
        return split( term ).pop();
    }

    function addDistributionPackages( packageId , id ){

        var distributionPackage = $(".production-standards", "#box-templates").clone(),
            technicalDelivery = $(".technical-delivery", "#box-templates").clone(),
            distributionPackageTitle = distributionPackage.find(".box-title"),
            technicalDeliveryTitle = technicalDelivery.find(".box-title");

        $(".has-package-"+packageId+"[group='Production standards']", ".rights-list").each(function(){
            var test = $(this).clone();
            distributionPackage.find(".seller-box-content").append(test);
        });

        distributionPackage.attr("id","distribution-package-" + id).show().insertBefore(".rights-list");
        technicalDelivery.attr("id","technical-delivery-" + id).show().insertAfter(distributionPackage);
        distributionPackageTitle.html("Distribution package - " + distributionPackageTitle.html() + " -"  + id);
        technicalDeliveryTitle.html(technicalDeliveryTitle.html() + " -" + id);

        addLanguageBehaviour("#distribution-package-" + id + " .has-language-trigger");
        setupToggler("#technical-delivery-" + id);

        $("label", distributionPackage ).each(function(){
            $(this).attr("for", "distribution-package-" + id + "-" + $(this).attr("for") )
        });

        $("input", distributionPackage ).each(function(){
            $(this).attr("id", "distribution-package-" + id + "-" + $(this).attr("id") )
        });


    }

    function checkSelectedPackages() {

        var packages = getSelectedPackages(),
            packagesName = getSelectedPackagesName(),
            mainItems = [],
            singleItems = [],
            multiPackage = ( packages.length > 1),
            mainTarget = (multiPackage) ? $("#main-multiple-package") : $("#main-single-package");


        $.each($(".seller-box-content"), function () {
            if ($(this).children().length == 0) {
                $(this).parent().hide()
            } else {
                if ($(this).children().first().css("display") == 'none') {
                    $(this).parent().hide()
                }
            }
        });

        $(".select-box-item-container").hide();
        $(".rights-container").hide();
        $(".rights-container:not(.technical-delivery) .seller-box-content").html("");
        $(".production-standards", "#step2").remove();
        $(".technical-delivery", "#step2").remove();

        $.each(packages, function(k, v){

            singleItems.push(".has-package-"+v+":not(.is-collectively)[group='Main Information']");

            if ( multiPackage ){
                mainItems.push(".has-package-"+v+".is-collectively[group='Main Information']");
                $(singleItems.join(", "), ".rights-list").each(function(){
                    var test = $(this).clone();
                    $("#sell-box-package-"+ v +" .seller-box-content").append(test);
                });

                $("#sell-box-package-"+ v ).show();
            } else {
                mainItems.push(".has-package-"+v+"[group='Main Information']");
            }

            $(".has-package-" + v).show();

            $("label", "#sell-box-package-" + v ).each(function(){
                $(this).attr("for", "package-" + v + "-" + $(this).attr("for") )
            });

            $("input", "#sell-box-package-" + v ).each(function(){
                $(this).attr("id", "package-" + v + "-" + $(this).attr("id") )
            });

            $("[right-name$=-cut-available-yes]", "#sell-box-package-" + v ).change(function(){
                if ( this.checked && $("#distribution-package-" + packagesName[k]).length == 0 ) {
                    addDistributionPackages(v, packagesName[k]);
                }

            });

            $("[right-name$=-cut-available-no]", "#sell-box-package-" + v ).change(function(){
                if ( this.checked ) {
                    $("#distribution-package-" + packagesName[k]).remove();
                    $("#technical-delivery-" + packagesName[k]).remove();
                }

            });

        }) ;

        $(mainItems.join(","), ".rights-list").each(function(){
            var test = $(this).clone();
            mainTarget.find(".seller-box-content").append(test);
            mainTarget.show();
        });


        if ( packagesName.indexOf("Program") === -1 || packagesName.length > 1 ){
            addDistributionPackages(packages[0], "Main");
        }

        if ( packagesName.indexOf("Program") !== -1 ){
            addDistributionPackages(packages[packagesName.indexOf("Program")], "Program");
        }

        $("#main-sell-box").show();
        $("#price-sell-box").show();
        $(".package-ready-button").show();
        $("#price-sell-box .select-box-item-container").show();
        setupUnselect();
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
                    $("#event-custom-subitems").children().hide;
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

                    response(results.slice(0, 100));
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
                    $("#event-season-selector").val("").removeClass("custom-input");;
                    $("#event-schedule-subitems").html("");
                    $("#event-custom-subitems").children().hide();
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
                            addCustomFn(event.target, "Enter season name");
                            $("#event-custom-subitems").children().show();

                            return;
                        }

                        $("#event-custom-subitems").children().hide();

                        id = selected.replace(/\:/g, '-');
                        source = $.grep(source, function (el, i) {
                            if (el.value == ui.item.value ) {
                                return false;
                            }
                            return true;
                        });


                        $('#event-schedule-subitems')
                            .append('<div class="step1-event-subitem-title standard-button-active season"  mainref="'+ id +'">'+ui.item.label+'</div><div class="step1-event-subitems-container"><div class="step1-event-subitem-title" ref="'+ id +'" >Fixture</div><div class="step1-event-subitems-container is-hidden" id="'+ id +'" ><i class="fa fa-cog fa-spin pos-rel"></i></div></div>');

                        $("[ref="+id+"]").click(function(){
                            $(this).toggleClass("standard-button-active");
                            $("#"+id).toggle();
                            $("#"+id).find("i").show();
                        });

                        $("[mainref="+id+"]").click(function(){
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
            success: function (response) {

                var source = [];

                if ( response.sport_events && response.sport_events.sport_event ){
                    $.each(response.sport_events.sport_event, function (k, item) {

                        var season_id = id,
                            round = item.tournament_round['@attributes'].number || item.tournament_round['@attributes'].type;

                        if ( rounds[season_id] == undefined) rounds[season_id] = {};
                        if ( rounds[season_id][round] == undefined ) rounds[season_id][round] = [];
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

                $('#' + id)
                    .append('<div class="step1-event-subitem-title matchday-subitem-showall" >Show All</div>');


                $("#"+id).find("i").remove();

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

    function apiIdToHtmlId( id){
        return id.replace(/\:/g, '-');
    }

    function htmlIdToApiId( id){
        return id.replace(/\-/g, ':');
    }

    function validateStepOne(){

        var eventTypeSelector = $(".event-origin-selector.standard-button-active").attr("ref"),
            season = $(".season"),
            eventType = eventTypeSelector.split("-")[0].replace(".", ""),
            hasErrors = false;

        if ( $("#series-events-selector").hasClass("standard-button-active") ) {
            eventTypeSelector += ", .custom-series-event-item";
        }

        eventData = {};
        eventData.eventType = eventType;

        $( eventTypeSelector ).each(function(k, item){

            var itemInput = $(item).find(".step1-event-input-content"),
                required = itemInput.attr("required"),
                name = (itemInput.attr("id")) ? itemInput.attr("id").split("-")[1] : false,
                value,
                externalId;

            if ( itemInput.length > 0){
                externalId = itemInput.attr("externalId");
                value = itemInput.val();

                if ( value && eventData[name] == undefined ) eventData[name] = {};
                if ( value && externalId ) eventData[name].externalId = externalId;
                if ( value ) eventData[name].value = value;

            }

            if ( !value && required ){
                $(itemInput).addClass("invalid");
                hasErrors = true;
            }

        });

        if ( eventType == "custom"){
            eventData.seriesType = ( $("#single-events-selector").hasClass("standard-button-active") ) ? "single" : "series" ;
        }

        if ( $("#event-website-selector").val() != "" ){
            eventData.website = $("#event-website-selector").val().split(",");
        }

        if ( $("#event-link-selector").val() != "" ){
            eventData.links = $("#event-link-selector").val().split(",");
        }

        $("#event-title").html( $("#event-sport-selector").val() + " - " + $("#event-tournament-selector-selector").val() + " - " );

        if (eventType == 'database' ){

            // SEASON
            if ( season.length > 0 ){
                eventData.seasons = [];
                season.each(function(){
                    eventData.seasons.push({
                        value : $(this).html(),
                        externalId : htmlIdToApiId($(this).attr("mainref"))
                    });
                });
            }

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
        }

        return !hasErrors;
    }

    function getSelectedPackages() {
        var list = [];

        $(".package-selector:checked").each(function(k,v){
            list.push($(v).attr("id").split("-")[1] );
        });

        return list;
    }

    function getSelectedPackagesName() {
        var list = [];
        $(".package-selector:checked").each(function(k,v){
            list.push($(v).attr("name").split("-")[1]);
        });

        return list;
    }

    function validateStepTwo(){

        var rights = {},
            hasErrors = false,
            total = 0,
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


        $(".installment-percent").each(function(){
            total += Number ( $(this).val().replace("%", "") )
        });

        if ( total != 100 ) {
            hasErrors = true;
            $('<div />').html('Total installments must sum 100%!').dialog();
        }

        eventData.rights = rights;
        eventData.rightItems = rightItems;
        eventData.packages = getSelectedPackages();

        eventData.salesMethod = $("input:checked", "#sales-method-selector").val();
        eventData.fee = $( "#fee-selector").val();
        eventData.bid = $( "#bid-selector").val();
        eventData.expiresAt = $("#expiration-date").val();
        eventData.currency = $("input:checked", "#currency-selector").val();
        eventData.territories = $("input:checked", "#territories-selector").val();

        if ( eventData.territories === "selected"){
            eventData.countriesSelected = $("#territory-selected").val();
        }

        if ( eventData.territories === "excluded"){
            eventData.countriesExcluded = $("#territory-excluded").val();
        }

        return !hasErrors;

    }

    function loadRegions(){

        var excluded = $("#territory-excluded"),
            selected = $("#territory-selected");

        $.ajax({
            url: hosturl + "v1/feed/test",
            type: "GET",
            success: function (response) {
                countryList = [];

                response.sort(function(a,b){return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);});

                /**
                 * @param {{ country_code: string }} v
                 */
                $.each(response, function(k, v){

                    var option = '<option value=' + v.country_code + '>' + v.name + '</option>';

                    excluded.append(option);
                    selected.append(option);

                    countryList.push({
                        label : v.name,
                        value : v.country_code
                    })
                });

                excluded.chosen({ width: "50%"});
                selected.chosen({ width: "50%"});

                countryList.sort(ContentArena.Api.sortByLabel);
            }
        });
    }

    function addLanguageBehaviour( selector ){

        $(selector).each(function () {
            $(this).uls({
                onSelect: function (language) {
                    var languageName = $.uls.data.getAutonym(language);
                    var el = this.$element;
                    el.before("<div title='language' class='selected-language'>"+languageName+", </div>");
                },
                quickList: ['en','fr', 'es']
            });
        })

    }

    function submitform() {
        var url = envhosturl + 'sell/published',
            form = $('#myform');

        form.attr('action', url);

        var data = JSON.stringify(eventData);

        $('<input type="hidden" name="json"/>').val(data).appendTo('#myform');
        form.submit();
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
        if ( category ) addCustomFn("#event-category-selector", "Enter Country/Category");
        if ( tournament ) addCustomFn("#event-tournament-selector", "Enter Tournament");
        addCustomFn("#event-season-selector", "Enter Season");
        $("#event-schedule-subitems").html("");
        $("#event-custom-subitems").children().show();
    }

    function addOrdinal( n ){
        var str = n.toString().slice(-1),
            ord = '';
        switch (str) {
            case '1':
                ord = 'st';
                break;
            case '2':
                ord = 'nd';
                break;
            case '3':
                ord = 'rd';
                break;
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
            case '0':
                ord = 'th';
                break;
        }
        return n + ord;
    }

    function setupInstallment(){
        $(".installment-percent").off().mask('000%', {reverse: true});
    }

    function setupToggler( context ){
        $(".toggler-checkbox", context).change(function () {

            var selectorShow = $(this).attr("show"),
                selectorHide = $(this).attr("hide");

            $( selectorHide, context ).hide().find("input").val("");

            if (this.checked){
                $( selectorShow, context ).show();
            }
        });

        $(".close-box", context).click(function () {
            $(context).remove();
        });

        $(".close-box").show().first().hide();
    }

    function setupUnselect(){
        //$(".unselect-others").off();
        $(".unselect-others").change(function(){

            var _this = this;

            $.each($(this).parent().parent().siblings(), function (k, item) {
                if ( _this != item ) $(item).find("input").attr("checked", false);
            });
        });
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

    $(".package-selector").change(function () {

        var id = $(this).attr("id").split("-")[1],
            name = $(this).attr("name").split("-")[1];

        checkSelectedPackages();

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

        var ref = $(this).attr("ref"),
            eventType = ref.split("-")[0].replace(".", "");

        $.each($(".event-origin-selector"), function(k, v){
            $(v).toggleClass("standard-button-active");
        });

        $(".step1-event-item").hide();
        $(ref).show();
        eventData.eventType = eventType;

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

        if ( eventData.eventType === "custom" ) $("#packages").parent().hide();

    });

    $("#submit-listing").click(function(){

        if ( !validateStepTwo() ) return;

        submitform();
    });

    $(".has-datepicker").datepicker();

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
    ContentArena.Api.getSports().done( (sports ) => data.sports = sports );

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

            if (ui.item.value === "all"){
                $( "#event-sport-selector" ).autocomplete( "option", "source", data.sports );
                setTimeout(function(){
                    $( "#event-sport-selector" ).autocomplete("search", "");
                }, 500);
                return;
            }

            if (ui.item.value === "new"){
                addCustomTemplate(true, true, true);
                return;
            }

            $(event.target)
                .val(ui.item.label)
                .attr("externalId", ui.item.value)
                .trigger('blur');

            eventData.sport = {
                label : ui.item.label,
                externalId : ui.item.value
            };

            $("#event-category-selector").val("").attr('externalId', null);
            $("#event-tournament-selector") .val("").attr('externalId', null);
            $("#event-season-selector") .val("").attr('externalId', null);
            $("#event-schedule-subitems").html("");
            fillTournaments();

        }
    }).focus(function(){
       $(this).autocomplete("search", "");
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
            $(event.target).val(ui.item.label).attr("externald", ui.item.value).trigger('blur');
        }
    }).focus(function(){
        $(this).autocomplete("search", "");
    });

    $( "#event-year-selector" ).autocomplete({
        source : yearArray,
        minLength: 0,
        select: function( event, ui ) {
            event.preventDefault();
            $(event.target).val(ui.item.label).trigger('blur');
        }
    }).focus(function(){
       $(this).autocomplete("search", "");
    });

    $( "#event-customType-selector" ).autocomplete({
        source : [
            { label: "League", value : 1},
            { label: "Tournament", value : 2},
        ],
        minLength: 0,
        select: function( event, ui ) {
            event.preventDefault();
            $(event.target).val(ui.item.label).attr("externalId", ui.item.value).blur();
        }
    }).focus(function(){
        $(this).autocomplete("search", "");
    });

    $("#event-customEnd-selector, #event-customStart-selector, #event-availability-selector, #expiration-date, .installment-date").datepicker();

    $('.file-selector').off().focus(function(e){
        var targetId = "#" + $(this).attr("ref");
        $(this).blur();
        $( targetId ).trigger("click");
        e.preventDefault();
    });

    $("input").on('focus', function(){
        $(this).removeClass("invalid");
    });

    $('#event-website-selector').mask("A", {
        translation: {
            "A": { pattern: /[\w/\-.+]/, recursive: true }
        }
    });

    $("#view-agreement").click(function () {

        validateStepTwo();
        $("#view-agreement").attr("disabled", "disabled").append('<i class="fa fa-cog fa-spin">');
        $.ajax({
            url : envhosturl + 'v1/contract/previews',
            type: 'POST',
            data : {
                json : JSON.stringify(eventData)
            },
            success : function( response ){
                eventData.id = response.id;
                window.open(envhosturl + 'contract/preview?id='+ response.id, "_blank",'height=600,width=800');
                $("#view-agreement").attr("disabled", null).find('i').remove();
            }
        })

    });

    $("#upload-agreement").click(function (){
        $('#license-file-selector-hidden').trigger("click");
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

    $("#add-installment").on('click', function () {

        var pos = $(".installment").length + 1,
            item = $(".installment:last").clone();

        item.attr("id", "installment" + pos);
        item.find("span").html( addOrdinal(pos));
        item.find("input").val("");
        item.insertAfter(".installment:last");

        item.find("input:last")
            .attr("id", null)
            .removeClass("hasDatepicker")
            .datepicker("destroy").off().datepicker();

        setupInstallment()

    });
    
    $("#add-sales-package").on('click', function () {
        var pos = $(".sales-package").length + 1,
            item = $(".sales-package:last").clone();
        item.attr("id", "sales-package-"+ pos );
        item.find("input").val("");
        item.find("input[type=checkbox]").attr("checked", false);
        item.insertAfter(".sales-package:last");
        setupToggler("#sales-package-"+ pos);
    });

    $(".price-optional").hide();

    $(".optional").hide();

    /**
     * Initialization
     */
    addLanguageBehaviour(".has-language-trigger");
    loadRegions();
    setupInstallment();
    setupToggler("#sales-package-1");

    $(".step1-event-item").hide();
    $(".step1-container").show();
    $(".database-event-item").show();
    $(".common-event-item").show();
    $(".package-ready-button").hide();
    $("#event-custom-subitems").children().hide();

    window.test = function () {
        validateStepOne();
        validateStepTwo();
        console.log(eventData);
    };

});
