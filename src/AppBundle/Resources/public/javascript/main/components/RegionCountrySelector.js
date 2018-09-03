import React from 'react';
import Select from 'react-select';
import CountrySelector from "./CountrySelector";

class RegionCountrySelector extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            countries : [],
            selection: props.value,
            territories : [],
            regions: [],
            activeTerritory : null
        };
    }

    componentDidMount () {
        let _this = this;
        ContentArena.Api.getCountries().done( (countries ) => {
            _this.setState({countries});
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

    selectTerritory(id) {
        const {
            filter = [],
            onChange
        } = this.props;
        const {countries} = this.state;
        let selection = countries.filter(c=>c.territoryId === id && filter.indexOf(c.name) === -1).map((i,k)=>({value : i.name , label : i.name }));
        this.setState({ selection });
        if (onChange) onChange(selection);
    }

    selectWorldwide = () => {
        const {
            onChange
        } = this.props;
        const {countries} = this.state;
        let selection = countries.map((i,k)=>({value : i.name , label : i.name }));
        this.setState({ selection });
        if (onChange) onChange(selection);
    };

    selectRegion = (id) => {
        const {countries} = this.state;
        const {
            filter = [],
            onChange,
        } = this.props;
        let selection = countries.filter(c=>c.regions.indexOf(id) !== -1 && filter.indexOf(c.name) === -1).map((i,k)=>({value : i.name , label : i.name }));
        this.setState({ selection });
        if (onChange) onChange(selection);
    }

    handleChange = (selection) => {

        const {
            onChange,
            value,
        } = this.props;

        if (onChange) onChange(selection);

        this.setState({ selection });
    };

    render(){
        const {
            filter,
            disabled,
            worldwide
        } = this.props;

        const {territories, regions} = this.state;

        return (
            <div className="country-selector">
                { !disabled && <div>
                    <div className="regions">
                        {territories.map((territory,i)=>{
                            return <button className={"region"}
                                           key={"territory-" + i}
                                           onClick={()=>{
                                               this.selectTerritory(territory.id)
                                           }}>
                                {territory.name}
                            </button>
                        })}
                        {worldwide && <button className={"region"} onClick={this.selectWorldwide}>
                            Worldwide
                        </button>}
                    </div>
                    <div className="regions">
                        {regions.map((region,i)=>{
                            return <button className={"region"}
                                           key={"region-" + i}
                                           onClick={()=>{
                                               this.selectRegion(region.id)
                                           }}>
                                {region.name}
                            </button>
                        })}
                    </div>

                </div>}
                <CountrySelector
                    filter={filter}
                    disabled={disabled}
                    onChange={this.handleChange}
                    value={this.state.selection}
                />
            </div>
        )
    }
}

export default RegionCountrySelector;