import React, { Fragment } from "react";
import PropTypes from "prop-types";
import first from "lodash/first";
import { cancelIcon } from "./Icons";
import PopupCountrySelector from "./PopupCountrySelector";
import CountrySelector from "./CountrySelector";

const TerritoryFilter = ({
	className, countries, includeAllCountries, selectTerritory, updateIncludedCountries,
}) => {
	const countriesValue = first(countries) ? {
		label: first(countries),
		value: first(countries),
	} : "";

	const isMoreThanOneSelected = countries.length > 1;
	const countriesInputValueObj = {
		isShown: isMoreThanOneSelected,
		value: isMoreThanOneSelected ? `${countries.length} territories` : "",
		isDisabled: isMoreThanOneSelected,
	};
	return (
		<div className={className}>
			{countriesInputValueObj.isShown ? (
				<Fragment>
					<input
						type="text"
						className="ca-form-control"
						value={countriesInputValueObj.value}
						disabled={countriesInputValueObj.isDisabled}
					/>

					<img
						className="territories-icon"
						src={cancelIcon}
						onClick={() => {
							selectTerritory([]);
						}}
						alt=""
					/>

				</Fragment>
			) : (
				<CountrySelector
					multi={false}
					className="base-input-select"
					value={countriesValue}
					onChange={(c) => {
						selectTerritory([c]);
					}}
				/>
			)}

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
