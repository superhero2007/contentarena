import { createStore, applyMiddleware, combineReducers } from "redux";
import { i18nState } from "redux-i18n";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { content } from "../sell/reducers/content";
import { selector } from "../sell/reducers/selector";
import { filter } from "../buy/reducers/filter";
import { marketplace } from "../buy/reducers/marketplace";
import { manage } from "../manage/reducers/manage";
import { user } from "./reducers/user";
import { common } from "./reducers/common";
import { validation } from "./reducers/validation";
import { landing } from "../landing/reducers/landing";
import { cms } from "../cms/reducers/cms";
import { propertyDetails } from "../cms/reducers/propertyDetails";
import { property } from "../cms/reducers/property";
import { propertyFilters } from "../cms/reducers/propertyFilters";

const reducers = combineReducers({
	content,
	selector,
	marketplace,
	filter,
	manage,
	user,
	common,
	validation,
	landing,
	i18nState,
	cms,
	propertyDetails,
	property,
	propertyFilters,
});

export default createStore(reducers, composeWithDevTools(
	applyMiddleware(thunk),
));
