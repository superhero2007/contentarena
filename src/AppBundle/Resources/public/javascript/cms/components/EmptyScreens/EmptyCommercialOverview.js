import React from "react";
import PropTypes from "prop-types";
import { ROUTE_PATHS } from "@constants";
import { cmsFile, cmsFlow } from "../../../main/components/Icons";

const EmptyCommercialOverview = ({ history }, context) => (
	<div className="empty-property-tab">
		<img src={cmsFile} alt="" />
		<h3>{context.t("CMS_EMPTY_COMMERCIAL_OVERVIEW_TITLE")}</h3>
		<h4>{context.t("CMS_EMPTY_COMMERCIAL_OVERVIEW_TEXT")}</h4>

		<img src={cmsFlow} alt="" />
		<h3>{context.t("CMS_EMPTY_COMMERCIAL_OVERVIEW_PROMOTE_TITLE")}</h3>
		<h4>{context.t("CMS_EMPTY_COMMERCIAL_OVERVIEW_PROMOTE_TEXT")}</h4>

		<button className="ca-btn primary" onClick={console.warn("action not specified")}>
			{context.t("CMS_EMPTY_COMMERCIAL_PROMOTE")}
		</button>
	</div>
);

EmptyCommercialOverview.contextTypes = {
	t: PropTypes.func.isRequired,
};

export default EmptyCommercialOverview;
