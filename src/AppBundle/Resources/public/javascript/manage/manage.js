/**
 * Created by JuanCruz on 4/1/2018.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import Manager from './containers/Manager';

const manageContainer = document.getElementById('manage-wrapper');

let ManageApp = ReactDOM.render(
    <Provider store={store}>
        <Manager {...manageContainer.dataset }/>
    </Provider>,
    manageContainer
);


$(function () {

    ContentArena.Test = ContentArena.Test || {};
    ContentArena.Test.Manage = function(id){
        ManageApp.test(id)
    };

});