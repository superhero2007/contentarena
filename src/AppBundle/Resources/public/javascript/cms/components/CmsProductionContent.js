import React from "react";
import { PRODUCTION_TAB } from "@constants";

import CmsContentDelivery from "./CmsContentDelivery";
import CmsDeliveryMethod from "./CmsDeliveryMethod";
import CmsGraphics from "./CmsGraphics";
import CmsAspectRatio from "./CmsAspectRatio";
import CmsCommentary from "./CmsCommentary";
import CmsCameraStandards from "./CmsCameraStandards";

const CmsProductionContent = ({ type, onUpdate }) => {
	switch (type) {
	case PRODUCTION_TAB.CONTENT_DELIVERY:
		return <CmsContentDelivery onUpdate={onUpdate} />;
	case PRODUCTION_TAB.DELIVERY_METHOD:
		return <CmsDeliveryMethod onUpdate={onUpdate} />;
	case PRODUCTION_TAB.GRAPHICS:
		return <CmsGraphics onUpdate={onUpdate} />;
	case PRODUCTION_TAB.ASPECT_RATIO:
		return <CmsAspectRatio onUpdate={onUpdate} />;
	case PRODUCTION_TAB.COMMENTARY:
		return <CmsCommentary onUpdate={onUpdate} />;
	case PRODUCTION_TAB.CAMERA_STANDARDS:
		return <CmsCameraStandards onUpdate={onUpdate} />;
	default:
		return <div />;
	}
};

export default CmsProductionContent;
