import React from "react";
import Translate from "@components/Translator/Translate";
import CmsPropertyDetailTable from "./CmsPropertyDetailTable";
import CmsLanguageFilter from "./CmsLanguageFilter";

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
// 	validations: [ - ?
// 		{
// 			key: "COMMENTARY",
// 			value: "COMMENTARY_YES",
// 			keyToCheck: "COMMENTARY_LANGUAGES",
// 			type: VALIDATION_KEYS.NO_EMPTY_ARR,
// 		},
// 	],
// };

const CmsCommentary = ({ type, rights, onUpdate }) => {
	// <Translate i18nKey="COMMENTARY_LIVE_FEED" />
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

export default CmsCommentary;
