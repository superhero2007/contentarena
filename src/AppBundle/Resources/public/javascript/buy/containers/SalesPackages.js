import React from 'react';
import { connect } from "react-redux";
import { test } from "../actions";
import SalesPackage from "../components/SalesPackage"

class SalesPackages extends React.Component {

    constructor(props) {
        super(props);

        let availableTerritories = new Set(),
            availableCountries = new Set();

        props.salesPackages.forEach((salesPackage)=>{
            if ( !salesPackage.sellAsPackage ){

                availableCountries = ( salesPackage.worldwide ) ? new Set(props.countries) : new Set(salesPackage.selectedCountries);
                availableCountries.forEach((c)=>{
                    c.currency = salesPackage.currency.code;
                    c.fee = salesPackage.amount;
                    c.salesMethod = salesPackage.salesMethod.name
                });


            }
        });

        availableCountries.forEach((c)=>{ availableTerritories.add(c.territoryId)});

        this.state = {
            availableTerritories : availableTerritories,
            availableCountries : availableCountries,
            selectedTerritory : 0,
            limit : 10,
            showAll : true
        };
    }

    componentDidMount () {
    }

    componentWillReceiveProps(nextProps) {
    }

    showAll = () => {
      this.setState({limit: this.state.availableCountries.size, showAll: false});
    };

    getFilteredCountries = () => {
        let territory = this.state.selectedTerritory;
        return [...this.state.availableCountries].filter((country) => ( territory === 0 || territory === country.territoryId ));
    };

    render() {
        let filteredCountries = this.getFilteredCountries().slice(0, this.state.limit);
        return (
            <div className="sales-packages">

                <div className="territories">
                    <div className={(this.state.selectedTerritory === 0) ? "territory selected" : "territory" }
                         onClick={() =>{this.setState({selectedTerritory: 0})}}>
                        All
                    </div>
                    {this.props.territories &&
                        this.props.territories.map((territory) =>(
                            <div
                                className={"territory " + (this.state.selectedTerritory === territory.id ? "selected " : "" ) + (!this.state.availableTerritories.has(territory.id) ? "disabled" : "" ) }
                                onClick={() =>{this.setState({selectedTerritory: territory.id})}}>
                                {territory.name}
                            </div>
                        ))
                    }

                </div>

                <div className="countries">

                    <div className="country-tr">
                        <div className="country-th">Territory</div>
                        <div className="country-th">Sales method</div>
                        <div className="country-th">Fee</div>
                        <div className="country-th">Currency</div>
                    </div>

                    {this.props.countries &&
                    filteredCountries.map((country) => {
                        return <div className="country-tr">
                            <div className="country-td">{country.name}</div>
                            <div className="country-td">{country.salesMethod}</div>
                            <div className="country-td">{country.fee}</div>
                            <div className="country-td">{country.currency}</div>
                        </div>
                    })
                    }
                </div>
                {this.state.showAll && <div onClick={this.showAll}>Show all</div>}

                {this.props.salesPackages &&
                    this.props.salesPackages.map((salesPackage)=>(<SalesPackage key={salesPackage.id} salesPackage={salesPackage}/>))
                }

            </div>
        );
    }
}

const mapStateToProps = state => {
    return state
};

const mapDispatchToProps = dispatch => {
    return {
        onClick: id => dispatch(test(id))
    }
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SalesPackages)