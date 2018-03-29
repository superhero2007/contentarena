/**
 * Created by JuanCruz on 4/1/2018.
 */

$(function () {

    /**
     * Renders all the tooltips
     */
    $( document ).tooltip();

    $(".has-datepicker").datepicker();

    $("input").on('focus', function(){
        $(this).removeClass("invalid");
    });

    $(".optional").hide();

});