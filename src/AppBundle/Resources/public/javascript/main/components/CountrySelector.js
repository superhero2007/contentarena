import React from 'react';
import Select from 'react-select';

class CountrySelector extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            countries : []
        };
    }

    componentDidMount () {
        let _this = this;
        if ( ContentArena.Data.Countries.length === 0) {
            ContentArena.Api.getCountries().done( (countries ) => {
                ContentArena.Data.Countries = countries;
                _this.setState({countries});
            });
        } else {
            _this.setState({countries: ContentArena.Data.Countries});
        }
    }

    getOptions = () => {
        const {filter = [], available} = this.props;

        let countries = Object.values(ContentArena.Data.Countries).map((i,k)=>({value : i.name , label : i.name }));

        if (available && available.length > 0 ) countries = available.map((i,k)=>({value : i , label : i }));

        countries = countries.filter(country => filter.indexOf(country.value) === -1);

        return countries;
    };

    render(){
        const {value, onChange, className, multi = true, disabled = false} = this.props;
        return (
            <Select
                className={className }
                name="form-field-name"
                onChange={onChange}
                placeholder={disabled ? 'Disabled' : 'Select...'}
                disabled={disabled}
                value={multi && value && value.length > 200 ? [] : value}
                multi={multi}
                options={this.getOptions()}
            />
        )
    }
}

export default CountrySelector;