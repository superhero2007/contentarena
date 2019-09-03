import React from "react";
import PropTypes from "prop-types";
import Translate from "@components/Translator/Translate";
import { Link } from "react-router-dom";
import { PROPERTY_MAIN_TABS, ROUTE_PATHS } from "@constants";
import { cmsFile } from "@icons";

const EmptyListingOverview = ({ customId }) => (
	<div className="empty-property-tab">
		<img src={cmsFile} alt="" />
		<h3> <Translate i18nKey="CMS_EMPTY_LISTING_OVERVIEW_TITLE" /> </h3>
		<h4> <Translate i18nKey="CMS_EMPTY_LISTING_OVERVIEW_TEXT" /> </h4>
		<Link
			to={`${ROUTE_PATHS.PROPERTIES}/${customId}/${PROPERTY_MAIN_TABS.CREATE_LISTING}`}
			className="ca-btn primary"
		>
			<Translate i18nKey="CMS_EMPTY_LISTING_CREATE_LISTING" />
		</Link>
	</div>
);

EmptyListingOverview.contextTypes = {
	t: PropTypes.func.isRequired,
};

export default EmptyListingOverview;
