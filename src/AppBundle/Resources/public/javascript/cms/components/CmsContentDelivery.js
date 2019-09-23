import React from "react";
import Translate from "@components/Translator/Translate";
import { RIGHTS } from "@constants";
import CmsPropertyDetailTable from "./CmsPropertyDetailTable";

const CmsContentDelivery = ({ onUpdate }) => {
	const heads = [{
		value: "",
	}, {
		value: <Translate i18nKey="CONTENT_DELIVERY_LIVE" />,
	}, {
		value: <Translate i18nKey="CONTENT_DELIVERY_DEDICATED" />,
	}, {
		value: <Translate i18nKey="CONTENT_DELIVERY_FOOTAGE" />,
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
		<div className="content-delivery">
			<div className="tab-description subtitle2">
				<Translate i18nKey="CONTENT_DELIVERY_DESCRIPTION" />
			</div>
			<div className="content-delivery-content">
				<CmsPropertyDetailTable
					heads={heads}
					data={data}
				/>
			</div>
			<div className="content-delivery-footer body2">
				<Translate i18nKey="CONTENT_DELIVERY_FOOTER" />
			</div>
		</div>
	);
};

export default CmsContentDelivery;
