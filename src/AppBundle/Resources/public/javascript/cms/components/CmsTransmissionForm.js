import React from "react";
import Translate from "@components/Translator/Translate";
import CmsPropertyDetailTable from "./CmsPropertyDetailTable";

// export const EXPLOITATION_FORM = {
// 	name: "Transmission Form",
// 	key: "EXPLOITATION_FORM",
// 	headers: [
// 		"EXPLOITATION_FORM_ALL",
// 		"EXPLOITATION_FORM_FREE",
// 		"EXPLOITATION_FORM_PAY",
// 		"EXPLOITATION_FORM_CLOSED",
// 	],
// 	multiple: true,
// 	descriptionKey: "RIGHTS_EXPLOITATION_FORM_DESCRIPTION",
// 	selectAllCheckbox: "EXPLOITATION_FORM_ALL",
// 	textAreaLabelKey: "CL3_COMMENTS_PLACEHOLDER",
// };

const columns = [{
	type: "radio",
	text: "",
	value: "EXPLOITATION_FORM_ALL",
}, {
	type: "checkbox",
	text: "",
	value: "EXPLOITATION_FORM_FREE",
}, {
	type: "checkbox",
	text: "",
	value: "EXPLOITATION_FORM_PAY",
}, {
	type: "checkbox",
	text: "",
	value: "EXPLOITATION_FORM_CLOSED",
}];

const CmsTransmissionForm = ({ type, rights, onUpdate }) => (
	<div className="transmission-form">
		<div className="tab-description subtitle2">
			<Translate i18nKey="EXPLOITATION_FORM_DESCRIPTION" />
		</div>
		<div className="transmission-form-content">
			<CmsPropertyDetailTable
				rights={rights}
				type={type}
				columns={columns}
				onUpdate={onUpdate}
				selectAllCheckbox
			/>
		</div>
	</div>
);

export default CmsTransmissionForm;
