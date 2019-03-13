import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import first from "lodash/first";
import Translate from "@components/Translator/Translate";
import {
	addRight, clearFilter, removeRight, updateCountries, updateExclusive,
	updateIncludedCountries, updateAllFilters,
} from "../actions/filterActions";
import CountrySelector from "../../main/components/CountrySelector";
import PopupCountrySelector from "../../main/components/PopupCountrySelector";
import { cancelIcon } from "../../main/components/Icons";
import localStorageEnums from "../../main/constants/localStorageEnums";
import LocalStorageHelper from "../../main/utiles/localStorageHelper";
import { DATE_FORMAT } from "@constants";

class RightsFilter extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			eventDateFrom: this.props.eventDateFrom,
			eventDateTo: this.props.eventDateTo,
		};

		this.worldwideCountries = props.totalCountries;
	}

	componentDidMount() {
		this.syncPropsWithLocalStorage();
	}

	syncPropsWithLocalStorage = () => {
		const { exclusive, includeAllCountries, countries } = this.props;

		const checkboxesFromStorage = LocalStorageHelper.getRightsCheckboxSelected();
		const countriesFromStorage = LocalStorageHelper.getCountriesSelected();
		const exclusiveFromStorage = LocalStorageHelper.getExclusive();

		const config = {
			rights: checkboxesFromStorage,
			exclusive: exclusiveFromStorage || exclusive,
			countries: countriesFromStorage || countries,
			includeAllCountries: (countriesFromStorage && countriesFromStorage.length === this.worldwideCountries) || includeAllCountries,
		};

		this.props.updateAllFilters(config);
	};

	selectTerritory = (selectedCountry) => {
		selectedCountry = first(selectedCountry) ? selectedCountry : [];

		if (selectedCountry.length === 1) {
			const selectedCountryObj = first(selectedCountry);
			localStorage.setItem(localStorageEnums.TERRITORIES, JSON.stringify([selectedCountryObj.value]));
		} else if (selectedCountry.length > 1) {
			const selectedCoutryFormatted = selectedCountry.map(country => country.value);
			localStorage.setItem(localStorageEnums.TERRITORIES, JSON.stringify(selectedCoutryFormatted));
		} else {
			localStorage.removeItem(localStorageEnums.TERRITORIES);
		}

		this.props.updateCountries(selectedCountry);

		this.onApplyFilter();
	};

	onChangeRight(right, event) {
		if (event.target.checked) {
			localStorage.setItem(localStorageEnums[right.shortLabel], right.id);
			this.props.addRight(right.id);
		} else {
			localStorage.removeItem(localStorageEnums[right.shortLabel]);
			this.props.removeRight(right.id);
		}

		this.onApplyFilter();
	}

	onChangeExclusive = (event) => {
		const { checked } = event.target;
		localStorage.setItem(localStorageEnums.EXCLUSIVE, checked);
		this.props.updateExclusive(checked);

		this.onApplyFilter();
	};

	onClearFilter = () => {
		localStorage.clear();
		this.props.clearFilter();
		this.onApplyFilter();
	};

	onApplyFilter = () => {
		setTimeout(() => {
			this.props.onFilter();
		}, 1);
	};

	render() {
		const {
			rights,
			rightsPackage,
			countries,
			exclusive,
			includeAllCountries,
		} = this.props;

		const countriesValue = first(countries) ? {
			label: first(countries),
			value: first(countries),
		} : "";

		const isWorldWideCountriesSelected = countries.length === this.worldwideCountries;
		const isMoreThanOneSelected = countries.length > 1 && countries.length !== this.worldwideCountries;
		const countriesInputValueObj = {
			isShown: isWorldWideCountriesSelected || isMoreThanOneSelected,
			value: isMoreThanOneSelected ? `${countries.length} territories`
				: isWorldWideCountriesSelected ? "Worldwide" : "",
			isDisabled: isMoreThanOneSelected && !isWorldWideCountriesSelected,
			isReadonly: isWorldWideCountriesSelected,
		};

		return (
			<div>
				<div className="box">
					<div className="title">
						<Translate i18nKey="MARKETPLACE_LABEL_FILTER_TERRITORIES" />
					</div>
					<div style={{
						display: "flex",
						alignItems: "center",
					}}
					>

						{!countriesInputValueObj.isShown
						&& (
							<CountrySelector
								multi={false}
								className="base-input-select"
								value={countriesValue}
								onChange={(c) => {
									this.selectTerritory([c]);
								}}
							/>
						)
						}

						{countriesInputValueObj.isShown
						&& (
							<React.Fragment>
								<input
									type="text"
									className="ca-form-control"
									value={countriesInputValueObj.value}
									disabled={countriesInputValueObj.isDisabled}
									readOnly={countriesInputValueObj.isReadonly}
								/>

								<img
									className="territories-icon"
									src={cancelIcon}
									onClick={() => {
										this.selectTerritory([]);
									}}
									alt=""
								/>

							</React.Fragment>
						)
						}

						<PopupCountrySelector
							ref="countrySelector"
							value={countries}
							includeAllCountries={includeAllCountries}
							onChangeRadio={(c) => {
								this.props.updateIncludedCountries(c);
							}}
							onSelect={this.selectTerritory}
						/>

					</div>
				</div>
				<div className="box right-checkboxes">
					<div id="rights-packages" className="filter-rights">
						<div className="title">
							<Translate i18nKey="MARKETPLACE_LABEL_FILTER_RIGHTS" />
						</div>
						{
							rightsPackage && rightsPackage.map((right) => {
								const isChecked = rights.includes(right.id);

								return (
									<div key={right.id} className="filter-right">
										<input
											className="ca-checkbox checkbox-item"
											type="checkbox"
											checked={isChecked}
											onChange={this.onChangeRight.bind(this, right)}
											id={right.id}
										/>
										<label htmlFor={right.id}>
											{right.name}
										</label>
									</div>
								);
							})
						}
						<div style={{
							background: "#999",
							height: 1,
							margin: "20px 0",
						}}
						/>

						<div className="filter-right">
							<input
								type="checkbox"
								checked={exclusive}
								className="ca-checkbox checkbox-item"
								onChange={this.onChangeExclusive}
							/>
							<Translate i18nKey="MARKETPLACE_LABEL_FILTER_EXCLUSIVE" />
						</div>
					</div>

				</div>
				<div className="box">
					<div style={{
						display: "flex",
						alignItems: "center",
						flexDirection: "column",
					}}
					>
						<button className="ca-btn primary clear-filter" onClick={this.onClearFilter}>
							<Translate i18nKey="MARKETPLACE_BUTTON_CLEAR" />
						</button>
					</div>
				</div>
			</div>
		);
	}
}

RightsFilter.contextTypes = {
	t: PropTypes.func.isRequired,
};


const mapStateToProps = (state) => {
	state.filter.totalCountries = state.common.totalCountries;
	return state.filter;
};

const mapDispatchToProps = dispatch => ({
	addRight: id => dispatch(addRight(id)),
	removeRight: id => dispatch(removeRight(id)),
	updateCountries: countries => dispatch(updateCountries(countries)),
	updateExclusive: exclusive => dispatch(updateExclusive(exclusive)),
	updateIncludedCountries: includeAllCountries => dispatch(updateIncludedCountries(includeAllCountries)),
	clearFilter: () => dispatch(clearFilter()),
	updateAllFilters: filters => dispatch(updateAllFilters(filters)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(RightsFilter);
