import React from "react";
import Translate from "@components/Translator/Translate";
import { RIGHTS } from "@constants";
import CmsPropertyDetailTable from "./CmsPropertyDetailTable";

const CmsRightToSublicense = ({ onUpdate }) => {
	const heads = [{
		value: "",
	}, {
		value: <Translate i18nKey="RIGHT_TO_SUBLICENSE_YES" />,
	}, {
		value: <Translate i18nKey="RIGHT_TO_SUBLICENSE_APPROVAL" />,
	}, {
		value: <Translate i18nKey="RIGHT_TO_SUBLICENSE_NO" />,
	}];

	const data = RIGHTS.map(right => [
		{
			type: "text",
			text: right.name,
			value: "",
		}, {
			type: "checkbox",
			text: "",
			value: false,
		}, {
			type: "checkbox",
			text: "",
			value: false,
		}, {
			type: "checkbox",
			text: "",
			value: false,
		},
	]);

	return (
		<div className="right-to-sublicense">
			<div className="tab-description subtitle2">
				<Translate i18nKey="RIGHT_TO_SUBLICENSE_DESCRIPTION" />
			</div>
			<div className="right-to-sublicense-content">
				<CmsPropertyDetailTable
					heads={heads}
					data={data}
				/>
			</div>
		</div>
	);
};

export default CmsRightToSublicense;
