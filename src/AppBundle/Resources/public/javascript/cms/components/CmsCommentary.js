import React from "react";
import Translate from "@components/Translator/Translate";
import CmsPropertyLanguageFilter from "@components/Filters/CmsPropertyLanguageFilter";
import CmsPropertyDetailTable from "./CmsPropertyDetailTable";

// export const COMMENTARY = {
// 	name: "Commentary",
// 	descriptionKey: "RIGHTS_COMMENTARY_DESCRIPTION",
// 	key: "COMMENTARY",
// 	productionLabel: true,
// 	checkDelivery: true,
// 	headers: [
// 		"COMMENTARY_NO",
// 		"COMMENTARY_YES",
// 	],
// 	multiple: false,
// 	textAreaLabelKey: "CL3_COMMENTS_PLACEHOLDER",
// 	validations: [
// 		{
// 			key: "COMMENTARY",
// 			value: "COMMENTARY_YES",
// 			keyToCheck: "COMMENTARY_LANGUAGES",
// 			type: VALIDATION_KEYS.NO_EMPTY_ARR,
// 		},
// 	],
// };

const columns = [
	{
		type: "radio",
		text: "COMMENTARY_YES",
		value: "COMMENTARY_YES",
	}, {
		type: "radio",
		text: "COMMENTARY_NO",
		value: "COMMENTARY_NO",
	},
];

const CmsCommentary = ({ type, rights, onUpdate }) => {
	const listKey = `${type}_LANGUAGES`;
	const handleLanguage = (value) => {
		for (const right of rights) {
			right.details[listKey] = value;
		}
		onUpdate(rights);
	};

	return (
		<div className="production-commentary">
			<div className="tab-description subtitle2">
				<Translate i18nKey="COMMENTARY_DESCRIPTION" />
			</div>
			<div className="production-commentary-content">
				<CmsPropertyDetailTable
					rights={rights}
					type={type}
					columns={columns}
					onUpdate={onUpdate}
					header={false}
					checkDelivery
				/>
				{rights[0].details[type] === `${type}_YES` && (
					<CmsPropertyLanguageFilter
						value={rights[0].details[listKey] || ""}
						onChange={handleLanguage}
					/>
				)}
			</div>
		</div>
	);
};

export default CmsCommentary;
