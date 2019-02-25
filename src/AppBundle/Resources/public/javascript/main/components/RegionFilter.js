import React from "react";
import cn from "classnames";

class RegionFilter extends React.Component {
  constructor(props) {
    super(props);

    let totalItems = 0;

    if (props.bundles) {
      props.bundles.forEach((b) => {
        totalItems += b.territories.length;
      });
    }


    this.state = {
      territories: [],
      regions: [],
      activeRegions: [],
      activeTerritories: [],
      territoryItems: {},
      regionItems: [],
      allSelected: true,
      totalItems,
    };
  }

  componentWillUnmount() {
    this.isCancelled = true;
  }

  componentDidMount() {
    const {
      bundles = [],
    } = this.props;

    if (ContentArena.Data.Territories.length === 0) {
      ContentArena.Api.getTerritories().done((territories) => {
        ContentArena.Data.Territories = territories;
        !this.isCancelled && this.setState({ territories });
        this.parseTerritoryItems(bundles);
      });
    } else {
      !this.isCancelled && this.setState({ territories: ContentArena.Data.Territories });
      this.parseTerritoryItems(bundles);
    }

    if (ContentArena.Data.Regions.length === 0) {
      ContentArena.Api.getRegions().done((regions) => {
        ContentArena.Data.Regions = regions;
        !this.isCancelled && this.setState({ regions });
        this.parseRegionItems(bundles);
      });
    } else {
      !this.isCancelled && this.setState({ regions: ContentArena.Data.Regions });
      this.parseRegionItems(bundles);
    }
  }

    parseTerritoryItems = (items) => {
      const territoryItems = {};

      items.forEach((b) => {
        const includedInTerritories = [];
        b.territories.forEach((t) => {
          if (territoryItems[t.territoryId] === undefined) {
            territoryItems[t.territoryId] = [];
          }
          territoryItems[t.territoryId].push(b.id);
          if (includedInTerritories.indexOf(t.territoryId) === -1) {
            includedInTerritories.push(t.territoryId);
          }
        });
      });

      this.setState({ territoryItems });
    };

    parseRegionItems = (items) => {
      const regionItems = [];

      items.forEach((b) => {
        const includedInRegions = [];
        b.territories.forEach((t) => {
          t.regions.forEach((region) => {
            if (regionItems[region.id] === undefined) {
              regionItems[region.id] = [];
            }
            regionItems[region.id].push(b.id);
            if (includedInRegions.indexOf(region.id) === -1) {
              includedInRegions.push(region.id);
            }
          });
        });
      });

      this.setState({ regionItems });
    };

    selectAll = () => {
      const {
        onChange,

      } = this.props;
      const activeRegions = [];
      const activeTerritories = [];
      const allSelected = true;

      this.setState({ activeRegions, activeTerritories, allSelected });
      if (onChange) onChange({ all: true, selected: [], name: "All" });
    };

    selectRegion = (region) => {
      const {
        onChange,
      } = this.props;

      const { activeRegions } = this.state;
      const { activeTerritories } = this.state;
      let allSelected = false;
      const index = activeRegions.indexOf(region.id);

      if (index === -1) {
        activeRegions.push(region.id);
      } else {
        activeRegions.splice(index, 1);
        if (activeTerritories.length === 0 && activeRegions.length === 0) allSelected = true;
      }
      this.setState({ activeRegions, allSelected });
      if (onChange) onChange(this.getSelectedItems(allSelected));
    };

    selectTerritory(region) {
      const {
        onChange,
      } = this.props;

      const { activeTerritories } = this.state;
      const { activeRegions } = this.state;
      let allSelected = false;
      const index = activeTerritories.indexOf(region.id);

      if (index === -1) {
        activeTerritories.push(region.id);
      } else {
        activeTerritories.splice(index, 1);
        if (activeTerritories.length === 0 && activeRegions.length === 0) allSelected = true;
      }

      this.setState({ activeTerritories, allSelected });
      if (onChange) onChange(this.getSelectedItems(allSelected));
    }

    getSelectedItems = (allSelected) => {
      const {
        activeTerritories,
        activeRegions,
        territoryItems,
        regionItems,
        territories,
        regions,
      } = this.state;

      let selected = []; let
        name = "";

      activeTerritories.forEach((t) => {
        selected = selected.concat(territoryItems[t].filter(item => selected.indexOf(item) < 0));
      });

      territories.forEach((t) => {
        if (activeTerritories.indexOf(t.id) !== -1) name += `${t.name}, `;
      });

      activeRegions.forEach((t) => {
        selected = selected.concat(regionItems[t].filter(item => selected.indexOf(item) < 0));
      });

      regions.forEach((r) => {
        if (activeRegions.indexOf(r.id) !== -1) name += `${r.name}, `;
      });

      return {
        all: allSelected,
        selected,
        name: (allSelected) ? "All" : name.substring(0, name.length - 2),
      };
    };

    render() {
      const {
        disabled,
      } = this.props;

      const {
        territories,
        regions,
        activeTerritories,
        activeRegions,
        allSelected,
        territoryItems,
        regionItems,
        totalItems,
      } = this.state;

      return (
        <div className="region-filter">
          { !disabled && (
          <div>
            <div className="regions">
              <button
                className={cn({
                  region: true,
                  "region-selected": allSelected,
                })}
                onClick={this.selectAll}
              >
                            All
                {" "}
                {totalItems}
              </button>
              {territories.map((territory, i) => (
                <button
                  className={cn({
                    region: true,
                    "region-selected": activeTerritories.indexOf(territory.id) !== -1,
                    "region-disabled": !territoryItems[territory.id],
                  })}
                  key={`territory-${i}`}
                  disabled={!territoryItems[territory.id]}
                  onClick={() => {
                    this.selectTerritory(territory);
                  }}
                >
                  {territory.name}
                  {" "}
                  {!territoryItems[territory.id] && "0"}
                  {territoryItems[territory.id] && territoryItems[territory.id].length}
                  {"/"}
                  {totalItems}
                </button>
              ))}
            </div>
            <div className="regions">
              {regions.map((region, i) => (
                <button
                  className={cn({
                    region: true,
                    "region-selected": activeRegions.indexOf(region.id) !== -1,
                    "region-disabled": !regionItems[region.id],
                  })}
                  key={`region-${i}`}
                  disabled={!regionItems[region.id]}
                  onClick={() => {
                    this.selectRegion(region);
                  }}
                >
                  {region.name}
                  {" "}
                  {!regionItems[region.id] && "0"}
                  {regionItems[region.id] && regionItems[region.id].length}
                  {"/"}
                  {totalItems}
                </button>
              ))}
            </div>
          </div>
          )}
        </div>
      );
    }
}

export default RegionFilter;
