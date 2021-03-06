import React from "react";
import PropTypes from "prop-types";
import { blueCheckIcon, yellowCheckIcon, greyMinusIcon } from "./Icons";

const RightsLegend = (props, context) => (
	<div className="RightsLegend">
		<div className="item">
			<img className="icon" src={yellowCheckIcon} alt="" />
			<span className="name">
				{context.t("MARKETPLACE_RIGHTS_LABEL_EXCLUSIVE")}
			</span>
		</div>
		<div className="item">
			<img className="icon" src={blueCheckIcon} alt="" />
			<span className="name">
				{context.t("MARKETPLACE_RIGHTS_LABEL_NON_EXCLUSIVE")}
			</span>
		</div>
		<div className="item">
			<img className="icon" src={greyMinusIcon} alt="" />
			<span className="name">
				{context.t("MARKETPLACE_RIGHTS_LABEL_NON_INCLUDED")}
			</span>
		</div>
	</div>
);

RightsLegend.contextTypes = {
	t: PropTypes.func.isRequired,
};


export default RightsLegend;
