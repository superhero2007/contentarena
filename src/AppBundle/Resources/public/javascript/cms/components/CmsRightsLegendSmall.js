import React, { Fragment } from "react";
import Translate from "@components/Translator/Translate";
import {
	ExclusiveRightAvailableIcon, ExclusiveRightOfferedIcon, ExclusiveRightSoldIcon, NonExclusiveRightAvailableIcon,
	NonExclusiveRightOfferedIcon,
	NonExclusiveRightSoldIcon,
} from "@icons";

const CmsRightsLegendSmall = () => (

	<div className="rights-legend-small">
		<div className="item">
			<NonExclusiveRightAvailableIcon />
			<span className="name">
				<Translate i18nKey="CMS_RIGHT_LEGENDS_NON_EXCLUSIVE" />
			</span>
		</div>
		<div className="item">
			<ExclusiveRightAvailableIcon />
			<span className="name">
				<Translate i18nKey="CMS_RIGHT_LEGENDS_EXCLUSIVE" />
			</span>
		</div>
	</div>
);

export default CmsRightsLegendSmall;
