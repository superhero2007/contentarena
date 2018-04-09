/**
 * Created by JuanCruz on 4/1/2018.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import SellForm from "./components/SellForm";
import store from './store';

const sellForm = document.getElementById('sell-form-container');

ReactDOM.render(
    <Provider store={store}>
        <SellForm {...sellForm.dataset } />
    </Provider>,
    sellForm
);

$(function () {

    /**
     * Renders all the tooltips
     */
    $( document ).tooltip();

    $(".has-datepicker").datepicker();

    $("input").on('focus', function(){
        $(this).removeClass("invalid");
    });

    $(".optional").hide();
});