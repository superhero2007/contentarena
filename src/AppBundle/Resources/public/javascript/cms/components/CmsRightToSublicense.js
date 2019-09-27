import React from "react";
import Translate from "@components/Translator/Translate";
import CmsPropertyDetailTable from "./CmsPropertyDetailTable";

// export const SUBLICENSE = {
// 	name: "Right to sublicense",
// 	key: "SUBLICENSE",
// 	headers: [
// 		"SUBLICENSE_YES",
// 		"SUBLICENSE_YES_APPROVAL",
// 		"SUBLICENSE_NO",
// 	],
// 	multiple: false,
// 	descriptionKey: "RIGHTS_SUBLICENSE_DESCRIPTION",
// 	textAreaLabelKey: "CL3_COMMENTS_PLACEHOLDER",
// };

const CmsRightToSublicense = ({ type, rights, onUpdate }) => {
	const columns = [{
		value: "SUBLICENSE_YES",
		type: "radio",
		text: "",
	}, {
		value: "SUBLICENSE_YES_APPROVAL",
		type: "radio",
		text: "",
	}, {
		value: "SUBLICENSE_NO",
		type: "radio",
		text: "",
	}];

	return (
		<div className="right-to-sublicense">
			<div className="tab-description subtitle2">
				<Translate i18nKey="SUBLICENSE_DESCRIPTION" />
			</div>
			<div className="right-to-sublicense-content">
				<CmsPropertyDetailTable
					rights={rights}
					type={type}
					columns={columns}
					onUpdate={onUpdate}
				/>
			</div>
		</div>
	);
};

export default CmsRightToSublicense;
