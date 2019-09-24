import React from "react";
import Translate from "@components/Translator/Translate";
import { PROPERTY_MAIN_TABS, ROUTE_PATHS } from "@constants";

const EmptyListingOverview = ({ history, customId }) => (
	<div className="property-empty-tab">
		<h3>
			<Translate i18nKey="CMS_EMPTY_LISTING_OVERVIEW_TITLE" />
		</h3>
		<div className="body1">
			<Translate i18nKey="CMS_EMPTY_LISTING_OVERVIEW_TEXT" />
		</div>
		<button
			className="primary-button"
			onClick={() => { history.push(`${ROUTE_PATHS.PROPERTIES}/${customId}/${PROPERTY_MAIN_TABS.CREATE_LISTING}`); }}
		>
			<Translate i18nKey="CMS_EMPTY_LISTING_CREATE_LISTING" />
		</button>
	</div>
);

export default EmptyListingOverview;
