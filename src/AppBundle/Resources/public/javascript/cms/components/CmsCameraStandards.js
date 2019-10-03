import React from "react";
import Translate from "@components/Translator/Translate";
import CmsPropertyDetailTable from "./CmsPropertyDetailTable";

// export const CAMERA = {
// 	name: "Camera standards",
// 	descriptionKey: "RIGHTS_CAMERA_DESCRIPTION",
// 	minimumDefault: 4,
// 	key: "CAMERA",
// 	productionLabel: true,
// 	checkDelivery: true,
// 	headers: [
// 		"CAMERA_MINIMUM",
// 	],
// 	multiple: false,
// 	textAreaLabelKey: "CL3_COMMENTS_PLACEHOLDER",
// 	validations: [
// 		{
// 			key: "CAMERA",
// 			value: "CAMERA_MINIMUM",
// 			keyToCheck: "CAMERAS",
// 			type: VALIDATION_KEYS.NO_ZERO,
// 		},
// 	],
// };

const columns = [
	{
		type: "inputBox",
		text: "",
		key: "CAMERAS",
		value: "CAMERA_MINIMUM",
	},
];

const CmsCameraStandards = ({ type, rights, onUpdate }) => (
	<div className="camera-standards">
		<div className="tab-description subtitle2">
			<Translate i18nKey="CAMERA_DESCRIPTION" />
		</div>
		<div className="camera-standards-content">
			<CmsPropertyDetailTable
				rights={rights}
				type={type}
				columns={columns}
				onUpdate={onUpdate}
				checkDelivery
			/>
		</div>
	</div>
);

export default CmsCameraStandards;
