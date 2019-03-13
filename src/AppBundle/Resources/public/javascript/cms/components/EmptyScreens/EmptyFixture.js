import React from "react";
import PropTypes from "prop-types";
import { cmsFile } from "../../../main/components/Icons";

const EmptyFixture = ({ onCreate }, context) => (
	<div className="empty-property-tab">
		<img src={cmsFile} alt="" />
		<h3>{context.t("CMS_EMPTY_FIXTURE_TITLE")}</h3>
		<h4>{context.t("CMS_EMPTY_FIXTURE_TEXT")}</h4>
		<a className="ca-btn primary" onClick={onCreate}>
			{context.t("CMS_EMPTY_FIXTURE_CREATE_FIXTURE")}
		</a>
	</div>
);

EmptyFixture.contextTypes = {
	t: PropTypes.func.isRequired,
};

export default EmptyFixture;
