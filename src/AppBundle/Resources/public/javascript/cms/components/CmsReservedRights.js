import React from "react";
import Translate from "@components/Translator/Translate";
import CmsPropertyDetailTable from "./CmsPropertyDetailTable";

// export const RESERVED_RIGHTS = {
// 	name: "Reserved rights",
// 	key: "RESERVED_RIGHTS",
// 	headers: [
// 		"RESERVED_RIGHTS_NO",
// 		"RESERVED_RIGHTS_YES",
// 	],
// 	multiple: false,
// 	descriptionKey: "RIGHTS_RESERVED_RIGHTS_DESCRIPTION",
// 	textAreaLabelKey: "CL3_COMMENTS_RESERVED_PLACEHOLDER",
// 	validateTextarea: true,
// 	validations: [
// 		{
// 			key: "RESERVED_RIGHTS",
// 			value: "RESERVED_RIGHTS_YES",
// 			keyToCheck: "RESERVED_RIGHTS_TEXTAREA",
// 			type: VALIDATION_KEYS.NO_EMPTY_STRING,
// 		},
// 	],
// };

const columns = [
	{
		type: "radio",
		text: "RESERVED_RIGHTS_YES",
		value: "RESERVED_RIGHTS_YES",
	}, {
		type: "radio",
		text: "RESERVED_RIGHTS_NO",
		value: "RESERVED_RIGHTS_NO",
	},
];

const CmsReservedRights = ({ type, rights, onUpdate }) => (
	<div className="reserved-rights">
		<div className="tab-description subtitle2">
			<Translate i18nKey="RESERVED_RIGHTS_DESCRIPTION" />
		</div>
		<div className="reserved-rights-content">
			<CmsPropertyDetailTable
				rights={rights}
				type={type}
				columns={columns}
				onUpdate={onUpdate}
				header={false}
			/>
		</div>
	</div>
);

export default CmsReservedRights;
