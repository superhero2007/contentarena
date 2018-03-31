/**
 * Created by JuanCruz on 4/1/2018.
 */

$(function () {

    window.ContentArena = window.ContentArena || {};

    ContentArena.Model = ContentArena.Model || {};

    ContentArena.Model.RightPackage = function(){
        this.id = null;
        this.name = null;
        this.rights = {};
    };

    ContentArena.Model.DistributionPackage = function(){
        this.id = null;
        this.name = null;
        this.production = {};
        this.technical = {};
    };

    ContentArena.Model.Right = function(){
        this.id = null;
        this.name = null;
        this.rightItems = {};
    };

    ContentArena.Model.RightItem = function(){
        this.id = null;
        this.name = null;
        this.inputs = [];
    };

    ContentArena.Model.SelectedRight = function(){
        this.right = null;
        this.rightItem = null;
        this.distributionPackage = null;
        this.group = null;
        this.inputs = [];
    };

    ContentArena.Model.SalesPackage = function(){

        this.salesMethod =  null;
        this.fee = null;
        this.currency = null;
        this.id = null;
        this.name = null;
        this.territories = null;
        this.selectedTerritories = [];
        this.excludedTerritories = [];
        this.territoryBids = false;
        this.sellAsPackage = false;

        this.validate = () => {

            var description = "Sales Package " + this.id + ": ",
                hasErrors = false;

            if ( ! this.currency ) {
                hasErrors = true;
                description += "Currency can't be empty. ";
            }

            if ( ! this.fee ) {
                hasErrors = true;
                description += "Fee can't be empty. ";
            }

            if ( ! this.territories ) {
                hasErrors = true;
                description += "Territories can't be empty. ";
            }

            if ( ! this.salesMethod ) {
                hasErrors = true;
                description += "Sales method can't be empty. ";
            }

            return {
                hasErrors: hasErrors,
                description : description
            }
        }

    };

    ContentArena.Model.Content = function() {

        this.sport = {};
        this.sports = [];
        this.tournament = null;
        this.category = null;
        this.eventType = "database";
        this.salesPackages = {};

        this.getTitle = () => {

            console.log(this);

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

            if ( this.seasons && this.seasons.length > 0){
                title += " " + this.seasons.map( ( season ) => {
                    var values = season.value.split(" ");
                    return values[values.length - 1]
                }).join(" - ");
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

});
