import React from "react";
import { connect } from "react-redux";
import Match from "./Match";

class Round extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	toggle = (e) => {
		const {
			seasons, season, round, updateFromMultiple,
		} = this.props;
		const selected = e.target.checked;
		const { schedules } = seasons[season];
		const activeRound = schedules[round];
		activeRound.selected = selected;

		updateFromMultiple("seasons", season, "schedules", schedules);

		e.stopPropagation();
		this.selectAll(selected);
	};

	toggleMatches = (e) => {
		const {
			seasons, season, round, updateFromMultiple,
		} = this.props;

		const { schedules } = seasons[season];
		const activeRound = schedules[round];
		activeRound.showMatches = !activeRound.showMatches;
		updateFromMultiple("seasons", season, "schedules", schedules);

		e.stopPropagation();
	};

	selectAll = (selected) => {
		const {
			seasons, season, round, updateFromMultiple,
		} = this.props;

		const { schedules } = seasons[season];
		const activeRound = schedules[round];
		activeRound.matches.forEach((match) => {
			match.selected = selected;
		});
		updateFromMultiple("seasons", season, "schedules", schedules);
	};

	onSelect = (id) => {
		const {
			seasons, season, round, updateFromMultiple,
		} = this.props;

		const { schedules } = seasons[season];
		const activeRound = schedules[round];
		activeRound.matches.get(id).selected = !activeRound.matches.get(id).selected;

		if (activeRound.matches.get(id).selected) activeRound.selected = true;

		updateFromMultiple("seasons", season, "schedules", schedules);
	};

	getSelected = () => {
		const { seasons, season, round } = this.props;

		const schedule = seasons[season].schedules;
		const activeRound = schedule[round];
		return Array.from(activeRound.matches.values()).filter(m => (m.selected)).length;
	};

	render() {
		const { seasons, season, round } = this.props;

		const schedule = seasons[season].schedules;
		const activeRound = schedule[round];

		return (
			<div className="matchday">
				<div className="ca-checkbox select-box-checkbox">
					<input
						type="checkbox"
						checked={activeRound.selected}
						onChange={this.toggle}
						id={`round-${round}`}
					/>
					<label htmlFor={`round-${round}`} />

					<div style={{ width: "100%" }}>
						{isNaN(round) && round}
						{!isNaN(round) && `Matchday ${round}`}

						{(this.getSelected() === 0) && (this.getSelected() !== activeRound.matches.size)
						&& <span onClick={this.toggleMatches}>Select ></span>}
						{(this.getSelected() !== 0) && (this.getSelected() === activeRound.matches.size)
						&& <span onClick={this.toggleMatches}>All ></span>}
						{(this.getSelected() !== 0) && (this.getSelected() !== activeRound.matches.size) && (
							<span onClick={this.toggleMatches}>
								{this.getSelected()}
								{" "}
								Selected >


							</span>
						)}
					</div>
				</div>


				{activeRound.showMatches && (
					<div className="match-group">
						{activeRound.matches.size > 0 && Array.from(activeRound.matches.values()).map((item, i) => (
							<Match
								match={item}
								key={item.externalId}
								onSelect={this.onSelect}
							/>
						))}
					</div>
				)}
			</div>
		);
	}
}

const mapStateToProps = state => state.content;

const mapDispatchToProps = dispatch => ({
	updateFromMultiple: (type, index, key, value) => dispatch({
		type: "UPDATE_FROM_MULTIPLE",
		selectorType: type,
		index,
		key,
		value,
	}),
	updateContentValue: (key, value) => dispatch({
		type: "UPDATE_CONTENT_VALUE",
		key,
		value,
	}),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Round);
