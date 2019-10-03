import React from "react";
import Translate from "@components/Translator/Translate";
import CmsLanguageFilter from "@components/Filters/CmsLanguageFilter";
import CmsPropertyDetailTable from "./CmsPropertyDetailTable";

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
// 	validations: [
// 		{
// 			key: "GRAPHICS",
// 			value: "GRAPHICS_YES",
// 			keyToCheck: "GRAPHICS_LANGUAGES",
// 			type: VALIDATION_KEYS.NO_EMPTY_ARR,
// 		},
// 	],
// };

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

const CmsGraphics = ({ type, rights, onUpdate }) => {
	const listKey = `${type}_LANGUAGES`;
	const handleLanguage = (value) => {
		for (const right of rights) {
			right.details[listKey] = value;
		}
		onUpdate(rights);
	};

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
				{rights[0].details[type] === `${type}_YES` && (
					<CmsLanguageFilter
						value={rights[0].details[listKey] || ""}
						onChange={handleLanguage}
					/>
				)}
			</div>
		</div>
	);
};

export default CmsGraphics;
