/**
 * Created by JuanCruz on 4/1/2018.
 */

$(function () {

    ContentArena.Test = ContentArena.Test || {};

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
            rights = collectSelectedRights(),
            messagesContainer = $('<div title="The form is incomplete!" />'),
            total = 0,
            selectedPackages = getFullSelectedPackages();

        $(".installment-percent").each(function(){
            total += Number ( $(this).val().replace("%", "") )
        });

        if ( total !== 100 ) {
            hasErrors = true;
            messages.push( $('<div class="popup-error-message" />').html('Total installments must sum 100%!') );
        }else{
            ContentArena.Content.installments = collectInstallments();
        }

        ContentArena.Content.salesPackages = validateSalesPackages();
        ContentArena.Content.salesPackages.forEach(function(salesPackage){
            var valid = salesPackage.validate();

            if ( valid.hasErrors ){
                hasErrors = true;
                messages.push( $('<div class="popup-error-message" />').html(valid.description));
            }

        });
        ContentArena.Content.rights = rights;
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


    function setupInstallment(){
        $(".installment-percent").off().mask('000%', {reverse: true});
    }

    function collectInstallments(){

        var installments = [];

        $(".installment").each(function(k, packageContainer){

            var installment = {};

            installment.percent = $(".installment-percent", packageContainer).val().replace("%", "");
            installment.date = $(".installment-date", packageContainer).val();
            installment.signing_day = $(".installment-days", packageContainer).val();
            installment.granted_day = $(".granted-days").val();

            installments.push(installment);
        });

        return installments;
    }

    function submitform() {
        var url = envhosturl + 'sell/published',
            form = $('#myform');

        form.attr('action', url);

        var data = JSON.stringify(ContentArena.Content);

        $('<input type="hidden" name="json"/>').val(data).appendTo('#myform');
        window.onbeforeunload = function () {};
        form.submit();
    }

    $("#upload-agreement").on('click', function (){
        $('#license-file-selector-hidden').trigger("click");
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

        if($(".installment:first input.installment-percent").val()=='100%'){
            $(".installment:first input.installment-percent").val('');
        }

        var pos = $(".installment").length + 1,
            item = $(".installment:last").clone();

        item.attr("id", "installment" + pos);
        item.find("span").html( ContentArena.Utils.addOrdinal(pos));
        item.find("input").val("");
        item.insertAfter(".installment:last");

        item.find("input.hasDatepicker")
            .attr("id", null)
            .removeClass("hasDatepicker")
            .datepicker("destroy").off().datepicker();

        //setupInstallment()

    });

});
