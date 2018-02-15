/**
 * Created by JuanCruz on 4/1/2018.
 */

$(function () {

    var Filter = function() {
        var _this = this;
        this.territories = [];
        this.countries = [];
        this.sports = [];

        this.getInfo = function() {
            return this.color + ' ' + this.type + ' apple';
        };

        watch(this, function(){
            console.log("Updating", arguments);

            if ( _this.countries.length > 0 ) {
                $(".filter-territories-count")
                    .html( "(" + _this.countries.length + ")" );
                $(".select-territories").toggleClass("selected", true);
            } else {
                $(".filter-territories-count").html("");
                $(".select-territories").toggleClass("selected", false);
            }

        });
    };

    window.Filter = new Filter();

    Filter = new Filter();

    function updateFilter() {

        var territories = [],
            countries = [];

        $(".territory.selected").each(function(){
            territories.push( $(this).attr('id').replace("territory-", "") )
        });

        $(".country.selected").each(function(){
            countries.push( $(this).attr('id').replace("country-", "") )
        });

        Filter.countries = countries;
        Filter.territories = territories;
    }

    $(".filter").on('click', function () {
        $($(this).attr('ref')).dialog({
            modal : true,
            minWidth : 800,
            minHeight: 400
        })
    });

    $('.subfilter').on('click', function(){
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

});
