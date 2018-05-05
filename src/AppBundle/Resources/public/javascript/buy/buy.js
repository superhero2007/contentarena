/**
 * Created by JuanCruz on 4/1/2018.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import MarketPlace from './containers/MarketPlace';

require('../../scss/marketplace.scss');

const marketplaceContainer = document.getElementById('content-list-container');

class MarketplaceElement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loadingListing: false
        };
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

    $(".content-box").on("click", function(){
        let id = $(this).data("contentId");

        MarketplaceApp.selectListing(id);
    });

    MarketplaceApp.selectListing($(".content-box").first().data("contentId"));



    ContentArena.Test.MarketPlace = function(id){
        MarketplaceApp.test(id)
    };

    ContentArena.Api.getSports().done((sports) => {
        ContentArena.Data.FullSports = sports;

        var container = $("#filter-sports")
            .find(".subfilter-container")
            .first();

        ContentArena.Data.TopSports.forEach(function (sport) {
            container.append("<div class=\"sport subfilter\" name=\""+sport.label+"\" id=\"sport-"+sport.value+"\" toggle>"+sport.label+"</div>")
        });

    });

});