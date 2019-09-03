import React from "react";
import { PropTypes } from "prop-types";
import Translate from "@components/Translator/Translate";
import { SeasonYear } from "@utils/listing";
import { SelectAllButtons } from "@components/Utils/Utils";

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
			onSelectAll,
			onUnselectAll,
			onSelectSeason,
		} = this.props;
		return (
			<>
				{!availableSeasons.length && (
					<div className="select-item">
						<Translate i18nKey="CMS_SEASON_NOT_APPLICABLE" />
					</div>
				)}

				{availableSeasons.length > 1 && (
					<SelectAllButtons onSelectAll={onSelectAll} onUnselectAll={onUnselectAll} />
				)}
				<div className="d-flex">
					{availableSeasons.map((season) => {
						const selectedSeason = selectedSeasons.find(e => e.id === season.id);
						return (
							<div key={season.id} className="season-item">
								<input
									type="checkbox"
									value={!!selectedSeason}
									checked={!!selectedSeason}
									onChange={() => onSelectSeason(season)}
									className="ca-checkbox blue"
								/>
								<label>
									<SeasonYear {...season} />
								</label>
							</div>
						);
					})}
				</div>
			</>
		);
	}
}

SeasonSelector.propTypes = {
	onSelectAll: PropTypes.func.isRequired,
	onUnselectAll: PropTypes.func.isRequired,
	onSelectSeason: PropTypes.func.isRequired,
};

export default SeasonSelector;
