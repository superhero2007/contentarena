import React from "react";
import Translate from "@components/Translator/Translate";
import CmsPropertyDetailTable from "./CmsPropertyDetailTable";

// export const TRANSMISSION_MEANS = {
// 	name: "Transmission means",
// 	key: "TRANSMISSION_MEANS",
// 	headers: [
// 		"TRANSMISSION_MEANS_ALL",
// 		"TRANSMISSION_MEANS_CABLE",
// 		"TRANSMISSION_MEANS_SATELLITE",
// 		"TRANSMISSION_MEANS_DIGITAL",
// 		"TRANSMISSION_MEANS_OTT/INTERNET",
// 		"TRANSMISSION_MEANS_MOBILE",
// 	],
// 	multiple: true,
// 	descriptionKey: "RIGHTS_TRANSMISSION_MEANS_DESCRIPTION",
// 	selectAllCheckbox: "TRANSMISSION_MEANS_ALL",
// 	textAreaLabelKey: "CL3_COMMENTS_PLACEHOLDER",
// };

const CmsTransmissionMeans = ({ type, rights, onUpdate }) => {
	const columns = [{
		value: "TRANSMISSION_MEANS_ALL",
		type: "radio",
		text: "",
	}, {
		value: "TRANSMISSION_MEANS_CABLE",
		type: "checkbox",
		text: "",
	}, {
		value: "TRANSMISSION_MEANS_SATELLITE",
		type: "checkbox",
		text: "",
	}, {
		value: "TRANSMISSION_MEANS_DIGITAL",
		type: "checkbox",
		text: "",
	}, {
		value: "TRANSMISSION_MEANS_INTERNET",
		type: "checkbox",
		text: "",
	}, {
		value: "TRANSMISSION_MEANS_MOBILE",
		type: "checkbox",
		text: "",
	}];

	return (
		<div className="transmission-means">
			<div className="tab-description subtitle2">
				<Translate i18nKey="TRANSMISSION_MEANS_DESCRIPTION" />
			</div>
			<div className="transmission-means-content">
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
};

export default CmsTransmissionMeans;
