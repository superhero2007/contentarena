import React, { Fragment } from "react";
import PropTypes from "prop-types";
import first from "lodash/first";
import { cancelIcon } from "./Icons";
import PopupCountrySelector from "./PopupCountrySelector";
import CountrySelector from "./CountrySelector";

const TerritoryFilter = ({
	className, countries, includeAllCountries, selectTerritory, updateIncludedCountries, placeholder,
}) => {
	const countriesValue = first(countries) ? {
		label: first(countries),
		value: first(countries),
	} : "";

	const value = countries.length > 1 ? ({
		value: `${countries.length} territories`,
		label: `${countries.length} territories`,
	}) : countriesValue;
	return (
		<div className={className}>
			<CountrySelector
				multi={false}
				className="base-input-select"
				value={value}
				onChange={(c) => {
					selectTerritory([c]);
				}}
				placeholder={placeholder}
			/>

			<PopupCountrySelector
				value={countries}
				includeAllCountries={includeAllCountries}
				onChangeRadio={updateIncludedCountries}
				onSelect={selectTerritory}
			/>
		</div>
	);
};

TerritoryFilter.propTypes = {
	className: PropTypes.string,
	countries: PropTypes.array.isRequired,
	includeAllCountries: PropTypes.bool.isRequired,
	selectTerritory: PropTypes.func.isRequired,
	updateIncludedCountries: PropTypes.func.isRequired,
};

TerritoryFilter.defaultProps = {
	className: "",
};

export default TerritoryFilter;
