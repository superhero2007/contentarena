import React from "react";
import PropTypes from "prop-types";
import Translate from "@components/Translator/Translate";
import { ROUTE_PATHS, CMS_PROPERTY_TABS } from "@constants";
import { cmsFile, cmsFlow } from "../../../main/components/Icons";

const EmptyCommercialOverview = ({ history, propertyId }, context) => (
	<div className="empty-property-tab">
		<img src={cmsFile} alt="" />
		<h3><Translate i18nKey="CMS_EMPTY_COMMERCIAL_OVERVIEW_TITLE" /> </h3>
		<h4><Translate i18nKey="CMS_EMPTY_COMMERCIAL_OVERVIEW_TEXT" /> </h4>

		<img src={cmsFlow} alt="" />
		<h3><Translate i18nKey="CMS_EMPTY_COMMERCIAL_OVERVIEW_PROMOTE_TITLE" /> </h3>
		<h4><Translate i18nKey="CMS_EMPTY_COMMERCIAL_OVERVIEW_PROMOTE_TEXT" /> </h4>

		<button
			className="ca-btn primary"
			onClick={() => { history.push(`${ROUTE_PATHS.PROPERTIES}/${propertyId}/${CMS_PROPERTY_TABS.LISTING}`); }}
		>
			<Translate i18nKey="CMS_EMPTY_COMMERCIAL_PROMOTE" />
		</button>
	</div>
);

EmptyCommercialOverview.contextTypes = {
	t: PropTypes.func.isRequired,
};

export default EmptyCommercialOverview;
