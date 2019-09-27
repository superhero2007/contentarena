import React from "react";
import Translate from "@components/Translator/Translate";
import CmsPropertyDetailTable from "./CmsPropertyDetailTable";

// export const CONTENT_DELIVERY = {
// 	name: "Content Delivery",
// 	descriptionKey: "RIGHTS_CONTENT_DELIVERY_DESCRIPTION",
// 	key: "CONTENT_DELIVERY",
// 	headers: [
// 		"CONTENT_DELIVERY_LIVE",
// 		"CONTENT_DELIVERY_DEDICATED",
// 	],
// 	multiple: false,
// 	textAreaLabelKey: "CL3_COMMENTS_PLACEHOLDER",
// 	disabled: {
// 		CONTENT_DELIVERY_DEDICATED: ["LT", "PR"],
// 		CONTENT_DELIVERY_LIVE: ["LT", "PR"],
// 	},
// };

const CmsContentDelivery = ({ type, rights, onUpdate }) => {
	const disabled = {
		CONTENT_DELIVERY_DEDICATED: ["LT", "PR"],
		CONTENT_DELIVERY_LIVE: ["LT", "PR"],
	};

	const columns = [{
		value: "CONTENT_DELIVERY_LIVE",
		type: "radio",
		text: "",
	}, {
		value: "CONTENT_DELIVERY_DEDICATED",
		type: "radio",
		text: "",
	}, {
		value: "CONTENT_DELIVERY_FOOTAGE",
		type: "radio",
		text: "",
	}];

	return (
		<div className="content-delivery">
			<div className="tab-description subtitle2">
				<Translate i18nKey="CONTENT_DELIVERY_DESCRIPTION" />
			</div>
			<div className="content-delivery-content">
				<CmsPropertyDetailTable
					rights={rights}
					type={type}
					columns={columns}
					disabled={disabled}
					onUpdate={onUpdate}
				/>
			</div>
			<div className="content-delivery-footer body2">
				<Translate i18nKey="CONTENT_DELIVERY_FOOTER" />
			</div>
		</div>
	);
};

export default CmsContentDelivery;
