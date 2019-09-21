import React from "react";
import Translate from "@components/Translator/Translate";
import CmsPropertyDetailTable from "./CmsPropertyDetailTable";
import CmsLanguageFilter from "./CmsLanguageFilter";

const CmsGraphics = ({ onUpdate }) => {
	const data = [[
		{
			type: "text",
			// text: <Translate i18nKey="PRODUCTION_GRAPHICS_LIVE_FEED" />,
			text: "Live Feed",
			value: "",
		}, {
			type: "radio",
			text: "Yes",
			value: false,
		}, {
			type: "radio",
			text: "No",
			value: false,
		},
	]];
	return (
		<div className="production-graphics">
			<div className="production-description subtitle2">
				<Translate i18nKey="PRODUCTION_GRAPHICS_DESCRIPTION" />
			</div>
			<div className="production-graphics-content">
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

export default CmsGraphics;
