import React from "react";
import { connect } from "react-redux";
import Match from "./Match";

class StaticRound extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			seasons: props.seasons,
			season: props.season,
			round: props.round,
		};
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
		const { seasons, season, round } = this.state;

		const { schedules } = seasons[season];
		const activeRound = schedules[round];
		activeRound.showMatches = !activeRound.showMatches;
		this.setState({ seasons });
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

	getSelected = () => {
		const { seasons, season, round } = this.props;

		const schedule = seasons[season].schedules;
		const activeRound = schedule[round];
		return Array.from(activeRound.matches.values()).filter(m => (m.selected)).length;
	};

	completeSeason = () => {
		const { seasons, season, round } = this.props;
		const schedule = seasons[season].schedules;
		return Object.values(schedule).filter(r => Array.from(r.matches.values()).filter(m => m.selected).length > 0).length === 0;
	};

	render() {
		const { seasons, season, round } = this.state;

		const schedule = seasons[season].schedules;
		const activeRound = schedule[round];
		const complete = this.completeSeason();
		const selected = this.getSelected();

		if (!complete && selected === 0) return null;

		return (
			<div className="matchday">
				<div className="ca-checkbox select-box-checkbox">
					<div style={{ width: "100%" }}>
						{isNaN(round) && round}
						{!isNaN(round) && `Matchday ${round}`}

						{(complete || selected === activeRound.matches.size)
						&& <span onClick={this.toggleMatches}>All ></span>}
						{!complete && selected !== activeRound.matches.size && (
							<span onClick={this.toggleMatches}>
								{selected}
								{" "}
								Selected >


							</span>
						)}
					</div>
				</div>

				{activeRound.showMatches && (
					<div className="match-group">
						{activeRound.matches.size > 0 && Array.from(activeRound.matches.values()).map((item, i) => (
							<div className="match" key={`match-${i}`}>
								{(item.selected || complete) && <i className="fa fa-circle" />}
								{!item.selected && !complete && <i className="fa fa-circle-o" />}
								{item.competitors.map((competitor, ci, list) => (
									<span key={ci}>
										{competitor.name}
										{" "}
										{(list.length !== ci + 1) && " vs "}
									</span>
								))}

							</div>
						))}
					</div>
				)}
			</div>
		);
	}
}

export default StaticRound;
