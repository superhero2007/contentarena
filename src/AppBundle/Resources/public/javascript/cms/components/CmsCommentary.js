import React from "react";
import Translate from "@components/Translator/Translate";
import CmsPropertyDetailTable from "./CmsPropertyDetailTable";
import CmsLanguageFilter from "./CmsLanguageFilter";

const CmsCommentary = ({ onUpdate }) => {
	const data = [[
		{
			type: "text",
			text: <Translate i18nKey="COMMENTARY_LIVE_FEED" />,
			value: "",
		}, {
			type: "radio",
			text: <Translate i18nKey="COMMENTARY_YES" />,
			value: false,
		}, {
			type: "radio",
			text: <Translate i18nKey="COMMENTARY_NO" />,
			value: false,
		},
	]];

	return (
		<div className="production-commentary">
			<div className="tab-description subtitle2">
				<Translate i18nKey="COMMENTARY_DESCRIPTION" />
			</div>
			<div className="production-commentary-content">
				<CmsPropertyDetailTable
					heads={[]}
					data={data}
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
