import React from 'react';

class Match extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            match : props.match,
            selected : props.selected || false
        };
    }
    componentDidMount() {
        this.props.onRef(this)
    }
    componentWillUnmount() {
        this.props.onRef(undefined)
    }

    toggle = () => {
        this.setState((prevState) => ({
            selected: !prevState.selected
        }));
    };

    update = (selected) => {
        this.setState({selected: selected});
    };

    render(){
        const competitorsLen = this.props.match.competitors.length;
        return (
            <div className={"match " + ( (this.state.selected) ? "selected" : "" )} onClick={this.toggle}>
                {this.props.match.competitors.map(( competitor, i)=>{
                    return <span key={i}>{competitor.name} {(competitorsLen !== i + 1) && " vs " }</span>
                })}
                {this.state.selected && <span className={"select"}>Unselect</span>}
                {!this.state.selected && <span className={"select"}>Select match</span>}
            </div>
        )
    }
}

export default Match;