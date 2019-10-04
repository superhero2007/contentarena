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
// 	technicalFee: "TECHNICAL_DELIVERY_SATELLITE",
// 	textAreaLabelKey: "CL3_COMMENTS_PLACEHOLDER",
// };

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

const CmsDeliveryMethod = ({ type, rights, onUpdate }) => {
	const firstRight = rights[0];
	const feePercentage = firstRight.details.TECHNICAL_FEE_PERCENTAGE || 0;

	const handleChangeTechnicalFeePercentage = (value) => {
		if (value > 100 || value < 0) {
			return;
		}
		for (const right of rights) {
			right.details.TECHNICAL_FEE_PERCENTAGE = value;
		}
		onUpdate(rights);
	};

	const handleChangeTechnicalFee = (value) => {
		for (const right of rights) {
			right.details.TECHNICAL_FEE = value;
		}
		onUpdate(rights);
	};

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
						value={firstRight.details.TECHNICAL_FEE === "INCLUDED"}
						text={<Translate i18nKey="TECHNICAL_DELIVERY_FEE_INCLUDED" />}
						onChange={() => handleChangeTechnicalFee("INCLUDED")}
					/>
				</div>
				<div className="delivery-method-fee-item">
					<CmsRadioBox
						value={firstRight.details.TECHNICAL_FEE === "ON_TOP"}
						text={<Translate i18nKey="TECHNICAL_DELIVERY_FEE_PERCENTAGE" />}
						onChange={() => handleChangeTechnicalFee("ON_TOP")}
					/>
					<CmsInputStepper
						value={`${feePercentage < 10 ? "0" : ""}${feePercentage}%`}
						onAdd={() => handleChangeTechnicalFeePercentage(feePercentage + 1)}
						onMinus={() => handleChangeTechnicalFeePercentage(feePercentage - 1)}
						onClick={() => handleChangeTechnicalFee("ON_TOP")}
					/>
				</div>
			</div>
		</div>
	);
};

export default CmsDeliveryMethod;
