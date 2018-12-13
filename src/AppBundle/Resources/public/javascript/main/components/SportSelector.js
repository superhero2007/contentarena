import React from 'react';
import Select from 'react-select';
import {PropTypes} from 'prop-types';

class SportSelector extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            sports : []
        };
    }

    componentDidMount () {
        let _this = this;
        ContentArena.Api.getAllSports().done( (sports ) => {
            _this.setState({sports});
        });
    }

    getOptions = () => {
        return this.state.sports.map((i,k)=>({value : i.id , label : i.name }));
    };


    render(){
        const {onChange, className, multi = true, disabled = false } = this.props;
        let value = this.props.value;

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

SportSelector.contextTypes = {
    t: PropTypes.func.isRequired
};

export default SportSelector;