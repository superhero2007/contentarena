import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactTooltip from "react-tooltip";
import { connect } from "react-redux";
import cn from "classnames";
import find from "lodash/find";

import Translate from "@components/Translator/Translate";
import { BUNDLE_TERRITORIES_METHOD } from "@constants";

import { LanguageSelector } from "../../main/components/LanguageSelector";
import RadioSelector from "../../main/components/RadioSelector";
import CountrySelector from "../../main/components/CountrySelector";
import { cmsWorldActive, cmsWorldDisabled } from "../../main/components/Icons";

class CmsEditedProgramDetail extends Component {
	constructor(props) {
		super(props);
		const startYear = 2030;
		const years = [];

		for (let i = 0; i < 81; i++) {
			years.push(startYear - i);
		}
		this.state = {
			years,
			programName: props.program.name || "",
			programEpisode: props.program.episode || "",
			programYear: props.program.year || "",
			programType: props.program.type || "",
			programDuration: props.program.duration || "",
			programDescription: props.program.description || "",
			programLanguages: props.program.languages || [],
			programSubtitles: props.program.subtitles || [],
			programScripts: props.program.scripts || [],
			editProgramDescriptionOptional: props.program.editProgramDescriptionOptional || true,
			selection: [],
			territoriesMode: props.program.territoriesMode || BUNDLE_TERRITORIES_METHOD.WORLDWIDE,
			territoryItems: {},
			regionItems: {},
			activeRegions: [],
			activeTerritories: [],
			viewAllTerritories: false,
		};
	}

	updateContentValue = (key, value) => {
		this.setState({ [key]: value });
	};

	save = () => {
		const {
			programName,
			programEpisode,
			programYear,
			programType,
			programDuration,
			programDescription,
			programLanguages,
			programSubtitles,
			programScripts,
			editProgramDescriptionOptional,
		} = this.state;
		const { onSave } = this.props;
		onSave({
			name: programName,
			episode: programEpisode,
			year: programYear,
			type: programType,
			duration: programDuration,
			description: programDescription,
			languages: programLanguages,
			subtitles: programSubtitles,
			scripts: programScripts,
			editProgramDescriptionOptional,
		});
	};

	getTooltipMessages = () => {
		const {
			programName,
			programEpisode,
			programType,
			programDuration,
			programDescription,
		} = this.state;
		let message = "";
		if (!programName) {
			message += "<br/>-  Enter program name.";
		}
		if (!programDescription) {
			message += "<br/>-  Enter program description.";
		}
		if (!programType) {
			message += "<br/>-  Enter program type.";
		}
		if (!programEpisode) {
			message += "<br/>-  Enter program type.";
		}
		if (!programDuration) {
			message += "<br/>-  Enter program duration.";
		}
		if (message.length) {
			message = `Please complete missing information\n${message}`;
		}
		return message;
	};

	handleChangeMode = (territoriesMode) => {
		const { countries } = this.props;
		const selection = territoriesMode === BUNDLE_TERRITORIES_METHOD.WORLDWIDE ? countries : [];
		this.setState({
			territoriesMode,
			selection,
		});
	};

	getTerritoryCountries = (countries, territoryId) => {
		const {
			territoryItems,
		} = this.state;

		const territory = territoryItems[territoryId];

		if (!territory) return [];

		return countries.filter(country => territory.indexOf(country.id) !== -1);
	};

	countryHasRegions = (country, regions) => {
		regions = regions.filter(r => country.regions.indexOf(r) !== -1);
		return regions.length > 0;
	};

	selectTerritory(region) {
		const { countries } = this.props;
		const {
			territoryItems,
			activeRegions,
			activeTerritories,
		} = this.state;
		const countriesPerTerritory = this.getTerritoryCountries(this.state.selection, region.id).length;
		const index = activeTerritories.indexOf(region.id);

		if (index === -1 && countriesPerTerritory < territoryItems[region.id].length) {
			activeTerritories.push(region.id);
		} else if (index !== -1 && countriesPerTerritory === territoryItems[region.id].length) {
			activeTerritories.splice(index, 1);
		}

		let selection = countries.filter(c => this.countryHasRegions(c, activeRegions) || activeTerritories.indexOf(c.territoryId) !== -1);

		selection = selection.map((item) => {
			item.value = item.name;
			item.label = item.name;
			return item;
		});

		this.setState({ selection, activeTerritories });
	}

	getRegionCountries = (countries, regionId) => {
		const {
			regionItems,
		} = this.state;

		const region = regionItems[regionId];

		if (!region) return [];

		return countries.filter(country => region.indexOf(country.id) !== -1).length;
	};

