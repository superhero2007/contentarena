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

const CmsTabContent = ({ type, ...props }) => {
	let Component = null;
	switch (type) {
	case PRODUCTION_TAB.CONTENT_DELIVERY:
		Component = CmsContentDelivery;
		break;
	case PRODUCTION_TAB.TECHNICAL_DELIVERY:
		Component = CmsDeliveryMethod;
		break;
	case PRODUCTION_TAB.GRAPHICS:
		Component = CmsGraphics;
		break;
	case PRODUCTION_TAB.ASPECT_RATIO:
		Component = CmsAspectRatio;
		break;
	case PRODUCTION_TAB.COMMENTARY:
		Component = CmsCommentary;
		break;
	case PRODUCTION_TAB.CAMERA:
		Component = CmsCameraStandards;
		break;
	case RIGHTS_TAB.SUBLICENSE:
		Component = CmsRightToSublicense;
		break;
	case RIGHTS_TAB.BROADCASTING:
		Component = CmsTransmissionObligation;
		break;
	case RIGHTS_TAB.EXPLOITATION_FORM:
		Component = CmsTransmissionForm;
		break;
	case RIGHTS_TAB.TRANSMISSION_MEANS:
		Component = CmsTransmissionMeans;
		break;
	case RIGHTS_TAB.LICENSED_LANGUAGES:
		Component = CmsLicensedLanguages;
		break;
	case RIGHTS_TAB.RESERVED_RIGHTS:
		Component = CmsReservedRights;
		break;
	default:
		return <div />;
	}

	return <Component type={type} {...props} />;
};

export default CmsTabContent;
