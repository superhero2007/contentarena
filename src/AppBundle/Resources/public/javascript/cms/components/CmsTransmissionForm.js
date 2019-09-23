import React from "react";
import Translate from "@components/Translator/Translate";
import { RIGHTS } from "@constants";
import CmsPropertyDetailTable from "./CmsPropertyDetailTable";

const CmsTransmissionForm = ({ onUpdate }) => {
	const heads = [{
		value: "",
	}, {
		value: <Translate i18nKey="TRANSMISSION_FORM_ALL" />,
	}, {
		value: <Translate i18nKey="TRANSMISSION_FORM_FREE" />,
	}, {
		value: <Translate i18nKey="TRANSMISSION_FORM_PAY" />,
	}, {
		value: <Translate i18nKey="TRANSMISSION_FORM_CLOSED" />,
	}];

	const data = RIGHTS.map(right => [
		{
			type: "text",
			text: right.name,
			value: "",
		}, {
			type: "radio",
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
	]);

	return (
		<div className="transmission-form">
			<div className="tab-description subtitle2">
				<Translate i18nKey="TRANSMISSION_FORM_DESCRIPTION" />
			</div>
			<div className="transmission-form-content">
				<CmsPropertyDetailTable
					heads={heads}
					data={data}
				/>
			</div>
		</div>
	);
};

export default CmsTransmissionForm;
