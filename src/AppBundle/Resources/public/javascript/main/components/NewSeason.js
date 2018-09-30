import React, { Component } from 'react';
import {connect} from "react-redux";
import {PropTypes} from "prop-types";
import DatePicker from 'components/DatePicker';
import moment from "moment";
import { DATE_FORMAT } from "../../common/constants";

class NewSeason extends React.Component{
    constructor(props){
        super(props);

        let startYear = 2030;
        let years = [];

        for (let i =0; i < 81;i++ ){ years.push(startYear-i)}

        this.state = {
            years : years,
            startDate : moment(),
            endDate : moment(),
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

    setDurationStart = (e) => {
        const {index} = this.props;
        this.props.updateFromMultiple(index, 'startDate', e.format(DATE_FORMAT));
    };

    setDurationEnd = (e) => {
        const {index} = this.props;
        this.props.updateFromMultiple(index, 'endDate', e.format(DATE_FORMAT));
    };

    render(){
        const {index, seasons} = this.props;
        const { startDate, endDate } = seasons[index];

        return (
            <div>
                <div className="base-input">
                    <label>Season</label>
                    <label className={"season-selector-label"}>From</label>
                    <select
                        value={seasons[index].from}
                        onChange={(e) => { this.setDate('from', e.target.value) }}>
                        <option/>
                        <option disabled>
                            {this.context.t("Year")}
                        </option>
                        {this.state.years.map((year,i)=>(<option key={i} value={year}>{year}</option>))}
                    </select>
                    <label className={"season-selector-label"}>
                        {this.context.t("To")}
                    </label>
                    <select
                        value={seasons[index].to}
                        onChange={(e) => { this.setDate('to', e.target.value) }}
                        disabled={!seasons[index].from}>
                        {this.getEndOptions()}
                        <option value={0}>
                            {this.context.t("Not applicable")}
                        </option>
                    </select>
                    { this.props.showClose &&
                    <button className={"standard-button"} onClick={this.props.onRemove}>
                        <i className="fa fa-close"/>
                    </button>}
                </div>
                <div className="base-input duration-date-pickers">
                    <label>Duration</label>
                    <label className={"season-selector-label"}>From</label>
                    <DatePicker
                        showYearDropdown
                        className={"date-picker"}
                        selected={startDate ? moment(startDate) : undefined}
                        onChange={this.setDurationStart}
                        dateFormat={"DD/MM/YYYY"}
                        placeholderText={DATE_FORMAT}
                    />
                    <label className={"season-selector-label"}>
                        {this.context.t("To")}
                    </label>
                    <DatePicker
                        showYearDropdown
                        className={"date-picker"}
                        selected={endDate ? moment(endDate) : undefined}
                        onChange={this.setDurationEnd}
                        placeholderText={DATE_FORMAT}
                        dateFormat={"DD/MM/YYYY"}
                    />
                </div>
            </div>
        )
    }
}

NewSeason.contextTypes = {
    t: PropTypes.func.isRequired
};

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
