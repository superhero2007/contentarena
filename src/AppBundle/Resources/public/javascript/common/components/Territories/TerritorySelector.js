import React from "react";
import { connect } from "react-redux";
import Translate from "@components/Translator/Translate";
import { BUNDLE_TERRITORIES_METHOD } from "@constants";
import RegionSelector from "@components/Territories/RegionSelector";
import { getCountryData, listHas, listRemove } from "../../../cms/helpers/PropertyDetailsHelper";

class TerritorySelector extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			countryData: getCountryData(props.countries),
			selectedRegions: [],
			selectedTerritories: [],
		};
	}

	onSelectRegion = (region) => {
		let { selectedRegions } = this.state;

		if (listHas(selectedRegions, region)) {
			selectedRegions = listRemove(selectedRegions, region);
		} else {
			selectedRegions.push(region);
		}

		this.setState({ selectedRegions }, () => {
			this.props.onSelect(this.getCountriesFromSelectedRegions());
		});
	};

	onSelectTerritory = (territory) => {
		let { selectedTerritories } = this.state;

		if (listHas(selectedTerritories, territory)) {
			selectedTerritories = listRemove(selectedTerritories, territory);
		} else {
			selectedTerritories.push(territory);
		}

		this.setState({ selectedTerritories }, () => {
			this.props.onSelect(this.getCountriesFromSelectedRegions());
		});
	};

	getCountriesFromSelectedRegions = () => {
		const { selectedRegions, selectedTerritories, countryData } = this.state;
		const countries = new Map();

		selectedRegions.forEach((region) => {
			countryData.regions.get(region.id).forEach((country) => {
				if (!countries.has(country.id)) countries.set(country.id, country);
			});
		});

		selectedTerritories.forEach((territory) => {
			countryData.territories.get(territory.id).forEach((country) => {
				if (!countries.has(country.id)) countries.set(country.id, country);
			});
		});

		return Array.from(countries.values());
	};

	render() {
		const {
			territories,
			regions,
			countries,
			availableCountries,
		} = this.props;

		const {
			territoriesMode,
			selectedRegions,
			selectedTerritories,
			countryData,
		} = this.state;

		const availableCountryData = getCountryData(availableCountries);

		return (
			<div className="territory-selector">

				<RegionSelector
					countryData={countryData.territories}
					availableCountryData={availableCountryData.territories}
					regions={territories}
					selectedRegions={selectedTerritories}
					onSelect={this.onSelectTerritory}
				/>

				<RegionSelector
					countryData={countryData.regions}
					availableCountryData={availableCountryData.regions}
					regions={regions}
					selectedRegions={selectedRegions}
					onSelect={this.onSelectRegion}
				/>

			</div>
		);
	}
}


const mapStateToProps = state => ({
	territories: state.property.territories,
	countries: state.property.countries,
	regions: state.property.regions,
});

export default connect(mapStateToProps, null)(TerritorySelector);
