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
		this.state = {
		};
	}

	render() {
		const {
			fixtures,
			history,
			onRemoveFixture,
			onEditFixture,
		} = this.props;

		return (
			<div className="fixture-list">
				{
					fixtures.map((fixture, i) => (
						<FixtureListItem
							{...fixture}
							key={`fixture-${i}`}
							history={history}
							onRemoveFixture={() => onRemoveFixture(fixture)}
							onEditFixture={() => onEditFixture(fixture)}
						/>
					))
				}
			</div>
		);
	}
}

FixturesList.contextTypes = {
	t: PropTypes.func.isRequired,
};

const mapStateToProps = state => state;

export default connect(
	mapStateToProps,
	null,
)(FixturesList);
