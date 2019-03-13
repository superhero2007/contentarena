import React, { Fragment } from "react";
import Translate from "@components/Translator/Translate";
import {
	ExclusiveRightAvailableIcon, ExclusiveRightOfferedIcon, ExclusiveRightSoldIcon, NonExclusiveRightAvailableIcon,
	NonExclusiveRightOfferedIcon,
	NonExclusiveRightSoldIcon,
} from "@icons";

const CmsRightsLegend = () => (

	<div className="split-filter full-width">
		<div className="rights-legend">
			<div className="item">
				<NonExclusiveRightAvailableIcon />
				<span className="name">
					<Translate i18nKey="CMS_RIGHT_LEGENDS_NON_EXCLUSIVE_AVAILABLE" />
				</span>
			</div>
			<div className="item">
				<NonExclusiveRightOfferedIcon />
				<span className="name">
					<Translate i18nKey="CMS_RIGHT_LEGENDS_NON_EXCLUSIVE_OFFERED" />
				</span>
			</div>
			<div className="item">
				<NonExclusiveRightSoldIcon />
				<span className="name">
					<Translate i18nKey="CMS_RIGHT_LEGENDS_NON_EXCLUSIVE_SOLD" />
				</span>
			</div>
			<div className="item">
				<ExclusiveRightAvailableIcon />
				<span className="name">
					<Translate i18nKey="CMS_RIGHT_LEGENDS_EXCLUSIVE_AVAILABLE" />
				</span>
			</div>
			<div className="item">
				<ExclusiveRightOfferedIcon />
				<span className="name">
					<Translate i18nKey="CMS_RIGHT_LEGENDS_EXCLUSIVE_OFFERED" />
				</span>
			</div>
			<div className="item">
				<ExclusiveRightSoldIcon />
				<span className="name">
					<Translate i18nKey="CMS_RIGHT_LEGENDS_EXCLUSIVE_SOLD" />
				</span>
			</div>
		</div>
	</div>
);

export default CmsRightsLegend;
