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

const CmsTabContent = ({ type, rights, onUpdate }) => {
	switch (type) {
	case PRODUCTION_TAB.CONTENT_DELIVERY:
		return (
			<CmsContentDelivery
				onUpdate={onUpdate}
				rights={rights}
				type={type}
			/>
		);
	case PRODUCTION_TAB.TECHNICAL_DELIVERY:
		return (
			<CmsDeliveryMethod
				onUpdate={onUpdate}
				rights={rights}
				type={type}
			/>
		);
	case PRODUCTION_TAB.GRAPHICS:
		return (
			<CmsGraphics
				onUpdate={onUpdate}
				rights={rights}
				type={type}
			/>
		);
	case PRODUCTION_TAB.ASPECT_RATIO:
		return (
			<CmsAspectRatio
				onUpdate={onUpdate}
				rights={rights}
				type={type}
			/>
		);
	case PRODUCTION_TAB.COMMENTARY:
		return (
			<CmsCommentary
				onUpdate={onUpdate}
				rights={rights}
				type={type}
			/>
		);
	case PRODUCTION_TAB.CAMERA:
		return (
			<CmsCameraStandards
				onUpdate={onUpdate}
				rights={rights}
				type={type}
			/>
		);
	case RIGHTS_TAB.SUBLICENSE:
		return (
			<CmsRightToSublicense
				onUpdate={onUpdate}
				rights={rights}
				type={type}
			/>
		);
	case RIGHTS_TAB.BROADCASTING:
		return (
			<CmsTransmissionObligation
				onUpdate={onUpdate}
				rights={rights}
				type={type}
			/>
		);
	case RIGHTS_TAB.EXPLOITATION_FORM:
		return (
			<CmsTransmissionForm
				onUpdate={onUpdate}
				rights={rights}
				type={type}
			/>
		);
	case RIGHTS_TAB.TRANSMISSION_MEANS:
		return (
			<CmsTransmissionMeans
				onUpdate={onUpdate}
				rights={rights}
				type={type}
			/>
		);
	case RIGHTS_TAB.LICENSED_LANGUAGES:
		return (
			<CmsLicensedLanguages
				onUpdate={onUpdate}
				rights={rights}
				type={type}
			/>
		);
	case RIGHTS_TAB.RESERVED_RIGHTS:
		return (
			<CmsReservedRights
				onUpdate={onUpdate}
				rights={rights}
				type={type}
			/>
		);
	default:
		return <div />;
	}
};

export default CmsTabContent;
