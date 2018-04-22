import React from 'react';
import Match from './Match';

class Round extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            round : props.round,
            schedule : props.schedule,
            selected : false,
            matches : false
        };

        this.child = [];
    }

    toggle = (e) => {
        e.stopPropagation();
        this.setState((prevState) => ({
            selected: !prevState.selected
        }));

        this.child.forEach( (item) => item.update( !this.state.selected) );
    };

    toggleMatches = () => {
        this.setState((prevState) => ({
            matches: !prevState.matches
        }));
    };

    render(){
        return (
            <div>
                <div className={"matchday " + ( (this.state.selected) ? "selected" : "" )} onClick={this.toggleMatches}>
                    Matchday {this.state.round}
                    {!this.state.selected && <span onClick={this.toggle}>Select matchday</span>}
                    {this.state.selected && <span onClick={this.toggle}>Unselect</span>}
                </div>
                {this.state.matches && <div>
                    {this.state.schedule.length > 0 && this.state.schedule.map((item, i) => {
                        return <Match match={item} key={i} selected={this.state.selected} onRef={ref => {
                            if ( ref ) {
                                this.child.push(ref)
                            } else {
                                this.child = [];
                            }
                        }}/>
                    })}
                </div>}
            </div>
        )
    }
}

export default Round;
