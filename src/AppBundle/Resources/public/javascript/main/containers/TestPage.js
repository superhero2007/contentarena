import React from "react";
import { connect } from "react-redux";
import { DefaultBox, SkinContainer } from "@components/Containers";
import Loader from "@components/Loader";
import TerritorySelector from "@components/Territories/TerritorySelector";
import store from "../store";
import { updateProfile } from "../actions/userActions";
import RegionCountrySelector from "../components/RegionCountrySelector";
import PopupCountrySelector from "../components/PopupCountrySelector";
import PropertyHeader from "../../cms/components/PropertyHeader";
import { CMS_PROPERTY_TABS, ROUTE_PATHS } from "../../common/constants";
import RightsOverview from "../../cms/containers/RightsOverview";
import CmsFixtures from "../../cms/containers/CmsFixtures";
import CmsCommercialOverview from "../../cms/containers/CmsCommercialOverview";
import CmsListingOverview from "../../cms/containers/CmsListingOverview";
import PropertyDetails from "../../cms/containers/PropertyDetails";
import {
	fetchCountries,
	fetchPropertyDetails,
	fetchRegions,
	fetchTerritories,
} from "../../cms/actions/propertyActions";


const testCountries = [{
	territories: [{ id: 5 }], id: 2, name: "Algeria", country_code: "DZA", territoryId: 5, regions: [{ id: 7 }],
}, {
	territories: [{ id: 5 }], id: 3, name: "Angola", country_code: "AGO", territoryId: 5, regions: [{ id: 3 }],
}];

class TestPage extends React.Component {
	componentDidMount() {
		this.props.getCountries();
		this.props.getTerritories();
		this.props.getRegions();
	}

	isLoadingRegions = () => {
		const {
			property: { isRegionsFetched, isTerritoriesFetched, isCountryFetched },
			propertyDetails: { isPropertyDetailFetched },
		} = this.props;

		return !isRegionsFetched || !isTerritoriesFetched || !isCountryFetched;
	};

	onSelectTerritories = (territories) => {
		console.log(territories);
	};

	render() {
		const loading = this.isLoadingRegions();

		return (
			<SkinContainer skin="v1">
				<DefaultBox>
					{loading && <Loader loading />}

					{!loading && (
						<TerritorySelector
							availableCountries={testCountries}
							onSelect={this.onSelectTerritories}
						/>
					)}

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
)(TestPage);
