import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Translate from "@components/Translator/Translate";
import {
	blueCheckIcon,
	yellowCheckIcon,
	greyMinusIcon,
	exclusiveRightAvailable,
	nonExclusiveRightAvailable,
	exclusiveRightOffered,
	nonExclusiveRightOffered,
	exclusiveRightSold,
	nonExclusiveRightSold,
} from "./Icons";

const RightsLegend = (props, context) => (
	<div className="RightsLegend">
		{props.isNew ? (
			<Fragment>
				<div className="item">
					<img className="icon" src={nonExclusiveRightAvailable} alt="" />
					<span className="name">
						<Translate i18nKey="CMS_RIGHT_LEGENDS_NON_EXCLUSIVE_AVAILABLE" />
					</span>
				</div>
				<div className="item">
					<img className="icon" src={nonExclusiveRightOffered} alt="" />
					<span className="name">
						<Translate i18nKey="CMS_RIGHT_LEGENDS_NON_EXCLUSIVE_OFFERED" />
					</span>
				</div>
				<div className="item">
					<img className="icon" src={nonExclusiveRightSold} alt="" />
					<span className="name">
						<Translate i18nKey="CMS_RIGHT_LEGENDS_NON_EXCLUSIVE_SOLD" />
					</span>
				</div>
				<div className="item">
					<img className="icon" src={exclusiveRightAvailable} alt="" />
					<span className="name">
						<Translate i18nKey="CMS_RIGHT_LEGENDS_EXCLUSIVE_AVAILABLE" />
					</span>
				</div>
				<div className="item">
					<img className="icon" src={exclusiveRightOffered} alt="" />
					<span className="name">
						<Translate i18nKey="CMS_RIGHT_LEGENDS_EXCLUSIVE_OFFERED" />
					</span>
				</div>
				<div className="item">
					<img className="icon" src={exclusiveRightSold} alt="" />
					<span className="name">
						<Translate i18nKey="CMS_RIGHT_LEGENDS_EXCLUSIVE_SOLD" />
					</span>
				</div>
			</Fragment>
		) : (
			<Fragment>
				<div className="item">
					<img className="icon" src={yellowCheckIcon} alt="" />
					<span className="name">
						<Translate i18nKey="MARKETPLACE_RIGHTS_LABEL_EXCLUSIVE" />
					</span>
				</div>
				<div className="item">
					<img className="icon" src={blueCheckIcon} alt="" />
					<span className="name">
						<Translate i18nKey="MARKETPLACE_RIGHTS_LABEL_NON_EXCLUSIVE" />
					</span>
				</div>
				{!props.isExclusive && (
					<div className="item">
						<img className="icon" src={greyMinusIcon} alt="" />
						<span className="name">
							<Translate i18nKey="MARKETPLACE_RIGHTS_LABEL_NON_INCLUDED" />
						</span>
					</div>
				)}
			</Fragment>
		)}
	</div>
);

RightsLegend.contextTypes = {
	t: PropTypes.func.isRequired,
};


export default RightsLegend;
