import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { DefaultBox, VerticalButtonBox } from "../../common/components/Containers";
import {
	openCategorySelector, openSeasonSelector, openSportSelector,
	openTournamentSelector, updateFromMultiple
} from "../../sell/actions/stepOneActions";
import SelectorModal from "../../common/modals/SelectorModal/SelectorModal";
import {
	getSeasonName, getSeasonNames, getSportCategoryName, getSportName,
	getTournamentName, hasCustomSeason, hasCustomSport, hasCustomSportCategory, hasCustomTournament
} from "../reducers/property";
import {
	setCustomSeasonName, setCustomSportCategoryName, setCustomSportName,
	setCustomTournamentName, removeNewSeason, removeNewSport, removeNewTournament
} from "../actions/propertyActions";
import Loader from "../../common/components/Loader/Loader";
import moment from "moment/moment";
import { getMonths, getYears } from "../../common/utils/time";
import { DATE_FORMAT } from "@constants";
import RightsSelector from "../components/RightsSelector";

class NewProperty extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			seasonsData: [{}]
		};
	}

	componentWillReceiveProps(nextProps){

		const { loadingCategories, loadingTournaments, loadingSeasons } = this.state;
		const {
			property,
		} = nextProps;


		if (property.sports.length === 1 && !loadingCategories) {
			this.loadCategories(property.sports[0]);
		}

		if (property.sports.length === 1 && !loadingTournaments) {
			this.loadTournaments(property.sports[0], property.sportCategory[0]);
		}

		if (property.tournament.length === 1 && !loadingSeasons) {
			if (!property.tournament[0].custom && !property.tournament[0].externalId.startsWith("ca:")) {
				this.loadSeasons(property.tournament[0]);
			}
		}

		this.setSeasonData(property);
	}

	componentDidMount() {
		this.setState({ loadingSports: true });
		ContentArena.Api.getAllSports(["create"])
			.done((sports) => {
				ContentArena.Data.FullSports = sports;
				this.setState({ loadingSports: false });
			});

		ContentArena.Api.getAllSports(["top"])
			.done((sports) => {
				ContentArena.Data.TopSports = sports;
			});
	}

	loadCategories(sport) {
		const sportId = sport.externalId;

		if (sportId === this.state.lastSportId || sport.custom) return;

		this.setState({ loadingCategories: true });
		ContentArena.Api.getCategories(sportId)
			.done((categories) => {
				ContentArena.Data.Categories = categories;
				this.setState({
					lastSportId: sportId,
					loadingCategories: false,
				});
			});
	}

	loadTournaments(sport, category) {
		if (sport.custom || (sport.externalId && sport.externalId.startsWith("ca:"))) return;

		const sportId = sport.externalId;
		const categoryId = (category) ? category.externalId : null;

		if (sportId === this.state.lastSportId && categoryId === this.state.lastCategoryId) return;

		this.setState({ loadingTournaments: true });
		ContentArena.Api.getTournaments(sportId, categoryId)
			.done((tournaments) => {
				ContentArena.Data.Tournaments = tournaments;

				if (tournaments.length === 0) {
					if (!this.state.customSeasonsParsed) {
						// Custom season and tournament auto enable
					}

					this.setState({
						loadingTournaments: false,
						customSeasonsParsed: true,
					});

					return;
				}

				this.setState({
					lastSportId: sportId,
					loadingTournaments: false,
					lastCategoryId: categoryId,
				});
			});
	}

	loadSeasons(tournament) {
		const tournamentId = tournament.externalId;

		if (tournamentId === this.state.lastTournamentId) return;

		this.setState({ loadingSeasons: true });
		ContentArena.Api.getSeasons(tournamentId)
			.done((seasons) => {
				ContentArena.Data.Seasons = seasons;

				if (seasons.length === 0) {
					/*const hasSeasons = this.props.seasons && this.props.seasons.length;
					if (!hasSeasons && (this.props.customSeasons === null || this.props.customSeasons === undefined || this.props.customSeasons.length === 0)) {
						this.props.addNewSeason(0);
					}*/
					this.setState({
						loadingSeasons: false,
						tournamentHasNoSeason: true,
						lastTournamentId: tournamentId,
					});
					return;
				}

				this.setState({
					lastTournamentId: tournamentId,
					loadingSeasons: false,
					tournamentHasNoSeason: false,
					seasons,
				});
			})
			.always(() => {
			});
	}

	handleSeasonDateChange = (index, e, dateType, type) => {

		let year, month;

		const { seasonsData } = this.state;

		if (dateType === "YEAR") {
			year = e.target.value;
			month = (type === "endDate") ? seasonsData[index].endMonth : seasonsData[index].startMonth;
		}

		if (dateType === "MONTH") {
			year = (type === "startDate") ? seasonsData[index].startYear : seasonsData[index].endYear;
			month = e.target.value;
		}

		const monthNumber = moment().month(month).format("M");
		const theDate = moment(new Date(year, +monthNumber)).utc().format();

		this.props.updateFromMultiple("seasons", index, type, theDate);
	};

	addSeason = () => {
		this.setState((state) => ({
			seasonsData: [...state.seasonsData, {}]
		}));
	};

	removeSeason = (index) => {
		this.setState((state) => ({
			seasonsData: state.seasonsData.splice(index, 1)
		}));
	};

	setSeasonData = (property) => {

		const { seasons } = property;

		let seasonsData = seasons.map(season => {
			const {
				startDate, endDate, customStartDate, customEndDate,
			} = season;
			const realStartDate = customStartDate || startDate;
			const realEndDate = customEndDate || endDate;

			return {
				startYear : realStartDate ? moment(realStartDate).utc().format("YYYY") : "",
			 	startMonth : realStartDate ? moment(realStartDate).utc().format("MMM") : "",
				endYear : realEndDate ? moment(realEndDate).utc().format("YYYY") : "",
				endMonth : realEndDate ? moment(realEndDate).utc().format("MMM") : "",
			}

		});

		if (seasonsData.length === 0) seasonsData.push({
			startYear : "",
			startMonth : "",
			endYear : "",
			endMonth : "",
		});

		this.setState({seasonsData: seasonsData});
	};

	renderDurationFields(index) {
		if (index === undefined) return null;

		const { seasonsData } = this.state;

		let disabled = !this.isCustomSeason(index);

		return (
			<li className="small-item">
				<div className="small-item-container">
					<label>
						From {" "}
					</label>
					<div className="date-select">
						<select
							value={seasonsData[index].startYear || ""}
							onChange={e => this.handleSeasonDateChange(index, e, "YEAR", "startDate")}
							className="ca-form-control"
							disabled={disabled}
						>
							<option value="" disabled>
								Year
							</option>
							{getYears(seasonsData[index].startYear).map(year => (
								<option value={year} key={year}>
									{year}
								</option>
							))}
						</select>
						<select
							value={seasonsData[index].startMonth || ""}
							className="ca-form-control"
							disabled={disabled}
							onChange={e => this.handleSeasonDateChange(index, e, "MONTH", "startDate")}
						>
							<option value="" disabled>
								Month
							</option>
							{getMonths().map(month => (
								<option value={month} key={month}>
									{month}
								</option>
							))}
						</select>
					</div>

				</div>
				<div className="small-item-container">
					<label>
						To {" "}
					</label>
					<div className="date-select">
						<select
							value={seasonsData[index].endYear || ""}
							onChange={e => this.handleSeasonDateChange(index, e, "YEAR", "endDate")}
							className="ca-form-control"
							disabled={disabled}
						>
							<option value="" disabled>
								Year
							</option>
							{getYears(seasonsData[index].endYear).map(year => (
								<option value={year} key={year}>
									{year}
								</option>
							))}
						</select>
						<select
							value={seasonsData[index].endMonth || ""}
							onChange={e => this.handleSeasonDateChange(index, e, "MONTH", "endDate")}
							className="ca-form-control"
							disabled={disabled}
						>
							<option value="" disabled>
								Month
							</option>
							{getMonths().map(month => (
								<option value={month} key={month}>
									{month}
								</option>
							))}
						</select>
					</div>
				</div>
			</li>
		);
	}

	isCustomSeason = (index) => {

		const {
			property,
			hasCustomTournament,
		} = this.props;

		if ( hasCustomTournament ) return true;

		if (index === undefined) return null;

		const { seasons } = property;
		const activeSeason = seasons[index];

		if (activeSeason === undefined) return false;

		return activeSeason.custom || this.isContentArenaSeason(index);
	};

	isContentArenaSeason = (index) => {
		if (index === undefined) return null;

		const { seasons } = this.props.property;
		const activeSeason = seasons[index];

		if (activeSeason === undefined || activeSeason.externalId === undefined) return false;

		return activeSeason.externalId.startsWith("ca:");
	};

	render() {
		const {
			loadingSports,
			loadingCategories,
			loadingTournaments,
			loadingSeasons,
			seasonsData
		} = this.state;

		const {
			property,
			sportValue,
			sportCategoryValue,
			tournamentValue,
			seasonValues,
			hasCustomSport,
			hasCustomSportCategory,
			hasCustomTournament,
			hasCustomSeason,
			openSportSelector,
			openCategorySelector,
			openTournamentSelector,
			openSeasonSelector,
			setCustomSportName,
			setCustomSportCategoryName,
			setCustomTournamentName,
			setCustomSeasonName,
			removeCustomSport,
			removeCustomTournament,
			removeCustomSeason,
		} = this.props;

		return (
			<div className="default-container no-title property">
				<SelectorModal />
				<DefaultBox>
					<h4>
						{this.context.t("CMS_CREATE_PROPERTY_TITLE")}
					</h4>
					<h6>
						{this.context.t("CMS_CREATE_PROPERTY_DESCRIPTION")}
					</h6>
					<form>
						<ul className="form-items">
							<li>
								<label>
									{this.context.t("CMS_FORM_SPORT_LABEL")}
								</label>
								<input
									type="text"
									disabled={loadingSports}
									placeholder={this.context.t("CMS_FORM_SPORT_PLACEHOLDER")}
									value={sportValue}
									onClick={() => {
										if (!hasCustomSport) openSportSelector(0, property.sports)
									}}
									onChange={(e) => {
										if (hasCustomSport) setCustomSportName(0, e.target.value)
									}}
								/>
								<div className="item-tools">
									<Loader loading={loadingSports} xSmall />
									{
										hasCustomSport &&
										<i className="fa fa-minus-circle" onClick={() => {
											removeCustomSport(0);
										}}/>
									}
								</div>
							</li>
							<li>
								<label>
									{this.context.t("CMS_FORM_CATEGORY_LABEL")}
								</label>
								<input
									type="text"
									disabled={!sportValue || loadingCategories}
									placeholder={this.context.t("CMS_FORM_CATEGORY_PLACEHOLDER")}
									value={sportCategoryValue}
									onClick={() => {
										if (!hasCustomSportCategory) openCategorySelector(0, property.sportCategory)
									}}
									onChange={(e) => {
										if (hasCustomSportCategory) setCustomSportCategoryName(0, e.target.value)
									}}
								/>
								<div className="item-tools">
									<Loader loading={loadingCategories} xSmall />
								</div>
							</li>
							<li>
								<label>
									{this.context.t("CMS_FORM_TOURNAMENT_LABEL")}
								</label>
								<input
									type="text"
									disabled={!sportValue || loadingTournaments || (hasCustomSportCategory && sportCategoryValue === "" )}
									placeholder={this.context.t("CMS_FORM_TOURNAMENT_PLACEHOLDER")}
									value={tournamentValue}
									onClick={() => {
										if (!hasCustomTournament) openTournamentSelector(0, property.tournament)
									}}
									onChange={(e) => {
										if (hasCustomTournament) setCustomTournamentName(0, e.target.value)
									}}
								/>
								<div className="item-tools">
									<Loader loading={loadingTournaments} xSmall />
									{
										!hasCustomSportCategory && hasCustomTournament && sportCategoryValue !== "" &&
										<i className="fa fa-minus-circle" onClick={() => {
											removeCustomTournament(0)
										}}/>
									}
								</div>
							</li>
							{
								seasonsData.map((v, index)=>{
									return (
										<React.Fragment key={index}>
											<li>
												<label>
													{this.context.t("CMS_FORM_SEASON_LABEL")}
												</label>
												<input
													type="text"
													disabled={!tournamentValue || loadingSeasons}
													placeholder={this.context.t("CMS_FORM_SEASON_PLACEHOLDER")}
													value={seasonValues[index] || ""}
													onClick={() => {
														if (!this.isCustomSeason(index)) openSeasonSelector(index, property.seasons)
													}}
													onChange={(e) => {
														if (this.isCustomSeason(index)) setCustomSeasonName(index, e.target.value)
													}}
												/>
												<div className="item-tools">
													<Loader loading={loadingSeasons} xSmall />
													{
														!hasCustomTournament && hasCustomSeason && seasonValues[index] !== "" &&
														<i className="fa fa-minus-circle" onClick={() => {
															removeCustomSeason(index);
														}}/>
													}
												</div>
											</li>
											{
												tournamentValue && this.renderDurationFields(index)
											}
											{
												property.seasons.length > 0 && tournamentValue &&
												<li>
													<i onClick={() => this.addSeason()} className="fa fa-minus-circle"/>
													{
														index > 0 &&
														<i onClick={() => removeCustomSeason(index)} className="fa fa-close"/>
													}
												</li>
											}
										</React.Fragment>
									)
								})
							}

						</ul>
					</form>
				</DefaultBox>
				<DefaultBox>
					<h4>
						{this.context.t("CMS_SELECT_RIGHTS_TITLE")}
					</h4>
					<h6>
						{this.context.t("CMS_SELECT_RIGHTS_DESCRIPTION")}
					</h6>

					<p>
						<RightsSelector />
					</p>
				</DefaultBox>

				<VerticalButtonBox>
					<button className="yellow-button">
						{this.context.t("CMS_CREATE_PROPERTY_BUTTON")}
					</button>
					<button className="link-button property-cancel-button">
						{this.context.t("CMS_CANCEL_CREATE_PROPERTY_BUTTON")}
					</button>
				</VerticalButtonBox>

			</div>
		);
	}

}

