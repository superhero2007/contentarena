import React from 'react';
import { connect } from "react-redux";
import Select from 'react-select';
import {updateEvent, updateSport} from "../actions/filterActions";
import {searchIcon} from "../../main/components/Icons";
import {PropTypes} from 'prop-types';

class EventFilter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            sports:[]
        };

        this.searchIcon = searchIcon;
    }

    componentDidMount () {
        if ( ContentArena.Data.ActiveSports.length === 0) {
            ContentArena.Api.getActiveSports().done( (sports ) => {
                ContentArena.Data.ActiveSports = sports;
                this.setState({sports});
            });
        } else {
            this.setState({sports: ContentArena.Data.ActiveSports});
        }
    }

    componentWillReceiveProps(nextProps) {
    }

    getOptions = () => {
        const {filter = [], available} = this.props;
        const {sports} = this.state;

        let countries = sports.filter(s=>s.name).map((i,k)=>({value : i.name , label : i.name }));

        return [...[{value: null, label: 'All sports'}], ...countries];
    };

    showTab = (tab) => {
        this.setState({tab});
    };

    selectSport = (e) => {

        this.props.selectSport(e);
    };

    updateEvent = (e) => {
        this.props.updateEvent(this.refs.search_field.value);
    };

    handleFilter = () => {
        const {onFilter} = this.props;
        onFilter();
    }

    handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.handleFilter()
        }
    };

    render() {
        const {sport, event} = this.props;
        return (
            <div>
                <div className="box">
                    <div className="search-btn"
                         onClick={this.handleFilter}
                    >
                        <img src={this.searchIcon}/>
                    </div>
                    <input
                        className="search-input ca-form-control"
                        defaultValue={event}
                        onKeyPress={this.handleKeyPress}
                        onChange={this.updateEvent}
                        ref="search_field"
                        type="text"
                        id="inputSearch"
                        name="event"
                        placeholder={this.context.t("Search", {}, "Marketplace - Placeholder for Search input")}/>
                </div>
                <div className="box">
                    <div className="title">
                        {this.context.t("Sports")}
                    </div>

                    <Select
                        name="form-field-name"
                        multi={false}
                        className="sport-input-filter"
                        onChange={this.selectSport}
                        value={sport}
                        options={this.getOptions()}
                    />
                </div>
            </div>
        );
    }
}

EventFilter.contextTypes = {
    t: PropTypes.func.isRequired
};

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