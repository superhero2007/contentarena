import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import cn from "classnames";
import cloneDeep from "lodash/cloneDeep";
import Translate from "@components/Translator/Translate";
import { setRegions } from "../actions/propertyFiltersActions";

class CmsTerritoriesFilter extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			countries: props.countries || [],
			territoryItems: {},
			regionItems: {},
			activeTerritory: null,
			activeRegions: [],
			selected: [],
			activeTerritories: [],
			viewAllTerritories: false,
			regionSelectors: [],
		};
	}

	componentDidMount() {
		const { propertyFilters: { availableTerritories } } = this.props;
		this.parseRegionSelectors(availableTerritories);
	}

	componentWillReceiveProps(nextProps) {
		const { propertyFilters: { availableTerritories, rights } } = nextProps;
		if (this.props.propertyFilters.rights.length !== rights.length) this.parseRegionSelectors(availableTerritories);
	}

	parseRegionSelectors = (availableTerritories) => {
		const {
			territories,
			regions,
		} = this.props;

		const selectAll = this.state.regionSelectors.length === 0;
		let regionSelectors = [...territories.map((t) => { t.type = "territory"; return t; }), ...regions.map((r) => { r.type = "region"; return r; })];

		regionSelectors = regionSelectors.map((region) => {
			region.countries = 0;
			Array.from(availableTerritories.values()).forEach((country) => {
				if (region.type === "region" && country.regions.map(r => r.id).indexOf(region.id) !== -1) {
					region.countries++;
				}
				if (region.type === "territory" && country.territoryId === region.id) {
					region.countries++;
				}
			});

			return region;
		});

		if (selectAll) this.props.setRegions(regionSelectors);
		this.setState({ regionSelectors });
	};

	selectRegion = (region, type) => {
		const regions = cloneDeep(this.props.propertyFilters.regions);

		const index = this.getRegionIndex(region, type);

		if (index === -1) {
			regions.push(region);
		} else {
			regions.splice(index, 1);
		}

		this.props.setRegions(regions);
	};

	getRegionIndex = (region, type) => this.props.propertyFilters.regions.findIndex(r => r.id === region.id && r.type === type);

	selectAllTerritories = () => {
		const {
			propertyFilters,
		} = this.props;
		const regionSelectors = cloneDeep(this.state.regionSelectors);

		if (propertyFilters.availableTerritories.size === propertyFilters.selectedTerritories.size) {
			this.props.setRegions([]);
		} else {
			this.props.setRegions(regionSelectors);
		}
	};

	getCounterLabel = (name, counter, total) => `${name} (${counter}/${total})`;

	render() {
		const {
			propertyFilters,
		} = this.props;

		const {
			regionSelectors,
		} = this.state;

		return (
			<div className="country-selector region-filter no-margin no-border">

				<div>
					<div className="region-filter-title">
						{ <Translate i18nKey="CMS_TERRITORIES_SELECTOR_TITLE" />}
					</div>
					<div className="regions">
						<button
							className={cn({
								region: true,
								"region-selected": propertyFilters.availableTerritories.size === propertyFilters.selectedTerritories.size,
							})}
							key="territory-0"
							onClick={() => {
								this.selectAllTerritories();
							}}
						>
							{`All ${propertyFilters.availableTerritories.size}`}
						</button>
						{regionSelectors.map((region, i) => {
							if (region.type !== "territory") return undefined;
							return (
								<button
									className={cn({
										region: true,
										"region-selected": region.countries !== 0 && propertyFilters.regions.filter(r => r.type === "territory" && r.id === region.id).length > 0,
									})}
									key={`territory-${i}`}
									disabled={region.countries === 0}
									onClick={() => {
										this.selectRegion(region, "territory");
									}}
								>
									{this.getCounterLabel(region.name, region.countries, region.total)}
								</button>
							);
						})}
					</div>
					<div className="regions">
						{regionSelectors.map((region, i) => {
							if (region.type !== "region") return undefined;
							return (
								<button
									className={cn({
										region: true,
										"region-selected": region.countries !== 0 && propertyFilters.regions.filter(r => r.type === "region" && r.id === region.id).length > 0,
									})}
									disabled={region.countries === 0}
									key={`region-${i}`}
									onClick={() => {
										this.selectRegion(region, "region");
									}}
								>
									{
										this.getCounterLabel(region.name, region.countries, region.total)
									}
								</button>
							);
						})}
					</div>
				</div>
			</div>
		);
	}
}

CmsTerritoriesFilter.contextTypes = {
	t: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	territories: state.property.territories,
	regions: state.property.regions,
	propertyFilters: state.propertyFilters,
	validation: state.validation,
});

const mapDispatchToProps = dispatch => ({
	setRegions: regions => dispatch(setRegions(regions)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(CmsTerritoriesFilter);
