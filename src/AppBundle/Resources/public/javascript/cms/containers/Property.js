import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { DefaultBox } from "../../common/components/Containers";
import { CMS_PROPERTY_TABS, ROUTE_PATHS, SERVER_ERROR_CODES } from "@constants";
import api from "../../api";
import Loader from "../../common/components/Loader/Loader";
import RightsOverview from "./RightsOverview";
import CmsCommercialOverview from "./CmsCommercialOverview";
import CmsFixtures from "./CmsFixtures";
import CmsListingOverview from "./CmsListingOverview";
import PropertyDetails from "./PropertyDetails";

class Property extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loadingProperty: false,
			property: {},
			activeTab: props.tab,
		};
	}

	getTranslatedTabs = () => ({
		[CMS_PROPERTY_TABS.COMMERCIAL]: this.context.t("CMS_PROPERTY_TAB_COMMERCIAL"),
		[CMS_PROPERTY_TABS.RIGHTS]: this.context.t("CMS_PROPERTY_TAB_RIGHTS"),
		[CMS_PROPERTY_TABS.FIXTURES]: this.context.t("CMS_PROPERTY_TAB_FIXTURES"),
		[CMS_PROPERTY_TABS.LISTING]: this.context.t("CMS_PROPERTY_TAB_LISTING"),
		[CMS_PROPERTY_TABS.DETAILS]: this.context.t("CMS_PROPERTY_TAB_DETAILS"),
	});

	componentDidMount() {
		const { propertyId } = this.props;
		if (propertyId) this.fetchProperty(propertyId);
	}

	fetchProperty = (propertyId) => {
		this.setState({ loadingProperty: true });
		api.properties.fetchProperty({ propertyId })
			.then(({ data: { property } }) => {
				this.setState({ property });
			})
			.catch(({ response: { data: { code } } }) => {
				this.setState({ errorCode: code });
			})
			.finally(() => {
				this.setState({ loadingProperty: false });
			});
	};

	render() {
		const { propertyId, history } = this.props;
		const {
			activeTab, loadingProperty, property, errorCode,
		} = this.state;
		const { name } = property;

		console.log(this);

		if (loadingProperty) {
			return (
				<DefaultBox>
					<Loader loading />
				</DefaultBox>
			);
		}

		if (errorCode) {
			return (
				<DefaultBox>
					{
						errorCode === SERVER_ERROR_CODES.PROPERTY_DOES_NOT_EXISTS
						&& this.context.t("CMS_PROPERTY_DOES_NOT_EXISTS")
					}
				</DefaultBox>
			);
		}

		const translatedTabs = this.getTranslatedTabs();

		return (
			<DefaultBox>
				<h4 className="title">
					{name}
				</h4>

				<div className="ca-tabs">
					{
						Object.values(CMS_PROPERTY_TABS).map(tab => (
							<a
								className={`tab lg ${activeTab === tab ? "active" : ""}`}
								onClick={() => history.push(`${ROUTE_PATHS.PROPERTIES}/${propertyId}/${tab}`)}
							>
								{translatedTabs[tab]}
							</a>
						))
					}
				</div>

				{activeTab === CMS_PROPERTY_TABS.RIGHTS && <RightsOverview property={property} />}
				{activeTab === CMS_PROPERTY_TABS.FIXTURES && <CmsFixtures property={property} />}
				{activeTab === CMS_PROPERTY_TABS.COMMERCIAL && <CmsCommercialOverview property={property} />}
				{activeTab === CMS_PROPERTY_TABS.LISTING && <CmsListingOverview property={property} history={history} />}
				{activeTab === CMS_PROPERTY_TABS.DETAILS && <PropertyDetails property={property} />}


			</DefaultBox>
		);
	}
}

Property.contextTypes = {
	t: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => state;

const mapDispatchToProps = dispatch => ({
	// updateProfile: profile => dispatch(updateProfile(profile)),
});


export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Property);
