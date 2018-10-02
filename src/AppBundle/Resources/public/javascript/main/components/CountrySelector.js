import React from 'react';
import Select from 'react-select';
import {PropTypes} from 'prop-types';

class CountrySelector extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            countries : []
        };
    }

    componentDidMount () {
        let _this = this;
        ContentArena.Api.getCountries().done( (countries ) => {
            _this.setState({countries});
        });
    }

    getOptions = () => {
        const {filter = [], available, hiddenTerritories} = this.props;

        let countries = Object.values(ContentArena.Data.Countries).map((i,k)=>({value : i.name , label : i.name }));

        if (available && available.length > 0 ) countries = available.map((i,k)=>({value : i , label : i }));

        countries = countries.filter(country => filter.indexOf(country.value) === -1);

        countries = hiddenTerritories && hiddenTerritories.length > 0 ? this.getAvailableTerritories(countries) : countries;

        return countries;
    };

    getAvailableTerritories = (territories) => {
        const {hiddenTerritories} = this.props;

        if (hiddenTerritories && hiddenTerritories.length > 0) {
            return territories.filter(t => !hiddenTerritories.some(ht => ht.label === t.label))
        } else {
            return territories;
        }
    }

    render(){
        const {onChange, className, multi = true, disabled = false, hiddenTerritories} = this.props;
        let value = this.props.value;

        if (hiddenTerritories) {
            const {countries} = this.state;

            if (hiddenTerritories.length > 0) {

                if (value && value.length > 0) {
                    value = this.getAvailableTerritories(value)

                    if (value.length === 0) {
                        return <div style={{padding: '15px 0'}}>{this.context.t("All territories are sold and listing is exclusive")}</div>
                    }
                }
            }

            if (countries && hiddenTerritories.length === countries.length) {
                return <div style={{padding: '15px 0'}}>{this.context.t("Worldwide includes sold territories and listing is exclusive")}</div>
            }
        }

        return (

            <Select
                className={className }
                name="form-field-name"
                onChange={onChange}
                placeholder={disabled ? 'Disabled' : 'Select...'}
                disabled={disabled}
                value={value}
                multi={multi}
                options={this.getOptions()}
            />
        )
    }
}

CountrySelector.contextTypes = {
    t: PropTypes.func.isRequired
};

export default CountrySelector;