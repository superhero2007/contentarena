/**
 * Created by JuanCruz on 4/1/2018.
 */

import React from 'react';
import { createStore } from 'redux';
import {combineReducers} from 'redux'
import {i18nState} from "redux-i18n";

import {content} from "../sell/reducers/content";
import {selector} from "../sell/reducers/selector";
import {filter} from "../buy/reducers/filter";
import {marketplace} from "../buy/reducers/marketplace";
import {manage} from "../manage/reducers/manage";
import {user} from "./reducers/user";


const reducers = combineReducers({
    content,
    selector,
    marketplace,
    filter,
    manage,
    user,
    i18nState
});

export default createStore(reducers);