	selectRegion = (region) => {
		const {
			activeRegions,
			activeTerritories,
			regionItems,
		} = this.state;
		const { countries } = this.props;
		const countriesPerRegion = this.getRegionCountries(this.state.selection, region.id);
		const index = activeRegions.indexOf(region.id);

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
		let selection = countries.filter(c => (this.countryHasRegions(c, activeRegions) || activeTerritories.indexOf(c.territoryId) !== -1));

		selection = selection.map((item) => {
			item.value = item.name;
			item.label = item.name;
			return item;
		});

		this.setState({ selection, activeRegions });
	};

	getCounterLabel = (name, counter, total) => `${name} (${counter}/${total})`;

	handleChange = (country) => {
		const index = this.countryIndex(country);
		const selection = this.state.selection;

		if (index === -1) {
			selection.push(country);
		} else {
			selection.splice(index, 1);
		}

		this.setState({ selection });
	};

	handleSearch = (countries) => {
		this.handleChange(countries[0]);
	};

	handleViewTerritories = () => {
		this.setState((prevState => ({
			viewAllTerritories: !prevState.viewAllTerritories,
		})));
	};

	getTerritoriesByViewType = (territories) => {
		const { viewAllTerritories } = this.state;
		if (territories.length === 0) return null;

		return viewAllTerritories
			? territories
			: territories.filter(country => this.countryIndex(country) !== -1);
	};

	isSelectedAllTerritories = () => {
		const { selection } = this.state;
		const { territories } = this.props;
		if (!selection.length) return true;

		const getTerretoriesIds = selection.reduce((accum, item) => [...accum, item.territoryId], []);

		const totalTerritories = [...new Set(getTerretoriesIds)].reduce((accum, item) => {
			const territoryById = find(territories, { id: item });
			return accum + territoryById.total;
		}, 0);

		return totalTerritories === selection.length;
	};

