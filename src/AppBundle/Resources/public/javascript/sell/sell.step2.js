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

});
