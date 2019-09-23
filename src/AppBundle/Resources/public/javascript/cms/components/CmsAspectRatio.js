import React from "react";
import Translate from "@components/Translator/Translate";
import CmsPropertyDetailTable from "./CmsPropertyDetailTable";
import CmsInputBox from "./CmsInputBox";

const CmsAspectRatio = ({ onUpdate }) => {
	const heads = [{
		value: "",
	}, {
		value: "16:9",
	}, {
		value: "4:3",
	}, {
		value: <Translate i18nKey="ASPECT_RATIO_OTHER" />,
	}];

	const data = [[
		{
			type: "text",
			text: <Translate i18nKey="ASPECT_RATIO_LIVE_FEED" />,
			value: "",
		}, {
			type: "radio",
			text: "",
			value: false,
		}, {
			type: "radio",
			text: "",
			value: false,
		}, {
			type: "radio",
			text: (
				<CmsInputBox
					className="property-details-input"
					value=""
					onChange={() => {}}
				/>
			),
			value: false,
		},
	]];
	return (
		<div className="aspect-ratio">
			<div className="tab-description subtitle2">
				<Translate i18nKey="ASPECT_RATIO_DESCRIPTION" />
			</div>
			<div className="aspect-ratio-content">
				<CmsPropertyDetailTable
					heads={heads}
					data={data}
				/>
			</div>
		</div>
	);
};

export default CmsAspectRatio;
