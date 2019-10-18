import React from "react";
import Translate from "@components/Translator/Translate";
import CmsPropertyDetailTable from "./CmsPropertyDetailTable";

// export const ASPECT_RATIO = {
// 	name: "Aspect ratio",
// 	descriptionKey: "RIGHTS_ASPECT_RATIO_DESCRIPTION",
// 	key: "ASPECT_RATIO",
// 	productionLabel: true,
// 	checkDelivery: true,
// 	headers: [
// 		"ASPECT_RATIO_16_9",
// 		"ASPECT_RATIO_4_3",
// 		"ASPECT_RATIO_CUSTOM",
// 	],
// 	multiple: false,
// 	textAreaLabelKey: "CL3_COMMENTS_PLACEHOLDER",
// 	validations: [
// 		{
// 			key: "ASPECT_RATIO",
// 			value: "ASPECT_RATIO_CUSTOM",
// 			keyToCheck: "ASPECT_RATIO_TEXT",
// 			type: VALIDATION_KEYS.NO_EMPTY_STRING,
// 		},
// 	],
// };

const columns = [{
	type: "radio",
	text: "",
	value: "ASPECT_RATIO_16_9",
}, {
	type: "radio",
	text: "",
	value: "ASPECT_RATIO_4_3",
}, {
	type: "radio",
	text: "",
	key: "ASPECT_RATIO_TEXT",
	value: "ASPECT_RATIO_OTHER",
}];

const CmsAspectRatio = ({ type, rights, onUpdate }) => (
	<div className="aspect-ratio">
		<div className="tab-description subtitle2">
			<Translate i18nKey="ASPECT_RATIO_DESCRIPTION" />
		</div>
		<div className="aspect-ratio-content">
			<CmsPropertyDetailTable
				rights={rights}
				type={type}
				columns={columns}
				onUpdate={onUpdate}
				checkDelivery
				showType
			/>
		</div>
	</div>
);

export default CmsAspectRatio;
