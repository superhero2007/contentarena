import React from "react";
import Translate from "@components/Translator/Translate";
import CmsPropertyDetailTable from "./CmsPropertyDetailTable";

// export const BROADCASTING = {
// 	name: "Transmission Obligation",
// 	key: "BROADCASTING",
// 	headers: [
// 		"BROADCASTING_NO",
// 		"BROADCASTING_YES",
// 	],
// 	textAreaLabelKey: "CL3_COMMENTS_TRANSMISSION_PLACEHOLDER",
// 	multiple: false,
// 	descriptionKey: "RIGHTS_BROADCASTING_DESCRIPTION",
// 	validateTextarea: true,
// 	validations: [
// 		{
// 			key: "BROADCASTING",
// 			value: "BROADCASTING_YES",
// 			keyToCheck: "BROADCASTING_TEXTAREA",
// 			type: VALIDATION_KEYS.NO_EMPTY_STRING,
// 		},
// 	],
// };

const columns = [
	{
		type: "radio",
		text: "BROADCASTING_YES",
		value: "BROADCASTING_YES",
	}, {
		type: "radio",
		text: "BROADCASTING_NO",
		value: "BROADCASTING_NO",
	},
];

const CmsTransmissionObligation = ({ type, rights, onUpdate }) => (
	<div className="transmission-obligation">
		<div className="tab-description subtitle2">
			<Translate i18nKey="BROADCASTING_DESCRIPTION" />
		</div>
		<div className="transmission-obligation-content">
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

export default CmsTransmissionObligation;
