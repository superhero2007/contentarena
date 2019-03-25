import React from "react";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { i18nState } from "redux-i18n";
import thunk from "redux-thunk";
import { content } from "../sell/reducers/content";
import { selector } from "../sell/reducers/selector";
import { filter } from "../buy/reducers/filter";
import { marketplace } from "../buy/reducers/marketplace";
import { manage } from "../manage/reducers/manage";
import { user } from "./reducers/user";
import { common } from "./reducers/common";
import { validation } from "./reducers/validation";
import { landing } from "../landing/reducers/landing";

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
});

export default createStore(reducers, applyMiddleware(thunk));
