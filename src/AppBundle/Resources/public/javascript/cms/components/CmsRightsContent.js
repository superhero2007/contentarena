import React from "react";
import { RIGHTS_TAB } from "@constants";

import CmsRightToSublicense from "./CmsRightToSublicense";
import CmsTransmissionObligation from "./CmsTransmissionObligation";
import CmsTransmissionForm from "./CmsTransmissionForm";
import CmsTransmissionMeans from "./CmsTransmissionMeans";
import CmsLicensedLanguages from "./CmsLicensedLanguages";
import CmsReservedRights from "./CmsReservedRights";

const CmsRightsContent = ({ type, onUpdate }) => {
	switch (type) {
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

export default CmsRightsContent;
