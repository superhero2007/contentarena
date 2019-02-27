/**
 * Created by JuanCruz on 4/1/2018.
 */

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import I18n from "redux-i18n";
import store from "./store";
import AuthRouter from "./router";
import "react-table/react-table.css";
import "react-tagsinput/react-tagsinput.css"; // If using WebPack and style-loader.
import "react-datepicker/dist/react-datepicker.css";
import "react-image-crop/dist/ReactCrop.css";
import "react-toggle/style.css";

require("../ca/ca.data");
require("../ca/ca.api.content");
require("../ca/ca.api");
require("../ca/ca.utils");

const homeWrapper = document.getElementById("home-wrapper");

$.get(`${hosturl}bundles/app/data/translations.json`).done((json) => {
	ReactDOM.render(
		<Provider store={store}>
			<I18n translations={json}>
				<AuthRouter {...homeWrapper.dataset} />
			</I18n>
		</Provider>,
		homeWrapper,
	);
});
