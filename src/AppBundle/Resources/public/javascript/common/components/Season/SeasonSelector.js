import React from "react";
import { PropTypes } from "prop-types";
import { SeasonYear } from "@utils/listing";

class SeasonSelector extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	render() {
		const {
			availableSeasons = [],
			selectedSeasons = [],
			onSelectSeason,
		} = this.props;
		return (
			<div className="season-selector">
				{availableSeasons.map((season) => {
					const selectedSeason = selectedSeasons.find(e => e.id === season.id);
					return (
						<label key={season.id} className="input-checkbox">
							<input
								type="checkbox"
								value={!!selectedSeason}
								checked={!!selectedSeason}
								onChange={() => onSelectSeason(season)}
							/>
							<span className="input-checkbox-selector" />
							<span className="input-checkbox-text">
								<SeasonYear {...season} />
							</span>
						</label>
					);
				})}
			</div>
		);
	}
}

SeasonSelector.propTypes = {
	onSelectSeason: PropTypes.func.isRequired,
};

export default SeasonSelector;
