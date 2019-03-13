import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { DefaultBox } from "../../common/components/Containers";
import { CMS_PROPERTY_TABS, ROUTE_PATHS, SERVER_ERROR_CODES } from "../../common/constants";
import api from "../../api";
import Loader from "../../common/components/Loader/Loader";
import RightsOverview from "./RightsOverview";
import CmsCommercialOverview from "./CmsCommercialOverview";
import CmsFixtures from "./CmsFixtures";
import CmsListingOverview from "./CmsListingOverview";
import PropertyDetails from "./PropertyDetails";
import { fetchCountries, fetchRegions, fetchTerritories } from "../actions/propertyActions";

class Property extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loadingProperty: false,
			property: props.property,
			activeTab: props.tab
		};
	}

	componentDidMount(){
		const { propertyId } = this.props;
		if (!propertyId) return false;

		this.fetchProperty(propertyId);
		this.props.getTerritories();
		this.props.getRegions();
	};

	fetchProperty = (propertyId) => {
		this.setState({ loadingProperty: true });
		api.properties.fetchProperty({propertyId})
			.then(({ data: { property } }) => {
				this.setState({ property: property });
			})
			.catch(({ response: {data:{ success, property, code }}}) => {
				this.setState({ errorCode: code });
			})
			.finally(() => {
				this.setState({ loadingProperty: false });
			});
	};

	isLoadingRegions = () => {
		const { property: { isRegionsFetched, isTerritoriesFetched } } = this.props;
		return  !isRegionsFetched || !isTerritoriesFetched;
	};

	render() {
		const { propertyId, history, } = this.props;
		const { activeTab, loadingProperty, property, errorCode } = this.state;
		const { name, } = property;

		if (loadingProperty || this.isLoadingRegions()) {
			return (
				<DefaultBox>
					<Loader loading />
				</DefaultBox>
			)
		}

		if (errorCode ){
			return (
				<DefaultBox>
					{
						errorCode === SERVER_ERROR_CODES.PROPERTY_DOES_NOT_EXISTS &&
						this.context.t("CMS_PROPERTY_DOES_NOT_EXISTS")
					}
				</DefaultBox>
			)
		}

		return (
			<DefaultBox>
				<h4 className="title">
					{name}
				</h4>

				<div className="ca-tabs">
					{
						Object.values(CMS_PROPERTY_TABS).map(tab => {
							//TODO: Add translation to tab names
							return (
								<a
									key={tab}
									className={`tab lg ${activeTab === tab ? "active" : ""}`}
									onClick={() => {
										history.push(`${ROUTE_PATHS.PROPERTIES}/${propertyId}/${tab}`);
									}}
								>
									{tab}
								</a>
							)
						})
					}
				</div>

				{activeTab === CMS_PROPERTY_TABS.RIGHTS && <RightsOverview property={property} />}
				{activeTab === CMS_PROPERTY_TABS.FIXTURES && <CmsFixtures property={property} />}
				{activeTab === CMS_PROPERTY_TABS.COMMERCIAL && <CmsCommercialOverview property={property} />}
				{activeTab === CMS_PROPERTY_TABS.LISTING && <CmsListingOverview property={property} />}
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
	getTerritories: () => dispatch(fetchTerritories()),
	getRegions: () => dispatch(fetchRegions()),
});


export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Property);
