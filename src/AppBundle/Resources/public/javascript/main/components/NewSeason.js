import React, { Component } from 'react';

class NewSeason extends React.Component{
    constructor(props){
        super(props);

        let startYear = 1950;
        let years = [];

        for (let i =0; i < 81;i++ ){ years.push(startYear+i)}

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

        return (<option/>)
    };

    setStartDate = (e) => {
        this.setState({ startDate : e.target.value});
    };

    render(){
        return (
            <div>
                <div className="base-input">
                    <label>Season</label>
                    <input
                        className="new-season"
                        type="text"
                        onBlur={this.props.onBlur}
                        defaultValue={this.props.value}
                        placeholder="Enter season name"/>
                    { this.props.showClose &&
                    <button className={"standard-button"} onClick={this.props.onRemove}>
                        <i className="fa fa-close"/>
                    </button>}
                </div>
                <div className="base-input">
                    <label>From</label>
                    <select onChange={this.setStartDate}>
                        <option/>
                        {this.state.years.map((year,i)=>(<option key={i} value={year}>{year}</option>))}
                    </select>
                </div>
                <div className="base-input">
                    <label>From</label>
                    <select disabled={!this.state.startDate}>
                        {this.getEndOptions()}
                        <option value={0}>Not applicable</option>
                    </select>
                </div>
            </div>
        )
    }
}

export default NewSeason;
