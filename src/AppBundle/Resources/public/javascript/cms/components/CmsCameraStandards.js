import React from "react";
import Translate from "@components/Translator/Translate";
import CmsPropertyDetailTable from "./CmsPropertyDetailTable";

const CmsCameraStandards = ({ onUpdate }) => {
	const heads = [{
		value: "",
	}, {
		value: <Translate i18nKey="CAMERA_STANDARDS_MINIMUM" />,
	}];

	const data = [[
		{
			type: "text",
			text: <Translate i18nKey="CAMERA_STANDARDS_LIVE_FEED" />,
			value: "",
		}, {
			type: "inputbox",
			value: "",
			className: "property-details-input",
		},
	]];

	return (
		<div className="camera-standards">
			<div className="tab-description subtitle2">
				<Translate i18nKey="CAMERA_STANDARDS_DESCRIPTION" />
			</div>
			<div className="camera-standards-content">
				<CmsPropertyDetailTable
					heads={heads}
					data={data}
				/>
			</div>
		</div>
	);
};

export default CmsCameraStandards;
