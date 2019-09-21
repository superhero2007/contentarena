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
		value: "Other",
		// value: <Translate i18nKey="PRODUCTION_ASPECT_RATIO_OTHER" />,
	}];

	const data = [[
		{
			type: "text",
			// text: <Translate i18nKey="PRODUCTION_DELIVERY_METHOD_LIVE_FEED" />,
			text: "Live Feed",
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
					className="production-aspect-ratio-input"
					value=""
					onChange={() => {}}
				/>
			),
			value: false,
		},
	]];
	return (
		<div className="production-aspect-ratio">
			<div className="production-description subtitle2">
				<Translate i18nKey="PRODUCTION_ASPECT_RATIO_DESCRIPTION" />
			</div>
			<div className="production-aspect-ratio-content">
				<CmsPropertyDetailTable
					heads={heads}
					data={data}
				/>
			</div>
		</div>
	);
};

export default CmsAspectRatio;
