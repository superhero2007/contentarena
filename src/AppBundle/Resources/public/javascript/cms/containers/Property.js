import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Translate from "@components/Translator/Translate";
import { DefaultBox, SkinContainer } from "../../common/components/Containers";
import {
	CMS_PROPERTY_TABS, PROPERTY_MAIN_TABS, ROUTE_PATHS, SERVER_ERROR_CODES,
} from "@constants";
import Loader from "../../common/components/Loader/Loader";
import RightsOverview from "./RightsOverview";
import CommercialOverviewContainer from "../CommercialOverview/CommercialOverviewContainer";
import CmsListingOverview from "./CmsListingOverview";
import PropertyDetails from "./PropertyDetails";
import PropertyDeal from "./PropertyDeal";
import EditProperty from "./EditProperty";
import {
	fetchRegions, fetchTerritories, fetchPropertyDetails, fetchCountries,
} from "../actions/propertyActions";
import PropertyHeader from "../components/PropertyHeader";
import PropertyCreateListing from "./PropertyCreateListing";

class Property extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activeTab: props.tab,
		};
	}

	getTranslatedTabs = () => ({
		[CMS_PROPERTY_TABS.COMMERCIAL]: <Translate i18nKey="CMS_PROPERTY_TAB_COMMERCIAL" />,
		[CMS_PROPERTY_TABS.RIGHTS]: <Translate i18nKey="CMS_PROPERTY_TAB_RIGHTS" />,
		[CMS_PROPERTY_TABS.FIXTURES]: <Translate i18nKey="CMS_PROPERTY_TAB_FIXTURES" />,
		[CMS_PROPERTY_TABS.LISTING]: <Translate i18nKey="CMS_PROPERTY_TAB_LISTING" />,
		[CMS_PROPERTY_TABS.DETAILS]: <Translate i18nKey="CMS_PROPERTY_TAB_DETAILS" />,
	});

	componentDidMount() {
		const {
			propertyDetails: { property: { customId = "" } },
			match: { params: { propertyId, tab } = {} },
			property: { countries },
		} = this.props;
		if (!propertyId) return;

		if (!customId || customId !== propertyId) {
			this.props.getPropertyDetails(propertyId);
		}
		this.props.getCountries();
		this.props.getTerritories();
		this.props.getRegions();
		this.setState({ propertyId, activeTab: tab });
	}

	isLoadingRegions = () => {
		const {
			property: { isRegionsFetched, isTerritoriesFetched, isCountryFetched },
			propertyDetails: { isPropertyDetailFetched },
		} = this.props;

		return !isRegionsFetched || !isTerritoriesFetched || !isPropertyDetailFetched || !isCountryFetched;
	};

	render() {
		const {
			propertyDetails: {
				property,
				error,
			},
			history,
			match,
			skin,
		} = this.props;

		const {
			propertyId,
			tab,
			listingId,
		} = match.params;

		if (this.isLoadingRegions()) {
			return (
				<SkinContainer skin={skin}>
					<DefaultBox>
						<Loader loading />
					</DefaultBox>
				</SkinContainer>
			);
		}

		if (error) {
			return (
				<SkinContainer skin={skin}>
					<DefaultBox>
						{
							error === SERVER_ERROR_CODES.PROPERTY_DOES_NOT_EXISTS
							&& <Translate i18nKey="CMS_PROPERTY_DOES_NOT_EXISTS" />
						}
					</DefaultBox>
				</SkinContainer>
			);
		}

		if (tab === PROPERTY_MAIN_TABS.ADD_DEALS) {
			return (
				<PropertyDeal
					history={history}
					skin={skin}
				/>
			);
		}

		if (tab === PROPERTY_MAIN_TABS.EDIT) {
			return (
				<EditProperty
					history={history}
					skin={skin}
				/>
			);
		}

		if (tab === PROPERTY_MAIN_TABS.CREATE_LISTING) {
			return (
				<PropertyCreateListing
					history={history}
					match={match}
					skin={skin}
				/>
			);
		}

		const translatedTabs = this.getTranslatedTabs();

		return (
			<SkinContainer skin={skin}>
				<DefaultBox>
					<PropertyHeader history={history} />

					<div className="default-tab">
						{
							Object.values(CMS_PROPERTY_TABS).map(t => (
								<a
									key={t}
									className={`tab ${t === tab ? "active" : ""}`}
									onClick={() => {
										history.push(`${ROUTE_PATHS.PROPERTIES}/${propertyId}/${t}`);
									}}
								>
									{translatedTabs[t]}
								</a>
							))
						}
					</div>

					{tab === CMS_PROPERTY_TABS.RIGHTS && <RightsOverview />}
					{tab === CMS_PROPERTY_TABS.COMMERCIAL && (
						<CommercialOverviewContainer
							history={history}
							propertyId={propertyId}
						/>
					)}
					{tab === CMS_PROPERTY_TABS.LISTING && <CmsListingOverview history={history} />}
					{tab === CMS_PROPERTY_TABS.DETAILS && <PropertyDetails history={history} />}

				</DefaultBox>
			</SkinContainer>
		);
	}
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
	getCountries: () => dispatch(fetchCountries()),
	getTerritories: () => dispatch(fetchTerritories()),
	getRegions: () => dispatch(fetchRegions()),
	getPropertyDetails: id => dispatch(fetchPropertyDetails(id)),
});


export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Property);
