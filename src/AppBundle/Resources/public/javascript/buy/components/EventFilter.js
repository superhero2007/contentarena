import React from 'react';
import { connect } from "react-redux";
import { test } from "../actions";

class EventFilter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount () {
    }

    componentWillReceiveProps(nextProps) {
    }

    showTab = (tab) => {
        this.setState({tab});
    };

    render() {

        return (
            <div className="box">
                <div className="title">Event</div>
                <div className="content">
                    <input type="text" id="inputSearch" name="event" placeholder="Search"/>
                    <div className="custom-dropdown">
                        <button className="uk-button uk-button-default dropdown-button" type="button">Sports &nbsp;<span className="filter-sports-count"></span></button>
                        <div id="sports-event" uk-dropdown="mode: click"></div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return state
};

const mapDispatchToProps = dispatch => {
    return {
        onClick: id => dispatch(test(id))
    }
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EventFilter)