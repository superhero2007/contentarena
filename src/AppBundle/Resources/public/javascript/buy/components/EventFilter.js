import React from 'react';
import { connect } from "react-redux";
import Select from 'react-select';
import {updateEvent, updateSport} from "../actions/filterActions";

class EventFilter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };

        this.searchIcon = assetsBaseDir + "app/images/search.png";
    }

    componentDidMount () {
    }

    componentWillReceiveProps(nextProps) {
    }

    getOptions = () => {
        const {filter = [], available} = this.props;

        let countries = Object.values(ContentArena.Data.TopSports).map((i,k)=>({value : i.name , label : i.name }));

        return [...[{value: null, label: 'All sports'}], ...countries];
    };

    showTab = (tab) => {
        this.setState({tab});
    };

    selectSport = (e) => {

        this.props.selectSport(e);
    };

    updateEvent = (e) => {

        this.props.updateEvent(e.target.value);
    };

    render() {
        const {sport, event} = this.props;
        return (
            <div className="box">
                <div className="title">Event</div>
                <div className="content">

                    <div style={{
                        position: 'relative',
                        display: 'flex'
                    }}>
                        <img style={{
                            position: 'absolute',
                            width: 20,
                            height: 20,
                            cursor: 'pointer', margin: '15px 15px'}}
                             src={this.searchIcon}/>
                        <input
                            style={{
                                padding: '15px 15px 15px 40px',
                                flex: 1
                            }}
                            value={event}
                            onChange={this.updateEvent}
                            type="text" id="inputSearch" name="event" placeholder="Search"/>
                    </div>

                    <Select
                        name="form-field-name"
                        multi={false}
                        className="sport-input-filter"
                        onChange={this.selectSport}
                        value={sport}
                        options={this.getOptions()} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return state.filter
};

const mapDispatchToProps = dispatch => {
    return {
        onClick: id => dispatch(test(id)),
        selectSport : sport =>dispatch(updateSport(sport)),
        updateEvent : event => dispatch(updateEvent(event))
    }
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EventFilter)