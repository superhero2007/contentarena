import React from "react";
import Translate from "@components/Translator/Translate";
import { RIGHTS } from "@constants";
import CmsPropertyDetailTable from "./CmsPropertyDetailTable";

const CmsRightToSublicense = ({ onUpdate }) => {
	const heads = [{
		value: "",
	}, {
		value: "Yes",
		// value: <Translate i18nKey="PRODUCTION_RIGHT_TO_SUBLICENSE_HEAD1" />,
	}, {
		value: "Subject to licensor's approval",
		// value: <Translate i18nKey="PRODUCTION_RIGHT_TO_SUBLICENSE_HEAD2" />,
	}, {
		value: "No",
		// value: <Translate i18nKey="PRODUCTION_RIGHT_TO_SUBLICENSE_HEAD3" />,
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
		<div className="production-right-to-sublicense">
			<div className="production-description subtitle2">
				<Translate i18nKey="PRODUCTION_RIGHT_TO_SUBLICENSE_DESCRIPTION" />
			</div>
			<div className="production-right-to-sublicense-content">
				<CmsPropertyDetailTable
					heads={heads}
					data={data}
				/>
			</div>
		</div>
	);
};

export default CmsRightToSublicense;
