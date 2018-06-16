import React, { Component } from 'react';
import {stepChangeReset} from "../../sell/actions/contentActions";
import {connect} from "react-redux";

class NewSeason extends React.Component{
    constructor(props){
        super(props);

        let startYear = 2030;
        let years = [];

        for (let i =0; i < 81;i++ ){ years.push(startYear-i)}

        this.state = {
            startDate : null,
            endDate : null,
            years : years
        }
    }

    getEndOptions = () => {
        let values = [];
        const {index, seasons} = this.props;
        if ( seasons[index].from ){
            values.push(Number(seasons[index].from));
            values.push(Number(seasons[index].from)+1);

            return values.map(value => {
                return<option selected={Number(seasons[index].from) === value} value={value}>{value}</option>
            });
        }

        return (<option>Year</option>)
    };

    setDate = (key, value) => {
        const {index} = this.props;
        this.props.updateFromMultiple(index, key, value)
    };

    render(){
        const {index, seasons} = this.props;
        return (
            <div>
                <div className="base-input">
                    <label>Season year</label>
                    <label className={"season-selector-label"}>From</label>
                    <select
                        value={seasons[index].from}
                        onChange={(e) => { this.setDate('from', e.target.value) }}>
                        <option/>
                        <option disabled>Year</option>
                        {this.state.years.map((year,i)=>(<option key={i} value={year}>{year}</option>))}
                    </select>
                    <label className={"season-selector-label"}>/To</label>
                    <select
                        value={seasons[index].to}
                        onChange={(e) => { this.setDate('to', e.target.value) }}
                        disabled={!seasons[index].from}>
                        {this.getEndOptions()}
                        <option value={0}>Not applicable</option>
                    </select>
                    { this.props.showClose &&
                    <button className={"standard-button"} onClick={this.props.onRemove}>
                        <i className="fa fa-close"/>
                    </button>}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return state.content
};

const mapDispatchToProps = dispatch => {
    return {
        updateFromMultiple : (index, key, value) => dispatch({
            type: 'UPDATE_FROM_MULTIPLE',
            selectorType: 'seasons',
            index: index,
            key: key,
            value: value
        }),

    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewSeason)
