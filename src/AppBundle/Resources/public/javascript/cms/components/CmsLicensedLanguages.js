import React from "react";
import Translate from "@components/Translator/Translate";
import CmsLanguageFilter from "./CmsLanguageFilter";

const CmsLicensedLanguages = ({ onUpdate }) => (
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
