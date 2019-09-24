import React from "react";
import cn from "classnames";

class RegionSelector extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	getCounterLabel = (counter, total) => `(${counter}/${total})`;

	render() {
		const {
			regions,
			countryData,
			availableCountryData,
			selectedRegions,
			onSelect,
			title,
		} = this.props;

		return (
			<div className="selector-container">
				<h5>
					{title}
				</h5>
				<div className="region-selector">
					{regions.map((region) => {
						const selectedRegion = selectedRegions.find(e => e.id === region.id);
						const availableRegion = availableCountryData.has(region.id);
						const totalRegionCountries = (availableRegion) ? countryData.get(region.id).length : 0;
						const availableRegionCountries = (availableRegion) ? availableCountryData.get(region.id).length : 0;
						return (
							<label key={region.id} className={cn("input-checkbox", { "input-checkbox--is-selected": selectedRegion })}>
								<input
									type="checkbox"
									value={!!selectedRegion}
									checked={!!selectedRegion}
									onChange={() => onSelect(region)}
									disabled={!availableRegion}
								/>
								<span className="input-checkbox-selector" />
								<span className="input-checkbox-text">
									<span>{region.name}</span>
									<span>{this.getCounterLabel(availableRegionCountries, totalRegionCountries)}</span>
								</span>
							</label>
						);
					})}
				</div>
			</div>
		);
	}
}

export default RegionSelector;
