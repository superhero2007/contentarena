import React from "react";
import Translate from "@components/Translator/Translate";
import CmsPropertyDetailTable from "./CmsPropertyDetailTable";

const CmsCameraStandards = ({ onUpdate }) => {
	const heads = [{
		value: "",
	}, {
		value: "Minimum number of cameras",
		// value: <Translate i18nKey="PRODUCTION_CAMERA_STANDARDS_HEAD" />,
	}];

	const data = [[
		{
			type: "text",
			text: "Live Feed",
			value: "",
		}, {
			type: "inputbox",
			value: "",
			className: "production-camera-standards-input",
		},
	]];

	return (
		<div className="production-camera-standards">
			<div className="production-description subtitle2">
				<Translate i18nKey="PRODUCTION_CAMERA_STANDARDS_DESCRIPTION" />
			</div>
			<div className="production-camera-standards-content">
				<CmsPropertyDetailTable
					heads={heads}
					data={data}
				/>
			</div>
		</div>
	);
};

export default CmsCameraStandards;
