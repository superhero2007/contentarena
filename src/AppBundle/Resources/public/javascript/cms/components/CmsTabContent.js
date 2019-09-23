import React from "react";
import { PRODUCTION_TAB, RIGHTS_TAB } from "@constants";

import CmsContentDelivery from "./CmsContentDelivery";
import CmsDeliveryMethod from "./CmsDeliveryMethod";
import CmsGraphics from "./CmsGraphics";
import CmsAspectRatio from "./CmsAspectRatio";
import CmsCommentary from "./CmsCommentary";
import CmsCameraStandards from "./CmsCameraStandards";

import CmsRightToSublicense from "./CmsRightToSublicense";
import CmsTransmissionObligation from "./CmsTransmissionObligation";
import CmsTransmissionForm from "./CmsTransmissionForm";
import CmsTransmissionMeans from "./CmsTransmissionMeans";
import CmsLicensedLanguages from "./CmsLicensedLanguages";
import CmsReservedRights from "./CmsReservedRights";

const CmsTabContent = ({ type, onUpdate }) => {
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
	case RIGHTS_TAB.RIGHT_TO_SUBLICENSE:
		return <CmsRightToSublicense onUpdate={onUpdate} />;
	case RIGHTS_TAB.TRANSMISSION_OBLIGATION:
		return <CmsTransmissionObligation onUpdate={onUpdate} />;
	case RIGHTS_TAB.TRANSMISSION_FORM:
		return <CmsTransmissionForm onUpdate={onUpdate} />;
	case RIGHTS_TAB.TRANSMISSION_MEANS:
		return <CmsTransmissionMeans onUpdate={onUpdate} />;
	case RIGHTS_TAB.LICENSED_LANGUAGES:
		return <CmsLicensedLanguages onUpdate={onUpdate} />;
	case RIGHTS_TAB.RESERVED_RIGHTS:
		return <CmsReservedRights onUpdate={onUpdate} />;
	default:
		return <div />;
	}
};

export default CmsTabContent;
