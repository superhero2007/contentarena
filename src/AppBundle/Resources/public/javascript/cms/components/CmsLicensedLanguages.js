import React from "react";
import Translate from "@components/Translator/Translate";
import CmsLanguageFilter from "./CmsLanguageFilter";

// export const LICENSED_LANGUAGES = {
// 	name: "Licensed languages",
// 	key: "LICENSED_LANGUAGES",
// 	headers: [],
// 	languageSelector: true,
// 	descriptionKey: "RIGHTS_LICENSED_LANGUAGES_DESCRIPTION",
// 	textAreaLabelKey: "CL3_COMMENTS_PLACEHOLDER",
// 	validations: [
// 		{
// 			key: "LICENSED_LANGUAGES",
// 			value: "LICENSED_LANGUAGES_YES",
// 			keyToCheck: "LICENSED_LANGUAGE_LIST",
// 			type: VALIDATION_KEYS.NO_EMPTY_ARR,
// 		},
// 	],
// };

const CmsLicensedLanguages = ({ type, rights, onUpdate }) => (
	<div className="licensed-languages">
		<div className="tab-description subtitle2">
			<Translate i18nKey="LICENSED_LANGUAGES_DESCRIPTION" />
		</div>
		<div className="licensed-languages-content">
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

export default CmsLicensedLanguages;
