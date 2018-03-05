/**
 * Created by JuanCruz on 4/1/2018.
 */

$(function () {

    window.ContentArena = window.ContentArena || {};

    ContentArena.Model = ContentArena.Model || {};
    ContentArena.Data = ContentArena.Data || {};

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

    ContentArena.Data.TopSports = [
        { label : "Soccer", value: "sr:sport:1"},
        { label : "Basketball", value: "sr:sport:2"},
        { label : "Baseball", value: "sr:sport:3"},
        { label : "Tennis", value: "sr:sport:5"},
        { label : "Cricket", value: "sr:sport:21"},
        { label : "Field Hockey", value: "sr:sport:24"},
        { label : "Volleyball", value: "sr:sport:23"},
        { label : "Table Tennis", value: "sr:sport:20"},
        { label : "Golf", value: "sr:sport:9"},
        { label : "American Football", value: "sr:sport:16"},
        { label : "Handball", value: "sr:sport:6"},
        { label : "Show All", value: "all"}
    ]

});
