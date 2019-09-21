import React from "react";
import Translate from "@components/Translator/Translate";
import { RIGHTS } from "@constants";
import CmsPropertyDetailTable from "./CmsPropertyDetailTable";

const CmsReservedRights = ({ onUpdate }) => {
	const data = RIGHTS.map(right => [
		{
			type: "text",
			text: right.name,
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
	]);

	return (
		<div className="production-reserved-rights">
			<div className="production-description subtitle2">
				<Translate i18nKey="PRODUCTION_RESERVED_RIGHTS_DESCRIPTION" />
			</div>
			<div className="production-reserved-rights-content">
				<CmsPropertyDetailTable
					heads={[]}
					data={data}
				/>
			</div>
		</div>
	);
};

export default CmsReservedRights;
