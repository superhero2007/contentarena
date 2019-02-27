import { combineReducers } from "redux";
import { content } from "./content";
import { selector } from "./selector";

const reducers = combineReducers({
	content,
	selector,
});

export default reducers;
