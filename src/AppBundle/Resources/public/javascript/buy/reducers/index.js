import {combineReducers} from 'redux'
import {marketplace} from "./marketplace";
import {filter} from "./filter";

const reducers = combineReducers({
    marketplace,
    filter
});

export default reducers
