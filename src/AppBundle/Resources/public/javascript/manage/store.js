/**
 * Created by JuanCruz on 4/1/2018.
 */

import React from 'react';
import { createStore } from 'redux';
import reducers from "./reducers";

export default createStore(reducers);