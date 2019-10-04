import React from "react";
import Translate from "@components/Translator/Translate";
import SeasonSelector from "@components/Season";
import SeasonFixtures from "./SeasonFixtures";

const SeasonItem = ({
	season, toggleFixtures, onSelectSeason, index,
}) => (
	<>
		<div className="fixture-season" style={{ zIndex: 1000 - index }}>
			<i className={`fixture-season-icon icon-arrow-${season.fixturesOpen ? "bottom" : "right"}`} />
			<span className="subtitle1 fixture-season-name clickable" onClick={() => toggleFixtures(season)}>
				{season.name}
			</span>

			{!!season.fixtures.length && (
				<span className="fixture-season-amount clickable" onClick={() => toggleFixtures(season)}>
					{`(${season.fixtures.length} ${season.fixtures.length === 1 ? "Fixture" : "Fixtures"})`}
				</span>
			)}

			{!season.fixtures.length && (
				<button
					className="button primary-outline-button"
					onClick={() => toggleFixtures(season)}
				>
					<Translate i18nKey="CMS_FIXTURES_BUTTON_CREATE" />
				</button>
			)}

			<i className="icon-trash clickable" onClick={() => onSelectSeason(season)} />
		</div>

		{season.fixturesOpen && (
			<SeasonFixtures season={season} style={{ zIndex: 1000 - index }} />
		)}
	</>
);

class SeasonSelection extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			saving: false,
			selectedSeasons: props.selectedSeasons,
		};
	}

	componentDidMount() {}

	onSelectSeason = (value) => {
		let { selectedSeasons } = this.state;
		const selectedSeason = selectedSeasons.find(season => season.id === value.id);
		if (selectedSeason) {
			selectedSeasons = selectedSeasons.filter(season => season.id !== value.id);
		} else {
			selectedSeasons.push(value);
		}
		this.setState({ selectedSeasons });
		this.props.onSelectSeason(selectedSeasons);
	};

	toggleFixtures = (season) => {
		const { selectedSeasons } = this.state;
		const selectedSeason = selectedSeasons.find(s => s.id === season.id);
		selectedSeason.fixturesOpen = !selectedSeason.fixturesOpen;
		this.setState({ selectedSeasons });
		this.props.onSelectSeason(selectedSeasons);
	};


	render() {
		const {
			selectedSeasons,
		} = this.state;

		const { availableSeasons } = this.props;

		return (
			<>
				<SeasonSelector
					availableSeasons={availableSeasons}
					selectedSeasons={selectedSeasons}
					onSelectSeason={this.onSelectSeason}
				/>
				{!!selectedSeasons.length && (
					<div className="season-fixture-selector">
						<h5>
							<Translate i18nKey="SEASONS_FIXTURES_TITLE" />
						</h5>

						{selectedSeasons.map((season, index) => (
							<SeasonItem
								key={index}
								index={index}
								season={season}
								onSelectSeason={this.onSelectSeason}
								toggleFixtures={this.toggleFixtures}
							/>
						))}
					</div>
				)}
			</>
		);
	}
}

export default SeasonSelection;
