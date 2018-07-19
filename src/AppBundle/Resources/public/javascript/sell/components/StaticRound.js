import React from 'react';
import Match from './Match';
import {connect} from "react-redux";

class StaticRound extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            seasons : props.seasons,
            season : props.season,
            round : props.round
        };
    }

    toggle = (e) => {
        const { seasons, season, round, updateFromMultiple } = this.props;
        let selected = e.target.checked;
        let schedules = seasons[season].schedules;
        let activeRound = schedules[round];
        activeRound.selected = selected;

        updateFromMultiple("seasons", season, "schedules", schedules);

        e.stopPropagation();
        this.selectAll(selected);
    };

    toggleMatches = (e) => {
        const { seasons, season, round } = this.state;

        let schedules = seasons[season].schedules;
        let activeRound = schedules[round];
        activeRound.showMatches = !activeRound.showMatches;
        this.setState({seasons});
        e.stopPropagation();
    };

    selectAll = (selected) => {
        const { seasons, season, round, updateFromMultiple } = this.props;

        let schedules = seasons[season].schedules;
        let activeRound = schedules[round];
        activeRound.matches.forEach(match => { match.selected = selected });
        updateFromMultiple("seasons", season, "schedules", schedules);

    };

    getSelected = () => {
        const { seasons, season, round } = this.props;

        let schedule = seasons[season].schedules;
        let activeRound = schedule[round];
        return Array.from( activeRound.matches.values() ).filter(m =>(m.selected)).length
    };

    completeSeason = () => {
        const { seasons, season, round } = this.props;
        let schedule = seasons[season].schedules;
        return Object.values(schedule).filter(r=>{
            return Array.from(r.matches.values()).filter(function (m) {
                return m.selected;
            }).length> 0

        }).length===0;
    };

    render(){

        const { seasons, season, round } = this.state;

        let schedule = seasons[season].schedules;
        let activeRound = schedule[round];
        let complete = this.completeSeason();
        let selected = this.getSelected();

        if ( !complete && selected === 0) return null;

        return (
            <div className={"matchday"}>
                <div className="select-box-checkbox">
                    <div style={{width: '100%'}}>
                        {isNaN(round) && round}
                        {!isNaN(round) && "Matchday " + round}

                        { (complete || selected === activeRound.matches.size) && <span onClick={this.toggleMatches}>All ></span>}
                        { !complete && selected !== activeRound.matches.size && <span onClick={this.toggleMatches}>{selected} Selected ></span>}
                    </div>
                </div>

                {activeRound.showMatches && <div className={"match-group"}>
                    {activeRound.matches.size > 0 && Array.from ( activeRound.matches.values()).map((item, i) => {
                        return <div className={"match"} key={"match-" + i} >
                            { (item.selected || complete ) && <i className="fa fa-circle"/>}
                            {!item.selected && !complete && <i className="fa fa-circle-o"/>}
                            {item.competitors.map(( competitor, ci, list)=>{
                                return <span key={ci}>{competitor.name} {(list.length !== ci + 1) && " vs " }</span>
                            })}

                        </div>
                    })}
                </div>}
            </div>
        )
    }
}

export default StaticRound;