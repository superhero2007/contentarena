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
import { fetchCountries, fetchRegions, fetchTerritories } from "../actions/propertyActions";

class Property extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loadingProperty: false,
			property: null,
			activeTab: props.tab
		};
	}

	getTranslatedTabs = () => ({
		[CMS_PROPERTY_TABS.COMMERCIAL]: this.context.t("CMS_PROPERTY_TAB_COMMERCIAL"),
		[CMS_PROPERTY_TABS.RIGHTS]: this.context.t("CMS_PROPERTY_TAB_RIGHTS"),
		[CMS_PROPERTY_TABS.FIXTURES]: this.context.t("CMS_PROPERTY_TAB_FIXTURES"),
		[CMS_PROPERTY_TABS.LISTING]: this.context.t("CMS_PROPERTY_TAB_LISTING"),
		[CMS_PROPERTY_TABS.DETAILS]: this.context.t("CMS_PROPERTY_TAB_DETAILS"),
	});

	componentDidMount(){
		const { match : { params : { propertyId, tab} = {} } } = this.props;
		if (!propertyId) return false;

		if (!this.state.property) this.fetchProperty(propertyId);
		this.props.getTerritories();
		this.props.getRegions();
		this.setState({propertyId, activeTab: tab});
	};

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

	isLoadingRegions = () => {
		const { property: { isRegionsFetched, isTerritoriesFetched } } = this.props;
		return  !isRegionsFetched || !isTerritoriesFetched;
	};

	render() {
		const { history, match : { params : { propertyId, tab } = {} } } = this.props;
		const { loadingProperty, property, errorCode } = this.state;

		if (loadingProperty || this.isLoadingRegions() || !property ) {
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
			<div className="default-container no-title property">
				<DefaultBox>
					<h4 className="title title-property-wrapper">
						<span>{property.name}</span>
						<div className="title-action-wrapper">
							<a className="ca-btn primary" href={ROUTE_PATHS.CREATE_LISTING}>
								{this.context.t("CMS_EMPTY_LISTING_CREATE_LISTING")}
							</a>
							<button
								onClick={() => { console.info("add deal not specified"); }}
								className="ca-btn primary"
							>
								{this.context.t("CMS_PROPERTY_ADD_DEAL")}
							</button>
							<i className="fa fa-pencil-square-o" onClick={() => { console.info("pensil icon not specified"); }} />
						</div>
					</h4>

					<div className="ca-tabs">
						{
							Object.values(CMS_PROPERTY_TABS).map(t => {
								//TODO: Add translation to tab names
								return (
									<a
										key={t}
										className={`tab lg ${t === tab ? "active" : ""}`}
										onClick={() => {
											history.push(`${ROUTE_PATHS.PROPERTIES}/${propertyId}/${t}`);
										}}
									>
										{translatedTabs[t]}
									</a>
								)
							})
						}
					</div>

					{tab === CMS_PROPERTY_TABS.RIGHTS && <RightsOverview property={property} />}
					{tab === CMS_PROPERTY_TABS.FIXTURES && <CmsFixtures property={property} />}
					{tab === CMS_PROPERTY_TABS.COMMERCIAL && <CmsCommercialOverview property={property} />}
					{tab === CMS_PROPERTY_TABS.LISTING && <CmsListingOverview property={property}  history={history}  />}
					{tab === CMS_PROPERTY_TABS.DETAILS && <PropertyDetails property={property} />}


				</DefaultBox>
			</div>
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
