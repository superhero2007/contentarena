import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import queryString from "query-string";
import Translate from "@components/Translator/Translate";
import Loader from "@components/Loader";
import { DefaultBox } from "../../common/components/Containers";
import { SERVER_ERROR_CODES } from "@constants";
import {
	fetchRegions, fetchTerritories, fetchPropertyDetails, fetchCountries,
} from "../actions/propertyActions";
import PropertyHeader from "../components/PropertyHeader";
import PropertyCreateListingStep1 from "./PropertyCreateListingStep1";
import { getListingDetails, updateListing } from "../../sell/actions/contentActions";
import { getListingStepRoute } from "../helpers/PropertyListingHelper";

class PropertyCreateListing extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	componentDidMount() {
		const {
			error,
			history,
			match,
		} = this.props;

		const {
			listingId,
			propertyId,
		} = match.params;

		if (listingId) {
			this.props.getListingDetails(listingId)
				.then(() => {

				});
		} else {
			this.initializeListing();
		}
	}

	initializeListing = () => {
		const {
			property,
		} = this.props;
		this.props.updateListing({
			property: {
				id: property.id,
				customId: property.customId,
			},
			sports: property.sports,
			tournaments: property.tournament,
			sportCategory: property.sportCategory,
		});
	};

	getQueryString = () => queryString.parse(location.search, { arrayFormat: "index" });

	render() {
		const {
			error,
			history,
			match,
			listing,
		} = this.props;

		const {
			listingId,
			propertyId,
		} = match.params;

		const params = this.getQueryString();
		let {
			step = 1,
		} = params;

		step = Number(step);

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

		return (
			<div className="default-container no-title property property-deal">
				<DefaultBox>
					<PropertyHeader listing={false} />

					<div className="ca-tabs">
						<a
							key="step-1-tab"
							className={`tab lg ${step === 1 ? "active" : ""}`}
							onClick={() => {
								const stepRoute = getListingStepRoute(propertyId, listingId, 1);
								history.push(stepRoute);
							}}
						>
							<Translate i18nKey="PROPERTY_CREATE_LISTING_TAB_COMMERCIAL" />
						</a>
						<a
							key="step-2-tab"
							className={`tab lg ${step === 2 ? "active" : ""}`}
							onClick={() => {
								const stepRoute = getListingStepRoute(propertyId, listingId, 2);
								history.push(stepRoute);
							}}
						>
							<Translate i18nKey="PROPERTY_CREATE_LISTING_TAB_EVENT" />
						</a>
						<a
							key="step-3-tab"
							className={`tab lg ${step === 3 ? "active" : ""}`}
							onClick={() => {
								const stepRoute = getListingStepRoute(propertyId, listingId, 3);
								history.push(stepRoute);
							}}
						>
							<Translate i18nKey="PROPERTY_CREATE_LISTING_TAB_EVENT" />
						</a>
						<a
							key="step-4-tab"
							className={`tab lg ${step === 4 ? "active" : ""}`}
							onClick={() => {
								const stepRoute = getListingStepRoute(propertyId, listingId, 4);
								history.push(stepRoute);
							}}
						>
							<Translate i18nKey="PROPERTY_CREATE_LISTING_TAB_EVENT" />
						</a>
					</div>

					{step === 1 && !listing.loading && <PropertyCreateListingStep1 history={history} />}
					{listing.loading && <Loader xSmall loading />}

				</DefaultBox>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	property: state.propertyDetails.property,
	error: state.propertyDetails.error,
	listing: state.content,
});

const mapDispatchToProps = dispatch => ({
	updateListing: data => dispatch(updateListing(data)),
	getListingDetails: listing => dispatch(getListingDetails(listing)),
	getCountries: () => dispatch(fetchCountries()),
	getTerritories: () => dispatch(fetchTerritories()),
	getRegions: () => dispatch(fetchRegions()),
	getPropertyDetails: id => dispatch(fetchPropertyDetails(id)),
});


export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(PropertyCreateListing);
