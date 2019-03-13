import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { isMobileOnly, isTablet } from "react-device-detect";
import cn from "classnames";
import Translate from "@components/Translator/Translate";
import { scrollMainContainer } from "@utils/listing";
import { HorizontalButtonBox, DefaultBox } from "@components/Containers";
import { TranslatedPlaceholderInput } from "@components/Translator";
import { ROUTE_PATHS, SPORT_KEYS } from "@constants";
import {
	removeNewSport,
	removeNewTournament,
	resetProperty,
	selectTournament,
	setCustomSportCategoryName,
	setCustomSportName,
	setCustomTournamentName,
} from "../actions/propertyActions";
import CmsSearchCompetition from "../components/CmsSearchCompetition";
import CmsSearchResults from "../components/CmsSearchResults";
import Loader from "../../common/components/Loader/Loader";
import {
	openCategorySelector, openSportSelector, openTournamentSelector,
	updateFromMultiple,
} from "../../sell/actions/stepOneActions";
import {
	getSeasonNames,
	getSportCategoryName, getSportName, getTournamentName, hasCustomSeason, hasCustomSport, hasCustomSportCategory,
	hasCustomTournament, hasExtendedSportCategory,
} from "../reducers/property";
import SelectorModal from "../../common/modals/SelectorModal/SelectorModal";

