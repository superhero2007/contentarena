import React from "react";
import Translate from "@components/Translator/Translate";
import CmsLanguageFilter from "./CmsLanguageFilter";

const CmsLicensedLanguages = ({ onUpdate }) => (
	<div className="production-licensed-languages">
		<div className="production-description subtitle2">
			<Translate i18nKey="PRODUCTION_LICENSED_LANGUAGES_DESCRIPTION" />
		</div>
		<div className="production-licensed-languages-content">
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
