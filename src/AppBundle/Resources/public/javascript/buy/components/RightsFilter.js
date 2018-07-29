import React from 'react';
import { connect } from "react-redux";
import {addRight, clearFilter, removeRight, updateCountries, updateExclusive} from "../actions/filterActions";
import CountrySelector from "../../main/components/CountrySelector";

class RightsFilter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentWillReceiveProps(nextProps) {
        console.log("RightsFilter", nextProps)
    }

    selectTerritory = (value) => {
        this.props.updateCountries(value);
    };

    render() {
        const {rights,rightsPackage,countries, onFilter, exclusive, clearFilter} = this.props;
        return (
            <div className="box">
                <div className="title">Rights</div>
                <div className="content">
                    <div style={{display: 'flex'}}>
                        <CountrySelector
                            className={"base-input-select"}
                            value={countries}
                            onChange={this.selectTerritory}/>
                    </div>

                    <div id="rights-packages" className={"filter-rights"} style={{marginTop: 20}}>
                        {
                            rightsPackage && rightsPackage.map(right => {
                                return <div key={right.id} className="filter-right">
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
                                    /> {right.name}
                                </div>
                            })
                        }

                    </div>
                    <hr />
                    <div style={{
                        display:'flex',
                        marginBottom: 20
                    }}>
                        <input
                            type="checkbox"
                            checked={exclusive}
                            className="ca-checkbox checkbox-item"
                            onChange={(e) => {
                                this.props.updateExclusive(e.target.checked)
                            }}
                        />
                        Contains exclusive rights
                    </div>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column'
                    }}>
                        <button className="standard-button" style={{margin:5}} onClick={onFilter}>Apply</button>
                        <button className="standard-button transparent" style={{margin:5}} onClick={clearFilter}>Clear</button>
                    </div>

                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return state.filter
};

const mapDispatchToProps = dispatch => {
    return {
        addRight: id => dispatch(addRight(id)),
        removeRight: id => dispatch(removeRight(id)),
        updateCountries: countries => dispatch(updateCountries(countries)),
        updateExclusive: exclusive => dispatch(updateExclusive(exclusive)),
        clearFilter : () => dispatch(clearFilter())
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RightsFilter)