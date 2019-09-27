import React from "react";
import Translate from "@components/Translator/Translate";
import CmsPropertyDetailTable from "./CmsPropertyDetailTable";
import CmsRadioBox from "./CmsRadioBox";
import CmsInputStepper from "./CmsInputStepper";

// export const TECHNICAL_DELIVERY = {
// 	name: "Delivery Method",
// 	descriptionKey: "RIGHTS_TECHNICAL_DELIVERY_DESCRIPTION",
// 	key: "TECHNICAL_DELIVERY",
// 	productionLabel: true,
// 	checkDelivery: true,
// 	headers: [
// 		"TECHNICAL_DELIVERY_SATELLITE",
// 		"TECHNICAL_DELIVERY_IP",
// 		"TECHNICAL_DELIVERY_FTP",
// 		"TECHNICAL_DELIVERY_FIBER",
// 	],
// 	multiple: true,
// 	technicalFee: "TECHNICAL_DELIVERY_SATELLITE", - ?
// 	textAreaLabelKey: "CL3_COMMENTS_PLACEHOLDER",
// };

const CmsDeliveryMethod = ({ type, rights, onUpdate }) => {
	// <Translate i18nKey="TECHNICAL_DELIVERY_LIVE_FEED" />,
	const columns = [{
		value: "TECHNICAL_DELIVERY_SATELLITE",
		type: "checkbox",
		text: "",
	}, {
		value: "TECHNICAL_DELIVERY_IP",
		type: "checkbox",
		text: "",
	}, {
		value: "TECHNICAL_DELIVERY_FTP",
		type: "checkbox",
		text: "",
	}, {
		value: "TECHNICAL_DELIVERY_FIBER",
		type: "checkbox",
		text: "",
	}];

	return (
		<div className="delivery-method">
			<div className="tab-description subtitle2">
				<Translate i18nKey="TECHNICAL_DELIVERY_DESCRIPTION" />
			</div>
			<div className="delivery-method-content">
				<CmsPropertyDetailTable
					rights={rights}
					type={type}
					columns={columns}
					onUpdate={onUpdate}
					checkDelivery
				/>
			</div>
			<div className="delivery-method-fee">
				<label className="delivery-method-fee-description">
					<Translate i18nKey="TECHNICAL_DELIVERY_FEE_LABEL" />
				</label>
				<div className="delivery-method-fee-item">
					<CmsRadioBox
						value=""
						text={<Translate i18nKey="TECHNICAL_DELIVERY_FEE_INCLUDED" />}
						onChange={() => {}}
					/>
				</div>
				<div className="delivery-method-fee-item">
					<CmsRadioBox
						value=""
						text={<Translate i18nKey="TECHNICAL_DELIVERY_FEE_PERCENTAGE" />}
						onChange={() => {}}
					/>
					<CmsInputStepper
						value="00%"
						onAdd={() => {}}
						onMinus={() => {}}
					/>
				</div>
			</div>
		</div>
	);
};

export default CmsDeliveryMethod;
