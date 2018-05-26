/**
 * Created by JuanCruz on 4/1/2018.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import MarketPlace from './containers/MarketPlace';

require('../../scss/marketplace.scss');

const marketplaceContainer = document.getElementById('marketplace-wrapper');

class MarketplaceElement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loadingListing: false,
            countries : [],
            territories: []
        };
    }

    componentDidMount () {
        let _this = this;
        if ( this.state.countries.length === 0) {
            ContentArena.Api.getCountriesFull().done( (countries ) => {
                _this.setState({countries});
            });
        }
        if ( this.state.territories.length === 0) {
            ContentArena.Api.getTerritories().done( (territories ) => {
                _this.setState({territories});
            });
        }
    }

    selectListing = (id) => {
        let _this = this;
        _this.setState({
            id : id,
            loadingListing : true
        });

        ContentArena.ContentApi.getByCustomId(id).done((content) => {
            _this.setState({
                content : content,
                loadingListing : false
            })
        });
    };

    render () {
        return (
            <Provider store={store}>
                <MarketPlace
                    id={this.state.id}
                    content={this.state.content}
                    countries={this.state.countries}
                    territories={this.state.territories}
                    loadingListing={this.state.loadingListing} />
            </Provider>
        )
    }
}

let MarketplaceApp = ReactDOM.render(
    <MarketplaceElement/>,
    marketplaceContainer
);


$(function () {

    ContentArena.Test = ContentArena.Test || {};

    $(document).on("click",".content-box", function(){
        let id = $(this).data("contentId");

        MarketplaceApp.selectListing(id);
    });

    MarketplaceApp.selectListing($(".content-box").first().data("contentId"));



    ContentArena.Test.MarketPlace = function(id){
        MarketplaceApp.test(id)
    };

    ContentArena.Api.getSports().done((sports) => {
        ContentArena.Data.FullSports = sports;

        var select = $("#sports-event");

        ContentArena.Data.TopSports.forEach(function (sport) {
            select.append("<option class=\"sport subfilter\" id=\"sport-"+sport.externalId+"\" name="+sport.externalId+" value='"+sport.externalId+"' toggle>"+sport.name+"</option>")
        });
    });

    ContentArena.Api.getTerritories().done((territories) => {
        ContentArena.Data.AllTerritories = territories;

        var select = $("#territories-rights");

        ContentArena.Data.AllTerritories.forEach(function (territory) {
            select.append("<option class=\"territory subfilter\" value='"+territory.id+"' id='territory-"+ territory.id+"' toggle>"+territory.name+"</option>")
        });
    });

    ContentArena.Api.getRightsPackage().done((rightsPackages) => {
        ContentArena.Data.AllRightsPackages = rightsPackages;

        var container = $("#rights-packages");

        ContentArena.Data.AllRightsPackages.forEach(function (rightsPackage) {
            container.append("<p><input class='right_package subfilter' type='checkbox' id='"+rightsPackage.id+"'> "+rightsPackage.name+"</p>")
        });
    });

    ContentArena.Api.getContent().done((contents) => {
        ContentArena.Data.AllContents = contents;

        var contents = $("#content-list-container");

        contents.append(ContentArena.Data.AllContents);
    });
});