import React from "react";
import { connect } from "react-redux";
import moment from "moment";
import Loader from "@components/Loader/Loader";
import cn from "classnames";
import Translate from "@components/Translator/Translate";
import { getSeasonMonthString, getSeasonStartYear, SeasonYear } from "@utils/listing";
import { updateContentValue } from "../../sell/actions/contentActions";
import { setSeasons } from "../actions/propertyActions";
import CmsCustomSeason from "./CmsCustomSeason";

class CmsSeasonSelector extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			seasons: this.getSeasonsFromProps(props),
			loadingSeasons: false,
			showAll: false,
			editSeason: null,
			availableSeasons: [],
			customSeasonsAdded: false,
		};
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ seasons: this.getSeasonsFromProps(nextProps) });
	}

	componentDidMount() {
		const {
			tournament,
		} = this.props;

		const {
			loadingSeasons,
		} = this.state;

		if ((tournament.length === 1 && !loadingSeasons)) {
			if (!tournament[0].custom && !tournament[0].externalId.startsWith("ca:")) {
				this.loadSeasons(tournament[0]);
			}
		}
	}

	loadSeasons(tournament) {
		const tournamentId = tournament.externalId;

		this.setState({ loadingSeasons: true });
		ContentArena.Api.getSeasons(tournamentId)
			.done((availableSeasons) => {
				availableSeasons = availableSeasons.filter(season => season.startDate && season.endDate);
				ContentArena.Data.Seasons = availableSeasons;

				if (availableSeasons.length === 0) {
					this.setState({ tournamentHasNoSeason: true });
					return;
				}

				this.setState({
					tournamentHasNoSeason: false,
					availableSeasons,
				});
			})
			.always(() => {
				this.setState({ loadingSeasons: false });
			});
	}

	getSeasonsFromProps = props => new Map(props.seasons.map(seasonItem => [seasonItem.externalId, seasonItem]));

	getSeasonsForProps = seasons => [...seasons.values()];

	addCustomSeason = (season) => {
		const { availableSeasons } = this.state;
		const index = availableSeasons.findIndex(s => s.externalId === season.externalId);

		if (index !== -1) {
			availableSeasons[index] = season;
		} else {
			availableSeasons.push(season);
		}

		availableSeasons.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));

		this.setState({ availableSeasons, editSeason: null, customSeasonsAdded: true }, () => {
			this.addSeason(season);
		});
	};

	removeCustomSeason = (index) => {
		const { availableSeasons } = this.state;
		availableSeasons.splice(index, 1);
		this.setState({ availableSeasons });
	};

	addSeason = (season) => {
		const { seasons } = this.state;

		if (!seasons.has(season.externalId)) {
			seasons.set(season.externalId, {
				...season,
				exclusive: false,
			});
			this.props.seasonsUpdated(this.getSeasonsForProps(seasons));
		}
	};

	removeSeason = (season) => {
		const { seasons } = this.state;

		if (seasons.has(season.externalId)) {
			seasons.delete(season.externalId);
			this.props.seasonsUpdated(this.getSeasonsForProps(seasons));
		}
	};

	editSeason = (season) => {
		this.setState({ showCustomSeason: true }, () => {
			this.setState({ editSeason: season });
		});
	};

	isCheckBoxChecked = (externalId) => {
		const { seasons } = this.state;
		return seasons.has(externalId);
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
			loadingSeasons,
			availableSeasons,
			customSeasonsAdded,
			showCustomSeason,
			showAll,
			editSeason,
		} = this.state;

		if (loadingSeasons) {
			return (
				<div className="item-tools">
					<Loader loading xSmall />
				</div>
			);
		}

		if (availableSeasons.length === 0) return (null);

		const futureSeasons = this.getFutureSeasons();
		const seasons = (showAll || futureSeasons.length === 0) ? availableSeasons : futureSeasons;

		return (
			<>
				<div className="season-selector">
					{seasons.map((season, index) => {
						const {
							externalId,
							custom,
						} = season;

						const idAttr = `checkbox-${externalId}`;
						return (
							<div className="season-selector-item" key={idAttr}>
								<input
									type="checkbox"
									className="ca-checkbox blue"
									checked={this.isCheckBoxChecked(externalId)}
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
										<i className="fa fa-info-circle" />
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
							<Translate i18nKey="CMS_CREATE_PROPERTY_ADD_SEASON_TITLE" />
						</h4>
						<h6>
							<Translate i18nKey="CMS_CREATE_PROPERTY_ADD_SEASON_SUBTITLE" />
						</h6>
						<CmsCustomSeason
							onDelete={() => {
								this.setState({ showCustomSeason: false });
							}}
							season={editSeason}
							existingSeasons={seasons}
							onConfirm={this.addCustomSeason}
						/>
					</>
				)}
			</>
		);
	}
}

const mapStateToProps = state => ({
	...state.property,
	validation: state.validation,
});

const mapDispatchToProps = dispatch => ({
	seasonsUpdated: seasons => dispatch(setSeasons(seasons)),
	updateContentValue: (k, v) => dispatch(updateContentValue(k, v)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(CmsSeasonSelector);