class CreatePropertyWelcome extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			showCompetitionSelectors: props.property.sports.length > 0,
		};

		this.tournamentInput = React.createRef();
		this.countryInput = React.createRef();
	}

	componentDidMount() {
		Promise.all([this.getSportsByKey(SPORT_KEYS.TOP), this.getSportsByKey(SPORT_KEYS.CREATE)])
			.then(() => {
				this.setState({ loading: false });
			});

		ContentArena.Api.getCountries();
		scrollMainContainer();
	}

	componentWillReceiveProps(nextProps) {
		const {
			loadingCategories,
			loadingTournaments,
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
			})
			.fail(() => {
				this.setState({
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
			})
			.fail(() => {
				this.setState({
					loadingTournaments: false,
				});
			});
	}

	getSportsByKey = async key => ContentArena.Api.getAllSports([key]).done((sports) => {
		if (key === SPORT_KEYS.CREATE) ContentArena.Data.FullSports = sports;
		if (key === SPORT_KEYS.TOP) ContentArena.Data.TopSports = sports;
	});

	selectTournament = (tournament) => {
		const { history, selectTournament } = this.props;
		selectTournament(tournament);
		history.push(ROUTE_PATHS.CREATE_PROPERTY_STEP_1);

		/* if (tournament) {
			setTimeout(() => {
				selectTournament(tournament);
			}, 1000);
		} */
	};

	onSearch = (results) => {
		this.setState({ results });
	};

	onCreateManually = () => {
		this.setState({ showCompetitionSelectors: true });
	};

	render() {
		const {
			results,
			showCompetitionSelectors,
			loadingSports,
			loadingCategories,
			loadingTournaments,
		} = this.state;

		const {
			history,
			property,
			tournamentValue,
			sportValue,
			sportCategoryValue,
			hasCustomSport,
			hasCustomSportCategory,
			hasCustomTournament,
			openSportSelector,
			openCategorySelector,
			openTournamentSelector,
			setCustomSportName,
			setCustomSportCategoryName,
			setCustomTournamentName,
			removeCustomSport,
			removeCustomTournament,
			hasExtendedSportCategory,
			resetProperty,
		} = this.props;

		return (
			<div className="default-container property">
				<SelectorModal />
				<div className="default-title-box text-center">
					<h1 className={cn({ mobile: isMobileOnly, tablet: isTablet })}>
						<Translate i18nKey="CMS_WELCOME_MAIN_TITLE" />
					</h1>
					<h3 className={cn({ mobile: isMobileOnly, tablet: isTablet })}>
						<Translate i18nKey="CMS_WELCOME_MAIN_SUBTITLE" />
					</h3>

				</div>

				<DefaultBox>
					<h5 className="property-welcome-title">
						<Translate i18nKey="CMS_WELCOME_SEARCH_TITLE" />
					</h5>
					<h5 className="property-welcome-subtitle">
						<Translate i18nKey="CMS_WELCOME_SEARCH_SUB_TITLE" />
					</h5>

					{showCompetitionSelectors && (
						<div className="manual-competition">
							<form>
								<ul className="form-items">
									<li>
										<label>
											<Translate i18nKey="CMS_FORM_SPORT_LABEL" />
										</label>
										<Translate i18nKey="CMS_FORM_SPORT_PLACEHOLDER">
											<TranslatedPlaceholderInput
												readOnly={!hasCustomSport}
												type="text"
												disabled={loadingSports}
												value={sportValue}
												onClick={() => {
													if (!hasCustomSport) openSportSelector(0, property.sports);
												}}
												onChange={(e) => {
													if (hasCustomSport) setCustomSportName(0, e.target.value);
												}}
											/>
										</Translate>
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
											<Translate i18nKey="CMS_FORM_CATEGORY_LABEL" />
										</label>
										<Translate i18nKey="CMS_FORM_CATEGORY_PLACEHOLDER">
											<TranslatedPlaceholderInput
												readOnly={!hasCustomSportCategory}
												type="text"
												disabled={!sportValue || loadingCategories}
												value={sportCategoryValue}
												onClick={() => {
													if (!hasCustomSportCategory) openCategorySelector(0, property.sportCategory);
												}}
												onChange={(e) => {
													if (hasCustomSportCategory) setCustomSportCategoryName(0, e.target.value);
												}}
												ref={this.countryInput}
											/>
										</Translate>
										<div className="item-tools">
											<Loader loading={loadingCategories} xSmall />
										</div>
									</li>
									<li>
										<label>
											<Translate i18nKey="CMS_FORM_TOURNAMENT_LABEL" />
										</label>
										<Translate i18nKey="CMS_FORM_TOURNAMENT_PLACEHOLDER">
											<TranslatedPlaceholderInput
												readOnly={!hasCustomTournament && !hasExtendedSportCategory}
												type="text"
												disabled={!sportValue || loadingTournaments || !sportCategoryValue.trim()}
												value={tournamentValue}
												onClick={() => {
													if (!hasCustomTournament && !hasExtendedSportCategory) openTournamentSelector(0, property.tournament);
												}}
												onChange={(e) => {
													if (hasCustomTournament || hasExtendedSportCategory) setCustomTournamentName(0, e.target.value);
												}}
												ref={this.tournamentInput}
											/>
										</Translate>
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
								</ul>
							</form>

							<HorizontalButtonBox>
								<button
									onClick={() => {
										resetProperty();
										this.setState({
											showCompetitionSelectors: false,
										});
									}}
									className="yellow-button"
								>
									<Translate i18nKey="CMS_CREATE_PROPERTY_BACK_BUTTON" />
								</button>
								<button
									className="yellow-button"
									disabled={property.sports.length === 0}
									onClick={() => history.push(ROUTE_PATHS.CREATE_PROPERTY_STEP_1)}
								>
									<Translate i18nKey="CMS_CREATE_PROPERTY_CONTINUE_BUTTON" />
								</button>
							</HorizontalButtonBox>
						</div>
					)}

					{!showCompetitionSelectors && (
						<CmsSearchCompetition
							onSearch={this.onSearch}
							onCreateManually={this.onCreateManually}
						/>
					)}

					{!results && !showCompetitionSelectors && (
						<p style={{ marginLeft: 20 }}>
							<Translate i18nKey="CMS_WELCOME_SEARCH_PHRASE_1" />{" "}
							<a onClick={this.onCreateManually}><Translate i18nKey="CMS_WELCOME_SEARCH_PHRASE_2" /></a>
						</p>
					)}
				</DefaultBox>
				{results && results.length > 0 && (
					<DefaultBox>
						<CmsSearchResults
							results={results}
							select={this.selectTournament}
						/>
					</DefaultBox>
				)}
			</div>
		);
	}
}

CreatePropertyWelcome.contextTypes = {
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
	hasExtendedSportCategory: hasExtendedSportCategory(state),
});

const mapDispatchToProps = dispatch => ({
	selectTournament: tournament => dispatch(selectTournament(tournament)),
	openSportSelector: (index, selectedItems) => dispatch(openSportSelector(index, selectedItems)),
	openCategorySelector: selectedItems => dispatch(openCategorySelector(selectedItems)),
	openTournamentSelector: selectedItems => dispatch(openTournamentSelector(selectedItems)),
	resetProperty: () => dispatch(resetProperty()),
	removeCustomSport: index => dispatch(removeNewSport(index)),
	removeCustomTournament: index => dispatch(removeNewTournament(index)),
	setCustomSportName: (index, sportName) => dispatch(setCustomSportName(index, sportName)),
	setCustomSportCategoryName: (index, sportCategoryName) => dispatch(setCustomSportCategoryName(index, sportCategoryName)),
	setCustomTournamentName: (index, tournamentName) => dispatch(setCustomTournamentName(index, tournamentName)),
	updateFromMultiple: (type, index, key, value) => dispatch(updateFromMultiple(type, index, key, value)),
});


export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(CreatePropertyWelcome);
