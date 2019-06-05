import React from "react";
import PropTypes from "prop-types";
import { ROUTE_PATHS, CMS_PROPERTY_TABS } from "@constants";
import { cmsFile } from "../../../main/components/Icons";

const EmptyEditProgram = ({ history }, context) => (
	<div className="empty-property-tab">
		<img src={cmsFile} alt="" />
		<h3>{context.t("CMS_EMPTY_EDIT_PROGRAM_TITLE")}</h3>
		<h4>{context.t("CMS_EMPTY_EDIT_PROGRAM_TEXT")}</h4>

		<button
			className="ca-btn primary"
			onClick={() => { console.warn("route doesn't specified!"); }}
		>
			{context.t("CMS_EMPTY_EDIT_RIGHTS_BUTTON")}
		</button>
	</div>
);

EmptyEditProgram.contextTypes = {
	t: PropTypes.func.isRequired,
};

export default EmptyEditProgram;
