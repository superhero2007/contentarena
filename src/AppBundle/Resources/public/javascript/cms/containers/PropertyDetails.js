import React, { Component } from "react";
import PropTypes from "prop-types";
import Translate from "@components/Translator/Translate";
import { CMS_PROPERTY_DETAILS_TABS } from "@constants";
import PropertyDetailsEditedProgramTab from "../components/PropertyDetailsEditedProgramTab";
import PropertyDetailsDescriptionTab from "../components/PropertyDetailsDescriptionTab";
import PropertyDetailsLicenseTab from "../components/PropertyDetailsLicenseTab";
import PropertyDetailsProductionTab from "../components/PropertyDetailsProductionTab";
import PropertyDetailsRightsTab from "../components/PropertyDetailsRightsTab";
import CmsTabElement from "../components/CmsTabElement";

class PropertyDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeTab: CMS_PROPERTY_DETAILS_TABS.EDIT_PROGRAM,
		};
	}

	getTabs = props => ({
		[CMS_PROPERTY_DETAILS_TABS.EVENT_DETAILS]: {
			label: <Translate i18nKey="CMS_PROPERTY_DETAILS_TAB_DESCRIPTION_LABEL" />,
			component: <PropertyDetailsDescriptionTab {...props} />,
		},
		[CMS_PROPERTY_DETAILS_TABS.LICENSE_DETAILS]: {
			label: <Translate i18nKey="CMS_PROPERTY_DETAILS_TAB_LICENSE_LABEL" />,
			component: <PropertyDetailsLicenseTab {...props} />,
		},
		[CMS_PROPERTY_DETAILS_TABS.EDIT_PROGRAM]: {
			label: <Translate i18nKey="CMS_PROPERTY_DETAILS_TAB_EDIT_LABEL" />,
			component: <PropertyDetailsEditedProgramTab {...props} />,
		},
		[CMS_PROPERTY_DETAILS_TABS.PRODUCTION_DETAILS]: {
			label: <Translate i18nKey="CMS_PROPERTY_DETAILS_TAB_PRODUCTION_LABEL" />,
			component: <PropertyDetailsProductionTab {...props} />,
		},
		[CMS_PROPERTY_DETAILS_TABS.RIGHTS_DETAILS]: {
			label: <Translate i18nKey="CMS_PROPERTY_DETAILS_TAB_RIGHT_LABEL" />,
			component: <PropertyDetailsRightsTab {...props} />,
		},
	});

	render() {
		const { history } = this.props;
		const tabs = this.getTabs({ history });
		return (
			<section className="property-details-tab">
				<div className="details-tab">
					{Object.values(CMS_PROPERTY_DETAILS_TABS).map((tab, index) => (
						<CmsTabElement
							key={index}
							label={tabs[tab].label}
						>
							{tabs[tab].component}
						</CmsTabElement>
					))}
				</div>
			</section>
		);
	}
}

PropertyDetails.contextTypes = {
	t: PropTypes.func.isRequired,
};

export default PropertyDetails;
