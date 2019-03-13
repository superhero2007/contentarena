import React from "react";
import { connect } from "react-redux";
import Loader from "@components/Loader/Loader";
import cn from "classnames";
import { updateContentValue } from "../../sell/actions/contentActions";
import { setSeasons } from "../actions/propertyActions";

class CmsSeasonSelector extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			seasons: this.getSeasonsFromProps(props),
			loadingSeasons: false,
			availableSeasons: [],
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

	getSeasonsFromProps = props => new Map(props.seasons.filter(season => !season.custom).map(seasonItem => [seasonItem.externalId, seasonItem]));

	getSeasonsForProps = seasons => [...seasons.values(), ...this.props.seasons.filter(s => s.custom)];

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


	isCheckBoxChecked = (externalId) => {
		const { seasons } = this.state;
		return seasons.has(externalId);
	};

	render() {
		const {
			loadingSeasons,
			availableSeasons,
		} = this.state;

		if (loadingSeasons) {
			return (
				<div className="item-tools">
					<Loader loading xSmall />
				</div>
			);
		}

		if (availableSeasons.length === 0) return (null);

		return (
			<div className="season-selector">
				{availableSeasons.map((season, index) => {
					const {
						externalId,
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
							<label className={cn({ selected: this.isCheckBoxChecked(externalId) })} htmlFor={idAttr}>
								{season.year}
							</label>
						</div>
					);
				})}
			</div>
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
