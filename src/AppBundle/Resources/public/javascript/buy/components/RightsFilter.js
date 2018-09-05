import React from 'react';
import { connect } from "react-redux";
import {
    addRight, clearFilter, removeRight, updateCountries, updateExclusive,
    updateIncludedCountries
} from "../actions/filterActions";
import CountrySelector from "../../main/components/CountrySelector";
import {PropTypes} from "prop-types";
import PopupCountrySelector from "../../main/components/PopupCountrySelector";
import {cancelIcon} from "../../main/components/Icons";

class RightsFilter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };

        this.worldwideCountries = 242;
    }

    componentWillReceiveProps(nextProps) {
        console.log("RightsFilter", nextProps)
    }

    selectTerritory = (countries) => {
        countries = countries[0] === null ? [] : countries;
        let includeAllCountries = (this.refs.countrySelector.state.selectedOption === "multiple");
        this.props.updateCountries(countries);
        this.props.updateIncludedCountries(includeAllCountries);
    };

    render() {
        const {rights,rightsPackage,countries, onFilter, exclusive, clearFilter, includeAllCountries} = this.props;
        let countriesValue  = (countries[0] && countries[0]) ? {label: countries[0], value: countries[0]} : '';

        return (
            <div>
                <div className="box">
                    <div className="title">
                        {this.context.t("Territories")}
                    </div>
                    <div style={{display: 'flex', alignItems: 'center'}}>

                        {countries.length <= 1 &&
                        <CountrySelector
                            multi={false}
                            className={"base-input-select"}
                            value={countriesValue}
                            onChange={(c)=>{
                                this.selectTerritory([c])
                            }}/>
                        }

                        {countries.length > 1 && countries.length !== this.worldwideCountries &&
                        <input type="text" className="ca-form-control" value={countries.length +" territories"} disabled/>
                        }

                        {countries.length === this.worldwideCountries &&
                        <input type="text" className="ca-form-control" value={"Worldwide"} readonly/>
                        }

                        {countries.length > 1 &&
                        <img className="territories-icon" src={cancelIcon}
                             onClick={()=>{
                                 this.selectTerritory([])
                             }}/>
                        }

                        <PopupCountrySelector ref="countrySelector"
                                              value={countries}
                                              includeAllCountries={includeAllCountries}
                                              onSelect={this.selectTerritory}
                        />

                    </div>
                </div>
                <div className="box">
                    <div id="rights-packages" className={"filter-rights"}>
                        <div className="title">
                            {this.context.t("Rights")}
                        </div>
                        {
                            rightsPackage && rightsPackage.map((right,i) => {
                                return (
                                    <div key={right.id} className="filter-right">
                                        <input
                                            className='ca-checkbox checkbox-item'
                                            type='checkbox'
                                            checked={rights.indexOf(right.id) !== -1}
                                            onChange={(e) => {
                                                if ( e.target.checked ) {
                                                    this.props.addRight(right.id)
                                                } else {
                                                    this.props.removeRight(right.id)
                                                }
                                            }}
                                            id={right.id}
                                        />
                                        <label htmlFor={right.id}>
                                            {right.name}
                                        </label>
                                    </div>
                                )
                            })
                        }
                        <div style={{background: '#999', height: 1, margin: '20px 0'}} />

                        <div className="filter-right">
                            <input
                                type="checkbox"
                                checked={exclusive}
                                className="ca-checkbox checkbox-item"
                                onChange={(e) => {
                                    this.props.updateExclusive(e.target.checked)
                                }}
                            />
                            {this.context.t("Contains exclusive rights")}
                        </div>
                    </div>

                </div>
                <div className="box">
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column'
                    }}>
                        <button className="ca-btn ca-btn-primary" style={{margin:5}} onClick={onFilter}>
                            {this.context.t("Apply")}
                        </button>
                        <button className="ca-btn ca-btn-link" style={{margin:5}} onClick={clearFilter}>
                            {this.context.t("Clear")}
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

RightsFilter.contextTypes = {
    t: PropTypes.func.isRequired
};


const mapStateToProps = state => {
    return state.filter
};

const mapDispatchToProps = dispatch => {
    return {
        addRight: id => dispatch(addRight(id)),
        removeRight: id => dispatch(removeRight(id)),
        updateCountries: countries => dispatch(updateCountries(countries)),
        updateExclusive: exclusive => dispatch(updateExclusive(exclusive)),
        updateIncludedCountries: includeAllCountries => dispatch(updateIncludedCountries(includeAllCountries)),
        clearFilter : () => dispatch(clearFilter())
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RightsFilter)