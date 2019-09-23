import React from "react";
import Translate from "@components/Translator/Translate";
import { RIGHTS } from "@constants";
import CmsPropertyDetailTable from "./CmsPropertyDetailTable";

const CmsTransmissionMeans = ({ onUpdate }) => {
	const heads = [{
		value: "",
	}, {
		value: <Translate i18nKey="TRANSMISSION_MEANS_ALL" />,
	}, {
		value: <Translate i18nKey="TRANSMISSION_MEANS_CABLE" />,
	}, {
		value: <Translate i18nKey="TRANSMISSION_MEANS_SATELLITE" />,
	}, {
		value: <Translate i18nKey="TRANSMISSION_MEANS_DIGITAL" />,
	}, {
		value: <Translate i18nKey="TRANSMISSION_MEANS_INTERNET" />,
	}, {
		value: <Translate i18nKey="TRANSMISSION_MEANS_MOBILE" />,
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
		<div className="transmission-means">
			<div className="tab-description subtitle2">
				<Translate i18nKey="TRANSMISSION_MEANS_DESCRIPTION" />
			</div>
			<div className="transmission-means-content">
				<CmsPropertyDetailTable
					heads={heads}
					data={data}
				/>
			</div>
		</div>
	);
};

export default CmsTransmissionMeans;
