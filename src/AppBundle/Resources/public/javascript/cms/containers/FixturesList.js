import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import PropertyListItem from "../components/PropertyListItem";
import { ROUTE_PATHS } from "@constants";
import FixtureListItem from "../components/FixtureListItem";
import { cmsFile } from "../../main/components/Icons";

class FixturesList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const {
			season,
			seasons,
			listingSeason,
			history,
			onRemoveFixture,
			onSelectFixture,
			onUnselectFixture,
			onUpdateFixture,
		} = this.props;

		const selectedSeason = seasons.find(s => s.id === season.id);

		const fixtures = selectedSeason.fixtures.sort((a, b) => new Date(a.date) - new Date(b.date));

		return (
			<div className="fixture-list">
				{
					fixtures.map((fixture, i) => (
						<FixtureListItem
							fixture={fixture}
							key={`fixture-${i}`}
							history={history}
							showEdit={false}
							selected={listingSeason.fixtures.find(f => f.externalId === fixture.externalId) !== undefined}
							onRemoveFixture={() => onRemoveFixture(fixture)}
							onSelectFixture={() => onSelectFixture(fixture)}
							onUnselectFixture={() => onUnselectFixture(fixture)}
							onUpdateFixture={fixture => onUpdateFixture(fixture)}
						/>
					))
				}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	seasons: state.propertyDetails.property.seasons,
});

export default connect(
	mapStateToProps,
	null,
)(FixturesList);
