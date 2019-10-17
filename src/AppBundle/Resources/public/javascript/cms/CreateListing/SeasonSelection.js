import React from "react";
import Translate from "@components/Translator/Translate";
import SeasonSelector from "@components/Season";
import { connect } from "react-redux";
import cloneDeep from "lodash/cloneDeep";
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
		const newSeason = cloneDeep(value);
		const selectedSeason = selectedSeasons.find(season => season.id === value.id);
		if (selectedSeason) {
			selectedSeasons = selectedSeasons.filter(season => season.id !== value.id);
		} else {
			newSeason.fixtures = [];
			selectedSeasons.push(newSeason);
		}
		this.setState({ selectedSeasons });
		this.props.onSelectSeason(selectedSeasons);
	};

	onUpdateSeason = (value) => {
		let { selectedSeasons } = this.state;
		const newSeason = cloneDeep(value);
		selectedSeasons = selectedSeasons.map((season) => {
			if (season.id === newSeason.id) {
				return newSeason;
			}
			return season;
		});
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

						{selectedSeasons.map((listingSeason, index) => {
							const selectedSeason = seasons.find(s => s.id === listingSeason.id);
							const selectedSeasonInfo = availableSeasons.find(s => s.id === listingSeason.id);
							return (
								<section key={`fixture-season-${index}`}>
									<div
										className="fixture-season"
										style={{ zIndex: 1000 - index }}
									>
										<i
											onClick={() => this.toggleFixtures(listingSeason)}
											className={`fixture-season-icon clickable icon-arrow-${listingSeason.fixturesOpen ? "bottom" : "right"}`}
										/>
										<span
											className="subtitle1 fixture-season-name clickable"
											  onClick={() => this.toggleFixtures(listingSeason)}
										>
											{listingSeason.name}
										</span>

										{!!selectedSeason.fixtures.length && (
											<span
												className="fixture-season-amount clickable"
												  onClick={() => this.toggleFixtures(listingSeason)}
											>
												{`(${selectedSeason.fixtures.length} ${selectedSeason.fixtures.length === 1 ? "Fixture" : "Fixtures"})`}
											</span>
										)}

										{!selectedSeason.fixtures.length && (
											<button
												className="button primary-outline-button"
												onClick={() => this.toggleFixtures(listingSeason)}
											>
												<Translate i18nKey="CMS_FIXTURES_BUTTON_CREATE" />
											</button>
										)}

										<i className="icon-trash clickable" onClick={() => this.onSelectSeason(listingSeason)} />
									</div>

									{listingSeason.fixturesOpen && (
										<SeasonFixtures
											key={`fixtures-${index}`}
											season={selectedSeasonInfo}
											onUpdateSeason={this.onUpdateSeason}
											listingSeason={listingSeason}
											style={{ zIndex: 1000 - index }}
										/>
									)}
								</section>
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
