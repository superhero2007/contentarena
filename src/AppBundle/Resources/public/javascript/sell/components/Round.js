import React from 'react';
import Match from './Match';

class Round extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            round : props.round,
            schedule : props.schedule,
            selected : false,
            showMatches : false,
            matches : new Map(props.schedule.map((i) => [i.externalId, i]))
        };

    }

    toggle = (e) => {

        let selected = e.target.checked;
        this.setState({selected});
        e.stopPropagation();

        this.selectAll(selected);
    };

    toggleMatches = (e) => {
        this.setState((prevState) => ({
            showMatches: !prevState.showMatches
        }));

        e.stopPropagation();
    };

    selectAll = (selected) => {

        let matches = this.state.matches;
        matches.forEach(match => { match.selected = selected });
        this.setState({matches});

        if (!selected) this.setState({showMatches: false});
    };

    onSelect = (id) => {

        let matches = this.state.matches;
        matches.get(id).selected = !matches.get(id).selected;
        this.setState({matches});
    };

    getSelected = () => {

        return Array.from( this.state.matches.values() ).filter(m =>(m.selected)).length
    };

    render(){
        return (
            <div className={"matchday"}>
                <div className="select-box-checkbox">
                    <input type="checkbox"
                           onChange={this.toggle}
                           id={"round-" + this.props.round}/>
                    <label htmlFor={"round-" + this.props.round}/>

                    <div style={{width: '100%'}}>
                        {isNaN(this.state.round) && this.state.round}
                        {!isNaN(this.state.round) && "Matchday " + this.state.round}

                        { (this.getSelected() === 0)  || (this.getSelected()=== this.state.schedule.length) && <span onClick={this.toggleMatches}>Select ></span>}
                        {(this.getSelected() !== 0) && ( this.getSelected() !== this.state.schedule.length) && <span onClick={this.toggleMatches}>{this.getSelected()} Selected ></span>}
                    </div>
                </div>



                {this.state.showMatches && <div className={"match-group"}>
                    {this.state.matches.size > 0 && Array.from ( this.state.matches.values()).map((item, i) => {
                        return <Match match={item}
                                      key={item.externalId}
                                      onSelect={this.onSelect}/>
                    })}
                </div>}
            </div>
        )
    }
}

export default Round;
