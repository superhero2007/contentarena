import React from 'react';
import Match from './Match';
import {connect} from "react-redux";

class Round extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
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
        const { seasons, season, round, updateFromMultiple } = this.props;

        let schedules = seasons[season].schedules;
        let activeRound = schedules[round];
        activeRound.showMatches = !activeRound.showMatches;
        updateFromMultiple("seasons", season, "schedules", schedules);

        e.stopPropagation();
    };

    selectAll = (selected) => {
        const { seasons, season, round, updateFromMultiple } = this.props;

        let schedules = seasons[season].schedules;
        let activeRound = schedules[round];
        activeRound.matches.forEach(match => { match.selected = selected });
        updateFromMultiple("seasons", season, "schedules", schedules);

    };

    onSelect = (id) => {
        const { seasons, season, round , updateFromMultiple} = this.props;

        let schedules = seasons[season].schedules;
        let activeRound = schedules[round];
        activeRound.matches.get(id).selected = !activeRound.matches.get(id).selected;

        if (activeRound.matches.get(id).selected) activeRound.selected = true;

        updateFromMultiple("seasons", season, "schedules", schedules);
    };

    getSelected = () => {
        const { seasons, season, round } = this.props;

        let schedule = seasons[season].schedules;
        let activeRound = schedule[round];
        return Array.from( activeRound.matches.values() ).filter(m =>(m.selected)).length
    };

    render(){

        const { seasons, season, round } = this.props;

        let schedule = seasons[season].schedules;
        let activeRound = schedule[round];

        return (
            <div className={"matchday"}>
                <div className="ca-checkbox select-box-checkbox">
                    <input type="checkbox"
                           checked={activeRound.selected}
                           onChange={this.toggle}
                           id={"round-" + round}/>
                    <label htmlFor={"round-" + round}/>

                    <div style={{width: '100%'}}>
                        {isNaN(round) && round}
                        {!isNaN(round) && "Matchday " + round}

                        {(this.getSelected() === 0)  && (this.getSelected()!== activeRound.matches.size) && <span onClick={this.toggleMatches}>Select ></span>}
                        {(this.getSelected() !== 0)  && (this.getSelected()=== activeRound.matches.size) && <span onClick={this.toggleMatches}>All ></span>}
                        {(this.getSelected() !== 0) && ( this.getSelected() !== activeRound.matches.size) && <span onClick={this.toggleMatches}>{this.getSelected()} Selected ></span>}
                    </div>
                </div>



                {activeRound.showMatches && <div className={"match-group"}>
                    {activeRound.matches.size > 0 && Array.from ( activeRound.matches.values()).map((item, i) => {
                        return <Match match={item}
                                      key={item.externalId}
                                      onSelect={this.onSelect}/>
                    })}
                </div>}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return state.content
};

const mapDispatchToProps = dispatch => {
    return {
        updateFromMultiple : (type, index, key, value) => dispatch({
            type: 'UPDATE_FROM_MULTIPLE',
            selectorType: type,
            index: index,
            key: key,
            value: value
        }),
        updateContentValue : (key, value) => dispatch({
            type: 'UPDATE_CONTENT_VALUE',
            key: key,
            value : value
        }),
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Round);