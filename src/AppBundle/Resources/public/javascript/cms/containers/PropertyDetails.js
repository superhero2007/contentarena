import React from "react";
import PropTypes from "prop-types";
import Translate from "@components/Translator/Translate";
import { CMS_PROPERTY_DETAILS_TABS } from "@constants";
import PropertyDetailsEditedProgramTab from "../components/PropertyDetailsEditedProgramTab";
import PropertyDetailsEventTab from "../components/PropertyDetailsEventTab";
import PropertyDetailsLicenseTab from "../components/PropertyDetailsLicenseTab";
import PropertyDetailsProductionTab from "../components/PropertyDetailsProductionTab";
import PropertyDetailsRightsTab from "../components/PropertyDetailsRightsTab";

class PropertyDetails extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activeTab: CMS_PROPERTY_DETAILS_TABS.EDIT_PROGRAM,
		};
	}

	getTabs = () => ({
		[CMS_PROPERTY_DETAILS_TABS.EVENT_DETAILS]: {
			label: <Translate i18nKey="CMS_PROPERTY_DETAILS_TAB_EVENT_LABEL" />,
			component: PropertyDetailsEventTab,
		},
		[CMS_PROPERTY_DETAILS_TABS.EDIT_PROGRAM]: {
			label: <Translate i18nKey="CMS_PROPERTY_DETAILS_TAB_EDIT_LABEL" />,
			component: PropertyDetailsEditedProgramTab,
		},
		[CMS_PROPERTY_DETAILS_TABS.LICENSE_DETAILS]: {
			label: <Translate i18nKey="CMS_PROPERTY_DETAILS_TAB_LICENSE_LABEL" />,
			component: PropertyDetailsLicenseTab,
		},
		[CMS_PROPERTY_DETAILS_TABS.PRODUCTION_DETAILS]: {
			label: <Translate i18nKey="CMS_PROPERTY_DETAILS_TAB_PRODUCTION_LABEL" />,
			component: PropertyDetailsProductionTab,
		},
		[CMS_PROPERTY_DETAILS_TABS.RIGHTS_DETAILS]: {
			label: <Translate i18nKey="CMS_PROPERTY_DETAILS_TAB_RIGHT_LABEL" />,
			component: PropertyDetailsRightsTab,
		},
	});

	handleChangeTab = (activeTab) => { this.setState({ activeTab }); };

	render() {
		const { activeTab } = this.state;
		const { history } = this.props;
		const tabs = this.getTabs();
		const ActiveComponent = tabs[activeTab].component;
		return (
			<section className="property-details-tab">
				<div className="details-tab-wrapper">
					{Object.values(CMS_PROPERTY_DETAILS_TABS).map((tab, index) => (
						<span
							key={index}
							onClick={() => this.handleChangeTab(tab)}
							className={`tab${tab === activeTab ? " active" : ""}`}
						>
							{tabs[tab].label}
						</span>
					))}
				</div>

				{<ActiveComponent history={history} />}
			</section>
		);
	}
}

PropertyDetails.contextTypes = {
	t: PropTypes.func.isRequired,
};

export default PropertyDetails;
