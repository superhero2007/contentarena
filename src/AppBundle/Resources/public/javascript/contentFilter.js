/**
 * Created by JuanCruz on 4/1/2018.
 */


function customRange() {

    var minDate = new Date($('#startDate').val());
    minDate.setDate(minDate.getDate() + 1);

    return  Date.parse(minDate);

};

$(function () {

    var Filter = function() {
        var _this = this;
        this.territories = [];
        this.countries = [];
        this.sports = [];
        this.rights = [];
        this.timing = [];
        this.orderBy = "createdAt";
        this.sortOrder = "DESC";
        this.fromDate = null;
        this.toDate = null;

        watch(this, function(){
            // console.log("Updating", arguments);

            if ( _this.countries.length > 0 ) {
                $(".filter-territories-count")
                    .html( "(" + _this.countries.length + ")" );
                $(".select-territories").toggleClass("selected", true);
            } else if (_this.territories.length > 0) {
                $(".filter-territories-count")
                    .html( "(" + _this.territories.length + ")" );
                $(".select-territories").toggleClass("selected", true);
            } else {
                $(".filter-territories-count").html("");
                $(".select-territories").toggleClass("selected", false);
            }

            if ( _this.sports.length > 0 ) {
                $(".filter-sports-count")
                    .html( "(" + _this.sports.length + ")" );
                $(".select-sports").toggleClass("selected", true);
            } else {
                $(".filter-sports-count").html("");
                $(".select-sports").toggleClass("selected", false);
            }

            if ( _this.rights.length > 0 ) {
                $(".filter-rights-count")
                    .html( "(" + _this.rights.length + ")" );
                $(".select-rights").toggleClass("selected", true);
            } else {
                $(".filter-rights-count").html("");
                $(".select-rights").toggleClass("selected", false);
            }

            if ( _this.fromDate != null && _this.toDate != null &&  _this.fromDate != "" && _this.toDate != ""  ){
                $(".select-timing").html(_this.fromDate + " - " + _this.toDate).toggleClass("selected", true)
            } else {
                $(".select-timing").html("Timing").toggleClass("selected", false)
            }

        });
    };

    window.ContentArena = window.ContentArena || {};
    window.ContentArena.Filter = new Filter();

    function updateFilter() {

        var territories = [],
            countries = [],
            rights = [],
            sports= [];

        $(".sport.selected").each(function(){
            sports.push({
                externalId : $(this).attr('id').replace("sport-", ""),
                value : $(this).attr('name')
            })
        });

        $(".territory.selected").each(function(){
            territories.push( $(this).attr('id').replace("territory-", "") )
        });

        $(".country.selected").each(function(){
            countries.push( $(this).attr('id').replace("country-", "") )
        });

        $(".right.selected").each(function(){
            rights.push( $(this).attr('id').replace("right-", "") )
        });

        ContentArena.Filter.countries = countries;
        ContentArena.Filter.territories = territories;
        ContentArena.Filter.rights = rights;
        ContentArena.Filter.sports = sports;
    }

    function applyFilter(){
        $(".content-list-container").html("<i class=\"fa fa-cog fa-spin\"></i>");
        ContentArena.Api.getContent(ContentArena.Filter).done(function (response) {
            $(".content-list-container").html(response);
        });
    }

    $(".filter").on('click', function () {
        $($(this).attr('ref')).dialog({
            modal : true,
            minWidth : 800,
            minHeight: 400
        })
    });

    $(document).on('click','.subfilter', function(){
        var _this = $(this),
            toggle = _this.attr('toggle');

        _this.toggleClass('selected');

        if (typeof toggle !== typeof undefined && toggle !== false) {
            $("."+_this.attr('id')).toggle();
        }

        updateFilter();
    });

    $('.close').on('click', function(){
        var _this = $(this),
            clearSelectors = _this.attr('clear').split(", ");

        $( _this.attr('ref')).dialog('close');

        $.each( clearSelectors, function (k, v){
            $(v).removeClass('selected');
            $(v+".is-hidden").hide();
        });

        updateFilter();

    });

    $(document).on('click','.apply',function(){
        var _this = $(this);

        $( _this.attr('ref')).dialog('close');

        ContentArena.Filter.fromDate = $("#startDate").val();
        ContentArena.Filter.toDate = $("#endDate").val();

        applyFilter();

    });

    $("#startDate").datepicker();

    $("#endDate").datepicker();

    $('#startDate').on('change',function(){
        var date = $(this).datepicker('getDate');
        date.setDate(date.getDate()+1);
        $('#endDate').datepicker('option', 'minDate', date);
    });

    $("#show-save-filter").on("click", function () {
       $("#save-filter-container").show();
       $(this).hide();
    });

    $("#clear-filter").on("click", function () {
        $(".selected", ".subfilter-container").removeClass("selected");
        updateFilter();
        applyFilter();
    });

    $("#save-filter").on("click", function () {
        ContentArena.Filter.name = $("#filter-name").val();
        ContentArena.Api.saveFilter(ContentArena.Filter).always(function () {
            $("#show-save-filter").show();

        });
        $("#save-filter-container").hide();
    });

    $("#apply-saved-filter").on("click", function () {
        window.ContentArena.Filter = new Filter();
        ContentArena.Filter.id = $("#saved-filters").val();
        applyFilter();
    });

});
