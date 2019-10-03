import React from "react";
import CmsLanguageFilter from "@components/Filters/CmsLanguageFilter";
import Translate from "@components/Translator/Translate";

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

const CmsLicensedLanguages = ({ rights, onUpdate }) => {
	const listKey = "LICENSED_LANGUAGE_LIST";
	const handleLanguage = (value) => {
		for (const right of rights) {
			right.details[listKey] = value;
		}
		onUpdate(rights);
	};

	return (
		<div className="licensed-languages">
			<div className="tab-description subtitle2">
				<Translate i18nKey="LICENSED_LANGUAGES_DESCRIPTION" />
			</div>
			<div className="licensed-languages-content">
				<CmsLanguageFilter
					value={rights[0].details[listKey] || ""}
					onChange={handleLanguage}
				/>
			</div>
		</div>
	);
};

export default CmsLicensedLanguages;
