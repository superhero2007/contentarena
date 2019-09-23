import React from "react";
import Translate from "@components/Translator/Translate";
import CmsPropertyDetailTable from "./CmsPropertyDetailTable";
import CmsRadioBox from "./CmsRadioBox";
import CmsInputStepper from "./CmsInputStepper";

const CmsDeliveryMethod = ({ onUpdate }) => {
	const heads = [{
		value: "",
	}, {
		value: <Translate i18nKey="DELIVERY_METHOD_SATELLITE" />,
	}, {
		value: <Translate i18nKey="DELIVERY_METHOD_IP" />,
	}, {
		value: <Translate i18nKey="DELIVERY_METHOD_FTP" />,
	}, {
		value: <Translate i18nKey="DELIVERY_METHOD_FIBER" />,
	}];

	const data = [[
		{
			type: "text",
			text: <Translate i18nKey="DELIVERY_METHOD_LIVE_FEED" />,
			value: "",
		}, {
			type: "checkbox",
			text: "",
			value: false,
		}, {
			type: "checkbox",
			text: "",
			value: false,
		}, {
			type: "checkbox",
			text: "",
			value: false,
		}, {
			type: "checkbox",
			text: "",
			value: false,
		},
	]];

	return (
		<div className="delivery-method">
			<div className="tab-description subtitle2">
				<Translate i18nKey="DELIVERY_METHOD_DESCRIPTION" />
			</div>
			<div className="delivery-method-content">
				<CmsPropertyDetailTable
					heads={heads}
					data={data}
				/>
			</div>
			<div className="delivery-method-fee">
				<label className="delivery-method-fee-description">
					<Translate i18nKey="DELIVERY_METHOD_FEE_LABEL" />
				</label>
				<div className="delivery-method-fee-item">
					<CmsRadioBox
						value=""
						text={<Translate i18nKey="DELIVERY_METHOD_FEE_INCLUDED" />}
						onChange={() => {}}
					/>
				</div>
				<div className="delivery-method-fee-item">
					<CmsRadioBox
						value=""
						text={<Translate i18nKey="DELIVERY_METHOD_FEE_PERCENTAGE" />}
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
