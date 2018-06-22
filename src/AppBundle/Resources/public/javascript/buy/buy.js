/**
 * Created by JuanCruz on 4/1/2018.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import Marketplace from './containers/Marketplace';

require('../../scss/marketplace.scss');

const marketplaceContainer = document.getElementById('marketplace-wrapper');

let MarketplaceApp = ReactDOM.render(
    <Provider store={store}>
        <Marketplace {...marketplaceContainer.dataset }/>
    </Provider>,
    marketplaceContainer
);


$(function () {

    ContentArena.Test = ContentArena.Test || {};

    ContentArena.Test.MarketPlace = function(id){
        MarketplaceApp.test(id)
    };

});