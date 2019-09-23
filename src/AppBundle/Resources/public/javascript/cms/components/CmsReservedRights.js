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
		<div className="reserved-rights">
			<div className="tab-description subtitle2">
				<Translate i18nKey="RESERVED_RIGHTS_DESCRIPTION" />
			</div>
			<div className="reserved-rights-content">
				<CmsPropertyDetailTable
					heads={[]}
					data={data}
				/>
			</div>
		</div>
	);
};

export default CmsReservedRights;
