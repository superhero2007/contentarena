import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Translate from "@components/Translator/Translate";
import { DefaultBox } from "../../common/components/Containers";
import { CMS_PROPERTY_TABS, ROUTE_PATHS, SERVER_ERROR_CODES } from "@constants";
import Loader from "../../common/components/Loader/Loader";
import RightsOverview from "./RightsOverview";
import CmsCommercialOverview from "./CmsCommercialOverview";
import CmsFixtures from "./CmsFixtures";
import CmsEditedProgram from "./CmsEditedProgram";
import CmsListingOverview from "./CmsListingOverview";
import PropertyDetails from "./PropertyDetails";
import PropertyDeal from "./PropertyDeal";
import {
	fetchRegions, fetchTerritories, fetchPropertyDetails, fetchCountries,
} from "../actions/propertyActions";

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
		/* [CMS_PROPERTY_TABS.EDITED_PROGRAM]: <Translate i18nKey="CMS_PROPERTY_TAB_EDITED_PROGRAM" />, */
		[CMS_PROPERTY_TABS.FIXTURES]: <Translate i18nKey="CMS_PROPERTY_TAB_FIXTURES" />,
		[CMS_PROPERTY_TABS.LISTING]: <Translate i18nKey="CMS_PROPERTY_TAB_LISTING" />,
		[CMS_PROPERTY_TABS.DETAILS]: <Translate i18nKey="CMS_PROPERTY_TAB_DETAILS" />,
	});

	componentDidMount() {
		const {
			propertyDetails: { property: { customId = "" } },
			match: { params: { propertyId, tab } = {} },
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
			match: {
				params: {
					propertyId,
					tab,
				} = {},
			},
		} = this.props;

		if (this.isLoadingRegions()) {
			return (
				<div className="default-container no-title property">
					<DefaultBox>
						<Loader loading />
					</DefaultBox>
				</div>
			);
		}

		if (error) {
			return (
				<div className="default-container no-title property">
					<DefaultBox>
						{
							error === SERVER_ERROR_CODES.PROPERTY_DOES_NOT_EXISTS
							&& <Translate i18nKey="CMS_PROPERTY_DOES_NOT_EXISTS" />
						}
					</DefaultBox>
				</div>
			);
		}

		if (tab === "deals") {
			return (
				<PropertyDeal history={history} />
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
								<Translate i18nKey="CMS_EMPTY_LISTING_CREATE_LISTING" />
							</a>
							<button
								onClick={() => {
									history.push(`${ROUTE_PATHS.PROPERTIES}/${propertyId}/deals`);
								}}
								className="ca-btn primary"
							>
								<Translate i18nKey="CMS_PROPERTY_ADD_DEAL" />
							</button>
							<i className="fa fa-pencil-square-o" onClick={() => { console.info("pensil icon not specified"); }} />
						</div>
					</h4>

					<div className="ca-tabs">
						{
							Object.values(CMS_PROPERTY_TABS).map(t => (
								<a
									key={t}
									className={`tab lg ${t === tab ? "active" : ""}`}
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
					{/* {tab === CMS_PROPERTY_TABS.EDITED_PROGRAM && <CmsEditedProgram history={history} />} */}
					{tab === CMS_PROPERTY_TABS.FIXTURES && <CmsFixtures />}
					{tab === CMS_PROPERTY_TABS.COMMERCIAL
						&& (
							<CmsCommercialOverview
								history={history}
								propertyId={propertyId}
							/>
						)}
					{tab === CMS_PROPERTY_TABS.LISTING && <CmsListingOverview history={history} />}
					{tab === CMS_PROPERTY_TABS.DETAILS && <PropertyDetails history={history} />}


				</DefaultBox>
			</div>
		);
	}
}

Property.contextTypes = {
	t: PropTypes.func.isRequired,
};

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
