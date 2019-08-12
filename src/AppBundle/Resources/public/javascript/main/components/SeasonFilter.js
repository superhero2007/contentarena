import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import first from "lodash/first";
import { cancelIcon } from "./Icons";
import PopupSeasonSelector from "./PopupSeasonSelector";

const SeasonFilter = ({
	className, allSeasons, seasons, selectSeasons,
}, context) => {
	const seasonsValue = first(seasons) || null;
	const value = seasons.length > 1 ? ({
		value: `${seasons.length} seasons`,
		label: `${seasons.length} seasons`,
	}) : seasonsValue;
	return (
		<div className={className}>
			<Select
				className="base-input-select"
				placeholder={context.t("SEASON_FILTER_PLACEHOLDER")}
				clearable
				onChange={c => selectSeasons([c])}
				multi={false}
				value={value}
				options={allSeasons.map(b => ({ value: b.id, label: b.name }))}
			/>

			<PopupSeasonSelector
				value={seasons}
				onSelect={selectSeasons}
				allSeasons={allSeasons}
			/>
		</div>
	);
};

SeasonFilter.contextTypes = {
	t: PropTypes.func.isRequired,
};

SeasonFilter.propTypes = {
	className: PropTypes.string,
	allSeasons: PropTypes.array.isRequired,
	seasons: PropTypes.array.isRequired,
	selectSeasons: PropTypes.func.isRequired,
};

SeasonFilter.defaultProps = {
	className: "",
};

export default SeasonFilter;
