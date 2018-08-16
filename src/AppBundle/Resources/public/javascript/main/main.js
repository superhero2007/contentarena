/**
 * Created by JuanCruz on 4/1/2018.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import AuthRouter from './router';
import I18n from "redux-i18n"
import {translations} from "../translations/translations"
import 'react-table/react-table.css';
import 'react-tagsinput/react-tagsinput.css' // If using WebPack and style-loader.
import 'react-datepicker/dist/react-datepicker.css';
import "react-toggle/style.css";
import 'react-select/dist/react-select.css';
require ("../ca/ca.data");
require ("../ca/ca.api.content");
require ("../ca/ca.api");
require ("../ca/ca.utils");
require ("../ca/ca.models");


const homeWrapper = document.getElementById('home-wrapper');

ReactDOM.render(
    <Provider store={store}>
        <I18n translations={translations}>
            <AuthRouter {...homeWrapper.dataset }/>
        </I18n>
    </Provider>,
    homeWrapper
);