NewProperty.contextTypes = {
	t: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
	return Object.assign({}, state, {
		sportValue: getSportName(state),
		sportCategoryValue: getSportCategoryName(state),
		seasonValues: getSeasonNames(state),
		tournamentValue: getTournamentName(state),
		hasCustomSport: hasCustomSport(state),
		hasCustomSportCategory: hasCustomSportCategory(state),
		hasCustomTournament: hasCustomTournament(state),
		hasCustomSeason: hasCustomSeason(state),

	});
};

const mapDispatchToProps = dispatch => ({
	openSportSelector: (index, selectedItems) => dispatch(openSportSelector(index, selectedItems)),
	openCategorySelector: selectedItems => dispatch(openCategorySelector(selectedItems)),
	openTournamentSelector: selectedItems => dispatch(openTournamentSelector(selectedItems)),
	openSeasonSelector: (index, selectedItems) => dispatch(openSeasonSelector(index, selectedItems)),
	removeCustomSport: (index) => dispatch(removeNewSport(index)),
	removeCustomTournament: (index) => dispatch(removeNewTournament(index)),
	removeCustomSeason: (index) => dispatch(removeNewSeason(index)),
	setCustomSportName: (index, sportName) => dispatch(setCustomSportName(index, sportName)),
	setCustomSportCategoryName: (index, sportCategoryName) => dispatch(setCustomSportCategoryName(index, sportCategoryName)),
	setCustomTournamentName: (index, tournamentName) => dispatch(setCustomTournamentName(index, tournamentName)),
	setCustomSeasonName: (index, seasonName) => dispatch(setCustomSeasonName(index, seasonName)),
	updateFromMultiple: (type, index, key, value) => dispatch(updateFromMultiple(type, index, key, value)),
});


export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(NewProperty);
