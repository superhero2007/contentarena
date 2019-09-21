import React from "react";
import Translate from "@components/Translator/Translate";
import { RIGHTS } from "@constants";
import CmsPropertyDetailTable from "./CmsPropertyDetailTable";

const CmsContentDelivery = ({ onUpdate }) => {
	const heads = [{
		value: "",
	}, {
		value: "Delivered via live feed*",
		// value: <Translate i18nKey="PRODUCTION_CONTENT_DELIVERY_HEAD1" />,
	}, {
		value: "Dedicated content delivery*",
		// value: <Translate i18nKey="PRODUCTION_CONTENT_DELIVERY_HEAD2" />,
	}, {
		value: "Via Highlight & Clip Footage",
		// value: <Translate i18nKey="PRODUCTION_CONTENT_DELIVERY_HEAD3" />,
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
			type: "radio",
			text: "",
			value: false,
		}, {
			type: "radio",
			text: "",
			value: false,
		},
	]);

	return (
		<div className="production-content-delivery">
			<div className="production-description subtitle2">
				<Translate i18nKey="PRODUCTION_CONTENT_DELIVERY_DESCRIPTION" />
			</div>
			<div className="production-content-delivery-content">
				<CmsPropertyDetailTable
					heads={heads}
					data={data}
				/>
			</div>
			<div className="production-content-delivery-footer body2">
				<Translate i18nKey="PRODUCTION_CONTENT_DELIVERY_FOOTER" />
			</div>
		</div>
	);
};

export default CmsContentDelivery;
