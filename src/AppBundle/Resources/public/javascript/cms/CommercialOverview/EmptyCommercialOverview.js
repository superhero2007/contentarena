import React from "react";
import Translate from "@components/Translator/Translate";
import { ROUTE_PATHS, CMS_PROPERTY_TABS } from "@constants";

const EmptyCommercialOverview = ({ history, propertyId }) => (
	<div className="property-empty-tab">
		<h3>
			<Translate i18nKey="CMS_EMPTY_COMMERCIAL_OVERVIEW_TITLE" />
		</h3>

		<div className="body1">
			<Translate i18nKey="CMS_EMPTY_COMMERCIAL_OVERVIEW_TEXT" />
		</div>

		<h3>
			<Translate i18nKey="CMS_EMPTY_COMMERCIAL_OVERVIEW_PROMOTE_TITLE" />
		</h3>

		<div className="body1">
			<Translate i18nKey="CMS_EMPTY_COMMERCIAL_OVERVIEW_PROMOTE_TEXT" />
		</div>

		<button
			className="primary-button"
			onClick={() => { history.push(`${ROUTE_PATHS.PROPERTIES}/${propertyId}/${CMS_PROPERTY_TABS.LISTING}`); }}
		>
			<Translate i18nKey="CMS_EMPTY_COMMERCIAL_PROMOTE" />
		</button>
	</div>
);

export default EmptyCommercialOverview;
