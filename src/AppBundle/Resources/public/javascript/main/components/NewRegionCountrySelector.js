import React from 'react';
import Select from 'react-select';
import CountrySelector from "./CountrySelector";
import cn from "classnames";

class NewRegionCountrySelector extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            countries : [],
            selection: props.value,
            territories : [],
            regions: [],
            territoryItems : {},
            regionItems : {},
            activeTerritory : null,
            activeRegions : [],
            selected: [],
            activeTerritories : [],
            worldwideSelected : false
        };
    }

    componentDidMount () {
        let _this = this;
        ContentArena.Api.getCountries().done( (countries ) => {
            _this.setState({countries});
            _this.parseTerritoryCountries(countries);
        });

        if ( ContentArena.Data.Territories.length === 0) {
            ContentArena.Api.getTerritories().done( (territories ) => {
                ContentArena.Data.Territories = territories;
                _this.setState({territories});
            });
        } else {
            _this.setState({territories: ContentArena.Data.Territories});
        }

        if ( ContentArena.Data.Regions.length === 0) {
            ContentArena.Api.getRegions().done( (regions ) => {
                ContentArena.Data.Regions = regions;
                _this.setState({regions});
            });
        } else {
            _this.setState({regions: ContentArena.Data.Regions});
        }
    }

    componentWillReceiveProps (nextProps){
        this.setState({ selection: nextProps.value });
    }

    selectTerritory(region) {
        const {
            filter = [],
            onChange,
            onSelectRegion,
            multiple
        } = this.props;
        const {countries, territoryItems} = this.state;
        let activeRegions = this.state.activeRegions,
            activeTerritories = this.state.activeTerritories,
            countriesPerTerritory = this.getTerritoryCountries(this.state.selection, region.id),
            worldwideSelected = this.state.worldwideSelected,
            index,
            selection;

        if ( multiple ){
            index = activeTerritories.indexOf(region.id);

            if (  index === -1 && countriesPerTerritory < territoryItems[region.id].length ){
                activeTerritories.push(region.id);
            } else if (  index !== -1 && countriesPerTerritory === territoryItems[region.id].length ){
                activeTerritories.splice(index, 1);
            }

            worldwideSelected = false;
            selection = countries.filter(c=> ( this.countryHasRegions( c,activeRegions) || activeTerritories.indexOf(c.territoryId) !== -1 ) && filter.indexOf(c.name) === -1);
        } else {
            selection = countries.filter(c=>c.territoryId === region.id && filter.indexOf(c.name) === -1);
        }

        selection = selection.map(item=>{
            item.value = item.name;
            item.label = item.name;
            return item;
        });

        this.setState({ selection, activeTerritories, worldwideSelected });
        if (onChange) onChange(selection);
        if (onSelectRegion) onSelectRegion(region, selection);
    }

    selectWorldwide = () => {
        const {
            onChange,
            multiple
        } = this.props;
        const {countries} = this.state;
        let activeRegions = this.state.activeRegions,
            activeTerritories = this.state.activeTerritories,
            worldwideSelected = this.state.worldwideSelected;

        let selection = countries.map(item=>{
            item.value = item.name;
            item.label = item.name;
            return item;
        });

        if ( multiple ){
            activeRegions = [];
            activeTerritories = [];
            worldwideSelected = true
        }

        this.setState({ selection, activeRegions, activeTerritories, worldwideSelected });
        if (onChange) onChange(selection);
    };

    countryHasRegions = (country, regions) => {
        regions = regions.filter(r=> country.regions.indexOf(r) !== -1);
        return regions.length > 0;
    };

    parseTerritoryCountries = (countries) => {

        let territoryItems = {};
        let regionItems = {};

        countries.forEach(country => {
            if (territoryItems[country.territoryId] === undefined){
                territoryItems[country.territoryId] = [];
            }
            territoryItems[country.territoryId].push(country.id);

            country.regions.forEach( region => {
                if (regionItems[region] === undefined){
                    regionItems[region] = [];
                }
                if (regionItems[region].indexOf(country.id) === -1){
                    regionItems[region].push(country.id);
                }
            });

        });

        this.setState({territoryItems, regionItems});
    };

    getTerritoryCountries = (countries, territoryId) => {

        const {
            territoryItems
        } = this.state;

        let territory = territoryItems[territoryId];

        if (!territory) return 0;

        return countries.filter(country => {
            return territory.indexOf(country.id) !== -1;
        }).length;
    };

    getRegionCountries = (countries, regionId) => {

        const {
            regionItems
        } = this.state;

        let region = regionItems[regionId];

        if (!region) return 0;

        return countries.filter(country => {
            return region.indexOf(country.id) !== -1;
        }).length;
    };


    selectRegion = (region) => {
        const {countries, regionItems} = this.state;
        const {
            filter = [],
            onChange,
            onSelectRegion,
            multiple
        } = this.props;
        let activeRegions = this.state.activeRegions,
            activeTerritories = this.state.activeTerritories,
            worldwideSelected = this.state.worldwideSelected,
            countriesPerRegion = this.getRegionCountries(this.state.selection, region.id),
            index,
            selection;

        if ( multiple ){
            index = activeRegions.indexOf(region.id);

            if (  index === -1 && countriesPerRegion < regionItems[region.id].length ){
                activeRegions.push(region.id);
            } else if (  index !== -1 && countriesPerRegion === regionItems[region.id].length ){
                activeRegions.splice(index, 1);
            }

            if (  index === -1 ){
                activeRegions.push(region.id);
            } else {
                activeRegions.splice(index, 1);
            }
            worldwideSelected = false;
            selection = countries.filter( c=> ( this.countryHasRegions( c,activeRegions) || activeTerritories.indexOf(c.territoryId) !== -1 ) && filter.indexOf(c.name) === -1);
        } else {
            selection = countries.filter(c=>c.regions.indexOf(region.id) !== -1 && filter.indexOf(c.name) === -1);
        }
        selection = selection.map(item=>{
            item.value = item.name;
            item.label = item.name;
            return item;
        });

        this.setState({ selection, activeRegions, worldwideSelected });
        if (onChange) onChange(selection);
        if (onSelectRegion) onSelectRegion(region, selection)
    };

    handleChange = (selection) => {

        const {
            onChange,
        } = this.props;

        if (onChange) onChange(selection);

        this.setState({ selection });
    };

    render(){
        const {
            filter,
            disabled,
            worldwide,
            hideCountrySelector,
            exclusiveSoldTerritories,
            placeholder,
            isInvalid
        } = this.props;

        const {
            territories,
            regions,
            worldwideSelected,
            territoryItems,
            regionItems,
            selection
        } = this.state;

        return (
            <div className="country-selector region-filter">
                { !disabled && <div>
                    <div className="regions">
                        {territories.map((territory,i)=>{
                            return <button className={cn({
                                               "region" : true,
                                                'region-selected': this.getTerritoryCountries(selection,territory.id) > 0
                                            })}
                                           key={"territory-" + i}
                                           onClick={()=>{
                                               this.selectTerritory(territory)
                                           }}>
                                {territory.name}{" ("}
                                {this.getTerritoryCountries(selection,territory.id)}
                                {"/"}
                                {territoryItems[territory.id] && territoryItems[territory.id].length}
                                {")"}
                            </button>
                        })}
                        {worldwide && <button className={cn({
                                                    "region" : true,
                                                    'region-selected': worldwideSelected
                                                })}
                                              onClick={this.selectWorldwide}>
                            Worldwide
                        </button>}
                    </div>
                    <div className="regions">
                        {regions.map((region,i)=>{
                            return <button className={cn({
                                                "region" : true,
                                                'region-selected': this.getRegionCountries(selection, region.id) > 0
                                            })}
                                           key={"region-" + i}
                                           onClick={()=>{
                                               this.selectRegion(region)
                                           }}>
                                {region.name}{" ("}
                                {this.getRegionCountries(selection,region.id)}
                                {"/"}
                                {regionItems[region.id] && regionItems[region.id].length}
                                {")"}
                            </button>
                        })}
                    </div>

                </div>}
                {!hideCountrySelector && <CountrySelector
                    filter={filter}
                    disabled={disabled}
                    onChange={this.handleChange}
                    value={selection}
                    exclusiveSoldTerritories={exclusiveSoldTerritories}
                    placeholder={placeholder}
                    isInvalid={isInvalid}
                />}
            </div>
        )
    }
}

export default NewRegionCountrySelector;