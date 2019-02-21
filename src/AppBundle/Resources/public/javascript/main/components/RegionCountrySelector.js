import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";
import cn from "classnames";
import CountrySelector from "./CountrySelector";

class RegionCountrySelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: [],
      selection: props.value,
      territories: [],
      regions: [],
      activeTerritory: null,
      activeRegions: [],
      activeTerritories: [],
      worldwideSelected: false,
    };
  }

  componentDidMount() {
    const _this = this;
    ContentArena.Api.getCountries().done((countries) => {
      _this.setState({ countries });
    });

    if (ContentArena.Data.Territories.length === 0) {
      ContentArena.Api.getTerritories().done((territories) => {
        ContentArena.Data.Territories = territories;
        _this.setState({ territories });
      });
    } else {
      _this.setState({ territories: ContentArena.Data.Territories });
    }

    if (ContentArena.Data.Regions.length === 0) {
      ContentArena.Api.getRegions().done((regions) => {
        ContentArena.Data.Regions = regions;
        _this.setState({ regions });
      });
    } else {
      _this.setState({ regions: ContentArena.Data.Regions });
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ selection: nextProps.value });
  }

  selectTerritory(region) {
    const {
      filter = [],
      onChange,
      onSelectRegion,
      multiple,
    } = this.props;
    const { countries } = this.state;
    const { activeRegions } = this.state;
    const { activeTerritories } = this.state;
    let { worldwideSelected } = this.state;
    let index;
    let selection;

    if (multiple) {
      index = activeTerritories.indexOf(region.id);

      if (index === -1) {
        activeTerritories.push(region.id);
      } else {
        activeTerritories.splice(index, 1);
      }
      worldwideSelected = false;
      selection = countries.filter(c => (this.countryHasRegions(c, activeRegions) || activeTerritories.indexOf(c.territoryId) !== -1) && filter.indexOf(c.name) === -1);
    } else {
      selection = countries.filter(c => c.territoryId === region.id && filter.indexOf(c.name) === -1);
    }

    selection = selection.map((i, k) => ({ value: i.name, label: i.name }));

    this.setState({ selection, activeTerritories, worldwideSelected });
    if (onChange) onChange(selection);
    if (onSelectRegion) onSelectRegion(region, selection);
  }

    selectWorldwide = () => {
      const {
        onChange,
        multiple,
      } = this.props;
      const { countries } = this.state;
      let { activeRegions } = this.state;
      let { activeTerritories } = this.state;
      let { worldwideSelected } = this.state;

      const selection = countries.map((i, k) => ({ value: i.name, label: i.name }));

      if (multiple) {
        activeRegions = [];
        activeTerritories = [];
        worldwideSelected = true;
      }

      this.setState({
        selection, activeRegions, activeTerritories, worldwideSelected,
      });
      if (onChange) onChange(selection);
    };

    countryHasRegions = (country, regions) => {
      regions = regions.filter(r => country.regions.indexOf(r) !== -1);
      return regions.length > 0;
    };

    selectRegion = (region) => {
      const { countries } = this.state;
      const {
        filter = [],
        onChange,
        onSelectRegion,
        multiple,
      } = this.props;
      const { activeRegions } = this.state;
      const { activeTerritories } = this.state;
      let { worldwideSelected } = this.state;
      let index;
      let selection;

      if (multiple) {
        index = activeRegions.indexOf(region.id);

        if (index === -1) {
          activeRegions.push(region.id);
        } else {
          activeRegions.splice(index, 1);
        }
        worldwideSelected = false;
        selection = countries.filter(c => (this.countryHasRegions(c, activeRegions) || activeTerritories.indexOf(c.territoryId) !== -1) && filter.indexOf(c.name) === -1);
      } else {
        selection = countries.filter(c => c.regions.indexOf(region.id) !== -1 && filter.indexOf(c.name) === -1);
      }
      selection = selection.map((i, k) => ({ value: i.name, label: i.name }));
      this.setState({ selection, activeRegions, worldwideSelected });
      if (onChange) onChange(selection);
      if (onSelectRegion) onSelectRegion(region, selection);
    };

    selectRemainCountries = (countries) => {
      const { onChange } = this.props;
      this.setState({ selection: countries });
      if (onChange) onChange(countries);
    }

    handleChange = (selection) => {
      const {
        onChange,
        value,
      } = this.props;

      if (onChange) onChange(selection);

      this.setState({ selection });
    };

    render() {
      const {
        filter,
        disabled,
        worldwide,
        hideCountrySelector,
      } = this.props;

      const {
        territories, regions, activeTerritories, activeRegions, worldwideSelected,
      } = this.state;
      const {
        exclusiveSoldTerritories, placeholder, isInvalid, remainCountries,
      } = this.props;

      return (
        <div className="country-selector region-filter">
          { !disabled && (
          <div>
            <div className="regions">
              {remainCountries && remainCountries.length > 0 && (
              <button
                className="region remain"
                onClick={() => this.selectRemainCountries(remainCountries)}
              >
                {this.context.t("CL4_REMAIN_COUNTRIES")}
              </button>
              )}
              {territories.map((territory, i) => (
                <button
                  className={cn({
                    region: true,
                    "region-selected": activeTerritories.indexOf(territory.id) !== -1,
                  })}
                  key={`territory-${i}`}
                  onClick={() => {
                    this.selectTerritory(territory);
                  }}
                >
                  {territory.name}
                </button>
              ))}
              {worldwide && (
              <button
                className={cn({
                  region: true,
                  "region-selected": worldwideSelected,
                })}
                onClick={this.selectWorldwide}
              >
                            Worldwide
              </button>
              )}
            </div>
            <div className="regions">
              {regions.map((region, i) => (
                <button
                  className={cn({
                    region: true,
                    "region-selected": activeRegions.indexOf(region.id) !== -1,
                  })}
                  key={`region-${i}`}
                  onClick={() => {
                    this.selectRegion(region);
                  }}
                >
                  {region.name}
                </button>
              ))}
            </div>

          </div>
          )}
          {!hideCountrySelector && (
          <CountrySelector
            filter={filter}
            disabled={disabled}
            onChange={this.handleChange}
            value={this.state.selection}
            exclusiveSoldTerritories={exclusiveSoldTerritories}
            placeholder={placeholder}
            isInvalid={isInvalid}
          />
          )}
        </div>
      );
    }
}

RegionCountrySelector.contextTypes = {
  t: PropTypes.func.isRequired,
};


export default RegionCountrySelector;
