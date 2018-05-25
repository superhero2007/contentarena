/**
 * Created by JuanCruz on 4/1/2018.
 */

$(function () {

    ContentArena.Test = ContentArena.Test || {};

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
