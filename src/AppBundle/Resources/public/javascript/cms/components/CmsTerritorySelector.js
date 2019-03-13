import React from "react";
import { PropTypes } from "prop-types";
import cn from "classnames";
import CountrySelector from "../../main/components/CountrySelector";
import RadioSelector from "../../main/components/RadioSelector";
import { BUNDLE_TERRITORIES_METHOD } from "../../common/constants";
import { cmsWorldActive, cmsWorldDisabled } from "../../main/components/Icons";

class CmsTerritorySelector extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			countries: [],
			selection: props.value,
			territories: [],
			regions: [],
			territoryItems: {},
			regionItems: {},
			activeTerritory: null,
			activeRegions: [],
			selected: [],
			activeTerritories: [],
			worldwideSelected: false,
			territoriesMode: BUNDLE_TERRITORIES_METHOD.WORLDWIDE,
		};
	}

	componentDidMount() {
		const _this = this;
		ContentArena.Api.getCountries().done((countries) => {
			_this.setState({ countries });
			_this.parseTerritoryCountries(countries);
			setTimeout(() => { _this.handleChangeMode(BUNDLE_TERRITORIES_METHOD.WORLDWIDE) },1);
		});

		if (ContentArena.Data.Territories.length === 0) {
			ContentArena.Api.getTerritories().done((territories) => {
				ContentArena.Data.Territories = territories;
				_this.setState({ territories });
			});
		} else {
			_this.setState({ territories: ContentArena.Data.Territories });
		}

		if (ContentArena.Data.Regions.length === 0) {
			ContentArena.Api.getRegions().done((regions) => {
				ContentArena.Data.Regions = regions;
				_this.setState({ regions });
			});
		} else {
			_this.setState({ regions: ContentArena.Data.Regions });
		}
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ selection: nextProps.value });
	}

	countryHasRegions = (country, regions) => {
		regions = regions.filter(r => country.regions.indexOf(r) !== -1);
		return regions.length > 0;
	};

	parseTerritoryCountries = (countries) => {
		const territoryItems = {};
		const regionItems = {};

		countries.forEach((country) => {
			if (territoryItems[country.territoryId] === undefined) {
				territoryItems[country.territoryId] = [];
			}
			territoryItems[country.territoryId].push(country.id);

			country.regions.forEach((region) => {
				if (regionItems[region] === undefined) {
					regionItems[region] = [];
				}
				if (regionItems[region].indexOf(country.id) === -1) {
					regionItems[region].push(country.id);
				}
			});
		});

		this.setState({ territoryItems, regionItems });
	};

	getTerritoryCountries = (countries, territoryId) => {
		const {
			territoryItems,
		} = this.state;

		const territory = territoryItems[territoryId];

		if (!territory) return 0;

		return countries.filter(country => territory.indexOf(country.id) !== -1);
	};

	getRegionCountries = (countries, regionId) => {
		const {
			regionItems,
		} = this.state;

		const region = regionItems[regionId];

		if (!region) return 0;

		return countries.filter(country => region.indexOf(country.id) !== -1).length;
	};

	countryIndex = (country) => {
		const {
			selection,
		} = this.state;

		return selection.findIndex(c=>c.id===country.id);
	};

	selectRegion = (region) => {
		const { countries, regionItems } = this.state;
		const {
			filter = [],
			onChange,
			onSelectRegion,
			multiple,
		} = this.props;
		const { activeRegions } = this.state;
		const { activeTerritories } = this.state;
		let { worldwideSelected } = this.state;
		const countriesPerRegion = this.getRegionCountries(this.state.selection, region.id);
		let index;
		let selection;

		if (multiple) {
			index = activeRegions.indexOf(region.id);

			if (index === -1 && countriesPerRegion < regionItems[region.id].length) {
				activeRegions.push(region.id);
			} else if (index !== -1 && countriesPerRegion === regionItems[region.id].length) {
				activeRegions.splice(index, 1);
			}

			if (index === -1) {
				activeRegions.push(region.id);
			} else {
				activeRegions.splice(index, 1);
			}
			worldwideSelected = false;
			selection = countries.filter(c => (this.countryHasRegions(c, activeRegions) || activeTerritories.indexOf(c.territoryId) !== -1) && filter.indexOf(c.name) === -1);
		} else {
			selection = countries.filter(c => c.regions.indexOf(region.id) !== -1 && filter.indexOf(c.name) === -1);
		}
		selection = selection.map((item) => {
			item.value = item.name;
			item.label = item.name;
			return item;
		});

		this.setState({ selection, activeRegions, worldwideSelected });
		if (onChange) onChange(selection);
		if (onSelectRegion) onSelectRegion(region, selection);
	};

	selectTerritory(region) {
		const {
			filter = [],
			onChange,
			onSelectRegion,
			multiple,
		} = this.props;
		const { countries, territoryItems } = this.state;
		const { activeRegions } = this.state;
		const { activeTerritories } = this.state;
		const countriesPerTerritory = this.getTerritoryCountries(this.state.selection, region.id).length;
		let { worldwideSelected } = this.state;
		let index;
		let selection;

		if (multiple) {
			index = activeTerritories.indexOf(region.id);

			if (index === -1 && countriesPerTerritory < territoryItems[region.id].length) {
				activeTerritories.push(region.id);
			} else if (index !== -1 && countriesPerTerritory === territoryItems[region.id].length) {
				activeTerritories.splice(index, 1);
			}

			worldwideSelected = false;
			selection = countries.filter(c => (this.countryHasRegions(c, activeRegions) || activeTerritories.indexOf(c.territoryId) !== -1) && filter.indexOf(c.name) === -1);
		} else {
			selection = countries.filter(c => c.territoryId === region.id && filter.indexOf(c.name) === -1);
		}

		selection = selection.map((item) => {
			item.value = item.name;
			item.label = item.name;
			return item;
		});

		this.setState({ selection, activeTerritories, worldwideSelected });
		if (onChange) onChange(selection);
		if (onSelectRegion) onSelectRegion(region, selection);
	}

	handleChange = (country) => {

		const {
			onChange,
		} = this.props;

		let index = this.countryIndex(country);
		let selection = this.state.selection;

		if (index === -1){
			selection.push(country);
		} else {
			selection.splice(index, 1);
		}

		this.setState({ selection });
		if (onChange) onChange(selection);
	};

	handleSearch = (countries) => {
		this.handleChange(countries[0]);
	};

	handleChangeMode = (territoriesMode) => {
		const { countries } = this.state;
		const {
			onChange,
		} = this.props;
		let selection = territoriesMode === BUNDLE_TERRITORIES_METHOD.WORLDWIDE ? countries : [];
		this.setState({
			territoriesMode,
			selection
		});
		if (onChange) onChange(selection);
	};

	getCounterLabel = (name, counter, total) => {
		return `${name} (${counter}/${total})`;
	};

	render() {
		const {
			filter,
			disabled,
			exclusiveSoldTerritories,
			placeholder,
			isInvalid,
			selectedRights,
		} = this.props;

		const {
			territories,
			regions,
			countries,
			territoryItems,
			regionItems,
			selection,
			territoriesMode,
		} = this.state;

		return (
			<div className="country-selector region-filter">

				{
					selectedRights && selectedRights.length > 0 &&
					<div className="region-filter-title">
						{ selectedRights.map((right, i, l) => <span>{right.name}{i<l.length-1&&", "}</span> )}
					</div>
				}

				<RadioSelector
					value={territoriesMode}
					onChange={this.handleChangeMode}
					className="sales-packages-filters"
					items={[
						{
							value: BUNDLE_TERRITORIES_METHOD.WORLDWIDE,
							label: this.context.t("CMS_RADIO_WORLDWIDE"),
						},
						{
							value: BUNDLE_TERRITORIES_METHOD.SELECTED_TERRITORIES,
							label: this.context.t("CMS_RADIO_SELECTED_TERRITORIES"),
						},
						{
							value: BUNDLE_TERRITORIES_METHOD.WORLDWIDE_EXCLUDING,
							label: this.context.t("CMS_RADIO_WORLDWIDE_EXCLUDING"),
						},
					]}
				/>

				{!disabled && territoriesMode !== BUNDLE_TERRITORIES_METHOD.WORLDWIDE && (
					<div>
						<div className="region-filter-title">
							{ this.context.t("CMS_TERRITORIES_SELECTOR_TITLE")}
						</div>
						<div className="region-filter-subtitle">
							{ this.context.t("CMS_TERRITORIES_SELECTOR_CONTINENTS")}
						</div>
						<div className="regions">
							{territories.map((territory, i) => {
								let territoryCountries = this.getTerritoryCountries(selection, territory.id).length;
								let totalItems = territoryItems[territory.id] ? territoryItems[territory.id].length : 0;
								return (
									<button
										className={cn({
											region: true,
											"region-selected": territoryCountries > 0,
											"excluding" : territoriesMode === BUNDLE_TERRITORIES_METHOD.WORLDWIDE_EXCLUDING
										})}
										key={`territory-${i}`}
										onClick={() => {
											this.selectTerritory(territory);
										}}
									>
										{
											this.getCounterLabel(territory.name, territoryCountries, totalItems )
										}
									</button>
								)
							})}
						</div>
						<div className="region-filter-subtitle">
							{ this.context.t("CMS_TERRITORIES_SELECTOR_REGIONS")}
						</div>
						<div className="regions">
							{regions.map((region, i) => {
								let regionCountries =  this.getRegionCountries(selection, region.id);
								let totalItems = regionItems[region.id] ? regionItems[region.id].length : 0;
								return (
									<button
										className={cn({
											region: true,
											"region-selected": regionCountries > 0,
											"excluding" : territoriesMode === BUNDLE_TERRITORIES_METHOD.WORLDWIDE_EXCLUDING
										})}
										key={`region-${i}`}
										onClick={() => {
											this.selectRegion(region);
										}}
									>
										{
											this.getCounterLabel(region.name, regionCountries, totalItems )
										}
									</button>
								)
							})}
						</div>
						<div className="region-filter-subtitle">
							{ this.context.t("CMS_TERRITORIES_SELECTOR_SEARCH")}
						</div>
						<CountrySelector
							filter={selection}
							disabled={disabled}
							onChange={this.handleSearch}
							exclusiveSoldTerritories={selection}
							placeholder={placeholder}
							isInvalid={isInvalid}
						/>
					</div>
				)}

				{
					<div className="region-filter-title">
						{
							territoriesMode === BUNDLE_TERRITORIES_METHOD.WORLDWIDE_EXCLUDING &&
							this.context.t("CMS_TERRITORIES_SELECTOR_SELECTED_EXCLUDING")
						}
						{
							territoriesMode !== BUNDLE_TERRITORIES_METHOD.WORLDWIDE_EXCLUDING &&
							this.context.t("CMS_TERRITORIES_SELECTOR_SELECTED")
						}
						{ ` (${selection.length})` }
					</div>
				}

				{
					(territoriesMode === BUNDLE_TERRITORIES_METHOD.WORLDWIDE || selection.length === 0) &&
					<div>
						<div className="region-filter-selection-box">
							<img src={territoriesMode === BUNDLE_TERRITORIES_METHOD.WORLDWIDE ? cmsWorldActive : cmsWorldDisabled} />
							<span className="region-filter-selection-word">
								{
									territoriesMode === BUNDLE_TERRITORIES_METHOD.WORLDWIDE &&
									this.context.t("CMS_TERRITORIES_SELECTOR_ALL_SELECTED")
								}
								{
									selection.length === 0 &&
									this.context.t("CMS_TERRITORIES_SELECTOR_EMPTY")
								}
							</span>
						</div>
					</div>
				}

				{ territoriesMode !== BUNDLE_TERRITORIES_METHOD.WORLDWIDE && territories.map((territory, i) => {
					let selectedCountries = this.getTerritoryCountries(selection, territory.id);
					let territoryCountries = this.getTerritoryCountries(countries, territory.id);

					if (selectedCountries.length === 0) return undefined;

					return (
						<div key={`territory-box-${i}`}>
							<div className="region-filter-subtitle">
								{
									this.getCounterLabel(territory.name, selectedCountries.length, territoryCountries.length )
								}
							</div>
							<div className="regions">

								{
									territoryCountries && territoryCountries
										.map(country => (
											<button
												className={cn({
													region: true,
													"region-selected": this.countryIndex(country) !== -1,
													"excluding" : territoriesMode === BUNDLE_TERRITORIES_METHOD.WORLDWIDE_EXCLUDING
												})}
												onClick={() =>{
													this.handleChange(country);
												}}
											>
												{country.name}
											</button>
										))
								}
							</div>
						</div>
					)
				})}

			</div>
		);
	}
}

CmsTerritorySelector.contextTypes = {
	t: PropTypes.func.isRequired,
};

export default CmsTerritorySelector;
