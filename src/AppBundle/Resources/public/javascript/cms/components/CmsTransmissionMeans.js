import React from "react";
import Translate from "@components/Translator/Translate";
import { RIGHTS } from "@constants";
import CmsPropertyDetailTable from "./CmsPropertyDetailTable";

const CmsTransmissionMeans = ({ onUpdate }) => {
	const heads = [{
		value: "",
	}, {
		value: "All",
		// value: <Translate i18nKey="PRODUCTION_TRANSMISSION_MEANS_ALL" />,
	}, {
		value: "Cable & IPTV",
		// value: <Translate i18nKey="PRODUCTION_TRANSMISSION_MEANS_CABLE" />,
	}, {
		value: "Satellite",
		// value: <Translate i18nKey="PRODUCTION_TRANSMISSION_MEANS_SATELLITE" />,
	}, {
		value: "Digital Terrestrial",
		// value: <Translate i18nKey="PRODUCTION_TRANSMISSION_MEANS_DIGITAL" />,
	}, {
		value: "Internet/OTT",
		// value: <Translate i18nKey="PRODUCTION_TRANSMISSION_MEANS_INTERNET" />,
	}, {
		value: "Mobile",
		// value: <Translate i18nKey="PRODUCTION_TRANSMISSION_MEANS_MOBILE" />,
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
		<div className="production-transmission-means">
			<div className="production-description subtitle2">
				<Translate i18nKey="PRODUCTION_TRANSMISSION_MEANS_DESCRIPTION" />
			</div>
			<div className="production-transmission-means-content">
				<CmsPropertyDetailTable
					heads={heads}
					data={data}
				/>
			</div>
		</div>
	);
};

export default CmsTransmissionMeans;
