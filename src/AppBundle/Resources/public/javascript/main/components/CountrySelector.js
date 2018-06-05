import React from 'react';
import Select from 'react-select';

class CountrySelector extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentWillReceiveProps(nextProps) {}

    getOptions = () => {
        const {filter = []} = this.props;

        let countries = Object.values(ContentArena.Data.Countries).map((i,k)=>({value : i.name , label : i.name }));

        countries = countries.filter(country => filter.indexOf(country.value) === -1);

        return countries;
    };

    render(){
        const {value, onChange, className, multi = true} = this.props;
        return (
            <Select
                className={className }
                name="form-field-name"
                onChange={onChange}
                value={value}
                multi={multi}
                options={this.getOptions()}
            />
        )
    }
}

export default CountrySelector;