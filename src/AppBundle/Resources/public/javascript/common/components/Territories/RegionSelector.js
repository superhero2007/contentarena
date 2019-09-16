import React from "react";

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
		} = this.props;

		return (
			<div className="region-selector">
				{regions.map((region) => {
					const selectedRegion = selectedRegions.find(e => e.id === region.id);
					const availableRegion = availableCountryData.has(region.id);
					const totalRegionCountries = (availableRegion) ? countryData.get(region.id).length : 0;
					return (
						<label key={region.id} className="input-checkbox">
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
								<span>{this.getCounterLabel(3, totalRegionCountries)}</span>
							</span>
						</label>
					);
				})}
			</div>
		);
	}
}

export default RegionSelector;