	render() {
		const {
			programName,
			programEpisode,
			programYear,
			programType,
			programDuration,
			programDescription,
			programSubtitles,
			programScripts,
			programLanguages,
			editProgramDescriptionOptional,
			territoriesMode,
			selection,
			territoryItems,
			regionItems,
		} = this.state;

		const { territories, regions, countries } = this.props;
		return (
			<section>
				<div className="property-edited-program-tab__container">
					<div className="row">
						<div className="w-50">
							<div className="modal-input">
								<label>
									<Translate i18nKey="CMS_PROPERTY_DETAILS_TAB_EDIT_PROGRAM_NAME" />
								</label>
								<input
									type="text"
									value={programName}
									onChange={(e) => {
										this.updateContentValue("programName", e.target.value);
									}}
								/>
							</div>

							<div className="row">
								<div className="modal-input w-66">
									<label>
										<Translate i18nKey="CMS_PROPERTY_DETAILS_TAB_EDIT_PROGRAM_TYPE" />
									</label>
									<select
										value={programType}
										onChange={(e) => {
											this.updateContentValue("programType", e.target.value);
										}}
									>
										<option value="">Select</option>
										<option value="HIGHLIGHT_SHOW">Highlight show</option>
										<option value="DOCUMENTARY">Documentary</option>
										<option value="PREVIEW">Preview</option>
										<option value="TALK_SHOW">Talk show</option>
										<option value="OTHER">Other</option>
									</select>
								</div>

								<div className="modal-input w-33">
									<label>
										<Translate i18nKey="CMS_PROPERTY_DETAILS_TAB_EDIT_PROGRAM_YEAR" />
									</label>
									<select
										value={programYear}
										onChange={(e) => {
											this.updateContentValue("programYear", e.target.value);
										}}
									>
										<option value="Year">Year</option>
										{this.state.years.map((year, i) => (<option key={i} value={year}>{year}</option>))}
									</select>
								</div>
							</div>
						</div>

						<div className="w-50">
							<div className="modal-input">
								<label>
									<Translate i18nKey="CMS_PROPERTY_DETAILS_TAB_EDIT_PROGRAM_DESCRIPTION" />
								</label>
								<textarea
									value={programDescription}
									onChange={(e) => {
										this.updateContentValue("programDescription", e.target.value);
									}}
									placeholder={this.context.t("CMS_PROPERTY_DETAILS_TAB_EDIT_PROGRAM_DESCRIPTION_PLACEHOLDER")}
								/>
							</div>
						</div>
					</div>

					<div className="row">
						<div className="row w-50">
							<div className="w-33">
								<div className="modal-input">
									<label>
										<Translate i18nKey="CMS_PROPERTY_DETAILS_TAB_EDIT_PROGRAM_EPISODES" />
									</label>
									<input
										type="number"
										value={programEpisode}
										onChange={(e) => {
											this.updateContentValue("programEpisode", Number(e.target.value));
										}}
									/>
								</div>
							</div>
							<div className="w-33">
								<div className="modal-input">
									<label>
										<Translate i18nKey="CMS_PROPERTY_DETAILS_TAB_EDIT_PROGRAM_DURATION" />
									</label>
									<input
										type="number"
										value={programDuration}
										onChange={(e) => {
											this.updateContentValue("programDuration", Number(e.target.value));
										}}
									/>
								</div>
							</div>
							<div className="w-33">
								<div className="modal-input">
									<label htmlFor="similar-length">
										<Translate i18nKey="CMS_PROPERTY_DETAILS_TAB_EDIT_DESC" />
									</label>

									<div className="radio-box">
										<input
											type="radio"
											checked={editProgramDescriptionOptional}
											onChange={() => {
												this.updateContentValue("editProgramDescriptionOptional", true);
											}}
											id="edit-program-optional"
											className="ca-radio package-selector"
										/>
										<label htmlFor="edit-program-optional"><Translate i18nKey="Yes" /></label>
										<input
											type="radio"
											checked={!editProgramDescriptionOptional}
											onChange={() => {
												this.updateContentValue("editProgramDescriptionOptional", false);
											}}
											id="edit-program"
											className="ca-radio package-selector"
										/>
										<label htmlFor="edit-program"><Translate i18nKey="No" /></label>
									</div>

								</div>
							</div>
						</div>
					</div>

					<div className="row">
						<div className="modal-input w-33">
							<label>
								<Translate i18nKey="CMS_PROPERTY_DETAILS_TAB_EDIT_LANGUAGE" />
							</label>
							<div className="select">
								<LanguageSelector
									value={programLanguages}
									onChange={(value) => {
										this.updateContentValue("programLanguages", value);
									}}
								/>
							</div>
						</div>

						<div className="modal-input w-33">
							<label>
								<Translate i18nKey="CMS_PROPERTY_DETAILS_TAB_EDIT_SUBTITLES" />
							</label>
							<div className="select">
								<LanguageSelector
									value={programSubtitles}
									onChange={(value) => {
										this.updateContentValue("programSubtitles", value);
									}}
								/>
							</div>
						</div>

						<div className="modal-input w-33">
							<label>
								<Translate i18nKey="CMS_PROPERTY_DETAILS_TAB_EDIT_SCRIPT" />
							</label>
							<div className="select">
								<LanguageSelector
									value={programScripts}
									onChange={(value) => {
										this.updateContentValue("programScripts", value);
									}}
								/>
							</div>
						</div>
					</div>

					<div className="country-selector region-filter">
						<RadioSelector
							value={territoriesMode}
							onChange={this.handleChangeMode}
							className="sales-packages-filters"
							items={[
								{
									value: BUNDLE_TERRITORIES_METHOD.WORLDWIDE,
									label: <Translate i18nKey="CMS_RADIO_WORLDWIDE" />,
								},
								{
									value: BUNDLE_TERRITORIES_METHOD.SELECTED_TERRITORIES,
									label: <Translate i18nKey="CMS_RADIO_SELECTED_TERRITORIES" />,
								},
								{
									value: BUNDLE_TERRITORIES_METHOD.WORLDWIDE_EXCLUDING,
									label: <Translate i18nKey="CMS_RADIO_WORLDWIDE_EXCLUDING" />,
								},
							]}
						/>

						{territoriesMode !== BUNDLE_TERRITORIES_METHOD.WORLDWIDE && (
							<div>
								<div className="region-filter-title">
									{ <Translate i18nKey="CMS_TERRITORIES_SELECTOR_TITLE" />}
								</div>
								<div className="region-filter-subtitle">
									{ <Translate i18nKey="CMS_TERRITORIES_SELECTOR_CONTINENTS" />}
								</div>
								<div className="regions">
									{territories.map((territory, i) => {
										const territoryCountries = this.getTerritoryCountries(selection, territory.id).length;
										const totalItems = territoryItems[territory.id] ? territoryItems[territory.id].length : 0;
										return (
											<button
												className={cn({
													region: true,
													"region-selected": territoryCountries > 0,
													excluding: territoriesMode === BUNDLE_TERRITORIES_METHOD.WORLDWIDE_EXCLUDING,
												})}
												key={`territory-${i}`}
												onClick={() => {
													this.selectTerritory(territory);
												}}
											>
												{this.getCounterLabel(territory.name, territoryCountries, totalItems)}
											</button>
										);
									})}
								</div>
								<div className="region-filter-subtitle">
									{ <Translate i18nKey="CMS_TERRITORIES_SELECTOR_REGIONS" />}
								</div>
								<div className="regions">
									{regions.map((region, i) => {
										const regionCountries = this.getRegionCountries(selection, region.id);
										const totalItems = regionItems[region.id] ? regionItems[region.id].length : 0;
										return (
											<button
												className={cn({
													region: true,
													"region-selected": regionCountries > 0,
													excluding: territoriesMode === BUNDLE_TERRITORIES_METHOD.WORLDWIDE_EXCLUDING,
												})}
												key={`region-${i}`}
												onClick={() => {
													this.selectRegion(region);
												}}
											>
												{
													this.getCounterLabel(region.name, regionCountries, totalItems)
												}
											</button>
										);
									})}
								</div>
								<div className="region-filter-subtitle">
									{ <Translate i18nKey="CMS_TERRITORIES_SELECTOR_SEARCH" />}
								</div>
								<CountrySelector
									filter={selection}
									onChange={this.handleSearch}
									exclusiveSoldTerritories={selection}
								/>
							</div>
						)}

						{
							<div className="region-filter-title">
								{territoriesMode === BUNDLE_TERRITORIES_METHOD.WORLDWIDE_EXCLUDING
								&& <Translate i18nKey="CMS_TERRITORIES_SELECTOR_SELECTED_EXCLUDING" />
								}
								{territoriesMode !== BUNDLE_TERRITORIES_METHOD.WORLDWIDE_EXCLUDING
								&& <Translate i18nKey="CMS_TERRITORIES_SELECTOR_SELECTED" />
								}
								{ ` (${selection.length})` }
								{territoriesMode !== BUNDLE_TERRITORIES_METHOD.WORLDWIDE
								&& !this.isSelectedAllTerritories() && (
									<button className="link-button" onClick={this.handleViewTerritories}>
										{viewAllTerritories
											? <Translate i18nKey="CMS_TERRITORIES_VIEW_SELECTED" />
											: <Translate i18nKey="CMS_TERRITORIES_VIEW_ALL" />
										}
									</button>
								)}
							</div>
						}

						{
							(territoriesMode === BUNDLE_TERRITORIES_METHOD.WORLDWIDE || selection.length === 0)
							&& (
								<div>
									<div className="region-filter-selection-box">
										<img src={territoriesMode === BUNDLE_TERRITORIES_METHOD.WORLDWIDE ? cmsWorldActive : cmsWorldDisabled} alt="" />
										<span className="region-filter-selection-word">
											{
												territoriesMode === BUNDLE_TERRITORIES_METHOD.WORLDWIDE
												&& <Translate i18nKey="CMS_TERRITORIES_SELECTOR_ALL_SELECTED" />
											}
											{
												selection.length === 0
												&& <Translate i18nKey="CMS_TERRITORIES_SELECTOR_EMPTY" />
											}
										</span>
									</div>
								</div>
							)
						}

						{ territoriesMode !== BUNDLE_TERRITORIES_METHOD.WORLDWIDE && territories.map((territory, i) => {
							const selectedCountries = this.getTerritoryCountries(selection, territory.id);
							const territoryCountries = this.getTerritoryCountries(countries, territory.id);

							if (selectedCountries.length === 0) return undefined;

							return (
								<div key={`territory-box-${i}`}>
									<div className="region-filter-subtitle">
										{
											this.getCounterLabel(territory.name, selectedCountries.length, territoryCountries.length)
										}
									</div>
									<div className="regions">

										{this.getTerritoriesByViewType(territoryCountries).map(country => (
											<button
												className={cn({
													region: true,
													"region-selected": this.countryIndex(country) !== -1,
													excluding: territoriesMode === BUNDLE_TERRITORIES_METHOD.WORLDWIDE_EXCLUDING,
												})}
												onClick={() => {
													this.handleChange(country);
												}}
											>
												{country.name}
											</button>
										))
										}
									</div>
								</div>
							);
						})}
					</div>
				</div>
				<div className="buttons" data-tip={this.getTooltipMessages()}>
					<button
						type="button"
						className={`yellow-button centered-btn ${this.getTooltipMessages() ? "disabled" : ""}`}
						disabled={this.getTooltipMessages()}
						onClick={this.save}
					>
						<Translate i18nKey="Save" />
					</button>
				</div>
				<ReactTooltip html />
			</section>
		);
	}
}

CmsEditedProgramDetail.contextTypes = {
	t: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	territories: state.property.territories,
	countries: state.property.countries,
	regions: state.property.regions,
});

export default connect(mapStateToProps, null)(CmsEditedProgramDetail);
