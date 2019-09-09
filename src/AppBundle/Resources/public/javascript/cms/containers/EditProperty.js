import React from "react";
import { connect } from "react-redux";
import cn from "classnames";
import moment from "moment/moment";
import uniqBy from "lodash/uniqBy";
import Loader from "@components/Loader";
import ReactTooltip from "react-tooltip";
import { getSeasonMonthString, getSeasonStartYear, SeasonYear } from "@utils/listing";
import { DefaultBox, HorizontalButtonBox, SkinContainer } from "@components/Containers";
import Translate from "@components/Translator/Translate";
import { getTerritoriesFromRights } from "@utils/property";
import CmsStepSelector from "../components/CmsStepSelector";
import CmsTerritorySelector from "../components/CmsTerritorySelector";
import RadioSelector from "../../main/components/RadioSelector";
import {
	CMS_PROPERTY_TABS, EDIT_TYPE, ROUTE_PATHS, BUNDLE_TERRITORIES_METHOD,
} from "@constants";
import { updateProperty } from "../actions/propertyActions";
import CmsCustomSeason from "../components/CmsCustomSeason";
import { sortSeasons } from "../helpers/PropertyDetailsHelper";
import PropertyHeader from "../components/PropertyHeader";


class EditProperty extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentStep: 1,
			editSeason: "",
			loadingSeasons: false,
			availableSeasons: [],
			selectedSeasons: [],
			selectedSeason: null,
			customSeasonsAdded: false,
			showCustomSeason: false,
			showAll: false,
			seasons: [],
			selectedRight: null,
			territories: [],
			territoriesMode: BUNDLE_TERRITORIES_METHOD.SELECTED_TERRITORIES,
		};
	}

	componentDidMount() {
		this.loadSeasons();
		const { property: { seasons } } = this.props;
		if (!seasons.length) {
			this.handleSeasonType(EDIT_TYPE.create);
		}
	}

	seasonsAreValid = () => {
		const { seasons } = this.state;
		return !!seasons.length;
	};

	rightAreValid = () => {
		const { selectedRight } = this.state;
		return !!selectedRight && selectedRight.exclusive !== null;
	};

	territoriesAreValid = () => {
		const { territories } = this.state;
		return !!territories.length;
	};

	onSelectAllSeasons = () => {
		const { property: { seasons } } = this.props;
		this.setState({
			seasons,
			currentStep: 2,
			selectedRight: null,
		});
	};

	onUnSelectAllSeasons = () => {
		this.setState({
			seasons: [],
			currentStep: 2,
			selectedRight: null,
		});
	};

	onChangeSeason = (value) => {
		let { seasons } = this.state;
		const selectedSeason = seasons.find(season => season.id === value.id);
		if (selectedSeason) {
			seasons = seasons.filter(season => season.id !== value.id);
		} else {
			seasons.push(value);
		}
		this.setState({
			seasons,
			currentStep: 2,
			selectedRight: null,
		});
	};

	onSelectRight = (value) => {
		const { selectedRight } = this.state;
		if (!selectedRight || selectedRight && selectedRight.id !== value.id) {
			const newValue = Object.assign({}, value, { exclusive: null });
			this.setState({
				currentStep: 3,
				selectedRight: newValue,
			});
		}
	};

	onExclusive = (right, exclusive) => {
		const newValue = Object.assign({}, right, { exclusive });
		this.setState({
			selectedRight: newValue,
			currentStep: 3,
		});
	};

	onSelectTerritories = (territories, territoriesMode) => {
		this.setState({
			territories,
			territoriesMode,
		});
	};

	cancel = () => {
		const { history, property: { customId } } = this.props;
		history.push(`${ROUTE_PATHS.PROPERTIES}/${customId}/${CMS_PROPERTY_TABS.RIGHTS}`);
	};

	onNext = (step) => {
		this.setState({
			currentStep: step,
		});
	};

	handleSeasonType = (editSeason) => {
		this.setState({
			editSeason,
		});
		this.onNext(2);
	};

	loadSeasons() {
		const { property: { tournament } } = this.props;
		if (!tournament.length) {
			return;
		}
		const tournamentId = tournament[0].externalId;

		this.setState({
			loadingSeasons: true,
		});
		ContentArena.Api.getSeasons(tournamentId)
			.done((availableSeasons) => {
				availableSeasons = availableSeasons.filter(season => season.startDate && season.endDate);
				ContentArena.Data.Seasons = availableSeasons;

				this.setState({
					availableSeasons,
					selectedSeasons: [],
				});
			})
			.always(() => {
				this.setState({
					loadingSeasons: false,
				});
			});
	}

	addCustomSeason = (season) => {
		const { availableSeasons } = this.state;
		const index = availableSeasons.findIndex(s => s.externalId === season.externalId);

		if (index !== -1) {
			availableSeasons[index] = season;
		} else {
			availableSeasons.push(season);
		}

		availableSeasons.sort(sortSeasons);

		this.setState({ availableSeasons, selectedSeason: null, customSeasonsAdded: true }, () => {
			this.addSeason(season);
		});
	};

	removeCustomSeason = (index) => {
		const { availableSeasons } = this.state;
		availableSeasons.splice(index, 1);
		this.setState({ availableSeasons });
	};

	editSeason = (season) => {
		this.setState({ showCustomSeason: true, selectedSeason: season });
	};

	addSeason = (season) => {
		const { selectedSeasons } = this.state;

		if (!selectedSeasons.find(element => season.externalId === element.externalId)) {
			selectedSeasons.push(season);
			this.setState({
				selectedSeasons,
			});
			this.onNext(3);
		}
	};

	removeSeason = (season) => {
		let { selectedSeasons } = this.state;

		if (selectedSeasons.find(element => season.externalId === element.externalId)) {
			selectedSeasons = selectedSeasons.filter(element => element.externalId !== season.externalId);
			this.setState({
				selectedSeasons,
			});
			if (!selectedSeasons.length) {
				this.onNext(2);
			}
		}
	};

	isCheckBoxChecked = (externalId) => {
		const { selectedSeasons } = this.state;
		return selectedSeasons.find(season => season.externalId === externalId);
	};

	handleSave = () => {
		const {
			selectedSeasons,
		} = this.state;
		const { property: { customId, seasons }, history } = this.props;
		const { updateProperty } = this.props;
		const allSeasons = [].concat(
			selectedSeasons.map(element => ({
				endDate: element.endDate,
				externalId: element.externalId,
				name: element.name,
				startDate: element.startDate,
				year: element.year,
			})),
			seasons.map(element => ({
				endDate: element.endDate,
				externalId: element.externalId,
				name: element.name,
				startDate: element.startDate,
				year: element.year,
			})),
		);

		const updateObj = {
			customId,
			seasons: allSeasons,
		};

		updateProperty(updateObj)
			.then(() => {
				history.push(`${ROUTE_PATHS.PROPERTIES}/${customId}/${CMS_PROPERTY_TABS.RIGHTS}`);
			});
	};

	getFutureSeasons = () => {
		const {
			availableSeasons,
			customSeasonsAdded,
		} = this.state;

		if (customSeasonsAdded) return availableSeasons;

		return availableSeasons.filter((season) => {
			const seasonStartYear = +getSeasonStartYear(season);
			const currentYear = +moment().format("YYYY");
			return currentYear <= +seasonStartYear;
		});
	};

	render() {
		const {
			currentStep,
			editSeason,
			availableSeasons,
			showAll,
			customSeasonsAdded,
			selectedSeason,
			showCustomSeason,
			seasons,
			selectedRight,
			territories,
			territoriesMode,
		} = this.state;
		const {
			property: { seasons: allSeasons, tournament, rights: allRights }, loading, history, skin,
		} = this.props;
		const seasonsValid = this.seasonsAreValid();
		const rightValid = this.rightAreValid();
		const territoriesValid = this.territoriesAreValid();
		const territory = getTerritoriesFromRights(allRights);
		const seasonTypes = [
			{
				value: EDIT_TYPE.create,
				label: <Translate i18nKey="CMS_EDIT_PROPERTY_STEP1_CREATE" />,
			},
			{
				value: EDIT_TYPE.edit,
				label: <Translate i18nKey="CMS_EDIT_PROPERTY_STEP1_EDIT" />,
			},
		];

		const futureSeasons = this.getFutureSeasons();
		let selectableSeasons = (showAll || futureSeasons.length === 0) ? availableSeasons : futureSeasons;
		selectableSeasons = uniqBy(selectableSeasons.concat(allSeasons), "externalId");
		selectableSeasons.sort(sortSeasons);
		const buttonDisabled = loading || (editSeason === EDIT_TYPE.create ? currentStep < 3 : currentStep < 5);

		return (
			<SkinContainer skin={skin}>
				<DefaultBox>
					<PropertyHeader edit={false} history={history} />
					{(!!allSeasons.length) && (
						<CmsStepSelector
							style={{ marginTop: 20 }}
							title={<Translate i18nKey="CMS_EDIT_PROPERTY_STEP1_TITLE" />}
							enableNextStep
						>
							<div className="season-selector">
								<RadioSelector
									value={editSeason}
									onChange={this.handleSeasonType}
									className="season-selector-item"
									items={seasonTypes}
								/>
							</div>
						</CmsStepSelector>
					)}

					{(currentStep > 1 && editSeason === EDIT_TYPE.create) && (
						<CmsStepSelector
							title={<Translate i18nKey="CMS_EDIT_PROPERTY_STEP2_TITLE_NEW" />}
							enableNextStep
						>
							<div className="season-selector">
								{selectableSeasons.map((season, index) => {
									const {
										externalId,
										custom,
									} = season;
									const selected = allSeasons.find(element => element.externalId === externalId);

									const idAttr = `checkbox-${externalId}`;
									return (
										<div className="season-selector-item" key={idAttr}>
											<input
												type="checkbox"
												className="ca-checkbox blue"
												value={externalId}
												checked={selected || this.isCheckBoxChecked(externalId)}
												disabled={selected}
												onChange={(e) => {
													e.target.checked
														? this.addSeason(season)
														: this.removeSeason(season);
												}}
												id={idAttr}
											/>
											<label
												className={cn({ selected: this.isCheckBoxChecked(externalId) })}
												htmlFor={idAttr}
												title={getSeasonMonthString(season)}
											>
												<SeasonYear {...season} />
											</label>
											{custom && (
												<span className="remove-icon-button" onClick={() => { this.removeCustomSeason(index); }}>
													<i className="fa fa-times-circle" />
												</span>
											)}
											{custom && (
												<span className="edit-season" onClick={() => { this.editSeason(season); }}>
													<i className="fa fa-pencil" />
												</span>
											)}
										</div>
									);
								})}
							</div>

							<div className="season-buttons" style={{ marginBottom: 20 }}>
								{!showAll && futureSeasons.length >= 1 && !customSeasonsAdded && (
									<span
										className="add-season"
										onClick={() => {
											this.setState({ showAll: true });
										}}
									>
										<i className="fa fa-arrow-circle-down small-icon" />
										<Translate i18nKey="CMS_SEASONS_SHOW_ALL" />
									</span>
								)}
								{!showCustomSeason && (
									<span
										className="add-season"
										onClick={() => {
											this.setState({ showCustomSeason: true });
										}}
									>
										<i className="fa fa-plus-circle small-icon" />
										<Translate i18nKey="CMS_FORM_ADD_SEASON" />
									</span>
								)}
							</div>

							{ showCustomSeason && (
								<>
									<h4 style={{ marginTop: 20 }}>
										<Translate i18nKey="CMS_EDIT_PROPERTY_ADD_SEASON_TITLE" />
									</h4>
									<h6>
										<Translate i18nKey="CMS_EDIT_PROPERTY_ADD_SEASON_SUBTITLE" />
									</h6>
									<CmsCustomSeason
										onDelete={() => {
											this.setState({ showCustomSeason: false });
										}}
										season={selectedSeason}
										existingSeasons={selectableSeasons}
										onConfirm={this.addCustomSeason}
										tournament={tournament}
									/>
								</>
							)}
						</CmsStepSelector>
					)}

					{(currentStep > 1 && editSeason === EDIT_TYPE.edit) && (
						<CmsStepSelector
							style={{ marginTop: 20 }}
							title={<Translate i18nKey="CMS_EDIT_PROPERTY_STEP2_TITLE_EDIT" />}
							button={<Translate i18nKey="CMS_EDIT_PROPERTY_STEP2_BUTTON" />}
							disabled={!allSeasons.length}
							enableNextStep={seasonsValid || !allSeasons.length}
							onNext={() => this.onNext(3)}
						>
							{!allSeasons.length && (
								<div className="select-item">
									<Translate i18nKey="CMS_SEASON_NOT_APPLICABLE" />
								</div>
							)}
							{allSeasons.length > 1 && (
								<div className="select-item">
									<button
										type="button"
										onClick={this.onSelectAllSeasons}
										className="ca-btn link-button"
									>
										Select All
									</button>
									<button
										type="button"
										onClick={this.onUnSelectAllSeasons}
										className="ca-btn link-button"
									>
										UnSelect All
									</button>
								</div>
							)}
							<div className="d-flex">
								{allSeasons.map((season) => {
									const { endDate, startDate } = season;
									let { year } = season;
									if (year) {
										if (year.split("/")[0].length === 2) {
											year = startDate.substring(0, 2) + year;
										}
									} else {
										const startY = moment(startDate).format("YYYY");
										const endY = moment(endDate).format("YYYY");
										year = startY === endY ? `${endY}` : `${startY}/${endY}`;
									}
									const selectedSeason = seasons.find(element => element.id === season.id);
									return (
										<div key={season.id} className="season-item">
											<input
												type="checkbox"
												value={!!selectedSeason}
												checked={!!selectedSeason}
												onChange={() => this.onChangeSeason(season)}
												className="ca-checkbox blue"
											/>
											<label>
												{year}
											</label>
										</div>
									);
								})}
							</div>
						</CmsStepSelector>
					)}

					{(currentStep > 2 && editSeason === EDIT_TYPE.edit) && (
						<CmsStepSelector
							title={<Translate i18nKey="CMS_EDIT_PROPERTY_STEP3_TITLE" />}
							button={<Translate i18nKey="CMS_EDIT_PROPERTY_STEP3_BUTTON" />}
							enableNextStep={rightValid}
							onNext={() => this.onNext(4)}
						>
							<div className="right-selector">
								{allRights.map((right) => {
									const {
										name, code,
									} = right;
									const offers = {
										EXCLUSIVE: "exclusive",
										NON_EXCLUSIVE: "non-exclusive",
									};
									const idAttr = `checkbox-${code}`;
									const exclusiveIdAttr = `exc-id-${code}`;
									const nonExclusiveIdAttr = `non-exc-id-${code}`;
									const selected = selectedRight && selectedRight.id === right.id;
									const exclusive = selected && selectedRight.exclusive !== null ? selectedRight.exclusive : null;
									const offerValue = exclusive === null ? null : (exclusive ? offers.EXCLUSIVE : offers.NON_EXCLUSIVE);
									return (
										<div className="right-selector-item" key={right.id}>
											<div className="right-name">
												<input
													type="radio"
													checked={selected}
													className="ca-radio ca-radio-exclusive"
													onChange={() => this.onSelectRight(right)}
													id={idAttr}
												/>
												<label className={cn({ selected })} htmlFor={idAttr}>
													{name}
												</label>
												<div className="tooltip-container">
													<span className="" data-tip data-for={code}>
														<i className="fa fa-question-circle-o" />
													</span>
													<ReactTooltip id={right.code} effect="solid" className="CaTooltip " delayHide={400}>
														<div className="body">
															<Translate i18nKey={`CMS_DEALS_RIGHT_DEFINITIONS_${code}`} />
														</div>
													</ReactTooltip>
												</div>
											</div>
											<div className="right-exclusivity">
												<input
													disabled={!selected}
													type="radio"
													checked={offerValue === offers.EXCLUSIVE}
													onChange={() => {
														this.onExclusive(right, true);
													}}
													id={exclusiveIdAttr}
													className="ca-radio ca-radio-exclusive"
												/>
												<label
													className={cn({ selected: selected && offerValue === offers.EXCLUSIVE })}
													htmlFor={exclusiveIdAttr}
												>
													<Translate i18nKey="RIGHT_SELECTION_OFFER_EXCLUSIVE" />
												</label>
												<input
													type="radio"
													disabled={!selected}
													checked={offerValue === offers.NON_EXCLUSIVE}
													onChange={() => {
														this.onExclusive(right, false);
													}}
													id={nonExclusiveIdAttr}
													className="ca-radio"
												/>
												<label
													htmlFor={nonExclusiveIdAttr}
													className={cn({ selected: selected && offerValue === offers.NON_EXCLUSIVE })}
												>
													<Translate i18nKey="RIGHT_SELECTION_OFFER_NON_EXCLUSIVE" />
												</label>
											</div>
										</div>
									);
								})}
							</div>
						</CmsStepSelector>
					)}

					{(currentStep > 3 && editSeason === EDIT_TYPE.edit) && (
						<CmsStepSelector
							title={<Translate i18nKey="CMS_EDIT_PROPERTY_STEP4_TITLE" />}
							button={<Translate i18nKey="CMS_EDIT_PROPERTY_STEP4_BUTTON" />}
							enableNextStep={territoriesValid}
							onNext={() => this.onNext(5)}
						>
							<CmsTerritorySelector
								className="small-select"
								onChange={this.onSelectTerritories}
								selectedCountries={territory.territories}
								value={territories}
								territoriesMode={territoriesMode}
								multiple
							/>
						</CmsStepSelector>
					)}

					<HorizontalButtonBox>
						<button
							className="yellow-button"
							onClick={this.cancel}
						>
							<Translate i18nKey="CMS_EDIT_PROPERTY_CANCEL_BUTTON" />
						</button>
						<button
							className="yellow-button"
							disabled={buttonDisabled}
							onClick={this.handleSave}
						>
							{!loading && <Translate i18nKey="CMS_EDIT_PROPERTY_BUTTON" />}
							{loading && <Loader xSmall loading />}
						</button>
					</HorizontalButtonBox>
				</DefaultBox>
			</SkinContainer>
		);
	}
}

const mapStateToProps = state => ({
	loading: state.propertyDetails.loading,
	property: state.propertyDetails.property,
});
const mapDispatchToProps = dispatch => ({
	updateProperty: value => dispatch(updateProperty(value)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(EditProperty);
