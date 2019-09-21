import React from "react";
import Translate from "@components/Translator/Translate";
import CmsPropertyDetailTable from "./CmsPropertyDetailTable";
import CmsRadioBox from "./CmsRadioBox";
import CmsInputStepper from "./CmsInputStepper";

const CmsDeliveryMethod = ({ onUpdate }) => {
	const heads = [{
		value: "",
	}, {
		value: "Satellite",
		// value: <Translate i18nKey="PRODUCTION_DELIVERY_METHOD_SATELLITE" />,
	}, {
		value: "IP",
		// value: <Translate i18nKey="PRODUCTION_DELIVERY_METHOD_IP" />,
	}, {
		value: "FTP-server",
		// value: <Translate i18nKey="PRODUCTION_DELIVERY_METHOD_FTP" />,
	}, {
		value: "Fiber",
		// value: <Translate i18nKey="PRODUCTION_DELIVERY_METHOD_FIBER" />,
	}];

	const data = [[
		{
			type: "text",
			// text: <Translate i18nKey="PRODUCTION_DELIVERY_METHOD_LIVE_FEED" />,
			text: "Live Feed",
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
		<div className="production-delivery-method">
			<div className="production-description subtitle2">
				<Translate i18nKey="PRODUCTION_DELIVERY_METHOD_DESCRIPTION" />
			</div>
			<div className="production-delivery-method-content">
				<CmsPropertyDetailTable
					heads={heads}
					data={data}
				/>
			</div>
			<div className="production-delivery-method-fee">
				<label className="production-delivery-method-fee-description">
					<Translate i18nKey="PRODUCTION_DELIVERY_METHOD_FEE_LABEL" />
				</label>
				<div className="production-delivery-method-fee-item">
					<CmsRadioBox
						value=""
						text={<Translate i18nKey="PRODUCTION_DELIVERY_METHOD_FEE_INCLUDED" />}
						onChange={() => {}}
					/>
				</div>
				<div className="production-delivery-method-fee-item">
					<CmsRadioBox
						value=""
						text={<Translate i18nKey="PRODUCTION_DELIVERY_METHOD_FEE_PERCENTAGE" />}
						onChange={() => {}}
					/>
					<span className="split">:</span>
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
