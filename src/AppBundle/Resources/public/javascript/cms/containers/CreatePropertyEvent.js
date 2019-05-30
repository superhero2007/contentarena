import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import moment from "moment/moment";
import { DefaultBox, VerticalButtonBox } from "../../common/components/Containers";
import {
	openCategorySelector, openSeasonSelector, openSportSelector,
	openTournamentSelector, updateFromMultiple,
} from "../../sell/actions/stepOneActions";
import SelectorModal from "../../common/modals/SelectorModal/SelectorModal";
import {
	getSeasonNames, getSportCategoryName, getSportName,
	getTournamentName, hasCustomSeason, hasCustomSport, hasCustomSportCategory, hasCustomTournament,
} from "../reducers/property";
import {
	setCustomSeasonName, setCustomSportCategoryName, setCustomSportName, addCustomSeason,
	setCustomTournamentName, removeNewSeason, removeNewSport, removeNewTournament, setFocusSeason,
} from "../actions/propertyActions";
import Loader from "../../common/components/Loader/Loader";
import { getMonths, getYears } from "../../common/utils/time";
import { DATE_FORMAT, ROUTE_PATHS, SPORT_KEYS } from "@constants";
import CmsRightsSelector from "../components/CmsRightsSelector";

class CreatePropertyEvent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			seasonsData: [{}],
			isSeasonApplicable: true,
		};

		this.tournamentInput = React.createRef();
		this.countryInput = React.createRef();
	}

	componentWillReceiveProps(nextProps) {
		const {
			loadingCategories, loadingTournaments, loadingSeasons,
		} = this.state;
		const {
			property,
		} = nextProps;

		if (property.sports.length === 1 && !loadingCategories) {
			this.loadCategories(property.sports[0]);
		}

		if (property.sports.length === 1 && !loadingTournaments) {
			this.loadTournaments(property.sports[0], property.sportCategory[0]);
		}

		if ((property.tournament.length === 1 && !loadingSeasons)) {
			if (!property.tournament[0].custom && !property.tournament[0].externalId.startsWith("ca:")) {
				this.loadSeasons(property.tournament[0]);
			}
		}

		this.handleTournamentFocus(nextProps);

		this.setSeasonData(property);
	}

	handleTournamentFocus = (next) => {
		const { hasCustomSport, sportCategoryValue } = this.props;

		if (hasCustomSport) return;
		if (next.sportCategoryValue !== sportCategoryValue && this.tournamentInput.current) {
			setTimeout(() => {
				this.tournamentInput.current.focus();
			}, 1);
		}
	};

	handleCompetitionFocus = () => {
		const { hasCustomSport } = this.props;

		if (hasCustomSport) return;
		setTimeout(() => {
			this.countryInput.current && this.countryInput.current.focus();
		}, 1);
	};

	handleSeasonFocus = (index = 0, typeFocus = "input", selectIndex = 0) => {
		const { loadingTournaments, loadingCategories, loading } = this.state;
		const { property: { canFocusSeason = true } } = this.props;

		if (loadingTournaments || loadingCategories || loading || !canFocusSeason) return null;

		setTimeout(() => {
			if (typeFocus === "input") {
				const el = this[`season-${index}-input`];
				if (!el) return;
				el.querySelector("input").focus();
			} else {
				const el = this[`season-${index}-selects`];
				if (!el) return;
				const selects = el.querySelectorAll("select");
				if (!selects || selects.length === 0) return;
				selects[selectIndex].focus();
			}
		}, 1);
	};

	getSportsByKey = async key => ContentArena.Api.getAllSports([key]).done((sports) => {
		if (key === SPORT_KEYS.CREATE) ContentArena.Data.FullSports = sports;
		if (key === SPORT_KEYS.TOP) ContentArena.Data.TopSports = sports;
	});

	componentDidMount() {
		Promise.all([this.getSportsByKey(SPORT_KEYS.TOP), this.getSportsByKey(SPORT_KEYS.CREATE)])
			.then(() => {
				this.setState({ loading: false }, () => {
					this.handleCompetitionFocus();
				});
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
				}, this.handleCompetitionFocus);
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
					this.setState({
						loadingSeasons: false,
						tournamentHasNoSeason: true,
						lastTournamentId: tournamentId,
					}, this.handleSeasonFocus);
					return;
				}

				this.setState({
					lastTournamentId: tournamentId,
					loadingSeasons: false,
					tournamentHasNoSeason: false,
					seasons,
				}, this.handleSeasonFocus);
			})
			.always(() => {
			});
	}

	handleSeasonDateChange = (index, e, dateType, type, selectorIndex) => {
		let year; let
			month;
		const { seasonsData } = this.state;
		const { seasons } = this.props.property;

		if (dateType === "YEAR") {
			year = e.target.value;
			month = (type === "endDate") ? seasonsData[index].endMonth : seasonsData[index].startMonth;
		}

		if (dateType === "MONTH") {
			year = (type === "startDate") ? seasonsData[index].startYear : seasonsData[index].endYear;
			month = e.target.value;
		}

		if (!year) {
			year = moment.utc().format("YYYY");
		}

		const monthNumber = moment().month(month).format("MM");
		const yearNumber = moment().year(year).format("YYYY");
		const theDate = moment(new Date(+yearNumber, +monthNumber)).utc().format("YYYY-MM-DD");

		this.props.updateFromMultiple("seasons", index, type, theDate);
		if (seasons[index] && seasons[index].custom) {
			const seasonName = this.getCustomSeasonName(seasons[index], year, month, type);
			this.props.setCustomSeasonName(index, seasonName);
		}

		if (selectorIndex) this.handleSeasonFocus(index, "selector", selectorIndex);
	};

	handleOpenTournament = (index, tournament) => {
		const {
			setFocusSeason,
			hasCustomTournament,
			openTournamentSelector,
			property: { canFocusSeason = true },
		} = this.props;

		if (!canFocusSeason) setFocusSeason(true);
		if (!hasCustomTournament) openTournamentSelector(index, tournament);
	};

	handleOpenSeasonSelector = (index, seasons) => {
		const {
			setFocusSeason,
			openSeasonSelector,
			property: { canFocusSeason = true },
		} = this.props;

		if (!canFocusSeason) setFocusSeason(true);
		if (!this.isCustomSeason(index)) openSeasonSelector(index, seasons);
	};

	getCustomSeasonName = (season, year, month, type) => {
		const startY = type === "startDate" && year
			? year
			: season.startDate
				? moment(season.startDate).format("YYYY")
				: "";
		const endY = type === "endDate" && year
			? year
			: season.endDate
				? moment(season.endDate).format("YYYY")
				: "";
		const startM = type === "startDate" && month
			? `${month}${season.startDate ? ` ${moment(season.startDate).format("YYYY")}` : ""}`
			: season.startDate
				? moment(season.startDate).format("MMM YYYY")
				: "";
		const endM = type === "endDate" && month
			? `${month}${season.startDate ? ` ${moment(season.endDate).format("YYYY")}` : ""}`
			: season.endDate
				? moment(season.endDate).format("MMM YYYY")
				: "";

		const finalYear = startY && endY
			? `${startY}/${endY}`
			: `${startY || endY}`;
		const finalMonth = startM && endM
			? `${startM} - ${endM}`
			: `${startM || endM}`;

		return `${finalYear} (${finalMonth})`;
	};

	addSeason = () => {
		if (this.props.hasCustomSport) this.props.addCustomSeason();
		this.setState(state => ({
			seasonsData: [...state.seasonsData, {}],
		}), () => {
			const index = this.state.seasonsData.length - 1;
			this.handleSeasonFocus(index, "input");
		});
	};

	setSeasonData = (property) => {
		const { seasons } = property;

		const seasonsData = seasons.map((season) => {
			const {
				startDate, endDate, customStartDate, customEndDate,
			} = season;
			const realStartDate = customStartDate || startDate;
			const realEndDate = customEndDate || endDate;

			return {
				startYear: realStartDate ? moment(realStartDate).utc().format("YYYY") : "",
			 	startMonth: realStartDate ? moment(realStartDate).utc().format("MMM") : "",
				endYear: realEndDate ? moment(realEndDate).utc().format("YYYY") : "",
				endMonth: realEndDate ? moment(realEndDate).utc().format("MMM") : "",
			};
		});

		if (seasonsData.length === 0) {
			seasonsData.push({
				startYear: "",
				startMonth: "",
				endYear: "",
				endMonth: "",
			});
		}

		this.setState({ seasonsData });
	};

	renderDurationFields(index) {
		if (index === undefined && !this.isCustomSeason(index)) return null;

		const { seasonsData } = this.state;

		const disabled = !this.isCustomSeason(index);

		return (
			<li className="small-item" ref={el => this[`season-${index}-selects`] = el}>
				<div className="small-item-container">
					<label>
						From {" "}
					</label>
					<div className="date-select">
						<select
							value={seasonsData[index].startMonth || ""}
							className="ca-form-control"
							disabled={disabled}
							onChange={e => this.handleSeasonDateChange(index, e, "MONTH", "startDate", 1)}
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
						<select
							value={seasonsData[index].startYear || ""}
							onChange={e => this.handleSeasonDateChange(index, e, "YEAR", "startDate", 2)}
							className="ca-form-control"
							disabled={disabled}
						>
							<option value="" disabled>
								Year
							</option>
							{getYears(seasonsData[index].startYear, null, 69, 17).map(year => (
								<option value={year} key={year}>
									{year}
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
							value={seasonsData[index].endMonth || ""}
							onChange={e => this.handleSeasonDateChange(index, e, "MONTH", "endDate", 3)}
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
						<select
							value={seasonsData[index].endYear || ""}
							onChange={e => this.handleSeasonDateChange(index, e, "YEAR", "endDate")}
							className="ca-form-control"
							disabled={disabled}
						>
							<option value="" disabled>
								Year
							</option>
							{getYears(seasonsData[index].endYear, null, 69, 17).map(year => (
								<option value={year} key={year}>
									{year}
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

		if (hasCustomTournament) return true;

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

	handleSeasonCheckbox = () => this.setState(prevState => ({ isSeasonApplicable: !prevState.isSeasonApplicable }));

	isSeasonInputDisabled = (index) => {
		const { tournamentValue, loadingSeasons } = this.props;
		const { isSeasonApplicable } = this.state;

		if (!tournamentValue || loadingSeasons || !isSeasonApplicable) return true;
		const { seasons } = this.props.property;
		const seasonItem = seasons[index];
		if (!seasonItem) return false;
		if (seasonItem.custom || (!seasonItem.custom && seasonItem.name)) return true;
		return false;
	};

	getSeasonValue = (index) => {
		const { seasons, tournament } = this.props.property;
		if (!seasons[index] || !tournament[0].name) return "";
		if (seasons[index].custom && !seasons[index].name) return "please define via from/to fields";
		return seasons[index].name;
	};

	isCheckboxSeasonShow = () => {
		const { seasonValues } = this.props;
		return seasonValues.length === 0;
	};

	getAddBtn = () => (
		<span className="add-season" onClick={() => this.addSeason()}>
			<i className="fa fa-plus-circle" />
			{this.context.t("CMS_FORM_ADD_SEASON")}
		</span>
	);

	getRemoveBtn = (index) => {
		const { removeCustomSeason } = this.props;
		return (
			<span className="remove-season" onClick={() => removeCustomSeason(index)}>
				<i className="fa fa-minus-circle" />
				{this.context.t("CMS_FORM_REMOVE_SEASON")}
			</span>
		);
	};

	render() {
		const {
			loadingSports,
			loadingCategories,
			loadingTournaments,
			loadingSeasons,
			seasonsData,
			loading,
		} = this.state;

		if (loading) {
			return (
				<div className="settings-container">
					<Loader loading />
				</div>
			);
		}

		const {
			history,
			property,
			sportValue,
			sportCategoryValue,
			tournamentValue,
			seasonValues,
			hasCustomSport,
			hasCustomSportCategory,
			hasCustomTournament,
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
		} = this.props;

		return (
			<div className="default-container no-title property">
				<SelectorModal
					postApplySeasonAction={index => this.handleSeasonFocus(index, "selector", 0)}
				/>
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
										if (!hasCustomSport) openSportSelector(0, property.sports);
									}}
									onChange={(e) => {
										if (hasCustomSport) setCustomSportName(0, e.target.value);
									}}
								/>
								<div className="item-tools">
									<Loader loading={loadingSports} xSmall />
									{hasCustomSport && (
										<i
											className="fa fa-minus-circle"
											onClick={() => {
												removeCustomSport(0);
											}}
										/>
									)}
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
										if (!hasCustomSportCategory) openCategorySelector(0, property.sportCategory);
									}}
									onChange={(e) => {
										if (hasCustomSportCategory) setCustomSportCategoryName(0, e.target.value);
									}}
									ref={this.countryInput}
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
									disabled={!sportValue || loadingTournaments || !sportCategoryValue.trim()}
									placeholder={this.context.t("CMS_FORM_TOURNAMENT_PLACEHOLDER")}
									value={tournamentValue}
									onClick={() => { this.handleOpenTournament(0, property.tournament); }}
									onChange={(e) => {
										if (hasCustomTournament) setCustomTournamentName(0, e.target.value);
									}}
									ref={this.tournamentInput}
								/>
								<div className="item-tools">
									<Loader loading={loadingTournaments} xSmall />
									{
										!hasCustomSportCategory && hasCustomTournament && sportCategoryValue !== "" && (
											<i
												className="fa fa-minus-circle"
												onClick={() => {
													removeCustomTournament(0);
												}}
											/>
										)
									}
								</div>
							</li>
							{seasonsData.map((season, index) => (
								<React.Fragment key={index}>
									<li ref={el => this[`season-${index}-input`] = el}>
										<label>
											{this.context.t("CMS_FORM_SEASON_LABEL")}
										</label>
										<input
											type="text"
											disabled={this.isSeasonInputDisabled(index)}
											placeholder={this.context.t("CMS_FORM_SEASON_PLACEHOLDER")}
											value={this.getSeasonValue(index)}
											onClick={() => { this.handleOpenSeasonSelector(index, property.seasons); }}
											onChange={(e) => {
												if (this.isCustomSeason(index)) setCustomSeasonName(index, e.target.value);
											}}
										/>
										<div className="item-tools">
											<Loader loading={loadingSeasons} xSmall />
										</div>
									</li>
									{!this.isCheckboxSeasonShow() && tournamentValue && this.renderDurationFields(index)}
									{!this.isCheckboxSeasonShow() && property.seasons.length > 0 && tournamentValue && (
										<li className="season-buttons">
											{this.getRemoveBtn(index)}
											{index === seasonsData.length - 1 && this.getAddBtn(index)}
										</li>
									)}
								</React.Fragment>
							))}
							{this.isCheckboxSeasonShow() && (
								<li className="season-checkbox">
									<input
										id="season-checkbox"
										type="checkbox"
										className="ca-checkbox blue"
										onClick={this.handleSeasonCheckbox}
									/>
									<label htmlFor="season-checkbox">{this.context.t("CMS_FORM_NOT_APPLICABLE")}</label>
								</li>
							)}
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
					<CmsRightsSelector />
				</DefaultBox>
				<VerticalButtonBox>
					<button
						className="yellow-button"
						disabled={property.rights.length === 0}
						onClick={() => history.push(ROUTE_PATHS.CREATE_PROPERTY_STEP_2)}
					>
						{this.context.t("CMS_CREATE_PROPERTY_CONTINUE_BUTTON")}
					</button>
					<button onClick={() => history.push(ROUTE_PATHS.CREATE_PROPERTY)} className="link-button property-cancel-button">
						{this.context.t("CMS_CANCEL_CREATE_PROPERTY_BUTTON")}
					</button>
				</VerticalButtonBox>
			</div>
		);
	}
}

CreatePropertyEvent.contextTypes = {
	t: PropTypes.func.isRequired,
};

const mapStateToProps = state => Object.assign({}, state, {
	sportValue: getSportName(state),
	sportCategoryValue: getSportCategoryName(state),
	seasonValues: getSeasonNames(state),
	tournamentValue: getTournamentName(state),
	hasCustomSport: hasCustomSport(state),
	hasCustomSportCategory: hasCustomSportCategory(state),
	hasCustomTournament: hasCustomTournament(state),
	hasCustomSeason: hasCustomSeason(state),

});

const mapDispatchToProps = dispatch => ({
	openSportSelector: (index, selectedItems) => dispatch(openSportSelector(index, selectedItems)),
	openCategorySelector: selectedItems => dispatch(openCategorySelector(selectedItems)),
	openTournamentSelector: selectedItems => dispatch(openTournamentSelector(selectedItems)),
	openSeasonSelector: (index, selectedItems) => dispatch(openSeasonSelector(index, selectedItems)),
	addCustomSeason: () => dispatch(addCustomSeason()),
	removeCustomSport: index => dispatch(removeNewSport(index)),
	removeCustomTournament: index => dispatch(removeNewTournament(index)),
	removeCustomSeason: index => dispatch(removeNewSeason(index)),
	setCustomSportName: (index, sportName) => dispatch(setCustomSportName(index, sportName)),
	setCustomSportCategoryName: (index, sportCategoryName) => dispatch(setCustomSportCategoryName(index, sportCategoryName)),
	setCustomTournamentName: (index, tournamentName) => dispatch(setCustomTournamentName(index, tournamentName)),
	setCustomSeasonName: (index, seasonName) => dispatch(setCustomSeasonName(index, seasonName)),
	updateFromMultiple: (type, index, key, value) => dispatch(updateFromMultiple(type, index, key, value)),
	setFocusSeason: isFocus => dispatch(setFocusSeason(isFocus)),
});


export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(CreatePropertyEvent);
