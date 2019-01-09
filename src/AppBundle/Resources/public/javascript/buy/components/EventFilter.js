import React from 'react';
import { connect } from "react-redux";
import Select from 'react-select';
import {updateEvent, updateSport} from "../actions/filterActions";
import {searchIcon} from "../../main/components/Icons";
import localStorageEnums from '../../main/constants/localStorageEnums';
import {PropTypes} from 'prop-types';

class EventFilter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            sports:[]
        };

        this.searchIcon = searchIcon;
    }

    componentWillUnmount() {
        this.isCancelled = true;
    }

    componentDidMount () {
        if ( ContentArena.Data.ActiveSports.length === 0) {
            ContentArena.Api.getActiveSports().done( (sports ) => {
                ContentArena.Data.ActiveSports = sports;
                !this.isCancelled && this.setState({sports});
            });
        } else {
            !this.isCancelled && this.setState({sports: ContentArena.Data.ActiveSports});
        }

        this.syncPropsWithLocalStorage();
    }

    syncPropsWithLocalStorage() {
        const sports = localStorage.getItem(localStorageEnums.SPORTS) && JSON.parse(localStorage.getItem(localStorageEnums.SPORTS));
        if (sports && sports.label !== this.props.sport.label) {
            this.props.selectSport(sports);
        }
    }

    getOptions = () => {
        const {sports} = this.state;

        let countries = sports.filter(s=>s.name).map((i,k)=>({value : i.name , label : i.name }));

        return [...[{value: null, label: 'All sports'}], ...countries];
    };

    showTab = (tab) => {
        this.setState({tab});
    };

    onSelectSport = (selectedSport) => {
        localStorage.setItem(localStorageEnums.SPORTS, JSON.stringify(selectedSport));
        this.props.selectSport(selectedSport);
        this.handleFilter();
    };

    updateEvent = (e) => {
        this.props.updateEvent(this.refs.search_field.value);
    };

    handleFilter = () => {
        this.props.onFilter();
    };

    handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.handleFilter()
        }
    };

    render() {
        const { sport, event } = this.props;
        const sportFromStorage = localStorage.getItem(localStorageEnums.SPORTS) &&
            JSON.parse(localStorage.getItem(localStorageEnums.SPORTS));
        const sportValue = sportFromStorage ? sportFromStorage : sport;
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
                        value={event}
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
                        {this.context.t("MARKETPLACE_LABEL_FILTER_SPORT")}
                    </div>

                    <Select
                        name="form-field-name"
                        multi={false}
                        className="sport-input-filter"
                        onChange={this.onSelectSport}
                        value={sportValue}
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