/**
 * Created by JuanCruz on 4/1/2018.
 */

import React from 'react';
import { createStore } from 'redux';
import content from "./reducers/content";
import reducers from "./reducers";

export default createStore(reducers);