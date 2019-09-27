import React from "react";
import Translate from "@components/Translator/Translate";
import CmsPropertyDetailTable from "./CmsPropertyDetailTable";
import CmsLanguageFilter from "./CmsLanguageFilter";

// export const GRAPHICS = {
// 	name: "Graphics",
// 	descriptionKey: "RIGHTS_GRAPHICS_DESCRIPTION",
// 	key: "GRAPHICS",
// 	productionLabel: true,
// 	checkDelivery: true,
// 	headers: [
// 		"GRAPHICS_NO",
// 		"GRAPHICS_YES",
// 	],
// 	multiple: false,
// 	textAreaLabelKey: "CL3_COMMENTS_PLACEHOLDER",
// 	validations: [  - ?
// 		{
// 			key: "GRAPHICS",
// 			value: "GRAPHICS_YES",
// 			keyToCheck: "GRAPHICS_LANGUAGES",
// 			type: VALIDATION_KEYS.NO_EMPTY_ARR,
// 		},
// 	],
// };

const CmsGraphics = ({ type, rights, onUpdate }) => {
	// <Translate i18nKey="GRAPHICS_LIVE_FEED" />
	const columns = [
		{
			type: "radio",
			text: "GRAPHICS_YES",
			value: "GRAPHICS_YES",
		}, {
			type: "radio",
			text: "GRAPHICS_NO",
			value: "GRAPHICS_NO",
		},
	];
	return (
		<div className="production-graphics">
			<div className="tab-description subtitle2">
				<Translate i18nKey="GRAPHICS_DESCRIPTION" />
			</div>
			<div className="production-graphics-content">
				<CmsPropertyDetailTable
					rights={rights}
					type={type}
					columns={columns}
					onUpdate={onUpdate}
					header={false}
					checkDelivery
				/>
				<CmsLanguageFilter
					languages={[{
						id: 1,
						value: "Arabic",
					}, {
						id: 2,
						value: "Spanish",
					}]}
					items={[{
						id: 1,
						value: "Arabic",
					}, {
						id: 2,
						value: "Spanish",
					}]}
					onUpdate={() => {}}
				/>
			</div>
		</div>
	);
};

export default CmsGraphics;
