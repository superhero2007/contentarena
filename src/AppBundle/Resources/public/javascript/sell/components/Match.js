import React from "react";

class Match extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			match: props.match,
			selected: props.selected || false,
		};
	}

	toggle = (e) => {
		this.setState(prevState => ({
			selected: !prevState.selected,
		}));

		this.props.onUpdate(!this.state.selected);

		e.stopPropagation();
	};

	update = (selected) => {
		this.setState({ selected });
	};

	render() {
		const competitorsLen = this.props.match.competitors.length;
		return (
			<div
				className="match "
				onClick={() => {
					this.props.onSelect(this.props.match.externalId);
				}}
			>
				{this.props.match.selected && <i className="fa fa-circle" />}
				{!this.props.match.selected && <i className="fa fa-circle-o" />}
				{this.props.match.competitors.map((competitor, i) => (
					<span key={i}>
						{competitor.name}
						{" "}
						{(competitorsLen !== i + 1) && " vs "}
					</span>
				))}

			</div>
		);
	}
}

export default Match;
