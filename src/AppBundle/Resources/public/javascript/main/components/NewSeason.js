import React, { Component } from 'react';

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
        let value;

        if ( this.state.startDate ){

            value = Number(this.state.startDate)+1;

            return (
                <option value={value}>{value}</option>
            )
        }

        return (<option>Year</option>)
    };

    setStartDate = (e) => {
        this.setState({ startDate : e.target.value});
    };

    render(){
        return (
            <div>
                {/*<div className="base-input">
                    <label>Season</label>
                    <input
                        className="new-season"
                        type="text"
                        onBlur={this.props.onBlur}
                        defaultValue={this.props.value}
                        placeholder="Enter season name"/>

                </div>*/}
                <div className="base-input">
                    <label>Season year</label>
                    <label className={"season-selector-label"}>From</label>
                    <select onChange={this.setStartDate}>
                        <option/>
                        <option disabled>Year</option>
                        {this.state.years.map((year,i)=>(<option key={i} value={year}>{year}</option>))}
                    </select>
                    <label className={"season-selector-label"}>/To</label>
                    <select disabled={!this.state.startDate}>
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

export default NewSeason;
