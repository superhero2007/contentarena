import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import first from "lodash/first";
import { cancelIcon } from "./Icons";
// import PopupCountrySelector from "./PopupCountrySelector";

const SeasonFilter = ({
	className, allSeasons, seasons, selectSeasons,
}) => {
	const seasonsValue = first(seasons) || null;

	const isMoreThanOneSelected = seasons.length > 1;
	const seasonInputValueObj = {
		isShown: isMoreThanOneSelected,
		value: isMoreThanOneSelected ? `${seasons.length} seasons` : "",
		isDisabled: isMoreThanOneSelected,
	};
	return (
		<div className={className}>
			{seasonInputValueObj.isShown ? (
				<Fragment>
					<input
						type="text"
						className="ca-form-control"
						value={seasonInputValueObj.value}
						disabled={seasonInputValueObj.isDisabled}
					/>

					<img
						className="territories-icon"
						src={cancelIcon}
						onClick={() => {
							selectSeasons([]);
						}}
						alt=""
					/>

				</Fragment>
			) : (
				<Select
					className="base-input-select"
					placeholder="Seasons"
					clearable={false}
					onChange={c => selectSeasons([c])}
					multi={false}
					value={seasonsValue}
					options={allSeasons.map(b => ({ value: b.id, label: b.name }))}
				/>
			)}

			{/*
			<PopupCountrySelector
				value={seasons}
				onSelect={selectSeasons}
			/>
			*/}
		</div>
	);
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
