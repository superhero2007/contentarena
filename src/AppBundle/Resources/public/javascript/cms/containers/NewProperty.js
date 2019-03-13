import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { DefaultBox } from "../../common/components/Containers";
import {
	openCategorySelector, openSeasonSelector, openSportSelector,
	openTournamentSelector
} from "../../sell/actions/stepOneActions";
import SelectorModal from "../../common/modals/SelectorModal/SelectorModal";
import {
	getSeasonName, getSportCategoryName, getSportName,
	getTournamentName, hasCustomSeason, hasCustomSport, hasCustomSportCategory, hasCustomTournament
} from "../reducers/property";
import {
	setCustomSeasonName, setCustomSportCategoryName, setCustomSportName,
	setCustomTournamentName
} from "../actions/propertyActions";

class NewProperty extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
		};
	}

	componentWillReceiveProps(nextProps){
		console.log(this.props);

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
	}

	componentDidMount() {
		ContentArena.Api.getAllSports(["create"])
			.done((sports) => {
				ContentArena.Data.FullSports = sports;
			});

		ContentArena.Api.getAllSports(["top"])
			.done((sports) => {
				ContentArena.Data.TopSports = sports;
			});
	}

	loadCategories(sport) {
		const sportId = sport.externalId;

		if (sportId === this.state.lastSportId) return;

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

	render() {
		const {
			loading,
			loadingCategories,
			loadingTournaments,
			loadingSeasons,
		} = this.state;

		const {
			property,
			sportValue,
			sportCategoryValue,
			tournamentValue,
			seasonValue,
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
		} = this.props;

		return (
			<div className="default-container no-title">
				<SelectorModal />
				<DefaultBox>
					<h4>
						{this.context.t("CMS_CREATE_PROPERTY_TITLE")}
					</h4>

					<form>
						<ul className="form-items">
							<li>
								<label>{this.context.t("CMS_FORM_SPORT_LABEL")}</label>
								<input
									type="text"
									placeholder={this.context.t("CMS_FORM_SPORT_PLACEHOLDER")}
									value={sportValue}
									onClick={() => {
										if (!hasCustomSport) openSportSelector(0, property.sports)
									}}
									onChange={(e) => {
										if (hasCustomSport) setCustomSportName(0, e.target.value)
									}}
								/>
							</li>
							<li>
								<label>{this.context.t("CMS_FORM_CATEGORY_LABEL")}</label>
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
							</li>
							<li>
								<label>{this.context.t("CMS_FORM_TOURNAMENT_LABEL")}</label>
								<input
									type="text"
									disabled={!sportValue || loadingTournaments}
									placeholder={this.context.t("CMS_FORM_TOURNAMENT_PLACEHOLDER")}
									value={tournamentValue}
									onClick={() => {
										if (!hasCustomTournament) openTournamentSelector(0, property.tournament)
									}}
									onChange={(e) => {
										if (hasCustomTournament) setCustomTournamentName(0, e.target.value)
									}}
								/>
							</li>
							<li>
								<label>{this.context.t("CMS_FORM_SEASON_LABEL")}</label>
								<input
									type="text"
									disabled={!tournamentValue || loadingSeasons}
									placeholder={this.context.t("CMS_FORM_SEASON_PLACEHOLDER")}
									value={seasonValue}
									onClick={() => {
										if (!hasCustomSeason) openSeasonSelector(0, property.seasons)
									}}
									onChange={(e) => {
										if (hasCustomSeason) setCustomSeasonName(0, e.target.value)
									}}
								/>
							</li>
						</ul>
					</form>
				</DefaultBox>
				<DefaultBox>
					<h4>
						{this.context.t("CMS_SELECT_RIGHTS_TITLE")}
					</h4>

					<p>
						test
					</p>
				</DefaultBox>

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
		seasonValue: getSeasonName(state),
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
	setCustomSportName: (index, sportName) => dispatch(setCustomSportName(index, sportName)),
	setCustomSportCategoryName: (index, sportCategoryName) => dispatch(setCustomSportCategoryName(index, sportCategoryName)),
	setCustomTournamentName: (index, tournamentName) => dispatch(setCustomTournamentName(index, tournamentName)),
	setCustomSeasonName: (index, seasonName) => dispatch(setCustomSeasonName(index, seasonName)),
});


export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(NewProperty);
