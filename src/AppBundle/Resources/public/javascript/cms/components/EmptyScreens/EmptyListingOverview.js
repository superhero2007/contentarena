import React from "react";
import PropTypes from "prop-types";
import { ROUTE_PATHS } from "@constants";
import { cmsFile } from "../../../main/components/Icons";

const EmptyListingOverview = ({ history }, context) => (
	<div className="empty-property-tab">
		<img src={cmsFile} alt="" />
		<h3>{context.t("CMS_EMPTY_LISTING_OVERVIEW_TITLE")}</h3>
		<h4>{context.t("CMS_EMPTY_LISTING_OVERVIEW_TEXT")}</h4>
		<a className="ca-btn primary" href={ROUTE_PATHS.CREATE_LISTING}>
			{context.t("CMS_EMPTY_LISTING_CREATE_LISTING")}
		</a>
	</div>
);

EmptyListingOverview.contextTypes = {
	t: PropTypes.func.isRequired,
};

export default EmptyListingOverview;
