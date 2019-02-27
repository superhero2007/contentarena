import React from "react";
import PropTypes from "prop-types";
import SportSelector from "../../main/components/SportSelector";

class PreferredSportBuyer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			sports: (props.sports) ? props.sports : [],
			all: (props.all) ? props.all : false,
			other: (props.other) ? props.other : false,
		};
	}

	handleRadioChange = (flag) => {
		const { onChange } = this.props;
		this.setState({ allSports: flag, sports: [] });
		if (onChange) onChange([], flag);
	};

	setSports = (sports) => {
		const { onChange } = this.props;
		if (onChange) onChange(sports);
		this.setState({ sports });
	};

	render() {
		const { sports, all, other } = this.state;
		const { parse, showSubtitle = true } = this.props;
		return (
			<React.Fragment>
				<div className="preferences-title">
					{this.context.t("PREFERENCES_SPORT_BUYER_TITLE")}
				</div>
				{showSubtitle && (
					<div className="subtitle">
						{this.context.t("PREFERENCES_SPORT_BUYER_SUBTITLE")}
					</div>
				)}
				<div className="row" style={{ marginBottom: 50 }}>
					<div className="preferences-item">
						<SportSelector
							onChange={this.setSports}
							flags={["wall"]}
							sports={sports}
							parse={parse}
							all={all}
							other={other}
						/>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

PreferredSportBuyer.contextTypes = {
	t: PropTypes.func.isRequired,
};

export default PreferredSportBuyer;
