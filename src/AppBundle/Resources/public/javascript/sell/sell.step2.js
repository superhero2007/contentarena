/**
 * Created by JuanCruz on 4/1/2018.
 */

$(function () {

    ContentArena.Test = ContentArena.Test || {};

    var selectorCounter = 0,
        mainPackage = null;

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

    function collectRights (container){

        var rights = {};

        container.find("input:checked, .not-optional").each(function (k, el) {

            if ( !$(this).parent().parent().parent().is(":visible") ) return false;

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

    function validateStepTwo(){

        var hasErrors = false,
            messages = [],
            expirationDate = $("#expiration-date"),
            packagesInfo = collectPackages(),
            messagesContainer = $('<div title="The form is incomplete!" />'),
            total = 0,
            selectedPackages = getFullSelectedPackages();

        $(".installment-percent").each(function(){
            total += Number ( $(this).val().replace("%", "") )
        });

        if ( total !== 100 ) {
            hasErrors = true;
            messages.push( $('<div class="popup-error-message" />').html('Total installments must sum 100%!') );
        }

        ContentArena.Content.salesPackages = validateSalesPackages();
        ContentArena.Content.salesPackages.forEach(function(salesPackage){
            var valid = salesPackage.validate();

            if ( valid.hasErrors ){
                hasErrors = true;
                messages.push( $('<div class="popup-error-message" />').html(valid.description));
            }

        });
        ContentArena.Content.rights = packagesInfo.rightPackages;
        ContentArena.Content.distributionPackages = packagesInfo.distributionPackages;
        ContentArena.Content.packages = selectedPackages.selectedIds;

        if ( expirationDate.val() === "" ){
            hasErrors = true;
            messages.push( $('<div class="popup-error-message" />').html('Please select an expiration date') );
        } else {
            ContentArena.Content.expiresAt =  expirationDate.val();
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

        $(".optional",distributionPackage).hide();

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
            if(ContentArena.Utils.isAPIAvailable()) {
                $('#csv-selector-hidden').bind('change', function (evt) {
                    var files = evt.target.files; // FileList object
                    var file = files[0];
                    var reader = new FileReader();

                    $('#content-details-mask').html("");

                    reader.readAsText(file);
                    /**
                     *
                     * @param {{ target:{} }} event
                     */
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
            if ($(this).children().length === 0) {
                $(this).parent().hide()
            } else {
                if ($(this).children().first().css("display") === 'none') {
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

            ContentArena.Languages.addLanguageBehaviour( "#sell-box-package-" + v +" .has-language-trigger");
            $( "#sell-box-package-" + v +" .has-calendar").each(function (k, element) {
                $("#" + $(element).attr("id")).datepicker();
            });

            $(".optional", "#sell-box-package-" + v ).hide();

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
        });
        mainTarget.find(".optional").hide();

    }

    function setupInstallment(){
        $(".installment-percent").off().mask('000%', {reverse: true});
    }

    function submitform() {
        var url = envhosturl + 'sell/published',
            form = $('#myform');

        form.attr('action', url);

        var data = JSON.stringify(ContentArena.Content);

        $('<input type="hidden" name="json"/>').val(data).appendTo('#myform');
        form.submit();
    }

    $("#upload-agreement").on('click', function (){
        $('#license-file-selector-hidden').trigger("click");
    });

    $("#submit-listing").on("click", function(){

        if ( !validateStepTwo() ) return;

        submitform();
    });

    $("#view-agreement").on('click',function () {

        validateStepTwo();
        $("#view-agreement").attr("disabled", "disabled").append('<i class="fa fa-cog fa-spin">');
        $.ajax({
            url : envhosturl + 'v1/contract/previews',
            type: 'POST',
            data : {
                json : JSON.stringify(ContentArena.Content)
            },
            success : function( response ){
                ContentArena.Content.id = response.id;
                window.open(envhosturl + 'contract/preview?id='+ response.id, "_blank",'height=600,width=800');
                $("#view-agreement").attr("disabled", null).find('i').remove();
            }
        })

    });

    $("#add-installment").on('click', function () {

        var pos = $(".installment").length + 1,
            item = $(".installment:last").clone();

        item.attr("id", "installment" + pos);
        item.find("span").html( ContentArena.Utils.addOrdinal(pos));
        item.find("input").val("");
        item.insertAfter(".installment:last");

        item.find("input:last")
            .attr("id", null)
            .removeClass("hasDatepicker")
            .datepicker("destroy").off().datepicker();

        setupInstallment()

    });

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
                if (p.id === id) flag = true;
            });

            if (!flag){
                el.attr("disabled", "disabled");
                if (pack_id !== id) el.parent().next().addClass("disabled");
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

    $("#draft-listing").on('click', function () {

        var el = $(this);

        el.html("<i class=\"fa fa-cog fa-spin\">").attr("disabled", "disabled");

        ContentArena.ContentApi.saveContentAsDraft(ContentArena.Content).done(function (response) {
            if ( response.success !== undefined && response.contentId !== undefined ){
                ContentArena.Content.id = response.contentId;
                el.html("Saved as Draft").attr("disabled", null);
                window.onbeforeunload = function () {
                    // blank function do nothing
                }
            }
        });
    });

    $(document).on('click',".add-sales-package", function () {
        addSalesPackage()
    });

    ContentArena.Test.validateStepTwo = validateStepTwo;
    ContentArena.Test.collectPackages = collectPackages;
    ContentArena.Test.getFullSelectedPackages = getFullSelectedPackages;

    /**
     * Initialization
     */
    setupInstallment();
    addSalesPackage();

});
