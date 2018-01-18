/**
 * Created by JuanCruz on 4/1/2018.
 */

$(function () {

    var data = {};

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


});
