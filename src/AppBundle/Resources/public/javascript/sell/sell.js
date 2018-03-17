/**
 * Created by JuanCruz on 4/1/2018.
 */

$(function () {

    window.ContentArena = window.ContentArena || {};
    ContentArena.Model = ContentArena.Model || {};
    ContentArena.Form = ContentArena.Form || {};

    var Content = function() {

        this.sport = {};
        this.sports = [];
        this.tournament = null;
        this.category = null;
        this.eventType = "database";
        this.salesPackages = {};

        this.getTitle = () => {

            var title = "";

            if ( this.sports.length > 0 ){
                this.sports.forEach(function (sport, index, array) {
                    title += sport.value;
                    if ( (index+1) != array.length ) title += ", "
                });
            }

            if ( this.eventType === "custom" ){

            }

            if ( this.eventType === "database" ){
                if ( this.sport !== null ) title += this.sport.value;
                if ( this.category !== null ) title += " - " + this.category.value;
                if ( this.tournament !== null ) title += " - " + this.tournament.value;
            }

            return title;
        };

        watch(this, "sports", function(){
            console.log("Updating sports", arguments);
        });

        watch(this, "eventType", function(){
            console.log("Updating eventType", arguments);
        });

    };

    ContentArena.Content = new Content();

    var data = {},
        selectorCounter = 0,
        mainPackage = null,
        rounds = {},
        eventData = new Content(),
        yearArray = Array(2022 - 1950 + 1).fill().map(function(item, index) { return {value : 1950 + index, label : 1950 + index }});

    yearArray .push({label: "To be announced", value : 0 });
    yearArray.reverse();

    function isAPIAvailable() {
        // Check for the various File API support.
        if (window.File && window.FileReader && window.FileList && window.Blob) {
            // Great success! All the File APIs are supported.
            return true;
        } else {
            // source: File API availability - http://caniuse.com/#feat=fileapi
            // source: <output> availability - http://html5doctor.com/the-output-element/
            document.writeln('The HTML5 APIs used in this form are only available in the following browsers:<br />');
            // 6.0 File API & 13.0 <output>
            document.writeln(' - Google Chrome: 13.0 or later<br />');
            // 3.6 File API & 6.0 <output>
            document.writeln(' - Mozilla Firefox: 6.0 or later<br />');
            // 10.0 File API & 10.0 <output>
            document.writeln(' - Internet Explorer: Not supported (partial support expected in 10.0)<br />');
            // ? File API & 5.1 <output>
            document.writeln(' - Safari: Not supported<br />');
            // ? File API & 9.2 <output>
            document.writeln(' - Opera: Not supported');
            return false;
        }
    }

    function collectRights (container){

        var rights = {};

        container.find("input:checked").each(function (k, el) {
            var rightId = $(el).attr("right-id"),
                rightItemId = $(el).attr("right-item-id");

            if ( !rights[rightId] ){
                rights[rightId] = new ContentArena.Model.Right();
                rights[rightId].id = rightId;
            }

            if ( !rights[rightId].rightItems[rightItemId] ){
                rights[rightId].rightItems[rightItemId]= new ContentArena.Model.RightItem();
                rights[rightId].rightItems[rightItemId].id = rightItemId;
            }

            $(el).parent().parent().find("input:not([type='checkbox']):not(.chosen-search-input), textarea, select").each(function (key, element) {
                rights[rightId].rightItems[rightItemId].inputs.push( $(element).val() );

            })

        });

        return rights;
    }

    function collectRightPackages(container, name){

        var rightsPackage = new ContentArena.Model.RightPackage();
        rightsPackage.name = name;
        rightsPackage.rights = collectRights(container);
        return rightsPackage;
    }

    function collectDistributionPackages(container, name){

        var distributionPackage = new ContentArena.Model.DistributionPackage();
        distributionPackage.name = name;
        distributionPackage.production = collectRights(container);
        distributionPackage.technical = collectRights($("#technical-delivery-" + name));
        return distributionPackage;
    }

    function collectPackages (){

        var packages = {
                distributionPackages : [],
                rightPackages : []
            },
            selectedPackages = getSelectedFullPackages(),
            multiple = $("#main-multiple-package"),
            single = $("#main-single-package");

        if ( multiple.is(":visible") ){
            packages.rightPackages.push( collectRightPackages(multiple, "Collectively") );
        }

        if ( single.is(":visible") ){
            packages.rightPackages.push( collectRightPackages(single, "Main Information") );
        }

        if ( selectedPackages.length > 1 ){
            selectedPackages.forEach(function (pack) {
                packages.rightPackages.push( collectRightPackages( $("#sell-box-package-" + pack.id ), pack.name ) );
            })
        }

        $(".production-standards:visible").each(function(k, el){
            var name = $(el).attr("id").replace("distribution-package-", "");
            packages.distributionPackages.push( collectDistributionPackages( $(el), name ) )
        });

        return packages;
    }

    function getSelectedFullPackages() {
        var list = [];

        $(".package-selector:checked").each(function(k,v){

            var pack = {
                id : $(v).attr("id").split("-")[1],
                name : $(v).attr("name").split("-")[1]
            };

            list.push(pack);
        });

        return list;
    }

    function getFullSelectedPackages() {
        var response = {
            selected : {},
            selectedIds : [],
            selectedNames : []
        };

        $(".package-selector:checked").each(function(k,v){

            var id = $(v).attr("id").split("-")[1],
                name = $(v).attr("name").split("-")[1];

            response.selected[id] = {
                id : id,
                name : name
            };

            response.selectedIds.push(id);
            response.selectedNames.push(name)

        });

        response.getIdByName = function( name ){
            return this.selectedIds[this.selectedNames.indexOf(name)]
        };

        return response;
    }

    function split( val ) {
        return val.split( /,\s*/ );
    }

    function extractLast( term ) {
        return split( term ).pop();
    }

    function addDistributionPackages( name ){

        var distributionPackage = $(".production-standards", "#box-templates").clone(),
            technicalDelivery = $(".technical-delivery", "#box-templates").clone(),
            distributionPackageTitle = distributionPackage.find(".box-title"),
            technicalDeliveryTitle = technicalDelivery.find(".box-title"),
            title = name.replace("-", " - "),
            template = $.templates("#content-details-template"),
            episodeTemplate = $.templates("#episode-template");

        $("[group='Production standards']", ".rights-list").each(function(){
            var test = $(this).clone();
            distributionPackage.find(".seller-box-content").append(test);
        });

        $("[group='Technical delivery']", ".rights-list").each(function(){
            var test = $(this).clone();
            technicalDelivery.find(".seller-box-content").append(test);
        });

        distributionPackage.attr("id","distribution-package-" + name).show().insertBefore(".rights-list");
        technicalDelivery.attr("id","technical-delivery-" + name).show().insertAfter(distributionPackage);
        distributionPackageTitle.html("Distribution package - " + distributionPackageTitle.html() + " -"  + title);
        technicalDeliveryTitle.html(technicalDeliveryTitle.html() + " - " + title);

        $(".optional",technicalDelivery).hide();

        $("label", distributionPackage ).each(function(){
            $(this).attr("for", "distribution-package-" + name + "-" + $(this).attr("for") )
        });

        $("input, select", distributionPackage ).each(function(){
            $(this).attr("id", "distribution-package-" + name + "-" + $(this).attr("id") )
        });

        $("label", technicalDelivery ).each(function(){
            $(this).attr("for", "technical-delivery-" + name + "-" + $(this).attr("for") )
        });

        $("input, select", technicalDelivery ).each(function(){
            $(this).attr("id", "technical-delivery-" + name + "-" + $(this).attr("id") )
        });

        ContentArena.Languages.addLanguageBehaviour("#distribution-package-" + name + " .has-language-trigger");

        if( name === "Program" ){
            technicalDelivery.find(".seller-box-content").append(template.render());
            $("#upload-content-csv").on('click', function (){
                $('#csv-selector-hidden').trigger("click");
            });
            if(isAPIAvailable()) {
                $('#csv-selector-hidden').bind('change', function (evt) {
                    var files = evt.target.files; // FileList object
                    var file = files[0];
                    var reader = new FileReader();

                    $('#content-details-mask').html("");

                    reader.readAsText(file);
                    reader.onload = function(event){
                        var csv = event.target.result;
                        var data = $.csv.toArrays(csv);

                        data.forEach(function (row, index) {
                            if ( index > 0 ){
                                $('#content-details-mask').append(episodeTemplate.render({
                                    episode: row[0]
                                })).show();
                            }
                        });

                        $("#episodes-quantity").val(data.length - 1);


                    };
                    reader.onerror = function(){ alert('Unable to read ' + file.fileName); };
                });
            }

            //$(".content-details", technicalDelivery).addClass($("[right-name=distribution-method-fiber]", technicalDelivery).attr("show").replace(".",""));


        }

        return distributionPackage;

    }

    function addExtraDistributionPackage( distributionPackage){

        var selectors = [],
            packages = getFullSelectedPackages(),
            highlights = packages.selectedNames.indexOf("Highlights") !== -1,
            clips = packages.selectedNames.indexOf("Clips") !== -1,
            news = packages.selectedNames.indexOf("News access") !== -1;

        distributionPackage.find(".seller-box-content").append( $(".extra-distribution-packages").clone().show());

        if (highlights ) selectors.push(".extra-package-highlight" );
        if (clips ) selectors.push(".extra-package-clips" );
        if (news ) selectors.push(".extra-package-news" );
        if (highlights && clips ) selectors.push(".extra-package-highlight-clips" );
        if (highlights && news ) selectors.push(".extra-package-highlight-news" );
        if (clips && news ) selectors.push(".extra-package-clips-news" );
        if (highlights && news && clips ) selectors.push(".extra-package-highlight-clips-news" );

        $(selectors.join(", "), distributionPackage).show();

        $(".distribution-package-selector", distributionPackage).on("change", function () {
            var values = $(this).val().split(", ");

            $(".technical-delivery:visible:not(#technical-delivery-Main)").remove();
            $(".production-standards:visible:not(#distribution-package-Main)").remove();

            addDistributionPackages( values.join("-") );
        })

    }

    function checkSelectedPackages() {

        var fullPackagesData = getFullSelectedPackages(),
            packages = fullPackagesData.selectedIds,
            packagesName = fullPackagesData.selectedNames,
            mainItems = [],
            singleItems = [],
            distributionPackage,
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
                $(".has-package-"+v+":not(.is-collectively)[group='Main Information']", ".rights-list").each(function(){
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

            $("select", "#sell-box-package-" + v ).each(function(){
                $(this).attr("id", "package-" + v + "-" + $(this).attr("id") )
            });

            /*$("[right-name$=-cut-available-yes]", "#sell-box-package-" + v ).change(function(){
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
*/

            ContentArena.Languages.addLanguageBehaviour( "#sell-box-package-" + v +" .has-language-trigger");
            $( "#sell-box-package-" + v +" .has-calendar").each(function (k, element) {
                $("#" + $(element).attr("id")).datepicker();
            })


        }) ;

        $(mainItems.join(","), ".rights-list").each(function(){
            var test = $(this).clone();
            mainTarget.find(".seller-box-content").append(test);
            mainTarget.show();
        });

        if ( packagesName.indexOf("Program") === -1 || packagesName.length > 1 ){
            distributionPackage = addDistributionPackages( "Main");
        }

        if ( packagesName.length > 1
            && ( packagesName.indexOf("Clips") !== -1
                || packagesName.indexOf("Highlights") !== -1
                || packagesName.indexOf("News access") !== -1
            )
        ){
            addExtraDistributionPackage(distributionPackage);
        }

        if ( packagesName.indexOf("Program") !== -1 ){
            addDistributionPackages( "Program" );
        }

        $("#main-sell-box").show();
        $("#price-sell-box").show();
        $(".package-ready-button").show();
        $("#price-sell-box .select-box-item-container").show();
        ContentArena.Languages.addLanguageBehaviour( mainTarget.find(".has-language-trigger") );
        mainTarget.find(".has-calendar").each(function (k, element) {
            $("#" + $(element).attr("id")).datepicker();
        })

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
                    $("#event-season-selector").val("").removeClass("custom-input");;
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

    function validateSalesPackages(){

        var packages = [];

        $(".sales-package").each(function(k, packageContainer){

            var salesPackage = new ContentArena.Model.SalesPackage();
            var id = $(packageContainer).attr("id").replace("sales-package-","");

            salesPackage.territories = $(".territories:checked", packageContainer).attr("val");
            salesPackage.salesMethod = $(".sales-method:checked", packageContainer).attr("val");
            salesPackage.currency = $(".currency:checked", packageContainer).attr("val");
            salesPackage.id = id;
            salesPackage.name = $("#sales-package-" + id +"-name").val();
            salesPackage.fee = $(".fee:visible", packageContainer).val();
            salesPackage.territoryBids = $("#sales-package-" + id +"-territory-bids").is(":checked");
            salesPackage.territoryAsPackage = $("#sales-package-" + id +"-territories-as-package").is(":checked");

            if ( salesPackage.territories === "selected") salesPackage.selectedTerritories = $("#sales-package-" + id +"-territory-selected").chosen().val();
            if ( salesPackage.territories === "excluded") salesPackage.excludedTerritories = $("#sales-package-" + id +"-territory-excluded").chosen().val();

            packages.push(salesPackage);
        });

        return packages;
    }

    function validateStepOne(){

        var season = $(".season"),
            sports = [],
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
                    eventData[name] = eventData[name] || {};
                    eventData[name].value = value;
                    if ( externalId ) eventData[name].externalId = externalId;
                } else {
                    eventData[name] = null;
                }
            }

            if ( !value && required ){
                $(itemInput).addClass("invalid");
                hasErrors = true;
            }

        });

        if ( $("#event-website-selector").val() != "" ){
            eventData.website = $("#event-website-selector").val().split(",");
        }

        if ( eventData.eventType == "custom"){
            $(".sport-selector").each( function(){
                sports.push({
                    value : $(this).val(),
                    externalId : $(this).attr("externalId")
                })
            });

            sports.push(eventData.sport);
            eventData.sports = sports;
        }

        if (eventData.eventType == 'database' ){

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

        $("#event-title").html( eventData.getTitle() );

        return !hasErrors;
    }

    function validateStepTwo(){

        var rights = {},
            rightPackages= [],
            distributionPackages =[],
            hasErrors = false,
            messages = [],
            packagesInfo = collectPackages(),
            messagesContainer = $('<div title="The form is incomplete!" />'),
            total = 0,
            rightItems = [],
            selectedPackages = getFullSelectedPackages();

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
            messages.push( $('<div class="popup-error-message" />').html('Total installments must sum 100%!') );
        }

        eventData.salesPackages = validateSalesPackages();
        eventData.salesPackages.forEach(function(salesPackage){
            var valid = salesPackage.validate();

            if ( valid.hasErrors ){
                hasErrors = true;
                messages.push( $('<div class="popup-error-message" />').html(valid.description));
            }

        });

        eventData.rights = packagesInfo.rightPackages;
        eventData.distributionPackages = packagesInfo.distributionPackages;
        eventData.rightItems = rightItems;
        eventData.packages = selectedPackages.selectedIds;

        if ( $("#expiration-date").val() === "" ){
            hasErrors = true;
            messages.push( $('<div class="popup-error-message" />').html('Please select an expiration date') );
        } else {
            eventData.expiresAt =  $("#expiration-date").val();
        }

        if ( hasErrors ){

            messages.forEach((content)=>{
                messagesContainer.append(content);
            });

            messagesContainer.dialog({
                minWidth: 400
            });
        }

        return !hasErrors;

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

        if ( eventData.eventType === "custom" ) return;

        if ( category ) addCustomFn("#event-category-selector", "Enter Country/Category");
        if ( tournament ) addCustomFn("#event-tournament-selector", "Enter Tournament");
        /*addCustomFn("#event-season-selector", "Enter Season");
        $("#event-schedule-subitems").html("");
        $(".custom-template-item").show();
        $(".custom-template-item").children().show();*/

        ContentArena.Form.addCustomSeason();
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

    function addSalesPackage(){
        var template = $.templates("#sales-package-template"),
            salesPackages = $(".sales-package"),
            id = salesPackages.length + 1,
            htmlOutput = template.render({id: id });

        if ( id === 1 ){
            $(".rights-list").last().after(htmlOutput);
        } else {
            salesPackages.last().after(htmlOutput);
        }

        $(".price-optional", "#sales-package-" + id).hide();
        ContentArena.Utils.addRegionBehaviour("#sales-package-" + id + " .has-region-selector");
        //ContentArena.Content.salesPackages[id] = new SalesPackage();

    }

    function addSportLayer(){

        var extraSports = $(".sport-selector").length,
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
            $(".sport-selector").last().parent().after(htmlOutput);
        }

        $("#"+id).parent().find('button').on('click', function () {
            $(this).parent().remove();

            if($(".sport-selector").length === 0){
                $("#event-tournament-selector, #event-season-selector").show();
                eventData.eventType = "database";
            }
        });

        $("#event-category-selector, #event-tournament-selector, #event-season-selector").hide();
        resetSelector(["category", "tournament", "season"]);

        eventData.eventType = "custom";
        fillSports( "#"+id, ContentArena.Data.TopSports, ContentArena.Data.FullSports);

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

    $("#add-sport-layer").on("click", addSportLayer);

    $(".package-selector").on('change', function () {

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

    $("#reset-packages").on('click', function () {
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

    $(".go-to-rights").on("click", function(){

        if ( !validateStepOne() ) return;

        $("#step2").show();
        $("#step1").hide();

        //if ( eventData.eventType === "custom" ) $("#packages").parent().hide();

    });

    $("#submit-listing").on("click", function(){

        if ( !validateStepTwo() ) return;

        submitform();
    });

    $(".has-datepicker").datepicker();

    /**
     * Fills the sport selector
     */
    ContentArena.Api.getSports().done( (sports ) => {
        ContentArena.Data.FullSports = sports;
        fillSports( "#event-sport-selector", ContentArena.Data.TopSports, ContentArena.Data.FullSports, function( event, ui){
            eventData.sport = {
                value : ui.item.label,
                externalId :ui.item.value
            };

            if ( eventData.eventType == "custom") return;

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

    $("#view-agreement").on('click',function () {

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

    $("#upload-agreement").on('click', function (){
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
    
    $(".optional").hide();

    /**
     * Initialization
     */
    setupInstallment();
    addSalesPackage();

    $(".package-ready-button").hide();
    $(".custom-template-item").hide();
    $(".step1-container").show();

    ContentArena.Test = ContentArena.Test || {};
    ContentArena.Test.collectPackages = collectPackages;
    ContentArena.Test.validateStepOne = validateStepOne;
    ContentArena.Test.validateStepTwo = validateStepTwo;
    ContentArena.Test.getFullSelectedPackages = getFullSelectedPackages;
    ContentArena.Test.logEventData = function(){ console.log( eventData )};

    $(document).on("change", ".unselect-others", function(){

        var _this = this;

        $.each($(this).parent().parent().siblings(), function (k, item) {
            var input = $(item).find("input");
            if ( _this != item ) {
                input.attr("checked", false);
            } else {
            }

        });
    });

    $(document).on("change", ".toggler-checkbox", function () {

        var context = $(this).parent().parent().parent().parent();

        $( $(this).attr("hide") + ", .optional", context ).hide().find("input").val("");

        $("input:checked", context).each(function () {
            var selectorShow = $(this).attr("show"),
                selectorHide = $(this).attr("hide");

            //selectorHide += ", .optional";

            //$( selectorHide, context ).hide().find("input").val("");

            if (this.checked){
                $(this).parent().parent().parent().append($( selectorShow, context ).show())
            }
        });



    });

    $(document).on("click", ".close-box", function () {
        $( $(this).attr("ref") ).remove();
    });

    $(document).on('click',".add-sales-package", function () {
        addSalesPackage()
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
            $('#episodes-quantity').off();
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

    /**
     * Renders all the tooltips
     */
    $( document ).tooltip();

});