import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { ROUTE_PATHS } from "@constants";

const EmptyListingOverview = ({ history }, context) => (
	<div className="empty-listing">
		<i className="fa fa-5x fa-files-o" />
		<h3>{context.t("CMS_EMPTY_LISTING_OVERVIEW_TITLE")}</h3>
		<h4>{context.t("CMS_EMPTY_LISTING_OVERVIEW_TEXT")}</h4>
		<a className="yellow-button" href={ROUTE_PATHS.CREATE_LISTING}>
			{context.t("CMS_EMPTY_LISTING_CREATE_LISTING")}
		</a>
	</div>
);

EmptyListingOverview.contextTypes = {
	t: PropTypes.func.isRequired,
};

export default EmptyListingOverview;
