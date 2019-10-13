import React from "react";
import { connect } from "react-redux";
import queryString from "query-string";
import Translate from "@components/Translator/Translate";
import Loader from "@components/Loader";
import { DefaultBox, SkinContainer } from "@components/Containers";
import { SERVER_ERROR_CODES } from "@constants";
import {
	fetchRegions, fetchTerritories, fetchPropertyDetails, fetchCountries,
} from "../actions/propertyActions";
import PropertyCreateListingStep1 from "./PropertyCreateListingStep1";
import CmsProgress from "../components/CmsProgress";
import { getCreateListingDetails, getListingDetails, updateListing } from "../actions/propertyListingActions";
import PropertyCreateListingStep2 from "./PropertyCreateListingStep2";
import PropertyCreateListingStep4 from "./PropertyCreateListingStep4";
import PropertyCreateListingStep3 from "./PropertyCreateListingStep3";
import PropertyCreateListingStep5 from "./PropertyCreateListingStep5";
import PropertyCreateListingStep6 from "./PropertyCreateListingStep6";

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
			image: property.image,
		});
	};

	getQueryString = () => queryString.parse(location.search, { arrayFormat: "index" });

	render() {
		const {
			error,
			history,
			match,
			skin,
			listing,
		} = this.props;

		const {
			listingId,
			propertyId,
		} = match.params;

		const progressList = [
			"Commercial Details",
			"Event Details",
			"Right Details",
			"Production Details",
			"Additional Info",
			"Review & Sign",
		];

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
			<SkinContainer skin={skin}>
				<CmsProgress
					title={<Translate i18nKey="CMS_CREATE_LISTING_TITLE" />}
					currentStep={step}
					maxStep={listing.maxStep}
					progressList={progressList}
				/>

				<DefaultBox>
					{step === 1 && !listing.loading && <PropertyCreateListingStep1 history={history} />}
					{step === 2 && !listing.loading && <PropertyCreateListingStep2 history={history} />}
					{step === 3 && !listing.loading && <PropertyCreateListingStep3 history={history} />}
					{step === 4 && !listing.loading && <PropertyCreateListingStep4 history={history} />}
					{step === 5 && !listing.loading && <PropertyCreateListingStep5 history={history} />}
					{step === 6 && !listing.loading && <PropertyCreateListingStep6 history={history} />}
					{listing.loading && <Loader xSmall loading />}
				</DefaultBox>
			</SkinContainer>
		);
	}
}

const mapStateToProps = state => ({
	property: state.propertyDetails.property,
	error: state.propertyDetails.error,
	listing: state.propertyListing,
});

const mapDispatchToProps = dispatch => ({
	updateListing: data => dispatch(updateListing(data)),
	getListingDetails: listing => dispatch(getCreateListingDetails(listing)),
	getCountries: () => dispatch(fetchCountries()),
	getTerritories: () => dispatch(fetchTerritories()),
	getRegions: () => dispatch(fetchRegions()),
	getPropertyDetails: id => dispatch(fetchPropertyDetails(id)),
});


export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(PropertyCreateListing);
