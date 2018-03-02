/**
 * Created by JuanCruz on 4/1/2018.
 */

$(function () {

    window.ContentArena = window.ContentArena || {};

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

});
