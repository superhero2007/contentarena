import React from "react";
import Translate from "@components/Translator/Translate";
import SeasonSelector from "@components/Season";
import { connect } from "react-redux";
import SeasonFixtures from "./SeasonFixtures";
import { fetchPropertySuccess, startFetchingPropertyDetails } from "../actions/propertyActions";

class SeasonSelection extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			saving: false,
			selectedSeasons: props.selectedSeasons,
		};
	}

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

		const { availableSeasons, seasons } = this.props;

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

						{selectedSeasons.map((season, index) => {
							const selectedSeason = seasons.find(s => s.id === season.id);
							return (
								<>
									<div
										className="fixture-season"
										style={{ zIndex: 1000 - index }}
										key={`fixture-season-${index}`}
									>
										<i className={`fixture-season-icon icon-arrow-${season.fixturesOpen ? "bottom" : "right"}`} />
										<span
											className="subtitle1 fixture-season-name clickable"
											  onClick={() => this.toggleFixtures(season)}
										>
											{season.name}
										</span>

										{!!selectedSeason.fixtures.length && (
											<span
												className="fixture-season-amount clickable"
												  onClick={() => this.toggleFixtures(season)}
											>
												{`(${selectedSeason.fixtures.length} ${selectedSeason.fixtures.length === 1 ? "Fixture" : "Fixtures"})`}
											</span>
										)}

										{!selectedSeason.fixtures.length && (
											<button
												className="button primary-outline-button"
												onClick={() => this.toggleFixtures(season)}
											>
												<Translate i18nKey="CMS_FIXTURES_BUTTON_CREATE" />
											</button>
										)}

										<i className="icon-trash clickable" onClick={() => this.onSelectSeason(season)} />
									</div>

									{season.fixturesOpen && (
										<SeasonFixtures
											key={`fixtures-${index}`}
											season={season}
											style={{ zIndex: 1000 - index }}
										/>
									)}
								</>
							);
						})}
					</div>
				)}
			</>
		);
	}
}


const mapStateToProps = state => ({
	common: state.common,
	propertyFilters: state.propertyFilters,
	property: state.propertyDetails.property,
	seasons: state.propertyDetails.property.seasons,
});

const mapDispatchToProps = dispatch => ({
	fetchPropertySuccess: property => dispatch(fetchPropertySuccess(property)),
	startFetchingPropertyDetails: () => dispatch(startFetchingPropertyDetails()),
});


export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(SeasonSelection);
